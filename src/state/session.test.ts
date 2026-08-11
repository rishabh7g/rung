/**
 * The session's three store actions (#96) — the writes a Practice session makes, and the ones it
 * must never make (PRD §8 F4, §8 F7).
 *
 * Three properties, and each is a promise made somewhere else in the product:
 *
 *   • **`startSession` is called once per fresh session, and it costs one session.** `sessionCount`
 *     is the app's whole clock (Invariant 2) and `tickSession` spends it — so a second call is a
 *     day's queue brought due twice. Lossless resume (#99) restores a snapshot without calling
 *     this at all, which is only safe while the increment lives in exactly one action.
 *   • **The routing contract, from both sides** (PRD §8 F4): a Review mark reaches the Leitner
 *     queue and NOTHING else; a Produce got-it reaches the counters and NOTHING else. The two
 *     numbers answer different questions — what is being kept, and what is being built — and the
 *     self-mark control cannot tell them apart by design, so the session machine must.
 *   • **The snapshot is per course** (Invariant 8): starting, moving and finishing a session in one
 *     course leaves every other course's position exactly where it was.
 */
import { beforeEach, describe, expect, it } from 'vitest';
import { createJSONStorage, type StateStorage } from 'zustand/middleware';
import type { ReviewItem } from './types.ts';
import { useAppStore } from './store.ts';

const COURSE = 'hi-mr';
const OTHER = 'en-ar';

/** The rung being practised — ten sentences, in the module's own order. */
const RUNG = Array.from(
  { length: 10 },
  (_, index) => `L1-M2-S${String(index + 1).padStart(2, '0')}`,
);

function course(courseId = COURSE) {
  const held = useAppStore.getState().courses[courseId];
  if (held === undefined) throw new Error(`session.test: ${courseId} has no state`);
  return held;
}

/** Seeds a course's review queue directly — enrolment is the ritual's (#103), not this file's. */
function seedQueue(queue: readonly ReviewItem[], courseId = COURSE): void {
  useAppStore.setState((state) => ({
    courses: {
      ...state.courses,
      [courseId]: { ...(state.courses[courseId] ?? course(courseId)), reviewQueue: [...queue] },
    },
  }));
}

beforeEach(() => {
  useAppStore.persist.setOptions({
    storage: createJSONStorage(() => {
      const items = new Map<string, string>();
      return {
        getItem: (name) => items.get(name) ?? null,
        setItem: (name, value) => void items.set(name, value),
        removeItem: (name) => void items.delete(name),
      } satisfies StateStorage;
    }),
  });
  useAppStore.getState()._reset();
  useAppStore.getState().ensureCourse(COURSE);
  useAppStore.getState().ensureCourse(OTHER);
});

/* ------------------------------------------------------------------ one session, once */

describe('startSession counts one session, once', () => {
  it('increments sessionCount by exactly one per call', () => {
    useAppStore.getState().startSession(COURSE, RUNG);
    expect(course().sessionCount).toBe(1);

    useAppStore.getState().startSession(COURSE, RUNG);
    expect(course().sessionCount).toBe(2);
  });

  it('is the only action that moves it — a whole session past the start moves it not at all', () => {
    seedQueue([{ sentenceId: 'L1-M1-S01', box: 1, dueInSessions: 0 }]);
    useAppStore.getState().startSession(COURSE, RUNG);

    // Everything a session does after its first card: marks, counters, position, and the clear.
    const store = useAppStore.getState();
    store.recordReview(COURSE, 'L1-M1-S01', true);
    store.setSession(COURSE, { phase: 'produce', idx: 0, queue: RUNG });
    store.recordProduction(COURSE, 'L1-M2-S01');
    store.setSession(COURSE, { phase: 'produce', idx: 1, queue: RUNG });
    store.recordProduction(COURSE, 'L1-M2-S02');
    store.setSession(COURSE, null);

    expect(course().sessionCount).toBe(1);
  });

  it('ticks the review queue once, and floors it — an absence is not a backlog', () => {
    seedQueue([
      { sentenceId: 'L1-M1-S01', box: 2, dueInSessions: 3 },
      { sentenceId: 'L1-M1-S02', box: 1, dueInSessions: 0 },
    ]);

    useAppStore.getState().startSession(COURSE, RUNG);

    expect(course().reviewQueue).toEqual([
      { sentenceId: 'L1-M1-S01', box: 2, dueInSessions: 2 },
      { sentenceId: 'L1-M1-S02', box: 1, dueInSessions: 0 },
    ]);
  });

  it('plans against the TICKED queue: an item due next session is due in this one', () => {
    seedQueue([{ sentenceId: 'L1-M1-S03', box: 1, dueInSessions: 1 }]);

    const plan = useAppStore.getState().startSession(COURSE, RUNG);

    expect(plan.reviewIds).toEqual(['L1-M1-S03']);
    expect(course().session).toEqual({ phase: 'review', idx: 0, queue: ['L1-M1-S03'] });
  });
});

/* ----------------------------------------------------------- the opening snapshot */

describe('the snapshot a fresh session opens on', () => {
  it('starts at Review with the due ids when something is due', () => {
    seedQueue([
      { sentenceId: 'L1-M1-S01', box: 1, dueInSessions: 0 },
      { sentenceId: 'L1-M1-S02', box: 1, dueInSessions: 0 },
    ]);

    const plan = useAppStore.getState().startSession(COURSE, RUNG);

    expect(course().session).toEqual({
      phase: 'review',
      idx: 0,
      queue: ['L1-M1-S01', 'L1-M1-S02'],
    });
    expect(plan.produceIds).toEqual(RUNG);
  });

  it('starts at Read with the rung’s sentences when the queue is empty — the first rung', () => {
    const plan = useAppStore.getState().startSession(COURSE, RUNG);

    expect(plan.reviewIds).toEqual([]);
    expect(course().session).toEqual({ phase: 'read', idx: 0, queue: RUNG });
  });

  it('holds its own copy of the queue — the plan the session runs cannot be edited underneath it', () => {
    const sentenceIds = [...RUNG];

    useAppStore.getState().startSession(COURSE, sentenceIds);
    sentenceIds.push('L1-M2-S11');

    expect(course().session?.queue).toEqual(RUNG);
  });
});

/* ------------------------------------------------------- the routing contract, both ways */

describe('a Review mark reaches the queue and nothing else', () => {
  it('moves the Leitner box and leaves the counters untouched', () => {
    seedQueue([{ sentenceId: 'L1-M1-S01', box: 1, dueInSessions: 0 }]);
    const before = course().production;

    useAppStore.getState().recordReview(COURSE, 'L1-M1-S01', true);

    expect(course().reviewQueue).toEqual([{ sentenceId: 'L1-M1-S01', box: 2, dueInSessions: 3 }]);
    // Same object, not merely equal: nothing rebuilt the counters, so nothing could have counted.
    expect(course().production).toBe(before);
    expect(course().production).toEqual({});
  });

  it('sends a miss back to box 1, and still writes no counter', () => {
    seedQueue([{ sentenceId: 'L1-M1-S01', box: 3, dueInSessions: 0 }]);

    useAppStore.getState().recordReview(COURSE, 'L1-M1-S01', false);

    expect(course().reviewQueue).toEqual([{ sentenceId: 'L1-M1-S01', box: 1, dueInSessions: 1 }]);
    expect(course().production).toEqual({});
  });

  it('is a no-op for a sentence the queue does not hold — a misrouted Produce mark writes nothing', () => {
    seedQueue([{ sentenceId: 'L1-M1-S01', box: 1, dueInSessions: 0 }]);
    const before = course().reviewQueue;

    useAppStore.getState().recordReview(COURSE, 'L1-M2-S01', true);

    expect(course().reviewQueue).toBe(before);
    expect(course().production).toEqual({});
  });
});

describe('a Produce got-it reaches the counters and nothing else', () => {
  it('counts up and leaves the review queue untouched', () => {
    seedQueue([{ sentenceId: 'L1-M1-S01', box: 1, dueInSessions: 0 }]);
    const before = course().reviewQueue;

    useAppStore.getState().recordProduction(COURSE, 'L1-M2-S01');

    expect(course().production).toEqual({ 'L1-M2-S01': 1 });
    expect(course().reviewQueue).toBe(before);
  });

  it('cannot schedule a review even for a sentence that IS enrolled', () => {
    seedQueue([{ sentenceId: 'L1-M1-S01', box: 1, dueInSessions: 0 }]);

    useAppStore.getState().recordProduction(COURSE, 'L1-M1-S01');

    expect(course().reviewQueue).toEqual([{ sentenceId: 'L1-M1-S01', box: 1, dueInSessions: 0 }]);
    expect(course().production).toEqual({ 'L1-M1-S01': 1 });
  });
});

/* ------------------------------------------------------------------ the position */

describe('setSession moves a position, and only a position', () => {
  it('writes the card the learner is on, and clears at the summary', () => {
    useAppStore.getState().startSession(COURSE, RUNG);

    useAppStore.getState().setSession(COURSE, { phase: 'produce', idx: 4, queue: RUNG });
    expect(course().session).toEqual({ phase: 'produce', idx: 4, queue: RUNG });

    useAppStore.getState().setSession(COURSE, null);
    expect(course().session).toBeNull();
  });

  it('is not a write when the position has not changed', () => {
    useAppStore.getState().startSession(COURSE, RUNG);
    useAppStore.getState().setSession(COURSE, { phase: 'produce', idx: 2, queue: RUNG });
    const before = course();

    // A fresh array holding the same ids is the same session — a re-render is not a move.
    useAppStore.getState().setSession(COURSE, { phase: 'produce', idx: 2, queue: [...RUNG] });

    expect(course()).toBe(before);
  });

  it('starts nothing: no session count, no tick, no marks', () => {
    seedQueue([{ sentenceId: 'L1-M1-S01', box: 1, dueInSessions: 2 }]);

    useAppStore.getState().setSession(COURSE, { phase: 'read', idx: 0, queue: RUNG });

    expect(course().sessionCount).toBe(0);
    expect(course().reviewQueue).toEqual([{ sentenceId: 'L1-M1-S01', box: 1, dueInSessions: 2 }]);
  });
});

/* -------------------------------------------------------------------- per course */

describe('a session belongs to its course', () => {
  it('leaves every other course’s count, queue and snapshot exactly where they were', () => {
    seedQueue([{ sentenceId: 'L1-M1-S01', box: 2, dueInSessions: 3 }], OTHER);
    useAppStore.getState().setSession(OTHER, { phase: 'produce', idx: 3, queue: ['L1-M1-S04'] });
    const before = course(OTHER);

    useAppStore.getState().startSession(COURSE, RUNG);
    useAppStore.getState().setSession(COURSE, { phase: 'read', idx: 2, queue: RUNG });
    useAppStore.getState().recordProduction(COURSE, 'L1-M2-S01');

    expect(course(OTHER)).toBe(before);
    expect(course(OTHER).sessionCount).toBe(0);
    expect(course(OTHER).session).toEqual({ phase: 'produce', idx: 3, queue: ['L1-M1-S04'] });
  });

  it('keeps two sessions open at once — one per course, both intact', () => {
    useAppStore.getState().startSession(COURSE, RUNG);
    useAppStore.getState().startSession(OTHER, ['L1-M1-S01', 'L1-M1-S02']);
    useAppStore.getState().setSession(COURSE, { phase: 'produce', idx: 7, queue: RUNG });

    expect(course(COURSE).session).toEqual({ phase: 'produce', idx: 7, queue: RUNG });
    expect(course(OTHER).session).toEqual({
      phase: 'read',
      idx: 0,
      queue: ['L1-M1-S01', 'L1-M1-S02'],
    });
    expect(course(COURSE).sessionCount).toBe(1);
    expect(course(OTHER).sessionCount).toBe(1);
  });

  it('creates nothing for a course it was never given — setSession on a stranger is a no-op', () => {
    useAppStore.getState().setSession('en-es', { phase: 'read', idx: 0, queue: RUNG });

    expect(useAppStore.getState().courses['en-es']).toBeUndefined();
  });
});
