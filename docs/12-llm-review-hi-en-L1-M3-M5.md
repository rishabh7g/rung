# LLM review — hi-en L1-M3, L1-M4 and L1-M5

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Fable 5), which
cannot hear anything and is not a fluent-English editor in the sense a course like this eventually
needs — it wrote the English, the Hindi teaching prose and the pronunciation glosses, and then
audited all three. `verified: true` on the three modules rests on the repo owner's standing
authority, exactly as hi-mr's (PR #190), en-es's (#192–#194), en-ar's (#199–#201) and hi-en
M1–M2's (#270, `docs/11-llm-review-hi-en-L1-M1-M2.md`) flips did; `verifiedBy` says so in words:
`"Claude Fable 5 — LLM review, authorised by repo owner"`, `verifiedAt` `2026-08-23`. **No native
or fluent-English gate exists for this course**, and the open-questions list at the bottom is the
outstanding work.

Nothing here reaches a learner yet: `content/courses.json` still carries `fixture: true` on the
hi-en row, so the strict build skips the course entirely (#273 flips it). A dev build
(`--with-unverified --with-fixtures`) ships all five rungs.

## What was authored

| | L1-M3 Needs and wants | L1-M4 My day | L1-M5 Yesterday |
|---|---|---|---|
| sentences | 10 | 10 | 10 |
| new word rows | 14 of 25 allowed | **25 of 25** (at the cap) | 15 of 25 allowed |
| pool items | 8 | 9 | 9 |
| tokens per sentence | 3–6 (bounds 3–6) | 4–6 (bounds 3–6) | 4–6 (bounds 3–7) |
| tenses | `simple_present` | `simple_present` | `simple_past` |
| enrichment | full (required through M3) | full (optional from M4 — kept, as en-es / en-ar did) | full |
| `literal` | every sentence (required) | every sentence (optional — kept) | every sentence |
| `glossEn` | none (#268) | none | none |
| prerequisites | `["L1-M2"]` | `["L1-M3"]` | `["L1-M4"]` |
| cumulative index | 56 surfaces, `maxSpan` 2 | 90 surfaces, `maxSpan` 2 | 108 surfaces, `maxSpan` 2 |
| keys this module added | 17 | 34 | 18 |

The three were written strictly in ladder order against `tools/course-briefs.ts` (#269) via
`npm run content:prompt`, rebuilding the index between them, so M4's prompt was generated against
M3's real cumulative inventory (54 surfaces at the time) and M5's against M4's (88). The counts
above are two higher for M1–M4 than the prompts saw, because **M5 extended M1's one `be` row with
`was · were`** (see "Index seams decided here") and that row is M1's, so its two new keys enter the
cumulative index from M1 on: M1 is now 23, M2 39 (docs/11 recorded 21 / 37 before the edit). No
other M1–M2 content changed. `content/hi-en/levels.json` carries `hasContent: true` and no `draft`
flag on all five rungs.

**The four decisions of the briefs' hi-en header, as shipped in M3–M5:**

1. **Language of every field.** Every `rules[].text`, word `note`, `cue`, `trap`, `sound`,
   `variations[].changed`, `mistake.why`, `usage` and `mnemonic` is Hindi in Devanagari, quoting the
   English word it explains but never switching into English prose; `display` and `forms` are English
   with no Devanagari; no sentence carries `glossEn`; every sentence carries `literal`.
   `src/course/types.test.ts` asserts all of this for the five files it now finds.
2. **Contractions.** `don't` (M3), `doesn't` (M4) and `didn't` (M5) are each ONE row with `forms`
   listing both shapes — `don't · do not`, `doesn't · does not`, `didn't · did not` — straight `'`
   only, and no row pre-lists a sibling: M3's `don't` does not carry `doesn't`. `display` contracts
   wherever speech does (`I don't want coffee` · `He doesn't eat breakfast` · `I didn't go`), and the
   full form appears only where the brief says the uncontracted word is the lesson: M5's negative
   `be` is written whole — `I was not happy yesterday` (variation) — and no `wasn't` row was spent.
   No possessive `'s` anywhere.
3. **One `be` row.** `L1-M1-S01` `words[2]` now has `forms` `am · is · are · was · were` and a note
   that is true of all five (the present split by person, the past by number); M5 opened no second
   row, and `I was happy yesterday` deconstructs only `happy`. Every `was` / `were` in M5's displays
   and pool resolves to M1's row — pinned in `tools/content-build.test.ts`.
4. **Multi-token surfaces.** `get up` (`get up · gets up`) and `wake up` (`wake up · wakes up`) are
   whole rows in M4 and `got up` a fresh whole row in M5; bare `get`, `up`, `wake`, `got` are
   unclaimed. `in the morning` is `in` + `the` + `morning` with no phrase row (`the` is M3's,
   `morning` was free because M2 kept `good morning` whole). `yesterday morning` (M5-S04) is two
   bare words.

## The slogan traps, and what was written instead

The briefs name the memorable-and-false rule each module attracts (`course-briefs.ts` rule 2).
What shipped:

- **"the = specific, a = any"** → M3 rule 4 states the one question the article answers — *क्या
  सुनने वाला पहले से बता सकता है कि कौन-सी?* — yes → `the` (`I need the key`, the one we both
  know); no, and one countable thing → `a / an` (M1's row); a kind of thing in general, mass or
  plural → nothing (`I want tea` · `I like books`), with `I want the tea` = *वही ख़ास चाय*. The `the`
  row's note repeats the law and adds what `the` is NOT: *उँगली उठाकर दिखाने वाला वह नहीं है (that —
  M9)*. The pool tests the choice (`I want a book` · `I want the pen` · `Do you want the book?`).
- **"to means को"** (the seam the brief flags rather than a slogan) → M3's `to` row is written true
  of the two seats that inherit the key: *क्रिया से पहले जोड़ने वाला* (`want to learn`: हिंदी का एक
  शब्द सीखना, अंग्रेज़ी के दो) and *जगह से पहले दिशा का शब्द* (`go to school` — M4, `to the shop` —
  M7 = को / तक), bounded by *will के बाद नहीं (M6: \*I will to go नहीं)*. M4's `goes to school`
  lands on it and the note holds.
- **"English verbs don't change"** → M4 rule 0 states the one change that matters as a law about
  PERSON, against Hindi's GENDER: *आदत की क्रिया का एक ही अक्षर बदलता है — और वह कर्ता का पुरुष बताता
  है, लिंग नहीं: I get up · you get up · we get up · they get up, पर he gets up · she gets up* —
  उठता / उठती → one `gets up`. The `-s` is the interference tag of the module; `*He go to school`
  (S03), `*Does he gets up` (S08), `*He don't eat` (S09) are its plates. M5 rule 0 then says the
  other half: the form changes for TENSE (eat → ate), never for person.
- **"-ing means now"** → M4 rule 3: habit AND state take the simple present, even while the thing
  is happening; `*I am having two brothers` (S10) and `*I am knowing Rohan` (named in the rule) are
  the plates, and `-ing` is deferred in words to M6's arrangements. No M4 display carries `-ing`.
- **"have = खाना-पीना too"** → `have` is taught as possession only (`I have two brothers`, `forms`
  `have · has`), its note saying in one clause that colloquial `have tea` is real English this ladder
  does not teach — so a later `Can I have` (M8, a whole surface) never reaches this row, and no
  display writes `have breakfast`.
- **"the past is hard"** → M5 rule 0 is the rest point stated as a delta: ONE form for every person
  and gender where Hindi's past agrees with the subject (गया / गई) and, through ने, with the OBJECT
  (*मैंने चाय पी · मैंने चावल खाए*); `I ate rice` / `She ate rice` beside *मैंने चावल खाए · उसने चावल
  खाए* makes the point in the S03 variation. The interference of the module is the double marking
  — `*I didn't went` (S06), `*What you did yesterday?` (S07), `*Did you saw` (S08) — and M5 rule 2
  says where the tense lives: *बीता कल सिर्फ़ did पर रहता है*.
- **"was/were split by person like am/is/are"** → M5 rule 4: *बँटवारा वचन से, जहाँ अभी का बँटवारा
  पुरुष से था* — `I / he / she / it was · you / we / they were`; `*We was tired` (S10) is the plate,
  and negation / inversion follow M2's law (`I was not happy`, `Were you tired?`), never `did`.
- **"क्या = do"** → M3 rule 3 and the `do` row say `do` is *क्या का अनुवाद नहीं (इसका अपना कोई मतलब
  नहीं), पर बैठता वहीं है जहाँ क्या बैठता है* — and define the second job, करना, in the same note
  (`What do you do?` · M5's `What did you do yesterday?`), as the brief requires; `does` (M4) and
  `did` (M5) repeat both jobs for their own rows.

## The index audit — where every pool token actually lands

Run against the emitted `public/content/hi-en/index/L1-M<n>.json`, through the real engine
(`matchSurfaces` + `tokenizeSurface` from `src/engine/surface.ts`), resolving each hit back to
`modules/<id>.json → sentences[<sid>].deconstruction.words[<idx>]` — the exact row `WhyPanel` /
`WhyRow` renders. **123 pool tokens over the three modules, 0 unresolved, 0 wrong-word landings**
(M3 34 tokens / 3 forms-hits, M4 45 / 3, M5 44 / 4). Every sentence display was walked the same way
(138 tokens, 0 unresolved); no sentence depends on a row that comes later in its own module. The
same landings are pinned in `tools/content-build.test.ts` ("lands hi-en M3–M5 on the rows the briefs
assigned") and rendered through the real Why panel in `src/course/hiEnAuthored.test.tsx`.

### L1-M3 — 56 surfaces cumulative, maxSpan 2

| item | display | tokens → row |
|---|---|---|
| C01 | I want a book | `i` → I (M1-S02 #0) · `want` → want (M3-S01 #0) · `a` → a (M1-S04 #0) · `book` → **books** (M1-S09 #0) *forms-hit* |
| C02 | I want the pen | `i` → I · `want` → want · `the` → the (M3-S07 #0) · `pen` → pen (M3-S02 #0) |
| C03 | I don't want tea | `i` → I · `don't` → don't (M3-S05 #0) · `want` → want · `tea` → tea (M1-S07 #1) |
| C04 | Do you want coffee? | `do` → do (M3-S08 #0) · `you` → you (M2-S03 #1) · `want` → want · `coffee` → coffee (M3-S05 #1) |
| C05 | Do you need a pen? | `do` → do · `you` → you · `need` → need (M3-S06 #0) · `a` → a (M1) · `pen` → pen |
| C06 | I need two keys | `i` → I · `need` → need · `two` → two (M3-S10 #0) · `keys` → **key** (M3-S07 #1) *forms-hit* |
| C07 | I want to read | `i` → I · `want` → want · `to` → to (M3-S03 #0) · `read` → read (M3-S04 #0) |
| C08 | Do you want the book? | `do` → do · `you` → you · `want` → want · `the` → the · `book` → **books** (M1-S09 #0) *forms-hit* |

### L1-M4 — 90 surfaces cumulative, maxSpan 2

| item | display | tokens → row |
|---|---|---|
| C01 | She gets up at seven | `she` → she (M4-S06 #0) · `gets up` → **get up** (M4-S02 #0) *forms-hit, one two-token key* · `at` → at (M4-S02 #1) · `seven` → seven (M4-S02 #2) |
| C02 | He drinks tea in the morning | `he` → he (M4-S03 #0) · `drinks` → **drink** (M4-S05 #1) *forms-hit* · `tea` → tea (M1) · `in` → in (M4-S04 #2) · `the` → the (M3-S07 #0) · `morning` → morning (M4-S04 #3) |
| C03 | I go to school at nine | `i` → I (M1) · `go` → go (M4-S03 #1) · `to` → to (M3-S03 #0) · `school` → school (M4-S03 #2) · `at` → at · `nine` → nine (M4-S03 #3) |
| C04 | Does she work on Monday? | `does` → does (M4-S08 #0) · `she` → she · `work` → work (M4-S06 #1) · `on` → on (M4-S06 #2) · `monday` → Monday (M4-S06 #3) |
| C05 | She doesn't drink coffee | `she` → she · `doesn't` → doesn't (M4-S09 #0) · `drink` → drink (M4-S05 #1) · `coffee` → coffee (M3) |
| C06 | He has two brothers | `he` → he · `has` → **have** (M4-S10 #0) *forms-hit* · `two` → two (M3) · `brothers` → brothers (M4-S10 #1) |
| C07 | I never eat breakfast | `i` → I · `never` → never (M4-S07 #0) · `eat` → eat (M4-S04 #0) · `breakfast` → breakfast (M4-S04 #1) |
| C08 | Do you get up early? | `do` → do (M3-S08 #0) · `you` → you (M2) · `get up` → get up (M4-S02 #0) · `early` → early (M4-S01 #2) |
| C09 | I usually wake up at seven | `i` → I · `usually` → usually (M4-S05 #0) · `wake up` → wake up (M4-S01 #1) · `at` → at · `seven` → seven |

### L1-M5 — 108 surfaces cumulative, maxSpan 2

| item | display | tokens → row |
|---|---|---|
| C01 | I went to Delhi yesterday | `i` → I (M1) · `went` → went (M5-S02 #0) · `to` → to (M3-S03 #0) · `delhi` → Delhi (M1-S03 #0) · `yesterday` → Yesterday (M5-S01 #0) |
| C02 | She ate breakfast at eight | `she` → she (M4-S06 #0) · `ate` → ate (M5-S03 #0) · `breakfast` → breakfast (M4-S04 #1) · `at` → at (M4-S02 #1) · `eight` → eight (M5-S01 #2) |
| C03 | He didn't drink tea yesterday | `he` → he (M4-S03 #0) · `didn't` → didn't (M5-S06 #0) · `drink` → drink (M4-S05 #1) · `tea` → tea (M1) · `yesterday` → Yesterday |
| C04 | Did you go to school yesterday? | `did` → did (M5-S07 #0) · `you` → you (M2) · `go` → go (M4-S03 #1) · `to` → to (M3) · `school` → school (M4-S03 #2) · `yesterday` → Yesterday |
| C05 | What did you eat yesterday? | `what` → What (M2-S05 #0) · `did` → did · `you` → you · `eat` → eat (M4-S04 #0) · `yesterday` → Yesterday |
| C06 | I saw the film yesterday | `i` → I · `saw` → **see** (M5-S08 #0) *forms-hit* · `the` → the (M3) · `film` → film (M5-S08 #1) · `yesterday` → Yesterday |
| C07 | We were happy yesterday | `we` → We (M5-S10 #0) · `were` → **is** (M1-S01 #2, the be row) *forms-hit* · `happy` → happy (M5-S09 #0) · `yesterday` → Yesterday |
| C08 | I was at home yesterday | `i` → I · `was` → **is** (M1-S01 #2) *forms-hit* · `at` → at (M4-S02 #1) · `home` → home (M5-S05 #1) · `yesterday` → Yesterday |
| C09 | Were you tired yesterday? | `were` → **is** (M1-S01 #2) *forms-hit* · `you` → you (M2) · `tired` → tired (M2-S10 #0) · `yesterday` → Yesterday |

### The forms-hits, checked one by one

A forms-hit means the Why panel shows a row headed by a different string, so the row's note has to
be true of the surface the learner tapped. Every one here is another shape of the SAME word — never
a cousin, a synonym or a sibling set (the hi-mr bug class, docs/07-llm-review-L1-M6-M10.md M6-1,
M7-2, M7-3, M8-1).

1. `book` → row **books** (M1, `book · books`). The note covers the singular (*I like a book का मतलब
   'कोई एक किताब'*); M3 deliberately opened no `book` row (it would be unreachable).
2. `keys` → row **key** (`key · keys`), `pens` (not in the pool, but indexed) → **pen**: both notes
   state the plural in words (*two keys (-s)*, *कई हों तो -s (two pens)*).
3. `gets up` → row **get up** (`get up · gets up`), one two-token key; the note lists the paradigm
   with the `-s` on `gets`.
4. `drinks` → **drink**, `goes` (M4-S03 display) → **go**, `works` (M4-S06 display) → **work**, `eats`
   (variations only) → **eat**: each row's note is the present paradigm with `he / she + -s`.
5. `has` → row **have** (`have · has`). The note says *he / she के साथ has* and is possession-only,
   which is all `He has two brothers` asks of it. Note that the learner meets `has` first in a pool
   item, not a display (open question 27).
6. `saw` → row **see** (`see · saw`): the note says *बीता कल saw, एक रूप सबके लिए* and *did के बाद मूल
   रूप see*, so it is true in both seats.
7. `was` / `were` → row **is** (M1-S01 #2, `am · is · are · was · were`). The note M5 wrote into M1's
   file: *बीते कल में यही शब्द दो रूप रखता है — I / he / she / it was · you / we / they were (था / थी
   / थे → was · were: बँटवारा वचन से, लिंग से नहीं) — M5 में.* The cue stays `हूँ · है · हैं` (M1's
   lesson; the note carries the past) — open question 25.

Every other pool token lands on a row whose `display` IS the surface tapped (case-folded). Two
cross-module inheritances were checked by hand because the briefs depend on them: M4's `goes to
school` and M5's `went to school` / `went to Delhi` land on M3's `to`, whose note names that seat;
M5's `at home` lands on M4's `at`, whose note names `at home = घर पर (M5, M7)`.

## Index seams decided here (they bind M6–M10)

The index is cumulative and first-occurrence-wins, so these are load-bearing for #272.

- **`be` is one row: `L1-M1-S01` `words[2]`, `forms` `am · is · are · was · were`** — edited in M1's
  file by this issue. M6's `is` inside `she is meeting` and M9's `I'm` / `is tired` resolve here;
  M7's `is` inside `there is` must be captured by the whole `there is` surface (M7 opens it). Nothing
  may open a second row for any of the five shapes.
- **`to` = `L1-M3-S03` `words[0]`** (bare). Note true of verb-joiner and direction seats; M6 teaches
  `going to` as a WHOLE surface so its `to` never reaches this row, and the note's only bound is
  *will के बाद नहीं*. M7's `to the shop`, M10's `went to the market` inherit it.
- **`do` = `L1-M3-S08` `words[0]`** — helper AND करना. `does` = `L1-M4-S08` `words[0]`, `did` =
  `L1-M5-S07` `words[0]`, each again both jobs. `don't` (`L1-M3-S05` #0) owns `don't` and `do not`;
  `doesn't` (`L1-M4-S09` #0) owns `doesn't` and `does not`; `didn't` (`L1-M5-S06` #0) owns `didn't`
  and `did not`. `not` is still M2's; bare `no` M2's.
- **`the` = `L1-M3-S07` `words[0]`.** Its note says the article answers one question and is not the
  pointing word — so M7's `on the table`, M8's second mentions and M10's *second mention takes the*
  inherit a true note. M9 still owns `that`; M7 / M8 point with `this` (unclaimed).
- **`want` (`L1-M3-S01` #0) and `need` (`L1-M3-S06` #0) ship `forms: []`** — like M1's `like`. If a
  later module writes `wants` / `needs` / `likes`, extend the row's `forms` in its own file (the `be`
  edit's precedent) or open the `-s` row; either way the notes stay true (nominative frame, ordinary
  verb). `likes` is still unclaimed.
- **`he` = `L1-M4-S03` #0, `she` = `L1-M4-S06` #0** (notes: वह splits by the person's sex; M10
  returns to the choice). **`we` = `L1-M5-S10` #0.** `it`, `they`, `her`, `his`, `my` (M1), `your`
  (M2) — `it` / `her` still free for M7 / M6; `they` unclaimed (it appears only in notes).
- **`have` = `L1-M4-S10` #0, `forms` `have · has`, possession only.** M8's `Can I have` must be a
  whole surface (the note is false of a request); auxiliary `have` stays out of L1; no display may
  write `have breakfast` / `have tea`. `had` is unclaimed (M5 did not need it).
- **`in` = `L1-M4-S04` #2, `on` = `L1-M4-S06` #2, `at` = `L1-M4-S02` #1** — notes written true of
  both seats (time here, place in M7: `in the box`, `on the table`, `at home`). M5 already uses
  `at home`. `from` stays M1's.
- **`get up` (`L1-M4-S02` #0, `get up · gets up`) and `wake up` (`L1-M4-S01` #1)** are whole; `got
  up` (`L1-M5-S01` #1) is a separate whole past surface. Bare `get`, `up`, `wake`, `got` are
  unclaimed — `get` is free for a later "receive" sense if one is ever needed (none in L1).
- **M4's verb rows list PRESENT forms only** — `go · goes` (S03 #1), `eat · eats` (S04 #0), `drink ·
  drinks` (S05 #1), `work · works` (S06 #1) — and **M5's pasts are their own rows**: `went` (S02
  #0), `ate` (S03 #0), `drank` (S04 #0), `worked` (S05 #0), `got up` (S01 #1). `see · saw` is ONE
  row (`L1-M5-S08` #0) because the verb was first taught in M5. `sleep`, `cook`, `had` unclaimed.
- **M3's want-to verbs are `learn` (`L1-M3-S03` #1) and `read` (`L1-M3-S04` #0)**, chosen so that
  M3 would NOT claim `eat` / `go` ahead of M4 (see "Authoring calls"). `speak`, `sit`, `buy` appear
  only in variations / notes — unclaimed.
- **Nouns now owned:** `pen · pens`, `key · keys`, `coffee`, `water`, `sugar` (M3); `school`,
  `breakfast`, `morning`, `Monday`, `brother · brothers` (M4); `rice`, `film · films`, `home` (M5).
  Mass-noun notes say *बिना a, बिना -s*; M8's `a kilo of rice` / `a bottle of water` inherit them.
  **Numbers:** `two` (M3), `seven`, `nine` (M4), `eight` (M5); `one`, `three`, `five`, `ten`… free
  for M8 (`one` appears only in M3's mistake plate). **Adverbs:** `always`, `usually`, `never`,
  `early` (M4); `yesterday` (M5); `sometimes`, `late`, `tomorrow` free.
- **Still unclaimed after M5, for the modules the briefs assign them to:** `will`, `I'll`, `going
  to`, `tomorrow`, `next`, `her`, `meeting` (M6); `it`, `it's`, `there is` / `there are`, `where`,
  `under`, `near`, `behind`, `next to`, `in front of`, `this`, the furniture (M7); `how much`, `how
  many`, `Can I have`, `please`, `of`, `rupees`, `kilo`, `bottle`, the numbers (M8); `because`, `so`,
  `that`, `very`, `why`, the feelings other than `happy` / `tired` (M9); `and`, `but`, `also`, `then`
  (M10). `tools/content-build.test.ts` pins a subset of these as absent after M5.

## Authoring calls outside the briefs' letter (recorded so #272 does not "fix" them back)

- **M3's `want to` verbs are `learn` and `read`, not the brief's `eat` / `go`.** The brief's
  examples (`I want to eat` · `I need to go`) are the right Hindi-shaped illustration, but `eat` and
  `go` are M4's rows with `forms` `eat · eats` / `go · goes` — a bare M3 row would have owned the
  key with `forms: []` and split M4's paradigm across two modules (`go` on M3's note, `goes` on
  M4's). The examples survive in the notes (`want to learn`, `need to read`, `go to school`).
- **M3's `allowedPatterns[0]` reads `I want + (a/an/the) + N`** — the brief's `I want + a/an/the +
  N` with the article made optional — because the article law the same brief asks for (*a kind of
  thing in general takes nothing: I want tea*) needs a no-article `want` sentence in display (S01),
  and the pool tests the three-way choice.
- **M5 teaches `happy` and `we` on the `was` / `were` sentences** (S09, S10): with `be` one row,
  `I was tired yesterday` would have had no new word at all (the M2 lesson of docs/11, correction
  6), and the brief's own examples were `I was tired · We were happy`. `happy` will be M9's feeling
  word too; its note is a plain adjective note and stays true there.
- **`literal` conventions extended for the shapes this pair meets.** One Hindi infinitive under
  `to` + verb (`मैं चाहता-हूँ सीखना अंग्रेज़ी` — two English words ↔ one Hindi, the mirror of M1's
  hyphenated `पसंद-करता-हूँ`, and said so in the `to` note); `the` glossed `वह` (`मैं ज़रूरत-रखता-हूँ
  वह चाबी`); the question helper glossed by the word that sits in its seat — `क्या` for `do` / `does`
  (`क्या आप चाहते चाय?`), `किया` for `did` (`क्या किया आप करना कल?`) — while the notes insist `do` is
  NOT क्या's translation; `मैंने` / `उसने` under M5's `I` / `she` so the ने the brief discusses is
  visible (`मैंने खाए चावल कल`); `need` glossed `ज़रूरत-रखता-हूँ`; `in the morning` glossed `में सुबह`
  (no Hindi slot for `the`). All are glosses of the English order, not Hindi to copy.
- **M4 is at the 25-word cap exactly.** `always` was kept as a row (S01) at the cost of `sleep`;
  `sometimes` appears only in a note. Nothing in M4 can be added without dropping something.
- **Full enrichment and `literal` on M4–M5** though both are optional from M4 — the precedent of
  en-es / en-ar, and `src/course/types.test.ts` asserts `sound` / `usage` / `mnemonic` / `literal`
  on every hi-en sentence it finds, so the simpler test held.

## Corrections applied during the pass

Self-review of the drafts, plus the audit above, changed these things before the flip:

1. **M3's `to` note claimed `to` "never comes after am · is · are".** False of real English (`I am
   to go`, `happy to help`). Rewritten as the bound this ladder actually keeps — *want / need / like
   के बाद क्रिया से पहले, या जगह से पहले; will के बाद नहीं (M6: \*I will to go नहीं)* — which is what
   the M6 brief needs and nothing more.
2. **M3's `do` note and rule 3 cited `What do you do? (M4)` and `I did my homework (M5)`** —
   sentences neither module wrote. The brief had suggested them; the notes now cite the real M5
   display (`What did you do yesterday?`) and keep `What do you do?` as an unattributed example.
3. **M4's `at` note and rule 1 credited `at home` to M7 alone**; M5 writes it twice (`He worked at
   home yesterday`, `I was at home yesterday`). The pointers now read M5, M7, so the learner who taps
   `at` in M5 is not told the seat belongs to a module they have not reached.
4. **M4's `have` note first said खाना-पीना "is not done with have"** — an overclaim (`have tea` is
   ordinary English). Now: *बोलचाल का have tea (चाय पीना) इस सीढ़ी पर नहीं सिखाया गया* — the course's
   bound stated as a bound.
5. **The `be`-row edit in M1 was first made by re-serialising the file** (141-line diff, every
   compact array re-indented). Reverted and re-applied as a two-line textual edit (`forms` + `note`),
   so M1's file changed by exactly the two lines the brief asks for.
6. **M5's `I was tired yesterday` / `We were happy` drafts had no new word** (every token already
   taught once `was` / `were` live on M1's row) — became `I was happy yesterday` (row `happy`) and
   `We were tired yesterday` (row `we`), with the brief's pair kept as variations and pool items.

## Verification

- `npm run content:validate` → **CONTENT 35/35 ok** (no `fixture` flag on any module)
- `npm run content:build -- --with-unverified --with-fixtures` → `hi-en: 5 modules (L1-M1..M5)`,
  `index L1-M1: 23 · L1-M2: 39 · L1-M3: 56 · L1-M4: 90 · L1-M5: 108 surfaces`; the strict build
  still reports `hi-en: 0 modules — fixture course, excluded by the gate`
- `npx vitest run src/course/types.test.ts src/course/hiEnAuthored.test.tsx
  tools/content-build.test.ts tools/validate.test.ts src/screens/SettingsScreen.test.tsx
  tools/generate-prompt.test.ts` → green (`types.test.ts` inventory now 35 files, hi-en law asserted
  over five; `content-build.test.ts` dev build ships five, the new M3–M5 landing test; the
  `hiEnAuthored` walk extended to the module list, Sentence Detail and Why panel of all three)
- `scripts/verify.sh --fast` → see the PR for the line
- Payload: **strict (what ships today): unchanged by construction** — hi-en is a fixture course, so
  the strict build and the font subsets never see it. #273's measurement.

## Open questions for a fluent / native English pass

Nothing below has been changed in the content. These are the calls where guessing would be worse
than asking — naturalness, Indian English against general usage, register, every phonetic claim, and
the pedagogy calls the owner decides.

### Naturalness

1. **`She works on Monday`** (M4-S06) — the brief's pattern, but a fluent ear says `on Mondays` for
   a habit; the singular reads as one particular Monday. Keep (the `on` = को lesson is unchanged) or
   move the display to `on Mondays` and list `Monday · Mondays` as forms?
2. **`I want the pen`** (M3-C02) and **`Do you want the book?`** (M3-C08) — correct, but are they
   what anyone says without a context line? They exist to test `the` against `a` / nothing.
3. **`I go to school at nine`** (M4-C03) and **`He goes to school at nine`** (M4-S03) — natural for
   a child; for the adult learner Rohan (a student / teacher / engineer in M1) does `go to school`
   sound right, or should M4 have spent a row on `office` / `work` as a place?
4. **`I want to read a book`** (M3-S04) at the 6-token bound — natural, or textbook-flat?
5. **`Do you want tea?` / `Do you want sugar?`** (M3-S08, S09) — blunt by general-English standards
   (`Would you like …?` is the offer). Fine for India and for a module that has no `would`; a
   native reviewer should say whether a learner will sound rude.
6. **`I need the key`** (M3-S07) — the brief's own example; does the bare sentence carry the "the
   one we both know" reading without context, or should the usage line carry a situation?
7. **`I eat breakfast in the morning`** (M4-S04) — tautological to a native ear (breakfast IS in the
   morning)? It exists to put `in the morning` in display with a verb M4 owns.
8. **`She drank tea yesterday morning`** (M5-S04) — `yesterday morning` was chosen over `in the
   morning` so the sentence is unambiguously past; natural?
9. **`He worked at home yesterday`** (M5-S05) — `worked from home` is the modern phrase; `at home`
   was kept because `from` is M1's "origin" row and `at` is the seat M4 / M7 need. Right call?
10. **`I was happy yesterday`** (M5-S09) — grammatical and a little odd as a standalone; the variation
    `I was not happy yesterday` and the pool's `We were happy yesterday` lean on it.
11. **`Did you see the film yesterday?`** (M5-S08) — `see` vs `watch` for a film: the note admits
    both; should the display prefer `watch`?

### Indian English vs general usage

12. **`take rest` / `take tea` / `do breakfast`** — the Indian-English phrasings are named only as
    mistakes or excluded (`*I do breakfast`, `drink tea … यहाँ take या have नहीं`). Is naming `take
    tea` as not-taught the right level, given the learner will hear it daily?
13. **`film` with `movie` in the note** — India says `film` / `movie` / `picture`; fine?
14. **`sugar` = शुगर** and **`rice` = चावल (mass)** — `Do you want sugar?` is the India-natural
    tea question; `I ate rice` fine everywhere?
15. **`school`** note says `go to school` is for learning and `the school` for the building — the
    general-English article-drop for institutions (`go to school / hospital / church`) is wider
    than that; is the note's narrowing harmful?
16. **`engineer` / `doctor` / `teacher` (M1) plus now `school`, `Monday`, `breakfast`, `rice`** —
    still the Indian-context vocabulary set; no Hindi-English faux ami was spotted.

### Register

17. **Every sentence is `neutral`**; the `informal` chip is still unused after five modules.
    `Do you want tea?` to an elder, `What did you do yesterday?` to a stranger — is `neutral`
    honest for all thirty lines, or does one of them want the chip?

### Sound notes — nothing here can be heard by the author

18. Every `sound` line is derived from dictionary descriptions and the author's model of
    Indian-English pronunciation, not from listening. The specific claims: `want` = वॉन्ट with a
    rounded `w`; `to` weak टु before a verb; `learn` = लर्न; `read` = रीड; `don't` = डोन्ट with the `o`
    of `go`; `coffee` = कॉफ़ी; `need` = नीड; `water` = वॉटर; `the` = द / दि before a vowel sound with
    the tongue between the teeth; `key` = की; `do` = डू; `sugar` = शुगर with श; `two` = टू with the `w`
    silent; `always` = ऑलवेज़; `wake up` / `get up` in one breath; `early` = अर्ली; `seven` = सेवन; `he`
    = ही; `goes` = गोज़; `school` without a prosthetic इ-; `nine` = नाइन; `eat` = ईट; `breakfast` =
    ब्रेकफ़स्ट; `morning` = मॉर्निंग; `usually` ≈ यूज़ुअली; `drink` = ड्रिंक; `she` = शी; `works` = वर्क्स;
    `Monday` = मंडे; `never` = नेवर; `does` = डज़ (not डोज़); `doesn't` = डज़न्ट; `have` = हैव;
    `brothers` with a voiced dental `th`; `yesterday` = येस्टर्डे stressed first; `got up` = गॉट अप;
    `eight` = एट; `went` = वेंट; `ate` = एट "like eight" (some British speakers say /ɛt/); `rice` =
    राइस; `drank` = ड्रैंक; `worked` = वर्क्ट with `-ed` as `t`; `home` = होम; `didn't` = डिडन्ट; `did`
    = डिड; `see` = सी; `film` = फ़िल्म not फ़िलम; `was` = वॉज़; `happy` = हैपी; `we` = वी; `were` = वर;
    and the intonation claims (rise on the yes/no questions `Do you want tea?`, `Does he get up
    early?`, `Did you see …?`; no rise on `What did you do yesterday?`). The Devanagari
    approximations are the least safe of all; a native ear should sample them, and the `the` /
    `th` / `w` claims first.

### Pedagogy calls the owner decides

19. **`literal` glosses `to` + verb as ONE Hindi infinitive** (`सीखना` under `to learn`), so the
    WORD-FOR-WORD plate has one fewer Hindi word than English words on those sentences; the `to`
    note explains. Keep, or mark the merge (e.g. `सीख-ना`)?
20. **`literal` glosses `do` / `does` as `क्या` and `did` as `किया`** in questions — the word that
    sits in the helper's seat, not a translation (the notes say so). Helpful or misleading?
21. **`literal` writes `मैंने` / `उसने` under `I` / `she`** in M5's transitive pasts (`मैंने खाए चावल
    कल`) to expose ने; M1–M4 wrote `मैं`. Is the inconsistency worth the point?
22. **The masculine first person** (`चाहता-हूँ`, `पीता-हूँ`, `उठा`, `था`) in literals AND in M5's cues
    (`मैं कल आठ बजे उठा`) — a woman reads `उठी` / `थी`. docs/11 question 15, now with the cues too.
23. **`want` and `need` are tagged `delta`, `to` / `don't` / `do` / `the` `interference`** (M3); in
    M4 the `-s` carriers (`does`, `doesn't`), `have`, `never` are `interference` and the pronouns /
    time words `delta`; in M5 only `didn't` / `did` are `interference`. Are the loud tags in the
    right places — in particular, should `want` (मुझे चाहिए → `*Me want`) share `like`'s
    `interference`?
24. **The `the` cue is `वह / वही (जो पता है)`** — the nearest Hindi, immediately qualified in the note
    as NOT the pointing word; is a one-word cue better (`वही`), or no Hindi word at all?
25. **M1's `be` cue stays `हूँ · है · हैं`** though the row now lists `was · were`; the note carries
    the past. Extend the cue to `हूँ · है · हैं · था · थे` (M1's Sentence Detail would then preview M5)
    or leave the cue as the M1 lesson?
26. **`I was happy yesterday` (M5-S09) shows no `was` row on its own Sentence Detail** — by
    construction of the one-`be`-row policy; the rule text, the trap and the `happy` note carry the
    paradigm, and the Why panel answers `was` with M1's row. Acceptable, or should the policy allow
    a second, index-unreachable row for Sentence Detail's sake?
27. **`has` is listed on `have` (`forms`) but no M4 display writes it** — the learner first meets
    `has` in a pool item (`He has two brothers`) and a variation. Same for `pens`, `keys`, `films`
    (forms indexed ahead of any display). Fine, or should every listed form appear in a display?
28. **M3's three mistake plates that are not strictly Hindi-driven**: `I want to read one book`
    (एक → one, Hindi-driven), `Are you want sugar?` (हैं → are, Hindi-driven) are fine; `I drink
    usually tea` (M4-S05) and `I were happy` (never written — replaced) were judged borderline. A
    stricter reading of "deliberately-wrong English driven by a Hindi habit" may want different
    plates for M3-S04 and M4-S05.
29. **M4 at the 25-row cap**: was `always` (a row) worth more than `sleep` (now unclaimed), given
    M5 recycles M4's verbs? If the owner prefers `sleep · sleeps`, `always` goes back to a variation.
30. **`see · saw` as one row** (M5) vs M4's present-only rows + M5's separate past rows — two
    patterns for the same kind of fact, because `see` was first taught in M5. Record as the rule
    (a verb first taught in the past module lists both shapes) or split `saw` out for uniformity?
