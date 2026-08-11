/**
 * The Ladder (#86) — the app's home screen, and the whole product in one view
 * (PRD-design §4 [D21]: no onboarding, first run lands here; §5, §7 [D16]; PRD §8 F1).
 *
 * Four things, top to bottom, and every one of them derived rather than stored:
 *
 *   1. **The position line** — `LEVEL 1 · 2 OF 10`, counts only.
 *   2. **The level strip** — three cells, ten squares each, sealed levels muted behind a lock.
 *      Tapping a sealed cell answers with an honest toast naming what is left below it.
 *   3. **The rungs of the active level**, with the [D16] markers: a passed rung is a filled accent
 *      circle with a check and a link to its module; the current rung is a crosshair and the card
 *      the screen is built around; a locked rung is a hollow circle at half opacity and **is not a
 *      control** — no link, no button, nothing for a screen reader to offer or a thumb to find.
 *      "The ladder is visible; the rungs are sealed" (PRD-design §3.2) is a DOM fact here.
 *   4. **The pending line and the ownership footer** — the recurring "yours to pace" copy.
 *
 * Everything the learner reads is the course's: rung titles and jobs and level names come from
 * that course's `levels.json`, the three sentences come from its `strings.json` (PRD §4, guarded
 * by `src/shellPurity.test.ts`). The only English in here is structural furniture — the `LEVEL`
 * and `CURRENT RUNG` kickers and the `PASSED` status label — the same register as the nav's tab
 * labels. There is no `%`, no date, no streak, and there never will be (Invariant 2).
 *
 * **Nothing on this screen is a source of truth.** `src/engine/progression.ts` answers every
 * question it asks — which rung is current, which levels are sealed, what state each module is in
 * — from the input `progressionInput` assembles out of the store, which is the same input
 * `passRitual` guards with. A count rendered here and a rule enforced there cannot disagree,
 * because they are the same derivation.
 */
import { useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useCourse } from '../course/CourseProvider.tsx';
import { interpolate, useStrings } from '../course/strings.ts';
import { useLevels } from '../course/content.ts';
import { ContentErrorScreen } from '../course/BootScreens.tsx';
import {
  currentRungId,
  deriveStatuses,
  ladderFromLevels,
  levelSealed,
} from '../engine/progression.ts';
import { progressionInput, useAppStore } from '../state/store.ts';
import { Toast, useToast } from '../shell/Toast.tsx';
import { LevelStrip, type LevelCell, type SquareState } from './ladder/LevelStrip.tsx';
import { RungMarker } from './ladder/RungMarker.tsx';
import styles from './LadderScreen.module.css';

/**
 * Nothing is exit-ready until the production counters exist (**#95**). The engine takes the fact
 * as an injected predicate, so this is the honest answer rather than a placeholder — and it is a
 * module constant so the memo below has a stable dependency.
 */
const NOTHING_EXIT_READY = () => false;

interface LadderScreenProps {
  /**
   * Every sentence of a module produced ≥ 2× (PRD §8 F1). Injectable for the same reason the
   * engine takes it: **#95** owns the real predicate, and until then the screen is honest about
   * having no counters to read.
   */
  exitAvailable?: (moduleId: string) => boolean;
}

export default function LadderScreen({ exitAvailable = NOTHING_EXIT_READY }: LadderScreenProps) {
  const { course } = useCourse();
  const strings = useStrings();
  const levels = useLevels();
  const toast = useToast();
  const setLadder = useAppStore((store) => store.setLadder);
  const state = useAppStore();

  /** `levels.json` in the engine's shape. Memoised so the effect below writes once per load. */
  const ladder = useMemo(
    () => (levels.data === null ? null : ladderFromLevels(levels.data.levels)),
    [levels.data],
  );

  // The store holds a course's ladder as CONTENT, never persisted, and until it has been handed
  // one, `passRitual` has no rung to check against and nothing can pass (`store.ts`). This screen
  // is where the course layer's ladder meets the store — an effect, because it is a write.
  useEffect(() => {
    if (ladder !== null) setLadder(course.id, ladder);
  }, [course.id, ladder, setLadder]);

  // The same input the store guards writes with — assembled from what this course actually holds.
  const input = useMemo(
    () => progressionInput(state, course.id, exitAvailable),
    [state, course.id, exitAvailable],
  );

  // A broken ladder is the content layer failing, which is one screen wherever it fails (#79).
  if (levels.error !== null) return <ContentErrorScreen detail={levels.error.message} />;

  // Before the ladder has loaded AND reached the store there is nothing honest to draw: every
  // count on this screen is derived from it, and an empty input would render a finished ladder.
  // The shell's frame is already up, so the screen waits rather than inventing a state.
  const plan = levels.data?.levels;
  if (plan === undefined || input.levels.length === 0) {
    return <section className={styles.ladder} aria-busy="true" />;
  }

  const statuses = deriveStatuses(input);
  const current = currentRungId(input);

  // The level the rung list shows: the one holding the current rung, or the last level when the
  // whole ladder is passed — the quiet completion state, whose beat and edge states are #68/#103.
  const activeIndex =
    current === null
      ? plan.length - 1
      : plan.findIndex((level) => level.modules.some((module) => module.id === current));
  const active = plan[activeIndex];
  // Unreachable past `parseLevels` (a ladder with no levels never loads); TypeScript cannot know.
  if (active === undefined) return <section className={styles.ladder} aria-busy="true" />;

  const level = activeIndex + 1;
  const total = active.modules.length;
  const passed = active.modules.filter((module) => statuses[module.id] === 'passed').length;

  const cells: LevelCell[] = plan.map((entry, index) => {
    const sealed = levelSealed(input, index + 1);
    return {
      level: index + 1,
      name: entry.name,
      tagline: entry.tagline,
      sealed,
      active: index === activeIndex,
      squares: entry.modules.map((module): SquareState => {
        if (sealed) return 'sealed';
        if (statuses[module.id] === 'passed') return 'passed';
        return module.id === current ? 'current' : 'pending';
      }),
    };
  });

  /**
   * The seal rule's honest half: counts only, never "come back later" (PRD-design §5).
   * An arrow rather than a declaration so the narrowing above survives into it — a hoisted
   * function could be called before the guard, so TypeScript forgets what `plan` is inside one.
   */
  const sealedTap = (sealedLevel: number): void => {
    const remaining = plan
      .slice(0, sealedLevel - 1)
      .flatMap((entry) => entry.modules)
      .filter((module) => statuses[module.id] !== 'passed').length;

    toast.show(interpolate(strings['ladder.sealedToast'], { level: sealedLevel, remaining }));
  };

  return (
    <section className={styles.ladder}>
      {/* The position line and the strip stay put while the rungs scroll, as they do in the
          prototype — there they sit outside the scroll area, here they are sticky inside the
          shell's one scroll column (design/pwa-checklist.md §1). */}
      <div className={styles.head}>
        {/* Structural furniture, and the only numbers on the screen: counts, never time. The
            prototype puts this line in the Ladder's own header row; the shell's brand header is
            screen-agnostic (#84), so it renders as the screen's first row — reconciled in #117. */}
        <p className={styles.position}>
          LEVEL {level} · {passed} OF {total}
        </p>

        <LevelStrip cells={cells} dir={course.dir} onSealedTap={sealedTap} />
      </div>

      <div className={styles.body}>
        {current !== null && (
          <p className={styles.pending} dir={course.dir}>
            {interpolate(strings['ladder.pendingLine'], {
              level,
              remaining: total - passed,
              total,
            })}
          </p>
        )}

        <ol className={styles.rungs}>
          {active.modules.map((module) =>
            module.id === current ? (
              <CurrentRung
                key={module.id}
                moduleId={module.id}
                title={module.title}
                job={module.job}
                dir={course.dir}
              />
            ) : statuses[module.id] === 'passed' ? (
              <PassedRung
                key={module.id}
                moduleId={module.id}
                title={module.title}
                job={module.job}
                dir={course.dir}
              />
            ) : (
              <LockedRung
                key={module.id}
                moduleId={module.id}
                title={module.title}
                job={module.job}
                dir={course.dir}
              />
            ),
          )}
        </ol>

        <p className={styles.ownership} dir={course.dir}>
          {strings['ladder.ownership']}
        </p>
      </div>

      <Toast message={toast.message} dir={course.dir} />
    </section>
  );
}

/* --------------------------------------------------------------------- the rows */

interface RungProps {
  moduleId: string;
  title: string;
  job: string;
  dir?: string;
}

/**
 * The current rung — the dominant object on the screen: a blueprint card (square corners, a
 * hairline, `--shadow-sm`) with the rung's title at `--text-rung-title`.
 *
 * ┌───────────────────────────────────────────────────────────────────────────────────────┐
 * │ THE STAGED RUNG CARD [D22] MOUNTS INSIDE THIS CARD — **#87**.                          │
 * │ Its four stages (fresh → "Start with the module", studied → Practice + "revisit the    │
 * │ module", exit_ready → "Exit ritual — open", pending → the `pendingAuthoring` note) come │
 * │ from `rungStage(input, id)`, which this screen already has an input for, and they land  │
 * │ directly below the job line. Nothing else on this screen changes when they do.          │
 * └───────────────────────────────────────────────────────────────────────────────────────┘
 *
 * Until then the title is the link into the module, so the rung is reachable from its own row —
 * the issue's "passed/current → /module/:id". #87's primary CTA is the permanent way in.
 */
function CurrentRung({ moduleId, title, job, dir }: RungProps) {
  return (
    <li className={styles.currentItem}>
      <RungMarker state="current" />
      <div className={styles.card}>
        <p className={styles.cardKicker}>{rungLabel(moduleId)} · CURRENT RUNG</p>
        <h2 className={styles.cardTitle}>
          <Link className={styles.cardLink} to={`/module/${moduleId}`} dir={dir}>
            {title}
          </Link>
        </h2>
        <p className={styles.cardJob} dir={dir}>
          {job}
        </p>
      </div>
    </li>
  );
}

/** A rung the learner has climbed: filled marker, and open for practice forever after. */
function PassedRung({ moduleId, title, job, dir }: RungProps) {
  return (
    <li>
      <Link className={styles.row} to={`/module/${moduleId}`}>
        <RungMarker state="passed" />
        <span className={styles.rowText}>
          <span className={styles.rowTitle}>
            {rungLabel(moduleId)} ·{' '}
            <span dir={dir} className={styles.rowTitleContent}>
              {title}
            </span>
          </span>
          <span className={styles.rowJob} dir={dir}>
            {job}
          </span>
        </span>
        <span className={styles.passedLabel}>PASSED</span>
      </Link>
    </li>
  );
}

/**
 * A locked rung: visible, and genuinely inaccessible (PRD-design §3.2). No link, no button, no
 * tabindex — the row is text and a lock, so there is nothing to tap and nothing for a screen
 * reader to announce as available. `LadderScreen.test.tsx` asserts exactly that.
 */
function LockedRung({ moduleId, title, job, dir }: RungProps) {
  return (
    <li className={styles.rowLocked}>
      <RungMarker state="locked" />
      <span className={styles.rowText}>
        <span className={styles.rowTitle}>
          {rungLabel(moduleId)} ·{' '}
          <span dir={dir} className={styles.rowTitleContent}>
            {title}
          </span>
        </span>
        <span className={styles.rowJob} dir={dir}>
          {job}
        </span>
      </span>
      <Lock className={styles.rowLock} aria-hidden="true" />
    </li>
  );
}

/**
 * How a row prints a module id: `L1-M3` → `M3`, the way the prototype labels its rungs.
 * **Display only.** Nothing derives meaning from the shape of an id — a rung's position is the
 * ladder's order, which is the engine's whole answer (`progression.ts`).
 */
function rungLabel(moduleId: string): string {
  return moduleId.split('-').at(-1) ?? moduleId;
}
