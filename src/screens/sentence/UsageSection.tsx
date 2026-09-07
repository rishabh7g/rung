/**
 * 9 · usage — when a person actually says this, with the register beside it.
 *
 * The register is a chip on the heading, drawn only when the sentence declares one; the section
 * itself hangs on `usage` alone.
 */
import type { Sentence } from '../../course/types.ts';
import styles from '../SentenceScreen.module.css';

interface UsageSectionProps {
  sentence: Sentence;
}

export function UsageSection({ sentence }: UsageSectionProps) {
  if (sentence.usage === undefined) return null;

  return (
    <section data-section="usage" className={styles.plateQuiet}>
      <p className={styles.usageHead}>
        <span className={styles.sectionLabel}>WHEN TO USE IT</span>
        {sentence.register !== undefined && (
          <span className={styles.register}>{sentence.register}</span>
        )}
      </p>
      <p className={styles.prose}>{sentence.usage}</p>
    </section>
  );
}
