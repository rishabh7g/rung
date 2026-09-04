/**
 * One sentence in the module list (#88, #217; PRD-design §6.4, §7; PRD §8 F2) — a card that is
 * nothing but a way in: tap it anywhere and Sentence Detail opens.
 *
 * **The whole card is one `<Link>`, and that is the whole interaction.** It used to be a
 * disclosure — a `<button aria-expanded>` over a panel repeating the gloss, the literal, the word
 * chips and the trap note — which made the list a strictly smaller second copy of Detail and cost
 * the learner a tap and a decision ("expand, or open full?") before anything appeared. #217 threw
 * the copy away: the details live in exactly one screen, and this one leads there.
 *
 * What it says, then: `display` (the L2 line), `cue` under it, the quiet `script` line in
 * romanized courses, the two production dots, and a chevron pointing the way the course reads.
 * Nothing here has state, so the card has none — the screen no longer remembers open cards
 * because there is nothing to open (`moduleView.ts`).
 *
 * **It is a blueprint object like every other**: radius 0, a hairline, the four `+` registration
 * marks (design/tokens.md §3, §7 rule 3). One focusable control, whose accessible name is the
 * lines it draws — so it announces the sentence it opens, and Enter opens it.
 *
 * **Every word in it is the course's.** `display`, `cue` and `script` are that sentence's own
 * content; the card adds no label of its own, in any language. This file contains no
 * learner-facing English.
 *
 * **The two L2 lines carry their own language AND direction** (#186, #196): `l2Written(course)`
 * says that a romanized course's `display` is `ar-Latn`/`ltr` while its quiet `script` line is
 * `ar`/`rtl`, so an Arabic sentence runs right to left inside a card that does not.
 */
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import type { L2Written } from '../../course/manifest.ts';
import type { Sentence } from '../../course/types.ts';
import { ProductionDots } from './ProductionDots.tsx';
import styles from './SentenceCard.module.css';

interface SentenceCardProps {
  sentence: Sentence;
  /** `production[sentenceId]` — read-only here; the counters are written by `recordProduction`. */
  produced: number;
  /** The course's writing direction — every line on the card is its content. */
  dir?: string;
  /** The tags the L2 lines are written in (#186); the L1 ones inherit the document's. */
  l2?: L2Written;
}

export function SentenceCard({ sentence, produced, dir, l2 }: SentenceCardProps) {
  return (
    <li className={styles.card}>
      <Link className={styles.open} to={`/sentence/${sentence.id}`} dir={dir}>
        <span className={styles.lines}>
          <span className={styles.display} dir={l2?.display.dir} lang={l2?.display.lang}>
            {sentence.display}
          </span>
          <span className={styles.cue}>{sentence.cue}</span>
          {/* Romanized courses only (scriptMode, PRD §4): the native script as recognition, never
              as something to produce — so it is the quietest line on the card. A native course's
              sentences carry no `script` at all, which is why the content is the condition. */}
          {sentence.script !== undefined && (
            <span className={styles.script} dir={l2?.script.dir} lang={l2?.script.lang}>
              {sentence.script}
            </span>
          )}
        </span>

        <ProductionDots produced={produced} />

        <ChevronRight className={styles.go} aria-hidden="true" />
      </Link>
    </li>
  );
}
