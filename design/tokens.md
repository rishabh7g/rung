# rung — design tokens v3.3 (developer reference)

Machine-usable file: **`design/tokens.css`** — load it and style against `var(--*)` only. This page explains what each group means and the rules that aren't expressible in CSS. Base layer = the Industry design system (`_ds/…/styles.css`, the upstream source of truth); app layer = rung-specific tokens from the signed-off prototype (`design/rung App v3.3.dc.html`).

## 1. Color

**Ground & roles (Industry).** `--color-bg #f2f2f3` · `--color-surface #e9e9ea` · `--color-text #1d1f20` · `--color-accent #5980a6` (mono scheme — steel is the only decorative color) · `--color-divider` (16% ink). Two OKLCH ramps, `--color-neutral-100…900` and `--color-accent-100…900`: use 100–300 for tinted fills/hovers/subtle borders, 500 as base, 700–900 for text on tints and pressed states. Accent-on-ground is ~3:1 — fine for chrome and large text; paragraph-size accent text must use `--color-accent-700`.

**rung semantic colors (the ONLY colors beyond steel):**

| Token | Value | Used for — and nowhere else |
| --- | --- | --- |
| `--mark-got-bg` | `oklch(0.52 0.10 150)` | "Got it" / "Same meaning" selected fill, white text [D11] |
| `--mark-miss-bg` | `oklch(0.52 0.13 27)` | "Missed" / "Not quite" selected fill, white text [D11] |
| `--interference-*` | amber set (see tokens.css) | interference traps + ⚠ tag chips only — never decoration |
| `--tag-delta-bg/fg` | accent 200/800 | delta tag chips |
| `--tag-free-bg/fg` | neutral 200/800 | free tag chips |
| `--dot-done` / `--dot-pending` | accent-600 / neutral-300 | production dots, passed level squares |
| `--level-current` / `--level-sealed` | accent-300 / neutral-200 | level-strip squares |
| `--tick-track` / `--tick-fill` | neutral-200 / accent-400 | gentle elapsed tick |
| `--variation-highlight` | accent-200 | changed words in "same pattern, swapped parts" |
| `--mistake-border/bg` | neutral-400/100 | struck-text mistake plate (never amber, never red) |
| `--toast-bg/fg` | neutral-900/100 | toasts |

**Muted ink:** never invent grays — use `--ink-75/65/55/50/45/40` (color-mix on `--color-text`). `--ink-40` is the quiet native-script line in romanized courses.

## 2. Type

- `--font-heading` Barlow Condensed 600 — headings, kickers, wordmark. `--font-body` Barlow — prose, UI copy.
- `--font-devanagari` Mukta 400–700 — **all** Devanagari, body-role floor `--devanagari-min-size: 18px`, line-height 1.6, **no italics ever**.
- Romanized-course primary strings use the L2 slots below (same sizes); the native-script secondary line renders at 15–16px in `--ink-40` (`--font-script-fallback`; bundle a Naskh face if Arabic ships).
- Ramp (font shorthand tokens in tokens.css): brand 23 · verdict title 34 · rung title 26 · screen title 24 · L2 hero 32 · L2 card 26 · L2 list row 22 · L2 cue 20 · body 15 · secondary 13 · caption 11.5 · micro 10.5 · kickers 10–11 uppercase with `--kicker-tracking: .12em`.

## 3. Space, radius, elevation, borders

Industry scale: `--space-1…8` (3.4 → 27.2px), `--radius-sm/md/lg` (2/4/7px) — but **blueprint objects (cards, plates, buttons) are radius 0, hairline-bordered, with the four `+` registration marks**; the solid-accent primary button is the one filled object. `--shadow-sm/md/lg` for elevation (current-rung card uses sm). `--border-hairline` everywhere; `--border-dashed-world` is reserved for "outside the app" meaning: the जांचो resource plate and the recall-first dashed boxes.

## 4. Size & touch

`--tap-min: 44px` floor on every control. Primary block CTAs `--cta-height: 48px`; reveal buttons 52; press-and-hold 56; secondary 46; segmented options 44; ghost text buttons 36 (**always `white-space: nowrap`**); bottom-nav items 48 + 30px home-indicator padding. Production dots 6px; level squares 4px tall; tick 2px. Icons: Lucide only, `--icon-stroke: 1.5`, 20px UI / 15px inline. Brand rails-mark 20px.

## 5. Motion

Only four movements exist; everything else is static. All durations in tokens.css; `prefers-reduced-motion` collapses every one to 0.01ms.

- **Reveal** (`--motion-reveal` 300ms): fade + 7px rise on revealed answers.
- **Expand** (250ms): in-place card expansion, "why" rows; Next appears in 200ms after a self-mark.
- **Hold** (`--motion-hold-total` ~900ms [D14]): linear fill, transform-origin left, 0.04 per 30ms step; release before completion resets to 0.
- **Unlock beat** (1000ms, `cubic-bezier(.2,.7,.3,1)`, once): accent-200 flash + 10px settle on the newly current rung.
- Gentle tick: width transition 1s linear, fills once over ~25min, numberless, capped.

## 6. Component token recipes (quick reference)

- **Self-mark seg:** unselected = transparent bg, inherited text; selected = `--mark-got-bg`/`--mark-miss-bg` + `--mark-fg`; Next button hidden (not disabled) until a mark exists.
- **Tag chips:** 9.5–11px, padding 1px 7px – 3px 9px; delta/free/interference token pairs above.
- **Trap callout:** `--interference-bg` fill + `--interference-border`, icon `--interference-icon`, text `--interference-text`.
- **Level strip cell:** active = 2px top bar `--color-accent`, label `--color-accent-700`; sealed = no bar, label `--color-neutral-600` + lock icon.
- **Rung markers:** passed = accent-600 filled circle + bg-colored check; current = accent crosshair; locked = neutral-500 hollow circle at 50% row opacity.
- **Focus:** `:focus-visible { outline: 2px solid var(--color-accent); outline-offset: 2px; }` (from the base system — never the browser default).
- **Disabled:** 45% opacity (base system).

## 7. Rules that override everything

1. No hard-coded hex, px, or font names in components — tokens only.
2. No new colors. Green/red exist only in self-marks; amber only in interference; success only in the unlock beat.
3. No rounding or surface fills on blueprint objects; registration marks never dropped.
4. No numbers on the elapsed tick, no time strings anywhere (Invariant 2).
5. Course bundles may not restyle the app — courses swap content and strings, never tokens.
