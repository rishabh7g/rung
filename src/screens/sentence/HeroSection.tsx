/**
 * 1 · hero — the sentence itself, at the one hero size in the ramp (#89, #414).
 *
 * The one section that always renders: a sentence with no `display` is not a sentence. The quiet
 * `script` line beneath it is romanized courses only (PRD §4): the native script as recognition,
 * never as something to produce — so it is the quietest line in the hero, and it carries its own
 * language and direction because they differ from the display line's (#186, #196).
 */
import type { L2Written } from '../../course/manifest.ts';
import type { Sentence } from '../../course/types.ts';
import '../sentence-screen.css';

interface HeroSectionProps {
  sentence: Sentence;
  l2: L2Written;
}

export function HeroSection({ sentence, l2 }: HeroSectionProps) {
  return (
    <section data-section="hero" className="sentence-hero">
      <h2 className="sentence-display" dir={l2.display.dir} lang={l2.display.lang}>
        {sentence.display}
      </h2>
      <p className="sentence-cue sentence-prose sentence-course-prose">{sentence.cue}</p>
      {sentence.script !== undefined && (
        <p className="sentence-script" dir={l2.script.dir} lang={l2.script.lang}>
          {sentence.script}
        </p>
      )}
    </section>
  );
}
