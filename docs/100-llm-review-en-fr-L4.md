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
