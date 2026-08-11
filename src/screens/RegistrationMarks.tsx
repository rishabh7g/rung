/**
 * The four `+` registration marks (design/tokens.md §3) — the blueprint grammar's signature, and
 * "never dropped" (§7 rule 3). Each is the same crosshair the current-rung marker draws, centred
 * on a corner of its parent so it straddles the hairline.
 *
 * It lives here, beside the screens rather than inside one, because the prototype's every
 * blueprint object wears them: the rung card (#87), the module list's sentence cards (#88), and
 * the reveal cards, plates and rows still to come. The parent supplies the frame and
 * `position: relative`; this supplies the corners.
 *
 * `aria-hidden`, and drawn rather than bordered: they are decoration in the strictest sense —
 * nothing about an object's state is in them, and the size and ink come from tokens in the
 * stylesheet rather than from attributes here (docs/design-contract.md rule 1).
 */
import styles from './RegistrationMarks.module.css';

const CORNERS = [
  styles.markTopLeft,
  styles.markTopRight,
  styles.markBottomLeft,
  styles.markBottomRight,
];

export function RegistrationMarks() {
  return (
    <>
      {CORNERS.map((corner) => (
        <svg
          key={corner}
          className={corner}
          viewBox="0 0 16 16"
          aria-hidden="true"
          focusable="false"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path className={styles.markLine} d="M8 0v16M0 8h16" />
        </svg>
      ))}
    </>
  );
}
