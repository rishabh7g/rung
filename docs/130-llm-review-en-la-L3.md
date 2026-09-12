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
