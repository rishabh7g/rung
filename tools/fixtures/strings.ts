/**
 * A complete strings.json for a fixture course tree, built FROM the canonical list (#76) rather
 * than hand-written beside it: add a key to `tools/strings-keys.ts` and every fixture tree in the
 * test suite still scaffolds a passing bundle, so the tests that are about the gate keep being
 * about the gate.
 *
 * Test-support only — nothing under `src/` or the CLIs import this.
 */
import { STRINGS_KEYS, STRINGS_PLACEHOLDERS } from '../strings-keys.ts';

/** Writes `value` at a dot-path, creating the objects on the way down. */
function setPath(root: Record<string, unknown>, key: string, value: string): void {
  const parts = key.split('.');
  const leaf = parts.pop() as string;
  let node = root;
  for (const part of parts) {
    const next = node[part];
    if (typeof next === 'object' && next !== null) node = next as Record<string, unknown>;
    else node = (node[part] = {}) as Record<string, unknown>;
  }
  node[leaf] = value;
}

/**
 * Every canonical key, nested as the authored files are, with a recognisable value that carries
 * exactly that key's placeholders — `hi-mr ritual.constraint {sentenceCount} {maxWords}`.
 */
export function completeStrings(courseId: string): Record<string, unknown> {
  const bundle: Record<string, unknown> = {};
  for (const key of STRINGS_KEYS) {
    setPath(bundle, key, [`${courseId} ${key}`, ...STRINGS_PLACEHOLDERS[key]].join(' '));
  }
  return bundle;
}
