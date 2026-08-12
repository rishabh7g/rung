import { spawnSync } from 'node:child_process';
import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, describe, expect, it } from 'vitest';

/**
 * The harness is exercised in a sandbox: a tmp dir holding a copy of verify.sh and a `bin/`
 * ahead of it on PATH with fake `npm` and `npx`. Nothing here runs the real toolchain — a test
 * that shelled out to `npm run test` would run vitest inside vitest — so what these tests assert
 * is the harness's own behaviour: step order, the one-line summary, the failure block, the exit
 * codes, and which steps did NOT run.
 */
// Not `new URL('./verify.sh', import.meta.url)`: Vite rewrites that literal into an asset URL.
const VERIFY_SH = path.join(path.dirname(fileURLToPath(import.meta.url)), 'verify.sh');

/** Canned vitest tail — the line `test_counts` parses. */
const VITEST_OUT = ['', ' Test Files  5 passed (5)', '      Tests  120 passed (120)', ''].join(
  '\n',
);

type Step = 'TYPECHECK' | 'LINT' | 'PRETTIER' | 'TEST' | 'CONTENT' | 'FONTS' | 'BUILD' | 'BUDGET';

interface Scenario {
  /** Exit code per step; anything unset exits 0. */
  exits?: Partial<Record<Step, number>>;
  /** stdout per step; TEST defaults to a realistic vitest summary. */
  out?: Partial<Record<Step, string>>;
  /** Drop the `tools/` CLIs to exercise the CONTENT / FONTS / BUDGET skips. */
  withTools?: boolean;
  args?: string[];
}

interface Run {
  status: number;
  stdout: string;
  stderr: string;
  /** Every command the harness actually invoked, in order. */
  calls: string[];
  /** `.verify/<step>.log` files that exist after the run. */
  logs: string[];
  dir: string;
}

/** One shim stands in for both `npm` and `npx`; it records the call and replays canned output. */
const SHIM = `#!/usr/bin/env bash
set -uo pipefail
printf '%s %s\\n' "$(basename "$0")" "$*" >> "$FAKE_CALLS"
case "$(basename "$0") $*" in
  "npm run typecheck") key=TYPECHECK ;;
  "npm run lint") key=LINT ;;
  "npm run test") key=TEST ;;
  "npm run content:build") key=CONTENT ;;
  "npm run fonts:build") key=FONTS ;;
  "npm run budget") key=BUDGET ;;
  "npx prettier --check .") key=PRETTIER ;;
  "npx vite build") key=BUILD ;;
  *) printf 'fake: unexpected invocation\\n' >&2; exit 99 ;;
esac
out_var="FAKE_\${key}_OUT"
exit_var="FAKE_\${key}_EXIT"
[ -n "\${!out_var-}" ] && printf '%s\\n' "\${!out_var}"
exit "\${!exit_var-0}"
`;

const STEPS: Step[] = [
  'TYPECHECK',
  'LINT',
  'PRETTIER',
  'TEST',
  'CONTENT',
  'FONTS',
  'BUILD',
  'BUDGET',
];
const LOG_NAMES = ['types', 'lint', 'test', 'content', 'fonts', 'build', 'budget'];

const sandboxes: string[] = [];

afterAll(() => {
  for (const dir of sandboxes) rmSync(dir, { recursive: true, force: true });
});

function verify(scenario: Scenario = {}): Run {
  const dir = mkdtempSync(path.join(tmpdir(), 'rung-verify-'));
  sandboxes.push(dir);

  mkdirSync(path.join(dir, 'scripts'));
  writeFileSync(path.join(dir, 'scripts', 'verify.sh'), readFileSync(VERIFY_SH));
  if (scenario.withTools !== false) {
    mkdirSync(path.join(dir, 'tools'));
    for (const cli of ['content-build.ts', 'font-subset.ts', 'payload-budget.ts']) {
      writeFileSync(path.join(dir, 'tools', cli), '// stand-in for the real CLI\n');
    }
  }

  const bin = path.join(dir, 'bin');
  mkdirSync(bin);
  for (const name of ['npm', 'npx']) {
    writeFileSync(path.join(bin, name), SHIM, { mode: 0o755 });
  }

  const calls = path.join(dir, 'calls.log');
  const env: Record<string, string> = {
    ...(process.env as Record<string, string>),
    PATH: `${bin}:${process.env['PATH'] ?? ''}`,
    FAKE_CALLS: calls,
    FAKE_TEST_OUT: VITEST_OUT,
  };
  for (const step of STEPS) {
    const code = scenario.exits?.[step];
    if (code !== undefined) env[`FAKE_${step}_EXIT`] = String(code);
    const out = scenario.out?.[step];
    if (out !== undefined) env[`FAKE_${step}_OUT`] = out;
  }

  const result = spawnSync(
    'bash',
    [path.join(dir, 'scripts', 'verify.sh'), ...(scenario.args ?? [])],
    {
      cwd: tmpdir(),
      env,
      encoding: 'utf8',
    },
  );

  return {
    status: result.status ?? -1,
    stdout: result.stdout,
    stderr: result.stderr,
    calls: existsSync(calls) ? readFileSync(calls, 'utf8').trim().split('\n').filter(Boolean) : [],
    logs: LOG_NAMES.filter((name) => existsSync(path.join(dir, '.verify', `${name}.log`))),
    dir,
  };
}

describe('a green run', () => {
  it('prints exactly one line and exits 0', () => {
    const run = verify();

    expect(run.status).toBe(0);
    expect(run.stdout).toBe(
      'TYPES ok | LINT ok | TEST 120/120 ok | CONTENT ok | FONTS ok | BUILD ok | BUDGET ok\n',
    );
    expect(run.stderr).toBe('');
  });

  it('runs the seven steps in order, prettier inside LINT', () => {
    expect(verify().calls).toEqual([
      'npm run typecheck',
      'npm run lint',
      'npx prettier --check .',
      'npm run test',
      'npm run content:build',
      'npm run fonts:build',
      'npx vite build',
      'npm run budget',
    ]);
  });

  it('leaves one log per step in .verify/', () => {
    expect(verify().logs).toEqual(['types', 'lint', 'test', 'content', 'fonts', 'build', 'budget']);
  });

  it('reads the count off vitest, including when tests are skipped', () => {
    const run = verify({
      out: { TEST: ' Test Files  5 passed (5)\n      Tests  2 skipped | 118 passed (120)' },
    });

    expect(run.stdout).toContain('TEST 118/120 ok');
  });

  it('falls back to a bare TEST ok if the reporter stops printing a count', () => {
    const run = verify({ out: { TEST: 'all good, trust me' } });

    expect(run.stdout).toBe(
      'TYPES ok | LINT ok | TEST ok | CONTENT ok | FONTS ok | BUILD ok | BUDGET ok\n',
    );
  });

  it('counts a strict content build that ships nothing as ok', () => {
    const run = verify({
      out: { CONTENT: 'CONTENT build: nothing shipped | skipped: hi-mr (2 unverified)' },
    });

    expect(run.status).toBe(0);
    expect(run.stdout).toContain('CONTENT ok');
  });

  it('wipes stale logs from the previous run', () => {
    const run = verify();
    writeFileSync(path.join(run.dir, '.verify', 'stale.log'), 'from a run long past');

    spawnSync('bash', [path.join(run.dir, 'scripts', 'verify.sh')], {
      env: {
        ...process.env,
        PATH: `${run.dir}/bin:${process.env['PATH'] ?? ''}`,
        FAKE_CALLS: `${run.dir}/calls.log`,
      },
      encoding: 'utf8',
    });

    expect(existsSync(path.join(run.dir, '.verify', 'stale.log'))).toBe(false);
  });
});

describe('the first failure stops the run', () => {
  it.each([
    ['TYPES', 'TYPECHECK', 10],
    ['LINT', 'LINT', 20],
    ['LINT', 'PRETTIER', 20],
    ['TEST', 'TEST', 30],
    ['CONTENT', 'CONTENT', 40],
    ['FONTS', 'FONTS', 45],
    ['BUILD', 'BUILD', 50],
    ['BUDGET', 'BUDGET', 60],
  ] as [string, Step, number][])('%s failing (%s) exits %i', (label, step, code) => {
    const run = verify({ exits: { [step]: 1 } });

    expect(run.status).toBe(code);
    expect(run.stdout).toMatch(new RegExp(`^FAIL ${label} \\(exit ${code}\\)\n`));
  });

  it('prints the failing log tail and its path, and nothing else', () => {
    const run = verify({
      exits: { TYPECHECK: 2 },
      out: { TYPECHECK: 'src/App.tsx(1,1): error TS2322' },
    });

    expect(run.stdout).toBe(
      [
        'FAIL TYPES (exit 10)',
        '',
        'src/App.tsx(1,1): error TS2322',
        '',
        `log: ${path.join(run.dir, '.verify', 'types.log')}`,
        '',
      ].join('\n'),
    );
  });

  it('slices the last 20 lines of a long log', () => {
    const lines = Array.from({ length: 40 }, (_, i) => `line ${i + 1}`);
    const run = verify({ exits: { TYPECHECK: 1 }, out: { TYPECHECK: lines.join('\n') } });

    const slice = run.stdout.split('\n').slice(2, -3);
    expect(slice).toEqual(lines.slice(-20));
    expect(slice).toHaveLength(20);
  });

  it('says so when the failing step printed nothing', () => {
    const run = verify({ exits: { TYPECHECK: 1 } });

    expect(run.stdout).toContain('(no output)');
  });

  it('leaves no trace of the steps after it — no calls, no logs', () => {
    const run = verify({ exits: { TYPECHECK: 1 } });

    expect(run.calls).toEqual(['npm run typecheck']);
    expect(run.logs).toEqual(['types']);
  });

  it('fails LINT on formatting alone, with eslint clean', () => {
    const run = verify({ exits: { PRETTIER: 1 }, out: { PRETTIER: '[warn] src/App.tsx' } });

    expect(run.status).toBe(20);
    expect(run.stdout).toContain('FAIL LINT (exit 20)');
    expect(run.stdout).toContain('[warn] src/App.tsx');
    expect(run.calls).toEqual(['npm run typecheck', 'npm run lint', 'npx prettier --check .']);
    expect(run.logs).toEqual(['types', 'lint']);
  });
});

describe('flags', () => {
  it('--fast drops BUILD and the BUDGET that reads its dist, and never invokes either', () => {
    const run = verify({ args: ['--fast'] });

    expect(run.status).toBe(0);
    expect(run.stdout).toBe('TYPES ok | LINT ok | TEST 120/120 ok | CONTENT ok | FONTS ok\n');
    expect(run.calls).not.toContain('npx vite build');
    expect(run.calls).not.toContain('npm run budget');
    expect(run.logs).not.toContain('build');
    expect(run.logs).not.toContain('budget');
  });

  it('reports CONTENT, FONTS and BUDGET skips when the tools are absent', () => {
    const run = verify({ withTools: false });

    expect(run.status).toBe(0);
    expect(run.stdout).toContain('CONTENT skip');
    expect(run.stdout).toContain('FONTS skip');
    expect(run.stdout).toContain('BUDGET skip');
    expect(run.calls).not.toContain('npm run content:build');
    expect(run.calls).not.toContain('npm run fonts:build');
    expect(run.calls).not.toContain('npm run budget');
  });

  it('rejects an unknown argument with usage on stderr', () => {
    const run = verify({ args: ['--turbo'] });

    expect(run.status).toBe(2);
    expect(run.stderr).toContain('verify: unknown argument: --turbo');
    expect(run.calls).toEqual([]);
  });

  it('--help prints usage and runs nothing', () => {
    const run = verify({ args: ['--help'] });

    expect(run.status).toBe(0);
    expect(run.stdout).toBe('usage: scripts/verify.sh [--fast]\n');
    expect(run.calls).toEqual([]);
  });
});
