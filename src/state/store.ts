/**
 * The state store (#82) — zustand + persist over one localStorage document, `rung:state`
 * (docs/01-plan.md §4, §6; PRD §8 F7).
 *
 * It stays THIN, and the rules stay out of it. It owns which course is active, the per-course
 * subtree existing at all, settings, and the two writes progression needs (#83) — and every rule
 * those two obey is derived in `src/engine/progression.ts`, which the store asks rather than
 * reimplements. The remaining domain actions land in their own tickets and write through this same
 * shape: production + review queue (#95), the session snapshot (#96), the full course-switch flow
 * with its toast (#106).
 *
 * Three properties this module is responsible for keeping true:
 *
 *   • **Switching never destroys progress (Invariant 8).** `setActiveCourse` writes one string.
 *     Nothing in this file deletes or rewrites a course subtree, and `ensureCourse` returns the
 *     state untouched when the course is already there — so a re-boot, a switch, and a
 *     course that has temporarily vanished from a build all leave the stored ladders alone.
 *   • **One unlock path (Invariant 1).** `passRitual` is the only action that writes `modules`,
 *     and it refuses any module that is not the current rung. `unlockPath.test.ts` proves both —
 *     mechanically over this file's source, and behaviourally over every action the store exposes.
 *   • **No dates.** Nothing here stamps a time; when an action needs one it takes a `Clock`
 *     (`clock.ts`). `passedAt` is the only date in the document.
 */
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { currentRungId, type LevelPlan, type ProgressionInput } from '../engine/progression.ts';
import { systemClock, type Clock } from './clock.ts';
import {
  STATE_VERSION,
  type AppState,
  type CourseId,
  type CourseState,
  type ModuleId,
  type Settings,
} from './types.ts';

/** The localStorage key, PRD §8 F7. One document for the whole app, all courses inside it. */
export const STORAGE_KEY = 'rung:state';

/** A course the learner has not touched yet: an empty ladder, empty queues, no open session. */
export function emptyCourseState(): CourseState {
  return {
    modules: {},
    production: {},
    reviewQueue: [],
    sessionCount: 0,
    studied: {},
    session: null,
  };
}

/**
 * First run, and what `_reset()` and a failed migration go back to. `activeCourse` is empty
 * rather than a course id, because the shell names no course (PRD §4): the first boot resolves
 * one out of the manifest and records it (`CourseProvider`).
 */
export function initialState(): AppState {
  return {
    stateVersion: STATE_VERSION,
    activeCourse: '',
    courses: {},
    settings: {
      // Design recommends ON: numberless, calm, one tap to off. The first-run default is still
      // open as [Q3] (#70) — when Rishabh decides, this line and the drift guard change together.
      elapsedTickEnabled: true,
    },
  };
}

/**
 * The ladder the course layer has loaded, per course — content, not progress.
 *
 * It is held here and **never persisted** (`persistedSlice` takes the four state keys and nothing
 * else) because a build's ladder is derived from what that build shipped: a stored copy would
 * outlive its content and answer questions about rungs that no longer exist. The course layer sets
 * it from `levels.json` when it resolves (`ladderFromLevels`), and until it does, `passRitual` has
 * no ladder to check a rung against — so nothing can pass. A ladder the store has not been given is
 * not a ladder anyone can climb.
 */
export interface LoadedContent {
  ladders: Record<CourseId, readonly LevelPlan[]>;
}

/** What the store does, on top of what it holds. One of these is for tests. */
export interface AppActions {
  /**
   * Creates the empty subtree for a course, once. Idempotent by identity: an existing course
   * returns the very same state object, so no write, no re-render, and no way to blank a ladder
   * by calling this twice (Invariant 8).
   */
  ensureCourse: (courseId: CourseId) => void;
  /**
   * The bare swap: moves the pointer, touches no course data. The learner-facing switch flow
   * (confirm, toast, re-boot of strings and content) is #106.
   */
  setActiveCourse: (courseId: CourseId) => void;
  setSetting: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  /**
   * Hands the store a course's ladder, as loaded from `levels.json` (`ladderFromLevels`). Call it
   * from an effect when the levels resolve, not during a render — it writes. Passing the same array
   * back is not a write, so a re-render that re-resolves the same content changes nothing.
   */
  setLadder: (courseId: CourseId, ladder: readonly LevelPlan[]) => void;
  /**
   * Records that the learner has opened a module — the `studied` flag [D22] reads off this, and it
   * is the only thing that flips a fresh rung card to "Practice". Idempotent: marking a module the
   * learner has already read is not a write.
   *
   * It marks; it does not unlock. Studying every module in the ladder leaves every status exactly
   * where it was (Invariant 1).
   */
  markStudied: (courseId: CourseId, moduleId: ModuleId) => void;
  /**
   * Passes a module — see the comment block on the implementation. THE ONLY WRITER OF `modules`
   * (Invariant 1), and it refuses anything but the current rung.
   */
  passRitual: (courseId: CourseId, moduleId: ModuleId, clock?: Clock) => void;
  /** Dev + tests only: back to first-run state. No screen may call this — there is no Erase. */
  _reset: () => void;
}

export type AppStore = AppState & LoadedContent & AppActions;

/**
 * The pure engine's input, assembled for one course out of what the store holds: that course's
 * ladder, its passed set (`modules`' keys — the map holds passed modules and nothing else) and its
 * `studied` flags. Exported because the screens derive from the same input the store guards with:
 * the Ladder (#86) and the rung card (#87) read `deriveStatuses`/`rungStage` off this.
 *
 * `exitAvailable` defaults to `() => false` — the real predicate (every sentence self-marked
 * got-it ≥ 2×) arrives with the production counters in **#95**, and until the counters exist,
 * "nothing is exit-ready" is the honest answer rather than a placeholder.
 */
export function progressionInput(
  state: AppState & LoadedContent,
  courseId: CourseId,
  exitAvailable: (moduleId: ModuleId) => boolean = () => false,
): ProgressionInput {
  const course = state.courses[courseId];

  return {
    levels: state.ladders[courseId] ?? [],
    passed: new Set(Object.keys(course?.modules ?? {})),
    studied: (moduleId) => course?.studied[moduleId] === true,
    exitAvailable,
  };
}

/**
 * What actually goes to storage: the state, never the actions. Exported so the drift guard
 * asserts against the same projection the persistence writes.
 */
export function persistedSlice({
  stateVersion,
  activeCourse,
  courses,
  settings,
}: AppStore): AppState {
  return { stateVersion, activeCourse, courses, settings };
}

/**
 * Migration — a wired stub, and the contract for whoever writes the real one (P4, with F7
 * export/import).
 *
 * v5 → v6 is a wrap: v5 knew one course, so its `{modules, production, reviewQueue,
 * sessionCount, studied, session}` becomes `courses['hi-mr']`, `activeCourse` becomes `'hi-mr'`,
 * and `settings` stays at the top level (PRD §8 F7). Two rules bind any version of this
 * function: it must never drop a course subtree it does not recognise, and it must return a
 * COMPLETE v6 document — a half-filled shape is worse than a fresh one, because every screen
 * below trusts the shape and none of them re-check it.
 *
 * Until that lands the stub refuses to guess: it warns, naming the version it found, and boots
 * first-run state. That is honest rather than lossy in practice — `rung:state` is new in this
 * app and has never held a v5 payload, so this path is a mechanism kept wired (a version bump
 * runs it) rather than a live upgrade route.
 */
export function migrate(_persisted: unknown, fromVersion: number): AppState {
  console.warn(
    `${STORAGE_KEY}: found state v${fromVersion}, and no migration to v${STATE_VERSION} exists yet — starting fresh (the v5 → v6 wrap ships with export/import, PRD §8 F7)`,
  );
  return initialState();
}

export const useAppStore = create<AppStore>()(
  persist(
    (set, get) => ({
      ...initialState(),
      // Content the course layer hands over at runtime, and the one part of the store that a
      // reload rebuilds rather than restores.
      ladders: {},

      ensureCourse: (courseId) =>
        set((state) =>
          state.courses[courseId] === undefined
            ? { courses: { ...state.courses, [courseId]: emptyCourseState() } }
            : // Same object back: zustand skips the write, so an existing ladder is never
              // rebuilt from empty. This is the idempotence, not an optimisation.
              state,
        ),

      setActiveCourse: (courseId) => set({ activeCourse: courseId }),

      setSetting: (key, value) =>
        set((state) => ({ settings: { ...state.settings, [key]: value } })),

      setLadder: (courseId, ladder) =>
        set((state) =>
          state.ladders[courseId] === ladder
            ? state
            : { ladders: { ...state.ladders, [courseId]: ladder } },
        ),

      markStudied: (courseId, moduleId) =>
        set((state) => {
          const course = state.courses[courseId] ?? emptyCourseState();
          if (course.studied[moduleId] === true) return state;

          return {
            courses: {
              ...state.courses,
              [courseId]: { ...course, studied: { ...course.studied, [moduleId]: true } },
            },
          };
        }),

      /* ------------------------------------------------------------------------------------
       * INVARIANT 1 — THE SINGLE UNLOCK PATH.
       *
       * This action is the ONLY writer of `modules` in the app. Nothing else marks a module
       * passed: not a screen, not a migration, not a debug helper. "Progression only through the
       * generative exit ritual, learner-confirmed" (PRD §2 Invariant 1) is a product promise, and
       * a promise with two implementations is a promise with none — so it has one, here, and
       * `unlockPath.test.ts` fails if a second one is ever written.
       *
       * The rule it enforces: the module must BE the course's current rung, as
       * `src/engine/progression.ts` derives it from the ladder and the passed set. Anything else
       * throws and writes nothing — a module further up (there is no skipping a rung), a module
       * already passed (the ritual has moved on), a module of a sealed level, or any module at all
       * when the store has not been handed that course's ladder yet.
       *
       * What it writes is one entry: `{status: 'passed', passedAt}`. `passedAt` comes from the
       * injected `Clock` (`clock.ts`, the app's only date-construction site) — a receipt for the
       * module list, never a schedule (Invariant 2), and injectable so a test pins it without
       * touching global time.
       *
       * #103 wraps this: `completeRitual` will enrol the module's sentences into the review queue
       * in the same write. It must call through here rather than beside it.
       * ---------------------------------------------------------------------------------- */
      passRitual: (courseId, moduleId, clock = systemClock) => {
        const current = currentRungId(progressionInput(get(), courseId));
        if (current !== moduleId) {
          throw new Error(
            `passRitual: ${moduleId} is not ${courseId}'s current rung (${current ?? 'no rung is current'}) — the exit ritual is the only unlock path (Invariant 1)`,
          );
        }

        const passedAt = clock();
        set((state) => {
          const course = state.courses[courseId] ?? emptyCourseState();

          return {
            courses: {
              ...state.courses,
              [courseId]: {
                ...course,
                modules: { ...course.modules, [moduleId]: { status: 'passed', passedAt } },
              },
            },
          };
        });
      },

      // Back to first-run state, ladders included: the course layer re-registers them on boot, and
      // a ladder left behind would outlive the state it describes.
      _reset: () => set({ ...initialState(), ladders: {} }),
    }),
    {
      name: STORAGE_KEY,
      version: STATE_VERSION,
      // Explicit rather than implied: this app persists to localStorage and to nothing else —
      // no IndexedDB, no backend, no accounts (docs/01-plan.md §3).
      storage: createJSONStorage(() => localStorage),
      partialize: persistedSlice,
      migrate,
    },
  ),
);
