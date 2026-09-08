/**
 * 6 · sound — how it is said, in the course's words. No audio, ever (Invariant 5).
 */
import type { Sentence } from '../../course/types.ts';
import '../sentence-screen.css';

interface SoundSectionProps {
  sentence: Sentence;
}

export function SoundSection({ sentence }: SoundSectionProps) {
  if (sentence.sound === undefined) return null;

  return (
    <section data-section="sound" className="sentence-plate-quiet sentence-plate-accent">
      <h3 className="sentence-section-label">SOUND NOTE</h3>
      <p className="sentence-prose sentence-course-prose">{sentence.sound}</p>
    </section>
  );
}
