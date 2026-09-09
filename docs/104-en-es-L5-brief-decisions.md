# en-es L5 — the authoring-brief decisions (#564)

The ten en-es L5 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['en-es']` L5-M1…L5-M10) are the
first L5 briefed in any course, and L5 is the LAST level: nothing defers past it. Every seam below
was pinned against the REAL cumulative index — the fold of `public/content/en-es/index/L1-M1.json`
through `L4-M10.json`, read on 2026-09-08 with `npm run content:owner`, which reports **949 surfaces
owned, folded over 40 modules through L4-M10, maxSpan 3** (L1 closed at 228, L2 at 477, L3 at 715,
L4 adds the rest) — and against the review chain the level inherits: `docs/41` (spoken Spanish),
`docs/61` (L2), `docs/77` (L3) and `docs/95` (L4).

The ten titles and jobs are levels.json's, mirrored verbatim (#423 ratified the list on 2026-09-07);
a brief adds only the authoring guidance on top, and `tools/course-briefs.test.ts` enforces the
mirror. Nothing in L5 is authored yet — this note and the briefs are what the first authoring issue
will be written against, exactly as `docs/53`, `docs/69` and `docs/86` were for L2, L3 and L4.

One thing about this wave is different from every wave before it and is worth stating first: the
fold now runs through **L4-M10**, so an L4 brief's CLAIM about what it would own is no longer the
best available evidence — the shipped index is. Three of the surfaces the L4 briefs named as their
own shipped unspent (§5), and one of L3's deferrals to L4 landed only halfway (§7). Every line below
is written against what the index says today, not against what a brief said it would say.

## 1. The index this level is planned against

Every INDEX SEAM line in every brief was produced by running `npm run content:owner -- en-es` on the
surface in question and quoting what came back; nothing was remembered and nothing was inferred from
the module JSON. That is the discipline `tools/index-owner.ts` exists to enforce, and §5 records the
places where it contradicted the first instinct.

Two structural facts carry through the level:

- **`maxSpan` stays 3, and ends the course at 3.** L2 set it, L3 and L4 held it, and L5 holds it
  even though the figurative material in M1 and the ceremonial formulas in M4 are the first content
  in the course that genuinely wants four and five tokens. `matchSurfaces` is bounded by the index's
  own `maxSpan`, so raising it would widen the greedy window for every lookup in the course to buy
  two idioms; instead, anything longer than three tokens is either named in `usage` and never
  displayed (`costar un ojo de la cara`, `de vez en cuando`) or indexed as two ADJACENT wholes on
  L4-M4's precedent, which split `lo que pasa es que` into `lo que pasa` plus `es que`. M4's
  `le acompaño en el sentimiento` is `le acompaño` plus `en el sentimiento`; M10's
  `la verdad es que` is not indexed at all, because `la verdad` → L4-M5 and `es que` → L4-M4 already
  resolve it between them.
- **No file below L5 is edited.** A fresh cell of an already-taught verb gets its own row in the L5
  module that first shows it, with a note pointing back at the first-teach row — `CLAUDE.md`,
  "A level never edits a file below it". M5's `me molesta que`, M7's `serían`, M9's `había llegado`
  and M8's `sirva` are all extensions of rows in L3-M6, L3-M4, L2-M10 and L4-M4 respectively.

## 2. Register — carried from docs/53 §1, module by module

`docs/53` §1 settled it, `docs/69` and `docs/86` applied it unchanged, and L5 is where it stops
being a rule the learner obeys and becomes a thing the learner DOES. The level contains both of the
extremes and the module that moves between them:

- **M4 (Formal occasions) speaks `usted` and third person throughout and chips `formal`** — L5's
  mirror of L4-M7, and the only module in this level with no informal item.
- **M2 (Humour and teasing) speaks `tú` throughout and chips `informal`** — the opposite pole, and
  the only module with no formal item. The level is built so that these two sit three modules apart
  and M10 has both to draw on.
- **M10 (Your own voice) is the register decision's final case**: every item contains BOTH addresses
  by definition, because the piece pivots midway, and the chip follows the half of the piece the row
  is drawn from. Its note names the three things a pivot moves at once — the address, the frame and
  the vocabulary tier — which is `docs/53` §1's "politeness lives in the frame, not in the pronoun"
  stated as an instruction rather than as a warning.
- **M3 (How they say it there) is the only module that BUYS a pronoun.** See §5: `tú` is free after
  forty modules, and M3 spends it. M10 then re-uses M3's row and mints nothing.
- M1, M2 and M9 speak `tú` and chip `informal` or `neutral` by item; M5, M6, M7 and M8 chip
  `neutral` and say which address the scene uses in `usage`; M8 deliberately shows both, because the
  repair sentence is said as often to a clerk as to a friend and the frames differ only in an ending.

## 3. What L4 withheld, and where it lands

`docs/86` §7 named eight things as L5's, and the L4 briefs named more inside their notes. This is
the list an authoring wave checks itself against; §7 records the two that land nowhere.

- **The emotion and value subjunctive with a personal subject → L5-M5.** `me alegro de que vengas`,
  `es una pena que no vinieras`, `me molesta que`. L4 landed five subjunctive triggers across five
  modules and refused a sixth class; M5 takes it with the different-subject rule as its minimal pair.
- **The sequence of tenses → L5-M5, in the same breath.** L4-M3 named "a sequence-of-tenses table" as
  L5's. M5 does not write a table: it states the rule on its own triggers, where a present trigger
  takes the present or perfect subjunctive and a past trigger takes the imperfect subjunctive. That
  is the honest scope, and §7 says what it leaves uncovered.
- **The relative-clause subjunctive of the unknown antecedent → L5-M8.** `busco algo que sirva`.
  L4-M4 deferred it and said it needed relative clauses to be comfortable first, which L4-M9 did.
  M8 is its natural home because a learner reaching for a word they do not know is describing, by
  definition, an unidentified thing.
- **The accidental `se` → L5-M8.** L4-M9 declined it in writing. M8 takes it because
  `se me ha olvidado la palabra` is the highest-frequency real use a learner will ever have for it,
  and because M8's note can then say plainly that this is a THIRD `se`, distinct from L2-M4's and
  from L3-M8's and L4-M7's impersonal one.
- **The `-se` imperfect subjunctive → L5-M3.** L4-M3 named it in `usage` and refused to produce it.
  M3 is where it belongs, because it is not regional in the way `carro` is: it is the WRITTEN and
  peninsular twin of `-ara`, and a module about what marks a variety is the only place that claim
  can be made truthfully.
- **The pluperfect indicative → L5-M9.** L4-M6 and L4-M8 both brushed against `había llegado` and
  both declined. M9 takes it as the fourth and last past, in the module whose job is to keep the
  four apart.
- **The historical present → L5-M9.** L4-M10 named it and kept to the preterite precisely so that
  the switch would still be a switch when it arrived.
- **The future perfect → L5-M7, but only as CONJECTURE.** `Habrá salido` — he must have left. M7
  takes it as one third of the suppositional-tense rule. As a plain future TIME (`habré llegado`) it
  lands nowhere; §7.
- **Irony, implication and sarcasm → L5-M7; teasing and banter → L5-M2.** L4-M5 named both and
  pointed at both. The level keeps them three modules apart on purpose: a tease means what it says
  warmly, an ironic line means the opposite, and a module that blurs them teaches a learner to
  insult people by accident.
- **Ceremony, toasts and condolences → L5-M4.** L4-M7 named them while teaching the announcement
  register, and M4 is that module's mirror.
- **Regional and generational speech → L5-M3.** L4-M5 and L4-M9 each sit one step away and each
  says so.

## 4. The ten modules — what each owns and why it sits there

### L5-M1 Sayings and idioms — the light-verb collocation

Owns `echar una mano`, `echar de menos`, `meter la pata`, `hacer caso`, `dar una vuelta`,
`tener ganas de`, `poner al día`, `tomar el pelo`, and the `estar` + fixed complement family
(`estar hecho polvo`, `en las nubes`). It is FIRST because it is the first module in the whole
course in which a phrase does not mean the sum of its words, and because M2's teasing is built on
exactly that reflex. Its rule is about grammatical structure — the noun carries the meaning, the
verb is chosen by the noun and is unpredictable — not about colour, which is briefs rule 2 doing
its job on a topic that attracts slogans more than any other in the level.

### L5-M2 Humour and teasing — the diminutive as attitude

Owns `-ito`, `-illo`, `-azo` and `-ón` as ATTITUDE morphology rather than size, the exclamative
frames (`Qué` + N + `más` + Adj, `Vaya` + N) and the closed set of denials that carry the tone
(`qué va`, `no me digas`, `ni hablar`, `anda ya`). Second, because it is the cheapest possible
module to author — every base word it wants is already owned and only the suffixed form is fresh
(§5) — and because it is the level's `informal` pole.

### L5-M3 How they say it there — the second person plural

Owns `vosotros`/`vosotras`/`os`/`vuestro` and the `-áis`/`-éis`/`-ís` paradigm, `ustedes` as the
American plural, `vos` with `tenés`/`sos`/`podés`, the lexical pairs, the `-se` imperfect
subjunctive, and — because the index forced it — `tú` itself. Third, because everything after it
that touches address (M4's `usted`, M10's pivot) needs the pronoun system to exist first. It is the
largest single acquisition in the level and the one whose absence would have been the course's
worst hole.

### L5-M4 Formal occasions — the independent subjunctive

Owns `que` + subjunctive with no main clause (`Que aproveche`, `Que tengas suerte`,
`Que en paz descanse`), the first-person-plural exhortative (`brindemos`), and the ceremonial
formulas. Fourth, directly after the module that establishes `usted` against `tú`, and positioned
as M2's mirror. Its grammar is nearly free and its vocabulary is the most expensive in the level,
which is the opposite trade from M9 and is why the two sit far apart.

### L5-M5 Big questions — the emotion subjunctive and the sequence of tenses

Owns `me alegro de que`, `me molesta que`, `es una pena que`, the present/perfect/imperfect
subjunctive chosen by the TRIGGER's tense, and `lo` + adjective as an abstract noun. Fifth, at the
centre of the level, because it is the last grammatical system of any size the course opens and
everything after it is discourse.

### L5-M6 Arguing a position — `sino`, and the architecture

Owns `sino` and `sino que` against `pero`, `no solo … sino también`, and the connectors that name
the parts of a case (`en primer lugar`, `por una parte`, `si bien`, `en cambio`,
`por el contrario`, `ahora bien`, `en definitiva`). Sixth, because a structured case needs the
abstract vocabulary M5 opens, and because it is the level's most written module and wants to sit
before the three spoken ones that close it.

### L5-M7 Between the lines — a tense used for something other than time

Owns the suppositional future (`Estará en casa`, `Serán las tres`), the future perfect as
conjecture (`Habrá salido`), the suppositional conditional (`Serían las tres`), litotes, the
indirect request as a negative question, and the ironic markers. Seventh, three modules after M2
so that teasing and sarcasm can never be confused, and after M6 because irony aimed at an argument
is the sharpest use a learner will meet.

### L5-M8 When words run out — the relative subjunctive and the accidental `se`

Owns `algo que sirva` against `algo que sirve`, `se me ha olvidado`, the circumlocution frames and
the repair set. Eighth on purpose: it is the most useful module in the level and it is placed after
the modules that make a learner ambitious enough to run out of words.

### L5-M9 Telling it your way — the historical present and the pluperfect

Owns `había` + participle, the narrative switch into the present, and the retelling frames
(`total que`, `el caso es que`, `según él`, `dicen que`, `resumiendo`). Ninth, as the first of the
two recombination modules, and cheap in keys for the same reason L4-M8 was: almost every cell it
needs is already owned (§5).

### L5-M10 Your own voice — the pivot

Owns nothing grammatical, on purpose, exactly as L3-M10 and L4-M10 owned nothing. What it adds is
the register PIVOT and the signals that mark it (`ahora en serio`, `hablando en serio`,
`bueno pues`, `dicho esto`, `si me permite`, `para terminar`). It is the exit of the level, of the
ladder and of the course, and its budget is discourse markers.

## 5. Seams — what the index actually said

Fourteen `content:owner` answers changed a brief. These are recorded because the first instinct was
wrong, which is precisely the class of error `tools/index-owner.ts` was built to catch.

- **`tú`, `yo`, `nosotros` and `ellos` are all `free` after forty modules.** The most surprising
  answer of the wave, and it has an obvious cause once seen: Spanish is pro-drop and the ladder has
  never needed to write a subject pronoun. `usted` → L1-M2 is the only one the course ever spent,
  because it is the one Spanish itself writes out; `él` and `ella` → L4-M10, bought for the
  attribution inversion `dijo ella`. M3 therefore buys `tú` along with `vos` and `vosotros`, and
  M10's pronoun pivot points back at M3's rows rather than minting a second `tú`.
- **`vosotros`, `vosotras`, `os`, `vuestro`, `ustedes`, `sois`, `tenéis`, `habláis`, `estáis`,
  `vais`, `podéis` — every one `free`.** The entire second-person plural of the language, in both
  of its systems, is unowned after forty modules. This is the single largest untaught thing in the
  course and L5-M3 is the last module that can hold it; it is why M3 moved from a vocabulary module
  about regional words into a paradigm module about the second person.
- **`me molesta` → L3-M6, not free.** M5's own emotion trigger. Feelings in depth already spent it,
  so M5 extends L3-M6's row with the `que` clause and mints no second key. This is the seam that
  most nearly put a duplicate row under the level's biggest new system.
- **`sepa` → L4-M4, not free.** L4-M4's brief called `busco a alguien que sepa` an L5 example and
  then shipped the cell anyway. M8 therefore extends L4-M4's row and mints its fresh cells on
  `sirva` and `signifique` instead. `alguien` → L4-M10, so `alguien que sepa` stays a three-token
  whole and opens nothing.
- **`llega` → L4-M6, not free.** The historical present's flagship cell — M9 would have minted it —
  is already owned by L4-M6's `Cuando llego, siempre llamo`. M9 extends that row. `dice` and
  `viene` → L3-M5 for the same reason.
- **`vaya` → L3-M3, `venga` → L4-M4, `hombre` → L4-M5.** All three read as fresh exclamatives to
  M2. None is. The frames extend those rows, and `venga ya` becomes a two-token whole of its own so
  that L4-M4's imperative keeps its note.
- **`sería` → L3-M4.** M7's suppositional conditional leans on a cell L3-M4 bought for advice and
  politeness; only `serían` and `estaría` are fresh.
- **`había` → L2-M10.** Which is exactly why every pluperfect in M9 must index WHOLE at two tokens,
  on L4-M3's `hubiera sabido` precedent.
- **The nouns inside M1's idioms are the trap.** `pelo` → L2-M2 (the haircut), `hecho` → L3-M7,
  `menos` → L2-M9, `pan` → L1-M3, `cara` → L1-M8, `dar` → L2-M1. The whole-indexing rule is not a
  tidiness preference here: a bare `pelo` key would send a learner tapping `tomar el pelo` to a note
  about somebody's mother's short hair. `pan` and `cara` between them are what remove
  `ser pan comido` and `costar un ojo de la cara` from M1's display list.
- **Every base of every diminutive M2 wants is already owned, and every suffixed form is free.**
  `momento` → L2-M1 but `momentito` free; `casa` → L1-M5 but `casita` free; `café` → L1-M1 but
  `cafelito` free; `coche` → L4-M2 but `cochazo` free; `problema` → L2-M8 but `problemilla` free.
  A suffix is never a key — `surfaceIndexKeys` splits hyphens and nothing else — so the index holds
  the two forms as independent entries and M2 gets a morphology for the price of the derived words.
  It is the cheapest module in the level.
- **`salud` is free, although L3-M7 is the health module.** So a toast in M4 would OWN the noun
  "health" for the entire course, first occurrence winning forever. The brief says the row must
  gloss both senses or the module must toast with `chinchín` and leave `salud` alone; open question
  67 puts it to the gate.
- **`lo` → L2-M5 and `lo que pasa` → L4-M4, while `lo que` is free.** M5's `lo` + adjective
  abstractions therefore index WHOLE at two tokens and L2-M5's object pronoun is untouched.
  `gente` → L3-M10 while `la gente` is free is the same two-token trick.
- **`es cierto` → L4-M4 while `es cierto que` is free**, and **`por un lado` / `por otro lado` →
  L4-M4** while `por una parte` / `por otra parte` are free. M6's concession is a three-token whole
  and its part-marking pair is the one L4-M4 did not buy. `sin embargo` → L4-M2, `pero` → L1-M10.
- **Three surfaces the L4 briefs named as their own shipped unspent:** `más bien` and `o sea`
  (L4-M5's brief), `aun así` (L4-M5's) and `quisiera` (L4-M3's) are all `free` today. The index is
  the fact and the brief is the plan, so L5 may open them: `o sea` and `más bien` go to M7,
  `quisiera` to M4, and `aun así` is left alone because M6 has `ahora bien` and does not need it.
  This is the same class of correction `docs/53` §0 made about #426.

One further seam was checked against the real matcher rather than assumed, in the manner
`tools/course-briefs.ts`'s header requires: **raising `maxSpan` would have been safe but was
refused.** `matchSurfaces` reads `lookup.maxSpan` and walks longest-first, so a four-token window
cannot mis-resolve anything a three-token window resolves correctly; the cost is one extra
comparison per token for every lookup in the course, paid forever, to buy `de vez en cuando` and
`costar un ojo de la cara`. Both are named in `usage` instead and `maxSpan` ends the course at 3.

## 6. The shape of the level

- **Bounds run 12 → 15**, continuing L1's 6 → 8, L2's 8 → 10, L3's 10 → 12 and L4's 12 → 14. The
  climb is one word, deliberately: L5 is about voice and not about length, and three of its ten
  modules sit BELOW L4's ceiling. They are set per module by the shape the module writes:
  **12** for M1 (an idiom lands in a short sentence and a long one buries it), M2 (a joke that needs
  fourteen words is not a joke) and M7 (implication is short by nature — the meaning is in what is
  missing, and a long ironic sentence explains itself); **13** for M3, where a minimal pair is one
  sentence said twice in two varieties; **14** for M8 (a paraphrase is by definition longer than the
  word it replaces), M9 and M10; **15** for M4 (the only module where length IS the register — a
  condolence and a toast are single long periods and cutting them short is the error), M5 (an
  abstract claim carries a `lo` nominalisation and a subordinate clause in the subjunctive) and M6
  (a claim, a concession and a counter in one sentence, the level's most written module).
- **M9's and M10's bounds are per sentence INSIDE the piece**, as at L3-M10 and L4-M10. M10's eight
  sentences and M9's retelling are each held to 14 word by word; the piece is long, the sentences
  are not.
- **`newWordCap` stays the PRD §5 25 everywhere.** Two modules will press it and the rest will not
  come close. M4 is the level's most expensive module — its entire ceremonial vocabulary is free
  (§5) and its grammar is nearly free — and M3 is the second, because a regional pair is two words
  for one idea even when the peninsular half points at an owned row. M2, M9 and M10 spend on
  structure and derived forms rather than vocabulary, which is why they can sit where they sit.

## 7. What lands nowhere — the holes this course ships with

L5 is the last level, so a deferral that lands nowhere is not a deferral, it is a hole. Naming them
here is the only honest thing available; passing them on is not.

1. **The future perfect as a plain future TIME.** `Habré llegado antes de las ocho`. M7 takes
   `habrá salido` as CONJECTURE, which is the frequent use, and no module takes the temporal one.
   A learner finishing the course can guess about the past and cannot say they will have finished.
   This is the cleanest hole in the level and the cheapest to close if a wave has room.
2. **The sequence of tenses beyond M5's own triggers.** M5 states the rule where the trigger is an
   emotion or a value; the same backshift under `querer`, `pedir` and `esperar`
   (`quería que vinieras`) is stated by analogy in `usage` and is never taught on its own frames.
   That is a partial hole, and it is partial because L4-M3 asked for a "table" the briefs refused
   to write.
3. **The two-clitic cluster is only half shipped.** L3-M5 deferred `se lo dije` to L4, L4-M1's
   brief accepted it, and the index today says `me lo` → L4-M1 and `dámelo` → L4-M1 while
   **`se lo` is still `free`**. So the dative-`le`-in-disguise, which was the whole reason the
   cluster was deferred upward, is taught nowhere. No L5 module is a natural home for it — M8 comes
   closest and would have to bend — and it is recorded here as an L4 gap rather than absorbed.
4. **`estar` + gerund is opened and never systematised.** `comiendo` and `hablando` → L2-M7, bought
   for taking a message on the phone, and no module since has taught the progressive as a system or
   contrasted it with the plain present. L5 does not take it: it is not a Voice topic, and a level
   that ends the course is the wrong place to open a tense. Named as a gap in L2/L3.
5. **The resultative `estar` + participle** (`está roto`, `está abierto`). `abierto` → L4-M7 as a
   sign, `escrito` and `está roto` are free. The construction is nowhere.
6. **Relative pronouns beyond `que` and `donde`.** `quien`, `cuyo` and `el cual` are all free.
   L4-M9 bought the two a speaker needs; the rest are literary and are deliberately not bought, but
   a learner cannot read a novel without them, which is a scope decision worth restating rather
   than a defect.
7. **The `refrán`.** M1 treats proverbs as comprehension only and never as production. That is the
   right call for a course with no audio and no native-speaker gate passed, and it means the course
   ships able to recognise `A quien madruga…` and unable to place it.
8. **Vulgarity and taboo.** Deliberately absent from every level, and a learner will meet it on
   their first evening. M2 and M3 both decline it in writing. This is a policy hole, not an
   oversight, and the gate should be asked whether declining it is defensible.
9. **Pronunciation of the varieties.** M3 describes `seseo` and the peninsular `c`/`z` in `usage`
   and tests nothing, because rung has no audio (`CLAUDE.md`). Structural, known, and restated here
   because M3 is the module where a learner will most feel it.

## 8. Open questions for the native-speaker gate

The gate is a separate, stricter bar and stays unmet (`CLAUDE.md`). This continues the en-es chain,
whose last number in `docs/86` is 63; nothing existing is renumbered. These are questions about the
BRIEFS, and an authoring wave will add its own about the sentences it ships.

64. **The light verb is the unpredictable half** (M1, note 2). The brief teaches `echar una mano`,
    `dar una vuelta` and `meter la pata` as a family in which the noun carries the meaning and the
    verb cannot be reasoned to. Confirm that a speaker feels these as one family rather than as
    unrelated idioms, and that no productive rule is being hidden by the brief's "unpredictable".
65. **Idiom frequency and the foreign mouth** (M1, note 3). The brief claims most of these are
    neutral everyday register rather than colourful, and that a learner who treats them as colourful
    will under-use them. Confirm per expression, and name any that a foreigner using them would
    sound odd for reaching at all.
66. **`-ito` as attitude rather than size** (M2, note 2). The brief's central claim is that
    `un momentito` is not a shorter moment and `ahorita` is not a smaller now. Confirm both, confirm
    that `-illo` reads as a shrug and `-azo` as admiration in ordinary speech, and say whether
    `ahorita` carries a regional meaning strong enough that M2 should hand it to M3.
67. **`¡Salud!` owning the noun `salud`** (M4, note 5, and §5). The index leaves `salud` free, so
    whichever module takes it owns the word "health" for the whole course. Confirm the toast is
    frequent enough to be worth that, or say that `chinchín` alone carries the toast and `salud`
    should be left for a future health module.
68. **`Que en paz descanse` as a formula of no belief** (M4, note 4). The brief says it is used by
    people of every conviction. Confirm, and confirm that a foreigner saying it at a Spanish funeral
    is heard as respectful rather than as claiming a faith.
69. **The condolence is fixed and the improvisation is the error** (M4, note 3). The brief tells a
    learner not to improvise a personal sentence and to use `le acompaño en el sentimiento` or
    `mi más sentido pésame`. Confirm that these are what is actually said, that they are not
    literary, and say which of the two a non-relative uses.
70. **The vosotros/ustedes split as the brief states it** (M3, note 2). Confirm that `ustedes` in
    Spain is genuinely the formal plural rather than a form that has faded, and confirm that a
    learner in Spain who uses `ustedes` to a group of friends is marked rather than merely polite.
71. **Voseo as "a mistake nowhere"** (M3, note 2). The brief refuses to rank the varieties. Confirm
    that `vos tenés` is unmarked in Buenos Aires and Montevideo, and say where voseo IS socially
    marked, so that the module's usage lines are true of the whole map rather than of the Río de la
    Plata only.
72. **The `-se` subjunctive as written and peninsular** (M3, note 2). L4-M3 named it in `usage` and
    this module teaches it as comprehension. Confirm the frequency claim — commoner in Spain and in
    writing — and confirm that `hablase` in a spoken sentence sounds bookish rather than regional.
73. **The different-subject rule as the emotion subjunctive's minimal pair** (M5, note 2). The brief
    builds the module on `me alegro de venir` against `me alegro de que vengas`. Confirm the
    infinitive really is obligatory when the subjects match, and that `me alegro de que yo venga` is
    heard as wrong rather than as emphatic.
74. **`sino` taught as a test rather than as a feel** (M6, note 2). The brief's rule is: is there a
    `no` in front? Then `sino`. Confirm the test does not over-generate — that there is no ordinary
    sentence with a preceding negative in which a speaker still says `pero` — and confirm
    `No lo compré, sino que lo alquilé` is natural rather than written.
75. **The suppositional future in ordinary speech** (M7, note 2). The brief calls `Estará en casa`
    and `Serán las tres` the ordinary way to guess. Confirm this is live everyday usage rather than
    a grammar-book fact with `probablemente` doing the real work, and confirm `Habrá salido` is
    equally ordinary.
76. **`ya claro` and the ironic `ya`** (M7, note 2). Confirm that a turn-initial `ya` followed by
    `claro` reads as disbelief rather than agreement, and that this is safe to teach in print given
    that the course cannot deliver intonation.
77. **The accidental `se` as the default rather than as an excuse** (M8, note 2). The brief says
    `se me olvidó el billete` is the ordinary report of an accident and that `perdí el billete`
    sounds like a confession. Confirm the frequency claim, and confirm that a learner using the `se`
    construction is not heard as dodging responsibility.
78. **The historical present and the pluperfect pull opposite ways** (M9, note 3). The brief claims
    an English speaker under-uses the Spanish narrative present and over-uses `había`. Confirm both
    halves, and confirm `Total que llega, me mira y me dice que no` is how a story is actually told
    at a table.
79. **The direction of the register pivot** (M10, note 3). The brief says moving `usted` → `tú`
    claims an intimacy that may not be offered, while `tú` → `usted` is a legible cooling. Confirm
    both, and say whether an eight-sentence piece that pivots midway is a natural thing for a
    speaker to produce at all, or whether the module is teaching a shape that only exists in
    exercises.
