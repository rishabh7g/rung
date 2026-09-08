# en-es L4 — the authoring-brief decisions (#520)

The ten en-es L4 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['en-es']` L4-M1…L4-M10) are the
first L4 briefed in any course. Every seam below was pinned against the REAL cumulative index — the
fold of `public/content/en-es/index/L1-M1.json` through `L3-M10.json`, read on 2026-09-08 with
`npm run content:owner`, which reports **715 surfaces owned, folded over 30 modules through
L3-M10, maxSpan 3** (L1 closed at 228, L2 at 477, L3 adds the rest) — and against the review chain
the level inherits: `docs/41` (spoken Spanish), `docs/61` (L2) and `docs/77` (L3).

The ten titles and jobs are levels.json's, mirrored verbatim (#423 ratified the list on 2026-09-07);
a brief adds only the authoring guidance on top, and `tools/course-briefs.test.ts` enforces the
mirror. Nothing in L4 is authored yet — this note and the briefs are what the first authoring issue
will be written against, exactly as `docs/53` and `docs/69` were for L2 and L3.

## 1. The index this level is planned against

Every INDEX SEAM line in every brief below was produced by running `npm run content:owner -- en-es`
on the surface in question and quoting what came back; nothing was remembered and nothing was
inferred from the JSON. That is the discipline `tools/index-owner.ts` exists to enforce, and §5
records the places where it contradicted the first instinct.

Two structural facts carry through the whole level:

- **`maxSpan` stays 3.** Every multi-token surface the briefs ask for is two or three tokens
  (`ya que`, `puede que`, `antes de que`, `hasta que llegue`, `en aquella época`). The one phrase
  that would have broken it, `lo que pasa es que`, is indexed as `lo que pasa` plus `es que`.
- **No L1, L2 or L3 file is edited.** A fresh cell of an already-taught verb gets its own row in the
  L4 module that first shows it, with a note pointing back at the first-teach row — `CLAUDE.md`,
  "A level never edits a file below it".

## 2. Register — carried from docs/53 §1, module by module

`docs/53` §1 settled it, `docs/69` §1 applied it unchanged, and L4 adds no new register rule. What
L4 adds is that the level finally contains a module whose whole subject is register:

- **M7 (Official talk) speaks `usted` and third person throughout and chips `formal`** — the only
  module in the level with no informal item. It is the register decision's purest case.
- **M5 (Disagreeing well) shows BOTH addresses deliberately**, because the address is part of what
  is being taught: `tú` frames chip `informal`, `usted` frames chip `formal`, and the discourse
  markers that are safe either way stay `neutral`.
- M1, M3 and M8 speak `tú` and chip `informal` (instructions to a friend, regrets, reminiscing);
  M2, M4, M6 and M9 chip `neutral` and say which address the scene uses in `usage`; M9 carries one
  `formal` item because the stranger giving directions inside the story speaks `usted`; M10 lets
  each story pick, and the quoted line may sit in a different register from the narration.
- Politeness still lives in the FRAME and not in the pronoun. M5 is the module that proves it: every
  softener it teaches works in both addresses.

## 3. What L3 withheld, and where it lands

`docs/69` §2 named two things as L4's and the L3 briefs named three more inside their notes. Each
has an owner now, and this is the list an authoring wave checks itself against:

- **The full imperfect subjunctive → L4-M3.** L3-M4 bought exactly one counterfactual frame
  (`Si tuviera tiempo, iría`) and named the paradigm as deferred here.
- **The passive with `ser` → L4-M7.** L3-M8 named it while teaching impersonal `se` instead; M7 is
  the register that actually uses it, and the brief says in the same breath that everyday Spanish
  prefers `se`.
- **The subjunctive after `aunque` → L4-M4.** L3-M3 opened `aunque` with the indicative and named
  the mood contrast as deferred.
- **Two clitics in one verb (`se lo dije`) → L4-M1.** L3-M5 named it as L4's without an owner. M1
  takes it because the imperative is the one place both placements appear in a single breath
  (`dámelo` attached, `no me lo des` detached), and because "give it to me" is a step in a set of
  instructions rather than a grammatical exercise.
- **The subjunctive as a SYSTEM → spread across five L4 modules, on purpose.** L3-M3 opened the mood
  on one trigger and called the system L4's. L4 does not hand it to one module: purpose (`para que`)
  and negative commands are M1's, the past counterfactual is M3's, concession and impersonal value
  are M4's, doubt is M5's, and time clauses are M6's. A single "subjunctive module" would have been
  a paradigm rather than a nuance, which is the failure mode `docs/69` §2 was written against.

## 4. The ten modules — what each owns and why it sits there

### L4-M1 Explaining how — the imperative, and purpose

Owns both halves of the imperative and the fact that the negative half is the present subjunctive;
`para` + infinitive against `para que` + subjunctive; clitic attachment and the two-clitic cluster.
It is first because everything after it wants to give an instruction inside a longer turn, and
because the negative command is the cheapest possible first payment on the mood.

### L4-M2 Cause and consequence — the connectors, sorted by category

Owns `ya que` / `puesto que` / `dado que` (clause, front), `así que` (clause, after) and
`por` / `gracias a` / `por culpa de` / `debido a` (noun, never a clause). It sits second because a
paragraph is the unit L4 works in and a paragraph is held together by these words. Its rule is about
grammatical category, not meaning, which is briefs rule 2 doing its job.

### L4-M3 What might have been — the imperfect subjunctive and the past counterfactual

Owns `-ara`/`-iera` as a paradigm, `hubiera` + participle against `habría` + participle, `ojalá`,
and the two modal regrets (`debería haber ido`, `tenía que haber ido`). Third, because it is the
direct continuation of L3-M4's single frame and because the level's other subjunctive uses read more
easily once a learner has seen the mood conjugated once.

### L4-M4 Persuading — concession and the impersonal value judgment

Owns `aunque` + indicative against `aunque` + subjunctive, and `es importante que` / `es mejor que` /
`hace falta que`. Fourth, because a case has to be made before it can be softened, which is why M5
follows rather than precedes it.

### L4-M5 Disagreeing well — the subjunctive of doubt, and the softeners

Owns `quizá` / `quizás` / `tal vez` with either mood, `puede que` (subjunctive always), `a lo mejor`
(indicative always), and the discourse markers `pues`, `hombre`, `la verdad`, `más bien`,
`no del todo`. It is the only place in the level where the mood is a CHOICE the speaker makes, and
that is the fact the module is built on.

### L4-M6 Before and after — the mood in time clauses

Owns `cuando` / `hasta que` / `en cuanto` / `mientras` / `después de que` + subjunctive for the
future against the indicative for habit and past, plus `antes de que` (subjunctive always) against
`antes de` + infinitive, and `ya` / `todavía no` on L3-M7's perfect. Sixth, in the middle of the
level, because it is the most productive subjunctive rule in the language and both halves of L4 use
it: M9's journeys and M10's stories are full of time clauses.

### L4-M7 Official talk — the register a learner hears and does not speak

Owns the announcement `se` (`se ruega`, `se prohíbe`, `se comunica`), the passive with `ser`, and the
third-person deontic future (`el pasajero deberá presentar`). Seventh, and deliberately framed as a
COMPREHENSION module first, because this is the Spanish of a learner's first morning at an airport
and almost never of their own mouth.

### L4-M8 Back then — the imperfect as habit

Owns `solía` + infinitive (L3-M1's `suelo` moved a tense), `antes` + imperfect against `ahora` +
present, `ya no`, and the imperfect's three irregulars. Eighth, because it is the cheapest module in
the level — almost every cell it needs is already owned (see §5) — and it clears the ground for M9
and M10, which narrate.

### L4-M9 Places and journeys — path prepositions and the relative clause

Owns `a` / `por` / `hasta` / `hacia` as path, the relative `donde` and `que`, and
`tardar … en` + infinitive. Ninth, as the first of the two recombination modules: it tells one thing
at length and puts L2-M4's directions inside it.

### L4-M10 A story with a twist — discourse, not grammar

Owns nothing grammatical, on purpose. It adds the shift between direct and reported speech inside
one story, the attribution inversion (`dijo Ana`), the raya, and the turn words `de repente`,
`resulta que`, `al final`. It is the level's exit and its budget is connectors.

## 5. Seams — what the index actually said

Twelve `content:owner` answers changed a brief. These are recorded because the first instinct was
wrong, which is precisely the class of error `tools/index-owner.ts` was built to catch.

- **`corta` → L2-M2, not free.** A cooking instruction (`corta el pan`) looked like the most obvious
  sentence in M1. `corta` is already the feminine of `corto` in L2-M2's `Mi madre tiene el pelo
  corto`, and first occurrence wins, so the learner's why-tap would return a haircut. M1 writes
  another verb.
- **`como` → L1-M4, not free.** Sentence-initial causal `como` is the commonest cause connector in
  real Spanish and was M2's obvious first teach. It is L1-M4's "I eat", the same shape as hi-mr's
  `का` bug (review 08, correction 4), so M2 teaches `ya que` instead and names `como` in `usage`
  only. This is the single biggest content decision the index forced in the level.
- **`fuera` and `tuviera` → L3-M4, not free.** M3 would have minted them as fresh paradigm cells;
  L3-M4 spent them on its one counterfactual frame, so M3 extends those two rows.
- **`bueno` and `claro` → L1-M10, not free.** M5's discourse-marker note reads as if these were new
  words. They are L1-M10's connected-talk fillers, so the note lands on L1-M10's rows and no second
  `bueno` is minted.
- **`puede` → L2-M1.** Which is why `puede que` must index WHOLE in M5.
- **`cuando`, `mientras`, `ya`, `todavía`, `en cuanto` → L3-M10, not free.** M6 is the time-clause
  module and would naturally have opened all five. L3-M10 spent them on its accounts, so M6 extends
  five L3-M10 rows and opens no second key for any of them.
- **`antes` → L1-M5 and `después` → L1-M6**, which is exactly why `antes de` and `antes de que` must
  index WHOLE at two and three tokens.
- **`hasta luego` → L1-M10** while bare `hasta` is free: M6 gets the bare word, but with a neighbour
  on the same first token.
- **`desde hace` → L3-M7** and **`desde entonces` → L3-M10**, both pointed at rather than re-opened
  by M6.
- **`donde` is free but `dónde` → L1-M7.** Two keys, because accents are letters (L1-M2's law). M9's
  relative `donde` therefore gets its own row and its note must say why its accented twin is a
  question word.
- **`fue` → L1-M5.** The ser-passive in M7 leans on a preterite key the course bought in its fifth
  module, which makes the level's most formal shape its cheapest. `hecho` → L3-M7 and `roto` →
  L2-M8, so M7's participle list must skip both.
- **Almost all of M8 is already owned.** `antes` → L1-M5, `ahora` → L2-M7, `era`/`estaba`/`comía` →
  L1-M5, `trabajaba`/`vivía` → L3-M10, `tenía`/`sabía` → L3-M5 (backshifted for reported speech),
  `siempre`/`nunca` → L3-M1, `cada` → L3-M7, `suelo`/`suele`/`sueles` → L3-M1. Only `solía`,
  `solían` and a handful of time frames are fresh, which is what makes M8 the cheapest module in
  the level and why it can afford the then-against-now contrast at length.

One further seam was checked against the real function rather than assumed, in the manner
`tools/course-briefs.ts`'s header requires: **the dialogue raya costs the index nothing.**
`normalizeSurface('—No sé —dijo ella.')` returns `no sé dijo ella` — rule 3 strips edge punctuation
per token — so `—dijo` resolves straight onto L2-M10's `dijo` row and M10 needs no dash key.

## 6. The shape of the level

- **Bounds climb 12 → 14**, continuing L1's 6 → 8, L2's 8 → 10 and L3's 10 → 12. They are set per
  module by the shape the module writes, not by position: **12** for M1 (an instruction is short)
  and M6 (a time clause plus a main clause is two short halves); **13** for M2, M3, M5 and M8, all
  of which write two clauses with a connector between them; **14** for M4 (a concession plus a
  counter-claim), M7 (officialese is long by nature and this module is read more than spoken), M9
  (a journey sentence carries a path phrase and a time phrase at once) and M10.
- **M10's 14 is per sentence INSIDE the account**, as at L3-M10. It is one word above L3-M10's
  because an attribution clause (`—dijo el panadero`) is grammatically part of the sentence and eats
  three tokens that carry no new content.
- **`newWordCap` stays the PRD §5 25 everywhere.** M8, M9 and M10 will not come close to it: their
  spend is tense cells and connectors over vocabulary, which is the point of putting them last.

## 7. What L4 defers to L5, and why

- **The emotion and value subjunctive with a personal subject** — `me alegro de que vengas`,
  `es una pena que no vinieras`, `me molesta que`. L4 already lands five subjunctive triggers across
  five modules; a sixth class would turn the level into a mood paradigm, which is exactly what
  `docs/69` §2 refused for L3. `ojalá` in M3 covers the wish a learner actually needs, and L5 owns
  the class.
- **The relative-clause subjunctive of the unknown antecedent** — `busco a alguien que sepa` — for
  the same reason, and because it needs relative clauses to be comfortable first, which is M9's job.
- **The `-se` imperfect subjunctive** (`hablase`, `tuviese`). Named in M3's `usage` as the same tense
  spelled another way, commoner in Spain and in writing; never produced.
- **The pluperfect indicative** (`había llegado`) and the future perfect. M6 and M8 both brush
  against them and both decline; three pasts sharing one account is already L3-M10's lesson and a
  fourth would blur it.
- **The accidental `se`** (`se me olvidó el billete`, `se nos hizo tarde`). M9's journeys invite it
  at every turn, which is why the brief declines it in writing rather than by omission.
- **The historical present in narrative.** M10 names it and keeps to the preterite.
- **Irony, implication and teasing** (L5-M2, L5-M7); ceremony, toasts and condolences (L5-M4);
  regional and generational speech (L5-M3). M5 and M7 each sit one step away from these and each
  says so.

## 8. Open questions for the native-speaker gate

The gate is a separate, stricter bar and stays unmet (`CLAUDE.md`). This continues the en-es chain
begun in `docs/77`, whose last number is 49; nothing existing is renumbered. These are questions
about the BRIEFS, and an authoring wave will add its own about the sentences it ships.

50. **`Si habría sabido` in the mouth** (M3, note 3). The brief says the levelled form is common in
    some regions and still heard as an error across the language. Confirm both halves, and confirm
    that saying so in a `usage` line reads as description rather than as a judgement on the speakers
    who use it.
51. **`ya que` as the everyday fronted cause** (M2, notes 2 and 4). The index forbids causal `como`.
    Confirm `ya que` is what a speaker actually says in that slot in ordinary speech — not
    `puesto que` or `dado que`, which the brief marks as written — and that
    `Ya que no hay tren, vamos en coche` is natural rather than stiff.
52. **`aunque sea` against `aunque es`** (M4, note 2). Confirm the brief's gloss — indicative for a
    fact both speakers accept, subjunctive for a possibility the speaker will not commit to — is how
    the contrast is actually felt, and that `Aunque sea caro, lo compro` does not read as
    concessive-formal.
53. **`quizá` with the indicative** (M5, note 2). The brief makes the mood the hedge: subjunctive for
    genuine doubt, indicative for near-certainty. Confirm that this is a live choice speakers make
    and not a prescriptive rule with a flat spoken reality underneath it.
54. **`bueno` as the opener of a refusal** (M5, note 3). Confirm the claim that a turn-initial
    `bueno` very often begins a disagreement, and that an English speaker hearing "good" is a real
    misreading rather than a teacher's story.
55. **`Cuando llego, te llamo`** (M6, note 3). The module's whole design rests on this being
    grammatical Spanish that means a HABIT rather than a mistake. Confirm it, and confirm the
    minimal pair against `Cuando llegue, te llamo` is the right one to author.
56. **`después de que` with the indicative** (M6, note 2). The brief groups it with the future-time
    subjunctive conjunctions. Confirm that spoken usage does not routinely take the indicative there
    even for future reference, and if it does, say which the module should teach.
57. **`fue construido` about a building** (M7, note 2). Confirm the brief's frequency claim — that
    everyday Spanish prefers impersonal `se` and the ser-passive belongs to signs, news and plaques —
    and that a learner using it of their own flat really does sound like a plaque.
58. **`¡El siguiente!` at a counter** (M7, note 3). Confirm this is the bare, complete utterance at a
    Spanish counter, and give the regional twin if `¡El próximo!` or `¡Que pase el siguiente!` is
    what is heard instead.
59. **`solía` in ordinary speech** (M8, note 2). Confirm `solía` is genuinely used in conversation
    rather than being a textbook form that a plain imperfect covers, and that
    `Antes vivía en Madrid` is what most speakers would actually say.
60. **The imperfect's three irregulars** (M8, note 2). Confirm `era`, `iba` and `veía` are the whole
    list, so the brief's gift-not-paradigm framing is true and not merely tidy.
61. **`tardamos dos horas en llegar`** (M9, note 3). Confirm the frame, and confirm whether
    `Tardamos dos horas` alone is the commoner spoken form with the infinitive dropped.
62. **The raya and the attribution inversion** (M10, notes 2 and 3). Confirm `—No queda pan —dijo el
    panadero.` is punctuated as a native reader expects, and that the inversion is obligatory rather
    than stylistic after a quoted line.
63. **Register inside a story** (M10, note 4). The brief allows a quoted line to sit in a different
    register from the narration. Confirm this is ordinary rather than jarring in a six-sentence
    spoken anecdote.
