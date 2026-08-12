/**
 * The "why" resolver (#94) — four promises:
 *
 *   • a surface that is taught resolves to the row that teaches it, and one that is not resolves
 *     to `null` rather than to a guess,
 *   • the walk is GREEDY: `Me llamo` is one row, never two unknown words,
 *   • an unresolvable span is dropped, not reported — the panel renders what exists (#61),
 *   • the emitted index passes straight in, so the engine's shape and the file's cannot drift.
 *
 * The index fixture is the real en-es L1-M1's, trimmed (`src/test/courseContent.ts`): `maxSpan: 2`
 * is a fact about that course's content, not a number invented for a test.
 */
import { describe, expect, it } from 'vitest';
import { indexFixture } from '../test/courseContent.ts';
import type { WordIndex as EmittedIndex } from '../course/types.ts';
import { resolve, resolveSentence, type WordIndex } from './wordIndex.ts';

/** The emitted file, exactly as `loadIndex` hands it over — assignable, which is the point. */
const EMITTED: EmittedIndex = indexFixture('en-es');
const INDEX: WordIndex = EMITTED;

/** hi-mr's shape: single-token surfaces only, so `maxSpan` is 1 and no pair can ever match. */
const NATIVE: WordIndex = {
  maxSpan: 1,
  surfaces: {
    मी: { moduleId: 'L1-M1', sentenceId: 'L1-M1-S01', wordIdx: 0 },
    रोहन: { moduleId: 'L1-M1', sentenceId: 'L1-M1-S01', wordIdx: 1 },
    आहे: { moduleId: 'L1-M1', sentenceId: 'L1-M1-S01', wordIdx: 2 },
  },
};

describe('resolve', () => {
  it('answers with the word row that teaches the surface', () => {
    expect(resolve('Soy', INDEX)).toEqual({
      moduleId: 'L1-M1',
      sentenceId: 'L1-M1-S02',
      wordIdx: 0,
    });
  });

  it('is null for a surface the course has not taught — never a guess', () => {
    // A proper noun the content carries and no word row teaches (#61) — the everyday miss.
    expect(resolve('Priya', INDEX)).toBeNull();
    expect(resolve('llamo', INDEX)).toBeNull(); // half of `Me llamo` is not a surface
  });

  it('normalises the way the emitter did — the same rule, imported, never copied', () => {
    // NFC, edge punctuation and the #116 folds are `normalizeSurface`'s (#75, [Q3]): a raw
    // sentence token resolves however the sentence happened to dress it.
    expect(resolve('¿Soy?', INDEX)).toEqual(resolve('Soy', INDEX));
    expect(resolve('  Me   llamo ', INDEX)).toEqual(resolve('Me llamo', INDEX));
    // Case folds ([Q3]): mid-sentence `soy` finds the row taught as `Soy`.
    expect(resolve('soy', INDEX)).toEqual(resolve('Soy', INDEX));
    expect(resolve('soy', INDEX)).not.toBeNull();
  });

  it('is null for a string with nothing indexable in it', () => {
    expect(resolve('—', INDEX)).toBeNull();
    expect(resolve('   ', INDEX)).toBeNull();
    expect(resolve('', INDEX)).toBeNull();
  });

  it('reads the table, not the prototype chain', () => {
    // `surfaces` comes out of JSON.parse, so `constructor` and `toString` are inherited members.
    expect(resolve('constructor', INDEX)).toBeNull();
    expect(resolve('toString', INDEX)).toBeNull();
  });
});

describe('resolveSentence', () => {
  it('takes the longest surface first: `Me llamo` is ONE row, not two', () => {
    const spans = resolveSentence('Me llamo Rohan', INDEX);

    expect(spans).toEqual([
      {
        surface: 'me llamo',
        start: 0,
        span: 2,
        ref: { moduleId: 'L1-M1', sentenceId: 'L1-M1-S01', wordIdx: 0 },
      },
      {
        surface: 'rohan',
        start: 2,
        span: 1,
        ref: { moduleId: 'L1-M1', sentenceId: 'L1-M1-S01', wordIdx: 1 },
      },
    ]);
  });

  it('drops what it cannot resolve and keeps walking — a proper noun costs one row, not the panel', () => {
    const spans = resolveSentence('Me llamo Priya', INDEX);

    expect(spans.map((span) => span.surface)).toEqual(['me llamo']);
  });

  it('finds only what was taught in a wrong-L2 line — a mistake is never indexed (#75)', () => {
    // The fixture's own `mistake.display`: the name is a word row, `Mi nombre es` is not — the
    // emitter indexes neither mistakes nor variations, because they are wrong L2 by design.
    expect(resolveSentence('Mi nombre es Rohan', INDEX).map((span) => span.surface)).toEqual([
      'rohan',
    ]);
  });

  it('is empty when nothing at all resolves, and for a sentence with no tokens in it', () => {
    expect(resolveSentence('Mi nombre es', INDEX)).toEqual([]);
    expect(resolveSentence('   —  ', INDEX)).toEqual([]);
    expect(resolveSentence('', INDEX)).toEqual([]);
  });

  it('never spans further than the index says it can', () => {
    // The same two words in a course whose longest surface is one token: two rows, not a pair.
    const single: WordIndex = { maxSpan: 1, surfaces: INDEX.surfaces };

    expect(resolveSentence('Me llamo Rohan', single).map((span) => span.surface)).toEqual([
      'rohan',
    ]);
  });

  it('resolves a native-script sentence through its own punctuation', () => {
    expect(resolveSentence('मी रोहन आहे.', NATIVE).map((span) => span.surface)).toEqual([
      'मी',
      'रोहन',
      'आहे',
    ]);
  });

  it('points every row at the module that TAUGHT it, which need not be the one on screen', () => {
    // The index is cumulative (#75): practising L1-M2, most refs name L1-M1 — the panel loads it.
    const cumulative: WordIndex = {
      maxSpan: 1,
      surfaces: {
        मी: { moduleId: 'L1-M1', sentenceId: 'L1-M1-S01', wordIdx: 0 },
        नमस्कार: { moduleId: 'L1-M2', sentenceId: 'L1-M2-S01', wordIdx: 0 },
      },
    };

    expect(resolveSentence('नमस्कार, मी', cumulative).map((span) => span.ref.moduleId)).toEqual([
      'L1-M2',
      'L1-M1',
    ]);
  });
});
