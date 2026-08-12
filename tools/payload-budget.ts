/**
 * Payload budgets over `dist/` (#113) — the enforcement half of "subset per course at build time".
 *
 *   npm run budget      → one line per budget, exit 1 naming the files when one is blown
 *
 * A subset that regresses is silent: nothing errors when a build ships 800 KB of fonts again, the
 * app just gets slower on the phones PRD-engineering §10 targets, and the offline precache (#90)
 * downloads every byte of it on first visit. So the budget is a build gate, not a doc:
 * `scripts/verify.sh` runs it right after BUILD (`BUDGET ok` in the summary line), reading the
 * `dist/` that build just wrote.
 *
 * Four budgets — `fonts` (raw woff2 bytes), #114's two: `js` (gzip, ≤ 200 KiB — the issue's
 * number) and `total` (gzip — everything a first visit transfers, which on this product is all of
 * dist/ minus the un-precached iOS splash set: the SW precaches the lot), and #115's `splash`
 * (raw, ≤ 100 KiB). `raw` meters bytes on disk (right for woff2/png, which are already
 * compressed); `gzip` meters what the wire carries (GitHub Pages serves text assets
 * Content-Encoding: gzip — zlib's default level is the approximation).
 *
 * The tripwire docs/05-perf-notes.md §4 predicted has now fired: hi-mr L1-M1..M10 ship in the
 * learner build, so Mukta's Devanagari subsets went from near-empty to ~86-90 KiB per weight and
 * `fonts` + `total` blew their #113/#114 limits together (361.2 KiB and 548.1 KiB). Taken in the
 * order §4 wrote down: dropping a Mukta weight needs design sign-off nobody has given, and
 * subsetting to the shipped word index saves nothing when every authored module ships — so the
 * third option applies, "raise the limit with a written justification", and §4 carries it. The
 * limits below are the measured payload plus ~5%: still tripwires, not ceilings.
 */
import { readFileSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { gzipSync } from 'node:zlib';

// Not `new URL('..', import.meta.url)`: Vite rewrites that form (`tools/tokens.ts` says more).
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const DIST = path.join(REPO_ROOT, 'dist');

/* ----------------------------------------------------------------- the budgets */

export interface Budget {
  id: string;
  /** Which shipped files this budget meters, by path relative to `dist/`. */
  matches: (relativePath: string) => boolean;
  /** Hard ceiling, bytes. */
  limitBytes: number;
  /** `raw` = bytes on disk; `gzip` = transfer bytes (what a throttled 4G link actually moves). */
  measure: 'raw' | 'gzip';
}

/** A new budget is one row and zero new plumbing. */
export const BUDGETS: readonly Budget[] = [
  {
    // #113 — woff2 is already compressed, so disk bytes ARE transfer bytes. 150 KiB while the
    // learner build shipped no Devanagari; 380 KiB now that hi-mr L1 ships (361.2 KiB measured,
    // perf-notes §4). Still tight enough to catch the regressions it was built for: a fourth
    // Mukta weight (+~88 KiB) or an unsubset Mukta (557 KiB) trips it.
    id: 'fonts',
    matches: (file) => file.endsWith('.woff2'),
    limitBytes: 380 * 1024,
    measure: 'raw',
  },
  {
    // #114 — the issue's "JS ≤ 200 KB gzip": the app bundle plus the workbox runtime and sw.js,
    // all of which a first visit downloads. Measured 92.9 KiB at the baseline (perf-notes §6).
    id: 'js',
    matches: (file) => file.endsWith('.js'),
    limitBytes: 200 * 1024,
    measure: 'gzip',
  },
  {
    // #114 — everything a first visit transfers: the SW precache is all of dist/ (tools/pwa.ts
    // globs), so dist/ IS the first-visit payload. Was 400 KiB ≈ what Slow 4G (~180 KiB/s
    // effective) moves in ~2.2 s; 580 KiB now (548.1 KiB measured) — ~3.0 s to finish precaching
    // once hi-mr's Devanagari ships. The 2 s TTI gate is unaffected: the fonts that grew load
    // async and `js` is still 94.2 KiB gzip. perf-notes §4 carries the justification.
    //
    // The one carve-out is the iOS splash set (#115): deliberately NOT precached (tools/pwa.ts),
    // never fetched by the app — Safari pulls the single matching image at Add-to-Home-Screen —
    // so it is not first-visit payload and it meters under its own `splash` row instead.
    id: 'total',
    matches: (file) => !file.startsWith('icons/splash/'),
    limitBytes: 580 * 1024,
    measure: 'gzip',
  },
  {
    // #115 — the iOS splash set: one already-compressed PNG per iPhone viewport, of which a
    // device ever downloads ONE. Raw bytes (PNG, like woff2, does not gzip further); the ceiling
    // is repo hygiene — a splash set that grows past ~9 KiB per image is a drawing bug, not a
    // brand decision. Baseline: 70.3 KiB across 11 images.
    id: 'splash',
    matches: (file) => file.startsWith('icons/splash/'),
    limitBytes: 100 * 1024,
    measure: 'raw',
  },
];

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
  return { budget, files, totalBytes, ok: totalBytes <= budget.limitBytes };
}

const kib = (bytes: number): string => `${(bytes / 1024).toFixed(1)} KiB`;

/** `BUDGET fonts 361.2 KiB ≤ 380.0 KiB ok — 9 files` (gzip budgets say so: `94.2 KiB gzip ≤ …`) */
export function formatResult(result: BudgetResult): string {
  const verdict = result.ok ? 'ok' : 'OVER';
  const gzip = result.budget.measure === 'gzip' ? ' gzip' : '';
  return (
    `BUDGET ${result.budget.id} ${kib(result.totalBytes)}${gzip} ` +
    `${result.ok ? '≤' : '>'} ${kib(result.budget.limitBytes)} ${verdict} — ` +
    `${result.files.length} file${result.files.length === 1 ? '' : 's'}`
  );
}

/* ----------------------------------------------------------------- the gate */

function main(): number {
  let shipped: ShippedFile[];
  try {
    shipped = walkDist(DIST);
  } catch {
    console.error(`BUDGET error: no ${DIST} — run \`npx vite build\` first`);
    return 2;
  }

  let failed = false;
  for (const budget of BUDGETS) {
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
