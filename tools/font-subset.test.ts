/**
 * The per-course subsetter (#113, #197) — `tools/font-subset.ts`.
 *
 * Three things are worth a guard here. The harvest: course text lives in JSON string VALUES
 * anywhere in the emitted tree, and a collector that missed a nesting level would quietly ship a
 * font without those glyphs — tofu with no error anywhere, the exact failure [D15] names. The
 * split: each script target must take precisely the characters its `unicode-range` routes to it.
 * And the wiring: `src/fonts/mukta.css` and `src/fonts/naskh.css` are committed while the woff2
 * are generated, so each sheet's urls and its face's output list are two copies of one fact —
 * this file holds them equal, the same shape as `tools/pwa.test.ts` holding the manifest to the
 * checklist.
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
import { readdirSync } from 'node:fs';
import {
  collectStrings,
  coveredChars,
  subsetText,
  outputFiles,
  FACES,
  MUKTA_TARGETS,
  MUKTA_WEIGHTS,
  NASKH_TARGETS,
  NASKH_WEIGHTS,
  SOURCE_SANS_TARGETS,
  SOURCE_SANS_WEIGHTS,
  OUTPUT_FILES,
} from './font-subset.ts';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const sheet = (name: string) => readFileSync(path.join(REPO_ROOT, 'src', 'fonts', name), 'utf8');
const MUKTA_CSS = sheet('mukta.css');
const MAIN_TSX = readFileSync(path.join(REPO_ROOT, 'src', 'main.tsx'), 'utf8');

const devanagari = MUKTA_TARGETS.find((target) => target.subset === 'devanagari')!;
const latin = MUKTA_TARGETS.find((target) => target.subset === 'latin')!;
const latinExt = MUKTA_TARGETS.find((target) => target.subset === 'latin-ext')!;
const arabic = NASKH_TARGETS.find((target) => target.subset === 'arabic')!;
const diacritics = SOURCE_SANS_TARGETS[0]!;

/** Every string a course's AUTHORED content carries — `content/<id>/`, not `public/content/`:
    the emitted tree is a build artefact and this suite runs before the build does. */
function courseText(courseId: string): string {
  const root = path.join(REPO_ROOT, 'content', courseId);
  const files = (dir: string): string[] =>
    readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return files(full);
      return entry.name.endsWith('.json') ? [full] : [];
    });
  return files(root)
    .flatMap((file) => collectStrings(JSON.parse(readFileSync(file, 'utf8'))))
    .join('');
}

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

  it('routes Arabic to the Naskh target and nothing else (#197)', () => {
    // The quiet script line of en-ar's first sentence, with a Latin word beside it.
    const text = 'اسمي Rohan';

    // The space is the Naskh target's too (#197) — an Arabic line's word gaps belong to the
    // Arabic face, not to whatever the device would otherwise set them in.
    expect(coveredChars(text, arabic)).toBe(' اسمي');
    expect(coveredChars(text, devanagari)).toBe('');
    // Latin inside a script line routes OUT of the bundled Naskh to system-ui, by design — Mukta's
    // latin target is Mukta's, not Naskh's (docs/04-font-notes.md §8).
    expect(coveredChars(text, arabic)).not.toMatch(/[A-Za-z]/);
  });

  it('deduplicates and sorts, so the same content always yields the same subset input', () => {
    expect(coveredChars('बबअअ', devanagari)).toBe('अब');
  });

  it("splits the romanization's marks between Mukta and the face behind it (#222)", () => {
    // en-ar L1-M1's first sentence, marks and all.
    const text = 'ṣabāḥ al-khayr — ʾanā ḥasan, wa-ẓ-ẓuhr';

    // Mukta's own latin-ext claims the long vowels and every dot-below letter: the letters and
    // their marks come out of ONE face, which is the whole point of the ticket. `ẓ` is claimed
    // here too and Mukta has no glyph for it — a range is routing, not a promise of coverage, so
    // HarfBuzz retains nothing for it and the browser asks the next family in the stack.
    expect(coveredChars(text, latinExt)).toBe('āḥṣẓ');
    // That next family's target is the gap and only the gap: hamza, and the ẓ Mukta cannot draw.
    expect(coveredChars(text, diacritics)).toBe('ʾẓ');
    // The plain letters stay Mukta's `latin` target's, exactly as before.
    expect(coveredChars(text, latin)).toContain('a');
    expect(coveredChars(text, latin)).not.toMatch(/[āḥṣṭʾẓ]/);
  });

  it('claims nothing that carries no script — a course that prints no mark pulls no file (#211)', () => {
    // The failure mode #211 closed, re-checked at the source of the ranges rather than in CSS: a
    // space or a joiner inside one of these targets and every course "uses" the diacritic faces.
    for (const target of [latinExt, diacritics]) {
      expect(coveredChars('  \t\n‌‍‎﻿0123456789abcXYZ', target)).toBe('');
    }

    // And measured against the catalogue: only the romanized course carries a single character
    // either target claims, so only its learner ever downloads one.
    expect(coveredChars(courseText('hi-mr'), latinExt)).toBe('');
    expect(coveredChars(courseText('hi-mr'), diacritics)).toBe('');
    expect(coveredChars(courseText('en-es'), latinExt)).toBe('');
    expect(coveredChars(courseText('en-es'), diacritics)).toBe('');
    expect(coveredChars(courseText('en-ar'), latinExt).length).toBeGreaterThan(0);
    expect(coveredChars(courseText('en-ar'), diacritics).length).toBeGreaterThan(0);
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

  it('carries the Arabic marks a script line needs whatever the sentence says (#197)', () => {
    const ar = subsetText(arabic, '', specimen, false);

    // Arabic comma, semicolon, question mark; the Arabic-Indic digits; tatweel; the joiners.
    for (const char of '،؛؟٠٩ـ‌‍') expect(ar).toContain(char);
    // No letters: content decides those, the same rule Mukta's latin baseline follows.
    expect(ar).not.toContain('ا');
    expect(subsetText(arabic, 'اسمي', specimen, false)).toContain('ا');
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

describe('the real subsetter, Arabic (#197)', () => {
  it("produces a woff2 a fraction of @fontsource's arabic file", async () => {
    const source = readFileSync(
      path.join(
        REPO_ROOT,
        'node_modules/@fontsource/noto-naskh-arabic/files/noto-naskh-arabic-arabic-400-normal.woff2',
      ),
    );

    const subset = await subsetFont(source, subsetText(arabic, 'اسمي روهان', '', false), {
      targetFormat: 'woff2',
    });

    expect(subset.subarray(0, 4).toString('latin1')).toBe('wOF2');
    expect(subset.length).toBeGreaterThan(0);
    expect(subset.length).toBeLessThan(source.length / 2);
  });
});

describe('the real subsetter, the diacritics (#222)', () => {
  const source = (file: string) =>
    readFileSync(path.join(REPO_ROOT, 'node_modules/@fontsource', file));

  /** The codepoints a woff2's cmap still maps after subsetting — HarfBuzz cannot retain a glyph
      the source font does not have, so this answers "does this face DRAW it?", which a
      `unicode-range` never can. Format 4 and 12 are the two @fontsource ships. */
  function drawn(font: Buffer, text: string): string {
    const view = new DataView(font.buffer, font.byteOffset, font.byteLength);
    let cmap = -1;
    for (let i = 0; i < view.getUint16(4); i += 1) {
      const record = 12 + i * 16;
      if (font.subarray(record, record + 4).toString('latin1') === 'cmap') {
        cmap = view.getUint32(record + 8);
      }
    }
    const mapped = new Set<number>();
    for (let i = 0; i < view.getUint16(cmap + 2); i += 1) {
      const table = cmap + view.getUint32(cmap + 4 + i * 8 + 4);
      const format = view.getUint16(table);

      if (format === 12) {
        for (let group = 0; group < view.getUint32(table + 12); group += 1) {
          const at = table + 16 + group * 12;
          for (let cp = view.getUint32(at); cp <= view.getUint32(at + 4); cp += 1) mapped.add(cp);
        }
      } else if (format === 4) {
        const doubled = view.getUint16(table + 6);
        const ends = table + 14;
        const starts = ends + doubled + 2;
        for (let segment = 0; segment < doubled; segment += 2) {
          const end = view.getUint16(ends + segment);
          const start = view.getUint16(starts + segment);
          // 0xFFFF is the required terminator segment, mapped to nothing.
          if (start === 0xffff) continue;
          for (let cp = start; cp <= end; cp += 1) mapped.add(cp);
        }
      }
    }
    return [...text].filter((char) => mapped.has(char.codePointAt(0)!)).join('');
  }

  it('gets twelve of the sixteen marks out of Mukta itself, and the other four out of the second face', async () => {
    const marks = 'āīūḥṣḍṭẓʾʿḤṢḌṬẒ';
    const options = { targetFormat: 'truetype' as const };

    const mukta = await subsetFont(source('mukta/files/mukta-latin-ext-400-normal.woff2'), marks, {
      ...options,
    });
    const sourceSans = await subsetFont(
      source('source-sans-3/files/source-sans-3-latin-ext-400-normal.woff2'),
      marks,
      { ...options },
    );

    // The measurement the ranges are built on (docs/04-font-notes.md §9.2). If a font release
    // moves either line, this goes red instead of the marks quietly falling back on a phone.
    expect(drawn(mukta, marks)).toBe('āīūḥṣḍṭḤṢḌṬ');
    expect(drawn(sourceSans, 'ʾʿẒẓ')).toBe('ʾʿẒẓ');
    // Nothing is left over: every mark is drawn by one of the two.
    for (const mark of marks) {
      expect(drawn(mukta, mark) + drawn(sourceSans, mark), mark).not.toBe('');
    }
  });
});

describe('the wiring', () => {
  it.each(FACES)('src/fonts/$sheet references exactly the files $slug writes', (face) => {
    const referenced = [...sheet(face.sheet).matchAll(/url\('\.\/generated\/([^']+)'\)/g)]
      .map((match) => match[1]!)
      .sort();

    expect(referenced).toEqual([...outputFiles(face)].sort());
  });

  it('every file the generator writes belongs to exactly one face', () => {
    expect([...OUTPUT_FILES].sort()).toEqual([...new Set(OUTPUT_FILES)].sort());
    expect(OUTPUT_FILES).toHaveLength(FACES.flatMap(outputFiles).length);
  });

  it('declares one Mukta face per (script, weight) with the shipped weights', () => {
    const weights = [...MUKTA_CSS.matchAll(/font-weight:\s*(\d{3})/g)].map((m) => Number(m[1]));

    expect(weights).toHaveLength(MUKTA_WEIGHTS.length * MUKTA_TARGETS.length);
    expect([...new Set(weights)].sort()).toEqual([...MUKTA_WEIGHTS]);
  });

  it('declares the one Naskh weight the quiet script line renders (#197)', () => {
    const weights = [...sheet('naskh.css').matchAll(/font-weight:\s*(\d{3})/g)].map((m) =>
      Number(m[1]),
    );

    expect(weights).toEqual([...NASKH_WEIGHTS]);
  });

  it('declares the diacritic face at every weight the L2 ramp renders (#222)', () => {
    const weights = [...sheet('source-sans-3.css').matchAll(/font-weight:\s*(\d{3})/g)].map((m) =>
      Number(m[1]),
    );

    // One block per weight, and the same three Mukta draws the letters at: a mark at 700 beside a
    // letter at 700 must not be a 400 the browser synthesised a bold from.
    expect(weights).toEqual([...SOURCE_SANS_WEIGHTS]);
    expect(weights).toEqual([...MUKTA_WEIGHTS]);
  });

  it('main.tsx imports all three sheets, so the generated payloads are in the graph', () => {
    expect(MAIN_TSX).toContain("import './fonts/mukta.css';");
    expect(MAIN_TSX).toContain("import './fonts/naskh.css';");
    expect(MAIN_TSX).toContain("import './fonts/source-sans-3.css';");
  });
});
