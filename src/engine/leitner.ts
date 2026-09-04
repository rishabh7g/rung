/**
 * The Leitner scheduler (#92) — spaced review counted in SESSIONS, never in days (PRD §8 F4;
 * Invariant 2, docs/01-plan.md §2).
 *
 * Three boxes and one clock the learner controls: an item's `dueInSessions` falls by one each time
 * a session STARTS, and by nothing at all in between. A learner who comes back after three weeks
 * away owes exactly what they owed before — the queue is where they left it, no backlog, no debt,
 * no red number for the days they missed. That is the whole reason this module has no calendar in
 * it: measure review in days and the app acquires an opinion about how often someone should study,
 * which is the one thing this product refuses to have.
 *
 * `src/engine/` is pure TypeScript: no React, no storage, no clock (docs/01-plan.md §3). Every
 * function here takes a queue and returns a NEW array — nothing is mutated, nothing is read from
 * outside its arguments, and the same input always produces the identical output. The store owns
 * when these run and what gets persisted (#96, #103); this module owns only what the answer is.
 *
 * **Enrolment policy — a sentence enters review when its module is PASSED.** Production ends,
 * maintenance begins: while a module is the current rung, Practice already serves every one of its
 * sentences each session (`engine/session.ts`), so scheduling them for review as well would be the
 * same work twice under two names. Passing the module is the moment the sentences stop being
 * something to learn and start being something to keep. The call itself lives in the exit ritual's
 * pass action (#103, `completeRitual`) — this module states the policy and implements `enrol`;
 * it wires nothing.
 */

/**
 * One scheduled review. Structurally identical to state v6's `ReviewItem` (`src/state/types.ts`,
 * PRD §8 F7), and declared here rather than imported for the same reason `progression.ts` declares
 * its own ladder shape: the engine is the layer everything else depends on, so it imports from
 * none of them. A persisted queue passes straight in; `leitner.test.ts` pins that.
 */
export interface ReviewItem {
  sentenceId: string;
  /** Leitner box. An item enters at 1, and there is no box 0 and no box 4. */
  box: 1 | 2 | 3;
  /** Sessions until this item is due again. `<= 0` is due now. */
  dueInSessions: number;
}

/**
 * How long a correct recall buys, per box: 1 → 3 → 7 sessions (PRD §8 F4). Sessions, not days —
 * "7" is the seventh time the learner opens Practice, whenever that happens to be.
 */
export const BOX_INTERVALS = { 1: 1, 2: 3, 3: 7 } as const;

/**
 * Where a got-it sends an item. A table rather than `min(box + 1, 3)` so the ceiling is visible:
 * box 3 promotes to itself, because 7 sessions is as far as this scheduler ever schedules.
 */
const PROMOTED = { 1: 2, 2: 3, 3: 3 } as const;

/**
 * One session's worth of time passing: every item comes one session closer to due, floored at 0.
 * Called ONCE at session start (#96) — `startSession`'s tick, and no other caller's.
 *
 * The floor is what keeps a long absence from becoming a punishment: an item due while the learner
 * was away sits at 0 and waits, rather than sinking to -40 and turning the next session into a
 * backlog of forty things. Everything that comes due while nobody is looking is equally due, and
 * `dueItems` serves at most a handful of it.
 */
export function tickSession(queue: readonly ReviewItem[]): ReviewItem[] {
  return queue.map((item) => ({ ...item, dueInSessions: Math.max(0, item.dueInSessions - 1) }));
}

/**
 * What is actually DUE, most urgent first, capped at `max`. The session asks for at most five of
 * these (`engine/session.ts`) — earlier material is a third of a session, not the session.
 *
 * The order is fixed by PRD §8 F4 — "strictly by due-ness, then module recency":
 *
 *   1. **Most overdue first.** Lowest `dueInSessions`, so -2 precedes -1 precedes 0. `tickSession`
 *      floors at 0, so a queue this app produced has every due item sitting at exactly 0 and the
 *      tie-breaks below do the real work; a queue that arrived by import (PRD §8 F7) may carry
 *      anything, and it still gets a defined answer.
 *   2. **Higher module first** — the most recently passed material, which is the most fragile.
 *      Across levels, later level first: L2-M1 is newer than L1-M10.
 *   3. **Sentence order within the module** — S01 before S02, the order the module teaches them.
 *
 * The sort runs on `filter`'s fresh array, so the caller's queue is not reordered.
 */
export function dueItems(queue: readonly ReviewItem[], max = 5): ReviewItem[] {
  return queue
    .filter((item) => item.dueInSessions <= 0)
    .sort(byUrgency)
    .slice(0, Math.max(0, max));
}

/**
 * What one session serves from EARLIER rungs — `max` items, and always `max` of them if the queue
 * holds that many (#386).
 *
 * `dueItems` first, in its own urgency order, and that is the whole of the answer whenever enough
 * is due. When less is due than the session has room for, the rest are the **closest to due** —
 * the same comparator, applied to what is left. That top-up is what makes a session a fixed
 * fifteen cards rather than a length that swings with the queue, and it is deliberately NOT
 * `dueItems` with a softer filter: "due" keeps meaning due, here and in the PRD, and this function
 * is honest that it is reaching past it.
 *
 * An early review costs the learner nothing. A got-it promotes the box and re-schedules from
 * today whether the item was owed or not; a miss returns it to box 1, which is what a sentence you
 * could not recall is worth however early it was asked. The scheduler's shape is unchanged — only
 * the caller's appetite is.
 */
export function reviewPicks(queue: readonly ReviewItem[], max: number): ReviewItem[] {
  const room = Math.max(0, max);
  const picks = dueItems(queue, room);
  if (picks.length >= room) return picks;

  const taken = new Set(picks.map((item) => item.sentenceId));
  const rest = queue
    .filter((item) => !taken.has(item.sentenceId))
    .sort(byUrgency)
    .slice(0, room - picks.length);

  return [...picks, ...rest];
}

/**
 * The self-mark, applied (PRD §8 F4 [D11] — the learner's own green/red, the only judgement in the
 * app):
 *
 *   • **got it** → up one box, capped at 3, due again in that box's interval.
 *   • **missed** → all the way back to box 1, due in 1 session. Not down one box: an item you could
 *     not recall is an item you are learning again, and half a demotion would keep telling you
 *     otherwise for the next three sessions.
 *
 * A `sentenceId` the queue does not hold changes nothing. Only passed rungs are enrolled, and a
 * mark on a sentence of the CURRENT rung belongs to the exit counters instead — `recordProduction`
 * in the store, `exitAvailable` in `engine/exit.ts` (#95) — which are a different number in a
 * different place. The routing is the caller's (`screens/practice/Session.tsx`, #388): an
 * earlier-rung mark comes here and NEVER to the counters, a current-rung got-it goes there and
 * never here.
 */
export function applyMark(
  queue: readonly ReviewItem[],
  sentenceId: string,
  gotIt: boolean,
): ReviewItem[] {
  return queue.map((item) => {
    if (item.sentenceId !== sentenceId) return item;

    const box = gotIt ? PROMOTED[item.box] : 1;
    return { ...item, box, dueInSessions: BOX_INTERVALS[box] };
  });
}

/**
 * Adds sentences to the queue at box 1, due in 1 session — so a module passed today comes back in
 * the NEXT session, not the one it was passed in.
 *
 * Idempotent by construction: an id already in the queue is left exactly as it is, box and
 * countdown intact. That is what makes the call safe from a pass action that may be replayed
 * (#103) — re-enrolling a module the learner passed months ago must never reset its sentences to
 * box 1 and undo the intervening reviews. Order is stable: the existing queue, then the new ids in
 * the order given, duplicates within that list collapsed.
 */
export function enrol(queue: readonly ReviewItem[], sentenceIds: readonly string[]): ReviewItem[] {
  const enrolled = new Set(queue.map((item) => item.sentenceId));
  const added: ReviewItem[] = [];

  for (const sentenceId of sentenceIds) {
    if (enrolled.has(sentenceId)) continue;
    enrolled.add(sentenceId);
    added.push({ sentenceId, box: 1, dueInSessions: BOX_INTERVALS[1] });
  }

  return [...queue, ...added];
}

/* ------------------------------------------------------------------- the order */

/** A sentence id's three numbers. Ids are authored `L1-M2-S03` (module schema v5, §7). */
interface SentencePosition {
  level: number;
  module: number;
  sentence: number;
}

const SENTENCE_ID = /^L(\d+)-M(\d+)-S(\d+)$/;

/** `L1-M2-S03` → `{level: 1, module: 2, sentence: 3}`; `null` for an id in any other shape. */
function position(sentenceId: string): SentencePosition | null {
  const match = SENTENCE_ID.exec(sentenceId);
  if (match === null) return null;

  return { level: Number(match[1]), module: Number(match[2]), sentence: Number(match[3]) };
}

/** Due-ness first, then recency — the full ordering `dueItems` documents. */
function byUrgency(a: ReviewItem, b: ReviewItem): number {
  if (a.dueInSessions !== b.dueInSessions) return a.dueInSessions - b.dueInSessions;
  return byRecency(a.sentenceId, b.sentenceId);
}

/**
 * Newest material first, read NUMERICALLY. The ids are compared as numbers precisely because they
 * do not sort as text: `'L1-M10-S01' < 'L1-M9-S01'` lexicographically, which would file the tenth
 * module — the one just passed — behind the ninth for the rest of the course.
 *
 * An id this parser does not recognise sorts after every id it does, then alphabetically. Neither
 * is a case the content produces; they exist so the comparator is a TOTAL order over distinct ids,
 * which is what makes `dueItems` return the same list whatever order the queue happens to be
 * stored in.
 */
function byRecency(a: string, b: string): number {
  const left = position(a);
  const right = position(b);

  if (left === null || right === null) {
    if (left !== null) return -1;
    if (right !== null) return 1;
    return compareIds(a, b);
  }

  if (left.level !== right.level) return right.level - left.level;
  if (left.module !== right.module) return right.module - left.module;
  if (left.sentence !== right.sentence) return left.sentence - right.sentence;
  return compareIds(a, b);
}

/** Code-unit order, not locale order: the tie-break has to be the same everywhere it runs. */
function compareIds(a: string, b: string): number {
  if (a < b) return -1;
  return a > b ? 1 : 0;
}
