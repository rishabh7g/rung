# PWA notes — manifest, precache-everything worker, offline gate (#90)

What making `rung` a real PWA proved, and the evidence for the release gate in
`design/pwa-checklist.md` §3.6. This file is in `docs/`, not `design/`: `design/` is re-copied
wholesale from Rishabh's tooling, which wipes anything added to it
(`docs/design-contract.md`).

**Verdict in one line:** a cold start with the origin server **killed** and the browser put
offline renders Ladder → Module → Sentence Detail with **57 requests, 57 of them served by the
service worker, 0 from the network and 0 failed**; the strict build precaches **41 files
(1,098,926 bytes / 1073.2 KiB)** and a dev-content build **55 files (1,225,818 bytes /
1197.1 KiB)**; Chrome reports **zero manifest errors and zero installability errors**.

---

## 1. What ships

| Piece | Where |
|---|---|
| Plugin config — manifest, globs, workbox | `tools/pwa.ts` (`vite.config.ts` is one line: `VitePWA(pwaOptions())`) |
| Icons, generated from the header rails mark | `tools/make-icons.ts` → `public/icons/*.png`, committed |
| Registration | `src/pwa/registerServiceWorker.ts`, called from `src/main.tsx` |
| Storage durability | `src/state/durableStorage.ts`, the store's `storage` |
| iOS meta + favicon + theme colour | `index.html` |

Two values are never typed twice: the name comes from `src/brand.ts` and both manifest colours
plus `<meta name="theme-color">` come from `design/tokens.css` `--color-bg` (`tools/tokens.ts`,
and the `%THEME_COLOR%` substitution in `vite.config.ts`).

### The manifest is the checklist

`design/pwa-checklist.md` §3.1 prints the exact JSON, so `tools/pwa.test.ts` **parses that block
out of the checklist** and deep-equals it against what the plugin is handed. What `dist/` emits:

```json
{"name":"rung","short_name":"rung","description":"Climb a language, one checkpoint at a time.",
 "lang":"en",
 "start_url":"/","display":"standalone","background_color":"#f2f2f3","theme_color":"#f2f2f3",
 "id":"/","orientation":"portrait","icons":[
  {"src":"/icons/icon-192.png","sizes":"192x192","type":"image/png"},
  {"src":"/icons/icon-512.png","sizes":"512x512","type":"image/png"},
  {"src":"/icons/maskable-512.png","sizes":"512x512","type":"image/png","purpose":"maskable"}]}
```

Key for key, the checklist and nothing else. vite-plugin-pwa merges its own defaults *under* the
manifest it is given, which adds `lang: "en"` and `scope`; `scope` is set to `undefined` so it is
deleted from the emitted JSON, and nothing is lost — it defaults to the `start_url`'s directory
(`/`), which is the scope the worker registers with anyway.

`lang` was dropped the same way until #186, on the grounds that the document already declared
`lang="en"`. It does not any more: `CourseProvider` sets `documentElement.lang` to the active
course's L1, so a hi-mr install serves a `lang="hi"` document. The manifest therefore states its
own language explicitly — `"en"`, because `name` and `description` are English in every course
and there is no active course at install time to ask.

That is a **sanctioned divergence from the checklist**, the only one: §3.1 does not print `lang`,
and `design/` is read-only and wiped on re-copy (01-plan §10), so it is recorded here and encoded
in `tools/pwa.test.ts` (`expectedManifest()` = the parsed block + `lang`) rather than edited into
the package. Every other key is still the checklist, parsed and deep-equalled.

## 2. The icons are the header mark, read not redrawn

`src/shell/RailsMark.tsx` says its geometry is the ticket's verbatim SVG and is not to be
redrawn. So `tools/make-icons.ts` **reads that component** — the same source-scan idiom as
`src/fonts.test.ts` — lifts its five `<line>`/`<rect>` elements, resolves the colours the
component defers to the page (`currentColor` → `--color-text`, `var(--color-accent)`) out of
`design/tokens.css`, stands them on the `--color-bg` ground and rasterises with sharp. There is
no second copy of the mark anywhere: change the header and `npm run icons:build` follows it.

| File | Size | Mark height | Bytes |
|---|---|---|---|
| `icon-192.png` | 192 | 64% | 897 |
| `icon-512.png` | 512 | 64% | 3,182 |
| `maskable-512.png` | 512 | **50%** | 2,892 |
| `apple-touch-icon-180.png` | 180 | 64% | 799 |
| `favicon-32.png` | 32 | 64% | 285 |

**The maskable safe zone is arithmetic, not judgement.** A launcher may crop to a circle of 80%
of the icon's width, i.e. radius 0.4 × size. The mark's ink box is 9.5 × 17.5 in a viewBox of 20,
so at 50% height its own half-diagonal is `hypot(0.136, 0.25) = 0.284 × size` — inside 0.4 with
room to spare. `tools/make-icons.test.ts` asserts that number, and asserts the plain icons sit
*outside* it: they are never cropped, and a mark shrunk for a crop that will not happen is a
smaller mark for nothing.

`favicon-32.png` is here for an offline reason, not a cosmetic one — see §4.

> **#115 re-cut this set** from the ratified §6.4 construction grid after the header component
> adopted it — same pipeline, same five files, and the iOS splash set beside them. The bytes
> above are #90's receipt; §11 is the current one.

## 3. Precache everything, route nothing

`registerType: 'autoUpdate'`, workbox `generateSW`, `cleanupOutdatedCaches` on, and
**`runtimeCaching: []`**. There is no runtime network to fall back to (PRD-engineering §3/§10),
so a request the precache does not answer is a bug in the app, not a case for a network route.

Globs (`tools/pwa.ts`), each one a thing that breaks offline by being absent:
`**/*.{html,css,js}` · `**/*.woff2` · `content/**/*.json` · `icons/*.png`.

    strict build (npm run build)              dev-content build (--with-unverified --with-fixtures)
    html            1       2,014 B           html            1       2,014 B
    js              2     231,298 B           js              2     231,298 B
    css             1      33,345 B           css             1      33,345 B
    woff2          30     823,736 B           woff2          30     823,736 B
    json            1          20 B           json           15     126,912 B
    png             5       8,055 B           png             5       8,055 B
    webmanifest     1         458 B           webmanifest     1         458 B
    TOTAL          41   1,098,926 B           TOTAL          55   1,225,818 B

All 30 woff2 (#85's whole bundle — `docs/04-font-notes.md` §5) and every content JSON the build
emitted: `courses.json`, and per course `levels.json`, `strings.json`, `modules/*.json` and
`index/*.json`. The one CSS entry is the bundle `design/tokens.css` compiles into.

**A strict build precaches one content file, `courses.json`, and it says `{"courses": []}`.**
That is the native gate (#64), not a precache bug: every module in `content/` is
`verified: false`, so `npm run build` ships an empty ladder (README, "The content gate"). The
offline walkthrough below therefore runs against a **dev-content build**, which is the only build
that has a module to browse.

## 4. The offline gate (checklist §3.6)

No phone is attached to this machine, so the gate was run headlessly against Chromium 151 over
CDP. It is stricter than airplane mode in one way that matters: **the origin server is killed
between the two phases**, so there is no server to answer even if the emulation leaked.

```
1. npm run content:build -- --with-unverified --with-fixtures && npx vite build
2. npx vite preview --port 4173 --host 127.0.0.1
3. chrome --headless=new --user-data-dir=<fresh profile>  → load http://127.0.0.1:4173/
     wait for navigator.serviceWorker.ready, poll caches until the entry count settles
4. Browser.close (flushes the profile), then kill the preview server
     curl http://127.0.0.1:4173/  →  exit 7, connection refused
5. relaunch chrome on the SAME profile  →  COLD start, new process, new tab
     Network.emulateNetworkConditions {offline: true} BEFORE the first navigation
     Target.setAutoAttach, so the service-worker target is put offline and recorded too
6. walk it, recording every Network.* event
```

Phase 3 reported `controller: /sw.js`, `active: activated`, and one cache —
`workbox-precache-v2-http://127.0.0.1:4173/` — holding all **55** entries.

### The walk, offline, cold

| # | Step | Screenshot |
|---|---|---|
| 1 | Boot at `/` → Ladder: level strip, current rung, ownership footer | ![Ladder, offline cold start](images/offline-ladder-390.png) |
| 2 | Click the rung card's CTA → `#/module/L1-M1`, ten sentence cards | ![Module list, offline](images/offline-module-390.png) |
| 3 | Expand a card, click "open full" → `#/sentence/L1-M1-S01` | ![Sentence Detail, offline](images/offline-sentence-390.png) |
| 4 | Reload, still offline → same route, still controlled | — |
| 5 | Cold deep link `about:blank` → `/#/module/L1-M1` | ![Deep link, offline](images/offline-deep-link-390.png) |

**Result: 57 requests · 57 `fromServiceWorker` · 0 from the network · 0 failed.** Every shell
asset, all ten used woff2 faces, `courses.json`, `hi-mr/levels.json`, `hi-mr/strings.json`,
`hi-mr/modules/L1-M1.json`, the manifest and `icon-192.png` came out of the precache with the
server dead. Devanagari renders — the faces are bundled, so there is no fallback to system and no
tofu (`docs/04-font-notes.md` §3).

Two things this found, both fixed here:

- **`/favicon.ico`.** A document that declares no icon makes the browser guess that path, which
  nothing precaches: the first run showed five `net::ERR_INTERNET_DISCONNECTED` failures, one per
  screen. `index.html` now declares `/icons/favicon-32.png`, which is precached. Zero failures.
- **A *force* reload bypasses the worker.** `Page.reload {ignoreCache: true}` is shift-reload
  semantics, and the spec says it goes straight to the network — offline that is one failed
  request for `/`, after which the browser retries through the worker and the page loads anyway.
  Browser behaviour, not an app gap; a normal reload (step 4) is 100% worker.

`navigator.onLine` reads `true` throughout: Chrome 151 does not flip it for CDP network
emulation. It is a hint, not the gate — the gate is that the server is dead and Chrome reports
every response as coming from the worker.

## 5. Installability

**Lighthouse could not answer this.** Lighthouse removed the PWA category in v12; on v13.4.1 the
audits `installable-manifest`, `service-worker`, `maskable-icon` and `apple-touch-icon` no longer
exist and a run requesting them returns zero audits. So the verdict comes from Chrome itself, via
CDP against the preview build:

```
Page.getAppManifest        → errors: []
Page.getInstallabilityErrors → installabilityErrors: []
```

Zero parse errors, zero installability errors, manifest resolved at
`/manifest.webmanifest`, scope `/`.

## 6. Storage durability (checklist §3.5)

`src/state/durableStorage.ts` wraps `localStorage` for the store and asks
`navigator.storage.persist()` **once, after the first write** — asking before there is anything
to keep is asking to protect an empty box, and asking on every save would be a permission prompt
in the browsers that show one. The outcome is logged and nothing else: there is no second storage
to fall back to, and F7's manual export is the real answer to durability. What the log buys is an
explanation on the day a ladder does vanish.

Headless Chrome, unsurprisingly, declines — the console line on every run above is:

    rung: storage persistence denied — progress is evictable (F7 export is the backup)

Chrome grants it outright for an *installed* PWA, which is the state this app is meant to be in
and is exactly what a headless profile is not.

## 7. `npm run dev` is untouched

`devOptions.enabled: false`, so no worker is generated or served in development and HMR is never
fighting a cache. Verified on a running dev server: `virtual:pwa-register` resolves to the
plugin's stub (`function registerSW() { return async () => {} }`), `index.html` carries no
`<link rel="manifest">` and no registration script, and `/sw.js` is Vite's SPA fallback
(`Content-Type: text/html`) rather than a worker. The worker exists in `build` and `preview`.

## 8. Deferred — needs a physical device

Nothing below is claimed by this ticket:

- **A real Add-to-Home-Screen install**, and how the icons look on an actual launcher and iOS
  home screen — headless Chrome can report installability, not the install (#91, #115).
- **`black-translucent` in practice**, and the splash set on a real cold standalone launch —
  the images ship (#115, §11), but the status bar only overlays the app and the splash only
  shows once installed and launched from the home screen.
- **Safari's own offline behaviour**, and the Chrome-Android/Safari-iOS current-1 test matrix
  (checklist §3.7, PRD-engineering §10). This gate is Chromium on a Pi.
- **The later phases of the gate** — "run a session, complete a ritual, export backup"
  (checklist §3.6) — those screens do not exist yet (#95, #103, F7).

## 9. The sub-path audit (#91)

The Pages deploy is a **project site**, so the build runs `VITE_BASE=/rung/` and every URL the PWA
owns has to land under it. Four mechanisms, and only one of them was wrong:

| What | Who resolves the base | Verdict |
|---|---|---|
| `content/*.json` fetches | the app, per call: `` `${import.meta.env.BASE_URL}${path}` `` | already right (#79/#81) |
| `index.html` — favicon, apple-touch-icon, the bundles | Vite, at build: source stays `/icons/…`, `dist/` reads `/rung/icons/…` | already right |
| Worker registration + precache | vite-plugin-pwa: registers `/rung/sw.js` with `{ scope: '/rung/' }`; every precache URL is **relative** (`index.html`, `assets/…`), so it resolves against the worker's own directory — as does `navigateFallback: 'index.html'` | already right |
| **`manifest.webmanifest`** | **nobody** — it is JSON the plugin copies through | **was wrong** |

The manifest is the silent one. `id`, `start_url` and all three icon `src`s were typed as `/…`,
which on a sub-path resolves against the **origin root**: an installed app whose launch icon 404s
and whose `start_url` opens `https://rishabh7g.github.io/` — somebody else's page, with no worker.
So `tools/pwa.ts` now takes the base and builds every path from it (`pwaManifest(base)`), and
`tools/pwa.test.ts` asserts the sub-path manifest is the checklist with `/rung` in front of each
path, that `id`/`start_url` are the base, and that no icon points above it. `scope` is still
deleted, and still correct: the browser derives it from `start_url`'s directory, which is now
`/rung/` — the same scope the worker registers with.

What `VITE_BASE=/rung/ npm run build` emits:

```json
{"start_url":"/rung/","id":"/rung/","icons":[{"src":"/rung/icons/icon-192.png", …}]}
```

## 10. Reproducing

```bash
npm run icons:build                                    # regenerate public/icons from the header mark
npm run content:build -- --with-unverified --with-fixtures
npx vite build && npx vite preview --port 4173         # a worker only exists in a build
VITE_BASE=/rung/ npm run build                         # what the deploy builds (strict, sub-path)
```

Then: load once online, kill the preview server, cold-start the browser against the same profile
with the network off, and walk Ladder → Module → Sentence Detail. Every response should report
`fromServiceWorker`.

## 11. The ratified mark, the final icons, the iOS splash set (#115)

#69's formal spec landed the mark's construction grid in `design/tokens.md` §6.4 — a 22-unit
square: rails at x 5.5/16.5 (y 1 → 21), outer rungs at y 4.5/17.5, hairline 1.5, and the middle
rung the one solid object, a 3-unit accent bar. `src/shell/RailsMark.tsx` now carries that grid
verbatim (it had shipped the interim 20-grid hairline version), so the header, the icons and the
splash all changed together in the one place the mark lives. `npm run icons:build` re-cut the
five icons from it — same sizes, same mark heights, ~2.8–3.2 KB apiece.

The maskable arithmetic §2 explains moved with the geometry: the ink box is now 12.5 × 21.5 in a
viewBox of 22, so at 50% height the box's half-diagonal is **0.289 × size** — still well inside
the 0.4 safe radius, still asserted as a number in `tools/make-icons.test.ts`.

**The splash set** (`npm run splash:build` → `tools/make-splash.ts`) is the checklist §3.3 item
#90 deferred. iOS ignores the manifest's `background_color`, so a cold standalone launch flashes
white unless an `apple-touch-startup-image` matches the device's EXACT size. Eleven portrait
iPhone viewports (SE → 17 Pro Max, ~70 KiB in total, `public/icons/splash/`), each the header
lockup at 5% of the screen height — mark read out of `RailsMark.tsx` by make-icons' parser, the
wordmark `BRAND` set in the real Barlow Condensed 700 (converted woff2 → TTF at generation time
because Pango reads no woff2), `--color-text` on exactly `--color-bg`. No iPad rows and no
landscape: the product targets P1's phone and the manifest pins `orientation: portrait`.

Three deliberate boundaries, each with a test in `tools/make-splash.test.ts`:

- **`index.html` is cross-checked against the generator** — one `<link>` per device, exact media
  query, exact filename; a device row added without its link (or vice versa) is a red test.
- **The set is NOT precached.** The app never fetches a splash image — Safari does, once, at
  Add-to-Home-Screen. The precache glob is `icons/*.png`, whose `*` does not cross into
  `icons/splash/`; precaching would cost every Android first visit ~70 KiB it can never use.
- **The budget follows the same truth** (`tools/payload-budget.ts`): the splash set is its own
  owner, so no learner-facing row counts it (it is not first-visit payload and it is not
  precached), and a `splash` row meters it raw, ≤ 100 KiB. #207 replaced the catalogue-wide
  `total` row with per-course rows and kept that carve-out exactly as it was.

Not claimed here, as in §8: how the set looks on a physical iPhone. The install-and-cold-launch
walkthrough on both platforms is the device-bound tail of #115.
