/**
 * The production dot (#88, #349; PRD-design §7, design/tokens.md §4 "Production dots 6px").
 *
 * One sentence's whole progress, in one 6px square: **marked read**, or not yet. A row of full
 * dots down the module list is the whole rung said back correctly, with no bar, no percentage
 * and no date anywhere near it (Invariant 2).
 *
 * **There were two of them** until #349, because the exit ritual asked for two produced passes
 * and the pair drew "got it once / got it twice". The ritual is gone entirely now — a rung is
 * climbed by finishing a Practice session — so the dot gates nothing and reports instead: it is
 * a record of the work, which is what it always drew. The name stays `ProductionDots` because
 * the counters it reads are still `production` on disk (`state/types.ts`).
 *
 * **It only reads.** The counters are written by the Practice loop's Read got-its, through the
 * store's one writer (`recordProduction`, #95); this draws whatever `production[sentenceId]`
 * currently says, and a count above one draws the same full dot because there is nothing further
 * to say.
 *
 * `aria-hidden`, like the Ladder's level squares and rung markers: it is a drawing of a number a
 * screen reader is already told in the module header's count, and an announcement per row on top
 * of that is noise. The state is a `data-state` attribute rather than a class per state, so the
 * stylesheet holds the tokens (`--dot-done` / `--dot-pending`) and the DOM says what it means.
 */
import './production-dots.css';

interface ProductionDotsProps {
  /** `production[sentenceId]` — how many times this sentence has been self-marked got-it. */
  produced: number;
}

export function ProductionDots({ produced }: ProductionDotsProps) {
  return (
    <span className="production-dots" aria-hidden="true">
      <span className="production-dot" data-state={produced >= 1 ? 'done' : 'pending'} />
    </span>
  );
}
