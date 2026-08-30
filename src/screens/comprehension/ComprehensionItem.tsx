/**
 * One comprehension item (#102; PRD §8 F5, PRD-design §6.6; prototype → Comprehend → the item and
 * its revealed state) — the exit ritual's reveal, running the other way round.
 *
 * | state | what is on screen |
 * |---|---|
 * | unrevealed | the pool item's L2 `display`, large, in a blueprint plate (+ the quiet `script` line in romanized courses); the 52px reveal |
 * | revealed | the **scripted answer** — the item's own L1 `cue` — the "why" panel and the self-mark |
 * | marked | the chosen segment lit, and the item committing itself when the window elapses |
 *
 * **The model answer is the content's, not the app's** (Invariant 4). It is the `cue` the pool
 * item was authored with, revealed on request and compared by the learner — nothing here reads,
 * scores or even sees what they thought it meant, and there is nowhere on the card to put it
 * (Invariant 6: no input element anywhere in this tree). Working the meaning out happens outside
 * the app; the card used to say so in a dashed "outside the app" plate above the reveal, and #225
 * took the line and its plate away with the rest of the app's read-once copy.
 *
 * **The mark commits itself** (#313), through the same commit window the reveal card uses
 * (`useCommitWindow`): the Next that used to stand beside the segments asked the learner to confirm
 * a decision they had just made, and the window keeps what it was protecting — the choice stays
 * changeable until it elapses, then fires once.
 *
 * **The card writes nothing and keeps nothing.** It emits one mark, the one the learner settled on,
 * so a "not quite" reconsidered into a "same meaning" sends what they meant — and the screen above
 * decides what it costs (nothing, until every item of the attempt is a "same meaning"; #102's
 * whole point).
 *
 * `SelfMark` is reused **verbatim** (#93): the same two segments, the same `--mark-got-bg` /
 * `--mark-miss-bg` fills, the same gate. Its two labels are the course's ratified `mark.*` pair —
 * PRD-design §7 words the comprehension pair "Same meaning" / "Not quite", which is a copy key
 * this bundle does not carry; inventing one here would put a learner-facing sentence in the shell
 * (PRD §4), so it is raised on the copy freeze (#71) with the rest and flagged on #117.
 */
import { useState } from 'react';
import type { L2Written } from '../../course/manifest.ts';
import { useStrings } from '../../course/strings.ts';
import type { PoolItem } from '../../course/types.ts';
import { SelfMark, type Mark } from '../../components/SelfMark.tsx';
import { useCommitWindow } from '../../components/useCommitWindow.ts';
import { WhyPanel } from '../../components/WhyPanel.tsx';
import { RegistrationMarks } from '../RegistrationMarks.tsx';
import styles from './ComprehensionItem.module.css';

interface ComprehensionItemProps {
  /** The pool item — `{id, display, cue}` (+ `script` in romanized courses), PRD §7. */
  item: PoolItem;
  /** Called once, on Next, with the mark the learner settled on. The card stores nothing. */
  onMark: (mark: Mark) => void;
  /**
   * This round already holds a "not quite", so fresh sentences follow it whatever happens here
   * (#318). The item says so rather than letting the learner work on in the belief that the round
   * is still live — the app knows, and hiding what it knows is the opposite of the calm the retry
   * is designed for. It is a fact about the round, so the screen owns it.
   */
  redrawing?: boolean;
  /** The course's writing direction — every line on the card is its content or its copy. */
  dir?: string;
  /** The tags the L2 lines are written in (#186); the cue and the copy are L1 and inherit. */
  l2?: L2Written;
}

export function ComprehensionItem({ item, onMark, redrawing, dir, l2 }: ComprehensionItemProps) {
  const strings = useStrings();
  // `setCard`, never `setState`: `src/state/unlockPath.test.ts` scans the shell for that call and
  // the store's actions are the only place allowed to make it (Invariant 1).
  const [card, setCard] = useState<{ revealed: boolean }>({ revealed: false });
  /** The mark, and the window that commits it (#313) — the same seam the reveal card uses. */
  const { chosen, choose } = useCommitWindow<Mark>(onMark);

  return (
    <section className={styles.item}>
      {/**
       * The round is already redrawing (#318) — said once, above the line under test, in the
       * course's own words. It names no count, no item and no failure: the marks that led here are
       * dropped on the way into the interstitial, so there is nothing to count with even if this
       * line wanted to (Invariant 4). It is the retry's own calm, arriving when the learner can
       * still use it rather than after they have finished working for nothing.
       */}
      {redrawing === true && (
        <p className={styles.pending} dir={dir}>
          {strings['retry.pending']}
        </p>
      )}

      {/* A blueprint object: hairline, no radius, the four registration marks — the prototype's
          own frame for the line under test. */}
      <div className={styles.plate}>
        <RegistrationMarks />
        <p className={styles.display} dir={l2?.display.dir} lang={l2?.display.lang}>
          {item.display}
        </p>
        {/* Romanized courses only: recognition, never something to produce (PRD §9 [D20]). */}
        {item.script !== undefined && (
          <p className={styles.script} dir={l2?.script.dir} lang={l2?.script.lang}>
            {item.script}
          </p>
        )}
      </div>

      {!card.revealed && (
        <div className={styles.work}>
          <div className={styles.revealFrame}>
            <RegistrationMarks />
            <button
              type="button"
              className={styles.reveal}
              onClick={() => {
                setCard({ revealed: true });
              }}
              dir={dir}
            >
              {/* The course's own label for revealing the L1 — Comprehension reveals the cue
                  rather than the sentence, which is why it has a key of its own (#120). */}
              {strings.revealLabelComprehend}
            </button>
          </div>
        </div>
      )}

      {card.revealed && (
        <div className={styles.answer}>
          <div className={styles.model}>
            {/* The course names its own L1 ("<language> cue"), so this label is its copy too —
                the same one `RevealCard` writes above the L1 (#93), because it names the same
                language. The prototype's English "MODEL ANSWER" would be a shell-owned word. */}
            <p className={styles.modelLabel} dir={dir}>
              {strings.cueLabel}
            </p>
            <p className={styles.modelText} dir={dir}>
              {item.cue}
            </p>
          </div>

          {/* "Why" on every reveal (#94), this one included: the panel resolves the L2 line
              against its own module's word index — a pool item names its module in its id, like a
              sentence does. No "open full": a pool item has no Detail page to open. */}
          <WhyPanel sentenceId={item.id} display={item.display} dir={dir} l2={l2} />

          {/* The mark, and nothing beside it: choosing commits the item (#313). */}
          <div className={chosen === null ? styles.marks : styles.marksMarked}>
            <SelfMark mark={chosen} onMark={choose} dir={dir} />
          </div>
        </div>
      )}
    </section>
  );
}
