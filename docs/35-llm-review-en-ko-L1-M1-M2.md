# en-ko L1-M1 · L1-M2 — LLM review (#377)

**Date:** 2026-08-30 · **Reviewer:** Claude Opus 5, LLM review, authorised by the repo owner ·
**Bar:** LLM review plus owner authority. **There is no native/fluent-Korean gate on this course**,
and nothing below should be read as one.

---

## What was authored

Two modules, from scratch — `content/en-ko/modules/` did not exist before this pass.

| | L1-M1 Who I am | L1-M2 First exchange |
| --- | --- | --- |
| sentences | 10 | 10 |
| variations | 30 (3 on every sentence) | 30 (3 on every sentence) |
| comprehension items | 13 | 13 |
| word rows | 22 distinct | 14 distinct (10 new, 4 reused) |
| cumulative index | 50 surfaces | 62 surfaces |

Both ship the full M1–M3 enrichment: `sound`, `variations`, `mistake`, `usage`, `mnemonic` on
every sentence, plus `glossEn` everywhere and `literal` on every sentence whose Korean order
diverges from English — which, with a verb-final particle-marked language, is all of them except
the one-word greetings.

---

## The romanization held (#353, #373)

`npm run content:build` runs `checkScriptMode` over every readable surface of a romanized course.
Result for both modules: **zero errors**. Not one Hangul character appears in a `display`, in a
`forms` entry, or — the part the build does *not* check — inside an English teaching field.

Two prose lines did carry Hangul in the first draft and were rewritten:

- M1's rule 2 quoted `저는` and `커피를` to show what real Korean writing looks like next to the
  hyphenated romanization. Removed. `docs/design-contract.md` confines the native text to the quiet
  `script` line, and a rule that shows Hangul to make a point about Hangul is still showing it.
- M1-S04's `sound` line quoted `좋아해요` to explain why the h is not pronounced. Rewritten to make
  the same point in English.

Both were caught by the new case in `src/course/types.test.ts`, which is where the rule now lives.
It also pins the ASCII claim (no diacritic anywhere in an L2 slot — this course is charged no
`latin-ext` cut), the Hangul `script` line on every surface, and the speech level.

---

## The index seams, read off the emitted files

`public/content/en-ko/index/L1-M2.json`, after `npm run content:build --with-unverified
--with-fixtures`:

| key | owner | is the note true there? |
| --- | --- | --- |
| `chaek` | L1-M1-S09 word 3 — the `chaek` row | yes; it is the noun's own row |
| `keopi` | L1-M1-S04 word 2 — the `keopi` row | yes |
| `haksaeng` | L1-M1-S01 word 2 — the `haksaeng` row | yes |
| `cha` | L1-M1-S05 word 2 — the `cha` row | yes; the "car" reading is not taught in L1, as #373 assigned |
| `jal` | L1-M2-S02 word 0 — the `jal` row | yes |
| `jinaeyo` / `jinaeseyo` | both L1-M2-S02 word 1 — one row, two forms | yes; the note is written about both shapes and about the raised `-se-` that separates them |
| `gaseyo` / `gyeseyo` | both L1-M2-S10 word 1 — one row | yes; the note is the who-is-leaving rule, which is true of both |

**The bare-noun guarantee holds**, which is what the particle hyphen was chosen for: a row's own
`display` is read before any of its longer forms, so `chaek`, `keopi`, `haksaeng` and `cha` each
belong to the row that taught them, and a later module writing a bare noun resolves to the right
word.

### The one thing that did not go to the plan

`#376`'s M1 brief said the particle rows would be listed first and would own the bare particle keys.
They do not:

| key | plan | actual |
| --- | --- | --- |
| `neun` | the `-neun` row | L1-M1-S01 word 0 — the `jeo` row, via the form `jeo-neun` |
| `ieyo` | the `-ieyo` row | L1-M1-S01 word 2 — the `haksaeng` row, via `haksaeng-ieyo` |
| `i` | the `-i` row | L1-M1-S01 word 2 — the `haksaeng` row, via `haksaeng-i` |
| `ga` | the `-i` row | L1-M1-S06 word 3 — the `uisa` row, via `uisa-ga` |

The emitter walks *sentence → word → forms*, and the host row is written in sentence order ahead
of the ending it carries. **The plan changed rather than the module**, which is what #377 asks for:
reordering the deconstruction to put endings before the words they attach to would fix index
entries nobody can reach, at the cost of a breakdown panel that no longer reads in sentence order.

It is safe because Korean never writes a bare particle as its own whitespace token — and that is
now **pinned by a test** rather than assumed (`BARE_PARTICLES` in `src/course/types.test.ts`), with
one deliberate exemption: a `mistake` plate may write one, because a plate is wrong Korean by
definition and `buildWordIndex` never reads one. M1-S01's plate is exactly that — the copula torn
off its noun.

`tools/course-briefs.ts` and `docs/34-en-ko-romanization-decisions.md` were both corrected to say
this, so the brief no longer describes an index that does not exist.

---

## Every comprehension token resolves to the right row

Run over `L1-M2`'s thirteen items with the real `matchSurfaces` against the emitted index. Every
token resolved, and each landed on the row that teaches that word — the check the build does *not*
do (PRD §6.3 only enforces that a token resolves, and hi-mr once shipped four rows whose `forms`
had swallowed a different word). A sample, in the form `token → module/sentence#wordIdx`:

- `C03 Yuna-neun uisa-yeyo.` → `yuna-neun` → M1-S10#w4 (the `Yuna` row) · `uisa-yeyo` → M1-S06#w3
  (the `uisa` row)
- `C09 Mannaseo bangapseumnida. Je ireum-eun Yuna-yeyo.` → `mannaseo bangapseumnida` → M2-S08#w0
  (the frozen phrase, matched as one two-token surface) · `je` → M1-S02#w0 · `ireum-eun` →
  M1-S02#w1 · `yuna-yeyo` → M1-S10#w4
- `C13 Aniyo, uisa-ga anieyo.` → `aniyo` → M2-S06#w0 · `uisa-ga` → M1-S06#w3 · `anieyo` →
  M1-S07#w4

No pool item case-insensitively equals a hero sentence; the build reported no pool warnings.

One build failure was hit and fixed honestly rather than by weakening anything: `chingu-yeyo`
appeared in a M2 pool item and was not a taught surface, so it was added to the `chingu` row's
`forms` — it is a shape of that word, which is what `forms` is for.

---

## Corrections applied during the pass

1. **`hakseng` → `haksaeng`** everywhere. The first draft of the decisions doc and the manifest's
   `romanizationNote` mis-romanized 학생: `ㅐ` is `ae` in Revised Romanization, so the word is
   `haksaeng`. Fixed in `docs/34`, `content/courses.json`, `tools/course-briefs.ts` and
   `src/test/courseManifest.ts` before any module used the wrong spelling.
2. **Hangul removed from two teaching fields** (above).
3. **`mistake` added to M2-S08 and M2-S09.** The validator caught it: M1–M3 ship fully enriched,
   and two of the frozen-phrase sentences had been authored without a plate.
4. **A variation rewritten in M3's neighbour set** — noted here because it was found in the same
   pass: `Sigan-i eopseoyo` introduced an untaught word in a variation, and was replaced with
   `Bap-i eopseoyo`.

---

## Judgement calls a reader should be able to argue with

- **M2 teaches subject-dropping before M4 makes it a rule.** `Ne, haksaeng-ieyo` has no subject,
  because a Korean answer does not have one, and authoring one in would have shipped a sentence no
  speaker would say. M4 still owns the rule; M2 shows it working and says so in its rules list.
- **`gamsahamnida` and `mannaseo bangapseumnida` are the only `-mnida` forms in the course.** They
  are what a learner actually meets on day one. Both are taught as frozen phrases with a rule
  saying the style they come from is a later level's, and the test now fails any third `-mnida`
  form appearing anywhere.
- **`jal jinaeseyo?` is authored as a real question, not a greeting reflex.** M2's rules and the
  sentence's `trap` both say it is asked of somebody you have not seen for a while. Authoring it as
  the automatic second half of `annyeonghaseyo` would have shipped fluent-looking nonsense.
- **The `ne`/`aniyo` interference is spent on one sentence and one rule**, not drilled. It is the
  single most confusing thing in an early Korean conversation, and it cannot be practised properly
  until there are negative questions to answer — which is M3's ground.

---

## Open questions for a later native or fluent-Korean pass

1. **`Oraenmanieyo` as a standalone hero sentence.** It is correct and common, but a native
   reviewer should say whether it is natural as the *opening* line the module presents it as, or
   whether it more usually follows `annyeonghaseyo` in the same breath (the module's variations
   show it both ways, which may be hedging).
2. **`jal jinaeyo` as the answer to `jal jinaeseyo?`.** Confirm that a bare `jal jinaeyo` is what a
   Korean speaker actually returns, rather than `ne, jal jinaeyo` or `deokbune jal jinaeyo`.
3. **`i-geo-neun` versus the contracted `i-geon`.** This course writes the full form throughout for
   index stability. Confirm the full form does not read as stilted in speech.
4. **The M1 `sound` lines' three-way stop descriptions.** Written for an English ear ("neither
   English g nor English k"); a native reviewer should check that the descriptions do not push a
   learner towards the aspirated series.
5. **M2-S10's `mistake` is situational rather than grammatical** — perfect Korean said to the wrong
   person. Confirm that framing lands, since every other plate in the two modules is ungrammatical.
6. **Naturalness of the pool turns generally.** Thirteen items per module were recombined from the
   cumulative index; an LLM can keep them grammatical but cannot hear which ones nobody would say.
