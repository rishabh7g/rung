# en-es L4 — LLM review

Wave 1 of the level: `L4-M1` and `L4-M2`, the RANGE modules, authored under issue #529. This is the
first en-es L4 wave, so this file opens the level's review chain the way `docs/61` opened L2's and
`docs/77` opened L3's; later waves append their own `##` sections rather than editing this one.

Every surface below was checked against the REAL emitted index, not against memory and not against
the briefs: `npm run content:owner -- en-es …`, reading `public/content/en-es/index/` as it stood on
2026-09-08, which reports **715 surfaces owned, folded over 30 modules through L3-M10** — the same
fold `docs/86` was planned against, unchanged, because this wave built nothing. `maxSpan` is 3 and
stays 3: the longest surfaces either module opens are `por culpa de` and `por lo tanto`, three tokens
each, and every other new multi-token surface (`por último`, `para que`, `me lo`, `no hables`,
`no pongas`, `así que`, `ya que`, `puesto que`, `dado que`, `gracias a`, `sin embargo`) is two.

## Wave 1 — L4-M1, L4-M2 (#529)

### L4-M1 "Explaining how" — the imperative is two systems, and only one of them is an imperative

Ten displays:

1. `Primero calienta el agua, luego añade el café.`
2. `Primero come algo, después bebe agua y por último descansa.`
3. `Para ventilar la cocina, abre la ventana.`
4. `Para comer temprano, ven a mi casa a las siete.`
5. `Abre la ventana para que entre el aire.`
6. `Cierra la puerta para que no entre el frío.`
7. `No hables tan rápido, por favor.`
8. `No pongas el móvil en la mesa, por favor.`
9. `Toma el libro y dámelo mañana.`
10. `No me lo des ahora, dámelo luego.`

What it teaches, in the order the five rules run:

- **The affirmative `tú` command is the bare he-she present** — `calienta`, `come`, `bebe`, `abre`,
  `cierra`, `descansa`, `toma` — with nothing added. S01 and S02 spend one `-ar`, two `-er` and one
  `-ir` verb between them so the learner sees that the ending is the conjugation's, not the mood's.
- **The seven irregulars are a closed list.** One row (`ven`, S04) carries all of them in `forms`:
  `ven, haz, pon, di, sal, ten, ve`. They are a list because none of them is derivable, and the row
  says so rather than inviting a rule.
- **The negative command is not an imperative at all**: `no` + the present subjunctive you-form. Two
  rows carry the pattern — `no hables` with `no comas` and `no subas` in `forms` (S07, the regular
  three conjugations), and `no pongas` with `no hagas`, `no vayas` and `no digas` (S08, the point
  that the irregular list stops helping the moment the polarity flips). This is L3-M3's mood paying
  for itself, which is why M1 rather than M3 opens the level.
- **Purpose splits on the subject.** `para` + infinitive when one person does both halves (S03, S04);
  `para que` + subjunctive when two do (S05, S06). `entre` is the module's only fresh subjunctive
  cell outside the negative commands, and S06 puts the `no` inside the `para que` clause so that a
  learner sees a positive command with a negative purpose.
- **Clitics: one rule, two spellings.** `dámelo` written as one word with the accent the added
  syllables forced (S09), against `no me lo des` with the same two pronouns detached and fronted
  (S10). `me lo` is indexed as one two-token surface, so the block that never reorders is also one
  key.

Register is `informal` on all ten, per `docs/86` §2. The `usted` twin of each new command is named in
`usage` and never in a `display`: S04 points at L2-M4's `siga`/`gire`/`tome`, S08 at L3-M8's
`espere`. No formal twin is minted, and no L1/L2/L3 file is touched.

22 word rows against a cap of 25; ten sentences of 6–10 words against a bound of 12.

### L4-M2 "Cause and consequence" — the connector is chosen by what it attaches to

Ten displays:

1. `No hay tren, así que vamos en coche.`
2. `Ya que no hay tren, vamos en coche.`
3. `Hoy llueve mucho. Por eso no salimos de casa.`
4. `Por la lluvia, no salimos de casa.`
5. `Por culpa de la huelga, hoy no hay tren.`
6. `Gracias a tu ayuda, ahora está todo listo.`
7. `Puesto que hay obras, el autobús tiene retraso.`
8. `Dado que no tengo tiempo, hoy como en casa.`
9. `Hay obras en la calle; sin embargo, no hay mucho ruido.`
10. `No hay tren y hay huelga; por lo tanto, hoy no salimos.`

What it teaches:

- **The sort is grammatical, not semantic.** `ya que`, `puesto que`, `dado que` take a CLAUSE and
  prefer the front (S02, S07, S08); `así que` and `por eso` take a clause and stand only after it
  (S01, S03, S10); `por`, `por culpa de` and `gracias a` take a NOUN and never a clause (S04, S05,
  S06). S01 and S02 are the same content said twice — cause behind, then cause in front — so the
  position rule has a minimal pair rather than a description.
- **`por` is extended, not re-opened.** `por` → L3-M2, so S04 spends only the noun `lluvia` and its
  note says in as many words that `llueve` cannot follow `por`. `porque` and `por eso` → L1-M9 and
  are likewise re-used: neither gets a row, because a row would be unreachable and its note would be
  the second one a learner never sees.
- **`como` is refused in writing rather than by omission.** Rule 3 and S08's `trap` both name it, and
  S08 proves the problem inside its own display: its main clause is `hoy como en casa`, the `como`
  that L1-M4 owns. A causal `Como no hay tren` would have handed that learner a note about eating.
- **The formal pair is shown as formal.** `sin embargo` (S09) and `por lo tanto` (S10) are tagged
  `free` and their notes say the spoken twins are `pero` and `así que`, which the course already
  owns. Register is `neutral` throughout: the module carries no pronoun that would fix an address,
  and each `usage` says which scene it is imagining.

15 word rows against a cap of 25; ten sentences of 7–12 words against a bound of 13.

### Brief seams corrected, and what the emitted index actually said

**1. The sequencers are older than the briefs imply — and `primero` is not free of a meaning.**
`docs/86` §3 and the M1 brief's note 1 both describe L3-M1 as the module that "sequenced the
learner's OWN day (primero, luego, al final, its own words)". The index disagrees about all three:

```
primero   L2-M4
luego     L2-M7
después   L1-M6
al final  L2-M10
```

L3-M1 re-used them; it did not buy them. The correction matters most at `primero`, whose owner is
L2-M4-S10's ordinal row — `primera`, with `forms: ["primera", "primero", "segunda", "segundo"]` and a
note about `la primera calle` and `el primer libro`. So a learner tapping `Primero` at the head of
`Primero calienta el agua` is shown a note about ordinal agreement in a street name. This is the
`corta` class of trap the brief caught elsewhere, one step milder: it is at least the same lexeme
and the same "first", where `corta` would have been a haircut. M1 does **not** mint a second
`primero` key — the key is taken, a second row would be unreachable, and a level never edits the
file below it. Rule 4 of M1 therefore states the ownership out loud ("L1-M6 bought después, L2-M4
primero and L2-M7 luego") and question 76 below puts the adverb-against-ordinal reading to the
native pass.

**2. `dámelo` is ONE token, not two.** The M1 brief's index-seam note says "`se lo`, `me lo` and
`dámelo` index WHOLE — … Two tokens each, so maxSpan stays 3." Two of the three are two tokens;
`dámelo` is a single orthographic word and therefore a single-token surface, which is the whole point
of the attachment rule the module teaches. The conclusion survives — `maxSpan` stays 3 — but for a
different reason on that third surface. `content:owner` reports all three `free`, as the brief said.

**3. Every other seam in the M1 and M2 briefs held, and is worth recording as confirmed.** The four
traps the brief flagged came back exactly as it claimed:

```
corta   L2-M2      tome   L2-M4      espere  L3-M8      listo  L2-M2
como    L1-M4      por    L3-M2      porque  L1-M9      por eso  L1-M9
```

and every surface either brief called free came back `free`: `haz pon ven di sal ten ve dime toma
abre cierra mezcla` `no hagas` `por último` `para que` `se lo` `me lo` `dámelo`, and `así que`
`ya que` `puesto que` `dado que` `por lo tanto` `de modo que` `gracias a` `por culpa de` `debido a`
`sin embargo` `en vez de` `sobre todo`. M1 avoided `corta` as instructed and wrote `calienta`,
`añade` and `mezcla`-free recipes instead; neither module writes a `usted` command.

**4. One authoring decision the briefs left open: the two-clitic cluster is `me lo`, not `se lo`.**
`docs/86` §3 assigns "two clitics in one verb (`se lo dije`)" to M1, while the M1 brief's own patterns
name only `dámelo` / `No + me lo + <subjunctive-2sg>`. The module follows the patterns: `me lo` is the
cluster it teaches, because it is the one that appears in both placements in a single breath and
because the learner is a participant in it. `se lo` is left `free` for a later module; the brief's
warning that a bare `se` key would land on L2-M4's impersonal row stands unspent.

**5. New index facts a later L4 wave should not re-check.** `come` is `free` even though `como`
→ L1-M4: the imperative and the first person are different surfaces and the command needed no
special handling. `salimos` is `free` though `salir` → L3-M10. `entre`, `des`, `aire`, `cocina`,
`ventilar`, `siete`, `móvil`, `descansa`, `tren`, `coche`, `lluvia`, `huelga`, `obras`, `retraso`
were all `free` and are now M1's and M2's; `tiempo` → L3-M3, `ayuda` → L2-M8, `ruido` → L3-M6,
`llueve` → L3-M4, `autobús` and `calle` → L2-M4 and `trabajo` → L1-M4 were re-used unrowed.

### The ratchet

`npm run content:shown -- en-es L4-M1` and `-- en-es L4-M2` are both **clean — every shown surface
resolves**, with **zero** `RE-TEACH` lines and zero `COLLIDES INSIDE THIS MODULE` lines. Neither
module opens a key an earlier one owns, so no display in either module resolves to somebody else's
note, and no two rows of one module fight over one folded key.

`npx vitest run tools/shown-surfaces.test.ts` is **11/11** and the `en-es` baseline **holds at 10**.
Nothing was raised; nothing needed lowering, because the two modules add no finding of their own.
The ten en-es findings the baseline records are all L1–L3's and are untouched by this wave.

`npm run content:validate` is `CONTENT n/n ok` and was `CONTENT 282/282 ok` on the run that closed
this wave. The number is a moving one: nine courses author their L4 in the same shared checkout, so
it was 271 before these two modules landed and had climbed past 280 by the time the last check ran.
What matters is that it is `n/n` — no file in any course fails.

`npx vitest run src/course/types.test.ts` passes on everything that is a course law and fails only
on censuses: `finds all 270`, and the two per-course counts (`en-ar … toBe(30)`, `hi-en … toBe(30)`)
that sibling waves moved in the same shared checkout. All three are counts the parent updates when
the wave is collected, and none of them is en-es. Every assertion that IS a law — the tag enum, the
rule-index range, the register enum, the per-course orthography rules — passes on both new modules,
including the straight-apostrophe rule: neither file contains a curly apostrophe or quote.

### Open questions for the native pass

Continuing the en-es chain, whose last number in `docs/86` §8 is 63. Nothing existing is renumbered.
These are about the SENTENCES this wave ships, not about the briefs.

64. **`añade` in a spoken recipe** (M1-S01). Confirm that someone talking a friend through a dish
    says `añade el café` rather than `echa el café`, and whether `echa` is in fact the commoner
    spoken verb — in which case a later module should own it and this note should point there.
65. **`por último` against `al final` and `por fin`** (M1-S02). The module claims `por último` is the
    neutral last-step word, `al final` (L2-M10's) the end of a story and `por fin` the relief.
    Confirm the three-way split, and confirm `por último` is said and not only written.
66. **`ventilar la cocina`** (M1-S03). Confirm `ventilar` is the everyday verb for opening a window
    to clear a smell, and that `airear` is not what a Spaniard reaches for first.
67. **The seven irregular commands as a closed list** (M1-S04, the `ven` row). Confirm `haz, pon,
    ven, di, sal, ten, ve` is the whole list a learner needs, and that no eighth (`sé`, from `ser`)
    belongs in a beginner's list rather than in `usage`.
68. **`Toma` as the word said while handing something over** (M1-S09). Confirm `toma` is what the
    hand-out actually says in Spain, and that it does not read as an order to take something away.
69. **`dámelo` / `no me lo des` as a spoken minimal pair** (M1-S09, S10). This is the module's
    central claim. Confirm both halves are said in ordinary speech, and rule on whether `me lo` or
    `se lo` is the better first two-clitic cluster — `docs/86` §3 names `se lo dije`, the brief's
    patterns name `me lo`, and this wave followed the patterns.
70. **`No pongas el móvil en la mesa`** (M1-S08). Confirm the register: is this what one friend says
    to another at a table, or does it read as a parent to a child? If the latter, the `usage` line
    is wrong rather than the sentence.
71. **`Ya que no hay tren, vamos en coche`** (M2-S02). Question 51 asked whether `ya que` is the
    everyday fronted cause in principle. This asks it of the sentence: with `como` refused on index
    grounds, is `ya que` what a Spaniard would actually say here, or does the line read as written
    Spanish spoken aloud?
72. **`puesto que` and `dado que`, register** (M2-S07, S08). The module calls them the careful,
    written twins of `ya que`. Confirm, and confirm a learner meets them mainly in signs, reports
    and announcements rather than in conversation.
73. **`por culpa de` against `debido a`** (M2-S05). The module ships `por culpa de` as the blame
    half of a pair with `gracias a`, and names `debido a` in a rule only. Confirm `debido a` is the
    neutral-formal one and that the blame reading of `por culpa de` is as strong as the note claims.
74. **`el autobús tiene retraso`** (M2-S07). Confirm `tener retraso` is how a service is late and
    `llegar tarde` how a person is, and that `el autobús va con retraso` is not the commoner form.
75. **`sin embargo` with a semicolon** (M2-S09, and S10's `por lo tanto`). Confirm the punctuation
    an educated writer uses here, and confirm the note's claim that `pero` and `así que` are what the
    same two thoughts sound like out loud.
76. **`Primero` as an adverb, landing on an ordinal row** (M1-S01, S02; seam 1 above). A learner who
    taps `Primero` at the head of an instruction is shown L2-M4's note about `la primera calle`.
    Rule on whether that is acceptable — one lexeme, two uses — or whether the level should be asking
    for a different opener (`Para empezar`, `Lo primero`) so the why-tap lands somewhere honest.

## Wave 2 — L4-M3, L4-M4 and L4-M5 (#538)

The level's RANGE modules, authored under issue #538 in the same shared checkout as eight sibling
courses. As in wave 1 nothing here was remembered: every surface below was put to
`npm run content:owner -- en-es …` against `public/content/en-es/index/` as it stood on 2026-09-08,
which reports **763 surfaces owned, folded over 32 modules through L4-M2** — wave 1's 715 plus the
48 M1 and M2 bought. `maxSpan` is 3 and stays 3. The longest surfaces these three modules open are
`es importante que`, `es mejor que`, `hace falta que`, `por un lado`, `por otro lado`, `lo que pasa`,
`vale la pena`, `a lo mejor`, `no del todo`, `no es que` and `de todos modos`, three tokens each;
everything else is two or one. The one phrase that would have broken the ceiling is M5's own brief
pattern, `No estoy tan seguro` — four tokens — and §"Brief seams corrected" below records what was
done about it instead.

### L4-M3 "What might have been" — one machine, two verbs, and neither may do the other's job

Ten displays:

1. `Si hubiera sabido, habría venido a la fiesta.`
2. `Si me hubieras avisado, te habría esperado en casa.`
3. `Ojalá pudiera cambiar lo que dije aquel día.`
4. `Si me hubieras escuchado, no habría pasado nada.`
5. `Ojalá supiera qué decir en una fiesta.`
6. `Deberías haber llamado antes de la fiesta.`
7. `Tenía que haber salido de casa mucho antes.`
8. `Ojalá me lo hubieras dicho ayer por la mañana.`
9. `Menos mal que no dije nada aquella noche.`
10. `Me arrepiento de no haber dicho la verdad.`

What it teaches:

- **The paradigm is a rule, not a table.** Rule 0 states the whole imperfect subjunctive in one
  sentence — third-person plural preterite, drop `-ron`, add `-ra` — and the module then spends only
  two cells on rows of their own, `pudiera` (S03) and `supiera` (S05), each with its `forms` list.
  `tuviera` and `fuera` are shown nowhere and rowed nowhere: L3-M4 owns both, and a second row would
  be a note the index can never reach.
- **S01 and S02 are the two-slot rule with a minimal pair on top.** `hubiera` and `habría` get
  separate rows with separate `forms` lists, and rule 2 names the levelled `Si habría sabido` as the
  error before a learner can invent it. S04 adds the second interference on the same frame —
  `no habría pasado nada`, where Spanish negates twice — and its first variation moves `nada` in
  front so the learner sees the `no` disappear for a reason.
- **`ojalá` carries three of the ten, and they are three different wishes.** S03 wishes about now
  (`ojalá` + imperfect subjunctive), S05 wishes about a skill the speaker does not have, S08 wishes
  about the past (`ojalá` + `hubiera` + participle). Rule 3 is what ties them together, and the
  module never opens the emotion subjunctive that L4 defers entirely.
- **The two modal regrets are conjugated verbs, and the module says so twice.** S06 rows `debería`
  with `forms: ["debería", "deberías"]` and S07 rows `tenía que` and `haber`; rule 4 states the split
  (`debería` and `tenía` carry the person, `haber` never moves, the participle never agrees) and
  S07's `trap` keeps `tenía que haber` and `debería haber` apart where English collapses them.
- **S09 and S10 are the module's other half — relief and regret as vocabulary.** Rule 6 exists to
  keep them honest: `menos mal que`, `qué pena` and `me arrepiento de` take an ordinary indicative
  clause or an infinitive, and S09's `mistake` block is the subjunctive being wrongly pulled in.
- The `-se` twin is named in rule 5 and taught nowhere: `hablase` and `hubiese` are to be read, not
  written, which is what the brief asked for.

23 word rows against a cap of 25; ten sentences of 7–9 words against a bound of 13. `informal`
throughout, per `docs/86` §2.

### L4-M4 "Persuading" — the mood is the claim, and `aunque` proves it

Ten displays:

1. `Es verdad que es caro, pero lo compro igual.`
2. `Aunque es caro, este coche vale la pena.`
3. `Aunque sea caro, este coche vale la pena.`
4. `Es importante que vengas a la reunión mañana.`
5. `Es mejor que esperes: hace falta más tiempo.`
6. `Por un lado tienes razón; por otro lado, es caro.`
7. `Tienes razón, pero eso no es todo el problema.`
8. `Es importante que usted lo sepa antes de la reunión.`
9. `Lo que pasa es que no hay más tiempo.`
10. `Por supuesto que es caro, pero insisto: vale la pena.`

What it teaches:

- **S02 and S03 are the same eight words apart from one letter.** `Aunque es caro` against
  `Aunque sea caro`, with the identical counter-claim behind both, so the mood contrast is a minimal
  pair rather than a description. That is the module's centre and the reason M4 sits where it does.
  `aunque` is **not** re-opened — L3-M3 owns it — and `aunque sea` is a fresh two-token surface whose
  note says exactly that.
- **Three impersonal frames, one mood.** `es importante que` (S04, S08), `es mejor que` (S05) and
  `hace falta` (S05, with `hace falta que` in its `forms`) all index whole, all take the subjunctive,
  and all press a case without naming who is pressing it. S01's `es verdad que` is deliberately the
  odd one out and keeps the indicative; its `trap` is the whole distinction, because both frames open
  with `es` plus an adjective and only one of them judges.
- **`tienes razón` is presented as an opener, not a surrender** (rule 5, S06, S07). The row that
  carries it is bare `razón`, whose note states the real delta: Spanish HAS the rightness where
  English IS right, so `tener` is the verb and `eres razón` is the mistake block.
- **The turn-level frames are S06, S09 and S10.** `por un lado` / `por otro lado` weigh two things
  without ranking them; `lo que pasa` + `es que` names the real obstacle without dropping the claim;
  `por supuesto que` concedes loudest of all and still holds the line. `lo que pasa es que` is
  indexed as two surfaces exactly as `docs/86` §1 required, so `maxSpan` never reaches 4.
- **S08 is the module's one `usted` item**, and it makes the same case as S04 with the same frame and
  the same mood. Its note and `trap` say why the pronoun has to be written out — `usted` borrows the
  third-person cell, so `sepa` alone would read as being about somebody else — and its `usage` states
  the register decision out loud: politeness lives in the frame, and the frame did not change.

19 word rows against a cap of 25; ten sentences of 8–10 words against a bound of 14.

### L4-M5 "Disagreeing well" — the mood is the hedge, and here alone it is a choice

Ten displays:

1. `Bueno, no sé... no me parece bien, la verdad.`
2. `Quizá sea verdad, pero no estoy seguro.`
3. `Quizá es verdad, pero no es tan importante.`
4. `Puede que tengas razón, pero no lo haría.`
5. `A lo mejor es caro, pero vale la pena.`
6. `Hombre, no del todo; yo diría que es caro.`
7. `Pues no sé, la verdad es que me temo que no.`
8. `Le entiendo, pero no estoy tan seguro de eso.`
9. `No es que sea caro; es que no tengo tiempo.`
10. `Me temo que no, pero gracias de todos modos.`

What it teaches:

- **S02 and S03 are the level's most important minimal pair**, and they are built the way M4's is:
  the same seven or eight words with `sea` swapped for `es`. The `mistake` blocks are the point —
  neither sentence is ungrammatical, and each is flagged for *aiming wrong*: S02's error is a hedge
  that contradicts its own second half, S03's is doubt claimed by somebody who does not feel it.
  This is the only pair in the level where the mistake block is not a grammar error, and it is
  deliberate: the mood here is a decision, not a rule.
- **S04 and S05 are the two markers that have no choice.** `puede que` is subjunctive always,
  `a lo mejor` indicative always, and rule 1 says in as many words that this is why `quizá` is the
  one to reach for when the amount of doubt matters. `Puede que es` is named as the commonest English
  speaker's error in the module.
- **The softeners carry more than the mood does** (rule 2), and they are spread so that every one has
  a sentence behind it: `bueno` and `no sé` and `la verdad` (S01), `hombre` and `no del todo` and
  `yo diría` (S06), `pues` and `me temo` (S07), `de todos modos` (S10). `bueno` and `claro` are
  **not** rowed — L1-M10 owns them — so the discourse-marker fact lives in rule 3 and in S01's
  `trap`, which is where the brief put it.
- **`no es que` (S09) is `es que` with the mood flipped**, and the two rows sit in different modules
  on purpose: L4-M4 owns `es que`, L4-M5 owns `no es que`, and S09's note points at the M4 row. It is
  the cheapest possible demonstration that negation is a subjunctive trigger, and it costs one
  three-token surface.
- **Both addresses are shown, as `docs/86` §2 requires.** S04 and S06 conjugate `tú` and chip
  `informal`; S08 is the `usted` item and chips `formal`; the six frames that fix no address stay
  `neutral`. S08's second variation is the same sentence in `tú`, so the learner sees that the
  softeners themselves did not move.
- `yo diría` and `sería mejor` are spent whole as ready-made softeners built on L3-M4's conditional,
  and the tense is not taught (rule 5).

16 word rows against a cap of 25; ten sentences of 7–11 words against a bound of 13.

### Brief seams corrected, and what the emitted index actually said

**1. `espere` → L3-M8, not free — the one seam that would have shipped a wrong note.** The M4 brief
says nothing about it, and `esperes` was first shipped with `forms: ["esperes", "espere"]`, the
`usted` cell of the present subjunctive. `npm run content:shown -- en-es L4-M4` answered:

```
RE-TEACH L4-M4-S05 "espere": L3-M8 owns the key, so its note is what a learner is shown
```

L3-M8 spent `espere` as the `usted` COMMAND — please wait — which is the same spelling doing a
different job. A learner tapping `espere` inside `Es mejor que espere` would have been shown a note
about a polite imperative. The `forms` list was cut back to nothing, the variation was rewritten to
`Es mejor que esperes un poco`, and the `esperes` note now states the ownership out loud. This is
the `corta` class of trap that `docs/86` §5 caught elsewhere, found by the tool rather than by
instinct, and it is the argument for running `content:shown` before the row list is final.

**2. The brief's "index WHOLE at two tokens" for `hubiera sabido` and `habría venido` was refused.**
The M3 brief's note 5 says the two compounds "index WHOLE at two tokens each". `content:owner`
reports the bare auxiliaries free, which is what makes the whole-indexing unnecessary and harmful:

```
hubiera          free      habría           free
hubiera sabido   free      habría venido    free
```

Nothing collides, so there is no reason to spend two-token keys on two particular compounds and
leave `hubiera` and `habría` unowned. The module rows the BARE auxiliaries with their `forms` lists
(`hubiera / hubieras / hubiéramos`, `habría / habrías / habríamos`) and rows each participle
separately, so every compound in the module — and every compound a later module writes — resolves
from two owned pieces. The brief's conclusion survives (`maxSpan` stays 3); its mechanism does not.

**3. `ido`, `hecho` and `perdido` → L3-M7, so the two modal regrets could not be written as briefed.**
`docs/86` §4 names them as `debería haber ido` and `tenía que haber ido`:

```
ido      L3-M7      hecho    L3-M7      perdido  L3-M7
salido   free       llamado  free       dicho    free
```

L3-M7 is the perfect-tense module and it bought all three participles. The regrets are therefore
written on `llamado` (S06) and `salido` (S07), which are free and no less ordinary. `perdido` is
still SHOWN, in pool item C11 (`no habríamos perdido el tren`), where it resolves onto L3-M7's row —
which is correct, because it is the same participle doing the same job.

**4. `tenía` → L3-M5, so the regret indexes at two tokens and not three.** The brief offered
`tenía que haber` whole. `content:owner` reports `tenía → L3-M5`, `tenía que → free` and
`tenía que haber → free`, so all three were available; two was chosen because it leaves `haber` free
to be its own row, which S10 (`de no haber dicho`) and M3's rule 4 both need. `tenía que` also has
its own meaning worth a note — the obligation reading, against L3-M5's backshifted `tenía`.

**5. `yo` is `free` after thirty-two modules, which is a genuine hole and not a seam.**

```
yo   free      mí   L2-M5      ti   L2-M5      él   free
```

The course has never rowed its own first-person subject pronoun: it has been dropped, as Spanish
drops it, in every display since L1-M1. This wave does not fill the hole — a bare `yo` row belongs
to whichever module actually teaches emphatic subject pronouns — so no display in M3, M4 or M5
writes a bare `yo`. M5 spends `yo diría` as a two-token surface instead, which is what the brief
asked for anyway, and S06's note explains why the pronoun is written out there. **A later L4 or L5
wave that wants `Yo creo`, `Yo no` or `¿Y tú?` must open the row.**

**6. `No estoy tan seguro` is FOUR tokens and cannot be indexed whole.** The M5 brief lists it as a
pattern; `content:owner` reports `no estoy tan seguro → free` and `no estoy seguro → free`, and
either would raise `maxSpan` above 3. Neither was taken. The module rows bare `seguro` and lets
`no` → L1-M2, `estoy` → L1-M2 and `tan` → L3-M3 carry the rest, which is also the better teaching:
S08's `trap` is that `tan` is the dial, and the dial is only visible if `tan` is its own word.

**7. Three keys on one lexeme, kept apart by longest-match.** `verdad → L3-M3`, while `es verdad`
and `la verdad` both come back `free`. M4 rows `es verdad` (with `es cierto` in its `forms`), M5 rows
`la verdad`, and bare `verdad` stays L3-M3's. The resolver's greedy walk means the two-token keys win
wherever they apply and L3-M3's row is reached everywhere else, which is exactly the behaviour the
notes describe. The same pattern holds for `mejor → L2-M9` under `es mejor que` and `a lo mejor`,
`puede → L2-M1` under `puede que`, `vale → L2-M6` under `vale la pena`, `menos → L2-M9` under
`menos mal`, and `sé → L3-M2` under `no sé`.

**8. L3-M3 had already opened three present-subjunctive cells, which made M4 and M5 cheap.**

```
sea    L3-M3      tenga  L3-M3      pueda  L3-M3
vengas free       esperes free      sepa   free      tengas free
```

`aunque sea`, `quizá sea`, `puede que sea` and `no es que sea` therefore cost nothing beyond their
own frames, and only four fresh subjunctive cells were bought across both modules. `docs/86` §3's
claim that "L3-M3 opened the mood on one trigger" understates what it actually spent.

**9. Every other seam the three briefs named held, and is worth recording as confirmed.**

```
fuera L3-M4   tuviera L3-M4   podría L3-M4   iría L3-M4   sería L3-M4   haría L3-M4
si L3-M4      sí L1-M2        sea L3-M3      aunque L3-M3  depende L3-M3
estoy de acuerdo L3-M3        bueno L1-M10   claro L1-M10  pero L1-M10
vale L2-M6    puede L2-M1     me da igual L3-M6            lo siento L2-M1
disculpe L2-M1                perdone L2-M1  usted L1-M2   reunión L3-M2
```

and every surface the three briefs called free came back `free`: `hubiera habría ojalá debería
deberías supiera pudiera si hubiera me arrepiento lástima qué pena menos mal`, `es verdad es cierto
tienes razón razón en realidad de hecho lo que pasa es que además por supuesto por un lado por otro
lado insisto admito reconozco supongo hace falta es importante es mejor que aunque sea`, and
`quizá quizás tal vez puede que a lo mejor pues hombre la verdad más bien no del todo no exactamente
o sea seguro de todos modos aun así me temo entiendo no es que yo diría`. M5's own brief warning
that `bueno` and `claro` are NOT fresh was correct and is honoured: neither is rowed.

**10. One register refinement against `docs/86` §2, recorded rather than absorbed.** §2 puts M4 in
the group that "chips neutral and says which address the scene uses in `usage`". Four of M4's ten
displays conjugate `tú` outright (`vengas`, `esperes`, `tienes razón` twice), and one is the `usted`
item §2 itself asks for. Chipping those five `neutral` would make the chip say something untrue of
the sentence in front of the learner, so M4 chips `informal` on the four, `formal` on S08 and
`neutral` on the five that fix no address. §2's principle is unchanged — politeness lives in the
frame — and every `usage` still names the scene. M5 follows §2 exactly as written.

### The ratchet

`npm run content:shown -- en-es L4-M3`, `-- en-es L4-M4` and `-- en-es L4-M5` are all
**clean — every shown surface resolves**, with **zero** `RE-TEACH` lines and zero
`COLLIDES INSIDE THIS MODULE` lines on all three. The one re-teach this wave produced —
`espere` — was a defect and was fixed rather than kept, per seam 1 above; no deliberate repeat was
needed anywhere, so no two rows in this wave share a note.

`npx vitest run tools/shown-surfaces.test.ts` is **11/11** and the `en-es` baseline **holds at 10**.
Nothing was raised and nothing needed lowering: the three modules contribute **zero** findings of
their own. The ten en-es findings the baseline records are still the same ten L1–L3 surfaces
(`ana · méxico · es · profesor · estudio · quieres · buenas · tardes · muy · hermano`), untouched by
this wave.

`npm run content:validate` is `CONTENT n/n ok` — `CONTENT 307/307 ok` on the run that closed these
three modules, and `CONTENT 314/314 ok` a few minutes later as sibling waves landed. As in wave 1
the number is a moving one, because nine courses author L4 in the same shared checkout; what matters
is that it is `n/n`, with no file in any course failing.

`npx vitest run src/course/types.test.ts` is **332 passed, 3 failed**, and every failure is a census
belonging to somebody else, each of them moving while this wave was written: `finds all 311 …`
(`expected [ …(314) ] to deeply equal [ …(311) ]`), which the parent updates when the wave is
collected; `the en-ar modules this rule is written for … expected 34 to be 33`; and `the hi-en
modules this rule is written for … expected 35 to be 34`. None of the three names en-es, and none is
a language law. Every assertion that IS a course law passes
on all three modules — the tag enum, the rule-index range, the register enum, the `ModuleContent`
key check, the straight-apostrophe rule (none of the three files contains a curly apostrophe or
quote mark anywhere) — and the schema's own checks pass too: `schemaVersion` 5, ten sentences,
twelve pool items, non-empty `deconstruction.words` on every sentence, no note over 200 characters,
`prerequisites` naming the module before it in the same level, and `verified: true` shipped with its
signature in this same change.

### Open questions for the native pass

Continuing the en-es chain, whose last number is 76 (question 76 above; `docs/86` §8 ends at 63).
Nothing existing is renumbered. These are about the SENTENCES this wave ships.

77. **`Si hubiera sabido` with no object at all** (M3-S01). The module claims the bare form is the
    ordinary Spanish for *if I had known*, with no `lo`. Confirm, and say whether a speaker in Spain
    and a speaker in Mexico would both leave it out or whether `Si lo hubiera sabido` is what is
    actually said.
78. **`avisar` as the everyday verb for letting somebody know** (M3-S02). Confirm `Si me hubieras
    avisado` is the reproach a friend actually makes, and that `avisar` rather than `decir` is what
    carries the sense of advance warning.
79. **`no habría pasado nada` and its inversion** (M3-S04, and the first variation). Confirm that
    `nada habría pasado` is natural rather than merely grammatical, and rule on whether a learner at
    this rung should be shown the inversion at all or only the `no … nada` order.
80. **`Ojalá supiera qué decir en una fiesta`** (M3-S05). Confirm the whole line reads as something a
    person says about themselves rather than as a textbook example, and confirm `en una fiesta` over
    `en las fiestas`.
81. **`tenía que haber` against `debería haber`** (M3-S06, S07). The module claims `tenía que haber`
    carries an obligation that was owed and lands harder on the speaker. Confirm the difference is
    real in speech and not just available in a grammar, and say whether `debería haber` is the
    commoner of the two by a wide margin.
82. **`Menos mal que`** (M3-S09). Confirm it takes the indicative with no exceptions a learner would
    meet, and confirm the register: is `menos mal` said in a meeting as readily as between friends?
83. **`Me arrepiento de no haber dicho la verdad`** (M3-S10). The `usage` calls this the least casual
    of the module's regrets and says Spanish more often reaches for `ojalá` or `qué pena`. Confirm
    that ranking, and confirm the perfect infinitive with `no` in front of `haber`.
84. **`Aunque es caro` against `Aunque sea caro` on one and the same object** (M4-S02, S03). The pair
    is the module's centre. Confirm that both are natural about a car whose price is known to both
    speakers, and that swapping the mood really does move the price from agreed to merely granted —
    rather than the indicative simply being what everyone says regardless.
85. **`vale la pena` with no subject named** (M4-S02, S03, S10). Confirm `este coche vale la pena` is
    how it is said, and rule on whether `merece la pena` is the commoner form in Spain, in which case
    the note should say so.
86. **`Es mejor que esperes` as a way of talking somebody down** (M4-S05). Confirm the frame is
    heard as advice rather than as an instruction, and confirm `hace falta más tiempo` over
    `se necesita más tiempo` for the same thought.
87. **`Por un lado … por otro lado` in speech** (M4-S06). The module treats it as an ordinary spoken
    frame. Confirm it is not confined to writing, and confirm that Spanish repeats the whole phrase
    where English can shorten to *on the other*.
88. **`Por supuesto que es caro, pero insisto`** (M4-S10). Two claims to check: that `por supuesto`
    takes `que` before a clause, and that `insisto` said alone between two clauses is as light in
    Spanish as the note says — an English speaker would hear *I insist* as combative.
89. **`Es importante que usted lo sepa`** (M4-S08). Confirm this is what is actually said in a
    meeting, and rule on whether writing `usted` out is normal here or whether a Spanish speaker
    would rely on context and drop it, in which case the trap needs rewriting.
90. **The mood as a graded hedge on `quizá`** (M5-S02, S03). This is the single most useful claim in
    L4 and the one most likely to be an over-statement. Confirm that `Quizá sea verdad` and
    `Quizá es verdad` really are heard as different degrees of doubt by ordinary speakers, and not
    merely as a distinction grammars record. If they are not, both `mistake` blocks need rewriting,
    because neither sentence is ungrammatical.
91. **`bueno` as the first word of a refusal** (M5-S01; question 54 in `docs/86` §8 asked this of the
    brief, this asks it of the sentence). Confirm `Bueno, no sé... no me parece bien` reads as a
    refusal from its first word, and not as agreement followed by a change of mind.
92. **`hombre` said to a woman** (M5-S06). The note claims it is a marker rather than the noun and is
    said to women too, and that it is far commoner in Spain. Confirm both halves, and confirm `oye`
    or `mira` as the Latin American equivalent the note names.
93. **`Le entiendo` as the formal opener** (M5-S08). Confirm `le` over `lo` here for a `usted` object
    in Spain, say what a Latin American speaker would use, and confirm the module's claim that every
    softener around it is unchanged from the `tú` version.
94. **`No es que sea caro; es que no tengo tiempo`** (M5-S09). Confirm the negative really does force
    the subjunctive with no exceptions a learner would meet, and confirm the sentence is a natural
    way to decline rather than a grammar exercise.
95. **`gracias de todos modos` as the closing tail** (M5-S10). The module claims a bare `gracias`
    after a refusal sounds curt in Spanish where it does not in English. Confirm, and rule on whether
    `de todas formas` or `igualmente` is what is more often heard in the same seat.
96. **The three-way spelling of one word** (M5-S02, `quizá / quizás / tal vez`). Confirm they are
    genuinely interchangeable at this rung, confirm the note's claim that `quizás` is commoner before
    a vowel, and say whether `tal vez` really is slightly more formal or whether that is a regional
    difference the note has mislabelled.

## Wave 3 — L4-M6 through L4-M10 (#552)

Five modules, fifty sentences, sixty comprehension items, and the level's exit. Written in the
shared checkout alongside eight sibling courses; the emitted index moved twice underneath the wave
(`837 surfaces … through L4-M5` when it opened, `885 surfaces … through L4-M7` by the time M10 was
being drafted), which is exactly the drift the "ask `content:owner`, do not trust the brief"
discipline exists for.

### L4-M6 "Before and after" — the mood is chosen by the clock, not by the speaker

The level's most productive rule and its most invisible interference in one module. A time clause
pointing at the future takes the subjunctive; the identical clause pointing at a habit or the past
takes the indicative. English uses the present in exactly that slot — *when I get there, I will call
you* — so the wrong Spanish a learner produces is perfectly grammatical and means something else.
The module is therefore built on a minimal pair (S01 against S02, S04 against S05) rather than on a
table.

| | display | register |
| --- | --- | --- |
| S01 | Cuando llegues a casa, llámame. | informal |
| S02 | Cuando llego a casa, siempre llamo a mi madre. | neutral |
| S03 | Voy a esperar hasta que termine la reunión. | neutral |
| S04 | Antes de salir, cierra la ventana. | informal |
| S05 | Antes de que salgas, cierra la ventana, por favor. | informal |
| S06 | Desde que vivo aquí, ya no veo a mis amigos. | neutral |
| S07 | Ya he perdido las llaves, pero todavía no he llamado. | neutral |
| S08 | Después de que hables con el jefe, llámame. | informal |
| S09 | Mientras tanto, puedes esperar aquí o volver más tarde. | informal |
| S10 | Espere usted aquí hasta que acabe la reunión. | formal |

Fifteen rows, twenty-two surfaces: `llegues`/`llegue`, `llámame`, `llego`/`llegas`/`llega`,
`hasta que`, `termine`/`termines`, `antes de`, `antes de que`, `salgas`/`salga`, `desde que`,
`ya no`, `todavía no`/`aún no`, `después de que`, `hables`/`hable`, `mientras tanto`,
`acabe`/`acabes`. `cuando`, `mientras`, `ya`, `todavía` and `en cuanto` are SHOWN and not rowed —
they are L3-M10's, and the brief's instruction that this module "extends five L3-M10 rows and opens
no second key for any" was followed literally, which is why the module produces zero `RE-TEACH`
lines.

Three deliberate contrasts sit inside the row list rather than in prose. `hasta que` is a two-token
key so that bare `hasta` stays available (L4-M9 buys it, as the sense *as far as*). `ya no` and
`todavía no` are two-token keys so that L3-M10's `ya` and `todavía` keep their own. And `hables` is
a bare one-token key alongside L4-M1's two-token `no hables`: one shape, two jobs, and the note says
so rather than pretending the imperative is not there.

### L4-M7 "Official talk" — a comprehension module that says so out loud

Ten sentences, ten `formal` registers, and not one informal item — the only module in the level
like that, per the brief. Everything in it is heard rather than said: the honest claim in the
`usage` lines is that a learner meets this Spanish on their first morning at a station and almost
never speaks it. The three shapes are the impersonal `se` widened from L3-M8's counter into the
announcement, the `ser` passive as the *written* twin of that `se` rather than a replacement for it,
and the third-person deontic future.

| | display |
| --- | --- |
| S01 | Se ruega a los pasajeros que pasen al andén número dos. |
| S02 | Queda prohibido fumar en la estación de autobuses. |
| S03 | El pasajero deberá presentar el documento en la puerta de salida. |
| S04 | La estación fue construida en primavera y abierta en verano. |
| S05 | El tren de las ocho ha sido cancelado por una huelga. |
| S06 | Pase a la ventanilla número dos, por favor. |
| S07 | Atención: el tren de las nueve llega con retraso al andén dos. |
| S08 | El siguiente, por favor. Espere un momento. |
| S09 | Se prohíbe fumar en el andén y en la estación. |
| S10 | Tome el billete y pase a la próxima ventanilla. |

Nineteen rows, twenty-five surfaces — the cap exactly. `se ruega`, `pasajero`/`pasajeros`, `andén`,
`queda prohibido`, `fumar`, `deberá`, `presentar`, `salida`, `construido`/`construida`,
`abierto`/`abierta`, `ha sido`/`han sido`, `cancelado`, `pase`/`pasen`, `ventanilla`, `atención`,
`siguiente`, `se prohíbe`, `billete`, `próximo`/`próxima`. `aguarde`, `turno`, `impreso`, `podrá`,
`aviso` and `llegada` were all confirmed free and all declined against the cap; `turno` came back
and was bought by L4-M10 instead, where a story needed it.

`se ruega` and `se prohíbe` index WHOLE at two tokens, keeping L2-M4's bare `se`, exactly as
L3-M8's `se paga` does. The `fue` the passive leans on is L1-M5's, bought in the course's fifth
module and unpaid for here — the cheapest thing in the level, as the brief predicted.

### L4-M8 "Back then" — the cheapest module in the level, and the brief knew it

The imperfect as HABIT rather than as background, plus `soler` moved back one tense. `solía` is
taught as L3-M1's `suelo` moved, not as a new verb, because the learner already owns the frame.
The gift in rule 2 is real and worth stating out loud: the imperfect has three irregular verbs in
the entire language, and the learner already has one of them.

| | display | register |
| --- | --- | --- |
| S01 | Antes solía trabajar los sábados, ahora no trabajo nunca. | neutral |
| S02 | De pequeño jugaba en la calle todos los días. | informal |
| S03 | Cuando era pequeño, iba al parque con mi hermana. | informal |
| S04 | En aquella época no había teléfono en casa. | neutral |
| S05 | Ya no veo a mis amigos, pero antes los veía mucho. | neutral |
| S06 | Antes hacía mucho frío en aquella casa. | neutral |
| S07 | De joven estudiaba por la mañana y trabajaba por la tarde. | neutral |
| S08 | Cuando era pequeña, mi abuela hacía sopa los domingos. | informal |
| S09 | ¿Usted también trabajaba allí de joven? | formal |
| S10 | En aquella época la gente no salía por la noche. | neutral |

Eleven rows, twenty surfaces: `solía`/`solías`/`solían`, `de pequeño`, `jugaba`/`jugábamos`,
`iba`/`ibas`/`íbamos`, `época`, `veía`/`veías`, `hacía`/`hacías`, `de joven`, `abuela`/`abuelo`,
`allí`, `salía`/`salían`. The brief's prediction that "almost everything else this module needs is
already owned" held: `antes`, `ahora`, `era`, `estaba`, `comía`, `trabajaba`, `vivía`, `ya`,
`todavía`, `tenía`, `sabía`, `siempre`, `nunca`, `cada`, `suelo`, `suele`, `sueles` and
`todos los días` were every one of them confirmed at the module the brief named. That list is the
most accurate seam in the wave.

### L4-M9 "Places and journeys" — four path prepositions that English already separates

`a` the destination, `por` the route through, `hasta` as far as, `hacia` towards without arriving.
The brief is right that this is where English helps most in the whole level: the distinction is
already in the learner's head and only the labels are new, which is why the module can afford a
second system — the relative `donde` — in the same ten sentences. The stranger giving directions
speaks `usted` inside a story narrated in neutral, so the chip is per item (S07 alone is `formal`).

| | display |
| --- | --- |
| S01 | Fuimos a la costa en coche y pasamos por la montaña. |
| S02 | Tardamos dos horas en llegar al pueblo. |
| S03 | Subimos hasta el río y volvimos a pie. |
| S04 | Íbamos hacia la playa cuando nos perdimos. |
| S05 | El pueblo donde nació mi madre está en la montaña. |
| S06 | ¿Por dónde se va a la playa? Por esta carretera. |
| S07 | Siga por este camino hasta la plaza y gire a la derecha. |
| S08 | Cuando llegamos, el pueblo estaba en fiestas. |
| S09 | Cruzamos el río a pie y volvimos al pueblo por la montaña. |
| S10 | El viaje hacia la costa fue largo, pero el camino era fácil. |

Twenty-two rows, twenty-three surfaces: `fuimos`, `costa`, `pasamos`, `montaña`, `tardamos`/`tarda`,
`pueblo`, `llegar`, `hasta`, `subimos`, `río`, `hacia`, `playa`, `nos perdimos`, `donde`, `nació`,
`carretera`, `camino`, `llegamos`, `cruzamos`, `a pie`, `volvimos`, `viaje`. `por` is not rowed:
the path sense EXTENDS L3-M2's row exactly as the brief asked, and is carried by rule 0 and by three
`trap` lines instead. No proper noun appears anywhere in the module — every place is a common noun,
which is what keeps the ratchet where it is (see below).

The `hacia` / `hacía` pair is handled as a `trap` on S04 rather than as a second row, because
`hacía` is L4-M8's, one module earlier in this same wave. That is the module's neatest accident:
the two words a learner most easily confuses were bought two rungs apart and can point at each
other.

### L4-M10 "A story with a twist" — nothing new grammatically, and that is the design

Six-sentence narratives, the per-sentence bound applying to each sentence INSIDE the item as it did
at L3-M10. What the module adds is discourse: the raya, the inversion in an attribution, the shift
between direct speech and L3-M5's reported speech inside one story, and the small stock of turn
words. Every story's last line rewrites its first.

| | display | register |
| --- | --- | --- |
| S01 | Una vez fui a la tienda por pan. No había nadie. Por fin salió el panadero. —No queda pan —dijo. No dije nada. Resulta que era domingo. | neutral |
| S02 | Una noche llamé a mi hermana. —Ahora no puedo hablar —contestó. Más tarde me llamó ella. Me dijo que estaba en la calle. Al final hablamos mucho. Resulta que estaba en la estación. | neutral |
| S03 | Aquel día estaba en la playa con mi hermana. Hacía mucho frío y no había nadie. De repente llegó un coche. Salió el médico del pueblo. —¿Están bien? —preguntó. Resulta que alguien llamó por teléfono. | neutral |
| S04 | El lunes perdí las llaves de casa. Más tarde llamé a mi madre. —Ve a la cocina —dijo ella. Y allí estaba la llave, en la mesa. No dije nada. Resulta que la dejo siempre en la cocina. | informal |
| S05 | Una vez conocí a un médico en el tren. Hablamos dos horas de la gente del pueblo. Al final le di mi número. Nunca me llamó. Al rato llamó, muy tarde. Resulta que perdió el móvil aquel día. | neutral |
| S06 | Trabajaba en la tienda cuando llegó el jefe. —Hay un problema —dijo. —¿Qué problema? —respondí. De pronto no había nadie en la calle. El jefe dijo que era una huelga. Al final no trabajé más aquel día. | neutral |
| S07 | Aquella tarde fui al banco con una factura. Había mucha gente. Por fin llegó mi turno. —Esta factura no es de este banco —dijo ella. Volví a casa con la factura. Y ya no me importa. | neutral |
| S08 | El sábado perdí el móvil en el autobús. Llamé a mi número todo el día. Nadie me contestó. Por la noche alguien llamó a la puerta. —¿Es este tu móvil? —preguntó una niña. Resulta que estaba en el autobús de las ocho. | informal |
| S09 | Una vez llegué muy tarde a la cita con el médico. En la ventanilla no había nadie. Por fin salió una mujer. —Pase usted, por favor —dijo. Dije perdón. —No es tarde —contestó ella. | neutral |
| S10 | Aquel verano fuimos al pueblo donde nació mi madre. La casa era muy vieja y no había agua caliente. Un día llegó una carta. —Es para ti —dijo mi madre. Resulta que era de mi abuela. Y todavía no la he abierto. | neutral |

Thirteen rows, twenty-one surfaces: `una vez`, `por fin`, `queda`/`quedan`, `resulta que`,
`panadero`, `contestó`, `ella`/`él`, `de repente`/`de pronto`, `alguien`, `más tarde`, `al rato`,
`respondí`/`respondió`, `turno`, `niña`/`niño`, `mujer`, `carta`. S09 is the module's register
lesson: the narration is neutral and the quoted line inside it is `formal` — L4-M7's `Pase usted`
spoken by somebody else, inside somebody else's story.

### Brief seams corrected, and what the emitted index actually said

**1. `retraso` → L4-M2, not free — M7's only wrong seam.** The M7 brief's note 5 lists it among the
thirty surfaces it reports free. `npm run content:owner` disagrees:

```
retraso          L4-M2
```

L4-M2 spent it on an excuse — *the train was late, so I was late*. S07 shows it on a departure
board, which is the same word doing a colder job, so the sentence keeps it and the row does not
exist; the `usage` line names the earlier seat out loud instead. Zero `RE-TEACH` lines is the result.

**2. `aquel` and `aquella` → L4-M3, so `en aquella época` could not be indexed as briefed.** The M8
brief says `aquel`, `aquella` and `en aquella época` are all free and that `en aquella época` should
index whole. Two of the three are not free:

```
aquel            L4-M3
aquella          L4-M3
en aquella época free
```

A three-token whole key over `aquella` would have been a complete-looking paradigm swallowing an
owned cell — the en-it `sarei` failure in another shape. The module therefore rows bare `época`
only, and `en aquella época` resolves from `en` (L1-M7), `aquella` (L4-M3) and `época` (L4-M8). The
`época` note names L4-M3 so the learner tapping the phrase is not surprised.

**3. `tengas` → L4-M5, not free.** The M6 brief lists it among the seven subjunctive cells it
reports free. It is not, and it was the sibling wave immediately before this one that took it:

```
llegues          free      tengas           L4-M5
puedas           free      salga            free
termine          free      acabe            free
empiece          free
```

Nothing broke, because M6 never needed `tengas`. But the brief's list would have been the argument
for a `forms: ["tenga", "tengas"]` row, and that row would have been unreachable.

**4. `salimos`, `tren` and `coche` → L4-M2, not free.** Three of the thirty surfaces the M9 brief
reports free:

```
salimos          L4-M2      tren             L4-M2
coche            L4-M2
```

All three are shown in M9 and none is rowed. `salimos` is not used at all — S03 and S09 use
`volvimos`, which is genuinely free, and the module is better for it.

**5. Four surfaces the briefs assumed and nobody has ever taught.** These are the seams that cost
this wave the most time, because a brief that says nothing about a word reads as a word you may use:

```
llegar           free      su               free
fuimos           free      yo               free
```

`llegar` is the infinitive behind L4-M6's `llego` and `llegues` and behind the M9 brief's own
pattern `Tardamos + <time> + en + V-inf`; it had never been bought, and M9 buys it. `fuimos` had
never been bought either, which is startling for the preterite of *ir* in a course with `fui`,
`fuiste` and `fue` — M9 buys that too. `su` is why M7-S03 ships as `presentar EL documento` rather
than the brief's `presentar SU documento`: the possessive is untaught, and an official notice was
not the place to spend a row on it. `yo` is why four drafted lines in M10 lost an emphatic *yo*
they did not need.

**6. The M8 brief's "index WHOLE" instruction for `antes vivía`, `cuando era pequeño` and
`ya no vivo` was refused.** Every part of all three already resolves — `antes` → L1-M5,
`vivía` → L3-M10, `era` → L1-M5, `pequeño` → L2-M3, `vivo` → L1-M4 — and `ya no` was opened by
L4-M6 four modules earlier in this same wave:

```
ya no            free      (at the start of the wave)
ya no            L4-M6     (after M6 landed)
```

Whole keys over parts that all resolve buy nothing and shadow rows that already work, so none was
minted. This is the same conclusion wave 2 reached about `hubiera sabido`, on different evidence.

**7. `escrito`, `sin`, `él`, `tres`, `poco` and bare `todos` are all still unowned.** Not brief
errors — the M7 brief correctly reports `escrito` free — but worth recording, because `free` in
`content:owner` output means *available to spend*, not *already taught*, and a draft that reads the
column the other way ships an untaught surface. Two did slip through and `npm run content:shown`
caught both: `poco` in an L4-M8-S07 variation and bare `todos` in L4-M8-C08, where
`todos los días` (L1-M4, three tokens) had been shortened to `todos los domingos` and the key
vanished. Both were rewritten rather than rowed.

**8. The M10 brief's seam list is correct in every particular, including the raya.** `de repente`,
`de pronto`, `resulta que`, `por fin`, `una vez`, `contestó`, `respondió`, `me dijo`, `más tarde`
and `al rato` are all free; `cuando`, `mientras`, `ya`, `todavía`, `en cuanto`, `desde entonces`
and `vivía` → L3-M10; `al final`, `dijo` and `había` → L2-M10; `entonces` and `pero` → L1-M10;
`venía`, `vendría` and `quería` → L3-M5. Its claim about the dash was verified rather than assumed:
`—dijo` folds to `dijo` and resolves onto L2-M10's row, so the raya costs the index nothing. The
one thing the brief does not say is that `me dijo`, `y entonces` and `más tarde` all resolve from
owned parts already, so only `más tarde` was rowed as a unit — it reads as one adverb — and the
other two were left to their pieces.

**9. The index moved twice under the wave, and the footer says so.** `content:owner` printed
`837 surfaces owned, folded over 35 modules through L4-M5` when M6 was drafted and
`885 surfaces owned, folded over 37 modules through L4-M7` by the time M10 was. Any count quoted in
a brief is a photograph; the tool is the fold. Separately, `tools/check-shown.ts` was momentarily
unparseable mid-wave — a sibling's in-progress edit left a stray brace at line 182 — so the shown
check was run against a scratch copy of the committed version until the shared file compiled again,
and then re-run against the real `npm run content:shown` for all five modules. Both agree.

### The ratchet

`npm run content:shown -- en-es L4-M6`, `-- en-es L4-M7`, `-- en-es L4-M8`, `-- en-es L4-M9` and
`-- en-es L4-M10` are all **clean — every shown surface resolves**, with **zero** `RE-TEACH` lines
and **zero** `COLLIDES INSIDE THIS MODULE` lines on all five. No deliberate repeat was needed
anywhere, so no two rows in this wave share a note. The re-teaches this wave might have produced
were designed out rather than accepted: `cuando`, `mientras`, `ya`, `todavía` and `en cuanto` are
shown across four of the five modules and rowed in none of them, and `retraso`, `aquella`, `por`,
`espere`, `había` and `dijo` are likewise shown on their earlier owners' notes.

`npx vitest run tools/shown-surfaces.test.ts` is **11/11** and the `en-es` baseline **holds at 10**.
Nothing was raised and nothing needed lowering: the five modules contribute **zero** findings of
their own. This is the reason no proper noun appears in any of the fifty sentences or sixty pool
items — #61 leaves proper nouns unindexed, so a single `Toledo` in L4-M9 would have pushed en-es to
11 and failed the ratchet. Every place in M9's journeys and every person in M10's stories is a
common noun for exactly that reason.

`npm run content:validate` is `CONTENT n/n ok` — `CONTENT 350/350 ok` on the run that closed these
five modules, and `CONTENT 355/355 ok` a few minutes later as sibling waves landed. As in waves 1
and 2 the number is a moving one, because nine courses author L4 in the same shared checkout; what
matters is that it is `n/n`, with no file in any course failing.

`npx vitest run src/course/types.test.ts` failed **2 to 4 times** across the wave's runs, and not
one failure ever named en-es. `finds all N — nine L1-L3 ladders, and L4 closing course by course`
is the module census the parent updates when the wave is collected, and its expected count moved
under this wave three times (`expected [ …(351) ] to deeply equal [ …(347) ]`, then `…(355)` against
`…(354)`, then `…(357)` against `…(354)`) as sibling courses landed their own L4 modules. Beside it
sat the en-ar and en-ko sibling censuses and, on one run,
`hi-en L4-M9-S07 mnemonic … expected 'get there, arrive at, reach the place.' to match Devanagari`,
a defect in another course's file. Every assertion that IS a course law passes on all five
modules — the tag enum, the rule-index range, the register enum, the `ModuleContent` key check,
and the straight-apostrophe rule (none of the five files contains a curly apostrophe or quote mark
anywhere; the only non-ASCII characters they use are the Spanish accents, `ñ`, `¿`, the middle dot
in `cue` fields, the ellipsis, and the raya). `npx vitest run tools/` is **190/190**, which is
where `register.test.ts`, `delta-index.test.ts` and `course-briefs.test.ts` live. The schema's own
checks pass too: `schemaVersion` 5, ten sentences, twelve pool items, non-empty
`deconstruction.words` on every sentence, no note over 200 characters, `prerequisites` naming the
module before it in the same level, and `verified: true` shipped with its signature in this same
change.

### Open questions for the native pass

Continuing the en-es chain, whose last number is 96 (question 96 above; `docs/86` §8 ends at 63).
Nothing existing is renumbered. These are about the SENTENCES this wave ships.

97. **`Cuando llego a casa, siempre llamo a mi madre` as a natural habit sentence** (M6-S02). The
    whole module rests on this being ordinary Spanish rather than a grammar-book foil for S01.
    Confirm a speaker would say it unprompted, and confirm that `siempre` is what makes the
    indicative comfortable rather than merely permissible.
98. **`Voy a esperar hasta que termine la reunión`** (M6-S03). Confirm `terminar` over `acabar` here
    for a meeting, and rule on whether `hasta que termine` or `hasta que acabe` is the commoner
    ending — S10 ships `acabe` and the module treats them as interchangeable.
99. **`Antes de que salgas, cierra la ventana, por favor`** (M6-S05). The `mistake` block claims
    `antes de que` has no indicative option at all, ever. Confirm that is true in speech as well as
    in grammars, and confirm that a native would in fact use the infinitive version (S04) far more
    often when the subjects match.
100. **`Desde que vivo aquí, ya no veo a mis amigos`** (M6-S06). Two claims: that Spanish keeps the
     present where English reaches for a perfect, and that `desde que` and `ya que` really are as
     cleanly split as the rule says. Confirm, and say whether `desde que vivo` or `desde que vine`
     is what people actually say for this.
101. **`Ya he perdido las llaves, pero todavía no he llamado`** (M6-S07). The trap claims
     `todavía no` cannot be moved to the end of the clause the way English *yet* can. Confirm, and
     rule on whether `aún no` — offered as a form on the same row — is genuinely interchangeable or
     is more written than the note admits.
102. **`Mientras tanto` taking no verb** (M6-S09). Confirm the module's line that `mientras` takes a
     clause and `mientras tanto` takes a comma, and confirm that `mientras tanto` is what a
     receptionist says rather than `entretanto` or `de momento`.
103. **`Se ruega a los pasajeros que pasen`** (M7-S01). Confirm the singular `se ruega` with a plural
     addressee is what signs and loudspeakers actually print, and that `se ruegan` would be heard as
     wrong rather than merely stiff. Also confirm `pasen` over `esperen` for a platform change.
104. **`Queda prohibido` against `Se prohíbe` against `Prohibido`** (M7-S02, S09). The module ships
     the first two as near-equals with `se prohíbe` the commoner. Confirm that ranking, and say
     whether bare `Prohibido fumar` — which the module does not teach — is in fact the commonest of
     the three on a real sign, in which case a later wave should add it.
105. **`El pasajero deberá presentar el documento`** (M7-S03). Confirm the bare article over a
     possessive is what a notice writes, and confirm `documento` over `documentación` for what a
     traveller is asked to show at a gate in Spain.
106. **`La estación fue construida en primavera y abierta en verano`** (M7-S04). This is the one
     sentence in the module a learner might write. Confirm it reads as a plaque rather than as a
     translation, and confirm that the second participle can share the single `fue` the way it does
     here without the sentence sounding clipped.
107. **`El siguiente, por favor` as a complete utterance** (M7-S08). The module claims Spanish
     official talk is shorter than English expects and that this is the whole sentence. Confirm, and
     say what a Spanish clerk actually says most — `El siguiente`, `El que sigue`, or just a number.
108. **`solía trabajar` and `trabajaba` as exact equivalents** (M8-S01). The module says `solía` adds
     no strength and no extra pastness, only explicitness. Confirm, and rule on how common `soler`
     in the imperfect really is in speech — if it is markedly less common than `trabajaba`, the
     `usage` line needs to say so.
109. **`De pequeño` and `de joven` as the ordinary phrases** (M8-S02, S07). Confirm both are what
     people say rather than `cuando era pequeño` and `cuando era joven`, and confirm that `de joven`
     genuinely does not change for a woman where `de pequeño` does.
110. **`En aquella época`** (M8-S04, S10). Confirm it is neutral rather than literary, and rule on
     whether `en aquellos tiempos` or `antes` is what an ordinary speaker reaches for first when
     setting a scene twenty years back.
111. **`la gente no salía`, singular** (M8-S10). Confirm no native would write `salían` here, and
     say whether the plural is heard in speech anyway — if it is, the `mistake` block is too strong.
112. **`Tardamos dos horas en llegar`** (M9-S02). The module's sharpest interference claim. Confirm
     the `en` is compulsory and that `para llegar` would be heard as wrong rather than as a
     different shade, and confirm `tardamos` over `nos llevó` or `nos costó` for a journey.
113. **`Subimos hasta el río` against `Fuimos al río`** (M9-S03). Confirm that `hasta` really does
     mark the far end of a stretch and imply not going further, and that a speaker would choose it
     over `a` when the river was the turning point of a walk.
114. **`Íbamos hacia la playa cuando nos perdimos`** (M9-S04). Confirm `hacia` is what carries the
     admission that we never arrived, and rule on whether an ordinary speaker would simply say
     `Íbamos a la playa` and let the rest of the sentence do that work — the `mistake` block says
     the `a` version is not wrong, only less precise.
115. **`El pueblo donde nació mi madre`** (M9-S05). Confirm `donde` over `en el que` at this rung,
     and confirm that `nació` with no auxiliary is genuinely how a birth is reported — English
     speakers expect a passive and the module claims Spanish has none here.
116. **`¿Por dónde se va a la playa?`** (M9-S06). Confirm this is the question a stranger is actually
     asked, and rule on whether `¿Cómo se va…?` is commoner, in which case the pair belongs in the
     module rather than only `por dónde`.
117. **The raya, twice, with no closing dash** (M10-S01, S06). The module teaches that one dash opens
     the quoted line and a second opens the attribution, and that nothing closes either at a
     sentence's end. Confirm that is the modern convention in Spain and in Latin America, and
     confirm that a second speaker's line starts a new paragraph in print even though the module
     cannot show paragraphs.
118. **`Resulta que` taking the indicative under surprise** (M10, seven of ten items). Confirm the
     rule holds with no exceptions a learner would meet, and confirm the module's claim that
     surprise is not doubt — i.e. that `resulta que fuera` is not something a speaker would say.
119. **`No queda pan` as the baker's line** (M10-S01). Confirm `no queda pan` over `no hay pan` or
     `se ha acabado el pan` for a shop that has sold out, and confirm the whole story reads as a
     joke told against oneself rather than as an exercise.
120. **A story that ends in the present or the perfect** (M10-S04, S07, S10). Three of the ten
     narratives step out of the past in their last line — `la dejo siempre`, `ya no me importa`,
     `todavía no la he abierto`. Confirm all three land as endings rather than as tense errors, and
     say which of the three is the most natural way a Spanish speaker closes a story of this kind.
