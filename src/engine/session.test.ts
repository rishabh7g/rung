/**
 * The session plan (#96) — the two queues one session serves, and the order they serve them in.
 *
 * Review's order is `dueItems`' and is pinned in `leitner.test.ts`; what this file proves is that
 * the plan takes it verbatim, caps it at five, and that Produce comes back **least-produced first,
 * ties in the module's order** — the property the whole Produce phase rests on, because a rung
 * opens its exit ritual only when every sentence is at 2× (#95).
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

/** The ten sentences of a rung, in the module's own order. */
const RUNG = Array.from(
  { length: 10 },
  (_, index) => `L1-M2-S${String(index + 1).padStart(2, '0')}`,
);

/** A plan over `RUNG` with no reviews due, so a case can be about the Produce order alone. */
function produceOrder(production: Record<string, number>): string[] {
  return planSession({ queue: [], moduleSentenceIds: RUNG, production }).produceIds;
}

/* --------------------------------------------------------------------- review */

describe('the review queue', () => {
  it('serves what is due, in `dueItems`’ order, and nothing that is not', () => {
    const queue = [
      item('L1-M1-S01', 1, 0),
      item('L1-M1-S02', 2, 2), // not due
      item('L1-M2-S01', 1, 0),
    ];

    const plan = planSession({ queue, moduleSentenceIds: RUNG, production: {} });

    // M2 before M1: newest material first, which is the scheduler's rule, not this module's.
    expect(plan.reviewIds).toEqual(['L1-M2-S01', 'L1-M1-S01']);
  });

  it('caps at five — Review is the warm-up, not the session', () => {
    const plan = planSession({
      queue: due('L1-M1-S01', 'L1-M1-S02', 'L1-M1-S03', 'L1-M1-S04', 'L1-M1-S05', 'L1-M1-S06'),
      moduleSentenceIds: RUNG,
      production: {},
    });

    expect(REVIEWS_PER_SESSION).toBe(5);
    expect(plan.reviewIds).toHaveLength(5);
    expect(plan.reviewIds).not.toContain('L1-M1-S06');
  });

  it('is empty when nothing is due — the first rung, and every session that owes nothing', () => {
    const plan = planSession({
      queue: [item('L1-M1-S01', 3, 4)],
      moduleSentenceIds: RUNG,
      production: {},
    });

    expect(plan.reviewIds).toEqual([]);
  });
});

/* -------------------------------------------------------------------- produce */

describe('the produce queue', () => {
  it('is the module’s order when nothing has been produced yet', () => {
    expect(produceOrder({})).toEqual(RUNG);
  });

  it('puts the least-produced sentences first', () => {
    const order = produceOrder({
      'L1-M2-S01': 2,
      'L1-M2-S02': 1,
      'L1-M2-S03': 0,
    });

    expect(order.slice(0, 3)).toEqual(['L1-M2-S03', 'L1-M2-S04', 'L1-M2-S05']);
    expect(order.indexOf('L1-M2-S02')).toBeLessThan(order.indexOf('L1-M2-S01'));
    expect(order.at(-1)).toBe('L1-M2-S01');
  });

  it('breaks ties by the module’s order, never by the id’s text', () => {
    // Every sentence at 1×, and a list whose ids sort the other way round from the module's own
    // order: the answer must be the order the module teaches them in.
    const backwards = [...RUNG].reverse();
    const production = Object.fromEntries(RUNG.map((id) => [id, 1]));

    expect(planSession({ queue: [], moduleSentenceIds: backwards, production }).produceIds).toEqual(
      backwards,
    );
    expect(produceOrder(production)).toEqual(RUNG);
  });

  it('keeps a produced-out sentence, at the end — two is what the ritual asks, not a cap', () => {
    const production = Object.fromEntries(RUNG.map((id) => [id, 2]));
    production['L1-M2-S07'] = 9;

    const order = produceOrder(production);

    expect(order).toHaveLength(RUNG.length);
    expect(order.at(-1)).toBe('L1-M2-S07');
  });

  it('reads a damaged counter as zero rather than trusting it', () => {
    // The counters arrive from localStorage (PRD §8 F7), so anything can be in the map.
    const order = produceOrder({ 'L1-M2-S01': 2, 'L1-M2-S05': -3 } as Record<string, number>);

    expect(order[0]).toBe('L1-M2-S02');
    expect(order.indexOf('L1-M2-S05')).toBeLessThan(order.indexOf('L1-M2-S01'));
  });

  it('is empty when the rung has no sentences — a module still loading plans nothing', () => {
    expect(planSession({ queue: due('L1-M1-S01'), moduleSentenceIds: [], production: {} })).toEqual(
      { reviewIds: ['L1-M1-S01'], produceIds: [] },
    );
  });
});

/* ---------------------------------------------------------------------- purity */

describe('the plan is pure', () => {
  it('reorders nothing the caller owns', () => {
    const queue = Object.freeze(
      due('L1-M1-S02', 'L1-M1-S01').map((entry) => Object.freeze(entry)),
    ) as readonly ReviewItem[];
    const sentenceIds = Object.freeze([...RUNG]);

    const plan = planSession({
      queue,
      moduleSentenceIds: sentenceIds,
      production: { 'L1-M2-S01': 4 },
    });

    expect(queue.map((entry) => entry.sentenceId)).toEqual(['L1-M1-S02', 'L1-M1-S01']);
    expect(sentenceIds).toEqual(RUNG);
    expect(plan.produceIds).not.toBe(sentenceIds);
  });

  it('answers the same thing twice — the hub’s preview and the session’s plan cannot disagree', () => {
    const input = {
      queue: due('L1-M1-S01', 'L1-M1-S02'),
      moduleSentenceIds: RUNG,
      production: { 'L1-M2-S04': 1 },
    };

    expect(planSession(input)).toEqual(planSession(input));
  });
});
