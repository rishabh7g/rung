# rung — mobile & PWA build checklist (v3.3)

For the developers building the real PWA from `design/Rung App v3.3.dc.html`. Two parts: what the design already guarantees on iOS/Android, and what the build must add to be a true, installable, fully-offline PWA (engineering PRD §3/§10: zero network after first load).

## 1. Mobile correctness — already in the design (keep it that way)

- **Tap targets:** every control ≥ 44px (`--tap-min`); primary CTAs 48–56px; bottom-nav items 48px + home-indicator padding.
- **Hold-to-confirm:** Pointer Events (`pointerdown/up/leave`) + `touch-action: none` on the control — works identically on iOS/Android; release-resets is required behaviour.
- **No text inputs** anywhere → no soft-keyboard layout bugs, no zoom-on-focus except the course `<select>` — which is why it is set at **16px font-size** (below 16px, iOS Safari zooms the page when a select/input focuses). Keep ≥16px on any future select.
- **Touch niceties (added v3.3):** `touch-action: manipulation` on buttons/labels/selects (kills the 300ms double-tap-zoom delay), transparent `-webkit-tap-highlight-color`.
- **Motion:** `prefers-reduced-motion` collapses all four animations; nothing depends on hover.
- **Type floors:** Devanagari ≥ 18px / 1.6 (verify ळ, conjuncts, matras on a real low-end Android — font rendering differs from desktop).
- **Scrolling:** every screen scrolls its own column (`overflow-y: auto; overflow-x: hidden`); use `overscroll-behavior: contain` in the build to stop pull-to-refresh inside sessions.

## 2. Build-time layout rules (the prototype's phone frame simulates these)

- **Viewport meta:** `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">`.
- **Safe areas:** the frame's 56px top / 30px bottom paddings become `env(safe-area-inset-top)` / `env(safe-area-inset-bottom)` (with fallbacks) on the header and bottom nav.
- **Height:** use `100dvh` (or `height: 100%` on html/body/#root), never `100vh` — mobile URL bars break 100vh.
- **Width range:** layout is fluid flex/grid; test 360px (small Android) → 430px (Pro Max). No horizontal scroll anywhere (already enforced).
- **Fonts self-hosted:** the prototype loads Mukta from Google Fonts — the product must bundle and subset Mukta + Barlow + Barlow Condensed locally (woff2, `font-display: swap`) or offline breaks. `tokens.css` is the style contract.

## 3. True-PWA requirements

1. **Web app manifest** (`manifest.webmanifest`):
```json
{
  "name": "rung", "short_name": "rung", "id": "/", "start_url": "/",
  "display": "standalone", "orientation": "portrait",
  "background_color": "#f2f2f3", "theme_color": "#f2f2f3",
  "description": "Climb a language, one checkpoint at a time.",
  "icons": [
    { "src": "/icons/icon-192.png", "sizes": "192x192", "type": "image/png" },
    { "src": "/icons/icon-512.png", "sizes": "512x512", "type": "image/png" },
    { "src": "/icons/maskable-512.png", "sizes": "512x512", "type": "image/png", "purpose": "maskable" }
  ]
}
```
   Icons come from the ratified rails mark on the paper ground (design PRD §9) — test the maskable safe zone at maskable.app.
2. **Service worker — precache everything, network-never after install:** precache the app shell, `tokens.css`, fonts, `courses.json`, and every per-course content/strings/index file at install; version the cache by build hash; activate → delete old caches. Cache-first for all requests (there is no runtime network by design). Workbox `precacheAndRoute` does this in ~20 lines; vanilla SW is equally fine at this size.
3. **iOS specifics** (Safari has no install prompt): `apple-touch-icon` (180px), `apple-mobile-web-app-capable` + `black-translucent` status bar meta, splash images via `apple-touch-startup-image` (generate with `pwa-asset-generator`); document the Share → "Add to Home Screen" path — this is P1's actual install flow.
4. **Android/Chrome:** manifest + SW = install prompt eligibility; optionally handle `beforeinstallprompt` for a calm in-Settings "install" row (never a nag — Invariant: no loops, no pushiness).
5. **Storage durability:** call `navigator.storage.persist()` once on first save so the browser won't evict progress; storage display already specs `navigator.storage.estimate()` with fallback (engineering F6).
6. **Offline verification (release gate):** airplane mode → cold-start the installed app → browse module, run a session, complete a ritual, export backup. All must work with zero network.
7. **Audit:** Lighthouse PWA category ≥ installable + offline-capable; test matrix = Chrome Android + Safari iOS, current-1 (engineering §10).

## 4. Resources

- web.dev — Learn PWA course: https://web.dev/learn/pwa
- MDN — Progressive web apps: https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps
- Workbox (service-worker toolkit): https://developer.chrome.com/docs/workbox
- Maskable icon editor/tester: https://maskable.app
- pwa-asset-generator (icons + iOS splash screens): https://github.com/nirsky/pwa-asset-generator *(npm: `pwa-asset-generator`)*
- PWABuilder (manifest/SW validation, store packaging): https://www.pwabuilder.com
- web.dev — Add to Home Screen on iOS: https://web.dev/learn/pwa/installation
- MDN — `navigator.storage.persist()`: https://developer.mozilla.org/en-US/docs/Web/API/StorageManager/persist
