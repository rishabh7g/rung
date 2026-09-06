# en-ar L1 — spoken Arabic, not textbook Arabic (LLM editorial pass)

**Date:** 2026-09-05 · **Reviewer:** Claude, LLM review, authorised by the repo owner ·
**Bar:** LLM review plus owner authority — the bar the course already shipped on (#198–#202).
**No native reviewer has read these edits.** This pass changes what the learner is asked to say,
so it is recorded sentence by sentence; every rewrite reverts by file.

---

## Why

The course's register is pinned in `tools/course-briefs.ts` as spoken-simple MSA — the Arabic an
educated speaker would say out loud, never a dialect form in `display`. An audit of the 100 heroes
against that bar found the register mostly holding: `ismī`, `anā min al-Hind`, `urīd an ashrab`,
`ʿindī`, `bi-kam hādhā?`, `kāna al-jaww bārid`, the `sa-` futures, `in shāʾ Allāh`, `fī raʾyī`,
`li-ʾanna`/`li-dhālika`, `hal` questions and the closing formulas are all what a speaker says.

It also found a handful of lines that were textbook rather than spoken, one that taught the wrong
meaning, and one construct-state spelling the romanization scheme had swallowed:

- **`sawfa` in production** (M6-S02). `sawfa` is the marker of news bulletins and speeches;
  conversation uses `sa-`. Drilling `sawfa adhhab` fifteen times drills a sentence nobody says.
- **`jāʾiʿ`** (M9-S02, M10-S05, M9 pool). Dictionary-correct and almost never said; `jawʿān /
  jawʿāna` is dictionary MSA too and is the word every dialect uses.
- **`lā adhhab` cued "I am not going"** (M9-S08). `lā` + non-past is habitual — "I don't go". The
  cue and the line disagreed; the line now says what the cue means.
- **`thalātha kutub`, `khamsa riyālāt`** (M8-S06, S08, M10-S04, M8 pool). In a numeral iḍāfa the
  tāʾ marbūṭa is pronounced: `thalāthat kutub`, `khamsat riyālāt`. That `-t` is not a case
  ending — it is the same hidden t the course already writes in `sayyāratī` — so the "no case
  endings" law never applied to it.
- **The dual `kitābān`**. MSA nominative; speech everywhere says `kitābayn`. Kept in `display`
  (the brief's rule: the MSA form stays, `usage` says what the street says) and recorded below as
  the owner's open question.

---

## What changed — 13 heroes, 3 cues, 5 usage lines

**Register** (7 heroes): M6-S02 `sa-adhhab ilā al-ʿamal ghadan` (was `sawfa adhhab …`; `sawfa`
stays as a recognition row on S02 and as its first variation, rule r2 now says "recognise sawfa;
say sa-"); M9-S02 `anā jawʿān, li-dhālika sa-ākul al-khubz` and M10-S05 `anā jawʿān. sa-ākul,
thumma …` (were `jāʾiʿ`; the row is `jawʿān · jawʿāna`, script جوعان / جوعانة, rule r9 rewritten
around the `-ān/-āna` shape of `taʿbān`); M8-S06 `urīd thalāthat kutub, min faḍlika`, M8-S08
`hādhā bi-khamsat riyālāt`, M10-S04 `hādhā bi-khamsat riyālāt. ṭayyib, shukran. ʿafwan.` (the
number rows now carry `thalāthat · thalātha · thalāth` and `bi-khamsat · khamsat · khamsa ·
khams`; rules r4–r6 teach the `-t`); M9-S08 `lā urīd an adhhab ilā as-sūq bi-sabab al-jaww`, cue
"I don't want to go to the market because of the weather" (M3's `urīd an` frame; `usage` explains
why a bare `lā adhhab` would be a habit).

**Textbook content** (4 heroes): M7-S07 `bayt Rohān kabīr` "Rohan's house is big" (was `bāb
al-bayt kabīr`; `bāb al-bayt kabīr` is now the first variation, `sayyārat Rohān kabīra` the second,
and rules r4/r5 teach the iḍāfa from `bayt Rohān` with `bāb al-bayt` as the article-bearing case);
M5-S10 `ams akaltu fī al-maṭʿam wa sharibtu shāy` and M6-S10 `ghadan sa-ākul fī al-maṭʿam wa
sa-ashrab qahwa` (were "ate the bread and drank the milk"); M9-S09 `al-ʿarabiyya muhimma li-ʾannī
sa-adhhab ilā Miṣr` "Arabic is important because I'm going to Egypt" (was "work is important
because I want a car"; new row `Miṣr`, the `muhimm` row now heads with `muhimma`).

**The article on a helping** (2 heroes): M3-S02 `lā urīd ḥalīb` (was `lā urīd al-ḥalīb`, whose
trap taught that a refusal keeps the article a request drops — it does not; the milk in the coffee
is bare both ways, and `lā urīd al-ḥalīb` is kept as the third variation, "I don't want THE milk").
Rule r0 and `allowedPatterns` follow. M5-S03 `akaltu fākiha ams` "I ate fruit yesterday" (was
`akaltu al-fākiha`, cued "the fruit"); `ams akaltu al-fākiha` stays in the pool as the specific
reading.

**Cues** (3): M2-S01 "Hello (the standard greeting)", M2-S02 "Hello (the reply)" — and the same
on their variations — instead of the calque "peace be upon you / and upon you, peace"; M8-S10 "I
buy fruit at the market" (and its two variations) instead of "I buy the fruit from the market".

**`usage` only** (5, no display change): M2-S04 `kayfa ḥāluka?` adds that every dialect flattens
`-uka/-uki` to `-ak/-ik` (`ḥālak, ḥālik, ismak, ismik`); M7-S04 `hunāka kitāb` — spoken pan-Arab
is `fī kitāb`; M8-S05 `kitābān` — speech says `kitābayn / sayyāratayn` (also in the row note and
rule r3); M9-S03 `limādhā` — dialects `lēsh / lēh`; M8-S08 `riyālāt` — `junayh`, `dīnār`, `dirham`
by country. M1-S04 `anā saʿīd` says it is normally said with a complement (`bi-liqāʾik`).

**Kept on purpose:** M1-S04 `anā saʿīd` itself (low priority, not wrong); the M6-S09 variation
`sawfa adhhab ilā al-Hind qarīban` (recognition, where the audit put `sawfa`); M8-S07 `thalāth
sayyārāt` (feminine noun, bare number — unchanged); the `bāb` row on M7-S07 (its hero no longer
contains it, exactly as hi-en kept `that` on a hero that dropped it — the M7 pool item `bāb
al-madrasa kabīr` and the S07 variation both depend on it); everything the audit listed as "not a
problem".

---

## Mechanics the pass had to respect

- The word index is cumulative and first-occurrence-wins, so rows moved rather than duplicated:
  `khubz · al-khubz` left M5-S10 (which no longer contains it) for M8-S03 `urīd khubz, min faḍlika`,
  the first hero that does; M5-S10 gained `fī al-maṭʿam` (the pattern of S05's `fī al-bayt`) so the
  hero's `fī` resolves before M7 frees the word, and M7-S06's `fī` note names it. New surfaces
  `thalāthat`, `khamsat`, `bi-khamsat`, `jawʿān`, `jawʿāna`, `Miṣr`, `muhimma` are all taught by
  the rows that carry them.
- Every comprehension-pool token resolves (`checkComprehensionPool`); 8 pool items rewritten —
  M3-C01 `lā urīd shāy`; M5-C08 `sharibtu shāy wa akaltu fī al-maṭʿam`; M6-C01 `sa-adhhab ilā
  al-maṭʿam ghadan` (it had become identical to the new S02 hero), M6-C04 `sa-nadhhab ilā
  al-madrasa`, M6-C10 `sa-akūn fī al-bayt ghadan`; M8-C02 `ʿindī thalāthat kutub`; M9-C03 `anā
  jawʿāna, li-dhālika sa-ākul`, M9-C06 `lā urīd an adhhab ilā al-ʿamal bi-sabab al-jaww`. Script
  and display were changed together on every sentence, variation, mistake and pool item touched.
- `complexity.allowedPatterns`: M3 `lā urīd + N`, M6 drops `sawfa + V-imperfect`, M7 `N + name /
  N + al- + N`.
- `tools/course-briefs.ts`, en-ar section: one dated paragraph records the three amended decisions
  (`sawfa`, the numeral `-t`, the dual) and points here. `src/course/types.test.ts` was not
  touched — every rewritten display is romanization-only and every script line is Arabic, which is
  all the en-ar block asserts.
- Budget: `course:en-ar` 113.1 KiB gzip.

## Gate

`content:validate` 90/90 · build (en-ar 10 modules, index 227 surfaces through M10) · `tsc -b` ·
lint · 253 tests · `prettier --write` on the two prose files.

## What the owner is asked to ratify

- The 13 hero rewrites and their variations, mistakes and notes: `git diff 80be7c1 -- content/en-ar/`.
- **Dialect question 1 — the dual.** `kitābān` / `sayyāratān` / `hunāka kitābān` stay in
  `display`; `usage` now says speech has `kitābayn`. `kitābayn` is also MSA (the oblique case), so
  writing it would not break the brief's "no dialect in display" — but it would be the course's
  first non-nominative choice. Owner's call; this pass kept the nominative.
- **Dialect question 2 — the `-uka/-uki` suffixes.** `kayfa ḥāluka?`, `ismuka`, `ʿindaka`,
  `min faḍlika` carry the full MSA suffix; every dialect says `-ak/-ik`, and even careful MSA
  speakers drop the case vowel in pause (`ḥālak`). The romanization scheme (`courses.json`,
  brief §2) writes what carries the person and drops what carries only case; `-uka`'s `u` is a
  case vowel by that test. Changing it would touch M1, M2, M7, M8, M10 and the `-uka/-uki` pattern
  string, so it was NOT done here; it is recorded as a scheme question for the owner.
- The three amended brief decisions above — a future en-ar level should follow this pass.
