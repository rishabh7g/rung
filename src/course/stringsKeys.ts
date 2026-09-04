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
 * file it is complaining about) — save for the chrome block at the end (#351), which the authored
 * files nest into the groups it belongs to rather than repeating them.
 *
 * A key earns its place here on ONE test: **does a learner read it?** It used to be the narrower
 * "would the shell otherwise hardcode a learner-facing SENTENCE", with section labels, kickers and
 * tab names left out as English furniture — a distinction that survived only as long as every
 * course read English. #351 retired it: see the chrome block's note in `STRINGS_PLACEHOLDERS`.
 * What is still out is what no bundle could serve — `BootScreens` (it renders before one is
 * loaded), the manifest's own names (data), and technical detail like an import's failure reason.
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
  'sentence.done',
  'sentence.nextModule',
  'sentence.prevModule',
  'mark.gotIt',
  'mark.missed',
  'why.show',
  'why.hide',
  'hint.recall',
  'hint.production',
  'practice.hubTitle',
  'practice.hubCount',
  'practice.begin',
  'practice.summaryTitle',
  'practice.summaryScore',
  'practice.summaryToRitual',
  'practice.backToLadder',
  'practice.resumeContinue',
  'practice.resumeNew',
  'verdict.checkSentence',
  'verdict.checkComprehension',
  'verdict.line',
  'verdict.toLadder',
  'settings.importReplace',
  'settings.importConfirm',
  'settings.importCancel',
  'settings.importFailed',
  'switchToast',
  'importToast',
  /* --------------------------------------------------- the chrome (#351), appended together */
  'nav.ladder',
  'nav.practice',
  'nav.settings',
  'ladder.positionLine',
  'ladder.passed',
  'levelStrip.level',
  'rungCard.currentRung',
  'verdict.ritualComplete',
  'verdict.passedRung',
  'settings.title',
  'settings.kicker.course',
  'settings.kicker.practice',
  'settings.activeCourse',
  'settings.tick.title',
  'settings.tick.on',
  'settings.tick.off',
  'settings.storage.meter',
  'settings.backup.title',
  'settings.backup.export',
  'settings.backup.import',
  'settings.backup.onDevice',
  'settings.backup.inFile',
  'settings.backup.counts',
  'a11y.primaryNav',
  'a11y.pauseSession',
  'a11y.sentencePager',
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
   * Sentence Detail (#89) — the five things the screen says in its own right. Its ten section
   * labels stay English furniture (`WORD BY WORD`, `RULES USED` …), in the register of the
   * `M1 · SENTENCE 02` kicker; these five are not. The trap's heading is a sentence about the
   * learner's own first language ("Hindi will mislead you"), `pocketIt` is the mnemonic's label
   * and PRD §8 F3 names it as course copy, and the pager's controls are words the learner reads
   * — the same call #87 made for the rung card's labels. None of them interpolates: the pager's
   * position is a `n / total` count the shell renders, not a sentence.
   *
   * **`sentence.done` is the fifth, and it exists because the walk-through used to end in
   * silence** (#367). On a module's last sentence the pager simply disabled Next: the screen
   * closed on a piece of content, a dead control and nothing else, while the module LIST — the
   * other walk-through surface in the app — closes with a Practice link. So the trailing slot
   * becomes a hand-over rather than a disabled button, and this is its label.
   *
   * It is its OWN key rather than a reuse of a near neighbour, and the refusal is deliberate. Not
   * `rungCard.practice`
   * either: that is a bare tab name on a card, and this one has to carry "the module is
   * finished — practise it", which is a different sentence even where it lands on the same verb.
   *
   * **It names the destination**, because a hand-over that only says "done" is the silence this
   * key was minted to end. It was once a whole sentence — "Module finished — practise it" — and
   * that overflowed the pager by 65px at 360 and 105px at 320, because the slot is a third of a
   * row and not a line of prose. Naming the destination is the requirement; saying it in a
   * sentence never was.
   *
   * **`sentence.nextModule` is the sixth, and it exists because the destination is not always
   * the same place.** `sentence.done` hands over to Practice, which is the right end for the
   * rung the learner is CLIMBING. It is the wrong end for one they have already passed: a
   * learner re-reading M3 from the top of the ladder is reading, not practising, and sending
   * them to the practice hub both interrupts the read and — since the hub resolves the CURRENT
   * rung, not the module in front of them — lands them on a module they were not looking at.
   * So a passed module's last sentence hands over to the NEXT module's first sentence instead,
   * and this is that label.
   *
   * A separate key rather than a swap of `sentence.done`'s value, for the reason the block above
   * gives twice: these are two different sentences that happen to sit in one slot. A course may
   * well want "practise it" and "carry on" to share no word at all.
   *
   * **`sentence.prevModule` is the seventh, and it is the same hand-over pointing backwards.**
   * The leading slot went dead on a module's FIRST sentence for the reason the trailing slot went
   * dead on its last: nothing exists inside the module in that direction. But the LADDER does —
   * a learner reading M4 from its first sentence has M3 behind them — so the walk carries back to
   * the previous module's last sentence, and this is that label. `sentence.prev` stays what it
   * always was: paging within one module, where the destination needs no name because the learner
   * can see it. This one names the destination, exactly as its two neighbours do, because leaving
   * the module the learner is looking at is a thing to be told about before it happens.
   */
  'sentence.trapHead': [],
  'sentence.pocketIt': [],
  'sentence.prev': [],
  'sentence.next': [],
  'sentence.done': [],
  'sentence.nextModule': [],
  'sentence.prevModule': [],
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
   * The "why" panel (#94) — the two words the shared expansion says in its own right, on every
   * revealed surface (Practice, Comprehension). The toggle carries two labels because it says what
   * it will DO, and `aria-expanded` states the same thing to a screen reader, which is why the
   * words may differ per course without the control changing meaning.
   *
   * **The label must not read as a question** (#390). It used to be the prototype's "why" / "hide
   * why", and watched in use a first-time learner took it for something she was being asked —
   * she looked for where to type the answer. The control discloses the word rows under an answer
   * she has already seen; every course words it as the action it performs ("break it down"), never
   * as an interrogative.
   *
   * **`why.openFull` is gone.** It linked out to Sentence Detail from a running session, and no
   * surface offers that any more: Practice used to, from the Read card, and #388 retired both the
   * card and the link. Leaving a card for a whole screen of answers is leaving the recall behind,
   * which is the reason the Review card never offered it in the first place.
   *
   * Neither interpolates: they are labels, not sentences. The delta-learning tag inside the rows
   * stays English furniture (`TagChip`, #89) — it names the model, it does not teach the language.
   */
  'why.show': [],
  'why.hide': [],
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
   * guess happens in the learner's head before the reveal (the reveal card), `production` that one
   * got-it per sentence opens the rung's exit ritual (the rung card's dots row). There was a third, `check` — that the
   * checking is the learner's own — on the ritual's deliberately empty step 2; #348 retired that
   * step and the key with it, because a hint whose surface is gone is a thing said nowhere.
   *
   * None interpolates: the counts they are about are drawn beside them, and a hint that carried a
   * number would be a status line rather than a thing said once.
   */
  'hint.recall': [],
  'hint.production': [],
  /**
   * The session (#388) — the Practice hub and the summary (PRD §8 F3, PRD-design §6.3). Nine keys
   * now, and the rule that put every one of them here is the same as the module list's: the
   * prototype writes this screen in English for every course, which is what a prototype does and
   * what a product cannot.
   *
   * **There were eighteen.** The others named the parts of a two-phase session — a chip each for
   * Review and Read, a hub row and a Begin label each, the hand-over line between them, the "nothing
   * due" answer a chip could give, and three separate summary counts. #388 made Practice one
   * activity: one queue, one card type, one gesture. What has no part has no name, so the keys went
   * with the parts.
   *
   * **The counts interpolate; nothing else does.** A number's place in a sentence is the language's
   * business, not the shell's — a right-aligned value column beside a label (the prototype's
   * summary rows) would fix it at the end of every line in every course. **They are counts, never
   * time** (Invariant 2): the summary says how many cards were got, never how long they took, and
   * the gentle elapsed tick — the one sanctioned time affordance, numberless by construction — is
   * #98's and has no string at all.
   */
  'practice.hubTitle': [],
  /**
   * How many cards the next tap serves (#389) — the hub's one line, and the one promise this
   * screen makes. Fifteen whenever the ladder holds that much (`engine/session.ts`).
   */
  'practice.hubCount': ['{count}'],
  /** The one way in. It names no phase, because the session has none. */
  'practice.begin': [],
  'practice.summaryTitle': [],
  /**
   * The session's score: cards got, out of cards served. One line where there were three — every
   * card is the same card now, so one number is the whole honest report of a session.
   */
  'practice.summaryScore': ['{count}', '{total}'],
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
   * It does not interpolate: the count it follows is the line above it (`practice.summaryScore`).
   */
  'practice.summaryToRitual': [],
  'practice.backToLadder': [],
  /**
   * Lossless resume (#99, PRD §8 F4) — the hub's offer when the course has a session still open.
   *
   * **There was a line above them describing where the session stopped**, naming the phase and the
   * card as a count. It went with the phases (#389): the hub already prints how many cards the
   * session holds, and "Continue" on that screen is not a button a learner needs a paragraph to
   * understand. Counts, never time (Invariant 2) — nothing here says when the session was left or
   * how long ago, and the app has no calendar to say it with.
   *
   * The two controls are separate keys rather than one toggle because they are two different
   * promises: `resumeContinue` keeps the place AND the session (no second `sessionCount`, no
   * second tick of the review queue), `resumeNew` drops the place and spends a fresh session.
   */
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
   * Hindi says "of {total}, {count}" — the way `practice.summaryScore` already does.
   *
   * `verdict.toLadder` is the CTA that fires the unlock beat.
   */
  'verdict.checkSentence': ['{ordinal}'],
  'verdict.checkComprehension': ['{count}', '{total}'],
  /** The rung that just opened. */
  'verdict.line': ['{nextModule}'],
  'verdict.toLadder': [],
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
  /* ------------------------------------------------------------------- the chrome (#351) */
  /**
   * **The chrome** — the layer this list spent its first ninety keys deliberately excluding, and
   * the one place the exclusion turned out to be wrong.
   *
   * The rule above ("everything that is furniture — section labels, kickers, technical detail —
   * stays English in the shell") was written about the SHELL: labels that name the app's own
   * machinery to whoever is reading the code, in a register no learner was expected to dwell on.
   * It held while every course read English. It stopped holding the moment hi-en and hi-mr
   * shipped: a Hindi-L1 learner opening the app met `Ladder`, `Practice`, `Settings`, `LEVEL 1 ·
   * 2 OF 10`, `PASSED` and a Settings screen in a language the course exists to teach them out
   * of. Furniture a learner cannot read is not furniture, it is the first screen — so the test a
   * key must pass is not "is this a sentence" but "does a learner read it".
   *
   * Every row below fails that second test in English and passes it here. What is still excluded
   * is what genuinely never reaches a learner in their own language: `BootScreens` (it renders
   * BEFORE any bundle is loaded, so a key it read would not exist yet), the manifest's own `l1` /
   * `l2` / `pairLabel` names (data, interpolated as `{course}` below), and `ImportError`'s
   * path-naming reason (a technical detail, shown under the course's friendly line).
   *
   * **The ALL-CAPS kickers keep their key and their CSS.** The capitals live in the authored
   * English, not in a `text-transform` — Devanagari has no capitals and any transform is a no-op
   * on it — so the hi-* bundles author the same keys as ordinary Devanagari and the letter-spacing
   * that makes a kicker a kicker is unchanged. No per-script styling, one key per label.
   *
   * The block is appended whole rather than interleaved, so it reads as the one decision it is.
   */
  'nav.ladder': [],
  'nav.practice': [],
  'nav.settings': [],
  /**
   * The Ladder's position line and its passed marker (#86) — counts, never time (Invariant 2),
   * and the same derivation the rung list renders. `positionLine` names all
   * three numbers because where a count sits in a sentence is the language's business; `passed`
   * is the status word on a climbed rung's row and carries none, the count being the line above.
   */
  'ladder.positionLine': ['{level}', '{passed}', '{total}'],
  'ladder.passed': [],
  /** One cell's own number, in the strip's tighter register than the position line's. */
  'levelStrip.level': ['{level}'],
  /**
   * The staged rung card's kicker [D22] — `{rung}` is the shell-rendered rung label ("M3", from
   * `rungLabel`), never an id the course must parse.
   */
  'rungCard.currentRung': ['{rung}'],
  /**
   * The Verdict's two head lines (#103) — the kicker that says the ritual is over, and the rung
   * it was over for. `passedRung` takes the same shell-rendered `{rung}` the card's kicker does;
   * it is a separate key from `ladder.passed` because one is a row's status marker in a list and
   * the other is a screen's title, and a course may want a fuller word for the second.
   */
  'verdict.ritualComplete': [],
  'verdict.passedRung': ['{rung}'],
  /**
   * **Settings, all of it** (#105, #107, #108; cut to this by #392–#394) — the screen a learner
   * opens to change their course, which is the one screen that cannot be in a language they may
   * not have.
   *
   * **Three cards, so two kickers and a title.** There were four kickers and a second dropdown:
   * a LANGUAGE card asked which language the learner reads, and the COURSE card below it showed
   * only that language's courses. One decision, two controls, with a dependency the learner had
   * to infer — so the pairs themselves became the choice and `yourLanguage` went with the filter
   * it labelled. `activeCourse` labels the one dropdown that is left; its OPTIONS stay manifest
   * data (`pairLabel`), because a key per course would be a second list to keep in step with
   * `courses.json` and it would have to be translated into every course to say the same name.
   *
   * `tick.*` is #98's one sanctioned time affordance — the row title and the two segment labels,
   * which are separate keys because they are two states rather than one toggle's name. The note
   * that used to explain the line went with #394: three rendered lines about a 2px hairline, next
   * to two buttons that already say what they do.
   *
   * `storage.meter` is what survives #107's computed section: one sentence over the browser's own
   * two numbers (`{used}` / `{quota}`, formatted by `formatBytes` — the shell renders the unit,
   * the course renders the sentence around it), inside the Backup card. The per-course rows and
   * the progress row went with the meter they captioned: there is no per-course delete, so a byte
   * figure per course was a number nobody could act on.
   *
   * `backup.*` is #108's: the section title, its two buttons, and the confirm's two sides —
   * `onDevice` / `inFile` label the halves and `counts` is the pair of numbers under each, one key
   * because "2 passed · 5 sessions" is one line whose word order is the language's.
   */
  'settings.title': [],
  'settings.kicker.course': [],
  'settings.kicker.practice': [],
  'settings.activeCourse': [],
  'settings.tick.title': [],
  'settings.tick.on': [],
  'settings.tick.off': [],
  'settings.storage.meter': ['{used}', '{quota}'],
  'settings.backup.title': [],
  'settings.backup.export': [],
  'settings.backup.import': [],
  'settings.backup.onDevice': [],
  'settings.backup.inFile': [],
  'settings.backup.counts': ['{passed}', '{sessions}'],
  /**
   * The three accessible names nothing draws (#84) — the nav's landmark, the immersive header's
   * pause ✕, and Sentence Detail's pager landmark. There was a fourth, for the storage meter's
   * `role="meter"`; #393 replaced the meter with a sentence, which needs no name because it is
   * one.
   *
   * They are course copy for the reason the visible labels are, only more so: a screen reader is
   * the one surface where the label IS the interface, and a Hindi learner navigating by landmark
   * heard four English words with no picture beside them to recover the meaning from. None
   * interpolates — an accessible name that carried a runtime value would be a live region.
   */
  'a11y.primaryNav': [],
  'a11y.pauseSession': [],
  'a11y.sentencePager': [],
};
