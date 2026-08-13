/**
 * The active course's offline copy (#211) — `src/pwa/offlineCourse.ts`.
 *
 * The service worker precaches the shell only, so what is asserted here IS the offline promise
 * for a course: the warm must fetch every file that course ships (not the ones a screen happened
 * to open), it must ask for the faces the course's own text needs and no others, and it must not
 * throw away the previous content cache until the new one is filled. Every one of those is a
 * failure that a screenshot would never catch — the app looks identical online.
 *
 * The platform is handed in (`WarmEnvironment`), so these run in jsdom with no worker, no
 * `caches` and no font-loading API: what is under test is the warm's decisions, not the browser's.
 */
import { describe, expect, it, vi } from 'vitest';
import naskhCss from '../fonts/naskh.css?raw';
import type { Levels } from '../course/types.ts';
import { CONTENT_CACHE_PREFIX, contentCacheName } from './cacheNames.ts';
import {
  courseAssetPaths,
  dropOtherContentCaches,
  fontShorthand,
  fontShorthands,
  sampleCharacters,
  warmCourse,
  type WarmEnvironment,
} from './offlineCourse.ts';

/** A two-level ladder with one rung still unauthored — the shape `levels.json` really has. */
const LEVELS: Levels = {
  courseId: 'en-es',
  levels: [
    {
      id: 'L1',
      name: 'Foundations',
      tagline: 'Say something true',
      modules: [
        { id: 'L1-M1', title: 'One', job: 'a', hasContent: true },
        { id: 'L1-M2', title: 'Two', job: 'b', hasContent: true },
      ],
    },
    {
      id: 'L2',
      name: 'Conversations',
      tagline: 'Keep it going',
      modules: [{ id: 'L2-M1', title: 'Three', job: 'c', hasContent: false }],
    },
  ],
};

const CACHE = contentCacheName('c0ffee123456');

/** A `CacheStorage` that only has to remember which caches exist. */
function fakeCaches(names: string[]): CacheStorage & { names: string[] } {
  const storage = {
    names,
    keys: () => Promise.resolve([...storage.names]),
    delete: (name: string) => {
      const found = storage.names.includes(name);
      storage.names = storage.names.filter((other) => other !== name);
      return Promise.resolve(found);
    },
  };
  return storage as unknown as CacheStorage & { names: string[] };
}

/** A fetch that answers every path with the same body, and a font set that records its asks. */
function environment(
  options: {
    body?: string;
    fails?: readonly string[];
    caches?: CacheStorage;
    faces?: { family: string; weight: string }[];
  } = {},
): WarmEnvironment & { asked: string[]; loaded: string[] } {
  const asked: string[] = [];
  const loaded: string[] = [];
  const faces = options.faces ?? [];

  return {
    asked,
    loaded,
    baseUrl: '/rung/',
    contentCache: CACHE,
    caches: options.caches ?? fakeCaches([CACHE]),
    fetch: ((url: string) => {
      asked.push(url);
      if (options.fails?.some((path) => url.endsWith(path)) === true) {
        return Promise.reject(new TypeError('offline'));
      }
      return Promise.resolve({
        ok: true,
        text: () => Promise.resolve(options.body ?? '{"courseId":"en-es"}'),
      } as Response);
    }) as unknown as typeof fetch,
    fonts: {
      forEach: (callback: (face: FontFace) => void) => {
        for (const face of faces) callback(face as FontFace);
      },
      load: (font: string, text?: string) => {
        loaded.push(`${font} ¶ ${text ?? ''}`);
        return Promise.resolve([]);
      },
    } as unknown as WarmEnvironment['fonts'],
  };
}

/* ------------------------------------------------------------------ what a course is made of */

describe('the files a course needs offline', () => {
  it('takes the whole ladder, not the screens the learner happened to open', () => {
    expect(courseAssetPaths(LEVELS)).toEqual([
      'content/en-es/strings.json',
      'content/en-es/levels.json',
      'content/en-es/sizes.json',
      'content/en-es/modules/L1-M1.json',
      'content/en-es/index/L1-M1.json',
      'content/en-es/modules/L1-M2.json',
      'content/en-es/index/L1-M2.json',
    ]);
  });

  it('skips a rung the build did not emit — `hasContent: false` is 404s on every launch', () => {
    expect(courseAssetPaths(LEVELS)).not.toContain('content/en-es/modules/L2-M1.json');
  });

  it('leaves `courses.json` alone — the manifest is shell, and the shell is precached', () => {
    expect(courseAssetPaths(LEVELS).every((path) => path.startsWith('content/en-es/'))).toBe(true);
  });
});

/* ------------------------------------------------------------------------------- the sampling */

describe('the character sample the font warm is built from', () => {
  it('keeps one of each character and stops at the cap', () => {
    expect([...sampleCharacters('aabbc')].join('')).toBe('abc');
    expect(sampleCharacters('abcdef', new Set(), 3).size).toBe(3);
  });

  it('accumulates across files, so a sample is the whole course’s repertoire', () => {
    const sample = sampleCharacters('ab');
    sampleCharacters('bc', sample);

    expect([...sample].join('')).toBe('abc');
  });

  it('drops the characters that belong to no script — a space is not evidence of Arabic', () => {
    // Every one of these is inside a shipped face's `unicode-range` while saying nothing about
    // the script the course is written in: the Naskh face declares U+0020 on purpose, and both
    // Mukta Devanagari and Naskh claim the joiners at U+200C-200E.
    expect([...sampleCharacters('a b\n\tc‍‌﻿')].join('')).toBe('abc');
  });

  /**
   * The regression this filter exists for, asserted against the RANGES THAT SHIP rather than a
   * transcription of them: sample a Spanish and a Hindi course's text raw and both intersect the
   * Arabic face — the first through its space, the second through the U+200D in Devanagari — so
   * a warm would have pulled ~10 KiB of Naskh onto every learner's phone. Exactly the download
   * #211 removed from the precache, walking back in through `document.fonts.load()`.
   */
  describe('against the ranges src/fonts declares', () => {
    const RANGES = /unicode-range:([^;]+);/g;

    /** Every `unicode-range` in a stylesheet, as [first, last] code point pairs. */
    function declaredRanges(css: string): [number, number][] {
      const withoutComments = css.replaceAll(/\/\*[\s\S]*?\*\//g, '');
      const found = [...withoutComments.matchAll(RANGES)].flatMap((match) => match[1]!.split(','));
      expect(found.length, 'the stylesheet declares no unicode-range').toBeGreaterThan(0);

      return found.map((entry) => {
        const [first, last] = entry.trim().replace('U+', '').split('-');
        return [parseInt(first!, 16), parseInt(last ?? first!, 16)];
      });
    }

    const covers = (ranges: [number, number][], sample: ReadonlySet<string>): boolean =>
      [...sample].some((character) =>
        ranges.some(([first, last]) => {
          const code = character.codePointAt(0)!;
          return code >= first && code <= last;
        }),
      );

    const arabic = declaredRanges(naskhCss);

    it.each([
      ['a Spanish sentence and its space', '¿Dónde está el mercado?'],
      ['Hindi with the joiner Devanagari carries', 'यह क्‍या है'],
    ])('does not ask for the Arabic face on %s', (_name, text) => {
      expect(covers(arabic, sampleCharacters(text, new Set(), 512))).toBe(false);
      // …and the raw text does, which is why the filter is not decoration.
      expect(covers(arabic, new Set(text))).toBe(true);
    });

    it('still asks for it on text that really is Arabic', () => {
      expect(covers(arabic, sampleCharacters('أين السوق'))).toBe(true);
    });
  });
});

describe('the shorthand a face is asked for by', () => {
  it('re-quotes the family — a doubled quote parses as nothing and loads nothing', () => {
    expect(fontShorthand({ family: '"Mukta"', weight: '600' })).toBe('600 1em "Mukta"');
    expect(fontShorthand({ family: 'Mukta', weight: '600' })).toBe('600 1em "Mukta"');
    expect(fontShorthand({ family: "'Barlow Condensed'", weight: '700' })).toBe(
      '700 1em "Barlow Condensed"',
    );
  });

  it('asks once per family and weight, however many faces declare them', () => {
    const faces = [
      { family: 'Mukta', weight: '400' },
      { family: '"Mukta"', weight: '400' },
      { family: 'Mukta', weight: '700' },
    ];

    expect(fontShorthands(faces)).toEqual(['400 1em "Mukta"', '700 1em "Mukta"']);
  });
});

/* ----------------------------------------------------------------------------------- the warm */

describe('warming a course', () => {
  it('fetches every one of its files, under the base the build is served from', async () => {
    const env = environment();
    const report = await warmCourse(LEVELS, env);

    expect(env.asked).toEqual(courseAssetPaths(LEVELS).map((path) => `/rung/${path}`));
    expect(report).toMatchObject({ warmed: 7, failed: 0 });
  });

  it('asks the font system for every declared face, with the course’s own text', async () => {
    const env = environment({
      body: 'hola',
      faces: [
        { family: 'Mukta', weight: '400' },
        { family: 'Barlow', weight: '400' },
      ],
    });
    await warmCourse(LEVELS, env);

    // The text is the evidence: `unicode-range` decides which of these actually fetch, so a
    // Latin course pulls no Devanagari without this file knowing what a course is written in.
    expect(env.loaded).toEqual(['400 1em "Mukta" ¶ hola', '400 1em "Barlow" ¶ hola']);
  });

  it('drops the content cache an older content build left, once the new one is filled', async () => {
    const caches = fakeCaches([
      CACHE,
      `${CONTENT_CACHE_PREFIX}0ldc0ntent`,
      'workbox-precache-v2-https://rishabh7g.github.io/rung/',
      'rung-course-fonts',
    ]);
    const report = await warmCourse(LEVELS, environment({ caches }));

    expect(report.dropped).toEqual([`${CONTENT_CACHE_PREFIX}0ldc0ntent`]);
    // The precache and the font cache are not this function's to prune: workbox owns the first
    // and the second holds content-hashed urls that no revision can stale.
    expect(caches.names).toEqual([
      CACHE,
      'workbox-precache-v2-https://rishabh7g.github.io/rung/',
      'rung-course-fonts',
    ]);
  });

  it('keeps the old cache when the warm was partial — half a copy beats none', async () => {
    const caches = fakeCaches([CACHE, `${CONTENT_CACHE_PREFIX}0ldc0ntent`]);
    const report = await warmCourse(LEVELS, environment({ caches, fails: ['L1-M2.json'] }));

    expect(report).toMatchObject({ warmed: 5, failed: 2, dropped: [] });
    expect(caches.names).toContain(`${CONTENT_CACHE_PREFIX}0ldc0ntent`);
  });

  it('survives an aeroplane: every file failing is a report, never a throw', async () => {
    const env = environment({ fails: ['.json'] });

    await expect(warmCourse(LEVELS, env)).resolves.toMatchObject({ warmed: 0, failed: 7 });
  });

  it('counts a 404 as a failure rather than caching the error page', async () => {
    const env = environment();
    env.fetch = vi.fn().mockResolvedValue({ ok: false, status: 404 }) as unknown as typeof fetch;

    await expect(warmCourse(LEVELS, env)).resolves.toMatchObject({ warmed: 0, failed: 7 });
  });
});

describe('pruning content caches', () => {
  it('deletes every content cache but the one this build writes', async () => {
    const caches = fakeCaches([`${CONTENT_CACHE_PREFIX}one`, `${CONTENT_CACHE_PREFIX}two`, CACHE]);

    await expect(dropOtherContentCaches(CACHE, caches)).resolves.toEqual([
      `${CONTENT_CACHE_PREFIX}one`,
      `${CONTENT_CACHE_PREFIX}two`,
    ]);
    expect(caches.names).toEqual([CACHE]);
  });

  it('leaves a cache it does not recognise alone', async () => {
    const caches = fakeCaches(['some-other-app-cache']);

    await expect(dropOtherContentCaches(CACHE, caches)).resolves.toEqual([]);
    expect(caches.names).toEqual(['some-other-app-cache']);
  });
});
