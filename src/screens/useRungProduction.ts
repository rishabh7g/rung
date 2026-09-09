/**
 * How much of the current rung the learner has said back correctly (#95) — the live half of the
 * production counters (PRD §8 F1 [D22]).
 *
 * The number needs two things that live on opposite sides of the app: the module's **sentence
 * ids**, which are content (`modules/<id>.json`), and the course's **counters**, which are state
 * (`courses[<id>].production`). Neither the store nor the engine can join them alone, and this
 * hook is where they meet.
 *
 * It used to answer a question with teeth — `exitAvailable`, whether the rung's exit ritual was
 * open — and the answer was injected into `progressionInput` so that every screen derived the
 * same one. The ritual is gone: a rung is climbed on the last card of a Practice session, so
 * nothing is gated on this and the injection seam went with it. What is left is a drawing: the
 * dots row on the rung card (design/tokens.md §6.1 anatomy).
 *
 * **It answers for one module: the rung it was given.** Loading all thirty modules to count rungs
 * nobody is on would be work for nothing, and a module that will not load reads as no counts at
 * all — the screens that actually render that module report the content failure properly (#79).
 */
import { useEffect, useMemo, useState } from 'react';
import { useCourse } from '../course/CourseProvider.tsx';
import { loadModule } from '../course/content.ts';
import { producedTimes, type ProductionCounts } from '../engine/production.ts';
import { useAppStore } from '../state/store.ts';

/** Shared, so a render with no module loaded is reference-equal to the last one. */
const NO_SENTENCES: readonly string[] = [];
/** Shared for the same reason: a course with no counters yet answers the same map every render. */
const NO_COUNTERS: ProductionCounts = {};
/** Shared empty answer, reference-equal across renders like the two above. */
const NO_PRODUCTION: readonly number[] = [];

/**
 * The current rung's per-sentence got-it counts, in authored order — what the staged rung card
 * draws as its dots row (the #117 walk found it missing). Empty while the module has not loaded
 * (or never will: a `pending` rung has no sentences to count), which the card renders as no row at
 * all.
 */
export function useRungProduction(moduleId: string | null): readonly number[] {
  const { course } = useCourse();
  const production = useAppStore((store) => store.courses[course.id]?.production);
  const sentenceIds = useRungSentences(course.id, moduleId);

  return useMemo(() => {
    if (sentenceIds.length === 0) return NO_PRODUCTION;
    return sentenceIds.map((id) => producedTimes(production ?? NO_COUNTERS, id));
  }, [sentenceIds, production]);
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
