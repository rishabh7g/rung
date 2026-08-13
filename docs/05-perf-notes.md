# Perf notes — font subsetting per course, the payload budget, the first-load pass (#113, #114)

Created by #113, per PRD-engineering §10 [D15] ("subset per course at build time") and
design/pwa-checklist.md §2. Starting point: docs/04-font-notes.md §5, which measured the unsubset
bundle and named the cuts. #114 (first load ≤ 2s) extends the budget table this ticket introduced.

**Verdict in one line:** the learner build's font payload went from **823,736 bytes (804.4 KiB,
30 files)** to **101,480 bytes (99.1 KiB, 9 files)** — under the ≤ 150 KiB budget, enforced on
every `scripts/verify.sh` run by `tools/payload-budget.ts` — and `/dev/type` renders the full
matrix in the subset faces with zero tofu at the 18px floor.

> **2026-08-13.** The 99.1 KiB figure was measured against a learner build that shipped **no
> modules**, so the Devanagari subsets were near-empty. hi-mr L1-M1…M10 now ship and the same
> build measures **361.2 KiB (9 files)**; §4 records the tripwire firing and the rebalanced
> limits. The subsetting itself is unchanged — this is content arriving, not a regression.
>
> **2026-08-13, later (#207).** The ≤ 150 KiB `fonts` budget and the ≤ 580 KiB `total` budget are
> **gone**, and with them the idea that the payload is the sum of the catalogue. §4 is rewritten
> around what one learner on one course downloads: a `shell` row, a `course:<id>` row each, a
> `precache:<id>` row each, and a `first-paint` row that meters the 2 s gate the old `total` was
> never actually measuring.

---

## 1. Before / after

Before, per face, as #85 measured it (docs/04-font-notes.md §5 — 30 woff2 in `dist/`, every
@fontsource subset of every imported weight):

| face                          | weights         |   bytes |
| ----------------------------- | --------------- | ------: |
| Mukta (dev + latin + ext)     | 400·500·600·700 | 557,588 |
| Barlow (latin + ext + viet)   | 400·500·600     | 133,780 |
| Barlow Cond (latin+ext+viet)  | 500·600·700     | 132,368 |
| **total**                     |                 | **823,736** |

After, per file, a strict learner build (`npx vite build` after the strict `content:build`):

| file                                  |   bytes | where it comes from                        |
| ------------------------------------- | ------: | ------------------------------------------ |
| barlow-latin-400-normal               |  22,196 | @fontsource, whole `latin` subset          |
| barlow-condensed-latin-600-normal     |  22,308 | @fontsource, whole `latin` subset          |
| barlow-condensed-latin-700-normal     |  22,444 | @fontsource, whole `latin` subset          |
| mukta-devanagari-400 / 600 / 700      | 4,220 / 4,288 / 4,124 | `tools/font-subset.ts`, per course |
| mukta-latin-400 / 600 / 700           | 7,108 / 7,268 / 7,524 | `tools/font-subset.ts`, per course |
| **total (9 files)**                   | **101,480** | `BUDGET fonts 99.1 KiB ≤ 150.0 KiB ok` |

The service worker precache lists exactly these nine woff2 and nothing else — no `.woff`, no
`latin-ext`, no `vietnamese` anywhere in `dist/` (#90; the precache globs are unchanged, the
files behind them shrank).

## 2. The cuts, and who authorised each

1. **Weights trimmed to the ramp** — the `--text-*` shorthands in design/tokens.css render
   exactly Mukta 400/600/700, Barlow 400, Barlow Condensed 600/700. Mukta 500, Barlow 500/600
   and Barlow Condensed 500 were bundled headroom nothing rendered; `src/fonts.test.ts` now
   fails on unused faces in either direction (missing AND surplus), so headroom cannot creep
   back silently.
2. **Whole-family imports replaced by subset files** — `main.tsx` imports
   `@fontsource/<pkg>/latin-<weight>.css` instead of `<weight>.css`, which kills every
   `vietnamese` subset (nothing in this product is Vietnamese) and every `latin-ext` in the
   production graph.
3. **latin-ext is dev-only** — the romanization diacritics (ī ā ū) belong to the en-ar fixture
   course and `/dev/type`, and fixtures only ship in dev builds — so `main.tsx` pulls the three
   `latin-ext` files via dynamic import inside an `import.meta.env.DEV` branch (the
   `typeRoute.tsx` pattern; never in a production graph). The PRD's other named marks (ʾ U+02BE,
   ʿ U+02BF, ḥ U+1E25) have **no glyph in Barlow at all** — that gap and its three options are
   docs/04-font-notes.md §4, and the decision stays with the en-ar course ticket. Subsetting
   changes nothing about it.
4. **Mukta glyph-subset per course at build time** — `tools/font-subset.ts` (HarfBuzz via
   `subset-font`), chained after `content:build` in `predev`, `prebuild` and `verify.sh`. It
   harvests every JSON string value the content build emitted per course, unions the per-course
   repertoires, and subsets each shipped weight of each script file. Baselines that always ride:
   danda/double danda, both digit sets, ZW(N)J, and ASCII digits+punctuation in the latin file —
   the Ladder's `3वाँ` digit comes from Mukta latin (docs/04-font-notes.md §5's caveat). Dev
   builds also fold in the `/dev/type` specimen repertoire, read from `TypeSpecimen.tsx`'s
   source, so the matrix page and the subset can never disagree in the one build kind that has
   the page. Barlow/Barlow Condensed are **not** glyph-subset: they render open-ended shell
   English, which is not knowable from content — their whole `latin` files (~22 KiB each) are the
   price of never showing a fallback glyph in UI chrome.

## 3. `/dev/type` post-subset

![The specimen matrix rendering in the subset faces](images/dev-type-post-subset.png)

Verified on a machine with **zero** system Devanagari fonts (`fc-list :lang=mr` → 0, same as
#85's run), so every Devanagari glyph on screen is the subset Mukta by elimination: at 18px
(the `--devanagari-min-size` floor) through 32px × 400/600/700, all 14 specimens render — ळ, the
conjuncts क्या/त्या/विद्यार्थी/कृपया, the reph र्क, संगीत, the candrabindu माझं/आवडतं — which is also the
proof that HarfBuzz's GSUB closure kept the conjunct and matra forms the subset text implies.
Diacritics state, unchanged from #85: ī ā ū render in Barlow (dev builds; latin-ext), ʾ ʿ ḥ fall
back to a system face because Barlow has no such glyphs (§2.3 above).

## 4. The budget: per course, not per catalogue (#207, 2026-08-13)

`tools/payload-budget.ts` gates every full `verify.sh` run right after BUILD: one line per row
(`BUDGET course:hi-mr 340.3 KiB gzip ≤ 360.0 KiB ok — 26 files`), exit 60 with the files
heaviest-first when blown.

### 4.1 Why the old rows were retired

The rows #113/#114 shipped — `fonts` (every woff2) and `total` (all of `dist/`) — summed the
**catalogue**. Nobody downloads the catalogue. A Spanish learner never fetches hi-mr's ~262 KiB of
Devanagari; a Hindi learner never fetches a byte of Spanish. So the number grew every time a course
was added, for a cost no learner pays, and the only remedy the old §4 left was _raise the limit
again_ — which is not a budget. By the time en-es L1 was authored (#192–#194) the dev build read
**634.8 KiB gzip against a 580 KiB row**, and #195/#202 (graduating en-es and en-ar out of
`fixture: true`) were blocked on arithmetic about courses their learners never load.

Worse, `total` was not measuring what its comment claimed. §5's Lighthouse network log shows a
first paint fetching the document, the bundle, the CSS and **two Barlow faces — zero font files of
any course script**, because `unicode-range` routes them away from a boot route that renders shell
English. `total` was never metering first load; it was metering the service-worker precache, which
finishes in the background long after the learner is reading. One number was standing in for two
different questions.

### 4.2 The model

Every file in `dist/` has exactly **one owner** (`attribute()` in `tools/payload-budget.ts`):

- **`shell`** — what every course pays for: `index.html`, the JS, the CSS, the Barlow UI faces,
  `manifest.webmanifest`, `icons/*.png`, `content/courses.json`, and the course faces' `latin`
  subsets (`mukta-latin-*`) — those are subset over the **union** of every shipped course, so they
  are genuinely shared and are counted once here rather than three times across the courses.
- **`course:<id>`** — `content/<id>/**` plus the font subsets that course's scripts need: Mukta
  Devanagari is hi-mr's, #197's Noto Naskh Arabic is en-ar's. The script↔language mapping is a
  data table (`SCRIPT_BY_LANGUAGE_TAG`) keyed by BCP-47 tag, never by course id (Invariant 1).
- **`splash`** — the iOS startup set, never precached and never fetched by the app (#115).

The rows are unions of owners, so **adding a course cannot move another course's row** —
`tools/payload-budget.test.ts` proves it by adding a throwaway course to a fake `dist/` and
asserting every other row is byte-identical.

Two of the rows answer the two questions `total` conflated:

- **`first-paint`** — the shell bytes fetched before the app paints (course faces excluded, per the
  §5 network log). This is what PRD-engineering §10's "first load ≤ 2 s on mid-range Android"
  is actually about, and it is course-independent because the boot route is the course picker.
- **`precache:<id>`** — `shell` + the one course, i.e. what that learner's device downloads and
  keeps so that "100% works with no network after first load" holds. It is the sum of two gated
  rows by construction, and it is printed because it is the number the learner actually pays.

**The per-course number is the better proxy for §10** for one reason: it is the only one a real
device ever transfers. The old `total` charged every learner for every language in the product, so
it went red for reasons no learner could feel, and stayed green through changes they would have —
a shell regression hidden inside a big catalogue number. `js` (#114's ≤ 200 KiB gzip) is
**unchanged**: it is shell by definition, it is the row PRD-engineering §10 names by number, and
it did not move (94.9 KiB).

### 4.3 The numbers, and where the limits came from

Measured on a `--with-fixtures` dev build carrying all three courses (hi-mr L1×10, en-es L1×10,
en-ar L1×1) — the biggest build the repo can produce today. Limits are measured + ~5%, rounded to
a round number, the same rule the 380/580 rebalance used: every row stays a tripwire, not a
ceiling.

| row              | measure | measured |   limit | headroom |
| ---------------- | ------- | -------: | ------: | -------: |
| `first-paint`    | gzip    | 173.7 KiB | 185 KiB |  11.3 KiB |
| `js`             | gzip    |  94.9 KiB | 200 KiB | 105.1 KiB |
| `shell`          | gzip    | 216.0 KiB | 230 KiB |  14.0 KiB |
| `course:hi-mr`   | gzip    | 340.3 KiB | 360 KiB |  19.7 KiB |
| `course:en-es`   | gzip    |  71.3 KiB | 360 KiB | 288.7 KiB |
| `course:en-ar`   | gzip    |   7.0 KiB | 360 KiB | 353.0 KiB |
| `precache:hi-mr` | gzip    | 556.4 KiB | 590 KiB |  33.6 KiB |
| `precache:en-es` | gzip    | 287.3 KiB | 590 KiB | 302.7 KiB |
| `precache:en-ar` | gzip    | 223.0 KiB | 590 KiB | 367.0 KiB |
| `splash`         | raw     |  70.3 KiB | 100 KiB |  29.7 KiB |
| `unmetered`      | files   |  0 files  | 0 files |         — |

The strict learner build (hi-mr and en-es; only the en-ar fixture held back, since #195) reads
`first-paint` 173.1, `js` 94.7, `shell` 214.2, `course:hi-mr` 337.9, `course:en-es` 71.3,
`precache:hi-mr` 552.0 and `precache:en-es` 285.4 KiB gzip — the same rows, smaller, which is why
the limits are set from the dev build.

### 4.4 What graduating a course actually cost (#195, en-es)

The first test of the model: en-es dropped `fixture: true` and joined the learner build. Strict
build, before → after:

| row              | before | after | Δ |
| ---------------- | -----: | ----: | -: |
| `first-paint`    | 172.5 KiB | 173.1 KiB | **+0.6** |
| `js`             |  94.2 KiB |  94.7 KiB | **+0.5** |
| `shell`          | 210.4 KiB | 214.2 KiB | **+3.8** |
| `course:hi-mr`   | 337.9 KiB | 337.9 KiB | **0.0** |
| `precache:hi-mr` | 548.3 KiB | 552.0 KiB | **+3.7** |
| `course:en-es`   | — | 71.3 KiB | new row |
| `precache:en-es` | — | 285.4 KiB | new row |

**`course:hi-mr` did not move by a single byte** — which is the whole point of §4.2's attribution,
measured rather than asserted, on the row with the least headroom in the product (19.7 KiB in the
dev build). What a Hindi learner does pay is `shell` **+3.8 KiB**, and the reason is real and
shared: `tools/font-subset.ts` cuts Mukta's `latin` faces over the **union** of shipped courses
(§4.2), so Spanish's accented glyphs land in the subset everyone downloads. Spanish L2 text renders
in `--font-devanagari` (Mukta) like every L2 line, and Latin-1 accents are all the language needs —
no `latin-ext`, no new face, no second script. `first-paint` and `js` move only because
`courses.json` grew a row and the bundle a course.

A third course written in Latin costs about the same again; one in a new script costs its own
`course:` row instead, which is the arrangement §4.2 was built for.

**One ceiling for every course** (360 KiB), not a table of per-course numbers: a limit keyed by
course id would be logic about a course, and every course is entitled to the same room. It is
hi-mr's measured payload + ~5%, i.e. "one course may cost a learner about what the heaviest course
costs today". `precache` is `shell` + `course`, so it goes red exactly when one of its halves does.

`first-paint` at 173.7 KiB gzip is ~1.0 s of Slow 4G (~180 KiB/s effective) against a measured TTI
of 1.5–1.8 s (§5) — the 2 s gate has real room, and `first-paint` is the row that will notice if
that stops being true. `precache:hi-mr` at 556.4 KiB is ~3.1 s to finish the offline copy, in the
background, after the learner is already reading.

**Nothing ships unmetered.** The `unmetered` row fails on the first file no owner claims — a new
asset class (an `.mp3`, a `.wasm`, a second content root) must be given a budget deliberately
rather than riding along inside a bigger row. It is a file-count gate, so a 0-byte newcomer trips
it too.

### 4.5 When a row goes red — in this order

1. **Read which row it is.** `course:<id>` — only that course's learners pay, and the fix belongs
   in that course's bytes. `shell` — every learner in every course pays, so it is worth several
   times the effort. `first-paint` — that is the 2 s gate itself; stop and fix it before shipping.
   `unmetered` — a new asset class arrived; give it an owner in `attribute()` and a row.
2. **Cut the bytes where they are charged.** For a course's fonts: drop a weight for that script
   (needs design sign-off — `src/fonts.test.ts` goes red if the `--text-*` ramp still asks for it),
   or subset to the shipped word index rather than all authored strings. For the shell: split a
   route out of the bundle, or drop a UI face.
3. **Move bytes off the critical path** (helps `first-paint`, not the precache): a face only course
   text renders must stay `unicode-range`-routed and `font-display: swap`, never preloaded — §5.2
   measured that a Mukta preload is strictly negative.
4. **Load on demand instead of precaching** (helps `precache:<id>`): the standing lever for
   Devanagari is fetching the hero 700 weight first and the other two lazily, which trades a
   moment of fallback text for ~175 KiB of precache.
5. **Fix the attribution — only if it is wrong.** A file charged to `shell` that exactly one course
   reads belongs to that course, and vice versa. This needs a comment and a test, and it is not a
   way to make a number smaller.
6. **Raise a limit — last, and only for a cost a learner actually pays.** Say here what got bigger,
   what it buys, and what it costs in Slow-4G seconds. This is no longer the standing escape hatch
   it was under `total`: the catalogue no longer inflates any row, so a red row now means one
   course, or the shell, genuinely got heavier — a regression, not arithmetic.

### 4.6 Known gap: the precache is not scoped per course yet

`tools/pwa.ts`'s `PRECACHE_GLOBS` still take `content/**/*.json` and `**/*.woff2`, so the service
worker precaches **every** course's JSON and **every** font subset on first visit. Until that is
scoped to the active course, `precache:<id>` is what a learner *should* pay, not what today's
device actually pulls in the background — the honest figure for a Spanish learner's device today is
the whole strict build, **616.1 KiB gzip across 66 files** (#195 made that number two real courses
rather than one course plus held-back fixtures). `first-paint`, `shell` and `course:<id>` are exact as measured: they
describe what the browser fetches on the wire, which `unicode-range` and the per-screen content
loader already scope correctly. Scoping the precache is **#211**, filed by this ticket and
deliberately out of its scope.

A second, smaller gap in the same direction: `tools/font-subset.ts` unions the repertoires of every
shipped course into one set of subset files per script, so if two Devanagari courses ever ship,
each will carry the other's glyphs and both `course:` rows will charge for the union. Today exactly
one course reads each script, so the numbers above are exact; `attribute()` charges a shared subset
to every course that reads its script, which keeps the arithmetic honest when that changes.

## 5. First load ≤ 2 s on mid-range Android (#114)

**Verdict in one line:** the deployed build passes the PRD §10 gate as it stands — Lighthouse
mobile perf **98–100**, TTI **1.5–1.8 s** on the throttled profile — so this pass shipped **no
app-code changes** (the issue's own rule: measurement-driven fixes only) and instead locked the
result in as two new budget rows, `js` and `total` (§6). (#207 later replaced `total` with
`first-paint` + `precache:<id>`, on the strength of the network log below: `total` was metering the
precache, not the paint. `js` is unchanged.)

### 5.1 Baseline — and, with no fixes needed, also the "after"

Three Lighthouse 12 runs (headless Chromium, this repo's Playwright cache) against the deployed
URL `https://rishabh7g.github.io/rung/`, Lighthouse's default mobile profile — the issue's target
device class: mid-range-Android CPU (4× slowdown), simulated Slow 4G (RTT 150 ms, 1.6 Mbps),
412×823 viewport:

| run | perf score | FCP     | LCP     | TTI     | TBT  | CLS    |
| --- | ---------: | ------: | ------: | ------: | ---: | -----: |
| 1   |         99 | 1.63 s  | 1.78 s  | 1.78 s  | 0 ms | 0.001  |
| 2   |        100 | 1.38 s  | 1.53 s  | 1.53 s  | 0 ms | 0.002  |
| 3   |         98 | 1.73 s  | 1.73 s  | 1.73 s  | 0 ms | 0.000  |

Acceptance asks ≥ 90 and ≤ 2 s: worst run is 98 and 1.78 s. Zero blocking time — the bundle
parses inside the paint budget even at 4× CPU.

What the first paint actually transfers (run 1's network log, gzip on the wire):

| resource                         | transfer | note                                          |
| -------------------------------- | -------: | --------------------------------------------- |
| index.html                       |  1.3 KiB |                                               |
| assets/index-\*.js               | 85.6 KiB | the whole app — react-dom is 129 KiB raw of it |
| assets/index-\*.css              |  8.9 KiB |                                               |
| workbox-window                   |  2.3 KiB | SW registration shim                          |
| barlow latin-400 + cond-700      | 44.1 KiB | the only fonts the first screen needs         |
| manifest + courses.json + icons  |  2.3 KiB | courses.json is 20 bytes (native gate #64)    |

### 5.2 The audit, point by point

- **`font-display: swap`** — verified on all six Mukta faces (`src/fonts/mukta.css`) and every
  @fontsource face; text paints in the fallback and swaps, never blocks.
- **Preload the primary Mukta weight — measured, and declined.** The first screen is shell
  English: `unicode-range` routing means the browser fetches **zero Mukta files** before first
  paint (the network log above shows exactly two Barlow files). A preload would ADD Mukta bytes
  to the critical path of a paint that renders no Devanagari — strictly negative at today's
  numbers. Revisit only if a Devanagari-first screen ever becomes the boot route.
- **No double-bundling** — one-off `vite build --sourcemap` + `source-map-explorer` (not
  committed, per the issue): react-dom 129.0 KiB, app 89.6 KiB, react-router 37.5 KiB, react
  8.3 KiB, scheduler 3.9 KiB, lucide-react 3.7 KiB (tree-shaken from ~30 MB), zustand 2.5 KiB —
  raw, one copy of each, sums to the 275.7 KiB bundle.
- **SW registration not blocking first paint** — `registerServiceWorker()` runs in the module
  body, but `registerSW` only queues an async `navigator.serviceWorker.register`; TBT 0 ms is
  the receipt. `immediate: true` stays: precaching must start on the first visit, the only
  networked moment the product has.
- **Content JSON lazy** — `courses.json` (20 bytes) is the only pre-paint fetch;
  `levels/modules/words` load per screen through `src/course/content.ts`'s promise cache.
- **No speculative code-splitting** — JS is 92.9 KiB gzip against the issue's 200 KB ceiling and
  TTI is 1.5–1.8 s; the numbers do not demand a second chunk, so there isn't one.
- **Installability + offline unchanged** — this pass touched `tools/`, tests and docs only; the
  built artefact (bundle, sw.js, 20-entry precache) is byte-identical to the one the §3.6 gate
  walked in docs/05-pwa-notes.md §4, so that evidence stands.

### 5.3 Reproducing the measurement

```bash
CHROME_PATH=~/.cache/ms-playwright/chromium-1232/chrome-linux/chrome \
  npx -y lighthouse@12 https://rishabh7g.github.io/rung/ \
  --only-categories=performance \
  --chrome-flags="--headless=new --no-sandbox --disable-gpu" \
  --output=json --output-path=./lh.json --quiet
```

## 6. The budget rows, and what each one is for

`tools/payload-budget.ts` prints one line per row on every full `scripts/verify.sh`. The rows and
their limits are §4.3; this is what each one _means_:

| id               | meters                                                    | measure | limit                     |
| ---------------- | --------------------------------------------------------- | ------- | ------------------------: |
| `first-paint`    | the shell bytes fetched before paint (no course faces)      | gzip    |                   185 KiB |
| `js`             | every `.js` (bundle + workbox + sw) — #114's number         | gzip    |                   200 KiB |
| `shell`          | everything every course pays for                            | gzip    |                   230 KiB |
| `course:<id>`    | one course's content + the subsets its scripts need         | gzip    |         360 KiB, per course |
| `precache:<id>`  | `shell` + that one course — the learner's offline copy      | gzip    |                   590 KiB |
| `splash`         | `icons/splash/` (#115's iOS startup set)                    | raw     |                   100 KiB |
| `unmetered`      | files no owner claims — a new asset class must be budgeted  | files   |                   0 files |

`gzip` meters transfer (GitHub Pages serves text assets gzip; `gzipSync` at the default level is
the approximation), `raw` meters disk — right for woff2 and PNG, which are already compressed.

The `splash` carve-out is #115's and predates the per-course model: the iOS startup set is **not**
precached and never fetched by the app (Safari pulls the single matching image at
Add-to-Home-Screen, `docs/05-pwa-notes.md` §11), so counting eleven images against any learner's
payload would be metering bytes no visit transfers.

**History.** #113 shipped `fonts` (raw woff2, ≤ 150 KiB) and #114 added `js` and `total` (all of
`dist/` bar the splash set, ≤ 400 KiB). hi-mr L1-M1…M10 shipping on 2026-08-13 (owner-authorised
LLM review — #110/#111) added ~260 KiB of Devanagari and sent both red; the limits were rebalanced
to 380/580 KiB, and en-es L1 (#192–#194) blew the 580 anyway at 634.8 KiB. #207 retired `fonts` and
`total` for the per-course rows above (§4) — not because the limits were wrong, but because summing
the catalogue measures a payload no learner has ever downloaded.

**#197 added a fourth face and did not move a limit.** Noto Naskh Arabic, subset per course the
same way Mukta is, costs the strict build **2,348 raw bytes** — the shell marks only, because
en-ar is a fixture course the learner gate excludes. A learner on hi-mr downloads **none** of it
(`unicode-range` never matches) and precaches all of it; an Arabic learner downloads 7,544 bytes
for the four-sentence L1-M1 fixture. This is exactly what the per-course rows are for: the Naskh
subset lands in `course:en-ar`, not in a catalogue-wide `fonts` row that would bill every learner
for it. Full accounting, including how it scales with #199-#201: docs/04-font-notes.md §8.4.

## 7. Reproducing

```bash
npm run content:build && npm run fonts:build   # strict content, then the subsets from it
npx vite build && npm run budget               # BUDGET first-paint … | shell … | course:hi-mr … ok
bash scripts/verify.sh                         # TYPES ok | … | FONTS ok | BUILD ok | BUDGET ok
find dist -name '*.woff2' -printf '%s %p\n'    # the nine files of §1
npm run dev                                    # http://localhost:5173/#/dev/type — §3's matrix

# §4.3's three-course table: the dev build the limits were set from
npm run content:build -- --with-unverified --with-fixtures && npm run fonts:build
npx vite build && npm run budget               # one line per course
```
