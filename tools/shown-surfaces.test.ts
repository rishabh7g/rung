/**
 * The shown-surface ratchet (#491).
 *
 * `checkComprehensionPool` fails a build when a pool token does not resolve. Nothing checked what
 * a module SHOWS outside the pool, so a `variations[].display` could carry a word no row owns —
 * and every course has some: 133 across the nine shipped ladders when this file was written. Some
 * are proper nouns riding unindexed by #61 (`प्रिया`, `mumbai`, `thomas`), some are forward
 * references (a word the ladder teaches two rungs later), and some are simply never taught
 * (`please`, `bus`, `guten morgen`). Sorting them out is a content sweep across verified content.
 *
 * Until that sweep runs, this file holds the line: the count per course may FALL freely, and may
 * not rise. A new module whose variation shows an untaught surface fails here, which is the whole
 * point — the 320 modules still to author are the ones this protects.
 *
 * Lower a baseline in the same commit that fixes the content. Never raise one.
 */
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { buildWordIndex, checkShownSurfaces } from './content-build.ts';
import type { Module } from './validate.ts';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = path.join(REPO_ROOT, 'content');

/**
 * Findings that existed when the rule was written. A course absent from this map must have none:
 * that is what makes the ratchet bite for a course authored from here on.
 */
const BASELINE: Readonly<Record<string, number>> = {
  'hi-mr': 7,
  'en-es': 10,
  'en-ar': 6,
  'hi-en': 30,
  'en-ru': 20,
  'en-it': 17,
  'en-fr': 20,
  'en-de': 11,
  'en-ko': 12,
};

function ladderOrder(a: string, b: string): number {
  return a.localeCompare(b, 'en', { numeric: true });
}

/**
 * Every module of one course, in ladder order — the sequence the cumulative index is built over.
 *
 * A course whose `modules/` folder does not exist yet is a skeleton the pipeline already tolerates
 * (#267 on hi-en, #326 on en-fr, #356 on en-de, #374 on en-ko, #606 on en-sa). It shows nothing, so
 * it finds nothing, and the ratchet holds it at the implicit baseline of 0 that every course absent
 * from the map below is held at — which is exactly the line the first authoring wave has to meet.
 */
function modulesOf(courseId: string): { id: string; module: Module }[] {
  const dir = path.join(CONTENT, courseId, 'modules');
  if (!existsSync(dir)) return [];
  return readdirSync(dir)
    .filter((file) => file.endsWith('.json'))
    .map((file) => file.replace(/\.json$/, ''))
    .sort(ladderOrder)
    .map((id) => ({
      id,
      module: JSON.parse(readFileSync(path.join(dir, `${id}.json`), 'utf8')) as Module,
    }));
}

function courseIds(): string[] {
  const manifest = JSON.parse(readFileSync(path.join(CONTENT, 'courses.json'), 'utf8')) as {
    id: string;
  }[];
  return manifest.map((row) => row.id);
}

function findingsFor(courseId: string): ReturnType<typeof checkShownSurfaces> {
  const modules = modulesOf(courseId);
  const indexes = buildWordIndex(courseId, modules);
  return modules.flatMap((entry) => {
    const index = indexes.get(entry.id);
    if (index === undefined) throw new Error(`${courseId}: no index for ${entry.id}`);
    return checkShownSurfaces(entry.module, index);
  });
}

describe('shown surfaces (#491)', () => {
  it.each(courseIds())('%s shows no more untaught surfaces than its baseline', (courseId) => {
    const distinct = new Set(findingsFor(courseId).map((finding) => finding.surface));
    const baseline = BASELINE[courseId] ?? 0;
    // The message carries the surfaces, because the number alone tells an author nothing.
    expect(
      distinct.size,
      `${courseId}: ${[...distinct].join(' · ')} (baseline ${baseline})`,
    ).toBeLessThanOrEqual(baseline);
  });

  it('has no baseline for a course that no longer exists', () => {
    expect(Object.keys(BASELINE).filter((id) => !courseIds().includes(id))).toEqual([]);
  });

  /** Both directions of the rule itself, on a synthetic module rather than shipped content. */
  it('flags a variation that shows an untaught surface, and clears it when a row owns it', () => {
    const taught: Module = JSON.parse(
      readFileSync(path.join(CONTENT, 'hi-mr', 'modules', 'L1-M1.json'), 'utf8'),
    ) as Module;
    const first = taught.sentences[0];
    if (first === undefined) throw new Error('hi-mr L1-M1 has no sentences');
    first.variations = [{ display: 'झकास वाक्य', cue: 'ज़बरदस्त वाक्य', changed: 'test' }];

    const untaught = buildWordIndex('hi-mr', [{ id: taught.id, module: taught }]);
    const before = checkShownSurfaces(taught, untaught.get(taught.id) ?? never());
    expect(before.map((finding) => finding.surface)).toContain('झकास');
    expect(before[0]?.field).toBe('variation');

    const word = first.deconstruction.words[0];
    if (word === undefined) throw new Error('hi-mr L1-M1-S01 has no words');
    word.forms = [...word.forms, 'झकास', 'वाक्य'];
    const owned = buildWordIndex('hi-mr', [{ id: taught.id, module: taught }]);
    const after = checkShownSurfaces(taught, owned.get(taught.id) ?? never());
    // The module's own pre-existing findings stay (they are why the baseline above is not zero);
    // the point is that the two surfaces a row now owns have gone.
    expect(after.map((finding) => finding.surface)).not.toContain('झकास');
    expect(after.map((finding) => finding.surface)).not.toContain('वाक्य');
    expect(after.length).toBeLessThan(before.length);
  });
});

function never(): never {
  throw new Error('no index built');
}
