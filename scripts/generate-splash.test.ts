/**
 * @vitest-environment node
 *
 * The suite's default is jsdom, and this file rasterises: sharp is native and `subset-font`'s
 * woff2 decoder is wasm, and neither accepts a Buffer handed to it from inside jsdom's realm
 * (`Cannot pass non-string to std::string`). Nothing here touches the DOM, so it runs in node.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { BRAND } from '../src/brand.ts';
import { readMarkSource } from './generate-icons.ts';
import {
  SPLASH_DEVICES,
  shapeWordmark,
  splashFile,
  splashPng,
  wordmarkSvg,
} from './generate-splash.ts';

/**
 * #502: `splash:build` used to draw the wordmark through Pango, which resolves a family NAME
 * against the host's fonts and silently substitutes when it cannot — so the script exited 0 with
 * `SPLASH 11/11 ok` while writing eleven PNGs set in whatever face that host happened to offer.
 * Both tests here are about that: the wordmark comes out of the repo's own font file, and the
 * committed bytes are exactly what this machine regenerates.
 */
// Not `new URL(…, import.meta.url)`: Vite rewrites that literal into an asset URL under vitest.
const SPLASH_DIR = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'public',
  'icons',
  'splash',
);

describe('the wordmark', () => {
  it('is shaped from the shipped font, with a glyph for every letter of BRAND', async () => {
    const word = await shapeWordmark();

    expect(word.glyphs).toHaveLength([...BRAND].length);
    for (const glyph of word.glyphs) expect(glyph.d).toMatch(/^M-?[\d.]/);
    expect(word.unitsPerEm).toBeGreaterThan(0);
    expect(word.ink.right).toBeGreaterThan(word.ink.left);
    expect(word.ink.top).toBeGreaterThan(word.ink.bottom);
  });

  it('draws outlines, never text — there is no font name for a host to resolve', async () => {
    const { svg } = wordmarkSvg(await shapeWordmark(), 100, '#000000');

    expect(svg).not.toMatch(/<text|font-family/);
    expect([...svg.matchAll(/<path /g)]).toHaveLength([...BRAND].length);
  });
});

describe('the committed set', () => {
  // The smallest device, because this regenerates a real PNG and the point is the bytes, not
  // the size. If the wordmark ever falls back to a host face again, this is what goes red.
  const device = SPLASH_DEVICES.reduce((smallest, row) =>
    row.width * row.height < smallest.width * smallest.height ? row : smallest,
  );

  it('is byte-for-byte what this machine regenerates', async () => {
    const regenerated = await splashPng(device, await shapeWordmark(), readMarkSource());

    expect(regenerated.equals(readFileSync(path.join(SPLASH_DIR, splashFile(device))))).toBe(true);
  });
});
