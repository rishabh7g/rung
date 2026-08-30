/**
 * The session plan (#96) — what one Practice session serves, decided once, before the first card
 * (PRD §8 F4; PRD-design §6.3, flow 3).
 *
 * A session is a review queue and a read-through after it: up to five due reviews from rungs the
 * learner has passed, then the current rung's own sentences. This module answers what is in the
 * review queue and in what order, and nothing else — no phase, no position, no marks. The store
 * owns when it runs and what it writes (`startSession`), the screen owns what it looks like
 * (`screens/PracticeScreen.tsx`).
 *
 * **Read has no queue here, and that is the shape of #349.** There used to be a second one:
 * Produce served the rung least-produced-first, because the exit ritual asked for two produced
 * passes per sentence and the sentence at 0 was worth more than the one at 1. Retiring notebook
 * writing retired Produce and moved the gate to a single Read mark, and a rung read once through
 * in its own order satisfies it — so the ordering question the second queue existed to answer no
 * longer has two answers. Read walks the module's sentence list (`screens/practice/Session.tsx`),
 * which is the order the course wrote them in.
 *
 * `src/engine/` is pure TypeScript: no React, no storage, no clock (docs/01-plan.md §3). The same
 * input always produces the identical output, which is what lets the Practice hub PREVIEW a
 * session — "3 due, 10 to read, Begin — Review first" — by planning against the queue the
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

/**
 * How many due reviews one session serves — **5** (PRD §8 F4: "the scheduler serves up to 5 due
 * items"). Review is the warm-up, not the session: a learner returning after a month away owes
 * five cards, exactly like one returning tomorrow. `dueItems` decides WHICH five.
 */
export const REVIEWS_PER_SESSION = 5;

/** What a plan is made of: the ticked review queue, and nothing else — Read walks the rung. */
export interface SessionPlanInput {
  /**
   * The course's review queue **after** the session's tick (`tickSession`) — the store ticks
   * first and plans against the result, so "due" means due in the session about to run.
   */
  queue: readonly ReviewItem[];
}

/** The session's one queue, in serving order. Phases are the session's; these are just the cards. */
export interface SessionPlan {
  /** Review: the due items this session serves, most urgent first, capped at five. */
  reviewIds: string[];
}

/**
 * The session's review queue (PRD §8 F4).
 *
 * It is `dueItems(queue, 5)` verbatim — the scheduler already owns that order (most overdue, then
 * newest material, then sentence order) and this module does not get a second opinion about it.
 *
 * The list is a fresh array: the caller's queue is never reordered.
 */
export function planSession({ queue }: SessionPlanInput): SessionPlan {
  return {
    reviewIds: dueItems(queue, REVIEWS_PER_SESSION).map((item) => item.sentenceId),
  };
}
