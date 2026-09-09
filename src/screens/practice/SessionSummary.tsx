/**
 * The end of a session (#388; PRD-design §6.3) — one number, the rung climbed, and the way back.
 *
 * **One number, because a session is one activity.** It used to print three counts: how many were
 * reviewed, how many of those were got, and how many of the rung's sentences had been read
 * through. Three numbers were what two phases and a pager produced, and reading them meant
 * reassembling in your head what the session had been. Every card is the same card now, so the
 * honest report is the same for all of them: how many the learner got, out of how many they were
 * asked.
 *
 * The score is the SESSION's, counted by the session as its marks landed — not "got it ever", and
 * not re-derived from the store afterwards, which would answer a different question.
 *
 * **The climb is announced here, not offered.** This screen used to carry a link to the exit
 * ritual, shown when the counters said the rung was worked through — a way ON, past a gate, to a
 * comprehension test that made the pass. There is no gate and no test: finishing the session is
 * what climbs the rung, `screens/practice/Session.tsx` has already written it by the time this
 * renders, and what is left to say is which rung opened. So the line is a statement, and the CTA
 * under it is the one that carries the unlock beat to the Ladder (`passedRung`) — the product's
 * single celebration, once, on the rung the pass opened.
 *
 * A session with no rung to climb — a finished ladder, or a rung whose module served no sentences
 * — says nothing about it and goes back the quiet way. Every word is the course's (PRD §4).
 *
 * **No kicker** (Practice audit, 2026-09-05). `SESSION END` in English furniture sat over "Done
 * for today." in the course's words — the same fact twice, in two registers. The title is enough.
 */
import { Link } from 'react-router-dom';
import { interpolate, useStrings } from '../../course/strings.ts';
import { HOME_PATH, passedRung } from '../../shell/routes.tsx';
import { RegistrationMarks } from '../RegistrationMarks.tsx';
import { rungLabel } from '../ladder/rungLabel.ts';
import './session-summary.css';

interface SessionSummaryProps {
  /** Cards the learner marked got-it in THIS session. */
  gotIt: number;
  /** Cards this session served. */
  total: number;
  /**
   * The rung this session just climbed, or `null` when it climbed none. The session decides and
   * writes it; this screen only says so.
   */
  climbed: string | null;
}

export function SessionSummary({ gotIt, total, climbed }: SessionSummaryProps) {
  const strings = useStrings();

  return (
    <section className="summary">
      <h2 className="summary-title">{strings['practice.summaryTitle']}</h2>

      <div className="summary-counts">
        <RegistrationMarks />
        {/* One sentence, in the course's words — so the numbers sit where the language puts
            them rather than in a right-aligned column. */}
        <p className="summary-count">
          {interpolate(strings['practice.summaryScore'], { count: gotIt, total })}
        </p>
      </div>

      {/* The rung is climbed. The line names it and the CTA carries the beat; `replace`, because a
          finished session is not something to walk back into. */}
      {climbed !== null ? (
        <>
          <p className="summary-climbed">
            {interpolate(strings['practice.climbedRung'], { rung: rungLabel(climbed) })}
          </p>
          <Link className="summary-climb" to={HOME_PATH} replace state={passedRung(climbed)}>
            {strings['practice.climbToLadder']}
          </Link>
        </>
      ) : (
        /* Leaving the route is what ends the session (`AppShell`), so the way out is a link. */
        <Link className="summary-back" to={HOME_PATH}>
          {strings['practice.backToLadder']}
        </Link>
      )}
    </section>
  );
}
