/**
 * The ladder's id grammar at five levels (docs/48-five-level-ladder-plan.md §2).
 *
 * Four places spell it — the schema's three id patterns, `parseModuleId` in `tools/validate.ts`
 * and in `tools/content-build.ts`, and `priorModuleId` in `tools/generate-prompt.ts` — and until
 * 2026-09-07 every one of them said `L[1-3]`. The last was the dangerous one: it did not error on
 * `L4-M1`, it answered `null`, which the prompt CLI reads as "the course's first module" and
 * renders with no allowed-vocabulary section at all. So the grammar is pinned at both ends here,
 * against the real validator on a real module re-numbered, and against the two helpers whose
 * answers change with it.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { moduleRanges } from './content-build.ts';
import { priorModuleId } from './generate-prompt.ts';
import { validateModule } from './validate.ts';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

interface Identified {
  id: string;
}

/**
 * hi-mr L1-M1 — a shipped, fully enriched module — re-numbered to `moduleId`, every sentence and
 * pool id following. Everything else is left exactly as it ships, so the only thing under test is
 * whether the grammar admits the level.
 */
function renumbered(moduleId: string): Record<string, unknown> {
  const file = path.join(REPO_ROOT, 'content', 'hi-mr', 'modules', 'L1-M1.json');
  const module = JSON.parse(readFileSync(file, 'utf8')) as Record<string, unknown> & {
    sentences: Identified[];
    comprehensionPool: Identified[];
  };
  module.id = moduleId;
  module.sentences.forEach((sentence, i) => {
    sentence.id = `${moduleId}-S${String(i + 1).padStart(2, '0')}`;
  });
  module.comprehensionPool.forEach((item, i) => {
    item.id = `${moduleId}-C${String(i + 1).padStart(2, '0')}`;
  });
  return module;
}

describe('the ladder id grammar runs L1–L5 (docs/48)', () => {
  it.each(['L1-M1', 'L3-M10', 'L4-M1', 'L5-M10'])('accepts %s', (moduleId) => {
    const result = validateModule(renumbered(moduleId), `${moduleId}.json`);
    expect(result.issues).toEqual([]);
    expect(result.ok).toBe(true);
  });

  it.each(['L0-M1', 'L6-M1', 'L4-M0', 'L4-M11', 'L4M1'])('rejects %s', (moduleId) => {
    const result = validateModule(renumbered(moduleId), `${moduleId}.json`);
    expect(result.ok).toBe(false);
    expect(result.issues.map((issue) => issue.path)).toContain('/id');
  });
});

describe('priorModuleId crosses every level boundary', () => {
  it('feeds each first module the index through the level below', () => {
    expect(priorModuleId('L2-M1')).toBe('L1-M10');
    expect(priorModuleId('L3-M1')).toBe('L2-M10');
    expect(priorModuleId('L4-M1')).toBe('L3-M10');
    expect(priorModuleId('L5-M1')).toBe('L4-M10');
  });

  it('walks within a level, at the top of the ladder included', () => {
    expect(priorModuleId('L4-M2')).toBe('L4-M1');
    expect(priorModuleId('L5-M10')).toBe('L5-M9');
  });

  it("is null only for a course's first module and for an id off the grid", () => {
    expect(priorModuleId('L1-M1')).toBeNull();
    expect(priorModuleId('L6-M1')).toBeNull();
    expect(priorModuleId('L4-M11')).toBeNull();
  });
});

describe('the build reports L4 and L5 runs like any other level', () => {
  it('collapses a run across the L3/L4 seam into two ranges, not three ids', () => {
    // Before the widening `L4-M1` and `L4-M2` parsed as nothing and each printed alone.
    expect(moduleRanges(['L3-M9', 'L3-M10', 'L4-M1', 'L4-M2'])).toBe('L3-M9..M10, L4-M1..M2');
    expect(moduleRanges(['L5-M1', 'L5-M2', 'L5-M3'])).toBe('L5-M1..M3');
  });
});
