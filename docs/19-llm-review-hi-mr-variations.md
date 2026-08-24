# LLM review — hi-mr, the third-variation pass

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Fable 5), which
does not speak Marathi natively and cannot hear anything. `verified: true` on all ten hi-mr modules
still rests on the repo owner's authority, exactly as the earlier hi-mr reviews say; each of the
ten was re-read whole here — rules, word rows, notes, traps, sentences, variations and pools — and
now carries `verifiedAt: "2026-08-24"` with this pass's signature. **No native Marathi speaker has
read a word of this course**, and the open questions at the bottom join the 30 already outstanding
in `docs/08-marathi-third-review.md` (1–22) and `docs/15-llm-review-hi-mr-surfaces.md` (23–30).

This is issue **#286**, hi-mr's twin of #285 (`docs/18-llm-review-en-es-variations.md`). Every
hi-mr sentence carried exactly two variations (200 across 100 sentences); every sentence now
carries three (300). **Nothing else moved**: no sentence, no word row, no rule, no existing
variation was deleted or reworded — the diff inside each module is one appended `variations[2]`
per sentence and the verification stamp (506 insertions, 6 deletions, all six the old
`verifiedAt` lines). **No sentence stayed at two, so no exemption was needed.**

## Method

The constraint #286 inherits from #282: a variation a learner reads in M1 has only M1's cumulative
index behind it, and `tools/content-build.test.ts` sweeps every hi-mr variation line against the
index of the module that shows it, pinned at three decided misses. So every third variation was
authored **from the module's own cumulative surface set** (26 → 47 → 67 → 105 → 135 → 151 → 172 →
194 → 212 → 215 keys) and swept through the real engine (`matchSurfaces` + `tokenizeSurface`,
`src/engine/surface.ts`) against the emitted `public/content/hi-mr/index/L1-M*.json` before and
after authoring.

**Result: zero new misses.** The sweep reports 300 lines and exactly the three pinned ones — the
proper noun `प्रिया` (M1-S01, #282's exemption 0) and the two recorded exemptions `पाच` (M8-S07)
and `बोललो` (M9-S04) — all in *pre-existing* lines. No new line leans on any of them, no new
proper noun was introduced anywhere (`रोहन` is an indexed row and appears only where every
module's index already carries it), and the pin in `tools/content-build.test.ts` is untouched.

**The additions-only index proof is trivial this time, and was still run.** Variations are never
indexed (`content-build` indexes what is taught, never what is shown), so
`public/content/hi-mr/index/*.json` saved before the change and rebuilt after it are
**byte-for-byte identical**: 0 keys lost, 0 moved, 0 added, `maxSpan` unchanged (1 throughout).
The #282 paradigm-seam pins (झोपणार on M4's own row, जाणार/जाऊ on M6-S01 against M10's re-teach,
येणार/येईन as sibling rows, खाऊ deliberately absent, दुकानाजवळ beside घराजवळ, आपण/आम्ही sharing
one row while भेटू keeps its own) all still pass.

**#282's new surfaces now earn their screen time.** The forms #282 taught but no sentence showed
are the backbone of this pass's thirds: `जाऊ` (M6-S01, in its own index-home module), `येईल`
(M6-S04 and M10-S06), `येशील` (M6-S07), `खाशील` (M6-S10), `झोपणार` as a statement (M6-S05), and
`दुकानाजवळ` re-shown on its own row's sentence (M7-S06). `आम्ही` was already on screen (M10-S06's
existing variation). Beyond #282's list, seven more listed-but-never-shown forms now appear:
`खाता` (M4-S04), `खाल्लास` (M5-S01), `झोपलीस` (M5-S05), `केला` (M5-S06), `ऐकली` (M5-S08),
`गेलीस` (M5-S10) and `रुपया` (M8-S10).

## What the third axis is, per sentence

Each third takes a structural axis the sentence's two existing variations do not: person shift,
negation, question form, tense/frame contrast, agreement chain, order flip, or the
question–answer pivot. Bare noun swaps were not used; where a noun changes, the agreement visibly
changes with it.

### L1-M1 — Who I am

M1 has no questions and no negation (both are M2's lesson) and its variations respect the 5-word
envelope, so the thirds complete the module's own paradigms instead: the possessive-inside-liking
chain माझं नाव आवडतं · माझा देश आवडतो · माझी भाषा आवडते spreads the three genders across S01, S05
and S06 with double agreement in every line, and S03/S04 are a deliberate mirrored fronting pair.

| sentence | third variation | axis |
|---|---|---|
| S01 माझं नाव रोहन आहे | मला माझं नाव आवडतं | frame flip — नाव enters the liking frame, neuter chain माझं…आवडतं |
| S02 मी विद्यार्थी आहे | मी भारतीय विद्यार्थिनी आहे | invariant adjective + feminine noun chain |
| S03 माझा देश भारत आहे | भारत माझा देश आहे | predicate fronted, agreement held (m) |
| S04 माझी भाषा हिंदी आहे | हिंदी माझी भाषा आहे | predicate fronted, agreement held (f) |
| S05 मला मराठी आवडते | मला माझा देश आवडतो | masculine completes the row's triple, double chain माझा…आवडतो |
| S06 मला संगीत आवडतं | मला माझी भाषा आवडते | feminine completes the set, double chain माझी…आवडते |
| S07 मला चहा आवडतो | चहा मला खूप आवडतो | the liked thing fronted as real subject (rule 4's point) |
| S08 मला कॉफी आवडते | मला भारत खूप आवडतो | f → m agreement flip with खूप held invariant |
| S09 मला भात खूप आवडतो | मला संगीत खूप आवडतं | neuter completes the खूप set — खूप identical in all three genders |
| S10 मी भारतीय आहे | मी भारतीय विद्यार्थी आहे | the two identity words stack; आहे still tracks person, not gender |

### L1-M2 — First exchange

S02 and S10 are a planned question–answer arc: कसा turned on a THING (चहा कसा आहे? — where Hindi
कैसी misleads, चहा being masculine) and बरा answering for that thing (चहा बरा आहे) — rule 3's
"agrees with the subject" extended past persons, which the S10 mistake plate already prepares
("save the neuter for things").

| sentence | third variation | axis |
|---|---|---|
| S01 नमस्कार, मी रोहन आहे | नमस्कार, तू कसा आहेस? | greeting opens into the question |
| S02 तू कसा आहेस? | चहा कसा आहे? | कसा aimed at a thing; cross-language gender flip |
| S03 मी बरा आहे, आणि तू? | मी बरा आहे, आणि तुम्ही? | register shift in the returned question |
| S04 तुझं नाव काय आहे? | तुझं नाव रोहन आहे का? | काय-question → का-question — the trap's one-letter pair, staged |
| S05 तू विद्यार्थी आहेस का? | तुम्ही विद्यार्थी आहात का? | person chain तू→तुम्ही, आहेस→आहात under का |
| S06 हो, मी विद्यार्थी आहे | हो, मी विद्यार्थिनी आहे | speaker-gender shift inside the answer |
| S07 नाही, मी विद्यार्थी नाही | नाही, मी बरी नाही | feminine speaker under double नाही |
| S08 तुला चहा आवडतो का? | हो, मला चहा खूप आवडतो | Q→A pivot — तुला flips to मला |
| S09 तू बरी आहेस का? | हो, मी बरी आहे | Q→A pivot — person flips, gender held |
| S10 मी बरी आहे, धन्यवाद | चहा बरा आहे | बरा on a thing — answers S02's third |

### L1-M3 — Needs and wants

Negated liking (`आवडत नाही`) is **not** available here — the bare stem आवडत is taught in M9 — so
M3's negations stay on the module's own machinery (नको, and -आयच- + नाही).

| sentence | third variation | axis |
|---|---|---|
| S01 मला चहा हवा आहे | तुला काय हवं? | the open question the display answers; काय takes default neuter हवं |
| S02 मला पाणी हवं | मला पाणी नको, चहा हवा | refuse + want contrast pair, agreement flips to हवा |
| S03 मला कॉफी नको | तुला कॉफी नको का? | negative question — the offer/check |
| S04 तुला चहा हवा का? | नाही, मला चहा नको | the no-answer: answer-नाही and refusal-नको doing different jobs |
| S05 हो, मला थोडा चहा हवा | मला थोडं पाणी प्यायचं आहे | quantity inside the -आयच- frame, neuter chain थोडं…प्यायचं |
| S06 मला दूध नको, साखर हवी | मला साखर हवी, दूध नको | the pair's order flipped, agreement held |
| S07 मला चहा प्यायचा आहे | तुला चहा प्यायचा आहे का? | question form on the -आयच- frame |
| S08 मला मराठी शिकायची आहे | मला संगीत शिकायचं नाही | negation + neuter agreement in the same frame |
| S09 मला भात खायचा आहे | मला आता भात खायचा नाही | negation + आता — "not right now" |
| S10 मला आता पाणी प्यायचं आहे | तुला आता काय प्यायचं आहे? | open काय-question in the -आयच- frame |

### L1-M4 — My day

Habitual negation (`करत नाही`) needs the bare -त stem, which L1 never teaches — so M4's thirds work
person, question and chaining instead. S04 puts the polite `खाता` on screen (the rule-4 false
friend, listed on the row and shown nowhere before). Questions to a woman are limited by the
index (खातेस, झोपतेस are not listed forms), which is why S05–S08's questions address a man.

| sentence | third variation | axis |
|---|---|---|
| S01 मी रोज सकाळी उठतो | मी रोज सकाळी लवकर उठतो | लवकर into the verb slot; no आहे, still |
| S02 मी सकाळी चहा पितो | तू सकाळी काय पितोस? | open question + तू's -स |
| S03 नंतर मी काम करतो | मी सकाळी उठते, नंतर काम करते | routine chain, both verbs agreeing feminine |
| S04 मी दुपारी भात खाते | तुम्ही दुपारी भात खाता का? | polite -ता (the false friend) + का |
| S05 मी संध्याकाळी मराठी शिकतो | तू कधी मराठी शिकतोस? | कधी question on the module's own subject |
| S06 मी रात्री लवकर झोपतो | तू रोज लवकर झोपतोस का? | yes/no question, -स held |
| S07 तू कधी उठतोस? | मी रोज लवकर उठतो | Q→A pivot — the -स drops in the answer |
| S08 मी रोज संगीत ऐकतो | तू कधी संगीत ऐकतोस? | कधी question, new verb |
| S09 तुम्ही रोज काम करता का? | हो, मी रोज काम करतो | Q→A pivot — करता (you, polite) answered by करतो (I) |
| S10 मी रात्री थोडं वाचतो | मी रात्री थोडं वाचतो, नंतर झोपतो | the day's last chain: read, then sleep |

### L1-M5 — Yesterday

The big gender zone gets its unshown cells: खाल्लास, झोपलीस, गेलीस, केला, ऐकली all appear in a
line for the first time. S03's third puts the module's two agreement RULES face to face in one
sentence — प्यायलं with the object (n), झोपलो with the speaker (m).

| sentence | third variation | axis |
|---|---|---|
| S01 मी काल भात खाल्ला | तू काल भात खाल्लास का? | question — object agreement + तू's -स stacked |
| S02 मी काल कॉफी प्यायली | मी काल कॉफी प्यायली नाही | past negation, agreement held |
| S03 मी काल पाणी प्यायलं | मी काल पाणी प्यायलं, नंतर झोपलो | object-rule and subject-rule in one chained line |
| S04 मी काल सकाळी लवकर उठलो | तू काल लवकर उठलास का? | yes/no question on a no-object verb |
| S05 मी काल रात्री लवकर झोपले | तू काल कधी झोपलीस? | the feminine -स question (झोपलीस on screen) |
| S06 मी काल काम केलं | मी काल चहा केला | केलं → केला — object gender flips; करणे as "make (tea)" |
| S07 तू काल कधी उठलास? | मी काल लवकर उठलो | Q→A pivot, -स drops |
| S08 मी काल संगीत ऐकलं | मी काल मराठी ऐकली | ऐकलं → ऐकली — the heard thing turns feminine |
| S09 तू काल चहा प्यायलास का? | नाही, मी काल कॉफी प्यायली | the correcting answer — agreement follows the new drink |
| S10 मी काल घरी गेलो | तू काल घरी गेलीस का? | feminine -स question on the root-changing verb |

### L1-M6 — Tomorrow

The two-futures module shows its person cells at last: जाऊ, येईल, येशील, खाशील — #282's additions,
each on the row that owns it. The -णार rows themselves stay untouched, as their own rule demands.

| sentence | third variation | axis |
|---|---|---|
| S01 मी उद्या घरी जाणार आहे | उद्या घरी जाऊ का? | plan → proposal: the let's -ऊ of the same verb (M10 completes it) |
| S02 मी उद्या काम करणार आहे | तुम्ही उद्या काम करणार आहात का? | polite person chain under का — only आहात moves |
| S03 मी उद्या लवकर उठणार आहे | हो, मी उद्या लवकर उठणार आहे | Q→A pivot on the set's own question — आहेस turns back to आहे |
| S04 तू उद्या येणार आहेस का? | रोहन उद्या येईल का? | third person: the -ईल cell on screen |
| S05 तुम्ही उद्या काय करणार आहात? | मी उद्या लवकर झोपणार आहे | Q→A pivot with झोपणार (M4's stem in its -णार plan) |
| S06 मी उद्या चहा पिणार नाही | तू उद्या चहा पिणार नाही का? | negative question — the surprised check |
| S07 मी उद्या नक्की येईन | तू उद्या येशील का? | person shift -ईन → -शील, questioned |
| S08 मी उद्या मराठी शिकणार आहे | मला उद्या मराठी शिकायची आहे | frame contrast: plan -णार आहे ↔ wish -आयची आहे |
| S09 तू उद्या कधी उठणार आहेस? | मी उद्या लवकर उठणार नाही | the refusing answer: -णार + नाही, आहे dropped |
| S10 मी उद्या भात खाईन | तू उद्या काय खाशील? | open question in the plain future — the -शील cell |

### L1-M7 — Where things are

S03's third stages the module's own trap as a minimal pair: मी आता घरी आहे against S04's existing
मी आता घरात आहे — at home vs inside the house, one letter apart (rule 4). S06 flips the जवळ frame
so the OTHER noun bends (दुकानाजवळ on its own row's sentence).

| sentence | third variation | axis |
|---|---|---|
| S01 माझा फोन टेबलावर आहे | माझा फोन टेबलावर नाही | negated location |
| S02 माझं पुस्तक कुठे आहे? | पुस्तक पिशवीत आहे | the answer, known possessor dropped |
| S03 तुझं पुस्तक घरात आहे | मी आता घरी आहे | घरात/घरी minimal pair on screen |
| S04 मी आता खोलीत आहे | मी खोलीत नाही, बागेत आहे | correction: wrong place negated, right place stated |
| S05 माझी पिशवी टेबलाखाली आहे | माझी पिशवी कुठे आहे? | statement → the searching question |
| S06 दुकान घराजवळ आहे | घर दुकानाजवळ आहे | the frame flipped — now दुकान bends |
| S07 बाग घरासमोर आहे | तुम्ही आता बागेत आहात का? | polite question in the location frame |
| S08 तुझं घर कुठे आहे? | घराजवळ दुकान आहे | place-first "there is" order (rule 3) on -जवळ |
| S09 बाटलीत पाणी आहे | बाटलीत पाणी नाही | negated existence — the empty bottle |
| S10 तुम्ही आता कुठे आहात? | रोहन आता कुठे आहे? | third person completes आहात · आहेस · आहे across the set |

### L1-M8 — Numbers & shopping

The pinned exemption पाच stays untouched: no new line uses it, and all new number talk runs on
indexed numbers (एक, दहा, वीस, शंभर). Plural subjects with आहे were avoided throughout (आहेत is
never taught), which shapes S07's third into the singular.

| sentence | third variation | axis |
|---|---|---|
| S01 हे कितीला आहे? | ही पिशवी कितीला आहे? | the pointer's feminine cell completes the set |
| S02 चहा दहा रुपये आहे | चहा दहा रुपये आहे, कॉफी वीस | contrastive price list, verb gapped |
| S03 मला एक किलो साखर द्या | मला थोडं दूध द्या | measure → थोडं, neuter agreement |
| S04 मला अर्धा किलो चहा द्या | मला अर्धी भाजी द्या | अर्धी directly on the thing — the row's own triple completed |
| S05 ही साखर कितीला आहे? | हा फोन कितीला आहे? | the masculine pointer cell |
| S06 दूध वीस रुपये आहे | दूध कितीला आहे? | statement → the question it answers |
| S07 मला दोन केळी द्या | हे केळं कितीला आहे? | singular केळं priced, हे agreeing |
| S08 हा चहा खूप महाग आहे | हा चहा महाग नाही | negation — महाग invariant either way |
| S09 भाजी पन्नास रुपये किलो आहे | भाजी खूप महाग आहे | the price heard → the opinion said |
| S10 मला शंभर रुपये द्या | हा एक रुपया आहे | रुपया — the singular on screen, हा agreeing |

### L1-M9 — Feelings & opinions

| sentence | third variation | axis |
|---|---|---|
| S01 …कारण मला कॉफी आवडत नाही | मला कॉफी आवडत नाही, म्हणून मी चहा पितो | कारण → म्हणून: same facts, opposite order |
| S02 मला कंटाळा आला, म्हणून मी घरी गेलो | मला कंटाळा आला, म्हणून मी घरी गेले | two agreement systems split: आला with the feeling, गेले with the speaker |
| S03 मला भूक लागली, म्हणून मी भात खाल्ला | तुला भूक लागली का? | the feeling questioned |
| S04 मला राग आला, म्हणून मी काम केलं नाही | तुला राग का आला? | mid-position का — "why" on the feeling frame |
| S05 मला मराठी आवडते कारण भाषा खूप छान आहे | भाषा छान आहे, म्हणून मी रोज शिकते | order flip + feminine habit consequence |
| S06 मला आज आनंद झाला | मला आज आनंद झाला, कारण रोहन आला | कारण-reason; आला in its literal "came" job, same row |
| S07 तुला मराठी का आवडते? | कारण भाषा खूप छान आहे | the bare-कारण answer (Q→A pivot) |
| S08 मला भूक नाही, कारण मी खूप भात खाल्ला | तुला भूक नाही का? | negative question — the feeder's concern |
| S09 मला कॉफी नको कारण मला चहा हवा | तुला कॉफी का नको? | why-question on the refusal — the display is its own answer |
| S10 मला हे पुस्तक आवडतं, म्हणून मी रोज वाचतो | मी रोज वाचतो, कारण मला हे पुस्तक आवडतं | म्हणून → कारण: consequence first, reason after |

### L1-M10 — Connected talk

Every third stays inside the turn discipline (2–3 sentences, each within its own module's
envelope). S06 completes the -ईन/-शील/-ईल person story in a turn; S05 ends the shop exchange with
the walk-away (M3's नको closing an M8 frame).

| sentence | third variation | axis |
|---|---|---|
| S01 (greeting turn) | तू कसा आहेस? मी बरा आहे, आणि तू? | the returned question makes it a full exchange |
| S02 (want + reason turn) | मला कॉफी आवडत नाही. मला चहा द्या. | reason → direct request (M9 + M8 stitch) |
| S03 (plan turn) | तू उद्या काय करणार आहेस? मी उद्या काम करणार नाही. | the negative-plan answer in the question's frame |
| S04 (yesterday story) | मी काल लवकर उठलो. मला कंटाळा आला, म्हणून मी झोपलो. | the story gains a feeling and its consequence |
| S05 (shop turn) | हे कितीला आहे? हे शंभर रुपये आहे. मला हे नको. | the deal refused — नको closes the shop turn |
| S06 (invitation turn) | रोहन उद्या येणार का? हो, रोहन नक्की येईल. | third-person Q→A: -णार question, -ईल answer |
| S07 (feeling → consequence) | मला आज कंटाळा आला. म्हणून मी उद्या बागेत जाणार आहे. | tense contrast across the turn: past feeling, future plan |
| S08 (where turn) | माझी पिशवी कुठे आहे? पिशवी टेबलाखाली आहे. | feminine chain + the short answer (possessive dropped) |
| S09 (let's turn) | आपण उद्या कुठे भेटू? | का → कुठे: the invitation moves to logistics |
| S10 (leave-taking) | मी आता दुकानात जाणार आहे. आपण संध्याकाळी भेटू. | errand + same-day promise — time words swap the frame |

## Calls this pass had to make

1. **M1 stays question-free and negation-free** (both are M2's lesson), so its thirds complete
   paradigms: the possessive-inside-liking triple across S01/S05/S06, the खूप set closed with the
   neuter, and the S03/S04 fronting pair (भारत माझा देश आहे · हिंदी माझी भाषा आहे) — mirrored in
   the Hindi cues, verb still last, agreement unmoved. The en-es pass made the same call for its
   M1 (docs/18, call 1).
2. **`उद्या घरी जाऊ का?` pro-drops आपण.** आपण is M10's word and is not in M6's cumulative index —
   naming it would be a new miss. Bare जाऊ का? is everyday spoken Marathi for "shall we/I go?",
   the surface resolves to its #282 home (M6-S01's जाणार row), and the changed note points to M10
   for the full आपण frame. Open question 36.
3. **The tense envelope beat the index.** झोपणार resolves in M4 (it lives on M4-S06's row since
   #282), but M4 is habitual-only — a future variation there would break the module's own
   `allowedTenses`. Its plan line went to M6-S05 instead. Same discipline as en-es's "M1 stays
   statement-only". The one deliberate softening is M6-S08's wish-frame third (M3's शिकायची आहे
   in the future module) — a frame contrast pointed at tomorrow, the same license en-es M6 took
   with its present-as-future third; open question 38.
4. **No new unresolvable surface, so no new exemption.** Where an axis wanted an untaught form —
   खातेस/झोपतेस/झोपता (unlisted feminine/polite habit cells), बरे (polite बरा), उठलात/प्यायलात
   (polite past), वाचत/करत (habitual negation stems), करीन/पिईन (unlisted plain futures), आहेत
   (plural copula), तो (he), पैसे — the line was re-planned around a taught surface instead. This
   is why M4/M5's तू-questions pick the cells the index carries (झोपलीस, गेलीस yes; खातेस no),
   why M8-S07's third prices the singular केळं rather than the plural, and why no M1–M8 line
   negates liking (आवडत is taught in M9). **खाऊ was never written** — it is deliberately
   unindexed (the noun homograph, #282's seam pin).
5. **`मी काल चहा केला` glosses करणे as "make".** The केलं row is the verb's only home; the tea
   idiom (चहा करणे) is everyday Marathi and the tap lands on the same lexeme's row. The changed
   note carries the gloss shift ("करणे यहाँ 'बनाना' का काम कर रहा है"). Open question 34.
6. **`कारण रोहन आला` uses आला in its literal job.** The आला row is taught as the feeling-engine
   (कंटाळा आला) but its note names it "Past of येणे (M6)" — the literal "came" resolves to the
   same row and completes the story honestly.
7. **In-module forward use is allowed**, as established (the index is module-cumulative): M1's
   early thirds use खूप before S09 teaches it, M4-S01 uses लवकर before S06, M8-S09's opinion uses
   महाग from S08. A learner who taps them lands on the right row.
8. **No existing variation was deleted or reworded** — the re-read found no outright error in the
   200 existing lines (acceptance criterion 3: zero fixes to record). The one edit outside the
   appended thirds is the six `verifiedAt` bumps.

## Verification

- variation sweep through the real engine, per module: **300/300 lines, zero new misses** — the
  only misses are the three pinned in `tools/content-build.test.ts`, unchanged
- `public/content/hi-mr/index/*.json` before vs after `npm run content:build`: **byte-identical**
  (variations are never indexed; the additions-only invariant holds with nothing to prove)
- `npx vitest run tools/content-build.test.ts tools/validate.test.ts` → **106/106** (the hi-mr
  sweep and paradigm-seam pins among them)
- `scripts/verify.sh` → `TYPES ok | LINT ok | TEST 1331/1331 ok | CONTENT ok | FONTS ok | BUILD ok | BUDGET ok`
- `npm run budget` → `course:hi-mr` **339.3 → 344.6 KiB** gzip against 360 (precache:hi-mr
  553.9 → 559.2 against 590); shell and the other three courses unmoved

## Open questions for a native pass

These are this pass's own calls. Nothing below blocks shipping; they continue
`docs/08-marathi-third-review.md` (1–22) and `docs/15-llm-review-hi-mr-surfaces.md` (23–30).

31. **`चहा मला खूप आवडतो`** — the liked thing fronted. Common speech, or marked (contrastive
    topic) enough that calling it a plain variation misleads?
32. **The M1 fronting pair** — `भारत माझा देश आहे` / `हिंदी माझी भाषा आहे`. Natural predicate
    order at this rung, or does it read as emphasis?
33. **`चहा कसा आहे?` → `चहा बरा आहे`** — बरा as "decent/okay" for things: is that the register
    the course wants, or does बरा-on-things read as lukewarm praise a learner shouldn't copy yet?
34. **`मी काल चहा केला`** — करणे for making tea, or would a native reviewer insist on बनवला
    (बनवणे is untaught) and prefer this third re-planned?
35. **`मला अर्धी भाजी द्या`** — the अर्धा row's own trap lists अर्धी भाजी, but is the half-request
    idiomatic at a market, or does it need नाप (अर्धा किलो) to sound real?
36. **`उद्या घरी जाऊ का?`** without आपण — does the let's reading survive the pro-drop, or does it
    tilt toward "shall I go?" (still grammatical, but a different offer)?
37. **`तुला कॉफी का नको?`** — mid-का "why" directly on verbless नको. Correct and natural, or does
    it want a fuller नको आहे?
38. **`मला उद्या मराठी शिकायची आहे`** in the future module — the wish frame pointed at tomorrow as
    a tense-contrast third: helpful bridge or envelope breach?
39. **`हा एक रुपया आहे`** — the singular रुपया on screen. A real line (counting coins), or too
    staged?
40. **`रोहन उद्या येणार का? हो, रोहन नक्की येईल.`** — the name repeated in the answer because L1
    teaches no तो. Acceptable Marathi conversation, or does the repetition jar enough that the
    turn should wait for pronouns?
