# en-la L2 — the LLM review

**Course:** en-la — English (L1) → Latin (L2) · **Level:** 2 "Conversations — hold your own" ·
**Bar:** LLM review, authorised by the repo owner. **The fluent-speaker gate is unmet**, and each
section below ends in its own open questions.

One document, one section per authoring wave, in the shape `docs/122` uses for en-sa.

---

## Wave 1 — L2-M1 and L2-M2 (#639), 2026-09-12

Authored in ladder order against the L2 briefs (#638) and the decisions in `docs/127`, rebuilding
between modules. Both signed `verifiedBy: "Claude Opus 5 — LLM review, authorised by repo owner"`,
`verifiedAt: 2026-09-12`.

### 1.1 What was checked

- **`npm run content:validate`** → both `ok`.
- **The strict build** → `en-la: 12 modules (L1-M1..M10, L2-M1..M2)`, `index L2-M1: 198 surfaces`,
  `index L2-M2: 215 surfaces`, and **no `shown but untaught` line** — the ratchet holds at zero
  through twelve rungs.
- **The folded index** — 215 surfaces against a `surfaceCount` of 215.
- **`git diff --stat`** over all ten L1 modules is empty.
- **`scripts/verify.sh --fast`** → `TEST 909/910`, the one failure being the container's
  pre-existing splash PNG comparison.

### 1.2 The seam whose host was new in the same module

`docs/127` §5 flagged L2-M2 as the one seam of the level whose host is not already an L1 word:
`pater māter-que` needs `māter` indexed **before** the sentence that joins it. Read back from the
folded index:

| Key | Owner |
|---|---|
| `pater` | `L2-M2-S03` |
| `māter` | `L2-M2-S03` |
| `soror` | `L2-M2-S02` |
| `māter-que`, `soror-que` | `L2-M2-S04` |
| `que` | `L1-M10-S03` — unmoved |

S03 teaches the pair with `et` and S04 rewrites the same sentence with the enclitic, so the host is
one sentence ahead of the seam and the law is satisfied by construction rather than by luck. `que`
itself stays L1-M10's, as it must.

`pater`/`māter` are **two rows, not one**, because they are separate lexemes and a `forms` list holds
shapes of THAT word only. `fīlius`/`fīlia` are one row with two endings, which is the same word. M2
teaches both facts and says which is which, because a learner who generalises from either will get
the other wrong.

### 1.3 A real defect the index caught, and the fix

S08's first draft was `Fīlia magistrī est` — "she is the teacher's daughter". The folded index
answered:

```
magistrī    L1-M1-S07
```

**L1-M1 already owned that key**, because its `magister` row lists `magistrī` as the plural. So a
learner tapping the genitive would have been shown L1-M1's note, which says `magistrī` means
"teachers" — true of the plural and wrong for this sentence. Nothing in the build fails on it: the
token resolves, to the wrong row.

The sentence was rebuilt around **`magistrae`**, the feminine genitive, which L2-M2 owns outright and
which does not collide with anything. The collision is now the lesson rather than the bug: M2's rule
and S08's trap both say that of a man "of the teacher" is spelled exactly like "teachers", so the
module shows the feminine and names the ambiguity. This is the second time in this course that
reading the index back has changed a hero (the first was L1-M8-S02's feminine plural), and both times
the fix was to the content rather than to the plan.

### 1.4 The register decision, in the content

`docs/127` §1 settled that en-la is the only course in the catalogue whose politeness is not a
pronoun. In L2-M1 that is four `register: "formal"` chips, all on sentences built around `velim` or
`quaesō`, and **no chip anywhere on a pronoun**. `vōs` appears exactly once in the module, as
S01's `mistake` plate, where it is the error being taught — which is the plate exemption doing
useful work rather than merely being tolerated.

`velim` and `eāmus` are the level's only two subjunctives (§2 of `docs/127`). M1 writes `velim`,
names it a subjunctive in one clause, and explains nothing — and S03's note says out loud that
`nōlī` is an imperative rather than a subjunctive, because the two sit in the same module.

### 1.5 Corrections made during the wave

Seven surfaces were planned that no row owned, and each was either given a home or dropped:

- **Given a home** in their lexeme's `forms`: `gravēs`, `quālēs`, `magistrae`, `soror-que`.
- **Dropped**: `tē` and `nōbīs` from L2-M1 variations (neither is taught, and neither module has a
  hero to open them in); `vīnum` from an L2-M1 variation (M5's word, four modules early); `mea` and
  `frātrem`/`vidēre` from L2-M2 pool items — the first a possessive this course has never taught,
  the others an accusative and an infinitive with no rows.

The `mea` case is worth naming: L2-M2's sentences say "my brother" in the cue and write only
`frāter`, because **Latin leaves obvious possession out** and this course has taught no possessive at
all. S01's trap says so. A pool item that reached for `mea` would have contradicted its own module.

### 1.6 Two assertions made robust rather than re-pinned

`tools/content-build.test.ts` pinned `en-la: 10 modules (L1-M1..M10)` as an exact string in two
cases. Every authoring wave changes that count, so the file would need a touch per wave for no gain.
Both now assert the **shape** of the report line — `/^en-la: \d+ modules \(L1-M1\.\.M10/` — plus that
the shipped list still contains L1-M1, L1-M5 and L1-M10. A course that stops shipping, or ships a
partial first level, still fails; a course that grows does not.

### 1.7 Open questions for the fluent-speaker gate

Additions to the twenty-four standing in `docs/123` §11, `docs/124` §6, `docs/125` §5, `docs/126` §6
and `docs/127` §6.

1. **Is `velim` + bare accusative idiomatic** (`velim aquam`), or does a Roman need a verb —
   `velim aquam bibere`? S01 writes the bare form and S08 the fuller one, so the module hedges; a
   teacher may say only one of them is natural.
2. **Is `sīs` too rare to teach?** It is genuine and colloquial, and it is also the kind of word a
   learner will never see again in a textbook. `quaesō` alone might serve.
3. **Does `mē paenitet` belong in L2-M1 at all?** It is the second impersonal construction in the
   course after `mihi opus est`, and it arrives in the same module as a subjunctive and a new
   negative imperative. Deferring it to L2-M8, where things go wrong, is the obvious alternative.
4. **Is `gravis` of a person really "serious" rather than "stern"?** M2's note says it is a
   compliment. That is defensible and it is a judgement about register rather than about meaning.
5. **Should L2 teach a possessive?** Three cues in L2-M2 say "my" and no Latin word carries it. The
   module states the rule, but a learner describing their own family will want `meus` and will be
   told it does not exist yet.
6. **Is the genitive's arrival at M2 too early?** It is introduced on one job — possession between
   people — and `docs/127` §1 chose that deliberately. The alternative is to leave all four cases to
   L3 and let M2 describe people without owning them.
---

## Wave 2 — L2-M3, L2-M4 and L2-M5 (#640), 2026-09-12

Authored in ladder order against the L2 briefs (#638), rebuilding between modules. All three signed
`verifiedBy: "Claude Opus 5 — LLM review, authorised by repo owner"`, `verifiedAt: 2026-09-12`.

### 2.1 What was checked

- **`npm run content:validate`** → all three `ok`; `CONTENT 480/480 ok`.
- **The strict build** → `en-la: 15 modules (L1-M1..M10, L2-M1..M5)`, `index L2-M3: 238 surfaces`,
  `index L2-M4: 250`, `index L2-M5: 261`, and **no `shown but untaught` line** — the ratchet holds at
  zero through fifteen rungs.
- **The folded index** — 261 surfaces against a `surfaceCount` of 261, `maxSpan` 1.
- **The orthography sweep** (the substitute for the build gate `checkScriptMode` does not give a
  `native` course) — 1,492 readable Latin strings across the emitted course: zero `j`, zero
  apostrophes, zero acutes, zero combining marks, zero non-NFC, and no `script` line anywhere. The
  141 `mistake` plates were swept separately, since they are allowed to break the spelling bans and
  not the encoding ones.
- **`scripts/verify.sh --fast`** → quoted in the commit message.

### 2.2 The reserved keys, spent and unspent

`docs/123` §1.1 listed the pairs the macron keeps apart and L1 was forbidden to spend. Read back from
the folded index after this wave:

- `est` → `L1-M1-S01`, `ēst` → `L2-M5-S01`. **The pair `docs/127` §3 promised, delivered.**
- `es` → `L1-M1-S01`, `ēs` → `L2-M5-S04`. **A second pair out of the same verb**, not in any plan —
  `edō`'s imperative collides with "you are" exactly as its third person collides with "is". The
  module teaches both as one fact about one irregular verb rather than as two coincidences.
- Still free, and still owed to the modules that were promised them: `legēbam`, `habēbam`, `eram`
  (L4-M8), `nē` (L3-M4), `venī`, `sīc`, `rosa`/`rosā`, `nōnne`, `num`, `domī` (L4-M9).
- `esse` and `ēsse` appear **nowhere as a readable Latin string** — both are named in English prose,
  which is what `docs/127` §3 asked for, and a guard in the authoring script checked every display
  and every `forms` entry rather than the file's text, because the prose mention would have tripped a
  naive grep.

### 2.3 The seam, and the one new joined form

L2-M5 is the level's second seam module. `vīnum aquam-que volō` needed nothing new — `aquam-que` has
been L1-M10's since `L1-M10-S03` — but the variation `Velim vīnum pānem-que` and the pool item
`Aquam vīnum-que bibō` mint `vīnum-que`, which the build caught as untaught. It went into the
**`-que` row's `forms`**, which is en-la's arrangement and not en-ko's, and the ordering law holds by
construction: `vīnum` opens in S05 and the seam is written in S06, one sentence later.

Read back:

| Key | Owner |
|---|---|
| `que` | `L1-M10-S03` — unmoved |
| `aquam-que` | `L1-M10-S03` — unmoved |
| `vīnum` | `L2-M5-S05` |
| `vīnum-que` | `L2-M5-S06` |

### 2.4 Three surfaces shown before they were owned, and one two-shape row

The ratchet caught `magnī`, `nigram` and `parvae` in L2-M3's variations, and the pool gate caught
`magnam`, `magnae` and `magnōs`. All six were genuine shapes of adjectives the module teaches, so all
six went into their lexeme's `forms` — and `magnus`'s note was rewritten, because a note that said
"the three shapes: magnus, magna, magnum" would have been read by a learner tapping `magnōs`.

L2-M4's `domum`/`domō` are **one row with two forms**, per `docs/127` §4: they are two shapes of one
noun and neither is more basic. S09 writes the accusative and S10 the ablative, one bar apart with
opposite directions, and S10's row repeats the same note rather than minting a second lexeme. `domī`
is named in both notes and in rule 4 and is written nowhere.

### 2.5 A row display that matches the sentence rather than the lexeme

`docs/127` §3 said `ēst` is "a `forms` entry of `edō` and not its own row". The emitted content does
both: `edō`'s row in S01 carries `["edō", "ēst", "edere"]`, and S02 — whose sentence IS `Pānem ēst` —
carries a row whose `display` is `ēst`, because a deconstruction row has to align with a token the
learner can tap. Nothing in `tools/validate.ts` requires that alignment, but every module in every
course has it, and the app reads the row for the word under the finger. The brief's intent is met by
the **note**, which is written true of the whole verb in both rows. Worth recording because a reader
comparing §3 to the JSON will otherwise think one of them is wrong.

### 2.6 Enrichment below M3

`ENRICHMENT_FULL_THROUGH_MODULE = 3`, so L2-M3 carries all five blocks on all ten sentences and M4 and
M5 do not have to. They carry `trap`, three `variations` and `usage` on every sentence, `mistake` on
seven of ten each, and `sound` and `mnemonic` where quantity or a collision makes them say something —
M4's `domum`/`domō` and M5's `ēst`/`est` and `ēs`/`es`, where the whole lesson is a length you have to
hear. A `sound` line on `Ubi es?` would have been words about nothing.

### 2.7 Open questions for the fluent-speaker gate

Additions to the thirty standing in `docs/123` §11, `docs/124` §6, `docs/125` §5, `docs/126` §6,
`docs/127` §6 and §1.7 above.

1. **Is `benignē` still live enough to teach as the polite refusal?** It is classical and it is
   exactly right, and a modern speaker of living Latin may reach for `nōlō, grātiās` every time and
   never say it. M5 teaches both and leads with `nōlō`.
2. **Is `Quō venīs?` natural**, or does `veniō` want `unde` and `ad` and leave `quō` to `eō`? The pool
   writes it and the module does not, which is a hedge a teacher can settle in one sentence.
3. **Is `pedibus` the idiom, or `pedibus īre`?** M5 writes the bare ablative beside `eō` and `veniō`
   both, on the model of `raedā`. If the fixed phrase needs the verb of going, the `veniō` sentence is
   the one that is wrong.
4. **`rēctā` as an ablative of means is a stretch worth checking.** The module teaches it as "by a
   straight route", which makes three means-ablatives in one module and is tidy; it may simply be an
   adverb with no live case feeling left in it.
5. **Is `cēna` the right meal for a course taught in English?** It was the one substantial Roman meal
   and it was eaten in the late afternoon, so "dinner" is close and "lunch" is arguably closer. The
   note says when it was eaten and lets the learner decide, which may be evasion.
6. **Does the module teach too many collisions at once?** `ēst`/`est`, `ēs`/`es` and the named
   `ēsse`/`esse` are three in ten sentences, all from one verb. The alternative is to split `edō`
   across M5 and M8 and teach the imperative later, at the cost of a hosting module that cannot say
   "eat!".
