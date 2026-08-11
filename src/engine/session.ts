/**
 * The session plan (#96) — what one Practice session serves, decided once, before the first card
 * (PRD §8 F4; PRD-design §6.3, flow 3).
 *
 * A session is two queues and a read-through between them: up to five due reviews from rungs the
 * learner has passed, then the current rung's own sentences to produce. This module answers what
 * is in each queue and in what order, and nothing else — no phase, no position, no marks. The
 * store owns when it runs and what it writes (`startSession`), the screen owns what it looks like
 * (`screens/PracticeScreen.tsx`).
 *
 * `src/engine/` is pure TypeScript: no React, no storage, no clock (docs/01-plan.md §3). The same
 * input always produces the identical output, which is what lets the Practice hub PREVIEW a
 * session — "3 due, 10 to produce, Begin — Review first" — by planning against the queue the
 * session is about to tick, and be certain the hub cannot promise something the session will not
 * serve. One function, two callers, no second implementation to drift.
 *
 * **The plan is taken once, at session start, and then it is the session's.** Review marks move
 * boxes and countdowns as they land (`applyMark`), so re-deriving the due list mid-session would
 * quietly drop the cards already marked and change the position under the learner. `#99`'s lossless
 * resume rests on the same fact: what is snapshotted is a plan that was made, not one that will be
 * remade.
 */
import { dueItems, type ReviewItem } from './leitner.ts';
import { producedTimes, type ProductionCounts } from './exit.ts';

/**
 * How many due reviews one session serves — **5** (PRD §8 F4: "the scheduler serves up to 5 due
 * items"). Review is the warm-up, not the session: a learner returning after a month away owes
 * five cards, exactly like one returning tomorrow. `dueItems` decides WHICH five.
 */
export const REVIEWS_PER_SESSION = 5;

/** What a plan is made of: the ticked review queue, the rung being practised, and the counters. */
export interface SessionPlanInput {
  /**
   * The course's review queue **after** the session's tick (`tickSession`) — the store ticks
   * first and plans against the result, so "due" means due in the session about to run.
   */
  queue: readonly ReviewItem[];
  /** The current rung's sentence ids, in the module's own order. */
  moduleSentenceIds: readonly string[];
  /** The course's production counters — the only thing that orders the Produce queue. */
  production: ProductionCounts;
}

/** The two queues, in serving order. Phases are the session's; these are just the cards. */
export interface SessionPlan {
  /** Review: the due items this session serves, most urgent first, capped at five. */
  reviewIds: string[];
  /** Produce: every sentence of the rung, least-produced first. */
  produceIds: string[];
}

/**
 * The session's two queues (PRD §8 F4).
 *
 * **Review** is `dueItems(queue, 5)` verbatim — the scheduler already owns that order (most
 * overdue, then newest material, then sentence order) and this module does not get a second
 * opinion about it.
 *
 * **Produce is every sentence of the rung, ordered least-produced first**, ties broken by the
 * module's own order. Two consequences, both deliberate:
 *
 *   • **A learner who leaves early leaves the most-owed sentences done.** The rung opens its exit
 *     ritual when EVERY sentence is at 2× (`exitAvailable`, #95), so the one at 0 is worth more
 *     than the one at 1, and the queue is sorted by exactly that.
 *   • **Nothing is dropped for being finished.** The prototype filters its Produce queue to
 *     sentences under 2× (design/Rung App v3.3.dc.html → `queueNow`); the product keeps them, at
 *     the end, because two is what the ritual asks for and not a cap on practice — the counters
 *     themselves have no ceiling (`recordProduction`, #95) — and a phase that empties itself would
 *     be the app deciding the learner is done practising a sentence.
 *
 * Both lists are fresh arrays: the caller's queue is never reordered, and neither is the module's
 * sentence list.
 */
export function planSession({
  queue,
  moduleSentenceIds,
  production,
}: SessionPlanInput): SessionPlan {
  return {
    reviewIds: dueItems(queue, REVIEWS_PER_SESSION).map((item) => item.sentenceId),
    produceIds: leastProducedFirst(moduleSentenceIds, production),
  };
}

/**
 * Least-produced first, ties in the module's order — a TOTAL order over the list, so the same
 * sentences always come back in the same sequence whatever the counters happen to be.
 *
 * The tie-break is written out rather than left to the sort's stability: a stable sort would give
 * the same answer, and saying so in code is how the next reader learns that the module's order is
 * the intended second key rather than an accident of the runtime.
 */
function leastProducedFirst(
  moduleSentenceIds: readonly string[],
  production: ProductionCounts,
): string[] {
  return moduleSentenceIds
    .map((sentenceId, order) => ({
      sentenceId,
      order,
      times: producedTimes(production, sentenceId),
    }))
    .sort((a, b) => (a.times !== b.times ? a.times - b.times : a.order - b.order))
    .map((entry) => entry.sentenceId);
}
