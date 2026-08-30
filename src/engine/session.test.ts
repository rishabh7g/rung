/**
 * The session plan (#96) — the queue one session serves, and the order it serves it in.
 *
 * Review's order is `dueItems`' and is pinned in `leitner.test.ts`; what this file proves is that
 * the plan takes it verbatim and caps it at five.
 *
 * **There used to be a second queue here.** Produce came back least-produced first, ties in the
 * module's order, because a rung opened its exit ritual only when every sentence stood at 2× and
 * the sentence at 0 was worth more than the one at 1. #349 retired the phase with notebook
 * writing and moved the gate to a single Read mark, so the ordering question the queue existed to
 * answer no longer has two answers — Read walks the module's own list — and the cases that pinned
 * it went with it rather than being rewritten to assert a list this module no longer builds.
 */
import { describe, expect, it } from 'vitest';
import type { ReviewItem } from './leitner.ts';
import { planSession, REVIEWS_PER_SESSION } from './session.ts';

/** One queue entry, written the way the cases read: id, box, sessions until due. */
function item(sentenceId: string, box: ReviewItem['box'], dueInSessions: number): ReviewItem {
  return { sentenceId, box, dueInSessions };
}

/** Every item due now — what a queue looks like after `tickSession` has floored it. */
function due(...sentenceIds: string[]): ReviewItem[] {
  return sentenceIds.map((sentenceId) => item(sentenceId, 1, 0));
}

/* --------------------------------------------------------------------- review */

describe('the review queue', () => {
  it('serves what is due, in `dueItems`’ order, and nothing that is not', () => {
    const queue = [
      item('L1-M1-S01', 1, 0),
      item('L1-M1-S02', 2, 2), // not due
      item('L1-M2-S01', 1, 0),
    ];

    const plan = planSession({ queue });

    // M2 before M1: newest material first, which is the scheduler's rule, not this module's.
    expect(plan.reviewIds).toEqual(['L1-M2-S01', 'L1-M1-S01']);
  });

  it('caps at five — Review is the warm-up, not the session', () => {
    const plan = planSession({
      queue: due('L1-M1-S01', 'L1-M1-S02', 'L1-M1-S03', 'L1-M1-S04', 'L1-M1-S05', 'L1-M1-S06'),
    });

    expect(REVIEWS_PER_SESSION).toBe(5);
    expect(plan.reviewIds).toHaveLength(5);
    expect(plan.reviewIds).not.toContain('L1-M1-S06');
  });

  it('is empty when nothing is due — the first rung, and every session that owes nothing', () => {
    const plan = planSession({ queue: [item('L1-M1-S01', 3, 4)] });

    expect(plan.reviewIds).toEqual([]);
  });

  /**
   * The plan is ONE queue now (#349), and the shape is worth pinning rather than only its
   * contents: a `produceIds` key coming back would mean the Produce phase had grown back somewhere
   * downstream, and every consumer of this plan reads it by name.
   */
  it('holds the review queue and nothing else — Read walks the rung, not a plan', () => {
    expect(planSession({ queue: due('L1-M1-S01') })).toEqual({ reviewIds: ['L1-M1-S01'] });
  });
});

/* ---------------------------------------------------------------------- purity */

describe('the plan is pure', () => {
  it('reorders nothing the caller owns', () => {
    const queue = Object.freeze(
      due('L1-M1-S02', 'L1-M1-S01').map((entry) => Object.freeze(entry)),
    ) as readonly ReviewItem[];

    const plan = planSession({ queue });

    expect(queue.map((entry) => entry.sentenceId)).toEqual(['L1-M1-S02', 'L1-M1-S01']);
    // The scheduler's order, not the caller's — which is the point: the plan sorts a COPY.
    expect(plan.reviewIds).toEqual(['L1-M1-S01', 'L1-M1-S02']);
  });

  it('answers the same thing twice — the hub’s preview and the session’s plan cannot disagree', () => {
    const input = { queue: due('L1-M1-S01', 'L1-M1-S02') };

    expect(planSession(input)).toEqual(planSession(input));
  });
});
