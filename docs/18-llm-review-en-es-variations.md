# LLM review — en-es, the third-variation pass

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Fable 5), which
does not speak Spanish natively and cannot hear anything. `verified: true` on all ten en-es modules
still rests on the repo owner's authority, exactly as the earlier en-es reviews say; each of the
ten was re-read whole here — rules, word rows, notes, traps, sentences, variations and pools — and
now carries `verifiedAt: "2026-08-24"` with this pass's signature. **No native Spanish gate exists
for this course**, and the open questions at the bottom join the 79 already outstanding in
`docs/07-llm-review-en-es-L1-M1-M2.md`, `docs/07-llm-review-en-es-L1-M3-M5.md`,
`docs/07-llm-review-en-es-L1-M6-M10.md` and `docs/14-llm-review-en-es-surfaces.md`.

This is issue **#285**. Every en-es sentence carried exactly two variations (200 across 100
sentences); every sentence now carries three (300). **Nothing else moved**: no sentence, no word
row, no rule, no existing variation was deleted or reworded — the diff inside each sentence is one
appended `variations[2]` — and the two verification stamp fields. **No sentence stayed at two, so
no exemption was needed.**

## Method

The constraint #285 inherits from #281: a variation a learner reads in M1 has only M1's cumulative
index behind it, and `tools/content-build.test.ts` sweeps every en-es variation line against the
index of the module that shows it, pinned at ten decided misses. So every third variation was
authored **from the module's own cumulative surface set** (32 → 51 → 75 → 99 → 125 → 142 → 165 →
186 → 211 → 227 keys) and swept through the real engine (`matchSurfaces` + `tokenizeSurface`,
`src/engine/surface.ts`) against the emitted `public/content/en-es/index/L1-M*.json` before and
after authoring.

**Result: zero new misses.** The sweep still reports exactly the ten pinned lines — two proper
nouns, four forward references, the four tokens of the three #281 exemptions — so the pin in
`tools/content-build.test.ts` is untouched. No new proper noun was introduced anywhere: `Rohan`
appears only where M1's index already carries it, `Ana` and `México` only from M2 on, where theirs
do.

**The additions-only index proof is trivial this time, and was still run.** Variations are never
indexed (`content-build` indexes what is taught, never what is shown), so
`public/content/en-es/index/*.json` saved before the change and rebuilt after it are **byte-for-byte
identical**: 0 keys lost, 0 moved, 0 added, `maxSpan` unchanged. The paradigm-seam pins
(`quiere`/`quieres`, `hice`/`hiciste`, the gustar frame with bare `te`/`gusta`/`gustan` unclaimed,
`están`/`son`) all still pass — no new variation needs a bare token those seams keep unclaimed.

## What the third axis is, per sentence

Each third variation takes a structural axis the sentence's two existing variations do not:
person shift, negation, question form, tense contrast, agreement chain, frame flip, or the
question–answer pivot. Bare noun swaps were not used.

### L1-M1 — Who I am

M1 is deliberately question-free (the ¿? marks are M2's lesson) and its variations respect the
module's 5-word envelope, so the thirds here complete the taught paradigms instead: each gustar
row's variation set now shows the full pronoun set its own note teaches (`me · te · le`, #281's
surfaces), and `Quiero`'s set shows `quiero → quieres → quiere` whole.

| sentence | third variation | axis |
|---|---|---|
| S01 Me llamo Rohan | El estudiante se llama Rohan | a full noun as subject of se llama |
| S02 Soy de India | Soy Rohan, de India | soy + name, origin in apposition |
| S03 Soy estudiante de español | Soy estudiante de música española | agreement inside the de-phrase |
| S04 Me gusta el café | Le gusta el café | third person of the frame |
| S05 Me gusta la música | Le gusta la música | third person; completes me · te · le |
| S06 Me gustan los libros | Le gustan los libros | third person, plural frame |
| S07 Me gustan las películas | Te gustan las películas | second person, plural frame |
| S08 Quiero café | Quiere café | -o → -e; completes quiero · quieres · quiere |
| S09 Quiero agua | Me gusta el agua | frame flip: want → like, and the article returns |
| S10 Me gusta mucho el español | El español me gusta mucho | the liked thing fronted as real subject |

### L1-M2 — First exchange

| sentence | third variation | axis |
|---|---|---|
| S01 Hola, Rohan | Hola, ¿cómo estás? | greeting opens into the question |
| S02 Buenos días, Ana | Buenos días, ¿cómo está usted? | greeting + polite question stack |
| S03 ¿Cómo estás? | ¿Estás bien? | question word → yes/no question |
| S04 Estoy bien, gracias | No estoy bien | negation of the state |
| S05 Estoy ocupado | ¿Está usted ocupado? | polite register |
| S06 ¿Cómo está usted? | ¿Cómo están los estudiantes? | plural subject → están (#281 surface) |
| S07 ¿Eres de México? | ¿Ana es de México? | third-person question, statement order kept |
| S08 Sí, soy de México | Sí, es de México | answering for someone else |
| S09 ¿Es usted de India? | Sí, soy de India | the Q→A pivot: usted question, soy answer |
| S10 No, soy de México | No, soy estudiante | the correction frame beyond places |

### L1-M3 — Needs and wants

| sentence | third variation | axis |
|---|---|---|
| S01 Quiero un café | ¿No quieres un café? | negative question — the offer |
| S02 Quiero un café con leche | Quiero una sopa con pan | con generalised to new pairs |
| S03 No quiero pan | No necesito pan | no + any verb that carries the person |
| S04 Quiero una manzana roja | No quiero la manzana roja | definite article + refusal, agreement held |
| S05 Necesito agua fría | No necesito agua | negation of necesitar |
| S06 Quiero una sopa caliente | ¿Quieres una sopa caliente? | statement → offer |
| S07 Quiero comer | Necesito comer | frame flip: necesitar + infinitive |
| S08 Quiero estudiar español | ¿Quieres estudiar español? | question form |
| S09 ¿Quieres un café? | No, gracias | the polite refusal answer |
| S10 No quiero nada | No necesito nada | double negative across verbs |

### L1-M4 — My day

| sentence | third variation | axis |
|---|---|---|
| S01 Hablo español todos los días | Hablo español por la mañana | the block swapped for one slot |
| S02 Me levanto a las ocho | Ana se levanta a las ocho | named subject + se levanta |
| S03 Por la mañana como pan | Por la mañana no como nada | negative habit + nada |
| S04 Por la noche estudio español | Por la noche no estudio | negation |
| S05 Vivo con mi hermana | Vivo con mis hermanas | mi → mis with the noun |
| S06 Veo a mi hermana | Veo a mis hermanas | personal a in the plural |
| S07 ¿A qué hora te levantas? | ¿A qué hora se levanta Ana? | the question about a third person |
| S08 Trabajo por la tarde | Por la tarde trabajo | time phrase fronted |
| S09 ¿Trabajas por la mañana? | No, trabajo por la tarde | the correcting answer |
| S10 Todos los días me levanto temprano | No me levanto temprano | no in front of the whole me levanto |

### L1-M5 — Yesterday

The thirds put #281's new preterite and imperfect persons on screen: `comiste`, `hablaste` (S03's
`trabajaste`), `hiciste`, `hizo`, `fue`, `estudió`, `comías`, `estabas` all appear in a variation
for the first time. Five thirds are questions and five are statements.

| sentence | third variation | axis |
|---|---|---|
| S01 Ayer comí pan | ¿Qué comiste ayer? | -í → -iste, questioned |
| S02 Ayer hablé con mi hermana | Ana habló con mi hermana | -é → -ó with a named subject |
| S03 Ayer no trabajé | ¿Trabajaste ayer? | -é → -aste, questioned |
| S04 Ayer no hice nada | No hiciste nada | hice → hiciste (S05's own row, in-module) |
| S05 ¿Qué hiciste ayer? | ¿Qué hizo Ana ayer? | hiciste → hizo |
| S06 Ayer fui a México | Ana fue a México | fui → fue |
| S07 Ayer estudié mucho | Ana estudió mucho | -é → -ó |
| S08 Antes comía pan todos los días | ¿Antes comías pan? | comía → comías, questioned |
| S09 Antes era estudiante | Antes no era estudiante | negation in the imperfect |
| S10 Ayer estaba ocupado | ¿Estabas ocupado ayer? | estaba → estabas, agreement held |

### L1-M6 — Tomorrow

| sentence | third variation | axis |
|---|---|---|
| S01 Mañana voy a trabajar | Mañana no voy a trabajar | no in front of voy (rule 8) |
| S02 ¿Vas a comer con Ana? | Sí, voy a comer con Ana | the answer: vas turns back to voy |
| S03 Voy a estudiar después | ¿Vas a estudiar después? | question form |
| S04 Mañana no voy a hacer nada | Mañana no vamos a hacer nada | voy → vamos |
| S05 ¿Vas a estudiar esta noche? | No, esta noche no voy a estudiar | the double-no refusal |
| S06 Mañana trabajo todo el día | Mañana trabajaré todo el día | tense contrast: present ↔ -é future (#281's trabajaré) |
| S07 Mañana hablaré con Ana | ¿Hablarás con Ana mañana? | -é → -ás, questioned (#281's hablarás) |
| S08 Vamos a comer a las ocho | ¿Vamos a comer a las ocho? | plan → proposal |
| S09 El sábado voy a México | El sábado vamos a México | vamos + place: the direction a |
| S10 Mañana voy a ver una película | Mañana veo una película | present-as-future on another verb |

### L1-M7 — Where things are

| sentence | third variation | axis |
|---|---|---|
| S01 El libro está en la mesa | El libro no está en la mesa | negated location |
| S02 ¿Dónde está mi libro? | Está debajo de la mesa | the answer, known subject dropped |
| S03 Hay un libro en la mesa | No hay libros en la mesa | no hay + bare plural |
| S04 El libro está debajo de la mesa | ¿Qué hay debajo de la mesa? | asking with hay, not está |
| S05 Ana está al lado de la puerta | ¿Ana está al lado de la puerta? | yes/no check, statement order kept |
| S06 La tienda está cerca de mi casa | La tienda está cerca del parque | de + el = del after cerca |
| S07 Hay una tienda cerca de aquí | Hay una tienda al lado del parque | the where swapped, del intact |
| S08 ¿Dónde está el baño? | Está aquí | the minimal answer |
| S09 Mi casa está cerca del parque | Hay un parque cerca de mi casa | frame flip: está → hay |
| S10 Mañana voy al parque | ¿Vas al parque mañana? | voy → vas, questioned |

### L1-M8 — Numbers & shopping

The course deliberately names no currency (`cuesta`'s own note), so the priced answers use
`cuestan mucho` — the shape M8's rule 5 teaches — rather than inventing a money word.

| sentence | third variation | axis |
|---|---|---|
| S01 ¿Cuánto cuesta el café? | ¿Cuánto cuestan los cafés? | cuesta → cuestan on the same noun |
| S02 ¿Cuánto cuestan los libros? | Los libros cuestan mucho | question → statement, mucho after the verb |
| S03 Quiero dos cafés, por favor | Quiero dos cafés con leche, por favor | the con phrase inside the order |
| S04 Quiero un kilo de manzanas | ¿Cuánto cuesta un kilo de manzanas? | pricing the measure |
| S05 Una botella de agua, por favor | ¿Cuántas botellas hay? | cuántas + hay, agreement |
| S06 Quiero uno, por favor | ¿Cuántos quieres? | cuántos standing alone, like uno |
| S07 Hay diez libros en la tienda | ¿Cuántos libros hay en la tienda? | the counting question S02's trap names |
| S08 Quiero ocho manzanas, por favor | ¿Cuántas manzanas quieres? | the shopkeeper's question |
| S09 El libro es muy caro | El libro no es muy caro | negation with muy |
| S10 ¿Cuánto cuesta todo? | Quiero todo, por favor | todo as object |

### L1-M9 — Feelings & opinions

| sentence | third variation | axis |
|---|---|---|
| S01 Hoy estoy cansado | Ana está cansada hoy | third person, agreement follows Ana |
| S02 No quiero café porque estoy cansado | No quiero comer porque comí mucho | a past reason (M5's comí) |
| S03 Estoy cansado, por eso no quiero café | Estoy cansado, por eso necesito café | the same state, the opposite consequence |
| S04 ¿Por qué no quieres café? | Porque estoy enfermo | the bare porque answer |
| S05 Estoy contento porque mañana no trabajo | ¿Por qué estás contento? | the question that fishes for the reason |
| S06 ¿Por qué estás triste? | ¿Por qué está usted triste? | polite register |
| S07 Estoy enfermo, por eso no voy a trabajar | Hoy estoy enfermo, por eso no trabajo | hoy + plain present |
| S08 Me gusta el café porque es fuerte | Me gustan las sopas porque están calientes | the whole line pivots plural |
| S09 Estoy mal, por eso no estudio | Ana está mal hoy | mal invariable, for her too |
| S10 Estoy nerviosa porque mañana trabajo | Mañana trabajo, por eso estoy nerviosa | porque ↔ por eso, the facts reordered |

### L1-M10 — Connected talk

Every third stays inside the turn discipline (two or three sentences, none past eight words).
S05's third is the payoff #281 prepared: `un poco de` before a noun, homed on the `un poco` row
"because #285 will want it". S08's completes the goodbye family — `hasta luego` was the one form
of the `hasta mañana` row no variation showed.

| sentence | third variation | axis |
|---|---|---|
| S01 (greeting turn) | ¿Cómo estás? Bien, gracias, ¿y tú? | the short version; bien answers alone |
| S02 (pero turn) | Voy a trabajar. También voy a estudiar. | pero ↔ también: adding, not contradicting |
| S03 (y / también turn) | Quiero pan, café y una manzana | the list: y joins only the last two |
| S04 (courtesy turn) | Perdón, un café, por favor. Gracias. | perdón opens the courtesy chain |
| S05 (un poco turn) | Quiero un poco de agua, por favor | un poco de + noun (#281 surface) |
| S06 (entonces turn) | Mañana no trabajo. Entonces vamos al parque. | entonces + a shared plan |
| S07 (claro turn) | ¿Vamos al parque mañana? Claro, nos vemos a las ocho. | proposal, acceptance, seal |
| S08 (goodbye turn) | Adiós, hasta luego. | hasta luego, the open goodbye |
| S09 (nos vemos turn) | Nos vemos en el parque | meeting at a place: en, not a |
| S10 (perdón turn) | Perdón, ¿hay una tienda aquí? No, pero hay una tienda cerca del parque. | the no answer, pero recovers |

## Calls this pass had to make

1. **M1 stays statement-only.** M1's variations never use the ¿? marks — they are M2's lesson
   (rule 2) — and its existing variations never exceed the module's 5-word envelope. Two early
   drafts (a question, a 6-word chain) were reworked to respect both.
2. **Yes/no questions keep statement order.** M2's rule 1 teaches "the statement, unchanged, said
   as a question", so the third variations ask `¿Ana es de México?` and
   `¿Ana está al lado de la puerta?` — never the inverted `¿Es Ana …?`, which is real Spanish but
   not the taught shape. The M7 line differs from its own display only by the marks, which is the
   same marks-only delta the course already ships in the other direction (M2-S07, M4-S09).
3. **No new unresolvable surface, so no new exemption.** Where an axis needed an untaught word
   (second-person `necesitas`, `hablas`, `estudias`; currency; `y` before M10; `hoy` before M9),
   the variation was re-planned around a taught surface instead. This is why M8's priced answer is
   `cuestan mucho` and M4's negations stay first-person.
4. **In-module forward use is allowed**, as established (M1-S01's `Ana` before M2 existed is the
   old precedent; the index is module-cumulative): M3-S02 shows `sopa` before S06 teaches it,
   M5-S04 shows `hiciste` before S05's own row. A learner who taps them lands on the right row.
5. **No existing variation was deleted or reworded** — the re-read found no outright error in the
   200 existing lines (acceptance criterion 3: zero fixes to record).

## Verification

- variation sweep through the real engine, per module: **300/300 lines, zero new misses** — the
  only misses are the ten pinned in `tools/content-build.test.ts`, unchanged
- `public/content/en-es/index/*.json` before vs after `npm run content:build`: **byte-identical**
  (variations are never indexed; the additions-only invariant holds with nothing to prove)
- `npm run content:validate` → **CONTENT 40/40 ok**
- `scripts/verify.sh` → `TYPES ok | LINT ok | TEST 1331/1331 ok | CONTENT ok | FONTS ok | BUILD ok | BUDGET ok`
- `npm run budget` → `course:en-es` **71.5 → 75.3 KiB** gzip against 360; shell and the other three
  courses unmoved

## Open questions for a native pass

These are this pass's own calls. Nothing below blocks shipping; they join the 79 already
outstanding (67 from the three module reviews + 12 from #281), for 89 in all.

1. **`Le gusta …` three times in M1's thirds** (S04, S05, S06). Each completes its own row's
   `me · te · le` set, but a native reviewer may find three le-lines in one module heavy — and the
   `le` row question from #281 (leísmo, indirect object at L1) still stands behind all three.
2. **`Soy Rohan, de India`** — is the comma apposition natural at this rung, or should the
   variation be two sentences?
3. **`Soy estudiante de música española`** — grammatical, but is "a student of Spanish music"
   too contrived a thing to say? The alternative axes all broke the 5-word envelope.
4. **`El español me gusta mucho` / `La música…` fronting** — the fronted subject is common speech,
   but is it MARKED enough (contrastive topic) that calling it a plain variation misleads?
5. **`¿No quieres un café?`** — the negative offer politely expects a yes; the `changed` note says
   so. Is that pragmatics right, or region-dependent enough to soften?
6. **`¿Antes comías pan?`** — is antes fronted the natural question order, or would
   `¿Comías pan antes?` read better?
7. **`Me gustan las sopas porque están calientes`** — "las sopas" as a liked class: natural, or
   does the plural of a mass-ish noun jar?
8. **`Quiero todo, por favor`** — playful but real? Or does it need a context no variation line
   can give?
9. **`Está aquí` / `Está debajo de la mesa`** — the dropped known subject is the point; is a
   two-word answer too bare to stand as a variation line?
10. **`El sábado vamos a México`** — the note calls the a "the direction word, not the plan glue";
    is teaching that contrast inside a variation too compressed?
