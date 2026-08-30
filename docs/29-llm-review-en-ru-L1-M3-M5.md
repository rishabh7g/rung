# LLM review — en-ru L1-M3, L1-M4 and L1-M5

**This is an LLM review, not a native pass.** Same bar and same author as
`docs/28-llm-review-en-ru-L1-M1-M2.md`: Claude (Fable 5) wrote the Russian, the English teaching
prose and the pronunciation glosses, and then audited all three. `verified: true` rests on the repo
owner's standing authority; `verifiedBy` says so in words — `"Claude Fable 5 — LLM review,
authorised by repo owner"`, `verifiedAt` `2026-08-30`. **No native or fluent-Russian gate exists for
this course.** These three rungs carry the level's hardest grammar — the first case ending, two
conjugation patterns, and a past tense that agrees with gender rather than person while aspect
picks the verb — so the confidence here is lower than on M1–M2, and the open questions at the
bottom are correspondingly longer.

Nothing here reaches a learner yet: `content/courses.json` still carries `fixture: true` on the
en-ru row (#343 is the issue that flips it).

## What was authored

|                     | L1-M3 Needs and wants | L1-M4 My day        | L1-M5 Yesterday     |
| ------------------- | --------------------- | ------------------- | ------------------- |
| sentences           | 10                    | 10                  | 10                  |
| new word rows       | 11 of 25 allowed      | 15 of 25 allowed    | 12 of 25 allowed    |
| pool items          | 12                    | 12                  | 12                  |
| variations          | 3 on every sentence   | 3 on every sentence | 3 on every sentence |
| tokens per sentence | 3–4 (bounds 3–6)      | 3–5 (bounds 3–6)    | 3–4 (bounds 3–7)    |
| enrichment          | full (required at M3) | full (by choice)    | full (by choice)    |
| `literal`           | every sentence        | every sentence      | every sentence      |
| `glossEn`           | every sentence        | every sentence      | every sentence      |
| cumulative index    | 65 surfaces           | 90 surfaces         | 115 surfaces        |

`maxSpan` stays 2 through M5 — `Меня зовут`, `Как дела`, `Доброе утро`, `До свидания` and
`каждый день` are the only multi-token surfaces so far. The three-token `у меня есть` arrives in
M8. Enrichment is only required through M3 (`ENRICHMENT_FULL_THROUGH_MODULE`); M4 and M5 ship it
anyway, because a module about aspect is not the place to drop the `usage` line.

## The briefs' decisions, as shipped on these three rungs

**M3 — the first case ending, and the honest version of it.** `вода → воду`, `книга → книгу`,
`музыка → музыку`, each pair in ONE row's `forms` with a note true of both shapes. The module's
second rule is the one the briefs insisted on: the object does NOT always change — `чай`, `хлеб`,
`сок` and `молоко` sit unmoved, `кофе` never declines at all — which is what makes M1's untouched
objects make sense in retrospect. `не` gets its row here, with a note written to survive M5's past
and M6's future rather than being about wanting. `хочу` is tagged `interference` and its
irregularity is stated rather than smoothed over.

**M4 — two conjugation patterns, and the ё policy's first bite.** Pattern I (`работаю ·
работаете`, `читаю · читаете`) against pattern II (`говорю · говорите`, `сплю · спите`), with the
rule saying plainly that the pattern is a property of the verb and nothing in the meaning predicts
it. `пью · пьёте` and `встаю · встаёте` are the first `ё` words in the course, and rule 2 states
the course-wide policy on the page where a learner first meets it: this course always writes the
dots, most Russian printing does not. The four time-of-day words ship as frozen single words with
the honest note that they are leftovers of a case this level does not teach — the instrumental is
named nowhere and declined nowhere. `в` is claimed here in its clock seat, and its note is written
true of M7's place seat too, because M7's own row would be unreachable.

**M5 — gender, not person; and aspect, named and decided.** The four endings `-л · -ла · -ло ·
-ли` are the module, and every rule says SUBJECT rather than "speaker" — the imprecision the third
Marathi review had to correct three times. `вы` takes `-ли` even for one man, which is M2's rule
running in a new tense. `быть` opens its one row with `был · была · было · были` and the note
tells the whole story at once: nothing in the present, a real word behind you, a real word ahead
(M6 extends this same row with `буду`). Aspect is decided rather than dodged: yesterday's
sentences are single finished events and take the perfective (`купил`, `выпил`, `прочитал`,
`пошёл`), the imperfective past is DEFERRED and named as deferred in rule 3 and in two `mistake`
plates, and every aspect pair is two word rows and not two forms. `пошёл · пошла` is the course's
flagship `ё` pair, and S04's note points out what the dots also tell you: `ё` is always the
stressed vowel, so when the stress moves the `ё` goes with it.

**One case seat deliberately never opened.** Direction — `в` + accusative for "into" — is written
around throughout, with the adverbs `дома` (M5-S01) and `домой` (M5-S04). That keeps the `в` row
answering for exactly two jobs, as the briefs planned, and it is why M5 says `Вчера я пошёл домой`
rather than `в магазин`.

## What was checked, mechanically

- `npm run content:validate` — `CONTENT 45/45 ok`, all five en-ru files clean.
- `npm run content:build -- --with-unverified --with-fixtures` — `en-ru: 5 modules (L1-M1..M5)`,
  indexes of 65 / 90 / 115 surfaces, no pool warnings, no errors.
- **Every token of every sentence AND every pool item swept through the emitted cumulative index,
  with the WORD ROW each one lands on read back.** Thirty sentences and thirty-six pool items
  across the three rungs, zero unresolved tokens, and every landing checked against the row it
  should be. The ones that could have gone wrong:

  | token in a pool item | lands on | correct? |
  | --- | --- | --- |
  | `воду` (M3-C01) | M3-S02 `вода` = water | yes — the case shape on the word's one row |
  | `книгу` (M3-C02) | M3-S03 `книга` = book | yes |
  | `хочет` (M3-C04, C05, C08) | M3-S01 `хочу` = I want | yes — one irregular verb, three shapes |
  | `музыку` (M3-C11) | M3-S06 `музыка` = music | yes |
  | `встаёт` (M4-C04) | M4-S01 `встаю` = I get up | yes — with the ё written |
  | `работает` (M4-C05) | M3-S07 `работать` = to work | yes — the everyday shape on the infinitive's row, where M3 first taught the verb |
  | `спит` (M4-C10) | M3-S08 `спать` = to sleep | yes — same reason |
  | `пьёте` (M4-C11) | M4-S03 `пью` = I drink | yes |
  | `была` / `были` (M5-C01, C05) | M5-S01 `был` = was | yes — the ONE быть row |
  | `купила` / `купили` (M5-C02, C11) | M5-S02 `купил` = bought | yes — gender pair on one row |
  | `пошла` (M5-C09) | M5-S04 `пошёл` = went | yes — and the ё-less feminine shape resolves |
  | `выпила` (M5-C06) | M5-S05 `выпил` = drank | yes — its OWN row, not a form of M4's `пью` |
  | `газету` (M5-C02, C04) | M5-S03 `газета` = newspaper | yes |
  | `кофе` (M5-C06) | M3-S04 `кофе` = coffee | yes — reaching back two rungs |

  The `работает` / `спит` landings are the ones worth pausing on: M3 taught those verbs as
  infinitives (`Я хочу работать`, `Я не хочу спать`) and listed the everyday shapes in `forms`, so
  M4's conjugation lesson lives in its rule text while the taps land on M3's rows. That is the
  briefs' "plan the wave, not the module" discipline working as designed — and it is deliberate,
  not an accident of ordering.

- **No pool item equals a hero sentence** in any of the three modules.
- **Three variations on every one of the thirty sentences**, none of them a bare noun swap alone.
- `src/course/types.test.ts` — the field-language walk and the stress-mark scan, over all five
  files.
- `src/course/enRuAuthored.test.tsx` — the module list of each rung as ten cards, plus four new
  Sentence Detail checks: M3's `вода · воду` on one row, M4's `час · часа · часов` on one row and
  the `в` row's two-seat cue, M5's `был · была · было · были` on one row, and M5-S03's two endings
  answering to two different masters.
- `scripts/verify.sh --fast` green.

## Corrections applied during the pass

1. **`пожалуйста` had no word row anywhere.** M3's pool asked for `Я хочу воду, пожалуйста.` and
   the build failed on it — M2 had used the word only in variations and `usage` lines, which are
   not indexed. M3-S05 was rewritten from `Я хочу хлеб.` to `Я хочу хлеб, пожалуйста.` so the row
   has a hero sentence to live in, and its note carries all three of the word's English jobs
   ("please", "you're welcome", "here you are"). Caught by the build, not by reading.
2. **A slip into Russian prose.** M5-S09's `trap` originally read "…if the weather had been snow,
   женского рода, the verb would read была" — Russian grammatical terminology inside an English
   teaching field, which is a language-law violation even though it looks like a quotation. It was
   rewritten to English with `снег` quoted as a word.
3. **Negation was kept away from feminine objects throughout M3 and M5.** Russian often puts a
   negated object in the genitive (`не хочу воды`, `не было дождя`) and the accusative is also
   heard; the split is subtle and this level teaches neither. So every negative sentence in these
   rungs takes an object that would not move anyway — `кофе`, `хлеб`, `сахар` — or no object at
   all. M5-S09's second variation shows `Вчера не было дождя` explicitly labelled as a shape the
   level does not teach, so a learner meeting it recognises rather than guesses.
4. **M5's `Вчера я пил кофе.` was demoted from a mistake to a meaning.** Its `why` says it is not
   wrong Russian but a different fact — the unfinished kind of drinking — which is the honest
   charge. The same discipline was applied to `Вчера я читал книгу.`

## Open questions for a native or fluent Russian reader

Ordered by how much damage a wrong answer does.

### Aspect — the decision most likely to be wrong

1. **Perfective-only past, with the imperfective past deferred out of L1.** Rule 3 of M5 names the
   split and says the second past exists; no sentence uses it. Is a beginner better served by a
   clean one-aspect rung, or is the imperfective past (`Я работал вчера`) so common that leaving
   it out makes M5 unusable?
2. **`выпил` for one cup of coffee.** Natural, or does a Russian more often say `пил` even for one
   occasion, making the module's flagship contrast an artificial one?
3. **`прочитал книгу` vs `читал книгу`.** The module claims `прочитал` means you finished it. True
   — but is "I read a book yesterday" more usually `читал` in real speech, and is the tidy
   finished/unfinished framing an oversimplification?
4. **`покупать` is named in M5 rule 3 as `купить`'s partner but never written.** Is naming a word
   the course never uses helpful, or is it clutter?
5. **`пошёл` glossed as "went · set off".** It carries a departure sense that plain "went" does
   not. Is `Вчера я пошёл домой` the natural way to say "yesterday I went home", or would a native
   say `Вчера я ушёл домой` or simply `Вчера я был дома`?

### The case teaching

6. **M3 rule 0 says a feminine `-а/-я` noun "swaps that ending for `-у/-ю`".** It never shows a
   `-я` noun — all three examples are `-а`. Should one `-я → -ю` noun be in L1, or is naming the
   pattern without an example acceptable?
7. **The stress shift on `вода → воду` (va-DA → VO-doo).** Stated in the note and in the `sound`
   line. Correct, and is it useful this early, or does it frighten more than it teaches?
8. **`Я хочу чаю` and `Я хочу хлеба` are shipped as MISTAKE plates**, with `why` saying the shape
   belongs to a "partial amount" job the level does not teach. Both are perfectly good Russian in
   the right context. Is calling them mistakes defensible in a beginner module, or should the
   plates be replaced?
9. **`Вы хотите воду?` vs `Вы хотите воды?`** The course writes the accusative throughout. Is that
   the natural offer, or would a native offer a partial amount here?
10. **`часов` in `в семь часов`.** Correct. But is `в семь` alone the more ordinary spoken form,
    making the module's teaching sentence more formal than it needs to be?

### Naturalness of the thirty hero lines

11. **`Я хочу работать.`** — offered as the productive infinitive frame. Does it read naturally
    out of context, or does it want a reason attached?
12. **`Я не хочу спать.`** — and its positive variation glossed as "I'm sleepy". Is `Я хочу спать`
    genuinely how a Russian says they are sleepy?
13. **`Вы хотите сок?`** — offering juice. Natural in a home; is it natural anywhere else?
14. **`Днём я работаю.`** — the note claims `днём` covers roughly noon to early evening and does
    not line up with English "afternoon". Is the boundary drawn in the right place, and is `ночью`
    really "from about midnight"?
15. **`Вчера был дождь.`** — chosen because it makes `был` agree with a thing rather than a
    person. Is it the ordinary way to say it, or is `Вчера шёл дождь` more usual?
16. **`Вы прочитали письмо?`** — natural, or stilted?
17. **`Вчера я купил билет.` twice-over with `Вчера я купил хлеб.`** Two sentences on the same
    frame. Acceptable drill, or should one be rewritten?

### Grammar claims the author is least confident about

18. **M4 rule 0: "Russian has ONE present tense where English has two."** True as far as it goes.
    Does saying it this baldly set a learner up badly for the aspect they meet one rung later?
19. **M4-S08's `по-русски` vs M1's `русский язык`.** The module forbids `Вы говорите русский
    язык?` and calls it wrong. Is that the right charge?
20. **`по-русски` is hyphenated**, and the word index therefore also grants keys to its bare parts
    `по` and `русски`, both owned by this row. Nothing else in L1 writes either bare part, so the
    seam is harmless today — but if L2 ever teaches `по` as a preposition it will land on this
    row's note. Recorded here so a later level plans around it.
21. **`встаю` glossed as one word swallowing "get up".** Is `вставать` really the everyday verb, or
    is `просыпаться` ("wake up") what a Russian says about their morning?
22. **M4-S06 claims `Я часто читаю` is neutral and `Я читаю часто` is emphatic.** Is that the right
    account of the word order, or is the difference smaller than the module says?
23. **`всегда` said as "fsyeg-DA".** The `в` devoicing claim before `с` — correct here, and the
    same claim is made about `встаю` and `вчера`. Should a native check all three?
24. **M5 rule 0 says the neuter ending is "-ло for a thing that is neuter".** Accurate, but the
    course shows `было` only in a variation, never on a hero line. Is that enough exposure?
25. **`дождь` is used to make M1's `-ь`-can-be-either-gender warning concrete.** Is one `-ь` noun
    enough, and is `дождь` the right one?

### Sound notes — nothing here can be heard by the author

26. Every `sound` line on these three rungs is derived from written descriptions: the akanye claims
    throughout; the `в → f` devoicing in `встаю`, `вчера`, `всегда` and in `в семь`; the final
    devoicing of `хлеб` → "khlyep" and `часов` → "chee-SOF"; the ь-as-separator account of `пью`;
    the claim that `ё` is always stressed; the stress shift on `вода → воду` and the front stress
    on `выпил`; the claim that the `т` of `часто` is barely said; the `ж` of `каждый` as the s in
    "measure"; and the description of `дождь`'s final cluster as "a single squeezed sound ending
    soft", which is the least safe line in the three modules. A native ear should sample all of
    them, and `дождь` first.

### Pedagogy calls the owner decides

27. **M3-S01's `trap` is about a NON-event** — nothing happened to `чай` — which is unusual for a
    trap slot. Is that a good use of it, or should the slot carry a real interference?
28. **Every sentence on all three rungs is `register: neutral`.** With `ты` excluded course-wide,
    is anything here honestly `informal`?
29. **The gender-marked sentences are all written masculine on the hero line** (`купил`, `был`,
    `пошёл`, `выпил`, `прочитал`) with the feminine in the first variation and in the pool. Is
    leading with the masculine the right default, or should the two alternate across the rung?
30. **`сахар`, `билет`, `газета`, `письмо`, `дождь` as the module's nouns.** They were chosen to
    give M5 ten distinct new rows without opening a case seat. Are they what a learner needs at
    this point, or is the vocabulary drifting away from what a beginner would actually say?
