/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { BRAND } from './src/brand.ts';

/** Substitutes %BRAND% in index.html so src/brand.ts stays the single source of the name. */
function brandHtml(): Plugin {
  return {
    name: 'rung-brand-html',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) => html.replaceAll('%BRAND%', BRAND),
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
  plugins: [react(), brandHtml(), woff2Only()],
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
