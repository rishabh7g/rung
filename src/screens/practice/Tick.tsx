/**
 * The gentle elapsed tick (#98; PRD §2 boundary note + §8 F4, PRD-design §7, design/tokens.md §5;
 * prototype → Practice → the hairline under the phase chips) — the ONLY sanctioned time
 * affordance in the product, and the least of one: two pixels of track that fill once over ~25
 * minutes and then stop.
 *
 * **It is ambience, not a readout.** The node carries no text in any state, announces nothing
 * (`aria-hidden`, and deliberately no live region), and never counts down. Nothing here says how
 * long has passed, how long is left, or how long a session ought to be — a learner sees the line
 * reach the far side of the screen once, and that is the whole affordance. Which is why it is the
 * one time object Invariant 2 leaves standing: a bar with a number on it is a session with a
 * target, and a target is a calendar with one day in it.
 *
 * **Why `performance.now()` where `clock.ts` owns every date in the app (#82).** The guard in
 * `src/state/clock.test.ts` fails on a date constructed anywhere but `clock.ts`, and it is right
 * to: a date is a position in a calendar, and a product whose second invariant is "no calendar
 * framing" cannot have one leaking into a screen. This measures something else entirely — a
 * DURATION, the milliseconds since a moment inside this session, off a monotonic timer whose
 * origin is the page load. It cannot answer what day it is, what time it is, or what the last
 * session was; a clock change, a timezone or a DST hop moves it by nothing at all, because it is
 * not a date and does not know about any of them. The number never leaves this component either:
 * it is not persisted (state v6 carries no timestamp but `passedAt`), not exported, and not
 * rendered — it reaches the DOM as a fraction of a bar's width and nothing else. The guard's own
 * comment carries this argument, so the exemption is one someone can read rather than infer.
 *
 * **Session-relative, and nothing survives the session.** The origin lives in a ref, so a session
 * is exactly as long as it has been on screen. Closing the tab and coming back does not resume a
 * stopwatch — the tick starts again from empty, which is honest: the elapsed line is about the
 * sitting, not the ladder.
 */
import { useEffect, useRef, useState, useSyncExternalStore, type CSSProperties } from 'react';
import { useAppStore } from '../../state/store.ts';
import styles from './Tick.module.css';

/**
 * `--motion-tick-cap: 25min` — the tick fills once over ~25 minutes, then stops (tokens.md §5).
 * The token names the value for the design package; CSS cannot do arithmetic on it and this is
 * the arithmetic, so the number is stated once here and nowhere else in the app.
 */
const CAP_MS = 25 * 60 * 1000;

/**
 * How often the fill is recomputed: coarse on purpose. Nothing on this bar is worth a frame — at
 * 15 seconds a sample the width moves by less than a percent, under a 1s transition, so what the
 * eye gets is drift rather than motion. It is also ~100 wakeups in a full session instead of
 * ~90,000, on a phone the learner is holding.
 */
const SAMPLE_MS = 15_000;

/** The tab going to the background, and coming back. Module-level, so the subscription is stable. */
function subscribeVisibility(onChange: () => void): () => void {
  document.addEventListener('visibilitychange', onChange);
  return () => document.removeEventListener('visibilitychange', onChange);
}

/** Whether this session is in front of the learner at all. */
function pageVisible(): boolean {
  return document.visibilityState !== 'hidden';
}

interface TickProps {
  /**
   * Whether the session is running. **Active means one thing here: a phase is on screen.**
   * `Session` passes `!live.done`, so the summary stops the tick exactly where the prototype
   * removes it — a finished session is not accruing anything. Two more pauses come free and mean
   * the same thing: leaving the route unmounts the session (and this with it), and a backgrounded
   * tab stops accruing until it is looked at again.
   */
  active: boolean;
}

export function Tick({ active }: TickProps) {
  const enabled = useAppStore((store) => store.settings.elapsedTickEnabled);
  const visible = useSyncExternalStore(subscribeVisibility, pageVisible);
  /** How full the bar is, 0 → 1. The only thing that reaches the DOM. */
  const [filled, setFilled] = useState(0);
  /** Milliseconds this session has spent ACTIVE, banked at every pause. Never persisted. */
  const accrued = useRef(0);

  // A tick that is switched off is not a stopwatch running quietly behind the setting: it accrues
  // nothing, so turning it on mid-session starts an honest empty bar rather than revealing a
  // number the app was keeping anyway.
  const running = enabled && active && visible;

  useEffect(() => {
    if (!running) return;

    // Monotonic, and a duration rather than a date — see the note at the top of this file.
    const from = performance.now();
    const sample = () => {
      const elapsed = accrued.current + (performance.now() - from);
      const fraction = Math.min(elapsed / CAP_MS, 1);
      setFilled(fraction);
      // Capped: the bar is full, it stays full, and there is nothing left to sample for.
      if (fraction >= 1) clearInterval(timer);
    };

    const timer = setInterval(sample, SAMPLE_MS);
    sample();

    return () => {
      clearInterval(timer);
      // Bank what this stretch was worth. A pause is not a reset and not a fast-forward: the time
      // the session spent away is time nobody practised, so the bar picks up where it stopped.
      accrued.current += performance.now() - from;
    };
  }, [running]);

  // Off, or over: no track, no fill, no box — zero layout trace, exactly as if #98 never shipped.
  if (!enabled || !active) return null;

  return (
    <div
      className={styles.track}
      data-slot="elapsedTick"
      // Ambience, not information. There is no text to read here and nothing to announce: a
      // screen reader that narrated a session's elapsed time would be inventing the one number
      // the whole component exists to withhold (Invariant 2).
      aria-hidden="true"
      // The fill's width is CSS's (`calc(var(--tick-fraction) * 100%)`); this hands it the one
      // number it cannot compute, so every value in the stylesheet stays a token.
      style={{ '--tick-fraction': filled } as CSSProperties}
    >
      <div className={styles.fill} />
    </div>
  );
}
