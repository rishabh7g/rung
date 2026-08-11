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
import { APPLE_TOUCH_ICON, FAVICON, PRECACHE_GLOBS, PWA_MANIFEST, pwaOptions } from './pwa.ts';
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

/** PNG dimensions off the IHDR header — no decoder, and no dependency on sharp to read one. */
function pngSize(file: string): { width: number; height: number } {
  const header = readFileSync(file).subarray(0, 24);
  expect(header.subarray(1, 4).toString('ascii'), `${file} is not a PNG`).toBe('PNG');

  return { width: header.readUInt32BE(16), height: header.readUInt32BE(20) };
}

/* -------------------------------------------------------------------------------- the manifest */

describe('the manifest is the checklist', () => {
  it('matches design/pwa-checklist.md §3.1 key for key', () => {
    expect(PWA_MANIFEST).toEqual(checklistManifest());
  });

  it('takes the name from src/brand.ts, not from a string typed twice', () => {
    const checklist = checklistManifest();

    expect(PWA_MANIFEST.name).toBe(BRAND);
    expect(PWA_MANIFEST.short_name).toBe(BRAND);
    // …and the checklist agrees, so the brand constant is not quietly renaming the product.
    expect(checklist['name']).toBe(BRAND);
  });

  it('takes both colours from design/tokens.css --color-bg', () => {
    const paper = token('--color-bg');

    expect(paper).toBe('#f2f2f3');
    expect(PWA_MANIFEST.background_color).toBe(paper);
    expect(PWA_MANIFEST.theme_color).toBe(paper);
  });

  it('deletes the two keys the plugin would otherwise add', () => {
    const manifest = pwaOptions().manifest as Record<string, unknown>;
    const deleted = Object.entries(manifest)
      .filter(([, value]) => value === undefined)
      .map(([key]) => key)
      .sort();

    // `undefined` is how a key is removed from the emitted JSON; the checklist prints neither.
    expect(deleted).toEqual(['lang', 'scope']);
    expect(JSON.parse(JSON.stringify(manifest))).toEqual(checklistManifest());
  });
});

/* ----------------------------------------------------------------------------------- the icons */

describe('the icons the manifest names', () => {
  const icons = [
    ...(PWA_MANIFEST.icons ?? []).map((icon) => ({ src: icon.src, sizes: icon.sizes ?? '' })),
    { src: APPLE_TOUCH_ICON, sizes: '180x180' },
    { src: FAVICON, sizes: '32x32' },
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
    expect((PWA_MANIFEST.icons ?? []).some((icon) => icon.purpose === 'maskable')).toBe(true);
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

  it('names the 180px apple-touch-icon the icon set generates', () => {
    expect(html).toContain(`href="${APPLE_TOUCH_ICON}"`);
  });

  it('declares a favicon, so the browser never guesses /favicon.ico offline', () => {
    expect(html).toContain(`<link rel="icon" type="image/png" sizes="32x32" href="${FAVICON}" />`);
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
