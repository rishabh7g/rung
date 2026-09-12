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

## Wave 2 — L4-M3, L4-M4 and L4-M5 (#541)

The level's RANGE modules, authored against the briefs in `tools/course-briefs.ts` and the decisions
in `docs/89`. The index this wave was written against is the real, emitted one: `public/content/en-ru/index/`,
whose deepest file is now **`L4-M2.json` — 819 surfaces folded over 32 modules, `cumulativeThrough`
L1-M1..L4-M2, `maxSpan` 3**. Wave 1 wrote against a 785-surface fold through L3-M10; this one had
its two modules in the index, which is why every claim below could be checked rather than reasoned
out. Nothing below L4 was touched, and no other course was touched. The course's laws carry
unchanged: romanized `display`, Cyrillic on the quiet `script` line, a precomposed acute on every
polysyllable, `vy` as the default register.

### L4-M3 "What might have been" — the tense `by` does not have

Ten displays:

1. `Yésli by ya ne zabýl klyuch, ya by ne opozdál.`
2. `Ya mog by vam pomóch' vcherá, no ya opozdál.`
3. `Nádo býlo pozvonít' vrachú vcherá.`
4. `Ne nádo býlo yemú zvonít' tak pózdno.`
5. `Zhal', chto ya ne pozvoníl vam ránshe.`
6. `Stóilo srázu pozvonít' vrachú i vsyó skazát'.`
7. `Nádo býlo vstat' ráno, ináche ya by opozdál.`
8. `Yésli by ya výshel ránshe, ya by uspél.`
9. `Zrya ya vas ne predupredíl vcherá.`
10. `Ya by vsyó sdélal ináche, yésli by mog.`

The module is a SUBTRACTION and the five rules say so in that order. Rule 0 is the brief's largest
claim written out — `by` has no tense, so `Yésli by u menyá býlo vrémya, ya by pozvoníl` is both the
present and the past reading and only an adverb or the situation picks between them. Rule 1 is the
interference that follows from it: over-building. Every mistake plate in the module is the same
invented double past in a different disguise — `ne byl zabýl` (S01), `mogú by` (S02), `stóit býlo`
(S06), `nádo býlo vstal` (S07), `yésli by ya by` (S08), `yésli by ya mogú` (S10) — because there is
exactly one error here and a learner meets it six ways. Rule 2 is the impersonal regret frame and
its refusal (`ne` in front of the whole thing, nothing else moved), rule 3 is the `dólzhen byl`
contrast the brief asked for by name, and rule 4 gathers `zhal', chto`, `mog by`, `stóilo` and
fronted `zrya` as the four regrets that blame nobody.

Thirteen rows, twenty-three new surfaces against a cap of twenty-five. The brief's five fresh items
(`zhal'`, `mog`, `moglá`, `stóilo`, `ináche`) are all there; the rest are the verbs the frames need
and could not borrow — `zabýl`, `uspél`, `predupredíl`, `sdélal`, and the three infinitives
`skazát'`, `vstat'`, `zabýt'`, each of which points back at a past form an earlier module already
owns (`skazál` L2-M10, `vstal` L1-M6, `délat'` L2-M8). `zrya` is the one addition the brief did not
name: it does in one word what `nádo býlo` does in a frame, and S09's mistake plate is the pair
`Zrya ya predupredíl` / `Zrya ya ne predupredíl`, which are opposite regrets one `ne` apart.

`dólzhen byl` is written about and never taught: it appears once, as S03's mistake `display`, which
is the only field the shown-surface check exempts. No row of this module opens `by`, `yésli`,
`nádo`, `dólzhen` or `dolzhná` — exactly as the brief required, and as `L3-M8` wrote the number rule
around `L1-M8`'s `rubléy`.

### L4-M4 "Persuading" — two particles English keeps in the voice

Ten displays:

1. `Ved' vy sámi éhto skazáli vcherá.`
2. `Ya zhe govoríl vam vcherá, chto éhto dórogo.`
3. `Vo-pérvykh, éhto dórogo. Vo-vtorýkh, éhto dalekó.`
4. `Naprimér, avtóbus stóit deshévle, chem metró.`
5. `Khotyá magazín dalekó, zató tam vsyó deshévle.`
6. `S odnóy storoný, éhto dórogo. S drugóy storoný, éhto khoróshiy podárok.`
7. `Dázhe vrach so mnoy soglásen.`
8. `Ímenno poéhtomu ya schitáyu, chto éhto oshíbka.`
9. `Soglasítes', ved' éhto lúchshe i deshévle.`
10. `Podúmayte sámi: éhto zhe óchen' dórogo.`

`ved'` and `zhe` carry the module. `ved'` opens its clause and appeals to shared ground; `zhe` sits
after the first stressed word and nowhere else, which S02's two variations demonstrate by moving the
rest of the clause around it and by starting the clause with `Éhto` instead of `Ya`. Both mistake
plates are honest about what kind of error they are: S01's is a REGISTER charge and says so —
`Vy sámi éhto skazáli` is perfectly good Russian and merely flat — while S02's `Zhe ya govoríl` is a
real syntax failure, because an unstressed particle has nothing to lean on in first position.

The concession pair is S05: `khotyá` on the half you give away, `zató` on the half you keep, with
the mistake plate offering `no` instead of `zató` and being told it is not wrong, only weaker.
S06 runs the unhyphenated `s odnóy storoný` / `s drugóy storoný` frame, which weighs and decides
nothing, deliberately beside S05, which decides. The last three sentences are the cheap moves:
`dázhe` before the item that should settle it (with a mistake plate that only MOVES the word and
gets a different claim), `ímenno` narrowing rather than intensifying, and the two `vy`-imperatives
`soglasítes'` and `podúmayte`, which hand the conclusion to the other person. S09's mistake is the
best one in the module: `Vy soglasítes'` is not an imperative at all but a future, so an invitation
becomes a prediction about somebody else's mind.

Twelve rows, fourteen new surfaces. `rázve`, `neuzhéli`, `sledovátel'no`, `takím óbrazom` and the
`-to` particle all stay out, as notes 4 required.

### L4-M5 "Disagreeing well" — three softeners, none of them new

Ten displays:

1. `Ya ne sovsém soglásen s vámi.`
2. `Vy ne znáyete, gde zdes' aptéka?`
3. `Vryad li on pridyót sevódnya vécherom.`
4. `Ya by skazál, chto éhto ne sovsém tak.`
5. `Da net, navérnoye, vy právy.`
6. `Vozmózhno, vy právy, no ya tak ne dúmayu.`
7. `Boyús', chto vy ne právy.`
8. `Ládno, ya soglasílsya, no ya ne sovsém uvéren.`
9. `Ya ne khochú spórit', no ya ne soglásen.`
10. `Da net, ya prósto ne sovsém soglásen s vámi.`

Every device is a re-use, which is what let the module spend its budget on vocabulary: the negated
question (S02, pointing at L2-M1's `Vy ne mózhete …?`), `by` as a register softener with no
hypothesis in it (S04, the same machine M3 spent ten sentences on), and the negated adverb (S01,
S03, S10). The module's sharpest fact is a WORD ORDER, and rule 3 states it as a minimal pair:
`ne sovsém soglásen` hedges, `sovsém ne soglásen` slams, and S01's mistake plate is nothing but the
two words swapped. `da net` gets its own rule and its own plate — with a comma it becomes two
answers in a row — and `prósto` closes the module by shrinking the objection, with a final plate
showing `prósto` and `sovsém ne` cancelling each other out.

Rule 1 is the volume rule the brief asked for and it ranks neither language: `Ya ne soglásen` is
civil Russian, and these devices are for keeping a conversation going rather than for repairing
rudeness that was never there. Eleven rows, fourteen new surfaces. `rázve` and `neuzhéli` are named
in no field at all; irony and diminutives stay L5's.

### The brief seams, checked against the real index

Three corrections and one confirmation-with-a-consequence. This is the wave's most valuable output
and it is quoted rather than summarised.

**1. M5's headline seam is wrong, and wrong in an instructive way.** Note 5 says: "THE VERB TO KNOW
IS NOT TAUGHT ANYWHERE IN THIS COURSE: `content:owner -- en-ru znáyu znat' ne znáyu znáyete` returns
free for all four, and a scan of the emitted index for any `zna`-initial surface returns NOTHING
across all thirty modules." The first half is right and the second is false:

```
znáyesh'	L2-M6
znáyu	free
znáyete	free
znat'	free
```

`L2-M6` teaches `znáyesh'` inside `Ty znáyesh', gde magazín?` — the `ty` form of exactly this verb,
in exactly this courteous-question shape, two levels earlier. The brief's scan missed it because it
grepped for `zna` and the shipped surface is `zná`, with a precomposed acute: a **stress-mark-blind
grep**, which is the same class of miss as the `voz'míte`/`vozmíte` seam Wave 1 recorded, read from
the other direction. The consequence for the authored module is small but real — M5 still opens the
row, because `znáyete`, `znáyu` and `znat'` are genuinely free, but it opens it as a POINT-BACK
rather than a first teach, and the row's note names L2-M6. Rule 4 is written the same way. The
useful half of the correction is the method: a `zna`-prefix search over the emitted index is not a
search for a Russian lexeme, and any future seam note that greps unaccented text is unreliable.

**2. M4's `skazáli` is not owned, so the module has to open it.** Note 5 says "`skazáli` points back
at L2-M10's `skazál`". What `content:owner` says:

```
skazáli	free
skazál	L2-M10
```

The plural past is a different surface and a different key, so "points back" was not available as a
seam — under "a level never edits a file below it", a new shape of an older lexeme gets its own row
in the module that first shows it. M4-S01 opens `skazáli` with a note naming L2-M10's `skazál` and
L1-M5's `býli` ending. The brief's direction was right and its mechanism was not.

**3. M4's fresh list names four words the module does not in fact index.** Note 5 lists `odnóy`,
`storoný`, `drugóy` and `sámi` among the fresh keys. All four are `free`, but the phrases are
indexed WHOLE and `surfaceIndexKeys` splits only on hyphens, so a three-token phrase earns exactly
one key:

```
s odnóy storoný	free
s drugóy storoný	free
```

Both live on one row of M4-S06, whose `forms` carry the pair. `odnóy`, `storoný` and `drugóy`
therefore remain **free after this wave** and are still available to a later module — recorded here
so that a future author does not assume L4-M4 took them. `sámi` is different: it is written bare in
S01 and S10, so it earns its own row and its own key. The rule the wave followed is the one the
briefs keep restating — index what a display actually writes, and nothing else.

**4. M4's `vo` donation is exactly as note 5 predicted, and the fix rather than the workaround was
taken.** `content:owner` prints it in one line:

```
vo-pérvykh	free   [parts: vo → free, pérvykh → free]
vo-vtorýkh	free   [parts: vo → free, vtorýkh → free]
```

So the `vo-pérvykh` row donates BOTH `vo` and `pérvykh`; the `vo-vtorýkh` row then finds `vo`
already taken by its sibling in the same module and adds only `vtorýkh`. The row's note is written
true of the part — naming `vo` as the shape L1-M7's `v` takes before a consonant cluster, which is
the same story L3-M2 told about `s` and `so` — and rule 3 repeats it. A later `vo vrémya` will open
a note about ordering an argument, and it will at least be a note that mentions `vo`. This is
`docs/89` §4's `po-móyemu` precedent applied forwards.

**5. M3's seam survived intact, including its spelling fact.** Every claim in note 5 was checked:

- Fresh, confirmed `free`: `zhal'`, `mog`, `moglá`, `stóilo`, `ináche`, and the whole frames
  `nádo býlo` and `ne nádo býlo`.
- Owned, and pointed back at rather than reopened: `by`, `yésli`, `nádo`, `dólzhen`, `dolzhná`
  → **L3-M4**; `býlo`, `byl`, `bylá`, `býli`, `vcherá` → **L1-M5**; `sevódnya` → **L1-M10**;
  `chto` → **L1-M9**; `vrémya` → **L2-M3**; `pozvoníl` → **L1-M6**; `vrachú` → **L3-M7**;
  `opozdál`, `výshel`, `ránshe`, `srázu` → **L3-M10**.
- The spelling that is an index fact holds exactly as stated: `content:owner -- en-ru "býlo" "bylo"`
  returns `býlo → L1-M5` and `bylo → free`, two lines, two keys. Every occurrence in M3 — displays,
  variations, comprehension items, mistake plates, rules and notes — is spelled `býlo`.

**6. `maxSpan` stays 3, and this wave is the first to put content at the ceiling.** The deepest
emitted index reports `maxSpan: 3`, and until now the only three-token keys in the course were
L1-M8's `u menyá yest'` and `u vas yest'`. This wave adds four more — `ne nádo býlo` (M3),
`s odnóy storoný` and `s drugóy storoný` (M4) and `ya by skazál` (M5) — all exactly three tokens, so
the resolver's scan window does not widen. The two-token wholes are `nádo býlo` (M3), `vryad li` and
`da net` (M5). Each behaves as the briefs wanted: the longest match wins, so a bare `nádo` still
opens L3-M4's note, a bare `da` still opens L1-M2's `yes`, and `li` on its own still opens L3-M5's
question particle.

**7. No `RE-TEACH` anywhere, and no collision.** `npm run content:shown` printed neither line for
any of the three modules, so no row of this wave is shadowed by an earlier module's note and no two
rows of one module open the same folded key. There is nothing here for the `docs/53` §3 style
justification to cover.

### The ratchet

`npx vitest run tools/shown-surfaces.test.ts` — **11/11 passed**, en-ru holding at its baseline of
**20**. All three modules are `clean` under `npm run content:shown`:

```
L4-M3: clean — every shown surface resolves
L4-M4: clean — every shown surface resolves
L4-M5: clean — every shown surface resolves
```

Every token of every `display`, every one of the sixty `variations[].display` strings and every one
of the thirty-six comprehension items resolves in the fold. None of the three contributes a finding,
so the baseline neither rises nor falls; no baseline was lowered because there was nothing of this
wave's to lower. Nothing below L4 was edited — no L1, L2 or L3 file — and no other course was
touched.

`npm run content:validate` — `CONTENT n/n ok`, reading `CONTENT 314/314 ok` when this wave finished.
The total moves while the eight sibling waves land, so the number is a timestamp rather than a claim;
`en-ru/L4-M3.json ok`, `en-ru/L4-M4.json ok` and `en-ru/L4-M5.json ok` are the three lines that are
this wave's.

`npx vitest run src/course/types.test.ts` — red, and no failure in it is this wave's. The count
moves while the eight sibling waves land; the last reading was **3 failed, 332 passed**, being the
module census (`finds all 311 …`, `expected [ …(314) ] to deeply equal [ …(311) ]`), which is the
parent's to move once the nine waves are collected, and the two sibling per-course counts, en-ar
(`expected 34 to be 33`) and hi-en (`expected 35 to be 34`), which belong to those courses' waves.
The en-ru case counts nothing — it asserts only `enRu.length > 0` and then walks every module — so
it is unaffected by any of the three, and the assertion that is this course's law passes on its own:
`npx vitest run src/course/types.test.ts -t "keeps the romanized course in its lane"` — **1 passed**.
So no romanized field in the three modules carries a Cyrillic character, no acute is decomposed,
`glossEn` is absent everywhere, and `literal`, `sound`, `usage`, `mnemonic`, `mistake` (with its own
`script`), `register`, `trap`, two `variations` and a `note` on every word row are present on all
thirty sentences. A separate scan of the three files for the Cyrillic look-alikes `а е о р с у х к`
outside `script`, for combining U+0301, and for any non-NFC string returned nothing.

### Open questions for the native pass

Continuing the chain; the last number in `docs/89` §7 and in Wave 1 above is 77. Questions 59, 60,
61 and 62 in `docs/89` already cover `by` having no tense, `nádo býlo` against `dólzhen byl`, the
placement and force of `ved'` and `zhe`, and `da net`; these do not restate them.

78. **`zrya` fronted, and the `ne` that flips it** (M3-S09). Confirm that `Zrya ya vas ne predupredíl`
    reads as a regret about not warning, that `Zrya ya vas predupredíl` reads as a complaint about
    having warned, and that both are what a speaker would actually say rather than bookish. If one
    of the two is unnatural, say which, because the mistake plate depends on the pair.

79. **`stóilo` plus a perfective infinitive** (M3-S06). Confirm that `Stóilo srázu pozvonít' vrachú`
    is heard as a mild regret and not as a statement about cost, and that the bare `stóilo` with no
    `by` is the ordinary form. `stóilo by` exists; if it is the commoner one in speech, that is a
    correction M4 of a later level would have to carry, not this module.

80. **`ináche` as a clause opener after a regret** (M3-S07). Confirm that
    `Nádo býlo vstat' ráno, ináche ya by opozdál` mixes its two moods the way a Russian actually
    mixes them — a flat impersonal regret in the first half, a `by` counterfactual in the second —
    and that no comma or particle is missing between them.

81. **The perfective infinitive after both regret frames** (M3, rule 2). The rule asserts that
    `nádo býlo` and `ne nádo býlo` take a perfective infinitive because a regret is about something
    that was to have been finished. Confirm that, and confirm the counter-case: is
    `Ne nádo býlo zvonít'` (imperfective, as S04 writes it) right precisely because the reproach is
    about the ACT and not its completion?

82. **`Zhal', chto` with a plain past inside it** (M3-S05). Confirm that no `by` may appear in the
    `chto`-clause, and that `Zhal', chto ya ne pozvoníl` is the ordinary spoken form rather than
    `Mne zhal', chto …`. The module never writes the dative subject; if a speaker normally does,
    that is a row a later module would have to open.

83. **`zhe` after the first stressed word, tested on a non-pronoun** (M4-S02, S10). The rule is
    stated on `Ya zhe` and `Éhto zhe`. Confirm that `Podúmayte sámi: éhto zhe óchen' dórogo` places
    it correctly, and confirm whether a clause opening with `Vo-pérvykh,` would put `zhe` after the
    connector or after the first word of the clause proper.

84. **`ved'` in first position only** (M4, rule 0). Every display writes `ved'` at the head of its
    clause, and S09 writes it clause-internally after `Soglasítes',`. Confirm both are natural, and
    confirm whether the clause-final `ved'` an English speaker never produces is common enough to
    deserve a usage line in a later module.

85. **`ímenno` against `ímenno poéhtomu`** (M4-S08). Confirm that `Ímenno poéhtomu ya schitáyu …`
    is the idiomatic opener, that moving `ímenno` onto `ya` genuinely changes the claim to one about
    who is speaking, and that the module is right to call `ímenno` a narrowing word rather than an
    intensifier.

86. **`Vy ne znáyete, …?` and the `ty` form beside it** (M5-S02). L2-M6 shipped `Ty znáyesh', gde
    magazín?` without the `ne`. Confirm that the polite version normally carries the `ne`, that the
    `ty` version normally does not, and — if both take it — whether L2-M6's sentence is a seam that a
    native pass should record against that module rather than against this one.

87. **`boyús'` with `chto`, and `Boyús' vas`** (M5-S07). Confirm that `Boyús', chto vy ne právy` is a
    polite hedge with no fear in it, that `Ya boyús' vas` is genuinely about fear, and that
    `boyús'` plus the genitive rather than the accusative is not the form a speaker would reach for
    with a person as its object.

88. **`Ládno` as a concession, and its register** (M5-S08). The module marks S08 `informal`. Confirm
    that `Ládno` is too casual for `vy` in a working conversation, or that it is not — the whole
    course speaks `vy`, and if `ládno` clashes with it the row belongs in a different module.

89. **A stress list, continuing question 77.** Every mark this wave writes for the first time, to be
    checked as spellings rather than as grammar: `zabýl`, `zabýt'`, `moglá`, `moglí`, `stóilo`,
    `ináche`, `uspél`, `uspét'`, `predupredíl`, `predupredít'`, `sdélal`, `sdélat'`, `skazát'`,
    `vstat'`, `zhal'`, `zrya`, `nádo býlo`, `ved'`, `zhe`, `sámi`, `skazáli`, `vo-pérvykh`,
    `vo-vtorýkh`, `naprimér`, `zató`, `s odnóy storoný`, `s drugóy storoný`, `dázhe`, `ímenno`,
    `soglasítes'`, `podúmayte`, `sovsém`, `znáyete`, `znáyu`, `znat'`, `vryad li`, `da net`,
    `vozmózhno`, `boyús'`, `ládno`, `soglasílsya`, `soglasílas'`, `spórit'`, `prósto`. A slip here is
    a second key with no note behind it.

## Wave 3 — L4-M6 through L4-M10 (#557)

The level's closing five, authored against the briefs in `tools/course-briefs.ts` and the decisions
in `docs/89`. The index this wave was written against is the real, emitted one:
`public/content/en-ru/index/`, whose deepest file is now **`L4-M5.json` — 873 surfaces folded over
35 modules, `cumulativeThrough` L1-M1..L4-M5, `maxSpan` 3**. Wave 1 wrote against 785 surfaces
through L3-M10 and Wave 2 against 819 through L4-M2; every seam claim below was therefore checked
against `npm run content:owner` rather than reasoned out, and the tool's own footer —
`873 surfaces owned, folded over 35 modules through L4-M5` — is what "today" means in this section.
Nothing below L4 was touched, and no other course was touched. The course's laws carry unchanged:
romanized `display`, Cyrillic on the quiet `script` line, a precomposed acute on every polysyllable,
`vy` as the default register. No surface this wave opens spans more than three tokens, so `maxSpan`
stays at 3 for the fifth level running.

### L4-M6 "Before and after" — the until that is spelt while-not

Ten displays:

1. `Poká ya rabótayu, oná chitáyet knígu.`
2. `Podozhdíte, poká ya ne vernús'.`
3. `Poslé tovó kak on ushyól, ya pozvoníla Ánne.`
4. `Péred tem kak otvétit', podúmayte.`
5. `Ya zdes' s utrá, i óchen' ustál.`
6. `Ya zhdu vas uzhé chas.`
7. `Oná yeshchyó ne prishlá, i ya bespokóyus'.`
8. `Ya uzhé ne zhivú v Moskvé.`
9. `S tekh por on ne zvoníl.`
10. `Ya pozvonyú vam poslé obéda, chérez dva chasá.`

What it teaches: the time CLAUSE, so two events can be pinned to each other instead of to the clock.
The item the module exists for is that RUSSIAN'S UNTIL IS WHILE-NOT — `poká` is while and takes the
imperfective on both sides, `poká ne` is until and takes the perfective, and the `ne` negates
nothing at all. Rule 1 is the interference plate for it, and S02's mistake is the sentence a learner
writes when they distrust the `ne`. The aspect half of that is a re-use, not a new law: it is
L2-M10's rule read off a clause. Three further deltas: Russian has NO PERFECT, so `Ya zhdu vas uzhé
chas` is a plain present plus an adverb (S05, S06); English *since* splits by what follows it, `s`
plus the genitive for a point (`s utrá`) against `s tekh por` for a stretch (S05, S09); and
`uzhé` / `uzhé ne` / `yeshchyó ne` are three meanings built from two words apiece, each learnt whole
(S06, S07, S08). Where English is free, and it is said so: `poslé tovó kak` and `péred tem kak` sit
exactly where *after* and *before* sit, with L3-M3's comma unchanged. Twenty new surfaces against a
cap of 25.

### L4-M7 "Official talk" — three ways to say a thing with no doer

Ten displays:

1. `Sevódnya zakrýto, a závtra otkrýto.`
2. `Zdes' zapreshchenó kurít'.`
3. `Vam pozvonyát závtra útrom.`
4. `Zdes' ne kúryat — éhto zapreshchenó.`
5. `Póyezd otpravlyáyetsya v sem' chasóv.`
6. `Magazín zakryváyetsya v vósem'.`
7. `Uvazháyemye passazhíry, póyezd pribyváyet chérez chas.`
8. `Vnimániye, vkhod zdes', a výkhod tam.`
9. `Prostíte, éhto mésto zányato.`
10. `Prósim vas ne kurít' na stántsii.`

What it teaches: the Russian aimed at nobody in particular, which is most of the Russian a visitor
meets and none of the Russian L1-L3 taught. Rule 0 puts the three devices in one place because they
answer one question — the short-form participle as the whole predicate (`zakrýto`, `otkrýto`,
`zányato`, `zapreshchenó`), the reflexive passive (`otpravlyáyetsya`, `zakryváyetsya`, which is
L3-M1's `-sya` doing a third job and points back rather than re-teaching the ending), and the bare
third-person plural (`pozvonyát`, `kúryat`, `govoryát`). Rule 1 is the interference: English reaches
for a passive and Russian's commonest answer contains none, so S03's mistake plate is the invented
`Vy búdete pozvóneny` and S04's is the sentence with `oní` put back in. The participles are shipped
as a WORD LIST and rule 2 says so — no participle machine here, which stays L5's — and it carries
the stress warning the brief asked for, `zakrýto` and `zányato` front-heavy against `zapreshchenó`
end-heavy. Register is `formal` on all ten, per `docs/56` §3. Half the plates are recognition rather
than production, and the `usage` lines say which. Twenty-two new surfaces against a cap of 25.

### L4-M8 "Back then" — the case that only appears once there is a verb

Ten displays:

1. `Ránshe ya zhil v Moskvé, a tepér' ya zhivú zdes'.`
2. `Kogdá ya byl studéntom, ya mnógo chitál.`
3. `Moy brat stal vrachóm.`
4. `Oná stála inzhenérom, a ya ostálsya studéntom.`
5. `Ya ból'she ne rabótayu tam, a tepér' otdykháyu.`
6. `On vsyó yeshchyó rabótayet v Moskvé.`
7. `V détstve ya chásto khodíl v kinó.`
8. `Vsyó izmenílos', no ya vsyó yeshchyó zdes'.`
9. `Kogdá ya byl málen'kim, my zhíli v Índii.`
10. `Ránshe on byl studéntom, a tepér' on stal nachál'nikom.`

What it teaches: THEN held against NOW inside one turn, and the INSTRUMENTAL PREDICATE that the
past tense drags in with it. Rule 0 states it as a fact rather than a mnemonic — with `byt'` and
`stat'` the complement stands in the instrumental when the state is bounded in time, and the present
has no verb to trigger it, which is why L1-M5's empty present cell never showed this. S10 carries
both halves in one sentence (`byl studéntom` … `stal nachál'nikom`), which is the tidiest available
proof that the case belongs to the verb and not to the noun; S09 extends it to an adjective
(`byl málen'kim`). The past side of the module is deliberately all imperfective, so with aspect held
still the case ending is the only thing moving. Rule 1 names the simplification English speakers
brace against: three English past habituals, one Russian imperfective past plus `ránshe`. Fifteen
new surfaces against a cap of 25 — the lowest of the wave, because the module's work is a case
rather than a vocabulary.

### L4-M9 "Places and journeys" — the fork English does not have, twice

Ten displays:

1. `Ya yézzhu v Moskvú kázhdyy god.`
2. `Sevódnya ya yédu v Moskvú.`
3. `Vcherá ya khodíl v magazín.`
4. `Ya khozhú na rabótu peshkóm kázhdyy den'.`
5. `Ya lyublyú yézdit' na póyezde.`
6. `On poyékhal tudá vcherá i yeshchyó ne vernúlsya.`
7. `Doyédete do stántsii, potóm poverníte nalévo.`
8. `Vam nádo peresést' na avtóbus.`
9. `Peresádka na metró, a obrátno mózhno peshkóm.`
10. `Otsyúda avtóbus idyót do ploshchadi.`

What it teaches: DETERMINATE against INDETERMINATE, which no other course in this repo has to carry.
`idtí` / `khodít'` and `yékhat'` / `yézdit'` are two imperfectives for one English verb, and the
split is neither tense nor aspect. The fact that decides whether a learner is understood is rule 1,
THE INDETERMINATE PAST IS A RETURN TRIP: S03 is `Vcherá ya khodíl v magazín`, went and came back,
and its mistake plate is `Vcherá ya poshyól v magazín`, which sets off and leaves the speaker there.
Rule 3 pays back L3-M10 at no cost: a prefix on the DETERMINATE stem makes a perfective, which is
what `ushyól`, `prishyól`, `priyékhal` and this module's `poyékhal` have been doing all along — a
memorised list turned into a system in one sentence. S06's mistake (`yézdil` against `poyékhal` when
the man has not come back) is the pair working in the other direction. Directions re-use L2-M4 whole
per rule 4; `nalévo`, `naprávo`, `pryámo`, `ostanóvka` and the transport nouns open no row.
Twenty-two new surfaces against a cap of 25.

### L4-M10 "A story with a twist" — the level's exit

Ten accounts, each six sentences with at most one line of dialogue; first sentences given, the rest
in the file:

1. `Vcherá ya dólgo rabótal. Vécherom pozvoníl Iván. — Ty svobóden? — sprosíl on. …`
2. `Vcherá ya poteryál klyuch. Snachála ya ne pónyal, chto sluchílos'. …`
3. `Útrom bylá khoróshaya pogóda. Ya poshyól na rabótu peshkóm. No vdrug poshyól dozhd'. …`
4. `Vcherá my býli v kafé. Iván zabýl telefón dóma. — Éhto probléma, — skazál on. …`
5. `Vcherá Ánna ne prishlá. — Chto sluchílos'? — sprosíl ya. …`
6. `Vcherá ya poyékhal v górod na avtóbuse. Snachála vsyó býlo khoroshó. No vdrug avtóbus slomálsya. …`
7. `Vcherá ya poshyól v magazín. Snachála ya kupíl khleb i molokó. …`
8. `Útrom pozvoníl nachál'nik. — Vy svobódny sevódnya? — sprosíl on. …`
9. `Vcherá v metró ya poteryál súmku. Snachála ya ne pónyal, gde oná. …`
10. `Poká ya rabótal, Ánna zhdalá menyá dóma. Vécherom ya poyékhal domóy. …`

What it teaches: DIRECT SPEECH, whose whole delta is punctuation — the em dash standing alone to
open a line, the comma-and-second-dash to close it, and THE VERB BEFORE ITS SUBJECT in the
attribution. Rule 1 is the interference and it is the module's first plate: `skazál Iván` is neutral,
`Iván skazál` after a dash is marked, and an English speaker produces the second every time. S01,
S04 and S09 all carry a mistake plate on that inversion, from three angles. Rule 2 carries the twist
connectors (`vdrug`, `okazálos', chto`, `v kontsé kontsóv`, `vot`); rule 4 carries the impersonal
verdict a story closes on (`éhto býlo stránno`, `éhto býlo sméshno`), which is L3-M6's `-o` adverb
family turned outward onto the event. Rule 3 says plainly that nearly everything else is already the
learner's, and names L3-M5's no-backshift rule as the reason direct speech is a choice of texture
rather than of grammar — S08 leans on it twice and its mistake plate is the backshift an English
speaker adds. The per-sentence bound applies INSIDE the account, as at L3-M10; the longest inner
sentence in the module is nine words against a bound of 14. Fourteen new surfaces against a cap of
25, the smallest spend of the wave, which is what an exit module should cost.

### The brief seams, checked against the real index

Every ownership claim in the five briefs' §5 was put to `npm run content:owner` before a row was
written. Most held. These are the ones that moved, and the two the wave found for itself.

**`poverníte` is free because L2-M4 shipped it WITHOUT its acute.** The M9 brief lists `poverníte`
among its fresh keys, which reads at first like an error — L2-M4 plainly teaches the word. The tool
disagrees with the reading and not with the brief:

```
poverníte	free
```

and the shipped index carries `povernite`, no accent, because `content/en-ru/modules/L2-M4.json`
L2-M4-S03 has `"display": "povernite"` against `"script": "поверните"`. The acute is a codepoint and
`á` and `a` fold to two keys, so the accented spelling genuinely is unowned. This is the parent
brief's warning about `zná` in a second guise, and it is why the rule is never grep for a surface —
here even the eye is wrong, because the two spellings differ by a mark most readers do not register.
M9 opens `poverníte` as its own row with the acute, edits no L2 file, and question 101 below hands
the underlying defect to whoever next opens L2.

**`zanyát` in L3-M5 carries the wrong stress, and `content:shown` is what found it.** M10-S08 was
first written `Ya otvétil, chto ya zányat`, and the check said:

```
SHOWN-BUT-UNTAUGHT L4-M10-S08: zányat
```

`content/en-ru/modules/L3-M5.json` L3-M5-S08 ships `"display": "zanyát"`, `"forms": ["zanyát",
"zanyatá"]` for занят / занята́. The feminine is right; the masculine is not — занят is front-stressed,
`zányat`. A level never edits a file below it and the correctly-stressed form is not a NEW SHAPE
deserving a row, only the same shape spelt right, so opening one would have put two index keys
behind one form. M10 avoids the word instead (`chto ya rabótayu`, which serves the no-backshift
plate just as well) and M7-S09's note and mnemonic were reworded so that neither asserts anything
about that word's stress. Question 104 carries it to the native pass.

**`uzhé ne` is claimed by two briefs in this same wave.** M6's §3 gives it (`uzhé` and `yeshchyó ne`
are already and not yet, but `uzhé ne` is not any more) and M8's §5 instructs the author to index
`ból'she ne`, `uzhé ne` and `vsyó yeshchyó` whole. Both were free at the start of the wave. M6 is the
earlier module and takes it; M8 opens `ból'she ne` and `vsyó yeshchyó` only, and its rule 2 names
`uzhé ne` as L4-M6's and calls it the softer of the two. Had M8 opened a row for it, the row would
have been unreachable — the fold reaches M6 first — and `content:shown` would have reported a
re-teach rather than failing, which is exactly the class of defect an intra-wave collision hides in.

**`stálo` is L3-M6's, and the M8 brief was right to warn.** Confirmed verbatim:

```
stal	free
stála	free
stálo	L3-M6
```

M8's `stal` row therefore carries `forms: ["stal", "stat'"]` with a deliberate HOLE at the neuter,
and both its note and S04's mistake plate say why: L3-M6 opened `stálo` for `mne stálo grústno`, a
feeling arriving, and it must never be made to answer for becoming a doctor. `stála` is a separate
row rather than a form of `stal`, again as the brief instructs, and `stat'` sits on only one of the
two rows so the pair does not collide inside the module.

**`Moskvú` was an unowned cell of an L1 lexeme.** `content:owner` returns `moskvú free` while
L1-M1 owns `moskvá`, `moskvé` and `moskvý` — the accusative was never shown, so M9-S02 would have
been shown-but-untaught. Under the level law that a new shape of an older lexeme gets its own row in
the module that first shows it, M9 opens `Moskvú` with a note pointing back at L1-M1. The same law
gave M8 its `nachál'nikom` (L3-M2 owns `nachál'nik`), M6 its `otvétit'` (L3-M5 owns `otvétil` and
`otvétila`, so the infinitive is all M6 opens) and M10 its `zhdal` (L4-M6 opened only `zhdu`,
`zhdyót` and `zhdat'`, so the past belongs to the module that first tells a story in it).

**`poslé` is free even though L2-M10 shipped `poslé étovo`**, exactly as the M6 brief says:
`poslé free`, `poslé étovo L2-M10`, because L2-M10 indexed the phrase whole. M6 opens the bare
preposition. Confirmed with it, and all as the briefs claimed: `uzhé L2-M5` (not L3-M7's, which the
L3-M7 brief had wrong), `yeshchyó L1-M8`, `kogdá L2-M10`, `do L2-M4`, `s` and `so L3-M2`,
`zdes' L1-M7`, `vrémya L2-M3`, `den' L3-M7`, `chas L1-M4`, `rabótayet L1-M3`, `skazál L2-M10`,
`sprosíl` and `otvétil L3-M5`, `kontsé L2-M10`, `khodíl` / `khodíla` / `yézdil` / `yézdila L3-M10`
against `khodít'` / `khozhú` / `yézdit'` / `yézzhu` all free, `idtí` / `idú` / `yékhat'` / `yédu` /
`kudá L2-M4`, and `kázhdyy free` while `kázhdyy den'` stays L1-M4's two-token key — so M9 writes
`kázhdyy god` on its own rows and `kázhdyy den'` still resolves to L1-M4 by longest match.

**The em dash earns no index key, and ten displays prove it.** The M10 brief said `normalizeSurface`
of a bare dash returns the empty string. `tools/check-shown.ts` reports `L4-M10: clean` across ten
accounts carrying eighteen dashes between them, so the dialogue punctuation costs the index nothing
and the wave wrote it freely.

**Two seams the wave decided rather than inherited.** First, M7 takes `zakrýt` and `zakrýta` as
FORMS of its `zakrýto` row (and `otkrýt` / `otkrýta` of `otkrýto`) rather than as separate rows: they
are one participle agreeing, not derived words, so `docs/56` §4's rule applies. That is what lets
M10-S02 write `dver' bylá zakrýta` and M10-S10 `dver' bylá otkrýta` with no row of their own.
Second, and against the same rule, `otpravlyáyetsya` and `otpravléniye` ARE two rows, because a verb
and its verbal noun are derived and not declined — the M7 brief's call, honoured. Third, M6's
`chérez` is re-used by M7-S07 and by both modules' pools: an intra-level dependency, and the reason
M7 could open its announcement without a row for time.

### The ratchet

`npx vitest run tools/shown-surfaces.test.ts` — **11/11 passed**, en-ru holding at its baseline of
**20**. All five modules are `clean` under `npm run content:shown`:

```
L4-M6: clean — every shown surface resolves
L4-M7: clean — every shown surface resolves
L4-M8: clean — every shown surface resolves
L4-M9: clean — every shown surface resolves
L4-M10: clean — every shown surface resolves
```

Every token of every `display`, all one hundred `variations[].display` strings and all sixty
comprehension items resolve in the fold. Not one module reports a RE-TEACH, which is unusual for a
wave this size and is a consequence of the paradigm holes above: where a lower level owned a cell,
the row was written around it rather than over it. No module contributes a finding, so the baseline
neither rises nor falls, and no baseline was lowered because there was nothing of this wave's to
lower. Nothing below L4 was edited — no L1, L2 or L3 file — and no other course was touched.

`npm run content:validate` — `CONTENT n/n ok`, reading `CONTENT 360/360 ok` when this wave finished.
The total moves while the eight sibling waves land, so the number is a timestamp rather than a
claim; `en-ru/L4-M6.json ok` through `en-ru/L4-M10.json ok` are the five lines that are this wave's.

`npx vitest run src/course/types.test.ts` — red, and no failure in it is this wave's. The last
reading was **2 failed, 379 passed**: the module census (`finds all 354 …`), which is the parent's
to move once the nine waves are collected, and one sibling per-course count, en-ar
(`the en-ar modules this rule is written for: expected 40 to be 39`), which belongs to that course's
wave. The en-ru case counts nothing — it asserts only `enRu.length > 0` and then walks every module
— so it is unaffected by either, and the assertion that is this course's law passes on its own:
`npx vitest run src/course/types.test.ts -t "keeps the romanized course in its lane"` — **1 passed**.
So no romanized field in the five modules carries a Cyrillic character, no acute is decomposed,
`glossEn` is absent everywhere, and `literal`, `sound`, `usage`, `mnemonic`, `trap`, `mistake` (with
its own `script`), `register`, two `variations` and a `note` on every word row are present on all
fifty sentences. A separate scan of the five files for the Cyrillic look-alikes `а е о р с у х к`
outside `script`, for combining U+0301, for any non-NFC string, and for any word `note` over 200
characters returned nothing. New-surface counts against the cap of 25: M6 twenty, M7 twenty-two,
M8 fifteen, M9 twenty-two, M10 fourteen.

### Open questions for the native pass

Continuing the chain; the last number in `docs/89` §7 and in Waves 1 and 2 above is 89. Nothing here
restates a question already asked.

90. **`poká ne` with the subject inside it** (M6-S02). Confirm that `Podozhdíte, poká ya ne vernús'`
    is the ordinary spoken form with the subject sitting between the two halves of the connector, and
    that dropping the `ne` is heard as wrong rather than merely blunt. The whole module leans on the
    second half of that; if `Podozhdíte, poká ya vernús'` is in fact tolerated in speech, rule 1 is
    overstated and should be softened.

91. **`péred tem kak` plus an infinitive** (M6-S04, and its second variation). Confirm that
    `Péred tem kak otvétit', podúmayte` is natural where the two subjects are the same. Separately,
    the variation `Péred tem kak spat', ya chitáyu knígu` may be the kind of thing a Russian would
    replace with `pered snom`; if so, say which, because the variation is meant to show the frame
    taking a second infinitive and not to teach a phrase nobody says.

92. **The verbless present as a perfect** (M6-S05). Confirm that `Ya zdes' s utrá` really carries
    "I have been here since this morning" with no verb at all, and — this is the mistake plate —
    that `Ya byl zdes' s utrá` genuinely flips it to a stretch that is over. If the past is also
    heard as "I have been here (and still am)", the plate is teaching a distinction Russian does not
    make that sharply.

93. **`zhdu` with a bare object** (M6-S06). Confirm `Ya zhdu vas uzhé chas` as the natural, slightly
    pointed way to say it after an hour's wait, and that the accusative object takes no preposition.
    Also confirm that `zhdu` here is not felt to need `uzhé cély chas` or similar; the sentence is
    at the module's bound and cannot grow.

94. **Every acute in M7's row list, checked one at a time.** `zakrýto`, `otkrýto`, `zányato`,
    `zapreshchenó`, `otpravlyáyetsya`, `otpravléniye`, `pribyváyet`, `zakryváyetsya`, `uvazháyemye`,
    `passazhíry`, `pozvonyát`, `kúryat`, `govoryát`, `prósim`, `vnimániye`, `vkhod`, `výkhod`,
    `mésto`. The L3 review caught five stress slips of exactly this kind, and this wave has just
    found a sixth in a shipped L3 file (question 104). These eighteen were checked against a
    dictionary rather than against memory, and they still want a second pair of eyes.

95. **The bare neuter on a shop door** (M7-S01). Confirm that a card in a window reads `ZAKRÝTO`
    with no noun and no verb, and that `Sevódnya zakrýt` is wrong rather than merely elliptical.
    The mistake plate asserts the second.

96. **`prósim vas` as a register, not a warning** (M7-S10). Confirm that `Prósim vas ne kurít' na
    stántsii` is the neutral printed request and carries none of the menace English gives to *we
    ask you to*, and that `Vy ne dolzhný kurít'` really would be heard as an accusation in that
    setting. Also confirm the front stress in `prósim`.

97. **`byl málen'kim` against `byl málen'kiy`** (M8-S09). The mistake plate calls the nominative
    "heard in speech, and still the wrong lesson to learn". Confirm that reading — that the
    instrumental is the written norm and the nominative is a spoken variant — rather than the
    stronger claim that the nominative is simply wrong. If it is simply wrong, the plate should say
    so and lose its hedge.

98. **`ból'she ne` against `uzhé ne`** (M8 rule 2, M6-S08). Both are given as "not any more", with
    M8 calling `uzhé ne` the softer of the two. Confirm the difference in force and, if there is a
    context where only one of them will do, name it — the two modules divide the pair between them
    and neither currently says when to choose which.

99. **The return trip, and a bus route** (M9-S03, M9-S10). Confirm that `Vcherá ya khodíl v magazín`
    is heard as went-and-came-back and `Vcherá ya poshyól v magazín` leaves the speaker in the shop.
    Separately, S10's mistake plate treats `Otsyúda avtóbus khódit do ploshchadi` as correct but
    saying something else — a service that runs rather than this bus's route. Confirm that both are
    idiomatic and that the difference is the one described.

100. **Directions in the perfective future** (M9-S07). Confirm that `Doyédete do stántsii, potóm
     poverníte nalévo` is how directions are actually given, with the first verb a future-shaped
     perfective and the second an imperative. If a Russian would say `doyézzhayte` or simply
     `Doyédete do stántsii i poverníte`, the pattern in the brief needs revising before L5 builds on
     it.

101. **RESOLVED by #599, 2026-09-12 — `povernite` in L2-M4 had no acute.** L2-M4-S03 ships `"display": "povernite"` for поверните,
     which is the only reason `poverníte` was free for M9 to open. Confirm the stress is on the `í`
     — поверни́те — and, if so, this is a defect in a shipped L2 module for a later L2 wave to fix,
     not for this one. Until it is fixed the course carries two keys for one word, and a learner
     tapping L2-M4's spelling gets a note while a learner tapping M9's gets a different one.

     **Answered: the stress is on the `í`, and L2-M4-S03 now writes `Poverníte`.** M9-S07's row for
     the accented spelling is gone, the stress sentence it carried is folded into L2-M4's own note,
     and the course holds one key for the word again. The sweep that fixed it found eight more of
     this class — see #599.

102. **The punctuation of a spoken line** (M10, all ten accounts). Confirm the shape
     `— Ya ne znáyu, — skazál Iván.`: em dash and space to open, comma before the closing dash, verb
     before subject. Confirm too that a question mark simply replaces that comma
     (`— Ty svobóden? — sprosíl on.`) and that no quotation marks belong anywhere near it.

103. **The impersonal verdict as a closing line** (M10-S07, M10-S08). Confirm that `Éhto býlo
     stránno` and `Éhto býlo sméshno` are what a speaker actually ends a small story on, and that
     the neuter `býlo` plus the `-o` adverb is right where the judgement is on a situation rather
     than a thing. S09 puts the contrast next to it — `Éhto bylá interésnaya istóriya`, agreeing
     with a feminine noun — and the pair is only worth keeping if both are natural.

104. **RESOLVED by #599, 2026-09-12 — `zanyát` in L3-M5 was stressed wrongly.** L3-M5-S08 ships `"display": "zanyát"` for занят with
     `"forms": ["zanyát", "zanyatá"]`. The feminine `zanyatá` is right; the masculine should be
     `zányat`, front-stressed, matching the `zányato` this wave opens in M7-S09. Confirm, and if
     confirmed this is a defect for a later L3 wave: this wave could not touch it, avoided the word
     in M10 rather than opening a second key for it, and reworded M7-S09's note and mnemonic so that
     neither states anything about that word's stress.

     **Answered: front-stressed, and L3-M5 now writes `zányat` with `zanyatá` unchanged.** The
     feminine was always right, which is what made the pair look plausible. Note that this defect is
     invisible to the gate #599 added: a misplaced acute satisfies every mechanical rule, so this
     class still belongs to the native-speaker gate.
