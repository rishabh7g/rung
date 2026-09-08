# hi-en L5 — the authoring-brief decisions (#566)

The ten hi-en L5 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['hi-en']` L5-M1…L5-M10) are
written the day L4 closed. Every seam below was pinned against the REAL cumulative index — the
fold of `public/content/hi-en/index/L1-M1.json` through `L4-M10.json`, read on **2026-09-08** with
`npm run content:owner`, which reported

> `1055 surfaces owned, folded over 40 modules through L4-M10`

and a **`maxSpan` of 4**, computed over the same fold and set by three keys and no more:
`if i were you` (L3-M4), `on the other hand` (L4-M4) and `i am not sure` (L4-M5). Not 802, which is
what L4 was planned against (`docs/88`), and not a remembered figure.

**The fold moved under this wave and the numbers above are the ones that count.** The first checks
of the morning came back `913 surfaces … through L4-M5`, the middle ones `1026 … through L4-M9`,
and the level settled at 1055 when L4-M10 landed. Every claim in §3 was re-run against the final
40-module fold before it was written down, including the L5-M1 batch, which was first checked at 39.
A brief in this repo has been wrong about the index before by quoting a number it read once
(`docs/88` §3.1(3), and en-ru's L3-M5 before that); the rule this wave adds is that a fold read
while eight sibling agents are authoring is a reading, not a fact, and must be taken again at the end.

The review chain the level inherits is `docs/39` (spoken English for Hindi speakers), `docs/27`
(register), `docs/63` (L2), `docs/79` (L3), `docs/88` (the L4 brief decisions) and `docs/97` (the
L4 review). **The open-question chain ends at 90, not at 62.** `docs/88` §6 ends at 62 and the
issue text points there, but `docs/97` continued the same chain to 90; numbering from 63 would have
collided with sixteen live questions. §6 below starts at **91**.

This note records the decisions the briefs are written to, so the authoring waves inherit them
without re-deriving anything. The briefs repeat each decision in the module notes, because a prompt
only ever shows an author the notes.

## 1. This course's asymmetry at L5 — the delta stops being a register and becomes a CHOICE

`docs/71` §1 stated hi-en's inversion — the target is English, so the interesting facts are what
English FORBIDS where Hindi allows it — and `docs/88` §1 recorded that at L4 the delta stopped being
a FORM (`*I am knowing`, `*informations`) and became a REGISTER: correct sentences that land wrong.

At L5 it moves once more, and the move decides the level's shape. **What is left is not a set of
errors at all. It is a set of CHOICES the learner does not yet know they are making.** Six of the
ten modules carry one:

- **Which phrase, out of several correct ones** (M1). `It was very easy` and `It was a piece of
  cake` are both correct; only one of them sounds like a person. Nothing here is a mistake, and the
  module's whole content is when each is used.
- **Whether to joke at all** (M2). The three places an English-speaking room refuses a joke that a
  Hindi-speaking room accepts — deadpan delivery, personal remarks about weight and marriage and
  salary, and seniority unmarked by any pronoun — are not grammar and cannot be corrected. They can
  only be told.
- **Which variety to stand in** (M3). `lift` or `elevator`, `colour` or `color`, and — the one that
  matters to this learner — Indian English or not. The rule is CONSISTENCY rather than correctness,
  and this course's standing instruction applies at its strongest: Indian English is named as
  MARKED outside India, never as wrong (`docs/88` §1).
- **How short to be** (M4). The module's counter-intuitive finding, and the reason its bound goes
  DOWN: English ceremonial language is SHORTER and plainer than Hindi ceremonial language. The
  learner reaches for Latinate vocabulary and long balanced sentences and produces exactly the
  marked official register L4-M7 named.
- **How much to leave unsaid** (M7). English is more indirect when requesting and more DIRECT when
  refusing; a Hindi speaker inverts both, producing a bald request and an evasive refusal. `I will
  try` and `let's see` are heard as commitments, and the appointment goes in the diary.
- **Which register, and when to change it** (M10). Hindi carries register on the pronoun and the
  verb ending; English has one `you`, so the learner moves the switch they have and nothing happens.

The rule the briefs take from this: **at L5 a `mistake` row is the exception rather than the spine.**
Most of the teaching lands in `usage` and in `rules[].text`, because most of what is being taught is
an audience fact rather than a grammar fact. Two modules keep a hard grammatical spine anyway — M5's
zero article and M8's contact relative clause — and they are deliberately placed so that the level
is not ten modules of etiquette.

Where Hindi HELPS, the briefs say so rather than warning anyway (`docs/71`'s standing instruction),
and at L5 it helps more than at any level below: the learner already knows what an idiom IS (M1),
that dialects exist and that their grandmother's words are not theirs (M3), what a ceremony requires
(M4), what a relative clause does — जो … वो (M8), and what register IS and when to change it (M10).
Five of the ten modules teach only the English shell for something the learner already owns.

## 2. What L4 withheld, and where it lands

`docs/88` §5 named seven deferrals. **This is the last level, so a deferral that lands nowhere is a
hole in the product rather than a job for a later brief.** Six land; one does not, and it is named as
a hole in §5 rather than passed on.

- **Mixed conditionals → L5-M6.** `docs/88` §5 sent them to "L5" without a module. They land in
  `Arguing a position` because an argument about a past decision with a present cost is the first
  job in the course that actually needs `If we had booked earlier, we would be on the train now`.
  M5 was the other candidate and was rejected: M5's spine is the zero article, and a second time
  frame on top of it would cost M5 its rule exactly as it would have cost L4-M3 its own.
- **Causal `since` and causal `as` → L5-M6, and they do not land.** See §5.
- **The experience use of the present perfect → L5-M3.** `docs/88` §5 sent it to "L5" with no owner
  and noted that L4-M8 attracted it. It lands in `How they say it there` because that is the first
  module whose TALK is made of it — `Have you ever been to Lucknow?`, `I have never heard that
  word` — rather than a module that merely tolerates it. It arrives with an index problem attached;
  see §3.1(1).
- **Producing formal writing at length → L5-M4.** Named explicitly by L4-M7 and taken exactly as
  named: M7 taught the learner to READ and ANSWER the official register, M4 is production from the
  first sentence.
- **Sarcasm, irony and implication → L5-M7,** with a split that both briefs state: M2 owns FRIENDLY
  irony that is flagged and immediately defused, M7 owns unmarked implication and sarcasm where
  nothing defuses anything. levels.json puts "irony" in M2's job line and "sarcasm" in M7's, so the
  split is the ratified list's and not this wave's invention.
- **A change of register midway → L5-M10,** which exists for it.
- **The bare official `shall` → nowhere in a display, in any module.** `docs/88` §5 left it to
  "whichever L5 module can afford to re-point L2-M6's row, or never". The answer is NEVER: see
  §3.4.

`docs/97` (the L4 review) added one more, at its question 83 — **`; however,` with a semicolon**,
which L4-M4 left out in favour of `. However,`. It lands nowhere as a taught form either, and is
recorded in §5 as the second, smaller hole.

## 3. Seams — what the index actually said

Every claim in this section was produced by `npm run content:owner -- hi-en "<surface>" …` on
2026-09-08 against the final 1055-surface fold. Five contradicted a first instinct, and those are
listed first because they are the ones that would have shipped a sentence onto a false note.

### 3.1 The five the index corrected

1. **The experience perfect cannot be written the obvious way.** The natural display for M3 is
   `I have been to Delhi`. `content:owner` reports

   > `have been    L4-M7` and `has been    L4-M7`

   — those are the PERFECT PASSIVE keys (`Your application has been received`), and `have → L1-M4`
   is the POSSESSION row (`docs/88` §3.1(3)). So the auxiliary resolves either to a passive note or
   to a note about owning things, and both are false of the sentence in front of the learner. The
   fix is the multi-token policy doing exactly the job it was made for: **M3 indexes `have you ever`
   (3) and `have never` (2) WHOLE**, and every display is written so the auxiliary sits inside one
   of them. `been → L4-M3` and `never → L1-M4` are both swallowed by those keys and neither is
   re-opened. Without this check the level's headline deferral would have landed on a false note in
   its first sentence.

2. **The module called `Sayings and idioms` may not write the word `saying`.**

   > `saying    L2-M7`

   It is the `-ing` form on L2-M7's `say` row, whose note is about reaching a person with `to`
   (`say that to Rohan`). `sayings` in the plural is a separate key and free, but opening it would
   leave an unreachable singular beside it. M1 writes `idiom` and `expression`, both free. This is
   the seam that would have been easiest to miss, because the title itself contains the word.

3. **The relative pronouns are all owned, and only one of them safely.** M8's paraphrase wants
   `the thing which you use`, `a place where you buy medicine`, `the person who cuts your hair`.
   `content:owner` reports `who → L3-M9`, `which → L2-M9`, `where → L1-M7`. Reading the rows
   themselves rather than trusting the ids: L3-M9's `who` is ALREADY the relative (`The people who
   celebrate it are very happy`) and its note even names `which` for things — so `who` is safe and
   is pointed back at. L2-M9's `which` is the CHOOSING question (`Which one is cheaper?`) and
   L1-M7's `where` is the fronted question word, and both notes are false inside a relative clause.
   `that → L1-M9` covers कि and the pointing `that`, not the relative. **So M8 teaches the CONTACT
   relative — no pronoun at all** (`the thing you use to open bottles`), which is what a speaker
   actually says. The index forced the choice and the choice is the better English; this is the one
   place in the level where a constraint improved the module.

4. **`wish` is not free, and a toast is where it bites.** The obvious condolence-and-toast line is
   `I wish you both a happy life`. `content:owner` reports `wish → L4-M3` — the counterfactual row
   of `I wish I had known` — so the learner's tap opens a note about regret at a wedding. M4 uses
   the free plural in `best wishes`, or `congratulations`, and bare `wish` appears in no display.

5. **`quite` is free, although `docs/88` §4 lists it as one of L4-M5's fresh keys.**

   > `quite    free`

   The shipped module did not spend it. Recorded rather than fixed — a level never edits a file
   below it, and `docs/88`'s list is a brief's CLAIM, not the index. The instruction to the L5-M7
   author is to re-run `content:owner` before writing `quite`, since L4 may still be revised. The
   general lesson, and the third time this repo has learned it: **treat an L4 brief's fresh-key list
   as spent, but never as owned.**

### 3.2 The two the index made possible

**`thing` is FREE**, thirty-nine modules in. A course that has taught shopping, directions, health,
paperwork and two narrative levels never needed the bare noun, and M8's whole paraphrase system —
`the thing you use to …` — rests on it. **`important` and `matter` are free too**, which is what
makes M5's abstract vocabulary affordable inside a 25-key cap: `truth`, `freedom`, `justice`,
`happiness`, `belief`, `society`, `value`, `life`, `death`, `duty`, `respect` all came back `free`,
because thirty-nine modules of concrete talk never had a reason for one of them. M5 is the last
module in the course with a genuinely open vocabulary field, which is why it can afford a hard
grammatical spine as well.

### 3.3 Rows doing another job, and where the rule goes

First occurrence wins, so a later module needing a second job on an owned surface writes the rule in
`rules[].text` and points back. The L5 list, and it is short because at L5 most rows are pointed at
rather than re-jobbed:

| surface | owner | the job L5 gives it | module |
| --- | --- | --- | --- |
| `mean` / `means` | L3-M1 (stative verbs) | `What does it mean?` — the note already carries it | M8 |
| `sound` / `sounds` | L2-M6 (`That sounds good`) | `That sounds very formal` | M3 |
| `who` | L3-M9 (the relative) | the paraphrase relative — the same job, one level on | M8 |
| `cold` | L3-M7 (the body) | a cold ROOM, as an indirect request | M7 |
| `glass` | L2-M5 (drinking) | `raising a glass` | M4 |
| `sorry` | L1-M10 | the condolence formula and the repair signal | M4, M8 |
| `film` | L1-M5 | half of the `film` / `movie` variety pair | M3 |
| `to be honest` | L3-M3 (whole) | one of M10's pivot phrases | M10 |

`cold` is the weakest of these and the brief says so: if L3-M7's note cannot be read as true of a
cold room, M7 writes `chilly`, which came back free.

### 3.4 Blocked surfaces — words no L5 display may write

Each is owned with a job that would make the learner's tap show a false note, and no L5 module may
show it. Every one is NAMED in a Hindi `rules[].text` instead, which `tools/check-shown.ts` does not
scan — only sentence, variation and pool `display` are shown surfaces — so a learner can be told
about a form without the course spending a key on it.

- **The official `shall`** (`Applicants shall submit two copies`, M4). `shall → L2-M6`, the
  suggestion word of `Shall we go?`. Blocked at L4-M7 and blocked again here; §5 records it as
  closed rather than deferred.
- **The optative `may`** (`May you both be very happy`, M4). `may → L4-M7`, the permission modal.
- **Causal `since` and causal `as`** (M6). `since → L3-M7` is duration, `as → L2-M9` is comparison.
  See §5.
- **Relative `which`, relative `where` and relative `that`** (M8). See §3.1(3).
- **Bare `wish`** (M4). See §3.1(4).
- **The passive `used to`** (M8). `used to → L3-M10` is the habitual past, and the paraphrase
  `the thing used to open bottles` matches that key exactly, opening a note about what somebody did
  every day. The taught shape keeps the subject inside the clause: `the thing you use to open
  bottles`.
- **`right` for "correct"** (M2). `right → L2-M4` is the direction word.

### 3.5 Multi-token surfaces, and the span decision

Every phrase below indexes WHOLE, and the brief names the word each one protects:
`a piece of cake`, `out of the blue`, `once in a while`, `now and then`, `sooner or later`,
`by heart`, `on purpose`, `never mind`, `hang on`, `fed up`, `take it easy` (M1);
`just kidding`, `only joking`, `no offence`, `the wrong way`, `take a joke`, `mean it`, `come on`,
`not bad at all` (M2); `have you ever`, `have never` (M3); `on behalf of`, `a few words`,
`in memory of`, `please join me`, `sorry for your loss`, `thank you all` (M4); `in general`,
`on the whole`, `most people`, `it depends`, `tend to`, `some people` (M5); `for example`,
`in fact`, `in conclusion`, `to sum up`, `on balance`, `on the contrary`, `rather than`,
`given that`, `now that` (M6); `I was wondering`, `up to you`, `if you say so`, `I don't mind`,
`do you think` (M7); `sort of`, `kind of`, `in other words`, `what do you call`, `the opposite of`,
`used for`, `make sense`, `say that again`, `I mean` (M8); `they say`, `it is said`,
`once upon a time`, `in short`, `one day`, `at the end` (M9); `put off`, `find out`,
`the truth is` (M10).

Four of them exist ONLY to protect a bare word from a false note: `mean it` swallows L3-M1's `mean`;
`never mind` swallows L1-M4's `never`; `what do you call` swallows L1-M6's `call`; `the opposite of`
swallows L2-M4's direction `opposite`. `do you think` protects L1-M9's `think` and lets `could`
follow it on L2-M1's own row.

**`maxSpan` stays 4, and the decision was live.** `a piece of cake`, `out of the blue`,
`once in a while`, `once upon a time`, `not bad at all`, `sorry for your loss`, `if you say so` and
`what do you call` are all exactly four tokens, and an idiom module could easily have pushed the
course to five (`once in a blue moon`, `off the top of my head`, `to cut a long story short`,
`do you think you could`). It does not: a longer fixed phrase is named in a Hindi `rules[].text` and
never shown, because `maxSpan` bounds the resolver's greedy walk for the WHOLE course and one
idiom is not worth widening it. `do you think you could` is written as `do you think` + `could`
instead, which is also how it decomposes for the learner.

The hyphen seam of `docs/88` §3.5 stays live and bites in M2 and M3. `content:owner` returned

> `light-hearted    free   [parts: light → L2-M3, hearted → free]`
> `old-fashioned    free   [parts: old → L4-M8, fashioned → free]`

so each compound would hand its module a dead key (`hearted`, `fashioned`) while a tap on the owned
part keeps the earlier note. The L5 rule is L4's, unchanged: **avoid hyphenated compounds whose
parts are owned with another job** — write `light and easy` and `from my grandmother's time`.

## 4. The shape of the level, module by module

**Bounds do NOT climb. The ceiling is L4's 14 and nothing exceeds it: M1 12, M2 12, M3 13, M4 12,
M5 14, M6 14, M7 13, M8 13, M9 14, M10 14.** Three modules go DOWN to 12, and that is the argument
rather than an accident of it. At L5 the unit that grows is the TURN, not the sentence — M6 is a
structured case, M9 a six-sentence retelling, M10 an eight-sentence piece — and a bound is a
maximum, so a ceiling of 14 costs those modules nothing. Meanwhile the three modules at 12 are
teaching brevity as content: an idiom is short (M1), a joke that needs fourteen words is not a joke
(M2), and M4's whole finding is that English ceremonial language is shorter than the Hindi the
learner will reach for. A fifteen-word bound anywhere in this level would have contradicted the
module standing next to it.

`newWordCap` stays the PRD §5 **25** everywhere except **M10, which is 18**. An exit module that
opens twenty-five new keys is an eleventh teaching module wearing an exit's title; M10 recombines
five modules' register facts and needs `postpone`, `discover`, `attend`, `receive`, `look`,
`put off`, `find out` and `the truth is` and nothing else. M9 will also spend far under its cap —
the entire twist kit (`at first`, `but then`, `suddenly`, `it turned out`, `luckily`) is L4-M10's,
which is exactly what frees it to spend on register instead.

- **M1 Sayings and idioms** (12) — owns the FIXED PHRASE: a multi-word lexical item learned whole,
  with frozen internal grammar and a fixed part-of-speech slot. It opens the level because it is
  the smallest unit of voice there is. Fresh: `idiom`, `expression`, `literally`, `luck`, `mind`,
  `moon`, `cake`, plus eleven whole phrases.
- **M2 Humour and teasing** (12) — owns the MARKED JOKE: the closed set of words English uses to
  flag a joke, before and after, and the understatement that reads as praise. It sits second
  because M1 has just established that a fixed phrase can mean something other than its words.
  Fresh: `joke`, `joking`, `kidding`, `funny`, `tease`, `serious`, `seriously`, `silly`, `offend`,
  `offended`, `feelings`, `meant`.
- **M3 How they say it there** (13) — owns VARIETY AS A CHOICE and the EXPERIENCE PRESENT PERFECT.
  It sits third because the level's first two modules have handed the learner phrases that are
  regionally marked, and the question "marked where?" is now unavoidable. Fresh: `ever`, `accent`,
  `dialect`, `slang`, `formal`, `informal`, `local`, `outsider`, `generation`, `word`, `spoken`,
  `lift`, `elevator`, `flat`, `apartment`, `movie`, `colour`, `color`, `realize`, `spelling`.
- **M4 Formal occasions** (12) — owns the CEREMONIAL FRAME and PRODUCTION of formal language,
  which is L4-M7's debt. It sits fourth because M3 has just made register a visible choice and this
  is the first module that asks the learner to hold one deliberately for four sentences. Fresh:
  `speech`, `toast`, `congratulations`, `condolences`, `sympathy`, `loss`, `wedding`, `funeral`,
  `ceremony`, `guest`, `honour`, `grateful`, `pleasure`, `occasion`, `memory`, `wishes`.
- **M5 Big questions** (14) — owns the ZERO ARTICLE with abstract and generic nouns, the third and
  last article this course teaches, plus the hedged generalisation. It sits at the level's middle
  because it is the first module whose subject nouns are not things, and because M6 cannot argue
  about anything until M5 has given it something to argue about. Fresh: the abstract field of §3.2.
- **M6 Arguing a position** (14) — owns the CONCESSION-REBUTTAL PAIR, the signposting frame, and
  the MIXED CONDITIONAL. It sits immediately after M5 because the pair is the point: M5 states a
  view, M6 defends one, and splitting them that way is why both fit in ten sentences. Fresh:
  `granted`, `admittedly`, `nevertheless`, `whereas`, `indeed`, `argue`, `argument`, `claim`,
  `evidence`, `example`, `objection`, `prove`, `firstly`, `secondly`, `overall`.
- **M7 Between the lines** (13) — owns INDIRECTNESS AS A LADDER and sarcasm as a reception skill.
  It sits seventh because M6 is the level's most explicit register and M7 its least, and the two
  next to each other is what makes either visible. Fresh: `hint`, `imply`, `obviously`,
  `apparently`, `whatever`, `anyway`, `brilliant`, `typical`, `somehow`, `wondering`, `chilly`.
- **M8 When words run out** (13) — owns the CONTACT RELATIVE CLAUSE and the repair set. It is the
  most practically valuable module in the level and sits eighth because it is the safety net under
  M9 and M10: a learner who can paraphrase can finish a retelling. Fresh: `thing`, `things`,
  `catch`, `spell`, `listen`, `clear`, `explain`, `roughly`, `misunderstanding`, `pardon`, `repeat`.
- **M9 Telling it your way** (14) — owns the SUMMARY PRESENT against the past simple, the
  consistency rule that forbids changing gear halfway, and the attribution frame. Items are
  retellings of about six sentences and **the per-sentence bound applies INSIDE the retelling**, as
  at L3-M10 and L4-M10. Fresh: `version`, `legend`, `tale`, `moral`, `ending`, `briefly`,
  `apparently`, `king`, `clever`, `greedy`, `hero`, `rich`, `forest`.
- **M10 Your own voice** (14, `newWordCap` 18) — owns REGISTER AS FIVE SWITCHES THAT MOVE TOGETHER:
  contraction, verb choice, sentence length, hedging, and how much is left unsaid. Items are
  eight-sentence pieces and **the per-sentence bound applies INSIDE the piece**. It opens no new
  grammatical system at all, which is what an exit module is for.

## 5. Where the deferrals land, and the two holes

Six of `docs/88` §5's seven deferrals land, and §2 says where. Two things land nowhere, and this is
the last level, so they are named as holes in the product rather than passed on.

**Hole 1 — causal `since` and causal `as` are not taught in this course.** `docs/88` §5 sent them to
L5-M6 "because that is the first module whose register actually wants them, and by then a second
note on an owned row can be planned as part of a level rather than smuggled into one". The index has
not moved: `since → L3-M7` (duration with the perfect) and `as → L2-M9` (comparison). A display
carrying either hands the learner a note that is false of the sentence they are reading, which is
the `का` bug the briefs' own header names, and **a level never edits a file below it**. So M6 does
not teach them. It writes `given that` and `now that` (both free) for the causal subordinator,
points at L1-M9's `because` for everything else, and names causal `since` and `as` in a Hindi
`rules[].text` as forms to RECOGNISE in reading. The learner therefore leaves this course able to
read them and not to write them.

The fix is not another brief. It is a content issue against **L3-M7's `since` row and L2-M9's `as`
row**, to write each note true of both jobs — which is a below-level edit, and the only kind of
change that can close this. Recorded here so that the issue exists; question 91 puts the wording of
those two notes to the gate.

**Hole 2 — `; however,` is never taught.** `docs/97` question 83 asked whether the semicolon could
"wait for L5 rather than being a gap". It waited, and there is nothing after L5. No L5 module has a
job that needs it: M4's register is short sentences, M6 signposts with `firstly` and `to sum up`,
and M10's lesson is that the switches move together, not that a punctuation mark exists. It is a
gap, it is small, and it is a gap by decision rather than by oversight.

**One thing that is NOT a hole:** the official `shall`. `docs/88` §5 offered "or never", and never is
the answer — it is named in M4's Hindi rule text as a form the learner will read on a notice and
shown in no display. A form the course deliberately teaches for reception only is not a hole; a form
nobody decided about is.

## 6. Open questions for the native-speaker gate

Numbering continues this course's chain, which ends at 90 in `docs/97` — NOT at `docs/88`'s 62; see
the header. **The native-speaker gate is a separate, stricter bar and it is unmet** — nothing below
may be closed by rewriting a shipped module.

91. **Causal `since` and causal `as` as a course-level gap** (§5, hole 1). The briefs teach
    `given that` and `now that` instead and leave causal `since`/`as` to reception. Confirm that a
    fluent speaker regards this as a real gap worth a below-level edit to L3-M7 and L2-M9, or as an
    acceptable omission, and if the former, confirm the wording that would make L3-M7's `since` note
    true of both duration and cause.
92. **The idiom set** (M1). `a piece of cake`, `out of the blue`, `once in a while`, `now and then`,
    `sooner or later`, `by heart`, `on purpose`, `never mind`, `hang on`, `fed up`, `take it easy`.
    Confirm every one is current everyday English rather than textbook English, and that none is
    regionally marked enough to belong in M3 instead.
93. **The Hindi idioms plated against them** (M1). सर मत खाओ → `*do not eat my head`,
    दिमाग़ खा गया → `*he ate my brain`, बाएँ हाथ का खेल → `a piece of cake`. Confirm these are the
    carry-across errors a Hindi speaker actually produces in English, and that plating an
    ungrammatical English line beside its idiom is the right teaching move at this level.
94. **The three places English refuses a joke** (M2). Deadpan delivery misread as rudeness; personal
    remarks about weight, marriage and salary; and seniority unmarked by any pronoun. Confirm the
    list is right and, more importantly, that stating it in `usage` as an audience fact — never as a
    fault in the learner — is the tone the gate wants.
95. **Understatement as praise** (M2). The brief teaches `not bad at all` and `that was not
    terrible` as praise. Confirm both read as praise rather than as faint approval, and that a
    learner is better served by producing them than by only recognising them.
96. **The M2 / M7 irony split** (M2, M7). M2 owns flagged, defused irony; M7 owns unmarked
    implication and sarcasm. Confirm the line falls where the ratified job lines put it, and that a
    learner can be taught the first without the second.
97. **`have you ever` and `have never` as WHOLE index keys** (M3, §3.1(1)). The device keeps the
    experience perfect off L4-M7's passive note. Confirm the two phrases are the right frames to
    plate, and that no natural display in this module needs a bare auxiliary `have`.
98. **The finished-time rule** (M3). `*Have you ever been to Delhi last year` is taught as
    impossible. Confirm the rule as stated — a finished time expression forces the past simple —
    holds without an exception a learner will meet.
99. **Naming Indian English as a variety in a module about outsiders** (M3). The module tells the
    learner their own English is a variety, not a defective copy. Confirm this is the framing a
    fluent Indian English speaker wants, and that the lexical pairs chosen (`lift`/`elevator`,
    `flat`/`apartment`, `queue`/`line`, `film`/`movie`) are the ones worth the keys.
100. **Ceremonial English is SHORTER than ceremonial Hindi** (M4). This is the module's whole
     finding and the reason its bound drops to 12. Confirm it, and confirm that
     `*It is my privilege to avail this opportunity to convey my heartiest felicitations` is the
     shape a Hindi speaker actually produces at a wedding.
101. **The condolence formula** (M4). `I'm so sorry for your loss`, and stopping. Confirm brevity is
     the convention across the English-speaking audiences this course serves, and that the module is
     right to teach a learner NOT to narrate the death.
102. **Blocking the optative `may`** (M4, §3.4). `May you both be very happy` is a real ceremonial
     English sentence and this course cannot show it, because `may → L4-M7` is permission. Confirm
     that naming it in a Hindi rule while never displaying it leaves the module usable.
103. **The zero article as an Indian English marker** (M5). The brief claims the interference runs
     toward OVER-supplying `the` (`*The life is difficult`, `*The society expects too much`) rather
     than omitting it. Confirm the direction, since the whole module is built on it.
104. **`the freedom to choose` against `freedom`** (M5). The narrowing rule — `the` appears when what
     follows narrows the class. Confirm it is true as stated rather than merely memorable, and that
     it is the most useful form of the rule for this learner.
105. **The generic `you` against `one`** (M5). The brief teaches `You should keep your word` and
     calls `*One should do his duty` grammatical but a century old. Confirm both halves.
106. **The doubled concessive** (M6). `*Although it is expensive, but it is worth it`. The brief
     calls it the most recognisable Indian English structure at this level, one level on from
     L4-M2's `*Because … so …`. Confirm the claim and the corrected pair to plate.
107. **The mixed conditional in an argument** (M6). `If we had booked earlier, we would be on the
     train now`. Confirm this is the shape a case about a past decision actually takes, and that it
     belongs with the concession-rebuttal pair rather than in a module of its own.
108. **`firstly` / `secondly` rather than `first` / `second`** (M6, §3.3). The ordinals are owned
     (`first → L2-M10`, `second → L2-M4`), so the module signposts with the `-ly` forms. Confirm
     these read as natural in speech rather than as written-essay English.
109. **`I will try` and `let's see` heard as commitments** (M7). The brief calls this the most useful
     sentence in the module. Confirm an English listener really does diarise them, and confirm the
     refusal the course should teach in their place.
110. **Directness inverting by act** (M7). English more indirect when requesting, more direct when
     refusing; Hindi the reverse. Confirm the generalisation holds well enough to be taught as a
     rule rather than as a tendency.
111. **Sarcasm as reception only** (M7). The brief teaches `Oh, brilliant` and `That's just what I
     needed` for recognition and explicitly tells the learner not to write sarcasm. Confirm that is
     the right instruction rather than an over-caution.
112. **The contact relative as the taught paraphrase shape** (M8, §3.1(3)). `the thing you use to
     open bottles`, with no relative pronoun. Confirm this is what a speaker says, and that teaching
     it before (or instead of) `which`/`that` is sound rather than a workaround the index forced.
113. **जो … वो as the interference** (M8). `*Who cuts the hair, that man` and `*The thing which you
     use it to open bottles` — the fronted clause and the resumptive pronoun. Confirm both are
     errors a Hindi speaker produces in English.
114. **The repair set and its order** (M8). Signal, locate, confirm, restate — `Sorry?` ·
     `What does X mean?` · `Do you mean …?` · `In other words …`. Confirm the four moves and their
     order, and that `What do you call this?` is the right question for a missing noun.
115. **The summary present for a retold plot** (M9). `A farmer finds a pot of gold`. Confirm this is
     the tense an English speaker retells a film or a folk tale in, and that tense DRIFT is the error
     a Hindi speaker makes rather than tense choice.
116. **`They say` and `It is said that`** (M9). Confirm both are current rather than literary, and
     that attribution is how a retelling is marked as not the speaker's own.
117. **The five register switches** (M10). Contraction, verb choice, sentence length, hedging, and
     how much is left unsaid. Confirm the list is complete enough that moving all five really does
     change register, and that a half-moved register
     (`I am writing to inform you that I could not make it, mate`) is the marker the brief claims.
118. **The pivot words** (M10). `Anyway`, `To be honest`, `Look`, `The truth is`. Confirm these are
     what an English speaker actually uses to turn a piece, and confirm `Look` is not too abrupt to
     teach.
119. **An eight-sentence piece as the course's final item shape** (M10). Confirm eight sentences
     that change register midway is a fair exit for this course, and that a learner who can do it
     has in fact finished.

`npm run content:prompt -- hi-en L5-M1` renders from the real index once the briefs are merged, and
the bounds, the deferral owners, the two named holes and the blocked-surface list of §3.4 are the
decisions `tools/course-briefs.test.ts` should pin for this level.
