/**
 * Exit availability (#95) — the one question the production counters answer (PRD §8 F1; PRD-design
 * §6.2, §7 [D22]).
 *
 * `exit_available` is "every sentence of the rung self-marked got-it", and this module is that
 * line as a function. Nothing weights it, nothing averages it, and nothing here can be
 * nine-tenths true: ten sentences marked is ready and nine marked with one unmarked is not,
 * because the number is a promise about **every** sentence rather than about the module.
 *
 * **The threshold moved from 2 to 1 on #349**, with the phase that fed it. The counters used to be
 * fed by a Produce phase — "say it, then check" — that the product retired along with notebook
 * writing, and the gate moved to the Read phase's own self-marks. One marked read-through opens a
 * rung where two produced passes used to, which is a deliberate pacing change and the whole point
 * of the ticket.
 *
 * `src/engine/` is pure TypeScript: no React, no storage, no clock. So the two facts arrive as
 * arguments — the module's sentence ids (content, from `modules/<id>.json`) and the course's
 * counters (state, `courses[<id>].production`) — and this file joins them without knowing where
 * either one came from. The store cannot answer this question on its own precisely because half of
 * it is content the store never holds; `screens/useExitAvailable.ts` is where the two meet.
 *
 * **It only reads.** The counters go up in one place, `recordProduction` in `src/state/store.ts`,
 * and only a READ-phase got-it calls it (a Review mark feeds the Leitner queue and never these
 * numbers). Nothing here writes, decides when to write, or knows which phase is open.
 *
 * **The action and the persisted map keep the name `production`** even though the phase that
 * named them is gone. Renaming them would rename a field inside the persisted document
 * (`state/serialize.ts`), which costs either an alias at the serialize boundary or a schema
 * version bump and a migration — a real cost for a word, paid by every learner's stored file.
 * #349 explicitly left that call to the implementer; this is the choice, and this comment is the
 * record of it.
 */

/**
 * How many self-marked got-its a sentence owes before it counts as read through — **1** (#349).
 *
 * It lives here, with the rule it belongs to, so the module list's dots, its `n / 10` count and the
 * predicate below cannot drift into disagreeing about what "marked" means.
 */
export const MARKS_PER_SENTENCE = 1;

/** A course's counters as state v6 stores them: `production[sentenceId]` — times marked. */
export type ProductionCounts = Readonly<Record<string, number>>;

/**
 * **Every sentence marked ≥ 1× (PRD §8 F1).** The whole of `exit_available`.
 *
 * A sentence the counters have never seen reads as 0, which is what an absent key honestly means —
 * so a module whose learner has marked nothing and a module whose counters were never written are
 * the same answer.
 *
 * **An empty list is `false`**, not the vacuous `true` a bare `every` would give: "no sentences"
 * is what a caller says while the module file is still loading, and answering "ready" there would
 * open the exit ritual on a module nobody has read. A module with no sentences to read is not a
 * module anyone has read through.
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
    (sentenceId) => producedTimes(production, sentenceId) >= MARKS_PER_SENTENCE,
  );
}

/**
 * **Any sentence marked at least once** — the rung has been worked in Read, as against merely
 * opened in the module list (which is the `studied` flag, a different fact from a different
 * screen).
 *
 * It is the honest complement of `exitAvailable`: one asks whether the work is finished, the other
 * whether it has begun. Nothing in the app writes anything because of it, and an empty list is
 * `false` for the same reason as above.
 */
export function started(sentenceIds: readonly string[], production: ProductionCounts): boolean {
  return sentenceIds.some((sentenceId) => producedTimes(production, sentenceId) >= 1);
}

/**
 * One sentence's counter, read defensively: `Object.hasOwn` rather than a bare index, because this
 * map arrives from `localStorage` (PRD §8 F7) and a plain-object lookup would otherwise answer for
 * `constructor` and friends. Anything that is not a positive number reads as 0 — a document that
 * came back damaged loses progress, which is visible, rather than gaining a rung, which is not.
 *
 * Exported because more than this module has asked it over the years — the session plan used to
 * order its Produce queue by it (#96, gone with the phase on #349) — and "how many times has this
 * sentence been marked" is one question with one defensive answer: a second reader of the same map
 * would be a second chance to trust a damaged one.
 */
export function producedTimes(production: ProductionCounts, sentenceId: string): number {
  if (!Object.hasOwn(production, sentenceId)) return 0;

  const times = production[sentenceId];
  return typeof times === 'number' && times > 0 ? times : 0;
}
