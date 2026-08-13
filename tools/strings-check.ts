/**
 * strings.json completeness check (#76) — PRD §6.5, step 5 of the content pipeline:
 * "validate strings.json completeness against a fixed key list (missing key = build failure)".
 *
 * The course build calls `checkStrings` per course, in its read-and-validate phase, and pushes
 * whatever comes back onto its error list — so an incomplete bundle fails the build before a
 * single file is written. There is no CLI and no fallback copy: the shell renders what the course
 * ships or it renders nothing (PRD §4), which is exactly why this is a build failure and not a
 * warning.
 *
 * Four rules, all keyed off `src/course/stringsKeys.ts` (the only list in the repo):
 *   1. every canonical key is present — flattened on `.`, because the authored files are nested;
 *   2. every value is a non-empty string;
 *   3. no extra keys — the typo tripwire: `ritual.stepTitle.checked` is a key the app will never
 *      read, and without this rule it would sit beside a "missing" `check` looking harmless;
 *   4. placeholder parity — a value carries exactly its canonical `{placeholders}`, so a
 *      translation cannot silently drop `{ordinal}` (the learner loses the sentence number) or
 *      invent `{name}` (the braces render verbatim). PR #124 checked this by hand across three
 *      bundles; this makes it mechanical.
 *
 * Every message names the course and the key, because "a string is missing" is useless when three
 * courses ship 26 keys each.
 */
import { STRINGS_KEYS, STRINGS_PLACEHOLDERS, type StringsKey } from '../src/course/stringsKeys.ts';

/* ------------------------------------------------------------------ contract */

/** `{maxWords}` and friends. Non-greedy by construction: braces cannot nest. */
const PLACEHOLDER = /\{[^{}]*\}/g;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

/**
 * Nested object -> dot-paths: `{"ritual":{"stepTitle":{"check":"…"}}}` becomes
 * `ritual.stepTitle.check`.
 *
 * Only non-empty plain objects are containers. An empty one (`"ritual": {}`) and an array are
 * kept as leaf values, so they surface as "must be a non-empty string" or "unknown key" instead
 * of vanishing from the comparison — a branch that disappears silently is how a bundle passes a
 * completeness check while shipping nothing.
 */
export function flattenStrings(value: Record<string, unknown>, prefix = ''): Map<string, unknown> {
  const flat = new Map<string, unknown>();
  for (const [key, child] of Object.entries(value)) {
    const path = prefix === '' ? key : `${prefix}.${key}`;
    if (isRecord(child) && Object.keys(child).length > 0) {
      for (const [nested, leaf] of flattenStrings(child, path)) flat.set(nested, leaf);
    } else {
      flat.set(path, child);
    }
  }
  return flat;
}

/** What a value IS, for a message that says why it was rejected. */
function describe(value: unknown): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'an array';
  if (isRecord(value)) return Object.keys(value).length === 0 ? 'an empty object' : 'an object';
  if (typeof value === 'string') return value === '' ? 'an empty string' : 'a blank string';
  return `a ${typeof value}`;
}

/** The `{placeholders}` in a value, as a set — order and repetition are the translator's business. */
function placeholdersIn(value: string): Set<string> {
  return new Set(value.match(PLACEHOLDER) ?? []);
}

function listPlaceholders(names: Iterable<string>): string {
  const sorted = [...names].sort();
  return sorted.length === 0 ? 'none' : sorted.join(' ');
}

/* --------------------------------------------------------------------- check */

/**
 * Returns one line per problem, each naming `<courseId>/strings.json` and the key; an empty array
 * means the bundle is complete. The build pushes these verbatim onto its own error list.
 */
export function checkStrings(json: unknown, courseId: string): string[] {
  const label = `${courseId}/strings.json`;
  if (!isRecord(json)) {
    return [`${label}: must be a JSON object of microcopy keys, not ${describe(json)}`];
  }

  const flat = flattenStrings(json);
  const issues: string[] = [];
  const canonical: readonly string[] = STRINGS_KEYS;

  for (const key of STRINGS_KEYS) {
    if (!flat.has(key)) {
      issues.push(`${label}: missing key "${key}"`);
      continue;
    }
    const value = flat.get(key);
    if (typeof value !== 'string' || value.trim() === '') {
      issues.push(`${label}: "${key}" must be a non-empty string — got ${describe(value)}`);
      continue;
    }
    issues.push(...checkPlaceholders(value, key, label));
  }

  for (const key of flat.keys()) {
    if (canonical.includes(key)) continue;
    issues.push(
      `${label}: unknown key "${key}" — not in the canonical list (src/course/stringsKeys.ts)`,
    );
  }

  return issues;
}

/** Rule 4, split out: parity against the canonical set, plus the stray brace that hides a typo. */
function checkPlaceholders(value: string, key: StringsKey, label: string): string[] {
  const issues: string[] = [];
  const expected = new Set(STRINGS_PLACEHOLDERS[key]);
  const found = placeholdersIn(value);

  const missing = [...expected].filter((name) => !found.has(name));
  const unexpected = [...found].filter((name) => !expected.has(name));
  if (missing.length > 0 || unexpected.length > 0) {
    issues.push(
      `${label}: "${key}" placeholders — expected ${listPlaceholders(expected)}, ` +
        `found ${listPlaceholders(found)}`,
    );
  }

  // `{ordinal` renders as literal text and matches nothing above; catch it where it is written.
  if (/[{}]/.test(value.replace(PLACEHOLDER, ''))) {
    issues.push(`${label}: "${key}" has a stray { or } — placeholders are written {likeThis}`);
  }

  return issues;
}
