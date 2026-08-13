# LLM review — en-ar L1-M3, L1-M4 and L1-M5

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Opus 5), which
does not speak Arabic, has never heard it, and cannot judge how any of this lands in a room.
`verified: true` on all three modules rests on the repo owner's authority, exactly as
`docs/07-llm-review-en-ar-L1-M1-M2.md` recorded for M1–M2 (PR #216), hi-mr's flip did in #190 and
en-es's in #206; `verifiedBy` says so in words. **No native Arabic gate exists for this course** —
none is even scheduled — so the open-questions list at the bottom is not a formality, it is the
outstanding work.

The middle three rungs are where the Arabic verb turns inside out: M3 negates it and chains it,
M4 runs the person across the front of it, M5 moves the person to the back. Everything else in the
level is vocabulary hung off those three moves.

## What was authored

| | L1-M3 Needs and wants | L1-M4 My day | L1-M5 Yesterday |
|---|---|---|---|
| sentences | 10 | 10 | 10 |
| new word rows | 12 of 25 allowed | 15 of 25 | 13 of 25 |
| pool items | 8 | 8 | 8 |
| tokens per sentence | 2–4 (bound declared 6) | 3–5 (declared 6) | 3–6 (declared 7) |
| module rules | 9 | 8 | 8 |
| enrichment | full (all five blocks, every sentence) | full | full |
| `script` line | on every sentence, word row, variation, mistake and pool item | same | same |
| prerequisites | `["L1-M2"]` | `["L1-M3"]` | `["L1-M4"]` |
| cumulative index | 50 → **71** surfaces | 71 → **101** | 101 → **132** |

`ENRICHMENT_FULL_THROUGH_MODULE` is 3, so only M3 owed the full five blocks. M4 and M5 ship them
anyway: at ~30 word rows per module the budget is not the constraint (`course:en-ar` measurement
below), and a half-enriched M5 would have been the first module in the course where a learner taps
a sentence and gets less than the one before it.

Written strictly in ladder order through the #109 CLI, rebuilding the index between modules, so
each prompt was generated against the previous module's real cumulative inventory. All three were
authored from the briefs in `tools/course-briefs.ts` (#198 / PR #215).

## What this pass found wrong, and fixed

The three module files existed on disk before this review ran — authored, valid, and already
carrying `verified: true`. The review was done against them from scratch rather than trusting that
flag; these are the things it changed.

1. **`content/en-ar/levels.json` had L1-M5 still marked `hasContent: false, draft: true`.** M3 and
   M4 were flipped, M5 was not — so the module file shipped in the build while the ladder screen
   would have kept the rung locked and labelled a draft. Flipped, and the `draft` key removed, per
   the acceptance criterion.
2. **M5's rules 2 and 7 were unreachable.** `SentenceScreen` renders a module's rules ONLY through
   `deconstruction.rules` indices (`src/screens/SentenceScreen.tsx`, PRD §7) — a rule no sentence
   cites is never drawn for anyone. M1, M2, M3 and M4 all reference every rule they declare; M5
   declared eight and cited six. The two orphans were not filler:
   - **rule 2** is the module's headline interference rule (*"English marks the past on the verb but
     never the person … a learner reaching for anā dhahabtu is translating a pronoun Arabic already
     put inside the suffix"*), and M5-S01's mistake is literally `ams anā dhahabtu ilā al-madrasa`.
     Added to S01, whose plate it explains.
   - **rule 7** is the module's boundary (*no past negation in L1; this module stays affirmative,
     questions aside*). Added to S04, the module's only question — the sentence that carve-out is
     about.

   Rule coverage is now 8/8 in M5, matching every other en-ar module.

Nothing else was changed. Where this pass disagreed with a call the drafts had made but the call
matched what M1–M2 already shipped, the call stands and is written up below instead — diverging
mid-course is worse than the wart.

## The ratified decisions, and where they show

The variety and the romanization were settled in #198 and are not revisited here.

- **Spoken-simple MSA, pause forms.** No case endings anywhere except the header's three lexical
  exemptions. M5 spends a whole rule saying so out loud where it would otherwise look like a
  half-finished job: *"Full MSA puts kāna's predicate in the accusative — kāna al-jaww bāridan.
  This course's pause forms hide that ending, deliberately … Said aloud so nobody 'fixes' it
  halfway."*
- **Write whatever carries the person; drop whatever carries only case or mood.** This is the
  seam the middle of the ladder is built on, and all three modules apply it identically:
  `ashrab` not `ashrabu`; `turīdīn` not `turīdīna` (the `-īn` is her, the `-a` is mood — M3-S06's
  note says exactly that); `urīd an ashrab` with no subjunctive vowel; and then `dhahabtu` /
  `dhahabta` / `dhahabti` / `dhahaba` written in full in M5 because there the vowel IS the person.
  M5's rule 1 states the non-contradiction in one sentence so a later author cannot read the two
  halves as a conflict.
- **Assimilation always written, elision never.** `aṣ-ṣabāḥ` and `as-sayyāra` and `as-sūq`, never
  `al-ṣabāḥ`; `fī al-masāʾ` and `fī al-bayt` written in full with the elision put in `sound`
  (*"fi l-ma-SAAʾ"*, *"fi ṣ-ṣa-BAAḤ"*) — the brief's instruction, and M4 is the first module where
  it was testable (M1–M2 had no `fī`). M4-S09's `fī al-layl` is the interesting one and its note
  handles it: `l` is a sun letter, so the assimilation is real but invisible — *"al-layl looks
  regular and is said with one long doubled l."*
- **`wa` a free word.** M3-C06 and M5-S10 write `wa` spaced in `display` and joined in `script`
  (`وقهوة`, `وشربت`), which is the convention M1–M2 set.
- **`ʾ` and `ʿ` kept apart.** `māʾ` / `masāʾ` / `dāʾiman` / `taʾkul` carry hamza; `ʿaṣīr` /
  `al-ʿamal` / `maʿa` / `taʿbān` / `al-maṭʿam` carry ʿayn. Word-initial hamza still unwritten
  (`adhhab`, `ams`, `akaltu`, `an`).

### Arabic script checked against every romanization

Every `display` in all three modules — sentences, word rows, variations, mistakes and pool items —
was read against its `script` line character by character. No mismatches. The `content:build` run
reports **no `warn … carries no script line`** for any of the three, so every readable surface has
its Arabic original.

Three places where a *wrong* romanization has a *right* script, and that is correct rather than a
bug: M4-S02's mistake `fī al-ṣabāḥ`, M5-S04's mistake `hal dhahabti …?` and M5-S10's mistake
`… wa sharibta al-ḥalīb` all carry the same Arabic as their sentence, because unpointed Arabic
writes neither the assimilation nor the short vowel that the error turns on. M5-S04's `why` says so
in words (*"In bare script the two look alike — in this course's spelling, the vowel is the
person"*). M2-S10 shipped the same shape and #216 accepted it.

## The slogan traps, and what was written instead

- **"Add -a to make it feminine"** → M3 rule 8 kills it by naming the counterexample rather than
  hedging: *"Gender belongs to the NOUN and is learned with it — al-Hind is feminine with no -a in
  sight. What -a reliably marks is the word that AGREES."* This is the defect the third Marathi
  review had to correct three times (`docs/08-marathi-third-review.md`, corrections 1–3), pre-empted.
- **"Arabic has no verb to be"** → M1 stated the boundary; M5 collects on it. Rule 3 and S05's
  trap both say the slogan was only ever true of the present, and S07 puts `kāna al-jaww bārid
  ams` next to its own variation `al-jaww bārid al-yawm` — the same sentence with and without the
  verb, one line apart, which is what the brief asked for.
- **"tu-/ta- is the you-prefix"** → stated twice as a *collision*, not a rule: M3 rule 7 for
  `turīd` and M4 rule 5 for `tashrab`, each saying the prefix is you-m AND she and that the
  separation is a suffix (`turīdīn`), not a prefix. M4-S05 is deliberately a *she* sentence
  (`tashrab al-ḥalīb aḥyānan`) so the collision is met from the other side.
- **"The non-past is the present tense"** → M4 rule 1 names it the NON-PAST and gives the three
  English readings it covers, then says why the name matters: it is what `lā` and `an` attached to
  in M3 and what `sa-` will point at tomorrow in M6.
- **"Your first Arabic verbs take a- for I"** → M4 rule 1 carries the honest clause the brief
  demanded: `uḥibb` and `urīd` wear `u-` because of their verb pattern, *"so your first two verbs
  are the exception, not the rule."* M3-S03's `ashrab` row says the same thing at the point where
  a learner first meets a regular `a-`.
- **"Arabic has an infinitive"** → M3 rules 3 and 4 and S03's mistake `urīd ashrab al-qahwa`. Both
  English-shaped failures the brief named are covered: the missing `an` (the mistake plate) and the
  person slipping to "he" (`urīd an yashrab`, in rule 4).

## The index audit — where every token actually lands

Run against the emitted `public/content/en-ar/index/L1-M<n>.json` through the real engine
(`matchSurfaces` + `normalizeSurface` + `surfaceIndexKeys` from `src/engine/surface.ts`), resolving
each hit back to `modules/<id>.json → sentences[<sid>].deconstruction.words[<idx>]` — the exact row
`WhyPanel` would render, module by module against that module's own cumulative index (so M3 was
checked against M1–M2, M4 against M1–M3, M5 against M1–M4).

**Pool: 24 items, 85 tokens, 0 unresolved, 0 wrong-word landings, 17 forms-hits.
Sentences: 30 sentences, 107 tokens, 0 unresolved, 0 wrong-word landings, 11 forms-hits.**
The build's own PRD §6.3 gate (comprehension tokens must resolve) passes, and so does the stricter
question the acceptance criterion asks — whether each token lands on the RIGHT row.

### Where the 30 sentence heroes and 24 pool items land

Only the surfaces that do NOT land on a row headed by themselves are listed; everything else
resolved to its own row.

| module | tapped | row it opens | same word? |
|---|---|---|---|
| M3 | `qahwa` (S04, S07, C06, C07, C08) | **al-qahwa** (M1-S05 #1) | yes — the alias the brief required, note written for both |
| M3 | `shāy` (S06) | **ash-shāy** (M2-S10 #0) | yes — M2's own bare part |
| M3 | `sākhin` (C04) | **sākhina** (M3-S07 #0) | yes — masculine of the same adjective, note names both |
| M3 | `kabīr` (C05) | **kabīra** (M3-S09 #1) | yes — same, and `al-kabīr`/`al-kabīra` too |
| M3 | `al-kabīr` (S10) | **kabīra** | yes — the definite form of the same adjective |
| M4 | `tashrab` (S05, S07, S09, C02), `nashrab` (S10, C04) | **yashrab** (M4-S04 #0) | yes — other persons of the same verb |
| M4 | `tadhhab` (C06) | **adhhab** (M4-S01 #0) | yes |
| M4 | `taʾkul` (C07) | **ākul** (M4-S03 #0) | yes |
| M4 | `al-māʾ` (C08) | **māʾ** (M1-S08 #0) | yes — M1's own alias |
| M4 | `fī al-masāʾ`, `fī aṣ-ṣabāḥ`, `fī al-layl`, `kull yawm` | their own multi-token rows | n/a — matched whole by the longest-match walk |
| M5 | `dhahabta` (S04, C01), `dhahaba` (C06) | **dhahabtu** (M5-S01 #1) | yes — other persons of the same perfect |
| M5 | `kāna` (S07, C03), `kunti` (C07) | **kuntu** (M5-S05 #0) | yes |
| M5 | `taʿbāna` (C07) | **taʿbān** (M5-S06 #0) | yes — feminine of the same adjective |
| M5 | `qahwa` (S02, C08) | **al-qahwa** (M1) | yes |

Not one of these is a cousin, a synonym or a set of siblings — the bug class that shipped four times
in hi-mr (`docs/07-llm-review-L1-M6-M10.md`: M6-1, M7-2, M7-3, M8-1, e.g. "under the table"
resolving to the row headed "on the table"). Every `forms` list in all three modules was read
one entry at a time: all 61 of them are another shape of the row's own word — an article-ed or bare
form of the same noun, a gender pair of the same adjective, or a person of the same verb.

Edge punctuation is stripped per token by `normalizeSurface`, so `qahwa?`, `al-ḥalīb?`, `naʿam,`
and `lā,` resolve exactly as their bare forms do — checked in the walk, not assumed.

### The forms-hits, and the cue convention behind them

A forms-hit means the Why panel shows a row headed by a **different** string, so the row's note has
to be true of the surface the learner tapped. Every note above passes that test explicitly:
`yashrab`'s note says *"ya- is he, ta- is you-m or she, na- is we"*, `dhahabtu`'s names all four
suffixes, `sākhina`'s and `kabīra`'s name both genders, `kuntu`'s names all four persons.

**The `cue` is a different matter, and it is a course-wide convention this pass deliberately did
not fork.** A verb paradigm row is cued with ONE person's gloss — `adhhab` "I go", `yashrab`
"he drinks", `dhahabtu` "I went" — so a learner who taps `nashrab` in *"We drink coffee in the
morning"* (M4-C04) sees a row headed **yashrab · he drinks**, with the note underneath immediately
saying `na-` is we. That is exactly the shape M1 shipped and #216 reviewed and accepted (`yuḥibb`
and `tuḥibb` → row **uḥibb** / "I like, I love", tapped from M1-C02 and M1-C06). Changing it in M3–M5
alone would leave the course cueing paradigms two ways. Recorded here, and open question 17.

Worth noting for the same reason: the course already carries the other style too — M3-S04 cues
`turīd` as **"you want; she wants"**, naming two persons. If the convention is ever settled, it
should be settled for all five modules at once, not module by module.

### The clitic law — every bare part these modules create, and who owns it

`surfaceIndexKeys` indexes each hyphen part of a token against the same row, first occurrence
winning. M3–M5 create exactly five new bare part keys. Each one's owner note defines the part,
which is the brief's requirement:

| bare key | owner row | is the owner's note true of the bare key? |
|---|---|---|
| `aṣ` | **fī aṣ-ṣabāḥ** (M4-S02 #0) | yes: *"aṣ- is the article al- with its l swallowed by the sun letter ṣ — written as said, like ash-shāy."* Joins `al` (M1), `as` and `ash` (M2) as the course's article keys. |
| `ṣabāḥ` | **fī aṣ-ṣabāḥ** | yes: *"ṣabāḥ is the morning of M2's ṣabāḥ al-khayr."* This is the seam the brief planned two modules ahead — M2 taught `ṣabāḥ al-khayr` as ONE surface precisely so `ṣabāḥ` was free for M4 to claim, and the note is written true of both places. |
| `layl` | **fī al-layl** (M4-S09 #0) | yes: *"layl is night."* |
| `masā'` | **fī al-masāʾ** (M4-S10 #0) | yes: *"masāʾ is the evening of masāʾ al-khayr."* |
| `yawm` | **al-yawm** (M4-S08 #0) | yes, and this is the brief's explicit instruction, met: *"yawm alone is 'day' (kull yawm, every day), and with its article it is 'today' — al-yawm."* `kull yawm` is a two-token surface and so claims no bare part, which is what leaves `yawm` for `al-yawm` to answer for. |

Every other hyphenated surface these modules write — `al-ḥalīb`, `al-ʿaṣīr`, `as-sayyāra`,
`al-bayt`, `al-madrasa`, `al-ʿamal`, `al-fākiha`, `as-sūq`, `al-maṭʿam`, `al-jaww`, `al-khubz`,
`al-kabīr` — has its bare part in its own `forms` list, so the part and the whole are the same row
by construction, and the `al` part is M1's and stays M1's.

**No key was stolen.** `fī al-bayt` (M5-S05) yields parts `al` (M1's) and `bayt` (M3's own, via
`al-bayt`'s forms); both were already owned, so first-occurrence-wins left them where they were.
Same for `fī al-layl`'s and `fī al-masāʾ`'s `al`.

### Reverse sweep

All **69 word rows and 86 `forms` entries** across the five en-ar modules, checked against the final
cumulative index (132 surfaces): **0 shadowed, 0 forms entries resolving anywhere but their own
row.** Every row owns the surface it is headed by, every `forms` entry opens the row that lists it,
and the only keys any row does not own are the shared hyphen parts in the table above.

### The six unresolved tokens, all deliberate

Sentence heroes and pool items are 0/0. Six tokens in `variations` and `mistake` plates do not
resolve, which is correct: those blocks are static text on Sentence Detail
(`src/screens/SentenceScreen.tsx` sections 7 and 8) — not tappable, never sent to the resolver —
and a `mistake` is wrong-L2 by definition, so some of them SHOULD have no row.

| where | token | why it is right |
|---|---|---|
| M3-S01 mistake `urīd wāḥid ʿaṣīr` | `wāḥid` | the number "one" is not taught in L1 until M8; the mistake exists to say Arabic has no indefinite article |
| M4-S02 mistake `… fī al-ṣabāḥ` | `al-ṣabāḥ` | **this one must not resolve** — the whole lesson is that `al-ṣabāḥ` is not another spelling of `aṣ-ṣabāḥ`, it is no word at all. M2-S10's `al-shāy` is the same plate |
| M4-S02, S08, S09 mistakes | `fī` (×3) | bare `fī` is unclaimed by design: every `fī` phrase in M4–M5 is a multi-token surface, and M5-S05's note promises it to M7 (*"M7 will set fī free as a word of its own"*). Nothing writes bare `fī` in a hero or a pool item |
| M5-S09 variation | `Priyā` | a name, unindexed exactly as in M1-S01's own `ismī Priyā` variation |

### Index seams decided here (they bind M6–M10)

- **`ashrab` is M3's and `yashrab` is M4's — one verb, two rows, on purpose.** M3 needed `ashrab`
  for `urīd an ashrab`, so M4 could not re-own it; M4's row is headed `yashrab` and its `forms`
  carry `tashrab` and `nashrab` only. This is #216's law (*paradigms are NOT swept into `forms`
  when another module owns the form*) applied in the one place it actually bites in this stretch.
  **M6's author: `sa-ashrab` and `sa-yashrab` will hit whichever of the two rows matches the bare
  verb after the `sa-` part is split off.**
- **`sa` is still free**, and M6's first `sa-` verb owns it — nothing in M3–M5 writes a hyphen part
  `sa`. So is `bi-kam`'s target `bi` (M2's, already defined as the clitic), `li`, `ʿind`, `min
  faḍlika` (M1's `min` still owns `min`), `ghadan`, `an-nās`.
- **`fī` is deliberately unclaimed** and belongs to M7 as a free preposition. The four `fī …`
  phrases in M4–M5 stay reachable whatever M7 does, because the resolver takes the longest match
  first.
- **`kāna` lives inside `kuntu`'s row** (`forms: ["kuntu","kunta","kunti","kāna"]`). M6–M10 must not
  head a new row `kāna`; it would be shadowed.
- **`ams` is free-standing and `al-yawm` takes no preposition**, both stated in their own rows, so
  M6's `ghadan` has a matched pair to sit beside.
- **Still unclaimed after M5, for the modules the briefs assign them to:** `sa-`, `sawfa`, `ghadan`,
  `li-`, `li-ʾanna`, `li-dhālika`, `ʿind-`, `bi-kam`, `min faḍlika`, `wāḥid`, `ithnān`, `hunāka`,
  `ʿalā`, `taḥt`, `mā`, `laysa`, `lam`, `huwa`, `hiya`, `nūr`, `Miṣr`.

## Where this pass disagreed and left it alone

Three calls the drafts made that a stricter reading would change, all left as they are because M1
or M2 already shipped the same shape and diverging mid-course costs more than the wart. Each is an
open question below rather than a silent decision.

1. **A `mistake` plate that repeats a `variation` verbatim.** M5-S06 lists `kuntu taʿbāna ams` as a
   correct variation ("said by a woman") AND as the struck-through mistake ("said by a man this is
   wrong"); M5-S04 does the same with `hal dhahabti ilā as-sūq ams?`. The string is on one screen
   twice, once right and once wrong, and only the surrounding prose separates them. But this is
   exactly M1-S04 (`anā saʿīda`) and M2-S09 (`lā, anā mudarris`), which #216 authored and reviewed —
   and the framing is coherent, because both sentences' own `cue` names the speaker or addressee.
   It is a course-wide pattern, so it wants a course-wide decision (open question 18), not a
   one-module divergence.
2. **Grammatical-but-marked sentences on the mistake plate.** M3-S04's `hal anta turīd qahwa?` and
   M5-S01's `ams anā dhahabtu …` are both good Arabic that mean something slightly different
   (emphasis) rather than being wrong. #216 explicitly chose this shape for the pro-drop lesson
   when it replaced M1-S07's mistake with `turīd qahwa` (right sentence, wrong person), and both
   `why` lines say "reads as emphasis, not as plain speech" rather than calling them ungrammatical.
   Kept, and named in open question 19.
3. **`allowedPatterns` does not enumerate every sentence.** M3-S05 (`… māʾ faqaṭ`), S07, S08 and
   S09 sit outside the five patterns listed. The patterns mirror the brief verbatim, which is what
   the field is for (the validator does not enforce them as a grammar), and M1–M2 are in the same
   position.

## Verification

- `npm run content:validate` → **CONTENT 25/25 ok**, no `fixture` flag on any of the three
- `npm run content:build -- --with-unverified --with-fixtures` →
  `en-ar: 5 modules (L1-M1..M5)`, `index L1-M3: 71 surfaces`, `index L1-M4: 101 surfaces`,
  `index L1-M5: 132 surfaces`, and **no `warn … carries no script line`**
- `vitest run tools/validate.test.ts tools/content-build.test.ts src/course/types.test.ts` →
  **123/123 ok**, with the pinned inventories in `src/course/types.test.ts` and
  `tools/content-build.test.ts` extended to the five en-ar module files
- Rule reachability: **8/8 in M5** (was 6/8 before this pass), 9/9 in M3, 8/8 in M4 — every rule
  every module declares is cited by at least one sentence, so every rule reaches a screen
- `content/en-ar/levels.json`: L1-M1..M5 all `hasContent: true`, no `draft` key on any of them
- Non-browser smoke per the host's standing rule (no browser automation on this machine):
  `vite` served the dev build and `curl` fetched each artefact — `/content/en-ar/modules/L1-M3.json`
  (25,218 B), `L1-M4` (26,953 B), `L1-M5` (26,294 B) and their three index files (7,486 / 10,608 /
  13,807 B), all `200`, plus `/content/en-ar/levels.json` reading back `L1-M1..M5 hasContent: true,
  no draft` and `L1-M6..M10` still drafts. M5's served JSON carries the corrected rule indices
  (`S01 [0,1,2,5]`, `S04 [5,6,7]`) and its Arabic `script` lines intact. The RTL/font/visual-order
  checks that #216 ran under CDP are NOT re-run here; the character repertoire M3–M5 adds is the
  same Naskh subset M1–M2 established, and the first en-ar digits still do not arrive until M8.

## Open questions for a native pass

Nothing below has been changed in the content. These are the calls where guessing would be worse
than asking. **No native Arabic reviewer exists for this course**, so this list is the honest state
of the modules. The twenty questions here are additional to the nineteen in
`docs/07-llm-review-en-ar-L1-M1-M2.md`, all of which still stand.

### Register and naturalness

1. **`urīd ʿaṣīr` and `hal turīd qahwa?` as café language.** M1's open question 4 asked whether bare
   `urīd …` is a real request; M3 now builds five sentences on it. If the native reflex is
   `min faḍlika, qahwa` (M8) or `mumkin …`, the whole module's frame is the wrong one and the fix
   belongs in the brief, not in a sentence.
2. **`ʿaṣīr` as the first new drink.** Chosen for the ʿayn and the contrast with `qahwa`. Is juice
   what a beginner meets, or is it `ʿaṣīr burtuqāl` in practice — i.e. is the bare noun odd?
3. **`taʿbān`.** Its own `usage` line says *"grammars prefer mutʿab, the street says taʿbān"*. Is
   `taʿbān` acceptable in the spoken-simple MSA this course pinned, or has a dialect word been let
   into `display` — the one thing #198 said never to do?
4. **`al-jaww bārid` for "the weather is cold".** Is `jaww` the everyday word, or is it `aṭ-ṭaqs`?
   And is weather small talk actually a thing in the same way?
5. **`kull yawm` vs `yawmiyyan`.** The brief chose `kull yawm`. Is it what a person says, or is the
   adverb more natural in MSA?
6. **`dāʾiman` and `aḥyānan` at the END of the sentence.** M4-S04's mistake plate calls
   `yashrab dāʾiman ash-shāy` an English import. Is the final position really the everyday seat, or
   is pre-verbal `dāʾiman yashrab …` equally normal — in which case the mistake is not a mistake.
7. **`jiddan` after its adjective** (`sākhina jiddan`) and **`faqaṭ` at the end**
   (`urīd māʾ faqaṭ`). Both are stated as fixed positions with a mistake plate each. Are they?
8. **`maʿa` vs `wa` for company.** M5-S09's mistake says `wa Rohān` is wrong for "with Rohan". Is
   that clean, or does `wa` do that job often enough that the plate overstates it?
9. **`al-ʿamal` for "work" as a destination.** `adhhab ilā al-ʿamal` — natural, or is it
   `ilā al-maktab` / `ilā ash-shughl`?
10. **`ams kuntu dhahabtu …` as M5-S08's mistake.** MSA's real pluperfect is `kuntu qad dhahabtu`.
    The plate calls the helper wrong outright; is that too strong for a form that exists with `qad`?

### Sound notes — the author cannot hear any of this

11. Every `sound` line is derived from written descriptions of MSA phonology, not from listening.
    New in these modules: the `q` of `sūq` *"from the very back of the throat"*, the `ṭ`+`ʿ`
    cluster of `al-maṭʿam`, the doubled `w` of `jaww`, the doubled `y` of `sayyāra`, the doubled
    `d` of `jiddan`, the long `ā` of `ākul`, and the written catch in `dāʾiman` and `taʾkul`.
12. **Stress.** Every capitalised syllable (`u-REED`, `ADH-hab`, `dha-HAB-tu`, `a-KAL-tu`,
    `tu-ree-DEEN`) is the author's claim and carries no citation — the romanization scheme does not
    mark stress. `dhahabtu` in particular: is the stress really on `-HAB-`?
13. **The elision notes.** `fi ṣ-ṣa-BAAḤ`, `fi l-ma-SAAʾ`, `fi l-LAYL`, `fi l-BAYT` — M1's open
    question 16 said M4 would be the first test of putting elision in `sound` rather than in the
    spelling. It now is. Is `sound` the right home, and are those four renderings right?

### Grammar calls a native would settle in a second

14. **`hal turīdīn shāy?` with a bare `shāy`.** An offer drops the article by M1's law, but is a
    bare `shāy` what someone actually says, or does the offer keep it?
15. **`urīd an ashrab` with no subjunctive vowel written.** The scheme drops mood, so the page
    shows `ashrab` where full MSA says `ashraba`. Does that read as an error to an educated reader,
    or as the pause form the course intends?
16. **`kuntu taʿbān` with `taʿbān` in pause form** where full MSA has `taʿbānan` after `kāna`.
    M5 rule 4 declares the simplification out loud. Is declaring it enough, or does the sentence
    read as broken?

### Pedagogy calls the owner decides

17. **Paradigm row cues.** Should a row that answers for four persons be cued with one of them
    (`yashrab` · "he drinks", tapped from a *we* sentence) or with all of them
    (`turīd` · "you want; she wants")? The course does both today. Whichever wins, all five modules
    should change together.
18. **A `mistake` that is byte-identical to a `variation`.** M1-S04, M2-S09, M5-S04 and M5-S06 each
    print one string twice on the same screen, once as correct-for-her and once as wrong-for-him.
    Is that the clearest way to teach agreement, or should the mistake plate be reserved for
    strings that are wrong for everybody?
19. **Mistakes that are grammatical but marked** (`hal anta turīd qahwa?`, `ams anā dhahabtu …`).
    Is "this is emphasis, not neutral speech" a mistake, or a variation with a sharper note?
20. **M5 teaches the perfect with no negation at all.** The brief bounded it deliberately, and the
    module says so. But a learner leaves L1-M5 able to say what they did yesterday and unable to
    say what they did not do. Is that the right hole to leave, or does L1 need `mā` after all —
    accepting that it sits one apostrophe from `māʾ` in the index?
