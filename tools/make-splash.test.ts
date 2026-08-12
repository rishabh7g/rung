/**
 * The splash set stays the header lockup, on every iPhone it claims to cover (#115).
 *
 * Three drifts break this feature silently, and each is a section here: `index.html` naming a
 * different set of images than `tools/make-splash.ts` generates (iOS matches by EXACT media
 * query — a mismatch is a white flash, not an error); a committed PNG whose pixels are not the
 * size its filename and media query promise (same white flash); and the precache quietly
 * swallowing the set, which would make every first visit download images only Safari's
 * Add-to-Home-Screen ever uses. The lockup arithmetic rides along the way make-icons' does.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import {
  LOCKUP_GAP_UNITS,
  MARK_FRACTION,
  SPLASH_DEVICES,
  SPLASH_DIR,
  brandMarkPx,
  lockupMarkSvg,
  lockupScale,
  splashFile,
  splashLink,
  splashMedia,
  wordmarkPx,
} from './make-splash.ts';
import { readMarkSource } from './make-icons.ts';
import { ICONS_DIR, PRECACHE_GLOBS } from './pwa.ts';
import { token } from './tokens.ts';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const indexHtml = readFileSync(path.join(REPO_ROOT, 'index.html'), 'utf8');

describe('the device set', () => {
  it('is portrait iPhones with distinct filenames — the manifest pins orientation: portrait', () => {
    for (const device of SPLASH_DEVICES) {
      expect(device.height, `${device.models} is not portrait`).toBeGreaterThan(device.width);
      expect([2, 3]).toContain(device.ratio);
    }
    expect(new Set(SPLASH_DEVICES.map(splashFile)).size).toBe(SPLASH_DEVICES.length);
  });

  it('writes the media query iOS actually matches on — every clause present, pixel-exact', () => {
    expect(splashMedia({ width: 390, height: 844, ratio: 3, models: '' })).toBe(
      'screen and (device-width: 390px) and (device-height: 844px) ' +
        'and (-webkit-device-pixel-ratio: 3) and (orientation: portrait)',
    );
  });

  it('names the file by its pixel size, so the filename cannot contradict the media query', () => {
    expect(splashFile({ width: 390, height: 844, ratio: 3, models: '' })).toBe(
      'splash-1170x2532.png',
    );
  });
});

describe('index.html carries exactly the generated set', () => {
  // Prettier splits the tags across lines, so the comparison normalises whitespace on both
  // sides and reads the attributes, not the formatting.
  const declared = [...indexHtml.matchAll(/<link[^>]*apple-touch-startup-image[^>]*>/gs)].map(
    ([tag]) => {
      const attr = (name: string) => tag.replace(/\s+/g, ' ').match(`${name}="([^"]*)"`)?.[1];
      return { media: attr('media'), href: attr('href') };
    },
  );

  it('one link per device, same order, same media query, same image', () => {
    expect(declared).toEqual(
      SPLASH_DEVICES.map((device) => ({
        media: splashMedia(device),
        href: `/${SPLASH_DIR}/${splashFile(device)}`,
      })),
    );
  });

  it('splashLink() prints what index.html must carry — the receipt for adding a device', () => {
    expect(splashLink(SPLASH_DEVICES[0]!)).toBe(
      `<link rel="apple-touch-startup-image" media="${splashMedia(SPLASH_DEVICES[0]!)}" ` +
        `href="/${SPLASH_DIR}/${splashFile(SPLASH_DEVICES[0]!)}" />`,
    );
  });

  it('keeps black-translucent, without which the splash sits under an opaque status bar', () => {
    expect(indexHtml).toContain(
      '<meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />',
    );
  });
});

describe('the committed PNGs', () => {
  // The pixel size read straight out of the PNG header (IHDR: width and height as big-endian
  // u32 at offsets 16 and 20) — no native image module in the test runner, same reason
  // tools/make-icons.test.ts never loads sharp.
  const pngSize = (file: string): { width: number; height: number } => {
    const png = readFileSync(path.join(REPO_ROOT, 'public', SPLASH_DIR, file));
    return { width: png.readUInt32BE(16), height: png.readUInt32BE(20) };
  };

  it.each(SPLASH_DEVICES)(
    'ships $width×$height @$ratio ($models) at the promised pixel size',
    (device) => {
      expect(pngSize(splashFile(device))).toEqual({
        width: device.width * device.ratio,
        height: device.height * device.ratio,
      });
    },
  );
});

describe('the set stays out of the precache', () => {
  it('lives under icons/, but one directory down from the `icons/*.png` glob — `*` stops at `/`', () => {
    expect(SPLASH_DIR).toBe(`${ICONS_DIR}/splash`);
    expect(PRECACHE_GLOBS).toContain(`${ICONS_DIR}/*.png`);
    // No glob may reach into the subdirectory: the app never fetches a splash image.
    expect(PRECACHE_GLOBS.some((glob) => glob.includes(`${ICONS_DIR}/**`))).toBe(false);
  });
});

describe('the lockup arithmetic', () => {
  it('reads the header tokens rather than restating them', () => {
    expect(brandMarkPx()).toBe(Number.parseFloat(token('--brand-mark')));
    expect(wordmarkPx()).toBeGreaterThan(brandMarkPx()); // --text-brand's 23px over the 20px box
  });

  it('scales every length by the one unit: the mark box as MARK_FRACTION of the height', () => {
    const height = 2532;
    const { markBox, fontPx, gapPx } = lockupScale(height);

    expect(markBox).toBe(Math.round(height * MARK_FRACTION));
    expect(fontPx).toBe(Math.round(markBox * (wordmarkPx() / brandMarkPx())));
    expect(gapPx).toBe(Math.round(markBox * (LOCKUP_GAP_UNITS / brandMarkPx())));
  });

  it('draws the mark for the splash on a TRANSPARENT ground, colours resolved', () => {
    const svg = lockupMarkSvg(readMarkSource(), 127);

    expect(svg).toContain('width="127" height="127"');
    expect(svg).not.toContain(token('--color-bg')); // no paper rect — the canvas is the paper
    expect(svg).toContain(`stroke="${token('--color-text')}"`);
    expect(svg).toContain(`fill="${token('--color-accent')}"`);
    expect(svg).not.toContain('currentColor');
  });
});
