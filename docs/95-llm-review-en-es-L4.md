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
