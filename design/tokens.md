# rung — design tokens v3.3 (developer reference)

Machine-usable file: **`design/tokens.css`** — load it and style against `var(--*)` only. This page explains what each group means and the rules that aren't expressible in CSS. Base layer = the Industry design system (`_ds/…/styles.css`, the upstream source of truth); app layer = rung-specific tokens from the signed-off prototype (`design/Rung App v3.3.dc.html`).

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

§6.1–§6.4 below are the formal specs PRD §12.2 called for — every state, exact recipes. Geometry of record: `design/Rung App v3.3.dc.html`. No new colors (§7); pixel values quoted from the prototype resolve to the nearest token on the Industry scale when built.

### 6.1 Staged rung card [D22] — the current rung's blueprint object

**Anatomy (identical in all four stages).** The current rung hangs off the ladder spine (1 px `--color-divider` vertical); the card indents 32 px, its marker a 19 px accent crosshair (`--color-accent`, stroke 1.2) on a `--color-bg` backing square, top-aligned with the card head. Container: blueprint object — `--border-hairline`, radius 0, `--color-bg` fill, four registration corners, padding 16px 16px 14px, and `--shadow-sm` (**the Ladder's only elevated object**).

- **Kicker** "M3 · CURRENT RUNG": `--text-kicker` + `--kicker-tracking`, uppercase, `--color-accent-700`, nowrap — shell furniture, English in every course (raised on the copy freeze). While the one-shot just-unlocked flag is being consumed, a 10 px `unlocked` chip (accent-100 bg / accent-800 text) sits beside it — gone on the next visit.
- **Title** `--text-rung-title`; **job line** `--text-secondary` in `--ink-65`.
- **Production dots** (margin-top 12px): one stacked pair of `--dot-size` squares per sentence (write 1 above write 2; 3 px gap in the pair, 5 px between pairs) — a square fills `--dot-done` when its write exists, else `--dot-pending`. Writes line beside at 11 px `--ink-55`, **counts only** ("16 of 20 — …").

**The four stages — one loud action each; the stage guides, never gates** (the Practice tab stays reachable in every one):

| stage | primary CTA | quieter row |
| --- | --- | --- |
| **fresh** (not studied) | "Start with the module" | note below, `--ink-50` (margin-top 7px): "Read it through once — Practice picks up from there. Nothing is locked; the tab stays open." |
| **studied** | "Practice" | centered ghost "revisit the module" (margin-top 4px) |
| **production-complete** | "Exit ritual — open" | secondary pair "Practice" · "Module" — flex row, gap 8px, margin-top 8px |
| **pending-authoring** | **none — the note IS the state**, `--ink-55` (margin-top 12px): "Sentences arrive once authored and native-verified. The rung waits." | centered ghost "practice earlier rungs" |

**Recipes.**
- *Primary:* the card's ONE filled object — `--color-accent` fill, `--color-bg` text, full width, `min-height: var(--cta-height)`, margin-top 14px, radius 0; `:active` → `--color-accent-700`.
- *Ghost:* transparent, `--color-accent` text, `min-height: var(--ghost-height)`, **`white-space: nowrap`**, centered on its own row; hover/active = 10%/18% accent color-mix washes.
- *Secondary pair:* transparent fill, `--color-divider` hairline, inherited text, each `flex: 1` at `min-height: var(--btn-compact-height)`; `:active` → 14% ink wash.

**Course-type ruling.** Everything below the job line is course copy (PRD §8) and obeys §2's floor: prose 400 / labels 600, `--font-devanagari` at ≥ `--devanagari-min-size`, line-height 1.6 in Devanagari courses. The prototype's 11–12 px notes and 14 px Barlow Condensed button labels are its *English* rendering, not a size license — this answers the open `--text-course-prose` question: **the smallest Mukta slot pulled to the floor is the slot** (as shipped in `RungCard.module.css`).

**Motion.** The unlock beat (§5) only — once, on arrival with the one-shot flag, shared with the level cell (PRD §5.1); reduced motion `animation: none`. Stage changes swap content instantly, no transition. **Never:** two competing primaries; a disabled control (nothing on this card disables anything); any CTA into an unauthored module; celebration beyond the beat.

### 6.2 Course dropdown (Settings → COURSE) + switch toast

**Anatomy** — one blueprint card (`--border-hairline`, radius 0, corners, padding 13px 14px), five layers, 7 px column gap:

1. **Kicker** `COURSE` — `--text-kicker-sm` + tracking, `--color-accent-700`, margin-bottom 10px.
2. **Label** "Active course" — 14px/600 `--font-body`, `<label for>` wired to the select.
3. **The select is the platform's** — a native `<select>` on the `.input` recipe (`--color-surface` fill, hairline border, radius 0, padding 6px 10px) with two load-bearing overrides: **`min-height: var(--tap-min)`** (44 px target) and **`font-size ≥ 16px`** — below 16 px, iOS Safari zooms the page when the select focuses; never shrink it back (pwa-checklist §1). Shared `:focus-visible` outline. One `<option>` per installed course, lowercase pair name ("hindi → marathi").
4. **Status line** — `--text-caption` in `--ink-55`, **counts only**: "Level 1 · 2 of 10 passed · M3 in progress" (or "· next rung pending authoring").
5. **Reassurance footer** — 11px/1.55 `--ink-50` under a `--color-divider` hairline (padding-top 9px, margin-top 6px); copy frozen (§8): "Switching never erases anything — each course keeps its own ladder, review queue and counters. Come back anytime; it's exactly where you left it."

**States.**
- **Closed** (rest): the card above; the selected option is the active course.
- **Open:** the OS-native picker — never a custom-drawn menu (free a11y; scales to many courses [D19]).
- **Switching:** synchronous on `change` — **no spinner, no confirmation dialog** (nothing is at risk; that is the promise). Status line, storage rows and the whole shell re-render to the new course, and the toast confirms.

**Toast recipe** (the shared component; also sealed-tap and export/import toasts): `--toast-bg` / `--toast-fg`, radius 0, padding 9px 14px, centered, max-width ~320px (80% on narrow), fixed above the bottom nav — the prototype's 110 px = nav item + home-indicator gap + margin; enters with `--motion-toast` fade + 8 px rise, auto-dismisses ≈ 2.8 s, reduced-motion static. Toast text is course copy (the Mukta floor applies). Switch copy frozen (§8): "Switched to english → arabic. Your hindi → marathi ladder is saved exactly where it was." **Never:** flags or emoji as course glyphs; a restyled dropdown; a confirm step.

### 6.3 Retry interstitial (Comprehend → "Not quite")

**Placement.** Replaces the Comprehend body **inside the same screen** — the ritual header, its kicker and the "part 2 of 2" position line stay put, so the screen is never unlabelled. A vertically centered column (`flex: 1`, justify-center), gap 14px, side padding 22px, arriving with the reveal motion (`rowIn`, `--motion-reveal`).

**Layers, top to bottom** — all five are course copy; they ship in the bundle and join the strings freeze as `retry.kicker / title / body / reassure / cta` (the shipped build renders title, body and CTA and awaits keys for the other two — the freeze closes that gap):

1. **Kicker** — `--text-kicker` + tracking, `--color-accent-700`: "COMPREHEND · फिर से" / "COMPREHEND · AGAIN".
2. **Title** — `--text-rung-title`: "नए वाक्य, फिर से." / "Fresh sentences, once more."
3. **Body** — course prose (Mukta floor; prototype 13.5px/1.65), the calm framing frozen: "एक जवाब अलग निकला — कोई बात नहीं, यही तो information है. pool से दो नए वाक्य लो, आराम से मिलाओ." — different is *information*, never *failure*.
4. **Reassurance** — quieter, `--ink-50`: "Unlimited retries. The rung waits; nothing is counted against you."
5. **CTA "Fresh sentences"** — primary block, `min-height: var(--cta-height)`, inside a **border-transparent blueprint wrapper** (registration corners, no box — the frame grammar at its quietest), margin-top 8px. Deals two fresh pool items, no repeats within a test.

**The absences are the spec.** No attempt or failure counter anywhere — not "attempt 3", not "2 of ∞"; nothing about a failed round is stored (Invariant 4), so there is nothing to count with. No red — red belongs only to the self-mark the learner chose (§7 rule 2). No "wrong"/"failed" vocabulary, no shame state, no cooling-off, no alternate exit CTA (the back chevron is the shell's). Motion: `rowIn` only; reduced-motion static.

### 6.4 Brand mark (rails mark)

**Construction grid** — a 22-unit square, every coordinate on the half-unit grid so strokes land crisp at the 20 px header render:

- **Rails:** two verticals at x `5.5` and `16.5`, y `1 → 21` — stroke 1.5, butt caps, square corners.
- **Top & bottom rungs:** rail-to-rail horizontals (x `5.5 → 16.5`) at y `4.5` and `17.5` — stroke 1.5.
- **Middle rung — the one solid object:** filled rect x `5.5`, y `9.5`, w `11`, h `3`, `--color-accent`. Deliberately heavier than the hairlines: it is "you are here" — the same accent bar the level strip's current cell and the primary CTA speak with.
- **Color:** rails and outer rungs `currentColor` — the mark wears its chrome's ink (header `--color-text`; muted footer ink; ground-color on dark fills); the middle rung is **always** accent, never recolored. No rounding, no outline, no background plate, no shadow.

**Uses.**
- **Header lockup, 20 px** (`--brand-mark`): mark + wordmark "rung" (`--text-brand` — lowercase, Barlow Condensed 700 23px), 8 px gap, optically center-aligned. Footer/credit scale: 18 px, rails in muted ink — the accent rung stays accent.
- **Icon scale** (app icon, PWA splash, favicon — feeds the icon ticket): scale the whole grid uniformly — stroke = rendered size × 1.5⁄22; **do not re-hairline at large sizes**, the weight is part of the mark. App icon: mark centered on solid `--color-bg`, mark height ≈ 55–60% of the canvas, inside the maskable safe zone (inner 80%); no wordmark below 64 px. Splash: the header-lockup proportions, centered on `--color-bg`.
- **Floor:** 15 px (`--icon-inline`); below that, no mark.

**Shipped interim.** `src/shell/RailsMark.tsx` self-describes as the buildable stand-in for this spec; its lighter middle rung (hairline weight on a 20 grid) aligns to the 3-unit solid bar when the icon set is cut — a one-line SVG swap, no layout change.

## 7. Rules that override everything

1. No hard-coded hex, px, or font names in components — tokens only.
2. No new colors. Green/red exist only in self-marks; amber only in interference; success only in the unlock beat.
3. No rounding or surface fills on blueprint objects; registration marks never dropped.
4. No numbers on the elapsed tick, no time strings anywhere (Invariant 2).
5. Course bundles may not restyle the app — courses swap content and strings, never tokens.
