/**
 * Test fixture for the emitted course manifest (#79).
 *
 * A trimmed copy of what `npm run dev` actually writes to `public/content/courses.json` — the
 * envelope with its dev keys, hi-mr first, and en-ar carrying `romanizationNote` so the loader
 * is exercised against a row that has more than the nine required fields. Shared, so the loader
 * test and the boot tests cannot drift into disagreeing about the shape.
 *
 * en-ar is the only row that still carries `fixture: true`: en-es graduated to a shipping course
 * in #195, so a dev build now emits it exactly as a strict build does.
 */
import { vi } from 'vitest';
import { completeStrings } from './courseStrings.ts';
import { indexFixture, levelsFixture, moduleFixture, sizesFixture } from './courseContent.ts';

export const DEV_MANIFEST = {
  devBuild: true,
  devBuildNote:
    'Built with a relaxed content gate — includes unverified and/or fixture content. NOT a shippable learner build.',
  courses: [
    {
      id: 'hi-mr',
      l1: 'Hindi',
      l2: 'Marathi',
      l1Tag: 'hi',
      l2Tag: 'mr',
      l2Dir: 'ltr',
      pairLabel: 'hindi → marathi',
      scriptMode: 'native',
      dir: 'ltr',
    },
    {
      id: 'en-es',
      l1: 'English',
      l2: 'Spanish',
      l1Tag: 'en',
      l2Tag: 'es',
      l2Dir: 'ltr',
      pairLabel: 'english → spanish',
      scriptMode: 'native',
      dir: 'ltr',
    },
    {
      id: 'en-ar',
      l1: 'English',
      l2: 'Arabic',
      l1Tag: 'en',
      l2Tag: 'ar',
      l2Dir: 'rtl',
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
 * A test's own answer for one of the per-course files, when what it is testing is a BROKEN one.
 * Omitted files answer with the fixture for whichever course and module were asked for.
 */
export interface ContentOverrides {
  levels?: unknown;
  module?: unknown;
  index?: unknown;
  sizes?: unknown;
}

/**
 * Installs a `fetch` over the whole content tree and returns the mock, so a test can count calls
 * (every loader caches) or read the URLs it asked for.
 *
 * It routes rather than answering everything alike, because the app reads six kinds of file
 * (#80, #81, #107): the manifest, then per course a strings bundle, a ladder, a module, its word
 * index and its sizes file. Each route answers with that file's fixture for the course and
 * module in the URL — so a test only supplies a payload when the payload is the point.
 */
export function mockContentFetch(
  manifest: unknown,
  strings?: unknown,
  content: ContentOverrides = {},
) {
  const fetchMock = vi.fn((input: RequestInfo | URL) => {
    const url = String(input);
    return Promise.resolve(new Response(JSON.stringify(route(url)), { status: 200 }));
  });
  vi.stubGlobal('fetch', fetchMock);

  function route(url: string): unknown {
    const strings_ = /content\/([^/]+)\/strings\.json$/.exec(url);
    if (strings_ !== null) return strings ?? completeStrings(strings_[1] as string);

    const levels = /content\/([^/]+)\/levels\.json$/.exec(url);
    if (levels !== null) return content.levels ?? levelsFixture(levels[1] as string);

    const module = /content\/[^/]+\/modules\/([^/]+)\.json$/.exec(url);
    if (module !== null) return content.module ?? moduleFixture(module[1] as string);

    const index = /content\/([^/]+)\/index\/([^/]+)\.json$/.exec(url);
    if (index !== null) {
      return content.index ?? indexFixture(index[1] as string, index[2] as string);
    }

    const sizes = /content\/([^/]+)\/sizes\.json$/.exec(url);
    if (sizes !== null) return content.sizes ?? sizesFixture(sizes[1] as string);

    return manifest;
  }

  return fetchMock;
}
