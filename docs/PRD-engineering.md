# PRD — rung (formerly Shidi / शिडी, "ladder") — Product Engineering

- Version: 2.0
- Date: 2026-08-10
- Owner: Rishabh
- Audience: Product Engineer
- Companion document: `PRD-design.md` (Product Designer track, running in parallel)
- Status of decisions: **[D#]** = decided; **[Q#]** = open, needs your input back to Rishabh.

**Changelog v2.0:** No vocal input or output anywhere in the product. Audio playback, TTS, recording, STT, and the runtime LLM judge are all removed. Every piece of app-side feedback is **scripted and deterministic** (pre-authored answers, diffs, mechanical checks). What the app cannot check — the correctness of a novel sentence — is verified by the learner through **available human resources** (a friend, a native speaker, the internet), with the app making that hand-off effortless. The app is now a fully static, offline PWA with no backend and no runtime AI.

---

## 1. Context and problem

An adult fluent in one language (L1) wants to learn a second language (L2). When they turn to the internet, YouTube, or language apps, three failures repeat:

- Content arrives unsequenced — advanced concepts land before foundations, and the learner cannot tell what they need *now* from what is noise at their level.
- Progress is framed in calendar time ("fluent in 30 days"), which sells speed, sets false expectations, and manufactures guilt when life intervenes.
- Mastery is tested by recognition (tap the right word), never by generation, so learners "complete" courses without being able to construct a sentence they have never seen.

What this user needs is a **ladder of checkpoints, not a timeline**: a fixed sequence of tightly scoped modules, each containing ~10 model sentences of bounded complexity, their exact L2 translations, and a full deconstruction of which words and grammar rules built each sentence. The exit test for every module is **generative**: independently write a novel "11th sentence" of the same complexity, without a mentor. Time-to-complete belongs entirely to the learner. The sequence belongs to the system. The checkpoints never move.

### Pilot instantiation

- Language pair: **Hindi (L1) → Marathi (L2)**.
- Single known user: one adult learner ("P1"), fluent Hindi speaker, zero Marathi, ~20–30 minutes per day, phone-first.
- Goal scope: the ability to **construct and understand Marathi sentences**, taught and drilled entirely through text. Both languages share Devanagari, so the learner reads everything from day one. The app never records or plays audio; microcopy encourages reading each sentence aloud, but speaking stays outside the app's responsibility. **[D1]**
- This is a personal project built for one friend. No accounts, no scale, no monetisation. Simplicity beats robustness at every trade-off.

### The delta-learning advantage (core content insight)

Hindi→Marathi is one of the closest practical language pairs. Every piece of content is tagged into three buckets:

- **free** — transfers directly from Hindi (script, SOV order, postpositional logic, large shared vocabulary). Spend near-zero time here.
- **delta** — genuinely new (verb conjugation patterns, the आहे copula system, divergent everyday vocabulary such as लड़का → मुलगा).
- **interference** — where Hindi actively misleads and must be drilled hardest (Marathi's third gender/neuter, e.g. Hindi पानी masc. vs Marathi पाणी neuter; Hindi कल covering both days vs Marathi काल/उद्या).

---

## 2. Product invariants (identical list appears in the design PRD — do not violate)

1. Progression happens **only** by passing the generative exit test. Never by time, streaks, or passive completion.
2. No calendar framing anywhere: no dates, deadlines, streaks, daily goals, or "X-day plans".
3. Every session biases toward production — the learner constructing Marathi sentences themselves, in writing.
4. **Scripted or nothing:** the app gives feedback only where a deterministic, pre-authored answer or mechanical check exists. It never guesses and never simulates judgment.
5. What the app cannot check — the correctness of a novel sentence — is handed to humans (a friend, a native speaker, the internet), and the app makes that hand-off effortless and honest.
6. A module never exposes vocabulary or grammar beyond its declared bounds plus its prerequisites.
7. Rishabh's weekly export-based review audits everything, especially attested exit-test passes.

---

## 3. Scope

### In scope (v1)

- 10-module Hindi→Marathi ladder (content plan in §5).
- Module viewer, daily practice loop, written cover-and-recall with scripted diff, dual exit test (generate + comprehend), external-verification hand-off, progression engine, local persistence, export/import, audit list.
- Installable, fully offline, mobile-first PWA.

### Out of scope (v1) — reject politely if it creeps in

- Any audio: playback, recording, TTS, STT.
- Any runtime AI: LLM judging, grammar checking, auto-evaluation of novel sentences.
- Backend, server, database, accounts, auth, multi-user, cloud sync.
- Custom keyboards or IMEs (rely on the system keyboard; see §8 F5).
- A second language pair; gamification of any kind; social features; notifications.

---

## 4. System overview

```
+---------------------------- PWA (React) ----------------------------+
|                                                                     |
|  Ladder view   Module view   Practice loop   Exit test   Verdict    |
|                                                                     |
|  Progression engine (state machine)  ·  Review-queue scheduler      |
|  Scripted-check engine: normalise · diff · novelty · scope · bounds |
|  Local persistence: localStorage (state + attempts)                 |
|  Service worker: full offline after first load                      |
+---------------------------------------------------------------------+
                          |
                          v
              +------------------------+
              |  Static content bundle |
              |  /content/M*.json      |
              |  /content/inventory/*  |
              |  (pre-built, native-   |
              |   verified, no audio)  |
              +------------------------+
```

- **Frontend:** React PWA (Vite). Mobile-first. Installable. **Zero network dependency after first load** — there are no runtime API calls of any kind. **[D2]**
- **Content:** static JSON produced by a build-time pipeline (§6) on Rishabh's machine. An LLM may assist *authoring* there, but nothing AI-generated ships without the native-speaker gate, and no AI runs in the learner's app.
- **Persistence:** all state and attempt history in `localStorage` (no blobs exist anymore, so IndexedDB is unnecessary); explicit JSON export/import for backup and for the weekly audit (§8 F8–F9).
- **Devanagari input:** system keyboard only. The app normalises input for all comparisons (§8 F4) and offers a small optional quick-insert strip for characters uncommon on Hindi keyboard layouts (ळ and friends).

---

## 5. Content plan — the ladder

Ten modules, one communicative job each. Each module declares complexity bounds so "same complexity" in the exit test is objective, not vibes.

- **M1 — Who I am.** Identity and likes. Patterns: मी …, माझं नाव … आहे, मला … आवडतं/आवडते/आवडतो.
- **M2 — First exchange.** Greetings, wellbeing, yes/no questions with का.
- **M3 — Needs and wants.** मला … हवंय / नको.
- **M4 — My day.** Present habitual + time words (रोज, सकाळी, संध्याकाळी).
- **M5 — Yesterday.** Past tense basics. Gender agreement lives here — the single largest Hindi-interference zone; expect the richest `interferenceTraps` data.
- **M6 — Tomorrow.** Future and plans.
- **M7 — Where things are.** Locations and postpositions.
- **M8 — Numbers and shopping.** Prices, quantities, transactional turns.
- **M9 — Feelings and opinions.** because/so connectors (कारण, म्हणून).
- **M10 — Connected talk.** 2–3 sentence written turns; short exchanges.

Per-module content budget: 10 model sentences (3–5 words each in M1–M3, cap rises gradually), ≤ 25 new words, and a pre-authored comprehension pool of ≥ 6 Marathi sentences **each with a scripted Hindi model answer**.

---

## 6. Content pipeline (build-time, not runtime)

1. **Generate.** One parameterised prompt per module. Input: module job, complexity bounds, allowed grammar, cumulative word inventory from prior modules. Output: the full module JSON (schema in §7) — sentences, translations, tagged deconstruction with accepted word forms, interference traps, comprehension pool with model answers.
2. **Verify — non-negotiable gate.** A native Marathi speaker reviews every module before it ships: correctness, naturalness, register, and especially gender agreement and verb conjugation — exactly where P1 cannot detect errors. Since scripted answers are now the app's *only* source of truth, this gate carries even more weight than in v1. Track status in the JSON (`"verified": true`, `"verifiedBy"`, `"verifiedAt"`); unverified modules must be excluded from the learner build. **[D3]**
3. **Derive inventories.** The validator emits `inventory/M{n}.json` per module: the cumulative set of all accepted tokens (every listed word form from M1..Mn). This powers the scope check (§8 F6) with zero runtime cleverness.
4. **Package.** Validate JSON against schema; a failing validation or missing model answer blocks the build.

Deliverable: a small Node CLI (`npm run content:generate`, `content:validate`) that Rishabh can run himself.

---

## 7. Data model — module schema (source of truth; freeze with designer at Sync-1)

```jsonc
{
  "schemaVersion": 2,
  "id": "M1",
  "title": "Who I am",
  "job": "Introduce yourself and state your likes",
  "prerequisites": [],
  "verified": true,
  "verifiedBy": "<native speaker>",
  "verifiedAt": "2026-08-01",
  "complexity": {
    "maxWordsPerSentence": 5,
    "allowedTenses": ["simple_present"],
    "allowedPatterns": ["S+V", "S+O+V", "मला + N + आवड-"],
    "newWordCap": 25
  },
  "sentences": [
    {
      "id": "M1-S01",
      "hi": "मेरा नाम ___ है",
      "mr": "माझं नाव ___ आहे",
      "glossEn": "My name is ___",
      "deconstruction": {
        "words": [
          { "mr": "माझं", "hi": "मेरा", "tag": "delta",
            "forms": ["माझा", "माझी", "माझं"],
            "note": "Possessive agrees with the possessed noun's gender; नाव is neuter, so माझं (not माझा/माझी)." },
          { "mr": "नाव", "hi": "नाम", "tag": "free", "forms": ["नाव"], "note": "Near-identical cognate." },
          { "mr": "आहे", "hi": "है", "tag": "delta", "forms": ["आहे", "आहेस", "आहात"],
            "note": "Copula आहे; conjugates by person and number." }
        ],
        "rules": [
          { "id": "R1", "text": "Sentence order is Subject–Object–Verb, same as Hindi.", "tag": "free" },
          { "id": "R2", "text": "Possessives agree with the gender of the thing possessed.", "tag": "interference" }
        ],
        "interferenceTraps": [
          "Hindi मेरा never becomes neuter; Marathi has a third gender, so neuter nouns take माझं."
        ]
      }
    }
    // × 10
  ],
  "comprehensionPool": [
    { "id": "M1-C01", "mr": "तुला संगीत आवडतं का?",
      "answerHi": "क्या तुम्हें संगीत पसंद है? / तुम्हें संगीत अच्छा लगता है क्या?" }
    // ≥ 6 items, native-verified, drawn only from module material, each with a scripted Hindi model answer
  ],
  "exitTest": { "generateCount": 1, "comprehendCount": 2 }
}
```

Notes: `forms` lists every accepted surface form of a word (inflections/conjugations taught so far) — the scope check matches against these verbatim. All Marathi in this document is **illustrative only** and must pass the native-speaker gate before shipping.

---

## 8. Feature specifications

Each feature lists requirements (R) and acceptance criteria (AC), written to convert 1:1 into GitHub issues.

### F1 — Progression engine

- R: Ladder state machine per module: `locked → unlocked → in_progress → exit_available → passed`. `exit_available` requires each of the module's 10 sentences to have been produced in written cover-and-recall (F3) with a "got it" self-mark at least twice across any sessions.
- R: Exactly one module `in_progress` at a time; passing module N unlocks N+1; all earlier modules stay open for review.
- R: No mechanism anywhere may unlock a module except a passed exit test (Invariant 1). Assert this in code, not just UX.
- AC: Fresh install → only M1 unlocked. Simulated pass of M1 → M2 unlocked, M3 locked. No date/streak fields exist anywhere in state.

### F2 — Module viewer

- R: Renders the 10 sentences: Hindi cue, Marathi target, English gloss on demand, per-word deconstruction, rule list, interference traps visually distinct (designer owns treatment; you own the data attributes).
- R: Tag data (`free`/`delta`/`interference`) exposed per word and per rule; accepted `forms` visible inside the word row.
- R: Fully offline.
- AC: Airplane mode → M1 fully browsable.

### F3 — Practice loop (the 20–30 min session)

- R: Three phases with soft guidance, learner can skip/extend (phase chips guide, never gate): **Review → Read → Produce.**
- R: **Review:** scheduler serves up to 5 due items from past modules as Hindi cues; learner writes (or mentally constructs) the Marathi, taps reveal, sees the scripted answer plus diff (F4), self-marks got-it / missed. Leitner boxes 1–3; box 1 due next session, box 2 in ~3 sessions, box 3 in ~7. Session-count based, never calendar-date based (Invariant 2). Missed → box 1.
- R: **Read:** guided read-through of the module's sentences — Marathi primary, Hindi cue toggleable, deconstruction one tap away. Microcopy nudges reading aloud; the app neither plays nor records anything.
- R: **Produce:** written cover-and-recall. Hindi cue shown, Marathi hidden; learner types the Marathi and taps check → scripted diff against the model answer → self-mark. A secondary "just reveal" action exists for quick mental recall but still requires a self-mark to count. Each got-it increments that sentence's production counter (feeds F1's `exit_available`).
- AC: A full session touches all three phases; production counters persist; review queue orders strictly by due-ness then module recency; exact-match answers pre-select "got it" (learner can override).

### F4 — Scripted diff + normalisation engine (replaces all v1 speech machinery)

- R: Normalisation (shared by diff, novelty, and scope checks): Unicode NFC; strip danda/punctuation; collapse whitespace; configurable equivalences for common variance (anusvāra vs explicit nasal, e.g. आवडतं/आवडतम् class issues, chandrabindu variants). Equivalence table is a config file — expect tuning. **[Q1]**
- R: Word-level diff of learner input vs model answer via LCS alignment, emitting ops `match / substitute / insert / delete`; for substitutions, character-level highlight within the word pair. Output is a data structure the UI renders (shape frozen with designer at Sync-2).
- R: Deterministic, offline, pure functions with a unit-test suite of at least 30 Devanagari cases (matras, conjuncts, ळ, zero-width joiners).
- AC: Identical strings after normalisation → single `match` op; a one-matra error highlights only that character; ZWJ/ZWNJ differences do not produce false mismatches.

### F5 — Devanagari input support

- R: Standard text fields using the system keyboard; no custom IME. All comparisons run through F4 normalisation so Hindi-layout vs Marathi-layout differences don't cause false fails.
- R: Optional quick-insert strip above input fields for characters weak on common Hindi layouts — at minimum ळ; final set from the designer. **[Q2]**
- R: Onboarding includes a keyboard set-up guide (Gboard/system Marathi or any Devanagari layout).
- AC: A sentence typed on a Hindi Gboard layout and the same sentence from a Marathi layout normalise to equal strings; the strip inserts at the cursor position.

### F6 — Exit test: Generate ("the 11th sentence")

- Flow: prompt ("Write a new sentence at this module's level — not one of the 10") → learner types → **instant scripted checks** → checklist result → **external verification hand-off** → attestation → verdict.
- R: The three mechanical checks, all offline and deterministic:
  - **Novelty:** normalised Levenshtein similarity vs each of the 10 model sentences; similarity ≥ 0.85 with any → fail with "too close to sentence M1-S0x". Threshold is config. **[Q3]**
  - **Scope:** every token must appear in the cumulative inventory (`inventory/M{n}.json`, all accepted forms). Unknown tokens are listed by name. Known limitation, stated honestly in-app: a wrong inflection that happens to match a listed form will pass this check — that is precisely what human verification exists for.
  - **Bounds:** token count ≤ `maxWordsPerSentence`.
- R: All checks pass → the verification step. The app generates a **copyable, pre-formatted verification request** containing the sentence, e.g. "क्या यह मराठी वाक्य सही है? — ‹sentence›" for pasting to a friend/native speaker on any messenger, plus a suggested search phrasing for internet self-checking. One-tap copy.
- R: The learner then **attests** how it was verified — `friend/native speaker`, `internet`, or `Rishabh` — before the pass registers. Attestation (method + timestamp + the sentence + check results) is persisted and pinned for audit (F9). No attestation, no pass. Honor system by design; the audit is the backstop.
- R: Unlimited retries. After 3 consecutive mechanical failures, surface the flagged rules/unknown words and deep-link into the module viewer.
- AC: A sentence copied verbatim from the module fails novelty with the correct message; a sentence containing an untaught word fails scope naming that word; a passing sentence cannot reach `passed` without an attestation record.

### F7 — Exit test: Comprehend

- R: Show 2 random items from the module's pre-authored `comprehensionPool` as **Marathi text** (never live-generated). No repeats within one test.
- R: Learner writes the meaning in Hindi → submit reveals the scripted `answerHi` model answer → learner self-marks correct / incorrect against it (meaning-equivalence, not word-for-word — the model answer may show 1–2 phrasings). Both correct → comprehend passes. Generate + Comprehend both passed → module passed.
- AC: Pool items never repeat within a test; the model answer is revealed only after submission; self-marks are persisted per attempt.

### F8 — Persistence, export, import

- R: All state in `localStorage`, versioned with a migration stub. No IndexedDB (no blobs exist).
- R: Export = single JSON (state + full attempt history including 11th sentences, check results, self-marks, and attestations) via the OS share sheet. Import restores fully. This file is also the P1→Rishabh weekly audit channel.

```jsonc
{
  "stateVersion": 2,
  "currentModule": "M2",
  "modules": { "M1": { "status": "passed", "attempts": 2, "passedAt": "<iso>" } },
  "production": { "M1-S01": 3 },
  "reviewQueue": [ { "sentenceId": "M1-S03", "box": 2, "dueInSessions": 1 } ],
  "sessionCount": 14,
  "attempts": [
    { "module": "M1", "type": "generate", "sentence": "…",
      "checks": { "novel": true, "scope": true, "bounds": true },
      "attestation": { "method": "friend", "at": "<iso>" }, "result": "passed" }
  ],
  "settings": { "quickInsertEnabled": true }
}
```

- AC: Export on device A → import on device B reproduces ladder position, queue, counters, and full attempt history exactly.

### F9 — Audit support (the human safety net)

- R: The weekly human review (Rishabh + occasionally the native speaker) audits attested passes and comprehension self-marks. Ship the minimum that enables it: an in-app read-only "attempt review" list (sortable by module, showing sentence, checks, attestation method) + everything present in the F8 export.
- AC: From one exported file, a reviewer can see every 11th sentence, its mechanical-check results, and how it was verified.

---

## 9. Validation model (replaces the v1 judge)

Three layers, honestly separated:

1. **Scripted checks (the app):** diffs against pre-authored answers; novelty, scope, and bounds on novel sentences; revealed model answers for comprehension. Deterministic, offline, and the only feedback the app ever asserts. (Invariant 4.)
2. **External human verification (the world):** grammatical correctness of the 11th sentence is confirmed by a friend, a native speaker, or the learner's own internet check. The app's job is to make this hand-off one tap (copyable request) and to record the attestation. (Invariant 5.)
3. **Weekly audit (Rishabh):** the export file surfaces every attested pass for spot-checking; a consistent checker (ideally the same native speaker who gates content) is encouraged.

No AI runs at runtime. There is nothing to prompt, no keys to protect, no proxy to host.

---

## 10. Non-functional requirements

- Offline: 100% of functionality works with no network after first load (service worker precaches app + content).
- Performance: first load ≤ 2 s on mid-range Android over 4G; content bundle is text-only and tiny.
- Privacy: nothing ever leaves the device except the explicit export the learner shares themselves. One-line in-app notice.
- Fonts: bundle a Devanagari family with full Marathi coverage — **Mukta** or **Noto Sans Devanagari** — verified for ळ, conjuncts, and matras at small sizes, in both display and *input* contexts. Designer owns final choice; you own bundling/subsetting.
- Browser targets: Chrome Android + Safari iOS current-1. The riskiest platform detail is now keyboard/IME behaviour in text inputs, not media APIs. **[Q4: P1's exact device + keyboard app?]**

---

## 11. Delivery phases (each phase = one GitHub milestone)

- **P0 — Content first, zero code.** M1 + M2 JSON handwritten, native-verified. Exit: Rishabh runs M1 with P1 manually over WhatsApp (sentences + deconstruction as text; exit test verified by Rishabh directly). *Nothing else starts until P0 ships — it exists to break the format cheaply.*
- **P1 — Shell.** PWA scaffold, content loader, service worker, Ladder + Module viewer. Exit: P1 studies M1 in the app in airplane mode.
- **P2 — Practice loop.** Session phases, Leitner scheduler, written cover-and-recall, normalisation + diff engine with test suite, production counters. Exit: one full 25-min session end-to-end.
- **P3 — Exit tests.** Mechanical checks, verification-request generator, attestation flow, comprehension flow, verdict states, unlock. Exit: P1 passes M1 in-app for real, verified by a friend.
- **P4 — Persistence + audit.** Export/import, attempt pinning, audit list screen. Exit: one weekly audit performed from a single exported file.
- **P5 — Hardening + scale content.** Font subsetting, input edge cases, equivalence-table tuning, M3–M10 through the pipeline with native verification.

## 12. Suggested issue seeds (epics → children)

- Epic: Content pipeline — schema v2 + validator; generation prompt; inventory derivation; verification-status gate.
- Epic: App shell — Vite PWA scaffold; service worker/offline; content loader; Ladder view; Module viewer.
- Epic: Text engine — Devanagari normaliser + equivalence config; LCS word diff + char highlight; unit-test suite; quick-insert strip.
- Epic: Practice — session state machine; Leitner scheduler; cover-and-recall (type/check/diff/self-mark); production counters.
- Epic: Exit tests — novelty/scope/bounds checks; checklist UI states; verification-request generator; attestation capture; comprehend flow; verdict + unlock.
- Epic: Data — state schema v2 + migration; export/import; audit list screen.

## 13. Risks

- **Honor-system attestation** (learner marks "verified" without truly checking) → errors fossilise. Mitigation: one-tap verification request makes honesty cheaper than shortcutting; attestation is explicit and named; weekly audit reviews every pass; warm, honest microcopy (designer owns wording).
- **No expert in the loop at runtime** → the native-verified scripted content must carry the teaching load. Mitigation: the §6 gate is contractual; encourage one consistent human checker for 11th sentences.
- **Devanagari typing friction** slows P1 down or causes false diff mismatches. Mitigation: onboarding keyboard guide, quick-insert strip, normalisation equivalences tuned on real input (P2).
- **Scope-check blind spot** (wrong inflection matching a listed form). Mitigation: stated honestly in-app; exactly what external verification covers; audit catches patterns.
- Scope creep toward audio/AI "just for this one feature". Mitigation: §3 out-of-scope list is contractual.

## 14. Open questions for the engineer to answer back

- **[Q1]** Final normalisation equivalence set after testing real typed input (anusvāra variants, ZWJ/ZWNJ, common Hindi-keyboard substitutions)?
- **[Q2]** Feasibility/placement of the quick-insert strip across Android/iOS inputs (any focus/blur landmines)?
- **[Q3]** Starting novelty-similarity threshold, validated against plausible learner sentences for M1–M3?
- **[Q4]** P1's exact device/OS/keyboard app, and any input quirks found?

## 15. Sync points with the design track

- **Sync-1 (end of week 1):** freeze module JSON schema (§7) and the screen/state inventory — designer designs only to states that exist in the state machines (F1 progression; F6 exit attempt: typing → checks → hand-off → attestation → verdict).
- **Sync-2:** freeze the diff output data shape (F4) → designer's diff-card treatment.
- **Sync-3:** freeze verification-request template text + attestation options (F6) → designer's hand-off moment and microcopy.

## 16. Glossary

- **Module / checkpoint:** one rung of the ladder; ~10 sentences + deconstruction + exit test.
- **The 11th sentence:** the novel, self-constructed, written sentence that exits a module.
- **Delta learning:** teaching only the Hindi→Marathi difference; `free`/`delta`/`interference` tags.
- **Scripted check:** deterministic feedback from pre-authored answers or mechanical rules — the only feedback the app asserts.
- **Attestation:** the learner's explicit record of how a novel sentence was verified (friend / internet / Rishabh).
- **Hand-off:** the one-tap copyable request that moves verification to a human resource.
