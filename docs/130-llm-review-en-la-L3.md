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
