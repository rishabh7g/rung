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
 * The service worker precaches EVERYTHING and routes nothing at runtime. That is not a
 * performance choice: PRD-engineering §3/§10 is zero network after first load, so a request the
 * precache does not answer is a bug in the app rather than a case for a network fallback. There
 * is deliberately no `runtimeCaching`.
 */
import type { ManifestOptions, VitePWAOptions } from 'vite-plugin-pwa';
import { BRAND } from '../src/brand.ts';
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
 * What the precache must contain, as globs over `dist/`.
 *
 * Each line is a thing that breaks offline by being absent, not a file type someone thought to
 * list: the shell (`index.html` + the hashed JS/CSS bundles, which is where `design/tokens.css`
 * ends up), every bundled face (#85 ships woff2 only — `vite.config.ts` strips @fontsource's
 * `.woff` fallback), the whole of `public/content/` as the build emitted it (`courses.json` plus
 * each course's `levels.json`, `strings.json`, `modules/*.json` and `index/*.json`), and the
 * icons. `tools/pwa.test.ts` asserts the content and font lines are still here.
 *
 * The icons line is `*`, not `**`, ON PURPOSE: `*` does not cross `/`, so the iOS splash set in
 * `icons/splash/` (#115, `tools/make-splash.ts`) stays out of the precache. The app never
 * fetches a splash image — Safari itself does, once, at Add-to-Home-Screen — so precaching the
 * set would make every first visit download ~70 KiB it can never use.
 */
export const PRECACHE_GLOBS = [
  '**/*.{html,css,js}',
  '**/*.woff2',
  'content/**/*.json',
  `${ICONS_DIR}/*.png`,
];

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
 */
export function pwaOptions(base = DEFAULT_BASE): Partial<VitePWAOptions> {
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
      maximumFileSizeToCacheInBytes: MAX_PRECACHED_FILE_BYTES,
      // Every build hashes its own precache; activating one deletes the caches of the ones
      // before it, so a phone never carries two ladders' worth of content.
      cleanupOutdatedCaches: true,
      clientsClaim: true,
      skipWaiting: true,
      // A deep link typed by hand still lands on the shell; HashRouter reads the route out of
      // the fragment, which never reaches the network.
      navigateFallback: 'index.html',
      // Nothing. There is no runtime network to cache (Invariant: zero network after first load).
      runtimeCaching: [],
    },
    // `vite dev` serves no worker at all, so HMR is never fighting a cache and `npm run dev` is
    // exactly what it was before this ticket. The worker exists in `build` and `preview`.
    devOptions: { enabled: false },
  };
}
