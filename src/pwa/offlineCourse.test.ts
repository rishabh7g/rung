/**
 * The scoped warm's two rules, as tables (`src/pwa/offlineCourse.ts`).
 *
 * Both rules are about what the device does NOT download, which is the kind of thing that only
 * ever regresses quietly: a window that widens back to the whole ladder and an eviction that
 * stops evicting both look exactly like a working app, on a fast connection, to whoever changed
 * them. So the two are pinned here by the files they list and the entries they delete.
 *
 * Everything under test is pure or takes its platform by parameter, which is why there is no
 * jsdom setup below: `warmedLevels` and `courseAssetPaths` are functions of a ladder, and
 * `dropOtherCourses` and `warmCourse` take the `CacheStorage` and the `fetch` they use.
 */
import { describe, expect, it, vi } from 'vitest';
import { levelsFixture } from '../test/courseContent.ts';
import {
  contentCourseId,
  courseAssetPaths,
  dropOtherCourses,
  warmCourse,
  warmedLevels,
  warmedPage,
  type WarmEnvironment,
} from './offlineCourse.ts';
import type { Levels } from '../course/types.ts';

/**
 * A ladder of `levels` levels with two shipped rungs each — the shape the window is about, with
 * none of `levelsFixture`'s pending rungs to read past. Ids are `L<n>-M<n>`, so an assertion
 * names the level it is really about.
 */
function ladder(levels: number, courseId = 'hi-mr'): Levels {
  return {
    courseId,
    levels: Array.from({ length: levels }, (_unused, index) => ({
      id: `L${index + 1}`,
      name: `Level ${index + 1}`,
      tagline: '',
      draft: false,
      draftNote: null,
      modules: [1, 2].map((rung) => ({
        id: `L${index + 1}-M${rung}`,
        title: '',
        job: '',
        hasContent: true,
      })),
    })),
  } as Levels;
}

/** Level ids, so a window assertion reads as the levels it kept. */
const ids = (levels: readonly { id: string }[]) => levels.map((level) => level.id);

describe('warmedLevels', () => {
  it('reaches one level past the level the learner is standing on', () => {
    const { levels } = ladder(5);

    expect(ids(warmedLevels(levels, new Set()))).toEqual(['L1', 'L2']);
    expect(ids(warmedLevels(levels, new Set(['L1-M1'])))).toEqual(['L1', 'L2']);
  });

  it('slides forward as a level is sealed, and keeps the levels below it', () => {
    const { levels } = ladder(5);
    const throughL2 = new Set(['L1-M1', 'L1-M2', 'L2-M1', 'L2-M2']);

    expect(ids(warmedLevels(levels, throughL2))).toEqual(['L1', 'L2', 'L3', 'L4']);
  });

  it('warms the whole ladder once every rung is passed — nothing is left to unlock', () => {
    const { levels } = ladder(3);
    const all = new Set(levels.flatMap((level) => level.modules.map((module) => module.id)));

    expect(ids(warmedLevels(levels, all))).toEqual(['L1', 'L2', 'L3']);
  });

  it('never reaches past the top of a short ladder, and an empty ladder stays empty', () => {
    expect(ids(warmedLevels(ladder(1).levels, new Set()))).toEqual(['L1']);
    expect(warmedLevels([], new Set())).toEqual([]);
  });
});

describe('courseAssetPaths', () => {
  it('always lists the course itself, whatever the window is', () => {
    expect(courseAssetPaths(ladder(5), new Set())).toEqual(
      expect.arrayContaining([
        'content/hi-mr/strings.json',
        'content/hi-mr/levels.json',
        'content/hi-mr/sizes.json',
      ]),
    );
  });

  it('lists the modules and indexes of the window, and nothing above it', () => {
    const paths = courseAssetPaths(ladder(5), new Set());

    expect(paths).toContain('content/hi-mr/modules/L2-M2.json');
    expect(paths).toContain('content/hi-mr/index/L2-M2.json');
    expect(paths.filter((path) => path.includes('L3-'))).toEqual([]);
    expect(paths.filter((path) => path.includes('L4-'))).toEqual([]);
  });

  it('skips a rung the build did not emit — fetching it would be a 404 every launch', () => {
    // `levelsFixture` ships L1-M1 and L1-M2 only; L1-M3 is the pending-authoring rung.
    const paths = courseAssetPaths(levelsFixture('en-es') as Levels, new Set());

    expect(paths).toContain('content/en-es/modules/L1-M2.json');
    expect(paths).not.toContain('content/en-es/modules/L1-M3.json');
  });
});

describe('contentCourseId', () => {
  it('names the course of a content url under any base', () => {
    expect(contentCourseId('https://x.test/content/hi-mr/modules/L1-M1.json')).toBe('hi-mr');
    expect(contentCourseId('https://x.test/rung/content/en-ar/levels.json')).toBe('en-ar');
  });

  it('claims neither the shell manifest nor a font — neither is one course to evict', () => {
    expect(contentCourseId('https://x.test/content/courses.json')).toBeNull();
    expect(contentCourseId('https://x.test/assets/mukta-devanagari-400-abc.woff2')).toBeNull();
  });
});

/** A `CacheStorage` that is a Map of Maps, holding only what these two rules read: the keys. */
function memoryCaches(seed: Record<string, string[]> = {}) {
  const caches = new Map<string, Map<string, Response>>(
    Object.entries(seed).map(([name, urls]) => [
      name,
      new Map(urls.map((url) => [url, new Response('')])),
    ]),
  );

  const open = (name: string) => {
    const entries = caches.get(name) ?? new Map<string, Response>();
    caches.set(name, entries);
    return Promise.resolve({
      keys: () => Promise.resolve([...entries.keys()].map((url) => new Request(url))),
      delete: (request: Request) => Promise.resolve(entries.delete(request.url)),
    } as unknown as Cache);
  };

  return {
    caches,
    api: {
      has: (name: string) => Promise.resolve(caches.has(name)),
      keys: () => Promise.resolve([...caches.keys()]),
      open,
      delete: (name: string) => Promise.resolve(caches.delete(name)),
    } as unknown as CacheStorage,
  };
}

const CACHE = 'rung-course-content-abc';

describe('dropOtherCourses', () => {
  it('evicts every other course and keeps the active one — and the shell manifest', async () => {
    const { caches, api } = memoryCaches({
      [CACHE]: [
        'https://x.test/content/hi-mr/modules/L1-M1.json',
        'https://x.test/content/en-es/modules/L1-M1.json',
        'https://x.test/content/en-ar/levels.json',
        'https://x.test/content/courses.json',
      ],
    });

    expect(await dropOtherCourses('hi-mr', CACHE, api)).toBe(2);
    expect([...(caches.get(CACHE) ?? []).keys()]).toEqual([
      'https://x.test/content/hi-mr/modules/L1-M1.json',
      'https://x.test/content/courses.json',
    ]);
  });

  it('does not CREATE the cache on a device that has none — an empty one answers nothing', async () => {
    const { caches, api } = memoryCaches();

    expect(await dropOtherCourses('hi-mr', CACHE, api)).toBe(0);
    expect([...caches.keys()]).toEqual([]);
  });
});

/** A `WarmEnvironment` whose fetches all succeed, over the memory caches above. */
function warmEnvironment(overrides: Partial<WarmEnvironment> = {}): WarmEnvironment {
  return {
    fetch: vi.fn(() => Promise.resolve(new Response('नमस्ते'))) as unknown as typeof fetch,
    caches: memoryCaches({ [CACHE]: [] }).api,
    baseUrl: '/',
    contentCache: CACHE,
    ...overrides,
  };
}

describe('warmCourse', () => {
  it('reads only what this page has not read — a slid window costs the levels it gained', async () => {
    const already = new Set(['/content/hi-mr/levels.json']);
    const env = warmEnvironment({ already });
    const paths = courseAssetPaths(ladder(3), new Set());

    const report = await warmCourse(ladder(3), new Set(), env);

    expect(report.warmed).toBe(paths.length - 1);
    expect(env.fetch).not.toHaveBeenCalledWith('/content/hi-mr/levels.json');
    // Everything it did read is remembered, so a second run of the same window reads nothing.
    expect(already.size).toBe(paths.length);
    expect((await warmCourse(ladder(3), new Set(), env)).warmed).toBe(0);
  });

  it('evicts nothing after a partial warm — a half-copied course is the only copy there is', async () => {
    const env = warmEnvironment({
      fetch: vi.fn(() =>
        Promise.resolve(new Response('', { status: 404 })),
      ) as unknown as typeof fetch,
      caches: memoryCaches({
        [CACHE]: ['https://x.test/content/en-es/modules/L1-M1.json'],
        'rung-course-content-old': ['https://x.test/content/hi-mr/levels.json'],
      }).api,
    });

    const report = await warmCourse(ladder(3), new Set(), env);

    expect(report.failed).toBeGreaterThan(0);
    expect(report.evicted).toBe(0);
    expect(report.dropped).toEqual([]);
  });

  it('evicts the other courses and the older revision once the warm is whole', async () => {
    const env = warmEnvironment({
      caches: memoryCaches({
        [CACHE]: ['https://x.test/content/en-es/modules/L1-M1.json'],
        'rung-course-content-old': ['https://x.test/content/hi-mr/levels.json'],
      }).api,
    });

    const report = await warmCourse(ladder(3), new Set(), env);

    expect(report.failed).toBe(0);
    expect(report.evicted).toBe(1);
    expect(report.dropped).toEqual(['rung-course-content-old']);
  });
});

describe('warmedPage', () => {
  it('keeps what this page read while the course is the same one', () => {
    warmedPage('hi-mr').add('/content/hi-mr/levels.json');

    expect([...warmedPage('hi-mr')]).toEqual(['/content/hi-mr/levels.json']);
  });

  it('empties on a switch — warming the new course evicted the old one it remembers', () => {
    warmedPage('hi-mr').add('/content/hi-mr/levels.json');

    expect([...warmedPage('en-es')]).toEqual([]);
    // …and switching back does not resurrect it, so A is re-warmed rather than skipped.
    expect([...warmedPage('hi-mr')]).toEqual([]);
  });
});
