/**
 * One word row (#94; PRD-design §7 "'Why' toggle → shared word-row component (word + cue + tag
 * chip + note)", design/tokens.md §6).
 *
 * Four things, always in this order: the L2 word, its L1 cue, its delta-learning tag, and the note
 * that says the one thing worth knowing about it. It is the smallest unit of teaching the product
 * has — the row a "why" expands to, and the row Sentence Detail prints in full — so it is a
 * component rather than a recipe re-typed per screen, exactly as `TagChip` is.
 *
 * The row renders a `Word` off a sentence's `deconstruction` (`src/course/types.ts`): the resolver
 * says WHICH word (`src/engine/wordIndex.ts`), the panel fetches the module it lives in, and this
 * draws it. `note` is optional in the schema and a row without one renders three parts, never an
 * empty line.
 *
 * Every string in it is the course's own content except the tag's name, which is English shell
 * furniture in every course (`TagChip`, #89) because it names the model rather than teaches the
 * language.
 */
import type { Word } from '../course/types.ts';
import { TagChip } from '../screens/TagChip.tsx';
import styles from './WhyRow.module.css';

interface WhyRowProps {
  word: Word;
  /** The course's writing direction — every line here is its content. */
  dir?: string;
}

export function WhyRow({ word, dir }: WhyRowProps) {
  return (
    <li className={styles.row}>
      <p className={styles.head}>
        <span className={styles.display} dir={dir}>
          {word.display}
        </span>
        <span className={styles.cue} dir={dir}>
          {word.cue}
        </span>
        <TagChip tag={word.tag} />
      </p>
      {word.note !== undefined && (
        <p className={styles.note} dir={dir}>
          {word.note}
        </p>
      )}
    </li>
  );
}
