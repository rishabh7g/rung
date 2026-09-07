# hi-mr L3 — the authoring-brief decisions (#452)

The ten hi-mr L3 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['hi-mr']` L3-M1…L3-M10) are the
first L3 briefed in any course, and the first level in this repo planned against a verified level
that is itself above L1. Every seam below was pinned against the REAL cumulative index —
`public/content/hi-mr/index/L2-M10.json`, rebuilt and read: **441 surfaces, maxSpan 1** (L1 closed
at 222; L2 added 219) — and against the review chain the level inherits: docs/08 open questions
1–22, docs/15 23–30, docs/19 31–40, docs/23 41–48, and `docs/49-llm-review-hi-mr-L2.md` 49–70.

This note records the four decisions the briefs are written to — the L3 equivalents of docs/26's
four — so the authoring waves (#461, #470, #479) inherit them without re-deriving anything. The
briefs repeat each decision in the module notes, because a prompt only ever shows an author the
notes.

## 1. Language of fields — unchanged, field for field

`rules[].text` and word `note` in English; every learner-facing line in Hindi in Devanagari
(`cue`, `trap`, `sound`, `variations[].changed`, `mistake.why`, `usage`, `mnemonic`); `glossEn` on
every sentence; `literal` wherever word order or a gender decision moves. docs/26 §1 called this
the quirk of the one bilingual course in the repo, and L3 does not revisit it.

## 2. Register — carried from L2, chip included

L2-M1 settled when तू and when तुम्ही; #422 gave the तुम्ही + -आ and कृपया tier its own chip. L3
adds no register rule, it applies the one it has:

- तू lines chip `informal`, कृपया-tier lines chip `formal`, anything safe with anyone stays
  `neutral`.
- M7 (doctors) and M8 (counters, offices) speak तुम्ही throughout.
- M1's own day and M10's story speak whichever register the listener earns, and M10 tells one
  account both ways — the device L2-M10 closed its level with.

## 3. What L2 withheld, and where it lands

L2 named four things it was keeping out (docs/26, and the "Why the hi-mr L2 ladder teaches what it
teaches" header). Each has an owner now:

- **The genitive as a system → L3-M2.** L2-M2 taught one frame (माझ्या भावाचं नाव) and stopped.
  M2 opens the grid: -चा · -ची · -चं · -चे · -च्या, agreeing with the thing owned, over the
  oblique bend on the owner.
- **The -ऊन converb → L3-M1.** A day told at length cannot be told without it, and Hindi's करके
  makes the move free — only the ending is new.
- **Conditionals → L3-M4.** जर … तर as the real conditional, plus exactly ONE counterfactual
  frame (past + असतं). The system is L4-M3's, "What might have been" (docs/48 §4).
- **Reported speech → L3-M5**, on the की whose L2-M9 note was deliberately written without a
  fence ("no 'only'").

**The passive stays out of L3 entirely.** No module needs it, and opening it here would spend the
level's remaining room on a shape the ladder does not ask for until L4/L5.

**Two debts stay standing rather than being quietly closed.** L1-M9's बोललो remains the pinned
index miss (docs/15 Q29): M5's brief says why merging बोलणे into म्हणणे to close it would poison
both rows. And every open question in docs/49 is a native-pass item — no authoring wave may
"resolve" one by re-writing a shipped L2 sentence.

## 4. Forms and seams — L3 never edits an L1 or an L2 file

Single-token, as the whole course has been since L1-M1. Every -ऊन converb, every -चा/-ची/-चं
form, every -मध्ये and -कडे form is its own index key, deconstructed in the module that first
shows it, with its note pointing back at the base word's row. The shared lexemes are assigned up
front, so no two modules can claim one:

- **वाटणे** is ONE lexeme with two jobs — "it seems to me / I think" (M3) and "it feels" (M6).
  **M3 owns the row**, and its note is written true of both jobs; M6 points back at it.
- **भरणे** is L2-M8's (पोट भरलं). M8 of this level re-shows the cells it needs for bills and
  forms and never opens a second family.
- **की** stays L2-M9's row across all three of its jobs: the choosing-or (L2-M9), the
  opinion-clause opener (M3), and reported speech (M5).
- **-कडे** stands bare for the first time at M7 (डॉक्टरकडे). Its row says डावीकडे and उजवीकडे
  (L2-M4) were the same ending already glued to a direction word.
- **म्हणणे and सांगणे are two ways to report, with two different laws** — तो म्हणाला agrees with
  the speaker, त्याने सांगितलं takes ने and the neuter (L2-M10). M5 teaches the pair as the
  contrast it is.
- **दुखणे** is M7's, and the body part is its subject: माझं डोकं दुखतंय. Neither Hindi rival
  (सिर दर्द कर रहा है, मेरे सिर में दर्द है) maps onto it.

## The shape of the level

- Bounds climb 10 → 12: M1–M3 at 10 words, M4–M7 at 11, M8–M10 at 12.
- `newWordCap` stays 25 everywhere; pools are authored to 12, the course's shipped size (#305).
- M1–M3 ship fully enriched (the validator's law), and hi-mr's own habit is that every module
  does.
- **M10's items are capped at eight sentences** — "Your own story" is one item, not a notebook —
  and its new-word spend should ideally be zero: the exit is assembly, not vocabulary.

## Why the L3 ladder teaches what it teaches

The jobs are levels.json's, mirrored verbatim, and each pressure point lands in the module whose
job cannot be done without it: the converb in M1 (a day at length has no full stops); the genitive
in M2 (work and study are other people's things); मला वाटतं and की in M3 (an opinion needs a
clause); जर … तर in M4; म्हणाला and the no-backshift gift in M5 (Hindi is already right, which is
the cheapest lesson in the level); the three feeling-frames — वाटणे, होणे, येणे — in M6, where the
delta is which noun takes which verb; दुखणे in M7; भरणे's three jobs in M8; असतो against आहे in
M9 (a festival is true every year, a crowd is true today); and in M10 nothing new at all — the
level's whole inventory, told as a story with a reason and a feeling inside it.
