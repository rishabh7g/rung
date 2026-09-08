# en-ar L4 — LLM review (wave 1: L4-M1, L4-M2)

The first authoring wave on en-ar's fourth level: **L4-M1 "Explaining how"** and
**L4-M2 "Cause and consequence"**, written against the briefs in
[`docs/87-en-ar-L4-brief-decisions.md`](87-en-ar-L4-brief-decisions.md) (#521) and shipped
`verified: true` with their signature, per the repo's one-pass rule.

**The index this was written against** is the emitted `public/content/en-ar/index/`, folded by
`npm run content:owner` — *840 surfaces owned, folded over 30 modules through L3-M10*, i.e. the
complete L1, L2 and L3 ladders and nothing above them. Every ownership claim quoted below is a
verbatim line from that tool, run in this wave; where it contradicts the brief, the index wins and
the correction is recorded in [§ Seams](#seams-where-the-brief-and-the-index-disagreed). No L1, L2
or L3 file was touched, no other course was touched, and no build output was written.

---

## The modules

### L4-M1 — Explaining how

*Steps and instructions in order, and what they are for.* `prerequisites: []` — first rung of the
level, so it takes no prerequisite at all (an L3 id here is rejected by `tools/validate.ts`).

The ten displays:

| # | display | teaches |
|---|---------|---------|
| S01 | `awwalan, iftaḥ al-bāb` | the imperative as a FORMATION: `taftaḥ` → `ftaḥ` → `iftaḥ`, with the three addressee endings on one stem (`iftaḥ` / `iftaḥī` / `iftaḥū`) |
| S02 | `iftaḥ an-nāfidha li-yadkhul al-hawāʾ` | the purpose lām — `li-` + verb — plus `an-nāfidha` and `al-hawāʾ` |
| S03 | `ḍaʿ as-sukkar fī al-qahwa, thumma ishrab` | the derivation with **no** helping vowel (`taḍaʿ` → `ḍaʿ`), and `as-sukkar`; `ishrab` is L2-M1's and is re-used, not re-taught |
| S04 | `idhhabū ilā as-sūq, wa khudhū al-khubz` | the plural cells `idhhabū` and `khudhū`, each a row of its own pointing back at L2-M4's singular |
| S05 | `iḍghaṭ ʿalā az-zirr li-yaftaḥ al-bāb` | `iḍghaṭ` (+ its obligatory `ʿalā`), `az-zirr`, and a second purpose lām on a he/it-form |
| S06 | `lā tadhhab ilā as-sūq qabla al-akl` | that Arabic has **no** negative imperative — prohibition borrows the jussive — and `al-akl`, L3-M1's maṣdar move behind `qabla` |
| S07 | `intaẓir hunā li-yaʾtī al-mudīr` | `intaẓir`, and the purpose lām standing in for English's two words *for … to* |
| S08 | `ismaʿ al-mudīr, thumma unẓur ilā al-kitāb` | `ismaʿ` (bare object) against `unẓur` (+ `ilā`), and the `u`-copying helping vowel |
| S09 | `qulī naʿam, thumma iftaḥī al-bāb` | the hollow verb that the rule does **not** predict (`taqūl` → `qul`), and the endings shown on a second stem |
| S10 | `awwalan, ḍaʿ al-māʾ, thāniyan aḍif as-sukkar` | `thāniyan` — the one step-marker this module buys — and `aḍif`, the shape the rule does not generate |

Eight module rules, ordered: the derivation (0), the three endings (1), the honest limit of the rule
(2), the purpose lām and its L1-M9 kinship (3), the person-on-the-verb interference (4), the
subjunctive that this course does not write (5), the missing negative imperative (6), the step spine
(7). Nineteen new rows against a `newWordCap` of 25.

### L4-M2 — Cause and consequence

*Why things happen and what follows, across a paragraph.* `prerequisites: ["L4-M1"]`.

| # | display | teaches |
|---|---------|---------|
| S01 | `dhahabtu ilā as-sūq, fa-ishtaraytu al-khubz` | `fa-` itself. This is the first `fa-` word on the ladder, so its row owns the bare `fa` key and its note defines the clitic rather than the verb under it |
| S02 | `al-mudīr ghāḍib, fa-yadhhab ilā al-bayt` | the person cells on one row — `fa-adhhab` / `fa-tadhhab` / `fa-yadhhab` — exactly as L1-M6 did for `sa-` |
| S03 | `lā adhhab ilā al-ʿamal bi-sabab al-maṭar` | that `bi-sabab` (L1-M9) holds a NOUN and `li-ʾanna` (L1-M9) holds a clause; `al-maṭar` is the only new row |
| S04 | `waṣaltu mutaʾakhkhiran bi-sabab al-izdiḥām` | `mutaʾakhkhiran`, `al-izdiḥām`, and — in a variation — `bi-sabab al-wuṣūl mutaʾakhkhiran`, L3-M1's maṣdar paying a second time |
| S05 | `at-taʾakhkhur mushkila, li-dhālika adhhab mubakkiran` | `li-dhālika` (L1-M9) as the sentence-opening twin of `fa-`, and `at-taʾakhkhur` |
| S06 | `al-izdiḥām yuʾaddī ilā at-taʾakhkhur` | `yuʾaddī` and its inseparable `ilā`; noun on both sides |
| S07 | `ammā aṭ-ṭaqs fa-kāna bārid` | the topic frame `ammā … fa-`, plus `aṭ-ṭaqs` and `fa-kāna` |
| S08 | `waṣala al-mudīr mutaʾakhkhiran, mimmā sabbaba mushkila` | `mimmā` pointing at a whole clause (against `alladhī`, which points at a noun), and `sabbaba` with a bare object |
| S09 | `at-taʾakhkhur nātij ʿan al-izdiḥām` | `nātij` + `ʿan` — `bi-sabab` run backwards — and `ʿan`, unbought in thirty modules |
| S10 | `al-maṭar yusabbib al-izdiḥām, wa natījatan waṣaltu mutaʾakhkhiran` | `yusabbib` and `natījatan`, the clause-opener |

Seven module rules: the `fa-` clitic and its `li-dhālika` twin (0), the wa / thumma / fa- three-way
split English collapses (1), `ammā … fa-` (2), `bi-sabab` vs `li-ʾanna` (3), the un-frontable
because-clause (4), `ʾanna`'s sisters and the suffixed pronoun (5), and the plainer causal verbs (6).
Sixteen new rows against a `newWordCap` of 25. The passive, time-sequencing, the counterfactual and
the hedged result are all left to M7, M6, M3 and M4/M5 as the brief requires; every clause is active.

---

## Seams: where the brief and the index disagreed

Six corrections, three of them substantive. Every quoted line is `npm run content:owner -- en-ar …`
output from this wave.

**1. `yusabbibu` carries a written mood ending; the module ships `yusabbib`.** The M2 brief's note 5
lists the fresh keys as "`sabbaba` and `yusabbibu` (all free)". Both spellings are in fact free —

```
yusabbib	free
yusabbibu	free
```

— so nothing is spent either way, but the final `-u` is the indicative mood marker, and this course
writes `adhhab`, `yadhhab`, `tadhhab` without it everywhere. Shipping `yusabbibu` would have been the
only written mood ending on the ladder. The module teaches `yusabbib`; `yusabbibu` stays unowned.
See open question 96.

**2. The no-mood-endings law is NOT "L2-M1 rule 4".** Both the authoring brief and this wave's
instructions cite it that way. L2-M1's rule 4 is the *adverbial* `-an` rule: *"The adverbial -an
ending survives the course's no-case-endings rule, because it is lexical rather than grammatical:
shukran, jazīlan, ʿafwan, ghadan, dāʾiman."* The no-case-endings law is **L1-M5 rule 4** and
**L3-M1 rule 2**; the mood convention is stated at **L3-M4 rule 4** (*"The verb it holds is in the
jussive, which this course writes exactly like the ordinary present for a sound verb"*) and handed
forward at **L3-M2 rule 3** (*"The subjunctive mood beyond these two frames is L4's"*). L4-M1 rule 5
cites those two, not L2-M1. A brief that repeats the wrong citation will keep sending authors to a
rule about adverbs.

**3. "Arabic has no negative imperative" is not a fresh line.** The M1 brief calls it "the fact,
worth one line". L3-M4 rule 5 already ships it in full: *"It is NOT the imperative with a negative in
front — L2-M4's idhhab has no negative form at all — so lā idhhab, the shape English leads you to,
does not exist in Arabic."* L4-M1 rule 6 therefore states it as a re-use with the pointer back, and
S06 spends only `al-akl`.

**4. The feminine imperative cell is already bought in two places.** The brief names the six owned
imperatives; the index owns two more that the brief does not list —

```
ishrabī	L2-M1
khudhī	L2-M4
```

— so the `-ī` ending is not unseen when M1 teaches it. It is taught here on `iftaḥ` and `qul`, whose
cells are free (`iftaḥī free`, `ḍaʿī free`, `qulī free`), and rule 1 says the ending is one the
learner already meets in the present rather than pretending it is new.

**5. `sāʿid` is free although `sāʿidnī` is L2-M8's.**

```
sāʿid	free
sāʿidnī	L2-M8
```

The brief is right that `sāʿidnī` is spent. Rule 2 quotes bare `sāʿid` only as an illustration of a
longer verb needing no helping vowel; no row is opened on it, so the key stays free for whichever
module wants it.

**6. `al-bāb` is L2-M3's, not L1-M7's.**

```
al-bāb	L2-M3   [parts: al → L1-M1, bāb → L1-M7]
```

Bare `bāb` is L1-M7's and the definite whole key is L2-M3's — two owners for what reads as one word.
Nothing is spent either way here; recorded because a brief that says "`bāb` is L1-M7's" is only half
true and the half it omits is the surface a sentence actually writes.

### Two hazards from `docs/87` §3, honoured

- **The `idhhab` / `adhhab` illustration.** §3 forbids demonstrating the derivation with a pair whose
  members look identical. L4-M1 rule 0 derives with `taftaḥ → ftaḥ → iftaḥ`, `taktub → ktub → uktub`
  and `taḍaʿ → ḍaʿ`, and never with `tadhhab → idhhab`.
- **Sun-letter prefixes folding onto particles.** This wave's new definite nouns all produce one:
  `an-nāfidha` → `an → L1-M3`, `az-zirr` → `az → L3-M7`, `aṭ-ṭaqs` → `aṭ → L1-M7`, `at-taʾakhkhur` →
  `at → L3-M6`. First occurrence wins so nothing is spent, and no note in either module explains a
  particle by pointing at a word whose prefix is an article.

### One orthographic seam, outside the index

The course disagrees with itself about `kāna`'s predicate on the **script** line. L1-M5, which owns
`kāna`, writes `kāna al-jaww bārid` / `كان الجو بارد` — bare on both lines. L2-M10 writes
`كان الجو باردا` against the same bare romanization. `ammā aṭ-ṭaqs fa-kāna bārid` follows L1-M5, so
the two lines carry the same information (`فكان بارد`). The adverbial `-an` is written on both lines
as L3-M1 writes it — `أولًا`, `ثانيًا`, `متأخرًا`, `نتيجةً` — rather than in L1's `أولاً` shape.

### Re-teaches

**None.** `npm run content:shown` reported no `RE-TEACH` line for either module: every row in both
files opens a key that was free across the 840-surface fold. The two point-back rows (`idhhabū`,
`khudhū`) are new surfaces by construction — a plural imperative folds to a different key from its
singular — and their notes name L2-M4 as the first-teach.

---

## The ratchet

- `npm run content:validate` → **`CONTENT n/n ok`**, whole-tree green with both new files listed
  as `en-ar/L4-M1.json ok` and `en-ar/L4-M2.json ok`. The denominator is a moving total while the
  other eight courses' waves land beside this one — it read `285/285` when this wave first went
  green and `288/288` on its last run — so what is quoted here is the shape of the line, not a count
  this module owns.
- `npm run content:shown -- en-ar L4-M1` → `L4-M1: clean — every shown surface resolves`
- `npm run content:shown -- en-ar L4-M2` → `L4-M2: clean — every shown surface resolves`
- `npx vitest run tools/shown-surfaces.test.ts` → **11 passed (11)**. en-ar holds at its baseline of
  **6**; no baseline was raised, and none was lowered — this wave fixed no pre-existing finding, it
  only added none. Every `variations[].display` and every pool item in both modules resolves against
  the cumulative index.

`src/course/types.test.ts` is red only on the module census (`270`, en-ar `30`, hi-en `30`), which is
the parent's to move. The en-ar language law inside that file — display is the romanization, `script`
the Arabic line — was re-run by hand over both modules because the census assertion throws before the
loop it guards: no `display`, word `forms` entry or pool `display` carries an Arabic character, and
every sentence, variation, mistake and pool item carries a `script` line that does. Hamza is `ʾ` and
ʿayn is `ʿ` throughout, never interchanged (`hawāʾ`, `mutaʾakhkhiran`, `yuʾaddī`, `li-yaʾtī` against
`ismaʿ`, `ḍaʿ`, `ʿalā`, `ʿan`, `naʿam`). No word note exceeds 200 characters.

---

## Open questions for the native-speaker gate

Continuing the chain in [`docs/87-en-ar-L4-brief-decisions.md`](87-en-ar-L4-brief-decisions.md) §6,
which ends at 86. Nothing there is renumbered. **The native-speaker gate is unmet**, and none of
these may be closed by rewriting a shipped module.

87. **The derivation rule as a teaching claim** (M1). Confirm that "drop the `ta-`, add a helping
    vowel if two consonants are left" is how the imperative is actually explained, and specifically
    that the `u` of `uktub` is heard as copying the stem vowel rather than as an unrelated variant.
    The rule is the module's spine; if it is stated wrongly, nine of the ten sentences inherit it.
88. **`aḍif`** (M1). It is the one imperative here the rule does not generate. Confirm `aḍif` is what
    is said for "add" (not `ḍif`, not `uḍif`), and that it is the word used over a pot rather than a
    written-only form.
89. **`ḍaʿ` in a kitchen** (M1). Confirm `ḍaʿ as-sukkar fī al-qahwa` is what a speaker of
    spoken-simple MSA says for a recipe step, and whether the module should name the near-universal
    dialectal `ḥuṭṭ` in `usage` rather than leave the learner to meet it cold.
90. **`iḍghaṭ ʿalā`** (M1). Confirm the preposition is obligatory for pressing a button, i.e. that
    `iḍghaṭ az-zirr` is genuinely wrong and not merely colloquial. S05's `mistake` plate rests on it.
91. **`ismaʿ` with a bare object** (M1). Confirm `ismaʿ al-mudīr` against `ismaʿ ilā al-mudīr`, and
    say whether `istamiʿ ilā` is what an instruction would really use — the sentence's whole trap is
    the contrast with `unẓur ilā`.
92. **The plural imperative to a mixed group** (M1). Confirm `-ū` covers a mixed group in speech and
    that the feminine plural genuinely never surfaces at this level, as the module assumes.
93. **The purpose lām in speech** (M1). The module's second half. Confirm `li-` + verb is heard in
    ordinary spoken MSA for purpose, and is not routinely replaced by `ḥattā` (reserved to M6),
    `kay`, `min ajl an` or a dialectal particle — and if it is replaced, say by which.
94. **`fa-` as a spoken connector** (M2). The module's most load-bearing claim: that `fa-` is what a
    speaker chains a paragraph with, and not a written-register marker for which speech substitutes
    `wa` or `li-dhālika`. If `fa-` is chiefly written, S01 and S02 are teaching the wrong default.
95. **`ammā … fa-` outside a lecture** (M2). Confirm the topic frame is heard in ordinary
    conversation, and confirm the strong claim in rule 2 and S07's trap — that dropping the `fa-`
    really is heard as a sentence cut in half, rather than merely as informal.
96. **`yusabbib` written bare** (M2). Confirm that dropping the indicative `-u` is right here, given
    the same module writes `yuʾaddī` with the long `ī` that marks the same mood on a defective verb.
    If the two must agree, say which way.
97. **`nātij ʿan`, and what `ʿan` should have been spent on** (M2). Confirm `nātij ʿan` is said and
    not only printed. `ʿan` is bought here for the first time in thirty-two modules; confirm that a
    causal frame is the right place to spend it rather than "about", which the ladder still lacks.
98. **`mimmā` against `wa hādhā`** (M2). The module teaches `mimmā` in the hero line and `wa hādhā`
    in a variation. Confirm which a speaker actually reaches for, and whether the register split S08
    claims (`formal`) is real.
99. **`al-izdiḥām` and `at-taʾakhkhur`** (M2). Confirm `al-izdiḥām` is the everyday word for road
    traffic (against `zaḥma`), and that `at-taʾakhkhur` is the noun a person uses for being late
    rather than a bureaucratic one. Both carry four sentences apiece.
100. **The level's register, as opened** (M2). Three sentences here are tagged `formal`
     (`yuʾaddī ilā`, `mimmā`, `nātij ʿan`) and the rest `neutral`. Confirm that split — and confirm
     that a learner meeting `fa-`, `bi-sabab` and `li-dhālika` as neutral speech, with the causal
     verbs one step above them, is being handed the register they will actually hear. This is
     question 86's continuation into the level's second rung.
