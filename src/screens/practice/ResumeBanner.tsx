/**
 * The resume offer (#99; PRD §8 F4, §8 F0 AC) — what the Practice hub says when the active course
 * has a session still open, and the two things a learner may do about it.
 *
 * **It stands where the Begin CTA stands**, at the bottom of the hub's column, and it replaces it
 * while it is up. That is the prototype's own shape (`hubCta: 'Resume'`, design/Rung App
 * v3.3.dc.html) kept honest: one entry into the session, in thumb reach, never two competing CTAs
 * on one screen. What the prototype does NOT do is come back to the card the learner left — its
 * Resume restarts the phase at `idx: 0` and its state resets on a course switch (§17: do not copy)
 * — so the plate carries the position as well as the button.
 *
 * **The line says where it stopped**, in the course's own words: the phase by its own name (the
 * same `practice.phase.*` the chips wear) and the card as a count of the queue. Counts, never time
 * — nothing here says when the session was left or how long it ran, because the app has no
 * calendar to say it with (Invariant 2).
 *
 * **The two controls are two different promises**, which is why they are two buttons rather than
 * one: Continue keeps the place *and* the session — no second `sessionCount`, no second tick of
 * the review queue — while New session drops the place and spends a fresh one. The screen owns
 * both actions (`PracticeScreen`); this component owns neither, it only reports which was tapped.
 *
 * Every word is the course's (`practice.resume*`); this file has none of its own.
 */
import { interpolate, useStrings } from '../../course/strings.ts';
import type { SessionSnapshot } from '../../state/types.ts';
import { RegistrationMarks } from '../RegistrationMarks.tsx';
import styles from './ResumeBanner.module.css';

interface ResumeBannerProps {
  /** The course's open session — its phase, its position, and the queue that position is in. */
  snapshot: SessionSnapshot;
  /** Pick it up exactly where it was. Starts nothing: the count and the tick are already spent. */
  onContinue: () => void;
  /** Leave it, and open a fresh session — which is the one that counts. */
  onFresh: () => void;
  /** The course's writing direction — every word on this plate is its copy. */
  dir?: string;
}

export function ResumeBanner({ snapshot, onContinue, onFresh, dir }: ResumeBannerProps) {
  const strings = useStrings();

  return (
    <div className={styles.banner}>
      <RegistrationMarks />
      <p className={styles.line} dir={dir}>
        {interpolate(strings['practice.resumeLine'], {
          phase: strings[`practice.phase.${snapshot.phase}`],
          // The card the learner is ON, not the one they finished — and clamped to the queue, so a
          // position past the end of a shortened queue still reads as a place rather than as a
          // number bigger than the total.
          count: Math.min(snapshot.idx + 1, snapshot.queue.length),
          total: snapshot.queue.length,
        })}
      </p>

      <button type="button" className={styles.continue} onClick={onContinue} dir={dir}>
        {strings['practice.resumeContinue']}
      </button>
      <button type="button" className={styles.fresh} onClick={onFresh} dir={dir}>
        {strings['practice.resumeNew']}
      </button>
    </div>
  );
}
