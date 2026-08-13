/**
 * Course manifest — the front door of the course layer (#79, PRD §4, §8 F0).
 *
 * The app is course-agnostic: it knows a manifest, not a language pair. Adding a course is
 * adding a folder plus a manifest row, with zero app-shell changes — so everything downstream
 * (levels, strings, modules, the word index, per-course state) resolves through the `Course`
 * this module hands out, and nothing in `src/` may hardcode a course id.
 *
 * What it reads is the EMITTED manifest under `public/content/`, never the authored
 * `content/courses.json`. The two differ on purpose (#74, PR #125):
 *
 *   authored   [ {id: 'hi-mr', …}, … ]                        ← PRD §4 array
 *   emitted    { courses: [ … ] }                             ← strict build
 *   emitted    { devBuild: true, devBuildNote: '…', courses }  ← dev build (`npm run dev`)
 *
 * A JSON array cannot carry a top-level marker, and the build needs one so a dev artefact
 * (unverified and/or fixture content) can never quietly pass for a learner build. Both modes
 * emit the envelope, so there is exactly one shape to parse here. `devBuild` rides along to
 * the context for a later dev-banner ticket; absent on a strict build, so `=== true` is the
 * whole check.
 *
 * Empty is a failure, not a quiet nothing: `npm run build` shipped zero courses for as long as
 * the gate held every module back, and an app with no active course has nothing to render. That
 * path shows the content-error screen — which is the honest answer, and the reason the tripwire
 * exists. hi-mr L1-M1..M10 have shipped since 2026-08-13 (#110/#111), so an empty manifest is now
 * a build failure rather than the expected state.
 */

/** How a course writes its L2: `native` shows the script, `romanized` shows Latin (PRD §7). */
export type ScriptMode = 'native' | 'romanized';
export type Direction = 'ltr' | 'rtl';

const SCRIPT_MODES: readonly string[] = ['native', 'romanized'];
const DIRECTIONS: readonly string[] = ['ltr', 'rtl'];

/**
 * A BCP-47 tag, conservatively: language, optional script, optional region — `hi`, `mr`,
 * `ar-Latn`, `pt-BR`. Deliberately narrower than the RFC (no variants, no extensions): a course
 * manifest names a language, and a tag this file cannot parse is a typo, not a use case.
 * Kept in sync with `tools/content-build.ts`, which rejects the same shape at build time.
 */
const LANGUAGE_TAG = /^[a-z]{2,3}(-[A-Z][a-z]{3})?(-([A-Z]{2}|\d{3}))?$/;

/**
 * One manifest row (PRD §4). The nine fields are required; a course may carry its own extra
 * metadata and it rides along rather than being rejected — en-ar declares a `romanizationNote`,
 * and a dev build's fixture courses carry `fixture: true`. Unknown keys are kept as-is, the same
 * way the build-time validator keeps them (`tools/validate.ts` `validateManifest`).
 */
export interface Course {
  id: string;
  l1: string;
  l2: string;
  /**
   * The L1 as a BCP-47 tag (#186). `l1` is a NAME, written for the learner's eye ("Hindi"); this
   * is the machine's half of the same fact, and it is what the document declares — the chrome,
   * the course's microcopy and every gloss it writes are in this language.
   */
  l1Tag: string;
  /**
   * The L2 as a BCP-47 tag (#186) — the language being taught, which is a DIFFERENT language
   * from the one the app speaks in. What a romanized course actually renders is
   * `l2Written(course).display.lang`, not this: this is the language, that is the language as
   * written.
   */
  l2Tag: string;
  /**
   * Which way the L2 runs IN ITS OWN SCRIPT (#196) — `rtl` for `ar`, `ltr` for `mr` and `es`.
   *
   * A fact about the language, declared beside its tag, and NOT the same fact as `dir`: en-ar
   * reads `dir: 'ltr'` because everything the learner sees on that course — the English chrome
   * and the romanized L2 — runs left to right, while its quiet native line is Arabic and runs
   * right to left. One course, two directions; the row has to be able to say both.
   */
  l2Dir: Direction;
  pairLabel: string;
  scriptMode: ScriptMode;
  /** The direction of the course as the learner meets it: the chrome, and the L2 as printed. */
  dir: Direction;
  /** en-ar's romanization scheme, in the course's own words. Absent on native courses. */
  romanizationNote?: string;
  /** Dev fixture course (PRD §17) — only a `--with-fixtures` build emits one. */
  fixture?: boolean;
}

/** The parsed envelope: the courses plus the one thing the envelope exists to carry. */
export interface Manifest {
  courses: Course[];
  /** True only on a relaxed build. Never trust a bundle's content without checking this. */
  devBuild: boolean;
}

/**
 * Every way the manifest can fail to become a usable `Manifest` — offline, 404, not JSON,
 * wrong shape, no courses. One type, so callers (the provider's error screen) can tell "the
 * content layer is broken" from a bug in their own code.
 */
export class ManifestError extends Error {
  constructor(message: string, options?: ErrorOptions) {
    super(message, options);
    this.name = 'ManifestError';
  }
}

/** Relative to `BASE_URL`, which Vite guarantees ends in a slash. */
const MANIFEST_PATH = 'content/courses.json';

/**
 * The cache is the promise, not the value: two screens booting at once share one request,
 * and there is exactly one fetch per page load. Content is static and precached by the
 * service worker, so it cannot change under a running app.
 */
let inFlight: Promise<Manifest> | null = null;

/** Loads (once) and parses the emitted manifest. Rejects with `ManifestError`. */
export function loadManifest(): Promise<Manifest> {
  inFlight ??= fetchManifest().catch((error: unknown) => {
    // Only a SUCCESS is cached forever: a failed boot (offline first load) may be retried.
    inFlight = null;
    throw error;
  });
  return inFlight;
}

/** The courses of the emitted manifest, in manifest order — the first is the default course. */
export async function loadCourses(): Promise<Course[]> {
  return (await loadManifest()).courses;
}

/**
 * Tests only: drops the cache so each case boots cold. The app never calls this — a manifest
 * is loaded once per page load, by design.
 */
export function resetManifestCache(): void {
  inFlight = null;
}

/**
 * The active course at boot (F0): the persisted one when it is still in the manifest, else the
 * first manifest entry. A persisted id that no longer resolves — a course renamed, or a bundle
 * built without `--with-fixtures` — warns and falls back rather than throwing: an unrenderable
 * app is a worse answer than a different course.
 *
 * Pure on purpose. It reads a persisted id, it never writes one, so the fallback DOES NOT erase
 * the stored course (Invariant 8: course switching never destroys progress) — if that id comes
 * back, so does its ladder.
 */
export function resolveActiveCourse(courses: readonly Course[], persistedId?: string): Course {
  const first = courses[0];
  if (first === undefined) {
    throw new ManifestError('courses.json: declares no courses — there is nothing to activate');
  }
  if (persistedId === undefined) return first;

  const persisted = courses.find((course) => course.id === persistedId);
  if (persisted !== undefined) return persisted;

  console.warn(
    `courses.json: active course "${persistedId}" is not in this build — falling back to "${first.id}"`,
  );
  return first;
}

/**
 * How ONE L2 line is written: the language it declares itself to be, and the way it runs.
 *
 * The two travel together because they are one fact — a line of Arabic that says `lang="ar"` and
 * nothing about direction is still mis-rendered (#196) — and a shape that hands out the tag
 * without the direction is a shape a render site can take half of.
 */
export interface WrittenIn {
  /** The BCP-47 tag this line declares (`lang`). */
  lang: string;
  /** The direction this line runs (`dir`). */
  dir: Direction;
}

/**
 * The two L2 lines a course can put on screen (#186, #196) — the pair a screen hands its content
 * components, so nothing below has to know what a `scriptMode` is.
 */
export interface L2Written {
  /** The line the course prints: romanized letters, or the native script itself. */
  display: WrittenIn;
  /** The quiet native line beneath it (romanized courses only): the script, as itself. */
  script: WrittenIn;
}

/**
 * How the course's L2 lines are actually WRITTEN — the language of each, and its direction.
 *
 * A romanized course (en-ar, PRD §4) prints its L2 in Latin letters, so `ar` would be a lie to a
 * screen reader — it would try to pronounce `ʾahlan` as Arabic script. `ar-Latn` is the same
 * language in another script, which is exactly what BCP-47's script subtag is for, and Latin
 * letters run left to right whatever the language does — which is why that half is `ltr` from the
 * script, not from the row. The quiet native line beside it is the other half of the pair: the
 * plain tag, and the direction the language runs in its own script (`l2Dir`).
 *
 * Declared, never sniffed. `dir="auto"` would decide from the first strong character in the
 * string, which is exactly wrong for the line this pair exists for: an Arabic sentence opening
 * with a Latin brand name or a digit would resolve `ltr` and throw its terminal punctuation to
 * the far end. The course knows the language; a heuristic is only for text whose language nobody
 * declared.
 *
 * The L1 has no entry here on purpose: the document declares it once (`CourseProvider`) and both
 * `lang` and `dir` inherit, so L1 copy is labelled by saying nothing.
 */
export function l2Written(course: Course): L2Written {
  const script: WrittenIn = { lang: course.l2Tag, dir: course.l2Dir };
  const romanized = course.scriptMode === 'romanized';
  return { display: romanized ? { lang: `${course.l2Tag}-Latn`, dir: 'ltr' } : script, script };
}

async function fetchManifest(): Promise<Manifest> {
  // Read BASE_URL per call, not at module load: it is '/' in dev and tests and '/rung/' (or
  // whatever the host mounts) in a build, and the app must work under either.
  const url = `${import.meta.env.BASE_URL}${MANIFEST_PATH}`;

  let response: Response;
  try {
    response = await fetch(url);
  } catch (cause) {
    throw new ManifestError(`${url}: could not be fetched`, { cause });
  }
  if (!response.ok) {
    throw new ManifestError(`${url}: fetch failed with HTTP ${response.status}`);
  }

  let payload: unknown;
  try {
    payload = await response.json();
  } catch (cause) {
    throw new ManifestError(`${url}: is not valid JSON`, { cause });
  }

  return parseManifest(payload, url);
}

/**
 * The runtime tripwire. The build validates the authored manifest already (#74); what this
 * guards is the artefact actually served — a stale cache, a half-copied deploy, a hand-edited
 * `public/content/`. Anything it lets through is a `Course` the rest of the app may trust.
 */
export function parseManifest(payload: unknown, source = MANIFEST_PATH): Manifest {
  if (Array.isArray(payload)) {
    // The likeliest way to get here: the AUTHORED content/courses.json got served instead of
    // the built one. Same courses, wrong file — say so rather than "not an object".
    throw new ManifestError(
      `${source}: is a bare array — the app reads the emitted envelope {"courses": [...]}, not the authored manifest`,
    );
  }
  if (payload === null || typeof payload !== 'object') {
    throw new ManifestError(`${source}: must be an object like {"courses": [...]}`);
  }

  const envelope = payload as { courses?: unknown; devBuild?: unknown };
  if (!Array.isArray(envelope.courses)) {
    throw new ManifestError(`${source}: has no "courses" array`);
  }
  if (envelope.courses.length === 0) {
    throw new ManifestError(
      `${source}: declares no courses — a strict build ships only modules cleared by the gate`,
    );
  }

  const courses = envelope.courses.map((row, index) =>
    parseCourse(row, `${source}.courses[${index}]`),
  );

  return { courses, devBuild: envelope.devBuild === true };
}

function parseCourse(row: unknown, at: string): Course {
  if (row === null || typeof row !== 'object' || Array.isArray(row)) {
    throw new ManifestError(`${at}: must be a course object`);
  }
  const course = row as Record<string, unknown>;

  for (const field of ['id', 'l1', 'l2', 'pairLabel'] as const) {
    const value = course[field];
    if (typeof value !== 'string' || value.trim() === '') {
      throw new ManifestError(`${at}.${field}: must be a non-empty string`);
    }
  }
  for (const field of ['l1Tag', 'l2Tag'] as const) {
    const value = course[field];
    if (typeof value !== 'string' || !LANGUAGE_TAG.test(value)) {
      throw new ManifestError(
        `${at}.${field}: must be a BCP-47 language tag like "hi" or "ar-Latn"`,
      );
    }
  }
  if (!SCRIPT_MODES.includes(course.scriptMode as string)) {
    throw new ManifestError(`${at}.scriptMode: must be one of: ${SCRIPT_MODES.join(', ')}`);
  }
  for (const field of ['dir', 'l2Dir'] as const) {
    if (!DIRECTIONS.includes(course[field] as string)) {
      throw new ManifestError(`${at}.${field}: must be one of: ${DIRECTIONS.join(', ')}`);
    }
  }

  // The row itself, extras intact (romanizationNote, fixture) — validated, not rebuilt.
  return course as unknown as Course;
}
