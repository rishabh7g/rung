# en-it L3 — the authoring-brief decisions (#466)

The ten en-it L3 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['en-it']` L3-M1…L3-M10) are the
sixth L3 briefed. Every seam below was pinned against the REAL cumulative index — the fold of
`public/content/en-it/index/L1-M1.json` through `L2-M10.json`, rebuilt and read on 2026-09-08:
**642 surfaces, maxSpan 3** — and against the review chain the level inherits, `docs/44` (spoken
Italian) and `docs/65`'s L2 questions.

This note records the decisions the briefs are written to, so the authoring waves (#475, #484 and
the M6–M10 issue) inherit them without re-deriving anything. The briefs repeat each decision in the
module notes, because a prompt only ever shows an author the notes.

## 1. Register and the elision law, unchanged

`Lei` never reaches a display, because it folds onto L1-M10's `lei` — `docs/57` §1's decision, and
L3 does not revisit it. M8 (counters, offices) speaks `Lei` throughout and chips `formal`; the rest
follow the scene.

The elision law leans harder in L3 than it did in L2, because a reflexive verb meets a vowel
constantly: **straight apostrophes only**, one spelling per display, and every genuinely fixed
elided form (`all'università`, `all'inizio`, `l'ho vista`) stays **ONE key with the elision inside
it**, answering for nothing else.

## 2. What L2 withheld, and how much of it L3 takes

`docs/57` §4 named seven things. L3 takes **four**, each narrowly:

- **The congiuntivo → L3-M3**, on one trigger and four cells: `penso che` / `credo che` /
  `mi sembra che` take `sia`, `abbia`, `possa`, `vada`. The mood as a SYSTEM is L4's and is named
  as deferred. The escape hatch is worth as much as the rule: with the same subject in both halves
  Italian prefers `penso DI` + infinitive, which gives a learner a correct sentence for half of
  what they want to say without touching the mood at all.
- **The conditional → L3-M4.** `vorrei` shipped at L1-M3 as a frozen politeness and was never
  explained; M4's job is to show that L1's most useful word was a tense all along. One
  counterfactual frame, `se` + imperfetto + condizionale, and the imperfect congiuntivo as a
  paradigm stays L4-M3's.
- **Reported speech → L3-M5**, exactly where L2-M7 said it would land.
- **Object `la` / `le` (and `ne`) → L3-M5**, taught as MULTI-TOKEN surfaces with their verb.

Still out and still named where a module would reach for them: the **passato remoto**, the
**trapassato**, and **combined clitics**. M8 also restates `docs/57` §2's ruling — the formal
imperatives `scusi`, `senta`, `firmi` are VOCABULARY and the congiuntivo behind them is still L4's,
even though M3 has now opened four cells of the mood on a different trigger.

## 3. The collision `docs/57` predicted, paid with whole surfaces

`la` and `le` are L1-M1's ARTICLE keys forever, which is why L2 could not teach the object clitics
spelled the same. M5 pays it the way the seam list said it would: `l'ho vista`, `le ho parlato`,
`ne ho due` — each a two-token key of its own, with the note saying why the bare word underneath is
an article. Same tool as `a destra` and `più tardi`, and the reason `maxSpan` is 3.

The participle agreement rule travels with it and its LIMIT matters as much as the rule: the
participle agrees with a preceding direct-object clitic and with nothing else on `avere`. A learner
who over-generalises will agree every participle in the account.

## 4. Seams — L3 never edits an L1 or an L2 file

- `che` stays L1-M5's row across all of its jobs — the complementiser, M3's opinion clause, M9's
  relative — with each brief's note written true of the job it uses. `cui` is the one addition.
- `mi` and `ti` stay L2-M5's rows; M1's reflexives are separate VERB keys and M6's `mi sento`,
  `ho voglia di` and `mi dà fastidio` index **WHOLE** so bare `mi` is not spent.
- `si` stays L2-M4's row; M8's `si paga`, `si firma`, `si vendono` and M9's cultural `si` index
  whole rather than opening a second family.
- `mi fa male`, `male` and `testa` stay L2-M8's rows; M7 adds only the plural agreement
  (`mi fanno male i piedi`) and the article rule.
- `se` is M4's fresh key and M3's `anche se` indexes whole precisely so as not to spend it.
- `vorrei` stays L1-M3's frozen row; M2's `devo`/`posso`/`voglio` and M4's conditional cells point
  back at it rather than overwriting it.
- Every reflexive verb (M1), every conditional cell (M4), every backshifted cell (M5) and every
  participle (M5, M10) is its own key where it is a separate word and a `forms` entry where it is a
  shape of one.

## 5. The shape of the level

- Bounds climb 10 → 12: M1–M3 at 10 words, M4–M7 at 11, M8–M10 at 12 — continuing L2's 8 → 10.
- `newWordCap` stays the PRD §5 25 everywhere; pools are authored to 12.
- Two facts are told honestly rather than tidied: spoken Italian very often uses the plain
  imperfetto in a counterfactual (`se avevo tempo, venivo`) where the textbook wants the congiuntivo
  imperfetto, and M4 names it in `usage`; and `sono d'accordo` is an adjective phrase, never a verb.
- M10's items are six-to-eight-sentence accounts. L2-M10 opened the imperfetto against the passato
  prossimo in four sentences; eight is where a learner either has it or does not, and the test of a
  good item is that swapping one pair changes **what happened** rather than only how it sounds.

`npm run content:prompt -- en-it L3-M1` renders today from the real index, and the bounds, the
withheld-piece owners, the elision law, the `la`/`le` collision payment and the L4 deferrals are
pinned by `tools/course-briefs.test.ts` (`en-it L3: the decisions its briefs settle (#466)`).
