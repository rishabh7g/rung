/**
 * Practice (#96) — the hub, and the immersive session that runs from it (PRD §8 F4; PRD-design
 * §4, §6.3, flow 3).
 *
 * The hub is the one screen in the app that is entirely about what is *about to* happen: which
 * rung the session will work on, what its three phases will serve, and one CTA that starts it.
 * Everything on it is a count taken from a plan (`engine/session.ts`) made against the queue the
 * session is about to tick — the same pure function `startSession` uses, so the hub cannot promise
 * a Review phase the session then does not serve.
 *
 * **Starting is one call, and it happens once.** `startSession` increments `sessionCount`, ticks
 * the review queue and writes the opening snapshot in a single write, and answers with the plan
 * the session then runs on. Nothing else in the app may do any of that — the resume flow (#99)
 * restores a snapshot and calls it not at all, which is only safe while there is one caller.
 *
 * **The session is immersive** (#84): `enterSession` hides the nav and puts the pause ✕ in the
 * header; the ✕, the back button, and any navigation away end it (`AppShell`). The learner's
 * position survives that in the per-course snapshot; picking it back up is #99's.
 *
 * Every learner-facing word is the course's (`practice.*`, PRD §4). The only English is structural
 * furniture in the register of the nav's tab labels — the `M1 · WHO I AM` kicker and the phase
 * numbers — and the numbers are counts.
 */
import { useState } from 'react';
import { useCourse } from '../course/CourseProvider.tsx';
import { useModules } from '../course/content.ts';
import { interpolate, useStrings } from '../course/strings.ts';
import { tickSession } from '../engine/leitner.ts';
import { currentRungId, rungStage } from '../engine/progression.ts';
import { planSession, type SessionPlan } from '../engine/session.ts';
import { useAppStore } from '../state/store.ts';
import { useImmersive } from '../shell/immersive.tsx';
import { RegistrationMarks } from './RegistrationMarks.tsx';
import { rungLabel } from './ladder/rungLabel.ts';
import { PHASES } from './practice/PhaseChips.tsx';
import { Session } from './practice/Session.tsx';
import { useProgression } from './useProgression.ts';
import type { StringsKey } from '../course/stringsKeys.ts';
import styles from './PracticeScreen.module.css';

/** Shared, so a course with no state yet reads the same values every render. */
const NO_QUEUE: never[] = [];
const NO_COUNTERS: Readonly<Record<string, number>> = {};

/** The hub's line for each phase — the same three phases the session's chips wear. */
const HUB_LINE: Readonly<Record<(typeof PHASES)[number], StringsKey>> = {
  review: 'practice.hubReview',
  read: 'practice.hubRead',
  produce: 'practice.hubProduce',
};

/** What the hub hands the session: the plan it started with, and the rung it is working on. */
interface Run {
  moduleId: string;
  sentenceIds: readonly string[];
  plan: SessionPlan;
}

export default function PracticeScreen() {
  const { course } = useCourse();
  const strings = useStrings();
  const { immersive, enterSession } = useImmersive();
  const { input, ready } = useProgression();
  const startSession = useAppStore((store) => store.startSession);
  const reviewQueue = useAppStore((store) => store.courses[course.id]?.reviewQueue) ?? NO_QUEUE;
  const production = useAppStore((store) => store.courses[course.id]?.production) ?? NO_COUNTERS;

  const rung = ready ? currentRungId(input) : null;
  const stage = rung === null ? null : rungStage(input, rung);
  // The rung's own module, for the sentences the session will read and produce. `useModules`
  // fails silently, which is the right answer here: a rung whose file will not load offers no
  // session, and the screens that render that module report the failure properly (#79).
  const modules = useModules(rung === null ? [] : [rung]);
  const module = rung === null ? undefined : modules.get(rung);
  const sentenceIds = module?.sentences.map((sentence) => sentence.id) ?? [];

  /**
   * What a session started right now would serve — the plan, made against the queue AFTER the
   * tick the session is about to spend. Preview only: nothing here writes, and `startSession`
   * re-derives it from the same pure function, so the counts on this screen and the cards in the
   * session are one answer rather than two.
   *
   * Derived on every render rather than memoised by hand: it is two pure passes over ten
   * sentences, and the session it feeds holds its OWN copy of the plan from the moment it starts
   * (`Run`), so nothing downstream re-renders because this array is new.
   */
  const preview = planSession({
    queue: tickSession(reviewQueue),
    moduleSentenceIds: sentenceIds,
    production,
  });

  /**
   * The session on screen, held here because it belongs to this mount: `enterSession` raises the
   * immersive flag and the pause ✕ (or any navigation) lowers it, at which point the hub is what
   * renders and this run is never read again. What survives that is the per-course SNAPSHOT in
   * state — the whole of what #99 resumes from.
   */
  const [run, setRun] = useState<Run | null>(null);

  if (immersive && run !== null) {
    return (
      <Session
        courseId={course.id}
        moduleId={run.moduleId}
        sentenceIds={run.sentenceIds}
        plan={run.plan}
        dir={course.dir}
      />
    );
  }

  // Nothing honest to draw yet: every count on this screen comes from the ladder and the rung's
  // module. The shell's frame is already up, so the hub waits rather than inventing a state.
  if (!ready) return <section className={styles.hub} aria-busy="true" />;

  /** The counts the hub promises, all three out of the one preview plan. */
  const counts = {
    review: preview.reviewIds.length,
    read: sentenceIds.length,
    produce: preview.produceIds.length,
  };
  const title = module?.title;
  const startable = rung !== null && stage !== 'pending' && sentenceIds.length > 0;

  /** ONE call, ONE session: the count, the tick and the opening snapshot, in a single write. */
  const begin = (): void => {
    if (rung === null || !startable) return;

    const plan = startSession(course.id, sentenceIds);
    setRun({ moduleId: rung, sentenceIds, plan });
    enterSession();
  };

  return (
    <section className={styles.hub}>
      <div className={styles.head}>
        {/* Structural furniture, in the register of the Ladder's `M3 · CURRENT RUNG` — the rung's
            own title comes out of its module file, which is the course's content. */}
        {rung !== null && (
          <p className={styles.kicker}>
            {rungLabel(rung)}
            {title === undefined ? '' : ` · ${title}`}
          </p>
        )}
        <h2 className={styles.title} dir={course.dir}>
          {strings['practice.hubTitle']}
        </h2>
      </div>

      {/* ────────────────────────── the notebook invitation's slot (#67) ──────────────────────────
          `notebookInvitation` is already written in every bundle ("your notebook is your
          workbook"); where it appears and how it is dismissed is [Q6], still open on #67, with a
          one-time line on the first Practice hub as the design's recommendation. This is the slot
          it lands in — an empty one, because choosing a placement here would pre-empt the
          decision the ticket exists to make. */}
      <div className={styles.invitation} data-slot="notebookInvitation" />

      {stage === 'pending' ? (
        // A rung whose sentences are not authored yet: there is nothing to practise on it, and the
        // note says so in the course's own words — the same line the rung card shows [D22].
        <div className={styles.pending}>
          <RegistrationMarks />
          <p className={styles.pendingNote} dir={course.dir}>
            {strings.pendingAuthoring}
          </p>
        </div>
      ) : (
        rung !== null && (
          <>
            <ol className={styles.phases}>
              {PHASES.map((phase, index) => (
                <li key={phase} className={styles.phase}>
                  <RegistrationMarks />
                  {/* The prototype's 01 / 02 / 03 — a count, and shell furniture. */}
                  <p className={styles.phaseNumber}>{String(index + 1).padStart(2, '0')}</p>
                  <div className={styles.phaseText}>
                    <p className={styles.phaseName} dir={course.dir}>
                      {strings[`practice.phase.${phase}`]}
                    </p>
                    <p className={styles.phaseLine} dir={course.dir}>
                      {interpolate(strings[HUB_LINE[phase]], { count: counts[phase] })}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            {/* The invariant, in the course's own words, on the screen where a sequence of three
                phases might otherwise read as a sequence of three gates. */}
            <p className={styles.guide} dir={course.dir}>
              {strings['practice.guideLine']}
            </p>

            {startable && (
              <div className={styles.beginFrame}>
                <RegistrationMarks />
                <button type="button" className={styles.begin} onClick={begin} dir={course.dir}>
                  {/* The CTA names where the session opens, because that is what it does: Review
                      when something is due, Read when nothing is (PRD §8 F4). Resuming an
                      interrupted session is #99's second label, in this same place. */}
                  {preview.reviewIds.length > 0
                    ? strings['practice.beginReview']
                    : strings['practice.beginRead']}
                </button>
              </div>
            )}
          </>
        )
      )}
    </section>
  );
}
