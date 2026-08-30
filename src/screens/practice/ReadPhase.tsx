/**
 * The Read phase (#97; PRD §8 F4, PRD-design §6.3, flow 3; prototype → Practice → Read) — the
 * middle phase, and the quietest thing in the product: one sentence on screen, the learner's own
 * voice, and nothing being marked.
 *
 * **This is where the exit gate lives now** (#349). Read used to write nothing at all: it sat
 * between Review, which feeds the Leitner queue, and Produce, which fed the counters that open a
 * rung's exit ritual. The product retired notebook writing and Produce went with it — so the gate
 * moved HERE, to the learner's own mark on each sentence they read.
 *
 * A got-it counts the sentence; a miss counts nothing and costs nothing. Neither touches the
 * Leitner queue, which is Review's alone. The mark does not move the pager either: this is a
 * read-through, and a learner who wants to sit with a sentence, mark it, and read it again should
 * be able to. The pager is still the navigation.
 *
 * **The cue is HIDDEN until asked for** — the one deliberate divergence from the prototype, which
 * opens with the Hindi line already showing (`readHiOn: true`). Read sits one phase before
 * Produce, and the phases are a production bias: L2 first, recall before recognition, the L1 as
 * the thing you check yourself against rather than the thing you read. A cue on screen by default
 * makes the L2 line optional, which is the opposite of what the phase is for. Recorded as a
 * divergence for #117 rather than "fixed" back.
 *
 * **No read-aloud line.** The phase used to open with one, shown once and retired by the first
 * pager tap; #225 removed it with the rest of the app's read-once copy. The phase is still a
 * read-through — the learner learns that from the sentence in front of them, not from a sentence
 * about it.
 *
 * **Invariant [D1]: the app plays nothing and records nothing.** The reading is the learner's own
 * voice; the app has no voice of its own — no audio element, no speech API, no recorder, anywhere
 * in `src/`. That is not a convention here, it is a scan: `src/silence.test.ts`.
 */
import { useState } from 'react';
import type { L2Written } from '../../course/manifest.ts';
import { useStrings } from '../../course/strings.ts';
import type { Sentence } from '../../course/types.ts';
import { SelfMark } from '../../components/SelfMark.tsx';
import { WhyPanel } from '../../components/WhyPanel.tsx';
import { RegistrationMarks } from '../RegistrationMarks.tsx';
import { rungLabel } from '../ladder/rungLabel.ts';
import styles from './ReadPhase.module.css';

interface ReadPhaseProps {
  /** The rung being read — the kicker's label, and where the sentences come from. */
  moduleId: string;
  /** The sentence on screen. */
  sentence: Sentence;
  /** Its position in the rung, zero-based — the session owns it, because the snapshot does. */
  at: number;
  /** How many sentences the rung has: the `3 / 10` count's second half. */
  total: number;
  /** Back. Never called on the first sentence — the control is disabled there. */
  onPrev: () => void;
  /**
   * The learner's own verdict on this sentence (#349). A got-it counts it towards the rung's exit
   * ritual; a miss counts nothing. The phase reports the mark and the session decides what it
   * costs — the same division of labour every marked surface in this app keeps.
   */
  onMark: (gotIt: boolean) => void;
  /** Has this sentence already been marked got-it? The mark is a fact, not a tally to re-take. */
  marked: boolean;
  /** Next — and on the last sentence, the hand-over to Produce. The session decides which. */
  onNext: () => void;
  /** The course's writing direction — every word on this card is its content or its copy. */
  dir?: string;
  /** The tags the L2 lines are written in (#186); the cue and the copy are L1 and inherit. */
  l2?: L2Written;
}

export function ReadPhase({
  moduleId,
  sentence,
  at,
  total,
  onPrev,
  onNext,
  onMark,
  marked,
  dir,
  l2,
}: ReadPhaseProps) {
  const strings = useStrings();
  // `setCue`, never `setState`: `src/state/unlockPath.test.ts` scans the shell for that call and
  // the store's actions are the only place allowed to make it (Invariant 1).
  const [cueOpen, setCue] = useState(false);
  const cueId = `read-cue-${sentence.id}`;
  const last = at + 1 >= total;

  return (
    <section className={styles.read}>
      <div className={styles.head}>
        {/* Structural furniture, like the session's other kickers — raised on #71. */}
        <p className={styles.kicker}>READ · {rungLabel(moduleId)}</p>
        {/* Counts, never time — and no English "of": the shell owns neither word (#88, #89). */}
        <p className={styles.position}>
          {at + 1} / {total}
        </p>
      </div>

      {/* A blueprint object: radius 0, a hairline, no fill, and the four registration marks —
          which is the `position: relative` (design/tokens.md §3). */}
      <div className={styles.plate}>
        <RegistrationMarks />
        <p className={styles.display} dir={l2?.display.dir} lang={l2?.display.lang}>
          {sentence.display}
        </p>
        {/* Romanized courses only (PRD §4, [D20]): recognition, never something to produce. */}
        {sentence.script !== undefined && (
          <p className={styles.script} dir={l2?.script.dir} lang={l2?.script.lang}>
            {sentence.script}
          </p>
        )}
        {/* The L1, on demand — see the divergence note in this file's header. */}
        {cueOpen && (
          <p id={cueId} className={styles.cue} dir={dir}>
            {sentence.cue}
          </p>
        )}

        {/* The prototype's row of three ghosts. The cue toggle rides in `WhyPanel`'s own controls
            row rather than sitting above it, so "why" expands under all three (#94's slot). */}
        <WhyPanel
          // Keyed by the sentence, so a new one never arrives with the last one's rows already
          // expanded under it — the prototype closes "why" on every move, and keeps the CUE
          // toggle where the learner left it, which is why only one of the two is keyed.
          key={sentence.id}
          sentenceId={sentence.id}
          display={sentence.display}
          // Read offers "open full" — the phase is a read-through, and leaving it for the whole
          // sentence is the same move the module list makes (PRD §8 F4).
          openFull
          dir={dir}
          l2={l2}
          leading={
            <button
              type="button"
              className={styles.toggle}
              aria-expanded={cueOpen}
              // Only while there is one: a reference to an id no element has is a broken
              // reference (`WhyPanel`'s call, #88's before it).
              aria-controls={cueOpen ? cueId : undefined}
              onClick={() => {
                setCue(!cueOpen);
              }}
              dir={dir}
            >
              {cueOpen ? strings['read.hideCue'] : strings['read.showCue']}
            </button>
          }
        />
      </div>

      {/**
       * The gate (#349). The same two segments every marked surface in the app uses — the mark is
       * the learner's, and the app's whole part in it is to take it (Invariant 4).
       *
       * It is NOT a commit window like the reveal card's (#313): there is nothing to advance to,
       * because the mark does not move the pager. A got-it lands the moment it is chosen, and the
       * lit segment is the receipt. Re-marking a sentence already counted writes nothing — the
       * counter is a fact about the sentence, not a tally of taps.
       */}
      <div className={styles.marks}>
        <SelfMark
          // Keyed by the sentence, so the next one arrives unmarked rather than wearing the last
          // one's verdict.
          key={sentence.id}
          mark={marked ? 'got' : null}
          onMark={(mark) => onMark(mark === 'got')}
          dir={dir}
        />
      </div>

      {/* Bottom of the column, where the prototype puts the pair. */}
      <div className={styles.pager}>
        <button
          type="button"
          className={styles.back}
          // The rung's first sentence has nothing before it — the same bound Sentence Detail's
          // pager takes (#89). Nothing about the PHASES is gated by it; the chips are still live.
          disabled={at === 0}
          onClick={onPrev}
          dir={dir}
        >
          {strings['read.prev']}
        </button>
        <button type="button" className={styles.next} onClick={onNext} dir={dir}>
          {/* The last sentence names where it goes. It used to hand over to Produce; with that
              phase gone (#349) reading the rung through IS the end of the session. */}
          {last ? strings['read.finish'] : strings['read.next']}
        </button>
      </div>
    </section>
  );
}
