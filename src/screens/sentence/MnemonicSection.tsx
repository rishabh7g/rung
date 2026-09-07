/**
 * 10 · mnemonic — last, always: the one thing to carry away.
 *
 * A blueprint object, so it wears the four registration marks, and its label is the course's own
 * `sentence.pocketIt` (PRD §8 F3) — course prose, not a kicker, because uppercasing and tracking a
 * Devanagari string is not a style the design package has.
 */
import type { Strings } from '../../course/strings.ts';
import type { Sentence } from '../../course/types.ts';
import { RegistrationMarks } from '../RegistrationMarks.tsx';
import styles from '../SentenceScreen.module.css';

interface MnemonicSectionProps {
  sentence: Sentence;
  strings: Strings;
}

export function MnemonicSection({ sentence, strings }: MnemonicSectionProps) {
  if (sentence.mnemonic === undefined) return null;

  return (
    <section data-section="mnemonic" className={styles.mnemonic}>
      <RegistrationMarks />
      <p className={styles.courseLabel}>{strings['sentence.pocketIt']}</p>
      <p className={styles.prose}>{sentence.mnemonic}</p>
    </section>
  );
}
