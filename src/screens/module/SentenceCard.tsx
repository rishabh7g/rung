/**
 * One sentence in the module list (#88; PRD-design §6.4, §7; PRD §8 F2) — collapsed by default,
 * **expanding in place** into a summary of itself, and never leaving the list to do it.
 *
 * | state | what it says |
 * |---|---|
 * | collapsed | `display` (the L2 line), `cue` under it, the quiet `script` line in romanized courses, the two production dots and a chevron |
 * | expanded | + `glossEn`, the word-for-word `literal`, the sentence's word rows as tag chips, the interference-trap note when it has one, and "open full" → `/sentence/:id` |
 *
 * **Expansion is the parent's state, one card at a time.** The screen owns the set of open ids
 * (and remembers it across a detour into Sentence Detail, `moduleView.ts`), so opening one card
 * cannot close another: that is the whole of "expand in place", and a card holding its own
 * `useState` would lose it the moment the learner opened a sentence and came back.
 *
 * **It is a blueprint object like every other**: radius 0, a hairline, the four `+` registration
 * marks (design/tokens.md §3, §7 rule 3). The header is a `<button>` with `aria-expanded` — it
 * toggles, it does not navigate — and the one control that navigates ("open full") is a `<Link>`,
 * the same split the rung card makes.
 *
 * **Every word in it is the course's.** `display`, `cue`, `script`, `glossEn` and `literal` are
 * that sentence's own content; the two labels the card adds (`module.openFull`, `module.trapNote`)
 * come from the course bundle (PRD §4). This file contains no learner-facing English.
 */
import { Link } from 'react-router-dom';
import { ChevronDown, ArrowRight, TriangleAlert } from 'lucide-react';
import { useStrings } from '../../course/strings.ts';
import type { Sentence, Tag } from '../../course/types.ts';
import { RegistrationMarks } from '../RegistrationMarks.tsx';
import { ProductionDots } from './ProductionDots.tsx';
import styles from './SentenceCard.module.css';

/** The delta-learning tag's chip colours (design/tokens.md §1, §6) — one pair per tag. */
const CHIP_CLASS: Readonly<Record<Tag, string | undefined>> = {
  free: styles.chipFree,
  delta: styles.chipDelta,
  interference: styles.chipInterference,
};

interface SentenceCardProps {
  sentence: Sentence;
  /** `production[sentenceId]` — read-only here; the counters are written in Practice (#95). */
  produced: number;
  expanded: boolean;
  /** Called with this sentence's id; the screen keeps the open set. */
  onToggle: (sentenceId: string) => void;
  /** The course's writing direction — every line on the card is its content. */
  dir?: string;
}

export function SentenceCard({ sentence, produced, expanded, onToggle, dir }: SentenceCardProps) {
  const strings = useStrings();
  const panelId = `sentence-panel-${sentence.id}`;

  return (
    <li className={styles.card}>
      <RegistrationMarks />

      <button
        type="button"
        className={styles.summary}
        aria-expanded={expanded}
        // Only while there is one: `aria-controls` pointing at an id no element has is a broken
        // reference, and a collapsed card genuinely has no panel to name.
        aria-controls={expanded ? panelId : undefined}
        onClick={() => onToggle(sentence.id)}
      >
        <span className={styles.lines}>
          <span className={styles.display} dir={dir}>
            {sentence.display}
          </span>
          <span className={styles.cue} dir={dir}>
            {sentence.cue}
          </span>
          {/* Romanized courses only (scriptMode, PRD §4): the native script as recognition, never
              as something to produce — so it is the quietest line on the card. A native course's
              sentences carry no `script` at all, which is why the content is the condition. */}
          {sentence.script !== undefined && (
            <span className={styles.script}>{sentence.script}</span>
          )}
        </span>

        <ProductionDots produced={produced} />

        <ChevronDown
          className={expanded ? styles.chevronOpen : styles.chevron}
          aria-hidden="true"
        />
      </button>

      {expanded && (
        <div id={panelId} className={styles.panel}>
          {/* The gloss is English in every course by definition (`glossEn`), so it is the one
              line here set in the body face rather than the L2 one. */}
          <p className={styles.gloss}>{sentence.glossEn}</p>

          {sentence.literal !== undefined && (
            <p className={styles.literal} dir={dir}>
              {sentence.literal}
            </p>
          )}

          {/* The word rows, previewed: the surfaces in order, each wearing its delta-learning tag.
              The full rows — cue, note, accepted forms — are what "open full" leads to [D10]. */}
          <ul className={styles.words}>
            {sentence.deconstruction.words.map((word, index) => (
              <li key={`${word.display}-${index}`} className={CHIP_CLASS[word.tag]} dir={dir}>
                {word.display}
              </li>
            ))}
          </ul>

          {sentence.trap !== undefined && (
            <p className={styles.trap} dir={dir}>
              <TriangleAlert className={styles.trapIcon} aria-hidden="true" />
              {strings['module.trapNote']}
            </p>
          )}

          <Link className={styles.openFull} to={`/sentence/${sentence.id}`} dir={dir}>
            {strings['module.openFull']}
            <ArrowRight className={styles.openFullIcon} aria-hidden="true" />
          </Link>
        </div>
      )}
    </li>
  );
}
