import { renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';
import {
  ContentError,
  loadIndex,
  loadLevels,
  loadModule,
  parseIndex,
  parseLevels,
  parseModule,
  resetContentCache,
  useIndex,
  useLevels,
  useModule,
} from './content.ts';
import { CourseProvider } from './CourseProvider.tsx';
import { resetManifestCache } from './manifest.ts';
import { resetStringsCache } from './strings.ts';
import { DEV_MANIFEST, mockContentFetch } from '../test/courseManifest.ts';
import { indexFixture, levelsFixture, moduleFixture } from '../test/courseContent.ts';

beforeEach(() => {
  resetContentCache();
  resetManifestCache();
  resetStringsCache();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
  vi.restoreAllMocks();
});

describe('loadLevels', () => {
  it("reads a course's ladder: levels, their rungs, and what actually shipped", async () => {
    mockContentFetch(DEV_MANIFEST);

    const levels = await loadLevels('hi-mr');

    expect(levels.courseId).toBe('hi-mr');
    expect(levels.levels.map((level) => level.id)).toEqual(['L1', 'L2', 'L3']);
    expect(levels.levels[0]?.name).toBe('Foundations');
    expect(levels.levels[0]?.modules[0]).toMatchObject({ id: 'L1-M1', hasContent: true });
    expect(levels.levels[0]?.modules[2]?.hasContent).toBe(false);
    // The draft flag and its note ride along untouched — L2 is unratified, pending [Q1].
    expect(levels.levels[1]?.draft).toBe(true);
    expect(levels.levels[1]?.draftNote).toMatch(/pending \[Q1\]/);
  });

  it('fetches once however many callers ask — the cache is the promise', async () => {
    const fetchMock = mockContentFetch(DEV_MANIFEST);

    const [first, second] = await Promise.all([loadLevels('hi-mr'), loadLevels('hi-mr')]);
    const third = await loadLevels('hi-mr');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(second).toBe(first);
    expect(third).toBe(first);
  });

  it('scopes by course: two courses are two files, never one cached answer', async () => {
    const fetchMock = mockContentFetch(DEV_MANIFEST);

    const [hindi, spanish] = await Promise.all([loadLevels('hi-mr'), loadLevels('en-es')]);

    expect(hindi.courseId).toBe('hi-mr');
    expect(spanish.courseId).toBe('en-es');
    expect(fetchMock.mock.calls.map(([url]) => String(url))).toEqual([
      '/content/hi-mr/levels.json',
      '/content/en-es/levels.json',
    ]);
  });

  it('refuses another course\'s ladder — "the wrong file was served" is a tripwire, not a shrug', async () => {
    mockContentFetch(DEV_MANIFEST, undefined, { levels: levelsFixture('en-es') });

    await expect(loadLevels('hi-mr')).rejects.toThrow(/the wrong file was served/);
  });

  it('does not cache a failure — a first load that fell over can be retried', async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new TypeError('Failed to fetch'))
      .mockResolvedValue(new Response(JSON.stringify(levelsFixture('hi-mr')), { status: 200 }));
    vi.stubGlobal('fetch', fetchMock);

    await expect(loadLevels('hi-mr')).rejects.toThrow(ContentError);
    await expect(loadLevels('hi-mr')).resolves.toMatchObject({ courseId: 'hi-mr' });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });
});

describe('loadModule', () => {
  it('reads a module whole — schema v5, its rules, sentences, pool and exit test', async () => {
    mockContentFetch(DEV_MANIFEST);

    const module = await loadModule('en-es', 'L1-M1');

    expect(module.schemaVersion).toBe(5);
    expect(module.id).toBe('L1-M1');
    expect(module.sentences[0]?.deconstruction.words[0]?.forms).toContain('se llama');
    expect(module.sentences[0]?.deconstruction.rules).toEqual([0, 1]);
    expect(module.sentences[0]?.register).toBe('neutral');
    expect(module.comprehensionPool).toHaveLength(2);
    expect(module.exitTest).toEqual({ generateCount: 1, comprehendCount: 2 });
  });

  it('asks for the module the caller named, under that course', async () => {
    const fetchMock = mockContentFetch(DEV_MANIFEST);

    await Promise.all([loadModule('hi-mr', 'L1-M2'), loadModule('en-es', 'L1-M2')]);

    expect(fetchMock.mock.calls.map(([url]) => String(url))).toEqual([
      '/content/hi-mr/modules/L1-M2.json',
      '/content/en-es/modules/L1-M2.json',
    ]);
  });

  it('refuses a file that declares a different module id', async () => {
    mockContentFetch(DEV_MANIFEST, undefined, { module: moduleFixture('L1-M9') });

    await expect(loadModule('hi-mr', 'L1-M1')).rejects.toThrow(/declares id "L1-M9"/);
  });
});

describe('loadIndex', () => {
  it('reads the cumulative surface table, multi-word spans and all', async () => {
    mockContentFetch(DEV_MANIFEST);

    const index = await loadIndex('en-es', 'L1-M1');

    expect(index.moduleId).toBe('L1-M1');
    expect(index.cumulativeThrough).toEqual(['L1-M1']);
    // The reason maxSpan exists: `Me llamo` is one taught surface of two tokens.
    expect(index.maxSpan).toBe(2);
    expect(index.surfaces['Me llamo']).toEqual({
      moduleId: 'L1-M1',
      sentenceId: 'L1-M1-S01',
      wordIdx: 0,
    });
    expect(index.surfaces['not taught']).toBeUndefined();
  });

  it('asks for the index of that course and module', async () => {
    const fetchMock = mockContentFetch(DEV_MANIFEST);

    await loadIndex('hi-mr', 'L1-M2');

    expect(fetchMock).toHaveBeenCalledWith('/content/hi-mr/index/L1-M2.json');
  });

  it("refuses another module's index", async () => {
    mockContentFetch(DEV_MANIFEST, undefined, { index: indexFixture('en-es', 'L1-M1') });

    await expect(loadIndex('hi-mr', 'L1-M1')).rejects.toThrow(/is the index of en-es\/L1-M1/);
  });
});

describe('BASE_URL', () => {
  it('prefixes every content URL, so a sub-path deploy still finds its files', async () => {
    vi.stubEnv('BASE_URL', '/rung/');
    const fetchMock = mockContentFetch(DEV_MANIFEST);

    await Promise.all([
      loadLevels('hi-mr'),
      loadModule('hi-mr', 'L1-M1'),
      loadIndex('hi-mr', 'L1-M1'),
    ]);

    expect(fetchMock.mock.calls.map(([url]) => String(url))).toEqual([
      '/rung/content/hi-mr/levels.json',
      '/rung/content/hi-mr/modules/L1-M1.json',
      '/rung/content/hi-mr/index/L1-M1.json',
    ]);
  });
});

describe('the transport', () => {
  it.each([
    ['a non-ok response', new Response('nope', { status: 404 }), /HTTP 404/],
    ['a body that is not JSON', new Response('<!doctype html>'), /is not valid JSON/],
  ])('fails typed on %s', async (_case, response, message) => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.resolve(response)),
    );

    await expect(loadLevels('hi-mr')).rejects.toThrow(ContentError);
    await expect(loadLevels('hi-mr')).rejects.toThrow(message);
  });

  it('names the file and the reason, which is what the error screen shows', async () => {
    mockContentFetch(DEV_MANIFEST, undefined, { levels: { courseId: 'hi-mr' } });

    const error = await loadLevels('hi-mr').catch((thrown: unknown) => thrown);

    expect(error).toBeInstanceOf(ContentError);
    expect(error).toMatchObject({
      url: '/content/hi-mr/levels.json',
      reason: 'levels: must be a non-empty array',
    });
    expect((error as ContentError).message).toBe(
      '/content/hi-mr/levels.json: levels: must be a non-empty array',
    );
  });
});

describe('the tripwires', () => {
  it.each([
    ['not an object at all', null],
    ['an array — the authored shape is not the emitted one', []],
    ['no levels', { courseId: 'hi-mr', levels: [] }],
    ['a level with no name', { courseId: 'hi-mr', levels: [{ id: 'L1', modules: [] }] }],
    [
      'a rung with no hasContent flag',
      {
        courseId: 'hi-mr',
        levels: [
          {
            id: 'L1',
            name: 'Foundations',
            tagline: 'say what you need',
            modules: [{ id: 'L1-M1', title: 'Who I am', job: 'Introduce yourself' }],
          },
        ],
      },
    ],
  ])('parseLevels rejects %s', (_case, payload) => {
    expect(() => parseLevels(payload)).toThrow(ContentError);
  });

  it('parseModule rejects any schemaVersion but 5 — a different number is a different contract', () => {
    expect(() => parseModule({ ...moduleFixture(), schemaVersion: 4 })).toThrow(/schema v5/);
    expect(() => parseModule({ ...moduleFixture(), schemaVersion: '5' })).toThrow(/schema v5/);
  });

  it.each([
    ['no sentences', { sentences: [] }],
    ['no comprehension pool', { comprehensionPool: [] }],
    ['no rules for a sentence to point at', { rules: [] }],
    ['no complexity bounds', { complexity: undefined }],
    ['a sentence with no deconstruction', { sentences: [{ id: 'L1-M1-S01', display: 'Soy' }] }],
  ])('parseModule rejects a module with %s', (_case, patch) => {
    expect(() => parseModule({ ...moduleFixture(), ...patch })).toThrow(ContentError);
  });

  it.each([
    ['no surfaces table', { surfaces: undefined }],
    ['a span shorter than one token', { maxSpan: 0 }],
    ['an entry that names no sentence', { surfaces: { Soy: { moduleId: 'L1-M1', wordIdx: 0 } } }],
    [
      'an entry whose word position is not a position',
      { surfaces: { Soy: { moduleId: 'L1-M1', sentenceId: 'L1-M1-S02', wordIdx: -1 } } },
    ],
  ])('parseIndex rejects an index with %s', (_case, patch) => {
    expect(() => parseIndex({ ...indexFixture('en-es'), ...patch })).toThrow(ContentError);
  });

  it('lets the real emitted shapes through untouched — validated, never rebuilt', () => {
    const levels = levelsFixture('hi-mr');
    const module = moduleFixture();
    const index = indexFixture('en-es');

    expect(parseLevels(levels)).toBe(levels);
    expect(parseModule(module)).toBe(module);
    expect(parseIndex(index)).toBe(index);
  });
});

/* -------------------------------------------------------------------- hooks */

/** The hooks read the active course off the provider, so a test boots the same way the app does. */
function wrapper({ children }: { children: ReactNode }) {
  return <CourseProvider>{children}</CourseProvider>;
}

describe('useLevels', () => {
  it("reports loading, then the active course's ladder — never a half-loaded value", async () => {
    mockContentFetch(DEV_MANIFEST);

    const { result } = renderHook(() => useLevels(), { wrapper });

    // The provider gates on the manifest, so the first render a screen ever sees is loading.
    await waitFor(() => expect(result.current).toBeDefined());
    expect(result.current).toMatchObject({ data: null, loading: true, error: null });

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data?.courseId).toBe('hi-mr');
    expect(result.current.error).toBeNull();
  });

  it('hands a broken file to the caller as a ContentError, not as empty data', async () => {
    mockContentFetch(DEV_MANIFEST, undefined, { levels: { courseId: 'hi-mr', levels: 'nope' } });

    const { result } = renderHook(() => useLevels(), { wrapper });

    await waitFor(() => expect(result.current.error).not.toBeNull());
    expect(result.current).toMatchObject({ data: null, loading: false });
    expect(result.current.error?.message).toMatch(/levels: must be a non-empty array/);
  });
});

describe('useModule', () => {
  it('loads the named module of the active course', async () => {
    const fetchMock = mockContentFetch(DEV_MANIFEST);

    const { result } = renderHook(() => useModule('L1-M2'), { wrapper });

    await waitFor(() => expect(result.current.data).not.toBeNull());
    expect(result.current.data?.id).toBe('L1-M2');
    expect(fetchMock).toHaveBeenCalledWith('/content/hi-mr/modules/L1-M2.json');
  });

  it('re-enters loading when the module changes, and never shows the previous one', async () => {
    mockContentFetch(DEV_MANIFEST);

    const { result, rerender } = renderHook(({ id }: { id: string }) => useModule(id), {
      wrapper,
      initialProps: { id: 'L1-M1' },
    });

    await waitFor(() => expect(result.current.data?.id).toBe('L1-M1'));

    rerender({ id: 'L1-M2' });
    expect(result.current).toMatchObject({ data: null, loading: true });

    await waitFor(() => expect(result.current.data?.id).toBe('L1-M2'));
  });
});

describe('useIndex', () => {
  it("loads the module's cumulative index, once, however many components ask", async () => {
    const fetchMock = mockContentFetch(DEV_MANIFEST);

    const { result } = renderHook(() => ({ first: useIndex('L1-M1'), second: useIndex('L1-M1') }), {
      wrapper,
    });

    await waitFor(() => expect(result.current.first.data).not.toBeNull());
    expect(result.current.second.data).toBe(result.current.first.data);
    expect(fetchMock.mock.calls.filter(([url]) => String(url).includes('/index/'))).toHaveLength(1);
  });
});
