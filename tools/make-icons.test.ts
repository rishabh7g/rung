/**
 * The icons are the header mark, and they stay the header mark (#90).
 *
 * `tools/make-icons.ts` reads `src/shell/RailsMark.tsx` rather than redrawing its geometry, so
 * the failure this file guards against is the parse going quietly wrong: an attribute regex that
 * stops matching `x1`, a `<line>` shape silently dropped, `currentColor` reaching a PNG as the
 * literal string. None of those throw — they produce a plausible, wrong icon, and nobody looks at
 * a 192px PNG closely enough to notice.
 *
 * The other half is arithmetic a picture cannot check: the maskable icon's safe zone. Android
 * may crop an icon to a circle of 80% of its width, so every corner of the mark's box has to sit
 * inside a radius of 0.4 × size — that is a number, and it is asserted as one.
 */
import { existsSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  ICON_SET,
  ICON_SVG_FILE,
  iconSvg,
  inkBox,
  markShapes,
  markViewBox,
  readMarkSource,
} from './make-icons.ts';
import { token } from './tokens.ts';

const source = readMarkSource();
const ICONS_DIR = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'public',
  'icons',
);

describe('the mark, read out of the component', () => {
  it('finds every drawn shape — two rails, three rungs', () => {
    const shapes = markShapes(source);

    expect(shapes.map((shape) => shape.tag)).toEqual(['line', 'line', 'line', 'rect', 'line']);
  });

  it('reads coordinates, not just the attributes without digits in their names', () => {
    // The first rail: a full-height vertical line. A parse that lost `x1`/`y2` still returns a
    // shape, and its ink box would be the accent bar alone.
    expect(markShapes(source)[0]?.attrs).toMatchObject({
      x1: '5.5',
      y1: '1',
      x2: '5.5',
      y2: '21',
      strokeWidth: '1.5',
    });
  });

  it('measures the ink box as the geometry plus half a stroke', () => {
    // The ratified grid (design/tokens.md §6.4): rails at x 5.5 and 16.5, running y 1 → 21,
    // hairline 1.5 — the drawn box is 12.5 × 21.5 in a viewBox of 22. The mark is tall and
    // narrow, which is why the icons scale by height.
    expect(markViewBox(source)).toBe(22);
    expect(inkBox(markShapes(source))).toEqual({ x: 4.75, y: 0.25, width: 12.5, height: 21.5 });
  });
});

describe('the rendered SVG', () => {
  const svg = iconSvg(source, 512, 0.64);

  it('resolves every colour the component deferred to the page', () => {
    // `currentColor` is the ink the mark sits on; the one accent bar stays the one accent bar.
    expect(svg).toContain(`stroke="${token('--color-text')}"`);
    expect(svg).toContain(`fill="${token('--color-accent')}"`);
    expect(svg).not.toContain('currentColor');
    expect(svg).not.toContain('var(--');
  });

  it('stands the mark on the paper ground, full bleed', () => {
    expect(svg).toContain(`<rect width="512" height="512" fill="${token('--color-bg')}" />`);
  });

  it('writes SVG attribute names, not React ones', () => {
    expect(svg).toContain('stroke-width=');
    expect(svg).not.toContain('strokeWidth=');
  });
});

describe('the required set, committed under public/icons/', () => {
  // The house UI standard's six required files (#251): the vector source plus the five PNGs the
  // manifest and index.html name. `npm run icons:build` writes all six; this asserts the
  // committed tree still has them, the way `tools/pwa.test.ts` holds the manifest's PNGs to
  // `public/` — a stale or partially-regenerated icon set fails here, not as a blank app icon.
  it.each([ICON_SVG_FILE, ...ICON_SET.map((icon) => icon.file)])('ships icons/%s', (file) => {
    expect(existsSync(path.join(ICONS_DIR, file)), `${file} — npm run icons:build`).toBe(true);
  });
});

describe('the set', () => {
  it('generates exactly what the manifest and index.html name', () => {
    expect(ICON_SET.map((icon) => icon.file)).toEqual([
      'icon-192.png',
      'icon-512.png',
      'maskable-512.png',
      'apple-touch-icon-180.png',
      'favicon-32.png',
    ]);
  });

  it.each(ICON_SET)('draws $file centred in its square', ({ file, size, markHeight }) => {
    const transform = iconSvg(source, size, markHeight).match(
      /translate\((-?[\d.]+) (-?[\d.]+)\) scale\(([\d.]+)\)/,
    );
    expect(transform, `${file} has no placement transform`).not.toBeNull();

    const ink = inkBox(markShapes(source));
    const [dx, dy, scale] = [Number(transform![1]), Number(transform![2]), Number(transform![3])];
    const centre = {
      x: dx + scale * (ink.x + ink.width / 2),
      y: dy + scale * (ink.y + ink.height / 2),
    };

    expect(centre.x).toBeCloseTo(size / 2, 1);
    expect(centre.y).toBeCloseTo(size / 2, 1);
    expect(scale * ink.height).toBeCloseTo(size * markHeight, 1);
  });

  it('keeps the maskable mark inside the safe circle a launcher may crop to', () => {
    const maskable = ICON_SET.find((icon) => icon.file === 'maskable-512.png');
    const ink = inkBox(markShapes(source));

    // The drawn box, as a fraction of the icon: height is the knob, width follows the mark.
    const height = maskable!.markHeight;
    const width = height * (ink.width / ink.height);
    // Worst case is a corner: half the diagonal, from the centre.
    const cornerRadius = Math.hypot(width / 2, height / 2);

    // maskable.app's safe zone — a circle of 80% of the icon's width, i.e. radius 0.4.
    expect(cornerRadius).toBeLessThan(0.4);
    // …and the plain icons deliberately sit outside it: they are never cropped, and a mark
    // shrunk to survive a crop that will not happen is a smaller mark for no reason.
    expect(
      Math.hypot(
        (ICON_SET[0]!.markHeight * ink.width) / ink.height / 2,
        ICON_SET[0]!.markHeight / 2,
      ),
    ).toBeGreaterThan(cornerRadius);
  });
});
