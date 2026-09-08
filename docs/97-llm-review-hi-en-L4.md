# hi-en L4 — LLM review

The record of the LLM pass that cleared hi-en's L4 modules to ship. One `##` section per authoring
wave; each wave carries a `###` per module, the seams it had to correct against the emitted index,
its effect on the shown-surface ratchet, and numbered open questions for the native-speaker gate.

Every index claim below was produced by `npm run content:owner -- hi-en "<surface>" …` on
2026-09-08, against **the 802-surface fold over 30 modules through `L3-M10`** — the deepest emitted
delta index under `public/content/hi-en/index/`, folded in its own `cumulativeThrough` order. That
is the real board these modules were written onto: hi-en's L1, L2 and L3 ladders complete and
nothing of L4 shipped. Where `docs/88-hi-en-L4-brief-decisions.md` and the index disagreed, the
index won and the disagreement is recorded in §"Brief seams corrected" below.

The native-speaker gate is a separate and stricter bar, and it is **unmet**. `verified: true` on
these two files records an LLM review authorised by the repo owner, nothing more.

## Wave 1 — L4-M1, L4-M2 (#531)

Signed `Claude Opus 5 — LLM review, authorised by repo owner`, `2026-09-08`. These are the level's
RANGE modules: M1 opens the instruction, M2 opens the chain. Both ship with `verified: true` in the
same change as the authoring, per the repo's one-commit rule.

### L4-M1 "Explaining how" — the one place English drops the subject

Ten displays:

1. `First cut the vegetables. Then add the salt.`
2. `Boil the water to make the tea.`
3. `Mix the rice and the vegetables properly.`
4. `Pour the water slowly so that the cup is not too full.`
5. `Close the door carefully so that the child does not wake up.`
6. `Make sure that you sign the form.`
7. `Do not stop here — it will be a problem.`
8. `Press the key twice to open the door.`
9. `Ask a person the way in order to get to the market.`
10. `Read the first step. Be careful — the box is heavy.`

What it teaches. The bare imperative is the module's spine and it is stated as an exception rather
than a new rule: L1-M10 sold "the subject pronoun is never dropped" as a law, and the imperative is
the single place English drops it. Rule 0 says exactly that, and S01's `trap` names L1-M10 so the
learner meets the contradiction head-on instead of discovering it. Rules 1 and 2 are the purpose
system in two shapes — `to` + bare verb when the purpose belongs to the person being instructed
(S02, S08), `so that` + a full clause when the purpose has its OWN subject (S04, S05). S05 is built
so the subject change is unmissable: you close the door, the *child* is the one who must not wake
up, and the `mistake` block is precisely the `to` that cannot work there. Rule 3 carries
`make sure (that)` as a CHECK rather than a step (S06) and the negative `Do not` + bare verb (S07).
Rule 4 is the interference plate: Hindi grades the imperative inside the verb (कर · करो · कीजिए on
top of तू / तुम / आप) while English has one bare form and buys the whole politeness scale with the
words around it — L2-M1's law, re-run on instructions. Rule 5 says the sequencing words are already
owned and add nothing new. Rule 6 is `turn`'s second job.

The `for` + `-ing` error gets both halves, not just the star: rule 1 and S02's `mistake` reject
`*for making the tea`, and then state the TRUE rule beside it — `for` + `-ing` names an object's
function (`a machine for washing clothes`) and never an actor's purpose. Eighteen surfaces open
here: `cut`, `add`, `boil`, `mix`, `pour`, `close`, `stop`, `press`, `step`, `way`, `careful`,
`carefully`, `slowly`, `properly`, `twice`, plus `so that`, `in order to` and `make sure` whole.
`to` and `turn` open nothing — their rules are in `rules[].text` and the learner's tap lands on
L1-M3 and L2-M4, where it should.

### L4-M2 "Cause and consequence" — the connector is chosen by what follows it

Ten displays:

1. `I was late because of the rain.`
2. `The train was late due to the rain.`
3. `The train was late. As a result, I missed the meeting.`
4. `The bus was full. That is why I walked to work.`
5. `The shop was not open. Therefore, I could not buy the bread.`
6. `The salary was not good. For this reason, he left the job.`
7. `The reason is that the train did not come.`
8. `Heavy rain caused the problem at the station.`
9. `The rain had an effect on the market.`
10. `Leave now, otherwise you will end up late for the meeting.`

What it teaches. The module is authored one plate per SYNTACTIC CLASS, because that is what
actually generates the errors: a preposition takes a noun (`because of`, `due to` — S01, S02), a
sentence adverb stands at the front of its own sentence and needs a full stop before it
(`As a result,` `Therefore,` `For this reason,` — S03, S05, S06), `That is why` is the sentence
adverb that takes NO following comma (S04, and its `mistake` is the comma), and the coordinator
`so` may only stand between two clauses. Rule 0 is the interference plate and it is the level's
opening error: Hindi ties both ends — क्योंकि … इसलिए in one sentence — and English allows exactly
one link per join, so `*Because it was raining, so I stayed home` is the Hindi sentence in English
words. S01's `mistake` carries that sentence entire, because it is the shape a Hindi-speaking ear
does not hear as wrong.

Two smaller interference points get their own sentences rather than a footnote: `because of` takes
a noun and only a noun (rule 2, S01/S02 traps), and `the reason is THAT`, never
`*the reason is because` (S07, whose `mistake` is exactly that sentence). S09 is the `effect` /
`affect` pair — noun against verb — which is the one place the module spends a row on an English
internal confusion rather than a Hindi one, and it is tagged `interference` for the Hindi speaker
who has one word (असर) covering both. S10 opens `otherwise` and `end up`.

All fourteen of the brief's fresh keys open here, across thirteen rows — `because of`, `due to`,
`as a result`, `that is why`, `for this reason` and `end up` indexed whole, plus `therefore`,
`reason`, `result`, `effect`, `affect`, `otherwise`, and one row whose `forms` carry `cause`,
`causes` and `caused` together. `because` and `so` open nothing — rule 5 adds only the POSITIONAL rule (`so` between
two clauses with a comma before it, never at the front of a sentence; use `therefore` or
`that is why` there) and points back at L1-M9. The causal `since` and the causal `as` appear in no
display, per `docs/88` §3.4: `since → L3-M7` is duration and `as → L2-M9` is comparison, and both
wait for L5.

### Brief seams corrected, and what the emitted index actually said

Both INDEX SEAM notes were checked surface by surface. **They are almost entirely right** — all 15
of M1's declared fresh keys and all 14 of M2's came back `free`, and every owned-surface pointer in
M1's note is exact:

> `first  L2-M10` · `then  L1-M10` · `next  L1-M6` · `after that  L2-M10` · `finally  L2-M10` ·
> `how  L1-M2` · `take  L1-M3` · `wait  L2-M1` · `open  L2-M1` · `again  L2-M8` · `turn  L2-M4` ·
> `to  L1-M3`

as is every pointer in M2's:

> `because  L1-M9` · `so  L1-M9` · `since  L3-M7` · `as  L2-M9` · `unless  L3-M4` ·
> `mean  L3-M1` · `means  L3-M1` · `that  L1-M9` · `is  L1-M1` · `why  L1-M9` · `for  L3-M7`

Three corrections. None of them changed a display; all three change the REASON a decision is
right, which is the part a later wave will copy.

1. **M2's brief says `of` is "free but tiny". It is not free — `of → L1-M8`.** The note justifies
   indexing `because of` whole by listing what its parts already cost, and marks `of` as the one
   part that is available. `content:owner` returns

   > `of    L1-M8`

   So the justification is *stronger* than the brief claims, not weaker: **every** token of
   `because of` is spoken for, and a bare `of` inside `because of the rain` would have resolved
   to whatever note L1-M8 wrote. The same is true of `due to` — `content:owner` returns
   `due  L3-M8` and `to  L1-M3`. Both phrases index whole, and the learner's tap lands on the
   causal note rather than on either part.

2. **M1's brief justifies `make sure` whole from `sure → L2-M6`. Both halves are owned:
   `make → L3-M2`.**

   > `make    L3-M2` · `sure    L2-M6`

   L3-M2 is the work-and-study module, where `make` is the ordinary do-verb. A bare `make` inside
   `Make sure that you sign the form` would show a learner a note about making things at work,
   which is false of a check. Recorded here rather than fixed in the brief, because a level never
   edits a file below it and the brief's conclusion was right for a reason it did not state.

3. **The briefs' own illustrative sentences reach for surfaces this ladder has never taught, and
   several of them cannot be displays.** This is the seam that cost the most authoring time, so it
   is written out. M1's note 3 illustrates the imperative with `Press the button.`; note 4
   illustrates the true `for` + `-ing` rule with `a machine for washing clothes`. `content:owner`:

   > `button   free` · `machine   free` · `washing   free` · `clothes   free`

   `free` here means UNTAUGHT, not available — a shown surface is a taught surface (#491), so
   `Press the button` as a display would either spend four keys this module has no budget or brief
   for, or fail the shown check. S08 writes **`Press the key twice to open the door`** instead
   (`key → L1-M3`), and `a machine for washing clothes` stays inside `rules[].text`, which #491
   does not scan. The same applies to M2's canonical error sentence
   `*Because it was raining, so I stayed home`: `raining` is untaught (the ladder has `rain` and
   `rains` only, `rain → L3-M4`), so that sentence appears ONLY in `mistake.display` — which #491
   exempts — and in `rules[].text`, never in a display or a variation.

   Three more of the same class, found while authoring and worth the next wave's time:
   **`traffic` bare is untaught** (L2-M4 indexed `traffic light` and `traffic lights` whole, so a
   cause module reaching for "because of the traffic" must write `because of the traffic lights`);
   **`every` bare is untaught** (L3-M1 indexed `every day` whole); and `hot`, `low`, `put`, `find`
   and bare `out` are all untaught, which quietly rules out most of the recipe and route
   vocabulary an instruction module reaches for first.

No RE-TEACH was reported for either module: `npm run content:shown -- hi-en L4-M1` and `L4-M2` both
printed `clean — every shown surface resolves` with no re-teach line, because no row of either
module opens a key an earlier module owns. `until` appears in neither display (`docs/88` §3.4 —
it is M6's), and no hyphenated compound appears in either (§3.5).

### The ratchet

`npx vitest run tools/shown-surfaces.test.ts` → **11 passed (11)**. hi-en **holds at 30**, its
baseline, and the two new modules contribute **zero** findings — every token of all twenty displays,
sixty variations and twenty-four comprehension items resolves in the fold. The thirty are unchanged
and all predate this wave:

`priya · mumbai · jaipur · doctor · farmer · actor · coffee · water · cricket · films · dogs ·
hindi · how's · it · going · and · so · today · speak · milk · please · three · six · reading ·
new · isn't · now · ate · me · bus`

No baseline was lowered, because this wave fixed no pre-existing finding; none was raised. The
comprehension pools are 12 items apiece and every token of both resolves, which the strict
`content:build` will re-prove.

### Open questions for the native-speaker gate

Continuing the chain in `docs/88-hi-en-L4-brief-decisions.md`, whose last number is 62. Nothing
above is renumbered.

63. **`Boil the water to make the tea` as a natural instruction** (M1-S02). The purpose infinitive
    is correct, but a native speaker giving this instruction might more often say
    `Boil the water for the tea`. Confirm the `to` + verb version is idiomatic enough to be the
    first thing taught, given that `for` + a NOUN is not the error the module is warning against
    and might muddy the `for` + `-ing` line it is.
64. **`Ask a person the way`** (M1-S09). `person` is the only owned human noun available at this
    point in the ladder — `someone` and `somebody` are unowned — but `Ask a person the way` reads
    slightly stiff against `Ask someone the way`. Confirm it is acceptable rather than odd, or say
    which module should open `someone`.
65. **`Pour the water slowly so that the cup is not too full`** (M1-S04). The negative purpose
    clause is the shape the module needs (its subject differs from the imperative's), but a native
    speaker might prefer `so that it does not overflow` or `so that you do not spill it`. Confirm
    the chosen clause is natural and not merely grammatical.
66. **`properly` against `well`** (M1-S03). `properly` is taught as the direct rendering of
    ठीक से / अच्छे से. Indian English uses `properly` far more than British or American English
    does, where `well` or `thoroughly` would be usual. Confirm `Mix the rice and the vegetables
    properly` is the sentence to teach, or whether the module is teaching an Indian-English
    preference without naming it as one.
67. **The em dash in `Do not stop here — it will be a problem`** (M1-S07, M1-S10). The brief's
    pattern writes `Do not + V + — it will + V`. `tokenizeSurface` drops the lone dash, so it is
    invisible to the index, but it is visible to a learner. Confirm the dash rather than a comma,
    a semicolon or a full stop is what an instruction actually looks like written down.
68. **`Be careful — the box is heavy`** (M1-S10). Confirm `Be careful` rather than bare `Careful!`
    is the right first teaching, and that pairing it with a reason clause after a dash (rather than
    `Be careful, the box is heavy` or `The box is heavy, be careful`) is the ordinary order.
69. **`due to` at the front of a sentence** (M2-S02, variation 3: `Due to the rain, the train was
    late.`). Prescriptivists restrict `due to` to a post-copular position (`The delay was due to
    the rain`) and reject it as a fronted adverbial. The module teaches the fronted use because it
    is what announcements actually say. Confirm that is the right call for a learner, and whether
    the prescriptive objection is worth a line in `usage`.
70. **`For this reason` as a taught connector** (M2-S06). It is real but noticeably formal and
    noticeably less frequent than `therefore` or `that is why`. Confirm it earns one of ten
    sentences, or name the connector it should be replaced with.
71. **`end up` + a bare adjective** (M2-S10). `you will end up late` is the form taught.
    `end up` + `-ing` (`you will end up walking`) is more frequent; the module mentions it only in
    the word note because the `-ing` complement is not otherwise on the board. Confirm
    `end up late` is idiomatic on its own, and that the adjective complement is the right one to
    teach first.
72. **The `effect` / `affect` row inside a Hindi-interference course** (M2-S09). This is an
    English-internal confusion, not a Hindi one; the argument for it is that असर covers both and a
    Hindi speaker therefore has no cue to keep them apart. Confirm that argument holds, and that
    `The rain had an effect on the market` is a sentence a learner at this level would want, rather
    than something from a news bulletin.
73. **`Heavy rain caused the problem at the station`** (M2-S08). The bare `Heavy rain` with no
    article is journalistic register. Confirm it is right here, or whether `The heavy rain caused
    the problem` is the version a learner should meet first.
74. **The `so that` / `in order to` split against Hindi ताकि and के लिए** (M1, rules 1-2). The
    module maps `to` + V and `in order to` onto के लिए and `so that` onto ताकि. Confirm the
    mapping is one a Hindi speaker recognises, and in particular that ताकि does NOT also cover the
    same-subject case where English wants a bare `to`.
75. **The politeness scale sentence** (M1, rule 4). `Press it → Please press it → Could you press
    it?` is offered as English buying with words what Hindi buys with कर · करो · कीजिए. Confirm
    the three rungs are the right three, and that कीजिए maps onto `Could you …?` rather than onto
    `Please …`.

## Wave 2 — L4-M3, L4-M4 and L4-M5 (#540)

Signed `Claude Opus 5 — LLM review, authorised by repo owner`, `2026-09-08`. These are the level's
next three RANGE modules: M3 opens the counterfactual, M4 the concession, M5 the hedge. All three
ship with `verified: true` in the same change as the authoring, per the repo's one-commit rule.

Every index claim in this section was produced by `npm run content:owner -- hi-en "<surface>" …` on
2026-09-08, against **the 857-surface fold over 32 modules through `L4-M2`** — Wave 1's two modules
are now part of the board, which is 55 surfaces deeper than the 802 Wave 1 wrote onto.

### L4-M3 "What might have been" — the counterfactual, and the one half that must not move

Ten displays:

1. `If I had gone early, I would have caught the train.`
2. `If I had seen it, I would have told you.`
3. `I should have called you last night.`
4. `I could have taken the bus instead.`
5. `The train might have been late because of the rain.`
6. `I wish I had known about the meeting.`
7. `If only I had listened to my father.`
8. `I almost said no, and I still regret it.`
9. `You could have asked me instead of waiting.`
10. `We nearly missed the train. I should have gone earlier.`

What it teaches. The third conditional as a shape whose two halves are *deliberately different* —
`had` + participle in the condition, `would have` + participle in the result — and the three perfect
modals that do the same job with one half missing: `should have` (regret or reproach), `could have`
(a road that was open and not taken), `might have` (an uncertain past). `I wish` and `If only` take
the same backshift. Nineteen rows open twenty-four keys: `would have`, `should have`, `could have`,
`might have` and `instead of` whole; `had seen`, `had known` and `had listened` whole *with* their
bare participles as second forms; and `caught`, `taken`, `been`, `gone`, `earlier`, `instead`,
`wish`, `almost`, `nearly`, `regret`. Rule 1 carries the Hindi interference (`अगर मैं जल्दी जाता तो
ट्रेन मिल जाती` puts one form in both halves, English does not), rule 2 carries the point that the
counterfactual is not a new *idea* for this learner, and rule 5 carries the third job `would` now
does on L2-M5's row — the brief's instruction, since the row itself belongs to L2-M5.

Five of the ten sentences carry a `mistake` whose display is the `*If I would have …` error or one
of its cousins (`should called`, `could have took`, `should have went`, `I wish I would have`).
That is the densest mistake-plate concentration in the course, and it is deliberate: the brief names
this as the single commonest third-conditional error in Indian English.

### L4-M4 "Persuading" — the concessive adverb is a punctuation lesson

Ten displays:

1. `The office is far. However, the salary is very good.`
2. `I admit that is true, but we do not have the time.`
3. `Of course you are right about the cost. Still, we must go.`
4. `The point is that we cannot wait for the answer.`
5. `At least we have a full week before the exam.`
6. `On the other hand, the small shop is much cheaper.`
7. `It is worth a long wait for a better office.`
8. `Imagine the same problem in a much bigger office.`
9. `That is a fair point. However, the deadline is next week.`
10. `I will do it, even if it takes a long time.`

What it teaches. That `however`, `on the other hand` and `still` are ADVERBS and cannot join two
clauses the way `but` does — full stop before, comma after — which is the same class of error M2
taught for `therefore`, and rule 1 says so explicitly. Eleven rows open sixteen keys: `however`,
`admit` (with `admits`, `admitted`), `of course`, `the point is` (with `my point is`), `at least`,
`on the other hand`, `worth`, `imagine` (with `imagines`, `imagined`), `same`, `fair`, `even if`.
Rule 2 is the module's counterweight and the reason it does not read as a list of warnings: the
concession itself is not a foreign move — `आपकी बात ठीक है, पर …` is the same three beats in the
same order — and what English adds is only the requirement that the beat be spoken rather than left
to tone. Rule 3 carries `still`'s new concessive job, written there rather than in a row because
L3-M10 owns the key and that is where a learner's tap lands.

Six of the ten displays are two sentences separated by a full stop, which is unusual density for
this course; it is what the `. However,` punctuation law requires a learner to *see*.

### L4-M5 "Disagreeing well" — hedge the frame, not the claim

Ten displays:

1. `I am not sure that is the best answer.`
2. `I would say it is fine, but you know better.`
3. `Maybe, but the shop is a bit far from here.`
4. `That is a bit expensive for a small shop.`
5. `Perhaps I do not really agree with the second point.`
6. `That is possibly true, but I am not sure.`
7. `I suppose you might be right, but I have a question.`
8. `It is probably slightly better to ask the manager.`
9. `That is not really the point, I am afraid.`
10. `Actually, I do not think that is exactly right.`

What it teaches. English hedges the FRAME and states the claim plainly — `I am not sure that is
right`, never `*That is not very right` — and the tools are a small closed set graded by how much
work each does. Thirteen rows open sixteen keys: `I am not sure` (with `not sure`), `I would say`,
`maybe`, `a bit`, `perhaps`, `possibly`, `probably`, `slightly`, `suppose` (with `supposes`,
`supposed`), `might`, `not really`, `actually`, `exactly`. Rule 3 is the module's real content and
the hardest thing in this wave to write honestly: Indian English has its own softeners —
`actually`, `only`, `itself`, `na` — that a Hindi ear hears as gentle and a British or American ear
does not, and fronted `actually` in most other Englishes signals a contradiction coming, which is
the opposite of what the speaker intended. The rule says both Englishes are correct where they
live, which is this course's standing Indian-English position, and does not call either wrong.

`a bit` is tagged `interference` rather than `delta` because the constraint is not a shape but a
collocation: it only takes a complaint-leaning adjective (`a bit expensive`, `a bit late`, never
`*a bit good`), and there is nothing in Hindi's थोड़ा to warn a learner off.

### Brief seams corrected, and what the emitted index actually said

All three INDEX SEAM notes were checked surface by surface. Their FRESH lists are almost entirely
right — every declared fresh key of M4 and M5 came back `free`:

> `however  free` · `on the other hand  free` · `the point is  free` · `at least  free` ·
> `even if  free` · `admit  free` · `fair  free` · `worth  free` · `imagine  free` ·
> `of course  free` · `maybe  free` · `perhaps  free` · `probably  free` · `possibly  free` ·
> `actually  free` · `not really  free` · `a bit  free` · `not sure  free` ·
> `I am not sure  free` · `I would say  free` · `suppose  free` · `slightly  free` ·
> `exactly  free` · `might  free`

as is every owned-surface pointer in all three notes:

> `have  L1-M4` · `has  L1-M4` · `if  L3-M4` · `would  L2-M5` · `had  L1-M5` · `should  L2-M8` ·
> `could  L2-M1` · `had better  L3-M4` · `still  L3-M10` · `true  L3-M3` · `point  L3-M3` ·
> `better  L2-M9` · `best  L2-M9` · `but  L1-M10` · `although  L3-M3` · `though  L3-M3` ·
> `that's  L1-M8` · `rather  L2-M9` · `afraid  L2-M8` · `sorry  L1-M10` · `disagree  L3-M3` ·
> `I think so  L3-M3` · `I hope so  L3-M3` · `seem  L2-M8` · `seems  L2-M8` · `quite  free`

Two of the briefs' own corrections were re-checked and both **hold**: `docs/71`'s claim that
`have` / `has` is L2-M8's perfect-auxiliary row is wrong and the index is right (`have → L1-M4`,
`has → L1-M4`, the possession row the `*I am having` trap needs); and L3-M3's seam note listing
`seems` among its fresh keys is wrong (`seem → L2-M8`, `seems → L2-M8`), so M5 points back rather
than repeating the claim.

Seven corrections. None of them changed what the modules teach; five of them changed how a key is
indexed, which is the part a later wave will copy.

1. **M3's brief lists `left` among the past participles this module opens. It is not free —
   `left → L2-M4`, and it is a HOMOGRAPH, not the same word.**

   > `left    L2-M4`

   L2-M4 is *Getting around*, where `left` is the direction बाएँ (`turn left`). The brief's
   canonical sentence for the whole module is `If I had left early, I would have caught the train`,
   and a learner tapping `left` in it would be shown a note about turning at a corner. The fix is
   not a whole key — it is a different verb. Every display writes `gone` instead, and the module
   contains no `left` at all. This is the wave's most expensive finding and the one most likely to
   catch the next course: **a `free` participle is not safe until you have checked what else spells
   it that way.**

2. **The pluperfect is already indexed WHOLE in this course, at L3-M5, and M3 follows that
   precedent rather than the brief's "participle as its own key".**

   > `had gone    L3-M5` · `had finished    L3-M5` · `gone    free`

   So in S01's `If I had gone early`, the two-token `had gone` wins the longest-match walk and the
   learner's tap lands on L3-M5's past-perfect row, which is exactly the right note. Bare `gone` is
   still opened here — it is reachable in S10's `I should have gone earlier`, where `should have`
   consumes the auxiliary — and the module's own three pluperfects are indexed the same way,
   `had seen`, `had known` and `had listened` whole, each carrying the bare participle as a second
   form. The alternative, a bare-participle row only, would have sent every `had` + participle tap
   to `had → L1-M5`, whose note is about eating and owning (`had rice`, `had tea`).

3. **`at least` is claimed FRESH by BOTH M3's and M4's seam notes.** Only one module can open it.
   M4 has a declared pattern for it (`At least + <clause>`) and M3 does not, so **M4 takes it** and
   M3 writes none. Recorded because the briefs cannot both be satisfied and the resolution is not
   in either of them.

4. **`might` — M5's brief flags the same collision with M3 and says to check the emitted file.**
   The resolution is that neither module has to give it up: **M3 indexes `might have` WHOLE and
   never writes a bare `might`**, so bare `might` is untouched and **M5 opens it** for the hedging
   job (`you might be right`). Longest-match keeps the two apart in both directions —
   `might have been` in M3-S05 matches the two-token key before the one-token one.

5. **A WHOLE key whose first token belongs to a shorter OWNED key is unreachable, and M5's
   `not really` hits this.** In the module's own declared pattern `I do not really + V`, the walk
   reaches `do` and takes `do not` (span 2, owned) before it can ever see `not really`, so `really`
   resolves to L1-M10 and the new key is never consulted. S05 keeps that display because the
   pattern is real and everything still resolves; **S09 is what opens the key** —
   `That is not really the point`, where `that is` consumes the first two tokens and the walk
   arrives at `not` clean. Worth generalising: check where a multi-token key is actually
   REACHABLE, not just that it is free.

6. **`or` and `there` are untaught after 32 modules.**

   > `or    free` · `there    free` · `us    free`

   `there is`, `there are` and `there's` are whole keys, so bare `there` has never been opened; `or`
   has simply never been taught. Both are words an author reaches for without thinking — the first
   draft of M3-S05 was `It might have been the rain, or the traffic` — and both would have failed
   the shown check. `us` is in the same class, which quietly rules out `instead of us`,
   `he could have asked us` and most first-person-plural objects.

7. **The persuading and hedging registers pull hard toward free-but-untaught abstract nouns.**
   `plan`, `idea`, `price`, `quality`, `high`, `room`, `try`, `lose`, `decide`, `short`, `old`,
   `thing`, `same`, `crowd`, `flight`, `taxi`, `won`, `played`, `game` all come back `free`, and
   every one of them appeared in a first draft. M4 spent one row to take `same` (it is worth it —
   `the same problem` is the shape, and `*a same problem` is a real error); the rest were written
   out in favour of `cost`, `money`, `time`, `deadline`, `salary`, `office`, `shop`, `answer`,
   `question` and `week`, all owned. The general point for the next wave: **an abstract-argument
   module has a much thinner owned vocabulary to stand on than a concrete one, and the display
   list has to be built from the index outward rather than from the topic inward.**

No hyphenated compound appears in any display of M4, per its brief's §5 warning, and none appears
in M3 or M5 either. `npm run content:shown` printed `clean — every shown surface resolves` for all
three modules **with no RE-TEACH line on any of them**: no row of any of the three opens a key an
earlier module owns. That is by construction — every owned surface the briefs pointed at (`would`,
`should`, `could`, `had`, `if`, `still`, `true`, `point`, `seem`, `afraid`, `rather`, `sorry`) is
carried in `rules[].text` rather than in a row, which is what the briefs asked for and which also
means nothing in this wave is unreachable.

### The ratchet

`npx vitest run tools/shown-surfaces.test.ts` → **11 passed (11)**. hi-en **holds at 30**, its
baseline, and the three new modules contribute **zero** findings — every token of all thirty
displays, ninety variations and thirty-six comprehension items resolves in the fold. No baseline was
lowered, because this wave fixed no pre-existing finding; none was raised.

`npm run content:validate` → `CONTENT 315/315 ok` (the denominator moves as the wave's sibling
courses land; every file in it is `ok`). `npx vitest run tools/` → 190 passed (190), which includes
`register.test.ts`, `delta-index.test.ts` and `course-briefs.test.ts`.

In `src/course/types.test.ts` the whole hi-en language law (#270) was re-run against these three
files: `display`, `mistake.display`, every `variations[].display` and every word `display` and
`forms` entry are Devanagari-free, and `cue`, `literal`, `sound`, `usage`, `mnemonic`, `trap`,
`mistake.why`, every variation `cue` and `changed`, every word `cue` and every word `note` carry
Devanagari. No `glossEn` and no curly apostrophe anywhere. Every note is inside the 200-character
ceiling; the longest is 133. The two census numbers in that file — the module list and the hi-en
count — are the parent's, and this wave did not touch them; with the wave's other courses landed
they read 315 and 35, and `npx vitest run src/course/types.test.ts` is **336 passed (336)**.

### Open questions for the native-speaker gate

Continuing the chain in `docs/88-hi-en-L4-brief-decisions.md` and the wave above, whose last number
is 75. Nothing above is renumbered.

76. **`I had gone` against `मैं गया होता` in the condition half** (M3-S01, rule 1). The module
    teaches that the two halves take different forms and leans on Hindi taking one form in both.
    Confirm that `अगर मैं जल्दी गया होता, तो मुझे ट्रेन मिल जाती` is what a Hindi speaker actually
    says here, rather than `अगर मैं जल्दी जाता तो…`, and that pairing the two in one lesson does
    not make the Hindi look like the error.
77. **`caught` for a train** (M3-S01). `मुझे ट्रेन मिल जाती` is offered as the cue. Confirm that
    the Hindi for catching a train is मिलना rather than पकड़ना for this register, and that the
    word note's `पकड़ ली · मिल गई` pair is the right way round.
78. **`I almost said no, and I still regret it`** (M3-S08). `लगभग मना कर दिया था` is the cue for a
    near-miss that did not happen. Confirm the Hindi carries "I did not, but only just" rather
    than "I did", which is the whole point of the sentence.
79. **`regret` as a verb against अफ़सोस होना** (M3-S08). The row insists `regret` is a plain verb,
    not a state, because `*I am regret` is the predicted error. Confirm अफ़सोस होना is close enough
    that a learner would make that error, or whether पछतावा होना is the closer mapping and the
    error therefore lands elsewhere.
80. **`If only` glossed as काश, the same word as `I wish`** (M3-S06, M3-S07). Two rows, two
    English forms, one Hindi cue. Confirm the difference the notes claim — `if only` heavier, no
    result clause needed — is one a Hindi speaker can hear, and name the Hindi that separates them
    if काश does not.
81. **`might have been` against `रही होगी`** (M3-S05). The cue uses the presumptive `देर से रही
    होगी`. Confirm that is the natural Hindi for an uncertain past, and that it does not read as
    more confident than English `might have`.
82. **The `literal` lines in this wave** (all three modules). They are word-for-word Hindi in
    English order — `अगर मैं था गया जल्दी, मैं होता पकड़ा वह ट्रेन.` Confirm this style is still
    doing its job at L4, where the English shape is long enough that the mirror may be more
    confusing than clarifying, and say at which point in the ladder it should stop.
83. **`However` after a full stop as the DEFAULT taught form** (M4-S01, M4-S09, rule 0). The
    module teaches only `. However,` and never the semicolon. Confirm the full stop is what a
    learner should write first, and that `; however,` can wait for L5 rather than being a gap.
84. **`Still,` sentence-initial as a concessive** (M4-S03). This is the module's riskiest teaching
    choice: `still` already means अब भी on L3-M10's row and the learner's tap lands there. Confirm
    fronted `Still,` is frequent enough in real persuading speech to earn a display, or whether
    `Even so,` or `All the same,` is the one to teach and `still` should stay a rule-text mention.
85. **`Of course you are right about the cost`** (M4-S03). Confirm `of course` opening a concession
    reads as generous rather than sarcastic to a native ear — the same words carry both, and the
    module offers no way to tell them apart.
86. **`It is worth a long wait`** (M4-S07). The noun complement was chosen over `worth waiting` to
    keep `-ing` out of the display. Confirm `a long wait` is idiomatic as a noun here, or whether
    `worth waiting for` is the form a learner should meet first even at the cost of the `-ing`.
87. **`a bit` restricted to complaint-leaning adjectives** (M5-S04, rule 2). The rule states this
    flatly and the mistake plate is `*a bit good`. Confirm the restriction is as absolute as the
    module claims, and in particular whether `a bit better` — which the module does not write —
    is acceptable and would therefore make the rule too strong.
88. **`Actually` and the Indian-English softener set** (M5-S10, rule 3). The rule names `actually`,
    `only`, `itself` and `na` as softeners that do not travel, and says both Englishes are correct
    where they live. Confirm the list is the right four, that the claim about fronted `actually`
    signalling a contradiction is fair to how it is heard outside India, and that the framing does
    not read as telling a learner their own English is wrong.
89. **`I am not sure` as the module's flagship hedge** (M5-S01). Confirm this is what a Hindi
    speaker most needs — rather than `I'm not so sure` or `I don't know about that` — and that
    `मुझे पक्का नहीं लगता` is the cue that gets them there rather than `मुझे यक़ीन नहीं है`.
90. **Stacking two hedges in one clause** (M5-S08, `probably slightly better`). Careful English
    does stack, but this is the only display in the course that does. Confirm it reads as natural
    hedging rather than as a learner piling on modifiers, and whether one hedge per clause is the
    safer thing to teach first.

## Wave 3 — L4-M6 through L4-M10 (#555)

Signed `Claude Opus 5 — LLM review, authorised by repo owner`, `2026-09-08`. These are the level's
last five RANGE modules and they close L4: M6 opens the time clause, M7 the rest of the passive and
the Indian-official register, M8 the habitual `would`, M9 the path preposition, M10 direct speech
inside a narrative. All five ship with `verified: true` in the same change as the authoring, per the
repo's one-commit rule.

Every index claim in this section was produced by `npm run content:owner -- hi-en "<surface>" …` on
2026-09-08, against **the 913-surface fold over 35 modules through `L4-M5`** — Wave 2's three
modules are now on the board, 56 surfaces deeper than the 857 Wave 2 wrote onto. The briefs' own
INDEX SEAM notes say they were "checked with `npm run content:owner` on 2026-09-08", and they are
mostly right; the two places they are not are recorded below.

### L4-M6 "Before and after" — the future that must not be written twice

Ten displays:

1. `As soon as the rain stops, I will call you.`
2. `I will wait here until the doctor is free.`
3. `The bank is open till five, so I will go after work.`
4. `Have you eaten your lunch? Not yet, but I will eat at home.`
5. `By the time I finish, the office will be closed.`
6. `Since I came to Delhi I have not met him yet.`
7. `During the meeting I did not speak, but I asked later.`
8. `Whenever I go to the market, I have tea afterwards.`
9. `So far the work is good. Meanwhile you can wait here.`
10. `After the meeting I went home. I will call you later.`

What it teaches: one rule and thirteen surfaces. The rule is NO FUTURE IN A TIME CLAUSE — English
marks the future once, in the main clause, and leaves `when`, `until`, `after`, `as soon as` and
`by the time` in the present — stated as the continuation of L3-M4's `if` rule and paired with it in
`rules[0]`. `rules[1]` names the interference plainly: Hindi marks the future in both halves
(जब मैं पहुँचूँगा तब फ़ोन करूँगा), so the learner's sentence is correct Hindi and wrong English.
`rules[2]` is the adverb trio and its three positions — `already` mid-sentence, `yet` final and only
in a question or a negative, `still` before the main verb and after `be` — of which only `yet` is
opened here. `rules[3]` splits `since`: L3-M7 taught `since` + a point in time, this module teaches
`since` + a CLAUSE with past simple inside it and the perfect outside. `rules[4]` is the free clause
order and the comma a fronted time clause costs.

The thirteen rows: `as soon as`, `until`, `till`, `not yet`, `yet`, `by the time`, `during`,
`whenever`, `afterwards`, `so far`, `meanwhile`, `after`, `later`. Every one came back `free`.

### L4-M7 "Official talk" — the register the learner already speaks

Ten displays:

1. `Your application has been received. Kindly wait at the counter.`
2. `The road is being repaired, so the bus will be late.`
3. `The train to Delhi has been delayed. Kindly see the notice.`
4. `Passengers are requested to proceed to the counter and wait.`
5. `You may pay at the counter. The office is open till five.`
6. `Kindly submit a valid document at the window before five.`
7. `Kindly do the needful and send the documents in advance.`
8. `The class has been cancelled and the notice is on the door.`
9. `There is a long queue at the bank. Kindly wait here.`
10. `Kindly give attention to the announcement. The manager is not available.`

What it teaches: the two passives L3-M8 deferred — the PERFECT passive (`has been` / `have been` +
past participle) and the CONTINUOUS passive (`is being` / `are being` + past participle) — plus the
three habits that make English sound official: AGENTLESS construction (`rules[1]`), the permission
modal `may` (`rules[2]`), and NOMINALISATION, named and given a worked example in `rules[4]` but
deliberately left as a recognition skill rather than a production one.

`rules[3]` is the module's real content and it is written as the brief demands — as a DIALECT, never
as an error. `kindly`, `do the needful`, `revert`, `prepone`, `out of station` are correct in India
and read as archaic, comic or brusque elsewhere; `kindly` and `do the needful` are the two plated as
rows, each with a `usage` and a `trap` in Devanagari saying exactly where they are Indian-only.

The official `shall` is BLOCKED, as the brief instructs, and the block is stated inside `rules[2]`
rather than left implicit: `content:owner` returns `shall  L2-M6`, the suggestion word of
`Shall we go?`, so an official `shall` would hand the learner a "why" note that is false of the
sentence in front of them. The module writes `may` and `are requested to` instead.

Twenty-three rows, all confirmed `free` except `closed` — see the seam correction below.

### L4-M8 "Back then" — the line between a habit and a state

Ten displays:

1. `In those days we would go to my grandmother's house in summer.`
2. `Back then I had a bicycle, but now I take the bus.`
3. `At that time we were poor, and we did not have a car.`
4. `We no longer walk to school. We go by bus these days.`
5. `I do not go to that market anymore. The market has changed.`
6. `My village was small. It is a busy town now.`
7. `I grew up in a village, and my childhood was very happy.`
8. `My father is old now. In those days he would work every day.`
9. `Nowadays everything is expensive. Back then a cup of tea was cheap.`
10. `In my childhood we had one bicycle. These days everything has changed.`

What it teaches: the HABITUAL `would`, and the line that keeps it true — `would` narrates a repeated
ACTION and cannot carry a past STATE. `*I would have a bicycle` and `*we would be poor` are wrong;
a state takes `used to` (L3-M10's row, pointed back at) or the plain past. That split is
`rules[1]`, and because Hindi's करता था covers habits and states with one form (`rules[2]`), it is
also the `mistake` block of S01, S02, S03 and S08 — four of the ten, which is the weight the brief
asks for. `rules[3]` is the then/now frame and `rules[4]` the two retirements: `no longer` before the
main verb, `anymore` at the end of a negative.

**The habitual `would` opens no row.** `content:owner` returns `would  L2-M5` — the `would like` row,
which L3-M4 already borrowed for the conditional — so this is the THIRD job on a row this module does
not own. It is written into `rules[0]` with the pointer back, exactly as the brief instructs, and no
second `would` row exists anywhere in the file. `used to` is likewise left alone at `L3-M10`.

Eighteen rows, all `free`.

### L4-M9 "Places and journeys" — the path lives in the preposition

Ten displays:

1. `We set off early and walked along the river.`
2. `We walked past the school and then crossed the bridge.`
3. `We went through the market and then walked towards the station.`
4. `I reached the station at eight. My brother arrived at nine.`
5. `The journey took a long time, but we reached the city.`
6. `On the way we stopped at a shop in the next street.`
7. `We got there at five and went into the office.`
8. `The road goes up to the bridge and then down to the river.`
9. `We were halfway across the bridge when the rain started.`
10. `The trip was good. We waited on the platform for a long time.`

What it teaches: the PATH PREPOSITION as a fact about the two languages rather than a slogan
(`rules[0]`) — English puts the shape of the path in the preposition and leaves the verb plain, Hindi
puts it in the verb and leaves the postposition general, so one English verb plus six prepositions
does the work of six Hindi verbs. `rules[1]` draws the practical consequence: the preposition cannot
be dropped or guessed. `rules[2]` is the `reach` / `arrive` / `get` plate the brief asks for, all
three authored into one item (S04 and its variations): `I reached the station` with no `at`,
`arrived at the station` / `arrived in Delhi`, `got there`. `rules[3]` records that bare `there` is
this module's, and `rules[4]` that L2-M4's vocabulary transfers untouched — this module is the
telling, not the asking.

Twenty-one rows, all `free`, including the level's happiest find: bare `there`.

### L4-M10 "A story with a twist" — punctuation doing grammar's work

Ten displays (each an account of four to six short sentences; the per-sentence bound applies to each
sentence inside it, as at L3-M10):

1. `At first the man did not speak. He was very quiet. He was waiting for the doctor. I asked him about the time. He did not answer. I felt a bit worried.`
2. `I was working at my table. Suddenly a man shouted behind me. I got up and opened the door. The bus had stopped in the road. It was not a big problem.`
3. `We waited at the station for a long time. The train did not come. At first we were angry. It turned out the train had been cancelled. The notice was on the door.`
4. `At first I did not want to go. But then my friend called me. He said the film was very good. So I went with him. We were late, but we saw most of it.`
5. `The shop was closed when we got there. Luckily the chemist near the station was open. We bought the medicine and came home. It was a long day. But then we had tea and felt better.`
6. `"I will not go," she said. Her brother replied, "Then I will go." At first they were angry. But then they laughed. In the end they went together.`
7. `I noticed a bag under the table. I told the manager about it. He opened it very carefully. It turned out the bag was my brother's.`
8. `We were talking about the film when I realised the time. It was already nine. I had to go home. At first my friends did not want to leave. But then they came with me.`
9. `A stranger was waiting next to me on the bus. He asked me a strange question about the market. At first I was worried. But then I felt better. He was new in the city.`
10. `My cousin smiled and said, "I have a story for you." At first I did not understand. He had found a wallet on the seat. It turned out the wallet was full of money. In the end he gave it back.`

What it teaches: DIRECT SPEECH INSIDE A NARRATIVE, which in English is punctuation doing grammar's
work. `rules[0]` gives the two conventions that are not guessable — the quotation marks enclose the
spoken words and nothing else, and the quoted sentence takes a capital wherever it sits. `rules[1]`
is the one most often lost: the comma goes INSIDE the closing mark before a reporting clause, where
Hindi leaves it outside. `rules[2]` is the inversion rule — `said Rohan` yes, `*said she` never.
`rules[3]` is the interference: कि does the work of both English shapes, so `*He said that "I am
coming"` appears; English takes one or the other and never both. `rules[4]` names the twist markers
and states that every narrative tense underneath is already owned, which is why the whole spend goes
on the quotation and the turn.

**Every rule about English punctuation is written in Hindi, quoting the English marks it describes**
— the brief's §5 warns that this is the module where the language law is easiest to break, and
`rules[1]`, whose whole subject is where a comma sits relative to a quotation mark, is the test case.
The narrative tenses are re-used and not re-opened: past simple as the spine, past continuous for the
setup (S02, S08, S09), past perfect for the reveal (S02, S03, S10). Reported speech stays L3-M5's;
S04 pairs a reporting clause (`He said the film was very good`) against S06's direct line so the
contrast is visible without being re-taught.

Sixteen rows, all `free`.

### Brief seams corrected, and what the emitted index actually said

**Two seam claims are stale, and both are FRESH lists that name a surface an L4 sibling already
owns.** Both were caught only because every claim was re-asked of `content:owner`; a grep would have
found the words and told the author nothing about who holds them.

**1. M6's brief lists `earlier` as fresh. It is not — L4-M3 owns it.**

> `earlier  L4-M3`

M6's INDEX SEAM note ends its FRESH list with "… `meanwhile`, `so far`", and `earlier` sits inside
that same run of time adverbs. The brief was written before Wave 2 shipped, and L4-M3's
counterfactual module spent `earlier` on `I should have called you earlier`. The fix is one line:
M6 opens `later` and does NOT open `earlier`, and the `later` row's note carries the pointer —
"इसका उल्टा `earlier` L4-M3 का है." Nothing else in M6's fresh list moved; the other twelve came
back `free`:

> `until  free` · `till  free` · `yet  free` · `not yet  free` · `as soon as  free` ·
> `by the time  free` · `during  free` · `whenever  free` · `afterwards  free` · `later  free` ·
> `meanwhile  free` · `so far  free`

**2. M7's brief lists `closed` as fresh. It is not — L4-M1 owns it.**

> `closed  L4-M1`

Same shape of staleness, same cause: L4-M1 ("Explaining how") shipped `closed` in Wave 1. M7 does not
open a `closed` row; the word is simply used where it is needed (and it is used in M6-S05 too,
`the office will be closed`, resolving to L4-M1). The rest of M7's fresh list is right:

> `kindly  free` · `may  free` · `counter  free` · `queue  free` · `submit  free` ·
> `application  free` · `notice  free` · `announcement  free` · `delayed  free` ·
> `cancelled  free` · `proceed  free` · `valid  free` · `document  free` · `documents  free` ·
> `passengers  free` · `attention  free` · `available  free` · `in advance  free` ·
> `do the needful  free` · `has been  free` · `have been  free` · `is being  free`

**Everything the four other seam notes claim is true today.** M6's owned pointers:

> `while  L3-M10` · `already  L3-M10` · `since  L3-M7` · `before  L3-M10` · `still  L3-M10` ·
> `when  L2-M10` · `for  L3-M7` · `ago  L3-M10` · `then  L1-M10` · `just  L1-M8` · `as  L2-M9` ·
> `time  L3-M4` · `by  L2-M4`

M6's note that "four of the five words in this module's own job line are already owned" is exactly
right, and it is the level's most useful seam: `while`, `already`, `since` and `before` are all
spoken for, so the module's whole budget went on the tense rule and on `until`/`yet`, the two the
job line still had. M7's owned and blocked pointers:

> `please  L1-M8` · `form  L3-M8` · `required  L3-M8` · `sign  L3-M8` · `signature  L3-M8` ·
> `receipt  L3-M8` · `card  L3-M8` · `id  L3-M8` · `pay  L3-M8` · `office  L3-M1` ·
> `window  L2-M1` · `bank  L1-M7` · `be  L3-M8` · `must  L3-M8` · `apply  L3-M2` ·
> `excuse me  L2-M1` · `would you mind  L2-M1` · **`shall  L2-M6`**

M8's, including the two rows it is explicitly forbidden to re-open:

> **`used to  L3-M10`** · **`would  L2-M5`** · `back  L2-M7` · `young  L2-M2` · `school  L1-M4` ·
> `never  L1-M4` · `always  L1-M4` · `usually  L1-M4` · `hardly ever  L3-M1` · `every day  L3-M1` ·
> `still  L3-M10` · `before  L3-M10`

and its fresh list is right down to the last key: `back then`, `in those days`, `at that time`,
`no longer`, `anymore`, `these days`, `nowadays`, `childhood`, `village`, `grew up`, `old` and
`changed` all came back `free`.

M9's brief is the wave's most accurate, and its headline claim holds:

> `there  free`

L1-M7 indexed `there is`, `there are` and `there's` WHOLE and never spent the bare key, so the place
adverb is genuinely M9's, thirty-two modules later — the multi-token policy working exactly as
intended. Its other fresh keys are all `free` (`along`, `across`, `past`, `through`, `towards`,
`into`, `onto`, `up`, `down`, `trip`, `journey`, `arrive`, `reach`, `cross`, `set off`,
`on the way`, `halfway`, `platform`, `bridge`, `river`, `street`), and its owned list is right:

> `station  L2-M4` · `bus  L2-M4` · `train  L2-M4` · `ticket  L2-M4` · `road  L2-M4` ·
> `corner  L2-M4` · `left  L2-M4` · `right  L2-M4` · `straight  L2-M4` · `far  L2-M4` ·
> `opposite  L2-M4` · `get on  L2-M4` · `get off  L2-M4` · `turn  L2-M4` · `by  L2-M4` ·
> `get  L2-M4` · `near  L1-M7` · `next to  L1-M7` · `took  L2-M10` · `walked  L3-M10` ·
> `city  L3-M10` · `go  L1-M4` · `way  L4-M1`

with one refinement worth recording, because it is the same class of trap: the brief says "`get`
… → L2-M4", and `get` is indeed L2-M4's, but **`got` is L2-M2's**:

> `get  L2-M4` · `got  L2-M2`

M9-S07's `We got there at five` therefore rests on two different owners for what a learner reads as
one word. Nothing needed changing — both are taught — but the module opens no `get` row, and this is
why. M10's seam note is fully correct:

> `said  L2-M10` · `told  L2-M10` · `asked  L3-M5` · `in the end  L3-M10` · `opened  L2-M10` ·
> `phone  L2-M7` · `door  L1-M7` · `bag  L1-M7` · `sorry  L1-M10` · `finally  L2-M10` ·
> `first  L2-M10` · `at  L1-M4`

and every one of `suddenly`, `it turned out`, `at first`, `but then`, `luckily`, `shouted`,
`replied`, `noticed`, `realised`, `stranger`, `strange` and `quiet` came back `free`.

**Two authoring corrections the shown-surface check made, both worth recording:**

**`notice` is a paradigm hole in M10.** M10-S07 teaches the verb `noticed`, and its forms list was
first written as the full paradigm `["notice", "noticed", "notices"]`. `npm run content:shown` came
straight back with `RE-TEACH L4-M10-S07 "notice": L4-M7 owns the key` and the same for `notices` —
M7 opened the NOUN `notice` three modules earlier, in the same level. This is the en-it `sarei` case
in an English course: a complete-looking paradigm that swallows a cell a nearer module owns. The
forms list is now `["noticed"]` alone, and the row's note says why — "सादा `notice` L4-M7 की सूचना
वाली पंक्ति है, इसलिए यहाँ सिर्फ़ बीता रूप खुलता है." A level never edits a file below it, and this
is the same rule applied sideways.

**`going` is untaught after thirty-nine modules.** M10-S06's direct line was first authored as the
textbook `"I am not going," she said.` — and `content:shown` returned `SHOWN-BUT-UNTAUGHT
L4-M10-S06: going`. `content:owner` explains it: L1-M4's `go` and `goes` are indexed, L1-M6's
`going to` is indexed WHOLE and L4-M3 spent `gone`, but the bare present participle has never been
spent by any of the thirty-nine modules before this one. Opening it here would have been a fresh surface bought to
serve one quotation, in the module whose whole point is that almost nothing in it is new. The line
is now `"I will not go," she said.`, which needs nothing untaught, keeps the contrast with the
brother's `"Then I will go."` and shows the comma inside the closing mark just as well. `rules[1]`
quotes the same corrected line, so the rule and the display agree.

### The ratchet

`npx vitest run tools/shown-surfaces.test.ts` → **11 passed (11)**. hi-en **holds at 30**, its
baseline, and the five new modules contribute **zero** findings. (Mid-wave this run showed one
failure, on **`en-de`** — `expected 12 to be less than or equal to 11` — a sibling course this wave
never touched; it was green again once that course's own agent landed. Scoped to this course,
`npx vitest run tools/shown-surfaces.test.ts -t "hi-en"` → **1 passed, 10 skipped (11)** throughout.) Every token of all fifty displays, one hundred and fifty variations and sixty comprehension
items resolves in the fold. No baseline was lowered — this wave fixed no pre-existing finding — and
none was raised.

`npm run content:shown -- hi-en <id>` is clean for all five, with **no `RE-TEACH` and no
`COLLIDES INSIDE THIS MODULE` left standing**:

> `L4-M6: clean — every shown surface resolves` · `L4-M7: clean …` · `L4-M8: clean …` ·
> `L4-M9: clean …` · `L4-M10: clean …`

The two findings this wave DID produce — the `notice` re-teach and the `going` shown-but-untaught —
are recorded above and were fixed in the content, not waived.

`npm run content:validate` → **`CONTENT 358/358 ok`** (the denominator moves as the wave's sibling
courses land — it read 352/352 when these five first went in; every file in it is `ok`).

`npx vitest run src/course/types.test.ts` → **376 passed, 3 failed (379)**, and all three failures
are the parent's census assertions, moving under the wave's other courses: the module list
(`expected […(358)] to deeply equal […(354)]`), the en-ar count (`expected 40 to be 39`) and the
en-ko count. None is hi-en's. The hi-en block itself is green —
`npx vitest run src/course/types.test.ts -t "keeps the English course the other way round"` →
**1 passed, 380 skipped (381)** — and its own count assertion already reads 40, so the whole hi-en
language law (#270) ran against these five files: `display`, `mistake.display`, every `variations[].display`
and every word `display` and `forms` entry are Devanagari-free; `cue`, `literal`, `sound`, `usage`,
`mnemonic`, `trap`, `mistake.why`, every variation `cue` and `changed`, every word `cue` and every
one of the ninety-one word `note`s carry Devanagari. No `glossEn` and no curly apostrophe anywhere —
M10 uses straight `"` throughout, which matters here more than in any other module of the course.
Every note is inside the 200-character ceiling; the longest is 104 (M6-S07, `during`). The census
numbers in that file are the parent's and this wave did not touch them.

Bounds: no display exceeds its module's `maxWordsPerSentence` (M6 and M7 peak at 12 against 13; M8
and M9 at 13 against 14; M10 at 11 against 14, measured per inner sentence as at L3-M10).
`minWordsPerSentence` was set from the content rather than guessed — 5, 3, 4, 4 and 3 — because M7's
announcements and M10's narrative both chain genuinely short sentences. New-word counts are 13, 23,
18, 21 and 16 against a `newWordCap` of 25 apiece.

### Open questions for the native-speaker gate

These continue the chain; the last number used before this wave was 90.

91. **`Not yet` as a full turn** (M6-S04). The display answers `Have you eaten your lunch?` with a
    two-word fragment. Confirm this is what a Hindi speaker actually wants to be given — अभी नहीं is
    the cue — and that teaching the fragment before the full `I have not eaten yet` is the right
    order rather than the reverse.

92. **`till` taught as a separate row from `until`** (M6-S03). The note says they are the same word
    with different registers. Confirm that a learner in India meets `till` often enough to earn its
    own row, and that `till five` rather than `until five` is the form heard at a bank window.

93. **`So far the work is good`** (M6-S09). `so far` is authored with the present simple rather than
    the perfect that most textbooks pair it with (`So far the work has been good`). Confirm the
    plain present reads as natural spoken English here, and whether the perfect should be the taught
    default instead.

94. **`kindly` plated as a dialect marker rather than an error** (M7, `rules[3]`, S01, S03, S06,
    S07, S09, S10). Six of the ten displays open with `Kindly`, which is deliberate — this is the
    register the learner will hear at a counter. Confirm the density is right and does not read as
    the course endorsing `kindly` for use abroad, given the `trap` and `usage` fields say the
    opposite in Devanagari.

95. **`do the needful` given a whole row** (M7-S07). The brief calls it "the only honest way to index
    an idiom whose parts mean nothing separately". Confirm a Hindi-speaking learner recognises it,
    and that the Devanagari gloss जो ज़रूरी हो कर दीजिए is what they would say back.

96. **`The manager is not available` as the office register for "he is not here"** (M7-S10). The
    `trap` steers away from `is not there`. Confirm `not available` is what is actually said at an
    Indian office counter rather than a textbook form.

97. **`valid` glossed as चालू** (M7-S06). चालू carries other senses in Hindi. Confirm this is the
    right gloss for a document or ticket that has not expired, or whether मान्य would land better.

98. **The habitual `would` reached only through `rules[0]`** (M8, all ten items). Because `would` is
    L2-M5's row, a learner tapping `would` in `we would go` is shown the `would like` note, not the
    habitual one. The rule carries the teaching, but confirm that the tap experience is acceptable —
    this is the sharpest case in the course of a rule doing a row's job.

99. **`would` refused for states, in four `mistake` blocks** (M8-S01, S02, S03, S08). English usage
    is not perfectly tidy here (`we would be poor` is at least arguable in some registers). Confirm
    that teaching the hard line is the right call for a Hindi speaker whose करता था does not split,
    and that the four repetitions are not one too many.

100. **`town` opened as a third size between `village` and `city`** (M8-S06). Hindi क़स्बा exists but
     is not always reached for. Confirm that the three-way distinction is worth a row, and that
     क़स्बा is the gloss rather than a description.

101. **`grandmother` glossed as दादी या नानी on one row** (M8-S01). The note says English does not
     distinguish them. Confirm that collapsing the two is acceptable at this level, and that the
     display's `my grandmother's house` reads as नानी का घर to a learner rather than forcing a
     choice the English does not make.

102. **`reached` with no preposition, against `arrived at` and `got to`** (M9-S04, `rules[2]`). All
     three are authored into one item. Confirm the three-way plate is the right shape, and that
     `I reached the station` — not `I reached at the station` — is the form worth putting first for
     a speaker whose पहुँचना takes पर.

103. **`towards` taught as direction-without-arrival** (M9-S03). The `trap` says `walked to the
     station` and `walked towards the station` are not the same. Confirm this distinction survives
     in ordinary spoken English, or whether it is a written-register nicety that will mislead.

104. **Bare `there` opened thirty-two modules after `there is`** (M9-S07, `rules[3]`). Confirm that a
     learner who has used `there is` since L1-M7 will read the new row as a different word rather
     than as a correction of what they already know, and that the note's wording carries that.

105. **`up` and `down` for a road's gradient** (M9-S08). `The road goes up to the bridge` uses the
     path sense rather than the literal vertical one. Confirm this is natural, and that it does not
     collide in a learner's head with L1's `get up` and `wake up`, which the note explicitly
     separates.

106. **The comma inside the closing quotation mark** (M10-S06, `rules[1]`). This is the single most
     mechanical thing in the module and the one an Indian-schooled writer is most likely to have
     been taught the other way. Confirm the rule as stated matches what is expected of the learner,
     and that the Hindi wording — विराम भीतर आता है — is unambiguous.

107. **`"I will not go," she said` in place of `"I am not going," she said`** (M10-S06). The line
     was changed because bare `going` is untaught (see the seam section). Confirm the replacement
     carries the same conversational force in the quoted turn, and does not read as stilted next to
     the brother's `"Then I will go."`

108. **`It turned out` glossed as पता चला कि** (M10-S03, S07, S10). Three of the ten items use it,
     which makes it the module's spine. Confirm the gloss, and that three uses is the right weight
     rather than one too many for a single twist marker.

109. **`stranger` against `a strange man`** (M10-S09, `trap`). The pair is authored as a warning.
     Confirm that a Hindi speaker actually reaches for `strange` when they mean अनजान, or whether
     the trap is defending against a mistake they would not make.

110. **`realised` against `understood`** (M10-S08). The note draws the line as sudden against
     gradual. Confirm the split is real enough to teach, and that समझ में आना does not simply cover
     both — in which case the note is inventing a distinction the learner will not feel.
