# LLM linguistic review — hi-mr L1-M1…L1-M5

> **2026-08-13 — superseded in part by `docs/08-marathi-third-review.md`.** A third, independent
> LLM pass re-reviewed all ten modules blind and then reconciled against this document. Its
> corrections are applied, and **its open-questions list replaces the nine below** — work from
> `docs/08-marathi-third-review.md`, not from here. This document stays as the record of what the
> first pass found and changed. One thing in it has since gone stale: where it says #64, #110 and
> #111 **stay open**, they do not — the owner closed all three on 2026-08-13. The gate is still
> unmet; it is simply untracked, which is why docs/08 is now its home.

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


**This is NOT the native-speaker gate.** It is a rigorous LLM pass over the five authored hi-mr
modules, run at the owner's explicit request as a *pre-pass* so that the eventual native walkthrough
(#64 for M1–M2, #110 for M3–M5) is a short confirmation rather than a from-scratch read.

The reviewer is Claude (Opus 5), which is **not a native Marathi speaker**. Accordingly:

- `verified` stays `false` on all five modules, and `verifiedBy` / `verifiedAt` stay `null`. The
  schema is explicit that the flag means the native gate has run
  (`content/schema/module.schema.json`: _"Native-speaker gate. Never authored as true — only the
  reviewer flips it"_), and `tools/content-build.ts` uses it to decide what reaches a learner. An
  LLM self-certifying LLM-drafted Marathi is exactly the thing that flag exists to prevent.
  **[Superseded 2026-08-13 — the owner authorised the flip anyway; see the note at the top. The
  flag is now flipped, `verifiedBy` names this LLM pass, and the schema wording quoted here has
  been rewritten to match what the flag really gates.]**
- The acceptance criteria of #64 and #110 that require a **named native speaker** remain unmet.
  Both issues stay open.

What this pass *does* buy: every element of all five modules has now been checked once against
standard (Pune/Mumbai) written Marathi; the corrections below are applied; and everything genuinely
contestable is isolated into the open-questions list, so the native reviewer's job is to answer
~9 targeted questions rather than re-read 160 KB of JSON.

## What was checked

Per module, every element, not a sample:

- all 10 sentence `display` strings and their Hindi `cue`s (does the gloss actually match the
  Marathi?), plus `literal` and `glossEn`
- every word row: `display`, `cue`, `tag`, **every entry of `forms`**, and `note`
- every module `rule` and every `deconstruction.rules` index that points at one
- every enrichment block: `trap`, `sound`, `variations` (display + cue + changed), `mistake`
  (display + why), `usage`, `register`, `mnemonic`
- all 8 comprehension-pool answers per module

Checked specifically for: gender/number agreement (including M5's object-agreement past),
oblique/case forms, verb conjugation, Devanagari spelling and mātrā errors, Hindi↔Marathi false
friends and gender flips, internal consistency across modules (a word taught in M2 not contradicted
in M4), and surface consistency with `src/engine/surface.ts` (hi-mr is `scriptMode: native`, so the
romanization rules do not bite; what does bite is that word rows carry no punctuation while sentence
`display`s do — that holds throughout, and every pool token resolves in the cumulative index).

Verification run: `npm run content:validate` → `CONTENT 12/12 ok`;
`npm run content:build -- --with-unverified --with-fixtures` → green (this is what enforces PRD §6.3,
every comprehension token resolving);
`vitest run tools/validate.test.ts tools/content-build.test.ts tools/generate-prompt.test.ts
src/course/types.test.ts` → 119 passed.

## Headline: the content is in good shape

M1, M2 and M4 came through with **no grammatical corrections**. The gender system (माझा/माझी/माझं,
आवडतो/आवडते/आवडतं, हवा/हवी/हवं, बरा/बरी/बरं), the person system (आहे/आहेस/आहात, -तो/-तोस/-ता),
the noun genders that carry the whole course (चहा m, कॉफी f, भात m, साखर f, पाणी n, दूध n, काम n,
संगीत n, नाव n, देश m, भाषा f) and the Hindi→Marathi flips built on them are consistent across all
five modules and with M6–M10. The five corrections below are two accuracy fixes, one clarity fix and
two teaching-consistency fixes.

## Corrections applied

### M5-1 · "No ने, ever" over-generalises (rule 1)

- **Before:** `"No ने, ever: Hindi मैंने/तुमने → Marathi plain मी/तू. *मीने does not exist …"`
- **After:** `"मी and तू never take ने: Hindi मैंने/तुमने → Marathi plain मी/तू. *मीने does not
  exist …"`
- **Why:** Marathi does have the ergative ने — it is just absent on the first- and second-person
  singular pronouns, whose ergative is syncretic with the nominative (मी, तू). Third person takes it
  overtly: **त्याने काम केलं**, **रामाने भात खाल्ला**. Everything L1 teaches is मी/तू, so the
  teaching is unchanged; the claim is now true, and a learner meeting त्याने in L2 will not find the
  course has lied. The tag stays `interference`, and M10's "मराठी में ने कहीं नहीं (M5)" (about मी)
  remains consistent.

### M5-2 · तुम्ही in the past was missing its -त agreement marker (S06 variation, C06, rule 4)

- **Before:** `तुम्ही काल काय केलं?` (S06 variation and comprehension item C06)
- **After:** `तुम्ही काल काय केलंत?`
- **Why:** Marathi marks a second-person **plural/honorific** subject with **-त**, exactly parallel
  to the **-स** the module already drills for तू. The paradigm the course itself teaches shows it:
  तू आहे**स** / तुम्ही आहा**त** (M2), तू करतो**स** / तुम्ही कर**ता** (M4). In the past it is
  तू केलं**स** / तुम्ही केलं**त**, तू गेला**स** / तुम्ही गेला**त**. Leaving तुम्ही bare in the past
  was both non-standard and internally inconsistent — M5 states the -स rule and then silently drops
  its तुम्ही counterpart. Supporting edits: `केलंत` added to the `forms` of केलं (so the pool token
  resolves in the word index — PRD §6.3), the word note extended, and rule 4 now reads
  _"…Polite तुम्ही takes -त in the same slot: तुम्ही काय केलंत? — the marker already met in आहात and
  करता."_ Rule indices were not renumbered (they are contractual), only rule 4's text extended.
  → Also listed as **open question 2** — some speakers drop the -त in casual speech.

### M5-3 · S05 trap described the wrong ambiguity

- **Before:** `"झोपले फिर हिंदी की नज़र में 'वे सोते हैं' जैसा दिखता है …"`
- **After:** `"झोपले पढ़कर हिंदी वाला कान 'वे सो गए' सुनता है — और मराठी में 'ते झोपले' सचमुच वही है.
  पर 'मी झोपले' स्त्री की अपनी बीती बात है: एक ही रूप, दो पते — कर्ता देखकर तय करो. …"`
- **Why:** a tense mismatch. झोपले is a **past** form; it cannot look like the present habitual
  "वे सोते हैं". The trap appears to have been copied from M4's खाते trap, where the parallel is
  genuine (Marathi मी खाते "I (f) eat" vs Hindi वे खाते हैं — both present habitual). The real
  interference on झोपले is the syncretism *inside Marathi*: **मी झोपले** (I, a woman, slept) and
  **ते झोपले** (they slept) are the same string. That is now what the trap teaches.

### M3-1 · नको "never changes shape" is too strong

- **Before:** `"…it replaces हवा/हवी/हवं entirely and never changes shape."`
- **After:** `"…it replaces हवा/हवी/हवं entirely and never changes for the gender of the thing."`
- **Why:** the teaching point (नको is gender-invariant, unlike हवा/हवी/हवं) is right and preserved,
  but नको is not invariant full stop: it takes **नकोत** with a plural thing (मला ती पुस्तकं नकोत)
  and **नकोस/नका** as a prohibitive (तू जाऊ नकोस / तुम्ही जाऊ नका). Neither is taught at L1, so
  narrowing the claim to gender costs nothing and stops a false generalisation. The sentence's own
  variation text already said the accurate thing ("वह किसी लिंग से नहीं बदलता") — the English note
  now agrees with it.

### M4-1 · rule 2 copy: "Hindi का हूँ"

- **Before:** `"No आहे after it — Hindi का हूँ has no slot here."`
- **After:** `"No आहे after it — Hindi's हूँ has no slot here."`
- **Why:** the module's rule texts are English; "Hindi का हूँ" is a half-translated possessive that
  reads as a typo. No linguistic change.

## The #110 adjudication: मी चहा प्यायलो vs मी चहा प्यायला

**Recommendation: keep the modules as they are (object agreement); fix the brief.** Done in this PR.

The brief (`tools/course-briefs.ts`, `L1-M5`) illustrated the object-agreement rule with
**मी चहा प्यायलो** — a form that agrees with the *speaker*, i.e. the exact opposite of the rule the
same sentence states. Whatever one decides about colloquial usage, that example could not stay: it
contradicts itself, and it is the prompt that seeds future authoring.

Two changes to the brief:

- **notes:** the example pair `(मी चहा प्यायलो vs मी कॉफी प्यायली)` → the uncontested three-gender
  set **मी भात खाल्ला (m) · मी कॉफी प्यायली (f) · मी पाणी प्यायलं (n)**, with "follows the OBJECT,
  **never the speaker**" made explicit and the ने claim narrowed to मी/तू as in M5-1. Using भात and
  पाणी sidesteps पिणे entirely — no one disputes खाल्ला/प्यायलं there — so the brief no longer rests
  the rule on the one verb where usage is split.
- **patterns:** `'मी काल + N + V-लो/-ले/-लं'` → `'मी काल + N + V-ला/-ली/-लं'` **plus** a separate
  `'मी काल + V-लो/-ले'`. The old pattern welded the transitive (object-agreeing -ला/-ली/-लं) and
  intransitive (subject-agreeing -लो/-ले) endings into one line, which is precisely the confusion
  M5 exists to remove. The modules' own `complexity.allowedPatterns` already had this right; the
  brief now matches them.

**On the underlying usage question** (open question 1 below): prescriptive standard Marathi is
unambiguous — a transitive past agrees with its object, so मी चहा प्यायला. But मी चहा प्यायलो is
widely heard in Pune/Mumbai speech, and I am not in a position to rule on how a native ear grades
it. Two things make the current content the safe bet either way: (a) M5 teaches the standard form,
which is what a learner should write; (b) the one place the module *calls प्यायलो wrong* — S02's
mistake block — does so with a **feminine** object (मी कॉफी प्यायलो), where subject agreement is
far more jarring than with चहा. So no change is needed in the modules even if the reviewer judges
मी चहा प्यायलो acceptable in speech; at most S02's `why` gains a hedge. Recorded as open question 1.

## Open questions for the native reviewer

Nothing below was changed. These are the judgment calls — dialect, register, colloquial-vs-formal —
where guessing would be worse than asking.

1. **मी चहा प्यायलो (subject agreement on पिणे).** Is it acceptable colloquial Marathi, or plainly
   wrong? If acceptable, should M5-S02's mistake block soften from "wrong" to "heard, but
   non-standard — write प्यायली"? (The brief is already fixed either way; see above.)
2. **तुम्ही … केलंत.** Confirm the -त is right in the honorific past, and say whether the bare
   तुम्ही काय केलं? is common enough in Pune/Mumbai speech to deserve a variation. (M5 S06, C06.)
3. **-आयच- : agreeing vs invariant.** M3 teaches object agreement (चहा प्यायचा · कॉफी प्यायची ·
   पाणी प्यायचं), but the invariant neuter — मला मराठी शिकायचं आहे — is very widely used, and M3's
   own `complexity.allowedPatterns` cites the neuter shape `मला + V-आयचं आहे`. Should the invariant
   be taught as a legitimate alternate, or kept out as a simplification?
4. **बरा for "well".** Is मी बरा आहे the natural everyday answer to तू कसा आहेस?, or would a
   Puneite reach for ठीक आहे / छान / मजेत first? (M2 S03, S09, S10 all hang on बरा.)
5. **हो vs होय.** M2 S06 teaches हो as everyday and होय as "fuller, more formal". Is that the right
   split, and is होय too bookish to show a beginner at all?
6. **Register chips.** M1-S09 (मला भात खूप आवडतो) is tagged `informal` while the near-identical
   M1-S08 (मला कॉफी खूप आवडते) is `neutral`; खूप itself is neutral standard Marathi. Should S09 be
   `neutral`? More generally: are the `informal` chips on M2's तू sentences and M3-S04/S05 the right
   calls?
7. **कॉफी.** Spelled without a nukta throughout the Marathi (कॉफी) while the Hindi cues use कॉफ़ी.
   Intentional and correct for Marathi orthography as far as I can tell — please confirm, since it
   is the only nukta-relevant loanword in the five modules.
8. **साखर खाल्ली** (M5-S01 variation, "I ate sugar"). Grammatically fine and it drills the feminine,
   but is it a natural thing to say? If not, a swap (e.g. भाकरी / पोळी) would need a new word row.
9. **Sound notes.** Several are phonetic claims I can state but not hear: भाषा ≈ "भाशा" (M1-S04),
   "मराठी का ठ मूर्धन्य" (M1-S05), झ described as "नरम" in झोपतो/तुझं (M2-S04, M4-S06). Please spot-
   check the three of them.

## Cross-module consistency: verified clean

- **Noun genders** are stable everywhere they recur: चहा m (M1, M2, M3, M5), कॉफी f (M1, M2, M3,
  M5), भात m (M1, M3, M5), पाणी n (M3, M5), दूध n (M3, M5), साखर f (M3, M5), काम n (M4 flags it
  "will matter in M5", M5 delivers केलं), संगीत n (M1 आवडतं → M5 ऐकलं), नाव n, देश m, भाषा f,
  मराठी f (M1, M3, M4).
- **Person endings** form one ladder with no contradiction: आहे/आहेस/आहात (M2) → -तो/-ते/-तोस/-तेस/
  -ता (M4) → -लो/-ले/-लास/-लीस (M5), with the -स "तू marker" thread called out in M2, M4 and M5 by
  name. The M5-2 fix closes the one gap in that ladder (the तुम्ही -त).
- **Frames** carry forward correctly: मला/तुला dative (M1 → M2 → M3), का last (M2 → M3, M4, M5),
  नाही as both "no" and the negative copula (M2 → M3, M5), थोडा/थोडी/थोडं (M3 → M4, M5).
- **Deliberately-wrong strings** live only in `mistake.display` (मीने, तूने, नमस्ते, हाँ, है, सुनतो,
  सोतो, गया, सोई, खाती) — none leaks into a word row, a `forms` entry or a pool item, so none is
  indexed as teachable Marathi.

## What changed when the flag was flipped (2026-08-13)

This section predicted the mechanics; here is what the flip actually cost, all ten modules at once:

- `tools/content-build.test.ts` — the strict-build test now asserts
  `hi-mr: 10 modules (L1-M1..M10)` and a skipped list of the two fixture courses, and a second test
  asserts every strictly-shipped module names a reviewer and a date.
- `tools/validate.test.ts`, `src/course/types.test.ts` — the "never true in this repo" assertions
  became "true only with a signature".
- `content/schema/module.schema.json` — `verified` is described as the ship gate it is, `verifiedBy`
  as who or what reviewed the module; `verifiedAt` is now a plain `date` (YYYY-MM-DD).
- **Fonts and payload.** The Devanagari subsets are generated against shipped content, so they went
  from ~4 KiB per weight to ~86–90 KiB: `BUDGET fonts` 99.1 → **361.2 KiB**, `BUDGET total` 204.4 →
  **548.1 KiB gzip**. Both blew their limits exactly as docs/05-perf-notes.md §4 predicted; §4 now
  records the rebalance (380 KiB / 580 KiB) and why the cheaper options did not apply.
- The service worker precaches 43 files / 1173 KiB instead of 41 / 1073 KiB.

`content:validate` needed no change: it already required `verifiedBy` and `verifiedAt` on a verified
module, and that rule is now the guard that keeps this record honest.
