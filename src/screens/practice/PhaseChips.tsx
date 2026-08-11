/**
 * The phase chips (#96; PRD §8 F4 "Phases Review → Read → Produce as soft chips", PRD-design §6.3,
 * §7) — the session's only navigation, and the shape of the product's fourth invariant.
 *
 * **They guide; they never gate.** Every chip is live in every phase: a learner may open Produce
 * without reviewing, go back to Read halfway through a card, or skip a phase entirely and leave.
 * Nothing here is ever disabled, nothing is ever hidden, and no chip requires the one before it —
 * which is why they are three plain buttons rather than a stepper, a wizard or a progress bar.
 *
 * The one chip that can answer instead of switching is **Review with nothing due**, and it answers
 * honestly: the parent shows the course's own "nothing due yet — this is the first rung" line
 * (`practice.nothingDue`) rather than opening an empty phase and calling it a session. That refusal
 * is a message, not a lock — it is the same tap, with an answer.
 *
 * Every label is the course's (`practice.phase.*`); this file has no word of its own.
 */
import type { SessionPhase } from '../../state/types.ts';
import { useStrings } from '../../course/strings.ts';
import type { StringsKey } from '../../course/stringsKeys.ts';
import styles from './PhaseChips.module.css';

/** The three phases, in the order a session serves them — and the order they are drawn in. */
export const PHASES: readonly SessionPhase[] = ['review', 'read', 'produce'];

/** Each phase's name, in the course's own words. */
const LABEL: Readonly<Record<SessionPhase, StringsKey>> = {
  review: 'practice.phase.review',
  read: 'practice.phase.read',
  produce: 'practice.phase.produce',
};

interface PhaseChipsProps {
  /** Which phase is on screen — the only chip that is filled. */
  phase: SessionPhase;
  /** Tapped. The session decides what a jump means; the chips only report one. */
  onJump: (phase: SessionPhase) => void;
  /** The course's writing direction — the three labels are its words. */
  dir?: string;
}

export function PhaseChips({ phase, onJump, dir }: PhaseChipsProps) {
  const strings = useStrings();

  return (
    <div className={styles.chips}>
      {PHASES.map((name) => (
        <button
          key={name}
          type="button"
          className={name === phase ? styles.chipOn : styles.chip}
          // Pressed rather than a tab's `aria-selected`: a tablist owes arrow-key roving and a
          // panel per tab, and these are three buttons that change what one column is showing.
          aria-pressed={name === phase}
          onClick={() => onJump(name)}
          dir={dir}
        >
          {strings[LABEL[name]]}
        </button>
      ))}
    </div>
  );
}
