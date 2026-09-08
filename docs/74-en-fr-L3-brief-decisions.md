# en-fr L3 — the authoring-brief decisions (#467)

The ten en-fr L3 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['en-fr']` L3-M1…L3-M10) are the
seventh L3 briefed. Every seam below was pinned against the REAL cumulative index — the fold of
`public/content/en-fr/index/L1-M1.json` through `L2-M10.json`, rebuilt and read on 2026-09-08:
**542 surfaces, maxSpan 4** — and against the review chain the level inherits, `docs/43` (spoken
French) and `docs/66`'s L2 questions.

This note records the decisions the briefs are written to, so the authoring waves (#476, #485 and
the M6–M10 issue) inherit them without re-deriving anything. The briefs repeat each decision in the
module notes, because a prompt only ever shows an author the notes.

## 1. The two laws this course already had, carried into L3

- **The `ne` is WRITTEN** in every display, and the spoken drop is named in prose and never shown
  (`docs/58` §4). L3 leans on it harder than L2 did, because `jamais` (M1), `ne … pas que` (M3) and
  every negative in M8's office register all need it. A learner who writes what they hear has
  produced something no French text contains.
- **Straight apostrophes only**, one spelling per display, and every elided form is **ONE key with
  the elision inside it** — `d'habitude`, `m'habille`, `s'il`, `qu'on`, `d'attendre` — answering
  for nothing else. A reflexive meets a vowel constantly at this level, so the ratchet will find
  any slip.

Register carries from `docs/58` §1: `tu` entered at L2-M1 as a paradigm and the switch had a verb.
M8 (counters, offices) speaks `vous` and chips `formal`; the rest follow the scene.

## 2. What L2 withheld, and where each piece lands

`docs/58` §5 named six things. Each has an owner:

- **The subjunctive → L3-M3**, on the two triggers a learner cannot avoid: `je ne pense pas que`
  and `il faut que`. Four cells of three verbs (`soit`, `ait`, `puisse`, `aille`); the mood as a
  SYSTEM is L4's. `il faut que` is the payoff L2-M4 set up when it shipped `il faut` + infinitive
  as a frozen impersonal and stopped — and the escape hatch is worth as much as the rule, because
  `il faut` + infinitive needs no subjunctive at all.
- **The conditional → L3-M4.** `je voudrais` shipped at L2-M1 as the single frozen exception; M4's
  job is to show it was a tense all along. The endings are the futur stem plus the imparfait
  endings, which is a real economy and is stated once.
- **Reported speech → L3-M5.**
- **Object `le` / `la` / `les`, plus `lui` and `leur` → L3-M5**, as MULTI-TOKEN surfaces with their
  verb.
- **The plus-que-parfait → not taken.** M4 keeps exactly one counterfactual frame (`si` + imparfait
  + conditionnel) and names the `si j'avais eu … j'aurais …` version as L4-M3's.
- **The full inversion system → not taken.** `est-ce que` remains the question marker.

**Relative clauses** were not on `docs/58`'s list and are opened at **L3-M9**, because describing a
festival to somebody who has never heard of it is the first job in the ladder that cannot be done
without one.

## 3. The collision `docs/58` predicted, paid with whole surfaces

`le`, `la` and `les` are L1-M1's ARTICLE keys forever, which is why L2 could not teach the object
clitics spelled the same. M5 pays it with the multi-token tool: `je l'ai vue`, `je les connais`,
`je lui ai parlé` — each a key of its own, with the note saying why the bare word underneath is an
article. Same tool as `à gauche` and `est-ce que`, and the reason `maxSpan` is 4.

The participle agreement travels with it, and **it is a writing-only rule**: on `avoir` the
participle agrees with a PRECEDING direct object and with nothing else, and the `-e` and `-s` that
carry it are silent. `docs/58` said so for L2-M10 and it holds here — which is exactly what makes
an eight-sentence account (M10) the only honest test of whether a learner has it.

## 4. Seams — L3 never edits an L1 or an L2 file

- `que` stays L1-M9's row across all of its jobs — the complementiser, M3's opinion clause, M5's
  reported clause, M9's object relative — with each brief's note written true of the job it uses.
  `qui` is fresh at M9; `dont` is named in `usage` and not taught.
- `si` is M4's fresh key, and M3's `même si` indexes **whole** precisely so as not to spend it.
  `s'il` is a separate key with the elision inside it.
- `me` and `te` stay L2-M5's rows; M1's reflexives are separate VERB keys, and M6's `je me sens`,
  `j'ai peur`, `j'ai envie de` index **whole** so bare `me` is not spent.
- `on` stays L2-M6's row (the "we" job); M8's impersonal `on paie` / `on signe` and M9's cultural
  `on` index whole rather than opening a second family.
- `mal` and `tête` stay L2-M8's rows; M7 adds only the **contraction** (`au dos`, `aux dents`) and
  the definite-article rule.
- `je voudrais` stays L2-M1's frozen row; M2's `dois`/`peux`/`veux` and M4's conditional cells
  point back at it rather than overwriting it.
- `il faut` stays L2-M4's whole surface across M2, M3, M4 and M8.
- Every reflexive verb (M1), conditional cell (M4), backshifted cell (M5) and participle (M5, M10)
  is its own key where it is a separate word and a `forms` entry where it is a shape of one.

## 5. The shape of the level

- Bounds climb 10 → 12: M1–M3 at 10 words, M4–M7 at 11, M8–M10 at 12 — continuing L2's 8 → 10.
- `newWordCap` stays the PRD §5 25 everywhere; pools are authored to 12.
- Two small facts are stated because they are traps rather than grammar: `si` elides to `s'` before
  `il` and **only** before `il` (M4), and `que` elides before a vowel while `qui` **never** does
  (M9). A learner who has learnt one elision rule will apply it to both.
- The delta that repeats across four modules and is worth naming once: French, like Italian and
  Russian, needs **no perfect** for a still-true duration — `depuis` plus the present does it (M7),
  where English cannot manage without one.
- M10's items are six-to-eight-sentence accounts. L2-M10 opened the imparfait against the passé
  composé in four sentences; eight is where a learner either has it or does not, and the test of a
  good item is that swapping one pair changes **what happened** rather than only how it sounds.

`npm run content:prompt -- en-fr L3-M1` renders today from the real index, and the bounds, the
withheld-piece owners, the written `ne`, the elision law, the writing-only agreement and the L4
deferrals are pinned by `tools/course-briefs.test.ts`
(`en-fr L3: the decisions its briefs settle (#467)`).
