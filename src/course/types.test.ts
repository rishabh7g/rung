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
  it('finds all 80 of them — eight full L1 ladders, en-de included (#362–#364)', () => {
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
      // en-de was authored a rung at a time — #362 M1-M2, #363 M3-M5, #364 M6-M10 — and this
      // list saw it half-written twice on the way. It is whole now: eight courses, ten rungs
      // each, and the eighth still behind `fixture: true` until #365.
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
   * `glossEn` is REQUIRED on every sentence — #268's exemption is for a course whose L2 IS
   * English, and Russian is not one; the build enforces it and this pins it in the tree.
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
        // The gloss is mandatory here: the L2 is not English, so #268's exemption does not reach.
        expect(sentence.glossEn, `${at} glossEn`).toMatch(latin);
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
   * en-fr (#326–#331) is en-es's sibling: English L1, French L2, both in Latin letters — so a
   * script regex cannot separate the two sides the way it can for hi-en. What CAN be asserted
   * mechanically is everything the briefs (#327) settled as a rule rather than as taste, and it
   * is asserted on the shipped files rather than on the briefs that produced them:
   *
   *   • `glossEn` on every sentence — the L2 is not English, so #268's exemption does not apply,
   *   • the apostrophe policy: a straight `'` in every L2 slot, so an elided fusion is ONE
   *     spelling and the index key it earns is the one the resolver reproduces,
   *   • the REGISTER decision, held on the content: this course speaks `vous`, so no L2 slot
   *     anywhere — display, form, variation, mistake or pool item — writes a `tu`-register word.
   *     A brief that settles a register and content that quietly breaks it would be worse than
   *     never having decided, so the decision is pinned where the learner would meet it.
   *   • and the register chip, which the schema allows two values for: every sentence is
   *     `neutral`, because politeness above neutral rides `s'il vous plaît` and the `usage` line.
   */
  it('keeps en-fr to the decisions its briefs settled: glossEn, straight apostrophes, vous (#327)', () => {
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
        expect(sentence.glossEn, `${at} glossEn`).toMatch(/\S/);
        expect(sentence.register, `${at} register`).toBe('neutral');
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
      for (const [where, text] of taught) {
        for (const token of text.toLowerCase().split(/[\s,.?!]+/)) {
          expect(TU_REGISTER.has(token), `${where}: "${token}" is tu-register`).toBe(false);
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
   *   • `glossEn` on every sentence — the L2 is not English, so #268's exemption misses this
   *     course entirely and the build would fail without it,
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
  it('keeps en-de to the decisions its briefs settled: glossEn, Sie, umlauts, one sie row (#361)', () => {
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

      /** Every L2 slot, mistake plates included — the register ban reaches all of them. */
      const l2Slots: [where: string, text: string][] = [];
      for (const item of module.comprehensionPool) l2Slots.push([item.id, item.display]);
      for (const sentence of module.sentences) {
        const at = sentence.id;
        expect(sentence.glossEn, `${at} glossEn`).toMatch(/\S/);
        expect(sentence.register, `${at} register`).toBe('neutral');
        expect(sentence.sound, `${at} sound`).toMatch(/\S/);
        l2Slots.push([at, sentence.display]);
        for (const variation of sentence.variations ?? []) {
          l2Slots.push([`${at} variation`, variation.display]);
        }
        if (sentence.mistake !== undefined) {
          l2Slots.push([`${at} mistake`, sentence.mistake.display]);
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

      for (const [where, text] of l2Slots) {
        for (const raw of text.split(/[\s,.?!]+/)) {
          const token = raw.trim();
          if (token === '') continue;
          expect(
            DU_REGISTER.has(token.toLowerCase()),
            `${where}: "${token}" is du-register, and this course speaks Sie`,
          ).toBe(false);
          // The capital is the reader's only signal, because the index cannot see it.
          expect(
            ['ihr', 'ihre', 'ihnen'].includes(token),
            `${where}: "${token}" lost its capital`,
          ).toBe(false);
          // An all-caps word folds to a key no row owns — decision 2, pointing the other way.
          expect(
            token.length > 1 && token === token.toUpperCase() && /\p{L}/u.test(token),
            `${where}: "${token}" is all capitals`,
          ).toBe(false);
        }
        expect(text, `${where}: ß is never respelled with a double s`).not.toMatch(
          /heisse|heissen|strasse|gross|dreissig|weiss/i,
        );
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
