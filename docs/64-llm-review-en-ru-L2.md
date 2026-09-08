# en-ru L2 — LLM review

The review that clears each en-ru L2 wave to ship, written in the same change that authors it
(`CLAUDE.md`, "Ship `verified: true` in the authoring change"). The **native-speaker gate is a
separate, stricter bar and stays unmet**: every section below ends in open questions for a native
pass, and no later wave may close one of them by rewriting a shipped module.

Open questions are numbered as a fresh en-ru L2 chain from 1. The L1 reviews number their own
findings per document and are not continued here.

## Wave 1 — L2-M1, L2-M2 (#438)

Authored against the briefs written by #429 and the decisions recorded in `docs/56`. Reviewed
against the real cumulative index: 228 surfaces through L1-M10, 246 through L2-M1, 312 through
L2-M2, `maxSpan` 3.

### L2-M1 "Asking politely"

The module's grammar is the **aspect of an imperative**, which L1 shipped in pairs
(`chitát'`/`prochitál`, `kuplyú`/`kupíl`) without ever teaching the choice. `Skazhíte` asks for one
act; `Govoríte` says carry on, do it this way. They are authored on separate rows, each note naming
the other, because the L1 aspect-partner policy forbids one row carrying both — and here that
policy is doing real work: a single row would put the module's own lesson out of reach.

The half an English speaker cannot guess is the host's imperfective (`Prokhodíte`, `Sadítes'`),
which M5 will spend at a table and which this module names in rule 0 without opening either verb.

Two other things arrive:

- **The subjectless sentence.** `Mne núzhno rabótat'`, `Mózhno vódu?` — literally "to me
  necessary", "permitted water". L1-M9's `Mne nrávitsya` was already this shape and never said so.
  Rule 1 names it once and points forward to M3's `Zdes' net magazína` and M8's
  `Mne nuzhná pómoshch'`, so the learner meets the pattern rather than three unrelated idioms.
- **The polite negative question.** `Vy ne mózhete mne pomóch'?` is *softer* than the same question
  without `ne`, which is the reverse of what an English ear does with a negative question. Rule 2
  states it flatly, because nothing about the words explains it.

The register decision is honoured as `docs/56` records it: `vy` is the course default and `ty`
appears in no display until M6, so the `formal` chip marks only the elaborated request —
`Bud'te dobrý`, `Vy ne mózhete…?` — and plain `vy` to a stranger stays `neutral`.

`izviníte` and `prostíte` are given as **near-synonyms**, not as a clean split. The trap on S09 says
so explicitly, because a rule assigning one to apologies and the other to getting attention is
contradicted within a day of hearing Russian.

### L2-M2 "Describing people"

The long adjective arrives with all four nominative cells in one row's `forms`
(`vysókiy · vysókaya · vysókoye · vysókiye`) — one paradigm, one home, so M3 can add case shapes to
the same rows rather than opening new ones. Rule 0 states the split L1 left implicit: `ustál` and
`ustála` were **short-form** adjectives all along, the short form is not a shortening of the long
one, and only a handful of adjectives use it in ordinary speech.

`yevó` and `yeyó` each carry two jobs — "his"/"him", "her"/"her" — on one row apiece, with the note
true of both. `u nevó` and `u neyó` are their own keys (see the correction below), which is where
the n-after-a-preposition rule lands.

`mat'` and `doch'` are taught as words rather than as examples: they are the only two feminine
nouns of their shape in the course, and their `-er-` stem appears in every form but the
nominative. They are introduced two sentences apart so the pair is visible.

### One seam correction, made against the real index

**`u nevó` and `u neyó` must ride as whole two-token surfaces, not as a preposition plus a
pronoun.** The first draft opened bare `nevó` and `neyó` rows, and the build rejected it: `u` alone
is not taught anywhere in the course, because L1-M8 authored `u menyá` and `u vas` as whole
surfaces. Making the L2 pair match L1's shape is both the fix and the more honest teaching — the
frame is what a learner says, and there is no separate `u` to learn.

### A stress mark the brief omits

The M1 seam writes `bud'te`. The level's romanization rule (L1 decision, carried unchanged) puts an
acute on every polysyllable and none on a monosyllable, and `búd'te` is two syllables stressed on
the first — so the module ships **`búd'te`**, and the index key differs from the seam by one
codepoint. The rule wins over the seam here for the same reason `dáyte`, `zdrávstvuyte` and
`izviníte` all carry their marks: an unmarked romanization teaches an English reader to say the
word wrong, which is exactly what #355 decided the marks are for.

### The ratchet

Clean on both modules at first build once the `u nevó` correction was made. The en-ru baseline
stays at 20.

### Open questions for the native pass

1. **The aspect pair `skazhíte` / `govoríte`** (M1-S01). Confirm that `Skazhíte, pozháluysta` is the
   ordinary street request and that `Govoríte` in that seat would be heard as odd rather than merely
   emphatic.
2. **The polite negative** (M1-S03). Confirm `Vy ne mózhete mne pomóch'?` is genuinely softer than
   the affirmative and is not now dated or over-careful.
3. **`Mózhno vódu?`** (M1-S05). Confirm the verbless request is unremarkable in a café and reads as
   polite rather than clipped.
4. **`Bud'te dobrý`** (M1-S06). Confirm it is current spoken Russian rather than a written or
   older-generation formula, and that `Bud'te lyubézny` is not the commoner one.
5. **`Ne za chto`** (M1-S08). Confirm it is warmer than `pozháluysta` as an answer to thanks, as the
   usage line claims.
6. **`Búd'te dobrý` and its two stresses** (M1-S06). The module claims `dóbryy` (long form) and
   `dobrý` (short form) differ only in where the stress sits. Confirm, and confirm `búd'te` is
   stressed on the first syllable.
7. **`molodáya` of a grown sister** (M2-S02). Confirm it reads as "young" rather than "younger" and
   carries no implication about age order.
8. **`stáryy` of a parent** (M2-S10). The note calls it blunter than English "old". Confirm the
   strength of that and whether `pozhilóy` would be the ordinary courtesy.
9. **`úmnyy`** (M2-S09). Given as warm, closer to "bright" than to "clever". Confirm.
10. **`drug` / `podrúga`** (M2-S08). Confirm `drug` really is usable of a woman in the way the note
    claims, and that `podrúga` carries no romantic reading in the frame shown.

## Wave 2 — L2-M3, L2-M4, L2-M5 (#447)

Three rungs against the briefs of #429. Reviewed against the real cumulative index: 312 surfaces
through L2-M2, 401 through L2-M5, `maxSpan` 3.

### The case load, and how the three modules split it

M3 is where Russian's central difficulty becomes visible, and the module's framing is that it is
**bookkeeping rather than a new idea**: an adjective agrees in gender, number and case, and the
whole paradigm sits in one row's `forms` so it is met as one thing. The genitive arrives doing
three jobs at once — absence (`Zdes' net magazína`), amount (`mnógo khléba`) and "of"
(`stakán vodý`) — and rule 2 pays a debt L1 left open: `pyat' rubléy` and `pyat' chasóv` were
genitive plurals all along, said for two levels without a reason. A rule that retroactively
explains something already learnt is worth three that only add.

M4 gives the case its fourth job (`do` plus the genitive) and adds the one contrast that does all
the work: `v` and `na` take the accusative for motion and the prepositional for location. Half of
that costs nothing, because an inanimate masculine's accusative is its nominative — which is why
every accusative sentence in M3 and M4 is built on a feminine noun, where the ending actually
moves.

M5 spends M1's aspect decision. A host is always imperfective — `Sadítes'`, `Prokhodíte`,
`Ugoshcháytes'`, `Beríte` — and M4's `povernite` sits two modules earlier as the perfective
counter-example, so the level shows the same speaker choosing both. That is the clearest evidence
the course can give that aspect is about how an action is PRESENTED: sitting down takes the same
three seconds either way.

### Additions-only, and the rows it costs

L2 never edits an L1 file, so every new shape of an L1 noun is a row of its own pointing back:
`magazína`, `vodý`, `cháya`, `sákhara`, `khléba` (M3) and `rabótu` (M4). That is the law working as
written rather than a workaround — the learner who taps `vodý` reaches a note about the genitive,
and L1-M3's `vodá` row is untouched.

### Corrections made against the real index

- **`bol'shóy` was accidentally pre-empted by M1.** The wave-1 file put the whole `bol'shóye`
  paradigm in the `forms` of the row inside `bol'shóye spasíbo`, which would have taken the key M3's
  seam assigns to the adjective lesson. M1's row is trimmed to the single neuter cell it actually
  teaches, with a note saying so, and M3 opens the paradigm.
- **`síniy`, not `sínij`.** The seam spells it with a `j`; every other adjective in the course ends
  `-iy` (`rússkiy`, `khoróshiy`, `vysókiy`). The scheme wins, and the file ships `síniy`.
- **`do` needed a row.** The M4 seam lists it as a fresh key and the brief's own note treats it as
  pointing back at M3's case; the build rejected the module until the preposition had a row of its
  own, which is right — `do` is a word, not a case.
- **`Éhto`, not `Éto`.** Three displays in M4's first draft dropped the `h`. The romanization
  scheme writes `éhto`, and `éto` is a different index key — the ratchet caught all three.

### Four rows the briefs do not list

`metró` (M4), `rabótu` (M4), `nam` and `peredáyte` (M5). `metró` is named in the M4 brief's prose as
the first indeclinable noun the course shows but is missing from its seam; the other three surfaced
through the ratchet, and each earned its row rather than a rewritten variation — `nam` orders for a
table, `peredáyte` is what is actually said for the salt, and `rabótu` shows the feminine accusative
the module's own rule promises.

### The ratchet

Four findings across the wave (`do`, `éto`, `nam`, `peredáyte`), each fixed in content. The en-ru
baseline stays at 20.

### Open questions for the native pass

11. **`Zdes' net magazína`** (M3-S07). Confirm it is the ordinary way to say a shop is absent, and
    that a native would not more often say `Magazína zdes' net`.
12. **The colour set** (M3). Six colours, four with a yó. Confirm `síniy` and `golubóy` really do
    not cover each other in the frames shown, and that `síniy` is right for a dark blue book.
13. **`dorogóy` of a ticket** (M3-S05). Confirm it is the everyday verdict rather than `dórogo`, the
    flat word.
14. **`kak doytí do…`** (M4-S01). Confirm this is the commoner street question rather than
    `kak proytí k…`, and that the prefixed verb does not sound bookish.
15. **`na avtóbuse` over `avtóbusom`** (M4-S05). The course's decision. Confirm `na avtóbuse` is at
    least as common in speech, so the choice costs the learner nothing.
16. **`ostanóvka avtóbusa`** (M4-S04). Confirm the genitive is what is said rather than
    `avtóbusnaya ostanóvka`.
17. **`Kudá vy idyóte?`** (M4-S06). The usage line calls it friendly rather than nosy. Confirm for a
    neighbour or a colleague.
18. **`Sadítes'` vs `Prisázhivaytes'`** (M5-S01). Confirm `Sadítes'` carries no hint of the
    superstition some speakers attach to it, and is the safe default.
19. **`Mne, pozháluysta, sup`** (M5-S03). Confirm the verbless order is normal at a counter and
    reads as polite rather than curt.
20. **`ya uzhé syt`** (M5-S05). Confirm it is the ordinary refusal and carries no complaint, and
    that the ritual repeat of an offer described in rule 3 still holds today.

## Wave 3 — L2-M6 through L2-M10 (#456)

Five rungs, and the level closes. A strict build emits `en-ru: 20 modules`.

### What each module spends its budget on

- **M6 Making plans together.** `ty` enters, and the level held it back on purpose: guessing wrong
  with a stranger is rude, guessing wrong with a friend is merely stiff, so L1 taught `vy` and
  showed `ty` in no display at all. The usage half is the thing English has nothing like — the move
  from `vy` to `ty` is **negotiated out loud** (`Davay na ty`) rather than drifted into. Rule 4
  states a distinction this module is the first to need both halves of: `skazhí`/`skazhíte` are one
  word in two addresses and share a row; `skazhíte`/`govoríte` are aspect partners and never do.
- **M7 On the phone.** The genitive of absence turned on a person (`Yevó net dóma`) — M3's
  construction for the third time, and the module says so rather than presenting it as a new idiom.
  Register here is a rule about **not knowing**, not about politeness: `vy` throughout, because you
  do not know who has picked up, so M6's `ty` is deliberately absent.
- **M8 When something goes wrong.** `Mne núzhen bilét` is the level's best rule, because English
  hides it completely: the thing needed is the SUBJECT and `núzhen` agrees with it. With
  `U menyá bolít golová` and L1-M8's `u menyá yest'` that makes three constructions on one habit —
  the person is never the subject of their own need, their own having, or their own pain. The
  complaint delta runs the **opposite way from English**: Russian complains directly, and the hedged
  English complaint reads as evasive.
- **M9 Comparing and choosing.** "Than" is the genitive — M3's case for the fifth time — with `chem`
  named as the alternative and as the requirement when the compared halves are not both bare nouns.
  `deshyóvyy` → `deshévle` loses its yó, which is not an exception to the yó rule but the rule
  itself: a yó is always stressed, so when the stress leaves, the yó leaves with it.
- **M10 Telling what happened.** Aspect at length, and the slogan killed: `Ya dva chasá chitál` is
  bounded and imperfective, `Ya prochitál za dva chasá` is perfective, and the reading took the same
  two hours. The diagnostic the learner already owns is that **the perfective has no present** —
  which is why L1-M6's `napishú` and `pozvonyú` are futures.

### Rows the briefs do not list, and one they mis-scope

- **`my`.** The pronoun "we" was never opened: L1 built `we are` and `we will` from other words, and
  an account cannot be told without it. Opened in M10-S05.
- **`vo skól'ko` rides whole.** The M6 seam lists `vo` as the fresh key, but bare `skól'ko` is not
  taught anywhere — L1-M8 authored `skól'ko stóit` and `skól'ko stóyat` as whole surfaces. Matching
  L1's shape is both the fix and the better teaching, exactly as with wave 1's `u nevó`.
- **`kakóy` belongs to M9, so M7 gave it up.** The M7 draft asked `Kakóy vash nómer telefóna?`,
  which would have taken M9's key three modules early. The sentence is now
  `Skazhíte vash nómer telefóna, pozháluysta`, which uses M1's imperative and teaches the same
  genitive.
- Smaller additions the modules could not do without: `Ánnu` (M7 — the accusative of a name, with
  `Ivána` beside it), `nómer`, `stárshe` (M9), `lift`, `vrach`, `súmka`, `délat'` (M8), and
  `do závtra` as a whole farewell (M6).

### The ratchet

Nine findings across the wave, every one fixed in content: `skól'ko`, `ánnu`, `kakóy`, `ivána`,
`vashevó`, `brata`, `nepravil'nyy`, `dlya`/`ánny`, `sumku`, `film`, `stárshe`, `my`, `rabótal`,
`ona`, `slýshal`. Two of those were plain spelling slips the scheme itself catches —
`brata` for `bráta` and `ona` for `oná` — which is the acute doing the job #355 gave it: an
unmarked vowel is a different index key, not a typo. The en-ru baseline stays at 20.

### Open questions for the native pass

21. **`Davay na ty`** (M6, rule 1). Confirm the negotiation is still explicit in current usage and
    across generations, and that a younger speaker does not simply start.
22. **`Davay poydyóm v kinó`** (M6-S01). Confirm the plural future after `davay` is the ordinary
    form rather than `davay v kinó` on its own.
23. **`Vo skól'ko?`** (M6-S05). Confirm it beats `V kakóye vrémya?` in speech.
24. **`Alló` vs `Da` vs `Slúshayu`** (M7-S01). Confirm `alló` is the neutral default and `slúshayu`
    reads as an office rather than as old-fashioned.
25. **`Chto peredát'?`** (M7-S04). Confirm the bare infinitive question is what is actually said,
    and that it does not sound clipped.
26. **The claim that `vy` holds on the phone** (M7, rule 3). Confirm a caller uses `vy` even with a
    friend's household until they know who answered.
27. **`Mne núzhen vrach`** (M8-S09). Confirm `vrach` rather than `dóktor` in an emergency, and that
    the note's split between the two is right.
28. **The direct complaint** (M8, rule 3). The module claims a hedged complaint reads as evasive in
    Russian. Confirm the strength of that, and whether `k sozhaléniyu` is the one hedge that does
    land.
29. **`výshe menyá` over `výshe, chem ya`** (M9-S04). Confirm the genitive is the spoken default.
30. **`predpochitáyu`** (M9-S08). Confirm it is not too bookish for a café, and that
    `Chay lúchshe` is what people mostly say instead.
31. **`On skazál, chto vsyó khoroshó`** (M10-S06). The module claims Russian does not shift the
    tense back. Confirm, and confirm this much reported speech is safe without the L3 system.
32. **The accounts** (M10, all ten). Confirm each reads as something a person would say, and flag
    any that reads as a grammar exercise.
