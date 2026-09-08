# rung — repo deltas only

Workflow (issues, branches, merging, verification discipline): `~/.claude/CLAUDE.md`. Cross-repo
standards: [`docs/repo-standards.md`](https://github.com/rishabh7g/claude-setup/blob/main/docs/repo-standards.md)
in `rishabh7g/claude-setup`. Below is only what is true here and nowhere else — `README.md` is the
map, `docs/` every decision and review, each `tools/*.ts` header the stage it implements.

## What this is

A fully offline, installable PWA teaching a language as a ladder of ten-module levels: React 18 +
react-router 7 on Vite 8, TypeScript strict, vitest, zustand; no backend, no audio, no runtime AI.
Nine courses are authored as JSON under `content/`; the app reads only the build's `public/content/` output.

**`scripts/verify.sh` here is the reference implementation of the cross-repo verification contract**
— Bora.py, Kata, workout-dashboard and loghaven copied its shape, so changing the summary line, the
exit table or `.verify/<stage>.log` is a five-repo change rather than a rung one.

## How to run it

- `npm ci`, then `npm run dev` → <http://localhost:5173/>. **A fresh clone renders nothing until a build
  runs:** `public/content/` and `src/fonts/generated/` are gitignored, and `predev` fills them with
  `content:build -- --with-unverified --with-fixtures` then `fonts:build`. Both flags are **dev-only** —
  they ship unverified and fixture content, stamped `devBuild: true`. `prebuild` is the strict chain that deploys.
- `engines` pins Node `^22.22.2 || >=24.15.0` — jsdom 30's floor, not ours, and rung is the only repo
  here that pins it. npm only warns when you are under it; read the warning.
- Authoring a module: `npm run content:validate`, then `npm run content:build` with no flags — the
  strict build is what proves every comprehension token resolves.
- Deploy is a push to `main`: `.github/workflows/deploy.yml` builds with `VITE_BASE=/rung/` and
  publishes <https://rishabh7g.github.io/rung/>. It does not re-verify; nothing restarts.

## How to verify it

`scripts/verify.sh` → `TYPES ok | LINT ok | TEST 377/377 ok | CONTENT ok | FONTS ok | BUILD ok | BUDGET ok` (logs in `.verify/`, exit table in the script's header; `--fast` drops BUILD and BUDGET). Quote that line in the commit message.

## Deviations from the repo standards

- **FORMAT is not its own stage:** `npx prettier --check .` runs inside LINT and shares exit 20.
- **BUILD is `npx vite build`, not `npm run build`,** whose `prebuild` would re-run tsc and
  `content:build` — a content failure would resurface as `FAIL BUILD` long after CONTENT passed.
- **The keyed string bundle IS gated here,** unlike the standard's "only Bora.py enforces it":
  `src/course/stringsKeys.ts` is the canonical key list, `src/course/strings.ts` derives its runtime
  type, and `tools/strings-check.ts` (inside `content:build`) fails on a missing, extra or drifted key.

## What a newcomer gets wrong

- **Ship `verified: true` in the authoring change,** never in a second pass: the module carries its
  signature (`verifiedBy` = `"<model> — LLM review, authorised by repo owner"`, `verifiedAt` = the
  date) and its `docs/<n>-llm-review-…` section lands in the same commit. `tools/validate.ts` rejects
  a verified module with no signature, so the signature is the record.
- **The native-speaker gate is a separate, stricter bar, and it is unmet.** Every review doc ends in
  numbered open questions for it, and no authoring wave may close one by rewriting a shipped module.
- **A level never edits a file below it.** A new shape of an older lexeme gets its own row in the
  module that first shows it, with a note back at the first-teach row.
- **A shown surface is a taught surface, ratcheted rather than advisory** (#491): the build prints
  `shown but untaught: …` per course and `tools/shown-surfaces.test.ts` pins each count — lower a baseline
  in the commit that fixes the content, never raise one. Proper nouns (#61) and `mistake.display` are exempt.
- **A red BUDGET is never a size** — none has failed it since #304. It fails when a shipped file has no
  owner (`unmetered`) or the emitted worker's precache list disagrees with the `shell` row: give the
  file an owner in `owner()` in `tools/payload-budget.ts`, there is no limit to raise.
