/**
 * The per-course subsetter (#113) — `tools/font-subset.ts`.
 *
 * Three things are worth a guard here. The harvest: course text lives in JSON string VALUES
 * anywhere in the emitted tree, and a collector that missed a nesting level would quietly ship a
 * font without those glyphs — tofu with no error anywhere, the exact failure [D15] names. The
 * split: each script target must take precisely the characters its `unicode-range` routes to it.
 * And the wiring: `src/fonts/mukta.css` is committed while the woff2 are generated, so the css's
 * urls and the generator's output list are two copies of one fact — this file holds them equal,
 * the same shape as `tools/pwa.test.ts` holding the manifest to the checklist.
 *
 * One test runs the real subsetter (HarfBuzz wasm) against the real @fontsource file — not to
 * assert exact bytes, which would rot with every font release, but that the output is woff2 and
 * materially smaller than its source. Glyph-level truth (conjuncts shaping, no tofu at 18px) is
 * a browser question: `/dev/type`, recorded in docs/05-perf-notes.md.
 *
 * `@vitest-environment node` — `subset-font`'s woff2 codec (emscripten wasm) type-checks the
 * buffers it is handed and jsdom's globals fail that check; nothing here touches a DOM.
 */
// @vitest-environment node
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import subsetFont from 'subset-font';
import {
  collectStrings,
  coveredChars,
  subsetText,
  MUKTA_WEIGHTS,
  OUTPUT_FILES,
  TARGETS,
} from './font-subset.ts';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MUKTA_CSS = readFileSync(path.join(REPO_ROOT, 'src', 'fonts', 'mukta.css'), 'utf8');
const MAIN_TSX = readFileSync(path.join(REPO_ROOT, 'src', 'main.tsx'), 'utf8');

const devanagari = TARGETS.find((target) => target.subset === 'devanagari')!;
const latin = TARGETS.find((target) => target.subset === 'latin')!;

describe('the harvest', () => {
  it('collects every string value at any depth, and nothing else', () => {
    const doc = {
      id: 'L1-M1',
      lines: [{ surface: 'पहला', gloss: { text: 'first', note: null } }],
      count: 3,
      nested: [['दूसरा']],
    };

    expect(collectStrings(doc)).toEqual(['L1-M1', 'पहला', 'first', 'दूसरा']);
  });

  it('routes each character to the target whose unicode-range claims it', () => {
    const text = 'क3a।';

    expect(coveredChars(text, devanagari)).toBe('क।');
    expect(coveredChars(text, latin)).toBe('3a');
  });

  it('deduplicates and sorts, so the same content always yields the same subset input', () => {
    expect(coveredChars('बबअअ', devanagari)).toBe('अब');
  });
});

describe('the subset text', () => {
  const specimen = 'const DEVANAGARI = ["ळ", "क्या"];';

  it('always carries the baseline — danda, both digit sets, the joiners, ASCII punctuation', () => {
    const dev = subsetText(devanagari, '', specimen, false);
    const lat = subsetText(latin, '', specimen, false);

    for (const char of '।॥०९‌‍') expect(dev).toContain(char);
    // The Ladder's `3वाँ`: digits inside Devanagari strings come from Mukta's latin subset
    // (docs/04-font-notes.md §5) — dropping them is the one cut #113 forbids.
    for (const char of ' 0123456789.,?!') expect(lat).toContain(char);
  });

  it('adds the /dev/type specimen only to dev builds — learner builds ship no specimen glyphs', () => {
    expect(subsetText(devanagari, '', specimen, true)).toContain('ळ');
    expect(subsetText(devanagari, '', specimen, false)).not.toContain('ळ');
  });

  it('adds harvested course text in either build kind', () => {
    expect(subsetText(devanagari, 'साखर', specimen, false)).toContain('ख');
  });
});

describe('the real subsetter', () => {
  it("produces a woff2 materially smaller than @fontsource's devanagari file", async () => {
    const source = readFileSync(
      path.join(
        REPO_ROOT,
        'node_modules/@fontsource/mukta/files/mukta-devanagari-400-normal.woff2',
      ),
    );

    const subset = await subsetFont(source, subsetText(devanagari, 'नमस्ते', '', false), {
      targetFormat: 'woff2',
    });

    expect(subset.subarray(0, 4).toString('latin1')).toBe('wOF2');
    expect(subset.length).toBeGreaterThan(0);
    expect(subset.length).toBeLessThan(source.length / 2);
  });
});

describe('the wiring', () => {
  it('src/fonts/mukta.css references exactly the files the generator writes', () => {
    const referenced = [...MUKTA_CSS.matchAll(/url\('\.\/generated\/([^']+)'\)/g)]
      .map((match) => match[1]!)
      .sort();

    expect(referenced).toEqual([...OUTPUT_FILES].sort());
  });

  it('declares one face per (script, weight) with the shipped weights', () => {
    const weights = [...MUKTA_CSS.matchAll(/font-weight:\s*(\d{3})/g)].map((m) => Number(m[1]));

    expect(weights).toHaveLength(MUKTA_WEIGHTS.length * TARGETS.length);
    expect([...new Set(weights)].sort()).toEqual([...MUKTA_WEIGHTS]);
  });

  it('main.tsx imports the css, so the generated payloads are in the graph', () => {
    expect(MAIN_TSX).toContain("import './fonts/mukta.css';");
  });
});
