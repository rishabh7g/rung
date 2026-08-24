# LLM review — hi-mr, the surface pass (gap + paradigms)

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Fable 5), which
does not speak Marathi natively and cannot hear anything. `verified: true` on the four modules this
pass touched — L1-M4, L1-M6, L1-M7, L1-M10 — still rests on the repo owner's authority, exactly as
the three earlier hi-mr reviews say; each of the four was re-read whole here and now carries
`verifiedAt: "2026-08-24"`. **No native Marathi speaker has read a word of this course**, and the
open questions at the bottom join the 22 consolidated in `docs/08-marathi-third-review.md`.

This is issue **#282**, hi-mr's twin of #281 (`docs/14-llm-review-en-es-surfaces.md`), and it
changes no sentence, no word row and no rule — only `forms` lists and the notes that have to be
true of them. The earlier reviews audited what the course *teaches*; this one audits what it
*shows*: the variation lines under every sentence, which the build deliberately does not police (a
variation may carry an untaught token, and the Why panel drops what it cannot resolve). Eight
surfaces were displayed and taught nowhere, and the issue's second half asked M6 and M10 — the two
modules shipping `forms: []` on every row — for their honest paradigms.

## What was wrong, and what it is now

Method: the emitted index for **the module the line appears in** (not the last one — a variation a
learner reads in M6 has only M6's cumulative index behind it), walked through the real engine
(`matchSurfaces` + `tokenizeSurface`, `src/engine/surface.ts`), resolving each hit back to the row
`WhyPanel`/`WhyRow` would render. Measured on main @ c3105d7; the misses match the issue's list
(taken @ 979b139) exactly.

| surface | shown in | now resolves to | how |
| --- | --- | --- | --- |
| `झोपणार` | M6-S09, M10-S10 variations | **झोपतो** (M4-S06 #2) | the stem's future joins the verb's own row: `forms: ["झोपतो", "झोपते", "झोपतोस", "झोपणार"]` |
| `दुकानाजवळ` | M7-S08 variation | **दुकान** (M7-S06 #0) | the bent दुकाना- + -जवळ joins दुकान's case list: `["दुकान", "दुकानात", "दुकानाजवळ"]` |
| `पाच` | M8-S07 variation | — | **exemption 1** |
| `बोललो` | M9-S04 variation | — | **exemption 2** |
| `आम्ही` | M10-S06 variation | **आपण** (M10-S09 #0) | the two Marathi "we"s share the row: `["आपण", "आम्ही"]` — argued below |
| `येऊ` | M10-S06 variation | **येईन** (M6-S07 #1) | the आपण-cell of the plain future: `["येईन", "येशील", "येईल", "येऊ"]` |
| `जाऊ` | M10-S09 variation | **जाणार** (M6-S01 #1) | जाणे's only row carries its let's-form: `["जाणार", "जाऊ"]` — argued below |
| `प्रिया` | M1-S01 variation | — | **exemption 0**: a proper noun, never a word row in any course (#61) — the known gap, now on the record here |

**M1, M2, M3, M5, M8 and M9 were not edited.** M8's and M9's misses are exemptions that live in
this file, not in JSON; the rest of each module's variation surfaces already close from an earlier
module's row, which is what a cumulative index is for.

### The two new exemptions, and why teaching them would have been worse

Each of these would only resolve by landing on a row **headed by a different word** — the forms-hit
bug the hi-mr and en-es reviews have caught repeatedly (`docs/07-llm-review-L1-M6-M10.md` M6-1,
M7-2, M7-3, M8-1; `docs/14-llm-review-en-es-surfaces.md` exemptions 1–3). A learner who taps a word
and is shown a row glossed as a different word has been taught something false, which is worse than
being shown nothing: the Why panel drops what it cannot resolve, by design (`src/engine/wordIndex.ts`).

1. **`पाच`** (M8-S07, *मला पाच केळी द्या*). "Five" is a sibling of `दोन`, not a shape of it — the
   counting words are S02's *set*, and पाच never joined it. Landing it on दोन's row (glossed "दो")
   is exactly the sibling-set bug the en-es review refused for `buenas tardes`. No sentence display
   carries पाच to hang a row of its own on, and the ten-sentence budget is fixed. The variation's
   job is the frame — swap in any count — and its own changed line teaches the word in prose:
   *"दोन → पाच — गिनती बदली, केळी वैसी ही."*
2. **`बोललो`** (M9-S04, *मला राग आला, म्हणून मी बोललो नाही*). बोलणे "to speak" is a verb L1 never
   teaches — no row of the lexeme exists in any module, so there is no same-word home at all, and
   no display carries it. The variation's point is the म्हणून + negation frame (every other token
   resolves), and its changed line carries the sense: *"नतीजा बदला — चुप्पी; ढाँचा वही."*

### The two argued calls

**`आम्ही` on the `आपण` row.** These are different pronouns — inclusive and exclusive "we" — and
M10-S06's own changed line says आपण *cannot* replace आम्ही in that answer. What makes this a home
rather than a forms-hit is the M2 precedent the course already ships: `तू`'s row carries
`forms: ["तू", "तुम्ही"]`, two different second-person pronouns on the one row that teaches the
person-slot. आपण's row is the course's "we" row, its note now teaches the split explicitly —
*"Hindi's one हम is two Marathi words: आपण pointedly includes the listener, and आम्ही pointedly
leaves them out"* — and the S06 changed line's ruling (आपण यहाँ नहीं चलता) stays true of the
*sentence*. A native reviewer may still prefer आम्ही to wait for a row of its own in L2; open
question 1.

**`जाऊ` on the `जाणार` row.** M6 keeps येणे's two futures deliberately apart — S04's note rules
येईन "a different form, not a shape of येणार", so येऊ joined the -ईन row, never the -णार one. जाणे
has no such second row: जाणार (M6-S01) is the verb's only row in the course, and the shown जाऊ
(M10-S09's variation, *आपण उद्या घरी जाऊ का?*) either lands there or resolves nowhere. This is the
`hablar`-on-`hablaré` departure from the en-es pass: a same-lexeme home on the row whose subject
matter is the verb's future, with the note keeping the row's own story straight — *"the same verb,
not -णार bending"* — because the row's trap and mistake both insist जाणार itself never changes.
The alternative is a third exemption and a variation that teaches nothing; open question 2.

## The paradigm half — L1-M6 and L1-M10

Both modules shipped `forms: []` on every row. The honest answer differs per row — M6's own rule 1
says *"-णार itself NEVER changes … Only the आहे after it shifts with person"*, so most of the
future module genuinely has nothing to list — and every `[]` below is now a decision on the record
rather than an omission.

### L1-M6 — Tomorrow (12 rows: 3 now carry a paradigm, 9 stay empty)

| row | forms | why |
| --- | --- | --- |
| `उद्या` (S01 #0) | `[]` | a time adverb; nothing to conjugate |
| `जाणार` (S01 #1) | जाणार · जाऊ | the argued call above — जाणे's only row carries its shown let's-form |
| `करणार` (S02 #0) | `[]` | -णार is invariant (module rule 1); the person lives in आहे/आहेस/आहात, which M1's `आहे` row already lists |
| `उठणार` (S03 #0) | `[]` | same — S03's own note makes the stem-family the lesson, not a shape list |
| `येणार` (S04 #0) | `[]` | invariant, and its note rules the -ईन family OFF this row — the seam the test now pins |
| `करणार` (S05 #0) | `[]` | re-teach of S02; S05's note says it: "with तुम्ही only the auxiliary moves" |
| `पिणार` (S06 #0) | `[]` | invariant -णार |
| `नक्की` (S07 #0) | `[]` | "it never inflects" — its own note |
| `येईन` (S07 #1) | येईन · येशील · येईल · येऊ | the plain-future persons, with the आपण-cell M10-S06 shows; the note now names them |
| `शिकणार` (S08 #0) | `[]` | invariant -णार |
| `उठणार` (S09 #0) | `[]` | re-teach of S03 |
| `खाईन` (S10 #0) | खाईन · खाशील · खाईल | the same persons; खाईल already lives in this sentence's mistake line. खाऊ is deliberately absent — see the seams below |

### L1-M10 — Connected talk (11 rows: 1 carries a paradigm, 10 stay empty)

M10 is the revision module: nine of its eleven rows re-teach an earlier module's word, and under
first-occurrence-wins they own no index key — every "why" tap on their surfaces resolves to the
first-teach row, which is where each paradigm already lives. Repeating those lists here would fork
a paradigm's source of truth across two files; the `[]`s are deliberate.

| row | forms | why |
| --- | --- | --- |
| `कसा` (S01 #0) | `[]` | re-teach — M2-S02's row owns the key and the कसा/कशी/कसं/कसे list |
| `हवा` (S02 #0) | `[]` | re-teach — M3-S01's row owns हवा/हवी/हवं |
| `करणार` (S03 #0) | `[]` | re-teach — M6-S02's row; and -णार has nothing to list anyway |
| `आणि` (S04 #0) | `[]` | re-teach — M2-S03's row; a conjunction, invariable |
| `द्या` (S05 #0) | `[]` | re-teach — M8-S03's row; its informal partner दे is taught nowhere, but M8's row sits outside this pass — recorded, not fixed |
| `नक्की` (S06 #0) | `[]` | re-teach — M6-S07's row; an adverb |
| `म्हणून` (S07 #0) | `[]` | re-teach — M9-S02's row; a conjunction |
| `कुठे` (S08 #0) | `[]` | re-teach — M7-S02's row; question words never inflect |
| `आपण` (S09 #0) | आपण · आम्ही | the two "we"s — the argued call above |
| `भेटू` (S09 #1) | `[]` | the row IS the let's-cell; its other persons (भेटेन, भेटशील, भेटेल) are shapes the course never shows, and the -ऊ frame is taught by the row's own note and trap |
| `जाणार` (S10 #0) | `[]` | re-teach — M6-S01's row owns both जाणार and जाऊ |

## The additions-only proof

Index saved before (`public/content/hi-mr/index/*.json` at main @ c3105d7), rebuilt, compared key
by key: **0 lost, 0 moved, 9 distinct keys added**, `maxSpan` unchanged (1 throughout).

|        | M1  | M2  | M3  | M4  | M5  | M6  | M7  | M8  | M9  | M10     |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- | --- | ------- |
| before | 26  | 47  | 67  | 104 | 134 | 144 | 164 | 186 | 204 | 206     |
| after  | 26  | 47  | 67  | 105 | 135 | 151 | 172 | 194 | 212 | **215** |

The nine: `झोपणार` → M4-S06 #2, `जाऊ` → M6-S01 #1, `येशील`/`येईल`/`येऊ` → M6-S07 #1,
`खाशील`/`खाईल` → M6-S10 #0, `दुकानाजवळ` → M7-S06 #0, `आम्ही` → M10-S09 #0.

### Seams this pass had to steer around

- **M10's re-teach rows own no keys.** जाणार, करणार, कसा … resolve to their first-teach modules;
  putting जाऊ on M10-S10's जाणार row would have worked for M10's learner and no one else. It rides
  M6-S01 instead, and the test pins that M10 steals neither key.
- **`खाऊ` stays out of the index.** The plain future of खाणे has an आपण-cell too, but as a bare
  surface खाऊ is the everyday noun ("treat") — indexing it against a row glossed खाऊँगा would
  invent a homograph, the exact hazard `normalizeSurface`'s hamza/ʿayn rule exists to avoid in
  en-ar. The test pins its absence.
- **`झोपणार` crosses tenses to reach its row.** M4-S06's झोपतो is the verb's first and only row;
  its note now says the stem outlives the tense. M6-S03's उठणार note tells the same story in the
  other direction ("उठणे across three modules … only the ending moves the time"), so the course
  already teaches this way.

## What #286 inherits

`tools/content-build.test.ts` gains hi-mr's two seams, twins of en-es's:

1. **every hi-mr variation line** swept against *its own module's* index, pinned at three decided
   misses — one proper noun (`प्रिया`) and the two exemptions (`पाच`, `बोललो`). A third variation
   that resolves nowhere now fails the suite, so #286 has to *decide* about a new surface rather
   than discover it later.
2. the paradigm seams themselves (झोपणे's future on M4 with M5's past untouched, जाणार/जाऊ staying
   on M6-S01 against M10's re-teach, येणार/येईन staying sibling rows, खाऊ staying absent,
   दुकानाजवळ beside घराजवळ, आपण/आम्ही sharing one row while भेटू keeps its own).

## Verification

- `scripts/verify.sh` (full) →
  `TYPES ok | LINT ok | TEST 1327/1327 ok | CONTENT ok | FONTS ok | BUILD ok | BUDGET ok`
- the additions-only diff above, scripted over the saved index snapshot: 0 lost, 0 moved, 9 added
- the variation sweep re-run over the emitted index: exactly the three pinned misses remain
- Payload, measured: `course:hi-mr` 338.7 → **339.3 KiB** gzip against 360 (+0.6 KiB of forms and
  prose), `precache:hi-mr` 553.3 → **553.9 KiB** against 590; `shell` and the other three courses
  unmoved.

## Open questions for a native pass

These join the 22 consolidated in `docs/08-marathi-third-review.md` (23–30, continuing its
numbering).

23. **`आम्ही` as a form of `आपण`.** Clusivity flattened into one `forms` list, on the M2 तू/तुम्ही
    precedent. Should the exclusive "we" wait for a row of its own in L2 instead?
24. **`जाऊ` on the `जाणार` row** — see the argued call above. The alternative is a third exemption
    and a variation that teaches nothing.
25. **`येशील` and `खाशील`.** The तू-cells of the plain future, listed but never shown in any
    sentence. Correct standard Marathi? And is showing them a help or a flood at this rung?
26. **`खाऊ` left unindexed** for the noun homograph. Right call, or does the future reading
    deserve the key?
27. **`झोपणार` on M4's present-habit row.** A cross-tense home on the verb's only row. Would a
    native reviewer rather see M6 spend a row on झोपणे?
28. **`पाच`.** Should some later rung teach the counting set पाच–दहा as rows, so number-swap
    variations resolve — or is "swap in any number" honestly outside the index's job?
29. **`बोललो`.** बोलणे "to speak" is never taught in L1 yet a variation leans on it. Candidate for
    early L2?
30. **Re-teach rows with empty `forms`.** M10's कसा shows no shape list in its own sentence detail
    while M2's कसा shows four. Acceptable asymmetry, or should re-teach rows mirror their
    first-teach lists?
