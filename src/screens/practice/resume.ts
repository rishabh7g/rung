/**
 * Coming back to an interrupted session (#99) — the snapshot, read as a plan.
 *
 * A session's cards are chosen ONCE, at `startSession`, against the review queue as it stood after
 * that session's tick. Re-planning on resume would answer a different question — "what is due
 * now", after the marks the interrupted half already landed — and hand the learner a queue they
 * were not halfway through, with `idx` pointing into it. So the snapshot's own queue IS the
 * resumed plan, verbatim, and `planSession` is not called at all.
 *
 * That is also what keeps the count honest: the tick and the `sessionCount + 1` were spent when
 * the session opened, and charging a learner a second session for closing their tab is the
 * divergence PRD §17 names. The hub restores this plan and the snapshot's index; nothing else
 * about the interrupted sitting is restored, because nothing else was stored.
 *
 * **This got simpler when the session did.** It used to branch on the snapshot's phase — a Review
 * snapshot carried its own queue, a Read snapshot carried a position into the rung's sentence list
 * and had its review queue re-planned underneath it. One list of cards (#386) has one answer.
 *
 * It lives in `screens/` rather than in `engine/` because a snapshot is a state shape and the
 * engine imports from no other layer.
 */
import type { SessionPlan } from '../../engine/session.ts';
import type { SessionSnapshot } from '../../state/types.ts';

/** The interrupted session's cards, exactly as they were chosen. Never a fresh plan. */
export function resumePlan(snapshot: SessionSnapshot): SessionPlan {
  return { cardIds: [...snapshot.queue] };
}

/**
 * Is there a session to come back to? A snapshot with an empty queue is not one — it names no
 * cards, so there is nothing to resume TO, and offering it would start a session that ends on its
 * first render.
 */
export function isResumable(snapshot: SessionSnapshot | null): snapshot is SessionSnapshot {
  return snapshot !== null && snapshot.queue.length > 0;
}
