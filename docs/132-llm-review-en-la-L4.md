# en-la L4 — the LLM review

**Course:** en-la — English (L1) → Latin (L2) · **Level:** 4 "Nuance — say it the way they do" ·
**Bar:** LLM review, authorised by the repo owner. **The fluent-speaker gate is unmet**, and each
section below ends in its own open questions.

One document, one section per authoring wave, in the shape `docs/130` uses for L3.

---

## Wave 1 — L4-M1, L4-M2 and L4-M3 (#647), 2026-09-12

Authored in ladder order against the L4 briefs (#646) and the decisions in `docs/131`, rebuilding
between modules. All three signed
`verifiedBy: "Claude Opus 5 — LLM review, authorised by repo owner"`, `verifiedAt: 2026-09-12`.

### 1.1 What was checked

- **`npm run content:validate`** → all three `ok`; `CONTENT 505/505 ok`.
- **The strict build** → `en-la: 33 modules (L1-M1..M10, L2-M1..M10, L3-M1..M10, L4-M1..M3)`,
  `index L4-M1: 496 surfaces`, `L4-M2: 502`, `L4-M3: 538`, and **no `shown but untaught` line at any of
  the thirty-three**.
- **The folded index** — 538 surfaces against a `surfaceCount` of 538, `maxSpan` 1.
- **The orthography sweep** — 3,414 readable Latin strings: zero `j`, zero apostrophes, zero acutes,
  zero combining marks, zero non-NFC, nothing outside the ten macron letters and ASCII, no `script`
  line, no hyphen outside `-que`/`-ne`/`-ve`. The 246 `mistake` plates swept separately.
- **`git diff --stat`** over every L1, L2 and L3 module is **empty**.

### 1.2 The module's own rule caught the module

`docs/131` and M1's rule 2 both warned that the gerund and the gerundive "will sit in the emitted index
as one key if an author is careless, and the learner will be shown the wrong half". **They did**, and
in both directions:

| Key | Owner | What the other appearance is |
|---|---|---|
| `legendum` | `L4-M1-S01` — the **gerund** after `ad` | S03's impersonal **gerundive**, `legendum est` |
| `scrībendum` | `L4-M1-S06` — the **gerundive** in `forms` | S09's **gerund** after `ad` |

Neither collision fails a build. A learner tapping `legendum` in `Legendum est` would have been shown
a note reading "a GERUND, which is a verb used as a noun" — true of the other sentence and wrong for
theirs.

**The fix is the remedy `docs/131` §4 prescribed for `cum`, applied one module early:** both notes now
name **both** readings and say the frame decides. Withholding one reading was not available — the
module's job is to teach the pair — and renaming the rows would only have moved the wrong note to the
other sentence. This is the first time in this course a collision has been between two shapes of one
*module's own* teaching rather than with a lower level's key.

### 1.3 Four deferred systems, and the first of them landed

`docs/131` §1 listed four promissory notes coming due in this level. M1 honours the first: **the
gerund**, which L3-M2 named as missing while writing `ad labōrem eō`. It arrives beside its gerundive,
and the module's whole cap goes on the two `-nd-` shapes because a set of steps costs no grammar at all
— L2-M10's sequencing adverbs plus L2-M5's imperative, and nothing more.

The other three are still owed: the passive at M7, **the imperfect at M8** (`legēbam`, `habēbam` and
`eram` confirmed still free at 538 surfaces), and the locative at M9.

### 1.4 The past counterfactual, written in full

`docs/131` §2 settled that Latin has the form and this course writes it. M3 does:
`sī vēnissēs, vīdissēs`, the **pluperfect subjunctive in both halves**, plus the **imperfect
subjunctive** for the present unreal (`sī venīrēs, gaudērem`). Two new subjunctive tenses in one
module, which is the largest grammatical spend anywhere in en-la.

It is affordable because everything else in the module is L3's: `aeger`, `medicum`, `mē pudet`,
`errāvī`, `hōrā prīmā`, `linguam discō`. Only `utinam`, `nisi`, `vellem` and `tempus` are new words.

Three things the module gets out of that:

- **`velim` was this mood all along.** L2-M1 taught it as a fixed form, L3-M4 explained `sīs`, and
  `vellem` is `velim`'s imperfect subjunctive — so the pair works exactly as S03 works against S01:
  `velim` wishes for something still open, `vellem` for something closed. **Twenty modules of using a
  word before learning what it was**, for the third deliberate time in this course.
- **`nisi` is the fourth word with a negative inside it**, after `nōlō`, `mālō` and `negō`, and its
  plate is `nisi nōn` — two negatives cancelling, which is L3-M5's `negat sē nōn venīre` error on a
  different word. `utinam` is not a negative and takes `nōn`, which is the distinction S05 and S06
  set against each other.
- **S09's plate reaches for `eram`**, the key M8 is owed. It is the sharpest way to say that the
  indicative imperfect is not this module's: a learner who writes `nisi aeger eram` has invented a form
  they have never been given *and* put the wrong mood in a counterfactual.

### 1.5 The ablative's sixth job, and the frame English does not have

M2 gives the ablative **cause** — `timōre nōn vēnī` — which is its sixth job after `opus est`, `in`
and `cum`, means, time and comparison, and the sixth to work by the ending alone. `propter` plus the
accusative is the same idea with a preposition, exactly the pair L2-M4 set up for means, and one plate
puts a preposition in front of the bare ablative (`propter timōre`) to fence it.

`ideō … quia` is the module's real find: "for this reason … because", a frame that sounds redundant in
English and is standard in Latin, because `ideō` announces that a cause is coming and `quia` delivers
it. Against `itaque`, which draws the consequence after the fact, that gives a learner both orderings —
and the module's rule states the whole connective inventory as a list, because it is now **seven that
must come first, six that must come second, and five that join from the front**, and nothing about a
word's meaning says which group it is in.

`quod` stayed L1-M9's. M2's rule says so out loud and one plate spends itself on `quod` for `quia`,
because a paragraph of causes is exactly where an author reaches for variety.

### 1.6 Corrections made during the wave

- **L4-M1 was written with `prerequisites: ["L3-M10"]`** and `validate.ts` rejected it: a prerequisite
  must come earlier **in the same level**. A level's first module takes `[]`, as L2-M1 and L3-M1 do.
- **Three modules were written with enrichment blocks missing** — M1–M3 of any level ship fully
  enriched — and twenty-one `sound` lines, `mistake` plates and `mnemonic`s were written rather than any
  module being demoted. That is the second wave running where this rule has cost real work, and it is
  the rule doing its job.
- **One note ran to 201 characters** against a 200 limit, and was shortened rather than the limit
  being questioned.
- Six shapes were shown before they were owned and each went into its own lexeme's row: `signanda`,
  `scrībās`, `habuissem`, `veniās`, and the subjunctive sets of `discō` and `videō`.

### 1.7 Open questions for the fluent-speaker gate

Additions to the seventy-six standing in `docs/123` §11, `docs/124` §6, `docs/125` §5, `docs/126` §6,
`docs/127` §6, `docs/128` §1.7, §2.7, §3.7, `docs/129` §7, `docs/130` §1.7, §2.8, §3.8 and `docs/131`
§8.

1. **Is `ad legendum` or `legendī causā` the commoner purpose?** M1 writes the first because `ad` is
   L1-M4's and `causā` would be a seventh job for the ablative in the same level.
2. **Does a learner need the gerund AND the gerundive in one module?** They are one ending apart and
   §1.2 shows the index cannot keep them separate. Splitting them across M1 and M2 was the alternative
   and would have left M1 without its obligation.
3. **Is `ideō … quia` alive, or a textbook frame?** Asked of the brief in `docs/131` §8 and now asked
   of ten sentences. M2 leans on it for the whole level's causal machinery.
4. **Is `timōre nōn vēnī` natural, or does the ablative of cause want a noun of emotion only?** The
   module writes `timōre` and `errōre` and nothing else, which may be the right instinct by accident.
5. **Is teaching two subjunctive tenses in one module right?** `docs/131` §8 asked it of the brief;
   the content is now written and the module has ten sentences and four new words, which suggests it
   was affordable. A teacher may still say the present unreal belongs with the potential subjunctive at
   M5.
6. **Is `vellem vēnissem` idiomatic**, or does `vellem` want `ut` and a subjunctive? M3 writes the bare
   pluperfect on the model of `utinam`.
---

## Wave 2 — L4-M4 through L4-M7 (#648), 2026-09-12

Four rungs, authored in ladder order against the L4 briefs (#646), rebuilding between modules. All
four signed `verifiedBy: "Claude Opus 5 — LLM review, authorised by repo owner"`,
`verifiedAt: 2026-09-12`.

This is the wave that spends the second of `docs/131` §1's four promissory notes: **the passive, at
M7**, which L2-M8 and L3-M6 both pointed at while teaching a participle as an adjective.

### 2.1 What was checked

- **`npm run content:validate`** → all four `ok`; `CONTENT 512/512 ok`.
- **The strict build** → `en-la: 37 modules`, `index L4-M4: 545 surfaces`, `L4-M5: 559`, `L4-M6: 573`,
  `L4-M7: 593`, and **no `shown but untaught` line at any of the thirty-seven**.
- **The folded index** — 593 surfaces against a `surfaceCount` of 593, `maxSpan` 1.
- **The orthography sweep** — 3,863 readable Latin strings: zero on every count. The 256 `mistake`
  plates swept separately.
- **`git diff --stat`** over every module below L4-M4 is **empty**.

### 2.2 The abbreviation decision, executed and read back

`docs/131` §3 settled it by running `surface.ts`, and the emitted index confirms the execution:

| Written | Key in the index |
|---|---|
| `SPQR` | `spqr` — `L4-M7-S05` |
| `S.P.Q.R.` | **absent** |
| `D.M.` | **absent** |

One row, one key, the expansion in the note, and neither dotted spelling anywhere in the course. The
row's `display` is `spqr` in lower case, which is this course's convention for every proper noun
(`mārcus`, `iūlia`, `sāturnālia`) while the sentence carries the capitals — worth recording because an
abbreviation is the one place that convention looks odd.

`SPQR` also contains a piece of grammar this course taught thirty modules ago: the `-que` of
`Senātus Populusque Rōmānus` is L1-M10's enclitic doing its ordinary job, and S05's trap says so.

### 2.3 `cum`, and the remedy that could not be withholding

`docs/131` §4 predicted that L3's remedy for `quod`, `quam` and `ut` — write one reading, name the
other in prose — **would not be available here**, because a time clause is M6's job. Read back:

```
cum -> { moduleId: 'L1-M7', sentenceId: 'L1-M7-S10' }
```

The key never moved, as it could not. So **every `cum` row in M6 carries a note naming both readings**
and saying which is which, and the signal is stated as a rule: a case after `cum` means "with", a mood
means "when". S01's plate is `cum vēnit` — the indicative — and its `why` names the second danger:
`cum vēnit` could be read as "with he-comes", which is nothing at all.

That is the second collision this level has had to solve by doubling a note rather than by withholding
a reading. §1.2 was the first, and both were predicted in the brief.

### 2.4 `dōnec` takes both moods after all

The brief said `dōnec` takes the indicative only, the fourth homograph handled the L3 way. **Writing
the module showed that is not tenable**: you cannot wait for something in the indicative before it has
happened, so `dōnec veniat, exspectābō` ("I shall wait until he comes") needs the subjunctive and no
other shape will do.

So the rule as shipped is **"indicative for a fact, subjunctive for a thing still to come"** — S03
teaches the first half and S08 the second, and S03's plate is a subjunctive borrowed from `cum` two
sentences above. This is a correction to `docs/131` §4 arrived at by authoring, and it makes M6 a
module with **two** time conjunctions of opposite defaults rather than one clean pair.

### 2.5 The imperfect borrowed, and the one key not spent

A `cum` clause about the past needs a past beside it, and the perfect would make every sentence in M6
a single finished event. So M6 writes **three imperfects** — `gaudēbam`, `labōrābam`, `exspectābam`,
plus `veniēbam` in a variation — as shapes the course has not yet taught, and every one of their notes
says M8 is where the tense is explained.

**`legēbam` was caught by the pool gate and removed.** It is one of the three keys L1-M5 named for
M8 and every review doc since has confirmed free, and a pool item had reached for it. The variation and
the pool item were rewritten around `veniēbam` instead. The other two, `habēbam` and `eram`, are
confirmed absent at 593 surfaces.

That distinction is worth stating plainly: borrowing the imperfect's *shape* is what the brief
authorised; spending one of the three *reserved keys* would have taken M8's arrival away from it.

### 2.6 `haud sciō an`, and the rule that cuts an idiom in half

M5's hero is the litotes that reversed: `haud sciō an vērum sit` is word-for-word "I do not know
whether it is true" and idiomatically "I rather think it **is** true". `nesciō an` one word away is
genuine doubt. The module writes both, puts them in consecutive sentences, and its plate is
`nōn sciō an` — the wrong negative, which destroys the idiom without breaking the grammar. L2-M5's
`benignē` was the same kind of trap and got the same treatment.

S10 then finds something the brief did not anticipate: **`tamen` must come second in its clause even
when that splits the idiom.** `haud tamen sciō an vērum sit` — six words in this course must come
second and there is no exception for a fixed phrase, so the rule lands between `haud` and `sciō`. The
plate is `tamen haud sciō an`, which is how English would order it.

### 2.7 Counts that are now worth keeping as lists

Three inventories have grown past the point where a principle helps:

- **Six words with a negative inside them**: `nōlō` (L1-M3), `mālō` (L2-M9), `negō` (L3-M5), `nisi`
  (M3), `nesciō` (M5), `nōndum` (M6). Three modules now have a plate on adding `nōn` to one of them.
- **Five conjunctions that require the subjunctive, for five unrelated reasons**: `ut`/`nē` (purpose,
  L3-M4), `licet` (concession, M4), `an` (something unknown, M5), `cum` (a past time clause, M6),
  `dōnec` (a thing still to come, M6). M6-S10 carries three of them in one sentence.
- **Seven connectives first, six second, five joining from the front** — M2's rule states the whole
  list, and M4 and M5 add nothing to it but use it constantly.

### 2.8 Corrections made during the wave

- **M4 opened a seam it was not authorised to open.** A variation wrote `Venit-ne?`, minting
  `venit-ne`; `tools/course-briefs.test.ts`'s `SEAM_MODULES` allows L1-M2, L1-M10, L2-M2, L2-M5 and
  L2-M6 and no others. The variation now writes `Agis-ne bene?`, which L1-M2 already owns — and which
  is the very sentence that reserved `nōnne` and `num` for M4.
- **`legēbam`** as §2.5 records.
- Seven shapes were shown before they were owned and each went into its own lexeme's row: `putet`,
  `datur`, `signantur`, `officīnae`, `bibendum`, `gaudēbat`, `labōrābat`.

### 2.9 Open questions for the fluent-speaker gate

Additions to the eighty-two standing in the docs listed at §1.7.

1. **Is `dōnec` with a subjunctive for a future wait right**, or does a Roman write `dum` there? §2.4
   was forced by authoring and a teacher may say the conjunction is wrong rather than the mood.
2. **Does `nōn iam` mean "no longer" as reliably as M6 claims?** `iam nōn` is the commoner order and
   the module writes only `nōn iam`.
3. **Is `officīna clauditur` what a modern Latin notice says?** The verb is classical and the noun is
   the community's, so the sentence is half-borrowed in a way no single word is.
4. **Should `SPQR` be taught at all?** It is the most recognisable Latin in the world and nothing a
   learner will produce. `docs/131` §8 asked this of the brief and ten sentences have not settled it.
5. **Is `licet errāverim` idiomatic**, or does a past concession want `quamquam errāvī`? M4 writes both
   shapes and leans on `licet` for the mood.
6. **Is `cavē canem` too famous to be useful?** A learner will recognise it and may never parse it,
   which is the opposite of what a hero sentence should do.
---

## Wave 3 — L4-M8, L4-M9 and L4-M10 (#649), 2026-09-12

Three rungs, and the level closes: `draft` and `draftNote` come off L4 in
`content/en-la/levels.json`. All three signed
`verifiedBy: "Claude Opus 5 — LLM review, authorised by repo owner"`, `verifiedAt: 2026-09-12`.

**This is the wave that pays off the two oldest debts in the course.**

### 3.1 What was checked

- **`npm run content:validate`** → all three `ok`; `CONTENT 515/515 ok`.
- **The strict build** → `en-la: 40 modules (L1-M1..M10, L2-M1..M10, L3-M1..M10, L4-M1..M10)`,
  `index L4-M8: 614 surfaces`, `L4-M9: 619`, `L4-M10: 624`, and **no `shown but untaught` line at any
  of the forty**.
- **The folded index** — 624 surfaces against a `surfaceCount` of 624, `maxSpan` 1.
- **The orthography sweep** — 4,212 readable Latin strings: zero `j`, zero apostrophes, zero acutes,
  zero combining marks, zero non-NFC, zero curly quotes, nothing outside the ten macron letters and
  ASCII (straight `"` included), no `script` line, no hyphen outside `-que`/`-ne`/`-ve`. The 269
  `mistake` plates swept separately.
- **`git diff --stat`** over every module below L4-M8 is **empty**.

### 3.2 Three keys, thirty-four modules

L1-M5 settled that the past in this course was the perfect and only the perfect, and named **three
keys** to hold open for L4-M8. Every review doc from `docs/126` §6 to `docs/132` §2.5 confirmed they
were still free. Read back from the folded index:

| Key | Owner |
|---|---|
| `eram` | `L4-M8-S02` |
| `legēbam` | `L4-M8-S03` |
| `habēbam` | `L4-M8-S04` |

**All three are in the module's first four sentences**, and `nunc` — which thirty-four modules managed
without, because the present tense carried it — arrives with the third.

S02 is the sentence L1-M5 could not write. Every module from L1-M9 to L3-M10 said `fuī` where English
would have said `eram`: `sollicitus fuī`, `aeger fuī`, `fessus fuī`. Those sentences were not wrong —
they treated a state as an event because there was nothing else — and S02's plate is `ōlim aeger fuī`,
the shape the whole course has trained, in the one place it is now the weaker choice.

M6 borrowed three imperfects a wave earlier and had `legēbam` taken off it by the pool gate
(`docs/132` §2.5). That distinction held: **borrowing the tense's shape was authorised; spending a
reserved key was not.**

### 3.3 `habitārem` against `habitābam`, four modules apart and one letter apart

`docs/131` §2.1 set this up in advance: M3 opens the imperfect **subjunctive** and M8 the imperfect
**indicative**, and each module's notes disown the other's shape. M8-S06 is the sentence that shows
why it was needed — `Cum Rōmae habitārem, cotīdiē legēbam` has both in one line, and its plate is the
indicative after `cum`, which M6's plate also caught. Here it is worse: the two forms are one letter
apart, so the sentence looks almost right.

### 3.4 The locative, twenty-nine modules after it was named

L2-M4 taught `domum` and `domō` as two shapes of one row and named `domī` as L4-M9's. L3-M7 wanted it
for `melius est … manēre` and wrote `domum īre` instead. M8 wrote `Rōmae` before this module could
explain it, and said so in every note. Both borrowings are now paid off:

| Key | Owner |
|---|---|
| `domī` | `L4-M9-S04` |
| `rōmae` | `L4-M8-S01` — borrowed, as that module's notes admit |

And the set is complete: `domum` to, `domō` from, `domī` at; `Rōmam` to, `Rōmā` from, `Rōmae` at.

**M9 writes two mistake plates rather than one**, exactly as `docs/131` §5 required: `ad Rōmam eō` is
the error thirty-seven modules of `ad scholam` produce, and `scholam eō` is the error over-generalising
this module produces. They are three words apart in S05, because a rule with a closed list has to be
fenced on both sides. `in Rōmā` and `ā Rōmā` are the third and fourth wrong prepositions, each correct
somewhere else.

### 3.5 The quotation-mark question, answered by reading the index back

`docs/131` §6 said to write the quotation with ordinary double quotes and then **read the emitted index
back** rather than trust rule 3. Done:

- **Nineteen readable strings contain a straight `"`.**
- **Zero index keys contain one**, and zero contain a curly quote.
- `venī`, `inquit`, `inquam` and `domum` all resolve cleanly from inside a quotation.

Rule 3 strips punctuation from a token edge, which is exactly what a quoted word needs. The straight
`"` also passes the en-la block in `src/course/types.test.ts` without amendment, because it sits inside
the ASCII range that block already allows.

`venī` is worth naming separately: L1-M5 listed it among the reserved keys thirty-nine modules ago and
no module wrote it until M10 needed an imperative inside a quotation.

### 3.6 `inquit` is postpositive, and a short question is one unit

M10's one hard fact, and the module found a wrinkle the brief did not state. `"Venī", inquit, "domum"`
splits the quotation around the verb; `"Cūr nōn vēnistī?", inquit` does not, because a short quoted
question is one unit and splitting it would break it. So the rule as shipped is **"never first"**
rather than "always after exactly one word" — and S04's plate is `Inquit "Venī domum"`, which is
English's order and the only error this construction really admits.

### 3.7 The two tenses divide the work, which is what the deferral was for

L2-M10's four-sentence account and L3-M10's eight-sentence account both had to recast a state as an
event because no imperfect existed. M10's six-sentence narrative does not: background in the imperfect
(`ōlim Rōmae habitābam`, `cotīdiē ībam`, `aeger eram`), events in the perfect (`subitō Mārcus vēnit`,
`postrēmō domum īvī`).

**S10's mistake plate is the sentence this course would have had to write before M8** — every tense
backwards, perfects for the background and an imperfect for the event — and its `why` says it reads as
three unconnected facts rather than a story. That is the clearest possible statement of why the tense
was held back for thirty-four modules.

S08 also finds the limit of the rule: `Subitō nōn iam aeger eram` is an imperfect after `subitō` and it
is **not** S03's plate, because there the imperfect would have been an event and here the state itself
is what changed suddenly.

### 3.8 Corrections made during the wave

- **M8 referenced a rule index that did not exist** (`rule index 6 is out of range`), for the third
  time in this course. Fixed by pointing the sentence at rules that exist.
- Four shapes were shown before they were owned and each went into its own lexeme's row: `habitāre`,
  `habitābat`, `scrībēbam`, and `ībat` in a variation.
- No reserved key was spent that should not have been: `sīc`, `rosa`/`rosā`, `possim`, `meus`, `eius`,
  `vōs` and both dotted abbreviations are confirmed absent at 624 surfaces.

### 3.9 Open questions for the fluent-speaker gate

Additions to the eighty-eight standing in the docs listed at §1.7 and §2.9. **The gate remains unmet**:
no fluent speaker of living Latin has read any of this, and no authoring wave may close one of these by
rewriting a shipped module.

1. **Is `sōlēbam` worth a row beside the plain imperfect?** `docs/131` §8 asked it of the brief; ten
   sentences later M8 still leans on it as the gentler way in, and a teacher may call it a crutch.
2. **Is `sōlēbam aeger esse` acceptable at all?** Being ill is not usually a habit, and S09's own trap
   admits the sentence reads as mildly odd — which may mean it should not be there.
3. **Was `nunc`'s thirty-four-module absence design or accident?** Asked of the brief and now asked of
   content. The present tense carried it, which is defensible; a learner describing today has wanted
   the word since L1-M4.
4. **Is `Rōmae habitō` or `Rōmae sum` the commoner locative?** M9 writes both and leans on `habitō`
   because M8 established the verb.
5. **Does a six-sentence narrative want an ablative absolute?** It is L5's, and M10 gets by on two
   tenses and three sequencers — a fluent reader may find the result choppy where the level intended it
   fluent.
6. **Is splitting a quotation after one word the rule, or after a phrase?** §3.6 records what was
   written; the distinction between `"Venī", inquit, "domum"` and `"Cūr nōn vēnistī?", inquit` is the
   module's own judgement and not something a grammar states crisply.
