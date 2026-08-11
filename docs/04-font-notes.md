# Font notes — bundling Mukta + Barlow (#85)

Findings from self-hosting the three product faces [D15]. This file is in `docs/`, not
`design/`: `design/font-notes.md` is design-owned, and `design/` is re-copied wholesale from
Rishabh's tooling, which wipes anything added to it (`docs/design-contract.md`).

**Verdict in one line:** every Devanagari specimen renders in Mukta at every ramp size and
weight, including the 18px floor; `ī ā ū` render in Barlow, but **`ʾ` (U+02BE), `ʿ` (U+02BF) and
`ḥ` (U+1E25) are not in Barlow or Barlow Condensed** and fall back to a system face; the bundle
ships **823,736 bytes (804 KiB) of woff2**, unsubset, for #113 to cut.

---

## 1. What ships

| Package | Weights | Why those |
|---|---|---|
| `@fontsource/mukta` | 400 · 500 · 600 · 700 | tokens.md §2 puts Mukta at 400–700 for **all** Devanagari. The ramp uses 400 (`--text-l2-cue`), 600 (`--text-l2-card`, `--text-l2-list`) and 700 (`--text-l2-hero`); 500 is design headroom and is unused today. |
| `@fontsource/barlow` | 400 · 500 · 600 | The ramp only asks for 400 (body, secondary, caption, micro); 500/600 are the UI headroom the ticket names. |
| `@fontsource/barlow-condensed` | 500 · 600 · **700** | 600 is `--font-heading-weight` (screen/rung/verdict titles, kickers). **700 is not in the ticket's list but `--text-brand: 700 23px/1 var(--font-heading)` is** — the wordmark. Without it the browser synthesises a bold and nothing says so, which is the exact failure [D15] is about. Verified in the built app: the header pulls `Barlow Condensed 700`. |

Imported one line per face in `src/main.tsx`. `font-display: swap` comes from @fontsource and is
asserted in `src/fonts.test.ts`.

**`src/fonts.test.ts` is the guard that keeps this honest.** It parses the `--text-*` shorthands
in `design/tokens.css` into the set of (family, weight) pairs the product actually renders, and
fails if `main.tsx` does not import one of them. A ramp entry that changes 600 → 700 turns it red
instead of quietly shipping a synthesised face.

### woff2 only

@fontsource writes a `.woff` fallback beside every `.woff2`, and Vite emits an asset for every
`url()` it can resolve — so `dist/` carried both until `vite.config.ts` grew a 12-line `pre`
transform (`rung-woff2-only`) that strips the fallback from @fontsource's stylesheets. The
product's browser targets are Chrome Android and Safari iOS current-1 (PRD §10), both of which
have shipped woff2 since 2016, and the service worker (#92) precaches everything — so every
unused byte in `dist/` is a byte a phone downloads.

    $ find dist -name '*.woff' -o -name '*.ttf' -o -name '*.otf' | wc -l
    0

## 2. The `/dev/type` specimen

`src/dev/TypeSpecimen.tsx`, reachable at `#/dev/type` **in development only**. It renders the
Devanagari matrix (14 specimens × 18/22/26/32px × 400/500/600/700, every size from the ramp token
that owns it), the romanization diacritics in Barlow at 15px and 13px × 400/500/600, and the
Barlow Condensed kickers with `--kicker-tracking`.

Two things about it are deliberate:

- **It never ships.** `src/dev/typeRoute.tsx` imports it dynamically inside an
  `import.meta.env.DEV` branch, so a production build never puts the module in the graph. A
  *static* import is not enough: Rollup tree-shakes the component but Vite still emits a CSS
  module's stylesheet, and the first build of this ticket shipped `_specimen_`, `_s18_` and
  friends in `dist/assets/index-*.css`. With the dynamic import there is no chunk and no CSS.
  In the built app `#/dev/type` renders the Ladder (the `*` route redirects, hash rewritten to
  `#/`), and `grep -r 'TypeSpecimen\|dev/type' dist` finds nothing.
- **It is the single entry in the shell-purity allowlist** (`src/shellPurity.test.ts`). That
  guard fails on any course script under `src/`, and a font specimen exists to render one. The
  exemption is safe because the file never reaches a build, not because the text is "only a
  specimen" — the list stays exactly one long and the pattern was not widened.

## 3. Devanagari — no tofu anywhere

![Devanagari matrix at 18/22/26/32px × 400/500/600/700, all rendering in Mukta](images/dev-type-devanagari.png)

The verifying machine has **no system Devanagari font at all** (`fc-list` = 8 DejaVu faces), so
before this ticket every Devanagari glyph in the app was a box. That makes the check unusually
strict: anything Mukta does not draw shows up immediately.

Method — headless Chromium 1232 over CDP, one probe span per (size, weight, specimen) styled
through the tokens, then `CSS.getPlatformFontsForNode` for each, which reports the font the
renderer actually used and whether it was a custom (bundled) one:

| | |
|---|---|
| probes | 224 = 14 specimens × 4 sizes × 4 weights |
| drawn by the bundled face | **224 / 224** |
| fell back to a system font | 0 |
| fonts reported | `Mukta` (400), `Mukta Medium` (500), `Mukta SemiBold` (600), `Mukta` (700) — all `isCustomFont: true` |

Every specimen renders, at the 18px body-role floor as much as at 32px: the ळ Marathi needs, the
conjuncts क्या / त्या / विद्यार्थी / कृपया, the reph र्क, दूध, संगीत, the candrabindu in माझं / आवडतं, and काल /
उद्या. `document.fonts` confirms all four Devanagari faces load from our own origin.

## 4. Romanization diacritics — a real gap, documented

![Barlow and Barlow Condensed specimens: ismī, ʾanā, ḥasan and the bare marks](images/dev-type-latin.png)

PRD §10 [D15]: *"ʾ/ḥ/ī diacritics of the romanization must render in Barlow — verify glyph
coverage, fall back to a diacritic-complete face if needed."* Verified, per character, the same
way:

| character | in Barlow? | in Barlow Condensed? |
|---|---|---|
| `ī` U+012B, `ā` U+0101, `ū` U+016B | **yes** | **yes** |
| `i` + combining macron U+0304 (the decomposed form) | **yes** | **yes** |
| `ʾ` U+02BE (modifier letter right half ring) | **no** — DejaVu Sans | **no** |
| `ʿ` U+02BF (modifier letter left half ring) | **no** — DejaVu Sans | **no** |
| `ḥ` U+1E25 (h with dot below) | **no** — DejaVu Sans | **no** |

Both families **declare** a `latin-ext` subset whose `unicode-range` covers all five
(`U+02BD-02C5`, `U+1E00-1E9F`) — the range is a routing hint, not a promise, and Barlow's
latin-ext simply has no glyph at those three codepoints. It is visible in the screenshot above:
in the 600 rows the `ḥ` and the `ʾ` stay in the system face while the letters beside them get
heavier.

**So: two of the three characters the PRD names by hand are missing.** It is not tofu — every
platform we target (iOS, Android, this Debian box) has a system face that covers them, so it
degrades to a *mismatched* glyph rather than a missing one. It also does not bite v1: the ticket
this gap belongs to is the romanized course (en-ar), and v1 ships hi-mr, whose L2 is Devanagari.

Options when it does bite, in order of cost:

1. Accept the fallback for the three marks and pin it in `--font-script-fallback` so the choice
   is deliberate rather than a browser's guess.
2. Author romanization with alternatives Barlow does cover (`ʼ` U+02BC is present; `h` with no
   dot loses the distinction).
3. Swap the body face for a diacritic-complete one, which is what [D15] authorises — a design
   decision, not an engineering one.

Whichever is chosen, it should be settled **before** #113 subsets, because subsetting is where
"which glyphs must survive" gets written down.

## 5. Bytes shipped

Unsubset, which is #113's ticket (subset per course at build time). Everything below is measured
from `dist/` after `npx vite build`.

| | bytes | KiB |
|---|---:|---:|
| **total (30 woff2 files)** | **823,736** | **804.4** |
| Mukta 400/500/600/700 | 557,588 | 544.5 |
| Barlow 400/500/600 | 133,780 | 130.6 |
| Barlow Condensed 500/600/700 | 132,368 | 129.3 |
| — by subset: devanagari | 413,148 | 403.5 |
| — by subset: latin | 217,648 | 212.5 |
| — by subset: latin-ext | 146,932 | 143.5 |
| — by subset: vietnamese | 46,008 | 44.9 |

`unicode-range` means a browser only downloads what a page needs — the built app's Ladder pulls
**5 files, 189 KiB** (Barlow 400 latin, Barlow Condensed 600 + 700 latin, Mukta 700 latin +
devanagari). The offline precache (#92) will take all 804 KiB, which is what makes #113 worth
doing.

Cuts for #113, cheapest first, with one caveat measured here:

| cut | saves | note |
|---|---:|---|
| all `vietnamese` subsets | 46,008 | nothing in this product is Vietnamese |
| Mukta `latin-ext` | 59,944 | Mukta's role is Devanagari; its Latin-ext is unreachable |
| Mukta 500 (all subsets) | 142,236 | no ramp token renders Mukta 500 today |
| Barlow Condensed `latin-ext` | 43,336 | only needed if a heading or kicker ever carries `ī`/`ā`/`ū` |
| per-course subset of Mukta devanagari | up to ~380,000 | the big one: hi-mr's word index is a few hundred glyphs, not the whole block |

**Caveat: do not drop Mukta's `latin` subset.** The Ladder's L2 line renders `3वाँ` — the digit
comes from Mukta's Latin subset, and dropping it would leave digits and ASCII punctuation inside
Devanagari strings rendering in a system face.

## 6. Network — nothing is fetched at runtime

| | requests | external | `.woff2` | `.woff` |
|---|---:|---:|---:|---:|
| dev server, `#/dev/type` (uses every face) | 77 | **0** | 13 | 0 |
| built app (`vite preview`), Ladder | 12 | **0** | 5 | 0 |

`grep -ri 'fonts.googleapis\|fonts.gstatic' dist` → nothing, and `src/fonts.test.ts` fails on any
font host named in `src/` or `index.html`. The Arabic quiet line is still `--font-script-fallback`
(system-ui) — bundling a Naskh face is [D15]'s "if en-ar ships" clause and belongs to that ticket.

## 7. Reproducing

```bash
npm run dev                 # then open http://localhost:5173/#/dev/type
bash scripts/verify.sh      # TYPES ok | LINT ok | TEST 399/399 ok | CONTENT ok | BUILD ok
find dist -name '*.woff2' -printf '%s\n' | awk '{s+=$1} END {print s}'   # 823736
find dist \( -name '*.woff' -o -name '*.ttf' -o -name '*.otf' \) | wc -l # 0
grep -ri 'fonts.googleapis\|fonts.gstatic' dist | wc -l                  # 0
```

The per-glyph attribution is a CDP session against the running dev server: render one probe span
per (role, weight, size, character) and call `CSS.getPlatformFontsForNode` on each — a bundled
face reports `isCustomFont: true` with its own name, a fallback reports the system font by name.
A canvas-bitmap comparison is *not* a reliable substitute: it only sees faces the page has
already loaded, and on a multi-character string one covered letter hides an uncovered one.
