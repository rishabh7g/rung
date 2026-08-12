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
 * One budget today — fonts, the ≤ 150 KiB from #113. It holds while the native gate (#64) keeps
 * modules out of the learner build; the day hi-mr's content ships, Mukta's Devanagari subsets grow
 * with it and this gate goes red ON PURPOSE — the rebalance options are written down in
 * docs/05-perf-notes.md §4, and #114 (first load ≤ 2s) is expected to add budgets for the JS and
 * total-precache payloads to the same table.
 */
import { readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

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
}

/** #114 extends this table; a new budget is one row and zero new plumbing. */
export const BUDGETS: readonly Budget[] = [
  {
    id: 'fonts',
    matches: (file) => file.endsWith('.woff2'),
    limitBytes: 150 * 1024,
  },
];

/* ----------------------------------------------------------------- the measure */

export interface ShippedFile {
  /** Relative to `dist/`, posix separators. */
  path: string;
  bytes: number;
}

/** Every file under `dir`, recursively — what a first visit downloads is what `dist/` holds. */
export function walkDist(dir: string, prefix = ''): ShippedFile[] {
  return readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const relative = prefix === '' ? entry.name : `${prefix}/${entry.name}`;
      if (entry.isDirectory()) return walkDist(path.join(dir, entry.name), relative);
      return [{ path: relative, bytes: statSync(path.join(dir, entry.name)).size }];
    })
    .sort((a, b) => a.path.localeCompare(b.path));
}

export interface BudgetResult {
  budget: Budget;
  files: ShippedFile[];
  totalBytes: number;
  ok: boolean;
}

export function evaluate(budget: Budget, shipped: readonly ShippedFile[]): BudgetResult {
  const files = shipped.filter((file) => budget.matches(file.path));
  const totalBytes = files.reduce((sum, file) => sum + file.bytes, 0);
  return { budget, files, totalBytes, ok: totalBytes <= budget.limitBytes };
}

const kib = (bytes: number): string => `${(bytes / 1024).toFixed(1)} KiB`;

/** `BUDGET fonts 98.3 KiB ≤ 150.0 KiB ok — 9 files` */
export function formatResult(result: BudgetResult): string {
  const verdict = result.ok ? 'ok' : 'OVER';
  return (
    `BUDGET ${result.budget.id} ${kib(result.totalBytes)} ` +
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
      // The files, heaviest first — the failure block IS the diagnosis, no log spelunking.
      for (const file of [...result.files].sort((a, b) => b.bytes - a.bytes)) {
        console.log(`  ${file.bytes}  ${file.path}`);
      }
    }
  }
  return failed ? 1 : 0;
}

const entry = process.argv[1];
if (entry !== undefined && path.resolve(entry) === fileURLToPath(import.meta.url)) {
  process.exit(main());
}
