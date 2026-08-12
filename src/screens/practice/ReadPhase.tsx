/**
 * The Read phase (#97; PRD §8 F4, PRD-design §6.3, flow 3; prototype → Practice → Read) — the
 * middle phase, and the quietest thing in the product: one sentence on screen, the learner's own
 * voice, and nothing being marked.
 *
 * **Nothing here writes.** Read moves between Review (which feeds the Leitner queue) and Produce
 * (which feeds the production counters) and touches neither: there is no self-mark on this card,
 * no counter, no box. The only thing it moves is the position — which the session snapshots, so
 * leaving mid-read comes back to the same sentence (#99).
 *
 * **The cue is HIDDEN until asked for** — the one deliberate divergence from the prototype, which
 * opens with the Hindi line already showing (`readHiOn: true`). Read sits one phase before
 * Produce, and the phases are a production bias: L2 first, recall before recognition, the L1 as
 * the thing you check yourself against rather than the thing you read. A cue on screen by default
 * makes the L2 line optional, which is the opposite of what the phase is for. Recorded as a
 * divergence for #117 rather than "fixed" back.
 *
 * **The nudge is shown ONCE, at phase start**, not on every card: it is an instruction for the
 * phase ("read aloud — and jot anything new into your notebook"), and a line that repeats under
 * every sentence stops being read by the third one. The prototype prints it per card, which is
 * what a prototype does with a line it wants photographed. Also #117's.
 *
 * **Invariant [D1]: the app plays nothing and records nothing.** The nudge asks the learner to
 * read aloud in their own voice; the app has no voice of its own — no audio element, no speech
 * API, no recorder, anywhere in `src/`. That is not a convention here, it is a scan:
 * `src/silence.test.ts`.
 */
import { useState } from 'react';
import type { L2Lang } from '../../course/manifest.ts';
import { useStrings } from '../../course/strings.ts';
import type { Sentence } from '../../course/types.ts';
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
  /** Next — and on the last sentence, the hand-over to Produce. The session decides which. */
  onNext: () => void;
  /** The course's writing direction — every word on this card is its content or its copy. */
  dir?: string;
  /** The tags the L2 lines are written in (#186); the cue and the nudge are L1 and inherit. */
  l2?: L2Lang;
}

export function ReadPhase({
  moduleId,
  sentence,
  at,
  total,
  onPrev,
  onNext,
  dir,
  l2,
}: ReadPhaseProps) {
  const strings = useStrings();
  // `setCue` / `setNudge`, never `setState`: `src/state/unlockPath.test.ts` scans the shell for
  // that call and the store's actions are the only place allowed to make it (Invariant 1).
  const [cueOpen, setCue] = useState(false);
  /**
   * Mounted with the phase, so this is per PHASE and not per sentence: the first move through the
   * rung retires the line, and coming back to Read later (by chip, or by resuming) starts a phase
   * and shows it again.
   */
  const [nudged, setNudge] = useState(true);
  const cueId = `read-cue-${sentence.id}`;
  const last = at + 1 >= total;

  /** Both pager buttons retire the nudge: the learner has started, so the instruction is spent. */
  const step = (move: () => void): void => {
    setNudge(false);
    move();
  };

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
        <p className={styles.display} dir={dir} lang={l2?.display}>
          {sentence.display}
        </p>
        {/* Romanized courses only (PRD §4, [D20]): recognition, never something to produce. */}
        {sentence.script !== undefined && (
          <p className={styles.script} lang={l2?.script}>
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

      {/* The read-aloud nudge, in the course's own words (`nudge.read`) — the app's whole part in
          the reading, and it stays silent itself [D1]. */}
      {nudged && (
        <p className={styles.nudge} dir={dir}>
          {strings['nudge.read']}
        </p>
      )}

      {/* Bottom of the column, where the prototype puts the pair. */}
      <div className={styles.pager}>
        <button
          type="button"
          className={styles.back}
          // The rung's first sentence has nothing before it — the same bound Sentence Detail's
          // pager takes (#89). Nothing about the PHASES is gated by it; the chips are still live.
          disabled={at === 0}
          onClick={() => {
            step(onPrev);
          }}
          dir={dir}
        >
          {strings['read.prev']}
        </button>
        <button
          type="button"
          className={styles.next}
          onClick={() => {
            step(onNext);
          }}
          dir={dir}
        >
          {/* The last sentence names where it goes, as the prototype's does: reading the rung
              through IS the hand-over to Produce. */}
          {last ? strings['read.toProduce'] : strings['read.next']}
        </button>
      </div>
    </section>
  );
}
