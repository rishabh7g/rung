/**
 * Test fixtures for the emitted content tree (#81).
 *
 * Trimmed copies of what `npm run dev` actually writes under `public/content/` — the same
 * relationship `courseManifest.ts` has to `courses.json`. Trimmed, never invented: the keys, the
 * nesting and the values are the real ones (en-es L1-M1, which is Latin script and so reads as
 * the assertion it is), with the counts cut down to what a loader test needs.
 *
 * The real files are the other half of this contract, and they are checked directly:
 * `src/course/types.test.ts` reads every authored module and ladder off disk and fails if one
 * carries a key the types do not declare. These fixtures are here so the loader, cache, hook and
 * boot tests can be about loading rather than about content.
 */
/**
 * A course's ladder: three levels, with L1's list cut to three rungs. `hasContent` is the
 * build-recomputed flag — true only for what shipped — and L2/L3 carry the draft note hi-mr's
 * unratified lists carry.
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
        draft: true,
        draftNote: 'Draft list, pending [Q1] — nothing here is authored.',
        modules: [
          { id: 'L2-M1', title: 'Asking politely', job: 'Requests and thanks', hasContent: false },
        ],
      },
      {
        id: 'L3',
        name: 'Fluency',
        tagline: 'stories & opinions',
        draft: true,
        draftNote: 'Draft list, pending [Q1] — nothing here is authored.',
        modules: [
          { id: 'L3-M1', title: 'Your day, in detail', job: 'Longer narration', hasContent: false },
        ],
      },
    ],
  };
}

/**
 * One module, with every enrichment block present — literal, trap, sound, variations, mistake,
 * usage, register, mnemonic — so a test that walks the shape walks all of it. Two sentences and
 * two pool items: the 10-sentence / pool >= 6 budget is the build's rule, not the loader's.
 */
export function moduleFixture(moduleId = 'L1-M1') {
  return {
    schemaVersion: 5,
    id: moduleId,
    title: 'Who I am',
    job: 'Introduce yourself and state what you like',
    prerequisites: [],
    verified: false,
    verifiedBy: null,
    verifiedAt: null,
    fixture: true,
    complexity: {
      minWordsPerSentence: 2,
      maxWordsPerSentence: 5,
      allowedTenses: ['simple_present'],
      allowedPatterns: ['Me llamo + name'],
      newWordCap: 25,
    },
    rules: [
      { tag: 'free', text: 'Word order is Subject-Verb-Object, as in English.' },
      { tag: 'delta', text: 'Naming yourself uses a reflexive: Me llamo + name.' },
    ],
    sentences: [
      {
        id: `${moduleId}-S01`,
        display: 'Me llamo Rohan',
        cue: 'My name is Rohan',
        glossEn: 'lit. "I call myself Rohan"',
        literal: 'Myself I-call Rohan',
        deconstruction: {
          words: [
            {
              display: 'Me llamo',
              cue: 'my name is',
              tag: 'delta',
              forms: ['Me llamo', 'te llamas', 'se llama'],
              note: 'Reflexive: literally "I call myself".',
            },
            { display: 'Rohan', cue: 'Rohan', tag: 'free', forms: [] },
          ],
          rules: [0, 1],
        },
        trap: 'English says "my name is"; Spanish calls yourself something.',
        sound: 'The double l is a y sound.',
        variations: [
          {
            display: 'Me llamo Priya',
            cue: 'My name is Priya',
            changed: 'Only the name changed.',
          },
        ],
        mistake: { display: 'Mi nombre es Rohan', why: 'Understood, but not what people say.' },
        usage: 'Any introduction.',
        register: 'neutral',
        mnemonic: 'Me llamo = I call myself.',
      },
      {
        id: `${moduleId}-S02`,
        display: 'Soy de India',
        cue: 'I am from India',
        glossEn: 'lit. "I-am from India"',
        literal: 'I-am from India',
        deconstruction: {
          words: [
            { display: 'Soy', cue: 'I am', tag: 'delta', forms: ['Soy', 'eres', 'es'] },
            { display: 'de', cue: 'from', tag: 'free', forms: ['de'] },
            { display: 'India', cue: 'India', tag: 'free', forms: [] },
          ],
          rules: [0],
        },
        register: 'informal',
      },
    ],
    comprehensionPool: [
      { id: `${moduleId}-C01`, display: 'Me llamo Priya', cue: 'My name is Priya' },
      { id: `${moduleId}-C02`, display: 'Soy de India', cue: 'I am from India' },
    ],
    exitTest: { generateCount: 1, comprehendCount: 2 },
  };
}

/**
 * The same module as a **romanized** course ships it (`scriptMode: 'romanized'`, PRD §4): the
 * romanization is `display`, and every sentence carries the native script as a quiet second
 * string. Trimmed from the real en-ar L1-M1, so the pair is a true one rather than a placeholder
 * — which is what makes it worth asserting on: a native course's sentences have no `script` key
 * at all, and that difference is the whole of the quiet third line (#88).
 */
export function romanizedModuleFixture(moduleId = 'L1-M1') {
  const base = moduleFixture(moduleId);
  const script = ['اسمي روهان', 'أنا من الهند'];

  return {
    ...base,
    sentences: base.sentences.map((sentence, index) => ({
      ...sentence,
      display: index === 0 ? 'ismī Rohān' : 'anā min al-Hind',
      glossEn: index === 0 ? 'lit. "my-name Rohan"' : 'lit. "I from the-India"',
      script: script[index],
    })),
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
      India: { moduleId, sentenceId: `${moduleId}-S02`, wordIdx: 2 },
      'Me llamo': { moduleId, sentenceId: `${moduleId}-S01`, wordIdx: 0 },
      Rohan: { moduleId, sentenceId: `${moduleId}-S01`, wordIdx: 1 },
      Soy: { moduleId, sentenceId: `${moduleId}-S02`, wordIdx: 0 },
      'se llama': { moduleId, sentenceId: `${moduleId}-S01`, wordIdx: 0 },
    },
  };
}

/**
 * One course's `sizes.json` — the build-computed weight `tools/content-build.ts` emits (#107).
 * Deterministic AND distinct per course (the id's code points, in KiB), so a test rendering two
 * courses' rows can tell them apart without this file hand-maintaining a table of byte counts.
 */
export function sizesFixture(courseId: string) {
  const bytes = [...courseId].reduce((sum, ch) => sum + (ch.codePointAt(0) ?? 0), 0) * 1024;
  return { courseId, files: 4, bytes };
}
