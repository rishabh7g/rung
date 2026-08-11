/**
 * Test fixture for the emitted course manifest (#79).
 *
 * A trimmed copy of what `npm run dev` actually writes to `public/content/courses.json` — the
 * envelope with its dev keys, hi-mr first, and en-ar carrying `romanizationNote` so the loader
 * is exercised against a row that has more than the six required fields. Shared, so the loader
 * test and the boot tests cannot drift into disagreeing about the shape.
 */
import { vi } from 'vitest';
import { completeStrings } from './courseStrings.ts';

export const DEV_MANIFEST = {
  devBuild: true,
  devBuildNote:
    'Built with a relaxed content gate — includes unverified and/or fixture content. NOT a shippable learner build.',
  courses: [
    {
      id: 'hi-mr',
      l1: 'Hindi',
      l2: 'Marathi',
      pairLabel: 'hindi → marathi',
      scriptMode: 'native',
      dir: 'ltr',
    },
    {
      id: 'en-es',
      l1: 'English',
      l2: 'Spanish',
      pairLabel: 'english → spanish',
      scriptMode: 'native',
      dir: 'ltr',
      fixture: true,
    },
    {
      id: 'en-ar',
      l1: 'English',
      l2: 'Arabic',
      pairLabel: 'english → arabic',
      scriptMode: 'romanized',
      dir: 'ltr',
      fixture: true,
      romanizationNote: 'ALA-LC-flavoured Modern Standard Arabic in Latin letters.',
    },
  ],
} as const;

/** The strict build's manifest: the envelope, and no course made it through the gate. */
export const STRICT_EMPTY_MANIFEST = { courses: [] } as const;

/**
 * Installs a `fetch` over the whole content tree and returns the mock, so a test can count calls
 * (both loaders cache) or read the URLs it asked for.
 *
 * It routes rather than answering everything alike, because boot now reads two files (#80):
 * `…/strings.json` gets the strings payload — a complete bundle for whichever course was asked
 * for, unless a test supplies its own — and anything else gets the manifest.
 */
export function mockContentFetch(manifest: unknown, strings?: unknown) {
  const fetchMock = vi.fn((input: RequestInfo | URL) => {
    const url = String(input);
    const match = /content\/([^/]+)\/strings\.json$/.exec(url);
    const payload = match === null ? manifest : (strings ?? completeStrings(match[1] as string));

    return Promise.resolve(new Response(JSON.stringify(payload), { status: 200 }));
  });
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}
