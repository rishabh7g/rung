# LLM review — hi-mr L2 (Conversations)

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Opus 5), which
cannot hear Marathi and is not a native editor. It wrote the Marathi, the Hindi teaching prose and
the pronunciation glosses, then audited all three. `verified: true` rests on the repo owner's
standing authority, exactly as every earlier flip in this repo did (hi-mr L1, PR #190; en-es
#192–#194; en-ar #199–#201; en-ko docs/35–37); `verifiedBy` says so in words —
`"Claude Opus 5 — LLM review, authorised by repo owner"`. **No native gate exists for this
course.** The open questions at the bottom are the outstanding work, numbered on from the L1
chain (docs/08 1–22, docs/15 23–30, docs/19 31–40, docs/23 41–48).

One doc per course per level (docs/48 §B5): this file gains a section per authoring wave.

## The level, as planned

L2 was briefed in #295 against the finished L1 index and the L1 review chain; the four decisions
are `docs/26-hi-mr-L2-brief-decisions.md` and they are restated inside every module note, because
a prompt only ever shows an author the notes. Two things moved between briefing and authoring, and
both are recorded rather than silently absorbed:

- **The index figure.** The briefs were planned at 215 surfaces through L1-M10. The spoken pass of
  2026-09-05 (docs/40) added seven; the real figure at the start of authoring, rebuilt and read,
  is **222, maxSpan 1**. No seam moved — the seven are all spoken-register surfaces inside modules
  the briefs already owned. `tools/course-briefs.ts` and docs/26 now carry 222.
- **The register chip.** docs/26 §2 was written when the enum was `neutral | informal`, and it
  routed the formal tier into the `usage` line in words. #422 added `formal`. The decision stands;
  only the carrier moved, and docs/26 carries the addendum.

## Wave 1 — L2-M1 "Asking politely", L2-M2 "Describing people"

|                    | L2-M1 Asking politely                | L2-M2 Describing people   |
| ------------------ | ------------------------------------ | ------------------------- |
| sentences          | 10                                   | 10                        |
| new word rows      | 12 of 25 allowed                     | 14 of 25 allowed          |
| index growth       | +12 surfaces (222 → 234)             | +28 surfaces (234 → 262)  |
| pool items         | 12                                   | 12                        |
| tokens per sentence | 3–6 (bounds 3–8)                    | 3–5 (bounds 3–8)          |
| enrichment         | full (all five blocks, every sentence) | full                    |
| `glossEn`          | every sentence                       | every sentence            |
| `literal`          | every sentence                       | every sentence            |
| register chips     | 5 `formal`, 4 `informal`, 1 `neutral` | 10 `neutral`             |
| prerequisites      | `[]`                                 | `["L2-M1"]`               |

The first content above L1 in any course. It proves the chain on a second level: the id grammar
(#417), the prompt CLI crossing the level boundary (`L2-M1`'s prompt was generated against
`L1-M10`'s real index), the M1–M3 enrichment law reading the module number and not the level, and
`prerequisites` staying inside the level — `L2-M1` lists `[]`, and the seal rule carries the
cross-level dependency.

### What the two modules teach

**L2-M1** is the register module, and its grammar is the imperative pair: bare stem for तू
(दे · कर · ये), stem + -आ for तुम्ही (द्या · करा · या · बसा). Hindi climbs three steps and Marathi
has two, so the loud rule is that there is no -इए tier to reach for — `*द्याजी`, `*करिये`,
`*बसिये` are starred in the rules and spent as mistakes on S04, S05 and S06. The course's best
false friend, आप ≠ आपण, is rule 3 and the mistake on S01. Softening above तुम्ही + -आ is bought
with words (जरा, कृपया) or with the polite-future question (द्याल का?, S03), never with a new
form. Thanks lands in three steps: थँक्यू named in prose and in a `trap`, धन्यवाद written (S09),
आभारी आहे above both (S10).

**L2-M2** pays the pronoun debt L1 left open (docs/19 Q40 — रोहन repeated because L1 taught no
तो). तो · ती · ते arrive as one row-set with two jobs, he/she/it and the far twins of L1-M8's
हा/ही/हे, and every note is written true of both. आहेत is the fourth cell of आहे and doubles as
respect (S04), and the honest family asymmetry — वडील on the respect-plural, आई singular and
intimate — is S04 against S05, with the `trap` naming it as closeness rather than disrespect. The
adjective split previews M3: उंच, लहान, हुशार never bend; चांगला and मोठा do. मूल is the
interference with a face — a child in the gender Hindi does not have (S09). The genitive is one
frame only (S10): माझ्या भावाचं नाव — the owner bends first, the ending agrees with the thing
owned, and the system itself is L3's.

### Seams held (docs/26 §4)

- **द्या stays L1-M8's row.** It appears in L2-M1 only inside दे's `forms`, so the index key still
  resolves to its first teach. Same for आहे in आहेत's `forms` (L1-M1 keeps it) and माझा in
  माझे/माझ्या's (L1-M1 keeps it).
- **बसा's row lists no bare बस.** `forms` is `[]` and the note says the तू form is spelled like
  the vehicle, so the बस key is left for L2-M4 to claim.
- **या carries both jobs in one note** — the तुम्ही imperative of येणे, and the invite particle
  after a -ऊ cell (जाऊ या) — so L2-M6's suggestions will not land on a "come" note that is false
  of them.
- **मदत is not spent here.** L2-M1's करा row names कृपया मदत करा as the same shape doing the same
  work, in prose; the key stays L2-M8's.
- **कोण is M2's**, and its note says it sits where the answer sits (the काय/कुठे law). L2-M9's
  कोणता is cross-referenced in the briefs, not merged.
- **Proper nouns ride unindexed** (#61): रोहन and प्रिया appear in displays and variations, never
  as deconstructed rows.
- **No L1 file was edited.** `git diff --stat content/hi-mr/modules/L1-*` is empty; the new shapes
  of L1 lexemes (माझे, माझ्या, आहेत, दे, कर) are deconstructed here with notes pointing back.

### Checks

- `npm run content:validate` — 92/92 ok, both modules included.
- `npm run content:build` (strict) ships them and reports the index counts above; every pool token
  resolves against L1 plus the module's own deconstructions, which is what the build enforces.
- `scripts/verify.sh` green.

### Open questions for a native pass — wave 1

49. **`कृपया खोलीत या` (M1-S07).** Grammatical, but a native invite is more often `आत या`. आत is
    unowned vocabulary at this point in the ladder (L2-M4 owns the direction words), so the room
    was used instead. Is the line natural enough to ship, or should M4 re-teach the invite?
50. **`मी आभारी आहे` (M1-S10).** Without an addressee (`मी तुमचा आभारी आहे`) this reads slightly
    bare. तुमचा is L3's genitive-as-a-system work. Does the bare line stand?
51. **थँक्यू is named, never written.** The `trap` on M1-S09 says everyday Pune says थँक्यू. Is
    keeping it out of `display` the right call, or does the course owe the learner the line it
    will actually hear?
52. **The respect-plural default on वडील (M2-S04).** Shipped as always-plural. Is there a register
    or region where `माझा वडील` is ordinary, and if so, does the note over-claim?
53. **मूल vs मुलगा/मुलगी (M2-S08, S09).** The module teaches all three. Does the neuter मूल sound
    natural in `हे मूल चांगलं आहे`, or is बाळ the word a Marathi speaker reaches for?
54. **The pronunciation glosses.** Written, not heard: `बहीण = ब‑ही‑ण`, `भावाचं = भा‑वा‑चं`,
    `उंच = उं‑च`. Every one needs an ear.

## Wave 2 — L2-M3 "Describing things", L2-M4 "Getting around", L2-M5 "Food and hosting"

|                     | L2-M3 Describing things | L2-M4 Getting around | L2-M5 Food and hosting |
| ------------------- | ----------------------- | -------------------- | ---------------------- |
| sentences           | 10                      | 10                   | 10                     |
| new word rows       | 13 of 25 allowed        | 15 of 25 allowed     | 15 of 25 allowed       |
| index growth        | +38 (262 → 300)         | +28 (300 → 328)      | +22 (328 → 350)        |
| pool items          | 12                      | 12                   | 12                     |
| tokens per sentence | 3–7                     | 3–6                  | 3–5                    |
| enrichment          | full                    | full                 | full                   |
| register chips      | 10 `neutral`            | 6 `formal`, 4 `neutral` | 6 `formal`, 4 `neutral` |

M3 is the last module the M1–M3 enrichment law compels; M4 and M5 carry all five blocks anyway,
because that is what every hi-mr module has done since L1-M1 and a learner should not feel the
ladder thin out mid-level.

### What the three modules teach

**L2-M3** walks the whole agreement grid where L1 only flashed corners of it. The law itself is
Hindi's own and is tagged `free` — -आ bends, everything else stands still — and the delta is which
endings: -ा · -ी · -ं singular, -े · -्या · -ी plural. The two loud cells are the feminine plural
(Hindi's -ी serves one and many; Marathi bends to -्या, S04) and the neuter plural that is spelled
exactly like the feminine singular (S05, S10 — `मोठी खोली` beside `मोठी घरं`, shown as a pair in
one `variations` block). Nouns bend along the same seam (घरं, पुस्तकं, खोल्या, बाटल्या), each new
plural pointing back to its L1 first-teach. Colours are the vocabulary spend and rehearse the split
themselves: काळा, पांढरा, निळा, हिरवा, नवा, जुना bend; लाल and स्वस्त do not.

**L2-M4** is two glued endings and a direction set. -ला on the destination over L1-M7's oblique
bend (दुकान → दुकानाला), starred against Hindi's bare noun; -ने on the vehicle (बस से → बसने),
with the note deliberately narrow — "by/with" only, because the past-tense job of -ने is L2-M10's.
`कसं जायचं?` points L1-M3's -आयचं shape at an impersonal job. जा is flagged as the one road verb
whose तू and तुम्ही forms share a shape, which is the rest point in a module of imperatives.

**L2-M5** is the hosting script and the refusal script. मिळेल का? is the order-as-question; its
note claims only मिळणे's half of Hindi's मिलना, leaving सापडणे's half to M8. घ्या is द्या's twin
in the other direction. The refusal ladder is नको → आता नको → पुरे → पोट भरलं, and पुरे carries
the module's one homograph warning: a Hindi speaker's "बस!" at a Marathi table is the vehicle or
the sit-verb. जेवणे is one verb where Hindi needs two words, and जेवलात का? is shipped as the
care-question it actually is. The purpose infinitive arrives on जेवायला and खायला only —
प्यायला-as-purpose is spelled exactly like L1-M5's past प्यायला, so it is written around, not
shown.

### Seams held

- **The बस key is the vehicle's** (M4-S06), as M1's बसा row promised; sit-बस never appears in a
  display and is named only in prose.
- **-ने's past-tense job is not opened.** The rule text says so in one clause and points at M10.
- **मिळणे does not claim "find".** M8's सापडणे is named in the rule and in the `trap`.
- **प्यायला is not re-used as a purpose form** — the key stays L1-M5's past.
- **तीन · चार · पाच** land on one row (M5-S07), paying docs/15 open question 28: पाच was a pinned
  miss in the L1 surface pass and now resolves.
- **A shown surface is a taught surface.** Every `display` in every sentence, variation and pool
  item of the five L2 modules resolves against that module's own cumulative index — checked
  mechanically, the #282 discipline. The only exceptions are proper nouns (रोहन, प्रिया), which
  ride unindexed by #61, and `mistake.display`, which is deliberately wrong Marathi.
- **मोठा's paradigm has one home.** M2 opened the row, so M3's six cells were added to M2's
  `forms` rather than opened a second time — the docs/15 discipline. The same for चांगला.

### Open questions for a native pass — wave 2

55. **`ही भाजी स्वस्त आहे, ती महाग आहे` (M3-S07).** Two clauses joined by a comma with no
    conjunction. Natural, or does Marathi want `पण` here — which L1 never taught?
56. **`खोल्या` for rooms (M3-S06).** Shipped as the everyday plural. Is `खोल्या` what a Pune
    speaker says of their own house, or is `रूम` the honest spoken word?
57. **`जरा सांगा, स्टेशनला कसं जायचं?` (M4-S01).** Is the `जरा सांगा` opener what a stranger is
    actually addressed with, or is `एक्स्क्यूज मी` / `माफ करा` more true?
58. **गाडी covering both a car and a train (M4-S08).** The note says the sentence disambiguates.
    Does that hold in speech, or does a learner need `रेल्वे` before L3?
59. **`पुरे` at the table (M5-S04).** Shipped as the refusal word, with `बस` warned against. Is
    `पुरे` alone enough, or is `पुरे झालं` the line that is actually said?
60. **`जेवलात का?` as a greeting (M5-S05).** Written as the care-question. Is the polite past
    right for a stranger, or is it reserved for people you know?
61. **Every pronunciation gloss in this wave** — `निळ्या`, `पोळ्या`, `थांबा`, `रिक्षाने`,
    `जेवायला` — is written, not heard.
