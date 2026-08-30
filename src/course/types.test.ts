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

/** Ladder position of a module id, so `L1-M10` sorts after `L1-M2` rather than before it. */
function moduleNumber(id: string): number {
  return Number(/-M(\d+)$/.exec(id)?.[1] ?? 0);
}

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
  it('finds all 50 of them — hi-mr, en-es, en-ar, hi-en and en-it L1-M1..M10', () => {
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
    const romanized = MODULE_FILES.filter(([name]) => name.includes('en-ar'));

    expect(romanized.length, 'the en-ar modules this rule is written for').toBe(10);
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
   * the Italian it is explaining; quoting is not switching. `glossEn` is REQUIRED on every
   * sentence (the L2 is not English, so #268's exemption does not apply), and the briefs' two
   * orthographic decisions are asserted here because the index cannot: the apostrophe is always
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
        // The L2 is not English, so the gloss is never optional here (#268 / checkGlossEn).
        expect(sentence.glossEn, `${at} glossEn`).toMatch(/\S/);
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
    const ladder = MODULE_FILES.filter(([name]) => name.includes('en-it'))
      .map(([file, json]) => [file, parseModule(json, file)] as const)
      .sort(([, a], [, b]) => moduleNumber(a.id) - moduleNumber(b.id));
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
   * is one spelling), `it's` (M7) is the only `'s` any display writes, and no L1 module writes a
   * possessive `'s`.
   */
  it('keeps the English course the other way round: display is English, every teaching field Hindi (#270)', () => {
    const hiEn = MODULE_FILES.filter(([name]) => name.includes('hi-en'));
    const devanagari = /\p{Script=Devanagari}/u;
    const latinOnly = /^[^\p{Script=Devanagari}]+$/u;

    expect(
      hiEn.length,
      'the ten hi-en L1 modules (#270: L1-M1..M2; #271: L1-M3..M5; #272: L1-M6..M10)',
    ).toBe(10);
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
        // `it's` (M7's contraction row) is the one sanctioned `'s`; a possessive `'s` never is.
        expect(sentence.display, `${at} straight apostrophe, no possessive`).not.toMatch(
          /’|(?<![Ii]t)'s\b/,
        );
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
