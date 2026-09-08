# hi-en L3 — the authoring-brief decisions (#464)

The ten hi-en L3 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['hi-en']` L3-M1…L3-M10) are the
fourth L3 briefed, after hi-mr (`docs/50`), en-es (`docs/69`) and en-ar (`docs/70`). Every seam
below was pinned against the REAL cumulative index — the fold of
`public/content/hi-en/index/L1-M1.json` through `L2-M10.json`, rebuilt and read on 2026-09-08:
**513 surfaces, maxSpan 3** — and against the review chain the level inherits, `docs/39` (spoken
English for Hindi speakers) and `docs/63`'s L2 questions.

This note records the decisions the briefs are written to, so the authoring waves (#473, #482 and
the M6–M10 issue) inherit them without re-deriving anything. The briefs repeat each decision in the
module notes, because a prompt only ever shows an author the notes.

## 1. This course's asymmetry, restated because L3 leans on it hardest

hi-en is the one course in the repo whose TARGET language is English. Every other course teaches
English speakers a foreign shape; this one teaches a Hindi speaker the shape English insists on.
That inverts what a delta is: the interesting facts are not what English has, but what English
FORBIDS where Hindi allows it. Four of them carry whole modules:

- **Stative verbs never take `-ing`** (M1). Hindi's जानना and चाहना take the continuous freely, so
  `*I am knowing` is correct Hindi thinking and the single clearest marker of Indian English.
- **Uncountable nouns** (M2). `*informations`, `*advices` — a short, closed, learnable list.
- **`agree` is a verb, not an adjective** (M3). `*I am agree` comes straight from मैं सहमत हूँ,
  where सहमत really is an adjective.
- **`-ed` against `-ing` adjectives** (M6). "I am boring" is a statement about your personality and
  a learner says it weekly.

M4 adds the fifth: **no `will` after `if`**. Hindi marks the future in both halves
(अगर बारिश होगी तो …), so the learner's sentence is correct Hindi and the commonest conditional
error in Indian English.

Where the Hindi maps cleanly, the briefs say so rather than warning anyway. M10's `used to` is
almost exactly करता था, and the note says it — a brief that warns about everything teaches a
learner to distrust their own instincts.

## 2. What L2 withheld, and where it lands

`docs/55` §4 named five things. Each has an owner:

- **Reported speech → L3-M5**, which is why L2-M7 took a message with `Can I take a message?`.
- **Conditionals → L3-M4**, beyond L2's frozen `Would you mind`.
- **The passive → L3-M8**, because a form, a bill and an office are where English uses it and
  almost the only place a learner needs to PRODUCE it.
- **Relative clauses → L3-M9**, because describing a festival to somebody who has never heard of it
  is the first job in the ladder that cannot be done without one.
- **The past perfect and `used to` → L3-M10**.

And the piece L2 half-lifted: **the present perfect's duration use → L3-M7**. L2-M8 lifted the
present-result use only and named experience and duration as L3's. M7 takes duration with `for` and
`since`, and restates L2-M8's law — the perfect can never carry a finished time expression —
because a duration sentence looks like an invitation to break it.

Standing, and named where they would be reached for: the **third conditional** (L4-M3), the
**perfect and continuous passive** (L4), and the **experience use** of the perfect, which no L3
module needs.

## 3. Seams

- `would` is L2-M5's row (`would like`). M4's conditional `would` is the same word doing a second
  job, so M4 points back and writes the rule around it.
- `which` is L2-M9's row (the question word). M9's relative `which` is a second job on it.
- `that` stays L1-M9's across all of its jobs — the complement clause, M3's opinion clause, M9's
  relative — and each brief's note is written true of the job it uses.
- `in` gains a fourth job at M9 (`in October`), pointed back at L1-M4's row, never re-opened.
- `have` / `has` stays L2-M8's perfect-auxiliary row; M7 adds only its duration job.
- `work` is L1-M4's verb row doing its noun job at M2 — the uncountable rule is written around it.
- Every phrasal verb (`fill in`, `hand in`, `send off`) and every fixed frame (`a piece of`,
  `feel like`, `to be honest`, `I think so`, `if I were you`, `had better`, `every day`,
  `in the morning`) indexes **WHOLE**, so the bare `so`, `like`, `day`, `morning` and `were` keys
  are not spent on a phrase. maxSpan stays 3.
- Each `-ing` / `-ed` adjective pair is ONE row with both shapes in its `forms`, because they are
  one word doing two jobs.
- Every backshifted cell (M5) and every past participle (M8, M10) is its own key, deconstructed
  where it is first shown, pointing back at the bare verb's row. **No L1 or L2 file is edited** —
  `docs/55` §2, unchanged.
- `for` and `since` (M7) are two of the most reused words in English, and M7 owns both: their notes
  are written true of the jobs later modules give them.

## 4. The shape of the level

- Bounds climb 10 → 12: M1–M3 at 10 words, M4–M7 at 11, M8–M10 at 12 — continuing L2's 8 → 10.
- `newWordCap` stays the PRD §5 25 everywhere; pools are authored to 12.
- M10's items are six-to-eight-sentence accounts, and its lesson is that **three past tenses share
  one account**: the past continuous is the background, the past simple moves the story, and the
  past perfect reaches further back — used only when the order matters and is not otherwise
  obvious, because a learner who uses it for every earlier event has written something exhausting.

`npm run content:prompt -- hi-en L3-M1` renders today from the real index, and the bounds, the
withheld-piece owners, the four interference markers and the L4 deferrals are pinned by
`tools/course-briefs.test.ts` (`hi-en L3: the decisions its briefs settle (#464)`).
