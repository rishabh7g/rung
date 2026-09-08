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

## Wave 2 — L4-M3, L4-M4 and L4-M5 (#528)

The level's RANGE modules — L4-M3 "What might have been", L4-M4 "Persuading" and L4-M5
"Disagreeing well" — authored together on 2026-09-08 and shipped `verified: true` in the same
change, signed `Claude Opus 5 — LLM review, authorised by repo owner`.

Written, like wave 1, against the **real emitted index**: `public/content/hi-mr/index/` folded
through `L4-M2` — `663 surfaces owned, folded over 32 modules through L4-M2`, `maxSpan 1`. Every
ownership line quoted below is `npm run content:owner -- hi-mr …` output against that index, run
before a word was written. `maxSpan 1` bites harder in this wave than in the last: three of the
five shapes these modules exist to teach — `पाहिजे होतं`, `नको होतं`, `खरं तर` — are two-token
phrases made of tokens the ladder already owns, so they own **no key at all** and live in `rules[]`
and in each sentence's `literal`. The single most important authoring consequence is stated in
L4-M3's `rules[2]`: tapping a word will not explain the frame, and the module says so.

### L4-M3 — What might have been

Regrets and past hypotheticals. Ten displays:

1. `जर ती लवकर गेली असती तर तिला संधी मिळाली असती`
2. `जर ते वेळेवर आले असते तर आम्ही सगळे भेटलो असतो`
3. `जर त्याने आधी निरोप दिला असता तर हे काम झालं असतं`
4. `जर मी तिथे गेलो नसतो तर मला हे समजलं नसतं`
5. `जर काल गर्दी नसती तर मला तिकीट मिळालं असतं`
6. `मी त्याचं ऐकायला पाहिजे होतं`
7. `मी तिथे उगीच जायला नको होतं`
8. `मला ती नोकरी हवी होती, पण ती संधी चुकली`
9. `तुम्ही काल आला असता तर मला खूप आवडलं असतं`
10. `मला त्याची आठवण येते, आणि ते सगळं मला आठवतं`

What it teaches. The counterfactual widened in three directions, plus three regret frames that are
not conditionals at all.

- **Person and gender, which is the whole of §2(a).** L3-M4 shipped exactly one frame —
  `जर मी लवकर गेलो असतो तर मी त्याला भेटलो असतो`, first person, masculine, both halves alike. S01
  puts a feminine subject in both halves (`गेली असती … मिळाली असती`), S02 puts a **different**
  subject in each half (`ते … आले असते` against `आम्ही … भेटलो असतो`), and S03 puts a ने clause in
  the protasis so L2-M10's ergative law is shown surviving the counterfactual unchanged
  (`त्याने निरोप दिला असता`, the verb agreeing with निरोप, the apodosis neuter with काम).
  `rules[0]` states the law the brief said no shipped sentence had yet demonstrated.
- **The negative**, on one row and one paradigm: `नसतो` with
  `forms: ["नसतो","नसता","नसती","नसतं","नसते"]`, shown as नसतो/नसतं in S04 and नसती/नसता in S05
  and its variations. `rules[1]` says the thing a Hindi speaker will not guess — the negative
  **replaces** the auxiliary rather than adding a word, and `नसतं तर` is the counterfactual twin of
  L3-M4's `नाहीतर`.
- **The regret frames**, which are the module's real work and cost no keys at all: `-आयला पाहिजे
  होतं` (S06), `-आयला नको होतं` (S07, shipped as `मी तिथे … जायला नको होतं` per
  `docs/85` #100), `मला + N + हवं होतं` (S08), and `ते मला आवडलं असतं` (S09) — the one L3-M4 named
  and deliberately did not teach.
- **The काश hole.** `rules[4]` and S09 carry it: Hindi's काश has no everyday Marathi twin, Marathi
  says `… असतं तर बरं झालं असतं`, and S09's first variation ships exactly that (`बरं → L1-M2`,
  `झालं`, `असतं` all owned, so the idiom costs nothing). S09's `mistake` is the import itself,
  `काश तुम्ही काल आला असता`.
- **What it refuses.** `rules[5]` draws the three-way line the brief demands: `मी गेलो असतो` (this
  module), `मी जायचो` (L4-M8's past habitual), `तो गेला असेल` (L4-M5's guess about now). The real
  conditional stays L3-M4's and is re-shown on every page, never re-opened.

Thirteen rows against a `newWordCap` of 25 — eighteen surfaces once `नसतो`'s five, `चुकलं`'s three
and `आवडलं`'s three are counted.

### L4-M4 — Persuading

Make a case, concede a point, hold your ground. Ten displays:

1. `पाऊस आला तरी मी येईन`
2. `हे महाग असलं तरी चांगलं आहे`
3. `काल खूप गर्दी होती. तरीही मला जागा मिळाली.`
4. `खरं तर हे स्वस्त आहे, त्याचा फायदा जास्त आहे`
5. `त्यापेक्षा हे पुस्तक स्वस्त आहे आणि जास्त चांगलं आहे`
6. `मला हे मान्य आहे, पण तरीही मी जाणार नाही`
7. `हे काम अवघड आहे, पण नक्कीच होईल`
8. `त्याचा उपयोग जास्त आहे, तोटा कमी आहे`
9. `तो लहान असला तरी त्याचं बरोबरच आहे`
10. `हे खरंच चांगलं आहे, तरी थोडं महाग आहे`

What it teaches. The concessive, which the ladder has never touched, in the brief's three shapes
and in that order of usefulness.

- **`तरी` after a clause** (S01, S10) — the spine. It sits exactly where L3-M4's `तर` sits, on the
  same past-shaped clause, and flips *if* into *even if*. The row carries the disambiguation the
  brief demands in one line: तरी is a different key from तर, not a form of it.
- **`असलं तरी` for a conceded state** (S02, S09), on one row with
  `forms: ["असलं","असला","असली"]`, agreeing with the thing conceded and appearing only in front of
  तरी.
- **`तरीही` opening the next sentence** (S03, S06). S03 is a two-sentence `display`, following
  L4-M2-S06/S09's precedent so that तरीही can do the job it exists for; that decision is the open
  question #118 this wave inherits rather than settles.
- **The case-making markers**: `खरं तर` (S04, in `rules[4]` because both its tokens are owned),
  `मान्य आहे` (S06), `नक्कीच` (S07), `बरोबरच` (S09), `खरंच` (S10). The last three are one clitic —
  `-च` on `नक्की` (L1-M6), `बरोबर` (L3-M3) and `खरं` (L3-M3) — and S10's `mistake` is the three-way
  confusion they invite (`खरं` true, `खरंच` really, `खरं तर` actually).
- **The comparison inside an argument** (S05): `त्यापेक्षा`, with `rules[5]` saying plainly that
  the grammar is L2-M9's and only the word is new.
- **The interference**, which is the mirror image of L3-M4's: Hindi's हालाँकि opens the concessive
  from the FRONT and Marathi closes it from the BACK. `rules[3]` says so, S01 is tagged
  interference, and S01's `mistake` is `हालाँकि पाऊस आला, तरी मी येईन` — a Hindi sentence in
  Devanagari, which is exactly what a learner produces.

Twelve rows, fourteen surfaces. Nothing of L4-M5's softening appears: no कदाचित, no
`मला वाटत नाही`, no hedged refusal.

### L4-M5 — Disagreeing well

Soften, hedge, save face. Ten displays:

1. `मला तसं वाटत नाही, पण तुमचं म्हणणं बरोबर आहे`
2. `मला नाही वाटत की हे शक्य आहे`
3. `हे काम काल शक्य नव्हतं, म्हणून मी थांबलो`
4. `तो आज घरी नसेल, बहुतेक तो ऑफिसमध्ये आहे`
5. `कदाचित तो आता घरी असेल, तो इथे नाहीये`
6. `माफ करा, पण मला जरा वेगळं वाटतं`
7. `तुम्ही नंतर सांगितलं तर हरकत नाही`
8. `तू आता तिथे जाऊ नकोस, असं करू नये`
9. `तुमचं बरोबर असेल, पण हे नेहमी असं नसतं`
10. `तुम्हाला काय वाटतं, माझं मत बरोबर आहे का?`

What it teaches. One system seen twice, exactly as the brief frames it.

- **Negation as a paradigm.** `rules[0]` states all four cells — `आहे → नाही` (L1-M2),
  `होतं → नव्हतं`, `असतं → नसतं` (L4-M3), `असेल → नसेल` — and the module ships three of the four in
  hero position: नव्हतं (S03), नसेल (S04), नसतं (S09). The interference gets **two** sentences and
  two mistakes as the brief asks: S03's `शक्य नाही होतं` and S09's `असं नाही असतं`, with S04's
  `नाही असेल` as a third for good measure.
- **The fronted नाही** (S02), which the brief calls the module's single most useful line. `rules[1]`
  says it is the gentler of the two, and S02's `mistake` catches the stem — the fronted नाही takes
  bare `वाटत`, never `वाटतं`.
- **Hedging out of owned material** (`rules[2]`): कदाचित (L3-M3), असेल (L3-M4) doing a guessing job
  about now (S05), जरा (L2-M1) taking the edge off (S06), and `माफ करा, पण …` built from L2-M1's
  माफ and L4-M2's पण (S06). Only बहुतेक, शक्य, नाहीये and वेगळं are new words.
- **The prohibition scale** (S08, `rules[4]`): `जाऊ नका` (L4-M1, at तुम्ही) → `जाऊ नकोस` (at तू) →
  `असं करू नये` (at nobody, and therefore polite). All three behind L2-M6's same -ऊ cell.
- **Handing the turn back** (S10, `rules[5]`) — `तुम्हाला काय वाटतं?`, shipped as a hero and again
  as a bare variation, with `मत` bought so that `तुमचं मत काय आहे?` costs one word.
- Three sentences carry a `register` other than neutral, which no earlier hi-mr module has needed:
  S01, S06 and S10 are `formal` (the senior-facing move), S05 and S08 `informal`.

Twelve rows, fifteen surfaces.

## Seams — what `content:owner` said, wave 2

**Every ownership claim in all three briefs' INDEX SEAM sections held.** `जर`, `तर`, `असतं`,
`असता`, `असती`, `असते`, `असतो`, `असेल`, `नाहीतर`, `पाहिजे` all came back `L3-M4`; `होतं`, `होता`,
`होती`, `होते`, `वाटतं`, `वाटत`, `बरोबर`, `चूक`, `खरं`, `कदाचित`, `ना` all `L3-M3`; `हवं` and
`नको` `L1-M3`; `गेलो` and `केलं` `L1-M5`; `भेटलो` `L2-M10`; `गेली` `L3-M10`; `जरा` and `माफ`
`L2-M1`; `जास्त` and `कमी` `L2-M9`; `महाग` `L1-M8`; `स्वस्त` `L2-M3`; `पण` `L4-M2`; `नाही`
`L1-M2`. L4-M4's brief warns that `पेक्षा` only *looks* owned, and the index agrees:

```
पेक्षा	free
माझ्यापेक्षा	L2-M9
सगळ्यात	L2-M9
त्यापेक्षा	free
यापेक्षा	free
```

L2-M9 bought one fused pronoun form and nothing else, exactly as `docs/50` §4 predicted and
`docs/85` #4 recorded. Nothing needed correcting. What follows is the part a reader working from
the briefs alone would still get wrong.

### 7. The `-च` clitic is a third face of wave 1's "free key on an owned lexeme"

Wave 1 §2 named the class where a free key is a new *inflection* of an owned verb. This wave found
the same class made by a **clitic on an owned word**, three times in one module:

```
नक्की	L1-M6
नक्कीच	free
बरोबर	L3-M3
बरोबरच	free
खरं	L3-M3
खरंच	free
```

The lexeme is owned in every case; the -च form is unowned in every case, and each is its own
single-token key. L4-M4 buys all three, and its S10 `mistake` and `mnemonic` exist because the
learner now has `खरं`, `खरंच` and `खरं तर` in play at once — three meanings from one root, two of
them one character apart. A future module wanting `-च` as a *rule* rather than as three memorised
words has to say so; nothing in the index will stop it, and nothing in the index records that these
three are the same morpheme.

### 8. `मिळालं → free` while `मिळाली → L4-M2`, one module old

```
मिळाली	L4-M2
मिळालं	free
मिळाला	free
```

The wave-1 §2 class at its shortest range: the module immediately before this one bought the
feminine, and the neuter and masculine of the same past were still unspent. L4-M3-S05 buys
`मिळालं` (for the neuter तिकीट) with a note pointing back at L4-M2's `मिळाली`; `मिळाला` is left
unspent. The same shape holds for देणे, whose imperatives are owned two levels apart while its
entire past was free:

```
दे	L2-M1
द्या	L1-M8
दिला	free
दिलं	free
दिली	free
दिले	free
```

L4-M3-S03 takes `दिला` with `forms: ["दिला","दिलं","दिली"]` on one row — one purchase covering the
three genders, so no later module can accidentally split the paradigm across two notes.

### 9. `वेळेवर → free` while `वेळ → L3-M4`, and `मत → free` while `मते → L3-M3`

```
वेळ	L3-M4
वेळेवर	free
मते	L3-M3
मत	free
```

Two more of the same family, and the second is the interesting direction: L3-M3 bought the
**oblique** `मते` (inside `माझ्या मते`) and left the base noun `मत` free for thirty modules.
L4-M5-S10 buys it. An author reading `docs/50` would assume the opposite — that a base form is
bought before its oblique — and the index says the ladder has done it the other way at least once.

### 10. `गेला → free` after thirty-two modules, and deliberately still free

```
गेलो	L1-M5
गेली	L3-M10
गेले	L1-M5
गेलास	L1-M5
गेलीस	L1-M5
गेला	free
```

The masculine third-person singular of जाणे — the single most ordinary past-tense word in the
language — is unowned while five other cells of the same paradigm are owned. L4-M3 needed it for
`तो गेला असता` and did **not** buy it: the module's third-person masculine sentence is S03's
ergative `त्याने निरोप दिला असता` instead, which teaches more. `गेला` is left for whichever module
next needs a plain masculine "he went", and this is the note that should stop the next author
assuming it is already there. The same is true of `काही → free` and `यापेक्षा → free`, both
unspent at the end of this wave.

### 11. The structural seam: three central shapes own no key

L4-M3's brief §5 calls `पाहिजे होतं` "the first module in the course whose central shape is
unindexable". It is, and it is not alone in this wave: `नको होतं` and L4-M4's `खरं तर` are the same
problem. All six tokens are owned by earlier modules —

```
पाहिजे	L3-M4
नको	L1-M3
होतं	L3-M3
खरं	L3-M3
तर	L3-M4
```

— and `maxSpan` is 1 on this course, so no row and no phrase key can carry any of the three. They
live in `L4-M3 rules[2]` and `L4-M4 rules[4]`, in each sentence's `literal`, and in the `trap` of
every sentence that uses them. A learner tapping `पाहिजे` in L4-M3-S06 is shown L3-M4's advice
note, which is correct as far as it goes and says nothing about the regret; the sentence's own
`trap` is what closes that gap, and it says so explicitly.

### 12. `नसतं` assigned to L4-M3, as the briefs instructed, and honoured in both directions

L4-M5's brief §5 assigns `नसतं` to L4-M3 "whose counterfactual cannot be taught without it", with
M5 re-showing and pointing back. Both halves shipped: L4-M3 owns the whole paradigm on one row
(`नसतो` + `forms ["नसतो","नसता","नसती","नसतं","नसते"]`), and L4-M5-S09 shows `नसतं` with **no row
of its own** — `rules[0]` names it as one cell of the negative-copula paradigm and the S09 `trap`
points at L4-M3. `check-shown` reports no `RE-TEACH` for it, because there is nothing to re-teach.
`नव्हतं` is L4-M5's, on one row with `forms ["नव्हतं","नव्हता","नव्हती","नव्हते"]`; L4-M8 will
re-show it for the past state and must point back here.

## The ratchet

`tools/shown-surfaces.test.ts` holds hi-mr at **7**, and this wave leaves it at 7. All three new
modules are clean:

- `npm run content:shown -- hi-mr L4-M3` → `L4-M3: clean — every shown surface resolves`
- `npm run content:shown -- hi-mr L4-M4` → `L4-M4: clean — every shown surface resolves`
- `npm run content:shown -- hi-mr L4-M5` → `L4-M5: clean — every shown surface resolves`

No `SHOWN-BUT-UNTAUGHT`, no `COLLIDES INSIDE THIS MODULE`, and **no `RE-TEACH` reported on any of
the three** — every row in all three files opens a key no earlier module owns, and no row was
repeated inside a module, so the deliberate-repeat exception was not needed. Thirty hero displays,
sixty variation displays and thirty-six comprehension items all resolve in the cumulative index;
L4-M4-S03's two-sentence display resolves on both halves.

The baseline was not lowered and could not have been: all seven findings are in hi-mr L1
(`थोडं`, `भाजी`, `पाच`, `झाले` taught later; `प्रिया`, `पुणं`, `बोललो` never taught — `docs/52`),
and a level never edits a file below it. `बोललो` in particular is still free and this wave did not
buy it, because buying it at L4 would not clear an L1 finding — first occurrence wins forward, not
backward.

`npm run content:validate` → `CONTENT n/n ok` (the total climbs while the nine sibling waves land;
it read `CONTENT 313/313 ok` when these three files first passed together and `CONTENT 315/315 ok`
at the end of this wave).
`npx vitest run tools/shown-surfaces.test.ts` → `Tests 11 passed (11)`.
`npx vitest run src/course/types.test.ts` read `2 failed | 332 passed (334)` when these three files
first landed, and both failures were file-census counts belonging to other waves — the module list
at line 192 (the parent's) and the hi-en count at line 694, which a sibling wave moved from 34 to
35. Once those censuses caught up it read `Tests 336 passed (336)`. Every course law in that file
passes for all three new modules.

## Open questions for a native pass — hi-mr L4 wave 2

Continuing the chain in `docs/85-hi-mr-L4-brief-decisions.md` and wave 1 above, whose last number
is 118. The native-speaker gate is a separate and stricter bar than this review, and it is unmet.

119. **`मी` against `मला` in the नको होतं frame, once more.** `docs/85` #100 asked it and this wave
     shipped the brief's answer: L4-M3-S07 is `मी तिथे उगीच जायला नको होतं`. But S08 in the same
     module ships `मला ती नोकरी हवी होती`, so a learner meets both subjects in one module and the
     rules do not say why. Is `मला तिथे जायला नको होतं` equally ordinary, more ordinary, or wrong?
     If it is equally ordinary the module needs a line saying so; if it is *more* ordinary, S07's
     hero should change.
120. **`उगीच` inside a regret.** S07 buys उगीच to make the sentence a regret rather than a report.
     Is उगीच what a speaker reaches for here, or is it विनाकारण, फुकट, or nothing at all — with the
     regret carried entirely by नको होतं?
121. **`निरोप दिला असता` as the third-person masculine counterfactual.** L4-M3-S03 chose a ने
     clause over the simpler `तो गेला असता` deliberately (see seam 10). Is
     `जर त्याने आधी निरोप दिला असता` natural spoken Marathi, or would a speaker say
     `जर त्याने आधी सांगितलं असतं` and leave निरोप to a written note?
122. **`आठवण येते` against `आठवतं`.** L4-M3-S10 puts both in one display and splits them as
     noun-plus-येणे against verb. Is `मला त्याची आठवण येते` the everyday way to say "I miss him",
     and does putting the two in one sentence read as instructive or as a drill?
123. **`संधी` against a borrowed `चान्स`.** S01 and S08 both turn on संधी. In spoken Pune or Mumbai
     Marathi, is संधी what a person says about a job or an opportunity missed, or is it the written
     word and चान्स the spoken one?
124. **The काश hole, and whether `… तर बरं झालं असतं` fills all of it.** `rules[4]` and S09 ship it
     as the whole answer. Is there any other everyday move — a particle, an intonation, a
     `असतं तर!` left hanging — that a Marathi speaker uses where Hindi uses काश?
125. **`तरीही` at the head of a new sentence, and #118 again.** L4-M4-S03 is a two-sentence display
     precisely so तरीही can open the second. Does a native reader accept the full stop there, or is
     `खूप गर्दी होती, तरीही मला जागा मिळाली` — one sentence, one comma — what people actually
     write? The answer decides both this module and #118.
126. **`तरी` after a *state* without असलं.** L4-M4-S10 ships `हे खरंच चांगलं आहे, तरी थोडं महाग
     आहे`, with तरी following a full copular clause rather than the असलं form. Is that ordinary, or
     does an आहे clause always need `असलं तरी` and this hero is a Hindi-shaped shortcut?
127. **The `-च` trio bought as three words.** नक्कीच, बरोबरच and खरंच are one clitic on three owned
     words (seam 7). Is a learner better served by three rows, as shipped, or by one rule for `-च`
     and one row — and if the latter, is `-च` productive enough at L4 to be taught as a rule at
     all?
128. **`अवघड` against `कठीण`.** L4-M4-S07 buys अवघड and its mistake refuses Hindi मुश्किल. Is कठीण
     genuinely bookish in speech, or is it as ordinary as अवघड and the module has picked one of two
     equals?
129. **`उपयोग आहे` against `उपयोगी आहे` / `फायदा आहे`.** L4-M4-S08 ships `त्याचा उपयोग जास्त आहे`
     beside तोटा. Is उपयोग used with जास्त and कमी that way, or does a speaker say
     `त्याचा फायदा जास्त आहे` and keep उपयोग for "there's no use in it" (`उपयोग नाही`)?
130. **`नाहीये` in a `display` at all.** L4-M5-S05 puts the spoken contraction in a hero line and
     its row says "write नाही when you write". Is a written-Marathi course right to show नाहीये as
     a hero, or should it live only in a variation or a usage line?
131. **`असं करू नये` — heard, or only read?** `rules[4]` sells नये as the *politest* prohibition
     because it names nobody. Is that how it lands in conversation, or is नये a notice-board form
     (closer to L4-M7's register) that would sound cold said to a person's face?
132. **`हे नेहमी असं नसतं` as a refusal.** L4-M5-S09 offers "it isn't always like this" as the
     softest way to refuse a claim. Is that a real move in Marathi argument, and is नेहमी in the
     right slot — before असं, as shipped, or after it?
