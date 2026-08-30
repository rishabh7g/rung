/**
 * Payload budgets over `dist/` (#113, #114, #207; sizes informational since #304) — the
 * measurement half of "subset per course at build time".
 *
 *   npm run budget      → one line per row; exit 1 only when a file has no owner or the
 *                         precache list disagrees with the shell row (#304)
 *
 * A subset that regresses is silent: nothing errors when a build ships 800 KB of fonts again, the
 * app just gets slower on the phones PRD-engineering §10 targets, and the offline precache (#90)
 * downloads every byte of it on first visit. So the payload is measured on every build:
 * `scripts/verify.sh` runs this right after BUILD (`BUDGET ok` in the summary line), reading the
 * `dist/` that build just wrote. **Since #304 every size is informational** — each row is
 * measured and printed, and no size can fail the gate. What still fails it is attribution
 * honesty (`unmetered` must hold zero files) and the precache audit (#211: the emitted worker's
 * precache list must equal the `shell` row) — correctness checks, not ceilings.
 *
 * **What changed in #207: the budget stopped metering the catalogue and started metering a
 * learner.** The old `fonts` and `total` rows summed all of `dist/`, so every course ever added
 * was charged to every other course — a Spanish learner was billed for hi-mr's ~262 KiB of
 * Devanagari, which `unicode-range` guarantees their browser never fetches. That number grew with
 * the catalogue for a cost nobody pays, and by en-es L1 it was the bottleneck (634.8 KiB against a
 * 580 KiB row). It is replaced by an attribution: every shipped file has exactly ONE owner —
 *
 *   • `shell`   — what every course pays for: the document, the bundle, the CSS, the Latin UI
 *                 faces, the manifest, the icons, `courses.json`.
 *   • `course:<id>` — what only that course's learner pays for: `content/<id>/**` plus the font
 *                 subsets its script needs (Mukta Devanagari is hi-mr's; #197's Naskh and #222's
 *                 two diacritic cuts are en-ar's).
 *   • `splash`  — the iOS startup set, never precached and never fetched by the app (#115).
 *   • `icon-svg` — `icons/icon.svg`, the vector the PNGs are cut from: shipped (it is committed
 *                 under `public/`, which Vite copies verbatim), but deliberately not precached
 *                 and never fetched by the app either (#251) — same shape as `splash`, one file.
 *
 * — and the rows are unions of owners, so **adding a course cannot move another course's row**.
 *
 * The rows, and why each one exists:
 *
 *   | row              | measures                                            | watches              |
 *   | ---------------- | --------------------------------------------------- | -------------------- |
 *   | `first-paint`    | the shell bytes a first visit fetches BEFORE paint    | PRD §10's ≤ 2 s      |
 *   | `js`             | every `.js` (#114's ≤ 200 KiB gzip, unchanged)        | parse/exec on 4× CPU |
 *   | `shell`          | everything every course pays for                      | the shared floor     |
 *   | `course:<id>`    | one course's own content + its own script subsets     | per-course headroom  |
 *   | `precache:<id>`  | `shell` + `course:<id>` — one learner's offline copy   | PRD §10's offline    |
 *   | `splash`         | `icons/splash/` (#115)                                | repo hygiene         |
 *   | `icon-svg`       | `icons/icon.svg` (#251)                               | repo hygiene         |
 *   | `unmetered`      | anything owned by nothing — must be zero files         | the gate's honesty   |
 *
 * **`first-paint` and `precache:<id>` are two different questions and the old `total` row
 * conflated them.** docs/05-perf-notes.md §5 has the Lighthouse network log: a first paint fetches
 * the document, the bundle, the CSS and two Barlow faces — and **zero** font files of any course
 * script, because `unicode-range` routes them away on a boot route that renders shell English.
 * So `total` never metered first load at all; it metered the service-worker precache, which
 * finishes in the background minutes after the learner is already reading. Each now has its own
 * row: `first-paint` is the one that watches the 2 s gate, `precache:<id>` is
 * the one that watches "works with no network after first load" without charging one learner for
 * another learner's language.
 *
 * `raw` meters bytes on disk (right for woff2/png, which are already compressed); `gzip` meters
 * what the wire carries (GitHub Pages serves text assets Content-Encoding: gzip — zlib's default
 * level is the approximation). docs/05-perf-notes.md §4 carries the measurements, the record of
 * the ceilings #304 retired, and the ordered remedy list for when a number grows.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

// Not `new URL('..', import.meta.url)`: Vite rewrites that form (`tools/tokens.ts` says more).
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(REPO_ROOT, 'dist');

/* --------------------------------------------------------- courses, as far as bytes go */

/**
 * The scripts a course brings its own font subsets for. Plain Latin is deliberately absent: the
 * shell renders it in every course, so its faces are `shell` bytes, not a course's.
 *
 * `latin-ext` is Latin and is here anyway (#222), because it is not the shell's: it is the
 * diacritics of a ROMANIZED course's L2 — ā ī ū ḍ ḥ ṣ ṭ from Mukta's own latin-ext cut, ʾ ʿ Ẓ ẓ
 * from Source Sans 3. No shell string carries one, and a course that writes its L2 in its native
 * script never prints one, so charging them to the shell would bill every learner for a face only
 * romanized courses paint.
 */
export const COURSE_SCRIPTS = ['devanagari', 'arabic', 'latin-ext', 'cyrillic'] as const;
export type CourseScript = (typeof COURSE_SCRIPTS)[number];

/** The script a romanized course's L2 line is written in whatever its native script is (#222) —
    Latin letters plus the transliteration marks. `scriptMode`, not a tag, decides it. */
const ROMANIZATION_SCRIPT: CourseScript = 'latin-ext';

/**
 * Which script a language tag is written in — **data, not logic** (Invariant 1: nothing in this
 * product branches on a course id). A tag absent from this table is written in Latin, so its
 * course carries no font subsets of its own and its row is content-only. Both of a course's tags
 * count: hi-mr renders Hindi prompts AND Marathi answers, and both are Devanagari.
 */
export const SCRIPT_BY_LANGUAGE_TAG: Readonly<Record<string, CourseScript>> = {
  hi: 'devanagari',
  mr: 'devanagari',
  ne: 'devanagari',
  sa: 'devanagari',
  ar: 'arabic',
  fa: 'arabic',
  ur: 'arabic',
  // #325 — en-ru's display line. Cyrillic is charged to the course that paints it, exactly as
  // Devanagari is: Mukta bundles none, so the letters come from Source Sans 3's own cut.
  ru: 'cyrillic',
};

/**
 * The faces `tools/font-subset.ts` generates for course text — Mukta for Devanagari and for the
 * romanization's diacritics (#222), Noto Naskh Arabic for the quiet native line (#197), Source
 * Sans 3 for the four marks Mukta lacks (#222). A slug list, not course ids: the shell's own faces
 * (Barlow, Barlow Condensed) are everything else, and they are the ones a first paint fetches.
 */
export const COURSE_FACE_SLUGS = ['mukta', 'noto-naskh-arabic', 'source-sans-3'] as const;

/** One row of the emitted `dist/content/courses.json`, reduced to what the budget needs. */
export interface ShippedCourse {
  id: string;
  /** The non-Latin scripts this course's own font subsets serve; empty for a Latin-only course. */
  scripts: readonly CourseScript[];
}

/**
 * The shipped courses, read from the manifest the content build emitted — that is what shipped,
 * dev relaxations included (`tools/font-subset.ts` reads it the same way, for the same reason).
 */
export function coursesFromManifest(manifest: unknown): ShippedCourse[] {
  const rows = (manifest as { courses?: unknown }).courses;
  if (!Array.isArray(rows)) return [];
  return rows.map(
    (row: { id?: unknown; l1Tag?: unknown; l2Tag?: unknown; scriptMode?: unknown }) => {
      const scripts = [row.l1Tag, row.l2Tag]
        .map((tag) => (typeof tag === 'string' ? SCRIPT_BY_LANGUAGE_TAG[tag] : undefined))
        .filter((script): script is CourseScript => script !== undefined);
      // A romanized course prints its L2 in Latin letters with transliteration marks, so it pays
      // for the diacritic cuts on top of its native script's face (#222). `scriptMode` is the
      // manifest's own word for it — a native-script course never prints a mark.
      if (row.scriptMode === 'romanized') scripts.push(ROMANIZATION_SCRIPT);
      return { id: String(row.id), scripts: [...new Set(scripts)] };
    },
  );
}

/** Is this a face that only course text renders (as opposed to the shell's Barlow chrome)? */
const isCourseFace = (file: string): boolean =>
  COURSE_FACE_SLUGS.some((slug) => path.basename(file).startsWith(`${slug}-`));

/**
 * The script a generated subset serves, read off its own filename — `tools/font-subset.ts` names
 * every output `<face-slug>-<script>-<weight>.woff2` and Vite appends a hash, so the script token
 * survives the build. `null` means Latin (or an unrecognised script), which is shell.
 */
export function fontScript(file: string): CourseScript | null {
  const name = path.basename(file);
  return COURSE_SCRIPTS.find((script) => name.includes(`-${script}-`)) ?? null;
}

/* --------------------------------------------------------- attribution */

/** Who pays for a shipped file. `course` carries every course that needs it — a script subset is
    a union over the courses that share the script, so all of them are charged for it. */
export type Owner =
  | { kind: 'shell' }
  | { kind: 'splash' }
  | { kind: 'icon-svg' }
  | { kind: 'course'; ids: readonly string[] }
  | { kind: 'unread-script' }
  | { kind: 'unmetered' };

const SHELL: Owner = { kind: 'shell' };

/** The shell's file classes, spelled out rather than caught by an `else`: a new asset class (an
    `.mp3`, a `.wasm`, a second content root) must be given an owner deliberately, which is what
    the `unmetered` row enforces. */
const isShellFile = (file: string): boolean =>
  file === 'index.html' ||
  file === 'manifest.webmanifest' ||
  file === 'content/courses.json' ||
  file.endsWith('.js') ||
  file.endsWith('.css') ||
  file.endsWith('.woff2') ||
  (file.startsWith('icons/') && file.endsWith('.png'));

/**
 * The one attribution every row is built from. Order matters: the splash carve-out and course
 * content are decided by path, fonts by the script their filename names, and everything else has
 * to match a named shell class or it is `unmetered` — the gate's own smoke alarm.
 */
export function attribute(file: string, courses: readonly ShippedCourse[]): Owner {
  if (file.startsWith('icons/splash/')) return { kind: 'splash' };
  // The vector source, not a shell citizen: `tools/pwa.ts`'s PRECACHE_GLOBS is `icons/*.png`
  // deliberately, so a `shell` attribution here would fail `precacheAudit()` below — shell means
  // precached, and this one file is shipped but never precached, same shape as splash (#251).
  if (file === 'icons/icon.svg') return { kind: 'icon-svg' };

  if (file.startsWith('content/') && file !== 'content/courses.json') {
    const id = file.slice('content/'.length).split('/')[0] ?? '';
    // A content directory for a course the manifest does not list is a stale artefact, not payload.
    return courses.some((course) => course.id === id)
      ? { kind: 'course', ids: [id] }
      : { kind: 'unmetered' };
  }

  if (file.endsWith('.woff2') && isCourseFace(file)) {
    const script = fontScript(file);
    if (script !== null) {
      const ids = courses.filter((c) => c.scripts.includes(script)).map((c) => c.id);
      if (ids.length > 0) return { kind: 'course', ids };

      /**
       * A script subset no shipped course reads yet (#325 — Cyrillic, bundled before en-ru is
       * authored, the honest-gate curve #197 took for Naskh).
       *
       * It used to be charged to the SHELL, "where its ceiling makes the waste red". That reason
       * has not survived: #304 made every size informational, so there is no ceiling left to make
       * anything red — and `shell` now means precached, because the one gate #304 kept is the
       * audit that the shell row EQUALS the emitted precache list. A course script is never
       * precached (`PRECACHE_IGNORES`), so a shell attribution here fails that audit for a file
       * no learner ever downloads: `unicode-range` routes it away from every course that cannot
       * read it, which is the whole point of subsetting per script.
       *
       * So it takes its own row — shipped, deliberately not precached, never fetched — which is
       * the same shape `splash` and `icons/icon.svg` already have (#115, #251), and the row makes
       * the dead weight visible by NAME rather than by hiding it inside the shared floor.
       */
      return { kind: 'unread-script' };
    }
    // A course face's own `latin` subset (mukta-latin-*) is subset over the UNION of every
    // shipped course's strings, so it is genuinely shared: shell, not double-counted per course.
    return SHELL;
  }

  return isShellFile(file) ? SHELL : { kind: 'unmetered' };
}

/* ----------------------------------------------------------------- the budgets */

export interface Budget {
  id: string;
  /** Which shipped files this budget meters, by path relative to `dist/`. */
  matches: (relativePath: string) => boolean;
  /** `raw` = bytes on disk; `gzip` = transfer bytes (what a throttled 4G link actually moves). */
  measure: 'raw' | 'gzip';
  /** Hard ceiling on the FILE COUNT — the one ceiling #304 kept (`unmetered` wants zero). */
  maxFiles?: number;
}

/*
 * No size ceilings live here any more (#304). #113/#114/#207 gated these rows — first-paint
 * 185 KiB, js 200, shell 230, course:<id> 360, precache:<id> 590, splash 100, icon-svg 2 — and
 * #304 removed the enforcement: a size regression should be visible, not blocking. Every row is
 * still measured and printed on every build (docs/05-perf-notes.md §4 keeps the numbers and the
 * remedy order), and the two checks that are about correctness rather than size still gate:
 * `unmetered` (every shipped file must have an owner, by count) and `precacheAudit()` below
 * (#211 — the emitted worker's precache list must equal the `shell` row, which is what keeps
 * `precache:<id>` a measurement of the device rather than an intention).
 */

/** A new budget is one row and zero new plumbing. */
export function budgets(courses: readonly ShippedCourse[]): Budget[] {
  const owner = (file: string): Owner => attribute(file, courses);
  const isShell = (file: string): boolean => owner(file).kind === 'shell';
  const ownedBy = (file: string, id: string): boolean => {
    const who = owner(file);
    return who.kind === 'course' && who.ids.includes(id);
  };

  return [
    {
      // #114, #207 — the critical path, not the precache: the document, the bundle, the CSS, the
      // Barlow UI faces and the few hundred bytes of manifest/icons/courses.json. Course faces are
      // excluded because the browser never fetches them here: `unicode-range` routes Mukta away
      // from a boot route that renders shell English, which the §5 network log measured directly.
      id: 'first-paint',
      matches: (file) => isShell(file) && !(file.endsWith('.woff2') && isCourseFace(file)),
      measure: 'gzip',
    },
    {
      // #114 — the issue's "JS ≤ 200 KB gzip": the app bundle plus the workbox runtime and sw.js,
      // all of which a first visit downloads. Unchanged by #207: JS is shell by definition, and
      // this row is the one PRD-engineering §10 names by number. 94.9 KiB measured.
      id: 'js',
      matches: (file) => file.endsWith('.js'),
      measure: 'gzip',
    },
    {
      // #207 — the shared floor. Everything here is paid for by every learner in every course, so
      // a byte added here is a byte multiplied by the catalogue; a byte added to a course row is
      // paid once, by the people who chose that course.
      id: 'shell',
      matches: isShell,
      measure: 'gzip',
    },
    ...courses.flatMap((course): Budget[] => [
      {
        // #207 — this course's own content and script subsets. Its own row, so ten more courses
        // cannot spend this course's headroom, and this course cannot spend theirs.
        id: `course:${course.id}`,
        matches: (file) => ownedBy(file, course.id),
        measure: 'gzip',
      },
      {
        // #207, #211 — what this learner's device downloads and keeps: the precached shell plus
        // the one course the worker warmed into its runtime cache when they opened it.
        id: `precache:${course.id}`,
        matches: (file) => isShell(file) || ownedBy(file, course.id),
        measure: 'gzip',
      },
    ]),
    {
      // #115 — the iOS splash set: one already-compressed PNG per iPhone viewport, of which a
      // device ever downloads ONE. Deliberately NOT precached (tools/pwa.ts) and never fetched by
      // the app — Safari pulls the single matching image at Add-to-Home-Screen — so it is neither
      // first-paint nor precache payload. Raw bytes (PNG, like woff2, does not gzip further); the
      // row is repo hygiene — a splash set that grows past ~9 KiB per image is a drawing bug,
      // not a brand decision. Baseline: 70.3 KiB across 11 images.
      id: 'splash',
      matches: (file) => file.startsWith('icons/splash/'),
      measure: 'raw',
    },
    {
      // #251 — the vector the PNGs are cut from. One file, a few hundred bytes; the row is
      // repo hygiene the same way `splash`'s is.
      id: 'icon-svg',
      matches: (file) => file === 'icons/icon.svg',
      measure: 'raw',
    },
    {
      // #325 — script subsets bundled ahead of the course that reads them. Shipped, never
      // precached, and fetched by nobody until that course graduates, at which point the files
      // move into its `course:` row on their own. The row exists so the wait is VISIBLE.
      id: 'unread-script',
      matches: (file) => owner(file).kind === 'unread-script',
      measure: 'raw',
    },
    {
      // #207 — the gate's honesty check. Every row above is a named owner, so a file that matches
      // none of them is a new asset class nobody has budgeted: it fails HERE, by count, rather
      // than riding along invisibly inside a bigger row. Zero files, always — with the precache
      // audit, the only gate #304 kept.
      id: 'unmetered',
      matches: (file) => owner(file).kind === 'unmetered',
      measure: 'raw',
      maxFiles: 0,
    },
  ];
}

/* ----------------------------------------------------------------- the measure */

export interface ShippedFile {
  /** Relative to `dist/`, posix separators. */
  path: string;
  bytes: number;
  /** `gzipSync` over the file's contents — the transfer-size approximation gzip budgets meter. */
  gzipBytes: number;
}

/** Every file under `dir`, recursively — what a first visit downloads is what `dist/` holds. */
export function walkDist(dir: string, prefix = ''): ShippedFile[] {
  return readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const relative = prefix === '' ? entry.name : `${prefix}/${entry.name}`;
      if (entry.isDirectory()) return walkDist(path.join(dir, entry.name), relative);
      const full = path.join(dir, entry.name);
      return [
        {
          path: relative,
          bytes: statSync(full).size,
          gzipBytes: gzipSync(readFileSync(full)).length,
        },
      ];
    })
    .sort((a, b) => a.path.localeCompare(b.path));
}

export interface BudgetResult {
  budget: Budget;
  files: ShippedFile[];
  totalBytes: number;
  ok: boolean;
}

/** The bytes this budget meters for one file — disk size or gzip transfer size. */
const metered = (budget: Budget, file: ShippedFile): number =>
  budget.measure === 'gzip' ? file.gzipBytes : file.bytes;

export function evaluate(budget: Budget, shipped: readonly ShippedFile[]): BudgetResult {
  const files = shipped.filter((file) => budget.matches(file.path));
  const totalBytes = files.reduce((sum, file) => sum + metered(budget, file), 0);
  // #304: a size cannot fail a row — the file count (`unmetered`'s zero) is the only ceiling left.
  const ok = budget.maxFiles === undefined || files.length <= budget.maxFiles;
  return { budget, files, totalBytes, ok };
}

const kib = (bytes: number): string => `${(bytes / 1024).toFixed(1)} KiB`;

/** `BUDGET shell 216.0 KiB gzip — 19 files` (raw budgets drop the ` gzip`). Sizes carry no
    verdict since #304; the one row that can still fail (`unmetered`, by count) appends ` OVER`. */
export function formatResult(result: BudgetResult): string {
  const gzip = result.budget.measure === 'gzip' ? ' gzip' : '';
  const files = `${result.files.length} file${result.files.length === 1 ? '' : 's'}`;
  const verdict = result.ok ? '' : ' OVER';
  return `BUDGET ${result.budget.id} ${kib(result.totalBytes)}${gzip} — ${files}${verdict}`;
}

/* ------------------------------------------------- the precache, measured not asserted (#211) */

/**
 * The worker's own two scripts. They are `shell` bytes — every learner downloads them — but they
 * are never IN the precache: workbox does not precache itself, and the browser keeps a service
 * worker's script (and what it `importScripts`) in the registration rather than in a cache the
 * app can see. So they are the one sanctioned difference between the shell row and the precache
 * list, and naming them here is what lets the audit below be an equality.
 */
const isWorkerScript = (file: string): boolean =>
  file === 'sw.js' || /^workbox-[0-9a-f]+\.js$/.test(file);

/**
 * The URLs `dist/sw.js` precaches, read out of the emitted worker.
 *
 * The generated worker is minified, so the manifest reads `{url:"index.html",revision:"…"}` —
 * one regex over the whole file, which is enough because nothing else in a workbox worker writes
 * a `url:"…"` property. Zero matches means the shape changed, and the audit says so rather than
 * quietly passing an empty comparison.
 */
export function precachedUrls(workerSource: string): string[] {
  return [...workerSource.matchAll(/url:"([^"]+)"/g)].map((match) => match[1]!);
}

export interface PrecacheAudit {
  precached: readonly string[];
  /** In the precache and owned by a course — the regression #211 exists to prevent. */
  extra: readonly string[];
  /** Shell, and not precached — a shell file that would 404 on a plane. */
  missing: readonly string[];
  gzipBytes: number;
  ok: boolean;
}

/**
 * **The precache must be exactly the `shell` row** (#211), minus the worker's own scripts.
 *
 * This is what makes `precache:<id>` a measurement rather than an intention. The globs live in
 * `tools/pwa.ts` and the attribution lives here; before this check the two could disagree for a
 * whole release and the only symptom would be a phone quietly downloading another course's
 * language, or — far worse — a shell file missing offline. Now the build compares the worker it
 * just emitted against the owner table, file by file.
 */
export function precacheAudit(
  precached: readonly string[],
  shipped: readonly ShippedFile[],
  courses: readonly ShippedCourse[],
): PrecacheAudit {
  const expected = shipped
    .filter((file) => attribute(file.path, courses).kind === 'shell' && !isWorkerScript(file.path))
    .map((file) => file.path);

  const extra = precached.filter((url) => !expected.includes(url));
  const missing = expected.filter((file) => !precached.includes(file));
  const gzipBytes = shipped
    .filter((file) => precached.includes(file.path))
    .reduce((sum, file) => sum + file.gzipBytes, 0);

  return {
    precached,
    extra,
    missing,
    gzipBytes,
    ok: precached.length > 0 && extra.length === 0 && missing.length === 0,
  };
}

/** `BUDGET precache 17 files 207.4 KiB gzip = shell ok` — the shell, on the device. */
export function formatPrecacheAudit(audit: PrecacheAudit): string {
  return (
    `BUDGET precache ${audit.precached.length} files ${kib(audit.gzipBytes)} gzip ` +
    `= shell ${audit.ok ? 'ok' : 'MISMATCH'}`
  );
}

/* ----------------------------------------------------------------- the gate */

/** The shipped courses, or `[]` when the build emitted no manifest (nothing to attribute to). */
function shippedCourses(): ShippedCourse[] {
  const manifest = path.join(DIST, 'content', 'courses.json');
  try {
    return coursesFromManifest(JSON.parse(readFileSync(manifest, 'utf8')));
  } catch {
    return [];
  }
}

function main(): number {
  let shipped: ShippedFile[];
  try {
    shipped = walkDist(DIST);
  } catch {
    console.error(`BUDGET error: no ${DIST} — run \`npx vite build\` first`);
    return 2;
  }

  const courses = shippedCourses();
  let failed = false;
  for (const budget of budgets(courses)) {
    const result = evaluate(budget, shipped);
    console.log(formatResult(result));
    if (!result.ok) {
      failed = true;
      // The files, heaviest first in the metered bytes — the failure block IS the diagnosis.
      for (const file of [...result.files].sort(
        (a, b) => metered(budget, b) - metered(budget, a),
      )) {
        console.log(`  ${metered(budget, file)}  ${file.path}`);
      }
    }
  }

  // #211 — and then the one row that is read off the artefact rather than computed from the
  // owner table: what the worker this build emitted actually precaches.
  const worker = path.join(DIST, 'sw.js');
  let workerSource: string;
  try {
    workerSource = readFileSync(worker, 'utf8');
  } catch {
    console.error(`BUDGET error: no ${worker} — the PWA plugin emits it; run \`npx vite build\``);
    return 2;
  }

  const audit = precacheAudit(precachedUrls(workerSource), shipped, courses);
  console.log(formatPrecacheAudit(audit));
  if (!audit.ok) {
    failed = true;
    if (audit.precached.length === 0) {
      console.log('  sw.js lists no precached url — the worker’s manifest shape changed');
    }
    // Each line is one file on the wrong side of the shell/course line, which is the diagnosis.
    for (const file of audit.extra) console.log(`  precached, not shell:  ${file}`);
    for (const file of audit.missing) console.log(`  shell, not precached:  ${file}`);
  }

  return failed ? 1 : 0;
}

const entry = process.argv[1];
if (entry !== undefined && path.resolve(entry) === fileURLToPath(import.meta.url)) {
  process.exit(main());
}
