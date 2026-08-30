/**
 * The plan a RESUMED session runs on (#99; PRD §8 F4 "immersive mode + lossless resume", §8 F0 AC
 * "resumable session exactly").
 *
 * The snapshot is a POSITION — `{phase, idx, queue}` and nothing else (PRD §8 F7) — because there
 * is no learner text anywhere in this app to lose (Invariant 6): what a session earned is already
 * in the counters and the review queue, and all an interruption can cost is the place. So resuming
 * is a join of two things, and this module is the join: the stored order of the phase the learner
 * was in, and a plan re-derived for the phases they were not.
 *
 *   • **A `review` snapshot keeps ITS queue, verbatim.** Review's five cards were chosen against a
 *     queue that has since moved — every card marked before the interruption changed a box and a
 *     countdown — so re-deriving that list would drop the cards already answered and shift the
 *     position under the learner. `idx` only means something against the order it was recorded
 *     with.
 *   • **A `read` snapshot has nothing here to restore**, and that is not a gap: Read walks the
 *     rung's own sentence list (#349), which is the same list this session and the next one see,
 *     so the position the snapshot carries is measured against an order that cannot have moved.
 *     The plan it comes back with is a freshly derived Review queue — whatever is due now, because
 *     the chips still guide and never gate, and Review has to be honest the moment it is tapped.
 *
 * **The queue this is planned against must NOT be ticked.** `tickSession` is `startSession`'s, and
 * it is spent once per session (`state/store.ts`): re-ticking on the way back in would bring the
 * whole queue one session closer to due for a second time on the same session's work — the same
 * reason a resume does not touch `sessionCount`. Nothing here writes anything; it is a pure
 * function of a snapshot and the course's current state, like everything in `src/engine/`.
 *
 * It lives in the screen layer rather than in `src/engine/` because it is a JOIN: the engine never
 * imports `src/state/`, and a snapshot is a state shape. Same call `screens/useExitAvailable.ts`
 * (#95) makes for the counters-and-content join.
 */
import { planSession, type SessionPlan, type SessionPlanInput } from '../../engine/session.ts';
import type { SessionSnapshot } from '../../state/types.ts';

/**
 * The queue a resumed session serves: the snapshot's own when it names Review, freshly planned
 * otherwise. A `read` snapshot names no queue in the plan — Read walks the rung itself — so it
 * comes back derived, and the rung's sentence list is what the position is measured against.
 *
 * The array is fresh, so the stored snapshot is never handed out to be mutated.
 */
export function resumePlan(snapshot: SessionSnapshot, input: SessionPlanInput): SessionPlan {
  return {
    reviewIds: snapshot.phase === 'review' ? [...snapshot.queue] : planSession(input).reviewIds,
  };
}

/**
 * Whether a snapshot is something a learner can actually be returned to — a queue with at least
 * one card in it. Nothing in the product writes an empty one (`startSession` refuses to open a
 * session on a rung with no sentences), so this is a tripwire for a damaged or hand-edited
 * document: an offer to resume a session with no cards would strand the learner on a blank card
 * instead of a hub, and the honest answer to a position that names nothing is a fresh Begin.
 */
export function isResumable(snapshot: SessionSnapshot | null): snapshot is SessionSnapshot {
  return snapshot !== null && snapshot.queue.length > 0;
}
