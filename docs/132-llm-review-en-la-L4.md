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
