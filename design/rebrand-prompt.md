# Rebrand prompt — Shidi → rung

Copy-paste the block below to any AI agent with read/write access to this folder.

---

You are working in a folder of product-design deliverables: an HTML prototype (`*.dc.html`), two markdown PRDs, and design-token files (`tokens.css`, `tokens.md`). Rebrand the product from **Shidi** (also written **शिडी**) to **rung** — lowercase "rung" in running text and UI copy; "Rung" only at sentence starts and in file names.

1. **Rename files.** Any file whose name contains "Shidi" → "Rung" (e.g. `Shidi App v3.3.dc.html` → `Rung App v3.3.dc.html`). Then search every other file for the old filename and update the references.
2. **Replace current-name usages.** In every .md / .css / .html file, replace Shidi/शिडी wherever it names the product today (headers, footers, UI strings, toasts, comments). KEEP historical/rationale mentions that document the rename itself — e.g. "formerly Shidi / शिडी", "शिडी was Marathi-bound" — those must survive verbatim.
3. **Flip decision status.** Wherever the rung brand is marked "proposal" or "pending sign-off" (decision id [P1]), mark it ratified (date it); close any open question about brand naming; leave alternates (Paydan, Climb) listed as considered-and-not-chosen.
4. **Do not touch:** the `_ds/` design-system folder (upstream, read-only), `uploads/` (source documents), any Hindi/Marathi/Spanish/Arabic learning content, and code identifiers that don't reference the brand (CSS variables, element ids, course ids like `hi-mr`).
5. **Verify.** Grep the folder for `Shidi` and `शिडी`: every remaining hit must be an intentional historical mention. Open the HTML prototype and confirm zero console errors — if you moved or renamed it, its relative asset paths (`./ios-frame.jsx`, `./support.js`, `../_ds/…`) must still resolve.

---

Status in THIS folder: the rebrand above has already been applied (2026-08-11). Re-running the prompt should find nothing to change — useful as a check, or as the template when the next rename comes.
