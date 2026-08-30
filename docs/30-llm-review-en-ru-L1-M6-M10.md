# LLM review — en-ru L1-M6 … L1-M10

**This is an LLM review, not a native pass.** Same bar and same author as
`docs/28-llm-review-en-ru-L1-M1-M2.md` and `docs/29-llm-review-en-ru-L1-M3-M5.md`: Claude (Fable 5)
wrote the Russian, the English teaching prose and the pronunciation glosses, and then audited all
three. `verified: true` rests on the repo owner's standing authority; `verifiedBy` says so in words
— `"Claude Fable 5 — LLM review, authorised by repo owner"`, `verifiedAt` `2026-08-30`. **No native
or fluent-Russian gate exists for this course**, and the open-questions list at the bottom is the
outstanding work.

These five rungs complete the ten-rung L1 ladder. `content/en-ru/levels.json` now shows all ten
modules `hasContent: true` with no `draft` flag; L2 and L3 remain placeholder lists. The course is
still behind `fixture: true` (#343 graduates it).

## What was authored

|                     | M6 Tomorrow | M7 Where things are | M8 Numbers & shopping | M9 Feelings & opinions | M10 Connected talk |
| ------------------- | ----------- | ------------------- | --------------------- | ---------------------- | ------------------ |
| sentences           | 10          | 10                  | 10                    | 10                     | 10 turns           |
| new word rows       | 11          | 11                  | 12                    | 11                     | 11                 |
| pool items          | 12          | 12                  | 12                    | 12                     | 12                 |
| variations          | 3 each      | 3 each              | 3 each                | 3 each                 | 3 each             |
| enrichment          | full        | full                | full                  | full                   | full               |
| `literal`           | every one   | every one           | every one             | every one              | every one          |
| `glossEn`           | every one   | every one           | every one             | every one              | every one          |
| cumulative index    | 150         | 167                 | 184                   | 200                    | **215 surfaces**   |

`maxSpan` climbs from 2 to **3** at M8, when `у меня есть` and `у вас есть` arrive — the first
three-token surfaces in the course, and the reason the resolver's longest-match walk matters here
more than anywhere else in the product.

## The briefs' decisions, as shipped

**M6 — two futures, and one `быть` row.** The rule says plainly that which future you get is
decided by the VERB and not by what you mean, and that `буду` is therefore not "will". Two mistake
plates carry the cross-wiring (`Завтра я буду напишу письмо.`, `Завтра я буду позвоню.`). As the
briefs required, `буду · будете · будет` was added to **M5's own `был` row** rather than opening a
second — one lexeme, one note, and that note now tells the whole story of Russian "be": a real
past, a real future, and an empty present. Likewise `куплю` joined M5's `купил` row and `пойду`
joined M5's `пошёл` row. Two genuinely new lexemes did get their own rows, because they are
different words rather than different tenses: `встану` (against M4's `встаю`) and `напишу`,
`позвоню`, `придёте`. M6-S06 (`Завтра экзамен.`) is the module's quiet best sentence: no verb at
all, the zero copula still running on rung six, and its variations show the whole arc — optional in
the future, obligatory in the past, absent in the present.

**M7 — the prepositional, and the `есть` seam paid off.** The `-е` ending on `стол`, `магазин`,
`работа`, `комната` and `Москва`, taught with the honest note that в/на pairing is as often lexical
as logical (`в магазине`, but `на работе`). `Москве` was added to **M1's own `Москва` row**, which
had already promised it in M1's note back at #340 — no second row was opened for a case shape. The
existential `есть` gets M7's one bare row, with a note written true of M8's possession seat too,
and "to eat" never appears anywhere in the course, exactly as the briefs decided. M7-S03's
`literal` — "On table is book" — is where the missing dummy subject becomes visible.

**M8 — the counting genitive, and possession without a verb.** One honest rule, three shapes in
`forms` (`рубль · рубля · рублей`), and no declension table; the note names the link back to M4's
`час · часа · часов`, which was the same law met a rung early. `У вас есть` and `У меня есть` are
three-token surfaces, so the resolver takes each whole and the `есть` inside them opens the
possession note while a bare `есть` still opens M7's. The `иметь` trap is charged as *unnatural*
rather than ungrammatical, which is the honest charge. A `стоит` row had to be opened here (see
corrections below).

**M9 — the dative experiencer, this course's `gustar`.** `мне холодно` has no subject and no verb;
`мне нравится` has a subject and it is the thing liked, so the verb agrees with IT. Both rules say
so in those words, and the note names the link back to M8's `Сколько стоят книги?` — the same
shape twice. `мне` lands on M1's `я` row, which was written with `я · меня · мне` and a note naming
all three jobs, so the tap is true. The obligatory comma before `потому что` and before `что` is
stated as a law rather than a preference, and `что`'s row covers its question sense too.

**M10 — recombination, and the article's work paid at last.** Rule 0 is M1's promise coming due:
Russian has no articles, so the job moved into the ORDER, and `Книга на столе` versus `На столе
книга` is the pair that shows it. `он · она · оно · они` is ONE row whose note says the shape
follows the noun's gender rather than its aliveness — an English speaker's `оно` reflex is wrong
most of the time. The joiners are the module's honest new spend, and `а` is given its own
interference tag because English has no single word for it. `всё` closes the level and closes the
ё policy: `всё` is everything, `все` is everybody, and the two dots are the whole difference.

## What was checked, mechanically

- `npm run content:validate` — `CONTENT 50/50 ok`, all ten en-ru files clean.
- `npm run content:build -- --with-unverified --with-fixtures` — `en-ru: 10 modules (L1-M1..M10)`,
  indexes climbing 23 → 215 surfaces, no pool warnings, no errors.
- **Every token of every sentence AND every pool item swept through the emitted cumulative index,
  with the word row each one lands on read back.** A hundred sentences and a hundred and twenty
  pool items across the whole level; zero unresolved tokens; every landing checked. The ones this
  arc could have got wrong:

  | token in a pool item | lands on | correct? |
  | --- | --- | --- |
  | `будет` (M6-C05) | M5-S01 `был` = was | yes — the ONE `быть` row, extended not forked |
  | `куплю` / `купите` (M6-C02, C12) | M5-S02 `купил` = bought | yes — one lexeme, past and future |
  | `пойду` (M6-C10) | M5-S04 `пошёл` = went | yes |
  | `придёт` (M6-C04) | M6-S09 `придёте` = you will come | yes — its own row, a different lexeme |
  | `москве` (M7 sentences) | M1-S05 `Москва` = Moscow | yes — the third shape on the first row |
  | `индии` (M7-C08) | M1-S04 `Индия` = India | yes — genitive and prepositional, one surface, one note |
  | `есть` (M7-C05, C12) | M7-S03 `есть` = there is | yes — and "to eat" never exists in this course |
  | `у меня есть` (M8-C04, C09) | M8-S06 `У меня есть` = I have | yes — three tokens whole, its `есть` swallowed |
  | `у вас есть` (M8-C03, C11) | M8-S05 `У вас есть` = do you have | yes |
  | `стоит` (M8-C02, C10) | M8-S03 `стоит` = costs | yes — its own row, not the chunk's |
  | `рубля` / `рублей` (M8-C02, C10) | M8-S03 `рублей` = roubles | yes — three counting shapes, one row |
  | `билеты` / `билета` (M8-C06, C09) | M5-S08 `билет` = ticket | yes — reaching back three rungs |
  | `две` (M8-C12) | M8-S09 `два` = two | yes — the gendered number on one row |
  | `нравятся` (M9-C02) | M9-S03 `нравится` = pleases | yes |
  | `мне` (M9 pool, throughout) | M1-S03 `я` = I · me | yes — the third shape on M1's pronoun row |
  | `она` / `оно` (M10-C03, C09) | M10-S07 `Он` = he · it | yes — one row, four shapes |
  | `живёте` / `живёт` (M7-C10, M10-C07) | M7-S10 `живу` = I live | yes, with the ё written |

- **No pool item equals a hero sentence** in any of the ten modules. One collision was caught
  during this pass and rewritten (M10-C01 was M10-S01 exactly).
- **Three variations on every one of the hundred sentences**, no exemptions taken.
- A new block in `tools/content-build.test.ts` pins the seams on the real emitted index: every case
  shape on the row that first taught its word; `быть` and each aspect pair's own paradigm on one
  row; the gender pairs; the aspect pairs as SEPARATE rows (`пью` vs `выпил`, `встаю` vs `встану`);
  `maxSpan` 3; every multi-token surface and the bare word it leaves free; `есть` owned by M7; a
  bare `у` earning no key at all; and — the ё policy, mechanically — every ё-word present in the
  index and every е-spelling of one absent from it.
- en-ru joined the `[Q3]` sweep in the same file: all five authored courses now resolve every
  sentence and pool token.
- `src/course/enRuAuthored.test.tsx` — the module list of all ten rungs as ten cards each, plus
  Sentence Detail checks on M6's `буду`-less future, M7's existential row and its `literal`, M8's
  three-token possession frame, M9's dative experiencer, and an M10 turn rendering whole with its
  `он · она · оно · они` row; plus a Why-panel tap proving `У меня есть ключ.` resolves as TWO rows
  and not four.
- `scripts/verify.sh --fast` green.

## Corrections applied during the pass

1. **`стоит` had no reachable row.** `Сколько стоит` is a two-token surface, so the bare `стоит` in
   the ANSWER sentences (`Книга стоит сто рублей.`) resolved to nothing — the build failed on two
   pool items and would have left a hero-sentence tap silently empty. M8-S03 opened a `стоит` row
   of its own with `стоит · стоят` in `forms`, exactly as M2 opened a `зовут` row behind
   `Меня зовут` at #340. Two distinct keys, both reachable, neither note false of the other's
   sentence.
2. **Three cross-module row extensions, all sanctioned by the briefs and all in place of a second
   row**: `буду · будете · будет` and `купите` onto M5's rows, `Москве` onto M1's `Москва`, `книги`
   onto M3's `книга`, and `билета · билеты` onto M5's `билет`. Every extended note was rewritten so
   it is true of the new shapes, not merely tolerant of them.
3. **A slip into Russian prose, again.** M10-S01's `trap` read "…and они do so invisibly" where it
   meant "they" — the same class of error as M5-S09's at #341. Caught by reading; the mechanical
   guard in `types.test.ts` does not catch it, because a Russian word inside English prose is legal.
   Worth naming as a recurring risk.
4. **Direction was kept out, twice.** A first draft of M10-C06 and of an M9 variation wrote
   `пойду в магазин` — `в` + accusative, a third seat for a row whose note promises exactly two.
   Both were rewritten. The course still never opens the direction seat.
5. **An imperfective past leaked into an M10 variation** (`Вчера я работал`), which M5 deferred out
   of L1 and which is not in `работать`'s `forms` either. Replaced with `Вчера я купил хлеб`.
6. **M10-C01 equalled hero M10-S01** and was rewritten with a name added.

## Open questions for a native or fluent Russian reader

Ordered by how much damage a wrong answer does. These join the 23 of `docs/28` and the 30 of
`docs/29`, for **78 open questions** across the course.

### The decisions most likely to be wrong

1. **`Мне нравится Москва` vs `Я люблю Москву`.** M9's note says `нравится` is closer to "I find it
   nice" and `люблю` is stronger and more personal. Is that the right split, and is `нравится` the
   right first "like" for a beginner — or should M1 have led with it?
2. **`У меня есть` for everything.** Russian often drops `есть` when the emphasis is on WHAT you
   have rather than THAT you have it (`У меня новая книга`). The course always writes it. Is that a
   simplification a beginner can live with?
3. **`Дайте, пожалуйста, воду.`** — the only imperative in the level. Is it the natural shop
   request, or is `Можно воду?` or `Мне, пожалуйста, воду` what a Russian actually says?
4. **M6's `Завтра экзамен.`** with no verb. Correct, and is it the ordinary way to say it?
5. **`Извините` as both "excuse me" and "sorry".** The note says there is no separate word at this
   level. Is `Простите` what a native would use for the apology, and does the conflation mislead?

### Naturalness of the fifty hero lines

6. **M6-S04 `Завтра я позвоню.`** with nothing after the verb. Natural, or does it need `вам`?
7. **M6-S10 `Конечно, я буду работать.`** — is `конечно` with a comma the right register here?
8. **M7-S06 `Магазин там.`** and **M7-S05 `Книга здесь.`** — both are two-word sentences. Do they
   read as complete Russian or as flashcards?
9. **M7-S10 `Я живу в Москве.`** — `жить` was chosen over `проживать`. Right choice?
10. **M8-S10 `Ещё чай, пожалуйста.`** — is `ещё чай` right for "more tea", or does it want
    `ещё чаю` (the partial shape this level refuses to teach)? This is the question most likely to
    expose a real error, because the partial genitive is exactly what a café order takes.
11. **M9-S09 `Мне плохо.`** — the note says it means feeling unwell rather than things going badly.
    Is that split as clean as claimed?
12. **M10-S02 `Хорошо, спасибо. А вы?`** — is `А вы?` the natural hand-back, or `А у вас?`
13. **M10-S05 `Иван студент. Анна тоже студентка.`** — the note puts `тоже` in front of what is
    shared. Is `Анна тоже студентка` right, or would a native say `Анна тоже`?
14. **M10-S09 `Сейчас я работаю, потом я пойду домой.`** — two present-shaped verbs, two times. Is
    the sentence natural, or is the contrast too neat to be real speech?

### Grammar claims the author is least confident about

15. **M6's whole framing of aspect as "everyday kind" and "finished-event kind".** It avoids the
    words imperfective and perfective on purpose. Is the plain-English framing accurate enough, or
    does it store up a misunderstanding?
16. **`встану` vs `встаю` as the module's showcase pair.** Is `встать`/`вставать` a good pair to
    teach it on, or is it unusual in some way that makes it a poor example?
17. **M7's claim that the prepositional is "the only case that never appears without a
    preposition".** True. Is it useful to say to a beginner?
18. **M7's `на работе` explained as lexical rather than logical.** Correct — but is the list of
    `на`-places the note implies (`на почте` is the only other one given) representative?
19. **M8's counting rule as stated: 1 plain, 2–4 one ending, 5+ another.** It omits that the rule
    restarts on 21, 22 and so on, and that numbers ending in 11–14 take the 5+ shape. Is omitting
    that right at this level, or does it teach something a learner will have to unlearn?
20. **`один` and `два` as "the only numbers that change for gender".** True of 1 and 2; is it
    misleading to state it that flatly?
21. **M9's `Анне холодно` in a variation** — the dative of a name, an ending the level never
    teaches. It is flagged only implicitly by the `changed` line. Should it be there at all?
22. **M10 rule 0's word-order claim.** `Книга на столе` = "the book is on the table" and
    `На столе книга` = "there is a book on the table". This is the standard account. Is it as
    reliable as the module makes it sound, and is intonation doing more of the work than the rule
    admits?
23. **M10's `а` explained as "joins two halves that differ without contradicting".** Is that a
    usable account, or does it miss the main thing `а` does?
24. **The claim that `сегодня` is said "see-VOD-nya" and `конечно` "ka-NYESH-na"**, and that this
    is a small closed group. Correct as far as it goes; is the group worth naming?

### Sound notes — nothing here can be heard by the author

25. Every `sound` line across these five rungs is derived from written descriptions. The riskiest:
    the `-тся` of `нравится` said as one "tsa"; the claim that `сейчас` reduces to "shchas" in
    speech; the щ of `ещё` as a long soft "shch"; the ж of `тоже` and `жарко` as the s in
    "measure"; the final devoicing of `город` → "GO-rat"; the silent д of `поздно`; the ы of
    `добрый`; and every intonation claim about questions. A native ear should sample all of them.

### Pedagogy calls the owner decides

26. **Every sentence in all five modules is `register: neutral`.** With `ты` excluded, is anything
    here honestly `informal`?
27. **M10's ten items are all 2-sentence turns; none is three.** The job says "2–3". Is two enough,
    or should the last two or three items be longer?
28. **The level ends on `Всё хорошо, спасибо. До свидания!`** — chosen to close both the
    conversation and the ё policy. Is that the right last thing a learner sees?
29. **215 surfaces through L1-M10**, against hi-mr's 215 and hi-en's 207 — an almost identical
    inventory for a much more inflected language, because so many of those surfaces are shapes of
    words already counted. Is the vocabulary too thin for the grammar it carries?
30. **`по-русски` is hyphenated and therefore also grants index keys to `по` and `русски`** (see
    `docs/29` question 20). Still harmless at L1; recorded again here because M10 is the last
    chance to change it before the course ships.
