/**
 * Delta word indexes (#424) — the equality that makes the change safe.
 *
 * The build used to emit each module's index CUMULATIVE through itself, which is quadratic in the
 * ladder: hi-mr's thirty modules were 1.2 MB raw, and nine courses at fifty modules would have been
 * ~2.9 MB each, every byte warmed for offline. `toDeltaIndexes` emits each module's own additions
 * instead, and `loadIndex` folds the ladder back at read time.
 *
 * The whole change rests on one claim: **fold(deltas) === the cumulative index, exactly.** Not
 * approximately, and not just in size — the same keys pointing at the same word rows, because an
 * entry names where the learner MET the word and first-occurrence-wins is what makes that true.
 * This file checks that claim against every shipped module of every course, which is the only test
 * that could catch a fold that silently drops or re-owns a surface.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { buildWordIndex, toDeltaIndexes, type WordIndexFile } from './content-build.ts';
import type { Module } from './validate.ts';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = path.join(REPO_ROOT, 'content');

function courseIds(): string[] {
  const manifest = JSON.parse(readFileSync(path.join(CONTENT, 'courses.json'), 'utf8')) as {
    id: string;
  }[];
  return manifest.map((row) => row.id);
}

/**
 * A course with no `modules/` folder at all is a skeleton the pipeline already tolerates (#267 on
 * hi-en, #326 on en-fr, #356 on en-de, #374 on en-ko, #606 on en-sa): the manifest row and the
 * ladder land first, the folder arrives with the first authored rung. An empty ladder folds to an
 * empty index, which is trivially equal to itself — the claim below is not weakened by it.
 */
function modulesOf(courseId: string): { id: string; module: Module }[] {
  const dir = path.join(CONTENT, courseId, 'modules');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((file) => file.endsWith('.json'))
    .map((file) => file.replace(/\.json$/, ''))
    .sort((a, b) => a.localeCompare(b, 'en', { numeric: true }))
    .map((id) => ({
      id,
      module: JSON.parse(readFileSync(path.join(dir, `${id}.json`), 'utf8')) as Module,
    }));
}

/**
 * The reader's half, written out rather than imported: `loadIndex` folds over the network and this
 * folds over a map, but the RULE has to be the same one — earliest first, never overwrite. Writing
 * it twice is the point, the way a round-trip test writes the inverse by hand.
 */
function fold(
  deltas: readonly WordIndexFile[],
  through: readonly string[],
): WordIndexFile['surfaces'] {
  const byId = new Map(deltas.map((delta) => [delta.moduleId, delta]));
  const surfaces: WordIndexFile['surfaces'] = {};
  for (const id of through) {
    const delta = byId.get(id);
    if (delta === undefined) throw new Error(`no delta emitted for ${id}`);
    for (const [surface, entry] of Object.entries(delta.surfaces)) {
      if (!Object.hasOwn(surfaces, surface)) surfaces[surface] = entry;
    }
  }
  return surfaces;
}

describe('delta indexes fold back to the cumulative form (#424)', () => {
  it.each(courseIds())('%s: every module folds to exactly its cumulative index', (courseId) => {
    const modules = modulesOf(courseId);
    const cumulative = buildWordIndex(courseId, modules);
    const deltas = toDeltaIndexes(cumulative);

    for (const [moduleId, whole] of cumulative) {
      const folded = fold(deltas, whole.cumulativeThrough);
      expect(folded, `${courseId}/${moduleId}`).toEqual(whole.surfaces);
      // The count travels on the delta so a reader can check its own fold; if it ever disagreed,
      // `loadIndex` would throw instead of resolving half a ladder.
      expect(Object.keys(folded).length, `${courseId}/${moduleId} count`).toBe(whole.surfaceCount);
    }
  });

  it('marks every emitted file, and keeps the folded totals on it', () => {
    const modules = modulesOf('hi-mr');
    const cumulative = buildWordIndex('hi-mr', modules);
    const deltas = toDeltaIndexes(cumulative);

    for (const delta of deltas) {
      const whole = cumulative.get(delta.moduleId);
      expect(delta.delta).toBe(true);
      expect(delta.surfaceCount).toBe(whole?.surfaceCount);
      expect(delta.maxSpan).toBe(whole?.maxSpan);
      expect(delta.cumulativeThrough).toEqual(whole?.cumulativeThrough);
    }
  });

  /**
   * The size claim, held where it can rot: hi-mr is the longest ladder in the repo, and if a future
   * change quietly re-cumulated the files this ratio is what would move.
   */
  it('shrinks hi-mr by more than a factor of five', () => {
    const cumulative = buildWordIndex('hi-mr', modulesOf('hi-mr'));
    const deltas = toDeltaIndexes(cumulative);
    const size = (files: readonly WordIndexFile[]): number =>
      files.reduce((total, file) => total + JSON.stringify(file).length, 0);

    expect(size(deltas) * 5).toBeLessThan(size([...cumulative.values()]));
    // A delta set holds each surface exactly once, whatever the ladder's length. The total to
    // compare against is the LAST module's running count, and "last" is read off the built index
    // rather than named: this line said `L3-M10` and went red the day L4-M1 landed, which is a
    // fact about the ladder growing and not about the fold.
    const entries = deltas.reduce((total, delta) => total + Object.keys(delta.surfaces).length, 0);
    const last = [...cumulative.values()].at(-1);
    expect(entries).toBe(last?.surfaceCount);
  });
});
