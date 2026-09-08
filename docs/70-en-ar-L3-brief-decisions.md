# en-ar L3 — the authoring-brief decisions (#463)

The ten en-ar L3 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['en-ar']` L3-M1…L3-M10) are the
third L3 briefed in any course, after hi-mr's (`docs/50`) and en-es's (`docs/69`). Every seam below
was pinned against the REAL cumulative index — the fold of `public/content/en-ar/index/L1-M1.json`
through `L2-M10.json`, rebuilt and read on 2026-09-08: **508 surfaces, maxSpan 3** — and against
the review chain the level inherits, `docs/42` (spoken Arabic) included.

This note records the four decisions the briefs are written to, so the authoring waves (#472, #481
and the M6–M10 issue) inherit them without re-deriving anything. The briefs repeat each decision in
the module notes, because a prompt only ever shows an author the notes.

## 1. The romanization laws, unchanged

Every decision of `docs/34` and `docs/54` carries: one word → one key, hamza folding to `'` and
ʿayn staying `ʿ`, the hyphenated clitic indexing both whole and by part, short vowels always
written. Every romanized surface in the ten briefs was round-tripped through
`src/engine/surface.ts` before it was written down.

## 2. What L2 withheld, and how much of it L3 takes

`docs/54`'s "What L2 withholds" list names seven things. L3 takes **three of them, narrowly**, and
leaves four standing:

- **`lam` and the jussive → L3-M4**, for one job only: `lam` + jussive is the ordinary negative
  past. The jussive as a MOOD is L4's, with the single exception of the prohibition frame
  `lā tadhhab`, which an advice module cannot do without.
- **`qad` → L3-M7**, where a symptom is by definition still true. It is a particle and not a tense,
  and nothing about the verb changes.
- **One cell of the case system → L3-M3**, on one trigger: `anna` and its sisters put the following
  noun in the ACCUSATIVE. The case system itself stays out of L3 exactly as it stayed out of L2 —
  what M3 opens is a single, audible, unavoidable consequence of one particle.

Standing, and named in the brief that touches each edge:

- **The passive verb** (L4). M8 teaches the PASSIVE PARTICIPLE instead — `maṭlūb`, `mamnūʿ`,
  `maftūḥ` — because that is what a sign is actually written in, and they behave as ordinary
  adjectives. Same narrowing `docs/54` applied to `laysa`.
- **The dual as a system** (L4). M7 shows `yawmayn` as vocabulary inside a duration frame and says
  so.
- **The subjunctive beyond `yajibu an` and `yumkinu an`** (L4), both opened at M2 as frames.
- **Broken plurals as a derivational system.** They stay vocabulary, listed in the `forms` of the
  row that teaches the singular, and no rule claims the pattern is predictable, because it is not.
  M9 restates it, because a calendar module is where a learner meets the most of them at once.

## 3. Seams — three collisions, all paid by pointing back

- **`law` is L2-M1's row.** It was opened inside the request frame `law samaḥt` ("if you please"),
  and M4's conditional `law` is the same word. M4 points back and writes the rule around it; a
  learner who met it as "please" will not otherwise recognise it as "if".
- **`bi-` is L1-M2's clitic row**, and M6's `ashʿuru bi-` is a second job on it, not a second row.
- **`li-` is L1-M9's clitic row**, and M3's `liʾanna` is that letter doing a bigger job.
- `yuʿjibunī` (M6) and `yuʾlimunī` (M7) are one class, not two: M7 points back at M6 rather than
  presenting the shape twice.
- `anna` (M3) carries the reporting job too, so M5 points back at it; `inna` is a separate key and
  is named in `usage` as the sentence-initial twin rather than taught.
- `mā idhā` (M5), `fī raʾyī` (M3), `baʿda dhālika` (M1) and every frozen greeting (M9) index
  **WHOLE**, so the bare `mā`, `fī` and `dhālika` keys are not spent on a phrase — the multi-token
  tool `docs/54` §4 already used for `min faḍlika` and `alḥamdu lillāh`.
- Every maṣdar (M1), every jussive cell (M4), every possessive-suffixed body part (M7) and every
  agreeing feminine (M6, M8) is its own key where it is a separate word and a `forms` entry where
  it is a shape of one — and **no L1 or L2 file is edited**, `docs/54` §2 unchanged.

## 4. The shape of the level

- Bounds climb 10 → 12: M1–M3 at 10 words, M4–M7 at 11, M8–M10 at 12 — continuing L2's 8 → 10.
- `newWordCap` stays the PRD §5 25 everywhere; pools are authored to 12.
- The level's own arc is nominal → verbal: M1 opens the **maṣdar**, M2 opens the **iḍāfa**, and M8
  and M9 spend both again on signs and on a calendar. That is not a theme imposed on the modules —
  it is what Arabic actually does with a day, a job and a public notice.
- M10's items are six-to-eight-sentence accounts, and its two laws are `kāna` + imperfect for the
  habitual background and the **verb-before-subject agreement** `docs/54` wrote for L2-M10, now
  tested with named subjects across eight sentences rather than dodged with pronouns.

`npm run content:prompt -- en-ar L3-M1` renders today from the real index, and the bounds, the
withheld-piece owners, the point-backs and the L4 deferrals are pinned by
`tools/course-briefs.test.ts` (`en-ar L3: the decisions its briefs settle (#463)`).
