/**
 * The session summary (#96; PRD §8 F4, PRD-design §6.3, flow 3: "session-end summary (counts of
 * things produced; no time stats)") — four numbers and a way back.
 *
 * **Counts, never time** (Invariant 2). There is no duration, no percentage, no "you studied for
 * 22 minutes", no streak and no next-session date, because none of those are things this product
 * knows or wants to imply: the session took as long as it took, and the learner was there for it.
 * The four counts are what actually happened — cards reviewed, how many of them the learner had,
 * sentences produced, and how many of the rung's sentences now stand at the two the exit ritual
 * asks for — and `PracticeScreen.test.tsx` scans this screen for a clock, a percentage and a
 * calendar word so the rule survives the next edit.
 *
 * The lines are TEMPLATES, not label-and-value rows: the prototype right-aligns a bold number
 * against an English label, which fixes the count at the end of the line in every language. A
 * course writes its own sentence around `{count}` instead — the call #86 made for the Ladder's
 * pending line, for the same reason.
 *
 * The exit ritual's own block ("Every sentence produced ×2 — begin the exit ritual") is in the
 * prototype's summary and is deliberately NOT here: the ritual is the Ladder's loud action once
 * the rung is ready (`RungCard`'s `exit_ready` stage, #87/#95), and offering the same unlock from
 * two places is how one of them ends up out of step with the rule.
 */
import { Link } from 'react-router-dom';
import { interpolate, useStrings } from '../../course/strings.ts';
import { HOME_PATH } from '../../shell/routes.tsx';
import { RegistrationMarks } from '../RegistrationMarks.tsx';
import styles from './SessionSummary.module.css';

interface SessionSummaryProps {
  /** Review cards self-marked this session. */
  reviewed: number;
  /** How many of those were a got-it. */
  gotIt: number;
  /** Produce got-its counted into the production counters this session. */
  produced: number;
  /** Sentences of this rung now at ≥ 2×, and how many the rung has. */
  atTwo: number;
  total: number;
  /** The course's writing direction — every line here is its copy. */
  dir?: string;
}

export function SessionSummary({
  reviewed,
  gotIt,
  produced,
  atTwo,
  total,
  dir,
}: SessionSummaryProps) {
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
          {interpolate(strings['practice.summaryProduced'], { count: produced })}
        </p>
        <p className={styles.count} dir={dir}>
          {interpolate(strings['practice.summaryAtTwo'], { count: atTwo, total })}
        </p>
      </div>

      {/* Leaving the route is what ends the session (`AppShell`), so the way out is a link. */}
      <Link className={styles.back} to={HOME_PATH} dir={dir}>
        {strings['practice.backToLadder']}
      </Link>
    </section>
  );
}
