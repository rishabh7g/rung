# rung

A ladder of checkpoints for learning a language — not a timeline. First pair:
**Hindi (L1) → Marathi (L2)**. A fully offline, installable, mobile-first PWA:
no backend, no accounts, no audio, no runtime AI. Built by one person, for one
friend.

*rung* (formerly *Shidi*, शिडी — Marathi for "ladder") names the core metaphor: a
fixed sequence of 10 modules ("rungs"), each exited only by **writing** a novel
"11th sentence" of the same complexity, verified by a human.

## Start here

| Doc | What it is |
|---|---|
| [`docs/PRD-engineering.md`](docs/PRD-engineering.md) | Canonical engineering PRD — features F1–F9, phases P0–P5 |
| [`docs/PRD-design.md`](docs/PRD-design.md) | Canonical design PRD — flows, screens, components, tone |
| [`docs/01-plan.md`](docs/01-plan.md) | Implementation plan: stack, layout, data contracts, Devanagari primer. **Read before your first ticket.** |
| [`design/`](design/) | Design mockups + tokens (added by Rishabh as milestone D completes) |
| [`docs/design-contract.md`](docs/design-contract.md) | How to build UI against the design package — tokens, prototype fidelity, mobile rules |

## Development

**Prerequisites:** Node **22.22.2+ or 24.15+** (`engines.node`; CI runs 24) and npm. No
other runtime, no backend, no env vars. The floor is jsdom 30's, not ours — on Node 20
every test file fails to import before it asserts anything.

```bash
npm install
npm run dev     # http://localhost:5173
```

| Script | What it does |
|---|---|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | Typecheck (`tsc -b`) then production build into `dist/` |
| `npm run preview` | Serve the built `dist/` locally |
| `npm run typecheck` | TypeScript only — strict + `noUncheckedIndexedAccess` |
| `npm run test` | Vitest (jsdom + Testing Library), single run |
| `npm run lint` | ESLint (flat config), Prettier-compatible |
| `npm run format` | Prettier write across the source tree |
| `npm run content:validate` | Schema v5 + cross-checks over `content/*/modules/*.json` |
| `npm run content:build` | Builds `public/content/` from `content/` — strict by default |

### `scripts/verify.sh` — one line, or one failure

The gate before every PR (docs/01-plan.md §8). Run it from anywhere; it finds the repo root
itself:

```bash
scripts/verify.sh          # everything
scripts/verify.sh --fast   # everything except BUILD
```

A green run says exactly one thing, and exits 0:

```
TYPES ok | LINT ok | TEST 142/142 ok | CONTENT ok | BUILD ok
```

| Step | Exit | Command |
|---|---|---|
| TYPES | 10 | `npm run typecheck` |
| LINT | 20 | `npm run lint`, then `npx prettier --check .` — **either one failing is exit 20** |
| TEST | 30 | `npm run test`; the segment carries vitest's own count |
| CONTENT | 40 | `npm run content:build` — schema validation, word index and the strings check in one |
| BUILD | 50 | `npx vite build`; omitted entirely with `--fast` |

Steps run in that order and the **first failure stops the run**, so a red run names exactly one
thing: `FAIL <STEP> (exit <code>)`, the last 20 lines of that step's log, and the path to the
whole log. Nothing else is printed — no progress chatter to scroll past, on either colour.

```
FAIL TYPES (exit 10)

src/App.tsx(9,9): error TS2322: Type 'number' is not assignable to type 'string'.

log: /home/rrish/dev/shidi/.verify/types.log
```

Every step writes `.verify/<step>.log` (gitignored), and **the directory is wiped at the start of
every run** — so a missing log is proof that step never ran: the failure above leaves `types.log`
and nothing else.

Two things worth knowing before you read a result:

- **BUILD is `vite build`, not `npm run build`.** The npm script's `prebuild` would re-run tsc and
  `content:build`, so a content failure would resurface as `FAIL BUILD` long after CONTENT passed.
  The harness runs each thing once, under its own name.
- **CONTENT judges the exit code, never the output.** A strict build correctly ships nothing today
  (see the gate table below) and exits 0 — that is `CONTENT ok`, not an empty-output failure.

The harness has its own tests (`scripts/verify.test.ts`): they run it in a tmp dir against fake
`npm`/`npx` shims, because a test that really shelled out to `npm run test` would run vitest inside
vitest.

**CI runs this exact command** — `.github/workflows/ci.yml` is `npm ci` then `bash scripts/verify.sh`
on every pull request and every push to `main`, and it is the only job. There is deliberately no
separate lint/test/build pipeline to keep in sync: what fails on your machine fails in CI, with the
same one-line output. When a run is red, the `.verify/` logs are attached to it as the
`verify-logs` artifact, so the failing step's whole log is one download away.

### The content gate — why `dev` and `build` see different content

`content:build` runs automatically as `predev` and `prebuild`, and it is the thing that
decides what a build is allowed to contain (PRD-engineering §3, §6.2, [D4]):

| | modules shipped |
|---|---|
| `npm run build` (`prebuild`, **strict — no flags**) | only `verified: true` **and** not `fixture: true`, from non-fixture courses |
| `npm run dev` (`predev`, `--with-unverified --with-fixtures`) | everything that validates |

**Strict is production truth: a learner build can never contain unverified or sample
content.** Every module in `content/` is `verified: false` today (the native gate is a
human's signature, not a flag to flip), so **`npm run build` currently ships an empty
ladder — that is correct, not a bug.** `npm run dev` relaxes the gate so the app has
hi-mr L1-M1..M2 and the two fixture courses to render.

The two relaxations are independent (`--with-unverified`, `--with-fixtures`), and either
one makes the output a **dev build**, which says so twice over: the run prints
`CONTENT ⚠ DEV BUILD — includes … content; NOT shippable` as its first and last line, and
the emitted `public/content/courses.json` carries `"devBuild": true` plus a `devBuildNote`.
A strict build has neither key, so an artefact can never quietly pass for a learner build —
check `devBuild` before you trust a bundle.

`public/content/` is generated and gitignored: clean-recreated on every run, module files
copied verbatim, `levels.json` re-emitted with `hasContent` **derived from what actually
shipped** (the authored flag is never trusted), and `courses.json` filtered to courses that
shipped at least one module.

### The word index — and the rule it enforces

Every shipped module also gets `public/content/<courseId>/index/<moduleId>.json`: each L2
surface form (a word's `display` plus every entry of its `forms` — romanized for romanized
courses, never the `script` line) mapped to the word entry that **teaches** it,
`{moduleId, sentenceId, wordIdx}`. It is **cumulative** — L1-M2's index is L1-M1's plus what
M2 adds, because a module never re-teaches what an earlier one taught — and **first
occurrence wins**, so the pointer names where the learner met the word. The run notes each
one: `index L1-M2: 47 surfaces`. This is what the "why" resolver reads (PRD §6.3).

Two consequences worth knowing before you author content:

- **A comprehension-pool item may only use taught words.** Every whitespace-split token of
  every pool item must resolve in that module's cumulative index, or the build fails naming
  the course, module, item id and token. Sentences' own `variations` and `mistake` lines are
  deliberately outside the rule — a mistake is wrong L2 *by design*.
- **`normalizeSurface` is the one definition of "same word"** — `src/engine/surface.ts`, NFC
  + edge punctuation stripped (`आहात?` → `आहात`), case and apostrophes untouched (#116). The
  emitter imports it; the runtime resolver will too. Never copy it: a second copy is a word
  that silently has no "why".

### The strings contract — 26 keys, no fallback copy

Every course ships one `strings.json` carrying **all** the microcopy the shell renders, because
the shell has none of its own (PRD §4). So the build validates it against the canonical key list
in `src/course/stringsKeys.ts` — the only list in the repo, which the app's `Strings` type derives
from — and a bundle that fails takes the whole build down with it (PRD §6.5): a missing key is a
blank screen for the learner, not an English word.

The list lives in the **course layer** and the build imports it, not the other way round: the
runtime is the side that must not break, and a `tools/` module the app bundle imports is how a
second copy of the list gets born. `src/course/stringsKeys.test.ts` fails if either table is ever
declared twice.

`tools/strings-check.ts` runs per course, flattens the nested file onto dot-paths
(`ritual.check.copy`), and reports four things, always naming course **and** key:

- **missing key** — the 26 canonical paths must all be there;
- **empty or non-string value** — a present-but-blank key is a missing key with extra steps;
- **unknown key** — the typo tripwire; `ritual.check.plate` would otherwise sit quietly beside a
  missing `plateLabel`;
- **placeholder mismatch** — a value carries exactly its canonical `{placeholders}`
  (`{sentenceCount} {maxWords} {ordinal} {n} {nextModule} {to} {from}`), so a translation cannot
  drop `{ordinal}` or invent `{name}`.

Adding a key is one edit to `src/course/stringsKeys.ts` plus a line in each of the three bundles —
in that order, because the build will tell you exactly which course you forgot.

### The course layer — what boots first

The app knows a manifest, not a language pair (PRD-engineering §8 F0). Boot order is
**manifest → provider → screens**, and no screen mounts until there is an active course:

- `src/course/manifest.ts` — `loadCourses()` fetches `${BASE_URL}content/courses.json` once
  (the cache is the promise, so concurrent callers share one request) and parses the **emitted
  envelope**: `{courses: [...]}`, plus `devBuild: true` on a relaxed build. The authored
  `content/courses.json` keeps the PRD §4 bare-array shape — only the build output is wrapped,
  and `src/` never reads the authored tree. Anything wrong — offline, 404, not JSON, wrong
  shape, **no courses** — throws a `ManifestError`, which is the tripwire, not an edge case: a
  strict build ships zero courses today, so `npm run build` really does render the
  content-error screen.
- `src/course/CourseProvider.tsx` — resolves the active course and exposes
  `{course, courses, devBuild}` through `useCourse()`. It owns the loading and error screens
  (`BootScreens.tsx`), so everything below it already has a course.
- `src/course/strings.ts` — `loadStrings(courseId)` fetches that course's bundle (once per
  course; the cache is the promise again), reads the canonical dot-paths out of the nested file
  and hands screens `useStrings()`. Access is **non-optional** — `strings['retry.title']` is a
  `string` — because the build refuses to ship an incomplete bundle, so there is no fallback copy
  to write. The provider loads it as part of boot: a screen that has mounted has its words.
  `interpolate(value, {…})` fills `{placeholders}`; a name with no value is left verbatim and
  warned rather than blanked, because a silent gap reads as finished copy.
- `src/course/content.ts` — the rest of the course's files: `loadLevels(courseId)`,
  `loadModule(courseId, moduleId)`, `loadIndex(courseId, moduleId)`, and the hooks
  `useLevels()` / `useModule(id)` / `useIndex(id)` that read them for the active course and
  return `{data, loading, error}`. Same rules as the two loaders above — the cache is the
  promise, keyed by URL (so course scoping is free and a failure is never cached), `BASE_URL`
  read per call — and the same tripwire posture: `schemaVersion: 5`, the expected arrays are
  arrays, and the file's own ids match what was asked for, because a wrong-file-served is
  exactly what a build cannot catch. Everything throws `ContentError {url, reason}`, which the
  screens hand to the same `ContentErrorScreen` the provider uses.
- `src/course/types.ts` — schema v5 as TypeScript: `ModuleContent`, `Levels`, `WordIndex`.
  Derived from `content/schema/module.schema.json` and the four modules that exist, not from a
  sketch — including the enrichment fields (`literal`, `trap`, `sound`, `variations`, `mistake`,
  `usage`, `register`, `mnemonic`), module-level `rules` with `deconstruction.rules` as indices
  into them, `complexity`, `exitTest` and `fixture`. `types.test.ts` reads every authored module
  and ladder off disk and fails naming any key no type declares, so the mirror cannot rot.
- `resolveActiveCourse(courses, persistedId?)` is a **pure function**: the persisted course when
  it is still in the manifest, else the first entry with a `console.warn`. It never writes, so a
  fallback does not erase the stored id (Invariant 8). The id it reads is `state.activeCourse`
  (#82) — the provider subscribes to the store, so `setActiveCourse` re-boots the layer with the
  new course's strings and content, which is what the P4 switch flow (#106) will hang off.

Adding a course stays "a folder plus a manifest row": nothing in the shell names a course id.

### Shell purity — the guard that keeps that true

`src/shellPurity.test.ts` scans every shipped file under `src/` for a course's script — Devanagari
(hi-mr) or Arabic (en-ar) — and fails naming file and line. Copy that got hardcoded is copy no
course can translate, so the rule is mechanical rather than a review habit, and it counts comments
too: a doc comment is where a pasted string waits before it becomes code. Script examples belong
in tests, which the scan skips along with `src/test/` fixtures.

English shell furniture (the boot error copy, later a Settings header) stays permitted — the guard
is about course scripts, not about English. The exemption list in that file is **empty**; the one
entry anyone anticipates is the `/dev/type` font page (#85), and adding it will be a conscious
line in that ticket's diff.

### The state layer — one document, keyed by course

`src/state/` is zustand + persist over a single `localStorage` document, `rung:state`, whose shape
is PRD-engineering §8 F7 **verbatim**: `{stateVersion: 6, activeCourse, courses: {<courseId>:
{modules, production, reviewQueue, sessionCount, studied, session}}, settings}`. Everything a
learner earns hangs under `courses[<courseId>]`, which is what makes **course switching never
destroy progress** (Invariant 8): a switch moves a pointer, and a course whose content is missing
from a build keeps its subtree, its ladder and its stored id until the folder comes back.

Two things are not in the shape and never will be: **anything the learner wrote** (Invariant 4 —
the v2 state had an `attempts` array; v6 has nothing of the kind) and **any calendar**. The one
date in the whole document is `passedAt` on a passed module.

- `src/state/types.ts` — the shape, plus `STATE_VERSION`. Nothing else declares it.
- `src/state/clock.ts` — `Clock = () => string` and `systemClock`, **the only place in the app
  that constructs a date**. Actions that need a stamp take a `Clock` and default to it, so the
  engine stays pure and testable without fake timers. `clock.test.ts` scans every shipped file
  under `src/` and fails naming the file and line that reached for the wall clock — the same
  mechanical guard as shell purity, for the same reason.
- `src/state/store.ts` — `useAppStore`, persisted with `version: 6` and a wired `migrate` stub
  (its doc comment is the contract for the real v5 → v6 wrap, which ships with export/import in
  P4). It is deliberately **thin**: `ensureCourse` (idempotent — an existing course returns the
  same object, so no write can blank a ladder), `setActiveCourse` (a bare pointer swap; the
  learner-facing switch flow with its toast is #106), `setSetting`, and `_reset()` for dev and
  tests. Progression (#83), production and the review queue (#95) and the session snapshot (#96)
  bring their own actions; the store holds no domain rules.

`store.test.ts` pins the initial shape against the literal the PRD prints, so drift is a red test
rather than a discovery; the rest of it proves per-course isolation, a round trip through storage,
and that a v5 payload reaches `migrate`.

Two rules the scaffold bakes in, before you write a component:

- **Tokens only.** `src/main.tsx` imports `design/tokens.css` *in place* — `design/`
  is read-only and re-copied wholesale, so importing it directly means token updates
  land with zero copy step. Style with `var(--*)`; no hard-coded hex, px or font names
  anywhere in `src/` (`docs/design-contract.md`).
- **One brand constant.** `src/brand.ts` exports `BRAND` — the only place the product
  name lives. Page title, manifest and export filenames all read from it.
- **Content has a contract.** `content/schema/module.schema.json` (JSON Schema draft
  2020-12) is the frozen shape of a module; `tools/validate.ts` adds the checks a schema
  cannot express (filename ↔ id, the 10-sentence / pool ≥ 6 budget and its `fixture: true`
  relaxation, full enrichment for M1–M3, rule-index ranges). Run `npm run content:validate`
  before opening any content PR — one line per file, then `CONTENT <n>/<m> ok`.
- **Content ships through a gate.** `tools/content-build.ts` runs that validator over every
  module and emits `public/content/` — see the gate table above. Never import from `content/`
  in `src/`: the app reads `public/content/` (via `fetch`), which is the only tree the gate
  has approved.

## How work happens

- Every change is a **GitHub issue**; one PR per issue; PR title references the
  issue; **squash-merge**; `main` is always deployable.
- Issues live in milestones **P0–P5** (+ **Design follow-ups**, Rishabh). Labels:
  one `epic:*` + `type:*` + `phase:*` per issue (see design/github-issues-checklist.md).
- **Picking your next ticket:** open issues in the lowest unfinished milestone
  → no assignee → every issue linked under "Depends on" is closed → assign
  yourself, branch, go.
- The **7 product invariants** (identical in both PRDs, §2) are contractual.
  Politely reject scope creep: no audio, no runtime AI, no backend, no
  gamification, no calendar framing.

## Quick facts

- Stack: Vite + React + TypeScript PWA; all state in `localStorage`; content is
  static, native-speaker-verified JSON. Details and rationale: `docs/01-plan.md`.
- The app only ever gives deterministic, pre-authored feedback (Invariant 4).
  Novel sentences are verified by humans via a designed copy-paste hand-off.
