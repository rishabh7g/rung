/**
 * Course strings — every word the learner reads (#80, PRD §4, §8 F0).
 *
 * The shell has NO course-specific strings: it renders what the active course's strings.json
 * ships, or it renders nothing. That is one half of a contract whose other half is mechanical —
 * `src/shellPurity.test.ts` fails the build if a course script ever appears in `src/`, and
 * `tools/strings-check.ts` fails the build if a bundle is missing a key. Between them there is no
 * gap for a hardcoded fallback to hide in, which is why access here is NON-OPTIONAL:
 * `strings['retry.title']` is a `string`, never `string | undefined`, because a bundle that could
 * not supply it never got built.
 *
 * Shape: the file is authored nested (`{"ritual":{"check":{"copy":…}}}`) and read flat
 * (`strings['ritual.check.copy']`), because the canonical list is dot-paths and the app should
 * index it with exactly the key the contract names. `parseStrings` walks the canonical list, not
 * the file: keys the app will never read are the build's business (`unknown key`, #76), not a
 * reason to fail a learner's boot.
 *
 * Access is `useStrings()`, off `CourseProvider` — the provider loads the active course's bundle
 * as part of boot, so a screen that has mounted has its microcopy, the same way it already has
 * its course.
 */
import { createContext, useContext } from 'react';
import { STRINGS_KEYS, type StringsKey } from './stringsKeys.ts';

/**
 * One course's microcopy, keyed by the canonical dot-paths — DERIVED from `STRINGS_KEYS`, so the
 * type and the build's key list cannot drift: adding a key to the list is instantly a compile
 * error everywhere a `Strings` object is built by hand.
 */
export type Strings = Readonly<Record<StringsKey, string>>;

/**
 * Every way a bundle can fail to become usable `Strings` — offline, 404, not JSON, wrong shape,
 * missing or blank key. One type, so the provider can tell "the content layer is broken" (its
 * error screen) from a bug in its own code, exactly as `ManifestError` does for the manifest.
 */
export class StringsError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'StringsError';
  }
}

/** Relative to `BASE_URL`, which Vite guarantees ends in a slash. */
function stringsPath(courseId: string): string {
  return `content/${courseId}/strings.json`;
}

/**
 * One entry per course, and the entry is the PROMISE rather than the value: two callers asking
 * during boot share a single request, so there is exactly one fetch per course per page load.
 * Bundles are static and precached by the service worker — they cannot change under a running
 * app — so a success is cached for the life of the page, and a course switch back and forth
 * costs nothing.
 */
const cache = new Map<string, Promise<Strings>>();

/** Loads (once) and parses a course's bundle. Rejects with `StringsError`. */
export function loadStrings(courseId: string): Promise<Strings> {
  const cached = cache.get(courseId);
  if (cached !== undefined) return cached;

  const pending = fetchStrings(courseId).catch((error: unknown) => {
    // Only a SUCCESS is cached forever: a failed load (offline first load) may be retried.
    cache.delete(courseId);
    throw error;
  });
  cache.set(courseId, pending);
  return pending;
}

/**
 * Tests only: drops the cache so each case loads cold. The app never calls this — a bundle is
 * loaded once per course per page load, by design.
 */
export function resetStringsCache(): void {
  cache.clear();
}

async function fetchStrings(courseId: string): Promise<Strings> {
  // Read BASE_URL per call, not at module load: it is '/' in dev and tests and '/rung/' (or
  // whatever the host mounts) in a build, and the app must work under either.
  const url = `${import.meta.env.BASE_URL}${stringsPath(courseId)}`;

  let response: Response;
  try {
    response = await fetch(url);
  } catch (cause) {
    throw new StringsError(`${url}: could not be fetched`, { cause });
  }
  if (!response.ok) {
    throw new StringsError(`${url}: fetch failed with HTTP ${response.status}`);
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch (cause) {
    throw new StringsError(`${url}: is not valid JSON`, { cause });
  }

  return parseStrings(payload, url);
}

/**
 * The runtime tripwire. The build already validates every authored bundle (#76); what this guards
 * is the artefact actually served — a stale cache, a half-copied deploy, a hand-edited
 * `public/content/`. Anything it lets through is a `Strings` the rest of the app may trust
 * without a single `?? 'fallback'`.
 */
export function parseStrings(payload: unknown, source = 'strings.json'): Strings {
  if (payload === null || typeof payload !== 'object' || Array.isArray(payload)) {
    throw new StringsError(`${source}: must be a JSON object of microcopy keys`);
  }

  const bundle: Record<string, string> = {};
  const unusable: string[] = [];

  for (const key of STRINGS_KEYS) {
    const value = readPath(payload as Record<string, unknown>, key);
    if (typeof value !== 'string' || value.trim() === '') {
      unusable.push(key);
      continue;
    }
    bundle[key] = value;
  }

  if (unusable.length > 0) {
    throw new StringsError(
      `${source}: incomplete bundle — no usable value for ${unusable.join(', ')}`,
    );
  }

  return bundle as Strings;
}

/** Reads a canonical dot-path out of the nested file: `ritual.check.copy` → `{ritual:{check:…}}`. */
function readPath(root: Record<string, unknown>, key: string): unknown {
  let node: unknown = root;
  for (const part of key.split('.')) {
    if (node === null || typeof node !== 'object' || Array.isArray(node)) return undefined;
    node = (node as Record<string, unknown>)[part];
  }
  return node;
}

/* ------------------------------------------------------------- interpolation */

/** `{sentenceCount}` and friends. Non-greedy by construction: braces cannot nest. */
const PLACEHOLDER = /\{([^{}]*)\}/g;

/**
 * Fills a value's `{placeholders}` — `interpolate(s.ordinal, { n: 3 })`. Deliberately not a
 * library and not a template language: the only thing a translation may carry is a name in
 * braces, and which names each key carries is fixed by `STRINGS_PLACEHOLDERS` and enforced at
 * build time (#76), so there is nothing left for a runtime to be clever about.
 *
 * A placeholder with no value is left VERBATIM (and warned), never blanked: `{ordinal}` on screen
 * is ugly and fixable, while a silent gap reads as finished copy that has quietly lost the
 * sentence number. Values the template does not mention are simply unused — the same call site
 * serves a course whose word order needs one of them and one whose does not.
 */
export function interpolate(
  template: string,
  values: Readonly<Record<string, string | number>>,
): string {
  return template.replace(PLACEHOLDER, (placeholder, name: string) => {
    const value = values[name];
    if (value === undefined) {
      console.warn(`strings: no value for ${placeholder} — rendering it verbatim`);
      return placeholder;
    }
    return String(value);
  });
}

/* ------------------------------------------------------------------- access */

/**
 * The active course's bundle. `CourseProvider` fills it during boot; `null` means the tree above
 * a screen has no provider, which `useStrings()` turns into a loud wiring error rather than a
 * screen full of blanks.
 */
export const StringsContext = createContext<Strings | null>(null);

/** The microcopy read handle. Throws when called above the provider — a wiring bug. */
export function useStrings(): Strings {
  const strings = useContext(StringsContext);
  if (strings === null) {
    throw new Error('useStrings() must be called inside <CourseProvider>');
  }
  return strings;
}
