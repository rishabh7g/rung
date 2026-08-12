/**
 * Settings (#105) — the frozen section order, led by the COURSE dropdown that makes the
 * multi-course seam visible (PRD §8 F6, F0; PRD-design §4, §6.8; the prototype's Settings).
 *
 * F6 fixes the order and this screen renders exactly it: **COURSE** → **PRACTICE** →
 * **STORAGE** → **Backup** → the privacy line. STORAGE's body is #107's
 * (`./settings/StorageSection.tsx` — the quota meter, the computed rows, the durability and
 * honesty lines); Backup's is #108's (`./settings/BackupSection.tsx` — the F7 export via the
 * share sheet, and the import behind its two-sided confirm) — the ORDER stayed this ticket's
 * contract, and each section's body arrived in the slot F6 already reserved for it.
 *
 * The COURSE section is the reason the screen exists (F0): a native `<select>` over the
 * manifest's courses — it ships even with one course, because the seam is the product promise —
 * with the ACTIVE course's status line beneath it, derived from the very progression input the
 * Ladder renders and `passRitual` guards with (`useProgression`), counts only, never time
 * (Invariant 2). Under that, the reassurance note: switching never erases anything
 * (Invariant 8), in the course's own words.
 *
 * Selection change runs the switch flow (#106): `switchCourse` — the store action that ensures
 * the target's subtree, moves the pointer and resets transient UI, touching no per-course
 * persistent state (Invariant 8) — re-boots `CourseProvider` into the chosen course's strings
 * and content, and when the target's bundle IS what this screen is rendering from, the toast
 * confirms the switch in the TARGET course's own words (`switchToast`), naming both pairs:
 * the course now active and the course whose ladder is saved exactly where it was.
 *
 * What the learner reads here is the course's (`settings.*` strings); the section kickers, the
 * dropdown's label and the tick toggle's rows are English shell furniture in the register of
 * the nav's tab labels — the same call the Ladder's kickers made (#86), flagged on #71/#117
 * with them. **No checking or translation control exists here or anywhere** (F6's AC — [D18],
 * Invariant 4): there is nothing to configure about features the product does not have, and
 * the test sweeps this screen's controls to prove none crept in.
 */
import { useEffect, useId, useRef } from 'react';
import { BRAND } from '../brand.ts';
import { useCourse } from '../course/CourseProvider.tsx';
import { interpolate, useStrings, type Strings } from '../course/strings.ts';
import { currentRungId, rungStage, type ProgressionInput } from '../engine/progression.ts';
import { useAppStore } from '../state/store.ts';
import { Toast, useToast } from '../shell/Toast.tsx';
import { rungLabel } from './ladder/rungLabel.ts';
import { RegistrationMarks } from './RegistrationMarks.tsx';
import BackupSection from './settings/BackupSection.tsx';
import StorageSection from './settings/StorageSection.tsx';
import { useProgression } from './useProgression.ts';
import styles from './SettingsScreen.module.css';

export default function SettingsScreen() {
  const { course, courses } = useCourse();
  const strings = useStrings();
  const switchCourse = useAppStore((store) => store.switchCourse);
  const setSetting = useAppStore((store) => store.setSetting);
  const tickEnabled = useAppStore((store) => store.settings.elapsedTickEnabled);
  // The active course's ladder, loaded and derived — the same lines the Ladder starts with, so
  // the status here and the rungs there cannot disagree: they are one derivation.
  const { levels, input, ready } = useProgression();

  const selectId = useId();
  const tickLabelId = useId();

  const { message: toastMessage, show: showToast } = useToast();
  // The course this screen rendered last — the toast's memory of whose ladder is being left.
  // A ref rather than state: it is only ever read against the render's own `course`, and the
  // one transition it detects is the provider re-booting into another course.
  const renderedCourse = useRef(course);

  // The toast waits for the switch to be TRUE, not merely requested: `switchCourse` moves the
  // pointer synchronously, but the provider re-boots strings and content before this screen
  // sees the target as `course` — and only then is `strings.switchToast` the target course's
  // own template (#106: the whole voice changes with the course, the toast's included). So the
  // trigger is the arrival, not the tap: when the course this render holds is not the one the
  // last render held, the switch just completed, and both pair labels are at hand.
  useEffect(() => {
    const left = renderedCourse.current;
    renderedCourse.current = course;
    if (left.id === course.id) return;

    showToast(interpolate(strings.switchToast, { to: course.pairLabel, from: left.pairLabel }));
  }, [course, strings, showToast]);

  // No ladder, no status: before the levels resolve (or when the content layer is broken —
  // that failure belongs to the screens that render the ladder, not to Settings) the slot is
  // simply absent. Every count in the line would be dishonest without the ladder behind it.
  const status = ready && levels.error === null ? statusLine(input, strings) : null;

  return (
    <section className={styles.settings}>
      <h2 className={styles.title}>Settings</h2>

      {/* ------------------------------------------------------------------ COURSE (F0) */}
      <section className={styles.card}>
        <RegistrationMarks />
        <h3 className={styles.kicker}>COURSE</h3>
        <div className={styles.courseField}>
          <label className={styles.fieldLabel} htmlFor={selectId}>
            Active course
          </label>
          {/* Native on purpose (PRD-design §7): the platform's own picker scales to many
              courses and owes this screen nothing. ≥16px type is the iOS zoom guard
              (design/pwa-checklist.md §1); the target is the 44px floor. */}
          <select
            id={selectId}
            className={styles.select}
            value={course.id}
            onChange={(event) => switchCourse(event.target.value)}
          >
            {courses.map((row) => (
              <option key={row.id} value={row.id}>
                {row.pairLabel}
              </option>
            ))}
          </select>
          {status !== null && (
            <p className={styles.status} dir={course.dir}>
              {status}
            </p>
          )}
        </div>
        <p className={styles.switchNote} dir={course.dir}>
          {strings['settings.switchNote']}
        </p>
      </section>

      {/* ------------------------------------------------------------------ PRACTICE */}
      <section className={styles.card}>
        <RegistrationMarks />
        <h3 className={styles.kicker}>PRACTICE</h3>
        <div className={styles.row}>
          <div className={styles.rowText}>
            <p className={styles.rowTitle} id={tickLabelId}>
              Gentle elapsed tick
            </p>
            <p className={styles.rowNote}>
              A thin, numberless line during sessions — fills once, never counts down.
            </p>
          </div>
          {/* The same seg the self-mark draws, for the same reason it is buttons rather than
              radios there (`components/SelfMark`, Invariant 6): no input element anywhere.
              Unlike a mark it always has a state — the setting is never null — and its live
              effect is #98's Tick reading the store. */}
          <div className={styles.seg} role="group" aria-labelledby={tickLabelId}>
            <button
              type="button"
              className={tickEnabled ? styles.segSelected : styles.segOption}
              aria-pressed={tickEnabled}
              onClick={() => setSetting('elapsedTickEnabled', true)}
            >
              On
            </button>
            <button
              type="button"
              className={tickEnabled ? styles.segOption : styles.segSelected}
              aria-pressed={!tickEnabled}
              onClick={() => setSetting('elapsedTickEnabled', false)}
            >
              Off
            </button>
          </div>
        </div>
      </section>

      {/* ------------------------------------------- STORAGE — computed, honest (#107, F6) */}
      <section className={styles.card}>
        <RegistrationMarks />
        <h3 className={styles.kicker}>STORAGE</h3>
        <StorageSection />
      </section>

      {/* --------------------------------------- Backup — export / import (#108, F6, F7) */}
      <section className={styles.card}>
        <RegistrationMarks />
        <h3 className={styles.backupTitle}>Backup</h3>
        <BackupSection />
      </section>

      {/* The privacy line the screen (and the IA) ends on. The frame is shell furniture in the
          prototype's own words; the promise itself is the course's (`settings.privacy`). */}
      <p className={styles.privacy}>
        {BRAND} — read-only teaching · zero inputs · zero network.{' '}
        <span className={styles.privacyPromise} dir={course.dir}>
          {strings['settings.privacy']}
        </span>{' '}
        Built by Rishabh, for one learner.
      </p>

      {/* The switch confirmation (#106) — the shared transient line (#86), in the TARGET
          course's words and direction: by the time a message is up, `course` is the course
          switched to. */}
      <Toast message={toastMessage} dir={course.dir} />
    </section>
  );
}

/**
 * The status line, in the shape the ladder is actually in — the Ladder's own derivation
 * (level, passed-of-total, current rung), rendered through the course's template:
 *
 *   • a current rung with content   → `settings.statusLine` ("Level 1 · 2 of 10 passed ·
 *     M3 in progress"), `{rung}` printed the way the Ladder prints it (`rungLabel`);
 *   • a current rung still unauthored → `settings.statusPending`, which names no rung —
 *     nothing is in progress through sentences that do not exist;
 *   • no current rung at all — the whole ladder passed — → no line. The completion state is
 *     quiet everywhere (PRD-design §3.6), and a count with nothing in progress says nothing
 *     a dropdown's silence does not.
 */
function statusLine(input: ProgressionInput, strings: Strings): string | null {
  const current = currentRungId(input);
  if (current === null) return null;

  const plan = input.levels.find((entry) => entry.moduleIds.includes(current));
  if (plan === undefined) return null;

  const counts = {
    level: plan.level,
    passed: plan.moduleIds.filter((moduleId) => input.passed.has(moduleId)).length,
    total: plan.moduleIds.length,
  };

  return rungStage(input, current) === 'pending'
    ? interpolate(strings['settings.statusPending'], counts)
    : interpolate(strings['settings.statusLine'], { ...counts, rung: rungLabel(current) });
}
