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

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), brandHtml()],
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
