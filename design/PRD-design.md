# PRD — rung (formerly Shidi / शिडी) — Product Design

- Version: 3.3
- Date: 2026-08-11
- Owner: Rishabh
- Audience: Product Designer
- Companion documents: `PRD-engineering.md` (v3.3) and the clickable prototype `design/Rung App v3.3.dc.html` — the visual/interaction **reference of record** and the single surviving prototype file (v2–v3.2 retired).
- Status of decisions: **[D#]** = decided; **[P#]** = proposed by design, awaiting Rishabh's sign-off; **[Q#]** = open.

**Changelog v3.3:**
- **Multi-course [D19].** The product generalises from one language pair to **courses** — a course is one L1→L2 pair (hindi → marathi, english → spanish, english → arabic). One course is active at a time; switching lives in Settings as a **dropdown** (scales to many languages); **switching never erases progress** — every course keeps its own ladder, production counters, and review queue. Course microcopy (nudges, ritual copy, cue labels) ships **inside the course bundle**, not the app shell: the Spanish and Arabic courses speak English because their L1 is English.
- **Speech-first script policy [D20].** The product's goal is spoken fluency, not literacy. A course whose L2 script does not transfer from the L1 runs **romanized-first**: the primary sentence line is romanization ("ismī Rohān"), with the native script kept as one quiet secondary line for recognition — never required reading. Devanagari courses stay native-script (the script IS free transfer from Hindi). Per-course `scriptMode` flag.
- **Onboarding removed [D21]** (Rishabh). The app opens directly on the Ladder. Consequence to resolve: the notebook invitation has no home — recommendation in §12.
- **Rung-card sequencing [D22]** (team review). The current rung shows one clear action per stage instead of two competing buttons: fresh rung → "Start with the module"; module studied → "Practice" primary + quiet "revisit the module"; production complete → "Exit ritual — open" primary; pending rung → note only. Guides the order (read → practice → exit) **without gating** — the Practice tab stays reachable (Invariant: phases guide, never gate).
- **Rebrand [P1 — ratified 2026-08-11]: शिडी → "rung".** Name and mark in §9; alternates kept as considered-and-not-chosen.
- **v3.2 deliverables landed in the prototype:** guidance-only जांचो designed ([Q2] answered, §6.5); comprehension retry with fresh pool items implemented; Next hidden (not disabled) until self-mark, everywhere; Settings gained the Practice section (elapsed-tick toggle, wired) and the privacy line.

**Changelog v3.2 (retained):** translation feature removed entirely [D18]; zero text inputs; जांचो is guidance-only; Settings keeps tick toggle, storage, export/import.

**Changelog v3.1/v3.0 (retained):** levels + level strip; bottom nav + immersive practice; Sentence Detail order (mnemonic last, "Pocket it"); gated colour-coded self-marks; "why" on every revealed card; gentle elapsed tick; press-and-hold ritual confirmation; ownership copy; Industry visual system; Mukta + Barlow; read-only teaching; dark mode deferred.

---

## 1. Context and problem

An adult fluent in one language (L1) wants to learn a second (L2). Existing products fail three ways: unsequenced content, calendar-framed progress ("fluent in 30 days"), and recognition-only testing. The product is a **ladder of checkpoints, not a timeline**: three levels of ten tightly scoped modules per course, each with ~10 model sentences, exact translations, and a deep deconstruction. Every module exits through a **generative ritual**: the learner writes a novel "11th sentence" on paper, outside the app, checks it with their own resources, and confirms in the app.

v3.3 widens the frame: the ladder engine is **course-agnostic**. Today the learner climbs Hindi→Marathi; tomorrow they may add English→Spanish or English→Arabic. The engine, invariants, and visual system never change per course — only the content bundle does.

### Pilot and the one real user

- Primary course: **Hindi (L1) → Marathi (L2)**; Devanagari shared, text is the medium.
- **P1:** adult, fluent Hindi speaker, zero Marathi; 20–30 min/day, evenings, phone-first; streak-guilt quitter. **A physical notebook is part of the product** — with no inputs in the app, the notebook is the only place production lives.
- Built by one person, for one friend. Personal, warm, small.

### Delta learning (shapes the visual language)

Every word and rule carries one of three tags: **free** (transfers from L1; quiet), **delta** (genuinely new; the lesson), **interference** (L1 misleads; the one loud, amber affordance). Tags are **pair-specific by definition** — each course authors its own.

## 2. Product invariants (identical list in the engineering PRD — do not violate)

1. Progression happens **only** through the module's generative exit ritual. Never by time, streaks, or passive completion.
2. No calendar framing anywhere: no dates, deadlines, streaks, daily goals, or "X-day plans".
3. Every session pushes the learner to produce the L2 themselves — in their head, out loud, or on paper. The app prompts and reveals; **the pen belongs to the learner**.
4. **Read-only teaching:** the app presents pre-authored, native-verified content and reveals scripted answers. It never evaluates, grades, scores, or stores anything the learner writes.
5. Checking correctness is entirely the **learner's own activity**, outside the app. No checking service, no translation, no shortcut — the app only says, in words, where to go.
6. The app contains **no input fields.**
7. A module never exposes vocabulary or grammar beyond its declared bounds plus prerequisites.
8. *(new, v3.3)* All invariants are **course-agnostic**: switching courses changes content, never rules. Switching never destroys progress.

**Boundary note (ratified):** the numberless, capped, toggleable gentle elapsed tick in Practice is the only sanctioned time affordance.

## 3. Design principles

1. **Checkpoints, not calendars.** Progress is spatial; pending lines speak in counts only.
2. **The ladder is visible; the rungs are sealed.** Locked rungs and sealed levels are genuinely inaccessible until earned.
3. **The learner owns the pen — and the app.** Ownership copy recurs; keep or delete the app; the ladder stays.
4. **The honest machine.** Never checks, never offers to. "The app graded nothing. It saved nothing you wrote. That was the deal."
5. **Depth on demand.** One calm card until asked; expand in place; "why" on any reveal; open full for everything.
6. **Calm mastery, anti-Duolingo.** Two sanctioned loud moments: the unlock beat and the red/green self-mark fills.
7. **Bilingual hierarchy is sacred.** L2 primary; L1 cue secondary and quieter; English gloss tertiary. In romanized courses: romanization primary, script the quietest line.
8. **Failure is information.** Unlimited retries, fresh items, no shame states.
9. **Speak first, read when it's free.** *(new)* Script is taught only where it transfers; otherwise it rides along as recognition, never as a gate.

## 4. Information architecture [D8, D21]

- **Bottom nav: Ladder · Practice · Settings.** No onboarding — first run lands on the Ladder with L1-M1 unlocked.
- **Module, Sentence Detail, and the Exit Ritual** are children of the active rung with back headers.
- **Practice sessions go immersive:** nav hidden, pause ✕ always available, lossless resume.
- **Settings owns the course switcher** (dropdown), practice toggle, storage, backup, privacy line.
- No screen contains a text input.

## 5. Levels (per course)

- **3 levels × 10 modules.** Level 1 "Foundations — say what you need" · Level 2 "Conversations — hold your own" · Level 3 "Fluency — stories & opinions" (names pending [Q1]).
- **Level strip:** one cell per level, 10 mini squares each; header reads "LEVEL 1 · 2 OF 10"; counts-only pending line closes with "the sequence is the system's, the pace is yours."
- **Seal rule:** a level unlocks only when every module of the previous level is passed. Sealed cells toast honestly when tapped.
- Ladder footer (recurring ownership copy): "Yours to pace. Practice any rung you've passed, anytime — keep the app or delete it. The ladder stays where you left it."

### 5.1 Level-strip edge states [Q4 closed] *(spec — §12.3 deliverable)*

The prototype shows the strip mid-Level-1 only; these three states complete it. Ground rule (§3.6, calm mastery): the unlock beat is the **only** sanctioned celebration — no badges, confetti, modals, or new loud copy in any of these states.

1. **Level just-completed.** The completed level's cell is its own mark: all 10 mini squares filled `accent-600`, label stays `accent-700`. The accent top bar — the strip's single "you are here", echoing the brand mark's one solid rung — **moves to the now-current level's cell**; the completed cell keeps a quiet `1px divider` top edge like a resting cell. Tap: no-op (its rungs are reachable from the rung list; the footer already says so). No checkmark, no "COMPLETE" tag, no copy line. **No motion of its own** — the moment is carried entirely by state 2.
2. **Next-level unseal moment.** On the Ladder arrival from the pass that seals a level (10 of 10), the shared unlock beat (`unlockBeat`: `accent-200` flash + 10 px settle → transparent, **1000 ms**, `cubic-bezier(.2,.7,.3,1)`) plays on **both the newly unsealed level cell and its first rung's card** — same keyframes, same duration, simultaneous, **once**. The beat rides the one-shot just-unlocked flag handed over by the Verdict and is consumed on arrival: reloads and revisits are silent. At rest the unsealed cell simply wears open-level styling (label `accent-700`, accent top bar, squares `neutral-300` with the first `accent-300` current); the first rung card keeps its existing small "unlocked" tag — no additional copy on the cell. Header and pending line move to the new level, counts only: "LEVEL 2 · 0 OF 10"; "10 rungs left in Level 2 …". **Reduced motion: `animation: none`** — the resting unsealed state is the entire message.
3. **All three levels complete.** **No beat fires** — there is nothing left to unseal, and completion is not an unlock. All three cells sit filled per state 1; no cell carries the accent top bar (nowhere left to be); header reads "LEVEL 3 · 10 OF 10". The pending line and current-rung crosshair disappear — nothing is pending — and **no replacement copy line is added**: the ownership footer ("… keep the app or delete it. The ladder stays where you left it.") is deliberately the last word. No motion, so nothing to reduce.

## 6. User flows

1. **First run.** Ladder directly; L1-M1 current with the fresh-rung stage ("Start with the module"). *(Notebook invitation: first Practice hub, §8.1.)*
2. **The rung card — staged CTA [D22].**
   - *Fresh rung (not studied):* primary **"Start with the module"** + note: "Read it through once — Practice picks up from there. Nothing is locked; the tab stays open."
   - *Studied:* primary **"Practice"**; ghost link "revisit the module". Opening the module flips the stage automatically.
   - *Production complete:* primary **"Exit ritual — open"**; Practice and Module drop to secondary.
   - *Pending rung (unlocked, content not authored):* note only + ghost "practice earlier rungs".
3. **Daily session.** Practice (immersive) → Review (L1 cue → recall → reveal → self-mark) → Read → Produce (cover-and-recall). Next appears **only after a self-mark (hidden, not disabled)**; every revealed card offers "why"; Produce cards offer "open full"; gentle elapsed tick under the phase chips. Courses with no passed rungs skip Review ("nothing due yet — first rung").
4. **Browsing a module.** Collapsed cards → expand in place → "open full" → Detail. Expanded states + scroll restore on back. Romanized courses show the script as a quiet third line.
5. **Exit ritual — Generate.** Three-step arc, one screen: **लिखो/Write** (the constraint) → **जांचो/Check — guidance only [Q2 answered]:** verbatim copy plus a **dashed plate** ("APP के बाहर — तुम्हारी दुनिया" / "OUTSIDE THE APP — YOUR WORLD") holding two static resource rows (a person who knows the L2; the internet, yourself) — dashed border = outside the app's solid hairline world; zero interactive elements; caption states the absence of buttons is deliberate → **पक्का करो/Confirm:** press-and-hold ~900 ms [D14], fill progress, release resets; ✓ + CTA to Comprehension.
6. **Exit ritual — Comprehend.** 2 random pool items (no repeats within a test) → reveal scripted answer → gated colour self-mark → Next/Finish. **Any "Not quite" → calm retry interstitial → "Fresh sentences"** (new random items; unlimited; nothing counted against you). "Why" available on the reveal.
7. **Verdict — pass.** Checklist (11th sentence · checked by you · comprehension 2 of 2) + honesty line; "Climb to the ladder" → unlock beat on the next rung.
8. **Course switching.** Settings → COURSE dropdown → instant switch + toast ("Switched to english → arabic. Your hindi → marathi ladder is saved exactly where it was."). Status line under the dropdown: "Level 1 · 2 of 10 passed · M3 in progress."

## 7. Component inventory

- Level strip; header position line; counts-only pending line.
- **Staged rung-card CTA** (4 stages, §6.2; spec `tokens.md` §6.1).
- Ladder rung markers [D16]: passed = filled circle + check, current = crosshair, locked = hollow circle; unlock = single beat.
- Self-mark control [D11]: green `oklch(0.52 0.10 150)` / red `oklch(0.52 0.13 27)` fills, white text; **Next hidden until marked** — same control in Practice and Comprehension.
- "Why" toggle → shared word-row component (word + cue + tag chip + note).
- Gentle elapsed tick (2 px, numberless, toggleable; **default ON at first run** [Q3 closed]).
- Ritual arc: constraint step · guidance-only जांचो (dashed plate + static resource rows) · press-and-hold control.
- Comprehension retry interstitial ("Fresh sentences"; spec `tokens.md` §6.3).
- Sentence card (collapse/expand/open-full); Detail section set (order frozen [D10], mnemonic last); tag chips; variation card (`accent-200` changed-part fill); mistake callout (struck on neutral plate); reveal card; phase chips; production dots; storage meter (per-course rows); settings rows; **course dropdown** (native select on `.input`, 44 px; spec `tokens.md` §6.2); **quiet script line** (romanized courses).
- **Brand mark** (§9; spec `tokens.md` §6.4).

## 8. Content, tone, and microcopy

- Voice: patient mentor + friend. **Microcopy is course content:** each course bundle carries its nudges, ritual copy, cue labels, and ordinal ("11th sentence" / "5th sentence") in its own L1. The Marathi course speaks Hindi/Hinglish; Spanish and Arabic courses speak English.
- Frozen Hindi set (hi→mr) unchanged from v3.2 §8 — reveal nudges, read nudge, जांचो guidance ("अब खुद जांचो — किसी मराठी जानने वाले से पूछो, या internet पर खुद ढूँढो. जांचना तुम्हारा काम है, app का नहीं."), confirmation, verdict honesty line, storage note.
- English set (en→es, en→ar) mirrors it 1:1 — e.g. Check step: "Now check it yourself — ask someone who knows Spanish, or dig on the internet. Checking is your job, not the app's."
- Course-switch toast promise: "…saved exactly where it was." Settings note: "Switching never erases anything — each course keeps its own ladder, review queue and counters."
- Never use: "streak", "daily goal", "you're behind", "hurry", "days left", "% fluent", or anything implying the app checked, translated, or verified. Numbers are counts, never time.

### 8.1 Notebook invitation [Q6 closed] *(decision — §12.1 deliverable)*

Onboarding's removal [D21] left the "your notebook is your workbook" moment without a home. Decided 2026-08-12 (Rishabh, adopting the design recommendation as-is):

- **Home:** a **one-time dismissible line on the first Practice hub** — a quiet note card at the top of the hub, above the Review/Read/Produce phase list. No modal, no beat, no motion (§3.6, calm mastery): a hairline card in the blueprint grammar, one line of body text plus a single quiet ✕.
- **Copy (frozen):** "तुम्हारी notebook ही तुम्हारी workbook है — app में कुछ नहीं लिखा जाता." Honest per Invariant 4 — the line itself states that nothing is written in the app. Microcopy is course content (§8): the line ships in each course bundle in its L1, English-L1 courses mirroring it 1:1; it joins the Sync-3 key list via the strings-freeze ticket.
- **Dismissal:** "one-time" means shown-until-dismissed, not one render — the line persists across hub visits until the learner taps ✕, then never returns. The flag is a one-shot app-level bit (the notebook habit is learned once, not per course), so switching courses does not resurrect it. No animation on dismiss beyond removal.

## 9. Visual language and brand [D15, D16, P1]

- **Brand [P1 — ratified]: "rung"** — lowercase wordmark in Barlow Condensed. Rationale: the unit the whole product is built on (one checkpoint, one step); शिडी was Marathi-bound and the name must now outlive any one language; four letters, plain-English meaningful.
- **Mark:** two vertical rails + three rungs, the **middle rung solid accent — "you are here"**. Drawn in the blueprint grammar: hairline 1.5, square corners, no rounding. Renders at 20 px in the app header beside the wordmark. Construction grid + icon-scale rules: `tokens.md` §6.4.
- **Alternates considered (not chosen):** *Paydan* (पायदान — Hindi for rung; warmer, but L1-tied again) · *Climb* (verb energy, more generic). Caution to test with P1: a Hindi ear may hear "rung" as रंग (colour).
- **System: Industry** — steel-blue blueprint; square corners, hairline borders, registration marks. Prototype holds token values of record.
- **Type:** Mukta for all Devanagari; Barlow / Barlow Condensed for UI. Devanagari body ≥ 18 px equivalent, line-height 1.6, no italics. Arabic script lines render via system fallback at quiet sizes (bundle a Naskh face if Arabic ships — engineering §10).
- **Colour semantics:** calm steel; amber exclusively for interference; green/red only in self-marks; success reserved for the unlock beat.
- **Motion:** the reveal, the hold-fill, the unlock beat — nothing else; reduced-motion safe.
- Dark mode: deferred.

## 10. Accessibility and context of use

- Tap targets ≥ 44 px (incl. the course dropdown); hold control thumb-sized; prev/next one-handed.
- Contrast on chips, fills, callouts: WCAG AA.
- Immersive sessions always show pause ✕; resume lossless.
- Reduced-motion respected everywhere.
- **RTL note:** Arabic script lines currently render inline via the bidi algorithm within LTR cards. If an Arabic course ships for real, spec proper RTL mirroring (`direction: rtl` on script blocks, mirrored layout audit) — deliverable §12.5.

## 11. Out of scope for design (v1)

Any translation/checking UI [D18]; any text input; grading or storage of learner writing; audio UI; onboarding screens [D21]; Levels 2–3 content design; course #2/#3 **content** design (the switcher and seam are in scope; en→es and en→ar remain samples); multi-user, social, notifications, gamification, tablet/desktop, marketing site; dark mode.

## 12. Remaining deliverables (these become GitHub issues)

1. ~~Notebook invitation's new home~~ **done** — one-time dismissible line on the first Practice hub, copy frozen (§8.1); [Q6] closed. The strings-freeze ticket adds the line to the Sync-3 key list.
2. ~~Exported design tokens~~ **done** — `design/tokens.css` (machine-usable) + `design/tokens.md` (usage rules). ~~Remaining: formal component specs for the staged rung card, course dropdown, retry interstitial, brand mark~~ **done** — all four specced with every state and exact token recipes in `tokens.md` §6.1–§6.4 (rung card's four [D22] stages, dropdown closed/open/switching + toast, retry's calm absences, brand-mark construction grid + icon scale); no new colors.
3. ~~Level-strip edge states~~ **done** — level just-completed, next-level unseal, all-three-complete specced in §5.1; [Q4] closed (rung beat reused on the level cell + its first rung, same duration, reduced-motion safe).
4. ~~Brand sign-off~~ **done** — rung ratified; remaining: app-icon + PWA splash from the mark (still worth an informal रंग-homophone check with P1).
5. RTL mirroring spec if/when an Arabic course is greenlit.
6. Microcopy freeze at Sync-3: Hindi set + English mirror set (per-course tables).

## 13. Open questions

- **[Q1 → Rishabh + native speaker]** Level names and L2/L3 module lists (per course).
- **[Q2]** ~~जांचो weight without a control~~ **closed** — dashed-plate design ratified in prototype.
- **[Q3]** ~~Elapsed tick default at first run~~ **closed** — ships **ON**. Decided 2026-08-12 (Rishabh, adopting the design recommendation as-is: numberless, calm, one tap to off). Ratifies what #98 / PR #150 shipped provisionally — `settings.elapsedTickEnabled` defaults `true` in `initialState()`, and the Settings → Practice toggle (#105) is the one tap to off — so **no engineering follow-up is required**. The §2 boundary note stands: the tick remains the only sanctioned time affordance.
- **[Q4]** ~~Unseal moment~~ **closed** — shared beat ratified; edge states specced in §5.1.
- **[Q5]** ~~Brand~~ **closed** — rung ratified [P1].
- **[Q6]** ~~Notebook invitation home~~ **closed** — first Practice hub, one-time dismissible line, copy frozen (§8.1).

## 14. Sync points with the engineering track

- **Sync-1:** schema v5 + state v6 freeze — course manifest, scriptMode, per-course progress, staged rung card states.
- **Sync-2:** ~~Sentence Detail order~~ closed [D10].
- **Sync-3:** copy freeze — both language sets + notebook-invitation line + course-switch toast.

## 15. Prototype divergences — reference for look and feel, never for these

- en→es (4 sentences) and en→ar (4 sentences) are **illustrative samples** proving the course seam — not shippable content; all content pends the per-course native gate.
- The prototype's course switch resets transient session state (by design) — product must persist and restore per-course session position too (engineering F1/F7).
- Storage figures are illustrative.

## 16. Glossary

- **Course:** one L1→L2 pair with its own content bundle, microcopy, progress, and ladder. One active at a time.
- **scriptMode:** per-course flag — `native` (script transfers; e.g. Devanagari for Hindi speakers) or `romanized` (romanization primary, script as quiet recognition line).
- **Level / rung / module / 11th sentence / exit ritual / "why" toggle / gentle elapsed tick / Pocket it:** unchanged from v3.2.
- **Staged rung card:** the current rung's single-CTA action area (fresh → studied → exit-ready → pending).
- **rung [P1 — ratified]:** the brand — the checkpoint itself; mark = rails + solid middle rung ("you are here").
