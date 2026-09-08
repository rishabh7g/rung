/**
 * The iOS splash set (#115) — the header lockup, rasterised onto the paper ground, one image per
 * supported iPhone portrait viewport (design/pwa-checklist.md §3.3).
 *
 *   npm run splash:build     → public/icons/splash/splash-<W>x<H>.png, one per SPLASH_DEVICES row
 *
 * Like the icons (#90), the PNGs are committed and this script is the receipt for how they were
 * made; it does not run in `build`. iOS has no install prompt and ignores the manifest's
 * `background_color`, so without an `apple-touch-startup-image` per exact device size a cold
 * standalone launch flashes white before the first paint. Safari picks the ONE image whose media
 * query matches the device, at Add-to-Home-Screen time — which is why the set is deliberately
 * NOT precached (`tools/pwa.ts`): the app itself never fetches these, and precaching them would
 * make every Android first visit download images it can never use.
 *
 * **Nothing here is drawn twice.** The mark is read out of `src/shell/RailsMark.tsx` by
 * `scripts/generate-icons.ts`'s parser — the ratified §6.4 grid, same as the icons. The wordmark is
 * `BRAND` (`src/brand.ts`) set in the real Barlow Condensed 700 (`@fontsource`), in `--color-text`
 * on `--color-bg` (`design/tokens.css` via `tools/tokens.ts`). The proportions are the header
 * lockup's (design/tokens.md §6.4): mark box `--brand-mark`, wordmark at `--text-brand`'s size,
 * 8-unit gap, optically centre-aligned — the splash is the header, scaled.
 *
 * **The wordmark is outlines, not text** (#502). It used to go through sharp's `text` input, i.e.
 * Pango, i.e. fontconfig — which resolves a *family name* against whatever the host has installed
 * and silently falls back when it cannot. On a host with no fontconfig config that path renders
 * some default grotesque, and the script still printed `SPLASH 11/11 ok` while rewriting all 11
 * PNGs. So `BRAND` is now shaped by HarfBuzz straight out of the woff2 in `node_modules` and
 * emitted as `<path>` elements: the same SVG-to-raster pipeline that already makes the icons
 * byte-identical on every host, with no font stack in it to fall back to.
 */
import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { BRAND } from '../src/brand.ts';
import { markShapes, markViewBox, readMarkSource, shapeMarkup } from './generate-icons.ts';
import { harfbuzz } from './harfbuzz.ts';
import { TOKENS_CSS_PATH, token } from '../tools/tokens.ts';

// `path.dirname(import.meta.url)`, not `new URL('..', import.meta.url)`: Vite rewrites the second
// form into an asset URL, and this module is read by a vitest test (`tools/tokens.ts` says more).
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Where the set lives under `public/` — a SUBdirectory of icons/, so the `icons/*.png` precache
 * glob (whose `*` does not cross `/`) keeps taking the icons and never these. */
export const SPLASH_DIR = 'icons/splash';

const OUT_DIR = path.join(REPO_ROOT, 'public', SPLASH_DIR);
const BARLOW_CONDENSED_700 = path.join(
  REPO_ROOT,
  'node_modules',
  '@fontsource',
  'barlow-condensed',
  'files',
  'barlow-condensed-latin-700-normal.woff2',
);

/* ------------------------------------------------------------------------------- the devices */

/** One iPhone portrait viewport, in CSS points — what the media query matches on. */
export interface SplashDevice {
  width: number;
  height: number;
  /** `-webkit-device-pixel-ratio`; the image is `width×ratio` by `height×ratio` pixels. */
  ratio: number;
  /** Who this size serves — for the reader, not the build. */
  models: string;
}

/**
 * Every iPhone viewport that can run Safari current-1 (PRD-engineering §10's test floor), and
 * only iPhone: the product targets P1's phone (360–430pt layouts, checklist §2), portrait only
 * (the manifest pins `orientation: portrait`), so there are no landscape images and no iPad rows.
 * iOS matches these by EXACT device size — a missing row means a white flash on that phone, so a
 * new iPhone size is a new row here plus its `<link>` in `index.html` (the test cross-checks).
 */
export const SPLASH_DEVICES: readonly SplashDevice[] = [
  { width: 375, height: 667, ratio: 2, models: 'SE 2nd/3rd gen, 6s–8' },
  { width: 414, height: 896, ratio: 2, models: 'XR, 11' },
  { width: 375, height: 812, ratio: 3, models: 'X, XS, 11 Pro, 12/13 mini' },
  { width: 390, height: 844, ratio: 3, models: '12, 13, 14' },
  { width: 393, height: 852, ratio: 3, models: '14 Pro, 15, 15 Pro, 16' },
  { width: 402, height: 874, ratio: 3, models: '16 Pro, 17' },
  { width: 414, height: 896, ratio: 3, models: 'XS Max, 11 Pro Max' },
  { width: 420, height: 912, ratio: 3, models: 'Air' },
  { width: 428, height: 926, ratio: 3, models: '12/13 Pro Max, 14 Plus' },
  { width: 430, height: 932, ratio: 3, models: '14 Pro Max, 15 Plus, 15 Pro Max, 16 Plus' },
  { width: 440, height: 956, ratio: 3, models: '16/17 Pro Max' },
];

export const splashFile = (device: SplashDevice): string =>
  `splash-${device.width * device.ratio}x${device.height * device.ratio}.png`;

/** The media query iOS resolves against the device — every clause is load-bearing. */
export const splashMedia = (device: SplashDevice): string =>
  `screen and (device-width: ${device.width}px) and (device-height: ${device.height}px) ` +
  `and (-webkit-device-pixel-ratio: ${device.ratio}) and (orientation: portrait)`;

/** The `<link>` exactly as `index.html` must carry it (Vite rewrites the href under the base). */
export const splashLink = (device: SplashDevice): string =>
  `<link rel="apple-touch-startup-image" media="${splashMedia(device)}" ` +
  `href="/${SPLASH_DIR}/${splashFile(device)}" />`;

/* ------------------------------------------------------------------------------- the lockup */

/**
 * How much of the splash's height the mark box takes. 5% reads as the header does — a small,
 * calm lockup centred on an empty paper ground, not a poster; on a 390×844pt phone that is a
 * ~42pt mark beside a ~48pt wordmark.
 */
export const MARK_FRACTION = 0.05;

/** The header lockup's gap, in `--brand-mark` units of 20 (design/tokens.md §6.4: "8 px gap"). */
export const LOCKUP_GAP_UNITS = 8;

export interface LockupScale {
  /** The mark's square box, px — `--brand-mark` scaled. */
  markBox: number;
  /** The wordmark's font size, px — `--text-brand`'s size at the same scale. */
  fontPx: number;
  /** The gap between mark and wordmark, px. */
  gapPx: number;
}

/** `--brand-mark` (`20px`) as a number — the unit every lockup proportion is expressed in. */
export function brandMarkPx(): number {
  const size = Number.parseFloat(token('--brand-mark'));
  if (Number.isNaN(size)) throw new Error('generate-splash: --brand-mark is not a px length');
  return size;
}

/**
 * The wordmark's font size out of `--text-brand` (`700 23px/1 var(--font-heading)`) — read,
 * never retyped. Read from the raw declaration rather than through `token()`: the shorthand
 * carries a `var(--font-heading)` that never resolves to a literal, and `token()` rightly
 * refuses to answer with one — but the ONE number this script needs sits before it.
 */
export function wordmarkPx(): number {
  const declaration = readFileSync(TOKENS_CSS_PATH, 'utf8').match(/--text-brand:\s*([^;]+);/);
  const size = declaration?.[1]?.match(/(\d+(?:\.\d+)?)px/);
  if (!size) throw new Error('generate-splash: --text-brand carries no px font size');
  return Number(size[1]);
}

/** The header lockup's three lengths at splash scale: everything is a ratio of `--brand-mark`. */
export function lockupScale(heightPx: number): LockupScale {
  const unit = (heightPx * MARK_FRACTION) / brandMarkPx();
  return {
    markBox: Math.round(brandMarkPx() * unit),
    fontPx: Math.round(wordmarkPx() * unit),
    gapPx: Math.round(LOCKUP_GAP_UNITS * unit),
  };
}

/** The mark alone, `box`-px square, TRANSPARENT ground — the splash composites it onto paper. */
export function lockupMarkSvg(source: string, box: number): string {
  const view = markViewBox(source);
  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${box}" height="${box}" viewBox="0 0 ${view} ${view}">`,
    ...markShapes(source).map((shape) => `  ${shapeMarkup(shape)}`),
    '</svg>',
  ].join('\n');
}

/* ----------------------------------------------------------------------------- the wordmark */

/** One glyph of the run: its outline in font units, and where the run puts it on the baseline. */
export interface PlacedGlyph {
  /** An SVG `d` in the font's em units, y-up from the glyph's own origin. */
  d: string;
  x: number;
  y: number;
}

/**
 * `BRAND` shaped once in Barlow Condensed 700 and kept in the font's own em units, so one
 * shaping serves all eleven sizes. `ink` is the whole run's ink box: `left`/`right` from the
 * run's origin, `top`/`bottom` from the baseline, y-up like the outlines.
 */
export interface Wordmark {
  glyphs: readonly PlacedGlyph[];
  ink: { left: number; right: number; top: number; bottom: number };
  unitsPerEm: number;
}

/**
 * Shape `BRAND` out of the shipped woff2 — no fontconfig, no family-name lookup, so there is no
 * fallback face to land in silently. HarfBuzz reads sfnt only, hence the `subset-font` hop, which
 * also cuts the file down to the four letters actually drawn.
 */
export async function shapeWordmark(): Promise<Wordmark> {
  const { default: subsetFont } = await import('subset-font');

  const sfnt = await subsetFont(readFileSync(BARLOW_CONDENSED_700), BRAND, {
    targetFormat: 'sfnt',
  });
  const hb = await harfbuzz();
  const blob = hb.createBlob(sfnt);
  const face = hb.createFace(blob, 0);
  const font = hb.createFont(face);
  const buffer = hb.createBuffer();

  try {
    buffer.addText(BRAND);
    buffer.guessSegmentProperties();
    hb.shape(font, buffer);
    const shaped = buffer.json();

    // Glyph 0 is .notdef — the face does not carry one of BRAND's letters, and the run would be
    // tofu. Loud here, rather than eleven PNGs of it and an exit 0.
    const missing = shaped.filter((glyph) => glyph.g === 0);
    if (missing.length > 0) {
      const letters = missing.map((glyph) => JSON.stringify(BRAND[glyph.cl])).join(', ');
      throw new Error(
        `generate-splash: ${path.relative(REPO_ROOT, BARLOW_CONDENSED_700)} has no glyph for ` +
          `${letters} — the wordmark cannot be set and no PNG was written`,
      );
    }

    const glyphs: PlacedGlyph[] = [];
    const ink = { left: Infinity, right: -Infinity, top: -Infinity, bottom: Infinity };
    let pen = 0;
    for (const glyph of shaped) {
      const [x, y] = [pen + glyph.dx, glyph.dy];
      glyphs.push({ d: font.glyphToPath(glyph.g), x, y });
      const box = font.glyphExtents(glyph.g);
      if (box !== null) {
        ink.left = Math.min(ink.left, x + box.xBearing);
        ink.right = Math.max(ink.right, x + box.xBearing + box.width);
        ink.top = Math.max(ink.top, y + box.yBearing);
        ink.bottom = Math.min(ink.bottom, y + box.yBearing + box.height);
      }
      pen += glyph.ax;
    }
    if (!(ink.right > ink.left) || !(ink.top > ink.bottom)) {
      throw new Error(`generate-splash: ${JSON.stringify(BRAND)} shaped to an empty ink box`);
    }

    return { glyphs, ink, unitsPerEm: face.upem };
  } finally {
    buffer.destroy();
    font.destroy();
    face.destroy();
    blob.destroy();
  }
}

/**
 * The wordmark at `fontPx` on the em, as an SVG cropped to its ink — the same crop Pango used to
 * hand back, so the lockup's centring below is unchanged.
 */
export function wordmarkSvg(
  word: Wordmark,
  fontPx: number,
  colour: string,
): { svg: string; width: number; height: number } {
  const scale = fontPx / word.unitsPerEm;
  const width = Math.ceil((word.ink.right - word.ink.left) * scale);
  const height = Math.ceil((word.ink.top - word.ink.bottom) * scale);

  // Scale first, then place: the negative y turns the font's y-up outline into SVG's y-down box.
  const place = ({ d, x, y }: PlacedGlyph): string =>
    `<path transform="translate(${(x - word.ink.left) * scale} ${(word.ink.top - y) * scale}) ` +
    `scale(${scale} ${-scale})" d="${d}"/>`;

  return {
    svg: [
      `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}">`,
      `  <g fill="${colour}">`,
      ...word.glyphs.map((glyph) => `    ${place(glyph)}`),
      '  </g>',
      '</svg>',
    ].join('\n'),
    width,
    height,
  };
}

/* ------------------------------------------------------------------------------- the raster */

/**
 * One device's image, as bytes — nothing here touches the disk, so the test can regenerate a
 * device and compare it with the committed PNG.
 *
 * `word` and `source` are passed in rather than read here: both are one shaping / one parse for
 * the whole set, and re-doing either eleven times would be the second copy this file exists to
 * avoid.
 */
export async function splashPng(
  device: SplashDevice,
  word: Wordmark,
  source: string,
): Promise<Buffer> {
  // sharp is native and loads only when the script actually rasterises — everything above is
  // plain string work (same shape as scripts/generate-icons.ts).
  const { default: sharp } = await import('sharp');

  const [width, height] = [device.width * device.ratio, device.height * device.ratio];
  const { markBox, fontPx, gapPx } = lockupScale(height);

  const mark = await sharp(Buffer.from(lockupMarkSvg(source, markBox)))
    .png()
    .toBuffer();
  const { svg, width: wordW, height: wordH } = wordmarkSvg(word, fontPx, token('--color-text'));
  const wordPng = await sharp(Buffer.from(svg)).png().toBuffer();

  // The header's flex row: mark, gap, wordmark, the whole row centred both ways. Centring
  // the wordmark's own box against the mark's is the optical alignment `.brand` does.
  const rowWidth = markBox + gapPx + wordW;
  const left = Math.round((width - rowWidth) / 2);

  return await sharp({
    create: { width, height, channels: 3, background: token('--color-bg') },
  })
    .composite([
      { input: mark, left, top: Math.round((height - markBox) / 2) },
      { input: wordPng, left: left + markBox + gapPx, top: Math.round((height - wordH) / 2) },
    ])
    .png({ compressionLevel: 9, palette: true })
    .toBuffer();
}

async function main(): Promise<number> {
  // One shaping and one parse for all eleven sizes: the outlines are em units, the size is a
  // scale factor.
  const word = await shapeWordmark();
  const source = readMarkSource();
  mkdirSync(OUT_DIR, { recursive: true });

  for (const device of SPLASH_DEVICES) {
    const target = path.join(OUT_DIR, splashFile(device));
    writeFileSync(target, await splashPng(device, word, source));
    const [width, height] = [device.width * device.ratio, device.height * device.ratio];
    console.log(
      `  ${SPLASH_DIR}/${splashFile(device)}  ${width}×${height}  ${statSync(target).size} bytes  (${device.models})`,
    );
  }

  console.log(`SPLASH ${SPLASH_DEVICES.length}/${SPLASH_DEVICES.length} ok`);
  return 0;
}

const entry = process.argv[1];
if (entry !== undefined && path.resolve(entry) === fileURLToPath(import.meta.url)) {
  main().then(
    (code) => process.exit(code),
    (error: unknown) => {
      console.error(`SPLASH error: ${error instanceof Error ? error.message : String(error)}`);
      process.exit(1);
    },
  );
}
