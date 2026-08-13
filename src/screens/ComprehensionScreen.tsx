/**
 * The exit ritual's second half (#102; PRD §8 F5, PRD-design §6.6 flow 6; prototype →
 * design/Rung App v3.3.dc.html → Comprehend, item, reveal and the retry interstitial).
 *
 * Two sentences from the rung's comprehension pool, read for meaning, checked against the
 * scripted answer, and self-marked — and a retry that always deals **fresh** sentences, forever,
 * with nothing counted against the learner.
 *
 * Four things make this screen what it is:
 *
 *   • **It is entered, never navigated to.** The guard is the hold's own hand-over token
 *     (`handover('hold')`, `shell/routes.tsx`): a deep link to `#/comprehension`, a refresh into
 *     it, or a back tap onto an entry that never held one lands on `/ritual` — where the hold is.
 *     The token travels in the history entry rather than in the store (nothing about an
 *     unfinished ritual is progress) or on the ritual screen (which deliberately keeps no state
 *     at all, #100). The counters are still asked too: a rung that is no longer `exit_available`
 *     — passed a moment ago, or never produced out — has no test to sit, whatever the entry says.
 *   • **Nothing is stored, ever, on a failed round** (Invariant 4). This file imports no store
 *     action, holds the attempt in one component cell that dies with the screen, and drops the
 *     marks the instant a retry starts. There is no attempt count, no failure count and no
 *     history — not hidden, not disabled: absent, so there is no number a future screen could
 *     render. The one write in the whole ritual is the pass, and it is #103's.
 *   • **The retry is calm, and it is the design** [PRD §8 F5]. "Not quite" leads to the course's
 *     own three lines and one button; no red, no counter, no "attempt 2 of ∞". The items behind
 *     it are new: `drawItems` (`engine/comprehension.ts`) excludes everything already used until
 *     the pool exhausts, then recycles without ever dealing back the round just played.
 *   • **The controls are the ones the product already has.** `SelfMark` verbatim (#93) — the same
 *     two segments, the same fills, and Next **hidden** until a mark exists [D11] — and `WhyPanel`
 *     (#94) on the reveal, resolving the item against its module's word index like any other
 *     revealed line. The reveal itself is this screen's own, because it runs the other way round:
 *     Practice reveals the L2 for an L1 cue, Comprehension reveals the L1 for an L2 line
 *     (`revealLabelComprehend`, and `RevealCard`'s header says why it is not a third mode there).
 *
 * Every learner-facing word is the course's (`nudge.comprehend`, `revealLabelComprehend`,
 * `cueLabel`, `mark.*`, `retry.*`). The English on screen is structural furniture in the register
 * of the module list's `M1 · MODULE` kicker, and the two `n / m` are counts — the prototype's
 * "part 2 of 2 · 1 of 2" would be a shell-owned sentence, the call #100 made for part 1.
 */
import { useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useCourse } from '../course/CourseProvider.tsx';
import { l2Written } from '../course/manifest.ts';
import { useModule } from '../course/content.ts';
import type { PoolItem } from '../course/types.ts';
import { drawItems } from '../engine/comprehension.ts';
import { currentRungId, deriveStatuses } from '../engine/progression.ts';
import type { Mark } from '../components/SelfMark.tsx';
import { cameFrom, handover, HOME_PATH, RITUAL_PATH, VERDICT_PATH } from '../shell/routes.tsx';
import { ComprehensionItem } from './comprehension/ComprehensionItem.tsx';
import { RetryInterstitial } from './comprehension/RetryInterstitial.tsx';
import { rungLabel } from './ladder/rungLabel.ts';
import { useProgression } from './useProgression.ts';
import styles from './ComprehensionScreen.module.css';

/** The ritual's two parts — the arc (#100) and this one, which `RitualScreen` counts as `1 / 2`. */
const RITUAL_PARTS = 2;

/**
 * The route's component: it answers "which rung, if any", "was the hold paid" and "is the ritual
 * still open", and hands a real id to the test below — which therefore never asks the content
 * layer for a module that does not exist.
 */
export default function ComprehensionScreen() {
  const { state } = useLocation();
  const { input, ready } = useProgression();
  const rung = ready ? currentRungId(input) : null;

  /** The same predicate the arc reads (#95, #100): every sentence of the rung produced ≥ 2×. */
  const open = rung !== null && deriveStatuses(input)[rung] === 'exit_available';

  // Nothing honest to draw yet: the ladder decides whether this screen may exist at all. The
  // shell's frame is already up, so it waits rather than flashing a test it may have to replace.
  if (!ready) return <section className={styles.comprehension} aria-busy="true" />;
  if (rung === null) return <Navigate to={HOME_PATH} replace />;

  /**
   * **Part 2 is where part 1 leaves you**, and this is the whole of that guard: no token, no
   * screen. The learner goes to `/ritual` rather than to a message — the hold is what opens this
   * one — and the arc's own guard takes it from there (a rung that is not produced out lands on
   * its module, a finished ladder on the Ladder). No path here ever points back at
   * `/comprehension`, so the two guards cannot bounce a learner between themselves.
   */
  if (!cameFrom('hold', state)) return <Navigate to={RITUAL_PATH} replace />;

  return <ComprehensionTest moduleId={rung} open={open} />;
}

interface ComprehensionTestProps {
  /** The current rung — the only module this screen ever reads. */
  moduleId: string;
  /** Is this rung still produced out? Live: passing it (#103) closes this screen behind you. */
  open: boolean;
}

/** The module gate: the pool and the item count are content, and until they land there is no test. */
function ComprehensionTest({ moduleId, open }: ComprehensionTestProps) {
  const module = useModule(moduleId);

  /**
   * Until the module lands, nothing here can be said — including "no". `open` is derived from a
   * module load of its own (`useExitAvailable`, #95, which joins the rung's sentence ids to the
   * counters), so on the first render of this screen it is still `false` for want of a file
   * rather than for want of production: judging it here would turn every legitimate hand-over
   * into a redirect. The arc waits on the same fact for the same reason (#100).
   */
  if (module.data === null && module.error === null) {
    return <section className={styles.comprehension} aria-busy="true" />;
  }

  /**
   * A module file that will not load lands where it gets reported: `ModuleScreen` owns the
   * content-error screen (#79), and one failure should not have two screens claiming it. A pool
   * with nothing in it is the same answer — there is no test to sit, and the build has already
   * refused that file (`tools/validate.ts`, `POOL_MIN`).
   */
  if (module.data === null || module.data.comprehensionPool.length === 0) {
    return <Navigate to={`/module/${moduleId}`} replace />;
  }

  /**
   * And the counters, asked once they can answer: a rung that is no longer produced out has no
   * test to sit, whatever history entry the learner arrived on. It is the very predicate the
   * Ladder's card and the arc read (`exit_available`, #95), so the three cannot disagree — and it
   * is live, so passing this rung (#103) closes the screen behind the learner rather than leaving
   * a back tap pointing at a test for a rung that is already climbed.
   */
  if (!open) return <Navigate to={RITUAL_PATH} replace />;

  return (
    <ComprehensionRound
      moduleId={moduleId}
      pool={module.data.comprehensionPool}
      // The module's own number, like the arc's constraint: `2` today, and a module that asked
      // for three would get three with no code change (PRD §7 `exitTest`).
      count={module.data.exitTest.comprehendCount}
    />
  );
}

interface ComprehensionRoundProps {
  moduleId: string;
  pool: readonly PoolItem[];
  count: number;
}

/**
 * One visit to the screen: the attempt on show, and the ids this visit has already used.
 *
 * **This is the whole of what a failed round leaves behind, and it is gone when the screen is.**
 * `used` is what the next draw excludes — not a score; `marks` is emptied the moment a retry
 * starts, so the app is never holding a record of what went wrong; and there is no attempt
 * counter anywhere in the shape.
 */
interface Attempt {
  /** The items this attempt serves, in the order they are shown. */
  items: PoolItem[];
  /** Which of them is on screen. */
  idx: number;
  /** The marks so far, this attempt only. Read once, at the end, then dropped. */
  marks: Mark[];
  /** Every id dealt this visit, oldest first — `drawItems`' exclusion list. */
  used: string[];
  /** The retry interstitial is up: the last attempt had a "not quite" in it. */
  retry: boolean;
}

function ComprehensionRound({ moduleId, pool, count }: ComprehensionRoundProps) {
  const { course } = useCourse();
  const navigate = useNavigate();

  /**
   * The draw happens exactly twice in this component's life: once here, and once per "Fresh
   * sentences". A lazy initialiser is what keeps it to that — a draw in the render body would
   * deal a new pair every time anything re-rendered.
   *
   * `setAttempt`, never `setState`: `src/state/unlockPath.test.ts` scans the shell for that call
   * and the store's actions are the only place allowed to make it (Invariant 1).
   */
  const [attempt, setAttempt] = useState<Attempt>(() => deal(pool, [], count));

  const item = attempt.items[attempt.idx];

  /**
   * ─────────────────────────── the pass seam (#103) ───────────────────────────
   * Every item marked "same meaning": the test is passed, and **this screen writes nothing**.
   * `passRitual` — the module to `passed`, the next rung unlocked, the single beat — is #103's,
   * on the Verdict screen this hands over to, and the token says the comprehension was really
   * taken (`cameFrom('comprehension', …)`, the same key the hold hands this screen).
   *
   * `replace`, because a passed test is not something to walk back into: the entry that carried
   * the hold's token goes with it.
   * ────────────────────────────────────────────────────────────────────────────
   */
  function pass(): void {
    void navigate(VERDICT_PATH, { state: handover('comprehension'), replace: true });
  }

  /**
   * A mark lands on Next, which is the only moment it exists at all (the item holds it until
   * then, and `SelfMark` holds nothing). Three ways out, in the PRD's own order: another item,
   * the pass, or the retry.
   *
   * **A "not quite" does not cut the attempt short.** The second item is still shown, still
   * revealed, still the learner's to mark — stopping at the first miss would be the app grading
   * as it goes, and the retry is not a punishment to hurry towards.
   */
  function mark(value: Mark): void {
    const marks = [...attempt.marks, value];

    if (attempt.idx + 1 < attempt.items.length) {
      setAttempt({ ...attempt, idx: attempt.idx + 1, marks });
      return;
    }

    if (marks.every((each) => each === 'got')) {
      pass();
      return;
    }

    // The interstitial, and the marks are dropped on the way into it: what went wrong is the
    // learner's to know, and the app is finished with it (Invariant 4).
    setAttempt({ ...attempt, marks: [], retry: true });
  }

  /** "Fresh sentences": a new attempt, excluding everything this visit has already used. */
  function fresh(): void {
    setAttempt(deal(pool, attempt.used, count));
  }

  return (
    <section className={styles.comprehension}>
      <div className={styles.head}>
        {/* Structural furniture, like the module list's `M1 · MODULE` — raised on #71. */}
        <p className={styles.kicker}>{rungLabel(moduleId)} · EXIT RITUAL</p>
        {/* The prototype's "part 2 of 2 · 1 of 2", as counts. The item's position belongs to an
            item, so the interstitial — which is not one — shows only the part. */}
        <p className={styles.part}>
          {`${RITUAL_PARTS} / ${RITUAL_PARTS}`}
          {!attempt.retry && item !== undefined && (
            <span className={styles.position}>
              {` · ${attempt.idx + 1} / ${attempt.items.length}`}
            </span>
          )}
        </p>
      </div>

      {attempt.retry ? (
        <RetryInterstitial onFresh={fresh} dir={course.dir} />
      ) : (
        item !== undefined && (
          // Keyed by the item, so a new sentence is a new card: the reveal, the mark and the
          // "why" belong to the line they were opened for and nothing survives into the next.
          <ComprehensionItem
            key={item.id}
            item={item}
            onMark={mark}
            dir={course.dir}
            l2={l2Written(course)}
          />
        )
      )}
    </section>
  );
}

/** A fresh attempt off the pool, and the used list it grows. The one place a draw is turned into
 * state, so "what has this visit seen" cannot fall out of step with "what is on screen". */
function deal(pool: readonly PoolItem[], used: readonly string[], count: number): Attempt {
  const ids = drawItems({ pool: pool.map((item) => item.id), used, count });
  const items = ids.flatMap((id) => pool.filter((item) => item.id === id));

  return { items, idx: 0, marks: [], used: [...used, ...ids], retry: false };
}
