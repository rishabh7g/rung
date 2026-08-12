# Prototype-fidelity walk matrix (#117)

The closing QA pass of P5: every built screen walked against the prototype of record
(`design/Rung App v3.3.dc.html`) and the ratified specs (`design/tokens.md` §6.1–6.4,
`design/PRD-design.md` §5.1/§8.1), per `design/github-issues-checklist.md` §1.6 — "UI issues
close only when they match the prototype state-for-state — the verifier is the prototype."

## Method

- **Build walked:** `main` at the #116 merge, plus this ticket's fix — a dev-gated build
  (`--with-unverified --with-fixtures`), served by `vite preview`, driven over CDP by headless
  Chromium (this repo's Playwright cache) at 360×780 and 430×780, DPR 2 — the same rig every
  screen ticket's committed baselines used (`docs/images/*.png`).
- **States seeded** through the persisted document (`rung:state`, schema v6): fresh · mid-ladder
  (2 passed, 3 due) · studied · exit-ready (10×2 writes) · Level-1-complete (pending L2-M1).
- **Divergence law:** a cell "matches" when it matches the prototype OR its difference is on a
  sanctioned list — `design/PRD-engineering.md` §17, `design/PRD-design.md` §15, or the
  per-screen divergence records ratified on the way here (#86–#103 issue comments, now folded
  into tokens.md §6.1–6.4 and PRD-design §5.1/§8.1–8.2). Those records are cited per cell rather
  than restated.

## The matrix

Outcomes: **match** (state-for-state, or sanctioned divergence, cited) · **fixed** (delta closed
in this ticket's PR) · **filed** (structural delta, its own issue) · **device** (needs a real
phone; recorded on #117).

| Screen · cell | Outcome | Notes |
| --- | --- | --- |
| Ladder · fresh (360) | match | §6.1 fresh stage; type floor + head-row seam per the #86 record |
| Ladder · mid (430) | match | position line `LEVEL 1 · 2 OF 10`, counts-only pending line |
| Ladder · sealed tap (360) | match | honest toast, counts only; toast recipe §6.2 |
| Ladder · level just-completed | match | §5.1 state 1 — bar moves, filled cell rests, no copy |
| Ladder · all-complete | match | §5.1 state 3 mechanised in `LadderScreen.test.tsx`; no beat |
| Rung card · fresh | match | one primary + note, no dots yet (0 writes still draws 10 pairs) |
| Rung card · studied | **fixed** | §6.1 anatomy's production-dots row + counts-only writes line was missing in every stage — added (`RungCard.tsx`, reusing #88's `ProductionDots`); counts only (`9 / 20`), the prototype's English note has no key post-freeze (#71) |
| Rung card · exit-ready | match | primary + 46px secondary pair (tokens over inline 44, the #139 call); dots row now full |
| Rung card · pending | match | note + ghost, no dots — nothing authored to count (recorded divergence: the prototype papers over it with the authored module's numbers) |
| Rung card · unlock beat | match | one beat, 1000ms, one-shot flag; reduced-motion `animation: none` (`unlockBeat.module.css`) |
| Module list · collapsed / expanded / restore | match | #88 record: head row in scroll area, one scroll column, scroll+expansion restore via `shell/scrollArea.tsx`; verified expanded + restore live |
| Module list · dots | match | pairs per card top-right; `n / 20` count in the head row |
| Sentence detail · full | match | #89 record: section order [D10], trap plate colour-law walked by its own test, sticky pager, `1 / 10` counts, back-to-module chevron |
| Sentence detail · sparse module | match | absent sections render nothing (no empty plates) — `SentenceScreen.test.tsx` |
| Practice · hub | match | kicker + course title, three phase cards, ownership line; notebook invitation **filed** (below) |
| Practice · review cue / revealed / marked | match | immersive (no nav), 2px cue rule, dashed nudge plate, reveal 52px CTA, marks 2:1 row (#93 record), Next hidden until marked |
| Practice · read / produce / tick / resume / summary | match | committed baselines (`practice-*.png`, #96/#102) + phase tests; tick numberless, default ON |
| Ritual · arc (write / check / confirm) | match | #100 record: bare-ordinal title, `1 / 2` counts, dashed plate zero-interactive (mechanised), no marks on the dashed plate (sanctioned) |
| Ritual · hold | match | ~900ms fill, release resets, reduced-motion static (`HoldToConfirm` tests + `ritual-hold-*.png`) |
| Comprehension · items / marked / retry | match | §6.3 all five retry layers, no counter, no red outside marks; deep link without the hold's handover lands on the ritual arc (guarded route, sanctioned) |
| Verdict · pass + unlock handover | match | checklist + both honesty lines (#71 ratification), one-shot flag consumed on the Ladder; deep link without a pass redirects (guarded, sanctioned) |
| Settings · course / tick / storage / backup | match | §6.2 recipe: native select ≥16px at 44px, counts-only status line, frozen reassurance footer; storage computed rows; switch toast in the NEW course's words |
| Boot / offline / error | match | `offline-*.png` receipts (#91, docs/05-pwa-notes.md); content-error screen #79 |

## Cross-cutting audits

- **Colour law + tokens-only:** grep clean (no hex/px/named face outside comments; amber only in
  the three trap/tag sheets, `--mark-*` only in `SelfMark`, unlock keyframes only in
  `unlockBeat`). Now **mechanised app-wide** in `src/colourLaw.test.ts` — the allowlists are the
  sanction record; `styleContract.test.ts` still closes the raw-value back door.
- **Reduced motion:** all four motions (reveal, expand, hold, unlock beat — plus toast and tick)
  collapse under `prefers-reduced-motion`; verified live over emulated media on the module
  expand and the reveal, and mechanised in `src/colourLaw.test.ts` (any sheet declaring
  animation/transition must carry the reduce block).
- **Invariants 1–8:** each is mechanised where it lives (`unlockPath`, `productionCounters`,
  `silence`, `shellPurity`, `clock`, ritual step-2 zero-interactive, store shape pinning) — all
  green on this walk's run.

## Deltas

1. **Fixed here:** the staged rung card's production-dots row + writes count (§6.1 anatomy,
   prototype draws it in all four stages) — was absent in every stage.
2. **Filed:** the notebook invitation (PRD-design §8.1, decided on #67) is still an empty slot on
   the Practice hub — needs a persisted dismissal bit (state-shape change), so it is an issue,
   not a QA-pass fix.
3. **Device cells** (cannot be honestly produced on this headless host): real-phone walk — iOS
   Add-to-Home-Screen + splash, Android WebAPK, safe-area insets on a notched device, native
   select feel, press-and-hold on touch. Recorded on #117; the headless halves (installability,
   manifest, splash set, offline) carry receipts in docs/05-pwa-notes.md.
