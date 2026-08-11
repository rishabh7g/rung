/**
 * Shell purity (#80) — the mechanical half of "the shell has no course-specific strings"
 * (PRD §4, §8 F0).
 *
 * Every word a learner reads ships in the active course's `strings.json` and reaches the screen
 * through `useStrings()`. Prose cannot enforce that; a scan can: no file the app ships may
 * contain a codepoint of a course's script. hi-mr writes Devanagari and en-ar writes Arabic, so
 * either one appearing in `src/` means a string got hardcoded — or is one paste away from being
 * hardcoded — and the test fails naming the file and line.
 *
 * Sources come from Vite's `import.meta.glob(…, '?raw')` rather than `node:fs`: `src/` is
 * browser-typed (`tsconfig.app.json` carries no node types), and a guard over the shell has no
 * business being the one file that changes that.
 *
 * Three deliberate edges:
 *
 *   • **Comments count.** A doc comment is where a pasted string waits before it becomes code, and
 *     a scan that skipped comments would teach exactly that habit. Worked examples in a course's
 *     script belong in tests, which is where they are already exercised (`engine/surface.test.ts`).
 *   • **English is not the target.** The boot error copy and, later, Settings section headers are
 *     shell furniture and stay permitted: this guard is about course scripts, not about English.
 *     What keeps English honest is review plus the fact that no learner-facing screen has a string
 *     of its own to render.
 *   • **Escapes are out of reach.** The scan reads source text, so a `'\u0936'` escape would slip
 *     past it. That is not the failure mode it exists for — accidental copy-paste is — and it is
 *     why this file names its scripts by Unicode property and builds its planted samples at
 *     runtime: the guard's own source carries no character of either script.
 */
import { describe, expect, it } from 'vitest';

/* ----------------------------------------------------------------- the rule */

/**
 * The scripts the courses are written in. Devanagari (hi-mr) and Arabic (en-ar), matched by
 * Unicode Script property rather than a hand-written range, so the supplements, the extended
 * blocks and the Arabic presentation forms are all covered and none of it has to be maintained.
 * Punctuation shared between scripts (the danda U+0964, the Arabic comma) is `Script=Common` and
 * deliberately not matched: a stray danda is not course copy, and a sentence that is will carry
 * letters too. A new course in a new script adds a row here.
 */
const COURSE_SCRIPTS = [
  { script: 'Devanagari', pattern: /\p{Script=Devanagari}/u },
  { script: 'Arabic', pattern: /\p{Script=Arabic}/u },
] as const;

/**
 * Files exempt from the scan, repo-relative — ONE, the entry this guard was written expecting.
 *
 * `src/dev/TypeSpecimen.tsx` is the `/dev/type` font specimen (#85). Its whole job is rendering
 * Devanagari — the conjuncts and the reph a bundled Mukta either draws at 18px or does not — so
 * the scan and the page cannot both be right. What makes the exemption safe is not that the text
 * is a specimen but that it never ships: the route is `import.meta.env.DEV ? … : null`
 * (`src/dev/typeRoute.tsx`), so a production build tree-shakes the module out entirely, which
 * `dist/` is grepped for in that ticket. The rule the guard protects — every learner-facing word
 * ships in the course bundle — is untouched: nothing here is learner-facing.
 *
 * The pattern is not widened and the list stays exactly this long. An exemption nobody had to
 * argue for is how a guard rots, so the next one is another conscious edit in another diff.
 */
const ALLOWED: readonly string[] = ['src/dev/TypeSpecimen.tsx'];

/** Every TypeScript file under `src/`, keyed the way a failure should name it: `src/App.tsx`. */
const SOURCES: Readonly<Record<string, string>> = Object.fromEntries(
  Object.entries(
    import.meta.glob<string>('./**/*.{ts,tsx}', {
      query: '?raw',
      import: 'default',
      eager: true,
    }),
  ).map(([file, source]) => [file.replace('./', 'src/'), source]),
);

/**
 * The files the app ships. Tests are excluded because they must name the thing they check —
 * `normalizeSurface` is tested against real Marathi — and `src/test/` is fixtures, which are the
 * same case. Nothing else is: everything else under `src/` is shell.
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
  script: string;
  /** The offending line, trimmed — enough to see what got pasted where. */
  text: string;
}

/** One violation per line per script: a paste is usually a whole line, and that is the fix unit. */
function scanSource(file: string, source: string): Violation[] {
  const violations: Violation[] = [];

  source.split('\n').forEach((line, index) => {
    for (const { script, pattern } of COURSE_SCRIPTS) {
      if (pattern.test(line)) {
        violations.push({ file, line: index + 1, script, text: line.trim() });
      }
    }
  });

  return violations;
}

/** Devanagari, built at runtime so this file's own source stays free of it. */
const PLANTED_DEVANAGARI = String.fromCodePoint(0x936, 0x93f, 0x921, 0x940);
/** Arabic, likewise. */
const PLANTED_ARABIC = String.fromCodePoint(0x627, 0x633, 0x645, 0x64a);

/* ---------------------------------------------------------------- the guard */

describe('shell purity', () => {
  it('finds no course script anywhere in the shell', () => {
    const violations = shellFiles().flatMap((file) => scanSource(file, SOURCES[file] ?? ''));

    expect(
      violations,
      violations
        .map((violation) => `${violation.file}:${violation.line} carries ${violation.script}`)
        .join('\n')
        .concat(
          '\nEvery learner-facing word ships in the course bundle and is read with useStrings() (PRD §4).',
        ),
    ).toEqual([]);
  });

  it('scans the real tree — the shell files, and not the tests beside them', () => {
    const files = shellFiles();

    expect(files).toContain('src/App.tsx');
    expect(files).toContain('src/course/strings.ts');
    expect(files.some((file) => /\.test\.tsx?$/.test(file))).toBe(false);
    expect(files.some((file) => file.startsWith('src/test/'))).toBe(false);
  });

  it('exempts exactly one file — the /dev/type specimen (#85), which no build ships', () => {
    expect(ALLOWED).toEqual(['src/dev/TypeSpecimen.tsx']);
  });

  it('exempts a file that exists — a renamed page would leave the hole open behind it', () => {
    for (const file of ALLOWED) expect(Object.keys(SOURCES)).toContain(file);
  });
});

describe('the scanner itself', () => {
  it('catches a planted Devanagari string', () => {
    const planted = `const label = '${PLANTED_DEVANAGARI}';`;

    expect(scanSource('src/Planted.tsx', `const ok = 'fine';\n${planted}\n`)).toEqual([
      { file: 'src/Planted.tsx', line: 2, script: 'Devanagari', text: planted },
    ]);
  });

  it('catches a planted Arabic string — en-ar is a course, so its script is course copy too', () => {
    const planted = `<p>${PLANTED_ARABIC}</p>`;

    expect(scanSource('src/Planted.tsx', planted)).toEqual([
      { file: 'src/Planted.tsx', line: 1, script: 'Arabic', text: planted },
    ]);
  });

  it('catches script hidden in a comment — that is where a paste waits to become code', () => {
    const planted = ` * the cue label reads ${PLANTED_DEVANAGARI}`;

    expect(scanSource('src/Planted.ts', planted)).toHaveLength(1);
  });

  it('leaves English shell furniture alone — the guard is about course scripts', () => {
    const furniture = '<p>This build has no course content to show.</p>\n// SETTINGS · DATA\n';

    expect(scanSource('src/BootScreens.tsx', furniture)).toEqual([]);
  });

  it('skips an allow-listed file, which is what #85 will use', () => {
    expect(shellFiles(['src/App.tsx'])).not.toContain('src/App.tsx');
    expect(shellFiles(['src/App.tsx'])).toContain('src/course/strings.ts');
  });
});
