/**
 * Practice (#389) — the hub, and the immersive session that runs from it (PRD §8 F3; PRD-design
 * §4, §6.3, flow 3).
 *
 * **The hub is one button.** Which rung the session works on, how many cards it will serve, and a
 * control that starts it. That is the whole screen.
 *
 * It used to describe the session before opening it: two phase rows with a count each, a CTA whose
 * label named which half would come first ("Begin — Review first" / "Begin — Read first"), and, on
 * a resumed session, a banner with a phase name, a position and two equally weighted buttons.
 * Every one of those was explaining a two-phase session to the learner. #388 made the session one
 * activity, so there is nothing left to describe — and #316 had already cut this screen once for
 * being a page to read on the way to a tap.
 *
 * **The count stays, because it is the one promise this screen makes.** It comes from
 * `planSession` — the same pure function `startSession` calls, against the queue the session is
 * about to tick — so the hub cannot promise a length the session does not serve. One function, two
 * callers, no second implementation to drift.
 *
 * **A resumed session says Continue, not Begin** (#99). The two buttons became one plus a quiet
 * way out: "which of these means practise?" is not a question to open a practice session with, and
 * continuing is the answer for nearly everyone. Starting over is still there, in the register of a
 * link, because it is the rarer and more expensive choice — it spends a fresh session count and a
 * fresh tick of the review queue.
 *
 * The structural version of #316 — the rung card's CTA starting a session outright, skipping this
 * screen — was built and backed out. Honouring a "start now" flag on arrival means calling
 * `startSession` (a WRITE: it spends a count and ticks the review queue) from an effect, and the
 * local state that the resulting plan has to live in makes it a `setState` inside an effect, which
 * this repo's lint forbids and which has no `eslint-disable` precedent anywhere in `src/`. The
 * alternatives were worse: a ref cannot be read during render, and deriving the run from the
 * snapshot instead would have re-created the plan through the resume path, where a fresh session's
 * queue is deliberately ticked and a resumed one's is not. Recorded rather than retried.
 */
import { useState } from 'react';
import { useCourse } from '../course/CourseProvider.tsx';
import { l2Written } from '../course/manifest.ts';
import { useModules } from '../course/content.ts';
import { interpolate, useStrings } from '../course/strings.ts';
import { tickSession } from '../engine/leitner.ts';
import { currentRungId, rungStage } from '../engine/progression.ts';
import { planSession, type SessionPlan } from '../engine/session.ts';
import { useAppStore } from '../state/store.ts';
import { useImmersive } from '../shell/immersive.tsx';
import { RegistrationMarks } from './RegistrationMarks.tsx';
import { rungLabel } from './ladder/rungLabel.ts';
import { isResumable, resumePlan } from './practice/resume.ts';
import { Session } from './practice/Session.tsx';
import { useProgression } from './useProgression.ts';
import styles from './PracticeScreen.module.css';

const NO_QUEUE: never[] = [];

/** What one run of the session needs: the rung it belongs to, and the cards it serves. */
interface Run {
  rungIds: readonly string[];
  plan: SessionPlan;
  resume?: { idx: number };
}

export default function PracticeScreen() {
  const { course } = useCourse();
  const l2 = l2Written(course);
  const strings = useStrings();
  const { immersive, enterSession } = useImmersive();
  const { input, ready } = useProgression();
  const startSession = useAppStore((store) => store.startSession);
  const setSession = useAppStore((store) => store.setSession);
  const reviewQueue = useAppStore((store) => store.courses[course.id]?.reviewQueue) ?? NO_QUEUE;
  const snapshot = useAppStore((store) => store.courses[course.id]?.session) ?? null;

  const rung = ready ? currentRungId(input) : null;
  const stage = rung === null ? null : rungStage(input, rung);
  // The rung's own module, for the sentences the session serves and the gate it writes.
  // `useModules` fails silently, which is the right answer here: a rung whose file will not load
  // offers no session, and the screens that render that module report the failure properly (#79).
  const modules = useModules(rung === null ? [] : [rung]);
  const module = rung === null ? undefined : modules.get(rung);
  const sentenceIds = module?.sentences.map((sentence) => sentence.id) ?? [];

  const [run, setRun] = useState<Run | null>(null);

  if (immersive && run !== null) {
    return (
      <Session
        courseId={course.id}
        rungIds={run.rungIds}
        plan={run.plan}
        resume={run.resume}
        dir={course.dir}
        l2={l2}
      />
    );
  }

  // Nothing honest to draw yet: every count on this screen comes from the ladder and the rung's
  // module. The shell's frame is already up, so the hub waits rather than inventing a state.
  if (!ready) return <section className={styles.hub} aria-busy="true" />;

  const resumable = isResumable(snapshot);
  /**
   * How many cards the next tap will serve. A resumed session already HAS its cards, so it counts
   * those; a fresh one is planned against the queue as it will stand after the session's tick,
   * which is exactly what `startSession` does a moment later.
   */
  const cards = resumable
    ? snapshot.queue.length
    : planSession({ queue: tickSession(reviewQueue), rungIds: sentenceIds }).cardIds.length;

  const title = module?.title;
  const startable = rung !== null && stage !== 'pending' && sentenceIds.length > 0;

  const begin = (): void => {
    if (!startable) return;

    const plan = startSession(course.id, sentenceIds);
    setRun({ rungIds: sentenceIds, plan });
    enterSession();
  };

  const carryOn = (): void => {
    if (!startable || !isResumable(snapshot)) return;

    setRun({
      rungIds: sentenceIds,
      plan: resumePlan(snapshot),
      resume: { idx: snapshot.idx },
    });
    enterSession();
  };

  const beginFresh = (): void => {
    setSession(course.id, null);
    begin();
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

      {/* A rung whose sentences are not authored yet has no session to offer, so the hub offers
          nothing: no count, no CTA, and no paragraph explaining the absence — the empty column is
          the state, the same silence the rung card keeps [D22]. */}
      {startable && (
        <>
          <p className={styles.count} dir={course.dir}>
            {interpolate(strings['practice.hubCount'], { count: cards })}
          </p>

          {/* One entry into the session, at the bottom of the column where the prototype puts it.
              A resumed session takes the same slot rather than adding a second CTA beside it. */}
          <div className={styles.beginFrame}>
            <RegistrationMarks />
            <button
              type="button"
              className={styles.begin}
              onClick={resumable ? carryOn : begin}
              dir={course.dir}
            >
              {resumable ? strings['practice.resumeContinue'] : strings['practice.begin']}
            </button>
          </div>

          {/* The rarer, costlier choice — a fresh session spends a session count and a tick — so
              it is quiet rather than a second block CTA. */}
          {resumable && (
            <button type="button" className={styles.fresh} onClick={beginFresh} dir={course.dir}>
              {strings['practice.resumeNew']}
            </button>
          )}
        </>
      )}
    </section>
  );
}
