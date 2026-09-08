# en-fr L2 — the authoring-brief decisions (#431)

The ten en-fr L2 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['en-fr']` L2-M1…L2-M10), pinned
against the REAL cumulative index — `public/content/en-fr/index/L1-M10.json`, rebuilt and read on
2026-09-08: **175 surfaces, maxSpan 4** — the widest span in the repo, and it is `à côté de la`.
The L1 decisions carry unchanged: elision keeps the apostrophe inside a token, accents are letters
and capitals keep them, questions are intonation and fronted question words, every homograph has a
named owner.

## 1. Register — `tu` enters at M1, as a paradigm, and the switch has a VERB

L1's decision 1 was explicit: every second-person line is `vous`, `tu` stays out of `display` and
out of every `forms` list, and M2's notes name it in prose as what a later level owes. This is that
level. M1 opens `tu es`, `tu as`, `tu veux`, `tu peux`, `tu vas`, `tu fais`, `s'il te plaît`.

The law is L1's: `vous` is never wrong with a stranger, a shopkeeper, an official or a new
colleague; `tu` is for friends, family, children and people who have offered it. The fact for
`usage`, not a rule: French has verbs for this — `tutoyer`, `vouvoyer` — and the switch is asked
for out loud (`On peut se tutoyer?`), as Russian asks `Davay na ty`.

Who speaks what: M4, M7, M8 `vous` (chipped `formal`); M6 `tu` (`informal`); M1 shows the pair; the
rest follow the scene and say which in `usage`.

**`je voudrais` enters at M1, as one frozen cell.** L1 kept it out by name; M5's ordering job needs
it. Its note says which tense it belongs to and that the tense is **L3-M4's**. `pourriez` and
`j'aimerais` are named, never written.

## 2. The negated partitive — the rule L1 set up and could not state

L1-M3 taught `du` / `de la` / `des` and `ne … pas`, and never put them in one sentence. M5 does:
**after a negation every partitive collapses to `de`** — `Je ne veux pas de café`. No exception
worth a learner's time, and `*pas du café` is what every untold English speaker writes.

## 3. Clitics — `me`, `te`, `moi`, `toi` only

The third time this repo takes the same ruling in the same level (en-es on `lo`/`me`/`te`, en-it on
`lo`/`li`/`mi`/`ti`): `le`, `la`, `les` are L1-M1's articles, so the object pronouns spelled
identically can never be first-taught. M5 teaches the placement law on `me`/`te` and the stressed
`moi`/`toi`, and defers the direct-object series to L3. `en` and `y` as pronouns are deferred for a
second reason too — `en` is M4's preposition.

The French addition, mirroring en-it's `aiutarmi`: elision fuses a clitic to what follows, so
`m'aider` is ONE key. M8 owns it and says where the `me` went.

## 4. `ne` is written; the spoken drop is named in prose

Spoken French drops `ne`. This course writes it in every `display`, `forms` entry and pool item —
not out of prescription but because writing both would fork one negation into two surfaces and
give a learner tapping either half the rule. **One `usage` line at M7** names the drop, because a
phone call is where it is first heard. Same shape as en-ar's dialect rule and hi-en's
Indian-English rule.

## 5. What L2 withholds, and what M10 finally teaches

Out, named where it would be reached for: the **subjunctive** (M4 ships `il faut` + infinitive as a
frozen impersonal and stops); the **conditional** as a system (L3-M4, `je voudrais` the single
frozen exception); the **plus-que-parfait**; **reported speech**; **object `le`/`la`/`les`, `en`,
`y`**; the **full inversion system** — `est-ce que` is this level's question marker and inversion
appears only inside frozen request frames.

M10 takes the decision L1 set up: the **imparfait** against L1-M5's passé composé. Same law and
same dead slogan as en-es's, en-ru's and en-it's M10 — "one is for completed actions, the other for
ongoing ones" — and the four courses say it in the same words. The auxiliary law is stated at last:
`être` for movement, change of state and reflexives, participle agreeing with the subject; `avoir`
for everything else, no agreement.

## Seams L2 adds

- `est-ce que` (M1) splits on its hyphen into `qu'est` and `ce` as well as indexing whole — three
  keys, one row, the en-ar hyphen law in French.
- `à gauche` / `à droite` (M4) ride whole, keeping L1-M4's `à` on its own row.
- `droite` ("right") against `tout droit` ("straight on") — one letter, opposite directions; M4
  catches it in a mistake block.
- `là` (M7) is not L1-M1's `la`: the accent is the whole difference.
- `c'était` (M10) is a separate key from L1-M8's `c'est`; `beau` and `bel` (M3) are separate keys;
  `sœur` must carry the ligature or it forks.
- `que` (L1-M9) gains the comparative job at M9; `aussi` (L1-M10) gains equality; `marche` (M6)
  gains "it works" at M8; `mal` (M8) must be true of `j'ai mal` and the adverb alike.
- `le lundi` stays L1-M4's two-token surface and bare `lundi` is a fresh M6 key — the learner has
  met the phrase for two levels without meeting the word.

## Bounds and shape

Bounds climb 8 → 10 (M1–M3: 8, M4–M7: 9, M8–M10: 10); pools to 12; M1–M3 fully enriched; M10's
items are four-sentence accounts. `npm run content:prompt -- en-fr L2-M1` renders from the real
index, and the decisions are pinned by `tools/course-briefs.test.ts`
(`en-fr L2: the decisions its briefs settle (#431)`).
