/**
 * The list is one list (#76, #80).
 *
 * `tools/strings-check.ts` fails a build over a missing key and `Strings` types every screen that
 * renders one — both off the SAME array. A second copy anywhere would let the build bless a
 * bundle the app cannot read, or the app expect a key no build ever demanded, which is exactly
 * what a fixed key list exists to prevent. So this checks the two things prose cannot: that the
 * declaration is unique across the repo, and that the type still derives from it.
 */
import { describe, expect, it } from 'vitest';
import { STRINGS_KEYS, STRINGS_PLACEHOLDERS, type StringsKey } from './stringsKeys.ts';
import type { Strings } from './strings.ts';

const CANONICAL = 'src/course/stringsKeys.ts';

/** Every hand-written TypeScript file in the repo — `src/`, the build CLIs, the harness's tests. */
const REPO_SOURCES: Readonly<Record<string, string>> = Object.fromEntries(
  Object.entries({
    ...import.meta.glob<string>('../**/*.{ts,tsx}', {
      query: '?raw',
      import: 'default',
      eager: true,
    }),
    ...import.meta.glob<string>('../../{tools,scripts}/**/*.ts', {
      query: '?raw',
      import: 'default',
      eager: true,
    }),
  }).map(([file, source]) => [repoPath(file), source]),
);

/**
 * Glob keys come back relative to THIS file (`./stringsKeys.ts`, `../App.tsx`,
 * `../../tools/validate.ts`); a failure should name repo-relative paths instead.
 */
function repoPath(key: string): string {
  const resolved: string[] = [];
  for (const part of `src/course/${key}`.split('/')) {
    if (part === '' || part === '.') continue;
    if (part === '..') resolved.pop();
    else resolved.push(part);
  }
  return resolved.join('/');
}

/** The files that DECLARE a table (importing one, or naming it in a comment, does not count). */
function declaringFiles(name: string): string[] {
  const declaration = new RegExp(`export const ${name}\\b`);

  return Object.entries(REPO_SOURCES)
    .filter(([, source]) => declaration.test(source))
    .map(([file]) => file)
    .sort();
}

/** Fails to compile if `keyof Strings` ever stops being exactly `StringsKey`. */
type Exact<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;
const STRINGS_DERIVES_FROM_THE_LIST: Exact<keyof Strings, StringsKey> = true;

describe('the canonical key list', () => {
  it('is declared exactly once, in the course layer', () => {
    expect(Object.keys(REPO_SOURCES)).toContain(CANONICAL);
    expect(declaringFiles('STRINGS_KEYS')).toEqual([CANONICAL]);
    expect(declaringFiles('STRINGS_PLACEHOLDERS')).toEqual([CANONICAL]);
  });

  it('is what the app types itself against — Strings has these keys and no others', () => {
    expect(STRINGS_DERIVES_FROM_THE_LIST).toBe(true);

    const bundle = Object.fromEntries(STRINGS_KEYS.map((key) => [key, key])) as Strings;
    expect(Object.keys(bundle)).toEqual([...STRINGS_KEYS]);
  });

  it('carries a placeholder row for every key — the two tables are welded', () => {
    expect(Object.keys(STRINGS_PLACEHOLDERS).sort()).toEqual([...STRINGS_KEYS].sort());
  });
});
