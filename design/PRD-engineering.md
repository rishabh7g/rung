# PRD — rung (formerly Shidi / शिडी) — Product Engineering

- Version: 3.3
- Date: 2026-08-11
- Owner: Rishabh
- Audience: Product Engineer
- Companion documents: `PRD-design.md` (v3.3) and the clickable prototype `design/Rung App v3.3.dc.html` (reference for look, feel, and states — see §17 for divergences).
- Status of decisions: **[D#]** = decided; **[P#]** = proposed, awaiting Rishabh; **[Q#]** = open.

**Changelog v3.3:**
- **Multi-course architecture [D19].** A **course** = one L1→L2 pair. The engine (levels, seal rule, reveal practice, ritual, retry, scheduler) is course-agnostic; content, microcopy, and progress are per-course. One active course; switching via a Settings **dropdown**; **switching never erases progress** — state is keyed by courseId. Ship the **seam** in v1 but only ONE course (hi-mr); course #2 is a content project, not an app project.
- **Microcopy moves into the course bundle [D19].** Nudges, ritual copy, cue labels, reveal labels, ordinals ("11th"/"5th sentence"), retry copy — all authored per course in that course's L1. The app shell contains no learner-facing course-specific strings.
- **Speech-first script policy [D20].** Per-course `scriptMode`: `native` (shared script, e.g. Devanagari for hi-mr) or `romanized` (romanization is the primary string everywhere; native script carried as an optional quiet secondary line). Word entries, variations, mistakes, and comprehension items in romanized courses are authored romanized.
- **Onboarding removed [D21].** No first-run screens; the app opens on the Ladder.
- **Rung-card stages [D22].** The current rung's CTA is staged off a per-course `studied` flag: not studied → "Start with the module"; studied → Practice primary; production complete → Exit ritual primary; unlocked-but-unauthored → pending note. Never gates the Practice tab.
- **Brand [P1]:** शिडी → **rung** (ratified 2026-08-11). Affects display strings, PWA manifest name/icons, export filename prefix.
- Landed from v3.2 deliverables: comprehension **retry with fresh items** is implemented behaviour; **Next hidden until self-mark** everywhere; Settings = Course · Practice (tick toggle) · Storage · Backup + privacy line.

**Changelog v3.2 (retained):** translation feature removed [D18]; zero text inputs; zero network calls after first load; जांचो guidance-only.

**Changelog v3.1/v3.0 (retained):** levels engine + manifest; frozen IA; Sentence Detail order; gated colour self-marks; "why" word-index resolver; elapsed tick; press-and-hold confirmation; read-only teaching; no audio, grading, storage of learner writing, or runtime AI.

---

## 1. Context and problem

(Unchanged thesis — see design PRD §1.) A ladder of checkpoints, not a timeline: fixed module sequence, ~10 model sentences each, full deconstruction, generative exit. v3.3 generalises the engine across **courses** while shipping only the pilot course.

### Pilot instantiation

- Primary course: **hi-mr** (Hindi → Marathi), `scriptMode: native` (shared Devanagari).
- Sample courses proving the seam (NOT shippable content): **en-es** (English → Spanish, `native` Latin), **en-ar** (English → Arabic, `romanized`).
- Single known user P1; notebook-based production; no accounts, no scale, no monetisation. The app plays no audio, records nothing, grades nothing, accepts no text input. **[D1]**

### Delta learning

free / delta / interference tags — **pair-specific by definition**; each course authors its own tag set through its own generation prompt and native gate.

## 2. Product invariants (identical list in the design PRD — do not violate)

1. Progression only through the generative exit ritual, learner-confirmed.
2. No calendar framing anywhere.
3. Every session pushes learner production; the pen belongs to the learner.
4. Read-only teaching; never evaluates, grades, scores, or stores learner writing.
5. Checking is the learner's own activity, fully outside the app; no checking service, translation, or shortcut.
6. **No input fields.**
7. Module bounds: declared vocabulary/grammar + prerequisites only.
8. *(new)* Invariants are course-agnostic. **Course switching must never destroy or degrade progress in any course.**

**Boundary note:** the gentle elapsed tick (F4) is the only sanctioned time affordance.

## 3. Scope

### In scope (v1)

- Course-aware engine: course manifest, per-course state, Settings dropdown switcher, per-course microcopy loading, `scriptMode` rendering.
- **hi-mr Level 1 content only** ships. en-es / en-ar stay dev fixtures behind the seam (do not ship sample content to P1's build unless Rishabh opts in).
- Ladder (level strip, seal rule, staged rung card), Module list, Sentence Detail, reveal practice loop, exit ritual (guidance जांचो, press-and-hold, comprehension + real retry), Settings, export/import.
- Installable, fully offline, mobile-first PWA.

### Out of scope (v1) — reject politely

Any translation/checking feature [D18]; text input; audio; runtime AI or network calls; backend/accounts/sync; onboarding flows [D21]; gamification; social; notifications; authoring courses beyond hi-mr L1 (engine support yes, content no); RTL layout mirroring (spec first — design §12.5).

## 4. System overview

```
+---------------------------- PWA (React) ----------------------------+
|  Bottom nav: Ladder · Practice · Settings                           |
|  Children of active rung: Module list · Sentence Detail · Ritual    |
|  Practice runs immersive (nav hidden; pause ✕ always available)     |
|                                                                     |
|  COURSE LAYER: active course id → content bundle + strings + state  |
|  Progression engine (levels+modules, per course) · Review scheduler |
|  Word-index resolver (per course module)                            |
|  Local persistence: localStorage — state v6, keyed by courseId      |
|  Service worker: full offline after first load                      |
+----------------------+----------------------------------------------+
                       |
                       v
        +----------------------------------+
        |  Static content bundles           |
        |  /content/courses.json            |  ← course manifest
        |  /content/<courseId>/levels.json  |
        |  /content/<courseId>/strings.json |  ← ALL course microcopy
        |  /content/<courseId>/L*-M*.json   |
        |  /content/<courseId>/index/*      |
        +----------------------------------+
```

- **courses.json:** `[{id:'hi-mr', l1:'Hindi', l2:'Marathi', pairLabel, scriptMode:'native'|'romanized', dir:'ltr'}]`. The Settings dropdown renders from this — adding a language is adding a folder + manifest row, zero app-shell changes.
- **strings.json per course:** cue label, reveal labels, nudges (review/produce/read/comprehend), ritual arc copy (write/check/confirm + resource rows + captions + hold label), retry copy, ordinal, pending-authoring note, verdict line. The shell has no course-specific strings.
- **No network calls after first load; no keys; no outbound links carrying learner content.** [D18]

## 5. Content plan

**Level names [Q1 pending]:** L1 "Foundations" · L2 "Conversations" · L3 "Fluency" — shared across courses unless a course overrides in its levels.json.

### hi-mr (ships)
Level 1 module list unchanged from v3.2 (M1 Who I am … M10 Connected talk); L2/L3 draft lists unchanged, pending [Q1].

### en-es, en-ar (dev fixtures)
M1 sample sets exist in the prototype (4 sentences each) demonstrating schema coverage incl. `scriptMode: romanized` (en-ar: `ismī Rohān` primary + اسمي روهان secondary). Real module lists and content are a future content project gated on hi-mr L1 results.

Per-module budget unchanged: 10 sentences, ≤ 25 new words, comprehension pool ≥ 6, enrichment full for M1–M3.

## 6. Content pipeline (build-time)

1. **Generate** per module (parameterised by course: L1, L2, scriptMode, bounds, cumulative inventory).
2. **Verify — non-negotiable native gate, per course.** Unverified modules never reach a learner build. [D4]
3. **Index** per module: every L2 surface form (romanized form for romanized courses) → word entry. Validator: every comprehension-pool token must resolve.
4. **Manifest:** emit courses.json + per-course levels.json (+ which modules have content — drives the pending-authoring rung state).
5. **Strings:** validate strings.json completeness against a fixed key list (missing key = build failure).
6. **Package:** schema validation; `scriptMode: romanized` requires `display` (romanized) on every sentence/word/variation/mistake/pool item; `script` (native) optional but recommended.

## 7. Data model — schema v5 (Sync-1 freeze)

Module schema v4 + these additions:

```jsonc
// sentence (and pool item / variation / mistake analogously)
{
  "display": "ismī Rohān",        // primary string; = native text in native-script courses
  "script": "اسمي روهان",         // optional native-script line (romanized courses)
  "cue": "My name is Rohan",      // L1 cue (was "hi")
  "glossEn": "…", "literal": "…",
  "deconstruction": { "words": [ { "display": "ismī", "cue": "my name", "tag": "delta", "forms": "…", "note": "…" } ], "rules": [0,1] }
}
```

Course manifest and strings.json as in §4. `schemaVersion: 5`. Field rules: `display/cue/glossEn/deconstruction` required; `script` required only when scriptMode is romanized AND the native line is wanted; enrichment rules unchanged.

## 8. Feature specifications

### F0 — Course layer (new)

- R: Load courses.json at boot; active course from state (`activeCourse`, default first manifest entry). All content, strings, and progress resolve through the active course.
- R: **Settings → COURSE dropdown** (native `<select>`, ≥ 44 px target) listing manifest courses; status line beneath ("Level 1 · 2 of 10 passed · M3 in progress" / "next rung pending authoring"); explanatory note that switching erases nothing.
- R: Switch = swap active course + reset **transient session UI only**; per-course persistent state (including in-progress session snapshot, F4) is untouched. Confirmation toast names both courses.
- AC: Switch hi-mr → en-ar → hi-mr restores ladder position, production counters, review queue, and resumable session exactly. Adding a course folder + manifest row surfaces it in the dropdown with no shell changes.

### F1 — Progression engine (level-aware, per course)

- R: Module states `locked → unlocked → in_progress → exit_available → passed`; `exit_available` = all sentences self-marked got-it ≥ 2×. Level status derived, never stored. Nothing unlocks a module except a passed ritual — assert in code.
- R: Per-course `studied` flag (set on first module open of the current rung) drives the **staged rung card [D22]**: `!studied` → "Start with the module" CTA; `studied && !exit_available` → Practice primary + "revisit the module" ghost; `exit_available` → Exit-ritual primary + secondary Practice/Module; `unlocked && !hasContent` → pending-authoring note (from strings.json) + "practice earlier rungs" ghost.
- AC: Fresh course → only M1 unlocked, fresh-rung stage. Stage transitions fire on module open, production completion, and unlock. No date/streak fields.

### F2 — Module list

Unchanged from v3.2 (expand/collapse, dots, scroll restore) + romanized courses render `display` primary, `cue` secondary, `script` as a quiet third line.

### F3 — Sentence Detail

Section order frozen [D10] (hero → gloss → words → rules → trap → sound → variations → mistake → usage → mnemonic). Hero adds the quiet `script` line in romanized courses. Prev/next within the module; sections vanish when empty.

### F4 — Practice loop

- R: Phases Review → Read → Produce as soft chips; courses with an empty review queue start at Read and toast honestly if the Review chip is tapped.
- R: Self-mark control [D11]: green/red fills; **Next hidden (not disabled) until marked** — identical control in Review, Produce, and Comprehension.
- R: "Why" on every reveal via the course word index; Produce cards offer "open full".
- R: Gentle elapsed tick: 2 px, numberless, fills once over ~25 min, toggleable (Settings); default ON pending [Q3].
- R: Immersive mode + lossless resume; the session snapshot is stored **per course**.
- AC: Next never appears pre-mark; interrupted session resumes exactly after app kill AND after switching courses away and back.

### F5 — Exit ritual

- R: Generate arc from strings.json: (1) constraint; (2) **जांचो/Check guidance-only** — copy + dashed plate with two static resource rows; zero interactive elements, zero links; (3) press-and-hold ~900 ms [D14], release-resets, ✓ → Comprehension. The learner's sentence never enters the app.
- R: Comprehend: 2 random pool items, no repeats within a test; reveal scripted answer; gated self-mark; **any "Not quite" → retry interstitial → fresh random items** (exclude already-used until pool exhausts, then recycle); unlimited, no shame framing, no failure counters.
- R: Pass → module `passed` → next rung (or next level) unlocks with the single beat (reduced-motion safe).
- AC: No tap-through past the hold; retry never repeats items within a test; pool of 6 supports ≥ 3 fresh attempts before recycling.

### F6 — Settings

- R: Sections in order: **COURSE** (dropdown, F0) · **PRACTICE** (tick toggle) · **STORAGE** (per-course content rows + one progress row; honesty line) · **Backup** (export/import, F7) · privacy line ("after install this app never talks to the internet; only the export file you share ever leaves the device").
- AC: No checking/translation controls exist; storage renders with `navigator.storage.estimate()` + graceful fallback.

### F7 — Persistence, export, import — state v6

```jsonc
{
  "stateVersion": 6,
  "activeCourse": "hi-mr",
  "courses": {
    "hi-mr": {
      "modules": { "L1-M1": { "status": "passed", "passedAt": "<iso>" } },
      "production": { "L1-M3-S01": 2 },
      "reviewQueue": [ { "sentenceId": "L1-M1-S03", "box": 2, "dueInSessions": 1 } ],
      "sessionCount": 14, "studied": { "L1-M3": true },
      "session": { "phase": "produce", "idx": 4, "queue": ["…"] }   // lossless resume
    },
    "en-ar": { "modules": {}, "production": {}, "reviewQueue": [], "sessionCount": 0, "studied": {}, "session": null }
  },
  "settings": { "elapsedTickEnabled": true }
}
```

- R: Migration v5 → v6 wraps existing state under `courses['hi-mr']`. Export = one JSON via share sheet, **all courses**; import restores fully. No learner-authored text exists anywhere.
- AC: Export→import reproduces every course's ladder, queues, counters, and active course.

## 9. Validation model

Unchanged: the app neither validates nor helps validate. Per-course native gate carries content quality; Rishabh's weekly notebook review over WhatsApp remains the human backstop for hi-mr.

## 10. Non-functional requirements

- Offline after first load; zero runtime network.
- First load ≤ 2 s mid-range Android over 4G; text-only content.
- **Design tokens:** build styling exclusively against `design/tokens.css` (reference: `design/tokens.md`) — base Industry layer + rung semantic layer; no hard-coded hex/px/font names in components.
- **Fonts [D15]:** bundle Mukta (Devanagari incl. ळ, conjuncts, matras at ≥ 18 px / 1.6) + Barlow / Barlow Condensed; subset per course at build time. If en-ar ships: bundle a Naskh face for the quiet script lines (system fallback acceptable for the dev fixture only); ʾ/ḥ/ī diacritics of the romanization must render in Barlow — verify glyph coverage, fall back to a diacritic-complete face if needed.
- Browser targets: Chrome Android + Safari iOS current-1.
- **Brand [P1]:** app name "rung" in PWA manifest, header wordmark + rails mark (SVG in repo), ratified — keep the name in one config constant.

## 11. Delivery phases

- **P0 — Content first, zero code.** hi-mr L1-M1 + M2 enriched + native-verified; courses.json + hi-mr levels.json + strings.json drafted.
- **P1 — Shell.** PWA scaffold, service worker, course layer (manifest + strings + content loader), bottom nav, Ladder (level strip, seals, staged rung card), Module list, Detail. Exit: P1 browses L1-M1 in airplane mode.
- **P2 — Practice.** Session machine (per-course snapshot), Leitner scheduler, reveal cards, gated hidden-Next marks, "why" resolver, tick, counters. Exit: full session interrupted + resumed.
- **P3 — Exit ritual.** Arc + hold + comprehension with retry; unlock beat. Exit: P1 passes L1-M1 for real.
- **P4 — Settings + data.** Course dropdown (single course present — dropdown still ships), tick toggle, storage, export/import, state v6 + migration. Exit: export→import across devices.
- **P5 — Hardening + scale content.** Font subsetting; hi-mr L1-M3…M10 authored + verified; L2/L3 lists confirmed [Q1].
- **P6 — (only if greenlit) Course #2.** Content project: generate → native gate → strings.json in the new L1 → RTL spec if Arabic.

## 12. Suggested issue seeds

- Epic Course layer: courses.json loader; strings.json contract + validator; per-course state + v6 migration; Settings dropdown + status line; switch flow + toast.
- Epic Content pipeline: schema v5 (+display/script/cue); per-course index emitter; strings completeness check; native gate per course.
- Epic App shell: Ladder (level strip, seals, markers, staged rung card incl. pending state); Module list; Detail (+script line).
- Epic Practice: session machine per course; scheduler; gated hidden-Next self-marks; "why"; tick; pause/resume incl. cross-course.
- Epic Exit ritual: guidance जांचो from strings; hold control; comprehension + fresh-item retry; unlock beat.
- Epic Settings & data: storage estimate; export/import all courses; privacy line; brand constant.

## 13. Risks

- **Honor system, zero assistance** (unchanged): hold-weight + concrete जांचो resources + notebook habit + Rishabh's weekly review.
- **Course scope creep — now the top risk.** The seam invites authoring sprees. Mitigation: en-es/en-ar stay dev fixtures; P6 gated on hi-mr L1 completion by P1.
- **Romanization quality** (romanized courses): inconsistent schemes break the word index. Mitigation: one scheme per course declared in the manifest; validator enforces index resolution.
- **Content is the only voice:** the per-course native gate is contractual.

## 14. Open questions

- **[Q1 → Rishabh + native speaker]** L2/L3 module lists + level names (per course).
- **[Q2 → engineer]** `navigator.storage.estimate()` on P1's device; fallback presentation.
- **[Q3 → engineer]** Word-index edge cases for romanized text (apostrophes/ʾ, hyphens in al-, case).
- **[Q4]** ~~Brand sign-off~~ **closed** — rung ratified [P1]; proceed with PWA manifest, icons, export filenames.

## 15. Sync points with the design track

- **Sync-1:** schema v5 + state v6 + screen/state inventory freeze (incl. staged rung card + course switcher states).
- **Sync-2:** ~~Sentence Detail order~~ closed [D10].
- **Sync-3:** copy freeze — per-course strings.json key list + both language sets + notebook-invitation line placement.

## 16. Glossary

- **Course / courseId:** one L1→L2 pair (`hi-mr`, `en-es`, `en-ar`) with its own content, strings, and progress subtree.
- **scriptMode:** `native` | `romanized` — which string is primary (`display`) and whether a quiet `script` line renders.
- **strings.json:** the per-course microcopy bundle; the shell carries no course-specific copy.
- **Staged rung card:** current-rung CTA driven by `studied` / `exit_available` / content availability.
- **Level, module, 11th sentence, exit ritual, word index, gentle elapsed tick:** unchanged from v3.2.

## 17. Prototype divergences — do NOT copy into the product

- en-es / en-ar content is **sample fixture data** (4 sentences, pool of 2) — real courses need full budgets (10 sentences, pool ≥ 6) through the native gate.
- The prototype resets transient session state on course switch; the product persists per-course session snapshots (F0/F7).
- The prototype's course switcher lives in a single file with hardcoded course objects; the product loads courses.json + strings.json (F0).
- Storage figures are illustrative; compute them (F6).
