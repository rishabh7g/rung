# en-ko L2 — the authoring-brief decisions (#433)

The ten en-ko L2 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['en-ko']` L2-M1…L2-M10), pinned
against the REAL cumulative index — `public/content/en-ko/index/L1-M10.json`, rebuilt and read on
2026-09-08: **185 surfaces, maxSpan 2**. The eight L1 decisions
(`docs/34-en-ko-romanization-decisions.md`) carry unchanged: Revised Romanization transcribing
pronunciation, pure ASCII, **no stress marks ever**, the particle hyphen with the host keeping its
isolation shape, `jeo` never `na`, Hangul only in `script`.

## 1. The speech level meets the honorifics

L1's decision 3 settled the speech level course-wide: the `-yo` style, the plain style never
written, `-mnida` in two frozen phrases. Not reopened. What L2 adds is the other axis: the
honorific `-si-`, which raises the SUBJECT rather than the listener, and which L1 shipped inside
five whole phrases (`annyeonghaseyo`, `juseyo`, `gaseyo`, `gyeseyo`, `jinaeseyo`) with the rule
named as deferred.

**M1 makes it productive.** `-(eu)seyo` is `-si-` + `-eoyo`, so `anjeuseyo`, `gidaryeojuseyo`,
`malsseumhaseyo` are buildable. Two consequences the briefs state:

- Four verbs have a **separate honorific word** rather than the infix — `meokda` → `deusida`,
  `itda` → `gyesida`, `jada` → `jumusida`, `malhada` → `malsseumhasida`. Vocabulary rows, not a
  rule; M5 and M7 spend them, and L1-M2's `gyeseyo` is already one.
- The honorific is about the person the sentence is ABOUT, so **never of oneself**: `jeo-neun
  gayo`, not `*jeo-neun gaseyo`. M1's mistake block.

Chip: honoured-subject lines `formal`; plain `-yo` `neutral`; **`informal` never used in en-ko L2**,
because the forms that would earn it are `banmal`, which L1 banned and this level does not lift.
`-(seu)pnida` stays named-in-`usage` only — `levels.json` puts "Official talk" at L4-M7.

M6 is where this reads oddly against the other eight L2s and the briefs say so: plans are made
among friends and this module still stays `neutral`, because there is no informal tier to switch
to. An author arriving from the other courses will look for the `informal` chip and must be told
it is deliberately absent.

## 2. What L1 deferred, and which of it L2 collects

Collected: **`-go isseoyo`** (the progressive, M7 — a call happens now, the same argument hi-mr's
M7 makes for `-toy` and en-it's for the gerundio); **`mot`** (the inability negative, M8 — clean
pair with L1-M3's `an`: `an` is don't/won't, `mot` is can't); **`-(eu)llae-yo`** (the invitation
ending, M6).

Left deferred and named where they would be reached for: `-gess-` (M6 uses L1-M6's `-l geoyeyo`
and opens no second future); `-ji anayo`; the plain style; `-(eu)psida`, which belongs to the
`-mnida` level and travels with it; `-dago`; `-deon`; `-eoss-eoss-`.

## 3. "Agreement at length" in a language with no agreement

Korean marks no gender, number or article, so M3's job line cannot mean what it means in the
Romance courses. What Korean marks is ROLE, on the particle — `-i/-ga`, `-eun/-neun`, `-eul/-reul`,
`-do`, `-e`, `-eseo`, all shipped by L1 across six modules and never laid side by side. **M3
assembles the grid** and teaches the distinction L1 could only gesture at: **topic `-eun/-neun`
against subject `-i/-ga`**.

The second half is the attributive `-(eu)n` (`keun jip`, `joeun chingu`), opened at M2 and walked
at M3 — what this course has instead of a four-cell grid. The slogan refused: "Korean has no
plurals" — it has `-deul`, it simply does not require it.

## 4. Two number systems, one rule, stated at M5

L1-M8 used native numbers with counters (`han jan`, `du gae`) and Sino numbers for money
(`ocheon won`) in one module without saying which is which. **M5 states it**: native numbers count
things and always take a counter; Sino numbers do money, minutes, dates and anything above 99. M6
spends it immediately on the clock, where both appear in four syllables (`du si samsip bun`).

## 5. Seams

The particle hyphen holds: `surfaceIndexKeys` indexes the whole surface and each part, so
`chaek-eul` keeps `chaek` free. L2 adds `-ro`/`-euro` (M4), `-kkaji` (M4), `-boda` (M9), `-hago`
(M9), `-eoya` (M8). L1's homograph owners stand (`i` is the subject particle and the demonstrative
stays `i-geo`; `cha` is tea; `mal` is "word"), and L2 adds two: **`deo` is M5's** ("more", in an
offer) with M9's comparative pointing back, and **`bae` is the belly** (M5's `bae bulleoyo`) with
the fruit staying out. `nun` is the eye (M2) and the snow reading stays out.

Fused request forms (`dowajuseyo`, `gidaryeojuseyo`) are ONE whitespace token and get one clean key
— they must not be hyphenated, because in this course a hyphen is a particle boundary.

The Hangul `script` line still renders from a system face and bundles no font (#382,
`docs/34` §8): `tools/font-subset.ts` cannot subset `@fontsource/noto-sans-kr`, which splits
Korean across ~120 numbered range files per weight. Unchanged by this level, recorded here so the
absence of a font change does not read as an oversight.

## Bounds and shape

Bounds climb 8 → 10 (M1–M3: 8, M4–M7: 9, M8–M10: 10) — higher than L1's 4 → 7, because a request
and an account need adverbials L1 could do without. Pools to 12; M1–M3 fully enriched; M10's items
are four-sentence accounts in `-eoss-`, whose real lesson is not a tense but **zero anaphora**:
Korean names the speaker once and then drops every subject, far more thoroughly than Spanish drops
a pronoun.

`npm run content:prompt -- en-ko L2-M1` renders from the real index, and the decisions are pinned
by `tools/course-briefs.test.ts` (`en-ko L2: the decisions its briefs settle (#433)`).
