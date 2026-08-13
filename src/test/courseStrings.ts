/**
 * Test fixture for a course's strings.json (#80).
 *
 * Built FROM the canonical list rather than hand-written beside it: a key added to
 * `src/course/stringsKeys.ts` is instantly a complete bundle here too, so the tests that are
 * about loading, caching and interpolation keep being about those and never about a fixture that
 * fell behind the contract.
 *
 * Values are English and self-identifying (`hi-mr ritual.constraint {maxWords}`)
 * — a test asserting on a rendered string should read as the assertion it is, and the shell-purity
 * guard is the thing that has opinions about script. Each value carries exactly that key's
 * canonical placeholders, so an interpolation test can pick any key and get the real shape.
 *
 * `tools/fixtures/strings.ts` is the build side's twin. Two builders, one list — which is the
 * thing that must never be copied.
 */
import { STRINGS_KEYS, STRINGS_PLACEHOLDERS } from '../course/stringsKeys.ts';

/** Nests the flat canonical keys the way the authored files are written. */
function nest(flat: ReadonlyMap<string, string>): Record<string, unknown> {
  const root: Record<string, unknown> = {};
  for (const [key, value] of flat) {
    const parts = key.split('.');
    const leaf = parts.pop() as string;
    let node = root;
    for (const part of parts) node = (node[part] ??= {}) as Record<string, unknown>;
    node[leaf] = value;
  }
  return root;
}

/** The flat value a given course's fixture carries for `key` — what an assertion compares against. */
export function stringValue(courseId: string, key: string): string {
  const placeholders = STRINGS_PLACEHOLDERS[key as keyof typeof STRINGS_PLACEHOLDERS] ?? [];
  return [`${courseId} ${key}`, ...placeholders].join(' ');
}

/** A complete, nested strings.json for `courseId` — the shape `loadStrings` fetches. */
export function completeStrings(courseId: string): Record<string, unknown> {
  return nest(new Map(STRINGS_KEYS.map((key) => [key, stringValue(courseId, key)])));
}
