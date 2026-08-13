# LLM review — en-ar L1-M1 and L1-M2

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Opus 5), which
does not speak Arabic, has never heard it, and cannot judge how any of this lands in a room.
`verified: true` on both modules rests on the repo owner's authority, exactly as hi-mr's flip did
in PR #190 and en-es's in #206; `verifiedBy` says so in words. **No native Arabic gate exists for
this course** — none is even scheduled — so the open-questions list at the bottom is not a
formality, it is the outstanding work.

Nothing here reaches a learner yet: `content/courses.json` still carries `fixture: true` on the
en-ar row, so the strict build skips the course entirely.

## What was authored

| | L1-M1 Who I am | L1-M2 First exchange |
|---|---|---|
| sentences | 10 | 10 |
| new word rows | 14 of 25 allowed | 15 of 25 allowed |
| pool items | 8 | 8 |
| tokens per sentence | 2–5 (bound declared 5) | 2–4 (bound declared 5) |
| module rules | 9 | 8 |
| enrichment | full (all five blocks, every sentence) | full |
| `script` line | on every sentence, word row, variation, mistake and pool item | same |
| prerequisites | `[]` | `["L1-M1"]` |

**M1 was re-authored, not extended.** What was there was a four-sentence `fixture: true` seam
proof (#118) whose job was to prove that a romanized course indexes its Latin `display` and never
its Arabic `script`. Four of its frames survive — `ismī …`, `anā min al-Hind`, `uḥibb al-…`,
`urīd …` — and everything else is new. The `fixture` flag is gone, so the module now carries the
full 10-sentence / 6-pool-item budget, and two of the fixture's index decisions were **reversed**
on purpose (see "Corrections", items 1 and 2).

Written strictly in ladder order through the #109 CLI, rebuilding the index between modules, so
M2's prompt was generated against M1's real cumulative inventory (26 surfaces). Both were authored
from the briefs in `tools/course-briefs.ts` (#198 / PR #215).

## The ratified decisions, and where they show

The variety and the romanization were settled in #198 and are not revisited here. What this pass
had to do was apply them without leaking:

- **Spoken-simple MSA, pause forms.** No case endings anywhere except the three lexical exemptions
  the header allows: the adverbial `-an` (`kathīran`, `shukran`, `marḥaban`), the frozen
  `as-salāmu ʿalaykum`, and verb/possessive person-suffixes. No dual, no passive, no `lam`/`laysa`,
  no literary vocabulary; every sentence is short enough to say.
- **Where MSA sounds bookish out loud, the `usage` line says so and `display` stays MSA.**
  M2-S04's `usage`: *"Understood everywhere and slightly bookish out loud — Cairo says izzayyak,
  Damascus kīfak. This course stays with the written standard."* No dialect form appears in any
  `display`, including the mistakes.
- **The person is written, the case and the mood are not.** `uḥibb` not `uḥibbu`; `ismuka` /
  `ismuki` / `ismuhu` in full because the suffix IS the person. Short vowels always written, so
  `min` (from) can never collide with a later `man` (who).
- **`ʾ` hamza and `ʿ` ʿayn kept apart**, word-initial hamza unwritten (`anā`, `urīd`, `uḥibb`),
  medial/final written (`māʾ`). `surface.ts` folds `ʾ` to `'` and leaves `ʿ` alone, so `māʾ`
  indexes as `mā'` and stays a different word from `mā`.
- **Assimilation always written, elision never, `wa` a free word.** `as-salām` and `ash-shāy`, not
  `al-salām` / `al-shāy`; `wa uḥibb` spaced even though the script writes وأحب joined.

### A fourth place where a vowel is written, reported not decided

`ismuka` / `ismuki` / `ismuhu` and `ḥāluka` / `ḥāluki` carry a `-u-` that looks like a nominative
case ending. It is not droppable the way `al-baytu` is: a noun with a pronoun suffix welded to it
has no pausal form to fall back on, so the vowel is medial and obligatory. This pass treats that as
an application of the header's verb-suffix exemption rather than a fourth exemption, and flags it
here so the next author does not "fix" it to `ismak` — which would be dialect.

## The slogan traps, and what was written instead

- **"Arabic has no verb to be"** → M1 rule 2 states the law and its boundary in one breath: *in the
  present, a statement that starts with a noun or a pronoun has no "to be" at all … This is the
  present affirmative only — the past has kāna (M5), and the present negative needs laysa, which L1
  never teaches.* The slogan on its own would leave M5's author contradicting M1.
- **"Arabic drops pronouns"** → split into the two halves that are actually true: the person lives
  in the verb prefix (rule 3), so a verbal sentence needs no pronoun, AND the pronoun is
  **obligatory** in a verbless sentence because nothing else carries the person (rule 4).
- **"Sun and moon letters are just pronunciation"** → M2 rule 4 says al- changes shape before half
  the alphabet and *this course WRITES the change*; M2-S10's mistake is `hal tuḥibb al-shāy?` with
  the why spelling out that `al-shāy` is not another spelling of the word, it is no word at all.
- **"Add -a to make it feminine"** → not taught. M1 rule 9 and M2 rule 8 name the **SUBJECT** as the
  agreer, never the speaker — *"A word that describes someone follows the SUBJECT of the sentence,
  not the person speaking: anā ṭālib from a man, anā ṭāliba from a woman — and Rohān ṭālib, Priyā
  ṭāliba, whoever says them"* — and M2 spells out the case that catches "speaker": `hal anti
  ṭāliba?` is asked **of** a woman, whoever is asking. This is the defect the third Marathi review
  had to correct three times (docs/08-marathi-third-review.md, corrections 1–3).
- **"al- = the, so use it where English uses the"** → M1 rules 7 and 8 are a matched pair of
  interference rules: a general statement KEEPS al- where English drops it (`uḥibb al-qahwa`), a
  request DROPS it where English keeps it (`urīd qahwa`). S05 and S07 are the same noun on both
  sides of the contrast.

## The index audit — where every token actually lands

Run against the emitted `public/content/en-ar/index/L1-M<n>.json` through the real engine
(`matchSurfaces` + `normalizeSurface` + `surfaceIndexKeys` from `src/engine/surface.ts`), resolving
each hit back to `modules/<id>.json → sentences[<sid>].deconstruction.words[<idx>]` — the exact row
`WhyPanel` would render. **Pool: 16 items, 43 tokens, 0 unresolved, 0 wrong-word landings.
Sentences: 20 sentences, 55 tokens, same result.**

### L1-M1 — 26 surfaces, maxSpan 1

| item | display | tokens → row |
|---|---|---|
| C01 | ismuhu Rohān | `ismuhu` → **ismī** (S01 #0) *forms-hit* · `rohān` → Rohān |
| C02 | yuḥibb al-qahwa | `yuḥibb` → **uḥibb** (S05 #0) *forms-hit* · `al-qahwa` → al-qahwa |
| C03 | anā ṭāliba | `anā` → anā · `ṭāliba` → **ṭālib** (S03 #0) *forms-hit* |
| C04 | uḥibb al-mūsīqā kathīran | `uḥibb` → uḥibb · `al-mūsīqā` → al-mūsīqā · `kathīran` → kathīran |
| C05 | urīd al-māʾ | `urīd` → urīd · `al-mā'` → **māʾ** (S08 #0) *forms-hit* |
| C06 | tuḥibb al-mūsīqā | `tuḥibb` → **uḥibb** *forms-hit* · `al-mūsīqā` → al-mūsīqā |
| C07 | Rohān min al-Hind | `rohān` → Rohān · `min` → min · `al-hind` → al-Hind |
| C08 | urīd qahwa wa māʾ | `urīd` → urīd · `qahwa` → **al-qahwa** (S05 #1) *forms-hit* · `wa` → wa · `mā'` → māʾ |

### L1-M2 — 50 surfaces cumulative, maxSpan 2

| item | display | tokens → row |
|---|---|---|
| C01 | kayfa ḥāluki? | `kayfa` → kayfa · `ḥāluki` → **ḥāluka** (S04 #1) *forms-hit* |
| C02 | anā bi-khayr | `anā` → anā (M1) · `bi-khayr` → bi-khayr |
| C03 | hal anta ṭālib? | `hal` → hal · `anta` → anta · `ṭālib` → ṭālib (M1) |
| C04 | naʿam, uḥibb ash-shāy | `naʿam` → naʿam · `uḥibb` → uḥibb (M1) · `ash-shāy` → ash-shāy |
| C05 | lā, anā ṭālib | `lā` → lā · `anā` → anā (M1) · `ṭālib` → ṭālib (M1) |
| C06 | hal anti min al-Hind? | `hal` → hal · `anti` → anti · `min` → min (M1) · `al-hind` → al-Hind (M1) |
| C07 | shukran, anā bi-khayr | `shukran` → shukran · `anā` → anā (M1) · `bi-khayr` → bi-khayr |
| C08 | hal tuḥibb al-mūsīqā? | `hal` → hal · `tuḥibb` → **uḥibb** (M1 S05 #0) *forms-hit* · `al-mūsīqā` → al-mūsīqā (M1) |

Edge punctuation is stripped per token by `normalizeSurface`, so `al-Hind?` and `ḥāluki?` and
`naʿam,` resolve exactly as their bare forms do — checked, not assumed: the `?` and `،` sentences
are in the walk above.

### The seven forms-hits, checked one by one

A forms-hit means the Why panel shows a row headed by a **different** string, so the row's note has
to be true of the surface the learner tapped. All seven are other shapes of the SAME word — never a
cousin, a synonym or a set of siblings, which is the bug class that shipped four times in hi-mr
(docs/07-llm-review-L1-M6-M10.md: M6-1, M7-2, M7-3, M8-1).

1. `ismuhu` → row **ismī** / "my name". Note names all four: *ismuka (your name, to a man) · ismuki
   (to a woman) · ismuhu (his name)*.
2. `yuḥibb`, 3. `tuḥibb` → row **uḥibb** / "I like, I love". Note: *the person is the prefix: u- =
   I, tu- = you (to a man) or she, ya- = he* — the tapped prefix is named explicitly.
4. `ṭāliba` → row **ṭālib** / "student". Note: *ṭālib describes a male student, ṭāliba a female
   one*. The row's cue is the bare gloss, so the header is true of both.
5. `al-mā'` → row **māʾ** / "water". Note: *Bare māʾ is water in general; al-māʾ is that particular
   water.*
6. `qahwa` → row **al-qahwa** / "coffee". Note opens *qahwa is coffee; al-qahwa is coffee with the
   article on it* and then gives the like/want contrast — the note the brief demanded.
7. `ḥāluki` → row **ḥāluka** / "your state". Note: *-ka is "your" to a man and -ki "your" to a
   woman*. The row's **cue was corrected** from "your state (to a man)" to "your state" during this
   pass, precisely so the header is not false for the tapped form (see Corrections 4).

`mudarris` (masculine) reaches the row headed **mudarrisa** the same way, from a `forms` entry; the
cue was corrected to the bare "teacher" for the same reason.

### The clitic law — every bare part key, and who owns it

`surfaceIndexKeys` indexes each hyphen part of a token against the same row, first occurrence
winning. Every bare part this content creates, and the row that answers for it:

| bare key | owner row | is the owner's note true of the bare key? |
|---|---|---|
| `al` | **al-Hind** (M1-S02 #2) | yes, and deliberately: the note defines the ARTICLE first (*al- is the definite article, "the", written onto the front of its noun with a hyphen … It belongs to the word, not beside it*) and glosses India second. This is the brief's instruction, and it is the row every later `al-` tap in the course lands on. |
| `hind` | al-Hind | yes — the note names both shapes and `forms` lists `Hind`. |
| `qahwa`, `mūsīqā`, `mā'` | their own `al-` rows | yes — each note is written for the bare and the article-ed form. |
| `as` | **as-salāmu ʿalaykum** (M2-S01 #0) | yes: *as- is the article al- with its l swallowed by the s that follows — a sun letter, written the way it is said.* |
| `salāmu` | as-salāmu ʿalaykum | yes (the note glosses salām). |
| `salām` | as-salām (M2-S02 #1) | yes, its own row. |
| `khayr` | **ṣabāḥ al-khayr** (M2-S03 #0) | yes: the note says *khayr is goodness*. This is the one part key whose owner is a phrase rather than the word itself — see below. |
| `bi` | **bi-khayr** (M2-S05 #0) | yes: *bi- is a one-letter word for "with" or "in" … The same bi- turns up in M8's bi-kam.* The brief's requirement, met. |
| `ash`, `shāy` | ash-shāy (M2-S10 #0) | yes: the note defines the assimilation and glosses the bare noun. |

**The one to watch: `khayr`.** `ṣabāḥ al-khayr` is a multi-token surface, so its hyphen part
`al-khayr` yields `al` (already owned by M1) and `khayr` (free, and taken here). `bi-khayr`, two
sentences later, therefore does NOT own the bare `khayr` — it owns `bi-khayr` and `bi`, which is
what its own sentences and pool items actually write. Nothing is mis-resolved today, because no
sentence writes bare `khayr`. **M3–M10's authors: a bare `khayr` will show the "good morning" row.**
If a later module wants `khayr` as a standalone noun, it must either write it multi-token or accept
that row.

### Reverse sweep

Every authored row's own `display` key and every `forms` key, checked against the final cumulative
index: **no row is shadowed** — every row owns the surface it is headed by, and every `forms` entry
resolves to its own row. The only keys any row does not own are the shared hyphen parts in the table
above, each of which is a deliberate first-occurrence assignment with a note written for it.

### Index seams decided here (they bind M3–M10)

- **Paradigms are NOT swept into `forms` when a later module owns the form.** `anā` ships
  `forms: []` and names anta/anti in prose, so M2's own `anta` and `anti` rows stay reachable — the
  fixture had `forms: ["anā","anta","anti","huwa"]`, which would have made M2 unreachable before M2
  existed. `urīd` ships `forms: []` for the same reason: M3 teaches `turīd` / `turīdīn`. Where no
  later module claims the shape — `uḥibb`'s three persons, `ṭālib`/`ṭāliba`, `ḥāluka`/`ḥāluki`,
  `mudarris`/`mudarrisa` — the paradigm stays in `forms`, which is also what Sentence Detail prints.
- **`lā` is written for both of its jobs now**, because M3 can never own the surface: the row says
  it is the answer "no" AND the "not" that goes in front of a verb (`lā urīd`). This is review 08's
  `का` correction applied before the bug exists.
- **Multi-token surfaces keep bare words free**, per the brief: `as-salāmu ʿalaykum` and
  `ṣabāḥ al-khayr` are single surfaces, so bare `ṣabāḥ` is unclaimed for M4's `fī aṣ-ṣabāḥ`
  (a different surface anyway) and bare `ʿalaykum` is owned by its own M2-S02 row.
- **No sun-letter noun in M1.** Every M1 noun is a moon-letter word (`al-Hind`, `al-qahwa`,
  `al-mūsīqā`, `al-māʾ`), so the sun-letter lesson lands where the brief puts it, in M2, and M2 owns
  `as` and `ash`.
- **Still unclaimed after M2, for the modules the briefs assign them to:** `an`, `ilā`, `fī`,
  `kull`, `matā`, `ʿind-`, `kāna`, `sa-`, `li-`, `turīd`, `ashrab`, `bi-kam`, `min faḍlika`
  (`min` itself is M1's, which is why M8's politeness formula must be multi-token), `ṣabāḥ`,
  `masāʾ`, `nūr`, `marḥaban`, `Miṣr`, `huwa`, `hiya`.

## Corrections applied during the pass

1. **The fixture's `anā` row carried `forms: ["anā","anta","anti","huwa"]`.** Reverted to `[]`: it
   would have handed M1 ownership of `anta` and `anti`, so M2's own gendered-you rows — the whole
   point of M2's second rule — would have been unreachable, and every `anti` tap in the course
   would have shown a row headed `anā`.
2. **The fixture's `al-Hind` note read "Country names usually take al-".** Rewritten to define the
   ARTICLE first, because that row owns the bare `al` key for the entire course (the brief's index
   seam). Its tag also moved `delta` → `interference`: the English habit of dropping "the" is what
   the row is warning about.
3. **`urīd qahwa` and `urīd māʾ` were originally in the other order**, which put the `al-`-dropping
   request before the `al-`-keeping general statement. Reordered so S05 (`uḥibb al-qahwa`) and S07
   (`urīd qahwa`) are the same noun two sentences apart, which is what makes the contrast visible.
4. **Two row cues described only one of the row's forms** — `ḥāluka` was cued "your state (to a
   man)" and `mudarrisa` "teacher (a woman)". Both rows answer for their other form through
   `forms`, so the cue a learner sees after tapping `ḥāluki` or `mudarris` would have been false.
   Cues trimmed to "your state" and "teacher"; the notes carry the split.
5. **M2-S03's `usage` originally said nothing about `yā`.** The brief's pattern is
   `ṣabāḥ al-khayr + , + name`, and bare-name address after a greeting is fine in writing — but
   speech says `ṣabāḥ al-khayr yā Rohān`. The usage line now says so rather than letting the
   comma-form pass as the spoken norm. (Open question 6.)
6. **M1-S07's mistake was originally `urīd al-qahwa`.** That is not wrong Arabic, it is a different
   meaning — and a `mistake` block is wrong-L2 by definition (PR #124). Replaced with `turīd qahwa`
   (right sentence, wrong person) and `urīd al-qahwa` moved to a variation where it belongs.

## Verification

- `npm run content:validate` → **CONTENT 22/22 ok**, no `fixture` flag on either module
- `npm run content:build -- --with-unverified --with-fixtures` → `en-ar: 2 modules (L1-M1..M2)`,
  `index L1-M1: 26 surfaces`, `index L1-M2: 50 surfaces`, and **no `warn … carries no script line`**:
  every readable surface in both modules has its Arabic original
- `bash scripts/verify.sh` → `TYPES ok | LINT ok | TEST 1180/1180 ok | CONTENT ok | FONTS ok |
  BUILD ok | BUDGET ok`
- Payload, per-course (#207's model, dev build with all three courses):
  `course:en-ar` **7.0 → 27.8 KiB** gzip against a 360 KiB limit; `precache:en-ar` 244.0 KiB against
  590. The Naskh subset grew **2,348 → 10,228 raw bytes** as the Arabic character repertoire filled
  out, which is §8.4's "low tens of KiB at full L1" prediction tracking. Nothing else moved:
  `course:hi-mr` 340.3, `course:en-es` 71.3, `shell` 216.3, `first-paint` 173.9.

### Rendering — the first real Arabic on screen

Dev build with en-ar active, headless Chromium 151 over CDP at 390×844 dpr 2 (the box has no
system Naskh: any Arabic glyph not from the bundle would be attributable by name).

- **The quiet native line runs RTL and is set in the bundled face.** Every `.script` node on the M1
  and M2 module lists and on every sentence screen reports `dir="rtl"`, `lang="ar"`,
  `computed direction: rtl`, and `CSS.getPlatformFontsForNode` returns **`Noto Naskh Arabic`,
  `isCustomFont: true`, and nothing else** — 11–29 glyphs per line, zero system glyphs.
- **The romanized line runs LTR.** Every hero `display` reports `dir="ltr"` and paints left to
  right (first character box at x=20, last at x=113–328).
- **Visual order is right where the two directions meet.** Measured with `Range` per character:
  in `كيف حالك؟` the first character sits at x=307 and the last (`؟`) at x=253 — the question mark
  is at the LEFT end of the line, which is where RTL puts it. Same for the Arabic comma in
  `صباح الخير، روهان` (first 302, last 213) and `أنا بخير، شكرًا` (first 366, last 296). No
  sentence in either module contains a digit; the first en-ar digits arrive with M8's prices, and
  that is the module to re-run this check on.
- No console errors, no failed requests, one `200` for the Naskh woff2.

**Found while looking, NOT fixed here: the romanization's diacritics are not in Mukta.** Probed a
character at a time through `CSS.getPlatformFontsForNode`: `ā ī ū ḥ ṣ ḍ ṭ ẓ ʾ ʿ` (U+0101, U+012B,
U+016B, U+1E25, U+1E63, U+1E0D, U+1E6D, U+1E93, U+02BE, U+02BF) all fall out of the bundled Mukta
to the system's DejaVu Sans, while the plain ASCII letters beside them are Mukta. So the 32px hero
line paints in two faces — `Rohān` renders with a visibly taller, differently-weighted `ā`. This is
a font-pipeline gap (#197 gave the Arabic line a face and left the romanized line on Mukta), not a
content defect, and it predates this content: the four-sentence fixture had it too. It is filed
separately rather than fixed here, because the fix touches `src/fonts.test.ts`'s pinned face
inventory.

## Open questions for a native pass

Nothing below has been changed in the content. These are the calls where guessing would be worse
than asking — register, naturalness, and every phonetic claim. **No native Arabic reviewer exists
for this course**, so this list is the honest state of the modules, not a nice-to-have.

### Register and variety

1. **Is "spoken-simple MSA" a register a person actually uses?** The whole course rests on #198's
   answer that it is: educated-neutral Arabic said out loud, pause forms, no case endings. A native
   speaker should read all twenty sentences and say which of them nobody would ever say in that
   shape, whatever the grammar books allow.
2. **`kayfa ḥāluka?`** is flagged in its own `usage` line as bookish beside `izzayyak` / `kīfak`.
   Is naming two dialects in a beginner's usage note the right call, or should L1 simply say "this
   is the written standard" and leave dialects to a later course?
3. **`anā saʿīd` for "I am happy".** Grammatical; is it what someone says, or does it read as
   "pleased (to meet you)" and want `mabsūṭ` (dialect) or nothing at all?
4. **`urīd qahwa` as a request.** The usage line calls it direct rather than rude. Is bare `urīd …`
   what a person says in a café, or is the native reflex `min faḍlika, qahwa` — which L1 cannot
   teach until M8?
5. **`anā bi-khayr, shukran`** as the standard answer to `kayfa ḥāluka` — or is the real reflex
   `al-ḥamdu lillāh`, which this course has deliberately kept out of L1 for being formulaic-religious
   rather than grammatical?
6. **The vocative `yā`.** M2-S03 writes `ṣabāḥ al-khayr, Rohān` because the brief's pattern is
   `greeting + , + name`, with the `yā` mentioned only in `usage`. Should `yā` be a taught word in
   M2 instead? It is one syllable and it is everywhere.
7. **`wa ʿalaykum` as a short reply** (M2-S02 variation) — real, or a shortcut only some regions
   take?
8. **`ṣabāḥ an-nūr`** as *the* reply to `ṣabāḥ al-khayr` (M2-S03 variation). Is it universal, or
   Levantine/Egyptian-flavoured?
9. **Register chips.** Every sentence in both modules is `neutral`; the enum's only other value is
   `informal`. MSA's own register axis (`anta` vs `ḥaḍratuka`) has no chip, and singular `anta`/
   `anti` to a stranger may be exactly the thing a chip should be warning about.

### Naturalness of the vocabulary chosen

10. **`al-mūsīqā`** — is "I like music" the natural second like after coffee, and is `mūsīqā` the
    everyday word?
11. **`kathīran`** placed after the object (`uḥibb al-Hind kathīran`) — natural, or does a native
    prefer `uḥibb al-Hind jiddan`, or a different construction entirely?
12. **`mudarrisa` vs `muʿallima`** for "teacher". Both are standard; which does a beginner meet
    first?
13. **`anā ṭālib` with no `wāḥid`** is right, but is `ṭālib` alone how someone answers "what do you
    do?", or would they name the subject (`ṭālib handasa`)?
14. **`ismī Rohān`** — for an Indian learner introducing themselves. Is `ismī` the everyday
    introduction, or does `anā Rohān` do the work in practice?

### Sound notes — the author cannot hear any of this

15. Every `sound` line in both modules is derived from written descriptions of MSA phonology, not
    from listening: `ḥ` as "a hard breathy h from the throat", `q` as "a k made right at the back",
    `ʿ` as "a squeeze deep in the throat", `ṭ`/`ṣ` as "heavy" with the tongue low, `kh` as Scottish
    *loch*, the final hamza of `māʾ` as the break in "uh-oh", the doubled `sh` of `ash-shāy`, and
    every stress mark in every capitalised syllable (`ISS-mee`, `u-ḤIBB`, `as-sa-LAA-mu`). Stress in
    particular is not marked in the romanization scheme, so those claims are the author's and carry
    no citation. A native ear should sample all of them.
16. **The elision note.** `fī al-…` is said *fi l-…* and this course writes the full form, putting
    the elision in `sound` — but M1 and M2 have no `fī` yet, so the first test of that convention is
    M4's. Worth checking then that `sound` is the right home for it.

### Pedagogy calls the owner decides

17. **Two-token surfaces as vocabulary.** `as-salāmu ʿalaykum` and `ṣabāḥ al-khayr` are taught as
    single units, which is right for the index and hides that `ṣabāḥ` is a word. Should a later
    module break them apart?
18. **M1 teaches only the first person.** Every sentence is `anā …` / `u-…`; the other persons live
    in `forms`, notes and variations. Right for "introduce yourself" — but is it the right first
    taste of a language whose whole grammar is affixes?
19. **The mistakes are all English-driven, by design.** None of them is a mistake an Arabic-speaking
    child makes, or one a dialect speaker makes moving into MSA. Is the L1-interference framing
    complete enough for Arabic, where the biggest real-world interference is between MSA and the
    learner's target dialect?
