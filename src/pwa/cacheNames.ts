/**
 * What the caches are called (#211) — the one place the worker and the page agree.
 *
 * The service worker writes them (`tools/pwa.ts` builds its `runtimeCaching` routes from these
 * names) and the app reads and prunes them (`src/pwa/offlineCourse.ts`). A name typed twice is a
 * cache written by one half and never found by the other — offline breakage with no error
 * anywhere — so the strings live here, in `src/` like `src/brand.ts`, and the build imports them.
 *
 * The content cache carries a REVISION in its name (`__RUNG_CONTENT_REVISION__`, injected by
 * `vite.config.ts` from `contentRevision()`): course content is served from URLs that never
 * change, so a cache-first route with a fixed name would freeze a learner on the content they
 * first downloaded. The font cache needs no revision — Vite hashes the subset filenames, so a
 * re-cut face is a different URL.
 */

/** Every content cache this product has ever written starts with this — that is how the page
    finds the ones an older content build left behind. */
export const CONTENT_CACHE_PREFIX = 'rung-course-content-';

/** The content cache of one content revision. */
export const contentCacheName = (revision: string): string => `${CONTENT_CACHE_PREFIX}${revision}`;

/** The active course's script subsets. One cache for every build: the URLs are content-hashed. */
export const COURSE_FONT_CACHE = 'rung-course-fonts';
