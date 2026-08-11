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

**Prerequisites:** Node **≥ 20** (enforced by `engines.node`) and npm. No other
runtime, no backend, no env vars.

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
in `tools/strings-keys.ts` — the only list in the repo, which the app's `Strings` type derives
from — and a bundle that fails takes the whole build down with it (PRD §6.5): a missing key is a
blank screen for the learner, not an English word.

`tools/strings-check.ts` runs per course, flattens the nested file onto dot-paths
(`ritual.check.copy`), and reports four things, always naming course **and** key:

- **missing key** — the 26 canonical paths must all be there;
- **empty or non-string value** — a present-but-blank key is a missing key with extra steps;
- **unknown key** — the typo tripwire; `ritual.check.plate` would otherwise sit quietly beside a
  missing `plateLabel`;
- **placeholder mismatch** — a value carries exactly its canonical `{placeholders}`
  (`{sentenceCount} {maxWords} {ordinal} {n} {nextModule} {to} {from}`), so a translation cannot
  drop `{ordinal}` or invent `{name}`.

Adding a key is one edit to `tools/strings-keys.ts` plus a line in each of the three bundles —
in that order, because the build will tell you exactly which course you forgot.

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
