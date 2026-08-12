/**
 * The production counters only ever count up (#95) — PRD §8 F1, §8 F7 ("counters never
 * decrement"), docs/01-plan.md §6.
 *
 * `exit_available` is "every sentence of the module self-marked got-it ≥ 2×", so these counters are
 * what opens the exit ritual. A number that can fall is a rung that can close again under a learner
 * who did nothing wrong — so `recordProduction` is the only writer, its only arithmetic is `+ 1`,
 * and this file proves that three ways. The posture is `unlockPath.test.ts`'s (#83) and
 * `clock.test.ts`'s (#82), deliberately: a rule that lives only in prose decays one well-meant
 * convenience at a time, and a mechanical guard is the half of the promise that does not.
 *
 *   1. **The store's own source, by action.** Every action is sliced out of `store.ts` by name and
 *      read for a write to `production`. Exactly one may contain one — and that one is read again
 *      for any arithmetic that could lower a counter.
 *   2. **The store's behaviour.** Every action is called for real against a course with counters on
 *      it; only `recordProduction` may move them, and it may only move them up. The call table is
 *      asserted to cover the store's whole action surface, so a new action cannot skip the check by
 *      being new.
 *   3. **The rest of the app.** No shipped file outside `store.ts` writes a `production` map.
 *      `unlockPath.test.ts` already bans `setState` everywhere else, which closes the other door.
 *
 * **The two scans read the source differently, on purpose.** The single-writer scan reads the text
 * as written, comments included — #80's and #82's rule, because a doc comment is where a call waits
 * before it becomes code. The arithmetic scan reads the code with comments stripped, because this
 * file's whole subject is a rule that has to be describable in prose: a comment saying "there is no
 * `- 1` here" must not be the thing that fails the build.
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
const WRITER = 'recordProduction';

/* ------------------------------------------------ 1. the store's source, by action */

/**
 * A write to a `production` map, in the shapes one can take: the map rebuilt as an object literal,
 * a counter assigned by index, or the whole map assigned onto a course.
 *
 * Reading it (`...course.production`, `production[id] ?? 0`) is not a write, and neither is
 * DECLARING it: `production: Record<SentenceId, number>` in `types.ts` and
 * `production: ProductionCounts` in the engine's signatures are the shape, not a value, which is
 * why the first pattern insists on a literal to the right of the colon. A rebuilt counters map is
 * an object literal by construction — and the one way to write one past this scan, a variable
 * assigned through `setState`, is banned everywhere outside the store by `unlockPath.test.ts`.
 */
const PRODUCTION_WRITE = [
  { name: 'object key', pattern: /\bproduction\s*:\s*\{/ },
  { name: 'index assignment', pattern: /\bproduction\s*\[[^\]]*\]\s*=(?!=)/ },
  { name: 'property assignment', pattern: /\.production\s*=(?!=)/ },
] as const;

/**
 * Arithmetic that could lower a counter, in the shapes it would arrive in: `n--`, `--n`, `n -= 1`,
 * a subtraction, a reset to a literal, a `delete`, or the `Math.max(0, …)` floor a decrement wears
 * when someone is being careful about it. Read against code only — see the file header.
 */
const DECREASE = [
  { name: 'decrement', pattern: /(?:\w|\)|\])\s*--|--\s*\w/ },
  { name: 'subtract-assign', pattern: /-=/ },
  { name: 'subtraction', pattern: /-\s*\d/ },
  { name: 'reset', pattern: /[=:]\s*\d/ },
  { name: 'delete', pattern: /\bdelete\b/ },
  { name: 'floor', pattern: /Math\s*\.\s*(?:max|min)\b/ },
] as const;

/** The store's actions, as the store itself exposes them — a new action is scanned automatically. */
function actionNames(): string[] {
  return Object.entries(useAppStore.getState())
    .filter(([, value]) => typeof value === 'function')
    .map(([name]) => name)
    .sort();
}

/**
 * Each action's implementation, sliced out of the source by where its `name:` line begins — the
 * same slicer `unlockPath.test.ts` uses, and for the same reason: the store's actions are a flat
 * list of object properties, so their boundaries are readable without parsing TypeScript.
 */
function actionBodies(source: string, names: readonly string[]): Record<string, string> {
  const lines = source.split('\n');
  const factory = lines.findIndex((line) => line.includes('create<AppStore>()('));
  if (factory === -1)
    throw new Error('productionCounters: no store factory in the source to slice');

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
    throw new Error(`productionCounters: no implementation found for ${missing.join(', ')}`);
  }

  return Object.fromEntries(
    starts.map((start, index) => [
      start.name,
      lines.slice(start.at, starts[index + 1]?.at ?? lines.length).join('\n'),
    ]),
  );
}

/** The actions whose implementation writes `production`. */
function productionWriters(source: string, names: readonly string[]): string[] {
  const bodies = actionBodies(source, names);

  return Object.entries(bodies)
    .filter(([, body]) =>
      body
        .split('\n')
        .some((line) => PRODUCTION_WRITE.some(({ pattern }) => pattern.test(line.trim()))),
    )
    .map(([name]) => name)
    .sort();
}

/** The source with its comments removed — what the code actually says, and nothing it explains. */
function codeOnly(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, ' ').replace(/\/\/[^\n]*/g, ' ');
}

/** Every way the given code could make a number smaller, named. */
function decreases(code: string): string[] {
  return DECREASE.filter(({ pattern }) => pattern.test(codeOnly(code))).map(({ name }) => name);
}

describe('the store exposes exactly one action that writes the counters', () => {
  it('names recordProduction and nothing else', () => {
    const writers = productionWriters(SOURCES[STORE_FILE] ?? '', actionNames());

    expect(
      writers,
      `${writers.join(', ')} write \`production\`. Only ${WRITER} may: one writer is what makes "these counters never fall" a property of the app rather than of every caller (PRD §8 F1).`,
    ).toEqual([WRITER]);
  });

  it('slices every action the store exposes — a new one cannot be missed by being new', () => {
    const bodies = actionBodies(SOURCES[STORE_FILE] ?? '', actionNames());

    expect(Object.keys(bodies).sort()).toEqual(actionNames());
    expect(actionNames()).toContain(WRITER);
  });

  it('adds one and does nothing else — no decrement, no reset, no floor, no delete', () => {
    // The slice runs to the next action's line, so it carries the doc comment of whatever follows
    // it — which `codeOnly` strips along with this action's own prose, leaving the code.
    const body = actionBodies(SOURCES[STORE_FILE] ?? '', actionNames())[WRITER] ?? '';
    const found = decreases(body);

    expect(codeOnly(body)).toMatch(/\+\s*1\b/);
    expect(
      found,
      `${WRITER} contains arithmetic that can lower a counter (${found.join(', ')}). The counters only ever count up: a number that can fall is a rung that can close again under a learner who did nothing wrong.`,
    ).toEqual([]);
  });
});

describe('the scanners themselves', () => {
  const planted = [
    'export const useAppStore = create<AppStore>()(',
    '  persist(',
    '    (set, get) => ({',
    '      ...initialState(),',
    '',
    '      markStudied: (courseId, moduleId) =>',
    '        set((state) => ({ courses: { ...state.courses, [courseId]: course } })),',
    '',
    '      recordProduction: (courseId, sentenceId) =>',
    '        set(() => ({ production: { ...course.production, [sentenceId]: produced + 1 } })),',
    '',
    '      _reset: () => set(initialState()),',
    '    }),',
  ].join('\n');

  const names = ['markStudied', 'recordProduction', '_reset'];

  it('reads the writer out of a store-shaped source', () => {
    expect(productionWriters(planted, names)).toEqual(['recordProduction']);
  });

  it('catches a second writer, wherever in the file it is written', () => {
    const sneaky = planted.replace(
      '      _reset: () => set(initialState()),',
      [
        '      clearProduction: (courseId) =>',
        '        set((state) => ({ production: {} })),',
        '',
        '      _reset: () => set(initialState()),',
      ].join('\n'),
    );

    expect(productionWriters(sneaky, [...names, 'clearProduction'])).toEqual([
      'clearProduction',
      'recordProduction',
    ]);
  });

  it('catches a mutation as well as a rebuild', () => {
    const mutating = planted.replace(
      '        set((state) => ({ courses: { ...state.courses, [courseId]: course } })),',
      '        void (get().courses[courseId].production[sentenceId] = 0),',
    );

    expect(productionWriters(mutating, names)).toContain('markStudied');
  });

  it('leaves a read of the map alone — spreading the counters is not writing them', () => {
    const reading = planted.replace(
      '        set((state) => ({ courses: { ...state.courses, [courseId]: course } })),',
      '        void Object.keys(get().courses[courseId].production).length,',
    );

    expect(productionWriters(reading, names)).toEqual(['recordProduction']);
  });

  it('leaves a declaration alone — saying what shape the counters are is not writing one', () => {
    const declaring = planted.replace(
      '        set((state) => ({ courses: { ...state.courses, [courseId]: course } })),',
      '        void ((production: Record<SentenceId, number>) => production[sentenceId] ?? 0),',
    );

    expect(productionWriters(declaring, names)).toEqual(['recordProduction']);
  });

  it.each([
    ['an undo', 'produced - 1', 'subtraction'],
    ['a decrement', 'count--', 'decrement'],
    ['a subtract-assign', 'count -= 1', 'subtract-assign'],
    ['a reset', '[sentenceId]: 0', 'reset'],
    ['a delete', 'delete production[sentenceId]', 'delete'],
    ['a careful floor', 'Math.max(0, produced)', 'floor'],
  ])('catches %s', (_name, code, expected) => {
    expect(decreases(code)).toContain(expected);
  });

  it('leaves the increment alone, and the prose around it', () => {
    expect(decreases('production: { ...course.production, [sentenceId]: produced + 1 }')).toEqual(
      [],
    );
    expect(decreases('/* never - 1, never Math.max(0, n - 1), never count-- */')).toEqual([]);
  });
});

/* ------------------------------------------------- 2. the store's behaviour, per action */

const COURSE = 'hi-mr';
const SENTENCE = 'L1-M2-S01';

/**
 * Every action, called the way the app would call it. Asserted against the store's own action
 * surface below, so adding an action means adding a line here — which is the moment to ask whether
 * it touches the counters.
 */
const CALLS: Record<string, (store: AppStore) => void> = {
  ensureCourse: (store) => store.ensureCourse(COURSE),
  setActiveCourse: (store) => store.setActiveCourse('en-ar'),
  // The switch flow (#106): switching away from a course must leave its counters exactly where
  // the learner's work put them — that is the ticket's whole promise (Invariant 8).
  switchCourse: (store) => store.switchCourse('en-ar'),
  setSetting: (store) => store.setSetting('elapsedTickEnabled', false),
  setLadder: (store) => store.setLadder(COURSE, ladderFromLevels(levelsFixture(COURSE).levels)),
  markStudied: (store) => store.markStudied(COURSE, 'L1-M2'),
  recordProduction: (store) => store.recordProduction(COURSE, SENTENCE),
  // The session machine's three (#96), called on the very sentence the counters are seeded with:
  // a Review mark, a fresh session and a snapshot all pass right by it. That is the routing
  // contract from the counters' side — only a Produce got-it may move this number.
  recordReview: (store) => store.recordReview(COURSE, SENTENCE, true),
  startSession: (store) => store.startSession(COURSE, [SENTENCE]),
  setSession: (store) => store.setSession(COURSE, { phase: 'produce', idx: 0, queue: [SENTENCE] }),
  passRitual: (store) => store.passRitual(COURSE, 'L1-M1', () => '2026-02-02T02:40:00.000Z'),
  // The end of the exit ritual (#103): a rung passes and its sentences enter review. Neither half
  // is a production got-it — the counters are what OPENED the ritual, and passing it does not add
  // to them.
  completeRitual: (store) =>
    store.completeRitual(COURSE, 'L1-M1', [SENTENCE], () => '2026-02-02T02:40:00.000Z'),
  // The F7 restore (#108): the import's full-document replace. It carries a validated document's
  // counters in whole — a restore of yesterday's file legitimately holds yesterday's numbers, so
  // like `_reset` it sits outside the never-lower sweeps; unlike everything else it cannot EDIT a
  // counter, only land a document some device's `recordProduction` already counted up.
  restoreBackup: (store) =>
    store.restoreBackup({
      stateVersion: 6,
      activeCourse: COURSE,
      courses: {
        [COURSE]: {
          modules: {},
          production: { [SENTENCE]: 2 },
          reviewQueue: [],
          sessionCount: 1,
          studied: {},
          session: null,
        },
      },
      settings: { elapsedTickEnabled: true },
    }),
  // Dev + tests only, and it can only erase: `_reset` blanks the whole document back to first run.
  // It cannot raise a counter, which is the direction this file is about. Checked on its own below.
  _reset: (store) => store._reset(),
};

/** A course with a ladder and one sentence produced twice — so a stray write has something to lose. */
function seedHiMr(): void {
  const store = useAppStore.getState();
  store.ensureCourse(COURSE);
  store.ensureCourse('en-ar');
  store.setLadder(COURSE, ladderFromLevels(levelsFixture(COURSE).levels));
  store.recordProduction(COURSE, SENTENCE);
  store.recordProduction(COURSE, SENTENCE);
}

function productionOf(courseId: string) {
  return useAppStore.getState().courses[courseId]?.production;
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

describe('no other action can move what the learner has produced', () => {
  it('covers every action the store exposes — a new one must be listed here', () => {
    expect(Object.keys(CALLS).sort()).toEqual(actionNames());
  });

  it.each(
    Object.keys(CALLS).filter(
      (name) => name !== WRITER && name !== 'restoreBackup' && name !== '_reset',
    ),
  )('%s leaves the counters exactly as it found them', (name) => {
    seedHiMr();
    const before = productionOf(COURSE);

    CALLS[name]?.(useAppStore.getState());

    // Same object, not merely equal: nothing rebuilt it, so nothing could have counted for it.
    expect(productionOf(COURSE)).toBe(before);
    expect(productionOf(COURSE)).toEqual({ [SENTENCE]: 2 });
  });

  it('recordProduction does write — so the check above is not passing on an empty map', () => {
    seedHiMr();

    useAppStore.getState().recordProduction(COURSE, SENTENCE);

    expect(productionOf(COURSE)).toEqual({ [SENTENCE]: 3 });
  });

  it('_reset erases and never counts: first-run state has no counter in it', () => {
    seedHiMr();

    useAppStore.getState()._reset();

    expect(useAppStore.getState().courses).toEqual({});
  });
});

describe('recordProduction counts up, and only up', () => {
  it('goes 1, 2, 3 … on a sentence nobody has produced yet', () => {
    useAppStore.getState().ensureCourse(COURSE);
    const counts: number[] = [];

    for (let call = 0; call < 4; call += 1) {
      useAppStore.getState().recordProduction(COURSE, SENTENCE);
      counts.push(productionOf(COURSE)?.[SENTENCE] ?? 0);
    }

    expect(counts).toEqual([1, 2, 3, 4]);
  });

  it('never lowers a counter, whatever order the whole action surface is called in', () => {
    seedHiMr();
    const lowest = () => Math.min(...Object.values(productionOf(COURSE) ?? { [SENTENCE]: 0 }));
    let refusals = 0;
    let last = lowest();

    // Every action, twice through: the counter may only ever rise. The second pass makes
    // `passRitual` refuse (its rung has moved on), which is the other case worth pinning — an
    // action that throws must not have moved a counter on its way out either. The two document
    // movers sit outside the sweep: `_reset` erases and `restoreBackup` (#108) replaces — a
    // restored file legitimately holds yesterday's numbers, which is not an edit to today's.
    for (const name of [...Object.keys(CALLS), ...Object.keys(CALLS)]) {
      if (name === '_reset' || name === 'restoreBackup') continue;
      try {
        CALLS[name]?.(useAppStore.getState());
      } catch {
        refusals += 1;
      }

      const now = lowest();
      expect(now).toBeGreaterThanOrEqual(last);
      last = now;
    }

    expect(refusals).toBeGreaterThan(0);
    expect(productionOf(COURSE)?.[SENTENCE]).toBeGreaterThanOrEqual(2);
  });

  it('counts past two and keeps counting — two is what the ritual asks for, not a cap', () => {
    useAppStore.getState().ensureCourse(COURSE);
    for (let call = 0; call < 5; call += 1) {
      useAppStore.getState().recordProduction(COURSE, SENTENCE);
    }

    expect(productionOf(COURSE)?.[SENTENCE]).toBe(5);
  });

  it('counts each sentence on its own, and leaves the rest of the course alone', () => {
    seedHiMr();

    useAppStore.getState().recordProduction(COURSE, 'L1-M2-S02');

    expect(productionOf(COURSE)).toEqual({ [SENTENCE]: 2, 'L1-M2-S02': 1 });
  });

  it('stays inside its course (Invariant 8)', () => {
    seedHiMr();
    const enAr = useAppStore.getState().courses['en-ar'];

    useAppStore.getState().recordProduction(COURSE, SENTENCE);

    expect(useAppStore.getState().courses['en-ar']).toBe(enAr);
    expect(productionOf('en-ar')).toEqual({});
  });

  it('creates the course subtree rather than dropping a got-it on the floor', () => {
    useAppStore.getState().recordProduction('fr-de', 'L1-M1-S01');

    expect(productionOf('fr-de')).toEqual({ 'L1-M1-S01': 1 });
  });

  it('touches nothing else a course owns — this is a counter, not a progression write', () => {
    seedHiMr();
    const before = useAppStore.getState().courses[COURSE];

    useAppStore.getState().recordProduction(COURSE, SENTENCE);
    const after = useAppStore.getState().courses[COURSE];

    expect(after?.modules).toBe(before?.modules);
    expect(after?.studied).toBe(before?.studied);
    expect(after?.reviewQueue).toBe(before?.reviewQueue);
    expect(after?.sessionCount).toBe(before?.sessionCount);
    expect(after?.session).toBe(before?.session);
  });
});

/* --------------------------------------------------- 3. the rest of the app, by scan */

describe('nothing outside the store writes a production map', () => {
  it('finds no counter write in any shipped file', () => {
    const violations = shellFiles().flatMap((file) =>
      (SOURCES[file] ?? '')
        .split('\n')
        .map((line, index) => ({ file, line: index + 1, text: line.trim() }))
        .filter(
          (hit) =>
            hit.file !== STORE_FILE &&
            PRODUCTION_WRITE.some(({ pattern }) => pattern.test(hit.text)),
        ),
    );

    expect(
      violations,
      violations
        .map((violation) => `${violation.file}:${violation.line} ${violation.text}`)
        .join('\n')
        .concat(
          `\nGo through ${WRITER}: the counters have one writer so that "they never fall" is a property of the app and not of every caller (PRD §8 F1).`,
        ),
    ).toEqual([]);
  });

  it('scans the real tree — the shell files, and not the tests beside them', () => {
    const files = shellFiles();

    expect(files).toContain(STORE_FILE);
    expect(files).toContain('src/screens/useExitAvailable.ts');
    expect(files.some((file) => /\.test\.tsx?$/.test(file))).toBe(false);
    expect(files.some((file) => file.startsWith('src/test/'))).toBe(false);
  });
});
