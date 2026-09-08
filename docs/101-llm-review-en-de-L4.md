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
