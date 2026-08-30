/**
 * The Verdict (#103) — the ritual's last screen, and **the one write in the whole of it**
 * (PRD §8 F5; PRD-design §6.7 flow 7; prototype → design/Rung App v3.3.dc.html → Verdict).
 *
 * The arc holds no state, the hold holds a number that dies with it, Comprehension writes nothing
 * on a failed round — and then this screen records everything the ritual ever records: the module
 * passes, and the sentences it taught enter the review queue. One action, one write
 * (`completeRitual`, `state/store.ts`), delegating the pass to `passRitual`, the single unlock
 * path (Invariant 1).
 *
 * Four things make the screen what it is:
 *
 *   • **It is entered, never navigated to, and the entry is spent on arrival.** The guard is
 *     Comprehension's hand-over token (`handover('comprehension')`, `shell/routes.tsx`), read once
 *     on mount and then **cleared from the history entry** — because `history.state` outlives a
 *     reload, and a token left in it would let a refresh mint a second verdict for whichever rung
 *     had become current. A deep link, a refresh, or a back tap onto the spent entry lands on the
 *     Ladder: the ritual is over, and the ladder is where its result is.
 *   • **The pass happens on arrival, not on the CTA.** The comprehension is what earned it, and a
 *     learner who closes the app on this screen has still climbed the rung — a pass that waited
 *     for a button would be a rung lost to a locked phone. The button's job is the celebration,
 *     not the record.
 *   • **The checklist is a receipt, not a score** — the things the learner actually did, in the
 *     PRD's order: wrote the 11th sentence in their notebook, marked the comprehension. Every line
 *     is the course's (`verdict.*`), and the screen makes no claim of its own about either.
 *   • **The way out carries the beat.** "Climb to the ladder" is a `<Link>` to the Ladder carrying
 *     the one-shot flag that plays the unlock beat on the rung this pass opened (`passedRung`,
 *     consumed there) — the product's single celebration, once, and never on a revisit.
 *
 * The two numbers on it are the module's own: how many sentences it taught (so the ordinal is
 * "the 11th" for a ten-sentence rung and the course's own word for it), and how many comprehension
 * items its `exitTest` asked for. The English on screen is structural furniture in the register of
 * the module list's `M1 · MODULE` kicker — the kicker and the `M1 · Passed` title, which is the
 * Ladder's own `PASSED` status label (#86) at the size the prototype gives it.
 */
import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useCourse } from '../course/CourseProvider.tsx';
import { useModule } from '../course/content.ts';
import { interpolate, useStrings } from '../course/strings.ts';
import type { Levels } from '../course/types.ts';
import { currentRungId, deriveStatuses, type ProgressionInput } from '../engine/progression.ts';
import { cameFrom, HOME_PATH, passedRung, RITUAL_PATH, VERDICT_PATH } from '../shell/routes.tsx';
import { useAppStore } from '../state/store.ts';
import { RegistrationMarks } from './RegistrationMarks.tsx';
import { rungLabel } from './ladder/rungLabel.ts';
import { useProgression } from './useProgression.ts';
import styles from './VerdictScreen.module.css';

/**
 * The route's component: it answers "was the comprehension really taken" and "which rung is this
 * verdict for", and hands a real id to the screen below — which therefore never asks the content
 * layer for a module that does not exist.
 *
 * Both answers are taken ONCE, on mount, and that is the whole of the guard's design. The token is
 * spent here (an entry that has produced its verdict must not produce another), and the rung is
 * captured before the write moves the ladder on: the checklist is about the rung just climbed, and
 * a screen that re-derived it after its own write would be about the next one.
 */
export default function VerdictScreen() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { levels, input, ready } = useProgression();

  /** Read once: the effect below takes the token out of the entry, and this survives that. */
  const [entered] = useState(() => cameFrom('comprehension', state));

  useEffect(() => {
    if (!entered) return;
    // Spend it. `history.state` survives a reload, so a token left behind would make this screen
    // reachable again — with a different rung current, and nothing but a refresh behind it.
    navigate(VERDICT_PATH, { replace: true, state: null });
  }, [entered, navigate]);

  // Nothing honest to draw yet: the ladder decides which rung this verdict is about. The shell's
  // frame is already up, so it waits rather than flashing a result it may have to replace.
  if (!ready || levels.data === null) {
    return <section className={styles.verdict} aria-busy="true" />;
  }

  /**
   * No token, no verdict — and the Ladder rather than `/ritual`, which is where the ritual's
   * earlier screens send a stranger. By the time a verdict is reachable at all the ritual is over
   * for that rung, so pointing back at part 1 would point at a screen that would itself redirect;
   * the ladder is where the result of the ritual lives, and where a learner who arrived by
   * accident actually wants to be.
   */
  if (!entered) return <Navigate to={HOME_PATH} replace />;

  return <Verdict input={input} plan={levels.data.levels} />;
}

interface VerdictProps {
  input: ProgressionInput;
  /** The ladder as `levels.json` lists it — where the next rung's own title comes from. */
  plan: Levels['levels'];
}

/**
 * The verdict for one rung: the pass, the receipt, and the way back.
 *
 * `moduleId` is captured on the first render because the write below moves the ladder past it.
 * Everything else is derived live off the same progression the Ladder reads, so this screen and
 * that one cannot disagree about what just happened.
 */
function Verdict({ input, plan }: VerdictProps) {
  const [moduleId] = useState(() => currentRungId(input));

  // A finished ladder has no rung to pass and no verdict to give. Unreachable through the ritual
  // (Comprehension guards the same fact); a spent history entry is not the only way to arrive.
  if (moduleId === null) return <Navigate to={HOME_PATH} replace />;

  return <RungVerdict input={input} plan={plan} moduleId={moduleId} />;
}

interface RungVerdictProps extends VerdictProps {
  /** The rung this verdict is for — the current one at the moment the screen opened. */
  moduleId: string;
}

function RungVerdict({ input, plan, moduleId }: RungVerdictProps) {
  const { course } = useCourse();
  const strings = useStrings();
  const module = useModule(moduleId);
  const completeRitual = useAppStore((store) => store.completeRitual);

  /** Has this ritual's write landed? After it, the rung is in the passed set — this screen's own doing. */
  const passed = input.passed.has(moduleId);
  /** Is the rung still produced out? The very predicate the arc and Comprehension read (#95). */
  const open = deriveStatuses(input)[moduleId] === 'exit_available';

  /**
   * **The write, once per mount.** A ref rather than the state above, because the two are
   * different questions: `passed` is what the ladder says, and this is what this screen has
   * already done — and under `StrictMode` the effect is invoked twice against the same render's
   * values, where asking the ladder would ask it before it had been told.
   *
   * `passRitual` throws on anything but the current rung (Invariant 1), and a second call for the
   * same rung is exactly that, so the ref is what keeps the double-invoke from being a crash.
   */
  const written = useRef(false);

  useEffect(() => {
    if (written.current || module.data === null || !open) return;
    written.current = true;

    /**
     * The whole record of the exit ritual: this module passed, and its sentences enrolled into
     * review — one action, one persisted document (`completeRitual`, `state/store.ts`). The
     * enrolment policy is `engine/leitner.ts`'s and this is the call it names: production ends
     * when the rung is passed, and maintenance begins.
     *
     * No clock is passed: the app calls this with three arguments and takes `systemClock`, which
     * is the app's only date-construction site (`state/clock.ts`). `passedAt` is a receipt for the
     * module list, never a schedule (Invariant 2).
     */
    completeRitual(
      course.id,
      moduleId,
      module.data.sentences.map((sentence) => sentence.id),
    );
  }, [completeRitual, course.id, moduleId, module.data, open]);

  // The module is both halves of this screen's numbers, and the write needs its sentence ids.
  if (module.data === null && module.error === null) {
    return <section className={styles.verdict} aria-busy="true" />;
  }

  /**
   * A module file that will not load lands where it gets reported: `ModuleScreen` owns the
   * content-error screen (#79), and one failure should not have two screens claiming it.
   */
  if (module.data === null) return <Navigate to={`/module/${moduleId}`} replace />;

  /**
   * And the counters, asked once they can answer: a rung that this screen has not passed AND that
   * was never produced out has no verdict to show, whatever entry the learner arrived on. It goes
   * to `/ritual`, the step that hands over — whose own guard sends it on to the work.
   */
  if (!passed && !open) return <Navigate to={RITUAL_PATH} replace />;

  /** The course's own word for "the 11th" — the sentence after the ten this rung taught. */
  const ordinal = interpolate(strings.ordinal, { n: module.data.sentences.length + 1 });
  /** The rung this pass opened, by its own title. `null` at the top of the ladder. */
  const next = nextRung(plan, moduleId);

  return (
    <section className={styles.verdict}>
      <div className={styles.head}>
        {/* The course's words, like everything else the ritual says (#351). */}
        <p className={styles.kicker} dir={course.dir}>
          {strings['verdict.ritualComplete']}
        </p>
        <h2 className={styles.title} dir={course.dir}>
          {interpolate(strings['verdict.passedRung'], { rung: rungLabel(moduleId) })}
        </h2>
      </div>

      {/* The receipt: a blueprint plate, and the two lines the learner earned on it. */}
      <div className={styles.receipt}>
        <RegistrationMarks />

        <ul className={styles.checks}>
          {[
            interpolate(strings['verdict.checkSentence'], { ordinal }),
            interpolate(strings['verdict.checkComprehension'], {
              // The module's own number, like the arc's constraint: `2` today, and a module that
              // asked for three would read "3 of 3" with no code change (PRD §7 `exitTest`). Both
              // values are that number, because anything short of every item marked "same
              // meaning" is a retry rather than a verdict (#102).
              count: module.data.exitTest.comprehendCount,
              total: module.data.exitTest.comprehendCount,
            }),
          ].map((line) => (
            <li className={styles.check} key={line}>
              <Check className={styles.tick} aria-hidden="true" />
              <span className={styles.checkText} dir={course.dir}>
                {line}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* The course's closing line names the rung that just opened, so a ladder with nothing above
          it has no line to say — the completion state is quiet (PRD-design §3.6). */}
      {next !== null && (
        <p className={styles.line} dir={course.dir}>
          {interpolate(strings['verdict.line'], { nextModule: next })}
        </p>
      )}

      {/* `replace`: a verdict is not something to walk back into, and the entry it replaces is the
          one Comprehension already replaced. The flag is the unlock beat's, and the Ladder spends
          it the moment it lands. */}
      <Link
        className={styles.cta}
        to={HOME_PATH}
        replace
        state={passedRung(moduleId)}
        dir={course.dir}
      >
        {strings['verdict.toLadder']}
      </Link>
    </section>
  );
}

/**
 * The title of the rung after `moduleId` in the ladder — across a level boundary, and `null` at the
 * top of it.
 *
 * It reads the ladder rather than asking the store what became current, so the line says the same
 * thing before and after this screen's own write: a sentence that changed under the learner
 * mid-read would be the screen narrating its own bookkeeping.
 */
function nextRung(plan: Levels['levels'], moduleId: string): string | null {
  const rungs = plan.flatMap((level) => level.modules);
  const index = rungs.findIndex((module) => module.id === moduleId);

  return index === -1 ? null : (rungs[index + 1]?.title ?? null);
}
