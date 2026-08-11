/**
 * The comprehension draw (#102) — the retry algorithm's two promises, and the PRD's acceptance
 * criterion as arithmetic:
 *
 *   • **no repeats within a test** — never inside an attempt, and never between attempts while
 *     the pool still holds unseen items,
 *   • **exclusion, then recycling** — a pool of 6 supports **≥ 3 fresh attempts before
 *     recycling** (PRD §8 F5's AC, verbatim), and the recycle that follows still never deals
 *     back the attempt just played.
 *
 * The random source is injected, so these are assertions about ids rather than about luck: a
 * sequence of fixed fractions picks known members of a known list, and `always(0)` — "take the
 * first candidate every time" — makes the exclusion order itself readable.
 */
import { describe, expect, it } from 'vitest';
import { drawItems, type Random } from './comprehension.ts';

/** hi-mr L1-M1 ships eight; the authored floor is six (`tools/validate.ts`, `POOL_MIN`). */
const POOL_6 = ['C01', 'C02', 'C03', 'C04', 'C05', 'C06'];
/** What a module asks for per attempt (`exitTest.comprehendCount`). */
const COUNT = 2;

/** Always the first candidate left: the draw becomes the candidate list's own order. */
function always(fraction: number): Random {
  return () => fraction;
}

/** A fixed sequence, recycled — enough to make a specific pair come out of a specific pool. */
function sequence(...fractions: number[]): Random {
  let at = -1;
  return () => {
    at += 1;
    return fractions[at % fractions.length] ?? 0;
  };
}

/** One attempt after another, carrying `used` forward exactly as the screen does. */
function attempts(pool: readonly string[], howMany: number, random: Random): string[][] {
  const used: string[] = [];
  const rounds: string[][] = [];

  for (let round = 0; round < howMany; round += 1) {
    const items = drawItems({ pool, used, count: COUNT, random });
    rounds.push(items);
    used.push(...items);
  }

  return rounds;
}

describe('an attempt never repeats an item', () => {
  it('deals distinct items, whatever the random source says', () => {
    // A source that answers the same number every time would repeat an index under any
    // implementation that indexed rather than removed.
    const items = drawItems({ pool: POOL_6, used: [], count: COUNT, random: always(0) });

    expect(items).toHaveLength(COUNT);
    expect(new Set(items).size).toBe(COUNT);
  });

  it('deals the whole pool when it is smaller than an attempt, and never pads it', () => {
    // The dev fixtures ship two-item pools; a one-item pool is one item, not the same one twice.
    expect(drawItems({ pool: ['C01'], used: [], count: COUNT, random: always(0) })).toEqual([
      'C01',
    ]);
    expect(drawItems({ pool: [], used: [], count: COUNT, random: always(0) })).toEqual([]);
  });

  it('takes from the pool it was given, and reorders nothing the caller holds', () => {
    const pool = [...POOL_6];
    const used = ['C01'];

    const items = drawItems({ pool, used, count: COUNT, random: sequence(0.9, 0.1) });

    expect(pool).toEqual(POOL_6);
    expect(used).toEqual(['C01']);
    expect(items.every((id) => POOL_6.includes(id))).toBe(true);
  });
});

describe('a retry deals fresh items until the pool is exhausted', () => {
  /** PRD §8 F5, acceptance criterion, verbatim. */
  it('a pool of 6 supports ≥ 3 fresh attempts before recycling', () => {
    const rounds = attempts(POOL_6, 3, always(0));
    const dealt = rounds.flat();

    expect(rounds).toHaveLength(3);
    expect(dealt).toHaveLength(6);
    // Three attempts, six sentences, not one of them seen twice.
    expect(new Set(dealt).size).toBe(6);
    expect([...dealt].sort()).toEqual(POOL_6);
  });

  it('excludes everything already used, attempt after attempt', () => {
    const used = ['C01', 'C02', 'C03', 'C04'];

    // Two left in a pool of six: the draw has no choice, and makes the right one.
    expect(
      drawItems({ pool: POOL_6, used, count: COUNT, random: sequence(0.7, 0.2) }).sort(),
    ).toEqual(['C05', 'C06']);
  });

  it('serves an odd pool honestly: the last fresh attempt is short before it recycles', () => {
    // Five items, two an attempt: two fresh attempts, then one item left — which is not an
    // attempt, so the third recycles rather than dealing a single sentence.
    const rounds = attempts(['C01', 'C02', 'C03', 'C04', 'C05'], 3, always(0));

    expect(new Set([...rounds[0]!, ...rounds[1]!]).size).toBe(4);
    expect(rounds[2]).toHaveLength(COUNT);
  });
});

describe('and then it recycles — without ever repeating the round just played', () => {
  it('deals again from the pool once every item has been seen', () => {
    const rounds = attempts(POOL_6, 4, always(0));

    expect(rounds[3]).toHaveLength(COUNT);
    expect(new Set(rounds[3]).size).toBe(COUNT);
    expect(rounds[3]!.every((id) => POOL_6.includes(id))).toBe(true);
  });

  it('never deals back the attempt the learner just failed', () => {
    // Twenty recycles deep, with a source that always takes the first candidate — the state a
    // learner reaches by retrying an exhausted pool over and over, which the PRD allows forever.
    const rounds = attempts(POOL_6, 20, always(0));

    for (let round = 1; round < rounds.length; round += 1) {
      const previous = rounds[round - 1] ?? [];
      const current = rounds[round] ?? [];
      const repeats = current.filter((id) => previous.includes(id));

      expect(repeats, `attempt ${round + 1} deals back ${repeats.join(', ')}`).toEqual([]);
    }
  });

  it('has no choice but to repeat when the pool IS one attempt — and still never within it', () => {
    // The dev fixtures' two-item pool: every attempt is the same pair, in some order, forever.
    const rounds = attempts(['C01', 'C02'], 5, sequence(0.9, 0.1));

    for (const round of rounds) {
      expect(new Set(round).size).toBe(COUNT);
      expect([...round].sort()).toEqual(['C01', 'C02']);
    }
  });
});

describe('the source of chance is an argument, not an import', () => {
  it('is deterministic when the source is', () => {
    const first = drawItems({ pool: POOL_6, used: [], count: COUNT, random: sequence(0.34, 0.81) });
    const again = drawItems({ pool: POOL_6, used: [], count: COUNT, random: sequence(0.34, 0.81) });

    expect(first).toEqual(again);
  });

  it('defaults to Math.random, so the app itself asks for nothing', () => {
    const items = drawItems({ pool: POOL_6, used: [], count: COUNT });

    expect(items).toHaveLength(COUNT);
    expect(new Set(items).size).toBe(COUNT);
  });

  it('spreads over the whole pool across many draws — it is a draw, not a rotation', () => {
    const seen = new Set<string>();
    for (let draw = 0; draw < 200; draw += 1) {
      for (const id of drawItems({ pool: POOL_6, used: [], count: COUNT })) seen.add(id);
    }

    expect(seen.size).toBe(POOL_6.length);
  });
});
