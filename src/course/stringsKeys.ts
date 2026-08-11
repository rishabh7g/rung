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
 * file it is complaining about). 47 keys: the 21 of PRD §4, the 5 the frozen screens forced
 * (PR #120) — `revealLabelComprehend` (Comprehension reveals the L1, not the L2) and the four
 * design §6.5 ritual keys (`ritual.stepTitle.*`, `ritual.check.plateLabel`) — the 3 the Ladder
 * forced (#86): the counts-only pending line, the ownership footer and the sealed-level toast,
 * which PRD-design §5 prints as copy but PRD §4's inventory never listed — the 7 the staged rung
 * card forced (#87): a label per CTA across the four [D22] stages, plus the fresh-rung note — the
 * 3 the module list forced (#88): its helper line, the "open full" label and the interference
 * -trap note on an expanded card — the 4 Sentence Detail forced (#89): the trap callout's
 * heading, the mnemonic's "pocket it" label, and the two pager buttons — and the 4 the reveal
 * card forced (#93): the two self-mark segments [D11], the question the card asks above them, and
 * the Next that does not exist until one of them is chosen.
 *
 * Those twenty-one are DRAFT values in all three bundles, flagged on #71 for ratification, exactly
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
  'pendingAuthoring',
  'verdict.line',
  'switchToast',
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
  pendingAuthoring: [],
  /** The rung that just opened. */
  'verdict.line': ['{nextModule}'],
  /** Course pair labels, both directions. */
  switchToast: ['{to}', '{from}'],
  storageNote: [],
  notebookInvitation: [],
};
