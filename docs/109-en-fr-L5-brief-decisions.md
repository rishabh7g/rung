# en-fr L5 — the authoring-brief decisions (#569)

The ten en-fr L5 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['en-fr']` L5-M1…L5-M10) are the
last level this course will ever be briefed for. Every seam below was pinned against the REAL
cumulative index — the fold of `public/content/en-fr/index/L1-M1.json` through `L4-M10.json`, read
on **2026-09-08** through `npm run content:owner`, which reported

    981 surfaces owned, folded over 40 modules through L4-M10

with `maxSpan` **6** (`public/content/en-fr/index/L4-M10.json`, `surfaceCount: 981`,
`maxSpan: 6`). Nothing here was remembered: every ownership claim in the briefs was produced by a
`content:owner` query, and the surprising ones (`par`, `argent`, `salut`, `monsieur`, `par exemple`)
were run twice and then checked a third time against a grep of every `display` in
`content/en-fr/modules/`.

**The index moved under this wave and that matters.** The first query of the session reported
`902 surfaces … over 36 modules through L4-M6`; the L4 authoring wave landed M7, M8, M9 and M10
while the briefs were being written, and the numbers above are the finished L4. Every claim in the
briefs was re-checked against the 981-surface fold, so `docs/91` §5's L4→L5 deferrals are all
verified as ACTUALLY unspent rather than merely promised.

Titles and jobs are `content/en-fr/levels.json`'s, verbatim — the L5 list is RATIFIED (#423,
2026-09-07) and a brief only adds the authoring guidance on top. The review chain the level
inherits is `docs/43` (spoken French), `docs/58` §4–§5 (the laws), `docs/74` (L3 decisions),
`docs/82` (fifty-seven open questions), `docs/91` (L4 decisions) and `docs/100` (the L4 review).

## 1. The three laws this course already had, carried into L5

- **The `ne` is WRITTEN** in every display, and the spoken drop is named in prose and never shown
  (`docs/58` §4). L5 is where this law stops being a convention and becomes a subject. Two modules
  have to talk about it out loud: **L5-M3**, whose job is literally what marks an outsider and
  whose truest answer is *the learner's completeness* — the full `il ne le sait pas` where a French
  speaker says `il le sait pas`; and **L5-M10**, whose register switch cannot be carried by the
  dropped `ne` because the course writes it in both halves, and must therefore be carried by
  pronoun, connector and lexis. The law also bites a shipped item: the idiom is spoken
  `c'est pas la mer à boire` and this course writes `ce n'est pas la mer à boire` (L5-M1). Nothing
  in L5 is granted an exception, because one exception makes the law unenforceable.
- **Straight apostrophes only**, one spelling per display, and every elided form is **ONE key with
  the elision inside it**. `docs/74` recorded that six of ten L3 seam corrections were this class
  and `docs/91` §1 re-stated it; L5's cleanest illustration is in M5, where `content:owner` reports
  **`argent  free`** and **`l'argent  free`** as two separate free keys, so
  `L'argent ne fait pas le bonheur` needs the elided key written as its own row. The same pair
  recurs at `homme → L2-M3` beside `l'homme  free` (M8), and at `amour`/`l'amour`,
  `idée`/`l'idée`, `essentiel`/`l'essentiel` (M5).
- **Register carries from `docs/58` §1**: `tu` among friends, `vous` at a counter. L5 makes the
  split a whole module twice over — M3 teaches choosing it, M10 teaches CHANGING it mid-piece —
  and `content:owner` reports `vous → L1-M2` and `tu → L2-M1`, so neither module opens a pronoun.

## 2. What L4 withheld, and where each piece lands

`docs/91` §5 left seven debts with this level's name on them. Five have an owner; two do not, and
§5 below names them as holes rather than passing them on, because there is nothing left to pass
them to.

- **The passive as a SYSTEM → L5-M4.** L4-M7 showed `est annulé` and `sera fermé` as fixed
  announcement shapes and said in as many words that the system is L5's. M4 takes it because
  `Formal occasions` is where the register that USES the passive lives, and because the French
  half of the lesson — that French avoids the passive with `on` and the pronominal — needs a
  module with a formal register to contrast against.
- **Result clauses (`si bien que`, `tellement … que`) and concession clauses (`bien que`,
  `quoique`) → L5-M6.** L4-M2 and L4-M4 both declined them by name. They land together because
  `Arguing a position` is the only job in the level that needs a three-clause sentence, and because
  a concession clause is the subordinate version of the two-move sequence L4-M4 taught — teaching
  it anywhere else would separate the two halves of one contrast.
- **The full inversion paradigm → L5-M6.** `docs/74` §2 kept `est-ce que` as the question marker
  and L4-M7 admitted at most two frozen inverted questions. M6 takes the paradigm as a REGISTER
  rather than as a grammar, and the index made the decision cheap (see §4).
- **The passé simple → L5-M9, as recognition only.** L4-M8 and L4-M10 both named it not-taken.
  It lands in `Telling it your way` because a *known* story in French is a WRITTEN story, and
  written stories are in this tense; the module's job is exactly the transposition from the tense
  you read to the tense you speak. It is handled the way L4-M7 handled the futur simple:
  recognition, third person only, never in a display the learner is asked to produce.
- **Two clitics in a row → L5-M7.** L4-M9 wrote that *the order table is a module of its own*.
  It does not get one: the L5 titles are ratified (#423) and none of the ten is a pronoun module,
  so the table rides inside `Between the lines` with a deliberately bounded scope — two pronouns
  only, `me`/`te`/`nous`/`vous` before `le`/`la`/`les`, and `le`/`la`/`les` before `lui`/`leur`.
  It sits there rather than anywhere else because an indirect request and an insinuation are made
  almost entirely of things already named (`je te l'avais dit`, `tu aurais pu me le dire`).
  The third-position `y` and `en` are NOT taken; §5 records that as a named gap.
- **The past and imperfect subjunctive → nowhere.** See §5.
- **The futur antérieur → nowhere.** See §5.

## 3. A section per module

**M1 "Sayings and idioms"** owns **the fixed expression as one lexical item** — stored whole,
unvariable, and carrying a register that is half the teaching. It sits first because an idiom is
the cheapest possible demonstration of what L5 is: nothing new grammatically, everything new
socially. Its productive sub-classes are `avoir` + DETERMINED noun (`avoir le cafard`,
`avoir la flemme`) against the `avoir` + bare noun the learner has held since L1, and
`en avoir` + noun.

**M2 "Humour and teasing"** owns **the exclamative** (`Qu'est-ce que tu es drôle !`,
`Comme c'est malin !` — ordinary word order after the marker, against English's inversion) and
**the overt irony marker** (`tu rigoles`, `je te taquine`, `c'était pour rire`). It is second
because banter is the first thing a learner does wrong once they have idioms, and it is
deliberately separated from M7: **M2's humour is MARKED and cooperative, M7's is unmarked and
pointed**, and running them together would destroy both modules.

**M3 "How they say it there"** owns **variation along four named axes** — place, age, register,
and what speech DROPS that this course still writes. It sits third because everything after it is
a register choice, and a learner who cannot hear the axes cannot make the choice. It is also the
module that explains the `ne` law rather than merely obeying it.

**M4 "Formal occasions"** owns **the passive as a system**, its agreement, its `par` agent, and —
inseparably — the French preference for `on` and the pronominal (`ça se dit`, `ça ne se fait pas`).
It sits fourth because it is the first module that needs a whole grammatical system, and because
it pairs naturally with M3's register axis while that axis is still fresh.

**M5 "Big questions"** owns **the definite article on an abstract noun** (`la liberté`,
`l'argent`) and **the `ce qui` / `ce que` cleft**. It is the first module in the course where the
subject of a sentence is an idea, and the article rule is the single most reliable error an
English speaker makes in abstract French.

**M6 "Arguing a position"** owns **concession clauses with the subjunctive**, **result clauses
with the indicative**, and **inversion as a register**. It is the level's structural peak and its
only 15-word module. It sits after M5 because an argument needs abstract nouns to argue about, and
after L4-M5 because `bien que` cannot open a mood in passing.

**M7 "Between the lines"** owns **litotes** (`ce n'est pas mal`, `pas faux`, and the reversing
`pas terrible`) and **two object pronouns in a row**. It sits seventh because implication only
works once the learner can say the thing plainly, and every module before it has been about saying
things plainly.

**M8 "When words run out"** owns **the defining relative clause** and with it **`dont`**, plus the
`qui`/`que` split stated by GRAMMATICAL ROLE. It is the most immediately useful module in the
level and is authored as a survival kit. It sits eighth, not first, because a paraphrase is only
worth teaching once there is enough French underneath it to paraphrase WITH.

**M9 "Telling it your way"** owns **the passé simple as recognition** and the transposition from
the tense you read to the tense you speak. Ninth, as the level's second-hardest module and the
last one that opens anything.

**M10 "Your own voice"** owns **nothing new**. Its content is register as four carriers moving
together — address pronoun, connector, lexis, sentence shape — and eight sentences with the switch
motivated inside the account. The per-sentence bound applies INSIDE the piece, as at L3-M10 and
L4-M10.

## 4. Seams — where the index contradicted the first instinct

Every line here is a `content:owner` result, quoted. These are the ones where the honest answer was
not the expected one.

- **`par` is FREE after forty modules.** `content:owner` reports `par  free`, although three
  shipped modules show it — `par accident` (L2-M8), `par conséquent` (L4-M2) and `par contre`
  (L4-M4) are each indexed WHOLE, so the bare preposition was never spent. The first instinct —
  *a course that has shown `par` three times must own it* — is wrong, and M4's passive agent
  marker is genuinely free. Checked against the emitted index and against a grep of every
  `display` in `content/en-fr/modules/`.
- **`argent` AND `l'argent` are both free, after L3-M8 "Money and paperwork".** `content:owner`
  reports both `free`. The word occurs in the whole course only inside an L3-M8 *note*
  (*argent is money in general; espèces is notes and coins*), never in a `display` — it is glossed
  but unowned. M5 takes it, and it is the level's cleanest demonstration of the elision law,
  because the two keys are separate and the bare one does not answer for the elided one.
- **`salut` is FREE, in a course whose L1-M2 is "First exchange".** `content:owner` reports
  `salut  free` while `bonjour → L1-M2` and `au revoir → L1-M2`. Checked twice and then grepped:
  the familiar greeting genuinely never appears in any display. M3 takes it. It is the strongest
  single piece of evidence that this course's L1 is a `vous`-first course.
- **`monsieur` is free and `madame → L4-M7`.** `content:owner` reports the asymmetry plainly.
  L4-M7 took one and not the other; M4 takes `monsieur`.
- **`cher` and `chère` are L1-M8's, and they mean EXPENSIVE.** `content:owner` reports
  `cher  L1-M8` and `chère  L1-M8`; the owning displays are `C'est trop cher` and
  `Ça ne coûte pas cher`. M4's letter opening must therefore be `cher monsieur` as a WHOLE key —
  a bare `cher` row at L5 would sit unreachable behind a price note, which is `docs/74`'s `का`
  rule in French. This is the seam the wave was closest to shipping wrong.
- **`fermé` and `annulé` are L4-M2's, not L4-M7's**, although `docs/91` §3 assigns both to M7.
  `content:owner` reports `annulé  L4-M2`, `fermé  L4-M2` and `ouvert  L4-M7`. First occurrence
  wins and L4-M2 shipped first. The L4 decisions doc is now known to be loose on this pair, in
  exactly the way `docs/74` was loose about `c'était`.
- **`été` is L4-M3's**, as `docs/91` §4 predicted it would be. `content:owner` reports
  `été  L4-M3`, so M4's `a été` is a two-token WHOLE key (`a été  free`, `ont été  free`) whose
  note points back rather than reopening the participle.
- **`grave` is L3-M10's.** `content:owner` reports `grave  L3-M10`, where it is *serious*. M3
  wants it as the youth intensifier and cannot have a bare row; `c'est grave bien` is written
  whole with a note pointing back. Another `का` case.
- **`dit` is L2-M6's, and it is the passé simple cell a fairy tale uses most.** `content:owner`
  reports `dit  L2-M6`. The third-person passé simple of `dire`, its present and its participle
  are one spelling and the index cannot tell them apart, so M9 may never open a `dit` row;
  `il dit` is `free` as a two-token key, and L4-M10's `il m'a dit` is the other pointer.
- **`si` is L3-M4's**, where it is the conditional *if*. `content:owner` reports `si  L3-M4`,
  `mais si  free` and `si si  free`. M7's contradicting `si` — the answer to a negative question,
  and the module's best single line — must be written whole, or the learner is shown an *if* note
  under a sentence that means *yes it is*.
- **Inversion is nearly free in the index, and every part is already owned.** `content:owner`
  reports `avez-vous  free  [parts: avez → L1-M5, vous → L1-M2]`,
  `êtes-vous  free  [parts: êtes → L1-M1, vous → L1-M2]`,
  `que pensez-vous  free  [parts: pensez → L1-M9, vous → L1-M2]`,
  `n'est-ce pas  free  [parts: n'est → L2-M7, ce → L2-M1]` and
  `puis-je  free  [parts: puis → L1-M10, je → L1-M1]`. This is the OPPOSITE of the usual hyphen
  result: an inverted question buys nothing and strands no bare word. Contrast
  `pourriez-vous  L4-M7  [parts: pourriez → L4-M7, vous → L1-M2]`, which L4-M7 took and which
  bought bare `pourriez`. `puis-je` still sits on top of L1-M10's `puis` meaning *then*.
- **`qu'est-ce que` is FREE and buys bare `qu'est`.** `content:owner` reports
  `qu'est-ce que  free  [parts: qu'est → free, ce → L2-M1]` while `est-ce que  L2-M1`. The
  question marker is owned and the exclamative frame is not, and they are DIFFERENT keys — the
  first instinct that one covers the other is wrong. M2 and M8 both want it; whichever ships
  first owns it and the other re-uses, and both briefs say so.
- **`c'est-à-dire` buys bare `dire`.** `content:owner` reports
  `c'est-à-dire  free  [parts: c'est → L1-M8, à → L1-M4, dire → free]`. M8 wants the bare
  infinitive anyway, so the purchase is taken deliberately and the note is written for the bare
  word rather than only for the hyphenated whole.
- **The numbers M3 wants are hyphen purchases.** `content:owner` reports
  `soixante-dix  free  [parts: soixante → free, dix → L1-M8]` and
  `quatre-vingt-dix  free  [parts: quatre → free, vingt → L1-M8, dix → L1-M8]` — so the
  Belgian/Swiss contrast spends bare `soixante` and bare `quatre`, which L1-M8 never took.
  `là-bas  free  [parts: là → L2-M7, bas → free]` buys bare `bas`.
- **The imperative clitic forms each buy one bare verb.** `content:owner` reports
  `passe-le-moi`, `donne-le-moi` and `dis-le-moi` all `free`, with parts
  `passe → free`, `donne → free`, `dis → free` and `le → L1-M1`, `moi → L2-M1`. L4-M1's `tu`
  imperative list did not take any of the three bare forms, so M7 buys whichever it writes.
- **No bare clitic is available to M7 at all.** `content:owner` reports `me → L2-M5`,
  `te → L2-M5`, `le → L1-M1`, `lui → L3-M5`, `leur → L3-M5`, `moi → L2-M1`. Every double-pronoun
  surface is therefore multi-token and WHOLE: `me le`, `te le`, `le lui`, `la lui`,
  `je te l'avais dit`, `tu aurais pu me le dire` and `je vous l'envoie` are all `free`.
- **The sequencing words M6 wanted are L2-M10's.** `content:owner` reports `d'abord  L2-M10`,
  `ensuite  L2-M10`, `enfin  L2-M10`. M6's own outline therefore runs on `premièrement`,
  `d'une part` and `d'autre part`, all `free`.
- **`par exemple` is free after forty modules.** `content:owner` reports `par exemple  free`.
  Checked twice; a course can apparently reach L5 without ever giving an example by name.
- **`j'y` is free**, confirming that L4-M9's `j'y suis allé` was indexed whole as its brief said:
  `content:owner` reports `j'y  free`.
- **The whole of L4's claimed spend actually landed.** `certes`, `en revanche`, `pourtant`,
  `cependant`, `d'un côté`, `de l'autre`, `quand même`, `en fait` → `L4-M4`; `fasse`, `sache`,
  `vienne`, `dise`, `prenne`, `ça dépend`, `franchement`, `plutôt`, `je ne suis pas sûr que`,
  `il me semble que` → `L4-M5`; `veuillez`, `prière de`, `sera`, `ouvert`, `madame`,
  `pourriez-vous` → `L4-M7`; `tout à coup`, `soudain`, `finalement`, `alors que`, `sauf que`,
  `rien`, `quelqu'un`, `sac` → `L4-M10`. No L5 module needs to re-open any of them.

## 5. Where every deferral lands — and the two holes

This is the last level. A deferral that lands nowhere is a hole in the product, so it is named as
one here rather than passed on.

**Landed** (§2): the passive → M4; result and concession clauses → M6; inversion → M6; the passé
simple → M9; two clitics in a row → M7.

**HOLE 1 — the futur antérieur.** `docs/91` §5 deferred it to L5 on the grounds that *nothing at
this level needs it once M6 has the same-subject infinitive*. Nothing at L5 needs it either, and
no L5 module takes it. The course therefore ships without it. The concrete residue: a learner can
say `après avoir fini, je t'appelle` (L4-M6's same-subject infinitive) but cannot say
`quand tu auras fini, appelle-moi` — the DIFFERENT-subject *once you have finished* has no form
on this ladder, and the learner will produce `quand tu as fini`, which is understood and wrong.
Open question 106 asks the native-speaker gate how costly that is.

**HOLE 2 — the past and imperfect subjunctive.** `docs/91` §5 deferred them as literary, and
L4-M5's brief says *L5's if ever*. They are not taught. This is a deliberate hole rather than an
accidental one — they are genuinely literary — but it must be recorded as a hole, not as a
deferral, and L5-M6 names them as not-taken in the module a reader would expect them in.

**PARTIAL — the clitic order table.** M7 takes two pronouns; it does not take `y` and `en` in
third position (`il y en a` stays L4-M9's whole surface, and `je le lui y ai mis` is not French
anybody says). What is missing is the three-clitic sequence and the `en` of quantity after an
indirect object. This is the smallest of the three gaps and the only one this wave would fix if
the level had an eleventh module.

**PARTIAL — the relative after a preposition.** M8 opens `dont` and names `lequel`, `duquel` and
`auquel` as not-taken, on the grounds that they are a written register. A learner therefore cannot
say `la ville dans laquelle j'habite` and will say `la ville où j'habite`, which is what most
French speakers say anyway. Recorded here so that the gate can disagree (question 107).

## 6. The shape of the level

- **Bounds run 12 → 15, and they go DOWN before they go up.** M1 and M2 at **12**, M3 and M7 at
  **13**, M4, M5, M8, M9 and M10 at **14**, M6 alone at **15**. L4 exited at 14; this level opens
  BELOW that, on purpose. An idiom is short, a tease is short, and a module whose difficulty is
  social rather than syntactic should not be given room to become syntactic — M1 and M2 at 12 is
  the clearest way a brief can say *this is not about length*. M3 and M7 sit at 13 because both
  are built from PAIRS of short lines (a neutral form against a familiar one; a flat sentence
  against what it implies) and a long sentence would blur the pair. M4, M5, M8 and M9 sit at 14,
  L4's exit, because each is structurally a main clause with one subordinate inside it — a passive
  with an agent, a cleft, a defining relative, a retelling with a `que`-clause — and 13 forces the
  subordinate to be a stub. **M6 alone goes to 15**, because a concession clause plus a main
  clause plus a result clause is genuinely three clauses and it is the one module whose job IS
  length. Nothing goes to 16: `docs/91` §6 climbed 12→14 across a whole level, and a top level
  that climbed as far again would be teaching stamina rather than voice. M10 stays at 14 with the
  bound applying INSIDE the piece, per sentence, as at L3-M10 and L4-M10 — eight sentences at 15
  is a wall, and the register switch is already the hard part.
- **`newWordCap` stays the PRD §5 25 everywhere.** `docs/91` §6's argument holds and is not
  re-litigated: a cap is a ceiling rather than a target. Two modules could argue for less and do
  not. M1 is a vocabulary-shaped module where every item is a WHOLE multi-token key, so 25 keys is
  fewer new WORDS than the number suggests; M10 is the exit and should open nothing, but its real
  discipline is its own note — *any surface the ladder has not already paid for* — which a number
  cannot express.
- **Three facts are stated because they are traps rather than grammar**, continuing the L3 and L4
  tradition: `or` is not English *or* but a turn word (M6, and it is the flattest false friend
  since L4-M4's `actuellement`); `pas terrible` reverses while every other litotes in M7 does not;
  and the passé simple of `dire` is spelt like its present and its participle (M9), which is a
  fact about the INDEX as much as about French and is why M9 can never open a `dit` row.
- **The delta worth naming once, and repeated in four modules**: English marks with INTONATION and
  CONTRACTION what French marks with WORDS. Sarcasm has no French intonation this course can show
  (M7), banter is signalled lexically rather than delivered deadpan (M2), the outsider is marked
  by completeness rather than by accent (M3), and a register switch is carried by pronoun,
  connector and lexis because the course writes the `ne` in both halves (M10). It is the same
  observation four times, and it is what makes `Voice` a level rather than a vocabulary list.
- **Two modules contend for one key and the briefs say so.** M2 and M8 both want
  `qu'est-ce que`; whichever ships first owns it and the other re-uses. This is recorded in both
  briefs rather than resolved here, because authoring order within a level is not this doc's to
  fix.
- **The last module has a standing warning.** By the time L5-M10 is authored, nine L5 modules will
  have shipped and `content:owner` will not see them until the parent rebuilds. Its brief
  instructs the author to read the L5 rows on disk with `python3` before calling any surface free
  — the same discipline this wave needed for L4-M7 through L4-M10.

## 7. Open questions for the native-speaker gate

Continuing this course's chain; `docs/91` ends at 81.

82. **The idiom set and its registers** (M1). Confirm that `en avoir marre`, `avoir la flemme`,
    `poser un lapin`, `avoir le cafard`, `ça vaut le coup`, `revenons à nos moutons` and
    `coûter les yeux de la tête` are all live today, and rank them by how marked each is. Say
    which of them a foreigner using it would be heard as charming and which as trying too hard.
83. **`ce n'est pas la mer à boire` written in full** (M1). The level's sharpest collision between
    a law and a fixed form. Confirm whether writing an idiom's `ne` — which nobody says — makes
    the idiom read as wrong rather than merely formal, and if so, whether the idiom should be cut
    rather than written incorrectly.
84. **The two exclamative frames** (M2). Confirm `Qu'est-ce que tu es drôle !` and
    `Comme c'est malin !` are what is actually said, that neither inverts, and which of the two a
    speaker reaches for first.
85. **Marked banter** (M2). The wave's strongest pragmatic claim: that French teasing among friends
    is SIGNALLED (`je te taquine`, `c'était pour rire`) where English teasing is often deadpan, and
    that an unmarked deadpan tease from a foreigner is heard as a real opinion. Confirm or refute.
86. **`salut` and the `vous`-first L1** (M3). `salut` is unowned after forty modules. Confirm that
    is a real gap rather than a reasonable choice, and say at what point in a ladder a learner
    should be given the familiar greeting.
87. **The completeness claim** (M3). The level's largest sociolinguistic claim: that what marks an
    English speaker is not accent but the full `ne`, the full `oui`, the full `tu as`. Confirm it,
    and advise whether a course that never writes the reduced forms can honestly teach them in
    prose alone.
88. **Regional and generational samples** (M3). Confirm `chocolatine`, `poche` for `sac`,
    `septante` and `nonante` as stated, and confirm that `meuf`, `relou` and `chelou` are still
    current rather than dated verlan. Name anything in the set that has aged out.
89. **The passive and its avoidance** (M4). Confirm the three-way rule as stated — passive when the
    doer is named or withheld in a formal register, `on` when the doer is irrelevant, the
    pronominal for what is generally done — and say whether the frequency claim (English passive
    freely in speech, French mostly in writing) is as categorical as the brief makes it.
90. **Condolence and toast formulae** (M4). Confirm `toutes mes condoléances`,
    `je suis de tout cœur avec vous`, `à votre santé` and `je tiens à remercier` are what is
    actually said, and confirm that `je suis désolé` at a funeral is thin rather than wrong.
91. **`cher monsieur`** (M4). Confirm the letter opening, and advise whether a course whose bare
    `cher` means *expensive* should write `cher monsieur` at all or use `monsieur` alone.
92. **The abstract definite article** (M5). The level's largest grammatical claim. Confirm that a
    noun in its general sense always takes the definite article, name the everyday exceptions
    (`avoir faim`, `sans argent`, `parler politique`), and confirm that `argent ne fait pas le
    bonheur` is a recognisable learner error.
93. **`croire en` against `croire à`** (M5). Confirm the split as stated, and whether it is
    categorical or a tendency.
94. **`bien que` in speech** (M6). L4-M4's brief calls `bien que` *not what anybody says in a
    conversation* and this module teaches it. Confirm both can be true — that it is rare in
    conversation and normal in a carefully-made case — and say where the line sits.
95. **`or`** (M6). Confirm the turn word, its register, and whether a learner will be understood
    using it in speech or only read it.
96. **Inversion as register** (M6). Confirm that `Que pensez-vous de … ?` is a raised register
    rather than a neutral question, that `est-ce que` remains correct everywhere, and name the two
    or three inverted questions a learner will most often be ASKED.
97. **Litotes** (M7). Confirm `ce n'est pas mal`, `il n'est pas bête` and `pas faux` mean what the
    brief says, and confirm that `pas terrible` reverses. Say whether the reversal is a fact about
    that phrase alone or about a class.
98. **Sarcasm without audio** (M7). The module's honest constraint. Advise which ironic lines are
    recoverable from words and situation alone, and whether a text-only course should teach the
    recognition of French sarcasm at all.
99. **Double clitic order** (M7). Confirm `je te l'avais dit`, `tu aurais pu me le dire` and
    `je vous l'envoie`, confirm the flip after a positive imperative (`donne-le-moi`), and say
    whether two clitics without the third position leaves a learner able to speak.
100. **The contradicting `si`** (M7). Confirm that `si` is obligatory rather than optional in
     answer to a negative question, and that `oui` there is heard as an error rather than as an
     accent.
101. **`dont`, and the relative that cannot be dropped** (M8). Confirm `dont` is everyday rather
     than written, and confirm that dropping `que` (`la chose j'ai achetée`) is a real and
     frequent learner error.
102. **Placeholder nouns** (M8). Confirm `truc`, `machin` and `un truc qui sert à` are what a
     French speaker reaches for, and say which is neutral enough for a stranger.
103. **The passé simple as recognition** (M9). The wave's most structural register claim, and the
     twin of `docs/82` question 74 about the futur simple. Confirm that a learner meets this tense
     only in reading, that recognition-only is not leaving them short, and that the third person
     alone is the right slice.
104. **`dit` as three things** (M9). Confirm that the present, the participle and the passé simple
     of `dire` really are one spelling, and advise how a course whose index owns one spelling
     should teach the other two.
105. **The register switch without the `ne`** (M10). The level's closing question. Confirm that
     pronoun, connector and lexis alone carry a register change convincingly in WRITING, given
     that this course never drops the `ne`, and name anything else that should carry it.
106. **The futur antérieur gap** (HOLE 1, §5). Confirm how costly it is that the course ships with
     no `quand tu auras fini`, and whether `quand tu as fini` is understood, wrong, or regional.
107. **The relative after a preposition** (PARTIAL, §5). Confirm that `la ville où j'habite`
     genuinely serves for `la ville dans laquelle j'habite` in everyday speech, and name the cases
     where `lequel` cannot be avoided.
