/**
 * The show-once hints (#319) — the three facts the product runs on, said once each and then never
 * again.
 *
 * **Why there is anything here at all.** #225–#233 stripped the app's instructional copy on a
 * sound argument: a line that never changes is read once and skimmed thirty times, and a product
 * whose screens are mostly explanation is a product that does not trust its own shapes. But the
 * app also has no onboarding by design ([D21]: first run lands on the Ladder), and the two
 * decisions together left a first-run learner told none of the things the product is built on —
 * that the recall happens outside the app, that two writes per sentence open a rung's exit ritual,
 * that the checking in the ritual is theirs. The shapes say it eventually; nothing said it once.
 *
 * A hint is the resolution of that: it renders on its surface the first time that surface is used,
 * and never again on this install. The thirty-first session is exactly the clean screen #225 asked
 * for, because the thirty-first session has already seen it.
 *
 * **This is not progress, so it is not in the store** — the call `moduleView` makes (#88), for its
 * reason. `src/state/` is one persisted document whose shape is the export contract (#82, PRD §8
 * F7): everything in it is something the learner EARNED and would want back on a new device.
 * "Has this person seen a sentence of copy" is not that. It must never ride along in an export, it
 * means nothing on another device, and a learner restoring a backup onto a fresh phone is a
 * first-run learner again — which is the right answer, not a bug.
 *
 * So it lives in **`localStorage`**: this install, until the app's data is cleared. That is a
 * longer lifetime than `moduleView`'s `sessionStorage`, and deliberately — a hint that came back
 * every time a tab was closed would be the always-on copy #225 removed, arriving one session at a
 * time.
 *
 * **Not per course.** A course switch does not make the learner new (Invariant 8 keeps PROGRESS
 * per course, and this is not progress): someone who has learned that the recall happens outside
 * the app has learned it, whatever language they go on to study.
 *
 * Every access is wrapped, exactly as `moduleView`'s is: `localStorage` throws on access in a
 * locked-down browser (Safari's private mode, an embedded webview with storage disabled), and a
 * screen that cannot remember whether it has shown a hint must still render. **A failed read is
 * "not yet seen"**, which shows the hint again rather than swallowing it — the honest failure for
 * copy whose whole job is to be seen once is to be seen twice, never zero times.
 */

/**
 * The hints, one per surface. The values are the `hint.*` keys they render.
 *
 * There were three until #348. `check` belonged to the exit ritual's deliberately empty check
 * step — the one that told a first-run learner the checking was theirs to do, outside the app —
 * and that step went with the whole write half of the ritual when the product retired notebook
 * writing. A hint whose surface no longer exists is a key nothing can render.
 */
export type Hint = 'recall' | 'production';

/**
 * `rung:hint:<name>` — its own namespace beside the store's `rung:state` and the module view's
 * `rung:module-view:*`, so it is obvious at a glance in devtools that this key is not progress.
 */
export function hintKey(hint: Hint): string {
  return `rung:hint:${hint}`;
}

/** Has this hint been shown on this install? A browser that will not answer says no. */
export function hintSeen(hint: Hint): boolean {
  try {
    return localStorage.getItem(hintKey(hint)) !== null;
  } catch {
    return false;
  }
}

/** Remember that it has. A browser that will not remember costs the learner one repeat, no more. */
export function markHintSeen(hint: Hint): void {
  try {
    localStorage.setItem(hintKey(hint), '1');
  } catch {
    /* A hint that cannot be remembered is shown again. That is the whole cost. */
  }
}
