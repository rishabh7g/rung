# design/

Design assets for rung, maintained by Rishabh. Source of record for look, feel,
and interaction; engineering builds against what lands here.

## Contents

- `PRD-design.md` (v3.3) — product design PRD: principles, flows, screens,
  component inventory, brand.
- `PRD-engineering.md` (v3.3) — engineering PRD: requirements and acceptance
  criteria, data model, phasing.
- `tokens.css` — **machine-usable design tokens; the single source of truth for
  styling.** Base Industry layer + rung semantic layer.
- `tokens.md` — developer reference for `tokens.css`: what each group means and
  the rules CSS cannot express.
- `Rung App v3.3.dc.html` — the clickable prototype; the visual and interaction
  **reference of record** (v2–v3.2 retired).
- `ios-frame.jsx`, `support.js` — supporting files for the prototype above.
- `_ds/` — the upstream Industry design system. Read-only: never edit, it is
  vendored from source.
- `rebrand-prompt.md` — reusable prompt for running a rename across this folder.

Still to land: formal component specs (staged rung card, course dropdown, retry
interstitial, brand mark), flow diagrams, and final microcopy.

## Contract for engineers

Style **exclusively** against `design/tokens.css` — load it and use `var(--*)`
only. No hard-coded hex, px, or font names in components.

If a screen you are building exists in the prototype, follow it; where the build
must diverge, `PRD-engineering.md` §17 records the divergences. If an asset
lands here after your ticket is written, the "Design alignment pass" ticket
applies it.
