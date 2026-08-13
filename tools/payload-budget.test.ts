/**
 * The payload budget gate (#113, #114, #207) — `tools/payload-budget.ts`.
 *
 * The gate's arithmetic and its one-line contract are what these tests hold still: which files a
 * budget meters, WHICH bytes it meters (disk for splash, gzip transfer for everything a wire
 * carries), the ≤ comparison at the boundary, and the summary line's shape — `verify.sh` prints it
 * into the run summary, and a human reads it the way they read `SMOKE 14/14 ok`. The walk runs
 * against a temp dir standing in for `dist/`; nothing here builds the app.
 *
 * #207 added the load-bearing property, and it has its own describe block below: **a course's
 * bytes are its own**. Adding a course adds a row and moves nothing else — that is the whole
 * reason the catalogue-wide `fonts`/`total` rows were retired.
 */
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { gzipSync } from 'node:zlib';
import { afterAll, describe, expect, it } from 'vitest';
import {
  attribute,
  budgets,
  coursesFromManifest,
  evaluate,
  fontScript,
  formatPrecacheAudit,
  formatResult,
  precacheAudit,
  precachedUrls,
  walkDist,
  type Budget,
  type ShippedCourse,
  type ShippedFile,
} from './payload-budget.ts';

/** The three courses `content/courses.json` declares, as the emitted manifest carries them. */
const HI_MR: ShippedCourse = { id: 'hi-mr', scripts: ['devanagari'] };
const EN_ES: ShippedCourse = { id: 'en-es', scripts: [] };
const EN_AR: ShippedCourse = { id: 'en-ar', scripts: ['arabic'] };
const CATALOGUE = [HI_MR, EN_ES, EN_AR];

const row = (courses: readonly ShippedCourse[], id: string): Budget =>
  budgets(courses).find((budget) => budget.id === id)!;

/** Synthetic shipped file — gzip defaults smaller than raw, the way real text assets behave. */
const shipped = (p: string, bytes: number, gzipBytes = Math.ceil(bytes / 3)): ShippedFile => ({
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

describe('reading the shipped courses off the manifest', () => {
  it('takes the script from BOTH language tags — hi-mr renders Hindi prompts and Marathi answers', () => {
    const courses = coursesFromManifest({
      courses: [
        { id: 'hi-mr', l1Tag: 'hi', l2Tag: 'mr' },
        { id: 'en-es', l1Tag: 'en', l2Tag: 'es' },
        { id: 'en-ar', l1Tag: 'en', l2Tag: 'ar' },
      ],
    });

    expect(courses).toEqual([
      { id: 'hi-mr', scripts: ['devanagari'] }, // both tags, deduped to one subset
      { id: 'en-es', scripts: [] }, // Latin: no font subsets of its own
      { id: 'en-ar', scripts: ['arabic'] }, // romanized still ships the native line's face (#197)
    ]);
  });

  it('survives a manifest with no courses — a strict build that ships nothing is not a crash', () => {
    expect(coursesFromManifest({})).toEqual([]);
    expect(coursesFromManifest({ courses: [] })).toEqual([]);
  });
});

describe('the script a font file serves, read off its own name', () => {
  it('names the script from the `<face>-<script>-<weight>` the subsetter writes', () => {
    expect(fontScript('assets/mukta-devanagari-700-BX2xmIGb.woff2')).toBe('devanagari');
    expect(fontScript('assets/noto-naskh-arabic-arabic-400-Ab12cdEf.woff2')).toBe('arabic');
    expect(fontScript('assets/mukta-latin-400-C8sBt92T.woff2')).toBe(null);
    expect(fontScript('assets/barlow-latin-400-normal-qiz4-Cze.woff2')).toBe(null);
  });
});

describe('attribution: every shipped file has exactly one owner', () => {
  const owner = (file: string) => attribute(file, CATALOGUE);

  it('charges the shell for what every course pays: document, bundle, CSS, UI faces, metadata', () => {
    for (const file of [
      'index.html',
      'assets/index-abc123.js',
      'sw.js',
      'workbox-9c191d2f.js',
      'assets/index-abc123.css',
      'assets/barlow-latin-400-normal-qiz4-Cze.woff2',
      'manifest.webmanifest',
      'content/courses.json',
      'icons/icon-192.png',
    ]) {
      expect(owner(file), file).toEqual({ kind: 'shell' });
    }
  });

  it('charges a course for its own content and its own script subsets', () => {
    expect(owner('content/hi-mr/modules/L1-M1.json')).toEqual({ kind: 'course', ids: ['hi-mr'] });
    expect(owner('assets/mukta-devanagari-700-BX2xmIGb.woff2')).toEqual({
      kind: 'course',
      ids: ['hi-mr'],
    });
    expect(owner('assets/noto-naskh-arabic-arabic-400-Ab12cdEf.woff2')).toEqual({
      kind: 'course',
      ids: ['en-ar'],
    });
  });

  it('leaves the course faces’ `latin` subset in the shell — it is subset over every course at once', () => {
    // tools/font-subset.ts unions the repertoires, so mukta-latin-* is one shared file. Charging
    // it to each course would bill the same bytes three times over.
    expect(owner('assets/mukta-latin-600-DO1Ub2ZP.woff2')).toEqual({ kind: 'shell' });
  });

  it('charges every course that reads a script when they share one subset', () => {
    const twoDevanagari = [HI_MR, { id: 'hi-ne', scripts: ['devanagari' as const] }];

    expect(attribute('assets/mukta-devanagari-400-x.woff2', twoDevanagari)).toEqual({
      kind: 'course',
      ids: ['hi-mr', 'hi-ne'],
    });
  });

  it('falls back to the shell for a script no shipped course reads — dead weight everyone carries', () => {
    expect(attribute('assets/mukta-devanagari-400-x.woff2', [EN_ES])).toEqual({ kind: 'shell' });
  });

  it('carves out the iOS splash set, and only it (#115)', () => {
    expect(owner('icons/splash/splash-1170x2532.png')).toEqual({ kind: 'splash' });
    expect(owner('icons/maskable-512.png')).toEqual({ kind: 'shell' });
  });

  it('owns nothing it was never told about — a new asset class is unmetered, not invisible', () => {
    expect(owner('media/lesson.mp3')).toEqual({ kind: 'unmetered' });
    expect(owner('assets/heavy.wasm')).toEqual({ kind: 'unmetered' });
    // A content folder for a course the manifest never listed is a stale artefact, not payload.
    expect(owner('content/de-fr/levels.json')).toEqual({ kind: 'unmetered' });
  });
});

describe("the js budget (#114's 200 KB gzip, unchanged by #207)", () => {
  const JS = row(CATALOGUE, 'js');

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

describe('the first-paint budget (#207: what the 2 s gate is actually about)', () => {
  const FIRST_PAINT = row(CATALOGUE, 'first-paint');

  it('meters the render path: document, bundle, CSS, the Barlow UI faces, the metadata', () => {
    expect(FIRST_PAINT.limitBytes).toBe(185 * 1024);
    expect(FIRST_PAINT.measure).toBe('gzip');
    for (const file of [
      'index.html',
      'assets/index-abc123.js',
      'assets/index-abc123.css',
      'assets/barlow-condensed-latin-700-normal-v1xN8_Wq.woff2',
      'content/courses.json',
      'manifest.webmanifest',
    ]) {
      expect(FIRST_PAINT.matches(file), file).toBe(true);
    }
  });

  it('fetches ZERO course-face bytes — `unicode-range` routes them off a shell-English boot route', () => {
    // docs/05-perf-notes.md §5's network log: not one Mukta file crosses the wire before paint.
    for (const file of [
      'assets/mukta-latin-400-C8sBt92T.woff2',
      'assets/mukta-devanagari-700-BX2xmIGb.woff2',
      'content/hi-mr/modules/L1-M1.json',
      'icons/splash/splash-1170x2532.png',
    ]) {
      expect(FIRST_PAINT.matches(file), file).toBe(false);
    }
  });
});

describe('the shell budget (#207: the floor every course pays)', () => {
  const SHELL = row(CATALOGUE, 'shell');

  it('is first-paint plus the course faces’ shared latin subsets, as gzip', () => {
    expect(SHELL.limitBytes).toBe(230 * 1024);
    expect(SHELL.measure).toBe('gzip');
    expect(SHELL.matches('assets/mukta-latin-400-C8sBt92T.woff2')).toBe(true);
    expect(SHELL.matches('index.html')).toBe(true);
    expect(SHELL.matches('content/hi-mr/levels.json')).toBe(false);
    expect(SHELL.matches('assets/mukta-devanagari-400-x.woff2')).toBe(false);
  });
});

describe('the per-course budgets (#207: one learner, one course)', () => {
  it('gives every course the SAME ceiling and its own row — a limit per course id would be logic about a course', () => {
    for (const course of CATALOGUE) {
      expect(row(CATALOGUE, `course:${course.id}`).limitBytes).toBe(360 * 1024);
      expect(row(CATALOGUE, `precache:${course.id}`).limitBytes).toBe((230 + 360) * 1024);
    }
  });

  it('meters only that course: its content and its script, never another course’s', () => {
    const HI_MR_ROW = row(CATALOGUE, 'course:hi-mr');

    expect(HI_MR_ROW.matches('content/hi-mr/modules/L1-M7.json')).toBe(true);
    expect(HI_MR_ROW.matches('assets/mukta-devanagari-600-CO25Jtuj.woff2')).toBe(true);
    expect(HI_MR_ROW.matches('content/en-es/modules/L1-M7.json')).toBe(false);
    expect(HI_MR_ROW.matches('assets/noto-naskh-arabic-arabic-400-x.woff2')).toBe(false);
    expect(HI_MR_ROW.matches('index.html')).toBe(false);
  });

  it('precache:<id> is exactly shell + that one course — what the device stores, and no more', () => {
    const PRECACHE = row(CATALOGUE, 'precache:en-ar');

    expect(PRECACHE.matches('index.html')).toBe(true);
    expect(PRECACHE.matches('assets/mukta-latin-400-x.woff2')).toBe(true);
    expect(PRECACHE.matches('content/en-ar/modules/L1-M1.json')).toBe(true);
    expect(PRECACHE.matches('assets/noto-naskh-arabic-arabic-400-x.woff2')).toBe(true);
    // The Devanagari an Arabic learner never renders, and the splash images nobody fetches.
    expect(PRECACHE.matches('assets/mukta-devanagari-700-x.woff2')).toBe(false);
    expect(PRECACHE.matches('content/hi-mr/modules/L1-M1.json')).toBe(false);
    expect(PRECACHE.matches('icons/splash/splash-1170x2532.png')).toBe(false);
  });

  it('adding a course moves that course’s row and NOTHING else — the whole point of #207', () => {
    const dist = fakeDist({
      'index.html': 1_000,
      'assets/index-abc.js': 90_000,
      'assets/mukta-devanagari-400-x.woff2': 86_000,
      'content/courses.json': 600,
      'content/hi-mr/modules/L1-M1.json': 4_000,
    });
    const before = walkDist(dist);
    // The same dist, plus a throwaway course: its content, and a script subset only it reads.
    const after = [
      ...before,
      shipped('content/xx-yy/modules/L1-M1.json', 9_000),
      shipped('assets/noto-naskh-arabic-arabic-400-x.woff2', 120_000, 120_000),
    ];
    const withXxYy = [...CATALOGUE, { id: 'xx-yy', scripts: ['arabic' as const] }];
    const total = (courses: readonly ShippedCourse[], id: string, files: ShippedFile[]): number =>
      evaluate(row(courses, id), files).totalBytes;

    expect(total(withXxYy, 'course:xx-yy', after)).toBe(9_000 / 3 + 120_000);
    for (const id of ['shell', 'first-paint', 'js', 'course:hi-mr', 'precache:hi-mr']) {
      expect(total(withXxYy, id, after), id).toBe(total(CATALOGUE, id, before));
    }
  });
});

describe("the splash budget (#115's iOS startup images)", () => {
  const SPLASH = row(CATALOGUE, 'splash');

  it('meters exactly the carve-out, as raw bytes — PNG is already compressed', () => {
    expect(SPLASH.limitBytes).toBe(100 * 1024);
    expect(SPLASH.measure).toBe('raw');
    expect(SPLASH.matches('icons/splash/splash-750x1334.png')).toBe(true);
    expect(SPLASH.matches('icons/icon-192.png')).toBe(false);
    expect(SPLASH.matches('assets/index-abc123.js')).toBe(false);
  });
});

describe('the unmetered row (#207: no byte ships unbudgeted)', () => {
  const UNMETERED = row(CATALOGUE, 'unmetered');

  it('fails on the FIRST file nobody owns, however small — a new asset class must be budgeted', () => {
    expect(UNMETERED.maxFiles).toBe(0);

    const clean = evaluate(UNMETERED, [shipped('index.html', 1_000)]);
    const tiny = evaluate(UNMETERED, [shipped('media/ping.mp3', 1, 1)]);

    expect(clean.ok).toBe(true);
    expect(clean.files).toEqual([]);
    expect(tiny.ok).toBe(false);
    expect(tiny.files.map((file) => file.path)).toEqual(['media/ping.mp3']);
  });
});

describe('the walk and the arithmetic', () => {
  const FONTS_OF_HI_MR = row(CATALOGUE, 'course:hi-mr');

  it('sums exactly the matching files, recursively', () => {
    const dist = fakeDist({
      'assets/mukta-devanagari-400-x.woff2': 1000,
      'assets/index.js': 90_000,
      'content/hi-mr/levels.json': 4000,
      'content/en-es/levels.json': 4000,
    });

    const result = evaluate(FONTS_OF_HI_MR, walkDist(dist));

    expect(result.files.map((file) => file.path)).toEqual([
      'assets/mukta-devanagari-400-x.woff2',
      'content/hi-mr/levels.json',
    ]);
    expect(result.ok).toBe(true);
  });

  it('the walk carries real gzip sizes, so gzip budgets read transfer bytes off disk', () => {
    const dist = fakeDist({ 'assets/index.js': 90_000 });

    const [file] = walkDist(dist);

    expect(file!.gzipBytes).toBe(gzipSync(Buffer.alloc(90_000)).length);
  });

  it('passes at exactly the limit and fails one byte over — a budget is a ceiling, not a target', () => {
    const limit = FONTS_OF_HI_MR.limitBytes;
    const at = evaluate(FONTS_OF_HI_MR, [shipped('content/hi-mr/x.json', limit * 3, limit)]);
    const over = evaluate(FONTS_OF_HI_MR, [shipped('content/hi-mr/x.json', limit * 3, limit + 1)]);

    expect(at.ok).toBe(true);
    expect(over.ok).toBe(false);
  });

  it('treats an empty match as 0 bytes and green — a budget over nothing cannot fail', () => {
    const result = evaluate(FONTS_OF_HI_MR, [shipped('assets/index.js', 1)]);

    expect(result.totalBytes).toBe(0);
    expect(result.ok).toBe(true);
  });
});

describe('the one-line contract', () => {
  it('reads like the harness: id, total, limit, verdict, file count', () => {
    const result = evaluate(row(CATALOGUE, 'splash'), [
      shipped('icons/splash/a.png', 100_000),
      shipped('icons/splash/b.png', 1480),
    ]);

    expect(formatResult(result)).toBe('BUDGET splash 99.1 KiB ≤ 100.0 KiB ok — 2 files');
  });

  it('says gzip when that is what it metered, so 92.9 KiB is never mistaken for disk bytes', () => {
    const result = evaluate(row(CATALOGUE, 'js'), [shipped('assets/index.js', 275_000, 95_129)]);

    expect(formatResult(result)).toBe('BUDGET js 92.9 KiB gzip ≤ 200.0 KiB ok — 1 file');
  });

  it('carries the course in its own id, so a red line names the course that blew it', () => {
    const result = evaluate(row(CATALOGUE, 'course:hi-mr'), [
      shipped('content/hi-mr/modules/L1-M1.json', 1_200_000, 400 * 1024),
    ]);

    expect(formatResult(result)).toBe(
      'BUDGET course:hi-mr 400.0 KiB gzip > 360.0 KiB OVER — 1 file',
    );
  });

  it('says OVER on a file-count row even though the bytes are within the limit', () => {
    const result = evaluate(row(CATALOGUE, 'unmetered'), [shipped('media/ping.mp3', 0, 0)]);

    expect(formatResult(result)).toBe('BUDGET unmetered 0.0 KiB ≤ 0.0 KiB OVER — 1 file');
  });
});

/* ------------------------------------------------------- the precache, measured (#211) */

/**
 * The one row that is read off the artefact instead of computed from the owner table. Before
 * #211 the worker precached the whole catalogue and `precache:<id>` described a device that did
 * not exist; the audit is what keeps the two from drifting apart again, in either direction —
 * a course's bytes creeping back into the precache, or a shell file dropping out of it.
 */
describe('the precache audit: the worker must precache exactly the shell', () => {
  const SHIPPED = [
    shipped('index.html', 2_000),
    shipped('manifest.webmanifest', 460),
    shipped('assets/index-abc.js', 279_000, 89_000),
    shipped('assets/index-abc.css', 55_000, 8_600),
    shipped('assets/mukta-latin-400-x.woff2', 20_000, 20_000),
    shipped('assets/mukta-devanagari-400-x.woff2', 86_000, 86_000),
    shipped('content/courses.json', 600),
    shipped('content/hi-mr/levels.json', 4_000),
    shipped('icons/icon-192.png', 900),
    shipped('icons/splash/splash-750x1334.png', 6_000, 6_000),
    shipped('sw.js', 5_000, 1_800),
    shipped('workbox-1b18e67d.js', 20_000, 6_000),
  ];
  const SHELL = [
    'index.html',
    'manifest.webmanifest',
    'assets/index-abc.js',
    'assets/index-abc.css',
    'assets/mukta-latin-400-x.woff2',
    'content/courses.json',
    'icons/icon-192.png',
  ];

  it('reads the urls out of the minified worker the plugin emitted', () => {
    const worker =
      'e.precacheAndRoute([{url:"index.html",revision:"93"},' +
      '{url:"assets/index-abc.js",revision:null}],{})';

    expect(precachedUrls(worker)).toEqual(['index.html', 'assets/index-abc.js']);
  });

  it('passes when the precache is the shell — the worker’s own two scripts excepted', () => {
    const audit = precacheAudit(SHELL, SHIPPED, CATALOGUE);

    // `sw.js` and `workbox-*.js` are shell bytes every learner downloads, and workbox never
    // precaches itself: the browser keeps a worker's script in the registration instead.
    expect(audit).toMatchObject({ ok: true, extra: [], missing: [] });
    expect(audit.gzipBytes).toBe(
      SHIPPED.filter((f) => SHELL.includes(f.path)).reduce((sum, file) => sum + file.gzipBytes, 0),
    );
  });

  it('fails on a course’s bytes in the precache — the regression #211 closed', () => {
    const audit = precacheAudit(
      [...SHELL, 'content/hi-mr/levels.json', 'assets/mukta-devanagari-400-x.woff2'],
      SHIPPED,
      CATALOGUE,
    );

    expect(audit.ok).toBe(false);
    expect(audit.extra).toEqual([
      'content/hi-mr/levels.json',
      'assets/mukta-devanagari-400-x.woff2',
    ]);
  });

  it('fails on a shell file the precache dropped — that one is a 404 on a plane', () => {
    const audit = precacheAudit(
      SHELL.filter((file) => file !== 'assets/index-abc.css'),
      SHIPPED,
      CATALOGUE,
    );

    expect(audit.ok).toBe(false);
    expect(audit.missing).toEqual(['assets/index-abc.css']);
  });

  it('fails on a worker that lists nothing — an empty comparison must never read green', () => {
    expect(precacheAudit([], SHIPPED, CATALOGUE).ok).toBe(false);
  });

  it('reads like the harness — one line, files, bytes, verdict', () => {
    expect(formatPrecacheAudit(precacheAudit(SHELL, SHIPPED, CATALOGUE))).toBe(
      'BUDGET precache 7 files 116.1 KiB gzip = shell ok',
    );
    expect(formatPrecacheAudit(precacheAudit([], SHIPPED, CATALOGUE))).toBe(
      'BUDGET precache 0 files 0.0 KiB gzip = shell MISMATCH',
    );
  });
});
