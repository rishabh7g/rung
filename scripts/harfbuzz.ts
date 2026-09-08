/**
 * `harfbuzzjs` (0.10.3), made usable from this repo — the shaping engine `scripts/generate-splash.ts`
 * sets the wordmark with (#502). Two things about the package are absorbed here and nowhere else:
 *
 * - **Its `module.exports` IS a promise**, resolved when the wasm instance is up. A CommonJS
 *   module whose exports object is thenable breaks `await import()` — the ESM namespace inherits
 *   the `then`, and awaiting it fails with `Promise.prototype.then called on incompatible
 *   receiver [object Module]` under vitest. `createRequire` loads it as the CJS it is.
 * - **It ships no types.** Only the surface this repo calls is declared below; a wider shim would
 *   be a claim about an API nothing here exercises.
 */
import { createRequire } from 'node:module';

export interface HbBlob {
  destroy(): void;
}

export interface HbFace {
  /** The font's design units per em — every other number below is in these. */
  upem: number;
  destroy(): void;
}

/** A glyph's ink box, y-up from the baseline: `yBearing` is its TOP and `height` runs down. */
export interface HbGlyphExtents {
  xBearing: number;
  yBearing: number;
  width: number;
  height: number;
}

export interface HbFont {
  /** The glyph as an SVG `d` in font units, y-up from the glyph's own origin. */
  glyphToPath(glyph: number): string;
  glyphExtents(glyph: number): HbGlyphExtents | null;
  destroy(): void;
}

/** One shaped glyph: `g` the id (0 = .notdef), `cl` its index in the text, `ax` the advance. */
export interface HbGlyph {
  g: number;
  cl: number;
  ax: number;
  ay: number;
  dx: number;
  dy: number;
}

export interface HbBuffer {
  addText(text: string): void;
  guessSegmentProperties(): void;
  json(): HbGlyph[];
  destroy(): void;
}

export interface HarfBuzz {
  createBlob(data: Uint8Array): HbBlob;
  createFace(blob: HbBlob, index: number): HbFace;
  createFont(face: HbFace): HbFont;
  createBuffer(): HbBuffer;
  shape(font: HbFont, buffer: HbBuffer): void;
}

/** The library, once its wasm instance is ready. */
export function harfbuzz(): Promise<HarfBuzz> {
  return createRequire(import.meta.url)('harfbuzzjs') as Promise<HarfBuzz>;
}
