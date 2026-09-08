# en-it L4 — the authoring-brief decisions (#524)

The ten en-it L4 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['en-it']` L4-M1…L4-M10) are the
first L4 briefed for this course. Every seam below was pinned against the REAL cumulative index —
the fold of `public/content/en-it/index/L1-M1.json` through `L3-M10.json`, read on 2026-09-08 with
`npm run content:owner`, which reported **958 surfaces owned, folded over 30 modules through
L3-M10**, at **maxSpan 3** — and against the review chain the level inherits, `docs/44` (spoken
Italian), `docs/65` (L2) and `docs/81` (L3).

The ten titles and jobs are levels.json's, ratified at #423, and are mirrored verbatim. This note
records the decisions the briefs are written to so the authoring waves inherit them without
re-deriving anything; the briefs repeat each decision in the module notes, because a prompt only
ever shows an author the notes.

## 1. Register and the elision law, unchanged

`Lei` never reaches a display, because it folds onto L1-M10's `lei` — `docs/57` §1's decision, kept
by `docs/73` and kept again here. L4 has two modules that live in the polite register (M1's
imperative and M7's counters and announcements) and both teach `Lei` in rules and notes only.

The elision law is unchanged and L4 adds three keys to it: `d'estate` (M8), `all'improvviso` (M10)
and `un'ora` (M9). Straight apostrophes only, one spelling per display, and each elided form is
**ONE key with the elision inside it**, answering for nothing else.

`maxSpan` stays **3**. Every whole-indexed phrase the briefs ask for is three tokens or fewer
(`si prega di`, `andata e ritorno`, `dopo aver`, `ogni volta che`, `a quel punto`), so the runtime
resolver's scan width does not move.

## 2. What L3 withheld, and how much of it L4 takes

`docs/73` §2 named what L3 left standing. L4 takes **three** of those things and names the rest:

- **The present congiuntivo as a SYSTEM → L4-M5.** L3-M3 opened four cells on one trigger and said
  in as many words that the mood as a system was L4's. M5 is where the debt is paid, because doubt
  is the mood's home and hedging is M5's whole job. The endings are named once; the triggers added
  are all doubt (`non credo che`, `dubito che`, `può darsi che`, `sembra che`); and the consequence
  a pro-drop course must state is stated — the first three persons are syncretic, so the PRONOUN
  comes back (`credo che tu abbia ragione`).
- **The imperfect congiuntivo and the compound conditional → L4-M3**, exactly where `docs/73` said
  the paradigm behind `avessi` would land. M3 pairs it with the condizionale passato, which is the
  only way the past counterfactual is a sentence rather than a form.
- **The imperfetto as a paradigm → L4-M8.** L2-M10 shipped the cells it needed and never named the
  endings. M8 names them, adds the missing persons, and gives the tense a decade instead of an
  episode.

Deliberately NOT taken, and named in the module that would reach for each: the **passato remoto**
(named in M8 and M10, deferred to L5), the **trapassato** (named in M6 and M8, still deferred as it
has been since L3), **clitic attachment** (`dimmi`, `andarci` — named in M1 and M9, deferred to L5)
and the **`venire` passive as a paradigm** (M7 shows `viene` inside fixed announcements only).

The ordering decision worth recording: **M4 persuades without the congiuntivo on purpose.** M4 sits
before M5, so it runs entirely on the infinitive (`ti conviene aspettare`, `bisogna` + infinitive,
which is L3-M8's) and the indicative. That is not a workaround — it is what Italian prefers when
there is no subject change, the same economy L3-M3 taught with `penso di` + infinitive — but it is
a choice, and it is why persuasion is not blocked behind a mood.

## 3. Seams where the index contradicted the first instinct

Five, and every one of them was found by asking `npm run content:owner` rather than by remembering.

- **`vada` is L2-M4's, not L3-M3's.** `content:owner -- en-it vada` → `vada	L2-M4`. It is the Lei
  imperative of `Vada sempre dritto`, shipped as directions two levels before the congiuntivo
  opened. L3-M3's brief listed `vada` among its fresh keys and the index says otherwise; first
  occurrence wins, so L4 inherits the correction and M5's note carries it. `prenda` and `giri` are
  L2-M4's for the same reason, and `scusi`/`senta` are L2-M1's, `firmi` L3-M8's — **five cells of
  the Lei imperative were already owned before L4-M1 opened the rule.**
- **The tu imperative collides through `forms`, not through displays.**
  `content:owner -- en-it vai prendi fai` → all three `L1-M6`, sitting inside L1-M6's `vado`,
  `prendo` and `faccio` rows. M1 therefore buys its rows on verbs the ladder has never touched
  (`gira`, `metti`, `apri`, `chiudi`, `aggiungi`, `aspetta`, `premi`, `guarda`) and states the
  crossing of endings as a rule.
- **`alla fine` is L2-M10's, not L3-M10's.** `content:owner -- en-it "alla fine"` → `alla fine
  L2-M10`, first shown at L2-M10-S06. L3-M10's own brief claimed it as a fresh key. M10 uses
  L2-M10's row and the decisions doc records the correction rather than repeating the claim.
- **`andata` is L1-M5's and `lungo` is L2-M2's.** `andata	L1-M5` is the participle of
  `sono andata`; `lungo	L2-M2` is the adjective *long* from describing people. So M9's ticket sense
  cannot own `andata` (`andata e ritorno` indexes WHOLE) and M9's preposition *along* gets no row at
  all — the rule carries the job.
- **`ragione` is L3-M3's and `d'accordo` is L2-M6's.** `ragione	L3-M3` sits inside
  `penso di avere ragione`; `d'accordo	L2-M6` is the *agreed* of settling a time, and
  `sono d'accordo	L3-M3` is a separate whole key. M4's `hai ragione` therefore indexes WHOLE and
  its `d'accordo, però` re-uses L2-M6's row.

Two smaller surprises ran the other way, and both are gifts. **`già` and `ancora` are FREE** after
thirty modules, so M6 gets the cleanest one-to-one mapping in the level for nothing. And **`però`
is free** while `ma` is L1-M10's, which lets M4 teach the position split (`ma` opens, `però` opens
or closes) as one fresh key against one owned one.

`ne` remains unowned. `content:owner -- en-it ne` → `free`; L3-M5 took `ne ho` as a whole key and
never spent the bare pronoun, and `docs/73` §2's prediction of `ne ho due` was not what shipped. L4
leaves it free on purpose — M9 names it and defers the partitive to L5 with the rest of clitic
attachment.

## 4. Seams — L4 never edits a file below it

- Sequencing (`prima` L2-M4, `poi` L1-M10, `infine` L3-M1) is re-used by M1 and never re-taught.
- `per` stays L3-M2's row (`Lavoro per una ditta italiana`); M1's purpose `per` + infinitive is a
  new JOB of an owned key and lives in a rule.
- `perché` and `quindi` stay L1-M9's; M2's front/back law is a rule, not a word note.
- `se` and `avessi` and `sarebbe` stay L3-M4's; M3 adds persons and a participle behind them.
- `si` stays L2-M4's; every `si` + verb surface in M7 indexes WHOLE, exactly as L3-M8's did.
- `ci` stays L2-M6's and `mi` stays L2-M5's; M6's `ci vuole`/`ci vogliono` and M9's
  `ci siamo fermati`/`mi sono perso` index WHOLE so neither bare clitic is spent.
- `da quando` and `da` stay L3-M7's durative rows; M6 re-uses them rather than opening a second
  temporal family.
- `più` stays L2-M9's and `adesso` L3-M6's, so M8's `non più` and `adesso invece` index WHOLE.
- `allora` stays L1-M10's, so M10's `e allora` indexes WHOLE.
- `visto` stays L3-M5's participle row, which is why M2's `visto che` must index WHOLE.
- The habit adverbs (`di solito`, `spesso`, `raramente`, `qualche volta`, `ogni`) stay L3-M1's; M8
  adds the tense, not the adverbs.

## 5. The shape of the level, module by module

- **M1 Explaining how** — owns the IMPERATIVE in both registers and `per` + infinitive. It is first
  because it is the first module in which the learner tells somebody else to do something, and
  because M7 and M9 both need the forms.
- **M2 Cause and consequence** — owns the causal conjunction set and its position law (`perché`
  follows, `siccome` precedes), plus the welcome/unwelcome split between `grazie a` and
  `a causa di`. Second, because every later module argues.
- **M3 What might have been** — owns the condizionale passato and the congiuntivo trapassato, and
  finishes what L3-M4 started with one cell of `avessi`. Third, because it is the largest thing L3
  left standing and everything after it can lean on it.
- **M4 Persuading** — owns the concessive move as a structure and the bare-infinitive advice family
  (`ti conviene`, `vale la pena`, `basta`). Before M5 on purpose (see §2).
- **M5 Disagreeing well** — owns the present congiuntivo as a paradigm, the doubt triggers, and the
  un-dropping of the pronoun under syncretism. Fifth, at the level's hinge, because it is the
  level's heaviest single load.
- **M6 Before and after** — owns the non-finite time clause (`prima di` + inf, `dopo aver` +
  participle), `finché non` with its expletive negation, and `già` / `non ancora` inside the
  compound past.
- **M7 Official talk** — owns the impersonal-formal cluster (`si prega di`, `è vietato`,
  `si informa`) and puts M1's Lei imperative in the place it comes from. A RECEPTION module first,
  which is why its bound is the level's highest.
- **M8 Back then** — owns the imperfetto paradigm and the then-against-now frame. Late, because it
  needs an audience for the contrast, and because M6 has already sorted out `già` and `non più`.
- **M9 Places and journeys** — owns motion verbs on `essere` at length and the `ci vuole` /
  `ci vogliono` duration frame. Ninth because it is the most re-use-heavy module in the level.
- **M10 A story with a twist** — owns direct speech set against L3-M5's reported speech, and the
  Italian punctuation of a quoted line. The level's exit.

**Bounds climb 12 → 14, continuing L3's 10 → 12.** M1 stays at **12** because instructions are
short by nature and a high bound would invite padding; M10 is at **12** as well, applied to each
sentence INSIDE the six-sentence account, exactly as L3-M10's was. M2–M6 and M8 are at **13**: each
of them joins two clauses, and a counterfactual with two compound halves
(`Se avessi saputo, avrei chiamato prima`) does not fit in twelve without dropping the adverb that
makes it a sentence somebody would say. M7 and M9 are at **14** — M7 because a station announcement
is long and the module is comprehension-first, M9 because a journey sentence carries a direction
inside it.

`newWordCap` stays the PRD §5 **25** in nine modules, and pools are authored to 12 as `docs/73`
settled. **M10 is set to 20**, and this is the one deviation: the module's whole test is that
nothing new is needed, its own note says the fresh spend is a dozen connectors and speech verbs, and
turning that sentence into a bound is cheaper than discovering at review that an exit module bought
twenty-five words. Proper nouns are exempt (#61), so the accounts are not squeezed by it.

## 6. What L4 defers to L5, with reasons

- **The passato remoto.** It is what a printed story and any history of *back then* actually uses,
  so M8 and M10 both name it. It stays out because it is a written past and a southern spoken past,
  and a course that ships it at L4 will have learners writing it into spoken accounts.
- **The trapassato.** M6 carries before-ness with a preposition instead, which is what a speaker
  does; adding a third past tense to a level that already opens two moods is more than one level can
  hold.
- **Clitic attachment** (`dimmi`, `prendilo`, `andarci`, `non dirmelo`) and **combined clitics**,
  still deferred from `docs/73` §2. M1 keeps every imperative object as a separate word and says so.
- **`ne` as a partitive.** Free in the index and left free; taking it would mean taking attachment
  with it.
- **`benché` / `sebbene` + congiuntivo.** `anche se` + indicative (L3-M3's) does the concessive job
  for the whole of L4, and M2 and M5 both point at it.
- **`prima che` + congiuntivo**, the different-subject twin of M6's `prima di`. Named in one line in
  M6, shown in no sentence.
- **The `venire` passive as a system**, and **`sarei dovuto andare`** — the essere twin of M3's
  `avrei dovuto`. Both are shown as fixed phrases and neither is opened as a rule.
- **Irony, sarcasm and the ironic climb-down** as forms of disagreement — L5-M7's, so every
  disagreement in M5 is sincere.

## 7. Open questions for the native-speaker gate

Continuing this course's chain; `docs/81` ends at 49.

50. **The crossed imperative endings** (M1, rule 2). The rule states that `-are` takes `-a` for tu
    and `-i` for Lei while `-ere`/`-ire` do the reverse. Confirm the crossing is the way an Italian
    would explain it to a foreigner, and that nothing in ordinary speech blurs it.
51. **`non` + infinitive to a friend** (M1). Confirm `non toccare` is what is actually said rather
    than a written-notice form, and that a spoken `non toccarlo` — which this level does not teach —
    is not so much more frequent that the bare version sounds odd.
52. **`a causa di` against `per colpa di`** (M2). The briefs split them by whether the outcome is
    welcome and by whether blame is attached. Confirm `per colpa di` is ordinary speech and not an
    accusation, and that `grazie a` is genuinely restricted to good outcomes.
53. **`siccome` at the front only** (M2, rule 2). Confirm the position law is absolute in speech,
    and that `siccome` is not itself a written-register word beside `visto che`.
54. **`avrei dovuto` against `dovevo`** (M3). Spoken Italian often says `dovevo chiamare` for *I
    should have called*. Confirm the plain imperfetto is as common as the compound conditional here,
    the way `docs/81` q22 settled the counterfactual, and say which a learner should produce.
55. **`magari` + congiuntivo trapassato** (M3). Confirm `Magari avessi studiato` is the ordinary
    spoken wish and not a literary one, and that `magari` alone does not already carry it.
56. **The pronoun under syncretism** (M5, rule 3). The module says the pronoun comes BACK in the
    congiuntivo when the person is not obvious. Confirm a speaker really does say
    `credo che tu abbia ragione` rather than relying on context, and whether the same holds for
    `io` and `lui`.
57. **`sarà` as a concession** (M5). Confirm the bare future used as *that may well be* is current
    everyday speech, and whether it needs `sarà, ma…` to be heard that way.
58. **`finché` against `finché non`** (M6, rule 3). The expletive `non` is not in doubt as grammar.
    Confirm both are heard, that they are genuinely interchangeable in the *until* sense, and which
    one a learner should default to.
59. **`si prega di` in the wild** (M7). Confirm it is what is currently written and announced rather
    than a form on its way out, and name the twin a learner is more likely to hear at a counter.
60. **`ci vuole` with a plural time** (M9, rule 2). The written rule is not in doubt. Confirm a
    speaker really says `ci vogliono due ore` in ordinary speech and does not level it to
    `ci vuole due ore`, the way `docs/81` q40 asked of `si vendono`.
61. **The punctuation of a quoted line** (M10, rule 2). The module teaches a colon and a capital,
    and names the dash as the printed alternative. Confirm which a person writing a message would
    use, and whether quotation marks are now the ordinary choice.
