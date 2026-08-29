/**
 * The exit ritual's press-and-hold confirmation (#101; PRD §8 F5 [D14], PRD-design §6.5 flow 5,
 * design/tokens.md §5, design/pwa-checklist.md §1) — step 3 of the arc, and the one control in
 * the product whose **cost is the feature**.
 *
 * Everything else in this app is one tap. This is ~900 ms of held finger, and the weight is the
 * whole point: the learner is signing that they wrote the 11th sentence and checked it themselves,
 * outside the app, and nothing in here can verify a word of that (Invariant 4). What the control
 * can do is make the claim take a deliberate moment — **no tap-through past the hold** is the
 * ticket's acceptance criterion, and the reference of record's own caption is "This is the
 * signature. Hold it down — no tap-through."
 *
 * **The duration lives in JavaScript, not in CSS, and that is the security of it.** A fill driven
 * by a CSS transition would finish when the browser says it finished — and under
 * `prefers-reduced-motion`, where design/tokens.md §5 collapses every animation to 0.01ms, that
 * would be instantly. So the timer is the gate: 30 steps of `--motion-hold-step` (30ms), and the
 * ✓ is emitted by the 30th, whatever the stylesheet is doing. Reduced motion drops the glide
 * between steps and nothing else — the hold still takes ~900ms, and a tap still does nothing.
 * (`setInterval` can only run LATE, never early, so the real hold is ≥ 900ms on a busy phone.)
 *
 * **Release resets to 0** — `pointerup`, `pointerleave` and `pointercancel` alike, and the next
 * press starts from empty. Half a hold is not banked, because half a signature is not one.
 *
 * **This is the ritual flow's first and only state cell.** `RitualScreen.tsx` deliberately holds
 * none (#100: a source scan fails it on the React state hooks, so the learner's sentence has
 * nowhere to live, not even for one render), and the same scan runs over THIS file for everything
 * except the state cell: no field, no text-input handler, no read of the system copy buffer, no
 * form, no storage write. What is kept here is a number between 0 and 1 that says how full a bar
 * is — it is not learner writing, it never leaves the component, and it dies with the screen.
 *
 * **Pointer Events, and only Pointer Events** (`design/pwa-checklist.md` §1): one code path for
 * mouse, touch and pen, with `touch-action: none` on the control so a hold on a scrolling screen
 * is a hold and never a scroll. Touch input gets *implicit pointer capture* from the browser, so a
 * finger that slides off the control keeps filling until it lifts — the reference of record
 * behaves the same way, and the weight is paid either way; `pointerleave` is what resets a mouse
 * that wanders off mid-press.
 */
import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { Check } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { interpolate, useStrings } from '../course/strings.ts';
import { COMPREHENSION_PATH, handover } from '../shell/routes.tsx';
import styles from './HoldToConfirm.module.css';

/**
 * `--motion-hold-total` [D14] — stated as `~900ms` in `design/tokens.css`, which is prose rather
 * than a CSS time (the tilde makes it unusable in a declaration), and this is a gate rather than
 * an animation anyway. So the number is written once, here, and the stylesheet never sees it.
 */
const HOLD_TOTAL_MS = 900;

/** `--motion-hold-step` — the design package's sampling cadence for the fill. */
const HOLD_STEP_MS = 30;

/**
 * How long the ✓ stands before the hold carries the learner into part 2 (#314).
 *
 * The hold used to end on a second control — a ✓, and a link to tap. But the hold IS the
 * intentional act: ~900ms of held finger with no tap-through is the most deliberate thing in the
 * product, and asking for a tap to confirm it is asking the learner to agree with themselves. So
 * the ✓ lands, is read, and the arc moves.
 *
 * It is a beat, not a delay to sit through: long enough that the signature registers as having
 * been paid rather than the screen jumping out from under the finger that paid it.
 */
export const SIGNED_BEAT_MS = 700;

/**
 * 30 steps. design/tokens.md §5 says "0.04 per 30ms step" *and* "~900ms total", which cannot both
 * be true — 0.04 a step fills in 750ms, and the prototype's fill is indeed full 150ms before the
 * duration [D14] names. The DURATION is the requirement (PRD §8 F5's AC is about the hold, not
 * about the bar), so the increment follows it: 1/30 a step, and the bar reaches full exactly as
 * the hold completes rather than sitting full waiting for it. Recorded on #117 with the rest of
 * the fidelity notes.
 */
const HOLD_STEPS = HOLD_TOTAL_MS / HOLD_STEP_MS;

interface HoldToConfirmProps {
  /**
   * The course's own word for "the 11th" — the head's ordinal, passed down so the label and the
   * title cannot disagree about which sentence this is.
   */
  ordinal: string;
  /**
   * Fired ONCE, when the hold completes. The control has already shown the ✓ and the way on by
   * then; this is the hand-over for the screens that come after (#102's guard, #103's pass).
   */
  onConfirm?: () => void;
  /** The course's writing direction — the label and the ✓ line are its words. */
  dir?: string;
}

export function HoldToConfirm({ ordinal, onConfirm, dir }: HoldToConfirmProps) {
  const strings = useStrings();
  const navigate = useNavigate();
  /**
   * How full the bar is, 0 → 1 — and 1 IS the confirmation. One cell rather than a `progress` and
   * a `confirmed` that could drift apart: the control is signed exactly when the bar is full.
   */
  const [progress, setProgress] = useState(0);
  /** The running hold, so a release can stop it. Null whenever no finger is down. */
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  function stop(): void {
    if (timer.current === null) return;
    clearInterval(timer.current);
    timer.current = null;
  }

  // A hold does not survive the screen: leaving mid-press clears the timer rather than letting it
  // tick on against an unmounted component.
  useEffect(() => stop, []);

  /**
   * **The signed hold carries the learner into part 2** (#314) — the arc's hand-over, made by the
   * hold itself rather than by a link the learner must also find and tap.
   *
   * `state` is the hand-over token, and it is the whole of #102's guard: part 2 is only reachable
   * from a hold that was actually paid, and the proof travels in the history entry rather than in
   * a flag someone has to remember to clear (`shell/routes.tsx`). It is a literal, so this file
   * still keeps nothing about the learner — the navigation carries no more than the `<Link>` it
   * replaced.
   *
   * `replace` is deliberately NOT used: the arc is where a learner who backs out of Comprehension
   * belongs, and part 2's own guard sends a token-less arrival there anyway.
   */
  useEffect(() => {
    if (progress !== 1) return;

    const beat = setTimeout(() => {
      void navigate(COMPREHENSION_PATH, { state: handover('hold') });
    }, SIGNED_BEAT_MS);

    return () => clearTimeout(beat);
  }, [navigate, progress]);

  function start(): void {
    // Ignore a second pointer landing on a hold that is already running: two fingers are not
    // faster than one.
    if (timer.current !== null) return;

    let step = 0;
    timer.current = setInterval(() => {
      step += 1;
      if (step < HOLD_STEPS) {
        setProgress(step / HOLD_STEPS);
        return;
      }
      // The last step: stop first, so the interval cannot fire again, then emit exactly once.
      stop();
      setProgress(1);
      onConfirm?.();
    }, HOLD_STEP_MS);
  }

  /** Every way a press can end short of the ✓: the bar goes back to empty, and nothing is kept. */
  function release(): void {
    stop();
    setProgress(0);
  }

  if (progress === 1) {
    return (
      // `data-hold="signed"` is how the arc's step badge fills once this is paid (the prototype
      // switches step 3's number to solid accent). It is read by a `:has()` rule in
      // `RitualScreen.module.css` rather than by a variable, so the screen still knows nothing —
      // the DOM says it, which is the only place the fact lives.
      //
      // The ✓ is the whole of the signed state since #314: the effect above is what goes on to
      // part 2, so there is nothing here to tap and nothing to decide.
      <div className={styles.signed} data-hold="signed">
        <p className={styles.signedRow} dir={dir}>
          <Check className={styles.signedIcon} aria-hidden="true" />
          <span>{strings['ritual.confirm.done']}</span>
        </p>
      </div>
    );
  }

  return (
    <button
      type="button"
      className={styles.control}
      // The fill's scale is a measurement, not a design value — the same division of labour the
      // elapsed tick makes (#98), so every length in the stylesheet stays a token.
      style={{ '--hold-progress': progress } as CSSProperties}
      onPointerDown={start}
      onPointerUp={release}
      onPointerLeave={release}
      onPointerCancel={release}
      dir={dir}
    >
      <span className={styles.fill} aria-hidden="true" />
      <span className={styles.label}>
        {interpolate(strings['ritual.confirm.holdLabel'], { ordinal })}
      </span>
    </button>
  );
}
