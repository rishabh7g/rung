/**
 * 9 · usage — when a person actually says this, with the register beside it.
 *
 * The register is a chip on the heading, drawn only when the sentence declares one; the section
 * itself hangs on `usage` alone.
 */
import type { Sentence } from '../../course/types.ts';
import '../sentence-screen.css';

interface UsageSectionProps {
  sentence: Sentence;
}

export function UsageSection({ sentence }: UsageSectionProps) {
  if (sentence.usage === undefined) return null;

  return (
    <section data-section="usage" className="sentence-plate-quiet sentence-plate-accent">
      <p className="sentence-usage-head">
        <span className="sentence-section-label">WHEN TO USE IT</span>
        {sentence.register !== undefined && (
          <span className="sentence-register">{sentence.register}</span>
        )}
      </p>
      <p className="sentence-prose sentence-course-prose">{sentence.usage}</p>
    </section>
  );
}
