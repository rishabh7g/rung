/**
 * The predicate the engine is handed (#95) — `useExitAvailable`, where the counters (state) and the
 * module's sentence ids (content) meet.
 *
 * The rule itself is `engine/exit.test.ts` and the screen is `LadderScreen.test.tsx`; what is only
 * testable here is the join: which module it answers for, what it says before the module file has
 * arrived, and what it says when that file never arrives at all.
 */
import { act, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { ReactNode } from 'react';
import { CourseProvider } from '../course/CourseProvider.tsx';
import { resetContentCache } from '../course/content.ts';
import { resetManifestCache } from '../course/manifest.ts';
import { resetStringsCache } from '../course/strings.ts';
import { useAppStore } from '../state/store.ts';
import { DEV_MANIFEST, mockContentFetch } from '../test/courseManifest.ts';
import { useExitAvailable } from './useExitAvailable.ts';

const COURSE = 'hi-mr';
/** The fixture module's two sentences — `moduleFixture` authors S01 and S02. */
const SENTENCES = ['L1-M1-S01', 'L1-M1-S02'];

function wrapper({ children }: { children: ReactNode }) {
  return <CourseProvider>{children}</CourseProvider>;
}

/** One Produce-phase got-it per id, through the store's one counter action. */
function produce(...sentenceIds: string[]): void {
  const { ensureCourse, recordProduction } = useAppStore.getState();
  ensureCourse(COURSE);
  for (const sentenceId of sentenceIds) recordProduction(COURSE, sentenceId);
}

beforeEach(() => {
  resetContentCache();
  resetManifestCache();
  resetStringsCache();
  useAppStore.getState()._reset();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('useExitAvailable', () => {
  it('says yes for the rung whose every sentence is at two, once its module has loaded', async () => {
    mockContentFetch(DEV_MANIFEST);
    produce(...SENTENCES, ...SENTENCES);

    const { result } = renderHook(() => useExitAvailable('L1-M1'), { wrapper });

    await waitFor(() => expect(result.current?.('L1-M1')).toBe(true));
  });

  it('says no while the module file is still in flight — sentences unknown, nothing to claim', async () => {
    // Everything else answers; the module file never arrives.
    const base = mockContentFetch(DEV_MANIFEST);
    const held = vi.fn((input: RequestInfo | URL) =>
      /\/modules\//.test(String(input)) ? new Promise<Response>(() => {}) : base(input),
    );
    vi.stubGlobal('fetch', held);
    produce(...SENTENCES, ...SENTENCES);

    const { result } = renderHook(() => useExitAvailable('L1-M1'), { wrapper });

    // The hook is running (the provider is up) and the counters are full — and the answer is still
    // no, because "every sentence" is a claim about a list this render has not got.
    await waitFor(() => expect(result.current).not.toBeNull());
    await waitFor(() => expect(held).toHaveBeenCalled());
    expect(result.current?.('L1-M1')).toBe(false);
  });

  it('answers only for the rung it was given — every other module reads false', async () => {
    mockContentFetch(DEV_MANIFEST);
    produce(...SENTENCES, ...SENTENCES);

    const { result } = renderHook(() => useExitAvailable('L1-M1'), { wrapper });

    await waitFor(() => expect(result.current?.('L1-M1')).toBe(true));
    expect(result.current?.('L1-M2')).toBe(false);
    expect(result.current?.('L1-M1-S01')).toBe(false);
  });

  it('says no on a finished ladder, where there is no rung to ask about', async () => {
    mockContentFetch(DEV_MANIFEST);
    produce(...SENTENCES, ...SENTENCES);

    const { result } = renderHook(() => useExitAvailable(null), { wrapper });

    await waitFor(() => expect(result.current).not.toBeNull());
    expect(result.current?.('L1-M1')).toBe(false);
  });

  it('follows the counters live: the got-it that finishes the rung flips it', async () => {
    mockContentFetch(DEV_MANIFEST);
    produce(...SENTENCES, 'L1-M1-S01');

    const { result } = renderHook(() => useExitAvailable('L1-M1'), { wrapper });
    await waitFor(() => expect(result.current).not.toBeNull());

    expect(result.current?.('L1-M1')).toBe(false);

    act(() => {
      produce('L1-M1-S02');
    });

    expect(result.current?.('L1-M1')).toBe(true);
  });

  it('says no when the module file will not load — quietly, and without an error screen', async () => {
    const failing = vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (/\/modules\//.test(url)) return Promise.resolve(new Response('', { status: 404 }));
      return base(input);
    });
    const base = mockContentFetch(DEV_MANIFEST);
    vi.stubGlobal('fetch', failing);
    produce(...SENTENCES, ...SENTENCES);

    const { result } = renderHook(() => useExitAvailable('L1-M1'), { wrapper });

    await waitFor(() => expect(failing).toHaveBeenCalled());
    expect(result.current?.('L1-M1')).toBe(false);
  });
});
