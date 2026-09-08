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

## Wave 3 — L4-M6 through L4-M10 (#537)

The level's RANGE modules — L4-M6 "Before and after", L4-M7 "Official talk", L4-M8 "Back then",
L4-M9 "Places and journeys" and L4-M10 "A story with a twist" — authored together on 2026-09-08 and
shipped `verified: true` in the same change, signed
`Claude Opus 5 — LLM review, authorised by repo owner`. This wave closes hi-mr L4.

Written, like waves 1 and 2, against the **real index** rather than against the briefs.
`npm run content:owner -- hi-mr …` read `717 surfaces owned, folded over 35 modules through L4-M5`
when the first display of L4-M6 was written and `765 surfaces owned, folded over 37 modules through
L4-M7` by the time L4-M9 was — the tool folds the modules **authored** so far, not only the emitted
ones, which is why a wave that ships five modules has to re-ask its questions as it goes. Every
ownership line quoted below is that tool's output on the day.

`maxSpan 1` shapes this wave as it shaped the last. Five of the six endings the level still owed —
`-ल्यावर`, `-ताना`, `-पासून`, `-पर्यंत`, `-हून` — **weld**, so each welded form is its own single-token
key and can be bought. The shapes that do NOT weld own no key at all and live in `rules[]` and in
each sentence's `literal`: `करण्यात येईल`, `-ण्यास मनाई आहे`, `उभे राहावे`, `जोपर्यंत … तोपर्यंत`,
`जेव्हा … तेव्हा`. Both halves of the correlatives are separately owned keys, but the PAIR is not,
and no tap will ever explain the pairing — the modules say so in their rules.

### L4-M6 — Before and after

Two events against each other inside one sentence. Ten displays:

1. `जेवल्यावर मी थोडा वेळ अभ्यास केला`
2. `घरी आल्यावर मी लगेच चहा केला`
3. `तो गेल्यावर आम्ही जेवलो`
4. `ऑफिसला जाताना मी रोज गाणं ऐकतो`
5. `काम करताना तो जास्त बोलत नाही`
6. `सकाळपासून रात्रीपर्यंत मला वेळ नाही`
7. `जोपर्यंत तो येत नाही तोपर्यंत आम्ही थांबतो`
8. `मी आधीच जेवलो आहे`
9. `मी अजून जेवलो नाही`
10. `जेव्हा मी तिथे गेलो तेव्हा ती घरी होती`

It teaches five welded endings and two frames. `-ल्यावर` (after) on the past stem, with `केल्यावर`
and `झाल्यावर` opened as forms of S01's row and re-shown in S02's variation and pool item C11;
`-ताना` (while), person-free, with `येताना` and `बोलताना` as forms; `-पासून` and `-पर्यंत` on TIMES
only, with `संध्याकाळपर्यंत` and `उद्यापर्यंत` as forms of S06's second row; the correlatives
`जोपर्यंत … तोपर्यंत` (S07, where the नाही is compulsory) and `जेव्हा … तेव्हा` (S10). And THE PERFECT,
which `docs/50` §3 deferred out of L3-M7 without naming an owner: it lands here, as exactly the two
frames the brief allows — `आधीच` + past + `आहे` against `अजून` + past + `नाही` — and `rules[4]` says
in as many words that it is two frames and not a paradigm. `अजूनही` ships as a form of S09's row and
is shown in C12. Sixteen rows, twenty-three new surfaces, cap 25.

The one purchase that is not an ending is `ऑफिसला` (S04): a fresh key on the owned lexeme `ऑफिस`
(L3-M2) — wave 1 §2's class again, and it pays for itself twice, because L4-M8's `गावाला` and
L4-M9's `मुंबईला` are the same `-ला` and point back at it.

### L4-M7 — Official talk

The register a learner is spoken AT in. Ten displays:

1. `तिकीट खिडकी दहा वाजता बंद करण्यात येईल`
2. `प्रवाशांना सूचना देण्यात येत आहे`
3. `इथे धूम्रपान करण्यास मनाई आहे`
4. `उद्या कार्यालय बंद राहील`
5. `कृपया रांगेत उभे राहावे`
6. `तुमचा अर्ज उद्या स्वीकारण्यात येईल`
7. `हे औषध इथे उपलब्ध आहे`
8. `तुमचा क्रमांक काय आहे?`
9. `कृपया इथे थोडा वेळ प्रतीक्षा करावी`
10. `नोंदणी उद्या सुरू होईल`

The passive lands here, ratified as this module's by `docs/48` §4 — `-ण्यात` + येणे on three verbs
(`करण्यात`, `देण्यात`, `स्वीकारण्यात`), with the tense on येणे and never on the `-ण्यात` word. Beside
it the three other official shapes: `-ण्यास मनाई आहे` (S03), `बंद / सुरू राहील` against `होईल` (S04
and S10, and the pair is the module's sharpest small distinction — a state announced against a
moment announced), and `उपलब्ध आहे` (S07). The notice optative `-आवे` is S05 and S09, with `करावे`
and `करावी` as forms of S05's row and the gender agreement shown rather than asserted: `प्रतीक्षा` is
feminine, so `करावी`. Every sentence carries `register: "formal"`.

The Hindi interference is `rules[1]` and it is the level's sharpest register delta: `बंद केला जाईल`
is grammatical Marathi and is not what a sign says, so S01's `mistake` is exactly that sentence.
`rules[1]` also states the half of the rule a learner most needs — the passive is **heard, not
spoken back**, and their own reply at the counter stays in L2-M1's तुम्ही tier.

The brief asked for both `नंबर` and `क्रमांक` as two rows with a usage line splitting them, and S08
ships them: `क्रमांक` on the hero and `नंबर` in the first variation, one row each, the notes drawing
the line as paper against mouth. S08's `mistake` is not a grammar error at all but a register
collision — `तुमचा क्रमांक काय आहे रे?` — which is the only kind of error this module can really make.

**On the brief's inversion.** `docs/48` §4 asks for a comprehension pool *easier* than the
production, "because that inversion is the module's shape". The pool as shipped is the ten
announcements plus `उद्या बँक बंद राहील` and `तुमचा नंबर काय आहे?` — that is, the reading half of the
module is exactly what the learner will meet on a wall, while the *producing* half is a much smaller
thing (they never produce any of it; they read it and answer in L2-M1 Marathi). That is how this
wave read the instruction, and question 141 below asks the native pass whether it read it right.

### L4-M8 — Back then

A stretch of past life, set against now. Ten displays:

1. `पूर्वी मी रोज शाळेत जायचो`
2. `ती रोज संध्याकाळी खेळायची`
3. `आम्ही कधीकधी गावाला जायचो`
4. `तेव्हा आमचं गाव खूप लहान होतं`
5. `पूर्वी हे शहर लहान होतं, आता ते मोठं आहे`
6. `आजी रोज गोष्ट सांगायची`
7. `आम्ही तेव्हा आजोबांकडे राहायचो`
8. `पूर्वी मी खूप वाचायचो, आता वेळ नाही`
9. `तेव्हा हे काम सोपं असायचं`
10. `पूर्वी मी लवकर उठायचो, पण आता नाही`

The past habitual `-आयच-` on seven verbs — `जायचो`, `खेळायची`, `सांगायची`, `राहायचो`, `वाचायचो`,
`असायचं`, `उठायचो` — with `जायचे`, `खेळायचो`, `सांगायचे`, `राहायची`, `असायची`, `असायचे` as forms. The
past STATE beside it needs no morphology at all (S04, S05, S09 lean on L3-M3's `होतं`/`होता`/`होती`
and L4-M5's `नव्हती`), and the then-against-now frame is S05, S08 and S10. `rules[1]` is the clean
interference the brief promised: Hindi's `जाता था` is two words on the same participle as `जाता है`,
so a Hindi speaker reaches for `मी जातो होतो`; S01's `mistake` is that exact sentence.

**The paradigm hole is real and it is honoured.** See seam 17 below: `जायची` is L2-M4's, so the
feminine cell of जाणे is simply missing from S01's `forms` — `["जायचो", "जायचे"]`, no third — and the
feminine is shown on other verbs instead (`खेळायची`, `सांगायची`, `राहायची`). S01's note names the
gap, `rules[4]` explains it, and S03's `mistake` is `आम्ही कधीकधी गावाला जायचं`, which is precisely
the cell a learner would reach into.

### L4-M9 — Places and journeys

One trip end to end. Ten displays:

1. `मी काल पुण्याहून मुंबईला गेलो`
2. `आम्ही सकाळी लवकर घरून निघालो`
3. `मी दहा वाजता तिथे पोहोचलो`
4. `मी स्टेशनवर उतरलो आणि बसमध्ये चढलो`
5. `घरापासून स्टेशनपर्यंत फक्त दहा मिनिटं आहेत`
6. `तिथून सरळ जा, मग डावीकडे वळा`
7. `हा प्रवास खूप छान होता`
8. `आम्ही ट्रेनने मुंबईहून पुण्याला आलो`
9. `आम्ही सकाळी लवकर निघालो. किल्ल्यावर आल्यावर आम्ही थांबलो. रात्री आम्ही घरी आलो.`
10. `हा रस्ता समुद्रापर्यंत जातो`

One ending and no new tense. `-हून` as the SOURCE OF A MOTION (`पुण्याहून`, `मुंबईहून`, `घरून`,
`तिथून`) against `-पासून` as ONE END OF A STRETCH (`घरापासून … स्टेशनपर्यंत`), stated in exactly those
terms in `rules[0]` and `rules[1]`, with the Hindi `से` collapse as `rules[2]` and S01's `mistake`
(`मी काल पुण्यापासून मुंबईला गेलो`). S05's `mistake` runs the split the other way —
`घरून स्टेशनपर्यंत` — because `-पर्यंत`'s partner is `-पासून`, never `-हून`, and a learner who has
absorbed only half the rule will make that one. S08 puts both Hindi `से`s in one Marathi sentence
and splits them into two different endings: `ट्रेनने` (means, L2-M4's `-ने`) and `मुंबईहून` (place).

The journey verbs are ordinary L1-M5 pasts and cost no grammar: `निघालो`, `पोहोचलो`, `उतरलो`, `चढलो`,
each taught with the postposition it takes (`rules[3]`, S04). S06 re-shows L2-M4's directions
unchanged and buys only `तिथून`. S09 is the trip told whole — three sentences, `-ल्यावर` re-shown
from L4-M6, nothing new but `किल्ल्यावर`.

### L4-M10 — A story with a twist

Six-sentence narratives with one quoted line. Ten displays (each an account; the quoted line is
inside it):

1. `काल मी ऑफिसला जाताना स्टेशनवर थांबलो. … अचानक तो म्हणाला, "मी अजून जेवलो नाही." मग आम्ही जेवायला गेलो.`
2. `काल मी सकाळी लवकर घरून निघालो. … अचानक माझा मित्र म्हणाला, "आज कार्यालय बंद राहील." मग मी लगेच घरी आलो.`
3. `काल सकाळी मी ऑफिसला गेलो. … अचानक एक सूचना आली, "आज नोंदणी बंद राहील." शेवटी मी घरी आलो.`
4. `परवा आम्ही बसने मुंबईहून पुण्याला आलो. … अचानक माझी आई म्हणाली, "माझा फोन अजून बसमध्ये आहे." पण तोपर्यंत बस गेली.`
5. `पूर्वी आजी रोज गोष्ट सांगायची. … काल रात्री तिने विचारलं, "तुला अजून आठवतं का?" … शेवटी तिने मला ती गोष्ट पुन्हा सांगितली.`
6. `काल मला खूप ताप आला. तरी मी सकाळी ऑफिसला गेलो. अचानक माझा मित्र म्हणाला, "तू आज घरी जा." … आता मला खूप बरं आहे.`
7. `पूर्वी आमचं गाव खूप लहान होतं. … अचानक आजोबा म्हणाले, "पूर्वी इथे काम नव्हतं." मला असं वाटतं की ते खरं आहे.`
8. `काल संध्याकाळी मी स्टेशनवर थांबलो. … अचानक त्याने फोन केला आणि म्हणाला, "मी आधीच घरी पोहोचलो." शेवटी मी लगेच घरी आलो.`
9. `काल खूप पाऊस होता म्हणून मी घरी थांबलो. … अचानक माझी आई म्हणाली, "तुझं जेवण अजून इथे आहे." … शेवटी मी रात्री जेवलो.`
10. `काल मी शाळेत गेलो. तिथे मला आजी भेटली. ती पूर्वी तिथे राहायची. अचानक मी तिला विचारलं, "तुमचा नंबर काय आहे?" शेवटी तिने मला तिचं नाव सांगितलं.`

Every account is five sentences, one under the six-sentence ceiling, and every one carries exactly
one quoted line. **The new-word spend is one: `अचानक`.** Everything else in all ten accounts is a
surface some earlier module owns, which is why nine of the ten word rows are consolidation rows in
L3-M10's shape — an owned lexeme given a note about what it does *inside an account* rather than in
a sentence. They are listed as re-teaches by `content:shown` and that is the intended outcome; see
the ratchet below.

The device is direct speech, and `rules[1]` states the no-backshift law: the quoted line stands in
the tense it was spoken in while the narration stays past. S04 is where that bites — the mother says
`माझा फोन अजून बसमध्ये आहे` inside a story told entirely in the past, and S04's `mistake` is the same
line with `होता`, which is what a learner who has been taught English sequence-of-tenses will write.
S01's `mistake` goes the other way: it converts the quote into L3-M5's `की` report *and* backshifts.

Register is the module's own interference (`rules[4]`) and S10 is built for it: an `आजी` met at a
school gate is `तुमचा` in the fifth sentence as much as in the first, and S06's `mistake` is the
opposite slip (a friend addressed as `तुम्ही`). The two `mistake` rows are a matched pair.

## Seams — what `content:owner` said, wave 3

Numbering continues from wave 2's §12.

### 13. The index seam's HEADLINE is stale in every brief, and it moves during the wave

`docs/48`-era briefs describe the fold as "N surfaces through L3-M10". The tool said:

```
717 surfaces owned, folded over 35 modules through L4-M5     (before L4-M6 was written)
765 surfaces owned, folded over 37 modules through L4-M7     (before L4-M9 was written)
```

Two things follow, and the second is the one a future wave will get wrong. First, the fold is much
deeper than any brief says. Second, **`content:owner` folds the modules that have been AUTHORED, not
only the ones that have been emitted**, so inside a five-module wave the answer to "is this free?"
changes as the wave proceeds. Every query in this wave was re-run at the module that needed it, and
`ऑफिसला`, `गावाला`, `मुंबईला` were bought in that order on purpose: each is the same `-ला` and each
later row points back at the earlier one rather than re-opening the cell.

### 14. `नेहमी → L4-M5`, one module old, and L4-M8's brief lists it as fresh

```
नेहमी	L4-M5
कधीकधी	free
रोज	L1-M4
```

L4-M8's brief puts `नेहमी` in its "Fresh" list. It is not free — L4-M5-S09 bought it (`हे नेहमी असं
नसतं`, wave 2's question 132) — so this module bought `कधीकधी` instead, which is genuinely free and
does the job the module actually needed (an intermittent habit rather than an invariable one). This
is the same class as wave 2's §8 (`मिळालं` free while `मिळाली` owned): a brief written before the
previous wave landed cannot know what that wave spent.

### 15. `रस्ता → L4-M2` and `तिकीट → L4-M3`, both listed as fresh keys by L4-M9's brief

```
रस्ता	L4-M2
तिकीट	L4-M3
प्रवास	free
```

Both were bought by wave 1 and wave 2 respectively. Neither needed a row here: L4-M9-S10 re-shows
`रस्ता` under a `समुद्रापर्यंत` row, and L4-M7-S01 re-shows `तिकीट` under a `खिडकी` row. Had either
been given a row it would have been an unreachable one, resolving to the earlier module's note.

### 16. L4-M7's two flagged claims BOTH held, exactly as the brief predicted

The brief asked for two specific re-checks against `docs/50` §4 and got a yes on both:

```
अर्ज	free
कागद	L3-M8
भरलं	L2-M5
भरला	L2-M5
भरली	L2-M5
पोट	L2-M5
```

`अर्ज` was briefed for L3-M8 and never authored into a row, so it was available and L4-M7-S06 took
it. And the भरणे family is L2-M5's (Food and hosting — `पोट भरलं`), not L2-M8's as `docs/50` §4
assigned it. The lesson generalises: a brief's ownership claim is a claim about a brief, and only
the emitted index is a claim about the content.

### 17. L4-M8's sharpest seam held, and it forces a deliberate HOLE in a paradigm

```
जायचं	L2-M4
जायचा	L2-M4
जायची	L2-M4
जायचो	free
जायचे	free
करायचो	free   करायची	free   करायचे	free
खेळायचो	free   खेळायची	free
राहायचो	free   राहायची	free
असायचं	free   असायची	free   असायचे	free
```

L2-M4-S01 owns `जायचं` with `जायचा` and `जायची` as its forms, under an IMPERSONAL note
(`कसं जायचं?`). So L4-M8-S01's `forms` list is `["जायचो", "जायचे"]` and stops there. This is en-it
L4-M3's `sarei`/`sarebbe` problem in Devanagari: a complete-looking `-आयच-` paradigm on जाणे would
have swallowed three cells L2-M4 holds, and a learner tapping `ती रोज शाळेत जायची` would have been
shown a note that is false of the sentence in front of them — review 08 correction 4's का bug,
repeated. Every other verb's `-आयच-` cells are unspent, which is why the feminine is taught on
`खेळणे`, `सांगणे` and `राहणे` instead.

### 18. `असं → L3-M3`, not L3-M5 — L4-M10's against-instinct check, confirmed

```
असं	L3-M3
म्हणाला	L3-M5   म्हणाली	L3-M5   म्हणालो	L3-M5   म्हणाले	L3-M5
विचारलं	L3-M5
```

`docs/50` §4 and the L3-M5 brief both call `असं` a fresh key of L3-M5. The index says L3-M3, and
L4-M10-S07's row says so in its note, so a reader who arrives from the briefs is corrected at the
row rather than left to find the contradiction. The quoted-line device points at L3-M3's row.

### 19. `पूर्वी` and `तेव्हा` were assigned to L4-M6 by L4-M8's brief; the index said free, and this
wave split them

```
पूर्वी	free
तेव्हा	free
जेव्हा	free
```

L4-M8's brief lists both under "Owned: `पूर्वी → L4-M6`, `तेव्हा → L4-M6`". Neither was owned by
anything when this wave began, so the assignment was a prediction, not a fact — and only half of it
survived contact with the displays. **`तेव्हा` is L4-M6's**, because M6's `जेव्हा … तेव्हा` correlative
needs it and buys `जेव्हा` beside it. **`पूर्वी` is L4-M8's**, because L4-M6 had no display that
wanted it: M6 is about two events inside one sentence and `पूर्वी` is about a stretch of former life,
which is precisely L4-M8's `पूर्वी … आता` frame. L4-M8 therefore buys `पूर्वी` and re-shows `तेव्हा`,
and L4-M10 re-shows both. A future reader of the briefs should take the index, not the prediction.

### 20. The proper-noun exemption does NOT reach `tools/check-shown.ts`, and L4-M9 is the module
that would have found out

```
पुणे	free
मुंबई	free
पुण्याहून	free   मुंबईहून	free   पुण्याला	free   मुंबईला	free
किल्ला	free   किल्ल्यावर	free   समुद्र	free   समुद्रापर्यंत	free
```

`#61` exempts proper nouns from the index in the sense that nobody has to buy them — but nothing
exempts them from `SHOWN-BUT-UNTAUGHT`, and `tools/shown-surfaces.test.ts`'s own header lists
`प्रिया`, `mumbai` and `thomas` among the findings its baselines hold. A bare `पुणे` in an L4-M9
display would therefore have RAISED hi-mr's baseline, which this wave may not do. So **no display in
L4-M9 contains a bare place name.** Every place name that appears carries an ending and has a row:
`पुण्याहून`, `मुंबईहून`, `पुण्याला`, `मुंबईला`. That is the brief's own trap (`दिवाळीत`, `docs/50` §4)
turned into a rule of thumb: at L4 a proper noun is affordable only when something is welded to it.
The same reasoning bought `किल्ल्यावर` (with `किल्ला` as its form) and `समुद्रापर्यंत` (with `समुद्र`),
because the stem change — `किल्ला → किल्ल्या-`, `समुद्र → समुद्रा-`, `पुणे → पुण्या-` — is the thing
worth teaching and it only shows on the welded form.

### 21. `तुम्ही → L1-M2`, while the register LAW is L2-M1's

```
तू	L1-M2
तुम्ही	L1-M2
कृपया	L2-M1
धन्यवाद	L2-M1
```

L4-M7's and L4-M10's briefs both refer the tier question to "L2-M1's tiers", and that is right about
the *rule*; but the *keys* are L1-M2's, bought before any tier rule existed. L4-M10-S10's row is
therefore a re-teach of an L1-M2 key carrying an L2-M1 law, and its note says which is which. A
module that had assumed the key was L2-M1's and written a row for it would have been unreachable.

### 22. Three of this wave's five central shapes own no key, again

`maxSpan 1` means `करण्यात येईल`, `-ण्यास मनाई आहे`, `उभे राहावे`, `जोपर्यंत … तोपर्यंत` and
`जेव्हा … तेव्हा` are all multi-token and therefore unindexable. Each half is a key and the pairing is
not, so tapping `जोपर्यंत` explains `जोपर्यंत` and never explains that its `नाही` is compulsory. That
sentence lives in `L4-M6 rules[3]`, `L4-M7 rules[0]` and `rules[2]`, and each module says so — the
same disclosure wave 2 made for `पाहिजे होतं` and `खरं तर`.

## The ratchet

`tools/shown-surfaces.test.ts` holds hi-mr at **7**, and this wave leaves it at 7. All five new
modules are clean:

- `npm run content:shown -- hi-mr L4-M6` → `L4-M6: clean — every shown surface resolves`
- `npm run content:shown -- hi-mr L4-M7` → `L4-M7: clean — every shown surface resolves`
- `npm run content:shown -- hi-mr L4-M8` → `L4-M8: clean — every shown surface resolves`
- `npm run content:shown -- hi-mr L4-M9` → `L4-M9: clean — every shown surface resolves`
- `npm run content:shown -- hi-mr L4-M10` → `L4-M10: clean — every shown surface resolves, 21
  re-teach(es) reported above`

No `SHOWN-BUT-UNTAUGHT` and no `COLLIDES INSIDE THIS MODULE` anywhere in the wave. Fifty hero
displays (nine of them multi-sentence accounts), a hundred variation displays and sixty
comprehension items all resolve.

**The 21 re-teaches are all L4-M10's and all deliberate.** M6 through M9 report none. M10 spends one
new word by design (`अचानक`, `docs/48` §4's ceiling of one, matching L3-M10's single `गेली`), and
`tools/validate.ts` requires every sentence to carry at least one word row — so nine of its ten rows
are consolidation rows on owned keys, which is exactly the shape L3-M10 shipped in (`आधी`, `भेटलो`,
`म्हणून`, `होते`, `भरला`, `उठून`, `म्हणाला`, `जर`, `गेलो`, `गेलास`). The rows are
`म्हणाला`, `शेवटी`, `जेव्हा`, `विचारलं`, `तरी`, `असं`, `त्याने`, `म्हणून`, `तुम्ही`, and each is kept
because its account genuinely turns on that word: S02 and S05 on who is speaking and which form
म्हणणे/विचारणे takes, S03 on where `शेवटी` may stand, S04 on the correlative holding two clauses of a
trip together, S06 on the concession that makes the story a story, S08 on `ने` inside a narrative,
S09 on `कारण` against `म्हणून`, S10 on the tier. None of them collides inside the module — ten
distinct keys, ten distinct notes — so the deliberate-repeat exception (equal notes) was not needed
anywhere in this wave.

The baseline was not lowered and could not have been: all seven findings are in hi-mr L1
(`थोडं`, `भाजी`, `पाच`, `झाले` taught later; `प्रिया`, `पुणं`, `बोललो` never taught — `docs/52`), a
level never edits a file below it, and first occurrence wins forward rather than backward. `बोललो`
in particular is still free and this wave did not buy it, even though three of L4-M10's accounts
could have used it — `म्हणाला` did the work instead.

`npm run content:validate` → `CONTENT 360/360 ok` (the total climbs while the nine sibling waves
land; it read `CONTENT 358/358 ok` when these five files first passed together).
`npx vitest run tools/shown-surfaces.test.ts` → `Tests 11 passed (11)`.
`npx vitest run src/course/types.test.ts` → `Tests 381 passed (381)`. When these five files first
landed it read `3 failed | 376 passed (379)` and all three failures belonged to other waves — the
module census at line 191 (the parent's, expecting 354 against a tree holding 359), the en-ar file
count at line 598 (39 expected, 40 present), and an en-ko word row whose `note` was undefined at
line 1029. Once those censuses caught up the file was green. Every course law in it passes for all
five new modules.

One note on the tooling, for whoever reads this next: `tools/check-shown.ts` was transiently
un-parseable in the shared checkout part-way through this wave (an unbalanced brace in another
wave's in-progress edit around line 182), so the middle of this wave was checked by running a
pristine `git show HEAD:tools/check-shown.ts` copy out of the scratchpad. Every result quoted above
was re-run and reproduced with the repaired `npm run content:shown` before this section was written.

## Open questions for a native pass — hi-mr L4 wave 3

Continuing the chain in `docs/85-hi-mr-L4-brief-decisions.md` and waves 1 and 2 above, whose last
number is 132. The native-speaker gate is a separate and stricter bar than this review, and it is
unmet.

133. **`जेवल्यावर` against `जेवून` for the same two events.** L4-M6-S02's `mistake` refuses
     `घरी येऊन मी लगेच चहा केला` on the ground that L3-M1's `-ऊन` compresses two steps into one breath
     while `-ल्यावर` puts a gap between them. Is that gap real in speech, or would a Pune speaker use
     `येऊन` for this sentence and keep `-ल्यावर` for longer intervals?
134. **The compulsory `नाही` in the `जोपर्यंत` half.** L4-M6-S07 ships
     `जोपर्यंत तो येत नाही तोपर्यंत आम्ही थांबतो` and `rules[3]` calls the नाही obligatory. Is
     `जोपर्यंत तो येईपर्यंत` or a नाही-less `जोपर्यंत` ever heard, and is `तोपर्यंत` really never
     dropped in speech the way Hindi drops तब तक?
135. **`मी आधीच जेवलो आहे` against `मी जेवलोय`.** The module ships the full perfect in both frames.
     Does a speaker in Pune contract it — `जेवलोय`, `आलोय` — often enough that a learner who never
     hears the long form will be confused, and if so does that belong in a variation or a `sound`
     line rather than in a hero?
136. **`सकाळपासून` against `सकाळी पासून`.** S06's `mistake` refuses the spaced form outright. Is the
     welded spelling genuinely the only one in print, and is the same true of `रात्रीपर्यंत`?
137. **`करण्यात येईल` against `केला जाईल` — how sharp is the register line really?** L4-M7 stakes
     three displays and two `mistake` rows on the claim that the जाईल passive is grammatical but
     never appears on a sign. Is that true of *spoken* announcements too (a station PA, a bank
     clerk), or only of printed notices?
138. **`राहील` against `होईल` for an announced state.** S04 and S10 are built as a matched pair —
     `बंद राहील` (stays closed) against `सुरू होईल` (starts). Is `बंद होईल` ever what a notice says,
     and would a Marathi reader hear S04's `mistake` as wrong or merely as odd?
139. **`प्रतीक्षा करावी` against `प्रतीक्षा करावी लागेल` / `थांबावे`.** S09 ships the bare optative.
     Is `कृपया इथे प्रतीक्षा करावी` the form actually printed, or is `कृपया थोडा वेळ थांबावे` the more
     usual notice — and if both, which is the office and which the station?
140. **`क्रमांक` against `नंबर` in speech.** S08's row claims a speaker saying `क्रमांक` sounds like an
     office. Is that right, or does `क्रमांक` survive in ordinary speech in some collocations
     (`घर क्रमांक`, `गाडी क्रमांक`) where `नंबर` would sound wrong?
141. **The comprehension/production inversion, as this module read it.** `docs/48` §4 asks L4-M7's
     pool to be "easier than the production". This wave shipped the pool as the announcements
     themselves, on the reading that a learner recognises far more of this register than they can
     produce. Is that the intended reading, or was the brief asking for a pool of the learner's OWN
     replies (`माझा क्रमांक तीन आहे`, `मी रांगेत आहे`) instead?
142. **`ती जायची` — how badly does the missing cell hurt?** L4-M8 cannot show the feminine habitual
     of जाणे at all (seam 17), so a learner meets `ती खेळायची` and `ती राहायची` but never
     `ती शाळेत जायची`, which is the single most likely sentence they will want to say. Is the gap
     survivable, or does L5 need to buy `जायची` back with a note that overrides L2-M4's?
143. **`असायचं` against `असायचा`/`होतं` for a habitual state.** L4-M8-S09 ships
     `तेव्हा हे काम सोपं असायचं` and draws `होतं` = was, `असायचं` = used to be. Is `असायचं` common in
     speech, or is it a form a Marathi speaker would recognise but rarely produce, preferring
     `तेव्हा हे काम सोपं होतं` and letting `तेव्हा` carry the habituality?
144. **`आजोबा` as an honorific plural.** L4-M8-S06's variation writes `आजोबा रोज गोष्ट सांगायचे` and
     the note says आजोबा always takes the plural. Is that invariable, or does a grandchild speaking
     casually say `आजोबा सांगायचा`?
145. **`घरून` against `घरापासून`, and whether the split is as clean as `rules[0]`–`rules[1]` say.**
     L4-M9 stakes the whole module on source-of-motion versus one-end-of-a-stretch. Is there a
     sentence where both are acceptable with a difference only of nuance, and does `घरापासून निघालो`
     really sound wrong or merely bookish?
146. **`प्रवास` as masculine, against Hindi's feminine `यात्रा`.** L4-M9-S07's `mistake` is
     `ही प्रवास … होती`. Is `प्रवास` invariably masculine in Marathi, and is `सहल` the word a speaker
     would reach for for a day trip like S09's?
147. **`अचानक` as the twist's only word, and `अखेर` left on the shelf.** The brief said take `अचानक`
     and leave `अखेर` because `शेवटी` (L2-M10) already closes a story. Does `अचानक` carry the whole
     job of the English "and then, out of nowhere", or does a Marathi story-teller more often use
     `तेवढ्यात` or `इतक्यात` at that hinge — and if so, is the module's one word the wrong one?
148. **The quoted line's punctuation.** All ten accounts use straight double quotes around the
     spoken line and a full stop inside them. Is that the convention Marathi print uses, or should
     the mark be `'…'`, and does the danda belong anywhere in a course that has otherwise settled on
     the full stop?
