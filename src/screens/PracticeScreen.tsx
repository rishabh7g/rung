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
 * **It is one screen, not a page to read** (#316). It stood between the learner's intent and their
 * first card on the common path — tap Practice on the rung card, read three tall numbered phase
 * blocks, tap Begin — which is a lot of screen spent describing what the next tap was going to do
 * anyway. The three counts still earn their place (they are the promise the session then keeps),
 * so what went is the WEIGHT: the prototype's `01 / 02 / 03` numerals and the stacked blocks, for
 * one compact row. Begin sits in thumb reach without scrolling, and the hub reads as the single
 * action it is.
 *
 * The structural version of #316 — the rung card's CTA starting a session outright, skipping this
 * screen — was built and backed out. Honouring a "start now" flag on arrival means calling
 * `startSession` (a WRITE: it spends a count and ticks the review queue) from an effect, and the
 * local state that the resulting plan has to live in makes it a `setState` inside an effect, which
 * this repo's lint forbids and which has no `eslint-disable` precedent anywhere in `src/`. The
 * alternatives were worse: a ref cannot be read during render, and deriving the run from the
 * snapshot instead would have re-created the plan through the resume path, where a fresh session's
 * queue is deliberately ticked and a resumed one's is not. Recorded rather than retried.
 *
 * **Starting is one call, and it happens once.** `startSession` increments `sessionCount`, ticks
 * the review queue and writes the opening snapshot in a single write, and answers with the plan
 * the session then runs on. Nothing else in the app may do any of that — and RESUMING (#99) calls
 * it not at all, which is only safe while there is one caller.
 *
 * **The session is immersive** (#84): `enterSession` hides the nav and puts the pause ✕ in the
 * header; the ✕, the back button, and any navigation away end it (`AppShell`). The learner's
 * position survives that in the per-course snapshot, and this screen is where they pick it back
 * up: an open session for the ACTIVE course turns the Begin CTA into the resume plate
 * (`ResumeBanner`), whose two controls are the ticket's whole rule —
 *
 *   • **Continue** restores the snapshot's phase, index and queue, and starts NOTHING: no second
 *     `sessionCount`, no second tick of the review queue. Closing a tab is not a session.
 *   • **New session** drops the snapshot and begins a fresh one, which is the one that counts.
 *
 * **The snapshot is per course, and the hub reads the ACTIVE one** — so switching away and back
 * offers that course's own position, untouched, exactly as PRD §8 F0's AC asks and exactly where
 * the prototype resets instead (§17: do not copy). Nothing on this screen has to do anything for
 * that to be true; it falls out of state v6's keying (Invariant 8).
 *
 * Every learner-facing word is the course's (`practice.*`, PRD §4). The only English is structural
 * furniture in the register of the nav's tab labels — the `M1 · WHO I AM` kicker and the phase
 * numbers — and the numbers are counts.
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
import { PHASES } from './practice/PhaseChips.tsx';
import { isResumable, resumePlan } from './practice/resume.ts';
import { ResumeBanner } from './practice/ResumeBanner.tsx';
import { Session } from './practice/Session.tsx';
import { useProgression } from './useProgression.ts';
import type { StringsKey } from '../course/stringsKeys.ts';
import type { SessionPhase } from '../state/types.ts';
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
  /** Set only on a resume (#99): where the interrupted session left off. */
  resume?: { phase: SessionPhase; idx: number };
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
  const production = useAppStore((store) => store.courses[course.id]?.production) ?? NO_COUNTERS;
  /**
   * The ACTIVE course's open session, or `null` (#99). It is read per course and never per app, so
   * a switch away and back finds this course's own position exactly where it was left — the state
   * layer's keying is the whole of that promise (Invariant 8, PRD §8 F0 AC).
   */
  const snapshot = useAppStore((store) => store.courses[course.id]?.session) ?? null;

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
        resume={run.resume}
        dir={course.dir}
        l2={l2}
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

  /**
   * CONTINUE (#99) — the same session, picked up at the card it was left on.
   *
   * `startSession` is deliberately not called: its count and its tick were spent when this session
   * opened, and spending them again would charge a learner a session for closing their tab and
   * bring the whole review queue due a second time on one sitting's work. So the queue goes into
   * the plan UNTICKED (`resumePlan`), the snapshot's own order is kept for the phase it names, and
   * the position rides along to the session.
   */
  const carryOn = (): void => {
    if (rung === null || !startable || !isResumable(snapshot)) return;

    const plan = resumePlan(snapshot, {
      queue: reviewQueue,
      moduleSentenceIds: sentenceIds,
      production,
    });
    setRun({
      moduleId: rung,
      sentenceIds,
      plan,
      resume: { phase: snapshot.phase, idx: snapshot.idx },
    });
    enterSession();
  };

  /** NEW SESSION — the snapshot dropped on purpose, then a fresh start, which is the one that counts. */
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
          nothing: no phases, no CTA, and no paragraph explaining the absence — the empty column
          is the state, the same silence the rung card keeps [D22]. */}
      {stage !== 'pending' && rung !== null && (
        <>
          {/**
           * The three phases as ONE compact row (#316), where the prototype stacks three tall
           * numbered blocks.
           *
           * The counts stay — they are the promise the session then keeps, and the whole reason
           * this screen exists — but the weight around them goes: the `01 / 02 / 03` numerals were
           * shell furniture narrating an order the row already reads in, and a blueprint plate per
           * phase made three objects out of one fact. What is left is the phase's name over its
           * count, three across, so the Begin CTA below is in thumb reach without scrolling and
           * the hub reads as the single action it is.
           */}
          <ol className={styles.phases}>
            {PHASES.map((phase) => (
              <li key={phase} className={styles.phase}>
                <p className={styles.phaseName} dir={course.dir}>
                  {strings[`practice.phase.${phase}`]}
                </p>
                <p className={styles.phaseLine} dir={course.dir}>
                  {interpolate(strings[HUB_LINE[phase]], { count: counts[phase] })}
                </p>
              </li>
            ))}
          </ol>

          {/* One entry into the session, at the bottom of the column where the prototype puts
              it — and an open session replaces it rather than sitting beside it (#99): two CTAs
              on one screen is the learner deciding which of them means "practise". */}
          {startable &&
            (isResumable(snapshot) ? (
              <ResumeBanner
                snapshot={snapshot}
                onContinue={carryOn}
                onFresh={beginFresh}
                dir={course.dir}
              />
            ) : (
              <div className={styles.beginFrame}>
                <RegistrationMarks />
                <button type="button" className={styles.begin} onClick={begin} dir={course.dir}>
                  {/* The CTA names where the session opens, because that is what it does: Review
                      when something is due, Read when nothing is (PRD §8 F4). */}
                  {preview.reviewIds.length > 0
                    ? strings['practice.beginReview']
                    : strings['practice.beginRead']}
                </button>
              </div>
            ))}
        </>
      )}
    </section>
  );
}
