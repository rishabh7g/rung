# en-ko L1-M6 … L1-M10 — LLM review (#379)

**Date:** 2026-08-30 · **Reviewer:** Claude Opus 5, LLM review, authorised by the repo owner ·
**Bar:** LLM review plus owner authority. **No native/fluent-Korean gate exists on this course.**

With these five, the en-ko L1 ladder is complete: ten modules, 100 hero sentences, 300 variations,
130 comprehension items, and a cumulative index of **178 surfaces** through L1-M10.

---

## What was authored

| | M6 Tomorrow | M7 Where things are | M8 Numbers & shopping | M9 Feelings & opinions | M10 Connected talk |
| --- | --- | --- | --- | --- | --- |
| sentences | 10 | 10 | 10 | 10 | 10 (turns) |
| variations | 30 | 30 | 30 | 30 | 30 |
| pool items | 13 | 13 | 13 | 13 | 13 |
| cumulative index | 127 | 142 | 163 | 174 | 178 |

Every sentence in all five carries `sound`, three variations, a `mistake`, `usage` and a
`mnemonic` — the full M1–M3 enrichment, kept up the whole ladder rather than tapering.
`checkScriptMode`: **zero errors** across all ten modules of the course.

---

## The five risks #379 named, and what happened

### 1. M7's `-e` / `-eseo` split

Authored as one rule with the test stated in terms of the VERB, not the place: existence and
destination take `-e`, an action takes `-eseo`. Four of M7's ten sentences turn on it and three
`mistake` plates are the wrong marker — deliberately, because it is the module's whole difficulty.
M10-S05 puts both markers in one turn (`jip-e … eopseoyo. Geuraeseo hakgyo-eseo masyeoyo`), which
is the honest test of whether it stuck.

`-e` stays **one row**, opened in M4 for time and extended here to place, exactly as the brief
planned. The emitted index confirms: `e` → L1-M4-S01. M7 opened no rival.

### 2. M7's position nouns

`wi` and `yeop` are authored as nouns following their noun and taking `-e` themselves
(`chaeksang wi-e`). Both earn their own index key through the hyphen (`wi` → M7-S05, `yeop` →
M7-S09) and the bare `chaeksang` keeps its own row. `arae`, `ap` and `dwi` were **cut** — the word
cap does not stretch to five position nouns, and two teach the pattern as well as five would.

### 3. M8's two number systems

Both sets are taught with their jobs stated: Sino-Korean for money (`samcheon won`, `ocheon won`),
native for counting things (`hana/han`, `dul/du`, `set/se`) with obligatory counters (`gae`,
`jan`, `myeong`). The shrinking rule has its own sentence and its own plate.

**The cap bound hard here**, exactly as the brief warned. What was cut rather than the honesty of
the rule: `net/ne` (four), every counter beyond the three above, and all Sino numerals below a
thousand as bare words. Prices are authored as whole compounds (`samcheon`, `ocheon`), which is
also what keeps the promise in `docs/34` §3 — the Sino-Korean `i` ("two") is never written bare, so
M1's subject-particle row keeps the key `i` (verified: `i` → L1-M1-S01).

### 4. M9's `joayo` / `joahaeyo`

Two rows, two keys, both reachable — `joayo` → L1-M9-S01, `joahaeyo` → L1-M1-S04 — and each note
names the other, so a learner who lands on either is told what it is not. M9-S01 through S03 spend
three consecutive `mistake` plates on the same error (the copula added to a describing verb),
which is deliberate: it is the error an English speaker makes first and repeats.

### 5. M10's speech level and pro-drop

Pro-drop is enforced rather than described: six of the ten turns have no explicit subject anywhere,
and M10-S02's `mistake` plate is a grammatical turn whose only fault is repeating `jeo-neun` —
the anglophone tell. Every verb in all five modules ends in `-yo`; the only `-mnida` forms in the
whole course remain M2's two frozen phrases, which `src/course/types.test.ts` now enforces.

---

## Index evidence

Every comprehension token in every module resolves, checked with the real `matchSurfaces` against
each module's emitted cumulative index:

| module | pool items | unresolved tokens |
| --- | --- | --- |
| L1-M6 | 13 | 0 |
| L1-M7 | 13 | 0 |
| L1-M8 | 13 | 0 |
| L1-M9 | 13 | 0 |
| L1-M10 | 13 | 0 |

Ownership spot-checks at L1-M10 (the largest index), each confirmed to carry a note that is true
where it lands:

- `hakgyo`, `hakgyo-e` and `hakgyo-eseo` all → L1-M7-S02, one row carrying all three forms. The
  brief flagged this as the seam to check: both marked shapes and the bare noun land on the row
  whose note explains the `-e`/`-eseo` split, so no reading is orphaned.
- `hana` and `han` → L1-M8-S08, one row; `dul` and `du` → L1-M8-S01, one row. The long and short
  shapes of one numeral share a note, as the brief required.
- `gal` and `geoyeyo` → L1-M6-S01; `meokgo` → L1-M3-S03, still M3's, which is right — M10 reuses
  the shape for a new job and its own rules explain the second job.
- `geurigo` → M10, `hajiman` → M10, `geuraeseo` → M9, `wae` → M9, `-aseo` → M9. No rivals.

Two build failures were hit and fixed by adding the used shape to the right row's `forms`
(`keopi-neun`, `keopi-ga`); one pool item was rewritten because it used `gasseoyo`, a past form the
course never teaches in a sentence — the fix was to change the item, not to smuggle the form in.

---

## Judgement calls a reader should be able to argue with

- **"Will sleep" is not taught.** `jal geoyeyo` would collide head-on with `jal` ("well"), which
  M2 owns — a learner tapping `jal` in a future sentence would be shown the adverb's note. Kept out
  of L1 by the same reasoning `docs/34` §3 uses for `cha` and `i`.
- **M6 teaches both futures and says the plain present is the commoner.** The module leads with
  `-(eu)l geoyeyo` because it is what a learner needs to recognise, and S05 and S10 show the present
  doing the same job more naturally.
- **M8 authors prices as compounds, not as numeral plus counter word.** It keeps the module inside
  the cap and it is how prices are actually said, but it means a learner finishes L1 able to say
  two prices rather than to build any price. That is a real limitation and it is stated here rather
  than hidden.
- **M9's `-aseo` clause is always first.** Korean allows nothing else, so no variation shows the
  reverse; the `mistake` plate on S05 is the reversed order.
- **M10 turns are two sentences, never three.** The brief allowed three; two proved enough to carry
  a connector and a contrast at this word cap, and three-sentence turns drifted into padding.

---

## Open questions for a later native or fluent-Korean pass

1. **`Bappaseo an gayo` as an answer** (M10-S07) — confirm a Korean speaker repeats the verb in the
   answer rather than saying only `bappaseoyo`.
2. **`Eoje jal jasseoyo. Geurigo achim-e ireonasseoyo.`** (M10-S06) — the two events are in the
   right order chronologically, but confirm `geurigo` is what a speaker would use rather than the
   clause-joining `-go`.
3. **`sagwa-reul se gae juseyo` versus `sagwa se gae juseyo`.** This course writes the object
   marker; in a shop it is very often dropped. Confirm the marked form does not read as stiff.
4. **`i-geo-neun eolmayeyo?`** — the full `i-geo-neun` rather than the contracted `i-geon`, and
   whether a shop would more naturally say `i-geo eolmayeyo?` with no marker at all.
5. **`Cha-neun ocheon won-ieyo` for a menu price** — confirm the topic marker is what a shopkeeper
   would use rather than `-ga` or nothing.
6. **M9's `pigonhaeyo` and `bappayo` as hero adjectives** — confirm they are the two an early
   learner most needs, rather than, say, `johayo`/`silheoyo`.
7. **Naturalness of all 65 comprehension turns in these five modules.** They are grammatical and
   built only from taught surfaces; which of them nobody would actually say is exactly what an LLM
   cannot hear, and it is the largest single item a native pass owes this course.
