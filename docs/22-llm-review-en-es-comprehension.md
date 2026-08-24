# LLM review — en-es, the comprehension-pool rebuild

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Fable 5), which
does not speak Spanish natively and cannot hear anything. `verified: true` on all ten en-es modules
still rests on the repo owner's authority, exactly as the earlier en-es reviews say; each of the
ten was re-read whole for this pass — rules, word rows, notes, traps, sentences, variations and
pools — and carries `verifiedAt: "2026-08-24"` with this pass's signature. **No native Spanish
gate exists for this course**, and the open questions at the bottom join those already outstanding
in `docs/07-llm-review-en-es-L1-M1-M2.md`, `docs/07-llm-review-en-es-L1-M3-M5.md`,
`docs/07-llm-review-en-es-L1-M6-M10.md`, `docs/14-llm-review-en-es-surfaces.md` and
`docs/18-llm-review-en-es-variations.md`.

This is issue **#289**. 26 of en-es's 80 comprehension-pool items were byte-identical
(case-insensitively) to a hero sentence of their own module — M4: 1, M6: 3, M7: 6, M8: 6, M9: 6,
M10: 4 — so the exit test's comprehension half re-served what the learner had just produced, which
tests recall of the lesson, not comprehension. The other three courses had zero such duplicates.
Every duplicate is replaced with a fresh recombination of taught surfaces, and every pool grew
from 8 to **12 items** (80 → 120): at `comprehendCount` 2, pool size is retry freshness
(`src/engine/comprehension.ts` — a pool of 12 supports 6 fresh attempts before recycling, double
the old 4). **Nothing else moved**: no sentence, no variation, no word row, no rule — the diff in
each module file is the `comprehensionPool` array alone.

## Method

Every new or replaced item was authored **from the module's own cumulative surface set** (32 → 51
→ 75 → 99 → 125 → 142 → 165 → 186 → 211 → 227 keys) and swept through the real engine
(`matchSurfaces` + `tokenizeSurface`, `src/engine/surface.ts`) against the emitted
`public/content/en-es/index/L1-M*.json` before commit. All 120 items resolve with **zero misses**,
so `checkComprehensionPool` — the build's own gate — stays silent, and the [Q3] pool sweep in
`tools/content-build.test.ts` still passes.

**The index proof was run, not assumed.** Pools are never indexed (`content-build` indexes what is
taught, never what the exit ritual shows), so `public/content/en-es/index/*.json` saved before the
rebuild and rebuilt after it are **byte-for-byte identical**: 0 keys lost, 0 moved, 0 added,
`maxSpan` unchanged.

**The contract is now pinned.** `tools/content-build.test.ts` gained a test
(`keeps every en-es pool item fresh — 12 per module, none equal to any hero sentence (#289)`)
asserting both halves — pool ≥ 12 per module, and no pool display case-insensitively equal to ANY
hero sentence of the course (a stronger read than "its own module", and the acceptance criterion
of #289). A future edit can neither hand a hero back to the pool nor shrink the retry budget
without failing it.

## Freshness decisions

- **Hero equality is the contract, course-wide.** No pool item equals any of the 100 hero
  sentences, not just its own module's ten.
- **Variation equality was avoided on everything new.** The 300 variation lines (#285) crowd the
  same recombination space, so first drafts of ten new items landed on existing variation lines
  (e.g. `¿Qué hizo Ana ayer?` is M5-S05's third variation; `La mesa está al lado de la puerta` is
  M7-S05's). All ten were re-authored; **no new or replaced item equals any variation line**.
- **29 kept items equal a variation line, and stay.** Examples: M2-C04 `Estoy ocupada` (= a
  variation of S05), M5-C01 `Ayer comí una manzana` (= a variation of S01). These equalities
  pre-date #289 — #285 authored its variations against the shipped pools — and variations are
  lines the learner *reads*, never lines the exit test asked them to *produce*, so they are not
  the recall leak this issue fixes. Left as-is, recorded here.
- **Substring-of-hero is allowed, as before.** M10-C02 `Voy a trabajar, pero después voy a
  estudiar` is the answer half of hero S02 and was already counted clean by #289's own audit; the
  criterion is whole-string equality.

## What changed, per module

Status per item: **kept** (unchanged text), **replaced** (same id, fresh text — the old text was a
hero of its own module), **new** (C09–C12, and any added id).

### L1-M1 — Who I am (kept C01–C08)

| id | display | cue | axis of the new item |
|---|---|---|---|
| C09 new | Le gusta mucho la música | He really likes music | third person + intensifier, completing the `me · te · le` row |
| C10 new | Te gusta mucho el español | You really like Spanish | second person + `mucho`, distinct from S10 and from S04's `Te gusta el café` variation |
| C11 new | Me gusta la música de India | I like the music of India | noun-`de`-noun recombination (`Soy de India` × `estudiante de música`) |
| C12 new | Quiero el libro de español | I want the Spanish book | `Quiero + el N de N`, new object for the S08 frame |

### L1-M2 — First exchange (kept C01–C08)

| id | display | cue | axis |
|---|---|---|---|
| C09 new | Ana es de México | Ana is from Mexico | third-person origin statement (heroes only ask or say `soy`) |
| C10 new | Sí, estoy bien | Yes, I'm well | `Sí + statement` answer to S03/S06 |
| C11 new | Rohan está ocupado | Rohan is busy | `está + Adj` with a named subject |
| C12 new | ¿Cómo está Rohan? | How is Rohan? | wellbeing question about a third person (S06's form, new referent) |

### L1-M3 — Needs and wants (kept C01–C08)

| id | display | cue | axis |
|---|---|---|---|
| C09 new | Necesito un café caliente | I need a hot coffee | `Necesito + un N Adj` (adjective after noun) |
| C10 new | ¿Quieres agua fría? | Do you want cold water? | question + bare-noun object from S05's `agua fría` |
| C11 new | No necesito leche | I don't need milk | negated `necesito` (heroes only negate `quiero`) |
| C12 new | Quiero comer una manzana | I want to eat an apple | infinitive chain + object, joining S07 and S04 |

### L1-M4 — My day (kept C01, C02, C04–C08)

| id | display | cue | axis |
|---|---|---|---|
| C03 replaced (was hero S06 `Veo a mi hermana`) | Veo a Ana por la tarde | I see Ana in the afternoon | personal `a` + time phrase |
| C09 new | Se levanta a las ocho | He gets up at eight | third person of the reflexive row |
| C10 new | Vivo con Ana | I live with Ana | S05's frame, new companion |
| C11 new | ¿Trabajas por la noche? | Do you work at night? | do-less question + a time phrase the heroes never question |
| C12 new | Hablo con mi hermana todos los días | I speak with my sister every day | `hablar con` + frequency |

### L1-M5 — Yesterday (kept C01–C08)

| id | display | cue | axis |
|---|---|---|---|
| C09 new | Ana comió pan por la mañana | Ana ate bread in the morning | third-person preterite (`comió`) |
| C10 new | Ayer hice sopa | Yesterday I made soup | `hice` with a real object — "did/made", not only `nada` |
| C11 new | Rohan fue a México ayer | Rohan went to Mexico yesterday | third-person `fue`, adverb at the end |
| C12 new | ¿Estudiaste español ayer? | Did you study Spanish yesterday? | second-person preterite question |

### L1-M6 — Tomorrow (kept C01–C03, C06, C08)

| id | display | cue | axis |
|---|---|---|---|
| C04 replaced (was hero S04) | Esta noche no voy a hacer nada | Tonight I'm not going to do anything | S04's double negative, new time frame |
| C05 replaced (was hero S08) | Vamos a ver una película esta noche | We're going to see a film tonight | `vamos a` + new plan |
| C07 replaced (was hero S07) | El sábado hablaré con mi hermana | On Saturday I'll speak with my sister | one-word future, new day and hearer |
| C09 new | ¿Vas a ver la película? | Are you going to see the film? | `vas a` question + definite object |
| C10 new | Mañana estudio por la mañana | Tomorrow I study in the morning | present-for-future (S06's device) + the `mañana` / `por la mañana` contrast |
| C11 new | Voy a hablar con Ana después | I'm going to speak with Ana afterwards | infinitive `hablar` + `después` |
| C12 new | ¿Vas a trabajar todo el día? | Are you going to work all day? | question + `todo el día` |

### L1-M7 — Where things are (kept C04, C07)

| id | display | cue | axis |
|---|---|---|---|
| C01 replaced (was hero S01) | El café está en la mesa | The coffee is on the table | S01's frame, new subject |
| C02 replaced (was hero S08) | ¿Dónde está la tienda? | Where is the shop? | `¿Dónde está…?`, new referent |
| C03 replaced (was hero S07) | ¿Hay un parque cerca de aquí? | Is there a park near here? | `hay` question + `cerca de aquí` |
| C05 replaced (was hero S05) | Hay una mesa al lado de la puerta | There's a table next to the door | `hay` × `al lado de` |
| C06 replaced (was hero S09) | Mi hermana está en el parque | My sister is in the park | person located with `en` |
| C08 replaced (was hero S10) | Vivo cerca del parque | I live near the park | M4's `vivo` + `cerca del` |
| C09 new | ¿Dónde estás? | Where are you? | the location question turned on the listener |
| C10 new | Hay libros debajo de la mesa | There are books under the table | `hay` × `debajo de` |
| C11 new | El parque está cerca de la tienda | The park is near the shop | `cerca de` with two public places |
| C12 new | ¿Está Ana aquí? | Is Ana here? | verb-first yes/no location question |

### L1-M8 — Numbers & shopping (kept C02, C04)

| id | display | cue | axis |
|---|---|---|---|
| C01 replaced (was hero S01) | ¿Cuánto cuesta la sopa? | How much does the soup cost? | `cuesta` singular, new item |
| C03 replaced (was hero S03) | Quiero dos botellas de agua | I want two bottles of water | number + plural container |
| C05 replaced (was hero S05) | Un kilo de pan, por favor | A kilo of bread, please | verbless request, S05's shape |
| C06 replaced (was hero S09) | Todo es muy caro aquí | Everything is very expensive here | `todo` as subject + M7's `aquí` |
| C07 replaced (was hero S07) | Hay ocho manzanas en la mesa | There are eight apples on the table | `hay` + number, new place |
| C08 replaced (was hero S10) | ¿Cuántas botellas hay en la mesa? | How many bottles are there on the table? | feminine plural `cuántas` — nothing else shows it |
| C09 new | Quiero diez kilos de manzanas | I want ten kilos of apples | `diez` + plural measure |
| C10 new | La botella de leche es cara | The bottle of milk is expensive | feminine agreement `botella … cara` |
| C11 new | Las manzanas son muy caras | The apples are very expensive | plural agreement chain `las … son … caras` |
| C12 new | ¿Cuánta agua quieres? | How much water do you want? | feminine singular `cuánta` + mass noun |

### L1-M9 — Feelings & opinions (kept C05, C08)

| id | display | cue | axis |
|---|---|---|---|
| C01 replaced (was hero S01) | Hoy estoy contenta | Today I'm happy (a woman speaking) | S01's frame, feminine + new adjective |
| C02 replaced (was hero S02) | ¿Por qué no quieres comer? | Why don't you want to eat? | `¿Por qué no…?` + infinitive instead of S04's noun |
| C03 replaced (was hero S03) | Hoy no trabajo, por eso estoy contento | Today I don't work, so I'm happy (a man speaking) | `por eso` with cause and effect swapped relative to S05 |
| C04 replaced (was hero S04) | ¿Por qué estás nervioso? | Why are you nervous? (asked of a man) | S06's question, new adjective and gender |
| C06 replaced (was hero S08) | El café es muy fuerte | The coffee is very strong | `ser` for a quality + M8's `muy` |
| C07 replaced (was hero S07) | No voy a estudiar porque estoy mal | I'm not going to study because I'm unwell | negated plan + `porque` + `estar mal` |
| C09 new | Estoy triste porque estoy enfermo | I'm sad because I'm ill (a man speaking) | feeling explained by a feeling |
| C10 new | Ana está enferma hoy | Ana is ill today | named third person, feminine agreement |
| C11 new | Estoy enferma, por eso estoy en casa | I'm ill, so I'm at home (a woman speaking) | `por eso` + M7's `en casa` |
| C12 new | Estoy nervioso porque mañana voy a México | I'm nervous because tomorrow I'm going to Mexico (a man speaking) | `porque` + M6 future-with-motion |

### L1-M10 — Connected talk (kept C02–C05)

| id | display | cue | axis |
|---|---|---|---|
| C01 replaced (was hero S01) | Buenos días, ¿cómo está usted? Estoy bien, gracias, ¿y usted? | Good morning, how are you? — I'm well, thanks, and you? | S01's exchange in the `usted` register, paying off M10's `y usted` |
| C06 replaced (was hero S07) | ¿Vas a trabajar el sábado? No, el sábado no trabajo. Entonces vamos al parque. | Are you going to work on Saturday? — No, on Saturday I don't work. — Then we're going to the park. | question → `No + statement` → `entonces` consequence |
| C07 replaced (was hero S08) | Voy a la tienda. Hasta luego. | I'm going to the shop. See you later. | leave-taking with `hasta luego`, which no hero uses |
| C08 replaced (was hero S10) | Perdón, ¿dónde está la puerta? Está al lado del baño. | Excuse me, where is the door? — It's next to the bathroom. | S10's exchange inverted — the door is asked for, the bathroom locates it |
| C09 new | ¿Qué quieres comer? Un poco de pan, por favor. | What do you want to eat? — A little bread, please. | question + verbless `un poco de` answer |
| C10 new | Adiós, hasta el sábado. Nos vemos en el parque. | Bye, see you on Saturday. We'll see each other at the park. | farewell + `hasta el sábado` + `nos vemos` with a place |
| C11 new | ¿Cómo estás? Un poco cansado, ¿y tú? Estoy bien. | How are you? — A bit tired, and you? — I'm fine. (a man speaking) | three-turn exchange with an elliptical `un poco + Adj` answer |
| C12 new | ¿Hay leche? Sí, claro. Entonces quiero un café con leche. | Is there milk? — Yes, of course. — Then I want a coffee with milk. | `hay` question → `claro` → `entonces` decision |

## Language calls a native pass should check

1. **`Ayer hice sopa`** (M5-C10) — `hacer sopa` for "make soup" without an article. `Hice una
   sopa` or `hice la sopa` may be more common in some regions; the bare mass-noun object mirrors
   the course's own `Quiero café`.
2. **`Estoy en casa`** (M9-C11) — article-less `en casa` for "at home" is standard, but the course
   never teaches the idiom explicitly; the item banks on `en` + `casa` composing transparently.
3. **`¿Está Ana aquí?`** (M7-C12) — verb-first yes/no question; M7's own variation shows the
   statement-order `¿Ana está al lado de la puerta?`. Both are grammatical; the pool now shows the
   inverted order without a rule naming it.
4. **`Quiero diez kilos de manzanas`** (M8-C09) — a large but market-plausible quantity; check it
   does not read as odd.
5. **`¿Cuánta agua quieres?`** (M8-C12) — `cuánta` agreeing with feminine `agua` (an `el agua`
   noun). Correct by the standard rule, but the course never states the `el agua / la` exception
   beyond M1's word note.
6. **`Un poco cansado, ¿y tú?`** (M10-C11) — the elliptical answer drops `estoy`; natural in
   speech, unmodelled by any rule card.
7. **Cue register** — `I'd like` vs `I want` for `quiero` is inconsistent across kept items
   (M8-C04 keeps "I'd like", new items use "I want"); the kept text was not touched under this
   issue's no-collateral rule.
