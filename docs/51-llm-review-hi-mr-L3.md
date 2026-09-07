# LLM review — hi-mr L3 (Fluency)

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Opus 5), which
cannot hear Marathi and is not a native editor. `verified: true` rests on the repo owner's
standing authority, as every earlier flip in this repo has (`verifiedBy`:
`"Claude Opus 5 — LLM review, authorised by repo owner"`). **No native gate exists for this
course.** The open questions at the bottom of each wave are the outstanding work, numbered on from
the chain this level inherits: docs/08 1–22, docs/15 23–30, docs/19 31–40, docs/23 41–48, docs/49
49–70.

One doc per course per level (docs/48 §B5): this file gains a section per authoring wave. The
briefs are #452, and the decisions they are written to are
`docs/50-hi-mr-L3-brief-decisions.md` — planned against the real cumulative index through L2-M10
(441 surfaces, maxSpan 1), the first level in this repo planned against a verified level above L1.

## Wave 1 — L3-M1 "Your day, in detail", L3-M2 "Work and study"

|                     | L3-M1 Your day, in detail | L3-M2 Work and study |
| ------------------- | ------------------------- | -------------------- |
| sentences           | 10 (two of them two-sentence items) | 10         |
| new word rows       | 9 of 25 allowed           | 11 of 25 allowed     |
| index growth        | +12 (441 → 453)           | +28 (453 → 481)      |
| pool items          | 12                        | 12                   |
| tokens per sentence | 4–10 (bounds 3–10)        | 3–6 (bounds 3–10)    |
| enrichment          | full                      | full                 |
| register chips      | 10 `neutral`              | 10 `neutral`         |
| prerequisites       | `[]`                      | `["L3-M1"]`          |

### What the two modules teach

**M1** is the -ऊन converb and almost nothing else, which is the point: a day told at length has no
full stops in it, and the ending is the only new thing — Hindi's करके makes the move free. The
rule that earns the module is that the converb carries no person and no gender: S01 and S07 are
the same chain under मी and under ती, and only the final verb moves. The counter-rule is stated as
interference: do not join the steps with आणि, which is exactly what a Hindi speaker's habit of
stringing clauses with और produces. Sequencers cost nothing (आधी · मग · नंतर · शेवटी were all
owned), so the whole spend is length: two items run to two sentences, the first in the course.

**M2** opens the genitive as a system — the thing L2-M2 taught in exactly one frame and then
deliberately stopped. All five cells appear on real nouns: ऑफिसचं काम, कंपनीची नोकरी, मित्राची
नोकरी, भावाचे मित्र, ऑफिसच्या खोल्या. The law transfers from Hindi whole (का/की/के agrees with the
thing owned); what is new is the fusion and the owner's bend, both already met in भावाचं (L2-M2)
and भावापेक्षा (L2-M9). The second lesson is -मध्ये against L1-M7's -त, split by whether the noun
is borrowed (ऑफिसमध्ये, कॉलेजमध्ये) or native (शाळेत, दुकानात, खोलीत). अभ्यास carries the
module's one false friend: Hindi's "practice", Marathi's ordinary word for schoolwork, and
masculine where Hindi's पढ़ाई is feminine.

### Seams held

- **No L1 or L2 file was edited** — the level's decision 4. `git diff --stat` over
  `content/hi-mr/modules/L1-*` and `L2-*` is empty.
- **Every converb is its own key**, owned by M1, with its note pointing back at the verb's
  first-teach row (उठतो L1-M4, जाणार L1-M6, जेवलो L2-M5, ये/या L2-M1).
- **Every genitive form is its own key**, owned by M2, exactly as every -पेक्षा form was owned by
  L2-M9. Bare चा never appears and gets no key.
- **A shown surface is a taught surface**: every display in every sentence, variation and pool
  item resolves against the module's own cumulative index, checked mechanically.

### Two cells L2 had left open

- **जेवतो / जेवते.** L2 taught जेवणे's past (M5) and its right-now form (M7) but never the plain
  habitual, which a daily meal needs. M1-S06 opens it as its own row rather than editing an L2
  file.
- **The -चा/-चे/-च्या cells.** L2-M2's भावाचं row carried only the neuter singular. M2 opens the
  rest on new owners; भावाचं itself stays L2-M2's key.

### Open questions for a native pass — wave 1

71. **स्वयंपाक (M1-S09).** Shipped as the everyday word for cooking. Is स्वयंपाक करून जेवते what
    a Pune speaker says, or would they say जेवण करून?
72. **आंघोळ करून (M1-S02).** Correct, but is the daily-routine order — bath before getting ready
    — the one a Marathi speaker would narrate?
73. **Chained converbs (M1-S10 mistake).** The module says three -ऊन forms in one breath are
    grammatical but hard to follow, and advises a second sentence. Is that the right advice, or
    do natives chain freely?
74. **-मध्ये against -त (M2).** Shipped as borrowed-noun versus native-noun. Is that the real
    split, or is it register (spoken -त, written -मध्ये)?
75. **अभ्यास (M2-S07).** Shipped as masculine and as the everyday word for schoolwork. Correct on
    both counts?
76. **शाळेत versus शाळेमध्ये (M2-S06).** The module writes शाळेत. Is शाळेमध्ये equally ordinary?
77. **Every pronunciation gloss in this wave** — उठून, होऊन, स्वयंपाक, ऑफिसच्या — is written, not
    heard.
