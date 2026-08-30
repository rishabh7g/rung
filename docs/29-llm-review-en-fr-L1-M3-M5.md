# LLM review — en-fr L1-M3, L1-M4 and L1-M5

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Fable 5), which
cannot hear anything and is not a native or fluent French editor. It wrote the French, the English
teaching prose and the pronunciation glosses, and then audited all three. `verified: true` on the
three modules rests on the repo owner's standing authority, exactly as the earlier flips did;
`verifiedBy` says so in words: `"Claude Fable 5 — LLM review, authorised by repo owner"`,
`verifiedAt` `2026-08-30`. **No native or fluent-French gate exists for this course.** The
open-questions list at the bottom, together with `docs/28`'s, is the outstanding work.

Nothing here reaches a learner yet: the en-fr row still carries `fixture: true` (#331 flips it).

## What was authored

|                     | M3 Needs and wants | M4 My day     | M5 Yesterday       |
| ------------------- | ------------------ | ------------- | ------------------ |
| sentences           | 10                 | 10            | 10                 |
| new word rows       | 17 of 25           | 14 of 25      | 14 of 25           |
| variations          | 3 on every one     | 3             | 3                  |
| pool items          | 12                 | 12            | 12                 |
| tokens per sentence | 3–6 (bounds 3–6)   | 4–6 (4–6)     | 3–7 (3–7)          |
| enrichment          | full               | full          | full               |
| `glossEn`           | every sentence     | every         | every              |
| `literal`           | 8 of 10            | 10 of 10      | 10 of 10           |
| `register`          | `neutral` × 10     | `neutral` × 10 | `neutral` × 10    |
| cumulative index    | 56 surfaces        | 75            | 92                 |

Written strictly in ladder order, rebuilding the index between each, so every prompt saw the real
inventory below it. `content/en-fr/levels.json` now shows five L1 rungs `hasContent: true` with no
`draft` flag; the level itself keeps its fixture-era flag until graduation. Enrichment is full on
M4 and M5 as well as M3, which the issue left optional — the repo's other four courses all ship
full enrichment on all ten rungs, and there is no payload ceiling to spend against since #304.

## What each module teaches, and the claim behind each sentence

**M3 Needs and wants.** `vouloir` with a thing (`Je veux un café`) and with a BARE infinitive
(`Je veux manger` — S05's mistake plate is `Je veux à manger`, the preposition English pushes in).
The partitive in three genders — `du pain`, `de la soupe`, `des pommes` — each with the mistake
being the bare noun English would write. The two-part negation wrapping the verb (`Je ne veux pas
de café`), and, on the same plate, the rule most likely to be got wrong quietly: **behind
`ne … pas` every article collapses to a bare `de`**, so `Je ne veux pas du café` is the mistake
and `de café` is the sentence. `un` / `une` as "a" AND "one" at once. The silent written plural.

**M4 My day.** One present for both English presents (`Je mange` = "I eat" and "I am eating";
`*Je suis manger` on the mistake plate). The reflexive daily (`je me lève` · `vous vous levez`,
with the grave on `lève` and none on `levez`). The habitual article — `le matin` is every morning,
`le lundi` is "on Mondays", `lundi` alone is one Monday — taught as whole two-token surfaces. The
clock as `à + number + heures`, plural from two upwards, with `à une heure` in a variation to prove
it. `tous les jours` as a three-token idiom, with its silent `-s` on `tous`. And, last, the article
shrinking in front of a vowel: `de l'eau`.

**M5 Yesterday.** The passé composé as two words, and the law that stops the whole module going
wrong: **it is French's ORDINARY past**, so `J'ai mangé` is "I ate". `avoir` for most verbs and
`être` for the short movement-and-change list, with the participle agreeing after `être`
(`je suis allé` / `allée`) and never after `avoir`. The negation wrapping the AUXILIARY
(`je n'ai pas mangé`, mistake `je n'ai mangé pas`) and the wrong-auxiliary error English produces
(`*Hier j'ai allé à Paris`). Regular participles (`travaillé`, `parlé`, `acheté`) beside irregular
ones (`bu`, `vu`, `fait`), with the mistake plates showing the invented `boiré`, `voiu` and
`faisé`. And the accent as the tense: `mange` / `mangé`, which the ear cannot separate at all —
`mangé` and `manger` are homophones, so the page is the only witness.

## Corrections applied during the pass

1. **M1's `de` note extended.** M4-S10 introduced `de l'eau`, and the bare `de` in it resolves to
   M1's row — first occurrence wins, and no later module can reach the key. M1's note listed
   origin, quantity, the compound prepositions and the post-negation `de`, but not the partitive
   base. It now names the partitive and the `de l'` shrinking too, so the note is true of every
   seat `de` holds in L1. This is the hi-en precedent (#271 extended M1's one `be` row from a
   later module's issue) and it is why an earlier module's file is touched here at all.
2. **`voulez` folded into the `veux` row rather than given one of its own**, and the same for
   `mangez`, `buvez`, `travaillez`, `avez` and `vous levez`. A second row for another person of
   the same verb would be unreachable through the index in half the sentences that use it. Every
   such row's cue was written for the paradigm (`want`, `eat · eats`, `have · has`), not for the
   shape that happened to open it — the correction `docs/28` had to make on `suis`.
3. **The bare form, the present and the participle kept as THREE rows.** `manger` (M3),
   `mange` (M4) and `mangé` (M5) are three surfaces with three jobs, and folding any two together
   would answer a tap with the wrong tense. `tools/content-build.test.ts` pins that they are
   distinct — and that `mangé` and `mange` differ by the accent alone.
4. **`n'ai` given its own row rather than a `forms` entry on `j'ai`.** `n'ai` is `ne` + `ai`; it is
   not another shape of `j'ai`, and listing it there would have been the `forms`-swallowing bug
   the briefs forbid. Both fusions are rows, each naming both of its halves, and the test pins
   that they are different rows.
5. **A missing `changed` on one M4 variation** (`Le matin je bois du thé`) — caught by the schema,
   and the line now says what moved.

## The pool audit — every token, and the row it lands on

All three pools were resolved token by token against the emitted cumulative index and each landing
read back to its word row. **Zero unresolved, zero landing on a row whose note is false of the
sentence it appears in.** The landings the briefs care about:

- `de` in `Je ne veux pas de lait` (M3-C11) and in `Je bois de l'eau le matin` (M4-C06) →
  `L1-M1-S02#2` `"de"`, the row whose note now covers the negation seat and the partitive base.
- `du` in six pool items across M3–M5 → `L1-M3-S02#0`, the partitive row whose note says both
  "some" and "of the" — which is what will keep it true of M7's `à côté du lit`.
- `voulez` (M3-C02, C04, C08, C09, C12) → `L1-M3-S01#0` `"veux"`; `buvez` (M4-C12) →
  `L1-M4-S07#0` `"bois"`; `travaillez` (M4-C03) → `L1-M4-S04#1` `"travaille"`; `avez`
  (M5-C05, C09) → `L1-M5-S01#1` `"j'ai"`. Every one the paradigm's own row.
- `vous levez` (M4-C04) → `L1-M4-S02#0` `"me lève"`, taken as a two-token surface so `vous` stays
  M2's pronoun row and `levez` is never stranded.
- `à quelle heure` (M4-C04) whole → `L1-M4-S06#0`; `tous les jours` (M4-C03, C10) whole →
  `L1-M4-S05#0`; `le matin` / `le soir` / `le lundi` whole.
- `allée` (M5-C04) → `L1-M5-S04#0` `"allé"`; `restée` would likewise; `n'ai` (M5-C03, C11) →
  `L1-M5-S05#0`, a different row from `j'ai`.

No pool item equals a hero sentence of its own module.

## Verification

- `npm run content:validate` — `CONTENT 45/45 ok`.
- `npm run content:build -- --with-unverified --with-fixtures` — `en-fr: 5 modules (L1-M1..M5)`,
  indexes 24 / 37 / 56 / 75 / 92 surfaces, no pool warnings.
- Strict build unchanged: the course is still dropped whole by the gate.
- `src/course/enFrAuthored.test.tsx` — the dev-build smoke, by test: each rung's ten cards,
  Sentence Detail over M3-S07, M4-S10 and M5-S05 with their fused rows and mistake plates, and the
  Why panel answering `Je ne veux pas de lait`, `Vous vous levez à quelle heure ?` and
  `Vous avez vu le film ?` with the rows above.
- `scripts/verify.sh --fast` green.

## Open questions for a native or fluent French reviewer

In addition to the ten in `docs/28`:

1. **`Je veux un café` as the module's opening line.** It is grammatical and it is blunt: a
   French speaker at a counter says `Je voudrais un café` or `Un café, s'il vous plaît`. The
   course defers `je voudrais` (a whole conditional) and buys politeness with `s'il vous plaît` in
   M8. Is that trade acceptable, or does L1 have to teach `je voudrais` as a fixed chunk?
2. **The `de` after a negation.** Stated as absolute: `du`, `de la`, `des`, `un`, `une` all
   collapse to bare `de`. That is the rule as taught; it is not true of `ne … pas le` with a
   specific thing (`Je ne veux pas le café qui est froid`). Is the absolute version safe at L1, or
   will it teach a learner to write `Je ne veux pas de café` where they mean a particular one?
3. **`Je veux de la musique`** appears as an M3 variation. Is that natural French, or does it read
   as odd (music being the sort of thing one puts on rather than wants some of)?
4. **`tous les jours` and the silent `-s` of `tous`.** Stated as fact. Confirm.
5. **`sept` — the `p` is silent and the final `-t` is sounded.** Stated as fact, and it is the
   claim in the module most likely to be wrong in a specific liaison context (`sept heures`).
6. **`à la maison` for "at home".** Is that the everyday phrase, or does a speaker say
   `chez moi`? The course avoided `chez` deliberately (it needs a stressed pronoun), but if
   `chez moi` is what people actually say, M4-S09 is teaching the less natural of the two.
7. **The `être` verb list** is given as `aller, venir, partir, arriver, rester` and explicitly
   called a list rather than a rule. Is naming five (of about fourteen) honest enough, or does
   half a list mislead more than none?
8. **`Je ne suis pas resté à la maison`** — the negated `être` past. Correct, but is it a sentence
   anyone says? A native should say whether the hero earns its place or should be a variation.
9. **`Hier j'ai fait du café`** — is `faire du café` the natural verb, or is it `préparer` /
   `faire un café`?
10. **The homophone claims.** `manger` = `mangé`, `travailler` = `travaillé`, `parler` = `parlé`
    are asserted as exact. And `fait` is claimed to sound like `lait`. Both claims are load-bearing
    for the "the accent is the tense" lesson; both need an ear.
11. **`avec` and its pronounced final `-c`.** Asserted as one of the few final consonants French
    says. Confirm, and confirm the framing is not overstating how rare that is.
