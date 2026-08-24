# LLM review — en-ar, the surface pass (gap)

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Fable 5), which
does not speak Arabic natively and cannot hear anything. `verified: true` on the six modules this
pass touched — L1-M1, L1-M2, L1-M4, L1-M6, L1-M8, L1-M10 — still rests on the repo owner's
authority, exactly as the three earlier en-ar reviews say; each of the six was re-read whole here
and now carries `verifiedAt: "2026-08-24"`. **No native Arabic speaker has read a word of this
course**, and the open questions at the bottom join the 61 across
`docs/07-llm-review-en-ar-L1-M1-M2.md`, `docs/09-llm-review-en-ar-L1-M3-M5.md` and
`docs/10-llm-review-en-ar-L1-M6-M10.md`.

This is issue **#283**, en-ar's third of the surface passes (#281 en-es, #282 hi-mr), and it
changes no sentence, no word row and no rule — only `forms` lists, the notes that have to be true
of them, and one `cue`. The earlier reviews audited what the course *teaches*; this one audits
what it *shows*: the variation lines under every sentence, which the build deliberately does not
police (a variation may carry an untaught token, and the Why panel drops what it cannot resolve).
Unlike en-es and hi-mr, this course has **no paradigm half**: no en-ar module ships `forms: []`
across the board, so every row not needed for the list below was left alone, per the issue. The
real gap was the **feminine second-person cluster** — the …-īn forms every "to a woman" variation
displays — plus the M2 greeting pieces and three M8 shapes.

## What was wrong, and what it is now

Method: the emitted index for **the module the line appears in** (not the last one — a variation a
learner reads in M2 has only M2's cumulative index behind it), walked through the real engine
(`matchSurfaces` + `tokenizeSurface`, `src/engine/surface.ts`), resolving each hit back to the row
`WhyPanel`/`WhyRow` would render. Measured on main @ 16069c7; the misses match the issue's list
(taken @ 979b139) **plus one the issue did not name**: bare `ṣabāḥ` in the same M2-S03 reply
variation, found by the same engine sweep and decided below with its phrase.

| surface | shown in | now resolves to | how |
| --- | --- | --- | --- |
| `tuḥibbīn` | M10-S06 variation | **uḥibb** (M1-S05 #0) | the verb's only row gains its feminine cell: `[uḥibb, tuḥibb, tuḥibbīn, yuḥibb]` |
| `masāʾ` + `al-khayr` | M2-S03 variation | **ṣabāḥ al-khayr** (M2-S03 #0) | the whole evening twin joins the greeting row: `forms: ["ṣabāḥ al-khayr", "masāʾ al-khayr"]`, cue widened to "good morning · good evening" — argued below |
| `tadhhabīn` | M10-S09 variation | **adhhab** (M4-S01 #0) | the issue's own mechanism: the tadhhab row gains tadhhabīn |
| `sa-tadhhabīn` | M6-S04 variation | **sa-adhhab** (M6-S01 #0) | the sa- future keeps its sibling row and gains the same cell |
| `sayyāratān` | M8-S05 variation | **sayyārāt** (M8-S07 #0) | the dual joins the noun's own plural row: `[sayyārāt, sayyāratān]` — argued below |
| `bi-riyāl` | M8-S08 variation | **riyālāt** (M8-S08 #1) | the row already listed bare `riyāl`; the priced shape joins it, on the bi-khamsa precedent |
| `sa-ashtarī` | M8-S10 variation | **ashtarī** (M8-S10 #0) | the note has always said "with M6's sa- in front it becomes sa-ashtarī"; the forms list now makes that tappable |
| `tatakallamīn` | M10-S07 variation | **atakallam** (M10-S07 #0) | same-sentence row gains its feminine cell |
| `marḥaban` | M2-S01 variation | — | **exemption 1** |
| `ṣabāḥ` + `an-nūr` | M2-S03 variation | — | **exemption 2** (the additions-only lockout) |
| `priyā` (M1-S01, M5-S09), `miṣr` (M1-S02) | variations | — | proper nouns — never a word row in any course (#61), on the record here as the issue requires |

**M3, M5, M7 and M9 were not edited.** Their variation surfaces already close from an earlier
module's row, which is what a cumulative index is for. `forms` entries are schema strings and
carry no `script` line by design (the row's own `script` covers its display; `ḥāluki` has shipped
that way since M2) — no new word row and no new variation line was added, so no new `script` line
was owed.

### The two exemptions, and why teaching them would have been worse

1. **`marḥaban`** (M2-S01, under *as-salāmu ʿalaykum*). A sibling greeting, not a shape of the
   greeting it varies: the two share not one word, and S01's own trap insists the row is "one
   fixed greeting" with "one fixed answer". Landing marḥaban there is the sibling-set bug the
   en-es review refused for `buenas tardes` (`docs/14-llm-review-en-es-surfaces.md`, exemption 2).
   No sentence display carries marḥaban to hang a row of its own on, and the ten-sentence budget
   is fixed. The variation's changed line teaches it in prose — *"a plain hello — shorter, and no
   fixed reply is attached to it"* — and M10-S01's ahlan note names it again. It stays on the
   M6–M10 review's "free for L2" list.
2. **`ṣabāḥ an-nūr`** (M2-S03's second variation, the fixed reply). This one is locked out by the
   **additions-only invariant itself**: every hyphen part of a `forms` surface becomes an index
   key (`surfaceIndexKeys`, #116 [Q3]), and first occurrence wins in ladder order — so any M2
   surface containing `an-nūr` would grant `an` to M2-S03 and **steal the key from M3-S03's own
   row** (`an`, the "to" of *urīd an ashrab*), and putting bare `ṣabāḥ` on the M2 row would steal
   it from M4-S02's `fī aṣ-ṣabāḥ` row, which owns it today. Both thefts are index moves, exactly
   what this pass must not do. What the learner gets instead: bare `ṣabāḥ` is a **forward
   reference** that resolves from M4 on (the en-es `es`/`quieres` category — met on schedule),
   module rule 5 teaches the reply pair in prose (*"ṣabāḥ al-khayr [is answered] with ṣabāḥ
   an-nūr"*), and the variation's changed line glosses it (*"the fixed answer — 'morning of
   light', and n is another sun letter"*). The reply can have a row of its own in L2, where `an`
   is already three modules old.

### The two argued calls

**`masāʾ al-khayr` on the `ṣabāḥ al-khayr` row.** The course family has ruled both ways on
sibling phrases: en-es refused `buenas tardes` as a form of `Buenos días` (separate expressions,
pre-ruled by its M1–M2 review) but shipped `hasta luego` and `hasta el sábado` on the
`hasta mañana` row — "one pattern, three whole goodbyes", cue widened. en-ar has no prior ruling,
and the issue's own mechanism line directs "the greeting pieces to the greeting rows". The line
this pass draws: a phrase may join a row **it shares a piece with** — masāʾ al-khayr keeps the
row's own al-khayr, and the variation's changed line has always said so (*"morning → evening;
al-khayr never changes"*) — where marḥaban, sharing nothing, may not. The row's cue widens to
"good morning · good evening" (the hasta precedent), its note gains the frame sentence, and the
S03 usage line already taught when the evening twin takes over. As a two-token surface it also
resolves the variation *whole*: bare `masāʾ` is deliberately **not** granted a key, so M4-S10's
`fī al-masāʾ` row still first-teaches it, and the resolver's longest-match walk consumes
`masāʾ al-khayr` before the bare pieces can miss.

**`sayyāratān` on the plural row, not the singular.** sayyāra has three rows (M3-S09 the noun,
M7-S09 the possessive, M8-S07 the plural). The dual could join M3's row, but that lists a shape
three modules before the dual lesson exists, in a module whose own rules never mention -ān; the
M8-S07 plural row sits **in the dual's own module**, is the row about how this noun counts, and
its note now completes the story — *"exactly two of them is S05's dual on this same noun —
sayyāratān, its hidden t awake"* (S05's variation line already taught the waking t). The
kitābān row itself was never a candidate: it is a different noun, and a tap on sayyāratān must
not show a row glossed "two books" — the forms-hit bug.

## The additions-only proof

Index saved before (`public/content/en-ar/index/*.json` at main @ 16069c7), rebuilt, compared key
by key: **0 lost, 0 moved, 8 distinct keys added**, `maxSpan` unchanged (1, 2×4, 3×5).

|        | M1  | M2  | M3  | M4  | M5  | M6  | M7  | M8  | M9  | M10     |
| ------ | --- | --- | --- | --- | --- | --- | --- | --- | --- | ------- |
| before | 26  | 50  | 71  | 101 | 132 | 164 | 191 | 217 | 256 | 275     |
| after  | 27  | 52  | 73  | 104 | 135 | 168 | 195 | 224 | 263 | **283** |

The eight: `tuḥibbīn` → M1-S05 #0, `masā' al-khayr` → M2-S03 #0, `tadhhabīn` → M4-S01 #0,
`sa-tadhhabīn` → M6-S01 #0, `sayyāratān` → M8-S07 #0, `bi-riyāl` → M8-S08 #1,
`sa-ashtarī` → M8-S10 #0, `tatakallamīn` → M10-S07 #0.

### Seams this pass had to steer around

- **`an` belongs to M3.** The single sharpest constraint here: `an-nūr`'s hyphen parts would
  reclaim it for M2, so the reply stays out of the index entirely (exemption 2). The test pins
  `an` on M3-S03 #0 and `an-nūr`/`nūr`/`ṣabāḥ an-nūr` absent.
- **Bare `masāʾ` and `ṣabāḥ` belong to M4.** The greeting row takes only the two-token twin;
  `surfaceIndexKeys` grants a multi-token surface no bare-word keys, so M4's two time-phrase rows
  keep first-teaching the bare nouns, and M2's variation resolves by longest match.
- **The two futures of dhahaba stay sibling rows.** tadhhabīn rides M4's adhhab row and
  sa-tadhhabīn rides M6's sa-adhhab row — neither list crosses into the other, mirroring how M6's
  own note derives the sa- forms from M4's. `sa-tadhhabīn`'s hyphen part `tadhhabīn` is already
  M4's by ladder order, so the grant is a no-op, not a theft.
- **`turīdīn` is untouched.** M3-S06's row first taught the -īn ending and owns its key; the
  three new -īn cells each live on their own verb's row, never swept onto the precedent row.
- **`bi-riyāl` and `sa-ashtarī` reuse taken parts.** Their hyphen parts (`bi` → M2-S05, `sa` →
  M6-S01, `riyāl`/`ashtarī` → their own rows) were all already owned, so each form adds exactly
  one key.

## What #287 inherits

`tools/content-build.test.ts` gains en-ar's two seams, twins of en-es's and hi-mr's:

1. **every en-ar variation line** swept against *its own module's* index, pinned at six decided
   misses — two proper nouns (`priyā` twice, `miṣr`), the sibling greeting (`marḥaban`), and the
   locked-out reply (`ṣabāḥ`, `an-nūr`). A new variation that resolves nowhere fails the suite,
   so #287's third-variation pass has to *decide* about a new surface rather than discover it
   later. #287 wants the feminine …-īn forms: `tuḥibbīn`, `tadhhabīn`, `sa-tadhhabīn` and
   `tatakallamīn` are now index keys it can lean on.
2. the paradigm seams themselves (the dhahaba futures as sibling rows, turīdīn's own row, the
   greeting frame's two-token key with the bare pieces still M4's and `an` still M3's, the dual
   on the plural row with sayyāra/sayyāratī untouched, bi-riyāl/sa-ashtarī adding one key each).

## Verification

- `scripts/verify.sh` (full) →
  `TYPES ok | LINT ok | TEST 1329/1329 ok | CONTENT ok | FONTS ok | BUILD ok | BUDGET ok`
- the additions-only diff above, scripted over the saved index snapshot: 0 lost, 0 moved, 8 added
- the variation sweep re-run over the emitted index: exactly the six pinned misses remain
- Payload, measured: `course:en-ar` 109.0 → **109.5 KiB** gzip against 360 (+0.5 KiB of forms and
  prose), `precache:en-ar` 323.5 → **324.0 KiB** against 590; `shell` (214.6) and the other three
  courses unmoved.

## Open questions for a native pass

These join the 61 across the three earlier en-ar reviews.

1. **`tuḥibbīn` on M1's row.** The feminine cell is listed two modules before M3 teaches the -īn
   ending (turīdīn). The row's note now says it plainly, but is a form-chip a learner cannot yet
   parse a help or a flood at rung 1?
2. **`masāʾ al-khayr` as a form of `ṣabāḥ al-khayr`.** The en-es review refused the analogous
   `buenas tardes`; this pass took the `hasta mañana` path (one frame, cue widened, shared
   piece). Should the course family settle one ruling for sibling phrases?
3. **`ṣabāḥ an-nūr` locked out.** The reply is taught only in rule 5's prose and the changed
   line. Should L2 give it a row (and `an-nūr` a key), or is prose the right weight for a fixed
   reply?
4. **`marḥaban`.** Exempted as a sibling greeting, still on the "free for L2" list. Would a
   native reviewer rather see a variation rewritten to use taught words than left unresolved?
5. **`sayyāratān` on the row glossed "cars".** A tap on the dual shows the plural row, note
   carrying the dual. Better than M3's singular row — but should the dual wait for a row of its
   own in L2?
6. **`sa-tadhhabīn` against rule 1's wording.** M6's rule says "sa- never changes for person —
   the person stays in the prefix beneath it"; in the feminine cell the person rides partly in
   the -īn suffix. The rule stays true of sa- itself; should its wording widen at L2?
7. **`bi-riyāl` in a noun's forms list.** A preposition-wearing shape beside the bare noun, on
   the bi-khamsa precedent. Is the priced shape "the same word" for a learner?
8. **The feminine cells live only in variations.** All four -īn forms are shown when a line turns
   to a woman and taught nowhere else. Do they deserve sentences of their own at some rung, or is
   the variation-plus-forms pairing the right weight?
