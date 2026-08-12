/**
 * The payload budget gate (#113, #114) — `tools/payload-budget.ts`.
 *
 * The gate's arithmetic and its one-line contract are what these tests hold still: which files a
 * budget meters, WHICH bytes it meters (disk for fonts, gzip transfer for js/total), the ≤
 * comparison at the boundary, and the summary line's shape — `verify.sh` prints it into the run
 * summary, and a human reads it the way they read `SMOKE 14/14 ok`. The walk runs against a temp
 * dir standing in for `dist/`; nothing here builds the app.
 */
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import { afterAll, describe, expect, it } from 'vitest';
import { BUDGETS, evaluate, formatResult, walkDist, type Budget } from './payload-budget.ts';

const FONTS: Budget = BUDGETS.find((budget) => budget.id === 'fonts')!;
const JS: Budget = BUDGETS.find((budget) => budget.id === 'js')!;
const TOTAL: Budget = BUDGETS.find((budget) => budget.id === 'total')!;
const SPLASH: Budget = BUDGETS.find((budget) => budget.id === 'splash')!;

/** Synthetic shipped file — gzip defaults smaller than raw, the way real text assets behave. */
const shipped = (p: string, bytes: number, gzipBytes = Math.ceil(bytes / 3)) => ({
  path: p,
  bytes,
  gzipBytes,
});

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
  it('is 380 KiB of DISK bytes over everything woff2, wherever it sits in dist', () => {
    // #113 set 150 KiB against a learner build with no Devanagari in it; hi-mr L1 shipping
    // (#110/#111) put 361.2 KiB of subsets in dist and perf-notes §4 raised the row to 380.
    expect(FONTS.limitBytes).toBe(380 * 1024);
    expect(FONTS.measure).toBe('raw');
    expect(FONTS.matches('assets/mukta-devanagari-400-BX2xmIGb.woff2')).toBe(true);
    expect(FONTS.matches('fonts/deep/nested.woff2')).toBe(true);
    expect(FONTS.matches('assets/index-abc123.js')).toBe(false);
    expect(FONTS.matches('assets/index-abc123.css')).toBe(false);
  });
});

describe("the js budget (#114's 200 KB gzip)", () => {
  it('meters gzip transfer bytes over every shipped .js — the bundle AND the workbox runtime', () => {
    expect(JS.limitBytes).toBe(200 * 1024);
    expect(JS.measure).toBe('gzip');
    expect(JS.matches('assets/index-abc123.js')).toBe(true);
    expect(JS.matches('sw.js')).toBe(true);
    expect(JS.matches('workbox-9c191d2f.js')).toBe(true);
    expect(JS.matches('assets/index-abc123.css')).toBe(false);
    expect(JS.matches('assets/mukta-latin-400.woff2')).toBe(false);
  });

  it('sums gzipBytes, not disk bytes', () => {
    const result = evaluate(JS, [
      shipped('assets/index.js', 275_000, 87_000),
      shipped('sw.js', 2_138, 1_061),
      shipped('assets/index.css', 55_000, 9_000), // not js — must not count
    ]);

    expect(result.totalBytes).toBe(88_061);
    expect(result.ok).toBe(true);
  });
});

describe('the total budget (#114: everything a first visit transfers — the SW precaches all of dist/)', () => {
  it('meters every shipped file, as gzip transfer, under 580 KiB', () => {
    // 400 KiB until hi-mr L1 shipped; 580 KiB after (548.1 KiB measured, perf-notes §4).
    expect(TOTAL.limitBytes).toBe(580 * 1024);
    expect(TOTAL.measure).toBe('gzip');
    expect(TOTAL.matches('anything/at/all.xyz')).toBe(true);
  });

  it('carves out the iOS splash set — never precached, never fetched by the app (#115)', () => {
    expect(TOTAL.matches('icons/splash/splash-1170x2532.png')).toBe(false);
    // …but the icons themselves ARE first-visit payload: the precache takes `icons/*.png`.
    expect(TOTAL.matches('icons/icon-192.png')).toBe(true);
  });
});

describe("the splash budget (#115's iOS startup images)", () => {
  it('meters exactly the carve-out, as raw bytes — PNG is already compressed', () => {
    expect(SPLASH.limitBytes).toBe(100 * 1024);
    expect(SPLASH.measure).toBe('raw');
    expect(SPLASH.matches('icons/splash/splash-750x1334.png')).toBe(true);
    expect(SPLASH.matches('icons/icon-192.png')).toBe(false);
    expect(SPLASH.matches('assets/index-abc123.js')).toBe(false);
  });

  it('splits dist/ with total, losing nothing: every file meters under exactly one of the two', () => {
    for (const file of ['icons/splash/splash-828x1792.png', 'icons/maskable-512.png', 'sw.js']) {
      expect(TOTAL.matches(file)).not.toBe(SPLASH.matches(file));
    }
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

  it('the walk carries real gzip sizes, so gzip budgets read transfer bytes off disk', () => {
    const dist = fakeDist({ 'assets/index.js': 90_000 });

    const [file] = walkDist(dist);

    expect(file!.gzipBytes).toBe(gzipSync(Buffer.alloc(90_000)).length);
  });

  it('passes at exactly the limit and fails one byte over — a budget is a ceiling, not a target', () => {
    const at = evaluate(FONTS, [shipped('a.woff2', FONTS.limitBytes)]);
    const over = evaluate(FONTS, [shipped('a.woff2', FONTS.limitBytes + 1)]);

    expect(at.ok).toBe(true);
    expect(over.ok).toBe(false);
  });

  it('treats an empty match as 0 bytes and green — a budget over nothing cannot fail', () => {
    const result = evaluate(FONTS, [shipped('assets/index.js', 1)]);

    expect(result.totalBytes).toBe(0);
    expect(result.ok).toBe(true);
  });
});

describe('the one-line contract', () => {
  it('reads like the harness: id, total, limit, verdict, file count', () => {
    const result = evaluate(FONTS, [shipped('a.woff2', 100_000), shipped('b.woff2', 1480)]);

    expect(formatResult(result)).toBe('BUDGET fonts 99.1 KiB ≤ 380.0 KiB ok — 2 files');
  });

  it('says gzip when that is what it metered, so 92.9 KiB is never mistaken for disk bytes', () => {
    const result = evaluate(JS, [shipped('assets/index.js', 275_000, 95_129)]);

    expect(formatResult(result)).toBe('BUDGET js 92.9 KiB gzip ≤ 200.0 KiB ok — 1 file');
  });

  it('says OVER, loudly, when blown', () => {
    const result = evaluate(FONTS, [shipped('a.woff2', 400 * 1024)]);

    expect(formatResult(result)).toBe('BUDGET fonts 400.0 KiB > 380.0 KiB OVER — 1 file');
  });
});
