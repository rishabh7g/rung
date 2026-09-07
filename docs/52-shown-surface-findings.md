# Shown-but-untaught surfaces — the standing list (#491)

**Date:** 2026-09-07 · **Status:** reported by the build, ratcheted by `tools/shown-surfaces.test.ts`,
not yet swept.

`tools/content-build.ts` has always failed a build when a `comprehensionPool` token did not resolve
in the module's cumulative index (PRD §6.3). Nothing checked what a module **shows** outside the
pool. `checkShownSurfaces` now walks every `sentences[].display` and every `variations[].display`
against the same index, and this file is what it found across the nine shipped courses on the day
it was written: **133 distinct surfaces**, every one of them in a variation, none in a hero line.

The rule is not fatal, deliberately. Two of the three kinds of finding below are content bugs, one
is a recorded exemption, and sorting them out means editing verified content in nine languages —
a sweep, not a build failure sprung on the next person to run `npm run build`.

## The three kinds

- **A proper noun** rides unindexed by #61 — `प्रिया`, `mumbai`, `thomas`, `lyon`, `minsu-ga`. The
  course never declares it, and no row should own it. These are permanent exemptions and the reason
  the rule reports rather than fails.
- **A forward reference** — the ladder does teach the word, but at a later rung. `थोडं` is shown in
  a variation on hi-mr L1-M1 and taught at L1-M3. For a learner standing at M1 it is untaught, and
  the "why" row behind it has nothing to say, so this is a real defect: the fix is to rewrite the
  variation, not to move the word.
- **Never taught** — the ladder does not teach it anywhere. `please`, `bus`, `three` and `six` in
  hi-en; `guten`, `arbeit`, `bücher` in en-de; `birra`, `otto`, `sedia` in en-it. The fix is either
  a `forms` entry on the row that should own it, or a rewritten variation.

Counts below are of the second and third kinds together; the proper nouns are inside "never taught"
and are called out per course.

## The list

### hi-mr — 7 (4 taught later, 3 never taught)

- **taught later:** `थोडं` (L1-M1-S03 var), `भाजी` (L1-M5-S01 var), `पाच` (L1-M8-S07 var),
  `झाले` (L1-M8-S10 var)
- **never taught:** `प्रिया`, `पुणं` (both L1-M1-S01 var — proper nouns, #61), `बोललो`
  (L1-M9-S04 var — the pinned miss of docs/15 Q29)

Every finding is in L1. **The twenty L2 and L3 modules added on 2026-09-07 contribute none** —
they were audited by hand against this same rule while being written, which is exactly the work
this check exists to stop being manual.

### en-es — 10 (6 taught later, 4 never taught)

- **taught later:** `ana`, `méxico`, `es`, `estudio`, `quieres`, `muy`
- **never taught:** `profesor`, `buenas`, `tardes`, `hermano`

### en-ar — 6 (2 taught later, 4 never taught)

- **taught later:** `miṣr`, `ṣabāḥ`
- **never taught:** `priyā` (proper noun), `marḥaban`, `an-nūr`, `sayyārat`

### hi-en — 30 (12 taught later, 18 never taught) — the largest

- **taught later:** `mumbai`, `doctor`, `coffee`, `water`, `films`, `it`, `and`, `so`, `today`,
  `please`, `new`, `isn't`
- **never taught:** `priya`, `jaipur` (proper nouns), `farmer`, `actor`, `cricket`, `dogs`,
  `hindi`, `how's`, `going`, `speak`, `milk`, `three`, `six`, `reading`, `now`, `ate`, `me`, `bus`

The course whose L2 is English carries the most, which stands to reason: an English variation is
the easiest place to reach for a word the ladder has not reached yet.

### en-ru — 20 (8 taught later, 12 never taught)

- **taught later:** `kak`, `vas`, `zovút`, `ne`, `vy`, `pózdno`, `gazétu`, `plókho`
- **never taught:** `yeyó`, `rossíi`, `dóbryy`, `den'`, `rússkuyu`, `kupít'`, `dozhdyá`, `moy`,
  `ánne` (proper noun), `éhtot`, `býstro`, `delá`

### en-it — 17 (6 taught later, 11 never taught)

- **taught later:** `anna`, `roma` (proper nouns), `pizza`, `pizze`, `due`, `libera`
- **never taught:** `lo`, `birra`, `alle`, `otto`, `per`, `sulla`, `sedia`, `lì`, `settimana`,
  `io`, `mangiamo`

### en-fr — 20 (6 taught later, 14 never taught)

- **taught later:** `vous`, `anglais`, `et`, `d'eau`, `ici`, `rentre`
- **never taught:** `l'étudiant`, `s'appelle`, `lyon` (proper noun), `aimez`, `n'avez`, `n'êtes`,
  `n'allez`, `n'est`, `voitures`, `ce`, `parce`, `qu'elle`, `a`, `moi`

Note how many are elisions — `l'étudiant`, `s'appelle`, `n'est`, `qu'elle`. en-fr's briefs settled
the apostrophe as an index seam (decision 2 of its header); these are the lines where the seam was
shown but not claimed.

### en-de — 11 (5 taught later, 6 never taught)

- **taught later:** `sie`, `morgen`, `abend`, `geht`, `es`
- **never taught:** `thomas`, `meyer` (proper nouns), `guten`, `arbeit`, `bücher`, `brote`

`guten` is the interesting one: `Guten Tag` is taught as a multi-token surface, so the bare word
never earns a key, and `Guten Morgen` in a variation cannot resolve. That is the multi-token
policy working exactly as written (en-de decision 4) and a variation reaching past it.

### en-ko — 12 (3 taught later, 9 never taught)

- **taught later:** `chaek-i`, `il`, `hakgyo-e`
- **never taught:** `saram-i`, `geunyang`, `geuraeyo`, `cha-do`, `uisa-yeosseoyo`, `anieosseoyo`,
  `oneul-do`, `minsu-ga` (proper noun), `eopseoseo`

Most of en-ko's are particle-attached forms — `saram-i`, `cha-do`, `oneul-do` — which is the
hyphen seam of its briefs (decision: the bare key belongs to the bare row) meeting a variation that
showed the attached form without a row listing it.

## How this is held

- `npm run content:build` prints one line per course: `shown but untaught: 7 surfaces — …`.
- `tools/shown-surfaces.test.ts` holds a per-course baseline. Counts may fall; they may not rise.
  **A course with no baseline entry must have none**, which is what makes the rule bite for
  everything authored from here on — the 320 modules of L2 and L3 still to write.
- Lower a baseline in the same commit that fixes the content. Never raise one.

## What a sweep would do

Per course, for each finding: decide whether the word belongs on an existing row's `forms` (most of
the "never taught" ones do — `bus`, `milk`, `birra`, `bücher` all have an obvious owner), or
whether the variation should be rewritten (every forward reference, and anything whose owner would
be a rung it has not reached). Proper nouns stay exempt and are the reason the count will never be
zero. That is 133 decisions across nine languages against verified content — its own issue, not
this one.
