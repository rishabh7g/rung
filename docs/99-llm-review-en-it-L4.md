# en-it L4 — LLM review

The review that clears each en-it L4 wave to ship, written in the same change that authors it
(`CLAUDE.md`, "Ship `verified: true` in the authoring change"). The **native-speaker gate is a
separate, stricter bar and stays unmet**: every section below ends in open questions for a native
pass, and no later wave may close one of them by rewriting a shipped module.

Open questions CONTINUE the chain that `docs/90-en-it-L4-brief-decisions.md` opened for this level.
That file's last number is **61**, so this file starts at **62**. Nothing existing is renumbered.

## Wave 1 — L4-M1, L4-M2 (#533)

Authored against the briefs in `tools/course-briefs.ts` and the decisions recorded in `docs/90`, and
reviewed against the REAL cumulative index rather than against the briefs' account of it. Every seam
below was checked with `npm run content:owner -- en-it …`, which reported **958 surfaces owned,
folded over 30 modules through L3-M10**, at **`maxSpan` 3** — the same fold `docs/90` was pinned
against on 2026-09-08, unchanged, because these are the first two L4 modules of the course and
nothing had been added to it since. `maxSpan` does not move: the longest new key in either module is
three tokens (`per prima cosa` in M1, `a causa di` in M2), which is exactly the span L2 already paid
for.

### L4-M1 "Explaining how" — the crossed endings, and what a step is for

The ten displays:

1. `Prima apri la finestra, poi chiudi la porta`
2. `Per prima cosa metti la pentola sul fuoco`
3. `Aggiungi il sale, poi aspetta dieci minuti`
4. `Non toccare la pentola, è molto calda`
5. `Guarda le istruzioni della ricetta e non dimenticare il sale`
6. `Prima gira a destra, poi vai dritto`
7. `Premi il tasto verde per uscire`
8. `Questo tasto serve per uscire`
9. `Scusi, metta il documento sul tavolo e dica il numero`
10. `Senta, apra la porta e aspetti qui`

This is the first module in the course in which the learner tells somebody else to do something, and
the whole of its difficulty is one fact: **the imperative's endings are crossed.** To a friend an
`-are` verb ends in `-a` (`gira`, `aspetta`, `guarda`) and an `-ere` or `-ire` verb ends in `-i`
(`apri`, `chiudi`, `metti`, `aggiungi`, `premi`); politely the two swap, so `-are` takes `-i`
(`aspetti`) and `-ere`/`-ire` take `-a` (`metta`, `apra`). Rule 0 states it as the swap and never as
two lists, because two lists are what a learner merges — and S10 puts both halves of the crossing in
one sentence (`apra` … `aspetti`) so the merge cannot survive contact with it.

The ten displays are laid out so the crossing is felt rather than described. S01 pairs two `-i`
verbs a friend hears; S03 pairs an `-ere` verb in `-i` with an `-are` verb in `-a` inside one
instruction; S09 and S10 then say the same kinds of thing politely and every ending inverts. Five of
the ten mistake plates are register mixes — `apra … chiudi`, `metta … aggiungi`, `aggiunga …
aspetta`, `Scusi, metti`, `Senta, apri` — because that, and not a wrong ending in isolation, is what
a learner actually produces.

The negative is its own row rather than a note. `non toccare` is indexed WHOLE, with `non aprire`,
`non dimenticare`, `non aggiungere`, `non guardare` and `non premere` as its `forms`, so every
negative order in the module and its variations resolves to one row saying one thing: **`non` plus
the plain infinitive**, which looks nothing like the positive form standing beside it. Bare
`toccare` stays free for a later level, exactly as `docs/90` asked.

The second half is purpose. `per` earns no new row — it is L3-M2's, from `Lavoro per una ditta
italiana` — so rule 3 carries the new JOB of an owned key, and S07 and S08 show it: `per uscire`
after an order, and `serve per` (indexed whole, with `servono per`) for what a thing is FOR. The
mistake plates on both are the `a` an English speaker reaches for after meeting `vado a mangiare`.

What the module deliberately does not do: it opens no congiuntivo paradigm (rule 4 says truthfully
that the polite forms are borrowed from a mood L4-M5 owns and asks the learner to take them whole),
it attaches no pronouns to an imperative (every object stays a separate word — `dica il numero`),
and it re-uses `prima`, `poi` and `infine` from L3-M1 without re-explaining them.

**23 rows** against a cap of 25, `minWordsPerSentence` 5, `maxWordsPerSentence` 12.

### L4-M2 "Cause and consequence" — which end the reason goes on

The ten displays:

1. `Siccome pioveva, non sono uscito`
2. `C'era uno sciopero, quindi ho perso il treno`
3. `Sono arrivato in ritardo, infatti c'era molto traffico`
4. `A causa del traffico, ho perso la riunione`
5. `Grazie a mia sorella ho capito il motivo`
6. `Non ho studiato, dunque non ho capito bene`
7. `Visto che c'era lo sciopero, sono andato in autobus`
8. `Dato che è tardi, spiego tutto domani`
9. `Per colpa del traffico sono arrivato tardi, per questo sono stanco`
10. `Ho perso il treno, di conseguenza sono arrivato in ritardo`

L1-M9 already gave `perché` and `quindi` inside a single sentence, so the learner arrives able to
say the simple version of everything here. What the module adds is **position as a law rather than a
style**: `perché` can only follow its clause, `siccome`, `visto che` and `dato che` can only precede,
and `S01` against its own first variation (`Non sono uscito perché pioveva`) states the same fact
twice with the conjunctions in their only legal slots. English `because` goes at either end, so
there is nothing to transfer and rule 0 says so.

The consequence words all attach to the result and therefore all come second: `quindi` (S02),
`dunque` (S06), `per questo` (S09) and `di conseguenza` (S10), which is the register-marked one.
Three of the four carry the same mistake plate — the connector moved onto the cause — because that is
the one thing a learner does with them; S09's plate is spent instead on the contraction inside
`per colpa del`.

The `because of` set is the module's real interference. Before a NOUN Italian says `a causa di` or
`grazie a` and **chooses between them by whether the outcome is welcome**: `a causa del traffico`
for the delay, `grazie a mia sorella` for the rescue. English makes no such distinction, and S05's
third variation makes it visible by swapping the phrase and letting the outcome go bad with it.
`per colpa di` is the third member — the same slot with blame attached, ordinary speech and not an
insult (rule 3, S09). All three are indexed WHOLE and carry their contracted forms (`a causa del`,
`a causa della`, `a causa dello`, `grazie al`, `grazie alla`, `per colpa del`, …) as `forms`, so a
display may write the contraction without a bare `causa`, `colpa`, `questo` or `visto` row existing.

`infatti` gets rule 5 to itself because it is the one word here an English speaker will use wrongly:
it CONFIRMS and never contradicts, so it is not the *in fact* that corrects somebody, and it is not
a consequence word either. Its mistake plate is a sentence in which `infatti` is asked to
contradict.

Not taught, per the brief: the congiuntivo concessives (`benché`, `sebbene`) — L5's; the passive as
a system — L4-M7's; and `poiché`/`pertanto`, which are written register and belong with L5-M4.

**15 rows** against a cap of 25, `minWordsPerSentence` 5, `maxWordsPerSentence` 13.

### The brief seams, checked against the emitted index

The single most valuable thing a wave produces is the list of places where the brief's INDEX SEAM
and the emitted index disagree. **On this wave they did not disagree anywhere.** Both briefs'
seam notes were pinned against the same 958-surface fold this authoring ran against, and every claim
in them reproduced verbatim. Recorded here so the next wave can rely on it rather than re-deriving:

`npm run content:owner -- en-it gira metti apri chiudi aggiungi aspetta guarda premi metta apra
aspetti dica "per prima cosa" ricetta pentola istruzioni tasto fuoco "non toccare" "serve per"
toccare serve vada prenda giri scusi senta firmi vai prendi fai per`:

```
gira free · metti free · apri free · chiudi free · aggiungi free · aspetta free · guarda free
premi free · metta free · apra free · aspetti free · dica free · per prima cosa free
ricetta free · pentola free · istruzioni free · tasto free · fuoco free
non toccare free · serve per free · toccare free · serve free
vada L2-M4 · prenda L2-M4 · giri L2-M4 · scusi L2-M1 · senta L2-M1 · firmi L3-M8
vai L1-M6 · prendi L1-M6 · fai L1-M6 · per L3-M2
```

Every one of those is what M1's note 5 said. The owned polite cells (`vada`, `prenda` and `giri`
from L2-M4, `scusi` and `senta` from L2-M1, `firmi` from L3-M8) got no rows and are quoted in rules
and notes only; the owned familiar
cells (`vai`, `prendi`, `fai`) got no rows either, and S06 uses `vai dritto` deliberately so the
learner meets the fact that `andare`'s familiar order IS L1-M6's present-tense form, stated in the
sentence's trap rather than bought with a row it could not own.

`npm run content:owner -- en-it siccome "visto che" "dato che" "a causa di" "grazie a" "per colpa
di" "per questo" "di conseguenza" dunque infatti motivo traffico sciopero spiegare perché quindi
allora così ufficio visto causa colpa questo grazie`:

```
siccome free · visto che free · dato che free · a causa di free · grazie a free
per colpa di free · per questo free · di conseguenza free · dunque free · infatti free
motivo free · traffico free · sciopero free · spiegare free · causa free · colpa free
perché L1-M9 · quindi L1-M9 · allora L1-M10 · così L2-M5 · ufficio L3-M2
visto L3-M5 · questo L2-M9 · grazie L1-M2
```

Also as M2's note 5 said, including the one that matters most: **`visto` is L3-M5's**, the participle
from L3-M5-S10, so a bare `visto` row here would have been unreachable. `visto che` is indexed whole
and the L3-M5 row keeps the bare key. The same reasoning covers `grazie` (L1-M2) under `grazie a`
and `questo` (L2-M9) under `per questo`: the resolver's longest-match-first walk reaches the
two-token key before it reaches the owned single token, so both resolve to this module while the
earlier rows keep their own.

Four keys were bought that neither brief names, all confirmed `free` before use and all inside the
cap: `finestra` and `sale` and `minuti` (M1, to give the recipe and the window steps a noun each)
and `in ritardo` (M2, indexed whole with `in orario`, because `ritardo` alone was free and `tardi`
is L2-M7's and means something else). `in ritardo` versus `tardi` is stated in S03's trap and is
open question 72.

One brief statement is recorded here as **not corrected but doubted**: M2's note 2 gives the
front-only law for `siccome`, `visto che` and `dato che` as absolute. It is unquestionably right for
`siccome`. For `visto che` and `dato che` the module has been authored to the brief — rule 0 and
S07's mistake plate both rest on it — but see open question 68.

### The ratchet

`tools/shown-surfaces.test.ts` holds at **en-it 17**, unchanged and not lowered, across both
modules. `npm run content:shown` reports **`L4-M1: clean — every shown surface resolves`** and
**`L4-M2: clean — every shown surface resolves`**, with **no `SHOWN-BUT-UNTAUGHT`, no
`COLLIDES INSIDE THIS MODULE`, and no `RE-TEACH` at all** in either module. `npm run content:validate`
passes on every module in the tree, this wave's two included; the count in its summary line moves as
the other eight courses' L4 waves land alongside this one.

Zero re-teaches is worth a sentence, because it was designed for rather than lucky. The imperative
is the one system in the course whose paradigm cells sit in two rows at once, so a `forms` list
written as a paradigm (`metti` carrying `metta`) would have collided with the polite row that owns
that display. Every verb row in M1 therefore lists **only its own display** in `forms`, and the
paradigm is carried by rule 0 instead, where it belongs. The only multi-surface `forms` lists in the
wave are the ones that are genuinely one construction with several fillings: `non toccare`'s six
negatives, `a causa di`'s and `grazie a`'s and `per colpa di`'s contractions, and `spiegare`'s
ordinary `-are` paradigm.

### Open questions for the native pass

62. **`per prima cosa` against `prima di tutto`** (M1-S02). Confirm `per prima cosa` is what a
    speaker actually opens a set of steps with, and that `prima di tutto` or `innanzitutto` is not
    the commoner reach in a kitchen.
63. **`sul fuoco` over a modern hob** (M1-S02). The module teaches `metti la pentola sul fuoco` as
    the ordinary instruction. Confirm it is still what is said over an induction or electric hob and
    not only over a gas flame.
64. **`premi` at a machine** (M1-S07). `premere` is the module's verb for a button. Confirm a
    speaker says `premi il tasto` at a ticket machine or a lift and does not reach first for
    `schiaccia` or, on a touchscreen, `tocca`.
65. **`serve per` against `serve a`** (M1-S08, mistake plate). The plate says `servire a` means to
    be of use to somebody. Confirm `serve a` plus an infinitive is not simply an ordinary spoken
    alternative, which would make the plate wrong rather than the sentence.
66. **The bare `vai` as an order** (M1-S06, trap). The module leans on L1-M6's `vai` and says there
    is no new form to learn. Confirm `vai dritto` is what is heard and that `va'` is not the neutral
    written form a learner should meet first.
67. **The polite cells left unbought** (M1). The module buys four polite rows — `metta`, `apra`,
    `aspetti`, `dica` — and quotes `giri`, `aggiunga`, `guardi`, `prema` and `chiuda` in rules and
    notes only. Confirm a learner at this rung is not left stuck: they can produce the rule but have
    no row behind five of the forms the module itself names.
68. **`visto che` and `dato che` at the back of the sentence** (M2, rule 0 and S07's plate). The
    brief states the front-only law as absolute and the module rests on it. Confirm whether
    `Sono andato in autobus visto che c'era lo sciopero` is genuinely out, or merely marked — if it
    is only marked, rule 0 overstates and a later wave must be allowed to soften it without
    rewriting these sentences.
69. **How blunt `per colpa di` is** (M2-S09, rule 3). The module says it is ordinary speech and not
    an insult. Confirm `per colpa tua`, said to somebody's face, sits in the same register as
    `per colpa del traffico`, or whether the two need separating.
70. **`di conseguenza` as `formal`** (M2-S10). The sentence carries `register: formal`. Confirm it
    is not simply ordinary in careful spoken Italian, which would make the chip wrong rather than
    the word.
71. **Bare `Infatti!`** (M2-S03). The module teaches `infatti` only as a clause opener. Confirm the
    one-word `Infatti!` used as *exactly* or *I know* is not the commoner thing a learner meets
    first, and whether it deserves a row of its own at L4 or later.
72. **`in ritardo` beside `tardi`** (M2-S03 trap, and pool item C10, which puts both in one line on
    purpose). Confirm `Il treno era in ritardo, di conseguenza sono arrivato tardi` reads naturally
    and is not felt as a repetition a speaker would avoid.

## Wave 2 — L4-M3, L4-M4 and L4-M5 (#542)

The level's RANGE modules, authored against the briefs in `tools/course-briefs.ts` and reviewed
against the REAL cumulative index rather than against the briefs' account of it. Every seam below
was checked with `npm run content:owner -- en-it …`, which now reports **1030 surfaces owned, folded
over 32 modules through L4-M2**, at **`maxSpan` 3**. That is the wave 1 fold plus wave 1's own two
modules: the 958-surface / 30-module pin `docs/90` and the section above were written against no
longer exists, and a later wave should quote **1030 / 32** instead. `maxSpan` does not move — see
"Two keys that would have raised `maxSpan`" below, where it nearly did.

### L4-M3 "What might have been" — the two-piece machine, and where the tense lives

The ten displays:

1. `Se avessi saputo, ti avrei chiamato`
2. `Avrei dovuto dire la verità subito`
3. `Sarebbe stato meglio partire ieri`
4. `Magari avessi ascoltato mia madre`
5. `Meno male che ho portato l'ombrello`
6. `Se fossi partito prima, non avrei perso il treno`
7. `Avrei potuto dire qualcosa, ma non ho detto niente`
8. `Che peccato, sarebbe stato un bel viaggio`
9. `Dovevo partire ieri, invece sono rimasto a casa`
10. `Se avessi avuto tempo, sarei venuto anche io`

What it teaches. Rule 0 states the machine as the brief demands it — two compound halves, `se` plus
`avessi`/`fossi` plus a participle on the left, `avrei`/`sarei` plus a participle on the right — and
says out loud that everything under it is already paid for: L2-M10's auxiliary law, L3-M10's
participles, L3-M4's `-ei / -esti / -ebbe`. The one genuinely new fact is that the AUXILIARY carries
the tense while the main verb stops moving, so the module buys two auxiliary rows and not fifty
forms. Rule 1 is the modal inversion (`avrei dovuto andare`, never `dovrei essere andato`), rule 2
is that `se` is compulsory and never takes the conditional, rule 3 is the `avessi`/`avevo` minimal
pair the brief insisted be shown rather than hidden, and rule 4 is the regret vocabulary plus the
spoken `dovevo`/`potevo` shortcut.

Per the brief's note 4, the module shows `avrei dovuto` and `avrei potuto` with a bare infinitive
ONLY; `sarei dovuto andare` appears nowhere, not even in a variation, and is left to L5. The
`passato remoto` stays deferred and the present `se` frame is never re-opened — no display in the
module puts `se` in front of a present tense.

**25 rows** against a cap of 25, `minWordsPerSentence` 5, `maxWordsPerSentence` 13.

### L4-M4 "Persuading" — the concessive move, and the two words for *but*

The ten displays:

1. `È vero che costa di più, ma dura molto`
2. `Hai ragione, però non ho tempo adesso`
3. `Ti conviene prenotare adesso, costa molto meno`
4. `D'accordo, però almeno dobbiamo partire presto`
5. `Vale la pena provare, secondo me`
6. `In realtà non è così caro, anzi conviene`
7. `Comunque il mio punto di vista non cambia`
8. `Insomma, è difficile convincere mio padre`
9. `Appunto, è quello che dicevo prima`
10. `Soprattutto ti conviene parlare con lui`

What it teaches. Rule 0 makes the concession a STRUCTURE and not a word — `è vero che X, ma Y`;
`hai ragione, però Y`; `d'accordo, però Y` — and says the claim must live in the second half or the
speaker has simply agreed. Rule 1 is the positional split the brief calls the thing no learner
produces unprompted: `ma` can only open its clause, `però` can open OR close it, and S02's first
variation (`Hai ragione, non ho tempo adesso però`) exists solely to put the final `però` in front
of the learner. Rule 2 is `conviene` as a double false friend running impersonally like `piacere`.
Rule 3 is the graded register — `dovresti` (L3-M4) / `ti conviene` / `sarebbe meglio` / `devi`
(L3-M2) — and rule 4 is the bare-infinitive advice family, which is the module's answer to the
question of why persuasion does not have to wait for a mood.

Per the brief's note 4, the congiuntivo appears nowhere in this module. S01's mistake plate is
built on exactly that: `È vero che costi di più` is shown as WRONG, because conceding a point is the
opposite of doubting it. Raising the voice, insisting and the ironic climb-down are left to L5.

**21 rows** against a cap of 25.

### L4-M5 "Disagreeing well" — the mood as a paradigm, and the pronoun that comes back

The ten displays:

1. `Non credo che sia vero`
2. `Non sono del tutto d'accordo, ma capisco`
3. `Sarà, però secondo me è troppo caro`
4. `Dipende da quello che vuoi fare`
5. `Forse hai ragione, ma non saprei`
6. `Dubito che lui possa venire domani`
7. `Può darsi che tu abbia ragione`
8. `Mi sa che non è una buona idea`
9. `Sembra difficile, ma non è detto`
10. `Temo di no, probabilmente è troppo tardi`

What it teaches. Rule 0 pays L3-M3's debt and names the present congiuntivo as a paradigm: `-are`
takes `-i` across `io`, `tu` and `lui`, `-ere` and `-ire` take `-a`, and L3-M3's `sia`, `abbia` and
`possa` are the same three-way syncretism in an irregular shape. Rule 1 is the module's sharpest
fact and it is carried by the content as well as by the prose — S06 and S07 both put the pronoun in
(`che lui possa`, `che tu abbia`), each has a variation that swaps ONLY the pronoun, and S06's third
variation drops it deliberately with a `changed` line saying that only works if he was just named.
Rule 2 lists the doubt triggers and isolates `mi sa che` as the one that keeps the indicative;
S08's mistake plate is the overcorrection (`Mi sa che non sia`) a learner makes the week after
meeting the mood. Rule 3 is the adverb half that carries no grammar at all, and rule 4 is
concessive `sarà` plus the fact that English and Italian raise the negation the same way.

Per the brief's note 4, the imperfect congiuntivo is not extended here — it is L4-M3's and every
`avessi` in this course stays there — `benché` and `sebbene` do not appear, and every disagreement
in the module is sincere.

**20 rows** against a cap of 25.

### The brief seams, checked against the emitted index

`npm run content:owner -- en-it avrei sarei avrebbe fossi "avrei dovuto" "avrei potuto" "avrei
voluto" "sarebbe stato" peccato "che peccato" "meno male" "meno male che" altrimenti invece "invece
di" dovevo potevo volevo voleva saputo avuto dire niente viaggio ombrello "l'ombrello" ascoltato
portato verità dovuto potuto voluto avessi sarebbe se magari`:

```
avrei free · sarei free · avrebbe free · fossi free
avrei dovuto free · avrei potuto free · avrei voluto free · sarebbe stato free
peccato free · che peccato free · meno male free · meno male che free
altrimenti free · invece free · invece di free · dovevo free · potevo free · volevo free
saputo free · avuto free · dire free · niente free · viaggio free · ombrello free
l'ombrello free · ascoltato free · portato free · verità free
voleva L3-M5 · dovuto L3-M10 · potuto L3-M10 · voluto L3-M10
avessi L3-M4 · sarebbe L3-M4 · se L3-M4 · magari L3-M3
```

M3's note 5 is confirmed in every particular: the two anchor forms really are L3-M4's, `magari`
really is L3-M3's, and `saputo` really is the one participle this module has to buy. Three
corrections and refinements come out of it anyway.

**`avrebbe` cannot have the row the brief implies.** Note 5 lists `avrei`, `avrebbe` and `sarei`
side by side as fresh keys. All three are free, but `avrebbe` is the third cell of the SAME paradigm
as `avrei`, so a row of its own would have been a `COLLIDES INSIDE THIS MODULE` finding the moment
one row's `forms` list carried the other's display. `avrei` therefore owns the whole set —
`avrei · avresti · avrebbe · avremmo · avreste · avrebbero` — in one row, and the module spends one
new word where the brief's list reads like two.

**`sarei`'s paradigm has a hole in it, and the hole is `sarebbe`.** `sarebbe` is L3-M4's, so
`sarei`'s `forms` list is `sarei · saresti · saremmo · sareste · sarebbero` with the third person
missing on purpose: listing it would re-teach a key this course settled two levels down. The row's
note says so in as many words, which is the only place a learner can be told.

**`voleva` is L3-M5's and `volevo` is not.** The spoken-shortcut row for `volere` therefore stops at
`volevo · volevi`. `dovevo · dovevi · doveva` and `potevo · potevi · poteva` are complete because
all six of those are free; `volere` is the one imperfetto in this module that cannot have its own
third person, and nothing in the brief warns of it.

`npm run content:owner -- en-it però "ti conviene" conviene "vale la pena" "è vero che" "in realtà"
comunque insomma anzi appunto soprattutto almeno "punto di vista" convincere ragione "hai ragione"
"d'accordo" "sono d'accordo" dura prenotare provare cambia dicevo difficile ma "secondo me" "anche
se" dovresti bisogna basta`:

```
però free · ti conviene free · conviene free · vale la pena free · è vero che free
in realtà free · comunque free · insomma free · anzi free · appunto free
soprattutto free · almeno free · punto di vista free · convincere free · hai ragione free
dura free · prenotare free · provare free · cambia free · dicevo free · difficile free
ragione L3-M3 · d'accordo L2-M6 · sono d'accordo L3-M3 · ma L1-M10 · secondo me L3-M3
anche se L3-M3 · dovresti L3-M4 · bisogna L3-M8 · basta L2-M5
```

Both of the seams M4's note 5 says its first instinct got wrong reproduce exactly. **`ragione` is
L3-M3's**, so `hai ragione` is indexed whole and the bare noun keeps L3-M3's note; and **`d'accordo`
is L2-M6's**, not L3-M3's, so S04's concessive `D'accordo, però …` re-uses the row that taught the
*agreed* of settling a time, while `sono d'accordo` stays a separate L3-M3 key. Its apostrophe is
inside the one token throughout, per the elision law.

**`in realtà` is bought by M4 and not by M5, though both briefs list it as fresh.** M4-S06 owns it;
M5's note 5 lists it too, and M5 uses it in pool item C12 without a row, resolving through M4. First
occurrence wins, and the two modules were authored in the same wave, so this is a decision rather
than an accident: recorded here so a later reader does not think M5 forgot it. The same reasoning
put `difficile` in M4-S08 and let M5-S09 write `Sembra difficile` for free.

`npm run content:owner -- en-it "non credo" dubito sembra "può darsi" sarà dipende "dipende da"
"non del tutto" "del tutto" piuttosto direi "non saprei" temo probabilmente chissà capisco "non è
detto" "non sono d'accordo" "mi sa che" "mi sa" vada credo penso sia abbia possa "mi sembra" forse
troppo idea venire te me`:

```
non credo free · dubito free · sembra free · può darsi free · sarà free
dipende free · dipende da free · non del tutto free · del tutto free · piuttosto free
direi free · non saprei free · temo free · probabilmente free · chissà free · capisco free
non è detto free · non sono d'accordo free · mi sa che free · mi sa free
vada L2-M4 · credo L3-M3 · penso L3-M3 · sia L3-M3 · abbia L3-M3 · possa L3-M3
mi sembra L3-M3 · forse L3-M3 · troppo free · idea free · venire free · te free · me free
```

**`vada` is L2-M4's, and this wave inherits the correction rather than repeating it.** M5's note 5
is right: it is the polite imperative of `Vada sempre dritto`, taught as directions two levels
before L3-M3's brief claimed it as fresh, and first occurrence wins. No row here touches it and no
display in the module writes it.

**`direi` really is free**, exactly as note 5 says against `docs/73`: `docs/73` listed it among
L3-M3's softeners, the shipped module never took it, and the index is the record. It is M5-S03's
third row.

**`non del tutto` cannot be the key the brief promises, because the brief's own pattern hides it.**
Note 5 says `non del tutto` indexes WHOLE, and the module's second pattern is
`Non sono del tutto d'accordo + , + ma + <clause>`. In that display the token sequence is
`non · sono · del · tutto · d'accordo` — `sono` sits between `non` and `del tutto`, so a
`non del tutto` key would never match the sentence it was bought for. The row is therefore keyed
**`del tutto`**, with `non del tutto` as a second form so the bare reply (`Sei d'accordo? Non del
tutto.`) still resolves; S02's second variation is that reply. One row, two keys, no collision.

**Two keys that would have raised `maxSpan` from 3 to 4, and were not bought.** `vale la pena di`
(M4-S05) and `non è detto che` (M5-S09) are both four tokens. Either as a `forms` entry would have
pushed the emitted `maxSpan` to 4 for the whole course, lengthening the resolver's walk on every
line of every module for one variant apiece. Both were dropped from `forms` and stated in the rows'
notes instead — `vale la pena` and `non è detto` are the keys, and the `di`/`che` versions are
described in English prose. A later author who needs a four-token key should raise `maxSpan`
deliberately and say so, not acquire it as a side effect of a `forms` list.

**The index is thinner at L4 than a brief-reader expects.** `troppo`, `idea`, `venire`, `dire`,
`niente`, `avuto`, `difficile`, `dura`, `provare`, `cambia` and `almeno` are all still free after
thirty-two modules. Every one of them was checked before use and every one is a row in this wave.
The other side of the same coin: `te` and `me` are free too — the bare disjunctive pronouns have
never been taught — which is why M3-S10 ends `sarei venuto anche io` and not `sarei venuto con te`,
and why M5-S04's third variation is `Dipende da quello che vuole lui` rather than `Dipende da te`.

### The ratchet

`tools/shown-surfaces.test.ts` holds at **en-it 17**, unchanged and not lowered, across all three
modules; the file passes **11/11**. `npm run content:shown -- en-it L4-M3 / L4-M4 / L4-M5` reports
**`L4-M3: clean — every shown surface resolves`**, **`L4-M4: clean — every shown surface
resolves`** and **`L4-M5: clean — every shown surface resolves`**: no `SHOWN-BUT-UNTAUGHT`, no
`COLLIDES INSIDE THIS MODULE`, and **no `RE-TEACH` at all** in any of the three.
`npm run content:validate` passes on every module in the tree, this wave's three included
(`CONTENT 300/300 ok` at the moment it was run; the count moves as the other eight courses' waves
land alongside this one).

Zero re-teaches was designed for and not lucky, and in this wave the design decision was about
PARADIGMS. Three of the rows here are auxiliary paradigms (`avrei`, `sarei`, `fossi`) and three more
are imperfetto paradigms (`dovevo`, `potevo`, `volevo`), which is exactly the shape that collides:
a `forms` list written from a conjugation table rather than from the index will sooner or later
list a cell an earlier module already owns, or a cell a sibling row of the same module opens. Each
of those six lists was written against `content:owner` output cell by cell, which is how `sarebbe`
came out of `sarei` and `voleva` came out of `volevo`. The multi-token blocks (`avrei dovuto`,
`avrei potuto`, `avrei voluto`, `sarebbe stato`, `che peccato`, `meno male che`, `è vero che`,
`ti conviene`, `vale la pena`, `punto di vista`, `non credo`, `può darsi`, `dipende da`,
`mi sa che`, `non è detto`, `non sono d'accordo`, `del tutto`) each open keys strictly longer than
anything an earlier module owns, so the resolver's longest-match-first walk reaches them first and
every owned single token keeps its own row.

### Open questions for the native pass

73. **`dovevo` as a full substitute for `avrei dovuto`** (M3, rule 4 and S09). `docs/90` question 54
    already asks whether `dovevo chiamare` is what is actually said. This wave went further and
    shipped `Dovevo partire ieri, invece sono rimasto a casa` as a HERO display with the imperfetto,
    not as a variation. Confirm that is natural as a stand-alone regret and not only as an answer to
    a question already asked.
74. **`Magari avessi ascoltato mia madre`** (M3-S04). Confirm the bare `magari` + congiuntivo
    trapassato is the ordinary spoken wish, and that a speaker would not more often reach for
    `Avessi ascoltato…` with no `magari`, or for `Se solo avessi ascoltato…`.
75. **`meno male che` with a plain `ho` clause** (M3-S05). Confirm `Meno male che ho portato
    l'ombrello` is the everyday shape, and that the alternative with the congiuntivo
    (`Meno male che abbia…`) is genuinely not heard rather than merely careful.
76. **`Che peccato` versus bare `Peccato`** (M3-S08 and its first variation). Both ship, and the
    variation's `changed` line treats them as interchangeable. Confirm they really are, or say which
    is the default reaction to a cancelled plan.
77. **`anche io` against `anch'io`** (M3-S10). The module writes `anche io` because the elided
    `anch'io` would need its own key and the module could not spare a row for it. Confirm `anche io`
    is written and said without sounding stilted, and whether `anch'io` should be bought at L5.
78. **The final `però`** (M4-S02, first variation). `Hai ragione, non ho tempo adesso però` is the
    module's showpiece. Confirm the sentence-final `però` is current in ordinary speech across
    registers, and not marked as regional or as particularly Northern.
79. **`ti conviene` said to a stranger** (M4-S03 and S10). The register chip is `neutral`. Confirm
    `Ti conviene prenotare adesso` is not felt as presumptuous from somebody you have just met, and
    whether `Le conviene` — which this module deliberately does not teach, per the `Lei` policy — is
    what a shop assistant would actually say.
80. **`anzi` after a negated clause** (M4-S06, rule prose and the mistake plate). The module says
    `anzi` must push further in the same direction. Confirm `In realtà non è così caro, anzi
    conviene` reads as intended, and that `anzi` after a negative is not heard as a correction of
    the speaker's own previous words.
81. **`Insomma` at the head of a clause against bare `Insomma`** (M4-S08). The note says tone alone
    separates the summary use from the shrugging *so-so*. Confirm that is true in practice and that
    the fronted summary use is not now the minority reading.
82. **`Appunto` as a rebuttal** (M4-S09). The trap says it can sound sharp. Confirm the degree: is
    `Appunto, è quello che dicevo prima` a normal conversational move or is it already pointed
    enough that a learner should be warned harder than the module warns them.
83. **`Sarà` alone before `però`** (M5-S03). `docs/90` question 57 asks whether the concessive
    `sarà` is current. This wave shipped it as a HERO display and as pool item C03, so the answer
    now decides a display and not a note. Confirm, and say whether it needs a following `sì` or a
    particular intonation to read as a concession rather than as a real future.
84. **`Mi sa che` with the indicative, taught as the exception** (M5-S08, rule 2). The module's
    mistake plate marks `Mi sa che non sia` as WRONG. Confirm the congiuntivo after `mi sa che` is
    genuinely not said by educated speakers, rather than being a live variant that a plate should
    not condemn.
85. **How far the un-drop rule actually goes** (M5, rule 1, S06 and S07). The module says the
    pronoun comes back whenever the subject is not obvious. Confirm the boundary: is
    `Dubito che possa venire domani` — S06's third variation — really only acceptable when the
    person was named in the previous turn, or is a bare third person the default reading?
86. **`Temo di no` as an everyday refusal** (M5-S10). Confirm it carries no more weight than English
    *I'm afraid not*, and is not reserved for genuinely bad news.
