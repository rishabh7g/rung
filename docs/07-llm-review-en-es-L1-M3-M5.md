# LLM review — en-es L1-M3, L1-M4 and L1-M5

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Opus 5), which
does not speak Spanish natively and cannot hear anything. `verified: true` on all three modules
rests on the repo owner's authority, exactly as hi-mr's flip did in PR #190 and as M1/M2's did in
PR #206; `verifiedBy` says so in words. **No native Spanish gate exists for this course**, and the
open-questions list at the bottom is the outstanding work.

Nothing here reaches a learner yet: `content/courses.json` still carries `fixture: true` on the
en-es row, so the strict build skips the course entirely (#195 is the issue that flips it).

This is the sibling of `docs/07-llm-review-en-es-L1-M1-M2.md` and follows its method exactly:
author strictly in ladder order through the #109 CLI, rebuild the index between modules, then walk
every pool token and every sentence token through the real engine and read out the row the Why
panel would actually render.

Provenance, for the record: these three modules say
`"Claude Opus 5 — LLM review, authorised by repo owner"`, the wording issue #193 and
`content/schema/module.schema.json` both give, and the name of the model that did the work.
hi-mr's files say `"Fable (Claude Fable 5)"`; PR #206's review flagged the difference for a later
one-line normalisation and this pass deliberately does not touch it.

## What was authored

| | L1-M3 Needs and wants | L1-M4 My day | L1-M5 Yesterday |
|---|---|---|---|
| sentences | 10 | 10 | 10 |
| new word rows | 15 of 25 allowed | 19 of 25 | 12 of 25 |
| pool items | 8 | 8 | 8 |
| module rules | 10 | 10 | 11 |
| words per sentence | 2–5 (bound 6) | 4–6 (bound 6) | 3–6 (bound 7) |
| enrichment | full (required through M3) | full (optional — shipped anyway) | full |
| prerequisites | `["L1-M2"]` | `["L1-M3"]` | `["L1-M4"]` |
| cumulative index after it | 67 surfaces | 91 | 103 |

**M4 and M5 ship full enrichment even though the validator stops requiring it at M3.** All ten
hi-mr modules carry all five blocks on all ten sentences, and trimming them here would have been a
way of hiding the payload number below rather than reporting it.

Each module was generated from `tools/course-briefs.ts` (#191) through
`npm run content:prompt -- en-es L1-M<n>`, with `npm run content:build -- --with-unverified
--with-fixtures` re-run in between, so M4's prompt saw M3's real 67-surface inventory and M5's saw
M4's 91.

## The ratified vocabulary decision: no car in L1

PR #206's open question 1 flagged `coche` vs `carro`/`auto` as needing a ruling before M3, because
M3's brief writes `un coche rojo` as its adjective-agreement example. **Ruled here, and closed as a
decision rather than left open:**

- **The course stays pan-Hispanic** — no `vosotros` anywhere, no region-only vocabulary, both norms
  named where they differ. That is the owner's standing decision and these three modules hold it.
- **The fork is avoided rather than picked.** No car is named in M3, M4 or M5. The
  adjective-agreement drill the brief wanted from `un coche rojo` is carried by `una manzana roja`
  (the -o/-a adjective), `el agua fría` (agreement proving a noun's gender against a misleading
  article) and `una sopa caliente` (the -e adjective that has no feminine form at all) — three
  cases where the brief's example had one, and not one of them regional.
- **If a later module must name a car, it is `el coche`** — the widest-recognised form, standard in
  Spain and understood everywhere, and the one the brief itself already wrote. A row that ever
  teaches it should name `el carro` and `el auto` in its note as the local everyday words, the way
  `gracias`' sound note names both `s` and `th`. This is a ratified default, not an open question.

Other regional calls in these three modules were handled the same way — **name both, ban neither**:
`por la mañana`'s row says `en la mañana` is also said in much of Latin America (so the M4 mistake
block picks the accent error `cómo`/`como` instead of a false regionalism), and `Ayer estaba
ocupado`'s trap says `Ayer estuve ocupado` is also said and what it changes. That is the
`buen día` correction from the M1–M2 review, applied before the bug rather than after.

## AC 1 — every pool token lands on the RIGHT row

Run against the emitted `public/content/en-es/index/L1-M<n>.json` through the real engine
(`resolveSentence` → `matchSurfaces` + `normalizeSurface`), resolving each hit back to
`modules/<id>.json → sentences[<sid>].deconstruction.words[<idx>]` — the exact row `WhyPanel`
renders through `WhyRow`. **24 pool items, 183 spans across pools and sentences, 0 unresolved, 0
wrong-word landings.** Three forms-hits, all shapes of the same word, listed and checked below.

A second, stricter check was run alongside it: for every one of the 46 new word rows, the index
entry for its `display` and for every entry of its `forms` list points **back at that row**. No new
row is shadowed by an earlier surface, and no `forms` entry steals a key another row owns.

### L1-M3 — 67 surfaces, maxSpan 2

| item | display | tokens → row |
|---|---|---|
| C01 | Quiero una manzana | `quiero` → Quiero (M1) · `una` → una · `manzana` → manzana |
| C02 | No quiero leche | `no` → No (M2) · `quiero` → Quiero (M1) · `leche` → leche |
| C03 | Sí, quiero un café | `sí` → Sí (M2) · `quiero` → Quiero (M1) · `un` → un · `café` → café (M1) |
| C04 | Necesito un libro | `necesito` → Necesito · `un` → un · `libro` → **libros** (M1-S06 #2) *forms-hit* |
| C05 | ¿Quieres comer? | `quieres` → quieres · `comer` → comer |
| C06 | Quiero estudiar mucho | `quiero` → Quiero (M1) · `estudiar` → estudiar · `mucho` → mucho (M1) |
| C07 | No quiero sopa fría | `no` → No (M2) · `quiero` → Quiero (M1) · `sopa` → sopa · `fría` → fría |
| C08 | ¿Quieres un café con leche? | `quieres` → quieres · `un` → un · `café` → café (M1) · `con` → con · `leche` → leche |

### L1-M4 — 91 surfaces, maxSpan 3

| item | display | tokens → row |
|---|---|---|
| C01 | Hablo español | `hablo` → Hablo · `español` → español (M1) |
| C02 | Como pan por la mañana | `como` → como · `pan` → pan (M3) · `por la mañana` → por la mañana (one surface) |
| C03 | Veo a mi hermana | `veo` → Veo · `a` → a · `mi` → mi · `hermana` → hermana |
| C04 | ¿A qué hora trabajas? | `a` → a · `qué` → qué · `hora` → hora · `trabajas` → Trabajas |
| C05 | Trabajo por la noche | `trabajo` → Trabajo · `por la noche` → por la noche |
| C06 | Estudio español todos los días | `estudio` → estudio · `español` → español (M1) · `todos los días` → todos los días |
| C07 | No trabajo por la tarde | `no` → No (M2) · `trabajo` → Trabajo · `por la tarde` → por la tarde |
| C08 | Quiero comer a las ocho | `quiero` → Quiero (M1) · `comer` → comer (M3) · `a` → a · `las ocho` → las ocho |

### L1-M5 — 103 surfaces, maxSpan 3

| item | display | tokens → row |
|---|---|---|
| C01 | Ayer comí una manzana | `ayer` → Ayer · `comí` → comí · `una` → una (M3) · `manzana` → manzana (M3) |
| C02 | Ayer no comí nada | `ayer` → Ayer · `no` → No (M2) · `comí` → comí · `nada` → nada (M3) |
| C03 | Ayer hablé con Ana | `ayer` → Ayer · `hablé` → hablé · `con` → con (M3) · `ana` → Ana (M2) |
| C04 | Antes comía mucho pan | `antes` → Antes · `comía` → comía · `mucho` → mucho (M1) · `pan` → pan (M3) |
| C05 | Ayer estaba ocupada | `ayer` → Ayer · `estaba` → estaba · `ocupada` → **ocupado** (M2-S05 #0) *forms-hit* |
| C06 | Ayer fui a India | `ayer` → Ayer · `fui` → fui · `a` → a (M4) · `india` → India (M1) |
| C07 | Antes era estudiante de música | `antes` → Antes · `era` → era · `estudiante` → estudiante (M1) · `de` → de (M1) · `música` → música (M1) |
| C08 | Ayer no trabajé por la mañana | `ayer` → Ayer · `no` → No (M2) · `trabajé` → trabajé · `por la mañana` → por la mañana (M4) |

### The three forms-hits, checked one by one

A forms-hit means the Why panel shows a row headed by a different string, so the row's note has to
be true of the surface the learner tapped. All three are shapes of the SAME word — never a cousin,
a synonym or a sibling set, which is the bug class that shipped four times in hi-mr
(`docs/07-llm-review-L1-M6-M10.md`: M6-1, M7-2, M7-3, M8-1).

1. **`libro`** (M3-C04) → row **libros** / "books", M1-S06 #2. Note: *"Masculine: el libro (one) ·
   los libros (more than one)."* Right lemma, both numbers stated. M1's own review flagged this
   surface as a note for M3's author; it lands correctly, so M3 spends no row on it.
2. **`ocupada`** (M5-C05) → row **ocupado** / "busy", M2-S05 #0. The note IS the agreement law:
   *"ocupado when that person is male, ocupada when she is female."* M5-S10 adds the past-tense
   half of the same law in rule 8 and shows `Ayer estaba ocupada` as its variation.
3. **`te levantas`** (M4-S07, a sentence rather than a pool item) → row **Me levanto** / "I get up",
   M4-S02 #0. Same reflexive verb, and the note names the tapped form explicitly: *"me levanto (I
   get up) · te levantas (you get up) · se levanta (he or she gets up)."* This is the `se llama`
   precedent from M1 and is kept deliberately: no later module claims a levantarse form.

Every sentence token of all 30 sentences resolves too, and **no sentence depends on a word row that
comes later in its own module.**

## AC 2 — the rules are true before they are memorable

The briefs name the memorable-and-false rule each module attracts (`course-briefs.ts` rule 2).
What shipped instead:

- **"-o is masculine, -a is feminine"** → M3 rule 4 makes gender a property of the noun and names
  four counterexamples in the rule itself (`la leche`, `el día`, `la mano`, `el problema`); M3 rule
  5 states the `el agua` law completely — the article dodges two stressed a's, **the noun stays
  feminine and the adjective proves it**, and the plural is `las aguas`.
- **Agreement named for the wrong agreer** — the defect the third Marathi review corrected three
  times — → M3 rule 3 says the adjective agrees with **the noun it describes**, and the `roja` row
  spells it out: *"the -a here belongs to the apple, not to whoever is speaking."* M5 rule 8 says
  **SUBJECT** for the predicate case and gives `¿Estabas ocupada?` — asked of a woman — as the
  instance that catches a "speaker"-shaped rule.
- **"the personal a means to"** → M4 rule 3 says what it MARKS: a specific person in the object
  seat, translated as nothing, and *a thing never takes it* (`Veo la casa`). The `a` row itself is
  written for all three seats it will ever be tapped in.
- **"the preterite is for completed actions"** → M5 rule 0 refuses the completion framing outright:
  *both are finished*, and the choice is how the event is PRESENTED — one bounded whole against an
  open frame. Rule 4 then states the `ayer`/`antes` tendency **and names its own exception**
  (`Ayer estaba ocupado`), which is the sentence the module actually ships as S10.
- **"-ré is the future"-shaped over-claiming** was avoided in M5's neighbour rules too: rule 6 says
  the strong preterites are learned whole and points at the one thing that IS regular about them
  (no written accent); rule 5 says `fui` is `ser` AND `ir` and that *what follows decides*.

## Index seams decided here (they bind M6–M10)

The index is cumulative and first-occurrence-wins, so these are load-bearing for every later
author. M1/M2 left three seams open on purpose; all three are honoured, and equivalents are left
for the modules ahead.

**Honoured from M1/M2**

- `quieres` had a free row waiting because M1's `Quiero` shipped `forms: []`. M3 takes it, and
  keeps the same discipline: `quieres` ships `forms: []` too, so `quiere` stays unclaimed rather
  than resolving to a row headed "you want".
- `no` was already written for both its seats, so M3 spends nothing on it and simply uses it
  (`No quiero pan`, `No quiero nada`).
- `libro` and `película`, the two shapes reachable only through a `forms` list, were flagged for
  M3's author. `libro` is used in a pool item and lands correctly; neither needed its own row.

**New seams, decided here**

- **Verb paradigms are still NOT swept into one `forms` list.** Every person of every verb taught
  here is its own exactly-headed row or is left unclaimed: `hablo`/`trabajo`/`trabajas`,
  `como`/`comer`, `estudiar`/`estudio`/`estudié`, `comí`/`comía`, `hice`/`hiciste`. The one
  exception is the reflexive `Me levanto`, whose three persons ARE its `forms` — the `Me llamo`
  precedent, and no later module wants `te levantas`.
- **`a` is written for all its seats now** (M4-S02), because M6's plan `a` and M7's destination `a`
  and `al` can never own the surface. The row says: at (a clock time) · the personal a, translated
  as nothing · from M6, a destination. M5-S06's `Ayer fui a México` is the destination seat already
  in use, and it resolves to that row.
- **The time-of-day phrases are three separate three-token surfaces** — `por la mañana`,
  `por la tarde`, `por la noche` — with `forms: []` each, because they are siblings and not shapes
  of one another (`Buenos días`' lesson). That keeps **bare `mañana` free for M6** ("tomorrow", and
  the `por la mañana` row says so out loud) and **bare `por` free for M9's `por qué`/`por eso`**.
- **`las ocho` is one two-token surface, so bare `ocho` stays free for M8**, which owns the
  numbers. The row says as much. `todos los días` is one three-token surface for the same reason —
  bare `todos` and bare `días` stay unclaimed — and it is what pushes the course's `maxSpan` to 3.
- **`un` and `una` are two rows with `forms: []`**, mirroring M1's four separate article rows. That
  leaves bare **`uno` free for M8**, whose brief teaches `un libro` / `una mesa` / `Quiero uno`.
- **`hermana`'s `forms` list is `["hermana", "hermanas"]` and stops there.** `hermano` is a
  different word — brother — not another ending of this one, and putting it in `forms` would be
  exactly the "set of siblings" bug; the note names it in prose instead.
- **`en` is deliberately not taught**, so M7 keeps its own preposition row (`está en la mesa`), and
  `mesa` is likewise left alone. `cansado` is still unclaimed for M9 — M5-S10 uses M2's `ocupado`
  for its background state rather than borrowing M9's adjective. `y` and `pero` are untouched for
  M10.
- **Accent pairs kept apart, as the briefs require:** `como` (M4) beside M2's `cómo`, `qué` (M4)
  with `que` left free, and M5's whole preterite set (`hablé`, `trabajé`, `estudié`, `comí`) which
  differs from the present only by the mark. Every one of them indexes separately, which
  `src/engine/surface.ts` guarantees by folding case but keeping diacritics.
- **Still unclaimed after M5, for the modules the briefs assign them to:** `mañana`, `por`, `ir`
  and its forms, `en`, `mesa`, `uno` and the numbers, `por favor`, `cansado`, `porque` / `por qué`
  / `por eso`, `que`, `si`, `y`, `pero`, `también`, `tarde` (the bare noun — only `por la tarde` is
  indexed).

## Corrections applied during the pass

Self-review of the drafts, plus the audit above, changed six things:

1. **M4-S03's mistake block originally read `En la mañana como pan`.** `en la mañana` is standard
   in much of Latin America — that is the `buen día` defect over again. The mistake is now the
   accent error (`cómo` for `como`), and the row note names the regional variant as a variant.
2. **M5-S10's trap originally said `Ayer estuve ocupado` was wrong.** It is not; it packages the
   day as one closed block. The trap now names it and says what it changes.
3. **`hermano` was in `hermana`'s `forms` list** in the first draft — a different word, and exactly
   the wrong-word-row bug. Removed to prose.
4. **`comes` and `quiere` were nearly swept into `como`'s and `quieres`' `forms`.** Both would have
   answered a later tap with a row headed for the wrong person. They stay unclaimed.
5. **M3's `frío` and `rojo` rows are headed by the shape the sentence shows** (`fría`, `roja`) with
   all four shapes in `forms`, following M1's `libros` and `películas`. The notes state the
   agreement law, so any of the four resolves to a true note.
6. **M5-S05's mistake was going to be `¿Qué hacías ayer?`** — which is grammatical, not a mistake.
   It is now the pro-drop slip `¿Qué tú hiciste ayer?`, which M1 already established as a mistake
   the module may name.

## Verification

- `npm run content:validate` → **CONTENT 16/16 ok** (no `fixture` flag on any of the three)
- `npm run content:build -- --with-unverified --with-fixtures` → `en-es: 5 modules (L1-M1..M5)`,
  indexes 67 → 91 → 103 surfaces
- `npx vitest run tools/validate.test.ts tools/content-build.test.ts src/course/types.test.ts` →
  **113/113 green**; the full suite → **1128/1128 green**
- `npm run typecheck`, `npx eslint .`, `npx prettier --check .` → clean
- Pinned inventories updated: `MODULE_FILES` in `src/course/types.test.ts` (and its title), and in
  `tools/content-build.test.ts` the shipped map, the summary line and the emitted-file list
- `content/en-es/levels.json`: M3, M4 and M5 gain `hasContent: true` and lose `draft`; the L1
  `draftNote` now says M1–M5 are authored
- **Live dev-build smoke**, headless Chromium against `npm run dev` with the course switched to
  en-es: the ladder lists all ten rungs with M1–M5 real; **the M3, M4 and M5 module lists each
  render all 10 sentences**; Sentence Detail for `L1-M4-S02` and `L1-M5-S08` renders the frozen
  order (hero → gloss → word-for-word → word rows → rules → trap → sound → variations → mistake →
  usage → mnemonic); a **why tap in Practice's Read phase** on `Ayer comí pan` opens three rows —
  `Ayer` and `comí` from M5, `pan` reaching back to **M3's row** through the cumulative index. No
  console errors.

### Payload — the dev build is now OVER the limit, and is left that way

Measured on this branch, both builds run end to end:

| build | fonts | js gzip | total gzip | limit |
|---|---|---|---|---|
| strict (what ships today) | 361.2 KiB | 94.2 KiB | **548.3 KiB** | 580 KiB — ok, **unchanged** |
| dev, before these modules | 367.5 KiB | 94.5 KiB | **578.3 KiB** | 580 KiB — ok, 1.7 KiB spare |
| dev, with M3–M5 | 367.8 KiB | 94.6 KiB | **597.7 KiB** | 580 KiB — **OVER by 17.7 KiB** |

- **The strict build is byte-for-byte the number PR #206 reported** (548.3 KiB), because en-es is
  still a fixture course at the course level and the strict build skips it. Nothing shipping to a
  learner has changed, and `scripts/verify.sh` — which meters the strict `dist/` — stays green.
- **The dev build blows the `total` budget**: +19.4 KiB for three modules, of which only **+0.3 KiB
  is fonts** (Latin coverage was nearly saturated after M1/M2 — the remaining ~19 KiB is the JSON
  itself). `npm run budget` on a dev `dist/` prints
  `BUDGET total 597.7 KiB gzip > 580.0 KiB OVER — 63 files` and exits non-zero.
- **The limit was NOT raised to make room, and enrichment was NOT trimmed to fit.** Raising it is
  the remedy already spent once on the Devanagari subsets (`tools/payload-budget.ts` header), and
  trimming M4/M5's optional enrichment would have bought the headroom by making the content worse.
  The honest read is that summing every course in one `dist/` is the wrong measurement for a
  three-course product: a learner downloads ONE course, and the strict build proves that number is
  548.3 KiB. **Per-course payload measurement is the fix, and it belongs to the budget issue** —
  M6–M10 will add roughly another 30 KiB of dev-build JSON, so it needs settling before #195 flips
  en-es live.

## Open questions for a native pass

Nothing below has been changed in the content. These are the calls where guessing would be worse
than asking — dialect, register, naturalness, and every phonetic claim. The 15 questions of the
M1–M2 review still stand; **question 1 there (the vocabulary fork) is closed by the ratified
decision at the top of this file.** These are the new ones.

### Naturalness and register

1. **`Quiero una sopa caliente`** (M3-S06). Grammatical, and it does the -e-adjective job no other
   pairing did as cleanly — but does a waiter hear `una sopa` for a bowl of soup, or is
   `un plato de sopa` / bare `sopa` what a person says?
2. **`Quiero un café con leche`** (M3-S02) is drilled as the everyday order. Is `un café con leche`
   right across the Spanish-speaking world, or is it a Spain-shaped order beside `un cortado`, `un
   café con leche` in Mexico, `un cortado`/`café con leche` in the Southern Cone?
3. **`Necesito agua fría`** (M3-S05) was chosen so the `el agua fría` rule could be stated on a
   real want. Is `necesitar` natural for a glass of water, or does it sound like an emergency where
   a native would say `¿Me pones un agua?`
4. **`Quiero una manzana roja`** (M3-S04) — is a colour adjective on fruit a normal thing to say, or
   only a textbook thing? If it is only a textbook thing, is there a better first noun+adjective
   pair that is still region-free?
5. **`No quiero nada`** as a whole-sentence refusal (M3-S10). Blunt or normal? The usage line calls
   it "turning everything down at once"; a native ear should say whether `No, gracias` alone is
   what people actually use and `No quiero nada` reads as curt.
6. **`Vivo con mi hermana`** (M4-S05). Chosen over `vivo en …` to leave M7 the preposition `en`.
   Is it a natural thing for a beginner to say, and is `hermana` the right first family word (vs
   `madre`, `amigo`)?
7. **`Trabajo por la tarde` / `¿Trabajas por la mañana?`** — is `por la tarde` the phrase a native
   reaches for about work shifts, or would `en la tarde` / `de tarde` / `por las tardes` be more
   idiomatic for a repeated habit? The plural `por las mañanas` for habits is not taught at all;
   should it be?
8. **`Me levanto a las ocho`** teaches one clock time. Does the module need `y media` / `en punto`
   to sound like a person, or is the bare hour the right first taste?
9. **`Ayer fui a México`** (M5-S06) — is a country a natural destination for "yesterday I went", or
   does it strain credibility next to `a la tienda`? The module cannot use `la tienda` (M7/M8 own
   the shop vocabulary), so the frame was chosen for the `fui` = ser/ir contrast.
10. **`Antes era estudiante`** vs `Antes fui estudiante` (M5-S09 and its trap). The trap claims the
    preterite frames the whole stretch as a closed chapter. Is that the distinction a native would
    actually draw, or would they call `fui estudiante` simply the normal way to say it?
11. **`Ayer estaba ocupado`** (M5-S10). The trap admits `Ayer estuve ocupado`. Which one does a
    native produce first for a whole day of being busy — and is the imperfect the right thing to
    drill at L1, or should the preterite lead and the imperfect be the footnote?
12. **`hice` glossed "I did · I made"** and used as `Ayer no hice nada`. Is the negative answer the
    most useful first `hacer`, or should the module have spent the row on an affirmative
    (`Hice la comida`)?

### Dialect and orthography

13. **`en la mañana` beside `por la mañana`** (M4-S03's row note). The note says the `en` form is
    also said in much of Latin America and that `por` is understood everywhere. Is that the right
    balance for a beginner, or should a pan-Hispanic course teach `en la mañana` and mention `por`?
14. **`la manzana`'s `z`** (M3-S04's sound note) is described the same way `gracias`' `c` is — an
    `s` across Latin America, a `th` in most of Spain. Same question as M1–M2's open question 2:
    name both, or teach one?
15. **`caliente` as the -e adjective.** Fine everywhere as far as this author knows, but `caliente`
    carries a slang sense in several varieties. Is it safe on a food noun at L1, or does the course
    want `grande` for the invariable-adjective lesson?
16. **`nada` as "anything"** in the gloss (`nothing · anything`). Is that two-headed cue clearer
    than a single "nothing", or does it invite `Quiero nada`?

### Sound notes — nothing here can be heard by the author

17. Every `sound` line in these three modules is derived from Spanish orthography and standard
    descriptions rather than from listening: the soft intervocalic `d` (`nada`) and `b`
    (`estaba`), the `v` described as "between an English b and v" (`vivo`, `levanto`), the `j` of
    `trabajo` as the `ch` of Scottish "loch", the `ñ` of `mañana`, the `ie` glide of `caliente`,
    the single-tap `r` (`comer`, `era`, `temprano`), the silent `h` (`hablo`, `hora`, `hice`), and
    every stress claim behind every written accent (`comí`, `hablé`, `estudié`, `comía`, `fría`).
    The stress claims are the safest; the consonant descriptions are the least. A native ear should
    sample them.
18. **`fui` described as one syllable, "FWEE".** True in most speech; is it worth saying, or does it
    invite an English "fwee" that lands wrong?

### Pedagogy calls the owner decides

19. **M5 declares `allowedTenses: ["preterite", "imperfect"]`** where hi-mr's M5 says
    `["simple_past"]`. The Spanish names are accurate and the field is descriptive and unrendered,
    but if the owner wants one vocabulary across courses this is the place to say so.
20. **M4's three verb classes are taught in the "I" form only**, plus two `tú` forms (`te levantas`,
    `trabajas`). No `nosotros` and no third person as a sentence subject. Right scope for "my day",
    or does a learner need `mi hermana trabaja` before M5 asks them to talk about yesterday?
21. **M5 teaches the imperfect through three verbs only** (`comía`, `era`, `estaba`) against seven
    preterites. The brief says lead with the preterite; is 3:7 the right ratio, or does the
    imperfect need a fourth to stop looking like an exception?
22. **Enrichment on M4 and M5 is full, though the validator stops requiring it at M3.** That is a
    deliberate quality call which costs payload (see above). If the budget conversation lands on
    "trim the dev build", these are the twenty blocks that would go first.
