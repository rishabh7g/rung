# en-sa L1 and L2 — LLM review (#608, #609, #610, #613)

Four waves, one record, one complete level and the first two rungs of the next. **Sections 1–10 are
L1-M1 · L1-M2 (#608)**; **sections 11–19 are L1-M3 · L1-M4 · L1-M5 (#609)**; **sections 20–28 are
L1-M6 … L1-M10 (#610)**, which closed Level 1; **sections 29–37 are L2-M1 · L2-M2 (#613)**, which
open Level 2 into a course that now SHIPS. The open questions run in one list from 1 to 66 across
all four, and none of them is closed — the fluent-speaker gate of §9 is **UNMET** for every rung of
both levels. The file has been renamed once per wave that widened its scope, and this is the third
such rename: it was `…-L1-M1-M2.md`, then `…-L1.md`, and it is now `…-L1-L2.md`.

## Wave 1 — L1-M1 · L1-M2 (#608)

**Date:** 2026-09-12 · **Reviewer:** Claude Opus 5, LLM review, authorised by the repo owner ·
**Bar:** LLM review plus owner authority.

**There is no native-speaker gate on this course, and there cannot be one in the ordinary sense —
nobody grows up speaking Sanskrit at home.** The gate this course actually needs is a **fluent
saṃskṛta-sambhāṣaṇam speaker or a Sanskrit teacher**, and it is **UNMET**. Section 9 lists what
that reader has to answer. Nothing below should be read as a claim that it has been answered, and
no later authoring wave may close one of those questions by rewriting a shipped module.

---

## 1. What was authored

Two modules, from scratch — `content/en-sa/modules/` did not exist before this pass, and this
issue is what created it.

| | L1-M1 Who I am | L1-M2 First exchange |
| --- | --- | --- |
| sentences | 10 (`L1-M1-S01`…`S10`) | 10 (`L1-M2-S01`…`S10`) |
| variations | 30 — 3 on every sentence | 30 — 3 on every sentence |
| comprehension items | 13 | 13 |
| rules | 10 | 10 |
| word rows shown | 13, all opened here | 15 — 10 opened here, 5 re-taught from M1 |
| surfaces this module adds | 22 | 19 |
| cumulative index | 22, maxSpan 1 | 41, maxSpan 1 |

Both ship the full M1–M3 enrichment — `sound`, `variations`, `mistake`, `usage`, `mnemonic` on
every one of the twenty sentences — plus `literal` on **all twenty**, `trap` on all twenty, and
`register: "neutral"` throughout. There is **no `glossEn`** anywhere (#405). Neither module carries
`fixture: true`.

`prerequisites` is `[]` for M1 and `["L1-M1"]` for M2. `content/en-sa/levels.json` shows both rungs
`hasContent: true` with no `draft`; **L1 itself keeps its level `draft` flag**, because that clears
when all ten rungs are authored and eight are still empty.

**Provenance.** Both files carry `verified: true` with
`verifiedBy: "Claude Opus 5 — LLM review, authorised by repo owner"` and `verifiedAt: "2026-09-12"`,
shipped in the same change as the content (CLAUDE.md's standing rule), and this document is that
change's record.

---

## 2. What was checked, mechanically

Beyond `npm run content:validate` (452/452 ok) and the dev build, a scratch script walked every
string of both files and asserted, per file:

- **NFC.** Every string in the document equals its own `.normalize('NFC')`. This is the hazard
  `docs/121` §10 measured: a decomposed `ā` passes `checkScriptMode` (U+0304 is
  `Script=Inherited`, which the regex deliberately allows), is dropped from every font cut by
  `coveredChars`, and renders its base letter from Mukta with its accent from `system-ui` — while
  the index still resolves. Nothing in the build normalises, so the check has to be the author's.
- **Devanagari is confined to `script`.** Zero Devanagari codepoints appear outside a `script`
  field — not in a `display`, not in a `forms` entry, not inside an English `note`, `rule`,
  `trap`, `sound`, `usage`, `mnemonic`, `cue` or `changed`. `checkScriptMode` enforces the first
  two; the rest was checked here, and the build reports no scriptMode errors.
- **Pada form.** No `display`, `forms` entry, variation, mistake plate or pool item contains a
  hyphen, an apostrophe/avagraha, or a **word-final `ṃ`**. Every word-final nasal is written `m`
  (`aham`, `phalam`, `idam`, `mahyam`, `kim`, `ām`, `pustakam`, `saṃskṛtam`, `saṅgītam`,
  `bhāratīyam`, `gantum`). `ṃ` appears **only word-internally**, in `saṃskṛtam`, which is exactly
  the §2.3 rule.
- **The alphabet.** Every L2 slot draws only from the IAST inventory of `docs/121` §1.1 plus
  ordinary sentence punctuation. No acute, no stress mark, no ASCII-scheme capital.
- **Field typing.** `sound` on every hero sentence and on **no** variation and **no** pool item —
  the type makes the latter impossible, and it was asserted anyway. `script` on every sentence,
  every variation and every pool item; **no `script` on any word row and none on any mistake
  plate**, per `docs/121` §9.1.
- **Bars.** Exactly 10 sentences per module, ≥ 3 variations on every sentence (30/30 in both),
  ≥ 12 pool items (13 in both), no pool item case-insensitively equal to a hero, every word note
  within the 200-character ceiling.

### 2.1 The one build warning, and why it is expected

```
warn en-sa/L1-M1.json: 37 of 90 romanized surfaces carry no script line (optional but recommended)
warn en-sa/L1-M2.json: 36 of 89 romanized surfaces carry no script line (optional but recommended)
```

Those numbers are exactly the **word rows plus the mistake plates** (M1: 27 + 10; M2: 26 + 10).
`docs/121` §9.1 decided both deliberately: a word row's Devanagari would repeat a fragment of the
sentence's own quiet line directly beneath it, and `mistake.display` is wrong by design and never
read. The warning is the build noticing a decision, not a defect, and closing it would mean
reopening §9.1.

---

## 3. The shown-surface ratchet: en-sa opens at ZERO

The dev build prints no `shown but untaught` line for en-sa at all:

```
en-sa: 2 modules (L1-M1..M2)
```

— against, on the same run, `hi-mr: 7 · en-es: 10 · en-ar: 6 · hi-en: 30 · en-ru: 20 · en-it: 17 ·
en-fr: 20 · en-de: 11 · en-ko: 12`. **`tools/shown-surfaces.test.ts` now carries `'en-sa': 0`,
written out rather than left to the implicit-zero rule so that the number is a measurement.**
It can only ever fall from here, and it cannot.

Zero was a design decision taken **before** authoring, not a lucky outcome. CLAUDE.md's paragraph
on #491 is explicit that **a proper noun is NOT exempt** — it rides unindexed by #61 and is
COUNTED, which is why `priyā`, `thomas`, `meyer` and `anna` sit inside other courses' baselines —
and the M1 brief pushes the same decision forward: "PROPER NOUNS: a name rides unindexed (#61) and
IS counted by the shown-surface ratchet (#491), so `mama nāma <name>` either gives the name a row
or the module raises the baseline it must then live with — decide before authoring, not after."

**Decision: both names get rows.** `rāmaḥ` (forms `rāmaḥ`, `rāmāya`, `rāmasya`) and `sītā` (forms
`sītā`, `sītāyai`) are ordinary word rows in M1. That has a second, better effect than keeping the
count down: a declining proper noun is a cheap way to show that `mahyam` is a *case form* and not a
magic word, since `rāmāya phalam rocate` puts a name in the very slot `mahyam` occupies.

**A consequence a reader should see coming.** `sītā` is a row in **S02** (`mama nāma rāmaḥ.`)
although it does not appear in that sentence's own display; the sentence that first *shows* it is
S10. S02 is where the name SLOT is taught, so that is where the second name belongs, and its
variation `mama nāma sītā.` is directly beneath it. This is deliberate and the alternative was
worse: putting `sītā` into `rāmaḥ`'s `forms` would be the exact "never a cousin" violation
`docs/07` M8-1 repaired in hi-mr.

---

## 4. Every comprehension token resolves to the RIGHT row

`checkComprehensionPool` only proves that a token resolves. The failure it does not catch is
hi-mr's: four rows whose `forms` had swallowed a *different* word, so the Why panel answered a tap
with the wrong gloss. So every pool token of both modules was resolved through the emitted
`public/content/en-sa/index/L1-M<n>.json` to the word row it actually lands on, and read.

**26 pool items, 82 tokens, 0 unresolved, 0 landing on a wrong row.** The same walk over all 20
hero displays and all 60 variation displays also found 0 unresolved — which is the same fact the
ratchet reports from the other side.

The entries worth quoting, because they are the ones where a wrong row would be invisible:

| token | lands on row | row's cue | taught at |
| --- | --- | --- | --- |
| `mama` | `aham` | I · me | L1-M1-S01 |
| `mahyam` | `aham` | I · me | L1-M1-S01 |
| `chātrā` | `chātraḥ` | student | L1-M1-S01 |
| `adhyāpikā` | `adhyāpakaḥ` | teacher | L1-M1-S04 |
| `bhāratīyā` / `bhāratīyam` | `bhāratīyaḥ` | Indian | L1-M1-S03 |
| `rāmāya` / `rāmasya` | `rāmaḥ` | Rāma — a man's name | L1-M1-S02 |
| `sītāyai` | `sītā` | Sītā — a woman's name | L1-M1-S02 |
| `bhavatī` / `bhavataḥ` / `bhavatyāḥ` | `bhavān` | you (polite) · your honour | L1-M2-S02 |
| `kuśalinī` | `kuśalī` | well · in good health | L1-M2-S02 |
| `gacchāmi` · `gantum` · `gatavān` · `gatavatī` · `gamiṣyāmi` | `gacchati` | goes · is going | L1-M2-S07 |

**The gender pairs were the specific thing the issue asked to see verified in the emitted index,
and they hold:** `chātrā` resolves to the `chātraḥ` row, `kuśalinī` to the `kuśalī` row,
`bhavatī` to the `bhavān` row, `adhyāpikā` to the `adhyāpakaḥ` row. A learner who taps the
feminine gets the note that was written true of both.

### 4.1 The briefs' ownership plan holds on the real index

Every ownership assignment in `tools/course-briefs.ts` §2 and in the M1/M2 notes was checked
against the emitted index rather than against the plan. All 27 assignments hold; **no brief needed
correcting**, and `tools/course-briefs.ts` and `tools/course-briefs.test.ts` are untouched by this
change. In particular:

- `aham` owns `mama` and `mahyam` — one row, three shapes.
- `chātraḥ` owns `chātrā`. `phalam` and `pustakam` are opened with their bare shapes only, leaving
  `phale`/`phalāni` (M8) and `pustakasya` (M7) for the modules the brief assigns them to.
- **`gacchati` (M2) owns all five later shapes**: `gacchāmi`, `gantum`, `gatavān`, `gatavatī`,
  `gamiṣyāmi`. A participle is a shape of its verb, not a new lexeme, so M5 will open no rival row.
- **M2 owns `kim`**, and its note is written true of both readings.
- `bhavān` is one row with `bhavatī` in `forms`, plus the two genitive shapes this module writes.

And the keys the briefs say must stay FREE through L1 are free — verified by looking for them in
the emitted index and finding nothing: **`me`, `te`, `tat`, `vā`, `api`, `tvam`, `mā`, `saḥ`, `sā`,
`asti`, `asmi`, `gacchasi`.** (`asti`, `asmi` and `gacchasi` appear in `mistake.display` plates
only, which `buildWordIndex` never reads, so their keys are untouched.)

---

## 5. Decisions that could look like bugs

### 5.1 A question and its statement twin are the same words but not the same key

`src/engine/surface.ts` rule 3 strips edge punctuation, so the `?` is invisible to the index. M2
therefore writes `kim bhavatī chātrā?` against the statement `bhavatī chātrā.` and the two share
**every token but one**: it is `kim` itself that keeps them apart, and nothing else in the line
moves. That is the whole question grammar of L1 — no inversion, no do-support — and it is the point
of the module rather than a leak.

Where there is **no** `kim`, the two really are the same set of keys. `bhavān kuśalī?` (S02) and
the statement `bhavān kuśalī` differ only by intonation, and the course does not spell intonation.
Rule 8 of M2 says so in as many words, so a reader who notices it in the index has already been
told.

### 5.2 `kim` appears at the front AND at the end, on purpose

M2-S04 is `kim bhavatī chātrā?` — the yes/no marker, sentence-initial, which is what the brief
RATIFIES. M2-S08 is `bhavataḥ nāma kim?` — the interrogative **"what"**, standing exactly where the
answer will stand. These are the two readings the brief requires the row's note to be true of from
the first row, and showing both inside one module is what makes that note honest rather than a
promise. S08's `trap` says it outright: *"kim is at the END here, and that is not a second rule."*
S08's third variation, `kim bhavataḥ nāma rāmaḥ?`, puts both jobs in one line.

The alternatives stay written nowhere, exactly as the brief requires: **sentence-final `vā` and
sentence-initial `api` appear in no display, no variation, no pool item and no mistake plate**, so
both keys are free for L2.

### 5.3 Every sentence carries a `literal`, and none is missing

The brief says `literal` is needed on *nearly* every sentence. In practice it was needed on all
twenty: with verb-final order, a case-marked "I", an optional copula and a dative liker, there is
no en-sa sentence at this level whose word-for-word reading is the same as its cue. Even the
one-word `namaste.` earns one (`"a-bow to-you"`), because that is the fact its `note` rests on.

### 5.4 Three variations everywhere — including the one-word greeting

No sentence took the ≥ 2 exemption. `namaste.` looked like it would: a one-word greeting has
exactly one lexical alternative in this course (`namaskāraḥ.`). It was saved by the brief's own
M2 pattern `ām / na + , + <statement>`, which sanctions a comma-joined display, so the greeting can
honestly be shown opening a turn — `namaste, bhavān kuśalī?` and `namaste, bhavatī kuśalinī?` are
structural variations (the greeting in position, and then the gendered pair behind it) rather than
noun swaps.

### 5.5 The copula, decided per sentence

Not one sentence in either module writes a present copula, and none is missing one. Every
`aham + N`, `idam + N`, `<name> + N` and `bhavān + Adj` sentence is a complete verbless nominal
sentence, and the `literal` says so ("I student", "this book", "your-honour well"). `asmi` and
`asti` appear **only** on mistake plates — M1-S01 (`aham asmi chātraḥ.`), M1-S03
(`aham bhāratīyaḥ asti.`), M1-S09 (`idam asti mama pustakam.`) — where the plate's job is to show
the English reflex being reached for. `asti` proper is M3's, and the M1 rule says so by name rather
than pretending the verb does not exist.

### 5.6 The `sound` line carries the sandhi the display does not write

This is the first module that has to live with `docs/121` §2, and every hero whose pada form
differs audibly from its spoken join says so:

| sentence | written (pada) | said |
| --- | --- | --- |
| M1-S01 | `aham chātraḥ` | ahaṃ chātraḥ — the final m becomes a nasal hum before a consonant |
| M1-S04 | `aham adhyāpakaḥ` | ahamadhyāpakaḥ — before a VOWEL the m stays m and runs on |
| M1-S05 | `mahyam phalam rocate` | mahyaṃ phalaṃ rocate |
| M1-S08 | `idam pustakam` | idaṃ pustakam |
| M2-S04 | `kim bhavatī chātrā` | kiṃ bhavatī chātrā |
| **M2-S08 / S09** | **`bhavataḥ nāma …`** | **bhavato nāma … — the -aḥ → -o join, the §2 example itself** |

M1-S10 and M2-S07 say the opposite where it is true — *"nothing joins across these words"* — so
the learner is not left assuming a join is always hiding. M1-S02 and M2-S05/S10 make the third
point: a comma is a real pause, and M2-S10's `sound` names the join that would happen without one
(the -aḥ turning into -o and swallowing the following a) **in prose**, precisely because that join
is the avagraha the course never writes into a line.

### 5.7 `saṅgītam` with `ṅ`, `saṃskṛtam` with `ṃ` — one rule, not two spellings

Both are taken verbatim from the sources (`tools/course-briefs.ts` §6 writes
`mahyam saṅgītam rocate`; `docs/121` §2.3 lists `saṃskṛtam`), and they are consistent under one
rule: write the homorganic nasal letter where the following consonant has one (`ṅ` before `g`),
and the anusvāra where it does not (before the sibilant `s`). The `script` lines follow —
`सङ्गीतम्` and `संस्कृतम्`. **Question 6 below asks the fluent-speaker gate to confirm that rule
before the course is fifty modules deep in it.**

---

## 6. Corrections applied during the pass

1. **`chātraḥ` as the yes/no hero was replaced by `chātrā`.** The first draft of M2-S04 was
   `kim bhavān chātraḥ?`. Its `sound` line would have had to describe the `n` + `ch` external
   sandhi (`bhavān chātraḥ` → *bhavāṃś chātraḥ*), which is real but obscure and well beyond a
   second module. The hero became `kim bhavatī chātrā?`, which has one clean join (`kim` + `bh`),
   and the masculine moved to the first variation. Side effect worth having: the feminine leads
   once, which the brief's "neither shape is the default" asks for.
2. **`mistake.script` was removed from every plate.** The first generator emitted a Devanagari line
   on each mistake, following en-ko. `docs/121` §9.1 decided otherwise for L1 — word rows and
   mistake plates carry no `script` — and §9.1 wins.
3. **A re-teach carries `forms: []`.** The generator initially repeated a row's full `forms` list
   at every occurrence. Harmless to the index (first-occurrence-wins) but wrong on the page and
   against the prompt's "a word taught below is NOT new"; the first occurrence now carries the
   paradigm and every later one carries `[]`.
4. **A stray non-English fragment in M2-S06's `sound` was caught and rewritten** before the file
   was validated. Recorded because it is the kind of thing a generated file hides well.

**No brief was corrected.** §4.1 records the check that found nothing to correct; `#478`'s
precedent did not need to be invoked.

---

## 7. Judgement calls a reader should be able to argue with

- **The names are `rāmaḥ` and `sītā`.** They are the two names every Sanskrit learner meets first,
  and `rāmaḥ` is `docs/121`'s own running example. Cost: two rows out of a 25-word cap.
- **Three cases of `rāmaḥ` (`rāmaḥ`, `rāmāya`, `rāmasya`) and two of `sītā` in M1.** The briefs'
  ownership plan does not mention either name, so this is an extension of the plan rather than a
  contradiction of it, and the `forms` rule is satisfied — every entry is a shape of THAT word. The
  gain is that the dative and the genitive each get a second carrier besides `aham`, which is what
  turns `mahyam` and `mama` from vocabulary into grammar.
- **`bhāratīyam`, the neuter of the adjective, in M1.** It is shown once
  (`mahyam bhāratīyam saṅgītam rocate.`) and reused twice in the pool. The three-gender set on one
  row is the cheapest way to make "the adjective agrees" a visible fact rather than a rule.
- **`gacchati`'s `forms` list six shapes of which this module shows one.** That is the brief's
  instruction ("plan the WAVE, not the module"), and it means M3–M6 will open no rival row. The
  cost is a Why panel at M2 that names shapes the learner has not met; the note frames them as "the
  shapes this level writes", which is the wording the brief asks for.
- **M2-S09's mistake is a REGISTER error, not a grammar error.** `bhavataḥ nāma kathaya.` is
  perfectly grammatical Sanskrit said to the wrong person. Every other plate in the two modules is
  ungrammatical, and this one is flagged as different inside its own `why`.
- **`complexity.allowedPatterns` is a superset of the briefs' `patterns`.** M1 adds
  `<name> + (mama) + N/Adj` and M2 adds `bhavataḥ/bhavatyāḥ + nāma + kim / kathayatu`, both of
  which are the briefs' own frames with a third-person subject or the possessive shape in them. The
  briefs were not edited; `allowedPatterns` is the module's declaration of what it actually wrote.
- **`minWordsPerSentence` is 2 in M1 and 1 in M2.** `idam pustakam.` really is two words and
  `namaste.` really is one. The prompt suggested 3; a floor that a correct greeting cannot meet is
  a floor in the wrong place.

---

## 8. Sanskrit that was deliberately NOT written

Listed because "a form you are not certain of is a form you do not write" only means something if
the avoided forms are named.

1. **`bhavāṃś chātraḥ`** and every other external-sandhi surface — the whole point of §2, but
   also the reason M2-S04's hero changed (§6.1).
2. **The vocative.** `namaste rāma`, `namaste sīte` would have been natural greetings; the brief
   keeps the vocative out of L1 entirely, so the greeting sentences carry no addressee.
3. **`rocante`, the plural verb of the liking frame.** The brief gives it to M9. No plural thing is
   liked anywhere in M1.
4. **`phalāni`, `phale`, `dvau`, `dve`, `chātrau`** — the plural and, especially, the DUAL, which
   `docs/121` §5.1 admits at L1-M8 and nowhere earlier.
5. **`pustakasya`** (M7's) and any other noun genitive. The genitive appears in L1-M1 only as
   `mama` and as the two proper-noun shapes; the general noun paradigm waits for M7.
6. **`gacchasi` and every second-person ending**, and `tvam` — the deferred register. `gacchasi`
   appears once, on M2-S07's mistake plate, as the trap it is.
7. **`saṃskṛtam pustakam` for "a Sanskrit book".** Grammatical, but the idiomatic spoken form is
   more likely a compound (`saṃskṛtapustakam`), and neither was certain enough to ship.
8. **`vaidyaḥ` / `vaidyā` ("doctor") and `dugdham` ("milk")**, both drafted and both cut — not for
   doubt about the words but to keep M1 inside its cap with the gendered pairs it does teach.
9. **`kṛpayā` ("please")**, because there is no seat for it: the request's courtesy is the `-tu`
   ending, and adding the word would teach the English shape M2 rule 7 exists to unteach.
10. **Any first-person copula.** `asmi` is written only as a mistake, which is why M2's no-answer
    restates positively (`na, aham adhyāpakaḥ.`) instead of negating — the brief's own "honest
    limit", carried into rule 6 and into M2-S06's plate.

---

## 9. Open questions for the fluent-speaker gate

**There is no native speaker of Sanskrit in the ordinary sense.** The reader these are addressed to
is a fluent saṃskṛta-sambhāṣaṇam speaker or a Sanskrit teacher, and until one has answered them
this course carries an LLM signature and nothing stronger.

1. **`mama nāma rāmaḥ` as the first naming sentence.** Confirm this is what a sambhāṣaṇam speaker
   actually says, rather than `mama nāma rāmaḥ asti` or the fuller `mama nāmadheyam …`. The course
   has bet its whole M1 on the verbless form being the ordinary one.
2. **`aham chātraḥ` as a complete utterance.** Grammatically beyond doubt; the question is whether
   a speaker really opens with it bare, or whether something (`aham chātraḥ asmi`, or a particle)
   normally accompanies it in speech.
3. **`chātrā` as the feminine of `chātraḥ`.** Written per the brief. Confirm that spoken usage does
   not prefer `chātrī`, and that `chātrā` is not read as a different word.
4. **`adhyāpikā` against `adhyāpakā`.** M1-S04's whole plate rests on the feminine being
   `adhyāpikā`. Confirm, and say whether `adhyāpikā` or `śikṣikā` is the ordinary spoken word.
5. **`mahyam` against `me` in the liking frame.** This course writes `mahyam` everywhere and keeps
   `me` out of L1 entirely, to keep the `aham` row whole. Confirm `mahyam … rocate` is what is
   actually said, and not overwhelmingly `me … rocate` in speech.
6. **The nasal-spelling rule of §5.7** — homorganic letter where one exists (`saṅgītam`), anusvāra
   before a sibilant (`saṃskṛtam`). Confirm before the course is fifty modules deep in it, since
   changing it later forks every affected word into two index keys.
7. **`bhavataḥ nāma kim?` as the everyday "what is your name?"**, with `kim` final. Confirm the
   word order, and whether `kim bhavataḥ nāma?` is equally ordinary — the module shows the second
   only as a yes/no variation and would be teaching a false contrast if both are free.
8. **`bhavān kathayatu` as a bare polite request** (M2-S09's second variation, glossed "please tell
   me · do go on"). Confirm it is idiomatic standing alone, or whether something must follow it.
9. **`kuśalī` / `kuśalinī` as the everyday wellbeing word.** Confirm against `kuśalam` and against
   the common `bhavān kathamasti?`, and say whether the adjective really is the usual form of the
   question in a spoken class.
10. **`ām` and `na` as bare answers.** Confirm both stand alone in speech, and that the positive
    restatement (`na, aham adhyāpakaḥ.`) is what a speaker actually does instead of negating.
11. **The `sound` lines as a whole.** They are written for an English ear — the visarga as an echo,
    `ph` as an aspirated p and never an f, `ṛ` said *ri*, the retroflex/dental split. A teacher
    should check that none of the descriptions pushes a learner towards the wrong series, and that
    the pan-Indian tradition `docs/121` §7.1 adopted is described as it is actually taught.
12. **Naturalness of the 26 pool turns.** They were recombined from the cumulative index and are
    grammatical by construction; an LLM cannot hear which of them nobody would say. `sītāyai
    saṅgītam rocate` and `bhavataḥ pustakam kutra?` are the two most worth a second opinion.

---

## 10. Verification run for this change

```
npm run content:validate                              → CONTENT 452/452 ok  (en-sa/L1-M1.json ok, en-sa/L1-M2.json ok)
npm run content:build -- --with-unverified --with-fixtures
                                                      → en-sa: 2 modules (L1-M1..M2)
                                                        (no `shown but untaught` line — zero)
npm run content:build            (strict)             → en-sa: 0 modules — fixture course, excluded by the gate
npx tsc --noEmit                                      → clean
npx prettier --check .                                → clean
npx eslint <touched files>                            → clean
npx vitest run                                        → 822 passed, 1 failed (scripts/generate-splash.test.ts,
                                                        pre-existing on this host: it regenerates splash PNGs
                                                        from font rasterization and compares byte-for-byte)
```

`scripts/verify.sh` was deliberately NOT run: it stops at the first failing stage and would never
reach CONTENT while that splash test is red on this host, so the stages were run individually.

### Pinned inventories updated by this change

Three tests encoded the pre-#608 state and were updated with the content, not after it:

- `src/course/types.test.ts` — `MODULE_FILES` gains `content/en-sa/modules/L1-M1.json` and
  `L1-M2.json`; the case title's count moves to 452.
- `tools/content-build.test.ts` — the #606 skeleton cases. The ladder case now expects the two
  authored rungs to be `hasContent: true` with no `draft` and every other rung unchanged; the
  "no modules folder" case becomes "exactly the rungs #608 authored, and nothing ahead of them";
  the dev-build line becomes `en-sa: 2 modules (L1-M1..M2)`; and "emits nothing for a course with
  an empty ladder" becomes the asymmetry that replaced it — **the dev gate now emits en-sa, and the
  strict gate still drops it on `fixture: true` alone**, because the manifest row graduates in its
  own issue and not in an authoring wave.
- `tools/shown-surfaces.test.ts` — `'en-sa': 0`.

No other course's content was touched: `git diff --stat` over `content/hi-mr content/en-es
content/en-ar content/hi-en content/en-ru content/en-it content/en-fr content/en-de content/en-ko`
is empty.

---

## Wave 2 — L1-M3 · L1-M4 · L1-M5 (#609)

**Date:** 2026-09-12 · **Reviewer:** Claude Opus 5, LLM review, authorised by the repo owner ·
**Bar:** unchanged — LLM review plus owner authority, and the fluent-speaker gate of §9 still
**UNMET**. Section 18 continues that list from 12; nothing in this wave closes one of the first
twelve, and nothing here rewrote a shipped module in order to try.

This section continues the document rather than starting a new one, per #609's own instruction to
the authoring wave. The file was renamed from `…-L1-M1-M2.md` to `…-L1-M1-M5.md` because a name
promising two rungs on a record of five is the kind of thing a later reader trusts and should not:
nothing in the repo references the doc by filename (`tools/shown-surfaces.test.ts` cites it as
`docs/122`, by number), so the rename costs nothing.

---

## 11. What was authored

Three modules, in ladder order, each against the **real** cumulative index of the one below it —
M3 against L1-M2's 41 surfaces, M4 against M3's 48, M5 against M4's 77, with a
`content:build -- --with-unverified --with-fixtures` between each pair.

| | L1-M3 Needs and wants | L1-M4 My day | L1-M5 Yesterday |
| --- | --- | --- | --- |
| sentences | 10 (`L1-M3-S01`…`S10`) | 10 | 10 |
| variations | 30 — 3 on every sentence | 30 | 30 |
| comprehension items | 13 | 13 | 13 |
| rules | 10 | 10 | 10 |
| word rows OPENED here | 5 | 9 | **3** |
| surfaces this module adds | 7 | 29 | **3** |
| cumulative index | 48, maxSpan 1 | 77, maxSpan 1 | 80, maxSpan 1 |
| words per sentence | 2–4 | 1–4 | 2–4 |

Rows opened: **M3** — `icchāmi`, `asti`, `dadātu`, `jalam`, `adhyāpakam`. **M4** — `paṭhati`,
`khādati`, `pibati`, `likhati`, `karoti`, `adya`, `prātaḥ`, `sāyam`, `pratidinam`. **M5** —
`hyaḥ`, `saḥ`, `sā`, **and no verb row at all** (§15.6).

`prerequisites` is `["L1-M2"]`, `["L1-M3"]` and `["L1-M4"]` respectively. All three carry
`verified: true` with `verifiedBy: "Claude Opus 5 — LLM review, authorised by repo owner"` and
`verifiedAt: "2026-09-12"`, shipped in the same change as the content. `content/en-sa/levels.json`
now shows five rungs `hasContent: true` with no `draft`; **L1 keeps its own level `draft` flag**,
because five of its ten rungs are still empty.

### 11.1 Enrichment, and where M4 and M5 stop

`ENRICHMENT_FULL_THROUGH_MODULE` is 3 and checks the module NUMBER, so **M3 ships fully enriched**
— `sound`, `variations`, `mistake`, `usage`, `mnemonic` on all ten sentences, plus `trap` and
`literal` on all ten. M4 and M5 carry enrichment where it earns its place, which came out as:

| | `sound` | `variations` | `usage` | `trap` | `literal` | `mistake` | `mnemonic` |
| --- | --- | --- | --- | --- | --- | --- | --- |
| M3 | 10 | 30 | 10 | 10 | 10 | 10 | 10 |
| M4 | 10 | 30 | 10 | 10 | 10 | **5** | 7 |
| M5 | 10 | 30 | 10 | 10 | 10 | **5** | 8 |

The five M4 plates are on S01 (the invented progressive, `pustakam paṭhāmi asti`), S02 (`aham.`
alone), S03 (`adyam` — a time word given the object ending), S07 (`karoṣi`, the deferred register)
and S08 (`-āmi` under a named third-person subject). The five sentences without one are the ones
where every plate available was a repeat of one of those five, and a repeated plate teaches the
learner to skip the panel. The same test decided M5's: S01 (`gatavān asti`, the invented
auxiliary), S02 (the dropped `aham`, which is the module's whole reversal), S03 and S04 (the
agreement failure, met from the masculine side and then the feminine), S08 (`bhavatī … kṛtavān`).

`sound` is on every hero and on nothing else — the type makes a variation impossible to put it on,
and it was asserted anyway. `literal` is on all thirty: with a verb-final, case-marked language and
a past that is an adjective, there is still no sentence here whose word-for-word reading is its cue.

---

## 12. What was checked, mechanically

The same scratch walk as §2, re-run over all five files:

- **NFC.** Every string in all three new documents equals its own `.normalize('NFC')`. This is now
  also enforced in CI — `src/course/types.test.ts`'s en-sa case asserts it on every `display`,
  `forms` entry, `script`, rule and prose field, and #608 proved it bites by injecting one.
- **Devanagari is confined to `script`.** Zero Devanagari codepoints outside a `script` field in
  any of the three. The build reports no `checkScriptMode` errors.
- **Pada form.** No `display`, `forms` entry, variation, plate or pool item contains a hyphen, an
  avagraha, or a word-final `ṃ`. Every word-final nasal is `m` — `pustakam`, `jalam`, `adhyāpakam`,
  `adhyāpikām`, `sāyam`, `pratidinam`, `adyam` (on a plate), `kim`, `aham`. `ṃ` appears only inside
  `saṃskṛtam`, which is §2.3's rule exactly. Three visarga-final words are new — `prātaḥ`, `hyaḥ`,
  `saḥ` — and a visarga is not an anusvāra: it is the word's own ending, not a sandhi product.
- **`script` seating, now enforced.** `script` on every sentence, every variation and every pool
  item; **no `script` on any word row and none on any of the twenty mistake plates**, which is
  `docs/121` §9.1 and is what the en-sa test block now requires rather than recommends.
- **The register.** No `tvam`, `tava`, `tubhyam`, `tvām` or `te` in any L1 slot. The second-person
  ENDING appears exactly twice, both times on a mistake plate — `icchasi` (M3-S09) and `karoṣi`
  (M4-S07) — which is §8.6's precedent with `gacchasi`, and both plates say in their `why` that the
  ending belongs to a register this course does not speak.
- **Bars.** Exactly 10 sentences each; 3 variations on every one of the thirty (no sentence took the
  ≥ 2 exemption); 13 pool items each, none case-insensitively equal to a hero of its own module;
  every word note inside the 200-character ceiling.

### 12.1 The build warning, and why the numbers are what they are

```
warn en-sa/L1-M3.json: 39 of 92 romanized surfaces carry no script line (optional but recommended)
warn en-sa/L1-M4.json: 32 of 85 romanized surfaces carry no script line (optional but recommended)
warn en-sa/L1-M5.json: 36 of 89 romanized surfaces carry no script line (optional but recommended)
```

Each number is exactly **word rows + mistake plates**: M3 29 + 10, M4 27 + 5, M5 31 + 5. That is
§2.1's arithmetic on three more files, and it is `docs/121` §9.1 being obeyed rather than a defect.

---

## 13. The ratchet is still at ZERO, and that was designed rather than discovered

The dev build prints **no `shown but untaught` line for en-sa** at 5 modules:

```
en-sa: 5 modules (L1-M1..M5)
  index L1-M1: 22 surfaces
  index L1-M2: 41 surfaces
  index L1-M3: 48 surfaces
  index L1-M4: 77 surfaces
  index L1-M5: 80 surfaces
```

`tools/shown-surfaces.test.ts` still carries `'en-sa': 0` and **was not edited by this change.**

Two places in this wave would have raised it if they had been written the way they first wanted to be:

1. **`adhyāpakam`.** M3 needed a masculine accusative on the page (brief note 5), and the shape
   belongs to a lexeme M1 owns and M3 may not edit. Written into a display without a row of its own
   it would have been an untaught shown surface. It got a row — §15.2.
2. **The nine participles of M5.** `paṭhitavān`, `khāditavatī`, `pītavān`, `likhitavān`, `kṛtavatī`
   and the rest are shown all over M5 and M5 opens no verb row. They resolve because **M4 declared
   them in the forms of the row that taught each verb**, a module ahead of the module that shows
   them. That is the brief's plan, and §14 is the evidence it actually holds in the emitted index.

Nothing in these three modules puts an unindexed proper noun on the page: `rāmaḥ` and `sītā` have
had rows since M1, and every display that needed a name used one of those two.

---

## 14. Every comprehension token resolves to the RIGHT row

Thirty-nine pool items, **129 tokens, 0 unresolved, 0 landing on a wrong row**, each resolved
through the emitted `public/content/en-sa/index/L1-M<n>.json` (cumulative across the deltas) to the
word row it actually lands on, and each row read. The same walk over all 30 hero displays and all
90 variation displays also found 0 unresolved, which is §13's fact from the other side.

The entries that would have been invisible if they were wrong:

| token | lands on row | row's cue | opened at |
| --- | --- | --- | --- |
| `icchati` | `icchāmi` | I want | L1-M3-S01 |
| `adhyāpakam` | `adhyāpakam` | teacher (as the thing wanted) | L1-M3-S08 |
| `adhyāpikā` | `adhyāpakaḥ` | teacher | L1-M1-S04 |
| `mama` · `mahyam` | `aham` | I · me | L1-M1-S01 |
| `rāmasya` | `rāmaḥ` | Rāma — a man's name | L1-M1-S02 |
| `bhavatyāḥ` · `bhavatī` | `bhavān` | you (polite) · your honour | L1-M2-S02 |
| `gantum` · `gacchāmi` · `gatavān` · `gatavatī` | `gacchati` | goes · is going | L1-M2-S07 |
| `paṭhāmi` · `paṭhitavatī` | `paṭhati` | reads · studies | L1-M4-S01 |
| `khādāmi` · `khāditavān` · `khāditavatī` | `khādati` | eats | L1-M4-S04 |
| `likhitavān` | `likhati` | writes | L1-M4-S05 |
| `pibāmi` · `pītavān` · `pītavatī` | `pibati` | drinks | L1-M4-S06 |
| `kṛtavān` · `kṛtavatī` | `karoti` | does · makes | L1-M4-S07 |
| `saḥ` · `sā` | `saḥ` · `sā` | he · that man / she · that woman | L1-M5-S03 / S04 |

**The participles were the specific thing the issue asked to see verified in the emitted index, and
they hold.** Every `-tavān` and `-tavatī` in M5 resolves to the module that opened its VERB — M2
for `gatavān`/`gatavatī`, M4 for the other eight — and **M5 opened no rival row**, which is the
seam `docs/121` §4's `forms` rule exists to protect. A learner who taps the past gets the note that
was written about the verb, and that note is written true of both genders.

### 14.1 The briefs' ownership plan holds again, and no brief was corrected

Every ownership line in the three briefs was checked against the emitted index rather than against
the plan. All of them hold:

- **`gacchati` (M2) already owned `gantum` and `gatavān`/`gatavatī`**, so M3 opened no infinitive
  row and M5 opened no past row — the two seams the briefs were most explicit about.
- **`aham` owns `mama` and `mahyam`** through three more modules of use.
- **`na` is M2's row extended to negation**, not a second row. Its note is written true of the
  answer and the denial alike, and M3, M4 and M5 all re-teach it with `forms: []`.
- **`asti` is one row for existence AND possession**, and its note is written to survive M7's
  location reading as well — §15.3.
- The keys the briefs keep FREE through L1 are still free: **`me`, `te`, `tat`, `vā`, `api`,
  `tvam`, `mā`, `gacchasi`** appear in no display anywhere. (`icchasi`, `karoṣi` and `dadāti` occur
  on mistake plates only, which `buildWordIndex` never reads.)

**`tools/course-briefs.ts` and `tools/course-briefs.test.ts` are untouched by this change.** Two
places where a brief and a standing rule pull against each other are recorded in §15 rather than
"fixed": neither is the emitted index contradicting a brief, which is the only thing #478's
precedent licenses a wave to repair.

---

## 15. Decisions that could look like bugs

### 15.1 `icchāmi` is the row's `display`, where `docs/121` §4 says third singular present

§4 decides that a verb row's `display` is the third singular present, and lists `gacchati`,
`paṭhati`, `asti`, `khādati`. M4's five verbs follow it exactly. **M3's `icchāmi` does not**, and
the M3 brief is why: its index-seam note names the fresh row `icchāmi`, and every one of the
module's own patterns is first-person.

§4's stated REASON points the same way — *"the nominative singular / third singular present is the
shape the sentence in front of the learner actually shows first"*. The sentence in front of the
learner at L1-M3-S01 is `pustakam icchāmi.` A row headed `icchati` there would put an unseen shape
at the top of the panel at the moment of first teaching, which is the defect §4 exists to prevent.
`icchati` is not hidden: it is in the row's `forms`, it is printed in S01's second variation, and it
is the hero verb of S08. M2's `kathayatu` is the existing precedent for a row citing the shape its
module writes rather than the paradigm's citation form.

### 15.2 `adhyāpakam` is a NEW ROW for a shape of a word M1 owns — and the M3 brief says not to

The M3 brief's index-seam note ends *"nothing in this module opens a second row for a word M1 or M2
already owns"*, and its note 5 requires *"the accusative at least once on a masculine noun the level
already owns"*. Those two cannot both be obeyed literally, because the only places an accusative of
`adhyāpakaḥ` could live are (a) M1's row — which a later module may not edit, (b) a row here, or
(c) nowhere.

**CLAUDE.md settles it**: *"A new shape of an older lexeme gets its own row in the module that first
shows it, with a note back at the first-teach row."* So `adhyāpakam` is a row in L1-M3-S08 whose
note says it is the object shape of M1's `adhyāpakaḥ`, and `adhyāpikām` sits in its `forms` so the
feminine object shape is reachable from the same place. The brief's sentence is read as what it was
aimed at — no second row for `mama`, `na` or `gantum`, all three of which are re-teaches here with
`forms: []` — and not as a ban on the one thing the additions-only rule requires.

**The brief's parenthetical example was `chātraḥ → chātram`, and this module wrote `adhyāpakam`
instead.** The brief asks for "a masculine noun the level already owns", and `adhyāpakaḥ` is one.
The reason for the swap is that there is a natural sentence for it — `rāmaḥ adhyāpakam icchati`,
"Rāma wants a teacher", which is what somebody says in a school office — and no equally natural
L1 sentence in which a student is the thing wanted. A hero that nobody would say is a worse lesson
than a hero built on the brief's other example.

### 15.3 The `asti` note is written for three readings, one of which is not in this course yet

`asti`'s note reads: *"'Is · there is', and with an 'of' word in front it is also the whole of
'have'. M7 puts a place in front of it and the same verb says where something is."* The third
clause is about a module that does not exist, and it is there on purpose: the brief's seam note
requires M7 to extend `asti` to location **with no rival row**, and first-occurrence-wins means the
note a learner sees at M7 is the one written here. Writing it later is not an option that exists.

Both readings the module DOES teach are on the page in the same three words: L1-M3-S04's hero is
`mama pustakam asti` ("I have a book") and its first variation is `pustakam asti` ("there is a
book") — the owner removed and nothing else touched. That variation is what makes rule 3 a fact
rather than a claim.

### 15.4 M4 declares futures nobody has met, and M5 spends four of them

Each of M4's five verb rows carries five shapes: the 3sg citation, this module's `-āmi`, M5's two
participles and M6's future — `paṭhiṣyāmi`, `khādiṣyāmi`, `pāsyāmi`, `lekhiṣyāmi`, `kariṣyāmi`.
That is the brief's instruction ("plan the WAVE, not the module") and §8's `gacchati` decision
repeated: a Why panel at M4 names shapes the learner has not met, and in exchange M5 and M6 open no
rival rows. M5 immediately collected on it — its three new rows are `hyaḥ`, `saḥ` and `sā`, and
nothing else.

The cost is stated rather than hidden: each verb row's note says *"in the shapes this level
writes"*, which is the wording the brief requires precisely so that it stays true when M5 and M6
print those shapes.

### 15.5 `saḥ` and `sā` are TWO rows, not one gendered row

`docs/121` §5.2 makes a gendered row own both shapes from its first appearance, and `chātraḥ`,
`bhavān` and every participle here obey it. `saḥ`/`sā` are deliberately not folded together.

The reason is the module's own law. M5 exists to teach that the past AGREES, and its cleanest pair
of sentences is S03 `saḥ gatavān.` against S04 `sā gatavatī.` — two lines, four words, one
agreement each. Folding `sā` into `saḥ`'s `forms` would put the feminine pronoun inside a list at
exactly the moment the module wants it standing on its own line with its own note. Both notes name
the other word, so the pair is visible from either side, and both surfaces resolve to a row whose
cue says which gender it is. §5.2's purpose — *"a learner is shown `gatavān` … and has no way to
know that a woman saying the same sentence says `gatavatī`"* — is served better by two rows here,
not worse.

### 15.6 M5 contradicts M4's headline rule, on purpose, and says so

M4 rule 2 is that the subject is dropped whenever the ending supplies it. **M5 rule 4 takes it
back**: a participle marks gender and number but not person, so `aham gatavān` needs its `aham` and
`gatavān` alone is "he went". This is not an oversight between two modules written a day apart —
it is the single most useful thing M5 has to say, it has its own rule, and L1-M5-S02's mistake
plate is the bare `hyaḥ saṃskṛtam paṭhitavān.` with a `why` that spells out the reversal. An author
reading M4 and M5 side by side should see the contradiction; a learner meeting them in order gets
the rule that explains it.

### 15.7 `minWordsPerSentence` is 1 in M4

`gacchāmi.` is one word and a complete sentence, and that is the point of L1-M4-S02. The prompt
suggests 3; a floor a correct sentence cannot meet is a floor in the wrong place — §7's decision
about `namaste.`, made again for the same reason.

### 15.8 M5 rule 10 admits a hole rather than filling it

There is no past of `asti` in this course: "I had a book" would need the imperfect, which
`docs/121` §8 defers past L1 entirely. Rule 10 says so in as many words and tells the learner to use
the present instead. M2 rule 7 set the precedent (the no-answer restates positively because L1 opens
no "I am" to negate); an honest limit is cheaper than a form the course cannot support.

### 15.9 `pītavān`, not `pibitavān`

Four of M4's five verbs build their past by adding to the stem the learner already has;
`pibati` → `pītavān` does not. L1-M5-S06 is the sentence that shows it, its `trap` names the
temptation outright, and the `pibati` row's note carries the exception so it is reachable from
either end.

---

## 16. Corrections applied during the pass

1. **M4-S04's hero was `prātaḥ jalam pibāmi` and became `prātaḥ phalam khādāmi`.** Its `sound` line
   would have had to describe what `prātaḥ` does in front of a voiced `j`, and `prātaḥ` is an
   `-ar` stem underneath (`prātar-`), so the honest answer is not the ordinary visarga rule. Before
   `ph` the visarga simply stays, which is a claim this reviewer can stand behind. The drinking
   sentence moved to S06 with `pratidinam` in front of it, where the joins are two plain nasal hums.
2. **M3-S03's plate was `na jalam icchāmi` and became `jalam icchāmi na`.** Negation in front of the
   object is not reliably WRONG in Sanskrit — a plate has to be wrong, not merely unusual — whereas
   `na` stranded at the end is the error an English speaker actually makes, hunting for the slot
   their helper occupies.
3. **`kṛpayā` was drafted onto M3-S07's plate and cut.** It captures the English reflex perfectly and
   it is a real, usable word, so a plate calling it a mistake would have been false. The plate became
   `jalam dadāti.` — the citation form used as a request — which is genuinely the wrong sentence.
   §8.9's decision to write `kṛpayā` nowhere therefore survives this wave, plates included.
4. **A pool item collided with a variation** (M4's `pratidinam saṃskṛtam paṭhāmi` sat in both); the
   pool item became `sāyam saṃskṛtam paṭhāmi`.
5. **Every re-teach carries `forms: []`** and the citation display of the row that owns it — so the
   row under M3-S04's `mama` is headed `aham`, and the row under M5-S02's `paṭhitavān` is headed
   `paṭhati`. That is §6.3's rule from the first wave, applied to thirty more sentences.

---

## 17. Sanskrit that was deliberately NOT written

Continuing §8, and listed for the same reason — the rule only means something if the avoided forms
are named.

1. **`mā`**, in any display, variation, pool item or plate. It is named in M3 rule 7 as the
   imperative's negator and written nowhere, which is the brief's instruction exactly.
2. **`necchāmi`** and every other sandhi-joined negation. `na icchāmi` is two words on the page.
3. **The imperfect** — `agacchat`, `apaṭhat`, `akarot` — and every other lakāra. Named in M5 rule 9
   and in L1-M5-S01's `usage`, written in no display. Naming them is what stops a later module
   introducing one quietly.
4. **`āsīt`**, the past of `asti`. See §15.8: the hole is declared instead.
5. **`sma` with a present**, the other everyday way of making a past. Real, classical, and not
   written — one past, taught consistently.
6. **The bare `-ta` participle** (`gataḥ`, `paṭhitam`, `kṛtam`). It is a PASSIVE and would mean
   something else; only the active `-tavat` is written, and the rules never call `-tavān` "the
   participle" without saying which.
7. **`gacchasi`, `paṭhasi` and every other second-person ending in a display.** `icchasi` and
   `karoṣi` appear once each, on plates, flagged as the deferred register in their own `why`.
8. **The past and future of `icchāmi`** — `iṣṭavān`, `icchiṣyāmi`. The row carries only the two
   shapes this level writes; the brief's wording ("the shapes this level writes") leaves room for a
   later module to add its own row for a shape it actually prints, which is cheaper than declaring a
   form now on the strength of a pattern.
9. **The dual and the plural**, everywhere: no `phale`, `dvau`, `chātrau`, `pibanti`,
   `gatavantaḥ`. `docs/121` §5.1 admits the dual at L1-M8 and nowhere earlier, and nothing in these
   three modules counts anything.
10. **`śvaḥ`** (tomorrow) and every future display — M6's, named in no rule here.
11. **`atra`, `gṛhe`, `vidyālayam`** and every place word. M7's, and M6's accusative of destination;
    M4 rule 4 contrasts free time words against case-marked place without writing one.
12. **`prātaḥkāle` / `sāyaṅkāle`**, the longer time expressions. One form per meaning, and the short
    one, because two spellings of one idea are two index keys.
13. **`kaḥ` and `kā`** ("who"). `kim` covers what this level asks; a second question word with its
    own gendered pair was not worth a row here.
14. **`saṃskṛtapustakam` / `saṃskṛtam pustakam`** for "a Sanskrit book" — §8.7's decision, unchanged
    and still avoided in three more modules.

---

## 18. Open questions for the fluent-speaker gate — continuing from 12

Addressed, as before, to a fluent saṃskṛta-sambhāṣaṇam speaker or a Sanskrit teacher. Until one has
answered them these three modules carry an LLM signature and nothing stronger, and **no later
authoring wave may close one of them by rewriting a shipped module.**

13. **`pustakam icchāmi` as the everyday "I want a book".** Confirm that `icchāmi` with a plain
    accusative is what a speaker says at a counter, rather than an `āvaśyakam` construction
    (`mahyam pustakam āvaśyakam`) or something else entirely. The whole of M3's first half rests on it.
14. **`gantum icchāmi`.** Confirm the `-tum` infinitive in front of `icchāmi` is ordinary spoken
    usage, and that nothing normally intervenes between the two.
15. **`mama pustakam asti` as "I have a book".** Confirm the bare genitive, and say whether
    `mama samīpe pustakam asti` is in fact the commoner spoken form for a portable object — the
    course has bet M3's big idea on the short one.
16. **`jalam dadātu` standing alone as a request.** Confirm it is idiomatic without a dative, and
    say whether a speaker in a class or a shop really avoids `kṛpayā` — §16.3 cut the word on this
    course's reasoning, not on evidence about speech.
17. **`adhyāpakam icchāmi` — wanting a PERSON.** Confirm `icchati` takes an animate accusative
    naturally, and that "Rāma wants a teacher" is not heard as something odder in Sanskrit than in
    English.
18. **The five M4 verbs as the right five.** Confirm `paṭhati` covers both reading and studying in
    speech, that `likhati` is the ordinary verb for writing rather than `lekhanam karoti`, and that
    `karoti` is the everyday "do" it is used as in `bhavān kim karoti?`.
19. **`bhavān kim karoti?` as the everyday "what are you doing?"** Confirm the word order, and
    whether `kim karoti bhavān?` is equally ordinary — M4-S07 shows only the one and would be
    teaching a false fixity if both are free.
20. **The time words.** `adya`, `prātaḥ`, `sāyam`, `pratidinam`, `hyaḥ` — confirm each is the form
    actually spoken (against `prātaḥkāle`, `sāyaṅkāle`, `prativāsaram`), and confirm that none of
    them takes a case ending in ordinary speech. M4 rule 4 is unusually absolute.
21. **The participial past as the WHOLE past of spoken Sanskrit.** Confirm a speaker says
    `aham gatavān` rather than the imperfect, and that `-tavān` is not heard as bookish. This is
    `docs/121` §8's register decision meeting its first real test.
22. **`pītavān` for "drank".** Confirm the form, and say whether a speaker would ordinarily say
    `jalam pītavān` at all or reach for a different verb for drinking water.
23. **Whether a bare participle really reads as third person.** M5 rule 4 and L1-M5-S02's plate both
    assert that `gatavān` without a pronoun is "he went" and that `aham` is therefore compulsory for
    "I went". Confirm — if a bare participle is in practice read from context, the rule is too strong.
24. **`saḥ` and `sā` as the everyday "he" and "she".** Confirm against `eṣaḥ` / `eṣā` and against
    simply repeating the name, which is what several Indian languages prefer in conversation.
25. **What a speaker says for "I had a book".** §15.8 declares the hole; naming the real spoken form
    would let a later level fill it deliberately rather than by improvisation.
26. **Naturalness of the 39 pool turns**, as question 12 asked of the first 26. They are grammatical
    by construction and recombined from the cumulative index; an LLM cannot hear which of them
    nobody would say. `mama adhyāpikā asti` ("I have a teacher") and `sītā adhyāpakam icchati` are
    the two most worth a second opinion.

---

## 19. Verification run for this change

```
npm run content:validate                              → CONTENT 455/455 ok
                                                        (en-sa/L1-M3.json ok, L1-M4.json ok, L1-M5.json ok)
npm run content:build -- --with-unverified --with-fixtures
                                                      → en-sa: 5 modules (L1-M1..M5)
                                                          index L1-M3: 48 surfaces
                                                          index L1-M4: 77 surfaces
                                                          index L1-M5: 80 surfaces
                                                        NO `shown but untaught` line for en-sa — still zero
npx tsc --noEmit                                      → clean
npx prettier --check .                                → All matched files use Prettier code style!
npx eslint src/course/types.test.ts tools/content-build.test.ts
                                                      → clean
npx vitest run src/course/types.test.ts tools/shown-surfaces.test.ts \
               tools/delta-index.test.ts tools/content-build.test.ts \
               tools/course-briefs.test.ts            → 5 files, 638 tests passed
npx vitest run                                        → 826 passed, 1 failed
                                                        (scripts/generate-splash.test.ts — pre-existing on
                                                        this host, byte-compares regenerated splash PNGs
                                                        against a different rasterizer)
```

`scripts/verify.sh` was again deliberately NOT run: it stops at the first failing stage and would
never reach CONTENT while that splash test is red here, so the stages were run individually.

### Pinned inventories updated by this change

- `src/course/types.test.ts` — `MODULE_FILES` gains `content/en-sa/modules/L1-M3.json`, `L1-M4.json`
  and `L1-M5.json`; the case title's count moves 452 → 455 and its wording from "first two rungs
  (#608)" to "first five rungs (#609)".
- `tools/content-build.test.ts` — `AUTHORED` becomes the five rungs; the ladder case, the
  modules-folder case and the dev-build line (`en-sa: 5 modules (L1-M1..M5)`) move with it.
- `tools/shown-surfaces.test.ts` — **untouched.** `'en-sa': 0` still holds.
- `tools/course-briefs.ts` and `tools/course-briefs.test.ts` — **untouched** (§14.1).

`git diff --stat content/en-sa/modules/L1-M1.json content/en-sa/modules/L1-M2.json` is empty, and so
is `git diff --stat` over the other nine courses.

---

## Wave 3 — L1-M6 · L1-M7 · L1-M8 · L1-M9 · L1-M10 (#610)

**Date:** 2026-09-12 · **Reviewer:** Claude Opus 5, LLM review, authorised by the repo owner ·
**Bar:** unchanged — LLM review plus owner authority, and the fluent-speaker gate of §9 still
**UNMET**. Section 27 continues the open questions from 26; nothing in this wave closes one of the
first twenty-six, and nothing here rewrote a shipped module in order to try.

**The file was renamed a second time**, `…-L1-M1-M5.md` → `…-L1.md`, for wave 2's own stated reason:
the level is now whole and a name promising five rungs on a record of ten misleads a later reader.
Nothing in the repo references the doc by filename — `tools/shown-surfaces.test.ts` cites it as
`docs/122`, by number — so the rename costs nothing again.

---

## 20. What was authored

Five modules, in ladder order, each against the **real** cumulative index of the one below it, with
a `content:build -- --with-unverified --with-fixtures` between every pair: M6 against M5's 80
surfaces, M7 against M6's 89, M8 against M7's 101, M9 against M8's 119, M10 against M9's 135.

| | M6 Tomorrow | M7 Where things are | M8 Numbers & shopping | M9 Feelings & opinions | M10 Connected talk |
| --- | --- | --- | --- | --- | --- |
| sentences | 10 | 10 | 10 | 10 | 10 |
| variations | 30 | 30 | 30 | 30 | 30 |
| comprehension items | 13 | 13 | 13 | 13 | 13 |
| rules | 10 | 10 | 10 | 10 | 10 |
| word rows on the page | 28 | 35 | 28 | 37 | 65 |
| rows OPENED here | 5 | 10 | 11 | 10 | **4** |
| surfaces this module adds | 9 | 12 | **18** | 16 | **4** |
| cumulative index | 89 | 101 | 119 | 135 | **139** |
| words per sentence | 2–4 | 3–5 | 2–4 | 2–6 | 1–5 (per sentence **inside** a turn) |

Rows opened: **M6** — `śvaḥ`, `vidyālayaḥ`, `gṛham`, `gamiṣyati`, `kariṣyati`. **M7** — `atra`,
`tatra`, `pustakālayaḥ`, `pustakasya`, `upari`, `phalasya`, `adhaḥ`, `samīpe`, `purataḥ`,
`pṛṣṭhataḥ`. **M8** — `ekaḥ`, `dvau`, `trayaḥ`, `pañca`, `daśa`, `phale`, `chātrau`, `kati`,
`kiyat`, `mūlyam`, `rūpyakam`. **M9** — `puṣpam`, `sundaraḥ`, `bālā`, `khinnaḥ`, `santuṣṭaḥ`,
`kimartham`, `kutaḥ`, `yataḥ`, `ataḥ`, `rocante`. **M10** — `ca`, `kintu`, `tathāpi`, `api`,
**and nothing else at all**, which is §24.5.

`prerequisites` is `["L1-M5"]` … `["L1-M9"]` respectively. All five carry `verified: true` with
`verifiedBy: "Claude Opus 5 — LLM review, authorised by repo owner"` and `verifiedAt: "2026-09-12"`,
shipped in the same change as the content. `content/en-sa/levels.json` now shows **all ten L1 rungs
`hasContent: true` with no module-level `draft`** — and **L1 keeps its own level `draft` flag and
its `draftNote` untouched**, because those come off at graduation (#611), which is a different
issue from the wave that filled the level.

### 20.1 Enrichment, module by module

`ENRICHMENT_FULL_THROUGH_MODULE` is 3 and checks the module NUMBER, so none of these five is bound
by it. All five nevertheless came out fully enriched, and the reason is honest rather than
decorative: every one of them has ten sentences whose sound, trap and usage are genuinely different
from each other.

| | `sound` | `variations` | `usage` | `trap` | `literal` | `mistake` | `mnemonic` |
| --- | --- | --- | --- | --- | --- | --- | --- |
| M6 | 10 | 30 | 10 | 10 | 10 | **5** | 10 |
| M7 | 10 | 30 | 10 | 10 | 10 | **5** | 10 |
| M8 | 10 | 30 | 10 | 10 | 10 | **5** | 10 |
| M9 | 10 | 30 | 10 | 10 | 10 | **6** | 10 |
| M10 | 10 | 30 | 10 | 10 | 10 | **5** | 10 |

`mistake` is the field that stayed selective, on wave 2's test: a plate goes where the English
reflex is specific and nowhere else, because a repeated plate teaches the learner to skip the panel.
The twenty-six plates are listed in §24.6.

`sound` earns its place on every hero of all five modules for one reason in particular: `śvaḥ`,
`kutaḥ`, `ataḥ`, `adhaḥ` and `purataḥ` all end in a visarga that behaves differently in front of
almost every following sound, and this is the wave where the learner meets enough of them to need
the pattern rather than the individual facts.

---

## 21. What was checked, mechanically

The same scratch walk as §2 and §12, re-run over all five files:

- **NFC.** Every string in all five documents equals its own `.normalize('NFC')` — every `display`,
  `forms` entry, `script`, rule, note and prose field. Also enforced in CI by the en-sa case in
  `src/course/types.test.ts`, which #608 proved bites.
- **Devanagari is confined to `script`.** Zero Devanagari codepoints outside a `script` field in any
  of the five. The build reports no `checkScriptMode` errors.
- **Pada form.** No `display`, `forms` entry, variation, plate or pool item carries a hyphen, an
  avagraha, or a word-final `ṃ`. Every word-final nasal is `m` — `vidyālayam`, `gṛham`, `ekam`,
  `mūlyam`, `puṣpam`, `kimartham`, `pustakālayam`. `ṃ` appears only inside `saṃskṛtam`, §2.3's rule
  exactly. The new visarga-final words — `śvaḥ`, `adhaḥ`, `purataḥ`, `pṛṣṭhataḥ`, `kutaḥ`, `yataḥ`,
  `ataḥ`, `chātrāḥ`, `trayaḥ` — are word endings, not sandhi products, and the joins they *would*
  make in speech are described in `sound` and written in no line (§24.1).
- **`script` seating.** `script` on every sentence, every variation and every pool item; **no
  `script` on any word row and none on any of the twenty-six mistake plates**, which is `docs/121`
  §9.1 and what the en-sa test block requires.
- **The register.** No `tvam`, `tava`, `tubhyam`, `tvām` or `te` in any L1 slot in any of the five.
  The second-person ENDING appears exactly once, on M10-S06's plate (`gamiṣyasi`), which is §8.6's
  precedent with `gacchasi` and §12's with `icchasi` and `karoṣi`; its `why` says the ending belongs
  to a register this course does not speak.
- **Bars.** Exactly 10 sentences each; 3 variations on every one of the fifty (no sentence took the
  ≥ 2 exemption anywhere in this level); 13 pool items each, none case-insensitively equal to a hero
  and — a check wave 2 added after its own collision — none equal to a variation either; every word
  note inside the 200-character ceiling.
- **Word bounds.** Every hero, variation, plate and pool item inside its module's declared
  `minWordsPerSentence`/`maxWordsPerSentence`. For M10 the bound is checked **per sentence inside a
  turn**, which is what the brief's note 1 says it means; the whole-turn token count of a
  three-sentence item is naturally larger and is not what the field bounds.

### 21.1 The build warning, and why the numbers are what they are

```
warn en-sa/L1-M6.json:  33 of 86 romanized surfaces carry no script line
warn en-sa/L1-M7.json:  40 of 93 romanized surfaces carry no script line
warn en-sa/L1-M8.json:  33 of 86 romanized surfaces carry no script line
warn en-sa/L1-M9.json:  43 of 96 romanized surfaces carry no script line
warn en-sa/L1-M10.json: 70 of 123 romanized surfaces carry no script line
```

Each number is exactly **word rows + mistake plates**: M6 28 + 5, M7 35 + 5, M8 28 + 5, M9 37 + 6,
M10 65 + 5. That is §2.1's arithmetic on five more files. **M10's 70 is the largest in the course
and is not a defect**: a turn of three sentences deconstructs into six to eight word rows, so the
module has 65 rows against the same ten sentences — every one of them a re-teach carrying
`forms: []`, and every one of them deliberately without a Devanagari line per `docs/121` §9.1.

---

## 22. The ratchet is still at ZERO — and this is the wave where it bit

The dev build prints **no `shown but untaught` line for en-sa** at 10 modules:

```
en-sa: 10 modules (L1-M1..M10)
  index L1-M6:  89 surfaces
  index L1-M7: 101 surfaces
  index L1-M8: 119 surfaces
  index L1-M9: 135 surfaces
  index L1-M10: 139 surfaces
```

`tools/shown-surfaces.test.ts` still carries `'en-sa': 0` and **was not edited by this change.**
en-sa remains the only course in the catalogue that prints no such line; on the same run the other
nine sit at `hi-mr: 7 · en-es: 10 · en-ar: 6 · hi-en: 30 · en-ru: 20 · en-it: 17 · en-fr: 20 ·
en-de: 11 · en-ko: 12`.

### 22.1 It actually failed once, in M10, and the fix was content

The first draft of M10-S03's third variation was `bhavān saṃskṛtam paṭhiṣyati lekhiṣyati ca?` — a
register-holding variation on a joined pair of verbs, and a good one. The build answered:

```
  shown but untaught: 2 surfaces — paṭhiṣyati · lekhiṣyati
```

M4 declared the `-iṣyāmi` futures of its five verbs in their rows (§15.4) and M6 collected on that,
but **no module declared a third-person future of `paṭhati` or `likhati`**, and M10 opens no verb
row at all — its whole claim (rule 10) is that it adds no new ending. Two ways out existed: open
two verb rows in M10, contradicting its own rule, or write the variation out of surfaces the level
already owns. The variation became `adya saṃskṛtam paṭhāmi. śvaḥ lekhiṣyāmi.` — the joined pair
split across two sentences, which is a *better* variation for a module about turns, and the line
went back to zero. **The ratchet is the reason a wrong thing was noticed at all, and it was lowered
by fixing content rather than by raising a baseline.**

### 22.2 How M8's agreeing numerals were kept off it — planned before a display was written

M8 is the module CLAUDE.md warns about, and the count is the reason: `ekaḥ`/`ekā`/`ekam` and
`dvau`/`dve` are **four separate surfaces for two words**, the counted nouns are three more
(`phale`, `phalāni`, `chātrāḥ`, `chātrau`), and the money words arrive all at once. The rows were
laid out before any sentence was:

1. **One row per NUMERAL, never one per shape.** `ekaḥ` carries `ekā` and `ekam` in `forms`;
   `dvau` carries `dve`; `trayaḥ` carries `trīṇi`. Three rows cover seven surfaces, and a learner
   tapping any of them gets the note that says the numeral copies its noun.
2. **One row per counted NOUN, opened here and not in M1.** `phale` carries `phalāni`; `chātrau`
   carries `chātrāḥ`. The brief said these were forms of M1's rows, and on the emitted index they
   are not — M1 shipped `phalam` with `forms: ["phalam"]` and `chātraḥ` with `["chātraḥ","chātrā"]`,
   and **a later module may not edit a file below it**. So CLAUDE.md's rule applies exactly as it
   did for `adhyāpakam` in M3: a new shape of an older lexeme gets its own row where it is first
   shown, with a note back at the first-teach row. §23.1 records the brief correction.
3. **Four was named in a rule and written nowhere.** `catvāraḥ`, `catasraḥ` and `catvāri` are three
   more surfaces for one word, and the module already carried eighteen. Rule 1 states the four-way
   agreement and gives one gendered shape of three (`trayaḥ`/`trīṇi`); four is named in prose, which
   the ratchet does not read, and appears in no display. §26.3.
4. **Every display was checked against the planned rows before it was written**, not after. The
   count landed at 18 new surfaces against a `newWordCap` of 25, and the module needed no cut.

No display in any of these five modules carries an unindexed proper noun. `rāmaḥ` and `sītā` have
had rows since M1, `bālā` is a common noun opened in M9, and **M10's `ca` sentences are anchored on
common nouns throughout** — `pustakam phalam ca`, `jalam phalam ca`, `vidyālayam pustakālayam ca`,
`paṭhiṣyāmi lekhiṣyāmi ca` — which is the brief's own warning obeyed rather than discovered.

---

## 23. The briefs' ownership plan, and the four places it was corrected

Wave 1 (§4.1) and wave 2 (§14.1) each checked every ownership assignment against the emitted index
and found nothing to correct. **This wave found four, and corrected the briefs** —
`#478`'s precedent, invoked for the first time on this course. All four are the same defect: a brief
written before M1 and M2 shipped assumed a row would carry a shape that the module which opened the
row did not in fact declare. Since **a later module never edits a file below it**, the shape has to
become its own row, and the brief has to say so.

`tools/course-briefs.ts` is edited in four notes; `tools/course-briefs.test.ts` is untouched and
passes (126/126).

### 23.1 The four corrections

| brief | said | the emitted index says | corrected to |
| --- | --- | --- | --- |
| **M6** seam | `gamiṣyāmi` **and `gamiṣyati`** are forms of M2's `gacchati` row | M2 declared six shapes and `gamiṣyati` is not among them | `gamiṣyati` and `kariṣyati` are rows opened in M6, each with a note back at the row that taught the verb |
| **M7** seam | fresh rows: **`kutra`**, `atra`, `tatra`, … | `kutra` is M2's, opened at L1-M2-S07, and M2's own seam note claims it | `kutra` is M2's returning and NOT fresh here; `pustakasya` added to M7's fresh list |
| **M8** seam | `dve`, `phale`, `phalāni` are forms of M1's `phalam` row; `dvau`, `chātrau` of M1's `chātraḥ` row | M1 shipped `phalam` with `forms: ["phalam"]` and `chātraḥ` with `["chātraḥ","chātrā"]` | `phale` (with `phalāni`) and `chātrau` (with `chātrāḥ`) are rows opened in M8 with notes back at M1 |
| **M9** seam | `rocante` joins M1's `rocate` row as a form | M1 shipped `rocate` with `forms: ["rocate"]` | `rocante` is a row opened in M9 with a note back at M1's |

**None of these is a content decision dressed as a brief fix.** In every case the alternative was
either editing a shipped module (forbidden) or showing a surface with no row (the ratchet). The
briefs' *intent* — one lexeme, one tap destination — survives in the notes: every one of the new
rows names the row it came from in its own `note`, so the Why panel says "this is the object shape
of M1's `pustakam`" rather than pretending to be a new word.

### 23.2 What did NOT need correcting

- **`gacchati` (M2) owns `gamiṣyāmi`** and M6 opened no row for it, exactly as the brief planned
  five modules earlier.
- **`paṭhiṣyāmi`, `khādiṣyāmi`, `lekhiṣyāmi`, `pāsyāmi` and `kariṣyāmi` are M4's**, declared a
  module ahead of the module that shows them (§15.4), and M6 spent four of the five without opening
  a row. That is the technique working as designed.
- **`asti` is still one row** and M7 extended it to location with no rival row, which is what M3's
  note was written in advance to survive (§15.3). Its note reads *"M7 puts a place in front of it
  and the same verb says where something is"* — written in M3, and true on the page in M7.
- **`ataḥ` and `yataḥ` are M9's** and M10 re-uses both with no second row, which is what the M9
  brief required its notes to be true of in advance.
- **`kim` stays M2's with both readings**, and `kimartham` opened its own key without touching it —
  the homograph decision #607 made, holding on the real index.
- The keys the briefs keep FREE through L1 are **still free**: `me`, `te`, `tat`, `vā`, `tvam`,
  `mā`, `saḥ`-as-`sa`, `gacchasi`. `api` is no longer free — M10 opened it, in exactly one reading
  ('also'), which is the brief's instruction. **The interrogative `api` is written in no display,
  no variation and no pool item**; it appears once on M10-S05's plate, where the `why` names it as
  the reading the course does not write.

---

## 24. Decisions that could look like bugs

### 24.1 Six sentences describe a join the page can never write

`vidyālayaḥ asti` is said *vidyālayo 'sti*; `gṛhe asti` is *gṛhe 'sti*; `ataḥ aham` is *ato 'ham*;
`śvaḥ api` is *śvo 'pi*; `tathāpi aham` is *tathāpy aham*; `kintu adya` is *kintv adya*. Every one of
those joins produces an **avagraha or a semivowel the course never writes into a line**, because
`'` is the one character `surface.ts` rule 3 does not strip from a token edge (types.test.ts says
so in as many words). So the join goes into `sound`, in prose, which is §5.6's decision met six more
times. A reader who checks a `sound` line against a `display` and finds them different has found the
rule, not a typo.

### 24.2 M7 gives `pustakasya` and `upari` separate rows rather than one two-token surface

The M7 brief suggests `pustakasya upari` could be a surface of its own, since a multi-token surface
donates neither of its tokens and the phrase would then resolve as a unit. **It was written as two
one-token rows instead**, and the reasons are cumulative:

- it keeps `maxSpan` at **1** for the whole course, so the resolver's greedy walk stays trivial and
  a later module cannot accidentally shadow a one-token key with a two-token one;
- it means `pustakasya` resolves **on its own**, which M8 immediately needs — `pustakasya mūlyam
  kiyat?` has no `upari` in it;
- and it is the `adhyāpakam` precedent (§15.2) rather than a new technique.

The cost is that `pustakasya` is a row for a shape of a word M1 owns, which is the same cost §15.2
already accepted and defended. The brief's sentence is permissive ("can be"), so this is a choice
inside it rather than a departure from it.

### 24.3 `pṛṣṭhataḥ` is a row seated in a sentence whose display does not show it

M7-S10 is `gṛhasya purataḥ pustakālayaḥ asti.` and its first variation is
`gṛhasya pṛṣṭhataḥ pustakālayaḥ asti.` The `pṛṣṭhataḥ` row is **appended to S10's `deconstruction`**
so that the surface has an owner. That is §3's `sītā` precedent exactly — a row seated at the
sentence that teaches the SLOT rather than at the line that first prints the word — and it was
chosen over the alternative of a tenth hero, because "behind the house" and "in front of the house"
are one lesson and two heroes would have been a noun swap wearing a rule's clothes.

The same move seats `bālā` in M9-S01 (which shows `sundarī` in a variation) and `trayaḥ` in M8-S04
(which shows `trayaḥ chātrāḥ` in a variation).

### 24.4 M6-S01 and M6-S02 are the same sentence with one word changed, on purpose

`śvaḥ gacchāmi.` and `śvaḥ gamiṣyāmi.` differ by a single word and mean the same thing. That is the
module's headline: the brief's note 3 says the cheapest future is the plain present with a day named,
and the only way to show two routes to one meaning is to write both and put them next to each other.
S01's rule list points at rule 3 and S02's at rules 1 and 2; neither claims the other is wrong.

### 24.5 M10 opens four rows and 65 word rows, and adds four surfaces

The smallest vocabulary gain of any module in the level (`ca`, `kintu`, `tathāpi`, `api`) sits on the
largest deconstruction count in the course. That is the module working: its rule 10 says there is no
new tense, case or ending in it, only four small words and the places they stand, and the index
proves the claim — **139 surfaces at M10 against 135 at M9**. Every other row in M10 is a re-teach
carrying `forms: []` and the citation display of the row that owns it, which is §6.3's rule applied
to the densest module in the course.

### 24.6 The twenty-six plates, and what each is for

M6 — `śvaḥ gamiṣyati` (the `-mi`/`-ti` person slip), `vidyālayaḥ gamiṣyāmi` (nominative for a
destination), `bhavān kutra gamiṣyāmi?` (the register's third person), `śvaḥ gamiṣyāmi na` (stranded
`na`), `rāmaḥ vidyālayaḥ gamiṣyati` (two nominatives).
M7 — `pustakam kutra gacchati?` (the locative/accusative pair, met through the verb),
`tatra vidyālaye asti` (locative on the subject), `rāmaḥ gṛham asti` (destination with a stative
verb), **`upari pustakam phalam asti`** (the module's own plate: preposition first AND bare noun),
`gṛham samīpe vidyālayaḥ asti` (a postposition without its genitive).
M8 — `ekaḥ phalam asti` (numeral not agreeing), **`dve phalāni dadātu`** (the plural for two — the
module's own), `dvau chātrāḥ` (the dual on the numeral only), `pañcaḥ phalāni icchāmi` (agreement
over-generalised past four — a mistake only a learner who understood rule 1 can make),
`pustakam mūlyam kiyat?` (no genitive under a price).
M9 — **`puṣpam sundaram asti`** (the copula, the module's own), `aham khinnam` (neuter on a person),
`aham khinnaḥ, pustakam na asti yataḥ` (`yataḥ` moved to the back — the M7 habit over-applied),
`mahyam puṣpāṇi rocate` (the verb agreeing with the liker), `kutaḥ bhavatī santuṣṭaḥ?` (adjective
not copying the addressee), `sundaraḥ puṣpam mahyam rocate` (an attributive adjective not agreeing).
M10 — **`ca pustakam phalam icchāmi`** (`ca` first — the module's own), `adya na gamiṣyāmi kintu`
(the mirror mistake: `kintu` last), `api sītā chātrā` (`api` fronted, which turns it into the
interrogative the course does not write), `bhavān kutra gamiṣyasi?` (the deferred register inside a
turn), and **`namaste. mama nāma rāmaḥ. aham saṃskṛtam paṭhāmi.`** — a plate on which **nothing is
ungrammatical**. It is a naturalness error: `aham` repeated in a turn that has already named its
speaker twice. M2-S09's register plate is the precedent (§7), and this one is flagged as different
inside its own `why`.

### 24.7 `minWordsPerSentence` is 1 in M10, and 2 in M6 and M8

`namaste.` is one word and opens M10-S09. `śvaḥ gacchāmi.`, `kati chātrāḥ?`, `dvau chātrau.`,
`kiyat mūlyam?` and `daśa rūpyakāṇi.` are two. §7 and §15.7 made this decision twice already for
the same reason: a floor a correct sentence cannot meet is a floor in the wrong place.

### 24.8 M8 writes four two-word "sentences" that are answers rather than statements

`kati chātrāḥ?` / `dvau chātrau.` and `kiyat mūlyam?` / `daśa rūpyakāṇi.` are two question-and-answer
pairs written as four heroes. The brief's pattern list sanctions a bare `<numeral> + N` and a bare
`kiyat mūlyam`, and counting in speech really does happen in fragments. The alternative — wrapping
each count in `asti` — would have been **wrong for the dual**, which is §24.9.

### 24.9 M8 admits a hole rather than filling it: there is no dual verb in this course

`dvau chātrau atra.` (M8-S09's second variation) stands without a verb, and its `changed` says why:
a dual subject needs a dual verb, and `staḥ` is a form `docs/121` does not admit at L1. The brief's
own limit is explicit — *"L1 shows the dual on the NOUN only, and the dual VERB agreement is named
as deferred and written in no display"* — so M8 rule 9 names it and writes it nowhere. M5's rule 10
(no past of `asti`) and M2's rule 7 (no first-person copula to negate) are the precedents: **an
honest limit is cheaper than a form the course cannot support.** Question 34 asks the gate what a
speaker actually says.

### 24.10 M10's `ca` sentences avoid joining two subjects

Every `ca` in M10 joins two **objects** (`pustakam phalam ca icchāmi`), two **destinations**
(`vidyālayam pustakālayam ca gamiṣyāmi`) or two **verbs** (`paṭhiṣyāmi lekhiṣyāmi ca`) — never two
nominative subjects. Two joined singular subjects would take a **dual verb**, which is the form
§24.9 has just declared this course does not write. The one pool item that first drafted it
(`pustakam phalam ca pustakālaye asti`) was caught and rewritten to
`sītā pustakam phalam ca icchati` before validation. The learner is never shown a `ca` that would
need an agreement the level cannot spell.

### 24.11 `api` is postpositive too, and the module says so

The brief frames `ca` as "the catalogue's first postpositive conjunction" against three
sentence-initial connectives. `api` is the fourth new word and it is **also postpositive**, so M10
rule 3 and M10-S05's `trap` state the real count out loud: *two* words in this module follow
(`ca`, `api`) and everything else that joins or qualifies leads (`kintu`, `ataḥ`, `tathāpi`,
`yataḥ`, `na`). Leaving `api` out of that statement would have taught a false symmetry.

### 24.12 `icchāmi` keeps its first-person citation display, nine modules on

M3's row is headed `icchāmi` rather than `icchati` (§15.1). M6, M8, M9 and M10 all re-teach it and
all four carry the same display, because a re-teach quotes the row that owns the key. §15.1's
reasoning is unchanged and the alternative — a different display on a re-teach — would break
§6.3 and the Why panel at once.

---

## 25. Every comprehension token resolves to the RIGHT row

Sixty-five pool items across the five modules, **251 tokens, 0 unresolved, 0 landing on a wrong
row**, each resolved through the emitted `public/content/en-sa/index/L1-M<n>.json` (folded
cumulatively across the deltas) to the word row it actually lands on, and each row read. The same
walk over all 50 hero displays and all 150 variation displays also found 0 unresolved, which is
§22's fact from the other side.

The entries where a wrong row would have been invisible:

| token | lands on row | row's cue | opened at |
| --- | --- | --- | --- |
| `gamiṣyāmi` · `gantum` | `gacchati` | goes · is going | L1-M2-S07 |
| `gamiṣyati` | **`gamiṣyati`** | will go (he · she · your honour) | L1-M6-S05 |
| `kariṣyati` | **`kariṣyati`** | will do · will make | L1-M6-S10 |
| `paṭhiṣyāmi` · `lekhiṣyāmi` · `pāsyāmi` · `khādiṣyāmi` | `paṭhati` · `likhati` · `pibati` · `khādati` | the M4 verbs | L1-M4 |
| `vidyālayam` · `vidyālaye` | `vidyālayaḥ` | school | L1-M6-S03 |
| `gṛhe` · `gṛhasya` | `gṛham` | house · home | L1-M6-S04 |
| `pustakālaye` · `pustakālayam` | `pustakālayaḥ` | library | L1-M7-S06 |
| `pustakasya` | `pustakasya` | the book's · of the book | L1-M7-S07 |
| `phalasya` | `phalasya` | the fruit's · of the fruit | L1-M7-S08 |
| `ekam` · `ekā` · `ekaḥ` | `ekaḥ` | one | L1-M8-S01 |
| `dve` · `dvau` | `dvau` | two | L1-M8-S02 |
| `trīṇi` · `trayaḥ` | `trayaḥ` | three | L1-M8-S04 |
| `phale` · `phalāni` | `phale` | two fruits · fruits | L1-M8-S02 |
| `chātrau` · `chātrāḥ` | `chātrau` | two students · students | L1-M8-S03 |
| `chātrā` · `chātraḥ` | `chātraḥ` | student | L1-M1-S01 |
| `rūpyakam` · `rūpyakāṇi` | `rūpyakam` | rupee | L1-M8-S08 |
| `sundaram` · `sundarī` · `sundaraḥ` · `sundarāṇi` | `sundaraḥ` | beautiful | L1-M9-S01 |
| `khinnā` · `khinnaḥ` | `khinnaḥ` | sad · downcast | L1-M9-S02 |
| `santuṣṭā` · `santuṣṭaḥ` | `santuṣṭaḥ` | content · pleased | L1-M9-S05 |
| `puṣpāṇi` · `puṣpam` | `puṣpam` | flower | L1-M9-S01 |
| `rocante` | **`rocante`** | are pleasing (more than one) | L1-M9-S06 |
| `rocate` | `rocate` | is pleasing · (someone) likes | L1-M1-S05 |
| `mahyam` · `mama` | `aham` | I · me | L1-M1-S01 |
| `bhavatī` · `bhavataḥ` | `bhavān` | you (polite) · your honour | L1-M2-S02 |
| `kutaḥ` | `kutaḥ` | why · from what | L1-M9-S07 |
| `kutra` | `kutra` | where | L1-M2-S07 |

**The three pairs the issue asked to see verified hold.** The dual resolves to a row whose cue names
the dual (`chātrau`, `phale`), the agreeing numerals resolve to one row each across all their
genders (`ekaḥ`, `dvau`, `trayaḥ`), and `kutaḥ` and `kutra` — one letter apart, different questions
— are **two distinct keys landing on two distinct rows**, which is the thing a learner's tap would
have got wrong silently.

---

## 26. Sanskrit that was deliberately NOT written

Continuing §8 and §17. The rule only means something if the avoided forms are named.

1. **The dual VERB**, everywhere: no `staḥ`, `gacchataḥ`, `paṭhataḥ`. M8 rule 9 names it as deferred
   and no display contains one; the dual answers stand as verbless fragments instead (§24.9).
2. **The periphrastic future** (`gantā asmi`) and every lakāra beyond the two this course writes.
   M6 rule 10 names them; the list did not grow past what M5 had already named.
3. **Third-person futures other than `gamiṣyati` and `kariṣyati`.** `paṭhiṣyati`, `lekhiṣyati`,
   `khādiṣyati` and `pāsyati` are all certain forms, and all four are written nowhere — §22.1 is the
   record of the one that tried to get in and was caught.
4. **`catvāraḥ` / `catasraḥ` / `catvāri` ("four")**, and every numeral above ten. Four is named in
   M8 rule 1 as the last of the agreeing numerals and written in no display (§22.2.3).
5. **`ṣaṭ`, `sapta`, `aṣṭa`, `nava`** — the invariable numerals between five and ten. `pañca` and
   `daśa` carry the rule; four more surfaces would have carried nothing extra.
6. **The dual of `puṣpam` (`puṣpe`)** and of `rūpyakam` (`rūpyake`). M8 opened the dual on two nouns
   and M9 and M10 count flowers only in the plural, so the pattern is taught without being padded.
7. **`āpaṇaḥ` ("shop")**, which M8's shopping frame obviously wants. It was drafted and cut: the
   module was already carrying eighteen new surfaces and the frame works without naming the place.
8. **`vidyālayasya` and every genitive not actually printed.** M7 writes `gṛhasya`, `pustakasya`,
   `phalasya`, `mama`, `bhavataḥ` and `rāmasya` and stops. A genitive declared but not shown would
   be a surface with no sentence behind it.
9. **`kṛpayā` ("please")**, for the third wave running — §8.9 and §16.3, unchanged. M8's requests are
   `dadātu` and nothing else.
10. **`asmi`** and every first-person copula. M9's verbless sentences (`aham khinnaḥ`) are the same
    shape M1 established, and `asti` appears in them only on M9-S01's mistake plate.
11. **`kadā` ("when")**, which M6 and M10 both wanted. `kutra`, `kim`, `kati`, `kiyat`, `kimartham`
    and `kutaḥ` are six question words already; a seventh with no sentence of its own was cut, and
    an M10 variation that had reached for it was rewritten (`kutaḥ` in its place).
12. **`eva`, `khalu`, `nanu`** and every emphatic particle. M10 writes `ca` and `api` and no other
    postpositive, so that the two placements it teaches stay a clean pair.
13. **`athavā` / `vā` ("or").** `vā` has been held free since M2 and stays free: M10 teaches joining,
    not choosing, and a second postpositive conjunction would have blurred `ca`'s lesson.
14. **The interrogative `api`.** M10 opens `api` in exactly one reading and writes the question
    reading only on M10-S05's plate, where its `why` names it as the reading this course does not use.
15. **`nāsti`, `necchāmi`, `rāmo`, `vidyālayo 'sti`, `ato 'ham`, `śvo 'pi`, `kintv adya`,
    `tathāpy aham`** and every other external-sandhi surface. All eight are described in `sound`
    lines and written in no display — §24.1.
16. **`saṃskṛtapustakam` / `saṃskṛtam pustakam`**, §8.7's decision, still avoided in five more
    modules.

---

## 27. Open questions for the fluent-speaker gate — continuing from 26

Addressed, as before, to a fluent saṃskṛta-sambhāṣaṇam speaker or a Sanskrit teacher. Until one has
answered them these five modules carry an LLM signature and nothing stronger, and **no later
authoring wave may close one of them by rewriting a shipped module.**

27. **`śvaḥ gacchāmi` against `śvaḥ gamiṣyāmi`.** M6 teaches both and says they are interchangeable.
    Confirm that a speaker really does use the plain present with `śvaḥ`, and say whether one of the
    two is markedly commoner in a spoken class — if so, M6's rule 3 is overstating the choice.
28. **The accusative of destination with no preposition.** `vidyālayam gacchāmi`, `gṛham gamiṣyāmi`.
    Confirm that nothing (`prati`, a locative, anything) normally accompanies the destination in
    speech, since M6 rule 4 is absolute about it.
29. **`gṛham` as the everyday "home".** Confirm against `gṛhān` and against simply naming the place,
    and say whether `gṛham gacchāmi` is what somebody actually says on leaving.
30. **The locative alone for at, in and on.** `gṛhe`, `vidyālaye`, `pustakālaye`. Confirm that
    spoken usage does not prefer a postposition (`vidyālayasya samīpe`) for some of these, and in
    particular whether "at school" is really `vidyālaye` rather than something longer.
31. **The five position words as the right five.** `upari`, `adhaḥ`, `samīpe`, `purataḥ`,
    `pṛṣṭhataḥ`. Confirm each governs a genitive in ordinary speech (rather than an ablative or a
    locative for some of them), and say which of the five a speaker actually reaches for.
32. **`pustakālayaḥ` as the everyday "library"** and its locative `pustakālaye`. Confirm against
    `granthālayaḥ`, which is the word several sources give first.
33. **The dual in spoken Sanskrit.** `dve phale`, `dvau chātrau`. Confirm the dual is genuinely
    alive in sambhāṣaṇam rather than a written-language survival — if speakers use the plural for
    two, M8's whole headline is teaching a book form as an everyday one.
34. **What a speaker says for "two students are here."** §24.9 declares the hole: the dual verb is
    not in this course, so M8 leaves the answer verbless. Naming the real spoken form would let a
    later level fill it deliberately rather than by improvisation.
35. **`kiyat mūlyam?` as the everyday price question**, and `pustakasya mūlyam kiyat?` with `kiyat`
    final. Confirm both orders are ordinary — M8 shows them as a free pair and would be teaching a
    false freedom if one of them is marked.
36. **`rūpyakam` / `rūpyakāṇi` for rupees.** Confirm against `rūpyakāṇi` versus a bare number, and
    say whether a speaker names the currency at all when giving a price.
37. **`kati` against `kiyat`.** M8 rule 6 and S07 split them as how-many against how-much. Confirm
    that split holds in speech, and that `kati` is not also used for an amount.
38. **`sundaraḥ` / `sundarī` / `sundaram` as the everyday "beautiful"**, and whether an adjective is
    really used predicatively with no copula as often as M9 claims (`puṣpam sundaram`).
39. **`khinnaḥ` and `santuṣṭaḥ` as the everyday sad and content.** Confirm against `duḥkhitaḥ` and
    `sukhī`, which are the pair several spoken courses use, and say whether `khinnaḥ` is bookish.
40. **`kimartham` against `kutaḥ` for "why".** M9 teaches them as free alternatives. Confirm both are
    ordinary, and say whether `kutaḥ` is heard primarily as "from where" in speech — if it is, M9-S07
    is teaching a reading that competes with M7's `kutra` more than the rules admit.
41. **`yataḥ` for "because" and `ataḥ` for "so".** Confirm both are what a speaker uses, against
    `yasmāt`/`tasmāt` and against `yataḥ hi`; and confirm that `yataḥ` really does lead its clause in
    speech, since M9-S04's plate rests entirely on that.
42. **`rocante` with a plural liked thing.** Confirm the agreement is heard as M9 rule 8 states it,
    and that `mahyam puṣpāṇi rocante` is not normally said with the singular anyway.
43. **`ca` after a two-item list, and after a pair of verbs.** Confirm `pustakam phalam ca` is what a
    speaker says rather than `pustakam ca phalam ca`, which several grammars give as the fuller form
    — M10's whole first rule depends on the single-`ca` pattern being the ordinary spoken one.
44. **`tathāpi` against `kintu`.** M10 rule 8 splits them as concession against opposition. Confirm
    that split is real in speech and that `tathāpi` is not simply a more emphatic `kintu`.
45. **`api` as "also", after its word.** Confirm the placement, and confirm that a sentence-initial
    `api` is genuinely heard as the yes/no marker rather than as "also" — M10-S05's plate asserts it.
46. **Pro-drop across a turn.** M10 rule 4 says `aham` belongs in the first sentence at most and
    usually nowhere, and M10-S09's plate calls a grammatical turn wrong on that basis alone. Confirm
    this is how a speaker actually sounds, since it is the strongest naturalness claim this course
    makes anywhere.
47. **Naturalness of the 65 pool turns**, as questions 12 and 26 asked of the first 65. They are
    grammatical by construction and recombined from the cumulative index; an LLM cannot hear which of
    them nobody would say. `phalasya adhaḥ pustakam asti`, `gṛhasya pṛṣṭhataḥ pustakam asti` and
    `bhavān kuśalī? aham api kuśalī.` are the three most worth a second opinion.

---

## 28. Verification run for this change

```
npm run content:validate                              → CONTENT 460/460 ok
                                                        (en-sa/L1-M6…L1-M10.json all ok)
npm run content:build -- --with-unverified --with-fixtures
                                                      → en-sa: 10 modules (L1-M1..M10)
                                                          index L1-M6:  89 surfaces
                                                          index L1-M7: 101 surfaces
                                                          index L1-M8: 119 surfaces
                                                          index L1-M9: 135 surfaces
                                                          index L1-M10: 139 surfaces
                                                        NO `shown but untaught` line for en-sa —
                                                        still zero, and the only course in the
                                                        catalogue without one
npx tsc --noEmit                                      → clean
npx prettier --check .                                → All matched files use Prettier code style!
npx eslint src/course/types.test.ts tools/content-build.test.ts tools/course-briefs.ts
                                                      → clean
npx vitest run tools/course-briefs.test.ts            → 126 passed
npx vitest run src/course/types.test.ts tools/content-build.test.ts \
               tools/shown-surfaces.test.ts tools/delta-index.test.ts
                                                      → 4 files, 517 tests passed
npx vitest run                                        → 831 passed, 1 failed
                                                        (scripts/generate-splash.test.ts — pre-existing
                                                        on this host, byte-compares regenerated splash
                                                        PNGs against a different rasterizer)
```

`scripts/verify.sh` was again deliberately NOT run: it stops at the first failing stage and would
never reach CONTENT while `scripts/generate-splash.test.ts` is red on this host (it regenerates
splash PNGs from font rasterization and byte-compares them against a different rasterizer), so the
stages were run individually. That failure is pre-existing and is the same one §10 and §19 recorded.

### Pinned inventories updated by this change

- `src/course/types.test.ts` — `MODULE_FILES` gains `content/en-sa/modules/L1-M6.json` … `L1-M10.json`
  (with `L1-M10.json` in STRING order, directly after `L1-M1.json`); the case title's count moves
  455 → 460 and its wording from "first five rungs (#609)" to "whole first level (#610)".
- `tools/content-build.test.ts` — `AUTHORED` becomes the ten rungs; the ladder case, the
  modules-folder case and the dev-build line (`en-sa: 10 modules (L1-M1..M10)`) move with it. The
  modules-folder assertion now sorts BOTH sides, because `AUTHORED` is in ladder order and
  `readdirSync` is in string order, where `L1-M10.json` sorts next to `L1-M1.json`. The ladder case's
  comment now states explicitly that **L1's own level `draft` stays on even with ten rungs
  authored**, because it clears at graduation (#611).
- `tools/shown-surfaces.test.ts` — **untouched.** `'en-sa': 0` still holds.
- `tools/course-briefs.ts` — **four seam notes corrected** (§23.1), which is the first use of #478's
  precedent on this course. `tools/course-briefs.test.ts` is untouched and passes.

`git diff --stat content/en-sa/modules/L1-M1.json … L1-M5.json` is **empty**, and so is
`git diff --stat` over the other nine courses.

---

## Wave 4 — L2-M1 · L2-M2 (#613)

**Date:** 2026-09-12 · **Reviewer:** Claude Opus 5, LLM review, authorised by the repo owner ·
**Bar:** LLM review plus owner authority.

**This is the first en-sa wave that reaches a learner.** #611 graduated the course, so these two
rungs ship on the next deploy rather than waiting behind a `fixture` flag. The fluent-speaker gate
of §9 is still **UNMET**, and sections 29–37 below are written on that understanding: nothing here
claims a native or fluent reading, and no later wave may close one of the questions in §36 by
rewriting a shipped module.

---

## 29. What was authored

Two modules, the first two rungs of Level 2, authored strictly in ladder order with a rebuild
between them — M1 against L1-M10's real cumulative index (139 surfaces, folded across all ten L1
files), M2 against M1's (146).

| | L2-M1 Asking politely | L2-M2 Describing people |
| --- | --- | --- |
| sentences | 10 (`L2-M1-S01`…`S10`) | 10 (`L2-M2-S01`…`S10`) |
| variations | 30 — 3 on every sentence | 30 — 3 on every sentence |
| comprehension items | 13 | 13 |
| rules | 10 | 10 |
| word row slots | 30 (3 per sentence), 22 distinct rows | 30 (3 per sentence), 17 distinct rows |
| rows that OPEN a surface here | 6 | 11 |
| surfaces this module adds | 7 | 18 |
| cumulative index | 146, maxSpan 1 | 164, maxSpan 1 |
| register chips | 9 `neutral`, **1 `informal`** | 10 `neutral` |

Both ship the full M1–M3 enrichment — `sound`, `variations`, `mistake`, `usage`, `mnemonic` on
every one of the twenty sentences — plus `literal` and `trap` on all twenty. There is no `glossEn`
anywhere (#405) and neither module carries `fixture: true`. Bounds are the briefs' 8 words, and the
longest sentence either module actually writes is 6. `newWordCap` is 25 and the real spend is 7 and
18.

`prerequisites` is `[]` for L2-M1 — prerequisites live *within* a level and the seal rule carries
the cross-level dependency — and `["L2-M1"]` for L2-M2. `content/en-sa/levels.json` shows both rungs
`hasContent: true` with no `draft`; **L2 itself keeps its level `draft` flag and its `draftNote`**,
because that clears when all ten rungs are authored and eight are still empty. That is exactly what
L1 did between #608 and #611.

**The seven surfaces L2-M1 opens.** `kṛpayā` · `dhanyavādaḥ` · `kṣamyatām` · `tvam` · `upaviśatu` ·
`āgacchatu` · `āgaccha` — six rows, because `āgaccha` rides in `āgacchatu`'s own `forms`.

**The eighteen surfaces L2-M2 opens.** `mātā` · `pitā` · `mātāpitarau` · `bhrātā` · `bhaginī` ·
`mitram` · `bālaḥ` · `staḥ` · `dīrghaḥ` `dīrghā` `dīrgham` · `śāntaḥ` `śāntā` `śāntau` `śāntam` ·
`vṛddhaḥ` `vṛddhā` `vṛddhau` — eleven rows, three of which carry a whole small paradigm because an
adjective in this course is one word with several shapes and not several words.

**Provenance.** Both files carry `verified: true` with
`verifiedBy: "Claude Opus 5 — LLM review, authorised by repo owner"` and `verifiedAt: "2026-09-12"`,
shipped in the same change as the content (CLAUDE.md's standing rule), and this document is that
change's record.

---

## 30. `tvam` enters, and exactly how far

This is the decision the level turns on, and it was executed to the letter of the brief rather than
to its spirit, because the spirit is where a paradigm leaks in.

- **One row, one display.** `tvam` is a word row in `L2-M1-S04` and it appears in exactly ONE
  display in the module — the `L2-M1-S04` hero, `tvam atra āgaccha.` It is in no variation, no
  mistake plate and no pool item. This was checked by tokenising every display slot of both files,
  not by reading.
- **That sentence, and only that sentence, chips `informal`.** The other nine chip `neutral`.
- **No test scope needed widening.** `src/course/types.test.ts` already scopes both relevant
  assertions to `L1`: the intimate-set ban runs `if (isL1)`, and the register assertion runs
  `if (isL1) expect(sentence.register ?? 'neutral').toBe('neutral')`. #418's lesson — scope an
  assertion to the level that froze the decision, so the level chartered to lift it needs no edit —
  held exactly as it was written to. The en-sa block was read before a line of content was written,
  and it is unchanged by this wave.
- **The contrast is two shapes of ONE row.** `āgacchatu` and `āgaccha` are both in the `āgacchatu`
  row's `forms`, and the emitted index confirms they resolve to the same destination:
  `āgacchatu → L2-M1-S03 w2` and `āgaccha → L2-M1-S03 w2`. So a learner who taps the polite form
  and a learner who taps the intimate one are told the same true thing about both, which is what
  the brief meant by "one tap destination".
- **The second-person present paradigm did NOT enter.** `gacchasi` and every other `-si` form is
  written nowhere — including on a mistake plate, where the temptation was real and was refused
  (see §33.2). `tava`, `tubhyam`, `tvām` and `te` are written nowhere. All of them, plus `mā` and
  `vā`, were verified still absent from the folded en-sa index at the end of this wave.

---

## 31. The ratchet is still at ZERO

`tools/shown-surfaces.test.ts` is **untouched**: `'en-sa': 0` still holds, and en-sa remains the
only course in the catalogue at zero — the other nine sit between 6 and 30. The dev build prints no
`shown but untaught` line for en-sa at all:

```
en-sa: 12 modules (L1-M1..M10, L2-M1..M2)
  …
  index L2-M1: 146 surfaces
  index L2-M2: 164 surfaces
```

and the next line is a `warn` about optional script lines, not a finding.

**This wave was planned around the ratchet rather than tested against it.** The two hazards were
named in the briefs and both were designed out before authoring:

1. **No new proper noun.** L2-M2 is the module that walks into this — a module about describing
   people is one sentence away from naming one. The only names either module writes are `rāmaḥ`
   (L2-M1-S02 variation) and `sītā` (L2-M2-S05, S07 variations; L2-M2-C12), and both have had real
   word rows with their own `forms` since L1-M1. Every other description is anchored on a common
   noun — `mama bhaginī`, `mama mitram`, `saḥ bālaḥ` — exactly as the brief instructed.
2. **No form invented for a variation.** #610's incident was a variation reaching for a verb shape
   no module declares. Here every hero, variation and pool token was walked against the emitted
   cumulative index before the build was trusted: **0 unresolved across 20 heroes, 60 variations and
   26 pool items.**

---

## 32. The briefs' ownership plan, and the one place it was corrected

Every ownership claim in `tools/course-briefs.ts` was checked against the **emitted index**, never
against a paradigm — the defect that corrected four L1 briefs in #610 (§23.1).

**Held, with no correction needed:**

- `āgacchati` is **not** in the L1 index. The brief says so explicitly and it is right: the
  internal-sandhi example in the course header is prose, not a taught surface. `āgacchatu` therefore
  opens the verb here rather than extending an L1 row.
- `dadātu` (L1-M3) and `kathayatu` (L1-M2) are reused with no new row; both are in the index at
  their L1 owners.
- `staḥ` is a new L2-M2 row because L1-M3's `asti` shipped with `["asti"]` alone in its `forms` —
  confirmed by reading the L1 file, not assumed. Its note points back at M3.
- `bālaḥ` is a new L2-M2 row because L1-M9's `bālā` shipped with `["bālā"]` alone — likewise
  confirmed. Its note points back at M9.
- Reused with no new row in M2: `saḥ` and `sā` (L1-M5), `mama` (inside L1-M1's `aham` row), `gṛhe`
  (inside L1-M6's `gṛham` row), `ca` (L1-M10), `bhavataḥ`/`bhavatyāḥ` (inside L1-M2's `bhavān` row).

**One brief corrected (#478's precedent, second use on this course).** The L2-M2 seam note listed
`śāntaḥ (with śāntā)`. Two further shapes of that one row are unavoidable given the module's own
other decisions, and both are now written: **`śāntau`**, because the brief's own note 2 requires the
dual adjective to agree with `mātāpitarau` (`mama mātāpitarau śāntau.`), and **`śāntam`**, because
the brief's own note 6 requires the neuter adjective to agree with `mitram` (`mama mitram śāntam.`).
The note in `tools/course-briefs.ts` now reads `śāntaḥ (with śāntā, the dual śāntau and the neuter
śāntam …)` and carries the date and the issue. This is an *extension* of a brief rather than a
contradiction of one — no claim in it was false — but it is recorded here because a `forms` list in
a brief is a promise about the index, and the index now has two entries the promise did not name.

---

## 33. Decisions that could look like bugs

**33.1 `kṛpayā` never rescues a bare command, and there is no sentence where it does.** The brief's
law is that the `-tu` ending IS the please and `kṛpayā` is emphasis on top of it. So every
`kṛpayā` sentence in the module has a `-tu` verb, every one of them has a variation in which
`kṛpayā` simply drops and the line stays polite (`L2-M1-S01` V1, `S03` V1, `S05` V1, `S07` V2), and
**two mistake plates are built on exactly this** — `kṛpayā jalam.` (S01) and `namaste. atra
kṛpayā.` (S08), both of which are `kṛpayā` asked to carry a request on its own. If the module looks
repetitive on this point, that is the design.

**33.2 The S02 mistake plate was rewritten to avoid writing a second intimate imperative.** The
obvious plate for `bhavān atra upaviśatu.` is `bhavān atra upaviśa.` — the register mixed. It was
refused: the brief says this module writes exactly ONE bare-stem imperative, `āgaccha`, and a plate
is still a surface a learner reads. The register-mixing plate is therefore made **once**, at
`L2-M1-S04`, where `āgaccha` is the taught form: `bhavān atra āgaccha.` S02's plate is now
`bhavataḥ atra upaviśatu.` — the genitive `bhavataḥ` where the nominative belongs, an error built
entirely out of L1-M2's own row. `upaviśa` is written nowhere in the course.

**33.3 `L2-M1-S09` V3 declines something, and L2-M5 has not been trespassed on.**
`dhanyavādaḥ, kintu idam pustakam na icchāmi.` is built from L1-M10's `kintu` and L1-M3's
`na icchāmi` — a plain statement that one does not want a thing. It is not the polite REFUSAL
formula, which the briefs assign to L2-M5 (`alam` + instrumental) and which is written nowhere here.
Rule 9 of L2-M1 was reworded during the pass to say so in as many words, so that the rule and its
own module's content cannot be read as contradicting each other.

**33.4 `mitram` is neuter, and that is the module's sharpest delta.** `mama mitram dīrgham.` is
"my friend is tall" of a friend of either sex, and `sītā mama mitram.` (S07 V3) is the proof. An
English speaker reads the neuter ending as a statement about the person; it is a statement about the
word. This is why `dīrgham` and `śāntam` are written at all — the neuter adjective has nothing else
in a module about people to agree with.

**33.5 The dual is taught as a PAIR and only once as a verb.** `mātāpitarau` is one token with its
internal sandhi written in full, so it is one row and one surface, and it means "and" without a word
for it. `staḥ` is the only dual verb in the module, in the level and in the course; `gacchataḥ`,
`paṭhataḥ` and `khādataḥ` are named as deferred in rule 5 and written nowhere. `L2-M2-S10` is the
one that could be mistaken for a second dual verb opening — `mama bhrātā bhaginī ca vidyālaye
staḥ.` — and it is the same `staḥ`, making the point that a pair built with `ca` and a pair welded
into a compound reach the verb identically.

**33.6 Appearance is height, age and temperament, and the line was drawn by the brief rather than
by an author.** `dīrghaḥ` (tall/long), `vṛddhaḥ` (old, of a person) and `śāntaḥ` (calm) are the
whole adjective inventory. No body adjective is written, and rule 10 says why in the module rather
than only here.

**33.7 `mātā`, `pitā` and `bhrātā` are taught as citation forms with no paradigm.** They are `-ṛ`
stems and this course has met no `-ṛ` stem before. The only oblique shape written anywhere is the
compound `mātāpitarau`, which is its own row and carries no declension lesson. Rule 7 names the
stem class rather than teaching it, which is the same technique L1-M4 used for `-si`.

**33.8 Pronunciation respellings are ASCII where a capital would be needed.** `GRI-he`,
`VRID-dhaḥ`, `GRI-ham`. A capital `Ṛ` (U+1E5A) appears nowhere in the shipped corpus and is drawn
by no bundled font cut, so writing one in a `sound` line would have added a fifth character to
`tools/font-coverage.test.ts`'s missing list. L1-M7's `GRI-he` had already set this convention; it
is now recorded rather than rediscovered.

---

## 34. Every comprehension token resolves to the RIGHT row

Twenty-six pool items, **123 tokens (64 + 59), 0 unresolved and 0 misrouted**, read out of
`public/content/en-sa/index/L2-M1.json` and `…/L2-M2.json` folded over L1's ten. The same walk over
20 hero and 60 variation displays is also clean.

The routings worth naming, because each is a place where a wrong row would have answered a tap with
the wrong gloss:

| token | lands on | why that is right |
| --- | --- | --- |
| `āgaccha` | `āgacchatu` (L2-M1-S03 w2) | the intimate imperative is a shape of the verb, not a lexeme |
| `icchati` | `icchāmi` (L1-M3-S01 w1) | M3's "want" row, whose display is the first-person shape |
| `gamiṣyāmi` | `gacchati` (L1-M2-S07 w2) | a future is a shape of its verb |
| `mahyam`, `mama` | `aham` (L1-M1-S01 w0) | M1's three-shape pronoun row |
| `bhavatī`, `bhavataḥ`, `bhavatyāḥ` | `bhavān` (L1-M2-S02 w0) | one polite-address row, four shapes |
| `dve` | `dvau` (L1-M8-S02 w0) | the numeral row carrying its genders |
| `phale` | `phale` (L1-M8-S02 w1) | M8's counted-noun row, not M1's `phalam` |
| `gṛhe` | `gṛham` (L1-M6-S04 w1) | M6's house row owns its locative |
| `vidyālaye` | `vidyālayaḥ` (L1-M6-S03 w0) | likewise |
| `chātrā` | `chātraḥ` (L1-M1-S01 w1) | one student row, two genders |
| `bālā` | `bālā` (L1-M9-S01 w2) | M9's girl — and `bālaḥ` lands on L2-M2-S08, its own new row |
| `śāntā`, `śāntaḥ` | `śāntaḥ` (L2-M2-S01 w2) | one adjective row, four shapes |
| `vṛddhaḥ` | `vṛddhaḥ` (L2-M2-S02 w1) | ditto |
| `mātā` | `mātā` (L2-M2-S01 w1) | and `mātāpitarau` lands on its OWN row (S03 w0), not on `mātā` |
| `staḥ` | `staḥ` (L2-M2-S04 w2) | the new L2 row, not L1-M3's `asti` |

---

## 35. Sanskrit that was deliberately NOT written

Every wave of this course has listed its refusals; these are this wave's. A form one is not certain
of is a form one does not write.

**Banned by the briefs and verified absent from the folded index at the end of the wave:**
`gacchasi`, `paṭhasi` and every other `-si` present · `tava` · `tubhyam` · `tvām` · `te` · `mā` ·
`vā` · `mahat` · `gacchataḥ` · `paṭhataḥ` · `khādataḥ` · every dual verb but `staḥ` · every
consonant-, `-u`- and `-i`-stem adjective · the passive as a system, of which `kṣamyatām` is one
frozen member and L2-M8's `jātam` will be the other · `abhavat` and every imperfect · the productive
`-ta` participle (`gataḥ`, `kṛtam`, `pītaḥ`) · the optative and every lakāra beyond the present, the
future and the participial past · the vocative · `-tara` and `-tama`.

**Refused by this wave on its own judgement, each because it was not certain enough to ship:**

1. **`dehi` / `dada` for "give" to a `tvam`.** The obvious S01 mistake plate was a bare second-person
   imperative of `dā`. Root `dā` is a class-3 verb whose second-person imperative is not formed the
   way `gam`'s is, and rather than write a shape whose spelling this wave could not vouch for, the
   plate was rewritten as `kṛpayā jalam.` — a request with no verb at all, which teaches the same
   law and writes no doubtful Sanskrit.
2. **`upaviśa`.** Real and regular, and still refused — see §33.2.
3. **`kathaya`.** The intimate imperative of `kathayatu`, wanted by the S07 plate and refused for
   the same reason as `upaviśa`: one bare-stem imperative in the module, no more.
4. **`svāgatam`** ("welcome"). A natural third word for a hosting module and named nowhere in the
   brief, so it stays for a later module to open deliberately.
5. **`kṣamasva` / `kṣantavyam` / `kṣamā`.** The other everyday apology shapes. `kṣamyatām` is the
   one the brief chose, taught whole; writing a second would open the passive and the gerundive at
   once.
6. **`dhanyavādāḥ`** (plural). Both are said; the brief chose the singular and this wave did not
   quietly ship both spellings of one key.
7. **`uccaḥ`** for "tall". Possibly the more idiomatic word — see question 59 — but `dīrghaḥ` is
   the brief's, is unambiguously an a-stem, and covers "long" as well.
8. **`svasā`** for "sister". The brief chose `bhaginī` and named `svasā` as the deferred one.
9. **`jyeṣṭhaḥ` / `kaniṣṭhaḥ`** (elder/younger brother). Superlative suffixes, which §7 of the
   decisions defers to a later level; a sibling here is simply `bhrātā` or `bhaginī`.
10. **`putraḥ` / `putrī` / `patnī` / `bhāryā`.** More relationship nouns than the brief's six. The
    module names nothing as complete rather than reaching for them.
11. **`janakau`** and **`pitarau`** as alternatives to `mātāpitarau` — one key per reading, and the
    brief chose the dvandva.
12. **`santi`** (third-person plural of `as`). It would have made `L2-M2-S10` easier to write and it
    is a plural, not a dual; teaching the pair correctly is the module's whole job.
13. **`adhikam`, `tataḥ`, `anantaram`** and the rest of L2's later inventory: written nowhere, so
    the keys are free for the modules that own them.
14. **A negated predicate adjective** (`mama bhrātā na dīrghaḥ` / `dīrghaḥ na asti`). Neither
    spelling was certain enough, so no sentence in either module negates an adjective; negation in
    this wave is always `na` in front of `asti`/`staḥ` or in front of a finite verb, both of which
    L1 had already taught.

---

## 36. Open questions for the fluent-speaker gate — continuing from 47

The gate is a **fluent saṃskṛta-sambhāṣaṇam speaker or a Sanskrit teacher**, and it is **UNMET**.
Questions 1–47 are still open. These nineteen are this wave's, and the first six are the ones the
briefs themselves flagged for this gate and that these two modules actually use.

48. **`kṛpayā`, and whether it stacks the way this module says it does.** The whole of L2-M1 rests
    on the claim that the `-tu` ending carries the courtesy and `kṛpayā` is optional emphasis on
    top of it. Confirm that a speaker really does say `jalam dadātu` unadorned without sounding
    brusque, and that `kṛpayā jalam dadātu` is emphasis rather than the normal form.
49. **`upaviśatu` as "please sit".** Flagged by the briefs. Confirm it is what a host actually says,
    against `upaviṣṭaḥ bhavatu` or a simple gesture, and that the prefixed `upa-` is heard.
50. **`kṣamyatām` as the everyday "sorry".** Confirm it is the ordinary spoken apology and not a
    formal or literary one, and that it covers both "excuse me" and "I'm sorry" as L2-M1-S06 and
    S10 assume. Confirm too that `kṣamyatām` alone, with no `mām` and no object, is complete.
51. **`dhanyavādaḥ` singular.** Confirm the singular is what is said, since the plural
    `dhanyavādāḥ` is also common, and confirm that thanks is said at all in the situations
    L2-M1-S05 and S09 put it in — rule 10 claims thanks and apology are less automatic here than in
    English, which is a usage claim an LLM cannot test.
52. **`āgacchatu` / `āgaccha`, and the threshold `tvam` sits at.** Confirm that a parent really says
    `āgaccha` to a child and `bhavān āgacchatu` to a stranger, and that the bare stem is the right
    single second-person form to show. This is the one register decision a learner will act on.
53. **One `informal` sentence in ten — the right dose?** A sambhāṣaṇam class may well use `tvam`
    from its first hour, in which case this module is more conservative than the speech it teaches.
    Say whether the balance is honest or whether L2 should carry more of it.
54. **The `-tu` imperative aimed at a third person.** `rāmaḥ atra upaviśatu.` (S02 V3) claims the
    same ending covers "let Rāma sit" and "please sit, sir". Confirm both readings are live, and
    that the second is not felt as a polite fiction.
55. **`bhavataḥ atra upaviśatu.`** — the S02 mistake plate. It is wrong by design, but the *reason*
    given is that the genitive cannot be the one who sits. Confirm that is the error a speaker would
    hear, rather than some other reading of the line.
56. **The host's sequence.** `namaste. kṛpayā atra upaviśatu.` (S08) and the offer that follows in
    its variation. Confirm the order and that nothing obligatory is missing between them.
57. **`mātāpitarau` in ordinary speech.** Confirm it is the everyday word for "my parents" and not a
    written-register compound, against `mātā ca pitā ca` and `pitarau`. L2-M2-S03 and S04 are built
    on it and its variation in S10 offers the `ca` form as the alternative.
58. **`staḥ`, and whether the dual verb survives in speech.** This is the sharpest question of the
    module. Confirm that a sambhāṣaṇam speaker really says `mama mātāpitarau gṛhe staḥ` rather than
    levelling to the plural `santi`, because L2-M2's rules 3, 4 and 5 all assert that they do.
59. **`dīrghaḥ` of a person's height.** Confirm it is what is said, against `uccaḥ`, and confirm the
    claim in S05's trap that one word covers "tall" of a person and "long" of a thing.
60. **`vṛddhaḥ` of one's own father.** L2-M2-S02's `usage` says it leans respectful — "elder" rather
    than "old". Confirm that, and confirm it is not rude to say of a parent to a stranger.
61. **`mitram` used of a woman.** `sītā mama mitram.` (S07 V3) is the module's proof that the
    neuter ending reports the word and not the person. Confirm a speaker really says it that way
    rather than reaching for `sakhī`, because the whole of rule 6 rests on that one line.
62. **`bhaginī` against `svasā`.** The briefs chose `bhaginī` as the everyday word. Confirm.
63. **`śāntaḥ` as "calm" of temperament.** Confirm it describes a person's character in speech and
    is not heard only as "quiet" or "at peace" in a religious sense.
64. **`bālaḥ` for a boy.** Confirm it is the ordinary spoken word for a child rather than a literary
    one, and that `bālaḥ`/`bālā` really are the pair L2-M2-S08 and L1-M9 make them.
65. **A `ca`-joined pair and the dual verb.** `mama bhrātā bhaginī ca vidyālaye staḥ.` (S10) claims
    two people joined by `ca` take `staḥ` just as a compound does. Confirm, and confirm the `ca`
    placement after the second noun is what speech uses here as it was for L1-M10's lists.
66. **Naturalness of the 26 pool turns**, as questions 12, 26 and 47 asked of the first 65. They are
    grammatical by construction and recombined from the cumulative index; an LLM cannot hear which
    of them nobody would say. `kṣamyatām, aham khinnaḥ, ataḥ na gamiṣyāmi.`,
    `mama mātā śāntā, ataḥ aham api śāntaḥ.` and `kutra bhavataḥ mitram asti?` are the three most
    worth a second opinion.

---

## 37. Verification run for this change

```
npm run content:validate                              → CONTENT 462/462 ok
                                                        (en-sa/L2-M1.json ok, en-sa/L2-M2.json ok)
npm run content:build -- --with-unverified --with-fixtures
                                                      → en-sa: 12 modules (L1-M1..M10, L2-M1..M2)
                                                          index L2-M1: 146 surfaces
                                                          index L2-M2: 164 surfaces
                                                        NO `shown but untaught` line for en-sa —
                                                        still zero, and still the only course in
                                                        the catalogue without one
npx tsc --noEmit                                      → clean
npx prettier --check .                                → All matched files use Prettier code style!
npx eslint src/course/types.test.ts tools/content-build.test.ts tools/course-briefs.ts
                                                      → clean
npx vitest run tools/course-briefs.test.ts            → 136 passed
npx vitest run src/course/types.test.ts tools/content-build.test.ts \
               tools/shown-surfaces.test.ts
                                                      → 3 files, 510 tests passed
npx vitest run                                        → 862 passed, 2 failed
                                                        (scripts/generate-splash.test.ts and
                                                        tools/font-coverage.test.ts — BOTH
                                                        pre-existing on this host, proved against a
                                                        stashed tree)
```

`scripts/verify.sh` was again deliberately NOT run: it stops at the first failing stage and would
never reach CONTENT while `scripts/generate-splash.test.ts` is red on this host, so the stages were
run individually. **`tools/font-coverage.test.ts` is the second pre-existing failure and was
measured rather than assumed** — on a stashed tree it reports the same four characters
(`U+000A`, `$`, `×`, `•`) claimed by a target, harvested from content and drawn by no bundled cut.
A draft of `L2-M2` briefly added a fifth, `Ṛ` U+1E5A, from a capitalised pronunciation respelling;
that is why §33.8 exists and why the respellings are ASCII.

### Pinned inventories updated by this change

- `src/course/types.test.ts` — `MODULE_FILES` gains `content/en-sa/modules/L2-M1.json` and
  `L2-M2.json`; the case title's count moves 460 → 462 and its wording from "en-sa's whole first
  level (#610)" to "en-sa's first level and its first two L2 rungs (#613)". The en-sa decisions case
  itself is **unchanged** — see §30.
- `tools/content-build.test.ts` — `AUTHORED` gains `L2-M1` and `L2-M2`; the three
  `en-sa: 10 modules (L1-M1..M10)` assertions become
  `en-sa: 12 modules (L1-M1..M10, L2-M1..M2)`; two case titles move from "ten" to "twelve". The
  comment above `AUTHORED` now states that **L2 keeps its own level `draft` flag**, exactly as L1
  did until #611.
- `tools/shown-surfaces.test.ts` — **untouched.** `'en-sa': 0` still holds.
- `tools/course-briefs.ts` — **one seam note corrected** (§32), the second use of #478's precedent
  on this course. `tools/course-briefs.test.ts` is untouched and passes.
- `README.md` — the review doc's new name, and the "not one rung of L2 is authored" sentence, which
  this wave made false.

`git diff --stat content/en-sa/modules/L1-M1.json … L1-M10.json` is **empty**, and so is
`git diff --stat` over the other nine courses.
