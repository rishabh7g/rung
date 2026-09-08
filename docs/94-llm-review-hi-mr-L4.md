# LLM review — hi-mr L4 (Range)

The level's first wave: L4-M1 "Explaining how" and L4-M2 "Cause and consequence", authored together
on 2026-09-08 and shipped `verified: true` in the same change, signed
`Claude Opus 5 — LLM review, authorised by repo owner`.

Both modules were written against the **real emitted index, not the brief's picture of it**:
`public/content/hi-mr/index/`, folded through `L3-M10` — `633 surfaces owned, folded over 30
modules through L3-M10`, `maxSpan 1`. hi-mr is the only one of the nine courses with no multi-token
surface, so "index this phrase whole" was never available: every multi-word shape in these two
modules is carried in `rules[]` and in `literal`, and every key bought is one token. Ownership
claims below are quoted from `npm run content:owner -- hi-mr …` verbatim, run against that index.

## Wave 1 — L4-M1 "Explaining how", L4-M2 "Cause and consequence"

### L4-M1 — Explaining how

Steps and instructions in order, and what they are for. Ten displays:

1. `चहा करण्यासाठी आधी पाणी उकळा`
2. `पाणी उकळून मग साखर घाला`
3. `प्रथम भाजी धुवा, नंतर कापा`
4. `शेवटी भाजी शिजवा आणि पोळी करा`
5. `मी दूध आणायला दुकानात गेलो`
6. `घाई करू नका, हळू बोला`
7. `पैसे भरण्यासाठी बँकेत जा`
8. `आता चहा पिऊ नका, थोडा थांबा`
9. `औषध घेण्यासाठी आधी थोडं खा`
10. `सगळं नीट वाचा, शेवटी सही करा`

What it teaches. Two systems and one bought adverb.

- **The purpose clause in -ण्यासाठी**, on three verbs so the derivation is visible rather than
  memorised: `करण्यासाठी` (S01), `भरण्यासाठी` (S07), `घेण्यासाठी` (S09). Each is its own single-token
  key with a note pointing back at the base verb's row — `भरा → L3-M8`, `घ्या → L2-M5` — as the
  brief's §5 requires. The rule text carries the derivation itself (`-णे → -ण्या- + साठी`) because
  a 200-character note cannot.
- **-आयला as the purpose of a going**, on `आणायला` (S05), with the division named in the rule and
  not in the row: -ण्यासाठी states a purpose for anything, -आयला states the purpose of a going or a
  coming. The memorable-and-false formal/casual reading is refused in the rule text explicitly.
- **The negative imperative** `-ऊ + नका` (S06, S08). `नका` is one row, and it is self-sufficient:
  it says in one line that नका follows the -ऊ cell L2-M6 already taught. `करू` gets **no row** —
  see the seam section. The module's interference tag and its S06 mistake sit exactly on the
  Hindi order (`घाई नका करू`), and S08 spends a second mistake on the other half of the same
  instinct, `नको` used as a prohibition rather than as "I don't want it".
- **The polite imperative in -आ on new verbs** — `उकळा`, `धुवा`, `कापा`, `शिजवा`, `घाला`, `वाचा`,
  and `खा`, whose one-syllable stem shows nothing extra. Sequencing costs nothing: `आधी`,
  `मग`, `नंतर`, `शेवटी` are all owned, `प्रथम` and `नीट` are the only free words bought outright.
- L3-M1's -ऊन chain returns on a new verb in S02 (`उकळून`) so the level's welding through-line is
  said twice in one module.

Seventeen rows, against a `newWordCap` of 25. Nothing from L4-M6 (`-ल्यावर`), L4-M2 (`-मुळे`) or
L4-M7 (the announcement passive) appears; a recipe here is spoken to a person in the imperative.

### L4-M2 — Cause and consequence

Why things happen and what follows, across a paragraph. Ten displays:

1. `पावसामुळे मला उशीर झाला`
2. `गर्दीमुळे मी लवकर घरी आलो`
3. `काल पाऊस आला, म्हणून मी घरी थांबलो`
4. `मी काल फक्त थोडा वेळ थांबलो, कारण मला ताप होता`
5. `कामामुळे मला सुट्टी मिळाली नाही`
6. `काल खूप पाऊस आला. त्यामुळे रस्ता बंद झाला.`
7. `मला जायचं होतं, पण गाडी आली नाही`
8. `गर्दी होती, पण मला जागा मिळाली`
9. `तो आला नाही. यामुळे सगळे नाराज झाले.`
10. `तो सुद्धा आला नाही, म्हणून मी एकटा गेलो`

What it teaches. One suffix, one division of labour, and the word thirty modules did without.

- **-मुळे on a noun**, three times over so the oblique bend is the lesson and not an accident:
  `पावसामुळे` (S01, `पाऊस → पावसा-`), `गर्दीमुळे` (S02, an -ई noun that does not bend at all), and
  `कामामुळे` (S05, a consonant-final noun taking -आ). The contrast between S01 and S02 is the whole
  point of buying two -मुळे keys instead of one, and S05's mistake (`काममुळे`) is the third.
- **The division of labour**, stated in a rule because it is the module's grammar: -मुळे takes a
  noun; `कारण` (L1-M9) takes the reason clause and follows the consequence (S04); `म्हणून` (L1-M9)
  follows the reason and introduces the consequence (S03, S10); `त्यामुळे`/`यामुळे` open a new
  sentence with the previous one as cause (S06, S09). Three of the four are already owned, and the
  spend is on length, not vocabulary.
- **Explanation across a full stop** — S06 and S09 are the only two displays in the pair that carry
  two sentences, which is precisely what no module below L4 could do.
- **`पण`**, bought here (S07, S08) at the cost of one row and one line, because L4-M3, M4, M5 and
  M10 all want it and none of them may use a word no module has taught.
- **The `तर` interference** is tagged and spent twice: S03's mistake (`काल पाऊस आला, तर मी घरी
  थांबलो`) and S09's (`तर सगळे नाराज झाले`). Hindi's `तो` in a consequence is the one place here
  where a Hindi instinct produces a Marathi sentence that means something else — `तर` is L3-M4's
  conditional word.
- **No passive, by decision.** Consequences are told with `झाला`/`झालं`/`झाली` throughout. `रस्ता
  बंद झाला` is what a speaker says; the करण्यात-आला shape is the sign on the barricade, it is
  L4-M7's, and M2 runs before M7 — a `करण्यात आला` shown here would take the row M7's whole job
  depends on.

Thirteen rows, against a `newWordCap` of 25.

## Seams — what `content:owner` said, and where the brief needed refining

Every ownership claim in both briefs' INDEX SEAM sections was checked against the emitted index and
**every one of them held**. There are no corrections in the "the brief was wrong" sense. There are
two refinements that a reader working from the brief alone would get wrong, and they are the
valuable part of this wave.

### 1. The -आयला cell is nearly all spoken for, so the module can only buy it once

L4-M1's brief §2 makes -आयला one of the module's two purpose shapes. The index says the shape's
useful surfaces already have owners:

```
आणायला	free
घ्यायला	free
जायला	L3-M4
वाचायला	L3-M4
उठायला	L3-M4
खायला	L2-M5
जेवायला	L2-M5
करायला	L2-M8
सांगायला	L2-M8
```

Seven of the nine are owned. `जायला` — the very verb the brief's own example sentence would reach
for — is L3-M4's advice ending (`जायला पाहिजे`), and a row for it here would be unreachable: first
occurrence wins, and a learner tapping it would be shown the advice note. So **-आयला is taught in
this module on exactly one surface, `आणायला`**, and the naming work the brief asks for
("name the division precisely") is done in `rules[1]`, which no fold can steal. This is the shape
of the constraint the whole level will meet again: by L4 the common cells of a productive ending
are already owned, and a new ending is taught on whatever surface is still free plus a rule.

### 2. "free" hides a class: a free KEY on an owned LEXEME

Several surfaces the briefs list flatly as free are new shapes of verbs the ladder already teaches:

```
घाला	free          घालतो	L3-M9
खा	free          (खातो, खाता, खातोस — L1-M4)
वाचा	free          (वाचतो, वाचते — L1-M4)
पिऊ	free          (पितो, पिते — L1-M4)
थांबलो	free          थांबा	L2-M4
मिळाली	free          मिळेल	L2-M5
```

The key is genuinely unowned, so nothing collides and nothing re-teaches — but the level law is
that a new shape of an older lexeme gets its own row **with a note pointing back at the first-teach
row**, and a brief that says only `घाला → free` invites a note that re-teaches the verb from
scratch. Every one of these six rows in this wave carries the pointer: `घाला` names L3-M9's
`घालतो`, `थांबलो` names L2-M4's `थांबा`, `मिळाली` names L2-M5's `मिळेल`, and so on. Recorded here
so the L4-M3…M10 waves write the pointer rather than rediscover the rule.

### 3. `करू → L2-M6`, and the trap held

```
करू	L2-M6
```

Exactly as L4-M1's brief §5 warned. `करू नका` is shown twice (S06, S08's variation) and **no `करू`
row exists in this module**, so a learner tapping it lands on L2-M6's suggestion note — which is
true of the word, if not of this sentence — and `नका`'s own row carries the whole prohibition
lesson on its own. `npm run content:shown -- hi-mr L4-M1` reports no re-teach at all, which is the
proof the row was left out.

### 4. Bare `साठी` and bare `मुळे` stay unbought

```
साठी	free
मुळे	free
```

Both remain free after this wave. hi-mr is `maxSpan 1`, so a key is earned only by a token a row
actually writes, and no display in either module writes `साठी` or `मुळे` standing apart — exactly
as L4-M1's brief predicted ("bare साठी gets a key only if a display writes N + साठी standing
apart") and as L4-M2's brief predicted for बारे `पेक्षा` and `चा`. They are still on the table for a
later L4 module that genuinely writes `N + साठी`.

### 5. `पण → free` — confirmed, and it is as strange as the brief says

```
पण	free
```

Thirty modules, including greetings, refusing without offence, stating a preference, agreeing and
disagreeing, and the course had never taught *but*. Bought here in one row on S07, re-shown on S08.
The same check confirmed the brief's other surprises: `फक्त free`, `सुद्धा free`, `मात्र free`,
`म्हणजे free`, `परिणाम free`. Of those, this wave spends only `फक्त` and `सुद्धा`; `मात्र`,
`म्हणजे` and `परिणाम` are left free and are recorded here as still available to L4-M3 onward.

### 6. Unspent free imperatives

L4-M1's brief offers a slate of free imperatives, and the module used six of them. The rest are
confirmed free and unspent, so a later module may still own them:

```
प्या	free
ठेवा	free
टाका	free
लिहा	free
बघा	free
ऐका	free
दाबा	free
व्यवस्थित	free
यासाठी	free
कशासाठी	free
```

Note `प्या` in particular: this module teaches the -ऊ cell `पिऊ` for the prohibition (S08) and
deliberately does **not** buy the imperative `प्या`, so a later module wanting "drink this" still
has it.

## The ratchet

`tools/shown-surfaces.test.ts` holds hi-mr at **7**, and this wave leaves it at 7. Both new modules
are clean:

- `npm run content:shown -- hi-mr L4-M1` → `L4-M1: clean — every shown surface resolves`
- `npm run content:shown -- hi-mr L4-M2` → `L4-M2: clean — every shown surface resolves`

No `SHOWN-BUT-UNTAUGHT`, no `COLLIDES INSIDE THIS MODULE`, and **no `RE-TEACH` reported on either
module** — every row in both files opens a key no earlier module owns. Every one of the twenty
hero displays, all forty variation displays and all twenty-four comprehension items resolves in the
cumulative index; the two-sentence displays (L4-M2-S06, S09) resolve on both halves.

The baseline was not lowered, and could not have been: all seven existing findings are in hi-mr L1
(`थोडं`, `भाजी`, `पाच`, `झाले` taught later; `प्रिया`, `पुणं`, `बोललो` never taught — docs/52), and
a level never edits a file below it. Lowering them is L1's sweep, not this wave's.

`npm run content:validate` → `CONTENT n/n ok` (the total climbs while the nine sibling waves land;
it read `CONTENT 278/278 ok` when these two files first passed and `CONTENT 285/285 ok` at the end
of this wave). `npx vitest run src/course/types.test.ts` fails only on the module-census assertions
that count files — the parent's, and the en-ar and hi-en counts moved by sibling waves; every
course law in that file passes for both new modules.

## Open questions for a native pass — hi-mr L4 wave 1

Continuing the chain in `docs/85-hi-mr-L4-brief-decisions.md`, whose last number is 106. The
native-speaker gate is a separate and stricter bar than this review, and it is unmet.

107. **`आणायला` against `आणण्यासाठी` after a verb of motion.** L4-M1-S05 ships
     `मी दूध आणायला दुकानात गेलो` and puts `आणण्यासाठी` in the mistake slot, calling it
     understandable but not what anyone says. Is that right, or is `आणण्यासाठी गेलो` merely a
     shade more deliberate and perfectly ordinary? If it is ordinary, the mistake is too strong and
     should become a variation.
108. **`घाला` against `टाका` for adding sugar to tea.** Both are free; the module chose `घाला`
     (L4-M1-S02) on the reading that घालणे is what you do to liquids and powders and टाकणे is more
     careless. Confirm which a Marathi kitchen actually says, and whether the two differ by region.
109. **The spelling of धुणे's imperative.** L4-M1-S03 writes `धुवा`. Is `धुआ` ever written, and is
     the citation infinitive धुणे or धुवणे in the register this course writes?
110. **`प्रथम` in a spoken recipe.** The module ships `प्रथम भाजी धुवा, नंतर कापा` and marks the
     sentence `formal`. Is प्रथम said aloud in a kitchen at all, or is it print-only — a form's
     instructions, a notice — with आधी doing all the spoken work? If it is print-only, the level
     should say so and the sentence should move to a written frame.
111. **The नका paradigm, and how much of it L4 needs.** Only `नका` is taught here — the polite
     plural. `नकोस` (to तू) is not bought and `नको` is L1-M3's "I don't want it". Is a learner at
     L4 ever going to need `करू नकोस`, and if so does it belong in this module's `forms` or in a
     later one?
112. **`रस्ता बंद झाला` against `रस्ता बंद पडला`.** L4-M2-S06 uses झाला on the brief's reasoning
     that the consequence of a closed road is intransitive. Is पडला the more natural verb for a
     road, and does the choice change if the cause is rain rather than a decision?
113. **`यामुळे` against `त्यामुळे`.** The module draws the contrast as deixis — त्यामुळे points
     back at what was just told, यामुळे at the thing right here (L4-M2-S09). Is that contrast real
     in speech, or is त्यामुळे simply the default and यामुळे a bookish variant a speaker would not
     produce? If the latter, S09 should switch and यामुळे should be dropped from the level.
114. **The gender of `जागा`.** L4-M2-S08 writes `मला जागा मिळाली` and the row calls जागा feminine.
     Confirm it is feminine everywhere in Marathi, including in the sense "a seat on a bus", and
     that `जागा मिळाला` is unambiguously wrong rather than a regional variant.
115. **`सुद्धा` against `देखील` and against `पण` as "too".** L4-M2-S10 uses सुद्धा and places it
     immediately after the word it adds. Is देखील the more written twin, and does either ever
     stand at the end of a clause the way the module's mistake says it may not?
116. **`फक्त थोडा वेळ` against `थोडा वेळच`.** L4-M2-S04 buys फक्त as a free-standing limiter. Does
     a Marathi speaker prefer the `-च` clitic here, and if so is फक्त still the right first
     purchase or does L4 need `-च` before it needs फक्त?
117. **Whether L4-M1's two purpose shapes should be one module at all.** -ण्यासाठी and -आयला are
     given equal billing in the brief, but the index left only one free -आयला surface, so the
     shipped module is nine-tenths -ण्यासाठी and one sentence of -आयला. A native pass should say
     whether that ratio matches how the two are actually used, or whether -आयला deserves its own
     rung somewhere in L4-M3…M10.
118. **The two-sentence display.** L4-M2-S06 and S09 each carry two full sentences in one `display`
     so that त्यामुळे and यामुळे can do the job they exist for. Does that read as one utterance to
     a native ear, and is the full stop the right punctuation, or would a Marathi speaker write a
     comma and lose the very boundary the module is teaching across?
