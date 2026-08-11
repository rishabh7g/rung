/**
 * The comprehension test's draw (#102; PRD §8 F5, PRD-design §6.6 flow 6) — which pool items an
 * attempt serves, and what a retry is allowed to deal again.
 *
 * The rule is two lines of the PRD and this file is those two lines:
 *
 *   • **No repeats within a test** — an attempt never shows the same item twice.
 *   • **A retry excludes everything already used, until the pool exhausts — then it recycles.**
 *     Unlimited attempts, and the acceptance criterion is arithmetic: a pool of 6 supports
 *     **≥ 3 fresh attempts before recycling** (6 items, 2 an attempt), which is exactly why
 *     `tools/validate.ts` makes 6 the authored floor (`POOL_MIN`).
 *
 * **Recycling still never repeats the round just played.** When the pool has run out, the draw
 * excludes the attempt the learner just failed rather than the whole history — dealing back the
 * very two sentences that went wrong would read as the app marking them, and the point of the
 * retry is that nothing is being counted. That is the prototype's own fallback
 * (design/Rung App v3.3.dc.html → `pickComp`), and it is the only thing "recycle" is allowed to
 * mean here.
 *
 * **Nothing about a failed attempt is remembered anywhere else** (Invariant 4). `used` is a list
 * of ids the caller carries for the length of one visit to the screen — it is not a score, it
 * never reaches the store, and there is deliberately no count of attempts in this module to
 * reach for: the screen cannot render a failure counter it has no number for.
 *
 * `src/engine/` is pure TypeScript — no React, no storage, no clock (docs/01-plan.md §3) — so the
 * one impure thing a random draw needs arrives as an argument, exactly as a date does
 * (`state/clock.ts`). Injecting it is what makes the retry algorithm testable at all: the tests
 * hand it a fixed sequence and assert the ids, rather than shuffling until they get lucky.
 */

/** Where the chance comes from: `Math.random`'s contract, `[0, 1)`. Injected, never imported. */
export type Random = () => number;

export interface DrawInput {
  /** The module's comprehension pool, as ids — `comprehensionPool.map(item => item.id)`. */
  pool: readonly string[];
  /**
   * Every id dealt so far in this test, oldest first, INCLUDING the attempt on screen. The last
   * `count` of them are the attempt just played, which recycling protects.
   */
  used: readonly string[];
  /** How many items an attempt serves — the module's own `exitTest.comprehendCount` (2). */
  count: number;
  /** Defaults to `Math.random`; tests pass their own sequence. */
  random?: Random;
}

/**
 * The items for one attempt: `count` distinct ids, fresh if the pool still has them.
 *
 * Fewer than `count` come back only when the pool itself is smaller than an attempt (the dev
 * fixtures' two-item pools) — the caller renders what it is given rather than padding it with a
 * repeat, because a repeat inside one attempt is the one thing the PRD names.
 */
export function drawItems({ pool, used, count, random = Math.random }: DrawInput): string[] {
  const seen = new Set(used);
  const unused = pool.filter((id) => !seen.has(id));

  // The ordinary case: the pool still holds a whole attempt nobody has seen.
  if (unused.length >= count) return sample(unused, count, random);

  // Exhausted — recycle, minus the attempt just played (see the header).
  const justPlayed = new Set(used.slice(-count));
  const recyclable = pool.filter((id) => !justPlayed.has(id));

  return sample(recyclable.length >= count ? recyclable : pool, count, random);
}

/**
 * `count` distinct members of `candidates`, uniformly drawn — a splice-as-you-go selection, so
 * an id cannot be picked twice however the random source behaves, and the caller's array is never
 * reordered. (`sort(() => Math.random() - 0.5)`, which the prototype uses, is neither uniform nor
 * a guarantee of anything; here the draw is the correctness argument, not the shuffle.)
 */
function sample(candidates: readonly string[], count: number, random: Random): string[] {
  const rest = [...candidates];
  const picked: string[] = [];

  while (picked.length < count && rest.length > 0) {
    const [item] = rest.splice(Math.floor(random() * rest.length), 1);
    if (item !== undefined) picked.push(item);
  }

  return picked;
}
