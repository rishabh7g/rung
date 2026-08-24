# LLM review — hi-en, the surface pass (gap)

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Fable 5), which
cannot hear anything and is not a fluent-English editor in the sense this course eventually needs.
`verified: true` on the one module this pass touched — L1-M1 — still rests on the repo owner's
authority, exactly as the three earlier hi-en reviews say; the module was re-read whole here and
now carries `verifiedAt: "2026-08-24"`. **No fluent-English gate exists for this course**, and the
open questions at the bottom join the 88 across `docs/11-llm-review-hi-en-L1-M1-M2.md`,
`docs/12-llm-review-hi-en-L1-M3-M5.md` and `docs/13-llm-review-hi-en-L1-M6-M10.md`.

This is issue **#284**, the fourth and last of the surface passes (#281 en-es, #282 hi-mr,
#283 en-ar), and it changes no sentence, no word row and no rule — one `forms` list and the note
that has to be true of it. The earlier reviews audited what the course *teaches*; this one audits
what it *shows*: the variation lines under every sentence, which the build deliberately does not
police (a variation may carry an untaught token, and the Why panel drops what it cannot resolve).
Like en-ar, this course has **no paradigm half**: no hi-en module ships `forms: []` across the
board (the `be`, `a · an`, `book · books` families have carried theirs since #270), so every row
not needed for the list below was left alone, per the issue. Unlike the other three courses, the
real story here is the **refusals**: ten of the eleven surfaces the issue names are sibling words
or deliberate reservations, and homing any of them would have been the forms-hit bug or an index
theft. One surface was taught; the rest are now decided exemptions on this record.

## What was wrong, and what it is now

Method: the emitted index for **the module the line appears in** (not the last one — a variation a
learner reads in M1 has only M1's cumulative index behind it), walked through the real engine
(`matchSurfaces` + `tokenizeSurface`, `src/engine/surface.ts`), resolving each hit back to the row
`WhyPanel`/`WhyRow` would render. Measured on main @ aba7650; the misses match the issue's list
(taken @ 979b139) **plus one the issue did not name**: `jaipur` in M1-S03's first variation, found
by the same engine sweep (the ṣabāḥ discovery of `docs/16-llm-review-en-ar-surfaces.md`, repeated)
and decided below with the other names.

| surface | shown in | now resolves to | how |
| --- | --- | --- | --- |
| `sharma` | M1-S01 variation | **Rohan** (M1-S01 #3) | the issue's own either/or, taking the teach side: the full name joins the name row — `forms: ["Rohan", "Rohan Sharma"]`, note extended with the surname rule — argued below |
| `farmer` | M1-S05 variation | — | **exemption class 1** (sibling word) |
| `actor` | M1-S06 variation | — | exemption class 1 |
| `cricket` | M1-S08 variation | — | exemption class 1 |
| `dogs` | M1-S09 variation | — | exemption class 1 |
| `hindi` | M1-S10 variation | — | exemption class 1 |
| `speak` | M3-S03 variation | — | exemption class 1 |
| `milk` | M3-S09 variation | — | exemption class 1 |
| `well` | M10-S02 variation | — | **exemption class 2** (declared untaught by its own changed line) |
| `now` | M10-S03 variation | — | exemption class 2 |
| `bus` | M10-S09 variation | — | exemption class 2 |
| `three`, `six` | M3-S10, M4-S01/S02 variations | — | **exemption class 3** (mandatory: docs/13 reserves `three`, `six`, `hundred` for later authoring; the issue forbids claiming them) |
| `jaipur` (M1-S03), `priya` (8 lines across M1, M2, M10) | variations | — | **exemption class 4** (names shown only in variation lines) |

Forward references were confirmed and left alone, per the issue: `mumbai` (M1-S02 → M2-S07),
`doctor` (M1-S04 → M2-S06), `coffee` and `water` (M1-S07 → M3-S05/S06) and `films` (M1-S08 →
M5-S08) all resolve on schedule from the module that teaches them — the en-es `es`/`quieres`
category. **M2, M4, M5, M6, M7, M8 and M9 were not edited**; no surface of theirs needed anything.

### The four exemption classes, and why teaching them would have been worse

1. **The sibling words** — `farmer`, `actor`, `cricket`, `dogs`, `hindi`, `speak`, `milk`. Each
   appears in exactly one variation, is a different word from the row its sentence teaches
   (farmer ≠ teacher, actor ≠ engineer, cricket ≠ music, dogs ≠ books, Hindi ≠ English,
   speak ≠ learn, milk ≠ sugar), and appears in **no sentence display to hang a row of its own
   on** — the ten-sentence budget is fixed. Landing any of them in a `forms` list would be the
   forms-hit bug the course family has refused in every pass: en-es's `profesor`
   (`docs/14-llm-review-en-es-surfaces.md`, exemption 1 — the exact profession-variation shape of
   `farmer` and `actor`), hi-mr's `पाच`, en-ar's `marḥaban`. A learner who taps a word and is
   shown a row glossed as a different word has been taught something false, which is worse than
   being shown nothing. What the learner gets instead: every variation carries its own full Hindi
   `cue` (*मैं किसान हूँ*, *मुझे कुत्ते पसंद हैं*, …), two `changed` lines gloss the word itself
   (`speak` = बोलना, `milk` = दूध), and the variations' actual lessons — the a/an frame, the
   plural `-s`, the no-article rule — resolve on the rows that teach them. `hindi` is the least
   costly miss in the course: the one English word every learner of this course already knows,
   and the `English` row's own note names it in prose (*भाषाओं के नाम हमेशा बड़े अक्षर से:
   English, Hindi*).
2. **M10's declared-untaught trio** — `well`, `now`, `bus`. These are not oversights: each
   changed line **says in words that the word is untaught** — *well इस सीढ़ी पर नहीं सिखाया,
   सुनने में आएगा* · *now = अब (इस सीढ़ी पर नहीं सिखाया)* · *bus इस सीढ़ी पर नहीं सिखाया, M6 के
   car वाली सूची का शब्द* — and glosses it in the same breath. That is an authoring decision
   already on the record in the shipped file, made when M10's recombination brief spent its 13
   rows on joiners and courtesies; this pass keeps it. They stay on the "free for L2" list
   (`docs/13`'s still-unclaimed roster), and the pin test now holds them there.
3. **The reserved numbers** — `three` (M3-S10), `six` (M4-S01, M4-S02). `docs/13` pins `three`,
   `six`, `hundred` as deliberately unclaimed, reserved for later authoring, and the issue makes
   not claiming them an acceptance criterion. Nothing to argue; they are now also pinned absent
   in the seam test, `hundred` beside them.
4. **The names** — `priya` (M1-S01, M1-S03, M1-S05, M2-S01, M2-S02, M2-S07, M10-S01, M10-S10)
   and `jaipur` (M1-S03, the sweep's find). hi-en is the one course where proper nouns ARE word
   rows — `Rohan`, `Delhi`, `India`, `Mumbai` each teach the capitalisation rule from a display
   seat — so #61's blanket ("proper nouns are never rows") is not the rationale here. The
   rationale is narrower: these two appear **only in variation lines**, which have no
   deconstruction to seat a row in, and their lessons are already taught — S01's `Rohan` note
   owns "names are capitalised", S03's `Delhi` note owns "cities are capitalised", and every
   variation cue glosses its line (*मेरा नाम प्रिया है*, *मैं जयपुर से हूँ*). A learner tapping
   प्रिया's line gets `My name is` resolved and the name dropped — exactly the en-ar `priyā`
   outcome.

### The one argued call: `Rohan Sharma` on the name row

The issue leaves `sharma` to the author: exempt it as a proper noun, or teach "surnames are
capitalised" on the name row. This pass teaches it, for three reasons. First, the row is **the
same name** — `Rohan Sharma` contains `Rohan` — so this is the en-ar `masāʾ al-khayr` ruling (a
phrase may join a row it shares a piece with), not the sibling-set bug (`marḥaban`, sharing
nothing, could not). Second, the surname rule is real teaching this course wants: the variation's
changed line has always said *दो शब्द, दोनों बड़े अक्षर से*, and the row's note now completes it —
*पूरा नाम लिखो तो उपनाम (surname) का भी: Rohan Sharma, दोनों बड़े अक्षर से* — so the tap lands on
a note that is true of the surface tapped. Third, the mechanics are theft-free: as a two-token
surface `rohan sharma` earns exactly one key (`surfaceIndexKeys` grants bare parts only across
hyphens, and this is a space), so bare `sharma` stays out of the index, `rohan` keeps its
unchanged ref, and the resolver's longest-match walk consumes the pair whole in the variation.
The cost is honest and stated: M1's emitted `maxSpan` rises 1 → 2 (its first multi-token
surface); no key's ref moves.

## The additions-only proof

Index saved before (`public/content/hi-en/index/*.json` at main @ aba7650), rebuilt, compared key
by key: **0 lost, 0 moved, 1 distinct key added** (`rohan sharma` → L1-M1-S01 #3, entering every
cumulative index), `maxSpan` M1 1 → 2, M2–M5 2 and M6–M10 3 unchanged.

|        | M1     | M2  | M3  | M4  | M5  | M6  | M7  | M8  | M9  | M10     |
| ------ | ------ | --- | --- | --- | --- | --- | --- | --- | --- | ------- |
| before | 23     | 39  | 56  | 90  | 108 | 126 | 148 | 171 | 188 | 202     |
| after  | **24** | 40  | 57  | 91  | 109 | 127 | 149 | 172 | 189 | **203** |

### Seams this pass had to steer around

- **Bare `sharma` earns no key.** The single check that made the homing safe: a hyphen part would
  have been granted (`surfaceIndexKeys`, #116 [Q3]) but a space-joined pair grants nothing bare,
  so no later module's row can ever be robbed by the surname, and no key-steal of the en-ar
  `an-nūr` kind was possible here.
- **`three`, `six`, `hundred` untouched** — the contractual reservation of `docs/13`, restated by
  the issue, now pinned in the seam test rather than only in prose.
- **`well`, `now`, `bus` untouched** — the M10 changed lines' own ruling, kept; a later pass that
  wants them must author them, not sweep them into a neighbouring row's `forms`.
- **Every sibling row keeps its own word.** `teacher`, `engineer`, `music`, `books`, `English`,
  `learn`, `sugar` and `fine` still head their rows; nothing landed on any of them, which is what
  the forms-hit refusals above amount to in index terms.

## What #288 inherits

`tools/content-build.test.ts` gains hi-en's two seams, twins of the other three courses', and
hi-en joins the [Q3] sentence-and-pool sweep (now four courses):

1. **every hi-en variation line** swept against *its own module's* index, pinned at
   twenty-seven decided misses — eight `priya` lines and `jaipur` (names in variations), five
   forward references (`mumbai`, `doctor`, `coffee`, `water`, `films`), the seven sibling words,
   M10's declared-untaught trio, and the reserved `three`/`six`. A new variation that resolves
   nowhere fails the suite, so #288's third-variation pass — and its "no sentence below two
   variations" work — has to *decide* about each new surface rather than discover it later.
   `rohan sharma` is now an index key it can lean on.
2. the seams themselves: the full name on the name row with bare `sharma` absent, the sibling
   rows unmoved, the reservations pinned, the forward references resolving on the later module's
   own rows.

If #288 rewrites any of the seven sibling-word variations to use taught words (the en-es review's
standing question 10), the pinned list shrinks and the pin must shrink with it — that is the
test doing its job.

## Verification

- `scripts/verify.sh` (full) →
  `TYPES ok | LINT ok | TEST 1331/1331 ok | CONTENT ok | FONTS ok | BUILD ok | BUDGET ok`
- the additions-only diff above, scripted over the saved index snapshot: 0 lost, 0 moved, 1 added
- the variation sweep re-run over the emitted index: exactly the twenty-seven pinned misses remain
- Payload, measured: `course:hi-en` 346.5 → **346.6 KiB** gzip against 360 (+0.1 KiB of forms and
  note), `precache:hi-en` 561.1 → **561.2 KiB** against 590; `shell` (214.6) and the other three
  courses unmoved.

## Open questions for a fluent-English pass

These join the 88 across the three earlier hi-en reviews.

1. **`Rohan Sharma` as a form of `Rohan`.** A full name listed as a "shape" of the first name is
   a category stretch the other courses never needed. The alternative was a fourth name
   exemption and a variation that taught its capitalisation rule only in prose. Right call?
2. **The seven sibling exemptions.** Every one is a word the course shows and never teaches.
   Would a fluent editor rather see those variations rewritten to use taught words (`I am a
   doctor` for S05, say, which resolves from M2 on) than left unresolved? #288's variation work
   is the natural place to take that up.
3. **`well`, `now`, `bus` at L2.** The changed lines gloss them and name them untaught. Should L2
   open rows for them early (all three are everyday words), or is the prose weight right until a
   sentence display carries them?
4. **`hindi` untaught in the Hindi→English course.** The learner knows the word; the `English`
   row's note names it. Still — is the one language name a learner will most want to tap worth a
   seat in a display at some rung?
5. **`jaipur`.** Should city variations stick to the taught cities (Delhi, Mumbai) so every line
   resolves whole, or is an occasional untaught proper noun in a variation harmless by design?
