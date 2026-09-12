# en-sa L1–L4 — LLM review (#608, #609, #610, #613, #614, #615, #617, #618, #619, #621)

Ten waves, one record, three complete levels AND THE FIRST TWO RUNGS OF A FOURTH. **Sections 1–10
are L1-M1 · L1-M2 (#608)**; **sections 11–19 are L1-M3 · L1-M4 · L1-M5 (#609)**; **sections 20–28
are L1-M6 … L1-M10 (#610)**, which closed Level 1; **sections 29–37 are L2-M1 · L2-M2 (#613)**,
which open Level 2 into a course that now SHIPS; **sections 38–46 are L2-M3 · L2-M4 · L2-M5
(#614)**; **sections 47–56 are L2-M6 … L2-M10 (#615)**, which closed Level 2; **sections 57–64
are L3-M1 · L3-M2 (#617)**, which open Level 3; **sections 65–72 are L3-M3 · L3-M4 · L3-M5
(#618)**; **sections 73–80 are L3-M6 … L3-M10 (#619)**, which CLOSE Level 3; and **sections 81–89
are L4-M1 · L4-M2 (#621)**, which OPEN Level 4. The open questions
run in one list from 1 to 170 across all ten, and none of them is closed — the fluent-speaker gate
of §9 is **UNMET** for every rung of all four levels. The file has been renamed once per wave that
widened its scope: it was `…-L1-M1-M2.md`,
then `…-L1.md`, then `…-L1-L2.md`, then `…-L1-L3.md`, and it is now `…-L1-L4.md`. **#619's claim
that the fourth rename was "the last one it needs" was wrong**, and the rename is cheap; the only
reference to this file anywhere in the repo is one line in `README.md`, checked again this wave.

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

---

## Wave 5 — L2-M3 · L2-M4 · L2-M5 (#614)

**Date:** 2026-09-12 · **Reviewer:** Claude Opus 5, LLM review, authorised by the repo owner ·
**Bar:** LLM review plus owner authority.

The second wave that reaches a learner: en-sa graduated at #611, so these three rungs ship on the
next deploy. The fluent-speaker gate of §9 is still **UNMET**. Sections 38–46 are written on that
understanding, nothing here claims a native or fluent reading, and no later wave may close one of
the questions in §45 by rewriting a shipped module.

---

## 38. What was authored

Three modules, the middle of Level 2's first half, authored strictly in ladder order with a rebuild
between each — M3 against L2-M2's real cumulative index (164 surfaces, folded across the twelve
files that existed), M4 against M3's (183), M5 against M4's (196).

| | L2-M3 Describing things | L2-M4 Getting around | L2-M5 Food and hosting |
| --- | --- | --- | --- |
| sentences | 10 (`S01`…`S10`) | 10 | 10 |
| variations | 30 — 3 on every sentence | 30 — 3 on every sentence | 30 — 3 on every sentence |
| comprehension items | 13 | 13 | 13 |
| rules | 10 | 10 | 10 |
| word row slots | 30 (3 per sentence), 26 distinct | 30, 20 distinct | 30, 17 distinct |
| rows that OPEN a surface here | 9 | 8 | 10 |
| surfaces this module adds | 19 | 13 | 12 |
| cumulative index | 183, maxSpan 1 | 196, maxSpan 1 | 208, maxSpan 1 |
| longest / shortest hero | 6 / 3 words | 6 / 3 words | 6 / 2 words |
| register chips | 10 `neutral` | 10 `neutral` | 10 `neutral` |

**Enrichment.** M3 is an M1–M3 module, so it ships **FULL** enrichment — `sound`, `variations`,
`mistake`, `usage`, `mnemonic` on all ten sentences, plus `literal`, `trap` and a `register` chip on
all ten. M4 and M5 are past that rule and carry enrichment where it earns its place: M4 has `sound`
on 7, `mistake` on 6, `mnemonic` on 3, `usage` and `trap` and `literal` on all 10; M5 has `sound` on
7, `mistake` on 4, `mnemonic` on 3, `trap` on 7, `usage` and `literal` on all 10. **Every sentence
in all three carries `literal`**, which in a verb-final case-marked language is not optional.
There is no `glossEn` anywhere (#405) and no module carries `fixture: true`.

`prerequisites` is the previous module in the same level: `["L2-M2"]`, `["L2-M3"]`, `["L2-M4"]`.
Bounds are the briefs' — M3 max 8, M4 and M5 max 9 — and no hero reaches either; `newWordCap` is 25
and the real spend is 19, 13 and 12. `content/en-sa/levels.json` shows all three rungs
`hasContent: true` with no `draft`; **L2 itself keeps its level `draft` flag and its `draftNote`**,
because five of its ten rungs are still empty.

**The 19 surfaces L2-M3 opens**, nine rows, every one an a-stem adjective holding its own gendered
shapes rather than spawning a row per gender: `raktaḥ` `raktam` · `nīlaḥ` `nīlam` · `navaḥ` `navā`
`navam` · `pītaḥ` `pītam` · `śvetaḥ` `śvetam` · `kṛṣṇaḥ` `kṛṣṇam` · `purāṇaḥ` `purāṇam` · `hrasvaḥ`
`hrasvam` · `uttamaḥ` `uttamam`.

**The 13 surfaces L2-M4 opens**, eight rows: `mārgaḥ` `mārgam` `mārgasya` `mārgeṇa` · `yānam`
`yānena` · `vāmataḥ` · `dakṣiṇataḥ` · `agrataḥ` · `katham` · `paśyati` `paśyatu` · `gacchatu`.

**The 12 surfaces L2-M5 opens**, ten rows: `alam` · `bhojanam` · `annam` · `dugdham` `dugdhena` ·
`svāgatam` · `punaḥ` · `khādatu` · `pibatu` · `jalena` · `bhavate` `bhavatyai`.

**Provenance.** All three files carry `verified: true` with
`verifiedBy: "Claude Opus 5 — LLM review, authorised by repo owner"` and `verifiedAt: "2026-09-12"`,
shipped in the same change as the content (CLAUDE.md's standing rule), and this document is that
change's record.

---

## 39. The brief's accusative claim was false, and the module teaches the true thing instead

This is the wave's one substantive disagreement with its own brief, and it is recorded first
because a module that had simply obeyed would have taught a learner something untrue.

L2-M3's brief note 1 said the accusative is "the only way the case is visible on a neuter noun at
all", with `nīlam pustakam icchāmi` as the example and the gloss "the adjective is doing the work
L1-M3 admitted the neuter ending could not". **It is not doing that work and it cannot.** A neuter
a-stem has ONE shape for the nominative and the accusative — `pustakam` either way — and its
agreeing adjective has one shape too: `nīlam` either way. So `nīlam pustakam` is byte-identical as
the subject and as the thing wanted, and the only evidence of which it is is the verb at the end.

What IS true, and what the module teaches:

- **Agreement is in case as well as gender** (rule 1). `navaḥ vidyālayaḥ` is the new school being
  talked about; `navam vidyālayam` is the same school as the place walked to. On a MASCULINE noun
  both words move and the case is fully visible, which is why `L2-M3-S04`'s first variation is
  `navam vidyālayam gacchāmi.` and why its mistake plate is `navaḥ vidyālayam atra asti.` — the
  noun moved and the adjective did not.
- **`-am` does two jobs** (rule 2), and this is the module's hardest minute: it is the neuter ending
  in both cases this course writes, AND it is what a masculine word takes once it becomes an object
  or a destination. `nīlam pustakam` and `navam vidyālayam` look alike and are not alike.
- **On a neuter noun the case is invisible, and the module says so** rather than pretending
  otherwise. `L2-M3-S03`'s `trap` is exactly this: "Nothing in nīlam pustakam says 'object'… icchāmi
  at the end is the whole of the evidence", and `S03`'s first variation is `nīlam pustakam atra
  asti.` — the identical two words as the subject, which is the proof.

`tools/course-briefs.ts` now carries the correction inline, marked `CORRECTED BY #614`, so the next
author reads the true version. This is the same technique #613 used on the `śāntaḥ` seam note (§32)
and #478 established: a brief is edited in place, with the issue number, rather than quietly
ignored.

---

## 40. The ratchet is still at ZERO

`tools/shown-surfaces.test.ts` is **untouched**: `'en-sa': 0` still holds and en-sa is still the
only course in the catalogue at zero. The dev build prints no `shown but untaught` line for en-sa:

```
en-sa: 15 modules (L1-M1..M10, L2-M1..M5)
  …
  index L2-M3: 183 surfaces
  index L2-M4: 196 surfaces
  index L2-M5: 208 surfaces
```

and the next line is the familiar `warn` about optional script lines, not a finding.
`npx tsx tools/check-shown.ts en-sa L2-M3` (and M4, M5) reports **no `SHOWN-BUT-UNTAUGHT` line at
all** on any of the three.

**Planned around, not tested against.** The two hazards were designed out before a display was
written:

1. **No new proper noun.** The briefs planned L2 to write none, and this wave wrote none. The only
   names in the three modules are `rāmaḥ` (`L2-M3-C13`, `L2-M4-C09`, `L2-M5-C12`), which has had a
   word row with its own `forms` since L1-M1. Everything else is anchored on a common noun.
2. **No form invented for a variation, a pool item or a plate.** Every hero, variation and pool
   token in all three modules was walked against the emitted cumulative index: **0 unresolved
   across 30 heroes, 90 variations and 39 pool items** (217 + 222 + 198 = 637 tokens).

**One variation was caught and rewritten by this check.** A first draft of `L2-M4-S09`'s third
variation was `pustakālayaḥ kutra asti? aham na jānāmi.` — the honest answer to a question about the
way, and `jānāmi` is taught by no module in this course. Its own `changed` line even said so. It was
replaced with `kim pustakālayaḥ gṛhasya purataḥ asti?`, built entirely out of surfaces the level
already owns. This is #610's incident repeating in the same shape, and the check caught it in the
same way.

---

## 41. The briefs' ownership plan, and the four places it was corrected

Every ownership claim was checked against the **emitted index**, never against a paradigm. The
folded 164-surface snapshot was read before a line of M3 was written, and re-folded before M4 and
again before M5.

**Held, with no correction needed:**

- `gacchatu` (M4) is a new row. L1-M2's `gacchati` shipped with `gacchati`, `gacchāmi`, `gamiṣyāmi`,
  `gantum`, `gatavān`, `gatavatī` and **no imperative** — confirmed in the index, not assumed. Its
  note points back at L1-M2.
- `khādatu` and `pibatu` (M5) are new rows. L1-M4's `khādati` shipped its present, future and both
  participial past shapes, and `pibati` the same, and **neither shipped an imperative**. Both notes
  point back at L1-M4.
- `jalena` (M5) is a new row. L1-M3's `jalam` shipped with `["jalam"]` alone. The row's note points
  back at M3, and the emitted index confirms the seam works the way it was meant to: `jalam`
  resolves to **L1-M3's** row and `jalena` to **L2-M5-S03's**, so the citation form keeps its
  first-teach note and the new shape gets its own.
- `bhavate` and `bhavatyai` (M5) are one new row. L1-M2's `bhavān` shipped `bhavān`, `bhavatī`,
  `bhavataḥ`, `bhavatyāḥ` and **no dative**. Note back at L1-M2.
- `dīrghaḥ` (M3) is reused with no new row — L2-M2 shipped `dīrghaḥ`, `dīrghā` and `dīrgham`, and
  M3's S09 needs only `dīrgham`, which that row already owns.
- Reused with no new row and confirmed present: `idam`, `asti`, `icchāmi`/`icchati`, `kim`, `na`,
  `kintu`, `tathāpi`, `sundaraḥ`/`sundaram`, `puṣpam`, `phalam`, `pustakam`, `gṛham`/`gṛhasya`,
  `vidyālayaḥ`/`vidyālayam`, `pustakālayaḥ`/`pustakālayam`, `chātraḥ`/`chātrā`, `bālaḥ`, `bhaginī`,
  `mātā`, `saḥ`/`sā`, `aham`/`mama`/`mahyam`, `bhavān`/`bhavataḥ`, `kutra`, `atra`, `tatra`,
  `upari`, `samīpe`, `purataḥ`, `pṛṣṭhataḥ`, `pustakasya`, `pratidinam`, `paṭhati`/`paṭhāmi`,
  `khādati`/`khādāmi`, `pibati`/`pibāmi`, `karoti`, `rocate`, `kṛpayā`, `upaviśatu`, `āgacchatu`,
  `dhanyavādaḥ`, `ām`, `rāmaḥ`.

**Four briefs corrected, all four in `tools/course-briefs.ts`, each marked with #614:**

1. **The M3 accusative claim** — false, corrected in place, §39 above.
2. **M3's "two colours written in full across the genders".** Note 3 recommended `raktaḥ` and
   `nīlaḥ` be written across all three genders. **That is not writable against this index**: every
   noun a colour can sit on in the cumulative 164 is neuter (`puṣpam`, `pustakam`, `phalam`,
   `gṛham`, `mitram`, `jalam`) or masculine (`vidyālayaḥ`, `pustakālayaḥ`); there is no feminine
   THING anywhere, and a red or blue *person* is not a sentence this module would write. And a
   `forms` list may hold only shapes the module actually writes, so an unwritable `raktā` cannot be
   smuggled in as a form either. The three-gender paradigm is carried instead by
   **`navaḥ` / `navā` / `navam`**, where `navā chātrā` is entirely natural, and the colours are
   written in the neuter with their masculine citation form heading the row. The brief now says so.
3. **M4's `-taḥ` family count.** The brief said the family is "eight strong (`ataḥ`, `kutaḥ`,
   `purataḥ`, `pṛṣṭhataḥ`, `adhaḥ`, plus M4's three, plus M10's `tataḥ`)". **`adhaḥ` is not a member**
   — it ends `-aḥ`, not `-taḥ` — so the family is SEVEN once M4 has shipped and eight when M10 adds
   `tataḥ`. M4's rule 5 counts only what is written and genuinely rhymes, and names the real hazard:
   the seven rhyme and do not mean similar things, `ataḥ` being "therefore" and `kutaḥ` "why".
4. **Two `forms` extensions, both inside rows this wave itself opens.** `mārgaḥ` gains the genitive
   **`mārgasya`** (M4), because a `-taḥ` adverb takes a genitive in front of it and `gṛhasya` cannot
   be the only noun in the course that ever supplies one — `L2-M4-S08` is `mārgasya dakṣiṇataḥ navaḥ
   vidyālayaḥ asti.` and it is what proves the construction is a construction. `dugdham` gains
   **`dugdhena`** (M5), so that `alam` governs two different nouns rather than one frozen phrase.
   Neither touches an L1 or L2-M1..M2 row; both are shapes the module writes.

---

## 42. Decisions that could look like bugs

**42.1 `L2-M5-S04` has a word row for a word its display does not contain.** The hero is
`alam jalena.` and the third row is `aham`, with `forms: []` and a note explaining that nobody is
named and nobody needs to be. This is §24.3's technique (`pṛṣṭhataḥ` seated in a sentence that does
not show it), used here for the opposite reason — to teach an ABSENCE. It adds nothing to the index,
because the row opens no surface.

**42.2 M3's colours are mostly written in the neuter, and that is the index's doing, not laziness.**
See §41.2. `raktaḥ`, `nīlaḥ`, `pītaḥ`, `śvetaḥ`, `kṛṣṇaḥ`, `hrasvaḥ` and `uttamaḥ` head their rows
as citation forms and appear in a display only where a masculine or feminine noun exists to carry
them (`śvetaḥ` on `vidyālayaḥ` at S02 V1, `purāṇaḥ` on `pustakālayaḥ` at S06 V1, `uttamaḥ` on
`chātraḥ` at C11).

**42.3 No sentence in any of the three negates an adjective.** #613 §35.14 refused
`mama bhrātā na dīrghaḥ` as a spelling it was not certain of, and this wave honours that refusal
rather than quietly reversing it: every negation here is `na` in front of a finite verb
(`saḥ pītam puṣpam na icchati.`, `mahyam idam bhojanam na rocate.`, `saḥ mārgam paśyati, tathāpi na
gacchati.`) or `na` in front of `asti`, both of which L1 already taught.

**42.4 No mistake plate writes a second-person form.** The obvious plate for `L2-M4-S10`
(`bhavān yānena gacchatu, aham mārgeṇa gacchāmi.`) was `bhavān yānena gacchasi` — the register
mixed. It was refused for exactly #613 §33.2's reason: a plate is still a surface a learner reads,
and `gacchasi` is written nowhere in this course. The shipped plate is
`bhavān yānena gacchāmi, …` — a `-mi` ending left standing after `bhavān`, an error built entirely
out of taught forms.

**42.5 `pītaḥ` is owned as a colour and the participle reading is written nowhere.** The brief's
sharpest homograph, taken as planned. `pītavān` ("drank", L1-M4) is a different key, checked against
the emitted index; the bare `pītaḥ`/`pītam` key was free and M3 now owns it as "yellow" alone. The
named fallback `haritaḥ` was NOT written, so that key stays free. M3's rule 9 states the one-meaning
rule for `pītaḥ`, `kṛṣṇaḥ` and `navaḥ` together, in English prose, without writing a second reading
of any of them.

**42.6 `dugdham` is a lexicalised `-ta` participle and is taught as a noun.** `dugdha-` is
historically the participle of "to milk", and the course's ban on the productive bare `-ta`
participle still holds: the row is glossed "milk", the participial reading is written nowhere, and
nothing in M5 suggests a pattern. The same reasoning L2-M8 will use for `jātam` — one frozen word,
named — applies here without needing to be spent, because `dugdham` is not presented as a verb form
at all.

**42.7 M5-S05 and M5-S06 are the same sentence with one word changed, on purpose.** `kim bhavate
bhojanam rocate?` against `kim bhavatyai annam rocate?` — §24.4's precedent. The dative pair
`bhavate`/`bhavatyai` is one row with two shapes, and the ONLY way to show the contrast is to put
the two sentences beside each other. Each carries the other's shape in a variation as well.

**42.8 The refusal's mistake plate is a grammatically perfect sentence.** `L2-M5-S04`'s plate is
`na jalam icchāmi.` — flawless Sanskrit built from L1-M3 alone. What is wrong with it is
pragmatic, not grammatical: it states a dislike where `alam jalena` says the glass is full enough.
The `why` says so in those terms. This is the only plate in the wave whose error is not an ending.

**42.9 `minWordsPerSentence` is 2 in M5.** `alam jalena.` is two words and is the module's headline.
§15.7 and §24.7 set the precedent of declaring the real minimum rather than padding a hero to reach
a rounder bound.

**42.10 M4 names what it will not say, in a rule.** Rule 10 states that this course has no word for
going ON FOOT, because the ordinary Sanskrit ways of saying it (`padbhyām`, `pādacāreṇa`) use shapes
this course has not opened and neither was certain enough to ship; and that the modern coinages for
a bus, a train and a car are left for the later module chartered to decide how this course handles a
word invented in the last hundred years. Rule prose is English, so the ratchet does not see it —
L1-M4's `-si` technique, third use.

**42.11 `katham` is written at the head of its question and `kutra` is not.** `katham vidyālayam
gacchāmi?` puts the question word first; `pustakālayaḥ kutra asti?` leaves `kutra` in front of the
verb where the answer `atra` would sit. Both follow the L1 modules that taught them, and M4's rule 7
says only that `katham` changes nothing else in the sentence — it makes no claim that every question
word sits in the same slot.

**42.12 Pronunciation respellings are ASCII, and the one capital diacritic used is one the corpus
already carries.** `KRISH-nam`, `GRI-he`, `PUSH-pam`, `DIIR-gham`, `MAAR-ge-na`. The only non-ASCII
capitals anywhere in en-sa are `Ḥ` (U+1E24, six occurrences before this wave) and `Ñ` (U+00D1, one),
both already covered by the generated cuts; a capital `Ṛ` U+1E5A is written nowhere, which is the
lesson of #613 §33.8 applied rather than rediscovered.

---

## 43. Every comprehension token resolves to the RIGHT row

Thirty-nine pool items across the three modules, **170 tokens (59 + 56 + 55), 0 unresolved and 0
misrouted**, read out of `public/content/en-sa/index/L2-M3.json`, `…M4.json` and `…M5.json` folded
over the twelve files below them. The same walk over 30 hero and 90 variation displays is also
clean.

The routings worth naming, because each is a place where a wrong row would have answered a tap with
the wrong gloss:

| token | lands on | why that is right |
| --- | --- | --- |
| `nīlam`, `raktam`, `śvetam`, `pītam`, `kṛṣṇam`, `purāṇam`, `hrasvam`, `uttamam` | their own M3 rows (`nīlaḥ`, `raktaḥ`, `śvetaḥ`, `pītaḥ`, `kṛṣṇaḥ`, `purāṇaḥ`, `hrasvaḥ`, `uttamaḥ`) | one adjective is one row with its shapes, never a row per gender |
| `navam`, `navā`, `navaḥ` | `navaḥ` (L2-M3-S04 w0) | the module's full three-gender paradigm, one destination |
| `uttamaḥ` (C11) | `uttamaḥ` (L2-M3-S06 w1) | the masculine citation form, reached from a pool item that is the only place it is shown |
| `sundaram` | `sundaraḥ` (L1-M9-S01 w1) | M9's adjective row, not an M3 one |
| `dīrgham` | `dīrghaḥ` (L2-M2-S05 w1) | M3 re-teaches it with `forms: []`, so the tap still lands on L2-M2's note |
| `mārgeṇa`, `mārgam`, `mārgasya` | `mārgaḥ` (L2-M4-S02 w0) | one road row, four shapes, one tap destination |
| `yānena` | `yānam` (L2-M4-S01 w0) | likewise |
| `paśyatu` | `paśyati` (L2-M4-S07 w0) | an imperative is a shape of its verb |
| `gacchatu` | `gacchatu` (L2-M4-S06 w1) | the NEW L2 row — while `gacchati` and `gacchāmi` still land on L1-M2-S07 |
| `vāmataḥ`, `dakṣiṇataḥ`, `agrataḥ` | their own M4 rows | three distinct keys; the fold merges none of the seven `-taḥ` words |
| `purataḥ`, `pṛṣṭhataḥ` | L1-M7's rows | the old members of the family keep their first-teach notes |
| `jalena` | `jalam` row at **L2-M5-S03 w1** | the new shape's own row — while bare `jalam` still lands on **L1-M3-S03 w0** |
| `khādatu`, `pibatu` | L2-M5-S02 / L2-M5-S03 | the imperative rows — while `khādati`, `khādāmi`, `pibati`, `pibāmi` still land on L1-M4 |
| `bhavate`, `bhavatyai` | `bhavate` (L2-M5-S05 w0) | the new dative row — while `bhavān`, `bhavataḥ`, `bhavatī`, `bhavatyāḥ` still land on L1-M2-S02 |
| `dugdhena`, `dugdham` | `dugdham` (L2-M5-S08 w0) | one milk row, both shapes |
| `mahyam`, `mama`, `aham` | `aham` (L1-M1-S01 w0) | M1's three-shape pronoun row, four modules on |
| `rocate` | `rocate` (L1-M1-S05 w2) | M1's liking verb, unchanged and unrepeated |
| `chātrā` | `chātraḥ` (L1-M1-S01 w1) | one student row, two genders |
| `rāmaḥ` | `rāmaḥ` (L1-M1-S02 w2) | the only proper noun the level writes, and it has a row |

---

## 44. Sanskrit that was deliberately NOT written

Every wave of this course lists its refusals; these are this wave's. A form one is not certain of is
a form one does not write.

**Banned by the briefs and RE-VERIFIED absent from the folded 208-surface index at the end of the
wave**, and absent from every hero, variation, pool and mistake display as well: `gacchasi`,
`paṭhasi`, `khādasi`, `pibasi`, `icchasi` and every other `-si` present · `tava` · `tubhyam` ·
`tvām` · `te` · `mā` · `abhavat`, `agacchat`, `akarot` and every imperfect · the productive bare
`-ta` participle (`gataḥ`, `gatam`, `kṛtam`, `naṣṭam`, `jātam`) · `gacchet`, `gacchema`, `bhavet`
and the whole optative · the vocative (`he`, `bho`) · `svasā` · `mahat` · `santi` · `vā` ·
`adhikam` · `tataḥ` · every bare-stem imperative other than L2-M1's `āgaccha`. The only two keys on
the ban-adjacent list that the index DOES hold are `pītaḥ` and `pītam`, owned by M3 in the colour
reading alone — which is the brief's own ruling and §42.5 above.

**Refused by this wave on its own judgement, each because it was not certain enough or not this
module's to spend:**

1. **`mahat`** for "big". Sanskrit's everyday word and a consonant stem outside the a-stem paradigm
   M3's whole job is. Named as deferred in M3's rule 5 and written nowhere. Size is `dīrghaḥ` /
   `hrasvaḥ` and `navaḥ` / `purāṇaḥ`.
2. **`laghuḥ` and `śuciḥ`** — the `-u` and `-i` stem adjectives, refused for the same reason and not
   even named individually, since naming two more classes would have cost a rule.
3. **`kīdṛśam`** ("what kind of?"). A fourth gendered set inside the module with the tightest cap in
   the level. M3's rule 7 names it as existing and left for a later level; `kim` in front of an
   unchanged sentence does the work.
4. **`haritaḥ`** ("green"), the brief's named fallback for `pītaḥ`. Not needed once `pītaḥ` was
   taken, and writing both would have spent a surface to no purpose. The key stays free.
5. **`raktā` and `nīlā`** — see §41.2. Not writable against this index, so not written, and
   therefore not listed in any `forms`.
6. **`hrasvaḥ` of a person's height.** `hrasva-` is short of a THING, and using it of a person
   risks a reading this wave could not vouch for, so no sentence in M3 calls anybody short. The
   height contrast in M3-S09 is between two books.
7. **`vṛddham`** outside a mistake plate. It appears once, on M3-S06's plate, precisely because
   calling a book `vṛddham` is the error the rule warns about; no hero, variation or pool item
   writes it.
8. **`padbhyām` and `pādacāreṇa`** for "on foot". A dual instrumental and a compound, and neither
   was certain enough to ship. M4's rule 10 names the gap out loud rather than papering over it.
9. **Modern vehicle words** — a bus, a train, a car. Left for the module the briefs charter to
   decide how this course handles a twentieth-century coinage. `yānam` covers every vehicle here.
10. **`jānāmi`** ("I know"). Wanted by M4-S09's third variation and written by no module, so the
    variation was rewritten — §40 above.
11. **`vāmam` / `dakṣiṇam`** as adjectives. The directions in this module are `-taḥ` adverbs only;
    opening the adjectives would have started a second system inside a module that exists to avoid
    starting one.
12. **`gaccha`, `paśya`, `khāda`, `piba`, `dehi`.** Every bare-stem imperative. #613 wrote exactly
    one (`āgaccha`) and named it as the only one; this wave adds none, in a module whose subject is
    telling somebody where to go and in a module whose subject is offering food.
13. **`mā`.** The brief singled M5 out as the one place in the level that would reach for it, and
    the ruling held: a guest is not given a prohibition. `alam` is the device and `mā` stays named
    and unwritten. M5's rule 6 says which is which.
14. **`annena`, `bhojanena`, `phalena`.** More instrumentals after `alam` than the two the module
    needs. Two is enough to show a construction; five would be a paradigm drill.
15. **`bhojyam`, `khādyam`, `pānam`, `bhaktam`, `roṭikā`, `cāyaḥ`.** More food words. M5 names three
    and claims nothing about what anybody eats — rule 10 says India is not one cuisine.
16. **`svāgatam` in any inflected shape.** It is taught as a fixed greeting, the way `namaste` is,
    and no second form of it is written.
17. **`tubhyam rocate`** and every other intimate-register version of the liking frame. The frame is
    run on `bhavate`, `bhavatyai` and `mahyam` only.
18. **`uccaḥ`** for "tall", still — question 59's alternative, still not written, since `dīrghaḥ`
    remains the brief's word and M3-S09 uses it of a book where the question does not arise.

---

## 45. Open questions for the fluent-speaker gate — continuing from 66

The gate is a **fluent saṃskṛta-sambhāṣaṇam speaker or a Sanskrit teacher**, and it is **UNMET**.
Questions 1–66 are still open. These twenty-two are this wave's.

67. **The colour inventory.** `raktaḥ`, `nīlaḥ`, `pītaḥ`, `śvetaḥ`, `kṛṣṇaḥ`. Confirm these five are
    what a sambhāṣaṇam speaker actually says for red, blue, yellow, white and black, and that none
    of them is heard as literary or as a technical term first.
68. **`pītaḥ` as a colour, with the participle in the background.** The whole homograph ruling rests
    on the claim that `pītam puṣpam` is heard as "a yellow flower" with no shadow of "a drunk
    flower". Confirm, and say whether `haritaḥ` would have been the safer word after all.
69. **`kṛṣṇaḥ` used of an ordinary black object.** `kṛṣṇam pustakam` — confirm a speaker says it
    without the name intruding, and that no everyday alternative (`kālaḥ`) is the more usual word.
70. **`navaḥ` against `nūtanaḥ` for "new".** Both are said. Confirm the brief's choice, and confirm
    that `navaḥ` of a school or a student reads as "recently arrived" rather than "young".
71. **`purāṇaḥ` of an ordinary old object.** M3's rule 8 splits `vṛddhaḥ` (person) from `purāṇaḥ`
    (thing). Confirm the split is real in speech, and that `purāṇaḥ` of a book does not sound like a
    joke about the Purāṇas. `jīrṇaḥ` is the alternative this wave did not write.
72. **`hrasvaḥ` and `dīrghaḥ` of a book's length.** They are the grammarians' terms for a short and
    a long vowel. Confirm they are also what you would say of a book, and that M3-S09 does not read
    as a pun.
73. **`uttamaḥ` as everyday praise.** Confirm it is warm ordinary praise for a meal or a student and
    not a superlative that overshoots — "best" where "very good" was meant.
74. **Attributive against predicative order.** M3's rule 4 claims `nīlam pustakam` reads as "the
    blue book" and `pustakam nīlam` as "the book is blue". Sanskrit's word order is freer than that
    and the rule says so; confirm that these two orders are nevertheless what a listener expects,
    and that neither is genuinely ambiguous in speech.
75. **The neuter accusative admission.** M3-S03's trap says the verb is the only evidence that
    `nīlam pustakam` is the thing wanted. Confirm that is how a listener actually parses it, and
    that no intonation or particle does part of the work.
76. **`yānam` as the generic vehicle.** Confirm a sambhāṣaṇam speaker uses it for whatever they
    happen to be travelling in, rather than reserving it for a cart or a chariot.
77. **`yānena` and `mārgeṇa` with a verb of going.** M4's rule 1 treats both as the case of the
    thing BY WHICH. Confirm `mārgeṇa gacchāmi` is really said for travelling ALONG a road, rather
    than needing a different construction.
78. **`vāmataḥ` and `dakṣiṇataḥ` with a genitive.** Confirm `gṛhasya vāmataḥ` is what a person
    giving directions says, and that `vāmabhāge` or a locative phrase is not the commoner form.
79. **`agrataḥ` standing alone as "straight ahead".** M4-S06 is `kṛpayā agrataḥ gacchatu.` Confirm
    that is an idiomatic direction to a driver, and not only "in front of [something]".
80. **`dakṣiṇa-` as right and as south.** M4-S05's trap says the module writes only the left-and-right
    reading. Confirm the ambiguity is live enough to be worth warning about.
81. **`katham` for "how" of a means.** Confirm `katham vidyālayam gacchāmi?` is the question a
    stranger is actually asked, and that `kena` (the instrumental of "what") is not the more
    natural one for a means.
82. **`paśyati` / `paśyatu` for pointing something out.** Confirm `kṛpayā mārgam paśyatu` is what a
    speaker says for "look at the road", rather than a verb of looking built on a different root.
83. **`gacchatu` said to a person standing in front of you.** M4's rule 8 claims the `-tu` form is
    the only command this course gives to somebody addressed as `bhavān`. Confirm a speaker really
    uses it face to face rather than only of a third party.
84. **`svāgatam` at a door.** Confirm it is what a host says as the guest arrives, and whether
    anything obligatory comes before or after it.
85. **The offer as an imperative.** M5's rule 1 is the module's whole delta: `kṛpayā phalam khādatu`
    rather than a question. Confirm that a host really commands rather than asks, and say how odd
    `kim bhavān phalam icchati?` sounds as an offer.
86. **`alam` + instrumental as a refusal.** The sharpest question of M5. Confirm `alam jalena` is
    what a guest says, that it carries no reproach, and that `alam` alone with `dhanyavādaḥ` is a
    complete and courteous decline. Confirm too that M5-S04's plate `na jalam icchāmi` really does
    land differently in somebody's house.
87. **`punaḥ` doing the work of "more".** Confirm `punaḥ annam khādatu` is how a second helping is
    offered, and that there is no separate word for "more food" that a speaker would reach for.
88. **`bhavate` and `bhavatyai` in the liking frame.** Confirm `kim bhavate bhojanam rocate?` is the
    question a host asks at the table, and that the dative of `bhavat` is what is heard there rather
    than a different address.
89. **`bhojanam`, `annam` and `dugdham`.** Confirm the three are the ordinary spoken words, that
    `annam` really does carry "cooked rice" as its everyday sense, and that `dugdham` is heard as
    "milk" with no participial shadow. Confirm too that M5's usage lines are hedged far enough:
    nothing in this module should read as a claim about how anybody eats.
90. **Naturalness of the 39 pool turns**, as questions 12, 26, 47 and 66 asked of the first 65. They
    are grammatical by construction and recombined from the cumulative index; an LLM cannot hear
    which of them nobody would say. `mama mātā uttamam bhojanam karoti.`,
    `saḥ mārgam paśyati, tathāpi na gacchati.` and
    `kṛṣṇam pustakam mama, nīlam pustakam bhavataḥ.` are the three most worth a second opinion.

---

## 46. Verification run for this change

```
npm run content:validate                              → CONTENT 465/465 ok
                                                        (en-sa/L2-M3.json ok, en-sa/L2-M4.json ok,
                                                         en-sa/L2-M5.json ok)
npm run content:build -- --with-unverified --with-fixtures
                                                      → en-sa: 15 modules (L1-M1..M10, L2-M1..M5)
                                                          index L2-M3: 183 surfaces
                                                          index L2-M4: 196 surfaces
                                                          index L2-M5: 208 surfaces
                                                        NO `shown but untaught` line for en-sa —
                                                        still zero, and still the only course in
                                                        the catalogue without one
npx tsx tools/check-shown.ts en-sa L2-M3 / L2-M4 / L2-M5
                                                      → no SHOWN-BUT-UNTAUGHT finding on any of the
                                                        three; re-teach and same-module-collision
                                                        reports only, the same class L2-M1 and
                                                        L2-M2 already ship with
npx tsc --noEmit                                      → clean
npx prettier --check .                                → All matched files use Prettier code style!
npx eslint src/course/types.test.ts tools/content-build.test.ts tools/course-briefs.ts
                                                      → clean
npx vitest run tools/course-briefs.test.ts            → 136 passed
npx vitest run src/course/types.test.ts tools/content-build.test.ts \
               tools/shown-surfaces.test.ts
                                                      → 3 files, 513 tests passed
npm run content:build && npm run fonts:build          → en-sa 15 modules (L1-M1..M10, L2-M1..M5)
                                                        FONTS 15/15 ok, strict build
npx vitest run   (after that STRICT build)            → 866 passed, 1 failed
                                                        (scripts/generate-splash.test.ts only —
                                                        pre-existing on this host)
npx vitest run tools/font-coverage.test.ts tools/shown-surfaces.test.ts
                                                      → 2 files, 29 tests passed
```

**`tools/font-coverage.test.ts` PASSES in this wave**, which is the point of running the suite after
a strict build rather than a dev one: it is red only after `--with-unverified --with-fixtures`, and
its four characters (`U+000A`, `$`, `×`, `•`) predate all en-sa work. A green run here is the
evidence that this wave added no fifth character — the failure mode #613 §33.8 recorded, when a
capitalised pronunciation respelling put `Ṛ` U+1E5A into the harvest. `scripts/generate-splash.test.ts`
is the one remaining red, measured rather than assumed and pre-existing on this container's
rasterizer.

`scripts/verify.sh` was again deliberately NOT run: it stops at the first failing stage and would
never reach CONTENT while `scripts/generate-splash.test.ts` is red on this host, so the stages were
run individually, as #610 and #613 did.

### Pinned inventories updated by this change

- `src/course/types.test.ts` — `MODULE_FILES` gains `content/en-sa/modules/L2-M3.json`, `L2-M4.json`
  and `L2-M5.json`; the case title's count moves 462 → 465 and its wording from "its first two L2
  rungs (#613)" to "its first five L2 rungs (#614)". **The en-sa decisions case itself is
  unchanged** — the intimate-set ban and the `neutral` register assertion are both already scoped to
  `L1`, and these three modules chip `neutral` on all thirty sentences in any case.
- `tools/content-build.test.ts` — `AUTHORED` gains `L2-M3`, `L2-M4` and `L2-M5`; the three
  `en-sa: 12 modules (L1-M1..M10, L2-M1..M2)` assertions become
  `en-sa: 15 modules (L1-M1..M10, L2-M1..M5)`; two case titles move from "twelve"/"first two" to
  "fifteen"/"first five"; the comment above `AUTHORED` records that L2 still keeps its own level
  `draft` flag, with five rungs left.
- `tools/shown-surfaces.test.ts` — **untouched.** `'en-sa': 0` still holds.
- `tools/course-briefs.ts` — **four seam and decision notes corrected** (§41), each marked `#614`:
  the M3 accusative claim, M3's three-gender colour recommendation, M4's `-taḥ` family count, and
  the two `forms` extensions (`mārgasya`, `dugdhena`). `tools/course-briefs.test.ts` is untouched
  and its 136 tests pass.
- `content/en-sa/levels.json` — `L2-M3`, `L2-M4` and `L2-M5` lose `draft: true` and gain
  `hasContent: true`. L2's own level `draft` and `draftNote` are untouched.
- `README.md` — the en-sa paragraph's module line, surface count and review-doc wave count, and the
  deploy section's total, which was stale at 460 from before #613 and is now 465.

`git diff --stat content/en-sa/modules/L1-M1.json … L1-M10.json content/en-sa/modules/L2-M1.json
content/en-sa/modules/L2-M2.json` is **EMPTY**, and so is `git diff --stat` over the other nine
courses. The only tracked file this wave modifies under `content/` is `content/en-sa/levels.json`;
everything else it adds is new.

---

## Wave 6 — L2-M6 · L2-M7 · L2-M8 · L2-M9 · L2-M10 (#615) — the level closes

**Date:** 2026-09-12 · **Reviewer:** Claude Opus 5, LLM review, authorised by the repo owner ·
**Bar:** LLM review plus owner authority.

The wave that **closes Level 2**. Five rungs, and with the tenth verified the level's own
`draft` flag and `draftNote` come off in the same change — unlike L1, whose level flag waited for a
separate graduation issue (#611). The fluent-speaker gate of §9 is still **UNMET**. Sections 47–55
are written on that understanding, nothing here claims a native or fluent reading, and no later wave
may close one of the questions in §54 by rewriting a shipped module.

---

## 47. What was authored

Five modules, the second half of Level 2, authored strictly in ladder order with a rebuild between
each — M6 against L2-M5's real cumulative index (208 surfaces, folded across the fifteen files that
existed), M7 against M6's (216), M8 against M7's (226), M9 against M8's (237), M10 against M9's
(243).

| | L2-M6 | L2-M7 | L2-M8 | L2-M9 | L2-M10 |
| --- | --- | --- | --- | --- | --- |
| title | Making plans together | On the phone | When something goes wrong | Comparing and choosing | Telling what happened |
| sentences | 10 | 10 | 10 | 10 | 10 accounts of 4 |
| variations | 30 — 3 each | 30 | 30 | 30 | 30 |
| comprehension items | 13 | 13 | 13 | 13 | 13 accounts of 4 |
| rules | 10 | 10 | 10 | 10 | 10 |
| word row slots | 30, 23 distinct | 30, 18 distinct | 30, 20 distinct | 30, 19 distinct | 30, 21 distinct |
| rows that OPEN a surface | 8 | 5 | 8 | 6 | 4 |
| surfaces this module adds | 8 | 10 | 11 | 6 | 4 |
| cumulative index | 216, maxSpan 1 | 226, maxSpan 1 | 237, maxSpan 1 | 243, maxSpan 1 | **247**, maxSpan 1 |
| longest / shortest HERO sentence | 5 / 1 words | 4 / 1 | 5 / 1 | 7 / 3 | 7 / 3 |
| register chips | 10 `neutral` | 10 | 10 | 10 | 10 |

For M10 the length columns are measured **per sentence inside the account**, which is what the brief
bounds: an item's `display` carries four sentences and up to 15 tokens, and no single sentence in
any hero exceeds 7 words against a bound of 10. Counting variations and pool items too, the true
inner range of each module is M6 1–6, M7 1–7, M8 1–7, M9 2–7, M10 3–8 (§52.5).

**Enrichment.** All five are past M3, so enrichment goes where it earns its place. `usage`,
`literal` and a `register` chip are on all fifty sentences. `sound` is on 8 · 7 · 6 · 7 · 6;
`mistake` on 5 in every one of the five; `mnemonic` on 3 · 2 · 2 · 2 · 3; `trap` on 6 · 9 · 8 · 8 ·
10. **Every sentence in all five carries `literal`**, which with a verb-final case-marked language,
a sequencer at the front and a participle agreeing with an unnamed speaker is not optional. There is
no `glossEn` anywhere (#405) and no module carries `fixture: true`.

`prerequisites` is the previous module in the same level: `["L2-M5"]` … `["L2-M9"]`. Bounds are the
briefs' — M6 and M7 max 9, M8–M10 max 10 — and no sentence reaches either; `newWordCap` is 25 and
the real spend is 8, 10, 11, 6 and 4. **39 surfaces across five modules**, which is less than L2-M3
spent on its own.

**The 8 surfaces L2-M6 opens**, eight rows: `kadā` · `vayam` · `saha` · `mayā` · `astu` ·
`gacchāmaḥ` · `khādāmaḥ` · `paśyāmaḥ`.

**The 10 surfaces L2-M7 opens**, five rows: `vadati` `vadāmi` `vadatu` · `śṛṇoti` `śṛṇomi` · `kaḥ`
`kā` · `dūrabhāṣaḥ` `dūrabhāṣeṇa` · `saṃdeśaḥ`.

**The 11 surfaces L2-M8 opens**, eight rows: `jātam` · `samasyā` · `sāhāyyam` · `karotu` · `jānāmi`
`jānāti` · `asvasthaḥ` `asvasthā` · `vaidyaḥ` `vaidyā` · `mām`.

**The 6 surfaces L2-M9 opens**, six rows: `phalāt` · `jalāt` · `varam` · `vā` · `adhikam` · `alpam`.

**The 4 surfaces L2-M10 opens**, four rows: `prathamam` · `tataḥ` · `anantaram` · `ante` — the
module's entire spend, which is what makes it the test of the level rather than an addition to it.

**Provenance.** All five files carry `verified: true` with
`verifiedBy: "Claude Opus 5 — LLM review, authorised by repo owner"` and `verifiedAt: "2026-09-12"`,
shipped in the same change as the content (CLAUDE.md's standing rule), and this document is that
change's record.

---

## 48. The level closes: `draft` off L2, and on L3, L4 and L5

`content/en-sa/levels.json` now shows **all ten L2 rungs `hasContent: true` with no module-level
`draft`**, and **L2's own level-wide `draft` and `draftNote` are gone**. L1's flag came off in a
separate graduation issue (#611) because the course itself was graduating at the same moment; L2 has
no such second step, and #615 is the issue that clears it. **L3, L4 and L5 keep theirs**, with all
thirty of their rungs still `hasContent: false, draft: true`:

```
L1  draft=undefined  draftNote=undefined  hasContent rungs=10  module drafts=0
L2  draft=undefined  draftNote=undefined  hasContent rungs=10  module drafts=0
L3  draft=true       draftNote=string     hasContent rungs=0   module drafts=10
L4  draft=true       draftNote=string     hasContent rungs=0   module drafts=10
L5  draft=true       draftNote=string     hasContent rungs=0   module drafts=10
```

`tools/content-build.test.ts`'s ladder case is the pin: its `drafted` predicate moves from
`level.id !== 'L1'` to `level.id !== 'L1' && level.id !== 'L2'`, so a future wave that clears L3's
flag without authoring L3 fails that test rather than shipping.

---

## 49. The ratchet is still at ZERO

`tools/shown-surfaces.test.ts` is **untouched**: `'en-sa': 0` still holds and en-sa is still the only
course in the catalogue at zero. The dev build prints **nine** `shown but untaught` lines and none of
them is en-sa's:

```
en-sa: 20 modules (L1-M1..M10, L2-M1..M10)
  …
  index L2-M6: 216 surfaces
  index L2-M7: 226 surfaces
  index L2-M8: 237 surfaces
  index L2-M9: 243 surfaces
  index L2-M10: 247 surfaces
```

and the next line is the familiar `warn` about optional script lines, not a finding.
`npx tsx tools/check-shown.ts en-sa L2-M6` (and M7, M8, M9, M10) reports **no `SHOWN-BUT-UNTAUGHT`
line at all** on any of the five.

**Planned around, not tested against**, as in every wave of this course:

1. **No new proper noun.** L2 was planned to write none and has now written none across all ten of
   its rungs. The only names in these five modules are `rāmaḥ`, `sītā` (L1-M1 rows with their own
   `forms`) and `rāma` — which appears exactly once, inside `L2-M7-S01`'s **mistake plate**, where
   it is the wrong form by design and is the one thing the ratchet is exempt from.
2. **Every token walked against the emitted index.** 0 unresolved across **50 heroes, 150 variations
   and 65 pool items — 1,615 tokens** (M6 215 · M7 211 · M8 236 · M9 228 · M10 725), and each token
   was checked for the row it lands ON and not merely for landing.

**One variation was caught and rewritten by this check**, the same defect in the same shape as #610's
and #614's. A first draft of `L2-M7-S04`'s third variation was
`kim bhavān adhunā śṛṇoti?` — "can you hear me now?", the obvious phone line — and `adhunā` is taught
by no module in this course. Its own `changed` line even admitted it. It was replaced with
`kim bhavān śṛṇoti? ām, śṛṇomi.`, built entirely out of surfaces the level already owns, and the
`changed` line now does real work (the ending swings `-ti` → `-mi` with the person).

---

## 50. The briefs' ownership plan, and the six places it was corrected

Every ownership claim was checked against the **emitted index**, never against a paradigm. The folded
208-surface snapshot was read before a line of M6 was written and re-folded before each of the four
modules after it. The seam claims that held, unchanged:

- M6: `kadā`, `vayam`, `saha` fresh; `gacchāmaḥ` ← L1-M2's `gacchati` (which ships `gacchati`,
  `gacchāmi`, `gantum`, `gatavān`, `gatavatī`, `gamiṣyāmi` and no plural); `khādāmaḥ` ← L1-M4's
  `khādati`; `paśyāmaḥ` ← L2-M4's `paśyati`; `mayā` ← L1-M1's `aham` (`aham`, `mama`, `mahyam`);
  `astu` ← L1-M3's `asti` (which ships `asti` alone). All eight verified absent before writing.
- M7: `dūrabhāṣaḥ`, `vadati`, `śṛṇoti`, `kaḥ`, `saṃdeśaḥ` all absent; `namaste`, `namaskāraḥ`,
  `dhanyavādaḥ`, `kim`, `asti`, `na`, `punaḥ`, `rāmaḥ`, `sītā` all present and reused with no new row.
- M8: `samasyā`, `sāhāyyam`, `jātam`, `jānāmi`, `asvasthaḥ`, `vaidyaḥ` fresh; `mām` ← L1-M1's `aham`;
  `karotu` ← L1-M4's `karoti` (which ships `karoti`, `karomi`, `kṛtavān`, `kṛtavatī`, `kariṣyāmi` and
  no imperative). `jātam` is its own **one-token** row, so `kim jātam?` resolves as L1-M2's `kim`
  plus this module's `jātam` — confirmed in the emitted index, `maxSpan` still 1.
- M9: `varam`, `alpam`, `vā` fresh; `phalāt` ← L1-M1's `phalam` (L1-M7 owns `phalasya`, L1-M8 owns
  `phale`/`phalāni`, and `phalāt` was free); `jalāt` ← L1-M3's `jalam` (L2-M5 owns `jalena`).
- M10: `prathamam`, `tataḥ`, `anantaram`, `ante` fresh, and nothing else opened at all.

### 50.1 The six corrections

Each is now in `tools/course-briefs.ts` inline, marked `#615`, so the next author reads the true
version — the technique #478 established and #613 and #614 used.

1. **The participial past is NOT L1-M5's.** Both M8's note 6 and M10's note 6 said "every participial
   past (L1-M4, L1-M5)". The emitted index says **L1-M5's entire delta is three keys — `hyaḥ`, `saḥ`,
   `sā` — and it owns no participle at all.** `gatavān`/`gatavatī` are **L1-M2's**; the other five
   pairs (`khādita-`, `paṭhita-`, `likhita-`, `kṛta-`, `pīta-`) are **L1-M4's**. L1-M5 is the module
   that taught the past as a JOB and reused L1-M4's rows to do it. Both notes corrected.
2. **`yataḥ` is a member of the `-taḥ` family and was left off it.** The L2 decisions §3 counted the
   family "seven strong once M4 has shipped (`ataḥ`, `kutaḥ`, `purataḥ`, `pṛṣṭhataḥ`, plus M4's
   three)", with M10's `tataḥ` making eight. `yataḥ` (L1-M9, "because") is `ya-` plus the same
   `-tas`: the family is **eight** before M10 and **nine** with `tataḥ`. This is not a counting
   nicety — `yataḥ` and `tataḥ` are the correlative pair, one letter apart, and both are legal in the
   same slot of an account, which is precisely the hazard the note exists to flag and precisely the
   member it omitted. (`prātaḥ` is NOT a member: it is `prātar` with its visarga.) Corrected in the
   decisions section and in M10's note 2, which said "five other `-taḥ` adverbs" and now says six.
3. **M10's note 4 claimed an account can be told by two people.** "The same holds for L2-M6's `vayam`
   in an account told by two people" — it does not, because **the participial past has no plural
   shape anywhere in this course's index**: `gatavantaḥ` is written nowhere and cannot be reached.
   A "we" account in the past is unwritable, not merely undesirable. Corrected, and the wave wrote
   none.
4. **M9's `adhikaḥ` and `adhikā` were planned and are NOT written** — see §52.2. The brief's note 3
   and note 5 both promised them; both now record the refusal and say the module is not evidence
   that they are safe.
5. *(the same correction, in the seam note)* M9's note 5 listed the `adhikam` row as carrying
   "`adhikaḥ` and `adhikā` in its forms". Its `forms` are `["adhikam"]`.
6. **The issue body's `sahāyatām karotu` is not what the brief says or the module writes.** #615's
   "Where & how" section names `sahāyatām karotu` for M8; `tools/course-briefs.ts` — the spec — gives
   `kṛpayā + sāhāyyam + karotu`, and that is what shipped. `sāhāyyam` is the better-attested noun and
   is what a sambhāṣaṇam speaker says; `sahāyatām` is written nowhere. Recorded here rather than in
   the brief, since the brief was already right.

### 50.2 What did NOT need correcting

M6's "at most three `-āmaḥ` shapes" (three were written), M7's ruling that `saṃdeśaḥ` carries its
anusvāra INSIDE the token legitimately (it does — `saṃskṛtam` is the precedent and no token *ends*
in `ṃ`), M8's one-token `jātam` row, M9's claim that `vā`'s key had been held free since L1-M2 (it
had), and M10's claim that L1 gives six participial verbs with their twins (it does — twelve
surfaces, six pairs).

---

## 51. The five decisions this wave had to take, and how

### 51.1 M6 — the suggestion is a question, not a mood

`kim gacchāmaḥ?` is "shall we go?" and `gacchāmaḥ` is "we are going": one form, two acts, told apart
by `kim` and the rise at the end. The optative `gacchema` is **named in rule 3 as the form a grammar
offers and this course does not write**, and it appears in exactly one place in the shipped file —
`L2-M6-S01`'s mistake plate, which the ratchet does not see. `vayam` is written in **two** displays
out of ten heroes (S02 and S09) and dropped everywhere else, with both word-row notes saying that
the bare `gacchāmaḥ` is the normal shape.

`mayā saha` is the instrumental on the person with `saha` **after** it, and rules 6 and 7 point back
at L1-M10's `ca` law rather than teaching placement a second time. `S04`'s mistake plate is
`kṛpayā saha mayā āgacchatu.` — the English order, which is the slip an English speaker actually
makes. `saha` is written only with `mayā`, because `mayā` is the only instrumental of a person the
course owns; `bhavatā` was not invented for the sake of a second example.

### 51.2 M7 — `namaste` answers the phone, and `dūrabhāṣaḥ` is admitted to be modern

The brief refused two options in writing and this module ships the third. The call opens with
`namaste` (L1-M2's row, zero new surfaces), and the honesty is paid in the vocabulary: **rule 2 says
in as many words that `dūrabhāṣaḥ` is a twentieth-century coinage of the spoken-Sanskrit movement,
not a classical word**, and rule 8 puts the same rider on `saṃdeśaḥ` ("an old word doing a modern
job"). `helo` is written nowhere.

With no vocative — rule 10 says so and says why — a caller names himself in the **nominative**:
`aham rāmaḥ vadāmi`. `rāmaḥ` is an L1-M1 row with its own `forms`, so the ratchet does not move.
`S01`'s mistake plate is the bare stem `rāma`, which is the vocative a learner will reach for, and it
is the only place in the wave where that shape appears.

### 51.3 M8 — `kim jātam?`, and `abhavat` written nowhere

`kim jātam?` is the module's opening sentence. **`abhavat` appears in exactly one place in the
shipped file — `L2-M8-S01`'s mistake plate** — and is otherwise named only in rule 2, which is
English prose the ratchet cannot see, exactly as L1-M4 named `gacchasi`. `jātam` enters as **one
frozen impersonal**, the level's second and last after L2-M1's `kṣamyatām`, and rule 3 says so in
those words.

The productive bare-`-ta` ban holds: `gataḥ`, `kṛtam` and `naṣṭam` are written in no display,
variation or pool item anywhere in the level (`naṣṭam` appears once, in `L2-M8-S03`'s plate, as the
thing the course refuses). **"My book is missing" is `mama pustakam na asti`** — L1-M3's frame —
and both rule 4 and `S03`'s `trap` say that the participle a learner wants is the one this course
keeps shut.

### 51.4 M9 — the ablative, and no word for "than"

`phalāt jalam varam`. Rule 1 gives the construction, rule 2 says there is no word for "than" and that
looking for one is the first thing an English speaker does, and rule 10 fixes the order (the ablative
first). The `literal` line on every comparison keeps it visible: `from-fruit water better`. `-tara`
and `-tama` are **named as deferred in rule 3** and plated once, at `L2-M9-S04`, whose
`adhikataram` is the form a grammar would give.

The ablative is opened on **two** nouns, `phalāt` and `jalāt`, with the rule carrying the rest —
the same technique and the same reason as M4's instrumental, and rule 4 says so.

`vā` finally spends the key L1-M2 held free, in **one reading only** ("or"); the interrogative
reading is written nowhere, which is the `api` ruling of L1-M10 made a second time. It is
**postpositive**, and rule 8 teaches it by pointing at `ca` rather than by teaching placement twice;
`S03` and `S07` both carry a plate with `vā` in the English position. `varam` is owned in one
reading, "better"; the bridegroom and the boon are written nowhere.

### 51.5 M10 — the fork happens once, and the whole account forks with it

Every hero is a **four-sentence account**, and **every one of the ten first variations is the same
account told in the other gender, whole** — never one sentence of it. Rule 2 states the law and rule
3 states it precisely: the fork is on whoever the account is **about**, which in a first-person
account is the speaker (S01, S02, S03, S06, S08, S09, S10) and in a third-person account is the
person described (S04 Rāma, S05 Sītā, S07 a sister). `L2-M8`'s ruling is restated in rule 6 and
holds: no imperfect, no bare participle.

The two defects the brief asked to be plated are both plated:

- **The mixed account** — `L2-M10-S05`'s mistake is
  `prathamam sītā pustakālayam gatavatī. tataḥ sā pustakam paṭhitavān. anantaram gṛham gatavatī. ante dugdham pītavān.`
  Two of four participles forked one way and two the other. The `why` says the account would have to
  be about two different people who are also the same person.
- **The `-taḥ` confusion** — `L2-M10-S03`'s mistake writes `ataḥ` for `tataḥ`. The `why` says the
  result is a perfectly grammatical sentence meaning something else, and that no test catches it.
  This is the plate that made correction 2 in §50.1 visible.

Pro-drop is enforced at four sentences: `aham` appears **at most once per account**, in the first
sentence or (S03, S10) in the last, and in five of the ten it is the only pronoun in fifteen words.
`L2-M10-S01`'s plate is the four-`aham` account — grammatical sentence by sentence and audibly
wrong.

---

## 52. Decisions that could look like bugs

### 52.1 M7-S07 is the one sentence in the module that is not part of a call

`mama dūrabhāṣaḥ navaḥ asti.` exists to show `dūrabhāṣaḥ` in its **naming** shape; every other
appearance is `dūrabhāṣeṇa`, the by-shape, because that is what the module is about. Small talk was
the cheapest true sentence that put the nominative on the page, and it pays a second time by running
M3's adjective agreement over a modern word.

### 52.2 `adhikaḥ` and `adhikā` were planned by the brief and are NOT written

M9's brief promised all three a-stem shapes. The module writes **`adhikam` alone**, in three readings
that are certain: in front of a neuter noun (`adhikam jalam`), in front of a verb (`adhikam
paṭhati`), and as the whole predicate of a neuter subject (`idam mūlyam adhikam`). No natural
sentence inside this level's vocabulary wanted the masculine or feminine: "my brother is taller" is
not what `adhikaḥ` means, and `adhikā samasyā` is grammatical and not something anybody says. The
standing rule — *a Sanskrit form you are not certain of is a form you do not write* — decided it,
and `L2-M9-S08`'s plate makes the neuter agreement the lesson instead. The brief is corrected.

### 52.3 M9 has no `-taḥ`-family hazard and M10 has all of it

M9 opens `phalāt` and `jalāt`, which end `-āt`; the `-taḥ` adverbs end in a visarga and are a
different shape entirely. The two cases are one letter apart in IAST and nothing in the build would
confuse them — the hazard is entirely in M10, and it is plated there.

### 52.4 M10's pool items are four-sentence accounts too

The brief asks for it and it is expensive: 13 items × 4 sentences is 725 tokens in one module, more
than three times any other. It is the right cost. A pool of one-sentence items would test the
sequencers and never test the fork, which is the module's actual lesson, and seven of the thirteen
are third-person accounts precisely so that the fork is tested away from the speaker.

### 52.5 `minWordsPerSentence` is 1 in M6, M7 and M8, 2 in M9 and 3 in M10

Measured against the true floor of each module's **inner** sentences — displays, variations and pool
items alike — not guessed: M6 1–6, M7 1–7, M8 1–7, M9 2–7, M10 3–8, against declared maxima of 9, 9,
10, 10, 10. The ones are real one-word sentences and they are the best lines in their modules:
`astu.` (M6-S07), `namaste.` (M7-S10) and `kṣamyatām.` (M8-S10) each close or open a turn on their
own. M10's floor is 3 because an account's shortest sentence is `ante gṛham gatavān.` — a sequencer,
an object and a participle is as short as an account's sentence gets. The field is declared against
the inner sentence, as L1-M10 declared it.

### 52.6 M8-S06 uses `paśyatu` of a doctor, not a verb of examining

`kṛpayā vaidyaḥ mām paśyatu.` — "please let the doctor see me". A verb meaning "examine" was not
invented; `paśyati` is L2-M4's and takes an accusative with certainty, and `mām` is the shape the
brief asked to be opened. This is the honest sentence, not the idiomatic one, and question 99 asks
about it.

### 52.7 Two rows in M8 and M10 are seated in sentences whose display does not show them

`L2-M8-S03`'s `jātam` row and `L2-M10-S06`'s `mārgaḥ` row are notes ABOUT a word that is deliberately
absent — in the first case because the participle is what the sentence refuses, in the second because
the contrast with `yānena` is the point. `L2-M5-S04` set the precedent with its `aham` row, and
`buildWordIndex` reads a row's `display` and `forms`, not the sentence around it, so nothing is
mis-seated.

### 52.8 The Devanagari was generated, not typed

Every `script` line in all five modules was produced by mapping each IAST token through a
token→Devanagari table **folded out of the fifteen already-shipped en-sa modules**, with the danda
substituted for the full stop; only the 39 genuinely new tokens were written by hand. The same tool
was then run in `--check` mode over M6–M10 and reported **0 mismatches**, which means every
Devanagari word in this wave is byte-identical to the way the same word was already written
somewhere in L1 or the first half of L2. This closes off the class of defect that a 725-token module
of hand-typed Devanagari would otherwise invite.

---

## 53. Every comprehension token resolves to the RIGHT row

Each of the **65 pool items** was walked token by token against the emitted cumulative index for its
own module, and for each token the **word row it lands on** was read out of the module and sentence
the index names — the check PRD §6.3 does not make, and the one that caught hi-mr's four wrong Why
panels (`docs/07`). **0 unresolved, 0 mis-seated.** The heroes and all 150 variations were walked the
same way with the same result.

The resolutions worth recording, because they are the ones where a token lands on a row whose
`display` is a different word:

| token | lands on | and that is right because |
| --- | --- | --- |
| `mama`, `mahyam`, `mayā`… | `mama`/`mahyam` → L1-M1 `aham`; `mayā` → **L2-M6 `mayā`**; `mām` → **L2-M8 `mām`** | L1-M1 shipped three shapes and no more, so the instrumental and the accusative are new rows with notes back — exactly as the brief planned |
| `bhavatī`, `bhavataḥ` | L1-M2 `bhavān` | one row, four shapes, since M2 |
| `bhavate`, `bhavatyai` | L2-M5 `bhavate` | the dative pair is that module's row |
| `gacchati`, `gatavān`, `gatavatī`, `gacchāmi` | L1-M2 `gacchati` | **and `gacchāmaḥ` lands on L2-M6's own row** — the plural was never in L1-M2's `forms` |
| `khāditavān/-vatī`, `paṭhitavān/-vatī`, `likhitavān/-vatī`, `kṛtavān/-vatī`, `pītavān/-vatī` | L1-M4 `khādati`, `paṭhati`, `likhati`, `karoti`, `pibati` | the five verbs whose participles L1-M4 owns; **not L1-M5**, see §50.1 |
| `vadāmi`, `vadatu` | L2-M7 `vadati` | one verb, three shapes, one tap destination |
| `śṛṇomi` | L2-M7 `śṛṇoti` | the same |
| `kā` | L2-M7 `kaḥ` | the gendered pair is one row, as `bhavān`/`bhavatī` is |
| `dūrabhāṣeṇa` | L2-M7 `dūrabhāṣaḥ` | the instrumental rides the noun's row |
| `jānāti` | L2-M8 `jānāmi` | the row's citation display is the first-person shape, as `icchāmi`'s is |
| `asvasthā`, `vaidyā` | L2-M8 `asvasthaḥ`, `vaidyaḥ` | the gendered pairs |
| `karotu` | **L2-M8 `karotu`**, not L1-M4 `karoti` | L1-M4 shipped no imperative; this is the new row the brief planned |
| `adhyāpikā` | L1-M1 `adhyāpakaḥ` | one row since M1 |
| `pustakālayam`, `vidyālayam`, `gṛhe`, `mārgeṇa`, `yānena`, `phale`… | their own L1/L2 rows | unchanged |
| `phalāt`, `jalāt` | **L2-M9 `phalāt`, `jalāt`** | the ablatives are new rows, not extensions of `phalam` and `jalam` |
| `prathamam`, `tataḥ`, `anantaram`, `ante` | L2-M10's four rows | the module's whole spend |

Two resolutions deserve a sentence each. **`gacchāmaḥ` does not land on L1-M2** — it lands on
L2-M6-S01's own row, which is the whole point of the seam rule; had the brief been wrong about
L1-M2's `forms`, the token would have resolved to a row whose note says nothing about the plural.
And **`mama` lands on the row displayed `aham`**, which is correct and looks odd in a listing: the
Why panel for `mama` opens M1's pronoun row, which is where its `forms` live.

---

## 54. Sanskrit that was deliberately NOT written

Every wave lists what it refused. This one refused a great deal, because the last five rungs of a
level are where a brief's deferrals come due.

**Re-verified absent from every display, variation, pool item, word row and `forms` list in all
twenty en-sa modules** (measured over the shipped files, not remembered):

- **The whole second-person present.** No token anywhere ends in `-si`: `gacchasi`, `paṭhasi`,
  `khādasi`, `pibasi`, `vadasi`, `icchasi`, `bhavasi`, `asi` — none. `karoṣi`, `śṛṇoṣi`, `jānāsi` —
  none.
- **The intimate set beyond L2-M1's one display.** `tava`, `tubhyam`, `tvām`, `te` — none. `tvam`
  itself appears in exactly one display in the whole course and it is L2-M1's.
- **Every imperfect and every other lakāra.** `abhavat`, `agacchat`, `akarot` — none in any display
  (`abhavat` and `akarot` appear once each, in M8-S01's and M10-S09's mistake plates). The optative
  `gacchema` — one mistake plate, M6-S01, and nowhere else.
- **The productive bare `-ta` participle.** `gataḥ`, `kṛtam`, `naṣṭam` — none in a display
  (`naṣṭam` and `gataḥ` appear once each, in M8-S03's and M10-S10's plates). `jātam` is the one
  frozen member, and `kṣamyatām` the other frozen form of the level.
- **The vocative.** No bare-stem name anywhere; `rāma` appears once, in M7-S01's plate.
- **Every bare-stem imperative except L2-M1's `āgaccha`.** `gaccha`, `paṭha`, `likha`, `khāda`,
  `piba`, `vada`, `kuru`, `dehi`, `upaviśa` — none. The check enumerated them and found only
  `āgaccha`.
- **`svasā`, `mahat`, `santi`, `mā`, `asmi`** — none.
- Mechanically: **no token ends in `ṃ`**, **no token carries an avagraha or a hyphen**, and **every
  string in all five files is NFC**.

**Refused in this wave specifically, beyond the standing bans:**

1. **`gacchema` and the optative** (M6). Named in rule 3 and plated once. The suggestion is the
   question.
2. **`bhavatā`** (M6). `saha` would read better with two examples, and the instrumental of `bhavat`
   is a surface nothing in the course owns. `saha` is written with `mayā` alone and the rule says
   the pattern generalises.
3. **A clock** (M6). Hours and minutes need a numeral system beside a new person-ending; the plan is
   settled on `prātaḥ` and `sāyam`, and rule 5 says so out loud.
4. **`helo`, and any invented classical telephone formula** (M7). Both refused in the brief and both
   written nowhere.
5. **`adhunā`** (M7). "Can you hear me NOW?" is the natural line and the word is taught by no module;
   the variation was rewritten (§49).
6. **`āgatavān`** (M8, M10). "The doctor came" wants it and L1-M2's row ships `gatavān` only. Every
   account uses `gatavān`.
7. **`sahāyatām`** (M8). The issue body's phrasing; `sāhāyyam` is the brief's and the better-attested
   noun, and `sahāyatām` is written nowhere (§50.1, correction 6).
8. **`kālaḥ`, `-tara`, `-tama`, `adhikaḥ`, `adhikā`** (M9). The comparative suffixes are named as
   deferred and plated; the two adjective shapes are refused for the reason in §52.2.
9. **`dugdhāt`, `pustakāt`, and every ablative but two** (M9). The case is opened on `phalāt` and
   `jalāt` and the rule carries the rest; a pool item that wanted `dugdhāt` was rewritten.
10. **The plural participial past** (M10). `gatavantaḥ` and its kin are written nowhere, which is why
    no account in this module is told by two people — and why the brief's note 4 was corrected.
11. **`dṛṣṭavān`** (M10, M8). "Saw" in the past tense; L2-M4's `paśyati` ships `paśyati` and
    `paśyatu` and no participle. No account contains a verb of seeing.
12. **`pustake`, `dve pustake`** (M10). A dual noun outside L1-M8's counted rows; a pool draft that
    reached for it was rewritten.

---

## 55. Open questions for the fluent-speaker gate — continuing from 90

The gate is a **fluent saṃskṛta-sambhāṣaṇam speaker or a Sanskrit teacher**, and it is **UNMET**.
Questions 1–90 are still open. These twenty-two are this wave's, and they close the level's list.

91. **`gacchāmaḥ` as "shall we go?".** The module's whole first decision. Confirm that a plain
    first-person plural present with `kim` in front of it is how a speaker proposes something, and
    say how odd `gacchema` would actually sound in that slot.
92. **`vayam` frequency.** The module writes it in two heroes out of ten and drops it everywhere
    else. Confirm that is roughly the real rate, and that a `vayam` in every sentence is as audible
    a tell as an `aham` in every sentence.
93. **`mayā saha` for "with me".** Confirm the instrumental-plus-postpositive is what is said, that
    `saha mayā` really is wrong rather than merely marked, and whether `saha` is ever dropped
    altogether (bare `mayā`) in speech.
94. **`astu` as "agreed".** Confirm it closes a plan, that it is not heard as grudging, and whether
    `ām` or `astu` is the commoner reply to a proposal.
95. **`kadā` with no clock.** Confirm that `prātaḥ`/`sāyam` is how a time is actually settled at this
    level of the language, and that a learner will not sound evasive for lacking hours.
96. **`namaste` on the telephone.** The module's largest bet. Confirm a sambhāṣaṇam speaker really
    answers a phone with it, and say what — if anything — they say instead.
97. **`dūrabhāṣaḥ` and `saṃdeśaḥ`.** Confirm both are the words in use, confirm the provenance rule 2
    states (a twentieth-century coinage of the spoken-Sanskrit movement), and say whether `bhāṣ-`
    compounds have a commoner rival.
98. **`aham rāmaḥ vadāmi` as "Rāma speaking".** Confirm the nominative is what a caller uses, and
    that the absence of any word for "this is" does not leave the line abrupt.
99. **`kaḥ bhavān?` asked on a phone.** Confirm it is not rude, and that a speaker would not soften
    it. Confirm too the pair `kaḥ`/`kā` is the everyday one rather than a more polite alternative.
100. **`śṛṇoti` with no object.** `kim bhavān śṛṇoti?` has no "me" in it. Confirm that is what is
     said on a bad line rather than an accusative being expected.
101. **`kim jātam?` for "what happened?".** The other large bet. Confirm it is the everyday question
     and that a listener does not hear a missing verb, and say how far `kim abhavat?` would sound
     bookish rather than wrong.
102. **`jātam` as a frozen impersonal.** Confirm that teaching it whole, with the rest of the `-ta`
     family shut, leaves a learner with a usable phrase and no false generalisation.
103. **`mama pustakam na asti` for "my book is missing".** Confirm that is how a loss is reported and
     that `naṣṭam` is not simply the ordinary word a speaker would use.
104. **`sāhāyyam karotu`.** Confirm the noun and the construction, confirm `mama sāhāyyam karotu` is
     the way to attach the person, and say whether `sahāyatām` — the issue's phrasing — is heard at
     all.
105. **`asvasthaḥ` / `asvasthā`.** Confirm this is the everyday word for feeling unwell rather than a
     clinical one, and that `aham asvasthaḥ` with no verb is complete.
106. **`vaidyaḥ mām paśyatu`.** Confirm "let the doctor see me" is said with `paś-`, or name the verb
     a speaker would use for being examined (§52.6).
107. **The ablative of comparison.** `phalāt jalam varam`. Confirm the order, confirm there is
     genuinely no "than", and say whether a speaker would more often reach for `-tara` in ordinary
     talk than this module's brief assumes.
108. **`varam` as "better".** Confirm it is indeclinable in use, that it is not heard as "boon" or
     "bridegroom" in these sentences, and whether `śreyaḥ` is the commoner word.
109. **`adhikam` in its three readings.** More of a noun, more of a verb's doing, and the whole
     predicate of `mūlyam`. Confirm all three, and say whether `adhikaḥ`/`adhikā` were right to
     refuse (§52.2).
110. **`alpam` as a polite acceptance.** Confirm `alpam jalam` is what a guest says for "just a
     little", and that it is not heard as the refusal `alam`.
111. **`vā` as "or".** Confirm the postpositive placement is as fixed as `ca`'s, and that the
     interrogative reading L1-M2 named does not intrude when `vā` closes a list.
112. **The four sequencers, and the whole-account fork.** Confirm `prathamam`, `tataḥ`, `anantaram`
     and `ante` are what an account actually uses and in that order; confirm a four-participle
     account with one fork is how a speaker tells a day; and say how a mixed account would land on a
     listener — whether as a slip, as nonsense, or as unnoticed.
113. **Naturalness of the 65 pool accounts and turns**, as questions 12, 26, 47, 66 and 90 asked of
     the first 104. They are grammatical by construction and recombined from the cumulative index;
     an LLM cannot hear which of them nobody would say. `mama mitram mayā saha āgacchatu.`,
     `sītā rāmaḥ vā atra asti.` and
     `prathamam mama mātā annam kṛtavatī. tataḥ sā jalam pītavatī. anantaram pustakam paṭhitavatī. ante sā santuṣṭā.`
     are the three most worth a second opinion.

---

## 56. Verification run for this change

```
npm run content:validate                              → CONTENT 470/470 ok
                                                        (en-sa/L2-M6.json ok, L2-M7.json ok,
                                                         L2-M8.json ok, L2-M9.json ok,
                                                         L2-M10.json ok)
npm run content:build -- --with-unverified --with-fixtures
                                                      → en-sa: 20 modules (L1-M1..M10, L2-M1..M10)
                                                          index L2-M6: 216 surfaces
                                                          index L2-M7: 226 surfaces
                                                          index L2-M8: 237 surfaces
                                                          index L2-M9: 243 surfaces
                                                          index L2-M10: 247 surfaces
                                                        NINE `shown but untaught` lines in the whole
                                                        build and NONE of them en-sa's — still zero,
                                                        and still the only course in the catalogue
                                                        without one
npx tsx tools/check-shown.ts en-sa L2-M6 / M7 / M8 / M9 / M10
                                                      → no SHOWN-BUT-UNTAUGHT finding on any of the
                                                        five
npx tsc --noEmit                                      → clean
npx prettier --check .                                → All matched files use Prettier code style!
npx eslint src/course/types.test.ts tools/content-build.test.ts tools/course-briefs.ts
                                                      → clean
npx vitest run src/course/types.test.ts tools/content-build.test.ts \
               tools/shown-surfaces.test.ts tools/course-briefs.test.ts
                                                      → 4 files, 654 tests passed
npm run content:build && npm run fonts:build          → en-sa: 20 modules (L1-M1..M10, L2-M1..M10)
                                                        strict; FONTS ok
npx vitest run   (after that STRICT build)            → see below
npx vitest run tools/font-coverage.test.ts tools/shown-surfaces.test.ts
                                                      → passed after the STRICT build
```

**`tools/font-coverage.test.ts` PASSES after the strict build**, which is why the suite is run in
that order: it is red only after `--with-unverified --with-fixtures`, and its four characters
(`U+000A`, `$`, `×`, `•`) predate all en-sa work. A green run here is the evidence that this wave
added no fifth character — the failure mode #613 §33.8 recorded, when a capitalised pronunciation
respelling put `Ṛ` U+1E5A into the harvest. Every `sound` line in these five modules is
**ASCII-only**. `scripts/generate-splash.test.ts` is the one remaining red, measured rather than
assumed and pre-existing on this container's rasterizer.

`scripts/verify.sh` was again deliberately NOT run: it stops at the first failing stage and would
never reach CONTENT while `scripts/generate-splash.test.ts` is red on this host, so the stages were
run individually, as #610, #613 and #614 did.

### Pinned inventories updated by this change

- `src/course/types.test.ts` — `MODULE_FILES` gains `content/en-sa/modules/L2-M6.json` … `L2-M10.json`
  (with `L2-M10.json` sorting between `L2-M1.json` and `L2-M2.json`, as `L1-M10.json` does); the case
  title's count moves 465 → 470 and its wording from "its first five L2 rungs (#614)" to "its first
  TWO complete levels (#615)". **The en-sa decisions case itself is unchanged** — the intimate-set
  ban and the `neutral` register assertion are both scoped to `L1`, and these five modules chip
  `neutral` on all fifty sentences.
- `tools/content-build.test.ts` — `AUTHORED` gains `L2-M6` … `L2-M10`; the three
  `en-sa: 15 modules (L1-M1..M10, L2-M1..M5)` assertions become
  `en-sa: 20 modules (L1-M1..M10, L2-M1..M10)`; the ladder case's `drafted` predicate becomes
  `level.id !== 'L1' && level.id !== 'L2'` and three case titles move to "both of its complete
  levels", "twenty modules and twenty indexes" and "L1 and L2 out of draft"; the comment above
  `AUTHORED` records that #615 closed L2 and that L3–L5 keep their flags.
- `tools/shown-surfaces.test.ts` — **untouched.** `'en-sa': 0` still holds.
- `tools/course-briefs.ts` — **six seam and decision notes corrected** (§50.1), each marked `#615`:
  the participial-past ownership in M8 and M10, the `-taḥ` family count in the decisions section and
  in M10's note 2, M10's unwritable two-person account, and M9's `adhikaḥ`/`adhikā` in both its
  note 3 and its seam note. `tools/course-briefs.test.ts` is untouched and its tests pass.
- `content/en-sa/levels.json` — `L2-M6` … `L2-M10` lose `draft: true` and gain `hasContent: true`,
  **and L2's own level `draft` and `draftNote` are removed**. L3, L4 and L5 are untouched.
- `README.md` — the en-sa paragraph's level and module counts, the surface count, the review-doc
  wave and section counts, and the deploy section's total (465 → 470).

`git diff --stat content/en-sa/modules/L1-M1.json … L1-M10.json content/en-sa/modules/L2-M1.json …
L2-M5.json` is **EMPTY**, and so is `git diff --stat` over the other nine courses. The only tracked
file this wave modifies under `content/` is `content/en-sa/levels.json`; everything else it adds is
new.

---

## Wave 7 — L3-M1 · L3-M2 (#617) — Level 3 opens

**Date:** 2026-09-12 · **Reviewer:** Claude Opus 5, LLM review, authorised by the repo owner ·
**Bar:** LLM review plus owner authority. The fluent-speaker gate of §9 is still **UNMET**.

---

## 57. What was authored

Two modules, the first two rungs of Level 3, authored strictly in ladder order with a rebuild
between them — M1 against L2-M10's real cumulative index (247 surfaces, folded across all twenty
emitted delta files), M2 against M1's (254).

| | L3-M1 Your day, in detail | L3-M2 Work and study |
| --- | --- | --- |
| sentences | 10 (`L3-M1-S01`…`S10`) | 10 (`L3-M2-S01`…`S10`) |
| variations | 30 — 3 on every sentence | 30 — 3 on every sentence |
| comprehension items | 13 | 13 |
| rules | 10 | 10 |
| word rows shown | 60 instances, 34 distinct | 64 instances, 39 distinct |
| surfaces this module adds | 7 | 8 |
| cumulative index | 254, maxSpan 1 | 262, maxSpan 1 |

**The seven surfaces M1 adds are the seven absolutives and nothing else** — `gatvā`, `pītvā`,
`khāditvā`, `kṛtvā`, `paṭhitvā`, `likhitvā` and `āgatya` — which is the brief's "the module's
entire new-word spend is the absolutives", executed literally. No new adverb of frequency, no new
sequencer, no new noun, no new time word. `punaḥ punaḥ` was refused, as the brief required, and
with it the course's first two-token surface.

**The eight surfaces M2 adds are the relative–correlative set plus two nouns** — `yaḥ` (one row,
holding `yā`, `yat` and `yam` in its `forms`), `tat`, `tam`, `kāryam` and `adhyayanam`.

Both ship the full M1–M3 enrichment — `sound`, `variations`, `mistake`, `usage`, `mnemonic` on
every one of the twenty sentences — plus `literal` and `trap` on all twenty, and
`register: "neutral"` throughout. There is no `glossEn` anywhere. Neither module carries
`fixture: true`.

`prerequisites` is `[]` for L3-M1 (the seal rule carries the cross-level dependency) and
`["L3-M1"]` for L3-M2. `content/en-sa/levels.json` shows both rungs `hasContent: true` with no
`draft`; **L3 itself keeps its level `draft` flag**, because that clears only when all ten rungs
are authored and eight are still empty — exactly as L1's did until #611.

**Provenance.** Both files carry `verified: true` with
`verifiedBy: "Claude Opus 5 — LLM review, authorised by repo owner"` and `verifiedAt: "2026-09-12"`,
shipped in the same change as the content, and this document is that change's record.

---

## 58. The ratchet is still at ZERO — and L3 never had a proper noun to spend

`npm run content:build -- --with-unverified --with-fixtures` prints **nine `shown but untaught`
lines in the whole build and none of them en-sa's**. `tools/shown-surfaces.test.ts` is untouched:
`'en-sa': 0` still holds across twenty-two rungs, and en-sa is still the only course in the
catalogue at zero.

Two things kept it there rather than luck.

1. **Every display, variation and pool item was written out of the folded index before it was
   written into a file.** `paśyāmi` is the one that nearly cost something: `paśyati` is L2-M4's
   and `paśyāmaḥ` is L2-M6's, but **the first-person singular `paśyāmi` is in NO en-sa module**, so
   a draft pool item reading `aham vidyālayam gatvā mitram paśyāmi` would have raised the count by
   one. It was rewritten to `ante aham gṛham āgatya santuṣṭaḥ`. A paradigm would have said the form
   exists; the emitted index says the course has never written it.
2. **The two proper nouns this wave uses are the two the course already owns.** `sītā` and `rāmaḥ`
   have word rows from L1-M1, so `sītā prātaḥ jalam pītvā saṃskṛtam paṭhati` and
   `rāmaḥ annam khāditvā pustakālayam gacchati` resolve rather than ride unindexed. No third name
   was introduced, in either module.

`npx tsx tools/check-shown.ts en-sa L3-M1` and `… L3-M2` each report **no SHOWN-BUT-UNTAUGHT
finding**. Both report RE-TEACH and COLLIDES lines (48 and 48 RE-TEACH respectively), which is the
ordinary shape of a module that re-teaches lower-level words inside its own sentences — L2-M1
reports eighteen of the same kind — and which the tool's own header calls information rather than a
verdict.

**`maxSpan` is 1 on every one of the twenty-two emitted en-sa index files**, checked by reading
them rather than assumed. No hyphen, no avagraha and no multi-token surface was written, and no
draft of either module ever wanted one.

---

## 59. The briefs' ownership plan, and the one place it was corrected

**This is the first en-sa wave in which every ownership claim in the two module briefs held.**
Seventeen briefs have been corrected on this course across six waves for exactly this defect, so
each claim was grepped against the folded snapshot again rather than trusted:

| brief claim | emitted index says |
| --- | --- |
| `gatvā` ← L1-M2's `gacchati` | `gacchati`/`gacchāmi` → `L1-M2-S07` w2 — holds |
| `khāditvā`, `pītvā`, `kṛtvā`, `paṭhitvā`, `likhitvā` ← L1-M4 | all five presents → `L1-M4` — holds |
| `āgatya` ← L2-M1's `āgacchatu` | `āgacchatu`/`āgaccha` → `L2-M1-S03` w2 — holds |
| sequencers are L2-M10's | `prathamam`, `tataḥ`, `anantaram`, `ante` → `L2-M10` — holds |
| time words are L1-M4's | `adya`, `prātaḥ`, `sāyam`, `pratidinam` → `L1-M4` — holds |
| **`adhyāpakam` is L1-M3's and `chātram` is NOT in the index** | `adhyāpakam` → `L1-M3-S08` w1; `chātram` absent — **holds, and this is the correction #616 made to its own first draft; it was right to make it** |
| `tat` and `tam` are unwritten and are L3-M2's to open | neither key in the folded 247 — holds |
| `saḥ`/`sā` are L1-M5's and shipped nothing else | `saḥ` → `L1-M5-S03`, `sā` → `L1-M5-S04` — holds |
| `jānāti`/`jānāmi` are L2-M8's | → `L2-M8-S05` w0 — holds |
| `uttamam` is L2-M3's | → `L2-M3-S06` w1 — holds |
| `yānena`, `mārgeṇa`, `katham` are L2-M4's | → `L2-M4-S01`, `-S02`, `-S03` — holds |

**The one correction, and it is a brief-against-brief contradiction rather than a brief-against-index
one.** `tools/course-briefs.ts` §10 of the en-sa L3 decisions said the relative–correlative set
opens "in the nominative and accusative of three genders". M2's own seam note 6 plans **four**
relative shapes — `yaḥ`, `yā`, `yat`, `yam` — and §1's worked example uses those four. Three genders
in two cases would additionally require the feminine accusative `yām` and its correlative `tām`,
which **no brief in the level plans, no example uses, and no module opens**. Left standing, §10 is
exactly the "example that contradicts its own rule" the briefs' header rule 1 forbids, and it would
have invited a later wave to write a shape with no owner. §10 now states the four shapes, names the
neuter as serving both cases at once, and says in terms that `yām` and `tām` are opened nowhere in
the level, marked `#617`. `tools/course-briefs.test.ts` is untouched and its 148 tests pass.

---

## 60. Decisions that could look like bugs

**60.1 `prerequisites: []` on L3-M1.** The same shape L1-M1 and L2-M1 carry. Prerequisites live
within a level; the cross-level dependency is the seal rule, not a list entry.

**60.2 Word rows carry no `script`.** A first draft of L3-M1 put the Devanagari on every word row as
well, and the build's own warning line caught it — `10 of 123 romanized surfaces carry no script
line`, against the 35-of-88 shape every shipped en-sa module has. `docs/121` §9.1 seats the quiet
line on sentences, distinct variations and pool items and deliberately keeps it off word rows and
mistake plates. The rows were stripped; the warning is now `70 of 123` and `74 of 127`, which is ten
mistake plates plus the word rows, exactly as L1 and L2 read.

**60.3 `absolutive` is listed in `allowedTenses`.** It is not a tense — that is the point of the
module — but `allowedTenses` is free text in the schema and the honest entry is the one that names
what the sentences contain. The rules say four times over that the form has no tense of its own.

**60.4 The mistake plates never write a refused form.** The natural plate for L3-M1-S10
(`bhavatī gṛham āgatya kim karoti?`) is the second-person `karosi`, which is exactly the error an
English speaker makes. §10 of the decisions says every `-si` present is "written in no display", and
`mistake.display` is a field called `display`; rather than argue the ambiguity, the plate was built
out of two finite verbs instead (`bhavatī gṛham āgacchati kim karoti?`). **Not one refused form
appears anywhere in either module, plates included** — see §62.

**60.5 `kāryam karoti` and `adhyayanam karoti` are noun-plus-verb, and the module says so.** There
is no single verb for "to work" or "to study" in this course, and L3-M2-S09's `trap` says that in
so many words rather than letting a learner assume one is being withheld.

**60.6 `tat uttamam` has no `asti` and needs none.** Rule 7 covers it: a correlative and an
adjective are a complete main clause, which is L1-M1's nominal sentence at work. Three of the ten
M2 heroes end verbless, and two variations add `asti` **only** so that `na` has something to sit on
(`saḥ mama pitā na asti`), which is the shape L2-M8 already shipped for `mama pustakam na asti`.

**60.7 `yat` appears as a nominative in S03 and as an accusative in S08, and looks identical.** That
is the neuter, and it is why the masculine `yam … tam` needed its own hero (S04): the pair's case
rule is invisible in the neuter and visible in the masculine. S08's `trap` says this.

**60.8 `uttamam` is never used adverbially.** A draft pool item read
`sā uttamam likhati` for "she writes it well" — a real classical construction, and one this course
has never taught, since L2-M3 owns `uttamam` as an attributive adjective only. It was replaced with
`yā chātrā saṃskṛtam likhati sā mama bhaginī`.

---

## 61. Every comprehension token resolves to the RIGHT row

All 26 pool items were walked token by token against the folded emitted index, and the word row each
token lands on was read out of `public/content/en-sa/index/`. Every one lands where it should. The
rows worth naming, because they are the ones a reviewer would want to see:

**L3-M1 (13 items).** Every absolutive lands on its own new L3-M1 row and on no earlier one:
`khāditvā` → `L3-M1-S07` w3 (C01, C03, C07, C12), `āgatya` → `L3-M1-S02` w2 (C02, C08, C10),
`gatvā` → `L3-M1-S03` w2 (C04, C05), `kṛtvā` → `L3-M1-S06` w4 (C06), `pītvā` → `L3-M1-S01` w3
(C09, C11), `likhitvā` → `L3-M1-S08` w2 (C13). The re-used tokens land on their first-teach rows:
`mama`, `mahyam` and `aham` all on **L1-M1's `aham` row** (its `forms` hold them, as they have since
M1); `paṭhitavān` on **L1-M4's `paṭhati` row**, not on a participle row of its own; `vidyālayam` on
L1-M6's `vidyālayaḥ`; `pustakālayam` on L1-M7's `pustakālayaḥ`; `santuṣṭā` on L1-M9's `santuṣṭaḥ`;
`śṛṇomi` on L2-M7's `śṛṇoti`; `sītā` and `rāmaḥ` on their own L1-M1 rows.

**L3-M2 (13 items).** `yaḥ`, `yā`, `yat` and `yam` all land on the **single `yaḥ` row**
(`L3-M2-S01` w0) — one pronoun, one row, one tap destination, which is what note 6 asked for.
`tat` → `L3-M2-S03` w4 and `tam` → `L3-M2-S04` w4, each its own row. `kāryam` → `L3-M2-S03` w1,
`adhyayanam` → `L3-M2-S06` w1. `gatvā` in C05 and C12 lands on **L3-M1's row**, which is the seam
working: M2 re-uses M1's word and opens nothing. `kṛtavān` lands on L1-M4's `karoti`;
`adhyāpikā` on L1-M1's `adhyāpakaḥ`; `adhyāpakam` on **L1-M3's own accusative row**, which is the
row #616 corrected its draft to use; `dīrgham` on L2-M2's `dīrghaḥ`; `mārgeṇa` on L2-M4's `mārgaḥ`.

No token in either pool resolves to a row that teaches a different word, and no pool item is
case-insensitively equal to a hero.

---

## 62. Sanskrit that was deliberately NOT written

**Re-verified absent by scanning every `display`, every `forms` entry and every `script` line of
both modules, mistake plates included** — not assumed from the drafting:

- **Every `-si` present.** `gacchasi`, `paṭhasi`, `khādasi`, `pibasi`, `likhasi`, `karosi`,
  `jānāsi`, `icchasi`, `vadasi` — none of them, and no token in either module ends in `-si` at all.
  L3-M2 is the module that wants one most (a relative clause about "the work that YOU do"), and
  §60.4 and rule-prose in M2's S03 variation 1 show the register answering it instead:
  `yat kāryam bhavān karoti tat uttamam`.
- **`tava`, `tubhyam`, `tvām`, `te`** — absent. **`tvam`** — absent; it is still at exactly one
  display in the whole course, L2-M1's, confirmed by a scan of all twenty-two files.
- **Every optative.** No `-et`, no `gaccheyam`, no `gacchema`, no `kuryāt`. That mood is L3-M4's
  charter and this wave did not let it drift in early; no token in either module ends in `-et`,
  `-eyam` or `-ema`.
- **Every imperfect,** `abhavat` included.
- **The productive bare `-ta` participle** — no `gataḥ`, no `kṛtam`, no `naṣṭam`. `jātam` (L2-M8)
  is still the one frozen member and this wave did not reach for it.
- **Every bare-stem imperative but L2-M1's `āgaccha`** — none written.
- **The vocative** — none. **`svasā`, `mahat`, `asmi`** — none. **The plural participial past**
  (`gatavantaḥ`) — none.
- **`yat` in the "because" and complementiser readings.** Written nowhere, in no display, no
  variation, no pool item and no plate. M2's rule 6 names both readings in English prose and rule 7
  points the learner at L1-M9's `yataḥ`, which is a distinct index key.
- **`yām` and `tām`** — the feminine accusative of the pair, refused for the reason §59 gives, and
  the reason §10 of the briefs now states.
- **`punaḥ punaḥ`** — refused, as M1's brief required, to keep `maxSpan` at 1.

Forms avoided for the separate reason that **a form you are not certain of is a form you do not
write**:

- **`paśyāmi`.** Not in the index (§58) and not written here; the sentence was rebuilt rather than
  the form assumed from `paśyati`.
- **A negated absolutive.** "Without eating" wants something like `abhuktvā` or a `na` in front of
  an absolutive, and this wave is not certain which a speaker uses. No sentence negates an
  absolutive; every `na` in both modules sits on a finite verb, which is what rule 3 of M1's set and
  the variations actually teach.
- **`śrutavatī`.** A past of `śṛṇoti` was wanted for L3-M1-S06's first variation and is not in the
  index; the variation was rebuilt on `pītavatī` instead.
- **`saṃdeśam`.** The accusative of L2-M7's `saṃdeśaḥ` is not in the index, so "having written a
  message" was dropped and S08 writes `saṃskṛtam likhitvā`.
- **`uttamā`.** The feminine of L2-M3's adjective is not in the index; L3-M2-S07's feminine
  variation predicates `santuṣṭā` (L1-M9) instead.
- **`chātram`.** Not in the index — the shape #616 corrected itself about — and not reintroduced.

---

## 63. Open questions for the fluent-speaker gate — continuing from 113

The gate is a **fluent saṃskṛta-sambhāṣaṇam speaker or a Sanskrit teacher**, and it is **UNMET**.
Questions 1–113 are still open. These fourteen are this wave's.

114. **The absolutive as the ordinary way to tell a day.** The module's whole premise. Confirm that
     a speaker really strings a habitual morning onto one finite verb, and say how many absolutives
     before one verb starts to sound written rather than spoken — L3-M1-S09 uses two.
115. **`pītvā` and `kṛtvā` as the everyday absolutives of `pibati` and `karoti`.** Confirm both, and
     confirm that a learner who says `pibitvā` or `karitvā` would be understood rather than stopped.
116. **`āgatya` against `āgamya`.** The module teaches `āgatya` as THE absolutive of a prefixed
     `gam-`. Confirm that is what is said, and whether `āgamya` is heard at all in sambhāṣaṇam.
117. **The `-tvā` / `-ya` rule stated as a bare prefix rule.** It is true and it is simplified.
     Confirm that stating it that flatly leaves a learner with a usable rule rather than a false one,
     and name the first place it will fail them.
118. **`gṛham gatvā aham pustakam paṭhitavān` as ordinary past narration.** Confirm the absolutive
     is genuinely tense-neutral in speech and that no listener hears the first clause as present.
119. **`bhojanam kṛtvā` for "having made the meal".** L2-M10 shipped `bhojanam kṛtavān`; confirm the
     absolutive of the same collocation is what a speaker says, and whether `annam` or `bhojanam` is
     the commoner object of `karoti` in the kitchen sense.
120. **Word order around the absolutive.** L3-M1-S04 puts `aham` AFTER `gatvā`. Confirm that is
     natural rather than merely possible, and say where a speaker actually puts the subject when a
     sentence opens with an absolutive.
121. **`yaḥ chātraḥ paṭhati saḥ jānāti` as everyday speech.** The module's premise in turn. Confirm
     the correlative really is never dropped in the spoken register, and say how a dropped `saḥ`
     lands on a listener — as a slip, as incomplete, or as unnoticed.
122. **`yam adhyāpakam bhavān jānāti tam aham jānāmi`.** The hardest sentence in the module.
     Confirm the double accusative is what is said, and confirm the word order — whether `bhavān`
     really sits after the noun inside the `ya-` clause.
123. **`saṃskṛtam vadati` for "speaks Sanskrit".** Used in L3-M2-S02 and in pool item C11. Confirm
     the accusative is right and that an instrumental (`saṃskṛtena`) is not the commoner idiom.
124. **`kāryam karoti` and `adhyayanam karoti`.** Confirm both are the everyday way to say "works"
     and "studies", and say whether `adhyayanam karoti` is heard beside plain `paṭhati` or whether a
     speaker would simply use the verb.
125. **`yat adhyayanam aham karomi tat mahyam rocate`.** A correlative whose main clause is L1-M1's
     dative frame. Confirm the pair and `rocate` sit together comfortably, and that `tat` as the
     subject of `rocate` reads as intended.
126. **`kaḥ` against `yaḥ`,** the contrast L3-M2-S07's third variation draws. Confirm a learner who
     has both will not use `kaḥ` to open a relative clause, and say whether that error is common.
127. **Naturalness of the 26 pool items**, as questions 12, 26, 47, 66, 90 and 113 asked of the
     first 117. They are grammatical by construction and recombined from the cumulative index; an
     LLM cannot hear which of them nobody would say.
     `sāyam mama mātā bhojanam kṛtvā santuṣṭā.`,
     `bhavān prātaḥ kim khāditvā vidyālayam gacchati?` and
     `yam adhyāpakam sā jānāti tam aham api jānāmi.` are the three most worth a second opinion.

---

## 64. Verification run for this change

```
npm run content:validate                              → CONTENT 472/472 ok
                                                        (en-sa/L3-M1.json ok, L3-M2.json ok)
npm run content:build -- --with-unverified --with-fixtures
                                                      → en-sa: 22 modules
                                                        (L1-M1..M10, L2-M1..M10, L3-M1..M2)
                                                          index L3-M1: 254 surfaces
                                                          index L3-M2: 262 surfaces
                                                        NINE `shown but untaught` lines in the whole
                                                        build and NONE of them en-sa's — still zero,
                                                        and still the only course in the catalogue
                                                        without one
npx tsx tools/check-shown.ts en-sa L3-M1 / L3-M2      → no SHOWN-BUT-UNTAUGHT finding on either
npx tsc --noEmit                                      → clean
npx prettier --check .                                → All matched files use Prettier code style!
npx eslint src/course/types.test.ts tools/content-build.test.ts tools/course-briefs.ts
                                                      → clean
npx vitest run src/course/types.test.ts tools/content-build.test.ts \
               tools/shown-surfaces.test.ts tools/course-briefs.test.ts
                                                      → 4 files, 668 tests passed
npm run content:build && npm run fonts:build          → en-sa: 22 modules
                                                        (L1-M1..M10, L2-M1..M10, L3-M1..M2) strict;
                                                        FONTS 15/15 ok — mukta 331376 bytes
npx vitest run   (after that STRICT build)            → 16 files, 886 tests: 885 passed, 1 failed —
                                                        scripts/generate-splash.test.ts only
npx vitest run tools/font-coverage.test.ts tools/shown-surfaces.test.ts
                                                      → 2 files, 29 tests passed, after the STRICT
                                                        build
```

**`tools/font-coverage.test.ts` PASSES after the strict build**, which is again why the suite is run
in that order: it is red only after `--with-unverified --with-fixtures`, and its four characters
(`U+000A`, `$`, `×`, `•`) predate all en-sa work. A green run here is the evidence that this wave
added **no fifth character**: every `sound` line in both modules is an ASCII respelling, and no
capitalised IAST letter (the `Ṛ` U+1E5A failure mode of #613 §33.8) was written anywhere.
`scripts/generate-splash.test.ts` is the one remaining red, measured rather than assumed and
pre-existing on this container's rasterizer.

`scripts/verify.sh` was again deliberately NOT run: it stops at the first failing stage and would
never reach CONTENT while `scripts/generate-splash.test.ts` is red on this host, so the stages were
run individually, as #610, #613, #614 and #615 did.

### Pinned inventories updated by this change

- `src/course/types.test.ts` — `MODULE_FILES` gains `content/en-sa/modules/L3-M1.json` and
  `L3-M2.json`; the case title's count moves 470 → 472 and its wording to "en-sa's two levels plus
  L3-M1..M2 (#617)". **The en-sa decisions case itself is unchanged** — the intimate-set ban and the
  `neutral` register assertion are both scoped to `L1`, and these two modules chip `neutral` on all
  twenty sentences and write no intimate pronoun at any level.
- `tools/content-build.test.ts` — `AUTHORED` gains `L3-M1` and `L3-M2`; the three
  `en-sa: 20 modules (L1-M1..M10, L2-M1..M10)` assertions become
  `en-sa: 22 modules (L1-M1..M10, L2-M1..M10, L3-M1..M2)`; two case titles move to "two complete
  levels and two rungs of a third" and "22 modules and 22 indexes"; the comment above `AUTHORED`
  and the ladder case's comment record that **L3's level `draft` flag STAYS** at two rungs of ten.
  The `drafted` predicate is unchanged and still correct.
- `tools/shown-surfaces.test.ts` — **untouched.** `'en-sa': 0` still holds.
- `tools/course-briefs.ts` — **one decision corrected** (§59), marked `#617`: §10's claim that the
  relative–correlative opens "in the nominative and accusative of three genders", which contradicted
  M2's own seam note 6 and would have required `yām` and `tām`. `tools/course-briefs.test.ts` is
  untouched and its tests pass.
- `content/en-sa/levels.json` — `L3-M1` and `L3-M2` lose `draft: true` and gain `hasContent: true`.
  **L3's own level `draft` and `draftNote` stay**, because eight rungs are still empty. L4 and L5 are
  untouched.
- `README.md` — the en-sa paragraph's module and surface counts, and the review-doc link, name, wave
  and section counts.
- This document, renamed `docs/122-llm-review-en-sa-L1-L2.md` → `docs/122-llm-review-en-sa-L1-L3.md`
  (and, by #621, → `docs/122-llm-review-en-sa-L1-L4.md`)
  for the fourth time in its life, for the fourth time because its scope widened.

`git diff --stat content/en-sa/modules/L1-M1.json … L1-M10.json content/en-sa/modules/L2-M1.json …
L2-M10.json` is **EMPTY**, and so is `git diff --stat` over the other nine courses. The only tracked
file this wave modifies under `content/` is `content/en-sa/levels.json`; everything else it adds is
new.

---

## Wave 8 — L3-M3 · L3-M4 · L3-M5 (#618) — the level's three deltas

Three rungs, authored strictly in ladder order with a rebuild between each, so M4's prompt saw M3's
index and M5's saw M4's. The wave adds **thirteen surfaces** and takes en-sa from 262 to **275**;
`en-sa: 25 modules (L1-M1..M10, L2-M1..M10, L3-M1..M5)`. L3 is five rungs into ten and keeps its
level `draft: true`.

---

## 65. What was authored

**`L3-M3` — Opinions with reasons.** Ten sentences, thirty variations, thirteen pool items, ten
rules, **FULLY ENRICHED** (`sound`, `variations`, `mistake`, `usage`, `mnemonic` on all ten, which
the M1–M3 rule requires and the validator checks). Bounds 3–10 words; longest hero 7.
**Four new surfaces, four new rows: `satyam`, `tathā`, `manye`, `kadācit`.** Index closes at 266.

The module's spine is that agreeing and disagreeing are one word each and neither is a verb.
`satyam` agrees with a claim, on the pattern of L1-M2's `ām`, and takes no `asti` — S01's mistake
plate is exactly that (`idam satyam asti`). `na tathā` disagrees by negating the MANNER word, which
is L1-M2's `na` in its second job, and S03's plate (`na asti tathā`) is the English habit of
contradicting a verb that is not there. `manye` is the module's **one new ending cell** — the
first-singular ātmanepada `-e`, pointed back at L1-M1's `rocate` as the third person of the same
set, with no paradigm taught. **Reasons opened nothing**: `yataḥ`, `ataḥ` and `kimartham` are all
L1-M9's, exactly as §3 of the briefs planned, which is what lets L3-M2 keep `yat` in one reading.
S04's plate writes `yat` for "because" and says why it is wrong, and S06's plate swaps `yataḥ` and
`ataḥ` — a real learner error that reverses the sentence.

**`L3-M4` — If and then.** Ten sentences, thirty variations, thirteen pool items, ten rules;
enrichment where it earns its place (`literal`, `trap`, `usage` and `variations` 10/10; `sound` 6,
`mistake` 5, `mnemonic` 5 — the L2-M8 and L2-M10 shape). Bounds 3–11 words; longest hero 9.
**Five new surfaces, five new rows: `yadi`, `tarhi`, and the three optatives `gacchet`, `paṭhet`,
`khādet`.** Index closes at 271.

**The optative was opened deliberately and it says so in its own rule text**, which is the thing
§4 of the briefs asked for: rule 2 states the ruling, and rule 4 names the three things that do NOT
come with it — `gaccheyam`, every dual and plural shape, and the athematic `kuryāt`. Rule prose is
English, the ratchet does not see it, and this is the third use of the technique after L1-M4's
`gacchasi` and L2-M8's `abhavat`. **Exactly three `-et` shapes are written**, which is the brief's
cap and L2-M6's `-āmaḥ` ruling reused: the ending is the lesson and a fourth verb buys nothing.
`tarhi`'s droppability is the module's other delta, and S05 is the hero that carries it — a
complete sentence with no `tarhi` in it, whose mistake plate is L3-M2's correlative with its `saḥ`
dropped, so the two pairs sit side by side in one plate and only one of them survives losing its
second half. S04 proves the conditional needs no optative (plain present plus L2-M4's imperative),
S06 is prohibition as `na` + optative, and S04's plate is the past counterfactual built out of
participial pasts, named as L4-M3's and written nowhere.

**`L3-M5` — What someone said.** Ten sentences, thirty variations, thirteen pool items, ten rules;
enrichment where it earns its place (`sound` 6, `mistake` 5, `mnemonic` 4). Bounds 3–11 words;
longest hero 7. **Four new surfaces across THREE new rows: `iti`, `pṛcchati`, and `uktavān` with
`uktavatī` in its `forms`.** Index closes at 275.

All three deltas of §5 are on the page. There is no word for "that" (rule 1); there is no tense
shift and no person shift (rule 2); and `iti` comes AFTER the quote, pointed back at L1-M10's `ca`
and L2-M9's `vā` rather than taught a third time (rule 3). **S01's mistake plate is the English
indirect shape** — `saḥ uktavān yat saḥ gacchati` — which does the double duty the brief predicted:
it is the sentence an English-trained learner builds, and it puts the `yat` complementiser in the
one place in this course that is exempt from the ratchet and never read. Three more plates carry
the rest of the interference: S03's indirect question (`saḥ pṛcchati kutra aham gacchāmi`), S08's
person shift inside the quote, and S10's misplaced `iti` after the verb of saying.

**`uktavān` was given its own row and the note says why.** It is not a shape of L2-M7's `vadati`:
the past of speaking is built on a different root, and burying it in `vadati`'s `forms` would be a
false claim about Sanskrit morphology that `maxSpan: 1` and no hyphen leaves nothing to catch. Rule
5 states it in English and S08's note states it beside `gatavān`, which IS a shape of `gacchati` —
two `-vān` participles in one sentence, one of them a shape of a taught verb and one of them not.

---

## 66. The ratchet is still at ZERO, across twenty-five rungs

`npm run content:build -- --with-unverified --with-fixtures` prints **nine `shown but untaught`
lines in the whole build and none of them en-sa's**. `tools/shown-surfaces.test.ts` is **untouched**:
`'en-sa': 0` still holds, and en-sa is still the only course in the catalogue at zero.

Three things kept it there, each a decision rather than luck.

1. **Every display, variation and pool item was checked against the FOLDED index before it was
   written into a file**, not against a paradigm. The fold was recomputed from all twenty-two
   emitted index files (139 + 108 + 15 = 262), then again after each rung. The forms this wave
   wanted and did not have are listed in §70; the sharpest was **`āgacchati`, which does not exist
   in this course** — L2-M1 shipped `āgacchatu` and L3-M1 shipped `āgatya`, and the plain present
   `āgacchati` is in no module. Two drafts of M4 and M5 wanted it (`yadi bhavatī adya na āgacchati
   …`, `kadā bhavān āgacchati iti sā pṛcchati`) and both were rewritten onto `gacchati`.
2. **No new proper noun.** M5 is the module in the whole ladder that most wants the vocative — it
   is a module of reported dialogue — and it gets neither the vocative nor a third name. Speakers
   are named in the NOMINATIVE (`rāmaḥ uktavān`, `sītā uktavatī`), and inside a quote the other
   person is addressed with `bhavān` or `bhavatī`. `rāmaḥ` and `sītā` are L1-M1's rows and are
   still the only two names this course writes.
3. **Three rows exist only because a level never edits a file below it.** `gacchet`, `paṭhet` and
   `khādet` each point back at L1-M2's and L1-M4's presents rather than being added to their
   `forms`, exactly as L3-M1's absolutives did for the same verbs.

`npx tsx tools/check-shown.ts en-sa L3-M3` / `L3-M4` / `L3-M5` each report **no SHOWN-BUT-UNTAUGHT
finding** (41, 43 and 41 RE-TEACH lines and 12, 8 and 12 COLLIDES lines, which is the ordinary shape
of a module that re-teaches lower-level words and repeats a row across its own sentences — L3-M1
and L3-M2 report 48/11 and 48/8, and the tool's own header calls both information rather than a
verdict).

**`maxSpan` is 1 on all twenty-five emitted en-sa index files**, read out of them rather than
assumed. No hyphen, no avagraha and no multi-token surface was written, and no draft wanted one.

---

## 67. The briefs' ownership plan, and the one claim that needed checking

**Every ownership claim in the three module briefs held, and `tools/course-briefs.ts` needed no
correction this wave** — the second wave in a row with none. Each claim was grepped against the
folded snapshot rather than trusted, because eleven briefs on this course have been corrected for
exactly this defect:

- **M3 §3 / note 6.** `satyam`, `tathā`, `manye`, `kadācit` fresh — confirmed absent from the fold.
  `na` and `ām` L1-M2's, `yataḥ` / `ataḥ` / `kimartham` L1-M9's, `khinnaḥ` / `khinnā` /
  `santuṣṭaḥ` / `santuṣṭā` L1-M9's, `asti` L1-M3's, `icchāmi` / `icchati` L1-M3's, `uttamam` /
  `navam` / `purāṇam` L2-M3's, `idam` L1-M1's, `tathāpi` L1-M10's — every one confirmed present and
  owned where the brief says.
- **M4 note 6.** `yadi` and `tarhi` fresh; `gacchet` ← L1-M2's `gacchati`, `paṭhet` and `khādet` ←
  L1-M4's `paṭhati` and `khādati`; `gacchatu` L2-M4's, `āgacchatu` L2-M1's, `kṛpayā` L2-M1's, `śvaḥ`
  **L1-M6's** (the brief says "L1-M4, L1-M6" of `adya` and `śvaḥ` together — `adya` is L1-M4's and
  `śvaḥ` is L1-M6's, which is what the fold says and what the brief means).
- **M5 note 6.** `iti`, `pṛcchati` and `uktavān` fresh; `vadati` / `vadāmi` / `vadatu` and
  `śṛṇoti` / `śṛṇomi` L2-M7's, `saḥ` / `sā` L1-M5's, `tat` / `tam` L3-M2's, `kutra` / `kim`
  L1-M2's, `jānāti` / `jānāmi` L2-M8's, and the participial pasts **L1-M2's `gatavān` / `gatavatī`
  and L1-M4's other five pairs, never L1-M5's** — L1-M5's entire delta is `hyaḥ`, `saḥ` and `sā`
  and it owns no participle at all, which is #615's correction holding.

One claim was checked twice because it is the kind that has been wrong before. **M5 note 6 says
`kathayati` is NOT written**, implying L1-M2's `kathayatu` exists — it does, as L1-M2's row, and
`kathayati` is absent from the fold. The module writes neither, and reuses `vadati` and `uktavān`
as the brief directs.

---

## 68. Decisions that could look like bugs

### 68.1 `manye` has no third-person shape anywhere, so nobody can be asked their opinion

`manye` is the first singular and the module writes that cell only. There is therefore **no way in
this module to ask someone what they think** — `manyate` would be a second cell of a new verb, and
opening a cell nobody decided to open is the mistake L3-M4's brief exists to prevent. What M3 asks
instead is `bhavān kimartham tathā vadati?` ("why do you say so?"), on S08's third variation, which
uses L2-M7's `vadati` and asks about the stated opinion rather than the held one.

### 68.2 `tat kāryam` was drafted as a pool item and withdrawn

A thirteenth M3 pool item read `kadācit saḥ tat kāryam kṛtavān`. `tat` resolves — it is L3-M2's —
but that row's note calls it **the neuter correlative, answering `yat`**, and the pool item has no
`yat` clause for it to answer. A token that resolves to a row whose note is false of the sentence
in front of the learner is precisely the hi-mr defect of `docs/07`, so the item was rewritten to
`kadācit saḥ adya kāryam kṛtavān`. The bare demonstrative reading of `tat` belongs to whichever
module decides to open it, and this one did not.

### 68.3 M4 writes `gacchema` in a mistake plate while its rule says the optative is one cell

This is deliberate and precedented: **L2-M6 already plates `gacchema`** (`kadā gacchema?`) under a
rule text saying the course writes it NOWHERE. `mistake.display` is exempt from the shown-surface
ratchet by design and is never read by `buildWordIndex`, and M4's own brief note 5 asks for a plate
on exactly this form. **`mā` was NOT plated**, even though prohibition is M4's subject: the briefs
say it is written nowhere, and naming it in rule 6's English prose costs nothing while a plate would
put it in a `display` field.

### 68.4 M5's S09 has no `iti` in it

`saḥ kim uktavān?` is a question ABOUT what someone said and quotes nothing, so there is nothing for
`iti` to close. The word row's note says so, because the obvious learner error at this point is to
add `iti` to every sentence containing a verb of saying.

### 68.5 `kim` is used as "what" in M5-S07 and the row is glossed "(yes/no marker) · what"

L1-M2's `kim` row carries both readings, and the fold gives the key to that row. M5-S07
(`bhavatī kim paṭhati iti saḥ pṛcchati`) uses the "what" reading, and the sentence disambiguates it:
a yes/no reading would leave `paṭhati` without an object. The word row's note says "as the thing
being read", which is the reading the learner is shown.

### 68.6 Both `uktavān` and `uktavatī` are index keys, and there are only three new rows in M5

`uktavatī` sits in the `uktavān` row's `forms`, so the emitter gives it its own key pointing at that
row — four new keys, three new rows. Every sentence that writes `uktavatī` carries a word row whose
`display` is the citation form `uktavān`, which is the convention L1-M9's `sundaraḥ` row set for a
sentence writing `sundaram`.

### 68.7 M4's `allowedTenses` names `optative_third_singular`, not `optative`

The field is a free string array rather than a schema enum, and the narrower name is the honest one:
the course has opened one cell of the mood, and a brief read later should not be able to mistake the
label for a claim that the whole mood is open. M5 carries the same string, because M5's pool item
C13 quotes a `yadi … tarhi` sentence and its heroes may not write an optative that its own brief did
not open.

### 68.8 The Devanagari was generated, not typed

Every `script` line in all three modules was produced by mapping each IAST token through a
token→Devanagari table **folded out of the twenty-two already-shipped en-sa modules** (257 tokens,
**0 conflicts** — no token is spelled two ways anywhere in the course), with the danda substituted
for the full stop and the comma and question mark carried through. Only **fourteen** genuinely new
tokens were written by hand: the thirteen new surfaces plus `hrasvaḥ`, which is indexed by L2-M3 but
had until now appeared only in a `forms` list and a mistake plate, so the course had never written
its Devanagari.

---

## 69. Every comprehension token resolves to the RIGHT row

Each of the **39 pool items** was walked token by token against the emitted cumulative index for its
own module, and for each token the **word row it lands on** was read out of the module and sentence
the index names — the check PRD §6.3 does not make. **0 unresolved, 0 mis-seated.** The heroes and
all 90 variations were walked the same way.

The seatings worth recording, because they are the ones where a reader might expect a different row:

- **`mama` → L1-M1's `aham` row** (it is the genitive of `aham` and lives in that row's `forms`).
  Six pool items across the three modules depend on it.
- **`mahyam` → L1-M1's `aham` row**, same reason. M4-C06.
- **`gacchāmi`, `gamiṣyāmi`, `gatavatī` → L1-M2's `gacchati` row.** M3-C08/C09, M4-C03/C10,
  M5-C04/C10.
- **`kṛtavān` → L1-M4's `karoti` row** and **`karomi` → the same** (M3-C13, M4-C04).
- **`uttamam` → L2-M3's `uttamaḥ` row**, `purāṇam` → `purāṇaḥ`, `navam` → `navaḥ`,
  `sundaram` → `sundaraḥ`, `śāntam` → `śāntaḥ`, `khinnā` and `santuṣṭā` → the masculine citation
  rows. Every one is the right lexeme in the right gender.
- **`icchati` → L1-M3's `icchāmi` row** and **`jānāti` → L2-M8's `jānāmi` row** — both courses'
  rows are seated on the first-person display, which is what those modules taught first.
- **`bhavatī` → L1-M2's `bhavān` row**, seven times.
- **`uktavatī` → L3-M5's `uktavān` row** (§68.6). **`pṛcchati` and `iti` → their own rows.**
- **`satyam`, `tathā`, `manye`, `kadācit` → L3-M3's four rows**, reached from M4's and M5's pools as
  well as M3's (M4-C11 and C13, M5-C06 and C08), which is the cumulative index working.
- **`yadi` and `tarhi` → L3-M4's rows**, reached from M5-C13.

M5-C13 (`yadi bhavān icchati tarhi aham gacchāmi iti sā uktavatī`) is the item worth its own line:
it quotes a **complete L3-M4 conditional inside an L3-M5 report**, which is rule 4 of M5 — the quote
keeps every rule of the ladder below it — demonstrated rather than asserted. Its nine tokens land on
rows from L1-M1, L1-M2, L1-M3, L1-M5, L3-M4 and L3-M5.

---

## 70. Sanskrit that was deliberately NOT written

Every form below was wanted by a draft of one of these three modules and left out. Each is recorded
with the reason, because a deferral with no owner is how a course loses a decision.

**Forms that do not exist in this course's index, caught by grepping the fold:**

- **`āgacchati`** — the plain present of the prefixed verb. L2-M1 has `āgacchatu` and L3-M1 has
  `āgatya`; the present is in NO module. Two drafts wanted it and both were rewritten onto
  `gacchati`. This is the same class of defect as the `paśyāmi` near-miss of §58, and it is the one
  to expect: **a paradigm cell an author assumes exists because its neighbours do.**
- **`paśyāmi`** — checked again and still absent, so no sentence in these three modules says "I see".
- **`manyate`** — the third singular of M3's new verb (§68.1).
- **`pṛcchāmi`** — "I ask". M5 opens `pṛcchati` only; a draft variation of S07 wanted the first
  person and was rewritten to `sā pṛcchati`.
- **`vaidyam`, `vaidyasya`** — L2-M8 shipped `vaidyaḥ` and `vaidyā` and no oblique shape. An M4
  draft wanted `bhavān vaidyasya samīpe gacchet` and was rewritten.
- **`ayam` / `iyam`** — the masculine and feminine of L1-M1's `idam`. The course has the neuter
  only, so every "this" in M3 sits on a neuter noun (`bhojanam`, `pustakam`, `kāryam`, `saṅgītam`,
  `gṛham`) and `idam mārgaḥ` is written nowhere.
- **`bhavantam` / `bhavatīm`** — the accusative of `bhavān` / `bhavatī`. An M5 draft wanted
  "I told you" and was rewritten to `aham uktavān`.
- **`tiṣṭhatu`, `kathayati`, `cintayāmi`** — none is in the fold; each was reached for once and
  dropped.

**Forms the briefs refuse, re-verified absent from every `display`, `variation`, pool item and
`forms` list across all three modules:**

every `-si` present including `gacchasi` and `jānāsi`; `tava`, `tubhyam`, `tvām`, `te`; `mā`; every
imperfect (`abhavat`, `avadat`, `āsīt`) — "he said" is `uktavān`, which is L2-M8's ruling on
`kim jātam` unchanged; the productive bare `-ta` participle (`gataḥ`, `kṛtam`, `naṣṭam`); the
vocative; `svasā`; `mahat`; `asmi` — named in M3's rule 3 as the missing first-person copula and
written nowhere; the plural participial past (`gatavantaḥ`, `uktavantaḥ`); every bare-stem
imperative but L2-M1's `āgaccha`. **`tvam` is still at exactly one display in the whole course**,
L2-M1-S04's, verified by walking every display, variation, pool item and mistake plate in all
twenty-five modules.

**The optative cells M4 does NOT open,** each checked by name across the three files: **`gaccheyam`**
(first singular), **`gacchema`** (first plural — present in M4-S02's mistake plate ALONE, §68.3, and
in no display, variation, pool item or `forms` list), **`gacchetām`** and every other dual, every
other plural, and **`kuryāt`** — the athematic optative of L1-M4's `karoti`, which does not end
`-et` and would teach an irregular stem inside the module that opens the regular one. **`likhet`
and `vadet` were also refused**: the brief caps the module at three `-et` shapes and M4 writes
`gacchet`, `paṭhet` and `khādet`. A draft of S08's first variation wanted `vadet` and was rewritten
back to L2-M7's `vadatu`.

---

## 71. Open questions for the fluent-speaker gate — continuing from 127

The gate is a **fluent saṃskṛta-sambhāṣaṇam speaker or a Sanskrit teacher**, and it is **UNMET**.
Questions 1–127 are still open. These fourteen are this wave's.

128. **`satyam` as the ordinary one-word agreement.** The module's premise. Confirm a speaker really
     answers a claim with bare `satyam`, and say whether it sounds emphatic or neutral beside `ām`.
129. **`na tathā` as the ordinary disagreement.** Confirm the phrase is said, confirm it needs no
     verb, and say how blunt it lands — the module tells a learner that bluntness is not rudeness
     here, and that is the claim most in need of a second opinion.
130. **`aham tathā manye` without an `iti` clause.** M3 states an opinion with `tathā` because `iti`
     is M5's. Confirm a speaker really says `aham tathā manye` on its own, or whether
     `… iti manye` is so nearly obligatory that the M3 shape reads as incomplete.
131. **`kadācit` as a hedge rather than as "sometimes".** It carries both readings. Confirm that in
     front of a claim it is heard as "perhaps" and not as a frequency word, and name a commoner
     hedge if there is one.
132. **`yataḥ` after the claim and `ataḥ` after the cause.** Confirm both orders are the natural
     ones in speech, and whether a fronted `yataḥ` clause is heard at all.
133. **`bhavān gṛham gacchet` as everyday advice.** The optative's whole justification here.
     Confirm the third singular `-et` is what a speaker uses to advise the person in front of them,
     and say how it compares in force to `gacchatu`.
134. **`tarhi` really is droppable.** The contrast that earns M4 its place after M2. Confirm a
     dropped `tarhi` is unremarkable rather than clipped, and say whether length changes that —
     M4-S10 is the longest and its second variation drops it.
135. **`yadi bhavān adya na gacchati tarhi śvaḥ gacchatu`** — a plain present and an imperative with
     no optative anywhere. Confirm this is ordinary and not a learner's shortcut.
136. **`na` + optative as prohibition.** `bhavān adya na gacchet`. Confirm this is how advice
     against something is given, and say how far it is from `mā` + injunctive in feel — the module
     tells a learner they are not the same thing.
137. **`iti` in actual speech.** The largest question of the three modules. Confirm `iti` is said in
     sambhāṣaṇam rather than being a written convention, and say whether a speaker ever reports
     without it.
138. **`uktavān` / `uktavatī` against the alternatives.** Confirm this is the everyday past of
     saying, and say what a speaker actually uses — `uktavān`, `avadat`, or something else. If the
     answer is that `uktavān` is stiff, M5 has the `saḥ vadati` escape its brief wrote for it.
139. **`kutra bhavān gacchati iti saḥ pṛcchati`.** Confirm `pṛcchati` takes a quoted question with
     `iti` the way `uktavān` takes a quoted statement, and confirm the question word stays inside.
140. **Quoting yourself:** `mama pustakam na asti iti aham uktavān` (M5-S10). Confirm the shape does
     not change when the quoted speaker and the reporter are the same person, and that `aham`
     appearing twice is not heard as clumsy.
141. **Naturalness of the 39 pool items**, as questions 12, 26, 47, 66, 90, 113 and 127 asked of
     the pools below them. They are grammatical by construction and recombined from the cumulative index; an
     LLM cannot hear which of them nobody would say.
     `idam gṛham sundaram, yataḥ śāntam.`,
     `yadi bhojanam uttamam tarhi aham adhikam khādāmi.` and
     `yadi bhavān icchati tarhi aham gacchāmi iti sā uktavatī.` are the three most worth a second
     opinion.

---

## 72. Verification run for this change

```
npm run content:validate                              → CONTENT 475/475 ok
                                                        (en-sa/L3-M3.json ok, L3-M4.json ok,
                                                         L3-M5.json ok)
npm run content:build -- --with-unverified --with-fixtures
                                                      → en-sa: 25 modules
                                                        (L1-M1..M10, L2-M1..M10, L3-M1..M5)
                                                          index L3-M3: 266 surfaces
                                                          index L3-M4: 271 surfaces
                                                          index L3-M5: 275 surfaces
                                                        NINE `shown but untaught` lines in the whole
                                                        build and NONE of them en-sa's — still zero,
                                                        and still the only course in the catalogue
                                                        without one
npx tsx tools/check-shown.ts en-sa L3-M3 / L3-M4 / L3-M5
                                                      → no SHOWN-BUT-UNTAUGHT finding on any of them
npx tsc --noEmit                                      → clean
npx prettier --check <the seven files this change touches>
                                                      → All matched files use Prettier code style!
npx eslint src/course/types.test.ts tools/content-build.test.ts
                                                      → clean
npm run content:build && npm run fonts:build          → en-sa: 25 modules
                                                        (L1-M1..M10, L2-M1..M10, L3-M1..M5) strict;
                                                        FONTS 15/15 ok — mukta 331376 bytes
npx vitest run   (after that STRICT build)            → 16 files, 889 tests: 888 passed, 1 failed —
                                                        scripts/generate-splash.test.ts only
npx vitest run tools/shown-surfaces.test.ts tools/font-coverage.test.ts \
               src/course/types.test.ts tools/content-build.test.ts \
               tools/css-classes.test.ts tools/course-briefs.test.ts
                                                      → 6 files, 699 tests passed, after the STRICT
                                                        build
```

**`tools/font-coverage.test.ts` PASSES after the strict build**, which is again why the suite is run
in that order: it is red only after `--with-unverified --with-fixtures`, and its four characters
(`U+000A`, `$`, `×`, `•`) predate all en-sa work. A green run here is the evidence that this wave
added **no fifth character**: every respelling in all three modules is ASCII, the IAST that appears
in the English half of a `sound` line is the ordinary lowercase set every shipped en-sa module
already uses (`ā ī ū ṛ ḥ ṃ ś ṣ ṇ ṭ ṅ ñ`), and no capitalised IAST letter (the `Ṛ` U+1E5A failure
mode of #613 §33.8) was written anywhere.
`scripts/generate-splash.test.ts` is the one remaining red, measured rather than assumed and
pre-existing on this container's rasterizer — it fails identically on a stashed tree.

`scripts/verify.sh` was again deliberately NOT run: it stops at the first failing stage and would
never reach CONTENT while `scripts/generate-splash.test.ts` is red on this host, so the stages were
run individually, as #610, #613, #614, #615 and #617 did.

### Pinned inventories updated by this change

- `src/course/types.test.ts` — `MODULE_FILES` gains `content/en-sa/modules/L3-M3.json`, `L3-M4.json`
  and `L3-M5.json`; the case title's count moves 472 → 475 and its wording to "en-sa's two levels
  plus L3-M1..M5 (#618)". **The en-sa decisions case itself is unchanged** — the intimate-set ban and
  the `neutral` register assertion are both scoped to `L1`, and these three modules chip `neutral` on
  all thirty sentences and write no intimate pronoun at any level.
- `tools/content-build.test.ts` — `AUTHORED` gains `L3-M3`, `L3-M4` and `L3-M5`; the three
  `en-sa: 22 modules (L1-M1..M10, L2-M1..M10, L3-M1..M2)` assertions become
  `en-sa: 25 modules (L1-M1..M10, L2-M1..M10, L3-M1..M5)`; two case titles move to "two complete
  levels and five rungs of a third" and "25 modules and 25 indexes"; the comment above `AUTHORED`
  records that **L3's level `draft` flag STAYS** at five rungs of ten.
- `tools/shown-surfaces.test.ts` — **untouched.** `'en-sa': 0` still holds.
- `tools/course-briefs.ts` — **untouched.** No ownership claim in the three module briefs was wrong.
- `content/en-sa/levels.json` — `L3-M3`, `L3-M4` and `L3-M5` lose `draft: true` and gain
  `hasContent: true`. **L3's own level `draft` and `draftNote` stay**, because five rungs are still
  empty. L4 and L5 are untouched.
- `README.md` — the en-sa paragraph's module and surface counts, the ratchet paragraph, and the
  live-site module total (472 → 475).

`git diff --stat content/en-sa/modules/L1-M1.json … L1-M10.json content/en-sa/modules/L2-M1.json …
L2-M10.json content/en-sa/modules/L3-M1.json content/en-sa/modules/L3-M2.json` is **EMPTY**, and so
is `git diff --stat` over the other nine courses. The only tracked file this wave modifies under
`content/` is `content/en-sa/levels.json`; everything else it adds is new.

---

## Wave 9 — L3-M6 … L3-M10 (#619) — the level closes

Five rungs, authored strictly in ladder order with a rebuild between each, so M7's prompt saw M6's
index, M8's saw M7's and so on to M10. The wave adds **forty-two surfaces** and takes en-sa from 275
to **317**; `en-sa: 30 modules (L1-M1..M10, L2-M1..M10, L3-M1..M10)`. **L3's level `draft` flag and
its `draftNote` come off with its tenth rung**, exactly as L2's did at #615 and unlike L1's, which
waited for a separate graduation issue (#611). Three complete levels; L4 and L5 keep their flags.

---

## 73. What was authored

| | M6 Feelings | M7 Body | M8 Money | M9 Festivals | M10 Your own story |
| --- | --- | --- | --- | --- | --- |
| sentences | 10 | 10 | 10 | 10 | 10 accounts |
| variations | 30 | 30 | 30 | 30 | 30 accounts |
| pool items | 13 | 13 | 13 | 13 | 13 accounts |
| rules | 10 | 10 | 10 | 10 | 10 |
| word rows shown | 48 | 53 | 43 | 43 | 43 |
| new surfaces | 8 | 11 | 9 | 14 | **0** |
| new rows | 6 | 7 | 6 | 10 | **0** |
| index closes at | 283 | 294 | 303 | 317 | 317 |
| bounds | 3–11 | 3–11 | 3–12 | 3–12 | 3–12 |
| longest clause | 7 | 9 | 9 | 7 | 8 |

Enrichment is "where it earns its place" on all five, which is the rule past M3: `literal`, `trap`,
`usage` and `variations` are 10/10 on every module; `sound` is 5 · 6 · 4 · 5 · 4, `mistake`
8 · 3 · 3 · 3 · 5, `mnemonic` 5 · 3 · 2 · 2 · 3. M6 carries the most plates because the crossed
frames are its whole subject.

**`L3-M6` — Feelings in depth.** **Eight new surfaces across six rows: `sukham`, `duḥkham`,
`bhayam`, `cintā`, `bhītaḥ` (with `bhītā` in its `forms`) and `kruddhaḥ` (with `kruddhā`)** — the
brief's seam plan exactly, and the `sundaraḥ` rule of L1-M9 unchanged: one tap destination per word.
The module's spine is the **dative of the experiencer taught BESIDE the adjective frame**, with a
minimal pair at S01/S02 (`mahyam duḥkham asti` · `adya aham khinnaḥ`) and the crossed frames plated
on both of them (`aham duḥkham asti` and `adya mahyam khinnaḥ`). S08 is the payoff the brief asked
for: `mahyam saṅgītam rocate, ataḥ mahyam sukham asti` — L1-M1's liking frame and L3-M6's feeling
frame in one sentence, the same dative doing both jobs, with `aham saṃskṛtam rocāmi` as the plate.
**Rules 6 and 7 repeat L2-M3's ruling out loud**: `bhītaḥ` and `kruddhaḥ` are lexicalised
adjectives, the productive bare `-ta` participle stays shut, and `jātam` is still the one frozen
member. S09 puts both frames inside one sentence (`aham santuṣṭaḥ, yataḥ mahyam cintā na asti`),
which is the target the brief names: not choosing between them but knowing which half needs which.

**`L3-M7` — Body and health.** **Eleven new surfaces across seven rows: `śiraḥ` (with `śirasi`),
`udaram` (with `udare`), `hastaḥ` (with `haste`), `pādaḥ` (with `pāde`), `vedanā`, `auṣadham`,
`rogaḥ`** — the brief's count, form for form. **The pain is the subject and the body part is the
locative**, with no verb of hurting anywhere: S01's plate is the English shape (`aham vedanā asti`)
and rule 2 states the thing a learner gets wrong before the grammar — `mama` owns the HEAD, not the
pain. `śiraḥ` carries both its shapes on one row and **the `-s` stem paradigm is not opened**, the
decision L2-M2 took for `mātā` and `pitā`; the three regular a-stems sit beside it so the contrast
teaches itself. **`auṣadham` enters as a noun only and rule 7 names the gap**: this course has no
verb for taking medicine, so the module writes `mama auṣadham asti` and `auṣadham icchāmi` and says
why it stops there. Advice is L3-M4's optative and costs nothing new; `bhavatī gṛhe tiṣṭhet` is
written nowhere, because `tiṣṭhati` is a verb this course has never opened.

**`L3-M8` — Money and paperwork.** **Nine new surfaces across six rows: `kāryālayaḥ` (with
`kāryālayam`, `kāryālaye` and `kāryālayasya` — one row, four shapes, all four written in heroes),
`pramāṇapatram`, `patram`, `bhāṭakam`, `dhanam`, `śulkam`.** The line the brief drew is drawn in the
rules: rule 1 says the nouns are MODERN administrative Sanskrit, out loud, the way L2-M7 had to say
it of `dūrabhāṣaḥ`; rule 2 makes `-ālaya` a family of three; rule 3 says `patram` and
`pramāṇapatram` are two keys and the compound donates nothing to its member. **The sandhi stays
unwritten and the two plates are exactly the two temptations** — `kāryālayaḥ kutrāsti?` (the spoken
join written in) at S01 and `mama pramāṇapatram kāryālaye 'sti.` (the avagraha a printed form uses)
at S02, both of them in the one field the ratchet never reads. S03's plate is L1-M8's own, reused:
the genitive dropped under a price. No new numeral, no clock, `neutral` on all ten.

**`L3-M9` — Festivals and everyday culture.** **Fourteen new surfaces across ten rows:
`utsavaḥ` (with `utsave`), `dīpaḥ` (with `dīpāḥ`), `mandiram` (with `mandire`), `vastram`,
`miṣṭānnam`, `janaḥ` (with `janāḥ`) — and the four rows that exist only because a level never edits
a file below it: `santi` ← L1-M3's `asti`, `gacchanti` ← L1-M2's `gacchati`, `khādanti` ← L1-M4's
`khādati`, `paśyanti` ← L2-M4's `paśyati`.** Exactly **three verbs** carry `-anti`, which is the
brief's cap and L2-M6's `-āmaḥ` ruling reused a fourth time. Rule 2 names `asti` · `staḥ` · `santi`
side by side for the first time in the course. **S08 exists to be looked at rather than said** —
`janaḥ mandiram gacchati, janāḥ api mandiram gacchanti` — and three of the module's plates are the
singular-verb error in three places. **No festival is named**: §74.

**`L3-M10` — Your own story.** **ZERO new surfaces and zero new rows** — `L3-M10.json`'s emitted
index has an empty `delta` and `surfaceCount` stays at 317, which is the brief's "fresh rows should
be none" met exactly rather than approximately. Ten accounts of six to eight sentences, thirty
variations that are whole accounts, thirteen pool items that are whole accounts. **Law one** is on
the page five times over: every variation whose `changed` says "a man/woman telling it" reforks the
speaker's participles and **leaves `uktavān`/`uktavatī` alone**, and S06 is the clean case — five
`-tavatī` endings with one `-tavān` in the middle, correct, because the teacher who spoke is a man.
S10 carries three feminine endings belonging to three different women and its plate is the report
made to agree with the narrator. **Law two** is plated at S04: `yaḥ janaḥ tatra asti. saḥ
santuṣṭaḥ.` — the correlative split across a full stop — and S06's plate is the mirror image, a
sequencer used INSIDE a sentence. **Law three** is shown rather than asserted: S01's third variation
is the same account in the future with `gatvā` unchanged, and S09 is a future account with no
participle in it at all, which is why nothing in it says whether the speaker is a man or a woman.
**Pro-drop holds**: `aham` appears once per account, in the first sentence, and S01's plate is the
four-`aham` version.

---

## 74. The ratchet is still at ZERO, across THIRTY rungs — and M9 is the hardest case in the catalogue

`npm run content:build -- --with-unverified --with-fixtures` prints **nine `shown but untaught`
lines in the whole build and none of them en-sa's**. `tools/shown-surfaces.test.ts` is **untouched**:
`'en-sa': 0` still holds, and en-sa is still the only course in the catalogue at zero — across a
whole finished Level 3 now, not five rungs of one.

**`L3-M9` is the single hardest place in the ladder to hold that line, and it held.** A festival has
a name; a name rides unindexed (#61) and is COUNTED (#491); so a module about festivals is the one
module most likely to raise the baseline. The ruling stands and is in rule 6: **a festival is
`utsavaḥ`**, the specific day goes in `usage` hedged, and `rāmaḥ` and `sītā` are still the only two
names this course writes — neither of them in any of these five modules. Nothing in the five new
files is a proper noun at all.

**The ratchet fired once during this wave and the failure was caught by the build, not by review.**
`L3-M10`'s ninth hero had a variation reading `śvaḥ prathamam vayam vidyālayam gacchāmaḥ. tataḥ
saṃskṛtam paṭhāmaḥ.`, and the build printed `shown but untaught: 1 surface — paṭhāmaḥ`. **`paṭhāmaḥ`
does not exist in this course.** It was written because `gacchāmaḥ`, `khādāmaḥ` and `paśyāmaḥ` do —
the named failure mode exactly, a paradigm cell assumed because its neighbours are there, now its
fourth instance on this course after `paśyāmi`, `āgacchati` (twice) and the first-person "I see".
The variation was rewritten to `ante gṛhe bhojanam khādāmaḥ` and the line went away. The lesson the
wave takes from it: the fold was grepped for every INFLECTED form before it was written and the
first-person plural of `paṭhati` was the one that slipped through, because the sentence was built by
analogy with the line above it rather than against the index.

**`maxSpan` is 1 on all thirty emitted en-sa index files**, read out of them rather than assumed. No
hyphen, no avagraha in any display, variation, pool item or `forms` list, and no multi-token surface
anywhere. `L3-M9`'s note on `punaḥ` records why the reduplicated `punaḥ punaḥ` — which would be the
course's first two-token surface — is written once and never doubled.

---

## 75. The briefs' ownership plan, and the one example this wave declined to write

**Every ownership claim in the five module briefs held, and `tools/course-briefs.ts` needed no
correction this wave** — the third wave in a row with none. Each claim was grepped against a fold
recomputed from all twenty-five emitted index files (139 + 108 + 28 = 275), and then again after
each rung. The seam counts the briefs predicted and the counts the build emitted agree exactly:
6 rows / 8 surfaces at M6, 7 / 11 at M7, 6 / 9 at M8, 10 / 14 at M9, 0 / 0 at M10.

**One brief EXAMPLE was declined, and it is a content judgement rather than an ownership error.**
`L3-M8`'s note 4 offers `kāryālayasya mūlyam kiyat?` as the module's price question. Every token in
it is owned or planned, so the brief is not wrong about the index — but an office is not a thing
anybody prices, and a display that is grammatical and absurd teaches the frame badly. The module
writes **`gṛhasya bhāṭakam kiyat?`** instead: the identical L1-M8 frame, with `gṛhasya` already
owned since L1-M6 and `bhāṭakam` the noun this module opens. `kāryālayasya` is still written, in
S07 (`kāryālayasya samīpe pustakālayaḥ asti`), so the planned fourth shape of that row exists. No
change was made to `tools/course-briefs.ts`, because nothing in it is false.

---

## 76. Decisions that could look like bugs

1. **`mahyam` is tagged `delta` at M6-S01 and `free` everywhere else.** It is a reused surface —
   L1-M1's `aham` row, which shipped `aham`, `mama` and `mahyam` — so `free` is what it usually
   deserves. At S01 the DELTA of the module is the frame that word carries, and the tag is the
   teaching signal rather than an ownership claim. No surface is opened by it.
2. **Word rows whose `display` is not the token above them.** `śiraḥ` sits over `śirasi`,
   `kāryālayaḥ` over `kāryālayam`, `janaḥ` over `janāḥ`, `gacchati` over `gatavān`. That is the
   course's rule since L1: a row shows the citation form and lists the shapes, and the index maps
   each shape to the row. L3-M5's `uktavān` over `uktavatī` is the precedent.
3. **M6 keeps every clause in the PRESENT and M7 mostly does too**, including inside accounts of
   things that happened. This is not laziness: the imperfect is refused course-wide and there is no
   past of `asti` in the index, so "my head hurt" cannot be written. M10-S03's `trap` says so out
   loud — the account is past and its first and last sentences are present, because a pain and a
   feeling are true now.
4. **M8's two mistake plates carry sandhi and an avagraha.** `kutrāsti` and `kāryālaye 'sti` are
   exactly the forms every other field of this course refuses. A plate is the one field the word
   index never reads (`src/course/types.test.ts` scopes the pada checks to `pada = true`, which is
   every surface except a plate), and this is the module where the temptation is real, so the wrong
   thing is shown once, in the one place showing it is free.
5. **M9-S08 is a sentence nobody says**, and its `usage` admits it: `janaḥ mandiram gacchati, janāḥ
   api mandiram gacchanti`. The module's delta is an ENDING, and the only way to show an ending is
   to put its two shapes in one breath with everything else held still.
6. **M10's accounts mix tenses on purpose.** A past narration with a present feeling at the end
   (`ante mahyam sukham asti`) is the shape the envelope leaves available, and it is also what a
   speaker means. A learner who reads it as a tense error has not yet noticed that the feeling is
   still going on.
7. **M10-S09 is a FUTURE account and carries no participle at all.** Its `trap` is that nothing in
   it says whether the speaker is a man or a woman — which is true, and is the sharpest possible
   demonstration of where gender actually lives in this language.
8. **M10-S09's third variation is told by `vayam` and is in the PRESENT only.** L2-M6's "we" has no
   participial past to go with it, because the plural participial past is written nowhere, so an
   account of what two people DID cannot be written in this course. The `changed` line says so.
9. **Thirteen pool items per module, not twelve.** #292's bar is twelve; the extra one costs
   nothing and every wave on this course has shipped thirteen.
10. **M10's pool items are five-sentence accounts rather than eight-sentence ones.** Eight is a
    ceiling and not a target (rule 1), and a comprehension item is read once, not studied.

---

## 77. Every comprehension token resolves to the RIGHT row

Each of the **65 pool items** was walked token by token against the emitted cumulative index for its
own module, and for each token the **word row it lands on** was read out of the module and sentence
the index names — the check PRD §6.3 does not make. **0 unresolved, 0 mis-seated.** The 50 heroes
and all 150 variations were walked the same way, with the same result.

**One pool item was WITHDRAWN in draft because it resolved cleanly to a row whose gloss was false of
the sentence.** `L3-M8-C10` first read `yaḥ kāryālayaḥ atra asti saḥ navaḥ` ("the office that is
here is new"). Every token resolved; `saḥ` landed on **L1-M5's `saḥ` row, glossed "he · that man"**,
and the `saḥ` in that sentence is an OFFICE. Resolving is not the same as resolving to something
true, and the build only checks the first — the defect the last wave was warned about, found once
here. The item now reads `yaḥ chātraḥ kāryālayam gacchati saḥ mama bhrātā`, where `saḥ` is a person
and the row's gloss is true of it. **Every other correlative in these five modules was re-checked
against the same test**, and each one heads a person: `chātraḥ` (M6-S10), `bālā` (M6-C07), `janaḥ`
(M9-S09, M9-C08, M10-S04, M10-C13), `adhyāpakaḥ` (M10-S01, M10-S08, M10-C02). The neuter
correlatives `yat … tat` all head an inanimate thing, which is what `tat`'s gloss "that (thing) ·
it" says.

The seatings worth recording, because they are the ones where a reader might expect a different row:

- **`mahyam` and `mama` → L1-M1's `aham` row** (both live in that row's `forms`). Between them they
  are the commonest tokens of the whole wave: `mahyam` in twenty-one items, `mama` in nineteen.
- **`rāmāya` → L1-M1's `rāmaḥ` row** (M6-C02) and **`rāmasya` → the same** (M7-S01's variation,
  M8-S10's variation). The name is a row of its own from M1, which is why it is not counted by the
  ratchet.
- **`śirasi`, `udare`, `haste`, `pāde` → L3-M7's `śiraḥ`, `udaram`, `hastaḥ`, `pādaḥ` rows.** Each
  row's gloss is the body part and each is true of the locative that lands on it.
- **`kāryālayam`, `kāryālaye`, `kāryālayasya` → L3-M8's `kāryālayaḥ` row**, glossed "office" — true
  of all four shapes.
- **`patram` and `pramāṇapatram` → TWO SEPARATE ROWS**, which is §7 of the briefs paying off: the
  compound donates nothing, and M8-C13's `patram` lands on the bare row rather than on the compound.
- **`janāḥ` → L3-M9's `janaḥ` row** ("person"), the same shape of seating as `chātrāḥ` → L1-M8's
  `chātrau` row ("two students · students") and `phalāni` → L1-M8's `phale` row.
- **`khinnā`, `santuṣṭā`, `asvasthā`, `kruddhā`, `bhītā`, `vaidyā` → their masculine citation rows.**
  Every one is the right lexeme in the right gender.
- **`gatavān`, `gatavatī`, `gamiṣyāmi`, `gacchāmi` → L1-M2's `gacchati` row**; `khāditavatī`,
  `khādiṣyāmi`, `khādāmaḥ` → L1-M4's `khādati`; `pītavān`, `paṭhitavatī`, `likhitavān`, `kṛtavatī` →
  their L1-M4 rows. **`gatavān` is L1-M2's and NEVER L1-M5's** — L1-M5's whole delta is `hyaḥ`,
  `saḥ` and `sā`, and it owns no participle at all.
- **`uktavatī` → L3-M5's `uktavān` row**, thirteen times across M7, M9 and M10, and every one of
  them is a person who spoke rather than the narrator.
- **`jānāmi` (M10-S08) and `icchāmi` → rows seated on the first-person display**, which is what
  L2-M8 and L1-M3 taught first. `jānāti` was deliberately NOT used this wave: M8's draft
  `saḥ mām jānāti` was rewritten to `saḥ mama mitram` so that no token in these five modules lands
  on a row glossed "I know" while meaning "he knows".

`L3-M10-C12` is the item worth its own line: five sentences, a reported line carrying an L3-M4
optative inside an L3-M5 quote (`bhavān adya gṛhe paṭhet iti mātā uktavatī`), and twenty-two tokens
landing on rows from L1-M1, L1-M2, L1-M4, L1-M6, L1-M9, L2-M2, L2-M8, L2-M10, L3-M4, L3-M5 and
L3-M6 — eleven modules across three levels, which is what a closing module's comprehension should
look like.

---

## 78. Sanskrit that was deliberately NOT written

Every form below was wanted by a draft of one of these five modules and left out. Each is recorded
with the reason, because a deferral with no owner is how a course loses a decision.

**Forms that do not exist in this course's index, caught by grepping the fold — or, once, by the
build:**

- **`paṭhāmaḥ`** — the first-person plural of `paṭhati`. **Written into an M10 variation and caught
  by the ratchet**, §74. The three `-āmaḥ` forms this course has are `gacchāmaḥ` (L2-M6),
  `khādāmaḥ` (L2-M6) and `paśyāmaḥ` (L2-M6), and no other verb has one.
- **`bhaviṣyanti`** — a third-plural future. An M10 draft wanted "there will be lamps there" and it
  was removed before any build; this course has `gamiṣyati`, `kariṣyati` and the four first-person
  futures, and no plural future at all.
- **`āgacchati`** — checked a third time and still absent. L2-M1 has `āgacchatu` and L3-M1 has
  `āgatya`; M7 and M10 both reached for the plain present and both were rewritten.
- **`paśyāmi`** — still absent. An M8 variation wanted "I look at the form" and became `icchāmi`.
- **`pṛcchāmi`** — absent; M8's quoted questions are all `saḥ pṛcchati`.
- **`dadāmi`** — absent. L1-M3 shipped `dadātu` and `icchāmi` and no first-person "give", so M8-S10's
  draft ("I give the form at the office") was rewritten to `icchāmi`.
- **`tiṣṭhati`, `tiṣṭhet`, `tiṣṭhatu`** — absent, and named in M7's brief as the verb an author
  reaches for. `bhavatī gṛhe tiṣṭhet` is written nowhere; M7 advises with `gacchet`, `paṭhet` and
  `khādet`, which are the only three `-et` shapes in the course.
- **`vaidyasya`, `vaidyam`** — absent. An M7 draft wanted `vaidyasya samīpe gatavān` and was
  rewritten; L2-M8 shipped `vaidyaḥ` and `vaidyā` and no oblique shape.
- **`vidyālayasya`** — absent. L1-M6's row is `vidyālayaḥ`, `vidyālayam`, `vidyālaye` and no
  genitive, so an M8 variation became `kāryālayasya purataḥ mārgaḥ asti`.
- **`gṛhāt`** — absent; the only ablatives in the course are L2-M9's `jalāt` and `phalāt`.
- **`tasya`, `tasyai`, `tām`, `yām`** — absent. M8's "his form" became `rāmasya patram`, and the
  feminine accusative of the correlative set stays unopened as #617 ruled.
- **`ayam`, `iyam`** — still absent, so every `idam` in these five modules sits on a neuter noun
  (`pustakam`, `bhojanam`).
- **`mātuḥ`, `pituḥ`** — absent; M6's "my mother's" became `mama mātā` as a separate nominative.
- **`anyat`, `sarvatra`, `kevalam`, `āvaśyakam`, `krodhaḥ`, `āpaṇam`, `nayati`, `dhārayati`,
  `gṛhṇāti`, `prāpnoti`** — none is in the fold; each was reached for once and dropped.
- **`pṛṣṭavatī`, `śrutavatī`, `dattavān`, `gṛhītavān`, `prāptavān`, `upaviṣṭavān`** — participial
  pasts of verbs whose participle this course has never opened. **The course has exactly seven
  `-tavān`/`-tavatī` pairs** (L1-M2's `gatavān` and L1-M4's five, plus L3-M5's `uktavān`), and an
  account may use those and nothing else.
- **`adhikā`** — the feminine of `adhikam`, which a big pain would need. Not written, so **M7 grades
  no pain at all**, which is also what its brief says.
- **`vastrāṇi`, `dīpān`, `utsavam`, `patrasya`, `pramāṇapatrasya`** — shapes outside the `forms`
  lists the briefs plan. Two M9 drafts wanted the accusatives and an M8 draft wanted
  `patrasya śulkam kiyat?`, which became `kāryālaye śulkam kiyat?`.
- **`ye`, `yāḥ`** — the plural relative. An M9 draft wanted "the people who are there" and was
  rewritten to the singular `yaḥ janaḥ tatra asti saḥ santuṣṭaḥ`.

**Forms the briefs refuse, re-verified absent from every `display`, `variation`, pool item and
`forms` list across all thirty modules** (walked mechanically, not remembered):

every `-si` present including `gacchasi`, `icchasi` and `gamiṣyasi` — all three exist in L1 MISTAKE
PLATES only and in no other field; `tava`, `tubhyam`, `tvām`, `te`; `mā`, which appears in no field
of any module including the plates; **every imperfect** (`abhavat`, `avadat`, `āsīt`) — `abhavat` is
in L2-M8's plate alone, and `āsīt` was wanted three times this wave and written nowhere; the
**productive bare `-ta` participle** (`gataḥ` in L2-M10's plate alone, `kṛtam`, `naṣṭam` in L2-M8's
plate alone); the **vocative**; `svasā`, named again in M6-S05's note as the relationship word L2-M2
did not ship; `mahat`, named in M7's rule 10 as the adjective a big pain would want; `asmi`, present
in two L1/L2 plates and nowhere else; the **plural participial past** (`gatavantaḥ`, `uktavantaḥ`),
named in M10's rule 10 and in S09's third variation as the reason an account cannot be told by two
people; every bare-stem imperative but L2-M1's `āgaccha`; and **every optative cell beyond the three
`-et` shapes** — `gaccheyam`, `kuryāt`, `likhet`, `vadet` and every dual and plural, with `gacchema`
appearing in L2-M6's and L3-M4's plates alone. **`tvam` is still at exactly one display in the whole
course**, L2-M1-S04's, verified by walking every display, variation, pool item, `forms` list and
mistake plate in all thirty modules.

---

## 79. Open questions for the fluent-speaker gate — continuing from 141

The gate is a **fluent saṃskṛta-sambhāṣaṇam speaker or a Sanskrit teacher**, and it is **UNMET**.
Questions 1–141 are still open. These sixteen are this wave's, and they close the level without
closing one of them.

142. **`mahyam duḥkham asti` as the everyday "I am sad".** The module's premise. Confirm a speaker
     really says it of an ordinary bad mood rather than of grief, and say whether `duḥkham` is as
     heavy in speech as "sorrow" is in English — M6-S01's own note claims it is not.
143. **`bhītaḥ` and `kruddhaḥ` heard as adjectives.** The whole justification for opening them.
     Confirm a speaker hears `aham bhītaḥ` as "I am afraid" and not as "I was frightened", and say
     whether either one drags its participle sense along.
144. **`cintā` on the dative frame.** Confirm `mahyam cintā asti` is how worry is said, and whether
     a feminine noun in that frame sounds any different from `duḥkham` or `bhayam`.
145. **Which question a speaker actually asks.** M6 writes both `kim bhavate duḥkham asti?` and
     `kim bhavān khinnaḥ?`. Confirm both are said, and say which one a person reaches for first.
146. **`mama śirasi vedanā asti` against a compound.** The largest question of M7. Confirm this is
     the ordinary sentence and say whether a speaker would more often say something built on a
     compound like `śirovedanā` — which this course cannot write, because it would be a new key.
147. **`śirasi` in speech.** Confirm the `-s` stem locative is used unsimplified in sambhāṣaṇam, and
     that `śire` is heard as wrong rather than as colloquial.
148. **The medicine verb.** M7 rule 7 names the gap rather than guessing. Say what a speaker
     actually uses for taking medicine, so a later level can open it honestly.
149. **`rogaḥ` against `vyādhiḥ`.** M7-S09 puts `rogaḥ` in the doctor's mouth. Confirm that is the
     word a speaker hears at a clinic, and name the commoner one if it is not.
150. **The four administrative nouns.** `kāryālayaḥ`, `pramāṇapatram`, `bhāṭakam`, `śulkam`. Confirm
     each is current in spoken use, and say which of them a speaker would replace with an English
     or regional word in practice — M8's rule 1 tells a learner they are modern and real, and that
     is the claim most in need of checking.
151. **`gṛhasya bhāṭakam kiyat?` as the rent question**, and whether a counter keeps pada form in
     speech at all. It does not, and M8-S01's `sound` line says the join is heard; confirm the line
     describes what is actually said.
152. **`janāḥ` as the everyday "people".** M9 leans on it in nine sentences. Confirm it is the
     natural subject for a crowd, and say whether a speaker would use `sarve` or something else.
153. **`utsavaḥ` with no festival named.** Confirm a speaker really does talk about "the festival"
     without naming it when both people are standing in it, so that M9 is describing speech rather
     than dodging the ratchet.
154. **`miṣṭānnam` and `dīpaḥ` as everyday words.** Confirm both are what a speaker says rather
     than what a textbook writes.
155. **The eight-sentence account.** Confirm the four sequencers still read at eight sentences
     rather than sounding like a list, and say how many of them a speaker would actually use —
     M10's accounts carry four across eight sentences.
156. **The whole-account gender fork at eight sentences.** Confirm that five `-tavatī` endings with
     one `-tavān` in the middle (M10-S06) reads as correct rather than as a slip, and that the
     report really never forks with the narrator.
157. **Naturalness of the 65 pool items and the 50 accounts**, as questions 12, 26, 47, 66, 90, 113,
     127 and 141 asked of the pools below them. They are grammatical by construction and
     recombined from the cumulative index; an LLM cannot hear which of them nobody would say.
     `aham na kruddhaḥ, kintu khinnaḥ.`,
     `mama haste vedanā na asti, kintu mama pāde vedanā asti.`,
     `janaḥ mandiram gacchati, janāḥ api mandiram gacchanti.` and
     `mama dhanam alpam, tathāpi aham pramāṇapatram icchāmi.` are the four most worth a second
     opinion.

---

## 80. Verification run for this change

```
npm run content:validate                              → CONTENT 480/480 ok
                                                        (en-sa/L3-M6.json … L3-M10.json all ok)
npm run content:build -- --with-unverified --with-fixtures
                                                      → en-sa: 30 modules
                                                        (L1-M1..M10, L2-M1..M10, L3-M1..M10)
                                                          index L3-M6:  283 surfaces
                                                          index L3-M7:  294 surfaces
                                                          index L3-M8:  303 surfaces
                                                          index L3-M9:  317 surfaces
                                                          index L3-M10: 317 surfaces (delta EMPTY)
                                                        NINE `shown but untaught` lines in the whole
                                                        build and NONE of them en-sa's — still zero
                                                        at thirty rungs, and still the only course
                                                        in the catalogue without one
npx tsc --noEmit                                      → clean
npx prettier --check <the nine files this change touches>
                                                      → All matched files use Prettier code style!
npx eslint src/course/types.test.ts tools/content-build.test.ts
                                                      → clean
npm run content:build && npm run fonts:build          → en-sa: 30 modules
                                                        (L1-M1..M10, L2-M1..M10, L3-M1..M10) strict;
                                                        FONTS 15/15 ok — mukta 331376 bytes
npx vitest run   (after that STRICT build)            → see below
```

**`tools/font-coverage.test.ts` PASSES after the strict build**, which is again why the suite is run
in that order: it is red only after `--with-unverified --with-fixtures`, and its four characters
(`U+000A`, `$`, `×`, `•`) predate all en-sa work. This wave added **one new character to the emitted
Devanagari** — `औ` U+0914, from `auṣadham` — and Mukta covers it: the generated cut came out at
**331376 bytes, byte-for-byte the size #618 measured**, so the subset did not grow and no fifth
uncovered character was introduced. Every respelling in the five `sound` lines is ASCII; the IAST
that appears in the English half of a `sound` line is the ordinary lowercase set (`ā ī ū ṛ ḥ ṃ ś ṣ
ṇ ṭ ṅ`), and **no capitalised IAST letter** was written anywhere (the `Ṛ` U+1E5A failure mode of
#613 §33.8, checked mechanically across all five files).

`scripts/generate-splash.test.ts` is the one remaining red, measured rather than assumed and
pre-existing on this container's rasterizer — it fails identically on a stashed tree.

`scripts/verify.sh` was again deliberately NOT run: it stops at the first failing stage and would
never reach CONTENT while `scripts/generate-splash.test.ts` is red on this host, so the stages were
run individually, as #610, #613, #614, #615, #617 and #618 did.

### Pinned inventories updated by this change

- `src/course/types.test.ts` — `MODULE_FILES` gains `content/en-sa/modules/L3-M6.json` …
  `L3-M10.json`; the case title's count moves 475 → 480 and its wording to "en-sa's three complete
  levels (#619)". **The en-sa decisions case itself is unchanged** — the intimate-set ban and the
  `neutral` register assertion are both scoped to `L1`, and these five modules chip `neutral` on all
  fifty sentences and write no intimate pronoun at any level.
- `tools/content-build.test.ts` — `AUTHORED` gains `L3-M6` … `L3-M10`; the four
  `en-sa: 25 modules (L1-M1..M10, L2-M1..M10, L3-M1..M5)` assertions become
  `en-sa: 30 modules (L1-M1..M10, L2-M1..M10, L3-M1..M10)`; three case titles move to "L1..L3 out of
  draft and L4..L5 still placeholder lists", "three complete levels of ten" and "30 modules and 30
  indexes". **The level-draft predicate now names the finished levels explicitly** —
  `const FINISHED = new Set(['L1', 'L2', 'L3'])` in place of the two-way `!==` chain — so the next
  level to close extends a list rather than lengthening a boolean.
- `tools/shown-surfaces.test.ts` — **untouched.** `'en-sa': 0` still holds.
- `tools/course-briefs.ts` — **untouched.** No ownership claim in the five module briefs was wrong;
  the one example this wave declined to write is recorded in §75 and is not a defect in the brief.
- `content/en-sa/levels.json` — `L3-M6` … `L3-M10` lose `draft: true` and gain `hasContent: true`,
  **and L3's own level `draft` and `draftNote` are REMOVED**, because all ten of its rungs are
  authored. L4 and L5 keep theirs and are otherwise untouched.
- `README.md` — the en-sa paragraph (module count, surface count, the five new rungs and the closing
  of L3), the ratchet paragraph (M9's festival ruling), the review-doc line (nine waves, eighty
  sections), and the live-site module total (475 → 480).

`git diff --stat content/en-sa/modules/L1-M1.json … L1-M10.json content/en-sa/modules/L2-M1.json …
L2-M10.json content/en-sa/modules/L3-M1.json … L3-M5.json` is **EMPTY**, and so is `git diff --stat`
over the other nine courses. The only tracked file this wave modifies under `content/` is
`content/en-sa/levels.json`; everything else it adds is new.

---

## Wave 10 — L4-M1 · L4-M2 (#621)

**Date:** 2026-09-12 · **Reviewer:** Claude Opus 5, LLM review, authorised by the repo owner ·
**Bar:** LLM review plus owner authority. The fluent-speaker gate of §9 is still **UNMET**.

---

## 81. What was authored

Two modules, the first two rungs of Level 4, authored strictly in ladder order with a rebuild
between them: M1 against L3-M10's real cumulative index (317 surfaces), M2 against M1's (329).

| | `L4-M1` "Explaining how" | `L4-M2` "Cause and consequence" |
| --- | --- | --- |
| job | steps and instructions in order, and what they are for | why things happen and what follows, across a paragraph |
| `prerequisites` | `[]` | `["L4-M1"]` |
| sentences · variations · word rows | 10 · 30 · 53 | 10 · 30 · 75 |
| rules · pool · `exitTest` | 10 · 13 · 1/2 | 10 · 13 · 1/2 |
| bounds | 3–12 words, `newWordCap` 25 | 3–12 words, `newWordCap` 25 |
| enrichment | FULL (M1–M3 rule) | FULL (M1–M3 rule) |
| surfaces opened | **12** | **7** |
| index after | 329, `maxSpan` 1 | 336, `maxSpan` 1 |

**M1 opens twelve surfaces and eleven of them are shapes of verbs the course already teaches.**
Five infinitives of purpose — `kartum`, `paṭhitum`, `khāditum`, `pātum`, `likhitum` — each a row
HERE with a note back at L1-M4, beside L1-M2's `gantum`, which is REUSED with no new row and is
written into S06's third variation so the point-back is visible rather than merely claimed. Three
gerundives and no more, all impersonal neuter: `gantavyam` ← L1-M2's `gacchati`, `kartavyam` ←
L1-M4's `karoti`, `paṭhitavyam` ← L1-M4's `paṭhati`. Two instrumentals of the listener, `bhavatā`
and `bhavatyā`, rows here with notes back at L1-M2's `bhavān`/`bhavatī`. One fresh lexeme,
`kramaḥ`, carried on one row with `kramam` in its `forms` — two surfaces, one row.

**M2 opens seven surfaces and no connective at all**, exactly as its brief asks. Three cause
ablatives that are shapes of older nouns — `bhayāt` ← L3-M6's `bhayam`, `duḥkhāt` ← L3-M6's
`duḥkham`, `rogāt` ← L3-M7's `rogaḥ` — plus `vṛṣṭiḥ`/`vṛṣṭeḥ` on one row (the i-stem, paradigm not
opened, L3-M7's `śiraḥ`/`śirasi` ruling reused), `kāraṇam` and `pariṇāmaḥ`. `yataḥ` and `ataḥ` are
L1-M9's and are reused unchanged; what M2 teaches about them is placement, not meaning.

`registers` are `neutral` on all twenty sentences. The `formal` chip is still unwritten anywhere in
the course and belongs to L4-M7.

---

## 82. What was checked, mechanically

```
npm run content:validate                              → CONTENT 482/482 ok
npm run content:build -- --with-unverified --with-fixtures
                                                      → en-sa: 32 modules
                                                        (L1-M1..M10, L2-M1..M10, L3-M1..M10, L4-M1..M2)
                                                          index L4-M1: 329 surfaces (delta 12)
                                                          index L4-M2: 336 surfaces (delta  7)
                                                        NINE `shown but untaught` lines in the whole
                                                        build and NONE of them en-sa's
npx tsc --noEmit                                      → clean
npx prettier --check <the five files this change touches>
                                                      → All matched files use Prettier code style!
npx eslint src/course/types.test.ts tools/content-build.test.ts
                                                      → clean
npm run content:build && npm run fonts:build          → en-sa: 32 modules, strict;
                                                        FONTS 15/15 ok — mukta 331376 bytes
npx vitest run   (after that STRICT build)            → 906/907, one known red (§89)
```

**The Devanagari was generated, not typed.** A transliterator was written for this wave and
validated before a single new `script` line was authored: it reproduces **all 1590 `script` lines
already shipped across the thirty L1–L3 modules byte for byte**, displays, variations and pool items
alike, and every `script` line in M1 and M2 is its output. That is why `mukta` came out at **331376
bytes, byte-for-byte the size #618 and #619 measured** — the subset did not grow, so these two
modules introduced no Devanagari character the cut did not already carry.

### 82.1 The build warning, and why the numbers are what they are

`63 of 116` romanized surfaces in M1 and `85 of 138` in M2 carry no `script` line. This is the same
expected warning §2.1 explained on the first wave and it counts `deconstruction.words` and
`mistake.display`, which `docs/121` §9.1 deliberately keeps the quiet line OFF. Every surface a
learner reads whole — all 20 sentences, all 60 variations, all 26 pool items — carries it, and
`src/course/types.test.ts` asserts exactly that, including the negative half: a mistake plate that
carried a `script` line would fail.

---

## 83. The ratchet is still at ZERO, at thirty-two rungs

`tools/shown-surfaces.test.ts` is **untouched** and `'en-sa': 0` still holds. The build prints nine
`shown but untaught` lines and not one of them is en-sa's; the other nine courses sit between 6 and
30, and three of those lists open on a proper noun (`प्रिया`, `priyā`, `thomas`, `anna`) which is
exactly the thing CLAUDE.md warns is COUNTED rather than exempt.

**These two modules write no proper noun at all.** `rāmaḥ` and `sītā` remain the only two names in
the course and neither appears here. Two places wanted one and got a common noun instead: M1-S09's
instruction reads `prathamam kramam paśyatu` rather than naming a person to instruct, and M2-S03's
absent colleague is `saḥ`. That is L3-M9's ruling, held for a fourth level.

---

## 84. Every comprehension token resolves to the RIGHT row

The build only enforces that a pool token RESOLVES (PRD §6.3). Two items have been withdrawn on
this course in earlier waves for landing on a row whose note was false of the line, so the evidence
is the word row every token lands on, read out of the emitted
`public/content/en-sa/index/L4-M<n>.json` and not out of a paradigm. **All 26 pool items were walked
token by token; 66 distinct surfaces across M1 and 54 across M2, and every one resolves.**

**`L4-M1`, thirteen items, with the landing row and what it says:**

| item | tokens → landing row (gloss) |
| --- | --- |
| C01 | `aham`→L1-M1 "I · me" · `annam`→L2-M5 "food · cooked rice" · `khāditum`→**L4-M1** "to eat" · `gṛham`→L1-M6 "house · home" · `gacchāmi`→L1-M2 `gacchati` "goes · is going" |
| C02 | `kṛpayā`→L2-M1 "please" · `jalam`→L1-M3 "water" · `pātum`→**L4-M1** "to drink" · `atra`→L1-M7 "here" · `upaviśatu`→L2-M1 "please sit · let (him) sit" |
| C03 | `mayā`→L2-M6 "by me · with me" · `śvaḥ`→L1-M6 "tomorrow" · `kāryālayam`→L3-M8 `kāryālayaḥ` "office" · `gantavyam`→**L4-M1** "must be gone to" |
| C04 | `bhavatā`→**L4-M1** "by you (to a man)" · `idam`→L1-M1 "this · this thing" · `pustakam`→L1-M1 "book" · `paṭhitavyam`→**L4-M1** "must be studied" |
| C05 | `sā`→L1-M5 "she · that woman" · `pustakam`→L1-M1 "book" · `paṭhitum`→**L4-M1** "to study · to read" · `pustakālayam`→L1-M7 `pustakālayaḥ` "library" · `gatavatī`→L1-M2 `gacchati` "goes · is going" |
| C06 | `aham` · `patram`→L3-M8 "paper · a form · a letter" · `likhitum`→**L4-M1** "to write" · `kāryālayam` · `gacchāmi` |
| C07 | `kramaḥ`→**L4-M1** `kramam` "step · procedure" · `na`→L1-M2 "no · not" · `dīrghaḥ`→L2-M2 "tall · long" · `ataḥ`→L1-M9 "so · therefore" · `mayā` · `adya`→L1-M4 "today" · `kāryam`→L3-M2 "work · the thing to be done" · `kartavyam`→**L4-M1** "must be done" |
| C08 | `prathamam`→L2-M10 "first" · `jalam` · `pātum` · `gacchatu`→L2-M4 "please go · let (him) go" · `tataḥ`→L2-M10 "then · after that" · `bhojanam`→L2-M5 "meal · food" · `khādatu`→L2-M5 "please eat · let (him) eat" |
| C09 | `bhavatyā`→**L4-M1** "by you (to a woman)" · `adya` · `vidyālayam`→L1-M6 `vidyālayaḥ` "school" · `gantavyam` |
| C10 | `mama`→L1-M1 `aham` "I · me" · `bhaginī`→L2-M2 "sister" · `dugdham`→L2-M5 "milk" · `pātum` · `gṛham` · `gatavatī` |
| C11 | `pustakam` · `paṭhitvā`→L3-M1 "having read · having studied" · `mayā` · `kāryālayam` · `gantavyam` |
| C12 | `dhanyavādaḥ`→L2-M1 "thanks · thank you" · `kintu`→L1-M10 "but" · `mayā` · `adya` · `gantavyam` |
| C13 | `adhyāpakaḥ`→L1-M1 "teacher" · `saṃskṛtam`→L1-M1 "Sanskrit — the language" · `paṭhitum` · `vidyālayam` · `gacchati`→L1-M2 "goes · is going" |

**`L4-M2`, thirteen items:**

| item | tokens → landing row (gloss) |
| --- | --- |
| C01 | `vṛṣṭeḥ`→**L4-M2** "rain" · `sā`→L1-M5 "she · that woman" · `adya`→L1-M4 "today" · `gṛhe`→L1-M6 `gṛham` "house · home" · `asti`→L1-M3 "is · there is" |
| C02 | `bhayāt`→**L4-M2** "out of fear" · `aham`→L1-M1 "I · me" · `tatra`→L1-M7 "there" · `na`→L1-M2 "no · not" · `gatavān`→L1-M2 `gacchati` "goes · is going" |
| C03 | `rogāt`→**L4-M2** "because of illness" · `aham` · `hyaḥ`→L1-M5 "yesterday" · `na` · `paṭhitavān`→L1-M4 `paṭhati` "reads · studies" |
| C04 | `mahyam`→L1-M1 `aham` "I · me" · `duḥkham`→L3-M6 "sorrow · unhappiness" · `asti` · `yataḥ`→L1-M9 "because · since" · `pariṇāmaḥ`→**L4-M2** "result · outcome" · `na` · `uttamaḥ`→L2-M3 "excellent · very good" |
| C05 | `adya` · `vṛṣṭiḥ`→**L4-M2** `vṛṣṭeḥ` "rain" · `asti` · `ataḥ`→L1-M9 "so · therefore" · `utsavaḥ`→L3-M9 "festival · celebration" · `na` · `asti` |
| C06 | `duḥkhāt`→**L4-M2** "out of sorrow" · `sā` · `adya` · `na` · `uktavatī`→L3-M5 `uktavān` "said (a man) · has said" |
| C07 | `kim`→L1-M2 "(yes/no marker) · what" · `kāraṇam`→**L4-M2** "reason" · `asti` · `aham` · `na` · `jānāmi`→L2-M8 "I know" |
| C08 | `yataḥ` · `mahyam` · `bhayam`→L3-M6 "fear" · `asti` · `aham` · `tatra` · `na` · `gacchāmi`→L1-M2 "goes · is going" |
| C09 | `saḥ`→L1-M5 "he · that man" · `pratidinam`→L1-M4 "every day · daily" · `paṭhitavān` · `ataḥ` · `pariṇāmaḥ` · `uttamaḥ` |
| C10 | `vṛṣṭeḥ` · `mārgaḥ`→L2-M4 "road · way" · `na` · `uttamaḥ` · `kintu`→L1-M10 "but" · `aham` · `gacchāmi` |
| C11 | `vṛṣṭeḥ` · `janāḥ`→L3-M9 `janaḥ` "person" · `gṛhe` · `santi`→L3-M9 "are (more than one)" |
| C12 | `aham` · `santuṣṭaḥ`→L1-M9 "content · pleased" · `yataḥ` · `kāraṇam` · `jānāmi` |
| C13 | `rogāt` · `mama` · `mātā`→L2-M2 "mother" · `adya` · `mandiram`→L3-M9 "temple" · `na` · `gatavatī` |

### 84.1 The five resolutions worth arguing with, and why each was allowed to stand

1. **`kramaḥ` in M1-C07 was a real defect and was fixed before the module shipped.** The first draft
   glossed the S09 row `step (as the thing looked at)` — a case-specific cue, correct for the
   accusative it sat on. `kramaḥ` and `kramam` are ONE row, and FIRST OCCURRENCE WINS, so the
   nominative `kramaḥ` opening C07 landed on a row that said it was the object of a looking. **This
   is the exact shape of the two items withdrawn in earlier waves.** The cue on both rows is now
   `step · procedure`, case-neutral, and the case lives in the note where a case note belongs.
2. **`mama` lands on L1-M1's `aham` row, glossed "I · me".** In C10 it means "my". The row's NOTE
   names the shape outright — "*aham does the acting, mama is 'my / of me', mahyam is 'to me'*" —
   so the Why panel answers the tap correctly. This resolution is course-wide and thirty rungs old,
   and L4 may not edit L1-M1 to change it.
3. **Every participle lands on its verb's row, glossed with the third-singular present.**
   `gatavatī`→`gacchati` "goes · is going", `paṭhitavān`→`paṭhati` "reads · studies". Each of those
   notes enumerates the participles by name ("*gatavān / gatavatī (went)*"), so the tap resolves to a
   row that states the shape it was tapped on. Also course-wide.
4. **`uktavatī` in M2-C06 lands on L3-M5's row glossed "said (a man) · has said".** The cue alone
   does not fit a woman speaking; the note does, and explicitly — "*uktavatī is the shape when a
   woman spoke*". L3-M5-C06 and L3-M10-C12 already ship the identical resolution, so changing the
   pool item here would make this wave inconsistent with three shipped modules rather than fixing
   anything. **Recorded rather than silently accepted:** if a future wave narrows the rule to the
   CUE alone, this item and the two L3 ones fall together and L3-M5's row is the fix.
5. **`janāḥ` in M2-C11 lands on L3-M9's `janaḥ`, glossed "person", in a plural sentence.** The note
   is "*One person is janaḥ and people are janāḥ*", which is the fact the tap needs.

---

## 85. Decisions that could look like bugs

### 85.1 M1 opens the infinitive productively and the gerundive in three cells, and the asymmetry is the decision

Both are "non-finite verb + purpose or obligation" and an author would naturally open both the same
way. The level decided otherwise and the module obeys: five infinitives, because the course already
half-owns the family through L1-M2's `gantum` and each new one is a shape of a verb L1-M4 taught;
three gerundives, because two suffixes for one meaning would spend the cap twice. `-anīya` is named
in rule 10 and written in no `display`, no variation, no pool item and no `forms` list.

### 85.2 M1-S06, S08, S09 and S10 contain no nominative at all, and that is correct

A learner counting subjects in `bhavatyā saṃskṛtam paṭhitavyam` finds none. The trap line on each of
those sentences says so out loud rather than leaving it to be discovered, because the English frame
("you have to study") has a subject in it and the transfer error is to supply one. Three of the four
mistake plates in the gerundive sentences are exactly that error, made three different ways —
`aham … gantavyam` (S06), `bhavatī … paṭhitavyam` (S08) and the instrumental pulled in front of an
imperative (S09).

### 85.3 The `-tavān` / `-tavyam` pair is taught in a rule, a trap, a mistake plate and a word note

Four places for one fact is more than this course usually spends. The brief asked for it by name and
the reason is mechanical: `gatavān` and `gantavyam` differ by one letter in the middle, the learner
has spent three levels on `-tavān`, and reading a gerundive as a past turns an instruction into a
report. M1-S07's plate is the pair in one line: `bhavatā idam kāryam kṛtavān` for
`bhavatā idam kāryam kartavyam`.

### 85.4 M2's S01 and S02 are the same sentence twice, on purpose

`vṛṣṭeḥ aham adya vidyālayam na gatavān` and
`aham adya vidyālayam na gatavān, yataḥ vṛṣṭiḥ asti` say the same thing. That is the module's whole
lesson in two lines: English has one *because* for a clause and one *because of* for a noun, while
Sanskrit has a connective for the clause and a CASE for the noun. S01's mistake plate is the two
welded together — `vṛṣṭeḥ yataḥ aham …` — which is the shape a learner assembles out of the halves.
It is the same technique L1-M6's S01/S02 pair used and §24.4 recorded.

### 85.5 M2 writes `mistake.display` `phalam uttamam, yataḥ …`, which is real Sanskrit

S08's plate is grammatical and idiomatic Sanskrit: `phalam` genuinely does mean "result". The plate
is wrong about THIS COURSE, not about the language, and its `why` says exactly that — a learner
tapping it would be shown L1-M1's note about fruit, which is false of the sentence in front of them.
That is the `api` ruling of L1-M10, the `vā` ruling of L2-M9 and the `yat` ruling of L3-M2 made a
fourth time, and it is the first time one of those rulings has been put ON a plate rather than only
into rule prose.

### 85.6 M2's three-sentence sentences

S09 and S10 are three sentences inside one `display`, which L2-M10 and L3-M10 already do. The
per-clause word counts are 3/4/6 and 5/4/5, all inside the declared 3–12. The bound is per sentence
and not per `display`, which is how every account in this course has been counted since L2-M10.

### 85.7 `vṛṣṭiḥ` and `vṛṣṭeḥ` share one row and the cue is "rain" with no case in it

L2-M9 put the case IN the cue (`jalāt` = "than water · from water"), and that works because `jalāt`
is a row of its own. `vṛṣṭiḥ`/`vṛṣṭeḥ` is one row carrying two surfaces, so a cue naming either case
would be false of the other one half the time — the `kramaḥ` defect of §84.1 in a different word.
The cue is the lexeme and the note carries the case, per row, per sentence.

---

## 86. The briefs' ownership plan, and the two places it was corrected

**Every ownership claim in both briefs was grepped against the folded index before a word was
written**, by resolving each claimed surface through all thirty emitted delta files rather than
reading the last one — whose delta is EMPTY. The fold came to **317 surfaces**, which is what
`L3-M10.json`'s `surfaceCount` says, so the brief's arithmetic checks out independently.

**The named failure mode — a paradigm cell assumed to exist because its neighbours do — was hunted
for and not found this wave, and the brief's own correction was verified.** `tools/course-briefs.ts`
reports that L3-M4's brief named FOUR optative cells while only THREE were authored. Confirmed
independently: `gacchet`, `khādet` and `paṭhet` resolve; **`likhet` is ABSENT**. Every other claim
in both briefs holds exactly:

- `gantum` is L1-M2's, inside `gacchati`'s `forms` — confirmed, so M1 opens no row for it.
- `karoti`, `paṭhati`, `khādati`, `pibati`, `likhati` all carry `forms` with no infinitive and no
  gerundive in them — confirmed, so all ten new verb shapes are rows here.
- `bhavān`/`bhavatī` carry `bhavān, bhavatī, bhavataḥ, bhavatyāḥ` and no instrumental; L2-M5's
  `bhavate` carries `bhavate, bhavatyai` — confirmed, so `bhavatā` and `bhavatyā` are rows here.
- `bhayam`, `duḥkham` and `rogaḥ` all have **empty `forms`** — confirmed, so their ablatives are
  rows here.
- `jalāt` and `phalāt` resolve to L2-M9 rows glossed "than water · from water" and "than fruit ·
  from fruit" — confirmed, which is precisely why M2 writes neither.

**Two corrections to the L4 briefs, both recorded rather than worked around:**

1. **`tools/course-briefs.ts`'s M2 `patterns` contradicts its own notes.** Pattern 2 is
   `yataḥ + <clause> + ataḥ + <clause>`, and the note beside it says the two "are never both written
   for one link". That is the header's rule 1 defect — an example that contradicts the rule next to
   it — and it matters because a brief seeds every future prompt. **Taken as the NOTE has it**: each
   link in these two modules is marked once, `yataḥ` on the cause or `ataḥ` on the consequence and
   never both, which is also what the thirty shipped rungs already do (`mama mātā khinnā, ataḥ
   mahyam cintā asti` at L3-M6-S05; `aham santuṣṭaḥ, yataḥ mahyam cintā na asti` at L3-M6-S09).
   M2's declared pattern 2 is `yataḥ + <clause> + . + <clause>`, which is what S07 writes, and
   M2-S07's mistake plate is the doubled form. **The rule prose was written to be TRUE rather than
   memorable:** it says the second marker adds nothing, not that Sanskrit forbids it — because
   `yataḥ … tataḥ` is a genuine correlative pair and L4-M6's own brief lists `yataḥ … ataḥ` as one
   of the five. A rule claiming ungrammaticality here would have been a slogan, which is the defect
   `docs/08` found three of.
2. **`kāraṇāt` is NOT opened, against the brief's "`kāraṇam` … with `kāraṇāt` in its forms".** The
   brief's own justification is that it lets the course say "for that reason" without a second
   lexeme — and "that reason" needs a demonstrative in the ablative (`tasmāt`, `etasmāt`) which this
   course has never opened and which M2 may not open, since L3-M2 owns the correlative set and a
   cause module may not extend it. A bare `kāraṇāt` is not what a speaker says. So `kāraṇam` ships
   as a one-shape row, the decision is named in M2's rule 5 where a learner meets it, and the module
   opens **seven** surfaces rather than eight. **A Sanskrit form whose bare use you are not sure of
   is a form you do not write.**

---

## 87. Sanskrit that was deliberately NOT written

**Forms wanted by a draft of one of these two modules and dropped after grepping the fold:**

- **`paṭhatu` and `likhatu`** — third-person imperatives of two verbs whose imperative this course
  has never opened. M1's pattern 4 (`V-tvā + N-acc + V-tum + V-tu`) wanted one of them; S05 uses
  L2-M1's `upaviśatu` instead, and M1-C08 uses `gacchatu` and `khādatu`. The `-tu` imperatives that
  exist are `gacchatu`, `khādatu`, `karotu`, `pibatu`, `paśyatu`, `vadatu`, `kathayatu`, `dadātu`,
  `āgacchatu`, `upaviśatu`, `astu` and `kṣamyatām`, and nothing else.
- **`auṣadham pātum`** — M1-C02's first draft was "please go home to take the medicine", and
  **L3-M7's rule 7 explicitly refuses to name a verb for taking medicine** ("*a form you are not
  sure of is a form you do not write*"; open question 148). Pairing the new infinitive with
  `auṣadham` would have closed that question by writing content, which no later wave may do. The
  item became `kṛpayā jalam pātum atra upaviśatu`.
- **`pātavyam`, `likhitavyam`, `khāditavyam`** — a fourth, fifth and sixth gerundive cell, wanted by
  three pool drafts. Three cells was the ruling and three is what shipped.
- **`ayam`, `eṣaḥ`, `prathamaḥ`** — M1 wanted "this is the first step" for `kramaḥ` and has no
  masculine demonstrative and no ordinal. `idam` is neuter-only in this course (§78), so the
  sentence became `kramaḥ dīrghaḥ` with L2-M2's adjective.
- **`tasmāt`, `etasmāt`** — the ablative demonstrative `kāraṇāt` would need. §86 correction 2.
- **`vaidyam`, `vaidyasya`** — M2-C02's first draft was "out of fear he did not go near the doctor";
  L2-M8 shipped `vaidyaḥ` and `vaidyā` and no oblique shape (§78, checked a second time). The item
  became `bhayāt aham tatra na gatavān`.
- **`khinnam`** — the neuter of L1-M9's `khinnaḥ`/`khinnā`, which M2-C04's draft needed for the
  neuter `mitram`. Absent; the item became the L3-M6 dative frame, `mahyam duḥkham asti`.
- **`pariṇāmam`** — the accusative of the noun this module opens. An M2-S06 variation wanted "I do
  not know the result"; it would have been an eighth surface for one variation, and the variation
  became a person-and-tense shift instead.
- **`utsavam`, `āgacchati`, `paśyāmi`, `gṛhāt`** — all four checked again and all four still absent,
  as §78 recorded. No draft of these two modules ended up needing any of them.
- **`vṛṣṭyāt`** — the ablative `vṛṣṭiḥ` would have if it were an a-stem. It is an i-stem and the
  ablative is `vṛṣṭeḥ`; M2's rule 4 names the wrong form so an author cannot reconstruct it.

**Forms the briefs refuse, re-verified absent across all THIRTY-TWO modules** (walked mechanically
over every `display`, `variation`, pool item and `forms` list, with mistake plates reported
separately):

every **`-si` present** — `gacchasi`, `icchasi`, `gamiṣyasi` and `karoṣi` exist in **L1 mistake
plates only** and in no other field of any module; **`tava`, `tubhyam`, `tvām`, `te`** — absent from
every field including every plate; **`mā`** — absent everywhere; **every imperfect** — `akarot` and
`abhavat` in L2 plates only, and **`āsīt` still written nowhere at all**, which is the cell L4-M8 is
chartered to open; **the conditional `agamiṣyat`** — absent; the **productive bare `-ta`
participle** — `gataḥ` and `naṣṭam` in L2 plates only (`pītaḥ` in L2-M3 is the COLOUR "yellow", a
homograph and not the participle of `pibati`, checked rather than assumed); the **vocative** —
`rāma` in one L2-M7 plate and nowhere else; **`svasā`**, **`mahat`** — absent; **`asmi`** — two L1/L2
plates only; the **plural participial past** (`gatavantaḥ`, `uktavantaḥ`) — absent; **every bare-stem
imperative but L2-M1's `āgaccha`** — absent; **`-anīya` in any shape** — absent; and **every optative
cell beyond L3-M4's three** — `gaccheyam`, `paṭheyam`, `paśyeyam`, `syāt`, `kuryāt`, `likhet`,
`vadet`, `gaccheḥ` and every dual and plural are absent, with `gacchema` in L2-M6's and L3-M4's
plates alone. **`tvam` is still at exactly one display in the whole course**, L2-M1-S04's, which is
also the only `forms` list it appears in.

**And the two L2-M9 words this module is forbidden to reuse:** `jalāt` and `phalāt` appear in L4-M2
in **rule 2's English prose only**, naming them as the comparison pair this module does not write.
`phalam` in the RESULT reading appears in **S08's mistake plate only**. Rule prose and mistake plates
are both outside `checkShownSurfaces`, which reads `sentence.display` and `variations[].display` and
nothing else.

---

## 88. Open questions for the fluent-speaker gate — continuing from 157

The gate is a **fluent saṃskṛta-sambhāṣaṇam speaker or a Sanskrit teacher**, and it is **UNMET**.
Questions 1–157 are still open. These thirteen are this wave's, and opening Level 4 closes none of
them.

158. **`mayā gantavyam` as the everyday "I have to go".** The premise of half of M1. Confirm a
     speaker really reaches for the impersonal gerundive for an ordinary obligation rather than for
     something more emphatic, and say whether `mayā` is normally written or normally dropped.
159. **`bhavatā kartavyam` as "you should".** M1's whole answer to saying "you" without a
     second-person ending. Confirm it does not land as an order, and say whether a speaker would
     soften it further in the situations M1-S07 and S08 describe.
160. **The productivity of `-tavya` against `-anīya` in speech.** M1 rule 10 claims `-tavya` is what
     spoken Sanskrit reaches for. Confirm, and say which verbs, if any, a speaker only ever hears
     with `-anīya`.
161. **`pātum` from `pibati`.** The one infinitive in M1 whose stem is unrecognisable from its
     present. Confirm `pātum` is what is said for "to drink" and that `pibitum` is heard as wrong.
162. **`kramaḥ` as the everyday word for a step or a procedure.** M1's only fresh lexeme, and the
     word the whole module's instruction frame hangs on. Confirm it is current in spoken use and
     name the commoner word if it is not.
163. **`likhitum` with `patram` at a counter.** M1-S05 is a clerk's sentence. Confirm the whole line
     — `kṛpayā atra āgatya patram likhitum upaviśatu` — is what is actually said rather than what a
     textbook would compose.
164. **The stacking limit.** M1-S05 puts an absolutive and an infinitive in front of one imperative.
     Confirm three non-finite shapes in one breath is normal and say where a speaker stops.
165. **`vṛṣṭeḥ` as a complete answer.** M2 rule 9 claims a bare cause ablative answers "why?" on its
     own. Confirm, and say whether a speaker would more often say `vṛṣṭiḥ asti` instead.
166. **`bhayāt`, `duḥkhāt`, `rogāt` as everyday causes.** Confirm each is heard, and say which of the
     three a speaker would rebuild as a `yataḥ` clause instead.
167. **Whether `yataḥ … ataḥ` really is avoided for one link.** §86's correction 1 took the brief's
     note over its own pattern and wrote the rule as redundancy rather than as ungrammaticality.
     **This is the question most likely to change content**: say whether a speaker writes both, and
     if so, whether M2's rule 7 should be softened further or dropped.
168. **`pariṇāmaḥ` against `phalam` in speech.** M2 refuses `phalam` in the result reading for a
     mechanical reason inside this course. Confirm `pariṇāmaḥ` is a word a speaker actually uses for
     an outcome, and say how strange it would sound to a speaker that `phalam` is never used so.
169. **`kāraṇam` with no demonstrative.** §86's correction 2. Confirm `kim kāraṇam asti?` is the
     ordinary question, and say what a speaker says for "for that reason" — which is what L4-M6 or a
     later level would need in order to open `kāraṇāt` honestly.
170. **Naturalness of the 26 pool items and the 20 hero sentences**, as questions 12, 26, 47, 66, 90,
     113, 127, 141 and 157 asked of everything below them. They are grammatical by construction and
     recombined from the cumulative index; an LLM cannot hear which of them nobody would say.
     `kramaḥ dīrghaḥ, tathāpi mayā adya kāryam kartavyam.`,
     `dhanyavādaḥ, kintu mayā adya gantavyam.`,
     `vṛṣṭeḥ janāḥ gṛhe santi.` and
     `duḥkhāt aham adya na khāditavān.` are the four most worth a second opinion.

---

## 89. Verification run for this change

```
npm run content:validate                              → CONTENT 482/482 ok
                                                        (en-sa/L4-M1.json ok, en-sa/L4-M2.json ok)
npm run content:build -- --with-unverified --with-fixtures
                                                      → en-sa: 32 modules
                                                        (L1-M1..M10, L2-M1..M10, L3-M1..M10, L4-M1..M2)
                                                          index L4-M1: 329 surfaces, maxSpan 1, delta 12
                                                          index L4-M2: 336 surfaces, maxSpan 1, delta  7
                                                        NINE `shown but untaught` lines in the whole
                                                        build and NONE of them en-sa's — still zero
                                                        at thirty-two rungs, and still the only course
                                                        in the catalogue without one
npx tsc --noEmit                                      → clean
npx prettier --check content/en-sa/modules/L4-M1.json content/en-sa/modules/L4-M2.json
                     content/en-sa/levels.json src/course/types.test.ts
                     tools/content-build.test.ts
                                                      → All matched files use Prettier code style!
npx eslint src/course/types.test.ts tools/content-build.test.ts
                                                      → clean
npm run content:build && npm run fonts:build          → en-sa: 32 modules
                                                        (L1-M1..M10, L2-M1..M10, L3-M1..M10, L4-M1..M2)
                                                        strict; FONTS 15/15 ok — mukta 331376 bytes
npx vitest run   (after that STRICT build)            → 906 passed, 1 failed (see below)
```

**`tools/font-coverage.test.ts` PASSES after the strict build**, which is again why the suite is run
in that order: it is red only after `--with-unverified --with-fixtures`, and its four characters
(`U+000A`, `$`, `×`, `•`) predate all en-sa work. This wave added **no new character to the emitted
Devanagari**: the generated cut came out at **331376 bytes, byte-for-byte the size #618 and #619
measured**, so the subset did not grow and no fifth uncovered character was introduced. Every
respelling in the twenty `sound` lines is ASCII, and **no capitalised IAST letter** appears anywhere
in either file (the `Ṛ` U+1E5A failure mode of §33.8, checked mechanically).

`scripts/generate-splash.test.ts` is the one red, pre-existing on this container's rasterizer and
touching nothing this change goes near — `git status` shows no file under `scripts/` or
`public/splash/` modified.

`scripts/verify.sh` was again deliberately NOT run: it stops at the first failing stage and would
never reach CONTENT while `scripts/generate-splash.test.ts` is red on this host, so the stages were
run individually, as #610, #613, #614, #615, #617, #618 and #619 did.

### Pinned inventories updated by this change

- `src/course/types.test.ts` — `MODULE_FILES` gains `content/en-sa/modules/L4-M1.json` and
  `L4-M2.json`; the case title's count moves 480 → 482 and its wording to "en-sa's thirty-two rungs
  (#621)". **The en-sa decisions case itself is unchanged** — the intimate-set ban and the `neutral`
  register assertion are both scoped to `L1`, and these two modules chip `neutral` on all twenty
  sentences and write no intimate pronoun at any level.
- `tools/content-build.test.ts` — `AUTHORED` gains `L4-M1` and `L4-M2`; the three
  `en-sa: 30 modules (L1-M1..M10, L2-M1..M10, L3-M1..M10)` assertions become
  `en-sa: 32 modules (L1-M1..M10, L2-M1..M10, L3-M1..M10, L4-M1..M2)`; three case titles move to
  "L1..L3 out of draft and L4 opened but still drafted", "three complete levels and two more rungs"
  and "32 modules and 32 indexes". **`FINISHED` is untouched and still `['L1', 'L2', 'L3']`** —
  that is the point of naming the finished levels rather than asking whether any rung has content:
  L4 now carries two authored rungs and keeps its level `draft` flag, which is the partly-authored
  state L2 and L3 each passed through and which the predicate already handled.
- `tools/shown-surfaces.test.ts` — **untouched.** `'en-sa': 0` still holds.
- `tools/course-briefs.ts` — **untouched, and two corrections to it recorded in §86 instead.** The
  briefs are the spec this wave executed; correcting the file is a brief change and belongs to
  whoever revises #620, not to an authoring wave that would then be marking its own homework.
- `content/en-sa/levels.json` — `L4-M1` and `L4-M2` lose `draft: true` and gain `hasContent: true`.
  **L4's own level `draft` and `draftNote` STAY**, because eight of its rungs are unauthored; they
  come off with the tenth, as L2's and L3's did. L5 is untouched.
- `docs/122-llm-review-en-sa-L1-L3.md` → **`docs/122-llm-review-en-sa-L1-L4.md`**, the fifth rename.
- `README.md` — the en-sa paragraph (module count, surface count, the two new rungs and the opening
  of L4), the ratchet paragraph, the review-doc line (ten waves, eighty-nine sections), and the
  live-site module total (480 → 482).

`git diff --stat content/en-sa/modules/` is **EMPTY** — not one L1, L2 or L3 module was touched —
and so is `git diff --stat` over the other nine courses. The only tracked file this wave modifies
under `content/` is `content/en-sa/levels.json`; the two module files are new.
---

## Wave 11 — L4-M3 · L4-M4 · L4-M5 (#622)

**Date:** 2026-09-12 · **Reviewer:** Claude Opus 5, LLM review, authorised by the repo owner ·
**Bar:** LLM review plus owner authority. The fluent-speaker gate of §9 is still **UNMET**.

---

## 90. What was authored

Three modules, the third, fourth and fifth rungs of Level 4, authored strictly in ladder order with
a rebuild between each: M3 against L4-M2's real cumulative index (336 surfaces), M4 against M3's
(340), M5 against M4's (346).

| | `L4-M3` "What might have been" | `L4-M4` "Persuading" | `L4-M5` "Disagreeing well" |
| --- | --- | --- | --- |
| job | regrets and past hypotheticals | make a case, concede a point, hold your ground | soften, hedge, save face |
| `prerequisites` | `["L4-M2"]` | `["L4-M3"]` | `["L4-M4"]` |
| sentences · variations · word rows | 10 · 30 · 89 | 10 · 30 · 72 | 10 · 30 · 68 |
| rules · pool · `exitTest` | 10 · 13 · 1/2 | 10 · 13 · 1/2 | 10 · 13 · 1/2 |
| bounds | 3–12 words, `newWordCap` 25 | 3–13 words, `newWordCap` 25 | 3–13 words, `newWordCap` 25 |
| enrichment | FULL (M1–M3 rule): `sound`, `mistake`, `usage`, `mnemonic` on all ten | 5 `sound`, 4 `mistake`, 10 `usage`, 5 `mnemonic` | 5 `sound`, 4 `mistake`, 10 `usage`, 4 `mnemonic` |
| surfaces opened | **4** | **6** | **3** |
| index after | 340, `maxSpan` 1 | 346, `maxSpan` 1 | 349, `maxSpan` 1 |

**M3 opens four cells and not one new lexeme.** `gaccheyam` ← L1-M2's `gacchati`, `paṭheyam` ←
L1-M4's `paṭhati`, `paśyeyam` ← L2-M4's `paśyati`, and `syāt` ← L1-M3's `asti` — each a row HERE
with a note back, and `syāt`'s note names the whole set out loud (`asti` one is, `staḥ` two are,
`santi` many are, `astu` let it be, `syāt` would be) because a learner who has met them across four
levels has never seen them side by side. The conditional `agamiṣyat` is **refused and named in rule
4**, which is English prose the ratchet does not read. The past anchor is bought, not opened:
`hyaḥ` is L1-M5's, the regret frame `mahyam duḥkham asti` is L3-M6's, and **M3 opens no time word at
all** — `pūrvam`, `paścāt`, `yadā`, `tadā` and `adhunā` stay L4-M6's.

**M4 opens six surfaces across five rows and no connective.** `avaśyam`, `hitam`, `lābhaḥ`,
`matam`/`mate` (ONE row, two surfaces) and `śrutvā` ← L2-M7's `śṛṇoti`, under L3-M1's rule that an
absolutive is a shape of its verb, since L2-M7 shipped none. `satyam` (L3-M3), `kintu` and `tathāpi`
(L1-M10), `yataḥ` and `ataḥ` (L1-M9), `uttamam` (L2-M3), `varam`, `adhikam` and `alpam` (L2-M9) are
all reused with no new row. The module points with L1-M1's `idam` and writes L3-M2's correlative
`tat` **nowhere**, exactly as the brief required.

**M5 opens three, which is the cheapest module of the level and the decision rather than an
accident.** `prāyaḥ`, `bhinnam`, `saṃśayaḥ`. Everything else it hedges with was already on the
ladder: `kadācit` and `manye` and `na tathā` (L3-M3), the third-singular optative (L3-M4), M3's
`syāt`, `kṣamyatām` (L2-M1) and `alam` (L2-M5, named in rule 10 and written nowhere). **M5 opens no
row for a shape of an older lexeme**, so it has no point-backs at all.

`register` is `neutral` on all thirty sentences. The `formal` chip is still unwritten anywhere in
the course and belongs to L4-M7.

---

## 91. What was checked, mechanically

```
npm run content:validate                              → CONTENT 485/485 ok
npm run content:build -- --with-unverified --with-fixtures
                                                      → en-sa: 35 modules
                                                        (L1-M1..M10, L2-M1..M10, L3-M1..M10, L4-M1..M5)
                                                          index L4-M3: 340 surfaces (delta 4)
                                                          index L4-M4: 346 surfaces (delta 6)
                                                          index L4-M5: 349 surfaces (delta 3)
                                                        NINE `shown but untaught` lines in the whole
                                                        build and NONE of them en-sa's
npx tsc --noEmit                                      → clean
npx prettier --check <the eight files this change touches>
                                                      → All matched files use Prettier code style!
npx eslint src/course/types.test.ts tools/content-build.test.ts
                                                      → clean
npm run content:build && npm run fonts:build          → en-sa: 35 modules, strict;
                                                        FONTS 15/15 ok — mukta 331376 bytes
npx vitest run   (after that STRICT build)            → 909/910, one known red (§98)
```

**The Devanagari was generated, not typed**, by the same transliterator #621 wrote. Re-validated
before a single new `script` line was authored: it reproduces **all 1696 `script` lines already
shipped across the thirty-two L1–L4-M2 modules byte for byte**, displays, variations and pool items
alike, and every `script` line in M3, M4 and M5 is its output. `mukta` came out at **331376 bytes,
byte-for-byte the size #618, #619 and #621 measured** — the subset did not grow, so these three
modules introduced no Devanagari character the cut did not already carry.

### 91.1 The build warning, and why the numbers are what they are

`99 of 152` romanized surfaces in M3, `76 of 129` in M4 and `72 of 125` in M5 carry no `script`
line. This is the same expected warning §2.1 explained on the first wave: it counts
`deconstruction.words` and `mistake.display`, which `docs/121` §9.1 deliberately keeps the quiet
line OFF. Every surface a learner reads whole — all 30 sentences, all 90 variations, all 39 pool
items — carries it, and `src/course/types.test.ts` asserts exactly that, including the negative
half: a mistake plate that carried a `script` line would fail. M3's count is the highest of the
three because full enrichment gives it ten mistake plates and 89 word rows.

---

## 92. The ratchet is still at ZERO, at thirty-five rungs

`tools/shown-surfaces.test.ts` is **untouched** and `'en-sa': 0` still holds. The build prints nine
`shown but untaught` lines and not one of them is en-sa's; the other nine courses sit between 6 and
30. Six of those nine lists OPEN on a proper noun — `प्रिया`, `ana`, `priyā`, `priya`, `anna`,
`thomas` — which is exactly the thing CLAUDE.md warns is COUNTED rather than exempt.

**These three modules write no proper noun at all.** `rāmaḥ` and `sītā` remain the only two names in
the course and neither appears here. Three places wanted one and got a common noun or a pronoun
instead: M3-S09's absent third party is `bhavataḥ mātā`, M4's opponent across the table is `bhavān`
throughout, and M5-C06's third party is `saḥ`. That is L3-M9's ruling, held for a fifth wave above
L1.

---

## 93. Every comprehension token resolves to the RIGHT row

The build only enforces that a pool token RESOLVES (PRD §6.3). Three items have been withdrawn on
this course in earlier waves for landing on a row whose gloss was false of the line, so the evidence
is the word row every token lands on, read out of the emitted
`public/content/en-sa/index/L4-M<n>.json` and not out of a paradigm. **All 39 pool items were walked
token by token — 48 distinct surfaces across M3, 40 across M4 and 34 across M5 — and every one
resolves.** The 90 variation displays were walked the same way (54, 44 and 34 distinct surfaces),
because a variation carries no `deconstruction` either; all resolve.

**`L4-M3`, thirteen items, with the landing row and what it says:**

| item | tokens → landing row (gloss) |
| --- | --- |
| C01 | `yadi`→L3-M4 "if" · `aham`→L1-M1 "I · me" · `hyaḥ`→L1-M5 "yesterday" · `vidyālayam`→L1-M6 `vidyālayaḥ` "school" · `gaccheyam`→**L4-M3** "I would go · I would have gone" · `tarhi`→L3-M4 "then · in that case" · `saṃskṛtam`→L1-M1 "Sanskrit — the language" · `paṭheyam`→**L4-M3** "I would study · I would have studied" |
| C02 | `yadi`→L3-M4 "if" · `bhavān`→L1-M2 "you (polite) · your honour" · `hyaḥ`→L1-M5 "yesterday" · `mandiram`→L3-M9 "temple" · `gacchet`→L3-M4 "should go · could go" · `tarhi`→L3-M4 "then · in that case" · `bhavān`→L1-M2 "you (polite) · your honour" · `santuṣṭaḥ`→L1-M9 "content · pleased" · `syāt`→**L4-M3** "would be" |
| C03 | `mahyam`→L1-M1 `aham` "I · me" · `duḥkham`→L3-M6 "sorrow · unhappiness" · `asti`→L1-M3 "is · there is" · `yataḥ`→L1-M9 "because · since" · `saḥ`→L1-M5 "he · that man" · `hyaḥ`→L1-M5 "yesterday" · `na`→L1-M2 "no · not" · `uktavān`→L3-M5 "said (a man) · has said" |
| C04 | `yadi`→L3-M4 "if" · `mama`→L1-M1 `aham` "I · me" · `pustakam`→L1-M1 "book" · `atra`→L1-M7 "here" · `syāt`→**L4-M3** "would be" · `tarhi`→L3-M4 "then · in that case" · `aham`→L1-M1 "I · me" · `paṭheyam`→**L4-M3** "I would study · I would have studied" |
| C05 | `yadi`→L3-M4 "if" · `vṛṣṭiḥ`→L4-M2 `vṛṣṭeḥ` "rain" · `na`→L1-M2 "no · not" · `syāt`→**L4-M3** "would be" · `tarhi`→L3-M4 "then · in that case" · `mārgaḥ`→L2-M4 "road · way" · `uttamaḥ`→L2-M3 "excellent · very good" · `syāt`→**L4-M3** "would be" |
| C06 | `yadi`→L3-M4 "if" · `bhavatī`→L1-M2 `bhavān` "you (polite) · your honour" · `alpam`→L2-M9 "a little · not much" · `khādet`→L3-M4 "should eat" · `tarhi`→L3-M4 "then · in that case" · `bhavatī`→L1-M2 `bhavān` "you (polite) · your honour" · `kuśalinī`→L1-M2 `kuśalī` "well · in good health" · `syāt`→**L4-M3** "would be" |
| C07 | `aham`→L1-M1 "I · me" · `hyaḥ`→L1-M5 "yesterday" · `na`→L1-M2 "no · not" · `paṭhitavān`→L1-M4 `paṭhati` "reads · studies" · `ataḥ`→L1-M9 "so · therefore" · `mahyam`→L1-M1 `aham` "I · me" · `adya`→L1-M4 "today" · `cintā`→L3-M6 "worry · anxiety" · `asti`→L1-M3 "is · there is" |
| C08 | `yadi`→L3-M4 "if" · `aham`→L1-M1 "I · me" · `hyaḥ`→L1-M5 "yesterday" · `kāryālayam`→L3-M8 `kāryālayaḥ` "office" · `gaccheyam`→**L4-M3** "I would go · I would have gone" · `tarhi`→L3-M4 "then · in that case" · `patram`→L3-M8 "paper · a form · a letter" · `paśyeyam`→**L4-M3** "I would see · I would have seen" |
| C09 | `yadi`→L3-M4 "if" · `saḥ`→L1-M5 "he · that man" · `hyaḥ`→L1-M5 "yesterday" · `mama`→L1-M1 `aham` "I · me" · `gṛham`→L1-M6 "house · home" · `gacchet`→L3-M4 "should go · could go" · `tarhi`→L3-M4 "then · in that case" · `mahyam`→L1-M1 `aham` "I · me" · `sukham`→L3-M6 "happiness · ease" · `syāt`→**L4-M3** "would be" |
| C10 | `yadi`→L3-M4 "if" · `adhyāpakaḥ`→L1-M1 "teacher" · `atra`→L1-M7 "here" · `syāt`→**L4-M3** "would be" · `tarhi`→L3-M4 "then · in that case" · `samasyā`→L2-M8 "problem · difficulty" · `na`→L1-M2 "no · not" · `syāt`→**L4-M3** "would be" |
| C11 | `vṛṣṭeḥ`→L4-M2 "rain" · `aham`→L1-M1 "I · me" · `hyaḥ`→L1-M5 "yesterday" · `na`→L1-M2 "no · not" · `gatavān`→L1-M2 `gacchati` "goes · is going" · `ataḥ`→L1-M9 "so · therefore" · `mahyam`→L1-M1 `aham` "I · me" · `duḥkham`→L3-M6 "sorrow · unhappiness" · `asti`→L1-M3 "is · there is" |
| C12 | `yadi`→L3-M4 "if" · `bhavatyāḥ`→L1-M2 `bhavān` "you (polite) · your honour" · `mātā`→L2-M2 "mother" · `atra`→L1-M7 "here" · `syāt`→**L4-M3** "would be" · `tarhi`→L3-M4 "then · in that case" · `bhavatī`→L1-M2 `bhavān` "you (polite) · your honour" · `santuṣṭā`→L1-M9 `santuṣṭaḥ` "content · pleased" · `syāt`→**L4-M3** "would be" |
| C13 | `yadi`→L3-M4 "if" · `mama`→L1-M1 `aham` "I · me" · `mitram`→L2-M2 "friend" · `atra`→L1-M7 "here" · `syāt`→**L4-M3** "would be" · `tarhi`→L3-M4 "then · in that case" · `aham`→L1-M1 "I · me" · `na`→L1-M2 "no · not" · `khinnaḥ`→L1-M9 "sad · downcast" |

**`L4-M4`, thirteen items:**

| item | tokens → landing row (gloss) |
| --- | --- |
| C01 | `avaśyam`→**L4-M4** "certainly · of course" · `idam`→L1-M1 "this · this thing" · `kāryam`→L3-M2 "work · the thing to be done" · `alpam`→L2-M9 "a little · not much" · `kintu`→L1-M10 "but" · `hitam`→**L4-M4** "good · beneficial" |
| C02 | `mama`→L1-M1 `aham` "I · me" · `mate`→**L4-M4** "opinion · view" · `saṃskṛtam`→L1-M1 "Sanskrit — the language" · `uttamam`→L2-M3 `uttamaḥ` "excellent · very good" |
| C03 | `satyam`→L3-M3 "true · that's right" · `mārgaḥ`→L2-M4 "road · way" · `dīrghaḥ`→L2-M2 "tall · long" · `tathāpi`→L1-M10 "even so · nevertheless" · `aham`→L1-M1 "I · me" · `gacchāmi`→L1-M2 `gacchati` "goes · is going" |
| C04 | `bhavataḥ`→L1-M2 `bhavān` "you (polite) · your honour" · `matam`→**L4-M4** `mate` "opinion · view" · `śrutvā`→**L4-M4** "having heard" · `aham`→L1-M1 "I · me" · `santuṣṭaḥ`→L1-M9 "content · pleased" |
| C05 | `avaśyam`→**L4-M4** "certainly · of course" · `samasyā`→L2-M8 "problem · difficulty" · `asti`→L1-M3 "is · there is" · `kintu`→L1-M10 "but" · `lābhaḥ`→**L4-M4** "gain · profit" · `api`→L1-M10 "also · too" · `asti`→L1-M3 "is · there is" |
| C06 | `mama`→L1-M1 `aham` "I · me" · `mate`→**L4-M4** "opinion · view" · `bhavān`→L1-M2 "you (polite) · your honour" · `idam`→L1-M1 "this · this thing" · `pustakam`→L1-M1 "book" · `paṭhet`→L3-M4 "should read · could read" |
| C07 | `idam`→L1-M1 "this · this thing" · `hitam`→**L4-M4** "good · beneficial" · `yataḥ`→L1-M9 "because · since" · `mahyam`→L1-M1 `aham` "I · me" · `sukham`→L3-M6 "happiness · ease" · `asti`→L1-M3 "is · there is" |
| C08 | `avaśyam`→**L4-M4** "certainly · of course" · `bhavatyāḥ`→L1-M2 `bhavān` "you (polite) · your honour" · `matam`→**L4-M4** `mate` "opinion · view" · `uttamam`→L2-M3 `uttamaḥ` "excellent · very good" · `kintu`→L1-M10 "but" · `mama`→L1-M1 `aham` "I · me" · `mate`→**L4-M4** "opinion · view" · `idam`→L1-M1 "this · this thing" · `varam`→L2-M9 "better" |
| C09 | `idam`→L1-M1 "this · this thing" · `śrutvā`→**L4-M4** "having heard" · `mama`→L1-M1 `aham` "I · me" · `mātā`→L2-M2 "mother" · `santuṣṭā`→L1-M9 `santuṣṭaḥ` "content · pleased" |
| C10 | `mama`→L1-M1 `aham` "I · me" · `mate`→**L4-M4** "opinion · view" · `idam`→L1-M1 "this · this thing" · `kāryam`→L3-M2 "work · the thing to be done" · `adhikam`→L2-M9 "more" · `hitam`→**L4-M4** "good · beneficial" |
| C11 | `avaśyam`→**L4-M4** "certainly · of course" · `vṛṣṭiḥ`→L4-M2 `vṛṣṭeḥ` "rain" · `asti`→L1-M3 "is · there is" · `tathāpi`→L1-M10 "even so · nevertheless" · `aham`→L1-M1 "I · me" · `mandiram`→L3-M9 "temple" · `gacchāmi`→L1-M2 `gacchati` "goes · is going" |
| C12 | `bhavataḥ`→L1-M2 `bhavān` "you (polite) · your honour" · `matam`→**L4-M4** `mate` "opinion · view" · `śrutvā`→**L4-M4** "having heard" · `aham`→L1-M1 "I · me" · `na`→L1-M2 "no · not" · `khinnaḥ`→L1-M9 "sad · downcast" |
| C13 | `mama`→L1-M1 `aham` "I · me" · `mate`→**L4-M4** "opinion · view" · `lābhaḥ`→**L4-M4** "gain · profit" · `na`→L1-M2 "no · not" · `uttamaḥ`→L2-M3 "excellent · very good" · `kintu`→L1-M10 "but" · `kāryam`→L3-M2 "work · the thing to be done" · `hitam`→**L4-M4** "good · beneficial" |

**`L4-M5`, thirteen items:**

| item | tokens → landing row (gloss) |
| --- | --- |
| C01 | `prāyaḥ`→**L4-M5** "probably · most likely" · `idam`→L1-M1 "this · this thing" · `uttamam`→L2-M3 `uttamaḥ` "excellent · very good" · `kintu`→L1-M10 "but" · `mahyam`→L1-M1 `aham` "I · me" · `saṃśayaḥ`→**L4-M5** "doubt" · `asti`→L1-M3 "is · there is" |
| C02 | `mama`→L1-M1 `aham` "I · me" · `mate`→L4-M4 "opinion · view" · `idam`→L1-M1 "this · this thing" · `bhinnam`→**L4-M5** "different" |
| C03 | `kadācit`→L3-M3 "perhaps · sometimes" · `bhavataḥ`→L1-M2 `bhavān` "you (polite) · your honour" · `matam`→L4-M4 `mate` "opinion · view" · `satyam`→L3-M3 "true · that's right" |
| C04 | `na`→L1-M2 "no · not" · `tathā`→L3-M3 "so · in that way" · `prāyaḥ`→**L4-M5** "probably · most likely" · `mārgaḥ`→L2-M4 "road · way" · `dīrghaḥ`→L2-M2 "tall · long" |
| C05 | `aham`→L1-M1 "I · me" · `na`→L1-M2 "no · not" · `jānāmi`→L2-M8 "I know" · `kintu`→L1-M10 "but" · `idam`→L1-M1 "this · this thing" · `bhinnam`→**L4-M5** "different" · `syāt`→L4-M3 "would be" |
| C06 | `prāyaḥ`→**L4-M5** "probably · most likely" · `saḥ`→L1-M5 "he · that man" · `adya`→L1-M4 "today" · `na`→L1-M2 "no · not" · `gacchati`→L1-M2 "goes · is going" |
| C07 | `mahyam`→L1-M1 `aham` "I · me" · `saṃśayaḥ`→**L4-M5** "doubt" · `asti`→L1-M3 "is · there is" · `ataḥ`→L1-M9 "so · therefore" · `aham`→L1-M1 "I · me" · `na`→L1-M2 "no · not" · `tathā`→L3-M3 "so · in that way" · `manye`→L3-M3 "I think · I am of the view" |
| C08 | `prāyaḥ`→**L4-M5** "probably · most likely" · `mama`→L1-M1 `aham` "I · me" · `matam`→L4-M4 `mate` "opinion · view" · `na`→L1-M2 "no · not" · `uttamam`→L2-M3 `uttamaḥ` "excellent · very good" · `tathāpi`→L1-M10 "even so · nevertheless" · `aham`→L1-M1 "I · me" · `tathā`→L3-M3 "so · in that way" · `manye`→L3-M3 "I think · I am of the view" |
| C09 | `idam`→L1-M1 "this · this thing" · `kāryam`→L3-M2 "work · the thing to be done" · `bhinnam`→**L4-M5** "different" · `syāt`→L4-M3 "would be" · `kintu`→L1-M10 "but" · `hitam`→L4-M4 "good · beneficial" |
| C10 | `kadācit`→L3-M3 "perhaps · sometimes" · `idam`→L1-M1 "this · this thing" · `bhinnam`→**L4-M5** "different" · `na`→L1-M2 "no · not" · `syāt`→L4-M3 "would be" |
| C11 | `prāyaḥ`→**L4-M5** "probably · most likely" · `adya`→L1-M4 "today" · `vṛṣṭiḥ`→L4-M2 `vṛṣṭeḥ` "rain" · `syāt`→L4-M3 "would be" · `ataḥ`→L1-M9 "so · therefore" · `mārgaḥ`→L2-M4 "road · way" · `na`→L1-M2 "no · not" · `uttamaḥ`→L2-M3 "excellent · very good" |
| C12 | `bhavataḥ`→L1-M2 `bhavān` "you (polite) · your honour" · `matam`→L4-M4 `mate` "opinion · view" · `śrutvā`→L4-M4 "having heard" · `mama`→L1-M1 `aham` "I · me" · `saṃśayaḥ`→**L4-M5** "doubt" · `na`→L1-M2 "no · not" · `asti`→L1-M3 "is · there is" |
| C13 | `prāyaḥ`→**L4-M5** "probably · most likely" · `bhavatī`→L1-M2 `bhavān` "you (polite) · your honour" · `jānāti`→L2-M8 `jānāmi` "I know" · `kintu`→L1-M10 "but" · `aham`→L1-M1 "I · me" · `na`→L1-M2 "no · not" · `jānāmi`→L2-M8 "I know" |

### 93.1 Two items withdrawn before shipping, and four resolutions worth arguing with

1. **`adhyāpakam` was a real defect and the item was withdrawn.** M3-C01's first draft was
   `yadi aham hyaḥ vidyālayam gaccheyam tarhi adhyāpakam paśyeyam`, "I would have seen the teacher".
   `adhyāpakam` resolves to L1-M3's row, which is cued **`teacher (as the thing wanted)`** — a
   VERB-specific cue, correct for the `icchati` it was opened beside and false of a seeing. The row
   NOTE is case-general and would have answered the tap correctly, but the cue is what a learner
   reads first, and L4 may not edit L1-M3. The item became
   `yadi aham hyaḥ vidyālayam gaccheyam tarhi saṃskṛtam paṭheyam`. **This is the same shape as the
   three items withdrawn in earlier waves, found a fourth time.**
2. **`tat` was withdrawn from M3-C08 for the reason L4-M4's brief gives.** The draft was
   `yadi aham tatra gaccheyam tarhi tat paśyeyam`, using `tat` as a plain "it". `tat` resolves to
   L3-M2's row, glossed `that (thing) · it` with the note "*The neuter correlative, answering
   yat*" — true of a relative clause and false of a bare demonstrative. The item became
   `yadi aham hyaḥ kāryālayam gaccheyam tarhi patram paśyeyam`, and **`tat` is written in no
   display, variation or pool item of any of these three modules**, which is the same ruling M4's
   brief makes for its own pointing word.
3. **`matam` and `mate` share one row and the cue was written CASE-NEUTRAL from the start.** This
   is the lesson §84.1 item 1 paid for. `mate` occurs first (M4-S03) and `matam` second (M4-S06),
   so FIRST OCCURRENCE WINS and **both keys resolve to the S03 row** — whose cue is `opinion ·
   view`, with the case in the note ("*matam names it, mate is the 'in' shape*"). Nine pool tokens
   across M4 and M5 land there and every one of them fits.
4. **`bhavatyai` in M3-S02's second variation lands on L2-M5's row cued `to you (polite, to a
   man)`.** The cue alone does not fit a woman being addressed; the note does, and explicitly —
   "*bhavate to a man, bhavatyai to a woman*". This is the identical resolution §84.1 item 4
   recorded for `uktavatī`, and it is a variation rather than a pool item. Recorded rather than
   silently accepted.
5. **`satyam` in M5-S01 and in M5-C03 lands on L3-M3's row, glossed `true · that's right`.** The
   cue fits both lines exactly. The note's second sentence — "*it stands as a whole answer, with no
   verb before or after it*" — describes its commonest use rather than forbidding the attributive
   one, and neither line has a verb in it either. **Recorded because a future wave that narrows the
   rule to the CUE alone would keep this and a wave that narrows it to the whole NOTE would not.**
6. **`jānāti` in M5-C13 lands on L2-M8's row displayed `jānāmi` and cued "I know".** The note names
   the third-person shape outright ("*with jānāti for somebody else*"), which is the course-wide
   resolution §84.1 item 3 settled. Same for `gacchāmi`/`gatavān`/`paṭhitavān` throughout.

---

## 94. Decisions that could look like bugs

### 94.1 M3 refuses the one form that means exactly what the module is for

`agamiṣyat` is the conditional (lṛṅ) and it is precisely "he would have gone". It is written in no
display, no variation, no pool item and no `forms` list, and it is NAMED in M3's rule 4 so that a
later module cannot inherit it by silence. The argument is in the brief and is repeated in the rule:
it is the rarest finite form in the language, it is built from an augment in front of a future stem
— two pieces of morphology this course has met on opposite sides of the ladder — and it is not what
a speaker says. **Open question 171 is the one that could overturn this**, and it would overturn a
module rather than a line.

### 94.2 M3 opens `-eyam` on exactly three verbs and the fourth is a mistake plate

`gaccheyam`, `paṭheyam` and `paśyeyam`, and no more. `khādeyam` is a real form of a verb this course
teaches and is written **only** in M3-S04's mistake plate, where the `why` says both things that are
wrong with it: `-eyam` is the speaker's ending sitting after `bhavān`, and the cell itself is not one
this course opens. That is L2-M6's and L3-M4's `gacchema` technique, used a third time.

### 94.3 M3-S10 has no time word in it and is still a counterfactual

`yadi aham adhikam paṭheyam tarhi pariṇāmaḥ uttamaḥ syāt` carries no `hyaḥ`, no `adya` and no tense
anywhere. The pastness is situational, which is exactly what the brief's ruling says it is, and the
first variation adds `hyaḥ` so the contrast is visible rather than merely asserted. S01's first
variation makes the same point from the other end: swap `hyaḥ` for `adya` and the identical two
optatives stop being about the past.

### 94.4 M3-S04 writes `bhavān` twice

Pro-drop in this course is a rule about `aham`, which is written once at most; `bhavān` is a noun
and the two clauses of S04 sit in different times (`hyaḥ` in the condition, `adya` in the
consequence). Repeating the subject is what keeps the second half from being read as a continuation
of the first.

### 94.5 M4 and M5 both write `syāt`, and neither is a counterfactual

M3 opened it to carry "would be" inside a `yadi … tarhi` frame. M5 uses it with nothing supposed
away — `idam bhinnam syāt`, "this might be different" — and the row note in M5-S03 says so outright,
because the same cell doing two jobs is the thing a learner will otherwise reconstruct wrongly. M4
writes no `syāt` at all: its brief refuses the counterfactual concession as L4-M3's, one rung behind.

### 94.6 M4-S03's mistake plate is about a case ending, not about persuasion

`mama matam idam pustakam uttamam` is the plate for the module's one genuinely new piece of
morphology. Every other M4 plate is about the ORDER of a concession, which is what the module
teaches; this one exists because `matam` and `mate` are one letter apart and mean different things.

### 94.7 M5's rule 10 names `alam`, `mā` and the vocative and writes none of them

Rule prose is English, it is not a display, and `checkShownSurfaces` reads `sentence.display` and
`variations[].display` and nothing else. The technique is L1-M4's for `gacchasi` and L3-M4's for
`kuryāt`, used again so that a face-saving module cannot be read as having quietly opened a
prohibition.

### 94.8 M4-S10 and M5-S04 write two finite clauses across a full stop inside one `display`

`aham tathā na manye. kadācit idam bhinnam.` is one `display` holding two sentences. That is
L3-M3's ruling — this course has no word for "that", so an opinion and the claim it is about are two
sentences — and L4-M2's §85.6 already ships three-sentence displays. The bound is checked per
clause, and the longest clause in either module is 12 words against a bound of 13.

---

## 95. The briefs' ownership plan, and the one thing it got right that a paradigm would not

**Every ownership claim in all three briefs was grepped against the folded index before a word was
written**, by resolving each claimed surface through all thirty-two emitted delta files rather than
reading the last one. The fold came to **336 surfaces**, which is what `L4-M2.json`'s `surfaceCount`
says, so the arithmetic checks out independently.

**The named failure mode — a paradigm cell assumed to exist because its neighbours do — was hunted
for and not found this wave, and the brief's own correction was verified a second time.** L3-M4's
brief named FOUR optative cells; the emitted index carries **three**. Confirmed independently
against the fold: `gacchet`, `khādet` and `paṭhet` resolve, and **`likhet` is ABSENT**, as are
`paśyet`, `vadet`, `kuryāt`, `gaccheḥ` and every dual and plural. M3 planned against three and
wrote against three: its listener-half sentences use `gacchet`, `khādet` and `paṭhet` and no other
`-et` cell exists anywhere in the three modules.

Every other claim in the three briefs holds exactly:

- `gacchati`, `paṭhati` and `paśyati` carry `forms` with **no optative in them** — confirmed, so all
  three `-eyam` cells are rows here.
- `asti`'s row carries `asti` alone; `staḥ` (L2-M2), `astu` (L2-M6) and `santi` (L3-M9) are each
  their own row — confirmed, so `syāt` is a row here and the five-way note is accurate.
- `śṛṇoti`'s row carries `śṛṇoti` and `śṛṇomi` and **no absolutive** — confirmed, so `śrutvā` is a
  row here.
- `avaśyam`, `hitam`, `lābhaḥ`, `matam`, `mate`, `prāyaḥ`, `bhinnam` and `saṃśayaḥ` were all
  **ABSENT** from the folded 336 — confirmed, so all eight are fresh keys.
- **`prāyaḥ` and L1-M4's `prātaḥ` are distinct keys the fold will never merge** — confirmed by
  resolving both: `prātaḥ` is L1-M4's and `prāyaḥ` is new, and no normalisation brings them
  together. M5's rule 3 says which is which, because the hazard is authorial.
- `paśyāmi` is still **ABSENT** (the index has `paśyati`, `paśyatu`, `paśyanti` and `paśyāmaḥ` and
  no first-person singular present), which is why M3's regret sentences reach for `paśyeyam` and
  never for a present beside it.

**One correction to the briefs, recorded rather than worked around.** The L4 decisions section §4
describes M4's spend as "`matam`/`mate` (`mama mate`, 'in my opinion', **two owned tokens and one
new row**)". Those two halves contradict each other: if the row is new then `mate` is not an owned
token, and `mama mate` is one owned token plus one new one. **M4's own per-module note has it
right** — "two tokens, one of them L1-M1's `mama` and one a fresh row" — so this is the header's
rule 1 defect in the summary rather than in the brief an author writes to, and it was taken as the
per-module note has it. The module ships ONE row carrying both `matam` and `mate` in `forms` with a
case-neutral cue, which is what both readings plainly intend; only the arithmetic in the summary is
off.

---

## 96. Sanskrit that was deliberately NOT written

**Forms wanted by a draft of one of these three modules and dropped after grepping the fold:**

- **`syām`** — the first-singular of `asti`, wanted three times for "I would be happy" and "I would
  be content". The level opens `syāt` and nothing else, so every one of those became L3-M6's dative
  frame instead (`mahyam sukham syāt`, `mahyam duḥkham na syāt`), which is what the course has said
  since L3-M6 and needs no new cell. Verified absent.
- **`khādeyam`** — a fourth `-eyam` cell, wanted by an M3-S04 draft. Three was the ruling and three
  is what shipped; the form survives in M3-S04's mistake plate alone, where the `why` names both
  faults.
- **`paśyet`, `vadet`, `likhet`** — third-singular optatives that three drafts assumed because
  `gacchet`, `khādet` and `paṭhet` exist. All three ABSENT, all three dropped. **This is the named
  failure mode and it was caught at drafting rather than at review.**
- **`auṣadham khādet`** — M3-S04's first draft was "if you had taken the medicine yesterday". **L3-M7
  rule 7 explicitly refuses to name a verb for taking medicine** (open question 148), and writing one
  here would have closed that question by content, which no later wave may do. The sentence became
  `yadi bhavān hyaḥ alpam khādet …`, which is L3-M4-S09's own collocation.
- **`agamiṣyat`** — the form that means exactly what M3 is for. §94.1.
- **`āsīt`** — wanted by two M3 drafts for "if the road had BEEN short". It is **L4-M8's single
  chartered cell** and a module five rungs earlier may not take it; the sentence became
  `yadi mārgaḥ hrasvaḥ syāt …`, which is what the level's own new cell is for. Re-verified absent
  across all thirty-five modules.
- **`adhyāpakam` in a pool item** — §93.1 item 1.
- **`tat` as a bare demonstrative** — §93.1 item 2. M4's brief makes the ruling and M3 and M5 keep
  it too.
- **`manyate`** — a third-person "he thinks", wanted by two M4 drafts so that somebody could be
  asked their opinion. §68.1 recorded that `manye` has no third-person shape anywhere in this
  course; confirmed again. M4 asks with `kim bhavataḥ matam bhinnam?` instead, which is verbless.
- **`matāt`** — the ablative of M4's new noun, wanted for "different FROM my view". It would have
  been a seventh surface for one sentence, and `bhinnam` on its own carries the difference; M5-S06
  names both views in the nominative instead.
- **`bhinnaḥ`** — the masculine of M5's new adjective, wanted by a draft with `pariṇāmaḥ`. M5 writes
  `bhinnam` in the neuter only, agreeing with `idam` and `matam`, and the draft became a neuter
  subject.
- **`satyam vadati`** — an M5 draft and pool item, "you are probably telling the truth". `satyam`
  resolves to L3-M3's row, whose note says it "stands as a whole answer"; using it as the OBJECT of
  a verb of speaking would have been the §93.1 defect a third time. Both were rewritten.
- **`āgacchati`** — checked again for an M5 pool item and still absent; the index carries
  `āgaccha`, `āgacchatu` and `āgatya` and no present indicative. The item became
  `prāyaḥ saḥ adya na gacchati`.
- **`utsavam`, `tasya`, `tasyāḥ`, `tiṣṭhet`, `asmākam`, `mātaram`, `vaidyasya`, `kāraṇāt`,
  `tasmāt`** — all nine checked against the fold and all nine absent. No draft of these three
  modules ended up needing any of them.

**Forms the briefs refuse, re-verified absent across all THIRTY-FIVE modules** (walked mechanically
over every `display`, `variation`, pool item and `forms` list, with mistake plates reported
separately):

every **`-si` present** — `gacchasi`, `icchasi`, `gamiṣyasi` and `karoṣi` exist in **L1 mistake
plates only** and in no other field of any module, and `paṭhasi`, `pibasi`, `khādasi`, `vadasi`,
`jānāsi`, `paśyasi` and `śṛṇoṣi` are absent from every field including every plate; **`tava`,
`tubhyam`, `tvām`, `te`** — absent from every field of every module; **`mā`** — absent everywhere;
**every imperfect** — `akarot` (L2-M10 plate) and `abhavat` (L2-M8 plate) only, and **`āsīt` still
written nowhere at all**, which is the cell L4-M8 is chartered to open; **the conditional
`agamiṣyat`** — absent from every display, variation, pool item and `forms` list, and present in
**M3 rule 4's English prose alone**; the **productive bare `-ta` participle** — `gataḥ` (L2-M10
plate) and `naṣṭam` (L2-M8 plate) only, with `pītaḥ` in L2-M3 still the COLOUR "yellow" and not the
participle of `pibati`, checked rather than assumed; the **vocative** — `rāma` in one L2-M7 plate
and nowhere else; **`svasā`**, **`mahat`** — absent; **`asmi`** — two L1/L2 plates only, and **M5
does not write it even though its whole job is the first person hedging**; the **plural participial
past** (`gatavantaḥ`, `uktavantaḥ`, `paṭhitavantaḥ`) — absent; **every bare-stem imperative but
L2-M1's `āgaccha`** — absent; **`-anīya` in any shape** — absent; and **every optative cell beyond
L3-M4's three and M3's four** — `kuryāt`, `likhet`, `vadet`, `gaccheḥ`, `gacchetām` and every dual
and plural are absent, with `gacchema` in L2-M6's and L3-M4's plates alone and `khādeyam` in M3's
one plate. **`tvam` is still at exactly one display in the whole course**, L2-M1-S04's, which is
also the only `forms` list it appears in.

**And L2-M9's two comparison words:** `jalāt` and `phalāt` appear in **L4-M2 rule 2's English prose
only** and in no field of M3, M4 or M5.

---

## 97. Open questions for the fluent-speaker gate — continuing from 170

The gate is a **fluent saṃskṛta-sambhāṣaṇam speaker or a Sanskrit teacher**, and it is **UNMET**.
Questions 1–170 are still open. These fourteen are this wave's, and taking Level 4 to halfway closes
none of them — **including 167, which this wave was asked to settle and could not; see 176.**

171. **`yadi` plus the optative in both halves as the everyday past counterfactual.** The premise of
     the whole of M3, and the question most likely to change content on this course. Confirm that a
     speaker really says `yadi aham hyaḥ gaccheyam tarhi mama mitram paśyeyam` for "if I had gone
     yesterday I would have seen my friend", and say how often, if ever, `agamiṣyat` is actually
     heard in sambhāṣaṇam.
172. **Whether `hyaḥ` is enough to carry the pastness.** M3's rule 6 claims the time word does all
     of it. Confirm that a listener hears M3-S01 as about yesterday rather than as a general
     supposition, and say whether a speaker would add something else — a particle, a participle in
     a third clause — to make it unambiguous.
173. **`syāt` in an ordinary sentence.** It is the fifth shape of `asti` this course has opened
     above its own level. Confirm `mahyam sukham syāt` and `samasyā na syāt` are what is said, and
     say whether a speaker ever uses a first-person `syām` where this course uses the dative frame.
174. **`-eyam` on `paśyati`.** `paśyeyam` is the one of M3's three cells whose stem a learner cannot
     get from anything else in the course, since `paśyāmi` was never authored. Confirm the form and
     say whether `drakṣyāmi` or a participle is what a speaker reaches for instead.
175. **`avaśyam` as a concession rather than an assertion.** The whole of M4. Confirm
     `avaśyam idam kāryam dīrgham, kintu …` reads as granting a point in advance and not as
     insisting on it, and say where the line is between that and sarcasm — which M4-S01's `usage`
     claims is a matter of delivery alone.
176. **Open question 167, re-asked and still open.** §86 correction 1 took L4-M2's note over its own
     pattern: one link is marked once, `yataḥ` on the cause or `ataḥ` on the consequence and never
     both. **M4 was expected to make this clearer and did not**, because M4's business is
     concession and not causation: `kintu` and `tathāpi` are not a correlative pair at all, so
     nothing in this module bears on whether `yataḥ … ataḥ` may be doubled. What M4 DOES add is one
     adjacent datum — its plates and rule 7 show `ataḥ` used where `kintu` belongs turning a
     concession into a surrender, which is a MEANING difference and not a redundancy — so the
     analogy that made the doubled `yataḥ … ataḥ` look merely redundant is weaker than it was. The
     question stands unchanged and L4-M2 was not touched.
177. **`mama mate` against `manye`.** Both are in the course now and they overlap. Confirm
     `mama mate` is current in speech, and say which of the two a speaker uses to soften a
     disagreement and which to open an argument.
178. **`hitam` and `lābhaḥ` as the words an argument is made of.** Confirm both are everyday rather
     than bookish, and say whether a speaker arguing for a plan would reach for either, or for
     something this course has not opened.
179. **`śrutvā` at the head of a reply.** M4-S10 and M4-S05 both use it to answer what was just
     said. Confirm that is what a speaker does, and say whether the object is normally written
     (`bhavataḥ matam śrutvā`) or normally dropped.
180. **`prāyaḥ` as "probably".** M5's one word with a rider on it. Confirm the meaning and the
     placement, and say whether it is heard more often than `kadācit` in a hedge or less.
181. **The optative as the hedge, said out loud.** M5 rule 1 claims `bhavān gacchet` advises without
     ordering and `idam bhinnam syāt` supposes without asserting, and that neither contradicts
     anybody. Confirm both halves, and say whether doubling the hedge — `kadācit … syāt` in
     M5-S07 — is ordinary politeness or one softener too many.
182. **`bhinnam` as a way of disagreeing.** Confirm that saying two views are `bhinnam` really does
     avoid saying either is wrong, and name the commoner word if there is one.
183. **`saṃśayaḥ` in L3-M6's frame.** `mahyam saṃśayaḥ asti` for "I have a doubt". Confirm the
     frame takes this noun as readily as it takes `duḥkham` and `cintā`.
184. **Naturalness of the 39 pool items and the 30 hero sentences**, as questions 12, 26, 47, 66,
     90, 113, 127, 141, 157 and 170 asked of everything below them. They are grammatical by
     construction and recombined from the cumulative index; an LLM cannot hear which of them nobody
     would say. `yadi bhavān hyaḥ gṛham gacchet tarhi bhavataḥ mātā santuṣṭā syāt.`,
     `avaśyam bhavataḥ matam uttamam, kintu mama mate idam varam.`,
     `mama mate idam kāryam adhikam hitam.` and
     `prāyaḥ adya vṛṣṭiḥ syāt, ataḥ mārgaḥ na uttamaḥ.` are the four most worth a second opinion.

---

## 98. Verification run for this change

```
npm run content:validate                              → CONTENT 485/485 ok
                                                        (en-sa/L4-M3.json ok, en-sa/L4-M4.json ok,
                                                         en-sa/L4-M5.json ok)
npm run content:build -- --with-unverified --with-fixtures
                                                      → en-sa: 35 modules
                                                        (L1-M1..M10, L2-M1..M10, L3-M1..M10, L4-M1..M5)
                                                          index L4-M3: 340 surfaces, maxSpan 1, delta 4
                                                          index L4-M4: 346 surfaces, maxSpan 1, delta 6
                                                          index L4-M5: 349 surfaces, maxSpan 1, delta 3
                                                        NINE `shown but untaught` lines in the whole
                                                        build and NONE of them en-sa's — still zero
                                                        at thirty-five rungs, and still the only course
                                                        in the catalogue without one
npx tsc --noEmit                                      → clean
npx prettier --check content/en-sa/modules/L4-M3.json content/en-sa/modules/L4-M4.json
                     content/en-sa/modules/L4-M5.json content/en-sa/levels.json
                     src/course/types.test.ts tools/content-build.test.ts README.md
                     docs/122-llm-review-en-sa-L1-L4.md
                                                      → All matched files use Prettier code style!
npx eslint src/course/types.test.ts tools/content-build.test.ts
                                                      → clean
npm run content:build && npm run fonts:build          → en-sa: 35 modules
                                                        (L1-M1..M10, L2-M1..M10, L3-M1..M10, L4-M1..M5)
                                                        strict; FONTS 15/15 ok — mukta 331376 bytes
npx vitest run   (after that STRICT build)            → 909 passed, 1 failed (see below)
npx vite build && npm run budget                      → unmetered 0.0 KiB — 0 files;
                                                        precache 17 files 205.5 KiB gzip = shell ok;
                                                        course:en-sa 599.7 KiB gzip — 82 files
```

**`tools/font-coverage.test.ts` PASSES after the strict build**, which is again why the suite is run
in that order: it is red only after `--with-unverified --with-fixtures`, and its four characters
(`U+000A`, `$`, `×`, `•`) predate all en-sa work. This wave added **no new character to the emitted
Devanagari**: the generated cut came out at **331376 bytes, byte-for-byte the size #618, #619 and
#621 measured**, so the subset did not grow and no fifth uncovered character was introduced. Every
respelling in the twenty `sound` lines is ASCII, and **no capitalised IAST letter** appears anywhere
in the three files (the `Ṛ` U+1E5A failure mode of §33.8, checked mechanically).

`scripts/generate-splash.test.ts` is the one red, pre-existing on this container's rasterizer and
touching nothing this change goes near — `git status` shows no file under `scripts/` or
`public/splash/` modified.

`scripts/verify.sh` was again deliberately NOT run: it stops at the first failing stage and would
never reach CONTENT while `scripts/generate-splash.test.ts` is red on this host, so the stages were
run individually, as #610, #613, #614, #615, #617, #618, #619 and #621 did.

**The README's payload paragraph was NOT changed.** Its `course:en-sa` **367.6 KiB** gzip (32 files)
is explicitly the GRADUATION measurement, when the course shipped ten modules; the current figure is
599.7 KiB over 82 files and is recorded here rather than rewritten into a sentence about #611.
`unmetered` holds zero files and the precache audit is green, so BUDGET would be green.

### Pinned inventories updated by this change

- `src/course/types.test.ts` — `MODULE_FILES` gains `content/en-sa/modules/L4-M3.json`, `L4-M4.json`
  and `L4-M5.json`; the case title's count moves 482 → 485 and its wording to "en-sa's thirty-five
  rungs (#622)". **The en-sa decisions case itself is unchanged** — the intimate-set ban and the
  `neutral` register assertion are both scoped to `L1`, and these three modules chip `neutral` on
  all thirty sentences and write no intimate pronoun at any level.
- `tools/content-build.test.ts` — `AUTHORED` gains `L4-M3`, `L4-M4` and `L4-M5`; the three
  `en-sa: 32 modules (…, L4-M1..M2)` assertions become
  `en-sa: 35 modules (…, L4-M1..M5)`; three case titles and the header comment move to "five more
  rungs", "35 modules and 35 indexes" and "L4-M3..M5 (#622), which take it to halfway". **`FINISHED`
  is untouched and still `['L1', 'L2', 'L3']`** — L4 now carries five authored rungs and keeps its
  level `draft` flag, which is the partly-authored state the predicate already handled.
- `tools/shown-surfaces.test.ts` — **untouched.** `'en-sa': 0` still holds.
- `tools/course-briefs.ts` — **untouched, and one correction to it recorded in §95 instead.** The
  briefs are the spec this wave executed; correcting the file is a brief change and belongs to
  whoever revises #620.
- `content/en-sa/levels.json` — `L4-M3`, `L4-M4` and `L4-M5` lose `draft: true` and gain
  `hasContent: true`. **L4's own level `draft` and `draftNote` STAY**, because five of its rungs are
  unauthored; they come off with the tenth, as L2's and L3's did. L5 is untouched.
- `README.md` — the en-sa paragraph (module count, surface count, the three new rungs and what each
  buys), the ratchet paragraph, the review-doc line (eleven waves, ninety-eight sections), and the
  live-site module total (482 → 485).

`git diff --stat` over every L1, L2, L3, L4-M1 and L4-M2 module file is **EMPTY** — not one lower
file was touched — and so is `git diff --stat` over the other nine courses. The only tracked file
this wave modifies under `content/` is `content/en-sa/levels.json`; the three module files are new.

---

## Wave 12 — L4-M6 · L4-M7 · L4-M8 · L4-M9 · L4-M10 (#623) — the level closes

**Date:** 2026-09-12 · **Reviewer:** Claude Opus 5, LLM review, authorised by the repo owner ·
**Bar:** LLM review plus owner authority. The fluent-speaker gate of §9 is still **UNMET**.

---

## 99. What was authored

Five modules, the last five rungs of Level 4, authored strictly in ladder order with a rebuild
between each: M6 against L4-M5's real cumulative index (349 surfaces), M7 against M6's (356), M8
against M7's (365), M9 against M8's (369) and M10 against M9's (382).

| | `L4-M6` "Before and after" | `L4-M7` "Official talk" | `L4-M8` "Back then" | `L4-M9` "Places and journeys" | `L4-M10` "A story with a twist" |
| --- | --- | --- | --- | --- | --- |
| job | time clauses | the formal register you hear | habits and states in the past | a trip told in full | a six-sentence narrative with dialogue |
| `prerequisites` | `["L4-M5"]` | `["L4-M6"]` | `["L4-M7"]` | `["L4-M8"]` | `["L4-M9"]` |
| sentences · variations · word rows | 10 · 30 · 69 | 10 · 30 · 50 | 10 · 30 · 75 | 10 · 30 · 64 | 10 · 30 · 81 |
| rules · pool · `exitTest` | 10 · 13 · 1/2 | 10 · 13 · 1/2 | 10 · 13 · 1/2 | 10 · 13 · 1/2 | 10 · 13 · 1/2 |
| bounds | 3–13 words, cap 25 | 3–13 words, cap 25 | 3–14 words, cap 25 | 3–14 words, cap 25 | 3–14 words per sentence, cap 25 |
| enrichment | 7 `sound`, 3 `mistake`, 10 `usage`, 4 `mnemonic`, 5 `trap` | 8 · 2 · 10 · 3 · 6 | 7 · 3 · 10 · 3 · 4 | 7 · 0 · 10 · 3 · 6 | 0 · 0 · 10 · 2 · 7 |
| `register` | `neutral` ×10 | **`formal` ×8, `neutral` ×2** | `neutral` ×10 | `neutral` ×10 | `neutral` ×10 |
| surfaces opened | **7** | **9** | **4** | **13** | **2** |
| index after | 356, `maxSpan` 1 | 365, `maxSpan` 1 | 369, `maxSpan` 1 | 382, `maxSpan` 1 | **384, `maxSpan` 1** |

**M6 opens seven indeclinables and not one shape of an older lexeme** — `yāvat`, `tāvat`, `yadā`,
`tadā`, `pūrvam`, `paścāt`, `adhunā`. Each is one key with an empty `forms`, which makes it the
cheapest module of the level to own and the densest to teach: rule 2 names all five `ya-`/`ta-`
pairs together for the first time in the course, and rule 3 states the obligatoriness **per pair**
rather than as a slogan, because a slogan would be false of two of the five. "Still" is `adhunā api`
— two tokens, no span — and **"not yet" is `na adya api`, three tokens the course has owned since
L1 and ZERO new keys**, against the joined `adyāpi` every dictionary prints. The joined reading is
carried in S06's `sound` line, which is where every spoken join on this course has gone since L1-M1.

**M7 opens nine surfaces and is the only module in the whole course that chips `formal`.** The
passive opens in **three third-singular cells and no more** — `kriyate` ← L1-M4's `karoti`,
`dīyate` ← L1-M3's `dadātu`, `ucyate` ← L3-M5's `uktavān` — and **every one of them is written with
no instrumental agent whatever**, which is the law the register exists for; L4-M1's `mayā` and
`bhavatā` appear nowhere in the module, not even in a variation. Beside them: `praveśaḥ`,
`niṣiddhaḥ`, `samayaḥ`, `kāryālayasamayaḥ`, `sūcanā`, `niyamaḥ`. `niṣiddhaḥ` enters **as the second
and last frozen bare `-ta`**, named as a sign-word and not as a paradigm, and the module's true
gerundive sign is L4-M1's `-tavyam` negated (`atra na gantavyam`, `atra kāryam na kartavyam`).
`kāryālayasamayaḥ` is three members in one token with the joins written in full, and the scheme pays
off exactly as the brief predicted: `kāryālayaḥ` (L3-M8), `samayaḥ` and `kāryālayasamayaḥ` are three
separate keys and the compound donates nothing to its members, so S08's variation 1 can take it
apart into `kāryālayasya samayaḥ` and every tap still lands somewhere true. **Two of the ten
sentences are chipped `neutral` on purpose** — S09 and S10, where the learner answers a board in
their own register — because half of what this module teaches is reception, and a learner who
starts speaking this way to a friend has learned the wrong thing.

**M8 opens four surfaces across three rows, and the narrowness is the content.** `āsīt` ← L1-M3's
`asti`, plus `bālyam`/`bālye` (one row, two surfaces) and `abhyāsaḥ`. The imperfect as a SYSTEM
stays refused for the fourth time and is argued in rule 1 rather than left to drift: the habitual
past is `pūrvam` or `bālye`, plus `pratidinam`, plus **L1-M4's ordinary participial past**, and the
verb does not change at all. `āsīt` is named in rule 2 as an imperfect and as the only one this
course writes. **Rule 3 is the one a paradigm would have got wrong: `āsīt` is third singular and
nothing else, so `aham āsīt` is not a sentence** — "I was a student" is still `aham chātraḥ` with no
copula, exactly as L1-M1 taught, and S03's mistake plate is that error. `bhavān āsīt` is fine and is
shown in S03's variation 2, because `bhavān` has always taken a third-person verb.

**M9 opens thirteen surfaces and NOT ONE CASE**, which is what lets it afford them: `mitreṇa` ←
L2-M2's `mitram`, then `nagaram`/`nagare`, `grāmaḥ`/`grāmam`/`grāme`, `sthānam`/`sthāne`,
`dūram`/`dūre`, `yātrā`/`yātrām`, and `mahānagaram`. The instrumental of means (L2-M4), `saha` plus
the instrumental (L2-M6), the locative of place (L1-M6, L1-M7) and L3-M1's absolutives are all
pointed back at rather than retaught. `mahānagaram` is **how `mahat` stays refused**: no shape of
`mahat` is written anywhere, and `mahā-` rides inside one token. **No new proper noun**: a
destination is `nagaram`, `grāmaḥ` or `mahānagaram`.

**M10 opens two surfaces in the whole module** — `akasmāt` and `āścaryam` — which is what the brief
asked for and close to the "ideally neither" it hoped for. Ten six-sentence narratives, each with
one quoted line closed by L3-M5's `iti`, no tense shift and no person shift across it; S08's quoted
`aham ... karomi` is the mother's own first person inside the narrator's story, and its `trap` says
so. **`tvam` stays at exactly one display in the whole course, L2-M1's**, and the vocative stays
shut; rule 4 states the reason rather than leaving it to be rediscovered. The gender fork is tested
the only honest way: variation 1 of every hero is **the whole story** in the other gender, not one
sentence of it.

**Level 4 is CLOSED.** All ten rungs carry `hasContent: true` with no module-level `draft`, and
**L4's own level-wide `draft` and `draftNote` are gone** — four complete levels, no level `draft`
flag on any of them, L5 untouched.

---

## 100. What was checked, mechanically

```
npm run content:validate                              → CONTENT 490/490 ok
npm run content:build -- --with-unverified --with-fixtures
                                                      → en-sa: 40 modules
                                                        (L1-M1..M10, L2-M1..M10, L3-M1..M10, L4-M1..M10)
npx tsc --noEmit                                      → clean
npx prettier --check <the nine files touched>         → All matched files use Prettier code style!
npx eslint src/course/types.test.ts tools/content-build.test.ts
                                                      → clean
```

- **`maxSpan` is 1 after FORTY rungs.** No hyphen, no avagraha and no multi-token surface has ever
  been written on this course, and these five write none either, so ownership stays absolute: an
  inflected shape is reachable only through the `forms` of the row that lists it.
- **NFC everywhere, measured and not assumed.** Every `display`, `forms`, `cue`, `note` and `script`
  string in the five files is byte-identical to its own NFC normalisation, and every Devanagari
  `script` line was generated from the IAST by a transliterator first proved against **all 1855
  script lines already shipped on this course, byte for byte**, so a hand-typed slip cannot hide in
  the quiet line.
- **Pada form holds.** No token ends in `ṃ`, no token carries an avagraha, and no external sandhi is
  written across a word boundary in any `display`, variation, pool item or `forms` entry.
- **The fold arithmetic, stated as a sum a reader can check rather than as a number to remember.**
  L1 139 + L2 108 + L3 70 = 317 through L3-M10. L4's own emitted deltas, file by file:
  12 + 7 + 4 + 6 + 3 (#621, #622) = 32, and 7 + 9 + 4 + 13 + 2 (this wave) = 35, so L4 opens **67**
  and 317 + 67 = **384**, which is exactly what `L4-M10.json`'s `surfaceCount` says. Nothing was
  dropped and nothing double-counted.

---

## 101. The ratchet is still at ZERO, at FORTY rungs

`checkShownSurfaces` reads `sentence.display` and `variations[].display` and nothing else. The
strict build prints **nine `shown but untaught` lines across the whole catalogue and NONE of them is
en-sa's** — hi-mr 7, en-es 10, en-ar 6, hi-en 30, en-ru 20, en-it 17, en-fr 20, en-de 11, en-ko 12,
six of which open on a proper noun. `tools/shown-surfaces.test.ts` still carries `'en-sa': 0` and
**this wave did not touch it**.

Two modules of this wave wanted a name more than anything below them and neither got one. **M9 is a
journey module with no city in it**: the destination is `nagaram`, `grāmaḥ` or `mahānagaram`, and
the rule that says so (rule 9) states the mechanical reason rather than an editorial preference — a
name rides unindexed (#61) and is COUNTED (#491). **M10 is ten stories with no character's name in
them**: the people are `mama pitā`, `mama mātā`, `mama bhaginī`, `adhyāpakaḥ`, `vaidyaḥ` and
`ekaḥ janaḥ`, and S03's `trap` says out loud that the stranger has no name and the story does not
need one. `rāmaḥ` and `sītā` remain the only two names this course writes, both of them L1-M1's and
both of them carrying a word row.

---

## 102. Every comprehension token resolves to the RIGHT row

The build only enforces that a pool token RESOLVES (PRD §6.3). Five items have now been withdrawn on
this course for landing on a row whose gloss was false of the line, so the evidence is the word row
every token lands on, read out of the emitted `public/content/en-sa/index/L4-M<n>.json` and not out
of a paradigm. **All 65 pool items were walked token by token — 51 distinct surfaces across M6, 33
across M7, 42 across M8, 45 across M9 and 103 across M10 — and every one resolves.** The 150
variation displays were walked the same way (49, 36, 50, 46 and 111 distinct surfaces), because a
variation carries no `deconstruction` either; all resolve.

**Three items were rewritten during authoring for gloss fit, not for grammar**, which is the defect
this section exists for:

1. **M7-C13 first read `… iti mama mitram na jānāti`.** `jānāti` resolves to L2-M8's row, whose
   `display` is `jānāmi` and whose cue is **"I know"** — written for the first person that taught it
   and false of a third-person line. The item became
   `prathamam śulkam dīyate, tataḥ pramāṇapatram dīyate.`, and M7-S10's third variation, which had
   the same token, became `… iti mama bhrātā uktavān.`
2. **M10-C11 first read `… iti mama bhaginī uktavatī`.** `uktavatī` resolves to L3-M5's row, whose
   cue is **"said (a man) · has said"**. L4 may not edit L3-M5, so the item took a masculine speaker
   instead: `… iti mama bhrātā uktavān.` The hero sentences M10-S08 and M10-S10 still write
   `uktavatī`, and they are safe for a different reason — a hero carries its own `deconstruction`,
   and both of those rows gloss it "said (a woman) · has said".
3. **M9's multi-case rows were re-cued BEFORE the defect could appear**, which is the rule invented
   two waves ago working in advance for the first time. `sthānam`/`sthāne`, `dūram`/`dūre`,
   `nagaram`/`nagare` and `grāmaḥ`/`grāmam`/`grāme` are each ONE index row, and first occurrence
   inside the module decides which of the shapes owns it — so `sthānam` in S08 lands on S07's
   `sthāne` row. The first draft cued that row "at a place · in a place", which is false of a
   nominative. Every cue on a multi-case row in M9 is now **case-neutral from the start**: "place ·
   spot", "far · far away", "city · town", "village". M8's `bālye` row was re-cued the same way, to
   "childhood · in childhood", although `bālyam` appears in no display anywhere.

**`L4-M6`, 13 items:**

| item | tokens → landing row (gloss) |
| --- | --- |
| C01 | `yadā`→**L4-M6** "when" · `aham`→L1-M1 "I · me" · `khādāmi`→L1-M4 `khādati` "eats" · `tadā`→**L4-M6** "then · at that time" · `mama`→L1-M1 `aham` "I · me" · `bhrātā`→L2-M2 "brother" · `paṭhati`→L1-M4 "reads · studies" |
| C02 | `yāvat`→**L4-M6** "as long as · while" · `bhavān`→L1-M2 "you (polite) · your honour" · `atra`→L1-M7 "here" · `asti`→L1-M3 "is · there is" · `tāvat`→**L4-M6** "so long · for that long" · `aham`→L1-M1 "I · me" · `na`→L1-M2 "no · not" · `gamiṣyāmi`→L1-M2 `gacchati` "goes · is going" |
| C03 | `pūrvam`→**L4-M6** "before · formerly" · `mama`→L1-M1 `aham` "I · me" · `pitā`→L2-M2 "father" · `kāryālayam`→L3-M8 `kāryālayaḥ` "office" · `gatavān`→L1-M2 `gacchati` "goes · is going" · `adhunā`→**L4-M6** "now" · `gṛhe`→L1-M6 `gṛham` "house · home" · `asti`→L1-M3 "is · there is" |
| C04 | `aham`→L1-M1 "I · me" · `jalam`→L1-M3 "water" · `pītvā`→L3-M1 "having drunk" · `paścāt`→**L4-M6** "after · afterwards" · `bhojanam`→L2-M5 "meal · food" · `khādāmi`→L1-M4 `khādati` "eats" |
| C05 | `mama`→L1-M1 `aham` "I · me" · `bhaginī`→L2-M2 "sister" · `adhunā`→**L4-M6** "now" · `api`→L1-M10 "also · too" · `saṃskṛtam`→L1-M1 "Sanskrit — the language" · `paṭhati`→L1-M4 "reads · studies" |
| C06 | `aham`→L1-M1 "I · me" · `patram`→L3-M8 "paper · a form · a letter" · `na`→L1-M2 "no · not" · `adya`→L1-M4 "today" · `api`→L1-M10 "also · too" · `likhitavān`→L1-M4 `likhati` "writes" |
| C07 | `yadā`→**L4-M6** "when" · `bhavatī`→L1-M2 `bhavān` "you (polite) · your honour" · `gacchati`→L1-M2 "goes · is going" · `tadā`→**L4-M6** "then · at that time" · `aham`→L1-M1 "I · me" · `api`→L1-M10 "also · too" · `gacchāmi`→L1-M2 `gacchati` "goes · is going" |
| C08 | `yāvat`→**L4-M6** "as long as · while" · `aham`→L1-M1 "I · me" · `na`→L1-M2 "no · not" · `paṭhāmi`→L1-M4 `paṭhati` "reads · studies" · `tāvat`→**L4-M6** "so long · for that long" · `mama`→L1-M1 `aham` "I · me" · `mātā`→L2-M2 "mother" · `na`→L1-M2 "no · not" · `santuṣṭā`→L1-M9 `santuṣṭaḥ` "content · pleased" |
| C09 | `adhunā`→**L4-M6** "now" · `vayam`→L2-M6 "we" · `mandiram`→L3-M9 "temple" · `gacchāmaḥ`→L2-M6 "we go · shall we go" |
| C10 | `aham`→L1-M1 "I · me" · `kāryam`→L3-M2 "work · the thing to be done" · `kṛtvā`→L3-M1 "having made · having done" · `paścāt`→**L4-M6** "after · afterwards" · `miṣṭānnam`→L3-M9 "sweets · sweet food" · `khāditavān`→L1-M4 `khādati` "eats" |
| C11 | `yadā`→**L4-M6** "when" · `utsavaḥ`→L3-M9 "festival · celebration" · `asti`→L1-M3 "is · there is" · `tadā`→**L4-M6** "then · at that time" · `janāḥ`→L3-M9 `janaḥ` "person" · `mandiram`→L3-M9 "temple" · `gacchanti`→L3-M9 "go (more than one)" |
| C12 | `mama`→L1-M1 `aham` "I · me" · `bhrātā`→L2-M2 "brother" · `pūrvam`→**L4-M6** "before · formerly" · `atra`→L1-M7 "here" · `paṭhitavān`→L1-M4 `paṭhati` "reads · studies" · `adhunā`→**L4-M6** "now" · `kāryālaye`→L3-M8 `kāryālayaḥ` "office" · `asti`→L1-M3 "is · there is" |
| C13 | `yāvat`→**L4-M6** "as long as · while" · `vṛṣṭiḥ`→L4-M2 `vṛṣṭeḥ` "rain" · `asti`→L1-M3 "is · there is" · `tāvat`→**L4-M6** "so long · for that long" · `mārgaḥ`→L2-M4 "road · way" · `na`→L1-M2 "no · not" · `uttamaḥ`→L2-M3 "excellent · very good" |


**`L4-M7`, 13 items:**

| item | tokens → landing row (gloss) |
| --- | --- |
| C01 | `atra`→L1-M7 "here" · `praveśaḥ`→**L4-M7** "entry · going in" · `niṣiddhaḥ`→**L4-M7** "forbidden · prohibited" · `iti`→L3-M5 "(closes the quote)" · `sūcanā`→**L4-M7** "notice · announcement" |
| C02 | `kāryālaye`→L3-M8 `kāryālayaḥ` "office" · `adya`→L1-M4 "today" · `kāryam`→L3-M2 "work · the thing to be done" · `na`→L1-M2 "no · not" · `kriyate`→**L4-M7** "is done · is carried out" |
| C03 | `atra`→L1-M7 "here" · `śulkam`→L3-M8 "fee · charge" · `dīyate`→**L4-M7** "is given · is issued" |
| C04 | `idam`→L1-M1 "this · this thing" · `patram`→L3-M8 "paper · a form · a letter" · `iti`→L3-M5 "(closes the quote)" · `ucyate`→**L4-M7** "is called · is said" |
| C05 | `kāryālayasamayaḥ`→**L4-M7** "office hours · office time" · `prātaḥ`→L1-M4 "in the morning · early" · `asti`→L1-M3 "is · there is" |
| C06 | `atra`→L1-M7 "here" · `niyamaḥ`→**L4-M7** "rule · regulation" · `asti`→L1-M3 "is · there is" · `atra`→L1-M7 "here" · `na`→L1-M2 "no · not" · `gantavyam`→L4-M1 "must be gone to" |
| C07 | `kāryālaye`→L3-M8 `kāryālayaḥ` "office" · `pramāṇapatram`→L3-M8 "certificate" · `na`→L1-M2 "no · not" · `dīyate`→**L4-M7** "is given · is issued" · `ataḥ`→L1-M9 "so · therefore" · `aham`→L1-M1 "I · me" · `khinnaḥ`→L1-M9 "sad · downcast" |
| C08 | `yadā`→L4-M6 "when" · `kāryālayasamayaḥ`→**L4-M7** "office hours · office time" · `asti`→L1-M3 "is · there is" · `tadā`→L4-M6 "then · at that time" · `atra`→L1-M7 "here" · `kāryam`→L3-M2 "work · the thing to be done" · `kriyate`→**L4-M7** "is done · is carried out" |
| C09 | `samayaḥ`→**L4-M7** "time" · `na`→L1-M2 "no · not" · `asti`→L1-M3 "is · there is" · `iti`→L3-M5 "(closes the quote)" · `sūcanā`→**L4-M7** "notice · announcement" |
| C10 | `atra`→L1-M7 "here" · `bhāṭakam`→L3-M8 "rent" · `dīyate`→**L4-M7** "is given · is issued" |
| C11 | `idam`→L1-M1 "this · this thing" · `kāryam`→L3-M2 "work · the thing to be done" · `na`→L1-M2 "no · not" · `kartavyam`→L4-M1 "must be done" · `iti`→L3-M5 "(closes the quote)" · `niyamaḥ`→**L4-M7** "rule · regulation" |
| C12 | `kāryālayasya`→L3-M8 `kāryālayaḥ` "office" · `samayaḥ`→**L4-M7** "time" · `adhunā`→L4-M6 "now" · `na`→L1-M2 "no · not" · `asti`→L1-M3 "is · there is" |
| C13 | `prathamam`→L2-M10 "first" · `śulkam`→L3-M8 "fee · charge" · `dīyate`→**L4-M7** "is given · is issued" · `tataḥ`→L2-M10 "then · after that" · `pramāṇapatram`→L3-M8 "certificate" · `dīyate`→**L4-M7** "is given · is issued" |


**`L4-M8`, 13 items:**

| item | tokens → landing row (gloss) |
| --- | --- |
| C01 | `bālye`→**L4-M8** "childhood · in childhood" · `aham`→L1-M1 "I · me" · `pratidinam`→L1-M4 "every day · daily" · `dugdham`→L2-M5 "milk" · `pītavān`→L1-M4 `pibati` "drinks" |
| C02 | `pūrvam`→L4-M6 "before · formerly" · `mama`→L1-M1 `aham` "I · me" · `mitram`→L2-M2 "friend" · `atra`→L1-M7 "here" · `āsīt`→**L4-M8** "was · used to be" · `adhunā`→L4-M6 "now" · `tatra`→L1-M7 "there" · `asti`→L1-M3 "is · there is" |
| C03 | `pūrvam`→L4-M6 "before · formerly" · `atra`→L1-M7 "here" · `mārgaḥ`→L2-M4 "road · way" · `hrasvaḥ`→L2-M3 "short" · `āsīt`→**L4-M8** "was · used to be" · `adhunā`→L4-M6 "now" · `dīrghaḥ`→L2-M2 "tall · long" · `asti`→L1-M3 "is · there is" |
| C04 | `bālye`→**L4-M8** "childhood · in childhood" · `mama`→L1-M1 `aham` "I · me" · `abhyāsaḥ`→**L4-M8** "practice · regular habit" · `uttamaḥ`→L2-M3 "excellent · very good" · `āsīt`→**L4-M8** "was · used to be" |
| C05 | `adhunā`→L4-M6 "now" · `api`→L1-M10 "also · too" · `mama`→L1-M1 `aham` "I · me" · `pitā`→L2-M2 "father" · `kāryālayam`→L3-M8 `kāryālayaḥ` "office" · `gacchati`→L1-M2 "goes · is going" |
| C06 | `pūrvam`→L4-M6 "before · formerly" · `mama`→L1-M1 `aham` "I · me" · `bhaginī`→L2-M2 "sister" · `pratidinam`→L1-M4 "every day · daily" · `likhitavatī`→L1-M4 `likhati` "writes" |
| C07 | `bālye`→**L4-M8** "childhood · in childhood" · `atra`→L1-M7 "here" · `pustakālayaḥ`→L1-M7 "library" · `āsīt`→**L4-M8** "was · used to be" · `adhunā`→L4-M6 "now" · `atra`→L1-M7 "here" · `vidyālayaḥ`→L1-M6 "school" · `asti`→L1-M3 "is · there is" |
| C08 | `pūrvam`→L4-M6 "before · formerly" · `aham`→L1-M1 "I · me" · `kāryālayam`→L3-M8 `kāryālayaḥ` "office" · `gatavān`→L1-M2 `gacchati` "goes · is going" · `adhunā`→L4-M6 "now" · `gṛhe`→L1-M6 `gṛham` "house · home" · `kāryam`→L3-M2 "work · the thing to be done" · `karomi`→L1-M4 `karoti` "does · makes" |
| C09 | `bālye`→**L4-M8** "childhood · in childhood" · `mama`→L1-M1 `aham` "I · me" · `abhyāsaḥ`→**L4-M8** "practice · regular habit" · `na`→L1-M2 "no · not" · `āsīt`→**L4-M8** "was · used to be" · `adhunā`→L4-M6 "now" · `asti`→L1-M3 "is · there is" |
| C10 | `adhunā`→L4-M6 "now" · `api`→L1-M10 "also · too" · `aham`→L1-M1 "I · me" · `pratidinam`→L1-M4 "every day · daily" · `jalam`→L1-M3 "water" · `pibāmi`→L1-M4 `pibati` "drinks" |
| C11 | `bālye`→**L4-M8** "childhood · in childhood" · `aham`→L1-M1 "I · me" · `vidyālayam`→L1-M6 `vidyālayaḥ` "school" · `gatvā`→L3-M1 "having gone" · `paścāt`→L4-M6 "after · afterwards" · `gṛhe`→L1-M6 `gṛham` "house · home" · `paṭhitavān`→L1-M4 `paṭhati` "reads · studies" |
| C12 | `pūrvam`→L4-M6 "before · formerly" · `atra`→L1-M7 "here" · `mandiram`→L3-M9 "temple" · `āsīt`→**L4-M8** "was · used to be" · `adhunā`→L4-M6 "now" · `atra`→L1-M7 "here" · `gṛham`→L1-M6 "house · home" · `asti`→L1-M3 "is · there is" |
| C13 | `mama`→L1-M1 `aham` "I · me" · `mātā`→L2-M2 "mother" · `bālye`→**L4-M8** "childhood · in childhood" · `saṃskṛtam`→L1-M1 "Sanskrit — the language" · `paṭhitavatī`→L1-M4 `paṭhati` "reads · studies" |


**`L4-M9`, 13 items:**

| item | tokens → landing row (gloss) |
| --- | --- |
| C01 | `aham`→L1-M1 "I · me" · `yānena`→L2-M4 `yānam` "vehicle · conveyance" · `mahānagaram`→**L4-M9** "big city" · `gatavān`→L1-M2 `gacchati` "goes · is going" |
| C02 | `grāme`→**L4-M9** `grāmam` "village" · `ekaḥ`→L1-M8 "one" · `vidyālayaḥ`→L1-M6 "school" · `asti`→L1-M3 "is · there is" |
| C03 | `mama`→L1-M1 `aham` "I · me" · `yātrā`→**L4-M9** "journey · trip" · `dīrghā`→L2-M2 `dīrghaḥ` "tall · long" · `na`→L1-M2 "no · not" · `āsīt`→L4-M8 "was · used to be" |
| C04 | `aham`→L1-M1 "I · me" · `mitreṇa`→**L4-M9** "with a friend · by a friend" · `saha`→L2-M6 "with · together with" · `nagaram`→**L4-M9** "city · town" · `gatvā`→L3-M1 "having gone" · `paścāt`→L4-M6 "after · afterwards" · `gṛham`→L1-M6 "house · home" · `gatavān`→L1-M2 `gacchati` "goes · is going" |
| C05 | `nagare`→**L4-M9** `nagaram` "city · town" · `ekam`→L1-M8 `ekaḥ` "one" · `sthānam`→**L4-M9** `sthāne` "place · spot" · `sundaram`→L1-M9 `sundaraḥ` "beautiful" · `asti`→L1-M3 "is · there is" |
| C06 | `mama`→L1-M1 `aham` "I · me" · `bhrātā`→L2-M2 "brother" · `grāme`→**L4-M9** `grāmam` "village" · `asti`→L1-M3 "is · there is" · `mama`→L1-M1 `aham` "I · me" · `pitā`→L2-M2 "father" · `nagare`→**L4-M9** `nagaram` "city · town" · `asti`→L1-M3 "is · there is" |
| C07 | `mahānagaram`→**L4-M9** "big city" · `dūre`→**L4-M9** `dūram` "far · far away" · `asti`→L1-M3 "is · there is" · `ataḥ`→L1-M9 "so · therefore" · `vayam`→L2-M6 "we" · `śvaḥ`→L1-M6 "tomorrow" · `gacchāmaḥ`→L2-M6 "we go · shall we go" |
| C08 | `bālye`→L4-M8 "childhood · in childhood" · `aham`→L1-M1 "I · me" · `pratidinam`→L1-M4 "every day · daily" · `grāmam`→**L4-M9** "village" · `gatavān`→L1-M2 `gacchati` "goes · is going" |
| C09 | `aham`→L1-M1 "I · me" · `mārgeṇa`→L2-M4 `mārgaḥ` "road · way" · `dūram`→**L4-M9** "far · far away" · `gatavān`→L1-M2 `gacchati` "goes · is going" |
| C10 | `yadā`→L4-M6 "when" · `yātrā`→**L4-M9** "journey · trip" · `dīrghā`→L2-M2 `dīrghaḥ` "tall · long" · `asti`→L1-M3 "is · there is" · `tadā`→L4-M6 "then · at that time" · `aham`→L1-M1 "I · me" · `yānena`→L2-M4 `yānam` "vehicle · conveyance" · `gacchāmi`→L1-M2 `gacchati` "goes · is going" |
| C11 | `mama`→L1-M1 `aham` "I · me" · `mitram`→L2-M2 "friend" · `nagare`→**L4-M9** `nagaram` "city · town" · `asti`→L1-M3 "is · there is" · `mama`→L1-M1 `aham` "I · me" · `gṛham`→L1-M6 "house · home" · `grāme`→**L4-M9** `grāmam` "village" · `asti`→L1-M3 "is · there is" |
| C12 | `aham`→L1-M1 "I · me" · `mitreṇa`→**L4-M9** "with a friend · by a friend" · `saha`→L2-M6 "with · together with" · `mandiram`→L3-M9 "temple" · `gatvā`→L3-M1 "having gone" · `paścāt`→L4-M6 "after · afterwards" · `miṣṭānnam`→L3-M9 "sweets · sweet food" · `khāditavān`→L1-M4 `khādati` "eats" |
| C13 | `tat`→L3-M2 "that (thing) · it" · `sthānam`→**L4-M9** `sthāne` "place · spot" · `mama`→L1-M1 `aham` "I · me" · `gṛhasya`→L1-M6 `gṛham` "house · home" · `samīpe`→L1-M7 "near · close to" · `asti`→L1-M3 "is · there is" |


**`L4-M10`, 13 items:**

| item | tokens → landing row (gloss) |
| --- | --- |
| C01 | `prathamam`→L2-M10 "first" · `aham`→L1-M1 "I · me" · `prātaḥ`→L1-M4 "in the morning · early" · `gṛhe`→L1-M6 `gṛham` "house · home" · `bhojanam`→L2-M5 "meal · food" · `kṛtavān`→L1-M4 `karoti` "does · makes" · `tataḥ`→L2-M10 "then · after that" · `vidyālayam`→L1-M6 `vidyālayaḥ` "school" · `gatavān`→L1-M2 `gacchati` "goes · is going" · `akasmāt`→**L4-M10** "suddenly · all at once" · `vṛṣṭiḥ`→L4-M2 `vṛṣṭeḥ` "rain" · `āsīt`→L4-M8 "was · used to be" · `ataḥ`→L1-M9 "so · therefore" · `aham`→L1-M1 "I · me" · `tatra`→L1-M7 "there" · `sāyam`→L1-M4 "in the evening" · `paṭhitavān`→L1-M4 `paṭhati` "reads · studies" · `ante`→L2-M10 "in the end · finally" · `gṛham`→L1-M6 "house · home" · `gatavān`→L1-M2 `gacchati` "goes · is going" |
| C02 | `bhavān`→L1-M2 "you (polite) · your honour" · `adya`→L1-M4 "today" · `kim`→L1-M2 "(yes/no marker) · what" · `kṛtavān`→L1-M4 `karoti` "does · makes" · `iti`→L3-M5 "(closes the quote)" · `mama`→L1-M1 `aham` "I · me" · `pitā`→L2-M2 "father" · `pṛcchati`→L3-M5 "asks" · `kāryālaye`→L3-M8 `kāryālayaḥ` "office" · `patram`→L3-M8 "paper · a form · a letter" · `likhitavān`→L1-M4 `likhati` "writes" · `iti`→L3-M5 "(closes the quote)" · `aham`→L1-M1 "I · me" · `uktavān`→L3-M5 "said (a man) · has said" |
| C03 | `prathamam`→L2-M10 "first" · `jalam`→L1-M3 "water" · `pibatu`→L2-M5 "please drink · let (him) drink" · `tataḥ`→L2-M10 "then · after that" · `auṣadham`→L3-M7 "medicine" · `khādatu`→L2-M5 "please eat · let (him) eat" · `anantaram`→L2-M10 "after that · afterwards" · `upaviśatu`→L2-M1 "please sit · let (him) sit" · `ante`→L2-M10 "in the end · finally" · `punaḥ`→L2-M5 "again · more" · `jalam`→L1-M3 "water" · `pibatu`→L2-M5 "please drink · let (him) drink" |
| C04 | `avaśyam`→L4-M4 "certainly · of course" · `idam`→L1-M1 "this · this thing" · `kāryam`→L3-M2 "work · the thing to be done" · `dīrgham`→L2-M2 `dīrghaḥ` "tall · long" · `kintu`→L1-M10 "but" · `idam`→L1-M1 "this · this thing" · `hitam`→L4-M4 "good · beneficial" · `mama`→L1-M1 `aham` "I · me" · `mate`→L4-M4 "opinion · view" · `ataḥ`→L1-M9 "so · therefore" · `idam`→L1-M1 "this · this thing" · `kartavyam`→L4-M1 "must be done" |
| C05 | `aham`→L1-M1 "I · me" · `mitreṇa`→L4-M9 "with a friend · by a friend" · `saha`→L2-M6 "with · together with" · `yānena`→L2-M4 `yānam` "vehicle · conveyance" · `mahānagaram`→L4-M9 "big city" · `gatavān`→L1-M2 `gacchati` "goes · is going" · `mama`→L1-M1 `aham` "I · me" · `yātrā`→L4-M9 "journey · trip" · `dīrghā`→L2-M2 `dīrghaḥ` "tall · long" · `āsīt`→L4-M8 "was · used to be" · `tatra`→L1-M7 "there" · `ekam`→L1-M8 `ekaḥ` "one" · `sundaram`→L1-M9 `sundaraḥ` "beautiful" · `sthānam`→L4-M9 `sthāne` "place · spot" · `āsīt`→L4-M8 "was · used to be" · `ante`→L2-M10 "in the end · finally" · `aham`→L1-M1 "I · me" · `gṛham`→L1-M6 "house · home" · `gatavān`→L1-M2 `gacchati` "goes · is going" |
| C06 | `bālye`→L4-M8 "childhood · in childhood" · `aham`→L1-M1 "I · me" · `pratidinam`→L1-M4 "every day · daily" · `mandiram`→L3-M9 "temple" · `gatavān`→L1-M2 `gacchati` "goes · is going" · `adhunā`→L4-M6 "now" · `aham`→L1-M1 "I · me" · `nagare`→L4-M9 `nagaram` "city · town" · `kāryam`→L3-M2 "work · the thing to be done" · `karomi`→L1-M4 `karoti` "does · makes" · `adhunā`→L4-M6 "now" · `api`→L1-M10 "also · too" · `mahyam`→L1-M1 `aham` "I · me" · `tat`→L3-M2 "that (thing) · it" · `mandiram`→L3-M9 "temple" · `rocate`→L1-M1 "is pleasing · (someone) likes" |
| C07 | `akasmāt`→**L4-M10** "suddenly · all at once" · `mama`→L1-M1 `aham` "I · me" · `śirasi`→L3-M7 `śiraḥ` "head" · `vedanā`→L3-M7 "pain · ache" · `āsīt`→L4-M8 "was · used to be" · `bhavān`→L1-M2 "you (polite) · your honour" · `auṣadham`→L3-M7 "medicine" · `pibatu`→L2-M5 "please drink · let (him) drink" · `iti`→L3-M5 "(closes the quote)" · `vaidyaḥ`→L2-M8 "doctor" · `uktavān`→L3-M5 "said (a man) · has said" · `anantaram`→L2-M10 "after that · afterwards" · `vedanā`→L3-M7 "pain · ache" · `na`→L1-M2 "no · not" · `āsīt`→L4-M8 "was · used to be" |
| C08 | `yadā`→L4-M6 "when" · `aham`→L1-M1 "I · me" · `grāmam`→L4-M9 "village" · `gatavān`→L1-M2 `gacchati` "goes · is going" · `tadā`→L4-M6 "then · at that time" · `mama`→L1-M1 `aham` "I · me" · `mātā`→L2-M2 "mother" · `santuṣṭā`→L1-M9 `santuṣṭaḥ` "content · pleased" · `āsīt`→L4-M8 "was · used to be" · `ante`→L2-M10 "in the end · finally" · `mahyam`→L1-M1 `aham` "I · me" · `āścaryam`→**L4-M10** "a surprise · a wonder" · `āsīt`→L4-M8 "was · used to be" · `yataḥ`→L1-M9 "because · since" · `sā`→L1-M5 "she · that woman" · `miṣṭānnam`→L3-M9 "sweets · sweet food" · `kṛtavatī`→L1-M4 `karoti` "does · makes" |
| C09 | `prathamam`→L2-M10 "first" · `kāryālayam`→L3-M8 `kāryālayaḥ` "office" · `gacchatu`→L2-M4 "please go · let (him) go" · `tataḥ`→L2-M10 "then · after that" · `tatra`→L1-M7 "there" · `ekam`→L1-M8 `ekaḥ` "one" · `patram`→L3-M8 "paper · a form · a letter" · `paśyatu`→L2-M4 `paśyati` "sees · looks at" · `anantaram`→L2-M10 "after that · afterwards" · `śulkam`→L3-M8 "fee · charge" · `dadātu`→L1-M3 "please give · let (him/her) give" · `ante`→L2-M10 "in the end · finally" · `pramāṇapatram`→L3-M8 "certificate" · `dīyate`→L4-M7 "is given · is issued" |
| C10 | `pūrvam`→L4-M6 "before · formerly" · `atra`→L1-M7 "here" · `vidyālayaḥ`→L1-M6 "school" · `āsīt`→L4-M8 "was · used to be" · `adhunā`→L4-M6 "now" · `atra`→L1-M7 "here" · `kāryālayaḥ`→L3-M8 "office" · `asti`→L1-M3 "is · there is" · `akasmāt`→**L4-M10** "suddenly · all at once" · `idam`→L1-M1 "this · this thing" · `nagaram`→L4-M9 "city · town" · `bhinnam`→L4-M5 "different" |
| C11 | `aham`→L1-M1 "I · me" · `adya`→L1-M4 "today" · `gṛham`→L1-M6 "house · home" · `gacchāmi`→L1-M2 `gacchati` "goes · is going" · `iti`→L3-M5 "(closes the quote)" · `mama`→L1-M1 `aham` "I · me" · `bhrātā`→L2-M2 "brother" · `uktavān`→L3-M5 "said (a man) · has said" · `akasmāt`→**L4-M10** "suddenly · all at once" · `vṛṣṭiḥ`→L4-M2 `vṛṣṭeḥ` "rain" · `āsīt`→L4-M8 "was · used to be" · `ataḥ`→L1-M9 "so · therefore" · `saḥ`→L1-M5 "he · that man" · `na`→L1-M2 "no · not" · `gatavān`→L1-M2 `gacchati` "goes · is going" |
| C12 | `bālye`→L4-M8 "childhood · in childhood" · `mama`→L1-M1 `aham` "I · me" · `abhyāsaḥ`→L4-M8 "practice · regular habit" · `uttamaḥ`→L2-M3 "excellent · very good" · `āsīt`→L4-M8 "was · used to be" · `pūrvam`→L4-M6 "before · formerly" · `aham`→L1-M1 "I · me" · `pratidinam`→L1-M4 "every day · daily" · `saṃskṛtam`→L1-M1 "Sanskrit — the language" · `paṭhitavān`→L1-M4 `paṭhati` "reads · studies" · `adhunā`→L4-M6 "now" · `na`→L1-M2 "no · not" · `paṭhāmi`→L1-M4 `paṭhati` "reads · studies" · `ataḥ`→L1-M9 "so · therefore" · `mahyam`→L1-M1 `aham` "I · me" · `duḥkham`→L3-M6 "sorrow · unhappiness" · `asti`→L1-M3 "is · there is" |
| C13 | `yadi`→L3-M4 "if" · `aham`→L1-M1 "I · me" · `adhunā`→L4-M6 "now" · `paṭheyam`→L4-M3 "I would study · I would have studied" · `tarhi`→L3-M4 "then · in that case" · `mama`→L1-M1 `aham` "I · me" · `abhyāsaḥ`→L4-M8 "practice · regular habit" · `punaḥ`→L2-M5 "again · more" · `uttamaḥ`→L2-M3 "excellent · very good" · `syāt`→L4-M3 "would be" · `ataḥ`→L1-M9 "so · therefore" · `adya`→L1-M4 "today" · `aham`→L1-M1 "I · me" · `paṭhāmi`→L1-M4 `paṭhati` "reads · studies" |

---

## 103. Decisions that could look like bugs

1. **`na adya api` is three words and every dictionary prints two syllables joined.** `adyāpi` is
   `adya` + `api` with the external sandhi written, and #604 forbids external sandhi in a `display`
   for a mechanical reason, not an aesthetic one: the index matches surfaces verbatim, so `adyāpi`
   would be a fourth key for a phrase the course already owns whole. The joined reading is in
   M6-S06's `sound`. Open question 185 asks a speaker whether the phrase is heard in this order at
   all.
2. **M7 carries `formal` on eight sentences and `neutral` on two, and the two are not an
   oversight.** S09 (`kāryālaye aham pramāṇapatram icchāmi`) and S10
   (`atra praveśaḥ niṣiddhaḥ iti aham jānāmi`) are the learner's own side of the counter, and
   chipping them `formal` would have taught the register as a costume. S09's `trap` says so.
3. **The sandhi deferral of `docs/121` §2.4 was NOT reopened, and no sandhied `forms` entry exists
   anywhere in the module.** The briefs closed it as a refusal (#620) and M7 holds it. What M7 does
   instead is quote the joined board reading in `usage` — S01's usage line names `praveśo niṣiddhaḥ`
   — which `checkShownSurfaces` does not read, so the fact is taught at zero cost to the ratchet and
   at zero cost to the index. **Verified in the emitted index: M7's nine keys are `kriyate`,
   `dīyate`, `ucyate`, `praveśaḥ`, `niṣiddhaḥ`, `samayaḥ`, `kāryālayasamayaḥ`, `sūcanā`, `niyamaḥ`,
   and no key on this course carries an apostrophe or a sandhi product.**
4. **M8 opens `āsīt` and refuses `āsam`, so the module about the past cannot say "I was" with a
   verb.** That is deliberate and is rule 3: the copula-less nominal sentence L1-M1 taught does the
   job, with `pūrvam` carrying the tense. The alternative was a second person of a lakāra this
   course has spent four levels refusing.
5. **M9 writes `mitreṇa saha` and keeps the verb singular.** English says "we went"; here the
   speaker is the subject, the friend rides in the instrumental, and `gatavān` agrees with the
   speaker alone — because the plural participial past is written nowhere on this course. Rule 10
   names it.
6. **M10's heroes are 10 six-sentence narratives and its pool is capped at eight sentences and
   varied in kind**, as the brief required: C03 is a set of steps (L4-M1's shape), C04 is an argument
   (L4-M4's), C05 is a journey (L4-M9's), C06 and C12 are then-against-now (L4-M8's), C02 is a
   reported exchange, C09 is a counter procedure in L4-M7's passive, and C13 is a counterfactual
   (L4-M3's). None of them is a sixth narrative.
7. **`pūrvam` does two jobs in M6 and the module says so.** In S05 it is "formerly" and in S10 it is
   "already" with a participle behind it. There is no separate word for "already" in this course,
   and rule 10 states that rather than leaving an author to hunt for one.

---

## 104. The briefs' ownership plan, and the one place it was corrected

Every ownership claim in the five briefs was grepped against the emitted fold before it was written
against, and all of them held: M6's seven indeclinables, M7's nine keys and its three point-backs,
M8's `āsīt` ← L1-M3 and its two fresh rows, M9's thirteen keys and `mitreṇa` ← L2-M2, and M10's two.
**One correction, recorded here rather than written into `tools/course-briefs.ts`**, because the
briefs are the spec this wave executed and revising them belongs to whoever revises #620:

- **L4-M6's `allowedPatterns` contradicts L4-M6's own note.** The pattern list carries
  `aham + adya + api + na + V-tavān`, and the note three lines below it says **"THIS COURSE WRITES
  na adya api"** — a different order of the same three tokens. The note won, because it is the one
  that states the decision and because `na adya api` is the order the joined `nādyāpi` reads back
  as. The pattern is declared in the module's `complexity` verbatim as the brief gives it, so the
  module currently declares a pattern its own hero writes in a different order. That is the brief's
  inconsistency and not the content's, and it is worth one line of #620's next revision.

Six paradigm cells were reached for during drafting and **found absent in the emitted index**, which
is the named failure mode of this course caught six more times before it could ship. They are listed
in §105.

---

## 105. Sanskrit that was deliberately NOT written

**Cells reached for during drafting and refused because the fold does not carry them** — each one
grepped, not assumed:

| form | wanted for | what the index actually carries |
| --- | --- | --- |
| `āgacchati` | M6-S02, "until you come" | `āgaccha` and `āgacchatu` (L2-M1) and `āgatya` (L3-M1) — no present indicative at all |
| `paṭhatu` | M10-S07's quoted line, "read this" | nine polite imperatives and `paṭhati` is not among them; the line became `idam pustakam paśyatu` |
| `śrutavān` | M8-S05, "I used to listen" | `śṛṇoti`, `śṛṇomi` (L2-M7) and `śrutvā` (L4-M4) — no participial past of `śru` |
| `dattavān` / `āgatavān` | M10-S05 and M10 pool | `dadātu` (L1-M3) and `āgatya` (L3-M1); neither verb has a participial past here |
| `hrasvā` | M8-S10's feminine variation | `hrasvam` and `hrasvaḥ` (L2-M3) and no feminine; the sentence was rebuilt on `śāntaḥ`/`śāntā` and `kruddhaḥ`/`kruddhā`, which the fold does carry in both genders |
| `bhrātrā`, `mārge`, `tena`, `tayā`, `tasmin`, `ekasmin`, `ekena`, `janena`, `nagarāt`, `mahānagare`, `sūcanām`, `dīrghām`, `bahavaḥ`, `sarvam`, `jñātavān`, `āsan`, `āsam` | companions, places and quoted lines across M9 and M10 | none of them is in the fold, and none was minted |

**Refused by standing decision, re-verified absent across all five files — `display`, variations,
pool items, `forms` lists and mistake plates alike, by grep:**

- **every `-si` present**, and `tava`, `tubhyam`, `tvām`, `te` — zero occurrences;
- **`tvam`** — zero occurrences in these five files, so it stays at exactly one display in the whole
  course, L2-M1's, and **M10 is the module that would otherwise have opened it**;
- **`mā`** with an imperative — zero; M7's prohibition is `niṣiddhaḥ` or `na kartavyam`;
- **every imperfect except M8's single `āsīt`** — `agacchat`, `akarot`, `abhavat` and every other
  augmented form: zero occurrences, and all three are NAMED in M8's rule 1 and M10's rule 10, which
  is English prose the ratchet does not read;
- **`-syat` in any shape**, `agamiṣyat` included — zero;
- **the productive bare `-ta` participle** — `niṣiddhaḥ` is the second and last frozen member after
  L2-M8's `jātam`; no `gataḥ`, no `kṛtam`, no `naṣṭam`;
- **the vocative** — zero, though M7's counter and M10's ten quoted lines all want one;
- **`svasā`** — zero; the sister is `bhaginī` (L2-M2);
- **`mahat` in any shape** — zero; `mahānagaram` is one token and declines nothing;
- **`asmi`** — zero; `aham chātraḥ` still has no copula, which M8's rule 3 makes load-bearing;
- **the plural participial past**, `gatavantaḥ` and its kin — zero, which is why M9's companion
  rides in `mitreṇa saha` and M10's stories are told by one person;
- **every bare-stem imperative but L2-M1's `āgaccha`** — zero;
- **`-anīya`** — zero;
- **every optative cell beyond the seven now open** (L3-M4's `gacchet`, `khādet`, `paṭhet` and
  L4-M3's `gaccheyam`, `paṭheyam`, `paśyeyam`, `syāt`) — zero; M10-C13 uses `paṭheyam` and `syāt`
  and nothing else;
- **any passive beyond M7's three third-singular cells**, in any person, number or verb — zero, and
  L2-M1's `kṣamyatām` is untouched;
- **any sandhied `forms` entry, any avagraha, any token ending `ṃ`** — zero.

---

## 106. Open questions for the fluent-speaker gate — continuing from 184

The gate is a **fluent saṃskṛta-sambhāṣaṇam speaker or a Sanskrit teacher**, and it is **UNMET**.
Questions 1–184 are still open, and closing Level 4 closes none of them. These fifteen are this
wave's.

185. **`na adya api` as "not yet", in that order.** M6-S06's whole premise. Confirm that a speaker
     says `aham pustakam na adya api paṭhitavān` for "I have not read the book yet", and say whether
     the spoken order is really `nādyāpi` in front of the participle or `adyāpi na` behind it —
     which is the one place this wave knowingly took the brief's prose over its own pattern line.
186. **`adhunā api` for "still".** Confirm it is the everyday word, and say whether a speaker would
     reach instead for something this course has not opened.
187. **`yāvat … tāvat` in the TIME reading only.** M6 owns the pair for duration and writes the
     "as much as" reading nowhere. Confirm that `yāvat aham paṭhāmi tāvat mama bhrātā likhati` reads
     as "while" and not as "as much as", and say whether `tāvat` really may never be dropped where
     `tarhi` may.
188. **`pūrvam` and `paścāt` as bare adverbs.** M6 writes the adverbial use only. Confirm both stand
     alone in front of a clause in speech, and say how often a speaker uses the postpositional
     `bhojanāt paścāt` instead, which this course does not teach.
189. **The three passive cells, agentless.** `kāryālaye pratidinam kāryam kriyate`,
     `kāryālaye pramāṇapatram dīyate`, `idam pramāṇapatram iti ucyate`. Confirm all three are what a
     board and a counter actually say, and say whether an agent is ever added in speech.
190. **`praveśaḥ niṣiddhaḥ` as the sign.** Confirm it is the real wording, and say whether a board
     prints it joined (`praveśo niṣiddhaḥ`), which is what M7-S01's `usage` claims and what the
     `display` deliberately does not write.
191. **`atra na gantavyam` and `atra kāryam na kartavyam` as notices.** Confirm the negated
     gerundive is what a posted prohibition says, and say where `mā` with an imperative would be
     used instead — this course refuses it everywhere.
192. **`kāryālayasamayaḥ` against `kāryālayasya samayaḥ`.** Both are in M7 (S08 and its first
     variation). Confirm the compound is current for "office hours", and say which of the two a
     speaker uses.
193. **`sūcanā` and `niyamaḥ`.** Confirm both are the everyday words for a posted notice and a rule,
     and say whether a board is more likely to be called something else.
194. **`āsīt` as the ONLY imperfect a learner needs.** The premise of the whole of M8. Confirm that a
     speaker really says `pūrvam mama gṛham hrasvam āsīt` and `bālye mama abhyāsaḥ uttamaḥ āsīt`,
     and say how often `agacchat` and its kin are heard in sambhāṣaṇam at all.
195. **The habitual past on `pūrvam` plus the participle plus `pratidinam`.** Confirm
     `pūrvam aham pratidinam vidyālayam gatavān` reads as "I used to go" and not as "I went once",
     and say whether a speaker adds anything else to make the habit unambiguous.
196. **`bālye` and `abhyāsaḥ`.** Confirm `bālye` is the ordinary way to say "in childhood" without a
     date, and that `abhyāsaḥ` is the word for a regular practice rather than a bookish one.
197. **`mitreṇa saha` with a singular verb.** M9's rule 10 and M9-S02. Confirm a speaker really says
     `aham mitreṇa saha grāmam gatavān` where English says "we went", and say at what point a
     speaker switches to a plural instead.
198. **`mahānagaram`, `sthāne` and `dūre sthāne`.** Confirm `mahānagaram` is the everyday word for a
     big city, and that `dūre sthāne` is idiomatic for "at a distant place" rather than merely
     grammatical — it is the one phrase in M9 built rather than remembered.
199. **`akasmāt` and `āścaryam`, and the naturalness of the 65 pool items and the 50 hero
     sentences**, as questions 12, 26, 47, 66, 90, 113, 127, 141, 157, 170 and 184 asked of
     everything below them. Confirm `akasmāt` marks a turn in a story rather than mere speed, and
     that `mahyam āścaryam āsīt` is how a speaker says "I was surprised". They are grammatical by
     construction and recombined from the cumulative index; an LLM cannot hear which of them nobody
     would say. `aham pustakam na adya api paṭhitavān.`,
     `mahānagaram dūre sthāne asti, ataḥ aham yānena gamiṣyāmi.`,
     `atra na gantavyam iti sūcanā.` and
     `ante pustakam gṛhe āsīt, tat mahyam āścaryam āsīt.` are the four most worth a second opinion.

---

## 107. Verification run for this change

```
npm run content:validate                              → CONTENT 490/490 ok
                                                        (en-sa/L4-M6.json ok, en-sa/L4-M7.json ok,
                                                         en-sa/L4-M8.json ok, en-sa/L4-M9.json ok,
                                                         en-sa/L4-M10.json ok)
npm run content:build -- --with-unverified --with-fixtures
                                                      → en-sa: 40 modules
                                                        (L1-M1..M10, L2-M1..M10, L3-M1..M10, L4-M1..M10)
                                                          index L4-M6:  356 surfaces, maxSpan 1, delta 7
                                                          index L4-M7:  365 surfaces, maxSpan 1, delta 9
                                                          index L4-M8:  369 surfaces, maxSpan 1, delta 4
                                                          index L4-M9:  382 surfaces, maxSpan 1, delta 13
                                                          index L4-M10: 384 surfaces, maxSpan 1, delta 2
                                                        NINE `shown but untaught` lines in the whole
                                                        build and NONE of them en-sa's — still zero
                                                        at FORTY rungs, and still the only course in
                                                        the catalogue without one
npx tsc --noEmit                                      → clean
npx prettier --check content/en-sa/modules/L4-M6.json content/en-sa/modules/L4-M7.json
                     content/en-sa/modules/L4-M8.json content/en-sa/modules/L4-M9.json
                     content/en-sa/modules/L4-M10.json content/en-sa/levels.json
                     src/course/types.test.ts tools/content-build.test.ts README.md
                                                      → All matched files use Prettier code style!
npx eslint src/course/types.test.ts tools/content-build.test.ts
                                                      → clean
npm run content:build && npm run fonts:build          → en-sa: 40 modules
                                                        (L1-M1..M10, L2-M1..M10, L3-M1..M10, L4-M1..M10)
                                                        strict; FONTS 15/15 ok — mukta 331376 bytes
npx vitest run   (after that STRICT build)            → 914 passed, 1 failed (see below)
```

**The generated font cut did NOT move.** `mukta` came out at **331376 bytes, byte for byte the size
#618, #619, #621 and #622 measured**, so no fifth uncovered character was introduced — and **M7 was
the module most likely to add one**, since `praveśaḥ`, `niṣiddhaḥ`, `kāryālayasamayaḥ`, `sūcanā` and
`niyamaḥ` all carry conjuncts the course had not written before. The three Devanagari weights are
87452 / 90088 / 92324 bytes and the three `latin-ext` weights 4412 / 4384 / 4448, unchanged. Every
respelling in the 29 `sound` lines is ASCII, and **no capitalised IAST letter** appears anywhere in
the five files (the `Ṛ` U+1E5A failure mode of §33.8, checked mechanically).

**Two known-red tests, measured rather than assumed, and neither chased.**
`scripts/generate-splash.test.ts` is the one failure in the run above — pre-existing on this
container's rasterizer, touching nothing this change goes near, and `git status` shows no file under
`scripts/` or `public/splash/` modified. **`tools/font-coverage.test.ts` PASSES after the strict
build**, which is again why the suite is run in that order: it is red only after
`--with-unverified --with-fixtures`, and its four characters (`U+000A`, `$`, `×`, `•`) predate all
en-sa work. No fifth character was added.

`scripts/verify.sh` was again deliberately NOT run: it stops at the first failing stage and would
never reach CONTENT while `scripts/generate-splash.test.ts` is red on this host, so the stages were
run individually, as #610, #613, #614, #615, #617, #618, #619, #621 and #622 did.

**The README's payload paragraph was NOT changed.** Its `course:en-sa` **367.6 KiB** gzip (32 files)
is explicitly the GRADUATION measurement, when the course shipped ten modules; the current figure
belongs here rather than rewritten into a sentence about #611.

### Pinned inventories updated by this change

- `src/course/types.test.ts` — `MODULE_FILES` gains `content/en-sa/modules/L4-M6.json`, `L4-M7`,
  `L4-M8`, `L4-M9` and `L4-M10.json`; the case title's count moves 485 → 490 and its wording to
  "en-sa's forty rungs (#623)". **The en-sa decisions case itself is unchanged** — the intimate-set
  ban and the `neutral` register assertion are both scoped to `L1`, which is exactly why **M7's
  eight `formal` chips pass without touching it**, and no intimate pronoun is written at any level.
- `tools/content-build.test.ts` — `AUTHORED` gains `L4-M6` … `L4-M10`; **`FINISHED` becomes
  `['L1', 'L2', 'L3', 'L4']`**, so clearing L5's level flag without authoring L5 now fails; the
  three `en-sa: 35 modules (…, L4-M1..M5)` assertions become
  `en-sa: 40 modules (…, L4-M1..M10)`; three case titles and the header comment move to "four
  complete levels" and "40 modules and 40 indexes".
- `tools/shown-surfaces.test.ts` — **untouched.** `'en-sa': 0` still holds.
- `tools/course-briefs.ts` — **untouched, and one correction to it recorded in §104 instead.**
- `content/en-sa/levels.json` — `L4-M6` … `L4-M10` lose `draft: true` and gain `hasContent: true`,
  and **L4's own level `draft` and `draftNote` are REMOVED**, because all ten of its rungs are now
  authored — as L2's came off with #615 and L3's with #619. **L5 keeps its `draft` and its
  `draftNote`** and is otherwise untouched.
- `README.md` — the en-sa paragraph (module count 35 → 40, surface count 349 → 384, the five new
  rungs and what each buys, and L4's flag coming off), the ratchet paragraph, the review-doc line
  (twelve waves, one hundred and seven sections), and the live-site module total (485 → 490). **The
  payload-budget paragraph was deliberately left alone.**

`git diff --stat` over every L1, L2, L3 and L4-M1..M5 module file is **EMPTY** — not one lower file
was touched — and so is `git diff --stat` over the other nine courses. The only tracked file this
wave modifies under `content/` is `content/en-sa/levels.json`; the five module files are new.
