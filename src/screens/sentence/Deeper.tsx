/**
 * THE DISCLOSURE (#401, #408). Above it is what a sentence IS — the line, its words, and the one
 * thing that will bite; below it, still in the frozen order, is everything else the course has to
 * say about it. Six sections and three screens per sentence was the reading path a first-timer
 * walked ten times a module, and most of it restated the tier above (the gloss says the literal; a
 * word's note says its rule). Nothing is removed and nothing moves: one control, and the depth is
 * one tap away for the sentence that earns the question.
 *
 * It wears the pager's button shape — a hairline frame at the secondary height, centred — and a
 * chevron the pager does not need. The first version was a ghost: accent text between two
 * hairlines, and between the amber trap and the "pocket it" plate it read as a caption. Watched in
 * use, it was not tapped. A disclosure has to look like a door (#408).
 *
 * The deeper sections are this component's `children`, so the screen keeps the whole order in one
 * place and this owns only the door: its state and its button. Closed on every sentence — the
 * detail is keyed by id, so prev/next remounts it shut (#401).
 */
import { useState, type ReactNode } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import type { Strings } from '../../course/strings.ts';
import styles from '../SentenceScreen.module.css';

interface DeeperProps {
  /** The panel's `id` — unique per sentence, so `aria-controls` names exactly one element. */
  id: string;
  strings: Strings;
  children: ReactNode;
}

export function Deeper({ id, strings, children }: DeeperProps) {
  // `setDeeper`, never `setState`: `src/state/unlockPath.test.ts` scans the shell for that call and
  // the store's actions are the only place allowed to make it (Invariant 1).
  const [deeper, setDeeper] = useState(false);

  return (
    <>
      <button
        type="button"
        className={styles.deeper}
        aria-expanded={deeper}
        // Only while there is one: a reference to an id no element has is a broken reference
        // (`WhyPanel`'s call, #88's before it).
        aria-controls={deeper ? id : undefined}
        onClick={() => {
          setDeeper(!deeper);
        }}
      >
        {deeper ? strings['sentence.less'] : strings['sentence.deeper']}
        {deeper ? (
          <ChevronUp className={styles.deeperIcon} aria-hidden="true" />
        ) : (
          <ChevronDown className={styles.deeperIcon} aria-hidden="true" />
        )}
      </button>
      {deeper && (
        <div id={id} className={styles.depth}>
          {children}
        </div>
      )}
    </>
  );
}
