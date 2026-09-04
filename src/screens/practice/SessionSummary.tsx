/**
 * The end of a session (#388; PRD-design §6.3) — one number, and the way on.
 *
 * **One number, because a session is now one activity.** It used to print three counts: how many
 * were reviewed, how many of those were got, and how many of the rung's sentences had been read
 * through. Three numbers were what two phases and a pager produced, and reading them meant
 * reassembling in your head what the session had been. Every card is the same card now, so the
 * honest report is the same for all of them: how many the learner got, out of how many they were
 * asked.
 *
 * The score is the SESSION's, counted by the session as its marks landed — not "got it ever", and
 * not re-derived from the store afterwards, which would answer a different question.
 *
 * The exit ritual link is a different fact, and it is about the RUNG rather than the session: it
 * appears when every sentence of the current rung has been marked got-it at least once, which is
 * exactly the predicate `engine/exit.ts` answers for the ladder. The route's own guard still
 * decides whether it opens — this is a way there, never a second gate.
 */
import { Link } from 'react-router-dom';
import { interpolate, useStrings } from '../../course/strings.ts';
import { HOME_PATH, RITUAL_PATH } from '../../shell/routes.tsx';
import { RegistrationMarks } from '../RegistrationMarks.tsx';
import styles from './SessionSummary.module.css';

interface SessionSummaryProps {
  /** Cards the learner marked got-it in THIS session. */
  gotIt: number;
  /** Cards this session served. */
  total: number;
  /** Sentences of the current rung now at the exit gate. */
  marked: number;
  /** Sentences the current rung has. */
  rungTotal: number;
  dir?: string;
}

export function SessionSummary({ gotIt, total, marked, rungTotal, dir }: SessionSummaryProps) {
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
        {/* One sentence, in the course's words — so the numbers sit where the language puts
            them rather than in a right-aligned column. */}
        <p className={styles.count} dir={dir}>
          {interpolate(strings['practice.summaryScore'], { count: gotIt, total })}
        </p>
      </div>

      {/* The rung is worked through: the exit ritual is what comes next, and this is the moment
          the learner earned it. */}
      {rungTotal > 0 && marked === rungTotal && (
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
