/**
 * Test fixtures for the emitted content tree (#81).
 *
 * Trimmed copies of what `npm run dev` actually writes under `public/content/`. Trimmed, never
 * invented: the keys, the nesting and the values are the real ones (en-es L1-M1, which is Latin
 * script and so reads as the assertion it is), with the counts cut down to what a test needs.
 *
 * The real files are the other half of this contract, and they are checked directly:
 * `src/course/types.test.ts` reads every authored module and ladder off disk and fails if one
 * carries a key the types do not declare. These fixtures are here so the store and parser tests
 * can be about their subject rather than about content.
 */
/**
 * A course's ladder: five levels (docs/48), with L1's list cut to three rungs and the others to
 * one. `hasContent` is the build-recomputed flag — true only for what shipped. Every level is
 * `draft: false` here — a course whose whole ladder is ratified, which is what the seal rule's
 * tests need and what no shipping course is yet (L2–L5 are `draft: true` everywhere).
 */
export function levelsFixture(courseId: string) {
  return {
    courseId,
    levels: [
      {
        id: 'L1',
        name: 'Foundations',
        tagline: 'say what you need',
        draft: false,
        draftNote: null,
        modules: [
          { id: 'L1-M1', title: 'Who I am', job: 'Introduce yourself', hasContent: true },
          { id: 'L1-M2', title: 'First exchange', job: 'Greetings, wellbeing', hasContent: true },
          { id: 'L1-M3', title: 'Needs and wants', job: 'Say what you want', hasContent: false },
        ],
      },
      {
        id: 'L2',
        name: 'Conversations',
        tagline: 'hold your own',
        draft: false,
        draftNote: null,
        modules: [
          { id: 'L2-M1', title: 'Asking politely', job: 'Requests and thanks', hasContent: false },
        ],
      },
      {
        id: 'L3',
        name: 'Fluency',
        tagline: 'stories & opinions',
        draft: false,
        draftNote: null,
        modules: [
          { id: 'L3-M1', title: 'Your day, in detail', job: 'Longer narration', hasContent: false },
        ],
      },
      {
        id: 'L4',
        name: 'Nuance',
        tagline: 'say it the way they do',
        draft: false,
        draftNote: null,
        modules: [
          { id: 'L4-M1', title: 'Explaining how', job: 'Steps in order', hasContent: false },
        ],
      },
      {
        id: 'L5',
        name: 'Voice',
        tagline: 'your own words, at length',
        draft: false,
        draftNote: null,
        modules: [
          {
            id: 'L5-M1',
            title: 'Sayings and idioms',
            job: 'The figurative everyday',
            hasContent: false,
          },
        ],
      },
    ],
  };
}

/**
 * One module's cumulative word index. Trimmed from the real en-es L1-M1 file, `Me llamo` and its
 * paradigm kept: they are the multi-word surfaces that make `maxSpan` 2 rather than 1, which is
 * the whole reason the emitter writes that number.
 */
export function indexFixture(courseId: string, moduleId = 'L1-M1') {
  return {
    courseId,
    moduleId,
    cumulativeThrough: [moduleId],
    surfaceCount: 5,
    maxSpan: 2,
    surfaces: {
      india: { moduleId, sentenceId: `${moduleId}-S02`, wordIdx: 2 },
      'me llamo': { moduleId, sentenceId: `${moduleId}-S01`, wordIdx: 0 },
      rohan: { moduleId, sentenceId: `${moduleId}-S01`, wordIdx: 1 },
      'se llama': { moduleId, sentenceId: `${moduleId}-S01`, wordIdx: 0 },
      soy: { moduleId, sentenceId: `${moduleId}-S02`, wordIdx: 0 },
    },
  };
}
