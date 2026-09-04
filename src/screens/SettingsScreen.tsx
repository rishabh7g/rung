/**
 * Settings (#105, remade by #392–#394; PRD §8 F0, F6, PRD-design §5, §7) — three cards, and every
 * one of them is a thing the learner can change.
 *
 * **Course, Practice, Backup.** That is the screen. What a card does not hold is anything the
 * learner cannot act on: this page used to carry a second dropdown that only filtered the first,
 * a line of the Ladder's own status, a paragraph explaining a 2px hairline, and a storage table
 * with a byte figure per installed course — a page and a half of screen, most of it read-only.
 *
 * **One course picker, because it is one decision** (#392). It used to be two: "your language",
 * then "active course", where the first silently switched the second to whatever course matched.
 * A learner had to work out that the top control changed the bottom one's options — the same
 * "one decision shown as two" the Practice session had in its Review/Read split (#388). The pairs
 * themselves are the choice, so the pairs are what the select lists: `हिंदी → मराठी`,
 * `English → Spanish`. Nine of them is a short list, and the language a learner reads is the left
 * half of the pair rather than a preference of its own.
 *
 * That retired `settings.userLang`, whose only reader in the whole app was the filter — state v12
 * drops it (`state/store.ts`'s migration, `state/types.ts`).
 *
 * **The picker is native on purpose** (PRD-design §7): the platform's own control scales to as
 * many courses as ship and owes this screen nothing. ≥16px type is the iOS zoom guard
 * (design/pwa-checklist.md §1); the target is the 44px floor.
 *
 * **The screen writes through the store and derives nothing** (#394). It no longer asks
 * `useProgression()` — that was for a status line ("Level 1 · 3 of 10 passed · M4 in progress")
 * which is the Ladder's own sentence, on the screen one tap away. Dropping it also means Settings
 * has nothing to wait for: it renders complete on first paint, where it used to hold a slot empty
 * until the ladder resolved.
 */
import { useEffect, useId, useRef } from 'react';
import { useCourse } from '../course/CourseProvider.tsx';
import { interpolate, useStrings } from '../course/strings.ts';
import { useAppStore } from '../state/store.ts';
import { Toast, useToast } from '../shell/Toast.tsx';
import { RegistrationMarks } from './RegistrationMarks.tsx';
import BackupSection from './settings/BackupSection.tsx';
import styles from './SettingsScreen.module.css';

export default function SettingsScreen() {
  const { course, courses } = useCourse();
  const strings = useStrings();
  const switchCourse = useAppStore((store) => store.switchCourse);
  const setSetting = useAppStore((store) => store.setSetting);
  const tickEnabled = useAppStore((store) => store.settings.elapsedTickEnabled);

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

  return (
    <section className={styles.settings}>
      <h2 className={styles.title} dir={course.dir}>
        {strings['settings.title']}
      </h2>

      {/* ------------------------------------------------------------------ COURSE (F0) */}
      <section className={styles.card}>
        <RegistrationMarks />
        <h3 className={styles.kicker} dir={course.dir}>
          {strings['settings.kicker.course']}
        </h3>
        <div className={styles.courseField}>
          <label className={styles.fieldLabel} htmlFor={selectId} dir={course.dir}>
            {strings['settings.activeCourse']}
          </label>
          <select
            id={selectId}
            className={styles.select}
            value={course.id}
            onChange={(event) => switchCourse(event.target.value)}
          >
            {/* The PAIR, not the target language alone (#392): the pair is the whole choice, and
                a list of bare target languages would hide which of two courses teaching the same
                one a learner is picking. `pairLabel` is the course's own words for itself — the
                same label the switch toast prints. */}
            {courses.map((row) => (
              <option key={row.id} value={row.id}>
                {row.pairLabel}
              </option>
            ))}
          </select>
        </div>
      </section>

      {/* ------------------------------------------------------------------ PRACTICE */}
      <section className={styles.card}>
        <RegistrationMarks />
        <h3 className={styles.kicker} dir={course.dir}>
          {strings['settings.kicker.practice']}
        </h3>
        <div className={styles.row}>
          {/* The title and nothing under it (#394). The note that used to sit here explained the
              tick in three lines — the longest text on the page, about its smallest object, next
              to a pair of buttons that already say what they do. */}
          <p className={styles.rowTitle} id={tickLabelId} dir={course.dir}>
            {strings['settings.tick.title']}
          </p>
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
              dir={course.dir}
            >
              {strings['settings.tick.on']}
            </button>
            <button
              type="button"
              className={tickEnabled ? styles.segOption : styles.segSelected}
              aria-pressed={!tickEnabled}
              onClick={() => setSetting('elapsedTickEnabled', false)}
              dir={course.dir}
            >
              {strings['settings.tick.off']}
            </button>
          </div>
        </div>
      </section>

      {/* ----------------------- Backup — export / import, and the room there is (#108, F6, F7) */}
      <section className={styles.card}>
        <RegistrationMarks />
        <h3 className={styles.backupTitle} dir={course.dir}>
          {strings['settings.backup.title']}
        </h3>
        <BackupSection />
      </section>

      {/* The switch confirmation (#106) — the shared transient line (#86), in the TARGET
          course's words and direction: by the time a message is up, `course` is the course
          switched to. */}
      <Toast message={toastMessage} dir={course.dir} />
    </section>
  );
}
