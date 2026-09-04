# Content, said once — LLM editorial pass (#404–#407)

**Date:** 2026-09-04 · **Reviewer:** Claude, LLM review, authorised by the repo owner ·
**Bar:** LLM review plus owner authority — the same bar every course in this catalogue ships on.
**No native reviewer has read these edits.** Every course carried `verifiedBy: "… LLM review,
authorised by repo owner"` before this pass, and this pass does not raise or lower that bar; it
records what changed so the owner can ratify or revert it file by file.

---

## Why

The P8–P11 screen work (#386–#403) cut what the app *shows*. The content audit behind
milestone 15 found the same duplication inside the files: a module carried pipeline bookkeeping
the app never reads (#404); the English gloss repeated the cue or the literal on most en-\*
sentences (#405); a `mistake.why` in the Hindi-L1 courses re-explained the rule the word note had
just given (#406); and 576 word notes ran past 200 characters, several past 500, because a note
had grown into a rule (#407). Each fact is now said once, in the field whose job it is.

---

## What changed, by issue

### #404 — the shipped module is the learner's module

- `ModuleContent` (`src/course/types.ts`) no longer declares `prerequisites`, `verified`,
  `verifiedBy`, `verifiedAt`, `fixture`, `complexity`; those names live in
  `PIPELINE_ONLY_MODULE_KEYS`.
- `tools/content-build.ts` strips those keys on emit (`shipModule`) instead of copying the file
  byte for byte. The authored files in `content/` still carry them — the validator and the
  native gate read the authored file, not the emitted one.
- `src/course/content.ts` stopped checking `complexity`; `src/course/types.test.ts` asserts the
  shipped shape.

### #405 — a gloss only where it says something new

- `checkGlossEn` now rejects a gloss where *either* language of the pair is English, and no
  longer requires one anywhere.
- Across the seven en-\* courses **572 glosses came off**: 330 repeated the cue, 119 repeated the
  literal, 99 near-repeated one (Jaccard ≥ 0.75 on tokens), and 24 were literals mislabelled as
  glosses (`lit. "…"`), which moved into an empty `literal`.
- **128 glosses remain** on en-\* (en-fr 6 · en-de 2 · en-ar 8 · en-ru 15 · en-es 28 · en-it 28 ·
  en-ko 41). Each is either a genuinely different English reading or a gloss carrying a note
  tail after an em dash (`lit. "Good days, Ana" — Spanish says it in the plural`). Those tails
  are teaching text, and dropping them would have lost it; the issue's criterion 1 ("no en-\*
  sentence carries `glossEn`") is therefore **not met by design**, and the criterion the code
  enforces is the weaker one above. hi-mr's 100 glosses are untouched — there the gloss is a
  third language and the only English on the screen.
- Briefs (`tools/course-briefs.ts`) and the prompt generator now describe the gloss as optional.

### #406 — a mistake names the error; the note holds the rule

- **88 `mistake.why` rewritten**: hi-en 56, hi-mr 32 — every one in the two Hindi-L1 courses.
- Shape after: the error named in one clause, then the correct form —
  `is वाक्य के आख़िर में रह गया. सही: My name is Rohan.` ·
  `नाव नपुंसकलिंग है. सही: माझं नाव.`
- Token overlap between a `why` and its sentence's word notes fell from 40–60 % typical to
  **2 sentences in hi-en, 0 in hi-mr** with any overlap above the threshold.

### #407 — a note is one fact and one example

- `NOTE_MAX_CHARS = 200` in `tools/validate.ts`; the validator fails a note over it, with the
  path and the instruction "one fact and one example, and a rule belongs in `rules`".
- **576 notes rewritten**, every note that was over 200: en-de 135 · en-ko 89 · hi-en 78 ·
  en-ru 70 · en-ar 68 · en-fr 52 · en-it 39 · en-es 36 · hi-mr 9. Longest before: 604 (hi-en
  `There is`). After: **0 over 200**, across 1 540 notes.
- Method, note by note: keep the first fact and the sharpest example; keep the cross-reference
  to the module that owns the rule (`M4`, `S05`); drop restated rules, second and third
  examples, and register asides. Nothing the note said is contradicted; what was cut is either
  already in `rules` or is a further example of the same fact.
- Two things the pass deliberately did not do: it did not move cut material into `rules` (a
  rule row is a design decision per module, not a spill-over), and it did not touch the 964
  notes already under the ceiling.

---

## Gate

- `npx tsc -b` · `npm run lint` · `npx vitest run` (252 tests) · `npm run content:validate`
  (90/90) · `npm run build` — all clean.
- Live at 360 px: en-es L1-M1-S01 shows the literal alone; hi-mr L1-M1-S01 shows gloss then
  literal; hi-en and en-ko L1-M1-S01 word plates render every note under the ceiling, no
  horizontal overflow.

## What the owner is asked to ratify

- The 128 kept glosses (`grep -l glossEn content/en-*/modules/*.json`) — keep, or cut the note
  tails into `note`/`trap` and drop the glosses to meet #405's criterion 1 literally.
- The 576 note rewrites and 88 `why` rewrites: `git diff b1cc969 -- content/` is the whole
  editorial record. Any single rewrite can be reverted by file without touching the code.
