# en-fr L4 — LLM review

The review that clears each en-fr L4 wave to ship, written in the same change that authors it
(`CLAUDE.md`, "Ship `verified: true` in the authoring change"). The **native-speaker gate is a
separate, stricter bar and stays unmet**: every section below ends in open questions for a native
pass, and no later wave may close one of them by rewriting a shipped module.

Open questions CONTINUE the chain `docs/91-en-fr-L4-brief-decisions.md` opened, which ends at 81.
This wave numbers from 82. Nothing already written is renumbered.

## Wave 1 — L4-M1, L4-M2 (#534)

Authored against the briefs `tools/course-briefs.ts` carries for these two rungs, and reviewed
against the REAL emitted index rather than against the briefs' account of it: **783 surfaces
through L3-M10, `maxSpan` 4**, as `npm run content:owner -- en-fr …` reports on every call
("783 surfaces owned, folded over 30 modules through L3-M10"). L4 is the level's first wave, so
nothing of L4 was in the fold when these two were written; `tools/check-shown.ts` folds the
authored L4 files on top of it, which is what makes M2 able to lean on M1's rows.

L4-M1 spends **24 word rows**, L4-M2 spends **16**, both under the briefs' `newWordCap: 25`. Every
row carries an empty `forms` list, so each buys exactly its own key plus whichever hyphen parts
were still free. **`maxSpan` does not move**: the longest key either module opens is three tokens
(`il suffit de`, `tout de suite`, `à cause de`), and the level's span is still held open by L2's
`est-ce que`.

### L4-M1 "Explaining how" — a promise L2-M4 made and refused to pay

L2-M4 gave the `vous` imperative to a stranger in the street and wrote its own note saying *the tu
imperative — tourne, va, prends — exists and is not written, because the scene is a stranger in the
street*. This module pays that, and the index confirms the refusal was real: `content:owner` reports
`tourner → L2-M4` and `prendre → L2-M4` while `tourne` and `prends` are **free**. The infinitives
were spent; the orders were not.

The ten displays:

1. `D'abord regarde la recette, ensuite coupe le pain` — the `-er` law, with L2-M10's ordering words
   holding orders instead of statements for the first time.
2. `Prends la casserole et mets l'eau sur le feu` — the counter-plate: `prendre` and `mettre` are not
   `-er` verbs, so their `-s` **stays**.
3. `Ajoute le sel, puis attends cinq minutes` — both halves of the spelling law in one line, plus
   `attendre` taking its object with no preposition where English waits *for*.
4. `Appuie ici pour ouvrir la porte` — `pour` + infinitive, the module's cheap half. `pour` stays
   L2-M5's row and nothing is re-opened.
5. `Ne commence pas tout de suite, attends encore` — the negative wrapper. The `ne` is written.
6. `Mets-le sur la table, mais ne le mets pas ici` — **the module's hardest half-sentence**, both
   halves of the reversal in one display: hyphen behind a positive order, pronoun in front and no
   hyphen at all once it turns negative.
7. `Il suffit de tourner la clé pour ouvrir la porte` — the frozen frame with nobody in it, and
   `pour` a second time behind it.
8. `Continue tout droit, ensuite tourne à droite` — the route scene, on L2-M4's `tout droit` and
   `à droite`.
9. `Écoute-moi bien et n'oublie pas la page trois` — `me` growing into `moi` behind a positive
   order, against an elided `n'` carrying the negative in the very next clause.
10. `Vas-y, appelle le bureau et demande la recette` — the exception inside the exception, and
    `appeler`'s doubling `l`.

Registers are `informal` on the eight sentences addressing a person as `tu`, `neutral` on the two
that address nobody (S04's machine instruction, S07's `il suffit de`). `src/course/types.test.ts`
scopes en-fr's flat `neutral` assertion and its `tu`-register ban to `L1-` only, so both are
legitimate here; L2-M1 is the module that opened `tu` and paid decision 1.

**S05's mistake plate deliberately drops the `ne`** (`Commence pas tout de suite`), with the `why`
putting it back. That is the course's established shape for this error — `L3-M1-S05`, `L3-M6-S10`
and `L3-M8-S02` all do it — and mistake displays are never indexed, so no shown surface is affected.

### L4-M2 "Cause and consequence" — a positional system, not a semantic one

Four words share English's *because* and nothing about their meaning separates them; where they may
stand does. `parce que` answers a `pourquoi` and cannot open. `comme` can **only** open. `puisque`
offers a reason both speakers already hold. `car` joins two clauses that could each stand alone and
is the written one. S01 and S02 are the same two facts in both orders, with the joiner forced to
change by the order alone — that pair is the module's whole argument.

The ten displays:

1. `Comme il pleuvait beaucoup, on est restés à la maison` — the front slot, and the only word that
   may take it.
2. `On est restés à la maison parce que le train était annulé` — the same facts, reversed, and the
   joiner reversed with them.
3. `Puisque tu es fatigué, reste à la maison` — the shared-knowledge reason. `reste` is L3-M4's row
   read as L4-M1's imperative, which is the first thing M2 borrows from M1.
4. `Il n'est pas venu, car il était malade` — the written joiner that never opens.
5. `La réunion était annulée, donc je suis rentré tôt` — the neutral consequence, on L1-M9's `donc`,
   plus the agreement `annulée` that is written and never heard.
6. `Il y avait une grève, du coup je suis arrivé en retard` — the spoken consequence.
7. `Grâce à ton aide, j'ai réussi mon examen` — the welcome half of *because of*.
8. `À cause de la grève, je suis arrivé très en retard` — the unwelcome half, against the same
   `en retard`, so only the preposition carries the difference.
9. `Le magasin était fermé, c'est pourquoi je suis rentré` — the written consequence, pointing back
   at a whole clause.
10. `Il y avait une grève. Par conséquent, le bureau était fermé` — the most written of the four,
    and the only one that comfortably opens a sentence of its own.

`comme` is spent knowing it also carries *like* and *as*: first occurrence wins, so its note here is
what every later `comme` in the course will show, and it names all three jobs rather than only the
one this module uses.

`à cause de`, `grâce à`, `du coup` and `c'est pourquoi` are indexed **whole**, as the brief asked.
None of them carries a hyphen, so `surfaceIndexKeys` earns them no part keys, and `content:owner`
confirms `coup free`, `grâce free` and `cause free` — all three are still unspent for L4-M10's
`tout à coup`.

### The seams the briefs got wrong, and what `content:owner` actually said

Every claim in both briefs' §5 was re-run. Most held. These did not, or were not there at all.

**1. `va` is already owned, and M1's brief leans on it.** Brief note 2 makes `aller` the exception
inside the exception — *va, with the s coming back only in vas-y* — which reads as an instruction to
write a `va` row. It is not available:

    va	L1-M6
    vas-y	free   [parts: vas → L2-M1, y → L2-M6]

A `va` row here would be a note the word index can never reach. The module writes `Vas-y` as its row
and keeps bare `Va` in rule 0 and in the `vas-y` note, where it is prose and buys nothing.

**2. `parce qu'il` is not covered by `parce que`, and it breaks on `parce`.** This is the wave's
most valuable correction. M2's brief writes the counter-example `Comme il pleuvait, on est restés`
against a fronted `parce que`, and the natural French for the wrong version is
`Parce qu'il pleuvait`. The index will not carry it:

    parce que	L1-M9
    parce qu'il	free
    parce	free
    qu'il	L3-M5

The elision splits `parce que` into two tokens, and the second one — `qu'il` — is L3-M5's and
resolves, while the FIRST one, bare `parce`, is owned by nobody. So a fronted `Parce qu'il …`
display is one `SHOWN-BUT-UNTAUGHT parce`, not two, which is exactly the sort of half-failure the
en-fr elision law exists to catch. Every `parce que` in this module is therefore followed by a
consonant-initial subject (`parce que le train …`), and `Parce qu'il pleuvait, on est restés` appears
only on S01's **mistake plate**, which the build never indexes.

**3. `docs/74` §4's line about `il faut` is loose, and the same looseness runs through
`il suffit de`.** M1's brief already flags the first; the second is new and identical in shape:

    il faut	free
    faut	L2-M4
    il suffit de	free
    il suffit	free
    suffit	free
    il	L1-M10
    de	L1-M1

The bare verb is owned in the `faut` case and free in the `suffit` case, and in both the PHRASE is
free. `il suffit de` is indexed whole, as one three-token key, which is what makes the frame teachable
as a frame and leaves `suffit` alone.

**4. `marché` is a trap the briefs do not mention, and it is set for exactly this module.**

    marché	L1-M7

That is the noun *market*. The obvious French for M2's strike scene — *j'ai marché*, I walked — folds
to the identical key, so a learner tapping it would be shown a note about a market. The sentence was
written as `je suis arrivé en retard` instead. Any later en-fr module wanting the verb `marcher` must
know this row is already spoken for.

**5. `en retard` is free, `retard` is free, `en` is L2-M4's.** Not in either brief. Indexed whole, on
the same reasoning as `à cause de`: bare `retard` stays available.

**6. `il pleuvait` costs nothing.** M2's brief writes `Comme il pleuvait, on est restés` as its
worked example without saying whether it is affordable. It is free of charge:

    il pleuvait	free
    pleuvait	L2-M10
    pleut	L3-M4

`il` is L1-M10's and `pleuvait` is L2-M10's, so the two tokens resolve independently and the module
buys no row for the weather at all.

**7. Everything else in both §5 lists is confirmed.** `mange → L1-M4`, `travaille → L1-M4`,
`parle → L2-M7`, `demande → L3-M5`, `reste → L3-M4` — all five of M1's already-owned `-er` spellings
are exactly as the brief says, and none of them is written as an order here. `regarde`, `écoute`,
`tourne`, `prends`, `attends`, `mets`, `ajoute`, `coupe`, `commence`, `continue` and `appelle` are
all free, and all eleven are spent. `mets-le` is free with `mets` free and `le → L1-M1`, so its note
says the `le` is L3-M5's object clitic rather than L1-M1's article. `pour` stays L2-M5's. On the M2
side, `car`, `comme`, `puisque`, `du coup`, `c'est pourquoi`, `grâce à`, `à cause de` and
`par conséquent` are all free as claimed, and `parce que → L1-M9`, `donc → L1-M9`, `alors → L1-M10`,
`mais → L1-M10` are all pointed back at rather than re-opened.

### One thing `check-shown` cannot see, and why it did not bite

`tools/check-shown.ts` builds its within-module collision map from `normalizeSurface(surface)` alone,
while the emitter indexes `surfaceIndexKeys(surface)` — so a hyphenated row's PARTS are invisible to
the collision check. `écoute-moi` earns `écoute` as a part key, and `mets-le` earns `mets`. Neither is
a defect here: `mets` has its own row on S02, which comes first and therefore keeps the key, and the
hyphenated keys are longer, so the resolver's longest-match-first walk reaches them whenever the
display actually writes them. But an author who put a bare `écoute` row AFTER `écoute-moi` in a later
module would lose the part key silently and this check would say nothing. Worth knowing before L4-M3.

### The ratchet

`npm run content:shown -- en-fr L4-M1` and `-- en-fr L4-M2` both print
`clean — every shown surface resolves`, with **zero** `RE-TEACH` lines and zero
`COLLIDES INSIDE THIS MODULE` lines. Every one of the 40 word rows across the two modules opens a key
no earlier module owns, which is why there is nothing to argue about under `RE-TEACH` at all.

`npx vitest run tools/shown-surfaces.test.ts` is **11/11** and **en-fr holds at its baseline of 20**.
Nothing was raised and nothing needed lowering: the wave adds no new shown-but-untaught surface, in
the ten displays, in the twenty `variations[].display` lines, or in either twelve-item
`comprehensionPool`. The 20 that remain are L1–L3's and are untouched by this change.

`npm run content:validate` reports `CONTENT 287/287 ok` on this wave's last run. The total moves
while the other eight courses' L4 waves land in the same checkout; what matters here is that both
`en-fr/L4-M1.json` and `en-fr/L4-M2.json` are on the `ok` side of it.

`npx vitest run src/course/types.test.ts` fails only on the three module-census assertions — the
`finds all 270` list and the `en-ar`/`hi-en` per-course counts, all of which are other waves' and the
parent's. Every other assertion passes, including the en-fr one: no `glossEn` anywhere, straight
apostrophes in every L2 slot (`display`, `forms`, `variations[].display`, `mistake.display` and every
pool item), and `sound` present on all twenty sentences.

### Open questions for the native pass

82. **The `-s` law as stated** (M1). Rule 0 claims the tu imperative is the tu present minus the
    pronoun, minus the `-s` for `-er` verbs only. Confirm there is no everyday counter-example a
    learner will meet early — and confirm the module is right that `ouvrir`, an `-ir` verb that
    conjugates like an `-er` one (`tu ouvres`), drops its `-s` in the order exactly as an `-er` verb
    does.

83. **`Vas-y` against bare `Va`** (M1). Confirm that `Vas-y` is what is actually said as *go on / go
    ahead*, that the `s` is heard as a `z`, and that a learner who says `Va` alone in that slot sounds
    wrong rather than merely terse.

84. **`Mets-le` → `Ne le mets pas`** (M1). The module's hardest claim. Confirm the reversal is
    categorical in ordinary speech — no hyphen, pronoun in front, every time — and confirm that
    `Ne mets-le pas` is genuinely wrong rather than regionally tolerated.

85. **`Écoute-moi` and the bare object** (M1). Confirm `écouter` takes its object with no `à` in the
    imperative as elsewhere, and that `Écoute-moi bien` is the natural register for a parent or a
    teacher rather than something sharper than intended.

86. **`Il suffit de` as everyday French** (M1). Confirm it is what a speaker actually says about a
    simple machine, rather than a written or explanatory register, and confirm the module is right to
    put it beside `il faut` rather than in place of it.

87. **`casserole`** (M1). Confirm `la casserole` is the ordinary word for the pan on the hob, and that
    the note's contrast with English *casserole* → `un gratin` is the right one to draw.

88. **The four-way `because` split** (M2). Rule 0 is the module's largest claim. Confirm the positional
    account — `parce que` never first, `comme` only first, `puisque` for shared knowledge, `car`
    written and never first — holds without exception in everyday use, and say which of the four a
    French speaker would call the most over-used by learners.

89. **`puisque` as a reminder rather than news** (M2). Confirm the note's claim that using `puisque`
    for a fact the hearer does not yet hold reads as an accusation, and confirm S03's mistake plate:
    is `Puisque tu es fatigué ?` actually impossible, or merely odd?

90. **`du coup`** (M2). Confirm the register — spoken, and how marked — and whether a learner writing
    it in an email would read as casual or as illiterate. The note calls it *donc with its shoes off*;
    say whether that is fair.

91. **`grâce à` against `à cause de`** (M2). Confirm the outcome-is-welcome split is categorical
    rather than a tendency, and confirm that `Grâce à la grève` reads as sarcasm rather than as an
    error a listener would simply repair.

92. **`c'est pourquoi` and `par conséquent`** (M2). Confirm both are live in written French today, and
    confirm the module is right that `par conséquent` opens a sentence comfortably where `donc` and
    `du coup` do not.

93. **`annulé` / `annulée` in one module** (M2). Two rows for one lexeme, three sentences apart, with
    the second note pointing back at the first. Confirm the agreement is worth the second row here
    rather than deferred — and confirm the participles genuinely sound identical, so the trap's claim
    that you can be wrong for a year holds.

94. **`réussir un examen` against `passer un examen`** (M2). Confirm the split as stated, and confirm
    that `j'ai réussi mon examen` is what a French speaker says rather than a construction a learner
    would only meet in a textbook.

## Wave 2 — L4-M3, L4-M4 and L4-M5 (#543)

The level's RANGE modules: the tense L3-M4 promised and did not pay, the first module where an
argument has a shape, and the module that turns the subjunctive from four memorised words into a
rule. Authored in one pass against `npm run content:kit`, with every seam in the three briefs' §5
re-run through `npm run content:owner` before a row was written.

### L4-M3 "What might have been" — two compound tenses and nothing newly conjugated

    S01  Si j'avais su, j'aurais dit quelque chose
    S02  Si j'avais eu le temps, je serais venu
    S03  Si j'avais été là, j'aurais compris
    S04  J'aurais dû partir plus tôt
    S05  Il aurait dû nous prévenir
    S06  J'aurais pu venir, mais je ne savais pas
    S07  Tu aurais pu me prévenir, j'aurais attendu
    S08  Sans ton aide, je n'aurais pas réussi
    S09  Sans toi, je n'aurais jamais fini ce travail
    S10  C'est dommage, elle aurait aimé ce film

Fifteen word rows, seven module rules, five patterns at 3/2/2/2/1. The module's whole argument is
that neither tense is new: the plus-que-parfait is L2-M10's `avais` plus the participle the passé
composé already ships, and the conditionnel passé is L3-M4's conditional auxiliary plus that same
participle. Rule 0 says it once and the grammar then costs nothing, which is what leaves room for
the regret. Rule 1 carries the delta that actually bites — English puts the past on *have* (*I
should have gone*) and French puts it on the modal (`j'aurais dû partir`) — and S04's mistake plate
is the sentence a learner assembles out of English parts, `J'ai dû partir plus tôt`, which is French
for *I had to leave*. Rule 2 extends L3-M4's order law one tense deeper and S01's plate is
`Si j'aurais su`, the module's headline error. Rule 4 says the `être`-or-`avoir` choice is L2-M10's
list unchanged, which is why S02 takes `je serais venu` and its plate takes `j'aurais venu`. Rule 6
holds `c'est dommage` to the comma and hands `dommage que` to L4-M5, as brief note 4 required.

`été` is taken as the participle, per brief note 5, on a row (`j'avais été`) whose `forms` also open
the bare key, and whose note says in as many words that it is not the summer and that the season
will be written `en été`. That row is the one place on the ladder where the homograph is decided.

### L4-M4 "Persuading" — concession as a sequence, not a subordinate clause

    S01  C'est vrai que le train est cher, mais il est plus rapide
    S02  Tu as raison, en revanche c'est trop cher
    S03  Certes, c'est plus cher, pourtant je préfère le train
    S04  D'un côté c'est pratique, de l'autre c'est très cher
    S05  Il vaut mieux partir plus tôt
    S06  Je suis d'accord, par contre je préfère le vélo
    S07  C'est cher, cependant c'est le meilleur restaurant de la ville
    S08  C'est plus cher, mais je préfère le train quand même
    S09  Tu as raison, mais en fait je ne suis pas d'accord
    S10  De toute façon, il faudrait attendre demain

Sixteen word rows, seven module rules. Every sentence is two moves — grant, then turn — because
that is what brief note 2 says an argument is in French, and the module never once buries the
concession in a subordinate clause. The turn words are taught as a register split rather than as
synonyms: `par contre` spoken (S06), `en revanche` written (S02), `pourtant` and `cependant`
carrying a real *and yet* (S03, S07), and `quand même` at the END (S08), which is the only one of
the five that does not open its clause and therefore gets its own trap line and its own plate.

`bien que` is named and refused, on S01's plate, exactly as brief note 3 asked: it is real French,
it takes a mood this ladder has not opened, and nobody says it out loud. The other two interference
plates are S04's `de l'autre côté` (a place, not an argument — the pair is `d'un côté … de l'autre`)
and S09's `actuellement`, the course's flattest false friend, where the wrong word turns *I don't
agree* into *I am not agreeing at the moment* and concedes far more than the speaker meant.
`je suis d'accord` opens no row and points back at L2-M6, as the brief required; `tu as raison` is
indexed whole.

### L4-M5 "Disagreeing well" — the mood as a rule, with its counterweight in the same module

    S01  Je ne suis pas sûr que ce soit vrai
    S02  Je ne suis pas sûr qu'il vienne demain
    S03  Je ne suis pas sûr qu'il fasse froid demain
    S04  Il me semble que c'est plus compliqué
    S05  Je ne dirais pas que ce soit un problème
    S06  Ça dépend de la ville
    S07  Oui, mais pas forcément ce soir
    S08  Franchement, je ne pense pas que ce soit utile
    S09  C'est plutôt une question de prix
    S10  Disons que c'est plus compliqué que ça

Fourteen word rows, seven module rules, and the two halves brief note 2 demanded and no more.
The FORM is rule 0 — the `ils` stem plus `-e`, taught on one row (`vienne`, with `dise` and `prenne`
in its `forms`) so that the recipe is visible on three verbs at once — and rule 3 names the six that
refuse it: `soit`, `ait`, `puisse`, `aille`, which the course already ships from L3-M3 and which
this module points back at rather than re-teaching, plus `fasse` and `sache`, which share one row.
The TRIGGER is rule 1, stated as a direction rather than a list: it stands to the LEFT of `que`, and
the subordinate clause carries no signal at all.

The counterweight is in the same module, as brief note 3 insisted. S04 is `il me semble que` on the
INDICATIVE with a plate that puts `ce soit` there and explains why it is wrong; S08 teaches
`je ne pense pas que` as the negated twin of L1-M9's `pense` and its plate is
`je ne pense pas que c'est`. S10 is the third guard: `disons que` looks like every other `que` frame
here and proposes rather than doubts, so nothing bends. Four sentences (S06, S07, S09, S10) carry no
mood at all — `ça dépend de`, `pas forcément`, `plutôt`, `disons` — which is rule 5's point that a
hedge does not have to touch a verb. Nothing after a conjunction is opened: `jusqu'à ce que` and
`avant que` stay L4-M6's, as brief note 4 required.

### The seams the briefs got wrong, and what `content:owner` actually said

All three briefs' §5 were re-run in full. Every claim any of them makes held — `j'aurais`, `aurais`,
`aurait`, `dû`, `pu`, `su`, `aurait pu`, `j'avais eu`, `si j'avais su` and `été` free; `j'avais` →
L3-M4 and `avais` / `avait` → L2-M10; the whole M4 connective list free with `mais` → L1-M10,
`raison` → L3-M3, `d'accord` → L2-M6, `mieux` / `moins` → L2-M9; `soit` / `ait` / `puisse` / `aille`
/ `sûr` / `crois` → L3-M3, `pense` → L1-M9, `fasse` / `vienne` / `sache` / `dise` / `prenne` free,
and `peut-être` → L3-M3 with both bare parts bought by the hyphen key. What follows is what the
briefs did NOT say and what a wave writing to them alone would have got wrong.

**1. The `être` branch of the conditionnel passé is already half-owned.** M3's brief note 2 names
`je serais parti` without saying that one cell of that paradigm has a row:

    serais	free
    serait	L3-M4
    serions	free
    seriez	free
    seraient	free

`serait` came in at L3-M4 with the plain conditional. A row whose `forms` listed the full paradigm
would put `serait` on a key L3-M4 keeps, so the note a learner tapping `il serait venu` is shown
would be the wrong one. The module's row is `serais` with `serions`, `seriez` and `seraient` in
`forms` and `serait` deliberately absent — and its note says out loud that the `il` form is
L3-M4's. This is the single most useful correction in the wave.

**2. The negated conditional auxiliary is its own key, and the en-fr elision law is what makes it
so.** M3's brief lists only the bare forms. Two of this module's five patterns produce a negative:

    n'aurais	free
    n'aurait	free
    n'avais	L2-M10

The pluperfect's negative is already owned; the conditionnel passé's is not. `Sans ton aide, je
n'aurais pas réussi` (S08) and `Sans toi, je n'aurais jamais fini ce travail` (S09) would each be a
`SHOWN-BUT-UNTAUGHT n'aurais` if the `j'aurais` row did not carry `n'aurais` and `n'aurait` in its
`forms`. It does.

**3. `à l'heure` cannot be written at this rung, and `plus tôt` can.** Both are free as whole keys
and they behave in opposite ways when the fold breaks them up:

    plus tôt	free   (plus → L2-M9, tôt → L3-M1)
    à l'heure	free   (à → L1-M4, l'heure → free)
    à la maison	free   (maison → L1-M4)

`plus tôt` and `à la maison` resolve piecewise and need no row. `à l'heure` does not, because the
elided `l'heure` is owned by nobody — the same half-failure Wave 1 recorded for bare `parce`. S09's
first draft read `nous serions arrivés à l'heure`; it ships as `plus tôt`, and `l'heure` is left for
whichever module first wants to teach a clock.

**4. The `être` participles the module needs are all already owned.** `resté` → L1-M5,
`arrivé` / `arrivés` → L2-M10, `partie` → L2-M8, `venu` → L3-M10. Nothing on the `être` side had to
be re-taught, which is why fifteen rows were enough for a module carrying two tenses.

**5. `vrai` and `raison` mean the M4 frames are indexed whole by CHOICE, not by necessity.**

    c'est vrai que	free   (c'est → L1-M8, vrai → L3-M3, que → L1-M9)
    tu as raison	free   (tu → L2-M1, as → L2-M1, raison → L3-M3)

Both lines would resolve with no row at all. The brief tells the module to index `tu as raison`
whole so the *avoir*-not-*être* fact has somewhere to live, and the same argument applies to
`c'est vrai que`; both rows exist to carry a note, not to make a display legal. Worth recording
because it is the opposite of the usual reason for a whole key.

**6. `il vaut mieux` and `il faudrait` leave their bare verbs unowned.**

    il vaut mieux	free
    vaut	free
    il faudrait	free
    faudrait	free

Indexing the frames whole — which is what the brief asks and what the module does — means bare
`vaut` and bare `faudrait` are still owned by nobody after this wave. A later module writing
`ça vaut le prix` or `il faudrait que` will be one `SHOWN-BUT-UNTAUGHT` unless it opens the row
itself. Recorded as a debt rather than paid here, because neither bare form belongs in a module
about persuasion.

**7. The brief's §5 is silent on adjectives, and an argument cannot be written without one.**
`rapide`, `pratique`, `calme`, `agréable`, `facile`, `utile`, `difficile` and `compliqué` are all
free at this point on the ladder; `cher` → L1-M8, `loin` → L2-M4, `bon` → L1-M10, `meilleur` →
L2-M9, `tranquille` → L3-M6. L4-M4 spends two of the free ones (`rapide`, `pratique`) and L4-M5 two
more (`compliqué`, `utile`), and leans on the owned five for everything else. `moins cher`,
`trop cher` and `c'est cher` are free as whole keys and resolve piecewise, so none of them is a row.

**8. Bare `même` was declined.** M4's brief note 5 says the module *may* take `même` as *even*, with
a note that must read true beside L3-M3's whole key `même si`. It does not: nothing in the ten
displays needs *even*, and spending the key on a sentence that does not need it would make the note
a promise about a word the module never uses. `même` is still free after this wave, and `quand même`
is a separate key that does not spend it.

**9. `qu'il` — not `peut-être` — is the elision that decides L4-M5.** The brief's hyphen warning
points at `peut-être`; the seam that actually shapes the module is this one:

    qu'il	L3-M5
    qu'elle	L3-M5
    je ne suis pas sûr que	free
    je ne pense pas que	free

Both frames are six- and five-token keys ending in `que`, and NEITHER of them matches in front of a
pronoun subject: `Je ne suis pas sûr qu'il vienne demain` (S02) tokenizes straight past the frame
into `je` / `ne` / `suis` / `pas` / `sûr` / `qu'il` / `vienne` / `demain`, every one of which
resolves on its own. So the whole-key rows earn their place only on the `que ce soit` lines, and
S02's trap line says so to the learner rather than leaving it as an index accident.

**10. `ce soit` needed no row, which is what "point back rather than re-teach" looks like.**

    ce soit	free   (ce → L2-M1, soit → L3-M3)

Three of this module's ten sentences and six of its variations write `ce soit`, and not one of them
opens a key for it. The
`je ne suis pas sûr que` row's note is where the learner is told that `soit` is L3-M3's word and
that what is new is knowing why it is there.

**11. `aujourd'hui` is still free after thirty-two modules, and this wave declined it too.** It
surfaced while hunting for a time word for S07 and it is a genuine gap in the ladder, but a
first-teach that arrives inside a hedge (`pas forcément aujourd'hui`) would waste it. S07 ships
`ce soir` (`soir` → L3-M10) and `aujourd'hui` is left for a module that is about time.

### The ratchet

`npm run content:shown -- en-fr L4-M3`, `-- en-fr L4-M4` and `-- en-fr L4-M5` each print
`clean — every shown surface resolves`, with **zero** `SHOWN-BUT-UNTAUGHT`, **zero**
`COLLIDES INSIDE THIS MODULE` and **zero** `RE-TEACH` lines. All forty-five word rows across the
three modules open a key no earlier module owns, so there is nothing to argue about under
`RE-TEACH` at all — which is the point of seam corrections 1, 5 and 10 above: each of them is a row
that was NOT written because an earlier module already owns the cell.

`npx vitest run tools/shown-surfaces.test.ts` is **11/11** and **en-fr holds at its baseline of 20**.
Nothing was raised and nothing needed lowering. The wave adds thirty displays, sixty
`variations[].display` lines and three twelve-item `comprehensionPool`s, and not one of them shows a
surface no row owns.

`npm run content:validate` reports `CONTENT 304/304 ok` on this wave's last run — the total moves
while the other eight courses' L4 waves land in the same checkout; what matters is that
`en-fr/L4-M3.json`, `en-fr/L4-M4.json` and `en-fr/L4-M5.json` are all on the `ok` side of it.

`npx vitest run src/course/types.test.ts` is **323 passed, 2 failed** on the same run, and neither
failure is this wave's: one is the module-census list (`finds all 288`), which is the parent's, and
the other is the hi-en language assertion, which belongs to that course's wave landing beside this
one. Every en-fr assertion passes: no `glossEn` anywhere, straight apostrophes in every L2 slot — `display`, `forms`,
`variations[].display`, `mistake.display` and every pool item — and `sound` present on all thirty
sentences, with all five enrichment blocks on L4-M3 as the M1–M3 rule requires.

### Open questions for the native pass

95. **`j'avais été` as the `été` row** (M3). The homograph is decided here: `été` is taken as the
    participle, and the note promises the season will be written `en été` whole by a later module.
    Confirm that promise is one a French speaker would recognise as safe — that `en été` really is
    how the season is normally met — and that no ordinary sentence at this level needs bare `été`
    meaning *summer*.

96. **`serais` without `serait`** (M3). The row teaches the `être` conditional auxiliary with the
    `il` form deliberately missing, because L3-M4 owns it. Confirm a learner is not left with a hole
    that matters — that meeting `il serait venu` after learning `je serais venu` is genuinely
    trivial, and that the note pointing back at L3-M4 is the right place to say so.

97. **`Il aurait dû nous prévenir`** (M3, S05). Confirm the pronoun placement is what a French
    speaker writes and that `prévenir` is the ordinary verb here rather than `avertir` or a
    construction with `dire`. The plate refuses `nous prévenu`; confirm that is the error a learner
    actually makes.

98. **`Sans toi, je n'aurais jamais fini ce travail`** (M3, S09). Confirm `jamais` sits between the
    auxiliary and the participle in real usage as flatly as the trap claims, and confirm the line is
    read as warm rather than heavy — the `usage` field says it is reserved for real debts.

99. **`C'est dommage, elle aurait aimé ce film`** (M3, S10). Confirm the comma version is what is
    said, and that a French speaker would not reach straight for `dommage qu'elle n'ait pas pu
    venir`. If the `que` version is the reflex, this module's rule 6 is deferring something the
    learner will meet first.

100. **The register split among the M4 turn words.** `par contre` spoken, `en revanche` written,
     `cependant` most neutral, `pourtant` carrying surprise. Confirm the split as stated, and in
     particular confirm that `par contre` is no longer stigmatised in writing to a degree that would
     make S06 bad advice.

101. **`quand même` at the end** (M4, S08). The plate refuses the fronted version. Confirm fronted
     `quand même` really does read as protest rather than as the softener, and that end position is
     the one a learner should be given first.

102. **`Certes` in speech** (M4, S03). The module calls it "a shade formal" and still puts it in a
     spoken-sounding line. Confirm `certes` is live in conversation today, and that opening with it
     genuinely promises a turn strongly enough that `pourtant` rather than `mais` is the better
     partner.

103. **Refusing `bien que`** (M4, S01 plate). Confirm that refusing it outright at L4 is right —
     that a learner will meet it in reading long before they need it in speech, and that no ordinary
     spoken register makes it the natural choice.

104. **The `ils`-stem recipe as stated** (M5, rule 0). Confirm the rule holds for every verb this
     course has taught, and that the six exceptions named (`soit`, `ait`, `puisse`, `aille`, `fasse`,
     `sache`) are the complete list a learner at this level will hit. If `veuille` or `vaille`
     belongs on it, that is a change to rule 3.

105. **`il me semble que` on the indicative** (M5, S04). This is the module's whole counterweight.
     Confirm the indicative is what a French speaker says, and confirm that the negative
     (`il ne me semble pas que`) is the form that bends it — the rule claims so and the module never
     shows it.

106. **`Je ne dirais pas que ce soit un problème`** (M5, S05). Confirm the subjunctive after
     `je ne dirais pas que` is what is actually said rather than a textbook preference, and that the
     indicative version would strike a native ear as wrong rather than merely casual.

107. **`Disons que` and `franchement`** (M5, S08, S10). Confirm both are current spoken French and
     not dated, confirm `franchement` in first position is heard as courteous rather than as a
     warning of rudeness, and confirm `disons que` takes the indicative as flatly as S10's plate
     claims.

## Wave 3 — L4-M6 through L4-M10 (#560)

The level's remaining RANGE modules and its exit: the first module that subordinates one event to
another, the first module whose main skill is comprehension rather than production, the first that
uses the imparfait for a period with no story around it, the first that puts `y` and `en` in front
of a verb, and the account that spends the level rather than adding to it. Authored in one pass
against `npm run content:kit`, with every claim in the five briefs' §5 re-run through
`npm run content:owner` before a row was written. Two of those claims were wrong and are corrected
below; a third was right but incomplete in a way that would have shipped an unreachable line.

### L4-M6 "Before and after" — a constraint English does not have

    S01  Avant de partir, je dois signer ce document
    S02  Après avoir signé le document, je suis parti
    S03  Je reste ici jusqu'à ce que le train soit prêt
    S04  Depuis que je travaille ici, je suis plus content
    S05  Ça fait deux ans que je travaille ici
    S06  Tu as déjà signé le formulaire ?
    S07  Je n'ai pas encore signé le document
    S08  J'ai travaillé à Paris pendant deux ans
    S09  Je suis arrivé ici il y a deux ans
    S10  Une fois que le bureau est fermé, il faut attendre

Sixteen word rows, six module rules, six patterns. The module's argument is rule 0: French sorts
its time connectors by whether the two halves SHARE A SUBJECT, and English gives no warning at all.
Same subject takes an infinitive (`avant de partir`, `après avoir signé`); different subjects grow a
`que` and take a clause. Rule 1 is the past infinitive — `après avoir` + participle where English
uses an `-ing` — and S02's plate is the sentence an English speaker assembles, `Après signer le
document`. Rule 2 is the narrow one: of the six clause connectors only `avant que` and
`jusqu'à ce que` bend the verb into L4-M5's subjunctive, and S10 exists to stop the mood spreading
across the family — its plate is `Une fois que le bureau soit fermé`. Rule 3 is the three-way break
of English *for two hours* (`pendant` finished, `depuis` running, `ça fait … que` the same fact
turned round), which S05, S08 and S09 carry between them. Rule 4 is `ago`, and S09's plate is
`Je suis arrivé ici depuis deux ans` — the sentence a learner writes when they cannot find a word
for *ago* and settle for the one that means the opposite. Rule 5 seats `déjà` and `pas encore`
between auxiliary and participle, and S07's plate is the dropped `ne`.

`jusqu'à` and `jusqu'à ce que` are two rows on S03 rather than one, because they are two keys: a
time or a place takes the short one, a clause takes the long one. `en attendant` rides on the same
sentence as the case with no end named at all.

### L4-M7 "Official talk" — the first module that says out loud it is for reading

    S01  Veuillez patienter, le guichet va ouvrir
    S02  Merci de signer votre dossier au guichet
    S03  Il est interdit de manger ici
    S04  Le train à destination de Paris partira du quai trois
    S05  Le train en provenance de Paris a du retard
    S06  En raison de travaux, le bureau sera fermé
    S07  La mairie ouvrira à dix heures
    S08  Bonjour madame, je viens pour un rendez-vous
    S09  Pourriez-vous patienter ici, s'il vous plaît ?
    S10  Au suivant ! Le guichet deux est ouvert

Twenty-one word rows carrying twenty-four surfaces — the tightest module in the wave against the
cap of 25 — and seven module rules. Rule 0 is the one brief note 1 asked for in as many words: the
module is two columns, the officialese you read and the plain French you say back, and it says so
before anything else. Eight of the ten sentences are `formal` and carry the register chip; S08 is
`neutral` and is the whole of the other column, which is why its plate is `je suis ici pour un
rendez-vous` rather than a grammar error.

Rule 2 is the futur simple, admitted as RECOGNITION and in the third person only, exactly as brief
note 2 required: one row, `sera`, whose forms list is `sera`, `partira`, `ouvrira`, and whose note
ends *your own future stays L1-M6's je vais partir*. S07's plate — `La mairie va ouvrira` — is the
learner who has taken the new ending as a piece to bolt onto the future they already have. Rule 3
is the nominalisation delta (English officialese shortens, French lengthens), and S05's plate is
`est retard`: a train HAS delay in French, and `est en retard` describes a person.

`pourriez-vous` is written whole, hyphen and all, and buys bare `pourriez` as a hyphen part — the
mechanism `rendez-vous` used in L3-M7. `puis-je` was checked and deliberately not written; see the
seam section.

### L4-M8 "Back then" — one English word, two French tenses

    S01  Autrefois, j'habitais à Paris. Maintenant, j'habite ici
    S02  À l'époque, on n'avait pas de voiture
    S03  Quand j'étais petit, je jouais dehors
    S04  Avant, on allait au cinéma tous les jours
    S05  Je ne fume plus depuis deux ans
    S06  Aujourd'hui, on ne se voit plus
    S07  J'irais bien au cinéma, mais je dois travailler
    S08  Avant, la vie était plus facile
    S09  Tout a changé depuis dix ans
    S10  À l'époque, je ne pouvais pas travailler ici

Nineteen word rows over twenty-one surfaces, six module rules. Nothing is newly conjugated: rule 0
says the endings are L2-M10's and the module does not touch them, and what is new is only that the
tense can carry a whole PERIOD with no story around it. Rule 1 requires the now half — the contrast
is a pair of sentences, and S01 ships the pair inside one display.

Rule 3 is the module's hinge and S07 is the sentence it exists for: English *would* is a habit
(`on allait`) and a hypothesis (`j'irais`), and S07's plate is `J'allais bien au cinéma, mais je
dois travailler` — the habit dropped into the hypothesis's slot. Rule 4 holds `ne … plus` against
L2-M9's comparative `plus`, and S05 and S08 are deliberately adjacent: `je ne fume plus` is *not any
more*, `plus facile` is *more easy*, and the only difference on the page is the `ne`. S05's plate is
the dropped `ne`, which here does not soften the sentence but reverses it.

### L4-M9 "Places and journeys" — two small words that will not go where English puts them

    S01  On est allés en France en train
    S02  On y est allés en voiture
    S03  J'y suis allé il y a deux ans
    S04  Il y en a trois dans la valise
    S05  On en a acheté deux au guichet
    S06  Nous sommes allés en Espagne et au Portugal
    S07  On a pris la route jusqu'au Portugal
    S08  On est allés à la plage et à la montagne
    S09  Combien de temps avant le départ ?
    S10  Le Portugal est un pays au bord de la mer

Nineteen word rows, six module rules. Rules 0 and 1 are the placement law — `y` and `en` lean LEFT,
onto the verb — and every one of S02's, S03's, S04's and S05's plates is the same error from a
different angle: `on est allés y`, `il y a trois en`, `on a acheté deux` with the `en` simply gone.
Rule 2 is the preposition rule, and the point of writing it as *a fact about the noun* is that
English offers nothing to carry across. Rule 3 is the internal interference brief note 3 called the
most useful line in the module: `en France` and `en train` are the same two letters in one sentence,
and S01 puts them there on purpose.

Rule 4 is the seam made into a rule: bare `y` is L2-M6's and bare `en` is L2-M4's, so no pronoun has
a row here and all four frames are indexed WHOLE. `jusqu'au` is opened beside L4-M6's `jusqu'à`
because `à le` contracts, and S07's plate is `jusqu'à le Portugal`.

### L4-M10 "A story with a twist" — the level's exit, spent on connectors

    S01  Hier soir, j'ai perdu mon sac dans le train
    S02  Tout à coup, quelqu'un m'a appelé
    S03  Il m'a dit « votre sac est au guichet »
    S04  Je n'ai rien dit, j'étais très content
    S05  Sauf que le sac était vide
    S06  Finalement, j'ai trouvé mon sac au bureau
    S07  En fait, le voisin avait pris mon sac
    S08  Soudain, le train est parti sans moi
    S09  Le train est parti alors que j'étais au guichet
    S10  J'ai répondu « merci madame » et je suis parti

Twelve word rows — the cheapest module in the level, which is what an exit module should be — and
six module rules. S01–S06 are the six-sentence account brief note 1 asked for, with the twist at S05
and the close at S06; S07 is the coda that explains it, in L4-M3's plus-que-parfait; S08–S10 are
three further turn shapes with the same cast. Every display but seven words of it is re-use, and
rule 5 says so to the learner.

Rule 0 is the module's reason to exist: L3-M5 taught the backshift after `il a dit que`, and inside
guillemets NOTHING shifts. S03's plate is `Il m'a dit « votre sac était au guichet »` — the learner
backshifting inside the quotation — and S10's plate is the other half of the same habit, a `que`
in front of the guillemets. Rule 1 states that the guillemets and the space before `?` are
typography rather than vocabulary; brief note 3's tokenizer claim was re-checked here and holds
(`tokenizeSurface` over S03's display returns `il · m'a · dit · votre · sac · est · au · guichet` —
the guillemets drop out as edge punctuation and cost no surface). Rule 4 puts `rien` in `déjà`'s
seat with its `ne`, which makes three words on one habit: `pas`, `pas encore`, `rien`.

### The seams the briefs got wrong, and what `content:owner` actually said

**1. `fermé` is not free — it is L4-M2's.** L4-M7's brief note 5 lists it among the surfaces
"content:owner reports … all free". It does not:

    fermé	L4-M2
    annulé	L4-M2

Both announcement participles the brief names as "fixed announcement shapes" were spent by wave 1.
No row was opened for either. S06 writes `le bureau sera fermé` and the line resolves through this
module's `sera` plus L4-M2's `fermé`, which is the right outcome — a second `fermé` row would have
been unreachable and its note never shown. `ouvert`, its opposite, IS free and is this module's,
which is why S10's row note reads *its opposite, fermé, is L4-M2's — this is the row that completes
the pair*.

**2. `en fait` is not free — it is L4-M4's.** L4-M10's brief note 5 lists it among the free
surfaces. `content:owner`:

    en fait	L4-M4
    tout à coup	free
    soudain	free
    finalement	free
    alors que	free
    sauf que	free

Wave 2 spent it on L4-M4's concession module. S07 uses `en fait` and opens no row for it; its
`trap` names L4-M4 as the owner instead. The other five in the brief's list are free and all five
were taken.

**3. `n'a` is free while `n'ai` is L1-M5's, and the brief's own example line depends on it.**
L4-M10's brief note 5 writes the negator example as `il n'a rien dit`. `content:owner`:

    n'a	free
    n'ai	L1-M5
    n'est	L2-M7
    n'était	L3-M10
    n'avait	free

The elided third-person `n'a` has never been taught. `il n'a rien dit` could only have shipped by
opening an `n'a` row or by indexing the whole line, and neither is worth a slot in an exit module —
so S04 writes `Je n'ai rien dit`, which resolves through L1-M5's `n'ai`. This is the elision law in
the brief's own §"en-fr-SPECIFIC LAW" biting the brief's own example, and it is the finding this
wave would most want the next one to have.

The same check governs L4-M8: `n'avait` is free, which is exactly why brief note 5 was right to say
`on n'avait pas de voiture` must be indexed WHOLE. It is, on S02, and the row note says why.

**4. `allait` is free and `allais` is L2-M10's — so the hole, not the whole.** L4-M8's brief note 5
offers `on allait` as a free whole. It is, but so is the bare third person:

    on allait	free
    allait	free
    allais	L2-M10
    jouais	free
    jouait	free
    jouions	free

Taking bare `allait` opens the cell L2-M10 left empty without touching the cell it filled, which is
the en-it L4-M3 discipline (`avrei` yes, `sarei` no) applied to an imparfait paradigm. S04's row
note says it in one line: *its first person, allais, is L2-M10's and stays there — this row opens
only the cell that module left empty*. The `jouais` row, by contrast, has no hole at all: `jouais`,
`jouait` and `jouions` are all free, so all three are on the forms list.

**5. `avant` is L3-M8's and no second row was opened for it.** Confirmed twice, once per module:

    avant	L3-M8
    avant de	free
    avant que	free
    à l'époque	free
    autrefois	free

L4-M6 takes `avant de` and `avant que` as fresh whole keys beside it, exactly as brief note 5 said.
L4-M8 wanted the same key as the bare adverb *back then*, and the brief offered a choice — accept
L3-M8's row, or lead with `à l'époque` and `autrefois`. Both were done: the module leads with
`autrefois` and `à l'époque`, uses bare `avant` in four displays without a row, and rule 5 records
the double duty in the learner's own text (*That avant is the SAME word L3-M8 taught in front of a
date … and no second row is opened for it here*).

**6. `billet aller-retour` was checked, confirmed, and deliberately NOT spent.** L4-M9's brief note
5 is right about the mechanism:

    billet aller-retour	free   [parts: aller → L2-M4, retour → free]
    aller-retour	free   [parts: aller → L2-M4, retour → free]
    retour	free
    états-unis	free   [parts: états → free, unis → free]

The hyphen would have bought bare `retour` for nothing, which is a real bargain — but no sentence in
the module needed it without displacing one of the four `y`/`en` frames, and those are what the
module is for. `États-Unis` was spent and does buy its two parts. The bargain is recorded here so
the next wave can take it rather than re-derive it.

**7. The INDEX SEAM's count and module are both stale, in every brief in the level.** The L4 briefs
speak of the fold as it stood through L3-M10. Today the last line of every `content:owner` run in
this wave read:

    886 surfaces owned, folded over 35 modules through L4-M5

Thirty-five modules, not thirty; 886 surfaces, and L4-M1 through L4-M5 are inside the fold. Every
"free" in this section was read off that run, not off the briefs.

**8. Confirmed as written, and worth saying because each was checked rather than assumed.**
`pendant` free while `pendant que` → L3-M10; `depuis` → L3-M7 and `depuis que` free; `il y a` →
L1-M7 (so `il y a deux ans` is indexed whole, five tokens, and its note names L1-M7 openly);
`encore` → L2-M5 (so `pas encore` is whole); `y` → L2-M6 and `en` → L2-M4 (so all four journey
frames are whole); `plus` → L2-M9 (so `je ne fume plus` and `on ne se voit plus` are whole);
`du coup` → L4-M2 (so `tout à coup` is whole and bare `coup` stays free); `été` → L4-M3;
`c'était` → L3-M10, which is the correction to docs/74 §4 that L4-M8's brief already carried and
that this wave re-confirmed; `personne` → L2-M10, not re-opened beside `quelqu'un`; `rendez-vous` →
L3-M7 with `rendez` → L3-M7; and `votre` and `vos` genuinely free after thirty-five modules of a
`vous`-speaking course, which was checked three times because it still does not look right.

**9. `puis-je` was checked and refused.** `content:owner` says

    puis-je	free   [parts: puis → L1-M10, je → L1-M1]

so it buys nothing, exactly as the brief said — and writing it would seat a second meaning on top
of L1-M10's `puis` (*then*) in a module whose whole job is recognition. `pourriez-vous` carries the
frozen-inversion rule alone, and docs/74 §2's `est-ce que` stands untouched.

**10. `m'a dit` and `j'ai répondu` are free, but their parts already resolve.** `content:owner`:

    m'a dit	free
    m'a	L3-M5
    dit	L2-M6
    j'ai répondu	free
    répondu	free

Neither whole was needed to make a line resolve. `il m'a dit` was nevertheless opened as a row on
S03, and its note says plainly what it is for — *its parts are already owned … so this row exists to
carry the no-backshift rule, not to rescue a word*. `j'ai répondu` was not: bare `répondu` is free
and is the more useful cell, so S10 takes the bare participle.

### The ratchet

`npm run content:shown -- en-fr L4-M6`, `-- en-fr L4-M7`, `-- en-fr L4-M8`, `-- en-fr L4-M9` and
`-- en-fr L4-M10` each print `clean — every shown surface resolves`, with **zero**
`SHOWN-BUT-UNTAUGHT`, **zero** `COLLIDES INSIDE THIS MODULE` and **zero** `RE-TEACH` lines. All
eighty-seven word rows across the five modules open a key no earlier module owns — which is the
point of seam corrections 1, 2, 4, 5 and 9 above: each of them is a row that was NOT written because
an earlier module already owns the cell, or because opening it would have buried an owned meaning.

`npx vitest run tools/shown-surfaces.test.ts` is **11/11** and **en-fr holds at its baseline of 20**.
Nothing was raised and nothing needed lowering. The wave adds fifty displays, a hundred
`variations[].display` lines and five twelve-item `comprehensionPool`s, and not one of them shows a
surface no row owns.

Surface spend against the briefs' `newWordCap` of 25: M6 sixteen, M7 twenty-four (the tightest in
the level), M8 twenty-one, M9 nineteen, M10 twelve.

`npm run content:validate` reports `CONTENT 355/355 ok` on this wave's last run — the total moves
while the other eight courses' L4 waves land in the same checkout (it read 351/351 an hour earlier);
what matters is that `en-fr/L4-M6.json` through `en-fr/L4-M10.json` are all on the `ok` side of it.

`npx vitest run src/course/types.test.ts` is **374 passed, 2 failed** on the same run, and neither
failure is this wave's: the module census (`finds all 354`), which is the parent's, and an en-ko
word with no `note`, which belongs to that course's wave landing beside this one. An earlier run
during this wave also showed the en-ar module count and a hi-en English mnemonic, both of which
those courses' waves have since fixed. `npx vitest run src/course/types.test.ts -t "en-fr"` is
**42 passed, 334 skipped**: no `glossEn` anywhere, straight apostrophes in every L2 slot — `display`, `forms`,
`variations[].display`, `mistake.display` and every pool item — and every `deconstruction.rules`
index in range across all fifty sentences.

### Open questions for the native pass

108. **The same-subject / different-subject law as stated** (M6, rule 0). Confirm that the six
     connectors are sorted correctly — `avant de`, `après avoir` and `sans` on the infinitive;
     `avant que`, `jusqu'à ce que`, `depuis que`, `une fois que`, `tant que` and `lorsque` on a
     clause — and confirm that `après que` (not shipped) really does take the indicative in current
     usage rather than the subjunctive a lot of speakers now use.

109. **`jusqu'à ce que` and `avant que` as the only two subjunctive triggers here** (M6, rule 2).
     Confirm that `une fois que`, `tant que` and `lorsque` take the indicative flatly, and confirm
     that `avant que` in ordinary speech does NOT need the expletive `ne` (`avant qu'il ne parte`)
     for the module's plain form to sound right.

110. **The three-way break of *for two hours*** (M6, rule 3, S05/S08/S09). Confirm that
     `ça fait deux ans que je travaille ici` and `je travaille ici depuis deux ans` are heard as
     interchangeable, and that `ça fait` is the one a speaker reaches for first rather than a
     textbook alternative.

111. **`Ça fait trois jours qu'il pleut`** (M6, S05 variation). Confirm the elision of `que` to
     `qu'` before `il` is the only written form, and that no speaker would write `que il`.

112. **`veuillez`, `prière de` and `merci de` as a ranked set** (M7, rule 1, S01–S03). Confirm the
     three are ordered as this module implies — `veuillez` the announcement, `prière de` the softer
     notice, `merci de` the commonest printed request — and that `merci de` really is read as a
     request rather than as thanks for something already done.

113. **The futur simple admitted in the third person only** (M7, rule 2). Confirm that
     `le train partira`, `le guichet sera fermé` and `la mairie ouvrira` are what a learner actually
     meets, and that keeping the first person on `je vais partir` for another level leaves no hole a
     French speaker would notice.

114. **`a du retard` against `est en retard`** (M7, S05 and its plate). Confirm a service HAS delay
     and a person IS late, and that `le train est en retard` — which a French speaker does say — is
     not so common that the plate is unfair.

115. **`au suivant` as the counter's call** (M7, S10). Confirm it is current in French offices and
     stations rather than dated or regional, and confirm `la personne suivante`, which the brief
     names, is the form a learner is more likely to hear in some settings.

116. **`pourriez-vous` as the level's only inversion** (M7, rule 6, S09). Confirm that keeping
     `est-ce que` everywhere else leaves the learner sounding natural rather than oddly uninverted
     at a counter, and confirm `pourriez-vous` + infinitive is the shape, not `pourriez-vous que`.

117. **The `avant` double duty** (M8, rule 5, S04/S08). Confirm that bare `avant` at the head of a
     clause reads as *back then* to a French ear as readily as it reads as *before* in front of a
     date, and that a learner meeting one row for both will not be misled.

118. **`on allait` for a habit against `j'irais` for a hypothesis** (M8, rule 3, S07). This is the
     module's whole hinge. Confirm the split is as clean as stated, and confirm
     `j'irais bien au cinéma` is current spoken French for *I'd quite like to go* rather than a
     construction that reads as bookish.

119. **`on ne se voit plus`** (M8, S06). Confirm the reciprocal reading (*each other*) is the only
     one this sentence gets, and that no French speaker would hear it as *one is no longer seen*.

120. **`à la montagne` singular against English *the mountains*** (M9, S08). Confirm the singular is
     what is said of going there as a kind of place, and that `à la plage` and `à la mer` are not
     interchangeable in the way this sentence implies.

121. **`Le Portugal est un pays au bord de la mer`** (M9, S10). Confirm the article on a subject
     country is obligatory, confirm `au bord de la mer` is idiomatic of a country rather than only
     of a house, and confirm the plate — the bare `Portugal est` — is wrong rather than merely
     journalistic.

122. **Guillemets with no colon inside a running account** (M10, rule 1, S03/S10). Confirm that
     `Il m'a dit « votre sac est au guichet »` without the colon is normal written French, and that
     the space inside the guillemets is what a French keyboard produces rather than a typographic
     nicety this course has invented.

123. **`sauf que` and `en fait` as the twist pair** (M10, S05/S07). Confirm both are current spoken
     French for taking back what the listener has just been allowed to believe, and confirm
     `sauf que` takes the indicative as flatly as S05 claims.

124. **`il n'a rien dit` is unwritable at this level** (M10, seam correction 3). The brief's own
     example cannot ship because `n'a` is untaught. Confirm that `je n'ai rien dit` is an equally
     natural line for the same lesson, and advise whether a later module should open bare `n'a` —
     it is the missing cell of a paradigm three of whose four members are already owned.
