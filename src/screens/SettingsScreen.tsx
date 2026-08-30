/**
 * Settings (#105) — the frozen section order, led by the COURSE dropdown that makes the
 * multi-course seam visible (PRD §8 F6, F0; PRD-design §4, §6.8; the prototype's Settings).
 *
 * F6 fixes the order and this screen renders exactly it: **COURSE** → **PRACTICE** →
 * **STORAGE** → **Backup**. STORAGE's body is #107's (`./settings/StorageSection.tsx` — the
 * quota meter and the computed rows); Backup's is #108's (`./settings/BackupSection.tsx` — the
 * F7 export via the share sheet, and the import behind its two-sided confirm) — the ORDER stayed
 * this ticket's contract, and each section's body arrived in the slot F6 already reserved for it.
 * The screen used to close on a privacy line, half the course's promise and half the shell's
 * ("read-only teaching · zero inputs · zero network"); #232 removed both halves as read-once
 * copy. The app goes on behaving that way — it simply stops saying so on screen.
 *
 * The COURSE section is the reason the screen exists (F0): a native `<select>` over the courses
 * the learner can READ — the manifest filtered to their own language (#324), each option named by
 * what it teaches rather than by its direction pair; it ships even with one course, because the
 * seam is the product promise — with the ACTIVE course's status line beneath it, derived from the very progression input the
 * Ladder renders and `passRitual` guards with (`useProgression`), counts only, never time
 * (Invariant 2). The reassurance note that switching erases nothing went with the explainers on
 * #232; the switch still touches no per-course state (Invariant 8), it just no longer says so.
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
import { useEffect, useId, useMemo, useRef } from 'react';
import { useCourse } from '../course/CourseProvider.tsx';
import { resolveUserLang } from '../course/manifest.ts';
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
  const userLang = useAppStore((store) => store.settings.userLang);
  // The active course's ladder, loaded and derived — the same lines the Ladder starts with, so
  // the status here and the rungs there cannot disagree: they are one derivation.
  const { levels, input, ready } = useProgression();

  const selectId = useId();
  const langSelectId = useId();
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

  /**
   * The languages this build can be READ in (#323) — the manifest's distinct `l1`s, deduped by
   * tag, in manifest order.
   *
   * They are data, not a string list: each option's label is the course row's own `l1` name, so
   * adding a course in a new L1 offers that language here with no key to mint and no translation
   * to commission. Every tag comes from a course by construction, so the switch target below
   * always exists and there is no empty state to design.
   */
  const languages = useMemo(() => {
    const seen = new Map<string, string>();
    for (const row of courses) if (!seen.has(row.l1Tag)) seen.set(row.l1Tag, row.l1);
    return [...seen].map(([tag, name]) => ({ tag, name }));
  }, [courses]);

  /** The language showing as chosen: the persisted one, else the active course's own (#322). */
  const selectedLang = resolveUserLang(userLang, course);

  /**
   * What there is to LEARN in that language (#324) — the manifest's courses filtered to the ones
   * this learner can actually read, in manifest order.
   *
   * The dropdown used to list every course by its direction pair ("english → spanish"), which
   * answers the wrong question once the section above exists: half of each label repeats the
   * language they just chose, and the other half is written for someone else. Filtered, the field
   * offers targets rather than directions, and each option is the row's own `l2` name.
   *
   * **The active course is always in here**, so there is no fallback branch: choosing a language
   * re-resolves the active course to one that speaks it (`chooseLanguage` above), so by the time
   * this renders `course.l1Tag` is `selectedLang`. A branch for a mismatch that cannot happen
   * would be a claim about this screen that no test could ever make true.
   */
  const learnable = courses.filter((row) => row.l1Tag === selectedLang);

  /**
   * Choosing a language is TWO facts, and only the first is always true: the learner reads this
   * language now, and — if the course they are in does not speak it — they are moved to one that
   * does. The move is the existing course switch (#106), so it resets transient UI and touches no
   * per-course progress: **switching language cannot erase what any course earned** (Invariant 8),
   * which is the same guarantee the course dropdown already makes.
   *
   * The toast is not raised here. `switchCourse` moves the pointer synchronously but the provider
   * re-boots the strings before the arrival is real, and the effect above fires on the ARRIVAL —
   * so the toast speaks in the language the learner just switched INTO, which is the whole point
   * of #106's timing and would be lost by announcing it at the tap.
   */
  const chooseLanguage = (tag: string): void => {
    setSetting('userLang', tag);
    if (course.l1Tag === tag) return;

    const target = courses.find((row) => row.l1Tag === tag);
    if (target !== undefined) switchCourse(target.id);
  };

  // No ladder, no status: before the levels resolve (or when the content layer is broken —
  // that failure belongs to the screens that render the ladder, not to Settings) the slot is
  // simply absent. Every count in the line would be dishonest without the ladder behind it.
  const status = ready && levels.error === null ? statusLine(input, strings) : null;

  return (
    <section className={styles.settings}>
      <h2 className={styles.title}>Settings</h2>

      {/* --------------------------------------------------------------- YOUR LANGUAGE */}
      {/* Above COURSE deliberately: "what do you read" is the question that makes sense
          first, and the course dropdown below is downstream of its answer. */}
      <section className={styles.card}>
        <RegistrationMarks />
        <h3 className={styles.kicker}>LANGUAGE</h3>
        <div className={styles.courseField}>
          <label className={styles.fieldLabel} htmlFor={langSelectId} dir={course.dir}>
            {strings['settings.yourLanguage']}
          </label>
          {/* Native, like the course picker below and for its reasons (PRD-design §7). */}
          <select
            id={langSelectId}
            className={styles.select}
            value={selectedLang}
            onChange={(event) => chooseLanguage(event.target.value)}
          >
            {languages.map((language) => (
              <option key={language.tag} value={language.tag}>
                {language.name}
              </option>
            ))}
          </select>
        </div>
      </section>

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
            {/* The target language, not the pair: the direction is what the section above
                already settled (#324). */}
            {learnable.map((row) => (
              <option key={row.id} value={row.id}>
                {row.l2}
              </option>
            ))}
          </select>
          {status !== null && (
            <p className={styles.status} dir={course.dir}>
              {status}
            </p>
          )}
        </div>
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
