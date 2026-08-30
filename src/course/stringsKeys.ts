/**
 * The canonical strings.json contract (#76) — the ONE list of microcopy keys a course must ship.
 *
 * PRD §4: "strings.json per course … the shell has no course-specific strings", and §6.5:
 * completeness is validated against a fixed key list, where a **missing key is a build failure**.
 * That is only safe because there is no fallback copy anywhere in the shell — a key the build
 * lets through missing is a blank screen for the learner, not an English word.
 *
 * It lives HERE, in the course layer, and the build imports it (#80): the runtime is the side
 * that must not break, so `Strings` derives from this list (`./strings.ts`) and
 * `tools/strings-check.ts` validates authored files against the very same array. It moved out of
 * `tools/` the moment the app needed it — a build-time module the bundle imports is the kind of
 * dependency that grows a second copy of the list, which is the one thing this file forbids.
 *
 * Two tables, welded together by the type system: `STRINGS_KEYS` is the list, and
 * `STRINGS_PLACEHOLDERS` is `Record<StringsKey, …>`, so a key added to one without the other
 * fails `tsc`. Nothing else in the repo may hold a second copy of either —
 * `stringsKeys.test.ts` proves there is exactly one declaration of each.
 *
 * Keys are DOT-PATHS into a nested object: `ritual.stepTitle.check` is the path to
 * `{"ritual":{"stepTitle":{"check":…}}}`, which is how the authored files are written. The checker
 * flattens before comparing.
 *
 * NOT FROZEN. The Sync-3 freeze (#71) — which held this list identical to PRD-design §8.2 — was
 * lifted by owner decision on 2026-08-13 for the read-once copy removal (#225–#233). The list is
 * now smaller than §8.2, which stands as the historical v3.3 design package rather than the
 * shipped key list. `design/` is read-only; `docs/design-contract.md` records what diverged and
 * why. Do not restate that history here — a per-key narrative in this comment is what made it
 * unmaintainable.
 */

/* ------------------------------------------------------------------ the list */

/**
 * Every key of a complete bundle, in file order (so validator output reads top-to-bottom like the
 * file it is complaining about).
 *
 * A key earns its place here on ONE test: the shell would otherwise have to hardcode a
 * learner-facing sentence, which is the one thing this list exists to prevent. Everything that is
 * furniture — section labels, kickers, technical detail — stays English in the shell and never
 * appears below.
 *
 * The per-key grouping and reasoning live in `STRINGS_PLACEHOLDERS` below, beside the rows they
 * are about; the removals live in `docs/design-contract.md`.
 */
export const STRINGS_KEYS = [
  'cueLabel',
  'revealLabel',
  'revealLabelComprehend',
  'retry.kicker',
  'retry.title',
  'retry.cta',
  'retry.pending',
  'ordinal',
  'ladder.learning',
  'ladder.pendingLine',
  'ladder.sealedToast',
  'rungCard.startModule',
  'rungCard.practice',
  'rungCard.revisitModule',
  'rungCard.exitRitual',
  'rungCard.module',
  'sentence.trapHead',
  'sentence.pocketIt',
  'sentence.prev',
  'sentence.next',
  'mark.gotIt',
  'mark.missed',
  'why.show',
  'why.hide',
  'why.openFull',
  'hint.recall',
  'hint.production',
  'read.showCue',
  'read.hideCue',
  'read.prev',
  'read.next',
  'read.finish',
  'practice.hubTitle',
  'practice.hubReview',
  'practice.hubRead',
  'practice.beginReview',
  'practice.beginRead',
  'practice.phase.review',
  'practice.phase.read',
  'practice.nothingDue',
  'practice.upNext',
  'practice.summaryTitle',
  'practice.summaryReviewed',
  'practice.summaryGotIt',
  'practice.summaryMarked',
  'practice.summaryToRitual',
  'practice.backToLadder',
  'practice.resumeLine',
  'practice.resumeContinue',
  'practice.resumeNew',
  'verdict.checkSentence',
  'verdict.checkComprehension',
  'verdict.line',
  'verdict.toLadder',
  'settings.yourLanguage',
  'settings.statusLine',
  'settings.statusPending',
  'settings.importReplace',
  'settings.importConfirm',
  'settings.importCancel',
  'settings.importFailed',
  'switchToast',
  'importToast',
] as const;

/** A dot-path into strings.json — the union of the canonical list. */
export type StringsKey = (typeof STRINGS_KEYS)[number];

/* ---------------------------------------------------------- the placeholders */

/**
 * The `{brace}` placeholders each value must carry — the same in every course, because the shell
 * interpolates the same runtime values whatever the language. A translation that drops `{ordinal}`
 * loses the sentence number silently, and one that invents `{name}` renders the braces verbatim;
 * both are build failures, checked as a SET (order and repetition are the translator's business).
 *
 * Exhaustive by construction: `Record<StringsKey, …>` means a new key needs a row here, even an
 * empty one, so "did anyone decide about placeholders?" is never an open question.
 */
export const STRINGS_PLACEHOLDERS: Readonly<Record<StringsKey, readonly string[]>> = {
  cueLabel: [],
  revealLabel: [],
  revealLabelComprehend: [],
  /**
   * What is left of the retry interstitial's five layers (tokens.md §6.3), top to bottom — kicker,
   * title, CTA; the body and the reassurance were read-once prose and went on #231. All course
   * copy, all counterless by construction: none interpolates, because an attempt number is the one
   * thing that screen must never render (Invariant 4).
   *
   * `retry.pending` (#318) is the fourth, and it belongs to the ITEM rather than the interstitial:
   * once a round holds a "not quite" the redraw is certain, and the learner finishing the remaining
   * item deserves to know they are practising rather than still being tested. It says the round
   * redraws — never how many items were missed, and never which: the marks are dropped on the way
   * into the interstitial and there is no number here to render.
   */
  'retry.kicker': [],
  'retry.title': [],
  'retry.cta': [],
  'retry.pending': [],
  /** The number to ordinalise. */
  ordinal: ['{n}'],
  /**
   * **What the learner is learning** (#350), on the home screen, in their own language.
   *
   * The Ladder names the level, the rung and what is left to climb, and named nothing about the
   * COURSE — a learner opening the app saw a ladder without a subject. This is the one line that
   * says it.
   *
   * It is a fully authored phrase per bundle and **not** `{l2}` interpolated out of the manifest,
   * which is the whole reason it is a key at all: `courses.json`'s `l2` holds English words
   * ("Marathi", "Russian"), and an English noun dropped into a Hindi sentence is the shell
   * speaking for the course (PRD §4) in the one place a learner looks first. Each bundle names its
   * own target language, in its own words and its own script.
   *
   * It does not interpolate for the same reason `hint.*` does not: there is no number in it, and
   * a phrase built out of parts is a sentence the shell would be assembling.
   */
  'ladder.learning': [],
  /**
   * The Ladder's pending line — counts only, never time (Invariant 2): which level the learner is
   * on, and how many of its rungs are still to climb.
   */
  'ladder.pendingLine': ['{level}', '{remaining}', '{total}'],
  /** The sealed level, and how many rungs below it are left — the honest half of the seal rule. */
  'ladder.sealedToast': ['{level}', '{remaining}'],
  /**
   * The staged rung card [D22] — one CTA set per stage, and a label for every control in it.
   * None of them interpolates: a button label that needed a runtime value would be a sentence.
   * `rungCard.practice` is deliberately shared by the `studied` primary and the `exit_ready`
   * secondary, because it is the same tab either way.
   *
   * Five, not the seven #87 minted: the fresh rung's note went with the read-once copy on #228,
   * and `practiceEarlier` — the pending stage's "practice earlier rungs" link — went with the
   * pending branch itself, which #228 removed because the Practice hub has nothing to serve for
   * an unauthored rung. The key outlived its only render site by five PRs and went on #233.
   */
  'rungCard.startModule': [],
  'rungCard.practice': [],
  'rungCard.revisitModule': [],
  'rungCard.exitRitual': [],
  'rungCard.module': [],
  /**
   * Sentence Detail (#89) — the four things the screen says in its own right. Its ten section
   * labels stay English furniture (`WORD BY WORD`, `RULES USED` …), in the register of the
   * `M1 · SENTENCE 02` kicker; these four are not. The trap's heading is a sentence about the
   * learner's own first language ("Hindi will mislead you"), `pocketIt` is the mnemonic's label
   * and PRD §8 F3 names it as course copy, and the two pager buttons are controls the learner
   * reads — the same call #87 made for the rung card's labels. None of them interpolates: the
   * pager's position is a `n / total` count the shell renders, not a sentence.
   */
  'sentence.trapHead': [],
  'sentence.pocketIt': [],
  'sentence.prev': [],
  'sentence.next': [],
  /**
   * The gated self-mark [D11] (#93) — the three words the reveal card owns. `gotIt` and `missed`
   * are the two segments, and `next` is the control that only exists once one segment is chosen.
   * The question that used to sit above them (`mark.prompt`) went with the read-once copy on
   * #225. They are a group of their own rather than `practice.*` because the same words travel
   * with the mark: the
   * Comprehension test asks its own question of its own pair ("same meaning" / "not quite"), and
   * that pair is #101's to add here beside these.
   *
   * `mark.next` stood beside them until #313. The mark is now the whole of the interaction — it
   * lights, a short window lets the learner change it, and the card commits itself — so the Next
   * that used to confirm a decision the learner had already made has no label because it has no
   * button. What the window protects is what `mark.next` protected: one result, the one they meant.
   */
  'mark.gotIt': [],
  'mark.missed': [],
  /**
   * The "why" panel (#94) — the three words the shared expansion says in its own right, on every
   * revealed surface (Review, Read, Comprehension). The toggle carries two labels because it
   * says what it will DO, and the prototype writes both ("why" / "hide why"); `aria-expanded`
   * states the same thing to a screen reader, which is why the words may differ per course
   * without the control changing meaning.
   *
   * `why.openFull` was deliberately never shared with the module list's own "open full" label:
   * that one opened a sentence from a browsing list, this one leaves a running session for it. A
   * course may well word them the same; sharing the key would mean it could never word them
   * differently — the call #93 made for `mark.next` against `sentence.next`. The list's twin
   * rendered nowhere in the end and went on #229; this one is the survivor, on the surface that
   * shows it.
   *
   * None of them interpolates: they are labels, not sentences. The delta-learning tag inside the
   * rows stays English furniture (`TagChip`, #89) — it names the model, it does not teach the
   * language.
   */
  'why.show': [],
  'why.hide': [],
  'why.openFull': [],
  /**
   * The show-once hints (#319) — the three facts the product is built on, and the only copy in the
   * app that is allowed to be instructional.
   *
   * #225–#233 removed the app's read-once prose on the argument that an instruction which never
   * changes is read once and skimmed thirty times. That argument is about copy that is ALWAYS
   * there; it is not an argument for never saying the thing at all, and the app has no onboarding
   * ([D21]: first run lands on the Ladder), so a first-run learner was told none of it. These are
   * the answer: each renders on its surface exactly once per install and never again
   * (`shell/hints.ts`), so the thirty-first session sees the clean screen #225 asked for and the
   * first one is not left guessing.
   *
   * One per surface, and each is the fact that surface cannot show by itself: `recall` that the
   * recall happens outside the app (the reveal card), `production` that one marked sentence apiece
   * opens the rung's exit ritual (the rung card's dots row). There was a third, `check` — that the
   * checking is the learner's own — on the ritual's deliberately empty step 2; #348 retired that
   * step and the key with it, because a hint whose surface is gone is a thing said nowhere.
   *
   * None interpolates: the counts they are about are drawn beside them, and a hint that carried a
   * number would be a status line rather than a thing said once.
   */
  'hint.recall': [],
  'hint.production': [],
  /**
   * The Read phase (#97) — the five words that phase says in its own right: the cue toggle's two
   * labels, and the three on its pager. They are `read.*` rather than `practice.*` for the reason
   * `mark.*` and `why.*` are their own groups — they travel with the surface, not with the screen
   * that hosts it — and the toggle carries two labels for `why.*`'s reason: it names what it will
   * DO, so a course words "show cue" and "hide cue" itself while `aria-expanded` says the same
   * thing to a screen reader.
   *
   * `read.prev`/`read.next` are deliberately NOT `sentence.prev`/`sentence.next`: that pager walks
   * a module while browsing, this one walks a rung mid-session and its last step ends it
   * (`read.finish`). A course may well word the first two the same; sharing the key would mean it
   * never could word them differently — the call #93 made for `mark.next` and #94 for
   * `why.openFull`.
   *
   * None of them interpolates: the position is the `3 / 10` count the shell renders, not a
   * sentence.
   */
  'read.showCue': [],
  'read.hideCue': [],
  'read.prev': [],
  'read.next': [],
  /**
   * Read's last step (#349). It used to read `read.toProduce` — "on to producing" — because the
   * phase handed over to Produce; with that phase retired, reading the rung through IS the end of
   * the session, and the label says so. The issue asked for an existing key reused; none says
   * "this ends here", and a last card that ends a session in silence is worse than one key.
   */
  'read.finish': [],
  /**
   * The session (#96) — the Practice hub, the phase chips and the summary (PRD §8 F4, PRD-design
   * §6.3). Eighteen keys, and the rule that put every one of them here is the same as the module
   * list's: the prototype writes this screen in English for every course, which is what a
   * prototype does and what a product cannot.
   *
   * **The counts interpolate; nothing else does.** `{count}` is the only new placeholder in the
   * canonical set, and it appears in the two hub lines and the three summary lines because a
   * number's place in a sentence is the language's business, not the shell's — a right-aligned
   * value column beside a label (the prototype's summary rows) would fix it at the end of every
   * line in every course. **They are counts, never time** (Invariant 2): the summary says how many
   * cards were seen, never how long they took, and the gentle elapsed tick — the one sanctioned
   * time affordance, numberless by construction — is #98's and has no string at all.
   *
   * `practice.phase.*` are the soft chips AND the hub's rows: one name per phase, used wherever the
   * phase is named, because they are the same two things.
   */
  'practice.hubTitle': [],
  /** How many due reviews this session will serve — 0 on the first rung. */
  'practice.hubReview': ['{count}'],
  /** How many sentences the rung holds. */
  'practice.hubRead': ['{count}'],
  'practice.beginReview': [],
  'practice.beginRead': [],
  'practice.phase.review': [],
  'practice.phase.read': [],
  /** The Review chip's honest answer when nothing is due — the empty state, not an error. */
  'practice.nothingDue': [],
  /**
   * Where the next tap goes (#317) — named on the last card of a phase, so a hand-over the session
   * used to make silently is one the learner sees coming. `{phase}` is the course's own name for
   * it (`practice.phase.*`, the same one the chips and the resume line use), because a phase is
   * named the same wherever it is named.
   *
   * Read's pager says its own end on its last step (`read.finish`), which is why this is the
   * Review card's line and not a second copy of the same idea.
   */
  'practice.upNext': ['{phase}'],
  'practice.summaryTitle': [],
  /** Review cards self-marked this session. */
  'practice.summaryReviewed': ['{count}'],
  /** How many of those were a got-it. */
  'practice.summaryGotIt': ['{count}'],
  /** How many of the rung's sentences are marked through, out of how many there are (#349). */
  'practice.summaryMarked': ['{count}', '{total}'],
  /**
   * The way on when that count is the whole rung (#315) — the exit ritual, offered at the one
   * moment the learner has just earned it.
   *
   * The summary deliberately carried no such line before: the ritual is the Ladder's loud action
   * ([D22] `exit_ready`), and offering an unlock from two places is how one of them ends up out of
   * step with the rule. It still is — this is a LINK, not a second gate. `exit_available` is
   * derived in one place (`engine/progression.ts`) and re-asked by the route's own guard, so a
   * summary that offered the ritual wrongly would land on the module exactly as a typed URL does.
   * What changes is only that the app stops going quiet at the moment the next step opens.
   *
   * It does not interpolate: the count it follows is the line above it (`summaryAtTwo`).
   */
  'practice.summaryToRitual': [],
  'practice.backToLadder': [],
  /**
   * Lossless resume (#99, PRD §8 F4) — the hub's offer when the course has a session still open.
   *
   * The line says WHERE it stopped, because a resume the learner cannot picture is a button they
   * will not press: the phase in the course's own name (`practice.phase.*`, interpolated as
   * `{phase}` — one name per phase, wherever a phase is named) and the card as a `{count}` of
   * `{total}`. Counts, never time (Invariant 2): nothing here says when the session was left,
   * how long ago, or how long it ran — the app has no calendar to say it with.
   *
   * The two controls are separate keys rather than one toggle because they are two different
   * promises: `resumeContinue` keeps the place AND the session (no second `sessionCount`, no
   * second tick of the review queue), `resumeNew` drops the place and spends a fresh session.
   */
  'practice.resumeLine': ['{phase}', '{count}', '{total}'],
  'practice.resumeContinue': [],
  'practice.resumeNew': [],
  /**
   * The Verdict (#103) — the pass checklist and the way back to the ladder (PRD-design §6.7
   * flow 7). The prototype writes them in English for every course, which is what a prototype does
   * and what this product cannot: they are the last words of the ritual, and the ritual is the
   * course's.
   *
   * The two checklist lines are the receipt for what the learner actually did, in the PRD's own
   * order — wrote the sentence, self-marked the comprehension — and both carry a number, because a
   * number's place in a sentence is the language's business: `{ordinal}` is the course's own word
   * for "the 11th" (`ordinal`, rendered by the caller, as `ritual.confirm.holdLabel` does), and
   * `{count}` of `{total}` is the comprehension, both from the module's own
   * `exitTest.comprehendCount` — every item was marked "same meaning", because anything else is a
   * retry rather than a verdict — so a module that asked for three items reads "3 of 3" with no
   * code change. Two names rather than one repeated, so a course can put them in its own order —
   * Hindi says "of {total}, {count}" — the way `practice.summaryAtTwo` already does.
   *
   * `verdict.toLadder` is the CTA that fires the unlock beat.
   */
  'verdict.checkSentence': ['{ordinal}'],
  'verdict.checkComprehension': ['{count}', '{total}'],
  /** The rung that just opened. */
  'verdict.line': ['{nextModule}'],
  'verdict.toLadder': [],
  /**
   * The Settings screen (#105, PRD §8 F0, F6) — the status line under the course dropdown, in the
   * two shapes the current rung comes in: `statusLine` names the rung in progress ("Level 1 · 2
   * of 10 passed · M3 in progress"), and `statusPending` is the honest variant when that rung's
   * sentences are not authored yet — it names no rung, because there is nothing in progress to
   * name. Both are **counts, never time** (Invariant 2), and the counts are the SAME derivation
   * the Ladder renders (`engine/progression.ts`), interpolated into the course's own sentence:
   * `{rung}` is the shell-rendered rung label ("M3"), not an id the course must parse.
   *
   * The reassurance note under the dropdown, the storage section's two durability lines (#107)
   * and the privacy line the screen ended on were read once and skimmed past forever; they went
   * on #232 with the screen's other explainers.
   */
  /**
   * **"Your language"** (#323) — the label on the section that asks the first question Settings
   * should have asked all along.
   *
   * The screen led with a COURSE dropdown reading "hindi → marathi", which makes the learner
   * answer "what am I studying" before "what do I read". This names the L1 choice, and it is
   * course copy for the reason every label here is: a learner picking their own language is
   * reading it in the language they already have.
   *
   * The OPTIONS under it need no keys — they are the manifest's own `l1` names ("English",
   * "Hindi"), which are data. A key per language would be a second list to keep in step with
   * `courses.json`, and it would have to be translated into every course to say the same word.
   */
  'settings.yourLanguage': [],
  'settings.statusLine': ['{level}', '{passed}', '{total}', '{rung}'],
  'settings.statusPending': ['{level}', '{passed}', '{total}'],
  /**
   * The Backup section's four (#108, PRD §8 F6/F7) — what the learner reads around the one door
   * back in. `importReplace` is the confirm's consequence line, kept when the explainer above the
   * buttons went (#232) because a destructive confirm that does not say what it destroys is a
   * bug: it states that progress in every course is replaced by the file's, and
   * `importConfirm`/`importCancel` are its two decisions, separate keys because they are two
   * different promises (the call `practice.resumeContinue`/`resumeNew` made). `importFailed` is
   * the friendly half of a refusal; the path-naming reason under it is `ImportError`'s and stays
   * English, like every technical detail. None interpolates: the per-course counts in the confirm
   * are rows the shell renders, not sentences.
   */
  'settings.importReplace': [],
  'settings.importConfirm': [],
  'settings.importCancel': [],
  'settings.importFailed': [],
  /** Course pair labels, both directions. */
  switchToast: ['{to}', '{from}'],
  /** The Ladder's arrival toast after a restore (#108) — a landing, so no number and no name. */
  importToast: [],
};
