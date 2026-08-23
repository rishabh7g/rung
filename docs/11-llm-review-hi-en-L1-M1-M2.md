# LLM review — hi-en L1-M1 and L1-M2

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Fable 5), which
cannot hear anything and is not a fluent-English editor in the sense a course like this eventually
needs — it wrote the English, the Hindi teaching prose and the pronunciation glosses, and then
audited all three. `verified: true` on both modules rests on the repo owner's standing authority,
exactly as hi-mr's (PR #190), en-es's (#192–#194) and en-ar's (#199–#201) flips did; `verifiedBy`
says so in words: `"Claude Fable 5 — LLM review, authorised by repo owner"`, `verifiedAt`
`2026-08-23`. **No native or fluent-English gate exists for this course**, and the open-questions
list at the bottom is the outstanding work.

Nothing here reaches a learner yet: `content/courses.json` still carries `fixture: true` on the
hi-en row, so the strict build skips the course entirely (#273 is the issue that flips it). A dev
build (`--with-unverified --with-fixtures`) ships both rungs.

## What was authored

| | L1-M1 Who I am | L1-M2 First exchange |
|---|---|---|
| sentences | 10 | 10 |
| new word rows | 17 of 25 allowed | 15 of 25 allowed |
| pool items | 8 | 8 |
| tokens per sentence | 3–4 (bounds 3–5) | 3–5 (bounds 3–5) |
| enrichment | full (all five blocks, every sentence) | full |
| `literal` | every sentence | every sentence |
| `glossEn` | none (#268) | none |
| prerequisites | `[]` | `["L1-M1"]` |
| cumulative index | 21 surfaces, `maxSpan` 1 | 37 surfaces, `maxSpan` 2 |

There was no fixture to replace: `content/hi-en/modules/` did not exist before this issue. The two
modules were written strictly in ladder order against `tools/course-briefs.ts` (#269) via
`npm run content:prompt`, rebuilding the index between them, so M2's prompt was generated against
M1's real cumulative inventory (21 surfaces). `content/hi-en/levels.json` now carries
`hasContent: true` and no `draft` flag on both rungs.

**The four decisions of the briefs' hi-en header, as shipped:**

1. **Language of every field.** Every `rules[].text`, word `note`, `cue`, `trap`, `sound`,
   `variations[].changed`, `mistake.why`, `usage` and `mnemonic` is Hindi in Devanagari, quoting the
   English word it explains (`like का मतलब पसंद करना`) but never switching into English prose;
   `display` and `forms` are English with no Devanagari; no sentence carries `glossEn`; every
   sentence carries `literal` — the Hindi words in English order, a multi-word gloss of one English
   word hyphenated (`मैं पसंद-करता-हूँ चाय`, `मैं-हूँ ठीक, धन्यवाद`). `src/course/types.test.ts`
   asserts all of this mechanically for every hi-en module file it finds.
2. **Contractions.** `I'm` arrives in M2 as its own row, `forms` `I'm · I am`, straight `'` only.
   `display` uses it wherever speech contracts (`I'm fine, thank you` · `No, I'm not`) and the full
   form where the brief says — `I am a student` (M1: `am` is the lesson) and `Yes, I am`
   (sentence-final `am` never contracts). No possessive `'s` anywhere.
3. **One `be` row.** M1-S01's `is` opened it with `forms` `am · is · are`; `am` and `are` in every
   later sentence resolve to it and are never re-deconstructed. M5 will extend that row in M1's file
   (`L1-M1-S01`, `deconstruction.words[2]`) with `was · were` — nothing here pre-lists them.
4. **Multi-token surfaces.** `Good morning` and `thank you` are single rows with `forms: []`; bare
   `good`, `morning` and `thank` are unclaimed, and `you` belongs to the pronoun row (M2-S03).

## The slogan traps, and what was written instead

The briefs name the memorable-and-false rule each module attracts (`course-briefs.ts` rule 2).
What shipped:

- **"English is SVO"** → M1 rule 0 states the movement instead: *the verb comes SECOND, right after
  its subject, and what stood before है in Hindi now stands after the verb* — `मेरा नाम रोहन है →
  My name is Rohan`, `मुझे चाय पसंद है → I like tea` — and `literal` is where the learner watches है
  jump. "SVO" is true and tells a Hindi speaker nothing about what to move.
- **"English has no gender"** → M1 rule 1 states the law about the verb only: *be changes by person
  and number — am · is · are, as हूँ · है · हैं — and never by gender; है serves a man and a woman
  alike, and so does is* — and says out loud that choosing he or she for a PERSON is M4's lesson.
- **"the = specific, a = any"** → M1 rule 4 teaches exactly two cases and no slogan: a countable
  singular noun takes `a`/`an`, chosen by SOUND not letter (`a student · an engineer · an hour`); a
  kind of thing in general takes nothing (`I like tea`, and `I like the tea` would mean that
  particular tea — `the` is M3's). The article is the module's one loud interference tag.
- **"like is backwards" / the dative habit** → M1 rule 5 states the nominative law: *the liker is
  the subject, like is an ordinary verb, the thing liked is its object* — and names both Hindi-shaped
  errors, `*Me tea likes` and `*I am like tea`, the second of which is the commonest thing a Hindi
  speaker actually writes.
- **"questions just add ?"** → M2 rule 0 (the module's one interference rule) states the swap:
  *a yes/no question moves be in front of the subject — You are a doctor → Are you a doctor? — where
  Hindi adds क्या at the front and moves nothing; there is no English word for क्या*; wh-questions
  take the same shape with their word first (`How are you?` · `What is your name?`); `You are a
  doctor?` with only the mark changed is the mistake plate.
- **"-ing means now" / agreement by speaker** do not arise in M1–M2; the adjective rule (M2 rule 4)
  says *the adjective never changes — fine, tired, one form for a man, a woman, two people*, named
  as the rest point the brief asks for.

## The index audit — where every pool token actually lands

Run against the emitted `public/content/hi-en/index/L1-M<n>.json`, through the real engine
(`matchSurfaces` + `tokenizeSurface` from `src/engine/surface.ts`), resolving each hit back to
`modules/<id>.json → sentences[<sid>].deconstruction.words[<idx>]` — the exact row `WhyPanel` /
`WhyRow` renders. **66 pool tokens, 0 unresolved, 0 wrong-word landings.** The same landings are
pinned in `tools/content-build.test.ts` ("lands hi-en on the rows the briefs assigned") and
rendered through the real Why panel in `src/course/hiEnAuthored.test.tsx`.

### L1-M1 — 21 surfaces, maxSpan 1

| item | display | tokens → row |
|---|---|---|
| C01 | Rohan is from India | `rohan` → Rohan (S01 #3) · `is` → **is** (S01 #2, the be row) · `from` → from (S02 #1) · `india` → India (S02 #2) |
| C02 | Rohan is a student | `rohan` → Rohan · `is` → is · `a` → a (S04 #0) · `student` → student (S04 #1) |
| C03 | Rohan is an engineer | `rohan` → Rohan · `is` → is · `an` → **a** (S04 #0) *forms-hit* · `engineer` → engineer (S06 #0) |
| C04 | I like Delhi | `i` → I (S02 #0) · `like` → like (S07 #0) · `delhi` → Delhi (S03 #0) |
| C05 | I like India | `i` → I · `like` → like · `india` → India |
| C06 | I like my name | `i` → I · `like` → like · `my` → My (S01 #0) · `name` → name (S01 #1) |
| C07 | I am a music teacher | `i` → I · `am` → **is** (S01 #2) *forms-hit* · `a` → a · `music` → music (S08 #0) · `teacher` → teacher (S05 #0) |
| C08 | Rohan is from Delhi | `rohan` → Rohan · `is` → is · `from` → from · `delhi` → Delhi |

### L1-M2 — 37 surfaces cumulative, maxSpan 2

| item | display | tokens → row |
|---|---|---|
| C01 | Hello, how are you? | `hello` → Hello (S01 #0) · `how` → How (S03 #0) · `are` → **is** (M1-S01 #2) *forms-hit* · `you` → you (S03 #1) |
| C02 | Are you a student? | `are` → is (M1) *forms-hit* · `you` → you · `a` → a (M1) · `student` → student (M1) |
| C03 | Are you from India? | `are` → is (M1) *forms-hit* · `you` → you · `from` → from (M1) · `india` → India (M1) |
| C04 | Yes, I am a doctor | `yes` → Yes (S08 #0) · `i am` → **I'm** (S04 #0, one two-token key) *forms-hit* · `a` → a (M1) · `doctor` → doctor (S06 #0) |
| C05 | No, I'm a teacher | `no` → No (S09 #0) · `i'm` → I'm (S04 #0) · `a` → a (M1) · `teacher` → teacher (M1) |
| C06 | I'm from Delhi | `i'm` → I'm · `from` → from (M1) · `delhi` → Delhi (M1) |
| C07 | Is your name Rohan? | `is` → is (M1, the be row) · `your` → your (S05 #1) · `name` → name (M1) · `rohan` → Rohan (M1) |
| C08 | I'm not tired | `i'm` → I'm · `not` → not (S09 #1) · `tired` → tired (S10 #0) |

### The forms-hits, checked one by one

A forms-hit means the Why panel shows a row headed by a different string, so the row's note has to
be true of the surface the learner tapped. All three kinds here are shapes of the SAME word — never a
cousin, a synonym or a sibling set, which is the bug class that shipped four times in hi-mr
(docs/07-llm-review-L1-M6-M10.md: M6-1, M7-2, M7-3, M8-1).

1. `am` / `are` → row **is** / `हूँ · है · हैं`. The note is the paradigm itself: *I am (हूँ) · you
   are (हो / हैं) · he, she, it is (है) · we, they are (हैं) — and never by gender.* The cue names all
   three shapes, so a tap on `am` reads its own word first.
2. `an` → row **a** / `एक`. The note is the sound rule: *व्यंजन की आवाज़ से पहले a (a student · a
   teacher), स्वर की आवाज़ से पहले an (an engineer · an apple) — अक्षर नहीं, आवाज़.*
3. `i am` → row **I'm** / `मैं हूँ`. The note is written true of both shapes — *I am का बोलचाल वाला
   रूप … दोनों का मतलब एक — I am वही है, बस पूरा* — and says where the full form is the only form
   (`Yes, I am`, never `*Yes, I'm`). Note that this key exists only from M2's index on: inside M1,
   `I am` still resolves as `I` + `am`, which is what M1 teaches.

Every other pool token lands on a row whose `display` IS the surface tapped. Sentence displays were
walked the same way: every token of all 20 sentences resolves, and no sentence depends on a word row
that comes later in its own module (M2-S03 teaches `you` before M2-S04's `thank you` needs the bare
word to be claimed elsewhere).

## Index seams decided here (they bind M3–M10)

The index is cumulative and first-occurrence-wins, so these are load-bearing for every later author
(#271, #272).

- **`be` is one row: `L1-M1-S01` `words[2]`, `forms` `am · is · are`.** M5 extends it in M1's file
  (`was · were`, note gains the past) — never a second row. M6's `is` inside `she is meeting` and
  M7's `is` inside `there is` behave as the briefs say: the former resolves here, the latter is
  captured by the whole `there is` surface.
- **`a` · `an` is one row (`L1-M1-S04` `words[0]`)** whose note already says the generic/mass case
  takes nothing and that `the` is M3's — so M3 opens `the` and must not touch `a`.
- **`like` ships `forms: []`** (the verb only, "similar to" excluded). M4's third-person `-s` is not
  pre-listed: when M4 writes `likes`, extend M1's row (`L1-M1-S07` `words[0]`, `forms` `like ·
  likes`), the way M5 extends `be`, or open a `likes` row — either way the note stays true (it
  describes the nominative frame, not the ending).
- **`books` ships `forms` `book · books`** — so `book` is already claimed; M3's "nouns whose plural
  the module uses are rows with forms book · books" must not open a second `book` row (it would be
  unreachable). The row's note covers the singular (`I like a book` = कोई एक किताब).
- **`I'm` (`L1-M2-S04` `words[0]`) owns `i'm` AND `i am`.** Any later `I am` in a pool item or a
  sentence opens the contraction's note — true of both shapes by construction.
- **`No` and `not` are two rows (`L1-M2-S09`)**: `No` the answer, `not` the negator placed after
  `be`; M3's `don't` row lists `don't · do not` only and must not re-teach `not` or pre-list
  `doesn't` (M4's).
- **`Good morning` and `thank you` are whole, `forms: []`** — `Good afternoon` / `Good evening` /
  `thanks` are named in the notes as different expressions, never as forms (the "sibling set" bug).
  `good`, `morning`, `thank` are unclaimed; `morning` is free for M4's `in the morning`.
- **`you` is `L1-M2-S03` `words[1]`**, note: one you for तू · तुम · आप, always `are`. `your` and `my`
  are single-form rows whose notes say so.
- **`How` (M2) owns `how`**, note promising `how much` to M8; **`What` (M2)** owns `what`, note
  naming the two jobs of Hindi क्या and that the yes/no job has no English word.
- **`Hello`, `Yes`, `No`, `doctor`, `Mumbai`, `tired`, `fine`** are M2's; **`Rohan`, `India`,
  `Delhi`, `student`, `teacher`, `engineer`, `tea`, `music`, `English`, `name`, `my`, `I`, `from`**
  are M1's. `Priya`, `Sharma`, `Jaipur`, `coffee`, `water`, `cricket`, `films`, `dogs`, `farmer`,
  `actor`, `Hindi` appear ONLY in variations (unindexed) — a pool item may not use them until a
  module teaches them.
- **Still unclaimed after M2, for the modules the briefs assign them to:** `to`, `do`, `the`
  (M3); `likes`, `does`, `doesn't`, `he`, `she`, `have`, `in`, `on`, `at` (M4); `did`, `was`, `were`
  (M5); `will`, `going to`, `her` (M6); `it`, `it's`, `there is`, `where` (M7); `how much`, `please`,
  `of` (M8); `because`, `so`, `very` (M9); `and`, `but`, `also`, `then` (M10). `well` was not used.
  `tools/content-build.test.ts` pins a subset of these as absent after M2.

Two authoring calls that are not in the briefs' patterns verbatim, recorded so #271 does not
"fix" them back:

- **`Hello, my name is Rohan` (M2-S01) instead of `Hello, Rohan`.** The brief's pattern `Hello /
  Good morning + , + name` yields a two-token line for `Hello`, and the same brief sets the
  complexity floor at 3 (*"Thank you rides inside a longer line"*). The five-token opener keeps the
  floor, keeps the pattern's shape (`Hello,` + name-giving) and recombines M1 instead of spending a
  slot on a bare vocative; `Hello, Rohan` survives as the row's own example.
- **`Are you tired?` (M2-S10) and `allowedPatterns[3]` widened to `Are you + a/an + N / Adj /
  from + place?`.** The brief needs the wellbeing pair `fine` / `tired` in display and a `tired` row;
  every pattern-literal placement (`I'm tired, thank you`) was unnatural, and the adjective question
  is the natural feeder for `Yes, I am` / `No, I'm not`. One token added to the declared pattern,
  nothing else.

## Corrections applied during the pass

Self-review of the drafts, plus the audit above, changed these things before the flip:

1. **M1's `I` note claimed "an English sentence starts with its subject."** False from M2 on
   (`Are you …?` starts with the verb). Now *"अंग्रेज़ी का वाक्य बिना कर्ता के चलता ही नहीं"* — the
   true law, and the one M1 rule 2 states.
2. **M2 rule 0 told the learner that every question ends in `?` "in display"** — authoring
   vocabulary leaking into learner-facing prose. Removed the word.
3. **M2 rule 5 said the formula words are followed by a comma** — false of `thank you` at the end of
   `I'm fine, thank you`. Now *"इनके साथ comma आता है — Hello, Rohan · Yes, I am · I'm fine, thank
   you"*.
4. **M2-S03's sound note asserted stress on `you` in `How are you?`** — a claim the author cannot
   hear and that native descriptions split on (`How ARE you?` vs the reciprocal `How are YOU?`).
   Replaced by what is safe: one breath, no rise at the end because it is not a yes/no question.
   Open question 14.
5. **M2's `thank you` note said the `you` inside it "is not doing the pronoun's job"** — it is the
   object pronoun; the formula is simply learned whole. Now *"अंदर का you वही तुम / आप है, पर जोड़ा पूरा
   का पूरा चलता है — तोड़कर नहीं"*, which is also what the brief's multi-token rule actually says.
6. **Two M2 drafts had no new word at all** (`Are you a teacher?`, `Are you from Delhi?` — every
   token already M1's), which the schema forbids (`deconstruction.words` min 1) and the prompt
   forbids by spirit (no re-deconstructing). They became `Are you a doctor?` and `Are you from
   Mumbai?`, each opening one honest new row.

## Verification

- `npm run content:validate` → **CONTENT 32/32 ok** (no `fixture` flag on either module)
- `npm run content:build -- --with-unverified --with-fixtures` → `hi-en: 2 modules (L1-M1..M2)`,
  `index L1-M1: 21 surfaces`, `index L1-M2: 37 surfaces`; the strict build still reports
  `hi-en: 0 modules — fixture course, excluded by the gate`
- `npx vitest run tools/validate.test.ts tools/content-build.test.ts tools/generate-prompt.test.ts`
  → green; `src/course/types.test.ts` (inventory now 32 files, hi-en language law asserted),
  `src/screens/SettingsScreen.test.tsx` (M1's CTA now present) and the new
  `src/course/hiEnAuthored.test.tsx` (Ladder → module list → Sentence Detail with no gloss
  paragraph and the WORD-FOR-WORD plate → Why panel on two pool items) → green
- `scripts/verify.sh --fast` → see the PR for the line
- Payload: **strict (what ships today): unchanged by construction** — hi-en is a fixture course, so
  the strict build and the font subsets never see it. The dev-build cost of the Devanagari subset
  is #273's measurement, not this issue's.

## Open questions for a fluent / native English pass

Nothing below has been changed in the content. These are the calls where guessing would be worse
than asking — naturalness, Indian English against general usage, register, and every phonetic
claim.

### Naturalness

1. **`Hello, my name is Rohan`** as the very first exchange line — textbook-natural, but is
   `Hello, I'm Rohan` what a fluent speaker would actually open with? The module teaches `I'm` three
   sentences later, so the textbook form was kept; the variation `Hello, I am Rohan` shows the other
   shape.
2. **`I'm fine, thank you`** — the safe answer, but is it what people say today, or does a fluent ear
   expect `I'm good` / `I'm well, thanks` / `Fine, thanks`? `I'm good` is deliberately NOT taught
   (it would hand `good` a meaning before M-later's adjective), but a native reviewer should say
   whether the taught line sounds dated.
3. **`Yes, Rohan is`** (M2-S08 variation) — grammatical, but a native reflex is `Yes, he is`. `he` is
   M4's, so the name was used; is the variation worth keeping, or should it go?
4. **`I like my name`** (M1-C06) and **`I am a music teacher`** (M1-C07) — natural? Both exist only to
   recombine taught words; if either sounds like a textbook sentence nobody says, swap it.
5. **`Rohan is a student` / `Rohan is an engineer` / `Rohan is from Delhi`** — three pool items with a
   named third-person subject before `he` / `she` exist. Pedagogically right (the be row's `is` does
   third-person work without a pronoun); does it read naturally?
6. **`Are you tired?`** as M2's wellbeing question — natural, or would `Are you OK?` / `Are you all
   right?` be the real thing asked? `OK` / `all right` were not taught on purpose (one adjective
   row, `tired`, per the brief's pair).
7. **`I am from Delhi` after `I am from India`** — does a speaker give both, and in that order?

### Indian English vs general usage

8. **`Good morning, teacher`** (M2-S02 variation) — the Indian classroom greeting; in general English
   the vocative is `sir` / `miss` / a name. Kept because the learner is in India; a reviewer should
   say whether teaching it unmarked is right.
9. **`engineer` / `doctor` / `teacher`** as the three professions — Indian-English-typical choice;
   fine everywhere?
10. **`Delhi` = डेली (h silent)** and **`Mumbai` with `Bombay` named in the note** — is the silent-h
    claim right for the English pronunciation a Hindi speaker should aim at, given that Indian
    English speakers often say दिल्ली / देहली in English too?
11. **`thank you` vs `thanks`** — the note admits `thanks`; should the display prefer it anywhere?
12. **`I like English`** as the closing sentence of M1 and **`I like cricket`** as a variation — good
    Indian-context choices, or too cute?

### Register

13. **Every sentence is `neutral`**; the `informal` chip is unused in both modules. `How are you?`
    and `Are you tired?` to an elder, `Hello` to a stranger — is `neutral` honest for all twenty
    lines, or does one of them want the chip?

### Sound notes — nothing here can be heard by the author

14. Every `sound` line in both modules is derived from dictionary descriptions and the author's
    model of Indian-English pronunciation, not from listening: `name` = नेम, `is` = इज़, `my` = माइ;
    `from` = फ़्रॉम; `India` = इंडिया; `a` as weak अ; `student` = स्टूडेंट with the warning against
    the prosthetic इ-; `teacher` = टीचर; `engineer` stressed on its last part; `like` = लाइक; `tea`
    = टी; `music` = म्यूज़िक; `books` = बुक्स with final s, not z; `English` = इंग्लिश; `Delhi` =
    डेली; `Hello` stressed on its second part; `Good morning` = गुड मॉर्निंग; `th` of `thank` as a
    dental fricative near थ; `What` = वॉट; `your` = योर; `tired` = टायर्ड; and the two intonation
    claims (rise on yes/no questions, no rise on `How are you?`). The Devanagari approximations are
    the least safe of all; a native ear should sample them, and the intonation claims first.

### Pedagogy calls the owner decides

15. **`literal` uses the masculine `पसंद-करता-हूँ`** (the brief's own example) on all four `I like …`
    sentences. A woman reads करती. Leave it (it is a gloss of the English, not a line to copy), or
    write `पसंद-करता/करती-हूँ` once?
16. **`a`'s cue is `एक`.** The nearest Hindi word, and the note immediately explains that Hindi has no
    article — is the one-word cue more helpful than misleading?
17. **`I` is tagged `free`** (मैं = I, a 1:1 word) with the never-dropped and capital-I facts in its
    note and in M1 rule 2; `my` / `your` are `delta` (one form for three). Right weights?
18. **M2 has no `interference` WORD row** — its one loud tag is rule 0 (the inversion). The brief
    asks for `you` and the adjectives to be `delta`; is a module with no interference row the honest
    picture of a Hindi speaker's first exchange, or should `not` (नहीं before the verb → `*I not
    am`) carry it?
19. **Two mistake plates are not Hindi-driven**: `Im fine, thank you` (the apostrophe, which
    Devanagari does not have — close enough) and `Are you a tired?` (over-applying the module's own
    article lesson). The brief's rule is "deliberately-wrong English driven by a Hindi habit"; both
    are real learner errors, but a stricter reading wants a different plate for S10.
20. **The `Hello` trap** names the habit of adding `जी` after `Hello` — a real Hindi-speaker habit,
    but is it the trap worth spending S01's one trap slot on, over the dropped verb the mistake
    plate already covers?
