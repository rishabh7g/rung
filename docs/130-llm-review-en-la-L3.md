# en-la L3 — the LLM review

**Course:** en-la — English (L1) → Latin (L2) · **Level:** 3 "Fluency — stories & opinions" ·
**Bar:** LLM review, authorised by the repo owner. **The fluent-speaker gate is unmet**, and each
section below ends in its own open questions.

One document, one section per authoring wave, in the shape `docs/128` uses for L2.

---

## Wave 1 — L3-M1 and L3-M2 (#643), 2026-09-12

Authored in ladder order against the L3 briefs (#642) and the decisions in `docs/129`, rebuilding
between modules. Both signed `verifiedBy: "Claude Opus 5 — LLM review, authorised by repo owner"`,
`verifiedAt: 2026-09-12`.

### 1.1 What was checked

- **`npm run content:validate`** → both `ok`; `CONTENT 492/492 ok`.
- **The strict build** → `en-la: 22 modules (L1-M1..M10, L2-M1..M10, L3-M1..M2)`,
  `index L3-M1: 344 surfaces`, `index L3-M2: 364`, and **no `shown but untaught` line** — the ratchet
  holds at zero through twenty-two rungs.
- **The folded index** — 364 surfaces against a `surfaceCount` of 364, `maxSpan` 1.
- **The orthography sweep** — 2,191 readable Latin strings across the emitted course: zero `j`, zero
  apostrophes, zero acutes, zero combining marks, zero non-NFC, zero characters outside the ten
  macron letters and ASCII, no `script` line, and zero hyphens outside `-que`/`-ne`/`-ve`. The 176
  `mistake` plates swept separately.
- **`git diff --stat`** over every L1 and L2 module is **empty**.

### 1.2 The brief's own deferral, caught by the build

L3-M2-S07 was first written as `Officium meum grave est` — "my job is hard" — and the pool gate
rejected `meus`. **The brief forbids it**: `docs/129` §6 defers the plain possessive, because M5 opens
`suus` reflexive only and one module cannot open a possessive system and a reflexive at once. L2-M2
had already said out loud that this course teaches no possessive at all.

So the sentence lost its possessive and became `Officium grave est`, and the module is better for it:
the trap now lands on the **neuter**, which is where the difficulty actually is. `gravis` has been
taught for two levels as the shape that serves a man and a woman alike, and `grave` is the one cell of
that word that does move — so the plate is `Officium gravis est`, a learner applying a rule they were
correctly given. That is a sharper lesson than a possessive would have been.

Recording it because it is the first time in this course that a brief's deferral was enforced by the
build rather than remembered by the author.

### 1.3 A collision checked and found harmless

`grave` resolves to **`L2-M2-S02`**, not to L3-M2. L2-M2's `gravis` row lists `grave` in its `forms`,
first occurrence wins, and L3-M2's own row for the word therefore owns only `gravius`. Read back:

| Key | Owner |
|---|---|
| `gravis`, `grave`, `gravēs` | `L2-M2-S02` |
| `gravior`, `gravissimus` | `L2-M9` |
| `gravius` | `L3-M2-S07` |

This is the `magistrī` situation (`docs/128` §1.3) with the opposite outcome: L2-M2's note reads
"Same shape for a man or a woman; **grave for a neuter thing**", so a learner tapping `grave` in
L3-M2 is shown a note that names exactly the shape they tapped. The collision is real, it was checked
rather than assumed, and no content had to change.

### 1.4 Two keys one ending apart, both taught on purpose

`prīmum` (L2-M10's adverb, "first of all") and `prīmā` (this module's ordinal, agreeing with `hōrā`)
are **separate keys**, and L3-M1 writes both — S01 the ordinal, S09 the adverb. Each has a `mistake`
plate showing what the other one does in the wrong place: `Cotīdiē hōrā prīmum surgō` and `Prīmā
surgō, deinde labōrō`. A plate pair like that is the only honest way to teach two words a learner
cannot tell apart by meaning, and it cost two of the module's ten plates to do it.

`ēdī` is the module's other macron arrival, and it makes **three bars in one verb**: `edō`/`ēdī`
(present against perfect), `est`/`ēst` (L2-M5), `es`/`ēs` (L2-M5). `ēdit` was shown in a variation
before it was owned, and went into `ēdī`'s `forms` with the note rewritten to name it.

### 1.5 The conjunctions, and the tense pairing that is not guessable

L2-M10 had four sequencing **adverbs** that open a clause; M1 adds three **conjunctions** that join
two clauses into one sentence, and the difference is the difference between a list and a paragraph.
S09 writes the adverbs and every other sentence writes a conjunction, so the contrast is in the
content rather than only in a rule.

- **`dum` takes the present even when the story is past.** Two plates spend themselves on the
  imperfect a learner reaches for (`Dum legēbam…`, `Dum Mārcus dormiēbat…`), and both are wrong twice
  over: `dum` takes the present in real Latin, and this course has no imperfect at all — `legēbam`,
  `habēbam` and `eram` are still free keys after twenty-two modules.
- **`postquam` takes the perfect and `antequam` the present**, and nothing in either meaning says so.
  They are written in consecutive sentences (S03, S04) for exactly that reason, and the slip has a
  plate in each direction.

### 1.6 Three cells of a five-cell word

`docs/129` §3's hardest consequence, now in content. L3-M2 writes `quī`, `quae` and `quem`, and rule 0
says out loud that the relative has five shapes and this course writes three — because `quod` is
**L1-M9's "because"** and `quam` is **L2-M9's "than"**, confirmed live in the folded index, and
writing either as a relative would serve a learner the wrong note with no build failure at all.

The module makes the gap useful rather than apologising for it: S05's plate is `Liber quī legō`, the
subject shape where the object shape belongs, which is the error the missing cells make likeliest.

### 1.7 Open questions for the fluent-speaker gate

Additions to the fifty standing in `docs/123` §11, `docs/124` §6, `docs/125` §5, `docs/126` §6,
`docs/127` §6, `docs/128` §1.7, §2.7 and §3.7 and `docs/129` §7.

1. **Is `hōrā prīmā surgō` what a Roman would say about getting up?** The first hour is the hour after
   dawn, so "at the first hour" may be the wrong precision — `prīmā lūce` ("at first light") is the
   idiom, and it would cost a noun this module does not have.
2. **Does `audiō` really take a bare accusative for listening to music?** It does for hearing, and a
   teacher may say listening attentively wants `auscultō`, which is a different verb.
3. **Is `officium` the right word for a modern job?** It is duty and office and obligation, and
   `labor` is the work itself. M2 writes both and may be splitting a distinction English does not make
   in the same place.
4. **Should M2 teach `doceō` at all?** It is the teacher's verb and a learner will rarely produce it,
   and it is in the module only to hold `discō` apart from it. One sentence may be one too many.
5. **Is `lingua Latīna` or `Latīnē` the natural way to say what you are learning?** The adverb
   (`Latīnē discō`, "I learn in Latin") is arguably commoner and would cost one row rather than three.
6. **Does writing three cells of the relative do more harm than a wrong note on one cell?** Asked in
   `docs/129` §7 as a brief-level question and now asked of real content. The module names the gap in a
   rule; a teacher may say a learner is better served by the full paradigm.
---

## Wave 2 — L3-M3, L3-M4 and L3-M5 (#644), 2026-09-12

Authored in ladder order against the L3 briefs (#642), rebuilding between modules. All three signed
`verifiedBy: "Claude Opus 5 — LLM review, authorised by repo owner"`, `verifiedAt: 2026-09-12`.

This is the wave the whole course has been pointing at: **M4 opens a mood**, and it is the only module
in en-la that does.

### 2.1 What was checked

- **`npm run content:validate`** → all three `ok`; `CONTENT 495/495 ok`.
- **The strict build** → `en-la: 25 modules (L1-M1..M10, L2-M1..M10, L3-M1..M5)`,
  `index L3-M3: 377 surfaces`, `L3-M4: 397`, `L3-M5: 409`, and **no `shown but untaught` line** —
  the ratchet holds at zero through twenty-five rungs.
- **The folded index** — 409 surfaces against a `surfaceCount` of 409, `maxSpan` 1.
- **The orthography sweep** — 2,514 readable Latin strings: zero `j`, zero apostrophes, zero acutes,
  zero combining marks, zero non-NFC, nothing outside the ten macron letters and ASCII, no `script`
  line, no hyphen outside `-que`/`-ne`/`-ve`. The 200 `mistake` plates swept separately.
- **No `quod` clause of report in any readable display**, checked mechanically across all
  twenty-five emitted modules over every reporting verb the course has: 0. The English shape appears
  only in `mistake.display`, which is exempt by design.
- **`git diff --stat`** over every L1, L2, L3-M1 and L3-M2 module is **empty**.

### 2.2 `ne` and `nē` are two keys, read off the emitted index

`docs/123` §1.1 reserved this pair thirty modules ago, and `docs/129` §1.1 made M4 its owner. Read
back from the folded index after M4 shipped:

| Key | Owner |
|---|---|
| `ne` | `L1-M2-S06` — the question particle, donated by `surfaceIndexKeys('agis-ne')` |
| `nē` | `L3-M4-S05` |
| `agis-ne`, `valēs-ne`, `tū-ne` | `L1-M2-S06` — unmoved |
| `venīs-ne` | `L2-M6-S04` — unmoved |

Rule 4 of `src/engine/surface.ts` folds case and never a diacritic, so the bar makes a different word
and a different key, and the seam forms L1-M2 and L2-M6 own did not budge. **The reservation was
worth thirty modules of discipline** and this is the sentence that proves it.

### 2.3 `sīs` was a subjunctive all along

L2-M1 taught `sīs` inside a polite phrase as a word, on the same footing as `velim`. It is `sum`'s
present subjunctive, and M4-S07 uses it — `Sī fessus sīs, domum eās` — and its note says so
explicitly: "L2-M1 already taught it to you as a word inside a polite phrase. Now you know what it
is." The index confirms it never moved: `sīs` → `L2-M1-S10`, `sim` → `L3-M4-S05`.

That is the second time this course hands a learner a mood as vocabulary and then explains it,
`velim` being the first. It is also the reason M4 could afford to open the mood at all: three of its
forms were already in the learner's mouth.

### 2.4 The `-am` ambiguity, which is real Latin and has no mark

L1-M6 taught `veniam` as a future. From M4 onward, a form ending in `-am` may be a future or a present
subjunctive, and **nothing distinguishes them** — `sī possum, veniam` is a promise and `ut veniam`
would be a purpose. M4-S03 is built on that fact and its trap states it. This is the first ambiguity
in the course that the macron cannot fix, and naming it is the only available move; `accidit` (L2-M8)
and `bibit` (L1-M5's review) were the others.

M4 also refuses `possim` outright — `docs/129` §1 said so, and S10's `mistake` plate is a learner
generalising the mood they met four sentences earlier. The index confirms `possim` is absent.

### 2.5 Three plates on one error, deliberately

Every mistake plate in M4 except two is about the **same** thing: mixing an open condition with an
ideal one. `Sī veniat, gaudeō` appears as a plate on S01 and again on S02, and `Sī fessus es, domum
eās` on S07. That is three of ten plates spent on one error, and it is the right allocation — every
other slip in the module is a wrong ending, and this one is a wrong sentence built out of two correct
halves, which is the kind a learner cannot see.

### 2.6 `sē` against `eum`, and the error with no symptom

M5's hero pair is `Dīcit sē venīre` (S01) and `Dīcit eum venīre` (S02), one word apart and about
different people. S02's plate is **S01's sentence**, and its `why` says the thing that matters: it is
not wrong Latin, it is the wrong meaning, and nothing will warn you. A learner who reaches for `sē`
when they mean somebody else has reported the opposite of what they heard, and the build, the app and
the reader all stay silent.

S10 puts the same infinitive twice with a different pronoun each time — `Negat sē errāvisse; ego
tamen putō eum errāvisse` — and its plate is `sē` in the second clause, which would say the speaker
was the one who was wrong. `sē` points at the subject of **its own** clause, and a sentence with two
reporters is where that stops being obvious.

### 2.7 Corrections made during the wave

- **A missing macron, in my own variation.** `Sī possum, cras veniam` shipped `cras` for `crās` and
  the orthography sweep caught it before the commit. This is exactly the defect en-la has **no build
  gate for** — `checkScriptMode` returns an empty report for a `native` row — and it is the first
  macron slip in twenty-five modules of this course. The sweep is not a formality.
- **Four subjunctives and two possessives shown before they were owned**, each given a home in its own
  mood's or lexeme's row: `gaudeat` into `gaudeam`'s, `discat` into `discam`'s, `erret` into `errēs`'s,
  `suam` and `suōs` into `suum`'s. `dormiam` and `dormiās` had **no** row available — no sentence in
  M4 writes `dormiō` in the mood — so both were replaced with `legam` and `legās`, which the module
  does write. The brief's rule that every subjunctive is its own row leaves no honest place to put a
  mood of a verb the module never conjugates.
- **M3 was written with four enrichment blocks missing** and `validate.ts` rejected it: M1–M3 of any
  level ship fully enriched. Four `sound` lines and four `mistake` plates were written rather than the
  module being demoted.

### 2.8 Open questions for the fluent-speaker gate

Additions to the fifty-six standing in `docs/123` §11, `docs/124` §6, `docs/125` §5, `docs/126` §6,
`docs/127` §6, `docs/128` §1.7, §2.7, §3.7, `docs/129` §7 and §1.7 above.

1. **Is `Sī veniat, gaudeam` the right pair to teach first?** It is the ideal condition and it is
   textbook-correct, and a modern speaker may produce the open condition ninety-nine times in a
   hundred and never this.
2. **Does `vidētur` + nominative really belong beside `putō` + accusative in one module?** M3 writes
   both and names the inconsistency. It is real Latin and it may be one construction too many for a
   module whose job is opinions.
3. **Is `cōnsentiō` the natural verb for agreeing?** `assentior` is the classical one and it is
   deponent, which this course cannot teach. M3 chose the transparent compound of a verb the learner
   has (`sentiō`) over the idiomatic one.
4. **Is `nē errēs` idiomatic advice, or does it read as a purpose clause with its head cut off?** M4-S09
   writes it as advice and a teacher may say `nōlī errāre` is what a Roman would say.
5. **Does `negō` need a module of its own?** M5 teaches it in one sentence beside `dīcō` and `putō`,
   and it is the third verb in the course with a negative inside it. The set (`nōlō`, `mālō`, `negō`)
   may deserve a rule rather than a note.
6. **Is teaching `suus` without `eius` worse than teaching neither?** A learner who knows `suus`
   will use it for both, which is a definite error, where a learner who knows no possessive simply
   leaves possession out — which is what Latin does anyway.
---

## Wave 3 — L3-M6 through L3-M10 (#645), 2026-09-12

Five rungs, and the level closes: `draft` and `draftNote` come off L3 in `content/en-la/levels.json`.
All five signed `verifiedBy: "Claude Opus 5 — LLM review, authorised by repo owner"`,
`verifiedAt: 2026-09-12`.

### 3.1 What was checked

- **`npm run content:validate`** → all five `ok`; `CONTENT 500/500 ok`.
- **The strict build** → `en-la: 30 modules (L1-M1..M10, L2-M1..M10, L3-M1..M10)`,
  `index L3-M6: 421 surfaces`, `L3-M7: 441`, `L3-M8: 458`, `L3-M9: 473`, `L3-M10: 479`, and **no
  `shown but untaught` line at any of the thirty**.
- **The folded index** — 479 surfaces against a `surfaceCount` of 479, `maxSpan` 1, and the sum of the
  thirty per-module deltas is 479 exactly.
- **The orthography sweep** — 3,060 readable Latin strings: zero `j`, zero apostrophes, zero acutes,
  zero combining marks, zero non-NFC, nothing outside the ten macron letters and ASCII, no `script`
  line, no hyphen outside `-que`/`-ne`/`-ve`. The 216 `mistake` plates swept separately.
- **`git diff --stat`** over every L1, L2 and L3-M1…M5 module is **empty**.

### 3.2 Every reserved key still free, thirty modules on

Read back from the folded index with the level complete — **none of these is present**:

`legēbam`, `habēbam`, `eram` (L4-M8's imperfect), `venī`, `sīc`, `rosa`/`rosā`, `nōnne`, `num`,
`domī` (L4-M9's locative), `possim`, `meus`, `eius`, and `ȳ` in any word.

`domī` is the one worth naming: it was first deferred at L2-M4 and M7 wanted it again for
`melius est … manēre`. It wrote `domum īre` instead. Twenty-nine modules of a named gap, still named.

### 3.3 Two impersonal patterns in two cases, which `docs/129` §5 corrected the issue about

M6 teaches `pudet`/`taedet` with the **accusative** and `libet`/`placet` with the **dative**, side by
side, and the plate runs in both directions: S01's is `Mihi pudet` (the dative every other impersonal
in the course takes) and S04's is `Mē libet` (the accusative it had just learned). Twenty-five modules
had taught `mihi opus est`, `mihi placet` and `mihi vidētur` before anything prepared the accusative,
so both errors are equally reasonable — which is why the module writes four verbs rather than a rule.

The thing felt about is a **genitive**, the case's second job after L2-M2's possession; M8's genitive
of price is its third, and L3 opened no fourth.

### 3.4 L1-M8's phrase finally explained, twenty-two modules later

`quantī cōnstat` shipped at L1-M8 as a whole phrase a learner said without knowing why. M8 explains
it: `quantī` is a genitive of price, "at how much". A learner has been using it for two levels and is
owed the reason at the moment the course can give it, and this is that moment.

M8 also carries the level's second **benign homograph check**: `librī` is "of the book" here and
"books" at L1-M1, spelled identically, with no mark anywhere. The module names it in a rule and writes
`pretium librī`, where only one reading is possible. This is the third time this course has had to
handle a collision it cannot spell away — `magistrī` (L2-M2), `grave` (L3-M2), `librī` (L3-M8).

### 3.5 The festivals decision in content, and what it cost

`docs/129` §4 settled that the culture is Roman. M9 teaches `Sāturnālia` — **plural with no singular at
all**, so `Sāturnālia sunt` and never `est`, which is the module's one grammatical fact and its one
plate — and `diēs nātālis`, and S05 says in a rule whose festivals these are. The cost is stated rather
than hidden: the one named source (`docs/123` §7) has a telephone and a bicycle in it and no Diwali or
Christmas Eve, and coining is banned course-wide, so a learner who wants to talk about their own
December cannot yet. That is the third named gap of this kind, after `ēsse` and `Mārce`.

### 3.6 M10 spends no cap, on purpose

`docs/129` says the level's last rung should add almost nothing, and it adds **four surfaces** — three
of them perfects of verbs already taught (`vīdī`, `dīxī`, `signāvī`, `fuisse`). Everything else in
eight sentences has been in the index for at least three modules.

What it does with them:

- **`dum` + present is the relief that makes the account possible.** `Dum legō, Mārcus vēnit` is
  "while I was reading, Marcus came", and its plate is `Dum legēbam` — wrong twice, since `dum` takes
  the present in real Latin and `legēbam` is still a free key after twenty-nine modules.
- **Pro-drop across eight sentences**, with the subject named once at S01 and once more at S03 where
  it changes to `Mārcus`, and never again for three sentences after that.
- **`solvit` is "he pays" and "he paid"** with nothing to part them — the third such verb in the
  course after `accidit` (L2-M8) and `bibit` (L1-M5's review). In an account the sequencer decides:
  `deinde` says a step happened.
- **The level's last plate is `sē` where `mē` belongs.** `Dīxī mē aegrum fuisse` — the reporter is the
  speaker, so the reflexive is `mē`. A learner who has spent five modules learning `sē` as "the person
  reporting" will write it here, and the sentence would then be about somebody else entirely.

### 3.7 Corrections made during the wave

- **One row was nearly given a note about the wrong verb.** `bibam` (from `bibō`) was briefly parked in
  the `forms` of M9's `dem` row (from `dā`) to satisfy the ratchet. That is precisely the `magistrī`
  defect — a learner tapping `bibam` would have been shown a note about giving — so the variation that
  showed it was rewritten instead, and `dem`'s row owns only `dem` and `det`.
- **Two modules declared fewer rules than their sentences referenced**, and `validate.ts` caught both
  (`rule index 8 is out of range`). Fixed by pointing the sentences at rules that exist, not by adding
  rules to justify the indices.
- **M6-S06 shipped a variation with no `changed` field** and the schema rejected it.
- **`multum` and `signāre` and a dozen other shapes** were shown before they were owned and each went
  into its own lexeme's row — every one a real shape of a word the module teaches.

### 3.8 Open questions for the fluent-speaker gate

Additions to the sixty-two standing in `docs/123` §11, `docs/124` §6, `docs/125` §5, `docs/126` §6,
`docs/127` §6, `docs/128` §1.7, §2.7, §3.7, `docs/129` §7 and §1.7 and §2.8 above. **The gate remains
unmet**: no fluent speaker of living Latin has read any of this, and no authoring wave may close one of
these by rewriting a shipped module.

1. **Is `mē taedet` without a genitive idiomatic?** M6-S03 writes it bare, on the model of `mē pudet`.
   A teacher may say `taedet` always wants the thing one is sick of.
2. **Is `sollicitus sum` or `sollicitor` the living form?** M6 teaches the adjective because the
   passive is L4-M7's, and `sollicitor` is a real deponent-looking verb a speaker might reach for.
3. **Are `oculī dolent` and `mihi caput dolet` really the same construction?** M7 teaches them as one
   pattern with a plural verb. If the plural idiom differs, S06 is the sentence that is wrong.
4. **Is `officīna` the right modern borrowing for an office?** `docs/129` §7 asked it of the brief and
   M8 now writes it in a purpose clause. `tabellārium` was the alternative and is narrower.
5. **Does `solvō` want an object at all, or is `mercēdem solvō` a Latinist's calque?** Rome paid rents
   and `solvere` is the verb, and a teacher may say the idiom takes a dative of the person paid.
6. **Is `Sāturnālia agunt` how a Roman said "they celebrate the Saturnalia"?** `agō` with a festival is
   attested and `celebrāre` exists. M9 chose the verb the learner already has.
7. **Should M9 have been about the street rather than the calendar?** `docs/129` §7 asked this of the
   brief; ten sentences of content have not made it easier to answer, and a module about weather and
   markets would have avoided the culture question entirely.
8. **Is eight sentences the right ceiling, or does an account want a relative clause in it?** M10 uses
   M2's relative in none of its ten sentences, because the sequencers and the perfects filled the line.
   A fluent reader may find the result flat where the level intended it fluent.
