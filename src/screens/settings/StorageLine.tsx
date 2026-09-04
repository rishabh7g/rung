/**
 * How much room there is (#393; PRD §8 F6, §17 "storage figures are illustrative; compute them")
 * — one sentence, inside the Backup card.
 *
 * **It used to be a section.** A progress meter, a caption, then a byte figure per installed
 * course — nine of them once en-ko shipped — and a tenth for saved progress. It was the largest
 * block on Settings and the only one that answered nothing: there is no per-course delete, no
 * cache control, nothing a learner can do with the knowledge that one course is 391 KB. It was
 * the app showing its own bookkeeping to someone who came to change a setting.
 *
 * Worse, its headline number was routinely wrong at the moment anyone read it: the estimate
 * resolves before the offline caches fill, so a cold boot drew a full-width meter over "0 B used".
 *
 * The question underneath all of it is "is this going to run out of room", and that is a
 * sentence. It lives beside export/import because that is the other place bytes matter.
 *
 * **A browser that will not answer renders nothing.** No estimate is the fallback presentation,
 * not an error state — the same posture the meter took: some browsers do not implement
 * `navigator.storage.estimate`, and some refuse it in a private window. There is nothing to
 * apologise for and nothing to retry.
 */
import { useEffect, useState } from 'react';
import { useCourse } from '../../course/CourseProvider.tsx';
import { interpolate, useStrings } from '../../course/strings.ts';
import { formatBytes } from './formatBytes.ts';
import styles from './StorageLine.module.css';

export default function StorageLine() {
  const { course } = useCourse();
  const strings = useStrings();
  const estimate = useStorageEstimate();

  if (estimate === null) return null;

  return (
    <p className={styles.line} dir={course.dir}>
      {interpolate(strings['settings.storage.meter'], {
        used: formatBytes(estimate.usage),
        quota: formatBytes(estimate.quota),
      })}
    </p>
  );
}

interface QuotaEstimate {
  usage: number;
  quota: number;
}

/** The browser's own two numbers, or `null` — see the header on why `null` draws nothing. */
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
