/**
 * The STORAGE section's body (#107) — real browser numbers where the prototype drew illustrative
 * ones (PRD §8 F6, §17; the prototype's Settings → Storage is layout reference only).
 *
 * Four things, in the prototype's order, each from the source that actually knows it:
 *
 *   • **The quota meter** — `navigator.storage.estimate()`, the origin's usage over what the
 *     browser offers, as one quiet fill with the two numbers under it. When the API is missing
 *     ([Q2], Safari before 15.2 and every non-secure context) the meter is simply absent — the
 *     graceful fallback F6's AC names — because a meter without an estimate behind it would be
 *     the illustrative figure this ticket exists to delete.
 *   • **One content row per manifest course** — the build-computed `sizes.json` (what the course's
 *     precached files actually weigh; `tools/content-build.ts` emits it as it writes them). A
 *     course whose file will not load is silently absent, `useModules`' failure policy: a row is
 *     furniture beside a working screen, not a screen of its own.
 *   • **One progress row, all courses** — the serialized state's real size, `exportState` over the
 *     same projection the persistence writes (`persistedSlice`), measured as the file F7 would
 *     export. It re-derives on every state change, so passing a rung visibly weighs something.
 *   • **The durability line** — what the one `navigator.storage.persist()` ask (#90, at the first
 *     persisted write) actually got, read back through `persisted()` so this section adds no
 *     second ask: protected in the course's words when the browser agreed, best-effort everywhere
 *     else — with the honesty line (`storageNote`) closing the section: nothing the learner wrote
 *     is in any of these numbers, because the app never keeps it (Invariant 4).
 *
 * The row labels and the meter's caption are English shell furniture in the kickers' register —
 * the call #105 made for the tick toggle's rows — and the two promises (durability, honesty) are
 * the course's own strings, because a promise about the learner's ladder is the course's to word.
 */
import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { useCourse } from '../../course/CourseProvider.tsx';
import { loadSizes } from '../../course/content.ts';
import { useStrings } from '../../course/strings.ts';
import type { CourseSizes } from '../../course/types.ts';
import { exportState } from '../../state/serialize.ts';
import { useAppStore } from '../../state/store.ts';
import { formatBytes } from './formatBytes.ts';
import styles from './StorageSection.module.css';

export default function StorageSection() {
  const { course, courses } = useCourse();
  const strings = useStrings();
  const estimate = useStorageEstimate();
  const durable = useDurability();
  const sizes = useCourseSizes(courses.map((row) => row.id));
  const progressBytes = useProgressBytes();

  return (
    <>
      {estimate !== null && (
        <div className={styles.meterBlock}>
          <div
            className={styles.meter}
            role="meter"
            aria-label="Storage used on this device"
            aria-valuemin={0}
            aria-valuemax={estimate.quota}
            aria-valuenow={estimate.usage}
            style={
              {
                '--storage-fraction': Math.min(estimate.usage / estimate.quota, 1),
              } as CSSProperties
            }
          >
            <div className={styles.meterFill} />
          </div>
          <p className={styles.meterLine}>
            {formatBytes(estimate.usage)} used of {formatBytes(estimate.quota)} the browser offers
          </p>
        </div>
      )}

      <div className={styles.rows}>
        {courses.map((row) => {
          const size = sizes.get(row.id);
          if (size === undefined) return null;
          return (
            <p key={row.id} className={styles.row}>
              <span className={styles.rowLabel}>{row.pairLabel} course (offline)</span>
              <span className={styles.rowBytes}>{formatBytes(size.bytes)}</span>
            </p>
          );
        })}
        <p className={styles.row}>
          <span className={styles.rowLabel}>Your saved progress — all courses</span>
          <span className={styles.rowBytes}>{formatBytes(progressBytes)}</span>
        </p>
      </div>

      {durable !== null && (
        <p className={styles.durability} dir={course.dir}>
          {durable ? strings['settings.storageProtected'] : strings['settings.storageBestEffort']}
        </p>
      )}
      <p className={styles.honesty} dir={course.dir}>
        {strings.storageNote}
      </p>
    </>
  );
}

/* --------------------------------------------------------------------- the browser's numbers */

interface QuotaEstimate {
  usage: number;
  quota: number;
}

/**
 * `navigator.storage.estimate()`, once — the answer does not change meaningfully within one
 * Settings visit. `null` is every way there is no meter to draw: no StorageManager, a rejection,
 * or an answer without both numbers (the spec makes them optional) — the [Q2] fallback path.
 */
function useStorageEstimate(): QuotaEstimate | null {
  const [estimate, setEstimate] = useState<QuotaEstimate | null>(null);

  useEffect(() => {
    const storage = navigator.storage as StorageManager | undefined;
    if (typeof storage?.estimate !== 'function') return;
    let cancelled = false;

    storage.estimate().then(
      ({ usage, quota }) => {
        if (cancelled) return;
        if (typeof usage === 'number' && typeof quota === 'number' && quota > 0) {
          setEstimate({ usage, quota });
        }
      },
      // No estimate is the fallback presentation, not an error state.
      () => undefined,
    );

    return () => {
      cancelled = true;
    };
  }, []);

  return estimate;
}

/**
 * Whether the origin's storage IS durable — `persisted()`, the read-only twin of the persist()
 * ask #90 makes at the first write, so surfacing the outcome adds no second permission-shaped
 * call. `null` only while the answer is in flight (nothing renders — a wrong promise flashed is
 * worse than a late one); every failure path is best-effort, which is the honest default.
 */
function useDurability(): boolean | null {
  // No StorageManager (Safari before 15.2, non-secure contexts) is known at mount: best-effort,
  // no ask in flight — so it is the INITIAL state rather than a set-inside-the-effect.
  const [durable, setDurable] = useState<boolean | null>(() =>
    typeof (navigator.storage as StorageManager | undefined)?.persisted === 'function'
      ? null
      : false,
  );

  useEffect(() => {
    const storage = navigator.storage as StorageManager | undefined;
    if (typeof storage?.persisted !== 'function') return;
    let cancelled = false;

    storage.persisted().then(
      (granted) => {
        if (!cancelled) setDurable(granted);
      },
      () => {
        if (!cancelled) setDurable(false);
      },
    );

    return () => {
      cancelled = true;
    };
  }, []);

  return durable;
}

/* ------------------------------------------------------------------------ the computed rows */

/** Shared, so a render with nothing loaded is reference-equal to the last one. */
const NO_SIZES: ReadonlyMap<string, CourseSizes> = new Map();

/**
 * Every manifest course's `sizes.json`, and the ones that arrived — `useModules`' shape and its
 * failure policy (#94): a file that will not load leaves its row absent, silently, because the
 * section serves what it has. One request per file per page load, shared through `loadSizes`'
 * cache with whoever else asks.
 */
function useCourseSizes(courseIds: readonly string[]): ReadonlyMap<string, CourseSizes> {
  const key = [...courseIds].sort().join(' ');
  const [loaded, setLoaded] = useState<{
    key: string;
    sizes: ReadonlyMap<string, CourseSizes>;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const wanted = key === '' ? [] : key.split(' ');

    void Promise.all(
      wanted.map((courseId) =>
        loadSizes(courseId).then(
          (sizes) => [courseId, sizes] as const,
          () => null,
        ),
      ),
    ).then((entries) => {
      if (cancelled) return;
      setLoaded({ key, sizes: new Map(entries.filter((entry) => entry !== null)) });
    });

    return () => {
      cancelled = true;
    };
  }, [key]);

  return loaded !== null && loaded.key === key ? loaded.sizes : NO_SIZES;
}

/**
 * The progress row's number: what F7's export file would weigh right now, as a Blob because a
 * Blob's `size` is bytes however the platform encodes the string. The four persisted fields are
 * selected one by one (a selector returning a fresh object every render would loop), and the
 * measurement re-derives only when one of them actually changed — which is exactly when the
 * document localStorage holds changed too, so the row and the disk agree.
 */
function useProgressBytes(): number {
  const stateVersion = useAppStore((store) => store.stateVersion);
  const activeCourse = useAppStore((store) => store.activeCourse);
  const courses = useAppStore((store) => store.courses);
  const settings = useAppStore((store) => store.settings);

  return useMemo(
    () => new Blob([exportState({ stateVersion, activeCourse, courses, settings })]).size,
    [stateVersion, activeCourse, courses, settings],
  );
}
