/**
 * The clock (#82) — the ONE place in the app that constructs a date (docs/01-plan.md §6).
 *
 * Two rules meet here. The engine is pure: progression, the Leitner scheduler and the word-index
 * resolver take their inputs and return values, so they can be tested without a fake timer and
 * cannot drift a learner's ladder by running at midnight. And the product has no calendar
 * (Invariant 2): nothing is due on a day, streaks do not exist, and the only sanctioned time
 * affordance is the numberless elapsed tick. What is left is one receipt — `passedAt` on a
 * passed module — and it is stamped here, at the store layer, on the way into state.
 *
 * So the discipline is mechanical rather than remembered: `clock.test.ts` scans every shipped
 * file under `src/` and fails if a date is constructed anywhere but in this file. When an action
 * needs a timestamp, it takes a `Clock` and defaults to `systemClock` — which is also how a test
 * pins one without touching global time.
 */

/** A source of ISO-8601 instants. Injected, so a test can hand over a fixed one. */
export type Clock = () => string;

/** The wall clock, in UTC: `2026-08-11T09:41:07.281Z`. The app's only date construction. */
export const systemClock: Clock = () => new Date().toISOString();
