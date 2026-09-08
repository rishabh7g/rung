# en-de L4 — LLM review

L4 is the level where German stops being a set of sentences and starts being a page: a notice, a
recipe, a paragraph that keeps one topic alive without naming it again. This file records the
authoring of that level for en-de, wave by wave, in the shape docs/83 uses for L3.

It is written against the REAL index, not against the brief's picture of it. Every ownership claim
below was run through `npm run content:owner -- en-de …`, which folds
`public/content/en-de/index/` and reports `686 surfaces owned, folded over 30 modules through
L3-M10`. That is the ladder L4-M1 inherits: nine authored L1 modules, ten L2, ten L3, and nothing
of L4 at all. Where a brief and that fold disagreed, the fold won and the disagreement is written
down in "The seams" below — that section is the most reusable thing this wave produced.

## Wave 1 — L4-M1, L4-M2 (#535)

Two modules, twenty sentences, forty-three word rows, no re-teaches and no collisions. `L4-M1`
takes `prerequisites: []` because it is the first rung of its own level; `L4-M2` takes
`["L4-M1"]`. Both ship `verified: true` in this same change, signed
`Claude Opus 5 — LLM review, authorised by repo owner`, dated `2026-09-08`, with this document as
the review the signature points at.

### L4-M1 "Explaining how" — the verb that is addressed to nobody

The ten displays:

1. `Zuerst die Zwiebeln klein schneiden` — the instruction infinitive, bare, at the end of the clause.
2. `Bitte hier nicht rauchen` — the same form negated, which is what a sign writes.
3. `Das Wasser zehn Minuten kochen lassen` — `lassen` + infinitive, and a bare accusative time span.
4. `Das Messer ist zum Schneiden` — purpose, with the infinitive capitalised into a noun.
5. `Zum Öffnen bitte hier drücken` — the same device opening a line instead of closing one.
6. `Erst schneide ich die Zwiebeln, dann koche ich die Suppe` — the conjugated twin, with V-2 twice.
7. `Bitte das Fenster schließen und das Licht ausschalten` — a separable verb held whole, because an infinitive has no ending to split from.
8. `Zuerst den Herd einschalten, dann das Salz in den Topf geben` — two steps, two infinitives, each last in its own clause.
9. `Vorsichtig rühren und zehn Minuten warten` — the bare adjective doing adverb duty.
10. `Jeder Schritt ist einfach, und anschließend ist alles fertig` — the closing line, and `und` proved not to be a position while `anschließend` is.

What it teaches, in one line: German has three ways to give an instruction and they are chosen by
AUDIENCE, not by politeness — the `Sie`-imperative (L2-M4), the bare stem (L2-M1), and the
INSTRUCTION INFINITIVE, which is addressed to nobody and is therefore what a sign, a package and a
cookbook use. Rule 1 lays the three side by side once, on facts the learner already has, and
re-teaches neither of the first two. Beside it sit two things nothing below needed: `lassen` +
infinitive (`kochen lassen`, never `lassen kochen`), and the fact that GERMAN HAS NO GERUND — the
nominalised infinitive (`das Öffnen`, `zum Schneiden`) is what English's `-ing` becomes, with
`um … zu` left where L3-M1 put it. Twenty-five word rows, exactly the cap.

The `mistake` plates are all one class on purpose: every one of them is real German in the wrong
place. `Zuerst schneiden Sie die Zwiebeln klein` is a correct `Sie`-imperative that a recipe would
never print; `Bitte rauchen Sie hier nicht` is a correct request that a wall cannot make; `Zum
öffnen` is the same sentence with the capital dropped, which is the error that actually happens.
The one plate that is simply wrong German is `Das Wasser zehn Minuten lassen kochen`, and it is
wrong in the exact English order.

### L4-M2 "Cause and consequence" — the word that holds a paragraph together

The ten displays:

1. `Das liegt daran, dass es gestern geregnet hat` — the anticipating da-word, with a verb-final `dass`-clause behind it.
2. `Ich mache das, damit alle pünktlich kommen` — `damit` as a purpose conjunction, two different subjects.
3. `Es hat geregnet, deswegen bleiben wir heute zu Hause` — the consequence adverb, fronted and inverting.
4. `Ich habe keine Zeit, sodass ich nicht kommen kann` — the result clause, one token, verb last.
5. `Ich habe davon gehört, aber ich weiß nichts` — `von` + a thing, fused, with no `r`.
6. `Wir warten schon lange darauf, und wir denken oft daran` — two vowel-initial prepositions, two `r`s.
7. `Dafür habe ich leider keinen Platz` — a fronted da-compound taking first position.
8. `Was ist gestern passiert? Ich habe nichts davon gehört` — `passieren` with `sein`, and `davon` pointing back across a sentence boundary.
9. `Das war die Folge davon, und dazu habe ich eine Frage` — two da-compounds chosen by two different governing nouns.
10. `Ich habe keine Zeit, darum komme ich morgen nicht` — the third consequence adverb, with `daher` on the variation.

What it teaches: the DA-COMPOUND, which English has no equivalent for and which therefore has to
be built rather than recognised. Rule 0 states the fusion and the `r`-rule (`da + an` → `daran`,
`da + auf` → `darauf`, and nowhere else); rule 1 states the limit that anglophones break first — a
da-compound is only ever a THING, so `auf ihn warten` keeps its preposition; rule 2 is the
anticipating placeholder that makes a paragraph out of sentences. `damit` gets its own rule because
it is ONE INDEX KEY WITH TWO READINGS, the fourth in this course after `sie`, `sich` and `werden`,
and its row is written true of both. `darum` turned out to need the same treatment and its row
says so. Eighteen word rows against a cap of twenty-five; the module spends its budget on function
words rather than nouns, which is what the job line asks for.

### The seams: what the brief claimed, and what the index actually said

**Every claim in both briefs' §6 held.** That is worth recording as plainly as a correction would
be, because it is the first level of this course whose seam section was written against
`content:owner` rather than against memory. Spot-checked and confirmed verbatim:

```
zuerst  L2-M10     danach  L2-M10    schließlich  L2-M10    dann  L1-M10
zum     L1-M7      beim    L3-M7     bitte        L1-M8     nicht L1-M2
Wasser  L1-M3      Suppe   L1-M3     Brot         L1-M3     Tür   L1-M1
warten  L3-M4      schnell L2-M9     man          L3-M9     aufstehen  free
gehen   L1-M5      nehmen  L2-M4     komm/geh/gib/hilf  L2-M1
deshalb L1-M9      weil    L1-M9     denn L1-M9   dass L1-M9   warum L1-M9
also    L1-M10     aber    L1-M10    Grund L3-M3  so   L2-M9   da    L2-M7
wegen   L3-M8      für     L3-M6     auf  L1-M4   an   L2-M4   von   L2-M2
```

The three structural claims were checked against the real `normalizeSurface`, not assumed:

```
"Kochen"               -> "kochen"                keys ["kochen"]                span 1
"zum Schneiden"        -> "zum schneiden"         keys ["zum schneiden"]         span 2
"Ein- und Ausschalten" -> "ein und ausschalten"   keys ["ein und ausschalten"]   span 3
"sodass"               -> "sodass"    span 1   vs  "so dass" -> "so dass" span 2
"liegt daran"          -> "liegt daran"           keys ["liegt daran"]           span 2
```

So a nominalised infinitive really does fold onto its verb (M1 opens ONE row per verb, and rule 3
carries the noun reading); `zum Schneiden` really is a key of its own that buys neither `zum` nor
`schneiden`; the officialese hyphen really does produce a three-token key nothing can reach, so
both words are spelled out in S08's `trap`; `sodass` really is free where `so dass` would resolve
its first token to L2-M9's comparison row; and `liegt daran` indexed whole really does leave `liegt`
unspent — `surfaceIndexKeys` returns the span and nothing else, so `liegt` and `liegen` are still
`free` for whoever needs the bare verb once this wave is emitted.

**The one thing the briefs did not predict, and it is a level-wide finding.** The en-de index
carries the `ich`-form of most earlier verbs and almost never the `er/sie/es`-form:

```
gehe  L1-M5   geht    L1-M5      arbeite L1-M4   arbeitet free
mache L1-M6   macht   free       trinke  L1-M3   trinkt   free
denke L1-M9   denkt   free       esse    L1-M3   isst     free
fahre L1-M6   fährt   free       bleibe  L3-M3   bleibt   free
warten L3-M4  warte   free       wartet  free
```

Two consequences for every module of this level. First, an L4 display that conjugates an older verb
in the third person is showing an UNTAUGHT surface, and `check-shown` will say so; the fix is either
the plural (which folds onto the infinitive the earlier module already owns) or an own row under the
"a new shape of an older lexeme gets its own row" law. L4-M2-S06 was written `Wir warten schon lange
darauf` for exactly this reason: `warten` is L3-M4's, `warte` and `wartet` are nobody's. Second,
`warten` is the odd one out — it is the only sampled verb whose ich-form is also free — so a later
module that wants `Ich warte darauf` must open a `warte` row and note the way back to L3-M4.

**One forward collision, recorded before it happens.** M1's brief claims `erst` as a fresh key and
the pattern list requires it (`Erst + V-2 + ich + , + dann + V-2 + ich`), so L4-M1-S06 opens it.
docs/92 question 55 assigns an `erst` against `schon` contrast to L4-M6. First occurrence wins:
`erst` is now L4-M1's, M6 cannot open a second row for it without becoming a fourth
`FORCED_DUPLICATES` entry, and whatever M6 wanted to say about `erst um acht` belongs in M6's
`rules` or in a `trap`. L4-M1-S06's own `trap` already names the "not until" reading so the row is
not silently wrong about it.

**One dependency the brief left implicit.** M1's worked line `Das Messer ist zum Schneiden` rests on
a noun the brief never lists. `content:owner` says `Messer L2-M5`, so the line stands; no row was
opened for it and none was needed.

### The ratchet

`npm run content:shown -- en-de L4-M1` and `… L4-M2` both print
`clean — every shown surface resolves`, with no `RE-TEACH` line and no `COLLIDES INSIDE THIS
MODULE` line. On en-de a re-teach is a defect rather than information, so "no re-teaches" is the
result rather than a nicety: every one of the forty-three rows opens a key that nothing below L4
owned, and no two rows of either module open the same folded key.

`npx vitest run tools/shown-surfaces.test.ts` passes 11/11 and **en-de holds at its baseline of 11**
— this wave neither added a shown-but-untaught surface nor cleared one, so the baseline is
untouched. `npm run content:validate` reports `CONTENT 281/281 ok`.
`npx vitest run src/course/types.test.ts -t "en-de"` passes, including the assertion that matters
here: exactly one owning row per surface across the whole course, with `FORCED_DUPLICATES` still at
its three entries (`nicht`, `dienstag`, `in`). The module census in that file is red for the parent
to fix once every course's wave lands.

Every sentence of both modules carries a `sound` line. The L3-M6..M10 wave shipped thirty-six
without one and had to come back for them; the check that catches it is
`src/course/types.test.ts`, and it was run before the files were called done rather than after.

### Open questions for the native pass

These continue this course's chain from docs/92, which ends at 70. Nothing above is renumbered, and
none of these restates a question the brief already asked (51–70).

71. **`Bitte hier nicht rauchen` against `Rauchen verboten`** (M1-S02). The module teaches the polite
    infinitive notice because it is the shape the level is about. Confirm that a public sign more
    often reads `Rauchen verboten`, and that `bitte … nicht + Infinitiv` is nonetheless what a café,
    an office door or a hand-written notice actually writes — if it is not, S02's `usage` line is
    claiming a medium it does not have.

72. **`Das Wasser zehn Minuten kochen lassen`** (M1-S03). Two things at once. Confirm the bare
    accusative time span with no preposition (`zehn Minuten`, not `für zehn Minuten`) is what a
    cookbook prints; and confirm `kochen lassen` is right for water at a rolling boil where the
    variation applies the same frame to soup, for which `köcheln lassen` may be the real word.

73. **`Der Topf ist zum Kochen`** (M1-S04's variation). Question 52 already asks about `Das Messer
    ist zum Schneiden`. This asks only whether the same frame survives the move from a tool to a
    vessel, or whether a native would reach for `Den Topf braucht man zum Kochen`.

74. **`Zum Öffnen bitte hier drücken`** (M1-S05). Confirm that `bitte` inside a printed machine
    instruction is not over-polite — packaging often writes `Zum Öffnen hier drücken` flat — and that
    `drücken` rather than `ziehen` is right for the object the `usage` line imagines.

75. **`Erst schneide ich die Zwiebeln, dann koche ich die Suppe`** (M1-S06). Confirm this reads as
    ordinary spoken German for two cooking steps, and in particular that `erst` here carries no
    trace of the "not until" reading. The `trap` names that reading and says the two uses are
    interchangeable in a list of steps; question 55 asks M6 the same thing from the other side, and
    the two answers must agree.

76. **`Vorsichtig rühren` and `anschließend ist alles fertig`** (M1-S09, M1-S10). Two register
    judgements in one. Confirm a bare adverb at the head of an instruction is what a recipe writes
    rather than `Rühren Sie vorsichtig`; and confirm `anschließend` is not too bureaucratic to close
    a domestic set of instructions, where `danach` (L2-M10's, already the learner's) might be the
    spoken choice.

77. **`Das liegt daran, dass …` as the module's opening frame** (M2-S01). Confirm this is the
    everyday reason-giving shape a colleague uses, and that neither `Das kommt daher, dass …` nor
    `Das hat damit zu tun, dass …` is more frequent. If one of them is, the anticipating da-word is
    still the lesson but the frame should change.

78. **Two da-compounds in one display** (M2-S06, `Wir warten schon lange darauf, und wir denken oft
    daran`). Deliberate, because the `r`-rule is easier to see twice than once. Confirm it does not
    read as a drill, and confirm the middle-field order `schon lange darauf` rather than `darauf
    schon lange`.

79. **`die Folge davon` and `eine Frage dazu`** (M2-S09). The weakest line in the module and the one
    most likely to be rewritten. Confirm `die Folge davon` is idiomatic for a consequence of
    something already named, and that a question about it is `eine Frage dazu` rather than `eine
    Frage darüber`. If `darüber` is the natural choice, the row and the sentence both change.

80. **`deswegen`, `darum` and `daher` as one job** (M2-S03, M2-S10). The module teaches all three as
    true synonyms and chips none of them by register. Confirm a native hears no difference worth
    chipping in these sentences, and in particular whether `daher` is as written-leaning as its note
    claims — the note is the only place the course says so.

81. **`Was ist gestern passiert?`** (M2-S08). Confirm this is the question a colleague actually asks
    about news, and that no spoken register admits `Was hat passiert?` — the `mistake` plate treats
    it as flatly wrong, and a plate that overstates is worse than no plate.

## Wave 2 — L4-M3, L4-M4 and L4-M5 (#545)

The level's RANGE modules: the mood that undoes the past, the connectives that build a case, and
the unstressed syllables that keep a disagreement friendly. Three modules, forty-seven word rows,
and — this is the shape of the wave — almost no new content words. L4-M3 runs entirely on forms
L3-M4 and L2-M10 already own; L4-M4 mints connectives and nothing else; L4-M5's whole subject is
words the course opened years of ladder ago in another job. What each module actually spends its
index budget on is recorded below.

### L4-M3 "What might have been" — one past subjunctive where English has two

```
S01  Wenn ich Zeit gehabt hätte, wäre ich gekommen
S02  Ich hätte früher Bescheid sagen sollen
S03  Das hättest du mir sagen können
S04  Fast wäre ich zu spät gekommen
S05  Es wäre besser gewesen, wenn wir gewartet hätten
S06  Wenn ich das doch nur gewusst hätte
S07  Schade, dass ich nicht mitgekommen bin
S08  Das war mein Fehler, es tut mir leid
S09  Beinahe wärst du zu spät gekommen
S10  Ich hätte Ihnen gern geholfen, aber ich hatte keine Zeit
```

Six rules, in the order the sentences point at them. **Rule 0** is the relief the brief asked to be
sold first and it is true: the past subjunctive is the Perfekt with its auxiliary moved into
Konjunktiv II, so every participle is already the learner's and the `haben`/`sein` split is
L2-M10's rule doing its fourth job. **Rule 1** is the umlaut as the mood — `hatte` against `hätte`,
`war` against `wäre` — stated as two index keys rather than two spellings, because the fold keeps
the umlaut and the two rows really are reachable separately. **Rule 2** is the auxiliary going last
in the `wenn`-clause. **Rule 3** is the double infinitive: `Ich hätte kommen können`, never
`*gekonnt`, full verb first and modal second. **Rule 4** is the subordinate-clause bend
(`dass ich hätte kommen können`) — named, never written in a display, exactly as the brief ruled.
**Rule 5** carries `würde` builds no past, plus the ruling that a fact which was *not* undone stays
in the plain Perfekt; S07 is the sentence that shows it and rule 5 is the only rule it points at.

Fourteen rows: `gehabt`, `Bescheid`, `hättest`, `fast`, `zu spät`, `gewesen`, `gewartet`,
`gewusst`, `schade`, `mitgekommen`, `Fehler`, `beinahe`, `wärst`, `geholfen`. Not one of them is a
form the grammar runs on — `hätte`, `wäre`, `hätten`, `wären`, `sollen`, `können`, `müssen` are all
used freely and all belong to earlier modules. The register device the brief asked for is S03
against S10: the same reproach and the same regret, `du` in one and `Ihnen` in the other, each with
the other address in its `variations` block so the swap is visible on one screen.

`gekonnt` and `gemusst` are deliberately never written, as the brief required — authoring either
would teach the form the Ersatzinfinitiv exists to replace. `wüsste` was left unspent as well; see
the seams below.

### L4-M4 "Persuading" — the connective skeleton of an argument

```
S01  Das ist zwar teuer, aber es ist wirklich gut
S02  Einerseits ist das teuer, andererseits ist es sehr gut
S03  Ich komme nicht mit, ich habe nämlich keine Zeit
S04  Außerdem ist der Termin schon am Montag
S05  Es geht darum, dass wir eine Lösung finden
S06  Das ist ein guter Vorschlag, aber ich habe eine Frage
S07  Ihr Argument ist gut, dennoch bin ich dagegen
S08  Der Punkt überzeugt mich überhaupt nicht
S09  Wir müssen das unbedingt heute besprechen
S10  Das ist keine gute Idee, denn es ist zu teuer
```

**Rule 0** does the job the brief named: it sorts the connectives once, on three classes the course
already owns — `obwohl`/`weil` send the verb last, `aber`/`denn` count as nothing, `trotzdem`/
`deshalb` front and invert — and adds this module's four to the third class. S10 is the sentence
built to show the second class against the first (`denn es ist zu teuer` in the display, `weil es zu
teuer ist` in the variation, one meaning, two word orders). **Rule 1** gives `zwar` its own line
because it is the odd one: inside its clause, never alone, `aber` half always behind it.
**Rule 2** is `nämlich`, contrasted with `weil` and `denn` on one pair of facts — the cleanest thing
in the module, and all three words it is set against were already paid for. **Rule 3** is the
inversion of `einerseits`/`andererseits`. **Rule 4** is `eventuell`, tagged `interference`: named,
warned about, and deliberately not written (see the seams). **Rule 5** lists what a case already has.

Eighteen rows: `zwar`, `einerseits`, `andererseits`, `nämlich`, `außerdem`, `es geht`, `Lösung`,
`Vorschlag`, `Argument`, `dennoch`, `dagegen`, `Punkt`, `überzeugt`, `überhaupt`, `unbedingt`,
`besprechen`, `Idee`, `gute`. Both of the brief's traps were routed around rather than tested:
`meinen Punkt` is never written (S08's `trap` says why, and the display uses `der Punkt`), and
`Stimme` for *voice* appears nowhere, because the fold merges it with L3-M3's `stimme`.

### L4-M5 "Disagreeing well" — the softening the learner cannot hear

```
S01  Sagen Sie mal, haben Sie kurz Zeit?
S02  Das ist eben so, da kann man kaum etwas machen
S03  Das ist halt so, sagen die Leute hier
S04  Irgendwie bin ich mir da nicht ganz sicher
S05  Ehrlich gesagt finde ich das gar nicht gut
S06  Wäre es nicht besser, wenn wir einen Moment warten?
S07  Das ist doch teuer, nicht wahr?
S08  Zugegeben, da haben Sie wirklich Recht
S09  Ich würde eher sagen, dass das ziemlich schwer ist
S10  Naja, das weiß ich sowieso schon
```

**Rule 0** is the modal particle as a system. **Rule 1** is the module's central fact, said plainly
because the brief insisted it be said: the particles are ordinary words heard sideways, and the
reason a learner misses them is that they already know every one. `doch` and `ja` are L1-M2's,
`schon` is L2-M2's, `wohl` is L3-M6's, `eigentlich` is L3-M10's — so only `mal`, `eben` and `halt`
take rows, with `halt` chipped as the southern twin. **Rule 2** is Konjunktiv II as tone, the fourth
statement of the law L2-M1, L2-M8 and L3-M3 each made once, and it costs the index nothing: S06 and
S09 use `wäre` and `würde` with no row. **Rule 3** is the negative question as an invitation to
agree, with `oder` (L1-M10) named as the tag German actually uses and carried in S07's variation.
**Rule 4** is the do-not-write list, with the reason stated as a course law rather than as an
apology: `doch` of *Komm doch mit*, `ja` of *Das ist ja teuer*, `wohl` of *Das wird wohl stimmen*.
**Rule 5** carries the hedge-by-the-syllable point and the no-two-particles-in-one-clause ruling.

Fifteen rows: `mal`, `eben`, `kaum`, `halt`, `irgendwie`, `ganz`, `ehrlich gesagt`, `gar nicht`,
`Moment`, `nicht wahr`, `zugegeben`, `eher`, `ziemlich`, `naja`, `sowieso`. Every span among them is
multi-token, so none of them claims a bare part: `gar`, `wahr`, `ehrlich` and `gesagt` are all
untouched by this module, which is exactly the tool the brief said it would need.

### The seams: what the briefs claimed, and what the index actually said

**The count in all three briefs' §6 is stale, and it is the only correction that touches all three.**
Every one says the seam was "checked with `npm run content:owner` against 686 surfaces through
L3-M10". In this checkout the tool reports:

```
748 surfaces owned, folded over 32 modules through L4-M2
```

Wave 1 shipped, and its two modules are in the emitted index. Nothing in the briefs was invalidated
by the deeper fold — every §6 claim was re-checked against 748 rather than 686 and every one held —
but a wave that trusts the printed number would be checking the wrong ladder. The number belongs in
the review, not in the brief, and the next brief should say *through the last emitted module* rather
than name one.

**Every other claim in all three §6 sections held, verbatim.** Spot-checked:

```
hätte L3-M4   wäre L3-M4   hätten L3-M4   wären L3-M4   sollte L3-M4   müsste L3-M4
war L1-M5     hatte L1-M5  gemacht L1-M5  gegangen L1-M5  Zeit L1-M5   Termin L3-M4
gekommen L2-M10  konnte L2-M10  wollte L2-M10  gesagt L2-M10  schließlich L2-M10
nur L3-M10    leider L2-M8   wenn L1-M10    dann L1-M10   weil L1-M9    dass L1-M9
darum L4-M2   dafür L4-M2    passiert L4-M2  pünktlich L4-M2  geht L1-M5  gehen L1-M5
meinen L2-M8  Stimme L3-M3   stimme L3-M3   obwohl L3-M3   trotzdem L3-M3
doch L1-M2    ja L1-M2       schon L2-M2    wohl L3-M6     eigentlich L3-M10
könnten L2-M1 kann L2-M1     sagen L2-M10   gerade L2-M7   da L2-M7
```

and the spans the briefs promised were free really are free, with their bare parts left alone:

```
es geht  free   (geht L1-M5 unspent)        gar nicht  free   (gar free, never written alone)
zu spät  free   (zu L1-M8, spät L1-M4)      nicht wahr free   (wahr free, never written alone)
ehrlich gesagt free  (ehrlich L3-M3, gesagt L2-M10 — the span claims neither)
im Ernst free   schon mal free   (both left unspent, see below)
```

**Five corrections, none of them fatal, all of them things the next brief should carry.**

1. **`gute` is free and `guter` is L3-M2's.** No brief names `gute`. L4-M4's `eine gute Idee` would
   have printed `SHOWN-BUT-UNTAUGHT gute` — the feminine ending is a different key from the
   masculine one L3-M2 owns. The row is opened here (S10) and its note points at L3-M2 for `guter`.
   This is the general shape of the en-de adjective seam and it will bite every level above this one.

2. **`überzeugen` is spent as a FORM, not as a display.** L4-M4's brief lists `überzeugen` among its
   fresh keys. `content:owner` says `überzeugen free` and `überzeugt free`, and the sentence that
   earns the word shows the finite form, so the row's `display` is `überzeugt` with
   `forms: ["überzeugt", "überzeugen"]`. One row, both keys, and the shown surface is the one on the
   page. A brief that names an infinitive is naming a lemma, not a display.

3. **`möglich` is not taught anywhere in this course.** `content:owner` says `möglich free`, and a
   first draft of L4-M5 wrote `wäre das möglich?` in S01's variation and again in the pool. Both
   printed `SHOWN-BUT-UNTAUGHT möglich`. They were rewritten (`hätten Sie kurz Zeit?` and
   `könnten Sie mir helfen?`) rather than given a row, because a politeness module should not spend
   a row on an adjective. It is the most obvious missing word in the course's polite-request
   vocabulary and a later module should claim it.

4. **`wissen` is free while `weiß` is L2-M3's.** L4-M5-S10 was drafted as `das wissen Sie sowieso
   schon` and would have shown an untaught infinitive. It is now `das weiß ich sowieso schon`. The
   same seam as correction 1, pointing at a verb instead of an adjective: L2-M3 opened one finite
   form and the infinitive stayed free.

5. **Six words the briefs listed as fresh are deliberately left unspent**, and a later wave should
   know they are still on the table rather than assume this one took them:
   `wüsste` (L4-M3 — no sentence needed it once `gewusst` had a row), `eventuell` (L4-M4 — named in
   rule 4 as the false friend and not written, which is the safer route the brief itself offered),
   `im Ernst` and `schon mal` (L4-M5 — no display earned them inside the ten), and `gekonnt` and
   `gemusst` (L4-M3 — forbidden by the brief, recorded again here so nobody re-mints them).

   Three words the briefs did NOT list were needed and were checked free before use: `Bescheid`,
   `gewartet`, `mitgekommen`, `geholfen` and `zu spät` (L4-M3); `Lösung`, `dagegen`, `besprechen`
   and `Idee` (L4-M4); `ganz` and `Moment` (L4-M5). `ganz` is the one worth arguing about — the
   brief's fresh list has no word for the *not quite* hedge, and `nicht ganz` is the smallest
   softening German has, so the module would have been poorer without it.

### The ratchet

```
npm run content:shown -- en-de L4-M3   →  L4-M3: clean — every shown surface resolves
npm run content:shown -- en-de L4-M4   →  L4-M4: clean — every shown surface resolves
npm run content:shown -- en-de L4-M5   →  L4-M5: clean — every shown surface resolves
```

No `RE-TEACH` line and no `COLLIDES INSIDE THIS MODULE` line on any of the three. On en-de a
re-teach is a defect rather than information, so that is the result and not a nicety: all
forty-seven rows of this wave open a key nothing below them owned, and no two rows of any module
open the same folded key. Nothing here needed the deliberate-repeat escape hatch, so no two rows
share a note.

`npm run content:validate` reports `CONTENT 297/297 ok`.

`npx vitest run tools/shown-surfaces.test.ts` passes **11/11, and en-de holds at its baseline of 11**
— this wave neither added a shown-but-untaught surface nor cleared one, so no baseline moved in
either direction.

`npx vitest run src/course/types.test.ts` is **1 failed | 317 passed**, and the single failure is
the module census (`finds all 288 …`), which is red because every course's wave is landing at once
and is the parent's to fix. Every other assertion passes, including the two that this wave is most
at risk from: exactly one owning row per surface across the whole course, with `FORCED_DUPLICATES`
still at its three entries (`nicht`, `dienstag`, `in`) and no fourth; and `sound` non-empty on every
sentence of every en-de module. That test was run before these files were called done, not after —
the L3-M6..M10 wave shipped thirty-six sentences with no `sound` line because it ran it the other
way round. All thirty sentences of this wave carry one, and L4-M3 (an M3) additionally carries all
five enrichment blocks on all ten sentences, as `tools/validate.ts` requires.

### Open questions for the native pass

These continue this course's chain from docs/92 and the Wave 1 section above, which together end at
81. Nothing above is renumbered.

82. **`Ich hätte früher Bescheid sagen sollen`** (M3-S02). `Bescheid sagen` was chosen over
    `Bescheid geben` because it is the commoner pair and because `sagen` is already taught. Confirm
    a native would not say `Bescheid geben` here, and that `früher` rather than `eher` is right for
    *earlier in time* in this sentence — `eher` is opened in M5-S09 for a different job entirely.

83. **`Fast` against `beinahe`** (M3-S04, M3-S09). The module treats them as true synonyms and chips
    `beinahe` only as "fuller". Confirm there is no register or frequency difference worth chipping,
    and in particular whether `beinahe` reads as written-only to a speaker under thirty.

84. **`Beinahe wärst du zu spät gekommen`** (M3-S09). The auxiliary claim is the load-bearing one:
    `kommen` takes `sein`, so a near miss takes `wärst` and never `hättest`. Confirm, and confirm
    the sentence reads as teasing rather than as a reprimand — the `usage` line promises teasing.

85. **`Das war mein Fehler, es tut mir leid`** (M3-S08). Two clauses joined by a comma with no
    conjunction. Confirm that is natural spoken German for owning up, rather than `und es tut mir
    leid`, and that `Das war mein Fehler` is what a colleague actually says rather than
    `Das war meine Schuld`.

86. **`Ich hätte Ihnen gern geholfen`** (M3-S10). Confirm `gern` and not `gerne` in this register —
    the course owns `gern` (L2-M1) and `gerne` is free, so if `gerne` is the natural choice in a
    formal apology the row would have to be opened somewhere. Also confirm the sentence does not
    read as a refusal that was never meant.

87. **The double-infinitive mistake plates** (M3-S02, M3-S03). Both plates strike out `gesollt` and
    `gekonnt` behind an infinitive. Confirm these are flatly wrong rather than regionally tolerated,
    because a plate that overstates is worse than no plate — and confirm no spoken southern variety
    admits them.

88. **`Das ist zwar teuer, aber es ist wirklich gut`** (M4-S01). Confirm `zwar` directly after the
    finite verb is the unmarked position here, and that a native would not prefer
    `Das ist teuer, das ist zwar wahr, aber …` or front the concession some other way.

89. **`Ich komme nicht mit, ich habe nämlich keine Zeit`** (M4-S03). The comma with no conjunction is
    deliberate — `nämlich` builds no clause — but confirm a native writes it with a comma rather
    than a semicolon or a full stop, and that the sentence does not read as curt.

90. **`Ihr Argument ist gut, dennoch bin ich dagegen`** (M4-S07). Three rows on one sentence, which
    is the heaviest in the wave. Confirm `dennoch` is not so bookish that it jars in a spoken
    disagreement with somebody you address as `Sie`, and that `dagegen sein` is the natural way to
    be against a proposal rather than `dagegen stimmen` or `nicht einverstanden sein`.

91. **`Der Punkt überzeugt mich überhaupt nicht`** (M4-S08). The `trap` claims `mein Punkt` is an
    English shape German avoids. Confirm that is true and not merely dispreferred, and confirm
    `der Punkt` with a definite article is what a native says when picking up somebody's argument.

92. **`Wir müssen das unbedingt heute besprechen`** (M4-S09). Confirm the middle-field order
    `das unbedingt heute` rather than `das heute unbedingt`, which is the order an English ear
    expects. The `trap` says `unbedingt` sits before the time word and nothing else in the course
    states that.

93. **`mal`, `eben` and `halt` as the only three rows** (M5-S01, S02, S03). The whole module rests on
    the ruling that the other particles keep their older rows. Confirm the three that ARE written are
    the three a learner meets first, and — the one that would change the module — confirm `halt` is
    genuinely southern rather than now general, which several sources claim and none of them settles.

94. **`Irgendwie bin ich mir da nicht ganz sicher`** (M5-S04). Two hedges in one clause, which the
    module elsewhere forbids for particles. Confirm this does not read as evasive to a native — the
    rule-5 warning is precisely that a doubled English-style hedge does — and confirm `irgendwie` in
    first position is natural rather than teenage.

95. **`Zugegeben, da haben Sie wirklich Recht`** (M5-S08). Confirm bare `Zugegeben` as a one-word
    concession opener is current spoken German rather than journalistic, and that `da haben Sie
    Recht` with the `da` is the idiom rather than `damit haben Sie Recht`.

96. **`Naja, das weiß ich sowieso schon`** (M5-S10). The weakest line in the wave. Confirm `naja`
    spelled solid rather than `na ja` — both are attested and the index cannot hold both — and
    confirm the sentence deflects unwanted advice rather than simply sounding rude, which is the one
    thing this module exists to avoid.

97. **`nicht wahr` against `oder`** (M5-S07). The module makes `nicht wahr` the display and `oder`
    the variation. Confirm that ordering is right for a course that teaches `Sie`, or whether
    `oder?` is so dominant in speech that it should be the display and `nicht wahr` the variation.
