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
 *   • **Warm as far as the learner can climb.** The moment a course resolves (`CourseProvider`,
 *     which is also where a SWITCH lands), and again whenever their passed set changes, the
 *     course's ladder, strings and sizes row are fetched through the worker's cache-first route
 *     — together with the modules and word indexes of every level up to and including one PAST
 *     the level the learner is standing on. Not the ones they have visited (offline, that is a
 *     dead ladder), and no longer the whole course either: a level beyond the lookahead is
 *     SEALED by `engine/progression.ts` and cannot be opened at all, so downloading it is a bet
 *     on a rung the product itself refuses to serve. The window slides forward as levels are
 *     sealed, which is why the warm re-runs on a pass and not only on a boot.
 *   • **Warm one course, and only one.** The content cache is named after the content REVISION,
 *     not the course, so every course a learner ever opened used to accumulate in it for ever —
 *     the catalogue arriving on the device one sampled course at a time, which is the shape #211
 *     exists to prevent. A completed warm now evicts every OTHER course's entries from it.
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
 * **What this trades away, plainly** (`docs/05-pwa-notes.md` §3.1): the offline promise moves
 * from "everything, the moment the worker installs" to "the rungs the learner can climb next, in
 * the one course they are in, from the first time it is opened online". Three things follow, and
 * all three are the same trade. Install the app, switch to a course you have never opened, go
 * offline before the warm finishes, and that course has no content. Seal two levels in one
 * offline session and the level after them is not there either — one online launch fills it.
 * Switch back to a course you left, offline, and it is gone until you are online again. What is
 * kept is the daily case: the course the learner practises, at the rung they are on, warmed on
 * every launch, after every pass, and after every content change.
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
 * How many levels PAST the learner's own the warm reaches.
 *
 * One, and one is a deliberate number rather than a spare. The rung after the last rung of the
 * learner's level is the first rung of the next, and a learner who seals a level offline must
 * find it there — so the level above is not speculation, it is the next thing they will open.
 * Two would be: `levelSealed` (`engine/progression.ts`) keeps every level above THAT one shut
 * until the one between them is passed in full, which cannot happen without a rung the device
 * already has.
 */
const LOOKAHEAD_LEVELS = 1;

/**
 * The slice of a ladder the warm covers: every level up to and including one past the level the
 * learner is standing on — the **frontier**, the first level still holding a rung they have not
 * passed.
 *
 * A whole ladder passed has no frontier and warms entire (the quiet completion state, #103): a
 * learner with nothing left to unlock has earned every module for practice. An empty ladder
 * returns empty, which is what a course with no `levels.json` handed over honestly is.
 *
 * Structural in its parameter, like `ladderFromLevels`: this file states the WINDOW, the engine
 * states the rule that makes the window safe, and neither imports the other.
 */
export function warmedLevels<Level extends { modules: readonly { id: string }[] }>(
  levels: readonly Level[],
  passed: ReadonlySet<string>,
): readonly Level[] {
  const frontier = levels.findIndex((level) =>
    level.modules.some((module) => !passed.has(module.id)),
  );

  return frontier === -1 ? levels : levels.slice(0, frontier + 1 + LOOKAHEAD_LEVELS);
}

/**
 * Every file the active course must have on the device for the learner to keep climbing offline,
 * as paths under `BASE_URL` — the same helpers the app's own loaders use, so the warm cannot
 * fetch a URL the screens do not (or miss one they do).
 *
 * The ladder, the strings and the sizes row are the course itself and are always listed. The
 * per-module files are listed for `warmedLevels` only: a level above the window is sealed, and a
 * sealed rung has no screen that can ask for it. Levels BELOW the frontier stay in the window on
 * purpose — they are passed, and passed modules are exactly what Practice draws its sentences
 * from (`engine/leitner.ts`) and what the Why panel's word index points back at.
 *
 * Modules the build did not emit are skipped: `hasContent: false` is the pending-authoring rung
 * state (`tools/content-build.ts` recomputes the flag from the emitted tree), and fetching those
 * would be a run of 404s on every launch. `content/courses.json` is absent because it is SHELL —
 * every course reads it, so it stays in the precache.
 */
export function courseAssetPaths(levels: Levels, passed: ReadonlySet<string>): string[] {
  const courseId = levels.courseId;
  const modules = warmedLevels(levels.levels, passed).flatMap((level) =>
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
 * The course a cached content URL belongs to, or `null` for a URL that is not a course's.
 *
 * The same shape as the worker's own `COURSE_CONTENT_ROUTE` (`tools/pwa.ts`) and for the same
 * reason: it must match under any base, so it is anchored on `/content/<id>/` rather than on the
 * origin. `content/courses.json` has no `<id>` segment and reads as `null` here — it is shell,
 * it lives in the precache, and it is not any one course's to evict.
 */
export function contentCourseId(url: string): string | null {
  return /\/content\/([^/]+)\/[^?#]+\.json$/.exec(url)?.[1] ?? null;
}

/**
 * Deletes every OTHER course's entries from the current content cache, and answers how many.
 *
 * The cache is named after the content revision, so a learner who tried four courses carried
 * four courses until the next content build — the whole catalogue arriving on the device the
 * slow way, which is the download #211 exists to stop. What a learner is learning is one course
 * at a time; the rest is re-fetched over the cache-first route the next time they switch, in the
 * background, exactly as a first open does.
 *
 * Only ever called AFTER a successful warm, for the same reason the stale caches are: evicting
 * the previous course before the new one is on the device leaves a learner who went offline
 * mid-warm with neither.
 */
export async function dropOtherCourses(
  courseId: string,
  cacheName: string,
  cacheStorage: CacheStorage,
): Promise<number> {
  // Never `open()`: on a device with no content cache yet that would CREATE the cache the worker
  // is about to name, and an empty cache under a live name is a route that answers nothing.
  if (!(await cacheStorage.has(cacheName))) return 0;

  const cache = await cacheStorage.open(cacheName);
  const foreign = (await cache.keys()).filter((request) => {
    const owner = contentCourseId(request.url);
    return owner !== null && owner !== courseId;
  });

  await Promise.all(foreign.map((request) => cache.delete(request)));
  return foreign.length;
}

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
  /**
   * URLs this page has already warmed, so a re-warm costs lookups instead of reads.
   *
   * The warm re-runs whenever the passed set changes (`CourseProvider`), which is several times
   * an hour once a learner is climbing, and every fetch on the cache-first route still reads the
   * whole file back out of Cache Storage to sample its characters. Skipping what this page has
   * already read keeps a slid window to the cost of the levels it actually gained — and it is
   * safe to skip only because content is immutable within a revision, which is the same fact the
   * cache's name rests on. Absent (tests, the first warm) means read everything.
   */
  already?: Set<string>;
}

/** What one warm did — returned for tests and for the live check, never rendered. */
export interface WarmReport {
  /** Files fetched through the worker's cache-first route (a cache hit costs no network). */
  warmed: number;
  /** Files that could not be fetched at all — offline, mid-warm, or a 404 nobody expected. */
  failed: number;
  /** Content caches an older revision left behind, now deleted. */
  dropped: readonly string[];
  /** Entries of OTHER courses evicted from this revision's content cache. */
  evicted: number;
}

/**
 * Fetches the learner's reachable slice of a course, then its faces, then prunes what no longer
 * belongs on the device — older revisions' caches, and other courses' entries in this one.
 *
 * Sequential on purpose: this runs behind a screen the learner is already reading, and twenty
 * parallel requests on a phone would compete with the module they actually opened. A fetch not
 * already made by this page is unconditional — the worker's route is cache-first, so a file
 * warmed on a previous launch costs no network and still yields its text for the font sample.
 */
export async function warmCourse(
  levels: Levels,
  passed: ReadonlySet<string>,
  env: WarmEnvironment,
): Promise<WarmReport> {
  const sample = new Set<string>();
  let warmed = 0;
  let failed = 0;

  for (const path of courseAssetPaths(levels, passed)) {
    const url = `${env.baseUrl}${path}`;
    if (env.already?.has(url) === true) continue;

    try {
      const response = await env.fetch(url);
      if (!response.ok) {
        failed += 1;
        continue;
      }
      sampleCharacters(await response.text(), sample);
      env.already?.add(url);
      warmed += 1;
    } catch {
      failed += 1;
    }
  }

  await warmFaces(sample, env.fonts);

  // A partial warm evicts nothing: the previous revision is stale but it is what the device has,
  // and the course the learner just switched away from is still the only copy of itself until
  // this run has finished replacing it.
  if (failed > 0) return { warmed, failed, dropped: [], evicted: 0 };

  const evicted = await dropOtherCourses(levels.courseId, env.contentCache, env.caches);
  const dropped = await dropOtherContentCaches(env.contentCache, env.caches);
  return { warmed, failed, dropped, evicted };
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
 * What this page has already pulled through the cache-first route, and for which course.
 *
 * Module state rather than a parameter because it is a property of the PAGE, not of a warm:
 * `CourseProvider` re-runs the warm on every change to the passed set, and every run but the
 * first is meant to be about the levels that run gained.
 *
 * **It is emptied on a course switch, and that is not tidiness — it is the eviction's other
 * half.** Warming B deletes A's entries from the content cache, so A's urls are no longer
 * warm; a set that remembered them across the switch would skip every one of them on the way
 * back and leave A broken offline until the document reloaded. Switching is exactly when this
 * knowledge stops being true, so it is exactly when it is dropped.
 *
 * Nothing else invalidates it, and nothing else has to: content is immutable within a revision,
 * and a document that reaches a NEW revision has already reloaded (`registerType: 'autoUpdate'`).
 */
const warmedThisPage = new Set<string>();
let warmedCourseId: string | null = null;

/** That set, for `courseId` — emptied first if the last warm was some other course's. */
export function warmedPage(courseId: string): Set<string> {
  if (warmedCourseId !== courseId) {
    warmedThisPage.clear();
    warmedCourseId = courseId;
  }
  return warmedThisPage;
}

/**
 * Warm the course the app just booted into, as far as this learner can climb — the one call
 * `CourseProvider` makes, fire and forget.
 *
 * `passed` is the learner's passed set for THIS course, which is what decides how far the window
 * reaches. It is handed in rather than read from the store: the warm has no business subscribing
 * to progress, and the provider that owns the effect is already subscribed.
 *
 * Nothing happens where there is no worker to warm into: `npm run dev` serves none
 * (`devOptions.enabled: false`), jsdom has no `caches`, and a browser that never activates one
 * simply keeps fetching over the network as it did before. And nothing happens until the worker
 * CONTROLS the page: on the very first visit the app boots before the worker claims it, and a
 * fetch issued in that window bypasses the route and would be downloaded a second time.
 */
export async function warmActiveCourse(
  courseId: string,
  passed: ReadonlySet<string>,
): Promise<WarmReport | null> {
  if (typeof caches === 'undefined' || !('serviceWorker' in navigator)) return null;
  if (!(await controlled(navigator.serviceWorker))) return null;

  const already = warmedPage(courseId);

  try {
    const levels = await loadLevels(courseId);
    return await warmCourse(levels, passed, {
      fetch: fetch.bind(globalThis),
      caches,
      fonts: 'fonts' in document ? document.fonts : undefined,
      baseUrl: import.meta.env.BASE_URL,
      contentCache: contentCacheName(__RUNG_CONTENT_REVISION__),
      already,
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
