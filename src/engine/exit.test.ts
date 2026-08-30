import { describe, expect, it } from 'vitest';
import { exitAvailable, started, MARKS_PER_SENTENCE, type ProductionCounts } from './exit.ts';

/**
 * `exit_available` = every sentence self-marked got-it ≥ 1× (PRD §8 F1, #95; the threshold moved
 * from 2 to 1 on #349, with the Produce phase that used to feed it).
 *
 * The cases are a table over the two numbers that decide it: how many sentences the module has, and
 * what each one's counter says. The product's own shape — a module of ten — is the case that
 * matters most, so it gets its own describe: nine of ten marked is the difference between a rule
 * about every sentence and a rule about most of them.
 */

/** A module's sentence ids, as authored: `L1-M1-S01` … . */
function sentences(count = 10, moduleId = 'L1-M1'): string[] {
  return Array.from(
    { length: count },
    (_, index) => `${moduleId}-S${String(index + 1).padStart(2, '0')}`,
  );
}

/** Counters with every listed sentence at `times`. */
function allAt(times: number, ids = sentences()): ProductionCounts {
  return Object.fromEntries(ids.map((sentenceId) => [sentenceId, times]));
}

describe('the number the ritual asks for', () => {
  it('is one, and it lives with the rule', () => {
    expect(MARKS_PER_SENTENCE).toBe(1);
  });
});

/* ------------------------------------------------------------- exitAvailable */

describe('exitAvailable', () => {
  it.each([
    [0, false],
    [1, true],
    [2, true],
    [3, true],
  ])('reads a sentence at %i got-its as %s', (times, expected) => {
    const ids = sentences(1);

    expect(exitAvailable(ids, allAt(times, ids))).toBe(expected);
  });

  it('counts a sentence the map has never seen as zero — an absent key is no got-its', () => {
    expect(exitAvailable(sentences(2), { 'L1-M1-S01': 1 })).toBe(false);
    expect(exitAvailable(sentences(2), {})).toBe(false);
  });

  it('opens once every sentence of the module is marked', () => {
    expect(exitAvailable(sentences(), allAt(1))).toBe(true);
  });

  /**
   * A learner who was mid-rung when #349 landed keeps every one of their marks: the counters are
   * the same numbers, only the gate moved, and a sentence at 2× satisfies a gate of 1 by
   * arithmetic rather than by a migration (the ticket's "no data reset").
   */
  it('opens on counters written under the old two-per-sentence gate', () => {
    expect(exitAvailable(sentences(), allAt(2))).toBe(true);
  });

  it('stays shut at nine of ten — the rule is every sentence, not most of them', () => {
    const ids = sentences();

    // The tenth sentence unmarked holds the whole rung…
    expect(exitAvailable(ids, { ...allAt(1), [ids[9] as string]: 0 })).toBe(false);
    // …and the one that is short is not special: any single sentence does it.
    expect(exitAvailable(ids, { ...allAt(1), [ids[0] as string]: 0 })).toBe(false);
    expect(exitAvailable(ids, { ...allAt(1), [ids[4] as string]: 0 })).toBe(false);
  });

  it('is not fooled by the rest of the course — a rung answers on its own ten sentences', () => {
    const ids = sentences(10, 'L1-M2');
    const production = { ...allAt(1, ids), ...allAt(0, sentences(10, 'L1-M1')) };

    expect(exitAvailable(ids, production)).toBe(true);
  });

  it('refuses an empty list: a module with no sentences is not a module read through', () => {
    expect(exitAvailable([], allAt(1))).toBe(false);
    expect(exitAvailable([], {})).toBe(false);
  });

  it('reads a damaged counter as zero rather than as progress', () => {
    const ids = sentences(1);
    const damaged = { [ids[0] as string]: 'two' } as unknown as ProductionCounts;

    expect(exitAvailable(ids, damaged)).toBe(false);
    expect(exitAvailable(ids, { [ids[0] as string]: -5 })).toBe(false);
  });

  it('answers off the map alone — nothing inherited from Object.prototype counts', () => {
    expect(exitAvailable(['constructor', 'toString'], {})).toBe(false);
  });

  it('changes nothing it was given: the same input answers the same way twice', () => {
    const ids = sentences(3);
    const production = allAt(1, ids);
    const before = JSON.stringify(production);

    expect(exitAvailable(ids, production)).toBe(true);
    expect(exitAvailable(ids, production)).toBe(true);
    expect(JSON.stringify(production)).toBe(before);
    expect(ids).toEqual(sentences(3));
  });
});

/* -------------------------------------------------------------------- started */

describe('started', () => {
  it.each([
    [0, false],
    [1, true],
    [2, true],
  ])('reads a sentence at %i got-its as started: %s', (times, expected) => {
    const ids = sentences(1);

    expect(started(ids, allAt(times, ids))).toBe(expected);
  });

  it('is true on the first got-it of any one sentence', () => {
    const ids = sentences();

    expect(started(ids, { [ids[7] as string]: 1 })).toBe(true);
  });

  it('is false for a module nobody has marked, and for a module with no sentences', () => {
    expect(started(sentences(), {})).toBe(false);
    expect(started(sentences(), allAt(0))).toBe(false);
    expect(started([], allAt(1))).toBe(false);
  });

  it('ignores every counter outside its own module', () => {
    expect(started(sentences(10, 'L1-M2'), allAt(1, sentences(10, 'L1-M1')))).toBe(false);
  });
});

/* ------------------------------------------------------------- the two together */

describe('a rung, read through', () => {
  /**
   * They came apart under the old gate — one sentence at 1× was started and not available — and at
   * a threshold of 1 the daylight between them is the SOME/EVERY, not the number: a rung with one
   * of its three sentences marked is started and shut, and only marking the rest opens it.
   */
  it('is started before it is available, and available implies started', () => {
    const ids = sentences(3);
    const oneMarked = { [ids[0] as string]: 1 };

    expect([started(ids, {}), exitAvailable(ids, {})]).toEqual([false, false]);
    expect([started(ids, oneMarked), exitAvailable(ids, oneMarked)]).toEqual([true, false]);
    expect([started(ids, allAt(1, ids)), exitAvailable(ids, allAt(1, ids))]).toEqual([true, true]);
  });
});
