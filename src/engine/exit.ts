/**
 * Exit availability (#95) — the one question the production counters answer (PRD §8 F1; PRD-design
 * §6.2, §7 [D22]).
 *
 * `exit_available` is defined in a single line of the PRD — "all sentences self-marked got-it ≥ 2×"
 * — and this module is that line, as a function. Every sentence of the module, twice each, and the
 * exit ritual becomes the current rung's loud action. Nothing weights it, nothing averages it, and
 * nothing here can be nine-tenths true: ten sentences at 2× is ready and nine at 2× with one at 1×
 * is not, because the number is a promise about **every** sentence rather than about the module.
 *
 * `src/engine/` is pure TypeScript: no React, no storage, no clock. So the two facts arrive as
 * arguments — the module's sentence ids (content, from `modules/<id>.json`) and the course's
 * counters (state, `courses[<id>].production`) — and this file joins them without knowing where
 * either one came from. The store cannot answer this question on its own precisely because half of
 * it is content the store never holds; `screens/useExitAvailable.ts` is where the two meet.
 *
 * **It only reads.** The counters go up in one place, `recordProduction` in `src/state/store.ts`,
 * and only a PRODUCE-phase got-it calls it (PRD §8 F4 — a Review mark feeds the Leitner queue and
 * never these numbers). Nothing here writes, decides when to write, or knows which phase is open.
 */

/**
 * How many self-marked got-its a sentence owes before it counts as produced — **2** (PRD §8 F1).
 *
 * It lives here, with the rule it belongs to, so the module list's two dots, its `n / 20` count and
 * the predicate below cannot drift into disagreeing about what "produced" means.
 */
export const PRODUCTIONS_PER_SENTENCE = 2;

/** A course's counters as state v6 stores them: `production[sentenceId]` — times produced. */
export type ProductionCounts = Readonly<Record<string, number>>;

/**
 * **Every sentence produced ≥ 2× (PRD §8 F1).** The whole of `exit_available`.
 *
 * A sentence the counters have never seen reads as 0, which is what an absent key honestly means —
 * so a module whose learner has produced nothing and a module whose counters were never written are
 * the same answer.
 *
 * **An empty list is `false`**, not the vacuous `true` a bare `every` would give: "no sentences"
 * is what a caller says while the module file is still loading, and answering "ready" there would
 * open the exit ritual on a module nobody has read. A module with no sentences to produce is not a
 * module anyone has produced out.
 *
 * Ids the caller does not list are ignored, which is what makes this per-module: the map holds the
 * whole course's counters, and a rung is ready on the strength of its own ten sentences.
 */
export function exitAvailable(
  sentenceIds: readonly string[],
  production: ProductionCounts,
): boolean {
  if (sentenceIds.length === 0) return false;

  return sentenceIds.every(
    (sentenceId) => producedTimes(production, sentenceId) >= PRODUCTIONS_PER_SENTENCE,
  );
}

/**
 * **Any sentence produced at least once** — the module has been started in Produce, as against
 * merely opened in the module list (which is the `studied` flag, a different fact from a different
 * screen).
 *
 * It is the honest complement of `exitAvailable`: one asks whether the work is finished, the other
 * whether it has begun. The session machine (#96) reads it to decide whether a rung's Produce queue
 * is a first pass or a return to something half-built; nothing in the app writes anything because
 * of it, and an empty list is `false` for the same reason as above.
 */
export function started(sentenceIds: readonly string[], production: ProductionCounts): boolean {
  return sentenceIds.some((sentenceId) => producedTimes(production, sentenceId) >= 1);
}

/**
 * One sentence's counter, read defensively: `Object.hasOwn` rather than a bare index, because this
 * map arrives from `localStorage` (PRD §8 F7) and a plain-object lookup would otherwise answer for
 * `constructor` and friends. Anything that is not a positive number reads as 0 — a document that
 * came back damaged loses progress, which is visible, rather than gaining a rung, which is not.
 */
function producedTimes(production: ProductionCounts, sentenceId: string): number {
  if (!Object.hasOwn(production, sentenceId)) return 0;

  const times = production[sentenceId];
  return typeof times === 'number' && times > 0 ? times : 0;
}
