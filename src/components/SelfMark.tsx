/**
 * The self-mark [D11] (#93; PRD §8 F4, PRD-design §6.3, §7, design/tokens.md §1, §6) — two
 * segments, and the only thing in the product that is allowed to be loud in colour.
 *
 * It is the learner's own verdict on their own recall, and the app's whole part in it is to take
 * it: nothing here checks, compares or scores anything (Invariant 4). The parent decides what a
 * mark MEANS — a Review mark feeds the Leitner queue, a Produce mark feeds the production
 * counters (#95/#96) — and this control never learns the difference.
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
 * exclusivity is a fact of the single `mark` value rather than of the markup.
 *
 * Both labels are the course's (`mark.gotIt` / `mark.missed`). Comprehension asks the same
 * question with a different pair — "same meaning" / "not quite" (PRD-design §7) — which is #101's
 * two keys to add beside these and a variant here; the fills, the geometry and the gate are
 * already the same control.
 */
import { useStrings } from '../course/strings.ts';
import styles from './SelfMark.module.css';

/** The learner's verdict. Not a boolean at the call site, so neither value can be the default. */
export type Mark = 'got' | 'miss';

interface SelfMarkProps {
  /** The mark so far — `null` until the learner makes one, which is where every card starts. */
  mark: Mark | null;
  onMark: (mark: Mark) => void;
  /** Id of the line that asks the question, so the group is named by the course's own words. */
  labelledBy?: string;
  /** The course's writing direction — the labels are its words. */
  dir?: string;
}

export function SelfMark({ mark, onMark, labelledBy, dir }: SelfMarkProps) {
  const strings = useStrings();

  return (
    <div className={styles.group} role="group" aria-labelledby={labelledBy}>
      <button
        type="button"
        className={mark === 'got' ? styles.optionGot : styles.option}
        aria-pressed={mark === 'got'}
        onClick={() => onMark('got')}
        dir={dir}
      >
        {strings['mark.gotIt']}
      </button>
      <button
        type="button"
        className={mark === 'miss' ? styles.optionMiss : styles.option}
        aria-pressed={mark === 'miss'}
        onClick={() => onMark('miss')}
        dir={dir}
      >
        {strings['mark.missed']}
      </button>
    </div>
  );
}
