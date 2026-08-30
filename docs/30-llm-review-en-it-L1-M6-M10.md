# LLM review — en-it L1-M6 … L1-M10

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Fable 5), which
cannot hear anything and is not a fluent-Italian editor — it wrote the Italian, the English
teaching prose and the pronunciation glosses, and then audited all three. `verified: true` on the
five modules rests on the repo owner's standing authority, exactly as `docs/28` and `docs/29`
recorded for the five before them; `verifiedBy` says so in words: `"Claude Fable 5 — LLM review,
authorised by repo owner"`, `verifiedAt` `2026-08-30`. **No native or fluent-Italian gate exists
for this course**, and the open-questions list at the bottom is the outstanding work, on top of the
thirty-six already open in `docs/28` and `docs/29`.

This completes the ten-rung L1 ladder. Nothing reaches a learner until #337 deletes `fixture: true`
from the en-it row.

## What was authored

| | M6 Tomorrow | M7 Where things are | M8 Numbers & shopping | M9 Feelings & opinions | M10 Connected talk |
|---|---|---|---|---|---|
| sentences | 10 | 10 | 10 | 10 | 10 turns |
| new word rows | 13 | 17 | 13 | 11 | 12 |
| pool items | 12 | 12 | 12 | 12 | 12 |
| tokens per sentence | 3–6 (bound 7) | 3–6 (bound 7) | 3–6 (bound 7) | 2–6 (bound 8) | 1–8 per sentence inside a turn (bound 8) |
| enrichment | full | full | full | full | full |
| `glossEn` | every sentence | every | every | every | every |
| variations | 3 on every sentence | 3 | 3 | 3 | 3 |
| cumulative index | 161 surfaces | 185 | 207 | 223 | 245, `maxSpan` 3 |

Written in ladder order, rebuilding the index between modules. All ten L1 rungs now carry
`hasContent: true` with no `draft` flag.

## The briefs' decisions, as shipped in these five

- **`c'è` / `ci sono` split by number** (M7 rule 0), and the rule says out loud that English makes
  the same split — this is a free ride, not a new idea, and the module's job is only the two
  Italian words. `c'è` is its own row (its first element `ci` is taught nowhere in L1); `ci sono` is
  the two-token surface beside it, and it swallows the `sono` inside it, so a tap there opens the
  existential note rather than M1's `essere`. The index confirms both on M7-C03 and M7-C04.
- **`dov'è` is a `forms` entry on the `dove` row**, per the elision policy, and both spellings
  resolve to it — `dov'è la stazione?` and `dove sono i libri?` land on the same note, which
  explains the fusion.
- **The contractions are their own single-token surfaces**: `sul` and `nel` (M7-S01, S06), `al`
  (M7-S07), beside M4's `alle`. Bare `in` is M7's own row; bare `a` stayed M5's (the deviation
  recorded in `docs/29`) and answers for M6's `vado a Roma` and M9's `vado a casa` alike; bare `di`
  is still M1's and answers for `un chilo di riso`.
- **`per favore` and `quanto costa` are claimed whole** (M8-S03, S01), which is what leaves bare
  `per` unclaimed for the whole level and leaves the agreeing quantifier `quanto / quanta / quanti
  / quante` free for its own row (M8-S05). `un chilo di` is a three-token surface, like `un po' di`.
- **`perché` is ONE row owning both directions** (M9-S03), and its note is written true of both —
  "in the middle of a sentence it means because; at the front of a question it means why". The
  module drills both: S03 answers, S06 asks, and six pool items use one or the other.
- **The M1 `sono` row's note is still true wherever it recurs.** It recurs in M5's `sono andato`,
  in M7's `Dove sono i libri?` and `I libri sono buoni`, and in M10's `sono libero`. Every one of
  those is a seat the note names: "I am", "they are", and the helper of the movement past.
- **`ho` is M5's and its note covers M9's `ho fame`.** M9 opens no `ho` row, exactly as the brief
  required, and states the avere-states in its own rule text instead.
- **Accents and elision hold course-wide.** `src/course/types.test.ts` walks every en-it display
  the way the resolver does and proves that every apostrophe surface written anywhere in the ten
  modules — `l'italiano`, `un po' di`, `c'è`, `dov'è`, `l'acqua` — resolves to a taught row. Every
  apostrophe in the tree is the straight one. `è` / `e` and `sì` / `si` are four distinct rows.

### Two more deviations from the briefs, both deliberate

1. **`due` is M7's, not M8's.** The brief gave the numbers to M8, but M7's own pattern is
   `Ci sono + num + N-pl` and M7 comes first. Rather than write a numberless existential, M7 opens
   `due` with a note that says numbers never agree; M8 then adds `tre`, `dieci` and `venti` and its
   rule 5 names the whole counting set. The one number M8 deliberately does NOT write as a numeral
   is **six** — `sei` is `essere` for `tu` and M2 owns that key (`docs/28`, open question 12), so
   writing `sei euro` would send a tap to the copula row.
2. **`lo` is still not a row** (recorded in `docs/29`). M7 writes `lo` nowhere; the `uno` and
   `zaino` notes explain it in prose. The key stays free.

## Every example checked against the rule beside it

| example | the rule it demonstrates | holds |
|---|---|---|
| `Domani vado a Roma`, `Domani lavoro` (M6 rule 0) | present + time word IS the future | yes |
| `andrò`, `lavorerò` (M6 rule 1) | the futuro exists and is for predictions | yes — named as deferred, written in no display |
| `vado a Roma` / `vado a mangiare` (M6 rule 2) | one `a`, two seats | yes — and M6-S02's trap says the second is not an infinitive "to" |
| `vado · vai · va`, `faccio · fai · fa`, `esco · esci · esce` (M6 rule 4) | common verbs bend their stems | yes, all three |
| `la settimana prossima` / `il mese prossimo` (M6 rule 3) | the adjective follows and agrees | yes, and M6-S09's plate is the mismatch |
| `c'è` / `ci sono` (M7 rule 0) | existence agrees in number | yes — and M7-S04's plate is `C'è due libri` |
| `a + il = al`, `in + il = nel`, `su + il = sul` (M7 rule 2) | the fusion is compulsory | yes, one plate each on S01, S06 and S07 |
| `in cucina`, `a casa` (M7 rule 3) | some places take no article | yes — stated as whole phrases, not as a rule about rooms |
| `vicino a casa` (M7 rule 4) | `vicino` keeps its `a` | yes — and S09's `sotto il tavolo` is the counter-case, in the same module, so the pair is honest |
| `Quanto costa il caffè?` / `Quanto costano i libri?` (M8 rule 0) | the verb agrees with the thing | yes, and the rule names it as `piacere`'s reversal again |
| `quanto pane · quanta acqua · quanti libri · quante case` (M8 rule 1) | agreement replaces much/many | yes, one per gender-and-number |
| `due euro`, never `euri` (M8 rule 2) | borrowed and stressed-vowel nouns are invariable | yes — and `caffè` and `città` are named in the same rule |
| `un chilo di riso`, `una bottiglia di vino` (M8 rule 3) | a quantity reaches its thing through `di` | yes, and both S02 and S07 have a plate for the missing `di` |
| `ho fame · ho freddo · ho sete · ho sonno · ho caldo` (M9 rule 2) | a closed set of bare nouns on `avere` | yes, four of the five appear as displays |
| `sono stanco` / `sono felice` (M9 rule 3) | real adjectives take `essere` | yes — M9-S05's trap puts the two halves side by side and says the WORD decides, not the feeling |
| `fa caldo` / `ho caldo` (M9 rule 4) | the same noun, two verbs, two meanings | yes, and S09's variations show both |
| `penso di andare` (M9 rule 5) | the opinion frame this level uses | yes, with `penso che sia` named as deferred |
| `Anche Anna vuole un caffè` (M10 rule 4) | `anche` goes in front of what it adds to | yes — and S03's second variation moves it to show the meaning move with it |
| `Il caffè è buono e caldo` (M10 rule 2) | one accent apart | yes, and S07's plate is the sentence with the accent dropped |
| `Anna è italiana: lei è di Roma. Rohan è indiano: lui è di Delhi.` (M10 rules 0–1) | a pronoun marks a switch of person | yes — two people, so both pronouns earn their place; the variations show them dropped again when only one person is in play |

**Corrections applied during the pass.** Four, all caught before the modules were flipped:

1. M6-S01's mistake plate first read `Domani andrò a Roma` with a `why` that admitted the form was
   not wrong. A plate must be wrong Italian, so it became `Domani vado Roma` (the missing `a`), with
   the futuro point moved into the parenthesis.
2. M6-S06's and M6-S07's plates had the same defect (`Stasera non vado fuori`, `Che cosa fai domani
   sera?` — both real Italian) and became pro-drop violations instead.
3. M10-S06 originally taught only `lei`, and the pool then wrote `lui`, which the build caught by
   name: *"lui" (item L1-M10-C06) is not taught*. The turn was rewritten to carry both people and
   both pronouns, which is a better sentence as well as a resolving one.
4. M10-S07 originally re-listed `buono` — already M1's — as its only word row, which would have
   been an unreachable second row for a key M1 owns. It was rewritten around `caro`, a genuinely
   new word, keeping the `è`/`e` accent seam in the first half of the turn. The same pass added
   `calda` to M9's `caldo` row, since the pool wanted it and it is a shape of that same word.

## Index landings — every pool token, and the row it opens

Read out of the emitted `public/content/en-it/index/L1-M*.json` after a dev build. All 60 items
across the five modules resolve, and every one lands on the row it should. The landings that would
have been silent bugs:

- `fa` (M9-C03, M9-C09) → **M6's `fai` row**, whose `forms` carry the whole of `fare`, so the
  weather note in M9's rule text is reachable from the verb the learner taps.
- `dormire` (M9-C08) → M5's `dormito` row; `comprare` (M9-C07) → M5's `comprato` row; `lavorare`
  (M4-C10) → M4's `lavoro` row. Every infinitive lands on the participle or present row that
  teaches its verb, never on nothing.
- `l'acqua` (M8-C05) → M8's `acqua` row, via `forms` — and bare `acqua` (M8-C08, M8-C10) lands
  there too, which is the elision policy working in both directions.
- `quanto costa` and `quanto costano` (M8-C01, C02, C05, C12) → the two-token row, taken whole; the
  bare `costa` of M8-C06 and M8-C11 lands on M8's own `costa` row instead, which is the longest-
  match walk doing exactly what it should.
- `sono` (M7-C05, M10-C05 twice) → **M1's** row every time, never a second one.
- `e` (M10-C07) → M10's joiner row and never M1's `è`, because the accent is written.

Every `forms` list in these five holds other shapes of the SAME word only. The ones checked hardest:
`Quanto costa` holds only its plural partner (not `costa` alone, which is a separate row with a
separate job); `Dov'è` holds `dove` and `dov'è` and nothing of `dovere`, which L1 never writes;
`fai` holds the four shapes of `fare` and nothing of `fare` used as "to make a present"; `caldo`
holds its four adjective shapes and nothing of `caldo`'s noun uses, which are the same word.

## Smoke — by test, never a browser

`src/course/enItAuthored.test.tsx` walks all ten rungs, and two checks were added for this issue:
M10's turns render whole — two or three sentences to a card, with every sentence inside a turn
inside the module's own per-sentence bound (the #111 / #194 check: the format needed no schema
change) — and M10-S06 renders `lui` and `lei` as two separate word rows.

## Open questions for a native or fluent Italian reader

Numbering continues from `docs/29`'s thirty-six.

### Naturalness and idiom — the ones I am least sure of

37. **`Stasera vado a mangiare`** (M6-S02) glossed as "I'm going out to eat". Is the bare
    `vado a mangiare` natural on its own, or does it want a destination (`vado a mangiare fuori`,
    `vado a cena`)?
38. **`Domani parto presto`** (M6-S08) and the claim that `partire` is leaving FOR somewhere.
    S08's plate says `parto a Roma` is wrong and `parto per Roma` right. Correct, or does
    `partire per` sound bookish beside `vado a`?
39. **`Il pane è nel piatto`** (M7-S06), with the trap "Italian puts food IN a plate". True as far
    as I know, but is `nel piatto` what a person says, or is `sul piatto` equally normal?
40. **`Il bar è vicino a casa`** (M7-S08). `vicino a casa` with no article — right, or does it want
    `vicino a casa mia`?
41. **`La stazione è qui`** (M7-S10) and the choice of `qui`/`lì` over `qua`/`là`. `là` is avoided
    on purpose (the accent seam with `la`); is `qui`/`lì` the natural pair, or is `qua` commoner in
    speech?
42. **`Quanto costa un chilo di pane?`** (M8-S02). Bread is usually sold by weight in Italy, so this
    should be the market question — but is a whole kilo the natural unit to ask about?
43. **`Voglio tre caffè, per favore`** (M8-S03). `voglio` with `per favore` at a counter: is the
    pairing natural, or does the politeness of `per favore` clash with the directness of `voglio`
    enough that only `vorrei` belongs there?
44. **`una bottiglia di acqua`** (M8-S07 variation, M8-C10) rather than `una bottiglia d'acqua`.
    The course-wide elision policy keeps `d'` out of L1. Is the unelided form merely stiff, or is
    it wrong enough that the policy should carve out an exception?
45. **`Ho sonno, quindi vado a casa`** (M9-S08). Natural, or does it want `vado a dormire` /
    `vado a letto`?
46. **`Allora vado a mangiare`** (M10-S04) and the claim that `allora` announces a decision while
    `quindi` states a consequence. Is that distinction real and teachable, or over-drawn?
47. **`Prego`** (M10-S08) taught as the answer to `grazie`, with its other jobs named. Is `prego`
    what people actually say, or is `di niente` / `figurati` commoner among friends?
48. **`Grazie mille`** (M10-S10). Natural, or does it read as tourist Italian?
49. **The whole of M10-S10** — `Buongiorno! Vorrei un chilo di pane, per favore. Grazie mille.` —
    is offered as proof that the tu-only decision survives a shop counter. Does it read as a real
    transaction, or as a course sentence?

### Grammar claims I would most like checked

50. **`ogni` takes a singular noun** (M6-S01 note and plate). Certain, but the plate implies
    `tutti i giorni` is the plural alternative — is that the right pairing?
51. **`vedo Anna` with no preposition** (M6-S05), taught against the Spanish habit of a personal
    `a`. Correct, but is `vedo Anna` the natural way to say "I'm seeing Anna tomorrow", or does an
    Italian say `esco con Anna` / `ci vediamo`?
52. **`in cucina` with no article** (M7-S05), with the note admitting `in salotto` and `nel
    salotto` both occur. Is that hedge accurate, and is `in cucina` the safest example to build the
    rule on?
53. **`sotto il tavolo` without `a`** (M7-S09), set against `vicino a casa`. Both correct as far as
    I know; `sotto al tavolo` also occurs in speech, and the plate calls it wrong. Is the plate too
    strict?
54. **`euro` is invariable** (M8-S04). Certain in the standard; is `euri` genuinely only a joke, or
    regionally real?
55. **`Costano dieci euro` with no subject at all** (M8-S08), and the plate that calls `Loro
    costano` wrong because `loro` is for people. Is that the right way to state it?
56. **`piove` with no subject** (M9-S10) and its past `ha piovuto` named in the note. Correct, but
    `è piovuto` also occurs — should the note say so?
57. **`Fa caldo`** (M9-S09) against `È caldo`, where the plate says `È caldo` would be about a
    particular thing. Accurate?
58. **`anche` in front of what it adds to** (M10 rule 4 and S03). The rule claims moving `anche`
    moves the meaning, and the second variation demonstrates it. Is `Anna vuole anche un caffè`
    really "a coffee as well as something else", or is the contrast weaker than stated?
59. **`Anche io`** (M10-S03 variation) rather than `anch'io`. `anch'io` is the usual written form
    and it is an elision the course policy keeps out. Is the unelided `anche io` acceptable, or
    should this be the one carve-out?

### Sound notes — nothing here can be heard by the author

60. The new claims in these five, all derived rather than heard: `do-MA-ni`; `sta-SE-ra`;
    `PREN-do` and `TRE-no` with close `e`s; `set-ti-MA-na` and `PROS-si-ma` with held doubles;
    `ES-ko` with the note that `sc` is hard before `o` and `sh` before `i`/`e`; `FAI` as one
    syllable; `SOOL`; `do-VEH`; `CHEH` for `c'è` and `chee-SO-no` for `ci sono`; `DOO-eh`;
    `ku-CHEE-na` with its two different `c`s; `PYAT-to`; `vi-CHEE-no`; `SOT-to` and `GAT-to`;
    `sta-TSYO-ne`; `KWEE`; `KWAN-to`; `KEE-lo`; `EH-u-ro`; `DYE-chi`; `AK-kwa`; `bot-TI-lya` with
    the `gli` as one sound; `RI-zo`; `FA-me`; `FRED-do`; `per-KE`; `SE-te` against `SET-te`;
    `fe-LI-che`; `SON-no` against `SO-no`; `PYO-ve`; `al-LO-ra`; `AN-ke`; `POI`; `LEY` and `LU-i`;
    `CHI-ne-ma` stressed on the first syllable; `MIL-le`. **The two riskiest are the `dz`/`ts`
    calls** — `stazione` as `TSYO`, `zaino` as `DZAI` (`docs/29`) — **and the claim that the
    doubled consonants of `sete`/`sette` and `sono`/`sonno` are audibly distinguished**, which I
    believe but cannot verify.

### Pedagogy calls the owner decides

61. **`due` in M7 rather than M8** (see the deviation above). Fine, or should M7 have found a
    numberless existential and left the whole counting set to M8?
62. **Six is never written as a numeral**, because `sei` is `essere` for `tu` and M2 owns the key.
    Is silently avoiding a number the right call, or should M8 write `sei euro` and accept that a
    tap opens the copula row, whose note names both jobs?
63. **M10's turns run 2–3 sentences and one runs to three short ones** (S01, S08, S10). Is that the
    right length for a first level, or should the ceiling be two?
64. **M10-S08 is three one-to-three-word sentences** (`Un caffè, per favore. Grazie. Prego.`) —
    three speakers' worth of a transaction in one card. Does that read as one turn or as a script?
65. **Every module keeps FULL enrichment**, though the validator only requires it through M3
    (`docs/29` open question 34 is the same question with five more modules behind it now).
66. **The register chip is `informal` on 76 of the 100 sentences across the level and `neutral` on
    the 24 that have no second person in them or are said across a counter.** Honest, or should the
    whole level be `informal` given that it speaks `tu` throughout?
