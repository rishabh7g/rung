/**
 * Test fixture for the emitted course manifest (#79).
 *
 * A trimmed copy of what `npm run dev` actually writes to `public/content/courses.json` — the
 * envelope with its dev keys, hi-mr first, and en-ar carrying `romanizationNote` so the loader
 * is exercised against a row that has more than the six required fields. Shared, so the loader
 * test and the boot tests cannot drift into disagreeing about the shape.
 */
import { vi } from 'vitest';

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
 * Installs a `fetch` that answers every request with `payload` as JSON, and returns the mock so
 * a test can count calls (the loader caches) or read the URL it asked for.
 */
export function mockManifestFetch(payload: unknown) {
  const fetchMock = vi.fn(() =>
    Promise.resolve(new Response(JSON.stringify(payload), { status: 200 })),
  );
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}
