# en-ru L3 — the authoring-brief decisions (#465)

The ten en-ru L3 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['en-ru']` L3-M1…L3-M10) are the
fifth L3 briefed, after hi-mr (`docs/50`), en-es (`docs/69`), en-ar (`docs/70`) and hi-en
(`docs/71`). Every seam below was pinned against the REAL cumulative index — the fold of
`public/content/en-ru/index/L1-M1.json` through `L2-M10.json`, rebuilt and read on 2026-09-08:
**588 surfaces, maxSpan 3** — and against the review chain the level inherits, `docs/45` (spoken
Russian) and `docs/64`'s L2 questions.

This note records the decisions the briefs are written to, so the authoring waves (#474, #483 and
the M6–M10 issue) inherit them without re-deriving anything. The briefs repeat each decision in the
module notes, because a prompt only ever shows an author the notes.

## 1. The course's own laws, unchanged

Romanized `display`, Cyrillic on the quiet `script` line, and **a precomposed acute on every
polysyllable** — the law since L1-M1 and the one #355's stress rule exists to catch. L3-M1's brief
restates it in a note rather than assuming it, because a reflexive ending does not take the stress
and `vozvrashcháyus'` keeps its acute where the stem had it.

Register carries from `docs/56` §3: `vy` is the default, `ty` was an EVENT at L2-M6, and L3 adds no
register rule. M8 (counters, offices) speaks `vy` throughout and chips `formal`; the rest follow the
scene.

## 2. What L2 withheld, and where each piece lands

`docs/56`'s "What L2 withholds" list names seven things. L3 takes **six** of them:

- **The instrumental → L3-M2.** L2-M4 chose `na avtóbuse` over `avtóbusom` on the record rather
  than open a fifth case for one frame. Work is where it can no longer be dodged, because Russian
  says `rabótayu inzhenérom` with no preposition at all.
- **Reflexive verbs as a system → L3-M1.** L1-M9's `nrávitsya` and L2-M10's `vernúlsya` rode as
  vocabulary with the shape unexplained; a day cannot be told without it.
- **The conditional `by` → L3-M4.** It is the simplest counterfactual machine of any course in this
  repo — past tense plus a particle, in both halves, no new endings at all — and that is worth
  naming as a relief, because the Romance courses spend a module on one.
- **Numbers above a hundred → L3-M8**, with the case-after-number rule finally stated: 1 nominative
  singular, 2–4 genitive singular, 5+ genitive plural, restarting on the last digit. L1-M8 shipped
  `rubléy` and L1-M4 `chasóv` without it; M8 explains both retroactively.
- **Prefixed motion verbs beyond `po-`/`pri-` → L3-M10** (`ushël`, `vyshel`, `zashël`,
  `priyékhal`), where a prefix is a direction and the stem stays the same.
- **The indeterminate `khodít'` / `yézdit'` → L3-M10**, named at L2-M4 as deferred, taken here as
  VOCABULARY inside the `ránshe` + imperfective frame. The determinate/indeterminate system itself
  is L4's.

**Participles stay out of L3 entirely.** No module needs one, and opening them here would spend the
level's remaining room on a shape the ladder does not ask for until L4/L5.

## 3. The comma law, stated once and pointed back at twice

Russian punctuation is grammar rather than style: every subordinate clause is fenced with a comma.
L1-M9 shipped `chto` without saying so, because it never had two clauses to fence. **M3 states it**,
**M5 points back at it** for reported clauses, and **M9 points back again** for `kotóryy`. By the
third time a learner should be able to predict it, and M9's note says so rather than repeating the
rule from scratch. That is the same discipline the seams use.

## 4. Seams — L3 never edits an L1 or an L2 file

- `bolít` is L2-M8's row. M7 points back and adds only the agreement fact — the body part is the
  SUBJECT, so `u menyá bolyát zúby` takes a plural verb, which a learner will not produce by
  instinct.
- `chto` stays L1-M9's row across all of its jobs, with M3's fencing note written true of them.
- `núzhno` stays L2-M1's row; M4's `nádo` is a separate word and its note says how the two differ.
- `nrávitsya` stays L1-M9's; M6's dative-subject family points back at it rather than re-teaching
  the shape.
- The `-sya` particle (M1) and the free pronoun `sebyá` (M6) look alike enough that M6's note marks
  the contrast explicitly rather than leaving a learner to merge them.
- `soglásen` (M3) and `rad` (M6) are the level's only two short-form adjectives, and M6 points back
  at M3 rather than teaching the short form twice.
- Every case shape — instrumental (M2), dative (M7), genitive singular and plural (M8), genitive
  dates (M9) — is its own key where it is a separate word, or a `forms` entry on its noun's row
  where it is a shape of one. **No L1 or L2 file is edited** — `docs/56` §4, unchanged.
- `potomú chto`, `mne kázhetsya`, `Nóvyy god` and `den' rozhdéniya` index **WHOLE**, so the bare
  `chto`, `god` and `den'` keys are not spent on a phrase. maxSpan stays 3.

## 5. The shape of the level

- Bounds climb 10 → 12: M1–M3 at 10 words, M4–M7 at 11, M8–M10 at 12 — continuing L2's 8 → 10.
- `newWordCap` stays the PRD §5 25 everywhere; pools are authored to 12.
- One absence is worth naming because four other courses in this repo spend a module on it:
  **Russian has no perfect.** M7's duration sentence is a present tense plus `uzhé`, and that is the
  whole mechanism.
- M10's items are six-to-eight-sentence accounts, and its real subject is **aspect at length**:
  L2-M10 taught the choice in four sentences, and eight is where a learner either has it or does
  not. The test of a good item is that swapping one aspect pair changes what happened, not only how
  it sounds.

`npm run content:prompt -- en-ru L3-M1` renders today from the real index, and the bounds, the
withheld-piece owners, the comma law's three appearances, the stress law and the L4 deferrals are
pinned by `tools/course-briefs.test.ts` (`en-ru L3: the decisions its briefs settle (#465)`).
