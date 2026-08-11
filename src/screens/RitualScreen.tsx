/**
 * The exit ritual's arc, steps 1 and 2 (#100) — the constraint, and the check step that is
 * guidance and nothing else (PRD §8 F5 [D18]; PRD-design §6.5 flow 5 [Q2 answered]).
 *
 * This is the product's honesty moment, and two invariants are the whole design of it:
 *
 *   • **Step 2 contains zero interactive elements** — no button, no link, no copy action, no
 *     field. The app says in words where to go and does nothing else, and its own caption says
 *     the absence of controls is deliberate (`ritual.check.caption`). Checking is the learner's
 *     activity, fully outside the app (Invariant 5), so a control here — even a helpful one, even
 *     a dictionary link — would be the app taking the job back. `RitualScreen.test.tsx` queries
 *     every interactive ARIA role inside the plate's step and asserts nothing answers.
 *   • **The learner's sentence never enters the app** (Invariant 4, Invariant 6 "no input
 *     fields"). Nothing in this flow holds what they wrote: no state, no ref, no prop, no
 *     storage. The same test scans this file for the constructs a sentence could arrive or live
 *     in, because the way that invariant breaks is a "small" convenience, not a decision.
 *
 * What the screen actually knows is two numbers and its own course's words. The numbers come from
 * the rung's own module file — how many sentences it teaches (`{sentenceCount}`, which the new
 * one may not be one of) and the word cap its complexity declares (`{maxWords}`) — so the
 * constraint is this rung's, never a hardcoded "5 words". The ordinal in the head is the same
 * count plus one, rendered through the course's own `ordinal` template — its word for "the 11th",
 * the sentence after the ten this rung taught.
 *
 * **The guard is `exit_available`** (#95): a rung is not ready for its ritual until every sentence
 * in it has been self-marked got-it twice, and this route is a real deep link (HashRouter, an
 * installable PWA), so it is reachable with the ladder anywhere. A rung that is not produced out
 * lands on its module — where the work actually is — and a finished ladder lands on the Ladder.
 * The predicate is the very one the Ladder's card reads (`useProgression` → `useExitAvailable`),
 * so the card and the route cannot disagree about whether the ritual is open.
 *
 * **Step 3 is a marked slot, not a stub.** The press-and-hold confirmation is #101's: it renders
 * its own title here (the arc is three steps from the first frame, because a two-step arc that
 * grows a third is a different screen), and the control goes where the comment says.
 *
 * Every learner-facing word is the course's (`ritual.*`, PRD §4). The English is structural
 * furniture in the register of the module list's `M1 · MODULE` kicker, and the `1 / 2` is a
 * count — the prototype writes "part 1 of 2", which would be a shell-owned sentence.
 */
import { Globe, Users } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import { useCourse } from '../course/CourseProvider.tsx';
import { useModule } from '../course/content.ts';
import { interpolate, useStrings } from '../course/strings.ts';
import { currentRungId, deriveStatuses } from '../engine/progression.ts';
import { HOME_PATH } from '../shell/routes.tsx';
import { rungLabel } from './ladder/rungLabel.ts';
import { useProgression } from './useProgression.ts';
import styles from './RitualScreen.module.css';

/** The ritual is two parts: this arc, then Comprehension (#102). A count, not a sentence. */
const RITUAL_PARTS = 2;

/**
 * The route's component: it answers "which rung, if any" and hands a real id to the arc, so the
 * screen below never asks the content layer for a module that does not exist. A finished ladder
 * (or a course whose `levels.json` lists nothing) has no ritual to run and no module to send the
 * learner to, so it goes home.
 */
export default function RitualScreen() {
  const { input, ready } = useProgression();
  const rung = ready ? currentRungId(input) : null;

  /**
   * The one question the route turns on, asked exactly as the Ladder asks it: `exit_available` is
   * "every sentence of this rung self-marked got-it ≥ 2×" (PRD §8 F1), and `deriveStatuses` is
   * where that predicate is already joined to the counters (`useExitAvailable`, #95). It is
   * derived here, above the arc, so the whole screen reads one progression rather than two.
   *
   * It is deliberately the STATUS rather than `rungStage`: the card's `exit_ready` stage also
   * wants the rung `studied`, because a card is an invitation and reads best in order. A learner
   * who produced the whole rung without ever opening its module has still produced the whole
   * rung, and the ritual is theirs.
   */
  const open = rung !== null && deriveStatuses(input)[rung] === 'exit_available';

  // Nothing honest to draw yet: the ladder decides whether this screen may exist at all. The
  // shell's frame is already up, so it waits rather than flashing an arc it may have to replace.
  if (!ready) return <section className={styles.ritual} aria-busy="true" />;
  if (rung === null) return <Navigate to={HOME_PATH} replace />;

  return <RitualArc moduleId={rung} open={open} />;
}

interface RitualArcProps {
  /** The current rung — the only module this screen ever reads. */
  moduleId: string;
  /** Is this rung produced out? Live: the counters can finish it while the screen is up. */
  open: boolean;
}

function RitualArc({ moduleId, open }: RitualArcProps) {
  const { course } = useCourse();
  const strings = useStrings();
  const module = useModule(moduleId);

  // The module file is both halves of this screen's truth: the guard's counters are counted
  // against its sentence ids, and the constraint is its complexity. Until it lands, nothing here
  // can be said — including "no".
  if (module.data === null && module.error === null) {
    return <section className={styles.ritual} aria-busy="true" />;
  }

  /**
   * A rung that is not produced out sends the learner to the work rather than to a message: the
   * module is where the sentences are, and the Practice tab is one tap from it. `replace` keeps
   * the bad entry out of the back stack, so the chevron still goes where it came from.
   *
   * A module file that will not load lands in the same place, which is also where it gets
   * reported: `ModuleScreen` owns the content-error screen (#79), and one failure should not have
   * two screens claiming it.
   */
  if (!open || module.data === null) return <Navigate to={`/module/${moduleId}`} replace />;

  /** How many sentences this rung taught — the ones the new sentence may not be one of. */
  const sentenceCount = module.data.sentences.length;
  /** The next one after them, in the course's own ordinal — its word for "the 11th". */
  const ordinal = interpolate(strings.ordinal, { n: sentenceCount + 1 });

  return (
    <section className={styles.ritual}>
      <div className={styles.head}>
        <div className={styles.headText}>
          {/* Structural furniture, like the module list's `M1 · MODULE` — raised on #71. */}
          <p className={styles.kicker}>{rungLabel(moduleId)} · EXIT RITUAL</p>
          <h2 className={styles.title} dir={course.dir}>
            {ordinal}
          </h2>
        </div>
        {/* The prototype's "part 1 of 2", as a count: Comprehension (#102) is part 2. */}
        <p className={styles.part}>1 / {RITUAL_PARTS}</p>
      </div>

      <ol className={styles.steps}>
        <li className={styles.step}>
          <span className={styles.stepNumber} aria-hidden="true">
            1
          </span>
          <h3 className={styles.stepTitle} dir={course.dir}>
            {strings['ritual.stepTitle.write']}
          </h3>
          {/* This rung's own constraint: not one of ITS sentences, inside ITS word cap. */}
          <p className={styles.stepCopy} dir={course.dir}>
            {interpolate(strings['ritual.constraint'], {
              sentenceCount,
              maxWords: module.data.complexity.maxWordsPerSentence,
            })}
          </p>
        </li>

        {/**
         * Step 2 — the check step. Everything below this comment is text, and that is the
         * feature [D18]. `data-step="check"` is what the zero-interactive-elements test scopes
         * itself to; it is not a hook for behaviour, because there is none to hook.
         */}
        <li className={styles.step} data-step="check">
          <span className={styles.stepNumber} aria-hidden="true">
            2
          </span>
          <h3 className={styles.stepTitle} dir={course.dir}>
            {strings['ritual.stepTitle.check']}
          </h3>
          <p className={styles.stepCopy} dir={course.dir}>
            {strings['ritual.check.copy']}
          </p>

          {/* The dashed plate: `--border-dashed-world` is reserved for exactly this meaning —
              outside the app's solid hairline world (design/tokens.md §3). Two static rows, and
              the icons are decoration: a globe that opens nothing, beside a line of text. */}
          <div className={styles.plate}>
            <p className={styles.plateLabel} dir={course.dir}>
              {strings['ritual.check.plateLabel']}
            </p>
            <p className={styles.resource} dir={course.dir}>
              <Users className={styles.resourceIcon} aria-hidden="true" />
              <span>{strings['ritual.check.resourcePerson']}</span>
            </p>
            <p className={styles.resource} dir={course.dir}>
              <Globe className={styles.resourceIcon} aria-hidden="true" />
              <span>{strings['ritual.check.resourceInternet']}</span>
            </p>
          </div>

          {/* The course saying, in its own words, that the missing buttons are the design. */}
          <p className={styles.caption} dir={course.dir}>
            {strings['ritual.check.caption']}
          </p>
        </li>

        <li className={styles.step}>
          <span className={styles.stepNumber} aria-hidden="true">
            3
          </span>
          <h3 className={styles.stepTitle} dir={course.dir}>
            {strings['ritual.stepTitle.confirm']}
          </h3>
          {/* #101's slot: the press-and-hold confirmation (~900ms [D14], release resets) and the
              CTA to Comprehension it reveals. `ritual.confirm.holdLabel` carries `{ordinal}`, the
              same ordinal the head renders. Nothing is drawn here until it lands — a disabled
              stand-in would be a control that does nothing, which is what step 2 is about. */}
        </li>
      </ol>
    </section>
  );
}
