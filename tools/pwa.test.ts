/**
 * The manifest is a contract with a document (#90).
 *
 * `design/pwa-checklist.md` §3.1 prints the exact JSON this product must ship, and the design
 * package is read-only and re-copied wholesale — so the checklist is the authority and this file
 * is what makes that mechanical: it parses the JSON out of the checklist and deep-equals it
 * against what `tools/pwa.ts` hands the plugin. A checklist edit that the build does not follow
 * is a red test; nothing else in the repo would ever notice.
 *
 * The rest of the file guards the things that break offline silently: a precache glob quietly
 * dropped (the fonts, the course JSON), a runtime network route appearing where the product has
 * none, an icon the manifest names and `public/` does not have.
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { BRAND } from '../src/brand.ts';
import {
  appleTouchIcon,
  favicon,
  PRECACHE_GLOBS,
  pwaManifest,
  pwaOptions,
  publicUrl,
} from './pwa.ts';
import { token } from './tokens.ts';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const repoFile = (name: string) => path.join(REPO_ROOT, name);

/* --------------------------------------------------------------- the checklist, as the source */

/**
 * The first ```json fence in `design/pwa-checklist.md` — §3.1, the manifest. Parsed rather than
 * transcribed: a copy of the block in this file would drift with exactly the same silence.
 */
function checklistManifest(): Record<string, unknown> {
  const checklist = readFileSync(repoFile('design/pwa-checklist.md'), 'utf8');
  const fence = checklist.match(/```json\n([\s\S]*?)```/);
  if (fence === null) throw new Error('pwa: no ```json block in design/pwa-checklist.md');

  return JSON.parse(fence[1]!) as Record<string, unknown>;
}

/**
 * The checklist plus the ONE key the product declares that §3.1 does not print: `lang` (#186).
 *
 * `design/` is read-only and gets wiped on re-copy (docs/01-plan.md §10), so a sanctioned
 * divergence is recorded here and in `docs/05-pwa-notes.md` rather than edited into the package.
 * The divergence is small and one-directional: the manifest's own strings (`name`,
 * `description`) are English in every course, and the document can no longer speak for them —
 * `CourseProvider` sets `documentElement.lang` to the ACTIVE COURSE's L1, so a hi-mr install
 * serves a `lang="hi"` document. Everything else is still the checklist, key for key.
 */
function expectedManifest(): Record<string, unknown> {
  return { ...checklistManifest(), lang: 'en' };
}

/** PNG dimensions off the IHDR header — no decoder, and no dependency on sharp to read one. */
function pngSize(file: string): { width: number; height: number } {
  const header = readFileSync(file).subarray(0, 24);
  expect(header.subarray(1, 4).toString('ascii'), `${file} is not a PNG`).toBe('PNG');

  return { width: header.readUInt32BE(16), height: header.readUInt32BE(20) };
}

/* -------------------------------------------------------------------------------- the manifest */

describe('the manifest is the checklist', () => {
  it('matches design/pwa-checklist.md §3.1 key for key, plus its own lang', () => {
    expect(pwaManifest()).toEqual(expectedManifest());
  });

  it('takes the name from src/brand.ts, not from a string typed twice', () => {
    const checklist = checklistManifest();

    expect(pwaManifest().name).toBe(BRAND);
    expect(pwaManifest().short_name).toBe(BRAND);
    // …and the checklist agrees, so the brand constant is not quietly renaming the product.
    expect(checklist['name']).toBe(BRAND);
  });

  it('takes both colours from design/tokens.css --color-bg', () => {
    const paper = token('--color-bg');

    expect(paper).toBe('#f2f2f3');
    expect(pwaManifest().background_color).toBe(paper);
    expect(pwaManifest().theme_color).toBe(paper);
  });

  it('deletes the one key the plugin would otherwise add, and declares its own lang', () => {
    const manifest = pwaOptions().manifest as Record<string, unknown>;
    const deleted = Object.entries(manifest)
      .filter(([, value]) => value === undefined)
      .map(([key]) => key)
      .sort();

    // `undefined` is how a key is removed from the emitted JSON; the checklist prints no scope.
    expect(deleted).toEqual(['scope']);
    // `lang` is no longer dropped with it: it is the manifest's OWN language (#186), stated
    // rather than left to a document that now declares the active course's L1 instead.
    expect(pwaManifest().lang).toBe('en');
    expect(JSON.parse(JSON.stringify(manifest))).toEqual(expectedManifest());
  });
});

/* ------------------------------------------------------------------------------- the sub-path */

/**
 * The deploy is a PROJECT site — `https://rishabh7g.github.io/rung/` (#91) — so the build runs
 * with `VITE_BASE=/rung/`. Vite rewrites `index.html` and the app reads `import.meta.env.BASE_URL`,
 * but the manifest is JSON nothing rewrites: a `/icons/…` in it resolves against the origin ROOT,
 * where there is no app. That failure is silent (a 404 for an icon, an installed app that opens
 * the wrong page), so it is asserted here rather than discovered on a phone.
 */
describe('the manifest follows the base the build is served from', () => {
  const BASE = '/rung/';

  it('is the checklist with the base in front of every path', () => {
    // Mechanical: the checklist prints the manifest for a site at `/`, so the sub-path build is
    // that same document with `/rung` in front of each root-absolute path, and nothing else
    // changed. Only a value can start with `"/` — no key in it does.
    const subPath = JSON.stringify(expectedManifest()).replaceAll('"/', `"${BASE}`);

    expect(pwaManifest(BASE)).toEqual(JSON.parse(subPath));
  });

  it('opens the app and not the origin root — id, start_url and scope', () => {
    const emitted = JSON.parse(JSON.stringify(pwaOptions(BASE).manifest)) as Record<
      string,
      unknown
    >;

    expect(emitted['id']).toBe(BASE);
    expect(emitted['start_url']).toBe(BASE);
    // `scope` is deleted, so the browser derives it from `start_url`'s directory — which is the
    // base, and the same scope vite-plugin-pwa registers the worker with.
    expect(emitted).not.toHaveProperty('scope');
  });

  it('leaves no icon pointing above the base', () => {
    const paths = [
      ...(pwaManifest(BASE).icons ?? []).map((icon) => icon.src),
      appleTouchIcon(BASE),
      favicon(BASE),
    ];

    expect(paths).not.toHaveLength(0);
    for (const path of paths) expect(path.startsWith(BASE)).toBe(true);
  });

  it('is `/` for dev, preview and every test — the default, so nothing else moves', () => {
    expect(pwaManifest().start_url).toBe('/');
    expect(publicUrl('/', 'icons/icon-192.png')).toBe('/icons/icon-192.png');
    expect(appleTouchIcon()).toBe('/icons/apple-touch-icon-180.png');
    expect(favicon()).toBe('/icons/favicon-32.png');
  });
});

/* ----------------------------------------------------------------------------------- the icons */

describe('the icons the manifest names', () => {
  const icons = [
    ...(pwaManifest().icons ?? []).map((icon) => ({ src: icon.src, sizes: icon.sizes ?? '' })),
    { src: appleTouchIcon(), sizes: '180x180' },
    { src: favicon(), sizes: '32x32' },
  ];

  it.each(icons)('ships $src at $sizes', ({ src, sizes }) => {
    const file = repoFile(`public${src}`);

    expect(
      existsSync(file),
      `${src} is in the manifest and not in public/ — npm run icons:build`,
    ).toBe(true);

    expect(sizes).toMatch(/^\d+x\d+$/);
    const [width, height] = sizes.split('x').map(Number);
    expect(pngSize(file)).toEqual({ width, height });
  });

  it('offers a maskable icon — Android crops, and a cropped mark is a broken mark', () => {
    expect((pwaManifest().icons ?? []).some((icon) => icon.purpose === 'maskable')).toBe(true);
  });
});

/* ------------------------------------------------------------------------- the precache and iOS */

describe('the precache', () => {
  const { workbox, registerType, devOptions } = pwaOptions();

  it('takes the app shell, every face and every course JSON', () => {
    expect(workbox?.globPatterns).toEqual(PRECACHE_GLOBS);
    // Each of these is a thing that breaks offline by being absent, not a file type.
    expect(PRECACHE_GLOBS).toContain('**/*.{html,css,js}');
    expect(PRECACHE_GLOBS).toContain('**/*.woff2');
    expect(PRECACHE_GLOBS).toContain('content/**/*.json');
  });

  it('routes nothing at runtime — there is no network to fall back to', () => {
    expect(workbox?.runtimeCaching).toEqual([]);
  });

  it('cleans up the caches of the builds before it', () => {
    expect(workbox?.cleanupOutdatedCaches).toBe(true);
    expect(workbox?.skipWaiting).toBe(true);
    expect(workbox?.clientsClaim).toBe(true);
    expect(registerType).toBe('autoUpdate');
  });

  it('serves no worker in `vite dev` — HMR never fights a cache', () => {
    expect(devOptions?.enabled).toBe(false);
  });
});

describe('index.html carries the iOS basics (checklist §3.3)', () => {
  const html = readFileSync(repoFile('index.html'), 'utf8');

  // The two hrefs stay root-absolute in the SOURCE document on purpose: Vite rewrites the `href`
  // of every asset link it resolves with the build's base, so `/icons/…` leaves `dist/` as
  // `/rung/icons/…` on the sub-path deploy (#91). The manifest is the file that has to say the
  // base itself, and does — see "the manifest follows the base" above.
  it('names the 180px apple-touch-icon the icon set generates', () => {
    expect(html).toContain(`href="${appleTouchIcon()}"`);
  });

  it('declares a favicon, so the browser never guesses /favicon.ico offline', () => {
    expect(html).toContain(
      `<link rel="icon" type="image/png" sizes="32x32" href="${favicon()}" />`,
    );
  });

  it('declares standalone capability and the translucent status bar', () => {
    expect(html).toContain('<meta name="apple-mobile-web-app-capable" content="yes" />');
    expect(html).toContain(
      '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />',
    );
  });

  it('leaves the theme colour to the token substitution, never to a typed hex', () => {
    expect(html).toContain('content="%THEME_COLOR%"');
    expect(html).not.toMatch(/#[0-9a-fA-F]{6}/);
  });
});
