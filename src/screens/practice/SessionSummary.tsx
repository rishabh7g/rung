/**
 * The session summary (#96; PRD §8 F4, PRD-design §6.3, flow 3: "session-end summary (counts of
 * things produced; no time stats)") — three numbers and a way back.
 *
 * **Counts, never time** (Invariant 2). There is no duration, no percentage, no "you studied for
 * 22 minutes", no streak and no next-session date, because none of those are things this product
 * knows or wants to imply: the session took as long as it took, and the learner was there for it.
 * The three counts are what actually happened — cards reviewed, how many of them the learner had,
 * and how many of the rung's sentences are now marked read — and `PracticeScreen.test.tsx` scans
 * this screen for a clock, a percentage and a calendar word so the rule survives the next edit.
 *
 * **There were four** until #349. Two of them said nearly the same thing — sentences produced this
 * session, and sentences standing at the two the ritual asked for — because Produce was the phase
 * that wrote the counters and two was the gate. One marked read-through is the gate now, so the
 * pair collapsed into the one line that answers the question a learner actually has at the end of
 * a session: how much of this rung is done.
 *
 * The lines are TEMPLATES, not label-and-value rows: the prototype right-aligns a bold number
 * against an English label, which fixes the count at the end of the line in every language. A
 * course writes its own sentence around `{count}` instead — the call #86 made for the Ladder's
 * pending line, for the same reason.
 *
 * **The ritual is offered here when the learner has just earned it** (#315), and this is a change
 * of mind about the prototype's block, not a return to it. The old argument was that the ritual is
 * the Ladder's loud action once the rung is ready (`RungCard`'s `exit_ready` stage, #87/#95), and
 * that offering the same unlock from two places is how one of them ends up out of step with the
 * rule. The first half stands; the second turned out to be about the RULE, not the link. So the
 * rule still lives in exactly one derivation (`engine/progression.ts`, re-asked by `/ritual`'s own
 * guard, which sends a wrong arrival to the module) — and the summary stops going silent at the
 * one moment the next step opens, which is what a learner who just read the whole rung through
 * is looking at.
 *
 * It appears only when `marked === total`: not as a nudge, not as a count with a button beside
 * it, but at the moment the line above it reads that the whole rung is read through.
 */
import { Link } from 'react-router-dom';
import { interpolate, useStrings } from '../../course/strings.ts';
import { HOME_PATH, RITUAL_PATH } from '../../shell/routes.tsx';
import { RegistrationMarks } from '../RegistrationMarks.tsx';
import styles from './SessionSummary.module.css';

interface SessionSummaryProps {
  /** Review cards self-marked this session. */
  reviewed: number;
  /** How many of those were a got-it. */
  gotIt: number;
  /** Sentences of this rung now marked read (≥ `MARKS_PER_SENTENCE`), and how many it has. */
  marked: number;
  total: number;
  /** The course's writing direction — every line here is its copy. */
  dir?: string;
}

export function SessionSummary({ reviewed, gotIt, marked, total, dir }: SessionSummaryProps) {
  const strings = useStrings();

  return (
    <section className={styles.summary}>
      {/* English shell furniture, in the register of the nav's tab labels (raised on #71). */}
      <p className={styles.kicker}>SESSION END</p>
      <h2 className={styles.title} dir={dir}>
        {strings['practice.summaryTitle']}
      </h2>

      <div className={styles.counts}>
        <RegistrationMarks />
        <p className={styles.count} dir={dir}>
          {interpolate(strings['practice.summaryReviewed'], { count: reviewed })}
        </p>
        <p className={styles.count} dir={dir}>
          {interpolate(strings['practice.summaryGotIt'], { count: gotIt })}
        </p>
        <p className={styles.count} dir={dir}>
          {interpolate(strings['practice.summaryMarked'], { count: marked, total })}
        </p>
      </div>

      {/* The rung is read through (#315): the exit ritual is what comes next, and this is the
          moment the learner earned it. The route's own guard still decides whether it opens —
          this is a way there, never a second gate. */}
      {total > 0 && marked === total && (
        <Link className={styles.toRitual} to={RITUAL_PATH} dir={dir}>
          {strings['practice.summaryToRitual']}
        </Link>
      )}

      {/* Leaving the route is what ends the session (`AppShell`), so the way out is a link. */}
      <Link className={styles.back} to={HOME_PATH} dir={dir}>
        {strings['practice.backToLadder']}
      </Link>
    </section>
  );
}
