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
| [`docs/04-font-notes.md`](docs/04-font-notes.md) | What bundling Mukta + Barlow proved: the specimen, glyph coverage, shipped font bytes (#85) |

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

### The strings contract — 39 keys, no fallback copy

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

- **missing key** — the 39 canonical paths must all be there;
- **empty or non-string value** — a present-but-blank key is a missing key with extra steps;
- **unknown key** — the typo tripwire; `ritual.check.plate` would otherwise sit quietly beside a
  missing `plateLabel`;
- **placeholder mismatch** — a value carries exactly its canonical `{placeholders}`
  (`{sentenceCount} {maxWords} {ordinal} {n} {nextModule} {to} {from} {level} {remaining}
  {total}`), so a translation cannot
  drop `{ordinal}` or invent `{name}`.

Adding a key is one edit to `src/course/stringsKeys.ts` plus a line in each of the three bundles —
in that order, because the build will tell you exactly which course you forgot. The list grew that
way four times: five keys the frozen screens forced (PR #120), three the Ladder forced (#86 —
`ladder.pendingLine`, `ladder.ownership`, `ladder.sealedToast`), seven the staged rung card forced
(#87 — `rungCard.startModule`, `.freshNote`, `.practice`, `.revisitModule`, `.exitRitual`,
`.module`, `.practiceEarlier`: a label for every control across the four [D22] stages) and three
the module list forced (#88 — `module.helper`, `module.openFull`, `module.trapNote`). All thirteen
are **draft values pending the Sync-3 freeze** (#71). The alternative each time was a
learner-facing line hardcoded in the shell, which is the one thing this list exists to prevent.

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
  P4). It stays **thin, and free of rules**: `ensureCourse` (idempotent — an existing course
  returns the same object, so no write can blank a ladder), `setActiveCourse` (a bare pointer swap;
  the learner-facing switch flow with its toast is #106), `setSetting`, `setLadder` /`markStudied` /
  `passRitual` (progression, below — every rule they obey is derived in the engine), and `_reset()`
  for dev and tests. Production and the review queue (#95) and the session snapshot (#96) bring
  their own actions.

`store.test.ts` pins the initial shape against the literal the PRD prints, so drift is a red test
rather than a discovery; the rest of it proves per-course isolation, a round trip through storage,
and that a v5 payload reaches `migrate`.

### The progression engine — every ladder truth, derived

`src/engine/progression.ts` (pure TypeScript: no React, no storage, no clock) answers the four
questions the Ladder asks, and stores none of the answers — a stored level status is a second source
of truth waiting to disagree with the modules it summarises (PRD-engineering §8 F1: "level status
derived, never stored"):

| | |
|---|---|
| `deriveStatuses(input)` | every module by status — `locked` · `unlocked` · `in_progress` · `exit_available` · `passed` |
| `levelSealed(input, level)` | the **seal rule** (PRD-design §5): a level unlocks only when *every* module of the previous level is passed |
| `currentRungId(input)` | the first non-passed rung of the first unsealed, incomplete level — `null` on a finished ladder |
| `rungStage(input, id)` | the staged rung card [D22]: `!hasContent` → `pending`, `!studied` → `fresh`, `exitAvailable` → `exit_ready`, else `studied` |

`ladderFromLevels(levels)` turns a course's `levels.json` into the engine's ladder; the two live
facts arrive as **injected predicates** — `studied(id)` (the per-course flag) and `exitAvailable(id)`
(every sentence produced ≥ 2×, whose real implementation lands with the production counters in #95;
call sites pass `() => false` until then, which is what "no counters yet" honestly means).
`progressionInput(state, courseId)` in the store assembles one from what a course actually holds, and
the screens derive from the same input the store guards with.

Sealing counts a rung whose module has not been authored yet — hi-mr ships 2 of L1's 10 today, so L2
stays sealed until the other 8 exist and are passed. That is the rule working: there is nothing to
climb through a rung with no module.

**One unlock path (Invariant 1).** `passRitual(courseId, moduleId, clock?)` is the only action in the
app that writes `modules`. It throws unless the module *is* that course's current rung — a rung
further up, a module already passed, a sealed level, or a course whose ladder the store has not been
handed all refuse and write nothing — and it stamps `passedAt` from the injected `Clock`.
`markStudied` marks, and cannot unlock: reading every module in the ladder leaves every status
exactly where it was.

`src/state/unlockPath.test.ts` is that promise's mechanical half, in three parts: it slices every
action out of `store.ts` **by name** and fails if more than one contains a write to `modules`; it
*calls* every action against a course with a passed rung and fails if any but `passRitual` changes
the map (the call table is asserted to cover the store's whole action surface, so a new action
cannot skip the check by being new); and it scans every shipped file for a `setState` call, because
an action list is not a gate if a screen can write past it.

### The app shell — one frame, three headers, one flag

`src/shell/` is the chrome every screen renders inside (#84; PRD-design §4 [D8, D21]), and
`src/screens/` is the eight screens themselves — stubs today, each naming the ticket that builds
it. The IA is the whole route table, and the table is data (`src/shell/routes.tsx`): `App` builds
the `<Routes>` from it and `AppShell` matches the location against it, so a screen the router
knows about and the chrome does not cannot happen.

| | |
|---|---|
| `/` | Ladder (#86) — home, first run, and where an unknown route lands |
| `/module/:id` · `/sentence/:id` · `/ritual` · `/comprehension` · `/verdict` | children of the active rung: **back header** to the Ladder |
| `/practice` · `/settings` | the other two tabs: **brand header** |

**HashRouter, not BrowserRouter.** The product is a static, zero-backend, installable PWA — a
deep link under a history router needs a server rewrite and there is no server to ask.
`#/module/L1-M1` survives a refresh and an offline cold start.

**Immersion is one boolean, and it lives in a context** (`src/shell/immersive.tsx`), never in the
store: `src/state/` is the persisted document whose shape is the export contract (#82), and "a
session is on screen right now" is not something to restore into a build that is showing the
Ladder. Raising it hides the bottom nav **entirely** and puts a `--tap-min` pause ✕ top right —
always, because an immersive screen with no way out is the failure the shell exists to prevent.
The ✕ ends the session and lands on the Practice hub; so does leaving the route, so the Android
back button cannot walk out of a session and leave the nav hidden. What a session *is* (the
per-course snapshot, and resuming into it) is #96 and #99.

**Phone-correct layout**, and the two rules that keep it that way: the app column is `100dvh`
(never `100vh` — a mobile URL bar shrinks the viewport and `100vh` does not notice) and never
scrolls; `<main>` is the one scroll area, `overflow-y: auto; overflow-x: hidden;
overscroll-behavior: contain`. Every safe area is written `max(var(--space-N),
env(safe-area-inset-*))` — a phone gets its real inset, and a desktop browser, where every inset
is 0, still gets the design's padding. `src/shell/layout.test.ts` pins both from the CSS source,
because jsdom resolves neither `env()` nor `max()`; the numbers themselves are checked in a
browser at 360px and 430px, which is the ticket's acceptance criterion.

Two rules the scaffold bakes in, before you write a component:

- **Tokens only.** `src/main.tsx` imports `design/tokens.css` *in place* — `design/`
  is read-only and re-copied wholesale, so importing it directly means token updates
  land with zero copy step. Style with `var(--*)`; no hard-coded hex, px or font names
  anywhere in `src/` (`docs/design-contract.md`) — `src/styleContract.test.ts` scans every
  stylesheet the app ships and fails naming the file and line, the same mechanical shape as
  shell purity and the clock guard.
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

### The Ladder — the home screen, and nothing it renders is stored

`src/screens/LadderScreen.tsx` (#86; PRD-design §5, §7 [D16]) is where the engine becomes a
screen: the position line, the three-cell level strip, the rungs of the active level, the
counts-only pending line and the ownership footer. Every one of those is **derived on render** —
`deriveStatuses`, `currentRungId`, `levelSealed` off the very `progressionInput` the store guards
`passRitual` with (#83). A count on this screen and a rule in that action cannot disagree, because
they are one derivation.

Three things it is responsible for keeping true:

- **A locked rung is not a control.** No link, no button, no `tabindex` — the row is text, a
  hollow marker and a lock at 50% opacity. "The ladder is visible; the rungs are sealed"
  (PRD-design §3.2) is a DOM fact, asserted per rung in `LadderScreen.test.tsx`, not a CSS one:
  `pointer-events: none` would still leave a link for a screen reader to offer.
- **A sealed level answers honestly, in counts.** Only sealed cells are `<button>`s (the active
  cell is the screen you are on; a control with nothing to do is not one), and tapping one raises
  the shared toast (`src/shell/Toast.tsx` — the timer is the control, the region is always mounted
  so a screen reader hears the change, and #106's course-switch toast reuses both) with the sealed
  level and how many rungs below it remain.
- **Counts, never time.** No `%`, no date, no streak, no "due" — asserted over the rendered screen
  in both a fresh and a mid-journey state.

Loading that ladder and handing it to the store is `src/screens/useProgression.ts`, which the
Ladder and the module list both start with: it fetches `levels.json`, calls `setLadder` from an
effect when it resolves — which is what gives `passRitual` a rung to check against — and returns
the assembled `progressionInput` plus a `ready` flag. Screens draw nothing until that flag is up
(`aria-busy`), because an empty input would render a *finished* ladder. It is a hook rather than
a line in the Ladder because a deep link (`#/module/L1-M1`) reaches a guarded screen with the
Ladder never having mounted.

Two deliberate divergences from the prototype, both recorded in the code that makes them:

- **Course prose is 18px Mukta, not an 11.5px caption.** The prototype renders the pending line,
  the footer and the toasts in English for every course; in the product they are course copy, and
  design/tokens.md §2 is absolute — all Devanagari is Mukta, never below `--devanagari-min-size`.
  A caption token would set Hindi in Barlow, which draws no Devanagari at all. The ramp has no
  caption-sized Devanagari slot and cannot have one below the floor.
- **The position line is the screen's first row**, not part of the header: the shell's brand header
  is screen-agnostic (#84). #117 reconciles both.

### The staged rung card — one clear action, and never a gate

`src/screens/ladder/RungCard.tsx` (#87; PRD-design §6.2 [D22], PRD §8 F1) is the current rung as a
blueprint object — radius 0, a hairline, `--shadow-sm`, the four `+` registration marks — holding
the kicker, the title at `--text-rung-title`, the job, and **one CTA set, chosen by the stage**:

| `rungStage()` | primary | beside it |
|---|---|---|
| `fresh` | "Start with the module" → `/module/:id` | the note: read it once, Practice picks up from there |
| `studied` | "Practice" → `/practice` | ghost "revisit the module" → `/module/:id` |
| `exit_ready` | "Exit ritual — open" → `/ritual` | Practice and Module drop to secondary |
| `pending` | — (nothing to open) | the `pendingAuthoring` note + ghost "practice earlier rungs" |

The stage is `rungStage(input, id)` off the same `progressionInput` every other number on the
screen derives from — so it moves when the facts do: `markStudied` on first module open flips
`fresh` → `studied` (#88), the production counters flip `studied` → `exit_ready` (#95). Nothing
about the card is stored, and it holds no state of its own.

**The stage guides; it never gates** (the invariant, PRD-design §6.2). The bottom nav's Practice
tab is untouched at every stage — asserted per stage in `LadderScreen.test.tsx` — three of the
four stages offer Practice from the card itself, and no stage locks a route. The primary is the
one **filled** object in the whole view (`--cta-height` 48px, solid accent); secondaries are
`--btn-secondary-height`, ghosts `--ghost-height` and always `white-space: nowrap`
(design/tokens.md §3, §4).

Every label is the course's (`strings.json` — the seven `rungCard.*` keys above), so the card
carries no learner-facing English of its own; `ladder/RungCard.test.tsx` renders all four stages
and fails if the prototype's wording reaches the screen. The card's title is deliberately **not**
a link any more: the primary CTA is the way into a rung, and a `pending` rung has no module to
open at all.

Two more divergences from the prototype, on top of the Ladder's:

- **The card's copy and its button labels are Mukta at the 18px floor**, not 11–12px Barlow and
  14px Barlow Condensed. Same reason as the Ladder's prose, one step further: a CTA label is
  course copy too, and hi-mr's is Devanagari. Raised with the rest for #117.
- **The two `exit_ready` secondaries are `--btn-secondary-height` (46px)**, where the prototype
  writes 44 inline; design/tokens.md §4 is the rule of record and both clear `--tap-min`.

### The module list — read the rung, and nothing else

`src/screens/ModuleScreen.tsx` (#88; PRD-design §6.4, PRD §8 F2) is a rung's ten sentences,
browsable and quiet: nothing to answer, nothing to get wrong, no control that judges anything.
Four things it owes, and each is a test:

- **A guard.** `/module/:id` is a real deep link — HashRouter, installable PWA — so any id can
  arrive. A locked rung, an id the ladder does not list, and a rung whose module this build never
  shipped all land back on the Ladder (`replace`, so the bad entry leaves no back-stack trace).
  That is the same answer the rung card gives by having no link to offer.
- **`markStudied`, once, on first open.** The `studied` flag is what flips the rung card behind it
  from "Start with the module" to "Practice" [D22], so *opening this screen* is what moves the
  Ladder. It is idempotent in the store, which is what lets an effect fire it; the test proves the
  call count is 1 across re-renders, and that reading a rung passes nothing (Invariant 1).
- **Cards that expand in place, independently.** Collapsed is the L2 `display` + its `cue` (+ the
  quiet `script` line in romanized courses); expanded adds the English `glossEn`, the word-for-word
  `literal`, the word rows as tag chips, the interference-trap note when there is one, and
  "open full" → `/sentence/:id` — 250ms, `--motion-expand`, collapsed under `prefers-reduced-motion`.
  The open set lives in the screen, not in the cards, which is why one card opening never closes
  another. `module/ProductionDots.tsx` draws each sentence's two 6px dots off
  `production[sentenceId]` (0 / 1 / ≥2), **read-only** until Practice writes the counters (#95).
- **Where the learner was.** Scroll offset *and* open cards survive a detour into Sentence Detail,
  in **`sessionStorage`** (`module/moduleView.ts`, `rung:module-view:<course>:<module>`) and never
  in the store: `src/state/` is the export contract (#82), and which cards were open is this
  visit's UI, not something the learner earned. The two are one record because an offset restored
  into a differently expanded list is not where the learner was. The shell publishes its one
  scroll area through `src/shell/scrollArea.tsx` — the screen asks the frame for it rather than
  hunting the DOM for something that scrolls.

Three divergences from the prototype, on top of the Ladder's and the card's:

- **The screen's head row is the kicker, the title and the count**, not a header: the shell owns
  the back chevron and the screen's name (#84), and the prototype's own list is its scroll area
  where here the shell's `<main>` is the app's only one. #117 reconciles both.
- **Course prose is Mukta at the 18px floor** — the helper line, the cue, the literal, the trap
  note, the "open full" label and, third recurrence, **the word chips** (design/tokens.md §6 writes
  9.5–11px). Same wall as #86 and #87: §2 forbids Devanagari below `--devanagari-min-size` and a
  caption token sets it in Barlow, which draws none. Flagged again on #117; no token invented.
- **"Open full" is `--btn-secondary-height` (46px)** where the prototype writes 42 inline, the same
  call PR #139 made for the rung card's pair.

The one place the app overrides a font shorthand's family is the quiet script line, which takes
`--font-script-fallback` (design/tokens.md §2) — so `src/styleContract.test.ts` bans a face by
*name* and allows `font-family: var(--…)`, which is the opposite of one.

### The fonts — bundled, because offline is the product

Mukta (all Devanagari), Barlow (body/UI) and Barlow Condensed (headings, kickers, wordmark) are
self-hosted via `@fontsource`, imported one line per weight in `src/main.tsx` (#85, [D15]). The
prototype pulls Mukta off Google Fonts; a PWA that works on a plane cannot
(`design/pwa-checklist.md` §2). `vite.config.ts` strips the `.woff` fallback @fontsource writes
beside each `.woff2`, so `dist/` carries woff2 only — the service worker precaches all of it.

**`src/fonts.test.ts` is the guard.** A weight the ramp asks for and the bundle lacks is not an
error: the browser synthesises the face and nobody is told. So the test reads the `--text-*`
shorthands out of `design/tokens.css`, derives every (family, weight) the product renders, and
fails naming any that `main.tsx` does not import. That is how Barlow Condensed **700** got
bundled — `--text-brand` is the wordmark and it is 700.

**`#/dev/type`** is the font specimen: the Devanagari matrix at 18/22/26/32px × 400–700, the
romanization diacritics, the kickers. It is **development only** — `src/dev/typeRoute.tsx`
imports it dynamically inside an `import.meta.env.DEV` branch, so no chunk, no CSS and no
Devanagari reaches `dist/` — and it is the single entry in `shellPurity.test.ts`'s allowlist.

Findings, screenshots, the shipped byte count and the one real gap (`ʾ`, `ʿ` and `ḥ` are not in
Barlow) are in [`docs/04-font-notes.md`](docs/04-font-notes.md).

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
