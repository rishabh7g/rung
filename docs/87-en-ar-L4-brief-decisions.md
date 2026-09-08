# en-ar L4 — the authoring-brief decisions (#521)

The ten en-ar L4 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['en-ar']` L4-M1…L4-M10) are the
first L4 briefed in this course, and they continue `docs/54` (L2) and `docs/70` (L3). Every seam
below was pinned against the REAL cumulative index — the fold of
`public/content/en-ar/index/L1-M1.json` through `L3-M10.json`, read on 2026-09-08 with
`npm run content:owner -- en-ar …`: **840 surfaces owned, folded over 30 modules through L3-M10,
`maxSpan` 5**. Nothing here was checked by reading a module JSON and guessing; where an instinct and
the index disagreed, §3 records the index winning.

The titles and jobs are `content/en-ar/levels.json`'s, mirrored verbatim (`#423` ratified them on
2026-09-07 and a test enforces the mirror). This note records the decisions the briefs are written
to, so the authoring waves inherit them without re-deriving anything; the briefs repeat each one in
the module notes, because a prompt only ever shows an author the notes.

## 1. The romanization laws, unchanged — and one of them shapes half the level

Every decision of `docs/34`, `docs/54` and `docs/70` carries: one word → one key, hamza folding to
`'` and ʿayn staying `ʿ`, initial hamza unwritten, the hyphenated clitic indexing whole AND by part,
short vowels always written, sun-letter assimilation spelled, elision never written. Every romanized
surface in the ten briefs was round-tripped through `src/engine/surface.ts` before it was written
down.

One of those laws does unusual work at L4 and the briefs say so out loud. **Case and mood endings
are not written unless lexical** (L2-M1 rule 4), and L4's grammar is largely MOOD: the subjunctive
after `li-` (M1), after `an` in `qabla an` (M6) and after `ḥattā` (M6); the jussive under `lam …
baʿd` (M6) and `lam yaʿud` (M8). In this scheme every one of those is written exactly like the
ordinary present. So each brief states the same thing in its own words: **what the module teaches is
the CONNECTOR, not a new verb shape**, and the mood ending belongs in `usage`, never in `display`.
L3-M4 already established the precedent for the jussive ("which this course writes exactly like the
ordinary present"); L4 generalises it.

The one place the law cuts the other way is M7. The internal passive is made by changing vowels
INSIDE the verb — `kataba` → `kutiba`, `yaktub` → `yuktab` — and because this course writes every
short vowel, **the passive is visible on the page**. Every passive cell is therefore a separate
surface from its active one, and gets its own row in M7 pointing back at the verb's first-teach row,
exactly as L3-M4 handled its jussive cells and for the same reason: a level never edits a file below
it.

## 2. What L2 and L3 withheld, and how much of it L4 takes

`docs/70` §2 left four things standing for L4. L4 takes **three of them** and leaves one to L5:

- **The passive verb → L4-M7.** It is the whole grammar of the official register, and M7 is the
  module whose job line names that register. L3-M8 taught the passive PARTICIPLE (`mamnūʿ`,
  `maftūḥ`, `mughlaq`, `maṭlūb`) because a sign is written in participles; M7 adds the finite verb a
  loudspeaker and a clerk actually use (`yurjā`, `yumnaʿ`, `yuftaḥ`, `tudfaʿ`).
- **The subjunctive beyond `yajibu an` / `yumkinu an` → L4-M1 and L4-M6.** M1 opens the purpose lām
  (`li-` + subjunctive), M6 opens `qabla an` / `ḥattā` / `ilā an`. Both are opened as CONNECTORS,
  per §1.
- **The jussive as a mood → L4-M6 and L4-M8**, and only for two jobs: `lam … baʿd` (not yet) and
  `lam yaʿud` (no longer). L3-M4 had already taken `lam` + jussive for the plain negative past and
  the prohibition `lā tadhhab`; nothing about either is re-opened.
- **Standing for L5: the dual as a system.** L3-M7 showed `yawmayn` as vocabulary and said so, and
  no L4 module needs more. Broken plurals also stay vocabulary, as they have since L1.

Two further things L3 opened narrowly are FINISHED at L4, in the module whose job needs them rather
than in a grammar module:

- **`laysa` beyond the third person → L4-M5.** L2-M7 lifted it for a phone call and its own word
  note says "This course teaches only the third person — `laysa` and `laysat` — and the rest of the
  paradigm waits". L3-M3 added `lastu`. M5 adds `lasta`, `lasti`, `lasnā`, `laysū`, because
  `lastu mutaʾakkidan` is the politest sentence in the level and a paradigm learned inside a
  face-saving job gets used.
- **`qad` with a present verb → L4-M5.** L3-M7 opened `qad` + past (the perfect); the same particle
  in front of a present-shaped verb means MAY (`qad yaʾtī ghadan`). Second job on an owned key, not
  a second row.

## 3. Seams — where the index contradicted the first instinct

Six, and the first three would each have put a shipped sentence on ground the brief had mis-described.

- **`bi-sabab` is L1-M9's, not fresh.** The obvious centrepiece of a cause module is already bought:
  `bi-sabab → L1-M9   [parts: bi → L1-M2, sabab → L1-M9]`, and bare `sabab → L1-M9`. So is the whole
  reason family — `li-ʾanna → L1-M9`, `li-ʾannī → L1-M9`, `li-ʾannahu → L1-M9`,
  `li-dhālika → L1-M9`. M2's noun-cause frame is a `rules[]` entry pointing back, not a new row, and
  what M2 actually buys is `fa-`.
- **`fī raʾyī` is L1-M9's, not L3-M3's.** `docs/70` §3 lists `fī raʾyī` among M3's whole-indexed
  phrases; the index says `fī raʾyī → L1-M9`. The index is the authority and M4's brief says so
  explicitly, so the error is not inherited a third time.
- **`laytanī` and `la-` are already L3-M4's.** The first instinct was that "What might have been"
  owns the counterfactual and the wish. It does not: `law → L2-M1`, `la- → L3-M4`,
  `la-kuntu → L3-M4   [parts: la → L3-M4, kuntu → L1-M5]`, `laytanī → L3-M4`, `idhā → L3-M4` — and
  L3-M4 shipped `laytanī dhahabtu maʿaka ams`, a past regret, as S07. M3 was therefore re-planned
  around what is genuinely missing: the PLUPERFECT frame `kāna qad`, past obligation
  `kāna yajibu an` / `kāna ʿalayya an`, and the was-going-to `kuntu sa-`.
- **`rubbamā` is L3-M3's.** The hedging module's most obvious word is spent (`rubbamā → L3-M3`), and
  so are `aẓunn → L3-M3`, `ṣaḥīḥ → L3-M3`, `khaṭaʾ → L3-M3`, `afḍal → L3-M4`. M5 hedges with `qad` +
  imperfect, `yabdū anna` and the completed `laysa` instead.
- **The passive is not entirely fresh: `wulidtu` and `wulida` are L3-M10's**, taught there as one
  lexical item about being born. M7's rule points at it as the shape the learner has already met
  without knowing it was a system — which is a better opening than pretending the class is new.
- **`mā` is FREE across the whole 840-surface fold.** `docs/70` §3 and the L3-M5 brief both call
  bare `mā` "L1's question word" and index `mā idhā` whole to protect it; the index says
  `mā → free`. Nothing is broken — the protection was harmless — but the key is unowned, and L4
  deliberately leaves it that way (see §5), which is why M8 indexes `mā zāla` and `mā zāltu` WHOLE.

Three smaller findings, recorded because they are the kind that bite silently:

- **A sun-letter article's hyphen part can collide with a particle.**
  `fī an-nihāya → free   [parts: an → L1-M3, nihāya → L3-M10]` — the `an-` of `an-nihāya` folds to
  the same key as L1-M3's subjunctive particle `an`. First occurrence wins so nothing is spent and
  nothing breaks, but M6's brief forbids explaining `an` by pointing at a word whose `an` is an
  article. Every other sun-letter prefix is likewise already owned: `ash → L1-M2`, `as → L1-M2`,
  `ar → L2-M5`, `ad → L3-M7`, `at → L3-M6`.
- **The imperative and the plain I-form are two keys only by a vowel.** `idhhab → L2-M4` (the
  imperative) against `adhhab → L1-M4` (I go) — they differ because initial hamza is unwritten. M1's
  derivation rule must not be illustrated with a pair whose two members look identical.
- **`ʿan`, `shāriʿ`, `rajul`, `ṣaghīr` and `raʾaytu` are all free after thirty modules.** None may be
  assumed taught. `shāriʿ` is the surprising one — L2-M4 taught directions without ever buying
  "street" — and M9's brief names it as a fresh key.

Two mechanical facts were checked against the real functions rather than assumed, and both are
quoted in the briefs that rely on them:

- `normalizeSurface` drops EDGE punctuation, quotation marks and guillemets included, so M10's
  quoted line costs nothing extra: a token inside `"…"` or `«…»` resolves to its ordinary key.
- `surfaceIndexKeys` splits on hyphens only, never on spaces, so a multi-token phrase is one key —
  which is why `kull yawm → L1-M4` while bare `kull → L3-M9`.

## 4. A section per module — what it owns and why it sits there

The level's arc is **verbal**, where L3's was nominal: L3 opened the maṣdar and the iḍāfa, L4 opens
the imperative, the passive, the auxiliary `kāna`, the relative clause and four clitics. That is not
a theme imposed on the ten jobs — it is what falls out of them.

- **M1 Explaining how.** Owns the IMPERATIVE AS A FORMATION and the purpose lām. It sits first
  because the ladder already contains six imperatives learned as words — `khudh`, `khudhī`,
  `idhhab` (L2-M4), `ishrab`, `kul`, `aʿṭinī` (L2-M1), `sāʿidnī` (L2-M8), `tafaḍḍal` (L2-M5) — and a
  level that opens by turning a stock of memorised items into a rule is the cheapest possible
  opening. `ḥattā` is withheld to M6; `kay` and `min ajl an` are named in `usage` only.
- **M2 Cause and consequence.** Owns **`fa-`**, the free bare key that is Arabic's paragraph
  connector, and the three-way split `wa` (addition) / `thumma` (sequence) / `fa-` (consequence)
  that English collapses into one word. It sits second because M8 and M10 both spend `fa-` again —
  M8 for `ammā al-ān fa-`, M10 for the narrative turn — and a connector must be opened before the
  modules that lean on it. Taught the way L1-M6 taught `sa-`: one row per verb, person cells in
  `forms`.
- **M3 What might have been.** Owns `kāna` AS AN AUXILIARY — `kāna qad` + past (pluperfect),
  `kuntu sa-` (was going to), `kāna yajibu an` / `kāna ʿalayya an` (past obligation). Everything
  conditional is L3-M4's and is pointed back at (§3). The module's honest selling point is that
  English's would-have / should-have / could-have are three auxiliaries and Arabic has none: each is
  `kāna` in front of something already owned.
- **M4 Persuading.** Owns CONCESSION (`raghma anna` for a clause, `ʿalā ar-raghm min` for a noun,
  answered by `wa maʿa dhālika`) and the corrective **`bal`**, which English has no single word for
  and which requires a negative in front of it. `raghma anna` is `anna`'s third tour on the one case
  cell L3-M3 opened, and by M4 the family — `anna`, `li-ʾanna`, `raghma anna`, `lā shakka anna` —
  should be presented as a family rather than as four facts.
- **M5 Disagreeing well.** Owns the HEDGE: `qad` + imperfect, the rest of `laysa`, negative raising
  `lā aẓunnu anna`, `yabdū anna`. It sits immediately after M4 so the pair reads as one contrast —
  M4 concedes and then asserts, M5 doubts and declines — and so that neither module has to carry
  both registers.
- **M6 Before and after.** Owns the TIME CLAUSE: `qabla an`, `baʿda an`, `ḥattā` / `ilā an`,
  the nominal `athnāʾ` / `khilāl`, and `lam … baʿd` for "not yet". L3-M1's own brief said in as many
  words that `baʿda an` + verb is ordinary MSA and was being held back; this is the module it was
  held for. `ʿindamā` / `baynamā` (L3-M10), `mundhu` (L3-M7) and `qad` + past for "already"
  (L3-M7) are all re-used, not re-opened.
- **M7 Official talk.** Owns the INTERNAL PASSIVE and the impersonal register — `yurjā` + maṣdar,
  `yumnaʿ` + maṣdar, `yajibu ʿalā`, and the plural of politeness (`min faḍlikum`, `tafaḍḍalū`, M1's
  plural imperative). It buys the REGISTER, not the nouns: `maktab`, `istimāra`, `tawqīʿ`, `waqqiʿ`,
  `mughlaq`, `maftūḥ`, `maṭlūb`, `mamnūʿ` and `tadkhīn` are all L3-M8's and `muwaẓẓaf` is L3-M2's.
  It is also the course's first module whose main job is RECEPTION — half its items are things a
  learner will only ever hear — and the brief says so.
- **M8 Back then.** Owns `kāna` AND ITS SISTERS as a class: `kāna`, `mā zāla`, `aṣbaḥa`, `ṣāra`,
  negated by `lam yaʿud`. L3-M10 opened `kāna` + imperfect as a single frame inside its accounts;
  M8 is where it becomes the grammar. The then-against-now contrast is BUILT rather than taught —
  `fī al-māḍī` + `kāna` clause, then M2's `ammā al-ān fa-` — which is the strongest argument for M2
  sitting where it does.
- **M9 Places and journeys.** Owns the RELATIVE CLAUSE, with all three of its laws: `alladhī` /
  `allatī` / `alladhīna` agree and are OBLIGATORY where English drops "that"; an INDEFINITE
  antecedent takes no pronoun at all; and the object of a preposition inside the clause keeps a
  RESUMPTIVE pronoun (`al-funduq alladhī nazalnā fīhi`) which English forbids absolutely. It sits in
  the journeys module because that is where a direction stops being a standalone command — "take the
  bus that goes to the market" — and because all three relative pronouns are free, making it the
  level's largest single opening.
- **M10 A story with a twist.** Owns DIRECT SPEECH set against L3-M5's indirect report: `anna` and
  `inna` belong to the report and vanish from the quotation, and the pronouns flip with them. The
  twist itself is structural and built from M2, M3, M8 and M9, so almost nothing is opened. The
  verb-before-subject law is in force and deliberately NOT restated — a learner at L4-M10 either has
  it or does not.

## 5. Bounds, and what L4 defers to L5

**Bounds climb 12 → 14, repeating L3's 10/11/12 shape one notch higher:** M1–M3 at 12, M4–M7 at 13,
M8–M10 at 14. The reasoning is the same as L3's. The first three modules are the ones with new
morphology in them (an imperative you must derive, a clitic, an auxiliary stack) and a learner
should not be paying for length and for a new shape in the same sentence. M4–M7 are connector
modules whose sentences are two clauses joined, and two clauses need a word or two more than one.
M8–M10 are paragraph modules, and M10's items are six-sentence narratives where **the bound applies
INSIDE the account, sentence by sentence**, exactly as at L3-M10. `newWordCap` stays the PRD §5 **25
everywhere**; pools are authored to 12.

Deferred to L5, with reasons:

- **The dual as a system** — `docs/70` left it standing and nothing in these ten jobs needs it.
- **`mā` as the negative particle and as a free relative.** Bare `mā` is unowned (§3) and L4 keeps it
  that way: `mā` + past is the older written negative past, which L3-M10's review already names in
  `usage` beside `lam`, and `mā`/`man` as free relatives ("that which", "he who") is a different job
  from M9's `alladhī`. Both are L5-M1 and L5-M6 material and both want a register L4 has not built.
- **`kay`, `min ajl an`, `bi-al-ʿaks`, `bi-ikhtiṣār`, `innamā`, `ghayr anna`** — the second and third
  members of frames M1, M4 and M5 open. Each is named in `usage` and left free, so L5's argument
  module can spend them where a learner needs range rather than a first way of saying the thing.
- **Sarcasm, implication and indirect refusal** — L5-M7's whole job. M5 stops at the honest hedge.
- **A three-part then / later / now contrast** — M8 keeps the contrast to two clauses; the longer
  shape belongs with L5-M10's register change.
- **Regional and generational forms** of anything opened here, including the dialect imperative and
  the dialect relative — L5-M3, and the standing native-speaker question below.

## 6. Open questions for the native pass

Numbering continues the en-ar chain; the L3 review (`docs/78-llm-review-en-ar-L3.md`) ends at 61, so
this block starts at 62. Nothing existing is renumbered. These are questions about the BRIEFS, not
about shipped sentences — each one should be re-asked of the authored module when it exists.

62. **The imperative derivation as a teachable rule** (M1). Confirm that "drop the `ta-`, add a
    helping vowel if two consonants are left" is a rule a speaker recognises rather than a
    grammarian's reconstruction, and specifically whether `uktub` with its `u-` helper is worth
    teaching beside `iftaḥ`, or whether one helper vowel taught and the other left as vocabulary is
    the honest simplification.
63. **The plural of politeness at a counter** (M1, M7). Confirm that a clerk addressing one person
    uses the plural (`min faḍlikum`, `tafaḍḍalū`), that a learner should USE it rather than only
    recognise it, and in which countries the singular would read as rude rather than as neutral.
64. **`fa-` against `wa` and `thumma`** (M2). The level's most load-bearing claim: that the three are
    a genuine three-way split (addition / sequence / consequence) rather than a textbook tidying of
    a range each covers. Confirm, and confirm that `fa-` on a past verb is what a speaker says in
    ordinary narration rather than something that reads as written Arabic.
65. **`ammā … fa-`** (M2, M8). Confirm the topic frame is heard in speech and not only in writing,
    and whether `ammā al-ān fa-` is the natural way to swing from a past habit to the present.
66. **`bi-sabab` + maṣdar against `li-ʾanna` + clause** (M2). Confirm that a speaker really does
    choose between them on the noun/clause line the brief draws, and that
    `bi-sabab al-wuṣūl mutaʾakhkhiran` is idiomatic rather than a calque of "because of arriving
    late".
67. **`kāna qad` in speech** (M3, M10). Confirm the pluperfect frame is used out loud, and whether a
    bare past would do the same job in a story — the same question `docs/78` asked at 39 about `qad`
    + past.
68. **`kāna yajibu an` for "I should have"** (M3). Confirm this is what a speaker says for a regretted
    obligation, against `kāna ʿalayya an`, and whether the two differ in blame or only in register.
69. **`kuntu sa-`** (M3). Confirm "I was going to" is expressed this way and that stacking `kāna`
    with `sa-` sounds natural rather than constructed.
70. **`bal` and its obligatory negative** (M4). Confirm `laysa X bal Y` is the everyday shape, that
    `lākin` in the `bal` slot really is wrong rather than merely blunt, and whether a learner should
    meet `wa innamā` as its twin at L4 or wait for L5.
71. **`raghma anna` against `ʿalā ar-raghm min`** (M4). Confirm the clause/noun split, and confirm
    that marking BOTH halves (`raghma anna …, wa maʿa dhālika …`) is natural rather than redundant
    to an ear used to English's one-marker rule.
72. **`qad` + imperfect for "may"** (M5). Confirm `qad yaʾtī` reads as possibility and not as
    emphasis, and that it is heard in conversation rather than being a written hedge — and whether a
    learner is better served by `rubbamā`, which L3-M3 already owns.
73. **The rest of the `laysa` paradigm** (M5). Confirm `lasta`, `lasti`, `lasnā` and `laysū` are
    forms a speaker uses in the educated-neutral register this course pins, and re-ask `docs/78`
    question 35 about the `-an` on the predicate, since M5 depends on `lastu mutaʾakkidan`.
74. **Negative raising** (M5). Confirm `lā aẓunnu anna hādhā ṣaḥīḥ` is what a speaker says rather
    than `aẓunnu anna hādhā laysa ṣaḥīḥ`, i.e. that the English transfer really is safe here.
75. **`qabla an` with a present-shaped verb inside a past sentence** (M6). Confirm
    `qabla an adhhab ilā al-ʿamal, sharibtu al-qahwa` is right, and that `baʿda an` genuinely takes
    the past where `qabla an` cannot.
76. **`lam … baʿd` for "not yet"** (M6). Confirm the trailing `baʿd` is what a speaker adds, that it
    is not confusable in speech with `baʿda`, and whether `lissa` or a dialect equivalent is what
    would actually be heard — a `usage` question, not a `display` one.
77. **`ḥattā` for "until" against its other jobs** (M6). `ḥattā` also means "even" and introduces
    purpose. Confirm that teaching only the temporal job at L4 leaves a learner safe rather than
    half-informed, given that the key is bought here and its note answers for every later use.
78. **The internal passive in speech** (M7). The module's most load-bearing claim: that `yurjā`,
    `yumnaʿ`, `yuftaḥ` and `tudfaʿ` are what a learner hears at a counter, a platform and a gate.
    Confirm, and confirm the no-agent law — that Arabic's passive cannot name a doer — is stated
    strongly enough to be worth a mistake plate.
79. **`yumnaʿ at-tadkhīn` said, against `mamnūʿ at-tadkhīn` written** (M7). `docs/78` asked at 43
    whether the sign reads `mamnūʿ at-tadkhīn`; this asks the other half — whether a guard says the
    verb, and whether the pair is a real register contrast or a manufactured one.
80. **`kāna`'s sisters as one class** (M8). Confirm `kāna`, `mā zāla`, `aṣbaḥa` and `ṣāra` are one
    thing to a speaker's ear, that `mā zāla` is the everyday "still" rather than a written form, and
    whether `ṣāra` or `aṣbaḥa` is the commoner "became" in the region.
81. **`lam yaʿud` + present for "no longer"** (M8). Confirm the frame, and confirm `lam aʿud adrus`
    is not heard as "I did not return to study".
82. **The relative pronoun's three laws** (M9). Confirm all three at once: that `alladhī` cannot be
    dropped with a definite antecedent, that an indefinite antecedent takes NONE, and that the
    resumptive pronoun (`nazalnā fīhi`) is obligatory rather than optional. This is the level's
    sharpest interference pair and the whole module rests on it.
83. **`sāfartu ilā` and the journey vocabulary** (M9). Confirm `riḥla`, `funduq`, `maṭār`, `shāriʿ`
    and `qarya` are the everyday words, and specifically whether `shāriʿ` or `ṭarīq` is what a person
    giving directions in a city actually says.
84. **Direct speech and the pronoun flip** (M10). Confirm that a quoted line drops `anna` and `inna`
    entirely, that the colon is how the page marks what speech marks with a pause, and whether the
    Arabic line should use `«…»` or `"…"` — a `script` question the romanization laws do not answer.
85. **`fajʾatan` and `wa idhā bi-` as the turn** (M10). Confirm both are what a storyteller uses,
    and whether `wa idhā bi-` is too literary for a six-sentence spoken account.
86. **The level's register as a whole.** L1 was pinned as spoken-simple MSA. L4 opens the imperative,
    the passive and an official register, and M7 deliberately reaches for a formality the rest of the
    ladder avoids. Confirm the level still sounds like one person's Arabic rather than two — and say
    where, if anywhere, a module has drifted into written MSA.
