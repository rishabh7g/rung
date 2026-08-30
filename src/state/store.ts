/**
 * The state store (#82) — zustand + persist over one localStorage document, `rung:state`
 * (docs/01-plan.md §4, §6; PRD §8 F7).
 *
 * It stays THIN, and the rules stay out of it. It owns which course is active, the per-course
 * subtree existing at all, settings, the two writes progression needs (#83), the production
 * counters (#95), the review queue and the session snapshot (#96, #103) — and every rule those
 * obey is derived in `src/engine/` (`progression.ts`, `exit.ts`, `leitner.ts`), which the store
 * asks rather than reimplements. The course-switch flow (#106) writes through this same shape:
 * `switchCourse` below is its one store-side write, and the toast is the Settings screen's.
 *
 * Four properties this module is responsible for keeping true:
 *
 *   • **Switching never destroys progress (Invariant 8).** `setActiveCourse` writes one string.
 *     Nothing in this file deletes or rewrites a course subtree, and `ensureCourse` returns the
 *     state untouched when the course is already there — so a re-boot, a switch, and a
 *     course that has temporarily vanished from a build all leave the stored ladders alone.
 *   • **One unlock path (Invariant 1).** `passRitual` is the only action that writes `modules`,
 *     and it refuses any module that is not the current rung. `completeRitual` — the end of the
 *     exit ritual, and the only place in the app a module passes — calls THROUGH it rather than
 *     beside it, carrying the review enrolment into its single write. `unlockPath.test.ts` proves
 *     both — mechanically over this file's source, and behaviourally over every action the store
 *     exposes.
 *   • **The production counters only ever count up.** `recordProduction` is their one writer and
 *     its only arithmetic is `+ 1`; nothing in the app can lower one. `productionCounters.test.ts`
 *     proves that the same three ways.
 *   • **No dates.** Nothing here stamps a time; when an action needs one it takes a `Clock`
 *     (`clock.ts`). `passedAt` is the only date in the document.
 */
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { applyMark, enrol, tickSession } from '../engine/leitner.ts';
import { currentRungId, type LevelPlan, type ProgressionInput } from '../engine/progression.ts';
import { planSession, type SessionPlan } from '../engine/session.ts';
import { systemClock, type Clock } from './clock.ts';
import { durableLocalStorage } from './durableStorage.ts';
import {
  STATE_VERSION,
  type AppState,
  type CourseId,
  type CourseState,
  type ModuleId,
  type ReviewItem,
  type SentenceId,
  type SessionPhase,
  type SessionSnapshot,
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
      // Unset (#322): the user's language follows the active course's own L1 until they say
      // otherwise, which is exactly what the app did before the field existed.
      userLang: '',
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
   * The bare swap: moves the pointer, touches no course data. The boot path's write — the first
   * run records the course the manifest resolved. A learner-made switch goes through
   * `switchCourse` below, which calls this.
   */
  setActiveCourse: (courseId: CourseId) => void;
  /**
   * **The course switch, whole** (#106, PRD §8 F0 [D19]): make sure the target has a subtree
   * (`ensureCourse`), move the pointer (`setActiveCourse`), and reset the transient UI tier —
   * and NOTHING else. Every per-course persistent fact — the passed set, the counters, the
   * review queue, the `studied` flags, the resumable `session` snapshot — is left exactly as it
   * was, by construction: this action holds no write of its own, and neither call it delegates
   * to touches course data (Invariant 8; eng §17 — the prototype resets session state on
   * switch, and the product must not).
   *
   * "Transient UI" is a tier, not a list: everything this app keeps in **sessionStorage** under
   * the `rung:` namespace (the module lists' open cards and scroll offsets, #88/#89, and
   * whatever joins them) is the current visit's UI and nothing the learner earned — which is
   * exactly why it lives outside the one persisted document. A switch starts the new course's
   * screens fresh by sweeping that tier; the document (`rung:state`, localStorage) it cannot
   * touch.
   *
   * Switching to the course already active is a no-op — nothing moved, so nothing resets.
   *
   * The provider re-boots into the target's strings and content on the pointer move
   * (`CourseProvider` subscribes to `activeCourse`), and the toast naming both courses is the
   * Settings screen's, from the TARGET course's bundle.
   */
  switchCourse: (courseId: CourseId) => void;
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
   * One self-marked got-it, counted: `production[sentenceId]` goes up by one (PRD §8 F1 —
   * `exit_available` is every sentence of a module at ≥ 2×). See the comment block on the
   * implementation for the increment-only rule and how it is proved.
   *
   * **Who may call it (PRD §8 F4, the routing contract).** ONLY a **Produce**-phase got-it.
   * A **Review**-phase mark is the Leitner scheduler's — `applyMark` in `engine/leitner.ts`,
   * which moves a box and a countdown and touches no counter here — and the two are different
   * numbers in different places for a reason: Review measures what is being kept, production
   * measures what is being built. Counting a review as production would open the exit ritual on a
   * rung the learner has not produced at all.
   *
   * The distinction belongs to the caller, because nothing below it can see a phase: the self-mark
   * control is deliberately identical in Review, Produce and Comprehension (`components/SelfMark`,
   * [D11]) and the reveal card imports no store. The session machine (#96) is the one caller, and
   * it must call this from its Produce branch and from nowhere else — a red mark calls nothing.
   */
  recordProduction: (courseId: CourseId, sentenceId: SentenceId) => void;
  /**
   * One self-marked Review card, applied to the Leitner queue — the OTHER half of the routing
   * contract above (PRD §8 F4). A got-it promotes a box and buys its interval, a miss goes back to
   * box 1; `engine/leitner.ts` owns both rules and this action only carries the answer into state.
   *
   * **It never touches `production`.** Review measures what is being kept and production measures
   * what is being built, and counting a review as production would open the exit ritual on a rung
   * the learner has not produced at all. A `sentenceId` the queue does not hold changes nothing —
   * a Produce mark misrouted here is a no-op rather than a silent write somewhere else.
   */
  recordReview: (courseId: CourseId, sentenceId: SentenceId, gotIt: boolean) => void;
  /**
   * Opens a FRESH session, and it is the one action that may: `sessionCount + 1`, the review queue
   * ticked one session closer to due, and the per-course snapshot initialised at the first card.
   * It answers with the plan (`engine/session.ts`) the session then serves.
   *
   * **Called ONCE per session** — see the comment block on the implementation for why resume (#99)
   * depends on that.
   */
  startSession: (courseId: CourseId, moduleSentenceIds?: readonly SentenceId[]) => SessionPlan;
  /**
   * Writes the in-flight session's position, or clears it with `null` at the summary (PRD §8 F7 —
   * `session`, the per-course snapshot that makes resume lossless). Called on every card advance
   * and every phase change; an unchanged snapshot is not a write.
   *
   * It moves a position and nothing else: it cannot start a session (no `sessionCount`, no tick)
   * and cannot mark anything.
   */
  setSession: (courseId: CourseId, session: SessionSnapshot | null) => void;
  /**
   * Passes a module — see the comment block on the implementation. THE ONLY WRITER OF `modules`
   * (Invariant 1), and it refuses anything but the current rung.
   *
   * `enrolment` is the review queue this same write also lays down, derived from the one it
   * replaces. It exists so a pass and its enrolment are ONE persisted document rather than two
   * (`completeRitual` below is its only caller, and passes `enrol`); it is typed as a queue
   * transform precisely so a caller cannot smuggle anything else — least of all a `modules`
   * entry — into the pass's write.
   */
  passRitual: (
    courseId: CourseId,
    moduleId: ModuleId,
    clock?: Clock,
    enrolment?: (reviewQueue: readonly ReviewItem[]) => readonly ReviewItem[],
  ) => void;
  /**
   * **The exit ritual, completed** (#103, PRD §8 F5): the module passes, and the sentences it
   * taught enter the review queue — one action, one write, and the only place either happens at
   * the end of a ritual.
   *
   * It writes nothing itself. The pass is `passRitual`'s (the single unlock path, Invariant 1 —
   * so a module that is not the current rung throws out of here exactly as it throws out of
   * there, having written neither the pass nor the enrolment), and the queue is `enrol`'s
   * (`engine/leitner.ts`, which owns the policy this call makes: **a sentence enters review when
   * its module is passed**, because that is when production ends and maintenance begins).
   *
   * **Atomic, and that is the point.** Both halves ride in `passRitual`'s single `set`, so
   * storage never holds a passed module whose sentences are not enrolled. That intermediate state
   * would be unrecoverable rather than untidy: `passRitual` refuses a module the learner has
   * already passed, so those sentences would have no second chance to be enrolled and would never
   * come up for review again. `enrol` is idempotent, so the reverse — a replay — costs nothing.
   */
  completeRitual: (
    courseId: CourseId,
    moduleId: ModuleId,
    sentenceIds: readonly SentenceId[],
    clock?: Clock,
  ) => void;
  /**
   * **The import's one write (#108, PRD §8 F7): a backup document, restored whole.** Takes a
   * document `importState` (serialize.ts) has already validated field by field — this action is
   * the pen, never the judge — and replaces the persisted state with it: every course subtree,
   * the active course, the settings. A replace, not a merge: a course the file does not hold is
   * gone, because a restore that quietly kept pieces the file never promised would tell the
   * learner their history is back while handing them something else.
   *
   * Like `migrate` above, it carries and never authors: nothing in it can mark a module passed
   * that the document does not already hold, and the document can only hold what `importState`'s
   * vocabularies admit (Invariant 4) — `unlockPath.test.ts` and `productionCounters.test.ts`
   * carry its exemption from the no-other-writer sweeps on exactly that argument. The two-sided
   * confirm before any call is the screen's (#108); this action trusts its caller showed it.
   *
   * It leaves `ladders` alone (content, not progress — this build's course layer owns it) and
   * sweeps the transient sessionStorage tier exactly as `switchCourse` does: open cards, scroll
   * offsets and the rest of the visit's UI belong to the state being replaced.
   */
  restoreBackup: (document: AppState) => void;
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
 * `exitAvailable` stays **injected** rather than derived here, because half of its answer is
 * content: "every sentence self-marked got-it ≥ 2×" needs the module's sentence ids, which live in
 * `modules/<id>.json` and never in the store. `screens/useExitAvailable.ts` (#95) joins the two —
 * this course's counters and the current rung's sentences — through `engine/exit.ts`, and passes
 * the real predicate in. The `() => false` default is what a caller holding no sentence list can
 * honestly say: you cannot claim every sentence is produced when you do not know what they are.
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
 * Whether two snapshots describe the same card. Position is written on every advance and a session
 * re-renders far more often than it moves, so this is what keeps `setSession` from rebuilding the
 * course subtree — and the persistence from writing localStorage — for a snapshot that has not
 * changed. The queue is compared by its ids: a fresh array holding the same session is the same
 * session.
 */
function sameSession(a: SessionSnapshot | null, b: SessionSnapshot | null): boolean {
  if (a === null || b === null) return a === b;

  return (
    a.phase === b.phase &&
    a.idx === b.idx &&
    a.queue.length === b.queue.length &&
    a.queue.every((sentenceId, index) => sentenceId === b.queue[index])
  );
}

/**
 * The oldest state version `migrate` has a route for. v5 is where the routes begin because v5
 * is the oldest shape this app ever wrote to `rung:state`; anything older reaching `migrate`
 * was written by something else, and guessing at it would be a silent, partial restore. Both
 * readers of a versioned document — the store's rehydrate below and `serialize.ts`'s import —
 * take the answer from this one constant, so a file and a reload can never disagree about
 * which versions have a way in.
 */
export const OLDEST_MIGRATABLE_VERSION = 5;

/**
 * The migration — three routes today, each one step, chained oldest-first (PRD §8 F7):
 *
 *   • **v5 → v6 is a WRAP.** v5 knew one course, so its `{modules, production, reviewQueue,
 *     sessionCount, studied, session}` becomes `courses['hi-mr']`, `activeCourse` becomes
 *     `'hi-mr'`, and `settings` stays at the top level. A v5 field that is absent gets the
 *     empty-course value, because the six keys arrived across several v5 builds and an early
 *     document legitimately lacks the late ones.
 *   • **v6 → v7 completes `settings`.** v7 added the notebook invitation's one-shot dismissal
 *     bit (#177), so a settings key the older document does not carry gets the first-run
 *     default. The bit itself is gone again (below), and what survives of this step is the
 *     rule: an incomplete `settings` is filled from first-run state rather than left short.
 *   • **v8 REBUILDS `settings`.** v8 retired the invitation and its dismissal bit (#227), so
 *     `settings` is assembled field by field from the v8 shape instead of being spread over the
 *     defaults — a legacy key a v6 or v7 document still carries is simply not carried forward.
 *     That matters beyond tidiness: `serialize.ts`'s import validator refuses a document with a
 *     field it does not know, so a v7 backup only survives its own upgrade if this step drops
 *     what v8 no longer holds.
 *   • **v9 → v10 RETIRES A SESSION PARKED IN PRODUCE.** #349 removed the third phase, so `'produce'`
 *     is no longer a value `SessionPhase` has — and an older document can legitimately name it,
 *     because it is exactly where a learner interrupted mid-Produce left off. There is nowhere to
 *     resume such a session to (its `queue` was the Produce order, and `idx` is a position in it),
 *     so the position is dropped and the course opens on a fresh Begin. **Nothing a learner earned
 *     is in that snapshot** — the counters and the review queue hold all of it, and both are
 *     carried through untouched (Invariant 8) — so this costs a place in a session, and no
 *     progress. A `review` or `read` snapshot is carried verbatim, like every other subtree.
 *
 * Two rules bind any version of this function: it never drops a subtree it does not recognise
 * (v5 has exactly one, and the wrap keeps it whole), and it returns a COMPLETE current document —
 * a half-filled shape is worse than a fresh one, because every screen below trusts the shape
 * and none of them re-check it.
 *
 * It carries; it does not bless. The values are taken as they were found, not validated —
 * this function serves two callers with different trust: the rehydrate path below reads what
 * this app itself wrote, and `serialize.ts`'s import path runs the RESULT through the same
 * field-by-field validation a native current-version file gets (#104). Validating here would be a
 * second validator waiting to disagree with that one. The v10 step is the one exception the rule
 * allows for, and it is a narrow one: it does not judge a value, it drops a field whose only
 * legal values no longer include the one it is holding, because the alternative is handing the
 * import validator a document it must then refuse whole.
 *
 * A version older than any route gets a warning and first-run state — on the rehydrate path
 * that is the only honest boot (there is nothing to read), and the import path never lets such
 * a document reach this function at all (`importState` refuses it with a reason first).
 */
export function migrate(persisted: unknown, fromVersion: number): AppState {
  if (
    fromVersion < OLDEST_MIGRATABLE_VERSION ||
    typeof persisted !== 'object' ||
    persisted === null
  ) {
    console.warn(
      `${STORAGE_KEY}: found state v${fromVersion}, and the oldest this app knows how to upgrade is v${OLDEST_MIGRATABLE_VERSION} — starting fresh (PRD §8 F7)`,
    );
    return initialState();
  }

  const found = persisted as Record<string, unknown>;
  const fresh = initialState();

  // v5 → v6: the wrap. Verbatim `as` rather than checks, because carrying the values through
  // unjudged is this function's contract (see above — the import path validates the result).
  const v6 = fromVersion === 5 ? wrapV5(found) : found;

  // v6 → v7: `settings` completed with the first-run defaults underneath whatever the document
  // carries — a document that predates a settings key gains it at its first-run value.
  const v7Settings = { ...fresh.settings, ...(v6['settings'] as Partial<Settings> | undefined) };

  // v7 → v8: `settings` rebuilt field by field from the v8 shape. The spread above carries every
  // key the document holds, including ones v8 has retired (`notebookInvitationDismissed`, #227);
  // naming the survivors is what leaves those behind — and the import validator, which rejects a
  // key it does not know, is why a v7 file needs them left behind to get in at all.
  //
  // v8 → v9: `userLang` (#322). It needs no route of its own — the spread above already lays the
  // document over the first-run defaults, so a v8 document arrives carrying `''`, which is the
  // unset sentinel and means "follow the active course's L1". Naming it here is what carries it
  // for a v9 document that HAS one; leaving it out would silently reset every learner's choice on
  // the next version bump.
  return {
    stateVersion: STATE_VERSION,
    activeCourse: (v6['activeCourse'] ?? fresh.activeCourse) as CourseId,
    courses: retireProduceSessions((v6['courses'] ?? fresh.courses) as AppState['courses']),
    settings: {
      elapsedTickEnabled: v7Settings.elapsedTickEnabled,
      userLang: v7Settings.userLang,
    },
  };
}

/**
 * The v9 → v10 step: a session snapshot that names the retired Produce phase becomes no session.
 *
 * It walks every course rather than only the active one, because a document holds a snapshot per
 * course (#99) and the one the learner is not looking at is exactly the one that would sit there
 * unmigrated until they switched to it. Everything else about a course — the counters, the review
 * queue, the passed modules, the session count — is carried through by reference: this returns a
 * new object only for the courses it actually changes, so a document with no Produce session comes
 * back as the very same map it went in as.
 */
function retireProduceSessions(courses: AppState['courses']): AppState['courses'] {
  const entries = Object.entries(courses);
  // `as` rather than a check: a v9 phase is a string this app wrote, and `'produce'` is precisely
  // the value the current type no longer admits — which is what makes the comparison necessary.
  const parked = entries.filter(
    ([, course]) => (course?.session?.phase as string | undefined) === 'produce',
  );

  if (parked.length === 0) return courses;

  return {
    ...courses,
    ...Object.fromEntries(parked.map(([id, course]) => [id, { ...course, session: null }])),
  };
}

/** The v5 → v6 wrap, as a v6-shaped record the v6 → v7 step above reads like any other. */
function wrapV5(v5: Record<string, unknown>): Record<string, unknown> {
  const empty = emptyCourseState();

  return {
    activeCourse: 'hi-mr',
    courses: {
      'hi-mr': {
        modules: (v5['modules'] ?? empty.modules) as CourseState['modules'],
        production: (v5['production'] ?? empty.production) as CourseState['production'],
        reviewQueue: (v5['reviewQueue'] ?? empty.reviewQueue) as CourseState['reviewQueue'],
        sessionCount: (v5['sessionCount'] ?? empty.sessionCount) as CourseState['sessionCount'],
        studied: (v5['studied'] ?? empty.studied) as CourseState['studied'],
        session: (v5['session'] ?? empty.session) as CourseState['session'],
      },
    },
    settings: v5['settings'],
  };
}

/**
 * The transient UI tier, swept — `switchCourse`'s one side effect (#106).
 *
 * The tier is defined by where it lives, not by a list of keys: this app keeps exactly two kinds
 * of client state, the persisted document (`rung:state`, **localStorage** — progress, the export
 * contract) and the current visit's UI (**sessionStorage** under the same `rung:` namespace —
 * `screens/module/moduleView.ts`'s scroll offsets today, and any one-shot flag
 * that joins them). Sweeping the namespace rather than naming the keys means a screen that adds
 * a transient record later is covered by the switch without an edit here.
 *
 * Wrapped, like every `sessionStorage` access in the app: a locked-down browser (Safari private
 * mode, storage disabled) throws on touch, and a browser that could never remember a scroll
 * offset has nothing to reset.
 */
function clearTransientUi(): void {
  try {
    for (const key of Object.keys(sessionStorage)) {
      if (key.startsWith('rung:')) sessionStorage.removeItem(key);
    }
  } catch {
    // Storage the browser refuses to open never held any transient UI to clear.
  }
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

      // The switch flow's store half (#106) — see the interface. Three delegated moves and no
      // write of its own: the target gets a subtree, the pointer moves, the transient tier
      // resets. Per-course persistent state is untouched by construction (Invariant 8) — the
      // scans in unlockPath.test.ts and productionCounters.test.ts read this body like any
      // other action's and find nothing.
      switchCourse: (courseId) => {
        if (get().activeCourse === courseId) return;

        const { ensureCourse, setActiveCourse } = get();
        ensureCourse(courseId);
        setActiveCourse(courseId);
        clearTransientUi();
      },

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
       * THE PRODUCTION COUNTERS — ONE WRITER, AND IT ONLY EVER COUNTS UP.
       *
       * One self-marked got-it in the Produce phase, counted, and that is the entire action.
       * `exit_available` is "every sentence of the module at ≥ 2×" (PRD §8 F1), so this number is
       * what opens the exit ritual — and a number that can fall is a rung that can close again
       * under a learner who did nothing wrong. So there is no decrement, no reset, no undo and no
       * ceiling: the only arithmetic in here is `+ 1`.
       *
       * Undo is not missing by oversight. The mark commits on Next rather than on the tap
       * ([D11], `components/SelfMark`), which is where a mis-tap is corrected; past that, the
       * counter is a record of work the learner says they did, and the app does not argue with it.
       * A count above two is kept exactly as it is: two is what the ritual asks for, not a cap on
       * practice, and the module list draws its two dots full and says nothing more.
       *
       * `productionCounters.test.ts` is the mechanical half — it slices this file by action and
       * fails if a second one writes `production`, reads this body for any arithmetic that could
       * lower a counter, and calls every action the store exposes against a seeded counter to
       * prove none of them moves it. The same posture as `unlockPath.test.ts` (#83), for the same
       * reason: a rule that lives only in prose decays one well-meant convenience at a time.
       *
       * WHO CALLS IT is on the interface above, and it is the other half of the rule (PRD §8 F4):
       * Produce got-its only. Review marks are the Leitner queue's, and pass through
       * `engine/leitner.ts` instead. The session machine (#96) owns that branch.
       * ---------------------------------------------------------------------------------- */
      recordProduction: (courseId, sentenceId) =>
        set((state) => {
          const course = state.courses[courseId] ?? emptyCourseState();
          const produced = course.production[sentenceId] ?? 0;

          return {
            courses: {
              ...state.courses,
              [courseId]: {
                ...course,
                production: { ...course.production, [sentenceId]: produced + 1 },
              },
            },
          };
        }),

      /* ------------------------------------------------------------------------------------
       * THE OTHER SIDE OF THE ROUTING CONTRACT — REVIEW MARKS GO TO THE QUEUE, AND ONLY THERE.
       *
       * `engine/leitner.ts` decides what a mark costs (got-it promotes a box and buys 1 / 3 / 7
       * sessions; a miss returns to box 1); this action carries that answer into state and does
       * nothing else. It writes `reviewQueue` and never a counter — the pair of writes the session
       * machine keeps apart, one per phase, and the reason `recordProduction` says who may call it.
       *
       * An id the queue does not hold leaves the state object untouched, rather than rebuilding
       * the queue with nothing changed in it. That is idempotence, not an optimisation: a Produce
       * mark that arrived here by mistake must be a no-op, and "same object back" is how the tests
       * can tell a no-op from a write that happened to land on the same values.
       * ---------------------------------------------------------------------------------- */
      recordReview: (courseId, sentenceId, gotIt) =>
        set((state) => {
          const course = state.courses[courseId];
          if (course === undefined) return state;
          if (!course.reviewQueue.some((entry) => entry.sentenceId === sentenceId)) return state;

          return {
            courses: {
              ...state.courses,
              [courseId]: {
                ...course,
                reviewQueue: applyMark(course.reviewQueue, sentenceId, gotIt),
              },
            },
          };
        }),

      /* ------------------------------------------------------------------------------------
       * ONE SESSION, COUNTED ONCE.
       *
       * `sessionCount` is the app's whole clock (Invariant 2: due in sessions, never in days), and
       * `tickSession` spends it — every item comes one session closer to due, once. So this action
       * is the only place either happens, and it happens on a FRESH session only:
       *
       *   • Resuming an interrupted session (#99) restores the snapshot and calls NOTHING here —
       *     re-incrementing would charge a learner a session for closing their tab, and re-ticking
       *     would bring the whole queue due a second time on the same day's work.
       *   • The pause ✕ leaves the snapshot standing (`setSession` is what moves it), so coming
       *     back is a resume, not a second start.
       *
       * Ticking BEFORE planning is what makes "due" mean due in the session about to run, and it
       * is why the plan is taken here rather than by the screen: one tick, one plan, one write.
       * The plan is returned rather than stored whole — state v6's snapshot is a position
       * (`{phase, idx, queue}`, PRD §8 F7), and Read's queue is the rung's own sentence list,
       * derivable from content at any moment, so persisting a second copy of it would be a
       * second thing to keep true.
       *
       * The opening phase is the first honest one: **Review when something is due, Read when
       * nothing is** (PRD §8 F4 — "courses with an empty review queue start at Read"). An empty
       * Review phase would be the app asking the learner to admire a queue with nothing in it.
       * ---------------------------------------------------------------------------------- */
      startSession: (courseId, moduleSentenceIds = []) => {
        const course = get().courses[courseId] ?? emptyCourseState();
        const reviewQueue = tickSession(course.reviewQueue);
        const plan = planSession({ queue: reviewQueue });

        const phase: SessionPhase = plan.reviewIds.length > 0 ? 'review' : 'read';
        const session: SessionSnapshot = {
          phase,
          idx: 0,
          queue: phase === 'review' ? [...plan.reviewIds] : [...moduleSentenceIds],
        };

        set((state) => {
          const held = state.courses[courseId] ?? emptyCourseState();

          return {
            courses: {
              ...state.courses,
              [courseId]: { ...held, sessionCount: held.sessionCount + 1, reviewQueue, session },
            },
          };
        });

        return plan;
      },

      // The position, per course — written on every card advance and cleared at the summary. The
      // snapshot is what survives an app kill and a course switch (#99); this action is only the
      // pen. An unchanged position is not a write, so a session that re-renders without moving
      // touches neither the store nor localStorage.
      setSession: (courseId, session) =>
        set((state) => {
          const course = state.courses[courseId];
          if (course === undefined || sameSession(course.session, session)) return state;

          return { courses: { ...state.courses, [courseId]: { ...course, session } } };
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
       * #103 wraps this: `completeRitual` enrols the module's sentences into the review queue in
       * THIS write, by handing the queue transform in as `enrolment` — it calls through here
       * rather than writing beside it, which is what keeps the pass and its enrolment one
       * document and keeps this the only action with a `modules` write in it.
       * ---------------------------------------------------------------------------------- */
      passRitual: (courseId, moduleId, clock = systemClock, enrolment) => {
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
                // #103's enrolment, in this same write — or the queue exactly as it was, when
                // the pass came without one.
                reviewQueue:
                  enrolment === undefined ? course.reviewQueue : [...enrolment(course.reviewQueue)],
              },
            },
          };
        });
      },

      /* ------------------------------------------------------------------------------------
       * THE END OF THE RITUAL — ONE ACTION, ONE WRITE, AND NEITHER HALF WITHOUT THE OTHER.
       *
       * The pass is delegated (Invariant 1: `passRitual` is the single unlock path, and this is
       * its one caller in the app), and the enrolment rides in the same `set` as the queue
       * transform it is given. `enrol` is `engine/leitner.ts`'s and idempotent — a module passed
       * long ago whose ids are already in the queue keeps its boxes and its countdowns.
       *
       * The order of the two facts in storage is the whole reason they share a write. A document
       * holding a PASSED module whose sentences never enrolled is unrecoverable: the pass cannot
       * be replayed (`passRitual` refuses a rung that is no longer current), so that module's
       * sentences would sit outside review forever. One write has no such in-between —
       * `store.test.ts` counts the `setItem` calls and reads the single document back.
       * ---------------------------------------------------------------------------------- */
      completeRitual: (courseId, moduleId, sentenceIds, clock = systemClock) =>
        get().passRitual(courseId, moduleId, clock, (reviewQueue) =>
          enrol(reviewQueue, [...sentenceIds]),
        ),

      // The F7 restore (#108) — see the interface. The whole validated document in one `set`
      // (storage never holds half a restore), and the same transient sweep as `switchCourse`.
      restoreBackup: (document) => {
        set({ ...document });
        clearTransientUi();
      },

      // Back to first-run state, ladders included: the course layer re-registers them on boot, and
      // a ladder left behind would outlive the state it describes.
      _reset: () => set({ ...initialState(), ladders: {} }),
    }),
    {
      name: STORAGE_KEY,
      version: STATE_VERSION,
      // Explicit rather than implied: this app persists to localStorage and to nothing else —
      // no IndexedDB, no backend, no accounts (docs/01-plan.md §3). `durableLocalStorage` IS
      // that localStorage; its one addition is asking the browser, after the first write, not to
      // evict it (#90, design/pwa-checklist.md §3.5).
      storage: createJSONStorage(() => durableLocalStorage),
      partialize: persistedSlice,
      migrate,
    },
  ),
);
