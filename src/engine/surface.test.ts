import { describe, expect, it } from 'vitest';
import {
  matchSurfaces,
  normalizeSurface,
  surfaceIndexKeys,
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

  it('leaves the inside of a word alone', () => {
    expect(normalizeSurface('al-hind')).toBe('al-hind');
    expect(normalizeSurface("al-mā'")).toBe("al-mā'");
    expect(normalizeSurface("don't")).toBe("don't");
  });

  it('folds case: `display` carries sentence case, the word rows citation case (#116, [Q3])', () => {
    expect(normalizeSurface('Soy')).toBe(normalizeSurface('soy'));
    expect(normalizeSurface('Me gusta')).toBe(normalizeSurface('me gusta'));
    expect(normalizeSurface('Ismī')).toBe(normalizeSurface('ismī'));
    // The fold never touches diacritics: sí (yes) and si (if) are two Spanish words.
    expect(normalizeSurface('Sí')).not.toBe(normalizeSurface('si'));
  });

  it('folds each apostrophe class onto one character (#116, [Q3])', () => {
    // Right-side apostrophes — typographic ’, modifier ʼ, hamza ʾ — all fold to plain '.
    expect(normalizeSurface('māʾ')).toBe("mā'");
    expect(normalizeSurface('mā’')).toBe("mā'");
    expect(normalizeSurface('māʼ')).toBe("mā'");
    expect(normalizeSurface('don’t')).toBe("don't");
    // The left quote is the typographic stand-in for ʿayn, a letter — never stripped.
    expect(normalizeSurface('ʿarabī')).toBe('ʿarabī');
    expect(normalizeSurface('‘arabī')).toBe('ʿarabī');
    // The folded ' survives at a word edge, exactly where hamza and elision live.
    expect(normalizeSurface("'tis")).toBe("'tis");
  });

  it('never merges the hamza class with the ʿayn class — they are distinct consonants', () => {
    expect(normalizeSurface('saʾal')).not.toBe(normalizeSurface('saʿal'));
    expect(normalizeSurface("sa'al")).toBe(normalizeSurface('saʾal'));
    expect(normalizeSurface('sa‘al')).toBe(normalizeSurface('saʿal'));
  });

  it('never folds a hyphen into a space: `al-qahwa` is one token, `al qahwa` is two', () => {
    expect(normalizeSurface('al-qahwa')).not.toBe(normalizeSurface('al qahwa'));
    expect(surfaceSpan('al-qahwa')).toBe(1);
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

  it('counts a multi-token surface honestly', () => {
    expect(surfaceSpan('आहे')).toBe(1);
    expect(surfaceSpan('Me llamo')).toBe(2);
  });
});

describe('surfaceIndexKeys', () => {
  it('grants a hyphenated surface its parts too — `al-qahwa` answers for a bare `qahwa`', () => {
    expect(surfaceIndexKeys('al-qahwa')).toEqual(['al-qahwa', 'al', 'qahwa']);
    expect(surfaceIndexKeys('al-hind')).toEqual(['al-hind', 'al', 'hind']);
  });

  it('is just the surface itself when there is no hyphen in it', () => {
    expect(surfaceIndexKeys('आहे')).toEqual(['आहे']);
    expect(surfaceIndexKeys('me llamo')).toEqual(['me llamo']);
  });

  it('drops empty parts and repeats — a stray edge hyphen never mints an empty key', () => {
    expect(surfaceIndexKeys('al-')).toEqual(['al-', 'al']);
    expect(surfaceIndexKeys('bayt-bayt')).toEqual(['bayt-bayt', 'bayt']);
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
