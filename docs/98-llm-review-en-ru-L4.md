# en-ru L4 — LLM review

The review that clears each en-ru L4 wave to ship, written in the same change that authors it
(`CLAUDE.md`, "Ship `verified: true` in the authoring change"). The **native-speaker gate is a
separate, stricter bar and stays unmet**: every section below ends in open questions for a native
pass, and no later wave may close one of them by rewriting a shipped module.

Open questions CONTINUE the chain `docs/89-en-ru-L4-brief-decisions.md` opened, whose last number
is 67. Nothing already numbered is renumbered here.

## Wave 1 — L4-M1, L4-M2 (#532)

Authored against the briefs in `tools/course-briefs.ts` and the decisions recorded in `docs/89`.
The index this wave was written against is the real, emitted one, not the brief's account of it:
`public/content/en-ru/index/`, whose deepest file is `L3-M10.json` — **785 surfaces folded over 30
modules, `cumulativeThrough` L1-M1..L3-M10, `maxSpan` 3**. Every ownership claim below was checked
by running `npm run content:owner -- en-ru …` against that fold; nothing was reasoned out from the
brief. The course's own laws carry unchanged: romanized `display`, Cyrillic on the quiet `script`
line, a precomposed acute on every polysyllable, `vy` as the default register.

### L4-M1 "Explaining how" — the purpose word, and the negation that flips the aspect

Ten displays:

1. `Snachála nazhmíte knópku, potóm podozhdíte minútku.`
2. `Chtóby pomóch', nádo srázu pozvonít' vrachú.`
3. `Ya govoryú médlenno, chtóby vy pónyali.`
4. `Voz'míte klyuch i zakróyte dver'.`
5. `Ne zakryváyte dver', pozháluysta. Ya uzhé idú.`
6. `Snachála polozhíte sákhar, potóm dobáv'te vódu.`
7. `Éhto cháshka dlya cháya, a éhto stakán dlya vodý.`
8. `Ya prishyól, chtóby pomóch'. Ne bespokóytes', pozháluysta.`
9. `Ostorózhno otkróyte súmku i voz'míte dokumént.`
10. `Zapólnite ankétu médlenno i ostorózhno, chtóby ne býlo oshíbok.`

What it teaches. One construction and eight instruction verbs. The construction is `chtóby`, and
the module is built so that its single rule is unavoidable: S02 and S08 have the same doer on both
sides and take the **infinitive**; S03 and S10 have a different doer and take the **past**
(`chtóby vy pónyali`, `chtóby ne býlo oshíbok`, `chtóby vrach vsyó pónyal` in a variation). The
mnemonic and the etymology are the same fact — `chtóby` is `chto` + `by`, so it takes the forms
L3-M4's `by` takes — and the module says so rather than asking for the pair to be memorised twice.
The second spine is aspect in the imperative, which is L2-M1's pair pointed back at rather than
re-taught: S04 gives the perfective instruction (`voz'míte`, `zakróyte`), S05 negates it and the
verb has to change (`ne zakryváyte`), and S08's `ne bespokóytes'` shows the same flip on a
reflexive verb the learner already knows in the third person. `dlya` + genitive is the module's
quiet fourth thing (S07): the purpose that is a noun rather than an act, so that `chtóby` is never
asked to head a noun. Nothing is spent on sequence — `snachála`, `potóm`, `zatém` and `nakonéts`
are all already owned, which is what pays for eight imperatives inside a 25-word cap.

Sixteen rows, against the brief's eleven fresh keys. The eleven the brief named are all opened
(`chtóby`, `nazhmíte`, `voz'míte`, `otkróyte`, `zakróyte`, `zakryváyte`, `polozhíte`, `dobáv'te`,
`ostorózhno`, `médlenno`, `dlya`). Five more were needed by the sentences and are opened here, each
`free` on the emitted index: `knópku` (what `nazhmíte` presses), `dver'` (what the aspect pair
opens and closes — the brief's own worked example, and untaught before now), `pónyali` (the past
under `chtóby`, with `pónyal` and `pónyala` on the same row), `bespokóytes'` (the imperative of
L3-M6's `bespokóitsya`, pointing back at it), and `oshíbok` (genitive plural, which `ne býlo`
demands). `zakróyte` and `zakryváyte` are **two rows with two notes**, never one row with two
forms, per `docs/56` §4.

### L4-M2 "Cause and consequence" — polarity, and the reason that can now come first

Ten displays:

1. `Íz-za dozhdyá my ne poshlí na rabótu.`
2. `Blagodaryá vam ya vsyó pónyal.`
3. `Tak kak byl dozhd', ya ostálsya dóma.`
4. `Ya óchen' ustál, tak chto ya poshyól spat'.`
5. `Prichína odná: lift slomálsya, poéhtomu ya opozdál.`
6. `Ivána net dóma, znáchit on na rabóte.`
7. `Íz-za pogódy ya opozdál, no blagodaryá vam vsyó khoroshó.`
8. `Blagodaryá drúgu ya kupíl deshyóvyy bilét.`
9. `Íz-za rabóty ya rédko otdykháyu, poéhtomu ya vsegdá ustál.`
10. `Byl sil'nyy dozhd', tak chto ya ostálsya dóma i chitál knígu.`

What it teaches. Range, not machinery. L1-M9 could already say `potomú chto` and `poéhtomu`, one
clause each; what this module adds is that a cause can be a **noun** (`íz-za dozhdyá`, four
sentences of the ten) and that it can be **fronted** (`tak kak`, S03), which is what lets a
paragraph open with its reason instead of arriving at one. The two prepositions carry **polarity**
and that is the module's sharpest fact: `íz-za` + genitive for a bad outcome, `blagodaryá` +
dative for a good one, with S07 putting both in one sentence so the contrast is unavoidable and
the mistake block making the English error explicit (`Íz-za vas ya vsyó pónyal` thanks you by
accusing you). No new case is opened: the genitive is L2-M3's and L3-M8's, the dative L2-M1's and
L3-M7's, and `blagodaryá` is named as the only common preposition in this course besides `k` that
takes the dative. The three result connectors map onto English with no shift of role — `tak chto`
= so, `poéhtomu` = therefore, `znáchit` = so then — so the whole of what has to be held is
punctuation, which is grammar in this course for the third level running: the comma goes **before**
`tak chto` exactly as before `potomú chto`, and `poéhtomu` is an adverb rather than a conjunction,
which S05's second variation demonstrates by moving it inside its own clause (`ya poéhtomu
opozdál`).

Eleven rows, against the brief's seven fresh keys. The seven the brief named are all opened
(`íz-za`, `blagodaryá`, `tak kak`, `tak chto`, `znáchit`, `prichína`, `dozhdyá`). Four more are
opened, all `free`, and three of them are the brief's own rule applied to further nouns — a case
shape of an older lexeme gets its own row pointing back, because L4 never edits a file below it:
`pogódy` (genitive of L3-M4's `pogóda`), `rabóty` (genitive of L1-M7's `rabóta`), `drúgu` (dative
of L2-M2's `drug`). The fourth is `sil'nyy`, which S10 needs for `sil'nyy dozhd'` and which is the
module's only ordinary adjective. The brief's ban on verbal-noun causes (`íz-za opozdániya`) is
kept: every cause here is a noun the learner already owns, in a form this module opens.

### The brief seams, checked against the real index

**No seam in either brief was wrong.** That is the finding, and it is worth recording as plainly as
a correction would be, because the `docs/89` §4 pass is the reason: this is the first en-ru wave
whose INDEX SEAM notes survived verification intact. What `content:owner` said, quoted:

- `chtóby`, `nazhmíte`, `voz'míte`, `otkróyte`, `zakróyte`, `zakryváyte`, `polozhíte`, `dobáv'te`,
  `ostorózhno`, `médlenno`, `dlya` — every one `free`, as M1's note 5 claimed.
- `íz-za`, `blagodaryá`, `tak kak`, `tak chto`, `znáchit`, `prichína`, `dozhdyá` — every one
  `free`, as M2's note 5 claimed.
- The pointed-back keys are where the brief put them: `snachála → L2-M10`, `potóm → L1-M10`,
  `zatém → L3-M1`, `nakonéts → L3-M1`, `nádo → L3-M4`, `núzhno → L2-M1`, `ne → L1-M3`,
  `podozhdíte → L2-M7`, `pomóch' → L2-M1`, `potomú chto → L1-M9`, `poéhtomu → L1-M9`,
  `chto → L1-M9`, `tak → L3-M3`, `iz → L1-M1`, `za → L2-M1`, `dozhd' → L1-M5`.
- **`mózhno → L2-M1`**, confirming for the third time the correction `docs/89` §4 carried forward
  from the L3 review. M1 did not end up needing the word, but the claim was checked before that was
  known.
- **The soft-sign seam holds.** `content:owner -- en-ru "voz'míte" "vozmíte"` returns `free` for
  both, on two lines — they are two keys, exactly as the brief said, and only the one this module
  writes will ever carry a note. Every occurrence in M1 (display, three variations, two comprehension
  items) is spelled `voz'míte`.

One **refinement** to the hyphen seam, which the brief got right in direction and slightly
oversold in extent. `docs/89` §4 says `íz-za` "donates a bare `íz`, which no display will ever
write alone — harmless, landing on this module's own row." The emitted index adds a detail the
brief did not state: `surfaceIndexKeys` earns three keys, but the row only takes **two** of them.
`content:owner` prints it in one line:

```
íz-za	free   [parts: íz → free, za → L2-M1]
```

First occurrence wins, so `za` stays L2-M1's and the `íz-za` row never touches it; only `íz-za`
itself and the stray `íz` land here. The consequence for a later wave is the useful half: a module
writing `za` still resolves to L2-M1's note, and the only key this row adds to the course's stock
that a display may one day collide with is `íz`.

Two further checks the wave ran rather than assumed:

- **`maxSpan` stays 3.** The deepest emitted index reports `maxSpan: 3`; M2's `tak kak` and
  `tak chto` are indexed WHOLE and are two tokens each, so neither widens the resolver's scan
  window, and `tak` stays L3-M3's. This is `docs/89` §4's token-count decision, met.
- **No `RE-TEACH` on either module.** `npm run content:shown` printed none for L4-M1 or L4-M2, so
  no row of this wave is shadowed by an earlier module's note, and there is nothing here for the
  `docs/53` §3 style justification to cover.

### The ratchet

`npx vitest run tools/shown-surfaces.test.ts` — **11/11 passed**, en-ru holding at its baseline of
20. Both modules are `clean` under `npm run content:shown`: every token of every `display`, every
`variations[].display` and every one of the twenty-four comprehension items resolves in the fold.
Neither module contributes a finding, so the baseline neither rises nor falls, and nothing below L4
was edited — no L1, L2 or L3 file, and no other course.

`npm run content:validate` — `CONTENT n/n ok`, reading `CONTENT 287/287 ok` when this wave finished.
The total moves while the eight sibling waves land, so the number is a timestamp rather than a
claim; `en-ru/L4-M1.json ok` and `en-ru/L4-M2.json ok` are the two lines that are this wave's.

`npx vitest run src/course/types.test.ts` — the three failures are the module census and the two
per-course counts (`270` files, en-ar `30`, hi-en `30`), all of which are the parent's to move once
the wave is collected. Every other assertion passes, including the one that is this course's law:
`keeps the romanized course in its lane: display is the romanization, script the native line
(#353)` passes on its own (`vitest -t`), so no romanized field carries a Cyrillic character, no
acute is decomposed, `glossEn` is absent everywhere, and `sound`, `literal`, `usage`, `mnemonic`,
`mistake` and a `note` per word row are present on all twenty sentences.

### Open questions for the native pass

Continuing the chain from `docs/89` §7, whose last number is 67. Questions 55–58 there already
cover `chtóby` + past, the imperfective negative imperative, `íz-za`/`blagodaryá` polarity and the
acute on `íz-za`; these do not restate them.

68. **The eight imperatives, one at a time** (M1). Confirm that `nazhmíte`, `voz'míte`, `otkróyte`,
    `zakróyte`, `polozhíte` and `dobáv'te` are each the form a Russian actually uses for a
    single-step instruction to a `vy` addressee, and that the set does not read as brusque where
    `pozháluysta` is absent — S04 and S09 carry none.
69. **`Ne bespokóytes'` this early** (M1-S08). The imperative of a reflexive `-sya` verb is a shape
    no earlier module shows. Is `ne bespokóytes'` learnable as a frozen phrase here, or does it owe
    the learner the `-tes'` rule, which no module of this level opens?
70. **`chtóby ne býlo oshíbok`** (M1-S10). Confirm that the negative existential under `chtóby` —
    `ne býlo` plus the genitive plural — is the ordinary thing a person says or writes about
    filling in a form, and not a bookish construction that a spoken register would replace with
    `chtóby vy ne oshíblis'`.
71. **`cháshka dlya cháya`** (M1-S07). Is `dlya` + genitive what a speaker says of a teacup, or
    would `cháynaya cháshka` be the unmarked phrase and `dlya` reserved for a purpose that is not
    the object's ordinary one? The sentence is the module's only teaching of `dlya`.
72. **`Prichína odná:`** (M2-S05). Confirm the bare `odná` with a colon is natural in speech rather
    than a written-report register, and that a speaker would not say `Yest' odná prichína` or
    simply drop the announcement.
73. **`znáchit` and its comma** (M2-S06). Confirm `Ivána net dóma, znáchit on na rabóte` is the
    ordinary spoken inference, and settle whether the comma before `znáchit` is obligatory,
    optional, or a signal of a pause the learner should hear.
74. **`sil'nyy dozhd'`** (M2-S10). Confirm `sil'nyy` is the collocation for heavy rain and that
    `bol'shóy dozhd'` is not, since `bol'shóy` is the adjective the learner already owns and will
    reach for first.
75. **`blagodaryá drúgu`** (M2-S08). With no possessive, does `drúgu` read as "a friend" or does
    Russian want `moyemú drúgu` here? The cue says "a friend", and the possessive is not taught in
    the dative.
76. **Preposed `ostorózhno`** (M1-S09). Confirm that a manner adverb before the imperative
    (`Ostorózhno otkróyte súmku`) is the natural order, and whether postposing it changes the force
    from instruction to warning.
77. **A stress list, in the spirit of `docs/89` §4's last bullet.** Every mark this wave writes for
    the first time, to be checked as spellings rather than as grammar: `nazhmíte`, `knópku`,
    `médlenno`, `pónyali`, `voz'míte`, `zakróyte`, `zakryváyte`, `polozhíte`, `dobáv'te`,
    `ostorózhno`, `otkróyte`, `bespokóytes'`, `oshíbok`, `dozhdyá`, `blagodaryá`, `znáchit`,
    `prichína`, `pogódy`, `rabóty`, `drúgu`, `sil'nyy`. A slip here is a second key with no note
    behind it, which is how `voz'míte`/`vozmíte` became a seam in the first place.
