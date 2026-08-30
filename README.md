# rung

A ladder of checkpoints for learning a language — not a timeline. First pair:
**Hindi (L1) → Marathi (L2)**. A fully offline, installable, mobile-first PWA:
no backend, no accounts, no audio, no runtime AI. Built by one person, for one
friend.

*rung* (formerly *Shidi*, शिडी — Marathi for "ladder") names the core metaphor: a
fixed sequence of 10 modules ("rungs"), each exited only by **writing** a novel
"11th sentence" of the same complexity, verified by a human.

## Start here

| Doc | What it is |
|---|---|
| [`docs/PRD-engineering.md`](docs/PRD-engineering.md) | Canonical engineering PRD — features F1–F9, phases P0–P5 |
| [`docs/PRD-design.md`](docs/PRD-design.md) | Canonical design PRD — flows, screens, components, tone |
| [`docs/01-plan.md`](docs/01-plan.md) | Implementation plan: stack, layout, data contracts, Devanagari primer. **Read before your first ticket.** |
| [`design/`](design/) | Design mockups + tokens (added by Rishabh as milestone D completes) |
| [`docs/design-contract.md`](docs/design-contract.md) | How to build UI against the design package — tokens, prototype fidelity, mobile rules |
| [`docs/04-font-notes.md`](docs/04-font-notes.md) | What bundling Mukta + Barlow proved: the specimen, glyph coverage, shipped font bytes (#85) |
| [`docs/05-pwa-notes.md`](docs/05-pwa-notes.md) | The PWA: manifest, precache byte tables, the airplane-mode gate and its screenshots, what still needs a phone (#90) |

## Development

**Prerequisites:** Node **22.22.2+ or 24.15+** (`engines.node`; CI runs 24) and npm. No
other runtime, no backend, no env vars. The floor is jsdom 30's, not ours — on Node 20
every test file fails to import before it asserts anything.

```bash
npm install
npm run dev     # http://localhost:5173
```

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Typecheck (`tsc -b`) then production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run typecheck` | TypeScript only — strict + `noUncheckedIndexedAccess` |
| `npm run test` | Vitest (jsdom + Testing Library), single run |
| `npm run lint` | ESLint (flat config), Prettier-compatible |
| `npm run format` | Prettier write across the source tree |
| `npm run content:validate` | Schema v5 + cross-checks over `content/*/modules/*.json` |
| `npm run content:build` | Builds `public/content/` from `content/` — strict by default |
| `npm run content:prompt -- <courseId> <moduleId>` | Renders the authoring prompt for one module into `.prompts/` (gitignored). Needs the prior module's index — run a dev `content:build` first |
| `npm run icons:build` | Regenerates `public/icons/*.png` from the header rails mark. Committed output; run it only when the mark changes |

### `scripts/verify.sh` — one line, or one failure

The gate before every PR (docs/01-plan.md §8). Run it from anywhere; it finds the repo root
itself:

```bash
scripts/verify.sh          # everything
scripts/verify.sh --fast   # everything except BUILD
```

A green run says exactly one thing, and exits 0:

```
TYPES ok | LINT ok | TEST 142/142 ok | CONTENT ok | BUILD ok
```

| Step | Exit | Command |
|---|---|---|
| TYPES | 10 | `npm run typecheck` |
| LINT | 20 | `npm run lint`, then `npx prettier --check .` — **either one failing is exit 20** |
| TEST | 30 | `npm run test`; the segment carries vitest's own count |
| CONTENT | 40 | `npm run content:build` — schema validation, word index and the strings check in one |
| BUILD | 50 | `npx vite build`; omitted entirely with `--fast` |

Steps run in that order and the **first failure stops the run**, so a red run names exactly one
thing: `FAIL <STEP> (exit <code>)`, the last 20 lines of that step's log, and the path to the
whole log. Nothing else is printed — no progress chatter to scroll past, on either colour.

```
FAIL TYPES (exit 10)

src/App.tsx(9,9): error TS2322: Type 'number' is not assignable to type 'string'.

log: /home/rrish/dev/shidi/.verify/types.log
```

Every step writes `.verify/<step>.log` (gitignored), and **the directory is wiped at the start of
every run** — so a missing log is proof that step never ran: the failure above leaves `types.log`
and nothing else.

Two things worth knowing before you read a result:

- **BUILD is `vite build`, not `npm run build`.** The npm script's `prebuild` would re-run tsc and
  `content:build`, so a content failure would resurface as `FAIL BUILD` long after CONTENT passed.
  The harness runs each thing once, under its own name.
- **CONTENT judges the exit code, never the output.** A strict build correctly ships nothing today
  (see the gate table below) and exits 0 — that is `CONTENT ok`, not an empty-output failure.

The harness has its own tests (`scripts/verify.test.ts`): they run it in a tmp dir against fake
`npm`/`npx` shims, because a test that really shelled out to `npm run test` would run vitest inside
vitest.

**CI runs this exact command** — `.github/workflows/ci.yml` is `npm ci` then `bash scripts/verify.sh`
on every pull request and every push to `main`, and it is the only job. There is deliberately no
separate lint/test/build pipeline to keep in sync: what fails on your machine fails in CI, with the
same one-line output. When a run is red, the `.verify/` logs are attached to it as the
`verify-logs` artifact, so the failing step's whole log is one download away.

### The content gate — why `dev` and `build` see different content

`content:build` runs automatically as `predev` and `prebuild`, and it is the thing that
decides what a build is allowed to contain (PRD-engineering §3, §6.2, [D4]):

| | modules shipped |
|---|---|
| `npm run build` (`prebuild`, **strict — no flags**) | only `verified: true` **and** not `fixture: true`, from non-fixture courses |
| `npm run dev` (`predev`, `--with-unverified --with-fixtures`) | everything that validates |

**Strict is production truth: a learner build can never contain unreviewed or sample
content.** `verified: true` means a module has been reviewed and cleared to ship, and
`verifiedBy`/`verifiedAt` name who or what reviewed it and when — `tools/validate.ts`
rejects a verified module that carries no signature. On **2026-08-13** hi-mr
L1-M1..M10 were flipped to `verified: true` on the repo owner's explicit authority,
backed by an **LLM linguistic review** (`docs/07-llm-review-L1-M1-M5.md`,
`docs/07-llm-review-L1-M6-M10.md`, and the third pass that re-reviewed all ten blind,
`docs/08-marathi-third-review.md`), so `npm run build` now ships the full L1 ladder.
**The native-speaker gate is a separate, stricter bar and is still unmet.** The three
issues that tracked it (#64, #110, #111) were closed by the owner on 2026-08-13, so the
**22 open questions in `docs/08-marathi-third-review.md`** — which supersede the two
earlier lists — plus the **8 added by `docs/15-llm-review-hi-mr-surfaces.md`** (30 in
all) are the only remaining record of what a native reviewer still owes.

**The surface pass (#282, 2026-08-24) closed the gap between what hi-mr teaches and what it
shows** — the twin of en-es's #281. Seven surfaces appeared in variation lines and were taught by
no word row; five now resolve (`झोपणार` on M4's झोपतो row, `दुकानाजवळ` on M7's दुकान row, `जाऊ` on
M6's जाणार row, `येऊ` with the plain-future persons on M6's येईन row, `आम्ही` beside `आपण` on
M10's row — the M2 तू/तुम्ही precedent), and two are recorded exemptions that would only resolve by
landing on a row headed by a different word (`पाच`, a sibling number; `बोललो`, a verb L1 never
teaches). M6 and M10 got their honest paradigm answer: three M6 rows now carry shape lists, and
every `[]` left behind is a per-row decision on the record — M6's own rule says -णार never
changes, and M10's re-teach rows leave each paradigm on the first-teach row that owns its index
key. **Additions only**: the hi-mr index grew 206 → **215** surfaces with 0 keys lost and 0 keys
moved. `tools/content-build.test.ts` now sweeps every hi-mr variation line against its own
module's index and pins the three remaining misses (the proper noun `प्रिया` and the two
exemptions), so a new variation that resolves nowhere fails the suite. The reasoning, row by row,
is `docs/15-llm-review-hi-mr-surfaces.md`.

**No fixture course again (#273, 2026-08-24; then #331, #337 and #343, 2026-08-30).** All seven
courses ship — en-fr, en-it and en-ru were each authored behind the gate and graduated the same
way, below — and no module in the repo
is unverified, so `npm run dev` and `npm run build` contain the same modules — the two
relaxations are still enforced and still tested (`tools/content-build.test.ts` builds synthetic
fixture rows and unverified modules and watches them be dropped), they simply have nothing in
this repo to relax. The two most recent courses were each authored behind them, one after the
other. The fourth: **hi-en — Hindi (L1) → English
(L2)** entered as #267's manifest row with `fixture: true`, a 3 × 10 ladder
(`content/hi-en/levels.json`) and a Hindi strings bundle, so until #273 a strict build reported
`hi-en: 0 modules — fixture course, excluded by the gate` and did not emit the course, while a
dev build admitted it (`--with-fixtures`) and shipped whatever was authored. The ten L1 briefs landed with
#269 (`tools/course-briefs.ts`, header section "hi-en: the four decisions a brief must settle" —
Hindi in every teaching field, no `glossEn`, `literal` in English order, contractions as single
index surfaces). **#270 authored L1-M1 and L1-M2** (`content/hi-en/modules/`, 17 + 15 word rows,
`maxSpan` 2 for `I'm` · `I am` / `Good morning` / `thank you`), flipped both rungs to
`hasContent: true`, and reviewed them in `docs/11-llm-review-hi-en-L1-M1-M2.md`. **#271 authored
L1-M3, L1-M4 and L1-M5** (14 + 25 + 15 word rows; the cumulative index now runs 23 → 39 → 56 → 90
→ 108 surfaces, M1–M2's counts having moved by two because M5 extended M1's one `be` row with
`was · were` in M1's own file, as the briefs require), flipped all three, and reviewed them in
`docs/12-llm-review-hi-en-L1-M3-M5.md`. Both reviews are LLM reviews on the owner's authority,
each ending in its open questions for a fluent-English pass; `src/course/hiEnAuthored.test.tsx`
is the dev-build smoke over all five rungs (no browser runs on this host), and
`tools/content-build.test.ts` pins which row every seam key (`be`, `to`, `do`, `the`, `have`,
`in` / `on` / `at`, `get up`, `did`, …) lands on. **#272 authored L1-M6…M10** (Tomorrow, Where things are, Numbers & shopping,
Feelings & opinions, Connected talk — 16 + 17 + 17 + 16 + 13 word rows; the cumulative index now runs
108 → 126 → 148 → 171 → 188 → **202** surfaces, `maxSpan` 3 for `in front of` / `Can I have`), flipped
all five — **all ten L1 rungs are authored** — and reviewed them in
`docs/13-llm-review-hi-en-L1-M6-M10.md`. Whole surfaces: `going to`, `there is` / `there are`,
`next to`, `in front of`, `how much` / `how many`, `Can I have`, `See you`; `because` / `so` one row
each; `it` / `it's`, `where`, `this` (M8), `that` (M9), the joiners `and` / `but` / `also` / `then`;
M10's turns are 2–3 sentences in one `display` (`minWordsPerSentence: 2`, no schema change). The one
recorded deviation from the contraction policy: `I'll` (M6) lists only itself, so `I will` still opens
the `will` row the brief wants tappable. Graduation (#273) followed the en-es/en-ar path — below.

**en-es ships (#195, 2026-08-13) — the product has two courses.** All ten L1 rungs —
`L1-M1`…`L1-M10` — are authored and carry `verified: true` on the same
LLM-review-plus-owner-authority basis as hi-mr's, so dropping `fixture: true` from the en-es row
in `content/courses.json` was the whole change: a strict `npm run build` now emits
`public/content/en-es/` with levels, strings, ten modules and ten cumulative indexes, and the
emitted `courses.json` lists **hi-mr and en-es**. The course is written **pan-Hispanic**: no
`vosotros`, no region-only vocabulary, both norms named where they differ, and no currency word
picked. Its L2/L3 ladders stay `draft: true` — placeholder lists, nothing authored.

**No native Spanish speaker has read a word of it.** The bar en-es clears is LLM review plus the
owner's authority, exactly hi-mr's, and the **79 open questions** across
`docs/07-llm-review-en-es-L1-M1-M2.md`, `docs/07-llm-review-en-es-L1-M3-M5.md`,
`docs/07-llm-review-en-es-L1-M6-M10.md` and `docs/14-llm-review-en-es-surfaces.md` are what a native
reviewer still owes — dialect first. Graduating the course ships LLM-reviewed Spanish to learners;
it does not close that gap.

**The surface pass (#281, 2026-08-24) closed the gap between what en-es teaches and what it
shows.** Thirteen surfaces appeared in variation lines and were taught by no word row, and two
modules — L1-M5, the past tense, and L1-M10 — shipped `forms: []` on every row. Ten of the thirteen
now resolve (`te gusta`/`le gusta`, `te gustan`/`le gustan`, `quiere`, `española`, `están`, `son`,
`trabajaré`, `hablar`, the `hasta …` goodbyes), three are recorded exemptions that would only
resolve by landing on a row headed by a different word (`profesor`, `buenas tardes`, `hermano`), and
M5's nine verb rows plus M10's three now carry their taught paradigms. **Additions only**: the
en-es index grew 197 → **227** surfaces with 0 keys lost and 0 keys moved — every pre-existing
surface still resolves to the same `{moduleId, sentenceId, wordIdx}`. `tools/content-build.test.ts`
now sweeps every en-es variation line against its own module's index and pins the ten remaining
misses (two proper nouns, four forward references, the four tokens of the three exemptions), so a
new variation that resolves nowhere fails the suite. The reasoning, row by row, is
`docs/14-llm-review-en-es-surfaces.md`.

**en-ar ships (#202, 2026-08-13) — the product has three courses, and one of them is a new
script.** Ten L1 rungs authored against ten briefs (#198–#201), reviewed in `docs/07-llm-review-
en-ar-L1-M1-M2.md`, `docs/09-llm-review-en-ar-L1-M3-M5.md` and
`docs/10-llm-review-en-ar-L1-M6-M10.md`, and shipping on the same LLM-review-plus-owner-authority
bar. **No native Arabic speaker has read a word of it either.** It is **Modern Standard Arabic**,
register pinned to spoken-simple MSA (pause forms, no case endings, no dialect substitutions), and
`scriptMode: romanized`: every sentence prints in ALA-LC-flavoured Latin with the Arabic script
beneath it as recognition only. That quiet line is `dir="rtl"` and `lang="ar"` (#196) and draws in
bundled Noto Naskh Arabic (#197). Its L2/L3 ladders stay `draft: true`.

One honest defect ships with it: the romanization's **ā ī ū ḥ ṣ ḍ ṭ ẓ ʾ ʿ render in the system
face, not Mukta** — Mukta's `unicode-range` stops at U+00FF and it has no glyph past it, so the
marks fall through by design. Mixed-face, not tofu; the options are a face decision
(docs/04-font-notes.md §4.1).

**The surface pass (#283, 2026-08-24) closed the gap between what en-ar teaches and what it
shows** — the third of the family, after en-es's #281 and hi-mr's #282, and the only one with no
paradigm half: no en-ar module ships `forms: []` across the board, so only the gap list moved.
Eleven surfaces appeared in variation lines and were taught by no word row — above all the
**feminine second-person …-īn cluster** every "to a woman" line displays. Eight now resolve, each
on a row of the same word (`tuḥibbīn` on M1's uḥibb, `tadhhabīn` on M4's adhhab, `sa-tadhhabīn` on
M6's sa-adhhab, `tatakallamīn` on M10's atakallam, `masāʾ al-khayr` whole on M2's greeting row,
`sayyāratān` on M8's sayyārāt, `bi-riyāl` and `sa-ashtarī` on their M8 rows), and two are recorded
exemptions: `marḥaban` (a sibling greeting sharing no word with its row — the en-es
`buenas tardes` ruling) and `ṣabāḥ an-nūr`, the reply the **additions-only invariant itself locks
out** — indexing it would hand its hyphen part `an` to M2 and steal M3-S03's own key, so it stays
prose (module rule 5), with bare `ṣabāḥ` a forward reference that resolves from M4 on.
**Additions only**: the en-ar index grew 275 → **283** surfaces with 0 keys lost and 0 keys moved.
`tools/content-build.test.ts` now sweeps every en-ar variation line against its own module's index
and pins the six remaining misses (two proper nouns, the two exemptions' four tokens), so a new
variation that resolves nowhere fails the suite — which is what #287's third-variation pass
inherits, with the four …-īn keys it wants already in the index. The reasoning, row by row, is
`docs/16-llm-review-en-ar-surfaces.md`, and its 8 open questions join the 61 across the three
earlier en-ar reviews.

**hi-en ships (#273, 2026-08-24) — the fourth course, and the first whose L2 is English.** Ten L1 rungs authored against ten briefs (#269 — `tools/course-briefs.ts`,
"hi-en: the four decisions a brief must settle": Hindi in every teaching field, no `glossEn`,
`literal` in English order, contractions as single index surfaces), reviewed in
`docs/11-llm-review-hi-en-L1-M1-M2.md`, `docs/12-llm-review-hi-en-L1-M3-M5.md` and
`docs/13-llm-review-hi-en-L1-M6-M10.md`, and shipping on the same LLM-review-plus-owner-authority
bar as the other three. Dropping `fixture: true` from the hi-en row in `content/courses.json` —
plus the L1 `draftNote` that called the ladder a fixture — was the whole change: a strict
`npm run build` now emits `public/content/hi-en/` with levels, strings, ten modules and ten
cumulative indexes, and the emitted `courses.json` listed **hi-mr, en-es, en-ar and hi-en** (en-it
joined them at #337). No
sentence carries a `glossEn`, by decision rather than omission: #268 made the gloss optional where
`l2Tag` is `en`, because an English gloss of an English hero line would print the line twice. The
chrome is Hindi (`revealLabel` = अंग्रेज़ी दिखाओ) and the Settings switcher offers the pair as
`hindi → english`. Its L2/L3 ladders stay `draft: true` — placeholder lists, nothing authored.

**No native or fluent-English reviewer has read a word of it.** The bar hi-en clears is LLM review
plus the owner's authority, exactly the other three courses', and the **88 open questions** (20 +
30 + 38) across the three review docs are what a fluent-English pass still owes — register and
naturalness first. Graduating the course ships LLM-reviewed English to Hindi speakers; it does not
close that gap.

**en-ru ships (#343, 2026-08-30) — the product has five courses, and the fifth is the first
written in a non-Latin script the app had to bundle a face for.** Ten L1 rungs authored against
ten briefs (#339 — `tools/course-briefs.ts`, "en-ru: the six decisions a brief must settle":
`вы` for the whole of L1, a fixed case plan with the instrumental deferred, perfective-only past,
the zero copula as a delta to celebrate, `ё` and the case endings as index seams), reviewed in
[`docs/28-llm-review-en-ru-L1-M1-M2.md`](docs/28-llm-review-en-ru-L1-M1-M2.md),
[`docs/29-llm-review-en-ru-L1-M3-M5.md`](docs/29-llm-review-en-ru-L1-M3-M5.md) and
[`docs/30-llm-review-en-ru-L1-M6-M10.md`](docs/30-llm-review-en-ru-L1-M6-M10.md), and shipping on
the same LLM-review-plus-owner-authority bar as the other four. 100 sentences, 120 comprehension
pool items, three variations on every sentence and a 215-surface cumulative index, with zero
unresolved tokens.

**It could not ship until the app could draw it.** Mukta bundles no Cyrillic, and en-ru is a
`native` course — the Cyrillic IS the hero line, not a quiet secondary one. #325 bundled the face
(Source Sans 3's `cyrillic` subset, already second in `--font-devanagari`) and mapped `ru` in
`SCRIPT_BY_LANGUAGE_TAG`; this graduation is the moment its cut grows from a near-empty
placeholder over the real repertoire: **source-sans-3 5,484 → 20,280 bytes**. The `unread-script`
payload row — script subsets bundled ahead of the course that reads them — drops from 3 files to
**zero** as those cuts move into `course:en-ru`, which is that row working exactly as designed.

Budget: `course:en-ru` **101.9 KiB** gzip (26 files) against a 360 KiB `COURSE_LIMIT`,
`precache:en-ru` 317.2 KiB, `shell` 215.3 KiB. `course:hi-mr` stays 345.6 KiB — adding a fifth
course moved no other course's row. The chrome is English (`revealLabel` = "Reveal the Russian")
and the Settings switcher offers it to an English reader as **Russian**. Its L2/L3 ladders stay
`draft: true` — placeholder lists, nothing authored.

**No native or fluent-Russian reviewer has read a word of it.** The bar en-ru clears is LLM review
plus the owner's authority, and the **78 open questions** across the three review docs are what a
fluent-Russian pass still owes. Four of them are decisions a native might overturn wholesale — the
`вы`-only register, `Как дела?` inside it, the perfective-only past, and the deferred instrumental
— and the riskiest single line is `Ещё чай, пожалуйста`, which may want the partitive `чаю` that
L1 deliberately does not teach. **Every `sound` line in the course was written from description,
never from listening**, and the intonation claims underpinning M2 are the least safe of them.
Graduating the course ships LLM-reviewed Russian to English speakers; it does not close that gap.

The payload budget holds, because #207 made it per learner: `course:en-es` **71.3 KiB** gzip
against 360 and `course:en-ar` **96.6 KiB** against 360, with `course:hi-mr` **byte-identical**
at 337.9 KiB across both graduations — a Spanish learner is never charged for hi-mr's Devanagari
or for Arabic, and vice versa. en-es's one shared cost was `shell` 210.4 → **214.2 KiB**: Mukta's
`latin` subsets are cut over the union of shipped courses, so Spanish's accented glyphs are in the
bytes every learner downloads. en-ar's shared cost was **negative** — `shell` **214.6 KiB**, down
1.4, because Naskh had been charged to `shell` while en-ar was a fixture and now has an owner
(docs/05-perf-notes.md §4.4, §4.5).

hi-en is the heaviest row in the product, and it holds: `course:hi-en` **346.5 KiB** gzip against
360 (13.5 KiB of headroom), `precache:hi-en` **561.1 KiB** against 590. A Hindi-chrome course is
charged the Mukta Devanagari subset exactly as hi-mr is (`SCRIPT_BY_LANGUAGE_TAG`: `hi` →
`devanagari`) — ≈ 85 KiB of JSON plus ≈ 261 KiB of face — and its Hindi teaching prose, three
UTF-8 bytes a character, makes its JSON ≈ 8 KiB heavier than hi-mr's. hi-en's shared cost lands
on hi-mr, not on `shell`: `tools/font-subset.ts` cuts the Devanagari faces over the union of
shipped courses, so hi-en's repertoire grew the subset both Hindi courses download —
`course:hi-mr` 336.3 → **338.7 KiB** (+2.4, its first move across three graduations), `shell`
214.5 → 214.6, `course:en-es` and `course:en-ar` unchanged (docs/05-perf-notes.md §4.6).

**en-it — English (L1) → Italian (L2)** was the fifth, and it followed the same path one issue
later: #332's manifest row with `fixture: true`, the ratified 3 × 10 ladder copied from en-es and
an English strings bundle differing from en-es's in one word (`revealLabel` = "Reveal the
Italian"), with no `modules/` folder at all — a state both halves of the pipeline already
tolerated (`tools/validate.ts` skips a course directory with no `modules/`; `content-build.ts`
reports `en-it: 0 modules — nothing authored yet`). The ten L1 briefs landed with #333
(`tools/course-briefs.ts`, header section "en-it: the five decisions a brief must settle" — the
`tu` / `Lei` register decision, the elision apostrophe as an index seam, accents as letters,
multi-token surfaces, homograph owners). **#334 authored L1-M1 and L1-M2** (21 + 14 word rows,
`maxSpan` 2 for `mi chiamo` / `mi piace` / `mi piacciono`), **#335 L1-M3…M5** (15 + 15 + 13),
**#336 L1-M6…M10** (13 + 17 + 13 + 11 + 12); the cumulative index runs 37 → 55 → 76 → 105 → 128 →
161 → 185 → 207 → 223 → **245** surfaces, `maxSpan` 3 for `un po' di`, `un chilo di` and
`a che ora`. Every sentence carries three variations and every module twelve pool items, authored
in from the first rung rather than retrofitted (#288, #292). `src/course/enItAuthored.test.tsx` is
the dev-build smoke over all ten rungs — no browser runs on this host — and
`src/course/types.test.ts` walks every en-it display the way the resolver does, so an apostrophe
surface with no word row behind it fails the suite by name.

**en-it ships (#337, 2026-08-30) — the product has five courses.** Ten L1 rungs authored against
ten briefs, reviewed in `docs/28-llm-review-en-it-L1-M1-M2.md`,
`docs/29-llm-review-en-it-L1-M3-M5.md` and `docs/30-llm-review-en-it-L1-M6-M10.md`, and shipping on
the same LLM-review-plus-owner-authority bar as the other four. Dropping `fixture: true` from the
en-it row in `content/courses.json` — plus the L1 `draftNote` that called the ladder a fixture —
was the whole change: a strict `npm run build` now emits `public/content/en-it/` with levels,
strings, ten modules and ten cumulative indexes, and the emitted `courses.json` lists **hi-mr,
en-es, en-ar, hi-en and en-it**. The chrome is English (`revealLabel` = "Reveal the Italian") and
the Settings switcher offers the pair as `english → italian`. Its L2/L3 ladders stay `draft: true`
— placeholder lists, nothing authored. The course-wide register decision ships with it: **the
whole of L1 speaks `tu`**, `Lei` is written in no display string, and politeness is carried by
`vorrei` and `per favore` instead (the reasoning is in the briefs' header).

**No native or fluent-Italian reviewer has read a word of it.** The bar en-it clears is LLM review
plus the owner's authority, exactly the other four courses' — and the **66 open questions** (16 +
20 + 30) across the three review docs are what a fluent-Italian pass still owes — naturalness and
the `tu`-only decision first, then the pronunciation glosses, none of which their author can hear.
Graduating the course ships LLM-reviewed Italian to English speakers; it does not close that gap.

Its payload is the lightest of the five and it holds: `course:en-it` **74.3 KiB** gzip against 360
(285.7 KiB of headroom), `precache:en-it` **289.7 KiB** against 590 — Italian is Latin, and neither
`en` nor `it` maps to a course face in `SCRIPT_BY_LANGUAGE_TAG`, so the course is charged content
only, exactly as en-es is. Every other course row is **byte-identical** across the graduation
(`course:hi-mr` 345.6, `course:en-es` 76.6, `course:en-ar` 115.7, `course:hi-en` 353.3). The one
shared cost is `shell` 214.8 → **215.4 KiB** (+0.6): Mukta's `latin` subsets are cut over the union
of shipped courses, so Italian's accented glyphs — `è à ì ò ù é` — are now in the bytes every
learner downloads. `COURSE_LIMIT` was not touched.

**en-fr ships (#331, 2026-08-30) — the product has five courses, and the fifth is the first
authored to the retrofitted standards from its first rung.** Ten L1 rungs authored against ten
briefs (#327 — `tools/course-briefs.ts`, "en-fr: decisions a brief must settle": the `vous`
register taken course-wide, elision as an index seam, accents as letters, multi-token surfaces,
intonation questions, and an owner for every homograph), reviewed in
`docs/28-llm-review-en-fr-L1-M1-M2.md`, `docs/29-llm-review-en-fr-L1-M3-M5.md` and
`docs/30-llm-review-en-fr-L1-M6-M10.md`, and shipping on the same LLM-review-plus-owner-authority
bar as the other four. Dropping `fixture: true` from the en-fr row in `content/courses.json` —
plus the L1 `draftNote` that called the ladder a fixture — was the whole change: a strict
`npm run build` now emits `public/content/en-fr/` with levels, strings, ten modules and ten
cumulative indexes (171 surfaces through L1-M10, `maxSpan` 4), and the emitted `courses.json`
lists **hi-mr, en-es, en-ar, hi-en and en-fr**. Every sentence carries a `glossEn`, because the L2
is not English and #268's exemption is hi-en's alone. The chrome is English (`revealLabel` =
"Reveal the French") and the Settings switcher offers the pair as `english → french`. Its L2/L3
ladders stay `draft: true` — placeholder lists, nothing authored.

**en-de ships (#365, 2026-08-30) — the product has eight courses, and the catalogue is fully
graduated: no row carries `fixture: true` any more.** Ten L1 rungs authored against ten briefs
(#361 — `tools/course-briefs.ts`, "en-de: decisions a brief must settle"), across three parallel
authoring issues (#362 L1-M1–M2, #363 L1-M3–M5, #364 L1-M6–M10) and reviewed in
[`docs/31-llm-review-en-de-L1-M1-M2.md`](docs/31-llm-review-en-de-L1-M1-M2.md),
[`docs/29-llm-review-en-de-L1-M3-M5.md`](docs/29-llm-review-en-de-L1-M3-M5.md) and
[`docs/33-llm-review-en-de-L1-M6-M10.md`](docs/33-llm-review-en-de-L1-M6-M10.md), on the same
LLM-review-plus-owner-authority bar as the other seven. Dropping `fixture: true` from the en-de row
in `content/courses.json` — plus the L1 `draftNote` that called the ladder a fixture — was the
whole change: a strict `npm run build` now emits `public/content/en-de/` with levels, strings, ten
modules and ten cumulative indexes, and the emitted `courses.json` lists all eight courses. The
chrome is English (`revealLabel` = "Reveal the German") and the switcher offers the pair as
`english → german`. Its L2/L3 ladders stay `draft: true`.

**German is the first course that had to plan around what the surface folder THROWS AWAY.** Every
earlier course planned around what `src/engine/surface.ts` KEEPS — Spanish accents, Russian `ё`,
the Italian elision apostrophe. Rule 4 lowercases every token, and German capitalises every noun,
so `Sie`/`sie` and `Essen`/`essen` merge into one index key each. That is decision 2 of the brief
and the reason en-de's brief section is the longest of the eight. The consequence is a handful of
DELIBERATE duplicate rows — `nicht`, `dienstag` and `in` — pinned in `src/course/types.test.ts` as
`FORCED_DUPLICATES` with an ownership map asserting one row per surface. `in` is the one worth
naming: L1-M1 teaches it locative (`Ich wohne in Berlin`) and L1-M7 teaches it with motion and the
accusative (`Ich gehe in den Park`), and the word index is first-occurrence-wins, so M1's note has
to name both seats or M7's learners get a note that is false of the sentence in front of them.

**No native or fluent-German reviewer has read a word of it.** The bar en-de clears is LLM review
plus the owner's authority, exactly the other seven courses'.

The payload holds: `course:en-de` **96.9 KiB** gzip against a 360 KiB `COURSE_LIMIT`,
`precache:en-de` **315.3 KiB** against 590. German is Latin on both sides, so `de` maps to no
course face in `SCRIPT_BY_LANGUAGE_TAG` — that table is unchanged by this graduation — and the
course is charged content only. Its shared cost is `shell` 217.4 → **218.4 KiB** (+1.0): the
emitted manifest gained a row, and Mukta's `latin` subsets are cut over the union of shipped
courses, so `ä ö ü ß Ä Ö Ü` are now in the bytes every learner downloads. That coverage was
verified by reading the generated cmaps rather than inferred from `unicode-range` — all seven
glyphs present in `mukta-latin` at 400, 600 and 700. `course:hi-mr` stays **345.9 KiB**, unchanged
by the graduation.

Two standards the older courses had retrofitted onto them are baked into en-fr from L1-M1: **three
variations on every sentence** (#288's bar) and **twelve comprehension items per module** (#292's).
The payload below is therefore honest already — no retrofit growth is coming.

**No native or fluent-French reviewer has read a word of it.** The bar en-fr clears is LLM review
plus the owner's authority, and the **33 open questions** (10 + 11 + 12) across the three review
docs are what a fluent-French pass still owes — naturalness, register and the pronunciation
glosses first, since nobody has heard any of them. Three of those questions are about the register
decision itself: `vous` course-wide means a learner finishes L1 able to buy bread and unable to
speak to a friend.

The payload holds with room to spare: `course:en-fr` **74.6 KiB** gzip against 360,
`precache:en-fr` **291.8 KiB** against 590 — the lightest course in the product after en-es, and
for the same reason. French is Latin on both sides, so `fr` maps to no course face in
`SCRIPT_BY_LANGUAGE_TAG` and the course is charged content only. Its shared cost is `shell`
214.8 → **217.2 KiB** (+2.4): the emitted manifest gained a row, and Mukta's `latin` subsets are
cut over the union of shipped courses, so French's accented glyphs are in the bytes every learner
downloads. `course:hi-mr` **345.6 KiB**, `course:en-es` **76.6 KiB**, `course:en-ar`
**115.7 KiB** and `course:hi-en` **353.3 KiB** are all unchanged by the graduation.

The two relaxations are independent (`--with-unverified`, `--with-fixtures`), and either
one makes the output a **dev build**, which says so twice over: the run prints
`CONTENT ⚠ DEV BUILD — includes … content; NOT shippable` as its first and last line, and
the emitted `public/content/courses.json` carries `"devBuild": true` plus a `devBuildNote`.
A strict build has neither key, so an artefact can never quietly pass for a learner build —
check `devBuild` before you trust a bundle.

`public/content/` is generated and gitignored: clean-recreated on every run, module files
copied verbatim, `levels.json` re-emitted with `hasContent` **derived from what actually
shipped** (the authored flag is never trusted), and `courses.json` filtered to courses that
shipped at least one module.


**en-ko ships (#380, 2026-08-30) — the product has nine courses, and this is the first one that
was BORN conforming to the no-reading rule.** English (L1) → Korean (L2). Ten L1 rungs authored
against ten briefs (#376 — `tools/course-briefs.ts`, "en-ko: the decisions a brief must settle"),
across three authoring issues (#377 L1-M1–M2, #378 L1-M3–M5, #379 L1-M6–M10) and reviewed in
[`docs/35-llm-review-en-ko-L1-M1-M2.md`](docs/35-llm-review-en-ko-L1-M1-M2.md),
[`docs/36-llm-review-en-ko-L1-M3-M5.md`](docs/36-llm-review-en-ko-L1-M3-M5.md) and
[`docs/37-llm-review-en-ko-L1-M6-M10.md`](docs/37-llm-review-en-ko-L1-M6-M10.md), on the same
LLM-review-plus-owner-authority bar as the other eight. Dropping `fixture: true` from the en-ko
row and the L1 `draftNote` was the whole change: a strict `npm run build` emits
`public/content/en-ko/` with levels, strings, ten modules and ten cumulative indexes, and the
emitted `courses.json` lists all nine courses. The chrome is English (`revealLabel` = "Reveal the
Korean") and the switcher offers the pair as `english → korean`. Its L2/L3 ladders stay
`draft: true`.

**Hangul never reaches a learner-facing surface, and it never had to be taken back out.**
`docs/design-contract.md`'s "rung teaches speech, not script" (#353) ends with a forward rule — a
new non-Latin course is romanized from its first commit, never retrofitted — and en-ru is what the
rule was written against: it shipped `scriptMode: "native"` and cost six issues (#353–#360) and
959 Cyrillic `display` strings to undo. en-ko settled its romanization BEFORE its manifest row
existed ([`docs/34-en-ko-romanization-decisions.md`](docs/34-en-ko-romanization-decisions.md),
#373), so the row's `romanizationNote` was true the moment it landed. `checkScriptMode` reports
**zero errors across all ten modules**; `src/course/types.test.ts` extends that to what the build
cannot see, failing on Hangul inside an English `note`, `rule` or `sound` line. The scheme is
Revised Romanization, transcribing pronunciation, with one named deviation: a particle or the
copula is joined to its host by a hyphen and the host keeps its isolation shape — `chaek-eul`,
`jeo-neun`, `haksaeng-ieyo` — so `surfaceIndexKeys` gives the bare noun an index key of its own.
Without it, an agglutinative language would have left `chaek` ("book") with no row a learner could
ever tap.

**The honest defect, found before authoring rather than after (#375): the quiet Hangul `script`
line renders from a system font.** `@fontsource/noto-sans-kr` splits Korean across ~120 numbered
range files per weight and `tools/font-subset.ts` is built on one source file per target, so
bundling a Hangul cut is a pipeline change and not a target addition. It was not made. Measured on
the shipped build: the course's `script` fields carry **126 distinct Hangul syllables** and
**0 of 126** appear in any generated cut, so `--font-script-fallback` falls through to `system-ui`.
On a phone that is a real Korean face; on a stripped Linux it is tofu. This is the same shape of
defect en-ar has carried since #202, with the difference that it was measured and recorded before
the first module was written.

Budget, reported and not gated — `COURSE_LIMIT` has not existed in `tools/payload-budget.ts` since
#304, and `npm run budget` fails only on attribution (`unmetered` must hold zero files) and the
precache audit. Three older paragraphs above still quote it; they are the record of what was
believed then. `course:en-ko` **103.9 KiB** gzip (29 files), `precache:en-ko` **322.8 KiB** (48
files). `course:hi-mr` stays **345.9 KiB** — adding a ninth course moved no other course's row.
The shared cost is `shell` 217.4 → **218.9 KiB** (+1.5), which is the emitted manifest gaining a
row and that row's `romanizationNote`. `SCRIPT_BY_LANGUAGE_TAG` is **unchanged**: unlike `ar` and
`ru`, whose romanizations are charged a `latin-ext` cut for their diacritics, this one is pure
ASCII and is charged nothing. Verified by reading the generated cmaps rather than inferring from
`unicode-range`: every ASCII character the course's `display` strings use, the particle hyphen
included, is present in `mukta-latin` at 400, 600 and 700.

**No native or fluent-Korean reviewer has read a word of it.** The bar en-ko clears is LLM review
plus the owner's authority, exactly the other eight courses'. The **20 open questions** (6 + 7 + 7)
across the three review docs are what a fluent-Korean pass still owes — naturalness of the
comprehension turns first, then the speech-level judgements, then the pronunciation lines, since
nobody has heard any of them.

### The word index — and the rule it enforces

Every shipped module also gets `public/content/<courseId>/index/<moduleId>.json`: each L2
surface form (a word's `display` plus every entry of its `forms` — romanized for romanized
courses, never the `script` line) mapped to the word entry that **teaches** it,
`{moduleId, sentenceId, wordIdx}`. It is **cumulative** — L1-M2's index is L1-M1's plus what
M2 adds, because a module never re-teaches what an earlier one taught — and **first
occurrence wins**, so the pointer names where the learner met the word. The run notes each
one: `index L1-M2: 47 surfaces`. This is what the "why" resolver reads (PRD §6.3).

Two consequences worth knowing before you author content:

- **A comprehension-pool item may only use taught words.** Every whitespace-split token of
  every pool item must resolve in that module's cumulative index, or the build fails naming
  the course, module, item id and token. Sentences' own `variations` and `mistake` lines are
  deliberately outside the rule — a mistake is wrong L2 *by design*.
- **`normalizeSurface` is the one definition of "same word"** — `src/engine/surface.ts`, NFC
  + edge punctuation stripped (`आहात?` → `आहात`), case and apostrophes untouched (#116). The
  emitter imports it, and so does the runtime resolver (`src/engine/wordIndex.ts`, #94). Never
  copy it: a second copy is a word that silently has no "why".

### The strings contract — 82 keys, no fallback copy

Every course ships one `strings.json` carrying **all** the microcopy the shell renders, because
the shell has none of its own (PRD §4). So the build validates it against the canonical key list
in `src/course/stringsKeys.ts` — the only list in the repo, which the app's `Strings` type derives
from — and a bundle that fails takes the whole build down with it (PRD §6.5): a missing key is a
blank screen for the learner, not an English word.

The list lives in the **course layer** and the build imports it, not the other way round: the
runtime is the side that must not break, and a `tools/` module the app bundle imports is how a
second copy of the list gets born. `src/course/stringsKeys.test.ts` fails if either table is ever
declared twice.

`tools/strings-check.ts` runs per course, flattens the nested file onto dot-paths
(`ritual.check.copy`), and reports four things, always naming course **and** key:

- **missing key** — the 82 canonical paths must all be there;
- **empty or non-string value** — a present-but-blank key is a missing key with extra steps;
- **unknown key** — the typo tripwire; `ritual.check.plate` would otherwise sit quietly beside a
  missing `plateLabel`;
- **placeholder mismatch** — a value carries exactly its canonical `{placeholders}`
  (`{sentenceCount} {maxWords} {ordinal} {n} {nextModule} {to} {from} {level} {remaining}
  {total} {count} {phase}`), so a translation cannot
  drop `{ordinal}` or invent `{name}`.

Adding a key is one edit to `src/course/stringsKeys.ts` plus a line in each of the three bundles —
in that order, because the build will tell you exactly which course you forgot. The list grew that
way nine times: five keys the frozen screens forced (PR #120), three the Ladder forced (#86 —
`ladder.pendingLine`, `ladder.ownership`, `ladder.sealedToast`), seven the staged rung card forced
(#87 — `rungCard.startModule`, `.freshNote`, `.practice`, `.revisitModule`, `.exitRitual`,
`.module`, `.practiceEarlier`: a label for every control across the four [D22] stages), three
the module list forced (#88 — `module.helper`, `module.openFull`, `module.trapNote`), four
Sentence Detail forced (#89 — `sentence.trapHead`, `.pocketIt`, `.prev`, `.next`: the trap
callout's heading, the mnemonic's label and the two pager buttons), four the reveal card forced
(#93 — `mark.gotIt`, `.missed`, `.prompt`, `.next`: the two self-mark segments [D11], the question
above them and the Next that does not exist until one is chosen) and three the "why" panel forced
(#94 — `why.show`, `.hide`, `.openFull`: the toggle's two labels, because it names what it will
do, and the link that leaves a running session) and seventeen the session machine forced
(#96 — `practice.*`: the hub's title, its three phase lines and the line that says the phases never
gate, the two Begin labels, the three phase names the chips wear, the honest answer to a Review
chip with nothing due, and the summary's title, four count lines and its way back) and five the
Read phase forced (#97 — `read.showCue`, `.hideCue`, `.prev`, `.next`, `.toProduce`: the cue
toggle's two labels and the pager's three, the last of which names where the rung's last sentence
goes) and three lossless resume forced (#99 — `practice.resumeLine`, `.resumeContinue`,
`.resumeNew`: where the open session stopped, and the two ways out of it) and two the
press-and-hold forced (#101 — `ritual.confirm.done`, `.toComprehension`: what the control says
once it is signed, and the way on to part 2 — the prototype writes both in English for every
course, which is the shell owning a learner-facing sentence) and five the Verdict forced
(#103 — `verdict.checkSentence`, `.checkChecked`, `.checkComprehension`, `.honesty`, `.toLadder`:
the three checklist lines the ritual ends on, the honesty line under them, and the CTA that climbs
back to the ladder). All fifty-six are
**draft values pending the Sync-3 freeze** (#71). The alternative each time was a
learner-facing line hardcoded in the shell, which is the one thing this list exists to prevent.

`why.openFull` is deliberately **not** `module.openFull`: one opens a sentence from a browsing
list, the other leaves a running session for it. A course may well word them the same; sharing the
key would mean it could never word them differently — the call #93 made for `mark.next` against
`sentence.next`, and #97 for `read.prev`/`read.next` against Sentence Detail's pager.

### The course layer — what boots first

The app knows a manifest, not a language pair (PRD-engineering §8 F0). Boot order is
**manifest → provider → screens**, and no screen mounts until there is an active course:

- `src/course/manifest.ts` — `loadCourses()` fetches `${BASE_URL}content/courses.json` once
  (the cache is the promise, so concurrent callers share one request) and parses the **emitted
  envelope**: `{courses: [...]}`, plus `devBuild: true` on a relaxed build. The authored
  `content/courses.json` keeps the PRD §4 bare-array shape — only the build output is wrapped,
  and `src/` never reads the authored tree. Anything wrong — offline, 404, not JSON, wrong
  shape, **no courses** — throws a `ManifestError`, which is the tripwire, not an edge case: a
  strict build ships zero courses today, so `npm run build` really does render the
  content-error screen.
- `src/course/CourseProvider.tsx` — resolves the active course and exposes
  `{course, courses, devBuild}` through `useCourse()`. It owns the loading and error screens
  (`BootScreens.tsx`), so everything below it already has a course.
- `src/course/strings.ts` — `loadStrings(courseId)` fetches that course's bundle (once per
  course; the cache is the promise again), reads the canonical dot-paths out of the nested file
  and hands screens `useStrings()`. Access is **non-optional** — `strings['retry.title']` is a
  `string` — because the build refuses to ship an incomplete bundle, so there is no fallback copy
  to write. The provider loads it as part of boot: a screen that has mounted has its words.
  `interpolate(value, {…})` fills `{placeholders}`; a name with no value is left verbatim and
  warned rather than blanked, because a silent gap reads as finished copy.
- `src/course/content.ts` — the rest of the course's files: `loadLevels(courseId)`,
  `loadModule(courseId, moduleId)`, `loadIndex(courseId, moduleId)`, and the hooks
  `useLevels()` / `useModule(id)` / `useIndex(id)` that read them for the active course and
  return `{data, loading, error}`. Same rules as the two loaders above — the cache is the
  promise, keyed by URL (so course scoping is free and a failure is never cached), `BASE_URL`
  read per call — and the same tripwire posture: `schemaVersion: 5`, the expected arrays are
  arrays, and the file's own ids match what was asked for, because a wrong-file-served is
  exactly what a build cannot catch. Everything throws `ContentError {url, reason}`, which the
  screens hand to the same `ContentErrorScreen` the provider uses.
- `src/course/types.ts` — schema v5 as TypeScript: `ModuleContent`, `Levels`, `WordIndex`.
  Derived from `content/schema/module.schema.json` and the four modules that exist, not from a
  sketch — including the enrichment fields (`literal`, `trap`, `sound`, `variations`, `mistake`,
  `usage`, `register`, `mnemonic`), module-level `rules` with `deconstruction.rules` as indices
  into them, `complexity`, `exitTest` and `fixture`. `types.test.ts` reads every authored module
  and ladder off disk and fails naming any key no type declares, so the mirror cannot rot.
- `resolveActiveCourse(courses, persistedId?)` is a **pure function**: the persisted course when
  it is still in the manifest, else the first entry with a `console.warn`. It never writes, so a
  fallback does not erase the stored id (Invariant 8). The id it reads is `state.activeCourse`
  (#82) — the provider subscribes to the store, so `setActiveCourse` re-boots the layer with the
  new course's strings and content, which is what the P4 switch flow (#106) will hang off.

Adding a course stays "a folder plus a manifest row": nothing in the shell names a course id.

### Shell purity — the guard that keeps that true

`src/shellPurity.test.ts` scans every shipped file under `src/` for a course's script — Devanagari
(hi-mr) or Arabic (en-ar) — and fails naming file and line. Copy that got hardcoded is copy no
course can translate, so the rule is mechanical rather than a review habit, and it counts comments
too: a doc comment is where a pasted string waits before it becomes code. Script examples belong
in tests, which the scan skips along with `src/test/` fixtures.

English shell furniture (the boot error copy, later a Settings header) stays permitted — the guard
is about course scripts, not about English. The exemption list in that file is **empty**; the one
entry anyone anticipates is the `/dev/type` font page (#85), and adding it will be a conscious
line in that ticket's diff.

### The silence guard — the app plays nothing and records nothing

`src/silence.test.ts` is the same shape of scan for invariant **[D1]** ("the app plays no audio,
records nothing", PRD-engineering §1): no shipped file under `src/` may name a sound API —
playback (`Audio` and its contexts, `<audio>`, `<video>`), synthesis (`speechSynthesis`,
`SpeechSynthesisUtterance`) or capture (`MediaRecorder`, `getUserMedia`) — and a violation fails
naming file, line and API.

It landed with the **Read phase** (#97) because Read is where the temptation lands: the phase asks
the learner to say the sentence out loud, and the obvious "help" is a play button — a synthesised
Marathi voice, or a recorder to compare yourself against. Both are the app saying the line *for*
the learner (Invariant 3), and neither could be right offline for a pronunciation nobody has
signed off. Comments count, as in #80 and #82, and the exemption list is **empty and stays empty**:
there is no file that gets to make a sound. Its own tests plant one violation per API, so a
pattern that stops matching cannot pass as a clean tree.

### The state layer — one document, keyed by course

`src/state/` is zustand + persist over a single `localStorage` document, `rung:state`, whose shape
is PRD-engineering §8 F7 **verbatim**: `{stateVersion: 6, activeCourse, courses: {<courseId>:
{modules, production, reviewQueue, sessionCount, studied, session}}, settings}`. Everything a
learner earns hangs under `courses[<courseId>]`, which is what makes **course switching never
destroy progress** (Invariant 8): a switch moves a pointer, and a course whose content is missing
from a build keeps its subtree, its ladder and its stored id until the folder comes back.

Two things are not in the shape and never will be: **anything the learner wrote** (Invariant 4 —
the v2 state had an `attempts` array; v6 has nothing of the kind) and **any calendar**. The one
date in the whole document is `passedAt` on a passed module.

- `src/state/types.ts` — the shape, plus `STATE_VERSION`. Nothing else declares it.
- `src/state/clock.ts` — `Clock = () => string` and `systemClock`, **the only place in the app
  that constructs a date**. Actions that need a stamp take a `Clock` and default to it, so the
  engine stays pure and testable without fake timers. `clock.test.ts` scans every shipped file
  under `src/` and fails naming the file and line that reached for the wall clock — the same
  mechanical guard as shell purity, for the same reason.
- `src/state/store.ts` — `useAppStore`, persisted with `version: 6` and a wired `migrate` stub
  (its doc comment is the contract for the real v5 → v6 wrap, which ships with export/import in
  P4). It stays **thin, and free of rules**: `ensureCourse` (idempotent — an existing course
  returns the same object, so no write can blank a ladder), `setActiveCourse` (a bare pointer swap;
  the learner-facing switch flow with its toast is #106), `setSetting`, `setLadder` /`markStudied` /
  `passRitual` (progression, below — every rule they obey is derived in the engine),
  `recordProduction` (the counters, below), the session's three (`startSession`, `recordReview`,
  `setSession` — below), and `_reset()` for dev and tests. `completeRitual` (#103) adds none of its
  own: it calls `passRitual` and rides its single write.

`store.test.ts` pins the initial shape against the literal the PRD prints, so drift is a red test
rather than a discovery; the rest of it proves per-course isolation, a round trip through storage,
and that a v5 payload reaches `migrate`.

### The progression engine — every ladder truth, derived

`src/engine/progression.ts` (pure TypeScript: no React, no storage, no clock) answers the four
questions the Ladder asks, and stores none of the answers — a stored level status is a second source
of truth waiting to disagree with the modules it summarises (PRD-engineering §8 F1: "level status
derived, never stored"):

| | |
|---|---|
| `deriveStatuses(input)` | every module by status — `locked` · `unlocked` · `in_progress` · `exit_available` · `passed` |
| `levelSealed(input, level)` | the **seal rule** (PRD-design §5): a level unlocks only when *every* module of the previous level is passed |
| `currentRungId(input)` | the first non-passed rung of the first unsealed, incomplete level — `null` on a finished ladder |
| `rungStage(input, id)` | the staged rung card [D22]: `!hasContent` → `pending`, `!studied` → `fresh`, `exitAvailable` → `exit_ready`, else `studied` |

`ladderFromLevels(levels)` turns a course's `levels.json` into the engine's ladder; the two live
facts arrive as **injected predicates** — `studied(id)` (the per-course flag) and `exitAvailable(id)`
(every sentence produced ≥ 2×, below). `progressionInput(state, courseId)` in the store assembles one
from what a course actually holds, and the screens derive from the same input the store guards with.

Sealing counts a rung whose module has not been authored yet — hi-mr ships 2 of L1's 10 today, so L2
stays sealed until the other 8 exist and are passed. That is the rule working: there is nothing to
climb through a rung with no module.

**One unlock path (Invariant 1).** `passRitual(courseId, moduleId, clock?)` is the only action in the
app that writes `modules`. It throws unless the module *is* that course's current rung — a rung
further up, a module already passed, a sealed level, or a course whose ladder the store has not been
handed all refuse and write nothing — and it stamps `passedAt` from the injected `Clock`.
`markStudied` marks, and cannot unlock: reading every module in the ladder leaves every status
exactly where it was.

`src/state/unlockPath.test.ts` is that promise's mechanical half, in three parts: it slices every
action out of `store.ts` **by name** and fails if more than one contains a write to `modules`; it
*calls* every action against a course with a passed rung and fails if any but `passRitual` changes
the map (the call table is asserted to cover the store's whole action surface, so a new action
cannot skip the check by being new); and it scans every shipped file for a `setState` call, because
an action list is not a gate if a screen can write past it.

### The production counters — the one number that opens the exit ritual

`exit_available` is a single line of the PRD — "all sentences self-marked got-it ≥ 2×"
(PRD-engineering §8 F1) — and it is the thing standing between the learner and the rung's exit
ritual. Three pieces carry it (#95), on purpose: the rule is pure, the write is one action, and the
join between them is a hook, because the answer needs a fact from each side of the app.

| | |
|---|---|
| `src/engine/exit.ts` | pure — `exitAvailable(sentenceIds, production)` (every id ≥ 2) and `started(sentenceIds, production)` (any id ≥ 1), plus `PRODUCTIONS_PER_SENTENCE`, the `2` the module list's dots and its `n / 20` count read too |
| `recordProduction(courseId, sentenceId)` | the store's counter action: `production[sentenceId] += 1`, and nothing else |
| `src/screens/useExitAvailable.ts` | the join — this course's counters (state) against the current rung's sentence ids (content, loaded through the content layer's cache), handed to `progressionInput` as the real predicate |

**An empty sentence list answers `false`**, never the vacuous "every sentence of nothing". That is
what a caller says while a module file is in flight, or when it will not load at all, and answering
"ready" there would open the exit ritual on a module nobody has read. The same reasoning is why the
hook answers for **one module — the rung it was given**: the engine only ever asks about the current
rung, and a module whose sentences have not been loaded is a module nobody can claim is finished.

**The counters only ever count up.** There is no decrement, no reset, no undo and no ceiling: the
only arithmetic in the action is `+ 1`. A number that can fall is a rung that can close again under
a learner who did nothing wrong — and undo is not missing by oversight, because the mark commits on
Next rather than on the tap ([D11]), which is where a mis-tap is corrected. A count above two is
kept as it is: two is what the ritual asks for, not a cap on practice.

`src/state/productionCounters.test.ts` is that promise's mechanical half, in the same three parts as
`unlockPath.test.ts`: it slices every action out of `store.ts` **by name** and fails if more than one
writes `production`, then reads that one for any arithmetic that could lower a counter (`--`, `-=`,
a subtraction, a reset, a `delete`, even a careful `Math.max(0, …)` floor); it *calls* every action
the store exposes against a seeded counter — twice through, so a refusal is covered too — and fails
if any of them moves it, or moves it down; and it scans every shipped file for a counter write
outside the store. Introduce `Math.max(0, produced - 1)` in the action and thirteen tests go red.

**Routing (PRD-engineering §8 F4): only Produce got-its count.** A Review-phase mark feeds the
Leitner queue (`applyMark` — a box and a countdown) and never these counters; they are different
numbers in different places, because Review measures what is being kept and production measures what
is being built. The distinction belongs to the caller — the self-mark control is deliberately
identical in Review, Produce and Comprehension and cannot see a phase — so the session machine
(#96, below) is the one caller, and it calls `recordProduction` from its Produce branch and
`recordReview` from its Review branch. The Ladder and the module list only read what they write.

### The Leitner scheduler — due in sessions, never in days

`src/engine/leitner.ts` (#92) is the review queue's whole brain: three boxes, intervals **1 → 3 → 7
sessions** (`BOX_INTERVALS`), and no calendar anywhere in it (PRD-engineering §8 F4; Invariant 2).
An item's countdown falls by one when a session *starts* and by nothing in between, so three weeks
away costs the learner nothing — the queue is exactly where they left it.

| | |
|---|---|
| `tickSession(queue)` | one session closer to due for every item, **floored at 0** — a long absence is not a forty-item backlog |
| `dueItems(queue, max = 5)` | what Review serves: `dueInSessions <= 0`, most urgent first, capped |
| `applyMark(queue, id, gotIt)` | got it → up one box (3 is the ceiling), due in that box's interval; missed → **box 1, due 1** |
| `enrol(queue, ids)` | absent ids in at box 1 / due 1; idempotent, so a replayed pass never resets a box |

The order is PRD F4's, "strictly by due-ness then module recency": most overdue first, then the
**newest module first**, then the module's own sentence order. Recency is read **numerically** —
`'L1-M10-S01' < 'L1-M9-S01'` as text, so a raw string sort would file the module the learner just
passed behind the one before it, for the rest of the course. It is a total order over distinct ids,
which is why the same queue serves the same list whichever order it happens to be stored in (50
seeded permutations assert it).

**Enrolment policy: a sentence enters review when its module is PASSED** — production ends,
maintenance begins. Until then the sentences are the current rung's Produce work (the ≥ 2×
counters), and scheduling them for review too would be the same work twice under two names. The
call site is the exit ritual's pass action (`completeRitual`, #103), which enrols in the very write
that marks the module passed; this module states the policy and stays pure — no React, no storage,
no clock, every function returning a new array.

### The app shell — one frame, three headers, one flag

`src/shell/` is the chrome every screen renders inside (#84; PRD-design §4 [D8, D21]), and
`src/screens/` is the eight screens themselves — stubs today, each naming the ticket that builds
it. The IA is the whole route table, and the table is data (`src/shell/routes.tsx`): `App` builds
the `<Routes>` from it and `AppShell` matches the location against it, so a screen the router
knows about and the chrome does not cannot happen.

| | |
|---|---|
| `/` | Ladder (#86) — home, first run, and where an unknown route lands |
| `/module/:id` · `/sentence/:id` · `/ritual` · `/comprehension` · `/verdict` | children of the active rung: **back header** to the Ladder |
| `/practice` · `/settings` | the other two tabs: **brand header** |

**HashRouter, not BrowserRouter.** The product is a static, zero-backend, installable PWA — a
deep link under a history router needs a server rewrite and there is no server to ask.
`#/module/L1-M1` survives a refresh and an offline cold start.

**Immersion is one boolean, and it lives in a context** (`src/shell/immersive.tsx`), never in the
store: `src/state/` is the persisted document whose shape is the export contract (#82), and "a
session is on screen right now" is not something to restore into a build that is showing the
Ladder. Raising it hides the bottom nav **entirely** and puts a `--tap-min` pause ✕ top right —
always, because an immersive screen with no way out is the failure the shell exists to prevent.
The ✕ ends the session and lands on the Practice hub; so does leaving the route, so the Android
back button cannot walk out of a session and leave the nav hidden. What a session *is* — the
phases, the marks and the per-course snapshot — is the session machine (#96, below); resuming into
that snapshot is lossless resume (#99, further below), and the ✕ is one of the ways in.

**Phone-correct layout**, and the two rules that keep it that way: the app column is `100dvh`
(never `100vh` — a mobile URL bar shrinks the viewport and `100vh` does not notice) and never
scrolls; `<main>` is the one scroll area, `overflow-y: auto; overflow-x: hidden;
overscroll-behavior: contain`. Every safe area is written `max(var(--space-N),
env(safe-area-inset-*))` — a phone gets its real inset, and a desktop browser, where every inset
is 0, still gets the design's padding. `src/shell/layout.test.ts` pins both from the CSS source,
because jsdom resolves neither `env()` nor `max()`; the numbers themselves are checked in a
browser at 360px and 430px, which is the ticket's acceptance criterion.

Two rules the scaffold bakes in, before you write a component:

- **Tokens only.** `src/main.tsx` imports `design/tokens.css` *in place* — `design/`
  is read-only and re-copied wholesale, so importing it directly means token updates
  land with zero copy step. Style with `var(--*)`; no hard-coded hex, px or font names
  anywhere in `src/` (`docs/design-contract.md`) — `src/styleContract.test.ts` scans every
  stylesheet the app ships and fails naming the file and line, the same mechanical shape as
  shell purity and the clock guard.
- **One brand constant.** `src/brand.ts` exports `BRAND` — the only place the product
  name lives. Page title, manifest and export filenames all read from it.
- **Content has a contract.** `content/schema/module.schema.json` (JSON Schema draft
  2020-12) is the frozen shape of a module; `tools/validate.ts` adds the checks a schema
  cannot express (filename ↔ id, the 10-sentence / pool ≥ 6 budget and its `fixture: true`
  relaxation, full enrichment for M1–M3, rule-index ranges). Run `npm run content:validate`
  before opening any content PR — one line per file, then `CONTENT <n>/<m> ok`.
- **Content ships through a gate.** `tools/content-build.ts` runs that validator over every
  module and emits `public/content/` — see the gate table above. Never import from `content/`
  in `src/`: the app reads `public/content/` (via `fetch`), which is the only tree the gate
  has approved.

### The Ladder — the home screen, and nothing it renders is stored

`src/screens/LadderScreen.tsx` (#86; PRD-design §5, §7 [D16]) is where the engine becomes a
screen: the position line, the three-cell level strip, the rungs of the active level, the
counts-only pending line and the ownership footer. Every one of those is **derived on render** —
`deriveStatuses`, `currentRungId`, `levelSealed` off the very `progressionInput` the store guards
`passRitual` with (#83). A count on this screen and a rule in that action cannot disagree, because
they are one derivation.

Three things it is responsible for keeping true:

- **A locked rung is not a control.** No link, no button, no `tabindex` — the row is text, a
  hollow marker and a lock at 50% opacity. "The ladder is visible; the rungs are sealed"
  (PRD-design §3.2) is a DOM fact, asserted per rung in `LadderScreen.test.tsx`, not a CSS one:
  `pointer-events: none` would still leave a link for a screen reader to offer.
- **A sealed level answers honestly, in counts.** Only sealed cells are `<button>`s (the active
  cell is the screen you are on; a control with nothing to do is not one), and tapping one raises
  the shared toast (`src/shell/Toast.tsx` — the timer is the control, the region is always mounted
  so a screen reader hears the change, and #106's course-switch toast reuses both) with the sealed
  level and how many rungs below it remain.
- **Counts, never time.** No `%`, no date, no streak, no "due" — asserted over the rendered screen
  in both a fresh and a mid-journey state.
- **The one celebration is a moment, not a state.** A verdict hands the screen a one-shot flag and
  the newly opened rung plays the unlock beat once; the Ladder spends the flag as it lands, so a
  reload has nothing to replay and a revisit never carried one (#103, below).

Loading that ladder and handing it to the store is `src/screens/useProgression.ts`, which the
Ladder and the module list both start with: it fetches `levels.json`, calls `setLadder` from an
effect when it resolves — which is what gives `passRitual` a rung to check against — joins on the
real `exitAvailable` predicate (`useExitAvailable`, above: the current rung's counters against its
sentence ids, so no screen has an injection point to get it wrong with), and returns the assembled
`progressionInput` plus a `ready` flag. Screens draw nothing until that flag is up
(`aria-busy`), because an empty input would render a *finished* ladder. It is a hook rather than
a line in the Ladder because a deep link (`#/module/L1-M1`) reaches a guarded screen with the
Ladder never having mounted.

Two deliberate divergences from the prototype, both recorded in the code that makes them:

- **Course prose is 18px Mukta, not an 11.5px caption.** The prototype renders the pending line,
  the footer and the toasts in English for every course; in the product they are course copy, and
  design/tokens.md §2 is absolute — all Devanagari is Mukta, never below `--devanagari-min-size`.
  A caption token would set Hindi in Barlow, which draws no Devanagari at all. The ramp has no
  caption-sized Devanagari slot and cannot have one below the floor.
- **The position line is the screen's first row**, not part of the header: the shell's brand header
  is screen-agnostic (#84). #117 reconciles both.

### The staged rung card — one clear action, and never a gate

`src/screens/ladder/RungCard.tsx` (#87; PRD-design §6.2 [D22], PRD §8 F1) is the current rung as a
blueprint object — radius 0, a hairline, `--shadow-sm`, the four `+` registration marks — holding
the kicker, the title at `--text-rung-title`, the job, and **one CTA set, chosen by the stage**:

| `rungStage()` | primary | beside it |
|---|---|---|
| `fresh` | "Start with the module" → `/module/:id` | the note: read it once, Practice picks up from there |
| `studied` | "Practice" → `/practice` | ghost "revisit the module" → `/module/:id` |
| `exit_ready` | "Exit ritual — open" → `/ritual` | Practice and Module drop to secondary |
| `pending` | — (nothing to open) | the `pendingAuthoring` note + ghost "practice earlier rungs" |

The stage is `rungStage(input, id)` off the same `progressionInput` every other number on the
screen derives from — so it moves when the facts do: `markStudied` on first module open flips
`fresh` → `studied` (#88), and the got-it that brings every sentence of the rung to 2× flips
`studied` → `exit_ready` (#95 — read live off the counters, not injected). Nothing about the card
is stored, and it holds no state of its own.

**The stage guides; it never gates** (the invariant, PRD-design §6.2). The bottom nav's Practice
tab is untouched at every stage — asserted per stage in `LadderScreen.test.tsx` — three of the
four stages offer Practice from the card itself, and no stage locks a route. The primary is the
one **filled** object in the whole view (`--cta-height` 48px, solid accent); secondaries are
`--btn-secondary-height`, ghosts `--ghost-height` and always `white-space: nowrap`
(design/tokens.md §3, §4).

Every label is the course's (`strings.json` — the seven `rungCard.*` keys above), so the card
carries no learner-facing English of its own; `ladder/RungCard.test.tsx` renders all four stages
and fails if the prototype's wording reaches the screen. The card's title is deliberately **not**
a link any more: the primary CTA is the way into a rung, and a `pending` rung has no module to
open at all.

Two more divergences from the prototype, on top of the Ladder's:

- **The card's copy and its button labels are Mukta at the 18px floor**, not 11–12px Barlow and
  14px Barlow Condensed. Same reason as the Ladder's prose, one step further: a CTA label is
  course copy too, and hi-mr's is Devanagari. Raised with the rest for #117.
- **The two `exit_ready` secondaries are `--btn-secondary-height` (46px)**, where the prototype
  writes 44 inline; design/tokens.md §4 is the rule of record and both clear `--tap-min`.

### The module list — read the rung, and nothing else

`src/screens/ModuleScreen.tsx` (#88; PRD-design §6.4, PRD §8 F2) is a rung's ten sentences,
browsable and quiet: nothing to answer, nothing to get wrong, no control that judges anything.
Four things it owes, and each is a test:

- **A guard.** `/module/:id` is a real deep link — HashRouter, installable PWA — so any id can
  arrive. A locked rung, an id the ladder does not list, and a rung whose module this build never
  shipped all land back on the Ladder (`replace`, so the bad entry leaves no back-stack trace).
  That is the same answer the rung card gives by having no link to offer.
- **`markStudied`, once, on first open.** The `studied` flag is what flips the rung card behind it
  from "Start with the module" to "Practice" [D22], so *opening this screen* is what moves the
  Ladder. It is idempotent in the store, which is what lets an effect fire it; the test proves the
  call count is 1 across re-renders, and that reading a rung passes nothing (Invariant 1).
- **Cards that expand in place, independently.** Collapsed is the L2 `display` + its `cue` (+ the
  quiet `script` line in romanized courses); expanded adds the English `glossEn`, the word-for-word
  `literal`, the word rows as tag chips, the interference-trap note when there is one, and
  "open full" → `/sentence/:id` — 250ms, `--motion-expand`, collapsed under `prefers-reduced-motion`.
  The open set lives in the screen, not in the cards, which is why one card opening never closes
  another. `module/ProductionDots.tsx` draws each sentence's two 6px dots off
  `production[sentenceId]` (0 / 1 / ≥2), and the header's `n / 20` counts the same map — both
  **read-only** here, live off what `recordProduction` writes (#95), so a row of full dots down the
  list is the exit ritual unlocking, one sentence at a time.
- **Where the learner was.** Scroll offset *and* open cards survive a detour into Sentence Detail,
  in **`sessionStorage`** (`module/moduleView.ts`, `rung:module-view:<course>:<module>`) and never
  in the store: `src/state/` is the export contract (#82), and which cards were open is this
  visit's UI, not something the learner earned. The two are one record because an offset restored
  into a differently expanded list is not where the learner was. The shell publishes its one
  scroll area through `src/shell/scrollArea.tsx` — the screen asks the frame for it rather than
  hunting the DOM for something that scrolls.

Three divergences from the prototype, on top of the Ladder's and the card's:

- **The screen's head row is the kicker, the title and the count**, not a header: the shell owns
  the back chevron and the screen's name (#84), and the prototype's own list is its scroll area
  where here the shell's `<main>` is the app's only one. #117 reconciles both.
- **Course prose is Mukta at the 18px floor** — the helper line, the cue, the literal, the trap
  note, the "open full" label and, third recurrence, **the word chips** (design/tokens.md §6 writes
  9.5–11px). Same wall as #86 and #87: §2 forbids Devanagari below `--devanagari-min-size` and a
  caption token sets it in Barlow, which draws none. Flagged again on #117; no token invented.
- **"Open full" is `--btn-secondary-height` (46px)** where the prototype writes 42 inline, the same
  call PR #139 made for the rung card's pair.

The one place the app overrides a font shorthand's family is the quiet script line, which takes
`--font-script-fallback` (design/tokens.md §2) — so `src/styleContract.test.ts` bans a face by
*name* and allows `font-family: var(--…)`, which is the opposite of one.

### Sentence Detail — ten sections, one order, and the mnemonic last

`src/screens/SentenceScreen.tsx` (#89; PRD §8 F3 [D10], PRD-design §6.4, §7) is one sentence taken
apart. **The order is the feature**, and it is frozen:

> hero → gloss → words → rules → trap → sound → variations → mistake → usage → mnemonic

It runs from what the sentence says, to why it says it, to what will trip a Hindi speaker, and ends
on the one thing worth carrying away — the mnemonic, under the course's own "pocket it" label. A
learner who opens a second sentence finds the same shape in the same place, which is the whole
point of freezing it; every section carries a `data-section`, so the order is a **DOM assertion**
in `SentenceScreen.test.tsx` rather than the reading order of a file.

Four more things it owes:

- **A section with nothing in it renders nothing.** No heading, no empty plate, no "not available".
  Enrichment is optional in the schema past M3, so an M4+ module may ship as hero + gloss + words +
  rules and nothing else — and that is a simple sentence, not a broken screen (asserted against a
  sparse fixture). The gloss obeys the same rule since #268: `glossEn` is optional in the schema
  and required by the build only where the course's L2 is not English (`checkGlossEn`, beside the
  `scriptMode` cross-check), so a course whose L2 *is* English (hi-en) authors none — it would
  print the hero twice — and its gloss section draws the `literal` alone, or nothing. The screen
  branches on presence, never on a course id (`docs/design-contract.md`).
- **Amber exactly once.** The interference trap is the only loud object on the screen
  (design/tokens.md §7 rule 2); the mistake plate is deliberately **neutral** — `--mistake-border`
  / `--mistake-bg`, struck text — because a common mistake is information about the language, not
  a warning about the learner. The test **reads the stylesheet**: every rule carrying an
  `--interference-*` token must be a `.trap*` selector, and the mistake rules must carry neither
  that nor the self-marks' red.
- **`deconstruction.rules` are indices**, resolved through the module's own ordered `rules` array
  (PRD §7). An index the module has not got renders nothing at all and the rest of the section
  still draws: the build checks the ranges (`tools/validate.ts`), and a learner's screen is not
  where a content bug should surface.
- **Prev/next inside the module, and the back chevron to the module.** The pager is bounded by the
  module's own list (`disabled` at both ends, `--btn-secondary-height`) and navigates with
  `replace`, because paging is one screen rather than ten destinations. Where "back" goes is the
  route table's answer (`shell/routes.tsx` → `backTarget`), not the header's: Sentence Detail is
  the one child of a rung that returns to its **module**, which restores the offset and the open
  cards #88 remembered. Every sentence opens at its own top.

`screens/TagChip.tsx` is the delta-learning tag as a shared component — `free` · `delta` ·
`interference`, one token pair each, and **the name is always a text node**: a chip that said
"interference" only in amber says nothing to a screen reader, to a greyscale screenshot or to
anyone who cannot separate amber from steel. It is the one chip in the app at the design's own
size (`--text-micro`, inside §6's 9.5–11px band) because its label is English furniture and no
Devanagari can land in it. The word rows and the rules both wear it, and so does Practice's "why"
row (`src/components/WhyRow.tsx`, #94).

Divergences from the prototype, on top of the module list's:

- **The whole screen is course prose at the 18px Mukta floor** — the cue, the literal, the word
  cues and notes, the forms, the rules, the trap, the sound note, the variations, the mistake's
  why, the usage, the mnemonic and the two pager labels, where the prototype writes 11.5–14.5px.
  Fourth recurrence of #86's wall, same answer: build to §2's floor, flag it on **#117**, invent no
  token. The hero (`--text-l2-hero`) and the word rows (18px, weight 600) match the prototype
  exactly.
- **The two course-copy labels are not kickers.** `sentence.trapHead` and `sentence.pocketIt` are
  the course's words, and uppercasing + tracking a Devanagari string is not a style the design
  package has — so they render as course prose in `--color-accent-700` where the prototype writes a
  10px condensed kicker. The eight structural section labels (`WORD BY WORD`, `RULES USED` …) stay
  English furniture at `--text-kicker-sm`, in the register of the `M1 · SENTENCE 02` kicker.
- **The pager is sticky, not fixed.** The prototype pins it below its own scroll area; the app has
  exactly one scroll area, so the bar sticks to the bottom of the screen's column — same
  one-handed affordance, one scroll area. The head row (kicker + production dots) is the screen's
  first row for the same reason the module list's is (#84, #117).
- **The position reads `3 / 10`**, not the prototype's "3 of 10": counts, never a sentence the
  shell would have to own an English word for.

### The reveal card — the gate is a hidden Next, not a disabled one

`src/components/RevealCard.tsx` (#93; PRD §8 F4 [D11], PRD-design §6.3, §7) is the interaction the
whole product is built around, and it runs in one direction:

| state | on screen | screenshot |
|---|---|---|
| `cue` | the L1 cue, the course's recall nudge inside the dashed plate, the 52px reveal button | [cue](docs/images/reveal-cue-360.png) |
| `revealed` | the L2 `display` (+ the quiet `script` line in romanized courses), the "why" slot, the question, and the self-mark — **no Next** | [revealed](docs/images/reveal-revealed-360.png) · [romanized](docs/images/reveal-romanized-360.png) |
| `marked` | Next, entering over `--motion-next-appear` the moment a mark exists | [marked](docs/images/reveal-marked-360.png) |

Four things it promises, and each is a test (`RevealCard.test.tsx`, `SelfMark.test.tsx`):

- **Next is HIDDEN, not disabled** [D11]. A disabled Next is the app telling the learner what it
  is waiting for; an absent one leaves the mark as the only thing on screen to do. It is not in
  the DOM at all — the assertion is `queryByRole('button', { name: next })` **is null**, and a
  second one proves no control is sitting there `disabled` instead.
- **Nothing is preselected.** `src/components/SelfMark.tsx` takes `Mark | null` and has no
  default: the mark is the learner's honest act, and lighting a segment before they touched it
  would be the app answering for them. Unselected is transparent with inherited ink; selected
  fills `--mark-got-bg` / `--mark-miss-bg` with `--mark-fg` (design/tokens.md §6) — green and red
  exist here and in no other component, which the stylesheet test enforces selector by selector.
- **No input element anywhere in the tree**, in any of the three states (Invariant 6). The recall
  happens in the learner's head, mouth or notebook — the dashed `--border-dashed-world` plate is
  the app saying exactly that — so the design system's own segmented control (a `<label>` around a
  hidden `<input type="radio">`) could not be used: the segments are `<button aria-pressed>` in a
  `role="group"` named by the course's own question.
- **The card writes nothing** (Invariant 4). It emits `onResult({ sentenceId, gotIt })` on Next and
  the parent decides what that costs — `applyMark` for a Review mark, `recordProduction` for a
  Produce one (#95), routed by the session machine (#96). The mark commits on Next, not on the tap,
  so a learner who marks
  "missed", thinks again and marks "got it" sends one result: the one they meant. A test reads both
  source files and fails on `useAppStore`, `localStorage` or `sessionStorage`.

The card holds its state keyed by `sentenceId`, so a new sentence is a new card whatever the
parent does about keys — the one failure worth ruling out is the next cue arriving with the last
answer already revealed under it. `mode` (`review` | `produce`) picks the nudge and nothing else;
the `why` panel is a **slot**, filled by passing `<WhyPanel>` (#94, below) and drawing nothing at
all when the parent passes nothing. Comprehension (#101) shares the `SelfMark` and the gate rather
than this layout: the prototype puts its prompt in a plate and labels the reveal "model answer",
which is why `revealLabelComprehend` is still unused here.

Four divergences from the prototype, three of them the same wall:

- **The self-mark labels are Mukta at the 18px floor** (fifth recurrence of #86's type wall),
  where the prototype writes 13px Barlow — and the row that carries them is therefore **2:1**
  rather than the prototype's 1:1, because half a 360px row wraps hi-mr's "not yet" inside its own
  44px segment. Flagged with the rest on **#117**; no token invented.
- **The cue label is course prose, not a kicker.** `cueLabel` is the course's own words for its L1,
  so it renders at the floor in `--ink-45` where the prototype writes a 10px uppercase kicker — and
  the uppercasing goes with it, the same call Sentence Detail's two course-copy labels made (#89).
- **The 2px cue rule is `var(--tick-height)`**, the design package's only 2px length — the stand-in
  the level strip's bar already takes (#86).
- **The kicker row, the phase chips and the position count are not on the card.** They belong to
  the session that renders it (#96), which is also what keeps the card usable in the ritual.

`prefers-reduced-motion` collapses both movements (the 300ms reveal, the 200ms Next), asserted off
the stylesheet — and the 200ms is the entrance, not a delay: Next exists the instant the mark does.

### The "why" panel — depth on demand, and it fails silent

`src/components/WhyPanel.tsx` fills the slot the reveal card left it (#94; PRD §8 F4, §6.3;
PRD-design §7): a ghost toggle under the revealed answer that expands **in place** over
`--motion-expand` (250ms) into one `WhyRow` per resolvable span of the sentence — word, cue,
`TagChip`, note — plus the "open full" link Produce cards offer. Three pieces:

| file | what it is |
|---|---|
| `src/engine/wordIndex.ts` | pure: `resolve(surface, index)` → the `{moduleId, sentenceId, wordIdx}` that teaches it, or `null`; `resolveSentence(display, index)` → the sentence's resolvable spans |
| `src/components/WhyRow.tsx` | the shared word row — the same four parts Sentence Detail prints |
| `src/components/WhyPanel.tsx` | the toggle, the fetching, and the "open full" |

| open on a hi-mr sentence | the multi-word surface, en-es |
|---|---|
| [why-open-360.png](docs/images/why-open-360.png) — L1-M2's greeting, whose rows are taught in L1-M1 | [why-multiword-360.png](docs/images/why-multiword-360.png) — `Me llamo` as ONE row, and "open full" |

- **Longest span first.** en-es teaches `Me llamo` as ONE surface, which is what the index's
  `maxSpan` is for: `Me llamo Rohan` is two rows, never three unknown tokens. The walk itself is
  `matchSurfaces` in `surface.ts` — the emitter's own — so the build's comprehension-token rule and
  the learner's "why" agree by construction.
- **`normalizeSurface`, imported, never copied** — the one definition of "same word" (#75, #116).
  A resolver that normalised differently would be asking a different question of the same table,
  and the failure would be silent: a word with no "why" and no error anywhere.
- **An unresolvable span renders nothing at all.** No error, no placeholder, no gap: the learner is
  mid-flow, and content legitimately carries tokens no word row teaches — proper nouns (#61) and
  the deliberate wrong-language `mistake` lines the emitter never indexes. A sentence where nothing
  resolves opens to an empty panel, which `.rows:empty` draws as nothing.
- **Cross-module rows are loaded, not skipped.** The index is cumulative, so most refs on L1-M2
  name L1-M1; dropping them would empty the panel exactly where it teaches most. The panel loads
  whichever modules its refs name through the content layer's cached `loadModule`, and a module
  that will not load costs **its own rows and nothing else** — the error screen is right for a
  screen whose whole content is missing and wrong for an optional expansion mid-session.
- **Nothing is fetched until the learner asks.** The rows mount on the toggle, so a reveal that is
  never questioned costs no index file at all.

Fidelity: the rows are the 18px Mukta floor again (seventh recurrence, #117) where the prototype
writes 11.5–15px, and the prototype's 52px/40px alignment columns are dropped — there is no token
for either, and a wrapping Devanagari word needs the width more than the rows need a shared left
edge. `TagChip` keeps the design's own 9.5–11px band, because its label is English furniture.

### The session machine — three phases, two queues, and one rule about marks

`/practice` is the hub and the immersive session that runs from it (#96; PRD §8 F4, PRD-design
§6.3, flow 3): Review → Read → Produce as soft chips, ending on a counts-only summary, with the
learner's position snapshotted per course from the first card.

| file | what it is |
|---|---|
| `src/engine/session.ts` | pure: `planSession({queue, moduleSentenceIds, production})` → `{reviewIds, produceIds}` |
| `startSession` / `recordReview` / `setSession` | the store's three session actions — the count and the tick, a Leitner mark, and the position |
| `src/screens/PracticeScreen.tsx` | the hub: the rung, what the three phases will serve, one CTA |
| `src/screens/practice/Session.tsx` | the session: chips, cards, the mark routing, the snapshot |
| `src/screens/practice/PhaseChips.tsx`, `SessionSummary.tsx` | the three chips, and the four counts |

| the hub | Review | Produce | the summary |
|---|---|---|---|
| [practice-hub-360.png](docs/images/practice-hub-360.png) | [practice-review-360.png](docs/images/practice-review-360.png) | [practice-produce-360.png](docs/images/practice-produce-360.png) | [practice-summary-360.png](docs/images/practice-summary-360.png) |

- **The routing contract is the ticket** (PRD §8 F4). A **Review** mark goes to the Leitner queue
  (`recordReview` → `applyMark`) and **never** to the production counters; a **Produce** got-it goes
  to the counters (`recordProduction`) and **never** to the queue. They are different numbers
  answering different questions — what is being *kept* against what is being *built* — and crossing
  them would open a rung's exit ritual on sentences nobody produced. `RevealCard` and `SelfMark`
  cannot see a phase by design, so `Session.tsx` is the only place that knows, and
  `PracticeScreen.test.tsx` proves both directions: routing a Produce mark to `recordReview`, or a
  Review mark to `recordProduction`, turns tests red.
- **One session, counted once.** `startSession` increments `sessionCount`, ticks the queue
  (`tickSession`) and writes the opening snapshot in a single write, and it is the only action that
  does any of it. That is what lossless resume (#99) rests on: restoring a snapshot must not charge
  a learner a session for closing their tab, or bring the whole queue due twice in one day's work.
- **The plan is taken once, and the hub previews it with the same function.** `planSession` runs
  against the queue *after* the tick, so the hub's "2 due · 10 to read · 10 to produce" is the
  session that will actually be served. Review is `dueItems(queue, 5)` verbatim; Produce is **every
  sentence of the rung, least-produced first** — a learner who leaves early leaves the most-owed
  sentences done, and nothing is dropped for being finished (two is what the ritual asks for, not a
  cap on practice). The prototype filters its Produce queue to sentences under 2×; the product
  orders instead of filtering.
- **Empty review is an honest state, not an empty screen.** A course with no passed rung starts at
  Read, and tapping the Review chip toasts the course's own "nothing due yet — this is the first
  rung" rather than opening a phase with nothing in it ([practice-nothing-due-360.png](docs/images/practice-nothing-due-360.png)).
  That is a message, not a lock: **the chips never gate** — every phase is one tap away from every
  other, in any order, and no chip is ever disabled.
- **The summary is counts, and only counts** (Invariant 2): reviewed, how many of those you had,
  produced, and how many of the rung's sentences now stand at two — four templates from the course
  bundle, so the number sits where the language puts it. No duration, no percentage, no date, and a
  test scans the rendered screen for all three. The gentle elapsed tick (numberless, 2px) is #98's.
- **The snapshot is a position, per course** — `{phase, idx, queue}`, written on every advance and
  cleared at the summary — plus a flush on `visibilitychange`/`pagehide` so a page that goes away
  mid-card is not one advance stale (#99). The pause ✕ leaves it standing, and the hub offers it
  back, which is why nothing here calls `startSession` twice.
- **Read is the phase in the middle** (`practice/ReadPhase.tsx`, #97 — its own section below).
  `useModules` (the content layer's many-files loader, moved out of `WhyPanel`) fetches whatever
  modules the Review queue names — five due cards routinely come from five different rungs — and a
  module that will not load costs its own card and nothing else.

Fidelity: the chips are `--tap-min` tall in 18px Mukta where the prototype writes a 32px chip in
11px uppercase Barlow Condensed (the type wall again, #117), the summary's rows are sentences
rather than the prototype's label-and-right-aligned-number, and the prototype's "the exit ritual is
open" block is deliberately absent — that unlock is the Ladder's rung card, and offering it from two
places is how one of them ends up out of step with the rule.

### The Read phase — L2 first, and the cue only when you ask

`src/screens/practice/ReadPhase.tsx` is the session's middle phase (#97; PRD §8 F4, PRD-design
§6.3): the rung's sentences one at a time, `display` at the card size the ramp names for it, the L1
cue behind a toggle, "why" and "open full" beside it, `3 / 10` on the header row, and a pager whose
last step hands over to Produce.

| cue hidden (the default) | cue shown | the last sentence |
|---|---|---|
| [practice-read-360.png](docs/images/practice-read-360.png) | [practice-read-cue-360.png](docs/images/practice-read-cue-360.png) | [practice-read-last-360.png](docs/images/practice-read-last-360.png) |

- **The cue starts hidden** — the deliberate divergence from the prototype, which opens with the
  Hindi line showing (`readHiOn: true`). Read sits one phase before Produce and the whole sequence
  is a production bias: L2 first, recall before recognition, the L1 as what you check yourself
  against. A cue on screen by default makes the L2 line optional, which is the opposite of what the
  phase is for. Recorded for #117 rather than "fixed" back.
- **The read-aloud nudge (`nudge.read`) is shown once, at phase start** — it is an instruction for
  the phase, and a line repeated under all ten sentences stops being read by the third. The
  prototype prints it per card. It is state on the phase, not on the sentence, so re-entering Read
  by chip says it again; also #117's.
- **Read costs nothing.** No box moves, no counter moves — the phase between the two that write is
  the one that does not. All it moves is the position, which the session snapshots per course like
  every other advance, so leaving mid-read comes back to the same sentence (#99).
- **The cue toggle rides inside `WhyPanel`'s controls row** (a `leading` slot added there rather
  than a second row here), so the prototype's three ghosts share one line and the "why" rows still
  expand under all of them. The panel is keyed by the sentence and the cue is not: a new sentence
  never arrives with the last one's rows open, and a learner who asked for the cue asked for the
  phase.
- **Back is disabled on the first sentence** — the same bound Sentence Detail's pager takes (#89) —
  and that is not a gate on anything: the phase chips are still live in every direction, which is
  what "guide, never gate" is about.

Fidelity: the sentence is `--text-l2-card` (26px) where the prototype writes 28px inline — the ramp
has no 28px step and its 26px slot is named "reveal/read/comp cards", so the token wins; the
kicker reads `READ · M1` and the count `1 / 10`, because the shell owns no learner-facing word
(#88, #89); and the pager's labels are the course's (`read.*`) where the prototype writes "Back" /
"Next" / "On to producing" in English for every course. Live at 360px the Devanagari clears its
18px floor everywhere: 26px for the sentence, 18px for the cue, the nudge, the ghosts and both
pager buttons.

### The gentle elapsed tick — the only time affordance, and it has no numbers

`src/screens/practice/Tick.tsx` is the 2px hairline under the phase chips (#98; PRD §2 boundary
note, §8 F4, PRD-design §7, design/tokens.md §5): `--tick-track` under `--tick-fill`, filling once
over ~25 minutes on a 1s linear width transition, and then stopping.

| ~5 minutes in | capped, and it stays there | the setting off |
|---|---|---|
| [practice-tick-360.png](docs/images/practice-tick-360.png) | [practice-tick-full-360.png](docs/images/practice-tick-full-360.png) | [practice-tick-off-360.png](docs/images/practice-tick-off-360.png) |

- **It is ambience, not a readout.** The node holds no text in any state, is `aria-hidden`, and has
  no live region — nothing announces or displays how long has passed, how long is left, or how long
  a session should be. A bar you can *read* is a session with a target, and a target is a calendar
  with one day in it (Invariant 2). The test asserts `textContent === ''` after 13 and after 53
  simulated minutes.
- **`performance.now()`, and no date anywhere.** `src/state/clock.test.ts` fails on a date
  constructed outside `clock.ts`, and this component keeps that guard whole rather than asking for
  an exemption: it reads a **duration** off the monotonic timer — milliseconds since a moment
  inside this session — which cannot answer what day it is and does not move for a clock change, a
  timezone or a DST hop. The guard's own doc comment now carries that argument, and the scanner has
  a test proving `performance.now()` is not a violation. Neither pattern was removed.
- **Session-relative, never persisted.** The origin lives in a ref; state v6 carries no timestamp
  but `passedAt`, and the export contract is unchanged. Closing the app does not resume a
  stopwatch — the next session's bar starts empty, which is honest: the tick is about the sitting,
  not the ladder.
- **Active means a phase is on screen.** `Session` passes `!live.done`, so the summary stops it
  exactly where the prototype removes it; leaving the route unmounts it; and a backgrounded tab
  stops accruing (`visibilitychange`). A pause **banks** what it accrued rather than resetting or
  fast-forwarding it — the hour a session spent in the background was not practice, and resuming
  can never jump past the cap.
- **Off is off.** `settings.elapsedTickEnabled: false` renders nothing at all — no track, no box,
  zero layout trace — and accrues nothing behind the setting either, so switching it on mid-session
  starts an honest empty bar. **The default is ON**, per the design recommendation; [Q3]/#70 owns
  the final call.
- **Coarse on purpose:** one sample every 15s (~100 wakeups in a full session, not ~90,000), each
  landing under a 1s linear transition, so what the eye gets is drift rather than motion. Under
  `prefers-reduced-motion` the transition goes and the width stays — the fill is the whole of what
  the tick says.

Fidelity: the prototype samples every 8s and hides the tick at `phase === 'done'`; both are matched
in spirit (15s, and gone at the summary). The `1s linear` is the one value in `Tick.module.css`
that is not a token — the design package states it in prose only (tokens.md §5) and `tokens.css`
carries just `--motion-tick-cap: 25min` — so it is written once, commented, and recorded for #117.
Verified at 360px in headless Chrome inside a real hi-mr session, driving `performance.now()`
forward: 0% → 21% (5 min) → 98% (24 min) → 100% (31 min, capped), 2px tall, `rgb(231,231,234)`
under `rgb(148,188,227)`, `textContent` empty at every step, and with reduced motion emulated the
computed transition is `none` while the fill still reads 41%.

### Lossless resume — the place is kept, and the session is not re-counted

An interrupted session costs the learner the interruption and nothing else (#99; PRD §8 F4
"immersive mode + lossless resume", §8 F0 AC "resumable session exactly", §17). There is **no draft
text anywhere** in this app — no inputs at all (Invariant 6) — so the snapshot is pure position,
`{phase, idx, queue}` per course, and all an app kill can take is the place.

| file | what it is |
|---|---|
| `src/screens/practice/resume.ts` | pure: `resumePlan(snapshot, input)` → the two queues a resumed session serves |
| `src/screens/practice/ResumeBanner.tsx` | the hub's offer: where it stopped, Continue, New session |
| `src/screens/practice/Session.tsx` | the flush on `visibilitychange`/`pagehide`, and the `resume` entry point |

[practice-resume-360.png](docs/images/practice-resume-360.png) — the banner in the CTA's place.

- **The stored position is exact, not one card stale.** The snapshot is written from a passive
  effect, and a passive effect is *scheduled*: tap Next and the OS can background, freeze or
  discard the page before React runs it. `visibilitychange → hidden` and `pagehide` write the
  current position **synchronously**, off a ref a layout effect keeps in step with the commit, and
  between them they fire on every path a phone actually takes (home button, app switcher, tab
  close, bfcache). The tests clear the store behind the session's back and prove the flush puts the
  position back; deleting either listener turns them red.
- **A resume is not a session.** Continue restores the phase, the index and the queue and calls
  `startSession` *not at all* — no second `sessionCount`, no second `tickSession`. Charging a
  learner a session for closing their tab, or bringing the whole review queue due twice on one
  sitting's work, is what the single-caller contract (#96) exists to prevent, and a test walks
  start → kill → resume → finish asserting `sessionCount === 1` and one tick throughout. **New
  session** is the other button: it drops the snapshot and spends a fresh one (2, and a second
  tick).
- **The phase named by the snapshot keeps its own queue.** Review's five cards were chosen against
  a queue that has since moved — every card marked before the interruption changed a box and a
  countdown — so re-deriving that list would drop answered cards and shift the position under the
  learner. The phase it does *not* name is planned fresh, because the chips never gate and both
  must be honest the moment they are tapped.
- **The snapshot belongs to its course** (Invariant 8). The hub reads `courses[active].session`, so
  switching away and back offers *that* course's own position, untouched — which is exactly where
  the prototype resets instead (§17: do not copy). Nothing on the screen implements it; it falls
  out of state v6's keying.
- **The banner replaces the Begin CTA** rather than sitting beside it: two CTAs on one screen is
  the learner deciding which of them means "practise". The prototype makes the same call
  (`hubCta: 'Resume'`) — what it does not do is come back to the card you left. Three draft strings
  (#71): `practice.resumeLine` (`{phase}`, `{count}`, `{total}` — counts, never time), plus a label
  each for the two controls. The canonical list is 75.
- **The elapsed tick still starts fresh** on a resumed session (#98), and that is intended: the
  tick is about the sitting, not the ladder.

Verified live at 360px in headless Chrome against `npm run dev` (hi-mr): Read 3 / 10 on
"माझा देश भारत आहे" → tab hidden → snapshot `{phase: 'read', idx: 2, queue: [10 ids]}` →
**page killed** → the hub offers "पिछला session अधूरा है — पढ़ो, 10 में से 3." → Continue → the same
card, `sessionCount` still 1 → active course swapped to en-ar and rebooted (its own hub, its own
Begin, hi-mr's snapshot untouched) → swapped back → the same banner, the same card, still one
session.

### The exit ritual's arc — the app says where to go, and does nothing else

`/ritual` is the product's honesty moment (#100, #101; PRD §8 F5 [D18, D14], PRD-design §6.5 flow 5
[Q2 answered]): three steps on one screen — **write** the 11th sentence in the notebook, **check**
it yourself, **confirm** by holding a control down for ~900ms.

| file | what it is |
|---|---|
| `src/screens/RitualScreen.tsx` | the guard, the head, and the three-step arc |
| `src/screens/RitualScreen.module.css` | the rail, the numbered badges, and the one dashed plate in the app |
| `src/components/HoldToConfirm.tsx` | step 3: the press-and-hold, the ✓ state and the way on to part 2 |
| `src/components/HoldToConfirm.module.css` | the 56px control, the fill that grows from its left edge |

[ritual-arc-360.png](docs/images/ritual-arc-360.png) · [ritual-check-360.png](docs/images/ritual-check-360.png)
· [ritual-hold-360.png](docs/images/ritual-hold-360.png) ·
[ritual-hold-mid-360.png](docs/images/ritual-hold-mid-360.png) ·
[ritual-hold-signed-360.png](docs/images/ritual-hold-signed-360.png)
— the arc at 360px, the same screen scrolled to step 3, and the hold at rest, mid-fill and signed.

- **Step 2 contains zero interactive elements** — no button, no link, no copy action, no field
  [D18]. Checking is the learner's own activity, fully outside the app (Invariant 5), so a control
  here would be the app taking the job back; the plate's caption says in the course's own words
  that the missing buttons are deliberate. The test is mechanical: it queries **every** interactive
  ARIA role inside the step and asserts nothing answers, then asks the DOM the same question
  (`a[href]`, `button`, `[tabindex]`, `[contenteditable]`, …). Planting a single link reddens both.
- **The learner's sentence never enters the app** (Invariant 4) and **there are no input fields**
  (Invariant 6). There is nothing on this screen to type into, and nothing behind it to type into
  either: a source scan over the flow fails on a field, a change/paste handler, a clipboard read, a
  form — and on `useState`/`useReducer`/`useRef`, because the arc is a pure function of the
  course's strings and the rung's module and has no variable for a sentence to live in, not even
  for one render. The hold control has **one** exemption from the last of those, and it is named
  in the test rather than left implicit: `HoldToConfirm.tsx` keeps how full its bar is, and is
  scanned for everything else — no field, no handler, no storage — plus a check that the exemption
  is exactly one `useState` and no more. A number between 0 and 1 is not learner writing.
- **The guard is `exit_available`, and it is the Ladder's own predicate.** `/ritual` is a real deep
  link (HashRouter, an installable PWA), so the route is reachable with the ladder anywhere: a rung
  that is not produced out lands on `/module/:current` — where the work is — and a finished ladder
  lands on the Ladder. It reads `deriveStatuses` off `useProgression` (#95), so the card that
  offers the ritual and the route that runs it cannot disagree. Deliberately the **status** and not
  `rungStage`: a learner who produced the whole rung without ever opening its module has still
  produced the whole rung.
- **The numbers are the rung's own.** `ritual.constraint` interpolates `{sentenceCount}` (how many
  sentences this module teaches — the ones the new one may not be) and `{maxWords}` (its declared
  `complexity.maxWordsPerSentence`), and the head's ordinal is that count plus one through the
  course's own `ordinal` template. hi-mr L1-M1 renders "इन 10 में से नहीं … 5 शब्द तक" and
  "11वाँ"; a module of three sentences would say 3, 7 and "4th" with no code change.
- **The dashed plate is the one place `--border-dashed-world` is used**, and that is the token's
  reserved meaning: outside the app's solid hairline world (design/tokens.md §3). It wears no
  registration marks — they are the blueprint grammar of the app's *own* objects, and the prototype
  draws none here either. Its two rows are static text with a decorative Lucide icon each.
- **Step 3 costs ~900ms of held finger, and the cost is the feature** [D14]. `pointerdown` starts
  a linear fill from the control's left edge; `pointerup`, `pointerleave` and `pointercancel`
  before the end put it back to 0, and the next press starts from empty — half a hold is never
  banked. **The duration is a JavaScript timer, not a CSS transition**, and that is the security
  of it: `prefers-reduced-motion` collapses every animation in this product to nothing
  (design/tokens.md §5), so a fill that finished when the browser said it finished would pass a
  tap instantly under reduced motion. Here reduced motion drops the glide between the 30 steps and
  the ✓'s entrance — the hold still takes the full ~900ms, and there is no tap-through (PRD §8 F5's
  acceptance criterion), which is asserted with reduced motion reported both in jsdom and live.
- **`touch-action: none` on the control**, alone in the app: every other control sets
  `manipulation` because they are taps, and this one has to keep a drag from becoming a scroll on
  a screen that scrolls (design/pwa-checklist.md §1). One Pointer Events code path covers mouse,
  touch and pen.
- **Completion emits once and hands over.** The ✓ plate replaces the control (there is nothing
  left to press twice), the arc's step-3 badge fills, and the primary CTA goes to
  `/comprehension` — part 2 (#102). The badge fills through a `:has([data-hold='signed'])` rule
  rather than a prop, so the screen above still holds no state at all.

Verified live at 360px in headless Chrome against `npm run dev` (hi-mr), with the ten L1-M1
counters seeded to 2 through the store and **real CDP touch input** rather than synthetic clicks:
`#/ritual` opens on the arc (it redirects to `#/module/L1-M1` without them), the plate holds two
rows and no control, and the hold reads `touch-action: none`, fills to 0.43 at 450ms, returns to 0
on release, is still unsigned at 860ms, and signs at 900ms — then the same run with
`prefers-reduced-motion: reduce` emulated (fill transition 0s) passes nothing on a tap, is still
unsigned at 700ms, and signs only on the full hold. Tapping the CTA lands on `#/comprehension`.

### Comprehension — the same self-mark, and a retry that always deals fresh sentences

`/comprehension` is the ritual's second half (#102; PRD §8 F5, PRD-design §6.6 flow 6): two
sentences from the rung's pool, read for meaning, revealed against the scripted answer, self-marked
— and **any "not quite" leads to a calm retry with two NEW sentences, unlimited, with nothing
counted against the learner**.

| file | what it is |
|---|---|
| `src/screens/ComprehensionScreen.tsx` | the guard, the head's counts, the attempt, and the pass seam |
| `src/screens/comprehension/ComprehensionItem.tsx` | one item: the line, the reveal, the model answer, the gated self-mark |
| `src/screens/comprehension/RetryInterstitial.tsx` | three lines and one button, and no counter of any kind |
| `src/engine/comprehension.ts` | the draw: no repeats, exclusion until the pool exhausts, then recycling |

[comprehension-item-360.png](docs/images/comprehension-item-360.png) ·
[comprehension-revealed-360.png](docs/images/comprehension-revealed-360.png) ·
[comprehension-marked-360.png](docs/images/comprehension-marked-360.png) ·
[comprehension-retry-360.png](docs/images/comprehension-retry-360.png) ·
[comprehension-fresh-360.png](docs/images/comprehension-fresh-360.png)
— the line under test, its revealed answer, the mark that summons Next, the interstitial, and the
fresh sentence behind it, all at 360px.

- **The guard is the hold's own hand-over, and it travels in the history entry.** `#/comprehension`
  is a real deep link, so what makes it legitimate is one fact that happened a moment ago on
  another screen: the ✓'d hold's `<Link state={handover('hold')}>` writes a token into the history
  entry, and this screen reads it back (`shell/routes.tsx`). It is deliberately **not** in the
  store — nothing about an unfinished ritual is progress, and a durable "held the hold" flag would
  outlive the ritual and need cleaning up — and deliberately not on the ritual screen, which holds
  no state at all (#100) and must not start now. The token is a key, not a claim: the counters are
  still asked (`exit_available`, #95), so a stale entry — a rung passed since, or a back tap after
  #103 — lands on `/ritual`, which sends the learner on to the work. There is nothing in the
  mechanism a learner's sentence could ever be put into, which is the whole reason it was chosen.
- **The retry algorithm is `drawItems`, and the PRD's AC is arithmetic.** Fresh items are drawn
  excluding every id already used this visit; when the pool cannot fill an attempt it recycles,
  **minus the attempt just played** — dealing back the two sentences that went wrong would read as
  the app marking them. A pool of 6 (the authored floor, `POOL_MIN`) therefore supports **≥ 3 fresh
  attempts before recycling**, which is PRD §8 F5's acceptance criterion tested twice: over the
  pure function against an injected random source, and over the real screen, where three attempts
  deal six distinct sentences.
- **Nothing is stored on a failed round** (Invariant 4). The attempt lives in one component cell
  that dies with the screen; the marks are dropped on the way into the interstitial; there is no
  attempt count, no failure count and no history — absent, not hidden, so there is no number a
  screen could render even by accident. The three files are scanned for a store import, a store
  hook and a storage call, and the behavioural test asserts the persisted document is
  **byte-identical** across two failed attempts. The interstitial is asserted to say exactly the
  same thing on the third failure as on the first.
- **The controls are the product's own.** `SelfMark` verbatim (#93) — the same two segments, the
  same fills, and **Next hidden until marked** [D11] — and `WhyPanel` (#94) on the reveal, which
  resolves a pool item against its module's word index (`moduleIdOf` now reads `-C<nn>` ids as well
  as `-S<nn>`; the schema fixes both shapes). The reveal itself is this screen's own, because it
  runs the other way round: Practice reveals the L2 for an L1 cue, Comprehension reveals the L1 for
  an L2 line (`revealLabelComprehend`), and `RevealCard`'s header says why that is not a third mode
  there.
- **The pass is a seam, not a write.** Two "same meaning" marks navigate to `/verdict` carrying the
  same kind of token (`handover('comprehension')`); the module's `passed`, the next rung's unlock
  and the beat are #103's, on the screen that receives it. This one writes nothing at all.

Verified live at 360px in headless Chrome against `npm run dev` (hi-mr), with the ten L1-M1
counters seeded to 2 and **real CDP touch input**: a deep link to `#/comprehension` lands on
`#/ritual`; the full hold hands over with `history.state.usr = {"ritualStep":"hold"}`; item 1 shows
`माझी भाषा मराठी आहे` at 26px with **0 of the pool's 8 scripted answers anywhere in the DOM**, and
the reveal brings exactly 1; Next does not exist until a mark does; item 2 is a different sentence;
"not quite" opens the interstitial and the stored document is unchanged byte for byte; "नए वाक्य
लो" deals two sentences disjoint from the failed pair; and two "same meaning" marks land on
`#/verdict` with `{"ritualStep":"comprehension"}` and `modules` still `{}`.

### The verdict and the unlock beat — the ritual's one write, and the one celebration

`/verdict` is where the exit ritual ends and **the only place in the app a module passes** (#103;
PRD §8 F5, F1; PRD-design §6.7 flow 7). The arc holds no state, the hold's number dies with it,
Comprehension writes nothing on a failed round — and then this screen records everything the
ritual ever records: the rung passes, and the sentences it taught enter the review queue.

| file | what it is |
|---|---|
| `src/screens/VerdictScreen.tsx` | the guard, the receipt, the write on arrival, the way back |
| `src/state/store.ts` — `completeRitual` | pass + enrol, in one persisted document |
| `src/screens/ladder/unlockBeat.module.css` | the beat: 1000ms, accent-200 flash, 10px settle, once |
| `src/shell/routes.tsx` — `passedRung`/`justPassed` | the one-shot navigation flag |

[verdict-360.png](docs/images/verdict-360.png) ·
[unlock-beat-360.png](docs/images/unlock-beat-360.png) ·
[unlock-settled-360.png](docs/images/unlock-settled-360.png) ·
[unseal-beat-360.png](docs/images/unseal-beat-360.png)
— the receipt, the beat landing on the rung that just opened, the same card a second later, and
the level-boundary beat on the cell that unsealed plus its first rung, all at 360px.

- **One action, one write, and the asymmetry is the reason.** `completeRitual(courseId, moduleId,
  sentenceIds, clock?)` **delegates the pass to `passRitual`** — still the only writer of `modules`
  (Invariant 1) — and hands it the enrolment to carry, so both land in the same `set` and the same
  `localStorage` document. A document holding a passed module whose sentences never enrolled would
  be **unrecoverable**: `passRitual` refuses a rung that is no longer current, so those sentences
  would never come up for review again. The reverse costs nothing — `enrol` is idempotent (#92).
  `store.test.ts` counts the `setItem` calls (exactly one) and re-reads every document ever
  written, asserting none holds a pass without its enrolment; the live walk instruments
  `Storage.prototype.setItem` in the browser and asserts the same thing.
- **The pass happens on arrival, not on the button.** The comprehension is what earned it, and a
  learner who closes the app on this screen has still climbed the rung. The button's job is the
  celebration.
- **The entry is spent on arrival.** Comprehension's token (`handover('comprehension')`) is read
  once and then cleared from the history entry, because `history.state` outlives a reload — a token
  left in it would let a refresh mint a second verdict for whichever rung had become current. A
  deep link, a refresh or a back tap lands on the Ladder; a rung that was never produced out lands
  on `/ritual`, which sends the learner to the work.
- **The checklist is a receipt, not a score** — the 11th sentence written in the notebook, checked
  by you, comprehension 2 of 2 — and every line of it is the course's (`verdict.*`, five new keys
  in all three bundles, drafts on #71). The two numbers are the module's own: the ordinal is
  `sentences.length + 1` rendered through the course's `ordinal` template, and the "2 of 2" is
  `exitTest.comprehendCount`, so a module that asked for three would read "3 of 3" with no code
  change.
- **The beat plays once, and cannot be replayed.** "Climb to the ladder" carries a one-shot flag
  naming the rung just passed; the Ladder reads it on mount, plays the beat on the rung that pass
  **opened**, and immediately replaces its own entry with a stateless one. So a reload has nothing
  to replay, and a revisit — a new entry — never carried a flag at all. At a level boundary
  (10 of 10 passed, the seal rule) the beat also lands on the level cell that unsealed and on its
  first rung, which is [Q4]'s recommendation implemented pending #68's spec.
- **`--motion-unlock` is the whole movement**: 1000ms, `cubic-bezier(.2,.7,.3,1)`, an accent-200
  flash and a `--space-3` settle, `animation-fill-mode: backwards` so the card and the cell each
  return to their own ground — and `animation: none` under `prefers-reduced-motion`, where what is
  left is what the Ladder would have shown anyway: the rung, open.
- **Level status stays derived** (F1). Nothing about the unseal is stored: `levelSealed` reads the
  passed set, the beat reads a navigation flag, and both are gone the moment the learner looks away.

Verified live at 360px in headless Chrome against `npm run dev` (hi-mr), with the ten L1-M1
counters seeded and **real CDP touch input**: the ~900ms hold hands over, two "same meaning" marks
land on `#/verdict` with the token already spent, the receipt reads `11वाँ वाक्य …`,
`Comprehension 2 में से 2 …` and the honesty line from the real bundle, storage shows
`L1-M1 passed` with **all ten sentences enrolled at box 1 due in 1**, and of the five documents
written across the whole walk **zero** hold a pass without its enrolment. "सीढ़ी पर चढ़ो" lands on
the Ladder with the beat on M2's card (`1s cubic-bezier(0.2, 0.7, 0.3, 1)`), the flag already
consumed; leaving and coming back shows **0** beats. Seeded at 10 of 10, the beat is on the LEVEL 2
cell **and** L2-M1; at 9 of 10 the strip is untouched; under `prefers-reduced-motion` both collapse
to `animation-name: none`.

### The fonts — bundled, because offline is the product

Mukta (all Devanagari), Barlow (body/UI) and Barlow Condensed (headings, kickers, wordmark) are
self-hosted via `@fontsource`, imported one line per weight in `src/main.tsx` (#85, [D15]). The
prototype pulls Mukta off Google Fonts; a PWA that works on a plane cannot
(`design/pwa-checklist.md` §2). `vite.config.ts` strips the `.woff` fallback @fontsource writes
beside each `.woff2`, so `dist/` carries woff2 only — the service worker precaches all of it.

**`src/fonts.test.ts` is the guard.** A weight the ramp asks for and the bundle lacks is not an
error: the browser synthesises the face and nobody is told. So the test reads the `--text-*`
shorthands out of `design/tokens.css`, derives every (family, weight) the product renders, and
fails naming any that `main.tsx` does not import. That is how Barlow Condensed **700** got
bundled — `--text-brand` is the wordmark and it is 700.

**`#/dev/type`** is the font specimen: the Devanagari matrix at 18/22/26/32px × 400–700, the
romanization diacritics, the kickers. It is **development only** — `src/dev/typeRoute.tsx`
imports it dynamically inside an `import.meta.env.DEV` branch, so no chunk, no CSS and no
Devanagari reaches `dist/` — and it is the single entry in `shellPurity.test.ts`'s allowlist.

Findings, screenshots, the shipped byte count and the one real gap — the romanization's `ā ī ū ḥ
ṣ ḍ ṭ ẓ ʾ ʿ` are outside Mukta's `unicode-range` and fall through to the system face, now that
en-ar ships (#202) — are in [`docs/04-font-notes.md`](docs/04-font-notes.md) §4/§4.1.

### The PWA — precache the shell, cache the active course

The app installs a service worker that puts everything the learner needs on the device and then
never touches the network again (#90, `design/pwa-checklist.md` §3). `tools/pwa.ts` holds the
whole configuration — `vite.config.ts` hands it the base and the content revision — and it is
split in two (#211):

- **Precached, at install: the shell.** `**/*.{html,css,js}`, `**/*.woff2` minus the course
  script subsets, `content/courses.json`, `icons/*.png`. **17 files / 451 KiB** with hi-mr, en-es
  and en-ar all shipping L1-M1..M10.
- **Runtime, cache-first, warmed when a course is opened: that course.** `content/<id>/**.json`
  and the course's own script subsets — 26 files for hi-mr, 23 for en-es, 24 for en-ar.
  `src/pwa/offlineCourse.ts` fetches them the moment a course resolves (which is also the
  course-switch path), so the ladder is browsable offline from the first online visit.

It used to precache the entire build — 90 files — which was defensible with one course and became
a Spanish learner's phone storing hi-mr's Devanagari with three. `tools/payload-budget.ts`'s
`precacheAudit()` now reads the URL list out of the emitted `dist/sw.js` and requires it to equal
the budget's `shell` row file for file, so every `scripts/verify.sh` ends with
`BUDGET precache 17 files 207.3 KiB gzip = shell ok`.

Both runtime routes are **`CacheFirst`** and there is deliberately no `NetworkFirst` and no
`StaleWhileRevalidate` anywhere: zero network after first load is the product (PRD-engineering §3,
§10), so after the warm the active course costs nothing on the wire, and a *shell* request the
precache cannot answer is still a bug in the app rather than a case for a fallback. Freshness is
the cache **name**'s job — it carries a hash of the emitted content tree, so new content means a
new cache and unchanged content re-downloads nothing. `registerType: 'autoUpdate'`: a new build's
worker skips waiting, claims the page and reloads it — this product never asks a learner to think
about versions — and `cleanupOutdatedCaches` deletes the previous build's precache on activate
(the course caches are not precaches and survive it, which is the point).

- **The manifest is the checklist.** `design/pwa-checklist.md` §3.1 prints the exact JSON, and
  `tools/pwa.test.ts` **parses that block out of the checklist** and deep-equals it against what
  the build ships. The name comes from `src/brand.ts`, both colours and `<meta name="theme-color">`
  from `design/tokens.css` `--color-bg` (`tools/tokens.ts`) — a manifest cannot drift from the
  app's own paper ground.
- **The icons are the header mark, read not redrawn.** `tools/make-icons.ts` reads
  `src/shell/RailsMark.tsx`, lifts its five shapes, resolves `currentColor` and the accent token
  out of `design/tokens.css`, and rasterises 192 / 512 / maskable-512 / apple-touch-180 /
  favicon-32 onto the paper ground (`npm run icons:build`; PNGs committed). The maskable safe
  zone is asserted as arithmetic, not eyeballed.
- **`npm run dev` is untouched** — `devOptions.enabled: false`, so no worker is generated or
  served in development and HMR is never fighting a cache. The worker exists in `build` and
  `preview` only.
- **Storage durability:** `src/state/durableStorage.ts` asks `navigator.storage.persist()` once,
  *after* the first write, and logs the answer. There is nothing else to do with a "no" — F7's
  manual export is the real backup — but a log is the explanation on the day a ladder is evicted.

The airplane-mode gate (§3.6) was run headlessly with the origin server killed: a cold start
walked Ladder → Module → Sentence Detail with **57 requests, 57 served by the worker, 0 from the
network, 0 failed**. Screenshots, the byte tables, Chrome's installability verdict and the list
of what still needs a physical device are in [`docs/05-pwa-notes.md`](docs/05-pwa-notes.md).

## Deployment

**Live: [`https://rishabh7g.github.io/rung/`](https://rishabh7g.github.io/rung/)** — GitHub Pages,
served straight from this repo (#91). It exists so the app can be **installed once** from an HTTPS
URL; after that it runs entirely from the service worker's precache and never needs the origin
again.

- **How it deploys:** every push to `main` runs `.github/workflows/deploy.yml` — `npm ci` →
  `VITE_BASE=/rung/ npm run build` → `upload-pages-artifact` → `deploy-pages`. Pages' source is
  **GitHub Actions** (no `gh-pages` branch, nothing committed). CI runs beside it as the gate;
  the deploy workflow publishes and does not re-verify.
- **How to redeploy:** Actions → **Deploy** → *Run workflow* (`workflow_dispatch`). Same commit,
  fresh artifact — no empty commit needed.
- **The sub-path is a build input, not a constant.** A project site serves from `/rung/`, so
  `vite.config.ts` reads `base: process.env.VITE_BASE ?? '/'` and everything downstream follows it:
  the content fetches through `import.meta.env.BASE_URL`, `index.html`'s hrefs through Vite's own
  rewrite, and the manifest `id`/`start_url`/icons plus the worker's registration scope through
  `tools/pwa.ts`. Default is `/`, so `npm run dev` and `npm run preview` are unchanged. HashRouter
  keeps every route in the fragment, so there is no 404-rewrite to configure.
- **The live site ships hi-mr L1-M1..M10, and nothing that has not been reviewed.** The deploy
  builds strict content; until 2026-08-13 that was an empty ladder and the honest "no course
  content" boot screen, because no module had cleared the gate. The ten L1 modules now carry
  `verified: true` on the owner's explicit authority, signed `verifiedBy` as an LLM review — the
  native-speaker gate (#64, #110, #111) remains unmet and open. Deploying **dev** content to make
  the demo look fuller would still be lying to the one person this is for.

## How work happens

- Every change is a **GitHub issue**; one PR per issue; PR title references the
  issue; **squash-merge**; `main` is always deployable.
- Issues live in milestones **P0–P5** (+ **Design follow-ups**, Rishabh). Labels:
  one `epic:*` + `type:*` + `phase:*` per issue (see design/github-issues-checklist.md).
- **Picking your next ticket:** open issues in the lowest unfinished milestone
  → no assignee → every issue linked under "Depends on" is closed → assign
  yourself, branch, go.
- The **7 product invariants** (identical in both PRDs, §2) are contractual.
  Politely reject scope creep: no audio, no runtime AI, no backend, no
  gamification, no calendar framing.

## Quick facts

- Stack: Vite + React + TypeScript PWA; all state in `localStorage`; content is
  static, native-speaker-verified JSON. Details and rationale: `docs/01-plan.md`.
- The app only ever gives deterministic, pre-authored feedback (Invariant 4).
  Novel sentences are verified by humans via a designed copy-paste hand-off.
