# en-sa L1-M1 · L1-M2 — LLM review (#608)

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
