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
 * tested as a table of inputs, and it is why the one live fact this engine needs arrives as a
 * **predicate the caller injects**: `studied(id)`, the per-course `studied` flag, set on first
 * module open (state v6, #82).
 *
 * There was a second, `exitAvailable(id)` — every sentence of the rung self-marked got-it, which
 * was the whole of the gate in front of the exit ritual. The ritual is gone (a rung is climbed by
 * finishing a Practice session, on its last card), so the states and stages that named it are gone
 * with it: there is no `exit_available` status and no `exit_ready` CTA, because there is nothing
 * left for a learner to open. The counters themselves are still written and still drawn — they are
 * a record of the rung rather than a door (`src/engine/production.ts`).
 *
 * **The single unlock path is not here.** This module can say which rung is current; only
 * `passRung` in `src/state/store.ts` can make one passed (Invariant 1), and it asks this module
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
 * Module states, `locked` → `passed` (PRD §8 F1). Only the current rung is ever one of the two
 * middle states; everything ahead of it is `locked`, and `passed` is the only one read from state
 * rather than derived from position.
 *
 * There was a third middle state, `exit_available` — the rung worked through, its exit ritual
 * open. Nothing opens now: the pass lands on the last card of a Practice session, so the moment a
 * rung would have entered that state it is either still `in_progress` or already `passed`.
 */
export type ModuleStatus = 'locked' | 'unlocked' | 'in_progress' | 'passed';

/** The current rung card's three stages [D22] — one clear action each (PRD-design §6.2). */
export type RungStage = 'fresh' | 'studied' | 'pending';

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
 * rung is `unlocked` → `in_progress` (studied); everything else — later in this level, in a level
 * above, in a sealed level — is `locked`.
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

/** The two states only the current rung can be in. */
function currentRungStatus(input: ProgressionInput, moduleId: string): ModuleStatus {
  return input.studied(moduleId) ? 'in_progress' : 'unlocked';
}

/**
 * Which of the three staged CTAs a rung card shows [D22], in the order the decision is actually
 * made (PRD §8 F1, PRD-design §6.2):
 *
 *   1. `pending` — the module is listed but not authored: a note only, no action to offer.
 *   2. `fresh`   — not studied: "Start with the module".
 *   3. `studied` — otherwise: Practice primary, "revisit the module" as a ghost link.
 *
 * `pending` comes first because content is the precondition for the other two: a rung with no
 * module cannot be read or practised, whatever the flags say. A module the ladder does not list
 * reads as `pending` for the same reason.
 *
 * There was a fourth, `exit_ready` — production complete, "Exit ritual — open" as the primary. The
 * ritual is gone and Practice is the whole of the climb, so a worked-through rung offers exactly
 * what a studied one does: another session, which is the thing that passes it.
 *
 * Stages **guide, never gate** (Invariant: phases guide) — this is the card's copy, not a lock. The
 * Practice tab stays reachable at every stage.
 */
export function rungStage(input: ProgressionInput, moduleId: string): RungStage {
  if (!hasContent(input, moduleId)) return 'pending';
  if (!input.studied(moduleId)) return 'fresh';
  return 'studied';
}

/** Whether a module's file shipped in this build — false for an id the ladder does not list. */
function hasContent(input: ProgressionInput, moduleId: string): boolean {
  for (const plan of input.levels) {
    if (plan.hasContent[moduleId] !== undefined) return plan.hasContent[moduleId] === true;
  }
  return false;
}
