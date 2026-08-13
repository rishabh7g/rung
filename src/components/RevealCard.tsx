/**
 * The reveal card (#93; PRD §8 F4 [D11], PRD-design §6.3, §7) — the interaction the whole product
 * is built around, in three states and one direction:
 *
 * | state | what is on screen |
 * |---|---|
 * | `cue` | the L1 cue and the 52px reveal button |
 * | `revealed` | the L2 `display` (+ the quiet `script` line in romanized courses), the "why" slot, and the self-mark — **no Next** |
 * | `marked` | Next, appearing over `--motion-next-appear` the moment a mark exists |
 *
 * **The recall happens outside the app.** Between the cue and the reveal the learner says it,
 * thinks it, or writes it in their notebook — the app never sees it and offers nowhere to put it
 * (Invariant 6: there is no input element anywhere in this tree, asserted in the tests). The card
 * used to say so on every cue, in a dashed "outside the app" plate; #225 took the line and its
 * plate away, because an instruction that never changes is read once and skimmed thirty times.
 * The gap between the cue and the reveal says it now.
 *
 * **Next is HIDDEN, not disabled, until a mark exists** [D11]. A disabled Next is the app telling
 * the learner what it is waiting for; an absent one leaves the mark as the only thing on screen
 * to do. It is literally not in the DOM — `queryByRole('button', { name: next })` is null — and
 * that, rather than an attribute, is what the test asserts.
 *
 * **The card writes nothing** (Invariant 4). It emits `onResult({ sentenceId, gotIt })` when the
 * learner takes Next, and the parent decides what that means: a Review mark feeds the Leitner
 * queue (`applyMark`), a Produce mark the production counters (`recordProduction`, #95) — and the
 * session machine (#96) is the parent that routes them. Nothing here imports the store, and
 * the mark is only committed on Next — so a learner who taps "missed", thinks again and taps "got
 * it" sends one result, the one they meant.
 *
 * **The "why" panel is a slot, not a feature here** — `WhyPanel` (#94) fills it with the
 * word-index resolver's rows and its own ghost toggle, and the parent passes it in. It renders
 * inside the answer plate, under the display, which is where the prototype puts it; an unfilled
 * slot renders nothing at all.
 *
 * Comprehension (#101) shares the `SelfMark` and the gate, not this card: it reveals the L1 rather
 * than the L2 and labels its own reveal out of `revealLabelComprehend`, in its own layout.
 *
 * **No `mode` prop.** Review and Produce differ in what the parent DOES with the mark, never in
 * what this card renders — the one thing the mode ever picked was the per-phase nudge, and #225
 * removed the nudges. The session still knows which phase it is in; the card no longer needs to.
 */
import { useState, type ReactNode } from 'react';
import type { L2Written } from '../course/manifest.ts';
import { useStrings } from '../course/strings.ts';
import { RegistrationMarks } from '../screens/RegistrationMarks.tsx';
import { SelfMark, type Mark } from './SelfMark.tsx';
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
  /** Called once, on Next, with the mark the learner settled on. The card stores nothing. */
  onResult: (result: RevealResult) => void;
  /** The course's writing direction — every line on the card is its content or its copy. */
  dir?: string;
  /** The tags the revealed L2 lines are written in (#186); the cue is L1 and inherits. */
  l2?: L2Written;
}

/** The card's whole state, tied to the sentence it belongs to. */
interface CardState {
  sentenceId: string;
  revealed: boolean;
  mark: Mark | null;
}

function fresh(sentenceId: string): CardState {
  return { sentenceId, revealed: false, mark: null };
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
   * A new sentence is a new card, whatever the parent did with keys: state belonging to the
   * previous id is ignored rather than shown. The one failure this rules out is the worst one the
   * component has — the next cue arriving with the last answer already revealed under it.
   */
  const card = held.sentenceId === sentenceId ? held : fresh(sentenceId);

  return (
    <section className={styles.card}>
      <div className={styles.cue}>
        {/* The course names its own L1 ("<language> cue"), so this label is its copy too. */}
        <p className={styles.cueLabel} dir={dir}>
          {strings.cueLabel}
        </p>
        <p className={styles.cueText} dir={dir}>
          {cue}
        </p>
      </div>

      {!card.revealed && (
        <div className={styles.recall}>
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

          <div className={card.mark === null ? styles.marks : styles.marksMarked}>
            <SelfMark mark={card.mark} onMark={(mark) => setCard({ ...card, mark })} dir={dir} />

            {/* [D11]: hidden, not disabled — there is no Next in the DOM until there is a mark. */}
            {card.mark !== null && (
              <button
                type="button"
                className={styles.next}
                onClick={() => onResult({ sentenceId, gotIt: card.mark === 'got' })}
                dir={dir}
              >
                {strings['mark.next']}
              </button>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
