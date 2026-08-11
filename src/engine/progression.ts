/**
 * Progression (#83) — the pure engine behind every Ladder truth (PRD §8 F1 [D22]; PRD-design §5,
 * §6.2; docs/01-plan.md §3, §6).
 *
 * Four questions, one answer each: what state is every module in, is a level sealed, which rung is
 * the learner on, and what does that rung's card offer. All four are **derived**, every time, from
 * the passed set plus the ladder — nothing here is stored, and nothing here writes. A stored level
 * status is a second source of truth waiting to disagree with the modules it summarises (F1: "level
 * status derived, never stored"), and a stored "current rung" is the same bug with a shorter fuse.
 *
 * `src/engine/` is pure TypeScript: no React, no storage, no clock. That is what lets these rules be
 * tested as a table of inputs, and it is why the two live facts this engine needs arrive as
 * **predicates the caller injects**:
 *
 *   • `studied(id)` — the per-course `studied` flag, set on first module open (state v6, #82).
 *   • `exitAvailable(id)` — every sentence self-marked got-it ≥ 2× (PRD §8 F1). Injected rather
 *     than computed here because half of its answer is content: `src/engine/exit.ts` holds the
 *     rule, the store holds the counters, the module file holds the sentence ids they are counted
 *     against, and `screens/useExitAvailable.ts` (#95) is where the three meet. A caller with no
 *     sentence list passes `() => false`, which is what "nothing to check" honestly means.
 *
 * **The single unlock path is not here.** This module can say which rung is current; only
 * `passRitual` in `src/state/store.ts` can make one passed (Invariant 1), and it asks this module
 * the question before it writes. Keeping the rule pure and the write in one place is the whole
 * arrangement: a screen that wants to unlock something has nothing here to call.
 */

/* ------------------------------------------------------------------ the ladder */

/**
 * One level as progression needs it: its rungs in order, and whether each rung's module file
 * actually shipped. Built from `levels.json` by `ladderFromLevels`.
 *
 * `level` is the level's **1-based position in the ladder** — the ladder is an ordered list, and the
 * seal rule reads "the previous level", not "level minus one". Level ids (`L1`) stay in the content
 * layer; the engine never parses one.
 */
export interface LevelPlan {
  level: number;
  moduleIds: readonly string[];
  /** `hasContent` per module id, as the build recomputed it — an absent id reads as false. */
  hasContent: Readonly<Record<string, boolean>>;
}

/**
 * Everything the four functions read. Assembled per course — a hi-mr input can no more see en-ar's
 * ladder than it can see its passed set (Invariant 8); `progressionInput` in the store builds it.
 */
export interface ProgressionInput {
  levels: readonly LevelPlan[];
  /** Module ids the learner has passed. In state v6 that is exactly `courses[id].modules`' keys. */
  passed: ReadonlySet<string>;
  studied: (moduleId: string) => boolean;
  /** All sentences produced ≥ 2× — injected; the predicate is `exit.ts` + the counters (#95). */
  exitAvailable: (moduleId: string) => boolean;
}

/**
 * The ladder as `levels.json` lists it, in the shape this engine reads. Structural on purpose: a
 * `Levels['levels']` (`src/course/types.ts`) passes straight in, and the engine imports nothing from
 * the course layer to accept it.
 *
 * Every listed rung counts, including one whose content has not been authored yet: a pending rung is
 * a rung the learner cannot pass, which is exactly why the level above it stays sealed.
 */
export function ladderFromLevels(
  levels: readonly { modules: readonly { id: string; hasContent: boolean }[] }[],
): LevelPlan[] {
  return levels.map((level, index) => ({
    level: index + 1,
    moduleIds: level.modules.map((module) => module.id),
    hasContent: Object.fromEntries(level.modules.map((module) => [module.id, module.hasContent])),
  }));
}

/* ------------------------------------------------------------------ the rules */

/**
 * Module states, `locked` → `passed` (PRD §8 F1). Only the current rung is ever one of the three
 * middle states; everything ahead of it is `locked`, and `passed` is the only one read from state
 * rather than derived from position.
 */
export type ModuleStatus = 'locked' | 'unlocked' | 'in_progress' | 'exit_available' | 'passed';

/** The current rung card's four stages [D22] — one clear action each (PRD-design §6.2). */
export type RungStage = 'fresh' | 'studied' | 'exit_ready' | 'pending';

/**
 * The seal rule (PRD-design §5): **a level unlocks only when every module of the previous level is
 * passed.** The first level is never sealed; a level the ladder does not list is sealed, because
 * nothing the learner can reach is in it.
 *
 * Two consequences worth stating, because both are the rule working rather than an edge case:
 *
 *   • Sealing **cascades** — L3's previous level is L2, which cannot be complete while L2 is itself
 *     sealed, so an incomplete L1 seals everything above it.
 *   • A rung whose content is not authored yet counts. hi-mr ships 2 of L1's 10 modules today, so L2
 *     is sealed until the other 8 exist AND are passed. That is honest: the seal is about the
 *     learner's climb, and there is nothing to climb through a rung that has no module.
 */
export function levelSealed(input: ProgressionInput, level: number): boolean {
  const index = input.levels.findIndex((plan) => plan.level === level);
  if (index === -1) return true;

  const previous = input.levels[index - 1];
  if (previous === undefined) return false;

  return !previous.moduleIds.every((moduleId) => input.passed.has(moduleId));
}

/**
 * The rung the learner is on: the first non-passed module of the first unsealed, incomplete level.
 * `null` when the whole ladder is passed — the quiet completion state (#103) — and `null` for an
 * empty ladder, which is what a course whose `levels.json` has not been handed over looks like.
 *
 * Walking stops at a sealed level rather than skipping it. For a well-formed ladder that never
 * happens (a sealed level means the level before it had a non-passed rung, which this loop would
 * have returned first); if it ever does, "no current rung" is the safe answer, not "climb over it".
 */
export function currentRungId(input: ProgressionInput): string | null {
  for (const plan of input.levels) {
    if (levelSealed(input, plan.level)) return null;

    const next = plan.moduleIds.find((moduleId) => !input.passed.has(moduleId));
    if (next !== undefined) return next;
  }

  return null;
}

/**
 * Every module in the ladder, by status (PRD §8 F1). Passed modules read from state; the current
 * rung is `unlocked` → `in_progress` (studied) → `exit_available` (all sentences produced ≥ 2×);
 * everything else — later in this level, in a level above, in a sealed level — is `locked`.
 *
 * The Ladder renders straight off this map, so a rung that is not in it is a rung the ladder does
 * not list.
 */
export function deriveStatuses(input: ProgressionInput): Record<string, ModuleStatus> {
  const current = currentRungId(input);
  const statuses: Record<string, ModuleStatus> = {};

  for (const plan of input.levels) {
    for (const moduleId of plan.moduleIds) {
      statuses[moduleId] = input.passed.has(moduleId)
        ? 'passed'
        : moduleId === current
          ? currentRungStatus(input, moduleId)
          : 'locked';
    }
  }

  return statuses;
}

/** The three states only the current rung can be in. */
function currentRungStatus(input: ProgressionInput, moduleId: string): ModuleStatus {
  if (input.exitAvailable(moduleId)) return 'exit_available';
  if (input.studied(moduleId)) return 'in_progress';
  return 'unlocked';
}

/**
 * Which of the four staged CTAs a rung card shows [D22], in the order the decision is actually made
 * (PRD §8 F1, PRD-design §6.2):
 *
 *   1. `pending`   — the module is listed but not authored: a note only, no action to offer.
 *   2. `fresh`     — not studied: "Start with the module".
 *   3. `exit_ready` — production complete: "Exit ritual — open".
 *   4. `studied`   — otherwise: Practice primary, "revisit the module" as a ghost link.
 *
 * `pending` comes first because content is the precondition for the other three: a rung with no
 * module cannot be read, practised, or exited, whatever the flags say. A module the ladder does not
 * list reads as `pending` for the same reason.
 *
 * Stages **guide, never gate** (Invariant: phases guide) — this is the card's copy, not a lock. The
 * Practice tab stays reachable at every stage.
 */
export function rungStage(input: ProgressionInput, moduleId: string): RungStage {
  if (!hasContent(input, moduleId)) return 'pending';
  if (!input.studied(moduleId)) return 'fresh';
  if (input.exitAvailable(moduleId)) return 'exit_ready';
  return 'studied';
}

/** Whether a module's file shipped in this build — false for an id the ladder does not list. */
function hasContent(input: ProgressionInput, moduleId: string): boolean {
  for (const plan of input.levels) {
    if (plan.hasContent[moduleId] !== undefined) return plan.hasContent[moduleId] === true;
  }
  return false;
}
