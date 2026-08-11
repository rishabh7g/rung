/**
 * The three rung markers [D16] (#86) — the whole of what a rung's state looks like on the Ladder
 * (PRD-design §7; design/tokens.md §6 "Rung markers").
 *
 *   passed  → accent-600 filled circle with a check cut out of it in the ground colour
 *   current → an accent crosshair: the blueprint's registration mark, "you are here"
 *   locked  → a hollow neutral-500 circle (the row around it drops to 50% opacity)
 *
 * The geometry is the prototype's, redrawn as one component instead of three inline SVGs, and the
 * square that carries it is `--icon-ui` so a marker sits on the rail line at the row's left edge
 * and masks it with `--color-bg` — which is why the fills live in the stylesheet rather than in
 * `fill=` attributes: the design contract is "no hard-coded value in a component", and a token in
 * a CSS class is the only place `src/styleContract.test.ts` can check.
 *
 * It is `aria-hidden`: the state it draws is already in the row's text ("passed") or its shape (a
 * locked row is not a link), and a screen reader announcing "image" three times per rung is noise.
 */
import styles from './RungMarker.module.css';

export type MarkerState = 'passed' | 'current' | 'locked';

interface RungMarkerProps {
  state: MarkerState;
}

export function RungMarker({ state }: RungMarkerProps) {
  return (
    <svg
      viewBox="0 0 19 19"
      className={styles.marker}
      aria-hidden="true"
      focusable="false"
      xmlns="http://www.w3.org/2000/svg"
    >
      {state === 'passed' && (
        <>
          <circle cx="9.5" cy="9.5" r="8.5" className={styles.disc} />
          <path d="M5.5 9.8l2.6 2.6 5.4-5.6" className={styles.check} />
        </>
      )}
      {state === 'current' && <path d="M9.5 0v19M0 9.5h19" className={styles.crosshair} />}
      {state === 'locked' && <circle cx="9.5" cy="9.5" r="8.5" className={styles.ring} />}
    </svg>
  );
}
