import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import {
  interpolate,
  loadStrings,
  parseStrings,
  resetStringsCache,
  StringsError,
  type Strings,
} from './strings.ts';
import { STRINGS_KEYS, STRINGS_PLACEHOLDERS } from './stringsKeys.ts';
import { completeStrings, stringValue } from '../test/courseStrings.ts';

/** A fetch that serves one payload per URL and counts what was asked for. */
function mockFetch(payload: unknown, status = 200) {
  const fetchMock = vi.fn(() => Promise.resolve(new Response(JSON.stringify(payload), { status })));
  vi.stubGlobal('fetch', fetchMock);
  return fetchMock;
}

beforeEach(() => {
  resetStringsCache();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('loadStrings', () => {
  it('fetches the course bundle and flattens it onto the canonical dot-paths', async () => {
    const fetchMock = mockFetch(completeStrings('hi-mr'));

    const strings = await loadStrings('hi-mr');

    expect(fetchMock).toHaveBeenCalledWith('/content/hi-mr/strings.json');
    expect(strings['ritual.check.copy']).toBe(stringValue('hi-mr', 'ritual.check.copy'));
    expect(Object.keys(strings).sort()).toEqual([...STRINGS_KEYS].sort());
  });

  it('fetches once per course, however many callers ask', async () => {
    const fetchMock = mockFetch(completeStrings('hi-mr'));

    const [first, second] = await Promise.all([loadStrings('hi-mr'), loadStrings('hi-mr')]);
    const third = await loadStrings('hi-mr');

    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(second).toBe(first);
    expect(third).toBe(first);
  });

  it('caches per course, so a second course is a second fetch', async () => {
    const fetchMock = vi.fn((input: RequestInfo | URL) => {
      const courseId = /content\/([^/]+)\//.exec(String(input))?.[1] ?? '';
      return Promise.resolve(
        new Response(JSON.stringify(completeStrings(courseId)), { status: 200 }),
      );
    });
    vi.stubGlobal('fetch', fetchMock);

    expect((await loadStrings('hi-mr')).cueLabel).toBe(stringValue('hi-mr', 'cueLabel'));
    expect((await loadStrings('en-ar')).cueLabel).toBe(stringValue('en-ar', 'cueLabel'));
    await loadStrings('hi-mr');

    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('does not cache a failure — an offline first load may be retried', async () => {
    const fetchMock = vi
      .fn()
      .mockRejectedValueOnce(new TypeError('Failed to fetch'))
      .mockResolvedValueOnce(
        new Response(JSON.stringify(completeStrings('hi-mr')), { status: 200 }),
      );
    vi.stubGlobal('fetch', fetchMock);

    await expect(loadStrings('hi-mr')).rejects.toThrow(StringsError);
    await expect(loadStrings('hi-mr')).resolves.toHaveProperty('cueLabel');
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it('reports a missing bundle as a content failure, not a silent empty one', async () => {
    mockFetch({}, 404);

    await expect(loadStrings('hi-mr')).rejects.toThrow(/HTTP 404/);
  });
});

describe('parseStrings', () => {
  it('reads only the canonical list — an extra key is the build’s business, not a boot failure', () => {
    const bundle = { ...completeStrings('hi-mr'), notAKey: 'ignored' };

    expect(Object.keys(parseStrings(bundle))).not.toContain('notAKey');
  });

  it('rejects a bundle whose key is missing, blank, or not a string', () => {
    const missing = completeStrings('hi-mr');
    delete missing['cueLabel'];
    const blank = { ...completeStrings('hi-mr'), cueLabel: '   ' };
    const wrongType = { ...completeStrings('hi-mr'), ordinal: 7 };

    expect(() => parseStrings(missing)).toThrow(/no usable value for cueLabel/);
    expect(() => parseStrings(blank)).toThrow(/no usable value for cueLabel/);
    expect(() => parseStrings(wrongType)).toThrow(/no usable value for ordinal/);
  });

  it('names every unusable key at once, so one boot names the whole gap', () => {
    expect(() => parseStrings({}, 'hi-mr/strings.json')).toThrow(
      `hi-mr/strings.json: incomplete bundle — no usable value for ${STRINGS_KEYS.join(', ')}`,
    );
  });

  it('rejects a file that is not an object of keys', () => {
    expect(() => parseStrings([completeStrings('hi-mr')])).toThrow(StringsError);
    expect(() => parseStrings('cueLabel')).toThrow(/must be a JSON object/);
  });
});

describe('interpolate', () => {
  it('fills a placeholder by name', () => {
    expect(interpolate('my {ordinal} sentence', { ordinal: '3rd' })).toBe('my 3rd sentence');
  });

  it('takes numbers as well as strings — ordinal is given a count', () => {
    expect(interpolate('{n}th', { n: 3 })).toBe('3th');
  });

  it('fills every placeholder of a value, including repeats', () => {
    const constraint = 'not one of these {sentenceCount}, at most {maxWords} — {maxWords}';

    expect(interpolate(constraint, { sentenceCount: 10, maxWords: 12 })).toBe(
      'not one of these 10, at most 12 — 12',
    );
  });

  it('takes both course labels for the switch toast, in either order', () => {
    const toast = stringValue('hi-mr', 'switchToast');

    expect(interpolate(toast, { to: 'english → arabic', from: 'hindi → marathi' })).toBe(
      'hi-mr switchToast english → arabic hindi → marathi',
    );
  });

  it('leaves a placeholder with no value verbatim, and says so — a gap is never blanked', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

    expect(interpolate('my {ordinal} sentence', {})).toBe('my {ordinal} sentence');
    expect(warn).toHaveBeenCalledWith(expect.stringContaining('{ordinal}'));
  });

  it('ignores values the template does not mention, and templates with no placeholders', () => {
    expect(interpolate('all done', { n: 3 })).toBe('all done');
  });

  it('fills every placeholder the contract declares, across all 26 keys', () => {
    const values = {
      sentenceCount: 10,
      maxWords: 12,
      ordinal: '3rd',
      n: 3,
      nextModule: 'M2',
      to: 'english → arabic',
      from: 'hindi → marathi',
    };

    for (const key of STRINGS_KEYS) {
      const filled = interpolate(stringValue('hi-mr', key), values);

      // Nothing left in braces: `values` covers the union of STRINGS_PLACEHOLDERS.
      expect(filled, key).not.toMatch(/[{}]/);
      for (const placeholder of STRINGS_PLACEHOLDERS[key]) {
        expect(filled, `${key} ${placeholder}`).toContain(
          String(values[placeholder.slice(1, -1) as keyof typeof values]),
        );
      }
    }
  });
});

describe('Strings', () => {
  it('is the canonical list, non-optional — a screen never checks for a word', () => {
    const strings: Strings = parseStrings(completeStrings('hi-mr'));

    // Non-optional access: `.trim()` would not compile if the value could be undefined.
    expect(strings['ritual.confirm.holdLabel'].trim()).not.toBe('');
  });
});
