# LLM review — en-es, the surface pass (gap + paradigms)

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Opus 5), which
does not speak Spanish natively and cannot hear anything. `verified: true` on the five modules this
pass touched — L1-M1, L1-M2, L1-M5, L1-M6, L1-M10 — still rests on the repo owner's authority,
exactly as the three earlier en-es reviews say; each of the five was re-read whole here and now
carries `verifiedAt: "2026-08-24"`. **No native Spanish gate exists for this course**, and the open
questions at the bottom join the 67 already outstanding in
`docs/07-llm-review-en-es-L1-M1-M2.md`, `docs/07-llm-review-en-es-L1-M3-M5.md` and
`docs/07-llm-review-en-es-L1-M6-M10.md`.

This is issue **#281** and it changes no sentence, no word row and no rule — only `forms` lists,
the notes that have to be true of them, and one `cue`. The three earlier reviews audited what the
course *teaches*; this one audits what the course *shows*: the variation lines under every sentence,
which the build deliberately does not police (a variation may carry an untaught token, and the Why
panel drops what it cannot resolve). Thirteen surfaces were displayed and taught nowhere, and two
modules shipped a `forms: []` on every row.

## What was wrong, and what it is now

Method: the emitted index for **the module the line appears in** (not the last one — a variation a
learner reads in M1 has only M1's cumulative index behind it), walked through the real engine
(`matchSurfaces` + `normalizeSurface`, `src/engine/surface.ts`), resolving each hit back to the row
`WhyPanel`/`WhyRow` would render.

| surface | shown in | now resolves to | how |
|---|---|---|---|
| `te` + `gusta` | M1-S04, M1-S05 variations | **Me gusta** (M1-S04 #0) | the frame is one surface: `te gusta` joins `Me gusta`'s forms, with `le gusta` |
| `gustan` (+ `te`) | M1-S06 variation | **Me gustan** (M1-S06 #0) | `te gustan` · `le gustan` |
| `quiere` | M1-S09, M3-S09 variations | **Quiero** (M1-S08 #0) | `forms: ["Quiero", "quiere"]` — `quieres` stays M3's own row |
| `española` | M1-S05 variation | **español** (M1-S03 #1) | `forms: ["español", "española"]` — the adjective agreeing |
| `están` | M7-S01, M7-S02 variations | **está** (M2-S06 #0) | `forms: ["está", "están"]` |
| `son` | M8-S09 variation | **es** (M2-S09 #0) | `forms: ["es", "son"]` |
| `trabajaré` | M6-S07 variation | **trabajar** (M6-S01 #2) | `forms: ["trabajar", "trabajaré"]` — the future is the infinitive plus an ending |
| `hablar` | M6-S07 variation | **hablaré** (M6-S07 #0) | `forms: ["hablar", "hablaré", "hablarás", "hablará"]` — argued below |
| `hasta` | M10-S08 variation | **hasta mañana** (M10-S08 #1) | the whole goodbye is the surface: `hasta luego` · `hasta el sábado` |
| `profesor` | M1-S03 variation | — | **exemption 1** |
| `buenas` + `tardes` | M2-S02 variation | — | **exemption 2** |
| `hermano` | M4-S05 variation | — | **exemption 3** |

Two more surfaces were homed on the way past, because the rows already taught them in prose and
#285 will want them: `y usted` (M10-S01 #0, beside `y tú`) and `un poco de` (M10-S05 #0).

**M3, M4, M7, M8 and M9 were not edited.** Their gaps close from an earlier module's row, which is
what a cumulative index is for; touching them would have been a change with no effect.

### The three exemptions, and why teaching them would have been worse

Each of these would only resolve by landing on a row **headed by a different word** — the forms-hit
bug the reviews have now caught five times (`docs/07-llm-review-L1-M6-M10.md` M6-1, M7-2, M7-3,
M8-1; `docs/07-llm-review-en-es-L1-M6-M10.md` correction 4, the `mal`/`mala` call). A learner who
taps a word and is shown a row glossed as a different word has been taught something false, which
is worse than being shown nothing: the Why panel drops what it cannot resolve, by design
(`src/engine/wordIndex.ts`).

1. **`profesor`** (M1-S03, *Soy profesor*). Not a shape of `estudiante` — a different noun with a
   different meaning. M1 has no sentence containing it to hang a row on, and the ten-sentence
   budget is fixed. The variation's job is the frame (any profession, and still no `un`), and the
   frame's two words both resolve.
2. **`buenas tardes`** (M2-S02, *Buenas tardes, Ana*). Ruled on in the M1–M2 review and restated in
   the row's own note: `buenas tardes` and `buenas noches` are **separate expressions, not shapes of
   `Buenos días`**, and putting them in `forms` is the sibling-set bug. The note teaches the whole
   family in prose, which is where a set of siblings belongs.
3. **`hermano`** (M4-S05, *Vivo con mi hermano*). The variation's own `changed` line says it: *"a
   different person, not a different ending of the same word."* `hermana` is glossed "sister"; a tap
   on `hermano` must not show it. The M6–M10 review already recorded this row as deliberately
   untouched, and it stays that way.

### The one argued departure: `hablar` on the `hablaré` row

`docs/07-llm-review-en-es-L1-M6-M10.md` correction 6 kept `trabajar` and `hacer` out of M4's and
M5's `forms` — an infinitive is a shape of the same verb, but a tap on it would have shown a row
headed `Trabajo`, "I work", and so the wrong person. That correction had a better option available:
both infinitives appear in M6 sentences and could be rows of their own.

`hablar` has no such option — it appears in one variation (*Mañana voy a hablar con Ana*) and in no
sentence display in the course. The choice was a fourth exemption or the future row, and the future
row is the one place in the course where the infinitive is the subject matter: `hablaré` **is**
`hablar` + `-é`, the note has always said so, and the `forms` line now prints
`hablar · hablaré · hablarás · hablará` — the derivation, read left to right. Leading a list with
the lemma rather than the row's own display is M9's `nerviosa` precedent
(`["nervioso", "nerviosa", …]`, "the row is headed by the shape this sentence shows"). A native
reviewer may still prefer the exemption; it is open question 6 below.

## The paradigm half — L1-M5 and L1-M10

Both modules shipped `forms: []` on every row. M5 is the past-tense module, so a learner reading
`comí` was shown no other person of the verb anywhere in the app; M10 is connectives and
courtesies, where most rows genuinely have no paradigm — the honest answer differs per row, and
every `[]` below is now a decision on the record rather than an omission.

### L1-M5 — Yesterday (12 rows: 9 now carry a paradigm, 3 stay empty)

| row | forms | why |
|---|---|---|
| `Ayer` (S01 #0) | `[]` | an adverb; nothing to conjugate |
| `comí` (S01 #1) | comí · comiste · comió | -er/-ir preterite, three persons |
| `hablé` (S02 #0) | hablé · hablaste · habló | -ar preterite; the note's `hablo`/`hablé`/`habló` triple is now tappable |
| `trabajé` (S03 #0) | trabajé · trabajaste · trabajó | same family |
| `hice` (S04 #0) | hice · hizo | `hiciste` is **S05's own row** — see the seam below |
| `hiciste` (S05 #0) | `[]` | its two siblings live on S04's row; a one-entry list would only repeat the display |
| `fui` (S06 #0) | fui · fuiste · fue | each of the three does both `ir` and `ser` |
| `estudié` (S07 #0) | estudié · estudiaste · estudió | -ar preterite |
| `Antes` (S08 #0) | `[]` | an adverb |
| `comía` (S08 #1) | comía · comías | the imperfect's "I" and "he/she" are one shape; only `tú` moves it |
| `era` (S09 #0) | era · eras | same shape for I and he/she, as the note already said |
| `estaba` (S10 #0) | estaba · estabas | same |

No plural person (`comimos`, `comieron`, …) is listed anywhere: L1 teaches `yo`, `tú` and
`él/ella/usted`, plus M6's `vamos`, and a `forms` list is the taught paradigm, not the full table.

### L1-M10 — Connected talk (12 rows: 3 carry a paradigm, 9 stay empty)

| row | forms | why |
|---|---|---|
| `y tú` (S01 #0) | y tú · y usted | the same hand-back, in the polite register the note already names |
| `pero` (S02 #0) | `[]` | invariable conjunction |
| `y` (S03 #0) | `[]` | invariable; `e` before `i-`/`hi-` is not taught at L1 |
| `También` (S03 #1) | `[]` | invariable adverb |
| `De nada` (S04 #0) | `[]` | a fixed courtesy; `no hay de qué` is a different expression, not a shape of it |
| `un poco` (S05 #0) | un poco · un poco de | the note's own rule ("in front of a noun it needs `de`"), and the `debajo de`/`debajo del` precedent |
| `Entonces` (S06 #0) | `[]` | invariable |
| `Claro` (S07 #0) | `[]` | the interjection never moves; the adjective `claro`/`clara` is a different word, and the note says so |
| `Adiós` (S08 #0) | `[]` | invariable |
| `hasta mañana` (S08 #1) | hasta mañana · hasta luego · hasta el sábado | one pattern, three whole goodbyes; cue widened to `see you tomorrow · until then` |
| `Nos vemos` (S09 #0) | `[]` | a fixed phrase; the other persons of `verse` are not taught |
| `Perdón` (S10 #0) | `[]` | invariable |

## The additions-only proof

Every `forms` entry is an index surface, and the index is cumulative and first-occurrence-wins — so
a paradigm swept into an early module can silently move a later module's own row out of the index.
The check: `public/content/en-es/index/*.json` saved before the change, `npm run content:build` re-run,
every pre-existing key compared key by key.

**0 keys lost, 0 keys moved, 30 keys added, `maxSpan` unchanged (M1–M3: 2, M4–M10: 3).**

| | M1 | M2 | M3 | M4 | M5 | M6 | M7 | M8 | M9 | M10 |
|---|---|---|---|---|---|---|---|---|---|---|
| before | 26 | 43 | 67 | 91 | 103 | 116 | 139 | 160 | 185 | 197 |
| after | 32 | 51 | 75 | 99 | 125 | 142 | 165 | 186 | 211 | **227** |

The 30 new keys: `española`, `le gusta`, `le gustan`, `quiere`, `te gusta`, `te gustan` (M1);
`están`, `son` (M2); `comiste`, `comió`, `comías`, `eras`, `estabas`, `estudiaste`, `estudió`,
`fue`, `fuiste`, `hablaste`, `habló`, `hizo`, `trabajaste`, `trabajó` (M5); `hablar`, `hablarás`,
`hablará`, `trabajaré` (M6); `hasta el sábado`, `hasta luego`, `un poco de`, `y usted` (M10).

### Seams this pass had to steer around

- **`quieres` stays M3-S09's row.** M1's `Quiero` takes `quiere` and nothing else; the note names
  all three persons in prose and says which one M3 owns. This is the M1–M2 ruling ("paradigms are
  NOT swept into one `forms` list when a later module owns a form") applied a second time.
- **`hiciste` stays M5-S05's row.** S04 precedes S05 in the same file, so `hice` listing `hiciste`
  would have moved the seam inside one module.
- **Bare `te`, `gusta` and `gustan` stay unclaimed**, exactly as bare `me` and `buenos` are: the
  gustar frame is a two-token surface and the resolver takes the longest match first, so
  `Te gusta el café` resolves as `te gusta` + `el` + `café`. The same holds for `hasta`: the bare
  preposition is still nobody's, and `hasta el sábado` resolves whole (three tokens, inside the
  course's `maxSpan` of 3).
- **`está`/`es` keep their sibling rows.** `están` and `son` join the third-person rows that already
  carry the "one form, two jobs" note; `estoy`, `estás`, `eres` and `soy` are untouched, so a tap on
  each still lands on a row headed by that exact word.
- **Still unclaimed after this pass**, from the M6–M10 list: `va`, `van`, `ir`, `tres`, `cinco`,
  `veinte`, `cien`, `barato`, `malo`, `feliz`, `donde`, `que`, `si`, `poco`, `noche`, `esta`,
  `todos`, `muchos`, `tú`, `yo`, `nos`, `hasta` (bare), `luego`, `perro`, `carro`. `están` and `son`
  have left it.

### What #285 inherits

`tools/content-build.test.ts` now sweeps **every en-es variation line** against its own module's
index and pins the result at ten misses — two proper nouns (`ana`, `méxico`), four forward
references that resolve on schedule (`es` → M2, `quieres` → M3, `casa` → M7, `muy` → M8) and the
four tokens of the three exemptions above. A third variation that resolves nowhere fails that test,
so #285 has to decide about a new surface rather than discover it later. The second new test pins
the paradigm seams themselves (`quiere`/`quieres`, `hice`/`hiciste`, the gustar frame, `están`/`son`).

## Verification

- `npm run content:validate` → **CONTENT 40/40 ok**
- `npm run content:build` → `en-es: 10 modules (L1-M1..M10)`, indexes 32 → 51 → 75 → 99 → 125 →
  142 → 165 → 186 → 211 → **227** surfaces
- index diff before/after, key by key: **0 lost, 0 moved, 30 added** (above)
- variation sweep through the real engine: **13 of 13 target surfaces resolved or exempted**; the
  only remaining misses are the ten pinned in the test
- `npx vitest run tools/content-build.test.ts tools/validate.test.ts src/course/types.test.ts
  tools/payload-budget.test.ts src/course/content.test.tsx` → green
- `npm run typecheck`, `npx eslint .`, `npx prettier --check .` → clean
- `npm run build && npm run budget` → green: `course:en-es` **71.3 → 71.5 KiB** gzip against 360,
  `shell` and the other three courses unmoved (the new bytes are notes and `forms` strings inside
  modules en-es already ships)
- `scripts/verify.sh` → `TYPES ok | LINT ok | TEST 1325/1325 ok | CONTENT ok | FONTS ok | BUILD ok | BUDGET ok`

## Open questions for a native pass

Nothing below has been changed in the content. These are this pass's own calls, and they join the
67 questions the three earlier en-es reviews left open.

1. **`le gusta` / `le gustan` at L1.** The gustar rows now list `me` · `te` · `le`. `le` is the
   indirect-object pronoun the course otherwise never teaches, and in much of Spain `le` also drags
   in the leísmo question. Is naming the third person here the right amount, or should the row stop
   at `me` and `te`?
2. **`está`/`están` and `es`/`son` on one row each.** A learner tapping `están` sees a row headed
   `está`, glossed "is · you are (polite)", whose note names the plural. Is a number pair one word,
   or should the plurals wait for their own rows in L2?
3. **`hasta el sábado` in a `forms` list.** Three surfaces of one pattern, on a row headed
   `hasta mañana` and now glossed "see you tomorrow · until then". Is the widened cue honest, or
   does `hasta` deserve to be taught as a preposition in its own right?
4. **`un poco de`** — is the `de` really part of the same expression, or is this two words a learner
   should assemble?
5. **`y usted`** as a form of `y tú`. Register, not number: is that a difference a `forms` list
   should flatten?
6. **`hablar` on the `hablaré` row** — see the argued departure above. The alternative is a fourth
   exemption and a variation that teaches nothing.
7. **The preterite `tú` and `él` shapes** (`comiste`/`comió`, `hablaste`/`habló`,
   `trabajaste`/`trabajó`, `estudiaste`/`estudió`, `fuiste`/`fue`, `hizo`) are now listed on their
   `yo` rows. M5 teaches the first person only; is showing the neighbours as `forms` a help or a
   flood at this rung?
8. **The imperfect pairs** (`comía`/`comías`, `era`/`eras`, `estaba`/`estabas`) list two of the
   three L1 persons because "I" and "he/she" share a shape. Does a two-item list read as
   incomplete?
9. **`española` as a shape of `español`.** The row is glossed "Spanish" and teaches both the
   language and the adjective. Is the feminine adjective the same word for a learner, or is the
   language a separate noun that should not carry it?
10. **`profesor`, `buenas tardes`, `hermano`** — the three exemptions. Each is a word the course
    shows and never teaches. Would a native reviewer rather see the variations rewritten to use
    taught words than see them left unresolved?
11. **`Claro` and `De nada` with `forms: []`.** `no hay de qué` and `claro que sí` are named in the
    notes and indexed nowhere. Right call for L1?
12. **`trabajaré` on the `trabajar` row rather than on `hablaré`'s.** The future ending is taught
    once, on `hablaré`; the second verb's future hangs off its own infinitive. Is that the
    clearest arrangement of one lesson across two rows?
