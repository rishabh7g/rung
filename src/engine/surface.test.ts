import { describe, expect, it } from 'vitest';
import {
  matchSurfaces,
  normalizeSurface,
  surfaceKeys,
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
    expect(normalizeSurface('¿Quiero?')).toBe('quiero');
    expect(normalizeSurface('«hola».')).toBe('hola');
    expect(normalizeSurface('आहे।')).toBe('आहे');
  });

  it('folds case, so a sentence-initial capital never loses its "why" (#116)', () => {
    expect(normalizeSurface('Soy')).toBe(normalizeSurface('soy'));
    expect(normalizeSurface('Me gusta')).toBe(normalizeSurface('me gusta'));
    expect(normalizeSurface('Ismī')).toBe(normalizeSurface('ismī'));
    // …but never two genuinely different words: diacritics are part of the word.
    expect(normalizeSurface('urīd')).not.toBe(normalizeSurface('urid'));
  });

  it('folds each apostrophe class onto its modifier letter — and never one onto the other (#116)', () => {
    // ' U+0027, ’ U+2019, ʼ U+02BC all mean the hamza ʾ U+02BE …
    for (const mark of ["'", '’', 'ʼ']) {
      expect(normalizeSurface(`mā${mark}`)).toBe('māʾ');
    }
    // … and ‘ U+2018, ʻ U+02BB mean the ʿayn ʿ U+02BF. Edges included: these are letters here.
    for (const mark of ['‘', 'ʻ']) {
      expect(normalizeSurface(`${mark}arabī`)).toBe('ʿarabī');
    }
    // The negative guard: hamza and ʿayn are distinct consonants — folding never merges them.
    expect(normalizeSurface('ʾalam')).not.toBe(normalizeSurface('ʿalam'));
    // A stripped apostrophe would also merge distinct words; it never is.
    expect(normalizeSurface('māʾ')).not.toBe(normalizeSurface('mā'));
    expect(normalizeSurface("don't")).toBe('donʾt');
  });

  it('treats a hyphen as a token boundary, so al- prefixes match like multi-word surfaces (#116)', () => {
    expect(normalizeSurface('al-Hind')).toBe('al hind');
    expect(normalizeSurface('al-māʾ')).toBe('al māʾ');
    expect(surfaceSpan('al-Hind')).toBe(2);
    // The boundary never merges the pieces into one key that plain words could collide with.
    expect(normalizeSurface('al-Hind')).toBe(normalizeSurface('al Hind'));
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
    expect(tokenizeSurface('  Me  llamo\nRohan  ')).toEqual(['me', 'llamo', 'rohan']);
    expect(tokenizeSurface('sí — claro')).toEqual(['sí', 'claro']);
    expect(tokenizeSurface('   ')).toEqual([]);
  });

  it('splits at hyphens too, so a hyphenated compound is its parts (#116)', () => {
    expect(tokenizeSurface('anā min al-Hind')).toEqual(['anā', 'min', 'al', 'hind']);
    expect(tokenizeSurface('uḥibb al-qahwa.')).toEqual(['uḥibb', 'al', 'qahwa']);
  });

  it('counts a multi-token surface honestly', () => {
    expect(surfaceSpan('आहे')).toBe(1);
    expect(surfaceSpan('Me llamo')).toBe(2);
  });
});

describe('surfaceKeys', () => {
  it('yields the joined surface plus each hyphen part — the emitter indexes all of them', () => {
    expect(surfaceKeys('al-Hind')).toEqual(['al hind', 'al', 'hind']);
    expect(surfaceKeys('al-māʾ')).toEqual(['al māʾ', 'al', 'māʾ']);
  });

  it('yields NO parts for a spaced surface — `llamo` alone is not taught', () => {
    expect(surfaceKeys('Me llamo')).toEqual(['me llamo']);
    expect(surfaceKeys('आहे')).toEqual(['आहे']);
  });

  it('is empty when there is nothing indexable', () => {
    expect(surfaceKeys('—')).toEqual([]);
    expect(surfaceKeys('')).toEqual([]);
  });
});

describe('matchSurfaces', () => {
  it('takes the longest surface first, so `se llama` beats two unknown words', () => {
    const matches = matchSurfaces(
      tokenizeSurface('se llama Rohan'),
      lookupOf('se llama', 'rohan', 'se'),
    );

    expect(matches).toEqual([
      { surface: 'se llama', start: 0, span: 2, resolved: true },
      { surface: 'rohan', start: 2, span: 1, resolved: true },
    ]);
  });

  it('prefers a hyphenated compound whole, and falls back to its parts (#116)', () => {
    // `al-hind` is indexed joined AND as parts; `al-bayt` is not indexed at all, so only the
    // taught article prefix resolves — the untaught noun is reported, never guessed.
    const lookup = lookupOf('al hind', 'al', 'hind', 'min');

    expect(matchSurfaces(tokenizeSurface('min al-Hind'), lookup)).toEqual([
      { surface: 'min', start: 0, span: 1, resolved: true },
      { surface: 'al hind', start: 1, span: 2, resolved: true },
    ]);
    expect(matchSurfaces(tokenizeSurface('min al-bayt'), lookup)).toEqual([
      { surface: 'min', start: 0, span: 1, resolved: true },
      { surface: 'al', start: 1, span: 1, resolved: true },
      { surface: 'bayt', start: 2, span: 1, resolved: false },
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
