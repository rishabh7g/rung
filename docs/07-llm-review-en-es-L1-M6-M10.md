# LLM review — en-es L1-M6, L1-M7, L1-M8, L1-M9 and L1-M10

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Opus 5), which
does not speak Spanish natively and cannot hear anything. `verified: true` on all five modules
rests on the repo owner's authority, exactly as hi-mr's flip did in PR #190 and as M1–M5's did in
PRs #206 and #208; `verifiedBy` says so in words. **No native Spanish gate exists for this
course**, and the open-questions list at the bottom is the outstanding work.

Nothing here reaches a learner yet: `content/courses.json` still carries `fixture: true` on the
en-es row, so the strict build skips the course entirely (#195 is the issue that flips it).

This is the sibling of `docs/07-llm-review-en-es-L1-M3-M5.md` and follows its method exactly:
author strictly in ladder order through the #109 CLI, rebuild the index between modules so each
prompt sees the real cumulative inventory, then walk every pool token and every sentence token
through the real engine and read out the row the Why panel would actually render.

Provenance, for the record: these five modules say
`"Claude Opus 5 — LLM review, authorised by repo owner"` with `verifiedAt: "2026-08-13"` — the
model that did the work, and the wording `content/schema/module.schema.json` gives. hi-mr's files
say `"Fable (Claude Fable 5)"`; PR #206's review flagged the difference for a later one-line
normalisation and this pass, like #208's, deliberately does not touch it.

**With this PR the en-es L1 ladder is complete: ten of ten modules authored.**

## What was authored

| | M6 Tomorrow | M7 Where things are | M8 Numbers & shopping | M9 Feelings & opinions | M10 Connected talk |
|---|---|---|---|---|---|
| sentences | 10 | 10 | 10 | 10 | 10 turns |
| new word rows | 12 of 25 | 14 of 25 | 13 of 25 | 11 of 25 | 12 of 25 |
| module rules | 11 | 10 | 10 | 10 | 10 |
| pool items | 8 | 8 | 8 | 8 | 8 |
| tokens per sentence | 4–6 (bound 7) | 4–7 (bound 7) | 3–6 (bound 7) | 3–8 (bound 8) | 1–8 per sentence inside a 7–13-token turn (bound 8) |
| enrichment | full | full | full | full | full |
| prerequisites | `["L1-M5"]` | `["L1-M6"]` | `["L1-M7"]` | `["L1-M8"]` | `["L1-M9"]` |
| cumulative index after it | 116 surfaces | 139 | 160 | 185 | **197** |

All five ship full enrichment — `sound`, `variations`, `mistake`, `usage`, `mnemonic` on every
sentence — though the validator stops requiring it at M3. That is the standing decision from
#208: all ten hi-mr modules carry all five blocks, and trimming them here would be a way of
hiding the payload number below rather than reporting it.

Each module was generated from `tools/course-briefs.ts` (#191) through
`npm run content:prompt -- en-es L1-M<n>`, with `npm run content:build -- --with-unverified
--with-fixtures` re-run in between, so M7's prompt saw M6's real 116-surface inventory, M8's saw
139, M9's saw 160 and M10's saw 185.

### The M10 format check (#111's precedent)

M10's items are **turns of two or three sentences in one `display` string**, the shape hi-mr's
M10 shipped. **No schema change was needed and none was made.** The one thing that moved is a
value this module authors for itself: `minWordsPerSentence` is **1** rather than the 3 the other
nine declare, because a real turn contains one-word courtesies — `Gracias.` — and the field is
per sentence, not per turn. The maximum is untouched at 8 and no sentence inside any turn reaches
it. This is recorded here rather than absorbed silently.

One deliberate divergence from hi-mr's M10: **its word rows re-deconstruct words earlier modules
already taught** (M2's कसा, for instance), which the cumulative index makes unreachable — the row
is shadowed and no learner can ever tap it. Every one of en-es M10's twelve rows teaches a surface
no earlier module owns, which the reverse sweep below proves.

## AC 1 — every pool token lands on the RIGHT row

Run against the emitted `public/content/en-es/index/L1-M<n>.json` through the real engine
(`resolveSentence` → `matchSurfaces` + `normalizeSurface`), resolving each hit back to
`modules/<id>.json → sentences[<sid>].deconstruction.words[<idx>]` — the exact row `WhyPanel`
renders through `WhyRow`.

**40 pool items, 50 sentences, 498 spans across pools and sentences, 0 unresolved, 0 wrong-word
landings.** Per module: M6 87 spans, M7 91, M8 80, M9 92, M10 148.

A second, stricter sweep runs alongside it: for every one of the **62 new word rows** (114 index
keys, counting every `forms` entry), the index entry for the row's `display` and for every entry
of its `forms` list points **back at that row**. **0 shadowed, 0 stolen keys.** No new row is
hidden behind an earlier surface, and no `forms` entry takes a key another row owns.

### L1-M6 — 116 surfaces, maxSpan 3

| item | display | tokens → row |
|---|---|---|
| C01 | Mañana voy a estudiar | `mañana` → Mañana · `voy` → voy · `a` → a (M4) · `estudiar` → estudiar (M3) |
| C02 | ¿Vas a trabajar mañana? | `vas` → Vas · `a` → a (M4) · `trabajar` → trabajar · `mañana` → Mañana |
| C03 | Voy a comer con mi hermana | `voy` → voy · `a` → a (M4) · `comer` → comer (M3) · `con` → con (M3) · `mi` → mi (M4) · `hermana` → hermana (M4) |
| C04 | Mañana no voy a hacer nada | `mañana` → Mañana · `no` → No (M2) · `voy` → voy · `a` → a (M4) · `hacer` → hacer · `nada` → nada (M3) |
| C05 | Vamos a comer a las ocho | `vamos` → Vamos · `a` → a (M4) · `comer` → comer (M3) · `a` → a (M4) · `las ocho` → las ocho (M4) |
| C06 | El sábado voy a ver una película | `el` → el (M1) · `sábado` → sábado · `voy` → voy · `a` → a (M4) · `ver` → ver · `una` → una (M3) · `película` → **películas** (M1) *forms* |
| C07 | Mañana hablaré con Ana | `mañana` → Mañana · `hablaré` → hablaré · `con` → con (M3) · `ana` → Ana (M2) |
| C08 | Esta noche voy a estudiar español | `esta noche` → esta noche · `voy` → voy · `a` → a (M4) · `estudiar` → estudiar (M3) · `español` → español (M1) |

### L1-M7 — 139 surfaces, maxSpan 3

| item | display | tokens → row |
|---|---|---|
| C01 | El libro está en la mesa | `el` → el (M1) · `libro` → **libros** (M1) *forms* · `está` → está (M2) · `en` → en · `la` → la (M1) · `mesa` → mesa |
| C02 | ¿Dónde está el baño? | `dónde` → Dónde · `está` → está (M2) · `el` → el (M1) · `baño` → baño |
| C03 | Hay una tienda cerca de aquí | `hay` → Hay · `una` → una (M3) · `tienda` → tienda · `cerca de` → cerca de · `aquí` → aquí |
| C04 | Mi libro está debajo de la mesa | `mi` → mi (M4) · `libro` → **libros** (M1) *forms* · `está` → está (M2) · `debajo de` → debajo de · `la` → la (M1) · `mesa` → mesa |
| C05 | Ana está al lado de la puerta | `ana` → Ana (M2) · `está` → está (M2) · `al lado de` → al lado de · `la` → la (M1) · `puerta` → puerta |
| C06 | Mi casa está cerca del parque | `mi` → mi (M4) · `casa` → casa · `está` → está (M2) · `cerca del` → **cerca de** *forms* · `parque` → parque |
| C07 | Hay libros en la tienda | `hay` → Hay · `libros` → libros (M1) · `en` → en · `la` → la (M1) · `tienda` → tienda |
| C08 | Mañana voy al parque | `mañana` → Mañana (M6) · `voy` → voy (M6) · `al` → al · `parque` → parque |

### L1-M8 — 160 surfaces, maxSpan 3

| item | display | tokens → row |
|---|---|---|
| C01 | ¿Cuánto cuesta el café? | `cuánto` → Cuánto · `cuesta` → cuesta · `el` → el (M1) · `café` → café (M1) |
| C02 | ¿Cuánto cuestan las manzanas? | `cuánto` → Cuánto · `cuestan` → cuestan · `las` → las (M1) · `manzanas` → **manzana** (M3) *forms* |
| C03 | Quiero dos cafés, por favor | `quiero` → Quiero (M1) · `dos` → dos · `cafés` → **café** (M1) *forms* · `por favor` → por favor |
| C04 | Quiero un kilo de manzanas, por favor | `quiero` → Quiero (M1) · `un` → un (M3) · `kilo` → kilo · `de` → de (M1) · `manzanas` → **manzana** (M3) *forms* · `por favor` → por favor |
| C05 | Una botella de agua, por favor | `una` → una (M3) · `botella` → botella · `de` → de (M1) · `agua` → agua (M1) · `por favor` → por favor |
| C06 | El libro es muy caro | `el` → el (M1) · `libro` → **libros** (M1) *forms* · `es` → es (M2) · `muy` → muy · `caro` → caro |
| C07 | Hay diez libros en la tienda | `hay` → Hay (M7) · `diez` → diez · `libros` → libros (M1) · `en` → en (M7) · `la` → la (M1) · `tienda` → tienda (M7) |
| C08 | ¿Cuánto cuesta todo? | `cuánto` → Cuánto · `cuesta` → cuesta · `todo` → todo |

### L1-M9 — 185 surfaces, maxSpan 3

| item | display | tokens → row |
|---|---|---|
| C01 | Hoy estoy cansado | `hoy` → Hoy · `estoy` → Estoy (M2) · `cansado` → cansado |
| C02 | No quiero café porque estoy cansado | `no` → No (M2) · `quiero` → Quiero (M1) · `café` → café (M1) · `porque` → porque · `estoy` → Estoy (M2) · `cansado` → cansado |
| C03 | Estoy cansado, por eso no quiero café | `estoy` → Estoy (M2) · `cansado` → cansado · `por eso` → por eso · `no` → No (M2) · `quiero` → Quiero (M1) · `café` → café (M1) |
| C04 | ¿Por qué no quieres café? | `por qué` → Por qué · `no` → No (M2) · `quieres` → quieres (M3) · `café` → café (M1) |
| C05 | ¿Por qué estás cansada? | `por qué` → Por qué · `estás` → estás (M2) · `cansada` → **cansado** *forms* |
| C06 | Me gusta el café porque es fuerte | `me gusta` → Me gusta (M1) · `el` → el (M1) · `café` → café (M1) · `porque` → porque · `es` → es (M2) · `fuerte` → fuerte |
| C07 | Estoy enfermo, por eso no voy a trabajar | `estoy` → Estoy (M2) · `enfermo` → enfermo · `por eso` → por eso · `no` → No (M2) · `voy` → voy (M6) · `a` → a (M4) · `trabajar` → trabajar (M6) |
| C08 | Estoy contenta porque mañana no trabajo | `estoy` → Estoy (M2) · `contenta` → **contento** *forms* · `porque` → porque · `mañana` → Mañana (M6) · `no` → No (M2) · `trabajo` → Trabajo (M4) |

### L1-M10 — 197 surfaces, maxSpan 3

| item | display | tokens → row |
|---|---|---|
| C01 | Hola, ¿cómo estás? Estoy bien, gracias, ¿y tú? | `hola` → Hola (M2) · `cómo` → cómo (M2) · `estás` → estás (M2) · `estoy` → Estoy (M2) · `bien` → bien (M2) · `gracias` → gracias (M2) · `y tú` → y tú |
| C02 | Voy a trabajar, pero después voy a estudiar | `voy` → voy (M6) · `a` → a (M4) · `trabajar` → trabajar (M6) · `pero` → pero · `después` → después (M6) · `voy` → voy (M6) · `a` → a (M4) · `estudiar` → estudiar (M3) |
| C03 | Quiero pan y café. También quiero una manzana. | `quiero` → Quiero (M1) · `pan` → pan (M3) · `y` → y · `café` → café (M1) · `también` → También · `quiero` → Quiero (M1) · `una` → una (M3) · `manzana` → manzana (M3) |
| C04 | Un café, por favor. Gracias. | `un` → un (M3) · `café` → café (M1) · `por favor` → por favor (M8) · `gracias` → gracias (M2) |
| C05 | Estoy un poco cansada, pero estoy bien | `estoy` → Estoy (M2) · `un poco` → un poco · `cansada` → **cansado** (M9) *forms* · `pero` → pero · `estoy` → Estoy (M2) · `bien` → bien (M2) |
| C06 | ¿Vas a comer con Ana? Claro, vamos a comer a las ocho. | `vas` → Vas (M6) · `a` → a (M4) · `comer` → comer (M3) · `con` → con (M3) · `ana` → Ana (M2) · `claro` → Claro · `vamos` → Vamos (M6) · `a` → a (M4) · `comer` → comer (M3) · `a` → a (M4) · `las ocho` → las ocho (M4) |
| C07 | Mañana voy a trabajar. Adiós, hasta mañana. | `mañana` → Mañana (M6) · `voy` → voy (M6) · `a` → a (M4) · `trabajar` → trabajar (M6) · `adiós` → Adiós · `hasta mañana` → hasta mañana |
| C08 | Perdón, ¿hay un baño aquí? Sí, está al lado de la puerta. | `perdón` → Perdón · `hay` → Hay (M7) · `un` → un (M3) · `baño` → baño (M7) · `aquí` → aquí (M7) · `sí` → Sí (M2) · `está` → está (M2) · `al lado de` → al lado de (M7) · `la` → la (M1) · `puerta` → puerta (M7) |

### The forms-hits, checked one by one

A forms-hit means the Why panel shows a row headed by a different string, so the row's note has to
be true of the surface the learner tapped. **Twenty-one hits across pools and sentences, seven
distinct pairs, every one of them a shape of the SAME word** — never a cousin, a synonym or a
sibling set, which is the bug class that shipped four times in hi-mr
(`docs/07-llm-review-L1-M6-M10.md`: M6-1, M7-2, M7-3, M8-1).

| tapped | row shown | is the note true of it? |
|---|---|---|
| `libro` (×8) | **libros** / "books" (M1) | yes — *"Masculine: el libro (one) · los libros (more than one)."* |
| `manzanas` (×4) | **manzana** / "apple" (M3) | yes — *"la manzana (one) · las manzanas (more than one)."* |
| `película` (×2) | **películas** / "films" (M1) | yes — *"la película (one) · las películas (more than one)."* |
| `cerca del` (×2) | **cerca de** / "near" (M7) | yes — the note IS the contraction law: *"In front of a masculine el it becomes cerca del."* |
| `cansada` (×2) | **cansado** / "tired" (M9) | yes — *"cansado for a man, cansada for a woman"*, and the module's rule 2 names the SUBJECT as the agreer |
| `cafés` (×2) | **café** / "coffee" (M1) | yes — *"Plural cafés, and the written accent stays where it was."* |
| `contenta` (×1) | **contento** / "happy · pleased" (M9) | yes — *"contento / contenta"*, with estar named |

Every sentence token of all 50 sentences resolves too, and **no sentence depends on a word row
that comes later in its own module.**

## AC 2 — the rules are true before they are memorable

The briefs name the memorable-and-false rule each module attracts (`course-briefs.ts` rule 2).
What shipped instead:

- **"-ré is the future tense"** → M6 rule 0 refuses it: Spanish has three ways of talking about
  tomorrow and the -ré form is *the one people reach for least*. `voy a` + infinitive leads, the
  plain present is named as a real future (rule 5), and `hablaré` is placed where it actually
  lives — writing, promises, predictions. Rule 6 then says what the form IS (the **whole**
  infinitive plus an ending), which is also what keeps M5's `hablé` apart from `hablaré`.
- **"ser is permanent, estar is temporary"**, in M7's mechanical corner → rule 0 says location is
  *always* estar, and **names its own exception in the same breath**: an event takes ser
  (`La fiesta es en mi casa`), which is a place where something HAPPENS, and this level does not
  teach it. Nothing is claimed to be exceptionless that is not.
- **"hay is there is"** → M7 rules 2 and 3 split the two jobs by a test a learner can apply:
  `hay` asserts existence and is followed by `un`/`una`/a bare plural; `está` places something both
  speakers know and follows `el`/`la`/`mi`/a name. **`hay` never takes `el` or `la`** — checkable,
  not vibes. Rule 2 also states that `hay` has no plural at all.
- **"under = debajo"** → M7 rule 4 makes the `de` the lesson (`debajo de`, `al lado de`,
  `cerca de`), and rule 5 gives the two contractions with their scope: only in front of `el`,
  never before `la`, `los`, `las`.
- **"cuesta agrees with the buyer"** → M8 rule 0 names the correct agreer, **the THING**, and ties
  it back to M1's `gustar` as the same shape rather than a new oddity. Rule 1 keeps `cuánto`
  invariable in front of the verb and agreeing in front of a noun.
- **"caro is ser, never estar"** → M8 rule 7 refuses to ban the other one: *both* `es caro` and
  `está caro` are correct and they say different things (an expensive thing vs dear at the
  moment). The module uses `es` and says why, rather than teaching a false absolute.
- **"muy = very, mucho = much"** → M8 rule 5 gives the distribution instead: `muy` in front of an
  adjective and never changing, `mucho` with a noun or after a verb and changing.
- **Agreement named for the wrong agreer** — the defect the third Marathi review corrected three
  times — → M9 rule 2 says **SUBJECT**, in those words, *"whoever the sentence is about, not
  whoever is speaking"*, and gives `¿Estás cansada?` — asked OF a woman, whoever is asking — as
  the instance that catches a "speaker"-shaped rule. Pool item M9-C05 is that sentence, and
  M9-S10 (`Estoy nerviosa…`) and M10-C05 (`Estoy un poco cansada…`) carry it in both directions.
- **"porque and por qué are the same word"** → M9 rule 1 states all three spellings, says they
  sound almost identical out loud, and names the consequence honestly: this is an **orthography**
  hazard, not a grammar one. Rule 7 fences `por`/`para` out of L1 explicitly, as the brief asked.
- **"Spanish drops pronouns"** → M10 rule 1 gives the true version: once the person is
  established Spanish *goes on* leaving it out, and a `yo` at the head of each sentence reads as
  insistence or contrast. `¿Y tú?` is shown as the two-word way to do the contrast you actually
  want.

## Index seams honoured, and the ones now closed

The index is cumulative and first-occurrence-wins, so these are load-bearing.

**Honoured from M1–M5 (#206, #208)**

- **`mañana` was left free by M4's three-token `por la mañana`.** M6 claims it, and its row says
  both jobs out loud; M6-S06 (`Mañana trabajo por la mañana`) puts both in one sentence, and the
  resolver takes the three-token phrase where it applies and the bare word where it does not.
- **`a` was written for all its seats in M4 and is NOT re-owned here.** M6's plan `a` and M7's
  destination `a` are taught in *rule text*, exactly as the brief instructed, and every tap on `a`
  in M6–M10 lands on M4's row — whose note already names the plan and destination seats.
- **`ocho` was left free by M4's two-token `las ocho`.** M8 claims it (S08), and the row closes the
  seam in words: *"You have already met it inside M4's las ocho, where it was the hour."*
- **`uno` was left free by M3's `un`/`una`.** M8 claims it and states the three shapes.
- **`por` stays unclaimed for good.** M8 teaches `por favor` whole, M9 teaches `por qué` and
  `por eso` whole, and no row is ever headed by a bare `por` — which is what M9 rule 7 tells the
  learner in as many words.
- **`quiere` is still free** (M3's `quieres` kept `forms: []`), and nothing here takes it.
- **`hermano` is still outside `hermana`'s forms.** Untouched.

**New seams decided here**

- **Verb paradigms are still not swept into one `forms` list.** `voy`, `vas` and `vamos` are three
  rows with `forms: []`; `va` and `van` stay unclaimed and are named only in prose. `cuesta` and
  `cuestan` are two rows for the same reason, each carrying the agreement law. The only
  multi-shape rows are adjectives and determiners, where the note IS the agreement rule
  (`cansado`, `contento`, `enfermo`, `nervioso`, `caro`, `cuánto`, `triste`, `fuerte`).
- **A compound preposition and its contraction are ONE row.** `debajo de` carries
  `forms: ["debajo de", "debajo del"]`, and likewise `al lado de` and `cerca de`. This is the
  judgement call of the pass: `cerca del` is the same phrase with an obligatory contraction, not a
  cousin, and each note states the law. It keeps `Mi casa está cerca del parque` from resolving to
  a bare `de` row that would say "from · of".
- **`al` is its own one-token row** (M7-S10, `Mañana voy al parque`) and does not collide with the
  three-token `al lado de`, because the resolver takes the longest surface first. `del` gets no
  bare row — it only ever appears inside those phrases in this level.
- **Fixed phrases stay whole and leave their parts free:** `esta noche` (bare `esta`, `noche`
  free), `todo el día` (bare `todo` was free, and M8 then claims it for "everything"),
  `por favor`, `por qué`, `por eso`, `de nada`, `y tú`, `hasta mañana`, `un poco`, `nos vemos`.
  Bare `y` is a separate row from `y tú`, and both resolve correctly.
- **`hoy`, `mañana` and `ayer`** are now three separate rows, one per module, and each names the
  other two.
- **Still unclaimed after M10, for L2:** `va`, `van`, `ir`, `tres`, `cinco`, `veinte`, `cien`,
  `están`, `son`, `barato`, `malo`, `feliz`, `donde` (unaccented), `que` (unaccented), `si`
  (unaccented), `poco` (bare), `noche` (bare), `esta`, `todos`, `muchos`, `tú`, `yo`, `nos`,
  `hasta` (bare), `luego`, `perro`, `carro`.

## Corrections applied during the pass

Self-review of the drafts, plus the audit above, changed six things:

1. **M2's `es` row was not true of M8's seat.** It said `es` covers "who someone is or where they
   are from" — nothing about what a thing is *like*, which is what `El libro es muy caro` uses it
   for, and M8-C06 taps it. One line changed in `content/en-es/modules/L1-M2.json`: the note now
   also names the classifying seat and points forward to M8, the way the same file's `está` row
   already pointed forward to M7. No surface moved.
2. **M8 nearly named a currency.** `Cuesta dos euros` is Spain, `pesos` is a dozen countries and
   several different values, and the course is pan-Hispanic. **No currency word is taught**; the
   `cuesta` row says the money word changes country by country and names four. Same treatment as
   the `coche` fork in #208 — the fork is avoided, not picked, and it is an open question below.
3. **M8's `caro` was going to be taught as "ser, not estar".** That is false: `está caro` is
   ordinary Spanish and means something different. Rule 7 now names both and says which one the
   module is using and why.
4. **M9's `mal` was nearly given `forms: ["mal", "mala"]`.** `mala` is the feminine of the
   adjective `malo`, a different word from the adverb `mal` — exactly the cousin-in-forms bug.
   The row has `forms: []` and the mistake block explains that `Estoy mala` exists and says
   something else.
5. **M10 was going to follow hi-mr's M10 and re-deconstruct earlier words** to give each turn a
   word row. Every such row would have been shadowed by the index and unreachable. All twelve M10
   rows now teach surfaces no earlier module owns (the joiners and the courtesies).
6. **M6's `trabajar` and `hacer` were nearly folded into M4's and M5's rows as `forms` entries.**
   An infinitive is a shape of the same verb, but M4's row is headed `Trabajo` and glossed "I
   work" — a tap on `trabajar` would have shown the wrong person. They are separate rows.

## Verification

- `npm run content:validate` → **CONTENT 21/21 ok** (no `fixture` flag on any of the five)
- `npm run content:build -- --with-unverified --with-fixtures` → `en-es: 10 modules (L1-M1..M10)`,
  indexes 116 → 139 → 160 → 185 → 197 surfaces
- `npx vitest run tools/validate.test.ts tools/content-build.test.ts src/course/types.test.ts` →
  **118/118 green**; the full suite → **1133/1133 green**
- `npm run typecheck`, `npx eslint .`, `npx prettier --check .` → clean
- Pinned inventories updated: `MODULE_FILES` in `src/course/types.test.ts` (and its title), and in
  `tools/content-build.test.ts` the shipped map, the summary line and the emitted-file list
- `content/en-es/levels.json`: M6–M10 gain `hasContent: true` and lose `draft`; the L1 `draftNote`
  now says all ten are authored and none has had a native pass
- **Live dev-build smoke**, headless Chromium against a dev `dist/` with the course switched to
  en-es: the en-es ladder lists all ten rungs as real content; **the M6, M7, M8, M9 and M10 module
  lists each render all 10 sentences** (M10's turns render whole, both sentences in one card);
  Sentence Detail for `L1-M7-S04` renders the frozen order — hero → gloss → word-for-word → word
  rows (with the `forms: debajo de · debajo del` line) → rules → trap → sound → variations →
  mistake → usage → mnemonic. One console line, the expected
  `storage persistence denied` in a headless profile; no content errors.

### Payload — the dev build is further over, and is left that way

Measured on this branch, both builds run end to end:

| build | fonts | js gzip | total gzip | limit |
|---|---|---|---|---|
| strict (what ships today) | 361.2 KiB | 94.2 KiB | **548.3 KiB** | 580 KiB — ok, **unchanged** |
| dev, after M3–M5 (#208) | 367.8 KiB | 94.6 KiB | **597.7 KiB** | 580 KiB — OVER by 17.7 |
| dev, with M6–M10 | 368.2 KiB | 94.8 KiB | **634.8 KiB** | 580 KiB — **OVER by 54.8 KiB** |

- **The strict build is byte-for-byte the number PRs #206 and #208 reported** (548.3 KiB), because
  en-es is still a fixture course at the course level and the strict build skips it. Nothing
  shipping to a learner has changed, and `scripts/verify.sh` — which meters the strict `dist/` —
  stays green.
- **+37.1 KiB for five modules**, of which **+0.4 KiB is fonts** (Latin coverage was saturated
  long ago) — the rest is the JSON.
- **The limit was NOT raised and enrichment was NOT trimmed to fit.** Summing every course in one
  `dist/` is the wrong measurement for a product where a learner downloads ONE course.
  **Per-course payload measurement is #207**, and it gates #195: en-es cannot go live to a learner
  until the budget is measured per course rather than per `dist/`.

## Open questions for a native pass

Nothing below has been changed in the content. These are the calls where guessing would be worse
than asking — dialect, register, naturalness, and every phonetic claim. The 15 questions of the
M1–M2 review and the 22 of the M3–M5 review still stand; these are the new ones.

### Naturalness and register

1. **`Voy a estudiar después`** (M6-S03). Is bare `después` natural at the end of a plan, or does
   a native say `luego` / `más tarde` / `después de comer`? `luego` is not taught at all.
2. **`Mañana hablaré con Ana`** (M6-S07) is the module's one synthetic future. Is that a sentence
   a person says, or would `voy a hablar` cover it everywhere and the -ré form only appear in
   `¿Qué haré?`-style musing and in writing? The module claims the -ré form leans towards promises
   and predictions — is that the right characterisation across dialects?
3. **`Vamos a comer a las ocho`** (M6-S08) is taught as both a plan and an invitation. Is the
   ambiguity real in speech, or does intonation settle it so firmly that teaching it as ambiguous
   misleads?
4. **`El sábado voy a México`** (M6-S09). Is a country a plausible Saturday destination for a
   beginner sentence, or does it read as a joke? The module cannot use a shop or a park yet (M7
   owns them), which is why the destination is a country.
5. **`Hay una tienda cerca de aquí`** (M7-S07) — is `tienda` the word a person uses, or does the
   local word (`bodega`, `almacén`, `abarrotes`, `colmado`) always win? The row claims `tienda` is
   understood everywhere.
6. **`¿Dónde está el baño?`** (M7-S08) is taught as the polite universal. Is `baño` right in every
   country, and is there anywhere `servicio` or `aseo` is what a stranger expects?
7. **`Mi casa está cerca del parque`** (M7-S09). Would a native say `cerca del parque` or
   `al lado del parque` / `a dos cuadras`? Is `cerca de` the everyday distance word?
8. **`Quiero dos cafés, por favor`** (M8-S03). #208's open question 2 asked whether
   `un café con leche` is pan-Hispanic; this one asks the register question: is `Quiero…` the
   normal way to order, or does `Me pones…` / `Me da…` / `Quisiera…` sound less blunt? The trap
   block claims `Quiero` is not rude in Spanish — is that true everywhere?
9. **`Quiero un kilo de manzanas`** (M8-S04) and **`Una botella de agua`** (M8-S05). Are these the
   quantities a learner meets first, and is `un kilo de` the natural phrasing at a market?
10. **`El libro es muy caro`** (M8-S09). The module teaches `es caro` for the general statement and
    names `está caro` for the moment. Which one does a native reach for at a stall, and is the
    distinction as clean as rule 7 claims?
11. **`Estoy contento`** vs `Estoy feliz` (M9-S05). The row calls `contento` pleased-right-now and
    `feliz` the deeper kind. Is that the distinction natives draw, or is it regional?
12. **`Estoy mal`** (M9-S09) is taught as "things are going badly / I feel unwell". Is it heard as
    dramatic? And is the `Estoy mala` = "I'm ill" reading in the mistake block right in every
    dialect, or is it Spain-flavoured?
13. **`Me gusta el café porque es fuerte`** (M9-S08). Is `fuerte` the word for strong coffee, or is
    it `cargado`? `fuerte` was chosen partly because it is an -e adjective.
14. **`Claro`** (M10-S07) as an everyday yes — is it neutral everywhere, or does it read as
    impatient in some varieties?
15. **`Nos vemos después`** (M10-S09) and **`hasta mañana`** (M10-S08). Is `adiós` too final for a
    colleague, as the row claims? Which of the three is the default goodbye where you are?
16. **`Perdón`** (M10-S10) as the opener to a stranger. Is `Disculpe` the more usual one, and does
    `Perdón` carry an apology that `Disculpe` does not?
17. **The M10 turns as wholes.** Each is grammatical and each recombines taught material, but only
    a native ear can say whether they sound like two people talking or like a textbook.

### Dialect and orthography

18. **No currency is taught** (M8). `¿Cuánto cuesta?` never gets a full spoken answer with a price
    in it, which is a real hole in a shopping module. Is naming one (with the others in the note)
    better than naming none? If one, which — and does the course want a "your country's word here"
    convention?
19. **`el sábado` for "on Saturday"** (M6-S09) is taught with no other day named. Should the module
    have spent five more rows on the week, or is one day plus the rule enough?
20. **`botella`'s `ll`** is described as a y sound "across nearly all of the Spanish-speaking
    world, and a sh in and around Buenos Aires". Is that the right balance, and is `sh` a fair
    description of the rioplatense sound for a beginner?
21. **`diez`, `cerca`, `entonces` and `hacer`** all carry the `s`/`th` note that `gracias` and
    `manzana` already carry. Repeating it on every c/z word may be noise — should the course say it
    once and stop?
22. **`todo el día` vs `todos los días`** (M6-S06) is drilled as a minimal pair. Is that confusion
    real for learners, or is it a manufactured contrast?

### Sound notes — nothing here can be heard by the author

23. Every `sound` line in these five modules is derived from Spanish orthography and standard
    descriptions rather than from listening: the ñ of `mañana` and `baño`, `voy` rhyming with
    "boy", the soft intervocalic b of `sábado` and d of `todo`/`de nada`, the j of `debajo`, the
    two c's of `cerca`, the ue glides of `cuesta`, `puerta` and `fuerte`, the ll of `botella`, the
    single-tap r that separates `caro` from `carro` and `pero` from `perro`, the silent h of
    `hacer`, `hay` and `hasta`, and every stress claim behind every written accent (`después`,
    `hablaré`, `sábado`, `aquí`, `adiós`, `perdón`, `también`). The stress claims are the safest;
    the consonant descriptions are the least.
24. **`por qué` and `porque` are described as nearly homophonous**, told apart in speech by the
    sentence rather than the sound. Is that true, or is there a stress or pitch difference a native
    hears clearly and a learner could be taught?
25. **`y` described as the vowel of English "see"**, leaning on the word after it. True in
    isolation; is it worth saying, or does it invite an English "why"?

### Pedagogy calls the owner decides

26. **M10 declares `minWordsPerSentence: 1`** where every other module says 3, because a turn
    contains `Gracias.` If the owner would rather the field describe the turn than the sentence,
    that is a one-line change and a note in the brief.
27. **M6 teaches `voy`, `vas` and `vamos` but not `va` or `van`.** Third-person verbs are almost
    absent from the whole level, which is why M10's turns are all first and second person. Is that
    the right L1 scope, or should M10 have spent rows on `va` / `es` for a third-person turn?
28. **M8 teaches four numbers** (`uno`, `dos`, `ocho`, `diez`) — only the ones its sentences use,
    per the brief. A learner cannot yet say a price. Is that acceptable at L1, or does the module
    owe `tres`…`nueve`, `veinte`, `cien` as vocabulary even without sentences for them?
29. **The compound-preposition contraction lives in a `forms` list** (`cerca de` / `cerca del`).
    That is a defensible reading of "another shape of the same word", and the alternative — a
    separate `del` row — would have left `cerca` unresolved. If the owner reads `forms` more
    strictly, this is the place to say so.
30. **Enrichment is full on all five modules**, though the validator stops requiring it at M3.
    That is a deliberate quality call and it costs payload (see above). If the budget conversation
    lands on "trim the dev build", these are the fifty blocks that would go first.
