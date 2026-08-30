# LLM review — en-ru L1-M1 and L1-M2

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Fable 5), which
cannot hear anything and is not a native or fluent Russian speaker — it wrote the Russian, the
English teaching prose and the pronunciation glosses, and then audited all three. `verified: true`
on both modules rests on the repo owner's standing authority, exactly as hi-mr's (PR #190),
en-es's (#192–#194), en-ar's (#199–#201) and hi-en's (#270–#272) flips did; `verifiedBy` says so in
words: `"Claude Fable 5 — LLM review, authorised by repo owner"`, `verifiedAt` `2026-08-30`.
**No native or fluent-Russian gate exists for this course**, and the open-questions list at the
bottom is the outstanding work. Russian is the most inflected language the repo has taken on, and
the honest position is that the confidence here is lower than it was for Spanish.

Nothing here reaches a learner yet: `content/courses.json` still carries `fixture: true` on the
en-ru row, so the strict build skips the course entirely (#343 is the issue that flips it). A dev
build (`--with-unverified --with-fixtures`) ships both rungs.

## What was authored

|                       | L1-M1 Who I am                        | L1-M2 First exchange |
| --------------------- | ------------------------------------- | -------------------- |
| sentences             | 10                                    | 10                   |
| new word rows         | 17 of 25 allowed                      | 11 of 25 allowed     |
| pool items            | 12                                    | 12                   |
| variations            | 3 on every sentence                   | 3 on every sentence  |
| tokens per sentence   | 2–4 (bounds 2–5)                      | 2–4 (bounds 2–5)     |
| enrichment            | full (all five blocks, every sentence) | full                 |
| `literal`             | every sentence                        | every sentence       |
| `glossEn`             | every sentence (required — L2 ≠ `en`) | every sentence       |
| prerequisites         | `[]`                                  | `["L1-M1"]`          |
| cumulative index      | 23 surfaces, `maxSpan` 2              | 39 surfaces, `maxSpan` 2 |

There was no fixture to replace: `content/en-ru/modules/` did not exist before this issue. The two
modules were written strictly in ladder order against `tools/course-briefs.ts` (#339) via
`npm run content:prompt`, rebuilding the index between them, so M2's prompt was generated against
M1's real cumulative inventory (23 surfaces). `content/en-ru/levels.json` now carries
`hasContent: true` and no `draft` flag on both rungs.

Two standards that had to be retrofitted onto older courses are baked in from the first module:
**three variations on every sentence** (#288's bar — no exemptions were needed) and **twelve
comprehension items per module** (#292's bar, twice the validator floor).

## The briefs' six decisions, as shipped

1. **Language of every field.** Every `rules[].text`, word `note`, `cue`, `trap`, `sound`,
   `variations[].changed`, `mistake.why`, `usage` and `mnemonic` is English, quoting Cyrillic
   inside English prose where it has to; every `display` (sentence, word, variation, mistake,
   pool) and every `forms` entry is Cyrillic with no Latin letter in it; every sentence carries
   `glossEn` (#268's exemption is for a course whose L2 IS English, and Russian is not one) and
   `literal` — the Russian words in English order, hyphenated where one Russian word needs several
   English ones (`Me they-call Ivan`, `I got-tired`). `scriptMode` is `native`, so no surface
   anywhere carries a `script` field. `src/course/types.test.ts` asserts all of this mechanically
   for every en-ru module file it finds.
2. **Register — `вы`, and no `ты` anywhere.** Every addressed line in both modules is the polite
   `вы`: `Вы из Москвы?`, `Как вас зовут?`, `Вы студент?`, and the plural predicate `Вы устали?`
   in a variation. `ты` appears in exactly two places, both English prose: M2 rule 1 and the `Вы`
   row's note, each saying it exists, that it takes its own endings, and that choosing it is L2's
   job. `Здравствуйте` is the greeting; `привет` is written only in M2-S01's `mistake` plate,
   where it is charged with being the wrong REGISTER rather than wrong Russian. `Как дела?` ships
   with the brief's argument in its own note and rule: it has no second-person word in it at all,
   so it carries no register to get wrong, and its `usage` line points at `Как у вас дела?` for
   somebody just met.
3. **The ё policy.** Neither module contains a word that has `ё` in it, so the policy has not yet
   been exercised — M4 (`пьёте`, `встаёте`) and M5 (`пошёл`) are where it first bites. What both
   modules DO obey is the other half of the same decision: **no stress marks anywhere**.
   `types.test.ts` scans the whole serialised module for a combining acute (U+0301) and fails on
   one, so `кни́га` can never fork the index. Stress lives in `sound`, in English syllables
   (`ma-la-KO`, `stoo-DYENT`).
4. **Case.** M1 opens the nominative and names the accusative SLOT without teaching an ending —
   every liked thing is masculine-inanimate (`чай`, `русский язык`) or neuter (`молоко`), so the
   object never moves, and rule 6 says exactly that and promises M3. The one case ending in M1 is
   the genitive after `из`, taught as a frozen partner: `Индия → Индии`, `Москва → Москвы`, with
   S05's `trap` admitting outright that the two endings differ and that this level teaches the
   pairs rather than the system. M2 adds no case at all; `вас` is a pronoun shape on the one `Вы`
   row. The instrumental is not touched.
5. **One row per word.** Verified against the emitted index rather than asserted:
   - `я` (M1-S03) carries `я · меня · мне`, so M2's `Меня зовут …` variation and M9's future
     `мне холодно` both land on one note that names all three jobs.
   - `Индия` carries `Индия · Индии` and its note is written true of BOTH seats — `из Индии`
     (from) and the `в Индии` (in) that M7 will write — so a later prepositional cannot land on a
     note that says only "from".
   - `Москва` carries `Москва · Москвы` and its note pre-announces the third shape, `Москве`.
   - `люблю` carries `люблю · любит · любите`, so the third-person and polite forms in the pools
     resolve to the verb's one row.
   - `устал` (M2-S08) carries `устал · устала · устали` — the speaker-gender pair, and the plural
     that `вы` forces, on ONE row whose note says the shape follows the SUBJECT, not the speaker.
   - `Вы` carries `Вы · вас · вам`.
6. **Multi-token surfaces and homographs.** `Меня зовут` (M1), `Доброе утро`, `Как дела` and
   `До свидания` (M2) are surfaces of their own; the resolver's longest-match walk takes each
   whole. `Как дела` leaves the bare `Как` free, and M2-S05 claims it for "how" one sentence
   earlier. No `есть` appears in either module in any sense: the eating verb is out of L1 by
   decision, and the existential does not arrive until M7.

**One seam the briefs did not foresee, decided here and recorded.** `Как вас зовут?` needs a bare
`зовут`, and `Меня зовут` is a two-token surface that leaves `зовут` unclaimed — so the walk would
have left it unresolved and a learner tapping it would have got nothing. Rather than push `зовут`
into `Меня зовут`'s `forms` (which would have made a phrase's `forms` list swallow one of its own
parts — the shape of the hi-mr bug in `docs/07-llm-review-L1-M6-M10.md`), **M2-S05 opens a `зовут`
row of its own**, with a note true of both frames: it is the "they call" inside `Меня зовут` and it
is the verb of the question. The two keys are distinct, both are reachable, and neither note is
false of the other's sentence.

## What was checked, mechanically

- `npm run content:validate` — `CONTENT 42/42 ok`, both en-ru files clean.
- `npm run content:build -- --with-unverified --with-fixtures` — `en-ru: 2 modules (L1-M1..M2)`,
  indexes of 23 and 39 surfaces, no pool warnings, no errors.
- **Every token of every sentence AND every pool item swept through the emitted cumulative index,
  and the WORD ROW each one lands on read back** — not merely that it resolves. Twenty sentences
  and twenty-four pool items, zero unresolved tokens, and every landing checked by hand against
  the row it should be. The ones worth naming, because they are the ones that could have been
  wrong:

  | token in a pool item | lands on | correct? |
  | --- | --- | --- |
  | `меня зовут` (C01) | M1-S01 `Меня зовут` = my name is | yes — the whole formula, never `меня` + `зовут` |
  | `москвы` (M1-C03) | M1-S05 `Москва` = Moscow | yes — the case shape on the row that taught the word |
  | `индии` (M1-C04) | M1-S04 `Индия` = India | yes |
  | `любит` (M1-C06, C07, C09) | M1-S08 `люблю` = I like · I love | yes — one verb row, three persons |
  | `студентка` (M1-C02, C12) | M1-S07 `студентка` = student (f) | yes — its own row, not a form of `студент` |
  | `вас` (M2-S05) | M2-S03 `Вы` = you (polite) | yes — the object shape on the one pronoun row |
  | `устала` (M2-C09) | M2-S08 `устал` = tired | yes — the gender pair on one row |
  | `как дела` (M2-C02) | M2-S06 `Как дела` = how are things | yes — taken whole, `Как` left to its own row |
  | `доброе утро` (M2-C03) | M2-S02 `Доброе утро` = good morning | yes |
  | `до свидания` (M2-C10) | M2-S10 `До свидания` = goodbye | yes |

- **No pool item equals a hero sentence**, case-insensitively, in either module. Two near-misses
  were rewritten during the pass: M2's pool originally carried `Как вас зовут?`, which is hero
  S05, and `Я из Москвы.`, which is M1's hero S05.
- **Three variations on every one of the twenty sentences**, and none of them a bare noun swap
  alone: every sentence has at least one structural variation (a person shift, a question, a
  gender switch, or a subject swapped for a name).
- `src/course/types.test.ts` — the field-language walk above, plus the stress-mark scan.
- `src/course/enRuAuthored.test.tsx` — the dev-build smoke, by test and never by a browser: the
  Ladder in English chrome, both module lists as ten cards each, Sentence Detail with a `lang="ru"`
  hero over an `lang="en"` document and the gloss paragraph present, and four Why-panel taps
  landing on the rows this document says they land on.
- `scripts/verify.sh --fast` green.

## Corrections applied during the pass

1. **`Я люблю музыку` was cut from M1.** `музыка` is feminine, so its object shape is `музыку` —
   an accusative ending, in the module whose whole design is that the object never moves. It was
   replaced by `Я люблю молоко` (neuter, unchanged), and the feminine ending waits for M3 where
   the brief puts it.
2. **`Это книга` was cut from M1.** It would have opened the `книга` row in M1, which would then
   have had to carry `книгу` — stealing M3's own lesson word. `Это Анна` took its place, which
   also earns the module a genuine third-person introduction.
3. **The `зовут` seam** above: found by sweeping M2's sentences, not by reading them.
4. **M2's pool was rewritten twice** to remove the two hero collisions named above.
5. **`иметь` was re-charged in the briefs** (a #339 fix carried here): the possession trap of M8
   is *unnatural*, not ungrammatical, because `иметь` is a real verb. Nothing in M1–M2 depends on
   it, but the same discipline was applied to every `mistake` plate in these two modules: two of
   the twenty are charged as wrong REGISTER (`Привет, Анна!`) or wrong PUNCTUATION habit
   (`Я — студентка.`) rather than as ungrammatical, and their `why` lines say which.

## Open questions for a native or fluent Russian reader

These are the outstanding work. They are ordered by how much damage a wrong answer does.

### The register decision itself

1. **`вы` for the whole of L1, with `ты` never written.** This is the single biggest call in the
   course. It is defensible (a beginner meets strangers first) but it means a learner finishing L1
   cannot address a friend, and that the entire second-person verb paradigm they have seen is the
   plural. Is that the right trade for a survival level, or should one named module have taught
   `ты`?
2. **`Как дела?` inside a `вы` course.** The argument in the brief and in M2 rule 5 is that the
   phrase carries no second-person marking, so it cannot be said at the wrong level of politeness.
   Is that true in practice, or does `Как дела?` to a stranger already read as too familiar
   regardless of its grammar? If it does, M2-S06 should become `Как у вас дела?` and the
   two-token surface should be re-planned.
3. **`Очень приятно.` as a whole sentence.** Ships as the reply to an introduction. Is the bare
   form natural, or does it want `Очень приятно познакомиться` or a name after it in most real
   exchanges?

### Naturalness of the twenty hero lines

4. **`Я студент.` / `Анна — студентка.`** — the dash convention in M1 rule 7 (dash between two
   nouns, none after a pronoun) is stated as a written norm. It is; but is it stated too firmly?
   A native writer omits it more often than the rule implies.
5. **`Это Анна.`** — introducing a person with `Это`. Correct, but is it what a Russian says, or
   would they say `Познакомьтесь, это Анна`?
6. **`Я люблю русский язык.`** — the `usage` line calls this the natural last line of a first
   introduction. Is it, or does it read like a textbook sentence?
7. **`Я люблю молоко.`** — grammatically fine. Is "I like milk" a thing Russians say, or is it a
   translated sentence?
8. **`Да, я студент.`** as a standalone hero, with no question in front of it. The card has no
   context; does it read as odd on its own screen?
9. **`Здравствуйте, Анна!`** — greeting a person by first name alone while on `вы` terms. In much
   of Russian practice `вы` goes with name-and-patronymic. Is first-name-plus-`вы` the right
   register for a course that will never teach patronymics in L1?

### Grammar claims the author is least confident about

10. **M1 rule 5, noun gender.** The claim is: consonant → masculine, `-а/-я` → feminine, `-о/-е` →
    neuter, with `-ь` ambiguous and `кофе` an exception. Is naming `кофе` this early helpful or
    just confusing? And is calling `кофе` masculine still the right thing to teach, given how
    widely the neuter is now heard and now accepted?
11. **`чай` is described as "ends in a consonant sound".** `й` is a consonant letter, so the
    classification is right; is the wording right, or does it invite a learner to look for a
    written consonant and find `й` puzzling?
12. **M1-S05's `trap`**: "the ending depends on how the word itself ends, and this level teaches
    the pairs rather than the system". Honest, and vague. Would a native teacher put the real rule
    (`-а → -ы`, `-ия → -ии`) in front of a beginner instead?
13. **M2-S08's `устал`.** It is a past-tense form of `устать` used as a present-tense predicate,
    and the module does not say so — it calls it "a word describing how somebody is". Is that
    simplification acceptable at M2, or does it store up trouble for M5, where the same `-л/-ла`
    endings are taught as the past?
14. **`Вы устали?` said to one man.** Stated as a rule in M2 rule 3 and shown in a variation. Is
    the plural obligatory here in the way the rule claims?
15. **`зовут` as "they call".** The row's note calls it a "bare they-form" used the way English
    uses a passive. Is that the right way to explain it to a beginner?
16. **`До свидания` glossed as "until the meeting", with `свидания` called "a bent shape of
    'meeting', bent because до, like из, changes the word after it".** True, but `свидание` also
    means "a date" in modern usage. Should the note say so, or is that a distraction?
17. **`Нет` and the genitive of negation.** M2-S04's note names the `Здесь нет молока` job and
    defers it. Is naming a construction the course will not teach for a whole level helpful, or is
    it noise on a beginner's screen?

### Sound notes — nothing here can be heard by the author

18. Every `sound` line in both modules is derived from written descriptions, not from listening:
    the akanye claim (unstressed `о` → "a") on `Меня зовут`, `молоко`, `Москва`, `хорошо`,
    `Доброe утро`, `приятно`, `До свидания`; the softening of consonants before `е` (`студент`,
    `нет`); `ы` as a hard back vowel (`Москвы`, `язык`); the raspy `х` of `хорошо`; the claim that
    the first `в` of `Здравствуйте` is not pronounced and that the whole word collapses to
    "ЗДРАС-тye"; the held `нн` of `Анна`; the soft `л` of `люблю`; and the claim that unstressed
    `до` in `До свидания` sounds identical to `Да`. **The intonation claims are the least safe**:
    that a yes/no question is carried by a pitch rise on the questioned word (M2 rule 0, S03's
    `sound`), and that `Как дела?` rises on `дела`. A native ear should sample all of these, and
    the intonation ones first.

### Pedagogy calls the owner decides

19. **`любить` is glossed "I like · I love" and its `trap` says the English "love" is too strong.**
    That is the standard advice. Is it right, or does `любить чай` actually carry more weight than
    the note admits — and would `мне нравится` (deferred to M9) have been the better first "like"?
20. **`Иван` and `Анна` are the only two names in the course so far**, and both are declared as
    word rows so that pool items can use them (#61: proper nouns do not index unless a row
    declares them). Are they the right names — common, unmarked, easy to say — or would a native
    pick differently?
21. **`Индия` and `Москва` as the two places.** `Индия` mirrors hi-mr's and en-es's own choice
    (the repo owner's context) and `Москва` is the obvious Russian city. Should a third, less
    loaded place appear early?
22. **M2 has no `interference`-tagged WORD row** — its loud tags are on rules 1 (the `вы`/`ты`
    fork) and 3 (predicate gender), and on the `Вы` and `устал` rows. Is that the honest picture
    of an English speaker's first Russian exchange?
23. **Every sentence in both modules is `register: neutral`**; the `informal` chip is unused. With
    `ты` excluded course-wide that is almost tautological — but is `Как дела?` honestly neutral?
    (See question 2; if the answer there is no, this chip should move too.)
