# en-ar L5 — LLM review (wave 1: L5-M1, L5-M2)

The first authoring wave on en-ar's fifth and last level: **L5-M1 "Sayings and idioms"** and
**L5-M2 "Humour and teasing"**, written against the briefs in
[`docs/105-en-ar-L5-brief-decisions.md`](105-en-ar-L5-brief-decisions.md) (#565) and shipped
`verified: true` with their signature in the same change, per the repo's one-pass rule.

**The index this was written against** is the emitted `public/content/en-ar/index/`, folded by
`npm run content:owner`, and it had already moved past the briefs' planning reading before a line
was authored. Every ownership decision below was taken at

```
1113 surfaces owned, folded over 40 modules through L4-M10
```

— the complete L1–L4 ladder — where `docs/105` §0 was written to *1095 surfaces, 39 modules through
`L4-M9`* and therefore treated `L4-M10`'s brief claims as merely "spent". They are not spent any
more; they are owned, and the tool says so. A build landed mid-wave, so the closing readings quoted
in §Seams were taken at `1150 surfaces owned, folded over 41 modules through L5-M1`, which is the
same fold plus this wave's own first module. Where the brief and the tool disagreed, the tool won,
and every such case is recorded below. No L1–L4 file was touched, no other course was touched, and
no build output was written by this wave.

---

## The modules

### L5-M1 — Sayings and idioms

*The figurative everyday, and when it is used.* `prerequisites: []` — first rung of the level, so it
takes no prerequisite at all (an L4 id here is rejected by `tools/validate.ts`).
`maxWordsPerSentence: 12`, `newWordCap: 25`, tenses `simple_present` and `simple_past`.

The ten displays:

| # | display | teaches |
|---|---------|---------|
| S01 | `hunāka mathal yaqūl: man jadda wajada` | the quoting frame, and the first fossil — `man jadda wajada` stored WHOLE, so L2-M7's question word `man` is never spent |
| S02 | `mā qalla wa dalla, kamā yaqūl al-mathal` | the second fossil, also stored whole (bare `mā` stays free for M8), and `kamā` — the other frame |
| S03 | `aṣ-ṣabr miftāḥ al-faraj, wa hādhā mathal qadīm` | a transparent proverb taken apart: `aṣ-ṣabr`, `al-faraj`, `qadīm`, over L1-M7's `miftāḥ` doing figurative work |
| S04 | `ṣadīqī khafīf ad-damm jiddan` | the BODY IDIOM as one stored unit — an L3 iḍāfa whose whole says what no part of it says |
| S05 | `jārī ṭawīl al-bāl, wa huwa khafīf ad-damm ayḍan` | a second body idiom beside the first, plus `jārī` / `al-jār` |
| S06 | `hunāka mathal yaqūl: al-jār qabla ad-dār` | the proverb that survives on its rhyme, and `ad-dār` against L1-M3's everyday `al-bayt` |
| S07 | `ʿuṣfūr fī al-yad khayr min ʿuṣfūr ʿalā ash-shajara` | the one saying that really does transfer from English, and the warning that the transfer is rare |
| S08 | `hiya khafīfa ka-al-ʿuṣfūr` | bare `khafīf` as a LIVE comparison under L4-M5's `ka-`, against `khafīf ad-damm`; plus free-standing `mithl` |
| S09 | `hādhā ar-rajul ṭawīl al-lisān wa lākin qalbuhu abyaḍ` | the third body idiom, the opposite verdict on the same shape, and `qalbuhu abyaḍ` — a colour where English uses a temperature |
| S10 | `ad-dunyā ṣaghīra, kamā yaqūl al-mathal` | the saying whose English twin is exact, said with the register still one notch graver |

Eight module rules, ordered: the fixed expression as a stored string (0), the body idiom as an
already-owned iḍāfa (1), the literal-reading interference (2), `man` as a fossil free relative (3),
`mā` in front of a past verb as the second fossil (4), the two quoting frames (5), REGISTER — the
brief's headline interference, that an Arabic proverb is graver than an English one (6), and `ka-`
against `mithl` as live comparison where the idiom is not (7).

Nineteen new keys, six under the cap: `mathal` (with `al-mathal`, `amthāl`), `man jadda wajada`,
`mā qalla wa dalla`, `kamā`, `aṣ-ṣabr`, `al-faraj`, `qadīm`, `khafīf ad-damm`, `ṭawīl al-bāl`,
`jārī` (with `al-jār`, `jār`), `ad-dār`, `ʿuṣfūr` (with `al-ʿuṣfūr`, `ka-al-ʿuṣfūr`), `ash-shajara`,
`khafīf`, `mithl`, `ṭawīl al-lisān`, `qalbuhu` (with `al-qalb`, `qalb`), `abyaḍ`, `ad-dunyā`.

### L5-M2 — Humour and teasing

*Banter, irony, and when not to.* `prerequisites: ["L5-M1"]` — the module immediately below it in
the same level, which is the only thing `tools/validate.ts` accepts. `maxWordsPerSentence: 12`,
`newWordCap: 25`, tenses `simple_present`, `simple_past`, `habitual_past`.

The ten displays:

| # | display | teaches |
|---|---------|---------|
| S01 | `yā akhī, anta ẓarīf jiddan` | the VOCATIVE `yā` — the module's one genuinely new piece of grammar — plus `akhī` and `ẓarīf` |
| S02 | `kuntu amzaḥ faqaṭ, yā ʿammī` | the retraction: L4-M8's `kāna` + imperfect doing a new job, and `ʿammī` as the older-man address |
| S03 | `hal anta jādd yā akhī?` | the listener's move — L1-M2's `hal` over an owned frame — and `jādd` |
| S04 | `yā akhī, anta ka-al-ustādh: tatakallam kathīran` | the comic comparison on L4-M5's `ka-`, with the marking in front of it doing the work |
| S05 | `lā tuʾākhidhnī, kuntu amzaḥ faqaṭ` | the fixed retraction formula on L4-M1's negative imperative, and the matched pair tease + take-back |
| S06 | `hādhihi an-nukta muḍḥika jiddan` | `an-nukta` and `muḍḥik` — the joke judged, against S01's `ẓarīf`, which judges the person |
| S07 | `ḍaḥika ṣadīqī wa lam yaḍḥak al-mudīr` | `ḍaḥika` / `yaḍḥak` / `aḍḥak` under L3-M4's `lam`, and the module's warning in miniature |
| S08 | `lā tamzaḥ maʿa al-mudīr, huwa thaqīl ad-damm` | `thaqīl ad-damm`, the exact inverse of M1's idiom, and one of the three things not to do |
| S09 | `ʿalā fikra, anā lā amzaḥ al-ān` | the conversational aside indexed WHOLE, and the deliberate removal of the marking |
| S10 | `as-sukhriya laysat mazaḥ, yā akhī` | the line M2 draws and M7 owns the other side of: marked banter against unmarked sarcasm |

Eight module rules: `yā` as a particle rather than as a joke (0), the kin term as an address and not
a claim (1), the brief's central delta — English banter unmarked, Arabic banter marked (2) —
`kuntu amzaḥ` as a new job for an owned shape (3), `lā tuʾākhidhnī` as a stored formula (4),
`hal anta jādd` as the listener's move (5), the subject matter that moves (6), and the
marked/unmarked axis with M7 named on the other side of it (7).

Fourteen new keys, eleven under the cap: `yā`, `akhī`, `ẓarīf`, `amzaḥ` (with `tamzaḥ`, `yamzaḥ`,
`mazaḥ`), `ʿammī` (with `ʿamm`), `jādd`, `ka-al-ustādh` (with `al-ustādh`, `ustādh`),
`lā tuʾākhidhnī`, `an-nukta` (with `nukta`), `muḍḥik` (with `muḍḥika`), `ḍaḥika` (with `yaḍḥak`,
`aḍḥak`), `thaqīl ad-damm`, `ʿalā fikra`, `as-sukhriya` (with `sukhriya`).

---

## Seams — where the brief and the index disagreed

Nine. Three would each have put a shipped sentence on ground the brief had mis-described.

- **The INDEX SEAM's own reading is stale, and by a whole module.** `docs/105` writes its briefs to
  *1095 surfaces, 39 modules through `L4-M9`*, and explicitly treats `L4-M10`'s claims as spent. The
  fold today:

  ```
  1113 surfaces owned, folded over 40 modules through L4-M10
  ```

  `L4-M10` is shipped and owns what it claimed — `fajʾatan → L4-M10`, `iltaqaytu → L4-M10`. One of
  that list is misattributed in the brief and is worth recording because a later wave will reach for
  it: **`raʾaytu → L4-M3`, not `L4-M10`.** No L5 module opens any of them either way.

- **`hunāk` is free and `hunāka` is L1-M7's — the brief's M1 pattern 5 would have bought a homograph
  of an owned word.** The brief writes the frame as `hunāk mathal yaqūl`. The tool:

  ```
  hunāk    free
  hunāka   L1-M7
  ```

  `surfaceIndexKeys` normalises nothing away here: the two spellings are two keys, so shipping
  `hunāk` would have spent a key on a word the learner met at L1-M7 and left the two forms
  unconnected in the fold. **Both frames ship with `hunāka`,** and `complexity.allowedPatterns`
  records the corrected spelling rather than the brief's. This is the exact class the brief's own
  §"never grep for a surface" warns about, arriving from the other direction.

- **The `mā` of `mā qalla wa dalla` is not a negator, and the module does not call it one.** M1's
  brief note 2 names the second fossil as "`mā` as the OLDER NEGATOR of a past verb". On the shipped
  proverb it is not: `mā qalla wa dalla` is elliptical for *khayr al-kalām mā qalla wa dalla*, and
  the `mā` there is the free relative *that which*. The module therefore teaches the shape without
  the label — rule 4 and the word note say "`mā` in front of a past verb is a fossil, a shape
  ordinary speech no longer uses in this position", and S02's `trap` still forbids building with it.
  **The index consequence the brief wanted is untouched:** the phrase indexes whole,

  ```
  mā   free
  man  L2-M7
  ```

  so bare `mā` is still free for M5-M8 to define once for the course, and L2-M7's `man` is not
  overwritten. Raised for the native gate as question 112.

- **Whole-indexing an idiom does NOT buy its bare adjective, and `surfaceIndexKeys` is why.**
  `khafīf ad-damm` earns exactly `khafīf ad-damm`, `ad` and `damm` — the split is on hyphens, never
  on spaces — so bare `khafīf` was still unowned after S04. The tool, read after the mid-wave build:

  ```
  khafīf ad-damm   L5-M1   [parts: ad → L3-M7, damm → L5-M1]
  ```

  S08 therefore carries its own `khafīf` row, and the two rows collide on nothing: `khafīf` was
  never among the first row's earned keys. `content:shown` confirms both resolve.

- **`ad-damm` is not a key of `khafīf ad-damm` either, so M2 could not lean on M1 for it.**

  ```
  ad-damm   free   [parts: ad → L3-M7, damm → L5-M1]
  ```

  The whole token `ad-damm` is unowned even now. **M2's `thaqīl ad-damm` is therefore indexed WHOLE**
  rather than as `thaqīl` + a borrowed `ad-damm`, which is both the correct fold and the correct
  pedagogy — it is a stored idiom, not a compositional phrase. The side effect is recorded
  deliberately: **bare `thaqīl` is still free** (`thaqīl  free`) although M2's brief lists it as a
  word this module buys. A later module may take it.

- **M2's pattern 4 has no noun to spend.** `anta + ka- + <comic comparison>` is a declared pattern
  and the brief's free list for M2 (`amzaḥ`, `nukta`, `ḍaḥika`, `muḍḥik`, `jādd`, `ẓarīf`, `thaqīl`,
  `sukhriya`, `ʿammī`, `akhī`) contains no noun to compare anybody to. Checked rather than assumed:

  ```
  al-ustādh   free   [parts: al → L1-M1, ustādh → free]
  ```

  So S04 buys `ka-al-ustādh` whole (the token is one written word, and `ka` resolves to L4-M5 as a
  part), and the brief's "ladder paying off" note is served by the VARIATION, which reuses L5-M1's
  `ka-al-ʿuṣfūr` at no cost. Teasing a role rather than a person is also the safest reading of the
  brief's own §3.

- **`yā akhī` is free as a phrase and is deliberately NOT indexed whole.**

  ```
  yā        free
  yā akhī   free
  akhī      free
  akh       L2-M2
  ```

  Buying the phrase would have hidden the particle behind it, and the brief is explicit that M2's
  `yā` note "answers for every vocative later in the course, including M4's `yā sayyidātī`". So `yā`
  and `akhī` are two rows, and a learner tapping either gets the right note. `akh → L2-M2` is a
  point-back in the `akhī` note, not a row.

- **`ʿalā fikra` confirmed, and shipped whole.** The brief's one M2 trap held exactly as written:

  ```
  ʿalā fikra   free
  fikra        L3-M3
  ```

  S09's row is the two-token phrase; the bare noun stays L3-M3's, and S09's mistake plate is built
  on precisely that (`ʿalā al-fikra` is L3-M3's noun doing its ordinary job).

- **Four brief claims re-checked and confirmed, because three sentences lean on them:**
  `miftāḥ → L1-M7`, `yaqūl → L3-M5`, `faqaṭ → L1-M3` (unlisted by the brief, and it is what makes
  `kuntu amzaḥ faqaṭ` cost one key rather than two), and `ka- → L4-M5`, visible only as a part:
  `ka-al-ʿuṣfūr  free  [parts: ka → L4-M5, al → L1-M1, ʿuṣfūr → free]`.

### The paradigm holes

Two rows in this wave could have swallowed an owned cell and do not.

- **`khafīf`'s `forms` list stops at `khafīf` / `khafīfa`** and does not reach for the idiom. The
  idiom is a separate row on a separate key, because they are separate things — one is an adjective
  the learner may extend, the other a string they may not.
- **`ṭawīl al-bāl` and `ṭawīl al-lisān` are two whole rows and neither lists bare `ṭawīl`,** which is
  `L2-M2`'s. A `forms` list that included it would have opened a key an earlier module owns, and the
  learner tapping `ṭawīl` inside the idiom would be handed L2-M2's *tall*. The same for `jārī`, whose
  list carries `al-jār` and `jār` — both free — and stops.

---

### The ratchet

`npx vitest run tools/shown-surfaces.test.ts` — **11/11 pass, and en-ar holds at its baseline of 6.**
No baseline was raised and none was lowered. The six are all L1's and all pre-existing:

```
priyā · miṣr · marḥaban · ṣabāḥ · an-nūr · sayyārat
```

Neither L5-M1 nor L5-M2 contributes a finding: every sentence display, every one of the forty
`variations[].display` lines and every one of the twenty-four pool items resolves against a row of
its own module or an earlier one. `npm run content:shown -- en-ar L5-M1` and `… L5-M2` both report
`clean — every shown surface resolves`, with **no `RE-TEACH` and no `COLLIDES INSIDE THIS MODULE`
on either module** — the wave has no deliberate repeats to justify and no unreachable rows.

`npm run content:validate` reports `CONTENT 377/377 ok`.

`npx vitest run src/course/types.test.ts` fails on the module census only — the 375-file list and
`the en-ar modules this rule is written for` at 41 against 42 — which is the parent's to move once
every course's wave has landed. All 397 other assertions pass, including the en-ar language law:
`display` is Latin on every surface, `script` carries the Arabic line, and hamza `ʾ` and ʿayn `ʿ`
are never interchanged (`lā tuʾākhidhnī` and `ʿalā fikra` are the two places in this wave where the
distinction is load-bearing).

---

## Open questions for the native pass

Numbering continues the en-ar chain: `docs/105-en-ar-L5-brief-decisions.md` ends at **111**, so this
block starts at **112**. Nothing existing is renumbered. Unlike `docs/105`'s block, these are
questions about SHIPPED SENTENCES.

**The native-speaker gate remains unmet on this course, as it has been since L1, and no answer below
may be closed by rewriting a shipped module.** L5 is the last level, so a question raised here has
no later rung to absorb it.

112. **What the `mā` of `mā qalla wa dalla` actually is** (M1, S02, rule 4 — and this is the wave's
     one deliberate departure from a brief). `docs/105` M1 note 2 calls it the older NEGATOR of a
     past verb; the shipped module calls it a fossil shape and stops short of naming it, because the
     saying reads as elliptical for *khayr al-kalām mā qalla wa dalla*, where `mā` is the relative
     *that which*. Settle which it is. If it is the relative, confirm the module's wording is the
     right amount to say; if the brief was right, this needs an issue rather than an edit, because a
     later wave may not touch a shipped module either.
113. **Whether `mā qalla wa dalla` stands alone** (M1, S02). Related and separable: confirm a
     speaker uses the four words on their own as a compliment, rather than only inside the full
     `khayr al-kalām …`. S02's `usage` claims the short form is what is said about a short speech or
     a short message.
114. **The body idioms, asked of the sentences rather than of the brief** (M1, S04, S05, S09).
     `docs/105`'s question 90 asked whether `khafīf ad-damm`, `ṭawīl al-bāl` and `qalbuhu abyaḍ` are
     everyday and region-neutral. Now they are written: confirm `ṣadīqī khafīf ad-damm jiddan` takes
     `jiddan` at all, confirm `ṭawīl al-lisān` is the ordinary word for insolent rather than a
     literary one, and confirm S09's pairing — that a speaker really does concede `wa lākin qalbuhu
     abyaḍ` about someone sharp-tongued.
115. **Whether the fixed idiom tolerates the orders the mistake plates forbid** (M1, S04, S05). S04
     says `ṣadīqī damuhu khafīf` is wrong because an idiom exists in one order only; S05 says an
     adjective may not be inserted inside one. Both are stated as absolutes and both are the kind of
     claim a speaker overturns with one counter-example.
116. **`al-jār qabla ad-dār`, and whether `ad-dār` is reachable elsewhere** (M1, S06). Confirm the
     proverb is current, and — the real question — whether teaching `ad-dār` at all is honest when
     the module's own note says the everyday word is `al-bayt`. The alternative was a row that
     teaches a word only to explain that it is not used.
117. **The bird proverb's exact wording** (M1, S07). Confirm `ʿuṣfūr fī al-yad khayr min ʿuṣfūr ʿalā
     ash-shajara` is the form a speaker says, with `ʿalā` rather than `fī` on the tree and with the
     first noun indefinite; the module ships the definite variant as a variation and claims both are
     heard. The mistake plate assumes the English *two in the bush* has no Arabic counterpart with a
     dual, which is the half of the claim most likely to be wrong.
118. **`khafīfa ka-al-ʿuṣfūr` as a live comparison** (M1, S08). The whole S08/S04 contrast depends on
     `khafīf` being ordinary and literal outside the idiom. Confirm a speaker says it about a
     person's step, and confirm `mithl al-ʿuṣfūr` really is interchangeable with `ka-al-ʿuṣfūr` at
     this register rather than being the more colloquial of the two.
119. **`qalbuhu abyaḍ` against the English temperature** (M1, S09). Confirm white is the colour, that
     the idiom is understood everywhere in MSA rather than being one region's, and that S09's mistake
     plate is right that `qalbuhu sākhin` says nothing at all.
120. **`ad-dunyā ṣaghīra` and the register claim** (M1, S10, rule 6). The module's register rule says
     an Arabic proverb is graver than its English twin even when the words match. S10 is the test
     case: confirm `ad-dunyā ṣaghīra` is said on running into someone, and say whether it carries the
     lightness English's *it's a small world* carries or whether the module is right that it does not.
121. **The marked/unmarked axis, asked of shipped sentences** (M2, rules 2 and 7, S01, S04, S10).
     `docs/105`'s question 91 asked whether the claim is true. Now it is drilled: confirm S01's
     mistake plate — that `anta ẓarīf jiddan` with no `yā` in front of it can be heard by a stranger
     as an assessment rather than as banter — and confirm S04's, which says the same of a comparison.
     If the marking is weaker than the module claims, two mistake plates are overstated.
122. **`ka-al-ustādh` as a tease** (M2, S04). The brief named no comparison noun, so this one is the
     wave's choice. Confirm comparing a friend to a professor is teasing rather than flattering, and
     confirm the module's advice under `usage` — that roles are safe ground where family, appearance
     and wealth are not — is how a speaker would put the line.
123. **`lā tuʾākhidhnī` and what it presupposes** (M2, S05). Confirm it is the everyday retraction
     rather than a formal apology, confirm the `trap`'s claim that it is a request not to be charged
     rather than an admission of fault, and confirm S05's mistake plate — that saying it alone,
     without the retraction behind it, leaves the listener guessing.
124. **`ẓarīf` against `muḍḥik`** (M2, S01, S06). The module makes them a clean pair — one judges the
     person, the other the joke — and both mistake plates depend on the split being sharp. Confirm,
     and confirm S06's stronger claim: that calling a PERSON `muḍḥik` can land as calling them
     ridiculous.
125. **`thaqīl ad-damm` and who may hear it** (M2, S08). The module says it is said about somebody and
     never to them, and its mistake plate makes `yā mudīr, anta thaqīl ad-damm` the module's own
     worked example of the thing not to do. Confirm the weight; if it is milder than the module
     claims, S08's `trap` overstates it.
126. **`ʿalā fikra` and what it introduces** (M2, S09). The module claims it just as often introduces
     the serious thing as the trivial one, and S09 uses it to take the marking OFF. Confirm that use
     — an aside that turns banter off — rather than only the ordinary *by the way*.
127. **`as-sukhriya` as the word for the other side of the line** (M2, S10). Confirm `as-sukhriya` is
     what a speaker names when drawing this distinction, that `laysat mazaḥ` with no case ending is
     how it is written under this course's law, and that S10 is a thing somebody says out loud rather
     than a definition only a textbook offers.
128. **Whether `yā` + kin term is enough marking on its own** (M2, all of it). The module's central
     promise is that `yā akhī` in front of a clause makes it banter. Confirm that a foreigner with
     correct grammar, the right particle and no laugh actually lands as joking — because if the
     marking needs prosody the course does not teach, M2's job line is only half deliverable, and
     that is a finding L5 has no later module to absorb.

---

## Wave 2 — L5-M3, L5-M4 and L5-M5 (#583)

The level's RANGE modules: **L5-M3 "How they say it there"**, **L5-M4 "Formal occasions"** and
**L5-M5 "Big questions"**, written against the briefs in
[`docs/105-en-ar-L5-brief-decisions.md`](105-en-ar-L5-brief-decisions.md) and shipped
`verified: true` with their signature in the same change.

**The index this wave was written against.** Every ownership call below was taken at

```
1177 surfaces owned, folded over 42 modules through L5-M2
```

— which is wave 1's fold plus wave 1's own two modules. It is two readings past what `docs/105` §0
was planned to (*1095 surfaces, 39 modules through `L4-M9`*) and one past what wave 1 authored to
(*1113 / 40 / `L4-M10`*). This matters for the brief's index seams, which name a count and a module
and go stale in that order: **the fold is deeper than any brief in this course says it is**, and
where the two disagreed the tool won.

### L5-M3 — How they say it there

Ten displays:

1. `al-fuṣḥā lugha wāḥida, wa al-lahajāt kathīra`
2. `fī ash-shām yaqūlūn kalima wa fī al-maghrib yaqūlūn ukhrā`
3. `hādhihi al-kalima shāmiyya, wa laysat fuṣḥā`
4. `al-ʿāmmiyya ṣaʿba ʿalā al-ajnabī fī al-khalīj wa fī al-maghrib`
5. `jīl al-kibār yaqūl kalimāt qadīma`
6. `ash-shabāb yatakallamūn bi-uslūb mukhtalif`
7. `hādhā kalām shaʿbī, wa laysa fuṣḥā`
8. `fī kull balad nabra mukhtalifa, wa hādhā ʿādī`
9. `huwa yatakallam al-fuṣḥā ʿumūman, wa hādhā ʿādī`
10. `hādhā ash-shakhṣ yaqūl kalima shāmiyya, yaʿnī huwa min ash-shām`

**What it teaches.** The metalinguistic vocabulary of variation — `al-fuṣḥā`, `al-ʿāmmiyya`,
`lahja`, `jīl`, `ash-shabāb`, `al-kibār`, `kalām`, `uslūb`, `nabra` — and one piece of productive
grammar: the **nisba**, the `-ī` the ladder has used since L1-M1's `al-Hind`, named here as a rule
for the first time, with the feminine `-iyya`. Every display line is MSA. The dialect forms the
module is *about* are named and described, never spoken (#198): the deliverable is that a learner
can say *that word is Levantine* or *that is what older people say* without having to produce any of
it. Rule 3 carries the brief's honest line — MSA is a passport rather than a disguise; it gets you
through everywhere and it never makes you a local.

Two verb rows are new shapes of owned lexemes and carry notes pointing back: `yaqūlūn` (L3-M5's
`yaqūl`) and `yatakallamūn` (L1-M10's `yatakallam`). Neither touches a file below L5.

25 rows across the ten sentences, at the brief's `newWordCap: 25`. M3 is inside the M1–M3
enrichment band, so all five blocks are on all ten sentences.

### L5-M4 — Formal occasions

Ten displays:

1. `al-marḥūm kāna ṣadīqī, raḥimahu allāh`
2. `at-taʿāzī, aʿẓama allāh ajrakum`
3. `al-baqāʾ li-llāh / shakara allāh saʿyakum`
4. `alf mabrūk ʿalā az-zawāj / bārakallāh fīk`
5. `at-tahāni ʿalā an-najāḥ, wa anta muwaffaq`
6. `sayyidātī wa sādatī, ashkurukum ʿalā hādhā ash-sharaf`
7. `khiṭāb al-ʿurs kāna jamīl`
8. `sayyidātī wa sādatī, nakhb al-ʿurs`
9. `al-ḥuzn kabīr fī hādhihi al-janāza`
10. `ashkurukum ʿalā al-ḥuḍūr, wa hādhā sharaf lī`

**What it teaches.** The **optative** — a past-shaped verb doing a performative job — named
precisely because it is the one place this course writes a perfect that is not past: `raḥimahu`,
`aʿẓama`, `shakara`, `bārakallāh`. Rule 0 says plainly that no new shape is being taught, the
morphology is L1-M5's and only the JOB is new, which is what keeps a learner from hearing a fourth
tense. The second system is L4-M7's plural of politeness coming home: `ashkurukum`, `ajrakum`,
`saʿyakum`, `tafaḍḍalū`, and M2's vocative at its formal end in `yā sayyidātī`.

**The pairs are pairs.** The brief's `<formula> / <the obligatory reply>` pattern is taken
literally, and the slash survives tokenisation — `tokenizeSurface` strips edge punctuation and drops
the resulting empty token, so `al-baqāʾ li-llāh / shakara allāh saʿyakum` indexes as five words with
no stray key. S03 and S04 each carry both halves on the hero line; S03's mistake plate is the
learner's real error, which is answering a condolence with `shukran` and stopping.

24 rows. `allāh` is bought here and its note answers for every later occurrence in the course, as
the brief instructed: written about the word, not about the condolence, and rule 1 says these are
social formulae used by speakers of every background in the region — the course teaches the
formula, not a faith.

### L5-M5 — Big questions

Ten displays:

1. `al-ḥurriyya muhimma, wa al-ʿadāla ahamm`
2. `al-ʿadāla asās al-mujtamaʿ`
3. `aṣ-ṣadāqa ahamm min al-māl, wa as-saʿāda ahamm min al-ʿamal`
4. `ūmin bi-al-ʿadāla, wa aʿtaqid anna al-ḥayāt ṣaʿba`
5. `al-īmān qīma, wa al-ʿaql qīma ukhrā`
6. `mā maʿnā al-ḥaqīqa fī hādhā al-ʿālam?`
7. `aḍ-ḍamīr aṣl al-ʿadāla`
8. `al-insān ahamm min al-mujtamaʿ? hādhā suʾāl qadīm`
9. `at-taʾrīkh khulāṣa, wa laysa kull al-ḥaqīqa`
10. `aʿtaqid anna al-qiyam ahamm min kull shayʾ`

**What it teaches.** The **generic article** — `al-` on an abstract noun means the thing in
general — stated in both directions and given its own mistake plate (`ḥurriyya muhimma`, S01),
because English drops its article in exactly the place Arabic demands one and over-reads it coming
back. The second system is the **belief pair**: `ūmin bi-` is believe IN and `aʿtaqid anna` is
believe THAT; S04 puts both in one sentence so the split is forced, and S10's mistake plate is the
merge (`aʿtaqid bi-anna`). `aʿtaqid` gets no row — it is L3-M3's, coming back with its second
complement, exactly as the brief required. Rule 3 says the thing that is true and rarely said: the
nominal sentence does all the work here, so abstract Arabic is structurally *easier* than a learner
expects.

21 rows plus one deliberate point-back row (below). Comparison is L2-M9's machinery re-used whole;
hedging stays L4-M5's and defending a position stays M6's.

### Seams — where the brief and the index disagreed

Every line below is what `npm run content:owner -- en-ar …` printed at
`1177 surfaces owned, folded over 42 modules through L5-M2`.

1. **`gharīb` is not fresh.** M3 §5 lists it among "Fresh and free". The tool:

   ```
   gharīb	L4-M10
   ```

   It is owned, so it may be shown without a row and a row for it would have been a re-teach.
   S07's second variation shows it and buys nothing.

2. **`khalāṣ` is free and still unusable.** M3 §5 lists it as fresh. The tool agrees
   (`khalāṣ	free`) — and it is dropped anyway. As a discourse particle (*that's it, enough, fine*)
   it is colloquial, and §2's ratified law forbids a dialect form in `display`. The brief's own
   note 4 is what rules it out; the index cannot see the problem. Recorded here so a later wave
   does not "restore" it as an oversight.

3. **`kathīra` is not `kathīran`.** M3 §5 points `kathīran → L1-M1` and says nothing about the
   adjective. `kathīra	free`, `kathīr	free` — a different key, untaught. `content:shown` caught it
   on the first run (`SHOWN-BUT-UNTAUGHT L5-M3-S01: kathīra`) and it now has its own row with a
   note pointing back at L1-M1's adverb.

4. **`qadīm` and `qadīma` are L5-M1's, not free.** `qadīm	L5-M1`, `qadīma	L5-M1`. M3 shows both
   (S05, S06's first variation) and rows neither — a case where the wave-1 modules, which no
   published brief mentions, are already load-bearing for wave 2.

5. **`allāh` really is free after forty-two modules.** The brief's most surprising claim survives
   contact with the tool:

   ```
   allāh	free
   in shāʾ allāh	L1-M6
   ```

   `surfaceIndexKeys` splits hyphens only, so the three-token key never donated `allāh` or `shāʾ`.
   M4 buys it, and its note is written about the word.

6. **`alf mabrūk` is free although both its words are owned.** `alf	L3-M8`, `mabrūk	L3-M9`,
   `alf mabrūk	free`. Confirmed as the brief predicted, and it is the model for how a formula is
   indexed here: one row, one key, two words already paid for. `al-baqāʾ li-llāh` does the same
   thing over four parts (`al → L1-M1, baqāʾ → free, li → L1-M9, llāh → free`) for one key.

7. **M5's own worked example uses two words its index seam does not list.** §3 quotes
   `al-ḥurriyya asās kull shayʾ`. The §5 fresh list names `aṣl` but not `asās`, and never mentions
   `shayʾ`. Both are free (`asās	free`, `shayʾ	free`, `kull shayʾ	free`) and both had to be bought
   as rows. `kull	L3-M9` was fine.

8. **`mā` is unbought.** `mā	free` after forty-two modules — so `mā maʿnā` could not be assembled
   out of owned parts. It is bought as a two-token form on the `maʿnā` row, which is also what
   keeps a bare `mā` off the ratchet: the module never shows it alone.

9. **The definite form is always a separate key, and this is the trap that shapes every row in
   M5.** `al-fuṣḥā	free [parts: al → L1-M1, fuṣḥā → free]` — the article form earns `fuṣḥā` as a
   *part*, so a second row whose whole display is `fuṣḥā` would collide inside the module and be
   unreachable. Every abstract-noun row therefore carries the definite, the bare and, where the
   module shows it, the `bi-al-` form on **one** row: `["al-ʿadāla", "ʿadāla", "bi-al-ʿadāla"]`.
   `bi-al-ʿadāla	free [parts: bi → L1-M2, al → L1-M1, ʿadāla → free]` confirms the whole form was
   never bought by the preposition.

10. **`aḍ-` was an unbought article part.** `aḍ-ḍamīr	free [parts: aḍ → free, ḍamīr → free]` — the
    ḍ sun-letter assimilation had never been indexed in forty-two modules. M5's `aḍ-ḍamīr` row buys
    it as a part, the way `ash-` (L1-M2), `as-` (L1-M2), `aṣ-` (L1-M4), `an-` (L1-M3), `at-`
    (L3-M6), `az-` (L3-M7), `ar-` (L2-M5) and `aẓ-` (L1-M6) already were.

11. **Point-backs the briefs list that these modules never needed:** `ism`, `tafaḍḍalū` (shown in a
    variation, not rowed), `min faḍlikum`, `ḥaḍratuka`, `ʿīd`, `khayr`, `bi-khayr`, `shukran`
    (shown in a mistake plate only), `nās`, `ṭayyib`, `ḥasanan`, `lugha` (shown in M3-S01),
    `aẓunn`, `ṣaḥīḥ`, `khaṭaʾ`, `afḍal`, `ayy`. Listed so a later wave knows they were checked and
    left alone rather than missed.

### The ratchet

`npm run content:shown -- en-ar` is **clean** on all three modules. `en-ar` holds at its baseline of
6 in `tools/shown-surfaces.test.ts`; no baseline was raised, and none could honestly be lowered —
the six pre-existing findings are all below L5.

- **No `COLLIDES INSIDE THIS MODULE` anywhere.** The rows that could have collided were merged
  instead: `mukhtalif`/`mukhtalifa` is one row, not two; `sayyidātī wa sādatī` is one row carrying
  the whole phrase and both singles; `al-kalima` carries `kalima` and `kalimāt`; `al-qiyam` carries
  `qiyam`, `qīma` and `al-qīma`.
- **One deliberate `RE-TEACH`**, and it is the one the brief asked for:

  ```
  RE-TEACH L5-M5-S09 "at-ta'rīkh": L3-M8 owns the key …
  RE-TEACH L5-M5-S09 "ta'rīkh": L3-M8 owns the key …
  ```

  `taʾrīkh	L3-M8`, bought there as the date on a form. M5 §5 is explicit that the abstract sense
  is the same key and gets a point-back row with a note true of both, never a second row. The row
  is kept because S09 needs the word; the note is written so that L3-M8's note, which is what a
  learner actually sees on the tap, is not contradicted by it. (Note the tool's own output folds
  the hamza to `'` — `at-ta'rīkh` — which is why a grep for `taʾrīkh` over the index would have
  missed it. The tool is the authority, not the grep.)
- **Paradigm holes.** M3's nisba row lists eight cells — `shāmiyya, shāmī, miṣriyya, miṣrī,
  maghribiyya, maghribī, khalījiyya, khalījī` — and every one was checked with `content:owner`
  before the list was written; all eight are free. Two cells were deliberately kept **off** it:
  `miṣr	L1-M9`, the place name the nisba is built from, which stays L1-M9's; and `shaʿbī`/`baladī`,
  which are the S07 row's and would have made the second row unreachable. `qadīm`/`qadīma` got no
  row at all, because L5-M1 owns both cells.
- **No file below L5 was touched, and no other course was touched.**

### Open questions for the native pass

Continuing the chain; the last number in `docs/105` and in this file was 128.

129. **A module about dialect that may not write one** (M3, all of it). The ratified MSA law (#198)
     means every display line here is `al-fuṣḥā` and the varieties are named, never produced.
     Confirm the deliverable is real: that a learner who can say `hādhihi al-kalima shāmiyya` and
     nothing Levantine has been given something usable, rather than a vocabulary for describing a
     skill they do not have. If the honest answer is no, the finding belongs to the level, not to
     M3, because no later module can absorb it.
130. **The three regions** (M3 §5). The brief says pick three, and this module picked `ash-shām`,
     `al-khalīj` and `al-maghrib`, with `miṣr` (L1-M9) already owned and used in a variation.
     Confirm those four are the ones a learner actually needs to name, and that `ash-shām` is the
     ordinary word for the region rather than a bookish one where `sūrī` or `lubnānī` would be
     said.
131. **The eight nisba cells** (M3-S03). Confirm `khalījiyya` and `maghribiyya` are said, not just
     derivable, and that a word — not a person — is naturally described with the feminine
     (`kalima shāmiyya`). If the feminine of a place nisba is only ever used of people, the
     module's central row is teaching a paradigm with a hole in it that nobody flagged.
132. **`yaʿnī` inside an MSA-only course** (M3-S10). It is the commonest discourse particle in
     every spoken variety. Confirm it is also unmarked in `al-fuṣḥā`, so that this course is not
     shipping, in the very module that forbids dialect, a word a listener would hear as `ʿāmmiyya`.
133. **`khalāṣ` withheld** (M3; seam 2 above). Confirm the judgement that it cannot ship in
     `display` because it is a dialect particle. If a native reader considers it ordinary MSA, the
     brief's fresh list was right and this wave was over-cautious — and the row should come back.
134. **The condolence pair** (M4-S03). Confirm `al-baqāʾ li-llāh` is answered by
     `shakara allāh saʿyakum` in life and not only in books, and that the same reply answers
     `aʿẓama allāh ajrakum` (which is how S03's second variation teaches it). If the two formulae
     take different answers, the module has taught a wrong pair, which is exactly the error §3 of
     the brief says is worse than saying nothing.
135. **`bārakallāh fīk` as the answer to `alf mabrūk`** (M4-S04). Confirm this is what is actually
     heard, rather than `allāh yubārik fīk`, which is what a learner will meet. If the latter is
     the live form, M4 teaches a reply nobody says at the one moment a reply is obligatory.
136. **Writing `bārakallāh` as one romanized token** (M4-S04). The `script` line is two words,
     `بارك الله`, and the `display` is one token so that the phrase indexes whole. Confirm the
     romanization convention is acceptable to a reader who knows the script — this is the first
     place in the course where `display` and `script` disagree about a word boundary.
137. **`at-tahāni` written against `alf mabrūk` spoken** (M4-S05). The module claims a register
     split: the plural noun on a card and in a speech, the formula in the mouth. Confirm it, and
     confirm `anta muwaffaq` reads as a compliment rather than as faint praise.
138. **The toast** (M4-S08). Confirm that `nakhb` names a real occasion across the region rather
     than one country's habit, and that `nakhb al-ʿurs` — with no verb and no glass named — is what
     is said standing up. The brief lists `nakhb` as fresh; nothing in the index can say whether
     the moment exists.
139. **The generic article's mistake plate** (M5-S01). Confirm `ḥurriyya muhimma` is genuinely
     unusable rather than merely marked or poetic. The whole rule is stated on the strength of that
     plate, and if the bare noun is available in any register the rule as written is too strong.
140. **`ūmin bi-` against `aʿtaqid anna`** (M5-S04, S10). Confirm the split is as absolute as rule
     2 says: that `ūmin anna` is impossible rather than merely uncommon, and that `aʿtaqid bi-anna`
     is the error the plate calls it. If either is acceptable, the module's central delta softens
     into a preference and should be re-tagged.
141. **`aḍ-ḍamīr` as a neutral word** (M5-S07). The trap line claims it carries no religious or
     secular loading and is used the same way by everybody. Confirm — this is the one place in
     three modules where the course makes a claim about a word's social colouring that the index
     cannot check.
