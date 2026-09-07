/**
 * 8 · mistake — struck, on the NEUTRAL plate: wrong L2 is information, not a warning.
 *
 * The plate is `--mistake-border`/`--mistake-bg` in the stylesheet, never the trap's amber
 * (design/tokens.md §7 rule 2) — a common mistake is information about the language, not a
 * warning about the learner.
 */
import type { L2Written } from '../../course/manifest.ts';
import type { Sentence } from '../../course/types.ts';
import styles from '../SentenceScreen.module.css';

interface MistakeSectionProps {
  sentence: Sentence;
  l2: L2Written;
}

export function MistakeSection({ sentence, l2 }: MistakeSectionProps) {
  if (sentence.mistake === undefined) return null;

  return (
    <section data-section="mistake" className={styles.section}>
      <h3 className={styles.sectionLabel}>COMMON MISTAKE</h3>
      <div className={styles.mistake}>
        <p className={styles.mistakeDisplay} dir={l2.display.dir} lang={l2.display.lang}>
          {sentence.mistake.display}
        </p>
        <p className={styles.prose}>{sentence.mistake.why}</p>
      </div>
    </section>
  );
}
