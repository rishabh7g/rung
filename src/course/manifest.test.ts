import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  ManifestError,
  loadCourses,
  loadManifest,
  parseManifest,
  resetManifestCache,
  resolveActiveCourse,
  resolveUserLang,
} from './manifest.ts';
import { DEV_MANIFEST, STRICT_EMPTY_MANIFEST, mockContentFetch } from '../test/courseManifest.ts';

beforeEach(() => {
  resetManifestCache();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe('loadCourses', () => {
  it('reads the courses out of the emitted envelope, extra course keys intact', async () => {
    mockContentFetch(DEV_MANIFEST);

    const courses = await loadCourses();

    expect(courses.map((course) => course.id)).toEqual([
      'hi-mr',
      'en-es',
      'en-ar',
      'hi-en',
      'en-ru',
      'en-it',
      'en-fr',
      'en-de',
    ]);
    expect(courses[0]).toMatchObject({
      id: 'hi-mr',
      l1: 'Hindi',
      l2: 'Marathi',
      l1Tag: 'hi',
      l2Tag: 'mr',
      l2Dir: 'ltr',
      pairLabel: 'hindi → marathi',
      scriptMode: 'native',
      dir: 'ltr',
    });
    // en-ar carries more than the nine required fields; the loader keeps them, never rejects them.
    expect(courses[2]?.romanizationNote).toMatch(/Modern Standard Arabic/);
    // Every course has graduated — en-es #195, en-ar #202, hi-en #273, en-fr #331, en-it #337,
    // en-ru #343, en-de #365 — and a shipping course carries no fixture key at all. The
    // catalogue is fully graduated again, which is why the seam below is proved synthetically.
    expect(courses.filter((course) => course.fixture !== undefined).map((c) => c.id)).toEqual([]);
    expect(courses[3]).toMatchObject({ id: 'hi-en', l1Tag: 'hi', l2Tag: 'en' });
    expect(courses[4]).toMatchObject({ id: 'en-ru', l1Tag: 'en', l2Tag: 'ru' });
    expect(courses[5]).toMatchObject({ id: 'en-it', l1Tag: 'en', l2Tag: 'it' });
    expect(courses[6]).toMatchObject({ id: 'en-fr', l1Tag: 'en', l2Tag: 'fr' });
    expect(courses[7]).toMatchObject({
      id: 'en-de',
      l1Tag: 'en',
      l2Tag: 'de',
      pairLabel: 'english → german',
    });
  });

  /**
   * `--with-fixtures` and the `fixture` key are the seam a course is authored behind (PRD §17):
   * hi-en was that course from #267 until #273 graduated it, en-ru from #338 until #343, en-it
   * from #332 until #337 and en-fr from #326 until #331. The loader keeps the key rather than validating it away, so the
   * row reaches the app intact — the key is what `resolveActiveCourse` and the Settings switcher
   * never branch on, and what graduation deletes.
   *
   * The SYNTHETIC row stays, even though en-de (#356) is a real flagged row again. It is not
   * redundant with the real one: a test that borrowed whichever manifest row happened to carry
   * the key would go quiet exactly when the catalogue is fully graduated — which is when nothing
   * else is watching the seam either, and when the next course is about to be added behind it.
   * The real row is asserted too, one line below, because the two prove different things: the
   * synthetic row proves the loader's behaviour survives an empty catalogue of fixtures, and the
   * real one proves today's fixture actually reaches the app flagged.
   */
  it('keeps a fixture row intact — a course authored behind the gate reaches the app as one', () => {
    const row = { ...DEV_MANIFEST.courses[4], id: 'en-ja', fixture: true };

    const manifest = parseManifest({ devBuild: true, courses: [row] });

    expect(manifest.courses[0]?.fixture).toBe(true);
    expect(manifest.devBuild).toBe(true);
    // …and no REAL row carries the key today, which is the state this synthetic case exists for:
    // en-de was the last one behind the gate and #365 let it out.
    expect(DEV_MANIFEST.courses.filter((course) => 'fixture' in course)).toEqual([]);
  });

  it('fetches once however many callers ask — the cache is the promise', async () => {
    const fetchMock = mockContentFetch(DEV_MANIFEST);

    const [first, second] = await Promise.all([loadCourses(), loadCourses()]);
    const third = await loadCourses();

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(second).toBe(first);
    expect(third).toBe(first);
  });

  it('does not cache a failure — a first load that fell over can be retried', async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new TypeError('Failed to fetch'))
      .mockResolvedValue(new Response(JSON.stringify(DEV_MANIFEST), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    await expect(loadCourses()).rejects.toThrow(ManifestError);
    await expect(loadCourses()).resolves.toHaveLength(DEV_MANIFEST.courses.length);
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});

describe('loadManifest', () => {
  it('asks for BASE_URL + content/courses.json, so a sub-path deploy still finds it', async () => {
    vi.stubEnv('BASE_URL', '/rung/');
    const fetchMock = mockContentFetch(DEV_MANIFEST);

    await loadManifest();

    expect(fetchMock).toHaveBeenCalledWith('/rung/content/courses.json');
  });

  it('surfaces the dev-build marker the envelope exists to carry', async () => {
    mockContentFetch(DEV_MANIFEST);

    await expect(loadManifest()).resolves.toMatchObject({ devBuild: true });
  });

  it('reports devBuild false for a strict build, which carries no such key', async () => {
    mockContentFetch({ courses: DEV_MANIFEST.courses });

    await expect(loadManifest()).resolves.toMatchObject({ devBuild: false });
  });

  it('fails typed on a non-ok response', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve(new Response('nope', { status: 404 }))),
    );

    await expect(loadManifest()).rejects.toThrow(ManifestError);
    await expect(loadManifest()).rejects.toThrow(/HTTP 404/);
  });

  it('fails typed when the body is not JSON at all', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve(new Response('<!doctype html>'))),
    );

    await expect(loadManifest()).rejects.toThrow(ManifestError);
  });
});

describe('parseManifest (the tripwire)', () => {
  it('rejects the authored bare-array shape — the app consumes the emitted envelope', () => {
    expect(() => parseManifest(DEV_MANIFEST.courses)).toThrow(ManifestError);
    expect(() => parseManifest(DEV_MANIFEST.courses)).toThrow(/bare array/);
  });

  it.each([
    ['null', null],
    ['a string', 'hi-mr'],
    ['an envelope with no courses key', { devBuild: true }],
    ['a course that is not an object', { courses: ['hi-mr'] }],
    [
      'a course missing pairLabel',
      { courses: [{ id: 'x', l1: 'A', l2: 'B', scriptMode: 'native', dir: 'ltr' }] },
    ],
    [
      'a course with a blank id',
      {
        courses: [
          { id: ' ', l1: 'A', l2: 'B', pairLabel: 'a → b', scriptMode: 'native', dir: 'ltr' },
        ],
      },
    ],
    [
      'an unknown scriptMode',
      {
        courses: [
          {
            id: 'x',
            l1: 'A',
            l2: 'B',
            l1Tag: 'hi',
            l2Tag: 'mr',
            pairLabel: 'a → b',
            scriptMode: 'cyrillic',
            dir: 'ltr',
          },
        ],
      },
    ],
    [
      'a course with no language tags',
      {
        courses: [
          { id: 'x', l1: 'A', l2: 'B', pairLabel: 'a → b', scriptMode: 'native', dir: 'ltr' },
        ],
      },
    ],
    [
      'a language tag that is a language NAME',
      {
        courses: [
          {
            id: 'x',
            l1: 'A',
            l2: 'B',
            l1Tag: 'hi',
            l2Tag: 'Marathi',
            pairLabel: 'a → b',
            scriptMode: 'native',
            dir: 'ltr',
          },
        ],
      },
    ],
    [
      'an unknown dir',
      {
        courses: [
          {
            id: 'x',
            l1: 'A',
            l2: 'B',
            l1Tag: 'hi',
            l2Tag: 'mr',
            pairLabel: 'a → b',
            scriptMode: 'native',
            dir: 'sideways',
          },
        ],
      },
    ],
    [
      'a course that never says which way its L2 runs (#196)',
      {
        courses: [
          {
            id: 'x',
            l1: 'A',
            l2: 'B',
            l1Tag: 'en',
            l2Tag: 'ar',
            pairLabel: 'a → b',
            scriptMode: 'romanized',
            dir: 'ltr',
          },
        ],
      },
    ],
  ])('throws a ManifestError on %s', (_case, payload) => {
    expect(() => parseManifest(payload)).toThrow(ManifestError);
  });

  it('treats an empty manifest as a failure — a strict build has nothing to render', () => {
    expect(() => parseManifest(STRICT_EMPTY_MANIFEST)).toThrow(ManifestError);
    expect(() => parseManifest(STRICT_EMPTY_MANIFEST)).toThrow(/declares no courses/);
  });

  it('names the offending row, so a bad manifest is one line to find', () => {
    const payload = { courses: [DEV_MANIFEST.courses[0], { id: 'broken' }] };

    expect(() => parseManifest(payload)).toThrow(/courses\[1\]\.l1/);
  });
});

/**
 * The user's own language (#322) — the persisted choice, or the active course's L1 when there is
 * none. One helper, because the two Settings screens that read it must not resolve it two ways.
 */
describe('resolveUserLang', () => {
  const courses = parseManifest(DEV_MANIFEST).courses;
  const hiMr = courses.find((course) => course.id === 'hi-mr')!;
  const enAr = courses.find((course) => course.id === 'en-ar')!;

  it('follows the active course when nothing is persisted — the pre-#322 behaviour', () => {
    expect(resolveUserLang('', hiMr)).toBe(hiMr.l1Tag);
    expect(resolveUserLang('', enAr)).toBe(enAr.l1Tag);
  });

  /**
   * And a chosen language OUTLIVES the course: someone who reads Hindi keeps reading Hindi while
   * they study an English-chrome course, which is the whole reason the field exists apart from
   * `activeCourse`.
   */
  it('keeps a chosen language even when the active course speaks another', () => {
    expect(resolveUserLang('hi', enAr)).toBe('hi');
    expect(resolveUserLang('en', hiMr)).toBe('en');
  });

  it('is pure — it answers, and never writes the choice back', () => {
    const before = { ...hiMr };

    resolveUserLang('en', hiMr);

    expect(hiMr).toEqual(before);
  });
});

describe('resolveActiveCourse', () => {
  const courses = parseManifest(DEV_MANIFEST).courses;

  it('defaults to the first manifest entry when nothing is persisted', () => {
    expect(resolveActiveCourse(courses).id).toBe('hi-mr');
    expect(resolveActiveCourse(courses, undefined).id).toBe('hi-mr');
  });

  it('restores a persisted course that is still in the manifest', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    expect(resolveActiveCourse(courses, 'en-ar').id).toBe('en-ar');
    expect(warn).not.toHaveBeenCalled();
  });

  it('falls back to the first entry with a warn when the persisted course is gone', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    // e.g. a persisted fixture course, reopened on a strict build that ships none of them.
    expect(resolveActiveCourse(courses, 'fr-de').id).toBe('hi-mr');
    expect(warn).toHaveBeenCalledTimes(1);
    expect(warn.mock.calls[0]?.[0]).toMatch(/"fr-de".*falling back to "hi-mr"/);
  });

  it('throws rather than returning undefined when there are no courses at all', () => {
    expect(() => resolveActiveCourse([])).toThrow(ManifestError);
  });
});
