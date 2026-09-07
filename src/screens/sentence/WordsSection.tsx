/**
 * 3 · words — the rows the "why" resolver lands on (PRD §6.3): word, cue, tag, note, forms.
 *
 * Nothing to show, nothing rendered: a deconstruction with no words draws no heading over an
 * empty list. The forms line is the taught paradigm, `display` included — the surfaces the word
 * index maps — and both L2 spans carry the display line's language and direction (#186).
 */
import type { L2Written } from '../../course/manifest.ts';
import type { Sentence, Word } from '../../course/types.ts';
import { TagChip } from '../TagChip.tsx';
import styles from '../SentenceScreen.module.css';

interface WordsSectionProps {
  sentence: Sentence;
  l2: L2Written;
}

export function WordsSection({ sentence, l2 }: WordsSectionProps) {
  const words = sentence.deconstruction.words;
  if (words.length === 0) return null;

  return (
    <section data-section="words" className={styles.section}>
      <h3 className={styles.sectionLabel}>WORD BY WORD</h3>
      <ul className={styles.rows}>
        {words.map((word, index) => (
          <WordRow key={`${word.display}-${index}`} word={word} l2={l2} />
        ))}
      </ul>
    </section>
  );
}

interface WordRowProps {
  word: Word;
  l2: L2Written;
}

function WordRow({ word, l2 }: WordRowProps) {
  return (
    <li className={styles.word}>
      <p className={styles.wordHead}>
        <span className={styles.wordDisplay} dir={l2.display.dir} lang={l2.display.lang}>
          {word.display}
        </span>
        <span className={styles.wordCue}>{word.cue}</span>
        <TagChip tag={word.tag} />
      </p>
      {word.note !== undefined && <p className={styles.wordNote}>{word.note}</p>}
      {word.forms.length > 0 && (
        <p className={styles.forms}>
          forms:{' '}
          <span dir={l2.display.dir} lang={l2.display.lang}>
            {word.forms.join(' · ')}
          </span>
        </p>
      )}
    </li>
  );
}
