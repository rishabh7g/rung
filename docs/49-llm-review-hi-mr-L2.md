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

### Open questions for a native pass

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
