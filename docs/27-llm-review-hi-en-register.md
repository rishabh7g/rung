# LLM review — hi-en, the register pass

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Fable 5), which
cannot hear anything and is not a fluent-English editor in the sense this course eventually needs.
`verified: true` on all ten hi-en modules still rests on the repo owner's authority, exactly as
the six earlier hi-en reviews say. The two modules this pass edits — **L1-M2** and **L1-M10** —
were re-read whole (rules, word rows, notes, traps, sounds, sentences, variations, mistakes,
usage, mnemonics) and keep `verifiedAt: "2026-08-24"` under this pass's signature; the other
eight were re-read at sentence level (display, cue, usage, register) for the audit below and are
not touched. **No fluent-English gate exists for this course**; the open questions at the bottom
continue `docs/25-llm-review-hi-en-comprehension.md`'s numbering (which ended at 17).

This is issue **#294**. Going in, all 100 hi-en sentences carried `register: "neutral"` and the
`informal` chip — a schema enum value rendered beside WHEN TO USE IT — was never used, recorded
as open question 26 of `docs/13-llm-review-hi-en-L1-M6-M10.md` (and as docs/11 Q13, docs/12 Q17
for the earlier rungs). Coming out: **one sentence honestly wears the chip** (M10-S10), and the
informal register English actually has — lexical, not pronominal — is **taught** on the rows
that own its words: `Hi`, `Not bad`, `Bye`, `See ya` as forms with register notes, and
`How's it going?` as a shown variation.

## Part 1 — the re-judgment of all 100 tags

The enum is two-valued (`neutral` | `informal`), so the honest question per line is only: is
this line's SHAPE casual — would a fluent speaker swap it for a fuller or different shape in a
careful setting? Two anchors kept the calls from being taste:

1. **The chip describes the English line**, but the course's own Hindi frame is evidence of what
   the line is being taught AS — and every second-person cue in the course says **आप**, never
   तुम/तू (`आप कैसे हैं?`, `आप उदास क्यों हैं?`, `आपको देर क्यों हुई? माफ़ कीजिए…`). A line whose own
   cue is honorific cannot honestly wear the informal chip.
2. English register at this rung is **lexical** — M2-S03's own `you` row says it in so many
   words (आदर शब्दों में जाता है, सर्वनाम में नहीं). So informality lives in word choice (`Hi`,
   `Okay`, `See you`), not in any conjugation the tag could track.

**The one retag — `L1-M10-S10` → `informal`.** `Okay, thank you. Goodbye, Rohan. See you
tomorrow.` opens on `Okay` and closes on `See you` — the everyday-spoken leave-taking; in a
careful setting the fluent shape is `Thank you. Goodbye.` Its cue (`ठीक है… कल मिलते हैं`) is the
one cue in the course that is itself बोलचाल rather than honorific, so for once the chip, the
English and the Hindi agree. The usage line now says what the chip means (अंदाज़ बोलचाल का) and
names the careful alternative, so the chip is explained where it renders.

**Judged and kept `neutral` — the borderline lines, with the rationale the issue asked for:**

| line | verdict | why |
| --- | --- | --- |
| M2-S08 `Yes, I am` · M2-S09 `No, I'm not` | neutral | The auxiliary-echo short answer is the polite standard shape (M2 rule 1 calls it THE idiom); it is what an interviewee says. The informal counterparts are `Yeah` / `Nope` — untaught (Q18 below). |
| M10-S02 `I'm fine, thank you. And you?` | neutral | The textbook polite reply; the ellipsis is standard spoken politeness, and its own cue is `और आप?` — honorific. Tagging it informal would contradict the card it sits on. |
| M10-S08 `… Yes, I do. I also like coffee.` | neutral | Same short-answer call as M2-S08. |
| M9-S03 `Why are you sad?` · M9-S05 `Why do you sleep late?` | neutral | Direct personal questions, but directness is pragmatics, not register: the cues frame both at आप, and the questions are what a doctor or teacher also asks. |
| M10-S09 `Why are you late? Sorry, …` | neutral | The cue glosses `Sorry` as `माफ़ कीजिए` — the formal apology; the course is teaching the exchange at आप level. Bare `Sorry` vs `I'm sorry` is already in the row note. |
| M8-S05 `Can I have two bananas, please?` | neutral | `Can I have … please` IS the course's politeness lesson (M8 rule 3 names `Give me` the register error); everyday-neutral, not casual. |
| M3 want-lines (`I want tea` …) | neutral | Statements of a want, not requests to a person; the request register is M8's lesson. |

Everything else is register-flat statements and questions (M1, M4–M7 wholesale) — neutral is
honest. This answers **docs/11 Q13**, **docs/12 Q17** and **docs/13 Q26** (resolved: `neutral`
was honest for 99 of the 100; the hundredth now says so). **Docs/13 Q16** (is `Goodbye` too
formal beside `Okay` and `See you`?) is addressed in part: the display stands, but the turn now
wears the chip and both informal alternates (`Bye`, `See ya`) are taught on its own rows — the
display call itself stays with the native pass.

## Part 2 — the informal register, taught

Four forms, each on the row that owns the slot, each with a बोलचाल note in Devanagari (the
issue's own pattern: "the Hello row can carry Hi"):

| surface | key | row | note carries |
| --- | --- | --- | --- |
| `Hi` | `hi` | L1-M2-S01 #0 (Hello) | दोस्त, हमउम्र, जान-पहचान; Hello हर माहौल में |
| `Not bad` | `not bad` | L1-M2-S04 #1 (fine) | बुरा नहीं = ठीक-ठाक, दोस्तों में; fine हर माहौल में |
| `Bye` | `bye` | L1-M10-S10 #1 (Goodbye) | the note ALREADY said बोलचाल में Bye — promoted from prose to taught form |
| `See ya` | `see ya` | L1-M10-S10 #2 (See you) | the sound line already taught 'सीया'; now the written shape too |

Two new variations show whole informal lines the sweep can resolve — `Hi, I'm Rohan` (M2-S01)
and `Okay, thank you. Bye, Rohan. See ya tomorrow.` (M10-S10) — and one shows the greeting the
learner most needs to recognise even though its parts are not yet taught: **`How's it going?`**
(M2-S03, cue `क्या हाल है?`), with `Not bad` named as its answer in the changed-note and in
S04's forms. M2-S03's usage line now names it beside `How are you?`.

Seams respected, deliberately: `Good morning` stays M2's whole surface and `see` stays M5's
(`see ya`, like every multi-token surface, grants no bare key — `ya`, `bad` stay out);
`hi` and `bye` were unclaimed and are NOT on any pinned-reserved list (docs/13 reserves
`well` / `now` / `bus` / `three` / `six` / `hundred`; all still free); bare `going` stays
unclaimed per docs/13's `going to` seam — which is exactly why `How's it going?` is a variation
with decided misses, not a form. Sound lines gained only `Hi = हाय`, `Not bad = नॉट-बैड`,
`Bye = बाय` (Q27 of docs/13 applies to them as to every sound claim). Register notes ride the
rows' own notes: `forms` entries and variations have no register field (Q21 below).

## Verification

- **Additions-only index invariant, proven not assumed**: all ten emitted
  `public/content/hi-en/index/L1-M*.json` saved before the change, rebuilt after, compared key
  by key — **0 re-pointed, 0 removed** across every cumulative index; exactly four added keys,
  each on its own row (`hi` → M2-S01 #0, `not bad` → M2-S04 #1, `bye` → M10-S10 #1,
  `see ya` → M10-S10 #2). Per-module counts 24 · 42 · 59 · 93 · 111 · 129 · 151 · 174 · 191 ·
  **207** (M2 +2, M10 +2 more); `maxSpan` unchanged in every module (the new spans are 1- and
  2-token; M2 stays 2, the course stays 3).
- **The variation sweep** moved 27 → **30 decided misses**: the three tokens of `How's it
  going?` at M2-S03 (`how's`, `it`, `going`) — `it` is M7's on schedule, the other two
  deliberately unclaimed. Pinned in `tools/content-build.test.ts` with the rationale in the
  test's comment; the other three new variations sweep clean. The 27 prior misses are unchanged.
- **Codepoint stability**: the new prose introduces **zero characters** the two touched files
  did not already carry, so the font subsets cannot grow from this pass.
- Suites: `npm run content:validate` 40/40; `npm run content:build` green (the two count pins
  updated 203 → 207); `tools/content-build.test.ts` 84/84 including the re-pinned sweep;
  `src/course/hiEnAuthored.test.tsx` (the M10-C08 turn walk still lands `See you`, M5's `see`
  never opened), `src/course/types.test.ts`, `tools/validate.test.ts`,
  `src/screens/SentenceScreen.test.tsx` all green; then the full `scripts/verify.sh`.

## Open questions for a fluent-English pass

Numbering continues docs/25's list (which ended at 17); these five join the 105 outstanding.

18. **`Yeah` / `Yep` / `Nope` are still untaught** — the short answers keep only the
    auxiliary-echo shape this pass judged neutral. The informal yes/no words are arguably the
    highest-frequency informal surfaces in speech. Right restraint at L1, or should the Yes/No
    rows carry them as #294 carried `Hi`?
19. **`And you?` kept neutral** — the call rests on the polite-formula reading and the आप cue;
    a fluent ear might still hear the M10-S01/S02 exchange as friendly-register whole. Should
    the return question carry the chip, or an informal `You?` be taught beside it?
20. **`OK` and `thanks` stay prose-only** — the Okay note names `OK`, the thank-you note names
    `thanks`; #294's Bye call (promote a note-named alternate to a taught form) would apply to
    both. Promote, or keep the rows lean?
21. **One chip per sentence** — M10-S10 mixes `Goodbye` (neutral-leaning) with `Okay` /
    `See you` (informal), and the chip now covers the turn whole; `forms` entries and variations
    carry register only in prose. Is sentence-level the right grain, or does the schema
    eventually owe forms a register?
22. **`क्या हाल है?`** — the one informal Hindi cue in a course otherwise pitched at आप, chosen
    because a तुम-register English line deserves a तुम-register cue. The same coexistence
    docs/21 Q8 and docs/25 Q14 record for the honorific plural, now from the other side; a
    native pass should rule on the course's cue-register policy once, for all three cases.
