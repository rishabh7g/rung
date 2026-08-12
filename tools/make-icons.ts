/**
 * The app icons (#90) — the header rails mark, rasterised onto the paper ground.
 *
 *   npm run icons:build     → public/icons/{icon-192,icon-512,maskable-512,apple-touch-icon-180}.png
 *
 * The PNGs are committed and this script is the receipt for how they were made. It does not run
 * in `build`: an icon set that regenerated on every build would be a binary diff nobody reads.
 *
 * **The mark is not redrawn here.** `src/shell/RailsMark.tsx` says its geometry is the ticket's
 * verbatim SVG and is not to be redrawn, so this script *reads that component* and lifts the
 * `<line>`/`<rect>` elements out of it — the same source-scan idiom as `src/fonts.test.ts` and
 * `src/styleContract.test.ts`. Change the mark in the header and the icons follow it or the
 * parse fails loudly; there is no second copy of those five shapes anywhere.
 *
 * The colours the component defers to the page for — `currentColor` on the rails, the accent bar
 * — are resolved from `design/tokens.css` (`tools/tokens.ts`), because a PNG cannot hold a
 * `var()` and a hand-typed hex here is the drift `src/styleContract.test.ts` exists to stop.
 *
 * Since #115 the component carries the RATIFIED construction grid (design/tokens.md §6.4, the
 * formal spec #69 delivered), so these icons are the final brand set, not placeholders. The iOS
 * splash images are cut from the same source by `tools/make-splash.ts`.
 */
import { mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { token } from './tokens.ts';

// `path.dirname(import.meta.url)`, not `new URL('..', import.meta.url)`: Vite rewrites the second
// form into an asset URL, and this module is read by a vitest test (`tools/tokens.ts` says more).
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MARK_COMPONENT = path.join(REPO_ROOT, 'src', 'shell', 'RailsMark.tsx');
const ICONS_DIR = path.join(REPO_ROOT, 'public', 'icons');

/* --------------------------------------------------------------- the mark, read not redrawn */

/** One `<line>` or `<rect>` of the mark, attributes exactly as the component writes them. */
export interface MarkShape {
  tag: 'line' | 'rect';
  attrs: Readonly<Record<string, string>>;
}

/** A box in the mark's own viewBox units. */
export interface Box {
  x: number;
  y: number;
  width: number;
  height: number;
}

/** The component's source, for the parse and for the tests that check it. */
export function readMarkSource(): string {
  return readFileSync(MARK_COMPONENT, 'utf8');
}

/** The mark's viewBox side. Square by construction — a non-square mark would need a real parse. */
export function markViewBox(source: string): number {
  const box = source.match(/viewBox="0 0 (\d+(?:\.\d+)?) (\d+(?:\.\d+)?)"/);
  if (box === null) throw new Error('make-icons: RailsMark.tsx has no `viewBox="0 0 w h"`');
  if (box[1] !== box[2])
    throw new Error(`make-icons: the mark's viewBox is not square (${box[0]})`);

  return Number(box[1]);
}

/** Every drawn element of the mark, in document order. Five today: two rails, three rungs. */
export function markShapes(source: string): MarkShape[] {
  const shapes = [...source.matchAll(/<(line|rect)\s+([^>]*?)\/>/g)].map(([, tag, attrs]) => ({
    tag: tag as MarkShape['tag'],
    // Names carry digits (`x1`, `y2`) and case (`strokeWidth`), so the class is not just letters.
    attrs: Object.fromEntries(
      [...attrs!.matchAll(/([A-Za-z][A-Za-z0-9-]*)="([^"]*)"/g)].map(([, name, value]) => [
        name!,
        value!,
      ]),
    ),
  }));

  if (shapes.length === 0) throw new Error('make-icons: found no <line>/<rect> in RailsMark.tsx');
  return shapes;
}

/**
 * The ink box: the drawn geometry grown by half a stroke on every side, which is the box a
 * viewer sees. Both axes are grown for every shape — butt caps do not actually extend a line
 * lengthwise, and over-measuring by 0.75 units only ever makes the mark sit slightly smaller in
 * its square, which is the safe direction for a maskable icon.
 */
export function inkBox(shapes: readonly MarkShape[]): Box {
  let left = Infinity;
  let top = Infinity;
  let right = -Infinity;
  let bottom = -Infinity;

  for (const { tag, attrs } of shapes) {
    const grow = (Number(attrs['strokeWidth'] ?? 0) || 0) / 2;
    const xs =
      tag === 'line'
        ? [Number(attrs['x1']), Number(attrs['x2'])]
        : [Number(attrs['x']), Number(attrs['x']) + Number(attrs['width'])];
    const ys =
      tag === 'line'
        ? [Number(attrs['y1']), Number(attrs['y2'])]
        : [Number(attrs['y']), Number(attrs['y']) + Number(attrs['height'])];

    if (xs.some(Number.isNaN) || ys.some(Number.isNaN)) {
      throw new Error(`make-icons: <${tag}> in RailsMark.tsx is missing a coordinate`);
    }

    left = Math.min(left, ...xs.map((x) => x - grow));
    right = Math.max(right, ...xs.map((x) => x + grow));
    top = Math.min(top, ...ys.map((y) => y - grow));
    bottom = Math.max(bottom, ...ys.map((y) => y + grow));
  }

  return { x: left, y: top, width: right - left, height: bottom - top };
}

/* ------------------------------------------------------------------------------- the drawing */

/** React writes `strokeWidth`; SVG-as-a-document wants `stroke-width`. */
function svgAttrName(name: string): string {
  return name.replace(/[A-Z]/g, (upper) => `-${upper.toLowerCase()}`);
}

/**
 * A colour the component deferred: `currentColor` is whatever chrome the mark sits in, which on
 * the paper ground is the ink, and `var(--x)` is the token itself. Anything else is already a
 * literal and passes through.
 */
function resolveColour(value: string): string {
  if (value === 'currentColor') return token('--color-text');

  const variable = value.match(/^var\(\s*(--[a-z0-9-]+)\s*\)$/);
  return variable === null ? value : token(variable[1]!);
}

/**
 * The attributes the raster needs: presentation names, resolved colours, no React leftovers.
 * Exported for `tools/make-splash.ts`, which draws the same shapes on a transparent ground.
 */
export function shapeMarkup({ tag, attrs }: MarkShape): string {
  const drawn = Object.entries(attrs)
    .filter(([name]) => name !== 'className')
    .map(([name, value]) => `${svgAttrName(name)}="${resolveColour(value)}"`)
    .join(' ');

  return `<${tag} ${drawn} />`;
}

/**
 * The mark on the ground, at `size` px, with the ink scaled to `markHeight` of the canvas and
 * centred. Scaling the whole group scales the hairline with it, so the mark keeps the header's
 * proportions at every size instead of turning into a wire drawing at 512.
 */
export function iconSvg(source: string, size: number, markHeight: number): string {
  const shapes = markShapes(source);
  const ink = inkBox(shapes);
  const scale = (size * markHeight) / ink.height;
  const dx = size / 2 - scale * (ink.x + ink.width / 2);
  const dy = size / 2 - scale * (ink.y + ink.height / 2);
  const round = (value: number) => Number(value.toFixed(3));

  return [
    `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">`,
    `  <rect width="${size}" height="${size}" fill="${token('--color-bg')}" />`,
    `  <g transform="translate(${round(dx)} ${round(dy)}) scale(${round(scale)})">`,
    ...shapes.map((shape) => `    ${shapeMarkup(shape)}`),
    '  </g>',
    '</svg>',
  ].join('\n');
}

/* ------------------------------------------------------------------------------- the set */

/**
 * How much of the canvas height the mark takes.
 *
 * `MARK_HEIGHT` leaves the icon room to breathe at 192px in a launcher. `MASKABLE_HEIGHT` is the
 * safe-zone answer: a mask may crop to a circle of 80% of the icon's width, so every corner of
 * the mark's box has to sit inside a radius of 0.4 × size. At half the height the box's own
 * half-diagonal is ≈ 0.289 × size — comfortably inside, with the margin a *shape* needs rather
 * than the margin a square would (`tools/make-icons.test.ts` does that arithmetic).
 */
const MARK_HEIGHT = 0.64;
const MASKABLE_HEIGHT = 0.5;

/**
 * The set the manifest and `index.html` name, and nothing else.
 *
 * `favicon-32.png` is in here for an offline reason rather than a cosmetic one: a document that
 * declares no icon makes the browser guess `/favicon.ico`, which nothing precaches, and the
 * offline walkthrough then shows a failed request on every screen. Declaring one turns the guess
 * into a precached hit.
 */
export const ICON_SET = [
  { file: 'icon-192.png', size: 192, markHeight: MARK_HEIGHT },
  { file: 'icon-512.png', size: 512, markHeight: MARK_HEIGHT },
  { file: 'maskable-512.png', size: 512, markHeight: MASKABLE_HEIGHT },
  { file: 'apple-touch-icon-180.png', size: 180, markHeight: MARK_HEIGHT },
  { file: 'favicon-32.png', size: 32, markHeight: MARK_HEIGHT },
] as const;

async function main(): Promise<number> {
  // Imported here, not at the top: sharp is a native module, and everything above it is plain
  // string work that `tools/make-icons.test.ts` exercises without ever loading a binary.
  const { default: sharp } = await import('sharp');
  const source = readMarkSource();
  mkdirSync(ICONS_DIR, { recursive: true });

  for (const { file, size, markHeight } of ICON_SET) {
    const svg = iconSvg(source, size, markHeight);
    const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
    const target = path.join(ICONS_DIR, file);
    writeFileSync(target, png);
    console.log(`  icons/${file}  ${size}×${size}  ${statSync(target).size} bytes`);
  }

  console.log(`ICONS ${ICON_SET.length}/${ICON_SET.length} ok`);
  return 0;
}

const entry = process.argv[1];
if (entry !== undefined && path.resolve(entry) === fileURLToPath(import.meta.url)) {
  main().then(
    (code) => process.exit(code),
    (error: unknown) => {
      console.error(`ICONS error: ${error instanceof Error ? error.message : String(error)}`);
      process.exit(1);
    },
  );
}
