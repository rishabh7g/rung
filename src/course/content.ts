/**
 * Per-course content — the read path every screen uses (#81, PRD §4, §7, §8 F0).
 *
 * Three files, three loaders, one cache:
 *
 *   loadLevels(courseId)             → content/<courseId>/levels.json
 *   loadModule(courseId, moduleId)   → content/<courseId>/modules/<moduleId>.json
 *   loadIndex(courseId, moduleId)    → content/<courseId>/index/<moduleId>.json
 *
 * Same shape as the two loaders that boot before it (`manifest.ts`, `strings.ts`), because they
 * are the same problem: static files, fetched once, that must either be trustworthy or loudly
 * broken.
 *
 *   • **The cache is the promise, keyed by URL.** Two screens asking at once share one request,
 *     and the ladder does not re-fetch a module the learner has already opened. Content is static
 *     and precached by the service worker, so it cannot change under a running app.
 *   • **Only a success is cached.** A failed load (offline first paint) is retried on the next
 *     ask rather than remembered as "this course has no content".
 *   • **`${BASE_URL}` per call**, never at module load: `/` in dev and tests, `/rung/` (or
 *     whatever the host mounts) in a build.
 *   • **Cheap tripwires, not a second validator.** `tools/validate.ts` already checks every
 *     authored file against `content/schema/module.schema.json` — counts, rule-index ranges,
 *     enrichment. What is worth re-checking at runtime is only what a BUILD cannot see: a stale
 *     cache, a half-copied deploy, the wrong course's file served. So: schemaVersion 5, the
 *     expected arrays are arrays, the ids match what was asked for. Anything that gets past them
 *     is a value the rest of the app may read without a `?.` for shape.
 *
 * Everything that fails throws `ContentError`, which carries `{url, reason}` — the url so a
 * report names the file, the reason so `ContentErrorScreen` can show it verbatim.
 */
import { useCallback, useEffect, useState } from 'react';
import { useCourse } from './CourseProvider.tsx';
import type { Levels, ModuleContent, WordIndex } from './types.ts';

/**
 * Every way a content file can fail to become a usable value — offline, 404, not JSON, wrong
 * shape, wrong file. One type, so a screen can tell "the content layer is broken" (which has a
 * screen) from a bug in its own code (which does not), exactly as `ManifestError` and
 * `StringsError` do for the two files that load before these.
 */
export class ContentError extends Error {
  /** The file that failed, as it was fetched — `${BASE_URL}content/hi-mr/levels.json`. */
  readonly url: string;
  /** What was wrong with it, in one clause: `is not valid JSON`, `has no "levels" array`. */
  readonly reason: string;

  constructor(url: string, reason: string, options?: ErrorOptions) {
    super(`${url}: ${reason}`, options);
    this.name = 'ContentError';
    this.url = url;
    this.reason = reason;
  }
}

/* ------------------------------------------------------------------- paths */

/** All three are relative to `BASE_URL`, which Vite guarantees ends in a slash. */
export function levelsPath(courseId: string): string {
  return `content/${courseId}/levels.json`;
}

export function modulePath(courseId: string, moduleId: string): string {
  return `content/${courseId}/modules/${moduleId}.json`;
}

export function indexPath(courseId: string, moduleId: string): string {
  return `content/${courseId}/index/${moduleId}.json`;
}

/* ------------------------------------------------------------------ loaders */

/**
 * One entry per URL, and the entry is the PROMISE rather than the value. Keyed by the fetched
 * url, so course scoping is free: hi-mr's L1-M1 and en-es's L1-M1 are different keys, and
 * nothing here has to know that a course switch happened.
 */
const cache = new Map<string, Promise<unknown>>();

/** Loads (once) a course's ladder. Rejects with `ContentError`. */
export function loadLevels(courseId: string): Promise<Levels> {
  return loadContent(levelsPath(courseId), (payload, url) => {
    const levels = parseLevels(payload, url);
    if (levels.courseId !== courseId) {
      throw new ContentError(
        url,
        `declares courseId "${levels.courseId}" — this is ${courseId}'s ladder, so the wrong file was served`,
      );
    }
    return levels;
  });
}

/** Loads (once) one module of a course. Rejects with `ContentError`. */
export function loadModule(courseId: string, moduleId: string): Promise<ModuleContent> {
  return loadContent(modulePath(courseId, moduleId), (payload, url) => {
    const module = parseModule(payload, url);
    if (module.id !== moduleId) {
      throw new ContentError(url, `declares id "${module.id}", not "${moduleId}"`);
    }
    return module;
  });
}

/** Loads (once) one module's cumulative word index. Rejects with `ContentError`. */
export function loadIndex(courseId: string, moduleId: string): Promise<WordIndex> {
  return loadContent(indexPath(courseId, moduleId), (payload, url) => {
    const index = parseIndex(payload, url);
    if (index.courseId !== courseId || index.moduleId !== moduleId) {
      throw new ContentError(
        url,
        `is the index of ${index.courseId}/${index.moduleId}, not ${courseId}/${moduleId}`,
      );
    }
    return index;
  });
}

/**
 * Tests only: drops the cache so each case loads cold. The app never calls this — a file is
 * fetched once per page load, by design.
 */
export function resetContentCache(): void {
  cache.clear();
}

/**
 * The one fetch-parse-cache path all three loaders share. The cast on read is sound because the
 * key IS the url and the url determines which parser filled it: `content/x/levels.json` is only
 * ever written by `loadLevels`.
 */
function loadContent<T>(path: string, parse: (payload: unknown, url: string) => T): Promise<T> {
  const url = `${import.meta.env.BASE_URL}${path}`;

  const cached = cache.get(url) as Promise<T> | undefined;
  if (cached !== undefined) return cached;

  const pending = fetchJson(url)
    .then((payload) => parse(payload, url))
    .catch((error: unknown) => {
      // Only a SUCCESS is cached forever: a load that fell over may be retried.
      cache.delete(url);
      throw asContentError(error, url);
    });

  cache.set(url, pending);
  return pending;
}

async function fetchJson(url: string): Promise<unknown> {
  let response: Response;
  try {
    response = await fetch(url);
  } catch (cause) {
    throw new ContentError(url, 'could not be fetched', { cause });
  }
  if (!response.ok) {
    throw new ContentError(url, `fetch failed with HTTP ${response.status}`);
  }

  try {
    return await response.json();
  } catch (cause) {
    throw new ContentError(url, 'is not valid JSON', { cause });
  }
}

/** A thrown non-`ContentError` (a bug in a parser) still reaches callers as one, cause intact. */
function asContentError(error: unknown, url: string): ContentError {
  if (error instanceof ContentError) return error;
  return new ContentError(url, error instanceof Error ? error.message : String(error), {
    cause: error,
  });
}

/* ---------------------------------------------------------------- tripwires */

/** `levels.json`: the ladder the app draws. Everything it lets through is renderable. */
export function parseLevels(payload: unknown, source = 'levels.json'): Levels {
  const root = object(payload, source, '', 'must be an object like {"courseId": …, "levels": […]}');

  text(root.courseId, source, 'courseId');
  array(root.levels, source, 'levels');

  (root.levels as unknown[]).forEach((level, i) => {
    const at = `levels[${i}]`;
    const row = object(level, source, at, 'must be a level object');

    text(row.id, source, `${at}.id`);
    text(row.name, source, `${at}.name`);
    text(row.tagline, source, `${at}.tagline`);
    array(row.modules, source, `${at}.modules`);

    (row.modules as unknown[]).forEach((module, j) => {
      const entryAt = `${at}.modules[${j}]`;
      const entry = object(module, source, entryAt, 'must be a module entry');

      text(entry.id, source, `${entryAt}.id`);
      text(entry.title, source, `${entryAt}.title`);
      text(entry.job, source, `${entryAt}.job`);
      // Recomputed by the build from what actually shipped, so its absence means this file was
      // not built — and a rung that claims neither state is worse than no ladder at all.
      if (typeof entry.hasContent !== 'boolean') {
        throw new ContentError(source, `${entryAt}.hasContent: must be a boolean`);
      }
    });
  });

  // Validated, never rebuilt: a course's extra keys ride along, the same way manifest rows do.
  return payload as Levels;
}

/** `modules/<id>.json`: schema v5 or nothing. */
export function parseModule(payload: unknown, source = 'module.json'): ModuleContent {
  const root = object(payload, source, '', 'must be a module object');

  if (root.schemaVersion !== 5) {
    throw new ContentError(
      source,
      `schemaVersion is ${JSON.stringify(root.schemaVersion)} — this app reads schema v5`,
    );
  }

  text(root.id, source, 'id');
  text(root.title, source, 'title');
  text(root.job, source, 'job');
  array(root.rules, source, 'rules');
  array(root.sentences, source, 'sentences');
  array(root.comprehensionPool, source, 'comprehensionPool');
  object(root.complexity, source, 'complexity', 'must be the module bounds object');
  object(root.exitTest, source, 'exitTest', 'must be the exit-test object');

  // Per sentence, only what a screen dereferences without asking first: the id it is routed by,
  // the hero line it renders, and the word rows the index points into.
  (root.sentences as unknown[]).forEach((sentence, i) => {
    const at = `sentences[${i}]`;
    const row = object(sentence, source, at, 'must be a sentence object');

    text(row.id, source, `${at}.id`);
    text(row.display, source, `${at}.display`);
    const deconstruction = object(row.deconstruction, source, `${at}.deconstruction`, 'is missing');
    array(deconstruction.words, source, `${at}.deconstruction.words`);
  });

  return payload as ModuleContent;
}

/** `index/<id>.json`: the surface table the "why" row resolves through. */
export function parseIndex(payload: unknown, source = 'index.json'): WordIndex {
  const root = object(payload, source, '', 'must be a word-index object');

  text(root.courseId, source, 'courseId');
  text(root.moduleId, source, 'moduleId');
  array(root.cumulativeThrough, source, 'cumulativeThrough');
  if (!Number.isInteger(root.maxSpan) || (root.maxSpan as number) < 1) {
    throw new ContentError(source, 'maxSpan: must be an integer of at least 1');
  }

  const surfaces = object(root.surfaces, source, 'surfaces', 'must be the surface table');
  for (const [surface, entry] of Object.entries(surfaces)) {
    const at = `surfaces[${JSON.stringify(surface)}]`;
    const row = object(entry, source, at, 'must be {moduleId, sentenceId, wordIdx}');

    text(row.moduleId, source, `${at}.moduleId`);
    text(row.sentenceId, source, `${at}.sentenceId`);
    if (!Number.isInteger(row.wordIdx) || (row.wordIdx as number) < 0) {
      throw new ContentError(source, `${at}.wordIdx: must be a word position`);
    }
  }

  return payload as WordIndex;
}

/**
 * The three checks every tripwire is made of. `source` stays the FILE — it is what
 * `ContentError.url` means — and `at` is the path inside it, so a failure reads
 * `…/levels.json: levels[0].modules[2].title: must be a non-empty string`.
 */
function object(
  value: unknown,
  source: string,
  at: string,
  complaint: string,
): Record<string, unknown> {
  if (value === null || typeof value !== 'object' || Array.isArray(value)) {
    throw new ContentError(source, at === '' ? complaint : `${at}: ${complaint}`);
  }
  return value as Record<string, unknown>;
}

function text(value: unknown, source: string, at: string): void {
  if (typeof value !== 'string' || value.trim() === '') {
    throw new ContentError(source, `${at}: must be a non-empty string`);
  }
}

function array(value: unknown, source: string, at: string): void {
  if (!Array.isArray(value) || value.length === 0) {
    throw new ContentError(source, `${at}: must be a non-empty array`);
  }
}

/* -------------------------------------------------------------------- hooks */

/**
 * What a screen reads while a file is in flight. Exactly one of the three is interesting at a
 * time, and `data` is null until it is not — no half-loaded value ever reaches a render.
 */
export interface AsyncContent<T> {
  data: T | null;
  loading: boolean;
  error: ContentError | null;
}

/** The answer for anything not settled yet. Shared, so a re-render of it is reference-equal. */
const PENDING: AsyncContent<never> = { data: null, loading: true, error: null };

/** The active course's ladder. */
export function useLevels(): AsyncContent<Levels> {
  const { course } = useCourse();
  return useContent(
    levelsPath(course.id),
    useCallback(() => loadLevels(course.id), [course.id]),
  );
}

/** One module of the active course. Switching `moduleId` re-enters loading, never stale data. */
export function useModule(moduleId: string): AsyncContent<ModuleContent> {
  const { course } = useCourse();
  return useContent(
    modulePath(course.id, moduleId),
    useCallback(() => loadModule(course.id, moduleId), [course.id, moduleId]),
  );
}

/** Shared, so a render with nothing loaded is reference-equal to the last one. */
const NO_MODULES: ReadonlyMap<string, ModuleContent> = new Map();

/**
 * Several modules at once, and the ones that arrived — the loader for surfaces built out of more
 * than one file (#94's "why" rows, #96's Review queue, whose five cards routinely come from five
 * different rungs).
 *
 * It is deliberately NOT `useModule` several times over, and the difference is the failure policy:
 * a module that will not load is simply **absent from the answer**, silently. `useModule`'s error
 * screen is the right answer for a screen whose whole content is missing and the wrong one for a
 * panel that expands beside a sentence or a review card mid-session — the session serves what it
 * has and says nothing about what it does not. Everything else is `loadModule`'s: one request per
 * file per page load, shared with whoever else asked.
 *
 * The dependency is the ids as a sorted string rather than the array, so a re-render resolving to
 * the same set does not re-enter the effect; and the answer is tagged with the key it answers for,
 * so a course switch never renders the previous course's modules.
 */
export function useModules(moduleIds: readonly string[]): ReadonlyMap<string, ModuleContent> {
  const { course } = useCourse();
  const key = [...new Set(moduleIds)].sort().join(' ');
  const [loaded, setLoaded] = useState<{
    key: string;
    modules: ReadonlyMap<string, ModuleContent>;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const wanted = key === '' ? [] : key.split(' ');

    void Promise.all(
      wanted.map((moduleId) =>
        loadModule(course.id, moduleId).then(
          (module) => [moduleId, module] as const,
          () => null,
        ),
      ),
    ).then((entries) => {
      if (cancelled) return;
      setLoaded({
        key: `${course.id} ${key}`,
        modules: new Map(entries.filter((e) => e !== null)),
      });
    });

    return () => {
      cancelled = true;
    };
  }, [course.id, key]);

  return loaded !== null && loaded.key === `${course.id} ${key}` ? loaded.modules : NO_MODULES;
}

/** One module's cumulative word index, for the "why" row. */
export function useIndex(moduleId: string): AsyncContent<WordIndex> {
  const { course } = useCourse();
  return useContent(
    indexPath(course.id, moduleId),
    useCallback(() => loadIndex(course.id, moduleId), [course.id, moduleId]),
  );
}

/** A settled answer, tagged with the file it answers for — see `useContent`. */
interface Settled<T> {
  source: string;
  result: AsyncContent<T>;
}

/**
 * The three hooks' one body. It holds no cache of its own — that lives in the loaders, so two
 * components asking for the same module share the request and the parsed value, and a remount
 * costs nothing.
 *
 * Loading is DERIVED, never set: the state is the last settled answer plus the file it answers
 * for, and a render whose `source` is not that file reads as pending. So switching module ids
 * cannot flash the previous module's sentences while the new file is in flight, and the effect
 * never calls `setState` on its way in — only from the promise's callbacks, once, when the
 * content has actually arrived.
 *
 * `source` doubles as the name on a non-`ContentError` rejection, which would be a bug in a
 * loader rather than a broken file.
 */
function useContent<T>(source: string, load: () => Promise<T>): AsyncContent<T> {
  const [settled, setSettled] = useState<Settled<T> | null>(null);

  useEffect(() => {
    let cancelled = false;

    load().then(
      (data) => {
        if (!cancelled) setSettled({ source, result: { data, loading: false, error: null } });
      },
      (error: unknown) => {
        // Loaders reject with ContentError; anything else is kept visible, not swallowed.
        if (cancelled) return;
        const failure = { data: null, loading: false, error: asContentError(error, source) };
        setSettled({ source, result: failure });
      },
    );

    return () => {
      cancelled = true;
    };
  }, [source, load]);

  return settled !== null && settled.source === source ? settled.result : PENDING;
}
