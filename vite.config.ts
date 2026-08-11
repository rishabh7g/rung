/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { BRAND } from './src/brand.ts';
import { pwaOptions } from './tools/pwa.ts';
import { token } from './tools/tokens.ts';

/**
 * Substitutes the two build-time values index.html carries, so each keeps ONE source: %BRAND%
 * from src/brand.ts, and %THEME_COLOR% from design/tokens.css's --color-bg (#90). The theme
 * colour is also the manifest's `background_color`/`theme_color` (tools/pwa.ts) — one token, one
 * paper ground, in the browser chrome and in the app.
 */
function htmlValues(): Plugin {
  return {
    name: 'rung-html-values',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) =>
        html.replaceAll('%BRAND%', BRAND).replaceAll('%THEME_COLOR%', token('--color-bg')),
    },
  };
}

/**
 * Drops the `.woff` fallback @fontsource writes beside every `.woff2` (#85).
 *
 * Vite emits an asset for every `url()` it can resolve, so leaving the fallback in doubles the
 * font payload in `dist/` — and this product precaches all of it for offline (design/
 * pwa-checklist.md §3), so every shipped byte is a downloaded byte. Nothing we target can use
 * it: browser support is Chrome Android and Safari iOS current-1 (PRD-engineering §10), both of
 * which have shipped woff2 since 2016. `enforce: 'pre'` so this runs before Vite's CSS plugin
 * resolves the urls; the rewrite is scoped to @fontsource's own stylesheets and leaves a `src`
 * it does not recognise alone.
 */
function woff2Only(): Plugin {
  return {
    name: 'rung-woff2-only',
    enforce: 'pre',
    transform(code, id) {
      if (!id.includes('@fontsource') || !id.split('?')[0]?.endsWith('.css')) return null;
      const woff2Src = code.replaceAll(/,\s*url\([^)]+\.woff\)\s*format\('woff'\)/g, '');
      return woff2Src === code ? null : { code: woff2Src, map: null };
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  // VitePWA runs after woff2Only so the precache manifest sees the fonts that actually shipped.
  plugins: [react(), htmlValues(), woff2Only(), VitePWA(pwaOptions())],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}', 'tools/**/*.test.ts', 'scripts/**/*.test.ts'],
    // Stylesheets stay stubbed — components are tested through the DOM, and jsdom resolves
    // neither env() nor max() anyway. The one exception is an explicit `?raw` import: the style
    // guards (src/styleContract.test.ts, src/shell/layout.test.ts) read the CSS as text, and
    // without this vitest hands them its class-name proxy instead of the source.
    css: { include: [/\.css\?raw$/] },
  },
});
