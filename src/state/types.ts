/**
 * State v8 — the persisted shape (#82, PRD §8 F7, docs/01-plan.md §6; v8 retires the one-shot
 * notebook-invitation bit v7 added to `settings`, #227).
 *
 * One localStorage document, keyed by course. That keying is the whole point: everything a
 * learner earns hangs under `courses[<courseId>]`, so switching the active course moves a
 * pointer and touches nothing else — **course switching never destroys progress**
 * (Invariant 8). A course whose content is temporarily absent from a build keeps its subtree
 * and its position; when the folder comes back, so does the ladder.
 *
 * What is deliberately NOT here, and must never be added:
 *
 *   • **No learner text.** No 11th sentence, no attempt list, no self-mark log. The app is
 *     read-only teaching: it never evaluates, grades, or stores what the learner wrote
 *     (Invariant 4). The v2 shape had an `attempts` array carrying sentences; v6 does not, and
 *     `store.test.ts` pins the key list so it cannot creep back.
 *   • **No calendar.** Scheduling counts sessions, never days (Invariant 2). `passedAt` is the
 *     one timestamp in the whole document — a receipt for the module list, not a schedule —
 *     and it is stamped through `clock.ts`, the only date-construction site in the app.
 *
 * These types are the contract the domain tickets fill in: progression (#83), the production
 * counters (#95), the review queue (#103), the session snapshot (#96). This module declares the
 * shape; the store (`store.ts`) owns only course bookkeeping and settings.
 */

/** Manifest course id — `hi-mr`, `en-ar`. Never hardcoded in the shell, only carried around. */
export type CourseId = string;
/** Module id as authored — `L1-M1`. */
export type ModuleId = string;
/** Sentence id as authored — `L1-M1-S03`. */
export type SentenceId = string;

/** The persisted state's version. The store and the migration read it from here. */
export const STATE_VERSION = 10;

/**
 * A passed module. `status` is a one-member union on purpose: a module is in this map because
 * the learner passed it, or it is not in the map at all. There is no failure to record — the
 * only way in is the exit ritual (Invariant 1), and nothing else in the app writes here.
 */
export interface ModuleProgress {
  status: 'passed';
  /** ISO-8601 instant from `systemClock()`. The only date in the whole document. */
  passedAt: string;
}

/** Leitner box (PRD §8 F4). Three boxes; an item enters at 1, and there is no box 0. */
export type LeitnerBox = 1 | 2 | 3;

/** One scheduled review. Due in SESSIONS, never in days — the app has no calendar. */
export interface ReviewItem {
  sentenceId: SentenceId;
  box: LeitnerBox;
  dueInSessions: number;
}

/**
 * Practice phases, in the order a session serves them (PRD §8 F4).
 *
 * **There were three** — Review, Read, Produce — until #349 retired notebook writing and with it
 * the phase that asked the learner to say a sentence and check it. This union is a persisted
 * value (a `SessionSnapshot` names one), so dropping a member is a schema change and not a
 * refactor: state v10 is exactly this narrowing, and `migrate` retires a session parked in the
 * phase that no longer exists rather than resuming it into nowhere.
 */
export type SessionPhase = 'review' | 'read';

/**
 * The in-flight session, stored per course — what makes resume lossless after an app kill AND
 * after switching courses away and back (PRD §8 F4). `null` when no session is open.
 */
export interface SessionSnapshot {
  phase: SessionPhase;
  /** How far into `queue` the learner got. */
  idx: number;
  /** The sentence ids this session serves, in order. */
  queue: SentenceId[];
}

/** Everything one course owns. Created empty by `ensureCourse`, filled by the domain tickets. */
export interface CourseState {
  /** Passed modules only — the ladder position. */
  modules: Record<ModuleId, ModuleProgress>;
  /**
   * Times each sentence has been self-marked got-it in Read. **Counters never decrement**:
   * `recordProduction` is their one writer and its only arithmetic is `+ 1`
   * (`productionCounters.test.ts` proves it). Every sentence at ≥ 1 is `exit_available` (F1).
   *
   * The field is still called `production` because it is on disk under that name and the numbers
   * in it are the same numbers: #349 moved WHO writes them (Produce's got-it became Read's) and
   * WHAT they open (two marks became one), not what they count. Renaming it would be a migration
   * of every learner's document to say the same thing in different words.
   */
  production: Record<SentenceId, number>;
  reviewQueue: ReviewItem[];
  sessionCount: number;
  /** Modules the learner has read through — the "studied" marker the Ladder renders. */
  studied: Record<ModuleId, boolean>;
  session: SessionSnapshot | null;
}

/** App-wide settings — not per course: they describe the learner, not the ladder. */
export interface Settings {
  /**
   * The gentle elapsed tick: 2 px, numberless, capped, toggleable — the only sanctioned time
   * affordance in the app (Invariant 2's boundary note, PRD §8 F4).
   */
  elapsedTickEnabled: boolean;
  /**
   * **The user's own language** (#322) — a BCP-47 tag matching some manifest course's `l1Tag`
   * (`hi` or `en` today).
   *
   * The app had no such fact before: it knew an ACTIVE COURSE, whose `l1` happened to be the
   * language the learner reads. That conflation is fine while a person learns one thing, and it
   * falls apart the moment course selection is restructured as "pick your language, then pick
   * what to learn" — the language outlives any one course, so it has to exist on its own.
   *
   * `''` is unset, the same first-run convention `activeCourse` uses, and it is what every
   * migrated document carries. **Unset is not a missing value to repair**: it means "follow the
   * active course's own L1", which is exactly what the app did before this field existed, so a
   * learner who never opens Settings sees no change. `resolveUserLang` (`course/manifest.ts`) is
   * the one place that resolution lives, so no screen re-derives it a second way.
   */
  userLang: string;
}

/** The persisted document, top to bottom. PRD §8 F7 prints exactly this. */
export interface AppState {
  stateVersion: typeof STATE_VERSION;
  /** The course the app boots into. `''` until the first boot resolves one (`CourseProvider`). */
  activeCourse: CourseId;
  courses: Record<CourseId, CourseState>;
  settings: Settings;
}
