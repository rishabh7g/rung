/**
 * The two production dots (#88; PRD-design §7, design/tokens.md §4 "Production dots 6px").
 *
 * One sentence's whole progress, in two 6px squares: **got it once**, **got it twice**. Two,
 * because two is the number the exit ritual asks for — every sentence self-marked got-it ≥ 2×
 * makes a module `exit_available` (PRD §8 F1) — so a row of full dots down the module list is
 * literally the exit unlocking, with no bar, no percentage and no date anywhere near it
 * (Invariant 2).
 *
 * **It only reads.** The counters are written by the Practice loop's Produce got-its, through the
 * store's one writer (`recordProduction`, #95); this draws whatever `production[sentenceId]`
 * currently says, and a count above two draws the same two full dots because there is nothing
 * further to say.
 *
 * `aria-hidden`, like the Ladder's level squares and rung markers: it is a drawing of a number a
 * screen reader is already told in the module header's count, and three announcements per row is
 * noise. The state is a `data-state` attribute rather than a class per state, so the stylesheet
 * holds the tokens (`--dot-done` / `--dot-pending`) and the DOM says what it means.
 */
import styles from './ProductionDots.module.css';

interface ProductionDotsProps {
  /** `production[sentenceId]` — how many times this sentence has been self-marked got-it. */
  produced: number;
}

export function ProductionDots({ produced }: ProductionDotsProps) {
  return (
    <span className={styles.dots} aria-hidden="true">
      <span className={styles.dot} data-state={produced >= 1 ? 'done' : 'pending'} />
      <span className={styles.dot} data-state={produced >= 2 ? 'done' : 'pending'} />
    </span>
  );
}
