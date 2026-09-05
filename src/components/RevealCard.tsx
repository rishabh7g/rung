/**
 * The reveal card (#93; PRD §8 F4 [D11], PRD-design §6.3, §7) — the interaction the whole product
 * is built around, in three states and one direction:
 *
 * | state | what is on screen |
 * |---|---|
 * | `cue` | the L1 cue and the 52px reveal button |
 * | `revealed` | the L2 `display` (+ the quiet `script` line in romanized courses), the "why" slot, and the self-mark |
 * | `marked` | the chosen segment lit, and the card committing itself over `--motion-mark-commit` |
 *
 * **The recall happens outside the app.** Between the cue and the reveal the learner says it,
 * thinks it, or writes it in their notebook — the app never sees it and offers nowhere to put it
 * (Invariant 6: there is no input element anywhere in this tree, asserted in the tests). The card
 * used to say so on every cue, in a dashed "outside the app" plate; #225 took the line and its
 * plate away, because an instruction that never changes is read once and skimmed thirty times.
 * The gap between the cue and the reveal says it now.
 *
 * **THE MARK IS THE WHOLE INTERACTION** (#313). It used to be two taps: mark, then a Next that
 * appeared beside it. [D11] made that Next hidden-until-marked rather than disabled, for a good
 * reason — a disabled control is the app telling the learner what it is waiting for — but the
 * deeper problem was the tap itself. The learner had already answered the only question the card
 * asks; the second tap confirmed a decision they had just made, fifteen times a session, which
 * made the mark read as a question followed by a confirmation.
 *
 * So the mark commits itself, and what the Next protected is protected by a **commit window**
 * instead (`useCommitWindow`): the chosen segment lights and `onResult` fires when the window
 * elapses. Tapping the other segment inside it switches the mark and starts the window again — so
 * a learner who taps "missed", thinks again and taps "got it" still sends ONE result, the one they
 * meant, which is the promise [D11] was really making. Nothing is written before the window
 * elapses, so there is no store write to undo and no reversal action to build.
 *
 * The window is deliberately a WINDOW and not a delay to sit through: it is short enough that the
 * session does not feel paced by the app, and the segment is lit throughout, so what it looks like
 * is the card acknowledging the mark rather than waiting for permission.
 *
 * **The card writes nothing** (Invariant 4). It emits `onResult({ sentenceId, gotIt })` when the
 * window elapses, and the parent decides what that means: an earlier-rung card feeds the Leitner
 * queue (`applyMark`), a this-rung card the production counters (`recordProduction`, #95) — and
 * the session (`screens/practice/Session.tsx`) is the parent that routes them. Nothing here
 * imports the store.
 *
 * **The "why" panel is a slot, not a feature here** — `WhyPanel` (#94) fills it with the
 * word-index resolver's rows and its own ghost toggle, and the parent passes it in. It renders
 * inside the answer plate, under the display, which is where the prototype puts it; an unfilled
 * slot renders nothing at all.
 *
 * Comprehension (#101) shares the `SelfMark` and the gate, not this card: it reveals the L1 rather
 * than the L2 and labels its own reveal out of `revealLabelComprehend`, in its own layout.
 *
 * **No `mode` prop.** Which rung a card came from changes what the parent DOES with the mark,
 * never what this card renders — the one thing a mode ever picked was the per-phase nudge, and
 * #225 removed the nudges.
 */
import { useCallback, useState, type ReactNode } from 'react';
import type { L2Written } from '../course/manifest.ts';
import { useStrings } from '../course/strings.ts';
import { RegistrationMarks } from '../screens/RegistrationMarks.tsx';
import { HintLine } from '../shell/useHint.tsx';
import { SelfMark, type Mark } from './SelfMark.tsx';
import { useCommitWindow } from './useCommitWindow.ts';
import styles from './RevealCard.module.css';

/** What the learner said about their own recall. The parent decides what it costs. */
export interface RevealResult {
  sentenceId: string;
  gotIt: boolean;
}

interface RevealCardProps {
  /** Identifies the card to the parent; it is the only thing `onResult` carries besides the mark. */
  sentenceId: string;
  /** The prompt: the L1 cue, which stays on screen through all three states. */
  cue: string;
  /** What the reveal shows: the L2 sentence. */
  display: string;
  /** Romanized courses only (`scriptMode`, PRD §4) — the native script as the quietest line. */
  script?: string;
  /** `WhyPanel` (#94) — its word rows and toggle. Nothing renders when the slot is empty. */
  why?: ReactNode;
  /** Called once, when the commit window elapses, with the mark the learner settled on. */
  onResult: (result: RevealResult) => void;
  /** The course's writing direction — every line on the card is its content or its copy. */
  dir?: string;
  /** The tags the revealed L2 lines are written in (#186); the cue is L1 and inherits. */
  l2?: L2Written;
}

/**
 * The card's whole state, tied to the sentence it belongs to — which is now just "has the answer
 * been shown". The mark lives in the commit window, because the window is what owns its lifetime.
 */
interface CardState {
  sentenceId: string;
  revealed: boolean;
}

function fresh(sentenceId: string): CardState {
  return { sentenceId, revealed: false };
}

export function RevealCard({
  sentenceId,
  cue,
  display,
  script,
  why,
  onResult,
  dir,
  l2,
}: RevealCardProps) {
  const strings = useStrings();
  // `setCard`, never `setState`: `src/state/unlockPath.test.ts` scans the shell for that call and
  // the store's actions are the only place allowed to make it (Invariant 1).
  const [held, setCard] = useState<CardState>(() => fresh(sentenceId));

  /**
   * The mark, and the window that commits it (#313). The card still emits exactly one result per
   * sentence — the window is what makes "the mark the learner settled on" true without a second
   * control to settle it with.
   */
  const commit = useCallback(
    (mark: Mark) => {
      onResult({ sentenceId, gotIt: mark === 'got' });
    },
    [onResult, sentenceId],
  );
  const { chosen, choose } = useCommitWindow(commit);

  /**
   * A new sentence is a new card, whatever the parent did with keys: state belonging to the
   * previous id is ignored rather than shown. The one failure this rules out is the worst one the
   * component has — the next cue arriving with the last answer already revealed under it.
   */
  const card = held.sentenceId === sentenceId ? held : fresh(sentenceId);

  return (
    <section className={styles.card}>
      <div className={styles.cue}>
        {/* No label over the cue (Practice audit, 2026-09-05). `cueLabel` used to name the learner's
            own language above every one of the fifteen cues — the reveal button already names the
            other one, and the accent rule is the cue's whole frame. Comprehension still prints the
            label, because there the cue is the L2 and the language IS the surprise. */}
        <p className={styles.cueText} dir={dir}>
          {cue}
        </p>
      </div>

      {!card.revealed && (
        <div className={styles.recall}>
          {/**
           * Said once per install, on the first cue the learner ever sees (#319): the recall
           * happens outside the app. The card used to say it on EVERY cue, in a dashed "outside
           * the app" plate, and #225 was right to take that away — but the gap between the cue and
           * the reveal only says it to someone who already knows. This is the sentence, once.
           *
           * It renders `null` on every later card, so the shape #225 asked for is what the
           * product actually looks like from the second card onwards. The component reaches for no
           * storage itself (Invariant 4's scan reads this file for exactly that); `HintLine` owns
           * the fact, as `WhyPanel` owns the word rows.
           */}
          <HintLine hint="recall" className={styles.hint} dir={dir} />

          <div className={styles.revealFrame}>
            <RegistrationMarks />
            <button
              type="button"
              className={styles.reveal}
              onClick={() => setCard({ ...card, revealed: true })}
              dir={dir}
            >
              {strings.revealLabel}
            </button>
          </div>
        </div>
      )}

      {card.revealed && (
        <div className={styles.answer}>
          <div className={styles.answerPlate}>
            <RegistrationMarks />
            <p className={styles.display} dir={l2?.display.dir} lang={l2?.display.lang}>
              {display}
            </p>
            {/* Romanized courses only: recognition, never something to produce (§9 [D20]). */}
            {script !== undefined && (
              <p className={styles.script} dir={l2?.script.dir} lang={l2?.script.lang}>
                {script}
              </p>
            )}
            {/* ─── the "why" seam (#94): word rows land here, inside the answer plate ─── */}
            {why !== undefined && <div className={styles.why}>{why}</div>}
          </div>

          {/* The mark, and nothing beside it: choosing commits the card (#313). No Next, and
              nothing disabled either — the two segments are the whole of what there is to do. */}
          <div className={chosen === null ? styles.marks : styles.marksMarked}>
            <SelfMark mark={chosen} onMark={choose} dir={dir} />
          </div>
        </div>
      )}
    </section>
  );
}
