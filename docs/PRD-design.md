# PRD — Rung (formerly Shidi / शिडी, "ladder") — Product Design

- Version: 2.0
- Date: 2026-08-10
- Owner: Rishabh
- Audience: Product Designer
- Companion document: `PRD-engineering.md` (Product Engineering track, running in parallel)
- Status of decisions: **[D#]** = decided; **[Q#]** = open, needs your recommendation back to Rishabh.

**Changelog v2.0:** No vocal input or output anywhere. Audio players, recorders, mic permissions, and AI judging are gone. The learner **writes** Marathi; all app feedback is **scripted** (revealed model answers, diffs, mechanical checklists); the correctness of novel sentences is verified through **available human resources** (a friend, a native speaker, the internet) via a designed hand-off moment. The app is fully offline.

---

## 1. Context and problem

An adult fluent in one language (L1) wants to learn a second language (L2). Today's options fail them three ways:

- Content is unsequenced — advanced concepts arrive before foundations, and the learner can't tell what they need *now*.
- Progress is framed in calendar time ("fluent in 30 days"), which manufactures guilt when life intervenes.
- Mastery is tested by recognition (tap the right word), never by generation — learners "finish" courses unable to construct one sentence they've never seen.

The product is a **ladder of checkpoints, not a timeline**: a fixed sequence of tightly scoped modules, each with ~10 model sentences, their exact translations, and a full deconstruction of the words and grammar that built them. Every module exits through a **generative test**: the learner independently writes a novel "11th sentence" of the same complexity. How long any rung takes belongs entirely to the learner; the sequence belongs to the system.

### Pilot and the one real user

- Language pair: **Hindi (L1) → Marathi (L2)**. Both use Devanagari — the learner reads everything from day one, and text is the entire medium.
- **P1 (persona is a real person):** adult, fluent Hindi speaker, zero Marathi. 20–30 minutes a day, usually evenings. Phone-first. Motivated but busy; has quit language apps before out of streak-guilt and irrelevant content. Will be **typing Marathi on a phone keyboard** — a real skill/friction point the design must respect from onboarding onward.
- Built by one person, for one friend. No accounts, no growth loops, no monetisation. Personal, warm, small.

### Delta learning (shapes the visual language)

Because Hindi and Marathi are close, every word and rule carries one of three tags, and the design must make them instantly distinguishable:

- **free** — transfers straight from Hindi; near-zero attention needed.
- **delta** — genuinely new; this is "the lesson".
- **interference** — Hindi actively misleads here (e.g., Marathi has a third gender Hindi lacks; Hindi कल means yesterday *and* tomorrow, Marathi splits काल/उद्या). These deserve a warning affordance — the only place the UI is allowed to feel loud.

---

## 2. Product invariants (identical list appears in the engineering PRD — do not violate)

1. Progression happens **only** by passing the generative exit test. Never by time, streaks, or passive completion.
2. No calendar framing anywhere: no dates, deadlines, streaks, daily goals, or "X-day plans".
3. Every session biases toward production — the learner constructing Marathi sentences themselves, in writing.
4. **Scripted or nothing:** the app gives feedback only where a deterministic, pre-authored answer or mechanical check exists. It never guesses and never simulates judgment.
5. What the app cannot check — the correctness of a novel sentence — is handed to humans (a friend, a native speaker, the internet), and the app makes that hand-off effortless and honest.
6. A module never exposes vocabulary or grammar beyond its declared bounds plus prerequisites.
7. Rishabh's weekly export-based review audits everything, especially attested exit-test passes.

## 3. Design principles

1. **Checkpoints, not calendars.** Nothing on any screen references time elapsed or remaining. Progress is spatial (position on the ladder), never temporal.
2. **The ladder is visible; the rungs are sealed.** The learner always sees the whole 10-module map — titles and jobs only — but locked module content is genuinely inaccessible. No "peek ahead" that reintroduces the overwhelm the product exists to kill.
3. **Writing is the hero.** On any screen where production is possible, the text input and its check action are the dominant elements. Recognition-style interactions (multiple choice, word-bank tapping) appear nowhere.
4. **The honest machine.** The app never pretends to evaluate what it can't. Where a scripted answer exists, feedback is precise (a diff). Where it doesn't — the 11th sentence — the hand-off to a human is designed as a proud, first-class moment, not a failure state or a shrug.
5. **Calm mastery, anti-Duolingo.** No mascots, confetti, XP, or dopamine loops. One quiet, satisfying moment is permitted: passing a module.
6. **Show the why, one tap away.** Every sentence can open its full deconstruction, but deconstruction never blocks the flow.
7. **Bilingual hierarchy is sacred.** Marathi (target) is always visually primary; Hindi (cue/support) secondary and quieter. English glosses tertiary, on demand.
8. **Failure is information.** Diffs and checklists diagnose; they never judge. Unlimited retries, no red-splash "wrong!" moments. Encourage reading every Marathi sentence aloud in microcopy — the app itself stays silent.

## 4. Information architecture

- **Ladder (home).** The 10-checkpoint map; entry point to everything.
- **Module.** The 10 sentences of the current rung + deconstruction.
- **Practice.** The guided 20–30 min session (Review → Read → Produce).
- **Exit Test.** Two parts: Generate ("the 11th sentence") and Comprehend.
- **Verdict.** Checklist results, hand-off, attestation, pass/fail states.
- Secondary: minimal Settings (quick-insert strip toggle, export/backup), first-run onboarding (≤ 3 screens).

Navigation model: Ladder is home; Module/Practice/Exit are children of the active rung. Bottom nav vs hub-and-spoke — your call. **[Q1]**

## 5. User flows to design (step-by-step)

1. **First run.** Welcome (what this is, who built it for whom — one warm screen) → "You'll be writing Marathi from minute one" + **Devanagari keyboard set-up guide** (any Hindi/Marathi layout works; where to enable it; note on ळ) → land on Ladder with M1 unlocked. No account, no goal-setting, no time-commitment question (Invariant 2).
2. **Daily session (the spine).** Open app → Ladder shows current rung → "Practice" → Review phase (up to 5 cards from earlier modules: Hindi cue → learner writes or mentally constructs → reveal scripted answer + diff → self-mark got-it/missed) → Read phase (read through module sentences, Marathi primary, deconstruction on tap, "read it aloud" nudge in copy) → Produce phase (written cover-and-recall) → session-end summary (counts of things produced; no time stats).
3. **Studying a module.** Ladder → Module → browse 10 sentence cards → expand deconstruction → per-sentence production dots show progress toward the exit test.
4. **Written cover-and-recall (make-or-break interaction #1 — prototype this).** Card shows Hindi cue, Marathi hidden → learner types the Marathi → "check" → **diff view** highlights word-level matches/mismatches (character-level within a mismatched word) → self-mark got-it/missed (exact match pre-selects got-it). Secondary path: "just reveal" for quick mental recall, still requiring a self-mark to count.
5. **Exit test — Generate (make-or-break interaction #2).** Explainer ("Write something new at this level — not one of the 10") → Devanagari input → submit → **instant scripted checklist** appears: New ✓/✗ · Within what you've learned ✓/✗ · Within length ✓/✗ (failures name the offending sentence or unknown words) → all pass → **the hand-off moment**: app presents a pre-written verification request containing the sentence ("क्या यह मराठी वाक्य सही है? — ‹sentence›") with one-tap copy for WhatsApp/a friend, plus a suggested internet-search phrasing → learner returns and **attests**: verified by a friend/native speaker · via internet · by Rishabh → pass registers.
6. **Exit test — Comprehend.** Two Marathi sentences shown as text, one at a time → learner writes the Hindi meaning → submit reveals the scripted model answer → learner self-marks correct/incorrect against it (meaning, not word-for-word) → "1 of 2" progress.
7. **Verdict — pass.** Checklist confirmed + attestation recorded + comprehension self-marked → the one celebratory beat → next rung unlocks on the Ladder (this unlock is the emotional payoff of the whole product — design it with care).
8. **Verdict — mechanical fail.** The failed check is highlighted with its specifics (e.g., "too close to sentence 3", "अजून नहीं सीखा: ‹word›"); retry is one tap; after 3 consecutive fails, deep-links to the flagged rules/sentences in the module viewer.
9. **Backup/audit.** Settings → export file → OS share sheet (how P1 sends progress + all 11th sentences and attestations to Rishabh for the weekly review). Design the "what's in this file" explainer honestly.

## 6. Screen-by-screen requirements

### Ladder (home)

- Must show: 10 rungs with title + one-line job; states locked / unlocked / in-progress / passed; current rung visually dominant; overall position at a glance.
- Must not show: dates, streaks, time estimates, percentages of time.
- States: fresh install (only M1 open), mid-journey, all-complete.

### Module

- Must show: sentence cards (Marathi primary, Hindi cue secondary, English gloss on demand); expandable deconstruction (word rows with free/delta/interference chips, accepted forms, rules used, interference-trap callouts); per-sentence production dots ("each sentence written ×2 opens the exit test" — dots, never a percent bar).
- Interference traps use the warning affordance from §8.

### Practice

- Must show: which phase I'm in (Review / Read / Produce) as soft, skippable chips — never countdown clocks; the current card; the text input + check as hero (§3.3); diff results; got-it / missed self-marks.
- Critical layout constraint: the **on-screen keyboard occupies ~half the viewport** during every production moment. The cue, input, check action, and (after checking) the diff must all work in the remaining space — design production cards keyboard-first, not as an afterthought. **[Q2: pattern for diff appearing above an open keyboard]**

### Exit Test — Generate

- Must show: the constraint in one line; Devanagari input with quick-insert strip; submit; the three-item checklist with pass/fail states and specific failure details; the hand-off card (sentence embedded in a copyable request, copy confirmation, internet-check suggestion); the attestation chooser (3 explicit options — this is a deliberate honesty ritual, give it weight without friction).

### Exit Test — Comprehend

- Must show: the Marathi sentence large and primary; Hindi answer input; post-submit reveal of the model answer laid beside the learner's answer; self-mark controls; "1 of 2" progress.

### Verdict

- Pass: checklist ✓s + attestation method shown back ("verified by your friend") + the unlock moment.
- Fail: failed check highlighted with specifics, retry CTA, revisit deep-links after 3 fails. No shame states.

## 7. Component inventory (design as a small system)

- Sentence card (Marathi/Hindi/gloss hierarchy).
- Deconstruction panel (word rows with tag chips + accepted forms, rules list, trap callout).
- Tag chips: `free` (quiet/neutral), `delta` (the "new" colour — this is the learning), `interference` (amber/warning + icon; the one loud element).
- Devanagari text input (single-line and short multi-line variants) + optional **quick-insert strip** (ळ at minimum; final set with engineering **[Q3]**).
- **Diff card**: word-level match/substitute/insert/delete rendering with character-level highlight inside substituted words. Needs its own colour treatment — do **not** reuse interference amber; corrections and interference are different semantics. **[Q4]**
- Scripted-checklist component (3 checks with pass/fail + detail line).
- Hand-off card (copyable verification request + copy-confirmed state + internet suggestion).
- Attestation chooser (friend / internet / Rishabh).
- Cover-and-recall card (hidden → typed → checked states; "just reveal" secondary).
- Phase chips (Review / Read / Produce).
- Ladder rung (4 states) + unlock animation.
- Per-sentence production dots (·· → ✓✓).
- Self-mark control (got-it / missed).

## 8. Content, tone, and microcopy

- Voice: a patient mentor and a friend — direct, warm, zero corporate. Hindi/Hinglish microcopy welcome wherever it lands more naturally than English.
- The honesty pattern for the hand-off (design's most important copy): the app plainly says what it cannot do and hands over with confidence. Shape: "Grammar मैं नहीं जांच सकता — ये message copy करो और किसी मराठी जानकार से पूछ लो."
- Never use: "streak", "daily goal", "you're behind", "hurry", "days left", "% fluent".
- Failure copy pattern: name what happened + name the fix + invite retry. Example shape: "वाक्य नया नहीं था — ये 10 में से एक है. अपना खुद का बनाकर देखो."
- A recurring gentle nudge in Read/Produce phases: "जो लिखा है, उसे बोलकर भी पढ़ो" — the app encourages the learner's own voice without ever capturing or playing sound.
- Numbers shown are counts of things done (sentences written, rungs passed), never time.

## 9. Visual language

- Typography: Devanagari-first. Recommend **Mukta** or **Noto Sans Devanagari**; verify at real sizes and **inside input fields**: ळ, conjunct clusters, matras above/below, caret behaviour mid-conjunct. Body Devanagari ≥ 18 px equivalent; no italic/oblique Devanagari. Latin pairs quietly. **[Q5: final family + type ramp]**
- Colour: calm base; one accent for `delta`/progress; amber reserved exclusively for `interference`; a separate correction treatment for diffs (Q4); success tone reserved for verdict/unlock. Dark mode: decide late. **[Q6]**
- Motion: minimal and meaningful — the reveal in cover-and-recall, a single unlock animation. Nothing bounces.
- Layout: one-hand phone use; primary actions in thumb zone; every production layout designed with the keyboard open as the default state.

## 10. Accessibility and context of use

- Tap targets ≥ 44 px; input fields generous; quick-insert strip keys comfortably tappable.
- Everything is text — inherently captioned; ensure contrast on tag chips and diff highlights meets WCAG AA.
- Sessions are interruptible: quick pause/exit and resume mid-phase without loss (typed-but-unchecked input should survive a backgrounded app).
- Respect reduced-motion settings.

## 11. Out of scope for design (v1)

- Any audio UI (players, recorders, waveforms, mic permissions). Any AI-feedback states (judging spinners, verdict-from-model cards). Second language pair, multi-user, profiles, social, notification systems, gamification of any kind, tablet/desktop layouts, marketing site.

## 12. Deliverables checklist (these become GitHub issues)

1. Flow diagrams for the 9 flows in §5.
2. Low-fi wireframes: Ladder, Module, Practice (all 3 phases, keyboard-open variants), Exit-Generate (input → checklist → hand-off → attestation), Exit-Comprehend, Verdict (pass + mechanical fail), onboarding incl. keyboard guide.
3. Clickable prototype of the two make-or-break interactions: written cover-and-recall → diff → self-mark, and the full exit-test → hand-off → attestation → unlock sequence.
4. Component specs for §7 with all states.
5. Design tokens: type ramp (Devanagari + Latin), colour semantics (three tag colours + diff correction treatment), spacing, motion durations.
6. Microcopy pass: onboarding + keyboard guide, phase guidance, diff/self-mark moments, checklist failures, the hand-off request template (with engineering, Sync-3), attestation options, verdict pass/fail, export explainer.
7. Recommendations back to Rishabh on **[Q1–Q6]**.

## 13. Open questions for the designer

- **[Q1]** Navigation model: bottom nav vs hub-and-spoke from the Ladder?
- **[Q2]** Best pattern for showing the diff while the keyboard is open (inline swap above input vs collapse keyboard on check)?
- **[Q3]** Quick-insert strip: which characters beyond ळ, and where does it live (above keyboard vs in-card)?
- **[Q4]** Visual treatment for diff corrections that stays clearly distinct from interference amber?
- **[Q5]** Final Devanagari family and type scale after testing real Marathi strings on device, including inside inputs.
- **[Q6]** Dark mode in v1 or later?

## 14. Sync points with the engineering track

- **Sync-1 (end of week 1):** module JSON schema and screen/state inventory freeze — design only to states that exist in engineering's state machines (progression: locked/unlocked/in-progress/exit-available/passed; exit attempt: typing → checks → hand-off → attestation → verdict).
- **Sync-2:** the diff output data shape freezes → final diff-card design.
- **Sync-3:** the verification-request template text + attestation options freeze → hand-off moment and microcopy finalised.

## 15. Glossary

- **Module / checkpoint / rung:** one step of the ladder; ~10 sentences + deconstruction + exit test.
- **The 11th sentence:** the novel, self-constructed, written sentence that exits a module.
- **Cover-and-recall:** Hindi cue shown, Marathi hidden; write first, check against the scripted answer.
- **Delta learning:** teaching only the Hindi→Marathi difference; the free/delta/interference tags.
- **Scripted check:** deterministic feedback from pre-authored answers or mechanical rules — the only feedback the app asserts.
- **Hand-off:** the designed moment where verification of a novel sentence moves to a human resource (friend, native speaker, internet).
- **Attestation:** the learner's explicit record of how the sentence was verified; audited weekly by Rishabh.
