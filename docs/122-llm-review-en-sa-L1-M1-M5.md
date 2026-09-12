# en-sa L1 — LLM review (#608, #609)

Two waves, one record. **Sections 1–10 are L1-M1 · L1-M2 (#608)**; **sections 11–19 are
L1-M3 · L1-M4 · L1-M5 (#609)**, and the open questions run in one list from 1 to 26 across both.

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
