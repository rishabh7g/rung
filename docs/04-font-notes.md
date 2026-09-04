# Font notes — Mukta + Barlow (#85), Noto Naskh Arabic (#197), Source Sans 3 (#222)

Findings from self-hosting the product faces [D15]. This file is in `docs/`, not
`design/`: `design/font-notes.md` is design-owned, and `design/` is re-copied wholesale from
Rishabh's tooling, which wipes anything added to it (`docs/design-contract.md`).

§1–§7 are #85's three faces. **§8 is the fourth**, added when Arabic shipped. **§9 is the fifth**,
and is where the romanization's diacritics stop rendering in the device's system face. §8 and §9
are also where the two engineering overrides of `design/tokens.css` values are written down.

**Verdict in one line, as of #85:** every Devanagari specimen renders in Mukta at every ramp size
and weight, including the 18px floor; `ī ā ū` render in Barlow, but **`ʾ` (U+02BE), `ʿ` (U+02BF)
and `ḥ` (U+1E25) are not in Barlow or Barlow Condensed** and fall back to a system face; the
bundle ships **823,736 bytes (804 KiB) of woff2**, unsubset, for #113 to cut.

**Where that ended up:** the second clause turned out to be measuring the wrong face — §4.1 — and
§9 closes it for the face that actually draws the marks. Nothing in the product renders a
romanization diacritic in a system face any more.

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
that owns it), the romanization diacritics — since #222, **twice**: in the L2 ramp
(`--font-devanagari`, 18/22/26/32px × 400/600/700, which is where they actually render) and in
Barlow at 15px and 13px, which is what [D15]'s original wording asked for — and the Barlow
Condensed kickers with `--kicker-tracking`.

**Showing them in Barlow alone is how the gap survived three tickets.** The specimen was answering
a question the product does not ask; §4.1 measured the one it does. The L2 rows are the ones to
look at now.

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
degrades to a *mismatched* glyph rather than a missing one.

### 4.1 It bites now — and Barlow was never the face it bites in (#202)

en-ar graduated to a shipping course on 2026-08-13 (#202), so this gap reaches learners. Two
corrections to the framing above, both found by measuring rather than reading:

**The romanization does not render in Barlow.** Every L2 line in the product — hero, card, list,
cue — is a `--text-l2-*` token, and all four resolve to `--font-devanagari` (`design/tokens.css`
§ ramp): **Mukta**, with `system-ui, sans-serif` behind it. Barlow is `--font-body`, and it draws
shell English only. So the table above answers a question the product does not ask; the question
it does ask is what **Mukta** covers.

**Mukta's `latin` subset covers less.** It is @fontsource's own range — `U+0000-00FF` plus a
handful of named codepoints — so it has no glyph past U+00FF to retain whatever
`tools/font-subset.ts` asks for. The whole diacritic repertoire of the course therefore fell
through to `system-ui`:

| character | in Mukta's `latin`? |
|---|---|
| `ā` U+0101, `ī` U+012B, `ū` U+016B | **no** — outside the range |
| `ḥ ṣ ḍ ṭ ẓ` U+1E25/1E63/1E0D/1E6D/1E93 | **no** |
| `ʾ` U+02BE, `ʿ` U+02BF | **no** (`ʼ` U+02BC is in the declared range, and Mukta has no glyph there either) |
| `é` U+00E9 and the ASCII letters | **yes** — harvested from the content per course |

So an en-ar sentence read as Mukta for its plain letters and the system face for its marks — a
mixed-face line, not tofu. It was the documented fall-through working as designed
(`src/fonts/mukta.css`: "a range is routing, not a promise of coverage"), and it is still the
reason `main.tsx` keeps Barlow's `latin-ext` imports **dev-only**: pulling them into the
production graph would add bytes every learner downloads and fix nothing, because Barlow is not in
the stack that renders the marks — and Barlow's latin-ext has no `ḥ`, `ʾ` or `ʿ` to give it.

> **This paragraph's original claim was wrong, and finding out is what closed the ticket.** It
> read "Mukta ships no `latin-ext` at all". Mukta ships seven `latin-ext` weights;
> **this build had simply never asked for one** — `tools/font-subset.ts` had two Mukta targets,
> `devanagari` and `latin`, so nothing in the graph pointed at the file. See §9.2.

### 4.1.1 Decided: 2026-08-13 — option 3, a diacritic-complete L2 face (#222)

**The romanization's marks are drawn by the bundle, in the face the letters beside them are drawn
in wherever that face has a glyph.** `--font-devanagari` becomes a two-face stack —
`"Mukta", "Source Sans 3", system-ui, sans-serif` — Mukta's own `latin-ext` cut joins the
per-course subsetter, and Source Sans 3 is bundled at 400/600/700 with a `unicode-range` of
exactly the four codepoints Mukta cannot draw. The full record, with the measurements it rests on,
is **§9**.

Why not the other two, in the words the decision was made in:

- **Option 1 (accept and pin the fall-through)** leaves a mixed-face line at a different weight
  and a different advance in the LARGEST text on the screen — `--text-l2-hero` is 32px — on the
  course that just shipped. Pinning names the second face; it does not stop there being one.
- **Option 2 (re-author the romanization)** is expensive and lossy. It would reissue the ALA-LC
  scheme across `content/courses.json` and every surface in the word index, and dotless `h`
  destroys the `ḥ`/`h` distinction the Arabic content deliberately encodes. Three review passes
  (#199, #200, #201) verified that romanization character by character; throwing it away is the
  worst trade on the table.
- **Option 3** is the only one that closes the gap, [D15] authorises it, and it fits:
  `course:en-ar` was 96.6 KiB against a 360 KiB limit — 263 KiB of headroom for a change that
  costs 8.4.

**Two faces on one line, and why that is the honest answer to "one face or say why not".** Twelve
of the sixteen marks en-ar ships come from Mukta itself, so `ṣabāḥ`, `ismī` and `ḥasan` are one
face end to end. Four cannot be: `ʾ` U+02BE, `ʿ` U+02BF, `Ẓ` U+1E92 and `ẓ` U+1E93 exist in no
weight of Mukta, and no amount of subsetting invents a glyph. Those four draw in **Source Sans 3**,
chosen because its Latin is the closest fit to Mukta's of every candidate with the coverage
(x-height 486/1000 em against Mukta's 468; §9.2 has the table). Two of the four — hamza and ʿayn —
are ring marks with no Mukta counterpart to clash against; the third and fourth are a rare `ẓ`.

Subsetting (#113) shipped before this was settled, which is why the marks spent three tickets on
the fall-through path rather than in a retained glyph set.

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
| Mukta `latin-ext` | 59,944 | Mukta's role is Devanagari; its Latin-ext is unreachable — **wrong, and #222 says so: it is where twelve of the romanization's sixteen marks live. Three weights of it are subset back in, for 11,036 bytes** |
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
font host named in `src/` or `index.html`. (The Arabic quiet line was still `--font-script-fallback`
= system-ui when this was measured; §8 is [D15]'s "if en-ar ships" clause, now taken.)

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

---

## 8. Arabic — Noto Naskh Arabic, bundled and subset to content (#197)

**Verdict in one line:** the romanized courses' quiet native line now paints in a bundled
**Noto Naskh Arabic 400** (SIL OFL 1.1) in every place it renders; a learner on a Latin or
Devanagari course downloads **zero** bytes of it and precaches **2,348**; an Arabic learner
downloads **7,544** bytes today, and both budget rows the strict build gates stay green.

### 8.1 The face, and why it is allowed in the repo

| | |
|---|---|
| family | **Noto Naskh Arabic**, weight 400 only |
| package | `@fontsource/noto-naskh-arabic@5.3.0` (`arabic` subset file, 52,668 bytes woff2) |
| licence | **SIL Open Font License 1.1** — `node_modules/@fontsource/noto-naskh-arabic/LICENSE`, "Copyright 2022 The Noto Project Authors (https://github.com/notofonts/arabic)" |
| may we bundle it? | **Yes.** OFL §2 permits the font to be "bundled, embedded, redistributed and/or sold with any software" with no royalty, provided the copyright notice and licence travel with it (they do: the package ships `LICENSE`, and `npm ci` reproduces it) and provided we do not sell the font on its own or ship it under a Reserved Font Name. Noto Naskh Arabic declares **no** Reserved Font Name, so even the subsetting this build does — which is a Modified Version under OFL §1 — needs no rename. |
| why Naskh, not Kufi/Sans | `design/tokens.md` §2 asks for a Naskh by name. Naskh is the reading face for running Arabic prose; the quiet line is a sentence to be read, not a label. |

**One weight is the whole requirement.** All five `.script` rules are `font: var(--text-body)`
(400 15px/1.55) with only the family swapped, so 400 is what renders and 500/600/700 would be
dead payload — the same argument that cut Mukta 500 in #113. `src/fonts.test.ts` derives that
pairing from the stylesheets rather than trusting this paragraph: any rule that takes a `--text-*`
shorthand and overrides `font-family` contributes its (family, weight) to the bundle requirement.

### 8.2 The divergence from `design/tokens.css`, recorded

`design/` is read-only and re-copied wholesale, so the token cannot be edited where it lives. The
override is `src/styles/tokenOverrides.css`, imported in `main.tsx` **immediately after**
`design/tokens.css` so it wins on order alone — the same shape as PR #189's web-app-manifest `lang`
divergence in `docs/05-pwa-notes.md` §3.

| token | `design/tokens.css` | the app | why |
|---|---|---|---|
| `--font-script-fallback` | `system-ui, sans-serif` — with the standing instruction *"Arabic quiet line (bundle Naskh if ar ships)"* | `"Noto Naskh Arabic", system-ui, sans-serif` | ar has shipped; the instruction is taken |

`system-ui` deliberately **stays behind** the named face: the subset's `unicode-range` claims the
Arabic block, the joiners and the space, and nothing else, so a Latin character or a digit inside
a script line still resolves exactly as it did before this ticket. `src/fonts.test.ts` fails if
the stack ever loses its named face, if `design/tokens.css` ever tries to carry the family itself,
or if the override is imported before the tokens; `src/styleContract.test.ts` keeps the override
register one file long.

### 8.3 The subset

`tools/font-subset.ts` gained one `ScriptTarget`, and nothing else changed shape — the harvest,
the dev/strict split and the "generated woff2 are gitignored" rule are #113's, unaltered:

- **covers** `U+0020`, `U+0600-06FF`, `U+0750-077F`, `U+0870-08FF`, `U+200C-200E`, `U+FB50-FDFF`,
  `U+FE70-FEFC` — the Arabic block and neighbours, the presentation forms a shaper may reach for,
  and the joiners.
- **baseline** (always present): space, `،` `؛` `؟`, the Arabic-Indic digits `٠`–`٩`, tatweel,
  ZWNJ/ZWJ. No letters — content decides those, the rule Mukta's Latin baseline follows.
- **the space is deliberate.** Without `U+0020` a four-word Arabic line is set in two faces —
  Naskh for the words, the system face for the gaps — which is measurable in the attribution below
  (`DejaVu Sans ×1` per space) and visible as slightly loose spacing. It only ever applies where
  this family is named, i.e. the five `.script` rules.
- **Naskh's own `latin` subset is NOT bundled.** It would roughly double the Arabic learner's font
  cost to re-draw characters Barlow already draws well, for text that is not the line's job.

GSUB closure does the heavy lifting: HarfBuzz keeps every initial/medial/final/isolated form and
every ligature composable from the retained letters, so `اسمي` shapes and joins correctly from the
four base codepoints — the Arabic analogue of #113's conjuncts.

### 8.4 Bytes, exactly

Measured from `dist/` after `npx vite build`, source file 52,668 bytes:

| build | Arabic content shipped | Naskh woff2 in `dist/` | downloaded by the learner | precached |
|---|---|---:|---:|---:|
| **strict / learner** (`npm run build` → hi-mr only) | none — en-ar is `fixture: true` | **2,348** | **0** | 2,348 |
| **dev** (`--with-fixtures` → hi-mr, en-es, en-ar) | en-ar L1-M1, 4 sentences / 6 script lines | **7,544** | 7,544 (Arabic course) · **0** (hi-mr, en-es) | 7,544 |

**Downloaded = 0 for a non-Arabic course is not an estimate.** `unicode-range` means the browser
fetches a face only when the page paints a codepoint the range claims; a CDP request log over
hi-mr and en-es shows zero requests for the Naskh woff2, and one for en-ar (§8.5). What a
non-Arabic learner did pay was the **service-worker precache**, which took all of `dist/`
(#90/#92): **2,348 bytes**, 0.6 % of the font budget.

> **Since #211, that last sentence is 0 too.** The precache is the shell — the Barlow faces and
> the shared `latin` cuts — and every script subset, Naskh included, reaches the device only
> through the runtime route the active course warms (`docs/05-pwa-notes.md` §3). The "precached"
> column above is the #197 record, not today's build: a non-Arabic learner now downloads **and**
> stores zero bytes of Naskh.

Against the two budget rows `tools/payload-budget.ts` gates (`scripts/verify.sh`, strict build):

| row | before #197 | after #197 | limit | |
|---|---:|---:|---:|---|
| `fonts` (raw woff2) | 361.2 KiB | **363.5 KiB** | 380 KiB | ok, +2.3 KiB |
| `total` (gzip, first visit) | 548.1 KiB | **550.8 KiB** | 580 KiB | ok, +2.7 KiB |

**No limit was raised.** The dev build — which the gate does not meter — is a different story and
is not this ticket's to fix: it was already **597.7 KiB** against the 580 KiB `total` limit after
Spanish M3–M5, and this change takes it to **605.2 KiB**. That row is #207's (per-course
measurement); metering three courses' content against a budget written for one is the bug, and
raising the limit to hide it would delete the tripwire.

**How it scales.** 2,348 bytes is the floor (baseline glyphs and font tables); 7,544 is four
sentences. The marginal cost is per *distinct character*, not per sentence, and Arabic's alphabet
is 28 letters plus diacritics — so #199–#201 filling out en-ar L1 will converge on roughly the
size of the whole `arabic` subset's letter repertoire, an order of magnitude below Devanagari's
~86–90 KiB per weight (Devanagari pays for conjunct closure; Arabic's joining forms are far
fewer). Expect low tens of KiB at full L1, on one weight rather than three.

**Measured against that prediction (#199).** en-ar L1-M1 and L1-M2 authored in full — 20 sentences
and every word row, variation, mistake and pool item carrying its Arabic original — take the subset
from **2,348 to 10,228 raw bytes**. Twenty sentences cost ~8 KiB where four cost ~5 KiB, which is
the per-distinct-character curve flattening exactly as predicted: most of M2's letters were already
paid for by M1. On #207's per-course rows the whole course reads `course:en-ar 27.8 KiB gzip`
against a 360 KiB limit (`precache:en-ar` 244.0 KiB against 590) — content, index and Naskh
together. Eight more modules at this rate land nowhere near either limit.

**Open, and not #197's or #199's to fix: the ROMANIZED line has no bundled face for its
diacritics.** Probing a character at a time through `CSS.getPlatformFontsForNode` on the dev build:
`ā ī ū ḥ ṣ ḍ ṭ ẓ ʾ ʿ` (U+0101, U+012B, U+016B, U+1E25, U+1E63, U+1E0D, U+1E6D, U+1E93, U+02BE,
U+02BF) all fall out of Mukta to the system's DejaVu Sans, while the ASCII letters beside them stay
Mukta. So `ṣabāḥ al-khayr, Rohān` paints in two faces at 32px. §2's `/dev/type` specimen renders the
diacritics in **Barlow**, not Mukta, which is why the gap survived this long — the specimen is not
the face the hero uses.

### 8.5 Rendering evidence

Dev build (`npm run dev`, en-ar active), headless Chromium 151 over CDP at 390×844 dpr 2. The
verifying box has no Naskh installed — `fc-list :lang=ar` finds only DejaVu Sans — so any glyph
not drawn by the bundle is attributable by name.

![The en-ar module list: four Arabic quiet lines set in the bundled Noto Naskh Arabic](images/ar-script-naskh.png)

**1. The face loads, and it is ours.** `document.fonts` reports `Noto Naskh Arabic 400` as
`loaded`, from our own origin; the request log shows `200 noto-naskh-arabic-arabic-400.woff2` and
no external font host.

    document.fonts.check('400 15px "Noto Naskh Arabic"', 'اسمي روهان')   // true

(Asked *with the string*: `check()` with no text probes `BESbwy`, which is outside the Arabic
`unicode-range` and answers `true` for any family — a trap worth naming.)

**2. Glyph-width comparison**, the technique #190 used for Mukta — the same string, the same
`400 15px/1.55`, three stacks:

| stack | width of `اسمي روهان` |
|---|---:|
| `'Noto Naskh Arabic', system-ui, sans-serif` | **67.73 px** |
| `'Nope Not A Font', system-ui, sans-serif` | 80.67 px |
| `system-ui, sans-serif` | 80.67 px |

A missing family and the bare system stack measure identically; the bundled face does not. The
line is being drawn by something the page brought with it.

**3. Per-node attribution** — `CSS.getPlatformFontsForNode`, which reports the face the renderer
actually used and whether it was a custom (bundled) one. Every glyph of every Arabic line:

| surface | route | glyphs from the bundled face | from a system face |
|---|---|---:|---:|
| `SentenceCard` (module list) ×4 | `#/module/L1-M1` | 12, 16, 14, 10 | **0** |
| `SentenceScreen` | `#/sentence/L1-M1-S01` | 12 | **0** |
| `ReadPhase` (retired by #388) | `#/practice` (read) | 12 | **0** |
| `RevealCard` | `#/practice` (reveal) | 12 | **0** |

Four of the five `.script` rules, observed live. The fifth, `ComprehensionItem`, sits behind the
exit ritual (two got-its per sentence) and could not be reached by script; it carries the
byte-identical rule against the same token, and `src/fonts.test.ts` asserts all five resolve to a
face the bundle carries. Before the space joined the subset the same probe read
`DejaVu Sans ×1 + Noto Naskh Arabic ×11` — one system glyph per word gap, which is what §8.3's
`U+0020` fixed.

**4. Before / after, same DOM.** Setting `--font-script-fallback` back to its design value live
(`system-ui, sans-serif`) flips every line to `DejaVu Sans ×10-12`, all system:

| | |
|---|---|
| ![before: the Arabic lines in DejaVu Sans, the system fallback](images/ar-script-before.png) | ![after: the same lines in bundled Noto Naskh Arabic](images/ar-script-after.png) |

**5. The other two courses are untouched.** hi-mr and en-es render zero `.script` lines (they are
`scriptMode: 'native'`), fetch **zero** Naskh bytes, and their Mukta/Barlow attribution is
unchanged.

### 8.6 Reproducing

```bash
npm run build && npm run budget      # BUDGET fonts 363.5 KiB ok | total 550.8 KiB ok
find dist -name 'noto-naskh*' -printf '%s\n'                          # 2348 (strict)
npm run dev                          # then Settings → english → arabic → any module
```

The attribution is a CDP session against the dev server: `CSS.getPlatformFontsForNode` on each
`.script` node. A screenshot alone is not proof — DejaVu Sans draws Arabic, badly, without tofu —
which is why the width comparison and the per-node attribution are both here.

---

## 9. The romanization's diacritics — decided 2026-08-13 (#222)

**Verdict in one line:** the L2 face becomes a two-face stack, `"Mukta", "Source Sans 3",
system-ui` — **twelve** of the sixteen marks en-ar ships come out of Mukta's own `latin-ext` cut,
which this build had never asked for, and the four Mukta has no glyph for (`ʾ` U+02BE, `ʿ` U+02BF,
`Ẓ` U+1E92, `ẓ` U+1E93) come out of a Source Sans 3 subset whose `unicode-range` claims those four
codepoints and nothing else; `course:en-ar` goes **96.6 → 110.3 KiB gzip** against a 360 KiB limit,
every other course's row is **unchanged to the decimal**, and the shell precache stays 17 files.

This is §4's **option 3**, taken. §4.1.1 records the decision and why options 1 and 2 were not.

### 9.1 What is bundled, and why it is allowed in the repo

| | |
|---|---|
| new family | **Source Sans 3**, weights 400 · 600 · 700, `latin-ext` subset only |
| package | `@fontsource/source-sans-3@5.3.0` (three source files, 98,684 bytes woff2 together) |
| licence | **SIL Open Font License 1.1** — `node_modules/@fontsource/source-sans-3/LICENSE`, and `"license": "OFL-1.1"` in its `package.json` |
| may we bundle it? | **Yes**, on exactly the terms §8.1 sets out for Noto Naskh Arabic: OFL §2 permits bundling and redistribution with software, the notice and licence travel with the package, and the family declares **no** Reserved Font Name — so the subsetting this build does, a Modified Version under OFL §1, needs no rename. |
| new subset of an existing family | **Mukta `latin-ext`**, weights 400 · 600 · 700 — no new package, no new licence question |

**Three weights, not one.** The marks are inside `--text-l2-cue` (400), `--text-l2-card` /
`--text-l2-list` (600) and `--text-l2-hero` (700), so they render at every weight Mukta renders
the letters at. One weight would have left the hero's `ʿ` as a browser-synthesised bold beside a
real Mukta 700 `a` — the exact failure [D15] is about, and the argument that cut Mukta 500 in #113
run in reverse. `src/fonts.test.ts` derives the requirement from the ramp rather than trusting
this paragraph: since #222 it reads **every** named family in a `--font-*` stack, not just the
head, so a face the product renders in second place is held to the ramp exactly as Mukta is.

### 9.2 Why Source Sans 3 — coverage first, then fit, both measured

**Coverage.** Every candidate was subset with HarfBuzz against the sixteen marks en-ar actually
ships and the output's `cmap` read back, which answers "does this face **draw** it?" — a question
a `unicode-range` can never answer:

| face | `ā ī ū` | `ḍ ḥ ṣ ṭ` (+ caps) | `ʾ ʿ` | `Ẓ ẓ` |
|---|---|---|---|---|
| **Mukta** `latin-ext` (the L2 face) | ✅ | ✅ | ❌ | ❌ |
| **Source Sans 3** | ✅ | ✅ | ✅ | ✅ |
| Noto Sans | ✅ | ✅ | ✅ | ✅ |
| Barlow / Barlow Condensed (the shell faces) | ✅ | ❌ | ❌ | ❌ |
| IBM Plex Sans · Open Sans · Hind | ✅ | ❌ | ❌ | ❌ |
| Noto Naskh Arabic's own `latin-ext` | ✅ | ❌ | ❌ | ❌ |

Two faces cover the gap. The choice between them is **optical fit next to Mukta's Latin**, because
the marks are not ornaments — they are the letters `a i u d h s t z` with a stroke added, standing
inside a word whose other letters are Mukta's. A face 14 % taller in the x-height puts a visibly
bigger letter in the middle of `ʿind`. Read from each font's `head` and `OS/2` tables, per 1000 em:

| face | x-height | cap height | Δ x-height vs Mukta |
|---|---:|---:|---:|
| **Mukta** (what the marks stand beside) | 468 | 630 | — |
| **Source Sans 3** | 486 | 660 | **+3.8 %** |
| Barlow | 506 | 700 | +8.1 % |
| IBM Plex Sans | 516 | 698 | +10.3 % |
| Noto Sans | 536 | 714 | +14.5 % |

Noto Sans is the obvious sibling of the bundled Noto Naskh Arabic and it loses on the only
criterion that matters here. Source Sans 3 wins by measurement, not by taste.

**And the correction that made all of this cheap.** §4.1 asserted "Mukta ships no `latin-ext` at
all". It ships seven weights of one; `tools/font-subset.ts` had simply never had a target pointing
at the file, and §5's cut table had written it off as "unreachable" on the same assumption. Asking
the real file yields `ā ī ū ē ō ḍ Ḍ ḥ Ḥ ṛ ṣ Ṣ ṭ Ṭ` — a Devanagari face carrying the Indic
transliteration set, which is exactly what a romanization needs. So the expensive half of the
problem was already paid for and un-shipped, and the new family is left drawing four codepoints.

### 9.3 The routing

Two `ScriptTarget`s, both named `latin-ext`, on two faces:

- **Mukta** — `U+0100-017F`, `U+1E00-1E9F`. Latin Extended-A for the long vowels (and the `ē ō` a
  future scheme may want), Latin Extended Additional for the dot-below emphatics and their
  capitals. Declared **after** the `latin` blocks in `src/fonts/mukta.css`: the two subsets are
  disjoint in what they carry, but @fontsource's declared `latin` range names `U+0131` and
  `U+0152-0153`, codepoints the `latin` cut has no glyph for and this one does — the later block
  winning them is the browser choosing the file that can actually draw them.
- **Source Sans 3** — `U+02BE-02BF`, `U+1E92-1E93`. Exactly the gap. A wider range would download
  a second face to draw glyphs Mukta already has; the overlap with Mukta's `U+1E00-1E9F` at
  `Ẓ ẓ` is deliberate and is how family order is meant to work — Mukta is named first, is asked
  first, and has nothing to give.
- **Baseline: none.** Every other target's baseline is punctuation a line carries whatever it
  says. A diacritic cut is letters end to end, and letters are the one thing content decides — a
  build with no romanized course emits an empty cut rather than ten marks nobody renders.

**No range claims a character that carries no script**, and that is not an aesthetic point. #211
found every course downloading the Arabic face because the offline warm sampled whitespace and
format characters that several `unicode-range`s claim at once (`U+0020`, `U+200C-200E`). Both new
ranges start at U+0100 and contain no space, joiner, digit or ASCII letter, so the class of bug
cannot come back through them. `tools/font-subset.test.ts` asserts it twice: once against a string
of the neutral characters, once against the **actual authored content of every course** —

    coveredChars(courseText('hi-mr'), latinExt)      → ''
    coveredChars(courseText('en-es'), diacritics)    → ''
    coveredChars(courseText('en-ar'), latinExt)      → non-empty

— so a hi-mr or en-es learner never paints a codepoint either range claims and never fetches a
byte of either file. hi-mr's whole non-ASCII Latin repertoire is one character, `·` U+00B7;
en-es's is `¿ á é í ñ ó ú` and their capitals, all below U+00FF and all already Mukta's.

### 9.4 Bytes, exactly

Measured from `dist/` after `npx vite build`, strict build (hi-mr, en-es, en-ar):

| generated file | source | subset |
|---|---:|---:|
| `mukta-latin-ext-400.woff2` | 14,676 | **3,688** |
| `mukta-latin-ext-600.woff2` | 14,972 | **3,636** |
| `mukta-latin-ext-700.woff2` | 15,424 | **3,712** |
| `source-sans-3-latin-ext-400.woff2` | 32,868 | **948** |
| `source-sans-3-latin-ext-600.woff2` | 32,900 | **972** |
| `source-sans-3-latin-ext-700.woff2` | 32,916 | **980** |
| **total** | 143,756 | **13,936** |

Against the rows `tools/payload-budget.ts` gates (`scripts/verify.sh`, strict build):

| row | before #222 | after #222 | limit | |
|---|---:|---:|---:|---|
| `course:en-ar` | 96.6 KiB | **110.3 KiB** | 360 KiB | ok, +13.7 |
| `course:hi-mr` | 337.9 KiB | **337.9 KiB** | 360 KiB | **unchanged** |
| `course:en-es` | 71.3 KiB | **71.3 KiB** | 360 KiB | **unchanged** |
| `shell` | 215.8 KiB | **215.9 KiB** | 230 KiB | +0.1 — the six `@font-face` blocks in the CSS |
| `first-paint` | 174.7 KiB | **174.9 KiB** | 185 KiB | same 0.1 |
| `precache` | 17 files, 207.3 KiB | **17 files, 207.5 KiB** | = `shell` | ok |

**No limit was raised**, and the two rows that matter most are the ones that did not move. A
diacritic cut is a `latin-ext` script in `tools/payload-budget.ts`'s owner table, and
`coursesFromManifest` charges it to a course whose `scriptMode` is `romanized` — so it is
`course:en-ar`'s alone, out of the shell precache by the same `PRECACHE_IGNORES` line that keeps
Devanagari and Arabic out (`tools/pwa.ts`, derived from `COURSE_SCRIPTS`), and warmed onto a
device only by the course that paints it (`src/pwa/offlineCourse.ts`).

### 9.5 [D15], answered

> *"…ʾ/ḥ/ī diacritics of the romanization must render in Barlow — verify glyph coverage, fall back
> to a diacritic-complete face if needed."* — `design/PRD-engineering.md` §10 [D15]

**Answer: they do not render in Barlow, they never did, and the fall-back clause is taken.** The
premise was wrong in a way §4.1 measured — the romanization is `--font-devanagari`, not
`--font-body`, so Barlow was never in its stack — and the coverage the clause asks to verify has
now been verified per character against the real font files (§9.2). The diacritic-complete face
the clause authorises is bundled: **Mukta's own `latin-ext` for twelve of the marks, Source Sans 3
for the four Mukta cannot draw.** Nothing in the romanization renders in a system face any more.

`design/` is read-only and re-copied wholesale (docs/design-contract.md), so the answer is
recorded here and in `docs/PRD-engineering.md` §10 rather than written back into the clause —
the same rule that puts the token change in `src/styles/tokenOverrides.css` instead of
`design/tokens.css`. That token change is the second row of the override register:

| token | `design/tokens.css` | the app | why |
|---|---|---|---|
| `--font-devanagari` | `"Mukta", system-ui, sans-serif` | `"Mukta", "Source Sans 3", system-ui, sans-serif` | Mukta has no glyph for four of the romanization's marks; the face behind it does. `system-ui` stays last — this adds a face to the stack, it does not remove a fall-through. |

### 9.6 Reproducing

```bash
npm run build && npm run budget    # BUDGET course:en-ar 110.3 KiB gzip ≤ 360.0 KiB ok — 30 files
find dist -name 'mukta-latin-ext-*' -o -name 'source-sans-3-*' | wc -l    # 6
grep -c 'latin-ext' dist/sw.js                                           # 0 — never precached
```

On the deployed build, the same three facts read straight off the wire:

```bash
base=https://rishabh7g.github.io/rung
css=$(curl -s $base/ | grep -o '/rung/assets/index-[^"]*\.css')
curl -s $base${css#/rung} | grep -o 'unicode-range:U+2BE-2BF,U+1E92-1E93'   # the gap, routed
curl -s $base${css#/rung} | grep -o 'unicode-range:U+100-17F,U+1E00-1E9F'   # Mukta's own marks
curl -sI $base/assets/source-sans-3-latin-ext-400-*.woff2 | head -1         # 200, ~948 bytes
```

Glyph-level truth is a browser question and this host runs no browser: the evidence here is the
`cmap` of the real subsets (`tools/font-subset.test.ts` reads it with HarfBuzz, in CI-visible
assertions rather than a screenshot), the ranges in the served CSS, and the per-course byte rows
above. `/dev/type` in a browser on another machine remains the way to see it.

## 10. Cyrillic — the same face, a second range (#325)

en-ru (English → Russian, `scriptMode: native`) draws Cyrillic as its **display** line: every
sentence, word, variation, mistake and pool item. Mukta bundles no Cyrillic at all, so before
this target every one of those letters was whatever the device happened to own — or tofu where
it owned nothing. That is why the en-ru graduation issue depends on this one: a course whose
hero line can be tofu does not ship.

### 10.1 The face, and why it is not a new one

Source Sans 3 — already bundled since #222, already second in `--font-devanagari`, already at
400/600/700. `@fontsource/source-sans-3` ships a `cyrillic` subset at exactly those weights, so
this is one `ScriptTarget` row and three `@font-face` blocks, with no new dependency, no new
licence question (SIL OFL 1.1, §9.1) and no new token override: Mukta is asked first, has nothing
in the Cyrillic block, and the browser falls through to the family that does.

**The choice is provisional by the ticket's own terms.** If a design review prefers a dedicated
Cyrillic face, that is one `SubsetFace` row and one committed sheet — the shape §9 already set.

### 10.2 The range, and the three marks deliberately left out

```
unicode-range: U+0400-04FF, U+2116;
```

The ticket proposed a baseline of space, « », — and №. Only № is here, and the reason is the rule
`source-sans-3.css` already states: **Mukta is named first and draws the other three** (its `latin`
cut runs to U+00FF, covering the guillemets; its U+2000-206F range covers the em dash). Claiming
them would download this cut to draw glyphs Mukta already has — and a range containing a SPACE
would pull it into *every course in the catalogue*, which is the #211 precache bug arriving through
the font system instead.

№ (U+2116) is the exception: Mukta's latin range stops at U+206F, nothing else bundled reaches it,
and without a claim it drops to `system-ui` mid-line.

**This diverges from the Arabic baseline (§8), which does carry its space, and the difference is
scope.** Noto Naskh Arabic is reached only through `--font-script-fallback` — a per-course quiet
line — so a space in its range costs the courses that already load it. Source Sans 3 sits in the
shared L2 family that *every* course renders through. The cost of leaving the space out is that a
Cyrillic line's gaps are set in Mukta and its letters in Source Sans 3; neither has ink, so what
differs is the space's advance. That is the right trade against a face download for every other
course in the catalogue.

**ё is a letter, not baseline.** It is inside the claimed block, so it renders — but it is
harvested from content like every other letter, so a build with no en-ru content ships no glyph
for it. The baseline is `'№'` and `src/fonts.test.ts` pins that ё is not in it.

### 10.3 Bytes

Measured on a strict build with **no en-ru content authored yet** — the honest-gate curve §8
describes for Naskh, which was ~2 KiB until its ladder existed:

| | files | source-sans-3 total |
|---|---|---|
| before #325 | 13 | 3 cuts, 3.9 KiB |
| after #325 | 16 | 6 cuts, 5.5 KiB |

The three Cyrillic cuts are near-empty today: they carry № and nothing else, because no en-ru
content exists to harvest letters from. They grow as the en-ru authoring issues land and
`fonts:build` re-runs. `npm run budget` is green, and no existing course's row moves — the new
range is claimed by no course that does not write Cyrillic.

### 10.4 What is not proven here

Glyph-level rendering is a browser question and this host runs no browser (§9.6). The evidence is
the `cmap` of the real subsets (`tools/font-subset.test.ts`, HarfBuzz), the claimed ranges in the
committed sheet, and the byte rows above. **No en-ru content has been rendered in a browser in
this face** — when the course is authored, `/dev/type` on a machine with one is the way to see it.
