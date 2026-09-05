# hi-en L1 — spoken English, not textbook English (LLM editorial pass)

**Date:** 2026-09-05 · **Reviewer:** Claude, LLM review, authorised by the repo owner ·
**Bar:** LLM review plus owner authority — the bar the course already shipped on (`docs/11`–`13`).
**No native reviewer has read these edits.** This pass changes what the learner is asked to say,
so it is recorded sentence by sentence; every rewrite reverts by file.

---

## Why

The course's stated goal is speaking. An audit of the 100 hero sentences against how a native
speaker actually says them found ~40 that were grammatical but never said (`I am from India`,
`I will go to Delhi tomorrow`, `I'm fine, thank you`, `I think that the tea is good`), and two
that taught the wrong meaning: **`sleep late`** means _get up late_ in English, the opposite of
देर से सोना; **`worked at home`** where the fixed idiom is _work from home_.

Two of the first pass's own brief decisions produced the bulk of it, and both are withdrawn here
(`tools/course-briefs.ts`, "Contractions are single index surfaces"): withholding `I'm` until M2
so that `am` could be "M1's lesson", and teaching M6 with `will` because `will` was "M6's lesson".
A learner drilling `I am a student` fifteen times is drilling a sentence nobody says.

---

## What changed — 41 heroes

**Contractions** (13): M1 S02–S06 `I'm …`; M2-S05 `What's your name?`; M7-S04 `Where's my bag?`,
M7-S09 `There's a book on the table`; M6-S03/S04/S06/S09 `She's / They're / We're …`; M9-S04
`isn't`, M9-S08 `She's angry`; M10-S02/S03/S10. New rows: `I'm` (M1-S02, moved from M2-S04, forms
`I'm · I am`), `What's`, `Where's`, `There's`, `She's` (+`He's`), `They're`, `We're`, `isn't`
(+`aren't`), `That's`, `I'll` (+`I will`), and `wasn't · weren't` as forms on M1's `be` row.

**Plans, not `will`** (M6, 6 heroes): `I'm going to Delhi tomorrow` · `Are you coming tomorrow?` ·
`She's buying a car tomorrow` · `They're eating at home tomorrow` · `I'm starting English classes
next week` · `I'll call you tomorrow` (a promise — where `will` belongs). Rules r0–r3 rewritten:
`be + -ing` for arranged plans, `going to` for intentions _and_ for `going to + place`, `will` for
promises, decisions and offers (`Will you buy tea tomorrow?`). The `will` row now lives on S10 with
`won't · She'll · He'll · We'll · They'll · You'll`.

**Meaning** (5): M9-S05 `Why do you go to bed late?`, M9-S06 `I go to bed late …`, M10-S03 `I'll go
to bed early`, two pool items — `go to bed` is a three-token row with `goes / went to bed`; `sleep`
has no row. M5-S05 `He worked from home yesterday`.

**Textbook phrases** (17): `I'm good, thanks` (M2-S04, M10-S02; `good` row moves from M9-S09 to
M2-S04, `thanks` a form of `thank you`); `Do you want some tea?` (`some` row); `Do you take sugar?`
(`take` row); `She works on Mondays` (`Mondays` form); `I had rice yesterday` / `She had tea
yesterday morning` (`had` row replaces `ate`; `yesterday morning · this morning` row replaces
`drank`); `That's ten rupees` (replaces `It costs`), `Just one apple, not two` (`Just` row), `Five
bananas are twenty rupees`; `I think the tea is good` (`that` kept as a row, dropped from the
hero); `I don't want coffee because it's late` / `It's late, so …` (a reason that holds — tired
people want coffee); `I'm hungry, so I'm going to eat`; `I've got a new book. It's really good.`
(`I've got` row; M10 rule r3 now teaches _pronoun on second mention_, not _the on second mention_);
`I like coffee too` (`too` row, `also` a form); `Sorry, I got up late`; `Okay, thanks. Bye, Rohan.`
(`Bye` heads the row, `Goodbye` a form); `really` (M10-S03 row).

**Cues** — every Hindi field moved to the spoken register by global replacement: शिक्षक/शिक्षिका →
टीचर, विद्यार्थी → स्टूडेंट, सुप्रभात → गुड मॉर्निंग, धन्यवाद → थैंक यू, अलविदा → बाय, संगीत → म्यूज़िक,
व्यस्त → बिज़ी.

**Kept on purpose:** M5-S09 `I was happy yesterday` (the audit called the content odd; `happy` has
no other natural home in M5 and the sentence is not wrong); M10-S05 `My sister is a teacher` (a
full-noun subject is said uncontracted); `How much does it cost?` (native as a question; only the
answer moved off `cost`).

---

## Mechanics the pass had to respect

- The word index is cumulative and first-occurrence-wins, so every moved row was moved, not
  duplicated: `I'm` M2→M1, `good` M9→M2, `coming` S09→S02 (M6), `will` S01→S10 (M6).
- Every comprehension-pool token must resolve (`checkComprehensionPool`): 22 pool items rewritten;
  the build is the proof.
- `src/course/types.test.ts` forbade any `'s` but `it's` in a hi-en display; it now allows a
  contracted `is`/`has` on `it / what / where / there / she / he / that` and still forbids a
  possessive on a noun.
- Budget: `course:hi-en` 347.3 KiB gzip against 360.

## Gate

`content:validate` 90/90 · build (259 surfaces, `maxSpan` 3) · tsc · lint · 253 tests · live at
360 px: Sentence Detail M1-S02 shows `I'm` as its own row with `I'm · I am`; a practice card
resolves its "why" rows.

## What the owner is asked to ratify

- The 41 hero rewrites and their variations, mistakes and notes: `git diff a33f0e6 -- content/hi-en/`.
- The withdrawn brief decisions (M1 `I am`, M6 `will`) — a future hi-en level should follow this
  pass, not `docs/11`–`13`.
