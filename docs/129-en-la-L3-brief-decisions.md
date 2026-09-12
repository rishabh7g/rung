# en-la L3 — the brief decisions (#642)

**Date:** 2026-09-12 · **Course:** en-la — English (L1) → Latin (L2) · **Level:** 3 "Fluency —
stories & opinions" · **Status:** briefs written, no content authored. The ten `ModuleBrief`s live in
`tools/course-briefs.ts` under `COURSE_BRIEFS['en-la']`, and the course-wide reasoning is in that
file's header section, "## en-la L3: the decisions, taken against the finished L2 (#642)".

This file records the five decisions a reader would otherwise reconstruct from fifty notes, and the
one number every brief was planned against.

---

## 0. The index the level was planned against

**330 surfaces through L2-M10, `maxSpan` 1**, folded across all twenty emitted files rather than read
off the last one. From #424 each index file's `surfaces` holds only what that module is the first to
teach while `surfaceCount` stays cumulative, so `L2-M10.json` reports 330 over a delta of eight keys.
Stated as arithmetic so it is checkable:

```
L1: 24 + 20 + 18 + 24 + 11 + 16 + 16 + 24 + 21 + 15 = 189
L2:  9 + 17 + 23 + 12 + 11 + 14 + 13 + 14 + 20 +  8 = 141
                                              total = 330
```

Confirmed live: `npm run content:prompt -- en-la L3-M1` reports
`PROMPT .prompts/en-la-L3-M1.md ok (330 surfaces through L2-M10)`.

---

## 1. The subjunctive enters at M4, once, in one tense

L2 wrote exactly two subjunctives and explained neither — `velim` (L2-M1) and `eāmus` (L2-M6), both
fixed forms — and every brief in that level pointed here. **L3-M4 is the one module in the course
where a mood is opened**, and the discipline that makes it affordable is that it opens in the
**present subjunctive only**:

- `sī` + indicative for an open condition (`sī venit, gaudeō`) against `sī` + subjunctive for the
  ideal (`sī veniat, gaudeam`). The mood is the whole difference, and both halves move together — a
  mixed pair is the module's first mistake plate.
- `ut` + subjunctive for purpose, `nē` + subjunctive for its negative. **There is no `nōn` in a
  purpose clause**, and reaching for one is the second plate.
- `possum` lands at M2 (three persons plus the infinitive frame) and M4 writes `sī possum` rather
  than `possim`: a subjunctive of an irregular verb inside a mood being opened for the first time is
  one thing too many. `potuī` and every perfect of `possum` are L4's.

Every subjunctive is **its own row** rather than a `forms` entry of its indicative, for L1-M5's
reason about perfect stems: folding `veniat` into `veniō`'s row would hand a mood's note to the plain
present.

### 1.1 `nē` — the last of the reserved keys, and its owner

`docs/123` §1.1 listed `ne` against `nē`. L1-M2's question particle donates the key `ne` through
`surfaceIndexKeys('agis-ne')`, and `nē` with the bar is a **different key**, because rule 4 of
`src/engine/surface.ts` folds case and never a diacritic — checked against the real file, not
assumed. The key was kept free through thirty modules and **M4 spends it**. After this level the
reserved list holds only `legēbam`, `habēbam`, `eram`, `domī`, `venī`, `rosa`/`rosā`, `nōnne`, `num`
and `sīc`.

---

## 2. The accusative and infinitive: M3 for opinion, M5 for report

`putō eum venīre` is "I think that he is coming", built as "I-think him to-come" — the person becomes
an **object**, the verb becomes an **infinitive**, and **nothing joins the two halves**. It is the
largest structural difference between Latin and English anywhere in this course, which is why it is
split across two modules rather than taught once:

- **M3** opens it on opinion, with `eum`, and **only the present infinitive**, whose tense is
  relative — "at the same time as the main verb", not "now". One clause says so and the module stops.
- **M5** carries it into reported speech and adds the two things report needs: the reflexive `sē`
  (`dīcit sē venīre` = he himself is coming; `dīcit eum venīre` = someone else is) and the **perfect
  infinitive** (`dīxit sē vēnisse` = he said he HAD come). English's "was coming" and "had come" are
  one tense-step apart in Latin and the step is in the infinitive, not in `dīxit`.

The mistake plate is the English `quod` clause, `putō quod venit`. It is wrong twice over — it is not
the construction being taught, and `quod` is already L1-M9's "because" — and a `mistake.display` is
exempt from the index by design (#491), which is the only reason it can be written at all.

---

## 3. Three homographs, three owners, one meaning each — and two shapes of the relative lost

The shared index has cost this level more than any other level in the course.

- `quod` → **L1-M9's "because"**. So the **neuter relative** is named in prose and written nowhere.
- `quam` → **L2-M9's "than"**. So the **feminine accusative relative** is named in prose and written
  nowhere.
- `ut` → fresh, and the sharpest: in full Latin it is "so that", "as", "when" and "how". **M4 writes
  the purpose reading only**, so the key carries one true note.

First occurrence wins, and none of these would fail a build: a neuter relative `quod` would resolve
to a note reading "because" and the learner would simply be told the wrong thing. So **M2 writes
`quī`, `quae` and `quem`** and says out loud that Latin's relative is a five-shape word of which this
course writes three. Naming a gap is the only honest move available, and it is the third time this
course has had to make it — after `ēsse` (L2-M5) and `Mārce` (L2-M7).

---

## 4. Festivals are Roman, and the gap is named rather than filled

M9's alternative was to name the learner's own festivals in Latin, and it was **rejected**.
`docs/123` §7 allows exactly one named source for modern words — the Vatican's *Lexicon Recentis
Latinitatis* and the settled usage of the living-Latin community — and that source has a telephone
and a bicycle in it and does not have Diwali or Christmas Eve. Coining is banned course-wide.

So M9 teaches `Sāturnālia` (**plural, with no singular at all** — `Sāturnālia sunt`, never `est`) and
`diēs nātālis`, and says in a usage line that these are the Romans' festivals rather than the
learner's. It is the same decision M7 took for the telephone and M8 takes for the office, from the
same source, and it is the third time the course chooses a named gap over an invented word.

---

## 5. A correction to the issue's own wording, recorded rather than silently applied

#642 asks M6 for "the impersonals `mē pudet`/`mē taedet` and the dative of the experiencer". **Those
two verbs take the accusative, not the dative.** `pudet` and `taedet` take the accusative of the
person who feels it (`mē pudet`); `placet` and `libet` take the dative (`mihi placet`). Both are
impersonal and both are "it VERBs me" in English, which is exactly why they are worth one module.

The briefs therefore teach **two impersonal patterns in two different cases**, side by side, with the
wrong case as the mistake plate — and that is more useful than either pattern alone, because twenty
modules have taught the dative one (`mihi opus est` at L1-M3, `mihi placent` at L1-M7) and nothing
has prepared the accusative one. The thing felt about is a **genitive** (`mē pudet erroris`), which
gives that case its second job after L2-M2's possession; M8's genitive of price is its third and L3
opens no fourth.

---

## 6. What L3 withholds, and where each piece lands

Named as deferred in the module that would otherwise reach for it:

- **The imperfect**, and every past but the perfect — M1 wants it for a habitual day and M10 for
  eight sentences. **L4-M8.** `legēbam`, `habēbam` and `eram` are still free after thirty modules,
  and M1's relief is that `dum` takes the **present** even for past time, so background action needs
  no imperfect at all.
- **The gerund** — M2 wants `ad vīvendum` for purpose and gets `ad` plus a plain noun. **L4-M1.**
- **The passive** — M6's `sollicitus sum` is L2-M8's participle-as-adjective for the second time.
  **L4-M7.**
- **The locative `domī`** — M7's `melius est … manēre` wants it and writes `domum` instead. **L4-M9**,
  which will be twenty-nine modules after it was first named as deferred.
- **The plain possessive** `meus` and `eius` — M5 opens `suus` reflexive only, because one module
  cannot open a possessive system and a reflexive at once. L2-M2 already said the course has no
  possessive and stated the gap.
- **`potuī`** and every perfect of `possum` — M2 opens three persons and an infinitive frame.
- **The indirect question**, which needs a subjunctive inside a reported clause. **L4.**
- **`ȳ`** in any word — #631 measured it as undrawn by every bundled face, and M8's Greek loan
  `charta` sidesteps it. Nothing in the build catches a character the font cannot draw.

---

## 7. Open questions this level inherits and adds

Standing: the forty-four in `docs/123` §11, `docs/124` §6, `docs/125` §5, `docs/126` §6, `docs/127`
§6 and `docs/128` §1.7, §2.7 and §3.7 — all still unanswered, because the gate is a fluent speaker of
living Latin and that reader has not seen the course. Added by these briefs:

1. **Is a three-shape relative teachable, or does naming two shapes as absent do more harm than
   writing them?** The index forces the choice, and the alternative — accepting that `quod` resolves
   to "because" — is worse. A teacher may say a learner is better served by the full paradigm and a
   wrong note on one cell.
2. **Does the accusative and infinitive belong at M3, or should opinion wait for M5 and arrive with
   report in one go?** Splitting it spreads the hardest thing in the course over two modules; teaching
   it once would make M5 the biggest rung in the level.
3. **Is `sī veniat, gaudeam` a natural pair for a learner, or is the ideal condition a literary
   shape they will never produce?** M4 teaches it because the mood has to be opened somewhere and a
   condition is where the contrast is visible.
4. **Should M9 teach a Roman festival at all**, or should the module be about weather, markets and
   the street — "what is happening around you" without a calendar? §4 chose the festival; the
   alternative avoids the culture question entirely and may be the more useful module.
5. **Is `officīna pūblica` the right borrowing for an office**, and does M8's decision to be about
   the transaction rather than the bureaucracy leave the job half done?
6. **Is `discō` enough for "study"?** M2 writes `linguam discō` and leaves `studeō` — which takes the
   dative and would be a fourth job for that case — out.
