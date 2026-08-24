# LLM review — en-ar, the third-variation pass

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Fable 5), which
does not speak Arabic natively and cannot hear anything. `verified: true` on all ten en-ar modules
still rests on the repo owner's authority, exactly as the four earlier en-ar reviews say; each of
the ten was re-read whole here — rules, word rows, notes, traps, sentences, variations and pools —
and now carries `verifiedAt: "2026-08-24"` with this pass's signature (L1-M3, M5, M7 and M9 are
restamped from the 2026-08-13 review; the other six already carried today's date from #283).
**No native Arabic speaker has read a word of this course**, and the open questions at the bottom
continue `docs/16-llm-review-en-ar-surfaces.md`'s numbering, joining the 69 already outstanding
across `docs/07-llm-review-en-ar-L1-M1-M2.md`, `docs/09-llm-review-en-ar-L1-M3-M5.md`,
`docs/10-llm-review-en-ar-L1-M6-M10.md` and docs/16.

This is issue **#287**. Going in, en-ar carried 194 variations across 100 sentences — 94 sentences
at two and six at ONE (M1-S04, M2-S01, M2-S02, M2-S04, M2-S07, M2-S08). Coming out it carries
**298**: 98 sentences at three, and the two halves of the salām exchange at two, each with a
recorded exemption below. **Nothing else moved**: no sentence, no word row, no rule, no existing
variation was deleted or reworded — the diff inside each sentence is appended variation objects
only, plus the verification restamp on the four 08-13 modules. The re-read found no outright error
in the 194 existing lines, so acceptance criterion 4 records zero fixes.

## Method

The constraint #287 inherits from #283: a variation a learner reads in M2 has only M2's cumulative
index behind it, and `tools/content-build.test.ts` sweeps every en-ar variation line against the
index of the module that shows it, pinned at six decided misses. So every new variation was
authored **from the module's own cumulative surface set** (27 → 52 → 73 → 104 → 135 → 168 → 195 →
224 → 263 → 283 keys) and swept through the real engine (`matchSurfaces` + `tokenizeSurface`,
`src/engine/surface.ts`) against the emitted `public/content/en-ar/index/L1-M*.json` before and
after authoring — plus a codepoint audit proving every character in the new `display` and `script`
lines already occurs in the course (no romanization drift, no new glyph for the font subset).

**Result: zero new misses.** The sweep still reports exactly the six pinned lines — `priyā` twice,
`miṣr`, `marḥaban`, `ṣabāḥ` + `an-nūr` — so the pin and the paradigm-seam tests are untouched. No
new line goes anywhere near the seams: nothing contains `an-nūr`, `marḥaban` or a proper noun the
index does not carry (`Rohān` is the only name used, and it is indexed from M1).

**The additions-only index proof was run and is trivial by design**: variations are never indexed
(`content-build` indexes what is taught, never what is shown), so
`public/content/en-ar/index/*.json` saved before the change and rebuilt after it are
**byte-for-byte identical** — 0 keys lost, 0 moved, 0 added, `maxSpan` unchanged.

**The #283 surfaces earn their screen time.** The feminine …-īn cluster that pass indexed is what
this pass's "address a woman" thirds stand on: `tuḥibbīn` (M1-S05, M2-S10), `tadhhabīn` (M4-S01),
`sa-tadhhabīn` (M6-S01, M10-S02) and the already-shown `tatakallamīn` stay resolvable where they
are shown; `masāʾ al-khayr` still resolves whole in M2; `bi-riyāl` prices M10-S04's third;
`ʿindaki`, `sayyāratuki`, `min faḍliki` and `ḥāluki` carry the other to-a-woman lines.

## What the third axis is, per sentence

Each new variation takes a structural axis the sentence's existing set did not: person shift
(including the feminine address the issue asked for), negation, question form, answer pivot, tense
contrast, frame flip, agreement chain, or seat/order change. No bare noun swaps.

### L1-M1 — Who I am

M1 stays statement-only (hal is M2's lesson) and inside the 5-word envelope, as the en-es pass
ruled for its M1; the thirds complete taught paradigms and compose taught frames instead.

| sentence | new variation | axis |
|---|---|---|
| S01 ismī Rohān | ismuka Rohān | -ī → -uka: the suffix turned on the listener |
| S02 anā min al-Hind | anā Rohān, min al-Hind | name + origin in one verbless line |
| S03 anā ṭālib | ismī Rohān wa anā ṭālib | wa joins two verbless statements |
| S04 anā saʿīd (was at ONE) | Rohān saʿīd · anā saʿīd wa uḥibb al-mūsīqā | name subject; adjective half + verb half |
| S05 uḥibb al-qahwa | tuḥibbīn al-qahwa | the feminine cell #283 indexed, on its own row's sentence |
| S06 uḥibb al-mūsīqā | tuḥibb al-mūsīqā | u- → tu-: you |
| S07 urīd qahwa | urīd qahwa wa māʾ | wa joins two bare requests |
| S08 urīd māʾ | uḥibb al-qahwa wa urīd māʾ | both article laws in one line |
| S09 uḥibb al-Hind kathīran | tuḥibb al-Hind kathīran | u- → tu-, kathīran holds its seat |
| S10 anā ṭālib wa uḥibb al-mūsīqā | Rohān ṭālib wa yuḥibb al-mūsīqā | whole frame to third person, verb agrees across wa |

### L1-M2 — First exchange

| sentence | new variation | axis |
|---|---|---|
| S01 as-salāmu ʿalaykum (was at ONE) | wa ʿalaykum as-salām | the fixed reply — **stays at 2, exemption 1** |
| S02 wa ʿalaykum as-salām (was at ONE) | wa ʿalaykum as-salām, kayfa ḥāluka? | reply flows into the question — **stays at 2, exemption 2** |
| S03 ṣabāḥ al-khayr, Rohān | ṣabāḥ al-khayr, kayfa ḥāluka? | greeting opens the exchange |
| S04 kayfa ḥāluka? (was at ONE) | hal anta bi-khayr? · naʿam, anā bi-khayr | how → yes/no; then its answer |
| S05 anā bi-khayr, shukran | anā bi-khayr, wa anta? | the return question |
| S06 hal anta min al-Hind? | hal anti min al-Hind? | anta → anti |
| S07 naʿam, anā min al-Hind (was at ONE) | naʿam, uḥibb ash-shāy · naʿam, Rohān min al-Hind | verb statement behind naʿam; answering for someone else |
| S08 hal anti ṭāliba? (was at ONE) | naʿam, anā ṭāliba · hal anti saʿīda? | her answer; the anti chain on an adjective |
| S09 lā, anā mudarrisa | naʿam, anā mudarrisa | the guess was right: lā → naʿam |
| S10 hal tuḥibb ash-shāy? | hal tuḥibbīn ash-shāy? | the -īn tail: the question to a woman |

### L1-M3 — Needs and wants

| sentence | new variation | axis |
|---|---|---|
| S01 urīd ʿaṣīr | hal turīd ʿaṣīr? | request → offer |
| S02 lā urīd al-ḥalīb | urīd ḥalīb | refusal undone; the article contrast |
| S03 urīd an ashrab al-qahwa | urīd an ashrab qahwa sākhina | the an-frame carrying agreement |
| S04 hal turīd qahwa? | turīd qahwa | hal dropped: the she-reading of turīd |
| S05 lā, urīd māʾ faqaṭ | naʿam, urīd māʾ faqaṭ | refusal → acceptance, faqaṭ holds |
| S06 hal turīdīn shāy? | naʿam, urīd shāy | her answer: -īn asks, u- answers |
| S07 naʿam, urīd qahwa sākhina | hal turīdīn qahwa sākhina? | acceptance → the offer, to a woman |
| S08 al-qahwa sākhina jiddan | hal al-qahwa sākhina? | hal over a verbless sentence |
| S09 urīd sayyāra kabīra | urīd bayt kabīr | masculine noun forces the bare adjective |
| S10 urīd al-bayt al-kabīr | hal turīd al-bayt al-kabīr? | the choice offered, both al- staying |

### L1-M4 — My day

| sentence | new variation | axis |
|---|---|---|
| S01 adhhab ilā al-madrasa kull yawm | tadhhabīn ilā al-madrasa kull yawm | the feminine -īn on this verb (#283's key) |
| S02 ashrab al-qahwa fī aṣ-ṣabāḥ | hal tashrab al-qahwa fī aṣ-ṣabāḥ? | habit → question |
| S03 ākul al-fākiha kull yawm | yaʾkul al-fākiha kull yawm | taʾ- → yaʾ-: he |
| S04 yashrab ash-shāy dāʾiman | lā yashrab al-qahwa | negated habit |
| S05 tashrab al-ḥalīb aḥyānan | nashrab al-ḥalīb aḥyānan | ta- → na-: we |
| S06 adhhab ilā al-ʿamal fī aṣ-ṣabāḥ | matā tadhhab ilā al-ʿamal? | the when-question |
| S07 matā tashrab al-qahwa? | ashrab al-qahwa fī al-layl | the answer: a time phrase takes matā's seat |
| S08 al-yawm adhhab ilā al-ʿamal | adhhab ilā al-ʿamal al-yawm | al-yawm to the end seat |
| S09 hal tashrab al-qahwa fī al-layl? | lā, lā ashrab al-qahwa fī al-layl | two lā, two jobs |
| S10 nashrab ash-shāy fī al-masāʾ | lā nashrab ash-shāy fī al-layl | negation on the na- verb |

### L1-M5 — Yesterday

M5's bound holds: no past negation anywhere — every third is affirmative or a hal question. The
unshown suffix cells come on screen: `dhahaba`, `sharibta`, `akalta`, `akala`, `shariba`, `kāna`
alone, `kunta` questioned.

| sentence | new variation | axis |
|---|---|---|
| S01 ams dhahabtu ilā al-madrasa | dhahaba ilā al-madrasa ams | -tu → -a: he |
| S02 sharibtu qahwa ams | hal sharibta al-qahwa? | did-you, with no "did" |
| S03 akaltu al-fākiha ams | hal akalta al-fākiha ams? | -ta questioned |
| S04 hal dhahabta ilā as-sūq ams? | hal dhahabta maʿa Rohān? | the follow-up: company |
| S05 kuntu fī al-bayt ams | kāna fī al-bayt ams | the kāna cell |
| S06 kuntu taʿbān ams | hal kunta taʿbān ams? | kunta questioned, adjective bare |
| S07 kāna al-jaww bārid ams | hal kāna al-jaww bārid ams? | hal over the kāna sentence |
| S08 ams dhahabtu ilā al-maṭʿam | dhahabtu ilā al-maṭʿam wa akaltu | two verbs, two -tu |
| S09 ams dhahabtu ilā as-sūq maʿa Rohān | hal kunta maʿa Rohān ams? | kāna + maʿa, asked |
| S10 ams akaltu al-khubz wa sharibtu al-ḥalīb | akala al-khubz wa shariba al-ḥalīb | the chain in he |

### L1-M6 — Tomorrow

M6's bound holds too: no future negation — S04's lā is the standalone answer-no with an
affirmative plan behind it, the shape M10-S02's existing variation already ships.

| sentence | new variation | axis |
|---|---|---|
| S01 sa-adhhab ilā al-madrasa ghadan | sa-tadhhabīn ilā al-madrasa ghadan | sa-tadhhabīn as a plain statement (#283's key) |
| S02 sawfa adhhab ilā al-ʿamal ghadan | sawfa yadhhab ilā al-ʿamal | person shift under sawfa |
| S03 ghadan sa-ashrab qahwa fī aṣ-ṣabāḥ | hal sa-tashrab qahwa ghadan? | plan → question |
| S04 hal sa-tadhhab … baʿd aẓ-ẓuhr? | lā, sa-adhhab ghadan | the no-answer, plan moved |
| S05 ghadan ākul fī al-bayt, in shāʾ Allāh | ghadan yaʾkul fī al-bayt, in shāʾ Allāh | his plan, ghadan alone carrying it |
| S06 sa-yakūn al-jaww bārid ghadan | hal sa-yakūn al-jaww bārid ghadan? | the forecast questioned |
| S07 sa-akūn mashghūl ghadan | hal sa-takūn mashghūl ghadan? | the excuse asked for in advance |
| S08 sa-adhhab ilā as-sūq al-usbūʿ al-qādim | sa-nadhhab ilā as-sūq al-usbūʿ al-qādim | a- → na-: ours |
| S09 qarīban sa-adhhab ilā al-Hind | sawfa adhhab ilā al-Hind qarīban | sa- ↔ sawfa contrast |
| S10 ghadan sa-ākul al-khubz wa sa-ashrab al-ḥalīb | sa-yaʾkul al-khubz wa sa-yashrab al-ḥalīb | the chain in he, each sa- its own |

### L1-M7 — Where things are

| sentence | new variation | axis |
|---|---|---|
| S01 al-kitāb ʿalā aṭ-ṭāwila | hal al-kitāb ʿalā aṭ-ṭāwila? | location questioned |
| S02 al-miftāḥ taḥt al-kitāb | ayna al-miftāḥ? | the question it answers |
| S03 ayna al-kitāb? | taḥt aṭ-ṭāwila | the minimal answer, subject dropped |
| S04 hunāka kitāb ʿalā aṭ-ṭāwila | hal hunāka kitāb ʿalā aṭ-ṭāwila? | existence questioned |
| S05 as-sayyāra amām al-bayt | sayyāratī amām al-bayt | article → -ī (S09's suffix, in-module forward use) |
| S06 Rohān fī as-sūq al-yawm | ayna Rohān? | ayna + a name |
| S07 bāb al-bayt kabīr | ayna bāb al-bayt? | the iḍāfa inside a question |
| S08 ʿindī sayyāra kabīra | ʿindaki sayyāra kabīra | the -aki cell: the owner is a woman |
| S09 sayyāratī amām al-madrasa | ayna sayyāratuki? | the question, to a woman |
| S10 baytī qarīb min as-sūq | hal baytuka qarīb min as-sūq? | suffix turned on the listener, questioned |

### L1-M8 — Numbers & shopping

| sentence | new variation | axis |
|---|---|---|
| S01 kam kitāb ʿindaka? | kam kitāb ʿindahu? | asking about him, not asking him |
| S02 bi-kam hādhā? | bi-kam hādhihi as-sayyāra? | the feminine thing named |
| S03 urīd khubz, min faḍlika | urīd khubz wa ḥalīb, min faḍlika | wa joins the order |
| S04 ʿindī kitāb wāḥid | ʿindī kitāb wāḥid faqaṭ | faqaṭ closes the count |
| S05 ʿindī kitābān | hunāka kitābān ʿalā aṭ-ṭāwila | the dual on M7's existence frame |
| S06 urīd thalātha kutub, min faḍlika | urīd thalātha kutub, min faḍliki | the order placed with a woman |
| S07 ʿindahu thalāth sayyārāt | hunāka thalāth sayyārāt amām al-bayt | the counted plural announced and located |
| S08 hādhā bi-khamsa riyālāt | hādhā al-kitāb bi-khamsa riyālāt | the priced thing named in full |
| S09 hādhā ghālī wa hādhā rakhīṣ | hal hādhā ghālī? | the shop question |
| S10 ashtarī al-fākiha min as-sūq | yashtarī al-khubz min as-sūq | a- → ya- on the shopping verb |

### L1-M9 — Feelings & opinions

| sentence | new variation | axis |
|---|---|---|
| S01 anā taʿbān li-ʾannī dhahabtu ilā al-ʿamal | limādhā anta taʿbān? | the question it answers |
| S02 anā jāʾiʿ, li-dhālika sa-ākul al-khubz | anā jāʾiʿ li-ʾannī lā ākul fī aṣ-ṣabāḥ | a negated habit as the reason |
| S03 limādhā anta ḥazīn? | anā ḥazīn li-ʾanna al-jaww bārid | the li-ʾanna answer |
| S04 anā ghāḍib li-ʾanna al-qahwa bārida | al-qahwa bārida, li-dhālika anā ghāḍib | the facts turned round |
| S05 al-mūsīqā jamīla jiddan | hal al-mūsīqā jamīla? | the judgement asked |
| S06 fī raʾyī, al-ʿarabiyya ṣaʿba | fī raʾyī, al-ʿarabiyya jamīla wa ṣaʿba | one opinion, two adjectives |
| S07 hādhā sahl, li-dhālika anā saʿīd | hādhā ṣaʿb, li-dhālika anā ḥazīn | the line in negative image |
| S08 lā adhhab ilā as-sūq bi-sabab al-jaww | sa-akūn fī al-bayt bi-sabab al-jaww | bi-sabab across a tense |
| S09 al-ʿamal muhimm li-ʾannī urīd sayyāra | limādhā al-ʿamal muhimm? | limādhā over a thing |
| S10 lā urīd al-qahwa li-ʾannī sa-anām | lā yurīd al-qahwa li-ʾannahu sa-yanām | the whole line in third person |

### L1-M10 — Connected talk

Every third stays inside the turn discipline (short sentences, none past eight words).

| sentence | new variation | axis |
|---|---|---|
| S01 (greeting turn) | kayfa ḥāluka? bi-khayr, shukran, wa anta? | the short exchange; bi-khayr answers alone |
| S02 (lākin turn) | hal sa-tadhhabīn …? naʿam, lākin sa-adhhab fī al-masāʾ. | whole turn to a woman; her answer unchanged |
| S03 (ayḍan turn) | bi-kam hādhā? wa urīd qahwa ayḍan. | the order grows mid-purchase |
| S04 (price turn) | bi-kam hādhihi? hādhihi bi-riyāl wāḥid. ṭayyib. | feminine exchange; bi-riyāl (#283's key) prices the single |
| S05 (thumma turn) | anā jāʾiʿa. sa-ākul, thumma … | -a for the speaker; the sa- verbs unmoved |
| S06 (ṭabʿan turn) | naʿam, ṭabʿan. uḥibb ash-shāy kathīran. | the answer alone, turned up |
| S07 (atakallam turn) | … lā, atakallam qalīlan faqaṭ. | the modest no |
| S08 (goodbye turn) | … ilā al-liqāʾ! | the other farewell |
| S09 (maʿī turn) | lā, anā mashghūl al-yawm. sa-adhhab maʿaka ghadan. | declining with a counter-offer |
| S10 (maʿan turn) | naʿam! sa-nadhhab maʿan baʿd aẓ-ẓuhr, in shāʾ Allāh. | acceptance takes a time and the soft tail |

## The two exemptions — the salām exchange stays at two

The issue named this call and left it to the author; taken as offered.

1. **M2-S01 `as-salāmu ʿalaykum`** (now: `marḥaban` + the reply `wa ʿalaykum as-salām`). The
   sentence's own trap rules the frame: "It is one fixed greeting, and it has one fixed answer."
   Its variation space is therefore the exchange itself, and both cells are now shown. Any third
   would be a sibling greeting — and the two honest candidates are locked: another `marḥaban`-class
   line re-raises the unresolvable surface the sweep pins once and only once, and the
   `ṣabāḥ an-nūr` family is barred outright by the additions-only lockout (`an-nūr`'s hyphen part
   would steal M3's `an` — docs/16, exemption 2). A third built from taught words would dismantle
   a formula the module insists is not built from words.
2. **M2-S02 `wa ʿalaykum as-salām`** (now: the short `wa ʿalaykum` + the reply flowing into
   `kayfa ḥāluka?`). Same frame, same lock: the reply has exactly one shape, its short form, and
   its seat in the exchange — all three on screen. A third would repeat S01's greeting as a line
   of its own, which teaches nothing the pair does not already.

## Calls this pass had to make

1. **M1 stays statement-only and inside five words.** No hal, no lā, no question mark in any M1
   line — they are M2's and M3's lessons — and every third fits the module's envelope, which
   forced composition (wa-frames) over new machinery.
2. **The M5/M6 negation bounds are respected.** No past or future verb is negated anywhere: M5's
   thirds are affirmative or hal questions; M6-S04's `lā` is the standalone answer-no, followed by
   an affirmative plan — the exact shape M10-S02's existing variation established.
3. **Rohān is the only proper noun.** `Priyā` and `Miṣr` live in pinned-miss lines that the sweep
   counts exactly once each; a new line carrying either would break the pin, so every new line that
   needs a person uses the indexed `Rohān` (or a suffix).
4. **In-module forward use is allowed**, as the course already ships (M3-S02 shows `sākhina`
   before S07 teaches it): M7-S05's third uses S09's `sayyāratī`, M2-S10's third uses the
   `tuḥibbīn` cell #283 put on M1's row. A learner who taps them lands on the right row.
5. **Where an axis needed an untaught surface, the line was re-planned around a taught one.**
   `tashrabīn`, `taʾkulīn`, `sa-yashtarī`, `dhahabat`, `ḥāluhu`, `li-ʾannahā` and bare `fī` +
   place before M7 are not index keys, so no line uses them — the question forms lean on hal/ayna/
   matā/limādhā and the suffix sets instead.
6. **No existing variation was deleted or reworded** — the re-read found no outright error in the
   194 existing lines (zero fixes to record).

## Verification

- variation sweep through the real engine, per module: **298/298 lines, zero new misses** — the
  only misses are the six pinned in `tools/content-build.test.ts`, unchanged
- codepoint audit: every character in the new display/script lines already occurs in en-ar content
- `public/content/en-ar/index/*.json` before vs after `npm run content:build`: **byte-identical**
  (0 lost, 0 moved, 0 added; variations are never indexed)
- `npm run content:validate` → **CONTENT 40/40 ok**
- `scripts/verify.sh` → `TYPES ok | LINT ok | TEST 1331/1331 ok | CONTENT ok | FONTS ok | BUILD ok | BUDGET ok`
- Payload, measured: `course:en-ar` **109.5 → 114.6 KiB** gzip against 360, `precache:en-ar`
  324.0 → **329.1 KiB** against 590; shell and the other three courses unmoved by this change

## Open questions for a native pass

Numbering continues docs/16's list (which ended at 8); these ten join the 69 already outstanding
for en-ar, for 79 in all.

9. **`tuḥibbīn` on screen in M1 and M2** (M1-S05, M2-S10) — docs/16 [1] asked whether the form
   chip belongs on M1's row at all; this pass now shows the form in variation lines one and two
   modules before M3 teaches the -īn ending. The changed lines gloss it each time, but is showing
   an unlearnable-yet form a preview or a flood?
10. **`wa anta?` as the return question** (M2-S05, M10-S01). Transparent from taught words and
   universal in speech — but no row teaches the bare-pronoun question, and a native reviewer may
   hear it as more colloquial than the course's written-MSA register.
11. **`anā Rohān, min al-Hind`** — the comma apposition at rung 1, the same question the en-es
   pass recorded for `Soy Rohan, de India`. Should it be two sentences?
12. **`taḥt aṭ-ṭāwila` as a whole variation line** (M7-S03). The subject-dropped answer fragment
   — honest speech, but is a two-word fragment the right thing in a generation-focused course?
13. **The hal-over-verbless drumbeat.** Five thirds ask hal of a verbless sentence
   (M3-S08, M7-S01, M7-S04, M8-S09, M9-S05). Each is real MSA and the shape M2 taught with
   `hal anta …?`; is the repetition across modules a reinforcement or a rut?
14. **`ismuka Rohān`** — stated to the man himself, it only works as confirmation ("so YOUR name
   is Rohan"). Is the cue's plain reading natural enough without that context?
15. **`lā, sa-adhhab ghadan` / `lā, anā mashghūl al-yawm`** — the answer-no followed by an
   affirmative plan, because lan/laysa are out of L1. Does the pattern quietly teach that lā
   cannot negate these sentences, or does it just look evasive?
16. **`hunāka kitābān ʿalā aṭ-ṭāwila` / `hunāka thalāth sayyārāt amām al-bayt`** — existence +
   counted noun + place, in that order. Natural, or would a native front the place phrase?
17. **`qalīlan faqaṭ`** (M10-S07) — "a little, only". Standard stacking, or double limiting a
   native would trim?
18. **The S08 farewell seam** (M10). The third swaps in `ilā al-liqāʾ`, which S10's note says
   either side may say. But S08's display has the LEAVER saying `maʿa as-salāma` while its own
   word note says that phrase is said TO the one leaving — a pre-existing tension this
   append-only pass did not touch. Worth a native ruling on who says what.
