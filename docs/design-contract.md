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
   only. No hard-coded hex, px, or font names in components. `src/styleContract.test.ts`
   enforces this mechanically, with two narrow exemptions where a token is impossible rather
   than merely unused (#243): a `px` literal in a media-query PRELUDE (`@media (min-width:
   768px)` — CSS forbids `var(--*)` in a media condition), and a `px` literal in a
   custom-property DEFINITION inside `src/styles/tokenOverrides.css` (that file is the one
   sanctioned place to change a `design/tokens.css` value, and changing a length means writing
   a length). Everything else — a `px` in an ordinary declaration, anywhere, including inside a
   media-query body or inside `tokenOverrides.css` itself — is still banned.
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

## Divergence — `glossEn` is optional in schema v5 where the L2 is English (2026-08-23, #268)

`design/PRD-engineering.md` §7 lists `glossEn` among a sentence's required fields
(`display/cue/glossEn/deconstruction required`), and `content/schema/module.schema.json`
described itself as frozen against the two authored hi-mr modules. Since #268 the schema
**no longer requires `glossEn`** — it stays a declared, described property — and the
requirement moved to the one place that knows the course row: `tools/content-build.ts`
`checkGlossEn`, beside the `scriptMode` cross-check, fails the build for every sentence
without a non-empty gloss **unless the course's `l2Tag` is `en`**. Why: hi-en's L2 *is*
English, so a mandatory English gloss would print the hero line twice on every sentence —
exactly the read-once repetition the 2026-08-13 copy removal stripped. The three shipping
courses (hi-mr, en-es, en-ar) are byte-unchanged and still carry a gloss on every sentence,
which the build now enforces for them; `tools/validate.ts` (which has no course row) and
`src/course/types.ts` type it `glossEn?: string`; Sentence Detail renders the English
paragraph only when the gloss is present, and the gloss section vanishes when neither the
gloss nor `literal` exists — the same rule every other optional section obeys. No shell code
branches on a course id or a language tag to decide this; the rule lives in the build. A
deliberate, recorded relaxation, not drift — `design/` is read-only, so this paragraph is
the record.

## Divergence — the bottom bar's safe area is ADDED, not substituted (2026-08-15, #265)

`design/pwa-checklist.md` §2 says only that "the frame's 56px top / 30px bottom paddings become
`env(safe-area-inset-top)` / `env(safe-area-inset-bottom)` (with fallbacks)". Read as
`max(token, env(...))` — which is how both edges were built — that makes the two platforms take
different branches of the same expression. On a real iPhone 13 the bottom bar's icons rode high
with a dead strip beneath them:

| | top padding | bottom padding | designed bar |
|---|---|---|---|
| Android / desktop (inset 0) | `--space-2` 6.8px | `--space-8` 27.2px | 6.8 + 56 + 27.2 + 1px border = **91px** |
| iPhone (inset 34px) | `--space-2` 6.8px | 34px — the token discarded | 6.8 + 56 + 34 + 1px border = **97.8px** |

**The rule:** a bottom inset is an OS-owned strip **added below** a fixed designed bar, never a
substitute for the bar's own padding. That is how both native platforms build it — iOS `UITabBar`
is 49pt of content plus a 34pt safe area beneath it, Android Material is a 56dp bar plus the
gesture inset. So `BottomNav.module.css` pads symmetrically and sums:

```css
padding: var(--space-1) var(--space-3);
padding-bottom: calc(var(--space-1) + env(safe-area-inset-bottom, 0px));
```

One designed bar on every device — 3.4 + 56 + 3.4 + 1px border = **63.8px** — with the device's
own inset added underneath. The house UI standard's figure is a 65px bar; `--space-1` is 3.4px in
`design/tokens.css`, so it computes ~1px under. Immaterial, and rule 1 above decides it: **use
the token, never a raw px.**

**The header is the other case and does not change.** `AppShell.module.css` keeps
`padding-top: max(var(--space-3), env(safe-area-inset-top))`: nothing sits above the header, so
the notch's strip genuinely does substitute for its top padding.

The `0px` inside the `env()` fallback is the one place a `px` literal is not a design decision —
`src/styleContract.test.ts` exempts a zero length, and only a zero, for that reason.

## Divergence — kickers in Devanagari (2026-08-30, #351)

`design/tokens.css` defines both kicker slots on `--font-heading`: `--text-kicker` is
`600 11px/1.2 "Barlow Condensed", system-ui, sans-serif` and `--text-kicker-sm` the same at 10px.
That was correct while the kickers were English shell furniture, which the copy freeze (#71) said
they were and design/tokens.md §5 still prints in English (`"M3 · CURRENT RUNG"`).

#351 made seven of them course copy: the Ladder's position line, the rung card's current-rung
kicker, the level strip's cells, the bottom nav's tab labels, the Verdict's kicker and the four
Settings section heads. In `hi-mr` and `hi-en` those strings are Devanagari — and Barlow Condensed
carries no Devanagari at all, so the stack falls through to `system-ui`. That is tofu in a
headless browser and an arbitrary system face on a phone, and it is flatly against
design/tokens.md §2: **"`--font-devanagari` Mukta 400–700 — all Devanagari"**.

`src/styles/tokenOverrides.css` inserts Mukta into both stacks, before the generics:

```
--font-kicker:    'Barlow Condensed', 'Mukta', system-ui, sans-serif;
--text-kicker:    600 11px/1.2 var(--font-kicker);
--text-kicker-sm: 600 10px/1.2 var(--font-kicker);
```

It is a NAMED role rather than two literal stacks, so the two slots cannot drift apart and
`src/fonts.test.ts`'s `familiesByRole()` — which reads `--font-*` out of both sheets — sees it the
way it sees every other family. The weight it asks Mukta for is 600, which the bundle already
carries: `--text-l2-card` and `--text-l2-list` render Mukta 600 today, so this adds a use of an
existing cut rather than a cut.

Three things about the shape of that fix:

* **Before the generics, not appended after them.** CSS font fallback is per glyph, and a generic
  family answers for every glyph there is: a stack ending `…, system-ui, sans-serif, 'Mukta'`
  would never reach the bundled face, because `system-ui` would have supplied a Devanagari glyph
  first. `--font-devanagari`'s own override has the same shape for the same reason
  (`docs/04-font-notes.md` §9).
* **Barlow Condensed stays first**, so every Latin glyph it has still comes from it. The hi-*
  position line is `Level {level} · {total} में से {passed}` — Latin numerals and a Latin word
  beside Devanagari — and per-glyph fallback is what lets one line be set in two faces rather than
  forcing the whole thing into one.
* **The size does not move.** The body-text floor below deliberately excludes these two slots, on
  the argument that the floor is about prose a learner reads rather than a tracked label. That
  argument does not change because the label's WORDS are now the course's: a nav tab is a nav tab
  in every language, and raising it to the 18px Devanagari body floor would rebuild the bottom bar
  and the level strip around a type decision neither screen asked for. The accepted consequence is
  that Devanagari renders below `--devanagari-min-size` in these seven places — narrowly, at label
  scale, and never in prose.

`--kicker-tracking` and `text-transform: uppercase` are left alone. Uppercasing is a no-op on
Devanagari, and the tracking is an aesthetic cost at label size rather than a correctness one; a
per-script tracking rule is a bigger design question than this fix, and it is flagged rather than
answered here.

## Divergence — body-text floor (2026-08-14, #252)

`design/tokens.css` sets four body-role sizes below the house UI standard's floor:
`--text-body` 15px, `--text-secondary` 13px, `--text-caption` 11.5px, `--text-micro` 10.5px. The
standard (`rrish-learning-base/playbooks/ui-baseline.md` §7, §16) puts the floor at 16px with no
exception for captions: "Body text may not go below 16px. No exceptions, including captions
inside cards." It becomes load-bearing with the standalone zoom lock (#250): below 16px the text
is small AND unzoomable in the installed app, the exact combination §7 exists to prevent.

`src/styles/tokenOverrides.css` raises all four to 16px, keeping each role's own line-height
(1.55 for body/secondary, 1.5 for caption/micro) — only the size moves. `--text-kicker` and
`--text-kicker-sm` are deliberately excluded: they are uppercase tracked labels (nav tabs,
section headers), not a body text role the standard's floor is arguing about. Hierarchy between
the four raised roles survives on colour, not size — they were already differentiated by the
`--ink-*` tint each one is painted at (`design/tokens.md` §1), never by weight, so four roles
landing on one size is not a new dependency, it makes an existing one load-bearing.

`src/fonts.test.ts` asserts every non-kicker `--text-*` token — the design package's plus the
override's — resolves to at least 16px, so a future ramp entry added below the floor fails the
same way. Walked the six stylesheets that consume the four raised tokens
(`LadderScreen.module.css`, `ComprehensionScreen.module.css`, `RitualScreen.module.css`,
`ModuleScreen.module.css`, `SentenceScreen.module.css`, `BootScreens.module.css`) for the layout
consequence: every caption/micro/secondary use is either a short closed-vocabulary count/label
(`"part 1 of 2"`, `"2 of 10"`, `neutral`/`informal`) in a `flex: none` slot beside a `flex: 1,
min-width: 0` sibling that absorbs the space, or wraps freely in a column (`rowJob` in
`LadderScreen.module.css`) — none is a `white-space: nowrap` label sized to the OLD, narrower
text, so none clips or forces horizontal overflow at 375px.

## Divergence — left rail (2026-08-14, #249)

`design/tokens.css` gives the bottom nav one shape: a bar, icon-only, at every viewport. The house
UI standard (`rrish-learning-base/playbooks/ui-baseline.md` §4, §5, §16) turns it into a **left
rail** — icon + label, `--rail-width` (232px) wide, bordered on its right — from 768px up, with the
header full width across the top and the rail and the scroll area sitting side by side beneath it.
`design/tokens.css` has no token for the rail's width — `--rail-width` did not exist in the design
package before this issue.

`src/styles/tokenOverrides.css` defines `--rail-width: 232px`. `src/shell/AppShell.tsx` wraps
`<main>` and `<BottomNav>` in a new `.body` flex container — `<main>` itself does not move, and
`ScrollAreaContext` still publishes the same element (#88). `.body` is a column on mobile (matching
the layout before the wrapper existed) and `row-reverse` at `@media (min-width: 768px)`, which puts
the nav — second in DOM order — at the main-start (the left) without reordering the markup.
`src/shell/BottomNav.module.css` gains the matching `@media (min-width: 768px)` block: the nav lays
out as a column `var(--rail-width)` wide with `border-right` instead of `border-top`, the label
goes back to `display: block`, the icon shrinks back to `--icon-ui` (20px, from the bar's 26px
`--icon-nav-bar`, #246), and each item becomes a row — icon beside label.

## Divergence — content column measure (2026-08-14, #248)

`design/tokens.css` has no cap on content width — above 1024px the app's content stretches to the
full window, a line of body text running the whole width of a laptop screen. The house UI standard
(`rrish-learning-base/playbooks/ui-baseline.md` §3, §11, §16) caps it at a 720px reading measure,
centred, from 1024px up; below that the content stays fluid.

`src/styles/tokenOverrides.css` defines `--content-max: 720px`. `src/shell/AppShell.module.css`
applies it inside `@media (min-width: 1024px) { .screen > * { max-width: var(--content-max);
margin-inline: auto; } }` — one direction, and on the content INSIDE the scroll area (`.screen`),
not on `.screen` itself, so the scroll area stays full width and the scrollbar sits at the window
edge.

## Divergence — screen gutter (2026-08-14, #247)

`design/tokens.css` has one fixed value for the horizontal screen padding —
`--space-6` (20.4px) — used at every viewport. The house UI standard
(`rrish-learning-base/playbooks/ui-baseline.md` §3, §11, §16) steps it across
the three breakpoints instead: 16px below 768px, 24px from 768px, 32px from
1024px. `design/tokens.css` has no token for this — `--gutter` did not exist
in the design package before this issue.

`src/styles/tokenOverrides.css` defines `--gutter-sm: 16px`, `--gutter-md:
24px`, `--gutter-lg: 32px` and `--gutter: var(--gutter-sm)`, then steps
`--gutter` to `--gutter-md` at `@media (min-width: 768px)` and to
`--gutter-lg` at `@media (min-width: 1024px)` — one direction per rule, per
the standard's §3 ("write them `min-width: 768px` / `min-width: 1024px`
upward"). The eight screen modules and the shell header now read
`var(--gutter)` for their horizontal padding instead of `var(--space-6)`;
`--space-6` is unchanged and stays in use everywhere else.

## Divergence — bottom-nav icon size (2026-08-14, #246)

The house UI standard gives the icon-only bottom bar (#245) its own icon size, larger than the
`--icon-ui` (20px) the rest of the shell uses: "Larger on the bar to carry the tab on its own,"
because with the label hidden the glyph alone has to identify the tab. `design/tokens.css` has no
token for this — `--icon-nav-bar` did not exist in the design package before this issue.

`src/styles/tokenOverrides.css` defines `--icon-nav-bar: 26px`, and `BottomNav.module.css`'s
`.icon` reads it instead of `--icon-ui`. `--icon-ui` is unchanged and stays in use everywhere else
(the shell header's chevron and pause button).

## Divergence — bottom-nav item height (2026-08-14, #244)

`design/tokens.css` sets `--nav-item-height: 48px`. The house UI standard
(`rrish-learning-base/playbooks/ui-baseline.md` §5, §16) fixes the bottom nav at
**56px**: "Nav height stays 56px. Dropping the label did not shrink it: it is
above the 44px tap floor and sits comfortably around a 26px icon." The bar is
icon-only from #245 and its icon is 26px from #246 — 56px is the height that
sits comfortably around that glyph.

`design/` is read-only and re-copied wholesale, so the override goes in
`src/styles/tokenOverrides.css` rather than in the design package itself, per
the rule this file already states. The token NAME stays `--nav-item-height`
(the standard calls it `--nav-height`, but renaming it would mean editing the
read-only package) — only the value changes, from 48px to 56px.

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
