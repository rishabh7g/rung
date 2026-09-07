# Working in this repo

Conventions that are decided, not up for re-derivation each session. Everything else lives where
it already lives: `README.md` (the gate, the courses, the history), `design/PRD-engineering.md`
(the contract), `docs/` (every decision and review), and the header comments in `tools/`.

## Authoring content

**Ship `verified: true` in the authoring change.** A module is authored with its signature
already on it — `verifiedBy` naming the reviewer (`"<model> — LLM review, authorised by repo
owner"`) and `verifiedAt` the date — and the wave's section of its review doc
(`docs/<n>-llm-review-<course>-<level>.md`) lands in the same commit. Do not author `verified:
false` and flip it in a second pass: the flag means "reviewed and cleared to ship", the review is
the LLM review, and it runs on the owner's standing authority. `tools/validate.ts` rejects a
verified module with no signature, so the signature is the record.

**The native-speaker gate is a separate, stricter bar, and it is unmet.** Nothing above claims
otherwise. Every review doc ends in numbered open questions for a native pass, numbered on from
the course's existing chain, and no authoring wave may close one of those questions by rewriting
a shipped module.

**Before a module is done:** `npm run content:validate`, then `npm run content:build` (strict, no
flags) — the build enforces that every comprehension token resolves. Also check what the build
does not: every `display` in every sentence, variation and pool item should resolve against that
module's own cumulative index (the #282 discipline). Proper nouns ride unindexed (#61), and
`mistake.display` is deliberately wrong and exempt.

**A level never edits a file below it.** New shapes of an older lexeme get their own row in the
module that first shows them, with a note pointing back at the first-teach row. Paradigms have one
home; extending a row inside the same level is fine, reaching down a level is not.

## Before pushing

`scripts/verify.sh` is the gate (`.github/workflows/deploy.yml` builds and publishes, it does not
re-verify). Run it green, and quote the segment line in the commit message.
