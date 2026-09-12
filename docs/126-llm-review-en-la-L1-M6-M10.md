# en-la L1-M6…M10 — the LLM review, and Level 1 closes (#636)

**Date:** 2026-09-12 · **Course:** en-la — English (L1) → Latin (L2) · **Modules:** L1-M6 "Tomorrow",
L1-M7 "Where things are", L1-M8 "Numbers & shopping", L1-M9 "Feelings & opinions", L1-M10 "Connected
talk" · **Wave:** the third, and the last of the level · **Bar:** LLM review, authorised by the repo
owner. **The fluent-speaker gate is unmet** — §6 carries this wave's questions.

Authored in ladder order with a rebuild between each module, against the L1 briefs (#633) and the
orthography of `docs/123`. All five signed
`verifiedBy: "Claude Opus 5 — LLM review, authorised by repo owner"`, `verifiedAt: 2026-09-12`.

**Level 1 is whole: ten rungs, 189 surfaces, and the ratchet still at zero.**

---

## 1. What was checked

- **`npm run content:validate`** → all ten `ok`, `CONTENT 472/472 ok`.
- **The dev build**, the only gate that sees a fixture course:

  ```
  en-la: 10 modules (L1-M1..M10)
    index L1-M1: 24    index L1-M6: 113
    index L1-M2: 44    index L1-M7: 129
    index L1-M3: 62    index L1-M8: 153
    index L1-M4: 86    index L1-M9: 174
    index L1-M5: 97    index L1-M10: 189
  ```

  **No `shown but untaught` line after ten rungs.** Every surface a learner can read has a word row,
  the two proper nouns included.
- **The folded index** (`foldIndex` over `cumulativeThrough`, because everything from M2 on is a
  delta): 189 folded surfaces against a `surfaceCount` of 189, `maxSpan` 1.
- **`git diff --stat`** over L1-M1…M5 is empty. The wave added and never edited.
- **`scripts/verify.sh --fast`** → `TEST 897/898`, the one failure being the container's pre-existing
  splash PNG comparison.

---

## 2. Both seams survived the whole level

M10 opens the second seam, `-que`, and it was built the way M2's `-ne` was: **the joined forms live
in the PARTICLE's row, and every host is opened in an earlier module.** Folded through L1-M10:

| Key | Owner | Key | Owner |
|---|---|---|---|
| `que` | `L1-M10-S03` | `aquam` | `L1-M3-S01` |
| `aquam-que` | `L1-M10-S03` | `librum` | `L1-M3-S04` |
| `librum-que` | `L1-M10-S03` | `pānem` | `L1-M3-S06` |
| `pānem-que` | `L1-M10-S03` | `epistulam` | `L1-M4-S05` |
| `epistulam-que` | `L1-M10-S03` | | |

Every bare host still answers for itself, seven modules after it was taught, and the particle keeps
`que` as well. The `-ne` seam from M2 is untouched: `agis` still belongs to `L1-M2-S02`, `valēs` to
`S04`, `tū` to `S05`, and `ne` with its three joined forms to `S06`.

**The lexicalised words came through as single rows, which is the other half of the rule:** `quoque`
(`L1-M10-S09`), `atque` (`S07`), `neque` (`S08`) and M9's `itaque` are each one key with no parts.
Splitting any of them would have minted `ita`, `at` or `quo` as keys for words that do not exist,
and M9-S04 and M10-S07 each carry a `mistake` plate showing exactly that error — which is only
possible because a plate is never indexed.

---

## 3. The macron pairs, and what is still owed to later levels

Folded through the whole level, each pair is two rows: `venit`/`vēnit` (M4-S09 / M5-S01),
`legit`/`lēgit` (M4-S03 / M5-S03), `sum`/`fuī` (M1-S01 / M5-S05), and — new in this wave —
**`hic`/`hīc`, both owned by M7** (S07 and S05).

M7 taught that pair **in one module on purpose**, which is the one configuration where a
near-homograph is safe: no later module can meet either word without having met the other, and both
notes name the twin. `docs/123` §6 predicted the collision and M7 is where it was spent.

Still free, and owed to the modules the briefs assigned them: `ēst` (L2-M5), `nē` (L3-M4),
`rosa`/`rosā`, `legēbam`/`habēbam`/`eram` (the imperfect, L4-M8), `venī` (the imperative, which
appears only inside M5's mistake plate), `sīc` (banned by name in M2), `nōlī` (L2-M1) and `vōs`.

---

## 4. Corrections made during the wave

Every one of these is the same shape: a surface was shown in a variation or a pool item with no row
to own it, which would have raised the ratchet the level was holding at zero. The fix was always to
give the shape a proper home or to drop it — never to accept the baseline.

1. **Given a home, because the level really writes them.** `scrībere` (caught by the build's pool
   gate in the previous wave), `ūnam`, `vendis`, `laetī`, `fessī`, `valet`, `labōrant`, `veniēs`,
   `agitis`, `agimus` and the four joined `-que` forms all went into the `forms` of the row that owns
   their lexeme.
2. **Dropped, because nothing needed them.** `nummus` from an M6 pool item (M8's word, two modules
   early), `et` from an M8 pool item (M10's word), `emam`, `Mārcum`, `Iūliā`, `librōs` in M4, and
   `tria` from `trēs`'s forms — a shape the module names in prose but never writes, since L1 teaches
   no neuter plural to put it on.
3. **M8-S02 was rewritten so the feminine plural is TAUGHT rather than shown.** Its hero was
   `Duo librī sunt`, with `duae mēnsae` appearing only in a variation — so `duae` and `mēnsae` had no
   rows. The hero is now `Duae mēnsae sunt`, both words carry rows, and `Duo librī sunt` moved into
   the variations where the masculine contrast still lands.
4. **M6's `docēs` is written in exactly one place: a `mistake` plate.** The module's whole trap is
   that `legēs` is a future and `docēs` is a present with the same ending, and showing `docēs` in a
   display would have required a `doceō` row the module has no room for. A plate is exempt from the
   ratchet, so the contrast is demonstrated without spending a surface.

---

## 5. What the level hands to L2

- **Two seams, both working, and the ordering law that makes them work** (§2). A new `X-ne` or
  `X-que` in L2 needs `X` opened earlier, and `tools/course-briefs.test.ts` pins that no module
  outside M2 and M10 opens a seam in its patterns.
- **189 surfaces.** Five declension-shapes of `liber` (`liber`, `librum`, `librī`, `librōs`, and M7's
  `librō` was deliberately NOT opened — see §6.4), three of `aqua`, `mēnsa`, `schola` and `pānis`,
  and `sum` in four persons across three tenses.
- **The ratchet at zero**, which L2's first wave must lower or hold.
- **A `formal` chip still unused.** `docs/123` §7 puts politeness on a verb form, and L2-M1 is
  chartered to open `velim`, `quaesō` and `sīs` — so en-la will be the only course in the catalogue
  whose `formal` register sits on a verb rather than a pronoun.

---

## 6. Open questions for the fluent-speaker gate

Additions to `docs/123` §11, `docs/124` §6 and `docs/125` §5.

1. **Is the two-formation future (M6) too much for one module?** `-bō` for `habeō` and `labōrō`,
   `-am`/`-ēs` for `legō`, `scrībō` and `veniō`, plus two irregulars — five verbs and two patterns in
   ten sentences. The alternative is to teach one pattern here and defer the other, at the cost of a
   module that cannot say "I will read".
2. **Does M7 succeed in teaching `in` + two cases, or does it need two modules?** The pair
   `in scholā sum` / `in scholam eō` is the module's spine, and four other prepositions are taught
   alongside it. A teacher may judge that the contrast deserves the whole rung.
3. **Is `apud` worth L1's space?** It is idiomatic and common in the comedies, but it means "at
   someone's house / in their presence" and has no single English equivalent, so its cue
   ("at the teacher's") is doing a lot of work. `cum` and `prope` carry more weight for less.
4. **`librō` was deliberately not opened in M7**, even though `in librō` is natural, because the
   module already opens `scholā`, `magistrum` and `magistrō` and a fourth new shape of a known noun
   seemed like spending the cap on paradigm rather than on speech. Is that the right call, or does a
   learner need the ablative on a masculine noun the module already owns?
5. **Is `nummus` still right for M8?** `docs/123` §11 logged this as open and this wave spent it:
   the module writes `nummus`, `nummī`, `nummum` and `nummōs`, so reversing it later is four rows
   and every price sentence in the course.
6. **Is `trīstis` the right second adjective in M9?** It introduces the two-shape adjective family,
   which is a real fact a learner meets immediately — but it means the module teaches two declension
   patterns for adjectives at the same time as teaching four connectives.
7. **Is M10's five-word three-sentence hero (`Salvē! Quid agis? Bene agō.`) a sentence at all**, for
   the purposes of a schema that counts one display per item? It is the level's best demonstration
   that Latin runs on endings, and it is also three sentences in a field the app renders as one.
8. **`quoque` follows its word and `autem` and `enim` follow the first word of the clause.** Both are
   stated as rules and both are true, but they are different rules, and a learner meeting three
   postpositives in one module may conflate them. Does M10 need to teach fewer of them better?
