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
