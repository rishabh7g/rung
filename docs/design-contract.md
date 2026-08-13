# Design contract for engineers

How to build UI against the design package in [`design/`](../design/).

**This file lives in `docs/`, not `design/`, on purpose.** The `design/` folder is
re-copied wholesale from Rishabh's design tooling, which wipes anything added to
it. Keep engineering-owned notes here.

## The design package

| File | What it is |
|---|---|
| [`design/tokens.css`](../design/tokens.css) | **Machine-usable design tokens — the single source of truth for styling.** Base Industry layer + rung semantic layer. |
| [`design/tokens.md`](../design/tokens.md) | Developer reference for `tokens.css`: what each group means and the rules CSS cannot express. |
| [`design/Rung App v3.3.dc.html`](<../design/Rung App v3.3.dc.html>) | The clickable prototype — the visual and interaction **reference of record** (v2–v3.2 retired). |
| [`design/PRD-design.md`](../design/PRD-design.md) | Design PRD v3.3 — principles, flows, screens, component inventory, brand. |
| [`design/PRD-engineering.md`](../design/PRD-engineering.md) | Engineering PRD v3.3 — requirements and acceptance criteria, data model, phasing. |
| [`design/pwa-checklist.md`](../design/pwa-checklist.md) | Mobile and PWA build requirements: manifest, offline service worker, safe areas, self-hosted fonts. |
| [`design/_ds/`](../design/_ds/) | The upstream Industry design system. Read-only — vendored from source, never edit. |
| `design/ios-frame.jsx`, `design/support.js` | Supporting files the prototype loads. Not product code. |

## Rules

1. **Style exclusively against `design/tokens.css`.** Load it and use `var(--*)`
   only. No hard-coded hex, px, or font names in components.
2. **The prototype is the verifier.** If a screen you are building exists in it,
   match it state-for-state. Where the build must deliberately diverge,
   `design/PRD-engineering.md` §17 ("Prototype divergences — do NOT copy into the
   product") is the list — read it before copying anything.
3. **Build functional-first** when an asset has not landed yet. When it does, the
   "Design alignment pass" ticket applies it everywhere.
4. **Mobile rules are not optional** — `design/pwa-checklist.md` §1 records what
   the design already guarantees (44px tap targets, 16px selects to stop iOS
   focus-zoom, reduced-motion support). Keep them true.

## Note on the two PRD sets

`docs/PRD-*.md` and `design/PRD-*.md` are different versions of the same
documents. The `design/` pair is v3.3 and further ahead — for example
`design/PRD-engineering.md` has a §17 that `docs/PRD-engineering.md` does not.
Prefer the `design/` pair until the two are reconciled.

## Divergence from PRD-design §8.2 — read-once copy removal (2026-08-13)

**`design/PRD-design.md` §8.2 is now a historical record of the v3.3 design
package, not the shipped key list.** It says both language sets are "frozen at
**96 keys**"; the build ships **67**. `src/course/stringsKeys.ts` remains the one
published list, as §8.2 itself says — it is simply no longer identical to what
§8.2 describes.

### The decision

On 2026-08-13 the owner audited the app for **read-once copy** — static helper
and explainer prose a learner reads on the first card and skims past on the next
thirty — and decided to remove essentially all of it, including the honesty and
privacy promises. In the owner's words: *"make the app breathe by letting go of
the extra things."*

That lifted the Sync-3 freeze (#71) downwards. It ran as issues **#225–#233**,
one screen each, each removal landing in `STRINGS_KEYS`, `STRINGS_PLACEHOLDERS`
and all three authored bundles in the one commit the checker demands.

### What no longer ships — 29 keys

| Screen | Keys removed | PRD-design §8.2 line |
|---|---|---|
| Practice — reveal + phases (#225) | `nudge.review`, `nudge.read`, `nudge.produce`, `nudge.comprehend`, `mark.prompt` | "reveal nudges, read nudge" |
| Practice — hub (#226) | `practice.guideLine` | `practice.*` inventory |
| Practice — hub (#227) | `notebookInvitation` | "notebook invitation (§8.1)" |
| Ladder + rung card (#228) | `ladder.ownership`, `rungCard.freshNote`, `pendingAuthoring` | "pending-authoring note"; `ladder.*`, `rungCard.*` |
| Rung card (#233) | `rungCard.practiceEarlier` | `rungCard.*` |
| Module list (#229) | `module.helper`, `module.openFull`, `module.trapNote` | `module.*` |
| Exit ritual — Check step (#230) | `ritual.check.copy`, `ritual.check.plateLabel`, `ritual.check.resourcePerson`, `ritual.check.resourceInternet`, `ritual.check.caption` | "जांचो guidance" |
| Verdict + retry (#231) | `verdict.honesty`, `verdict.checkChecked`, `retry.body`, `retry.reassure` | "verdict honesty line"; "retry (all five §6.3 layers)" |
| Settings + storage + backup (#232) | `settings.switchNote`, `settings.privacy`, `settings.storageProtected`, `settings.storageBestEffort`, `settings.backupNote`, `storageNote` | "storage note"; `settings.*` incl. #108's backup/import set |

Two §8.2 ratification decisions are reversed by that table: **decision 2** (the
retry interstitial "completed" with all five §6.3 layers — three survive:
kicker, title, CTA) and **decision 4** ("the verdict keeps **both** honesty
lines" — only `verdict.line`, the send-off, survives).

`rungCard.practiceEarlier` is the odd one out: #228 removed `RungCard`'s whole
`pending` branch, which was the key's only render site, but left the key in the
list. It shipped for five PRs with nothing rendering it and was retired on #233,
taking the count 68 → 67.

### What was trimmed rather than deleted

These keys stayed because each carries live data or guards a destructive action.
Only their explanatory tails were cut.

| Key | Why it had to survive | What went |
|---|---|---|
| `practice.hubReview`, `practice.hubRead`, `practice.hubProduce` (#226) | Each renders a live `{count}` | The static coaching tail after the number |
| `ladder.pendingLine` (#228) | Live `{level}` / `{remaining}` / `{total}` | "The levels above wait sealed…" |
| `ritual.constraint` (#230) | The **Write step's only instruction** — a Write step that instructs nothing is a broken screen, not a quiet one | "not one of these `{sentenceCount}`" and "only words you've learned"; the key lost its `{sentenceCount}` placeholder |
| `verdict.line` (#231) | Points at the rung that just opened (`{nextModule}`) | — kept whole |
| `settings.importReplace` (#232) | The warning in front of a **destructive action** — a confirm that does not say what it destroys is a bug | The backup explainer above the buttons (`settings.backupNote`), not this line |

### The accepted consequence

**The app's promises now live only in docs and in the code's behaviour — they
are never said on screen.** The behaviour is unchanged; only the on-screen
assertion of it is gone. Specifically, these were promises rather than tips:

- `verdict.honesty` — Principle §3.4 verbatim: nothing here is graded.
- `settings.privacy` and the shell's **"read-only teaching · zero inputs · zero
  network"** footer — the privacy claim, stated on the screen that could be
  checked against it.
- `storageNote` and `settings.backupNote` — that nothing the learner writes is
  stored by the app, and that a backup is theirs to keep.

All of it is still true: there is no text input anywhere ([D18], §11 "no text
input; grading or storage of learner writing" is out of scope), no network call
after the course bundle is cached, and no learner writing in `localStorage` or
in an export file. The app simply no longer says so. If a future ticket wants
the claim back on screen, it is a **design change** and starts here, not with a
new key.

### Side effects worth knowing

- **State v7 → v8 (#227).** Removing `notebookInvitation` removed the persisted
  `settings.notebookInvitationDismissed` bit that made "dismissed forever"
  stick. `STATE_VERSION` is 8, `Settings` is one key (`elapsedTickEnabled`), and
  a new v7 → v8 migration step drops the retired field so a learner's older
  backup still imports (`src/state/serialize.ts`).
- **`--border-dashed-world` is now an unused token.** It was the app's only
  dashed border — the visual marker for "this happens outside the app" — and its
  one use was the Check step's resource plate, removed on #230. The token stays
  defined in `design/tokens.css` (read-only) and `design/tokens.md` §3 still
  reserves it for "outside the app" meaning; nothing in `src/` references it.
  Re-use it only for that same meaning.

### Freeze status

`STRINGS_KEYS` is **not frozen**. A key added or removed is still a copy
decision the owner makes, but it is no longer gated by §8.2, and §8.2 will not
be updated to match — `design/` is re-copied wholesale from the owner's design
tooling, so a correction written there is wiped. This section is the record.
