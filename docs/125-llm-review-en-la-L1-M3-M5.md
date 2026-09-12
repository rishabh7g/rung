# en-la L1-M3…M5 — the LLM review (#635)

**Date:** 2026-09-12 · **Course:** en-la — English (L1) → Latin (L2) · **Modules:** L1-M3 "Needs and
wants", L1-M4 "My day", L1-M5 "Yesterday" · **Wave:** the second · **Bar:** LLM review, authorised
by the repo owner. **The fluent-speaker gate is unmet** — §5 carries this wave's questions.

Authored in ladder order against the L1 briefs (#633), rebuilding between modules: M3 against
L1-M2's cumulative index, M4 against M3's, M5 against M4's. Signature on all three:
`verifiedBy: "Claude Opus 5 — LLM review, authorised by repo owner"`, `verifiedAt: 2026-09-12`.

---

## 1. What was checked

- **`npm run content:validate`** → all three `ok`, `CONTENT 465/465 ok`.
- **The dev build** (the only gate that sees a fixture course):

  ```
  en-la: 5 modules (L1-M1..M5)
    index L1-M1: 24 surfaces
    index L1-M2: 44 surfaces
    index L1-M3: 62 surfaces
    index L1-M4: 86 surfaces
    index L1-M5: 97 surfaces
  ```

  **No `shown but untaught` line**, so the ratchet still stands at zero after five rungs.
- **The index, folded and read back.** From M2 onward the emitted file carries only that module's
  delta (`surfaces` is the delta, `surfaceCount` and `maxSpan` stay cumulative), so the check runs
  `foldIndex` from `tools/generate-prompt.ts` over `cumulativeThrough` — 97 folded surfaces against a
  `surfaceCount` of 97, which is the fold's own completeness check.
- **`git diff --stat content/en-la/modules/L1-M[12].json`** → empty. The wave added and never edited.
- **`src/course/types.test.ts`**'s en-la block, green on all five modules.
- **`scripts/verify.sh --fast`** → `TEST 890/891`; the one failure is the pre-existing
  `scripts/generate-splash.test.ts` PNG-byte comparison, unrelated to content.

---

## 2. The macron pairs, which are the reason #630 exists

M5 is the module the orthography decision was taken for, and the claim is now measured rather than
argued. Folded through L1-M5, every present/past pair is **two rows**:

| Present | Past | Present owner | Past owner |
|---|---|---|---|
| `venit` | `vēnit` | `L1-M4-S09` | `L1-M5-S01` |
| `legit` | `lēgit` | `L1-M4-S03` | `L1-M5-S03` |
| `veniō` | `vēnī` | `L1-M4-S09` | `L1-M5-S01` |
| `legō` | `lēgī` | `L1-M4-S03` | `L1-M5-S03` |
| `scrībō` | `scrīpsī` | `L1-M4-S05` | `L1-M5-S04` |
| `habeō` | `habuī` | `L1-M3-S04` | `L1-M5-S06` |
| `sum` | `fuī` | `L1-M1-S01` | `L1-M5-S05` |

Without the macrons the first four of those would be **one key each**, and the note a learner saw on
tapping `venit` would be whichever module got there first — M4's present, with M5's past silently
inheriting it. That is the failure the whole orthography prevents, and it is now a fact about the
shipped index rather than a prediction.

Two things this wave did to make the pair teachable rather than merely correct:

- **M4-S09 exists to set up M5-S02.** `Iūlia cotīdiē venit` and `Iūlia herī vēnit` differ by one bar
  and nothing else, and both `sound` lines say so in the imperative: hold the ē here, clip it there.
- **M5-S07 shows the same contrast twice on purpose** — once as a variation labelled as deliberately
  broken (`Mārcus herī legit`, a present with a past time word) and once as the `mistake` plate. The
  duplication is intentional and the trap says it is.

**A perfect stem is its own row and never a `forms` entry of the present**, which is what makes the
table above possible. The ladder connection is made in the NEW row's note ("the past of M4's
veniō"), not by amending M4's file.

---

## 3. What stayed free, and why it matters

Folded through M5, every key the later modules are owed is still unclaimed: `ēst` (L2-M5), `nē`
(L3-M4), `rosa`/`rosā` (L1-M7), `hic`/`hīc` (L1-M7), and `legēbam`/`habēbam`/`eram` — the imperfect,
which is **L4-M8's** and which M5 names as deferred in a rule and writes nowhere.

`venī` (the imperative, "come!") is also free, and it appears in this wave exactly once: as M5-S01's
`mistake` plate, where dropping the bar from `vēnī` turns a report into an order. A plate is never
indexed, so showing it there costs no key — which is the same exemption the wave before this one had
to add to `types.test.ts` for `Julia`.

The seam from M2 also held across three more modules: `agis` still belongs to `L1-M2-S02`, `ne` and
the three joined forms to `L1-M2-S06`. Nothing in M3–M5 writes a seam, which the briefs require and
which `tools/course-briefs.test.ts` pins on the patterns.

---

## 4. Corrections made during the wave

1. **The build's pool gate caught two untaught tokens, which is what it is for.**
   `en-la/L1-M4.json: /comprehensionPool/9/display: "scrībere" ... is not taught by L1-M1..M4`. The
   infinitive was written in a pool item and in a variation but was missing from `scrībō`'s `forms`.
   Added there, because the level does write it — the fix was to the row, not to the sentence.
2. **Four surfaces were planned that no row owned**, and each was removed rather than smuggled in
   from a variation, where it would have raised the ratchet the wave was meant to hold at zero:
   `librō` and `magistrō` (ablative and dative of nouns whose rows sit in M1), `nōbīs` (a pronoun
   L1 does not teach), and `librōs` (an accusative plural). Each would have been a one-word
   convenience costing a permanent baseline.
3. **`bibī` was deliberately not written.** The perfect of `bibō` is `bibī`, whose third person is
   `bibit` — **identical to the present's third person**. A module teaching that the past is marked
   by a stem change cannot afford a verb where it is not marked at all, so M5 teaches five perfects
   and leaves this one out. This is a real gap in the course's coverage and it is recorded as such
   rather than hidden: a later level that needs "he drank" will have to teach the ambiguity as the
   lesson.
4. **`bibis` was added to `bibere`'s forms** rather than dropped from the pool, because the second
   person is a shape the level genuinely writes and the row is the right home for it.
5. **M3's `īre` plan was abandoned.** The brief had M3 teach the infinitive of `eō` and M4 own the
   lexeme, which would have split one verb across two rows for no gain. M3 now teaches `bibere`
   instead — a verb it owns outright, and a better fit for a module about wanting and drinking — and
   M4 opens `eō` whole, with `eō`, `īs`, `it` and `īre` in one row. The brief was left as written for
   M4's homograph rule, which is unaffected.

---

## 5. Open questions for the fluent-speaker gate

Additions to `docs/123` §11 and `docs/124` §6.

1. **Is `mihi opus est` + ablative the right way to teach "need" in M3?** It is the classical idiom
   and it introduces the ablative three modules before M7 needs it — but it is impersonal, it puts
   the learner in the dative for the second time in three modules, and a teacher may prefer to defer
   needing altogether and let `volō` carry it.
2. **Is `nummī` still the answer for M8, now that M3 has established a market register?** Recorded
   as open in `docs/123` §11 and unchanged by this wave, but M3's `pānem volō` is the first sentence
   that will sit next to a price.
3. **Is `schola` the right first place-noun?** In classical Latin it is the teaching rather than the
   building, so `ad scholam eō` is closer to "I go to lessons". M4 says so in a note. A teacher may
   judge that a beginner needs a concrete building first — `ad forum`, `domum` — even though the
   locative that `domum` invites is deferred to L4-M9.
4. **Does M4's `it` need more defence?** Two letters meaning "he goes", spelling an English word
   that means something else entirely, is the sharpest false friend in the level. It gets a rule, a
   trap and a mistake plate, and it may still be too little.
5. **Is teaching five perfect stems in one module the right load**, against three plus a slower
   ramp? `newWordCap` is not the binding constraint here (M5 spends 11 surfaces of 25); the question
   is whether five unpredictable stems in ten sentences is learnable, or whether the module should
   trade two of them for more repetitions of the `venit`/`vēnit` contrast.
6. **`fuī` is glossed "I was" and used for states** (`Rōmānus fuī`, `Discipula fuī`). For a lasting
   state a Roman would more often reach for the imperfect `eram`, which this course defers to L4-M8.
   M5's `usage` lines admit this. Is the perfect an acceptable simplification for L1, or does it
   teach a habit that L4 then has to break?
