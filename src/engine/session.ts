/**
 * The session plan (#386) — every card one Practice session serves, decided once, before the
 * first card (PRD §8 F3).
 *
 * **A session is ONE list.** The learner is shown an L1 cue, guesses the sentence in the language
 * they are learning, reveals, and self-marks — fifteen times, and then the session is over. There
 * is no phase, no second section, and nothing on a card but the mark. This module answers what is
 * in that list and in what order, and nothing else — the store owns when it runs and what it
 * writes (`startSession`), the screen owns what it looks like (`screens/practice/Session.tsx`).
 *
 * **It used to be two queues, and the shape of the screen followed the shape of this file.** Review
 * served up to five due cards and then "Read" walked the rung with a pager, a cue toggle and no
 * cue on screen — two sections, two chips, two things a learner had to understand before the first
 * card. #388 retired that; this module is where the retirement is decided, because a plan with one
 * list cannot be rendered as two phases.
 *
 * `src/engine/` is pure TypeScript: no React, no storage, no clock (docs/01-plan.md §3). The same
 * input always produces the identical output, which is what lets the Practice hub PREVIEW a
 * session — "15 sentences" — by planning against the queue the session is about to tick, and be
 * certain the hub cannot promise a length the session will not serve. One function, two callers,
 * no second implementation to drift.
 *
 * **The plan is taken once, at session start, and then it is the session's.** Marks move boxes and
 * countdowns as they land (`applyMark`), so re-deriving the list mid-session would quietly drop
 * the cards already marked and change the position under the learner. `#99`'s lossless resume
 * rests on the same fact: what is snapshotted is a plan that was made, not one that will be
 * remade.
 */
import { reviewPicks, type ReviewItem } from './leitner.ts';

/**
 * How many cards one session serves — **15**, always, whatever the ladder holds.
 *
 * A fixed number is the point. A session whose length depends on how much happens to be due is a
 * session the learner cannot plan around, and "how long is this?" was one of the questions the old
 * two-section Practice could not answer. Fifteen is the rung (ten sentences in every shipped
 * module) plus a third again of earlier material.
 */
export const CARDS_PER_SESSION = 15;

/**
 * How many of those fifteen come from EARLIER rungs — at most **5** (PRD §8 F4). The rest are the
 * rung the learner is climbing, and the rung is never trimmed: the exit gate needs every one of
 * its sentences served (`engine/exit.ts`).
 *
 * `leitner.ts` decides WHICH five. This is only how many.
 */
export const REVIEWS_PER_SESSION = 5;

/** What a plan is made of. */
export interface SessionPlanInput {
  /**
   * The course's review queue **after** the session's tick (`tickSession`) — the store ticks
   * first and plans against the result, so "due" means due in the session about to run.
   */
  queue: readonly ReviewItem[];
  /** The current rung's sentence ids, in the module's own order. Empty when no rung is current. */
  rungIds: readonly string[];
}

/** The session's cards, in serving order. */
export interface SessionPlan {
  /** Every card this session serves. `CARDS_PER_SESSION` of them whenever the rung has content. */
  cardIds: string[];
}

/**
 * The session's cards (PRD §8 F3).
 *
 * Three steps, in this order, and the order is the whole of the design:
 *
 *   1. **The rung, whole, in the module's own order.** Ten sentences in every shipped module.
 *      Never trimmed and never reordered — the module teaches them in that sequence, and the exit
 *      ritual opens on having marked all of them.
 *   2. **Up to five from earlier rungs**, chosen by `reviewPicks` — due first, in the scheduler's
 *      urgency order, then the closest-to-due if fewer than five are actually due. The top-up is
 *      what makes the count fixed rather than "however much the queue happened to owe today", and
 *      an early review costs the learner nothing: a got-it promotes the box either way.
 *   3. **Interleaved**, one earlier-rung card after every two rung cards:
 *      `R R P R R P R R P R R P R R P`. Not five old cards and then ten new ones — that is two
 *      sections with the labels taken off, and this session has one.
 *
 * And then **padded to fifteen** if the ladder simply does not hold fifteen distinct cards yet: on
 * the very first rung nothing has been passed, so there is nothing earlier to serve, and the last
 * five slots repeat the rung from its first sentence. A repeat lands at least ten cards after its
 * original, which is far enough to be a second attempt rather than an echo. Marking is idempotent
 * (`screens/practice/Session.tsx`), so a repeat costs the exit gate nothing.
 *
 * A rung id that somehow also sits in the review queue is served once, in its rung position.
 * Enrolment happens at pass (`leitner.ts`), so the current rung is never enrolled — but an
 * imported queue (PRD §8 F7) can carry anything, and a card served twice in one session because
 * two lists both claimed it is not a thing this function will do.
 *
 * With no current rung — the ladder complete — there is nothing to pad from, so the session is
 * whatever the queue offers. The hub does not offer that session; this function still answers.
 */
export function planSession({ queue, rungIds }: SessionPlanInput): SessionPlan {
  const rung = unique(rungIds);
  const inRung = new Set(rung);

  const room = Math.max(0, CARDS_PER_SESSION - rung.length);
  // The rung is taken out of the queue BEFORE the picks are counted, not after: filtering
  // afterwards would spend one of the five slots on a card that is then dropped, and serve four.
  const earlier = queue.filter((item) => !inRung.has(item.sentenceId));
  const past = reviewPicks(earlier, Math.min(REVIEWS_PER_SESSION, room)).map(
    (item) => item.sentenceId,
  );

  return { cardIds: pad(interleave(rung, past), rung) };
}

/**
 * One `past` card after every two `rung` cards, both lists in the order they arrived. Whichever
 * list outlasts the other simply finishes: three past cards against ten rung cards puts them at
 * slots 3, 6 and 9 and leaves the tail as rung cards, which is the honest answer rather than
 * bunching them at the end.
 */
function interleave(rung: readonly string[], past: readonly string[]): string[] {
  const cards: string[] = [];
  let next = 0;

  for (const [index, sentenceId] of rung.entries()) {
    cards.push(sentenceId);
    if ((index + 1) % 2 === 0 && next < past.length) {
      cards.push(past[next] as string);
      next += 1;
    }
  }

  // Anything the interleave could not place — a rung shorter than twice the past list — goes on
  // the end rather than being dropped. A dropped card is a card the hub promised and the session
  // never served.
  return [...cards, ...past.slice(next)];
}

/**
 * Up to `CARDS_PER_SESSION`, repeating the rung from its first sentence. A rung with no sentences
 * pads to nothing: there is no material to repeat, and inventing some is not this module's job.
 */
function pad(cards: readonly string[], rung: readonly string[]): string[] {
  if (rung.length === 0) return [...cards];

  const padded = [...cards];
  for (let index = 0; padded.length < CARDS_PER_SESSION; index += 1) {
    padded.push(rung[index % rung.length] as string);
  }
  return padded;
}

/** First occurrence wins, order kept. */
function unique(ids: readonly string[]): string[] {
  return [...new Set(ids)];
}
