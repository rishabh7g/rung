import { createJSONStorage, type StateStorage } from 'zustand/middleware';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  STORAGE_KEY,
  emptyCourseState,
  initialState,
  migrate,
  persistedSlice,
  progressionInput,
  useAppStore,
} from './store.ts';
import { exitAvailable } from '../engine/exit.ts';
import { currentRungId, deriveStatuses, ladderFromLevels } from '../engine/progression.ts';
import { levelsFixture } from '../test/courseContent.ts';
import { STATE_VERSION, type CourseState } from './types.ts';

/**
 * Storage the test owns: what the app writes is a string under a key, and reading that string
 * back is the only honest way to prove a reload survives. In-memory rather than jsdom's
 * localStorage so a case can seed a payload (a v5 document) and read the exact bytes out.
 */
function memoryStorage() {
  const items = new Map<string, string>();
  /** Every document written, oldest first — how "one write" is proved rather than asserted. */
  const writes: string[] = [];

  return {
    items,
    writes,
    api: {
      getItem: (name: string) => items.get(name) ?? null,
      setItem: (name: string, value: string) => {
        writes.push(value);
        items.set(name, value);
      },
      removeItem: (name: string) => void items.delete(name),
    } satisfies StateStorage,
  };
}

let storage: ReturnType<typeof memoryStorage>;

/** The raw document as it sits in storage: `{state, version}`, exactly what a reload reads. */
function stored(): { state: unknown; version: number } {
  const raw = storage.items.get(STORAGE_KEY);
  if (raw === undefined) throw new Error(`nothing written to ${STORAGE_KEY}`);
  return JSON.parse(raw) as { state: unknown; version: number };
}

/** Stands in for a domain write (#96, #103) — the store ships no action that does this. */
function writeCourse(courseId: string, patch: Partial<CourseState>): void {
  useAppStore.setState((state) => ({
    courses: {
      ...state.courses,
      [courseId]: { ...emptyCourseState(), ...state.courses[courseId], ...patch },
    },
  }));
}

beforeEach(() => {
  storage = memoryStorage();
  useAppStore.persist.setOptions({ storage: createJSONStorage(() => storage.api) });
  useAppStore.getState()._reset();
  // The transient tier `switchCourse` sweeps — a leftover key must not leak between cases.
  sessionStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('state v11', () => {
  it('starts as the shape the PRD prints — the drift guard (§8 F7)', () => {
    expect(persistedSlice(useAppStore.getState())).toEqual({
      stateVersion: STATE_VERSION,
      activeCourse: '',
      courses: {},
      settings: { elapsedTickEnabled: true, userLang: '' },
    });
  });

  it('gives a fresh course the six per-course keys, and no seventh', () => {
    useAppStore.getState().ensureCourse('hi-mr');

    const course = useAppStore.getState().courses['hi-mr'];
    expect(course).toEqual({
      modules: {},
      production: {},
      reviewQueue: [],
      sessionCount: 0,
      studied: {},
      session: null,
    });
    // The v2 shape carried an `attempts` array holding the learner's own sentences. v6 stores
    // nothing the learner wrote, anywhere (Invariant 4) — this is where that stays true.
    expect(Object.keys(course ?? {}).sort()).toEqual([
      'modules',
      'production',
      'reviewQueue',
      'session',
      'sessionCount',
      'studied',
    ]);
  });

  /**
   * v9 settings is two keys (#322): the tick, and the user's own language — unset at first run,
   * which means "follow the active course's L1" and is why an existing learner sees no change.
   */
  it('defaults the tick ON pending [Q3] (#70), and the language unset — settings is two keys', () => {
    expect(useAppStore.getState().settings).toEqual({ elapsedTickEnabled: true, userLang: '' });
  });

  it('persists under rung:state, versioned 11', () => {
    useAppStore.getState().ensureCourse('hi-mr');

    expect(stored().version).toBe(STATE_VERSION);
    expect(storage.items.has('rung:state')).toBe(true);
  });

  it('persists the state and never the actions', () => {
    useAppStore.getState().ensureCourse('hi-mr');

    expect(Object.keys(stored().state as object).sort()).toEqual([
      'activeCourse',
      'courses',
      'settings',
      'stateVersion',
    ]);
  });
});

describe('ensureCourse', () => {
  it('creates the subtree once and is idempotent — a second call is not a write', () => {
    const { ensureCourse } = useAppStore.getState();
    ensureCourse('hi-mr');
    const created = useAppStore.getState().courses['hi-mr'];

    ensureCourse('hi-mr');

    // Same object, not merely equal: an existing ladder is never rebuilt from empty.
    expect(useAppStore.getState().courses['hi-mr']).toBe(created);
  });

  it('never touches a course it already knows, however full it is', () => {
    const { ensureCourse } = useAppStore.getState();
    ensureCourse('hi-mr');
    writeCourse('hi-mr', { sessionCount: 14, studied: { 'L1-M3': true } });

    ensureCourse('hi-mr');

    expect(useAppStore.getState().courses['hi-mr']?.sessionCount).toBe(14);
  });
});

/* ------------------------------------------------------------------ progression */

/** The emitted ladder, as the course layer would hand it over: L1's third rung is unauthored. */
function hiMrLadder() {
  return ladderFromLevels(levelsFixture('hi-mr').levels);
}

/** A clock the test owns, so `passedAt` is an assertion rather than a timestamp. */
const AT = '2026-02-02T02:40:00.000Z';
const fixedClock = () => AT;

/** hi-mr, with its ladder registered and nothing passed. */
function bootHiMr(ladder = hiMrLadder()) {
  const { ensureCourse, setLadder } = useAppStore.getState();
  ensureCourse('hi-mr');
  setLadder('hi-mr', ladder);
}

describe('setLadder', () => {
  it('gives a course its ladder, and that ladder never reaches storage', () => {
    bootHiMr();

    expect(useAppStore.getState().ladders['hi-mr']?.[0]?.moduleIds).toEqual([
      'L1-M1',
      'L1-M2',
      'L1-M3',
    ]);
    expect(Object.keys(stored().state as object)).not.toContain('ladders');
  });

  it('is not a write when the ladder is the one already registered', () => {
    const ladder = hiMrLadder();
    bootHiMr(ladder);
    const before = useAppStore.getState().ladders;

    useAppStore.getState().setLadder('hi-mr', ladder);

    expect(useAppStore.getState().ladders).toBe(before);
  });

  it('keeps a ladder per course — hi-mr cannot answer questions about en-ar', () => {
    bootHiMr();

    expect(currentRungId(progressionInput(useAppStore.getState(), 'hi-mr'))).toBe('L1-M1');
    expect(currentRungId(progressionInput(useAppStore.getState(), 'en-ar'))).toBeNull();
  });
});

describe('markStudied', () => {
  it('records the first open of a module, and is idempotent after that', () => {
    bootHiMr();
    const { markStudied } = useAppStore.getState();

    markStudied('hi-mr', 'L1-M1');
    const studied = useAppStore.getState().courses['hi-mr']?.studied;
    markStudied('hi-mr', 'L1-M1');

    expect(studied).toEqual({ 'L1-M1': true });
    // Same object back: a second open is not a write, so it cannot re-render the ladder either.
    expect(useAppStore.getState().courses['hi-mr']?.studied).toBe(studied);
  });

  it('marks without unlocking — reading every module leaves every status where it was', () => {
    bootHiMr();
    const before = deriveStatuses(progressionInput(useAppStore.getState(), 'hi-mr'));

    for (const moduleId of ['L1-M1', 'L1-M2', 'L1-M3', 'L2-M1']) {
      useAppStore.getState().markStudied('hi-mr', moduleId);
    }

    const after = deriveStatuses(progressionInput(useAppStore.getState(), 'hi-mr'));
    expect(useAppStore.getState().courses['hi-mr']?.modules).toEqual({});
    // Only the current rung notices at all, and only by moving unlocked → in_progress.
    expect(before['L1-M1']).toBe('unlocked');
    expect(after['L1-M1']).toBe('in_progress');
    expect(after['L1-M2']).toBe('locked');
    expect(after['L2-M1']).toBe('locked');
  });

  it('stays inside its course', () => {
    bootHiMr();
    useAppStore.getState().ensureCourse('en-ar');
    const enAr = useAppStore.getState().courses['en-ar'];

    useAppStore.getState().markStudied('hi-mr', 'L1-M1');

    expect(useAppStore.getState().courses['en-ar']).toBe(enAr);
  });
});

/**
 * The counters themselves (#95). That they can only ever RISE — one writer, `+ 1` and nothing
 * else, no action able to move them — is `productionCounters.test.ts`; what they mean once written
 * is `engine/exit.test.ts`. This is the action doing its one job.
 */
describe('recordProduction', () => {
  it('counts one got-it, and keeps counting on the same sentence', () => {
    bootHiMr();
    const { recordProduction } = useAppStore.getState();

    recordProduction('hi-mr', 'L1-M1-S01');
    expect(useAppStore.getState().courses['hi-mr']?.production).toEqual({ 'L1-M1-S01': 1 });

    recordProduction('hi-mr', 'L1-M1-S01');
    expect(useAppStore.getState().courses['hi-mr']?.production).toEqual({ 'L1-M1-S01': 2 });
  });

  it('is what makes a rung exit-available, through the engine and never on its own', () => {
    bootHiMr();
    const sentences = ['L1-M1-S01', 'L1-M1-S02'];
    const ready = () =>
      exitAvailable(sentences, useAppStore.getState().courses['hi-mr']?.production ?? {});

    expect(ready()).toBe(false);

    useAppStore.getState().recordProduction('hi-mr', 'L1-M1-S01');
    // One sentence marked is not a rung: the gate is one mark APIECE (#349), not one in total.
    expect(ready()).toBe(false);

    useAppStore.getState().recordProduction('hi-mr', 'L1-M1-S02');
    expect(ready()).toBe(true);
    // …and it did not unlock anything on the way: the ritual is still the only path (Invariant 1).
    expect(useAppStore.getState().courses['hi-mr']?.modules).toEqual({});
    expect(deriveStatuses(progressionInput(useAppStore.getState(), 'hi-mr'))['L1-M1']).toBe(
      'unlocked',
    );
  });

  it('survives a reload — the counters are persisted state, not session state', async () => {
    bootHiMr();
    useAppStore.getState().recordProduction('hi-mr', 'L1-M1-S01');
    const document_ = storage.items.get(STORAGE_KEY) ?? '';

    // The reload: state gone, storage kept — then boot.
    useAppStore.getState()._reset();
    storage.items.set(STORAGE_KEY, document_);
    await useAppStore.persist.rehydrate();

    expect(useAppStore.getState().courses['hi-mr']?.production).toEqual({ 'L1-M1-S01': 1 });
  });
});

describe('passRitual (Invariant 1 — the only unlock path)', () => {
  it('passes the current rung and stamps it from the clock it was given', () => {
    bootHiMr();

    useAppStore.getState().passRitual('hi-mr', 'L1-M1', fixedClock);

    expect(useAppStore.getState().courses['hi-mr']?.modules).toEqual({
      'L1-M1': { status: 'passed', passedAt: AT },
    });
    expect(
      (stored().state as { courses: Record<string, CourseState> }).courses['hi-mr']?.modules,
    ).toEqual({ 'L1-M1': { status: 'passed', passedAt: AT } });
  });

  it('defaults to the system clock — the app calls it with two arguments', () => {
    vi.useFakeTimers();
    vi.setSystemTime(1_770_000_000_000);
    bootHiMr();

    useAppStore.getState().passRitual('hi-mr', 'L1-M1');

    expect(useAppStore.getState().courses['hi-mr']?.modules['L1-M1']?.passedAt).toBe(
      '2026-02-02T02:40:00.000Z',
    );
    vi.useRealTimers();
  });

  it('moves the ladder on: the next rung becomes current, fresh again', () => {
    bootHiMr();

    useAppStore.getState().passRitual('hi-mr', 'L1-M1', fixedClock);

    const statuses = deriveStatuses(progressionInput(useAppStore.getState(), 'hi-mr'));
    expect(currentRungId(progressionInput(useAppStore.getState(), 'hi-mr'))).toBe('L1-M2');
    expect(statuses['L1-M1']).toBe('passed');
    expect(statuses['L1-M2']).toBe('unlocked');
  });

  it('refuses a rung further up the ladder, and writes nothing on the way out', () => {
    bootHiMr();
    const before = useAppStore.getState().courses;

    expect(() => useAppStore.getState().passRitual('hi-mr', 'L1-M2', fixedClock)).toThrow(
      /not hi-mr's current rung \(L1-M1\)/,
    );
    // The whole course map, by reference: a refusal is not a write.
    expect(useAppStore.getState().courses).toBe(before);
    expect(useAppStore.getState().courses['hi-mr']?.modules).toEqual({});
  });

  it('refuses a module the learner already passed — the ritual has moved on', () => {
    bootHiMr();
    useAppStore.getState().passRitual('hi-mr', 'L1-M1', fixedClock);
    const passed = useAppStore.getState().courses['hi-mr']?.modules;

    expect(() =>
      useAppStore.getState().passRitual('hi-mr', 'L1-M1', () => '2026-09-09T09:09:09.000Z'),
    ).toThrow(/current rung \(L1-M2\)/);
    expect(useAppStore.getState().courses['hi-mr']?.modules).toBe(passed);
  });

  it('refuses everything when the store has no ladder for that course', () => {
    useAppStore.getState().ensureCourse('hi-mr');

    expect(() => useAppStore.getState().passRitual('hi-mr', 'L1-M1', fixedClock)).toThrow(
      /no rung is current/,
    );
    expect(useAppStore.getState().courses['hi-mr']?.modules).toEqual({});
  });

  it('opens a sealed level only when the level below it is complete (PRD-design §5)', () => {
    const ladder = ladderFromLevels([
      {
        modules: [
          { id: 'L1-M1', hasContent: true },
          { id: 'L1-M2', hasContent: true },
        ],
      },
      { modules: [{ id: 'L2-M1', hasContent: true }] },
    ]);
    bootHiMr(ladder);
    const { passRitual } = useAppStore.getState();

    passRitual('hi-mr', 'L1-M1', fixedClock);
    expect(() => passRitual('hi-mr', 'L2-M1', fixedClock)).toThrow(/current rung \(L1-M2\)/);
    passRitual('hi-mr', 'L1-M2', fixedClock);

    expect(currentRungId(progressionInput(useAppStore.getState(), 'hi-mr'))).toBe('L2-M1');
  });

  it('passes in one course only — the other ladders do not move (Invariant 8)', () => {
    bootHiMr();
    const { ensureCourse, setLadder, passRitual } = useAppStore.getState();
    ensureCourse('en-ar');
    setLadder('en-ar', ladderFromLevels(levelsFixture('en-ar').levels));
    const enAr = useAppStore.getState().courses['en-ar'];

    passRitual('hi-mr', 'L1-M1', fixedClock);

    expect(useAppStore.getState().courses['en-ar']).toBe(enAr);
    expect(useAppStore.getState().courses['en-ar']).toEqual(emptyCourseState());
    expect(currentRungId(progressionInput(useAppStore.getState(), 'en-ar'))).toBe('L1-M1');
  });
});

/**
 * `completeRitual` (#103) — the end of the exit ritual: the module passes AND its sentences enter
 * review, in ONE persisted document.
 *
 * The atomicity is the point, and it is asymmetric. A document holding a passed module whose
 * sentences never enrolled is **unrecoverable** — `passRitual` refuses a rung that is no longer
 * current, so there is no second chance to enrol them and they never come up for review again —
 * while a replay costs nothing, because `enrol` is idempotent. So the storage spy counts writes:
 * exactly one, carrying both facts.
 */
describe('completeRitual (the ritual’s one write)', () => {
  /** The sentences a rung teaches, as the Verdict reads them off the module file. */
  const SENTENCES = ['L1-M1-S01', 'L1-M1-S02'];

  /** The course subtree as it sits in storage — the bytes a reload would restore. */
  function storedCourse(document: string) {
    const { state } = JSON.parse(document) as { state: { courses: Record<string, CourseState> } };
    return state.courses['hi-mr'];
  }

  it('passes the rung and enrols its sentences in a single persisted document', () => {
    bootHiMr();
    const before = storage.writes.length;

    useAppStore.getState().completeRitual('hi-mr', 'L1-M1', SENTENCES, fixedClock);

    // ONE write. Two would mean a moment — however short — in which storage held one half.
    expect(storage.writes.length - before).toBe(1);

    const written = storedCourse(storage.writes.at(-1) as string);
    expect(written?.modules).toEqual({ 'L1-M1': { status: 'passed', passedAt: AT } });
    expect(written?.reviewQueue).toEqual([
      { sentenceId: 'L1-M1-S01', box: 1, dueInSessions: 1 },
      { sentenceId: 'L1-M1-S02', box: 1, dueInSessions: 1 },
    ]);
  });

  it('never writes a passed module without its enrolment — every document holds both or neither', () => {
    bootHiMr();

    useAppStore.getState().completeRitual('hi-mr', 'L1-M1', SENTENCES, fixedClock);

    // Every document this course has ever been in, read back: the pass and the enrolment are
    // either both there or both absent. A half-written ritual would show up here as the one
    // document that has the module and an empty queue.
    for (const document of storage.writes) {
      const course = storedCourse(document);
      if (course === undefined) continue;
      expect(Object.keys(course.modules).length > 0).toBe(course.reviewQueue.length > 0);
    }
  });

  it('enters the queue at box 1, due next session — a rung passed today is not reviewed today', () => {
    bootHiMr();

    useAppStore.getState().completeRitual('hi-mr', 'L1-M1', SENTENCES, fixedClock);

    expect(useAppStore.getState().courses['hi-mr']?.reviewQueue).toEqual([
      { sentenceId: 'L1-M1-S01', box: 1, dueInSessions: 1 },
      { sentenceId: 'L1-M1-S02', box: 1, dueInSessions: 1 },
    ]);
  });

  it('leaves an already-enrolled sentence exactly where it is (enrol is idempotent)', () => {
    bootHiMr();
    useAppStore.getState().completeRitual('hi-mr', 'L1-M1', SENTENCES, fixedClock);
    // A session's worth of review: S01 promoted to box 2 and bought three sessions.
    useAppStore.getState().recordReview('hi-mr', 'L1-M1-S01', true);

    useAppStore.getState().completeRitual('hi-mr', 'L1-M2', ['L1-M1-S01', 'L1-M2-S01'], fixedClock);

    expect(useAppStore.getState().courses['hi-mr']?.reviewQueue).toEqual([
      { sentenceId: 'L1-M1-S01', box: 2, dueInSessions: 3 },
      { sentenceId: 'L1-M1-S02', box: 1, dueInSessions: 1 },
      { sentenceId: 'L1-M2-S01', box: 1, dueInSessions: 1 },
    ]);
  });

  it('refuses anything but the current rung — and writes neither half on the way out', () => {
    bootHiMr();
    const before = useAppStore.getState().courses;
    const writes = storage.writes.length;

    expect(() =>
      useAppStore.getState().completeRitual('hi-mr', 'L1-M2', ['L1-M2-S01'], fixedClock),
    ).toThrow(/not hi-mr's current rung \(L1-M1\)/);

    // The guard is `passRitual`'s, and it runs before the write — so nothing reached storage at
    // all, not even the enrolment (Invariant 1: one unlock path, one place it is checked).
    expect(useAppStore.getState().courses).toBe(before);
    expect(storage.writes.length).toBe(writes);
  });

  it('takes the system clock when the app calls it with three arguments', () => {
    vi.useFakeTimers();
    vi.setSystemTime(1_770_000_000_000);
    bootHiMr();

    useAppStore.getState().completeRitual('hi-mr', 'L1-M1', SENTENCES);

    expect(useAppStore.getState().courses['hi-mr']?.modules['L1-M1']?.passedAt).toBe(
      '2026-02-02T02:40:00.000Z',
    );
    vi.useRealTimers();
  });

  it('enrols nothing when the rung teaches nothing, and still passes it', () => {
    bootHiMr();

    useAppStore.getState().completeRitual('hi-mr', 'L1-M1', [], fixedClock);

    expect(useAppStore.getState().courses['hi-mr']?.modules['L1-M1']?.status).toBe('passed');
    expect(useAppStore.getState().courses['hi-mr']?.reviewQueue).toEqual([]);
  });

  it('touches one course only (Invariant 8)', () => {
    bootHiMr();
    const { ensureCourse } = useAppStore.getState();
    ensureCourse('en-ar');
    const enAr = useAppStore.getState().courses['en-ar'];

    useAppStore.getState().completeRitual('hi-mr', 'L1-M1', SENTENCES, fixedClock);

    expect(useAppStore.getState().courses['en-ar']).toBe(enAr);
  });
});

describe('progressionInput', () => {
  it('reads the passed set off the modules map and the flags off studied', () => {
    bootHiMr();
    useAppStore.getState().markStudied('hi-mr', 'L1-M1');
    useAppStore.getState().passRitual('hi-mr', 'L1-M1', fixedClock);

    const input = progressionInput(useAppStore.getState(), 'hi-mr');

    expect([...input.passed]).toEqual(['L1-M1']);
    expect(input.studied('L1-M1')).toBe(true);
    expect(input.studied('L1-M2')).toBe(false);
  });

  it('reports nothing exit-ready without a predicate — the counters alone cannot answer', () => {
    bootHiMr();
    // Every sentence of the fixture's L1-M1, produced twice: the store still says false, because
    // "every sentence" is a fact about the module file, which is content the store never holds.
    // `screens/useExitAvailable.ts` is what injects the answer (#95).
    for (const sentenceId of ['L1-M1-S01', 'L1-M1-S02', 'L1-M1-S01', 'L1-M1-S02']) {
      useAppStore.getState().recordProduction('hi-mr', sentenceId);
    }

    expect(progressionInput(useAppStore.getState(), 'hi-mr').exitAvailable('L1-M1')).toBe(false);
    expect(
      progressionInput(useAppStore.getState(), 'hi-mr', (id) => id === 'L1-M1').exitAvailable(
        'L1-M1',
      ),
    ).toBe(true);
  });

  it('answers for a course the store has never seen without creating it', () => {
    const input = progressionInput(useAppStore.getState(), 'fr-de');

    expect(input.levels).toEqual([]);
    expect(input.studied('L1-M1')).toBe(false);
    expect(useAppStore.getState().courses['fr-de']).toBeUndefined();
  });
});

describe('per-course isolation (Invariant 8)', () => {
  it('leaves every other course untouched when one course changes', () => {
    const { ensureCourse } = useAppStore.getState();
    ensureCourse('hi-mr');
    ensureCourse('en-ar');
    const enAr = useAppStore.getState().courses['en-ar'];

    writeCourse('hi-mr', {
      sessionCount: 14,
      modules: { 'L1-M1': { status: 'passed', passedAt: '2026-02-02T02:40:00.000Z' } },
      reviewQueue: [{ sentenceId: 'L1-M1-S03', box: 2, dueInSessions: 1 }],
    });

    expect(useAppStore.getState().courses['en-ar']).toBe(enAr);
    expect(useAppStore.getState().courses['en-ar']).toEqual(emptyCourseState());
  });

  it('switches the active course by moving a pointer — course data is not read or rewritten', () => {
    const { ensureCourse, setActiveCourse } = useAppStore.getState();
    ensureCourse('hi-mr');
    writeCourse('hi-mr', { sessionCount: 14 });
    const courses = useAppStore.getState().courses;

    setActiveCourse('en-ar');

    expect(useAppStore.getState().activeCourse).toBe('en-ar');
    // The whole map, by reference: switching cannot destroy progress because it does not
    // touch it — not even the course being left.
    expect(useAppStore.getState().courses).toBe(courses);
  });

  it('keeps a course that is not in this build — its subtree waits for the folder to return', () => {
    const { ensureCourse, setActiveCourse } = useAppStore.getState();
    ensureCourse('en-es');
    writeCourse('en-es', { sessionCount: 3 });

    setActiveCourse('hi-mr');

    expect(useAppStore.getState().courses['en-es']?.sessionCount).toBe(3);
  });
});

/* --------------------------------------------------------------- the switch flow */

describe('switchCourse (#106 — swap, and nothing erased)', () => {
  /** A course mid-everything: ladder position, counters, queue, flags, and a resumable session. */
  const MID_CLIMB: CourseState = {
    modules: { 'L1-M1': { status: 'passed', passedAt: '2026-02-02T02:40:00.000Z' } },
    production: { 'L1-M2-S01': 2, 'L1-M2-S02': 1 },
    reviewQueue: [{ sentenceId: 'L1-M1-S01', box: 2, dueInSessions: 1 }],
    sessionCount: 14,
    studied: { 'L1-M1': true, 'L1-M2': true },
    session: { idx: 1, queue: ['L1-M2-S01', 'L1-M2-S02'] },
  };

  it('round-trips hi-mr → en-ar → hi-mr with every per-course fact EXACTLY restored (F0 AC)', () => {
    const store = useAppStore.getState();
    store.ensureCourse('hi-mr');
    store.setActiveCourse('hi-mr');
    writeCourse('hi-mr', MID_CLIMB);
    const before = useAppStore.getState().courses['hi-mr'];
    const snapshot = structuredClone(before);

    store.switchCourse('en-ar');
    // Real work in the other course — the round trip must survive more than an idle visit.
    writeCourse('en-ar', { sessionCount: 3, production: { 'L1-M1-S01': 1 } });
    const enArSnapshot = structuredClone(useAppStore.getState().courses['en-ar']);
    store.switchCourse('hi-mr');

    expect(useAppStore.getState().activeCourse).toBe('hi-mr');
    // The deep-equal: ladder position, production counters, review queue and the resumable
    // session snapshot, exactly as they were left — and by identity, because no switch ever
    // rebuilt the subtree at all.
    expect(useAppStore.getState().courses['hi-mr']).toEqual(snapshot);
    expect(useAppStore.getState().courses['hi-mr']).toBe(before);
    // The course switched THROUGH kept its own work too.
    expect(useAppStore.getState().courses['en-ar']).toEqual(enArSnapshot);
  });

  it('gives a first-visited course its empty subtree, and deletes nobody’s (Invariant 8)', () => {
    const store = useAppStore.getState();
    store.ensureCourse('hi-mr');
    store.setActiveCourse('hi-mr');
    writeCourse('hi-mr', MID_CLIMB);

    store.switchCourse('en-es');

    expect(useAppStore.getState().activeCourse).toBe('en-es');
    expect(useAppStore.getState().courses['en-es']).toEqual(emptyCourseState());
    expect(useAppStore.getState().courses['hi-mr']).toEqual(MID_CLIMB);
  });

  it('resets the transient UI tier — the rung: sessionStorage keys — and only that tier', () => {
    const store = useAppStore.getState();
    store.ensureCourse('hi-mr');
    store.setActiveCourse('hi-mr');
    writeCourse('hi-mr', MID_CLIMB);
    // The module list's open cards and scroll offset (#88), the transient state a switch resets.
    sessionStorage.setItem(
      'rung:module-view:hi-mr:L1-M1',
      JSON.stringify({ scrollTop: 120, expanded: ['L1-M1-S01'] }),
    );
    sessionStorage.setItem('someone-elses-key', 'not ours to sweep');

    store.switchCourse('en-ar');

    expect(sessionStorage.getItem('rung:module-view:hi-mr:L1-M1')).toBeNull();
    expect(sessionStorage.getItem('someone-elses-key')).toBe('not ours to sweep');
    // The persisted document is the other tier, and the sweep cannot reach it: what storage
    // holds after the switch still carries hi-mr's whole subtree.
    const persisted = stored().state as { courses: Record<string, unknown> };
    expect(persisted.courses['hi-mr']).toEqual(MID_CLIMB);
  });

  it('is a no-op on the course already active — nothing swept, nothing written', () => {
    const store = useAppStore.getState();
    store.ensureCourse('hi-mr');
    store.setActiveCourse('hi-mr');
    const state = useAppStore.getState();
    sessionStorage.setItem('rung:module-view:hi-mr:L1-M1', '{"scrollTop":80,"expanded":[]}');

    store.switchCourse('hi-mr');

    // Same state object: re-picking the active course moved nothing, so nothing reset either.
    expect(useAppStore.getState()).toBe(state);
    expect(sessionStorage.getItem('rung:module-view:hi-mr:L1-M1')).toBe(
      '{"scrollTop":80,"expanded":[]}',
    );
  });
});

describe('setSetting', () => {
  it('writes one setting and persists it, leaving the others alone', () => {
    useAppStore.getState().setSetting('elapsedTickEnabled', false);

    expect(useAppStore.getState().settings.elapsedTickEnabled).toBe(false);
    expect((stored().state as { settings: unknown }).settings).toEqual({
      elapsedTickEnabled: false,
      userLang: '',
    });
  });
});

describe('rehydration', () => {
  it('round-trips through storage: what a reload reads is what the session left', async () => {
    const { ensureCourse, setActiveCourse, setSetting } = useAppStore.getState();
    ensureCourse('hi-mr');
    ensureCourse('en-ar');
    writeCourse('hi-mr', {
      sessionCount: 14,
      modules: { 'L1-M1': { status: 'passed', passedAt: '2026-02-02T02:40:00.000Z' } },
      session: { idx: 4, queue: ['L1-M2-S01', 'L1-M2-S02'] },
    });
    setActiveCourse('en-ar');
    setSetting('elapsedTickEnabled', false);
    const document_ = storage.items.get(STORAGE_KEY) ?? '';
    const before = persistedSlice(useAppStore.getState());

    // The reload: state gone, storage kept — then boot.
    useAppStore.getState()._reset();
    expect(useAppStore.getState().courses).toEqual({});
    storage.items.set(STORAGE_KEY, document_);
    await useAppStore.persist.rehydrate();

    expect(persistedSlice(useAppStore.getState())).toEqual(before);
    expect(useAppStore.getState().activeCourse).toBe('en-ar');
    expect(useAppStore.getState().courses['hi-mr']?.session).toEqual({
      idx: 4,
      queue: ['L1-M2-S01', 'L1-M2-S02'],
    });
    // The actions survive a rehydrate — persist merges the state in, it does not replace it.
    expect(typeof useAppStore.getState().ensureCourse).toBe('function');
  });

  it('leaves the store on first-run state when storage is empty', async () => {
    await useAppStore.persist.rehydrate();

    expect(persistedSlice(useAppStore.getState())).toEqual(initialState());
  });
});

describe('migration', () => {
  it('wraps a v5 payload under courses["hi-mr"] on rehydrate — the ladder survives the upgrade', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    storage.items.set(
      STORAGE_KEY,
      JSON.stringify({
        version: 5,
        state: {
          stateVersion: 5,
          modules: { 'L1-M1': { status: 'passed', passedAt: '2026-02-02T02:40:00.000Z' } },
          production: { 'L1-M3-S01': 2 },
          settings: { elapsedTickEnabled: false },
        },
      }),
    );

    await useAppStore.persist.rehydrate();

    const state = useAppStore.getState();
    expect(warn).not.toHaveBeenCalled();
    expect(state.stateVersion).toBe(STATE_VERSION);
    expect(state.activeCourse).toBe('hi-mr');
    expect(state.courses['hi-mr']).toEqual({
      ...emptyCourseState(),
      modules: { 'L1-M1': { status: 'passed', passedAt: '2026-02-02T02:40:00.000Z' } },
      production: { 'L1-M3-S01': 2 },
    });
    // Settings stay at the top level, carried — and rebuilt to the v9 shape, which is the tick
    // and nothing else.
    // The tick is carried; the language it predates arrives unset (#322), which means "follow
    // the active course" — the pre-v9 behaviour, so the upgrade changes nothing the learner sees.
    expect(state.settings).toEqual({ elapsedTickEnabled: false, userLang: '' });
  });

  it('carries a v6 document whole and answers the v9 settings shape', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    const midClimb = {
      ...emptyCourseState(),
      sessionCount: 14,
      modules: { 'L1-M1': { status: 'passed', passedAt: '2026-02-02T02:40:00.000Z' } },
    };
    storage.items.set(
      STORAGE_KEY,
      JSON.stringify({
        version: 6,
        state: {
          stateVersion: 6,
          activeCourse: 'hi-mr',
          courses: { 'hi-mr': midClimb },
          settings: { elapsedTickEnabled: false },
        },
      }),
    );

    await useAppStore.persist.rehydrate();

    const state = useAppStore.getState();
    expect(warn).not.toHaveBeenCalled();
    expect(state.stateVersion).toBe(STATE_VERSION);
    expect(state.activeCourse).toBe('hi-mr');
    // The ladder position survives the upgrade untouched (Invariant 8).
    expect(state.courses['hi-mr']).toEqual(midClimb);
    expect(state.settings).toEqual({ elapsedTickEnabled: false, userLang: '' });
  });

  it('drops the retired invitation bit a v7 document still carries (#227)', () => {
    const v7 = {
      stateVersion: 7,
      activeCourse: 'hi-mr',
      courses: { 'hi-mr': emptyCourseState() },
      settings: { elapsedTickEnabled: false, notebookInvitationDismissed: true },
    };

    const state = migrate(v7, 7);

    // Named field by field, not spread: the key v8 retired is not carried forward, which is what
    // lets a v7 backup through `serialize.ts`'s unknown-key refusal (#227).
    expect(state.settings).toEqual({ elapsedTickEnabled: false, userLang: '' });
    expect(Object.keys(state.settings).sort()).toEqual(['elapsedTickEnabled', 'userLang']);
    expect(state.stateVersion).toBe(STATE_VERSION);
    expect(state.courses['hi-mr']).toEqual(emptyCourseState());
  });

  /**
   * The pre-v11 step (#387): a snapshot carrying a `phase` is a position inside a half of a
   * session that no longer has halves, so it has nowhere to resume to. The position goes; nothing
   * the learner earned does — that is the whole point of the step, and the counters, the queue and
   * the passed modules beside it are what prove the step is narrow.
   */
  it('retires a v9 session parked in the Produce phase, and keeps everything it earned', () => {
    const v9 = {
      stateVersion: 9,
      activeCourse: 'hi-mr',
      courses: {
        'hi-mr': {
          ...emptyCourseState(),
          production: { 'L1-M2-S01': 2 },
          sessionCount: 14,
          session: { phase: 'produce', idx: 4, queue: ['L1-M2-S01', 'L1-M2-S02'] },
        },
        // A course the learner is not looking at is migrated too — one snapshot per course (#99),
        // and the unmigrated one would sit there until they switched to it.
        'en-ar': {
          ...emptyCourseState(),
          session: { phase: 'produce', idx: 0, queue: ['L1-M1-S01'] },
        },
      },
      settings: { elapsedTickEnabled: true, userLang: '' },
    };

    const state = migrate(v9, 9);

    expect(state.courses['hi-mr']?.session).toBeNull();
    expect(state.courses['en-ar']?.session).toBeNull();
    expect(state.courses['hi-mr']?.production).toEqual({ 'L1-M2-S01': 2 });
    expect(state.courses['hi-mr']?.sessionCount).toBe(14);
    expect(state.stateVersion).toBe(STATE_VERSION);
  });

  it('retires a v10 review or read snapshot too — a phase position lands on no card of a one-list session', () => {
    const v10 = {
      stateVersion: 10,
      activeCourse: 'hi-mr',
      courses: {
        'hi-mr': {
          ...emptyCourseState(),
          production: { 'L1-M2-S01': 1 },
          reviewQueue: [{ sentenceId: 'L1-M1-S01', box: 2 as const, dueInSessions: 1 }],
          sessionCount: 9,
          studied: { 'L1-M2': true },
          session: { phase: 'read', idx: 3, queue: ['L1-M2-S01'] },
        },
        'en-ar': {
          ...emptyCourseState(),
          session: { phase: 'review', idx: 1, queue: ['L1-M1-S01', 'L1-M1-S02'] },
        },
      },
      settings: { elapsedTickEnabled: true, userLang: '' },
    };

    const state = migrate(v10, 10);

    expect(state.courses['hi-mr']?.session).toBeNull();
    expect(state.courses['en-ar']?.session).toBeNull();
    // Everything a learner earned rides through untouched — the step costs a place, not progress.
    expect(state.courses['hi-mr']?.production).toEqual({ 'L1-M2-S01': 1 });
    expect(state.courses['hi-mr']?.reviewQueue).toEqual([
      { sentenceId: 'L1-M1-S01', box: 2, dueInSessions: 1 },
    ]);
    expect(state.courses['hi-mr']?.sessionCount).toBe(9);
    expect(state.courses['hi-mr']?.studied).toEqual({ 'L1-M2': true });
    expect(state.stateVersion).toBe(STATE_VERSION);
  });

  it('leaves a v11 snapshot exactly where it was — it is already a position in one list', () => {
    const open = { idx: 3, queue: ['L1-M2-S01'] };
    const v11 = {
      stateVersion: STATE_VERSION,
      activeCourse: 'hi-mr',
      courses: { 'hi-mr': { ...emptyCourseState(), session: open } },
      settings: { elapsedTickEnabled: true, userLang: '' },
    };

    // The very same object, not a copy: a document with no stale snapshot is not rewritten at all.
    expect(migrate(v11, STATE_VERSION).courses['hi-mr']?.session).toBe(open);
  });

  it('answers a COMPLETE v10 document even for a sparse v5 payload — a half shape is worse than a fresh one', () => {
    expect(migrate({ stateVersion: 5, modules: {} }, 5)).toEqual({
      stateVersion: STATE_VERSION,
      activeCourse: 'hi-mr',
      courses: { 'hi-mr': emptyCourseState() },
      settings: { elapsedTickEnabled: true, userLang: '' },
    });
  });

  it('starts fresh for a version older than any route, naming what it found', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    storage.items.set(
      STORAGE_KEY,
      JSON.stringify({ version: 4, state: { stateVersion: 4, modules: {} } }),
    );

    await useAppStore.persist.rehydrate();

    expect(warn).toHaveBeenCalledWith(expect.stringContaining('v4'));
    expect(warn).toHaveBeenCalledWith(expect.stringContaining(STORAGE_KEY));
    expect(persistedSlice(useAppStore.getState())).toEqual(initialState());
  });

  it('does not run for a v9 payload — the version it is already at', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    useAppStore.getState().ensureCourse('hi-mr');
    const document_ = storage.items.get(STORAGE_KEY) ?? '';
    useAppStore.getState()._reset();
    storage.items.set(STORAGE_KEY, document_);

    await useAppStore.persist.rehydrate();

    expect(warn).not.toHaveBeenCalled();
    expect(useAppStore.getState().courses['hi-mr']).toEqual(emptyCourseState());
  });
});

describe('_reset', () => {
  it('goes back to first-run state, storage included', () => {
    const { ensureCourse, setActiveCourse } = useAppStore.getState();
    ensureCourse('hi-mr');
    setActiveCourse('hi-mr');

    useAppStore.getState()._reset();

    expect(persistedSlice(useAppStore.getState())).toEqual(initialState());
    expect(stored().state).toEqual(initialState());
  });
});
