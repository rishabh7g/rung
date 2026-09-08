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
import '../sentence-screen.css';

interface WordsSectionProps {
  sentence: Sentence;
  l2: L2Written;
}

export function WordsSection({ sentence, l2 }: WordsSectionProps) {
  const words = sentence.deconstruction.words;
  if (words.length === 0) return null;

  return (
    <section data-section="words" className="sentence-section">
      <h3 className="sentence-section-label">WORD BY WORD</h3>
      <ul className="sentence-rows">
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
    <li className="sentence-word">
      <p className="sentence-word-head">
        <span className="sentence-word-display" dir={l2.display.dir} lang={l2.display.lang}>
          {word.display}
        </span>
        <span className="sentence-word-cue sentence-course-prose">{word.cue}</span>
        <TagChip tag={word.tag} />
      </p>
      {word.note !== undefined && (
        <p className="sentence-word-note sentence-prose sentence-course-prose">{word.note}</p>
      )}
      {word.forms.length > 0 && (
        <p className="sentence-forms sentence-prose sentence-course-prose">
          forms:{' '}
          <span dir={l2.display.dir} lang={l2.display.lang}>
            {word.forms.join(' · ')}
          </span>
        </p>
      )}
    </li>
  );
}
