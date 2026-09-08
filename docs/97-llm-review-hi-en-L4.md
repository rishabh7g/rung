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
