/**
 * The ladder, loaded and derived — the two lines every screen that asks a progression question
 * starts with (#86, #88; PRD §8 F1).
 *
 * It does three things, in the order they have to happen:
 *
 *   1. **Loads the course's `levels.json`** (`useLevels`, #81) — the ladder is content, and a
 *      build's ladder is whatever that build shipped.
 *   2. **Hands it to the store**, once it resolves. The store holds a course's ladder as content
 *      and never persists it, and until it has one `passRung` has no rung to check against, so
 *      nothing can pass (`state/store.ts`). This is the write that makes the ladder climbable,
 *      and it is an effect because it is a write.
 *   3. **Assembles the engine's input** out of what the store then holds — the very
 *      `progressionInput` `passRung` guards with, so a count on a screen and a rule in that
 *      action cannot disagree: they are one derivation. There used to be a fourth step here,
 *      joining on `exitAvailable` (#95) — a fact half of which is content, and which the engine
 *      therefore took injected. Nothing is gated on the counters any more (the exit ritual they
 *      opened is gone; a rung is climbed by finishing a Practice session), so the input is
 *      whole and there is no injection point left to get wrong.
 *
 * It exists as a hook rather than as three copies because the Ladder is no longer the only screen
 * that needs it: the module list guards its route on `deriveStatuses` (#88), and a deep link
 * (`#/module/L1-M1` — the app is a HashRouter PWA, so that is a real entry point) reaches that
 * screen with the Ladder never having mounted. A second copy of steps 1–3 is a second chance for
 * one of them to drift.
 */
import { useEffect, useMemo } from 'react';
import { useCourse } from '../course/CourseProvider.tsx';
import { useLevels, type AsyncContent } from '../course/content.ts';
import type { Levels } from '../course/types.ts';
import { ladderFromLevels, type ProgressionInput } from '../engine/progression.ts';
import { progressionInput, useAppStore } from '../state/store.ts';

export interface Progression {
  /** The raw ladder, for the screens that render its names and taglines. */
  levels: AsyncContent<Levels>;
  /** What `deriveStatuses`, `currentRungId`, `levelSealed` and `rungStage` read. */
  input: ProgressionInput;
  /**
   * The ladder has loaded **and** reached the store. Nothing derived is honest before that: an
   * empty input describes a finished ladder, not a loading one.
   */
  ready: boolean;
}

export function useProgression(): Progression {
  const { course } = useCourse();
  const levels = useLevels();
  const setLadder = useAppStore((store) => store.setLadder);
  const state = useAppStore();

  /** `levels.json` in the engine's shape. Memoised so the effect below writes once per load. */
  const ladder = useMemo(
    () => (levels.data === null ? null : ladderFromLevels(levels.data.levels)),
    [levels.data],
  );

  useEffect(() => {
    if (ladder !== null) setLadder(course.id, ladder);
  }, [course.id, ladder, setLadder]);

  const input = useMemo(() => progressionInput(state, course.id), [state, course.id]);

  return { levels, input, ready: input.levels.length > 0 };
}
