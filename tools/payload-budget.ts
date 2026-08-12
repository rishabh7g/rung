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
 * Three budgets — fonts (raw woff2 bytes, ≤ 150 KiB from #113) and #114's two: `js` (gzip,
 * ≤ 200 KiB — the issue's number) and `total` (gzip, ≤ 400 KiB — everything a first visit
 * transfers, which on this product is all of dist/: the SW precaches the lot). `raw` meters bytes
 * on disk (right for woff2/png, which are already compressed); `gzip` meters what the wire
 * carries (GitHub Pages serves text assets Content-Encoding: gzip — zlib's default level is the
 * approximation). The fonts budget holds while the native gate (#64) keeps modules out of the
 * learner build; the day hi-mr's content ships, Mukta's Devanagari subsets grow ~260 KiB and
 * BOTH fonts and total go red ON PURPOSE — the rebalance options are written down in
 * docs/05-perf-notes.md §4.
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
    // #113 — woff2 is already compressed, so disk bytes ARE transfer bytes.
    id: 'fonts',
    matches: (file) => file.endsWith('.woff2'),
    limitBytes: 150 * 1024,
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
    // globs), so dist/ IS the first-visit payload. 400 KiB ≈ what Slow 4G (~180 KiB/s effective)
    // moves in ~2.2 s — the whole "walk away from the wifi" moment stays cheap, not just the
    // interactive part the 2 s TTI gate covers. Baseline: 204.4 KiB (perf-notes §6).
    id: 'total',
    matches: () => true,
    limitBytes: 400 * 1024,
    measure: 'gzip',
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

/** `BUDGET fonts 98.3 KiB ≤ 150.0 KiB ok — 9 files` (gzip budgets say so: `92.9 KiB gzip ≤ …`) */
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
