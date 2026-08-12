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
 * Keys are DOT-PATHS into a nested object: `ritual.check.copy` is the path to
 * `{"ritual":{"check":{"copy":…}}}`, which is how the authored files are written. The checker
 * flattens before comparing.
 *
 * Provisional until the Sync-3 copy freeze (#71) ratifies the list; this file mirrors the freeze,
 * it does not lead it.
 */

/* ------------------------------------------------------------------ the list */

/**
 * Every key of a complete bundle, in file order (so validator output reads top-to-bottom like the
 * file it is complaining about). 94 keys: the 21 of PRD §4, the 5 the frozen screens forced
 * (PR #120) — `revealLabelComprehend` (Comprehension reveals the L1, not the L2) and the four
 * design §6.5 ritual keys (`ritual.stepTitle.*`, `ritual.check.plateLabel`) — the 3 the Ladder
 * forced (#86): the counts-only pending line, the ownership footer and the sealed-level toast,
 * which PRD-design §5 prints as copy but PRD §4's inventory never listed — the 7 the staged rung
 * card forced (#87): a label per CTA across the four [D22] stages, plus the fresh-rung note — the
 * 3 the module list forced (#88): its helper line, the "open full" label and the interference
 * -trap note on an expanded card — the 4 Sentence Detail forced (#89): the trap callout's
 * heading, the mnemonic's "pocket it" label, and the two pager buttons — the 4 the reveal
 * card forced (#93): the two self-mark segments [D11], the question the card asks above them, and
 * the Next that does not exist until one of them is chosen — the 3 the "why" panel forced
 * (#94): its toggle's two labels and the "open full" that leaves the session — the 17 the
 * session machine forced (#96): the Practice hub's title, its three phase lines and the line that
 * says the phases never gate, the two Begin labels, the three phase names the soft chips wear, the
 * honest answer to a Review chip with nothing due, and the summary's title, four count lines and
 * its way back to the Ladder — the 5 the Read phase forced (#97): the cue toggle's two labels
 * and its pager's three, the last of which names where the rung's last sentence goes — the 3
 * lossless resume forced (#99): the line that says a session is still open and where it stopped,
 * and the two ways out of it (pick it up, or leave it and start a new one) — and the 2 the
 * press-and-hold forced (#101): what the held control says once it is signed, and the way on to
 * part 2 (the prototype writes both in English for every course, which is the shell owning a
 * learner-facing sentence) — and the 5 the Verdict forced (#103): the three checklist lines the
 * ritual ends on, the honesty line under them, and the CTA that climbs back to the ladder — and
 * the 4 the Settings screen forced (#105): the course dropdown's status line in its two shapes
 * (mid-journey and pending-authoring, counts only — Invariant 2), the reassurance note that
 * switching erases nothing (Invariant 8 in the course's own words), and the privacy line the
 * screen ends on — and the 2 the storage section forced (#107): the durability line's two
 * states, protected and best-effort, because what `navigator.storage.persist()` answered is a
 * promise about the learner's ladder and a promise is the course's to word — and the 6
 * export/import forced (#108): the backup explainer (what the one file holds, and that none of
 * the learner's writing is in it — Invariant 4 in the course's own words), the import confirm's
 * replace warning and its two decisions, the friendly refusal when a file cannot be read, and
 * the toast the Ladder raises when a restore lands.
 *
 * Those sixty are DRAFT values in all three bundles, flagged on #71 for ratification, exactly
 * as PR #120's were. The alternative each time was hardcoding learner-facing lines in the shell,
 * which is the one thing this list exists to prevent.
 */
export const STRINGS_KEYS = [
  'cueLabel',
  'revealLabel',
  'revealLabelComprehend',
  'nudge.review',
  'nudge.read',
  'nudge.produce',
  'nudge.comprehend',
  'ritual.stepTitle.write',
  'ritual.stepTitle.check',
  'ritual.stepTitle.confirm',
  'ritual.constraint',
  'ritual.check.copy',
  'ritual.check.plateLabel',
  'ritual.check.resourcePerson',
  'ritual.check.resourceInternet',
  'ritual.check.caption',
  'ritual.confirm.holdLabel',
  'ritual.confirm.done',
  'ritual.confirm.toComprehension',
  'retry.title',
  'retry.body',
  'retry.cta',
  'ordinal',
  'ladder.pendingLine',
  'ladder.ownership',
  'ladder.sealedToast',
  'rungCard.startModule',
  'rungCard.freshNote',
  'rungCard.practice',
  'rungCard.revisitModule',
  'rungCard.exitRitual',
  'rungCard.module',
  'rungCard.practiceEarlier',
  'module.helper',
  'module.openFull',
  'module.trapNote',
  'sentence.trapHead',
  'sentence.pocketIt',
  'sentence.prev',
  'sentence.next',
  'mark.gotIt',
  'mark.missed',
  'mark.prompt',
  'mark.next',
  'why.show',
  'why.hide',
  'why.openFull',
  'read.showCue',
  'read.hideCue',
  'read.prev',
  'read.next',
  'read.toProduce',
  'practice.hubTitle',
  'practice.hubReview',
  'practice.hubRead',
  'practice.hubProduce',
  'practice.guideLine',
  'practice.beginReview',
  'practice.beginRead',
  'practice.phase.review',
  'practice.phase.read',
  'practice.phase.produce',
  'practice.nothingDue',
  'practice.summaryTitle',
  'practice.summaryReviewed',
  'practice.summaryGotIt',
  'practice.summaryProduced',
  'practice.summaryAtTwo',
  'practice.backToLadder',
  'practice.resumeLine',
  'practice.resumeContinue',
  'practice.resumeNew',
  'pendingAuthoring',
  'verdict.checkSentence',
  'verdict.checkChecked',
  'verdict.checkComprehension',
  'verdict.honesty',
  'verdict.line',
  'verdict.toLadder',
  'settings.statusLine',
  'settings.statusPending',
  'settings.switchNote',
  'settings.storageProtected',
  'settings.storageBestEffort',
  'settings.backupNote',
  'settings.importReplace',
  'settings.importConfirm',
  'settings.importCancel',
  'settings.importFailed',
  'settings.privacy',
  'switchToast',
  'importToast',
  'storageNote',
  'notebookInvitation',
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
  'nudge.review': [],
  'nudge.read': [],
  'nudge.produce': [],
  'nudge.comprehend': [],
  'ritual.stepTitle.write': [],
  'ritual.stepTitle.check': [],
  'ritual.stepTitle.confirm': [],
  /** How many sentences the new one may not be, and the word cap it must fit. */
  'ritual.constraint': ['{sentenceCount}', '{maxWords}'],
  'ritual.check.copy': [],
  'ritual.check.plateLabel': [],
  'ritual.check.resourcePerson': [],
  'ritual.check.resourceInternet': [],
  'ritual.check.caption': [],
  /** The rendered `ordinal` value — "my 3rd sentence" — not a bare number. */
  'ritual.confirm.holdLabel': ['{ordinal}'],
  'ritual.confirm.done': [],
  'ritual.confirm.toComprehension': [],
  'retry.title': [],
  'retry.body': [],
  'retry.cta': [],
  /** The number to ordinalise. */
  ordinal: ['{n}'],
  /**
   * The Ladder's pending line — counts only, never time (Invariant 2): which level the learner is
   * on, and how many of its rungs are still to climb.
   */
  'ladder.pendingLine': ['{level}', '{remaining}', '{total}'],
  'ladder.ownership': [],
  /** The sealed level, and how many rungs below it are left — the honest half of the seal rule. */
  'ladder.sealedToast': ['{level}', '{remaining}'],
  /**
   * The staged rung card [D22] — one CTA set per stage, and a label for every control in it.
   * None of them interpolates: a button label that needed a runtime value would be a sentence.
   * `rungCard.practice` is deliberately shared by the `studied` primary and the `exit_ready`
   * secondary, because it is the same tab either way.
   */
  'rungCard.startModule': [],
  /** The fresh rung's note — "nothing is locked; the tab stays open", the invariant in prose. */
  'rungCard.freshNote': [],
  'rungCard.practice': [],
  'rungCard.revisitModule': [],
  'rungCard.exitRitual': [],
  'rungCard.module': [],
  'rungCard.practiceEarlier': [],
  /**
   * The module list (#88) — the three lines the screen says in its own right: the helper above
   * the cards, the label on the control that opens a sentence in full, and the one-line warning
   * that a sentence carries an interference trap. None of them interpolates; the numbers on that
   * screen are counts the shell renders, not sentences.
   */
  'module.helper': [],
  'module.openFull': [],
  'module.trapNote': [],
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
   * The gated self-mark [D11] (#93) — the four words the reveal card owns. `gotIt` and `missed`
   * are the two segments, `prompt` is the question above them ("against your notebook — did you
   * have it?") and `next` is the control that only exists once one segment is chosen. They are a
   * group of their own rather than `practice.*` because the same four travel with the mark: the
   * Comprehension test asks its own question of its own pair ("same meaning" / "not quite"), and
   * that pair is #101's to add here beside these.
   *
   * `mark.next` is deliberately NOT `sentence.next`: the pager on Sentence Detail moves through a
   * module, this commits a self-mark and asks for the next card. A course may well word them the
   * same; sharing the key would mean it could never word them differently.
   */
  'mark.gotIt': [],
  'mark.missed': [],
  'mark.prompt': [],
  'mark.next': [],
  /**
   * The "why" panel (#94) — the three words the shared expansion says in its own right, on every
   * revealed surface (Review, Produce, Comprehension). The toggle carries two labels because it
   * says what it will DO, and the prototype writes both ("why" / "hide why"); `aria-expanded`
   * states the same thing to a screen reader, which is why the words may differ per course
   * without the control changing meaning.
   *
   * `why.openFull` is deliberately NOT `module.openFull`: the module list's control opens a
   * sentence from a browsing list, this one leaves a running session for it. A course may well
   * word them the same; sharing the key would mean it could never word them differently — the
   * call #93 made for `mark.next` against `sentence.next`.
   *
   * None of them interpolates: they are labels, not sentences. The delta-learning tag inside the
   * rows stays English furniture (`TagChip`, #89) — it names the model, it does not teach the
   * language.
   */
  'why.show': [],
  'why.hide': [],
  'why.openFull': [],
  /**
   * The Read phase (#97) — the five words that phase says in its own right: the cue toggle's two
   * labels, and the three on its pager. They are `read.*` rather than `practice.*` for the reason
   * `mark.*` and `why.*` are their own groups — they travel with the surface, not with the screen
   * that hosts it — and the toggle carries two labels for `why.*`'s reason: it names what it will
   * DO, so a course words "show cue" and "hide cue" itself while `aria-expanded` says the same
   * thing to a screen reader.
   *
   * `read.prev`/`read.next` are deliberately NOT `sentence.prev`/`sentence.next`: that pager walks
   * a module while browsing, this one walks a rung mid-session and its last step leaves the phase
   * (`read.toProduce` — "on to producing", the prototype's own label for it). A course may well
   * word the first two the same; sharing the key would mean it never could word them differently
   * — the call #93 made for `mark.next` and #94 for `why.openFull`.
   *
   * None of them interpolates: the position is the `3 / 10` count the shell renders, not a
   * sentence, and the read-aloud nudge the phase opens with is `nudge.read`, which PRD §4 has
   * carried since the first bundle.
   */
  'read.showCue': [],
  'read.hideCue': [],
  'read.prev': [],
  'read.next': [],
  'read.toProduce': [],
  /**
   * The session (#96) — the Practice hub, the phase chips and the summary (PRD §8 F4, PRD-design
   * §6.3). Seventeen keys, and the rule that put every one of them here is the same as the module
   * list's: the prototype writes this screen in English for every course, which is what a
   * prototype does and what a product cannot.
   *
   * **The counts interpolate; nothing else does.** `{count}` is the only new placeholder in the
   * canonical set, and it appears in the three hub lines and the four summary lines because a
   * number's place in a sentence is the language's business, not the shell's — a right-aligned
   * value column beside a label (the prototype's summary rows) would fix it at the end of every
   * line in every course. **They are counts, never time** (Invariant 2): the summary says how many
   * cards were seen, never how long they took, and the gentle elapsed tick — the one sanctioned
   * time affordance, numberless by construction — is #98's and has no string at all.
   *
   * `practice.phase.*` are the three soft chips AND the hub's three rows: one name per phase, used
   * wherever the phase is named, because they are the same three things.
   */
  'practice.hubTitle': [],
  /** How many due reviews this session will serve — 0 on the first rung. */
  'practice.hubReview': ['{count}'],
  /** How many sentences the rung holds. */
  'practice.hubRead': ['{count}'],
  /** How many sentences the Produce phase will serve — the rung's, least-produced first. */
  'practice.hubProduce': ['{count}'],
  'practice.guideLine': [],
  'practice.beginReview': [],
  'practice.beginRead': [],
  'practice.phase.review': [],
  'practice.phase.read': [],
  'practice.phase.produce': [],
  /** The Review chip's honest answer when nothing is due — the empty state, not an error. */
  'practice.nothingDue': [],
  'practice.summaryTitle': [],
  /** Review cards self-marked this session. */
  'practice.summaryReviewed': ['{count}'],
  /** How many of those were a got-it. */
  'practice.summaryGotIt': ['{count}'],
  /** Produce got-its counted this session — the number that reached the counters. */
  'practice.summaryProduced': ['{count}'],
  /** How many of the rung's sentences now stand at ≥ 2×, out of how many there are. */
  'practice.summaryAtTwo': ['{count}', '{total}'],
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
  pendingAuthoring: [],
  /**
   * The Verdict (#103) — the pass checklist, the honesty line under it, and the way back to the
   * ladder (PRD-design §6.7 flow 7). The prototype writes all five in English for every course,
   * which is what a prototype does and what this product cannot: they are the last words of the
   * ritual, and the ritual is the course's.
   *
   * The three checklist lines are the receipt for what the learner actually did, in the PRD's own
   * order — wrote the sentence, checked it themselves, self-marked the comprehension — and two of
   * them carry a number, because a number's place in a sentence is the language's business:
   * `{ordinal}` is the course's own word for "the 11th" (`ordinal`, rendered by the caller, as
   * `ritual.confirm.holdLabel` does), and `{count}` of `{total}` is the comprehension, both from
   * the module's own `exitTest.comprehendCount` — every item was marked "same meaning", because
   * anything else is a retry rather than a verdict — so a module that asked for three items reads
   * "3 of 3" with no code change. Two names rather than one repeated, so a course can put them in
   * its own order — Hindi says "of {total}, {count}" — the way `practice.summaryAtTwo` already
   * does.
   *
   * `verdict.honesty` is Principle §3.4 verbatim — "the app graded nothing; it saved nothing you
   * wrote" — and it is the one line on the screen that is about the app rather than the learner.
   * `verdict.toLadder` is the CTA that fires the unlock beat.
   */
  'verdict.checkSentence': ['{ordinal}'],
  'verdict.checkChecked': [],
  'verdict.checkComprehension': ['{count}', '{total}'],
  'verdict.honesty': [],
  /** The rung that just opened. */
  'verdict.line': ['{nextModule}'],
  'verdict.toLadder': [],
  /**
   * The Settings screen (#105, PRD §8 F0, F6) — the status line under the course dropdown, the
   * reassurance note beneath it, and the privacy line the screen ends on.
   *
   * The status line comes in two shapes because the current rung does: `statusLine` names the
   * rung in progress ("Level 1 · 2 of 10 passed · M3 in progress"), and `statusPending` is the
   * honest variant when that rung's sentences are not authored yet — it names no rung, because
   * there is nothing in progress to name. Both are **counts, never time** (Invariant 2), and the
   * counts are the SAME derivation the Ladder renders (`engine/progression.ts`), interpolated
   * into the course's own sentence: `{rung}` is the shell-rendered rung label ("M3"), not an id
   * the course must parse.
   *
   * `switchNote` is Invariant 8 in the course's own words — switching never erases anything —
   * and `privacy` is F6's closing promise: after install the app never talks to the internet.
   * Neither interpolates: they are promises, not counts.
   */
  'settings.statusLine': ['{level}', '{passed}', '{total}', '{rung}'],
  'settings.statusPending': ['{level}', '{passed}', '{total}'],
  'settings.switchNote': [],
  /**
   * The storage section's durability line (#107) — the quiet report of what the one
   * `navigator.storage.persist()` ask (#90, first persisted write) actually got. Two keys
   * because they are two different promises: `storageProtected` says the browser agreed to keep
   * the ladder, `storageBestEffort` is the honest state everywhere else — evictable, with F7's
   * export as the real backup. Neither interpolates: the browser's answer has no number in it.
   */
  'settings.storageProtected': [],
  'settings.storageBestEffort': [],
  /**
   * The Backup section's five (#108, PRD §8 F6/F7) — everything the learner reads around the one
   * export file and the one door back in. `backupNote` is the honest explainer above the buttons:
   * what the file holds (every course's ladder positions, counters, review queues, session
   * positions) and what it cannot hold — the learner's writing, because the app never has it
   * (Invariant 4). `importReplace` is the confirm's consequence line — the current progress goes,
   * an open session's place with it — and `importConfirm`/`importCancel` are its two decisions,
   * separate keys because they are two different promises (the call `practice.resumeContinue`/
   * `resumeNew` made). `importFailed` is the friendly half of a refusal; the path-naming reason
   * under it is `ImportError`'s and stays English, like every technical detail. None interpolates:
   * the per-course counts in the confirm are rows the shell renders, not sentences.
   */
  'settings.backupNote': [],
  'settings.importReplace': [],
  'settings.importConfirm': [],
  'settings.importCancel': [],
  'settings.importFailed': [],
  'settings.privacy': [],
  /** Course pair labels, both directions. */
  switchToast: ['{to}', '{from}'],
  /** The Ladder's arrival toast after a restore (#108) — a landing, so no number and no name. */
  importToast: [],
  storageNote: [],
  notebookInvitation: [],
};
