# en-es L1 — spoken Spanish, not textbook Spanish (LLM editorial pass)

**Date:** 2026-09-05 · **Reviewer:** Claude, LLM review, authorised by the repo owner ·
**Bar:** LLM review plus owner authority — the bar the course already shipped on (#206–#215).
**No native reviewer has read these edits.** This pass changes what the learner is asked to say,
so it is recorded sentence by sentence; every rewrite reverts by file.

---

## Why

The course's stated goal is speaking. An audit of the 100 hero sentences against how a native
speaker actually says them found the Spanish grammatical and, in most places, natural — the
brief's register decisions held (pro-drop throughout, `tú` as the default with `usted` as the
mismatch lesson, pan-Hispanic neutral vocabulary, `ir a` for the future with one `-ré` for
recognition, a blunt `Quiero` with the softeners deferred). What it found instead was a short
list of things nobody says or nobody means:

- `Soy de India` in ten places — India is one of the few countries that keeps its article, so
  the course was drilling `de India` where every speaker says `de la India`.
- M9's carrying pair, `No quiero café porque estoy cansado` / `Estoy cansado, por eso no quiero
  café` — a reason that does not hold, since tired people want coffee.
- `¿Cuánto cuesta todo?` at the till, where the total is asked with `ser`: `¿Cuánto es?`
- `Soy estudiante de español`, which nobody says of a language they are learning.
- A handful of odd content (`Ayer fui a México` and back in a day, `El libro está debajo del pan`,
  `Entonces voy a la tienda` repeating a shop just named) and a set of English cues in the
  textbook register (`I'd like` for a blunt `Quiero`, `In the morning I eat bread`).

---

## What changed — 21 heroes

**`la India`** (3 heroes, 7 more lines): M1-S02 `Soy de la India` (the `India` row is now
`la India`, tagged delta, with a note saying which countries keep the article; the mistake block
is `Soy de India` in place of the pro-drop `Yo soy de India`, which the trap still covers);
M2-S09 `¿Es usted de la India?`; every variation and pool item that carried the bare form —
M1-S02 ×2, M2-S07, M2-S09 ×2, M2-S10, M5-S06 (replaced, below), M6-S09, M1-C11 `Me gusta la
música de la India`, M2-C06 `¿Eres de la India?`. Rules M1 r1 and M2 r3 quote the new form.

**Reasons that hold** (M9, 3 heroes): S02 `No quiero café porque estoy enfermo` · S03 `Estoy
enfermo, por eso no quiero café` — `enfermo` is already M9's word (its row stays on S07, the
index is cumulative through the module). S04 `¿Por qué no quieres café?` still gets its
`Porque estoy enfermo`. S02's variation that already said `enfermo` became `No quiero café
porque no me gusta`; S03's woman-speaking variation follows the hero. Rules r0 and r5 rewritten;
S03's usage line now names `así que` as the spoken twin of `por eso`. S09 `Hoy estoy mal, por
eso no estudio` — the cue said "so I'm not studying", which means today, so the Spanish now says
so (the 7-word form was chosen over `…no voy a estudiar` to stay inside M9's 8-word ceiling).

**The bill** (M8-S10): `¿Cuánto es todo?`, cue "How much is it all?", with `¿Cuánto es?` as the
first variation and the trap, usage, mnemonic and mistake (`¿Cuánto es todos?`) rewritten around
`ser` for a total. `cuesta` / `cuestan` stay for items in S01/S02; rule r0 gained one sentence
saying the total is a different question. `allowedPatterns` gained `¿Cuánto es (todo)?`.

**`Soy estudiante`** (M1-S03): the report's first option, `Estudio español`, would have needed
M4-S04's `estudio` row and would have left M1 with no hero carrying `estudiante` — a row a pool
item (`Soy estudiante`) depends on. So the hero is the bare role, which is what rule r4 teaches;
`Estudio español` ("I'm studying Spanish") is the third variation, pointing at M4. The `español`
row moved to S10 (`Me gusta mucho el español`), and the `de` note's "of" example is now
`estudiante de música`.

**Odd content** (4): M5-S01 `Ayer comí mucho` ("I ate a lot yesterday"); M5-S06 `Ayer fui a casa
de Ana` ("Yesterday I went to Ana's") — the `casa` row moved here from M7-S06, its note now true
of both seats (`en casa` at home, `a casa de Ana` to Ana's, both without an article); M5-C06
`Ayer fui a casa de mi hermana`, M5-C11 `Rohan fue a México` (no `ayer`); M4-S06 `Veo a mi hermana
todos los días` (the pool already had the shape; `Veo la casa` became `Veo una película`);
M10-S06 `Hay una tienda cerca de aquí. Ah, entonces voy.` — a new free row `Ah`, and the trap
now teaches that `voy` alone is the answer once the place is known; the mistake is `yo voy`.
M7-S04's `debajo del pan` variation is `Está debajo del libro`.

**Register** (3): M10-S08 `Mañana voy a trabajar. Bueno, hasta mañana.` — `adiós` sounds final
in much of Latin America, so a new delta row `Bueno` replaces the `Adiós` row, rule r5 names
`hasta luego` and `bueno` among the courtesies and says why `adiós` is not, and M10-C10 follows
(`Bueno, hasta el sábado…`). M10-S07 `Sí, claro, vamos a comer a las ocho` (the `Claro` note says
it is usually said as `sí, claro`; the "eat at the shop" variation is now `en casa`). M2-S06's
usage line and M2-S05's `usted` variation say the pronoun is normally dropped (`¿Cómo está?`,
`¿Está ocupado?`) — the heroes keep `usted` because the verb mismatch is the lesson.

**Cues** (8 heroes, ~20 lines): `I want …, please` for every `Quiero …, por favor` in M8
(S03/S04/S06/S08 and their variations, S05's and S10's variations, C04, M10-S05's variation) —
consistent with M1 and M3, where `Quiero` was already "I want"; M3-S06 "I want some hot soup";
M4-S03 "I have bread in the morning"; M4-S10 "I get up early every day"; M5-S04 "I didn't do
anything yesterday"; M1 keeps "film" throughout (the `película` note no longer offers "movie").

**Minor:** M8-S09 gained a fourth variation, `El libro está muy caro`, so the `es caro` / `está
caro` contrast the rule and trap describe is something the learner is shown.

**Kept on purpose** (the report's own list, not reopened): `Me llamo Rohan`, `Me gusta el café`,
`Quiero café / agua`, `Estoy bien, gracias`, `Estoy ocupado`, `¿Eres de México?`, `No quiero
nada`, `Me levanto a las ocho`, `¿A qué hora te levantas?`, `Ayer no hice nada`, `¿Qué hiciste
ayer?`, `Antes era estudiante`, `Ayer estaba ocupado`, every `voy a`, `Mañana hablaré con Ana`,
`¿Dónde está el baño?`, `Hay una tienda cerca de aquí`, `Una botella de agua, por favor`,
`¿Cuánto cuesta el café?`, `Estoy contento porque mañana no trabajo`, `Nos vemos después`,
`Perdón, ¿hay un baño aquí?`, `Un café, por favor. Gracias. De nada.` Also kept: `¿Cómo está
usted?` and `¿Está usted ocupado?` as heroes (see Register), and M1-S02's cue "I am from India"
alongside M2's "I'm from Mexico" — the cue register was not in the report.

---

## Mechanics the pass had to respect

- The word index is cumulative and first-occurrence-wins, so every moved row was moved, not
  duplicated: `español` S03 → S10 (M1), `casa` M7-S06 → M5-S06. Two rows added (`Ah`, `Bueno`
  in M10), one replaced (`Adiós` → `Bueno`), one re-headed (`India` → `la India`, forms `[]`, so
  a bare `India` no longer resolves and a stray one fails the build). en-es still has ZERO
  duplicated surfaces; the index ends at 228 surfaces, `maxSpan` 3.
- Every comprehension-pool token must resolve (`checkComprehensionPool`): 6 pool items changed
  (M1-C11, M2-C06, M5-C06, M5-C11, M8-C04 cue only, M10-C10); the build is the proof.
- Word counts stay inside each module's `maxWordsPerSentence` (M9-S09 at 7 of 8; M10-S07's
  second sentence at 8 of 8).
- `tools/course-briefs.ts`, en-es section only: the M1 pro-drop note's example is `Soy de la
  India` and records the `Soy estudiante` change; M2's ser/estar example follows; M8 gained the
  pattern `¿Cuánto es (todo)?` and a sentence on the total taking `ser`; M9's pair is `enfermo`
  with a dated note on why. `src/course/types.test.ts` has no en-es assertion block and needed no
  change.
- No `verified*` field was touched, as on the hi-en pass.

## Gate

`content:validate` 90/90 · `content:build` (en-es 228 surfaces, `maxSpan` 3, every pool token
resolves) · `tsc -b` · `vite build` · `lint` · 253 tests · `course:en-es` 73.5 KiB gzip.

## What the owner is asked to ratify

- The 21 hero rewrites and their variations, mistakes and notes: `git diff 80be7c1 -- content/en-es/`.
- The two calls this pass made where the report offered a choice: `Soy estudiante` rather than
  `Estudio español` (M1-S03, for the index reason above), and `Ayer fui a casa de Ana` with the
  `casa` row moved into M5 rather than `El sábado fui a México` (whose `sábado` is M6-S09's only
  row and could not move).
- The three brief notes amended in place — a future en-es level should follow this pass.
