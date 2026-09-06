# en-ko L1 — spoken Korean, not textbook Korean (LLM editorial pass)

**Date:** 2026-09-05 · **Reviewer:** Claude, LLM review, authorised by the repo owner ·
**Bar:** LLM review plus owner authority — the bar the course already shipped on (`docs/34`, #377–#380).
**No native reviewer has read these edits.** This pass changes what the learner is asked to say,
so it is recorded sentence by sentence; every rewrite reverts by file.

---

## Why

The course's stated goal is speaking. An audit of the 100 hero sentences against how a Korean
speaker actually says them found ~35 that were grammatical but never said, and they fell into a
few families rather than being scattered:

- **The object marker on every short request.** `Mul-eul juseyo`, `Keopi-reul du jan juseyo`,
  `Bap-eul meokgo sipeoyo` are correct and careful; across a counter the marker is dropped, and
  a learner drilling it fifteen times drills a stiffness. The `-eul/-reul` row (M1-S04) stays
  taught, several heroes still carry it (M3-S04/S05, M4-S05/S06/S10, M5-S03, M1-S08, M10-S08),
  and every hero that lost it keeps the marked form as a variation.
- **`Jeo-neun` as the default opener from M3 on.** M4's own rule r2 calls this "the clearest sign
  of an English speaker", and M10 makes a lesson of dropping it — while thirteen heroes in
  between opened with it. It is now the variation, and ONE hero per module keeps it as the
  contrastive case (see below).
- **`i-geo-neun` in front of a predicate** (`I-geo-neun eolmayeyo?`): pointing at a thing in a
  shop or at a table is `i-geo eolmayeyo?`, `i-geo masisseoyo`. M1's copula sentences keep it.
- **`baeuda` for a single day's work** (`Jeo-neun eoje hangungmal-eul baewosseoyo`): a day is
  `gongbuhaeyo`; `baewoyo` is taking a language up over time.
- **Two meaning errors**: `Eoje jal jinaesseoyo?` for "did you have a good day yesterday" —
  `jinaeyo` is how one has been getting along, a single day is spent, `bonaesseoyo`; and
  `Ilhaeseo bappayo` / `Bappaseo jip-e gayo` — working is not why one is busy, and being busy is
  not why one goes home.
- **Register**: `hajiman` is the written "but"; speech says `geunde`. A bare `Minsu` as a vocative
  at the `-yo` level is for close friends; it is `Minsu-ssi`. `Keopi-ga eodi-e isseoyo?` is fully
  marked where speech drops both markers.

Two of the first pass's own brief decisions produced part of it and are amended in
`tools/course-briefs.ts` (the en-ko M2, M3, M7 and M10 notes, dated 2026-09-05): `jal jinaeseyo?`
as the wellbeing hero (natives open with the past, `jal jinaesseoyo?`), `mul-eul juseyo` as the
shape of a request, `eodi-e isseoyo?` as the question, and "write `hajiman` in the displays".

---

## What changed — 37 heroes

**Object marker dropped on short requests, counted phrases and `bap`** (11): M3-S01 `Mul juseyo`;
M3-S03 `Bap meokgo sipeoyo`; M3-S09 `Bap an meogeoyo` (cue "I'm not eating" — `achim` is not
taught by M3, so the breakfast version lives on M4-S02's variation `Achim an meogeoyo`); M5-S01
`Eoje bap meogeosseoyo` (cue "I ate yesterday"); M8-S01/S04/S08 `Keopi du jan juseyo`, `Sagwa se
gae juseyo`, `Keopi han jan juseyo`; M8-S10 `Maeil sagwa han gae meogeoyo` ("I eat an apple every
day"); M10-S04 `Bap meokgo cha masyeoyo`; M8-S02 `I-geo eolmayeyo?`; M9-S02 `I-geo masisseoyo`.
M3 r0/r1/r7/r8, M5 r6, M8 r5 and M10 r3 now teach the bare form and name the marked one; the M8
mistakes that put a marker on the number or counter say where a marker goes when one is used.

**`Jeo-neun` off the front** (10): M3-S04 `Mul-eul masigo sipeoyo`, M3-S05 `Hangungmal-eul baeugo
sipeoyo`, M4-S03 `Maeil gongbuhaeyo`, M4-S05 `Maeil hangungmal-eul baewoyo` (adverb before
object), M5-S02 `Eoje ilhaesseoyo`, M6-S03 `Naeil ilhal geoyeyo`, M7-S01 `Jip-e isseoyo`, M9-S03
`Oneul bappayo`, plus M3-S03 and M4-S01 above. **Kept as the one contrastive `jeo-neun` hero per
module**, with a usage line saying why it is there: M3-S08 `Jeo-neun cha-reul an masyeoyo`, M4-S09
`Jeo-neun oneul gongbu an haeyo`, M5-S09 `Jeo-neun eoje bap-eul an meogeosseoyo`, M6-S10 `Jeo-neun
naeil hanguk-e gayo`, M10-S02 (the module's own lesson). M7 and M9 have none: the report named
their only `jeo-neun` heroes for rewriting. M1 is untouched.

**`gongbuhaeyo` for a day's work** (2): M5-S07 `Eoje hangungmal gongbuhaesseoyo`; M6-S06 `Naeil
hangungmal gongbuhal geoyeyo`. `gongbuhaesseoyo` was already a form on M4-S03's row and
`gongbuhal` on M6-S02's, so both resolve; the mistake plate on each is the `baewoyo` sentence,
with a `why` that says it is not wrong Korean and usually the wrong verb. `baewosseoyo` and
`baeul` leave the index (`baeul` is still indexed from M9-S09's row for M10-S09).

**Meaning** (4): M5-S10 `Eoje jal bonaesseoyo?` — new row `bonaeyo` (`bonaeyo · bonaesseoyo`),
mistake plate `Eoje jal jinaesseoyo?`; the same swap on M5-S05's variation and pool C09/C12.
M9-S05 `Il-i manaseo bappayo` — new rows `il` (`il · il-i`) and `manayo` (`manayo · manaseo`);
`ilhaeseo` leaves the index, so M9-C04, M10-C07 and M10-S07's variation now use `Il-i manaseo`.
M9-S06 `Pigonhaeseo jip-e gayo` (M9 r2 and the `-aseo` notes quote it). M3-S03/S05 variations
`Bap meokgo sipeoyo?` / `Hangungmal baeugo sipeoyo?` are cued to the listener.

**Register** (3): M10-S03 `Oneul-eun bappayo. Geunde naeil-eun an bappayo.` and M10-S08 — the
row is now `geunde` with forms `geunde · geureonde · hajiman`; M10 r1/r5, every M10 variation and
pool C03/C08 follow. M7-S06 `Keopi eodi isseoyo?` (r4 rewritten; the fully marked form is a
variation). M2-S01 variation `Annyeonghaseyo, Minsu-ssi.`; `Minsu-ssi` is a form on M1-S02's
`Minsu` row so M7-C04 `Minsu-ssi eodi isseoyo?` resolves.

**Textbook / odd content** (7): M2-S02 `Jal jinaesseoyo?` ("How have you been?") — the past taught
whole, `jal jinaeseyo?` the present variation, M2 r5/r6 rewritten. M4-S01 `Achim-e ilchik
ireonayo` and M4-S07 `Bam-e ilchik jayo` — new row `ilchik` ("early"), the pair Koreans actually
say. M6-S04 `Naeil-eun achim meogeul geoyeyo` ("Tomorrow I'll have breakfast"). M6-S08
`Naeil-do ilhal geoyeyo?` ("Are you working tomorrow too?" — `naeil-do` added to M6-S01's forms;
`masil` leaves the index). M8-S05 `Hanguk chingu-ga du myeong isseoyo`. M10-S06 `Eoje jal jasseoyo.
Geuraeseo oneul an pigonhaeyo.` (`ireonago` leaves the index; M10-C12 is `Cha masigo hakgyo-e
gayo`). M3-S07 `Cha-ga eopseoyo. Keopi-ga isseoyo.` — the anchor the report suggested, since
`jip-e` is M7's.

**Cues** (3 heroes, plus variations and pool): M9-S01 `Keopi-ga joayo` → "Coffee sounds good"
(the preference reading, with trap and usage saying so; M9 r1 amended); M9-S10 "I'm going to
Korea. So I'm studying Korean."; M2-S10 "Goodbye (you're leaving)" / variation "Goodbye (I'm
leaving)"; M2-S02 "How have you been?"; M8-S10 "I eat an apple every day".

**Variations changed without a hero change:** M2-S03 `Geunyang geuraeyo.` ("So-so", learned whole
— no row added; variations are not index-checked and the phrase is a fixed answer), M2-S07 `Ne,
oraenmanieyo.` replacing the question `Oraenmanieyo?`, M4-S02 `Achim an meogeoyo`, M6-S02
`Naeil-do gongbuhal geoyeyo`, M8-S09, M10-S02/S05/S07/S09.

---

## Deviations from the report, and why

- **M6-S04 and M6-S08**: the report's targets `Naeil jip-eseo meogeul geoyeyo` and `Naeil
  hakgyo-e gal geoyeyo?` use `jip`, `-eseo` and `hakgyo`, all first taught in M7; teaching them in
  M6 would steal M7-S01/S02/S03's rows and duplicate M7-S10. Replaced with sentences built from
  M1–M6 words (`achim` as the meal, `-do` on `naeil`).
- **M3-S07**: `Jip-e cha-ga eopseoyo` is out for the same reason; the report's own fallback
  `Cha-ga eopseoyo. Keopi-ga isseoyo.` is used.
- **M3-S09**: `achim` is M4's, so `Bap an meogeoyo` with the cue "I'm not eating"; the
  breakfast line is M4-S02's variation, as the report allowed.
- **M9-S01**: the cue route rather than a `masisseoyo` hero, because M9 r1 and M1's `joahaeyo`
  note both rest on `keopi-ga joayo` = "coffee is good"; the cue "Coffee sounds good" is the
  preference reading without contradicting either.
- **One `jeo-neun` per module**: the report listed every `jeo-neun` hero in M3 and M5 for
  removal and also asked for one to be kept; S08 and S09 (negatives, where "as for me" is most
  natural) are the ones kept.
- **M10-S08's hero** carried `hajiman` too; it is changed alongside the listed variations, since
  the row rename would otherwise leave one hero on the written form.

## Kept on purpose (the report's "not a problem" list, unopened)

`Annyeonghaseyo` / `Gamsahamnida` / `Mannaseo bangapseumnida`; `Oraenmanieyo. Jal jinaesseoyo?`;
`gongbu an haeyo` / `il an haeyo`; `-(eu)l geoyeyo` beside `gayo`; `isseoyo`/`eopseoyo`; the
counters; `chaeksang wi-e/yeop-e`; `Jip-e keopi-ga eopseoyo`; `Naeil gayo`; `Wae bappayo?`;
`hangungmal`; the particle hyphen and `i-geo`; `Je ireum-eun Minsu-yeyo`. Also kept: `-reul` on
M5-S03, M4-S06/S10 and M10-S08 (fuller sentences, and the row's carriers), and every
`jeo-neun` in the comprehension pool (comprehension, not production; correct Korean).

---

## Mechanics the pass had to respect

- The word index is cumulative and first-occurrence-wins. New rows: `ilchik` (M4-S01),
  `bonaeyo` (M5-S10), `il` and `manayo` (M9-S05), `geunde` (M10-S03, replacing `hajiman`). Rows
  moved, not duplicated: `pigonhaeyo` now opens on M9-S06 (was S07); `masisseoyo` stays on S02;
  `achim`, `hanguk`, `maeil`, `gongbuhaeyo`, `-do` reappear in later modules as "from Mn" rows,
  which is the existing pattern. New forms: `Minsu-ssi` (M1-S02), `jinaesseoyo` (M2-S02),
  `naeil-do` (M6-S01). Surfaces that leave the index: `baewosseoyo`, `masil`, `ilhaeseo`,
  `ireonago` — none is used by a pool item any more.
- Every comprehension-pool token must resolve: 40 pool items rewritten or re-cued; the build is
  the proof.
- `complexity.allowedPatterns` updated in M2, M3, M4, M6, M7, M8, M9, M10. M2's `allowedTenses`
  is left at `simple_present`: `jal jinaesseoyo?` is taught as a frozen phrase, and M5 still
  builds the past.
- `src/course/types.test.ts`: the en-ko block needed no change — every new display is ASCII,
  hyphenated, `-yo`-level, and `ssi` is not a bare particle.
- The brief: four en-ko notes amended (M2, M3 ×2, M7, M10), no other course touched.

## Gate

`content:validate` 90/90 · `npm run build` (en-ko index 52 surfaces at L1-M1, 185 at L1-M10; no
unresolved pool token) · `tsc -b` · lint · vitest 253/253 · prettier on `tools/course-briefs.ts`
and this file. Budget: `course:en-ko` 101.4 KiB gzip.

## What the owner is asked to ratify

- The 37 hero rewrites and their variations, mistakes, notes and rules:
  `git diff 80be7c1 -- content/en-ko/`.
- The amended brief decisions (M2 `jal jinaeseyo?`, M3 `mul-eul juseyo`, M7 `eodi-e isseoyo?`,
  M10 `hajiman`) — a future en-ko level should follow this pass, not `docs/34` alone.
- Two rewrites that step outside the report's literal targets because the index forbade them
  (M6-S04, M6-S08) and one that used its fallback (M3-S07).
