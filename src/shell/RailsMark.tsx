/**
 * The rails mark (#84, ratified #69/#115) — two rails, three rungs, the middle one solid accent:
 * "you are here" (PRD-design §9 [P1, D15]). Drawn in the blueprint grammar: hairline 1.5, butt
 * caps, square corners, no rounding, no fill but the one accent bar.
 *
 * The geometry is the formal construction grid of `design/tokens.md` §6.4 verbatim — a 22-unit
 * square, every coordinate on the half-unit grid: rails at x 5.5/16.5 (y 1 → 21), outer rungs at
 * y 4.5/17.5, and the middle rung the ONE solid object, a 3-unit accent bar deliberately heavier
 * than the hairlines. It is not to be redrawn anywhere else: `tools/make-icons.ts` and
 * `tools/make-splash.ts` read this component's shapes to cut the app icons and the iOS splash
 * set, so this file is the mark's single copy. The only additions over the spec's SVG are a
 * `className`, so the size comes from `--brand-mark` rather than from the width/height
 * attributes it also carries, and `focusable="false"` for IE-era screen readers.
 *
 * `currentColor` on the rails and outer rungs is deliberate: the mark wears the ink of whatever
 * chrome it sits in, and only the middle rung is ever accent — never recolored (§6.4).
 */
interface RailsMarkProps {
  className?: string;
}

export function RailsMark({ className }: RailsMarkProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <line x1="5.5" y1="1" x2="5.5" y2="21" stroke="currentColor" strokeWidth="1.5" />
      <line x1="16.5" y1="1" x2="16.5" y2="21" stroke="currentColor" strokeWidth="1.5" />
      <line x1="5.5" y1="4.5" x2="16.5" y2="4.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="5.5" y="9.5" width="11" height="3" fill="var(--color-accent)" />
      <line x1="5.5" y1="17.5" x2="16.5" y2="17.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
