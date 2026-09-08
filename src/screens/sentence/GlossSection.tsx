/**
 * 2 · gloss — the English gloss, then the word-for-word line.
 *
 * Both are optional: the build requires the gloss only where neither language of the pair is
 * English (hi-mr) and forbids it where either is (#268, #405) — the hero or the cue already reads
 * in English. So the section obeys the rule every other optional section does — nothing to show,
 * nothing rendered — and branches on presence, never on a course id.
 *
 * The gloss is English wherever it exists — in hi-mr that is a THIRD language on the screen — so
 * it is the one line that declares its language as a literal rather than through the manifest.
 */
import type { Sentence } from '../../course/types.ts';
import '../sentence-screen.css';

interface GlossSectionProps {
  sentence: Sentence;
}

export function GlossSection({ sentence }: GlossSectionProps) {
  if (sentence.glossEn === undefined && sentence.literal === undefined) return null;

  return (
    <section data-section="gloss" className="sentence-section">
      {sentence.glossEn !== undefined && (
        <p className="sentence-gloss" lang="en">
          {sentence.glossEn}
        </p>
      )}
      {sentence.literal !== undefined && (
        <div className="sentence-plate-accent">
          <h3 className="sentence-section-label">WORD-FOR-WORD</h3>
          <p className="sentence-prose sentence-course-prose">{sentence.literal}</p>
        </div>
      )}
    </section>
  );
}
