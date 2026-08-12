# LLM linguistic review — hi-mr L1-M6…L1-M10

> **2026-08-13 — superseded in part by `docs/08-marathi-third-review.md`.** A third, independent
> LLM pass re-reviewed all ten modules blind and then reconciled against this document. Its
> corrections are applied, and **its open-questions list replaces the nine below** — work from
> `docs/08-marathi-third-review.md`, not from here. That pass also confirmed all nine corrections
> below landed, and fixed one pointer that correction M6-2 introduced ("येईल is his (S10)"; येईल
> occurs nowhere — S10 teaches खाईन vs खाईल).

> ## 2026-08-13 — the flags were flipped, on the owner's authority
>
> All ten hi-mr L1 modules now carry `verified: true`, with
> `verifiedBy: "Fable (Claude Fable 5) — LLM review, authorised by repo owner"` and
> `verifiedAt: "2026-08-13"`. The strict/production build ships them, and the live app at
> https://rishabh7g.github.io/rung/ now serves this content to a learner.
>
> **What that flag now attests, and what it does not.** The repo owner (Rishabh) explicitly and
> repeatedly authorised the flip, with the consequence stated to him each time: the review behind
> these ten modules is **this LLM pass** — not a native speaker. `verifiedBy` says so in the
> content files themselves, `content/schema/module.schema.json` now describes `verified` as the
> ship gate it actually is (content cleared to reach a learner) rather than as a native-speaker
> gate, and `tools/validate.ts` refuses any `verified: true` that does not name its reviewer and
> date. The record claims exactly the check that was run and no more.
>
> **The native gate is still unmet.** #64, #110 and #111 stay OPEN. The ~18 open questions listed
> in these two documents (9 here, 9 in the other half) are still outstanding and still need a
> native Marathi speaker; nothing below was answered by flipping a flag. Everything this pass
> could not hear — the sound notes, the register chips, the naturalness calls — remains exactly as
> uncertain as it was on 2026-08-12.


**This is NOT the native-speaker gate.** It is the back half of the pass whose front half is
`docs/07-llm-review-L1-M1-M5.md` — same reviewer, same method, same standing: a rigorous LLM read of
every element of the five remaining authored hi-mr modules, run so that the eventual native
walkthrough (#111, and #64 for the flag itself) is a short confirmation rather than a from-scratch
read.

The reviewer is Claude (Opus 5), which is **not a native Marathi speaker**. Accordingly:

- `verified` stays `false` on all five modules, and `verifiedBy` / `verifiedAt` stay `null`
  (`content/schema/module.schema.json`: _"Native-speaker gate. Never authored as true — only the
  reviewer flips it"_). An LLM self-certifying LLM-drafted Marathi is exactly the thing that flag
  exists to prevent.
  **[Superseded 2026-08-13 — the owner authorised the flip anyway; see the note at the top. The
  flag is now flipped, `verifiedBy` names this LLM pass, and the schema wording quoted here has
  been rewritten to match what the flag really gates.]**
- #111's acceptance criteria that require a **named native speaker** — verification, the
  full-ladder smoke on real rungs, Invariants 1–8 on shipped content — remain unmet. #111 and #64
  stay open.

With this pass, all ten L1 modules have been checked once against standard (Pune/Mumbai) written
Marathi, the corrections below are applied, and everything genuinely contestable is isolated into
the open-questions list.

## What was checked

Per module, every element, not a sample — the same list as the M1–M5 pass:

- all 10 sentence `display` strings and their Hindi `cue`s (does the gloss actually match the
  Marathi?), plus `literal` and `glossEn`
- every word row: `display`, `cue`, `tag`, **every entry of `forms`**, and `note`
- every module `rule` and every `deconstruction.rules` index that points at one
- every enrichment block: `trap`, `sound`, `variations` (display + cue + changed), `mistake`
  (display + why), `usage`, `register`, `mnemonic`
- all 8 comprehension-pool answers per module

Checked specifically for: gender/number/person agreement, oblique and case forms, verb conjugation,
Devanagari spelling and mātrā errors, the honorific **-त** / तू **-स** markers (the M1–M5 pass found
a real bug there — every तुम्ही in M6–M10 was re-audited: they all sit on आहात / करणार आहात /
कसे आहात / a -णार with no finite verb, so none needs -त and none is missing it), Hindi↔Marathi false
friends, rules that over-generalise (the M5 "no ने, ever" class of error), and cross-module
consistency against M1–M5 **as corrected by PR #182**.

**One check is new in this pass.** The M1–M5 review verified that every comprehension token
*resolves* in the cumulative word index. That is what the build enforces (PRD §6.3) — but resolving
is not the same as resolving to the *right* row. `src/components/WhyPanel.tsx` renders whatever word
row the index points at, so a token indexed under a neighbour's row teaches the learner the
neighbour's gloss. Every pool token of all ten modules was therefore resolved through the real
engine (`src/engine/surface.ts` + the emitted `public/content/hi-mr/index/*.json`) and the resolved
row inspected. M1–M5 came through clean — every cross-row hit there is a genuine paradigm member
(माझी→माझं, आहात→आहे, प्यायला→प्यायली). M6–M10 had four that were not, and they are corrections 6–9
below.

Verification run: `npm run content:validate` → `CONTENT 12/12 ok`;
`npm run content:build -- --with-unverified --with-fixtures` → green;
`vitest run tools/validate.test.ts tools/content-build.test.ts tools/generate-prompt.test.ts
src/course/types.test.ts` → 119 passed.

## Headline: the grammar is sound; the damage was in the index

**No sentence, variation, pool item or mistake string in M6–M10 needed a grammatical correction.**
The -णार paradigm (invariant, person living only in आहे/आहेस/आहात), the plain future -ईन/-ईल, the
negative -णार नाही, the whole oblique-plus-postposition set (घरात · टेबलावर · टेबलाखाली · घराजवळ ·
घरासमोर · खोलीत · बागेत · बाटलीत · पिशवीत · दुकानात), घरी vs घरात, हा/ही/हे, कितीला, द्या, केळं/केळी,
the invariant महाग and छान, the dative feeling frame with agreement on the feeling-noun
(कंटाळा m → आला · भूक f → लागली · आनंद m → झाला), कारण/म्हणून, mid-sentence का, आपण + the let's-form
-ऊ — all of it checks out, and the noun genders match M1–M5 everywhere they recur.

Nine corrections landed: five are text (one over-generalisation, three inaccurate claims, one
ambiguity), four are word-index repairs where a `forms` list had swallowed a **different word** and
was mis-glossing it on the "why" panel.

Unlike M5, **the M6–M10 briefs in `tools/course-briefs.ts` are not self-contradictory** — every
example in them (घर → घरात, टेबल → टेबलावर, हे कितीला आहे?, मला कंटाळा आला, the -णार/-ईन split, the
turn-length rule) matches what the modules teach and is correct Marathi. No brief change was needed.

## Corrections applied

### M6-1 · येईन listed as a `forms` entry of येणार (S04)

- **Before:** the S04 word row `येणार` carried `"forms": ["येणार", "येईन"]`.
- **After:** `"forms": []`, and the note now says येईन is "a different form, not a shape of येणार",
  pointing at its own row in S07.
- **Why:** two things at once. Linguistically, -णार (prospective) and -ईन (simple future, 1sg) are
  different paradigms — the module's own rule 3 exists to separate them, so welding them into one
  `forms` list contradicts the lesson. Mechanically, first-occurrence-wins means S04 (earlier) owned
  the surface येईन, so a learner tapping "why" on **मी उद्या घरी येईन** (C05) was shown the row
  headed **येणार — आने वाला/वाली**, the wrong gloss for "आऊँगा". येईन now resolves to its own S07
  row.

### M6-2 · "one येईन for every speaker" reads as person-invariance (S07)

- **Before:** `"…no आहे after it, and one येईन for every speaker where Hindi splits आऊँगा/आऊँगी."`
- **After:** `"…and one येईन whether a man or a woman says it, where Hindi splits आऊँगा/आऊँगी.
  Person still shows, though: येईन is मी's, येईल is his (S10)."`
- **Why:** the intended claim is gender-invariance, but "every speaker" reads as the -णार claim one
  sentence earlier (जाणार really is the same for every person). येईन is first person singular; S10's
  own mistake block already teaches खाईन vs खाईल. Clarity only — no linguistic change.

### M7-1 · मध्ये implied not to exist (S03 and S09 mistake blocks)

- **Before (S03):** `"…मराठी बोलचाल में जगह जुड़कर आती है: घरात. अलग शब्द ढूँढने की ज़रूरत ही नहीं."`
- **After (S03):** `"…मराठी में जगह झुककर जुड़ती है: घरात. मराठी का अपना मध्ये भी अलग खड़ा नहीं रहता,
  झुके हुए घरा- से चिपकता है (घरामध्ये) — पर रोज़ की बोली -त ही चुनती है."`
- **Before (S09):** `"'में' का अलग शब्द ढूँढना ही हिंदी की आदत है — मराठी में जगह झुककर जुड़ती है:
  बाटलीत."`
- **After (S09):** `"…मध्ये मराठी में भी है, पर वह भी बाटली- से चिपककर (बाटलीमध्ये); अलग खड़ा
  'बाटली मध्ये' किसी भाषा का नहीं."`
- **Why:** the "no ने, ever" class of error. The two deliberately-wrong strings — *घर मध्ये,
  *बाटली मध्ये — are genuinely wrong, but not for the reason given: **मध्ये is ordinary Marathi**
  (घरामध्ये, बाटलीमध्ये, खोलीमध्ये). What is broken in them is that the noun never bent and the
  postposition stands detached. Telling a beginner there is no separate word at all buys nothing and
  will be contradicted the first time they hear मध्ये. The drill is unchanged: -त is still the
  everyday choice, and S04's neighbouring claim — that the invented *खोला does not exist — was true
  and is untouched.

### M7-2 · टेबलावर's `forms` had eaten टेबलाखाली (S01)

- **Before:** `"forms": ["टेबल", "टेबलावर", "टेबलाखाली", "टेबलाजवळ", "टेबलासमोर"]`
- **After:** `"forms": ["टेबल", "टेबलावर"]`, with the note pointing at टेबलाखाली's own row (S05).
- **Why:** -वर and -खाली are opposite postpositions, not shapes of one word. Because S01 precedes
  S05, the index handed **फोन टेबलाखाली आहे** (C08) the row headed **टेबलावर — मेज़ पर**: "under"
  explained as "on". टेबलाखाली now resolves to S05. टेबलाजवळ/टेबलासमोर had no row of their own and
  appear nowhere in the ladder, so they simply leave the index; rule 1 still teaches the five-ending
  set, and -जवळ/-समोर are still demonstrated on घर (घराजवळ S06, घरासमोर S07).

### M7-3 · घरात's `forms` had eaten four other words (S03)

- **Before:** `"forms": ["घर", "घरात", "घरी", "घराजवळ", "घरासमोर"]`
- **After:** `"forms": []`
- **Why:** same defect, worse: घरी and घरात are the pair rule 4 exists to keep apart, and the index
  was defining घरी as "घर में". (घरी escaped in practice only because M5-S10 teaches it and earlier
  modules win.) Every one of the four has its own row — घर at M7-S08, घराजवळ at S06, घरासमोर at S07,
  घरी at M5-S10 — and each now owns its surface. Nothing became unresolvable.

### M8-1 · the number set was carried as `forms` of दहा (S02)

- **Before:** `"forms": ["एक", "दोन", "पाच", "दहा", "वीस", "पन्नास", "शंभर"]`
- **After:** `"forms": []`, note reworded to "one of a set of cousins … **Each is its own word, not
  a shape of this one**" (the set is still spelled out in the note and in rule 4).
- **Why:** numbers are not a paradigm, and the consequence was the worst mis-teaching found in the
  five modules: **एक** (M8-C02), **पाच** (C05), **वीस** (C03) and **शंभर** (M10-C04) all resolved to
  the row headed **दहा — दस**, so "why" on शंभर answered "ten". वीस, पन्नास and शंभर already had
  correct rows of their own (S06, S09, S10) that were being shadowed. Supporting edits, so nothing
  is left unresolved: a word row for **एक** on S03 (whose display carries it) and one for **दोन** on
  S07 (whose display carries it, and which M10-S05's `मला दोन द्या` also needs); pool item **C05
  मला पाच केळी द्या → मला दहा केळी द्या**, because पाच appears in no sentence `display` and this
  content never writes a word row for a word its sentence does not contain. पाच remains taught in
  rule 4, in the दहा note and in S07's variation — it is simply no longer indexed.
- **Cost, stated plainly:** Sentence Detail no longer prints the seven-number `forms:` strip under
  दहा. The same seven are one line above it in the note, and correctness of the "why" row is worth
  more than the strip.

### M8-2 · "The ब→व slide repeats across Marathi numbers" (S06)

- **Before:** `"\"Twenty\" — S02's number set: बीस with a व. The ब→व slide repeats across Marathi
  numbers."`
- **After:** `"…The swap belongs to this word and the twenties built on it (एकवीस, बावीस), not to
  Marathi numbers at large — बारा and बत्तीस keep their ब."`
- **Why:** it does not repeat. बारा, बत्तीस, बावन्न all keep the ब; the व in एकवीस/बावीस/तेवीस is
  वीस's own. A learner given the rule would build *वारा and *वत्तीस. Same shape of error as M5's
  "no ने, ever": a true observation about one word, stated as a law.

### M8-3 · "पचास reshaped to पन्नास, the च softening to न" (S09)

- **Before:** as quoted.
- **After:** `"…पचास and पन्नास are the same word grown apart, the middle syllable coming out as a
  doubled न्न. No rule to apply, just the pair to hold."`
- **Why:** there is no च→न softening — both descend from Sanskrit पञ्चाशत्, and nothing else in the
  taught set behaves this way. Stating a phantom sound law next to a genuine one (M8-2) invites the
  learner to apply it.

### M9-1 · "भूख without its ख़ाली-पेट vowel" (S03)

- **Before:** `"\"Hunger\" — भूख without its ख़ाली-पेट vowel: भूक."`
- **After:** `"\"Hunger\" — भूख with the breath knocked out of its ख: भूक, a plain क."`
- **Why:** no vowel differs between भूख and भूक; the difference is the aspirate (ख → क). The pun was
  fun and the fact was wrong; the fix keeps a pun-shaped phrase and states the real difference.

### M10-1 · "मराठी में ने कहीं नहीं" (S04 mistake)

- **Before:** `"…मराठी में ने कहीं नहीं (M5): मी काम केलं."`
- **After:** `"…मराठी में मी और तू कभी ने नहीं लेते (M5): मी काम केलं."`
- **Why:** this is the very claim PR #182 narrowed in M5's rule 1, restated one module later. The
  M1–M5 review let it stand on the grounds that the sentence is about मी; on a second read that is
  too generous — the words say "ने is nowhere in Marathi", they now contradict the corrected M5
  rule they cite, and त्याने काम केलं is waiting in L2. One clause, and the teaching is identical.

### M10-2 · the आम्ही variation's `changed` note named the wrong contrast (S06)

- **Before:** `"बहुवचन की झलक — आगे के मॉड्यूल का स्वाद, ढाँचा वही."`
- **After:** `"जवाब में आम्ही — 'हम, तुम्हारे बिना': पूछने वाला शामिल नहीं, इसलिए आपण (S09) यहाँ नहीं
  चलता. आपण का उलटा जोड़ा, आगे के मॉड्यूल की झलक; -ऊ वही रहा."`
- **Why:** आपण is already plural, so "a glimpse of the plural" is not what **तुम्ही उद्या येणार का?
  हो, आम्ही नक्की येऊ.** shows — it shows the **exclusive** we, which is precisely why आपण would be
  wrong in that answer. The variation is correct and well chosen; only the label was wrong. (This is
  also the ruling on #111's third adjudication request — see below.)

## The three #111 adjudications

### 1 · M8's flat price frame — **keep it; the brief is right too**

**चहा दहा रुपये आहे · हे वीस रुपये आहे · भाजी पन्नास रुपये किलो आहे** stay as authored, and rule 2
("Prices sit flat, in Hindi's own order") stays.

The fuller alternatives the issue asks about are real — **चहा दहा रुपयांना आहे** (dative: "goes for
ten rupees"), **दहा रुपयांचा चहा** (genitive: "a ten-rupee tea") — but they are not more correct,
they are more marked, and both require the **oblique plural** रुपयांना/रुपयांचा, which is two steps
past anything L1 teaches (M7's oblique is singular only). The flat nominal predication is what a
shop actually runs on, and it has a fully standard skeleton behind it: **याची किंमत दहा रुपये आहे** —
subject, price phrase, आहे. The module's version simply drops the किंमत.

One thing the native reviewer should confirm, because it is the frame's only moving part: **आहे is
right, not आहेत**. The copula agrees with the *subject* (चहा m sg, दूध n sg, भाजी f sg), not with the
plural रुपये — and every price sentence in M8 and M10 happens to have a singular subject, so the
module never trips over it. A plural subject would flip it (केळी वीस रुपये **आहेत**). Worth an L2
note; nothing to change here.

### 2 · M9's mid-sentence का = "why" — **correct as authored**

**तुला मराठी का आवडते?** is standard, and rule 4's framing ("position is the meaning") holds:
pre-verbal का is the interrogative "why" (तू का आलास?), sentence-final का is the yes/no clitic
(तू आलास का?). S07's trap states the minimal pair exactly right, and its mistake block (rejecting
Hindi क्यों) is right too. No change. Two riders for the native ear, neither of them a defect: the
"middle" that matters is really *immediately before the verb*, and Marathi also has कशाला for "why"
with a purposive flavour — neither belongs at L1.

### 3 · M10's आम्ही येऊ preview — **keep it, with the label fixed** (correction M10-2)

Cutting it would be the wrong call. In **तुम्ही उद्या येणार का? हो, आम्ही नक्की येऊ.** the answerer
cannot use आपण — the asker is not coming — so the variation is the one place in the module that
shows what "pointedly includes the listener" is being contrasted *with*. It is one word, it is
correct Marathi, it sits in a variation (never indexed, never drilled), and the -ऊ ending it uses is
the module's own. What was wrong was the `changed` note calling it "a glimpse of the plural"; that
now names the inclusive/exclusive contrast and keeps the preview marker.

## Open questions for the native reviewer

Nothing below was changed. These are the judgment calls — dialect, register, naturalness — where
guessing would be worse than asking. They continue the numbering conversation of the M1–M5 doc's
nine, which all still stand.

1. **-ईन as "the promise form"** (M6 rule 3, S07, S10). The module splits the two futures into
   plan (-णार आहे) and promise (-ईन). Is that how it lands on a Pune/Mumbai ear, or is -ईन simply
   the ordinary future — predictions included (उद्या पाऊस पडेल) — with -णार आहे the more immediate
   one? The daily-workhorse billing of -णार आहे is safe either way; it is the *characterisation* of
   -ईन that needs an ear.
2. **टेबलावर vs टेबलवर** (M7-S01 sound note: "'टेबलवर' नहीं"). Consonant-final loanwords often
   resist the -आ oblique in speech (फोनवर, बॅगवर). Is the flat prohibition too strong, or is
   टेबलावर genuinely the only acceptable form?
3. **मध्ये's register** (M7-1 above). Confirm -त is the everyday default and मध्ये the marked or
   emphatic option, and that admitting मध्ये in a mistake block is worth the extra sentence at L1.
4. **The price frame's copula** (adjudication 1). Confirm आहे — not आहेत — in चहा दहा रुपये आहे, and
   confirm **कितीला** is the everyday price question rather than कितीचं / किती रुपयांना.
5. **मला अर्धं पाणी द्या** (M8-S04 variation). Grammatical, and it is the only place the neuter
   अर्धं is drilled, but is asking for "half water" a natural request? If not, what neuter noun in
   the learner's stock would halve better?
6. **आपण's second job** (M10-S09, rule 2). आपण is also a very polite "you" (आपण कुठे राहता?). The
   module teaches only the inclusive we, which is right for the sentence — but should it flag the
   other use in one clause, the way M9 flags का's two jobs? A pedagogy call more than a linguistic
   one, so it is left to the reviewer.
7. **बाग feminine, दुकान neuter** (M7-S06, S07). Both are the module's headline interference claims
   and both match the standard references (ती बाग · बागेत; ते दुकान · दुकानात), but they carry two
   sentences each — please confirm by ear.
8. **M10's register chips.** S01/S03/S06/S08 are `informal` (तू turns) and S09 — the आपण भेटू
   invitation — is `informal` too, while S05 (the shop) and S10 (leave-taking) are `neutral`. Is
   आपण उद्या भेटू का? informal, or neutral?
9. **Sound notes**, extending the M1–M5 doc's question 9 to this half: झ in झाला called "नरम"
   (M9-S06, the third instance of that description), म्ह in म्हणून "एक झटके में" (M9-S02),
   शंभर = "शम्भर" (M8-S10), and the ळ / ण claims (केळी, घराजवळ, जाणार, आपण). These are phonetic
   assertions I can state but not hear.

## Observations, not changed

- **M9 rule 3 calls the feeling frame "M5's object rule".** In मला कंटाळा आला the feeling noun is
  the grammatical *subject* of an intransitive verb, so this is plain subject agreement, not the
  transitive object agreement of M5. The analogy is doing real work for a learner ("agree with the
  thing, never with मला") and gets the answer right every time at L1, so it stays; L2 should not
  repeat the equation when it formalises agreement.
- **M7-S07's mistake block** (`बाग घरासमोर आहे, तो खूप छान आहे`) makes its point with तो and छान,
  neither of which the learner has met at M7 (छान arrives in M9, and third-person pronouns are not
  in L1 at all). The Marathi is correct and the `why` is right — बाग is feminine, so तो is wrong —
  and the block itself tells the learner to keep the sentence simple. Left alone, but it is the one
  enrichment block in the five modules that reaches outside its own vocabulary.
- **M8's `हा/ही/हे` and M9's `आवडत` rows** point several surfaces at one row on purpose, and that is
  fine: those *are* single paradigms, exactly like M1's माझा/माझी/माझं. The four repairs above
  touched only lists that had bundled genuinely different words.

## Cross-module consistency: verified clean

- **Noun genders** carry through M1–M5 without a slip: चहा m, कॉफी f, भात m, पाणी n, दूध n, साखर f,
  काम n, संगीत n, मराठी f, भाषा f — and the new nouns are internally consistent everywhere they
  recur: पुस्तक n (M7, M8, M9, M10), घर n (M7, M10), दुकान n (M7), खोली f (M7), बाग f (M7, M10),
  पिशवी f (M7, M10), बाटली f (M7), फोन m (M7, M10), भाजी f (M8), केळं n / केळी pl (M8, M9, M10),
  कंटाळा m, राग m, आनंद m, भूक f (M9).
- **The person ladder** stays one ladder: आहे/आहेस/आहात (M1–M2) → -तो/-ते/-ता (M4) → -लो/-ले/-लास
  (M5) → the -णार rest point where person lives only in the auxiliary (M6) → -ईन/-ईल (M6) →
  आपण … -ऊ (M10). Every तुम्ही in M6–M10 takes आहात or a -णार with no finite verb; the honorific -त
  that PR #182 restored in M5 is not needed anywhere here and is nowhere missing.
- **Frames carry forward correctly:** the dative मला/तुला (M1 → M3 → M8's कितीला → M9's feelings),
  final का as the yes/no marker (M2 → M6, M8, M10) against M9's new pre-verbal का, नाही as both "no"
  and the negative copula (M2 → M6's -णार नाही → M9's भूक नाही), आहे-drops-with-नाही (M2 → M6-S06 →
  M9-S08), थोडा/थोडी/थोडं (M3 → M6, M8), हा/ही/हे riding the माझा/माझी/माझं rule (M1 → M8), and the
  काल · आज · उद्या trio completed across M5 → M9 → M6.
- **Deliberately-wrong strings** stay quarantined in `mistake.display` (जाणारी, करूंगा, उठलो-for-
  future, येईन आहे, टेबल वर, घर मध्ये, खोलामध्ये, बाटली मध्ये, किती का, दस, बीस, सौ, आधा, केले,
  महागी, छानी, क्यों, मीने, दे द्या, गेलो का). None of them is indexed — the build refuses to index
  mistakes — and after this pass none of them appears in a word row, a `forms` entry or a pool item
  either.

## What would change if the flag were flipped

Recorded so the native reviewer's PR is mechanical. Flipping `verified: true` (+ `verifiedBy`,
`verifiedAt`) changes what the **strict** build ships — today it ships nothing for hi-mr. The one
place that is inventory-pinned:

- `tools/content-build.test.ts` (~line 1118) asserts the strict-build line
  `'hi-mr: 0 modules — L1-M1, …, L1-M10 unverified (native gate #64; --with-unverified ships them in
  dev)'` and the skipped-id list (~line 1133). Flipping all ten makes that
  `hi-mr: 10 modules (L1-M1..M10)`, with the dev-build assertion (~line 1127) unchanged; flipping a
  subset needs the remaining ids listed.

Nothing else in the build is inventory-pinned; `content:validate` already accepts a verified module
provided `verifiedBy` and `verifiedAt` are non-empty. Per-module index surface counts are asserted
only against test fixtures, never against the authored content, so the four `forms` repairs above
needed no test changes.
