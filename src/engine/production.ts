/**
 * The production counters, read (#95) — how much of a rung the learner has said back correctly
 * (PRD §8 F1; PRD-design §6.2, §7 [D22]).
 *
 * **This used to be a gate, and it is now a record.** The number answered one question —
 * `exit_available`, "every sentence of the rung self-marked got-it" — and that answer opened the
 * exit ritual, the comprehension test that stood between a worked rung and the next one. The exit
 * ritual is gone: a rung is climbed by finishing a Practice session, on the session's last card
 * (`screens/practice/Session.tsx`). So `exitAvailable` and its `started` complement went with the
 * screens that asked them, and what is left here is the reading the drawings still need — the
 * module list's `n / 10` and the dot per sentence (`screens/module/ProductionDots.tsx`).
 *
 * `src/engine/` is pure TypeScript: no React, no storage, no clock. The counters arrive as an
 * argument — the course's `courses[<id>].production` map — and this file never knows where it
 * came from.
 *
 * **It only reads.** The counters go up in one place, `recordProduction` in `src/state/store.ts`,
 * called by a got-it on a sentence of the current rung and by nothing else.
 *
 * **The action and the persisted map keep the name `production`** even though the phase that named
 * them is long gone. Renaming them would rename a field inside the persisted document
 * (`state/serialize.ts`), which costs either an alias at the serialize boundary or a schema version
 * bump and a migration — a real cost for a word, paid by every learner's stored file.
 */

/**
 * How many self-marked got-its a sentence owes before it counts as read through — **1** (#349).
 *
 * It lives here, with the counters it is about, so the module list's dots and its `n / 10` count
 * cannot drift into disagreeing about what "marked" means.
 */
export const MARKS_PER_SENTENCE = 1;

/** A course's counters as state v6 stores them: `production[sentenceId]` — times marked. */
export type ProductionCounts = Readonly<Record<string, number>>;

/**
 * One sentence's counter, read defensively: `Object.hasOwn` rather than a bare index, because this
 * map arrives from `localStorage` (PRD §8 F7) and a plain-object lookup would otherwise answer for
 * `constructor` and friends. Anything that is not a positive number reads as 0 — a document that
 * came back damaged loses a drawn dot, which is visible, rather than gaining one, which is not.
 *
 * Every reader of the map goes through here, so there is one defensive answer to "how many times
 * has this sentence been marked" rather than a second reader with a second chance to trust a
 * damaged document.
 */
export function producedTimes(production: ProductionCounts, sentenceId: string): number {
  if (!Object.hasOwn(production, sentenceId)) return 0;

  const times = production[sentenceId];
  return typeof times === 'number' && times > 0 ? times : 0;
}

/** Whether a sentence has been marked through — the dot's own question. */
export function marked(production: ProductionCounts, sentenceId: string): boolean {
  return producedTimes(production, sentenceId) >= MARKS_PER_SENTENCE;
}
