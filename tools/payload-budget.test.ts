/**
 * The payload budget gate (#113) — `tools/payload-budget.ts`.
 *
 * The gate's arithmetic and its one-line contract are what these tests hold still: which files a
 * budget meters, the ≤ comparison at the boundary, and the summary line's shape — `verify.sh`
 * prints it into the run summary, and a human reads it the way they read `SMOKE 14/14 ok`. The
 * walk runs against a temp dir standing in for `dist/`; nothing here builds the app.
 */
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { BUDGETS, evaluate, formatResult, walkDist, type Budget } from './payload-budget.ts';

const FONTS: Budget = BUDGETS.find((budget) => budget.id === 'fonts')!;

const sandboxes: string[] = [];
afterAll(() => {
  for (const dir of sandboxes) rmSync(dir, { recursive: true, force: true });
});

function fakeDist(files: Record<string, number>): string {
  const dir = mkdtempSync(path.join(tmpdir(), 'rung-budget-'));
  sandboxes.push(dir);
  for (const [file, bytes] of Object.entries(files)) {
    mkdirSync(path.join(dir, path.dirname(file)), { recursive: true });
    writeFileSync(path.join(dir, file), Buffer.alloc(bytes));
  }
  return dir;
}

describe('the fonts budget', () => {
  it("is #113's number: 150 KiB over everything woff2, wherever it sits in dist", () => {
    expect(FONTS.limitBytes).toBe(150 * 1024);
    expect(FONTS.matches('assets/mukta-devanagari-400-BX2xmIGb.woff2')).toBe(true);
    expect(FONTS.matches('fonts/deep/nested.woff2')).toBe(true);
    expect(FONTS.matches('assets/index-abc123.js')).toBe(false);
    expect(FONTS.matches('assets/index-abc123.css')).toBe(false);
  });
});

describe('the walk and the arithmetic', () => {
  it('sums exactly the matching files, recursively', () => {
    const dist = fakeDist({
      'assets/a.woff2': 1000,
      'assets/deep/b.woff2': 500,
      'assets/index.js': 90_000,
      'content/hi-mr/levels.json': 4000,
    });

    const result = evaluate(FONTS, walkDist(dist));

    expect(result.files.map((file) => file.path)).toEqual([
      'assets/a.woff2',
      'assets/deep/b.woff2',
    ]);
    expect(result.totalBytes).toBe(1500);
    expect(result.ok).toBe(true);
  });

  it('passes at exactly the limit and fails one byte over — a budget is a ceiling, not a target', () => {
    const at = evaluate(FONTS, [{ path: 'a.woff2', bytes: FONTS.limitBytes }]);
    const over = evaluate(FONTS, [{ path: 'a.woff2', bytes: FONTS.limitBytes + 1 }]);

    expect(at.ok).toBe(true);
    expect(over.ok).toBe(false);
  });

  it('treats an empty match as 0 bytes and green — a budget over nothing cannot fail', () => {
    const result = evaluate(FONTS, [{ path: 'assets/index.js', bytes: 1 }]);

    expect(result.totalBytes).toBe(0);
    expect(result.ok).toBe(true);
  });
});

describe('the one-line contract', () => {
  it('reads like the harness: id, total, limit, verdict, file count', () => {
    const result = evaluate(FONTS, [
      { path: 'a.woff2', bytes: 100_000 },
      { path: 'b.woff2', bytes: 1480 },
    ]);

    expect(formatResult(result)).toBe('BUDGET fonts 99.1 KiB ≤ 150.0 KiB ok — 2 files');
  });

  it('says OVER, loudly, when blown', () => {
    const result = evaluate(FONTS, [{ path: 'a.woff2', bytes: 200 * 1024 }]);

    expect(formatResult(result)).toBe('BUDGET fonts 200.0 KiB > 150.0 KiB OVER — 1 file');
  });
});
