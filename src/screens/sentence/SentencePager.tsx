/**
 * The pager: within this module, and bounded by it — with a hand-over at each end of the module
 * onto the ladder (#367, #414).
 *
 * Paging uses `replace`, because prev/next is one screen paging rather than ten destinations —
 * the back chevron still returns to the module the learner came from, not to the sentence before
 * this one. Leaving for another module is a destination change and belongs in history, so both
 * hand-overs are `<Link>`s rather than the pager's `navigate(replace)`.
 *
 * **The leading slot** is the trailing one's mirror: paging inside the module wherever there is a
 * sentence before this one, and on the FIRST sentence a HAND-BACK to the module behind this one on
 * the ladder (`handBackAt`, resolved by `useLadderHandOver`) rather than a dead control. It stays
 * a disabled button wherever there is nothing behind: the first module of the ladder, a previous
 * rung the ladder has locked or left mid-ritual, and the moment before that module's file has
 * arrived. Those are the cases where the old asymmetry was telling the truth.
 *
 * **The trailing slot** is a HAND-OVER on the last sentence, not a dead button (#367). Reaching
 * the end of a module's sentences used to grey Next out and stop: the screen closed on a piece of
 * content, a disabled control and nothing else. Every other walk-through surface in the app names
 * its own end — the module LIST closes with a Practice link — and this was the one that did not.
 *
 * Where it goes depends on whether this module is behind the learner (`handOverTo`). On the rung
 * they are climbing it goes to PRACTICE, and arriving there starts nothing: the hub is a count
 * plus one Start CTA, and `startSession` — which spends a session count and ticks the review
 * queue — runs only on that deliberate tap (the structural version of #316 was built and backed
 * out over exactly this). On a module they have PASSED it goes to the next module's FIRST
 * SENTENCE instead, so a re-read of the ladder carries straight on. That id is built by
 * convention — every module's first sentence is `<id>-S01`, checked across all nine courses'
 * content — and the convention failing is not a broken link: an id the screen cannot find falls
 * through to the module list, which is a fair place to arrive.
 *
 * The position reads `3 / 10`: counts, never time (Invariant 2) — and the `n / total` the module
 * list already writes, so the shell adds no English word of its own.
 */
import { Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import type { Strings } from '../../course/strings.ts';
import type { Sentence } from '../../course/types.ts';
import { PRACTICE_PATH } from '../../shell/routes.tsx';
import styles from '../SentenceScreen.module.css';

interface SentencePagerProps {
  /** Zero-based position of this sentence in its module. */
  at: number;
  total: number;
  previous: Sentence | undefined;
  next: Sentence | undefined;
  /** The module the last sentence hands over to; `undefined` sends it to Practice. */
  handOverTo: string | undefined;
  /** The previous module's last sentence, for the first sentence to hand back to. */
  handBackAt: Sentence | undefined;
  strings: Strings;
}

export function SentencePager({
  at,
  total,
  previous,
  next,
  handOverTo,
  handBackAt,
  strings,
}: SentencePagerProps) {
  const navigate = useNavigate();

  /** Opens a neighbour, or does nothing at the ends of the module — the pager's whole bound. */
  const step = (target: Sentence | undefined): void => {
    if (target !== undefined) void navigate(`/sentence/${target.id}`, { replace: true });
  };

  return (
    <nav className={styles.pager} aria-label={strings['a11y.sentencePager']}>
      {handBackAt === undefined ? (
        <button
          type="button"
          className={styles.step}
          disabled={previous === undefined}
          onClick={() => {
            step(previous);
          }}
        >
          <ArrowLeft className={styles.stepIcon} aria-hidden="true" />
          {strings['sentence.prev']}
        </button>
      ) : (
        <Link className={styles.step} to={`/sentence/${handBackAt.id}`}>
          <ArrowLeft className={styles.stepIcon} aria-hidden="true" />
          {strings['sentence.prevModule']}
        </Link>
      )}
      <p className={styles.position}>
        {at + 1} / {total}
      </p>
      {next === undefined ? (
        <Link
          className={styles.step}
          to={handOverTo === undefined ? PRACTICE_PATH : `/sentence/${handOverTo}-S01`}
        >
          {handOverTo === undefined ? strings['sentence.done'] : strings['sentence.nextModule']}
          <ArrowRight className={styles.stepIcon} aria-hidden="true" />
        </Link>
      ) : (
        <button
          type="button"
          className={styles.step}
          onClick={() => {
            step(next);
          }}
        >
          {strings['sentence.next']}
          <ArrowRight className={styles.stepIcon} aria-hidden="true" />
        </button>
      )}
    </nav>
  );
}
