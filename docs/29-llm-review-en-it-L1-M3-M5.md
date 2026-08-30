# LLM review — en-it L1-M3, L1-M4 and L1-M5

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Fable 5), which
cannot hear anything and is not a fluent-Italian editor — it wrote the Italian, the English
teaching prose and the pronunciation glosses, and then audited all three. `verified: true` on the
three modules rests on the repo owner's standing authority, exactly as `docs/28`'s two did;
`verifiedBy` says so in words: `"Claude Fable 5 — LLM review, authorised by repo owner"`,
`verifiedAt` `2026-08-30`. **No native or fluent-Italian gate exists for this course**, and the
open-questions list at the bottom is the outstanding work, on top of the sixteen `docs/28` left
open.

Nothing here reaches a learner yet: `content/courses.json` still carries `fixture: true` on the
en-it row, so a strict build skips the course entirely (#337 is the issue that flips it).

## What was authored

| | M3 Needs and wants | M4 My day | M5 Yesterday |
|---|---|---|---|
| sentences | 10 | 10 | 10 |
| new word rows | 15 of 25 allowed | 15 of 25 | 13 of 25 |
| pool items | 12 | 12 | 12 |
| tokens per sentence | 2–5 (bounds 2–6) | 3–5 (bounds 3–6) | 4–5 (bounds 4–7) |
| enrichment | full (required through M3) | full (kept, though optional) | full (kept) |
| `glossEn` | every sentence | every sentence | every sentence |
| `literal` | every sentence | every sentence | every sentence |
| variations | 3 on every sentence | 3 on every sentence | 3 on every sentence |
| cumulative index | 76 surfaces, `maxSpan` 3 | 105 surfaces, `maxSpan` 3 | 128 surfaces, `maxSpan` 3 |

Written strictly in ladder order, rebuilding the index between modules, so each was planned
against the real cumulative inventory of the one before it. `content/en-it/levels.json` now shows
all five authored rungs `hasContent: true` with no `draft` flag.

## The briefs' decisions, as shipped in these three

- **Negation.** `non` is M3's row and its note is written about the POSITION rather than about
  `volere`, because it has to survive every later negative — M4's `Il sabato non lavoro`, M5's
  `Non ho studiato ieri`, M9's `non mangio perché…`. M5's rule 4 restates it for the two-word verb:
  `non` wraps the whole thing, helper included, and never slips between `ho` and its participle.
- **The plural is a vowel change.** M3 rule 3 states it as `-o → -i`, `-a → -e`, `-e → -i whatever
  the gender`, with the counter-examples already on the page from M1 (`libro · libri`,
  `canzone · canzoni`) and two new ones here (`pizza · pizze`, `zaino · zaini`). Every plural in
  the course lives in its noun's OWN row's `forms`; there is not a second row anywhere for a
  plural shape.
- **Elision.** The one apostrophe surface these three add is `un po' di` (M3-S09), claimed WHOLE as
  a three-token surface. `src/course/types.test.ts` now walks the displays the way the resolver
  does — longest surface first — so it proves the point rather than merely asserting it: the `po'`
  inside `un po' di` is answered by the phrase and needs no key of its own, and an apostrophe token
  that resolved to nothing would fail the test by name. (It did, on the first run, before the walk
  was made longest-match; the fix was to the test, not to the content.) No preposition+article
  elision is written anywhere: `un po' di pane`, not `un po' d'acqua`.
- **Participles.** Each gets its OWN row in M5, because participle formation is what M5 teaches,
  and the three class endings are drilled one sentence each — `mangiato`/`comprato`/`parlato`/
  `studiato`/`lavorato` (-ato), `bevuto` (-uto), `dormito` (-ito). The essere participles carry
  their agreement in `forms`: `andato · andata · andati · andate`, `stato · stata · stati · state`.
- **`ho` is M5's, and its note defines both jobs.** The row is opened as the helper of the passato
  prossimo, and its note names the plain "I have" and M9's `ho fame` in the same breath — because
  first occurrence wins and M9 can never reach the key.
- **`sono` stays M1's.** M5 opens no second `sono` row: the `sono` of `sono andato` resolves back
  to M1's `essere` row, whose note was written in #334 to cover exactly this seat, and the
  `avere`/`essere` split lives in M5's rule text and in the `andato` row instead. The index
  confirms it — `sono` in M5-C04, C07 and C12 all land on `L1-M1-S02`.

### One deviation from the briefs, and why

**M5 owns bare `a`, not M6.** The brief assigned `a` to M6 (`vado a Roma`), but the brief's own M5
pattern is `Ieri + sono + andato/andata + a + place`, and M5 comes first — so the ladder writes `a`
one module earlier than the brief anticipated. Rather than bend the content (the alternatives were
a preposition+article contraction `al`, which is M7's, or a destination-free past, which loses the
module's second pattern), M5's `a` row carries a note written true of BOTH seats: the destination
here, and the `a` that stands between `andare` and an infinitive in M6 (`vado a mangiare`). M6 will
open no second `a` row. The brief's text is left as it stands; this note is the record.

**`lo` is deferred.** The brief named `lo` as M3's masculine-article row. M3 teaches `uno` (the
indefinite twin, S03 `Voglio uno zaino`) and explains `lo`/`gli` in the `uno` and `zaino` notes,
but no L1 sentence has room for a bare `lo` and no L1 job needs one — so `lo` is not an index row,
and no display in the course writes it. If a later module needs it, the key is free.

## Every example checked against the rule beside it

| example | the rule it demonstrates | holds |
|---|---|---|
| `Voglio mangiare` (M3 rule 0) | `volere` + bare infinitive, no word for "to" | yes |
| `*Voglio di mangiare`, `*Voglio a bere` (M3-S05, S06 plates) | the same rule, from the wrong side | yes — both are the English "to" looking for a home |
| `vado a mangiare` (M3 rule 0, parenthesis) | the rule is about `volere`, not about Italian verbs generally | yes — `andare` really does take `a`, which is why the rule names its verb |
| `Non voglio il caffè` (M3 rule 1) | one word, in front of the verb | yes |
| `un caffè · uno zaino · una pizza · un'amica` (M3 rule 2) | the article picks its shape from the following sound | yes — and `uno studente` in the same note is the s+consonant case |
| `libro → libri`, `pizza → pizze`, `studente → studenti` (M3 rule 3) | the plural is a vowel change | yes, one per ending class |
| `una casa grande`, `un libro italiano` (M3 rule 4) | the adjective follows and agrees | yes — and the `granda` plate is the -e class, which agrees in number only |
| `mangio` = "I eat" and "I am eating" (M4 rule 0) | one present for both English presents | yes |
| `parlo · parli · parla`; `bevo · bevi · beve`; `dormo · dormi · dorme` (M4 rule 1) | one stem plus an ending, all three classes | yes |
| `mi alzo · ti alzi · si alza` (M4 rule 2) | the pronoun is part of the verb | yes |
| `il lunedì` = "on Mondays" (M4 rule 4) | the article makes the habit | yes — and the plate `Lunedì lavoro ogni giorno` is the contradiction made concrete |
| `alle sette` = a + le (M4 rule 5) | the preposition fuses with the article | yes |
| `parlo italiano` vs `studio l'italiano` (M4-S04 trap) | it is a difference between the VERBS, not a rule about languages | yes — stated as a pair to learn, not as a law |
| `ho mangiato`, `ho bevuto`, `ho parlato` (M5 rule 1) | most verbs take `avere` | yes |
| `sono andato`, `sono stata` (M5 rule 1) | the short `essere` list | yes |
| `ho camminato` (M5 rule 1) | why "verbs of motion take essere" is a slogan and not the law | yes — `camminare` is motion and takes `avere`, which is the whole point |
| `sono andato` / `sono andata` / `sono andati` vs `ho mangiato` (M5 rule 2) | agreement on one helper, none on the other | yes — and M5-S08's plate `ho parlata` is the error that rule prevents |
| `parlare → parlato`, `bere → bevuto`, `dormire → dormito` (M5 rule 3) | the class decides the ending | yes, and each has its own sentence |
| `Non ho studiato`, never `Ho non studiato` (M5 rule 4) | `non` wraps the whole verb | yes |
| `ho mangiato` = "I ate" AND "I have eaten" (M5 rule 5) | one tense for both English pasts | yes |

**One thing deliberately NOT claimed.** M3-S01's mistake plate is `Voglio uno caffè` (wrong: `uno`
only before s+consonant or z), not `Sono uno studente`. The course nowhere asserts that
`Sono uno studente` is ungrammatical, because it is not — it is the marked version of
`Sono studente`, and `docs/28` open question 2 leaves that to a native.

## Index landings — every pool token, and the row it opens

Read out of the emitted `public/content/en-it/index/L1-M*.json` after a dev build. All 36 items
across the three modules resolve, and every one lands on the intended row. The landings that
matter, because they are the ones a wrong `forms` list would break:

- **M3** — `vuoi` → M3's `Voglio` row (C12); `pizze` → M3's `pizza` row, not a second plural row
  (C10); `un po' di` taken whole as one three-token surface (C09); `l'italiano` → M1's row (C06);
  `buone` → M1's `buono` row (C10); `la` → M1's article row and never an object pronoun (C02).
- **M4** — `mangi` → M4's `mangio` row (C04); `si alza` and `ti alzi` → M4's `Mi alzo` chunk (C07,
  C12); `lavora` and `lavorare` → M4's `lavoro` row (C08, C10); `di mattina`, `di sera`,
  `il sabato`, `il lunedì`, `a che ora`, `alle sette` and `ogni giorno` all taken whole, so the
  bare `di`, `il`, `a` and `le` inside them are never touched (C02–C12).
- **M5** — `hai` and `ha` → M5's `ho` row (C03, C08, C10); `andata` and `andati` → M5's `andato`
  row (C04, C12); `stato` → M5's `stata` row (C07); `sono` → **M1's** row in C04, C07 and C12,
  which is the seam the briefs planned and M1's note was written for; `a` → M5's own row (C04, C07,
  C12).

Every `forms` list in these three modules holds other shapes of the SAME word only — the hi-mr
failure of `docs/07-llm-review-L1-M6-M10.md`. The two that were checked hardest, because they are
the ones that could plausibly swallow a cousin: `Voglio` holds `vuoi · vuole` and NOT `vorrei`
(which is its own row, since it is the module's politeness lesson and needs its own note); and
`Mi alzo` holds `ti alzi · si alza` and nothing of `alzare` used non-reflexively, which L1 never
writes.

## Smoke — by test, never a browser

`src/course/enItAuthored.test.tsx` derives its module list from the files on disk, so the three new
rungs were walked the moment they landed: each module's list renders its ten sentences as ten
cards, and each module's `S01` renders with an Italian hero under `lang="it"`, an English gloss
paragraph present, and the document still `lang="en"`.

## Open questions for a native or fluent Italian reader

Numbering continues from `docs/28`'s sixteen.

### Naturalness and idiom — the ones I am least sure of

17. **`Voglio uno zaino`** (M3-S03). Chosen because `uno` needs a masculine noun starting with `z`
    or `s`+consonant and the alternatives (`uno studente`, `uno spazzolino`) are worse sentences.
    Is wanting a backpack a natural thing to say, or is there a better `uno` noun a beginner meets?
18. **`Voglio un po' di pane`** (M3-S09) rather than `un po' d'acqua`. The elision policy keeps
    `d'` out of L1, and `di pane` needs no elision — but is `un po' di pane` what someone actually
    says at a table, or would it be `un po' di pane, per favore` (M8's phrase) or simply `del pane`?
    The partitive `del` is deliberately not taught.
19. **`Voglio una casa grande`** (M3-S10). The mistake plate is `granda`, which is unambiguously
    wrong. But `una grande casa` is also correct Italian with a different nuance, and the module
    does not say so — deliberately, to keep the rule clean. Is that silence acceptable at L1?
20. **`Di mattina` and `di sera`** (M4-S03, S04) rather than `la mattina` / `la sera`. Both exist;
    `di` was chosen because it is unambiguously habitual and because it keeps a definite article
    out of the phrase. Is `di mattina` the one a Roman would say, or is it regional or bookish?
21. **`Il lunedì lavoro`** (M4-S05) with the time phrase in front and nothing after the verb. Does
    a two-word sentence like this read as natural Italian, or does it want an object?
22. **`Di sera bevo un caffè`** (M4-S08). An Italian drinking coffee in the evening is a real
    cultural question, not just a grammatical one. Is this sentence odd enough to distract?
23. **`Che cosa hai mangiato ieri?`** (M5-S07) with `che cosa` written in full. The note says `che`
    and `cosa` are each usable alone. Is the full form the natural neutral one, or is `cosa hai
    mangiato?` what people actually say?
24. **`Ieri sono stata a casa`** (M5-S06). Is `sono stata a casa` the natural way to say "I stayed
    in", or would `sono rimasta a casa` be the sentence?
25. **`Ieri ho dormito bene`** (M5-S10) versus `ho dormito bene stanotte`. Does `ieri` sit right on
    a sleeping verb?

### Grammar claims I would most like checked

26. **M4-S04's trap: `parlo italiano` drops the article and `studio l'italiano` keeps it.** I
    believe both are right and that the difference is lexical rather than a rule about languages.
    If `studio italiano` is equally normal, the trap and the mistake plate both need rewriting.
27. **M5's essere list as stated: "going, coming, staying, being, becoming, and every reflexive".**
    That is the teachable core, and it is incomplete (`nascere`, `morire`, `piacere` itself, the
    verbs of change). The rule says it is a LIST to learn rather than a category — is the short
    list honest at this level, or does it mislead by omission?
28. **`camminare` takes `avere`** (M5 rule 1), used as the counter-example that kills the "verbs of
    motion" slogan. Correct, but is it the clearest counter-example for a beginner, or would
    `viaggiare` / `nuotare` land better?
29. **M4-S10's mistake plate distinguishes `parlo con Anna` from `parlo ad Anna`**, calling the
    second "narrower". Is that an honest characterisation, or is `parlare a qualcuno` simply the
    ordinary "speak to someone" and the plate therefore wrong?
30. **`Vorrebbe una pizza`** as M3-S08's mistake plate — the `Lei` form, offered as the error a
    learner makes by over-politeness. Is that a realistic learner error, or is the plate teaching
    a form it means to withhold?

### Sound notes — nothing here can be heard by the author

31. New pronunciation claims in these three, all derived from descriptions rather than from
    listening: `VO-lyo` for `voglio` (the `gli` as one sound); `PIT-tsa` and `DZAI-no` (initial
    `z` as `dz`); `vor-REY` with a longer trill on the double `r`; `un po' di` as `oon-po-DEE`;
    `CA-za` with the note that the single intervocalic `s` is `z` in the north and `s` in Tuscany;
    `mya-` running `mi alzo` together; `AL-tso`; `alle sette` with both doubles held and the
    warning that a single one gives `ale` and `sete`; `MAN-jo`; `STU-dyo`; `lu-ne-DEE`;
    `a-ke-O-ra` with `che` as `KE`; `PRE-sto`; `BE-vo`; `SA-ba-to`; `YEH-ri` as two syllables;
    the silent `h` of `ho`; `be-VU-to`; `kom-PRA-to`; `la-vo-RA-to`; `an-DA-to`; `STA-ta`;
    `ke-KO-za`; `par-LA-to`; `stu-DYA-to`; `dor-MI-to`. **The two riskiest are the intervocalic
    `s` claim** (a real regional split, stated as such) **and the `dz` of `zaino`**, which varies
    by word and by region.

### Pedagogy calls the owner decides

32. **M5 owns bare `a` rather than M6** (see the deviation above). The note covers both seats; a
    reader should say whether it reads as one true note or as two notes stapled together.
33. **`lo` is not taught as a row.** Acceptable for an L1 that never writes it, or a hole?
34. **M4–M5 keep FULL enrichment** although the validator only requires it through M3. It costs
    payload and it is what every other course in the repo does. Keep, or trim `mnemonic` and
    `sound` from M4 onwards to buy budget?
35. **M3's `vorrei` is taught as a whole word, with the conditional named but not opened.** Right
    for L1, or does a learner need to know it is a tense before using it?
36. **Every sentence in these three is `informal` except M3-S08 (`Vorrei una pizza`), which is
    `neutral`.** Is that the honest split, given that the whole level speaks `tu`?
