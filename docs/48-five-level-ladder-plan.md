# Five levels per course — the plan for L4 and L5, and for filling L2–L5

**Date:** 2026-09-07 · **Status:** a plan. Nothing else changed on this branch — no code, no content,
no ratification. The two screenshots in `docs/images/ladder-five-levels-*.png` are the only other
files it adds, and they come from a throwaway build described in §7.

**The goal, as stated by the owner:** the app holds content and UI for **five levels** per
language. Today every course lists three (L1 Foundations · L2 Conversations · L3 Fluency) and ships
one. So "two more levels" is L4 and L5 in the ladder, and "holds content" is forty unauthored
modules per course, not twenty: L2 and L3 are placeholder lists too.

## The answer in six lines

- **The ladder becomes 5 × 10 per course.** L4 and L5 get names, taglines and ten-module lists
  (§4, proposed here; ratified the way #112 ratified L2/L3).
- **The app already climbs any ladder `levels.json` lists.** The engine, the seal rule, the level
  strip, the store, the offline warm and the export format are all list-driven. Verified with a
  temporary five-level hi-mr ladder: it builds, renders, seals and fits at 360 px (§7).
- **What breaks is the id grammar.** `L[1-3]` in the schema and in two tools, and the prompt
  generator's prior-module lookup, which would silently render an L4 prompt with no vocabulary.
  One small PR (§2).
- **The real work is content.** 40 modules × 9 courses = 360 modules and 360 briefs. Only hi-mr L2
  is briefed. A level is planned against the verified level below it, so each course goes
  L2 → L3 → L4 → L5, and courses run in parallel (§3).
- **Two engineering changes are needed before the content grows past L3:** a `formal` value in the
  register enum (every course's L2-M1 is "Asking politely"), and delta word indexes — the
  per-module cumulative index files go quadratic, about 2.9 MB raw per course at fifty modules
  against ~150 KB today (§5).
- **Order:** the structure PR → ratify L4/L5 → hi-mr L2 waves (its briefs exist) → the other eight
  L2s in parallel → L3 everywhere → the index change → L4 → L5.

## 1. Baseline — what is true on `main` today

- Nine courses ship L1 (ten modules each, `verified: true` on LLM review plus owner authority;
  `docs/07`–`docs/47`). Every `content/<id>/levels.json` lists L2 and L3 with `draft: true`,
  `hasContent: false`, nothing authored. The `draft` flag has no render site — since #398 the strip
  shows only `LEVEL n`, and level names and taglines are not drawn anywhere.
- hi-mr has ten L2 briefs (`tools/course-briefs.ts`, #295, decisions in `docs/26`). No other course
  has an L2 brief; no course has an L3 brief. `npm run content:prompt -- hi-mr L2-M1` renders today.
- The pipeline rules that apply to every level unchanged: exactly 10 sentences, pool ≥ 6 (authored
  to 12), **M1–M3 of any level fully enriched** (`tools/validate.ts` checks the module number, not
  the level), `prerequisites` only within the same level (so every `L<n>-M1` lists `[]` and the seal
  rule carries the cross-level dependency), the gate (`verified` and not `fixture`), the cumulative
  first-occurrence-wins index, and the pool-token rule against it. The prompt CLI feeds the PRIOR
  module's index and already crosses levels (`L2-M1` ← `L1-M10`).
- The real cumulative index through L1-M10, rebuilt today (`--with-unverified --with-fixtures`):
  - hi-mr 222 surfaces, maxSpan 1 (docs/26 and the briefs header say 215 — the spoken pass of
    2026-09-05 added seven; refresh the number when L2 authoring starts)
  - en-es 228 / 3 · en-ar 287 / 3 · hi-en 259 / 3 · en-ru 228 / 3 · en-it 263 / 3 · en-fr 175 / 4 ·
    en-de 203 / 3 · en-ko 185 / 2
- Emitted bytes per course today (22 files: 10 modules, 10 indexes, levels, strings): 363 KB
  (en-fr) to 544 KB (hi-en) raw, of which the ten cumulative index files are 103–161 KB, at about
  104 bytes per surface entry.

## 2. Track A — make the ladder five levels (one PR, size M)

### A1. The id grammar — the only hard failure

A synthetic `L4-M1` (hi-mr L1-M1 re-numbered) against today's validator fails on every id:
`/id — must match ^L[1-3]-M([1-9]|10)$`, then one line per sentence and pool item. And
`priorModuleId('L4-M1')` returns `null`, which the prompt CLI reads as "first module — empty
inventory": an L4 prompt would render with no allowed-vocabulary section and invite the author to
invent 25 words. That is the dangerous one, because it does not error.

- `content/schema/module.schema.json` — the three patterns `moduleId`, `sentenceId`, `poolItemId`:
  `L[1-3]` → `L[1-5]`.
- `tools/validate.ts` `parseModuleId` and `tools/content-build.ts` `parseModuleId` (ladder
  ordering, `moduleRanges`) — same widening.
- `tools/generate-prompt.ts` `priorModuleId` — widen, and fix the comment ("the L1-3/M1-10 grid").
- `src/state/serialize.ts` already accepts `L\d{1,2}` on purpose ("a file that stopped importing
  because L4 shipped would be the export contract failing") — leave it.
- Add a `tools/` test pinning the grammar at `L5-M10` and `priorModuleId('L4-M1') === 'L3-M10'`;
  the deleted `generate-prompt.test.ts` is the precedent for where such pins lived.

### A2. The lists

- Every `levels.json` gains `L4` and `L5`: id, name, tagline, `draft: true`, a `draftNote` naming
  the ratification issue, ten `{id, title, job, hasContent: false}` rows from §4.
- Reword the nine L2/L3 `draftNote`s, which all say "the same 3 x 10 shape as hi-mr".
- `src/course/types.test.ts` reads every ladder off disk and checks keys, not counts — no change.
  `tools/course-briefs.test.ts` mirrors briefs onto the ladder — no change until briefs exist.
- Optionally extend `src/test/courseContent.ts`'s `levelsFixture` to five levels so
  `store.test.ts` exercises the seal cascade at L4/L5 (today it stops at L2-M1).

### A3. UI — measured, and no code change required

- The level strip is `display: flex` with `flex: 1` cells, so five cells share the width. At 360 px
  each cell is 72 px; a sealed cell's `LEVEL n` label (55 px in `--text-kicker-sm`) plus its lock
  runs to the cell's right edge, eating the inline padding — legible, flush, not clipped
  (`docs/images/ladder-five-levels-360.png`). At 430 px it is comfortable
  (`…-430.png`). The active cell (label plus ten squares) is narrower than a sealed one.
- Optional polish, one line in `LevelStrip.module.css`: cell padding `--space-3` → `--space-2`, or
  the head's gap. hi-mr and hi-en print `Level n` in mixed case, which is narrower still.
- Everything else derives from the list: `currentRungId`, `levelSealed` (cascades: L3–L5 sealed
  while L2 is), the sealed toast's `{remaining}` (counts every unpassed rung below), the position
  line, the unlock beat at a level boundary, the quiet all-complete state (now at L5), the Verdict's
  next-rung title across a boundary, the offline warm (`courseAssetPaths` walks every level).
- Design record: `design/PRD-design.md` §3/§6 say "three levels of ten" and §5.1's third state is
  "All three levels complete"; `design/` is read-only, so the divergence is recorded in
  `docs/design-contract.md` as its own section, and the ratification issue carries the note for the
  next design re-copy, the way [Q1] did.
- Level names and taglines stay undrawn (PRD-design §6.1: none for levels whose modules are not
  authored). Bringing them back on a level that ships is a design follow-up, not part of this.

### A4. Words to update in the same PR

- `src/course/types.ts` (the "3 levels × 10 rungs" and "L1 Foundations, L2 Conversations, L3
  Fluency" comments), `src/test/courseContent.ts`, `src/screens/LadderScreen.tsx` ("three cells"),
  `src/screens/ladder/LevelStrip.tsx`, `tools/generate-prompt.ts`'s "remaining courses' L2/L3 module
  lists are pending (PRD §5)" failure text (they have been ratified since #112).
- `docs/01-plan.md` §1 and §5, `README.md` (two "3 × 10 ladder" mentions and each course's "Its
  L2/L3 ladders stay `draft: true`" line), `docs/design-contract.md` (the divergence section).
  `docs/PRD-*.md` are the historical v2.0 copies and stay as they are.

## 3. Track B — fill the levels (content, the bulk of the work)

### B1. The unit of work, unchanged from L1

Per course per level, four issues, exactly the hi-en / en-de / en-ko chain:

1. **Briefs** — ten `ModuleBrief`s in `tools/course-briefs.ts`, mirroring `levels.json` verbatim
   (the test enforces it), a decisions section in the file header, a short decisions note in
   `docs/` (the `docs/26` shape), and a test block pinning the decisions (the en-ko block is the
   template). Written against the REAL emitted index of the level below, rebuilt and read.
2. **Author + verify M1…M2**, 3. **M3…M5**, 4. **M6…M10** — each wave: `npm run content:prompt`
   per module in ladder order, rebuilding the index between modules; author; `content:validate`;
   `content:build`; the LLM review; flip `verified` with `verifiedBy`/`verifiedAt`; `hasContent`
   is recomputed by the build. The third wave clears the level's `draft` flag and `draftNote`, as
   the L1 graduations did.

Nine courses × four levels × four issues = 144 issues, 360 modules. hi-mr L2 starts at issue 2:
its briefs issue (#295) is closed.

### B2. The sequencing rule, and the order

- The rule already in the briefs header: a level's briefs are planned against the verified ladder
  below it, not ahead of it — the seams, the debts and the index are only knowable then. So per
  course the order is strict, L2 → L3 → L4 → L5, and a level's briefs issue opens when the level
  below has shipped its M6–M10.
- Across courses, parallel: en-fr, en-it and en-ru each went from briefs to a graduated L1 on
  separate branches on 2026-08-29/30 and merged the same day. The same fan-out applies.
- Recommended order: (1) Track A; (2) hi-mr L2 waves — the only level that can start today;
  (3) the eight other L2 briefs issues, then their waves in parallel; (4) L3 for all nine;
  (5) §5's index change, before any course ships L3-M10; (6) L4; (7) L5. L2 and L3 authoring does
  not wait for Track A — only an L4 file needs the widened grammar.

### B3. What each course's L2 briefs must settle first

The "decisions a brief must settle" header sections exist for every course at L1; L2 needs one
each, and the same pressure points recur. Per course, the shortest honest list:

- **hi-mr** — done (`docs/26`): register (तू vs तुम्ही) in M1, forms never edit an L1 file, seams
  decided, bounds 8 → 10. Refresh "215 surfaces" to 222 in the header and note.
- **en-es, en-fr, en-it, en-de** — the polite address (usted · vous · Lei · Sie) that L1 kept out
  of every display enters at L2-M1, and its paradigm is a whole second verb system: the brief must
  say which modules speak it (the counter, the phone, the stranger) and needs the `formal` register
  value (§5). Also: preterite/imperfect (es), passé composé/imparfait (fr), passato prossimo/
  imperfetto (it) and the Perfekt (de) at L2-M10; the dative and the two-way prepositions for de's
  L2-M4/M7; subjunctive, conditional and Konjunktiv II are named as L3-M3/M4's, not L2's.
- **en-ru** — the cases L1 held to nominative/accusative: dative in M1's requests, genitive in M3
  and M9, instrumental in M4's transport; aspect pairs at M10; imperative pairs at M1; the ё/е and
  stress-mark rules continue unchanged.
- **en-ar** — MSA stays the variety; the imperative at M1 with the hamza/ʿayn round-trip; plural and
  dual agreement at M3; decide whether L2's `usage` prose may name a dialect form where the MSA
  line sounds stiff on a phone or at a table (recommend: prose only, never `display` or `script`).
- **hi-en** — English register is words not forms (please · could you · would you mind) at M1; the
  contraction policy extends with new owners (I'd, you'd, won't, can't); tag questions at M7;
  reported speech is L3-M5's and stays out.
- **en-ko** — the speech level decided course-wide at L1 (`-yo`) meets honorifics at M1: recommend
  `-yo` stays the display level, `-(eu)seyo` honorific verbs enter as their own rows, and formal
  `-pnida` is named in `usage` only until L3; the particle hyphen and pure-ASCII rules continue;
  the Hangul `script` line is still unbundled (#382).
- **Every course** — word bounds climb per level: L2 8 → 10, L3 10 → 12, L4 12 → 14, L5 14 → 16;
  `newWordCap` stays 25 (PRD §5); pools authored to 12; M1–M3 fully enriched at every level.

### B4. The M10 shape — one decision to take before L3

L2-M10 is "a four-sentence account" and L3-M10 "an eight-sentence account, written unaided". The
hi-mr L2-M10 brief reads the account as the ITEM: one `display` of four sentences, the per-sentence
bound applying inside it. That is the Practice card's reveal and the "why" panel's row list, so it
cannot keep doubling. Recommend: cap an M10 item at eight sentences from L3 on, and let L4-M10 and
L5-M10 differ in KIND (dialogue inside a narrative; a register switch midway), not length. Also
amend L3-M10's job tail — "written unaided" describes the notebook exit that #348/#349 retired.

### B5. Review bar and the paper trail

- Same bar as L1: LLM review authorised by the owner, `verifiedBy` naming it, open questions listed
  per review. The native gate is unmet on every course and its debt grows fivefold; say so in each
  review as the L1 reviews do.
- Trim the paper: one review doc per course per level with three wave sections (36 documents
  from L2 to L5) instead of one per wave (108). Numbering continues from `docs/49`.

## 4. The proposed L4 and L5 — to ratify, the way #112 ratified L2/L3

Shared defaults across the nine courses (a course may override in its `levels.json`, as PRD §5
allows). Each job is a speech job with a grammar payload, in the idiom of the ratified lists; the
briefs decide the payload per pair. Nothing here asks the learner to read or write a script
(`docs/design-contract.md`, #353).

**L4 — Nuance — "say it the way they do"**

1. Explaining how — Steps and instructions in order, and what they are for
2. Cause and consequence — Why things happen and what follows, across a paragraph
3. What might have been — Regrets and past hypotheticals
4. Persuading — Make a case, concede a point, hold your ground
5. Disagreeing well — Soften, hedge, save face
6. Before and after — Time clauses: while, until, since, already, not yet
7. Official talk — Announcements, offices and counters: the formal register you hear
8. Back then — Habits and states in the past; then against now
9. Places and journeys — A trip told in full, with directions inside it
10. A story with a twist — A six-sentence narrative with a line of dialogue inside it

**L5 — Voice — "your own words, at length"**

1. Sayings and idioms — The figurative everyday, and when it is used
2. Humour and teasing — Banter, irony, and when not to
3. How they say it there — Regional and generational speech; what marks an outsider
4. Formal occasions — Toasts, speeches, condolences, ceremonies
5. Big questions — Values, beliefs, abstract talk
6. Arguing a position — A structured case, objections answered
7. Between the lines — Implication, sarcasm, indirect requests
8. When words run out — Paraphrase, ask what something means, repair a misunderstanding
9. Telling it your way — Retell a known story in your own register
10. Your own voice — An eight-sentence piece that changes register midway

## 5. Engineering changes the content needs (two, small, before L3 ships)

### 5.1 `register` gains `formal`

- Every course's L2-M1 is "Asking politely … in the right register", and four of the nine L2s
  introduce a polite address that is a verb paradigm, not a word. The enum is `neutral | informal`;
  hi-mr's L2 briefs and en-it's L1 header both record working around its absence.
- Change: the enum in `content/schema/module.schema.json`, `Register` in `src/course/types.ts`,
  `ModuleSentence.register` in `tools/validate.ts`, the comment in `SentenceScreen.module.css`.
  The chip prints the raw value (`UsageSection.tsx`), so no strings key is involved. Land before
  any L2-M1 is authored; hi-mr's L2-M1 note then reads "chip the formal end `formal`" instead of
  "carry it in `usage`".

### 5.2 Delta word indexes — the quadratic cost

- Each module's index file is cumulative through itself. At ten modules that is ten files of
  103–161 KB; at fifty modules adding ~22 surfaces each, the sum is Σ c_k ≈ 22 × 1275 ≈ 28,000
  entries × 104 bytes ≈ **2.9 MB raw per course**, all of it fetched by the offline warm, against
  ≈ **115 KB** if each file carried only its own additions. Modules themselves grow linearly
  (≈ 1.2–1.9 MB raw per course at fifty).
- Change: `tools/content-build.ts` emits `index/<id>.json` as the module's OWN additions plus the
  existing `cumulativeThrough` list; `src/course/content.ts`'s `loadIndex` folds the deltas of the
  ladder through that module in ladder order (first occurrence wins is preserved by fold order;
  `maxSpan` is the maximum over the folded files). The build-time pool-token check keeps its
  in-memory cumulative index and is untouched; `WhyPanel` and `wordIndex.ts` see the same shape
  as today. Cache the fold per module id the way the loaders cache promises.
- Land before any course ships L3-M10, when a course's index set passes ~1 MB raw. Keeping
  cumulative files is workable on a phone but the wrong default for forty more modules.

### 5.3 Costs that are reported, not gated

- Payload: no ceiling exists since #304; `npm run budget` prints `course:<id>` and
  `precache:<id>` per build. Fonts re-subset from the emitted text automatically.
- Out of this plan's scope but worth the owner's eye: the Leitner queue enrols every passed
  module's ten sentences and a session serves at most five reviews, so at forty passed rungs 400
  items cycle on 1/3/7-session intervals — a backlog by design at three levels, larger at five.
  A policy (enrol the last N rungs, or scale reviews per session with the level) is its own issue.

## 6. Decisions for the owner, and the issues to file

Decisions:

- Ratify the L4/L5 names and lists in §4 (or amend them) — the twin of #112 / [Q1].
- `formal` register: yes or no (recommend yes, before any L2-M1).
- Delta indexes: yes or no, and when (recommend before L3-M10 anywhere).
- The M10 item cap (recommend eight sentences from L3; L4/L5 vary in kind).
- The review bar stays LLM plus owner for 360 modules, or a native pass is scheduled somewhere.

Issues, in the task template's shape:

- `[Ladder] Five levels per course — widen the id grammar to L1–L5, add the L4/L5 draft lists,
  record the divergence` (Track A, size M).
- `[Content] Ratify the L4/L5 module lists and level names` (size S; closes the note above).
- `[Schema] Add formal to the register enum` (size S).
- `[Content pipeline] Emit delta word indexes and fold them at load` (size M).
- Per course per level, four: `[Content <id>] Write the L<n> authoring briefs`, `Author + verify
  L<n>-M1…M2`, `… M3…M5`, `… M6…M10` — starting with hi-mr L2's three authoring waves.
- Follow-ups, unscheduled: `[Ladder] Draw a shipped level's name on the strip`, `[Practice] Review
  backlog policy at fifty rungs`.

Effort, at the pace on record (one course's L1 — briefs and three waves — in a day of sessions):
Track A plus §5 about three days; content 36 course-levels, roughly 36–50 session-days, mostly in
parallel across courses and strictly serial within one.

## 7. How this was checked

- `npm ci`, then `npm run content:build -- --with-unverified --with-fixtures` for the index counts
  and byte sizes in §1 (read from `public/content/<id>/index/L1-M10.json` and `sizes.json`).
- A synthetic `L4-M1` run through `validateModule` for the failure lines in §2; `priorModuleId`
  and `moduleRanges` called directly; the progression engine fed a five-level ladder with L1 passed
  (L2 unsealed, L3–L5 sealed, `L2-M1` current and `pending`, fifty statuses derived).
- hi-mr's `levels.json` temporarily extended with placeholder L4/L5 lists, a full `vite build`,
  `vite preview`, and headless Chromium at 360 × 780 and 430 × 780 for the strip measurements and
  the two screenshots. The ladder file was restored afterwards; the branch carries no content
  change.
