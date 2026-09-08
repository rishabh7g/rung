# en-fr L4 — the authoring-brief decisions (#525)

The ten en-fr L4 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['en-fr']` L4-M1…L4-M10) are the
first L4 briefed for this course. Every seam below was pinned against the REAL cumulative index —
the fold of `public/content/en-fr/index/L1-M1.json` through `L3-M10.json`, read on **2026-09-08**
through `npm run content:owner`, which reported

    783 surfaces owned, folded over 30 modules through L3-M10

with `maxSpan` **4** (`public/content/en-fr/index/L3-M10.json`, `surfaceCount: 783`,
`maxSpan: 4`). Nothing here was remembered: every ownership claim in the briefs was produced by a
`content:owner` query and the surprising ones were run twice.

Titles and jobs are `content/en-fr/levels.json`'s, verbatim — the L4 list is RATIFIED (#423,
2026-09-07) and a brief only adds the authoring guidance on top. The review chain the level
inherits is `docs/43` (spoken French), `docs/58` §4–§5 (the two laws), `docs/74` (the L3 decisions)
and `docs/82`'s fifty-seven open questions.

This note records the decisions the briefs are written to, so the authoring waves inherit them
without re-deriving anything. The briefs repeat each decision in the module notes, because a prompt
only ever shows an author the notes.

## 1. The two laws this course already had, carried into L4

- **The `ne` is WRITTEN** in every display, and the spoken drop is named in prose and never shown
  (`docs/58` §4). L4 leans on it in four modules at once: M1's negative imperative
  (`Ne le mets pas`), M5's hedges (`je ne suis pas sûr que`), M6's `pas encore`, M8's `ne … plus`
  and M10's `rien`. A learner who writes what they hear has produced something no French text
  contains.
- **Straight apostrophes only**, one spelling per display, and every elided form is **ONE key with
  the elision inside it** — `j'avais`, `j'aurais`, `jusqu'à`, `qu'on`, `m'a`, `j'y`, `d'un côté`.
  `docs/74` recorded that six of en-fr's ten L3 seam corrections were this one class, so every
  elided surface named in an L4 brief was passed through `content:owner` rather than assumed to be
  covered by its unelided root.

Register carries from `docs/58` §1 and `docs/74`: the course speaks `tu` among friends and `vous`
at a counter. L4 makes the split a subject in two places — M1 finally writes the `tu` imperative
L2-M4 named and refused, and M7 is the `vous` register at its most formal.

## 2. What L3 withheld, and where each piece lands

`docs/74` §2 and the L3 briefs left four debts with this level's name on them. Each has an owner:

- **The subjunctive as a SYSTEM → L4-M5.** L3-M3 opened four cells of three verbs (`soit`, `ait`,
  `puisse`, `aille`) on two triggers and said in as many words that the mood as a system is L4's.
  M5 takes it because doubt is what a disagreement is made of, and because the counterweight
  (`il me semble que` + indicative) has to sit in the same module as the rule or the learner
  subjunctives everything after `que`.
- **`si j'avais eu … j'aurais …` → L4-M3.** Chartered by name in L3-M4's brief and in `docs/82`
  ("named as L4-M3's inside rule 4 and appears nowhere in the content").
- **`avant de` + infinitive → L4-M6.** Chartered by the content itself: L3-M8's own word note on
  `avant` reads *Before a verb it needs de — avant de signer — and that is L4's.*
- **The futur simple → L4-M7, as recognition only.** L1-M6's note says *there is a second future,
  the futur simple (je mangerai), and this level does not teach it*, and no later module took it —
  `content:owner` reports `sera`, `serai`, `ira` and `partira` all `free` after thirty modules. It
  lands in the announcement module, third person only, because a loudspeaker and a notice are
  exactly where a learner meets it; the first-person future stays L1-M6's `aller` + infinitive.

**The full inversion system is still not taken.** `docs/74` §2 kept `est-ce que` as the question
marker and that stands; M7 admits at most two frozen inverted politeness questions as whole
surfaces, under the hyphen rule in §4.

## 3. A section per module

**M1 "Explaining how"** owns the **`tu` imperative** — the promise L2-M4 made when it shipped the
`vous` imperative and wrote that *the tu imperative — tourne, va, prends — exists and is not
written, because the scene is a stranger in the street*. It sits first because every later module
in the level gives the learner something to do, and because the negative imperative
(`Ne le mets pas`) is the level's cheapest hard thing. Purpose (`pour` + infinitive) rides along
free: L2-M5's own note on `pour` already says it does purpose.

**M2 "Cause and consequence"** owns the **four causal joiners sorted by POSITION** — `parce que`
answers a *pourquoi*, `comme` only opens a sentence, `puisque` names a shared reason, `car` is
written — plus the `grâce à` / `à cause de` split by whether the outcome is welcome. It is second
because a paragraph of steps (M1) is the first thing that needs joining, and because M3's regrets
are causal sentences that would otherwise have to invent their own connectors.

**M3 "What might have been"** owns the **plus-que-parfait and the conditionnel passé**, and the
regret modals `j'aurais dû` / `j'aurais pu`. It sits third because both tenses are assembled from
parts the learner already holds (L2-M10's imparfait auxiliary, L3-M4's conditional auxiliary, the
passé composé's participles), so the grammar is nearly free and the module can spend on the
apology. One counterfactual frame only, as L3-M4 held to one.

**M4 "Persuading"** owns **concession as a two-move sequence** — grant it flat, then turn — and the
register split inside the turn words (`par contre` spoken, `en revanche` written). It deliberately
sits BEFORE the subjunctive module and therefore refuses `bien que`, which is the point: the
concession a French speaker actually makes in conversation needs no mood at all.

**M5 "Disagreeing well"** owns the **subjunctive as a system**: the `ils`-stem rule with its six
endings, the trigger being what stands to the LEFT of `que`, and the indicative counterweight. The
four irregular cells L3-M3 shipped as words are re-used and pointed back at, not re-taught.

**M6 "Before and after"** owns **time clauses sorted by whether the two halves share a subject** —
infinitive when they do (`avant de partir`, `après avoir mangé`), clause when they do not — plus
the three-way split of English's *for two hours* (`pendant` / `depuis` / `ça fait … que`) and *ago*
(`il y a deux ans`). It sits after M5 so that `jusqu'à ce que` and `avant que` can lean on a mood
that is already open rather than opening it in passing.

**M7 "Official talk"** owns the **notice imperative** (`veuillez`, `prière de`, `merci de`,
`il est interdit de`) and the **futur simple as recognition**. It is the first module in the course
whose main skill is comprehension rather than production, and the brief says so, because the honest
outcome is a learner who can decode a platform announcement and answer it in ordinary French.

**M8 "Back then"** owns the **imparfait as habit and state over a whole period**, marked by the
time word rather than by the verb, against a `maintenant` half and `ne … plus`. Its delta is the
one English word with two French tenses: *would* is `on allait` in a habit and the conditionnel
L3-M4 opened in a hypothesis (`j'irais` itself is a fresh cell — `content:owner` reports it `free`).

**M9 "Places and journeys"** owns **`y` and `en` as pronouns** and the **preposition-by-place-gender
rule** (`en France`, `au Portugal`, `aux États-Unis`, `à Paris`). It sits ninth because it is the
level's longest single item before the narrative and it re-uses L2-M4 wholesale.

**M10 "A story with a twist"** owns **direct speech against L3-M5's reported speech** — nothing
backshifts inside a quotation — and the twist connectors. Six sentences with the per-sentence bound
applying INSIDE the account, as at L3-M10.

## 4. Seams — where the index contradicted the first instinct

Every line here is a `content:owner` result, quoted. These are the ones where the honest answer was
not the expected one.

- **`pendant` is FREE, though `pendant que` is L3-M10's.** `content:owner` reports
  `pendant  free` and `pendant que  L3-M10`. The first instinct — *the ladder already teaches
  pendant* — is wrong; bare `pendant`, the duration preposition, is M6's to take, and taking it
  does not touch L3-M10's whole key.
- **`c'était` is L3-M10's, not L2-M10's.** `docs/74` §4 wrote that `c'était` stays L2-M10's
  separate key. `content:owner` reports `c'était  L3-M10`, and a scan of the emitted index files
  finds the key in `L3-M10.json` alone. The emitted index is the authority and the L3 note is now
  known to be wrong on this one word.
- **`il faut` is FREE as a two-token key; only `faut` is owned.** `content:owner` reports
  `il faut  free`, `faut  L2-M4`, `il  L1-M10`. `docs/74` §4's "il faut stays L2-M4's whole
  surface" is loose: what L2-M4 owns is the bare verb.
- **`je voudrais` is FREE as a two-token key; only `voudrais` is owned.** `content:owner` reports
  `je voudrais  free`, `voudrais  L2-M1`. Same class of looseness as above, and worth knowing
  before M4 or M5 writes a politeness frame.
- **`y` is L2-M6's and `en` is L2-M4's**, so M9's two pronouns can never have bare rows.
  `content:owner` reports `y  L2-M6` (from L2-M6-S01's `On y va`) and `en  L2-M4` (from
  `Je vais en bus`). Every pronoun surface in M9 is therefore multi-token and WHOLE:
  `on y est allés  free`, `j'y suis allé  free`, `il y en a  free`, `on en a  free`. The `en`
  collision is also the module's best teaching line — a learner holding `en bus` reads `en France`
  as *by France*.
- **`avant` is L3-M8's, and its note there is about a DATE.** `content:owner` reports
  `avant  L3-M8`; the owning row is L3-M8-S03 *Je dois payer le loyer avant le cinq*, whose note
  reads *Of time here: avant le cinq, avant lundi. Before a verb it needs de — avant de signer —
  and that is L4's.* So M6 writes `avant de` WHOLE, and M8 — which wants bare `avant` as the
  adverb *back then* — either accepts L3-M8's row or leads with `à l'époque` and `autrefois`,
  which `content:owner` reports free.
- **`plus` is L2-M9's comparative**, so M8's negator can never be a bare `plus`:
  `content:owner` reports `plus  L2-M9`, and `je ne fume plus  free`. Index the negator WHOLE with
  its verb.
- **`il y a` is L1-M7's**, so M6's *ago* job is the same key doing a second job:
  `content:owner` reports `il y a  L1-M7` and `il y a deux ans  free`. Write the phrase whole; a
  second bare row would be unreachable, which is `docs/74`'s `का` rule in French.
- **`été` is FREE, and it is two words.** `content:owner` reports `été  free`. It is both the
  participle of `être` and the summer. M3 takes it as the participle because it needs it; M9 writes
  `en été` WHOLE if it wants the season.
- **`maintenant`, `aujourd'hui`, `votre` and `vos` are FREE after thirty modules.**
  `content:owner` reports all four free. `votre`/`vos` in a course that has spoken `vous` since
  L1-M2 was checked twice; it is genuinely a gap, and M7 takes it.
- **Hyphen parts, the seam this course has already been burnt by.** `content:owner` reports
  `peut-être  L3-M3   [parts: peut → L3-M3, être → L3-M3]` and
  `rendez-vous  L3-M7   [parts: rendez → L3-M7, vous → L1-M2]` — in both cases the hyphenated key
  bought a bare word with it. The live L4 cases: `vas-y  free [parts: vas → L2-M1, y → L2-M6]`
  (buys nothing, both parts owned), `mets-le  free [parts: mets → free, le → L1-M1]`,
  `pourriez-vous  free [parts: pourriez → free, vous → L1-M2]` (buys bare `pourriez`),
  `puis-je  free [parts: puis → L1-M10, je → L1-M1]` (buys nothing, but sits on top of L1-M10's
  *then*), `États-Unis  free [parts: états → free, unis → free]` (buys both), and
  `billet aller-retour  free [parts: aller → L2-M4, retour → free]` (buys bare `retour`).
- **The `-er` imperative is a homograph of the `je` form**, so M1's verb list is chosen by the
  index and not by usefulness: `content:owner` reports `mange  L1-M4`, `travaille  L1-M4`,
  `parle  L2-M7`, `demande  L3-M5`, `reste  L3-M4` — all already owned, all with notes about
  habits rather than orders — while `regarde`, `écoute`, `tourne`, `prends`, `attends`, `mets`,
  `ajoute`, `coupe`, `commence`, `continue` and `appelle` come back `free`.
- **`coup` is free and has two claimants.** M2 wants `du coup` and M10 wants `tout à coup`;
  `content:owner` reports `coup  free`, `du coup  free`, `tout à coup  free`. Both are indexed
  WHOLE, so bare `coup` survives the level unspent.
- **The subjunctive cells L3-M3 shipped are owned**: `content:owner` reports `soit`, `ait`,
  `puisse`, `aille` and `sûr` and `crois` all `L3-M3`. M5's fresh cells are the regular ones —
  `fasse`, `vienne`, `sache`, `dise`, `prenne`, all `free`.

**The quotation-mark decision (M10).** No `display` in `content/en-fr/` carries a quotation mark of
any kind — a character census over all thirty modules finds only `'`, `,`, `.`, `?`, `-` and `!` —
and M10's job requires a line of dialogue. The briefs prescribe French guillemets with a space
inside, matching the space-before-`?` this course already writes (`Bonjour, ça va ?`). This was
checked against the real tokenizer rather than assumed:
`tokenizeSurface("Il m'a dit : « Tu es en retard »")` returns
`["il","m'a","dit","tu","es","en","retard"]` — the guillemets and the colon are stripped as edge
punctuation and standalone-punctuation tokens are dropped, so they cost no surface and cannot show
up as `shown but untaught`. They are typography, not vocabulary. The running-account form without
the colon is preferred.

## 5. What L4 defers to L5, and why

- **The passive as a system.** M7 shows `est annulé` and `sera fermé` as fixed announcement shapes
  and names them as such. A learner needs to READ the passive long before they need to build one,
  and building one is a whole module.
- **The full inversion paradigm.** `docs/74` §2 kept `est-ce que` and nothing at L4 needs more than
  two frozen inverted questions.
- **The passé simple.** It is what a written story uses, and this level's stories are told, not
  written. M8 and M10 both name it as not-taken.
- **Result clauses** (`si bien que`, `tellement … que`) and **concession clauses** (`bien que`,
  `quoique`). M2 and M4 both decline them; concession in conversation is a two-move sequence, and
  teaching the subordinate version would put the mood in the wrong module.
- **The past and imperfect subjunctive**, which are literary.
- **The futur antérieur**, which nothing at this level needs once M6 has the same-subject
  infinitive.
- **Two clitics in a row** (`je le lui ai donné`). M9 opens `y` and `en` as single pronouns; the
  order table is a module of its own.

## 6. The shape of the level

- **Bounds climb 12 → 14**, continuing L3's 10 → 12: **M1–M2 at 12, M3–M8 at 13, M9–M10 at 14.**
  M1 and M2 stay at L3's exit because an instruction and a because-clause are short by nature and
  both modules spend their difficulty on the index rather than on length. M3–M8 go to 13 because
  every one of them is structurally a TWO-CLAUSE sentence — `si` + counterfactual, claim + turn,
  frame + subordinate, time clause + main clause, then-half + now-half — and 12 forces the second
  clause to be a stub. M9 and M10 go to 14 because a journey and a narrative each carry a
  subordinate inside a main clause and still have to sound like a person talking; M10's bound
  applies INSIDE the account, per sentence, as it does at L3-M10.
- **`newWordCap` stays the PRD §5 25 everywhere**, and pools are authored to 12, as at L3. M10 is
  the module that could argue for less, and does not: a cap is a ceiling rather than a target, and
  M10's real discipline is its own note — nothing is opened that the ladder has not already paid
  for — which a number cannot express.
- **Two facts are stated because they are traps rather than grammar**, in the L3 tradition: the
  pronoun moves from the back of a positive imperative to the front of a negative one (M1), and
  `il me semble que` takes the indicative while `je ne suis pas sûr que` takes the subjunctive
  (M5). A learner who has learnt one half will apply it to the other.
- **The delta worth naming once, and repeated in three modules**: French marks with a TIME WORD
  what English marks with an auxiliary. `used to` and `would` have no French word (M8), the perfect
  has none for a still-true duration (M6, pointing back at L3-M7's `depuis`), and the future has
  none in an announcement that a present or a `-ra` cannot carry (M7).

## 7. Open questions for the native-speaker gate

Continuing this course's chain; `docs/82` ends at 57.

58. **The `tu` imperative list** (M1). Confirm that `Regarde`, `Écoute`, `Attends`, `Prends`,
    `Mets` and `Ajoute` are what a French speaker actually says in a set of steps, and that the
    `-er` `-s` drop is worth one plate rather than two.
59. **The negative imperative with a pronoun** (M1). Confirm `Ne le mets pas` and that the
    hyphenated form is impossible in the negative, in every register including the spoken one.
60. **`il suffit de`** (M1). Confirm this is the everyday *all you have to do is* and not a written
    formula.
61. **The four causal joiners by position** (M2). The wave's strongest structural claim: that
    `parce que` does not open a paragraph, `comme` only opens one, `puisque` marks a shared reason
    and `car` is written. Confirm each half, and say whether `vu que` belongs in the same set.
62. **`grâce à` against `à cause de`** (M2). Confirm the outcome-is-welcome split is categorical
    rather than a tendency, and that `à cause de` on a good outcome is heard as odd rather than
    merely unusual.
63. **`du coup`** (M2). Confirm the register — spoken, and how marked — and whether it has become
    frequent enough to be worth a learner's first consequence word after `donc`.
64. **`j'aurais dû` and `j'aurais pu`** (M3). Confirm the modal carries the conditional and the
    infinitive stays flat, and that `j'ai dû partir` really is heard as *I had to leave* rather
    than as a regret.
65. **`si j'avais su`** (M3). Confirm the frame is what is said, and confirm the mistake plate:
    that `si j'aurais su` is a recognisable learner error and not a regional form.
66. **`été` as the participle before the season** (M3, and M9). Confirm nothing is lost by giving
    the bare key to the participle and writing `en été` whole.
67. **The concession sequence** (M4). Confirm that everyday spoken French concedes flat and then
    turns, and that `bien que` is genuinely rare in conversation rather than merely formal.
68. **`par contre` against `en revanche`** (M4). Confirm the spoken/written split as stated, and
    whether `par contre` still carries any stigma worth naming.
69. **The `ils`-stem subjunctive rule** (M5). The level's largest grammatical claim. Confirm the
    rule as stated covers what a learner will meet, and that `fasse` and `sache` plus L3-M3's four
    are the whole of the irregular list they need.
70. **`il me semble que` with the indicative** (M5). Confirm it, and confirm the negative and
    interrogative of `je pense que` / `je crois que` / `je suis sûr que` genuinely take the
    subjunctive in speech and not only in writing.
71. **The same-subject constraint** (M6). Confirm `avant de` and `après avoir` are obligatory when
    the subjects match, and that `avant que je parte` with matching subjects is wrong rather than
    heavy.
72. **`ça fait deux heures que`** (M6). Confirm it is the everyday equivalent of `depuis deux
    heures` and say which one a speaker reaches for first.
73. **`veuillez`, `prière de` and `merci de`** (M7). Confirm all three are live on notices today,
    and which one a learner is most likely to be addressed with.
74. **The futur simple as an announcement tense** (M7). The wave's most structural register claim:
    that the third-person futur simple is heard from a loudspeaker and read on a notice, while a
    plan is `aller` + infinitive. Confirm it, and confirm that teaching it as recognition only is
    not leaving the learner short.
75. **`au suivant` and `patienter`** (M7). Confirm both are what is actually said at a counter, and
    that `patienter` for `attendre` is a real register swap rather than a textbook one.
76. **`avant` as the bare adverb** (M8). Confirm `Avant, j'habitais à Lyon` is idiomatic, and
    advise whether M8 should accept L3-M8's date row or lead with `à l'époque`.
77. **`ne … plus` and the pronunciation of `plus`** (M8). Confirm the negator and the comparative
    differ in speech, and that the difference is worth a `sound` line.
78. **`y` and `en` before the verb** (M9). Confirm `On y est allés en train` and `Il y en a trois`,
    and confirm that dropping `y` — the English habit — is ungrammatical rather than casual.
79. **Prepositions by country gender** (M9). Confirm the four-way `en` / `au` / `aux` / `à` split as
    stated, and name any everyday country that breaks it.
80. **Guillemets in a display** (M10). The level's one typographic decision. Confirm that
    `Il m'a dit « tu es en retard »` is how a line of dialogue is written inside a short account,
    whether the colon should be there, and whether the spaces inside the guillemets should be
    written as ordinary spaces given this course's straight-apostrophe law.
81. **Direct speech with no backshift** (M10). Confirm that nothing moves inside the quotation, and
    that a learner backshifting there is a real error rather than an acceptable variant.
