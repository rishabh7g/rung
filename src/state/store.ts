/**
 * The state store (#82) — zustand + persist over one localStorage document, `rung:state`
 * (docs/01-plan.md §4, §6; PRD §8 F7).
 *
 * It is deliberately THIN. It owns the two things that are nobody else's job — which course is
 * active, and the per-course subtree existing at all — plus settings, and nothing more. The
 * domain actions land in their own tickets and write through this same shape: progression
 * (#83), production + review queue (#95), the session snapshot (#96), the full course-switch
 * flow with its toast (#106). Adding them here early would make those tickets conflict, and
 * would put rules in the store that belong in the pure engine.
 *
 * Two properties this module is responsible for keeping true:
 *
 *   • **Switching never destroys progress (Invariant 8).** `setActiveCourse` writes one string.
 *     Nothing in this file deletes or rewrites a course subtree, and `ensureCourse` returns the
 *     state untouched when the course is already there — so a re-boot, a switch, and a
 *     course that has temporarily vanished from a build all leave the stored ladders alone.
 *   • **No dates.** Nothing here stamps a time; when an action needs one it takes a `Clock`
 *     (`clock.ts`). `passedAt` will be the only date in the document.
 */
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import {
  STATE_VERSION,
  type AppState,
  type CourseId,
  type CourseState,
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

/** What the store does, on top of what it holds. Four actions, and one of them is for tests. */
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
  /** Dev + tests only: back to first-run state. No screen may call this — there is no Erase. */
  _reset: () => void;
}

export type AppStore = AppState & AppActions;

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
    (set) => ({
      ...initialState(),

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

      _reset: () => set(initialState()),
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
