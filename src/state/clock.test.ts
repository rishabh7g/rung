import { afterEach, describe, expect, it, vi } from 'vitest';
import { systemClock } from './clock.ts';

/* ----------------------------------------------------------------- the clock */

afterEach(() => {
  vi.useRealTimers();
});

describe('systemClock', () => {
  it('answers an ISO-8601 instant in UTC', () => {
    vi.useFakeTimers();
    vi.setSystemTime(1_770_000_000_000);

    expect(systemClock()).toBe('2026-02-02T02:40:00.000Z');
  });

  it('reads the wall clock every call, so a stamp is never a module-load leftover', () => {
    vi.useFakeTimers();
    vi.setSystemTime(0);
    const first = systemClock();
    vi.setSystemTime(60_000);

    expect(systemClock()).not.toBe(first);
  });
});

/* ------------------------------------------------------- the calendar-free scan */

/**
 * The mechanical half of "clock.ts is the only date-construction site" (#82,
 * docs/01-plan.md §6) — the same shape of guard as `shellPurity.test.ts` (#80), for the same
 * reason: a rule that lives only in prose is a rule that decays one convenient `Date.now()` at a
 * time, and each one is a learner's ladder quietly depending on what time it is.
 *
 * The scan reads source text, so it counts comments too — deliberately, as in #80: a doc comment
 * is where a call waits before it becomes code. Name the rule in prose without writing the call
 * and the guard stays quiet.
 *
 * What it cannot see: `globalThis['Da' + 'te']`, an alias, or a date built inside a dependency.
 * That is not the failure mode it exists for — the ordinary, well-meant timestamp is — and
 * `ALLOWED` is one file long so the exemption stays an argument someone has to make.
 */
const DATE_CONSTRUCTION = [
  { name: 'new Date', pattern: /\bnew\s+Date\b/ },
  { name: 'Date.now', pattern: /\bDate\s*\.\s*now\b/ },
] as const;

/** The one file allowed to construct a date. Everything else asks it for the time. */
const ALLOWED: readonly string[] = ['src/state/clock.ts'];

/**
 * Every TypeScript file under `src/`, keyed the way a failure should name it: `src/App.tsx`.
 * The pattern is root-absolute rather than relative to this file, so the keys read the same from
 * `src/state/` as #80's do from `src/` — a relative one comes back collapsed (`./store.ts`).
 */
const SOURCES: Readonly<Record<string, string>> = Object.fromEntries(
  Object.entries(
    import.meta.glob<string>('/src/**/*.{ts,tsx}', {
      query: '?raw',
      import: 'default',
      eager: true,
    }),
  ).map(([file, source]) => [file.replace(/^\//, ''), source]),
);

/**
 * The files the app ships. Tests are excluded — a test that pins the clock has to name it, and
 * this file is the proof — and so is `src/test/`, which is fixtures.
 */
function shellFiles(allowed: readonly string[] = ALLOWED): string[] {
  return Object.keys(SOURCES)
    .filter(
      (file) =>
        !/\.test\.tsx?$/.test(file) && !file.startsWith('src/test/') && !allowed.includes(file),
    )
    .sort();
}

interface Violation {
  file: string;
  line: number;
  call: string;
  /** The offending line, trimmed — enough to see what got written where. */
  text: string;
}

function scanSource(file: string, source: string): Violation[] {
  const violations: Violation[] = [];

  source.split('\n').forEach((line, index) => {
    for (const { name, pattern } of DATE_CONSTRUCTION) {
      if (pattern.test(line)) {
        violations.push({ file, line: index + 1, call: name, text: line.trim() });
      }
    }
  });

  return violations;
}

describe('the calendar-free discipline', () => {
  it('constructs a date nowhere but in clock.ts', () => {
    const violations = shellFiles().flatMap((file) => scanSource(file, SOURCES[file] ?? ''));

    expect(
      violations,
      violations
        .map((violation) => `${violation.file}:${violation.line} calls ${violation.call}`)
        .join('\n')
        .concat(
          '\nTake a Clock from src/state/clock.ts instead: the engine is pure and the product has no calendar (Invariant 2, docs/01-plan.md §6).',
        ),
    ).toEqual([]);
  });

  it('scans the real tree — the shell files, and not the tests beside them', () => {
    const files = shellFiles();

    expect(files).toContain('src/state/store.ts');
    expect(files).toContain('src/course/CourseProvider.tsx');
    expect(files).not.toContain('src/state/clock.ts');
    expect(files.some((file) => /\.test\.tsx?$/.test(file))).toBe(false);
    expect(files.some((file) => file.startsWith('src/test/'))).toBe(false);
  });

  it('exempts clock.ts and nothing else', () => {
    expect(ALLOWED).toEqual(['src/state/clock.ts']);
  });
});

describe('the scanner itself', () => {
  it('catches a constructed date', () => {
    const planted = 'const passedAt = new Date().toISOString();';

    expect(scanSource('src/Planted.ts', `const ok = 'fine';\n${planted}\n`)).toEqual([
      { file: 'src/Planted.ts', line: 2, call: 'new Date', text: planted },
    ]);
  });

  it('catches a read of the epoch clock', () => {
    const planted = 'const startedAt = Date.now();';

    expect(scanSource('src/Planted.ts', planted)).toEqual([
      { file: 'src/Planted.ts', line: 1, call: 'Date.now', text: planted },
    ]);
  });

  it('catches a call hidden in a comment — that is where one waits to become code', () => {
    expect(scanSource('src/Planted.ts', ' * cheaper than Date.now() here')).toHaveLength(1);
  });

  it('leaves the type and the prose alone — Date as a type is not a clock', () => {
    const fine = 'function since(at: Date): number {\n// the wall clock lives in clock.ts\n';

    expect(scanSource('src/Planted.ts', fine)).toEqual([]);
  });
});
