# LLM review — en-es L1-M1 and L1-M2

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Opus 5), which
does not speak Spanish natively and cannot hear anything. `verified: true` on both modules rests on
the repo owner's authority, exactly as hi-mr's flip did in PR #190; `verifiedBy` says so in words.
**No native Spanish gate exists for this course**, and the open-questions list at the bottom is the
outstanding work.

Nothing here reaches a learner yet: `content/courses.json` still carries `fixture: true` on the
en-es row, so the strict build skips the course entirely (#195 is the issue that flips it).

Provenance wording, for the record: hi-mr shipped `"Fable (Claude Fable 5) — LLM review, authorised
by repo owner"`. These two modules say `"Claude Opus 5 — LLM review, authorised by repo owner"` —
the wording issue #192 and `content/schema/module.schema.json` both give as the example, and the
name of the model that actually did the work. If the owner wants one string across both courses,
that is a one-line normalisation, not a re-review.

## What was authored

| | L1-M1 Who I am | L1-M2 First exchange |
|---|---|---|
| sentences | 10 | 10 |
| new word rows | 20 of 25 allowed | 16 of 25 allowed |
| pool items | 8 | 8 |
| tokens per sentence | 2–5 | 2–4 (bound declared 5) |
| enrichment | full (all five blocks, every sentence) | full |
| prerequisites | `[]` | `["L1-M1"]` |

**M1 was re-authored, not extended.** What was there was a four-sentence `fixture: true` seam proof
(#118) whose job was to prove the multi-token surface `Me llamo` through the emitter. Four of its
frames survive into the real module — `Me llamo …`, `Soy de …`, `Me gusta el …`, `Quiero …` — and
everything else is new: the fixture flag is gone, so the module carries the full 10-sentence /
6-pool-item budget, and the `el agua` quirk that the fixture put in a headline variation is now a
single honest clause in the `agua` row, with the drill left to M3 where the brief puts it.

The two modules were written strictly in ladder order, rebuilding the index between them, so M2's
prompt was generated against M1's real cumulative inventory (26 surfaces). Both were authored from
`tools/course-briefs.ts` (#191 / PR #205) via `npm run content:prompt`.

## The slogan traps, and what was written instead

The briefs name the memorable-and-false rule each module attracts (`course-briefs.ts` rule 2). What
shipped:

- **"gustar is backwards"** → M1 rule 6 states the agreement law instead: *the thing liked is the
  SUBJECT, so the verb agrees with IT and never with you — Me gusta el café · Me gustan los libros;
  me only says who is pleased, and it never changes.* An author reading "backwards" still does not
  know when to write `gustan`.
- **"-o is masculine, -a is feminine"** → M1 rule 5 says gender is a property of the noun and the
  article is what shows it, with `el día` and `la mano` named as the counterexamples in the rule
  itself.
- **"ser is permanent, estar is temporary"** → M2 rule 3 says ser classifies and estar reports a
  condition, and then kills the slogan out loud: *`es joven` is temporary, `está muerto` is
  permanent.*
- **Agreement named for the wrong agreer** — the defect the third Marathi review had to correct
  three times (docs/08-marathi-third-review.md, corrections 1–3) — → M2 rule 6 says **SUBJECT**,
  and spells the case that catches "speaker": *`¿Estás ocupada?` — asked of a woman*, where the
  ending follows the person asked and not the person asking.

## The index audit — where every pool token actually lands

Run against the emitted `public/content/en-es/index/L1-M<n>.json`, through the real engine
(`matchSurfaces` + `normalizeSurface` from `src/engine/surface.ts`), resolving each hit back to
`modules/<id>.json → sentences[<sid>].deconstruction.words[<idx>]` — i.e. the exact row
`WhyPanel`/`WhyRow` would render. **48 pool tokens, 0 unresolved, 0 wrong-word landings.**

### L1-M1 — 26 surfaces, maxSpan 2

| item | display | tokens → row |
|---|---|---|
| C01 | Se llama Rohan | `se llama` → **Me llamo** (S01 #0) *forms-hit* · `rohan` → Rohan |
| C02 | Soy estudiante | `soy` → Soy · `estudiante` → estudiante |
| C03 | Soy estudiante de música | `soy` → Soy · `estudiante` → estudiante · `de` → de · `música` → música |
| C04 | Me gusta la película | `me gusta` → Me gusta · `la` → la · `película` → **películas** (S07 #1) *forms-hit* |
| C05 | Me gusta el español | `me gusta` → Me gusta · `el` → el · `español` → español |
| C06 | Me gusta mucho el café | `me gusta` → Me gusta · `mucho` → mucho · `el` → el · `café` → café |
| C07 | Me gustan mucho los libros | `me gustan` → Me gustan · `mucho` → mucho · `los` → los · `libros` → libros |
| C08 | Quiero el café | `quiero` → Quiero · `el` → el · `café` → café |

### L1-M2 — 43 surfaces cumulative, maxSpan 2

| item | display | tokens → row |
|---|---|---|
| C01 | Hola, Ana | `hola` → Hola · `ana` → Ana |
| C02 | Buenos días, Rohan | `buenos días` → Buenos días (one surface) · `rohan` → Rohan (M1) |
| C03 | ¿Cómo estás, Ana? | `cómo` → cómo · `estás` → estás · `ana` → Ana |
| C04 | Estoy ocupada | `estoy` → Estoy · `ocupada` → **ocupado** (S05 #0) *forms-hit* |
| C05 | ¿Está usted bien? | `está` → está · `usted` → usted · `bien` → bien |
| C06 | ¿Eres de India? | `eres` → eres · `de` → de (M1) · `india` → India (M1) |
| C07 | Sí, me gusta el café | `sí` → Sí · `me gusta` → Me gusta (M1) · `el` → el (M1) · `café` → café (M1) |
| C08 | No, estoy ocupado | `no` → No · `estoy` → Estoy · `ocupado` → ocupado |

### The three forms-hits, checked one by one

A forms-hit means the Why panel shows a row headed by a different string, so the row's note has to
be true of the surface the learner tapped. All three are shapes of the SAME word — never a cousin,
a synonym or a sibling set, which is the bug class that shipped four times in hi-mr
(docs/07-llm-review-L1-M6-M10.md: M6-1, M7-2, M7-3, M8-1).

1. `se llama` → row **Me llamo** / "my name is". Note opens *"llamarse, 'to call oneself'. The
   little pronoun says whose name it is: me llamo (mine) · te llamas (yours) · se llama (his or
   hers)"* — the tapped form is named explicitly.
2. `película` → row **películas** / "films". Note: *"Feminine: la película (one) · las películas
   (more than one)"*. Right lemma, both numbers stated.
3. `ocupada` → row **ocupado** / "busy". Note is the agreement law itself: *"ocupado when that
   person is male, ocupada when she is female"*.

Every other pool token lands on a row whose `display` IS the surface tapped. Sentence displays were
walked the same way: every token of all 20 sentences resolves, and no sentence depends on a word
row that comes later in its own module.

## Index seams decided here (they bind M3–M10)

The index is cumulative and first-occurrence-wins, so these are load-bearing for every later author.

- **Paradigms are NOT swept into one `forms` list when a later module owns a form.** `Soy` ships
  `forms: []` and names `soy · eres · es` in prose, so M2's own `eres` and `es` rows stay reachable;
  `Quiero` does the same so M3's `quieres` stays free; the three estar forms (`estoy`, `estás`,
  `está`) are three sibling rows, so M7's location `está` and M9's `estoy` land on an exactly-headed
  row instead of one headed "estás". Where no later module claims the form — `te llamas`,
  `se llama`, noun plurals — the paradigm stays in `forms`, which is also what Sentence Detail
  prints.
- **`no` is written for both of its seats now**, because M3 can never own the surface: the row says
  it is the answer "no" AND the "not" that goes in front of a verb (`No quiero café`). This is the
  `का` correction from review 08, applied before the bug exists rather than after.
- **`está` and `es` carry two-job cues** (`is · you are (polite)`), because usted takes he-or-she
  forms and M7 will tap `está` for location.
- **Multi-token surfaces keep bare words free**, per the brief: `Me llamo`, `Me gusta`, `Me gustan`
  and `Buenos días` are single surfaces, so bare `me`, `te`, `buenos` and `días` are unclaimed.
  `Buenos días` ships `forms: []` on purpose — `buenas tardes` and `buenas noches` are *different
  expressions*, not shapes of it, and putting them in `forms` would be the "set of siblings" bug.
- **Still unclaimed after M2, for the modules the briefs assign them to:** `a` (M4), `mañana` (M6),
  `por` (M8/M9), `que`/`qué`, `como`, `si`, `un`/`una`, `muy`, `cansado`. M2 deliberately uses
  `ocupado` rather than `cansado` so M9's feelings module can own its own adjective.
- Two shapes are reachable only through a `forms` list and a later module may want its own row for
  them: `libro` (in `libros`' forms) and `película`. Both land on the right lemma, so this is a
  note for M3's author, not a defect.

## Corrections applied during the pass

Self-review of the draft, plus the audit above, changed five things:

1. **`de`'s cue was "from"** while C03 (`Soy estudiante de música`) and S03 tap it in the "of" seat.
   Now `from · of`, with the note naming both jobs — the row answers for both.
2. **ser, querer and estar paradigms were originally single rows with full `forms` lists.** The
   audit showed that would have handed M1 ownership of `eres`, `es` and `quieres`, making M2's and
   M3's own rows unreachable. Split as described above.
3. **`Buenos días` had `buenas tardes`/`buenas noches` in `forms`.** Removed: siblings, not forms.
4. **M2-S02's trap claimed `buen día` was wrong.** It is the everyday greeting in parts of Latin
   America. The trap now says only what is true everywhere — the greeting tracks the clock, and
   `buenas tardes` takes over after lunch — and the regional question is open question 4 below.
5. **M1-S09's `agua` note originally taught the `el agua` rule twice**, once in the note and once as
   the sentence's headline. Trimmed to one clause plus a pointer to M3, which is where the brief
   puts the drill.

## Verification

- `npm run content:validate` → **CONTENT 13/13 ok** (no `fixture` flag on either module)
- `npm run content:build -- --with-unverified --with-fixtures` → `en-es: 2 modules (L1-M1..M2)`,
  `index L1-M1: 26 surfaces`, `index L1-M2: 43 surfaces`
- `npx vitest run tools/validate.test.ts tools/content-build.test.ts src/course/types.test.ts` →
  **110/110 green**
- `npm run typecheck`, `npx eslint .`, `npx prettier --check .` → clean
- Payload, measured both ways:
  - **strict (what ships today): unchanged.** `BUDGET fonts 361.2 KiB ≤ 380`, `js 94.2 KiB gzip`,
    `total 548.3 KiB gzip ≤ 580` — en-es is a fixture course, so the strict build skips it and this
    content costs the learner build nothing.
  - **dev build (all three courses): 567.3 → 578.3 KiB gzip total**, fonts 365.7 → 367.5 KiB. So the
    two modules cost **+11.0 KiB gzip**, of which +1.8 KiB is Latin glyph coverage (the accented
    letters and `¿`). Latin is indeed far cheaper than Devanagari per module. **Flag for #195:** the
    dev build now sits 1.7 KiB under the 580 KiB limit, so flipping en-es live — let alone authoring
    M3–M10 — needs the budget conversation before the content conversation.

## Open questions for a native pass

Nothing below has been changed in the content. These are the calls where guessing would be worse
than asking — dialect, register, naturalness, and every phonetic claim.

### Variety and dialect

1. **Which Spanish is this course?** Neither the brief nor `courses.json` rules on a target variety.
   These modules are written pan-Hispanic: **no vosotros anywhere** (L1 teaches `tú` and `usted`
   only, which the brief's patterns already imply), no peninsular-only or Latin-America-only
   vocabulary, and pronunciation notes that name both norms where they differ. If the course should
   pick one, that decision should be made before M3, because it changes vocabulary (`coche` vs
   `carro`/`auto` — and M3's brief already writes `un coche rojo`), not just spelling.
2. **Seseo, stated as a choice.** M2-S04's sound note says the `c` in `gracias` is an *s* across
   Latin America and a *th* in most of Spain. Is naming both the right call for a beginner, or
   should the course teach one and mention the other later?
3. **`ll` as the y of "yes"** (M1-S01) is hedged with "through most of the Spanish-speaking world",
   which quietly means "not Buenos Aires". Is the hedge enough, or should Rioplatense *sh* be named?
4. **`buen día`.** Standard in parts of Latin America beside `buenos días`. Should M2 admit it in a
   variation, or is the plural everywhere the right thing to drill first?
5. **`de India` vs `de la India`.** M1-S02 and M2-S09 say `Soy de India` / `¿Es usted de India?`,
   carried over from the fixture and matching hi-mr's भारत. `la India` is the traditional form and
   still common. Which does a Mexican or Spanish ear expect from a beginner?
6. **`español` vs `castellano`** (M1-S03, S10). `español` is what a course for English speakers
   normally teaches; in parts of Spain and the Southern Cone `castellano` is the everyday word.
   Worth one clause in the `español` row, or noise at L1?

### Naturalness and register

7. **`Quiero café` / `Quiero agua` as requests.** Grammatical and useful, and M1's usage line says
   they are direct rather than rude — but is bare `Quiero …` what someone actually says in a café,
   or would a native reflex reach for `Me pones…` / `Un café, por favor`? The polite forms are out
   of L1's scope; the honesty of the usage line is the question.
8. **`Quiero el café`** (M1-C08) — is the definite-article reading ("that coffee, the one we were
   talking about") natural enough to drill against `Quiero café`?
9. **`Estoy ocupado` as the M2 adjective.** Chosen over `cansado` to leave M9 its own row. Is "I'm
   busy" the natural second answer to `¿Cómo estás?`, or would `regular` / `más o menos` / `bien` be
   the real range?
10. **`Soy estudiante de español`** (M1-S03) — natural, or would a learner say `Estudio español`?
    The module cannot use `estudio` (it teaches present-tense conjugation in M4), so the frame was
    chosen for the no-article lesson; the question is whether it sounds like something a person says.
11. **`Me gustan las películas` for "I like films"** — is `películas` the everyday word next to
    `cine`?
12. **Register chips.** `informal` is set only on the two `tú` sentences (M2-S03, S07); everything
    else is `neutral`, including the `usted` lines. Is `neutral` right for `usted`, or does the
    two-value enum need a third value before this course grows?

### Sound notes — nothing here can be heard by the author

13. Every `sound` line in both modules is derived from Spanish orthography and standard descriptions
    rather than from listening: the silent `h` (`hola`), `qu` = k (`quiero`), `gu` + a = gw
    (`agua`), the tapped single `r` (`libros`, `eres`), the fricative/near-absent final `d`
    (`usted`), `x` = j in `México`, the stress claims behind every written accent (`café`, `música`,
    `película`, `días`, `estás`), and the "Spanish cannot open a word with s + consonant" note on
    `estudiante`. A native ear should sample them; the stress claims are the safest, the consonant
    descriptions the least.

### Pedagogy calls the owner decides

14. **Two-token surfaces as vocabulary.** `Me llamo` and `Me gusta` are taught as single units so
    the bare pronouns stay free. That is right for the index and it hides the fact that `me` is a
    word. Should M3 or M4 break them apart once the learner can take it?
15. **M1 teaches only the first person.** Every sentence is `soy`/`quiero`/`me gusta`; the other
    persons appear in `forms`, in notes and in variations but never as a sentence. That keeps the
    module honest to its job ("introduce yourself") — is it also the right first taste of a
    language whose whole system is endings?
