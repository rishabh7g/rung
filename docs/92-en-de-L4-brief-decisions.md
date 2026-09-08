# en-de L4 — the authoring-brief decisions (#526)

The ten en-de L4 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['en-de']` L4-M1…L4-M10) are the
first L4 briefed for this course, written the day L3 closed on all nine courses. Every seam below
was pinned against the REAL cumulative index — the fold of `public/content/en-de/index/L1-M1.json`
through `L3-M10.json`, read through `npm run content:owner` on 2026-09-08:
**686 surfaces, maxSpan 3, folded over 30 modules through L3-M10** (L1 closed at 203, L2 at 467, so
L3 added 219). It is planned against the review chain the level inherits: `docs/46` (spoken German),
`docs/59` (the L2 decisions and the seven index rules), `docs/75` (the L3 decisions) and `docs/83`'s
fifty open questions.

Every INDEX SEAM claim in the briefs was checked with `npm run content:owner -- en-de "<surface>"`,
not inferred from the L3 briefs' own seam lists — which is how three of the errors in §3 were found,
since a brief's prediction of what it would mint is not evidence that it minted it.

This note records the decisions the briefs are written to, so the authoring waves inherit them
without re-deriving anything. The briefs repeat each decision in the module notes, because a prompt
only ever shows an author the notes.

## 1. Register — L4 adds one value and spends it in one module

`docs/59` §1 settled `Sie`, `docs/75` §1 settled `du`, and L4 adds no third address. What it adds is
a register that is not an address at all: **the German that is spoken AT the learner**. L4-M7 is the
level's only module in which the learner is expected to RECOGNISE rather than produce — a station
announcement, a counter, a letter from the Amt — and every one of its sentences chips `formal` and
is either `Sie` or addressed to nobody at all.

- M1's instruction infinitive belongs to the same idea one rung earlier: a sign addresses nobody, so
  it uses a form with no person in it. That is why the two modules bracket the level's formal end.
- M5 is the level's other register module and it runs the other way: its whole subject is the small
  words that keep a disagreement friendly, and it chips `neutral` and `informal` where M7 chips
  `formal`.
- M10 closes the level by telling one story twice — once written, once as it would be said aloud —
  which is the Präteritum against the Perfekt rather than `du` against `Sie`, so it is a new use of
  the device `docs/75` §1 gave L3-M10 rather than a repeat of it.

## 2. What L3 withheld, and where it lands

The L3 briefs name L4 by module in six places. Every one is honoured, and no L4 module reaches for
something L3 did not hand it:

| Withheld by | The thing | Lands in |
| --- | --- | --- |
| L3-M1 note 3 | `damit` for a purpose with a different subject | **M2** |
| L3-M4 note 3 | the PAST counterfactual, `Wenn ich Zeit gehabt hätte, wäre ich gekommen` | **M3** |
| L3-M5 note 3 | `bevor`, `während`, `seitdem`, `bis` as time clauses | **M6** |
| L3-M5 note 3 | Konjunktiv I — `er sei`, `er habe` — the newspaper's reported speech | **M7** |
| L3-M9 note 2 | the past passive, the agent with `von`, the `sein`-passive of a state | **M7** |
| L3-M10 note 5 | the narrative Präteritum beyond L1-M5's and L2-M10's handful | **M8** |

Two more were withheld without naming a module and are placed here:

- **The bare separable prefix.** L3-M1's own seam says `abfahren`, `fernsehen`, `abholen` and
  `aufhören` strand `ab` and `fern`, which nobody owns, and that the wave "dropped them rather than
  do that … they stay unspent for a later module that wants to pay". **M9 pays for `ab`** and only
  `ab`, because a timetable sentence (`Der Zug fährt um acht ab`) cannot avoid it; its row names both
  seats, the stranded prefix and the plain `ab Montag`, on the L1-M4 `auf` pattern. `fern` stays
  unspent.
- **The `zu`-infinitive with a modal-like verb.** Not withheld by anyone, and deliberately not taken:
  L3-M1 owns `um … zu` and that is the level's whole infinitive-with-`zu` budget.

## 3. Where instinct and the real index disagree

The single most useful hour of this brief wave was spent running `content:owner` over surfaces the
briefs were about to call fresh. Seven were not.

- **`da` is L2-M7's, so M2 may not teach the causal `da`.** First instinct: `da` is free and M2 owns
  the written twin of `weil`. `npm run content:owner -- en-de "da"` says `da L2-M7`, and L2-M7's row
  is the presence adverb of `Sie ist gerade nicht da`, whose note is about somebody not being there.
  That note is FALSE of `Da es regnet, bleiben wir zu Hause` — the `का` bug exactly — and a rival row
  would be a fourth `FORCED_DUPLICATES` entry, which `src/course/types.test.ts` calls "a real
  defect". **Causal `da` is named in `usage` and never written in a display.**
- **`doch`, `ja`, `schon` and `wohl` are all owned, which is what M5 IS.** First instinct: the modal
  particles are exotic and therefore fresh. `content:owner` says `doch L1-M2`, `ja L1-M2`,
  `schon L2-M2` (it sits in the `forms` of L2-M2's `noch` row), `wohl L3-M6`, `eigentlich L3-M10`.
  Only `mal`, `eben` and `halt` are free. So the particle module is the one module in the level that
  teaches its whole grammar in `rules[]` and opens rows for almost none of it — and the reason a
  learner misses the particles is precisely that they already know every one of the words.
  The ruling on which may be WRITTEN is in §4.
- **`plötzlich` and `Stimme` both fail M10.** `plötzlich L3-M10` — Wave 3 minted it as one of its ten
  discourse words, so the obvious twist word is already owned. And `Stimme L3-M3`: the fold merges
  the noun "voice" with L3-M3's `stimme` of `Da stimme ich zu`, so **no en-de display may ever say
  "voice"**. M10 writes `rief`, `laut` or `leise`.
- **`früher` and `damals` are L3-M10's, so M8's headline adverbs are already paid for.** First
  instinct: "Back then" mints its own time words. `content:owner` says both are L3-M10's, and
  L3-M10-S10 is already `Früher habe ich hier gearbeitet` — this course's `used to` sentence, shipped
  one level early. M8 opens neither and spends its whole cap on verb forms.
- **`habe` and `komme` are L1-M5's and L1-M1's, which decides how Konjunktiv I is taught.** The mood
  is visibly distinct only in the third person, and even there `er habe` and `er komme` are spelled
  exactly like the first-person present indicatives this course has owned since L1. So M7 opens
  exactly ONE Konjunktiv I row — **`sei`**, which `content:owner` reports free — and carries the mood
  in the sentences' own `rules` entries for the rest.
- **`während` is L3-M8's and `bis` is L2-M6's, so M6 buys two conjunctions it cannot own.** See §4.
- **`aufstehen`, `Schule` and `Studium` are free, though L3's briefs listed them as fresh.** A brief's
  seam list is a prediction; L1-M4 shipped the split `Ich stehe … auf` without an infinitive row, and
  L3-M2's `Schule`/`Studium` were never authored. Nothing in L4 depends on them, but they are noted
  here so a later wave does not "avoid" a key that is sitting free.

## 4. Seams — the collisions this level meets, and their owners

`docs/59` decision 2 governs this level as it governs every other: the fold lowercases, so German
capitalisation is invisible to the index, and `docs/59` decision 6's rule — first occurrence wins,
so every colliding surface has a named owner — is what the rulings below apply.

- **The nominalised infinitive folds onto its verb (M1).** Checked against the real function:
  `normalizeSurface('Kochen') === normalizeSurface('kochen') === 'kochen'`. So `das Kochen` and
  `kochen` are ONE key. This is L1-M3's `essen` / `das Essen` at scale, and the ruling is the same:
  one row per verb, opened where the infinitive is first written, its note naming the verb reading,
  the `Sie` reading and the noun reading. Where the purpose sense needs a note of its own, the SPAN
  carries it — `zum Schneiden` normalises to `zum schneiden`, a key that claims neither `zum` (L1-M7)
  nor `schneiden` (checked).
- **`damit` is one key with two readings (M2).** The pronominal adverb ("with it") and the purpose
  conjunction ("so that", verb-final). One row, note true of both — the fourth key in this course to
  need the treatment `docs/59` decision 2 invented for `sie`, after L3-M6's `sich` and L3-M9's
  `werden`.
- **`sodass` is written as ONE token, and the index is why.** `content:owner` says `so L2-M9` — the
  `so` of `Mein Bruder ist so groß wie ich` — so a two-token `so dass` would resolve a tap on `so` to
  a comparison row. `sodass` is free and is a clean key. The spelling is an index decision, not a
  style one.
- **`hatte` and `hätte` are two keys, and that is the whole of M3's mood (M3).** The fold keeps the
  umlaut (`docs/59` decision 7, re-checked): `normalizeSurface('hatte') !== normalizeSurface('hätte')`.
  So L1-M5's real past and L3-M4's unreal one are two reachable rows, each says one thing, and the
  umlaut is never optional in a display, a `forms` entry or a starred mistake.
- **`gekonnt` and `gemusst` are free and are deliberately never written (M3).** The Ersatzinfinitiv
  means a learner will not meet them; authoring one would teach the form the rule exists to replace.
- **Which particles M5 may write.** The test is whether the OWNING row's note stays true of the new
  reading, because this level may not edit L1-M2 or L3-M6.
  - WRITE: `mal`, `eben`, `halt` — free, and they take M5's own rows.
  - WRITE: `doch` and `ja` in the readings their rows already carry (L1-M2's `doch` row is "the yes
    that CONTRADICTS a negative", which is exactly `Doch, ich bin müde`).
  - DO NOT WRITE, name in `usage` instead: the softening `doch` of `Komm doch mit`, the emphatic `ja`
    of `Das ist ja teuer`, and the probability `wohl` of `Das wird wohl stimmen` — L3-M6's `wohl` row
    is the `wohl` of `Ich fühle mich wohl`, comfortable, which is false of "probably".
  - The hedges M5 CAN own are all multi-token and therefore claim no bare part: `ehrlich gesagt`
    (free, though `ehrlich` is L3-M3's and `gesagt` is L2-M10's), `nicht wahr`, `im Ernst`,
    `gar nicht`, `schon mal`.
- **`während` and `bis` in M6, and the one place this level accepts an incomplete note.**
  `content:owner` says `während L3-M8` (the genitive preposition) and `bis L2-M6` (`Abgemacht, bis
  Freitag`). For `während` the ruling is the L1-M4 `auf` device: M6 writes the conjunction, opens no
  row, and states the two seats in a `rules` entry. For `bis` the same ruling is taken with its cost
  named out loud: L2-M6's note ("`bis` plus when is the whole goodbye … never said to a stranger") is
  INCOMPLETE rather than false of `Ich warte, bis der Zug kommt` — both seats are the same *until* —
  and `src/course/types.test.ts`'s own reasoning applies, that Sentence Detail renders each
  sentence's own `deconstruction` and only the practice tap resolves to the earlier row. A rival row
  was rejected (fourth `FORCED_DUPLICATES` entry, a defect); dropping `bis` was rejected (the job
  line names it). It goes to the native gate as Q54 rather than being hidden.
- **`schon` and `noch` are one row two levels down (M6).** L2-M2's `noch` row carries `schon` in its
  `forms` and its note already reads "Its opposite is `schon`, already, and `noch nicht` is 'not
  yet'". So the two words M6's job line leads with are already taught; M6's spend is `erst` (free,
  and the sharpest delta in the module — `erst um acht` is "not until eight") plus the SPANS
  `noch nicht` and `nicht mehr`, both free, both capturing owned parts without spending them.
- **All three destination words are spent, in three modules, and one is a different word (M9).**
  `nach L2-M4`, `zu L1-M8` — and L1-M8's `zu` is the *too* of `Das ist zu teuer`, not a preposition —
  and `in L1-M1`, which is one of the three `FORCED_DUPLICATES` with L1-M7's motion seat beside it.
  So `nach` / `zu` / `in` is a `rules` entry with three pointers and not one new row: the L3-M5
  `als`/`wenn` precedent, where both keys were spent and the pair became a rule.
- **German quotation marks cost nothing (M10).** Checked against the real function:
  `normalizeSurface('„Komm')` is `'komm'` and `normalizeSurface('her!“')` is `'her'` — the marks are
  edge punctuation and are stripped per token. So a quoted line indexes exactly as an unquoted one,
  no key is spent on the quotes, and every word inside them resolves to the row that already owns it.
  That check is what makes a line of dialogue affordable inside a six-sentence story.
- **Two spellings are BANNED level-wide, both checked.** The officialese ellipsis hyphen —
  `An- und Abreise`, `Ein- und Ausstieg` — normalises to a three-token key (`an und abreise`) that
  nothing can reach, so both compounds are written out in full (M1, M7). And `docs/59` decision 2's
  all-caps ban stands: `STRASSE` folds to `strasse` while `Straße` folds to `straße`.

## 5. The shape of the level

Bounds climb **12 → 14**: M1 at 12, M2–M6 at 13, M7–M10 at 14, continuing L3's 10 → 12. The
justification is `docs/59`'s, restated: German's clause bracket makes a sentence longer IN TOKENS
than the Romance equivalent at the same difficulty, and L4 adds three constructions that each put a
third element at the end of the clause — the double infinitive (`Ich hätte kommen können`), the
modal passive (`muss ausgefüllt werden`) and the instruction infinitive. Twelve was L3's ceiling and
is M1's floor here because instructions are short; thirteen is what a two-clause `zwar … aber` or a
`Wenn …, hätte … können` actually costs; fourteen is what officialese and a narrative sentence cost.

`newWordCap` stays the PRD §5 25 everywhere except **M10, which is capped at 14** and is the only
brief in this course to argue the number down. `docs/83`'s Wave 3 finding is the reason it is 14 and
not zero: `deconstruction.words` has `minItems: 1` and en-de asserts one row per surface, so ten
items need TEN fresh keys whatever the ambition — "ideally ZERO" is not reachable and L3-M10 should
not have written it. Fourteen is the floor plus four, spent on the dialogue verbs and on discourse
words, and it forbids by arithmetic what L3-M10 could only forbid by asking nicely: not one noun the
story could have borrowed.

Module by module — what it owns, and why it sits there:

- **M1 Explaining how.** Owns the INSTRUCTION INFINITIVE (`Bitte nicht rauchen`, `Das Wasser kochen
  lassen`), `lassen` + infinitive, and the nominalised infinitive with `zum` / `beim`. It sits first
  because it is the level's cheapest module in grammar and its most expensive in register: it is the
  first time the course teaches a form by the MEDIUM it appears in. The Sie-imperative it looks like
  it should own is L2-M4's already (`Gehen Sie geradeaus`, `Nehmen Sie den Zug`) and is not
  re-taught.
- **M2 Cause and consequence.** Owns the DA-COMPOUND — `damit`, `dafür`, `daran`, `darauf`, `davon`,
  `darum` — the anticipating `da`-word before a `dass` clause, `damit` as a purpose conjunction, and
  `deswegen` / `daher` / `sodass`. It sits second because a paragraph is the first thing L4 asks for
  and the `da`-compound is what holds one together; it also has to precede M4, which uses
  `Es geht darum, dass …` as an argument frame.
- **M3 What might have been.** Owns the PAST Konjunktiv II and the DOUBLE INFINITIVE. It sits third
  because L3-M4 named it and because it needs nothing from the modules after it — every participle it
  wants is L1-M5's or L2-M10's, and every subjunctive form is L3-M4's.
- **M4 Persuading.** Owns the argument skeleton: `zwar … aber`, `einerseits … andererseits`,
  `nämlich`, `außerdem`, `dennoch`, and the first position read as an argumentative CHOICE rather
  than a mechanical law. It sits above M3 because a case is longer than a regret and below M5 because
  making the case and softening it are two different jobs.
- **M5 Disagreeing well.** Owns the MODAL PARTICLE as a system, `mal` / `eben` / `halt` as rows, the
  hedging spans, and Konjunktiv II re-used as TONE. It sits fifth, at the level's middle, because it
  is the module the level is named for and because every construction it hedges — a request, a
  complaint, an opinion, a case — is now behind it.
- **M6 Before and after.** Owns `bevor`, `seitdem`, `sobald`, `solange`, the conjunction readings of
  `während` and `bis`, and the aspectual `erst` beside `noch nicht` and `nicht mehr`. It sits sixth
  because M8's narrative needs its clauses and M10's story needs both.
- **M7 Official talk.** Owns the past passive, the modal passive, the agent with `von` and `durch`,
  the `werden`-passive against the `sein`-passive, and Konjunktiv I on a single row (`sei`). It sits
  seventh because it is the level's hardest module and needs the whole passive, the genitive
  (L3-M8's) and reported speech (L3-M5's) standing behind it.
- **M8 Back then.** Owns the narrative Präteritum in its two classes, and the register law that makes
  it honest — the Präteritum is the tense a learner READS, the Perfekt the one they speak, with
  `sein`, `haben` and the modals as the exception they have had since L1. It sits eighth because M10
  writes its dialogue tags in this tense.
- **M9 Places and journeys.** Owns `hin` / `her` and the three-way split of English *where* (`wo`,
  `wohin`, `woher`), the `nach` / `zu` / `in` choice as a rule, and the bare prefix `ab`. It sits
  ninth because a journey told in full is the level's dress rehearsal for M10.
- **M10 A story with a twist.** Owns exactly one mechanic: DIRECT SPEECH inside a narrative — the
  `„ “` marks, the inverted reporting clause (`sagte er`), the colon before speech that follows. Six
  sentences, the per-sentence bound applying inside the item as it does at L3-M10, and one item whose
  twist turns on a WORD rather than on an event.

## 6. What L4 deliberately defers to L5, and why

- **Idiom and the figurative everyday** (`L5-M1`). Nothing in L4 writes a fixed expression whose
  meaning is not the sum of its words, `zum Glück` (L3-M10's) excepted, because an idiom taught
  before the literal reading is a word a learner cannot re-analyse.
- **Irony, teasing and saying the opposite of what you mean** (`L5-M2`). M5 gets close — a particle
  IS attitude — and stops at the point where the sentence still means what it says. M10 may have a
  twist but not a narrator who is lying.
- **Regional and generational speech** (`L5-M3`). M5 names `halt` as the southern twin of `eben` and
  M8 names the southern preference for the Perfekt in writing, both as practice a learner will meet.
  Neither module goes further, and no display is marked as regional.
- **Toasts, speeches, condolences** (`L5-M4`). M7 owns the register of the counter and the
  announcement; the ceremonial register is a different vocabulary and a different set of fixed forms.
- **A structured case with objections answered in order** (`L5-M6`). M4 makes a case and concedes a
  point inside one paragraph. Sustaining one across ten is L5's length problem, not L4's.
- **Implication and indirect requests** (`L5-M7`). The line M5 will not cross.
- **Two grammatical things, both for the same reason — nothing at L4 needs them.** The
  Konjunktiv I of a verb other than `sein` in a display (M7 recognises `habe` and `komme` and mints
  neither); and `zu` + infinitive beyond L3-M1's `um … zu`.

## 7. Two debts that stay standing

- **The native-speaker gate is unmet and no authoring wave may close one of `docs/83`'s fifty open
  questions by rewriting a shipped L3 module.** Several bear directly on this level: Q42's
  `wegen dem` in speech is the same honesty M6 owes about `bis`, Q48's `früher` for *used to* is the
  sentence M8 is built on, and Q50's `Eigentlich` as an opener is one of the words M5 may not
  re-teach.
- **A level never edits a file below it.** Where an L4 module needs a new shape of an older lexeme,
  the shape gets its own row in the module that first shows it, with a note pointing back at the
  first-teach row. That is why §4's rulings are rules-entries and pointers rather than corrections.

## Open questions for the native pass

Continuing this course's chain; `docs/83` ended at 50 and nothing there is renumbered.

51. **The instruction infinitive against the `Sie`-imperative** (M1). The brief's claim is that a
    sign, a package and a recipe use the bare infinitive at the end of the clause
    (`Bitte die Tür schließen`) while a person is told `Schließen Sie bitte die Tür`, and that using
    either in the other's place marks a foreigner. Confirm the split is that clean, and that
    `Zwiebeln klein schneiden` is how a German cookbook actually writes a step.
52. **`zum Schneiden` for purpose** (M1). Confirm `Das Messer ist zum Schneiden` is ordinary and not
    stilted, and that a speaker would not more naturally say `Das Messer ist zum Schneiden da` or
    reach for `damit schneidet man`.
53. **`sodass` against `so dass`** (M2). The index forces the one-token spelling (§4). Confirm that
    `sodass` is the current, ordinary written form and that a learner writing it will not be marked
    wrong.
54. **`bis` as a conjunction landing on L2-M6's goodbye row** (M6). The level's one accepted
    incomplete note. Read `Ich warte, bis der Zug kommt` beside L2-M6's note — "`bis` plus when is
    the whole goodbye … it is never said to a stranger" — and say whether a learner tapping `bis`
    would be misled, or merely under-informed. If misled, M6 loses the conjunction and the job line
    is short one word.
55. **`erst` against `schon`** (M6). The brief's claim is that `erst um acht` means "not until eight"
    and `schon um acht` means "as early as eight", and that English needs a negation for what German
    does with one adverb. Confirm, and confirm `erst` is the word a speaker reaches for rather than
    `nicht vor`.
56. **The double infinitive in a main clause** (M3). `Ich hätte kommen können`, `Das hättest du sagen
    sollen`. Confirm the order — full verb then modal, both infinitives — and confirm that
    `*Ich hätte kommen gekonnt` is not merely rare but wrong.
57. **The subordinate-clause double infinitive, named but not written** (M3). The brief states in a
    `rules` entry that `Ich weiß, dass ich hätte kommen können` puts the finite verb BEFORE the two
    infinitives, breaking the verb-final law. Confirm the rule, and say whether naming it without
    writing a display is the right call at this level or whether it should be shown once.
58. **`nämlich` inside the middle field** (M4). The brief's claim is that `nämlich` never stands
    first, takes no comma of its own, and gives the reason after the claim
    (`Ich komme nicht mit, ich habe nämlich keine Zeit`). Confirm, and confirm the three-way contrast
    with `weil` and `denn` is how a speaker would actually feel the difference.
59. **`eventuell` as the module's false friend, or not at all** (M4). The brief warns that
    `eventuell` is "possibly" and offers the safer route of leaving it out. Say which is better for a
    learner at this level.
60. **Which particles may be written** (M5, §4's ruling). The hardest judgement in the level. Confirm
    that `Doch, ich bin müde` and the softening `Komm doch mit` really are different enough that
    L1-M2's note is false of the second — and, if they are not, M5 gains the softener and loses a
    constraint.
61. **`eben` and `halt`** (M5). Confirm they are interchangeable in `Das ist eben so` / `Das ist halt
    so`, that `halt` reads as southern rather than as wrong in the north, and that both are
    unstressed.
62. **`ehrlich gesagt` and `nicht wahr`** (M5). Confirm both are current spoken German and that
    `nicht wahr` is not now old-fashioned beside `oder?`, which the brief also uses.
63. **`sei` as the only Konjunktiv I row** (M7). Confirm `Er sagte, er sei krank` is what a newspaper
    writes, and that a learner meeting only `sei` — with `habe` and `komme` recognised in context but
    never taught as rows — has enough to read a news sentence.
64. **`werden`-passive against `sein`-passive** (M7). `Die Tür wird geschlossen` (the event) against
    `Die Tür ist geschlossen` (the state). Confirm the split is the one a speaker feels, and that
    `ist geschlossen` is not simply heard as a passive.
65. **The strong Präteritum forms an author may use** (M8). The brief lists `ging`, `kam`, `sah`,
    `gab`, `fuhr`, `saß`, `blieb`. Confirm these are the ones a learner meets first in reading, and
    name any that should be swapped out.
66. **The southern preference for the Perfekt in writing** (M8). The brief puts it in `usage` as
    practice rather than advice. Confirm the description is accurate for Bavaria, Austria and
    Switzerland, and that it does not undercut the module's own register law.
67. **`nach` / `zu` / `in` as one rule** (M9). Confirm the three-way split as the brief states it —
    `nach` for countries, cities and `Hause`; `zu` for a person, a shop, a named building; `in` +
    accusative for going into something — and name the everyday case the rule gets wrong.
68. **`wohin` and `woher` in speech** (M9). Confirm a speaker actually says `Wohin fahren Sie?` rather
    than splitting it as `Wo fahren Sie hin?`, which is common in the north, and say which the course
    should teach first.
69. **The bare prefix `ab` doing two jobs on one row** (M9). Confirm `ab Montag` (from Monday on) and
    the stranded prefix of `Der Zug fährt um acht ab` are recognisably the same word to a speaker, so
    that one row's note can honestly cover both.
70. **The direct-speech punctuation** (M10). Confirm `„Ich komme gleich“, sagte er` — low-then-high
    marks, comma outside the closing mark, inverted reporting clause — is current written German, and
    that `er sagte` after a quote reads as translated rather than merely informal.
