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
 * file it is complaining about). 29 keys: the 21 of PRD §4, the 5 the frozen screens forced
 * (PR #120) — `revealLabelComprehend` (Comprehension reveals the L1, not the L2) and the four
 * design §6.5 ritual keys (`ritual.stepTitle.*`, `ritual.check.plateLabel`) — and the 3 the
 * Ladder forced (#86): the counts-only pending line, the ownership footer and the sealed-level
 * toast, which PRD-design §5 prints as copy but PRD §4's inventory never listed.
 *
 * Those three are DRAFT values in all three bundles, flagged on #71 for ratification, exactly as
 * PR #120's were. The alternative was hardcoding three learner-facing lines in the shell, which
 * is the one thing this list exists to prevent.
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
  pendingAuthoring: [],
  /** The rung that just opened. */
  'verdict.line': ['{nextModule}'],
  /** Course pair labels, both directions. */
  switchToast: ['{to}', '{from}'],
  storageNote: [],
  notebookInvitation: [],
};
