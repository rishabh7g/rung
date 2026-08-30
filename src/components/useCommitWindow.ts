/**
 * The commit window (#313) — what replaced the self-mark's Next button, and the whole of what that
 * button was protecting.
 *
 * A card used to ask for two taps: the mark, then a Next that appeared beside it. [D11] made that
 * Next hidden-until-marked rather than disabled, for a good reason — a disabled control is the app
 * telling the learner what it is waiting for — but the second tap confirmed a decision the learner
 * had already made, on every card, fifteen times a session.
 *
 * The mark now commits itself, and this is the seam that keeps the promise the Next was really
 * making: **one result, the one the learner meant**. Choosing lights the segment and starts a short
 * window; choosing again inside it replaces the choice and starts the window over; when a window
 * elapses uninterrupted, `commit` fires once with whatever was chosen last.
 *
 * **Nothing is written until then**, which is why this is a window rather than an undo: a learner
 * who taps "missed" and thinks again has changed their mind about a mark the app has not yet acted
 * on, so there is no Leitner box to walk back, no production counter to decrement, and no reversal
 * action anywhere in the store (Invariant 1 keeps that surface deliberately small — an undo would
 * have to grow it).
 *
 * **The duration lives here, in JavaScript, not in CSS** — the call `HoldToConfirm` makes for the
 * hold [D14], for its reason: `design/tokens.md` §5 collapses every animation to 0.01ms under
 * `prefers-reduced-motion`, so a commit driven by a CSS transition's end would fire instantly for
 * exactly the learners least served by being rushed. Reduced motion may drop the settle; it does
 * not shorten the window.
 *
 * It holds no learner writing and no store handle — a chosen mark is one of two literals, and it
 * dies with the card.
 */
import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * How long a chosen mark stays changeable, in ms.
 *
 * Long enough to be a window rather than a flourish — a learner who realises the wrong segment is
 * lit can reach the other one — and short enough that the session is not paced by the app. The
 * segment is lit throughout, so the card reads as acknowledging the mark, never as waiting for
 * permission to move.
 */
export const COMMIT_WINDOW_MS = 450;

export interface CommitWindow<T> {
  /** What is chosen right now — `null` until the learner chooses, which is where every card starts. */
  chosen: T | null;
  /** Choose, or change the choice. Restarts the window either way. */
  choose: (value: T) => void;
}

/**
 * @param commit fired ONCE per card, with the value that survived the window.
 */
export function useCommitWindow<T>(commit: (value: T) => void): CommitWindow<T> {
  // `setChosen`, never `setState`: `src/state/unlockPath.test.ts` scans the shell for that call and
  // the store's actions are the only place allowed to make it (Invariant 1).
  const [chosen, setChosen] = useState<T | null>(null);
  /** The running window, so a second choice can cancel it. Null whenever none is running. */
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  /**
   * The callback as of this render, so the window can fire the current one without being restarted
   * every time the parent re-creates it — a session that re-rendered mid-window would otherwise
   * cancel and restart the learner's own window under them.
   */
  const latest = useRef(commit);
  useEffect(() => {
    latest.current = commit;
  }, [commit]);

  // A window does not survive the card: leaving mid-window clears the timer rather than letting it
  // fire a result for a sentence that is no longer on screen.
  useEffect(() => {
    return () => {
      if (timer.current !== null) clearTimeout(timer.current);
    };
  }, []);

  const choose = useCallback((value: T) => {
    if (timer.current !== null) clearTimeout(timer.current);
    setChosen(value);

    /**
     * The callback is captured HERE, at the choice, rather than read at the fire.
     *
     * A window belongs to the card the learner was looking at when they marked it. If the parent
     * swaps the sentence mid-window without remounting the card — which both call sites avoid by
     * keying, and which the reveal card defends against anyway — firing the callback that is
     * current a moment later would credit this mark to the NEXT sentence. Capturing it makes the
     * result land on the card it was actually about.
     */
    const fire = latest.current;
    timer.current = setTimeout(() => {
      timer.current = null;
      fire(value);
    }, COMMIT_WINDOW_MS);
  }, []);

  return { chosen, choose };
}
