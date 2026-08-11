import { describe, expect, it } from 'vitest';
import { levelsFixture } from '../test/courseContent.ts';
import {
  currentRungId,
  deriveStatuses,
  ladderFromLevels,
  levelSealed,
  rungStage,
  type LevelPlan,
  type ProgressionInput,
} from './progression.ts';

/**
 * The real ladder's shape: 3 levels × 10 rungs (PRD-design §5). `authored` says which rungs shipped
 * — everything, unless a case is about a pending rung — so a test that does not care about content
 * never has to say so.
 */
function ladder(levels = 3, rungs = 10, authored?: (moduleId: string) => boolean): LevelPlan[] {
  return Array.from({ length: levels }, (_, l) => {
    const moduleIds = Array.from({ length: rungs }, (_, m) => `L${l + 1}-M${m + 1}`);
    return {
      level: l + 1,
      moduleIds,
      hasContent: Object.fromEntries(moduleIds.map((id) => [id, authored?.(id) ?? true])),
    };
  });
}

/** A progression input over that ladder: nothing passed, nothing studied, nothing exit-ready. */
function input(overrides: Partial<ProgressionInput> = {}): ProgressionInput {
  return {
    levels: ladder(),
    passed: new Set<string>(),
    studied: () => false,
    // What a caller with no sentence list says; the real predicate is `engine/exit.ts` over the
    // course's counters, joined to the module's sentence ids in `useExitAvailable` (#95).
    exitAvailable: () => false,
    ...overrides,
  };
}

/** Every rung of a level, for "all 10 passed" cases. */
function wholeLevel(level: number, rungs = 10): string[] {
  return Array.from({ length: rungs }, (_, m) => `L${level}-M${m + 1}`);
}

/* ------------------------------------------------------------- ladderFromLevels */

describe('ladderFromLevels', () => {
  it('reads the emitted levels.json in order — position is the level number, ids stay content', () => {
    // The `Levels` the content loader hands over (#81), trimmed: L1's third rung is unauthored.
    const plans = ladderFromLevels(levelsFixture('hi-mr').levels);

    expect(plans).toEqual([
      {
        level: 1,
        moduleIds: ['L1-M1', 'L1-M2', 'L1-M3'],
        hasContent: { 'L1-M1': true, 'L1-M2': true, 'L1-M3': false },
      },
      { level: 2, moduleIds: ['L2-M1'], hasContent: { 'L2-M1': false } },
      { level: 3, moduleIds: ['L3-M1'], hasContent: { 'L3-M1': false } },
    ]);
  });

  it('keeps an unauthored rung in the list — it is a rung the seal counts', () => {
    const plans = ladderFromLevels([{ modules: [{ id: 'L1-M3', hasContent: false }] }]);

    expect(plans[0]?.moduleIds).toEqual(['L1-M3']);
  });
});

/* ------------------------------------------------------------------ fresh course */

describe('a fresh course', () => {
  it('opens on L1-M1 — unlocked and fresh, with every other rung locked', () => {
    const statuses = deriveStatuses(input());

    expect(currentRungId(input())).toBe('L1-M1');
    expect(statuses['L1-M1']).toBe('unlocked');
    expect(rungStage(input(), 'L1-M1')).toBe('fresh');
    expect(Object.values(statuses).filter((status) => status !== 'locked')).toEqual(['unlocked']);
    expect(Object.keys(statuses)).toHaveLength(30);
  });

  it('seals L2 and L3 behind L1 — the ladder is visible, the rungs are not', () => {
    expect(levelSealed(input(), 1)).toBe(false);
    expect(levelSealed(input(), 2)).toBe(true);
    expect(levelSealed(input(), 3)).toBe(true);
  });
});

/* -------------------------------------------------------------------- the seal */

describe('levelSealed', () => {
  it('opens L2 only at 10 of 10 — nine passed is still sealed', () => {
    const nine = new Set(wholeLevel(1).slice(0, 9));

    expect(levelSealed(input({ passed: nine }), 2)).toBe(true);
    expect(levelSealed(input({ passed: new Set(wholeLevel(1)) }), 2)).toBe(false);
  });

  it('cascades — L3 stays sealed until L2 is complete, whatever L1 says', () => {
    const throughL1 = input({ passed: new Set(wholeLevel(1)) });

    expect(levelSealed(throughL1, 2)).toBe(false);
    expect(levelSealed(throughL1, 3)).toBe(true);
    expect(levelSealed(input({ passed: new Set([...wholeLevel(1), ...wholeLevel(2)]) }), 3)).toBe(
      false,
    );
  });

  it('counts a rung with no content — a level cannot be climbed through an unauthored module', () => {
    // hi-mr today: L1-M1 and L1-M2 shipped, the other eight are listed and unauthored.
    const partial = input({
      levels: ladder(3, 10, (id) => id === 'L1-M1' || id === 'L1-M2'),
      passed: new Set(['L1-M1', 'L1-M2']),
    });

    expect(levelSealed(partial, 2)).toBe(true);
  });

  it('never seals the first level, and seals a level the ladder does not list', () => {
    expect(levelSealed(input(), 1)).toBe(false);
    expect(levelSealed(input(), 4)).toBe(true);
    expect(levelSealed(input({ levels: [] }), 1)).toBe(true);
  });
});

/* ------------------------------------------------------------- the current rung */

describe('currentRungId', () => {
  it('is the first non-passed rung of the level being climbed', () => {
    expect(currentRungId(input({ passed: new Set(['L1-M1', 'L1-M2']) }))).toBe('L1-M3');
  });

  it('steps into the next level the moment the previous one is complete', () => {
    expect(currentRungId(input({ passed: new Set(wholeLevel(1)) }))).toBe('L2-M1');
  });

  it('answers null when the whole ladder is passed — the quiet completion state', () => {
    const everything = new Set([...wholeLevel(1), ...wholeLevel(2), ...wholeLevel(3)]);

    expect(currentRungId(input({ passed: everything }))).toBeNull();
  });

  it('answers null for a ladder it has not been handed', () => {
    expect(currentRungId(input({ levels: [] }))).toBeNull();
  });

  it('does not skip a passed-out-of-order rung — the gap is still the current rung', () => {
    // Nothing in the app can produce this (passRitual writes the current rung only); if a hand-
    // edited document ever does, the ladder answers the gap rather than climbing past it.
    expect(currentRungId(input({ passed: new Set(['L1-M4']) }))).toBe('L1-M1');
  });
});

/* ---------------------------------------------------------------- the statuses */

describe('deriveStatuses', () => {
  it('reads passed off state and derives everything else from position', () => {
    const statuses = deriveStatuses(input({ passed: new Set(['L1-M1', 'L1-M2']) }));

    expect(statuses['L1-M1']).toBe('passed');
    expect(statuses['L1-M2']).toBe('passed');
    expect(statuses['L1-M3']).toBe('unlocked');
    expect(statuses['L1-M4']).toBe('locked');
    expect(statuses['L2-M1']).toBe('locked');
  });

  it('moves the current rung through in_progress and exit_available, and nothing else with it', () => {
    const studied = deriveStatuses(input({ studied: (id) => id === 'L1-M1' }));
    const ready = deriveStatuses(
      input({ studied: () => true, exitAvailable: (id) => id === 'L1-M1' }),
    );

    expect(studied['L1-M1']).toBe('in_progress');
    expect(studied['L1-M2']).toBe('locked');
    expect(ready['L1-M1']).toBe('exit_available');
    // Studied and exit-available say nothing about a rung that is not current: it is still locked.
    expect(ready['L1-M2']).toBe('locked');
  });

  it('locks every rung of a sealed level, however far the learner is in this one', () => {
    const statuses = deriveStatuses(input({ passed: new Set(wholeLevel(1).slice(0, 9)) }));

    expect(statuses['L1-M10']).toBe('unlocked');
    expect(wholeLevel(2).every((id) => statuses[id] === 'locked')).toBe(true);
    expect(wholeLevel(3).every((id) => statuses[id] === 'locked')).toBe(true);
  });

  it('has an entry for every listed rung and for nothing else', () => {
    const statuses = deriveStatuses(input({ levels: ladder(2, 3) }));

    expect(Object.keys(statuses)).toEqual(['L1-M1', 'L1-M2', 'L1-M3', 'L2-M1', 'L2-M2', 'L2-M3']);
  });

  it('leaves a completed ladder entirely passed, with no current rung to derive', () => {
    const everything = new Set([...wholeLevel(1), ...wholeLevel(2), ...wholeLevel(3)]);
    const statuses = deriveStatuses(input({ passed: everything }));

    expect(Object.values(statuses).every((status) => status === 'passed')).toBe(true);
  });
});

/* -------------------------------------------------------------------- [D22] */

describe('rungStage [D22]', () => {
  it('is pending when the module has no content, whatever the flags say', () => {
    const pending = input({
      levels: ladder(3, 10, (id) => id !== 'L1-M1'),
      studied: () => true,
      exitAvailable: () => true,
    });

    expect(rungStage(pending, 'L1-M1')).toBe('pending');
  });

  it('runs fresh → studied → exit_ready as the learner works the rung', () => {
    const fresh = input();
    const studied = input({ studied: (id) => id === 'L1-M1' });
    const ready = input({ studied: (id) => id === 'L1-M1', exitAvailable: (id) => id === 'L1-M1' });

    expect(rungStage(fresh, 'L1-M1')).toBe('fresh');
    expect(rungStage(studied, 'L1-M1')).toBe('studied');
    expect(rungStage(ready, 'L1-M1')).toBe('exit_ready');
  });

  it('needs the module opened first — production alone does not skip the fresh stage', () => {
    const produced = input({ exitAvailable: () => true });

    expect(rungStage(produced, 'L1-M1')).toBe('fresh');
  });

  it('answers pending for a module the ladder does not list', () => {
    expect(rungStage(input(), 'L9-M9')).toBe('pending');
  });

  it('stages any rung it is asked about — the card asks about the current one', () => {
    const mid = input({ passed: new Set(['L1-M1']), studied: (id) => id === 'L1-M2' });

    expect(rungStage(mid, 'L1-M2')).toBe('studied');
    expect(rungStage(mid, 'L1-M3')).toBe('fresh');
  });
});
