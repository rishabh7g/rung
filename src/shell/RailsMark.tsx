/**
 * The rails mark (#84) — two rails, three rungs, the middle one solid accent: "you are here"
 * (PRD-design §9 [P1, D15]). Drawn in the blueprint grammar: hairline 1.5, square corners, no
 * rounding, no fill but the one accent bar.
 *
 * The geometry is the ticket's verbatim SVG and is not to be redrawn here — the formal mark
 * spec is #69 and the app icons are #115; this is the buildable version they will replace. The
 * only additions are a `className`, so the size comes from `--brand-mark` rather than from the
 * width/height attributes it also carries, and `focusable="false"` for IE-era screen readers.
 *
 * `currentColor` on the rails is deliberate: the mark takes the colour of whatever chrome it
 * sits in, and only the middle rung is ever accent.
 */
interface RailsMarkProps {
  className?: string;
}

export function RailsMark({ className }: RailsMarkProps) {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <line x1="6" y1="2" x2="6" y2="18" stroke="currentColor" strokeWidth="1.5" />
      <line x1="14" y1="2" x2="14" y2="18" stroke="currentColor" strokeWidth="1.5" />
      <line x1="6" y1="5.5" x2="14" y2="5.5" stroke="currentColor" strokeWidth="1.5" />
      <rect x="6" y="9.25" width="8" height="1.5" fill="var(--color-accent)" />
      <line x1="6" y1="14.5" x2="14" y2="14.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
