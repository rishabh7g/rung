# hi-en L4 — the authoring-brief decisions (#522)

The ten hi-en L4 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['hi-en']` L4-M1…L4-M10) are
written the day L3 closed. Every seam below was pinned against the REAL cumulative index — the
fold of `public/content/hi-en/index/L1-M1.json` through `L3-M10.json`, read on **2026-09-08** with
`npm run content:owner`, which reported

> `802 surfaces owned, folded over 30 modules through L3-M10`

and a **`maxSpan` of 4**, set by L3-M4's `if i were you` (computed over the same fold; the other
long keys are the three-token `in front of`, `can i have`, `go to bed`, `i'm afraid not`,
`to be honest`, `fill it in`, `hand it in`, `send it off`, `in the end`, `a lot of`, `get out of`,
`i have got`, `thanks a lot`, `would you mind`, `would you like`, `in the morning`). Not 513, which
is what L3 was planned against (`docs/71`), and not a remembered figure. The review chain the level
inherits is `docs/39` (spoken English for Hindi speakers), `docs/27` (register), `docs/63` (L2) and
`docs/79` (L3), whose open questions end at **46**.

This note records the decisions the briefs are written to, so the authoring waves inherit them
without re-deriving anything. The briefs repeat each decision in the module notes, because a prompt
only ever shows an author the notes.

## 1. This course's asymmetry at L4 — the delta stops being a form and becomes a REGISTER

`docs/71` §1 restated hi-en's inversion: the target is English, so the interesting facts are what
English FORBIDS where Hindi allows it. L1–L3 spent that on FORMS — `*I am knowing`, `*informations`,
`*I am agree`, `*I am boring`, `*if it will rain`. Those are the four or five marks an English ear
catches in the first sentence, and they are gone.

What is left at L4 is not a smaller set of the same kind. It is a different kind: the learner now
builds correct sentences that land wrong. Five of the ten modules carry one:

- **The doubled connector** (M2). Hindi says both halves — क्योंकि … इसलिए — and English permits
  one. `*Because it was raining, so I stayed home` is two correct English words in one impossible
  join, and it is among the most recognisable Indian English shapes there is.
- **`however` in the conjunction slot** (M4). फिर भी and लेकिन both drop into the joining slot, so
  `*I was tired, however I went` is what a Hindi speaker writes. It is a punctuation fact, not a
  vocabulary one, which is why M4 teaches the ADVERB CLASS rather than a word list.
- **The Indian-English softeners** (M5). `actually`, `only`, `itself`, `na` read as gentle to the
  speaker and as something else to a British or American ear — fronted `actually` most often
  signals a contradiction coming. Nothing here is an error; the delta is the AUDIENCE.
- **Indian official English** (M7). `kindly`, `do the needful`, `revert`, `prepone`, `intimate`,
  `the same`, `out of station`. Every one is correct in India and marked elsewhere, and `kindly` is
  the one to plate because कृपया makes it feel like ordinary courtesy.
- **`*I reached at the station`** (M9). पहुँचना takes पर; `reach` is transitive in standard English.
  One stray preposition, caught immediately.

The rule the briefs take from this, and the reason M5 and M7 are written the way they are: **these
are named as marked, never as wrong.** The course's Indian-English rule already works this way
everywhere else, and a module that told a learner their own English was a mistake would be both
false and useless to them.

Where Hindi HELPS, the briefs say so rather than warning anyway — `docs/71`'s standing instruction.
Three places where it genuinely does: the counterfactual EXISTS in Hindi and is used as freely
(M3 — अगर मैं जल्दी जाता तो …, so the learner is learning a shape and not an idea); तक maps onto
`until` and a time clause may be fronted in both languages (M6); and the then/now contrast is
identical, पहले … अब … in the same order with the same weight (M8).

## 2. What L3 withheld, and where it lands

`docs/71` §2 and the L3 briefs named four things as L4's, and each has an owner:

- **The third conditional → L4-M3.** L3-M4's note names it explicitly ("the third conditional
  (if I had known, I would have come) is L4-M3's, named here as deferred, because a module that
  taught all three would teach none of them"). M3 collects the debt and adds the perfect modals
  beside it.
- **The perfect and continuous passive → L4-M7.** L3-M8 taught the passive in three tenses only —
  present, future, modal — and named the other two as L4's. M7 takes them, because an announcement
  and a counter are where a learner actually MEETS `has been received` and `is being repaired`.
- **The experience use of the present perfect** — L3 said no module needed it. L4 does not need it
  either; it goes to L5 with a reason in §5.
- **`used to`** was NOT withheld. L3-M10 shipped it, which is the fact that decides M8's shape —
  see §3.

## 3. Seams — what the index actually said

Every claim in this section was produced by `npm run content:owner -- hi-en "<surface>" …` on
2026-09-08, against the 802-surface fold. Four of them contradicted a first instinct, and those are
listed first because they are the ones that would have shipped a sentence onto an untaught word.

### 3.1 The four the index corrected

1. **`used to` is L3-M10's, so M8 cannot own the habitual past.** The obvious brief for "Back then"
   opens with `used to`. `content:owner` says `used to → L3-M10`, first shown at `L3-M10-S01`
   (`I used to walk to school.`). So M8's habitual verb is **`would`** instead — which is itself
   `L2-M5`'s row (`would like`), already borrowed once by L3-M4 for the conditional. The habitual
   `would` is the THIRD job on a row M8 does not own, so the brief tells the author to write it in
   `rules[].text` and point back, never to open a second `would`. The module is better for it: the
   rule that `would` narrates repeated ACTIONS and cannot carry past STATES (`*I would have a
   bicycle`) is the line most teaching blurs, and it is only reachable because `used to` is already
   on the board to contrast with.

2. **Four of the five words in M6's own job line are already owned.** levels.json's job for
   "Before and after" reads "Time clauses: while, until, since, already, not yet".
   `content:owner` returned `while → L3-M10`, `already → L3-M10`, `since → L3-M7`,
   `before → L3-M10`, `still → L3-M10`; only `until` and `yet` / `not yet` came back `free`.
   L3-M10 spent them on its accounts — `while` as the past-continuous background, `already` as the
   past-perfect adverb, `before` as the subordinator that pulls the past perfect. So M6 is not a
   vocabulary module at all. Its budget goes on the TENSE RULE — no future in a time clause — which
   is L3-M4's `no will after if` one level on, applied to `when`, `before`, `after`, `until`,
   `as soon as` and `by the time`. That is a better module than the one the job line suggests, and
   the index is what found it.

3. **`have` and `has` are L1-M4's, not L2-M8's.** `docs/71` §3 records "`have` / `has` stays
   L2-M8's perfect-auxiliary row". The index disagrees: `content:owner` reports `have → L1-M4` and
   `has → L1-M4` — the POSSESSION row, the one the `*I am having` trap needs. First occurrence
   wins, so L2-M8's perfect auxiliary inherited L1-M4's note rather than opening its own. This is
   not a tidiness point at L4: it is why `would have`, `should have`, `could have`, `might have`
   (M3) and `has been` / `have been` (M7) MUST index whole. An auxiliary `have` inside
   `I would have gone` that resolved to `have` would show the learner a note about owning things.

4. **`seems` is L2-M8's, not L3-M3's.** L3-M3's own INDEX SEAM note lists `seems` among its fresh
   keys. `content:owner` reports `seem → L2-M8` and `seems → L2-M8`. M5, which reaches for `seems`
   in a hedge, points back at L2-M8 and does not repeat L3-M3's claim. Recorded here rather than
   fixed there: **a level never edits a file below it**, and the L3 brief's note is wrong about the
   index, not the content.

### 3.2 The one the index made possible

**Bare `there` is FREE.** `content:owner` reports `there → free`, thirty modules in, because L1-M7
indexed `there is`, `there are` and `there's` WHOLE and never spent the bare key. The place adverb
— `get there`, `over there` — is therefore M9's to open, which is exactly what the multi-token
policy was for (`tools/course-briefs.ts`, hi-en decision 3). Nothing had to be re-planned to make
it available; it simply had never been claimed.

### 3.3 Rows doing another job, and where the rule goes

First occurrence wins, so a later module that needs a second job on an owned surface writes the
rule in `rules[].text` and points back. The L4 list:

| surface | owner | the job L4 gives it | module |
| --- | --- | --- | --- |
| `to` | L1-M3 (`want to`) | infinitive of purpose — its fourth job, after `go to school` and `to the shop` | M1 |
| `turn` | L2-M4 (direction) | turning a switch | M1 |
| `so` / `because` | L1-M9 | the same consequence job, run across a paragraph — the note is already true | M2 |
| `would` | L2-M5 (`would like`) | `would have` (M3, whole) and the habitual `would` (M8) | M3, M8 |
| `still` | L3-M10 (a habit that continues) | concessive `still` | M4 |
| `since` | L3-M7 (duration with `for`) | a since-CLAUSE — past simple inside, perfect outside | M6 |
| `be` | L3-M8 (the passive) | the perfect and continuous passive | M7 |

### 3.4 Blocked surfaces — words no L4 display may write

Each is owned with a job that would make the learner's tap show a false note, and no L4 module may
show it:

- **causal `since`** and **causal `as`** (M2 would reach for both). `since → L3-M7` is duration;
  `as → L2-M9` is comparison. Both wait for L5.
- **official `shall`** (`Applicants shall submit two copies`, M7). `shall → L2-M6` — the suggestion
  word of `Shall we go?`. M7 writes `may` and `are requested to` instead.
- **`until` in M1.** Free today and M6's; a shown surface is a taught surface (#491), so an
  instruction module that wrote `boil until soft` would spend the key M6 is built on.
- **`would've` / `should've` as DISPLAY spellings** (M3). The reduction is real and belongs in the
  `sound` line in Devanagari; in display it would open a second key for a word M3 has just taught.

### 3.5 Multi-token surfaces, and one hyphen warning

Every phrase below indexes WHOLE, and the brief names the word each one protects:
`so that`, `in order to`, `make sure` (M1); `because of`, `due to`, `as a result`, `that is why`,
`for this reason`, `end up` (M2); `would have`, `should have`, `could have`, `might have`,
`if only`, `instead of` (M3); `on the other hand`, `the point is`, `at least`, `even if`,
`of course` (M4); `not really`, `a bit`, `not sure`, `I would say` (M5); `not yet`, `as soon as`,
`by the time`, `so far` (M6); `in advance`, `do the needful`, `has been`, `have been`, `is being`
(M7); `back then`, `in those days`, `at that time`, `no longer`, `these days` (M8); `set off`,
`on the way` (M9); `it turned out`, `at first`, `but then` (M10).

`on the other hand` and `I see your point` are four tokens, so **`maxSpan` stays 4** — L3-M4's
`if i were you` already set it and L4 adds no longer span.

The hyphen seam is live in this course and M4 is where it bites, because a persuading register
invites compounds. `surfaceIndexKeys` splits hyphens, so a hyphenated compound grants no whole key
but its PARTS resolve: `content:owner` returned

> `so-called    free   [parts: so → L1-M9, called → L2-M10]`

and L1-M9's consequence note is false of `so-called`. The rule for L4: **avoid hyphenated compounds
whose parts are owned with another job.**

## 4. The shape of the level, module by module

Bounds climb **12 → 14**, continuing L3's 10 → 12: **M1–M3 at 12, M4–M7 at 13, M8–M10 at 14**. The
climb is placed where the sentences genuinely lengthen — M1's instructions are short by nature and a
bound is a maximum rather than a target, while M7's announcements and M9's journey account carry
subordinate clauses that cannot be said in twelve words. `newWordCap` stays the PRD §5 **25**
everywhere; pools are authored to 12. Two modules will spend far less than 25 and that is the point
of them: M6 opens about a dozen keys because L3-M10 owns its job line, and M9 opens almost no nouns
because L2-M4 owns them.

- **M1 Explaining how** (12) — owns the BARE IMPERATIVE and the INFINITIVE OF PURPOSE. It sits
  first because it is the only L4 job that needs no new tense: the learner already has everything
  except the one place English drops the subject it otherwise insists on, and the के लिए → `to` + V
  correction (`*for washing the clothes`). Fresh: `press`, `add`, `mix`, `pour`, `boil`, `cut`,
  `step`, `way`, `so that`, `in order to`, `make sure`, `carefully`, `slowly`, `properly`.
- **M2 Cause and consequence** (12) — owns the SYNTACTIC CLASS of the connector: subordinator,
  coordinator, preposition, sentence adverb, one per plate. It sits second because M1's `so that`
  has just separated purpose from result, and because the doubled connector is the level's first
  register error. Fresh: `because of`, `due to`, `as a result`, `therefore`, `that is why`,
  `reason`, `result`, `cause`, `effect`, `otherwise`, `end up`.
- **M3 What might have been** (12) — owns the THIRD CONDITIONAL and the perfect modals. It sits
  third because L3-M4 named it deferred to here and because M2's causal chain is what a
  counterfactual reverses. Fresh: `would have`, `should have`, `could have`, `might have`, `wish`,
  `regret`, `instead`, `if only`, `might`, and every past participle it shows.
- **M4 Persuading** (13) — owns the CONCESSIVE SENTENCE ADVERB and its punctuation. It sits fourth
  because it is M2's adverb-class rule applied to a second family, and the two next to each other is
  what makes the class visible. Fresh: `however`, `on the other hand`, `the point is`, `at least`,
  `even if`, `admit`, `fair`, `worth`, `imagine`, `of course`.
- **M5 Disagreeing well** (13) — owns ENGLISH HEDGING at length and the Indian-English softeners.
  It sits immediately after M4 because the pair is the point: M4 is the confident register, M5 the
  careful one, and splitting them that way is why both fit in ten sentences. Fresh: `maybe`,
  `perhaps`, `probably`, `possibly`, `actually`, `not really`, `a bit`, `not sure`, `I would say`,
  `suppose`, `slightly`, `exactly`, `quite`.
- **M6 Before and after** (13) — owns **no future in a time clause**, and `until`, `yet`,
  `as soon as`, `by the time`, `during`, `whenever`, `so far`, `meanwhile`, `later`, `earlier`,
  `afterwards`. It sits at the level's middle because it is L3-M4's `no will after if` a level on,
  and pairing the two rules explicitly is what makes either stick.
- **M7 Official talk** (13) — owns the PERFECT and CONTINUOUS PASSIVE, permission `may`, and the
  Indian official register. It is the level's RECEPTION module: most of its sentences are heard or
  read, so its pool and comprehension items carry more of the load than anywhere else in L4. Fresh:
  `kindly`, `may`, `counter`, `queue`, `submit`, `application`, `notice`, `announcement`,
  `delayed`, `cancelled`, `proceed`, `valid`, `document`, `passengers`, `attention`, `available`,
  `in advance`, `do the needful`.
- **M8 Back then** (14) — owns the HABITUAL `would` and the then/now frame. See §3.1(1) for why it
  cannot own `used to`. Fresh: `back then`, `in those days`, `at that time`, `no longer`,
  `anymore`, `these days`, `nowadays`, `childhood`, `village`, `grew up`, `old`, `changed`.
- **M9 Places and journeys** (14) — owns the PATH PREPOSITION (`along`, `across`, `past`, `through`,
  `towards`, `into`, `up`, `down`), bare `there`, and the `reach` / `arrive at` / `get to` split. It
  sits ninth because it is the first module that needs a route AND a narrative at once, which is the
  rehearsal M10 needs. Fresh also: `trip`, `journey`, `arrive`, `reach`, `cross`, `set off`,
  `on the way`, `halfway`, `platform`, `bridge`, `river`, `street`.
- **M10 A story with a twist** (14) — owns DIRECT SPEECH INSIDE A NARRATIVE: the quotation marks,
  the comma inside the closing mark, the capital in the quote, and the inversion that is allowed
  with a full noun (`said Rohan`) and forbidden with a pronoun (`*said she`). Items are six-sentence
  accounts and **the per-sentence bound applies INSIDE the account**, as at L3-M10. Its best plate is
  the pair with L3-M5: what he actually said against how you report it, so the backshift is
  rehearsed without being re-taught. Fresh: `suddenly`, `it turned out`, `at first`, `but then`,
  `luckily`, `shouted`, `replied`, `noticed`, `realised`, `stranger`.

## 5. What L4 defers to L5, with reasons

- **Mixed conditionals** (`if I had studied, I would be a doctor now`) → L5. M3 already asks the
  learner to hold two past participles and a modal in one sentence; a mixed conditional adds a
  second time frame to that and would cost M3 its rule.
- **Causal `since` and causal `as`** → L5-M6 (`Arguing a position`), because that is the first
  module whose register actually wants them, and by then a second note on an owned row can be
  planned as part of a level rather than smuggled into one.
- **The experience use of the present perfect** (`Have you ever been to Delhi?`) → L5. No L4 job
  needs it. M8 is the module that attracts it, and M8's job is the contrast, not the inventory.
- **Producing formal writing at length** — a toast, a condolence, a notice of one's own → L5-M4.
  M7 teaches the learner to READ and ANSWER the official register; writing it is a different skill
  and a different module.
- **Sarcasm, irony and implication** → L5-M7. M5's hedges attract them and they are the exact
  opposite lesson: M5 teaches how to be understood while softening, L5-M7 how meaning survives being
  left unsaid.
- **A change of register midway through a piece** → L5-M10, which exists for it.
- **The bare official `shall`** → whichever L5 module can afford to re-point L2-M6's row, or never.
  See §3.4.

## 6. Open questions for the native-speaker gate

Numbering continues this course's chain; `docs/79` ends at 46. **The native-speaker gate is a
separate, stricter bar and it is unmet** — nothing below may be closed by rewriting a shipped
module.

47. **The doubled connector as the level's opening error** (M2). `*Because it was raining, so I
    stayed home` is presented as the single most recognisable Indian English join. Confirm it is
    heard that often, and that the corrected pair (`Because it was raining, I stayed home` /
    `It was raining, so I stayed home`) is the right pair to plate.
48. **`for` + `-ing` against `to` + V** (M1). The brief states that `for washing the clothes` names
    an object's function and never an actor's purpose. Confirm the rule holds as written for a
    fluent ear, and that `*For washing the clothes, add one spoon` is the shape a Hindi speaker
    actually produces.
49. **The bare imperative and the L2-M1 politeness scale** (M1). M1 re-runs L2-M1's law on
    instructions: `Press it` → `Please press it` → `Could you press it?`. Confirm the three tiers
    chip `informal` / `neutral` / `formal` correctly when the sentence is an instruction rather
    than a request.
50. **`however` as a non-conjunction** (M4). Confirm that `*I was tired, however I went` reads as an
    error rather than as informal, and that the full-stop-or-semicolon rule is worth a whole plate
    at this level.
51. **Fronted `actually`** (M5). The brief says fronted `actually` signals a contradiction in most
    other Englishes and softens in Indian English. Confirm both halves, and whether the course
    should teach a replacement (`to be honest`, already L3-M3's) or only the warning.
52. **The Indian-English softener set** (M5). `only`, `itself`, `na` — confirm the list is right and
    that naming them in `usage` without calling them wrong is the tone the gate wants.
53. **`kindly`** (M7). The brief calls it the strongest marker in Indian official English and says
    कृपया is why it feels neutral to the learner. Confirm it is heard as archaic or brusque outside
    India, and confirm `please` is the replacement in every counter context.
54. **`do the needful`, `revert`, `prepone`, `intimate`, `the same`, `out of station`** (M7).
    Confirm each belongs in a RECEPTION module (heard and read, not produced), and confirm none has
    become unmarked in international English.
55. **The perfect and continuous passive at a counter** (M7). Confirm `Your application has been
    received` and `The road is being repaired` are the two shapes a learner actually meets, and that
    three tenses of passive at L3 plus two here is the whole set a speaker needs.
56. **Habitual `would` against past states** (M8). The brief forbids `*I would have a bicycle` and
    `*we would be poor`. Confirm the split is as sharp as stated, and that a state really does need
    `used to` or the plain past simple.
57. **`no longer` against `not … anymore`** (M8). The brief places `no longer` before the main verb
    and `anymore` at the end of a negative. Confirm the positions, and confirm `anymore` as one word
    is the right display spelling for this course.
58. **`reach` / `arrive at` / `get to`** (M9). Confirm `*I reached at the station` is the marker the
    brief claims, and that all three corrected forms differ in register rather than in meaning.
59. **The path prepositions as a closed set** (M9). `along`, `across`, `past`, `through`, `towards`,
    `into`, `up`, `down` — confirm this is the set a journey account needs, and that the
    verb-plain / preposition-carries-the-path description is true rather than merely memorable.
60. **The comma inside the closing quotation mark** (M10). The brief teaches
    `"I am not going," she said.` Confirm the house convention for this course (the comma inside,
    the full stop inside, double quotation marks rather than single), since the choice will be
    copied by every later narrative module.
61. **`said Rohan` but not `*said she`** (M10). Confirm the inversion is available with a full-noun
    subject and blocked with a pronoun, and that it is worth teaching at all rather than deferring
    to L5.
62. **Bare `there`, opened at M9** (M9, §3.2). Thirty modules of `there is` / `there are` have not
    spent the key. Confirm `get there` and `over there` are the right first uses, and that no
    earlier module should have had it.

`npm run content:prompt -- hi-en L4-M1` renders from the real index once the briefs are merged, and
the bounds, the withheld-piece owners, the five register markers and the L5 deferrals are the
decisions `tools/course-briefs.test.ts` should pin for this level.
