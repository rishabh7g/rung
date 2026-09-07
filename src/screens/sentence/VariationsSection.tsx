/**
 * 7 · variations — same frame, one part swapped, and the swapped part is filled.
 *
 * "Same pattern, swapped parts" only reads as a pattern if the swapped part is the one thing
 * filled (`--variation-highlight`, [D10]), which is what `changedTokens` marks per token.
 */
import type { L2Written } from '../../course/manifest.ts';
import type { Sentence, Variation } from '../../course/types.ts';
import { normalizeSurface, tokenizeSurface } from '../../engine/surface.ts';
import styles from '../SentenceScreen.module.css';

interface VariationsSectionProps {
  sentence: Sentence;
  l2: L2Written;
}

export function VariationsSection({ sentence, l2 }: VariationsSectionProps) {
  const variations = sentence.variations ?? [];
  if (variations.length === 0) return null;

  return (
    <section data-section="variations" className={styles.section}>
      <h3 className={styles.sectionLabel}>SAME PATTERN, SWAPPED PARTS</h3>
      <ul className={styles.rows}>
        {variations.map((variation, index) => (
          <VariationRow
            key={`${variation.display}-${index}`}
            base={sentence.display}
            variation={variation}
            l2={l2}
          />
        ))}
      </ul>
    </section>
  );
}

interface VariationRowProps {
  /** The sentence's own display line — what "same" is measured against. */
  base: string;
  variation: Variation;
  l2: L2Written;
}

function VariationRow({ base, variation, l2 }: VariationRowProps) {
  return (
    <li className={styles.variation}>
      <p className={styles.variationLine} dir={l2.display.dir} lang={l2.display.lang}>
        {changedTokens(base, variation.display).map((token, position) => (
          <span
            key={`${token.text}-${position}`}
            className={token.changed ? styles.changed : undefined}
          >
            {token.text}
          </span>
        ))}
      </p>
      <p className={styles.variationCue}>{variation.cue}</p>
      <p className={styles.variationChanged}>{variation.changed}</p>
    </li>
  );
}

/**
 * A variation's tokens, each marked as changed or not.
 *
 * "Same word" is `normalizeSurface`'s definition and nobody else's (`src/engine/surface.ts`, #116)
 * — the same one the word index is built with, so a token that differs only by a trailing
 * question mark is not a swapped part here either. The token's own text is what renders: the
 * comparison is normalised, the screen is not.
 */
function changedTokens(base: string, variation: string): { text: string; changed: boolean }[] {
  const original = new Set(tokenizeSurface(base));

  return variation
    .split(/\s+/)
    .filter((text) => text !== '')
    .map((text) => {
      const surface = normalizeSurface(text);
      return { text, changed: surface !== '' && !original.has(surface) };
    });
}
