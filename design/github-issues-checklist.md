# rung — GitHub issues checklist & guidelines (for the program manager)

How to turn the v3.3 design package into a clean issue tracker, and how to audit issues already filed. Sources of truth: `design/PRD-design.md` + `design/PRD-engineering.md` (v3.3), the prototype `design/Rung App v3.3.dc.html`, `design/tokens.css|md`, `design/pwa-checklist.md`.

## 1. Ground rules for every issue

1. **One issue = one requirement (R) or one acceptance criterion cluster.** Engineering PRD §8 is written R/AC so each converts 1:1 — don't bundle two Rs.
2. **Title format:** `[Epic] Verb + object` — e.g. `[Practice] Hide Next until a self-mark exists`. No vague titles ("fix practice").
3. **Every issue body carries:**
   - PRD reference (doc + section + decision id, e.g. "eng §8 F4, [D11]")
   - Prototype pointer — the screen/state in `Rung App v3.3.dc.html` that shows the intended behaviour (e.g. "Practice → reveal → self-mark")
   - Acceptance criteria copied verbatim from the PRD (checkboxes)
   - Tokens note where visual: "style only via `design/tokens.css`"
4. **Labels:** one epic label (below) + `type:` (feature / content / infra / design-followup) + `phase:` (P0–P6). Milestones = delivery phases P0–P6 (eng §11).
5. **Invariant guard on every issue:** a checklist line "No violation of invariants 1–8 (no time framing, no inputs, no grading/storing, course-agnostic)". Anything touching copy also gets "no banned words (streak, daily goal, days left, % fluent)".
6. **Design-fidelity bar:** UI issues close only when they match the prototype state-for-state (the verifier is the prototype, not screenshots of it).
7. **Blocked-by discipline:** content issues blocked by the native gate; brand-asset issues were blocked by [P1] — now ratified, unblock them.

## 2. Epics (issue seeds live in eng PRD §12 — verify each exists)

- [ ] **Course layer** — courses.json loader · strings.json contract + validator · per-course state + v6 migration · Settings dropdown + status line · switch flow + toast ("nothing erased" promise).
- [ ] **Content pipeline** — schema v5 (display/script/cue) · per-course word-index emitter · strings completeness check · native gate per course · comprehension-token validator rule.
- [ ] **App shell** — PWA scaffold + service worker (per `design/pwa-checklist.md`) · bottom nav + immersive mode · Ladder: level strip, seal states, rung markers, **staged rung card (4 stages incl. pending-authoring)** · Module list (expand/collapse, scroll restore) · Sentence Detail (frozen order [D10], quiet script line).
- [ ] **Practice** — session state machine (per-course snapshot, lossless resume) · Leitner scheduler · reveal cards + gated colour self-marks (**Next hidden, not disabled** [D11]) · "why" resolver · gentle elapsed tick + toggle · counters.
- [ ] **Exit ritual** — guidance-only जांचो from strings.json (zero interactive elements — AC!) · press-and-hold ~900ms [D14] · comprehension + fresh-item retry · unlock beat (reduced-motion safe).
- [ ] **Settings & data** — course dropdown (16px font — iOS zoom) · tick toggle · storage estimate + fallback · export/import all courses · privacy line · `navigator.storage.persist()`.
- [ ] **Brand & assets** ([P1] ratified) — app icons from the rails mark (incl. maskable) · iOS splash set · PWA manifest name "rung" · name kept in one config constant.
- [ ] **Content (hi-mr L1)** — one issue per module M1–M10: authored → enriched (M1–M3 full) → indexed → **native-verified** (gate is contractual).

## 3. Design follow-ups that must exist as issues (design PRD §12/§13)

- [ ] Notebook invitation's new home (recommend: one-time line on first Practice hub) — Sync-3 [Q6]
- [ ] Level-strip edge states: level complete · next-level unseal · all-three done [Q4 recommendation attached]
- [ ] Formal component specs: staged rung card, course dropdown, retry interstitial, brand mark
- [ ] Elapsed-tick default decision [Q3 — design recommends ON]
- [ ] L2/L3 module lists + level names confirmation [Q1 — Rishabh + native speaker]
- [ ] RTL mirroring spec (only if an Arabic course is greenlit)
- [ ] Microcopy freeze at Sync-3 (Hindi set + English mirror set, strings.json key list)

## 4. Auditing issues already filed — pass every one through this filter

- [ ] Maps to a PRD R/AC or a §12 seed? If not: close as out-of-scope, or PRD-first (no spec, no issue).
- [ ] Still true in v3.3? Kill or rewrite anything referencing: the translation helper / Google Translate / API keys [D18 cut], onboarding screens [D21 cut], "Shidi" as product name (now rung), single-course state (now course-keyed v6), Next *disabled* (now hidden), comprehension proceed-on-fail (now real retry).
- [ ] Scope creep check: any issue authoring en-es / en-ar content, Levels 2–3 content, audio, AI, accounts, notifications → close politely (eng §3 out-of-scope; sample courses are dev fixtures).
- [ ] Right size? An issue that spans two epics gets split; a one-line CSS tweak folds into its parent.
- [ ] Has phase milestone + epic label + prototype pointer + verbatim ACs? If missing, fix the body before work starts.
- [ ] Nothing starts before its gate: P0 exits only when Rishabh runs L1-M1 with P1 over WhatsApp; dev issues stay blocked until design sign-off is recorded.

## 5. Issue body template (paste into .github/ISSUE_TEMPLATE)

```md
### What
One sentence, from the PRD.

### Spec
- PRD: eng §8 F5 [D14]
- Prototype: design/Rung App v3.3.dc.html → Exit ritual → step 3
- Tokens: design/tokens.css (no hard-coded values)

### Acceptance criteria
- [ ] (verbatim from PRD)
- [ ] Invariants 1–8 hold; no banned copy
- [ ] Matches prototype state-for-state (incl. reduced-motion)

### Phase / Epic
P3 · Exit ritual
```
