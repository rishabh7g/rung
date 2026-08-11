/**
 * The delta-learning tag, as a chip (#89; PRD-design §7, design/tokens.md §1, §6).
 *
 * Three tags and no more (`src/course/types.ts`): **free** (transfers from L1 — nothing to
 * relearn), **delta** (the one thing that differs), **interference** (L1 will actively mislead
 * you). They are the product's whole vocabulary for "how hard is this word", so the chip is one
 * component rather than a recipe re-typed per screen: Sentence Detail's word rows and rules use
 * it here, and the Practice loop's "why" rows (#93) and Comprehension's (#98) are the same row.
 *
 * **The label is always rendered.** A chip that said "interference" only in amber would say
 * nothing to a screen reader, nothing in a screenshot printed in grey, and nothing to the ~8% of
 * men who cannot separate the amber from the steel — so the tag's name is a text node, and the
 * colour pair is the emphasis on top of it. The ⚠ is `aria-hidden` decoration for the same
 * reason: it repeats the word beside it.
 *
 * The label is English shell furniture, deliberately: `free` · `delta` · `interference` are the
 * prototype's own words for every course (its `TAG` table is global), and they name the model
 * rather than teach the language. Everything a learner reads AS teaching — the trap's heading,
 * the mnemonic's label — is the course's (`strings.json`, PRD §4). Raised with the rest of the
 * shell's furniture on #71.
 */
import { TriangleAlert } from 'lucide-react';
import type { Tag } from '../course/types.ts';
import styles from './TagChip.module.css';

/** One token pair per tag (design/tokens.md §1) — the stylesheet holds them, this picks one. */
const CHIP_CLASS: Readonly<Record<Tag, string | undefined>> = {
  free: styles.chipFree,
  delta: styles.chipDelta,
  interference: styles.chipInterference,
};

interface TagChipProps {
  tag: Tag;
}

export function TagChip({ tag }: TagChipProps) {
  return (
    <span className={CHIP_CLASS[tag]}>
      {tag === 'interference' && <TriangleAlert className={styles.icon} aria-hidden="true" />}
      {tag}
    </span>
  );
}
