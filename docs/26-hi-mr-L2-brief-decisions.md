# hi-mr L2 — the authoring-brief decisions (#295)

The ten hi-mr L2 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['hi-mr']` L2-M1…L2-M10) are
the first L2 briefed in any course, written the way the header always promised: against the
verified L1 ladder, not ahead of it. Every seam below was pinned against the REAL cumulative
index — `public/content/hi-mr/index/L1-M10.json`, rebuilt and read: **215 surfaces, maxSpan 1**
(the planning issue said 206/3; the build is the truth) — and against the L1 review chain
(docs/08 open questions 1–22, docs/15 23–30, docs/19 31–40, docs/23 41–48, ~48 standing).
This note records the four decisions the briefs are written to — hi-mr L2's equivalents of the
hi-en four (#269) — so the next wave (filing and authoring L2-M1…M10 on the hi-en model:
M1–M2, M3–M5, M6–M10) inherits them without re-deriving anything. The briefs repeat each
decision in the module notes, because a prompt only ever shows an author the notes.

## 1. Language of fields — L2 keeps L1's split, field for field

`rules[].text` and word `note` in English; `cue`, `literal`, `trap`, `sound`, `usage`,
`mistake.why`, `variations[].changed`, `mnemonic` in Hindi (Devanagari); `glossEn` required on
every sentence (the L2 is Marathi, so #268's English-L2 exemption does not apply). The English
teaching prose is the course's tolerated quirk for one bilingual learner — hi-en is forbidden
from copying it, but *within* hi-mr, switching voices at L2-M1 would fork the course's own
conventions for zero pedagogy. Copy `content/hi-mr/modules/L1-M1.json`'s split exactly.

## 2. Register — L1 taught तू as the default; L2 teaches WHEN

docs/08 Q16 recorded the L1 choice; L2-M1 is the module that pays for it. The law: तू for a
friend or family your own age or younger; तुम्ही for elders, strangers and counters. Each brief
states which register its module speaks (M4/M7/M8 talk to strangers — तुम्ही; M6's plans are
among friends — तू; M10 shows the same account in both). Marathi has no दीजिए tier: the
imperative stops at तुम्ही + -आ, and politeness above it goes into words (जरा, कृपया) or the
future question (द्याल का?). The schema's `register` enum is `neutral | informal` — there is no
formal chip — so तू lines chip `informal` and the formal end (कृपया, आभारी आहे) is carried by
`usage` in words. आपण stays the course's "we" (L1-M10's row): its very-formal "you" job
(docs/08 Q17) is named in prose only, never a display subject.

## 3. Forms — L2 never edits an L1 file

The additions-only invariant, made structural for cross-level work:

- A new SHAPE of an L1 lexeme (माझ्या, घरं, जायचं, येत, बोला, the भेटलो family…) is
  deconstructed in the L2 module that first shows it — its own row, its note pointing back to
  the first-teach row. The bare word's key is L1's forever (first occurrence wins), and
  re-verifying shipped L1 files from every L2 issue would churn what the gate froze. docs/15
  put दुकानाजवळ on दुकान's own row — that was L1 repairing L1; across levels the rule flips.
- WITHIN L2, docs/15's discipline continues: a first-teach row lists the shapes its level will
  show (plan the wave, not the module — M2's मोठा row carries the six cells M3 needs; M6's
  चालेल row carries चालत for M8), and `[]` stays honest for invariables and re-teaches.
- A spoken contraction and its full form share one row — बोलतोय · बोलतेय · बोलतंय · बोलत —
  the hi-en `don't · do not` precedent. The participle -त is listed as a single-token form of
  its verb's row, so two-word spellings (बोलत आहे, चालत नाही) resolve word by word: the -त
  form to the verb, आहे/नाही to L1-M1's/M2's rows. Negation never needs a new row.

## 4. Seams — hi-mr stays single-token, owners decided up front

maxSpan stays 1: Devanagari glues what other courses span (स्टेशनला, चहापेक्षा, सगळ्यात,
बोलतोय, जेवायला), so every fused form is a fresh single-token key owned by the module that
first shows it, and the multi-token tool stays unused. The decided owners and hazards, each
restated in its module's notes:

- **बस stays the vehicle's key (M4).** Forms entries become index keys, so M1's बसा row lists
  no bare stem — sit-बस and the bus are one spelling.
- **प्यायला is L1-M5's past, forever.** The purpose infinitive -आयला is shown on
  जेवायला/खायला (M5) and writes around प्यायला-as-purpose, which would land on "drank (m)".
- **या (M1) carries two jobs in one note** — "come (polite)" and the invite particle after -ऊ
  (जाऊ या, M6) — the hi-en do-row precedent.
- **कोण (M2) and कोणता (M9)** are sibling keys, cross-referenced, never merged; **की (M9)** is
  the question-or, its note leaving room for the reporting की of L3-M5.
- **मिळणे (M5) and सापडणे (M8)** split Hindi's one मिलना; each note claims only its half.
- **Proper nouns never index (#61)** — रोहन, पुणे, पुण्याला ride unindexed; every direction
  anchors on a common noun (स्टेशनला, दुकानाला).

## Debts paid, debts standing

L2 pays the three debts the L1 reviews recorded: **दे** (docs/15's M10 note) in M1; the
**counting set** (OQ 28) across M5's table (तीन, चार, पाच) and M6's clock (सहा–नऊ); **बोलणे**
(OQ 29) in M7. The three pinned L1 sweep misses — प्रिया, पाच, बोललो — STAND: a module's index
is cumulative through itself, so no L2 row reaches back into an L1 reader's screen, and the
content-build sweep pins are untouched. आम्ही can never get a row of its own (OQ 23): under
first-occurrence-wins the आपण row keeps teaching the split. One new question joins the chain:

49. **विसरणे with an object.** The briefs keep विसरणे to the bare and infinitive frames
    (मी विसरलो, मी सांगायला विसरलो). Whether the object version takes M5's object agreement
    (मी चावी विसरली?) or stays subject-agreeing (मी चावी विसरलो, as speech suggests) is for
    the native pass to rule before any M8 sentence shows it.

## Bounds and shape

Word bounds climb 8 → 10 across the level (M1–M3: 8, M4–M7: 9, M8–M10: 10), continuing L1's
5 → 8; `newWordCap` stays the PRD §5 25 everywhere; pools are authored to 12, the course's
shipped size (#305). M1–M3 ship fully enriched (validator law, any level). `L2-M1`'s prompt
renders today from the real index — `npm run content:prompt -- hi-mr L2-M1` — and the mirror,
climb, seam and debt decisions above are pinned by `tools/generate-prompt.test.ts`
(`COURSE_BRIEFS hi-mr L2`).
