import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// The three product faces, self-hosted [D15]. The prototype pulls Mukta off Google Fonts and an
// offline PWA cannot: the first load with no network would fall back to a system face, and on a
// device with no Devanagari installed that means boxes (design/pwa-checklist.md §2).
//
// One import per (family, weight) — @fontsource ships woff2 with `font-display: swap`, and
// `vite.config.ts` drops the .woff fallback it writes beside each one so only woff2 reaches
// dist. Every weight the ramp in tokens.css asks for is here, and `src/fonts.test.ts` fails
// naming any that goes missing: a weight the ramp names and the bundle lacks is not an error
// anywhere, it is a browser silently synthesising the face.
//
// Mukta 500 and Barlow 400–600 are wider than today's ramp (tokens.md §2 puts Mukta at 400–700
// and Barlow across the UI); the whole bundle is unsubset, which is #113's ticket — the byte
// count and the first cuts to make are in docs/04-font-notes.md.
import '@fontsource/mukta/400.css';
import '@fontsource/mukta/500.css';
import '@fontsource/mukta/600.css';
import '@fontsource/mukta/700.css';
import '@fontsource/barlow/400.css';
import '@fontsource/barlow/500.css';
import '@fontsource/barlow/600.css';
import '@fontsource/barlow-condensed/500.css';
import '@fontsource/barlow-condensed/600.css';
import '@fontsource/barlow-condensed/700.css';
// design/ is read-only and re-copied wholesale from the design tooling, so tokens are
// imported IN PLACE — token updates flow with zero copy step (docs/design-contract.md).
import '../design/tokens.css';
import './styles/global.css';
import App from './App.tsx';
import { registerServiceWorker } from './pwa/registerServiceWorker.ts';

const root = document.getElementById('root');
if (!root) throw new Error('Root element #root is missing from index.html');

// Offline is the product (design/pwa-checklist.md §3): the first visit installs a worker that
// precaches the shell, every face and every course JSON, and no visit after it needs a network.
// A no-op in `vite dev` — the worker is built and served in `build`/`preview` only.
registerServiceWorker();

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
