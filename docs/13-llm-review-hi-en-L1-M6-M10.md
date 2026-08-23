# LLM review — hi-en L1-M6, L1-M7, L1-M8, L1-M9 and L1-M10

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Fable 5), which
cannot hear anything and is not a fluent-English editor in the sense a course like this eventually
needs — it wrote the English, the Hindi teaching prose and the pronunciation glosses, and then
audited all three. `verified: true` on the five modules rests on the repo owner's standing
authority, exactly as hi-mr's (PR #190), en-es's (#192–#194), en-ar's (#199–#201) and hi-en
M1–M5's (#270 / #271, `docs/11-llm-review-hi-en-L1-M1-M2.md`, `docs/12-llm-review-hi-en-L1-M3-M5.md`)
flips did; `verifiedBy` says so in words: `"Claude Fable 5 — LLM review, authorised by repo owner"`,
`verifiedAt` `2026-08-23`. **No native or fluent-English gate exists for this course**, and the
open-questions list at the bottom is the outstanding work.

Nothing here reaches a learner yet: `content/courses.json` still carries `fixture: true` on the
hi-en row, so the strict build skips the course entirely (#273 flips it). A dev build
(`--with-unverified --with-fixtures`) now ships **all ten L1 rungs** — the ladder is complete.

## What was authored

| | L1-M6 Tomorrow | L1-M7 Where things are | L1-M8 Numbers & shopping | L1-M9 Feelings & opinions | L1-M10 Connected talk |
|---|---|---|---|---|---|
| sentences | 10 | 10 | 10 | 10 | 10 turns |
| new word rows | 16 of 25 | 17 of 25 | 17 of 25 | 16 of 25 | 13 of 25 |
| pool items | 9 | 10 | 10 | 9 | 10 |
| tokens per sentence | 4–7 (bounds 3–7) | 4–7 (bounds 3–7) | 3–7 (bounds 3–7) | 4–8 (bounds 3–8) | 2–8 per sentence inside a 5–14-token turn (bounds 2–8) |
| tenses | `future`, `present_continuous` | `simple_present` | `simple_present` | `simple_present` | `simple_present`, `simple_past`, `future` |
| enrichment | full (optional from M4 — kept) | full | full | full | full |
| `literal` | every sentence | every sentence | every sentence | every sentence | one per turn |
| `glossEn` | none (#268) | none | none | none | none |
| prerequisites | `["L1-M5"]` | `["L1-M6"]` | `["L1-M7"]` | `["L1-M8"]` | `["L1-M9"]` |
| cumulative index | 126 surfaces, `maxSpan` 2 | 148, `maxSpan` 3 | 171, `maxSpan` 3 | 188, `maxSpan` 3 | **202**, `maxSpan` 3 |
| keys this module added | 18 | 22 | 23 | 17 | 14 |

The five were written strictly in ladder order against `tools/course-briefs.ts` (#269) via
`npm run content:prompt`, rebuilding the index between them, so M7's prompt was generated against
M6's real cumulative inventory (126 surfaces), M8's against M7's (148), M9's against M8's (171) and
M10's against M9's (188). No earlier module's file was touched: M6–M10 needed no `wants` / `likes` /
`needs`, so the one precedent for editing a prior file (M5's `be` extension) was not used. The
`maxSpan` step to 3 is M7's `in front of` and M8's `Can I have`. `content/hi-en/levels.json` carries
`hasContent: true` and no `draft` flag on all ten rungs; the L1 `draftNote` now says so (the
level-level `draft: true` is #273's to drop, as en-es's was #195's).

**The four decisions of the briefs' hi-en header, as shipped in M6–M10:**

1. **Language of every field.** Every `rules[].text`, word `note`, `cue`, `trap`, `sound`,
   `variations[].changed`, `mistake.why`, `usage` and `mnemonic` is Hindi in Devanagari, quoting the
   English it explains but never switching into English prose — M10's turns included, where the
   temptation to slip an English aside into a note is strongest; `display` and `forms` are English
   with no Devanagari; no sentence carries `glossEn`; every sentence carries `literal` (M10: one
   literal for the whole turn). `src/course/types.test.ts` asserts all of this for the ten files.
2. **Contractions.** `it's` (M7) is ONE row with `forms` `It's · It is`, so `It is behind the door`
   (a variation) and any later `it is` open the same note; `display` contracts wherever speech does
   (`It's behind the door` · `I'm meeting her tomorrow`) and writes `it is` only where the brief says
   (the full-form variation). **One recorded deviation:** M6's `I'll` row lists ONLY itself
   (`forms: []`), not `I'll · I will` as the policy's letter says — because the same brief says
   `will` is the lesson and *the learner must be able to tap it* in `I will go to Delhi tomorrow`,
   and a two-token `I will` key would have swallowed every `I will …` into the contraction row.
   `I will` therefore resolves to `I` + `will` (two true notes) and `I'll` to its own row, whose note
   says it is `I` + `will`. `won't`, `isn't`, `she'll` stay out of L1. No possessive `'s` anywhere;
   `it's` is the only `'s` any display writes, and the language test was narrowed to allow exactly it.
3. **One `be` row.** M6's `she is coming`, `we are going to`, M7's `The book is`, `Where is`, `Is it`,
   M9's `I'm` / `she is angry` and M10's `She works` … all resolve `is` / `are` / `am` to
   `L1-M1-S01` `words[2]`; M7's `is` inside `there is` is captured by the whole `There is` surface
   (the longest match wins), and the `There is` row's note says why the `is` is not M1's lesson.
4. **Multi-token surfaces.** `going to` (M6), `There is · There are` (one row), `next to`,
   `in front of` (M7), `How much`, `How many`, `Can I have` (M8) and `See you` (M10) are whole rows;
   the bare parts `going`, `there`, `next` (M6's own row, not M7's), `front`, `much`, `many`, `can`
   are unclaimed, and `to`, `is`, `how`, `have`, `see`, `you` stay with M3, M1, M2, M4, M5 and M2
   respectively — pinned in `tools/content-build.test.ts`.

## The slogan traps, and what was written instead

The briefs name the memorable-and-false rule each module attracts (`course-briefs.ts` rule 2).
What shipped:

- **"will is the future"** → M6 rule 1 refuses it in words — *किताबी जवाब है, बोलचाल में तीनों में
  सबसे कम* — and states the three roads as a law about the speaker's state: `will` = a decision
  taken now or a prediction, `going to` = a plan already made (हिंदी का -ने वाला हूँ), `be + -ing` =
  an arrangement fixed with someone; a time word with every one. `will` is written whole in every
  statement and question (`I will go` · `Will you come?`) and the `*I will to go` plate is S01's;
  `*They will eating` is S04's.
- **"going to = जाना"** (the seam the brief flags) → the `going to` row is the PLAN marker, `forms`
  `[]`, and its note says in one clause that movement is `go to / will go to / went to`; no display in
  M6–M10 writes `going to` + a place (M10's market is `went to the market`).
- **"`-ing` means now"** (still) → M6 rule 4: the course's first `-ing` is `be + verb-ing` for an
  ARRANGEMENT only, always with a future time word; `*I meeting her` and `*I am meet her` are the
  plates, and M4's `*I am knowing` is named again.
- **"Hindi order: place after the thing"** → M7 rule 0 states the law (place word BEFORE the noun,
  the article riding along, `के` has no word) and the plates are the Hindi shapes the brief names:
  `*The book is table on` (S01), `*The pen is in box` (S02), `*under of` refused in the `under` note,
  `*near to` (S06 — the Indian-English classic), `*next the shop` (S07), `*in front the shop` (S08).
- **"On the table is a book"** → M7 rule 1: the dummy subject Hindi does not have, `there` fills the
  seat and points nowhere, `is` / `are` by the number of the thing, and the pair a book (new → `There
  is`) vs the book (known → `The book is`) is S09 beside S01; the pool tests both (C05, C06 vs C01).
- **"how much = कितना for everything"** → M8 rule 1: the law is COUNTABILITY, not size or gender;
  `*How much apples` (S08) is the plate, C09 `How much rice` vs C05 `How many books` the pool test.
- **"a number is enough"** → M8 rule 2: the noun after a number takes `-s` (`*five rupee` S02,
  `*Five banana` S10), `of` joins a quantity to its thing (`*A kilo rice` S06), and `one` is the
  counted one against `a` (S09, `I want one apple, not two`).
- **"दीजिए = Give me"** → M8 rule 3 / S05: `Give me two bananas` is named a register error, not a
  grammar error — the politeness Hindi carries in दीजिए / आप lives in `Can I have … please`.
- **"because … so …"** → M9 rule 0 — THE interference of the module — *दो वाक्य, एक जोड़ने वाला — या
  because, या so, दोनों कभी नहीं*; `*Because I'm tired, so I don't want coffee` is S01's plate, `*so
  that` (ताकि) S02's; `so` as intensifier is refused in the `so` and `very` notes (`very much busy` is
  S06's plate).
- **"मुझे भूख लगी है → Me / I have hunger"** → M9 rule 2: feelings are `be` + adjective with the feeler
  as SUBJECT; `*I have hunger` (S07) and `*Her anger is coming` (S08) are the plates.
- **"English is SVO" at turn length** → M10 rule 0 states the never-dropped subject as the mirror of
  en-es's pro-drop: `*How are today?` (S01), `*Will sleep early.` (S03), `*Then went to the market.`
  (S07), `*am late` (S09), `*Will see you tomorrow.` (S10) — five plates, one law — with the fixed
  courtesies named as the only exception.
- **"वह = he"** → M10 rule 1 / S05: `My sister is a teacher. *He works in Delhi.`; nouns and verbs
  carry no gender, the pronoun for a PERSON must be chosen and held for the turn.
- **"second mention: any article"** → M10 rule 3 / S06: `I have a new book. The book is very good.`
  (`*A book is very good` the plate).

## The index audit — where every pool token actually lands

Run against the emitted `public/content/hi-en/index/L1-M<n>.json`, through the real engine
(`matchSurfaces` + `tokenizeSurface` from `src/engine/surface.ts`), resolving each hit back to
`modules/<id>.json → sentences[<sid>].deconstruction.words[<idx>]` — the exact row `WhyPanel` /
`WhyRow` renders. **289 pool tokens over the five modules, 0 unresolved, 0 wrong-word landings**
(M6 53 tokens / 0 forms-hits, M7 54 / 5, M8 45 / 3, M9 59 / 2, M10 78 / 4). Every sentence display
was walked the same way (308 tokens, 0 unresolved, 16 forms-hits); no sentence depends on a row that
comes later in its own module, and no declared row is shadowed (every one of the 79 rows owns at
least one key). M10's turns were walked as the resolver sees them — one token stream across the
sentence boundaries — and no multi-token key straddles a full stop (the only spans that fire are the
ones authored: `good morning`, `thank you`, `going to`, `can i have`, `got up`, `see you`). The same
landings are pinned in `tools/content-build.test.ts` ("lands hi-en M6–M10 on the rows the briefs
assigned") and rendered through the real Why panel in `src/course/hiEnAuthored.test.tsx`.

### L1-M6 — 126 surfaces cumulative, maxSpan 2

| item | display | tokens → row |
|---|---|---|
| C01 | I will go to Mumbai tomorrow | `i` → I (M1-S02 #0) · `will` → will (M6-S01 #0) · `go` → go (M4-S03 #1) · `to` → to (M3-S03 #0) · `mumbai` → Mumbai (M2-S07 #0) · `tomorrow` → tomorrow (M6-S01 #1) |
| C02 | Will you come to Delhi tomorrow? | `will` → will (M6-S01 #0) · `you` → you (M2-S03 #1) · `come` → come (M6-S02 #0) · `to` → to (M3-S03 #0) · `delhi` → Delhi (M1-S03 #0) · `tomorrow` → tomorrow (M6-S01 #1) |
| C03 | She will call you tomorrow | `she` → she (M4-S06 #0) · `will` → will (M6-S01 #0) · `call` → call (M6-S10 #0) · `you` → you (M2-S03 #1) · `tomorrow` → tomorrow (M6-S01 #1) |
| C04 | She is going to cook rice tomorrow | `she` → she (M4-S06 #0) · `is` → is (M1-S01 #2) · `going to` → going to (M6-S05 #0) · `cook` → cook (M6-S06 #0) · `rice` → rice (M5-S03 #1) · `tomorrow` → tomorrow (M6-S01 #1) |
| C05 | We will buy a car next week | `we` → We (M5-S10 #0) · `will` → will (M6-S01 #0) · `buy` → buy (M6-S03 #0) · `a` → a (M1-S04 #0) · `car` → car (M6-S03 #1) · `next` → next (M6-S07 #0) · `week` → week (M6-S07 #1) |
| C06 | They will eat rice at home tomorrow | `they` → They (M6-S04 #0) · `will` → will (M6-S01 #0) · `eat` → eat (M4-S04 #0) · `rice` → rice (M5-S03 #1) · `at` → at (M4-S02 #1) · `home` → home (M5-S05 #1) · `tomorrow` → tomorrow (M6-S01 #1) |
| C07 | I'm meeting her next week | `i'm` → I'm (M2-S04 #0) · `meeting` → meeting (M6-S08 #0) · `her` → her (M6-S08 #1) · `next` → next (M6-S07 #0) · `week` → week (M6-S07 #1) |
| C08 | He is going to visit Delhi tomorrow | `he` → he (M4-S03 #0) · `is` → is (M1-S01 #2) · `going to` → going to (M6-S05 #0) · `visit` → visit (M6-S05 #1) · `delhi` → Delhi (M1-S03 #0) · `tomorrow` → tomorrow (M6-S01 #1) |
| C09 | Will she come on Monday? | `will` → will (M6-S01 #0) · `she` → she (M4-S06 #0) · `come` → come (M6-S02 #0) · `on` → on (M4-S06 #2) · `monday` → Monday (M4-S06 #3) |

### L1-M7 — 148 surfaces cumulative, maxSpan 3

| item | display | tokens → row |
|---|---|---|
| C01 | The bag is on the chair | `the` → the (M3-S07 #0) · `bag` → bag (M7-S04 #1) · `is` → is (M1-S01 #2) · `on` → on (M4-S06 #2) · `the` → the (M3-S07 #0) · `chair` → chair (M7-S03 #1) |
| C02 | Where are the keys? | `where` → Where (M7-S04 #0) · `are` → **is** (M1-S01 #2) *forms-hit* · `the` → the (M3-S07 #0) · `keys` → **key** (M3-S07 #1) *forms-hit* |
| C03 | They are under the table | `they` → They (M6-S04 #0) · `are` → **is** (M1-S01 #2) *forms-hit* · `under` → under (M7-S03 #0) · `the` → the (M3-S07 #0) · `table` → table (M7-S01 #0) |
| C04 | It's in the box | `it's` → It's (M7-S05 #0) · `in` → in (M4-S04 #2) · `the` → the (M3-S07 #0) · `box` → box (M7-S02 #0) |
| C05 | There is a pen in the bag | `there is` → There is (M7-S09 #0) · `a` → a (M1-S04 #0) · `pen` → pen (M3-S02 #0) · `in` → in (M4-S04 #2) · `the` → the (M3-S07 #0) · `bag` → bag (M7-S04 #1) |
| C06 | There are two books on the table | `there are` → **There is** (M7-S09 #0) *forms-hit* · `two` → two (M3-S10 #0) · `books` → books (M1-S09 #0) · `on` → on (M4-S06 #2) · `the` → the (M3-S07 #0) · `table` → table (M7-S01 #0) |
| C07 | Is the shop near the bank? | `is` → is (M1-S01 #2) · `the` → the (M3-S07 #0) · `shop` → shop (M7-S07 #2) · `near` → near (M7-S06 #1) · `the` → the (M3-S07 #0) · `bank` → bank (M7-S07 #1) |
| C08 | The school is next to the bank | `the` → the (M3-S07 #0) · `school` → school (M4-S03 #2) · `is` → is (M1-S01 #2) · `next to` → next to (M7-S07 #0) · `the` → the (M3-S07 #0) · `bank` → bank (M7-S07 #1) |
| C09 | Is it in front of the door? | `is` → is (M1-S01 #2) · `it` → it (M7-S06 #0) · `in front of` → in front of (M7-S08 #0) · `the` → the (M3-S07 #0) · `door` → door (M7-S05 #2) |
| C10 | The cups are behind the box | `the` → the (M3-S07 #0) · `cups` → cups (M7-S10 #0) · `are` → **is** (M1-S01 #2) *forms-hit* · `behind` → behind (M7-S05 #1) · `the` → the (M3-S07 #0) · `box` → box (M7-S02 #0) |

### L1-M8 — 171 surfaces cumulative, maxSpan 3

| item | display | tokens → row |
|---|---|---|
| C01 | How much is this bag? | `how much` → How much (M8-S01 #0) · `is` → is (M1-S01 #2) · `this` → this (M8-S01 #1) · `bag` → bag (M7-S04 #1) |
| C02 | It's twenty rupees | `it's` → It's (M7-S05 #0) · `twenty` → twenty (M8-S10 #1) · `rupees` → rupees (M8-S02 #1) |
| C03 | How much does the book cost? | `how much` → How much (M8-S01 #0) · `does` → does (M4-S08 #0) · `the` → the (M3-S07 #0) · `book` → **books** (M1-S09 #0) *forms-hit* · `cost` → cost (M8-S03 #0) |
| C04 | Can I have a kilo of sugar? | `can i have` → Can I have (M8-S05 #0) · `a` → a (M1-S04 #0) · `kilo` → kilo (M8-S06 #0) · `of` → of (M8-S06 #1) · `sugar` → sugar (M3-S09 #0) |
| C05 | How many books do you want? | `how many` → How many (M8-S08 #0) · `books` → books (M1-S09 #0) · `do` → do (M3-S08 #0) · `you` → you (M2-S03 #1) · `want` → want (M3-S01 #0) |
| C06 | I want ten bananas | `i` → I (M1-S02 #0) · `want` → want (M3-S01 #0) · `ten` → ten (M8-S04 #0) · `bananas` → bananas (M8-S05 #1) |
| C07 | It costs five rupees | `it` → it (M7-S06 #0) · `costs` → **cost** (M8-S03 #0) *forms-hit* · `five` → Five (M8-S10 #0) · `rupees` → rupees (M8-S02 #1) |
| C08 | A bottle of water, please | `a` → a (M1-S04 #0) · `bottle` → bottle (M8-S07 #0) · `of` → of (M8-S06 #1) · `water` → water (M3-S06 #1) · `please` → please (M8-S05 #2) |
| C09 | How much rice do you want? | `how much` → How much (M8-S01 #0) · `rice` → rice (M5-S03 #1) · `do` → do (M3-S08 #0) · `you` → you (M2-S03 #1) · `want` → want (M3-S01 #0) |
| C10 | Two kilos of rice, please | `two` → two (M3-S10 #0) · `kilos` → **kilo** (M8-S06 #0) *forms-hit* · `of` → of (M8-S06 #1) · `rice` → rice (M5-S03 #1) · `please` → please (M8-S05 #2) |

### L1-M9 — 188 surfaces cumulative, maxSpan 3

| item | display | tokens → row |
|---|---|---|
| C01 | I'm happy because I'm at home | `i'm` → I'm (M2-S04 #0) · `happy` → happy (M5-S09 #0) · `because` → because (M9-S01 #0) · `i'm` → I'm (M2-S04 #0) · `at` → at (M4-S02 #1) · `home` → home (M5-S05 #1) |
| C02 | I'm very busy, so I sleep late | `i'm` → I'm (M2-S04 #0) · `very` → very (M9-S06 #0) · `busy` → busy (M9-S06 #1) · `so` → so (M9-S02 #0) · `i` → I (M1-S02 #0) · `sleep` → sleep (M9-S05 #0) · `late` → late (M9-S05 #1) |
| C03 | Why are you angry? | `why` → Why (M9-S03 #0) · `are` → **is** (M1-S01 #2) *forms-hit* · `you` → you (M2-S03 #1) · `angry` → angry (M9-S08 #0) |
| C04 | Why do you want rice? | `why` → Why (M9-S03 #0) · `do` → do (M3-S08 #0) · `you` → you (M2-S03 #1) · `want` → want (M3-S01 #0) · `rice` → rice (M5-S03 #1) |
| C05 | I'm sad because my friend is late | `i'm` → I'm (M2-S04 #0) · `sad` → sad (M9-S03 #1) · `because` → because (M9-S01 #0) · `my` → My (M1-S01 #0) · `friend` → friend (M9-S04 #0) · `is` → is (M1-S01 #2) · `late` → late (M9-S05 #1) |
| C06 | I think the film is very good | `i` → I (M1-S02 #0) · `think` → think (M9-S09 #0) · `the` → the (M3-S07 #0) · `film` → film (M5-S08 #1) · `is` → is (M1-S01 #2) · `very` → very (M9-S06 #0) · `good` → good (M9-S09 #2) |
| C07 | Do you think that the tea is good? | `do` → do (M3-S08 #0) · `you` → you (M2-S03 #1) · `think` → think (M9-S09 #0) · `that` → that (M9-S09 #1) · `the` → the (M3-S07 #0) · `tea` → tea (M1-S07 #1) · `is` → is (M1-S01 #2) · `good` → good (M9-S09 #2) |
| C08 | She is hungry, so she will eat | `she` → she (M4-S06 #0) · `is` → is (M1-S01 #2) · `hungry` → hungry (M9-S07 #0) · `so` → so (M9-S02 #0) · `she` → she (M4-S06 #0) · `will` → will (M6-S01 #0) · `eat` → eat (M4-S04 #0) |
| C09 | He is very tired because he works late | `he` → he (M4-S03 #0) · `is` → is (M1-S01 #2) · `very` → very (M9-S06 #0) · `tired` → tired (M2-S10 #0) · `because` → because (M9-S01 #0) · `he` → he (M4-S03 #0) · `works` → **work** (M4-S06 #1) *forms-hit* · `late` → late (M9-S05 #1) |

### L1-M10 — 202 surfaces cumulative, maxSpan 3

| item | display | tokens → row |
|---|---|---|
| C01 | Hello, Rohan. How are you today? | `hello` → Hello (M2-S01 #0) · `rohan` → Rohan (M1-S01 #3) · `how` → How (M2-S03 #0) · `are` → **is** (M1-S01 #2) *forms-hit* · `you` → you (M2-S03 #1) · `today` → today (M10-S01 #0) |
| C02 | I'm tired today, but I'm happy | `i'm` → I'm (M2-S04 #0) · `tired` → tired (M2-S10 #0) · `today` → today (M10-S01 #0) · `but` → but (M10-S03 #0) · `i'm` → I'm (M2-S04 #0) · `happy` → happy (M5-S09 #0) |
| C03 | My brother is a doctor. He works in Mumbai. | `my` → My (M1-S01 #0) · `brother` → **brothers** (M4-S10 #1) *forms-hit* · `is` → is (M1-S01 #2) · `a` → a (M1-S04 #0) · `doctor` → doctor (M2-S06 #0) · `he` → he (M4-S03 #0) · `works` → **work** (M4-S06 #1) *forms-hit* · `in` → in (M4-S04 #2) · `mumbai` → Mumbai (M2-S07 #0) |
| C04 | I have a new pen. The pen is in my bag. | `i` → I (M1-S02 #0) · `have` → have (M4-S10 #0) · `a` → a (M1-S04 #0) · `new` → new (M10-S06 #0) · `pen` → pen (M3-S02 #0) · `the` → the (M3-S07 #0) · `pen` → pen (M3-S02 #0) · `is` → is (M1-S01 #2) · `in` → in (M4-S04 #2) · `my` → My (M1-S01 #0) · `bag` → bag (M7-S04 #1) |
| C05 | I went to the market. Then I went home. | `i` → I (M1-S02 #0) · `went` → went (M5-S02 #0) · `to` → to (M3-S03 #0) · `the` → the (M3-S07 #0) · `market` → market (M10-S07 #1) · `then` → Then (M10-S07 #0) · `i` → I (M1-S02 #0) · `went` → went (M5-S02 #0) · `home` → home (M5-S05 #1) |
| C06 | Do you like coffee? Yes, I do. I also like tea. | `do` → do (M3-S08 #0) · `you` → you (M2-S03 #1) · `like` → like (M1-S07 #0) · `coffee` → coffee (M3-S05 #1) · `yes` → Yes (M2-S08 #0) · `i` → I (M1-S02 #0) · `do` → do (M3-S08 #0) · `i` → I (M1-S02 #0) · `also` → also (M10-S08 #0) · `like` → like (M1-S07 #0) · `tea` → tea (M1-S07 #1) |
| C07 | Why are you sad? I'm sad because I'm very tired. | `why` → Why (M9-S03 #0) · `are` → **is** (M1-S01 #2) *forms-hit* · `you` → you (M2-S03 #1) · `sad` → sad (M9-S03 #1) · `i'm` → I'm (M2-S04 #0) · `sad` → sad (M9-S03 #1) · `because` → because (M9-S01 #0) · `i'm` → I'm (M2-S04 #0) · `very` → very (M9-S06 #0) · `tired` → tired (M2-S10 #0) |
| C08 | Okay, thank you. See you tomorrow. | `okay` → Okay (M10-S10 #0) · `thank you` → thank you (M2-S04 #2) · `see you` → See you (M10-S10 #2) · `tomorrow` → tomorrow (M6-S01 #1) |
| C09 | Can I have rice and water, please? | `can i have` → Can I have (M8-S05 #0) · `rice` → rice (M5-S03 #1) · `and` → And (M10-S02 #0) · `water` → water (M3-S06 #1) · `please` → please (M8-S05 #2) |
| C10 | Sorry, I'm late. I got up late today. | `sorry` → Sorry (M10-S09 #0) · `i'm` → I'm (M2-S04 #0) · `late` → late (M9-S05 #1) · `i` → I (M1-S02 #0) · `got up` → got up (M5-S01 #1) · `late` → late (M9-S05 #1) · `today` → today (M10-S01 #0) |


### The forms-hits, checked one by one

A forms-hit means the Why panel shows a row headed by a different string, so the row's note has to
be true of the surface the learner tapped. Every one here is another shape of the SAME word — never
a cousin, a synonym or a sibling set (the hi-mr bug class, docs/07-llm-review-L1-M6-M10.md M6-1,
M7-2, M7-3, M8-1).

1. `are` → row **is** (M1-S01 #2, the one `be` row) — M6-C04, M7-C02 / C03 / C10, M9-C03, M10-C01 /
   C07 and the sentences `The keys are under the chair`, `Why are you …?`: the note is the present
   paradigm by person, true in every seat.
2. `keys` → row **key** (M3, `key · keys`) — M7-C02 and S03; the note says *two keys (-s)*.
3. `there are` → row **There is** (M7-S09 #0, `There is · There are`) — M7-C06 and S10: the note
   gives both shapes and the number rule in the same breath (*a book → is, two cups → are*).
4. `book` → row **books** (M1-S09 #0, `book · books`) — M7-S01 / S09, M8-C03, M10-S06 twice; the
   note covers the singular. M7 opened no `book` row; the article contrast rides on M3's `the` and
   M1's `a` rows.
5. `brother` → row **brothers** (M4-S10 #1, `brother · brothers`) — M6-S05 and M10-C03; the note
   says *a brother = एक भाई*.
6. `costs` → row **cost** (M8-S03 #0, `cost · costs`) — M8-C07 and S04: the note gives the `it`
   form and the plural-subject form. `kilos` → **kilo** (M8-C10, M10-S04), `apple` → **apples**
   (M8-S09): plurals listed in the notes.
7. `works` → row **work** (M4-S06 #1, `work · works`) — M9-C09, M10-C03 and S05: the present
   paradigm with the `-s`, true of `he works` / `she works`.

Every other pool token lands on a row whose `display` IS the surface tapped (case-folded). The
cross-module inheritances the briefs depend on were checked by hand: M6's `go to Delhi`, M7's `to
the shop` (S07 note), M10's `went to the market` land on M3's `to`, whose note names the direction
seat; M6's `at home`, M7's `in the box` / `on the table`, M10's `in Delhi` land on M4's `at` / `in` /
`on`, whose notes name the place seat (`in Delhi` — a city — rides the `in` note's *किसी चीज़ के
अंदर*, see open question 27); `How much does it cost?` lands `does` on M4's row, whose note defines
the helper for any ordinary verb; `Yes, I do` lands `do` on M3's row (helper, no meaning of its own
— true of a short answer); `Can I have` never reaches M4's `have`.

## Index seams decided here (they bind L2 authoring and #273)

The index is cumulative and first-occurrence-wins, so these are load-bearing for whoever writes
the next module of this course.

- **`I'll` = `L1-M6-S10` `words[1]`, `forms: []` — and `i will` is NOT a key.** `I will` resolves to
  `I` (M1) + `will` (`L1-M6-S01` #0). Pinned in the build test as the deviation it is. A later
  `I'll` in any display opens the contraction note; a later `I will` opens the auxiliary's.
- **`going to` = `L1-M6-S05` #0, whole, `forms: []`;** bare `going` unclaimed. **No display may
  write `going to` + a place** — movement is `go to / will go to / went to`. Checked across M6–M10.
- **`they` = `L1-M6-S04` #0,** note written for people AND things (`the books → they`), so M7's
  `They are under the table` is true of it. **`her` = `L1-M6-S08` #1,** object pronoun, note covers
  the possessive; `him` / `his` / `its` unclaimed. **`meeting` / `coming`** are whole `-ing` rows;
  bare `meet` unclaimed (M10's `See you` is whole, so `meet` stays free for a later `meet`).
- **`next` = `L1-M6-S07` #0 (अगला) and `next to` = `L1-M7-S07` #0 (बग़ल में)** are two keys; the
  resolver takes `next to` whole wherever it appears and `next week` as `next` + `week`.
- **`There is` = `L1-M7-S09` #0, `forms` `There is · There are`;** bare `there` unclaimed (L1 never
  writes it alone; M9's `here` note mentions वहाँ = there without claiming it). **`it` =
  `L1-M7-S06` #0** (things; subject and object — `I like it`, M8's `does it cost`), **`it's` · `it
  is` = `L1-M7-S05` #0.** `its` unclaimed.
- **`in front of` = `L1-M7-S08` #0, whole;** `front` unclaimed; **`of` = `L1-M8-S06` #1** (the
  quantity joiner) — M7 kept the phrase whole precisely so M8 would own the bare key.
- **`this` = `L1-M8-S01` #1** — an authoring call (below): M7 wrote no `this`, M8's first sentence
  opens it (pronoun AND determiner in one note); **`that` = `L1-M9-S09` #1,** one row, two jobs (कि
  and वह). `these` / `those` unclaimed.
- **`How much` = `L1-M8-S01` #0, `How many` = `L1-M8-S08` #0, `Can I have` = `L1-M8-S05` #0** —
  whole; `how` stays `L1-M2-S03` #0, `have` stays `L1-M4-S10` #0; `much`, `many`, `can` unclaimed.
  **`please` = `L1-M8-S05` #2; `rupees` · `rupee` = `L1-M8-S02` #1; `cost · costs` = `L1-M8-S03` #0;
  `one` = `L1-M8-S09` #0;** numbers now owned: `one`, `two` (M3), `five`, `seven` (M4), `eight`
  (M5), `nine` (M4), `ten`, `twenty`, `fifty`; `three`, `six`, `hundred` unclaimed.
- **`because` = `L1-M9-S01` #0, `so` = `L1-M9-S02` #0** (consequence only — the note says the
  intensifier stays out), **`why` = `L1-M9-S03` #0, `very` = `L1-M9-S06` #0, `think` = `L1-M9-S09`
  #0, `good` = `L1-M9-S09` #2** (`Good morning` stays M2's whole surface), **`late` = `L1-M9-S05`
  #1** (after a verb AND `I'm late`), **`here` = `L1-M9-S04` #1.** Feelings now owned: `tired`
  (M2), `happy` (M5), `sad`, `busy`, `hungry`, `angry` (M9); `thirsty`, `well`, `fine` (M2) — `fine`
  M2's, the others unclaimed.
- **`and` = `L1-M10-S02` #0** (joins words or clauses; `And you?` named as the one two-word fixed
  question), **`but` = `L1-M10-S03` #0, `also` = `L1-M10-S08` #0, `then` = `L1-M10-S07` #0,
  `today` = `L1-M10-S01` #0, `tonight` = `L1-M10-S04` #0, `sister` · `sisters` = `L1-M10-S05` #0,
  `new` = `L1-M10-S06` #0, `market` = `L1-M10-S07` #1, `Sorry` = `L1-M10-S09` #0, `Okay`, `Goodbye`,
  `See you` = `L1-M10-S10` #0 / #1 / #2.** `see` stays `L1-M5-S08` #0. `too`, `now`, `bye`, `bus`,
  `well` appear only in notes / variations — unclaimed.
- **Still unclaimed after the whole L1 ladder:** `likes`, `wants`, `needs` (the `-s` of M1 / M3's
  verbs — extend those rows' `forms` in their own files if L2 writes them), `him`, `his`, `its`,
  `these`, `those`, `too`, `meet`, `won't`, `isn't`, `doesn't` (M4 owns it — yes; `wasn't` no),
  `hundred`, `three`, `six`, `now`, `well`, `thirsty`, `bye`, `bus`, `there` (bare), `going`
  (bare), `much`, `many`, `can`, `front`. `tools/content-build.test.ts` pins a subset of these as
  absent after M10.

## Authoring calls outside the briefs' letter (recorded so L2 and #273 do not "fix" them back)

- **`I'll` lists only itself** — the deviation explained under decision 2 above. The policy's reason
  ("either spelling resolves to one true note") still holds: `I will` resolves to two true notes.
- **`this` is M8's, not M7's.** M7's ten sentences had eleven keys to seat (`under`, `where`, `it`,
  `it's`, `behind`, `near`, `next to`, `in front of`, `there is`, `there are`, `this`) with the
  schema's one-honest-new-row-per-sentence floor and the brief's 7-token ceiling; `in front of` kept
  its M7 seat because its whole surface is what frees `of` for M8, and `this` moved to M8's first
  sentence (`How much is this?`), where the M8 brief already treats it as the pointing word. M7
  therefore points with nothing — its things are `the bag`, `my bag`, `it`.
- **`the` in M7's literals is वह** (`वह किताब है पर वह मेज़`) — docs/12's convention (`the` = वह where
  it marks a known thing, dropped only inside a fixed phrase like `in the morning`) kept over the
  briefs header's illustration `किताब है पर मेज़`, so every plate in the course glosses `the` the same
  way; the S01 trap says so.
- **The 7-token bound re-cut three M6 sentences and one M7 sentence.** `going to` + `be` + a
  two-word time phrase is eight tokens (`*We are going to buy a car tomorrow`, `*He is going to learn
  English next week`) — so the car moved to `will` (`She will buy a car tomorrow`, S03), the cooking
  to `going to` (`We are going to cook rice tomorrow`, S06), the learner to `I'm` (`I'm going to learn
  English next week`, S07, with `He is going to learn English` as a variation); M7's `*My car is in
  front of the shop` (8) became `It's in front of the shop` (6). M10-S04's first sentence lost a token
  the same way (`because I will cook tonight`, not `because I'm going to cook tonight`).
- **M10 declares `minWordsPerSentence: 2`** (en-es's M10 declared 1 for `Gracias.`): `And you?` and
  `Goodbye, Rohan.` are two tokens and no turn carries a one-word sentence; the field is per
  sentence inside the turn, the maximum stays 8 and no sentence reaches it except S09's second
  (`Sorry, I'm late because I got up late` — exactly 8). **No schema change was needed and none was
  made**; the turns validate per sentence as authored.
- **M10 spends four of its thirteen rows on fixed courtesies** (`Sorry`, `Okay`, `Goodbye`, `See
  you`) and two on time words the briefs never assigned (`today`, `tonight`) — the recombination
  brief leaves the joiners as the only named spend, and a turn that greets, apologises and parts
  needs the courtesies as taught surfaces or its pool cannot use them.
- **`Yes, I do` (M10-S08)** — a short answer with the helper, which no brief pattern names; it is
  M2's `Yes, I am` law applied to `do`, stated in M10 rule 4, and `*Yes, I like` (the Indian-English
  हाँ पसंद है) is the plate.
- **M9's `friend`, `here`, `sleep`, `late`, `food`** exist because every sentence must carry one
  honest new row (docs/11 correction 6, the schema's `words` min 1): a `Why do you …?` question
  built from known verbs had no new word, so it took `sleep late` (and `late` then serves `I'm late`
  in S08 / M10-S09).
- **`they` was taught on a `will` sentence** (M6-S04) though the brief assigns it nowhere: M6 needed
  a plural subject for `will` without agreement, and M7's `They are under the table` needed the row.
- **Full enrichment and `literal` on all five** though both are optional from M4 — en-es / en-ar's
  precedent, docs/12's call, and `src/course/types.test.ts` asserts them on every hi-en sentence.
- **Every M6–M10 sentence cites at least one rule and every rule is cited** — M7 rule 4 (the bounds:
  `have` vs `there is`, `the school`, no `'s`) was uncited in the first draft and is now cited by S07
  and S09 (the hi-mr "rule that reaches no learner" bug class).

## Corrections applied during the pass

Self-review of the drafts, plus the audit above, changed these things before the flip:

1. **Four sentences and one pool item exceeded the declared bound by one token** — M6-S06 / S07
   (8 of 7), M7-S08 (8 of 7), M10-S04's first sentence (9 of 8), M6-C05 (8) — caught by the audit's
   per-sentence count (which splits a turn on `.` / `?` / `!`), re-cut as recorded above (C05 became
   `We will buy a car next week`).
2. **M6's `I'll` row was first drafted with `forms` `I'll · I will`** per the contraction policy's
   letter; walking `I will go to Delhi tomorrow` through the resolver showed it would open the
   contraction row and never `will`. Reversed, recorded as the deviation.
3. **M7 rule 4 was declared and cited by no sentence** — now cited by S07 and S09.
4. **`src/course/types.test.ts` rejected `It's` as a possessive `'s`** (the test predates any
   display carrying M7's contraction) — the regex now exempts `it's` / `It's` and nothing else.
5. **M8's draft had `We are going to buy a car …`-style pool items** that would have opened M6's
   plan note on a movement reading; none survived — the M8 pool names no `going to` at all.
6. **M10-S02's `And you?`** was checked against M10 rule 0 (no dropped subject) and kept as a named
   fixed expression — the `and` note and the rule both say it is the one two-word sentence and why.

## Verification

- `npm run content:validate` → **CONTENT 40/40 ok** (no `fixture` flag on any module)
- `npm run content:build -- --with-unverified --with-fixtures` → `hi-en: 10 modules (L1-M1..M10)`,
  `index L1-M6: 126 · L1-M7: 148 · L1-M8: 171 · L1-M9: 188 · L1-M10: 202 surfaces` (M1–M5 unchanged
  at 23 / 39 / 56 / 90 / 108); the strict build still reports `hi-en: 0 modules — fixture course,
  excluded by the gate`
- `npx vitest run src/course/types.test.ts src/course/hiEnAuthored.test.tsx
  tools/content-build.test.ts tools/validate.test.ts tools/generate-prompt.test.ts
  src/screens/SettingsScreen.test.tsx` → **241/241 green** (`types.test.ts` inventory now 40 files,
  the hi-en language law asserted over ten; `content-build.test.ts` dev build ships ten, the new
  M6–M10 landing test; `hiEnAuthored` walks the module list, Sentence Detail and Why panel of all
  five — M10's turns render whole in a card, and the panel walks a turn token by token across its
  full stop)
- `scripts/verify.sh --fast` → **`TYPES ok | LINT ok | TEST 1323/1323 ok | CONTENT ok | FONTS ok`**
- Payload: **strict (what ships today): unchanged by construction** — hi-en is a fixture course, so
  the strict build and the font subsets never see it. The dev build's `public/content/hi-en/sizes.json`
  now reads **22 files, 508,069 bytes** (ten modules + ten indexes + `levels.json` + `strings.json`,
  uncompressed) — #273's measurement against the 360 KiB gzip budget starts from that, plus the
  Devanagari subset the course is charged.

## Open questions for a fluent / native English pass

Nothing below has been changed in the content. These are the calls where guessing would be worse
than asking — naturalness, Indian English against general usage, register, every phonetic claim, and
the pedagogy calls the owner decides.

### Naturalness

1. **`She will buy a car tomorrow`** (M6-S03) — grammatical, and a little abrupt as a standalone
   (`is going to buy` is what a native speaker would more likely say of a car): kept on `will`
   because the 7-token bound would not hold `going to` + `a car` + `tomorrow`. Is the pair
   S03 (`will`) / S06 (`going to cook`) the right split, or should the car carry the plan?
2. **`They will eat at home tomorrow`** (M6-S04) — `eat at home` natural? (`have dinner at home`
   is the idiom, and `have` + meal is kept out of L1 by M4's decision.)
3. **`I'm going to learn English next week`** (M6-S07) — a plan that starts next week; does `learn`
   want `start learning` to a native ear?
4. **`She is coming to Delhi next week`** (M6-S09) and **`I'm meeting her tomorrow`** (S08) — the
   two arrangement sentences; fine, or does `I'm meeting her` without a place sound incomplete?
5. **`I will call you tomorrow`** vs the variation **`I'll call you tomorrow`** — the display writes
   `will` whole by the brief's instruction; a native speaker would say `I'll`. Keep the pedagogy
   (tappable `will`) or let S10's display be the contraction since the row exists?
6. **`Is it near the school?`** (M7-S06) with no antecedent on its own card — it answers S04 / S05
   in the module's flow; acceptable as a standalone card?
7. **`It's in front of the shop`** (M7-S08) — same antecedent question; the variation `My bag is in
   front of the door` gives the full-noun form.
8. **`There is a book on the table`** beside **`The book is on the table`** (M7-S09 / S01) — the
   pair is deliberate; do both read as natural sentences rather than a grammar exercise?
9. **`It costs ten rupees`** (M8-S04) vs `It's ten rupees` — in a shop `It's ten rupees` is the
   common answer; S04 exists to show `cost` as a verb. Right call?
10. **`Five bananas cost twenty rupees`** (M8-S10) — natural, or does a speaker say `are twenty
    rupees` (the variation)?
11. **`I want one apple, not two`** (M8-S09) — natural as a correction at a stall?
12. **`I sleep late because I'm very busy`** (M9-S06) — **`sleep late` is ambiguous**: go to bed late
    or wake up late. The note and cue read it as देर से सोना (go to bed late), which is the Indian
    reading; general English often means "sleep in". Should the display be `go to bed late`
    (untaught words) or should the note name both readings?
13. **`She is angry because I'm late`** (M9-S08) — `angry with me` is the fuller phrase; fine
    without it?
14. **`I'm very tired today, but I'm happy. I will sleep early.`** (M10-S03) — a textbook-ish turn;
    does a native speaker hear two people, or an exercise? (en-es's open question 17, again.)
15. **`Yes, I do. I also like coffee.`** (M10-S08) — `I like coffee too` is the more spoken shape;
    `also` before the verb was chosen to teach the adverb seat. Natural enough?
16. **`Okay, thank you. Goodbye, Rohan. See you tomorrow.`** (M10-S10) — three courtesies in a row;
    is `Goodbye` too formal beside `Okay` and `See you` (where `Bye` would sit)?

### Indian English vs general usage

17. **`Give me two bananas` named as "रूखा"** (M8-S05 plate) — at a sabzi stall in India `दो केले
    दीजिए` → `Give me two bananas` is ordinary; is calling it a tone error the right lesson, or
    should the plate be `*Give me two banana` (a grammar error) and the register note go to `usage`?
18. **`visit my brother`** (M6-S05) — Indian English says `meet my brother` for a social call;
    `visit` was chosen to keep bare `meet` free and because `meet` + person in general English is a
    first encounter. Is the learner being taught a word they will rarely hear?
19. **`call you`** — `phone you` / `give you a call` / `ring you` — `call` is both general and
    Indian; fine.
20. **`market`** (M10-S07) — `the market` for बाज़ार is Indian and general; `bazaar` was avoided.
21. **`rupees`** throughout M8 — the course's one currency (the brief's decision); the note says
    so. `Rs.` / `₹` never appear in display.
22. **`kilo`** (M8) — `kilo` is everyday Indian and British; `kilogram` was not taught. Fine?
23. **`sleep late`** — see question 12; the Indian reading is the one the module teaches.
24. **`Sorry`** alone as an apology (M10-S09) — general and Indian; `I'm sorry` named in the note.
25. **`tonight`** (M10-S04) — fine; `today night` (the Indian-English calque) is NOT named as a
    mistake anywhere. Should it be?

### Register

26. **Every sentence is `neutral`** — the `informal` chip stays unused across all ten modules.
    `Why are you sad?` to an elder, `Give me …`, `Okay` — is `neutral` honest for all fifty lines?

### Sound notes — nothing here can be heard by the author

27. Every `sound` line is derived from dictionary descriptions and the author's model of
    Indian-English pronunciation, not from listening. The specific claims: `will` = विल; `tomorrow`
    = टुमॉरो (stress on the middle); `come` = कम; `buy` = बाइ; `car` = कार; `they` = दे with a voiced
    dental `th`; `going to` ≈ गॉना in speech; `visit` = विज़िट; `cook` = कुक; `next` = नेक्स्ट; `week` =
    वीक; `meeting` = मीटिंग; `her` = हर / अर; `coming` = कमिंग; `call` = कॉल; `I'll` = आइल; `table` =
    टेबल; `box` = बॉक्स; `under` = अंडर; `chair` = चेयर; `where` = वेयर with a silent `h`; `bag` = बैग;
    `it's` = इट्स; `behind` = बिहाइंड; `door` = डोर; `near` = नियर; `next to` = नेक्स्ट-टु; `bank`;
    `shop` = शॉप; `in front of` = इन-फ़्रंट-ऑव; `there is` ≈ देयर्ज़, `there are` ≈ देयरार; `cups` =
    कप्स; `how much` = हाउ-मच; `this` = दिस; `fifty` = फ़िफ़्टी; `rupees` = रुपीज़; `does` = डज़; `cost` =
    कॉस्ट, `costs` = कॉस्ट्स; `ten` = टेन; `Can I have` ≈ कन-आइ-हैव; `please` = प्लीज़; `kilo` = किलो;
    `of` = ऑव; `bottle` = बॉटल; `how many` = हाउ-मेनी; `apples` = ऐपल्स; `one` = वन; `five` = फ़ाइव;
    `twenty` ≈ ट्वेनी; `because` = बिकॉज़ / कज़; `so` = सो; `why` = वाइ; `sad` = सैड; `friend` = फ़्रेंड;
    `here` = हियर; `sleep` = स्लीप without a prosthetic इ-; `late` = लेट; `very` = वेरी (`v`, not `bh`);
    `busy` = बिज़ी; `hungry` = हंग्री; `angry` = ऐंग्री; `think` = थिंक (voiceless `th`); `that` = दैट;
    `good` = गुड; `food` = फ़ूड; `today` = टुडे; `and` ≈ अन; `but` = बट; `tonight` = टुनाइट; `sister` =
    सिस्टर; `new` = न्यू / नू; `then` = देन; `market` = मार्केट; `also` = ऑल्सो; `sorry` = सॉरी; `okay`
    = ओके; `goodbye` = गुडबाइ; `see you` ≈ सीया — and the intonation claims (a rise on `Will you
    come?`, `Is it near the school?`, `Can I have …?`, `Do you think …?`, `And you?`; no rise on
    `Where is my bag?`, `How much is this?`, `Why are you sad?`). The Devanagari approximations are
    the least safe of all; a native ear should sample the `th` (`they` / `think` / `that` / `then`),
    `w` / `v` (`will` / `very` / `where`) and `-s` / `-z` claims first.

### Pedagogy calls the owner decides

28. **`I'll` with `forms: []`** (decision 2) — the one place the course's contraction policy is not
    applied to the letter. Record as the rule for "the uncontracted word IS the lesson", or revert
    and accept that `I will …` opens the contraction row?
29. **`this` opened in M8, not M7** — M7 points with nothing; is a `This is my bag` in M7 worth a
    sentence more than one of M7's seven place words?
30. **`literal` conventions extended again:** `will` + verb as ONE Hindi future form (`मैं जाऊँगा को
    दिल्ली कल`), `going to` glossed `वाला`, `there is` glossed `वहाँ-है` (and the note says it points
    nowhere), `of` given no seat (`एक किलो चावल, प्लीज़`), `do` still `क्या` after `why` (`क्यों क्या आप
    सोते देर-से?`), `the` still `वह`, a turn's literal one line for 2–3 sentences. Helpful or a
    growing list of conventions a learner has to decode?
31. **Tags:** `this` free, `they` free, `sister` / `new` / `today` free (transfer), `rupees` /
    `near` / `call` / `of` / `how much` / `how many` / `hungry` / `angry` / `because` / `so` /
    `There is` interference, `will` / `going to` / `meeting` / `her` / `it` / `it's` / `where` /
    `because`'s partner `why` delta. Is `visit` (with the `*visit to` plate) interference rather than
    delta? Is `this` really free when the pointing-vs-article confusion is the M3 note's whole point?
32. **`cost` with `forms` `cost · costs`** beside M4's present-only verb rows — a second pattern
    (like M5's `see · saw`); `costs` appears in a display (S04), so the forms-hit is one the learner
    meets. Fine, or open a `costs` row?
33. **`late` does two jobs on one row** (`sleep late` adverb, `I'm late` adjective) — like `that`
    (कि / वह) and `do` (helper / करना). Is one note per spelling the right unit here?
34. **M10's `minWordsPerSentence: 2`** vs en-es's 1 — and the field is per sentence inside a turn,
    which the Write step's `{maxWords}` constraint also reads (`RitualScreen`): a learner's 11th
    "sentence" for M10 is bounded at 8 words, not at a turn's 14. Right bound for the exit ritual?
35. **M10 spends four rows on courtesies** (`Sorry`, `Okay`, `Goodbye`, `See you`) — worth more than
    `now` / `too` / `him`, which stay unclaimed? `See you` as a whole row keeps M5's `see` honest;
    is that worth a row?
36. **`Yes, I do` taught in M10 without a brief pattern** — keep, or move the short-answer law to a
    future L2 module and write `Yes, I like tea` here?
37. **`in Delhi` / `in Mumbai` (M10) ride M4's `in` note** (*किसी चीज़ के अंदर — in the box*) — a
    city is not a box; should M4's `in` note gain one clause for cities / towns?
38. **The masculine first person** in cues and literals continues (`जाऊँगा`, `सोता`, `थका`, `उठा`) —
    docs/11 question 15 and docs/12 question 22, now across all ten modules.
