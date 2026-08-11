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
import { currentRungId, deriveStatuses, ladderFromLevels } from '../engine/progression.ts';
import { levelsFixture } from '../test/courseContent.ts';
import type { CourseState } from './types.ts';

/**
 * Storage the test owns: what the app writes is a string under a key, and reading that string
 * back is the only honest way to prove a reload survives. In-memory rather than jsdom's
 * localStorage so a case can seed a payload (a v5 document) and read the exact bytes out.
 */
function memoryStorage() {
  const items = new Map<string, string>();

  return {
    items,
    api: {
      getItem: (name: string) => items.get(name) ?? null,
      setItem: (name: string, value: string) => void items.set(name, value),
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

/** Stands in for a domain write (#83, #95, #96) — the store ships no action that does this. */
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
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('state v6', () => {
  it('starts as the shape the PRD prints — the drift guard (§8 F7)', () => {
    expect(persistedSlice(useAppStore.getState())).toEqual({
      stateVersion: 6,
      activeCourse: '',
      courses: {},
      settings: { elapsedTickEnabled: true },
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

  it('defaults the elapsed tick ON pending [Q3] (#70) — the one setting v6 has', () => {
    expect(useAppStore.getState().settings).toEqual({ elapsedTickEnabled: true });
  });

  it('persists under rung:state, versioned 6', () => {
    useAppStore.getState().ensureCourse('hi-mr');

    expect(stored().version).toBe(6);
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

  it('reports nothing exit-ready until #95 injects the real predicate', () => {
    bootHiMr();

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

describe('setSetting', () => {
  it('writes one setting and persists it', () => {
    useAppStore.getState().setSetting('elapsedTickEnabled', false);

    expect(useAppStore.getState().settings.elapsedTickEnabled).toBe(false);
    expect((stored().state as { settings: unknown }).settings).toEqual({
      elapsedTickEnabled: false,
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
      session: { phase: 'produce', idx: 4, queue: ['L1-M2-S01', 'L1-M2-S02'] },
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
      phase: 'produce',
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
  it('runs migrate for a v5 payload, naming the version it found', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    storage.items.set(
      STORAGE_KEY,
      JSON.stringify({
        version: 5,
        state: {
          stateVersion: 5,
          modules: { 'L1-M1': { status: 'passed', passedAt: '2026-02-02T02:40:00.000Z' } },
          production: { 'L1-M3-S01': 2 },
          settings: { elapsedTickEnabled: true },
        },
      }),
    );

    await useAppStore.persist.rehydrate();

    expect(warn).toHaveBeenCalledWith(expect.stringContaining('v5'));
    expect(warn).toHaveBeenCalledWith(expect.stringContaining(STORAGE_KEY));
  });

  it('never reads an older payload as if it were v6 — a half shape is worse than a fresh one', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    storage.items.set(
      STORAGE_KEY,
      JSON.stringify({ version: 5, state: { stateVersion: 5, modules: {} } }),
    );

    await useAppStore.persist.rehydrate();

    expect(persistedSlice(useAppStore.getState())).toEqual(initialState());
    expect(useAppStore.getState().stateVersion).toBe(6);
  });

  it('answers a complete v6 document, whatever it was handed', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    expect(migrate({ stateVersion: 5, modules: {} }, 5)).toEqual({
      stateVersion: 6,
      activeCourse: '',
      courses: {},
      settings: { elapsedTickEnabled: true },
    });
    expect(warn).toHaveBeenCalledOnce();
  });

  it('does not run for a v6 payload — the version it is already at', async () => {
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
