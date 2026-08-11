/**
 * The staged rung card [D22] (#87) — the current rung as one blueprint object, and **one clear
 * action inside it** (PRD-design §6.2, §7; PRD-engineering §8 F1).
 *
 * Four stages, one CTA set each, and the set is the whole of what the card offers:
 *
 * | stage | primary | beside it |
 * |---|---|---|
 * | `fresh` | "Start with the module" → `/module/:id` | the note: read it once, Practice picks up from there |
 * | `studied` | "Practice" → `/practice` | ghost "revisit the module" → `/module/:id` |
 * | `exit_ready` | "Exit ritual — open" → `/ritual` | Practice and Module drop to secondary |
 * | `pending` | — | the `pendingAuthoring` note + ghost "practice earlier rungs" → `/practice` |
 *
 * **The stage guides; it never gates** (the product invariant, and the reason this is a card and
 * not a wizard). Every stage leaves the bottom nav's Practice tab exactly where it was, three of
 * the four offer Practice from the card itself, and nothing here can lock a route: the only thing
 * that changes between stages is which action is loud.
 *
 * `rungStage(input, id)` decides which one, in `src/engine/progression.ts` — derived from the same
 * `progressionInput` the store guards `passRitual` with, never stored. This component takes the
 * answer and renders it; it holds no state and reads none. The stage flips because the engine's
 * inputs changed: `markStudied` on first module open turns `fresh` into `studied` (#88), and the
 * production counters turn `studied` into `exit_ready` (#95).
 *
 * **Every label is the course's** (`strings.json`, PRD §4) — the shell has no copy of its own, so
 * a Marathi learner reads Hindi here and an Arabic learner reads English, without this file
 * knowing either. The one English string is the `M3 · CURRENT RUNG` kicker, which is structural
 * furniture in the register of the nav's tab labels (raised on #71 with the Ladder's).
 *
 * **Every CTA is a `<Link>`, not a `<button>`.** They all navigate, and the prototype's `onClick`
 * buttons are a prototype's way of saying so: a link is the deep-linkable, middle-clickable,
 * screen-reader-honest control for going somewhere, and it is what the rest of the Ladder uses.
 */
import { Link } from 'react-router-dom';
import { useStrings } from '../../course/strings.ts';
import type { RungStage } from '../../engine/progression.ts';
import { PRACTICE_PATH, RITUAL_PATH } from '../../shell/routes.tsx';
import { rungLabel } from './rungLabel.ts';
import styles from './RungCard.module.css';

interface RungCardProps {
  /** Which CTA set to render — `rungStage(input, moduleId)`, derived on every render. */
  stage: RungStage;
  moduleId: string;
  /** The rung's own title and job, out of the course's `levels.json`. */
  title: string;
  job: string;
  /** The course's writing direction: the title, the job and every label are its words. */
  dir?: string;
}

export function RungCard({ stage, moduleId, title, job, dir }: RungCardProps) {
  const strings = useStrings();
  const modulePath = `/module/${moduleId}`;

  return (
    <div className={styles.card}>
      <RegistrationMarks />

      <p className={styles.kicker}>{rungLabel(moduleId)} · CURRENT RUNG</p>
      <h2 className={styles.title} dir={dir}>
        {title}
      </h2>
      <p className={styles.job} dir={dir}>
        {job}
      </p>

      {stage === 'fresh' && (
        <>
          <Link className={styles.primary} to={modulePath} dir={dir}>
            {strings['rungCard.startModule']}
          </Link>
          {/* "Nothing is locked; the tab stays open" — the note is the invariant, in the course's
              own words, at the one moment the learner might read a sequence as a gate. */}
          <p className={styles.note} dir={dir}>
            {strings['rungCard.freshNote']}
          </p>
        </>
      )}

      {stage === 'studied' && (
        <>
          <Link className={styles.primary} to={PRACTICE_PATH} dir={dir}>
            {strings['rungCard.practice']}
          </Link>
          <div className={styles.ghostRow}>
            <Link className={styles.ghost} to={modulePath} dir={dir}>
              {strings['rungCard.revisitModule']}
            </Link>
          </div>
        </>
      )}

      {stage === 'exit_ready' && (
        <>
          <Link className={styles.primary} to={RITUAL_PATH} dir={dir}>
            {strings['rungCard.exitRitual']}
          </Link>
          {/* Neither drops away — the ritual is the loud action, not the only one. */}
          <div className={styles.secondaryRow}>
            <Link className={styles.secondary} to={PRACTICE_PATH} dir={dir}>
              {strings['rungCard.practice']}
            </Link>
            <Link className={styles.secondary} to={modulePath} dir={dir}>
              {strings['rungCard.module']}
            </Link>
          </div>
        </>
      )}

      {stage === 'pending' && (
        <>
          {/* A rung whose module has not been authored yet: there is nothing to open, so there is
              no primary. The note says so in counts-free, calendar-free copy, and the one control
              points at the rungs that DO exist. */}
          <p className={styles.pendingNote} dir={dir}>
            {strings['pendingAuthoring']}
          </p>
          <div className={styles.ghostRow}>
            <Link className={styles.ghost} to={PRACTICE_PATH} dir={dir}>
              {strings['rungCard.practiceEarlier']}
            </Link>
          </div>
        </>
      )}
    </div>
  );
}

/**
 * The four `+` registration marks (design/tokens.md §3) — the blueprint grammar's signature, and
 * "never dropped" (§7 rule 3). Each is the same crosshair the current-rung marker draws, centred
 * on a corner of the card so it straddles the hairline.
 *
 * `aria-hidden`, and drawn rather than bordered: they are decoration in the strictest sense —
 * nothing about the rung's state is in them, and the size and ink come from tokens in the
 * stylesheet rather than from attributes here (docs/design-contract.md rule 1).
 */
function RegistrationMarks() {
  return (
    <>
      {[styles.markTopLeft, styles.markTopRight, styles.markBottomLeft, styles.markBottomRight].map(
        (corner) => (
          <svg
            key={corner}
            className={corner}
            viewBox="0 0 16 16"
            aria-hidden="true"
            focusable="false"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path className={styles.markLine} d="M8 0v16M0 8h16" />
          </svg>
        ),
      )}
    </>
  );
}
