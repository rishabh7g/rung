import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// The three product faces, self-hosted [D15] and right-sized (#113). The prototype pulls Mukta
// off Google Fonts and an offline PWA cannot: the first load with no network would fall back to
// a system face, and on a device with no Devanagari installed that means boxes
// (design/pwa-checklist.md §2).
//
// Only what the ramp renders ships, and only the script subsets it needs — `src/fonts.test.ts`
// holds these imports to the (family, weight) pairs `design/tokens.css` asks for, in both
// directions. Mukta is subset per course at build time (`tools/font-subset.ts` — its css below
// is committed, its woff2 generated from the content build's output); Barlow and Barlow
// Condensed carry open-ended UI English, so their @fontsource `latin` files ship whole while
// latin-ext and vietnamese stay out of the graph. `vite.config.ts` drops @fontsource's `.woff`
// fallbacks so only woff2 reaches dist. Byte accounting: docs/05-perf-notes.md.
import './fonts/mukta.css';
import '@fontsource/barlow/latin-400.css';
import '@fontsource/barlow-condensed/latin-600.css';
import '@fontsource/barlow-condensed/latin-700.css';

if (import.meta.env.DEV) {
  // latin-ext, for the surfaces only a dev build has: the en-ar fixture course and `/dev/type`'s
  // diacritic rows (ī ā ū — docs/04-font-notes.md §4). Dynamic imports inside a DEV branch never
  // enter a production graph — the same pattern as `src/dev/typeRoute.tsx`.
  void import('@fontsource/barlow/latin-ext-400.css');
  void import('@fontsource/barlow-condensed/latin-ext-600.css');
  void import('@fontsource/barlow-condensed/latin-ext-700.css');
}
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
