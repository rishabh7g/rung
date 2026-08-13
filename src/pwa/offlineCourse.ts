/**
 * The active course's offline copy (#211) — the other half of the scoped precache.
 *
 * `tools/pwa.ts` precaches the SHELL and routes the rest cache-first, because a precache manifest
 * is baked at build time and the learner picks their course at runtime: precaching "everything"
 * meant a Spanish learner's phone quietly downloading hi-mr's Devanagari for ever. What is left
 * to this file is the promise that made precaching everything defensible in the first place —
 * PRD-engineering §10's "100% works with no network after first load" — kept for the ONE course
 * the learner actually opened:
 *
 *   • **Warm on open.** The moment a course resolves (`CourseProvider`, which is also where a
 *     SWITCH lands), every file that course ships is fetched through the worker's cache-first
 *     route: its ladder, its strings, its sizes row, and every module and word index the build
 *     emitted. Not the ones the learner has visited — ALL of them, so the ladder is browsable
 *     offline from the first online visit, the way the precache used to make it.
 *   • **Warm the faces the course's own bytes ask for.** A script subset the learner has not
 *     rendered yet is a face that is not on the device, and offline that is a screen of fallback
 *     text. Rather than a table of "which course needs which font" (Invariant 1: nothing branches
 *     on a course id), the warm collects the characters out of the content it just downloaded and
 *     asks the font system to load every declared face for THAT text. `unicode-range` does the
 *     rest: a Latin course pulls no Devanagari, a Devanagari course pulls all three weights.
 *   • **Drop what an older content build left.** The cache is named after the content revision,
 *     so a build with new content warms a new cache; the previous one is dead weight and is
 *     deleted once the new one is filled.
 *
 * **What this trades away, plainly** (`docs/05-pwa-notes.md` §3.1): the offline promise moves from
 * "everything, the moment the worker installs" to "the learner's own course, from the first time
 * it is opened online". Install the app, switch to a course you have never opened, go offline
 * before the warm finishes, and that course has no content — where the old precache-everything
 * worker would have had it. The learner's OWN course, the one they practise daily, is warmed on
 * every launch and re-warmed after every content change.
 *
 * Everything here is best-effort and silent: a failed warm is a slow lift or an aeroplane, not a
 * bug, and it is retried on the next launch. Nothing on screen ever waits for it.
 */
import { indexPath, levelsPath, loadLevels, modulePath, sizesPath } from '../course/content.ts';
import { stringsPath } from '../course/strings.ts';
import type { Levels } from '../course/types.ts';
import { CONTENT_CACHE_PREFIX, contentCacheName } from './cacheNames.ts';

/**
 * How many distinct characters the font warm samples. `document.fonts.load()` matches a face's
 * `unicode-range` against the text it is given, so what it needs is one character per range, not
 * a corpus — the cap keeps a ten-module course from building a 100 KB string to prove it uses
 * Devanagari.
 */
const CHARACTER_SAMPLE_CAP = 512;

/**
 * The characters that carry no script identity, and so must never enter the sample.
 *
 * This is the one subtle thing about sampling: `unicode-range`s OVERLAP, and they overlap exactly
 * on the characters that belong to no script. The shipped Naskh face declares `U+0020` on
 * purpose (`src/fonts/naskh.css` — the gaps between Arabic words are the Arabic face's), and both
 * Mukta Devanagari and Naskh claim the zero-width joiners at `U+200C-200E`. Sample the raw text
 * and every course "proves" it is written in Arabic: a space appears in every JSON file ever
 * emitted, and hi-mr's Devanagari carries `U+200D`. That is precisely the download #211 exists to
 * stop, reintroduced through the font system instead of the precache.
 *
 * So the sample keeps only characters that say what script the course is in: whitespace goes
 * (`\s`), and so do the format and control characters (`\p{Cf}`, `\p{Cc}` — joiners, direction
 * marks, the BOM) that are shared script furniture rather than script.
 */
const NO_SCRIPT_SIGNAL = /[\s\p{Cf}\p{Cc}]/u;

/* ------------------------------------------------------------------ what a course is made of */

/**
 * Every file the active course must have on the device to work offline, as paths under
 * `BASE_URL` — the same helpers the app's own loaders use, so the warm cannot fetch a URL the
 * screens do not (or miss one they do).
 *
 * Modules the build did not emit are skipped: `hasContent: false` is the pending-authoring rung
 * state (`tools/content-build.ts` recomputes the flag from the emitted tree), and fetching those
 * would be a run of 404s on every launch. `content/courses.json` is absent because it is SHELL —
 * every course reads it, so it stays in the precache.
 */
export function courseAssetPaths(levels: Levels): string[] {
  const courseId = levels.courseId;
  const modules = levels.levels.flatMap((level) =>
    level.modules.filter((module) => module.hasContent).map((module) => module.id),
  );

  return [
    stringsPath(courseId),
    levelsPath(courseId),
    sizesPath(courseId),
    ...modules.flatMap((id) => [modulePath(courseId, id), indexPath(courseId, id)]),
  ];
}

/* ------------------------------------------------------------------------------- the sampling */

/**
 * The distinct characters of `text`, added to `into` until the cap is reached — the font warm's
 * evidence of which scripts this course is written in, taken from the course's own bytes.
 *
 * Characters with no script signal are dropped rather than counted (see `NO_SCRIPT_SIGNAL`):
 * they are in more than one face's `unicode-range` by design, so a sample containing one asks
 * for every face the product ships.
 */
export function sampleCharacters(
  text: string,
  into: Set<string> = new Set(),
  cap = CHARACTER_SAMPLE_CAP,
): Set<string> {
  for (const character of text) {
    if (into.size >= cap) break;
    if (NO_SCRIPT_SIGNAL.test(character)) continue;
    into.add(character);
  }
  return into;
}

/**
 * A CSS font shorthand for one declared face — `600 1em "Mukta"`.
 *
 * The family is re-quoted rather than passed through: a face declared as `font-family: 'Mukta'`
 * reports its family WITH the quotes in some engines and without in others, and a shorthand with
 * doubled quotes parses as nothing and loads nothing. Size is arbitrary and required by the
 * shorthand grammar; only family and weight decide which face is matched.
 */
export function fontShorthand(face: { family: string; weight: string }): string {
  const family = face.family.trim().replace(/^['"]|['"]$/g, '');
  return `${face.weight} 1em "${family}"`;
}

/**
 * One shorthand per declared (family, weight) — read off the document's own faces rather than a
 * list of names, so a face added to `src/fonts/mukta.css` is warmed without this file knowing.
 */
export function fontShorthands(faces: readonly { family: string; weight: string }[]): string[] {
  return [...new Set(faces.map(fontShorthand))];
}

/* --------------------------------------------------------------------------------- the caches */

/**
 * Deletes every content cache but the current one — what a previous content revision left behind.
 *
 * Only ever called AFTER a successful warm: a device that could not refill the new cache keeps
 * the old one rather than being left with neither, even though nothing reads it (the worker's
 * route names exactly one cache).
 */
export async function dropOtherContentCaches(
  keep: string,
  cacheStorage: CacheStorage,
): Promise<string[]> {
  const stale = (await cacheStorage.keys()).filter(
    (name) => name.startsWith(CONTENT_CACHE_PREFIX) && name !== keep,
  );
  await Promise.all(stale.map((name) => cacheStorage.delete(name)));
  return stale;
}

/* ----------------------------------------------------------------------------------- the warm */

/** What the warm needs from the platform, named so a test can hand it doubles. */
export interface WarmEnvironment {
  fetch: typeof fetch;
  caches: CacheStorage;
  /** `document.fonts`, or undefined where the platform has no font-loading API. */
  fonts?: Pick<FontFaceSet, 'forEach' | 'load'>;
  /** `import.meta.env.BASE_URL` — `/` in dev and tests, `/rung/` on the deploy. */
  baseUrl: string;
  /** The cache the worker is writing this build's content into. */
  contentCache: string;
}

/** What one warm did — returned for tests and for the live check, never rendered. */
export interface WarmReport {
  /** Files fetched through the worker's cache-first route (a cache hit costs no network). */
  warmed: number;
  /** Files that could not be fetched at all — offline, mid-warm, or a 404 nobody expected. */
  failed: number;
  /** Content caches an older revision left behind, now deleted. */
  dropped: readonly string[];
}

/**
 * Fetches a course's whole offline copy, then its faces, then prunes older caches.
 *
 * Sequential on purpose: this runs behind a screen the learner is already reading, and twenty
 * parallel requests on a phone would compete with the module they actually opened. Every fetch is
 * unconditional — the worker's route is cache-first, so an already-warmed file costs no network
 * and still yields its text for the font sample.
 */
export async function warmCourse(levels: Levels, env: WarmEnvironment): Promise<WarmReport> {
  const sample = new Set<string>();
  let warmed = 0;
  let failed = 0;

  for (const path of courseAssetPaths(levels)) {
    try {
      const response = await env.fetch(`${env.baseUrl}${path}`);
      if (!response.ok) {
        failed += 1;
        continue;
      }
      sampleCharacters(await response.text(), sample);
      warmed += 1;
    } catch {
      failed += 1;
    }
  }

  await warmFaces(sample, env.fonts);

  // A partial warm leaves the previous revision alone: it is stale, but it is what the device
  // has, and this run has not replaced it yet.
  const dropped = failed === 0 ? await dropOtherContentCaches(env.contentCache, env.caches) : [];
  return { warmed, failed, dropped };
}

/**
 * Asks the font system to load every declared face for the characters this course actually
 * ships. Faces whose `unicode-range` the sample never touches resolve without a request, which is
 * exactly the scoping this ticket is about; the shell's own Barlow faces are precached, so
 * loading them is a cache hit.
 */
async function warmFaces(
  sample: ReadonlySet<string>,
  fonts: WarmEnvironment['fonts'],
): Promise<void> {
  if (fonts === undefined || sample.size === 0) return;

  const faces: { family: string; weight: string }[] = [];
  fonts.forEach((face) => faces.push({ family: face.family, weight: face.weight }));

  const text = [...sample].join('');
  await Promise.all(
    // A shorthand the engine cannot parse rejects; there is nothing to do about it but carry on.
    fontShorthands(faces).map((shorthand) => fonts.load(shorthand, text).catch(() => [])),
  );
}

/* ---------------------------------------------------------------------------- the app's handle */

/**
 * Warm the course the app just booted into — the one call `CourseProvider` makes, fire and
 * forget.
 *
 * Nothing happens where there is no worker to warm into: `npm run dev` serves none
 * (`devOptions.enabled: false`), jsdom has no `caches`, and a browser that never activates one
 * simply keeps fetching over the network as it did before. And nothing happens until the worker
 * CONTROLS the page: on the very first visit the app boots before the worker claims it, and a
 * fetch issued in that window bypasses the route and would be downloaded a second time.
 */
export async function warmActiveCourse(courseId: string): Promise<WarmReport | null> {
  if (typeof caches === 'undefined' || !('serviceWorker' in navigator)) return null;
  if (!(await controlled(navigator.serviceWorker))) return null;

  try {
    const levels = await loadLevels(courseId);
    return await warmCourse(levels, {
      fetch: fetch.bind(globalThis),
      caches,
      fonts: 'fonts' in document ? document.fonts : undefined,
      baseUrl: import.meta.env.BASE_URL,
      contentCache: contentCacheName(__RUNG_CONTENT_REVISION__),
    });
  } catch {
    // The ladder itself would not load: the boot screens already say so, and a warm has nothing
    // to add. Next launch tries again.
    return null;
  }
}

/**
 * Resolves once the worker is handling this page's requests. `clientsClaim` (`tools/pwa.ts`)
 * makes that happen on the first visit as soon as the worker activates, which is one
 * `controllerchange` away; on every later visit the page is controlled before it runs.
 */
async function controlled(container: ServiceWorkerContainer): Promise<boolean> {
  if (container.controller !== null) return true;
  await container.ready;
  if (container.controller !== null) return true;

  return new Promise((resolve) => {
    container.addEventListener('controllerchange', () => resolve(container.controller !== null), {
      once: true,
    });
  });
}
