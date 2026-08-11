import { describe, expect, it } from 'vitest';
import type { ReviewItem as PersistedReviewItem } from '../state/types.ts';
import {
  applyMark,
  BOX_INTERVALS,
  dueItems,
  enrol,
  tickSession,
  type ReviewItem,
} from './leitner.ts';

/** One queue entry, written the way the cases read: id, box, sessions until due. */
function item(sentenceId: string, box: ReviewItem['box'], dueInSessions: number): ReviewItem {
  return { sentenceId, box, dueInSessions };
}

/** Every item due now (what a queue looks like after `tickSession` has floored it). */
function due(...sentenceIds: string[]): ReviewItem[] {
  return sentenceIds.map((sentenceId) => item(sentenceId, 1, 0));
}

const idsOf = (items: readonly ReviewItem[]): string[] => items.map((entry) => entry.sentenceId);

/** A deterministic shuffle (mulberry32) — the permutation property needs no real randomness. */
function shuffle<T>(items: readonly T[], seed: number): T[] {
  let state = seed;
  const random = () => {
    state = (state + 0x6d2b79f5) | 0;
    let t = Math.imul(state ^ (state >>> 15), 1 | state);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };

  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j] as T, shuffled[i] as T];
  }
  return shuffled;
}

/** Freezes a queue and its items, so any in-place write throws rather than being asserted away. */
function frozen(items: readonly ReviewItem[]): readonly ReviewItem[] {
  return Object.freeze(items.map((entry) => Object.freeze({ ...entry })));
}

/* ------------------------------------------------------------------ the boxes */

describe('BOX_INTERVALS', () => {
  it('is 1 → 3 → 7 sessions, and stops there', () => {
    expect(BOX_INTERVALS).toEqual({ 1: 1, 2: 3, 3: 7 });
  });
});

describe('applyMark — got it', () => {
  it('promotes a box and schedules that box’s interval', () => {
    const queue = [item('L1-M1-S01', 1, 0)];

    const box2 = applyMark(queue, 'L1-M1-S01', true);
    expect(box2).toEqual([item('L1-M1-S01', 2, 3)]);

    const box3 = applyMark(box2, 'L1-M1-S01', true);
    expect(box3).toEqual([item('L1-M1-S01', 3, 7)]);
  });

  it('caps at box 3 — a fourth got-it is still box 3, due in 7', () => {
    const queue = [item('L1-M1-S01', 3, 0)];

    expect(applyMark(queue, 'L1-M1-S01', true)).toEqual([item('L1-M1-S01', 3, 7)]);
    expect(applyMark(applyMark(queue, 'L1-M1-S01', true), 'L1-M1-S01', true)).toEqual([
      item('L1-M1-S01', 3, 7),
    ]);
  });

  it('touches only the marked sentence', () => {
    const queue = [item('L1-M1-S01', 1, 0), item('L1-M1-S02', 2, 0)];

    expect(applyMark(queue, 'L1-M1-S02', true)).toEqual([
      item('L1-M1-S01', 1, 0),
      item('L1-M1-S02', 3, 7),
    ]);
  });
});

describe('applyMark — missed', () => {
  it('sends box 3 all the way back to box 1, due next session', () => {
    expect(applyMark([item('L1-M1-S01', 3, 0)], 'L1-M1-S01', false)).toEqual([
      item('L1-M1-S01', 1, 1),
    ]);
  });

  it('resets from every box the same way', () => {
    const boxes: ReviewItem['box'][] = [1, 2, 3];

    for (const box of boxes) {
      expect(applyMark([item('L1-M1-S01', box, 0)], 'L1-M1-S01', false)).toEqual([
        item('L1-M1-S01', 1, 1),
      ]);
    }
  });

  it('is a no-op for a sentence the queue does not hold — Produce marks are #95’s counters', () => {
    const queue = [item('L1-M1-S01', 2, 3)];

    expect(applyMark(queue, 'L1-M2-S01', false)).toEqual(queue);
    expect(applyMark(queue, 'L1-M2-S01', true)).toEqual(queue);
  });
});

/* ------------------------------------------------------------------ the tick */

describe('tickSession', () => {
  it('brings every item one session closer to due', () => {
    const queue = [item('L1-M1-S01', 3, 7), item('L1-M1-S02', 2, 3), item('L1-M1-S03', 1, 1)];

    expect(tickSession(queue)).toEqual([
      item('L1-M1-S01', 3, 6),
      item('L1-M1-S02', 2, 2),
      item('L1-M1-S03', 1, 0),
    ]);
  });

  it('floors at 0 — a long absence is not a backlog', () => {
    const queue = [item('L1-M1-S01', 1, 0)];

    let ticked = queue;
    for (let session = 0; session < 40; session += 1) ticked = tickSession(ticked);

    expect(ticked).toEqual([item('L1-M1-S01', 1, 0)]);
  });

  it('leaves box and id alone — it only moves the countdown', () => {
    expect(tickSession([item('L1-M1-S01', 3, 7)])).toEqual([item('L1-M1-S01', 3, 6)]);
  });

  it('takes an empty queue to an empty queue', () => {
    expect(tickSession([])).toEqual([]);
  });
});

/* ------------------------------------------------------------------ the order */

describe('dueItems — what is due', () => {
  it('serves only items at or past due', () => {
    const queue = [
      item('L1-M1-S01', 1, 0),
      item('L1-M1-S02', 2, 2),
      item('L1-M1-S03', 3, 7),
      item('L1-M1-S04', 1, -1),
    ];

    expect(idsOf(dueItems(queue))).toEqual(['L1-M1-S04', 'L1-M1-S01']);
  });

  it('is empty when nothing is due, and when there is no queue at all', () => {
    expect(dueItems([item('L1-M1-S01', 2, 3)])).toEqual([]);
    expect(dueItems([])).toEqual([]);
  });
});

describe('dueItems — the order', () => {
  it('puts the most overdue first', () => {
    const queue = [
      item('L1-M1-S01', 1, 0),
      item('L1-M1-S02', 1, -3),
      item('L1-M1-S03', 1, -1),
      item('L1-M1-S04', 1, -2),
    ];

    expect(idsOf(dueItems(queue))).toEqual(['L1-M1-S02', 'L1-M1-S04', 'L1-M1-S03', 'L1-M1-S01']);
  });

  it('breaks a due-ness tie by module, newest first — and reads the numbers, not the text', () => {
    // Lexicographically 'L1-M10-S01' < 'L1-M9-S01', so a raw string sort files the module the
    // learner just passed BEHIND the one before it. M10 is newer, so M10 comes first.
    expect(idsOf(dueItems(due('L1-M9-S01', 'L1-M10-S01')))).toEqual(['L1-M10-S01', 'L1-M9-S01']);
    expect(idsOf(dueItems(due('L1-M10-S01', 'L1-M9-S01')))).toEqual(['L1-M10-S01', 'L1-M9-S01']);
    expect(idsOf(dueItems(due('L1-M2-S01', 'L1-M10-S01', 'L1-M9-S01', 'L1-M1-S01')))).toEqual([
      'L1-M10-S01',
      'L1-M9-S01',
      'L1-M2-S01',
      'L1-M1-S01',
    ]);
  });

  it('counts a later level as newer than any module below it', () => {
    expect(idsOf(dueItems(due('L1-M10-S01', 'L2-M1-S01', 'L3-M2-S01')))).toEqual([
      'L3-M2-S01',
      'L2-M1-S01',
      'L1-M10-S01',
    ]);
  });

  it('then keeps the module’s own sentence order', () => {
    expect(idsOf(dueItems(due('L1-M3-S03', 'L1-M3-S01', 'L1-M3-S10', 'L1-M3-S02')))).toEqual([
      'L1-M3-S01',
      'L1-M3-S02',
      'L1-M3-S03',
      'L1-M3-S10',
    ]);
  });

  it('applies both tie-breaks together — due-ness beats recency, recency beats sentence order', () => {
    const queue = [
      item('L1-M2-S02', 1, 0),
      item('L1-M2-S01', 1, 0),
      item('L1-M9-S01', 1, 0),
      item('L1-M1-S01', 1, -2),
    ];

    expect(idsOf(dueItems(queue))).toEqual([
      'L1-M1-S01', // most overdue, whatever module it is from
      'L1-M9-S01', // newest module of the rest
      'L1-M2-S01', // same module → sentence order
      'L1-M2-S02',
    ]);
  });
});

describe('dueItems — the cap', () => {
  it('serves the 5 most urgent of 7 due by default', () => {
    const queue = due(
      'L1-M1-S01',
      'L1-M2-S01',
      'L1-M3-S01',
      'L1-M4-S01',
      'L1-M5-S01',
      'L1-M6-S01',
      'L1-M7-S01',
    );

    expect(idsOf(dueItems(queue))).toEqual([
      'L1-M7-S01',
      'L1-M6-S01',
      'L1-M5-S01',
      'L1-M4-S01',
      'L1-M3-S01',
    ]);
  });

  it('honours an explicit max, and never over-serves a short queue', () => {
    const queue = due('L1-M1-S01', 'L1-M2-S01', 'L1-M3-S01');

    expect(idsOf(dueItems(queue, 2))).toEqual(['L1-M3-S01', 'L1-M2-S01']);
    expect(idsOf(dueItems(queue, 10))).toEqual(['L1-M3-S01', 'L1-M2-S01', 'L1-M1-S01']);
  });

  it('serves nothing for a max of 0 or less — never the tail of the queue', () => {
    const queue = due('L1-M1-S01', 'L1-M2-S01');

    expect(dueItems(queue, 0)).toEqual([]);
    expect(dueItems(queue, -1)).toEqual([]);
  });
});

/* ---------------------------------------------------------------- enrolment */

describe('enrol', () => {
  it('adds a passed module’s sentences at box 1, due next session', () => {
    expect(enrol([], ['L1-M1-S01', 'L1-M1-S02'])).toEqual([
      item('L1-M1-S01', 1, 1),
      item('L1-M1-S02', 1, 1),
    ]);
  });

  it('is idempotent — re-enrolling never resets a box or a countdown', () => {
    const queue = [item('L1-M1-S01', 3, 5), item('L1-M1-S02', 2, 1)];
    const sentences = ['L1-M1-S01', 'L1-M1-S02'];

    expect(enrol(queue, sentences)).toEqual(queue);
    expect(enrol(enrol(queue, sentences), sentences)).toEqual(queue);
  });

  it('adds only the ids the queue is missing, keeping the ones it has', () => {
    const queue = [item('L1-M1-S01', 3, 5)];

    expect(enrol(queue, ['L1-M1-S01', 'L1-M1-S02'])).toEqual([
      item('L1-M1-S01', 3, 5),
      item('L1-M1-S02', 1, 1),
    ]);
  });

  it('collapses duplicates inside one call', () => {
    expect(enrol([], ['L1-M1-S01', 'L1-M1-S01'])).toEqual([item('L1-M1-S01', 1, 1)]);
  });

  it('enrols nothing for an empty module', () => {
    const queue = [item('L1-M1-S01', 2, 3)];

    expect(enrol(queue, [])).toEqual(queue);
  });

  it('holds the sentences back one session — enrolled today, due next time', () => {
    const enrolled = enrol([], ['L1-M1-S01']);

    expect(dueItems(enrolled)).toEqual([]);
    expect(dueItems(tickSession(enrolled))).toEqual([item('L1-M1-S01', 1, 0)]);
  });
});

/* ------------------------------------------------------- purity and determinism */

describe('the module is pure', () => {
  const queue = [item('L1-M2-S01', 2, 0), item('L1-M1-S01', 1, -1), item('L1-M3-S01', 3, 4)];

  it('never writes to the queue it is given', () => {
    const input = frozen(queue);

    expect(() => tickSession(input)).not.toThrow();
    expect(() => dueItems(input)).not.toThrow();
    expect(() => applyMark(input, 'L1-M1-S01', true)).not.toThrow();
    expect(() => enrol(input, ['L1-M9-S01'])).not.toThrow();
    expect(input).toEqual(queue);
  });

  it('returns a new array every time, sharing no item with the caller’s', () => {
    const ticked = tickSession(queue);

    expect(ticked).not.toBe(queue);
    expect(ticked[0]).not.toBe(queue[0]);
    expect(enrol(queue, [])).not.toBe(queue);
    expect(applyMark(queue, 'L1-M1-S01', true)).not.toBe(queue);
    expect(dueItems(queue)).not.toBe(queue);
  });

  it('answers the same thing twice for the same input', () => {
    expect(tickSession(queue)).toEqual(tickSession(queue));
    expect(dueItems(queue)).toEqual(dueItems(queue));
    expect(applyMark(queue, 'L1-M2-S01', true)).toEqual(applyMark(queue, 'L1-M2-S01', true));
    expect(enrol(queue, ['L1-M9-S01'])).toEqual(enrol(queue, ['L1-M9-S01']));
  });

  it('serves the same review list whatever order the queue is stored in', () => {
    // The ordering is a TOTAL order over distinct ids, so storage order cannot leak into it —
    // which is what makes a session's Review phase reproducible after an export/import round trip.
    const stored = [
      item('L1-M10-S02', 1, 0),
      item('L1-M10-S01', 1, 0),
      item('L2-M1-S01', 2, -2),
      item('L1-M9-S01', 3, 0),
      item('L1-M2-S01', 1, -1),
      item('L1-M1-S01', 1, 3),
      item('L3-M4-S07', 2, 0),
    ];
    const expected = idsOf(dueItems(stored));

    expect(expected).toEqual(['L2-M1-S01', 'L1-M2-S01', 'L3-M4-S07', 'L1-M10-S01', 'L1-M10-S02']);
    for (let seed = 0; seed < 50; seed += 1) {
      expect(idsOf(dueItems(shuffle(stored, seed)))).toEqual(expected);
    }
  });
});

describe('the persisted shape', () => {
  it('is this shape — a state v6 reviewQueue entry passes straight into the engine', () => {
    // PRD §8 F7 verbatim, from src/state/types.ts. The engine imports nothing from the state
    // layer; this assignment is the proof that it does not have to.
    const persisted: PersistedReviewItem = { sentenceId: 'L1-M1-S03', box: 2, dueInSessions: 1 };
    const asEngineItem: ReviewItem = persisted;
    const backToState: PersistedReviewItem[] = applyMark([asEngineItem], 'L1-M1-S03', true);

    expect(backToState).toEqual([{ sentenceId: 'L1-M1-S03', box: 3, dueInSessions: 7 }]);
  });
});
