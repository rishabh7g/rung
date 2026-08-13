import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// The four product faces, self-hosted [D15] and right-sized (#113, #197). The prototype pulls Mukta
// off Google Fonts and an offline PWA cannot: the first load with no network would fall back to
// a system face, and on a device with no Devanagari installed that means boxes
// (design/pwa-checklist.md §2).
//
// Only what the ramp renders ships, and only the script subsets it needs — `src/fonts.test.ts`
// holds these imports to the (family, weight) pairs `design/tokens.css` asks for, in both
// directions. Mukta is subset per course at build time (`tools/font-subset.ts` — its css below
// is committed, its woff2 generated from the content build's output); Barlow and Barlow
// Condensed carry open-ended UI English, so their @fontsource `latin` files ship whole while
// latin-ext and vietnamese stay out of the graph. Noto Naskh Arabic is cut the same way as Mukta
// and for the same reason (#197): the romanized courses' quiet native line has no other face that
// draws Arabic. `vite.config.ts` drops @fontsource's `.woff` fallbacks so only woff2 reaches dist.
// Byte accounting: docs/05-perf-notes.md.
import './fonts/mukta.css';
import './fonts/naskh.css';
import '@fontsource/barlow/latin-400.css';
import '@fontsource/barlow-condensed/latin-600.css';
import '@fontsource/barlow-condensed/latin-700.css';

if (import.meta.env.DEV) {
  // latin-ext, for the one surface only a dev build has: `/dev/type`'s diacritic rows (ī ā ū —
  // docs/04-font-notes.md §4). en-ar ships now (#202) and this is still dev-only, because Barlow
  // never draws its romanization: every L2 line in the product is `--font-devanagari` (Mukta), and
  // the marks Mukta's `unicode-range` drops fall through to `system-ui`, not to Barlow. Dynamic
  // imports inside a DEV branch never enter a production graph — the `src/dev/typeRoute.tsx`
  // pattern.
  void import('@fontsource/barlow/latin-ext-400.css');
  void import('@fontsource/barlow-condensed/latin-ext-600.css');
  void import('@fontsource/barlow-condensed/latin-ext-700.css');
}
// design/ is read-only and re-copied wholesale from the design tooling, so tokens are
// imported IN PLACE — token updates flow with zero copy step (docs/design-contract.md).
import '../design/tokens.css';
// …and the one file allowed to change a token value, imported straight after it so it wins on
// order alone (#197). Every row in it is a written-down engineering divergence from the design
// package; adding one without the `docs/` entry is the failure it exists to prevent.
import './styles/tokenOverrides.css';
import './styles/global.css';
import App from './App.tsx';
import { registerServiceWorker } from './pwa/registerServiceWorker.ts';

const root = document.getElementById('root');
if (!root) throw new Error('Root element #root is missing from index.html');

// Offline is the product (design/pwa-checklist.md §3): the first visit installs a worker that
// precaches the shell and cache-first-routes the active course, which `CourseProvider` warms as
// soon as it resolves one (#211) — after that no visit needs a network.
// A no-op in `vite dev` — the worker is built and served in `build`/`preview` only.
registerServiceWorker();

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
