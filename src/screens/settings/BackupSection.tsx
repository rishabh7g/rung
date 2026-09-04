/**
 * The Backup section's body (#108) — F7's one file leaving the device, and the only door back in
 * (PRD §8 F6, F7; the prototype's Settings → Backup, whose two buttons this fills with the real
 * flows behind #104's serialize layer).
 *
 * **Export** is `exportState` over the persisted slice — every course, because a backup that
 * restored one ladder would be a backup that lost the others — as one file named
 * `rung-export-<YYYY-MM-DD>.json`: the brand constant plus the store-layer clock's day, a
 * record-keeping stamp for a folder of backups, never a date the UI frames anything with
 * (Invariant 2). Where the platform offers a share sheet for files (`navigator.canShare` with
 * them), the sheet is the whole UX; everywhere else an anchor download is the honest fallback.
 * The buttons used to stand under a course explainer of what the one file holds and what it
 * cannot (`settings.backupNote`); it was read once and went on #232. Every claim it made is still
 * true and still mechanically enforced — `serialize.test.ts` is what holds the file to its
 * contents, including the claim about what is NOT in it (Invariant 4) — a test, not a sentence.
 *
 * **Import** trusts nothing and touches nothing until the learner has seen the consequence:
 *
 *   • the picker is a file input created for the tap and never mounted — this product has no
 *     input element on any screen (Invariant 6, the absence sweep in `SettingsScreen.test.tsx`),
 *     and a picker is a door to the OS, not a field the learner types into;
 *   • the file goes through `importState` (#104), which either answers a fully validated
 *     document or refuses with a path-naming reason — shown under the course's friendly line
 *     (`settings.importFailed`), state untouched;
 *   • a readable file opens the two-sided confirm IN PLACE of the buttons — no one-tap path:
 *     both sides summarised per course (passed rungs and sessions, counts the shell renders the
 *     way the STORAGE rows are), under the course's replace warning (`settings.importReplace`) —
 *     the one sentence #232's sweep of read-once copy deliberately kept, because a destructive
 *     confirm that does not name what it destroys is a bug, not breathing room;
 *   • only the confirm calls `restoreBackup` (the store's one full-document write, #108), then
 *     lands on the Ladder of the imported `activeCourse` carrying `restoredBackup()` — the
 *     one-shot flag the Ladder answers with the course's `importToast`.
 */
import { useState } from 'react';
import { Download, Upload } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { BRAND } from '../../brand.ts';
import { useCourse } from '../../course/CourseProvider.tsx';
import { interpolate, useStrings } from '../../course/strings.ts';
import type { Course } from '../../course/manifest.ts';
import { systemClock } from '../../state/clock.ts';
import { ImportError, exportState, importState } from '../../state/serialize.ts';
import { emptyCourseState, persistedSlice, useAppStore } from '../../state/store.ts';
import type { AppState, CourseState } from '../../state/types.ts';
import { HOME_PATH, restoredBackup } from '../../shell/routes.tsx';
import StorageLine from './StorageLine.tsx';
import styles from './BackupSection.module.css';

export default function BackupSection() {
  const { course, courses } = useCourse();
  const strings = useStrings();
  const currentCourses = useAppStore((store) => store.courses);
  const restoreBackup = useAppStore((store) => store.restoreBackup);
  const navigate = useNavigate();

  /** A validated document waiting on the learner's decision — the confirm renders while it is. */
  const [pending, setPending] = useState<AppState | null>(null);
  /** Why the last file was refused — `ImportError`'s path-naming reason, under the friendly line. */
  const [failure, setFailure] = useState<string | null>(null);

  const exportTap = () => {
    setFailure(null);
    const json = exportState(persistedSlice(useAppStore.getState()));
    const filename = `${BRAND}-export-${systemClock().slice(0, 10)}.json`;
    const file = new File([json], filename, { type: 'application/json' });

    // The share sheet, where files can ride it — `canShare` is the capability question and the
    // learner closing the sheet is a choice, not an error (AbortError is silence, not a screen).
    if (
      typeof navigator.canShare === 'function' &&
      typeof navigator.share === 'function' &&
      navigator.canShare({ files: [file] })
    ) {
      void navigator.share({ files: [file] }).catch(() => undefined);
      return;
    }

    // Everywhere else: a plain download. The anchor is created for the click and never mounted,
    // and the object URL is revoked at once — the click already holds its reference.
    const url = URL.createObjectURL(file);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = filename;
    anchor.click();
    URL.revokeObjectURL(url);
  };

  const importTap = () => {
    setFailure(null);
    // Created per tap, never mounted (Invariant 6 — see the header). `accept` is a hint to the
    // picker, not a validation: `importState` is the validation.
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'application/json,.json';
    input.onchange = () => {
      const file = input.files?.[0];
      if (file === undefined) return;
      void file.text().then(
        (text) => {
          try {
            setPending(importState(text));
          } catch (error) {
            setPending(null);
            setFailure(error instanceof ImportError ? error.reason : String(error));
          }
        },
        // A file the OS would not read out is the same refusal as one that will not parse.
        (error: unknown) => setFailure(String(error)),
      );
    };
    input.click();
  };

  // The one write, and where it lands (see the header). The navigation carries the one-shot
  // flag; by the time the Ladder renders, `activeCourse` is the file's and so are its words.
  const confirmTap = () => {
    if (pending === null) return;
    restoreBackup(pending);
    navigate(HOME_PATH, { state: restoredBackup() });
  };

  if (pending !== null) {
    return (
      <div className={styles.confirm}>
        <p className={styles.warning} dir={course.dir}>
          {strings['settings.importReplace']}
        </p>
        <div className={styles.compare}>
          {comparisonRows(currentCourses, pending.courses, courses).map((row) => (
            <div key={row.id} className={styles.course}>
              <p className={styles.courseLabel}>{row.label}</p>
              <p className={styles.side} dir={course.dir}>
                <span className={styles.sideLabel}>{strings['settings.backup.onDevice']}</span>
                <span className={styles.sideCounts}>
                  {interpolate(strings['settings.backup.counts'], {
                    passed: row.now.passed,
                    sessions: row.now.sessions,
                  })}
                </span>
              </p>
              <p className={styles.side} dir={course.dir}>
                <span className={styles.sideLabel}>{strings['settings.backup.inFile']}</span>
                <span className={styles.sideCounts}>
                  {interpolate(strings['settings.backup.counts'], {
                    passed: row.file.passed,
                    sessions: row.file.sessions,
                  })}
                </span>
              </p>
            </div>
          ))}
        </div>
        <div className={styles.actions}>
          <button
            type="button"
            className={styles.action}
            onClick={() => setPending(null)}
            dir={course.dir}
          >
            {strings['settings.importCancel']}
          </button>
          <button type="button" className={styles.action} onClick={confirmTap} dir={course.dir}>
            {strings['settings.importConfirm']}
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.actions}>
        {/* The course's two words, with the prototype's two arrows — they went the way the tick
            toggle's On/Off did (#351), and the promises around them were always the course's. */}
        <button type="button" className={styles.action} onClick={exportTap} dir={course.dir}>
          <Upload className={styles.icon} aria-hidden="true" />
          {strings['settings.backup.export']}
        </button>
        <button type="button" className={styles.action} onClick={importTap} dir={course.dir}>
          <Download className={styles.icon} aria-hidden="true" />
          {strings['settings.backup.import']}
        </button>
      </div>
      {failure !== null && (
        <div className={styles.failure} role="alert">
          <p className={styles.failureLead} dir={course.dir}>
            {strings['settings.importFailed']}
          </p>
          <p className={styles.failureReason}>{failure}</p>
        </div>
      )}
      {/* How much room there is (#393) — inside this branch on purpose, so the import
          confirmation below is the only thing on screen while it is up. */}
      <StorageLine />
    </>
  );
}

/* ------------------------------------------------------------------- the two-sided summary */

interface SideCounts {
  passed: number;
  sessions: number;
}

interface ComparisonRow {
  id: string;
  /** The manifest's pairLabel where the course is known; the file's own id where it is not. */
  label: string;
  now: SideCounts;
  file: SideCounts;
}

/** What one subtree amounts to, in the two counts the confirm compares. Absent = untouched. */
function sideCounts(state: CourseState | undefined): SideCounts {
  const held = state ?? emptyCourseState();
  return { passed: Object.keys(held.modules).length, sessions: held.sessionCount };
}

/**
 * One row per course EITHER side holds — manifest order first (the dropdown's order, so the rows
 * read like the app), then any course the manifest no longer lists, sorted. A course only the
 * file knows still gets its row: the learner is deciding about that ladder too (Invariant 8 is
 * why such a subtree exists at all — a vanished course's progress is kept, and exported).
 */
function comparisonRows(
  current: AppState['courses'],
  incoming: AppState['courses'],
  manifest: readonly Course[],
): ComparisonRow[] {
  const known = new Set([...Object.keys(current), ...Object.keys(incoming)]);
  const listed = manifest.map((row) => row.id).filter((id) => known.has(id));
  const unlisted = [...known].filter((id) => !manifest.some((row) => row.id === id)).sort();

  return [...listed, ...unlisted].map((id) => ({
    id,
    label: manifest.find((row) => row.id === id)?.pairLabel ?? id,
    now: sideCounts(current[id]),
    file: sideCounts(incoming[id]),
  }));
}
