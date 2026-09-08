# en-es L3 — the authoring-brief decisions (#462)

The ten en-es L3 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['en-es']` L3-M1…L3-M10) are the
second L3 briefed in any course, after hi-mr's (#452, `docs/50`). Every seam below was pinned
against the REAL cumulative index — the fold of `public/content/en-es/index/L1-M1.json` through
`L2-M10.json`, rebuilt and read on 2026-09-08: **477 surfaces, maxSpan 3** (L1 closed at 228; L2
added 249) — and against the review chain the level inherits: `docs/41` (spoken Spanish) and
`docs/62`'s en-es L2 questions.

This note records the four decisions the briefs are written to, so the authoring waves (#471, #480
and the M6–M10 issue) inherit them without re-deriving anything. The briefs repeat each decision in
the module notes, because a prompt only ever shows an author the notes.

## 1. Register — carried from L2, chip included

`docs/53` §1 settled it and L3 adds no register rule; it applies the one it has.

- **Politeness lives in the FRAME**, not in the pronoun. L2-M1 taught the frames in both addresses;
  L3-M4 adds the one frame L2 could not afford — `¿Podría…?` — and that is the whole of the change.
- M8 (counters, offices) speaks `usted` throughout and chips `formal`; M1, M2, M6, M9 and M10
  follow the scene and say which in `usage`; M3, M5 and M7 show whichever the listener earns.
- The chip carries the tier (#422): `tú`-only frames chip `informal`, the `usted` frames and the
  `perdone` / `disculpe` end chip `formal`, anything safe with either stays `neutral`.

## 2. What L2 withheld, and where it lands

`docs/53` §4 named seven pieces and each has an owner now. This is the list an authoring wave
checks itself against:

- **`por` vs `para` as a system → L3-M2.** L2 let `para` in at M5 for a recipient and nothing else,
  and left bare `por` unowned across the level. Work is where both bite in one breath.
- **The subjunctive → L3-M3**, on ONE trigger: `creo que` + indicative against `no creo que` +
  subjunctive. The mood as a paradigm is L4's and is named as deferred.
- **`tan … como` → L3-M3.** Held out of L2 because `como` is L1-M4's "I eat" — see §3.
- **The conditional `-ría` → L3-M4**, bought for advice and for `¿Podría…?`, which is why L2-M1 and
  L2-M8 bought their politeness with frames instead.
- **The `-ré` future beyond L1-M6's cells → L3-M4**, stated as the written and more distant future
  rather than as a replacement for `voy a`.
- **Object `la` / `los` / `las` → L3-M5.** Held out of L2 because they are spelled exactly like
  L1-M1's articles — see §3.
- **The perfect `he perdido` → L3-M7**, where a symptom is by definition still true.

Two things stay OUT of L3 entirely and are named in the briefs that touch their edge: the **full
imperfect subjunctive** (L4-M3, "What might have been", `docs/48` §4) beyond M4's single
counterfactual frame, and the **passive with `ser`** (L4), which M8 names while teaching impersonal
`se` instead.

## 3. Seams — the two collisions L2 predicted, paid with whole surfaces

maxSpan stays 3, and the multi-token tool is how both predictions are paid rather than worked
around:

- **`tan … como`** indexes WHOLE. Bare `como` is L1-M4's verb, and a `como` row here would mint a
  note nobody is ever shown. `tan` carries the row and its note says why.
- **The object clitics** are taught as two-token surfaces with the verb they lean on — `la vi`,
  `los conozco`, `las tengo` — because `la`, `los` and `las` are L1-M1's article keys forever. This
  is the same tool `a la derecha` used, and the reason `maxSpan` is 3.

The rest of the assignment, decided up front rather than discovered:

- `si` (M4) is a fresh key and **`sí` is a different one**, because accents are letters (L1-M2's
  law). The two sit one keystroke apart and mean opposite things, so M4's row says so.
- `por` (M2) is unowned at the end of L2 and M2 takes it; its note must be true of `por la mañana`,
  `por favor` and `por qué`, all already indexed whole and all staying where they are.
- `se` stays L2-M4's row; M8's `se paga`, `se puede`, `se firma` index whole, and M9's `se celebra`
  does the same rather than opening a second family.
- `que` stays L2-M5's row across all of its jobs — the choosing-or, M3's opinion clause, M5's
  reported clause — so `hay que` and `tengo que` index whole.
- `duele` and `cabeza` are L2-M8's; M7 points back at them and spends on the perfect instead.
- `parece` is M3's and M6 points back at it for the `gustar` class.
- Every backshifted cell (M5's `venía`, `vendría`, `quería`) and every participle (M7's `hecho`,
  `perdido`, `ido`) is its own key, deconstructed where it is first shown, with its note pointing
  back at the bare verb's row. **No L1 or L2 file is edited** — `docs/53` §2, unchanged.
- Proper nouns never index (#61), so every account, festival and direction anchors on a common
  noun.

## 4. The shape of the level

- Bounds climb 10 → 12: M1–M3 at 10 words, M4–M7 at 11, M8–M10 at 12 — continuing L2's 8 → 10 and
  matching hi-mr's L3.
- `newWordCap` stays the PRD §5 25 everywhere; pools are authored to 12, the course's shipped size.
- M10's items are six-to-eight-sentence accounts, and its lesson is that **three pasts now share
  one account**: the imperfect sets the scene (L2-M10's), the preterite moves it (L1-M5's), and the
  perfect (M7's) is what is still true at the moment of telling. That third slot is what L3 added.

`npm run content:prompt -- en-es L3-M1` renders today from the real index, and the bounds, the
withheld-piece owners, the two collision payments and the L4 deferrals are pinned by
`tools/course-briefs.test.ts` (`en-es L3: the decisions its briefs settle (#462)`).
