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
    include: ['src/**/*.test.{ts,tsx}', 'tools/**/*.test.ts'],
  },
});
