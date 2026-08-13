/**
 * Payload budgets over `dist/` (#113, #114, #207) — the enforcement half of "subset per course at
 * build time".
 *
 *   npm run budget      → one line per budget, exit 1 naming the files when one is blown
 *
 * A subset that regresses is silent: nothing errors when a build ships 800 KB of fonts again, the
 * app just gets slower on the phones PRD-engineering §10 targets, and the offline precache (#90)
 * downloads every byte of it on first visit. So the budget is a build gate, not a doc:
 * `scripts/verify.sh` runs it right after BUILD (`BUDGET ok` in the summary line), reading the
 * `dist/` that build just wrote.
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
 *                 subsets its script needs (Mukta Devanagari is hi-mr's; #197's Naskh is en-ar's).
 *   • `splash`  — the iOS startup set, never precached and never fetched by the app (#115).
 *
 * — and the rows are unions of owners, so **adding a course cannot move another course's row**.
 *
 * The rows, and why each one exists:
 *
 *   | row              | measures                                            | defends              |
 *   | ---------------- | --------------------------------------------------- | -------------------- |
 *   | `first-paint`    | the shell bytes a first visit fetches BEFORE paint    | PRD §10's ≤ 2 s      |
 *   | `js`             | every `.js` (#114's ≤ 200 KiB gzip, unchanged)        | parse/exec on 4× CPU |
 *   | `shell`          | everything every course pays for                      | the shared floor     |
 *   | `course:<id>`    | one course's own content + its own script subsets     | per-course headroom  |
 *   | `precache:<id>`  | `shell` + `course:<id>` — one learner's offline copy   | PRD §10's offline    |
 *   | `splash`         | `icons/splash/` (#115)                                | repo hygiene         |
 *   | `unmetered`      | anything owned by nothing — must be zero files         | the gate's honesty   |
 *
 * **`first-paint` and `precache:<id>` are two different questions and the old `total` row
 * conflated them.** docs/05-perf-notes.md §5 has the Lighthouse network log: a first paint fetches
 * the document, the bundle, the CSS and two Barlow faces — and **zero** font files of any course
 * script, because `unicode-range` routes them away on a boot route that renders shell English.
 * So `total` never metered first load at all; it metered the service-worker precache, which
 * finishes in the background minutes after the learner is already reading. Each now has its own
 * row and its own ceiling: `first-paint` is the one that defends the 2 s gate, `precache:<id>` is
 * the one that defends "works with no network after first load" without charging one learner for
 * another learner's language.
 *
 * `raw` meters bytes on disk (right for woff2/png, which are already compressed); `gzip` meters
 * what the wire carries (GitHub Pages serves text assets Content-Encoding: gzip — zlib's default
 * level is the approximation). Limits are the measured payload plus ~5%, so every row stays a
 * tripwire rather than a ceiling; docs/05-perf-notes.md §4 carries the measurements and the
 * ordered remedy list for when one goes red.
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
 * The non-Latin scripts a course brings its own font subsets for. Latin is deliberately absent:
 * the shell renders it in every course, so its faces are `shell` bytes, not a course's.
 */
export const COURSE_SCRIPTS = ['devanagari', 'arabic'] as const;
export type CourseScript = (typeof COURSE_SCRIPTS)[number];

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
};

/**
 * The faces `tools/font-subset.ts` generates for course text — Mukta for Devanagari, Noto Naskh
 * Arabic for the quiet native line (#197). A slug list, not course ids: the shell's own faces
 * (Barlow, Barlow Condensed) are everything else, and they are the ones a first paint fetches.
 */
export const COURSE_FACE_SLUGS = ['mukta', 'noto-naskh-arabic'] as const;

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
  return rows.map((row: { id?: unknown; l1Tag?: unknown; l2Tag?: unknown }) => {
    const scripts = [row.l1Tag, row.l2Tag]
      .map((tag) => (typeof tag === 'string' ? SCRIPT_BY_LANGUAGE_TAG[tag] : undefined))
      .filter((script): script is CourseScript => script !== undefined);
    return { id: String(row.id), scripts: [...new Set(scripts)] };
  });
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
  | { kind: 'course'; ids: readonly string[] }
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
      // A script no shipped course reads is dead weight every course carries — charge it to the
      // shell, where its ceiling makes the waste red, rather than to nobody.
      return ids.length > 0 ? { kind: 'course', ids } : SHELL;
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
  /** Hard ceiling, bytes. */
  limitBytes: number;
  /** `raw` = bytes on disk; `gzip` = transfer bytes (what a throttled 4G link actually moves). */
  measure: 'raw' | 'gzip';
  /** Hard ceiling on the FILE COUNT, where bytes are not the point (`unmetered` wants zero). */
  maxFiles?: number;
}

/**
 * The shell bytes a first visit fetches before it paints — the number PRD-engineering §10's
 * "≤ 2 s on mid-range Android" is actually about. Measured 173.7 KiB gzip (docs/05-perf-notes.md
 * §4); ~1.0 s of Slow 4G at ~180 KiB/s, against a measured TTI of 1.5–1.8 s.
 */
const FIRST_PAINT_LIMIT = 185 * 1024;

/** What every course pays for. Measured 216.0 KiB gzip on the `--with-fixtures` build (§4). */
const SHELL_LIMIT = 230 * 1024;

/**
 * What ONE course may cost the learner who picks it. One number for every course rather than a
 * table of per-course ceilings: a limit keyed by course id would special-case a course id, and
 * every course is entitled to the same room. Measured heaviest: hi-mr at 340.3 KiB gzip (§4).
 */
const COURSE_LIMIT = 360 * 1024;

/**
 * One learner's offline copy: the shell plus the single course they chose. The sum of the two
 * gates above by construction — it goes red exactly when one of its halves does — but it is
 * printed and gated because it is the number the learner's device actually stores, and the one
 * "100% works with no network after first load" is paid for in.
 */
const PRECACHE_LIMIT = SHELL_LIMIT + COURSE_LIMIT;

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
      limitBytes: FIRST_PAINT_LIMIT,
      measure: 'gzip',
    },
    {
      // #114 — the issue's "JS ≤ 200 KB gzip": the app bundle plus the workbox runtime and sw.js,
      // all of which a first visit downloads. Unchanged by #207: JS is shell by definition, and
      // this row is the one PRD-engineering §10 names by number. 94.9 KiB measured.
      id: 'js',
      matches: (file) => file.endsWith('.js'),
      limitBytes: 200 * 1024,
      measure: 'gzip',
    },
    {
      // #207 — the shared floor. Everything here is paid for by every learner in every course, so
      // a byte added here is a byte multiplied by the catalogue; a byte added to a course row is
      // paid once, by the people who chose that course.
      id: 'shell',
      matches: isShell,
      limitBytes: SHELL_LIMIT,
      measure: 'gzip',
    },
    ...courses.flatMap((course): Budget[] => [
      {
        // #207 — this course's own content and script subsets. Its own row, so ten more courses
        // cannot spend this course's headroom, and this course cannot spend theirs.
        id: `course:${course.id}`,
        matches: (file) => ownedBy(file, course.id),
        limitBytes: COURSE_LIMIT,
        measure: 'gzip',
      },
      {
        // #207 — what this learner's device downloads and keeps: shell + their one course.
        id: `precache:${course.id}`,
        matches: (file) => isShell(file) || ownedBy(file, course.id),
        limitBytes: PRECACHE_LIMIT,
        measure: 'gzip',
      },
    ]),
    {
      // #115 — the iOS splash set: one already-compressed PNG per iPhone viewport, of which a
      // device ever downloads ONE. Deliberately NOT precached (tools/pwa.ts) and never fetched by
      // the app — Safari pulls the single matching image at Add-to-Home-Screen — so it is neither
      // first-paint nor precache payload. Raw bytes (PNG, like woff2, does not gzip further); the
      // ceiling is repo hygiene — a splash set that grows past ~9 KiB per image is a drawing bug,
      // not a brand decision. Baseline: 70.3 KiB across 11 images.
      id: 'splash',
      matches: (file) => file.startsWith('icons/splash/'),
      limitBytes: 100 * 1024,
      measure: 'raw',
    },
    {
      // #207 — the gate's honesty check. Every row above is a named owner, so a file that matches
      // none of them is a new asset class nobody has budgeted: it fails HERE, by count, rather
      // than riding along invisibly inside a bigger row. Zero files, always.
      id: 'unmetered',
      matches: (file) => owner(file).kind === 'unmetered',
      limitBytes: 0,
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
  const withinFiles = budget.maxFiles === undefined || files.length <= budget.maxFiles;
  return { budget, files, totalBytes, ok: totalBytes <= budget.limitBytes && withinFiles };
}

const kib = (bytes: number): string => `${(bytes / 1024).toFixed(1)} KiB`;

/** `BUDGET shell 216.0 KiB gzip ≤ 230.0 KiB ok — 19 files` (raw budgets drop the ` gzip`). */
export function formatResult(result: BudgetResult): string {
  const verdict = result.ok ? 'ok' : 'OVER';
  const gzip = result.budget.measure === 'gzip' ? ' gzip' : '';
  const within = result.totalBytes <= result.budget.limitBytes;
  return (
    `BUDGET ${result.budget.id} ${kib(result.totalBytes)}${gzip} ` +
    `${within ? '≤' : '>'} ${kib(result.budget.limitBytes)} ${verdict} — ` +
    `${result.files.length} file${result.files.length === 1 ? '' : 's'}`
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

  let failed = false;
  for (const budget of budgets(shippedCourses())) {
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
  return failed ? 1 : 0;
}

const entry = process.argv[1];
if (entry !== undefined && path.resolve(entry) === fileURLToPath(import.meta.url)) {
  process.exit(main());
}
