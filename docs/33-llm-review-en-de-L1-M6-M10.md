# LLM review — en-de L1-M6 … L1-M10

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Opus 5), which
cannot hear anything and is not a native or fluent German editor. It wrote the German, the English
teaching prose and the pronunciation glosses, and then audited all three. `verified: true` on the
five modules rests on the repo owner's standing authority; `verifiedBy` says so —
`"Claude Opus 5 — LLM review, authorised by repo owner"`, `verifiedAt` `2026-08-30`. **No native or
fluent-German gate exists for this course.** The open questions at the foot of this note are the
outstanding work, and they are longer than en-fr's for a reason: German's clause bracket and its
case endings are places where a sentence can be flawless grammar and still not be what anybody
says, and nothing in this pass could hear the difference.

The file is numbered 33 to sit after the two notes the M1-M2 and M3-M5 authoring issues (#362,
#363) will write as 31 and 32. Those two halves of the ladder were authored **in parallel with this
one, on separate branches**, which is the single most important fact about this review and is why
§"What is red, and why" exists at all.

## What was authored

|                     | M6 Tomorrow | M7 Where things are | M8 Numbers & shopping | M9 Feelings & opinions | M10 Connected talk |
| ------------------- | ----------- | ------------------- | --------------------- | ---------------------- | ------------------ |
| sentences           | 10          | 10                  | 10                    | 10                     | 10 turns           |
| new word rows       | 13 of 25    | 16 of 25            | 19 of 25              | 15 of 25               | 15 of 25           |
| index surfaces      | 16          | 19                  | 21                    | 16                     | 15                 |
| variations          | 3 each      | 3 each              | 3 each                | 3 each                 | 3 each             |
| pool items          | 15          | 15                  | 15                    | 15                     | 15                 |
| bounds              | 4–7         | 4–7                 | 3–7                   | 3–8                    | 3–8 per sentence   |
| enrichment          | full        | full                | full                  | full                   | full               |

Every hero sentence carries `sound`; no variation and no pool item does, because `sound?` is typed
only on `Sentence` in `src/course/types.ts` and widening the schema is out of scope for this arc.
Every sentence carries `glossEn`; `literal` is carried wherever the German order moves, which in
M6 is every fronted sentence and in M9 is every subordinate clause. Every sentence chips
`register: neutral`.

**M10's turns fit the bound twice over.** The per-sentence budget is what the issue requires, and
inside a turn no sentence runs past five words; the three items that are a single sentence run to
seven or eight. The WHOLE of every turn is also at most eight words, so the file passes under the
stricter reading as well. No schema change was needed and none was proposed.

All five modules read `hasContent: true` in `content/en-de/levels.json` with no `draft` flag.
M1-M5's rows are untouched — they belong to #362 and #363 — and so is the L1 level's own
`draft: true` and its `draftNote`, which says "nothing is authored yet". That note is now false
and it is **deliberately not fixed here**: it belongs to whoever graduates the course, and three
branches editing the same three lines would produce a merge conflict in exchange for nothing.

## What each module teaches

**M6 Tomorrow** — the present tense plus a time word IS the future, with nothing added: `Morgen
esse ich Brot` is the same `esse` the learner met in M4. Ten sentences of fronted time words, so
M4's verb-second law is drilled rather than restated, and the law is stated as *the second
ELEMENT* — `Am Wochenende` is two words and one element. `will` gets the module's loudest warning:
it is `wollen`, "I want", and not a future auxiliary. `werden` + infinitive is named and deferred.
`nichts` is opened beside M3's `nicht` because they are one letter and two parts of speech apart.
`wann` is opened as the ASKING half of English's "when", with M10's `wenn` named forward as the
joining half.

**M7 Where things are** — `es gibt`, invariable for both numbers, taken as a two-token surface so
`gibt` and the bare `es` both stay free. The two-way prepositions with the slogan killed on the
page: `Ich bin im Park` (dative, location) against `Ich gehe in den Park` (accusative, motion),
and `es gibt einen Stuhl` taking the accusative with no object relationship anywhere in the
sentence. The obligatory contractions. Location on M1's one `sein` — no `ser`/`estar` to warn
about. `wo` opened with `wer` named as the false friend it looks like.

**M8 Numbers & shopping** — the two price questions, both verb-second. `wie viel` and `wie viele`
as two two-token surfaces beside M2's bare `wie`. The backwards two-digit number, written as one
token: `einundzwanzig` is "one-and-twenty", and the module's trap is that a learner who hears
`sechsundvierzig` and writes 64 has heard correctly and assembled wrongly. The bare measure phrase
— `ein Kilo Brot`, no `von` — plated against both English's "of" and French's `de`. `Euro` with no
plural `-s`. `eins` standing alone against `ein` before a noun. `dreißig` as the one ten spelled
with `ß`. And the bare `zu` at last, in its "too" job.

**M9 Feelings & opinions** — the true law behind the slogan, built in pairs one word apart:
`Ich möchte Tee, weil ich müde bin` against `Ich möchte Tee, denn ich bin müde`. `deshalb` fronted
and inverting, which is the third behaviour and the one that tells it apart from `denn`. The
`haben` states with the reason spelled out — `Durst` is a noun, so `Ich bin Durst` says "I am
thirst". The dative experiencer returning from M2, with `Ich bin kalt` plated as a grammatical
sentence about the speaker's character. And `Ich denke, dass das Buch gut ist`, which carries both
spellings of the pair side by side and is where the `das`/`dass` trap hangs.

**M10 Connected talk** — turns of two or three complete sentences, each with its own subject and
its own verb. The recombination law as three behaviours, not two: `und`/`aber`/`oder`/`denn`
coordinate and change nothing; `weil`/`dass`/`wenn` subordinate and send the verb last;
`dann`/`also` are adverbs, take first position, and invert. `also` and `auch` named in the same
note, because they are each other's English translation and naming them apart is what preserves
the wrong pairing. `er`/`sie`/`es` for THINGS by grammatical gender, with `Es ist alt` for
`der Tisch` plated as the anglophone default. And `wenn`, completing the pair M6 opened.

## Corrections applied during the pass

1. **`nach + place` was cut out of M6 entirely, against M6's own pattern row.** The brief lists
   `Morgen + V + ich + nach + place`, and course decision 4 says flatly that bare `nach` is never
   written in L1 — the course spells `nach Hause` as a span and nothing else. Written literally,
   `Morgen fahre ich nach Berlin` would have put a bare `nach` in a display with no row behind it
   and no owner anywhere in the briefs. The pattern is realised instead as
   `Übermorgen gehe ich nach Hause`, reusing M5's span exactly as M6's own seam note instructs.
   The `allowedPatterns` block still quotes the brief verbatim, because that is the prompt
   contract; the content is what was narrowed.
2. **`ins` was kept, and a neuter place noun was bought to justify it.** `im` (in + dem, dative)
   and `ins` (in + das, accusative) carry this module's whole contrast in three letters each, so
   dropping `ins` for want of a neuter place would have thrown away the neatest statement of the
   rule. `das Kino` was opened in M7-S07 for exactly that reason, and `ins` rides M7's `im` row as
   a `forms` entry rather than opening a row of its own — one note, written true of both, is
   better than two notes that each have to point at the other.
3. **`zum` likewise rides `zur`.** `zu dem` and `zu der` are one contraction with two genders, not
   two facts, and the sentence that carries them is `Ich gehe zur Arbeit` — the phrase decision 4
   names by hand as the reason bare `zu` stays free for M8.
4. **Bare `an` and bare `mit` were deliberately NOT opened, and this is a judgement call.**
   Decision 4 lists them among "M7's" prepositions. No L1 job needs either: M4's `am` row already
   covers the `an` family's place seat by its own note (`am Tisch`), `ans` has no sentence to live
   in, and `mit` appears in no pattern in any of the ten briefs. Opening a row for a word no
   display writes would be over-declaration, and the briefs' own discipline for that case is the
   one applied to bare `nach` — do not write it, and say so. Said here.
5. **`sieben` was avoided in M8.** M4's `um sieben Uhr` writes it first, so M8's numbers are
   `eins`, `zwei`, `drei`, `zwölf`, `zwanzig`, `einundzwanzig` and `dreißig`. This is the one place
   the parallel authoring genuinely constrained the content rather than merely the verification.
6. **`Hunger` is M5's, so M9 opens only `Durst` and `Angst`.** M5's brief teaches `Ich hatte
   Hunger` as its named exception, which gets there first. M9's rule text names all three states
   and its sentences write two.
7. **No rival `sie` row.** M10 needs `sie` for a feminine thing (`Die Tür ist klein. Sie ist neu.`)
   and opens `er` and `es` only. The trap on M10-S03 says in words that the `sie` the learner taps
   is M2's single folded row, and that nothing new was introduced.
8. **A blanket `/ae|oe|ue/` ban was tried in the new test and rejected.** `teuer`, `neue` and
   `Steuer` all carry a `ue` across a morpheme seam and are correctly spelled, so the regex flags
   real German. What the test asserts instead is that each module's German actually CONTAINS an
   umlaut or `ß` — the en-ru "stress is actually marked" reading of the same idea — plus the
   all-caps ban, which is exact.
9. **Two untaught nouns were pulled out of variations.** `Fenster` (twice, in M7) and `schön` (in
   M10) were replaced with `Buch`, `Kino` and `neu`. Variations sit outside the pool rule by design,
   but a variation whose `changed` line says "a neuter noun" is only teaching if the noun is one the
   learner has met.

## The pool audit — every token, and the row it lands on

The real cumulative index for these modules **cannot be built on this branch**, because M1-M5 are
being authored elsewhere. It was simulated instead: stub M1-M5 modules were built out of the
spellings the BRIEFS name — not out of any M1-M5 JSON, which does not exist here — and the real
`buildWordIndex` and `checkComprehensionPool` from `tools/content-build.ts` were run over the stubs
plus the five authored files, printing the word row every token of every pool item lands on.

**Result: 75 pool items, zero unresolved, and every hero display resolves as well.** The landings
the briefs care about:

- `auf` → `L1-M4` — M4's separable-prefix row, in M7's `auf dem Tisch` and `auf der Straße`. M7
  opens no rival; its rule 5 carries the preposition law and says the tap lands on M4's note.
- `am` → `L1-M4`; `im`, `ins`, `zum`, `zur` → `L1-M7`. Exactly where decision 6 put them.
- `nach Hause` → `L1-M5` as a two-token span; `zu Hause` → `L1-M7` likewise. Bare `nach`, bare
  `Hause` and bare `zu` are each absent from the M7 index; `zu` appears for the first time in M8.
- `zu` → `L1-M8`, in `Das ist zu teuer`. Nothing earlier competes for it.
- `es gibt` → `L1-M7` whole, claiming no part of itself; bare `es` → `L1-M10`. Both reachable.
- `sie` → `L1-M2` in every seat, including M10's `Die Tür … Sie ist neu` and
  `Die Suppe … Sie ist auch billig`, which are feminine THINGS landing on the row whose note was
  written for them.
- `der`, `die`, `das` → `L1-M1` in every seat: the feminine dative of `auf der Straße` and
  `vor der Tür`, the plural of `die Äpfel`, and the demonstrative of `Was kostet das?`.
- `dass` → `L1-M9`, `das` → `L1-M1`. Two keys, as the fold guarantees; the trap is on the sentence
  that writes both.
- `morgen` → `L1-M6`. No earlier module wrote the bare key, exactly as the briefs promised.
- `wie viel` and `wie viele` → `L1-M8`; bare `wie` stays on `L1-M2`.
- `mir` → `L1-M9` **in this simulation** — see the open questions; M2's own pattern may claim it
  first, and if it does, M9's row is the unreachable one.

`mit`, `an`, `ans`, `wer`, `du` and every `du`-register shape are absent from the index entirely.

## Verification

- `npm run content:validate` — `CONTENT 75/75 ok`. All five files pass individually, which is the
  claim this branch can actually make.
- `npm run content:build` (strict) — exit 0. en-de is still `fixture: true` in
  `content/courses.json`, so the course is dropped whole by the gate and the strict build is
  unaffected by anything here.
- `npm run content:build -- --with-unverified --with-fixtures` — **FAILS**, expected. See below.
- `vitest run src/course/types.test.ts` — 94 passed, including the new en-de decisions test and the
  widened `MODULE_FILES` inventory (75 files).
- `vitest run src/course/enDeAuthored.test.tsx` — 13 passed. This is the dev-build smoke the issue
  asks for, done by test rather than by a browser (CLAUDE.md bans Playwright and Chromium on the
  Pi): the real `<App />` booted over the AUTHORED tree, ten cards for each of the five rungs
  (M10's turns rendering whole, one card per turn), Sentence Detail on M6-S01, M7-S08, M9-S08 and
  M10-S02, and the Why panel on four pool items. It reads `content/en-de/` off disk and folds the
  index in-test, so it does NOT depend on the dev build and passes here.
- `scripts/verify.sh --fast` — `FAIL TEST (exit 30)`; `TYPES ok | LINT ok` before it,
  `Tests 9 failed | 1543 passed (1552)`.

## What is red, and why

The dev build cannot pass on this branch and was never going to. Its pool rule (PRD §6.3) requires
every comprehension token to resolve in the module's cumulative index, and these five modules sit
on top of M1-M5, which do not exist here. Running it produces **249 errors across exactly the five
files authored here**, and every one of them names one of these **43 inherited surfaces** and
nothing else:

```
am · arbeite · auf · bin · brot · buch · das · der · deutsch · die · ein · eine · einen · esse
essen · früh · gehe · gehen · gut · habe · hause · ich · ist · kaffee · keine · komme · montag
möchte · möchten · müde · nach · nicht · sie · sieben · sind · stehe · suppe · tisch · tür · uhr
um · wasser
```

`nach` and `hause` appear separately because M5's `nach Hause` span is absent, so the resolver
falls back to the bare tokens; both disappear the moment M5 lands.

The nine failing vitest cases are all in `tools/content-build.test.ts` and are all downstream of
that one dev build: `passes the three authored bundles as they ship`, `ships all seven courses'
L1-M1..M10 on a dev build too`, the three `lands hi-en on the rows the briefs assigned` cases,
`indexes hi-mr cumulatively`, `indexes the romanized course in Latin script`, `handles a
multi-token surface`, and `never claims content for a module nobody has authored`. Each of them
calls `build(DEFAULT_CONTENT_ROOT, DEV)` and then reads its output; the build now returns exit 1
before writing anything, so they fail on a missing file rather than on a wrong assertion. None of
them is about en-de and none of them was touched.

**Nothing was done to buy a green line.** `verified` stays `true` with an honest `verifiedBy`; no
module outside L1-M6 … L1-M10 was edited; `content/courses.json` was not touched. The build goes
green when M1-M5 land, and the seam simulation above is the evidence that it will.

## Open questions for a native or fluent German reviewer

These are in addition to whatever `docs/31` and `docs/32` raise for M1-M5.

1. **`Am Wochenende stehe ich spät auf` (M6-S06).** Is `am Wochenende` right for a habit, or does
   a speaker say `an Wochenenden` / `sonntags`? The sentence is also the module's only habitual
   one, sitting among nine futures, which may read oddly.
2. **`Am Freitag komme ich später` (M6-S09).** Is `später` natural here, or would a speaker say
   `Ich komme am Freitag später` with the subject fronted? The course teaches the inversion, so if
   the fronted-time version is the less usual one, the drill is teaching a stiff sentence.
3. **`Morgen möchte ich nichts machen` (M6-S07).** Is `nichts machen` the idiom, or is it
   `nichts tun`? The course has no `tun` and would need one.
4. **`Der Stuhl ist vor der Tür` and `Die Tür ist hinter dem Stuhl` (M7-S06, M7-S04).** Both are
   grammatical. Are they things a person would say, or has the vocabulary budget produced furniture
   arrangements nobody describes?
5. **`Der Stuhl ist auf der Straße` (M7-S02 variation, and pool C08 with `Das Buch`).** `auf der
   Straße` is the phrase decision 6 names, but "the book is on the street" may be odd where
   English would say "in the street". Is `auf` right for a thing lying there?
6. **`Ich gehe zur Arbeit` against `Ich gehe in den Park` against `Ich gehe ins Kino`.** The note
   claims `zu` marks a destination you head for and `in` a space you enter. Is that the real
   division, and is `zum Park` (pool C10) as natural as `in den Park`?
7. **`Ich bin im Park, nicht zu Hause` (M7-S10).** Is the contrastive `nicht` in that position
   natural, or does a speaker need `sondern`? `sondern` is not taught at this level.
8. **`Was tut das kosten?` as M8-S01's mistake plate.** It is meant as the do-support error. Is it
   the error an English speaker actually makes, or would they more likely write `Wie viel ist das?`
   — which is attested colloquially and so could not be plated as wrong?
9. **`Eine Tasse Kaffee kostet drei Euro` (pool C06) and `Zwölf Äpfel kosten dreißig Euro`
   (M8-S09).** Are those prices absurd enough to distract? The content is teaching arithmetic
   nobody checks, but a learner may notice.
10. **The final `-ig` as a soft `ch`.** Claimed in four separate notes (`zwanzig`, `dreißig`,
    `billig`, `traurig`). It is the standard-German rule and it is regionally variable — southern
    speakers say a hard `k`. Is teaching the northern form at L1 right?
11. **`zwo` for `zwei`.** Named in M8-S07's note as what is said on the telephone. Is it still
    current, or is it dated?
12. **`Ich habe Angst` as an everyday sentence (M9-S06).** The note claims it is ordinary and not
    clinical. Is it, or does it sound heavier in German than "I'm afraid" does in English?
13. **`Mir ist kalt` against `Ich bin kalt` (M9-S07).** The mistake plate says `Ich bin kalt` means
    cold-HEARTED. That is the standard teaching claim; is it actually how it lands, or would a
    German listener simply hear a foreigner?
14. **`Ich denke, dass …` (M9-S08).** Is `denken` the natural verb for an opinion, or does a
    speaker say `Ich finde, dass …`? The course teaches `denken` and never `finden`.
15. **`Ich bin glücklich, denn der Kaffee ist gut` (M9-S10).** Is `glücklich` too strong for a good
    coffee — does it want `froh` or `zufrieden`? And is `denn` natural in speech at all, or is it
    the written form the course is quietly over-teaching by giving it two heroes?
16. **`Also esse ich Brot` (M10-S04).** Is `also` at the head of a sentence natural in speech, or
    is `dann` or `deshalb` what a speaker reaches for? The course leans on `also` for its
    false-friend value, which is a pedagogical reason rather than a frequency one.
17. **`Der Tisch ist groß. Er ist auch alt.` (M10-S02).** The `auch` after the verb is the taught
    position. Is `Er ist auch alt` what a speaker says, or `Und alt ist er auch`?
18. **`Ich gehe ins Kino, wenn ich Zeit habe` (M10-S07).** `wenn` here is glossed as covering both
    "when" and "if". Is that safe at L1, or does the conditional reading need `falls`?
19. **`Weil ich immer arbeite` as a standalone answer (M10-S10).** Verb-last in a fragment is
    claimed to be ordinary spoken German. Colloquial speech also puts the verb second after `weil`
    (`weil ich arbeite immer`), which the course plates as an error. Is plating it right, or is the
    course marking real German wrong?
20. **The register, at the end of ten rungs.** Ten modules of `Sie` means a learner finishes L1
    able to speak to a landlord and unable to speak to a flatmate. The decision is defended in the
    briefs and it is worth looking at again now that the whole level is visible.

### Two questions for the BRIEFS rather than for a German speaker

21. **`in` is assigned to M7 by decision 4, and M1's pattern `Ich wohne in + place` writes it
    first.** M7 opens the row anyway, with a note written true of the residential seat as well as
    of the location and motion ones, because that is the instruction the briefs actually give. If
    M1 opened it too, M1's note is what a learner sees and M7's row is unreachable — harmless to
    the build, wrong for the reader. **This wants adjudicating when the branches merge**, and the
    fix is one note, not one row.
22. **`mir` is assigned to M9 by M9's seam note, and M2's pattern `Mir geht es gut` writes it
    first.** Identical shape, identical resolution needed. M9's note is written true of both seats
    (M2's `Mir geht es gut` and M9's `Mir ist kalt`) precisely so that whichever row wins is a row
    that tells the truth.
