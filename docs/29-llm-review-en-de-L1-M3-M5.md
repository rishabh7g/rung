# LLM review — en-de L1-M3, L1-M4 and L1-M5

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Opus 5), which
cannot hear anything and is not a native or fluent German editor. It wrote the German, the English
teaching prose and the pronunciation glosses, and then audited all three modules against the briefs
in `tools/course-briefs.ts`. `verified: true` on the three files rests on the repo owner's standing
authority exactly as every earlier flip did, and `verifiedBy` says so in words —
`"Claude Opus 5 — LLM review, authorised by repo owner"`, `verifiedAt` `2026-08-30`. **No native or
fluent-German gate exists for this course.** The open-questions list at the bottom is the
outstanding work, and it is longer than en-fr's was, for reasons named there.

Nothing here reaches a learner: `content/courses.json` still carries en-de as `fixture: true`
(#356), so the strict build excludes the whole course and says so in one line —
`en-de: 0 modules — fixture course, excluded by the gate`.

**This arc was authored out of order, deliberately and under instruction.** L1-M1 and L1-M2 (#362)
are being written in parallel by another agent, so every inherited spelling in these three modules
was taken from the BRIEFS rather than from the M1/M2 JSON, which does not exist on this branch. The
consequence is a known red line and it is recorded honestly in "Verification" below rather than
papered over.

## What was authored

|                     | M3 Needs and wants | M4 My day      | M5 Yesterday    |
| ------------------- | ------------------ | -------------- | --------------- |
| sentences           | 10                 | 10             | 10              |
| new word rows       | 14 of 25           | 17 of 25       | 14 of 25        |
| variations          | 3 on every one     | 3              | 3               |
| pool items          | 12                 | 12             | 12              |
| tokens per sentence | 3–5 (bounds 3–6)   | 3–6 (3–6)      | 3–6 (3–7)       |
| enrichment          | full               | full           | full            |
| `glossEn`           | every sentence     | every          | every           |
| `literal`           | 10 of 10           | 8 of 10        | 9 of 10         |
| `sound`             | 10 heroes; 0 elsewhere | 10; 0      | 10; 0           |
| `register`          | `neutral` × 10     | `neutral` × 10 | `neutral` × 10  |
| module rules        | 10                 | 8              | 9               |

`content/en-de/levels.json` now shows L1-M3, L1-M4 and L1-M5 with `hasContent: true` and no `draft`
flag; the seven rungs nobody has authored keep theirs. The level's own `draftNote` was rewritten,
because it said "nothing is authored yet" and that is no longer true — it now says the course is
being authored a rung at a time and that the manifest row, not the rung count, is what keeps it out
of a learner build.

Enrichment is full on M4 and M5 as well as M3, which #363 left optional. The other seven courses
all ship full enrichment on all ten rungs, and there has been no payload ceiling to spend against
since #304, so "optional per budget" resolved to "author it".

`sound` is on all thirty hero sentences and on nothing else, per #363's explicit instruction: the
schema types `sound?` only on `Sentence`, and whether `Variation` and `PoolItem` should gain it is
tracked elsewhere and was not opened here.

## What each module teaches, and the claim behind each sentence

**M3 Needs and wants.** `möchte` with a thing (`Ich möchte einen Kaffee`) and with a BARE infinitive
parked at the end of the clause (`Ich möchte etwas essen`, `Ich möchte einen Kaffee trinken`). The
clause bracket is stated as a LAW and the slogan it attracts is refused in the same rule: German is
verb-SECOND, and what goes to the end is the non-finite half — S05's trap says so in as many words,
because `Ich möchte einen Kaffee trinken` is the sentence that kills "German puts the verb at the
end". The accusative arrives visible on the masculine only, drilled across four sentences
(`einen Kaffee` ×2, `einen Tee`, `keinen Kaffee`) against three where nothing moves. Negation splits
by TARGET: `kein` / `keine` / `keinen` on a noun in three sentences, `nicht` on a verb in one, with
`Ich möchte nicht Brot` on S07's mistake plate — the brief's nominated spend.

**M4 My day.** One present covering both of English's (`Ich arbeite` = "I work" and "I am working";
`Ich bin arbeite jeden Tag` and `Ich bin esse früh` are the two mistake plates for the shape a
learner assembles out of German parts). The separable verb, exactly one of them: `aufstehen`, split
across the clause in S02 and S08, with `Ich aufstehe um sieben Uhr` plated and `Ich stehe auf spät`
plated for the other half of the same confusion. Verb-second made visible by fronting in five of the
ten sentences (S03, S04, S05, S06, S10), each with the missing inversion on its mistake plate; the
rule text states the law precisely — the finite verb is the second ELEMENT, and `Um sieben Uhr` is
three words and one element. The reflexive daily, `Ich wasche mich`, with the dropped `mich` plated.
Time words: `jeden Tag`, `morgens`, `abends`, `am Montag`, `am Dienstag`, `um sieben Uhr`, `früh`,
`spät`.

**M5 Yesterday.** The Perfekt as two parts bracketing the clause, with the law that stops the whole
module going wrong stated in rule 1: **this IS German's ordinary spoken past**, so `Ich habe Brot
gegessen` is "I ate bread". `haben` for most verbs and `sein` for movement-and-change (`Ich bin nach
Hause gegangen`, with `Ich habe nach Hause gegangen` plated). Both participle shapes: strong
`gegessen` / `getrunken` / `gegangen` against weak `gemacht` and `gearbeitet`, the latter carrying
its linking `-e-` and its own note explaining why. The separable participle putting the `ge-`
inside itself (`aufgestanden`), with `auf gestanden` — the two halves written apart — on the plate,
rather than the invented `geaufstanden` the brief names in prose. And the deliberate Präteritum
exception stated in words on rule 7, then used: `Ich war müde`, `Ich hatte Hunger`, `Ich hatte keine
Zeit`. Nine of the ten sentences carry `literal`, because almost none of them is word for word.

## Index seams — what these three modules own, on the real index

Read out of a local run of `buildWordIndex` over the three files (`public/content/en-de/index/` is
not emitted, because the dev build fails on the M1/M2 gap described under Verification). Through
L1-M5 the three modules open **55 surfaces**, `maxSpan` 2.

- **`auf` is ONE row, M4's, and its note names BOTH seats** — `L1-M4-S02` word 1, cue
  `up (the prefix of aufstehen) · on`. The note says in full that here it is the detached prefix of
  `aufstehen` and that elsewhere it is the plain preposition "on" (`auf dem Tisch`), and it gives
  the test that separates them: a bare `auf` at the end of a clause with a stranded verb in front is
  a prefix; an `auf` with a noun phrase after it is a preposition. That sentence is written to be
  true of M7's seat in advance, because M7 can never reach the key. This is the `का` bug
  (`docs/08-marathi-third-review.md` correction 4) headed off rather than repaired.
- **`an`, `aus`, `mit`, `vor`, `nach` and `zu` are NOT claimed by anything here.** L1 teaches exactly
  one separable verb, so exactly one bare prefix key was spent, and the index confirms it: those six
  bare keys do not appear in the emitted surface list at all. `nach hause` is a two-token span and
  claims no bare part (`surfaceIndexKeys` splits hyphens, never whitespace).
- **`essen` is M3's**, `L1-M3-S04` word 1, `forms` `essen · esse`, one key doing three jobs with all
  three named in the note (infinitive, `Sie` form, the noun `das Essen`) plus the `isst` / `ist`
  homophone warning. **M4's `Ich esse` extends that row** rather than opening a rival: the pool audit
  below shows `esse` in four M4 items resolving to `L1-M3/essen`.
- **`nach Hause` is M5's**, `L1-M5-S04` word 0, taken as a two-token span, with the note pointing
  forward at M7's `zu Hause` and saying that bare `Hause` is not used on its own. M5 writes it before
  M7 exists, and first occurrence wins.
- **`war` and `hatte` are one row each**, `forms` `war · waren` and `hatte · hatten`, and each note
  says explicitly that the form does not move between `ich` and `er/sie/es`.
- **`möchte` is M3's own row** and its note does not answer for M1's `mag`: it says `möchte` is the
  request and points at `Ich mag` as the standing preference, and it warns about `Ich will` for M6.
- **`aufgestanden` is a `forms` entry on M4's `stehe` row**, per M5's brief — a tap on it opens
  "aufstehen, to get up", which is that verb's own shape, and not a participle row of its own. Every
  other participle (`gegessen`, `getrunken`, `gearbeitet`, `gegangen`, `gemacht`) IS its own row, one
  policy applied consistently: the exception is exactly the one the brief named.
- **`kein`, `keine` and `keinen` are three rows**, each `forms: []`, so all three keys stay
  reachable — as are `einen` beside M1's `ein` / `eine`.
- **No module here opens a `sie` row, and none writes a bare `Morgen`.** M4's morning is `morgens`, a
  different single-token key; M5's evening is `Abend` (bare `Abend` is free, because M2 takes
  `Guten Abend` as a whole span) and `abends`. The bare `morgen` key is left for M6.

## The pool audit — every token, and the row it lands on

Thirty-six pool items, twelve per module, none of them equal to a hero sentence. Every token was
resolved through the real resolver (`matchSurfaces` over the real index), not by eye. Eight tokens
resolve to nothing on this branch, and they are the same eight everywhere:
**`ich`, `sie`, `eine`, `der`, `ist`, `gut`, `bin`, `müde`** — all of them M1's or M2's by the
briefs, all of them absent because those two modules are being written in parallel. Every other
token lands on a row these three modules own, and on the RIGHT one:

- M3's twelve items resolve `möchte` / `möchten` to M3's `möchte`, `esse` / `essen` to M3's `essen`,
  `trinke` / `trinken` to M3's `trinken`, and `kein` / `keine` / `keinen` / `einen` each to its own
  row rather than to a neighbour's.
- M4's twelve resolve `stehen` and `auf` to the two halves of `aufstehen` (`L1-M4-S02` words 0 and
  1), `arbeiten` to M4's `arbeite`, `am` to M4's contraction, and four cross-module tokens
  (`esse`, `brot`, `suppe`, `kaffee`, `trinken`, `möchte`, `nicht`) back to M3.
- M5's twelve resolve `haben` to M5's `habe`, `aufgestanden` to M4's `stehe`, `nach hause` as one
  two-token surface to M5's span, and `war` / `hatte` to their own rows.

Nothing lands on a `forms` list belonging to another word — the hi-mr `forms`-swallowing lesson
(`docs/07-llm-review-L1-M6-M10.md`) was checked for specifically, and the only `forms` entries these
modules write are other shapes of the same verb (`möchten`, `esse`, `trinke`, `arbeiten`, `stehen`,
`waschen`, `haben`, `waren`, `hatten`) plus the one the brief mandates, `aufgestanden` on
`aufstehen`.

## Corrections applied during the pass

1. **M3 does not write `arbeite`, and the brief's own example is why.** M3's negation note offers
   `Ich arbeite nicht` as the model `nicht` sentence, and M4's index note assigns `arbeit`,
   `arbeite` and `arbeiten` to M4. First occurrence wins, so writing that sentence in M3 would have
   taken all three keys off M4 and left M4's work vocabulary answering to a negation example. M3's
   verb-negation sentence is `Ich trinke nicht` instead, with `Der Kaffee ist nicht gut` carrying the
   adjective seat in a variation and in the pool. The rule text is unchanged; only the display moved.
2. **M4 does not write the noun `Arbeit`, though the brief assigns it to M4.** Its only natural L1
   home is `zur Arbeit`, and `zur` is M7's contraction by decision 6 — so writing the noun would have
   cost M7 a key to save M4 one word it does not need. M4 spends `arbeite` / `arbeiten` and declines
   the noun. A later module that wants it can open it; nothing about M4 depends on it.
3. **`Ich möchte das Wasser` was rejected as a mistake plate and replaced.** It is correct German
   meaning "I'd like the water", and a mistake block that shows correct L2 is a lie about the
   language. The plate is now `Ich möchte eine Wasser` — wrong twice over, gender and article alike —
   and the `why` still makes the bare-generic point and still names what `das Wasser` would mean.
4. **`Sie möchten einen Tee?` was rejected for the same reason** and replaced with
   `Tun Sie einen Tee möchten?`, which is the do-support import the briefs actually name as the
   error. The declarative-with-rising-voice question is a real German echo question, so plating it as
   wrong would have taught a falsehood.
5. **A tenth rule was added to M3** for the bare generic (`Ich möchte Wasser`). S03 had been pointed
   at the `kein` rule for want of a better one, which was simply inaccurate; the module now carries
   the rule its own sentence exercises, and the rule names the French and Spanish contrast the brief
   asks for.
6. **`geaufstanden` was not written, even starred.** The brief names it in prose as the error to warn
   about, and the module's rule text says in words that it is not a German word — but the mistake
   plate shows `Ich bin um acht Uhr auf gestanden`, which is made of two real German words wrongly
   separated. This follows the en-ru `yó` rule the briefs apply to `ß`: a wrong spelling on the page
   is a wrong spelling somebody copies.
7. **`Ich habe morgens Kaffee getrunken` was cut from M5's pool.** `morgens` is habitual and the
   Perfekt is a single completed event, so the item was quietly odd German rather than wrong. It is
   now `Ich bin am Dienstag nach Hause gegangen`, which drills the `sein` auxiliary instead.
8. **M4's `früh` note was rewritten.** It had illustrated the adjective seat with `Der Kaffee ist
   früh`, which is not something anybody says. It now makes the same uninflected-adjective point
   without an example that would need defending.

## Verification

- `npm run content:validate` → `CONTENT 73/73 ok`. All three files pass on their own, including the
  M1–M3 full-enrichment rule, the ten-sentence count, the pool floor, the id/filename match, the
  prerequisite ordering and the rule-index range.
- `npm run content:build` (the strict build, which is what `scripts/verify.sh` runs) → **passes**.
  en-de is a fixture COURSE, so the gate excludes it wholesale and the seven shipping courses build
  unchanged.
- `npm run content:build -- --with-unverified --with-fixtures` (the dev build) → **fails, and is
  expected to.** Every error is one of the eight inherited tokens above, in the form
  `"ich" (item L1-M3-C01) is not taught by L1-M3`. The build's own header explains the rule it is
  enforcing: the index is the SHIPPED sequence, so a build that ships L1-M3 without L1-M1 fails here
  — "Ship the ladder in order." That is exactly what has happened, because #362 and #363 were run in
  parallel. Nothing was faked green to hide it: no `verified: false`, no edit to another course, no
  pool item softened.
- `npx vitest run tools/content-build.test.ts` → 9 failures, all downstream of the same gap. Those
  cases run their own DEV build over the real content root, that build now aborts, and so the files
  they then read (`hi-mr/index/L1-M1.json`, `en-ar/index/L1-M1.json`, `en-es/index/L1-M1.json`,
  `hi-en/index/L1-M2.json`, `hi-mr/levels.json`) are never emitted. Not one of them names a module
  authored here. **They go green the moment L1-M1 and L1-M2 land**, and they will not go green any
  other way short of removing `ich` and `Sie` from German sentences.
- `src/course/types.test.ts` → 91 passed, with the pinned `MODULE_FILES` inventory extended by the
  three new files. The list is deliberately PARTIAL for en-de — the first time it has ever held a
  half-written course — and the comment beside it says so.
- Orthography sweep over all 250 German strings the three modules ship (displays, word `display`s,
  every `forms` entry, every variation, every mistake, every pool item): no `ae` / `oe` / `ue`
  transcription anywhere, every noun capitalised, and every `ss` verified as correct after a short
  vowel (`essen`, `gegessen`, `Wasser`, `Suppe`). No word of these three modules is spelled with `ß`
  at all, so the `ß` / `ss` seam is untouched here.
- Register sweep over the same 250 strings: no `du`, `dein`, `dich`, `dir` or `ihr`, no `-st` ending
  in any `forms` list, no `Hallo`. Every second-person line is `Sie` with the plural verb, and every
  sentence chips `register: neutral`.
- Verb position was checked sentence by sentence. M3: `möchte` second in all nine statements, the
  infinitive last in S04 and S05, the verb first in S06's question. M4: the finite verb second in all
  ten, the prefix last in S02 and S08, inversion after a fronted element in S03, S04, S05, S06 and
  S10. M5: the auxiliary second in all statements, the participle last in every Perfekt sentence,
  inversion after `Gestern` in S02 and after `Gestern Abend` in S10, the auxiliary first in S09's
  question, and `war` / `hatte` second in S06, S07 and S08.
- `scripts/verify.sh --fast` → **`FAIL TEST (exit 30)`**, and that is the whole of what it printed.
  TYPES and LINT passed (their logs are in `.verify/` and are empty of errors; a missing log would be
  proof a step never ran), and the harness stops at the first failure, so CONTENT was never reached
  on that run — it was run on its own instead, and it passes. The one red step is TEST, for the nine
  cases above, for the one reason above.
- **No browser was used and none will be**, per CLAUDE.md's ban on Playwright and Chromium on this
  host. The render path was exercised by `vitest` over the real content tree.

## Open questions for a native or fluent German reviewer

This list is longer than en-fr's, and two of its entries exist only because the ladder was written
out of order.

1. **Every inherited spelling came from a brief, not from a file.** `ich`, `sie` / `Sie`, `eine`,
   `der`, `ist`, `bin`, `gut` and `müde` are used in these modules on the strength of what
   `tools/course-briefs.ts` says M1 and M2 will write. If #362 spells any of them differently, or
   assigns one to a different row, three modules inherit the mismatch. **Re-run the dev build once
   both arcs are merged and read the errors before believing this arc is finished.**
2. **`Auf Wiedersehen` is a seam nobody has decided.** M2's brief says the course closes with it and
   decision 4 gives the bare key `auf` to M4's separable prefix. If M2 writes `Auf Wiedersehen` as
   two bare word rows rather than as one two-token span, `Auf` folds to `auf` and M2 takes the key
   before M4 exists — and M4's carefully two-seated note becomes unreachable. The fix, if it happens,
   is on M2's side: take the farewell as a span, as M2 already takes `Guten Tag`. **This was noticed
   while authoring M4 and is flagged rather than fixed, because M2 is not this arc's to touch.**
3. **`Möchten Sie kein Brot?`** (M3-S07, variation 3). Grammatical, and a negative question is
   exactly what sets up M2's `Doch` — but is it what a German speaker would actually say, or would
   they ask `Möchten Sie kein Brot mehr?` or simply `Kein Brot?` A fluent ear should confirm the bare
   form is idiomatic before it stays.
4. **`Ich wasche mich jeden Tag`** (M4-S07). Correct, and the reflexive is the point — but a German
   speaker describing a routine may be likelier to say `Ich dusche` or to name the part being washed.
   Is the bare reflexive natural here, or textbook-natural only?
5. **`Ich hatte nicht Zeit`** (M5-S08's mistake plate). Presented as wrong against `keine Zeit`, which
   is the standard. `nicht` before a bare noun is possible in contrastive contexts
   (`Ich hatte nicht Zeit, sondern Geld`), so the plate may be over-strict. Confirm that a learner
   who has never met contrast is better served by the flat rule.
6. **`Haben Sie das gemacht?`** (M5-S09). The tone is not neutral in every context — it can read as an
   accusation. The `usage` line says so, but a native reviewer should judge whether a first-level
   learner is well served by meeting `machen` in this frame rather than in, say, `Was haben Sie
   gemacht?` (which L1 cannot write, because `was` is M8's key).
7. **`Ich esse früh` / `Ich arbeite spät`.** Both are grammatical; are both idiomatic as bare habit
   statements, or does German want a time phrase with them?
8. **The pronunciation glosses in every `sound` field are written by something that has never heard
   German.** The claims made — `ei` as English "eye", `ie` as "ee", `w` as V, `z` as TS, `st-`/`sp-`
   as SHT-/SHP-, the hard `ch` after `a` against the soft `ch` after `i`, final `-d`/`-g` hardening,
   the syllabic `-en` — are the standard descriptions, but the ENGLISH APPROXIMATIONS chosen for them
   are the reviewer's real work. `ö` as "the vowel of bed with the lips of boot" and `ü` as "ee with
   the lips of oo" in particular are the two a learner will get wrong from the page alone.
9. **`jeden Tag` as an accusative of time** is stated as a law in M4-S01's word note without a fuller
   account of the accusative-of-time rule, which L1 has no room for. Is that note true enough, or does
   it need hedging?
10. **The one liberty taken with the brief's vocabulary list:** M4 adds `Dienstag` beside `Montag`
    (so that `am + weekday` reads as a pattern rather than a frozen phrase) and M5 adds `acht` beside
    M4's `sieben`. Both are inside the 25-word cap and neither touches a key another module's brief
    claims — `acht` and `sieben` are numbers M8 would otherwise open, and M8's own note only requires
    that no display write a number with no row behind it, which holds. Confirm this is the right
    reading of a brief's `patterns` list as guidance rather than as a closed set.
