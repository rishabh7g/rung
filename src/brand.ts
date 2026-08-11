/**
 * The ONE place the product name lives (design/PRD-engineering.md §10 [P1]).
 * Titles, the PWA manifest, export filenames — everything imports this.
 * Never hardcode the name anywhere else.
 */
export const BRAND = 'rung';
