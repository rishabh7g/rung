# rung

A ladder of checkpoints for learning a language — not a timeline. First pair:
**Hindi (L1) → Marathi (L2)**. A fully offline, installable, mobile-first PWA:
no backend, no accounts, no audio, no runtime AI. Built by one person, for one
friend.

*rung* (formerly *Shidi*, शिडी — Marathi for "ladder") names the core metaphor: a
fixed sequence of 10 modules ("rungs"), each climbed by working it: one Practice
session over the rung's ten sentences, and the rung above opens on the last card.

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

The gate before every merge to `main` (docs/01-plan.md §8). Run it from anywhere; it finds the repo
root itself:

```bash
scripts/verify.sh          # everything
scripts/verify.sh --fast   # everything except BUILD and BUDGET
```

A green run says exactly one thing, and exits 0 — the TEST segment carrying that run's own
passed/total count, so `n/n` below is the shape rather than a sample:

```
TYPES ok | LINT ok | TEST n/n ok | CONTENT ok | FONTS ok | BUILD ok | BUDGET ok
```

| Step | Exit | Command |
|---|---|---|
| TYPES | 10 | `npm run typecheck` |
| LINT | 20 | `npm run lint`, then `npx prettier --check .` — **either one failing is exit 20** |
| TEST | 30 | `npm run test`; the segment carries vitest's own count |
| CONTENT | 40 | `npm run content:build` — schema validation, word index and the strings check in one |
| FONTS | 45 | `npm run fonts:build` — the per-course subsets (#113); skips like CONTENT |
| BUILD | 50 | `npx vite build`; omitted entirely with `--fast` |
| BUDGET | 60 | `npm run budget` — the payload report and its audits over `dist/`; omitted with `--fast` |

Steps run in that order and the **first failure stops the run**, so a red run names exactly one
thing: `FAIL <STEP> (exit <code>)`, the last 20 lines of that step's log, and the path to the
whole log. Nothing else is printed — no progress chatter to scroll past, on either colour.

```
FAIL TYPES (exit 10)

src/App.tsx(9,9): error TS2322: Type 'number' is not assignable to type 'string'.

log: /Users/rrish/Documents/code/rung/.verify/types.log
```

Every step writes `.verify/<step>.log` (gitignored), and **the directory is wiped at the start of
every run** — so a missing log is proof that step never ran: the failure above leaves `types.log`
and nothing else.

Two things worth knowing before you read a result:

- **BUILD is `vite build`, not `npm run build`.** The npm script's `prebuild` would re-run tsc and
  `content:build`, so a content failure would resurface as `FAIL BUILD` long after CONTENT passed.
  The harness runs each thing once, under its own name.
- **CONTENT judges the exit code, never the output.** A strict build that correctly drops every
  module of a course (see the gate table below) still exits 0 — that is `CONTENT ok`, not an
  empty-output failure.

The harness has its own tests (`scripts/verify.test.ts`): they run it in a tmp dir against fake
`npm`/`npx` shims, because a test that really shelled out to `npm run test` would run vitest inside
vitest.

**This is the gate.** Run `bash scripts/verify.sh` locally before merging to `main`; there is no
CI job. There is deliberately no separate lint/test/build pipeline to keep in sync. When a run is
red, each step's full log is in `.verify/<step>.log`.

### What TEST actually runs — sixteen files, and the suite that was cut

**The suite was cut in half on 2026-08-30, in two commits, and the sections below say so wherever
they used to lean on a file that went.** `02a45dd` (#362–#365) removed the render-level suite —
every `*.test.tsx` that mounted a screen or a component — and `5365eaa` (#370) cut what remained to
three files. Both were deliberate. Neither touched the prose here, so until #497 this README named
twenty test files that had been deleted; every one of them existed once, and none was invented.
#503 finished the sweep everywhere else — `docs/`, `index.html` and the headers under `tools/` and
`scripts/` — under one rule: **a deleted test may be named only where the same paragraph says it
was deleted.** Cited as a live gate it is a lie; cited as history, marked, it is the record.

**The same prose then drifted the other way, and #606 caught it.** The sweep left an accurate list
of eleven, and four files were added afterwards without it — `tools/author-kit.test.ts` (#480–#487),
`tools/font-coverage.test.ts` (#375, #382), `tools/generate-prompt.test.ts` (#424, #471) and
`src/pwa/offlineCourse.test.ts` — so a count that had been corrected for naming dead tests went
wrong again by omitting live ones. The rule that fixes both is the same one: this list is what
`vite.config.ts`'s `test.include` actually matches, checked against the tree, not remembered.
Sixteen files run today:

| File | What it proves |
|---|---|
| `scripts/generate-splash.test.ts` | the splash wordmark is drawn from outlines and the committed set is byte-for-byte what this machine regenerates (#502) |
| `scripts/verify.test.ts` | the harness's own step order, summary line, failure block and exit codes, in a tmp dir against fake `npm`/`npx` |
| `src/course/types.test.ts` | every module and ladder in `content/` walked key by key against `types.ts`, plus the `FORCED_DUPLICATES` ownership map |
| `src/engine/leitner.test.ts` | the review scheduler's boxes, intervals and per-session picks |
| `src/pwa/offlineCourse.test.ts` | the scoped warm's two rules as tables — what the device does **not** download, and what an eviction deletes |
| `src/state/store.test.ts` | the persisted document: migrations, the persisted slice, and what the progression engine is fed |
| `tools/author-kit.test.ts` | that `content:kit` stays small — the brief, the bounds and one worked sentence, and nothing else (#480–#487) |
| `tools/content-build.test.ts` | the fixture-course seam: a course that is a manifest row and a ladder, with no `modules/` at all (#606) — and, with en-sa (#611) and en-la (#637) both graduated out of it, that the catalogue holds no fixture row, that strict and dev ship the identical eleven courses, and that the gate still drops a fixture course on a synthetic tree |
| `tools/course-briefs.test.ts` | the briefs against the ladders they mirror, and the decisions en-ko's and en-sa's settle (#109, #376, #607) |
| `tools/css-classes.test.ts` | the flat CSS namespace (#496) — see below |
| `tools/delta-index.test.ts` | `fold(deltas) === the cumulative index`, exactly, for every shipped module (#424) |
| `tools/font-coverage.test.ts` | every character the content build harvested is drawn by some cut this repo ships, read from the cmaps — **skips whole unless `public/content/` and `src/fonts/generated/` both exist**, so it proves nothing until CONTENT and FONTS have run (#375, #382) |
| `tools/generate-prompt.test.ts` | the prompt's vocabulary section against the delta indexes — that it folds rather than listing one module's delta (#424, #471) |
| `tools/module-ids.test.ts` | the five-level id grammar in all four places that spell it |
| `tools/register.test.ts` | the sentence-register enum stayed closed when `formal` widened it (#422) |
| `tools/shown-surfaces.test.ts` | the shown-but-untaught count per course may fall, never rise (#491) |

**`tools/css-classes.test.ts` is the only test in the repo that looks at styling at all**, and it
runs in the TEST stage like the rest. It reads the shipped stylesheets back and fails on three
things: a class name defined in two files, an `@keyframes` name defined in two files, and a
surviving `*.module.css` or a component importing a styles object from a stylesheet. Its first case
injects a duplicate `.ladder-head` and requires it to be found, so a clean result from it means
something. It does **not** check tokens, spacing, font faces, or anything a screen renders. The
files that once did were deleted by the two commits above and have not been replaced; where a
section below states one of those rules, it states a rule the repo follows, not one it enforces.

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
rejects a verified module that carries no signature. **Since 2026-09-07 an authoring wave
ships `verified: true` by default**, in the same change as its review doc: the LLM review is
the review, it runs on the owner's standing authority, and `verifiedBy` says so in words. The
old two-step — author `false`, flip later — recorded nothing the signature does not, and left
correct content out of a learner build for no gain. On **2026-08-13** hi-mr
L1-M1..M10 were flipped to `verified: true` on the repo owner's explicit authority,
backed by an **LLM linguistic review** (`docs/07-llm-review-L1-M1-M5.md`,
`docs/07-llm-review-L1-M6-M10.md`, and the third pass that re-reviewed all ten blind,
`docs/08-marathi-third-review.md`), so `npm run build` now ships the full L1 ladder.
**The native-speaker gate is a separate, stricter bar and is still unmet.** The three
issues that tracked it (#64, #110, #111) were closed by the owner on 2026-08-13, so the
**22 open questions in `docs/08-marathi-third-review.md`** — which supersede the two
earlier lists — plus the **8 added by `docs/15-llm-review-hi-mr-surfaces.md`** (30 in
all) are the only remaining record of what a native reviewer still owes.

**hi-mr climbs to two levels (#425, #434, #443, 2026-09-07) — the first content above L1 in any
course.** All ten L2 rungs — `L2-M1`…`L2-M10`, _Conversations_ — are authored against the briefs
of #295 (`docs/26-hi-mr-L2-brief-decisions.md`) and carry `verified: true` on the same standing
authority as L1, backed by `docs/49-llm-review-hi-mr-L2.md`; a strict `npm run build` now emits
`hi-mr: 20 modules (L1-M1..M10, L2-M1..M10)` and the cumulative index runs 222 → 441 surfaces.
The level proves the whole chain on a second rung: the id grammar of #417, the prompt CLI crossing
the level boundary, the M1–M3 enrichment law reading the module number rather than the level, and
`prerequisites` staying inside the level while the seal rule carries the cross-level dependency.
`register: "formal"` (#422) carries the तुम्ही tier the L1 briefs had to smuggle into `usage`.
What L2 teaches: the imperative pair and the -इए tier Marathi does not have (M1), तो/ती/ते and
the genitive (M2), the full agreement grid (M3), the glued -ला and -ने (M4), the hosting and
refusal scripts (M5), the -ऊ या suggestion frame (M6), the spoken continuous बोलतोय (M7),
सापडणे against मिळणे and the -त नाही frame (M8), -पेक्षा and की/किंवा (M9), and the ergative
त्याने/तिने/त्यांनी that L1-M5 fenced off, in four-sentence accounts (M10). **The native gate is
still unmet**: docs/49 ends in open questions 49–70, which now stand beside the L1 chain's own.

**All nine courses reach three levels (#471–#487, #544–#558, 2026-09-08) — 270 modules, and the
ladder is level with itself for the first time since en-es started.** The eight courses behind
hi-mr each authored `L3-M1`…`L3-M10`, _Fluency_, against their own briefs (#462–#469, decisions in
`docs/69`–`docs/76`) in three waves — M1–M2, M3–M5, M6–M10 — run as eight or nine parallel
worktrees, one per course, each owning only `content/<course>/modules/`. Every module ships
`verified: true` with its signature and its review section in the same change
(`docs/77`–`docs/84`). A strict `npm run build` emits **30 modules on every course**, and all nine
shown-surface baselines held: hi-mr 7, en-es 10, en-ar 6, hi-en 30, en-ru 20, en-it 17, en-fr 20,
en-de 11, en-ko 12 — none raised.

Three things the waves found that were nobody's charter:

- **A key two rows of ONE module both open.** First occurrence wins, so the second row's note is
  unreachable — a learner tapping the word is shown the other one. en-de hit it on `Antworten`,
  the plural of `die Antwort`, which folds to exactly the infinitive `antworten`, and only en-de's
  one-owner assertion caught it. `tools/check-shown.ts` now checks it for all nine and distinguishes
  the defect (two notes on one key) from the deliberate repeat (one note, both rows). Sweeping the
  shipped content with it found two in en-es L3-M1 and **31 in hi-mr L3**.
- **Seven of nine courses were hiding finished content.** `hasContent: false` was left behind on
  hi-mr's whole L2 *and* L3, on en-es's L2, and on four more courses' L2 — twenty modules on the
  flagship. The flag now follows the file, and a level whose ten modules all exist has its draft
  flag cleared.
- **A brief is wrong about the index more often than not.** Every wave's review doc carries a seam
  section: `yemú`/`yey` had no owner in en-ru at all, `s'il` was already inside en-fr's
  `s'il te plaît` with a note that taught the elision, `be` had no owner anywhere in hi-en, and
  en-ko's `joji anayo` is not how 좋지 is said. The emitted index wins over the brief, always, and
  the correction is recorded rather than absorbed.

**All nine courses reach five levels (#490–#597, 2026-09-08) — 450 modules, and the ladder rung
count is what PRD §5 says it is.** L4 _Nuance_ and L5 _Voice_ were briefed (#500–#508 and
#563–#571, decisions in `docs/85`–`docs/93` and `docs/103`–`docs/111`) and authored
(`docs/94`–`docs/102`, `docs/112`–`docs/120`) in three waves each — M1–M2, M3–M5, M6–M10 — nine
courses in parallel per wave, each agent owning `content/<course>/modules/` and its own review doc
and nothing else. A strict `npm run build` emits **50 modules on every course**, cumulative indexes
closing at hi-mr 1005, en-es 1225, en-ar 1473, hi-en 1352, en-ru 1145, en-it 1661, en-fr 1313,
en-de 1170, en-ko 1384 surfaces. All nine shown-surface baselines held again — hi-mr 7, en-es 10,
en-ar 6, hi-en 30, en-ru 20, en-it 17, en-fr 20, en-de 11, en-ko 12 — across 180 new modules; not
one was raised. Every `levels.json` draft flag and all 221 module-level `draft` placeholders are
gone, because a placeholder row means a module nobody has authored and none is left.

What the last two levels changed about the process:

- **Worktrees were the wrong isolation.** `isolation: worktree` branches from `main`, not from the
  working branch, so every L3 agent read a checkout one wave stale and four review docs were
  rewritten rather than appended. L4 and L5 ran nine agents in the shared checkout on disjoint
  path ownership, forbidden from anything that writes `public/content/`; the parent builds once
  before a wave and once after. No doc was lost after the switch, and the append is now checked
  with `git diff --numstat` before every commit.
- **The index question has two answers and they are different questions.** `npm run content:owner`
  (new here, `tools/index-owner.ts`) folds the emitted delta index and sees only what has been
  built; `npm run content:shown` folds the on-disk modules of the level being written and sees
  unbuilt siblings. Six agents hand-rolled the same fold in one afternoon before the tool existed,
  and the first hand-rolled draft folded 24 surfaces instead of 785 because `readdirSync` sorts
  `L1-M10.json` before `L1-M2.json`.
- **A paradigm row must have a hole wherever a lower level owns that cell.** Found in en-it, where
  `avrei` can carry its whole paradigm and `sarei` cannot, because `sarebbe` is L3-M4's. A full
  paradigm over an owned cell makes the row unreachable — the same first-occurrence-wins defect the
  L3 waves found, arriving through the front door.
- **The collision defect was swept out of L1 and L2, not just kept out of L4 and L5.** The rule
  `tools/check-shown.ts` learned at L3 was pointed at the shipped foundation: 421 `forms` entries
  across 47 files mechanically, then 24 same-display collisions across 16 files by judgement. Two
  of those merges made a note truer than either row had been — hi-mr L1-M1's आवडते, and en-ko
  L1-M5's `bap`, whose row claimed the noun is bare while its own S09 says `bap-eul`.
- **A font decision was reversed on evidence.** `docs/34` §8 called en-ko's unrendered `script`
  line an honest defect; `@fontsource/noto-sans-kr` does ship the Korean cut, so 529 KiB of source
  subsets to 20,492 bytes for 294 syllables and the line renders. `tools/font-coverage.test.ts`
  (new) reads the cmap of every generated cut and fails on a harvested, target-claimed character no
  bundled file draws — it found en-fr's `sœur`, U+0153 claimed by a `latin-ext` target while living
  in the `latin` file.

**The native-speaker gate is still unmet, and it is now the only thing between this ladder and a
learner who should trust it.** Every one of the eighteen L4/L5 review docs ends in numbered open
questions for it, and no authoring wave may close one by rewriting a shipped module.


**hi-mr reaches three levels (#452, #461, #470, #479, 2026-09-07) — the first L3 anywhere.** All
ten L3 rungs — `L3-M1`…`L3-M10`, _Fluency_ — are authored against the briefs of #452
(`docs/50-hi-mr-L3-brief-decisions.md`, the first level in this repo planned against a verified
level above L1) and carry `verified: true` on the same standing authority, backed by
`docs/51-llm-review-hi-mr-L3.md`. A strict `npm run build` emits
`hi-mr: 30 modules (L1-M1..M10, L2-M1..M10, L3-M1..M10)`, and the cumulative index runs
441 → 633 surfaces. What L3 teaches: the -ऊन converb that lets a day be told at length (M1), the
genitive as a system where L2-M2 taught one frame (M2), मला वाटतं and की (M3), जर … तर with one
counterfactual frame (M4), reported speech on म्हणणे against L2-M10's सांगितलं (M5), the three
feeling-verbs (M6), दुखणे with the body part as its subject (M7), भरणे's three jobs (M8), आहे
against असते (M9), and in M10 nothing new at all — **+1 surface for the whole module**, which is
what "written unaided" is supposed to look like. The passive stays out of L3 by decision; L1-M9's
`बोललो` stays the pinned index miss it has been since docs/15. **The native gate is still unmet**:
docs/51 ends in open questions 71–96.

**en-es climbs to two levels (#435, #444, #453, 2026-09-08) — the first L2 outside hi-mr.** All ten
L2 rungs — `L2-M1`…`L2-M10`, _Conversations_ — are authored against the briefs of #426
(`docs/53-en-es-L2-brief-decisions.md`) and carry `verified: true` on the same standing authority,
backed by `docs/61-llm-review-en-es-L2.md`; a strict `npm run build` emits
`en-es: 20 modules (L1-M1..M10, L2-M1..M10)` and the cumulative index runs 228 → 477 surfaces. M1
teaches the FRAME rather than the pronoun — the level's register decision, and the correction the
briefs record, since L1-M2 had already taught `usted` on a row of its own — with `¿Me da…?` beside
`¿Me das…?` and `¿Puede…?` beside `¿Puedes…?`, chipped `formal` and `informal` (#422); M2 teaches
`tener` for features and the `es listo` / `está listo` pair that is the honest sequel to L1-M2's
split. Authoring moved one key an unexecuted brief had misassigned — the bare clitic `me` is M1's,
not M5's, because `¿Me da…?` is M1's own first pattern — and both brief notes were corrected in the
same commit. The **shown-surface ratchet (#491) caught two waves of variation-only surfaces**
before either shipped, `por` among them, which `docs/53` keeps unowned across the whole level; the
en-es baseline stays at 10. **The native gate is still unmet**: docs/61 ends in open questions 1–19,
a fresh en-es L2 chain. What L2 teaches: the request frames and the stem change L1 shipped twice
without naming (M1), `tener` for features and the `es listo` / `está listo` pair (M2), the
agreement grid with the `bueno` ruling paid in full — the row is authored on `buenas` with no
masculine singular, because that key is L1-M10's discourse "well, …" (M3), `hay` against `está`
and the polite imperative as a recipe from the I-form, with L3's subjunctive named as the system
it belongs to (M4), `para` for a recipient and nothing else, with bare `por` appearing nowhere in
the level (M5), the `nosotros` cell that doubles as a suggestion (M6), the gerund and `te llamo` —
the payoff of L1-M1's decision to index `Me llamo` whole (M7), `doler` built exactly like
`gustar`, which is where `gustar` stops being a quirk and becomes a class (M8), the comparatives
that cost no new function word (M9), and in M10 four-sentence accounts whose last item opens no
new word at all. **The shown-surface ratchet (#491) held the line for the whole level**: ten
modules, 249 new surfaces, and the en-es baseline still at 10 — every variation that reached for
an untaught word was rewritten rather than baselined, and most of them were reaching for another
cell of a verb the module already taught.

**en-ar climbs to two levels (#436, #445, #454, 2026-09-08).** All ten L2 rungs —
`L2-M1`…`L2-M10`, _Conversations_ — are authored against the briefs of #427
(`docs/54-en-ar-L2-brief-decisions.md`) and carry `verified: true` on the standing authority,
backed by `docs/62-llm-review-en-ar-L2.md`; a strict `npm run build` emits
`en-ar: 20 modules (L1-M1..M10, L2-M1..M10)`. M1 makes the imperative productive (`tashrab` →
`ishrab`, `taʾkul` → `kul`) and buys politeness with words rather than with a verb form Arabic does
not have; M2 opens `huwa`/`hiya`, which L1 never needed because a verb prefix carried the person,
and gives `ʿind-` its rule — a PREPOSITION meaning "at", which is why it takes suffixes rather than
conjugating. **Authoring found something the briefs did not**: `samaḥta` and `samaḥti` are one
spelling in unvowelled Arabic and two in the romanization, so this course's two lines carry
different amounts of information — the romanized line names the addressee and the quiet line does
not. That is now a rule of the module, and no other course in this repo can teach it. M3 states the three agreement laws and gives each its own
sentence — including one that separates the shape of a plural from the humanity of its noun, which
is what makes the law usable rather than merely odd — and M4 finally explains the `bi-` the learner
has been saying inside `bi-khayr` since L1-M2. A second finding is recorded in docs/62 as a
discipline rather than a rule: **an `al-`'d form is its own index key**, so every en-ar word row
lists both shapes, and the ratchet caught seven surfaces in one module before it became a habit.
M10 teaches the law L1 could dodge with pronoun
subjects: a verb before its subject stays SINGULAR (`dhahaba al-awlād`) and agrees in gender only,
with `dhahabat ummī` showing that the position rule suspends the plural alone. The ratchet did a
second job here — it surfaced a brief violation of the level's own `lam` ban in M10's first draft,
and both sentences were rewritten rather than the ban relaxed. **The native gate is still unmet**:
docs/62 ends in open questions 1–20, a fresh en-ar L2 chain.

**hi-en starts its second level (#437, 2026-09-08).** `L2-M1` _Asking politely_ and `L2-M2`
_Describing people_ are authored against the briefs of #428
(`docs/55-hi-en-L2-brief-decisions.md`), backed by `docs/63-llm-review-hi-en-L2.md`; a strict
`npm run build` emits `hi-en: 12 modules (L1-M1..M10, L2-M1..M2)`. M1 is one sentence said five
ways — `Give me the book` up to `Would you mind waiting?` — because English politeness comes from
turning a request into a question and making it longer, and the verb never changes; `kindly` and
`do the needful` are named as ordinary Indian English and not written. M2 teaches the ABSENCE a
Hindi speaker feels first (adjectives never agree) and says plainly where **English is poorer**:
`cousin` covers eight Hindi words, `uncle` four, and `brother` carries no age. The possessive `'s`
opens here, which lifts an L1 ban on the record — and `src/course/types.test.ts`'s check, written
when no L1 job needed one, is now scoped to the level that made it. **The native gate is still
unmet**: docs/63 ends in open questions 1–6, a fresh hi-en L2 chain.

**hi-en reaches the middle of L2 (#446, 2026-09-08).** `L2-M3` _Describing things_, `L2-M4`
_Getting around_ and `L2-M5` _Food and hosting_ ship against the same briefs; a strict
`npm run build` emits `hi-en: 15 modules (L1-M1..M10, L2-M1..M5)`. The wave's spine is the
countable/uncountable split, which has **no counterpart in Hindi at all**: M3 states it once (an
uncountable noun names a kind rather than units, so `some`, `a lot of` and a counter — never `a`,
never `-s`), and M5 re-opens it in the field, where `Two teas, please` looks like the exception and
is not. `much` and `many` are taught as they are used rather than as they are explained: they live
in questions and negatives, and a positive statement takes `a lot of`. M5 is M1's politeness law
paying off — `Would you like…?` and `I'd like…` are one `would` in two seats, and the refusal
delta runs in **both directions**, because a ritual first refusal does not survive translation and
neither does a host's duty to insist. Two brief seams were corrected against the rebuilt index
(`brown` is already L2-M2's, and `bread` is M3's rather than M5's), and `bus` and `train` were
opened as rows the briefs omit but the transport contrast — `get on` a bus, `get in` a car —
cannot be shown without. The ratchet was clean on all three at first build, the first hi-en wave
to need no content fix after the check. **The native gate is still unmet**: docs/63 now ends in
open questions 1–14.

**hi-en's second level closes (#455, 2026-09-08).** `L2-M6` _Making plans together_ through
`L2-M10` _Telling what happened_ complete the ladder; `content/hi-en/levels.json` drops the L2
draft flag and a strict `npm run build` emits `hi-en: 20 modules (L1-M1..M10, L2-M1..M10)`. M6
spends its budget on the time-preposition fork Hindi's single postposition has no shape for — `at`
a clock time, `on` a day, `in` a part of the day, and then `at night`, taught as the exception it
is. M7 teaches tag questions as things **built rather than memorised**: the auxiliary is always
already in the sentence, and `isn't it?` as a universal tag is named in usage as ordinary Indian
English, never written into a display and never called wrong. M8 opens the present perfect and
nothing else, narrowly, on the present-result use, and kills the slogan that produces
`*I've lost it yesterday` — the form is about now, which is why a finished time cannot sit in it;
its register half states the level's sharpest law, that in English the more serious the complaint
the softer the frame. M9 changes the adjective, which Hindi never does, and guards `than` against
`then` — L1-M10's key, and one slip would have sent every comparison in the course to a note about
sequence. M10 opens nothing at all. Comparative shapes went into the `forms` of their own rows
where the level could still edit them (M2's `tall`, M3's `big`, `small`, `cheap`, `heavy`) and got
rows of their own where L1 owns the adjective (`happier`, `busier`) — the additions-only law
working exactly as written. Six rows the briefs omit were opened where a module could not do its
job without them, `bad` among them: L1-M2 owns only the whole surface `not bad`, whose meaning is
"all right", so the bare adjective had never been taught. One ratchet finding across five modules
(`with`), fixed in content. **The native gate is still unmet**: docs/63 ends in open questions
1–25, a fresh hi-en L2 chain.

**en-ru starts its second level (#438, 2026-09-08).** `L2-M1` _Asking politely_ and `L2-M2`
_Describing people_ are authored against the briefs of #429
(`docs/56-en-ru-L2-brief-decisions.md`), backed by `docs/64-llm-review-en-ru-L2.md`; a strict
`npm run build` emits `en-ru: 12 modules (L1-M1..M10, L2-M1..M2)`. M1's grammar is the **aspect of
an imperative** — L1 shipped the pairs and never taught the choice — with `skazhíte` and
`govoríte` on separate rows, as the L1 aspect-partner policy requires and as this module's own
lesson needs. Two other things land there: Russian's **subjectless sentence** (`Mne núzhno
rabótat'`, `Mózhno vódu?`), named once so M3 and M8 do not meet it as fresh idioms; and the polite
**negative question**, which is softer in Russian and reads as doubt or complaint to an English
ear. M2 opens the long adjective with all four nominative cells in one row's `forms`, and states
the split L1 left implicit: `ustál` was a short-form adjective all along, and the short form is not
a shortening of the long one. `mat'` and `doch'` are taught as words rather than as examples,
because they are the only two feminine nouns of their shape in the course. One seam correction:
`u nevó` and `u neyó` ride as whole two-token surfaces, because bare `u` is taught nowhere — L1-M8
authored `u menyá` and `u vas` the same way, and matching it is both the fix and the better
teaching. **The native gate is still unmet**: docs/64 ends in open questions 1–10, a fresh en-ru L2
chain.

**en-ru reaches the middle of L2 (#447, 2026-09-08).** `L2-M3` _Describing things_, `L2-M4`
_Getting around_ and `L2-M5` _Food and hosting_ ship against the same briefs; a strict
`npm run build` emits `en-ru: 15 modules (L1-M1..M10, L2-M1..M5)`. M3 makes Russian's central
difficulty visible and frames it honestly as **bookkeeping rather than a new idea** — the adjective
agrees in gender, number and case, and the whole paradigm lives in one row's `forms`. The genitive
arrives doing three jobs at once (absence, amount, "of") and pays a debt L1 left open: `pyat'
rubléy` and `pyat' chasóv` were genitive plurals all along, said for two levels without a reason.
M4 gives that case a fourth job (`do`) and adds the contrast that carries the module — `v` and `na`
take the accusative for motion and the prepositional for location — plus the split English never
makes, `idtí` on foot against `yékhat'` by vehicle, with no neutral verb to fall back on. M5 spends
M1's aspect decision: a host is always imperfective, and M4's perfective `povernite` sits two rungs
earlier so the level shows the same speaker choosing both. Because L2 never edits an L1 file, every
new shape of an L1 noun is **a row of its own pointing back** (`vodý`, `cháya`, `sákhara`,
`khléba`, `magazína`, `rabótu`). One wave-1 correction travelled with this wave: M1's `bol'shóye`
row had taken the whole paradigm and was trimmed to the single neuter cell it teaches, so M3 owns
the adjective. Four ratchet findings, all fixed in content; the en-ru baseline stays at 20. **The
native gate is still unmet**: docs/64 now ends in open questions 1–20.

**en-ru's second level closes (#456, 2026-09-08).** `L2-M6` _Making plans together_ through
`L2-M10` _Telling what happened_ complete the ladder; `content/en-ru/levels.json` drops the L2 draft
flag and a strict `npm run build` emits `en-ru: 20 modules (L1-M1..M10, L2-M1..M10)`. M6 finally
opens **`ty`**, held back through all of L1 on the argument that guessing wrong with a stranger is
rude while guessing wrong with a friend is merely stiff — and it names the thing English has no
equivalent for: the move from `vy` to `ty` is negotiated out loud, not drifted into. M7 turns M3's
genitive of absence on a person (`Yevó net dóma`) and makes its register a rule about **not
knowing** rather than about politeness — `vy` throughout, because you do not know who picked up. M8
carries the level's best rule: in `Mne núzhen bilét` the thing NEEDED is the subject and `núzhen`
agrees with it, which with `U menyá bolít golová` and L1-M8's `u menyá yest'` makes three
constructions on one habit — the person is never the subject of their own need, having or pain; and
the complaint delta runs the **opposite way from English**, because a hedged Russian complaint reads
as evasive. M9 spends M3's case a fifth time on "than", and shows `deshyóvyy` losing its yó in
`deshévle` — not an exception to the yó rule but the rule itself. M10 teaches aspect at length and
kills the slogan: `Ya dva chasá chitál` is bounded and imperfective, `Ya prochitál za dva chasá` is
perfective, and the reading took the same two hours; the diagnostic is one the learner already owns,
that the perfective has no present. Fifteen ratchet findings across the wave, all fixed in content —
two of them plain spelling slips (`brata` for `bráta`, `ona` for `oná`) that the acute catches
precisely because an unmarked vowel is a different index key. The en-ru baseline stays at 20. **The
native gate is still unmet**: docs/64 ends in open questions 1–32, a fresh en-ru L2 chain.

**en-it starts its second level (#439, 2026-09-08).** `L2-M1` _Asking politely_ and `L2-M2`
_Describing people_ are authored against the briefs of #430
(`docs/57-en-it-L2-brief-decisions.md`), backed by `docs/65-llm-review-en-it-L2.md`; a strict
`npm run build` emits `en-it: 12 modules (L1-M1..M10, L2-M1..M2)`. M1 teaches the polite **verb**
rather than the polite pronoun, which is what makes Italian unlike every other course here: the
language is pro-drop, so politeness is a third-person ending on a verb pointed at the person in
front of you, and every request is authored in both addresses side by side. **`Lei` never reaches a
display** — `normalizeSurface` lowercases, so it would fold onto L1-M10's `lei` ("she") and first
occurrence wins; it is named in prose and nowhere else. The three-way split of "sorry" is the
module's best content, and its `Permesso` trap says the thing a phrasebook will not: it announces
rather than asks. M2 puts features on `avere` (`è trenta` is the mistake block), teaches the
possessive law in both halves at once — the article stays, except before a singular family member,
and returns in the plural — and states plainly that `essere`/`stare` is **not** the Spanish split,
so an author who has read the en-es briefs does not import the wrong law. The `-co` plural fork
(`amici` soft, `bianchi` hard, `amiche` hard in the same word) is taught as vocabulary, because that
is what it is. The wave also exposed a latent test defect only a second level could reach:
`src/course/types.test.ts`'s elision case sorted the ladder by module number alone, so `L2-M1` came
before `L1-M7` and `dov'è` was checked against a set that did not yet teach it; the comparator now
sorts level-then-number. **The native gate is still unmet**: docs/65 ends in open questions 1–10, a
fresh en-it L2 chain.

**en-it reaches the middle of L2 (#448, 2026-09-08).** `L2-M3` _Describing things_, `L2-M4`
_Getting around_ and `L2-M5` _Food and hosting_ ship against the same briefs; a strict
`npm run build` emits `en-it: 15 modules (L1-M1..M10, L2-M1..M5)`. The wave's spine is **the elision
policy**, which three separate modules turn on: an apostrophe fuses two words into one index key, so
`bell'uomo` is a row and `bell'` cannot be one; `l'autobus` does not answer for `autobus` and both
are authored; and by the end of M5 the course holds `acqua`, `l'acqua`, `d'acqua` and `dell'acqua`
as four distinct keys. M3 states the adjective grid as a **summary of what L1 already shipped** —
four cells for `-o`, two for `-e` — refuses the shortcut that "-o is masculine", and teaches
`bello`'s apocope against the ARTICLE rather than the gender, which is the only framing that makes
four shapes into one rule; its best fact is the invariable colours, which are nouns pressed into
service and keep their own shape. M4 spends M1's frozen imperatives and gives transport as a list
rather than a principle, because `in` for everything and `a` for feet is exactly that. M5 opens the
clitics, and **the index chooses which**: `lo`, `li`, `mi` and `ti` are teachable only because
`la`, `le`, `i` and `gli` are already L1-M1's articles and because L1 wrote `mi chiamo` and
`ti chiami` as whole phrases. Four brief seams were corrected — `bianco`, `verde`, `nero` and
`lungo` were opened by L2-M2 for hair and eyes, so M3 re-shows them and teaches the `-co` fork on
`sporco` against `amico` instead. Four ratchet findings, all fixed by opening the row the module
needed. **The native gate is still unmet**: docs/65 now ends in open questions 1–21.

**en-it's second level closes (#457, 2026-09-08).** `L2-M6` _Making plans together_ through
`L2-M10` _Telling what happened_ complete the ladder; `content/en-it/levels.json` drops the L2 draft
flag and a strict `npm run build` emits `en-it: 20 modules (L1-M1..M10, L2-M1..M10)`. M6's best fact
is that **the `noi` ending IS the suggestion** — `Andiamo!` is both "we go" and "let's go" — so
Italian needs no word where English needs "let's"; its delta is the article on a day, `il lunedì`
being Mondays in general against `lunedì` for the one coming up. M7 teaches `Pronto?` as the
adjective it is and opens `stare + gerundio` with the half that matters: it is for **right now and
nothing else**, so `Domani sto lavorando` is wrong where English says "I'm working tomorrow". M8
builds `Mi fa male la testa` on `mi piace`, so its structural lesson costs nothing, and puts the
clitic on the BACK of an infinitive (`aiutarmi`) — the other half of M5's rule; complaining calmly
turns out not to be hedging at all, because the politeness lives in `Scusi` and `Purtroppo` and
softening the claim reads as evasive. M9 carries the choice English does not have — `più … di`
against `più … che` — at **no new function-word cost**, since `che` and `di` are already L1's, and
keeps `migliore` apart from `meglio` where English and Spanish both merge them. M10 states the
auxiliary law at last and kills the two-pasts slogan in the same words en-es's and en-ru's M10s use:
what decides the tense is the ROLE the clause plays in the telling, which `Da bambino andavo sempre
al mare` shows most clearly, being a habit rather than a duration. Sixteen ratchet findings across
the wave, all fixed by opening the row the module needed; the en-it baseline stays at 17. **The
native gate is still unmet**: docs/65 ends in open questions 1–35, a fresh en-it L2 chain.

**en-fr starts its second level (#440, 2026-09-08).** `L2-M1` _Asking politely_ and `L2-M2`
_Describing people_ are authored against the briefs of #431
(`docs/58-en-fr-L2-brief-decisions.md`), backed by `docs/66-llm-review-en-fr-L2.md`; a strict
`npm run build` emits `en-fr: 12 modules (L1-M1..M10, L2-M1..M2)`. M1 **pays a debt L1 wrote down**:
decision 1 kept `tu` out of every display and every `forms` list and named it as what a later level
owed, and this is that level. The paradigm opens with the rest point hiding inside it — for most
verbs the `tu` form is the `je` form plus a silent `-s`, and `je peux` and `tu peux` are one word
twice. `est-ce que` is taught as what it is, a marker you put in front of a statement that changes
nothing else, and `je voudrais` arrives as one frozen cell of a tense L3 owns. M2's delta is that a
possessive agrees with the **thing possessed** — `sa voiture` is his car and hers alike — with the
euphonic `mon amie` following immediately, where the SOUND decides the spelling and not the gender.
The wave required scoping two L1-shaped assertions in `src/course/types.test.ts`: the ban on
`tu`-register words and the flat `neutral` register chip were both correct for a level that spoke
only `vous`, and both are what L2-M1 is chartered to lift. That is the second time this milestone
that a second level exposed a test encoding the level as well as the rule. **The native gate is
still unmet**: docs/66 ends in open questions 1–10, a fresh en-fr L2 chain.

**en-fr reaches the middle of L2 (#449, 2026-09-08).** `L2-M3` _Describing things_, `L2-M4`
_Getting around_ and `L2-M5` _Food and hosting_ ship against the same briefs; a strict
`npm run build` emits `en-fr: 15 modules (L1-M1..M10, L2-M1..M5)`. M3 states the agreement grid as
what it actually is — **almost entirely a writing rule**, since three of `grand`'s four shapes sound
identical and only the index can tell them apart — and teaches adjective position as a LIST rather
than a rule, with `bel`, `nouvel` and `vieil` each its own index key. M4's imperative is **free**:
the `vous` imperative is the present tense with the pronoun removed, so the whole budget goes to the
prepositions, where one genuinely reliable rule does the work (`en` for anything you get inside,
`à` for anything you sit on). M5 states the rule L1 set up perfectly and never named: L1-M3 taught
`du`, `de la`, `des`, and L1-M3 taught `ne … pas`, and the two never met in one sentence —
**after a negation every partitive collapses to `de`**. Its object pronouns open narrowly on `me`
and `te`, because `le`, `la` and `les` are already articles and the identically spelled pronouns can
never be first-taught here; and its refusal is the odd one out of the whole collection, softened by
a **compliment** rather than a reason, with a host who offers once or twice and then stops. Ten
ratchet findings, all fixed in content. **The native gate is still unmet**: docs/66 now ends in open
questions 1–21.

**en-fr's second level closes (#458, 2026-09-08).** `L2-M6` _Making plans together_ through
`L2-M10` _Telling what happened_ complete the ladder; `content/en-fr/levels.json` drops the L2 draft
flag and a strict `npm run build` emits `en-fr: 20 modules (L1-M1..M10, L2-M1..M10)`. M6's best fact
is `on`: in everyday French it IS "we", and it takes the **third-person singular verb**, so every
form the learner needs is already theirs from L1's `il` and `elle` sentences. M7's delta is an
**absence** — French has no continuous tense at all, so `Je parle` covers "I speak" and "I am
speaking" alike and there is no `-ing` equivalent to reach for; that is the exact opposite of
en-it's M7, where a call is what finally motivates `stare + gerundio`, and the review says so. The
level's one dialect line lives there too: spoken French drops the `ne`, and this course writes it
everywhere because writing both would fork one negation into two index surfaces. M8's `avoir mal à`
is the **fourth member of a family** the learner has had since L1-M9's `j'ai faim`, and `m'aider` is
one index key because the elision welds the pronoun onto the verb rather than moving it. M9 keeps
`meilleur` apart from `mieux` — where Italian agrees with French and Spanish does not — and marks a
superlative's group with `de` and never "in". M10 states the auxiliary law and kills the two-pasts
slogan in the same words the other three M10s use. Two seam corrections: `quel` was returned to M9
after an M7 draft borrowed it, and M9's comparison was rebuilt on `la ville` and `le village`
because place names do not resolve in the index (#61) — which made the sentence better, since it now
shows the feminine agreement the rule is about. Twenty-two ratchet findings, all fixed in content.
**The native gate is still unmet**: docs/66 ends in open questions 1–35, a fresh en-fr L2 chain.

**en-de starts its second level (#441, 2026-09-08).** `L2-M1` _Asking politely_ and `L2-M2`
_Describing people_ are authored against the briefs of #432
(`docs/59-en-de-L2-brief-decisions.md`), backed by `docs/67-llm-review-en-de-L2.md`; a strict
`npm run build` emits `en-de: 12 modules (L1-M1..M10, L2-M1..M2)`. M1 pays **the most expensive
register decision in the repo**: L1 spoke `Sie` and said in advance why it could afford to — `Sie`
takes the plural verb, so its form is spelled exactly like the infinitive and cost the index
nothing, while `du` costs a second set of endings, its own imperative and `dein`, `dich`, `dir`.
This module pays all of it in one wave. Its grammar is the **modal bracket** — modal in position
two, infinitive at the very end of the clause — which is the biggest word-order delta in the course
and which M4, M6, M7 and M8 all borrow. M2 opens **no row for `sie`** in any of its three readings,
restating instead the rule that the VERB is what separates them, because the index cannot see the
capital and never will; and it teaches the possessive "her" on **`ihre` alone**, a key nothing else
holds because L1 kept the possessive `ihr` out so `Ihr Name` could own the polite "your". Every
adjective in the level stands after `sein` and takes no ending, said as a decision rather than left
looking like an oversight. The wave scoped two more L1-shaped assertions in
`src/course/types.test.ts` — the `du`-register ban and the flat `neutral` chip — and narrowed the
lost-capital check so lowercase `ihre` is allowed at L2 while `Ihr` and `Ihnen` keep their capitals.
That is the third time this milestone a second level has exposed a test encoding the level as well
as the rule. **The native gate is still unmet**: docs/67 ends in open questions 1–10, a fresh en-de
L2 chain.

**en-de reaches the halfway mark of its L2 (#450, 2026-09-08).** `L2-M3` _Describing things_,
`L2-M4` _Getting around_ and `L2-M5` _Food and hosting_ land, and `npm run build` emits `en-de: 15
modules (L1-M1..M10, L2-M1..M5)`. M3 is where the article grid finally sits on one page, and it
earns the module by what the grid BUYS: because case is marked on the article, **German word order
is free in a way English's is not** — `Den Apfel esse ich` is ordinary, with `den` doing the work
English gives to position alone. Adjectives stay predicative throughout, said as a decision, with
the three attributive declensions deferred to L3. M4 names the **two-way prepositions** L1-M7
shipped without naming — accusative for motion, dative for location — and keeps separable verbs
unsplit behind a modal, because a stranded `ein` folds onto L1-M1's article row and would show a
learner a note about "a". M5 carries the milestone's one **inverted culture note**: where hi-mr,
hi-en, en-ru and en-it all teach that a first refusal is ritual, a German refusal is taken at face
value, and `Zusammen oder getrennt?` is asked at every table. The wave's real lesson was the
duplicate-row check: it fired **seven times**, each a note that first-occurrence-wins would have
made unreachable, and every one was fixed in content rather than by widening the allow-list —
`der`, `essen`, `blau`, `grün`, `lang`, `kurz`, `Auto`, `noch` and `Löffel` all already had owners,
so three sentences were rebuilt on the keys their modules could actually hold (`Kollegin`, `lecker`,
`breit`/`schmal`, `Messer`) and the rest fold into prose. The one test change is narrow rather than
loosened: M3's mistake plates have to WRITE `weiss` and `Strasse` to strike them out, so the ß check
lets a mistake display through only when its own `why` carries a real `ß`. The ratchet held at
en-de 11. **The native gate is still unmet**: docs/67 ends in open questions 1–22, a fresh en-de
L2 chain.

**en-de completes its L2 — eight of nine courses now have two levels (#459, 2026-09-08).** `L2-M6`
through `L2-M10` land together and `npm run build` emits `en-de: 20 modules (L1-M1..M10,
L2-M1..M10)`. M6 makes **verb-second** the module's grammar: the verb holds the second slot and
"second" counts phrases, so fronting a time pushes the subject behind it — `Am Samstag gehe ich ins
Kino` — which English never does, and which M9 and M10 both lean on again. It carries the trap most
likely to make a learner miss a train: **`halb neun` is half past EIGHT**, because German counts
toward the hour that is coming. M7 states the delta German shares with French and not with Italian —
**there is no continuous tense**, and `gerade` is an adverb doing a tense's job — around the genuine
cultural fact that **the person answering a German phone says their surname**. M8 teaches the short
closed list of **dative verbs** (`helfen` heads it), names the subjectless family L1-M9 shipped
without naming (`Mir ist schlecht`, where `Ich bin schlecht` is a statement about character), and
finally states **`kein` against `nicht`**, one of the few German rules with a clean statement. M9's
best delta is that **German states a preference with an adverb and not a verb** — `gern`, `lieber`,
`am liebsten` — and it says openly that native speakers produce `größer wie` all the time, because a
course that denies what a learner will hear stops being trusted. M10 takes the spoken past as it
really is: **the Perfekt for nearly every verb, the Präteritum for `sein`, `haben` and the modals**,
which is why L1-M5 shipped `war` and `hatte` with no participles — and it says out loud, for anyone
arriving from Spanish, French or Italian, that **the German participle never agrees with anything**.
The duplicate-row check fired seven more times and every hit was again fixed in content rather than
allow-listed. The ratchet held at en-de 11 across all five modules, with roughly thirty findings
fixed by opening rows the modules owned or rewriting variations onto taught surfaces. **The native
gate is still unmet**: docs/67 ends in open questions 1–40, a fresh en-de L2 chain.

**en-ko starts its second level — the last course to (#442, 2026-09-08).** `L2-M1` _Asking politely_
and `L2-M2` _Describing people_ are authored against the briefs of #433
(`docs/60-en-ko-L2-brief-decisions.md`), backed by the new `docs/68-llm-review-en-ko-L2.md`; a
strict `npm run build` emits `en-ko: 12 modules (L1-M1..M10, L2-M1..M2)`. M1 makes L1's deferred
honorific productive, and the whole lesson is **which person it lands on**: `-(eu)seyo` honours the
SUBJECT of its own sentence, so `jeo-neun gaseyo` — honouring yourself — is the error an English
speaker who learnt it as "the polite one" makes first. It also names the thing Korean does not have:
**there is no verb "can"**, only the noun `su` ("a way") and L1-M3's `isseoyo`, which is why the
negative is "there is no way". M2 assembles Korean's signature sentence, **the double subject** —
`jeo-neun ki-ga keoyo` is *for-me, the-height is-big* — out of pieces L1 had already shipped, and it
teaches the family set as the place where **Korean is richer than English and the delta runs the
other way**: four words for an older sibling that each encode the SPEAKER's gender, and one that
encodes nothing for the younger. The wave widened one L1-shaped assertion by exactly one: the
`-mnida` check allowed two frozen phrases, and M1's job is to teach the speech levels side by side,
so `joesonghamnida` joins them at L2 and nowhere else. That is the fourth time this milestone a
second level has exposed a test encoding the level as well as the rule. **The native gate is still
unmet**: docs/68 ends in open questions 1–12, a fresh en-ko L2 chain.

**en-ko reaches the halfway mark of its L2 (#451, 2026-09-08).** `L2-M3` _Describing things_,
`L2-M4` _Getting around_ and `L2-M5` _Food and hosting_ land, and `npm run build` emits `en-ko: 15
modules (L1-M1..M10, L2-M1..M5)`. M3's job line cannot mean what it means in the Romance courses,
and saying so is the module: **Korean marks no gender, no number and no article — what it marks is
ROLE, on the particle**, and L1 shipped all six of them across six modules without ever laying them
side by side. It also refuses a slogan out loud: "Korean has no plurals" is false, because Korean
has `-deul` and simply does not require it. M4 opens the pair L1 taught and never contrasted — `-e`
for a destination, `-eseo` for where an action happens — and the thing no English speaker guesses:
**riding takes an object particle**, `beoseu-reul tayo`, "the bus, ride it", while getting off takes
`-eseo` because it happens somewhere. M5 states the law that explains what a learner already has:
**native numbers count things and always take a counter, Sino numbers do money and dates**, which
L1-M8 used in one module without ever naming. The honorific verb set arrives at the table —
`meokda` has a whole separate word, `deusida`, so a host says `deuseyo` and never `meogeuseyo` — and
the hosting note is stated rather than moralised: in Korea the offer is repeated, a bare `aniyo` is
heard as politeness, and the refusal that lands carries a reason. The `-mnida` set is widened once
more and closed at four: `jal meogeosseumnida` joins L1's two and M1's `joesonghamnida`, frozen
exactly as they are. The briefs' prediction that a bare `i` would collide with the subject
particle's key came true on the first build, and the demonstrative is now written joined
everywhere — `i-jjok`, `i-sikdang` — as L1-M1's `i-geo` already was. The ratchet held at en-ko 12.
**The native gate is still unmet**: docs/68 ends in open questions 1–27, a fresh en-ko L2 chain.

**en-ko completes its L2 — and so does every course (#460, 2026-09-08).** `L2-M6` through `L2-M10`
land together, `npm run build` emits `en-ko: 20 modules (L1-M1..M10, L2-M1..M10)`, and **all nine
courses now have a complete second level**. M6 is where M5's number rule pays for itself in one
breath: **the hour is a native number with `-si` and the minutes are a Sino number with `-bun`**, so
`du si samsip bun` uses both systems in four syllables. It also moves the OPPOSITE way from the
other eight courses on register — every other L2 chips `informal` when friends make plans, and en-ko
has no informal tier to switch into, because banmal is not written in this course at all. M7 pays
back M1's whole decision inside one word: `yeoboseyo` is an honorific imperative meaning "look
here". It opens **`-go isseoyo`**, reserved for what is genuinely in progress because the plain `-yo`
present already covers a habit, and it notes that `-yo` politens a fragment and not only a verb.
M8's law is one line — **`an` is "do not", `mot` is "cannot"** — where English's single "can't"
hides the difference, and its complaining note is that **Korean softens with the honorific rather
than the hedge**. M9's delta is word order: `-boda` attaches to the thing compared against and comes
before the predicate, nothing declines and nothing agrees, and there is **no Korean verb for
"prefer"** — `deo joahaeyo`, the mirror image of German's `lieber`. M10 refuses the lesson four other
courses spend their M10 on: **Korean has no perfect/imperfect split**, and what replaces it is that
**Korean drops every subject once the topic is set** — its final item is two sentences, three verbs
and not one word saying who. The ratchet held at en-ko 12 across all ten modules of the level, with
roughly a hundred findings fixed in content across the three waves and no baseline raised. **The
native gate is still unmet**: docs/68 ends in open questions 1–47, a fresh en-ko L2 chain.

**Every course is briefed for L3 (#462–#469, 2026-09-08).** hi-mr's L3 briefs were written first
(#452, `docs/50`); the other eight follow, in `docs/69` through `docs/76`. Every seam in all eighty
briefs was pinned against the **real folded cumulative index** — en-es 477 surfaces, en-ar 508,
hi-en 513, en-fr 542, en-ru 588, en-it 642, en-de 467, en-ko 539 — rather than against the
commissioning issue, and in several courses the index contradicted the plan. That is the discipline
`docs/53` §0 set when it found #426's premise about `usted` was false: **the issue text is a plan,
the index is the fact.** en-de's plan called `weil`, `dass` and `wenn` an L3 debt; L1-M9 and L1-M10
own all three WITH their verb-final law, so M3 teaches what L1 actually left standing — the
subordinate clause standing first, with the main verb landing straight after the comma. en-ko's
`docs/34` assigned bare `mal` to an L1 row that never wrote it, and L2-M2's brief listed a `-kkeseo`
pattern no sentence ever shipped.

Each level's job is to pay what its L2 wrote down and withheld, and the eight lists are now closed:
**por/para, the subjunctive, the conditional, `tan … como`, the object clitics and the perfect**
(en-es); **`lam` and the jussive, `qad`, and one cell of the case system** (en-ar); **reported
speech, conditionals, the passive, relative clauses, the past perfect and `used to`** (hi-en); **the
instrumental, reflexives as a system, the conditional `by`, numbers above a hundred and the prefixed
motion verbs** (en-ru); **the congiuntivo, the conditional, reported speech and object `la`/`le`**
(en-it); **the subjunctive, the conditional, reported speech and object `le`/`la`/`les`** (en-fr);
**the attributive declension, Konjunktiv II, the Plusquamperfekt, the genitive, relative clauses and
the `werden` passive** (en-de); **the verb modifier, `-(eu)myeon`, `-dago`, the honorific at length
and `-deon`** (en-ko). What each level does NOT take is named in the brief that touches its edge, so
nothing falls between L3 and L4.

Two index collisions predicted at L2 are paid here exactly as predicted, with a **multi-token
surface**: `tan … como` (because `como` is L1-M4's "I eat") and the Romance object clitics spelled
like L1-M1's articles — `la vi`, `l'ho vista`, `je l'ai vue`. That tool is why `maxSpan` is 3, and 4
in en-fr.

**The first L3 wave lands on six courses (#471–#476, 2026-09-08).** `L3-M1` _Your day, in detail_
and `L3-M2` _Work and study_ ship for en-es, en-ar, hi-en, en-ru, en-it and en-fr; a strict
`npm run build` emits `22 modules (L1-M1..M10, L2-M1..M10, L3-M1..M2)` for each. The twelve modules
were authored **in parallel, one agent per course**, which is possible because a module file is the
only thing an authoring wave writes — the shared files (`levels.json`, the inventory test, the
reviews) are updated once, afterwards. Every one of the six waves found at least one seam claim in
its own brief that was false against the real index, and each correction is now recorded in the
brief itself, marked as the wave that found it. The shown-surface ratchet held at **every course's
existing baseline** with no finding at all. Reviews: `docs/77` through `docs/82`. **The native gate
is still unmet**, as everywhere in this repo.

**en-de and en-ko finish the wave (#477, #478, 2026-09-08).** All nine courses now stand at
`22 modules` — or 30, for hi-mr, whose L3 is complete. en-de's result is the one worth naming:
**zero re-teaches**, on the one course where `src/course/types.test.ts` forbids a second row for a
surface outright. The L2 wave hit that fourteen times; this one hit it never, because the author
could run the per-module check and route around a spent key BEFORE writing the sentence. It also
found the rule that decides which separable verbs a module may split — not the verb but the PREFIX
it strands, and only `ein`, `an`, `mit` and `auf` are owned — plus two collisions no brief had
predicted: `kleiner` is L2-M9's comparative, so `ein kleiner Kurs` would send a learner's tap to the
wrong note, and `meinen` is L2-M8's verb "to mean" rather than a free possessive.

en-ko's wave found an outright error in its own brief, which is the best argument for authoring
against the index rather than the plan: the brief wrote `jeo-ga` for the in-clause subject, and
저 + 가 is 제가 — **`je-ga`**. The module makes that alternation its own word row. Two smaller
corrections went the same way: `meongneun` rather than `meokneun`, because `docs/34` §1.1 writes
word-internal sound changes as `hangungmal` and `hakgyo` already do; and `ilchik`, the shipped key,
rather than the brief's `ilccik`. Reviews: `docs/83` and `docs/84`.

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
moved. A sweep of every hi-mr variation line against its own module's index, pinning the three
remaining misses (the proper noun `प्रिया` and the two exemptions), ran at the time and was cut
with the rest of the suite on 2026-08-30; `tools/shown-surfaces.test.ts` (#491) holds that line
now, per course and by count rather than by row. The reasoning, row by row, is
`docs/15-llm-review-hi-mr-surfaces.md`.

**No fixture course again (#273, 2026-08-24; then #331, #337 and #343, 2026-08-30).** All seven
courses ship — en-fr, en-it and en-ru were each authored behind the gate and graduated the same
way, below — and no module in the repo
is unverified, so `npm run dev` and `npm run build` contain the same modules — the two
relaxations are still enforced by `tools/content-build.ts` itself, they simply have nothing in
this repo to relax. (The test that built synthetic fixture rows and unverified modules and watched
them be dropped went with the suite on 2026-08-30; the gate it covered did not.) The two most
recent courses were each authored behind them, one after the other. The fourth: **hi-en — Hindi (L1) → English
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
each ending in its open questions for a fluent-English pass. A dev-build smoke over all five rungs
(no browser runs on this host) and a pin on which row every seam key (`be`, `to`, `do`, `the`,
`have`, `in` / `on` / `at`, `get up`, `did`, …) lands on both ran at the time; both went with the
suite on 2026-08-30, and the seams are now held only by the index the build emits.
**#272 authored L1-M6…M10** (Tomorrow, Where things are, Numbers & shopping,
Feelings & opinions, Connected talk — 16 + 17 + 17 + 16 + 13 word rows; the cumulative index now runs
108 → 126 → 148 → 171 → 188 → **202** surfaces, `maxSpan` 3 for `in front of` / `Can I have`), flipped
all five — **all ten L1 rungs are authored** — and reviewed them in
`docs/13-llm-review-hi-en-L1-M6-M10.md`. Whole surfaces: `going to`, `there is` / `there are`,
`next to`, `in front of`, `how much` / `how many`, `Can I have`, `See you`; `because` / `so` one row
each; `it` / `it's`, `where`, `this` (M8), `that` (M9), the joiners `and` / `but` / `also` / `then`;
M10's turns are 2–3 sentences in one `display` (`minWordsPerSentence: 2`, no schema change).
Graduation (#273) followed the en-es/en-ar path — below.

**The spoken-English pass (2026-09-05, `docs/39-llm-review-hi-en-spoken-english.md`)** rewrote 41 of
the 100 heroes to what a native says rather than what a textbook prints: `I'm` from M1-S02 (the
first pass had withheld it until M2 so that `am` could be "the lesson"), `What's` / `Where's` /
`There's` / `She's` / `They're` / `We're` / `That's` / `isn't` as their own rows, M6's plans as
`be + -ing` and `going to` with `will` kept for promises (`I'll call you tomorrow`), `go to bed
late` in place of `sleep late` (which means the opposite in English), `worked from home`, `had
rice`, `on Mondays`, `some tea`, `Do you take sugar?`, `I'm good, thanks`, `I like coffee too`,
`Bye`. The Hindi cues moved to the same register (टीचर, स्टूडेंट, थैंक यू, गुड मॉर्निंग, बाय). The
cumulative index now ends at **259** surfaces; `I'll` lists `I will` beside itself, and `will` has
its own row on M6-S10.

**The same pass ran on the other eight courses the same day**, one auditor and one implementer per
course in parallel, each recorded in its own file: hi-mr (`docs/40`, 17 heroes — the two nonsense
कारण sentences, `मजा आली` for `आनंद झाला`, `गाणी` for `संगीत`, spoken futures in the Hindi cues),
en-es (`docs/41`, 21 — `la India`, `¿Cuánto es?`, a reason that holds in M9), en-ar (`docs/42`, 13 —
`sa-` not `sawfa` in production, `jawʿān`, the `-t` of the numeral construct), en-fr (`docs/43`, 9 —
`je rentre`, `Trois pommes, s'il vous plaît`, `et puis`), en-it (`docs/44`, 14 — `Cosa` for
`Che cosa`, `d'acqua`, `Sabato` without the habitual article), en-ru (`docs/45`, 15 — one `ya` per
sentence, `Mne khleb, pozháluysta`, `A u vas?`), en-de (`docs/46`, 19 — `Ich finde das Buch gut` and
the withdrawn "dass is never optional" rule, `Einen Kaffee, bitte`, `Und Ihnen?`), en-ko (`docs/47`,
37 — the object marker off orders and counters, `jeo-neun` dropped from the default hero, `geunde`
for `hajiman`, `gongbuhada` for a day's study). Every deliberate register decision (tú, vous, Sie,
vy, `-yo`, spoken-simple MSA, hi-mr's spoken neuter) held; what each pass changed, kept and asks the
owner to ratify is in its file. No native reviewer has read any of it.

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
surface still resolves to the same `{moduleId, sentenceId, wordIdx}`. The sweep of every en-es
variation line against its own module's index pinned the ten remaining misses at the time (two
proper nouns, four forward references, the four tokens of the three exemptions); it was cut on
2026-08-30, and `tools/shown-surfaces.test.ts` (#491) is what a new variation resolving nowhere
fails today. The reasoning, row by row, is `docs/14-llm-review-en-es-surfaces.md`.

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
The same sweep pinned en-ar's six remaining misses (two proper nouns, the two exemptions' four
tokens), so a new variation that resolved nowhere failed the suite — which is what #287's
third-variation pass inherited, with the four …-īn keys it wants already in the index. That sweep
was cut on 2026-08-30; `tools/shown-surfaces.test.ts` (#491) is the standing ratchet. The
reasoning, row by row, is `docs/16-llm-review-en-ar-surfaces.md`, and its 8 open questions join the 61 across the three
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

hi-en is the heaviest row in the product, and it holds: `course:hi-en` **347.3 KiB** gzip against
360 (12.7 KiB of headroom), `precache:hi-en` **563.0 KiB** against 590. A Hindi-chrome course is
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
in from the first rung rather than retrofitted (#288, #292). A dev-build smoke over all ten rungs
covered it at the time — no browser runs on this host — and it went with the render-level suite on
2026-08-30. `src/course/types.test.ts` survives, and it is what pins the elision seam the index
cannot: every en-it display must carry the straight apostrophe, since `src/engine/surface.ts` folds
the curly one and `display` has to settle on one spelling.

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
lists **hi-mr, en-es, en-ar, hi-en and en-fr**. Every sentence carried a `glossEn` until #405
took the gloss off every English-L1 course (see below). The chrome is English (`revealLabel` =
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

**The quiet Hangul `script` line is drawn by a bundled face (#375, 2026-09-08) — and for eight
days it was not.** The defect was recorded before authoring rather than discovered after: the
course's `script` fields carried 126 distinct Hangul syllables, **0 of 126** appeared in any
generated cut, and `--font-script-fallback` fell through to `system-ui` — a real Korean face on a
phone, tofu on a stripped Linux. It was recorded because `@fontsource/noto-sans-kr` splits Korean
across ~120 numbered range files per weight and `tools/font-subset.ts` reads one source file per
target, so a Hangul cut looked like a pipeline change.

That premise was wrong, and #375 says in terms that a drifted premise changes the answer. The same
package **also** ships `files/noto-sans-kr-korean-<weight>-normal.woff2`, the whole-Korean file, at
all nine weights, so the existing naming holds with no special case: 529 KiB in, en-ko's **294**
authored syllables out at **20 KiB**, the same order as the Arabic cut. `docs/34` §10 carries the
decision; §8 is kept, marked superseded, because its reasoning from its premise was sound. Nothing
in the content changed — the data was always right.

`tools/font-coverage.test.ts` is what stops the next one: it reads the **cmap** of every generated
cut and fails on a harvested character that a target claims and no bundled file can draw. Writing
it turned up a second, quieter case of the same family — en-fr's `sœur`, whose U+0153 was claimed
by Mukta's `latin-ext` target while living in @fontsource's `latin` **file**, so it too was drawn
by nobody (#382).

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

**en-sa ships (#611, 2026-09-12) — the product has TEN courses, the fourth romanized one, and the
second that was BORN conforming to the no-reading rule.** English (L1) → Sanskrit (L2). Ten L1
rungs authored against ten briefs (#607 — `tools/course-briefs.ts`, "en-sa: decisions a brief must
settle before any Sanskrit is written"), across three authoring issues (#608 L1-M1–M2, #609
L1-M3–M5, #610 L1-M6–M10) and reviewed in
[`docs/122-llm-review-en-sa-L1-L2.md`](docs/122-llm-review-en-sa-L1-L2.md) — one document, now four
waves, thirty-seven sections and one open-question list. Dropping `fixture: true` from the en-sa row in
`content/courses.json`, and L1's level `draft: true` and its `draftNote` from
`content/en-sa/levels.json`, was the whole change: a strict `npm run build` reported `en-sa: 10
modules (L1-M1..M10)` at graduation and emitted `public/content/en-sa/` with levels, strings, ten
modules and ten cumulative indexes closing at **139 surfaces**, and the emitted `courses.json`
lists all ten courses. The chrome is English (`revealLabel` = "Reveal the Sanskrit") and the switcher offers the
pair as `english → sanskrit`. **Its L2–L5 ladders stay `draft: true`** — a level's flag clears only
when all ten of its rungs are authored. #613 opened L2 with `L2-M1` and `L2-M2` against the L2 briefs (#612),
so a build now reports `en-sa: 12 modules (L1-M1..M10, L2-M1..M2)` and closes at **164 surfaces**;
L2-M3–M10 and the whole of L3–L5 are still #423's ratified placeholder lists with nothing authored
in them.

**The scheme is IAST and the course is written in PADA form, which is the decision everything else
rests on** (#604, [`docs/121-en-sa-romanization-decisions.md`](docs/121-en-sa-romanization-decisions.md)).
The rule in one line: **external sandhi is never written across a word boundary — `rāmaḥ gacchati`,
never `rāmo gacchati` — while internal sandhi inside a single token is written in full, so the
spoken join lives in the `sound` line and a word keeps ONE spelling.** That is not a stylistic
preference; the word index matches surfaces verbatim, so a sandhied display would give `rāmaḥ` two
spellings and leave the learner tapping a word no row owns. Two mechanical shapes of the rule are
pinned by `src/course/types.test.ts` rather than left to review: no token ends in `ṃ` (a final
anusvāra is a sandhi product — it is `kim` and `phalam`), and no token carries an avagraha, which
is the one character `src/engine/surface.ts` does not strip from a token edge. Devanagari appears in
exactly one field — the quiet `script` line — and `checkScriptMode` reports **zero errors across all
ten modules**: **929 romanized surfaces checked, 0 of them carrying Devanagari in `display` or
`forms`**, against **530** that carry the quiet Devanagari line underneath. en-ru cost six issues
and 959 Cyrillic strings to undo; this course never had one to undo.

**The shown-surface ratchet opens at ZERO, and en-sa was the first course in the catalogue there**
(#491; en-la joined it at #637, and the other nine sit at hi-mr 7 · en-es 10 · en-ar 6 · hi-en 30 · en-ru 20 · en-it 17 · en-fr
20 · en-de 11 · en-ko 12). It was designed rather than discovered, and it cost real content: every
proper noun the course shows — `rāmaḥ`, `sītā` — carries a word row of its own from M1, because
CLAUDE.md's warning is that a proper noun is COUNTED and not exempt; M8's agreeing numerals were
laid out as one row per numeral with the gendered shapes in `forms` (three rows covering seven
surfaces) before a single display was written; and M10's first draft of S03's third variation
(`… paṭhiṣyati lekhiṣyati ca?`) actually tripped the line at `shown but untaught: 2 surfaces`, and
was rewritten into `adya saṃskṛtam paṭhāmi. śvaḥ lekhiṣyāmi.` out of surfaces the level already
owns. The baseline was never raised; `tools/shown-surfaces.test.ts` still carries `'en-sa': 0` and
this graduation did not touch it.

**The font measurement of #605 was re-run against the content that now exists, not against the
plan.** `docs/121` §10 read `@fontsource`'s SOURCE faces on 2026-09-12, before a single module was
authored. Graduation re-verified it the other way round: every character harvested from the emitted
`public/content/en-sa/` against the cmaps of the GENERATED cuts under `src/fonts/generated/`. Per
character class — 25 ASCII characters on the romanized line, all in `mukta-latin` at 400/600/700;
12 non-ASCII IAST marks (`ā ī ū ṛ ṃ ṅ ṇ ś ṣ ṭ ḥ` in `mukta-latin-ext` at all three weights, and `ñ`
in `mukta-latin`, exactly where §10 said it would be and for the reason it gave); 47 Devanagari
codepoints on the quiet line and the danda `।`, all in `mukta-devanagari` at all three weights; 19
non-ASCII characters across the English teaching prose and chrome, all drawn. **Nothing is drawn by
nothing**, no combining mark survives anywhere in `display` or `forms` (every IAST mark is
precomposed, which is the defect no diff shows), and all **24** distinct conjuncts the content
actually writes — `त्र ध्य ह्य स्त स्क ङ्ग स्य च्छ ल्य प्य श्व द्य ष्य न्त ष्ट न्न र्थ ष्प प्र त्य ष्ठ द्व ञ्च न्द` — have every codepoint
present after subsetting. `ज्ञ` and `क्ष` are **not used** by L1, and their three codepoints are cut
anyway. No font file, `@font-face`, `unicode-range` or line of `tools/font-subset.ts` was touched.

**No fluent-Sanskrit reviewer has read a word of it, and the gate this course needs is not the gate
the other nine need.** Nobody grows up speaking Sanskrit at home, so "native speaker" does not name
a reader; what `docs/122` asks for is a fluent saṃskṛta-sambhāṣaṇam speaker or a Sanskrit teacher,
and that bar is **UNMET**. The bar en-sa clears is the same one every other course clears — LLM
review plus the owner's standing authority, signed into each module as `verifiedBy: "Claude Opus 5
— LLM review, authorised by repo owner"` — and the **47 open questions** running in one list across
the three waves are what that reader still owes. No later authoring wave may close one of them by
rewriting a shipped module.

Budget, reported and not gated — `COURSE_LIMIT` has not existed in `tools/payload-budget.ts` since
#304, and `npm run budget` fails only on attribution (`unmetered` must hold zero files) and the
precache audit; both are green, `unmetered` at 0 files and `precache 17 files 205.5 KiB gzip =
shell ok`. Before the graduation a strict build emitted no en-sa rows at all, because the gate
dropped the course. After: `course:en-sa` **367.6 KiB** gzip (32 files), `precache:en-sa`
**581.5 KiB** (51 files). `course:hi-mr` stays **621.5 KiB** (106 files) — adding a tenth course
moved no other course's content. The shared cost is `shell` 213.6 → **213.9 KiB** (+0.3), which is
the emitted manifest gaining a row and that row's long `romanizationNote`. **en-sa is charged
twice, and that is the honest price of a romanized course in a non-Latin script**: the Mukta
`devanagari` cut for the quiet line (`sa: 'devanagari'` in `SCRIPT_BY_LANGUAGE_TAG`, the same three
weights hi-mr and hi-en pay for, ~270 KiB raw and the whole reason this row is not the lightest in
the product) **and** the `latin-ext` cut for the IAST marks (`ROMANIZATION_SCRIPT`, charged to any
romanized row). en-ko is the contrast: its romanization is pure ASCII, so it pays the `latin-ext`
row and adds nothing to it. The Devanagari cuts came out **byte-identical** — every one of en-sa's
47 codepoints was already in the union hi-mr and hi-en harvest — so the entire font growth is the
`latin-ext` cut taking the eight marks new to the catalogue (`ṛ ṝ ḷ ḹ ṃ ṅ ṇ ś`): about a kilobyte,
shared, which is why `course:en-ar` 405.1 → **406.2**, `course:en-ru` 391.2 → **392.3** and
`course:en-ko` 403.2 → **404.2** each moved by ~1.1 KiB and the five native-script courses moved by
nothing. No constant in `tools/payload-budget.ts` was edited.

**en-la ships (#637, 2026-09-12) — the product has ELEVEN courses, and this is the first one whose
spelling has no build gate at all.** English (L1) → Latin (L2). Ten L1 rungs authored against ten
briefs (#633 — `tools/course-briefs.ts`, "en-la: decisions a brief must settle before any Latin is
written"), across three authoring issues (#634 L1-M1–M2, #635 L1-M3–M5, #636 L1-M6–M10) and
reviewed in [`docs/124`](docs/124-llm-review-en-la-L1-M1-M2.md),
[`docs/125`](docs/125-llm-review-en-la-L1-M3-M5.md) and
[`docs/126`](docs/126-llm-review-en-la-L1-M6-M10.md) — three documents, one per wave, each ending in
its own open-question list. Dropping `fixture: true` from the en-la row in `content/courses.json`,
and L1's level `draft: true` and its `draftNote` from `content/en-la/levels.json`, was the whole
change: a strict `npm run build` reported `en-la: 10 modules (L1-M1..M10)` and emitted
`public/content/en-la/` with levels, strings, ten modules and ten cumulative indexes closing at
**189 surfaces**, and the emitted `courses.json` lists all eleven courses. The chrome is English
(`revealLabel` = "Reveal the Latin") and the switcher offers the pair as `english → latin`. **Its
L2–L5 ladders stay `draft: true`.**

**`checkScriptMode` never runs on this course, and that is the fact everything else about it follows
from.** Its first statement is `if (scriptMode !== 'romanized') return report`, and en-la's row is
`scriptMode: "native"` — correctly, because Latin is written in Latin letters and there is nothing
to transliterate. So where en-ar, en-ru, en-ko and en-sa each have a build gate standing over their
spelling, en-la has none, and #630
([`docs/123-en-la-orthography-decisions.md`](docs/123-en-la-orthography-decisions.md)) was written
before the manifest row existed to say what replaces it.

**The orthography in one line: a macron on every long vowel, per the Oxford Latin Dictionary, on
every readable Latin string.** Not a stylistic preference — `src/engine/surface.ts` rule 4 folds
case and never touches a diacritic, so `venit` (M4, "he comes") and `vēnit` (M5, "he came") are two
index keys ONLY if the mark is written, and one row with one wrong note if it is not. The pair that
matters most is not lexical at all: `rosa` and `rosā` are a case ending, so a macron-less en-la would
teach the ablative and index it as the nominative. Consonantal u is `v` and consonantal i is `i`
(`vīvō`, `iam`, `Iūlia`) and `j` never appears; no accent is ever written, because Latin stress
follows from vowel length and en-ru's acutes have no seat here; Latin writes no elision, so no
apostrophe appears in any display; and `script` is never authored, because the display already IS the
script. `tū`/`vōs` is **number, not register** — Latin has no T/V distinction — so en-la will be the
only course in the catalogue whose `formal` chip sits on a verb form (`velim`, `quaesō`) rather than
on a pronoun.

**The enclitics are joined with a HYPHEN, and the arrangement came out better than en-ko's.**
`-ne` opens at M2 and `-que` at M10, written `agis-ne` and `aquam-que` and said solid, with the note
saying printed Latin joins them so no learner is surprised by a page of Cicero.
`surfaceIndexKeys('agis-ne bene')` is `['agis-ne bene', 'agis', 'ne']` where the solid `vidēsne`
earns one key and no parts — so the hyphen is what keeps the bare host tappable. en-ko puts the
joined form in the HOST's `forms` and the host therefore donates the particle's key one word early,
which is #601's sixteen findings; en-la puts the joined forms in the **particle's** row and opens
every host in an earlier sentence, so `agis`, `valēs`, `tū`, `aquam`, `librum`, `pānem` and
`epistulam` all still answer for themselves and `ne` and `que` keep keys of their own. It works only
because of that ordering, and the rule is written into M2's brief for L2 to inherit. The lexicalised
ones are solid and their list is closed (`atque`, `neque`, `itaque`, `quoque`, `namque`, `dēnique`);
M9-S04 and M10-S07 each carry a `mistake` plate hyphenating one, which is safe only because a plate
is never indexed.

**What replaces the build gate is three things, and the graduation ran all three.** First,
`src/course/types.test.ts` gains an en-la block: no `j`, no apostrophe, no acute in either
composition, NFC, the ten macron vowels and nothing else above ASCII, a hyphen only before
`que`/`ne`/`ve`, and no `script` line. Second, a sweep over the emitted course — **1,016 readable
Latin strings across ten modules, zero on every count**, and zero `script` lines authored. Third,
the font verify, run the other way round from #631's measurement: every character in those 1,016
strings against the cmaps of the GENERATED cuts. Six characters above ASCII (`ā ē ī ō ū Ū`), each
drawn by `mukta-latin-ext` at all three weights; every ASCII character drawn; nothing missing. The
honest limit of the sweep is worth recording: it cannot tell a legitimate `aquam-que` from a
hyphenated `ita-que`, because both end in `-que`, so the closed list stays a review responsibility.

**The shown-surface ratchet opens at ZERO**, which makes en-la the second course there after en-sa
(#491). It was designed rather than discovered and it cost real content across all three waves: both
proper nouns the course shows, `Mārcus` and `Iūlia`, carry word rows from M1, because CLAUDE.md's
warning is that a proper noun is COUNTED; fourteen shapes shown before they were owned were each
either given a home in their lexeme's `forms` or dropped rather than charged to the baseline; and
M8-S02's hero was rewritten from `Duo librī sunt` to `Duae mēnsae sunt` so that the feminine plural
was taught rather than merely shown. `tools/shown-surfaces.test.ts` carries no `'en-la'` entry at
all, which is how it holds a course at the implicit baseline of 0.

Budget, reported and not gated: `unmetered` at 0 files and `precache 17 files 205.5 KiB gzip =
shell ok`. Before the graduation a strict build emitted no en-la rows, because the gate dropped the
course. After: `course:en-la` **87.6 KiB** gzip (29 files), `precache:en-la` **301.5 KiB** (48
files) — the lightest course in the product, because Latin needs no non-Latin face. `course:hi-mr`
stays **621.5 KiB** (106 files) and `course:en-sa` moves 385.1 → **385.4 KiB**; the shared cost is
`shell` 213.9 → **214.0 KiB** (+0.1), which is the emitted manifest gaining a row. The Mukta bundle
grew 331,376 → **331,708 bytes** (+332), all of it the `latin` and `latin-ext` cuts taking the
handful of characters new to the catalogue. **One line of code changed for the money:
`SCRIPT_BY_LANGUAGE_TAG` gained `la: 'latin-ext'` (#631)** — the first row in that table whose script
is Latin, put there by the orthography and not by the writing system. Without it `ROMANIZATION_SCRIPT`
would never fire for a `native` row and an en-la learner would precache no `latin-ext` file at all:
online the browser fetches it from the `@font-face` `unicode-range` and the defect is invisible,
offline every long vowel renders in the system face with the rest of its word in Mukta. No constant
in `tools/payload-budget.ts` was edited.

**No fluent Latin reader has seen a word of it, and the gate this course needs does not exist in the
ordinary sense.** There is no native speaker of Latin and there never will be, so the bar `docs/124`,
`docs/125` and `docs/126` ask for is a fluent speaker of living Latin or a Latin teacher — competence
in a community of use rather than nativity — and that bar is **UNMET**. The bar en-la clears is the
one every other course clears: LLM review plus the owner's standing authority, signed into each
module as `verifiedBy: "Claude Opus 5 — LLM review, authorised by repo owner"`. The **twenty-four
open questions** across the three review docs and `docs/123` §11 are what that reader still owes, and
the sharpest of them is the first: whether the enclitic hyphen reads as a teaching convention or as
an error, which is the one decision that would cost an en-ru-shaped rewrite to reverse.

**Five levels per course (2026-09-07, `docs/48-five-level-ladder-plan.md`).** Every course's
`levels.json` now lists L4 "Nuance — say it the way they do" and L5 "Voice — your own words, at
length" under L1–L3, ten rungs each, `draft: true` and `hasContent: false` — proposed lists awaiting
the ratification #112 gave L2/L3, and nothing above L1 is authored anywhere. The id grammar was the
only thing in the way: `content/schema/module.schema.json`'s three id patterns, `parseModuleId` in
`tools/validate.ts` and `tools/content-build.ts`, and `priorModuleId` in `tools/generate-prompt.ts`
all said `L[1-3]`, and the last of those returned `null` for `L4-M1` — an L4 prompt would have
rendered as a course's first module, with no allowed vocabulary. All four say `L[1-5]` now, and
`tools/module-ids.test.ts` pins the grammar at both ends on a real module re-numbered. Nothing in
`src/` needed a change: the engine, the strip, the store and the export format read the list, and
`src/course/types.test.ts` now pins every ladder at five levels of ten. The strip was measured at
five cells before the lists landed — 72 px a cell at 360 px, the sealed label flush to its edge
(`docs/images/ladder-five-levels-360.png`). The stale "Dev fixture course" wording on six courses'
L2/L3 `draftNote`s went in the same edit; those courses graduated on 2026-08-30.

### The word index — and the rule it enforces

Every shipped module also gets `public/content/<courseId>/index/<moduleId>.json`: each L2
surface form (a word's `display` plus every entry of its `forms` — romanized for romanized
courses, never the `script` line) mapped to the word entry that **teaches** it,
`{moduleId, sentenceId, wordIdx}`. It is **cumulative in the shape the app reads** — L1-M2's
index is L1-M1's plus what M2 adds, because a module never re-teaches what an earlier one taught
— and **first occurrence wins**, so the pointer names where the learner met the word. The run
notes each one: `index L1-M2: 47 surfaces`. This is what the "why" resolver reads (PRD §6.3).

**The emitted file is a delta (#424, 2026-09-07).** Cumulative *files* are quadratic in the
ladder: hi-mr's thirty modules were 1.2 MB raw, and nine courses at fifty modules would each have
shipped ~2.9 MB, every byte of it warmed for offline. Each file now carries only the surfaces its
own module is the first to teach, marked `delta: true`, alongside the ladder it sits in
(`cumulativeThrough`) and the folded totals; `loadIndex` fetches that ladder's deltas and folds
them earliest-first, which is what preserves first-occurrence-wins. Everything above `content.ts`
— the resolver, the why panel, the tests — sees the cumulative shape and always has.
hi-mr's index set went **1.2 MB → 79 KB raw** (`course:hi-mr` 542.0 → 468.5 KiB gzip); the other
eight sit at 20–31 KB. `tools/delta-index.test.ts` pins the equality that makes this safe: for
every module of every course, fold(deltas) is the cumulative index key for key and entry for
entry.

Two consequences worth knowing before you author content:

- **A comprehension-pool item may only use taught words.** Every whitespace-split token of
  every pool item must resolve in that module's cumulative index, or the build fails naming
  the course, module, item id and token. Sentences' own `variations` and `mistake` lines do not
  fail a build — a mistake is wrong L2 *by design*, and a variation may carry a proper noun (#61)
  — but they are **reported** since #491 (`shown but untaught: 7 surfaces — …`) and ratcheted by
  `tools/shown-surfaces.test.ts`, so the count can fall and never rise. The standing list, and
  what a sweep of it would decide, is `docs/52-shown-surface-findings.md`.
- **`normalizeSurface` is the one definition of "same word"** — `src/engine/surface.ts`, NFC
  + edge punctuation stripped (`आहात?` → `आहात`), case and apostrophes untouched (#116). The
  emitter imports it, and so does the runtime resolver (`src/engine/wordIndex.ts`, #94). Never
  copy it: a second copy is a word that silently has no "why".

### The strings contract — 70 keys, no fallback copy

Every course ships one `strings.json` carrying **all** the microcopy the shell renders, because
the shell has none of its own (PRD §4). So the build validates it against the canonical key list
in `src/course/stringsKeys.ts` — the only list in the repo, which the app's `Strings` type derives
from — and a bundle that fails takes the whole build down with it (PRD §6.5): a missing key is a
blank screen for the learner, not an English word.

The list lives in the **course layer** and the build imports it, not the other way round: the
runtime is the side that must not break, and a `tools/` module the app bundle imports is how a
second copy of the list gets born. The test that failed if either table was ever declared twice
went with the suite on 2026-08-30; `STRINGS_PLACEHOLDERS` being `Record<StringsKey, …>` still makes
a key added to one table and not the other a `tsc` failure, but nothing now checks for a second
copy of the list itself.

`tools/strings-check.ts` runs per course, flattens the nested file onto dot-paths
(`settings.tick.title`), and reports four things, always naming course **and** key:

- **missing key** — every canonical path must be there;
- **empty or non-string value** — a present-but-blank key is a missing key with extra steps;
- **unknown key** — the typo tripwire; `settings.tick.titel` would otherwise sit quietly beside a
  missing `title`;
- **placeholder mismatch** — a value carries exactly its canonical `{placeholders}`
  (`{sentenceCount} {maxWords} {ordinal} {n} {nextModule} {to} {from} {level} {remaining}
  {total} {count} {phase}`), so a translation cannot
  drop `{ordinal}` or invent `{name}`.

Adding a key is one edit to `src/course/stringsKeys.ts` plus a line in each of the three bundles —
in that order, because the build will tell you exactly which course you forgot. The list grew that
way nine times: five keys the frozen screens forced (PR #120), three the Ladder forced (#86 —
`ladder.pendingLine`, `ladder.ownership`, `ladder.sealedToast`; only the last still exists), seven the staged rung card forced
(#87 — `rungCard.startModule`, `.freshNote`, `.practice`, `.revisitModule`, `.exitRitual`,
`.module`, `.practiceEarlier`: a label for every control across the four [D22] stages), three
the module list forced (#88 — `module.helper`, `module.openFull`, `module.trapNote`), four
Sentence Detail forced (#89 — `sentence.trapHead`, `.pocketIt`, `.prev`, `.next`: the trap
callout's heading, the mnemonic's label and the two pager buttons), four the reveal card forced
(#93 — `mark.gotIt`, `.missed`, `.prompt`, `.next`: the two self-mark segments [D11], the question
above them and the Next that does not exist until one is chosen) and two the "why" panel forced
(#94 — `why.show`, `.hide`: the toggle's two labels, because it names what it will do) and seven
the session forced (#96, cut to that count by #388/#389 — `practice.*`: the hub's title, the count
of cards the next tap serves and the one Start label, and the summary's title, its one score line,
its way on and its way back) and two lossless resume forced (#99 — `practice.resumeContinue`,
`.resumeNew`: the two ways out of an open session) and two the
press-and-hold forced (#101 — `ritual.confirm.done`, `.toComprehension`: what the control says
once it is signed, and the way on to part 2 — the prototype writes both in English for every
course, which is the shell owning a learner-facing sentence) and five the Verdict forced
(#103 — `verdict.checkSentence`, `.checkChecked`, `.checkComprehension`, `.honesty`, `.toLadder`:
the three checklist lines the ritual ends on, the honesty line under them, and the CTA that climbs
back to the ladder). All of them are
**draft values pending the Sync-3 freeze** (#71). The alternative each time was a
learner-facing line hardcoded in the shell, which is the one thing this list exists to prevent.

**And the list shrinks the same way.** Retiring the exit ritual took ten keys with it — `cueLabel`,
`revealLabelComprehend`, `retry.title`/`.pending`, `rungCard.exitRitual`,
`practice.summaryToRitual`, `hint.production` and three of the five `verdict.*` — because a key
no surface renders is a line ten courses are asked to translate for nobody. The two that
survived moved rather than died: `verdict.passedRung` and `verdict.toLadder` are said on the
session summary now and are named for it (`practice.climbedRung`, `practice.climbToLadder`),
keeping every course's own words for a screen that still says the same thing.

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

### Shell purity — the rule that keeps that true

No shipped file under `src/` may carry a course's script — Devanagari (hi-mr) or Arabic (en-ar).
Copy that got hardcoded is copy no course can translate, and it counts comments too: a doc comment
is where a pasted string waits before it becomes code. English shell furniture (the boot error
copy, a Settings header) stays permitted — the rule is about course scripts, not about English.

**This was a scan over every shipped file, and the scan was deleted on 2026-08-30 (#370).** It is a
review rule now, with nothing failing a run when it is broken. Restoring it is a `tools/` job, the
shape `tools/css-classes.ts` uses — read the shipped tree, name the file and line — and it is not
open work today.

### The silence guard — the app plays nothing and records nothing

Invariant **[D1]** ("the app plays no audio, records nothing", PRD-engineering §1) is the same
shape of rule: no shipped file under `src/` may name a sound API — playback (`Audio` and its
contexts, `<audio>`, `<video>`), synthesis (`speechSynthesis`, `SpeechSynthesisUtterance`) or
capture (`MediaRecorder`, `getUserMedia`). The scan that enforced it, naming file, line and API,
was deleted alongside the shell-purity one on 2026-08-30.

It landed with the **Read phase** (#97, retired by #388) because that phase was where the
temptation landed: it asked the learner to say the sentence out loud, and the obvious "help" is a
play button — a synthesised Marathi voice, or a recorder to compare yourself against. The
temptation did not retire with the phase; every practice card still asks for the learner's own
voice. Both are the app saying the line *for*
the learner (Invariant 3), and neither could be right offline for a pronunciation nobody has
signed off. Comments count, as in #80 and #82, and the exemption list is **empty and stays empty**:
there is no file that gets to make a sound. Its own tests plant one violation per API, so a
pattern that stops matching cannot pass as a clean tree.

### The state layer — one document, keyed by course

`src/state/` is zustand + persist over a single `localStorage` document, `rung:state`, whose shape
is PRD-engineering §8 F8 **verbatim**: `{stateVersion: 12, activeCourse, courses: {<courseId>:
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
  engine stays pure and testable without fake timers. A scan over every shipped file under `src/`
  used to name the file and line that reached for the wall clock — the same mechanical guard as
  shell purity, and gone with it on 2026-08-30.
- `src/state/store.ts` — `useAppStore`, persisted with `version: 6` and a wired `migrate` stub
  (its doc comment is the contract for the real v5 → v6 wrap, which ships with export/import in
  P4). It stays **thin, and free of rules**: `ensureCourse` (idempotent — an existing course
  returns the same object, so no write can blank a ladder), `setActiveCourse` (a bare pointer swap;
  the learner-facing switch flow with its toast is #106), `setSetting`, `setLadder` /`markStudied` /
  `passRung` (progression, below — every rule they obey is derived in the engine),
  `recordProduction` (the counters, below), the session's three (`startSession`, `recordReview`,
  `setSession` — below), and `_reset()` for dev and tests. `completeRung` (#103) adds none of its
  own: it calls `passRung` and rides its single write.

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
| `deriveStatuses(input)` | every module by status — `locked` · `unlocked` · `in_progress` · `passed` |
| `levelSealed(input, level)` | the **seal rule** (PRD-design §5): a level unlocks only when *every* module of the previous level is passed |
| `currentRungId(input)` | the first non-passed rung of the first unsealed, incomplete level — `null` on a finished ladder |
| `rungStage(input, id)` | the staged rung card [D22]: `!hasContent` → `pending`, `!studied` → `fresh`, else `studied` |

`ladderFromLevels(levels)` turns a course's `levels.json` into the engine's ladder; the one live
fact arrives as an **injected predicate**, `studied(id)` (the per-course flag).
`progressionInput(state, courseId)` in the store assembles one from what a course actually holds,
and the screens derive from the same input the store guards with.

There used to be a second predicate, `exitAvailable(id)` — every sentence of the rung marked —
and with it a fourth module status (`exit_available`) and a fourth rung stage (`exit_ready`,
whose CTA opened the exit ritual). All three went when the ritual did: a rung is climbed by
finishing a Practice session, so the counters gate nothing and the state a rung would have sat
in between "worked through" and "passed" no longer exists.

Sealing counts a rung whose module has not been authored yet — hi-mr ships 2 of L1's 10 today, so L2
stays sealed until the other 8 exist and are passed. That is the rule working: there is nothing to
climb through a rung with no module.

**One unlock path (Invariant 1).** `passRung(courseId, moduleId, clock?)` is the only action in the
app that writes `modules`. It throws unless the module *is* that course's current rung — a rung
further up, a module already passed, a sealed level, or a course whose ladder the store has not been
handed all refuse and write nothing — and it stamps `passedAt` from the injected `Clock`.
`markStudied` marks, and cannot unlock: reading every module in the ladder leaves every status
exactly where it was.

That promise had a mechanical half — a file that sliced every action out of `store.ts` **by name**
and failed if more than one wrote `modules`, called every action against a course with a passed rung
and failed if any but `passRung` changed the map, and scanned every shipped file for a `setState`
call, because an action list is not a gate if a screen can write past it. It was deleted on
2026-08-30 (#370). What survives is `src/state/store.test.ts`, which tests `passRung`'s
**behaviour** — it passes the current rung, stamps it from the clock, and refuses a rung further up,
an already-passed module and a sealed level. That is the promise checked from the outside; nothing
now stops a *second* action from growing a write to `modules`.

### The production counters — the record of a rung said back

`production[sentenceId]` counts the times a sentence of the current rung has been self-marked
got-it in Practice. Two pieces carry it (#95): the reading is pure, the write is one action.

| | |
|---|---|
| `src/engine/production.ts` | pure — `producedTimes(production, id)` (defensive: this map comes back from `localStorage`), `marked(production, id)`, and `MARKS_PER_SENTENCE`, the `1` the module list's dots and its `n / 10` count read |
| `recordProduction(courseId, sentenceId)` | the store's counter action: `production[sentenceId] += 1`, and nothing else |
| `src/screens/useRungProduction.ts` | the join for the rung card's dots row — this course's counters (state) against the current rung's sentence ids (content, loaded through the content layer's cache) |

**It gates nothing.** It used to be the whole of `exit_available` — "all sentences self-marked
got-it" (PRD-engineering §8 F1) — the line standing between the learner and the rung's exit
ritual, and `screens/useExitAvailable.ts` injected that answer into `progressionInput` so every
screen derived one. The ritual is gone and the climb is finishing a Practice session, so the
predicate, the injection seam and the hook's old name went with it. What is left is a drawing:
a full dot on every card of the module list is the rung said back whole.

**The counters only ever count up.** There is no decrement, no reset, no undo and no ceiling: the
only arithmetic in the action is `+ 1`. A number that can fall is work a learner did that the app
forgets — and undo is not missing by oversight, because the mark commits on Next rather than on
the tap ([D11]), which is where a mis-tap is corrected. A count above the mark is kept as it is:
the threshold is what a dot can draw, not a cap on practice.

That promise had a mechanical half too, in the same three parts as the unlock path's: it sliced
every action out of `store.ts` **by name** and failed if more than one wrote `production`, read that
one for any arithmetic that could lower a counter (`--`, `-=`, a subtraction, a reset, a `delete`,
even a careful `Math.max(0, …)` floor), called every action against a seeded counter and failed if
any moved it down, and scanned every shipped file for a counter write outside the store. It was
deleted on 2026-08-30 (#370). `src/state/store.test.ts`'s `recordProduction` block survives and
checks the counting behaviour — one got-it, then two on the same sentence, and a fully marked rung
still sitting at `in_progress`. Introduce `Math.max(0, produced - 1)` in the action and **three** tests
go red, where thirteen once did; the "only one action writes it, and no screen writes past it" half
is review only now.

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
maintenance begins. Until then Practice already serves every sentence of the current rung each
session, and scheduling them for review too would be the same work twice under two names. The
call site is the pass action (`completeRung`, #103), which the last card of a Practice session
makes and which enrols in the very write that marks the module passed; this module states the
policy and stays pure — no React, no storage, no clock, every function returning a new array.

### The app shell — one frame, three headers, one flag

`src/shell/` is the chrome every screen renders inside (#84; PRD-design §4 [D8, D21]), and
`src/screens/` is the eight screens themselves — stubs today, each naming the ticket that builds
it. The IA is the whole route table, and the table is data (`src/shell/routes.tsx`): `App` builds
the `<Routes>` from it and `AppShell` matches the location against it, so a screen the router
knows about and the chrome does not cannot happen.

| | |
|---|---|
| `/` | Ladder (#86) — home, first run, and where an unknown route lands |
| `/module/:id` · `/sentence/:id` | children of the active rung: **back header** to the Ladder |
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
is 0, still gets the design's padding. Both were pinned from the CSS source, because jsdom resolves
neither `env()` nor `max()`; that file was deleted on 2026-08-30 (#370) and nothing pins them now.
The numbers themselves were checked in a browser at 360px and 430px, which was the ticket's
acceptance criterion.

Two rules the scaffold bakes in, before you write a component:

- **Tokens only.** `src/main.tsx` imports `design/tokens.css` *in place* — `design/`
  is read-only and re-copied wholesale, so importing it directly means token updates
  land with zero copy step. Style with `var(--*)`; no hard-coded hex, px or font names
  anywhere in `src/` (`docs/design-contract.md`). A scan over every shipped stylesheet used to fail
  naming the file and line, the same mechanical shape as shell purity and the clock guard; it went
  on 2026-08-30 (#370), so this is a review rule. The one styling check that does run is
  `tools/css-classes.test.ts` (#496), and it looks at class-name collisions, not at tokens.
- **One brand constant.** `src/brand.ts` exports `BRAND` — the only place the product
  name lives. Page title, manifest and export filenames all read from it.
- **Content has a contract.** `content/schema/module.schema.json` (JSON Schema draft
  2020-12) is the frozen shape of a module; `tools/validate.ts` adds the checks a schema
  cannot express (filename ↔ id, the 10-sentence / pool ≥ 6 budget and its `fixture: true`
  relaxation, full enrichment for M1–M3, rule-index ranges). Run `npm run content:validate`
  before committing any content change — one line per file, then `CONTENT <n>/<m> ok`.
- **Content ships through a gate.** `tools/content-build.ts` runs that validator over every
  module and emits `public/content/` — see the gate table above. Never import from `content/`
  in `src/`: the app reads `public/content/` (via `fetch`), which is the only tree the gate
  has approved.

### The Ladder — the home screen, and nothing it renders is stored

`src/screens/LadderScreen.tsx` (#86, remade by #396-#399; PRD-design §5, §7 [D16]) is where the
engine becomes a screen: the position line, a compact strip of level chips, the current rung's
card, and the rungs of the active level under it. Every one of those is **derived on render** —
`deriveStatuses`, `currentRungId`, `levelSealed` off the very `progressionInput` the store guards
`passRung` with (#83). A count on this screen and a rule in that action cannot disagree, because
they are one derivation.

[ladder-mid-360.png](docs/images/ladder-mid-360.png) — mid-climb at 360px.

**The action comes first, and the position is stated once** (#396, #397). The screen used to open
with "You are learning Spanish." — true on every render forever — then a position line, then three
tall level cells carrying names and taglines for two levels whose modules are not authored, then
"Level 1 · 7 of 10 rungs still to climb", which is the position line inverted. The rung card came
after all of it and after every rung already climbed, so at 360px mid-climb its `Practice` CTA
fell below the fold on a 1.56-screen page. Now the card is the first thing in the body, the strip
is one row of chips, and the same fact is not asked to be read two ways. The list under the card
is still the whole ladder in ladder order; the current rung appears there as a row, because the
card above it IS that rung.

Three things it is responsible for keeping true:

- **A locked rung is not a control.** No link, no button, no `tabindex` — the row is text, a
  hollow marker and a lock at 50% opacity. "The ladder is visible; the rungs are sealed"
  (PRD-design §3.2) is a DOM fact, not a CSS one: `pointer-events: none` would still leave a link
  for a screen reader to offer. It was asserted per rung by the Ladder's render test, which went
  with the render-level suite on 2026-08-30 (#362–#365).
- **A sealed level answers honestly, in counts.** Only sealed cells are `<button>`s (the active
  cell is the screen you are on; a control with nothing to do is not one), and tapping one raises
  the shared toast (`src/shell/Toast.tsx` — the timer is the control, the region is always mounted
  so a screen reader hears the change, and #106's course-switch toast reuses both) with the sealed
  level and how many rungs below it remain.
- **Counts, never time.** No `%`, no date, no streak, no "due" — asserted over the rendered screen
  in both a fresh and a mid-journey state, until that render test went on 2026-08-30.
- **The one celebration is a moment, not a state.** A finished Practice session hands the screen a
  one-shot flag and the newly opened rung plays the unlock beat once; the Ladder spends the flag
  as it lands, so a reload has nothing to replay and a revisit never carried one (#103, below).

Loading that ladder and handing it to the store is `src/screens/useProgression.ts`, which the
Ladder and the module list both start with: it fetches `levels.json`, calls `setLadder` from an
effect when it resolves — which is what gives `passRung` a rung to check against — and returns the
assembled `progressionInput` plus a `ready` flag. It used to join on a fourth thing, the
`exitAvailable` predicate the engine took injected; nothing is gated on the counters now, so the
input is whole and there is no injection point left to get wrong. Screens draw nothing until that flag is up
(`aria-busy`), because an empty input would render a *finished* ladder. It is a hook rather than
a line in the Ladder because a deep link (`#/module/L1-M1`) reaches a guarded screen with the
Ladder never having mounted.

Two deliberate divergences from the prototype, both recorded in the code that makes them:

- **Course prose is 18px Mukta, not an 11.5px caption.** The prototype renders the rung jobs and
  the toasts in English for every course; in the product they are course copy, and
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
| `pending` | — (nothing to open) | the `pendingAuthoring` note + ghost "practice earlier rungs" |

There was a fourth, `exit_ready`: production complete, "Exit ritual — open" as the loud action
pointing at `/ritual`, with Practice and Module dropped to secondary. The ritual is gone and
Practice is the whole of the climb, so a worked-through rung offers exactly what a studied one
does — the tab that passes it.

The stage is `rungStage(input, id)` off the same `progressionInput` every other number on the
screen derives from — so it moves when the facts do: `markStudied` on first module open flips
`fresh` → `studied` (#88), and a finished Practice session passes the rung out of the card
altogether. Nothing about the card is stored, and it holds no state of its own. The dots row
beside the stages is the production counters, read live through `screens/useRungProduction.ts`
(#95) — a record of the rung, not a door.

**The stage guides; it never gates** (the invariant, PRD-design §6.2). The bottom nav's Practice
tab is untouched at every stage — asserted per stage until the render-level suite went on
2026-08-30 — the `studied` stage offers Practice from the card itself, and no stage locks a
route. The primary is the
one **filled** object in the whole view (`--cta-height` 48px, solid accent); secondaries are
`--btn-secondary-height`, ghosts `--ghost-height` and always `white-space: nowrap`
(design/tokens.md §3, §4).

Every label is the course's (`strings.json` — the seven `rungCard.*` keys above), so the card
carries no learner-facing English of its own. The render test that walked all four stages and
failed if the prototype's wording reached the screen went on 2026-08-30, so that one is review too.
The card's title is deliberately **not**
a link any more: the primary CTA is the way into a rung, and a `pending` rung has no module to
open at all.

Two more divergences from the prototype, on top of the Ladder's:

- **The card's copy and its button labels are Mukta at the 18px floor**, not 11–12px Barlow and
  14px Barlow Condensed. Same reason as the Ladder's prose, one step further: a CTA label is
  course copy too, and hi-mr's is Devanagari. Raised with the rest for #117.
### The module list — read the rung, and nothing else

`src/screens/ModuleScreen.tsx` (#88; PRD-design §6.4, PRD §8 F2) is a rung's ten sentences,
browsable and quiet: nothing to answer, nothing to get wrong, no control that judges anything.
Four things it owes. Each was a test until the render-level suite went on 2026-08-30:

- **A guard.** `/module/:id` is a real deep link — HashRouter, installable PWA — so any id can
  arrive. A locked rung, an id the ladder does not list, and a rung whose module this build never
  shipped all land back on the Ladder (`replace`, so the bad entry leaves no back-stack trace).
  That is the same answer the rung card gives by having no link to offer.
- **`markStudied`, once, on first open.** The `studied` flag is what flips the rung card behind it
  from "Start with the module" to "Practice" [D22], so *opening this screen* is what moves the
  Ladder. It is idempotent in the store, which is what lets an effect fire it; the test proved the
  call count was 1 across re-renders, and that reading a rung passes nothing (Invariant 1) — which
  `src/state/store.test.ts`'s `markStudied` block still checks from the store's side.
- **Rows, each a door into Sentence Detail.** A row is the L2 `display`, its `cue` (+ the quiet
  `script` line in romanized courses), its production dot and a chevron — hairline-separated, not
  framed (#403: ten registration-marks plates in a column were ten things each claiming to be the
  one object on the screen, and the frame plus its padding was most of the list's height). The
  cards used to expand in place; #217 made every card a link instead, so the details live in
  exactly one screen. `module/ProductionDots.tsx` draws each sentence's 6px dot off
  `production[sentenceId]` (0 / 1), and the header's `n / 10` counts the same map — both
  **read-only** here, live off what `recordProduction` writes (#95), so a column of full dots down
  the list is the rung said back whole, one sentence at a time.
  [module-rows-360.png](docs/images/module-rows-360.png) — mid-climb at 360px, 1.41 screens where
  the plates were 1.72.
- **Where the learner was.** The scroll offset survives a detour into Sentence Detail, in
  **`sessionStorage`** (`module/moduleView.ts`, `rung:module-view:<course>:<module>`) and never
  in the store: `src/state/` is the export contract (#82), and where a list was scrolled to is
  this visit's UI, not something the learner earned. The shell publishes its one
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
`--font-script-fallback` (design/tokens.md §2) — which is why the deleted style scan banned a face
by *name* and allowed `font-family: var(--…)`, that being the opposite of one.

### Sentence Detail — two tiers, one order each, and the mnemonic last

`src/screens/SentenceScreen.tsx` (#89, tiered by #401; PRD §8 F3 [D10], PRD-design §6.4, §7) is
one sentence taken apart. Since #414 the screen file holds only the guards, the ladder hand-over
and the composition; each of the ten sections is its own component under `src/screens/sentence/`
(`HeroSection` … `MnemonicSection`), beside the disclosure (`Deeper`), the pager (`SentencePager`)
and the hand-over hook (`useLadderHandOver`). **The order is the feature**, and within each tier
it is frozen:

> always: hero → words → trap · [go deeper] · mnemonic
> deeper: gloss → rules → sound → variations → mistake → usage

The first tier is what a sentence *is* — the line, its words, the one thing that will bite — and
it ends on the one thing worth carrying away, the mnemonic under the course's own "pocket it". The
second is everything else the course has to say, behind one control (`sentence.deeper` /
`sentence.less` — an action, never a question, #390's lesson), in the order it always had. A
learner who opens a second sentence finds the same shape in the same place, which is the whole
point of freezing it; every section carries a `data-section`.

It used to be ten sections in one column — **2.97 screens at 360px for every sentence of every
module**, since every optional block ships on every sentence — and most of the lower half restated
the upper: the gloss says the literal, a word's note says its rule, the trap and the note both warn
off the same mistake. That was the reading path a first-time learner walked ten times a module.
Closed, `L1-M1-S01` is 1.3 screens. The disclosure lives on the detail, which is keyed by id, so
prev/next remounts it shut: depth asked for on sentence 3 was not asked for on sentence 4.

[sentence-closed-360.png](docs/images/sentence-closed-360.png) ·
[sentence-deeper-360.png](docs/images/sentence-deeper-360.png) — closed, and opened, at 360px.

Four more things it owes:

- **A section with nothing in it renders nothing.** No heading, no empty plate, no "not available".
  Enrichment is optional in the schema past M3, so an M4+ module may ship as hero + gloss + words +
  rules and nothing else — and that is a simple sentence, not a broken screen (asserted against a
  sparse fixture). The gloss obeys the same rule since #268, settled by #405: `glossEn` is
  optional in the schema, required by the build where neither language of the pair is English
  (hi-mr — there it is a third language) and forbidden where either is: hi-en's hero already
  reads in English, and on the seven en-* courses the cue is the English reading and `literal`
  the word-for-word one. All 700 en-* glosses came off — 572 repeated the cue or the literal (24
  were literals mislabelled `lit.` and moved into `literal`), and the 128 that carried a note
  tail had the tail moved into a word `note` where the note did not already say it. The gloss
  section draws whatever is present — gloss and literal, literal alone, or nothing — and branches
  on presence, never on a course id (`docs/design-contract.md`).
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

Four things it promises. Each was a test until the render-level suite went on 2026-08-30
(#362–#365); the assertions are recorded here because the code still has to honour them:

- **Next is HIDDEN, not disabled** [D11]. A disabled Next is the app telling the learner what it
  is waiting for; an absent one leaves the mark as the only thing on screen to do. It is not in
  the DOM at all — the assertion is `queryByRole('button', { name: next })` **is null**, and a
  second one proves no control is sitting there `disabled` instead.
- **Nothing is preselected.** `src/components/SelfMark.tsx` takes `Mark | null` and has no
  default: the mark is the learner's honest act, and lighting a segment before they touched it
  would be the app answering for them. Unselected is transparent with inherited ink; selected
  fills `--mark-got-bg` / `--mark-miss-bg` with `--mark-fg` (design/tokens.md §6) — green and red
  exist here and in no other component — enforced selector by selector by the stylesheet test, until
  that went too.
- **No input element anywhere in the tree**, in any of the three states (Invariant 6). The recall
  happens in the learner's head, mouth or notebook — the dashed `--border-dashed-world` plate is
  the app saying exactly that — so the design system's own segmented control (a `<label>` around a
  hidden `<input type="radio">`) could not be used: the segments are `<button aria-pressed>` in a
  `role="group"` named by the course's own question.
- **The card writes nothing** (Invariant 4). It emits `onResult({ sentenceId, gotIt })` on Next and
  the parent decides what that costs — `applyMark` for a Review mark, `recordProduction` for a
  Produce one (#95), routed by the session machine (#96). The mark commits on Next, not on the tap,
  so a learner who marks
  "missed", thinks again and marks "got it" sends one result: the one they meant. A test used to
  read both source files and fail on `useAppStore`, `localStorage` or `sessionStorage`; it is one of
  the twenty that went on 2026-08-30.

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
- **No label over the cue.** The prototype writes a 10px uppercase kicker naming the L1; the card
  drew `cueLabel` there as course prose until the Practice audit (2026-09-05) took it off — the
  reveal button already names the other language, and a label naming the learner's own one fifteen
  times a session was the same fact on every card. Comprehension went on printing it, because
  there the cue was the L2; that screen is gone, and the key with it.
- **The 2px cue rule is `var(--tick-height)`**, the design package's only 2px length — the stand-in
  the level strip's bar already takes (#86).
- **The kicker row and the position count are not on the card.** They belong to the session that
  renders it (#96), which is what kept the card reusable across screens.

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
### The session — one queue, one card, and the climb at the end of it

`/practice` is the hub and the immersive session that runs from it (#96, remade by #386–#389; PRD
§8 F3, PRD-design §6.3, flow 3): **up to fifteen cards, every one the same card**, with the
learner's position snapshotted per course from the first one — and **the last card climbs the
rung**.

The card is the cue in the language the learner already speaks, a reveal control, and then the
answer with a got-it / missed self-mark under it. Choosing a mark commits the card and advances.
That is the whole interaction: no phases, no chips, no pager, no cue toggle, no link out.

| file | what it is |
|---|---|
| `src/engine/session.ts` | pure: `planSession({queue, rungIds})` → `{cardIds}` — the whole session, in serving order |
| `src/engine/leitner.ts` | which earlier-rung sentences come back, and what a mark on one costs |
| `startSession` / `recordReview` / `recordProduction` / `setSession` | the store's session actions — the count and the tick, the two marks, and the position |
| `src/screens/PracticeScreen.tsx` | the hub: the rung, how many cards, one button |
| `src/screens/practice/Session.tsx` | the session: the cards, the mark routing, the snapshot |
| `src/screens/practice/SessionSummary.tsx` | the score, the rung climbed, and the way up |

| the hub | a card, revealed | the summary |
|---|---|---|
| [practice-hub-360.png](docs/images/practice-hub-360.png) | [practice-card-360.png](docs/images/practice-card-360.png) | [practice-summary-360.png](docs/images/practice-summary-360.png) |

- **What a session holds.** The current rung's sentences, whole and in the module's own order —
  ten in every shipped module, never trimmed — plus up to **five** from earlier, passed rungs,
  interleaved one after every two rung cards. Fifteen where the ladder holds fifteen, and fewer
  where it does not: **the first rung's session is ten cards**, because nothing has been passed
  behind it. `CARDS_PER_SESSION` and `REVIEWS_PER_SESSION` are the two numbers, both in
  `engine/session.ts`. The plan used to pad a short ladder up to fifteen by repeating the rung
  from its first sentence; those five repeats taught nothing, and once the last card became the
  climb they stood between the learner and a rung they had already worked through.
- **The last card is the pass** (Invariant 1). `Session.tsx` calls `completeRung(courseId, rungId,
  rungIds)` in an effect the moment the session reaches its summary — the module to `passed`, its
  sentences enrolled into review, one write — and the summary names the rung and hands the Ladder
  the unlock beat. A ref and the passed set keep it to one write: the first is what this mount has
  already done (`StrictMode` invokes the effect twice), the second what the ladder says (`passRung`
  throws for a rung that is no longer current). A session run on a finished ladder climbs nothing
  and says nothing about it.
- **The routing contract is the ticket** (PRD §8 F3), and it is decided by the SENTENCE, not by
  where the learner is. A got-it on a sentence of the **current rung** goes to the production
  counters (`recordProduction`) and **never** to the queue; a miss on one writes nothing at all. A
  mark on a sentence from an **earlier rung** goes to the Leitner queue (`recordReview` →
  `applyMark`) and **never** to the counters. They are different numbers answering different
  questions — what is being *built* against what is being *kept* — and crossing them would credit a
  rung with sentences nobody worked. `RevealCard` and `SelfMark` import no store by
  design, so `Session.tsx` is the only place that knows.
- **Marking is idempotent.** A sentence already at the mark writes nothing: the counter is a fact
  about the sentence, not a tally of taps. Counters never decrement, here or anywhere. A miss does
  not cost the rung either — the climb is finishing the session, and every card, marked either
  way, is one card nearer the end of it.
- **One session, counted once.** `startSession` increments `sessionCount`, ticks the queue
  (`tickSession`), plans, and writes the opening snapshot in a single write, and it is the only
  action that does any of it. That is what lossless resume (#99) rests on: restoring a snapshot
  must not charge a learner a session for closing their tab, or bring the whole queue due twice in
  one day's work.
- **The plan is taken once, and the hub previews it with the same function.** `planSession` runs
  against the queue *after* the tick, so the count the hub promises is the session that will
  actually be served — ten on a first rung, fifteen once there is material behind it. Which earlier-rung sentences is `leitner.ts`'s answer: `dueItems` first, in
  its urgency order, and when fewer than five are due the remaining slots take the closest-to-due
  (`reviewPicks`) rather than shortening the session.
- **A first rung is an honest state, not an empty screen.** With nothing passed there is nothing
  earlier to serve, so the session is the rung: ten cards, no empty card, no "nothing due"
  message, and nothing to explain, because there is no second section whose absence needs
  accounting for.
- **The summary is one count** (Invariant 2): how many the learner got, out of how many were
  served, from one template in the course bundle so the numbers sit where the language puts them.
  No duration, no percentage, no date. Under it, the rung the session just climbed and the CTA
  that carries the unlock beat to the Ladder — a statement and a way up, never an offer, because
  the pass has already been written. The gentle elapsed tick (numberless, 2px) is #98's.
- **The snapshot is a position and the cards it indexes** — `{idx, queue}`, written on every
  advance and cleared at the summary — plus a flush on `visibilitychange`/`pagehide` so a page that
  goes away mid-card is not one advance stale (#99). The queue is written down rather than derived
  because an interleaved list depends on what was due the moment the session started, and that
  queue has been ticked and marked since.
- `useModules` (the content layer's many-files loader) fetches whatever modules the cards name —
  five earlier-rung cards routinely come from five different rungs — and a module that will not
  load costs its own card and nothing else.

**What #388 removed, and why it is recorded here.** Practice used to run in two halves: *Review*,
which is what every card now is, and *Read*, which walked the rung showing the L2 sentence outright
with the cue behind a toggle, a Back/Next pager, and an "open full" link out to Sentence Detail.
Two halves meant two chips to name them, a hand-over line between them, and a hub that described
both before the first card. Watched in use that was too many ideas at once — and Read was teaching
backwards besides: it showed the answer and then asked "did you get it?", a verdict with nothing
behind it, which is exactly why #368 had already taken the self-mark off that card and made the
pager write the exit counter instead. Giving every card a cue fixed the cause rather than the
symptom, and the mark went back to being the gate. `ReadPhase.tsx`, `PhaseChips.tsx` and
`ResumeBanner.tsx` are gone; state v11 drops the snapshot's `phase` with them.

Fidelity: the summary's score is a sentence rather than the prototype's
label-and-right-aligned-number, and where the prototype puts an "the exit ritual is open" block
the product states the rung it just climbed.

### The gentle elapsed tick — the only time affordance, and it has no numbers

`src/screens/practice/Tick.tsx` is the 2px hairline at the top of a running session (#98; PRD §2
boundary note, §8 F3, PRD-design §7, design/tokens.md §5): `--tick-track` under `--tick-fill`, filling once
over ~25 minutes on a 1s linear width transition, and then stopping.

| ~5 minutes in | capped, and it stays there | the setting off |
|---|---|---|
| [practice-tick-360.png](docs/images/practice-tick-360.png) | [practice-tick-full-360.png](docs/images/practice-tick-full-360.png) | [practice-tick-off-360.png](docs/images/practice-tick-off-360.png) |

- **It is ambience, not a readout.** The node holds no text in any state, is `aria-hidden`, and has
  no live region — nothing announces or displays how long has passed, how long is left, or how long
  a session should be. A bar you can *read* is a session with a target, and a target is a calendar
  with one day in it (Invariant 2). Its test asserted `textContent === ''` after 13 and after 53
  simulated minutes, and went with the render-level suite on 2026-08-30.
- **`performance.now()`, and no date anywhere.** The clock scan failed on a date constructed
  outside `clock.ts`, and this component kept that guard whole rather than asking for an exemption:
  it reads a **duration** off the monotonic timer — milliseconds since a moment inside this session
  — which cannot answer what day it is and does not move for a clock change, a timezone or a DST
  hop. That argument outlives the scan, which went on 2026-08-30 along with the case proving
  `performance.now()` was not a violation.
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
in spirit (15s, and gone at the summary). The `1s linear` is the one value in `tick.css`
that is not a token — the design package states it in prose only (tokens.md §5) and `tokens.css`
carries just `--motion-tick-cap: 25min` — so it is written once, commented, and recorded for #117.
Verified at 360px in headless Chrome inside a real hi-mr session, driving `performance.now()`
forward: 0% → 21% (5 min) → 98% (24 min) → 100% (31 min, capped), 2px tall, `rgb(231,231,234)`
under `rgb(148,188,227)`, `textContent` empty at every step, and with reduced motion emulated the
computed transition is `none` while the fill still reads 41%.

### Lossless resume — the place is kept, and the session is not re-counted

An interrupted session costs the learner the interruption and nothing else (#99; PRD §8 F3
"immersive mode + lossless resume", §8 F0 AC "resumable session exactly", §17). There is **no draft
text anywhere** in this app — no inputs at all (Invariant 6) — so the snapshot is pure position,
`{idx, queue}` per course, and all an app kill can take is the place.

| file | what it is |
|---|---|
| `src/screens/practice/resume.ts` | pure: `resumePlan(snapshot)` → the cards the interrupted session was serving |
| `src/screens/PracticeScreen.tsx` | the hub's offer: Continue, with "start over" under it |
| `src/screens/practice/Session.tsx` | the flush on `visibilitychange`/`pagehide`, and the `resume` entry point |

- **The stored position is exact, not one card stale.** The snapshot is written from a passive
  effect, and a passive effect is *scheduled*: tap a mark and the OS can background, freeze or
  discard the page before React runs it. `visibilitychange → hidden` and `pagehide` write the
  current position **synchronously**, off a ref a layout effect keeps in step with the commit, and
  between them they fire on every path a phone actually takes (home button, app switcher, tab
  close, bfcache). The tests clear the store behind the session's back and prove the flush puts the
  position back; deleting either listener turns them red.
- **A resume is not a session.** Continue restores the index and the queue and calls
  `startSession` *not at all* — no second `sessionCount`, no second `tickSession`. Charging a
  learner a session for closing their tab, or bringing the whole review queue due twice on one
  sitting's work, is what the single-caller contract (#96) exists to prevent. A test walked
  start → kill → resume → finish asserting `sessionCount === 1` and one tick throughout; it went
  with the suite on 2026-08-30, and the contract is a code rule now. **New
  session** is the quiet line under it: it drops the snapshot and spends a fresh one (2, and a
  second tick).
- **The snapshot's queue IS the resumed plan, verbatim.** The cards were chosen against a queue
  that has since moved — every card marked before the interruption changed a box and a countdown —
  so re-planning would drop answered cards and shift the position under the learner. `resumePlan`
  therefore does not call `planSession` at all. (It used to have to pick per phase; one list has
  one answer — #386.)
- **The snapshot belongs to its course** (Invariant 8). The hub reads `courses[active].session`, so
  switching away and back offers *that* course's own position, untouched — which is exactly where
  the prototype resets instead (§17: do not copy). Nothing on the screen implements it; it falls
  out of state v6's keying.
- **Continue replaces the Start CTA** rather than sitting beside it: two CTAs on one screen is the
  learner deciding which of them means "practise". The prototype makes the same call
  (`hubCta: 'Resume'`) — what it does not do is come back to the card you left. Two strings
  (#71, cut from three by #389, which retired the line describing where the session stopped): a
  label each for the two controls.
- **The elapsed tick still starts fresh** on a resumed session (#98), and that is intended: the
  tick is about the sitting, not the ladder.

Verified live at 360px in headless Chrome against `npm run dev` (hi-mr): card 3 / 15 → tab hidden →
snapshot `{idx: 2, queue: [15 ids]}` → **page killed** → the hub offers "वहीं से आगे बढ़ो" →
Continue → the same card, `sessionCount` still 1 → active course swapped to en-ar and rebooted (its
own hub, its own Start, hi-mr's snapshot untouched) → swapped back → the same offer, the same card,
still one session.

### The exit ritual — retired

For most of the app's life a rung was climbed through a **ritual**, and it was the only unlock
path. It ran in `/ritual` and `/verdict`: two sentences from the module's comprehension pool, read
for meaning, revealed against the scripted answer and self-marked — any "not quite" redrawing two
fresh sentences, unlimited, with nothing counted against the learner — and then a verdict screen
that made the single write. What opened it was the production counters: `exit_available`, every
sentence of the rung self-marked got-it, derived in `engine/exit.ts` and joined to the module's
sentence ids by `screens/useExitAvailable.ts`.

It had shrunk twice before it went. `/ritual` first opened on a three-step arc — **write** the 11th
sentence in a notebook, **check** it yourself, **confirm** by holding a control for ~900ms — and
handed over to comprehension as "part 2"; #348 retired the check step and #349 retired notebook
writing, taking the write step, the hold, `RitualScreen.tsx` and `HoldToConfirm.tsx` with them.
#402 took the last two vestiges, a `2 / 2 ·` part count and the interstitial between a missed round
and the fresh one, and #400 removed the Verdict's receipt line for a sentence the learner was no
longer asked to write.

**Now the session is the ritual.** Finishing a Practice session climbs the rung, on its last card
(`screens/practice/Session.tsx` → `completeRung`), so there is no gate to open and no second screen
to open it on. What went with it: both routes and their screens, `engine/comprehension.ts`, the
`exitAvailable` predicate and the `exit_available` / `exit_ready` states it fed, the `handover` /
`cameFrom` hand-over tokens, and the ten `strings.json` keys those screens rendered. What stayed:
the counters, as a record rather than a door; the comprehension pool in the authored content and
the shipped module files, because it is authored work across ten courses and retiring it is a
content change; and the two lines the ritual ended on, which the summary now says
(`practice.climbedRung`, `practice.climbToLadder`).

### The pass and the unlock beat — one write, and the one celebration

`completeRung` is **the only place in the app a module passes** (#103; PRD §8 F5, F1), and the
session's last card is its only caller.

| file | what it is |
|---|---|
| `src/screens/practice/Session.tsx` | the effect that calls it, guarded by a ref and by the passed set |
| `src/state/store.ts` — `completeRung` | pass + enrol, in one persisted document |
| `src/screens/practice/SessionSummary.tsx` | the rung named, and the CTA that carries the flag |
| `src/screens/ladder/unlock-beat.css` | the beat: 1000ms, accent-200 flash, 10px settle, once |
| `src/shell/routes.tsx` — `passedRung`/`justPassed` | the one-shot navigation flag |

[unlock-beat-360.png](docs/images/unlock-beat-360.png) ·
[unlock-settled-360.png](docs/images/unlock-settled-360.png) ·
[unseal-beat-360.png](docs/images/unseal-beat-360.png)
— the beat landing on the rung that just opened, the same card a second later, and the
level-boundary beat on the cell that unsealed plus its first rung, all at 360px.

- **One action, one write, and the asymmetry is the reason.** `completeRung(courseId, moduleId,
  sentenceIds, clock?)` **delegates the pass to `passRung`** — still the only writer of `modules`
  (Invariant 1) — and hands it the enrolment to carry, so both land in the same `set` and the same
  `localStorage` document. A document holding a passed module whose sentences never enrolled would
  be **unrecoverable**: `passRung` refuses a rung that is no longer current, so those sentences
  would never come up for review again. The reverse costs nothing — `enrol` is idempotent (#92).
  `store.test.ts` counts the `setItem` calls (exactly one) and re-reads every document ever
  written, asserting none holds a pass without its enrolment.
- **The pass happens when the session ends, not on the button.** The work is what earned it, and a
  learner who closes the app on the summary has still climbed the rung. The CTA's job is the
  celebration.
- **It cannot write twice.** A ref holds what this mount has already done — under `StrictMode` the
  effect is invoked twice against one render, where asking the store would ask it before it had
  been told — and the passed set holds what the ladder says, because `passRung` throws for a rung
  that is no longer current. A session on a finished ladder climbs nothing and says nothing.
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

### The fonts — bundled, because offline is the product

Mukta (all Devanagari), Barlow (body/UI) and Barlow Condensed (headings, kickers, wordmark) are
self-hosted via `@fontsource`, imported one line per weight in `src/main.tsx` (#85, [D15]). The
prototype pulls Mukta off Google Fonts; a PWA that works on a plane cannot
(`design/pwa-checklist.md` §2). `vite.config.ts` strips the `.woff` fallback @fontsource writes
beside each `.woff2`, so `dist/` carries woff2 only — the service worker precaches all of it.

**The guard for that is gone, and this is the failure mode it covered.** A weight the ramp asks for
and the bundle lacks is not an error: the browser synthesises the face and nobody is told. The test
read the `--text-*` shorthands out of `design/tokens.css`, derived every (family, weight) the
product renders, and failed naming any that `main.tsx` did not import — that is how Barlow
Condensed **700** got bundled, `--text-brand` being the wordmark at 700. It was deleted on
2026-08-30 (#370), so a missing weight now ships silently and is caught, if at all, by eye.

**`#/dev/type`** is the font specimen: the Devanagari matrix at 18/22/26/32px × 400–700, the
romanization diacritics, the kickers. It is **development only** — `src/dev/typeRoute.tsx`
imports it dynamically inside an `import.meta.env.DEV` branch, so no chunk, no CSS and no
Devanagari reaches `dist/` — and it was the single entry in the shell-purity scan's allowlist.

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

- **The manifest is the checklist.** `design/pwa-checklist.md` §3.1 prints the exact JSON, and a
  test parsed that block out of the checklist and deep-equalled it against what the build shipped —
  deleted on 2026-08-30 (#370), so the two can now drift apart without a run going red. The name
  comes from `src/brand.ts`, both colours and `<meta name="theme-color">` from `design/tokens.css`
  `--color-bg` (`tools/tokens.ts`) — a manifest cannot drift from the app's own paper ground.
- **The icons are the header mark, read not redrawn.** `scripts/generate-icons.ts` reads
  `src/shell/RailsMark.tsx`, lifts its five shapes, resolves `currentColor` and the accent token
  out of `design/tokens.css`, and rasterises 192 / 512 / maskable-512 / apple-touch-180 /
  favicon-32 onto the paper ground (`npm run icons:build`; PNGs committed). The maskable safe
  zone is arithmetic in `inkBox`, not eyeballed.
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
  **GitHub Actions** (no `gh-pages` branch, nothing committed). There is no CI workflow beside it —
  `scripts/verify.sh`, run locally before the merge, is the gate; the deploy workflow publishes and
  does not re-verify.
- **How to redeploy:** Actions → **Deploy** → *Run workflow* (`workflow_dispatch`). Same commit,
  fresh artifact — no empty commit needed.
- **The sub-path is a build input, not a constant.** A project site serves from `/rung/`, so
  `vite.config.ts` reads `base: process.env.VITE_BASE ?? '/'` and everything downstream follows it:
  the content fetches through `import.meta.env.BASE_URL`, `index.html`'s hrefs through Vite's own
  rewrite, and the manifest `id`/`start_url`/icons plus the worker's registration scope through
  `tools/pwa.ts`. Default is `/`, so `npm run dev` and `npm run preview` are unchanged. HashRouter
  keeps every route in the fragment, so there is no 404-rewrite to configure.
- **The live site ships every authored module, and nothing that has not been reviewed.** The deploy
  builds strict content; until 2026-08-13 that was an empty ladder and the honest "no course
  content" boot screen, because no module had cleared the gate. Ten courses now ship — **460
  modules**: fifty each on hi-mr, en-es, en-ar, hi-en, en-ru, en-it, en-fr, en-de and en-ko, and
  ten on en-sa, whose L1 is all there is of it (#611) — every one
  carrying `verified: true` on the owner's explicit authority, signed `verifiedBy` as an LLM review.
  The native-speaker gate (#64, #110, #111) remains unmet and open. Deploying **dev** content to
  make the demo look fuller would still be lying to the one person this is for.

## How work happens

- Every change is a **GitHub issue**, worked on a short-lived branch off `main` and merged straight
  into it — **no pull requests**. The commit message carries `Closes #<N>`, so the issue closes when
  the commit lands. Delete the branch after merging; `main` is always deployable.
- Issues live in milestones **P0–P5** (+ **Design follow-ups**, Rishabh). Labels:
  one `epic:*` + `type:*` + `phase:*` per issue (see design/github-issues-checklist.md).
- **Picking your next ticket:** open issues in the lowest unfinished milestone
  → no assignee → every issue linked under "Depends on" is closed → assign
  yourself, branch, go.
- The **7 product invariants** (identical in both PRDs, §2) are contractual.
  Politely reject scope creep: no audio, no runtime AI, no backend, no
  gamification, no calendar framing.

## Quick facts

- Stack: Vite + React + TypeScript PWA; all state in `localStorage`; content is static JSON,
  LLM-reviewed on the owner's authority — the native-speaker gate is a stricter bar and is unmet.
  Details and rationale: `docs/01-plan.md`.
- The app only ever gives deterministic, pre-authored feedback (Invariant 4).
  Novel sentences are verified by humans via a designed copy-paste hand-off.
