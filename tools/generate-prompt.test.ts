/**
 * The prompt's vocabulary section, against the regression delta indexes introduced (#424, #471).
 *
 * `toDeltaIndexes` made each emitted index file carry only what its module is the FIRST to teach,
 * while `surfaceCount` stayed the folded cumulative number. Every reader had to start folding —
 * and one did not. `generate-prompt.ts` kept reading `Object.keys(index.surfaces)`, so the header
 * promised "the learner has met exactly these N surfaces (L1-M1, …, L2-M10)" and then listed one
 * module's delta underneath it.
 *
 * The en-es L3-M1 prompt offered FIFTEEN words — `al final · algo · comimos · dije · dijo …`,
 * L2-M10's own additions — where the learner has met 477. An author who trusted the prompt would
 * have written a module out of the last module's leftovers, and nothing downstream would have
 * complained: `checkComprehensionPool` and the shown-surface ratchet both fold correctly, so the
 * result would have been valid, buildable, and a tenth of the course it should have been.
 *
 * That is why this is a unit test on the fold and not a snapshot of a rendered prompt: the defect
 * was never in the words, it was in the arithmetic behind them.
 */
import { describe, expect, it } from 'vitest';
import { foldIndex } from './generate-prompt.ts';
import type { WordIndexFile } from './content-build.ts';

/** A delta file as the build emits one: `surfaces` is this module's own additions only. */
const delta = (moduleId: string, surfaces: Record<string, string>): WordIndexFile =>
  ({
    courseId: 'test',
    moduleId,
    cumulativeThrough: [],
    surfaces: Object.fromEntries(
      Object.entries(surfaces).map(([key, taughtIn]) => [key, { taughtIn }]),
    ),
    surfaceCount: 0,
    maxSpan: 1,
  }) as unknown as WordIndexFile;

describe('foldIndex — the ladder, not the last rung (#471)', () => {
  const m1 = delta('M1', { uno: 'M1', dos: 'M1' });
  const m2 = delta('M2', { tres: 'M2' });
  const m3 = {
    ...delta('M3', { cuatro: 'M3' }),
    cumulativeThrough: ['M1', 'M2', 'M3'],
    surfaceCount: 4,
  } as WordIndexFile;
  const load = (moduleId: string): WordIndexFile => {
    if (moduleId === 'M1') return m1;
    if (moduleId === 'M2') return m2;
    throw new Error(`unexpected load of ${moduleId}`);
  };

  it('folds every module its cumulativeThrough names, not just the last', () => {
    expect(Object.keys(foldIndex(m3, load)).length).toBeGreaterThan(0);
    expect(Object.keys(foldIndex(m3, load).surfaces).sort()).toEqual([
      'cuatro',
      'dos',
      'tres',
      'uno',
    ]);
  });

  /**
   * `surfaceCount` was left cumulative by #424 precisely so a folding reader can check its own
   * work. A fold that disagrees with it has dropped a module or double-counted one.
   */
  it('folds to exactly the surfaceCount the build recorded', () => {
    expect(Object.keys(foldIndex(m3, load).surfaces)).toHaveLength(m3.surfaceCount);
  });

  /** First occurrence wins, so an earlier module keeps a key a later one also teaches. */
  it('keeps the earliest owner of a surface', () => {
    const shadowing = {
      ...delta('M3', { uno: 'M3' }),
      cumulativeThrough: ['M1', 'M2', 'M3'],
      surfaceCount: 3,
    } as WordIndexFile;
    const folded = foldIndex(shadowing, load).surfaces as unknown as Record<
      string,
      { taughtIn: string }
    >;
    expect(folded['uno']?.taughtIn).toBe('M1');
  });

  /** The one-module case the first course module hits: nothing to load, nothing lost. */
  it('is an identity on a single-module ladder', () => {
    const only = {
      ...delta('M1', { uno: 'M1' }),
      cumulativeThrough: ['M1'],
      surfaceCount: 1,
    } as WordIndexFile;
    expect(
      foldIndex(only, () => {
        throw new Error('must not load anything');
      }).surfaces,
    ).toEqual(only.surfaces);
  });
});
