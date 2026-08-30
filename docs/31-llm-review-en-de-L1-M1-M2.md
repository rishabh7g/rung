# LLM review — en-de L1-M1 and L1-M2

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Opus 5), which
cannot hear anything and is not a native or fluent German editor in the sense a course like this
eventually needs — it wrote the German, the English teaching prose and the pronunciation glosses,
and then audited all three. `verified: true` on both modules rests on the repo owner's standing
authority, exactly as hi-mr's (PR #190), en-es's (#192–#194), en-ar's (#199–#201), hi-en's
(#270–#272) and en-fr's (#328) flips did; `verifiedBy` says so in words:
`"Claude Opus 5 — LLM review, authorised by repo owner"`, `verifiedAt` `2026-08-30`. **No native
or fluent-German gate exists for this course**, and the open-questions list at the bottom is the
outstanding work.

Nothing here reaches a learner yet: `content/courses.json` still carries `fixture: true` on the
en-de row — this issue did not touch that file — so a strict build skips the course entirely
(#365 is the issue that flips it). A dev build (`--with-unverified --with-fixtures`) ships both
rungs and writes `public/content/en-de/`, which it did not do before.

## What was authored

|                     | L1-M1 Who I am                         | L1-M2 First exchange     |
| ------------------- | -------------------------------------- | ------------------------ |
| sentences           | 10                                     | 10                       |
| new word rows       | 21 of 25 allowed                       | 19 of 25 allowed         |
| variations          | 3 on every sentence                    | 3 on every sentence      |
| pool items          | 13                                     | 14                       |
| tokens per sentence | 3–4 (bounds 3–5)                       | 3–5 (bounds 3–5)         |
| enrichment          | full (all five blocks, every sentence) | full                     |
| `glossEn`           | every sentence                         | every sentence           |
| `literal`           | 2 of 10                                | 5 of 10                  |
| `trap`              | 10 of 10                               | 10 of 10                 |
| `register`          | `neutral` on all ten                   | `neutral` on all ten     |
| `rules`             | 13                                     | 10                       |
| prerequisites       | `[]`                                   | `["L1-M1"]`              |
| cumulative index    | 28 surfaces, `maxSpan` 2               | 48 surfaces, `maxSpan` 3 |

There was no fixture to replace: `content/en-de/modules/` did not exist before this issue. The two
modules were written strictly in ladder order against `tools/course-briefs.ts` (#361) via
`npm run content:prompt`, rebuilding the index between them, so M2 was written against M1's real
cumulative inventory of 28 surfaces. `content/en-de/levels.json` now carries `hasContent: true`
and no `draft` flag on both rungs, and its L1 `draftNote` was rewritten so it stops claiming that
nothing in the course is authored; the level itself keeps its `draft` flag until #365.

Two standards that had to be retrofitted onto older courses are baked in from the first module, so
en-de will never need the retrofit: **three variations on every sentence** (#288's bar) and
**twelve-plus comprehension items per module** (#292's — this issue shipped 13 and 14).

**`sound` is on all twenty hero sentences and on nothing else.** No variation and no pool item
carries one, because the schema has no such field on `Variation` or `PoolItem` (`src/course/
types.ts`) and the validator would drop it. That gap is real and is tracked elsewhere; #362 was
explicit that it is not to be opened, worked around, or allowed to block a module, and it was not.

## The briefs' en-de decisions, as shipped

### 1. Language of the fields

Every teaching field is English; German appears only in the L2 slots. `glossEn` is on all twenty
sentences — the L2 is not English, so #268's exemption misses this course and `checkGlossEn` would
have failed the build. `literal` is carried wherever the construction is not word for word, which
in these two rungs is seven lines: M1's `Ich heiße Anna` ("I am-called Anna") and `Ich bin Student`
("I am student"), and M2's `Wie heißen Sie?` ("how are-called you"), `Ja, ich heiße Weber`,
`Wie geht es Ihnen?` ("how goes it to-you"), `Mir geht es gut, danke` ("to-me goes it well,
thanks") and `Sprechen Sie Deutsch?` ("speak you German"). It is deliberately absent from the rest:
`Ich wohne in Berlin` and `Das ist der Tisch` really are word for word, and a `literal` line that
merely repeats the gloss teaches nothing. The count climbs from M3, where the clause bracket
arrives.

### 2. Case folding meets German capitalisation — the `sie` row

**There is exactly ONE `sie` entry in the emitted index, it is M2's, and its note is written true
of all three readings.** From `public/content/en-de/index/L1-M2.json`:

```
  sie  ->  { moduleId: "L1-M2", sentenceId: "L1-M2-S02", wordIdx: 1 }
```

which is the word row `display: "Sie"`, `cue: "you (formal) · she · they"`,
`forms: ["Sie", "sie"]` — two spellings, one key, one row, by design. Its note names the rule that
actually separates the readings (the verb form, and in writing the capital), gives all three in
worked form (`sie ist müde` / `sie sind müde` / `Sie sind`), and already covers M10's `sie` for a
feminine THING, so that when M10 writes `die Tür … sie` the note it lands on is true. It also says
in one line that `Sie` is not a politeness coating on `du` but its own grammatical person with its
own `Ihr` and `Ihnen`.

The multi-token escape hatch was not attempted, because the briefs had already checked it and
rejected it: `Sie sind` and `sie sind` fold to the same key. M1 does hold a two-token
`sie heißen` surface — a `forms` entry on the `Ich heiße` chunk — and it takes nothing from the
bare key, which is exactly the property the briefs relied on: `surfaceIndexKeys` splits hyphen
parts, never whitespace tokens, so a spanning surface claims no bare part. Verified on the real
index: `sie heißen` and `sie` are two entries pointing at two different rows.

Two pool items in M2 exist only to drill the seam: `Sie ist müde` (cued "She is tired" — the
singular verb settles it) and `Sie sind müde`, whose cue says out loud that at the start of a
sentence the capital tells you nothing and the plural verb fits both "you" and "they". That
ambiguity is a fact about German, not a defect in the item, and a self-marked comprehension card
that pretended otherwise would be teaching the wrong thing.

**No all-caps display anywhere**, for the same seam pointing the other way: an upper-cased word
folds to a key no row owns. `src/course/types.test.ts` now asserts it mechanically.

### 3. `der` / `die` / `das` are M1's, and the notes are true in M2

From `public/content/en-de/index/L1-M2.json` — all three still resolve to M1, because first
occurrence wins and M2 opened no rival:

```
  der  ->  { moduleId: "L1-M1", sentenceId: "L1-M1-S06", wordIdx: 1 }
  die  ->  { moduleId: "L1-M1", sentenceId: "L1-M1-S07", wordIdx: 0 }
  das  ->  { moduleId: "L1-M1", sentenceId: "L1-M1-S06", wordIdx: 0 }
```

Each note was written for the whole of L1, not for M1:

- `der` — "the definite article for a masculine noun… `der` has a second seat you will meet later:
  in front of a FEMININE noun after certain prepositions it also appears as `der` — `auf der
  Straße`", so M7's `auf der Straße` lands on a note that already accounts for it.
- `die` — "feminine… It is ALSO the article for the plural of every gender — `die Tische`, `die
  Türen`, `die Bücher`", so M8's plural lands on a note that already accounts for it.
- `das` — "one word doing two jobs… in front of a neuter noun it is 'the'… standing on its own in
  front of `ist` it POINTS at something… A later rung uses the same pointing `das` to ask what
  something costs", so M8's `Was kostet das?` lands on a note that already accounts for it.

M2's only use of any of the three is the pool item `Ist das der Tisch?`, which resolves to M1's
`das` and `der` rows — checked token by token, not assumed. Relative pronouns and the genitive are
written nowhere, which is what keeps all three notes true.

`Ihnen` and `Ihr` each own a clean key, settled by exclusion exactly as the briefs planned: no
lowercase `ihnen` ("to them"), `ihr` ("you" plural) or possessive `ihr` ("her"/"their") is written
in either module, and the type test now fails on a lowercase one.

### 4. Register — the course speaks `Sie`

No `du`-register shape appears in ANY L2 slot in either module — display, `forms`, variation,
mistake plate or pool item. That is a stronger rule than en-fr's, where the mistake plates were
allowed to carry the register the course refuses; here the plates are held to it too, because a
`du` form on a starred plate is still a `du` form on the learner's screen and the whole point of
the decision is that the index never carries a shape the course does not teach. `bist` is not
written and not listed: the `sein` row's `forms` are `bin · ist · sind` and nothing else. `du`,
`Hallo` and `Tschüss` are NAMED in English prose — M2-S01's `Guten Tag` note and its `usage` line
say what the learner will hear and what a later level owes them — because naming is not writing.

Every sentence chips `register: "neutral"`; the schema has only `neutral` and `informal`, and
politeness above neutral is left to words (`bitte`, M8) and to the `usage` line, as the briefs
said.

**One register correction was applied during review, and it is worth recording.** The first draft
of M2 greeted `Guten Tag, Anna` and addressed two pool items to `Anna`. Addressing somebody by
first name while on `Sie` terms is marked German — the "Hamburger Sie" — and it quietly taught the
opposite of the course's own decision. M2-S01 now greets `Guten Tag, Frau Weber`; `Frau` and
`Weber` are word rows (`Frau` does double duty as the noun "woman" and as the title, one word and
therefore one row, with a note true of both), `Herr Meyer` appears in a variation, and the trap
line says in so many words that `Guten Tag, Anna` is not a warmer version of the same line but a
different relationship. Referring to a third party by first name is untouched — `Wie geht es
Anna?`, `Anna geht es gut` — because that was never the problem.

### 5. Multi-token surfaces keep bare words free

Four spans across the two rungs, each verified on the real index to claim no bare part:

| span         | owner       | what it protects                                                       |
| ------------ | ----------- | ---------------------------------------------------------------------- |
| `ich heiße`  | M1-S01      | leaves bare `ich` to M1's own pronoun row (M1-S02); bare `heiße` unwritten |
| `sie heißen` | M1-S01      | a `forms` entry on the same row; leaves bare `sie` free for M2          |
| `guten tag`  | M2-S01      | bare `Guten` never written, so its accusative `-en` never has to be explained |
| `wie geht es`| M2-S05      | keeps `geht` free for M4's `gehen`; M2's own bare `wie` (M2-S02) untouched |
| `mir geht es`| M2-S06      | keeps `geht` and `es` free, and leaves bare `mir` for M9's `Mir ist kalt` |

The last of those is a decision the briefs implied but did not state, and it is flagged below.
`maxSpan` is 2 through M1 and 3 from M2.

### 6. Homographs and first-occurrence-wins

- **`sie`** — M2, one row, three readings. Above.
- **`der` / `die` / `das`** — M1, one row each. Above.
- **`ein` / `eine`** — both M1's, as the briefs assigned. They are different keys, so M3's `einen`
  can open its own row without either becoming unreachable.
- **`aus`** — M1's, from `Ich komme aus Indien`, which is what keeps it out of the hands of a
  separable `ausgehen`; that verb is deferred out of L1 for exactly this reason.
- **`mag`** — M1's, `forms: ["mag"]` only. `mögen` as a bare infinitive is written nowhere, per the
  briefs, so M3's `möchte` row will have nothing to compete with.
- **`Frau`** — M2's, one row for the noun "woman" and the title alike, since they are the same word
  and the fold would have merged them in any case.
- **`nicht`** — M2's, which the briefs did not assign explicitly but which follows from their own
  `doch` decision (below). Its note is written true of M3 in advance: it states where `nicht`
  stands, and says that a noun which would otherwise take `ein` is negated with a different word a
  later rung teaches, so `*Ich möchte nicht Brot` is named as wrong before M3 gets there.
- **`Deutsch`** — M2's, bare after `sprechen`, no article; the note says the adjective is the same
  key after the fold and is not taught in L1.
- **`Morgen`** — no bare `Morgen` is written anywhere. M2's greeting is the span `Guten Morgen`,
  and it appears only as a variation display, so it does not even open a row. The bare key is
  untouched and waiting for M6.
- **`Leben` / `leben`** — written nowhere in either reading. M1's residence verb is `wohnen`, and
  its note names the other verb without spelling it.

### 7. Umlauts and ß

Written everywhere they belong and never transcribed: `Tür`, `müde`, `heiße`. No `ae` / `oe` /
`ue` spelling and no `ss`-for-`ß` appears in any L2 slot, mistake plates included — no wrong
spelling of a word is written at all, starred or otherwise, because a starred misspelling is a
surface somebody copies. The rule is taught rather than merely obeyed: M1's `Tür` note says
"`schon` and `schön` are two different words, and so are `Mutter` and `Mütter`", and the
`Ich heiße` note says the vowel before the `ß` is long and that German does not write a double s
there — stated without ever writing the wrong form. `src/course/types.test.ts` now fails on
`heisse`, `heissen`, `strasse`, `gross`, `dreissig` or `weiss` in any L2 slot.

**Font check (#362's first look).** After `npm run content:build -- --with-unverified
--with-fixtures && npm run fonts:build`, the generated `mukta-latin-{400,600,700}.woff2` cuts were
re-subset character by character and compared against an empty-subset baseline. `ä`, `ö`, `ü` and
`ß` are present in all three weights. `Ä` and `Ö` are ABSENT — correctly, because nothing in these
two modules writes a capital umlaut, and the subsetter includes only what the harvested content
actually contains. `Ü` is present. Nothing needs doing here and no font file was touched; a later
module that writes `Ärztin` will pull `Ä` in on its own build. This is a check, not a font ticket,
and it passed.

## Corrections applied during the review

1. **The `Sie` + first-name register slip**, described in section 4 — the largest change, touching
   M2-S01, S03, S04, two pool items and three variations.
2. **`Mir geht es` taken as a three-token span.** The first plan wrote `Mir geht es gut, danke`
   with `geht` and `es` as bare tokens, which would have handed M2 the bare `geht` key that the
   briefs reserve for M4's `gehen` and the bare `es` reserved for M10 — and would have done it in
   the same breath as the briefs' own instruction to protect `geht` by taking `wie geht es` whole.
   Taking the answer whole too closes it, and it has the further payoff of leaving bare `mir` free
   for M9's `Mir ist kalt`, which the briefs promised M9.
3. **`heißen` added bare to M1's `Ich heiße` row `forms`.** M2 writes `Wie heißen Sie?`, and the
   span `Sie heißen` cannot match `heißen Sie` — different order — so the token would have
   resolved to nothing and a "why" tap on the module's second sentence would have had no answer.
   The briefs ban the bare `heiße` (the `ich` form, which would compete with the chunk); they say
   nothing about the infinitive, nothing competes for it, and adding it keeps `heißen` landing on
   M1's chunk row rather than tempting M2 into a rival.
4. **The pool cue on `Sie sind müde`** was widened to name the "you / they" ambiguity instead of
   asserting one reading, which a self-marked card would otherwise have marked wrong.
5. **`Ich bin nicht Student` withdrawn from the pool.** It is grammatical but marked — the
   idiomatic negation of a bare predicate noun is `Ich bin kein Student`, and `kein` is M3's. The
   item became `Nein, ich wohne nicht in Berlin`, which negates a verb, which is precisely what
   `nicht` is for.
6. **One mistake plate rewritten to avoid a lowercase noun.** An earlier draft used `das buch` as
   the plate for the capitalisation rule. A lowercase noun creates no rival index key, so it was
   safe on the mechanics — but the rule this repo holds is that a wrong spelling is not written on
   the page at all, and gender plates (`Das ist die Buch`) teach the same lesson without breaking
   it.

## Where the briefs were under-specified, and what was done

These are not disagreements. They are places where the briefs' module rows and their course-wide
sections did not quite line up, and where following one to the letter meant departing from the
other. Each was resolved toward the seam decisions, which are the irreversible half.

1. **`in` is M1's, not M7's.** Decision 4 lists `in` among the prepositions that are "M7's", but
   M1's own `patterns` list carries `Ich wohne in + place`, so M1 writes `in` first and
   first-occurrence-wins gives M1 the key whatever the list says. M1 therefore opens it, and the
   note is written true of M7 in advance: "the same `in` comes back in a later rung for being
   inside a thing… where the ARTICLE after it changes shape… The word `in` itself never changes."
   M7 must open no rival row; the index could never reach it.
2. **`ein` and `eine` had no pattern to be written in.** The seam note says both are opened in M1,
   and none of M1's six patterns produces one. `Das ist + ein/eine + N` was added as a seventh
   pattern and two sentences use it. The alternative — a word row for a word absent from its own
   sentence — has thin precedent in the repo (eleven rows across seven courses, all of them
   citation forms of a word that IS in the sentence) and would have been worse.
3. **M2 writes displays its `patterns` list does not name.** The M2 notes require `Wie heißen
   Sie?`, `Wie ist Ihr Name?` and `Sprechen Sie Deutsch?` by name, and none is in the pattern list.
   `allowedPatterns` declares what an eleventh sentence of the same complexity may use, so it now
   declares what the module actually writes: the six from the briefs plus `Ist Ihr Name + name +
   ?`, `Sprechen Sie + language + ?` and `Ich bin nicht + Adj`.
4. **`nicht` lands in M2, a rung earlier than the negation module.** The briefs' `doch` decision
   requires a negative question (`Sind Sie nicht müde?`) in M2, which cannot be written without
   `nicht`. M2 owns the row and its note is written true of M3. M3 must extend it rather than open
   a second.
5. **`sehr` was cut.** The M2 pattern reads `Mir geht es + gut/sehr gut + , danke`; `sehr` has no
   sentence of its own at this word cap, so the declared pattern is `Mir geht es + gut + , danke`
   and `sehr` is named in a word note only.
6. **`Herr`, `Frau`, `Weber` and `Meyer` are new to the plan.** The briefs settle the register but
   never name the address form that goes with it. Without `Frau` + surname there is no way to write
   a greeting in the `Sie` register at all, so `Frau` and `Weber` became word rows and `Herr` and
   `Meyer` appear in variations and prose.

## Verification

- `npm run content:validate` → `CONTENT 72/72 ok`, with `en-de/L1-M1.json ok` and
  `en-de/L1-M2.json ok`. Neither file carries `fixture: true`.
- `npm run content:build -- --with-unverified --with-fixtures` → exit 0,
  `en-de: 2 modules (L1-M1..M2)`, `index L1-M1: 28 surfaces`, `index L1-M2: 48 surfaces`, no pool
  warnings. `npm run content:build` (strict) also exits 0 and skips the course, which is what
  `fixture: true` is for — so the missing L1-M3…M10 fail nothing.
- **Every comprehension-pool token was resolved against the emitted cumulative index and the word
  row it lands on was read out**, for all 27 items across both modules, rather than trusting the
  build's "it resolves" check (PRD §6.3). Every one lands on the right row: `sind` and `ist` on
  M1's `sein` row, `studentin` on M1's `Student` row, `kommen` on M1's `komme` row, `spreche` on
  M2's `sprechen` row, `sie` on M2's one `sie` row, `wie geht es` and `mir geht es` on their own
  spans. No `forms` list in either module holds a cousin, a synonym or a set of siblings — the
  hi-mr failure mode of `docs/07-llm-review-L1-M6-M10.md`. The closest call is M1's `Student`,
  whose `forms` are `Student · Studentin`: those are the masculine and feminine of one agent noun,
  which is the en-fr `étudiant` / `étudiante` precedent, not two words.
- Every hero-sentence token in both modules also resolves, so no "why" tap anywhere in the two
  rungs is silent.
- No pool item case-insensitively equals any hero sentence in either module.
- **Dev-build smoke by reading the emitted tree**, not by a browser (CLAUDE.md bans Playwright and
  Chromium on this host): `public/content/en-de/levels.json` shows `L1-M1` and `L1-M2` with
  `hasContent: true` and the other eight `false`; `public/content/en-de/modules/L1-M{1,2}.json`
  carry the gloss on every sentence, all five enrichment blocks on every sentence, and 13 and 14
  comprehension items; `public/content/courses.json` now lists `en-de` with `fixture: true`
  preserved. The module list itself is rendered through the real content tree by
  `src/screens/SettingsScreen.test.tsx`, which boots the en-de ladder off
  `content/en-de/levels.json` and now finds one call to action where it used to find none.
- Pinned inventories updated: `src/course/types.test.ts` (72 module files, en-de's two added in
  glob order), `tools/content-build.test.ts` (en-de now ships two rungs on a dev build, writes
  `public/content/en-de/`, and appears in the emitted manifest carrying its fixture flag) and
  `src/screens/SettingsScreen.test.tsx` (one link in the ladder, not zero).
- A new `src/course/types.test.ts` case pins the briefs' decisions on the shipped files: `glossEn`
  on every sentence, `register: "neutral"` on every sentence, no `du`-register token in any L2 slot
  including mistake plates, no lowercase `ihr` / `ihre` / `ihnen`, no all-caps L2 token, no
  `ß`-respelled word, exactly one `sie` row and it is M1-M2's own, and exactly one `der` / `die` /
  `das` row apiece and all three are M1's.
- `npm run fonts:build` green; the umlaut check is in section 7.
- `scripts/verify.sh --fast` — the line it printed is in the commit message.

## Open questions for a native or fluent German reviewer

The list a later pass owes an answer to. These are the places where an LLM's judgement is weakest:
naturalness, register and anything that has to be heard.

1. **The pronunciation glosses are English respellings** (`ish HIGH-suh`, `shtoo-DENT`, `vee GAYT
   ess EE-nen`, `SHPREH-khen zee DOYTCH`) and nobody has heard them. Every `sound` line in both
   modules needs a listener. The specific claims worth checking: that the `ch` of `ich` and `nicht`
   is the front sound while the `ch` of `Buch` and `Doch` is the back one and the preceding vowel
   decides; that a single `s` before a vowel is voiced (`Sie`, `sind`); that final `g` hardens to
   `k` (`Tag`, `mag`) and final `d` to `t` (`sind`); and that `Kaffee` is stressed on the first
   syllable.
2. **`Ist Ihr Name Weber?`** — is this what a receptionist actually asks, or would a speaker say
   `Sind Sie Frau Weber?` or `Ihr Name, bitte?` The whole `Name` row rests on it.
3. **`Anna geht es gut`** (M2-S06 variation) — a fronted dative with no article. Grammatical, but is
   it natural standing alone, or does it want `Es geht Anna gut` outside a context that set Anna up?
4. **`Ein Student ist in Berlin`** and **`Eine Studentin ist in Berlin`** (M1-S09, S10 variations).
   Indefinite subjects are grammatical and often odd in isolation; German would usually reach for
   `Es ist ein Student in Berlin` or a definite. Are these acceptable as drill sentences, or do
   they read as translationese?
5. **`Der Tisch ist in Berlin`, `Das Buch ist in Berlin`** — `in Berlin` for a small object is a
   strange thing to say. They exist to show `sein` locating without spending M7's prepositions
   early. Is the oddness a real cost?
6. **`Ich mag Berlin` / `Ich mag Indien`** — is `mögen` natural with a place, or does a speaker say
   `Ich mag Berlin gern` / `Berlin gefällt mir`? The whole `mag` row would move if not.
7. **`Sie heißen Anna`** (M1-S01 variation) as a bare statement. Stating somebody's name back at
   them in the `Sie` form — natural as confirmation, or does it need a tag?
8. **`Ich bin Anna`** offered as a casual alternative to `Ich heiße Anna`. Right, or does it read
   as a line from a play?
9. **`Ich komme von Indien`** is the M1-S02 mistake plate, glossed as `von`-for-`aus`. Is that the
   mistake an English speaker actually makes, and is the `aus` / `von` split stated correctly?
10. **`Wie sind Sie?`** is M2-S05's mistake plate, glossed as "what are you like". Is that the
    reading a German ear gets, or is the sentence simply odd?
11. **The gender-prediction claims** in M1's rule 5 and the `Student` note: `-ung`, `-heit`,
    `-keit`, `-schaft`, `-ion`, `-tät` feminine; `-chen`, `-lein` neuter; `-er` agent nouns
    masculine. Standard, but stated as fact to a beginner — is the trade right, or does it invite
    over-generalisation?
12. **`Guten Tag` as the course's greeting.** Is it still the everyday one across the German-speaking
    world, or has it drifted formal enough that a survival learner is better served by `Hallo`
    despite the register decision? Related: en-de has ratified no VARIETY (`Guten Tag` versus
    `Grüß Gott` versus `Grüezi`), which en-ar had to do and en-fr was flagged for. That decision is
    still open and belongs on the course, not on a module.
13. **The register decision itself.** `Sie` course-wide is the survival choice and it means a
    learner finishes L1 unable to speak to a friend. Is that the right trade, or should M2 have
    introduced `du` as recognition-only? Recorded in `tools/course-briefs.ts` and cheap to revisit
    before more modules inherit it.
14. **Is the greeting the right place to spend `Frau` and `Weber`?** Section 4 argues the register
    forces it. A native reviewer may think the two word rows are better spent elsewhere and the
    greeting better left without a vocative.
