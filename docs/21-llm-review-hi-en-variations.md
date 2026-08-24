# LLM review — hi-en, the third-variation pass

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Fable 5), which
cannot hear anything and is not a fluent-English editor in the sense this course eventually needs.
`verified: true` on all ten hi-en modules still rests on the repo owner's authority, exactly as
the four earlier hi-en reviews say; each of the ten was re-read whole here — rules, word rows,
notes, traps, sentences, variations and pools — and now carries `verifiedAt: "2026-08-24"` with
this pass's signature (L1-M2..M10 are restamped from the 2026-08-23 authoring reviews; L1-M1
already carried today's date from #284). **No fluent-English gate exists for this course**, and
the open questions at the bottom continue `docs/17-llm-review-hi-en-surfaces.md`'s numbering
(which ended at 5), joining the 88 already outstanding across
`docs/11-llm-review-hi-en-L1-M1-M2.md`, `docs/12-llm-review-hi-en-L1-M3-M5.md` and
`docs/13-llm-review-hi-en-L1-M6-M10.md`.

This is issue **#288**. Going in, hi-en carried 198 variations across 100 sentences — 98
sentences at two and two at ONE (M1-S10, M2-S05). Coming out it carries **300**: every sentence
at three, no exemptions needed. **Nothing else moved**: no sentence, no word row, no rule, no
existing variation was deleted or reworded — the diff inside each module is appended variation
objects only, plus the verification restamp on the nine 08-23 modules (asserted programmatically
at insertion time: each file, minus the appended tail and the stamp, deep-equals its previous
self). The re-read found no outright error in the 198 existing lines, so acceptance criterion 4
records zero fixes.

## Method

The constraint #288 inherits from #284: a variation a learner reads in M1 has only M1's
cumulative index behind it, and `tools/content-build.test.ts` sweeps every hi-en variation line
against the index of the module that shows it, pinned at twenty-seven decided misses. So every
new variation was authored **from the module's own cumulative surface set** (24 → 40 → 57 → 91 →
109 → 127 → 149 → 172 → 189 → 203 keys) and swept through the real engine (`matchSurfaces` +
`tokenizeSurface`, `src/engine/surface.ts`) against the emitted
`public/content/hi-en/index/L1-M*.json` before insertion — then spot-checked again through
`resolveSentence` (`src/engine/wordIndex.ts`), the actual WhyPanel path: **102 new lines, zero
dropped spans**. A codepoint audit proved every character in the new `display`/`cue`/`changed`
strings already occurs in hi-en content (no new glyph for the font subset).

**Result: zero new misses.** The sweep still reports exactly the twenty-seven pinned lines —
the eight `priya` lines and `jaipur`, the five forward references, the seven sibling words, M10's
declared-untaught trio, the reserved `three`/`six` — so the pin and the seam tests are untouched.
No new line uses any pinned-miss word, `going to` + place, a barred contraction (`won't`,
`isn't`, `wasn't`), a possessive `'s`, or bare `there`.

**The additions-only index proof was run and is trivial by design**: variations are never indexed
(`content-build` indexes what is taught, never what is shown), so
`public/content/hi-en/index/*.json` saved before the change and rebuilt after it are
**byte-for-byte identical** — 0 keys lost, 0 moved, 0 added, every `maxSpan` unchanged.

**#284's one addition earns its screen time**: the `rohan sharma` key carries M1's two new
full-name lines (S03's subject seat, and the existing S01 line it was homed for), resolving whole
through the longest-match walk exactly as docs/17 promised #288 it would.

## What the third axis is, per sentence

Each new variation takes a structural axis the sentence's existing set did not: person or subject
shift, negation, question form, answer pivot, tense contrast, frame flip, agreement chain, or
seat/order change. No bare noun swaps. hi-en's grammar spine — be moves itself, everything else
borrows do/does/did/will — is what most thirds put on screen.

### L1-M1 — Who I am

M1 stays statement-only (questions are M2's lesson) and inside the 5-word envelope. Its index is
the course's tightest (24 keys, no you/he/she/not), so the thirds work the frames: full-name and
my + noun subjects, attributive stacks, and the module's own job — introduce yourself — as
two-sentence compositions.

| sentence | new variation | axis |
|---|---|---|
| S01 My name is Rohan | I am Rohan | frame flip: the be-identity route to the same job |
| S02 I am from India | My teacher is from India | my + noun as subject; be turns third person |
| S03 I am from Delhi | Rohan Sharma is from Delhi | the full-name subject (#284's key), both capitals |
| S04 I am a student | My name is Rohan. I am a student. | the intro chain; the subject written again |
| S05 I am a teacher | Rohan is my teacher | predicate flip: my + noun after be, a's seat taken |
| S06 I am an engineer | I am an English teacher | an chosen by the NEXT word's sound, not the noun |
| S07 I like tea | I like India | the object slot opens to any noun; the capital rides |
| S08 I like music | I am a music student | like → am a; the noun-noun compound |
| S09 I like books | I like my English books | the NP stacks: my, then English, then books |
| S10 I like English (was at ONE) | I like English books · I am a student. I like English. | language name attributive; the module's whole job composed |

### L1-M2 — First exchange

| sentence | new variation | axis |
|---|---|---|
| S01 Hello, my name is Rohan | Hello, what is your name? | greeting opens into the return question |
| S02 Good morning, Rohan | Good morning. How are you? | greeting chained to the how-question |
| S03 How are you? | How is Mumbai? | how extends beyond people to places |
| S04 I'm fine, thank you | I'm not fine | the scripted answer negated — truth allowed |
| S05 What is your name? (was at ONE) | Are you Rohan? · What is your name? I'm Rohan. | the other question strategy; the Q→A pair, I'm + name as answer |
| S06 Are you a doctor? | No, I am a teacher | deny-then-correct: No alone negates, then the right noun |
| S07 Are you from Mumbai? | No, I'm not from Mumbai | the negated origin answer, from-pair intact |
| S08 Yes, I am | Yes, I am from India | the short answer grows a from-predicate |
| S09 No, I'm not | No, I'm not tired | the short answer grows an adjective predicate |
| S10 Are you tired? | How are you? I'm tired. | Q→A: the how-answer paradigm opens beyond fine |

### L1-M3 — Needs and wants

| sentence | new variation | axis |
|---|---|---|
| S01 I want tea | I want the tea | article contrast on the mass noun: the, where a cannot |
| S02 I want a pen | I don't want a pen | negation keeps the article Hindi drops |
| S03 I want to learn English | Do you want to learn English? | the to-V frame questioned |
| S04 I want to read a book | I don't want to read | negation lands on want, read untouched |
| S05 I don't want coffee | No, I don't want coffee | the refusal as an answer turn |
| S06 I need water | I don't need water | need under don't — the module shows only don't want |
| S07 I need the key | I need the keys | the over a plural: the is invariant |
| S08 Do you want tea? | No, thank you | Q→A pivot: the polite refusal |
| S09 Do you want sugar? | Yes, I want sugar | Q→A pivot: acceptance with the full frame |
| S10 I want two books | I want a book, not two | the count contrast in one line |

### L1-M4 — My day

| sentence | new variation | axis |
|---|---|---|
| S01 I always wake up early | I never wake up early | polarity flip: never negates without not |
| S02 I get up at seven | Does she get up at seven? | the habit questioned; -s rides does |
| S03 He goes to school at nine | He doesn't go to school | negation strips the -s |
| S04 I eat breakfast in the morning | Do you eat breakfast? | the do-question |
| S05 I usually drink tea | I don't usually drink tea | the adverb's seat inside negation |
| S06 She works on Monday | Does she work on Monday? | its own display, questioned |
| S07 I never drink coffee | I don't drink coffee | never vs plain don't — two negations, two strengths |
| S08 Does he get up early? | Yes, he gets up early | Q→A: the -s returns in the answer |
| S09 He doesn't eat breakfast | Does he eat breakfast? | one does, two jobs |
| S10 I have two brothers | Do you have two brothers? | have takes do-support, never inverts itself |

### L1-M5 — Yesterday

M5's thirds drill the module's one lesson from both sides: the past mark lives once, on did — and
be needs no did at all.

| sentence | new variation | axis |
|---|---|---|
| S01 Yesterday I got up at eight | Did you get up at eight? | did restores got up to get up |
| S02 I went to school yesterday | Did you go to school yesterday? | went's question is Did + go |
| S03 I ate rice yesterday | I didn't eat rice yesterday | ate → didn't eat |
| S04 She drank tea yesterday morning | Did she drink tea yesterday? | drank questioned; no -s on she |
| S05 He worked at home yesterday | He didn't work yesterday | -ed and didn't never share a line |
| S06 I didn't go to school yesterday | We didn't go to school yesterday | didn't is one form for every subject |
| S07 What did you do yesterday? | I saw a film | Q→A pivot: any past sentence answers |
| S08 Did you see the film yesterday? | No, I didn't see the film | the negative answer, see staying base |
| S09 I was happy yesterday | Were you happy yesterday? | be inverts itself — no did |
| S10 We were tired yesterday | We were not tired yesterday | be negates itself — bare not, no didn't |

### L1-M6 — Tomorrow

The seams hold: no `going to` + place anywhere, no `won't`, `I will` resolving as I + will. The
two future frames are swapped across S03/S07 in opposite directions, per rule 2's own meaning
split (decided-now vs planned-ahead).

| sentence | new variation | axis |
|---|---|---|
| S01 I will go to Delhi tomorrow | I'll go to Delhi tomorrow | I will → I'll (S10's row, in-module forward) |
| S02 Will you come tomorrow? | Yes, I will come tomorrow | Q→A: will returns to its seat |
| S03 She will buy a car tomorrow | She is going to buy a car | will → going to: the planned-ahead reading |
| S04 They will eat at home tomorrow | Will they eat at home tomorrow? | will jumps the subject — no do |
| S05 I'm going to visit my brother tomorrow | Are you going to visit your brother? | the plan questioned via be-inversion |
| S06 We are going to cook rice tomorrow | What are you going to cook? | the wh-question over the plan frame |
| S07 I'm going to learn English next week | I will learn English next week | going to → will: the decided-now reading |
| S08 I'm meeting her tomorrow | Are you meeting her tomorrow? | the arranged future questioned |
| S09 She is coming to Delhi next week | She is not coming next week | the arrangement called off — M2's not after be |
| S10 I will call you tomorrow | I will call her tomorrow | object pronoun swap: you → her (M6's own row) |

### L1-M7 — Where things are

| sentence | new variation | axis |
|---|---|---|
| S01 The book is on the table | Is the book on the table? | location questioned; the phrase keeps its seat |
| S02 The pen is in the box | Where is the pen? | the question the display answers |
| S03 The keys are under the chair | The keys are not under the chair | location denied — not after be, no don't |
| S04 Where is my bag? | It's under the chair | Q→A: it stands for the asked thing |
| S05 It's behind the door | Is it behind the door? | It's must unfold to invert: Is it |
| S06 Is it near the school? | No, it is not near the school | the negative answer |
| S07 The bank is next to the shop | There is a bank near the shop | frame flip: where-it-is vs what-is-there |
| S08 It's in front of the shop | It's not in front of the shop | the contracted subject negated; in front of whole |
| S09 There is a book on the table | There are books on the table | existence without a count: bare plural |
| S10 There are two cups in the box | There is a cup in the box | the agreement chain: two/are ↔ a/is |

### L1-M8 — Numbers & shopping

| sentence | new variation | axis |
|---|---|---|
| S01 How much is this? | How much is this? It's ten rupees. | the shop exchange whole: ask, then it-answer |
| S02 It's fifty rupees | It's one rupee | one drops the -s |
| S03 How much does it cost? | How much does it cost? Ten rupees. | the elliptical price answer |
| S04 It costs ten rupees | Does it cost ten rupees? | the yes/no price check; -s back on does |
| S05 Can I have two bananas, please? | Can I have this, please? | this alone stands for the pointed-at thing |
| S06 A kilo of rice, please | A kilo of apples, please | of + count noun pluralises; mass stays bare |
| S07 Can I have a bottle of water? | How much is a bottle of water? | request → price query, the measure phrase intact |
| S08 How many apples do you want? | I want five, please | the answer drops the noun after the number |
| S09 I want one apple, not two | I want two apples, not one | the correction mirrored; -s changes sides |
| S10 Five bananas cost twenty rupees | How much do five bananas cost? | the priced statement questioned: do + base cost |

### L1-M9 — Feelings & opinions

| sentence | new variation | axis |
|---|---|---|
| S01 I don't want coffee because I'm tired | Why don't you want coffee? | the reason asked for — don't inside why |
| S02 I'm tired, so I don't want coffee | I'm tired, so I will sleep early | so's consequence in the future |
| S03 Why are you sad? | I'm not sad. I'm tired. | the premise rejected, then corrected |
| S04 I'm sad because my friend is not here | Why is your friend not here? | the reason's own content questioned |
| S05 Why do you sleep late? | I don't sleep late | the presupposition denied |
| S06 I sleep late because I'm very busy | I'm very busy, so I sleep late | because → so on its own content |
| S07 I'm hungry, so I want rice | I want rice because I'm hungry | so → because, halves trading places |
| S08 She is angry because I'm late | Is she angry? | the yes/no beneath the why |
| S09 I think that the tea is good | I don't think that the tea is good | negation climbs to think |
| S10 Do you think the food is good? | What do you think? | yes/no → the open opinion question |

### L1-M10 — Connected talk

Every third stays inside the turn discipline (short full sentences, none past eight words, each
with its own subject).

| sentence | new variation | axis |
|---|---|---|
| S01 (greeting turn) | Good morning. I'm fine, and you? | the answering side of the exchange |
| S02 (And you? turn) | I'm tired today, but I'm okay. And you? | the scripted fine broken, but recovering |
| S03 (but turn) | I was tired yesterday, but today I'm happy. | but bridges two tenses |
| S04 (because turn) | I will cook tonight, so I need rice. | because → so: the same plan, the other hinge |
| S05 (sister portrait) | Is your sister a teacher? Does she work in Delhi? | the portrait interrogated: be-question then do-question |
| S06 (a → the turn) | I have two new books. The books are very good. | the intro-then-refer chain in plural |
| S07 (Then turn) | I will go to the market tomorrow. Then I will cook. | the sequence frame moved to the future |
| S08 (also turn) | Do you also like coffee? Yes, I do. | also climbs into the question; the short do-answer |
| S09 (Sorry turn) | Sorry, I'm late because I worked late. | late's two seats in one line |
| S10 (goodbye turn) | Okay, thank you. I will call you tonight. | parting as a future-contact promise |

## Calls this pass had to make

1. **M1 stays statement-only and inside five words**, as the en-es and en-ar passes ruled for
   their M1s — and hi-en's M1 is the crampedest of the four (24 keys, no second person, no
   negation, no question word). The thirds are frame recombinations, and twice the honest
   connector is the full stop: two-sentence compositions (S04, S10) that do the module's own
   stated job, "introduce yourself and state what you like". M2 and M9–M10 use the same shape for
   exchange turns; no such line appears in M3–M8.
2. **No new unresolvable surface, so no new exemption.** Where an axis needed an untaught surface,
   the line was re-planned around a taught one: no `Is there …?` (bare `there` is unclaimed by
   docs/13 — S09's third became the bare-plural `There are books …`), no third-person `likes` /
   `wants` / `needs` (docs/13 reserves the -s forms), no plural professions (`teachers` is no
   key — M10-S05's third became the two-question turn), no `one` before M8, no `me`, no `England`.
3. **The seams held without exception.** No `going to` + place (M6 rule 4's own ban); `won't`,
   `isn't`, `wasn't`, possessive `'s` nowhere; future negation only as M2's be-negation over the
   arranged-future frame (M6-S09), never `will not` — M6 teaches no will-negation and this pass
   authored none; the pinned-miss words (`priya`, `jaipur`, the sibling seven, `well`/`now`/`bus`,
   `three`/`six`) appear in no new line, so the 27-line pin is untouched.
4. **In-module forward use is allowed**, as every course pass has established: M1-S06/S09/S10
   show `English` before S10 teaches it, M3-S01 shows `the` before S07, M6-S01 shows `I'll`
   before S10's row. A learner who taps them lands on the right row.
5. **Composed question forms lean on taught machinery only**: M6's plan-questions invert be
   (M2's rule) over frames whose be is already on screen — `Are you going to …?`, `What are you
   going to cook?`, `Are you meeting her …?` — and never invent do-support where the course
   gives none. The same for M5's `Were you …?` (rule 4's own example shape) and M8's
   `Does it cost …?` (rule 0's shape with the subject swapped in).
6. **No existing variation was deleted or reworded** — the re-read found no outright error in the
   198 existing lines (acceptance criterion 4: zero fixes to record).

## Verification

- variation sweep through the real engine, per module: **300/300 lines, zero new misses** — the
  only misses are the twenty-seven pinned in `tools/content-build.test.ts`, unchanged
- `resolveSentence` spot-check (the WhyPanel path) over the 102 new lines: **zero dropped spans**
- codepoint audit: every character in the new display/cue/changed strings already occurs in hi-en
  content
- append-only proof, asserted programmatically at insertion: each module file minus the appended
  variations and the `verifiedAt` restamp deep-equals its previous self
- `public/content/hi-en/index/*.json` before vs after `npm run content:build`: **byte-identical**
  (0 lost, 0 moved, 0 added; variations are never indexed)
- `npm run content:validate` → **CONTENT 40/40 ok**
- `scripts/verify.sh` → `TYPES ok | LINT ok | TEST 1331/1331 ok | CONTENT ok | FONTS ok | BUILD ok | BUDGET ok`
- Payload, measured: `course:hi-en` **346.6 → 352.0 KiB** gzip against 360 (+5.4 KiB for 102
  Devanagari-cued lines — hi-mr's 100 cost +5.3), `precache:hi-en` 561.2 → **566.5 KiB** against
  590; shell and the other three courses unmoved. The issue's raise-the-ceiling contingency was
  not needed.

## Open questions for a fluent-English pass

Numbering continues docs/17's list (which ended at 5); these eight join the 93 already
outstanding across the four earlier hi-en reviews, for 101 in all.

6. **Two-sentence variations before M10** (M1-S04, M1-S10, M2-S02, M2-S05, M2-S10, M9-S03, and
   M8's two Q→A chains). hi-en teaches no connector until M10, so the honest join at rung 1 is
   the full stop — but no display before M10 is two sentences. Preview of M10's turn discipline,
   or envelope creep?
7. **`I like India`** (M1-S07) — recorded as the object-class lesson (any noun, capital rides
   along), but formally it is the pass's one noun-swap-shaped line; M1's like-frame simply has no
   other free axis (no `likes`, no second person, no question). Keep, or exempt S07 at two?
8. **The respect-plural in new cues** — `मेरे शिक्षक भारत से हैं` (M1-S02), `रोहन मेरे शिक्षक हैं`
   (M1-S05) use honorific plural for the teacher where the course elsewhere writes `रोहन … है`.
   Natural Hindi deference, or an inconsistency a native pass should flatten?
9. **`I want a book, not two`** (M3-S10) — the corrective `, not X` tail two modules before
   M8-S09's display teaches that shape. Same preview-or-flood question en-ar's pass recorded for
   its early feminine forms.
10. **`Why don't you want coffee?`** (M9-S01) — rule 1 teaches `Why do you …?`; the negative
    question composes transparently but its pragmatics (an explanation is expected, not
    information) are untaught — the en-es pass flagged its `¿No quieres …?` the same way.
11. **The elliptical answers** — `Ten rupees.` (M8-S03), `I want five, please` (M8-S08),
    `No, thank you` (M3-S08). Real shop and table talk, noun dropped where the question supplied
    it; but fragments in a generation-focused course (en-ar's Q12, again).
12. **The composed M6 questions** (S05, S06, S08) — be-inversion over going-to and the arranged
    future. M6's rule 3 teaches only will-inversion in so many words; the be-questions borrow
    M2's rule instead. Honest composition of taught machinery, or a structure the module should
    teach before showing?
13. **`She is not coming next week`** (M6-S09) — the one negated future in the course, built from
    M2's not-after-be over the M6 continuous frame; `will not` was deliberately left unauthored.
    Right restraint, or does the asymmetry (continuous negatable, will not) confuse?
