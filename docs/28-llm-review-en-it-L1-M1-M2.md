# LLM review — en-it L1-M1 and L1-M2

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Fable 5), which
cannot hear anything and is not a fluent-Italian editor — it wrote the Italian, the English
teaching prose and the pronunciation glosses, and then audited all three. `verified: true` on both
modules rests on the repo owner's standing authority, exactly as hi-mr's (PR #190), en-es's
(#192–#194), en-ar's (#199–#201) and hi-en's (#270–#272) flips did; `verifiedBy` says so in words:
`"Claude Fable 5 — LLM review, authorised by repo owner"`, `verifiedAt` `2026-08-30`. **No native
or fluent-Italian gate exists for this course**, and the open-questions list at the bottom is the
outstanding work.

Nothing here reaches a learner yet: `content/courses.json` still carries `fixture: true` on the
en-it row, so a strict build skips the course entirely (#337 is the issue that flips it). A dev
build (`--with-unverified --with-fixtures`) ships both rungs.

## What was authored

| | L1-M1 Who I am | L1-M2 First exchange |
|---|---|---|
| sentences | 10 | 10 |
| new word rows | 21 of 25 allowed | 14 of 25 allowed |
| pool items | 12 | 12 |
| tokens per sentence | 2–4 (bounds 2–5) | 2–4 (bounds 2–5) |
| enrichment | full (all five blocks, every sentence) | full |
| `glossEn` | every sentence | every sentence |
| `literal` | 9 of 10 (S10 is word-for-word already) | 7 of 10 |
| variations | 3 on every sentence | 3 on every sentence |
| prerequisites | `[]` | `["L1-M1"]` |
| cumulative index | 37 surfaces, `maxSpan` 2 | 55 surfaces, `maxSpan` 2 |

There was no fixture to replace: `content/en-it/modules/` did not exist before this issue. The two
modules were written strictly in ladder order against `tools/course-briefs.ts` (#333), rebuilding
the index between them, so M2 was authored against M1's real cumulative inventory (37 surfaces).
`content/en-it/levels.json` now carries `hasContent: true` and no `draft` flag on both rungs.

The two standards that had to be retrofitted onto the older courses are baked in from the first
module: **three variations on every sentence** (#288's bar, no exemptions taken) and
**twelve comprehension items per module** (#292's bar, twice the validator's floor of six).

## The briefs' five decisions, as shipped

1. **Register — `tu` course-wide, `Lei` in no display string.** Both modules are `tu` throughout:
   `come stai?` (M2-S03), `sei` (M2-S05, M2-S08), `ti chiami` and `ti piace` in the variations.
   `Lei` appears in exactly two places, both of them prose about it rather than a line to copy:
   M2's rule 5, and M2-S02's mistake plate, which shows `Buongiorno, come sta?` as the polite
   address this course does not teach. M1-S01's `usage` says the same thing in the first sentence
   the learner reads. The `informal` chip is used on the seven `tu` sentences of M2 and on none of
   M1's, which have no second person in them.
2. **Elision.** One apostrophe surface ships in these two modules: `l'italiano` (M1-S09), and it is
   a `forms` entry on the noun's own row (`italiano · l'italiano · italiana`), per the policy —
   not a row of its own, and not a second row for `italiano`. `src/course/types.test.ts` now checks
   this mechanically: every apostrophe token any en-it display writes must be a taught surface at
   or before its module, because `src/engine/surface.ts` keeps an inner apostrophe inside one token
   and grants it no parts. No preposition+article elision (`dell'`, `all'`, `nell'`) is written.
   Every apostrophe in the tree is the straight one.
3. **Accents.** `è` (M1-S10) and `e` are two rows in two different modules, and M1-S10 spends its
   whole trap, its mistake plate and its sound line on the pair; M10 will cash the other half.
   `sì` (M2-S06) carries its accent everywhere and its own mistake plate is the unaccented `Si,
   sono di Roma`; `no` is bare, and M2-S07's mistake plate is the invented `Nò` — the same lesson
   from the other side. `caffè` keeps its accent everywhere it appears.
4. **Multi-token surfaces.** `Mi chiamo`, `Mi piace` and `Mi piacciono` are single rows spanning two
   tokens, with the person-shifted shapes in `forms` (`ti chiami · si chiama`;
   `ti piace · gli piace`; `ti piacciono · gli piacciono`). The index confirms the point of them:
   there is no `mi` key anywhere in the course, so no later module has to own one, and the Why
   panel over `Mi piace molto la musica` returns four rows and not five (`enItAuthored.test.tsx`).
5. **Homographs.** `sono` is ONE row (M1-S02) and its note is written true of every seat it takes:
   "I am", the `loro` form "they are", and the helper of M5's `sono andato`. Its "they are" seat is
   already exercised in M1-S10's third variation (`I libri sono buoni`). `la` is the feminine
   article row and no object pronoun is written. `di` is M1's, with a note true of both the origin
   "from" and the "of" M8's `un chilo di riso` will inherit.

## The slogan traps, and what was written instead

The briefs name the memorable-and-false rule each module attracts (`course-briefs.ts` rule 2).
What shipped:

- **"-o is masculine, -a is feminine"** → M1 rule 5 states gender as a property of the noun learned
  with its article, and names the counter-examples in the rule itself: `il problema` ends in `-a`
  and is masculine, `la mano` ends in `-o` and is feminine. M1-S06's `la` note repeats both.
- **"piace means like"** → M1 rule 6 states the agreement law: the thing liked is the SUBJECT, so
  the verb agrees with IT — `Mi piace il caffè` against `Mi piacciono i libri` — and `mi` only names
  who is pleased. Four of the ten sentences drill the number contrast, and the mistake plates on
  S05 and S07 are the two halves of it.
- **"you must write the subject pronoun"** → M1 rule 1 states pro-drop as the ending naming the
  person, with `io` and `tu` marked rather than wrong. The mistake plates on M1-S02, M2-S05 and
  M2-S09 are `Io sono indiano`, `Tu sei di Roma?` and `Io sono stanca oggi`.
- **"a question needs inversion or do-support"** → M2 rule 0 states that nothing moves and the
  question mark writes the rising voice; M2-S05's second variation is the same four words as a
  statement, and its trap names `*Fai sei di Roma?` as the auxiliary Italian has no use for.
- **"the accent on sì is emphasis"** → M2 rule 4 says it is a letter, and names the word it would
  otherwise merge with (`si chiama`).
- **"tired is tired"** → M2 rule 2 states adjective agreement as following the SUBJECT, not the
  speaker. This is the defect the third Marathi review had to correct three times
  (`docs/08-marathi-third-review.md`), so the wording was checked in all four places it appears:
  rule 2, M2-S08's note and trap, M2-S09's trap, and M2-S08's mistake plate — which is a woman
  being asked `Anna, sei stanco?`, i.e. the subject-not-speaker error made concrete.

## Every example checked against the rule beside it

The header's rule 1, applied one line at a time. Each claim below is "this example demonstrates
this rule", and each was re-read against the rule's own words:

| example | the rule it demonstrates | holds |
|---|---|---|
| `Sono di Roma`, not `Io sono di Roma` (M1 rule 1) | pro-drop: the ending names the person | yes — `sono` is unambiguously 1sg here |
| `Io sono indiano, lei è italiana` (M1 rule 1) | `io` returns to contrast | yes — two subjects opposed in one line |
| `mi chiamo · ti chiami · si chiama` (M1 rule 2) | the pronoun says whose name it is | yes — one verb, three persons |
| `sono (I) · sei (you) · è (he, she, it)` (M1 rule 3) | the ending names the person | yes |
| `Sono studente`, never `Sono un studente` (M1 rule 4) | a bare role after `essere` | yes — and `un` before `st-` is independently wrong, which the mistake plate says |
| `Sono un bravo studente` (M1 rule 4) | the article returns when something describes the noun | yes — `bravo` was chosen over `buono` deliberately: `buono` before `s`+consonant is `buono studente`, not `buon studente`, and the rule is not about that |
| `il problema` (m), `la mano` (f) (M1 rule 5) | the ending is a hint, not a rule | yes |
| `Mi piace il caffè` / `Mi piacciono i libri` (M1 rule 6) | the verb agrees with the thing liked | yes |
| `Mi piace il caffè` = "I like coffee" (M1 rule 7) | Italian keeps the article English drops | yes |
| `è` vs `e` (M1 rule 8) | the accent is a letter | yes |
| `libro → libri`, `canzone → canzoni` (M1-S07, S08 notes) | the plural is a vowel change | yes — and `canzoni` shows an `-e` noun going to `-i`, so the note says the ending cannot tell you the gender |
| `stanchi`, `amiche` (M2-S08 note) | the `h` keeps `c` hard | yes |
| `Sei di Roma?` beside `Sei di Roma` (M2 rule 0) | the question is the statement | yes |
| `Come stai?` · `Sto bene` (M2 rule 1) | wellbeing takes `stare` | yes |
| `sono stanco` · `sono stanca` · `sei stanca?` (M2 rule 2) | the adjective follows the subject | yes — the third is the one that makes "subject, not speaker" concrete |
| `sì` vs `si chiama` (M2 rule 4) | the accent is a letter | yes |
| `sei, stai, ti chiami` (M2 rule 5) | every `tu` verb ends in `-i` | yes |

**One correction applied during the pass.** M2-S04's mistake plate first read
`Sto buono → "buono describes a thing"`, which is not the whole truth: `stare` + `buono` is a real
Italian construction meaning "behave yourself" (`stai buono!`). The plate and S04's trap were both
rewritten to say that instead — the sentence is not gibberish, it just does not mean what an
English speaker reaching for "I'm good" intends. A second draft of M1-S02 said `Sono di India`;
that was replaced (see open question 1) and survives only as M1-S03's mistake plate.

## Index landings — every pool token, and the row it opens

Read out of the emitted `public/content/en-it/index/L1-M*.json` after
`npm run content:build -- --with-unverified --with-fixtures`. All 24 items resolve, and every one
of them resolves to the row it should:

**L1-M1** (37 surfaces, `maxSpan` 2) — `Si chiama Rohan` → `si chiama` (the M1 chunk row) + `Rohan`;
`Sono studentessa` → `Sono` + `studente`'s row via its `forms`; `Ti piace il caffè` → `mi piace`'s
row + `il` + `caffè`; `Mi piace il libro` → the chunk + `il` + `libri`'s row; `Gli piacciono i
libri` → `mi piacciono`'s row + `i` + `libri`; `La musica è buona` → `la` + `musica` + `è` +
`buono`'s row; `Mi piace molto la musica`; `Ti piacciono le canzoni` → the plural chunk + `le` +
`canzoni`; `Rohan è di Delhi`; `Il caffè italiano è buono` → `italiano` lands on the `l'italiano`
row, which is where the adjective's note lives; `Mi piace l'italiano` → the elided surface lands on
that same row; `La studentessa è indiana` → `indiana` on `indiano`'s row.

**L1-M2** (55 surfaces) — every token of all twelve items lands on the intended row, with the
cross-module ones the point of the check: `molto`, `di`, `delhi`, `sono`, `studente`, `il`, `caffè`,
`è` and `buono` all come from M1, and `ciao`, `buongiorno`, `come`, `stai`, `sto`, `bene`, `grazie`,
`sei`, `roma`, `sì`, `no`, `stanco`, `stanca`, `oggi` and `arrivederci` from M2. Nothing is
unresolved and nothing has been swallowed by a neighbouring row's `forms` — the hi-mr failure of
`docs/07-llm-review-L1-M6-M10.md`. Every `forms` list here holds other shapes of the same word only:
`indiano · indiana`; `libro · libri`; `canzone · canzoni`; `studente · studentessa · studenti`;
`italiano · l'italiano · italiana`; `buono · buona · buoni · buone`; `stanco · stanca · stanchi ·
stanche`; `sto · stai`; and the three `piacere` / `chiamarsi` chunks, which hold person-shifted
shapes of one verb.

**One homograph found during the pass, and handled in the note rather than by a second row.**
`sei` is both `essere` for `tu` and the number six, and M2 owns the key for the whole course, so
M8's counting module can never reach it. M2-S05's note now names both jobs. This is recorded as an
open question below, because it constrains M8.

## Smoke — by test, never a browser

`src/course/enItAuthored.test.tsx` boots the real `<App />` over the authored tree
(`content/en-it/`) with an index folded in-test by the engine's own surface rule, and walks: the
Ladder (ten rungs, M1 current, one CTA, English chrome, `lang="en"`); each authored module's list
(ten cards, hrefs in ladder order); Sentence Detail for every authored `S01` (Italian hero under
`lang="it"`, the English gloss paragraph PRESENT — the half of #268 that applies to every course
whose L2 is not English); and the Why panel over three pool items, which is where the index
decisions become visible to a learner.

## Open questions for a native or fluent Italian reader

Nothing below is a defect anyone has demonstrated; each is a place where an LLM's confidence is not
worth a native's five seconds.

### Naturalness and idiom — the ones I am least sure of

1. **`Sono di Delhi` / `Sono di Roma` for origin, and the claim that a COUNTRY does not sit there.**
   The briefs settle this (`Sono di + city`, and `Sono indiano` or `Vengo dall'India` for a country)
   and M1-S03's trap and mistake plate both assert it. I believe `*Sono di India` is not idiomatic
   and that `Sono dell'India` is at best marked, but this is a judgement about usage, not grammar,
   and it is the single claim in these two modules I would most like checked. If it is wrong, the
   fix is small: M1-S03's trap and mistake plate, and one line of the brief.
2. **`Sono studente` with no article.** Standard for professions and roles, but is it what a
   twenty-year-old actually says, or would `Faccio lo studente` / `Studio …` be the natural line?
   The mistake plate's `Sono un studente` is independently wrong (`uno` before `st-`), so it stands
   either way — but the claim that `Sono uno studente` is merely marked rather than wrong is not
   asserted anywhere, deliberately.
3. **`Mi piacciono le canzoni`.** Chosen over `i film` so that a feminine `-e → -i` plural gets
   taught. Is "I like songs" a natural thing for an Italian to say in the abstract, or does it want
   a qualifier (`le canzoni italiane`)?
4. **`Sto molto bene`** (M2-S04 variation, M2-C04). Natural, or does an Italian say `benissimo`?
5. **`buongiorno` covering "the morning and the early part of the afternoon"** (M2-S02 note and
   trap). Where does the change to `buonasera` actually fall in practice, and is the claim that
   `buongiorno` "works with anyone" safe in every region?
6. **`arrivederci` as the neutral goodbye** (M2-S10). The note says it works with anyone, and the
   genuinely formal `arrivederLa` is deliberately not taught. Is `arrivederci` right for the shop
   counter this course keeps sending the learner to?
7. **`No, grazie`** (M2-S07 variation) as a refusal — is the bare pair enough, or does it want
   `No, grazie mille` / `No, va bene così` to sound like a person?

### Register — the tu-only decision

8. **The whole of L1 speaks `tu`** (`tools/course-briefs.ts`, "en-it: the five decisions", 1). The
   reasoning is written down there; what a native should judge is whether the resulting course
   leaves a traveller stranded at exactly the moments it sends them out — a shop, a station, a
   hotel — and whether M8's plan (politeness carried by `per favore` and `vorrei`, no `Lei` form in
   any display) really holds up at a counter.
9. **The `informal` chip on M2's seven `tu` sentences and `neutral` on `buongiorno`,
   `arrivederci`, `Sì` and `No`.** Is that split honest, or is a `ciao`-and-`come stai` exchange
   `informal` end to end including its yes and its no?

### Sound notes — nothing here can be heard by the author

10. Every `sound` line in both modules is derived from descriptions, not from listening: `chiamo` =
    KYAH-mo (the hard `ch`); `caffè` = ka-FEH with an audibly held `ff`; `musica` = MU-si-ca with
    the stress three back; `libri` with a single tapped `r`; `canzoni` = kan-TSO-ni; `l'italiano` =
    li-ta-LYA-no; `ciao` = CHOW as one syllable; `buongiorno` = bwon-JOR-no; `grazie` = GRAH-tsye;
    `stai` as one syllable near English "sty"; `oggi` = OD-ji with a held `gg`; `arrivederci` =
    ar-ri-ve-DER-chi with a longer trill on the double `r`; `buono` = BWO-no. **The riskiest single
    claim is M1-S10's**, that `è` is open (like "bed") and plain `e` is closer — true of the
    standard, and the thing regional Italian varies most. A native ear should sample all of these,
    and that one first.

### Pedagogy calls the owner decides

11. **`gli piace` rather than `le piace` in the `piacere` rows' `forms`.** Only one third-person
    shape is taught, so the learner meets "he likes" and not "she likes". `le piace` was left out
    because `le` is also the feminine plural article taught in the same module, and a two-token
    `le piace` surface would sit on top of it. Is teaching only `gli piace` a distortion worth the
    clean index, or should M2 or a later module open `le piace` deliberately?
12. **`sei` is `essere` and the number six, and M2 owns the key.** M2-S05's note names both. This
    constrains M8: writing `sei euro` there will send a tap to M2's copula row, whose note now
    covers it — but a native should say whether the note reads as honest or as a dodge, and whether
    M8 should simply avoid the numeral.
13. **`Rohan` and `Anna` as the two people, with `Delhi` and `Roma` as the two cities.** Carried
    over from en-es's cast so the four English-L1 courses stay recognisable. Right for an Italian
    course, or does it want Italian names throughout?
14. **`i` as a one-letter word row.** The masculine plural article is a single character, which is
    a legitimate index key but an odd-looking card. No alternative exists — it is the word — but it
    is worth a look on a real screen.
15. **M1 has no `interference` word row that is not a `piacere` chunk**, and M2 has exactly one
    (`bene`). Is that the honest weighting of where English misleads an Italian beginner, or does
    the article (`Mi piace il caffè`) deserve an interference row of its own rather than living in
    rule 7?
16. **`molto` taught in M1 rather than held for M2's `Sto molto bene`.** It buys M1 its tenth
    sentence and a fourth `piacere` frame; it also spends a word row early. Fine, or better spent?
