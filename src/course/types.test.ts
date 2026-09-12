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
import {
  matchSurfaces,
  normalizeSurface,
  surfaceSpan,
  tokenizeSurface,
} from '../engine/surface.ts';
import { PIPELINE_ONLY_MODULE_KEYS } from './types.ts';
import type {
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

/**
 * The authored files, read AS THE BUILD SHIPS THEM (#404): the pipeline's own keys — the
 * validator's `prerequisites` and `complexity`, the native gate's `verified*` — are stripped
 * before the walk, off the same list `tools/content-build.ts` strips them with. What this test
 * checks is that the shape a learner downloads is the shape `ModuleContent` declares.
 */
const MODULE_FILES = readAll(
  import.meta.glob<string>('../../content/*/modules/*.json', {
    query: '?raw',
    import: 'default',
    eager: true,
  }),
).map(([file, json]): [string, unknown] => [file, shipped(json)]);

function shipped(authored: unknown): unknown {
  if (typeof authored !== 'object' || authored === null) return authored;
  const module = { ...(authored as Record<string, unknown>) };
  for (const key of PIPELINE_ONLY_MODULE_KEYS) delete module[key];
  return module;
}

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
    'rules',
    'sentences',
    'comprehensionPool',
    'exitTest',
  ] satisfies (keyof ModuleContent)[],
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
  it('finds all 452 — nine complete five-level ladders, and en-sa’s first two rungs (#608)', () => {
    expect(MODULE_FILES.map(([file]) => file)).toEqual([
      'content/en-ar/modules/L1-M1.json',
      'content/en-ar/modules/L1-M10.json',
      'content/en-ar/modules/L1-M2.json',
      'content/en-ar/modules/L1-M3.json',
      'content/en-ar/modules/L1-M4.json',
      'content/en-ar/modules/L1-M5.json',
      'content/en-ar/modules/L1-M6.json',
      'content/en-ar/modules/L1-M7.json',
      'content/en-ar/modules/L1-M8.json',
      'content/en-ar/modules/L1-M9.json',
      'content/en-ar/modules/L2-M1.json',
      'content/en-ar/modules/L2-M10.json',
      'content/en-ar/modules/L2-M2.json',
      'content/en-ar/modules/L2-M3.json',
      'content/en-ar/modules/L2-M4.json',
      'content/en-ar/modules/L2-M5.json',
      'content/en-ar/modules/L2-M6.json',
      'content/en-ar/modules/L2-M7.json',
      'content/en-ar/modules/L2-M8.json',
      'content/en-ar/modules/L2-M9.json',
      'content/en-ar/modules/L3-M1.json',
      'content/en-ar/modules/L3-M10.json',
      'content/en-ar/modules/L3-M2.json',
      'content/en-ar/modules/L3-M3.json',
      'content/en-ar/modules/L3-M4.json',
      'content/en-ar/modules/L3-M5.json',
      'content/en-ar/modules/L3-M6.json',
      'content/en-ar/modules/L3-M7.json',
      'content/en-ar/modules/L3-M8.json',
      'content/en-ar/modules/L3-M9.json',
      'content/en-ar/modules/L4-M1.json',
      'content/en-ar/modules/L4-M10.json',
      'content/en-ar/modules/L4-M2.json',
      'content/en-ar/modules/L4-M3.json',
      'content/en-ar/modules/L4-M4.json',
      'content/en-ar/modules/L4-M5.json',
      'content/en-ar/modules/L4-M6.json',
      'content/en-ar/modules/L4-M7.json',
      'content/en-ar/modules/L4-M8.json',
      'content/en-ar/modules/L4-M9.json',
      'content/en-ar/modules/L5-M1.json',
      'content/en-ar/modules/L5-M10.json',
      'content/en-ar/modules/L5-M2.json',
      'content/en-ar/modules/L5-M3.json',
      'content/en-ar/modules/L5-M4.json',
      'content/en-ar/modules/L5-M5.json',
      'content/en-ar/modules/L5-M6.json',
      'content/en-ar/modules/L5-M7.json',
      'content/en-ar/modules/L5-M8.json',
      'content/en-ar/modules/L5-M9.json',
      'content/en-de/modules/L1-M1.json',
      'content/en-de/modules/L1-M10.json',
      'content/en-de/modules/L1-M2.json',
      'content/en-de/modules/L1-M3.json',
      'content/en-de/modules/L1-M4.json',
      'content/en-de/modules/L1-M5.json',
      'content/en-de/modules/L1-M6.json',
      'content/en-de/modules/L1-M7.json',
      'content/en-de/modules/L1-M8.json',
      'content/en-de/modules/L1-M9.json',
      'content/en-de/modules/L2-M1.json',
      'content/en-de/modules/L2-M10.json',
      'content/en-de/modules/L2-M2.json',
      'content/en-de/modules/L2-M3.json',
      'content/en-de/modules/L2-M4.json',
      'content/en-de/modules/L2-M5.json',
      'content/en-de/modules/L2-M6.json',
      'content/en-de/modules/L2-M7.json',
      'content/en-de/modules/L2-M8.json',
      'content/en-de/modules/L2-M9.json',
      'content/en-de/modules/L3-M1.json',
      'content/en-de/modules/L3-M10.json',
      'content/en-de/modules/L3-M2.json',
      'content/en-de/modules/L3-M3.json',
      'content/en-de/modules/L3-M4.json',
      'content/en-de/modules/L3-M5.json',
      'content/en-de/modules/L3-M6.json',
      'content/en-de/modules/L3-M7.json',
      'content/en-de/modules/L3-M8.json',
      'content/en-de/modules/L3-M9.json',
      'content/en-de/modules/L4-M1.json',
      'content/en-de/modules/L4-M10.json',
      'content/en-de/modules/L4-M2.json',
      'content/en-de/modules/L4-M3.json',
      'content/en-de/modules/L4-M4.json',
      'content/en-de/modules/L4-M5.json',
      'content/en-de/modules/L4-M6.json',
      'content/en-de/modules/L4-M7.json',
      'content/en-de/modules/L4-M8.json',
      'content/en-de/modules/L4-M9.json',
      'content/en-de/modules/L5-M1.json',
      'content/en-de/modules/L5-M10.json',
      'content/en-de/modules/L5-M2.json',
      'content/en-de/modules/L5-M3.json',
      'content/en-de/modules/L5-M4.json',
      'content/en-de/modules/L5-M5.json',
      'content/en-de/modules/L5-M6.json',
      'content/en-de/modules/L5-M7.json',
      'content/en-de/modules/L5-M8.json',
      'content/en-de/modules/L5-M9.json',
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
      'content/en-es/modules/L2-M1.json',
      'content/en-es/modules/L2-M10.json',
      'content/en-es/modules/L2-M2.json',
      'content/en-es/modules/L2-M3.json',
      'content/en-es/modules/L2-M4.json',
      'content/en-es/modules/L2-M5.json',
      'content/en-es/modules/L2-M6.json',
      'content/en-es/modules/L2-M7.json',
      'content/en-es/modules/L2-M8.json',
      'content/en-es/modules/L2-M9.json',
      'content/en-es/modules/L3-M1.json',
      'content/en-es/modules/L3-M10.json',
      'content/en-es/modules/L3-M2.json',
      'content/en-es/modules/L3-M3.json',
      'content/en-es/modules/L3-M4.json',
      'content/en-es/modules/L3-M5.json',
      'content/en-es/modules/L3-M6.json',
      'content/en-es/modules/L3-M7.json',
      'content/en-es/modules/L3-M8.json',
      'content/en-es/modules/L3-M9.json',
      'content/en-es/modules/L4-M1.json',
      'content/en-es/modules/L4-M10.json',
      'content/en-es/modules/L4-M2.json',
      'content/en-es/modules/L4-M3.json',
      'content/en-es/modules/L4-M4.json',
      'content/en-es/modules/L4-M5.json',
      'content/en-es/modules/L4-M6.json',
      'content/en-es/modules/L4-M7.json',
      'content/en-es/modules/L4-M8.json',
      'content/en-es/modules/L4-M9.json',
      'content/en-es/modules/L5-M1.json',
      'content/en-es/modules/L5-M10.json',
      'content/en-es/modules/L5-M2.json',
      'content/en-es/modules/L5-M3.json',
      'content/en-es/modules/L5-M4.json',
      'content/en-es/modules/L5-M5.json',
      'content/en-es/modules/L5-M6.json',
      'content/en-es/modules/L5-M7.json',
      'content/en-es/modules/L5-M8.json',
      'content/en-es/modules/L5-M9.json',
      'content/en-fr/modules/L1-M1.json',
      'content/en-fr/modules/L1-M10.json',
      'content/en-fr/modules/L1-M2.json',
      'content/en-fr/modules/L1-M3.json',
      'content/en-fr/modules/L1-M4.json',
      'content/en-fr/modules/L1-M5.json',
      'content/en-fr/modules/L1-M6.json',
      'content/en-fr/modules/L1-M7.json',
      'content/en-fr/modules/L1-M8.json',
      'content/en-fr/modules/L1-M9.json',
      'content/en-fr/modules/L2-M1.json',
      'content/en-fr/modules/L2-M10.json',
      'content/en-fr/modules/L2-M2.json',
      'content/en-fr/modules/L2-M3.json',
      'content/en-fr/modules/L2-M4.json',
      'content/en-fr/modules/L2-M5.json',
      'content/en-fr/modules/L2-M6.json',
      'content/en-fr/modules/L2-M7.json',
      'content/en-fr/modules/L2-M8.json',
      'content/en-fr/modules/L2-M9.json',
      'content/en-fr/modules/L3-M1.json',
      'content/en-fr/modules/L3-M10.json',
      'content/en-fr/modules/L3-M2.json',
      'content/en-fr/modules/L3-M3.json',
      'content/en-fr/modules/L3-M4.json',
      'content/en-fr/modules/L3-M5.json',
      'content/en-fr/modules/L3-M6.json',
      'content/en-fr/modules/L3-M7.json',
      'content/en-fr/modules/L3-M8.json',
      'content/en-fr/modules/L3-M9.json',
      'content/en-fr/modules/L4-M1.json',
      'content/en-fr/modules/L4-M10.json',
      'content/en-fr/modules/L4-M2.json',
      'content/en-fr/modules/L4-M3.json',
      'content/en-fr/modules/L4-M4.json',
      'content/en-fr/modules/L4-M5.json',
      'content/en-fr/modules/L4-M6.json',
      'content/en-fr/modules/L4-M7.json',
      'content/en-fr/modules/L4-M8.json',
      'content/en-fr/modules/L4-M9.json',
      'content/en-fr/modules/L5-M1.json',
      'content/en-fr/modules/L5-M10.json',
      'content/en-fr/modules/L5-M2.json',
      'content/en-fr/modules/L5-M3.json',
      'content/en-fr/modules/L5-M4.json',
      'content/en-fr/modules/L5-M5.json',
      'content/en-fr/modules/L5-M6.json',
      'content/en-fr/modules/L5-M7.json',
      'content/en-fr/modules/L5-M8.json',
      'content/en-fr/modules/L5-M9.json',
      'content/en-it/modules/L1-M1.json',
      'content/en-it/modules/L1-M10.json',
      'content/en-it/modules/L1-M2.json',
      'content/en-it/modules/L1-M3.json',
      'content/en-it/modules/L1-M4.json',
      'content/en-it/modules/L1-M5.json',
      'content/en-it/modules/L1-M6.json',
      'content/en-it/modules/L1-M7.json',
      'content/en-it/modules/L1-M8.json',
      'content/en-it/modules/L1-M9.json',
      'content/en-it/modules/L2-M1.json',
      'content/en-it/modules/L2-M10.json',
      'content/en-it/modules/L2-M2.json',
      'content/en-it/modules/L2-M3.json',
      'content/en-it/modules/L2-M4.json',
      'content/en-it/modules/L2-M5.json',
      'content/en-it/modules/L2-M6.json',
      'content/en-it/modules/L2-M7.json',
      'content/en-it/modules/L2-M8.json',
      'content/en-it/modules/L2-M9.json',
      'content/en-it/modules/L3-M1.json',
      'content/en-it/modules/L3-M10.json',
      'content/en-it/modules/L3-M2.json',
      'content/en-it/modules/L3-M3.json',
      'content/en-it/modules/L3-M4.json',
      'content/en-it/modules/L3-M5.json',
      'content/en-it/modules/L3-M6.json',
      'content/en-it/modules/L3-M7.json',
      'content/en-it/modules/L3-M8.json',
      'content/en-it/modules/L3-M9.json',
      'content/en-it/modules/L4-M1.json',
      'content/en-it/modules/L4-M10.json',
      'content/en-it/modules/L4-M2.json',
      'content/en-it/modules/L4-M3.json',
      'content/en-it/modules/L4-M4.json',
      'content/en-it/modules/L4-M5.json',
      'content/en-it/modules/L4-M6.json',
      'content/en-it/modules/L4-M7.json',
      'content/en-it/modules/L4-M8.json',
      'content/en-it/modules/L4-M9.json',
      'content/en-it/modules/L5-M1.json',
      'content/en-it/modules/L5-M10.json',
      'content/en-it/modules/L5-M2.json',
      'content/en-it/modules/L5-M3.json',
      'content/en-it/modules/L5-M4.json',
      'content/en-it/modules/L5-M5.json',
      'content/en-it/modules/L5-M6.json',
      'content/en-it/modules/L5-M7.json',
      'content/en-it/modules/L5-M8.json',
      'content/en-it/modules/L5-M9.json',
      'content/en-ko/modules/L1-M1.json',
      'content/en-ko/modules/L1-M10.json',
      'content/en-ko/modules/L1-M2.json',
      'content/en-ko/modules/L1-M3.json',
      'content/en-ko/modules/L1-M4.json',
      'content/en-ko/modules/L1-M5.json',
      'content/en-ko/modules/L1-M6.json',
      'content/en-ko/modules/L1-M7.json',
      'content/en-ko/modules/L1-M8.json',
      'content/en-ko/modules/L1-M9.json',
      'content/en-ko/modules/L2-M1.json',
      'content/en-ko/modules/L2-M10.json',
      'content/en-ko/modules/L2-M2.json',
      'content/en-ko/modules/L2-M3.json',
      'content/en-ko/modules/L2-M4.json',
      'content/en-ko/modules/L2-M5.json',
      'content/en-ko/modules/L2-M6.json',
      'content/en-ko/modules/L2-M7.json',
      'content/en-ko/modules/L2-M8.json',
      'content/en-ko/modules/L2-M9.json',
      'content/en-ko/modules/L3-M1.json',
      'content/en-ko/modules/L3-M10.json',
      'content/en-ko/modules/L3-M2.json',
      'content/en-ko/modules/L3-M3.json',
      'content/en-ko/modules/L3-M4.json',
      'content/en-ko/modules/L3-M5.json',
      'content/en-ko/modules/L3-M6.json',
      'content/en-ko/modules/L3-M7.json',
      'content/en-ko/modules/L3-M8.json',
      'content/en-ko/modules/L3-M9.json',
      'content/en-ko/modules/L4-M1.json',
      'content/en-ko/modules/L4-M10.json',
      'content/en-ko/modules/L4-M2.json',
      'content/en-ko/modules/L4-M3.json',
      'content/en-ko/modules/L4-M4.json',
      'content/en-ko/modules/L4-M5.json',
      'content/en-ko/modules/L4-M6.json',
      'content/en-ko/modules/L4-M7.json',
      'content/en-ko/modules/L4-M8.json',
      'content/en-ko/modules/L4-M9.json',
      'content/en-ko/modules/L5-M1.json',
      'content/en-ko/modules/L5-M10.json',
      'content/en-ko/modules/L5-M2.json',
      'content/en-ko/modules/L5-M3.json',
      'content/en-ko/modules/L5-M4.json',
      'content/en-ko/modules/L5-M5.json',
      'content/en-ko/modules/L5-M6.json',
      'content/en-ko/modules/L5-M7.json',
      'content/en-ko/modules/L5-M8.json',
      'content/en-ko/modules/L5-M9.json',
      'content/en-ru/modules/L1-M1.json',
      'content/en-ru/modules/L1-M10.json',
      'content/en-ru/modules/L1-M2.json',
      'content/en-ru/modules/L1-M3.json',
      'content/en-ru/modules/L1-M4.json',
      'content/en-ru/modules/L1-M5.json',
      'content/en-ru/modules/L1-M6.json',
      'content/en-ru/modules/L1-M7.json',
      'content/en-ru/modules/L1-M8.json',
      'content/en-ru/modules/L1-M9.json',
      'content/en-ru/modules/L2-M1.json',
      'content/en-ru/modules/L2-M10.json',
      'content/en-ru/modules/L2-M2.json',
      'content/en-ru/modules/L2-M3.json',
      'content/en-ru/modules/L2-M4.json',
      'content/en-ru/modules/L2-M5.json',
      'content/en-ru/modules/L2-M6.json',
      'content/en-ru/modules/L2-M7.json',
      'content/en-ru/modules/L2-M8.json',
      'content/en-ru/modules/L2-M9.json',
      'content/en-ru/modules/L3-M1.json',
      'content/en-ru/modules/L3-M10.json',
      'content/en-ru/modules/L3-M2.json',
      'content/en-ru/modules/L3-M3.json',
      'content/en-ru/modules/L3-M4.json',
      'content/en-ru/modules/L3-M5.json',
      'content/en-ru/modules/L3-M6.json',
      'content/en-ru/modules/L3-M7.json',
      'content/en-ru/modules/L3-M8.json',
      'content/en-ru/modules/L3-M9.json',
      'content/en-ru/modules/L4-M1.json',
      'content/en-ru/modules/L4-M10.json',
      'content/en-ru/modules/L4-M2.json',
      'content/en-ru/modules/L4-M3.json',
      'content/en-ru/modules/L4-M4.json',
      'content/en-ru/modules/L4-M5.json',
      'content/en-ru/modules/L4-M6.json',
      'content/en-ru/modules/L4-M7.json',
      'content/en-ru/modules/L4-M8.json',
      'content/en-ru/modules/L4-M9.json',
      'content/en-ru/modules/L5-M1.json',
      'content/en-ru/modules/L5-M10.json',
      'content/en-ru/modules/L5-M2.json',
      'content/en-ru/modules/L5-M3.json',
      'content/en-ru/modules/L5-M4.json',
      'content/en-ru/modules/L5-M5.json',
      'content/en-ru/modules/L5-M6.json',
      'content/en-ru/modules/L5-M7.json',
      'content/en-ru/modules/L5-M8.json',
      'content/en-ru/modules/L5-M9.json',
      'content/en-sa/modules/L1-M1.json',
      'content/en-sa/modules/L1-M2.json',
      'content/hi-en/modules/L1-M1.json',
      'content/hi-en/modules/L1-M10.json',
      'content/hi-en/modules/L1-M2.json',
      'content/hi-en/modules/L1-M3.json',
      'content/hi-en/modules/L1-M4.json',
      'content/hi-en/modules/L1-M5.json',
      'content/hi-en/modules/L1-M6.json',
      'content/hi-en/modules/L1-M7.json',
      'content/hi-en/modules/L1-M8.json',
      'content/hi-en/modules/L1-M9.json',
      'content/hi-en/modules/L2-M1.json',
      'content/hi-en/modules/L2-M10.json',
      'content/hi-en/modules/L2-M2.json',
      'content/hi-en/modules/L2-M3.json',
      'content/hi-en/modules/L2-M4.json',
      'content/hi-en/modules/L2-M5.json',
      'content/hi-en/modules/L2-M6.json',
      'content/hi-en/modules/L2-M7.json',
      'content/hi-en/modules/L2-M8.json',
      'content/hi-en/modules/L2-M9.json',
      'content/hi-en/modules/L3-M1.json',
      'content/hi-en/modules/L3-M10.json',
      'content/hi-en/modules/L3-M2.json',
      'content/hi-en/modules/L3-M3.json',
      'content/hi-en/modules/L3-M4.json',
      'content/hi-en/modules/L3-M5.json',
      'content/hi-en/modules/L3-M6.json',
      'content/hi-en/modules/L3-M7.json',
      'content/hi-en/modules/L3-M8.json',
      'content/hi-en/modules/L3-M9.json',
      'content/hi-en/modules/L4-M1.json',
      'content/hi-en/modules/L4-M10.json',
      'content/hi-en/modules/L4-M2.json',
      'content/hi-en/modules/L4-M3.json',
      'content/hi-en/modules/L4-M4.json',
      'content/hi-en/modules/L4-M5.json',
      'content/hi-en/modules/L4-M6.json',
      'content/hi-en/modules/L4-M7.json',
      'content/hi-en/modules/L4-M8.json',
      'content/hi-en/modules/L4-M9.json',
      'content/hi-en/modules/L5-M1.json',
      'content/hi-en/modules/L5-M10.json',
      'content/hi-en/modules/L5-M2.json',
      'content/hi-en/modules/L5-M3.json',
      'content/hi-en/modules/L5-M4.json',
      'content/hi-en/modules/L5-M5.json',
      'content/hi-en/modules/L5-M6.json',
      'content/hi-en/modules/L5-M7.json',
      'content/hi-en/modules/L5-M8.json',
      'content/hi-en/modules/L5-M9.json',
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
      'content/hi-mr/modules/L2-M1.json',
      'content/hi-mr/modules/L2-M10.json',
      'content/hi-mr/modules/L2-M2.json',
      'content/hi-mr/modules/L2-M3.json',
      'content/hi-mr/modules/L2-M4.json',
      'content/hi-mr/modules/L2-M5.json',
      'content/hi-mr/modules/L2-M6.json',
      'content/hi-mr/modules/L2-M7.json',
      'content/hi-mr/modules/L2-M8.json',
      'content/hi-mr/modules/L2-M9.json',
      'content/hi-mr/modules/L3-M1.json',
      'content/hi-mr/modules/L3-M10.json',
      'content/hi-mr/modules/L3-M2.json',
      'content/hi-mr/modules/L3-M3.json',
      'content/hi-mr/modules/L3-M4.json',
      'content/hi-mr/modules/L3-M5.json',
      'content/hi-mr/modules/L3-M6.json',
      'content/hi-mr/modules/L3-M7.json',
      'content/hi-mr/modules/L3-M8.json',
      'content/hi-mr/modules/L3-M9.json',
      'content/hi-mr/modules/L4-M1.json',
      'content/hi-mr/modules/L4-M10.json',
      'content/hi-mr/modules/L4-M2.json',
      'content/hi-mr/modules/L4-M3.json',
      'content/hi-mr/modules/L4-M4.json',
      'content/hi-mr/modules/L4-M5.json',
      'content/hi-mr/modules/L4-M6.json',
      'content/hi-mr/modules/L4-M7.json',
      'content/hi-mr/modules/L4-M8.json',
      'content/hi-mr/modules/L4-M9.json',
      'content/hi-mr/modules/L5-M1.json',
      'content/hi-mr/modules/L5-M10.json',
      'content/hi-mr/modules/L5-M2.json',
      'content/hi-mr/modules/L5-M3.json',
      'content/hi-mr/modules/L5-M4.json',
      'content/hi-mr/modules/L5-M5.json',
      'content/hi-mr/modules/L5-M6.json',
      'content/hi-mr/modules/L5-M7.json',
      'content/hi-mr/modules/L5-M8.json',
      'content/hi-mr/modules/L5-M9.json',
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
          expect(['neutral', 'informal', 'formal']).toContain(sentence.register);
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
    expect(module.exitTest.generateCount).toBeGreaterThan(0);
  });

  it('keeps the romanized course readable: display is the romanization, script the native line', () => {
    const romanized = MODULE_FILES.filter(([name]) => name.includes('en-ar'));

    expect(romanized.length, 'the en-ar modules this rule is written for').toBe(50);
    for (const [file, json] of romanized) {
      const module = parseModule(json, file);

      for (const sentence of module.sentences) {
        expect(sentence.display).toMatch(/^[^\p{Script=Arabic}]+$/u);
        if (sentence.script !== undefined) expect(sentence.script).toMatch(/\p{Script=Arabic}/u);
      }
    }
  });

  /**
   * en-it (#332–#337) is the second English-L1 course with a Latin-script L2, so the language law
   * runs the ordinary way (`tools/course-briefs.ts`, "en-it: the five decisions"): every teaching
   * field is ENGLISH — `rules[].text`, word `note`, `trap`, `sound`, `variations[].changed`,
   * `mistake.why`, `usage`, `mnemonic`, `cue` — and Italian appears only in the L2 slots: sentence
   * / word / variation / mistake / pool `display`, and word `forms`. An English field may quote
   * the Italian it is explaining; quoting is not switching. `glossEn` is ABSENT since #405 —
   * the cue is the English reading, the literal the word-for-word one, and the build forbids a
   * third — and the briefs' two orthographic decisions are asserted here because the index cannot: the apostrophe is always
   * the straight one (`src/engine/surface.ts` folds the curly one, but `display` must carry one
   * spelling), and no display writes an unaccented `e` where the copula `è` belongs.
   */
  it('keeps the Italian course the ordinary way round: display is Italian, teaching fields English (#334)', () => {
    const enIt = MODULE_FILES.filter(([name]) => name.includes('en-it'));
    const nonLatin = /[^\p{Script=Latin}\p{Nd}\s\p{P}\p{S}]/u;

    expect(enIt.length, 'the en-it L1 modules authored so far').toBeGreaterThan(0);
    for (const [file, json] of enIt) {
      const module = parseModule(json, file);

      for (const rule of module.rules) expect(rule.text, `${file} rule`).not.toMatch(nonLatin);
      for (const item of module.comprehensionPool) {
        expect(item.display, item.id).not.toMatch(nonLatin);
        expect(item.display, `${item.id} straight apostrophe`).not.toMatch(/’/);
      }
      for (const sentence of module.sentences) {
        const at = sentence.id;
        // Italian is written in the Latin alphabet, accents and all; nothing else may appear.
        expect(sentence.display, at).not.toMatch(nonLatin);
        expect(sentence.display, `${at} straight apostrophe`).not.toMatch(/’/);
        // No gloss on an English-L1 course (#405): the cue already reads in English.
        expect(sentence.glossEn, `${at} glossEn`).toBeUndefined();
        // Every teaching field is English prose, and `script` belongs to romanized courses only.
        expect(sentence.script, `${at} script`).toBeUndefined();
        for (const variation of sentence.variations ?? []) {
          expect(variation.display, `${at} variation`).not.toMatch(/’/);
        }
        for (const word of sentence.deconstruction.words) {
          expect(word.display, `${at} word`).not.toMatch(/’/);
          for (const form of word.forms) {
            expect(form, `${at} form of ${word.display}`).not.toMatch(nonLatin);
            expect(form, `${at} form of ${word.display}`).not.toMatch(/’/);
          }
          expect(word.note, `${at} note of ${word.display}`).toMatch(/\S/);
        }
      }
    }
  });

  /**
   * The elision decision of `tools/course-briefs.ts` ("en-it: the five decisions", 2), mechanised.
   * `src/engine/surface.ts` keeps an inner apostrophe INSIDE one token and `surfaceIndexKeys`
   * splits only hyphens, so `l'italiano` is one index key that answers for nothing else — it does
   * not resolve through `italiano`, and `c'è` does not resolve through `è`. An apostrophe shape a
   * display writes without a row (or a `forms` entry) behind it is therefore a word with no "why"
   * at all. This walks the ladder in order and checks every one of them against what is taught at
   * or before that module.
   */
  it('teaches every apostrophe surface it writes — the en-it elision policy (#333)', () => {
    // Ladder order is LEVEL first and then number: `moduleNumber` alone put L2-M1 in front of
    // L1-M7, which is how the en-it L2 (#439) found this — `dov'è` is taught in L1 and was being
    // checked against a set that did not yet contain it.
    const ladder = MODULE_FILES.filter(([name]) => name.includes('en-it'))
      .map(([file, json]) => [file, parseModule(json, file)] as const)
      .sort(([, a], [, b]) => a.id.localeCompare(b.id, 'en', { numeric: true }));
    const taught = new Set<string>();
    let maxSpan = 1;

    expect(ladder.length, 'the en-it L1 modules authored so far').toBeGreaterThan(0);
    for (const [file, module] of ladder) {
      // First-occurrence-wins is cumulative, so a module's own rows count for its own displays.
      for (const sentence of module.sentences) {
        for (const word of sentence.deconstruction.words) {
          for (const raw of [word.display, ...word.forms]) {
            const surface = normalizeSurface(raw);
            if (surface === '') continue;
            taught.add(surface);
            maxSpan = Math.max(maxSpan, surfaceSpan(surface));
          }
        }
      }
      const written = [
        ...module.sentences.map((sentence) => sentence.display),
        ...module.sentences.flatMap((sentence) =>
          (sentence.variations ?? []).map((variation) => variation.display),
        ),
        ...module.comprehensionPool.map((item) => item.display),
      ];
      for (const line of written) {
        // The resolver's own walk, longest surface first — so a token inside a taught phrase
        // (the po' of un po' di) is answered by the phrase and needs no key of its own.
        const matches = matchSurfaces(tokenizeSurface(line), {
          maxSpan,
          has: (surface) => taught.has(surface),
        });
        for (const match of matches) {
          if (match.resolved || !match.surface.includes("'")) continue;
          expect.fail(`${file}: "${match.surface}" in "${line}" resolves to no word row`);
        }
      }
    }
  });

  /**
   * hi-en (#267–#273) is the first course whose L2 is the language the other three teach IN, so
   * the language law runs the other way round (#270, `tools/course-briefs.ts` "hi-en: the four
   * decisions"): English appears ONLY in the L2 slots — sentence / word / variation / mistake /
   * pool `display` and word `forms` — and every teaching field is Hindi in Devanagari, which may
   * quote the English word it explains but never switches into English prose. No sentence carries
   * `glossEn` (#268 — it would be the English hero line twice) and every sentence of the ten
   * carries `literal`, the Hindi words in English order (M1–M3 by the briefs' rule, M4–M10 by
   * choice — #271 and #272 kept it wherever the order moves, which in this pair is everywhere;
   * M10's turns carry one literal for the whole turn). Contractions are single surfaces with a
   * straight apostrophe (`src/engine/surface.ts` folds the curly one on the index, but `display`
   * is one spelling). Since the spoken-English pass (2026-09-05) the `'s` a display writes is a
   * contracted `is` or `has` on a pronoun or question word — `it's`, `what's`, `where's`,
   * `there's`, `she's`, `he's`, `that's` — and never a possessive on a noun.
   */
  it('keeps the English course the other way round: display is English, every teaching field Hindi (#270)', () => {
    const hiEn = MODULE_FILES.filter(([name]) => name.includes('hi-en'));
    const devanagari = /\p{Script=Devanagari}/u;
    const latinOnly = /^[^\p{Script=Devanagari}]+$/u;

    expect(
      hiEn.length,
      'the hi-en modules this rule is written for (#270-#272 L1; #437, #446, #455 L2; #473, #482,' +
        ' #548 L3; #531 L4). The count guards the walk BELOW it, and vitest aborts the case here —' +
        ' so a stale number silently stops every language law in this block from running at all.',
    ).toBe(50);
    for (const [file, json] of hiEn) {
      const module = parseModule(json, file);

      for (const rule of module.rules) expect(rule.text, `${file} rule`).toMatch(devanagari);
      for (const item of module.comprehensionPool) {
        expect(item.display, item.id).toMatch(latinOnly);
        expect(item.cue, item.id).toMatch(devanagari);
      }
      for (const sentence of module.sentences) {
        const at = sentence.id;
        expect(sentence.display, at).toMatch(latinOnly);
        // Straight apostrophe always. The possessive `'s` is banned in L1 — a contracted
        // `is`/`has` on a pronoun or question word is sanctioned and a possessive on a noun is
        // not, because `Rohan's` would be a fresh surface no L1 job needs — and L2-M2 lifts that
        // ban on the record (`docs/55` §3), so the check is scoped to the level that made it.
        expect(sentence.display, `${at} straight apostrophe`).not.toMatch(/’/);
        if (module.id.startsWith('L1-')) {
          expect(sentence.display, `${at} no possessive in L1`).not.toMatch(
            /(?<!\b(?:[Ii]t|[Ww]hat|[Ww]here|[Tt]here|[Ss]he|[Hh]e|[Tt]hat))'s\b/,
          );
        }
        expect(sentence.glossEn, `${at} glossEn`).toBeUndefined();
        expect(sentence.literal, `${at} literal`).toMatch(devanagari);
        for (const field of ['cue', 'sound', 'usage', 'mnemonic'] as const) {
          expect(sentence[field], `${at} ${field}`).toMatch(devanagari);
        }
        if (sentence.trap !== undefined) expect(sentence.trap, `${at} trap`).toMatch(devanagari);
        expect(sentence.mistake?.display, `${at} mistake`).toMatch(latinOnly);
        expect(sentence.mistake?.why, `${at} mistake.why`).toMatch(devanagari);
        for (const variation of sentence.variations ?? []) {
          expect(variation.display, `${at} variation`).toMatch(latinOnly);
          expect(variation.cue, `${at} variation cue`).toMatch(devanagari);
          expect(variation.changed, `${at} variation changed`).toMatch(devanagari);
        }
        for (const word of sentence.deconstruction.words) {
          expect(word.display, `${at} word`).toMatch(latinOnly);
          for (const form of word.forms)
            expect(form, `${at} form of ${word.display}`).toMatch(latinOnly);
          expect(word.cue, `${at} cue of ${word.display}`).toMatch(devanagari);
          expect(word.note, `${at} note of ${word.display}`).toMatch(devanagari);
        }
      }
    }
  });

  /**
   * en-ru (#338–#343) is the product's first Cyrillic course, and its language law runs the way
   * en-es's does rather than hi-en's: the document speaks ENGLISH (`l1Tag: en`), so every teaching
   * field is English prose — which may quote Cyrillic inside itself — and Russian appears only in
   * the L2 slots.
   *
   * **What #353–#360 changed, and it is most of this case.** rung teaches speech, not script
   * (docs/design-contract.md), so an English-L1 course may not ask its learner to decode a script
   * they cannot read. en-ru is `scriptMode: "romanized"` now: `display` and word `forms` are the
   * ROMANIZATION, and the Cyrillic moved to the quiet `script` line — the one place in the course
   * it appears on a learner's screen. Three of this case's old assertions therefore inverted, and
   * they are worth naming so a reader does not think the file drifted:
   *
   *   • `display` was asserted to BE Cyrillic and to carry no Latin. It is now the reverse.
   *   • `script` was asserted to be unused, on the argument that a native course has nothing to
   *     put under itself. It is now required on every surface that has a `display`.
   *   • **stress marks were BANNED and are now REQUIRED.** The old reasoning — that an acute is a
   *     codepoint the word index has to match forever — is still true, and #355 took it as the
   *     argument FOR marking: Russian vowel reduction is unintelligible without stress, so a
   *     romanization that hides it teaches an English reader to say the word wrong. What survives
   *     of the old rule is its sharp edge, asserted below: the acute must be PRECOMPOSED, because
   *     `á` and `a` + U+0301 are two surfaces and only one of them has a "why" row.
   *
   * `glossEn` is absent since #405: the L1 is English, so the cue is the gloss and the build
   * forbids a second one.
   */
  it('keeps the romanized course in its lane: display is Latin, the Cyrillic is the script line (#353)', () => {
    const enRu = MODULE_FILES.filter(([name]) => name.includes('en-ru'));
    const cyrillic = /\p{Script=Cyrillic}/u;
    const latin = /[A-Za-z]/;
    const noCyrillic = /^\P{Script=Cyrillic}+$/u;
    /** A COMBINING acute — the decomposed spelling, which would fork a word into two surfaces. */
    const combiningAcute = /́/u;
    /** The precomposed stressed vowels the #355 scheme writes. */
    const stressed = /[áéíóúý]/u;

    expect(enRu.length, 'the en-ru L1 modules authored so far').toBeGreaterThan(0);
    for (const [file, json] of enRu) {
      const module = parseModule(json, file);

      /** Every L2 surface: romanized display, Cyrillic script line, and neither in the other. */
      const surface = (target: { display: string; script?: string | null }, at: string): void => {
        expect(target.display, `${at} display is the romanization`).toMatch(noCyrillic);
        expect(target.display, `${at} display is Latin`).toMatch(latin);
        expect(target.script, `${at} carries the Cyrillic on its script line`).toMatch(cyrillic);
      };

      // Teaching prose is English. It may QUOTE Cyrillic, so the test is that English is there.
      for (const rule of module.rules) expect(rule.text, `${file} rule`).toMatch(latin);
      for (const item of module.comprehensionPool) {
        surface(item, item.id);
        expect(item.cue, `${item.id} cue is English only`).toMatch(noCyrillic);
      }
      for (const sentence of module.sentences) {
        const at = sentence.id;
        surface(sentence, at);
        expect(sentence.cue, `${at} cue is English only`).toMatch(noCyrillic);
        // No gloss on an English-L1 course (#405).
        expect(sentence.glossEn, `${at} glossEn`).toBeUndefined();
        expect(sentence.literal, `${at} literal`).toMatch(latin);
        for (const field of ['sound', 'usage', 'mnemonic'] as const) {
          expect(sentence[field], `${at} ${field}`).toMatch(latin);
        }
        if (sentence.trap !== undefined) expect(sentence.trap, `${at} trap`).toMatch(latin);
        if (sentence.mistake !== undefined) surface(sentence.mistake, `${at} mistake`);
        expect(sentence.mistake?.why, `${at} mistake.why`).toMatch(latin);
        for (const variation of sentence.variations ?? []) {
          surface(variation, `${at} variation`);
          expect(variation.cue, `${at} variation cue`).toMatch(noCyrillic);
          expect(variation.changed, `${at} variation changed`).toMatch(latin);
        }
        for (const word of sentence.deconstruction.words) {
          surface(word, `${at} word`);
          for (const form of word.forms) {
            expect(form, `${at} form of ${word.display}`).toMatch(noCyrillic);
            expect(form, `${at} form of ${word.display} is Latin`).toMatch(latin);
          }
          expect(word.cue, `${at} cue of ${word.display}`).toMatch(noCyrillic);
          expect(word.note, `${at} note of ${word.display}`).toMatch(latin);
        }
      }

      // The acute is PRECOMPOSED everywhere — display, forms, or a quotation inside English
      // prose. `á` and `a` + U+0301 fold to two different index keys, and only one has a note.
      expect(JSON.stringify(module), `${file} writes a decomposed acute`).not.toMatch(
        combiningAcute,
      );
      // …and stress is actually MARKED rather than merely permitted: a module of nothing but
      // monosyllables is not a thing Russian has, so an unmarked file is a file that forgot.
      expect(JSON.stringify(module), `${file} marks no stress at all`).toMatch(stressed);
    }
  });

  /**
   * en-ko (#373–#380) is the third romanized course, and the first that was BORN one. en-ar had
   * `scriptMode: "romanized"` from the start by luck of its authoring order; en-ru had to be
   * dragged into it across #353–#360, 959 Cyrillic `display` strings at a time. This course was
   * settled before its manifest row existed (`docs/34-en-ko-romanization-decisions.md`), and this
   * case is where that decision is held against the shipped files rather than against the briefs
   * that produced them:
   *
   *   • **Not one Hangul character outside `script`.** `tools/content-build.ts` `checkScriptMode`
   *     already fails a build on a Hangul `display` or `forms` entry; what it does NOT check is
   *     the English teaching prose, and a `note` quoting Hangul would be asking the learner to
   *     decode exactly what #353 says they must never be asked to decode.
   *   • **The romanization is ASCII.** Not a style rule: en-ar and en-ru are each charged a
   *     `latin-ext` font cut for their diacritics (`tools/payload-budget.ts`), and this course is
   *     charged none. A stray `ŏ` or an acute would quietly cost that, and would also fork a word
   *     into two index surfaces.
   *   • **The particle hyphen, and the invariant the index decision rests on.** #373 writes a
   *     particle or the copula joined to its host by a hyphen (`chaek-eul`, `jeo-neun`), which is
   *     what gives the bare noun an index key of its own. The emitted index gives the bare
   *     PARTICLE keys to the first host row that carries them, and that was accepted rather than
   *     worked around — on the ground that Korean never writes a bare particle as its own
   *     whitespace token. That ground is asserted here rather than assumed.
   *   • **The speech level.** The course speaks the `-yo` style, so no L2 slot anywhere writes the
   *     plain-style pronoun `na` or its possessive `nae`. The formal `-mnida` style appears in
   *     exactly the two frozen phrases M2 names, and nowhere else — a third one would mean a
   *     module had started teaching a style this course does not teach.
   */
  it('keeps en-ko to the decisions #373 settled: romanized, ASCII, hyphenated, one speech level', () => {
    const enKo = MODULE_FILES.filter(([name]) => name.includes('en-ko'));
    const hangul = /\p{Script=Hangul}/u;
    const noHangul = /^\P{Script=Hangul}+$/u;
    const latin = /[A-Za-z]/;
    /** The romanization's whole alphabet: ASCII letters, the particle hyphen, and punctuation. */
    const asciiOnly = /^[\x20-\x7E]+$/u;
    /** Plain-style shapes the speech-level decision keeps out of every L2 slot (#376). */
    const PLAIN_STYLE = new Set(['na', 'na-neun', 'nan', 'nae', 'neo', 'neo-neun', 'neo-reul']);
    /**
     * The two frozen formal phrases L1-M2 teaches whole — and, from L2 on, the one more that
     * L2-M1 (#442) is chartered to open. That module's job is to show the SPEECH LEVELS side by
     * side for the first time: gomawoyo against gamsahamnida, mianhaeyo against joesonghamnida.
     * L1 could hold the line at two because it never taught the pair; a level that does cannot,
     * and this is the fourth time in the milestone a second level has exposed a test that encoded
     * the level as well as the rule. L2-M5 (#451) adds the second and last of them, `jal
     * meogeosseumnida` — said after eating, frozen exactly as L1-M2's two are, and named as frozen
     * in its own note. Any -mnida beyond these four is still a style slip.
     *
     * Through L3, that is. **L4-M7 "Official talk" unfreezes the level** (#527, `docs/93`): its
     * whole job is `-(seu)pnida`, `-(seu)pnikka`, `-(eu)sipsio` and `-(eu)psida` as a productive
     * system — the announcement register a learner HEARS, at the station and on the intercom — so
     * on L4 and above a -mnida form is the content rather than a slip. The gate is therefore
     * scoped to the levels that froze it, and NOT deleted: L1 through L3 still hold the line, and
     * a course whose L2 sentence reaches for `hamnida` still fails here.
     */
    const FROZEN_FORMAL = new Set(['gamsahamnida', 'mannaseo bangapseumnida']);
    const FROZEN_FORMAL_L2 = new Set([...FROZEN_FORMAL, 'joesonghamnida', 'jal meogeosseumnida']);
    /**
     * Every particle this course writes. A bare one as its own whitespace token would break the
     * ground the index decision stands on — see the case comment.
     */
    const BARE_PARTICLES = new Set([
      'neun',
      'eun',
      'i',
      'ga',
      'eul',
      'reul',
      'do',
      'e',
      'eseo',
      'ieyo',
      'yeyo',
      'hago',
    ]);

    expect(enKo.length, 'the en-ko L1 modules authored so far').toBeGreaterThan(0);
    for (const [file, json] of enKo) {
      const module = parseModule(json, file);

      /**
       * One L2 surface: romanized ASCII display, Hangul script line, neither in the other.
       *
       * `indexed` is false for a `mistake` plate, and only the bare-particle check is relaxed by
       * it. A plate is deliberately WRONG Korean — M1's is the copula torn off the noun it belongs
       * to, which is exactly a bare particle standing as its own token — and `buildWordIndex`
       * never reads a mistake, so the invariant it protects is not at risk there. Everything else
       * still holds on a plate: no Hangul, ASCII only, no plain-style pronoun, a Hangul `script`
       * line of its own.
       */
      const surface = (
        target: { display: string; script?: string | null },
        at: string,
        indexed = true,
      ): void => {
        expect(target.display, `${at} display carries Hangul`).toMatch(noHangul);
        expect(target.display, `${at} display is Latin`).toMatch(latin);
        expect(target.display, `${at} display is pure ASCII`).toMatch(asciiOnly);
        expect(target.script, `${at} carries the Hangul on its script line`).toMatch(hangul);
        for (const token of tokenizeSurface(target.display)) {
          if (indexed) {
            expect(
              BARE_PARTICLES.has(token),
              `${at} writes the bare particle "${token}" as its own token`,
            ).toBe(false);
          }
          expect(PLAIN_STYLE.has(token), `${at} writes the plain-style "${token}"`).toBe(false);
          if (token.endsWith('mnida')) {
            const phrase = normalizeSurface(target.display);
            const frozenLevel = /^L[123]-/.test(module.id);
            const allowed = module.id.startsWith('L1-') ? FROZEN_FORMAL : FROZEN_FORMAL_L2;
            expect(
              !frozenLevel || [...allowed].some((frozen) => phrase.includes(frozen)),
              `${at} writes a -mnida form outside the frozen phrases this level allows`,
            ).toBe(true);
          }
        }
      };

      // Teaching prose is English — and unlike en-ar and en-ru, it may not even QUOTE the native
      // script: there is nothing in this course a learner is asked to read in Hangul.
      for (const rule of module.rules) {
        expect(rule.text, `${file} rule`).toMatch(latin);
        expect(rule.text, `${file} rule quotes Hangul`).toMatch(noHangul);
      }
      for (const item of module.comprehensionPool) {
        surface(item, item.id);
        expect(item.cue, `${item.id} cue is English only`).toMatch(noHangul);
      }
      for (const sentence of module.sentences) {
        const at = sentence.id;
        surface(sentence, at);
        expect(sentence.cue, `${at} cue is English only`).toMatch(noHangul);
        // No gloss on an English-L1 course (#405).
        expect(sentence.glossEn, `${at} glossEn`).toBeUndefined();
        for (const field of ['sound', 'usage', 'mnemonic', 'trap', 'literal'] as const) {
          const value = sentence[field];
          if (value !== undefined) expect(value, `${at} ${field}`).toMatch(noHangul);
        }
        if (sentence.mistake !== undefined) {
          surface(sentence.mistake, `${at} mistake`, false);
          expect(sentence.mistake.why, `${at} mistake.why`).toMatch(noHangul);
        }
        for (const variation of sentence.variations ?? []) {
          surface(variation, `${at} variation`);
          expect(variation.cue, `${at} variation cue`).toMatch(noHangul);
          expect(variation.changed, `${at} variation changed`).toMatch(noHangul);
        }
        for (const word of sentence.deconstruction.words) {
          // A word row may be a bare particle — that is what teaches the particle — so it is the
          // one place BARE_PARTICLES is allowed, and the row writes it with its leading hyphen.
          expect(word.display, `${at} word display carries Hangul`).toMatch(noHangul);
          expect(word.display, `${at} word display is pure ASCII`).toMatch(asciiOnly);
          expect(word.script, `${at} word ${word.display} carries Hangul`).toMatch(hangul);
          expect(word.cue, `${at} cue of ${word.display}`).toMatch(noHangul);
          expect(word.note, `${at} note of ${word.display}`).toMatch(noHangul);
          expect(word.note, `${at} note of ${word.display}`).toMatch(latin);
          for (const form of word.forms) {
            expect(form, `${at} form of ${word.display} carries Hangul`).toMatch(noHangul);
            expect(form, `${at} form of ${word.display} is pure ASCII`).toMatch(asciiOnly);
          }
        }
      }
    }
  });

  /**
   * en-sa (#603–#611) is the fourth romanized course and the second BORN one, after en-ko. What
   * makes it different from every course before it is that its decisions are phonological rather
   * than orthographic, so `checkScriptMode` — which only ever asks "is this Latin?" — cannot see
   * a single one of them. This case is where they are held against the shipped files:
   *
   *   • **Not one Devanagari character outside `script`.** Same rule as en-ko's Hangul, and for
   *     the same reason: #353 says an English speaker is never asked to decode a script, so a
   *     `note` quoting Devanagari would be asking for exactly that. hi-mr is the opposite case in
   *     the same alphabet — its teaching prose IS Devanagari — which is why this is asserted per
   *     course and not globally.
   *   • **NFC, and this is the one no human eye catches.** Every IAST mark is precomposed: `ā`
   *     U+0101, `ṛ` U+1E5B, `ṃ` U+1E43, `ś` U+015B. A DECOMPOSED mark renders identically in a
   *     diff and passes `checkScriptMode`, which allows `Script=Inherited` on purpose — and then
   *     `tools/font-subset.ts` drops it, because no target claims U+0304/U+0323/U+0307, so the
   *     accent draws from `system-ui` while `surface.ts` still normalises the index key to the
   *     right place. The index would be right and the rendering wrong, which is why this is a
   *     test and not a review note (measured under #605).
   *   • **Pada form — the decision the whole course rests on** (`docs/121` §2). `display` never
   *     writes external sandhi, so a word keeps ONE spelling and the bare noun keeps a row a
   *     learner can tap. Two shapes of that rule are mechanical and are pinned here: no token
   *     ends in `ṃ` (a final anusvāra is a sandhi product — it is `kim` and `phalam`), and no
   *     token carries an avagraha. The avagraha ban is not taste: `'` is the ONE character
   *     `surface.ts` rule 3 does not strip from a token edge, and rule 2 folds `’` into it, so
   *     `'pi` would be a real index key that is not `api` — and it would collide with en-ar's
   *     hamza class on the way.
   *   • **The register, scoped to the level that froze it.** L1 speaks `bhavān`/`bhavatī` with a
   *     third-person verb, and `tvam` is deferred to L2-M1 (#612). So the ban is written `L1`
   *     from the first commit rather than globally — #418 recorded five assertions across this
   *     milestone that were correct for one level and had to be scoped by the level chartered to
   *     lift them, and there is no reason to spend that lesson a sixth time.
   */
  it('keeps en-sa to the decisions docs/121 settled: IAST, NFC, pada form, bhavān not tvam', () => {
    const enSa = MODULE_FILES.filter(([name]) => name.includes('en-sa'));
    const devanagari = /\p{Script=Devanagari}/u;
    const noDevanagari = /^\P{Script=Devanagari}+$/u;
    const latin = /[A-Za-z]/;
    /**
     * IAST's whole alphabet: ASCII, plus the sixteen marks and their capitals that `docs/121` §1.2
     * enumerates and #605 measured against Mukta's cmap. Anything outside it is either a scheme
     * this course does not write or a decomposed sequence the NFC check below will also catch.
     */
    const iastOnly = /^[\x20-\x7EĀāĪīŚśŪūÑñḌḍḤḥḶḷḸḹṂṃṄṅṆṇṚṛṜṝṢṣṬṭ]+$/u;
    /** The second-person register L1 does not speak; L2-M1 (#612) is chartered to open it. */
    const INTIMATE = new Set(['tvam', 'tva', 'tava', 'tubhyam', 'tvām', 'te']);

    expect(enSa.length, 'the en-sa modules authored so far').toBeGreaterThan(0);
    for (const [file, json] of enSa) {
      const module = parseModule(json, file);
      const isL1 = module.id.startsWith('L1-');

      /**
       * One L2 surface. `pada` is false for a `mistake` plate: a plate is deliberately WRONG
       * Sanskrit, and the wrong thing a module most wants to show is precisely a sandhied or
       * anusvāra-final form. `buildWordIndex` never reads a mistake, so the invariant those two
       * checks protect is not at risk there. Everything else still holds on a plate — no
       * Devanagari, IAST only, NFC, and the register.
       */
      const surface = (
        target: { display: string; script?: string | null },
        at: string,
        pada = true,
      ): void => {
        expect(target.display, `${at} display carries Devanagari`).toMatch(noDevanagari);
        expect(target.display, `${at} display is Latin`).toMatch(latin);
        expect(target.display, `${at} display is IAST only`).toMatch(iastOnly);
        expect(target.display, `${at} display is not NFC`).toBe(target.display.normalize('NFC'));
        // `script` is REQUIRED on the surfaces a learner reads and absent on the one they do not.
        // `docs/121` §9.1 seats the quiet line on sentences, distinct variations and pool items,
        // and deliberately keeps it off word rows and mistake plates in L1 — a plate is wrong
        // Sanskrit, and setting the wrong form in Devanagari as well would double the thing the
        // learner must not absorb. `pada` marks exactly the plate, so it carries this too.
        if (pada) {
          expect(target.script, `${at} carries the Devanagari on its script line`).toMatch(
            devanagari,
          );
          expect(target.script ?? '', `${at} script is not NFC`).toBe(
            (target.script ?? '').normalize('NFC'),
          );
        } else {
          expect(target.script ?? null, `${at} mistake plate carries a script line`).toBeNull();
        }
        for (const token of tokenizeSurface(target.display)) {
          if (pada) {
            expect(token.endsWith('ṃ'), `${at} writes the sandhi anusvāra on "${token}"`).toBe(
              false,
            );
            expect(token.includes("'"), `${at} writes an avagraha in "${token}"`).toBe(false);
          }
          if (isL1) {
            expect(INTIMATE.has(token), `${at} writes the intimate "${token}" in L1`).toBe(false);
          }
        }
      };

      // Teaching prose is English, and — as with en-ko — may not even QUOTE the native script:
      // there is nothing in this course a learner is asked to read in Devanagari.
      for (const rule of module.rules) {
        expect(rule.text, `${file} rule`).toMatch(latin);
        expect(rule.text, `${file} rule quotes Devanagari`).toMatch(noDevanagari);
        expect(rule.text, `${file} rule is not NFC`).toBe(rule.text.normalize('NFC'));
      }
      for (const item of module.comprehensionPool) {
        surface(item, item.id);
        expect(item.cue, `${item.id} cue is English only`).toMatch(noDevanagari);
      }
      for (const sentence of module.sentences) {
        const at = sentence.id;
        surface(sentence, at);
        expect(sentence.cue, `${at} cue is English only`).toMatch(noDevanagari);
        // No gloss on an English-L1 course (#405).
        expect(sentence.glossEn, `${at} glossEn`).toBeUndefined();
        // L1 speaks one register, so the chip never varies (`formal` arrives at L4-M7).
        if (isL1) expect(sentence.register ?? 'neutral', `${at} register`).toBe('neutral');
        for (const field of ['sound', 'usage', 'mnemonic', 'trap', 'literal'] as const) {
          const value = sentence[field];
          if (value !== undefined) {
            expect(value, `${at} ${field}`).toMatch(noDevanagari);
            expect(value, `${at} ${field} is not NFC`).toBe(value.normalize('NFC'));
          }
        }
        if (sentence.mistake !== undefined) {
          surface(sentence.mistake, `${at} mistake`, false);
          expect(sentence.mistake.why, `${at} mistake.why`).toMatch(noDevanagari);
        }
        for (const variation of sentence.variations ?? []) {
          surface(variation, `${at} variation`);
          expect(variation.cue, `${at} variation cue`).toMatch(noDevanagari);
          expect(variation.changed, `${at} variation changed`).toMatch(noDevanagari);
        }
        for (const word of sentence.deconstruction.words) {
          expect(word.display, `${at} word display carries Devanagari`).toMatch(noDevanagari);
          expect(word.display, `${at} word display is IAST only`).toMatch(iastOnly);
          expect(word.display, `${at} word display is not NFC`).toBe(word.display.normalize('NFC'));
          expect(word.cue, `${at} cue of ${word.display}`).toMatch(noDevanagari);
          expect(word.note, `${at} note of ${word.display}`).toMatch(noDevanagari);
          expect(word.note, `${at} note of ${word.display}`).toMatch(latin);
          for (const form of word.forms) {
            expect(form, `${at} form of ${word.display} carries Devanagari`).toMatch(noDevanagari);
            expect(form, `${at} form of ${word.display} is IAST only`).toMatch(iastOnly);
            expect(form, `${at} form of ${word.display} is not NFC`).toBe(form.normalize('NFC'));
          }
        }
      }
    }
  });

  /**
   * en-fr (#326–#331) is en-es's sibling: English L1, French L2, both in Latin letters — so a
   * script regex cannot separate the two sides the way it can for hi-en. What CAN be asserted
   * mechanically is everything the briefs (#327) settled as a rule rather than as taste, and it
   * is asserted on the shipped files rather than on the briefs that produced them:
   *
   *   • no `glossEn` (#405): the cue is the English reading and the build forbids a gloss,
   *   • the apostrophe policy: a straight `'` in every L2 slot, so an elided fusion is ONE
   *     spelling and the index key it earns is the one the resolver reproduces,
   *   • the REGISTER decision, held on the content: this course speaks `vous`, so no L2 slot
   *     anywhere — display, form, variation, mistake or pool item — writes a `tu`-register word.
   *     A brief that settles a register and content that quietly breaks it would be worse than
   *     never having decided, so the decision is pinned where the learner would meet it.
   *   • and the register chip, which the schema allows two values for: every sentence is
   *     `neutral`, because politeness above neutral rides `s'il vous plaît` and the `usage` line.
   */
  it('keeps en-fr to the decisions its briefs settled: straight apostrophes, vous (#327)', () => {
    const enFr = MODULE_FILES.filter(([name]) => name.includes('en-fr'));
    /** The `tu`-register words the course names in prose and never writes (#327 decision 1). */
    const TU_REGISTER = new Set(['tu', 'te', 'toi', 'ton', 'ta', 'tes', 'salut']);

    expect(enFr.length, 'the en-fr L1 modules authored so far').toBeGreaterThan(0);
    for (const [file, json] of enFr) {
      const module = parseModule(json, file);

      /** Every L2 slot; `taught` is the same minus the mistake plates, which are wrong by design. */
      const l2Slots: [where: string, text: string][] = [];
      const taught: [where: string, text: string][] = [];
      const both = (where: string, text: string): void => {
        l2Slots.push([where, text]);
        taught.push([where, text]);
      };
      for (const item of module.comprehensionPool) both(item.id, item.display);
      for (const sentence of module.sentences) {
        const at = sentence.id;
        expect(sentence.glossEn, `${at} glossEn`).toBeUndefined();
        // L1 is `neutral` throughout, because politeness above it rides `s'il vous plaît`.
        // L2-M1 (#440) is chartered to open `tu`, and a level that teaches two addresses has to
        // chip which is which — so the flat assertion is scoped to the level that made it.
        if (module.id.startsWith('L1-')) {
          expect(sentence.register, `${at} register`).toBe('neutral');
        }
        both(at, sentence.display);
        for (const variation of sentence.variations ?? []) {
          both(`${at} variation`, variation.display);
        }
        // A `mistake` is deliberately-wrong French — the build never indexes one for the same
        // reason — so it is the one slot allowed to write the register the course refuses,
        // which is exactly what L1-M10's plate does with `et tu ?`.
        if (sentence.mistake !== undefined) {
          l2Slots.push([`${at} mistake`, sentence.mistake.display]);
        }
        for (const word of sentence.deconstruction.words) {
          both(`${at} word`, word.display);
          for (const form of word.forms) both(`${at} form`, form);
        }
      }

      // A curly apostrophe folds to the straight one on the index, but `display` must be one
      // spelling — the briefs' elision policy, held on the file, mistakes included.
      for (const [where, text] of l2Slots) {
        expect(text, `${where}: straight apostrophe only`).not.toMatch(/[’‘]/);
      }
      // Decision 1 was L1's: `tu` stayed out of every display and every forms list, and the
      // briefs named it as what a later level owed. L2-M1 pays it, so the ban holds over L1 only.
      if (module.id.startsWith('L1-')) {
        for (const [where, text] of taught) {
          for (const token of text.toLowerCase().split(/[\s,.?!]+/)) {
            expect(TU_REGISTER.has(token), `${where}: "${token}" is tu-register`).toBe(false);
          }
        }
      }
    }
  });

  /**
   * en-de (#356–#365) is en-fr's closest mirror — English L1, another Latin-script L2 — so the
   * same limit applies: a script regex cannot tell the two sides apart, and "every teaching field
   * is English" stays a review claim rather than an assertion. What CAN be pinned is everything
   * the briefs (#361) settled as a RULE, asserted on the shipped files rather than on the briefs
   * that produced them:
   *
   *   • no `glossEn` (#405): the cue is the English reading and the build forbids a gloss,
   *   • the REGISTER decision, which for German is heavier than en-fr's `vous`: the course speaks
   *     `Sie`, so no L2 slot ANYWHERE — display, form, variation, mistake or pool item — writes a
   *     `du`-register word. Unlike en-fr, the mistake plates are held to it too: a `du` form on a
   *     starred plate is still a `du` form on the learner's screen, and the whole point of the
   *     decision is that the index never carries a shape the course does not teach,
   *   • `Ihr` and `Ihnen` capitalised wherever they are written. `src/engine/surface.ts` folds
   *     case, so the capital is invisible to the index and is the ONLY signal the reader gets;
   *     a lowercase `ihr` / `ihnen` on the page would be a different word (`her` / `their` /
   *     `to them`) landing on the same row,
   *   • the `ß` spellings, never respelled with a double s: `normalizeSurface` does not fold `ß`
   *     (checked in `surface.test.ts`), so `Maße` and `Masse` are two keys and a respelled word is
   *     a word the index cannot reach,
   *   • no ALL-CAPS display, the same seam pointing the other way: an upper-cased `Straße` folds
   *     to a key that no row owns, so a shouted line would resolve to nothing at all,
   *   • and the index seams themselves, which are what first-occurrence-wins makes irreversible:
   *     ONE `sie` row for all three readings and it is L1-M2's, one `der` / `die` / `das` row
   *     apiece and all three are L1-M1's. A rival row for any of them is unreachable by
   *     construction — the earlier module keeps the key — so a second row is a note nobody will
   *     ever be shown, and this is the assertion that catches it at the file level.
   */
  it('keeps en-de to the decisions its briefs settled: Sie, umlauts, one sie row (#361)', () => {
    const enDe = MODULE_FILES.filter(([name]) => name.includes('en-de'));
    /** The `du`-register shapes the course names in prose and never writes (#361 decision 3). */
    const DU_REGISTER = new Set([
      'du',
      'dich',
      'dir',
      'dein',
      'deine',
      'deinen',
      'deinem',
      'deiner',
      'bist',
      'hast',
      'willst',
      'möchtest',
      'kommst',
      'wohnst',
      'sprichst',
      'heißt',
      'hallo',
      'tschüss',
    ]);
    /** Surface → the rows that would open it. Every one of these must have exactly one owner. */
    const owners = new Map<string, Set<string>>();
    /**
     * The umlauts and `ß` this course cannot do without. A blanket `/ae|oe|ue/` ban was tried
     * first and REJECTED: `teuer`, `neue` and `Steuer` all carry a `ue` across a morpheme seam
     * and are correctly spelled, so the regex flags real German. What is checkable, and what the
     * decision actually claims, is that the orthography is WRITTEN rather than transcribed away —
     * a module whose L2 slots hold no umlaut and no `ß` anywhere is a module that spelled around
     * them, exactly as en-ru's stress check reads.
     */
    const UMLAUT_OR_ESZETT = /[äöüÄÖÜß]/;

    expect(enDe.length, 'the en-de L1 modules authored so far').toBeGreaterThan(0);
    for (const [file, json] of enDe) {
      const module = parseModule(json, file);

      /**
       * Every L2 slot, mistake plates included — the register ban reaches all of them. The third
       * element marks the one slot the ß check has to let through: a mistake plate whose whole
       * subject IS the respelling, which has to write `weiss` to strike it out.
       */
      const l2Slots: [where: string, text: string, showsTheRespelling?: boolean][] = [];
      for (const item of module.comprehensionPool) l2Slots.push([item.id, item.display]);
      for (const sentence of module.sentences) {
        const at = sentence.id;
        expect(sentence.glossEn, `${at} glossEn`).toBeUndefined();
        // L1 is `neutral` throughout, because politeness above it rides `bitte` and the `usage`
        // line. L2-M1 (#441) is chartered to open `du`, and a level that teaches two addresses has
        // to chip which is which — so the flat assertion is scoped to the level that made it.
        if (module.id.startsWith('L1-')) {
          expect(sentence.register, `${at} register`).toBe('neutral');
        }
        expect(sentence.sound, `${at} sound`).toMatch(/\S/);
        l2Slots.push([at, sentence.display]);
        for (const variation of sentence.variations ?? []) {
          l2Slots.push([`${at} variation`, variation.display]);
        }
        if (sentence.mistake !== undefined) {
          // L2-M3 (#450) teaches the ß, and the plate that teaches it spells the error out. The
          // `why` carrying a real ß is what separates a deliberate demonstration from an author
          // who typed around the character: a plate that respells without correcting it still fails.
          l2Slots.push([
            `${at} mistake`,
            sentence.mistake.display,
            sentence.mistake.why.includes('ß'),
          ]);
        }
        sentence.deconstruction.words.forEach((word, wordIdx) => {
          const row = `${module.id} ${at} w${wordIdx}`;
          l2Slots.push([`${at} word`, word.display]);
          for (const surface of [word.display, ...word.forms]) {
            l2Slots.push([`${at} form`, surface]);
            const key = normalizeSurface(surface);
            const seats = owners.get(key) ?? new Set<string>();
            seats.add(row);
            owners.set(key, seats);
          }
        });
      }

      for (const [where, text, showsTheRespelling] of l2Slots) {
        for (const raw of text.split(/[\s,.?!]+/)) {
          const token = raw.trim();
          if (token === '') continue;
          // Decision 3 was L1's: `du` and its whole paradigm stayed out of every slot, mistake
          // plates included, and the briefs named it as what a later level owed. L2-M1 pays it, so
          // the ban holds over L1 only.
          if (module.id.startsWith('L1-')) {
            expect(
              DU_REGISTER.has(token.toLowerCase()),
              `${where}: "${token}" is du-register, and this course speaks Sie`,
            ).toBe(false);
          }
          // The capital is the reader's only signal, because the index cannot see it. L2-M2 (#441)
          // opens the POSSESSIVE `ihre` — "her" — which is correctly lowercase and is the one key
          // L1 left free for it, so that word alone leaves the ban when the level that teaches it
          // arrives. Polite `Ihr` and `Ihnen` keep their capitals everywhere.
          const lostCapital = module.id.startsWith('L1-')
            ? ['ihr', 'ihre', 'ihnen']
            : ['ihr', 'ihnen'];
          expect(lostCapital.includes(token), `${where}: "${token}" lost its capital`).toBe(false);
          // An all-caps word folds to a key no row owns — decision 2, pointing the other way.
          expect(
            token.length > 1 && token === token.toUpperCase() && /\p{L}/u.test(token),
            `${where}: "${token}" is all capitals`,
          ).toBe(false);
        }
        if (showsTheRespelling !== true) {
          expect(text, `${where}: ß is never respelled with a double s`).not.toMatch(
            /heisse|heissen|strasse|gross|dreissig|weiss/i,
          );
        }
      }

      // The orthography is WRITTEN, not transcribed away. A blanket /ae|oe|ue/ ban was tried and
      // REJECTED: `teuer`, `neue` and `Steuer` carry a `ue` across a morpheme seam and are
      // correctly spelled, so it flagged real German. What is checkable is that a module's L2
      // slots hold an umlaut or an ß SOMEWHERE — a module with none spelled around them.
      expect(
        l2Slots.some(([, text]) => UMLAUT_OR_ESZETT.test(text)),
        `${file} writes no umlaut and no ß anywhere in its German`,
      ).toBe(true);
    }

    /**
     * **Every surface has ONE owning row, with two named exceptions.**
     *
     * First occurrence wins, so a second row for a surface is a note the word index can never
     * reach — the `का` bug (docs/08-marathi-third-review.md correction 4) in its milder form:
     * milder because both notes here are TRUE of the word, where that bug's second note was false
     * of the sentence in front of the learner. Sentence Detail still renders each sentence's own
     * `deconstruction`, so a duplicated row is read on its own page; it is the "why" tap during
     * practice that resolves to the earlier one.
     *
     * The bar is en-es's and en-fr's, the two courses authored under this briefs discipline:
     * ZERO duplicated surfaces. hi-mr, authored before it, has 13. en-de was written by three
     * authors in parallel who each knew the briefs but not each other's rows, and it landed on
     * six; four were redundant and were dropped.
     *
     * The two that remain are STRUCTURALLY forced, not oversights, and that is why they are
     * listed rather than fixed: each is the only word row on its sentence, and the schema's
     * `words: { minItems: 1 }` forbids a sentence with none. Both are the same word in both
     * seats — `nicht` negating a verb, `Dienstag` naming a weekday — so the note that wins is
     * true of the later use as well; M2's `nicht` note was sharpened at the merge for exactly
     * that reason.
     *
     * `in` is the third and it is kept for the opposite reason: it is the one case where the two
     * seats genuinely teach different things. M1's `Ich wohne in Berlin` is locative; M7's
     * `Ich gehe in den Park` is motion, and the case is what carries the difference. Dropping
     * M7's row was tried and reverted — it left the motion lesson with no row on its own page,
     * and sent a learner tapping `in` to a note about standing still. Both rows stay, and M1's
     * note (the one the index resolves to) now names both seats.
     *
     * A FOURTH entry appearing here is a real defect, which is what this list is for.
     */
    const FORCED_DUPLICATES = new Set(['nicht', 'dienstag', 'in']);
    for (const [key, seats] of owners) {
      if (FORCED_DUPLICATES.has(key)) continue;
      expect(
        [...seats].length,
        `"${key}" is opened by more than one row: ${[...seats].join(' | ')}`,
      ).toBe(1);
    }

    // The seams. One row apiece, on the module the briefs named, or the later note is unreachable.
    for (const [key, module] of [
      ['sie', 'L1-M2'],
      ['der', 'L1-M1'],
      ['die', 'L1-M1'],
      ['das', 'L1-M1'],
    ] as const) {
      const seats = [...(owners.get(key) ?? new Set<string>())];
      expect(seats.length, `"${key}" must have exactly one word row: ${seats.join(' | ')}`).toBe(1);
      expect(seats[0], `"${key}" is ${module}'s`).toContain(module);
    }
  });
});

describe('Levels against the ladders that exist', () => {
  it.each(LEVELS_FILES)('%s is a Levels, keys and all', (file, json) => {
    const levels: Levels = parseLevels(json, file);

    // Five levels of ten, every course (docs/48-five-level-ladder-plan.md §2): the level ids in
    // order, and each level's ten rungs in order under it. The engine climbs whatever the list says,
    // so nothing in `src/` would notice a ladder that lost a level or mis-numbered a rung.
    expect(levels.levels.map((level) => level.id)).toEqual(['L1', 'L2', 'L3', 'L4', 'L5']);
    for (const level of levels.levels) {
      expect(
        level.modules.map((module) => module.id),
        `${file} ${level.id}`,
      ).toEqual(Array.from({ length: 10 }, (_, i) => `${level.id}-M${i + 1}`));
    }
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
