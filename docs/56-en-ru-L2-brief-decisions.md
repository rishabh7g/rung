# en-ru L2 — the authoring-brief decisions (#429)

The ten en-ru L2 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['en-ru']` L2-M1…L2-M10), pinned
against the REAL cumulative index — `public/content/en-ru/index/L1-M10.json`, rebuilt and read on
2026-09-08: **228 surfaces, maxSpan 3**.

The seven L1 decisions carry unchanged: the romanization scheme; **a stress mark on every
polysyllable** and none on a monosyllable; `ё` written `yó` in `display` and `ё` in `script`, with
`е` never merging into it; one row per noun carrying its case shapes in `forms`; aspect pairs on
separate rows.

## 1. The cases — which enter where, and the one that does not

L1 held to nominative and accusative plus two seats it could not avoid: the prepositional after
`v`/`na` (M7) and the genitive after numbers and `u` (M4, M8). L2 finishes what the ten jobs need:

- **Dative at M1** — `Dáyte mne…`, and with it the **dative-subject frame** (`Mne núzhno`), a
  sentence with no subject at all, which L1-M9's `Mne nrávitsya` used without naming.
- **Genitive at M3** — `net` + genitive for absence (`Zdes' net magazína`, subjectless again) and
  the genitive of quantity (`mnógo vodý`), which finally gives L1-M6's `mnógo` and L1-M10's
  `nemnógo` their complement, and retroactively explains L1-M8's `rubléy` and L1-M4's `chasóv`.
- **Accusative of motion at M4** — `v magazín` against L1-M7's `v magazíne`. For an inanimate
  masculine noun the accusative is the nominative, so it costs no new key; the contrast is taught
  in a rule and shown in the feminine (`v Moskvú`).
- **Genitive of comparison at M9** — `Moskvá ból'she Peterbúrga`. It is what a Russian says, it is
  shorter, and it spends M3's case rather than opening a conjunction. `chem` is named in `usage`
  as the always-available alternative and as the required one when the compared things are not
  both bare nouns.

**The instrumental stays OUT**, and M4 takes the decision on the record: "by bus" is both `na
avtóbuse` and `avtóbusom`, and this course teaches `na avtóbuse` — one preposition and one case
the learner already owns from `na rabóte` — rather than opening a fifth case for a single frame.
`peshkóm` enters as a WORD with a `usage` line saying it is a frozen instrumental and not a
pattern. Same treatment for L1-M4's `útrom` / `vécherom` / `nóch'yu` at M6.

## 2. Aspect — at M1 in the imperative, at M10 in the narrative

L1 shipped both members of half a dozen pairs on separate rows without teaching the choice. L2
teaches it in the two places it decides what a sentence means:

- **M1, the imperative.** `Skazhíte` (one act) against `Govoríte` (proceed, keep going). The half
  a learner cannot guess: a HOST uses the imperfective (`Sadítes'`, `Prokhodíte`), and the
  perfective in that seat lands as an order. M5 spends this at a table and points back.
- **M10, the narrative.** Perfective moves the account one completed whole at a time; imperfective
  paints the standing situation. The slogan to kill is the one en-es's M10 kills in Spanish —
  "perfective is completed, imperfective is ongoing" — false the same way: `Ya dva chasá chitál`
  is bounded and imperfective, `Ya prochitál za dva chasá` is perfective, and the reading took the
  same two hours.

The diagnostic the learner already owns: **the perfective has no present tense**, which is why
L1-M6's `napishú` and `pozvonyú` are futures.

## 3. Register — `vy` stays the default, `ty` enters at M6, and the switch is an EVENT

L1's decision 2 stands. M6 pays for `ty`: the pronoun, `tebyá`, `tebé`, the `-esh'`/`-ish'`
second-singular of every verb the course owns, and the singular imperative. Chip mapping: `ty`
frames `informal`; the elaborated request (`Bud'te dobrý`, `Vy ne mózhete…?`) `formal`; plain `vy`
to a stranger **`neutral`**, because it is the unmarked default and chipping it `formal` would
make eight modules formal and say nothing. The fact that goes in `usage`, not a rule: the move
from `vy` to `ty` is negotiated out loud (`Davay na ty`), so a learner does not drift into it. M7
is written in `vy` throughout for a reason worth stating — on the phone you do not know who picked
up.

## 4. Forms and seams — L2 never edits an L1 file

A new case shape of an L1 noun is deconstructed in the L2 module that first shows it, on its own
row pointing back. Within L2: one noun, one row, every case shape this level shows in `forms`; an
aspect partner never on the same row; but two ADDRESSES of one imperative (`skazhí` / `skazhíte`)
do share a row, and M6 states the distinction.

Collisions with owners:

- **`net`** — "no" (L1-M2) and "there isn't" + genitive (M3), later "he's not here" (M7). One row,
  L1-M2's, and both later modules point back.
- **`yevó` / `yeyó`** — "his"/"him", "her"/"her". One row each (M2), note true of both.
- **`n-` after a preposition** — `u nevó`, not `*u yevó`; four keys, all authored at M2.
- **`éhto` is not `éhtot`** — L1-M1 owns the pointing sentence; M9's demonstrative declines and is
  a different word.
- **`lúchshe` serves two positives** — `khoroshó` and `khoróshiy`, exactly as `mejor` does in
  en-es. M9 owns it.

## What L2 withholds

The instrumental; the conditional `by`; reflexive verbs as a system (L1-M9's `nrávitsya` and
M10's `vernúlsya` ride as vocabulary); participles; the indeterminate motion verbs `khodít'` /
`yézdit'`, named at M4 and deferred; prefixed motion verbs beyond L1's `po-`/`pri-`; numbers above
a hundred.

## Bounds and shape

Bounds climb 8 → 10 (M1–M3: 8, M4–M7: 9, M8–M10: 10); `newWordCap` stays 25; pools are authored
to 12; M1–M3 ship fully enriched; M10's items are four-sentence accounts.
`npm run content:prompt -- en-ru L2-M1` renders from the real index, and the decisions above are
pinned by `tools/course-briefs.test.ts` (`en-ru L2: the decisions its briefs settle (#429)`).
