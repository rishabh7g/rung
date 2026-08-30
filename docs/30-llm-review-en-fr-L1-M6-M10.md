# LLM review — en-fr L1-M6 … L1-M10

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Fable 5), which
cannot hear anything and is not a native or fluent French editor. It wrote the French, the English
teaching prose and the pronunciation glosses, and then audited all three. `verified: true` on the
five modules rests on the repo owner's standing authority;
`verifiedBy` says so: `"Claude Fable 5 — LLM review, authorised by repo owner"`, `verifiedAt`
`2026-08-30`. **No native or fluent-French gate exists for this course.** The open questions here,
with `docs/28`'s ten and `docs/29`'s eleven, are the outstanding work.

This completes the ten-rung L1 ladder. The course is still a dev fixture — the en-fr row in
`content/courses.json` carries `fixture: true` — so nothing reaches a learner until #331.

## What was authored

|                     | M6 Tomorrow | M7 Where things are | M8 Numbers & shopping | M9 Feelings & opinions | M10 Connected talk |
| ------------------- | ----------- | ------------------- | --------------------- | ---------------------- | ------------------ |
| sentences           | 10          | 10                  | 10                    | 10                     | 10 turns           |
| new word rows       | 11 of 25    | 14 of 25            | 16 of 25              | 11 of 25               | 12 of 25           |
| variations          | 3 each      | 3 each              | 3 each                | 3 each                 | 3 each             |
| pool items          | 12          | 12                  | 12                    | 12                     | 12                 |
| bounds              | 4–7         | 4–7                 | 2–7                   | 2–8                    | 2–8 per sentence   |
| enrichment          | full        | full                | full                  | full                   | full               |
| cumulative index    | 105         | 123                 | 143                   | 157                    | **171**            |

Written strictly in ladder order, the index rebuilt between each. All ten L1 rungs now read
`hasContent: true` with no `draft` flag; the L1 level itself keeps its fixture-era flag until
graduation. The finished index is **171 surfaces, maxSpan 4**.

## What each module teaches

**M6 Tomorrow** — `aller` + a BARE infinitive as the everyday future (`*Je vais à travailler`
plated: the "to" inside English's "going to" is the one word French does not write). One `vais`
row covering the plan marker AND plain movement, so M7's `je vais au marché` opens a note that was
written for it. The futur simple named and deferred. The plain present as a future once a time word
says so (`Demain matin je travaille`). And the module where the M5 homophones start costing
something: `acheter` / `acheté`, `rester` / `resté` are said alike, so `Je vais acheté` is plated.

**M7 Where things are** — `il y a`, invariable for both numbers (`*Il y ont` plated), taken as a
three-token surface so `il` and `elle` stay free for M10. Location on M1's one `être`. The
simple/compound preposition split stated as a split — `sur la table` takes nothing, `à côté de la
table` cannot lose its `de` — and then turned round on `devant`, which has an "of" in English and
none in French. The obligatory contractions `au` and `du`, with `à côté de` carrying its contracted
shapes in `forms` so the phrase matches through them. `où` with its accent, against the `ou` the
course never writes.

**M8 Numbers & shopping** — `c'est` and `ça` opened at last (M2 took `ça va` whole precisely so
`ça` would be here). The price question with its word at the END. One `combien de` for "how much"
and "how many". The quantity's bare `de` — `un kilo de pommes`, `une bouteille d'eau` — against
M3's partitive, plated as `un kilo des pommes`. `s'il vous plaît` whole, in the vous shape the
register requires. And the numbers' reaching-forward: `dix euros` ends in a z, `vingt euros` wakes
a t, `cinq` never changes.

**M9 Feelings & opinions** — the `avoir` states, with the reason spelled out: `faim` is a NOUN, so
`Je suis faim` says "I am hunger". The frame reaching past feelings to age (`j'ai vingt ans`).
`parce que` (two words) against `pourquoi` (one) against `donc`, with `parceque` plated as the
spelling that would open an entry nothing could resolve to. `que` after `pense`, never optional.
And the counter-lesson: `content` is an adjective, so it takes `être` — the split is about the
part of speech, not about feelings.

**M10 Connected talk** — turns of two or three complete sentences. The joiners `et`, `mais`,
`aussi`, `puis`, `alors`, each with its own seat: `aussi` after what it adds to, `puis` and `alors`
at the head. `il` and `elle` as the noun's grammatical gender, with the agreement crossing a full
stop (`la maison … elle est grande`). `très` against M8's `trop`. `bon` as one of the few
adjectives that precede their noun. And the rule that never bent across ten rungs, stated last:
the subject pronoun stays, because the endings are silent.

## Corrections applied during the pass

1. **`ou` kept out of the whole level.** M10's joiner list would naturally have included it, and
   it sits one accent from M7's `où`. Excluded by the briefs and excluded in fact: the finished
   index contains `où` and not `ou`, and the M10 note says why.
2. **`côté` never left bare.** `à côté de` alone would have stranded `côté` in
   `à côté du lit` — the phrase does not match through a contraction. The row's `forms` carry
   `à côté de` · `à côté du` · `à côté de la`, and `près de` likewise, and
   `tools/content-build.test.ts` pins that `côté` is not a key.
3. **`va` allowed onto the `vais` row rather than kept unclaimed.** It is a genuine third person of
   `aller`, and the two-token `ça va` still wins wherever both words stand together, because the
   resolver takes the longest match first. Two keys, two notes, neither reachable by accident.
4. **M10's mistake plate is the one place `tu` is written.** `Bonjour, ça va ? Ça va bien, merci,
   et tu ?` demonstrates the register error, and a `mistake` is deliberately-wrong French by
   definition — the build never indexes one. `src/course/types.test.ts` was widened to say so
   explicitly rather than quietly: every other L2 slot in the course is checked for tu-register
   tokens and none carries one.
5. **`Je ne vais pas acheter le livre` rather than `Je ne vais pas l'acheter`** in M10's pool. The
   object pronoun `l'` is a whole system L1 does not teach, and it would have collided with M4's
   `l'eau` on the reader's eye if not on the index.

## The pool audit — every token, and the row it lands on

All five pools resolved token by token against the emitted cumulative index, each landing read
back to its word row. **Zero unresolved across all ten modules of the course; zero landing on a row
whose note is false of the sentence it appears in.** The landings the briefs care about, on the
finished index:

- `il y a` → `L1-M7-S04#0` whole; `il` → `L1-M10-S04#0`; `elle` → `L1-M10-S05#0`. The
  three-token surface claimed no part of itself, so both pronouns were free when M10 needed them.
- `ça va` → `L1-M2-S02#0`; `ça` → `L1-M8-S02#0`. Two keys, and the longest match decides.
- `au revoir` → `L1-M2-S10#0`; `au` → `L1-M7-S09#0`. Likewise.
- `parce que` → `L1-M9-S04#0`; `que` → `L1-M9-S07#1`. Likewise.
- `s'il vous plaît` → `L1-M8-S05#1` whole, leaving `vous` on `L1-M2-S06#0`.
- `à côté du` and `à côté de la` → the `à côté de` row; `près du` → the `près de` row.
- `combien` → `L1-M8-S01#1` (the price question) and `combien de` → `L1-M8-S04#0` (the quantity).
- `allez` and `va` → M6's `vais` row.
- The unaccented rivals `a`, `ou`, `là`, `ca` are absent from the index entirely, and so are
  `tu`, `te` and `es`.

## Verification

- `npm run content:validate` — `CONTENT 50/50 ok`.
- `npm run content:build -- --with-unverified --with-fixtures` — `en-fr: 10 modules
  (L1-M1..M10)`, indexes 24 / 37 / 56 / 75 / 92 / 105 / 123 / 143 / 157 / 171, no pool warnings.
- Strict build unchanged: the course is still dropped whole by the gate.
- `src/course/enFrAuthored.test.tsx` — the dev-build smoke over all ten rungs, including M10's
  turns rendering whole (ten cards for ten turns) and Sentence Detail on M6-S01, M7-S04, M8-S05,
  M9-S01 and M10-S05.
- `scripts/verify.sh --fast` green.

## Open questions for a native or fluent French reviewer

In addition to the twenty-one already recorded in `docs/28` and `docs/29`:

1. **`Je vais dormir` for "I'm going to sleep".** The note claims English's fixed phrase "go to
   sleep" is a false friend here. Is that right, and is `je vais dormir` what a speaker says?
2. **`Puis` at the head of a sentence.** Natural, or does a speaker say `et puis` / `ensuite`?
   The course teaches the bare `puis` and may be teaching the less common of the two.
3. **`alors` against `donc`.** The course places them by position — `donc` inside a sentence,
   `alors` opening the next. That is a simplification, and it may be too clean to be true.
4. **`Il y a un livre ici` as a hero.** Grammatical, but a little bare; a speaker might more
   naturally say `Il y a un livre sur la table`, which the word bound would not fit. Is the short
   form odd?
5. **`C'est un bon prix`.** Is that what a French speaker says about a price, or would it be
   `C'est un prix correct` / `Ce n'est pas cher` ?
6. **`Le café est sur la table. Il est très bien.`** — is `très bien` a natural verdict on a
   coffee, or does it want `très bon` ? The course teaches `bon` in the same module, so if this is
   wrong it is wrong in a place a learner will notice.
7. **`trop` and `très` as taught.** The course states flatly that `trop` is always an excess and
   never an intensifier. In casual speech `c'est trop bien` is common praise. Is teaching the
   strict rule at L1 right, or is the course marking real French as an error?
8. **`bon matin`, `bon` before its noun, `la semaine prochaine` after.** Three separate claims
   about adjective position. The third is certain; the second is stated as "one of the few", which
   needs checking against how many "few" really is.
9. **The number liaisons.** `dix euros` (z), `vingt euros` (t), `trois euros` (z), `cinq` (always
   sounded), `sept` (p silent, t sounded), `deux` (x silent). Six separate phonetic claims, all
   load-bearing for M8 and none of them heard by anyone.
10. **`et` never liaising.** Stated as a fact in M10-S01. It is the kind of rule that is either
    exactly right or subtly overstated.
11. **`Vous voulez venir ?` as the course's last sentence.** Is a bare `venir` after `vouloir`
    the natural invitation, or would a speaker say `Vous voulez venir avec moi ?` (which the
    course shows only as a variation, using `avec` plus a stressed pronoun the level never teaches)?
12. **The whole level's register, revisited.** Ten rungs of `vous` means a learner finishes L1
    able to buy bread and unable to speak to a friend. `docs/28` raised this; it is worth raising
    again now that the shape of the finished level is visible.
