import { describe, expect, it } from 'vitest';
import {
  matchSurfaces,
  normalizeSurface,
  surfaceSpan,
  tokenizeSurface,
  type SurfaceLookup,
} from './surface.ts';

/** A lookup over a literal surface list, with the span the emitter would have computed. */
function lookupOf(...surfaces: string[]): SurfaceLookup {
  const set = new Set(surfaces);
  return {
    maxSpan: Math.max(1, ...surfaces.map(surfaceSpan)),
    has: (surface) => set.has(surface),
  };
}

describe('normalizeSurface', () => {
  it('folds the two spellings of a nukta letter onto one key (NFC)', () => {
    // क़ precomposed (U+0958) vs क + nukta (U+0915 U+093C) — one word, two spellings.
    // Written as escapes on purpose: the two are indistinguishable on screen.
    const precomposed = '\u0958';
    const decomposed = '\u0915\u093C';

    expect(precomposed).not.toBe(decomposed);
    expect(normalizeSurface(precomposed)).toBe(normalizeSurface(decomposed));
    expect(normalizeSurface('caf\u00E9')).toBe(normalizeSurface('cafe\u0301'));
  });

  it('strips the sentence punctuation `display` carries from L1-M2 on', () => {
    expect(normalizeSurface('आहेस?')).toBe('आहेस');
    expect(normalizeSurface('नमस्कार,')).toBe('नमस्कार');
    expect(normalizeSurface('¿Quiero?')).toBe('Quiero');
    expect(normalizeSurface('«hola».')).toBe('hola');
    expect(normalizeSurface('आहे।')).toBe('आहे');
  });

  it('leaves the inside of a word alone', () => {
    expect(normalizeSurface('al-Hind')).toBe('al-Hind');
    expect(normalizeSurface('al-māʾ')).toBe('al-māʾ');
    expect(normalizeSurface("don't")).toBe("don't");
  });

  it('keeps case and the apostrophe class — #116 owns both, and has not ruled yet', () => {
    expect(normalizeSurface('Soy')).not.toBe(normalizeSurface('soy'));
    expect(normalizeSurface('Me gusta')).not.toBe(normalizeSurface('me gusta'));
    // ʾ/ʿ are modifier LETTERS, and '/’ are punctuation we deliberately do not strip.
    expect(normalizeSurface('ʾan')).toBe('ʾan');
    expect(normalizeSurface('ʿayn')).toBe('ʿayn');
    expect(normalizeSurface("'tis")).toBe("'tis");
  });

  it('is empty for a string with nothing indexable in it', () => {
    expect(normalizeSurface('—')).toBe('');
    expect(normalizeSurface('  ,  ')).toBe('');
    expect(normalizeSurface('')).toBe('');
  });

  it('is exactly its own tokens joined — the invariant that keeps build and runtime equal', () => {
    for (const text of ['तू कसा आहेस?', ' Me  llamo\tRohan ', 'se llama Rohan', 'al-Hind']) {
      expect(normalizeSurface(text)).toBe(tokenizeSurface(text).join(' '));
    }
  });
});

describe('tokenizeSurface', () => {
  it('splits on whitespace, normalises each token and drops the empties', () => {
    expect(tokenizeSurface('नमस्कार, मी रोहन आहे')).toEqual(['नमस्कार', 'मी', 'रोहन', 'आहे']);
    expect(tokenizeSurface('  Me  llamo\nRohan  ')).toEqual(['Me', 'llamo', 'Rohan']);
    expect(tokenizeSurface('sí — claro')).toEqual(['sí', 'claro']);
    expect(tokenizeSurface('   ')).toEqual([]);
  });

  it('counts a multi-token surface honestly', () => {
    expect(surfaceSpan('आहे')).toBe(1);
    expect(surfaceSpan('Me llamo')).toBe(2);
  });
});

describe('matchSurfaces', () => {
  it('takes the longest surface first, so `se llama` beats two unknown words', () => {
    const matches = matchSurfaces(
      tokenizeSurface('se llama Rohan'),
      lookupOf('se llama', 'Rohan', 'se'),
    );

    expect(matches).toEqual([
      { surface: 'se llama', start: 0, span: 2, resolved: true },
      { surface: 'Rohan', start: 2, span: 1, resolved: true },
    ]);
  });

  it('reports every unresolved token, not just the first, and keeps walking', () => {
    const matches = matchSurfaces(tokenizeSurface('मी नमस्ते रोहन हाँ'), lookupOf('मी', 'रोहन'));

    expect(matches.filter((match) => !match.resolved)).toEqual([
      { surface: 'नमस्ते', start: 1, span: 1, resolved: false },
      { surface: 'हाँ', start: 3, span: 1, resolved: false },
    ]);
  });

  it('never spans further than the index says it can', () => {
    const singleWordIndex: SurfaceLookup = { maxSpan: 1, has: (s) => s === 'se llama' };

    expect(matchSurfaces(['se', 'llama'], singleWordIndex).every((m) => m.resolved)).toBe(false);
  });

  it('has nothing to say about an empty token list', () => {
    expect(matchSurfaces([], lookupOf('मी'))).toEqual([]);
  });
});
