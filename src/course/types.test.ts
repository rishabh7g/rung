/**
 * The types against the real content (#81).
 *
 * `types.ts` claims to mirror schema v5 as the courses actually write it. This is the proof, and
 * it is mechanical: every module and ladder in `content/` is read off disk, run through the
 * loader's tripwires — which is where the JSON becomes a typed `ModuleContent` / `Levels` — and
 * then walked key by key against lists the compiler checks are `keyof` those types. A course that
 * grows a field the types do not know fails here, naming the field.
 *
 * It reads `content/` rather than `public/content/` for one reason: `public/` is generated and
 * gitignored, and `verify.sh` runs TEST before CONTENT, so in CI it is not there. Module files
 * are copied VERBATIM by the build, and the ladder is re-emitted with the same keys (only
 * `hasContent` is recomputed), so the authored tree is the same shape the app fetches. The one
 * emitted-only file, the word index, has no authored twin — `src/test/courseContent.ts` carries a
 * trimmed copy of the real one, and it is checked here the same way.
 *
 * Sources come from `import.meta.glob(…, '?raw')`, as `shellPurity.test.ts` does: `src/` is
 * browser-typed, and a test has no business being the file that pulls `node:fs` into it.
 */
import { describe, expect, it } from 'vitest';
import { parseIndex, parseLevels, parseModule } from './content.ts';
import type {
  Complexity,
  Deconstruction,
  ExitTest,
  Level,
  LevelModule,
  Levels,
  Mistake,
  ModuleContent,
  PoolItem,
  Rule,
  Sentence,
  Variation,
  Word,
  WordIndex,
  WordIndexEntry,
} from './types.ts';
import { indexFixture } from '../test/courseContent.ts';

/* ------------------------------------------------------------- the real tree */

const MODULE_FILES = readAll(
  import.meta.glob<string>('../../content/*/modules/*.json', {
    query: '?raw',
    import: 'default',
    eager: true,
  }),
);

const LEVELS_FILES = readAll(
  import.meta.glob<string>('../../content/*/levels.json', {
    query: '?raw',
    import: 'default',
    eager: true,
  }),
);

function readAll(loaded: Record<string, string>): [file: string, json: unknown][] {
  return Object.entries(loaded)
    .map(([file, raw]): [string, unknown] => [file.replace('../../', ''), JSON.parse(raw)])
    .sort(([a], [b]) => (a < b ? -1 : 1));
}

/* --------------------------------------------------- what the types declare */

/**
 * Every key of every shape, as the compiler knows them. `keyof` is the whole point: a list that
 * names a field the type does not have will not compile, and a field the content has but no list
 * names fails the walk below. Between the two there is nowhere for a field to hide.
 */
const KEYS = {
  module: [
    'schemaVersion',
    'id',
    'title',
    'job',
    'prerequisites',
    'verified',
    'verifiedBy',
    'verifiedAt',
    'fixture',
    'complexity',
    'rules',
    'sentences',
    'comprehensionPool',
    'exitTest',
  ] satisfies (keyof ModuleContent)[],
  complexity: [
    'minWordsPerSentence',
    'maxWordsPerSentence',
    'allowedTenses',
    'allowedPatterns',
    'newWordCap',
  ] satisfies (keyof Complexity)[],
  exitTest: ['generateCount', 'comprehendCount'] satisfies (keyof ExitTest)[],
  rule: ['tag', 'text'] satisfies (keyof Rule)[],
  sentence: [
    'id',
    'display',
    'script',
    'cue',
    'glossEn',
    'literal',
    'deconstruction',
    'trap',
    'sound',
    'variations',
    'mistake',
    'usage',
    'register',
    'mnemonic',
  ] satisfies (keyof Sentence)[],
  deconstruction: ['words', 'rules'] satisfies (keyof Deconstruction)[],
  word: ['display', 'script', 'cue', 'tag', 'forms', 'note'] satisfies (keyof Word)[],
  variation: ['display', 'script', 'cue', 'changed'] satisfies (keyof Variation)[],
  mistake: ['display', 'script', 'why'] satisfies (keyof Mistake)[],
  poolItem: ['id', 'display', 'script', 'cue'] satisfies (keyof PoolItem)[],
  levels: ['courseId', 'levels'] satisfies (keyof Levels)[],
  level: ['id', 'name', 'tagline', 'modules', 'draft', 'draftNote'] satisfies (keyof Level)[],
  levelModule: ['id', 'title', 'job', 'hasContent', 'draft'] satisfies (keyof LevelModule)[],
  index: [
    'courseId',
    'moduleId',
    'cumulativeThrough',
    'surfaceCount',
    'maxSpan',
    'surfaces',
  ] satisfies (keyof WordIndex)[],
  indexEntry: ['moduleId', 'sentenceId', 'wordIdx'] satisfies (keyof WordIndexEntry)[],
};

/** `at` names the path in the file, so a failure reads like the JSON it is about. */
function undeclared(value: unknown, keys: readonly string[], at: string): string[] {
  if (value === null || typeof value !== 'object') return [];
  return Object.keys(value)
    .filter((key) => !keys.includes(key))
    .map((key) => `${at}.${key}`);
}

/** Every key of a module that no type declares — empty is the assertion. */
function undeclaredModuleKeys(module: ModuleContent): string[] {
  const found = [
    ...undeclared(module, KEYS.module, ''),
    ...undeclared(module.complexity, KEYS.complexity, '.complexity'),
    ...undeclared(module.exitTest, KEYS.exitTest, '.exitTest'),
    ...module.rules.flatMap((rule, i) => undeclared(rule, KEYS.rule, `.rules[${i}]`)),
    ...module.comprehensionPool.flatMap((item, i) =>
      undeclared(item, KEYS.poolItem, `.comprehensionPool[${i}]`),
    ),
  ];

  module.sentences.forEach((sentence, i) => {
    const at = `.sentences[${i}]`;
    found.push(
      ...undeclared(sentence, KEYS.sentence, at),
      ...undeclared(sentence.deconstruction, KEYS.deconstruction, `${at}.deconstruction`),
      ...sentence.deconstruction.words.flatMap((word, w) =>
        undeclared(word, KEYS.word, `${at}.deconstruction.words[${w}]`),
      ),
      ...(sentence.variations ?? []).flatMap((variation, v) =>
        undeclared(variation, KEYS.variation, `${at}.variations[${v}]`),
      ),
      ...undeclared(sentence.mistake, KEYS.mistake, `${at}.mistake`),
    );
  });

  return found;
}

function undeclaredLevelsKeys(levels: Levels): string[] {
  return [
    ...undeclared(levels, KEYS.levels, ''),
    ...levels.levels.flatMap((level, i) => [
      ...undeclared(level, KEYS.level, `.levels[${i}]`),
      ...level.modules.flatMap((module, m) =>
        undeclared(module, KEYS.levelModule, `.levels[${i}].modules[${m}]`),
      ),
    ]),
  ];
}

/* -------------------------------------------------------------- the checks */

describe('ModuleContent against the modules that exist', () => {
  it('finds all twenty-one of them — hi-mr L1-M1..M10, en-es L1-M1..M10 and the en-ar fixture', () => {
    expect(MODULE_FILES.map(([file]) => file)).toEqual([
      'content/en-ar/modules/L1-M1.json',
      'content/en-es/modules/L1-M1.json',
      'content/en-es/modules/L1-M10.json',
      'content/en-es/modules/L1-M2.json',
      'content/en-es/modules/L1-M3.json',
      'content/en-es/modules/L1-M4.json',
      'content/en-es/modules/L1-M5.json',
      'content/en-es/modules/L1-M6.json',
      'content/en-es/modules/L1-M7.json',
      'content/en-es/modules/L1-M8.json',
      'content/en-es/modules/L1-M9.json',
      'content/hi-mr/modules/L1-M1.json',
      'content/hi-mr/modules/L1-M10.json',
      'content/hi-mr/modules/L1-M2.json',
      'content/hi-mr/modules/L1-M3.json',
      'content/hi-mr/modules/L1-M4.json',
      'content/hi-mr/modules/L1-M5.json',
      'content/hi-mr/modules/L1-M6.json',
      'content/hi-mr/modules/L1-M7.json',
      'content/hi-mr/modules/L1-M8.json',
      'content/hi-mr/modules/L1-M9.json',
    ]);
  });

  it.each(MODULE_FILES)('%s is a ModuleContent, keys and all', (file, json) => {
    // The assignment IS the type check: parseModule's return type is ModuleContent, so a real
    // file that did not fit the shape would either throw here or fail to compile above.
    const module: ModuleContent = parseModule(json, file);

    expect(module.schemaVersion).toBe(5);
    expect(undeclaredModuleKeys(module)).toEqual([]);
  });

  it('reads the fields the app will render, at their declared types', () => {
    const modules = MODULE_FILES.map(([file, json]) => parseModule(json, file));

    for (const module of modules) {
      // `verified` is a ship gate, not a mood: whenever it is true the file names who or what
      // cleared it and when (#110/#111 flipped hi-mr L1 on an owner-authorised LLM review; the
      // native gate #64 is still open). An unsigned true never reaches a learner.
      if (module.verified) {
        expect(module.verifiedBy).toMatch(/\S/);
        expect(module.verifiedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }

      for (const sentence of module.sentences) {
        for (const word of sentence.deconstruction.words) {
          expect(['free', 'delta', 'interference']).toContain(word.tag);
          expect(Array.isArray(word.forms)).toBe(true);
        }
        // The indices are into the module's own rules array — that order is contractual.
        for (const rule of sentence.deconstruction.rules) {
          expect(module.rules[rule]).toBeDefined();
        }
        if (sentence.register !== undefined) {
          expect(['neutral', 'informal']).toContain(sentence.register);
        }
      }
    }
  });

  it('carries the enrichment the sketch in #81 did not know about, on M1-M3', () => {
    const [, json] = MODULE_FILES.find(([file]) => file.includes('hi-mr/modules/L1-M1')) ?? [];
    const module = parseModule(json, 'hi-mr L1-M1');
    const sentence = module.sentences[0];

    // Every one of these is optional in the schema and present in real content.
    expect(sentence?.literal).toEqual(expect.any(String));
    expect(sentence?.trap).toEqual(expect.any(String));
    expect(sentence?.sound).toEqual(expect.any(String));
    expect(sentence?.usage).toEqual(expect.any(String));
    expect(sentence?.mnemonic).toEqual(expect.any(String));
    expect(sentence?.variations?.[0]?.changed).toEqual(expect.any(String));
    expect(sentence?.mistake?.why).toEqual(expect.any(String));
    expect(module.complexity.newWordCap).toBeGreaterThan(0);
    expect(module.exitTest.generateCount).toBeGreaterThan(0);
  });

  it('keeps the romanized course readable: display is the romanization, script the native line', () => {
    const [file, json] = MODULE_FILES.find(([name]) => name.includes('en-ar')) ?? [];
    const module = parseModule(json, file);

    for (const sentence of module.sentences) {
      expect(sentence.display).toMatch(/^[^\p{Script=Arabic}]+$/u);
      if (sentence.script !== undefined) expect(sentence.script).toMatch(/\p{Script=Arabic}/u);
    }
  });
});

describe('Levels against the ladders that exist', () => {
  it.each(LEVELS_FILES)('%s is a Levels, keys and all', (file, json) => {
    const levels: Levels = parseLevels(json, file);

    expect(levels.levels.map((level) => level.id)).toEqual(['L1', 'L2', 'L3']);
    expect(levels.levels.every((level) => level.modules.length === 10)).toBe(true);
    expect(undeclaredLevelsKeys(levels)).toEqual([]);
  });
});

describe('WordIndex against the emitted index', () => {
  it('is a WordIndex, keys and all — the shape #75 writes, spans included', () => {
    const file = 'public/content/en-es/index/L1-M1.json';
    const index: WordIndex = parseIndex(indexFixture('en-es', 'L1-M1'), file);

    expect(undeclared(index, KEYS.index, '')).toEqual([]);
    expect(
      Object.entries(index.surfaces).flatMap(([surface, entry]) =>
        undeclared(entry, KEYS.indexEntry, `.surfaces[${surface}]`),
      ),
    ).toEqual([]);
    expect(index.maxSpan).toBeGreaterThanOrEqual(1);
    expect(index.surfaces['me llamo']?.wordIdx).toBe(0);
  });
});
