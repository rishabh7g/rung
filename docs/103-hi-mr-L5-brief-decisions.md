# hi-mr L5 — the authoring-brief decisions (#550)

The ten hi-mr L5 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['hi-mr']` L5-M1…L5-M10) are the
first L5 briefed in any course, and the last level in the product: **nothing here may defer.** Every
seam below was pinned against the REAL cumulative index, read through
`npm run content:owner -- hi-mr <surface> …` on **2026-09-08**, which folds the delta files in
`public/content/hi-mr/index/` and reports:

> `808 surfaces owned, folded over 39 modules through L4-M9`

`public/content/hi-mr/index/L4-M9.json` carries `surfaceCount: 808, maxSpan: 1`. The ladder underneath
this level is therefore **larger than the brief for it assumed**: L1 closed at 222, L2 at 441, L3 at
633, and the L4 authoring wave running today had already shipped L4-M1…L4-M9 into `content/` AND into
the built index (650 at L4-M1, 717 at L4-M5, 808 at L4-M9) while these briefs were being written.

**The index moved once during the wave, and the seams were re-checked against the new one.** L4-M10
was authored and rebuilt mid-session, and `content:owner` then reported
`809 surfaces owned, folded over 40 modules through L4-M10` — L4-M10 spent **exactly one** surface,
`अचानक → L4-M10`, which is what its brief budgeted and what L3-M10 did before it. Every
free-key claim in the ten briefs and in this note was re-run against the 40-module fold and every one
still holds; `अचानक` was treated as SPENT from the start and no L5 module wanted it.

`maxSpan` is still **1**. Ten modules of L4 did not change it, and L5 does not either.

The level also inherits the review chain: docs/08 open questions 1–22, docs/15 23–30, docs/19 31–40,
docs/23 41–48, `docs/49` 49–70, `docs/51` 71–96, and `docs/85` 97–106. The questions at the end of
this note continue at **107**.

## 1. Language of fields — unchanged, field for field

`rules[].text` and word `note` in English; every learner-facing line in Hindi in Devanagari (`cue`,
`trap`, `sound`, `variations[].changed`, `mistake.why`, `usage`, `mnemonic`); `glossEn` on every
sentence; `literal` wherever word order or a gender decision moves. docs/26 §1, docs/50 §1 and
docs/85 §1 all declined to revisit this and so does L5.

docs/85 §1 added one thing for a level whose central shape is TWO tokens and therefore owns no index
key: the explanation must be carried by `rules[]` and by the sentence's `literal`. **L5 needs that
addition in four modules, not one** — L5-M1 (the figurative reading of a body word owned by L3-M7),
L5-M7 (`नंतर बघू`), L5-M9 (`V-त + होता`) and, in the reverse direction, L5-M2 (the welded clitic
`च`, which owns a key only as part of a host word). Each brief says so in its own words.

## 2. Register — three modules about it, and the exit that breaks it

L2-M1 settled when तू and when तुम्ही; #422 gave the तुम्ही + -आ and कृपया tier its own `formal`
chip; L3 applied it; L4-M7 added a register the learner HEARS and does not speak. L5 is the level
where register stops being a setting and becomes the subject:

- **L5-M2 is the तू tier as a social act.** Banter and the तू register are one choice, not two, and
  the module's vocatives (अरे / अगं, रे / गं) only exist inside it. It also owns the fence: the
  three rooms where the register is wrong.
- **L5-M3 says out loud what L1–L4 never did — that the course teaches ONE variety.** It follows
  L4-M7's law exactly one level on: the learner PRODUCES Pune standard, the variant lives in
  `usage` and in the comprehension pool, and a dialect spelling this module ships (हाय, नाय) is
  owned by it forever and never appears in another module's display.
- **L5-M4 is the ceremonial tier,** which is not L4-M7's counter formality: an announcement is
  impersonal, a condolence is addressed. Both chip `formal` and the briefs say why that is not a
  contradiction.
- **L5-M10 is the only item in the product that legitimately carries TWO registers,** switching
  once, at a nameable point, for a nameable reason. Every M10 below it closed on holding one
  register; this one closes on breaking it on purpose, which is only an exit because the law
  existed first.

## 3. What L4 withheld, and where it lands

`docs/85` "What L4 deliberately defers to L5" named seven items. This is the last level, so each
one either has a module here or is a hole. Six land; one cannot.

- **The passive as a productive system → L5-M4 and L5-M6**, split by register and NOT by difficulty.
  L4-M7 owns `करण्यात` and `देण्यात` and teaches them read-only. **L5-M4 makes the -ण्यात passive
  productive** (कार्यक्रम आयोजित करण्यात आला आहे, श्रद्धांजली वाहण्यात आली), because a ceremony is
  the one occasion an ordinary person produces one. **L5-M6 owns the impersonal passive of claim**
  (असं मानलं जातं, असं म्हटलं जातं) — see §5, it is the level's largest finding.
- **The Hindi-shaped passive (केला जातो) → answered at L5-M6, in the neuter only.** docs/85 Q97 asked
  where केला जातो IS natural Marathi. The briefs now give half the answer from the grammar side: the
  announcement register wants -ण्यात, the impersonal-claim register wants जाणे, and Hindi merges them.
  The other half stays a native-pass question, re-asked as Q107.
- **काश and the one-word if-only → L5-M1.** Marathi answers it with a FRAME
  (… असतं तर किती बरं झालं असतं) and with नशीब / देवाची इच्छा, not with a word: `काश → free` and the
  brief tells the author to name it in `usage` and NOT buy it as a row.
- **Irony, sarcasm and implication → L5-M7**, with a product constraint attached that no lower level
  had to state: this course has no audio, so a sarcastic display must be disambiguated in text every
  time — situation in the `cue`, surface reading in `literal`, intended reading in `usage`.
- **Regional and generational variation → L5-M3**, comprehension-first (§2).
- **The past continuous as a system → L5-M9.** docs/51 Q89 flagged `दुखत होतं` used-but-untaught at
  L3-M7; docs/85 declined it for L4 and said it had "a named home in L5" **without naming a module**
  (and its cross-reference points at Q100, which is about मी against मला — a stray reference, left
  as it stands). This note names the module. It is L5-M9 for a reason that is not scheduling:
  retelling is the only job on the ladder that needs a BACKGROUND against which events happen.
- **बोललो (docs/15 Q29) — THIS ONE LANDS NOWHERE, and cannot.** `बोललो → free` still, at 808
  surfaces. L1-M9 shows it (`मला राग आला, म्हणून मी बोललो नाही`) and no later module can retro-own
  it: `L2-M7.json`'s own rule already records why — "a module's index is cumulative through itself
  only". L5 does not pay this debt and must not pretend to. **It is a hole with a known cause and
  exactly one fix, an edit to L1-M9, which "a level never edits a file below it" forbids.** The
  honest statement at the top of the ladder is that it is closed by construction, not outstanding.
  See Q113.

## 4. Forms and seams — the single-token law at the top of the ladder

`maxSpan: 1`, unchanged through 39 modules. The brief template asks which multi-token phrases should
index WHOLE so their parts stay unspent; **for hi-mr the answer is still none, because the course has
no multi-token surfaces**. At L5 that costs more than at L4, because more of this level's content is
a FRAME:

- **Every fused form is its own key.** Each -पणा and -ता derivative (M5), each -ण्यात form (M4), each
  -च्या form (M1) and each welded-च word (M2) is a separate row deconstructed where it first appears,
  with its note pointing back at the base. Bare पणा, bare ता and bare च never stand free and get no
  key, exactly as bare मुळे, bare पेक्षा and bare चा do not. **There is a precedent for the clitic
  and it was checked: `आत्ताच → L1-M3`.** One welded-च word has been a key in this course since L1.
- **Four frames own nothing.** L5-M1's figurative reading (डोकं खाणे — डोकं is L3-M7's), L5-M7's
  नंतर बघू (नंतर is L1-M4's), L5-M9's V-त + होता (होता is L3-M3's) and L5-M6's असं मानलं जातं
  (असं is L3-M3's) are all unindexable as frames. §1's addition covers them.
- **A learner tapping a word inside an idiom gets the literal note.** That is the structural fact of
  L5-M1 and it cannot be engineered away at this level, because first occurrence won at L3-M7.

Shared lexemes are assigned up front so no two L5 modules can claim one:

- **आयुष्य is L5-M4's** (a toast wishes a long one, and M4 runs before M5); M5 re-shows it.
- **अर्थ is L5-M8's** (याचा अर्थ काय? is that module's frame); M5 re-shows it.
- **म्हणतात is L5-M3's** if that module ships first (…पण म्हणतात), with M8's याला काय म्हणतात? and
  M9's असं म्हणतात pointing back; the authoring order decides and each row says so.
- **शब्द is L5-M3's** (dialect vocabulary), re-shown at M8.
- **मात्र and म्हणजे are L5-M6's** — see the seams section; neither is owned by L4-M2 despite that
  module's brief.
- **छान is L1-M9's already,** which matters because both M2 (ironic praise) and M7 (sarcasm) want it;
  neither buys it.
- **म्हण is L5-M1's as a NOUN,** and that decision closes a spelling for the rest of the product.

## 5. जातं — the finding that decided the passive

`npm run content:owner -- hi-mr जातो जाते जातात जात` says:

```
जातो	L1-M4
जाते	L1-M4
जातात	free
जात	free
```

**The passive auxiliary is already owned in the masculine and the feminine, and only in those.**
L1-M4 "My day" bought जातो and जाते as the motion verb — मी रोज ऑफिसला जातो. First occurrence wins,
so a passive written in either of those cells (तो केला जातो, ती केली जाते) hands the learner a
goes-every-day note underneath the auxiliary of a passive: the `का` bug of review 08 correction 4,
repeated at the top of the ladder instead of the bottom.

The neuter cell is unspent: `जातं → free`, and so is the plural `जातात → free`.

So **L5-M6 builds the impersonal passive in the NEUTER ONLY** — असं मानलं जातं, असं म्हटलं जातं —
and no personal passive is written anywhere in this course. The constraint and the pedagogy agree,
which is the whole reason to accept it rather than work around it: an impersonal claim needs no other
cell, and a case-making module has no use for तो केला जातो. `मानलं → free` and `म्हटलं → free` both
confirmed.

This also settles a question the level would otherwise have argued about: whether L5-M4 or L5-M6
"owns the passive". Neither does. **L5-M4 owns the -ण्यात passive made productive; L5-M6 owns the
जाणे passive in one cell.** They are different constructions in different registers and the index
forced the split before pedagogy got to it.

## The shape of the level

- **Bounds do NOT climb monotonically, and this is the level's one departure from the docs/48 §B3
  ramp.** §B3 sets L5 at 14 → 16. The ceiling is honoured (16 appears, twice) and the floor is
  broken once, downward, on purpose:
  - **M1, M2, M3, M9, M10 at 14.** An idiom is short by nature and the sentence around it is
    ordinary (M1); banter is short turns and a funny line that needs sixteen words is not funny
    (M2); M3's whole content is a MINIMAL PAIR and length would hide the contrast; M9's retelling
    sentences are narrative and L3-M10 ran its account at 12 and L4-M10 at 14; M10 applies the bound
    inside the piece, where the switch and not the length is the exit.
  - **M5 at 15 and M8 at 15.** An abstract claim needs room for a nominalisation plus its
    qualification (M5), and a paraphrase is structurally the longest ordinary sentence in the level —
    a relative clause plus its main clause with a resumptive between them (M8). Neither needs 16: a
    16-word abstract sentence stops being testable in a 12-item pool.
  - **M4 and M6 at 16.** These are the two places the ceiling earns itself. A condolence and a vote
    of thanks are genuinely long sentences and the register IS the length (M4); a claim plus its
    ground plus a concession is three clauses (M6).
  - **M7 at 13, BELOW L4's ceiling, and it is the argued one.** Implication works by saying LESS. A
    hint that needs fifteen words is not a hint, it is an explanation. This is the only bound in the
    product that goes down at a level boundary, and it is a pedagogical claim, not an oversight:
    if a native pass disagrees, raise it (Q112).
- **`newWordCap` stays 25 everywhere,** as at every level (PRD §5). It was tempting to lower it on
  M7 and M10, and the argument against is that the cap is a CEILING the validator enforces and not a
  target it can read: a brief that sets 5 turns an author's sixth reasonable word into a build
  failure, where a note that says "spend nothing" turns it into a rewrite. So the real budget is
  stated per module in the notes instead — **M4 is the vocabulary module of the level and its 25 is
  real; M6 and M8 spend a middling amount; M1, M2, M3, M5, M7 and M9 spend under ten; M10 targets
  ZERO with a ceiling of one,** named in advance here if it takes it.
- **M10 is EIGHT sentences,** as L3-M10 was and L4-M10 was not (docs/48 §4 kept L4-M10 at six on
  purpose). The per-sentence bound applies inside the piece.
- Pools are authored to 12, the course's shipped size (#305).

## A section per module — what it owns, and why it sits where it does

**L5-M1 Sayings and idioms** owns the two-category split — the वाक्प्रचार, which inflects on its
light verb, against the म्हण, which is quoted whole and never bends. It sits first because it is the
only L5 module that adds no new syntax: it is a lexical layer over an existing ladder, and it is the
gentlest way into a level about voice. It also takes काश's landing.

**L5-M2 Humour and teasing** owns the particle-and-vocative layer (अरे / अगं, रे / गं, welded च) and
the तू tier as a social act. Second because banter is the first thing a learner is exposed to
socially and the first place they get the register wrong; and because it must run BEFORE M7, so that
overt play is established before covert implication.

**L5-M3 How they say it there** owns variation as a controlled set — one coastal pair, one honorific
spread, one generational contrast — and the sentence that says the course has been teaching one
variety. Third because it re-frames everything below it, and after it the learner reads the rest of
the level knowing what its displays are.

**L5-M4 Formal occasions** owns the productive -ण्यात passive and the ceremonial optative -ओ, and it
is the vocabulary module of the level. Fourth because it is the first module whose sentences the
learner must produce EXACTLY, and because M6 needs the passive already broken open.

**L5-M5 Big questions** owns nominalisation: -पणा, -ता, and the verbal noun as subject, plus the
generic माणसाने + obligative. Fifth because it supplies the nouns M6 argues about — you cannot make
a case about समानता before you can say समानता.

**L5-M6 Arguing a position** owns discourse scaffolding (पहिलं म्हणजे, याउलट, दुसरीकडे, अर्थात,
मात्र, थोडक्यात) and the impersonal passive of claim in the neuter. Sixth, directly after M5, because
it is M5's content put under pressure.

**L5-M7 Between the lines** owns the indirect request (-आल + का), the deferral that means no
(बघू, असू दे, राहू दे) and the ironic frame. Seventh because it depends on M2 (the overt/covert
division only makes sense once overt exists) and on M4 (a learner must know the formal tier to hear a
formal sentence used ironically).

**L5-M8 When words run out** owns the relative clause जो/जी/जे … तो/ती/ते, the metalinguistic frames
and the repair frames. Eighth, and its lateness is a deliberate cost: it is the most USEFUL module in
the level and would serve the learner best at position one. It sits here because the relative clause
is the level's only genuinely new syntactic system and M9's retelling is the first job that can use
it for something other than paraphrase. A native pass should challenge this (Q111).

**L5-M9 Telling it your way** owns the imperfect V-त + होता — the docs/51 Q89 debt — the storyteller's
frames, and honorific-plural narration. Ninth because it is the assembly module: everything from M1's
idioms to M8's relative clause can appear inside a retelling.

**L5-M10 Your own voice** owns nothing and that is its definition. Eight sentences, one register
switch, zero new words, and no level below to defer to.

## The seams checked, and the five where the first instinct was wrong

1. **`जातो → L1-M4`, `जाते → L1-M4`, `जातं → free`.** The whole of §5. The first plan had L5-M6
   teaching the passive as a paradigm; the index made two thirds of the paradigm unwritable and the
   remaining third turned out to be the only cell the module needed.
2. **`मात्र → free` and `म्हणजे → free`.** Both are listed as fresh keys in the SHIPPED L4-M2 brief,
   and neither was authored into a row — the L4 wave bought पण, त्यामुळे, फक्त and सुद्धा and stopped.
   This is exactly the `अर्ज → free` pattern docs/85 recorded at L3-M8, now confirmed twice more:
   **a brief's claim is not an index entry.** Both go to L5-M6.
3. **`महत्त्वाचं → L3-M8`.** The word L5-M5 wants most is owned by Money and paperwork, which bought
   it for an important document. Re-show, do not re-open. In the same family: `राग → L1-M9` and
   `मजा → L1-M9` (L5-M2's two most obvious words, both bought at L1), `भाषा → L1-M1` (L5-M3's, bought
   by the very first module for which languages do you speak), and `दुःख → L3-M6` (L5-M4's).
4. **`इकडे → free`, `तिकडे → free`, while `इथे → L2-M4` and `तिथे → L2-M4`.** The -कडे pair LOOKS
   like a set of forms of L2-M4's rows and was nearly written off as owned. It is not: they are
   separate single-token keys, and L5-M3's rows must say they stand beside L2-M4's, or a learner taps
   इकडे in a dialect module and is shown a route note.
5. **`समजलं → L4-M3` and `गेला → free`.** Two in opposite directions. The regrets module bought
   *understood*, so L5-M8's most obvious word is owned and its unspent twin (`कळलं → free`,
   `कळत → free`) is what M8 actually buys. And `गेला` — the masculine third-person past of जाणे, the
   single commonest verb form in any retelling — has **never been taught in 39 modules**: L1-M5 bought
   गेलो and गेले, L3-M10 bought गेली, and गेला was missed by all three. L5-M9 buys it.

Also checked and confirmed rather than assumed, because a first draft leaned on each:

- `गोष्ट → L3-M3`, and its row already reads *"A thing said, a matter — and a story"* with a forward
  pointer to L3-M10. **No collision** — the fear was a `का`-style bug at L5-M9 and the row was written
  honestly two levels ago. Re-show it.
- `तो / ती / ते → L2-M2`. L5-M8's resumptive pronoun is L2-M2's row and its pronoun note is TRUE of
  the resumptive use, so the relative clause costs only its j- member.
- `जेव्हा → L4-M6`, `तेव्हा → L4-M6`, and every j-/t- NOMINAL correlative free. The system is exactly
  half taught: L4-M6 bought the temporal pair and no module bought the nominal ones. L5-M8's rows
  point at L4-M6's as the shape the learner already knows.
- `दुखत → L3-M7` and `बोलत → L2-M7` — the two -त stems a first draft of L5-M9 reached for are both
  owned, with a body note and a phone note. Teach the imperfect on करत / जात / राहत / पडत instead.
- `आत्ताच → L1-M3`, which is why L5-M2 can treat a welded-च word as a key without inventing a rule.
- `पेक्षा → free` still: L4-M4 bought only `त्यापेक्षा`, exactly as docs/85 §"seams" item 4 predicted
  it would, so bare पेक्षा is available to L5-M6 if a comparison is wanted.
- `मते → L3-M3` and `माझ्या → L2-M2`, so L5-M5's माझ्या मते costs nothing and, at `maxSpan: 1`, owns
  nothing either.
- `साहेब → free`, `नवीन → free`, `बदललं → free` — three more L4 brief claims that did not ship.
  `नेहमी → L4-M5`, not L4-M8, which is where its brief claimed it. Re-run the query, always.
- `करण्यात → L4-M7`, `देण्यात → L4-M7`, `खिडकी → L4-M7`, `गाव → L4-M8`, `शहर → L4-M8`,
  `तिथून → L4-M9`, `प्रवास → L4-M9` — the L4 wave's rows ARE in the index and L5 must not re-open them.

## What L5 does not teach at all

This is the last level, so a shape left out here is left out of the product. Three are, and they are
named as scope decisions rather than deferrals:

- **The personal passive** (तो केला जातो with a real subject). §5 makes it unwritable without breaking
  a learner's word note, and the register that uses it is a newspaper register a learner does not need
  to produce. Out of scope, not deferred. See Q107.
- **The causative** (-व-: करवणे, बसवणे). No module below it opened it and no L5 job needs it. It has
  never had an owner at any level and this note is the first to say so. Out of scope. See Q108.
- **The compound verb / vector construction** (खाऊन टाकलं, बघून घे). Genuinely everyday Marathi, and
  genuinely absent from all 39 authored modules — L4-M1's -ऊन is the CHAIN, not the vector. Out of
  scope for the five-level product, and the largest single thing a sixth level would open. See Q109.
- And **बोललो** (§3), which is a hole rather than a scope decision, because it was shipped and missed
  rather than declined.

## Open questions for a native pass — L5 briefs

The gate is unmet on this course as on every other, and these are brief-level questions: they are
about what the level PLANS to teach, and each will be re-asked of the authored content.

107. **The two passives, and whether the split is real.** The briefs give L5-M4 the productive -ण्यात
     passive (श्रद्धांजली वाहण्यात आली) and L5-M6 the जाणे passive in the neuter only
     (असं मानलं जातं), on the claim that the announcement/ceremony register takes one and the
     impersonal-claim register the other. This is docs/85 Q97 asked from the other side. Confirm the
     division, and say whether a Marathi speaker ever says तो केला जातो in ordinary speech — because
     if they do, the product now declines to teach a live construction.
108. **The causative, absent from 39 modules.** करवणे / बसवणे / शिकवणे have no owner anywhere on the
     ladder. Is शिकवणे in particular (to teach) a word a learner reaches L5 without, and does its
     absence read as a gap in L3-M2 Work and study rather than in L5?
109. **The vector construction.** खाऊन टाकलं, बघून घे, सांगून टाक. The five-level product does not
     teach it. Is that survivable, or is a learner who never uses a vector audibly foreign in a way
     the whole of L5 is supposed to fix?
110. **-पणा against -ई, and against -त्व.** L5-M5 ships चांगुलपणा and names Hindi's -ई (अच्छाई) as the
     productive suffix that fails in Marathi. Confirm चांगुलपणा rather than चांगलेपण or चांगुलपण, and
     say whether -ता (समानता) reads as formal or merely as Sanskrit-borrowed.
111. **L5-M8's position.** The relative clause and the ask-what-it-means frames are the most useful
     content in the level and they sit eighth of ten. A learner who never finishes the level never
     gets them. Should M8 move earlier — and if so, does M9's retelling lose anything by having the
     relative clause available two modules sooner?
112. **The bound at L5-M7.** Thirteen words, below L4's ceiling, on the claim that implication works
     by saying less. Read the indirect requests and the deferrals: is a Marathi hint actually shorter
     than a Marathi statement, or is that an English intuition?
113. **बोललो, one last time.** docs/15 Q29 pinned it at L1-M9 and the index still says free at 808
     surfaces. This note declares it closed by construction. Confirm that a learner meeting
     मी बोललो नाही at L1-M9 with no row under it is a real defect and not a cosmetic one — and if it
     is real, it is an L1-M9 edit and needs its own issue, not an L5 wave.
114. **The gendered vocative.** L5-M2 makes अरे/रे against अगं/गं the module's `mistake`, on the claim
     that it is the highest-frequency slip a Hindi speaker makes in banter. Confirm the frequency, and
     say whether अरे to a woman reads as rude, as rural, or merely as foreign.
115. **हाय and नाय.** L5-M3 ships one coastal minimal pair as comprehension-only. Are these the right
     two forms to represent a variety with, or does a Pune learner more often meet Varhadi or
     Marathwada speech — and is a single named variety honest, or does the module need to say
     "one of several" and show none?
116. **बघू as a refusal.** L5-M7 teaches बघू / नंतर बघू as the yes-shaped no. Confirm it declines
     rather than genuinely defers, and say whether a speaker hearing it from an elder reads it
     differently from one hearing it from a peer.
117. **म्हण as a noun, and the imperative it closes.** L5-M1 takes म्हण as *proverb*, which locks the
     spelling and forbids the bare imperative म्हण in every later display. Is the bare imperative
     म्हण something a speaker actually says (म्हण बरं), and does closing it cost the product anything?
118. **The register switch at L5-M10.** The exit asks for one motivated switch inside eight sentences.
     Is there a real situation a Marathi speaker would recognise where the switch happens THAT fast —
     and is the counter-clerk-turns-out-to-be-a-neighbour scenario the briefs suggest a real one, or a
     writer's device?
