/**
 * The single unlock path (#83) — Invariant 1, asserted in code (PRD §2, §8 F1; docs/01-plan.md §6).
 *
 * "Progression only through the generative exit ritual, learner-confirmed" is the product's first
 * promise, and it survives exactly as long as there is one implementation of it. So `passRitual` is
 * the only action that writes `modules`, and this file proves that three ways — the same mechanical
 * posture as #80's shell-purity scan and #82's calendar-free scan, for the same reason: a rule that
 * lives only in prose decays one well-meant convenience at a time.
 *
 *   1. **The store's own source.** Every action the store exposes is sliced out of `store.ts` by
 *      name and read for a write to `modules`. Exactly one action may contain one.
 *   2. **The store's behaviour.** Every action is called for real against a course that has a passed
 *      module; only `passRitual` may change that map. The call table is asserted to cover the
 *      store's whole action surface, so a new action cannot skip the check by being new.
 *   3. **The rest of the app.** No shipped file outside `store.ts` may call `setState` — an action
 *      list is not a gate if a screen can write past it.
 *
 * What the scans cannot see: a write assembled at runtime out of computed keys, or one inside a
 * dependency. That is not the failure mode they exist for — the ordinary, well-meant "just set it
 * here" is — and each exemption below is one line long so it stays an argument someone has to make.
 */
import { beforeEach, describe, expect, it } from 'vitest';
import { createJSONStorage, type StateStorage } from 'zustand/middleware';
import { ladderFromLevels } from '../engine/progression.ts';
import { levelsFixture } from '../test/courseContent.ts';
import { useAppStore, type AppStore } from './store.ts';

/* ------------------------------------------------------------------ the sources */

/** Every TypeScript file under `src/`, keyed the way a failure should name it: `src/App.tsx`. */
const SOURCES: Readonly<Record<string, string>> = Object.fromEntries(
  Object.entries(
    import.meta.glob<string>('/src/**/*.{ts,tsx}', {
      query: '?raw',
      import: 'default',
      eager: true,
    }),
  ).map(([file, source]) => [file.replace(/^\//, ''), source]),
);

/** The files the app ships. Tests name what they check; `src/test/` is fixtures. */
function shellFiles(): string[] {
  return Object.keys(SOURCES)
    .filter((file) => !/\.test\.tsx?$/.test(file) && !file.startsWith('src/test/'))
    .sort();
}

const STORE_FILE = 'src/state/store.ts';

/* ------------------------------------------------ 1. the store's source, by action */

/** A write to a `modules` map, in the shapes one can take. Reading `...course.modules` is not one. */
const MODULES_WRITE = [
  { name: 'object key', pattern: /\bmodules\s*:/ },
  { name: 'index assignment', pattern: /\bmodules\s*\[[^\]]*\]\s*=/ },
  { name: 'property assignment', pattern: /\.modules\s*=/ },
] as const;

/** The store's actions, as the store itself exposes them — a new action is scanned automatically. */
function actionNames(): string[] {
  return Object.entries(useAppStore.getState())
    .filter(([, value]) => typeof value === 'function')
    .map(([name]) => name)
    .sort();
}

/**
 * Each action's implementation, sliced out of the source by where its `name:` line begins. The
 * search starts at the store's factory so the `AppActions` interface above it — where every action
 * is also declared — is not mistaken for the implementation.
 *
 * The last action's slice runs to the end of the file, which means a write smuggled into the
 * persist options below it is attributed to that action. Red either way, which is the point.
 */
function actionBodies(source: string, names: readonly string[]): Record<string, string> {
  const lines = source.split('\n');
  const factory = lines.findIndex((line) => line.includes('create<AppStore>()('));
  if (factory === -1) throw new Error('unlockPath: no store factory in the source to slice');

  const starts = names
    .map((name) => ({
      name,
      at: lines.findIndex(
        (line, index) => index > factory && new RegExp(`^\\s+${name}:`).test(line),
      ),
    }))
    .sort((a, b) => a.at - b.at);

  const missing = starts.filter((start) => start.at === -1).map((start) => start.name);
  if (missing.length > 0) {
    throw new Error(`unlockPath: no implementation found for ${missing.join(', ')}`);
  }

  return Object.fromEntries(
    starts.map((start, index) => [
      start.name,
      lines.slice(start.at, starts[index + 1]?.at ?? lines.length).join('\n'),
    ]),
  );
}

/** The actions whose implementation writes `modules`, with the shape of write that gave them away. */
function modulesWriters(source: string, names: readonly string[]): string[] {
  const bodies = actionBodies(source, names);

  return Object.entries(bodies)
    .filter(([, body]) =>
      body
        .split('\n')
        .some((line) => MODULES_WRITE.some(({ pattern }) => pattern.test(line.trim()))),
    )
    .map(([name]) => name)
    .sort();
}

describe('the store exposes exactly one action that writes modules', () => {
  it('names passRitual and nothing else', () => {
    const writers = modulesWriters(SOURCES[STORE_FILE] ?? '', actionNames());

    expect(
      writers,
      `${writers.join(', ')} write \`modules\`. Only passRitual may: progression happens through the exit ritual and nowhere else (Invariant 1). Call it — #103 does — rather than writing beside it.`,
    ).toEqual(['passRitual']);
  });

  it('slices every action the store exposes — a new one cannot be missed by being new', () => {
    const bodies = actionBodies(SOURCES[STORE_FILE] ?? '', actionNames());

    expect(Object.keys(bodies).sort()).toEqual(actionNames());
    expect(actionNames()).toContain('passRitual');
  });
});

describe('the scanner itself', () => {
  const planted = [
    'export const useAppStore = create<AppStore>()(',
    '  persist(',
    '    (set, get) => ({',
    '      ...initialState(),',
    '',
    '      markStudied: (courseId, moduleId) =>',
    '        set((state) => ({ courses: { ...state.courses, [courseId]: course } })),',
    '',
    '      passRitual: (courseId, moduleId, clock = systemClock) =>',
    '        set(() => ({ modules: { ...course.modules, [moduleId]: passed } })),',
    '',
    '      _reset: () => set(initialState()),',
    '    }),',
  ].join('\n');

  it('reads the writer out of a store-shaped source', () => {
    expect(modulesWriters(planted, ['markStudied', 'passRitual', '_reset'])).toEqual([
      'passRitual',
    ]);
  });

  it('catches a second unlock path, wherever in the file it is written', () => {
    const sneaky = planted.replace(
      '      _reset: () => set(initialState()),',
      [
        '      unlockNext: (courseId, moduleId) =>',
        '        set((state) => ({ modules: { [moduleId]: { status: "passed" } } })),',
        '',
        '      _reset: () => set(initialState()),',
      ].join('\n'),
    );

    expect(modulesWriters(sneaky, ['markStudied', 'passRitual', 'unlockNext', '_reset'])).toEqual([
      'passRitual',
      'unlockNext',
    ]);
  });

  it('catches a mutation as well as a rebuild', () => {
    const mutating = planted.replace(
      '        set((state) => ({ courses: { ...state.courses, [courseId]: course } })),',
      '        void (get().courses[courseId].modules[moduleId] = passed),',
    );

    expect(modulesWriters(mutating, ['markStudied', 'passRitual', '_reset'])).toContain(
      'markStudied',
    );
  });

  it('leaves a read of the map alone — spreading modules is not writing them', () => {
    const reading = planted.replace(
      '        set((state) => ({ courses: { ...state.courses, [courseId]: course } })),',
      '        void Object.keys(get().courses[courseId].modules).length,',
    );

    expect(modulesWriters(reading, ['markStudied', 'passRitual', '_reset'])).toEqual([
      'passRitual',
    ]);
  });

  it('refuses to pass quietly when an action has no implementation to read', () => {
    expect(() => actionBodies(planted, ['markStudied', 'ghostAction'])).toThrow('ghostAction');
  });
});

/* ------------------------------------------------- 2. the store's behaviour, per action */

/**
 * Every action, called the way the app would call it. The list is asserted against the store's own
 * action surface below, so adding an action means adding a line here — which is the moment to ask
 * whether it touches `modules`.
 */
const CALLS: Record<string, (store: AppStore) => void> = {
  ensureCourse: (store) => store.ensureCourse('hi-mr'),
  setActiveCourse: (store) => store.setActiveCourse('en-ar'),
  // The switch flow (#106): a pointer move plus a transient-UI sweep. Per-course persistent
  // state — the passed set first of all — is exactly what a switch must never touch
  // (Invariant 8), which is why it delegates and holds no write of its own.
  switchCourse: (store) => store.switchCourse('en-ar'),
  setSetting: (store) => store.setSetting('elapsedTickEnabled', false),
  setLadder: (store) => store.setLadder('hi-mr', ladderFromLevels(levelsFixture('hi-mr').levels)),
  markStudied: (store) => store.markStudied('hi-mr', 'L1-M2'),
  // Producing every sentence of a rung is what OFFERS the exit ritual (#95); it is not the ritual,
  // and it unlocks nothing — the counters are a number the card reads, never a write to `modules`.
  recordProduction: (store) => store.recordProduction('hi-mr', 'L1-M2-S01'),
  // The session machine's three (#96). A review mark moves a Leitner box, a session start moves
  // the session count and the queue's clock, and a snapshot moves a position — a whole session,
  // start to summary, climbs nothing.
  recordReview: (store) => store.recordReview('hi-mr', 'L1-M1-S01', true),
  startSession: (store) => store.startSession('hi-mr', ['L1-M2-S01', 'L1-M2-S02']),
  setSession: (store) => store.setSession('hi-mr', { phase: 'read', idx: 1, queue: ['L1-M2-S01'] }),
  passRitual: (store) => store.passRitual('hi-mr', 'L1-M2', () => '2026-02-02T02:40:00.000Z'),
  // The end of the exit ritual (#103) — and the one action besides `passRitual` whose call
  // changes the map, because it IS a call to `passRitual`. It has its own describe below: the
  // source scan above proves it holds no write of its own, and the guard it inherits is proved
  // by refusing a rung that is not current.
  completeRitual: (store) =>
    store.completeRitual('hi-mr', 'L1-M2', ['L1-M2-S01'], () => '2026-02-02T02:40:00.000Z'),
  // The F7 restore (#108) — the import's one write, and the second exemption below: it replaces
  // the whole document with one `importState` has validated, so what it can put in `modules` is
  // exactly what some device's `passRitual` already wrote there. Checked on its own below.
  restoreBackup: (store) =>
    store.restoreBackup({
      stateVersion: 10,
      activeCourse: 'hi-mr',
      courses: {
        'hi-mr': {
          modules: { 'L1-M1': { status: 'passed', passedAt: '2026-02-02T02:40:00.000Z' } },
          production: {},
          reviewQueue: [],
          sessionCount: 3,
          studied: {},
          session: null,
        },
      },
      settings: { elapsedTickEnabled: true, userLang: '' },
    }),
  // Dev + tests only, and it can only erase: `_reset` blanks the whole document back to first run.
  // It cannot mark anything passed, which is what Invariant 1 is about. Checked on its own below.
  _reset: (store) => store._reset(),
};

/** A course with a ladder and one rung already passed — so a stray write has something to disturb. */
function seedHiMr(): void {
  const store = useAppStore.getState();
  store.ensureCourse('hi-mr');
  store.ensureCourse('en-ar');
  store.setLadder('hi-mr', ladderFromLevels(levelsFixture('hi-mr').levels));
  store.passRitual('hi-mr', 'L1-M1', () => '2026-02-02T02:40:00.000Z');
}

function modulesOf(courseId: string) {
  return useAppStore.getState().courses[courseId]?.modules;
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
});

describe('no other action can change what the learner has passed', () => {
  it('covers every action the store exposes — a new one must be listed here', () => {
    expect(Object.keys(CALLS).sort()).toEqual(actionNames());
  });

  it.each(
    Object.keys(CALLS).filter(
      (name) =>
        name !== 'passRitual' &&
        name !== 'completeRitual' &&
        name !== 'restoreBackup' &&
        name !== '_reset',
    ),
  )('%s leaves the modules map exactly as it found it', (name) => {
    seedHiMr();
    const before = modulesOf('hi-mr');

    CALLS[name]?.(useAppStore.getState());

    // Same object, not merely equal: nothing rebuilt it, so nothing could have added to it.
    expect(modulesOf('hi-mr')).toBe(before);
    expect(modulesOf('hi-mr')).toEqual({
      'L1-M1': { status: 'passed', passedAt: '2026-02-02T02:40:00.000Z' },
    });
  });

  it('passRitual does write — so the check above is not passing on an empty map', () => {
    seedHiMr();

    useAppStore.getState().passRitual('hi-mr', 'L1-M2', () => '2026-03-03T03:30:00.000Z');

    expect(modulesOf('hi-mr')).toEqual({
      'L1-M1': { status: 'passed', passedAt: '2026-02-02T02:40:00.000Z' },
      'L1-M2': { status: 'passed', passedAt: '2026-03-03T03:30:00.000Z' },
    });
  });

  it('_reset erases and never marks: first-run state has no passed module in it', () => {
    seedHiMr();

    useAppStore.getState()._reset();

    expect(useAppStore.getState().courses).toEqual({});
    expect(useAppStore.getState().ladders).toEqual({});
  });
});

/**
 * `restoreBackup` (#108) is the F7 import's one write, and its exemption above is an argument,
 * not a hole: it REPLACES the document with one `importState` has already validated field by
 * field, so every `modules` entry it can land is one a `passRitual` somewhere already wrote and
 * exported — it carries passes, it cannot author one (the same posture as `migrate`, which the
 * rehydrate path has always been allowed). The source scan stays honest about it too: the
 * action's body holds no `modules` write of its own shape — the whole spread is the write.
 */
describe('restoreBackup replaces a validated document, and only whole', () => {
  it('lands the document exactly — modules, activeCourse and all — and leaves ladders alone', () => {
    seedHiMr();
    const ladders = useAppStore.getState().ladders;

    CALLS['restoreBackup']?.(useAppStore.getState());

    expect(useAppStore.getState().activeCourse).toBe('hi-mr');
    expect(modulesOf('hi-mr')).toEqual({
      'L1-M1': { status: 'passed', passedAt: '2026-02-02T02:40:00.000Z' },
    });
    // A replace, not a merge: the seeded en-ar subtree is gone with the rest of the old document.
    expect(useAppStore.getState().courses['en-ar']).toBeUndefined();
    // Content is not progress: the loaded ladders are the very object they were.
    expect(useAppStore.getState().ladders).toBe(ladders);
  });

  it('holds no modules write of its own — the source scan still names passRitual alone', () => {
    expect(modulesWriters(SOURCES[STORE_FILE] ?? '', actionNames())).toEqual(['passRitual']);
  });
});

/**
 * `completeRitual` (#103) is the second action whose call changes `modules` — and it is not a
 * second unlock path, because it does not write: it calls `passRitual` and rides its single write.
 * That is a claim the two scans above already half-prove (its body carries no `modules` write of
 * any shape, and it cannot reach `setState`), and what is left is the guard: a delegated pass
 * refuses exactly what the delegate refuses, and takes its enrolment down with it.
 */
describe('completeRitual passes only by calling passRitual', () => {
  it('holds no write of its own — the source scan attributes the only one to passRitual', () => {
    const bodies = actionBodies(SOURCES[STORE_FILE] ?? '', actionNames());

    expect(bodies['completeRitual']).toContain('passRitual(');
    expect(modulesWriters(SOURCES[STORE_FILE] ?? '', actionNames())).toEqual(['passRitual']);
  });

  it('refuses a rung that is not current, with passRitual’s own words and no write at all', () => {
    seedHiMr();
    const before = useAppStore.getState().courses;

    expect(() =>
      useAppStore
        .getState()
        .completeRitual('hi-mr', 'L1-M3', ['L1-M3-S01'], () => '2026-04-04T04:40:00.000Z'),
    ).toThrow(/passRitual: L1-M3 is not hi-mr's current rung \(L1-M2\)/);

    // The whole course map, by reference: a refusal is not a write — not of the pass, and not of
    // the enrolment that would have ridden with it.
    expect(useAppStore.getState().courses).toBe(before);
    expect(useAppStore.getState().courses['hi-mr']?.reviewQueue).toEqual([]);
  });
});

/* --------------------------------------------------- 3. the rest of the app, by scan */

/** Writing state past the actions. The store's own `set` lives inside the factory, not here. */
const STATE_WRITE = /\bsetState\s*\(/;

describe('nothing outside the store writes store state', () => {
  it('finds no setState call in any shipped file', () => {
    const violations = shellFiles().flatMap((file) =>
      (SOURCES[file] ?? '')
        .split('\n')
        .map((line, index) => ({ file, line: index + 1, text: line.trim() }))
        .filter((hit) => hit.file !== STORE_FILE && STATE_WRITE.test(hit.text)),
    );

    expect(
      violations,
      violations
        .map((violation) => `${violation.file}:${violation.line} ${violation.text}`)
        .join('\n')
        .concat(
          '\nGo through an action: a store whose state can be written from anywhere has no invariants (Invariant 1).',
        ),
    ).toEqual([]);
  });

  it('scans the real tree — the shell files, and not the tests beside them', () => {
    const files = shellFiles();

    expect(files).toContain(STORE_FILE);
    expect(files).toContain('src/course/CourseProvider.tsx');
    expect(files.some((file) => /\.test\.tsx?$/.test(file))).toBe(false);
    expect(files.some((file) => file.startsWith('src/test/'))).toBe(false);
  });
});
