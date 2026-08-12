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
 * last got-it that brings every sentence to 2× turns `studied` into `exit_ready` — the production
 * counters, read live through `screens/useExitAvailable.ts` (#95).
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
import { ProductionDots } from '../module/ProductionDots.tsx';
import { RegistrationMarks } from '../RegistrationMarks.tsx';
import { rungLabel } from './rungLabel.ts';
import beat from './unlockBeat.module.css';
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
  /**
   * Play the unlock beat on this card — the one moment the product celebrates (#103). The screen
   * decides, off a one-shot navigation flag it consumes (`shell/routes.tsx`), so the card cannot
   * replay it: it is a prop, never a state, and a re-render never turns it on by itself.
   */
  unlocked?: boolean;
  /**
   * Per-sentence got-it counts, in authored order — the writes, drawn (design/tokens.md §6.1
   * anatomy). Empty while the module's sentences have not loaded, and for a `pending` rung
   * whose module is not authored: a count of sentences that do not exist yet is not a count,
   * so the row is simply absent there (the prototype papers over it with the authored module's
   * numbers).
   */
  production?: readonly number[];
}

export function RungCard({
  stage,
  moduleId,
  title,
  job,
  dir,
  unlocked = false,
  production = [],
}: RungCardProps) {
  const strings = useStrings();
  const modulePath = `/module/${moduleId}`;
  // Clamped at the two writes a pair can draw, so the count and the dots never disagree — a
  // sentence produced five times has said everything it can say at 2 (PRD §8 F1).
  const writes = production.reduce((sum, produced) => sum + Math.min(produced, 2), 0);

  return (
    <div
      className={[styles.card, unlocked ? beat.beat : null].filter(Boolean).join(' ')}
      // The beat's own handle: a test and a live walk both need to see the celebration land on
      // the right rung, and the class name is a CSS-modules hash.
      data-beat={unlocked ? 'rung' : undefined}
    >
      <RegistrationMarks />

      <p className={styles.kicker}>{rungLabel(moduleId)} · CURRENT RUNG</p>
      <h2 className={styles.title} dir={dir}>
        {title}
      </h2>
      <p className={styles.job} dir={dir}>
        {job}
      </p>

      {production.length > 0 && (
        <div className={styles.dotsRow}>
          {/* The pairs are aria-hidden inside the component, like every dot drawing in the app;
              the count beside them is the announcement. */}
          {production.map((produced, index) => (
            <ProductionDots key={index} produced={produced} />
          ))}
          <span className={styles.writes}>
            {writes} / {production.length * 2}
          </span>
        </div>
      )}

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
