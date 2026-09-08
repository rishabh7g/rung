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

---

## Wave 2 — L4-M3, L4-M4 and L4-M5 (#539)

The level's RANGE modules: **L4-M3 "What might have been"**, **L4-M4 "Persuading"** and
**L4-M5 "Disagreeing well"**, written against the briefs in
[`docs/87-en-ar-L4-brief-decisions.md`](87-en-ar-L4-brief-decisions.md) §4 and shipped
`verified: true` with their signature in the same change, per the repo's one-pass rule.

**The index this wave was written against** is the emitted `public/content/en-ar/index/` as it stood
when the wave opened — `npm run content:owner` reporting *896 surfaces owned, folded over 32 modules
through L4-M2*, i.e. the complete L1–L3 ladders plus wave 1. Every ownership claim quoted below is a
verbatim line from that tool. No L1, L2 or L3 file was touched, no other course was touched, and no
build output was written by this wave.

The three modules chain: `L4-M3` takes `["L4-M2"]`, `L4-M4` takes `["L4-M3"]`, `L4-M5` takes
`["L4-M4"]`.

### L4-M3 — What might have been

*Regrets and past hypotheticals.* Nine module rules, **eleven** new rows against a `newWordCap` of
25 — the level's cheapest big module, exactly as its brief predicted, because every frame it teaches
is `kāna` in front of something the ladder already owns.

| # | display | teaches |
|---|---------|---------|
| S01 | `kāna qad dhahaba qabla al-ijtimāʿ` | the PLUPERFECT frame `kāna qad` (+ `kānat qad`), L3-M7's `qad` one rung further back |
| S02 | `kuntu qad akaltu qabla al-ḥafla` | the first- and second-person cells `kuntu qad` / `kunta qad` / `kunti qad`, and that the person is written at both ends |
| S03 | `law kuntu qad dhahabtu mubakkiran, la-raʾaytu al-mudīr` | that L3-M4's conditional does not change: the answer clause still wears `la-` on a plain past. `la-raʾaytu` is the one new row, and its hyphen parts buy bare `raʾaytu` |
| S04 | `kāna yajibu an adhhab ilā al-mustashfā` | `kāna yajibu`, frozen in the he-form, with the person only in the far verb |
| S05 | `kāna ʿalayya an adfaʿ al-fātūra` | `kāna ʿalayya` (+ `kāna ʿalayka`, `kāna ʿalayhi`) — the frame that DOES carry the person |
| S06 | `lam yakun yajibu an taqūl dhālika` | the negated past obligation: `lam` lands on `kāna`, not on `yajibu` |
| S07 | `kuntu sa-attaṣil bika, lākin nasītu` | the was-going-to `kuntu sa-attaṣil` (+ `kunta sa-tattaṣil`, `kāna sa-yattaṣil`), and the stacking trap on the mistake plate |
| S08 | `nadimtu li-ʾannī lam adhhab maʿaka` | `nadimtu` (+ `nadima`, `nadimat`), with the regret's reason on L1-M9's `li-ʾanna` |
| S09 | `fātanī al-qiṭār, wa fātatnī al-furṣa` | `fātanī` (+ `fāta`, `fātatnī`) and `al-furṣa` — the reversal that makes the thing missed the subject |
| S10 | `kāna al-qarār khaṭaʾ, wa kāna yajibu an aqūl lā` | `al-qarār`, and both frames in one sentence: the verdict, then the regret |

The mistake plate the brief asked for by name is on S07: `kuntu kāna sa-attaṣil bika`, the stacked
`kāna`. The tense-matching interference is rule 6 and is plated on S05 (`an dafaʿtu`) and S08
(`lam dhahabtu`). Nothing here opens a conditional particle (L3-M4), the habitual `kāna` + imperfect
(M8) or the passive (M7).

### L4-M4 — Persuading

*Make a case, concede a point, hold your ground.* Nine module rules, **fifteen** new rows against a
`newWordCap` of 25.

| # | display | teaches |
|---|---------|---------|
| S01 | `raghma anna al-lugha ṣaʿba, adrus kull yawm` | `raghma anna` (+ bare `raghma`) as the third tour of the one case cell L3-M3 opened — presented as `ʾanna`'s family, not as a fresh fact |
| S02 | `ʿalā ar-raghm min al-maṭar, dhahabtu ilā as-sūq` | the noun half, whole-indexed; its variation puts L3-M1's maṣdar behind `min`, which is the point of the pair |
| S03 | `al-fikra jayyida, wa maʿa dhālika lastu muwāfiq` | `maʿa dhālika`, and that Arabic marks BOTH halves where English allows one |
| S04 | `laysat al-mushkila fī al-waqt, bal fī at-tarkīz` | `bal` as a two-part frame with an obligatory negative, plus `at-tarkīz`; `lākin` in the `bal` slot is the mistake plate |
| S05 | `lā shakka anna al-ʿamal muhimm jiddan` | `lā shakka anna`, whole and frozen with its `-a` |
| S06 | `min al-wāḍiḥ anna as-siʿr ghālī jiddan` | `min al-wāḍiḥ anna` (whose hyphen part buys bare `wāḍiḥ`) and `as-siʿr` |
| S07 | `min nāḥiya al-bayt kabīr, wa min nāḥiya ukhrā al-ījār ghālī` | `nāḥiya` and `min nāḥiya ukhrā` — one item, as the brief required, since three would buy the same thing three times |
| S08 | `maʿaka ḥaqq, wa lākin al-waqt qaṣīr` | `maʿaka ḥaqq` (+ `maʿaki ḥaqq`), whole; `anta ṣaḥīḥ` is the mistake plate |
| S09 | `bi-ṣarāḥa, hādhā ghayr ṣaḥīḥ` | `bi-ṣarāḥa` and `ghayr` — the noun negator against `lā` |
| S10 | `ʿalā kulli ḥāl, fī raʾyī al-fikra muhimma fiʿlan` | `ʿalā kulli ḥāl` and `fiʿlan`, closing on the part that is not being conceded |

`innamā` and `ghayr anna` are named in the brief's fresh list and are deliberately **left unspent**
(`innamā free`, `ghayr anna free` after this wave): `bal` and `ghayr` carry the module's corrective
work, and a third and fourth word for the same move would be spending for its own sake. The hedging
register is kept out entirely — it is M5's.

### L4-M5 — Disagreeing well

*Soften, hedge, save face.* Eight module rules, **ten** rows (nine distinct keys plus one deliberate
repeat, below) against a `newWordCap` of 25. It is the leanest module of the three because two of
its three grammar points are a second job on an owned particle and the completion of an owned
paradigm.

| # | display | teaches |
|---|---------|---------|
| S01 | `lā aẓunn anna hādhā ṣaḥīḥ` | negative raising, whole-indexed as `lā aẓunn anna` (+ `lā aʿtaqid anna`), with the note saying the English transfer is SAFE |
| S02 | `qad yaʾtī al-mudīr ghadan` | `qad` + present = may, on the frame `qad yaʾtī` (+ `qad yadhhab`, `qad takūn`), pointing back at L3-M7 |
| S03 | `lasta muwāfiq, wa lā baʾsa fī dhālika` | the rest of the paradigm — `lasta`, `lasti`, `lasnā`, `laysū` — on one row pointing back at L2-M7 and L3-M3 |
| S04 | `yabdū anna al-mudīr mashghūl al-yawm` | `yabdū anna`, whole, as an unconjugatable frame |
| S05 | `min al-mumkin an adhhab maʿaka ghadan` | `min al-mumkin an`, whole; its hyphen part buys bare `mumkin` |
| S06 | `ʿalā ayy ḥāl, sa-attaṣil bika ghadan` | `ʿalā ayy ḥāl`, whole — L2-M9's `ayy` inside a frozen phrase |
| S07 | `ḥasanan, maʿaka ḥaqq, wa lākin lastu muwāfiq` | `ḥasanan`, and the level's cross-module link: M4's `maʿaka ḥaqq` in M5's own pattern |
| S08 | `ka-annahu ghāḍib, lākin lastu mutaʾakkidan` | `ka-annahu` (+ `ka-annahā`); the row owns the bare `ka` key and its note defines the clitic |
| S09 | `hādhā ṣaḥīḥ taqrīban, lākin laysa tamāman` | `taqrīban`, in the adverb slot L1-M3's `jiddan` already taught |
| S10 | `āsif, lā aẓunn anna hādhā mumkin` | the consolidation refusal — S01's row repeated verbatim (see § The ratchet) |

`rubbamā` is L3-M3's and is never re-opened; it appears only on S02's mistake plate, as the stacked
hedge (`rubbamā qad yaʾtī`), which is the over-reach the brief predicted.

---

## Seams: where the brief and the index disagreed (wave 2)

Nine corrections. Every quoted line is `npm run content:owner -- en-ar …` output from this wave,
against the 896-surface fold.

**7. `aẓunnu` and `aʿtaqidu` carry a written mood ending; the modules ship `aẓunn` and `aʿtaqid`.**
M5's brief writes the pattern as `lā aẓunnu anna` and lists `aʿtaqidu` among the module's fresh
keys.

```
aẓunnu	free
aẓunn	L3-M3
aʿtaqidu	free
aʿtaqid	L3-M3
lā aʿtaqid	L3-M3
```

Both `-u` spellings are free, so nothing would have been stolen — but both are the indicative mood
marker this course does not write, and both duplicate a key L3-M3 already owns. Shipping them would
have been the second and third written mood endings on the ladder, after the `yusabbibu` wave 1
declined at §1 above. The module writes `lā aẓunn anna` and `lā aʿtaqid anna`, indexed whole and both
free; `aẓunnu` and `aʿtaqidu` stay unowned. See open question 111.

**8. `maʿak ḥaqq` is a clipped pronoun suffix the course does not use; the module ships
`maʿaka ḥaqq`.** M4's brief note 5 lists `maʿak ḥaqq` as a fresh key and M5's pattern list writes it
the same way.

```
maʿak ḥaqq	free
maʿaka ḥaqq	free
maʿaka	L1-M10
maʿaki	L1-M10
```

Both wholes are free, but `maʿaka` is L1-M10's and the ladder writes every second-person suffix in
full — `maʿaka`, `bika`, `ʿindaka`, `min faḍlika`. `maʿak` would have been the only clipped one in
thirty-five modules. M4-S08 opens `maʿaka ḥaqq` and `maʿaki ḥaqq`, both whole, so bare `ḥaqq` stays
free (`ḥaqq free` before this wave and after it).

**9. `maʿak ḥaqq` is in TWO briefs, and only one module may own it.** M4's note 5 lists it among M4's
fresh keys; M5's `allowedPatterns` uses it as a frame. Both are honoured without a collision: M4-S08
teaches it, M5-S07 spends it, and `npm run content:shown -- en-ar L4-M5` resolves it because the
check folds the modules of this level that precede the one being checked. M5's `allowedPatterns`
therefore records the pattern with the corrected spelling and no row of its own.

**10. `kāna ʿalayya` whole and bare `ʿalayya` are alternatives, not both.** M3's note 5 lists
`ʿalayya`, `ʿalayka` and `ʿalayhi` as fresh keys AND says `kāna ʿalayya` is indexed whole "so that
neither spends a bare key it does not need."

```
ʿalayya	free
ʿalayka	free
ʿalayhi	free
kāna ʿalayya	free
```

`surfaceIndexKeys` splits on hyphens and never on spaces, so `kāna ʿalayya` is ONE key and buys none
of the three cells. The module writes the whole frame everywhere and opens no bare row, so after
this wave `ʿalayya`, `ʿalayka` and `ʿalayhi` are still `free` for whichever module wants the
preposition on its own. That is the reading the brief's second clause asks for; its first clause,
read as an instruction to open bare rows, would have contradicted it.

**11. A whole phrase's HYPHEN part is bought silently, and a second row on that part would be
unreachable.** Three of this wave's whole-indexed frames contain a hyphenated token:

```
ʿalā ar-raghm min	free   [parts: ar → L2-M5, raghm → free]
min al-wāḍiḥ anna	free   [parts: al → L1-M1, wāḍiḥ → free]
min al-mumkin an	free   [parts: al → L1-M1, mumkin → free]
```

Teaching the frame therefore also buys `raghm`, `wāḍiḥ` and `mumkin` — which is why M4 opens no
separate `raghm` row and M5 opens no separate `mumkin` row even though its brief names `mumkin` as a
fresh key. This is worth recording because `tools/check-shown.ts` **cannot** catch the mistake: its
collision map is keyed on whole normalised surfaces only, so two rows fighting over `mumkin` — one
via a hyphen part, one as a display — would pass the check and still leave the second row
unreachable at runtime. The first-teach is the frame; the bare part rides on it.

**12. `lam yakun` and `lam yakun yajibu` are free; `lam` and `yakun` are L3-M4's.**

```
lam	L3-M4
yakun	L3-M4
lam yakun	free
lam yakun yajibu	free
```

So the negated past obligation costs exactly one whole key, and M3-S06 opens `lam yakun yajibu`
without touching L3-M4's file or its two bare keys.

**13. Every `kāna qad` cell is free — L3-M7's `qad` bought none of them.**

```
kāna qad	free
kuntu qad	free
kunta qad	free
kunti qad	free
kānat qad	free
```

L3-M7 taught `qad` in front of a past (`qad waṣaltu`, `qad badaʾtu`) and the auxiliary frame was
never formed, so the pluperfect is genuinely unbought after thirty-two modules. The wave splits it
across two rows — third person on S01, first and second on S02 — rather than one row with five
forms, so that each note can say a different thing about where the person lives.

**14. `yaʾtī` is L4-M1's, not free.**

```
ya'tī	L4-M1
qad yaʾtī	free
```

M5's `qad yaʾtī` therefore rests on a key the wave immediately before it bought. Recorded because
M5's brief lists neither, and an author who assumed `yaʾtī` was free would have opened a row that
resolves to L4-M1's note.

**15. The no-written-mood-endings law is still cited as "L2-M1 rule 4."** Wave 1 corrected this at
§2 above (it is **L1-M5 rule 4** and **L3-M1 rule 2**; the mood convention is **L3-M4 rule 4**, handed
forward at **L3-M2 rule 3**). The wave-2 instruction sheet repeats the wrong citation, so it is
recorded a second time: the citation has now been wrong in a brief, in wave 1's instructions and in
wave 2's, and it is the reason correction 7 above had to be made at all.

### Two orthographic seams, outside the index

- **The predicate after `laysa` is bare in three modules and marked in one.** L2-M7, which owns
  `laysa`, writes `huwa laysa mawjūd` / `hiya laysat mawjūda`; L3-M3 writes `lastu muwāfiq`; L3-M10
  writes `lam yakun sahl` and `lam akun saʿīd`. L3-M6 alone writes the accusative: `lastu
  mutaʾakkidan`, `lastu saʿīdan`, `lastu ḥazīnan`. This wave copied **each adjective's own
  first-teach** rather than inventing a third convention — `lasta muwāfiq` and `lastu muwāfiq` in
  L3-M3's shape, `lastu mutaʾakkidan` in L3-M6's — so no module is contradicted and no new rule is
  implied. See open question 114.
- **Frozen phrases keep the vowels the course otherwise drops.** `alḥamdu lillāh`,
  `as-salāmu ʿalaykum` and L2-M1's `lā baʾsa` all carry a case vowel, and L2-M1's own mistake plate
  says so in as many words ("The phrase is lā baʾsa, with the final -a. It is frozen"). `lā shakka
  anna` and `ʿalā kulli ḥāl` follow that precedent and are indexed whole; the `-a` of `shakka` and
  the `-i` of `kulli` are not case endings on a free noun, and both modules' mistake plates say so.
  Wave 1's adverbial-script seam also stands: this wave writes new adverbials in L3-M1's shape
  (`تقريبًا`, `حسنًا`, `فعلًا`) and quotes older ones in their own shipped shape (`مبكراً`,
  `متأكداً`).

### Re-teaches

**None.** `npm run content:shown` printed no `RE-TEACH` line for any of the three modules: every row
in all three files opens a key that was free across the 896-surface fold. Where a module needed a
word an earlier module owns — `qad`, `aẓunn`, `lastu`, `laysa`, `rubbamā`, `anna`, `lākin`,
`fī raʾyī`, `maʿaka`, `ʿalā`, `ayy`, `jiddan` — it spends it in a display and a rule and opens no
row at all, which is the only way a point-back costs nothing.

---

## The ratchet

- `npm run content:validate` → **`CONTENT 315/315 ok`**, whole-tree green with the three new files
  listed as `en-ar/L4-M3.json ok`, `en-ar/L4-M4.json ok` and `en-ar/L4-M5.json ok`. The denominator
  moves while the other eight courses' waves land beside this one, so what matters is the shape of
  the line and that no file in it is `FAIL`.
- `npm run content:shown -- en-ar L4-M3` → `L4-M3: clean — every shown surface resolves`
- `npm run content:shown -- en-ar L4-M4` → `L4-M4: clean — every shown surface resolves`
- `npm run content:shown -- en-ar L4-M5` → `L4-M5: clean — every shown surface resolves`
- `npx vitest run tools/shown-surfaces.test.ts` → **11 passed (11)**. en-ar holds at its baseline of
  **6**; no baseline was raised and none was lowered — this wave fixed no pre-existing finding, it
  added none. Every `variations[].display` and every one of the thirty-six pool items resolves.

**The one deliberate repeat.** L4-M5 opens `lā aẓunn anna` on S01 and repeats the identical row on
S10, the consolidation refusal, whose only new material is the register. `tools/check-shown.ts`
allows this exactly when both rows carry the SAME note, because then which one the fold reaches is
invisible; the two rows share display, cue, tag, `forms` and note byte for byte, and the check
reports no `COLLIDES INSIDE THIS MODULE`. Everything S10 had to say that S01 does not is in the
sentence's `trap` and `usage`, and in rule 7.

`src/course/types.test.ts` was red on the module census while this wave was being written — `finds
all 311` against 315, en-ar at 33 against 35, hi-en at 34 against 35 — all three the parent's to move
as the nine waves land, and all three now moved: the file reads **336 passed (336)**. Because the
en-ar count guards the language-law walk below it and vitest aborts the case there rather than
running it, **the en-ar law was also re-run by hand over all three modules** before the census
caught up: no
sentence, word, `forms` entry, variation, mistake or pool `display` carries an Arabic character, and
every one of those surfaces carries a `script` line that does. Every teaching field — `rules[].text`,
word `note` and `cue`, `trap`, `sound`, `variations[].changed`, `mistake.why`, `usage`, `mnemonic`,
`literal`, `cue` — is English. Hamza is `ʾ` and ʿayn is `ʿ` throughout and the two are never
interchanged (`khaṭaʾ`, `raʾaytu`, `fī raʾyī`, `qad yaʾtī`, `ka-annahu`, `lā baʾsa`, `ʾanna` against
`ʿalayya`, `ʿalā`, `maʿaka`, `fiʿlan`, `bi-ṣarāḥa`, `nāḥiya`). No mood ending is written anywhere:
`adhhab`, `adfaʿ`, `taqūl`, `aqūl`, `adrus`, `yadhhab`, `yaʾtī`, `takūn`, `aẓunn`, `aʿtaqid`. No word
note exceeds 200 characters, the longest sentence is 10 tokens against bounds of 12 and 13, and the
three row counts are 11, 15 and 10 against a `newWordCap` of 25. `npx vitest run tools/` is
**190 passed (190)**.

---

## Open questions for the native-speaker gate (wave 2)

Continuing the chain, which ends at 100 above. Nothing earlier is renumbered. **The native-speaker
gate is unmet**, and none of these may be closed by rewriting a shipped module.

101. **`kāna qad` in speech** (M3). `docs/87` asked this at 67 for M3 and M10 together; it is asked
     again here because M3 now ships five sentences resting on it. Confirm the pluperfect frame is
     said out loud and is not a written-register construction for which speech substitutes a bare
     past plus a time word, and confirm that dropping `qad` really loses the reading, as S01's
     mistake plate claims.
102. **The person written at both ends** (M3, S02). Confirm that `kuntu qad akaltu` is what a speaker
     says rather than a reduced form, and that `kuntu qad akala` is heard as wrong rather than as
     casual. Rule 1 and the S02 mistake plate both rest on this being a hard agreement.
103. **`kāna yajibu an` for "I should have"** (M3). `docs/87` 68, unchanged and now shipped in four
     places. Confirm this is what a speaker says for a regretted obligation, and confirm the frame is
     genuinely invariable — that `kuntu yajibu` and `kunta yajibu` are not heard.
104. **`kāna ʿalayya an` against `kāna yajibu an`** (M3, S04–S05). The module claims a clean split:
     `kāna yajibu` impersonal, `kāna ʿalayya` naming whose duty it was, and English `had to` /
     `should have` cutting the pair differently. Confirm the split, and confirm `ʿalayya` is the
     everyday cell rather than `kāna yajibu ʿalayya`, which M7's brief reserves.
105. **`lam yakun yajibu an` for "shouldn't have"** (M3, S06). Confirm the negation lands on `kāna`
     in speech, that `mā kāna yajibu` is not the commoner spoken shape, and that a listener hears
     "you shouldn't have" rather than "you didn't have to" — the two readings the variations split.
106. **`kuntu sa-` and the stacking trap** (M3, S07). `docs/87` 69. Confirm "I was going to" is
     expressed this way, and confirm the mistake plate: that `kuntu kāna sa-attaṣil` is heard as
     broken rather than as emphasis. Also confirm `kunta sa-tattaṣil`, which no module has written
     before this one.
107. **`fātanī` and the reversal** (M3, S09). Confirm `fātanī al-qiṭār` is the ordinary way to say "I
     missed the train", that `fātatnī al-furṣa` is the everyday phrase for a missed chance, and that
     `anā fātanī al-qiṭār` — the mistake plate — really is wrong rather than emphatic.
108. **`nadimtu` against `āsif`** (M3, S08, S10). The module teaches regret with a past verb and a
     `li-ʾanna` clause. Confirm a speaker reaches for `nadimtu` rather than `anā āsif li-ʾannī`, and
     say which of the two the level's register should have opened.
109. **`bal` and its obligatory negative** (M4, S04). `docs/87` 70, now shipped as a two-part frame
     with `lākin` plated as the mistake. Confirm `laysa X bal Y` is the everyday shape, that the
     negative really is obligatory, and that `laysat al-mushkila fī al-waqt, bal fī at-tarkīz` is
     what a speaker says rather than a written-argument shape.
110. **`raghma anna` against `ʿalā ar-raghm min`, and the doubly-marked concession** (M4, S01–S03).
     `docs/87` 71. Confirm the clause/noun split is as hard as rules 0 and 1 claim, and confirm the
     stronger claim in rule 2 and S03: that marking BOTH halves — `raghma anna … wa maʿa dhālika` —
     is ordinary rather than heavy, since English speakers are taught the opposite about their own
     language.
111. **`lā aẓunn anna` written bare, and negative raising** (M5, S01, S10). `docs/87` 74 asked
     whether negative raising is what a speaker does. Ask it again with the spelling attached:
     confirm `lā aẓunn anna hādhā ṣaḥīḥ` with no indicative `-u` is right here, given that L3-M3
     shipped `aẓunn` and `lā aʿtaqid` the same way, and say which of `aẓunn` and `aʿtaqid` a speaker
     actually reaches for when softening.
112. **`qad` + imperfect for "may"** (M5, S02). `docs/87` 72. Confirm `qad yaʾtī` reads as
     possibility rather than as the past "already", that the two jobs of one particle are not
     confusable in speech, and that `rubbamā qad yaʾtī` — the mistake plate — is genuinely a stack
     rather than an accepted double hedge.
113. **The rest of the `laysa` paradigm** (M5, S03). `docs/87` 73. Confirm `lasta`, `lasti`, `lasnā`
     and `laysū` are all four used in speech at this register, and confirm `lasnā mashghūlūn` — the
     plural predicate written without a case ending — is what a speaker says.
114. **The predicate after `laysa`: bare or `-an`?** (M5, and the wave's second orthographic seam.)
     The course does both, and this wave copied each adjective's own first-teach rather than pick.
     Decide it: is `lastu muwāfiq` (L3-M3) or `lastu mutaʾakkidan` (L3-M6) the shape a learner should
     be given, and if one of them is wrong, say which module carries the error. This is the only
     question here whose answer would change a shipped L3 file.
115. **`ka-annahu`, `ḥasanan`, `taqrīban` and `ʿalā ayy ḥāl` as a register** (M5, S06–S10). Four
     softeners, all fresh, all tagged `neutral`. Confirm each is spoken rather than written, confirm
     `ḥasanan` genuinely does not read as agreement (S07 depends on it), and confirm the module's
     closing claim — that `āsif, lā aẓunn anna hādhā mumkin` is a softer refusal than
     `āsif, hādhā laysa mumkin`, which is the whole reason the module exists. This is question 100's
     continuation into the level's fifth rung.

---

## Wave 3 — L4-M6 through L4-M10 (#554)

The level's RANGE modules and its exit: **L4-M6 "Before and after"**, **L4-M7 "Official talk"**,
**L4-M8 "Back then"**, **L4-M9 "Places and journeys"** and **L4-M10 "A story with a twist"**,
written against the briefs in [`docs/87-en-ar-L4-brief-decisions.md`](87-en-ar-L4-brief-decisions.md)
and shipped `verified: true` with their signature in the same change, per the repo's one-pass rule.

**The index this wave was written against** is the emitted `public/content/en-ar/index/` as it stood
when the wave opened — `npm run content:owner` reporting *967 surfaces owned, folded over 35 modules
through L4-M5*, i.e. the complete L1–L3 ladders plus waves 1 and 2. Every ownership claim quoted
below is a verbatim line from that tool. By the time the wave closed the same command reported
*1095 surfaces owned, folded over 39 modules through L4-M9*, because the parent rebuilt
`public/content/` while the nine courses' waves landed; the post-wave lines are quoted where they
say something the opening fold could not. No L1, L2 or L3 file was touched, no other course was
touched, and no build output was written by this wave.

The five modules chain: `L4-M6` takes `["L4-M5"]`, `L4-M7` `["L4-M6"]`, `L4-M8` `["L4-M7"]`,
`L4-M9` `["L4-M8"]` and `L4-M10` `["L4-M9"]`.

### L4-M6 — Before and after

*Time clauses: while, until, since, already, not yet.* Ten module rules, **fourteen** rows against a
`newWordCap` of 25. The module's whole spend is conjunctions: eight of the fourteen rows are the
particle `an` doing a job L3-M1 deliberately held back.

| # | display | teaches |
|---|---------|---------|
| S01 | `qabla an adhhab ilā al-ʿamal, sharibtu al-qahwa` | `qabla an`, and rule 1: the verb behind it stays present-shaped however far back the sentence sits |
| S02 | `baʿda an akaltu, dhahabtu ilā al-maktab` | `baʿda an`, and that the twin is not symmetrical — this one takes the past |
| S03 | `sa-antaẓir hunā ḥattā yaṣil al-qiṭār` | `ḥattā` with both its jobs on one row, plus `sa-antaẓir` (+ `antaẓir`) and `yaṣil` (+ `aṣil`, `taṣil`) |
| S04 | `intaẓartu ilā an waṣala al-qiṭār` | `ilā an` as `ḥattā`'s swap, with the ḥattā-past shown as its own first variation |
| S05 | `athnāʾ al-ijtimāʿ, saʾalanī al-mudīr ʿan al-ʿamal` | `athnāʾ`, the nominal while, on a noun the ladder already owns |
| S06 | `khilāl al-akl, lā ataḥaddath kathīran` | `khilāl` on L4-M1's maṣdar `al-akl`, plus `ataḥaddath` (+ `taḥaddathnā`) |
| S07 | `ḥīna dhahabtu ilā al-maktab, kāna al-mudīr hunāka` | `ḥīna`, with L3-M10's `ʿindamā` and `baynamā` as its two variations — the point/stretch split re-used, not re-opened |
| S08 | `lam yaṣil al-qiṭār baʿd` | the NOT-YET frame: `lam yaṣil` whole, and the trailing `baʿd` with the `baʿda` warning on its own row |
| S09 | `qad waṣala al-qiṭār, wa lākin lam yaṣil ṣadīqī baʿd` | `qad waṣala` (+ `qad waṣaltu`, `qad akaltu`) — L3-M7's already, named so not-yet has something to stand against |
| S10 | `qad waṣaltu ilā al-maktab, wa lākin lam yabdaʾ al-ijtimāʿ baʿd` | `yabdaʾ` (+ `abdaʾ`, `tabdaʾ`), and both machines in one sentence |

`mundhu` is L3-M7's and is never re-opened: rule 9 states the since/because split and grounds it on
pool item C11, `adrus al-ʿarabiyya mundhu sana`, every token of which was already owned. Nothing here
opens `mā zāla` (M8's), the pluperfect (M3's) or `fajʾatan` (M10's).

### L4-M7 — Official talk

*Announcements, offices and counters.* Nine module rules, **twenty-two** rows against a `newWordCap`
of 25 — the wave's most expensive module, and the brief predicted why: every passive cell is a
separate surface from its active one.

| # | display | teaches |
|---|---------|---------|
| S01 | `yurjā al-intiẓār fī aṭ-ṭābūr ḥattā yaʾtī ad-dawr` | `yurjā`, `al-intiẓār` (+ `intiẓār`), `aṭ-ṭābūr` (+ `ṭābūr`), `ad-dawr` (+ `dawr`), with M6's `ḥattā` already in hand |
| S02 | `yumnaʿ at-tadkhīn fī al-maktab` | `yumnaʿ` beside L3-M8's `mamnūʿ`, and the no-agent rule on the mistake plate |
| S03 | `kutiba al-ism fī al-istimāra` | `kutiba` (+ `kutibat`), `yuktab` (+ `tuktab`) and `al-ism` — the vowel change as the whole passive |
| S04 | `tudfaʿ ar-rusūm fī ash-shubbāk` | `tudfaʿ` (+ `yudfaʿ`, `dufiʿa`), `ar-rusūm`, `ash-shubbāk`, one vowel from L3-M8's `tadfaʿ` |
| S05 | `sa-yughlaq al-maktab baʿda sāʿa` | `sa-yughlaq` (+ `yughlaq`): L1-M6's `sa-` costs nothing on top of a passive |
| S06 | `yuftaḥ al-maktab kull yawm` | `yuftaḥ` (+ `futiḥa`, `sa-yuftaḥ`), with L3-M8's `maftūḥ` as the state it is not |
| S07 | `yuʿlan ʿan taʾkhīr al-qiṭār fī al-maḥaṭṭa` | `yuʿlan`, `taʾkhīr` (+ `at-taʾkhīr`) and `iʿlān` (+ `al-iʿlān`) |
| S08 | `yajibu ʿalayka an tadfaʿ ar-rusūm al-yawm` | `yajibu ʿalayka` (+ `yajibu ʿalayki`, bare `ʿalayka`) — L3-M2's `yajibu` given a second job |
| S09 | `min faḍlikum, tafaḍḍalū ilā ash-shubbāk` | the plural of politeness: `min faḍlikum` and `tafaḍḍalū`, both to one person |
| S10 | `ḥaḍratuka, hal maʿaka al-huwiyya wa al-ḥajz?` | `ḥaḍratuka` (+ `ḥaḍratuki`), `al-huwiyya`, `al-ḥajz` |

The office vocabulary is re-used and never re-opened, exactly as the brief required: `mamnūʿ`,
`maṭlūb`, `maftūḥ`, `mughlaq`, `tadkhīn`, `maktab`, `istimāra` and `tadfaʿ` all appear and all point
back at L3-M8, and `muwaẓẓaf` at L3-M2. Rule 8 points at L3-M10's `wulidtu` / `wulida` as the passive
the learner already owns without having been told it was a system.

### L4-M8 — Back then

*Habits and states in the past; then against now.* Nine module rules, **thirteen** rows against a
`newWordCap` of 25. It is the wave's cheapest module because the class is one shape with four
meanings, and the shape is L1-M5's `kāna`.

| # | display | teaches |
|---|---------|---------|
| S01 | `kuntu adrus fī al-jāmiʿa kull yawm` | the habitual frame `kuntu adrus` (+ `kunta tadrus`, `kāna yadrus`), with the person written at both ends |
| S02 | `mā zāltu adrus al-ʿarabiyya kull yawm` | `mā zāltu` (+ `mā zāla`, `mā zālat`) — indexed whole, so bare `mā` stays free |
| S03 | `lam aʿud adrus fī al-jāmiʿa` | `lam aʿud` (+ `lam yaʿud`, `lam taʿud`): M6's `lam` plus a jussive, and no new machinery |
| S04 | `aṣbaḥa al-jaww bārid fī tilka al-ayyām` | `aṣbaḥa` (+ `aṣbaḥat`) and `tilka` (+ `tilka al-ayyām`) |
| S05 | `ṣāra al-ʿamal ṣaʿb baʿda dhālika` | `ṣāra` (+ `ṣārat`), and the mistake plate against stacking two sisters |
| S06 | `fī al-māḍī kuntu adrus kull yawm, ammā al-ān fa-adhhab ilā al-ʿamal` | `fī al-māḍī` (+ `al-māḍī`), and L4-M2's `ammā … fa-` doing its second tour |
| S07 | `sābiqan kāna al-bayt ṣaghīr` | `sābiqan` and `ṣaghīr` (+ `ṣaghīra`), with the no-`kāna` nominal sentence as the mistake |
| S08 | `fī aṭ-ṭufūla kuntu ṭifl saʿīd` | `aṭ-ṭufūla` (+ `ṭufūla`) and `ṭifl` (+ `ṭifla`) |
| S09 | `lā yazāl al-mudīr fī al-maktab` | `lā yazāl`, `mā zāla`'s present-shaped twin |
| S10 | `kuntu ṭālib sābiqan, wa al-ān aṣbaḥtu mudīr` | `aṣbaḥtu`, and the two halves of a life in one line |

Rule 6 sends the not-yet half back to M6's `lam … baʿd` rather than reaching for it here, and rule 7
holds the contrast to two clauses. The pluperfect (M3), the passive (M7) and `fajʾatan` (M10) are all
kept out.

### L4-M9 — Places and journeys

*A trip told in full, with directions inside it.* Six module rules, **twenty-one** rows against a
`newWordCap` of 25. Three of the rows are the relative pronouns themselves, which the brief was right
to call the level's largest single opening.

| # | display | teaches |
|---|---------|---------|
| S01 | `khudh al-ḥāfila allatī tadhhab ilā as-sūq` | `allatī`, on L2-M4's imperative and L2-M4's bus |
| S02 | `hādhā huwa ash-shāriʿ alladhī yadhhab ilā al-maḥaṭṭa` | `alladhī`, plus `ash-shāriʿ` and `aṭ-ṭarīq` |
| S03 | `raʾaytu an-nās alladhīna yaʿmalūn fī al-maṭār` | `alladhīna` with `an-nās` and `yaʿmalūn` — the human plural needed a human plural noun |
| S04 | `raʾaytu rajul yaqif amāma al-bāb` | the INDEFINITE law: `rajul`, `yaqif` (+ `taqif`, `waqafa`), `amāma`, and no pronoun at all |
| S05 | `al-funduq alladhī nazalnā fīhi kāna jamīl` | the masculine resumptive: `al-funduq`, `nazalnā` (+ `nazaltu`), `fīhi` |
| S06 | `al-qarya allatī nazalnā fīhā kānat ṣaghīra` | the feminine resumptive: `al-qarya` and `fīhā`, agreeing with `allatī` above it |
| S07 | `sāfartu ilā al-maṭār bi-al-qiṭār` | `sāfartu` (+ `sāfara`, `sāfarnā`) and `al-maṭār`, with L2-M4's `bi-al-qiṭār` free of charge |
| S08 | `kānat ar-riḥla ṭawīla, wa lākin al-manẓar kāna jamīl` | `ar-riḥla` and `al-manẓar`, and two agreements in one sentence |
| S09 | `idhhab mustaqīm ḥattā taṣil ilā al-maḥaṭṭa` | `mustaqīm`, with M6's `ḥattā` and `taṣil` carrying the clause |
| S10 | `raʾaytu imraʾa taqif amāma al-funduq alladhī nazalnā fīhi` | `imraʾa`, and both relative laws working against each other in one line |

`man` and `mā` as free relatives are left alone, the passive relative is M7's and is not touched, and
the resumptive is taught on `fīhi` / `fīhā` only — the direct-object case, which drops the pronoun,
is deliberately not opened.

### L4-M10 — A story with a twist

*A six-sentence narrative with a line of dialogue inside it.* Seven module rules, **ten** rows — one
per account — against a `newWordCap` of 25. Almost nothing here is new, exactly as the brief asked:
the honest spend is the quoting frame, the turn words and the two answering verbs.

| # | display (opening) | teaches |
|---|---------|---------|
| S01 | `ams, iltaqaytu ṣadīqī fī as-sūq. …` | `qāla lī` (+ `qālat lī`), with L3-M5's `qultu innahu ṣaʿb` in the same account as the report half |
| S02 | `kuntu adrus fī al-bayt. wa fajʾatan …` | `fajʾatan`, breaking M8's habitual background |
| S03 | `dhāta yawm, sāfartu ilā al-qarya. …` | `dhāta yawm`, indexed whole, and the verb-first opening |
| S04 | `dhahabtu ilā al-maktab mutaʾakhkhir. …` | `ajāba` (+ `ajābat`), answering a question |
| S05 | `dhahabtu ilā ash-shubbāk fī al-maḥaṭṭa. …` | `radda` (+ `raddat`), answering a request — with M7's whole register inside the story |
| S06 | `dhāta yawm, waṣala ṣadīqī fajʾatan. …` | `al-mufājaʾa` (+ `mufājaʾa`), the noun of the turn |
| S07 | `kāna al-ijtimāʿ ṭawīl. …` | `aṣ-ṣamt` (+ `ṣamt`), with L4-M5's `lā aẓunn anna` and L4-M4's `maʿaka ḥaqq` quoted verbatim |
| S08 | `dhāta yawm, iltaqaytu rajul fī al-qiṭār. …` | `iltaqaytu` (+ `iltaqā`), and M9's indefinite antecedent doing narrative work |
| S09 | `kāna ṣadīqī yaqif amāma al-funduq. …` | `qāla lahu` (+ `qālat lahu`) — the third-person hearer, and the no-backshift rule |
| S10 | `kāna yawm gharīb. …` | `gharīb` (+ `gharība`), and the level's exit: a relative clause, a sister verb and a quoted line in six sentences |

The verb-before-subject law is in force and is not restated, per the brief. `wa idhā bi-` is named in
the brief as an alternative to `fajʾatan` and is deliberately **left unspent** — see seam 12 below.

---

## Seams: where the brief and the index disagreed (wave 3)

Twelve corrections. Every quoted line is `npm run content:owner -- en-ar …` output from this wave.

The seams below are unnumbered, as in waves 1 and 2; the numbered questions continue at 116 further
down.

**1. Every L4 brief's INDEX SEAM names a count that is now three waves stale.** M8's brief says
`mā` "is free today across the whole 840-surface fold". The claim about `mā` is still true; the
number is not, and it was not 840 when this wave opened either.

```
mā	free

967 surfaces owned, folded over 35 modules through L4-M5
```

By the time the wave closed the same command's footer read *1095 surfaces owned, folded over 39
modules through L4-M9*. `mā` is still free, and this wave kept it that way on purpose: `mā zāla`,
`mā zāltu` and `mā zālat` are all indexed whole, so the negative particle L5 will want is untouched.

**2. `raʾaytu` is L4-M3's, and TWO briefs call it fresh.** M9's rule-3 worked example is
`raʾaytu rajul yaqif amāma al-bāb`, and M10's fresh list names `raʾaytu` outright beside
`iltaqaytu`.

```
raʾaytu	L4-M3
iltaqaytu	free
```

L4-M3 bought it inside `la-raʾaytu`, whose hyphen parts opened the bare key (wave 2 recorded that).
Both modules therefore point back rather than opening it, and M9-S04 and M9-S10 rest on a row that
does not exist in either file.

**3. A definite noun whose bare form is owned can still be an UNTAUGHT SURFACE.** This is the
sharpest mechanical finding of the wave and it shaped four sentences. `surfaceIndexKeys` splits a
hyphenated token into parts only when INDEXING; the resolver looks the whole token up and never
falls back to the parts.

```
aṣ-ṣabāḥ	free   [parts: aṣ → L1-M4, ṣabāḥ → L1-M4]
al-usbūʿ	free   [parts: al → L1-M1, usbūʿ → L1-M6]
al-ʿamal	L1-M4   [parts: al → L1-M1, ʿamal → L1-M4]
```

Both parts of `aṣ-ṣabāḥ` are owned by L1-M4 and the whole key is still free, so `fī aṣ-ṣabāḥ` in a
display would have been a `SHOWN-BUT-UNTAUGHT`. `al-ʿamal`, by contrast, was written as a whole
surface somewhere in L1 and is safe. M6's brief warns about the reverse direction — a sun-letter
part colliding with a particle, `an-nihāya` giving `an` — and that warning is correct but does not
cover this. **Never assume a definite form from a bare one; ask for the exact string you intend to
write.** M6-S06 lost `khilāl al-usbūʿ` to this and took `khilāl al-akl` (L4-M1's maṣdar) instead;
M7 and M8 chose every `al-` noun the same way.

**4. `yaʿūdu` carries a written indicative ending this course does not write.** M8's brief lists
`yaʿūdu` among its fresh keys. L2-M1 rule 4 forbids written mood endings, and wave 2 recorded the
identical seam for `aẓunnu` / `aʿtaqidu`.

```
yaʿūdu	free
yaʿūd	free
lam aʿud	L4-M8
```

Both spellings are free, so the index cannot settle it. The module ships the negative frame only —
`lam aʿud`, `lam yaʿud`, `lam taʿud` — and leaves the positive verb of returning unspent in either
spelling. Question 120 asks for the ruling.

**5. `ʿalayka` is free but `ʿalaykum` is L1-M2's.** M7's brief lists `ʿalayka` as fresh and says
nothing about the plural.

```
ʿalayka	L4-M7
ʿalaykum	L1-M2
```

`ʿalaykum` came in thirty-odd modules ago inside the greeting, so M7's `yajibu ʿalayka` row carries
`yajibu ʿalayki` as its second cell rather than a plural one — a paradigm with a hole in it exactly
where the brief's warning about `sarei`/`sarebbe` predicted.

**6. `intaẓir` is L4-M1's and `intaẓartu` is L2-M10's; only the present cells were free.** M6's
brief lists no verb of waiting at all, and the module's `ḥattā` sentences need one.

```
intaẓartu	L2-M10
intaẓir	L4-M1
antaẓir	L4-M6
sa-antaẓir	L4-M6   [parts: sa → L1-M6, antaẓir → L4-M6]
```

The row therefore buys `sa-antaẓir` and `antaẓir` and nothing else, and S04 uses L2-M10's
`intaẓartu` untouched.

**7. `min faḍlik`, the SINGULAR politeness formula, is free after thirty-nine modules.** M7's brief
names `min faḍlikum` as fresh and implies the singular is owned.

```
min faḍlik	free
min faḍlikum	L4-M7
tafaḍḍal	L2-M5
```

`tafaḍḍal` is L2-M5's, so the course has the singular of one half of the pair and neither half of
the other. M7 spends only the plural, because the plural is what the register teaches; `min faḍlik`
is left free deliberately and is flagged at question 118.

**8. L2-M4's directions do not include a verb of walking.** M9's brief says directions "are L2-M4's
and are re-used whole".

```
imshi	free
idhhab	L2-M4
mustaqīm	free
```

So `imshi mustaqīm`, the natural "go straight", was unavailable without buying `imshi`. M9-S09 ships
`idhhab mustaqīm` on L2-M4's own imperative and spends one row on `mustaqīm`.

**9. Neither `an-nās` nor `ar-rijāl` was taught, so `alladhīna` had nothing to attach to.** M9's
brief lists all three relative pronouns as free and its fresh list carries no human plural noun.

```
an-nās	L4-M9   [parts: an → L1-M3, nās → L4-M9]
ar-rijāl	free   [parts: ar → L2-M5, rijāl → free]
```

`alladhīna` cannot be SHOWN without one, so M9-S03 buys `an-nās` and `yaʿmalūn` alongside it. The
brief's own surprise — that `rajul` is free after thirty modules — extends to the plural.

**10. L2-M4 already owns the transport phrase whole.** M9's brief does not say so, and the pattern
line `sāfartu ilā <place> bi- al- N-transport` reads as though the `bi-` compound had to be bought.

```
bi-al-qiṭār	L2-M4   [parts: bi → L1-M2, al → L1-M1, qiṭār → L2-M4]
bi-al-ḥāfila	L2-M4   [parts: bi → L1-M2, al → L1-M1, ḥāfila → L2-M4]
bi-as-sayyāra	free   [parts: bi → L1-M2, as → L1-M2, sayyāra → L1-M3]
```

Two of the three are free of charge and the third is not — the same hyphen-token rule as seam 3,
seen from the paying side. M9 uses only the two that are owned.

**11. L4-M2 owns five `fa-` compounds and no pronoun one.** M8's then-against-now pattern is
`ammā al-ān fa- + <clause>`, and the obvious clause starts with a pronoun.

```
fa-adhhab	L4-M2   [parts: fa → L4-M2, adhhab → L1-M4]
fa-yadhhab	L4-M2   [parts: fa → L4-M2, yadhhab → L1-M4]
fa-anā	free   [parts: fa → L4-M2, anā → L1-M1]
fa-huwa	free   [parts: fa → L4-M2, huwa → L2-M2]
```

`fa-anā` and `fa-huwa` are each a fresh key, so M8-S06 writes `ammā al-ān fa-adhhab ilā al-ʿamal` —
the verb clause L4-M2 already paid for — rather than the pronoun clause the English gloss suggests.

**12. `wa idhā bi-` is a per-noun key and is left unspent.** M10's brief offers "fajʾatan or
wa idhā bi-" as the thing that breaks the background.

```
wa idhā bi	free
idhā	L3-M4
bi	L1-M2
```

The parts are owned but the frame is only ever written attached to a noun — `bi-ar-rajul`,
`bi-ṣadīqī` — and by seam 3 each of those is a separate key. Buying the frame would cost one row per
story that used it, so the module takes the brief's "or" and uses `fajʾatan` alone in five of the ten
accounts. `innamā` and `ghayr anna`, left unspent by wave 2, are still free and were not touched.

### Two mechanical facts confirmed rather than corrected

- **Edge punctuation really does fall away, quotation marks included.** M10's brief says
  `normalizeSurface` drops edge punctuation so a quoted word indexes as itself. Confirmed against the
  real function and against `npm run content:shown`: all ten M10 accounts write `"` around the quoted
  line and a `:` before it, and every one of them resolves. The `script` line writes the Arabic
  guillemets `«»` and is never indexed.
- **`lam yakun` needs no row.** It is free as a span and resolves through its two owned tokens
  (`lam` L3-M4, `yakun` L3-M4), which is how L3-M10 shipped it. A later wave should not buy it.

### Re-teaches

**None.** `npm run content:shown` reported no `RE-TEACH` line for any of the five modules, and no
`COLLIDES INSIDE THIS MODULE`. There is no deliberate repeat in this wave: every row of every module
opens a key no earlier module owns, and no key is opened twice inside one module. Where a module
needed a word an earlier rung owns — `ʿindamā` and `baynamā` in M6-S07, `mamnūʿ` and `maftūḥ` in M7,
`bi-al-qiṭār` in M9-S07, `lā aẓunn anna` and `maʿaka ḥaqq` in M10-S07 — it is shown in a display or a
variation and given no row, so the learner's tap reaches the first-teach note.

---

## The ratchet

- `npm run content:validate` → **`CONTENT 360/360 ok`**, whole-tree green with the five new files
  listed as `en-ar/L4-M6.json ok`, `en-ar/L4-M7.json ok`, `en-ar/L4-M8.json ok`,
  `en-ar/L4-M9.json ok` and `en-ar/L4-M10.json ok`. The denominator moves while the other eight
  courses' waves land beside this one; what matters is the shape of the line and that no file in it
  is `FAIL`.
- `npm run content:shown -- en-ar L4-M6` → `L4-M6: clean — every shown surface resolves`
- `npm run content:shown -- en-ar L4-M7` → `L4-M7: clean — every shown surface resolves`
- `npm run content:shown -- en-ar L4-M8` → `L4-M8: clean — every shown surface resolves`
- `npm run content:shown -- en-ar L4-M9` → `L4-M9: clean — every shown surface resolves`
- `npm run content:shown -- en-ar L4-M10` → `L4-M10: clean — every shown surface resolves`
- `npx vitest run tools/shown-surfaces.test.ts` → **11 passed (11)**. en-ar holds at its baseline of
  **6**; no baseline was raised and none was lowered — this wave fixed no pre-existing finding and
  added none. Every `variations[].display` and every one of the sixty pool items resolves.

`src/course/types.test.ts` went red mid-wave on census assertions only — `finds all 354` against 358
files, and the en-ar count expecting 39 against 40 — both of them the parent's to move as the nine
waves land, and both moved before the wave closed: the file finishes at **381 passed (381)**. Because
the en-ar count guards the language-law walk below it and vitest aborts the case there, **the en-ar
law was also re-run by hand over all five modules** while that assertion was red: no sentence, word, `forms`
entry, variation, mistake or pool `display` carries an Arabic character, and every one of those
surfaces carries a `script` line that does. Every teaching field — `rules[].text`, word `note` and
`cue`, `trap`, `sound`, `variations[].changed`, `mistake.why`, `usage`, `mnemonic`, `literal`,
sentence `cue` — is English, and no display or `forms` entry carries a stray apostrophe of any class.
No `glossEn` appears anywhere. Hamza is `ʾ` and ʿayn is `ʿ` throughout and the two are never
interchanged (`athnāʾ`, `taʾkhīr`, `yabdaʾ`, `imraʾa`, `mufājaʾa`, `fajʾatan`, `qaraʾtu`, `lā baʾsa`
against `yumnaʿ`, `yuʿlan`, `tudfaʿ`, `ʿalayka`, `shāriʿ`, `baʿd`, `aṣbaḥa`, `saʾalanī`). No mood
ending is written anywhere: `adhhab`, `adrus`, `yaṣil`, `taṣil`, `yabdaʾ`, `tadfaʿ`, `yaqif`,
`ataḥaddath`, `antaẓir`, `aʿud` — with the one standing exception `yajibu`, whose `-u` L3-M2 shipped
and M7 inherits inside the frozen frame `yajibu ʿalayka`. No word note exceeds 200 characters. The
longest single-clause display is 11 tokens against bounds of 13 and 14, the longest sentence inside
an M10 account is 7 against a bound of 14, and the five row counts are 14, 22, 13, 21 and 10 against
a `newWordCap` of 25.

---

## Open questions for the native-speaker gate (wave 3)

Continuing the chain, which ends at 115 above. Nothing earlier is renumbered. **The native-speaker
gate is unmet**, and none of these may be closed by rewriting a shipped module.

116. **`qabla an` with a present verb inside a past sentence** (M6, S01). Rule 1 makes a strong claim:
     that `qabla an adhhab ilā al-ʿamal, sharibtu al-qahwa` is what a speaker says, and that
     `qabla an dhahabtu` is heard as wrong rather than as colloquial. Confirm it, and confirm the
     asymmetry with `baʿda an` + past on S02 — a learner who is told the two conjunctions are twins
     will not believe the split unless a speaker states it.
117. **`ḥattā` against `ilā an`, and whether they really swap** (M6, S03–S04). The module presents
     them as free variants in the until slot, with the tense of the following verb carrying the whole
     difference. Confirm the swap is genuine at this register, and say whether one of them is
     markedly more written than the other — S04's first variation asserts they are interchangeable in
     the same sentence.
118. **`baʿd` at the end of a clause, and the `baʿda` pair** (M6, S08–S10). Confirm `lam yaṣil
     al-qiṭār baʿd` is the everyday "hasn't arrived yet", that the trailing `baʿd` is really said with
     no vowel behind it, and that a listener hears the difference from `baʿda` in speech rather than
     only on the page. The module's whole not-yet frame rests on this, and rule 7 promises a learner
     the vowel is audible.
119. **`athnāʾ` and `khilāl` as a true swap, and the register they carry** (M6, S05–S06). Both rows
     say the two are interchangeable and rule 4 calls the nominal while "what a careful speaker
     says". Confirm both claims, and say whether `ḥīna` (S07) is spoken or is a written-register word
     that `ʿindamā` covers in speech — the module tags it `neutral` on the assumption that it is
     spoken.
120. **The spelling of the verb of returning** (M8, and this wave's orthographic seam). The brief
     writes `yaʿūdu` with the indicative `-u`; L2-M1 rule 4 says no mood ending is written, and both
     spellings are free in the index. Decide it, and say whether the positive verb should be opened
     at all or whether `lam aʿud` alone is the right spend — this is the same class of question as
     114 and answering one should answer both.
121. **The passive as SPOKEN Arabic** (M7, S03–S07). The module ships eight passive cells and rule 0
     claims the vowel change is the whole machine. Confirm that `kutiba`, `tudfaʿ`, `yughlaq`,
     `yuftaḥ` and `yuʿlan` are what a passenger actually hears at a station and a counter, and confirm
     rule 1's absolute: that a `min` + agent phrase behind a passive is heard as broken rather than as
     awkward. This is the most load-bearing claim in the wave.
122. **The plural of politeness to one person** (M7, S09). Confirm a clerk says `min faḍlikum` and
     `tafaḍḍalū` to a single customer, and say whether this is pan-Arab or regional — the module
     presents it as the register with no hedge, and an English speaker will hear it as an error.
     Bound up with seam 7: say whether `min faḍlik` should have been opened first, in L1 or L2.
123. **`ḥaḍratuka` at a counter** (M7, S10). Confirm this is the deferential you a clerk uses, that
     `ḥaḍratuki` is its feminine, and that bare `anta` in the same exchange lands as brusque, which
     is what the mistake plate claims. Say also whether `ḥaḍratuka` is Egyptian-flavoured rather than
     MSA-neutral; the module tags the whole sentence `formal`.
124. **`yumnaʿ` beside `mamnūʿ`** (M7, S02). Rule 4 splits them by mouth against wall: the sign reads
     `mamnūʿ at-tadkhīn`, the guard says `yumnaʿ at-tadkhīn`. Confirm the split is real rather than a
     teaching convenience, and confirm `yurjā` is the ordinary announcement verb rather than a
     written-notice one.
125. **kāna's sisters as one class of four** (M8, rule 0). The module's cheapness depends on
     `kāna`, `mā zāla`, `aṣbaḥa` and `ṣāra` being one grammatical class rather than a list assembled
     for teaching. Confirm that, confirm `aṣbaḥa` and `ṣāra` really do swap as freely as S04 and S05
     claim, and confirm the mistake plates — that stacking two sisters is heard as broken.
126. **`mā zāla` against `lā yazāl`** (M8, S02, S09). The module says they mean the same thing and
     differ only in shape, with `lā yazāl` commoner in writing. Confirm that, and confirm the S09
     mistake plate: that `lam yazāl` is not something a speaker says and that the family's only
     negative is `lam yaʿud`.
127. **The habitual with the person written twice** (M8, S01). Confirm `kuntu adrus` is the everyday
     "I used to study" and that `kuntu yadrus` is heard as wrong — rule 1 promises a hard agreement at
     both ends, and the whole frame is L3-M10's most load-bearing claim promoted to grammar.
128. **The resumptive pronoun, and whether it is ever dropped** (M9, S05–S06). Rule 3 makes it
     obligatory and the mistake plates make its absence an error. Confirm that a speaker really does
     say `al-funduq alladhī nazalnā fīhi` rather than dropping `fīhi` in casual speech, and confirm
     `nazalnā fī` is the ordinary verb for staying at a hotel.
129. **The indefinite antecedent with no pronoun** (M9, S04, S10). Confirm `raʾaytu rajul yaqif
     amāma al-bāb` is what a speaker says, with no relative and no case ending on `rajul`, and confirm
     the pair with S04's second variation: that making the noun definite is exactly what obliges
     `alladhī`. These are the two errors the brief called the level's sharpest interference pair and
     the module plates both.
130. **`alladhīna` and what counts as a human plural** (M9, S03). Confirm `an-nās alladhīna
     yaʿmalūn` is right, and say where the line falls — the module tells a learner that a non-human
     plural takes `allatī` and gives no example of one, which is a rule with no drill behind it.
131. **The quoted line and the flip of every deictic** (M10, S01, S09, S10). Rule 1 says `anna` and
     `inna` vanish from a quotation and the pronouns flip with them. S10's mistake plate goes
     further and flips `hunā` to `hunāka` as well. Confirm that the place words move too, and confirm
     `qāla lī anna anā marīḍ` is heard as broken rather than as emphasis.
132. **`ajāba` against `radda`** (M10, S04–S05, rule 6). The module splits them by what came before —
     `ajāba` after a question, `radda` after a statement or a request. Confirm the split, and say
     whether a speaker would reach for either after a loudspeaker announcement, which is what S05
     does.
133. **The turn words, and whether the story shape is right** (M10, S02, S06, S10). Confirm
     `fajʾatan` is the spoken word for the break rather than a written one, confirm `dhāta yawm` is
     the ordinary story opener, and confirm the module's structural claim — that stating the verdict
     first (`kāna yawm gharīb`) and then earning it is how an account is told, rather than an English
     habit imported into Arabic. This is what `docs/54` asked of L2-M10 and L3-M10, asked once
     more of the rung the level exits on.
