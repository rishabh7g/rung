/**
 * 5 · trap — the one loud object on the screen (design/tokens.md §7 rule 2).
 *
 * Its heading is the course's (`sentence.trapHead`), because "Hindi will mislead you" is a
 * sentence about the learner's own first language. Amber lives in the stylesheet's `.trap*` rules
 * and nowhere else on the screen; the mistake plate beside it is deliberately neutral.
 */
import { TriangleAlert } from 'lucide-react';
import type { Strings } from '../../course/strings.ts';
import type { Sentence } from '../../course/types.ts';
import '../sentence-screen.css';

interface TrapSectionProps {
  sentence: Sentence;
  strings: Strings;
}

export function TrapSection({ sentence, strings }: TrapSectionProps) {
  if (sentence.trap === undefined) return null;

  return (
    <section data-section="trap" className="sentence-trap">
      <TriangleAlert className="sentence-trap-icon" aria-hidden="true" />
      <div className="sentence-trap-text">
        <p className="sentence-trap-head sentence-course-label sentence-course-prose">
          {strings['sentence.trapHead']}
        </p>
        <p className="sentence-trap-body sentence-prose sentence-course-prose">{sentence.trap}</p>
      </div>
    </section>
  );
}
