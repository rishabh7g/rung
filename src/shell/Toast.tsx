/**
 * The toast (#86) — the app's one transient message, and the only thing in the shell that says
 * something and then stops saying it.
 *
 * It exists because two moments in the product are honest refusals rather than errors: tapping a
 * sealed level ("Sealed — Level 2 opens when the rungs below it are climbed: 8 left") and
 * switching courses ("…your hindi → marathi ladder is saved exactly where it was", #106). Both
 * answer a tap with one calm line and no dismiss button, so the control is a timer, not a widget:
 * `useToast()` owns the timer and `<Toast>` renders whatever it is holding.
 *
 * Three properties worth stating, because each is a decision rather than a detail:
 *
 *   • **The live region is always mounted.** A `role="status"` element that appears at the same
 *     moment its text does is announced inconsistently — the region has to exist before the change
 *     for a screen reader to notice one. So the wrapper is always there and only its child comes
 *     and goes, and it is `pointer-events: none` so an invisible box over the bottom of the screen
 *     can never eat a tap.
 *   • **A second message replaces the first**, restarting the timer. Toasts do not queue: the
 *     newest answer is the one to the tap the learner just made.
 *   • **It carries no copy.** Every message it shows comes from the active course's bundle
 *     (`useStrings()`, PRD §4) — this file has no string of its own to render, which is why it
 *     takes one.
 *
 * `--toast-bg` / `--toast-fg` (neutral-900/100) are the tokens design/tokens.md §1 reserves for
 * exactly this, and the entrance is `--motion-toast`, collapsed under `prefers-reduced-motion`.
 */
import { useCallback, useEffect, useRef, useState } from 'react';
import styles from './Toast.module.css';

/**
 * How long a message stays, from the prototype's `setToast` (design/Rung App v3.3.dc.html): long
 * enough to read one line twice, short enough that it is gone before the next tap.
 */
export const TOAST_DURATION_MS = 2800;

export interface ToastHandle {
  /** What is on screen, or `null` — hand it straight to `<Toast>`. */
  message: string | null;
  /** Shows a message (already interpolated), replacing any message still up. */
  show: (message: string) => void;
  /** Clears it early. The timer does this on its own; a screen rarely needs to. */
  dismiss: () => void;
}

/**
 * The timer half. Kept a hook rather than a provider because a toast belongs to the screen that
 * raised it: nothing else needs to read it, and a global one is how two screens end up arguing
 * about whose message is showing.
 */
export function useToast(duration = TOAST_DURATION_MS): ToastHandle {
  const [message, setMessage] = useState<string | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clear = useCallback(() => {
    if (timer.current !== null) clearTimeout(timer.current);
    timer.current = null;
  }, []);

  // An unmount mid-toast (a tab change) must not leave a timer pointing at a dead component.
  useEffect(() => clear, [clear]);

  const show = useCallback(
    (next: string) => {
      clear();
      setMessage(next);
      timer.current = setTimeout(() => setMessage(null), duration);
    },
    [clear, duration],
  );

  const dismiss = useCallback(() => {
    clear();
    setMessage(null);
  }, [clear]);

  return { message, show, dismiss };
}

interface ToastProps {
  /** The line to show, or `null` for the resting state. */
  message: string | null;
  /** The course's writing direction — a toast is course copy, so it reads the course's way. */
  dir?: string;
}

/** The rendered half: a polite live region, and inside it the message when there is one. */
export function Toast({ message, dir }: ToastProps) {
  return (
    <div className={styles.region} role="status" aria-live="polite">
      {message !== null && (
        <p className={styles.toast} dir={dir}>
          {message}
        </p>
      )}
    </div>
  );
}
