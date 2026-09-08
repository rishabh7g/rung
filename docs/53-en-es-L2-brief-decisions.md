# en-es L2 — the authoring-brief decisions (#426)

The ten en-es L2 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['en-es']` L2-M1…L2-M10) are the
second L2 briefed in any course, after hi-mr's (#295, `docs/26`). Every seam below was pinned
against the REAL cumulative index — `public/content/en-es/index/L1-M10.json`, rebuilt and read on
2026-09-08: **228 surfaces, maxSpan 3** — and against the spoken-Spanish pass (`docs/41`), which
is what put `Soy de la India` and `enfermo` into the L1 the briefs are written against.

This note records the four decisions the briefs are written to, so the authoring wave (#435, #444,
#453 on the hi-mr model: M1–M2, M3–M5, M6–M10) inherits them without re-deriving anything. The
briefs repeat each decision in the module notes, because a prompt only ever shows an author the
notes.

## 0. A correction to the commissioning issue, recorded rather than absorbed

#426 says L1 "kept `usted` out of every display". It did not. `content/en-es/modules/L1-M2.json`
teaches `usted` on a word row of its own, shows it in two display SENTENCES (`¿Cómo está usted?`,
`¿Es usted de la India?`) and in variations in M2, M3, M9 and M10, and the `es`, `está` and
`quiere` rows all already carry "…and usted" in their notes. Briefs rule 1 — every example checked
against the rule it illustrates — applies to a brief's premises as much as to its examples, so the
register decision below is written against what L1 actually shipped. This is the same class of
correction as `docs/49`'s (`झालं` and `आलो` were never taught in hi-mr L1): the issue text is a
plan, the index is the fact.

## 1. Register — the frame, not the pronoun

L2 does not introduce `usted`; it settles what the pronoun alone never decided.

- **Politeness lives in the FRAME.** `Deme el pan, usted` is rude; `¿Me pones un café?` to a friend
  is not. The tier a learner controls is the frame — bare imperative, `¿Me da…?`, `¿Puede…?` — and
  L2-M1 teaches the frames in both addresses side by side.
- **The slogan "`usted` is formal, `tú` is informal" is dead.** In Spain `tú` is ordinary with a
  shop assistant; across much of Colombia and Central America `usted` goes to a grandchild out of
  affection. What is invariant is the agreement (`usted puede`, never `*usted puedes`), so that is
  what a rule states and the regional facts go in `usage`.
- **Who speaks what.** M4 (the street), M7 (a business call) and M8 (staff, strangers) speak
  `usted`; M6 (plans) speaks `tú`; M2, M3, M5 and M9 follow the scene and say which in `usage`;
  M1 shows the pair.
- **The chip carries the tier** (#422): `tú`-only frames chip `informal`, the `usted` frames and
  the `perdone` / `disculpe` end chip `formal`, anything safe with either stays `neutral`.
- **The paradigm `usted` drags in** arrives as vocabulary, not as a system: `tiene` (M2), `puede`
  (M1), `da` (M1), `dice` (M7), `prefiere` (M9), and the `usted` imperative (M1, spent in M4/M7).

## 2. Forms — L2 never edits an L1 file

A new SHAPE of an L1 lexeme is deconstructed in the L2 module that first shows it, with its note
pointing back at the first-teach row: the bare word's key is L1's forever (first occurrence wins),
and re-verifying frozen L1 files from every L2 issue would churn what the gate passed. M10 is the
clearest case — `dijo`, `tuvo`, `pudo` are new cells of M7's `dice`, M2's `tiene`, M1's `puede`,
and none of those rows is touched. Within L2, a first-teach row lists the cells its LEVEL shows
(plan the wave, not the module), `[]` stays honest for invariables and re-teaches, and one
paradigm has one home.

## 3. Seams — the multi-token surface is Spanish's tool, and every collision has an owner

maxSpan stays 3. Where Marathi glues, Spanish spans, so the tool L1 built with `Me llamo`,
`por favor` and `al lado de` is how L2 keeps a later module's word off an earlier module's note.
Decided up front rather than discovered:

- `a` is L1-M4's, so directions index `a la derecha`, `a la izquierda` and `todo recto` WHOLE
  (`todo` is L1-M8's).
- `como` is L1-M4's "I eat", so **`tan … como` is kept out of L2 entirely** and deferred to L3.
  This is the clearest case in the repo of an index decision and a syllabus decision being the
  same decision — the `का` bug (review 08, correction 4), refused in advance.
- `la`, `los`, `las` are L1-M1's ARTICLES, so the direct-object clitics spelled the same can never
  be first-taught: **L2 teaches the clitic system on `lo`, `me`, `te` only** (M5); the rest is L3's.
- `bueno` is L1-M10's discourse "well, …", so the adjective is taught on `buena` / `buenos` /
  `buenas` (M3) and masculine singular `bueno` never appears in a display. The same trap is a gift
  to M7: Mexico answers the phone `¿Bueno?`, named in `usage`, taught by nobody.
- Bare keys L1 left free by indexing a phrase whole, and their new owners: `se` (M4, impersonal),
  `le` (M7), `lo` (M5), `que` (M5, note true of M9's comparative job too), `luego` (M7), `tarde`
  and `día` (M6), `cerca` (M4).
- Free and assigned: `hermano` (M2), `malo` (M3), `más` / `menos` / `cuál` / `esta` (M9), `quién`
  (M7), `problema` (M8).
- Re-taught, owned by nobody in L2: `mañana`, `hora`, `hay`, `está`, `qué`, `nada`, `mal`, `muy`,
  `mucho`, `por favor`, `perdón`, `gracias`.
- Accents are letters (L1-M2's law) and L2 leans on it harder: `esta`/`está` sit in the same
  sentence shapes (`Esta sopa está fría`), and a dropped accent merges a demonstrative into a verb
  for the rest of the course.
- Proper nouns never index (#61), so every direction, call and account anchors on a common noun.

## 4. What L2 withholds, and where each piece lands

Named in the module that would otherwise reach for it: the **subjunctive** (L3-M3/M4 per
`content/en-es/levels.json`); the **conditional** `podría` (L3), which is why M1 and M8 buy
politeness with frames; the **perfect** `he perdido` (L3), so M8 and M10 tell the past with
L1-M5's preterite; **`por` vs `para` as a system** (L3) — `para` enters at M5 for a recipient and
nothing else, and bare `por` stays unowned across the level; **`tan … como`** and **object
`la`/`los`/`las`** (L3, for the index reasons above); and the **`-ré` future** beyond the three
cells L1-M6 shipped.

## Bounds and shape

Bounds climb 8 → 10 (M1–M3: 8, M4–M7: 9, M8–M10: 10), continuing L1's 5 → 8; `newWordCap` stays
the PRD §5 25 everywhere; pools are authored to 12, the course's shipped size. M1–M3 ship fully
enriched (validator law, any level), and M10's items are four-sentence accounts — the job line's
own words. `npm run content:prompt -- en-es L2-M1` renders today from the real index, and the
mirror, climb, register and seam decisions are pinned by `tools/course-briefs.test.ts`
(`en-es L2: the decisions its briefs settle (#426)`).
