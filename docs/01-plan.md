# rung — Implementation Plan (v3.3)

**Audience:** a junior engineer new to this codebase. Read in this order:
`design/PRD-engineering.md` (v3.3 — canonical), `design/PRD-design.md` (v3.3),
`docs/design-contract.md`, `design/tokens.md`, `design/pwa-checklist.md`, then
this plan. The clickable prototype `design/Rung App v3.3.dc.html` is the visual
and interaction reference of record (its §17/§15 divergence lists tell you what
NOT to copy).

**Precedence:** design/PRD-*.md (v3.3) > this plan > docs/PRD-*.md (v2.0,
historical — kept for context only). Flag conflicts in your PR.

---

## 1. What we're building, in one paragraph

A fully offline, installable mobile PWA that teaches languages as a **ladder of
checkpoints** — three levels × ten modules per **course** (an L1→L2 pair). The
engine is course-agnostic; v1 ships one course, **hi-mr** (Hindi → Marathi).
Each module: ~10 model sentences with deep, tagged deconstruction. The learner
**produces in a physical notebook** — the app contains **no input fields**, no
grading, no checking. Practice is reveal-based (cue → recall → reveal →
colour self-mark). A module exits through a **ritual**: write the novel "11th
sentence" on paper → check it yourself in the real world (the app only shows
guidance) → press-and-hold to confirm → 2 comprehension items with self-marks
and fresh-item retry. Everything is static content + client-side TypeScript;
state lives in localStorage, keyed per course.

## 2. The eight invariants (memorise; identical in both v3.3 PRDs §2)

1. Progression only through the generative exit ritual, learner-confirmed.
2. No calendar framing anywhere.
3. Every session pushes learner production; **the pen belongs to the learner**.
4. **Read-only teaching:** never evaluates, grades, scores, or stores learner writing.
5. Checking is the learner's own activity, fully outside the app.
6. **No input fields.**
7. Module bounds: declared vocabulary/grammar + prerequisites only.
8. Invariants are course-agnostic; **course switching never destroys progress**.

Boundary note: the gentle elapsed tick (numberless, capped, toggleable) is the
only sanctioned time affordance.

## 3. Architecture

See design/PRD-engineering.md §4 for the diagram. Essentials:

- **Course layer:** `content/courses.json` (manifest) → active course →
  that course's `levels.json`, `strings.json`, module files, word index. The
  app shell contains ZERO course-specific strings — all learner-facing
  microcopy ships in the course bundle.
- **Engine** (`src/engine/`): pure TS — progression (levels + modules),
  Leitner scheduler, word-index resolver. No React, no storage, no Date.
- **State v7** (`src/state/`): zustand + persist, localStorage key `rung:state`,
  shape keyed by courseId (PRD §F7 verbatim). Timestamps only via
  `src/state/clock.ts`.
- **Service worker:** precache everything; zero network after first load.

## 4. Stack (decided — do not relitigate)

| Choice | Why |
|---|---|
| Vite + React 18 + TypeScript strict | unchanged |
| react-router (HashRouter) | works on any static host + offline |
| zustand + persist (version 7, migrations v5→v6→v7) | matches state-v7 contract |
| **design/tokens.css** loaded globally; CSS Modules for layout | tokens are the single styling source — no hard-coded hex/px/font names (docs/design-contract.md) |
| vite-plugin-pwa (or ~20-line vanilla SW) | precache-everything per design/pwa-checklist.md |
| vitest + @testing-library | engine is test-first |
| ajv via tsx CLIs in tools/ | schema v5 + strings validation |
| **Mukta + Barlow + Barlow Condensed, self-hosted** [D15] | per tokens.md; subset per course at build |
| lucide-react | the only icon set (tokens.md §4), stroke 1.5 |

Node 22.22.2+ or 24.15+ (jsdom 30's floor, mirrored in `engines.node`; CI runs 24),
npm. No other runtime dependency without an issue first.
There is NO text-input component, NO diff/normalisation engine, NO clipboard
integration — if a ticket seems to need one, re-read Invariants 4–6 and stop.

## 5. Repo layout

```
rung/ (repo name: shidi — GitHub redirects; local dir may keep its name)
├── docs/                     # plan, design-contract, findings; historical v2 PRDs
├── design/                   # DESIGN PACKAGE — read-only, re-copied wholesale from
│                             # Rishabh's tooling; never add or edit files here
├── content/
│   ├── courses.json          # course manifest (id, l1, l2, l1Tag, l2Tag, pairLabel,
│                             #                  scriptMode, dir)
│   └── hi-mr/
│       ├── levels.json       # 3 levels × module lists (+ hasContent flags)
│       ├── strings.json      # ALL hi-mr microcopy (fixed key list)
│       └── modules/L1-M1.json …   # schema v5
├── tools/                    # tsx CLIs: validate, index, strings-check, content-build, generate-prompt
├── public/content/           # GENERATED per-course output (gitignored)
├── src/
│   ├── engine/               # pure TS: progression, leitner, word-index resolver
│   ├── state/                # store (v7, per-course), clock, serialize
│   ├── course/               # courses.json loader, strings access, content loader
│   ├── screens/              # Ladder, ModuleList, SentenceDetail, Practice, Ritual, Comprehension, Verdict, Settings
│   ├── components/           # RungCard, LevelStrip, RevealCard, SelfMark, WhyRow, Tick, HoldToConfirm, …
│   └── styles/               # global.css (imports design/tokens.css), layout modules
└── scripts/verify.sh         # terse harness
```

## 6. Core data contracts

- **Module schema v5** — design/PRD-engineering.md §7: `display` (primary
  string), optional `script` (quiet native line, romanized courses), `cue`
  (L1), `glossEn`, `literal`, deconstruction words
  `{display, cue, tag, forms, note}`, rules, enrichment (variations, mistake,
  usage, mnemonic, sound) full for M1–M3. `schemaVersion: 5`.
- **Course language (#186)** — a manifest row names its pair twice: `l1`/`l2` are NAMES for the
  learner's eye ("Hindi"), `l1Tag`/`l2Tag` are BCP-47 TAGS for the browser (`hi`, `mr`). Both
  validators reject a missing or malformed tag. The app declares the L1 ONCE, on the document
  (`CourseProvider` sets `documentElement.lang`/`dir` when the course resolves and on every
  switch) and marks only the exceptions below it, because `lang` inherits: every L2 surface
  carries `l2Lang(course).display` — `ar-Latn` in a romanized course, since the letters are
  Latin — the quiet native `script` line carries `l2Tag`, and `glossEn` carries `en`. L1 copy
  carries nothing and inherits the document. `src/langLaw.test.tsx` scans `src/` and fails on an
  L2 surface rendered by an element that declares no language.
- **courses.json / strings.json** — §4. strings.json has a FIXED key list
  (cue label, reveal labels, phase nudges, ritual arc copy incl. resource rows
  + hold label, retry copy, ordinal, pending-authoring note, verdict line,
  course-switch toast) — validated at build; missing key = build failure. The
  list is `src/course/stringsKeys.ts`, declared once: the app's `Strings` type
  derives from it and `tools/strings-check.ts` validates against the same array.
  Screens read microcopy with `useStrings()` and nothing else; the shell owns no
  copy, and `src/shellPurity.test.ts` fails on any course script under `src/`.
- **State v7** — §F7 verbatim (localStorage `rung:state`):
  `{ stateVersion: 7, activeCourse, courses: { <id>: { modules, production,
  reviewQueue, sessionCount, studied, session } }, settings }`. The per-course
  `session` snapshot is what makes resume lossless — including across course
  switches.
- Rules: engine pure; the ONLY unlock path is the module-pass action
  (Invariant 1, asserted in tests); counters never decrement; timestamps only
  at the store layer via clock.ts (`passedAt` is the only date in state).

## 7. Devanagari for engineers (rendering primer)

You will render Devanagari, never parse learner input (there is none). What
still matters: graphemes are multi-code-point (मा = म + ा); conjuncts use
virama (क्या = क + ् + य + ा); ळ is common in Marathi; body floor is 18px /
line-height 1.6 in Mukta, no italics (tokens.md §2); NFC-normalise content at
build time; the word-index resolver matches surface forms verbatim from
content (edge cases live in romanized courses: apostrophes/ʾ, hyphens, case).

## 8. Working agreement

1. Pick a ticket: lowest active milestone, no assignee, deps closed → assign
   yourself → branch `issue-<n>-<slug>`.
2. Build EXACTLY the ticket; extras become new issues.
3. Style only via `var(--*)` from design/tokens.css. The prototype is the
   verifier: match it state-for-state where your screen exists in it
   (docs/design-contract.md).
4. Scoped tests while iterating (`npx vitest run <file>`); `scripts/verify.sh`
   before the PR. PR body starts `Fixes #<n>`; squash-merge.
5. Learner-visible tickets: verify acceptance criteria on a phone-sized
   viewport (or the deployed URL) before closing.
6. Every PR keeps the invariant guard true: no time framing, no inputs, no
   grading/storing, no course-specific strings in the shell, no new colors.

## 9. Milestones

P0 content-first → P1 shell → P2 practice → P3 exit ritual → P4 settings +
data → P5 hardening + content scale → P6 course #2 (gated). Exit criteria live
in the milestone descriptions and design/PRD-engineering.md §11. Design
follow-ups run parallel (Rishabh).

## 10. The design package

`design/` is the delivered design system: tokens.css/md, the v3.3 prototype,
PRDs, pwa-checklist, vendored `_ds/`. It is READ-ONLY and gets wiped on
re-copy — engineering notes go in `docs/` (see docs/design-contract.md). The
prototype's divergence lists (eng §17, design §15) name what must NOT be
copied into the product.

## 11. Glossary

- **Course / courseId** — one L1→L2 pair with its own content, strings, progress (`hi-mr` and `en-es` ship; `en-ar` is still a dev fixture).
- **scriptMode** — `native` | `romanized`; romanized courses show romanization primary + quiet script line.
- **Level / seal** — 10 modules per level; a level unlocks when the previous level is fully passed.
- **Staged rung card** — the current rung's single CTA: fresh → studied → exit-ready → pending-authoring [D22].
- **Reveal practice** — cue → recall (head/mouth/paper) → reveal → colour self-mark; **Next hidden until marked** [D11].
- **Exit ritual** — notebook 11th sentence → guidance-only जांचो → press-and-hold ~900ms [D14] → comprehension (fresh-item retry).
- **"Why" resolver** — per-course word index answering "why" on any reveal.
- **Gentle elapsed tick** — 2px numberless fill over ~25min; the only time affordance.
- **strings.json** — per-course microcopy bundle; the shell ships none.
- **P1 (person)** — the one real learner. Distinct from milestone P1.
