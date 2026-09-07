/**
 * 6 · sound — how it is said, in the course's words. No audio, ever (Invariant 5).
 */
import type { Sentence } from '../../course/types.ts';
import styles from '../SentenceScreen.module.css';

interface SoundSectionProps {
  sentence: Sentence;
}

export function SoundSection({ sentence }: SoundSectionProps) {
  if (sentence.sound === undefined) return null;

  return (
    <section data-section="sound" className={styles.plateQuiet}>
      <h3 className={styles.sectionLabel}>SOUND NOTE</h3>
      <p className={styles.prose}>{sentence.sound}</p>
    </section>
  );
}
