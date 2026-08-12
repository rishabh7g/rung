# Third linguistic review — hi-mr L1-M1…L1-M10

**This is an LLM review, not a native pass.** The reviewer is Claude (Opus 5) and does not speak
Marathi natively. **Nothing here closes the native gate**, and the consolidated open-questions list
at the bottom of this document is the outstanding work — it **supersedes** the two lists in
`docs/07-llm-review-L1-M1-M5.md` and `docs/07-llm-review-L1-M6-M10.md`, which are now historical.

**Where the native gate is tracked: nowhere but here.** #64, #110 and #111 — the three issues both
07 docs say "stay open" — were **closed by the repo owner on 2026-08-13**, minutes before the flip
was recorded on them. That is the owner's call and this pass does not reopen them; it does mean the
sentence "those issues stay open" is no longer true anywhere it appears, and that this document is
the only remaining home for the questions a native speaker still has to answer. If they should be
tracked again, one issue per question beats reopening three.

The content is **live**. The ten modules were flipped to `verified: true` on the owner's authority
on 2026-08-13 (PR #190), so the strict build ships them and https://rishabh7g.github.io/rung/ is
serving them to a real learner. Everything below was prioritised on that basis: a claim a learner
reads and believes is worth more attention than a claim only an author reads.

## Method — blind first, reconcile second

The two prior passes were **not read** until every judgement below had been formed and written
down. A reviewer who reads prior findings first mostly re-confirms them, and the point of a third
pass is fresh eyes.

- **Phase 1 (blind).** Only the ten module JSONs, `content/schema/module.schema.json`, and the
  engine that consumes them (`src/engine/surface.ts`, `src/engine/wordIndex.ts`,
  `src/components/WhyPanel.tsx` + `WhyRow.tsx`, `src/screens/SentenceScreen.tsx`, the index emitter
  in `tools/content-build.ts`). Every sentence, gloss, word row, `forms` entry, rule, trap,
  variation, mistake, usage, mnemonic, sound note and pool item was read. Three scripted audits were
  run against the real engine: cumulative-index resolution of every pool token **and** every
  sentence token; intra-module forward references; and every `(Mn)` cross-reference in the prose
  against where the named word is actually first taught. Findings were written to a file before
  Phase 2 began.
- **Phase 2 (reconcile).** Both 07 docs read, every Phase-1 finding classified new / confirmed /
  contradicted, and a sample of the prior passes' claimed corrections spot-checked in the current
  files.

**Score: 10 new findings, 6 that confirm a prior verdict, and 7 that contradict one.** No prior
*correction* is wrong on the grammar; what does not hold is two "verified clean" verdicts, plus one
factual imprecision that a prior correction introduced.

## Headline

**The Marathi itself is in very good shape, and this pass found nothing wrong with it.** Across 100
taught sentences, 80 comprehension items and ~190 variation lines — checked for possessive and
adjective agreement, copula person, dative frames, `-आयच-`, the habitual `-तो/-ते/-तोस/-तेस/-ता`,
past object-vs-subject agreement, the तू `-स` and honorific `-त` markers, `-णार` invariance,
`-ईन` vs `-ईल`, `आवडत नाही`, the feeling frames (आला · लागली · झाला), oblique + fused postposition
(टेबलावर · घरात · घराजवळ · घरासमोर · खोलीत · बागेत · बाटलीत · पिशवीत · दुकानात), the numbers, the
imperative द्या, and inclusive आपण + `-ऊ` — **not one L2 string needed correcting.**

Every defect this pass found is in the **layer around** the Marathi: three module rules that state
a true agreement law in false words, three cross-references that name the wrong module, and a
"why"-panel mis-resolution that shows a learner a note which is false of the word they just tapped.

Nothing found is *actively harmful to learn as Marathi*. The closest thing to harmful is finding 4
below: a learner tapping `का` in a "why" question is currently told, in the app, that `का` "goes at
the very end" — which is exactly the opposite of what the sentence in front of them is doing.

## Corrections applied (11)

### 1 · M2 rule 3 says agreement avoids the speaker — it does not

- **Before:** `"कसा · कशी · कसं and बरा · बरी · बरं agree with the person they describe — the one
  being spoken about, not the speaker."`
- **After:** `"…agree with the SUBJECT — whoever the sentence is about: मी बरा आहे (a man about
  himself) · तू बरी आहेस (to a woman)."`
- **Why:** in **मी बरा आहे** — the module's own S03, and the answer S02 exists to invite — the
  adjective agrees with the speaker, because the speaker *is* the subject. The rule as written
  denies precisely the case the module drills, and it contradicts S03's own trap two screens later:
  _"मराठी में बोलने वाला ही तय करता है — लड़की कहेगी 'मी बरी आहे'."_ The law is subject agreement;
  "speaker" and "the one spoken about" are both lossy paraphrases of it.

### 2 · M4 rule 0 says the habit ending follows the speaker's gender

- **Before:** `"The ending follows the SPEAKER's own gender, on every habit verb."`
- **After:** `"The ending follows the SUBJECT's gender, on every habit verb: with मी that is your
  own, with तू it is the person you are asking (उठतोस · उठतेस)."`
- **Why:** the same defect, in the opposite direction. **तू कधी उठतेस?** (S07's own variation) has
  the `-ते-` of the *addressee*, not of the speaker; a male learner obeying rule 0 literally would
  ask a woman `तू कधी उठतोस?`. Rule 3 already teaches the तू forms correctly, so rule 0 was
  contradicting its own module. Marked "on every habit verb" made the over-reach explicit.

### 3 · M5 rule 3 repeats it in the past

- **Before:** `"A verb WITHOUT an object agrees with the SPEAKER: मी उठलो/गेलो (m) · मी उठले/गेले
  (f)."`
- **After:** `"…agrees with the SUBJECT: मी उठलो/गेलो (m) · मी उठले/गेले (f) — and with तू, the
  person you are asking (उठलास · उठलीस)."`
- **Why:** **तू काल कधी उठलीस?** (S07 variation) is the addressee's gender again. Same fix, same
  reason; the three rules now say one thing and the ladder M2 → M4 → M5 is consistent about what
  gender agreement attaches to.

### 4 · `का` — the app shows a false note on M9's "why" question

- **Before (M2-S05 word row):** cue `"क्या"`, note `"The yes/no marker. It goes at the very end and
  changes nothing else — the statement stays exactly as it was."`
- **After:** cue `"क्या (अंत में) · क्यों (बीच में)"`, note `"The yes/no marker when it sits at the
  very END of a statement — it changes nothing else, the statement stays exactly as it was. The same
  word in the MIDDLE of a sentence means \"why\" instead (M9 teaches that seat), so its position is
  what decides."`
- **Why:** this is a **content × engine** defect, not a grammar one, and it is the most learner-
  visible thing in this document. The word index is cumulative and first-occurrence-wins, so
  M2-S05's `का` owns the surface `का` for the whole course. M9-S07 has its own, correct `का` row
  ("in the MIDDLE of the sentence it means why") — and that row is **unreachable through the
  index**. So when a learner taps "why" during practice on **तुला चहा का आवडतो?** (M9-C03) or
  **तुला मराठी का आवडते?** (M9-S07), `src/components/WhyPanel.tsx` renders M2's row: gloss "क्या",
  and a note asserting the word goes at the very end. Both halves are false of the sentence on
  screen. Sentence Detail is unaffected — `src/screens/SentenceScreen.tsx` renders the sentence's
  own word rows directly, not through the index — so the damage is confined to the practice
  session, which is where the learner spends most of their time. The fix makes the *owning* row true
  of both seats; M9's row keeps its fuller treatment for Sentence Detail. The forward reference to
  M9 is idiomatic here (M5's काल row already forward-references उद्या "coming in M6").

### 5 · `माझं`'s note says "never माझा" while answering for माझा

- **Before (M1-S01):** `"Possessive in the neuter — नाव is neuter, so माझं, never माझा."`
- **After:** `"Possessive, and it agrees with the thing owned: माझा (m) · माझी (f) · माझं (n). नाव
  is neuter, so माझं here — never माझा."`
- **Why:** same mechanism as 4, milder. M1-S01's row owns all three possessive surfaces, so tapping
  `माझा` in **मला माझा देश आवडतो** (M1-C05), **तुझा फोन…** → no, but **माझी पिशवी घरात आहे**
  (M7-C04) and **माझा फोन कुठे आहे?** (M10-C05) all render this row — with a closing clause that
  reads as a flat prohibition on the very word the learner tapped. M1-S03/S04 do have correct
  माझा/माझी rows; they are shadowed. The note now states the law first and the instance second, so
  it is true of every surface it answers for.

### 6 · `आवडते`'s note justifies only the feminine

- **Before (M1-S05):** `"…so the ending agrees with it — मराठी is feminine → आवडते."`
- **After:** `"…so the ending agrees with IT and never with you: आवडतो (m) · आवडते (f) · आवडतं (n).
  मराठी is feminine → आवडते here."`
- **Why:** the row owns आवडतो and आवडतं too (M1-C05, C06, C08; M2-C04, C06; M9-C03 …). The old note
  was not *false* for those surfaces, only silent; one clause makes it complete.

### 7–9 · Three cross-references name the wrong module

| Where | Before | After | Word is actually first taught |
|---|---|---|---|
| M8-S05 note | "साखर is feminine (M5)" | "(M3)" | M3-S06 |
| M6-S08 variation | "उद्या → आता (M1)" | "(M3)" | M3-S10 |
| M10-S04 note | "M1's आणि" | "M2's आणि" | M2-S03 |

These matter because the whole course is built on "you already own this, from there" — a pointer
that sends the learner to the wrong rung erodes the one promise the ladder makes. Every prose line
carrying a module reference was listed mechanically (153 lines, 191 references across the ten
files) and read against the emitted index wherever it names a specific word; these three were the
only wrong ones.

### 10 · `येईल` is not in S10

- **Before (M6-S07):** `"Person still shows, though: येईन is मी's, येईल is his (S10)."`
- **After:** `"Person still shows, though: येईन is मी's, and the -ईल shape is his — S10 puts खाईन
  against खाईल."`
- **Why:** S10 teaches **खाईन** vs **खाईल**; the string येईल occurs nowhere in the course. The
  claim is right about the paradigm and wrong about the pointer. This sentence was *introduced* by
  the M6-M10 pass's own correction M6-2 — see the spot-check below.

### 11 · One Hindi mistake line spelled with anusvāra

- **Before (M6-S02):** `मी उद्या काम करूंगा` / `"-ऊंगा हिंदी का भविष्य है…"`
- **After:** `करूँगा` / `-ऊँगा`
- **Why:** the string is deliberately-wrong *Hindi* (the interference this block teaches), so it
  should be spelled the way the rest of the content spells Hindi: चंद्रबिंदु, as in हूँ (143
  occurrences) and महँगी (12). This was the only anusvāra spelling of a nasalised Hindi vowel in
  the ten files.

## Deliberately not changed

- **M5 rule 1's ने claim.** "मी and तू never take ने … the doer stays exactly as it was" is TRUE —
  Marathi's first- and second-person pronouns have no overt ergative — and the M1-M5 pass already
  narrowed it from the false "No ने, ever". The residual risk is that a learner generalises to
  "Marathi has no ने"; **त्याने काम केलं** and **रामाने भात खाल्ला** do take it. Third-person
  subjects appear nowhere in L1, and the prior pass weighed exactly this and chose not to import
  them. Left alone; recorded as open question 20 instead.
- **Incomplete-but-true notes on shadowed rows.** 33 word rows are unreachable via their own
  display. The criterion applied here was: fix a note that is **false** of a surface it answers for
  (corrections 4, 5, 6); leave a note that is merely **incomplete**. So `उठतो`'s row still answers
  for उठतोस/उठतेस/उठता with a note about मी, and `झोपतो`/`शिकतो`/`ऐकतो` likewise — the person
  marker is taught by M4 rules 3–4 and by S07's trap, and rewriting a dozen verb notes to restate
  it would trade a small gain for a large diff.
- **`पाच` is not in the index.** Named in M8's rule 4, in the दहा note and in an S07 variation, but
  it has no word row, so it has no "why" and could not appear in a pool item. This is the
  deliberate cost of the M6-M10 pass's correction M8-1; confirmed as intended, not re-litigated.
- **Untaught tokens inside mistake blocks** (M7-S07's `तो … छान`, M10-S05's `दे द्या`). Never
  indexed, never drilled. Confirmed as the prior pass recorded them.

## Spot-check of the prior passes' corrections

All fourteen were located in the current files; a sample was re-verified end to end.

| Correction | Landed | Note |
|---|---|---|
| M5-1 ने narrowed to मी/तू | yes | consistent with M10-1 |
| M5-2 `तुम्ही … केलंत` | yes | S06 variation, C06, `forms`, rule 4 all agree; C06's `केलंत` resolves to the केलं row |
| M5-3 झोपले trap retargeted | yes | now the मी झोपले / ते झोपले syncretism, which is the real trap |
| M3-1 नको "for the gender of the thing" | yes | |
| M4-1 "Hindi's हूँ" | yes | |
| M6-1 येईन off येणार's `forms` | yes | M6-C05's येईन now resolves to its own S07 row — re-verified through the engine |
| M6-2 "one येईन whether a man or a woman" | yes, **with collateral** | introduced "येईल is his (S10)"; fixed here as correction 10 |
| M7-1 मध्ये admitted | yes | |
| M7-2 टेबलावर `forms` trimmed | yes | M7-C08's टेबलाखाली resolves to S05, not to टेबलावर |
| M7-3 घरात `forms` emptied | yes | घरी resolves to M5-S10; nothing became unresolvable |
| M8-1 numbers off दहा's `forms` | yes | शंभर (M10-C04), वीस (C03), एक (C02) each resolve to their own row |
| M8-2 वीस's ब→व scoped | yes | |
| M8-3 पन्नास phantom sound law removed | yes | |
| M9-1 भूक aspirate not vowel | yes | |
| M10-1 ने claim narrowed | yes | |
| M10-2 आम्ही = exclusive we | yes | |

**One collateral error total**, and it was a pointer, not grammar. The four index repairs (M6-1,
M7-2, M7-3, M8-1) are the highest-value work either prior pass did, and they all hold: re-running
the resolution audit today shows every pool token resolving to a row of the right lemma.

## The audits, and how to re-run them

The index audit is the one worth repeating whenever content changes. It rebuilds the cumulative
index exactly as `tools/content-build.ts` does — same `normalizeSurface`, same
`surfaceIndexKeys`, same first-occurrence-wins order — and then walks every pool item and every
sentence `display` through `matchSurfaces`, reporting three things: **UNRESOLVED** tokens,
**FORMS-HIT** tokens (resolved through a `forms` entry, so the learner sees a row headed by a
different string), and shadowed word rows. Results on the current content:

- **206 indexed surfaces, maxSpan 1.** No pool token and no sentence token anywhere is unresolved,
  in any of the ten modules.
- **No intra-module forward reference:** every token of every sentence `display` is either taught
  by that sentence's own word rows or by an earlier module. The ladder invariant holds without
  relying on the build to enforce it.
- **33 shadowed rows / 60 pool-item forms-hits** (plus 36 in sentence displays). All of them are
  genuine paradigm members; the three whose *notes* were wrong or thin are corrections 4–6.
- **9 unresolved tokens, all inside `variations`** — which the build deliberately exempts, and which
  the "why" panel never sees: प्रिया (a proper noun), झोपणार, दुकानाजवळ, पाच, बोललो, आम्ही, येऊ,
  जाऊ. Each is a legitimate one-off preview or a name; none is drilled.
- Every prose module reference resolves to the module that actually teaches the word, after
  corrections 7–9.

## Consolidated open questions for a native reviewer

**This list supersedes the nine in `docs/07-llm-review-L1-M1-M5.md` and the nine in
`docs/07-llm-review-L1-M6-M10.md`** — those two lists should not be worked from any more. Nothing
below has been changed in the content. They are the judgement calls where guessing would be worse
than asking: dialect, register, naturalness, and the sound notes no text-only reviewer can hear.

### Grammar and usage where two answers are defensible

1. **मी चहा प्यायलो** — subject agreement on पिणे with a masculine object. Acceptable colloquial
   Pune/Mumbai, or plainly wrong? If acceptable, M5-S02's mistake block should soften from "wrong"
   to "heard, but non-standard". *(carried from M1-M5 Q1)*
2. **तुम्ही … केलंत** — confirm the honorific `-त` in the past, and whether bare **तुम्ही काय
   केलं?** is common enough to deserve a variation. *(M1-M5 Q2)*
3. **-आयच- : agreeing vs invariant.** M3 teaches object agreement (चहा प्यायचा · कॉफी प्यायची ·
   पाणी प्यायचं); the invariant neuter **मला मराठी शिकायचं आहे** is very widely used, and M3's own
   `allowedPatterns` cites it. Teach the invariant as a legitimate alternate, or keep the
   simplification? *(M1-M5 Q3)*
4. **The price frame's copula.** Confirm **आहे**, not आहेत, in **चहा दहा रुपये आहे** (the copula
   agrees with the singular subject, not with plural रुपये) — and confirm **कितीला** is the everyday
   price question rather than कितीचं / किती रुपयांना. *(M6-M10 Q4; independently reached by this
   pass)*
5. **-ईन as "the promise form"** (M6 rule 3, S07, S10). Is that how it lands, or is -ईन simply the
   ordinary future with -णार आहे the more immediate one? *(M6-M10 Q1)*
6. **टेबलावर vs टेबलवर** (M7-S01's sound note forbids टेबलवर). Consonant-final loanwords often
   resist the -आ oblique in speech (फोनवर, बॅगवर). Is the prohibition too strong? *(M6-M10 Q2)*
7. **मध्ये's register** — confirm -त is the everyday default and मध्ये the marked option, and that
   admitting मध्ये inside a mistake block earns its extra sentence at L1. *(M6-M10 Q3)*
8. **बाग feminine, दुकान neuter** (M7-S06, S07) — both are headline interference claims carrying two
   sentences each. Confirm by ear. *(M6-M10 Q7)*

### Word choice and naturalness

9. **बरा for "well"** — is **मी बरा आहे** the natural answer to तू कसा आहेस?, or would a Puneite
   reach for ठीक आहे / छान / मजेत? M2-S03, S09, S10 all hang on it. *(M1-M5 Q4)*
10. **हो vs होय** — is "हो everyday, होय fuller and more formal" the right split, and is होय too
    bookish for a beginner? *(M1-M5 Q5)*
11. **साखर खाल्ली** (M5-S01 variation) — grammatical and it drills the feminine, but is "I ate
    sugar" a natural thing to say? A swap needs a new word row. *(M1-M5 Q8)*
12. **मला अर्धं पाणी द्या** (M8-S04 variation) — the only place the neuter अर्धं is drilled, but is
    "half water" a natural request? *(M6-M10 Q5)*
13. **मला आज आनंद झाला** (M9-S06) — is आनंद the everyday word for "I was happy today", or would
    छान वाटलं / मजा आली be the reflex? *(new)*

### Orthography and house style

14. **कॉफी** — no nukta in the Marathi throughout, कॉफ़ी in the Hindi cues. Confirm. *(M1-M5 Q7)*
15. **The neuter house style.** The course writes the spoken Pune neuter everywhere — माझं, आवडतं,
    हवं, थोडं, केलं, प्यायलं, ऐकलं — rather than the written -े (माझे, आवडते, केले). It is
    consistent across all ten modules and it is what the learner will hear. Is it also what he
    should *write*, given he will meet printed Marathi in -े? If both are wanted, the cheapest place
    to say so is one clause in M1's rule 2. *(new)*

### Pedagogy calls (a native ear helps, but the owner decides)

16. **तू first.** The course teaches तू as the default second person from M2 and तुम्ही as the
    polite/plural one. For an adult learner whose first real conversations will be with strangers
    and elders, is तू-first the right order, or should तुम्ही lead? *(new)*
17. **आपण's second job** — आपण is also a very polite "you" (आपण कुठे राहता?). Should M10 flag it in
    one clause, the way M9 flags का's two seats? *(M6-M10 Q6)*
18. **The `का` forward reference.** Correction 4 puts "in the MIDDLE it means why (M9)" into M2's
    word row, because that row is what the app shows for M9's का. Is naming the second seat at M2
    too early, or useful foreshadowing? If too early, the alternative is an engine change (letting a
    later module re-own a surface), which is a bigger conversation. *(new — introduced by this pass)*
19. **Register chips.** M1-S09 (मला भात खूप आवडतो) is `informal` while the near-identical M1-S08 is
    `neutral`; M2's तू sentences and M3-S04/S05 are `informal`; in M10, S01/S03/S06/S08/S09 are
    `informal` and S05/S10 `neutral`. Is **आपण उद्या भेटू का?** informal or neutral? A single pass
    over all 100 chips by a native ear would settle the set. *(M1-M5 Q6 + M6-M10 Q8, merged)*
20. **Should L1 admit that ने exists?** M5 rule 1 now correctly says only that मी and तू never take
    it. A learner may still conclude Marathi has no ergative at all, and meet त्याने / रामाने in
    L2. One parenthetical clause would inoculate them; it also imports third-person material into
    a level that has none. *(new)*

### Sound notes — phonetic claims no text reviewer can verify

21. From M1-M5: भाषा ≈ "भाशा" (M1-S04), "मराठी का ठ मूर्धन्य" (M1-S05), झ described as "नरम" in
    झोपतो / तुझं (M2-S04, M4-S06). *(M1-M5 Q9)*
22. From M6-M10: झ "नरम" again in झाला (M9-S06), म्ह in म्हणून "एक झटके में" (M9-S02), शंभर =
    "शम्भर" (M8-S10), and the ळ / ण claims (केळी, घराजवळ, जाणार, आपण). *(M6-M10 Q9)*

## Verification

- `npm run content:validate` → `CONTENT 12/12 ok`
- `npm run content:build` (strict) → `hi-mr 10 modules (L1-M1..M10)`; per-module index surface
  counts unchanged (206 at M10), because no correction touched an indexed surface
- the resolution audit above, re-run after the corrections: unchanged
- `scripts/verify.sh` (full) → `TYPES ok | LINT ok | TEST 1117/1117 ok | CONTENT ok | FONTS ok |
  BUILD ok | BUDGET ok`
- Payload, measured: `BUDGET fonts` **361.2 KiB** (unchanged — the corrections introduce no
  Devanagari glyph the subsets did not already carry), `BUDGET js` 94.2 KiB gzip (unchanged),
  `BUDGET total` 548.1 → **548.3 KiB gzip**, i.e. +0.2 KiB of prose against a 580 KiB limit.
