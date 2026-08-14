/**
 * The PWA build options (#90) — `design/pwa-checklist.md` §3, expressed once.
 *
 * They live in `tools/` rather than inline in `vite.config.ts` for one reason: the manifest is a
 * **contract with a document**, not a config detail. `design/pwa-checklist.md` §3.1 prints the
 * exact JSON this product must ship, so `tools/pwa.test.ts` parses that block out of the
 * checklist and deep-equals it against `pwaManifest()` — the checklist changing and the build not
 * is a red test, in a repo where nothing else would ever notice.
 *
 * Everything here takes the build's `base` (#91): the checklist prints the manifest for a site at
 * `/`, and the Pages deploy serves it from `/rung/`. A manifest is the one file no bundler
 * rewrites for you, so a path typed with a leading slash would point at the origin root and break
 * install and offline precaching on the sub-path — silently, which is the worst way.
 *
 * Two values are never written here: the product name comes from `src/brand.ts` and the colours
 * from `design/tokens.css` (`--color-bg`), so the manifest cannot drift from the app's own paper
 * ground. The icons are generated from the header rails mark by `tools/make-icons.ts`.
 *
 * **The worker precaches the SHELL and runtime-caches the ACTIVE COURSE (#211).** It used to
 * precache everything and route nothing, on the reasoning that PRD-engineering §3/§10 is zero
 * network after first load — but "everything" is the whole CATALOGUE, and a manifest baked at
 * build time cannot know which course the learner will pick at runtime. So a Spanish learner's
 * phone downloaded hi-mr's ~262 KiB of Devanagari in the background, for ever, and #207's
 * `precache:<id>` budget row described a device that did not exist.
 *
 * What replaces it keeps the promise and drops the waste. The precache is exactly the files the
 * payload budget attributes to `shell` (`tools/payload-budget.ts`) — the document, the bundle,
 * the CSS, the Barlow UI faces, `courses.json`, the icons — and two **cache-first** runtime
 * routes hold what only one course's learner pays for: `content/<id>/**` and that course's own
 * script subsets. `src/pwa/offlineCourse.ts` warms them the moment a course resolves, so the
 * offline promise moves from "everything, at install" to "the learner's own course, from the
 * first time it is opened online" (`docs/05-pwa-notes.md` §3.1 states the tradeoff plainly).
 *
 * Cache-first, never network-first: after the warm there is still zero runtime network for the
 * active course, which is the invariant §10 is actually about. Staleness is handled the way the
 * precache handles it — by revision. The content cache's NAME carries a hash of the emitted
 * content tree (`contentRevision()`), so a build that changes a course's bytes writes a new cache
 * and `src/pwa/offlineCourse.ts` drops the old one; a build that does not, re-uses it and
 * re-downloads nothing. The font subsets need no revision: Vite hashes their filenames.
 */
import { createHash } from 'node:crypto';
import { readdirSync, readFileSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { ManifestOptions, VitePWAOptions } from 'vite-plugin-pwa';
import { BRAND } from '../src/brand.ts';
// The names the worker writes and the app reads, declared once in `src/` (like `BRAND`): a cache
// named by one half and looked for by the other is offline breakage with no error anywhere.
import { contentCacheName, COURSE_FONT_CACHE } from '../src/pwa/cacheNames.ts';
// The budget's owner table decides what the precache leaves out, so the two cannot drift: a
// script listed there is a script whose subsets are charged to a course, and a file charged to a
// course is a file the shell precache must not carry. One-way — the gate never imports this.
import { COURSE_SCRIPTS } from './payload-budget.ts';
import { token } from './tokens.ts';

/** Where the generated icons live, under `public/`, so Vite copies them to `dist/` verbatim. */
export const ICONS_DIR = 'icons';

/**
 * The path the build is served from — `/` unless `VITE_BASE` says otherwise (`vite.config.ts`).
 *
 * The default is what every caller but the deploy uses: `npm run dev`, `npm run preview` and the
 * tests all read `/`. The Pages deploy is a PROJECT site (`https://rishabh7g.github.io/rung/`, #91)
 * and builds with `VITE_BASE=/rung/`. Vite guarantees a base ends in a slash.
 */
export const DEFAULT_BASE = '/';

/**
 * A URL for a file `public/` ships verbatim, under the base the build is served from.
 *
 * Vite rewrites the `href`s in `index.html` itself, and the app reads `import.meta.env.BASE_URL`
 * — but the manifest is JSON the plugin copies through untouched, so a `src` written as `/icons/…`
 * is a request to the origin ROOT. On a sub-path that is a 404 for every icon and an installed app
 * whose `start_url` opens somebody else's page. Hence: no leading slash is ever typed here.
 */
export const publicUrl = (base: string, path: string): string => `${base}${path}`;

/** The `apple-touch-icon` iOS reads for Add to Home Screen (checklist §3.3). */
export const appleTouchIcon = (base = DEFAULT_BASE): string =>
  publicUrl(base, `${ICONS_DIR}/apple-touch-icon-180.png`);

/**
 * The tab icon — declared, so the browser stops guessing.
 *
 * A document with no `rel="icon"` makes every browser request `/favicon.ico` on its own. Nothing
 * precaches that path, so offline it is a failed request on every screen; naming a file that IS
 * precached is what makes the airplane-mode walkthrough read zero failures (checklist §3.6).
 */
export const favicon = (base = DEFAULT_BASE): string =>
  publicUrl(base, `${ICONS_DIR}/favicon-32.png`);

/**
 * The manifest, exactly as `design/pwa-checklist.md` §3.1 prints it — at the base it prints it for.
 *
 * `id` and `start_url` are the base itself and not `${base}#/`: HashRouter puts every route in the
 * fragment, so the document is always the base and the app resolves its own first screen
 * (`src/App.tsx`). At `/` this is the checklist key for key, which is what `tools/pwa.test.ts`
 * asserts; at `/rung/` every path in it moves with the deploy, which is the whole point — a
 * manifest is the one file no bundler rewrites for you.
 */
export const pwaManifest = (base = DEFAULT_BASE): Partial<ManifestOptions> => ({
  name: BRAND,
  short_name: BRAND,
  id: base,
  start_url: base,
  display: 'standalone',
  orientation: 'portrait',
  background_color: token('--color-bg'),
  theme_color: token('--color-bg'),
  description: 'Climb a language, one checkpoint at a time.',
  // The language of THIS FILE's strings, not of the app: `name` and `description` are English
  // in every course, and there is no active course at install time to ask (#186). Declared
  // rather than inherited from the document, which now says whatever the course's L1 is.
  lang: 'en',
  icons: [
    { src: publicUrl(base, `${ICONS_DIR}/icon-192.png`), sizes: '192x192', type: 'image/png' },
    { src: publicUrl(base, `${ICONS_DIR}/icon-512.png`), sizes: '512x512', type: 'image/png' },
    {
      src: publicUrl(base, `${ICONS_DIR}/maskable-512.png`),
      sizes: '512x512',
      type: 'image/png',
      purpose: 'maskable',
    },
  ],
});

/**
 * vite-plugin-pwa merges its own defaults *under* the manifest it is handed, and one of them —
 * `scope` — is a key `design/pwa-checklist.md` §3.1 does not print. Setting it to `undefined`
 * deletes it from the emitted JSON (the plugin `JSON.stringify`s the merged object), so what
 * ships is the checklist and nothing else. Nothing is lost: `scope` defaults to the `start_url`'s
 * directory — `/` at the default base, `/rung/` on the deploy, which is exactly the scope the
 * worker registers with.
 *
 * `lang` used to be dropped here too, on the grounds that the document already declared
 * `lang="en"`. It no longer does — the document declares the ACTIVE COURSE's L1 (#186) — so the
 * manifest states its own language above, and the checklist prints it.
 */
const PLUGIN_DEFAULTS_DROPPED = { scope: undefined };

/**
 * What the precache must contain, as globs over `dist/` — the SHELL, and only the shell (#211).
 *
 * Each line is a thing that breaks offline for EVERY course by being absent, not a file type
 * someone thought to list: the shell itself (`index.html` + the hashed JS/CSS bundles, which is
 * where `design/tokens.css` ends up), the bundled faces (#85 ships woff2 only — `vite.config.ts`
 * strips @fontsource's `.woff` fallback), the course manifest the app boots from, and the icons.
 *
 * Two lines used to be wider and are now deliberately narrow:
 *
 *   • `content/courses.json`, not `content/**\/*.json`. The manifest is the one content file
 *     every learner in every course reads — the boot gate resolves the active course out of it
 *     before anything else can happen — so it is shell. A course's own `levels.json`,
 *     `strings.json`, `modules/*.json`, `index/*.json` and `sizes.json` are that course's bytes
 *     and reach the device through `COURSE_CONTENT_ROUTE` when the course is opened.
 *   • `**\/*.woff2` MINUS `PRECACHE_IGNORES`. The Barlow faces and the course faces' shared
 *     `latin` subsets render the shell in every course, so they are shell; a script subset
 *     (`mukta-devanagari-*`) is read by the courses written in that script and by nobody else.
 *
 * The icons line is `*.png`, not `*` or `**`, ON PURPOSE: `*` does not cross `/`, so the iOS
 * splash set in `icons/splash/` (#115, `tools/make-splash.ts`) stays out of the precache — the
 * app never fetches a splash image, Safari itself does, once, at Add-to-Home-Screen, so
 * precaching the set would make every first visit download ~70 KiB it can never use. The `.png`
 * narrows it further and deliberately excludes `icons/icon.svg` (#251): the app never fetches
 * that file either — it is the generator's source, read by `tools/make-icons.ts` at build time
 * and by nobody at runtime (every `<link>`/manifest entry names a PNG) — so precaching it would
 * be the same wasted download for the same reason the splash set is out.
 *
 * `tools/pwa.test.ts` holds this list to the budget's attribution file by file: what these globs
 * select over a `dist/` listing must be exactly what `tools/payload-budget.ts` calls `shell`.
 */
export const PRECACHE_GLOBS = [
  '**/*.{html,css,js}',
  '**/*.woff2',
  'content/courses.json',
  `${ICONS_DIR}/*.png`,
];

/**
 * The files the `**\/*.woff2` line would otherwise sweep in: every generated script subset, named
 * `<face>-<script>-<weight>-<hash>.woff2` by `tools/font-subset.ts` (the hash is Vite's). Written
 * from `COURSE_SCRIPTS` rather than typed out, so a course in a new script is excluded from the
 * shell precache by the same table that gives it a `course:` budget row.
 */
export const PRECACHE_IGNORES = [`**/*-{${COURSE_SCRIPTS.join(',')}}-*.woff2`];

/** How many script subsets the font cache keeps — today's build ships 3, so this is several
    builds' worth of history before the least recently used one is dropped. */
const COURSE_FONT_CACHE_ENTRIES = 32;

/** Where the content build emits what `dist/content/` will contain. */
const EMITTED_CONTENT_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'public',
  'content',
);

/**
 * A hash of the content this build is about to ship — the runtime cache's revision (#211).
 *
 * The precache versions itself: workbox stores a revision per file and a new build re-downloads
 * only what changed. A runtime cache has no such thing, and course content is served from URLs
 * that never change (`content/hi-mr/levels.json`), so a cache-first route with a fixed cache name
 * would freeze a learner on the content they first downloaded — new rungs would ship and never
 * arrive, silently, which is the worst way. Hashing the emitted tree into the cache's NAME gives
 * the same guarantee the precache has: content changed → new cache → warmed fresh, old one
 * dropped; content unchanged → same cache → not one byte re-downloaded.
 *
 * `dev` when there is nothing to hash: `npm test` runs before `npm run content:build` in
 * `scripts/verify.sh`, and a name is still needed for the constant the app compiles against.
 */
export function contentRevision(dir = EMITTED_CONTENT_DIR): string {
  const hash = createHash('sha256');
  let files: string[];
  try {
    files = contentFiles(dir).sort();
  } catch {
    return 'dev';
  }
  if (files.length === 0) return 'dev';

  for (const file of files) {
    hash.update(path.relative(dir, file).split(path.sep).join('/'));
    hash.update(readFileSync(file));
  }
  return hash.digest('hex').slice(0, 12);
}

/** Every file under `dir`, recursively. Throws when the directory is not there at all. */
function contentFiles(dir: string): string[] {
  return readdirSync(dir).flatMap((entry) => {
    const full = path.join(dir, entry);
    return statSync(full).isDirectory() ? contentFiles(full) : [full];
  });
}

/**
 * `content/<id>/…` for any course id, and NOT `content/courses.json` — the manifest is shell and
 * is precached, so it must never be answered from a course's cache. A RegExp rather than a
 * string: the base moves with the deploy (`/content/…` at `/`, `/rung/content/…` on Pages) and
 * these routes are same-origin, where workbox matches a RegExp anywhere in the URL.
 */
export const COURSE_CONTENT_ROUTE = /\/content\/[^/]+\/[^?#]+\.json$/;

/**
 * One workbox route, as vite-plugin-pwa takes it. Read off the plugin's own option type rather
 * than imported from `workbox-build`: that package is a transitive dependency the repo has never
 * declared, and a type import is exactly how an undeclared one becomes load-bearing.
 */
type RuntimeCachingRule = NonNullable<
  NonNullable<VitePWAOptions['workbox']>['runtimeCaching']
>[number];

/** The generated script subsets, the same set `PRECACHE_IGNORES` keeps out of the precache. */
export const COURSE_FONT_ROUTE = new RegExp(`-(${COURSE_SCRIPTS.join('|')})-\\d{3}[^/]*\\.woff2$`);

/**
 * The two runtime routes, both **cache-first** (#211).
 *
 * Cache-first is the whole point: after the warm, an active course costs zero network for as long
 * as the build lives — the same promise the precache made, kept for the course the learner
 * actually chose. Nothing here is a network fallback for a missing precache entry; a shell
 * request the precache cannot answer is still a bug in the app.
 *
 * There is deliberately no `NetworkFirst` and no `StaleWhileRevalidate` anywhere: both would put
 * a request on the wire on every launch, which is exactly what PRD-engineering §3/§10 forbids.
 * Freshness is the cache NAME's job (`contentRevision`), not a revalidation's.
 */
export function runtimeCaching(revision: string): RuntimeCachingRule[] {
  return [
    {
      urlPattern: COURSE_CONTENT_ROUTE,
      handler: 'CacheFirst',
      options: {
        cacheName: contentCacheName(revision),
        // Nothing but a real 200 is worth keeping offline; an opaque response would cache a
        // failure that the app could never tell from content.
        cacheableResponse: { statuses: [200] },
      },
    },
    {
      urlPattern: COURSE_FONT_ROUTE,
      handler: 'CacheFirst',
      options: {
        cacheName: COURSE_FONT_CACHE,
        expiration: { maxEntries: COURSE_FONT_CACHE_ENTRIES, purgeOnQuotaError: true },
        cacheableResponse: { statuses: [200] },
      },
    },
  ];
}

/**
 * The precache refuses files over 2 MiB by default and only warns — offline would break quietly,
 * one font or one big module at a time. Everything shipped today is far under this; the ceiling
 * exists so growth trips a build log rather than a plane.
 */
const MAX_PRECACHED_FILE_BYTES = 5 * 1024 * 1024;

/**
 * `VitePWA(pwaOptions(base))` — the whole plugin configuration, and the reason for every line.
 *
 * `base` is the path the build is served from; the plugin already prefixes the precache URLs and
 * the worker's own registration scope with it, so the only thing it must be handed by name is the
 * manifest (see `pwaManifest`).
 *
 * `revision` is the content hash the runtime cache is named after (#211). It is a parameter so
 * `vite.config.ts` can hand the SAME value to the app (`__RUNG_CONTENT_CACHE__`), which is what
 * lets the page drop the caches of older content builds.
 */
export function pwaOptions(
  base = DEFAULT_BASE,
  revision = contentRevision(),
): Partial<VitePWAOptions> {
  return {
    // A shipped build never negotiates an update with the learner: the new worker takes over and
    // the page reloads itself. There is no "refresh to update" toast in this product.
    registerType: 'autoUpdate',
    // The registration is source, not an injected script tag: `src/pwa/registerServiceWorker.ts`.
    injectRegister: null,
    manifest: { ...pwaManifest(base), ...PLUGIN_DEFAULTS_DROPPED },
    // No `includeAssets`, and the plugin's own icon sweep off: `public/` reaches `dist/` on its
    // own and `icons/*.png` below already takes all four (the apple-touch-icon among them, which
    // the manifest does not name). Left on, each manifest icon lands in the precache list twice.
    includeManifestIcons: false,
    workbox: {
      globPatterns: PRECACHE_GLOBS,
      globIgnores: PRECACHE_IGNORES,
      maximumFileSizeToCacheInBytes: MAX_PRECACHED_FILE_BYTES,
      // Every build hashes its own precache; activating one deletes the caches of the ones
      // before it, so a phone never carries two shells' worth of assets. The course caches are
      // NOT workbox precaches and survive this, which is the point: an update that does not
      // change a course's content leaves that course's offline copy exactly where it is.
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      skipWaiting: true,
      // A deep link typed by hand still lands on the shell; HashRouter reads the route out of
      // the fragment, which never reaches the network.
      navigateFallback: 'index.html',
      // The active course, cache-first — see `runtimeCaching` above for why these two exist and
      // why neither of them ever prefers the network.
      runtimeCaching: runtimeCaching(revision),
    },
    // `vite dev` serves no worker at all, so HMR is never fighting a cache and `npm run dev` is
    // exactly what it was before this ticket. The worker exists in `build` and `preview`.
    devOptions: { enabled: false },
  };
}
