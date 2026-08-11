import { createJSONStorage, type StateStorage } from 'zustand/middleware';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  STORAGE_KEY,
  emptyCourseState,
  initialState,
  migrate,
  persistedSlice,
  useAppStore,
} from './store.ts';
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
