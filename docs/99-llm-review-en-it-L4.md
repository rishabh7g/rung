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

## Wave 3 — L4-M6 through L4-M10 (#559)

The five RANGE modules that close the level, authored against the briefs in `tools/course-briefs.ts`
and reviewed against the REAL cumulative index rather than against the briefs' account of it. At the
moment this wave opened, `npm run content:owner -- en-it …` reported **1162 surfaces owned, folded
over 35 modules through L4-M5**, at **`maxSpan` 3** — not the 1030 / 32 the wave 2 section above
pins, and not the "through L3-M10" every L4 brief's INDEX SEAM still says. By the time L4-M10 was
written the same command printed **1323 surfaces owned, folded over 39 modules through L4-M9**. A
later wave should quote whatever it prints on the day and never a brief's number; that is the single
lesson this section repeats loudest. `maxSpan` does not move: the longest key any of these five
modules opens is three tokens (`ogni volta che`, `in caso di`, `a quel punto`, `andata e ritorno`,
`ci siamo fermati`, `mi sono perso`).

### L4-M6 "Before and after" — the time clause with no second verb in it

The ten displays:

1. `Prima di uscire, spegni la luce`
2. `Dopo aver mangiato, siamo andati a casa`
3. `Ho già finito il lavoro, posso venire`
4. `Non ho ancora deciso, ti dico domani`
5. `Aspetta qui finché non arrivo`
6. `Da quando sono qui, dormo molto poco`
7. `Durante la settimana non esco mai`
8. `Ogni volta che piove, resto a casa`
9. `Resto in ufficio fino a mezzogiorno`
10. `Hai già mangiato? No, non ancora`

What it teaches. Rule 0 is the spine the brief asks for: when both halves share a subject Italian
writes no second finite verb at all, only a preposition and an infinitive, and it points back at
L3-M3's `penso di` so the trick is recognised rather than met. Rule 1 is the gerund interference in
one line — after `prima di` and `dopo aver`, the dictionary form. Rule 2 is the one-to-one mapping
the brief calls one of the cleanest in the level: `già` and `ancora` sit between the auxiliary and
the participle exactly where *already* and *not yet* sit. Rule 3 gathers the three untils — `finché`
takes a clause, `fino a` and `durante` take nouns — and states the expletive `non`, which is the
module's memorable fact. Rule 4 splits *since* into the temporal `da quando` (L3-M7's row, re-used)
and L4-M2's causal half, and names `prima che` plus the congiuntivo and the trapassato as the two
things deliberately not shown.

**16 rows** against a cap of 25, `minWordsPerSentence` 5, `maxWordsPerSentence` 13.

### L4-M7 "Official talk" — the register of a queue

The ten displays:

1. `Si prega di non fumare in sala d'attesa`
2. `Attenzione, il treno è in ritardo di venti minuti`
3. `È vietato fumare in tutta la stazione`
4. `Si rivolga allo sportello numero due`
5. `In caso di emergenza, si rivolga al personale`
6. `Compili la richiesta e firmi qui`
7. `Ho un appuntamento, ma non ho la prenotazione`
8. `Si informa che oggi lo sportello è chiuso`
9. `C'è una coda lunga, ma lo sportello è aperto`
10. `Si accomodi, prego, è il suo turno`

What it teaches. Rule 0 states the impersonal-formal cluster as ONE system — `si prega di` plus an
infinitive, `è vietato` plus an infinitive, `si informa che` plus a clause, and L4-M1's polite
imperative standing where it comes from — and names the step over L3-M8 exactly as the brief does:
that module said what one DOES, this one says what one is ASKED to do. Rule 1 says out loud that
this is a reception module before it is a production one. Rule 2 is `si prega di` against *please*,
with the `di`/no-`di` split against `è vietato` carried into S03's mistake plate. Rule 3 carries the
`prego` job L1-M10's row cannot, because first occurrence wins and a learner tapping `prego` is shown
L1-M10's note — so the next-please job had to live in a rule, which is what the brief predicted.
Rule 4 lists what is pointed at and not opened: the congiuntivo behind `si rivolga` and
`si accomodi` (L4-M5's, two modules back), the `venire` passive, and everything ceremonial.

`Lei` appears in no display, per the course policy; the polite forms are all verb forms.

**22 rows** against a cap of 25, `maxWordsPerSentence` 14.

### L4-M8 "Back then" — the endings, named at last, with holes in them

The ten displays:

1. `Da bambino giocavo sempre in strada`
2. `Una volta abitavo in un paese, adesso invece in città`
3. `A quei tempi non c'era il telefono in casa`
4. `D'estate andavamo sempre al mare`
5. `Prima fumavo, adesso non più`
6. `Quando ero piccolo dormivo con mia sorella`
7. `Eravamo giovani e non avevamo paura di niente`
8. `I bambini giocavano in strada fino a sera`
9. `A scuola facevo tardi e prendevo il tram`
10. `Erano altri tempi, adesso è tutto diverso`

What it teaches. Rule 0 names the paradigm L2-M10 spent and never explained: drop the `-re`, add
`-vo / -vi / -va / -vamo / -vate / -vano`, one set across all three classes, with `essere` the only
irregular. Rule 1 is the module's whole difficulty in the brief's own terms — English can use its
plain past for a habit, so the learner gets NO signal from their own sentence and will produce
`sono andato` where `andavo` is required. Rule 2 is the pair of smaller interferences: there is no
verb behind *used to*, and `non ... più` wraps the verb instead of trailing it. Rule 3 is the
then-against-now frame that makes the tense mean anything, and notes that every habit adverb is
already paid for (L3-M1, L1-M4). Rule 4 defers the trapassato and names the `passato remoto`
honestly as the written past and the spoken past of the south.

The paradigm rows are where the wave did its most careful work — see "The paradigm holes" below.

**21 rows** against a cap of 25, `maxWordsPerSentence` 13.

### L4-M9 "Places and journeys" — essere at length, and a verb that agrees with the clock

The ten displays:

1. `Siamo partiti presto e siamo arrivati a mezzogiorno`
2. `Ci vogliono due ore per arrivare al lago`
3. `Ci vuole un'ora per arrivare in aereo`
4. `Gira a destra al semaforo, poi attraversa il ponte`
5. `Ci siamo fermati in campagna, vicino a un lago`
6. `Mi sono perso, ma ho trovato la strada`
7. `Un biglietto di andata e ritorno, per favore`
8. `Scendi qui, l'albergo è vicino al mare`
9. `Ho fatto la valigia, partiamo verso mezzogiorno`
10. `Che bella gita, siamo saliti in montagna a piedi`

What it teaches. Rule 0 is L2-M10's auxiliary law getting the workout it was written for: `partire`,
`arrivare`, `salire`, `scendere` and reflexive `fermarsi` on `essere`, participles agreeing with the
subject, shown across six of the ten displays and in three of the mistake plates. Rule 1 is
`partire da` against `partire per`. Rule 2 is the duration frame, which is the module's sharpest
fact and its own rule because `docs/90` question 60 already pins it there: the subject is the HOURS,
so `ci vuole un'ora` and `ci vogliono due ore`, and `ci vuole due ore` is the English dummy subject
translated. Rule 3 is the register move the brief describes — L2-M4 bought every direction word for
a stranger asking a stranger, and inside a story told to a friend only the ending changes. Rule 4
defers `andarci` and the clitic attachments, leaves `ne` unowned on purpose, and defers the
`passato remoto` of travel writing.

**21 rows** against a cap of 25, `maxWordsPerSentence` 14.

### L4-M10 "A story with a twist" — the exit item, and a voice inside it

The ten displays, each a six-sentence account:

1. `Ieri ero in ufficio. Non c'era nessuno. Improvvisamente è arrivato un collega. Mi ha detto: Non posso venire domani. A quel punto ho capito tutto. Per fortuna ho finito presto.`
2. `Stamattina pioveva molto. Aspettavo l'autobus da venti minuti. Appena è arrivato, era pieno. Un signore mi ha detto: Non c'è posto. Ha aggiunto: Arriva un altro subito. Alla fine sono andato a piedi.`
3. `Ieri sera ero a casa da solo. C'era un silenzio strano. All'improvviso ho sentito un rumore. Ho avuto paura. Poi mia sorella mi ha detto: Sono io. Per fortuna non era niente.`
4. `Ieri ho visto un amico in stazione. Era in ritardo, come sempre. Mi ha detto: Domani non vengo. Poi ha detto che non poteva venire. A quel punto ho capito la storia. Alla fine non è venuto.`
5. `Domenica c'era una festa a casa di un amico. All'inizio c'era poca gente. Poi è arrivata mia sorella. Mi ha detto: Ho una sorpresa. A quel punto è arrivata anche mia madre. Alla fine è stata una bella festa.`
6. `Ieri ho raccontato una storia a mia sorella. All'inizio non ha detto niente. Poi mi ha risposto: Non è vero. Ha aggiunto: Sei strano. E allora ho capito. Alla fine ha capito anche lei.`
7. `Stamattina ho perso il treno. Ero in ritardo di dieci minuti. In stazione ho visto un collega. Mi ha detto: Anche io ho perso il treno. E allora ho aspettato il treno dopo. Per fortuna ho aspettato solo un momento.`
8. `Ieri in ufficio c'era un silenzio strano. Aspettavo una risposta da molto tempo. All'improvviso è arrivato il collega. Mi ha detto: È andato tutto bene. E allora ho capito. Alla fine sono andato a casa contento.`
9. `Quando ero piccolo mia madre mi raccontava una storia. Era sempre la storia di un cane. A quel punto io dormivo già. Una sera ho chiesto: E poi? Mi ha risposto: Domani. Per fortuna la storia era sempre bella.`
10. `Sabato sono andato al mare con un amico. Faceva caldo e c'era poca gente. All'improvviso ha fatto freddo. Un amico mi ha detto: Ho freddo. E allora siamo andati al bar insieme. Alla fine è stata una bella gita.`

What it teaches. Rule 0 is the direct/reported pair, and S04 exists to hold both halves of it inside
ONE account — `Mi ha detto: Domani non vengo` against `Poi ha detto che non poteva venire`, the same
refusal in two tenses, with the mistake plate showing the half-backshift (`che non vengo`) a learner
actually produces. Rule 1 is the punctuation: a colon and then a capital, with the note that the
marks vary in print and the colon does not. Rule 2 is L3-M10's imperfetto/passato test, restated
because English gives no pressure to alternate; six of the ten items open on a `c'era` or an
`ero`/`aspettavo` scene and then step. Rule 3 is the said-chain, and it is carried by content rather
than by prose: item 6 runs `ha detto` → `ha risposto` → `ha aggiunto` across three lines and its
mistake plate is the same item with `ha detto` twice. Rule 4 defers the `passato remoto`, free
indirect speech and a second character's inner thought.

Per the brief's note 1 the module was written to spend around twenty rows and not the level's 25.
It spends **21**, and the twenty-first was not planned: `aspettato` was caught by
`content:shown` (see "The surface no brief listed" below).

**21 rows**, `maxWordsPerSentence` 12 applied per sentence INSIDE each account, as at L3-M10.

### The brief seams, checked against the emitted index

Every claim below was checked with `npm run content:owner -- en-it …` before a row was written, and
the block quoted under each is what the tool actually printed. Where a brief and the index disagree,
the index wins.

**1. `in ritardo` is L4-M2's, not free (M7).** The M7 brief lists it in "Fresh, confirmed free". It
is not, and has not been since wave 1 shipped it:

```
in ritardo	L4-M2
ritardo	free
uscita	L2-M10
```

So M7 buys the bare noun `ritardo` and re-uses L4-M2's phrase. The module's own pattern
`<N> è in ritardo di <numero> minuti` needed no purchase at all beyond that, because `minuti` turned
out to be L4-M1's (`minuti	L4-M1`) — another wave-1 surface no L4 brief mentions.

**2. `invece`, `cambiare` and `cambiato` are not free (M8).** The M8 brief lists all three under
"Fresh, confirmed free". Wave 2 spent every one of them:

```
invece	L4-M3
cambiare	L4-M4
cambiato	L4-M4
```

M8 therefore drops all three. `adesso invece` and `non più` still work, because both index WHOLE and
their two-token keys beat `invece` (L4-M3), `più` (L2-M9) and `adesso` (L3-M6) on longest match.

**3. `viaggio` is L4-M3's, not free (M9).** The M9 brief lists it as fresh:

```
viaggio	L4-M3
```

It was spent by `Che peccato, sarebbe stato un bel viaggio` (M3-S08). M9 buys `gita` instead, which
is the better word for the module anyway — a `gita` is a trip you come back from the same day.

**4. `gira a destra` and `sempre dritto` are free keys that must not be bought (M9).** The brief
lists both as fresh, and both are genuinely unowned as multi-token keys. But:

```
gira	L4-M1
a destra	L2-M4
sempre	L2-M4
dritto	L2-M4
```

Every token of both phrases is already owned, so the phrases resolve as they stand. Buying either as
a whole key would win longest-match and SHADOW L4-M1's `gira` and L2-M4's rows wherever it appeared.
Neither was bought. This is the mirror of the `ci vuole` case the brief warns about — there, a whole
key was compulsory; here it would be a defect.

**5. The level double-books `ci vuole` and `ci vogliono` (M6 and M9).** Both briefs list them as
fresh keys; both were free. First occurrence wins and M6 comes first, so M6 would have taken them —
but the duration frame is M9's rule 2 and `docs/90` question 60 names it as "M9, rule 2". So M6
spends neither and M9 owns both, as two separate rows with two notes (singular against plural), which
is what the agreement rule needs. M6's brief loses two of its listed fresh keys and is none the
poorer: it had sixteen rows against a cap of 25.

**6. `ore` had to be bought and no brief lists it (M9).** M9's pattern is
`Ci vogliono + <numero> + ore` and its fresh list carries `un'ora` but not `ore`:

```
ore	free
ora	free
un'ora	free
```

All three went into one row (`ore`), with `un'ora` carrying its elision as its own key per the course
elision law. Without it, `Ci vogliono due ore` would have shown an untaught surface in the module's
own headline pattern.

**7. Two "index WHOLE" keys are split by the sentence that most wants them.** The M6 brief says
`non ancora` indexes whole and the M8 brief says the same of `non più`. Both are right about the key
and both are silent about the problem: the natural sentences are `Non ho ancora deciso` and
`Non fumo più`, where the two words are NOT adjacent and the whole key can never match. The fix in
each module is the same: buy the pieces that need buying (`ancora` in M6; `più` is already L2-M9's),
and give the whole key a display where it IS contiguous — M6-S10's `No, non ancora` and M8-S05's
`Prima fumavo, adesso non più`. Both are the ordinary bare answer, so nothing was invented to fit.

**8. The M10 brief's `alla fine` correction still holds, and its whole-key list is exactly right.**

```
alla fine	L2-M10
punto	L2-M6
allora	L1-M10
risposto	free
aggiunto	free
fortuna	free
```

`a quel punto`, `e allora`, `ha risposto`, `ha aggiunto` and `per fortuna` are all indexed whole, so
`punto` and `allora` keep their earlier owners and `risposto`, `aggiunto` and `fortuna` stay free for
a later level, exactly as the brief intends.

**9. `andata` and `lungo` are still what the M9 brief says they are.** Re-checked rather than
assumed, because the brief's other claims did not survive:

```
andata	L1-M5
lungo	L2-M2
```

So `andata e ritorno` is indexed whole (three tokens, `maxSpan` holds) and *along* gets no row; M9
uses `lunga` only as L2-M2's adjective (`una coda lunga` is M7's, `una fila lunga` its variation).

### The paradigm holes

The M8 brief's whole point is that the imperfetto is already half-owned, and every `forms` list in
that module was written cell by cell against `content:owner` rather than off a conjugation table.
What the tool printed:

```
ero	L2-M10   eri	L2-M10   era	L2-M10   eravamo	free   eravate	free   erano	free
avevo	L2-M10  avevi	free    aveva	L2-M10  avevamo	free   avevate	free   avevano	free
andavo	L2-M10  andavi	free   andava	L2-M10  andavamo	free  andavate	free  andavano	free
faceva	L2-M10  facevo	free   facevi	free   facevamo	free  facevate	free  facevano	free
```

So three of the four rows ship with holes in them, and the holes are not symmetrical:

* `eravamo` carries `eravate` and `erano` only — `ero`, `eri` and `era` are L2-M10's.
* `avevamo` carries `avevi`, `avevate` and `avevano` — `avevo` and `aveva` are L2-M10's, and the
  hole is in the MIDDLE of the paradigm rather than at its start.
* `andavamo` carries `andavi`, `andavate` and `andavano` — two holes, at `andavo` and `andava`.
* `facevo` carries everything EXCEPT `faceva`, which is L2-M10's — a single hole in the third person
  of an otherwise complete row.

`abitavo`, `giocavo`, `dormivo` and `prendevo` are complete, because L2-M10 bought no cell of any of
them. `fumavo` is complete except that `fumavate` was not listed, and `tornavo`/`voleva` (L3-M5) and
`aspettavo`/`stavo` (L3-M10) were checked and then simply not used. A complete-looking `essere` or
`avere` paradigm here would have been three unreachable rows and a `COLLIDES INSIDE THIS MODULE`
report; `content:owner` is the only reason it is not.

M9 has the same shape in smaller form: `arrivare` is a row here but `arrivati` is L3-M10's and
`arrivo`/`arriva`/`arrivano` are L4-M6's, so the M9 row carries the infinitive alone.

### The surface no brief listed

`aspettato` — the participle of L3-M5's `aspettare` — has never been bought by anything, and no
brief in the level mentions it. `content:shown` caught it four times in L4-M10-S07 and its pool item,
and it got its own row in the module that first shows it, with a note pointing back at L3-M5 and at
the fact that it takes `avere`. This is the level law working exactly as written, and it is the
argument against grepping: nothing in `aspettavo` (L3-M10) or `aspettare` (L3-M5) or `aspetta`
(L4-M1) tells you the participle is missing, and only asking the index does.

Two more surfaces were caught the same way before they reached a display: `abbiamo` and `insieme`
are both still free after thirty-nine modules, which is why no account in M10 uses a first-person
plural compound past, and why `insieme` had to be bought as a row before M10-S10 could say
`siamo andati al bar insieme`. `te` and `me` remain free, as the wave 2 section already noted, and
none of these five modules reaches for either.

### The ratchet

`tools/shown-surfaces.test.ts` holds at **en-it 17**, unchanged and not lowered, across all five
modules; the file passes **11/11**. `npm run content:shown -- en-it L4-M6 / L4-M7 / L4-M8 / L4-M9 /
L4-M10` reports **`L4-M6: clean — every shown surface resolves`** and the same line for each of the
other four: no `SHOWN-BUT-UNTAUGHT`, no `COLLIDES INSIDE THIS MODULE`, and **no `RE-TEACH` at all**
in any of the five. `npm run content:validate` passes on every module in the tree, this wave's five
included (`CONTENT 358/358 ok` at the moment it was run; the count moves as the other eight courses'
waves land alongside this one). `src/course/types.test.ts` passes both en-it assertions — the
language law and the apostrophe-surface walk — and its three failures are the module census and two
other courses' counts, none of them this wave's.

Zero re-teaches across five modules was designed for. Three shapes did the work. First, the paradigm
holes above: four rows that would each have collided if written from a table. Second, the whole-key
discipline the briefs ask for — `si prega di`, `è vietato`, `si informa`, `si rivolga`,
`si accomodi`, `in caso di`, `sala d'attesa`, `prima di`, `dopo aver`, `finché non`, `fino a`,
`ogni volta che`, `non ancora`, `una volta`, `a quei tempi`, `adesso invece`, `non più`, `d'estate`,
`ci vuole`, `ci vogliono`, `ci siamo fermati`, `mi sono perso`, `siamo partiti`, `siamo saliti`,
`andata e ritorno`, `a quel punto`, `e allora`, `per fortuna`, `all'improvviso`, `ha risposto`,
`ha aggiunto`, `ho raccontato` — every one of them opens a key strictly longer than anything an
earlier module owns, so the resolver's longest-match-first walk reaches them first and every owned
single token keeps its own row and its own note. Third, three deliberate new-shape rows under the
level law: `tutta` (the feminine of L3-M9's `tutto`, M7-S03), `raccontava` (the imperfetto of this
module's own `ho raccontato`, M10-S09) and `aspettato` (above), each with a note pointing back at the
row that first taught the lexeme, and none of them touching a file below L4.

### Open questions for the native pass

87. **`dopo aver` against `dopo` plus a bare participle** (M6-S02). The module ships `dopo aver
    mangiato` and its mistake plate marks `dopo mangiato` as a fragment. Confirm that is right in
    ordinary speech, and that the clipped `aver` — rather than the full `avere` — is what a speaker
    actually says out loud as well as what is written.
88. **`finché` without the expletive `non`** (M6-S05, rule 3, and the first variation). The module
    says both are said and that the `non` version is commoner. Confirm the proportion, and say
    whether dropping the `non` reads as careful, as regional, or as simply neutral.
89. **`durante` as against `mentre` with a noun** (M6-S07). The module gives `durante` a noun and
    `mentre` a clause with no overlap. Confirm there is no everyday case where `durante` fronts a
    verb, and that `durante la settimana` is the ordinary phrase for the working week rather than
    `in settimana`, which this module does not teach.
90. **`ogni volta che` with the `che` called compulsory** (M6-S08, mistake plate). Confirm speakers
    never drop it the way English drops *that*, and that the plate is not condemning a live
    colloquial shape.
91. **`si prega di` as the current sign register** (M7-S01). `docs/90` question 59 asks whether it is
    what is printed today. This wave shipped it as a HERO display and as pool item C01, so the answer
    now decides a display. Confirm, and say whether `Si prega di non fumare` has been displaced by
    `Vietato fumare` on new signage.
92. **The `di` split between `si prega di` and `è vietato`** (M7-S03, rule 2 and both mistake
    plates). The module teaches the pair as a memorisable asymmetry. Confirm `è vietato di fumare` is
    genuinely never written, including on older or regional signage.
93. **`richiesta` beside L3-M8's `modulo`** (M7-S06). The note says a counter uses both words for the
    same sheet. Confirm that, or say which one a clerk reaches for first, and whether `domanda`
    should have been the word this module bought instead.
94. **`si accomodi` as *next please*** (M7-S10). The module gives it four readings and lets the
    situation choose. Confirm the counter reading — being waved forward from the waiting chairs — is
    current, and whether `Prego, si accomodi` together is more usual than either alone.
95. **`a quei tempi` against `in quei tempi`** (M8-S03, mistake plate). The plate calls the `in`
    version something nobody says. Confirm the strength of that, and whether `a quei tempi` sounds
    older than the speaker using it.
96. **`d'estate` for every summer** (M8-S04). The module treats `d'estate` as habitual by itself and
    contrasts it with a single summer. Confirm that reading holds without `sempre` propping it up,
    and that `in estate` is not the commoner spoken form.
97. **`Erano altri tempi` as a closing line** (M8-S10). The module ships it as a hero display and
    calls it the sentence that ends an argument. Confirm it is idiomatic rather than a set phrase
    from print, and that `Erano tempi diversi` is not what a speaker would say instead.
98. **`ci vogliono` with a plural time, in the mouth rather than on paper** (M9-S02, rule 2).
    `docs/90` question 60 asks whether the written rule survives contact with speech. This wave
    shipped `Ci vuole due ore` as a MISTAKE plate, which is stronger than a note. Confirm educated
    speakers do not say it, rather than the plate condemning a live variant.
99. **`gita` against `giornata` and `viaggio`** (M9-S10). The module defines a `gita` as a trip you
    come back from the same day. Confirm the boundary, and whether `Che bella gita` is what an adult
    says about a Saturday or whether it now belongs mainly to school outings.
100. **`Domani non vengo` as a refusal** (M10-S04). The whole item turns on the quoted line being a
    refusal rather than a statement about the future. Confirm the bare present carries that, and that
    a speaker would not more naturally say `Domani non ci sono` or `Domani non ce la faccio`.
101. **The colon-and-capital convention in handwriting and messages** (M10, rule 1). The module
    teaches the colon as the invariant and the marks as variable. Confirm that holds in ordinary
    written Italian outside print — in a message or a note — and that a speaker transcribing dialogue
    would not simply use a dash there too.
102. **`ha aggiunto` as the third speech verb** (M10-S02 and S06, rule 3). The module says Italian
    varies the verb where English repeats *said*. Confirm `ha aggiunto` is the ordinary third choice
    in speech rather than a written-narrative word, and say what a speaker uses instead if it is not.
