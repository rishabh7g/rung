# hi-mr L4 — the authoring-brief decisions (#510)

The ten hi-mr L4 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['hi-mr']` L4-M1…L4-M10) are the
first L4 briefed in any course, and the first level in this repo planned against three verified
levels. Every seam below was pinned against the REAL cumulative index, read through
`npm run content:owner -- hi-mr <surface> …` on **2026-09-08**, which folds the thirty delta files
in `public/content/hi-mr/index/` and reports:

> `633 surfaces owned, folded over 30 modules through L3-M10`

and `public/content/hi-mr/index/L3-M10.json` carries `surfaceCount: 633, maxSpan: 1` (L1 closed at
222, L2 added 219 to 441, L3 added 192). **hi-mr is the only one of the nine courses whose
`maxSpan` is 1** — the other eight run 2 to 5 (en-ar 5, en-fr 4, hi-en 4, en-de/en-es/en-it/en-ru 3,
en-ko 2). That single number decides more of this level than any pedagogical choice below, and §4
is written about it.

The level also inherits the review chain: docs/08 open questions 1–22, docs/15 23–30, docs/19
31–40, docs/23 41–48, `docs/49-llm-review-hi-mr-L2.md` 49–70, and
`docs/51-llm-review-hi-mr-L3.md` 71–96. The questions at the end of this note continue at **97**.

This note records the five decisions the briefs are written to — the L4 equivalents of docs/50's
four. The briefs repeat each decision in the module notes, because a prompt only ever shows an
author the notes.

## 1. Language of fields — unchanged, field for field

`rules[].text` and word `note` in English; every learner-facing line in Hindi in Devanagari (`cue`,
`trap`, `sound`, `variations[].changed`, `mistake.why`, `usage`, `mnemonic`); `glossEn` on every
sentence; `literal` wherever word order or a gender decision moves. docs/26 §1 and docs/50 §1 both
declined to revisit this and so does L4 — with one addition forced by §4 below: where a module's
central shape is TWO tokens and therefore owns no index key, the explanation must be carried by
`rules[]` and by the sentence's `literal`, because there is no word row for it to live in.

## 2. Register — carried from L2, and L4-M7 adds a register the learner never speaks

L2-M1 settled when तू and when तुम्ही; #422 gave the तुम्ही + -आ and कृपया tier its own `formal`
chip; L3 applied it without extending it. L4 extends it exactly once:

- **L4-M7 "Official talk" is a register the learner HEARS and does not speak back.** docs/48 §4
  kept M7's overlap with L2-M1 and L3-M8 deliberately — L2 teaches which register to speak, L3
  puts you at the counter, L4 is the register spoken at you. So M7's displays chip `formal`, its
  comprehension pool carries the heard lines, and its `mistake` is about mis-PRODUCING it (the
  Hindi-shaped passive, §3), not about failing to understand it. The learner's own reply to the
  counter stays in L2-M1's tier, unchanged.
- **L4-M5 "Disagreeing well" is the register test of the level.** Disagreement with an elder chips
  `formal` and reaches for कदाचित and the fronted नाही first; the same disagreement with a friend
  chips `informal`. One sentence should show the pair, as L3-M8's counter pair did.
- **L4-M10 holds one register for the whole account,** the law L2-M1 opened and L3-M10 closed its
  level on. The quoted line inside the story may be in a different register from the narration —
  that is the point of quoting it — and must be chipped honestly.

## 3. What L3 withheld, and where it lands

L3 named three things it was keeping out (docs/50 §3, and `docs/51` "Seams held across the
level"). Each has an owner now, and one of them needed an owner naming for the first time.

- **The counterfactual as a system → L4-M3.** L3-M4 shipped ONE frame (first person, masculine:
  गेलो असतो, आलो असतो, वेळ असता) and its own rule said "this ONE frame is all L3 opens; the system
  is L4's". M3 opens person and gender (गेली असती, झालं असतं), the negative (नसतो, नसतं), and the
  regret frames that are not conditionals at all (पाहिजे होतं, नको होतं, हवं होतं, आवडलं असतं).
- **The passive → L4-M7, and NOT L4-M2.** docs/48 §4's second amendment ratified L4-M7 as the
  passive's home "with L4-M2 Cause and consequence as its second home for the paragraph-length
  uses", and left the payload to each course's brief. **For hi-mr the payload at M2 is none.** Two
  reasons, and both are recorded here so no authoring wave re-opens it. First occurrence wins and
  M2 runs before M7, so a `करण्यात आला` shown at M2 would take the row M7's entire job depends on
  and hand a story-reader an announcement note. And it is not what a Marathi speaker says: the
  paragraph-length consequence of a closed road is रस्ता बंद झाला, an intransitive; रस्ता बंद
  करण्यात आला is the sign on the barricade. M2 states consequences with झाला/झालं/झाली (L2-M8's
  row) and spends nothing of the passive. See Q97.
- **The perfect → L4-M6, and this deferral had no owner at all until now.** L3-M7 taught
  मला ताप आला आहे as two or three fixed lines and its brief said "do not open the tense as a
  system; that is L4's" — naming a level and not a module, which is exactly how docs/48 §4
  described a deferral becoming an orphan. It lands at **L4-M6 "Before and after"**, because
  *already* and *not yet* are the only place the perfect earns its keep: मी आधीच जेवलो आहे ·
  मी अजून जेवलो नाही. It enters as those two frames and not as a paradigm. See Q98.

**Two debts stay standing.** L1-M9's बोललो remains the pinned index miss (docs/15 Q29) and L4-M10's
quoted line does not pay it — म्हणणे is L3-M5's and बोलणे is still speaking. And every open
question in docs/49 and docs/51 is a native-pass item: no L4 authoring wave may "resolve" one by
re-writing a shipped L1, L2 or L3 sentence.

## 4. Forms and seams — the single-token law, and what it costs at L4

`maxSpan: 1`. Every surface in this course is one token, has been since L1-M1, and L4 does not
change it. The brief template asks which multi-token phrases should index WHOLE so their parts stay
unspent; **for hi-mr the answer is none, because the course has no multi-token surfaces**. That has
three consequences the briefs state module by module:

- **Every fused form is its own key.** Each -ण्यासाठी (M1), -मुळे (M2), -ल्यावर / -ताना / -पर्यंत /
  -पासून (M6), -ण्यात / -ण्यास (M7), -आयचो (M8) and -हून (M9) form is a separate row, deconstructed
  in the module that first shows it, with its note pointing back at the base word. Bare साठी, bare मुळे, bare पर्यंत and bare हून never stand free and get no key, exactly as bare चा (docs/50 §4)
  and bare पेक्षा do not.
- **A two-token frame owns nothing.** L4-M3's central shape is पाहिजे होतं / नको होतं: पाहिजे
  resolves to L3-M4, होतं to L3-M3, and the FRAME has no key. M3 is the first module in this course
  whose central shape is unindexable, and §1's addition exists for it.
- **A proper noun with an ending welded on is a key.** पुण्याहून (M9) is not exempt under #61 the
  way पुणे is — it is the same trap docs/50 §4 flagged for दिवाळीत, one level on.

The shared lexemes are assigned up front so no two modules can claim one:

- **पण is L4-M2's** — see §5, it is the level's largest single finding.
- **नसतं / नसतो are L4-M3's** (the counterfactual cannot be taught without them); L4-M5 re-shows
  them and points back.
- **नव्हतं is L4-M5's** (the negative-copula paradigm's home); L4-M8 re-shows it for the past state
  and points back, because M5 runs first.
- **तरी, तरीही and असलं तरी are L4-M4's.** तरी is a DIFFERENT key from L3-M4's तर, not a form of
  it, and M4's row says so in a line — the two words are one letter apart.
- **-पासून is L4-M6's (a TIME) and -हून is L4-M9's (a PLACE).** Hindi's से covers both, which is
  why the split has to be assigned rather than discovered.
- **गाव and शहर are L4-M8's** (the then/now module needs them); L4-M9 re-shows them.
- **अचानक is L4-M10's**, and it is the level's last new word.

## 5. पण — the finding that reorganised the level

`npm run content:owner -- hi-mr पण` says:

```
पण	free
```

Thirty authored modules — greetings, refusing without offence, comparing and choosing, agreeing and
disagreeing with reasons attached — and this course has never taught the word *but*. The index is
not lying: `grep -oh '[^ "]*पण[^ "]*' content/hi-mr/modules/*.json` returns आपण (41), झोपणार,
झोपणे, टिप्पणी and संपणे, and never the standalone word. The same query found `मात्र → free`,
`फक्त → free`, `सुद्धा → free` and `नेहमी → free`, none of which appears anywhere in the content
either.

The first plan put पण in **L4-M4 "Persuading"**, where the concessive lives. That is wrong, and the
index is what makes it wrong: M3's regrets, M5's softened disagreement and M10's twist all want
*but*, and none of them may use a word that no module has taught. So **पण is L4-M2's**, in the
paragraph-connective module, where it sits beside कारण, म्हणून and त्यामुळे and costs one row and
one line (it is Hindi पर / लेकिन with no delta at all). **L4-M4 then owns the CONCESSIVE proper** —
तरी, तरीही, असलं तरी — which is the harder shape and the one its job actually names. Both modules
are better for it.

## The shape of the level

- **Bounds climb 12 → 14**, the ramp docs/48 §B3 set for L4 (L2 8→10, L3 10→12, L4 12→14,
  L5 14→16), split 3 / 4 / 3 exactly as L3 split 10 / 11 / 12:
  - **M1–M3 at 12.** They continue L3's ceiling unbroken and they are the fully-enriched modules
    (the validator's law, and hi-mr's habit is that every module is): five blocks on ten sentences
    is where a long sentence costs the most, so the climb waits.
  - **M4–M7 at 13.** A concession plus a position (M4), a hedge plus a reason (M5), a time clause
    plus its main clause (M6) and an announcement (M7) are all two-clause sentences, and 12 words
    is where a two-clause Marathi sentence starts losing its second clause.
  - **M8–M10 at 14.** The then/now contrast is two clauses joined (M8), a trip carries a direction
    inside a narration (M9), and M10's sentences sit inside an account. 14 is the level ceiling and
    L5 opens at 14 climbing to 16.
- **`newWordCap` stays 25 everywhere,** as it has at every level (PRD §5). It is a ceiling and not a
  target, and the real budget is stated per module in the notes: M3 and M6 are shape modules and
  should spend almost nothing (M3's frames are built from L3-M4 and L3-M3 surfaces already owned);
  M7 and M9 are the two vocabulary modules; M10 should spend **at most one** — L3-M10 spent exactly
  one surface (`गेली → L3-M10`) and M10's one, if it takes it, is अचानक.
- **M10 is SIX sentences, not eight,** and the per-sentence bound applies inside the account, as at
  L3-M10. docs/48 §4 kept the shorter ceiling on purpose: L4-M10 and L5-M10 differ from L3-M10 in
  KIND, not in length, and this one's kind is the line of dialogue inside the narrative.
- Pools are authored to 12, the course's shipped size (#305).

## A section per module — what it owns, and why it sits where it does

**L4-M1 "Explaining how" (12 words).** Owns the purpose clause: -ण्यासाठी generally, -आयला after a
verb of motion, plus the negative imperative करू नका. It sits first because the level's through-line
— *Marathi welds what Hindi spaces out* — is cheapest to say here (करने के लिए → करण्यासाठी) and is
then reused by M2's -मुळे, M6's four endings and M8's -आयचो. Sequencing costs nothing: आधी
(L2-M10), मग and नंतर (L1-M4), शेवटी (L2-M10) and L3-M1's -ऊन chain are all owned.

**L4-M2 "Cause and consequence" (12).** Owns -मुळे on a noun, त्यामुळे across a sentence boundary,
and पण (§5). कारण and म्हणून are L1-M9's and are re-shown with their division of labour finally
stated. It sits second because a paragraph needs its connectives before anything else in the level
can run to paragraph length. It spends nothing of the passive (§3).

**L4-M3 "What might have been" (12).** Owns the counterfactual as a system and the regret frames.
It sits third because it is the debt L3-M4 left, and because M5's hedging about the PRESENT would
collapse into it if the two ran adjacent in the wrong order. It is nearly free of new keys and is
the level's purest shape module.

**L4-M4 "Persuading" (13).** Owns the concessive — तरी after a clause, असलं तरी, तरीही — plus the
case-making markers खरं तर, नक्कीच, मान्य आहे and the -पेक्षा comparative in an argument. It sits
before M5 because holding ground and giving it are separate acts and the harder one should not be
taught inside the softer one's module.

**L4-M5 "Disagreeing well" (13).** Owns the suppletive negative paradigm (आहे → नाही, होतं →
नव्हतं, असतं → नसतं, असेल → नसेल) and the नाही-fronting that softens (मला नाही वाटत against मला वाटत
नाही). Hedging itself is almost entirely owned material (कदाचित L3-M3, असेल L3-M4, जरा L2-M1). It
sits fifth because it is the level's register test and needs M4's पण-and-concession vocabulary
behind it.

**L4-M6 "Before and after" (13).** Owns -ल्यावर, -ताना, -पर्यंत, -पासून, जोपर्यंत … तोपर्यंत,
आधीच, अजून … नाही — and the perfect (§3). It sits sixth because the second half of the level (a
trip, a past life, a story) cannot be told without time clauses, and it is the emptiest seam in the
level: every ending and every correlative came back `free`, and so did दिवस, आठवडा, महिना, वर्ष and
तास.

**L4-M7 "Official talk" (13).** Owns the passive in its Marathi announcement shape (करण्यात
येते/येईल), -ण्यास मनाई आहे, बंद/सुरू राहील, उपलब्ध आहे, the notice optative -आवे, and the formal
lexis (कार्यालय, क्रमांक, सूचना, प्रवासी, रांग, अर्ज). It sits seventh, after the shapes and before
the assembly modules, and it is the one module whose comprehension is easier than its production.

**L4-M8 "Back then" (14).** Owns the past habitual -आयचो/-आयची/-आयचे and the then/now contrast; the
past state is L3-M3's होतं doing a job no module had asked of it. It sits eighth because it is an
assembly module with one hard ending, and because it must run after M3 so an author cannot confuse
"used to go" with "would have gone".

**L4-M9 "Places and journeys" (14).** Owns -हून and the journey verbs (निघालो, पोहोचलो, उतरलो,
चढलो) and nothing else — L2-M4 owns every direction word. It sits ninth as the last assembly module
before the narrative one.

**L4-M10 "A story with a twist" (14).** Owns nothing but अचानक. Six sentences, one quoted line, the
whole ladder underneath. It sits last for the reason every M10 does.

## The seams checked, and the four where the first instinct was wrong

Every claim in every INDEX SEAM note was run through `npm run content:owner`. Four came back
against expectation, and all four are recorded in the briefs so the authoring waves inherit the
correction rather than the instinct.

1. **`अर्ज → free`.** `docs/50` §4 and the shipped L3-M8 brief both list अर्ज among that module's
   fresh keys ("भाडं, बिल, फॉर्म, अर्ज, सही, कागद, पावती, बँक … are fresh keys"). It was briefed and
   never authored into a row. `फॉर्म`, `बिल`, `भाडं`, `सही`, `पावती`, `बँक` and `कागद` all came back
   `L3-M8`; अर्ज alone came back `free`. It is L4-M7's now.
2. **`भरलं → L2-M5`, `भरला → L2-M5`, `भरली → L2-M5`, `पोट → L2-M5`.** docs/50 §4 assigns भरणे to
   "L2-M8's row (पोट भरलं)" and the L3-M8 brief repeats it. The index says the whole family is
   **L2-M5's** — Food and hosting, where पोट भरलं actually belongs. Nothing shipped is wrong; the
   BRIEF was wrong about where the row lives, twice, and a third repetition would have put an L4
   note in front of a learner naming the wrong module.
3. **`असं → L3-M3`, not L3-M5.** The L3-M5 brief lists असं among its fresh keys ("म्हणाला/म्हणाली/
   म्हणाले, विचारलं, असं are fresh keys"). L3-M3 got there first with तसं/असं in the opinion frame,
   and first occurrence wins. L4-M10's quoted-line device points at L3-M3's row.
4. **`पेक्षा → free`, while `माझ्यापेक्षा → L2-M9` and `सगळ्यात → L2-M9`.** L2-M9 is the comparison
   module, so "पेक्षा is owned" is the natural assumption. docs/50 §4 predicted this ("bare पेक्षा
   did not [stand free]") and the index confirms it: only the fused pronoun form was bought, so
   त्यापेक्षा and यापेक्षा are unspent single-token keys for L4-M4.

And the two seams that are traps rather than surprises — both are homographs where first occurrence
wins and a later row would be unreachable:

- **`जायचं → L2-M4`, `जायचा → L2-M4`, `जायची → L2-M4`.** L2-M4-S01 owns जायचं with जायचा and जायची
  as its `forms` and the note "The -आयचं shape of जाणे (L1-M6's family), used with no subject:
  कसं जायचं? asks how one gets there, not how YOU get there." L4-M8's past habitual uses the SAME
  spelling for a different job, so a learner tapping ती रोज शाळेत जायची would be shown an
  impersonal note that is false of the sentence in front of them — the का bug of review 08
  correction 4, exactly. `जायचो → free` and `जायचे → free`, so मी जायचो and ते जायचे are safe and
  **ती जायची is not**: M8 shows the feminine cell on another verb. Every other verb's -आयच forms
  are unspent (करायचो, यायची, खेळायची, राहायचो, असायची, शिकायचो, बघायचो all `free`), so the ending
  is taught on those. See Q99.
- **`करू → L2-M6`,** whose row reads "करणे's -ऊ cell, the shape the suggestion frame needs" with
  जाऊ/येऊ/भेटू as forms. L4-M1's negative imperative करू नका re-uses that surface for a second job,
  so `नका → free` is the fresh key and its note must be self-sufficient about the pair. करू is not
  re-taught.

## What L4 deliberately defers to L5

- **The passive as a productive system.** L4-M7 teaches the announcement frames and the learner
  reads them; building a passive at will is L5-M4 "Formal occasions" and L5-M6 "Arguing a
  position", where a learner has a reason to produce one. Deferring it keeps M7 honest about being
  a listening module.
- **The Hindi-shaped passive (केला जातो).** It exists in Marathi and is not the announcement
  register. L4-M7 names it in `usage` as the shape a Hindi speaker will build, and no display uses
  it. Which register does use it is a native-pass question (Q97).
- **काश and the one-word "if only".** L4-M3 teaches … असतं तर बरं झालं असतं and names the gap;
  anything more figurative is L5-M1 "Sayings and idioms".
- **Irony, sarcasm and implication.** L4-M5 softens by hedging and by negating gently. Saying the
  opposite of what you mean is L5-M7 "Between the lines", and an L4 module that reaches for it has
  misread "soften, hedge, save face".
- **Regional and generational variation.** L4 speaks one Pune-standard variety throughout, as L1–L3
  did. L5-M3 "How they say it there" owns the variation, and no L4 module may pre-empt it with a
  "some speakers say" line in a display.
- **The past continuous as a system.** docs/51 Q89 flagged दुखत होतं as used-but-untaught at L3-M7.
  L4 does not open it either: L4-M6's -ताना covers *while*, L4-M8's -आयचो covers *used to*, and
  neither needs it. It stays an open debt with a named home in L5. See Q100.
- **बोललो** (docs/15 Q29) stays pinned, untouched by L4-M10's quoted line.

## Open questions for a native pass — L4 briefs

The gate is unmet on this course as on every other, and these are brief-level questions: they are
about what the level PLANS to teach, and each will be re-asked of the authored content.

97. **The announcement passive.** The briefs make करण्यात येते / करण्यात येईल the L4-M7 shape and
    treat केला जातो as the Hindi-shaped alternative that a sign does not use. Confirm that a Pune
    station, a municipal notice and a bank counter all use the -ण्यात form, and say where केला
    जातो IS the natural Marathi — newspaper prose, spoken narration, neither?
98. **The perfect at L4-M6.** मी आधीच जेवलो आहे and मी अजून जेवलो नाही are shipped as the two
    frames that carry *already* and *not yet*. Is आधीच with the perfect what a speaker says, or is
    the bare past (मी आधीच जेवलो) the ordinary form, with the perfect marked?
99. **The past habitual against L2-M4's जायचं.** L4-M8 avoids ती जायची because L2-M4 owns the
    spelling for the impersonal कसं जायचं?. Are these genuinely the same ending doing two jobs, or
    two endings that happen to be spelt alike — and would a native reader of L2-M4's note find it
    false of a past habit?
100. **मी against मला in the नको होतं frame.** L4-M3 writes मी तिथे जायला नको होतं. Is मला तिथे
    जायला नको होतं equally ordinary, is one of them regional, and does the choice change the
    meaning (I shouldn't have gone / I didn't want to go)?
101. **तरी after a past-shaped clause.** पाऊस आला तरी मी येईन is shipped as the everyday
    concessive. Confirm the clause takes the past form for a future condition, and confirm महाग
    असलं तरी is the ordinary "although it is".
102. **The fronted नाही.** L4-M5 teaches मला नाही वाटत as the softer, more spoken twin of मला वाटत
    नाही. Confirm the softening, and confirm it is available with verbs other than वाटणे.
103. **-हून against -पासून.** L4-M9 splits them as source-of-motion against one-end-of-a-stretch
    (मी पुण्याहून आलो · घरापासून स्टेशनपर्यंत). Is पुण्यापासून आलो simply marked, or wrong, and
    does a Pune speaker ever say तिथपासून for तिथून?
104. **The notice optative -आवे.** कृपया रांगेत उभे राहावे is shipped as a shape the learner reads
    and never produces. Is that the right fence, and is राहावे or राहावं what a Pune notice
    actually prints?
105. **पण, and the fact that thirty modules did without it.** The index says the course has never
    taught *but*. Read L1-M10, L2-M6 and L3-M10 and say whether any of those accounts reads as
    evasive for lacking it — and whether L4-M2 is late.
106. **The level's seven new endings** (-ण्यासाठी, -मुळे, -ल्यावर, -ताना, -ण्यात, -आयचो, -हून) are
    each briefed as one welded word against a Hindi phrase. A native pass should confirm each
    welding is real and that none of the seven is a spelling this course would write differently
    (राहायचो/रहायचो, जेवल्यावर/जेवल्या नंतर).
