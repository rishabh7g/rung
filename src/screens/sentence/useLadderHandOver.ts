/**
 * Where a module's first and last sentences hand over to on the LADDER (#367, #414) — the two
 * neighbours the pager offers when it runs out of module.
 *
 * **Forwards** (`handOverTo`): a module the learner has PASSED is a different situation from the
 * rung they are climbing. The rung they are climbing ends at Practice: reading it is the
 * preparation, and the module list's own closing move is the same link. A module they passed
 * weeks ago ends at the NEXT module, because someone re-reading the ladder from the top is
 * reading, not practising. The old unconditional Practice link got this wrong twice over: it
 * interrupted the read, and since the Practice hub resolves the CURRENT rung rather than the
 * module on screen, a learner re-reading M3 while sitting on M7 was handed M7. "Next" is the
 * ladder's own order, so re-reading M3 offers M4 rather than jumping to the frontier.
 *
 * **Backwards** (`handBackAt`): the leading slot went dead on a module's first sentence because
 * there is genuinely nothing before it INSIDE the module. There is something before it on the
 * LADDER, though, and that is the walk the learner is actually on: someone reading M4 from the top
 * has M3 behind them, and the read continues at M3's LAST sentence. The previous rung by the
 * ladder's own order, so it crosses a level boundary the way forwards does: the first sentence of
 * L2-M1 hands back to the last sentence of L1-M10.
 *
 * Unlike forwards, the destination is NOT built by convention. `<id>-S01` is a first sentence in
 * every course, but a module's last sentence is `-S10` only while every module carries exactly
 * ten — which `tools/validate.ts` requires of shipped content and relaxes for fixtures — so the id
 * is read off the previous module's own `sentences` instead. `useModules` is the loader for that:
 * a file that will not load is simply absent, which leaves the slot the disabled button it was
 * before, and it is asked for ONLY on a first sentence with an eligible rung behind it, so no
 * other sentence in the app pays a second fetch for it.
 *
 * **Both directions are guarded by `isOpenableRung`** — the openability test the screen applies
 * to itself — because a hand-over that lands on `Navigate to={HOME_PATH}` is worse than a disabled
 * button. A locked or pending rung either side is reachable in real life: passing L1-M10 without
 * having passed L1-M4 leaves L2 sealed, so L2-M1 is locked, and a rung mid-ritual is not readable.
 */
import { useModules } from '../../course/content.ts';
import type { Sentence } from '../../course/types.ts';
import { rungStage, type ModuleStatus, type ProgressionInput } from '../../engine/progression.ts';

/** `deriveStatuses(input)`, or `undefined` before the ladder is ready. */
export type Statuses = Record<string, ModuleStatus> | undefined;

/**
 * The same guard the module list keeps (#88): a rung the ladder has locked, or one mid-ritual, has
 * no readable sentences however the learner arrives at one.
 */
export function isOpenableRung(
  input: ProgressionInput,
  statuses: Statuses,
  moduleId: string,
): boolean {
  const status = statuses?.[moduleId];
  return status !== undefined && status !== 'locked' && rungStage(input, moduleId) !== 'pending';
}

export interface LadderHandOver {
  /** The module the LAST sentence hands over to; `undefined` means Practice. */
  handOverTo: string | undefined;
  /** The previous module's last sentence, for the FIRST sentence; `undefined` means disabled. */
  handBackAt: Sentence | undefined;
}

export function useLadderHandOver(
  input: ProgressionInput,
  statuses: Statuses,
  moduleId: string,
  isFirstSentence: boolean,
): LadderHandOver {
  const ladder = input.levels.flatMap((level) => level.moduleIds);
  const after = ladder[ladder.indexOf(moduleId) + 1];
  const before = ladder[ladder.indexOf(moduleId) - 1];

  const handOverTo =
    statuses?.[moduleId] === 'passed' &&
    after !== undefined &&
    isOpenableRung(input, statuses, after)
      ? after
      : undefined;

  const handBackTo =
    isFirstSentence && before !== undefined && isOpenableRung(input, statuses, before)
      ? before
      : undefined;
  const behind = useModules(handBackTo === undefined ? [] : [handBackTo]);
  const handBackAt =
    handBackTo === undefined ? undefined : behind.get(handBackTo)?.sentences.at(-1);

  return { handOverTo, handBackAt };
}
