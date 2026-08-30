# en-ko L1-M3 · L1-M4 · L1-M5 — LLM review (#378)

**Date:** 2026-08-30 · **Reviewer:** Claude Opus 5, LLM review, authorised by the repo owner ·
**Bar:** LLM review plus owner authority. **No native/fluent-Korean gate exists on this course.**

---

## What was authored

| | L1-M3 Needs and wants | L1-M4 My day | L1-M5 Yesterday |
| --- | --- | --- | --- |
| sentences | 10 | 10 | 10 |
| variations | 30 | 30 | 30 |
| comprehension items | 13 | 13 | 13 |
| new word rows | 11 | 12 | 2 (plus past forms on existing rows) |
| cumulative index | 85 surfaces | 108 | 115 |

M3 ships the full M1–M3 enrichment. M4 and M5 carry the same five blocks anyway — every sentence
has `sound`, three variations, a `mistake`, `usage` and a `mnemonic` — because dropping them at M4
would have been a step down mid-ladder, not a rung.

`checkScriptMode`: **zero errors across all three**. No Hangul in any `display`, `forms` entry or
teaching field; the quiet Hangul line is on every sentence, variation and pool item.

---

## The three things #378 said were most likely to go wrong

### 1. M3's negation — one of three taught, two named

`an` is the course's negation and the only one written. `mot` and the long `-ji anayo` are named in
M3's rules as real and deferred, and appear in no `display` anywhere. One variation
(`Aniyo, jal mothaeyo`) shows `mot` in a cue-glossed line as the natural answer to "are you well?";
that is the single place it appears, it is not indexed, and it is flagged below as a question for a
native pass.

### 2. M4's stem classes, and a rule the brief did not anticipate

The `-ayo` / `-eoyo` / `haeyo` choice is authored as one rule with the spelling as its evidence:
`meogeoyo`, `masyeoyo`, `jayo`, `baewoyo`. Every verb row's `forms` carries only the shapes this
course writes.

The module also had to teach something the brief did not name: **negating a verb built from a noun
splits it**. `gongbu an haeyo`, never `an gongbuhaeyo`. This is a real and very common learner
error, it follows directly from the noun-plus-`haeyo` pattern the brief did ask for, and it is now
M4's rule 7, sentence S09 and that sentence's `mistake` plate. M5's S06 repeats it in the past
(`gongbu an haesseoyo`), which is where the split gets its second exposure.

### 3. M5's past infix, and where its index keys landed

The past forms initially landed on **M4's** rows, because M4's rows had listed them in `forms`
before M5 taught them. That was corrected rather than documented away: the past shapes were removed
from M4's rows, so the key now belongs to the M5 row whose note explains the infix.

Read off `public/content/en-ko/index/L1-M5.json` after the fix:

| key | owner | note the learner gets |
| --- | --- | --- |
| `meogeosseoyo` | L1-M5-S01 | the past piece inside the verb, nothing added in front |
| `masyeosseoyo` | L1-M5-S03 | the contracted stem keeps its contraction in the past |
| `jasseoyo` | L1-M5-S05 | the stem's own vowel swallows the ending's, in both tenses |
| `ilhaesseoyo` | L1-M5-S02 | how a `haeyo` verb forms its past |
| `baewosseoyo` | L1-M5-S07 | the `u` → `wo` contraction, then the tense |
| `haesseoyo` | L1-M5-S06 | the past of `do`, which unlocks every verb built on it |
| `eopseosseoyo` | L1-M5-S08 | absence is a verb, so it takes tense |
| `jinaesseoyo` | L1-M5-S10 | the past of M2's verb, and what it changes about the question |

**One documented exception: `gongbuhaesseoyo` stays on M4's `gongbuhaeyo` row.** M5 teaches that
verb only in its split negative shape (`gongbu an haesseoyo`), so it has no joined row there — and
M4's row is the one whose note explains the joining and un-joining in the first place, which makes
it the right home for the joined past rather than a leftover.

---

## Every comprehension token resolves, and to the right row

Run with the real `matchSurfaces` against each module's emitted cumulative index:

- **L1-M3** — 13 items, 0 unresolved
- **L1-M4** — 13 items, 0 unresolved
- **L1-M5** — 13 items, 0 unresolved

Spot-checks of *which* row, which is the part the build does not do:

- `L1-M5-C07 Jeo-neun eoje gongbu an haesseoyo.` → `jeo-neun` → M1-S01 (the `jeo` row) ·
  `eoje` → M5-S01 · `gongbu` → M4-S09 (the noun row, correct — it is a noun here) · `an` →
  M3-S08 · `haesseoyo` → M5-S06 (the past-explaining row)
- `L1-M4-C05 Oneul-eun gongbu an haeyo.` → `oneul-eun` → M4-S04 (the `oneul` row, whose note
  covers the topic marker on a day) · `haeyo` → M4-S09
- `L1-M3-C05 Mul-i eopseoyo.` → `mul-i` → M3-S01 (the `mul` row) · `eopseoyo` → M3-S07

Two build failures were hit and fixed by adding the shape to the right row's `forms` — `mul-i` and
`bap-i` — never by loosening a check. One variation was rewritten because it introduced an untaught
word (`sigan`).

---

## Judgement calls a reader should be able to argue with

- **M3 authored `bap-eul meokgo sipeoyo` as "I want to eat" rather than "I want rice".** `bap` is
  the meal as much as the grain, and the gloss says so; a literal "rice" gloss would teach a
  narrower word than Korean has.
- **M4 introduces two time words that refuse `-e`** (`oneul`, `maeil`) in the same module as three
  that take it. That is a lot of exception in one rung, and the alternative — teaching `-e` alone
  and letting M5 spring `eoje` on the learner — would have been worse.
- **M4-S04 uses `oneul-eun` (topic) rather than bare `oneul`** to show a day being set apart. The
  sentence's `trap` says that this implies a contrast, because a learner copying the pattern
  everywhere would sound as if they were always comparing days.
- **M5 teaches the copula's past on a third person** (`Yuna-neun haksaeng-ieosseoyo`) rather than
  on the learner, because "I was a student yesterday" is a sentence nobody says.
- **The past of `anieyo`** appears once, in an M5 variation (`haksaeng-i anieosseoyo`), and is not a
  hero sentence. It follows the rule the module already states, and spending a whole sentence on it
  would have crowded out the `eopseosseoyo` one, which teaches something new.

---

## Open questions for a later native or fluent-Korean pass

1. **`Aniyo, jal mothaeyo`** (M3 variation) — is that what a Korean speaker actually says for "not
   so well", or is `geunyang geuraeyo` / `byeollo-yeyo` the natural answer? This is the one place
   `mot` appears and it should either be right or go.
2. **`bam-e jayo` as a hero sentence.** Grammatical, but confirm it does not read as oddly literal
   ("I sleep at night" as a stated habit) where a speaker would say `iljjik jayo` or similar.
3. **`Oneul-eun ilhaeyo`** — confirm the topic marker on a day reads as the intended contrast and
   not as something heavier.
4. **The `gongbu an haeyo` / `an gongbuhaeyo` split.** The rule as authored is absolute. Confirm
   there is no register or region where the un-split form is heard, since the module's `mistake`
   plate calls it simply wrong.
5. **`Eoje jal jinaesseoyo?`** — confirm this is asked of a finished day, and that it does not read
   as asking about a longer stretch.
6. **`ireonayo` in M4-S01's variation set**, where `jeonyeok-e ireonayo` ("I get up in the
   evening") is used to show the marker moving. It is grammatical; a reviewer should say whether it
   is odd enough to distract.
7. **Naturalness of the 39 comprehension turns across the three modules**, as ever: they are
   grammatical and recombined from the taught index, and an LLM cannot hear which of them nobody
   would say.
