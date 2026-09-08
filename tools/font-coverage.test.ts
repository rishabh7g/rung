/**
 * @vitest-environment node
 *
 * Every character the content build harvested is drawn by some cut this repo ships (#375, #382).
 *
 * The harvest is silent by design: `coveredChars` keeps only what a target's `covers()` claims, so
 * a character no target claims is dropped from every subset with no error and no warning, and the
 * line then draws from whatever `--font-script-fallback` or `--font-devanagari` falls through to —
 * a real face on a phone, tofu or a mismatched face on a stripped Linux. Two defects of exactly
 * that shape shipped before this file existed: en-ko's whole Hangul `script` line, which no target
 * claimed at all (#375), and en-fr's `sœur`, whose U+0153 WAS claimed — by the `latin-ext` target,
 * whose source file has no glyph for it. Neither had a size to notice: the cut that does not exist
 * has no size, and the cut that silently dropped one glyph is a few bytes smaller. Only the cmap
 * knows, so this reads the cmap.
 *
 * The assertion is deliberately AGGREGATE rather than per-cut: a character claimed by two targets
 * only has to be drawn by one of them, and which one is a routing decision the `unicode-range`s
 * make. What is forbidden is a claimed character no bundled file can draw.
 *
 * It needs `src/fonts/generated/`, which means `content:build` then `fonts:build` — the order
 * `predev`, `prebuild` and `scripts/verify.sh` all already run them in.
 */
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';
import * as fontkit from 'fontkit';
import { describe, expect, it } from 'vitest';
import {
  FACES,
  GENERATED_DIR,
  harvestContent,
  subsetText,
  weightsFor,
  type ScriptTarget,
} from './font-subset.ts';

const SPECIMEN = path.join(GENERATED_DIR, '..', '..', 'dev', 'TypeSpecimen.tsx');

/**
 * Characters a target claims that NO face is expected to draw, each one a decision rather than an
 * oversight. Keep this list short and keep the reasons in it — a character added here without one
 * is how a real gap gets waved through.
 */
const FALLS_THROUGH = new Map<number, string>([
  // The joiners are NOT here: U+200C and U+200D are format controls with nothing to draw, and
  // Mukta's cmap maps them anyway — which is what the second test below is for. A guess about
  // what a face does is worth nothing next to its cmap.
  //
  // U+2011 is inside @fontsource's `latin` range and inside no @fontsource `latin` FILE. It is a
  // hyphen that does not break, so system-ui draws an ordinary hyphen and the line still reads.
  [0x2011, 'NON-BREAKING HYPHEN — absent from every @fontsource latin cut; degrades to a hyphen'],
]);

/** Every generated file, with the target it was cut for. */
const cuts = FACES.flatMap((face) =>
  face.targets.flatMap((target) =>
    weightsFor(face, target).map((weight) => ({
      target,
      file: `${face.slug}-${target.subset}-${weight}.woff2`,
    })),
  ),
);

describe('the bundled cuts against the content they were cut from', () => {
  const harvest = harvestContent();
  const specimen = existsSync(SPECIMEN) ? readFileSync(SPECIMEN, 'utf8') : '';
  const drawn = new Set<number>();
  const claimed = new Map<number, ScriptTarget[]>();

  for (const { target, file } of cuts) {
    const cut = path.join(GENERATED_DIR, file);
    it(`${file} exists`, () => {
      expect(existsSync(cut), `${file} — run \`npm run fonts:build\``).toBe(true);
    });
    if (!existsSync(cut)) continue;
    // `openSync` is typed `Font | FontCollection`; a woff2 is never a collection, and a
    // collection has no cmap of its own, so the narrowing is the assertion.
    const font = fontkit.openSync(cut);
    expect('characterSet' in font, `${file} is a font collection, not a font`).toBe(true);
    for (const cp of (font as fontkit.Font).characterSet) drawn.add(cp);
    for (const char of subsetText(target, harvest.text, specimen, harvest.devBuild)) {
      const cp = char.codePointAt(0);
      if (cp !== undefined) claimed.set(cp, [...(claimed.get(cp) ?? []), target]);
    }
  }

  it('draws every harvested character that a target claims', () => {
    const missing = [...claimed.keys()]
      .filter((cp) => !drawn.has(cp) && !FALLS_THROUGH.has(cp))
      .map(
        (cp) => `${String.fromCodePoint(cp)} U+${cp.toString(16).toUpperCase().padStart(4, '0')}`,
      )
      .sort();

    expect(missing, 'claimed by a target, harvested from content, drawn by no bundled cut').toEqual(
      [],
    );
  });

  it('keeps the fall-through list honest — every entry is still claimed and still undrawn', () => {
    const stale = [...FALLS_THROUGH.keys()].filter((cp) => drawn.has(cp) || !claimed.has(cp));

    expect(stale.map((cp) => `U+${cp.toString(16).toUpperCase()}`)).toEqual([]);
  });
});
