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
