/**
 * Is this rung produced out? (#95) — the live half of `exit_available` (PRD §8 F1 [D22]).
 *
 * The rule is pure and lives in `src/engine/exit.ts`: every sentence of the module self-marked
 * got-it ≥ 2×. Answering it needs two things that live on opposite sides of the app — the module's
 * **sentence ids**, which are content (`modules/<id>.json`), and the course's **counters**, which
 * are state (`courses[<id>].production`) — so neither the store nor the engine can answer it alone,
 * and this hook is where they meet. It is the whole of the seam `progressionInput` left injectable.
 *
 * **It answers for one module: the rung it was given.** That is not a shortcut, it is the shape of
 * the question — the engine only ever asks `exitAvailable` about the current rung (`deriveStatuses`
 * asks it for no other module, and `rungStage`'s answer for any other rung is decided before it
 * gets there), and loading all thirty modules to answer about rungs nobody is on would be work for
 * nothing. Any other id reads `false`, which is also what an honest answer looks like: a module
 * whose sentences have not been loaded is a module nobody can say has been produced.
 *
 * **A module that will not load reads `false`**, silently. The exit ritual staying quiet is the
 * safe failure for a rung whose content is missing, and the screens that actually render that
 * module report the content failure properly (#79) — an error screen thrown from the Ladder because
 * a card's CTA could not be decided would be the wrong answer in the wrong place.
 */
import { useCallback, useEffect, useState } from 'react';
import { useCourse } from '../course/CourseProvider.tsx';
import { loadModule } from '../course/content.ts';
import { exitAvailable } from '../engine/exit.ts';
import { useAppStore } from '../state/store.ts';

/** Shared, so a render with no module loaded is reference-equal to the last one. */
const NO_SENTENCES: readonly string[] = [];
/** Shared for the same reason: a course with no counters yet answers the same map every render. */
const NO_COUNTERS: Readonly<Record<string, number>> = {};

/**
 * The `exitAvailable` predicate `progressionInput` takes, for the rung the learner is on — `null`
 * while the ladder is still loading, or on a finished ladder, in which case nothing is exit-ready.
 *
 * Memoised on the three things that can change the answer (the rung, its sentences, the counters),
 * because `useProgression` memoises the engine's input on this function's identity.
 */
export function useExitAvailable(moduleId: string | null): (moduleId: string) => boolean {
  const { course } = useCourse();
  const production = useAppStore((store) => store.courses[course.id]?.production);
  const sentenceIds = useRungSentences(course.id, moduleId);

  return useCallback(
    (id: string) => id === moduleId && exitAvailable(sentenceIds, production ?? NO_COUNTERS),
    [moduleId, sentenceIds, production],
  );
}

/**
 * One module's sentence ids, loaded through the content layer's cache (`loadModule`, #81) — so the
 * module the learner is about to open, or has just been reading, costs nothing to ask about twice.
 *
 * The answer is tagged with the file it answers for, the way `useContent` tags its own, so a
 * course switch or a passed rung never renders the previous module's sentence list; and the
 * rejection path is deliberately empty — see the header.
 */
function useRungSentences(courseId: string, moduleId: string | null): readonly string[] {
  const key = moduleId === null ? '' : `${courseId}/${moduleId}`;
  const [loaded, setLoaded] = useState<{ key: string; sentenceIds: readonly string[] } | null>(
    null,
  );

  useEffect(() => {
    if (moduleId === null) return;
    let cancelled = false;

    void loadModule(courseId, moduleId).then(
      (module) => {
        if (cancelled) return;
        setLoaded({ key, sentenceIds: module.sentences.map((sentence) => sentence.id) });
      },
      () => null,
    );

    return () => {
      cancelled = true;
    };
  }, [courseId, moduleId, key]);

  return loaded !== null && loaded.key === key ? loaded.sentenceIds : NO_SENTENCES;
}
