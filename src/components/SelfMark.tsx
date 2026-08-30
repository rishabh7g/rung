/**
 * The self-mark [D11] (#93; PRD §8 F4, PRD-design §6.3, §7, design/tokens.md §1, §6) — two
 * segments, and the only thing in the product that is allowed to be loud in colour.
 *
 * It is the learner's own verdict on their own recall, and the app's whole part in it is to take
 * it: nothing here checks, compares or scores anything (Invariant 4). The parent decides what a
 * mark MEANS — a Review mark feeds the Leitner queue, a Produce mark feeds the production counters
 * (`recordProduction`, #95; routed by the session machine, #96) — and this control never learns
 * the difference.
 *
 * **Never preselected.** `mark` is `Mark | null` and the null is the point: a segment lit before
 * the learner touched it would be the app answering for them, and every honest reading of "did
 * you have it?" starts from neither. The control has no default and no internal state; the card
 * above it holds the mark, because the whole gate ([D11]: Next is HIDDEN until a mark exists)
 * hangs off the same value.
 *
 * **No input element, anywhere in it** (Invariant 6). The design system's own segmented control
 * is a `<label>` wrapping a visually hidden `<input type="radio">` (`design/_ds/…/styles.css`),
 * and the prototype's practice card uses exactly that — but "no input fields" is contractual in
 * this product, so the segments are `<button aria-pressed>` inside a `role="group"`. Two toggle
 * buttons rather than a `radiogroup` deliberately: a radio group owes arrow-key selection and a
 * roving tabindex, and an unmarked group (the state this control spends most of its life in) has
 * no checked radio for the roving focus to land on. Buttons are complete as they stand, and
 * exclusivity is a fact of the single `mark` value rather than of the markup. The group carries no
 * accessible name of its own since #225: the question it used to be labelled by (`mark.prompt`)
 * went with the app's read-once copy, and its two segments say what it is on their own.
 *
 * Both labels are the course's (`mark.gotIt` / `mark.missed`). Comprehension asks the same
 * question with a different pair — "same meaning" / "not quite" (PRD-design §7) — which is #101's
 * two keys to add beside these and a variant here; the fills, the geometry and the gate are
 * already the same control.
 *
 * **The got-it segment sits SECOND, which puts it under the thumb.** It led for the first year of
 * this control, on the reading-order argument that the affirmative comes first. That argument is
 * about a page; this is a control a learner hits one-handed, dozens of times a session, and on a
 * phone held in the right hand the thumb rests at the right edge. Leading with the affirmative
 * meant the mark taken most often was the one furthest to reach, and the miss sat where the thumb
 * already was — the wrong verdict is the one a mis-tap should cost, never the likely one.
 *
 * DOM order rather than `row-reverse`, so the visual order and the tab order stay the same
 * sequence; a control whose focus ring jumps right-to-left is a worse trade than the one this
 * fixes. Note the consequence for an RTL course (en-ar): the group inherits the document's
 * direction, so the segments mirror and got-it lands on the LEFT there. That follows the script,
 * which is the rule this app applies everywhere else, and it is the reason the swap is done here
 * once rather than per-surface.
 */
import { useStrings } from '../course/strings.ts';
import styles from './SelfMark.module.css';

/** The learner's verdict. Not a boolean at the call site, so neither value can be the default. */
export type Mark = 'got' | 'miss';

interface SelfMarkProps {
  /** The mark so far — `null` until the learner makes one, which is where every card starts. */
  mark: Mark | null;
  onMark: (mark: Mark) => void;
  /** The course's writing direction — the labels are its words. */
  dir?: string;
}

export function SelfMark({ mark, onMark, dir }: SelfMarkProps) {
  const strings = useStrings();

  return (
    <div className={styles.group} role="group">
      <button
        type="button"
        className={mark === 'miss' ? styles.optionMiss : styles.option}
        aria-pressed={mark === 'miss'}
        onClick={() => onMark('miss')}
        dir={dir}
      >
        {strings['mark.missed']}
      </button>
      <button
        type="button"
        className={mark === 'got' ? styles.optionGot : styles.option}
        aria-pressed={mark === 'got'}
        onClick={() => onMark('got')}
        dir={dir}
      >
        {strings['mark.gotIt']}
      </button>
    </div>
  );
}
