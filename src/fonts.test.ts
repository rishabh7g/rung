/**
 * The fonts are bundled, and they are the fonts the tokens ask for (#85, [D15]).
 *
 * `--font-devanagari: "Mukta", system-ui, sans-serif` is a *request*. If Mukta 700 is not in the
 * bundle the browser does not fail, it substitutes: it synthesises a bold from 400, or drops to
 * `system-ui`, and on a device with no Devanagari installed that is a screen of boxes. Nothing
 * errors, no test goes red, and the first person to find out is the learner — which is why the
 * link between the ramp in `design/tokens.css` and the imports in `main.tsx` is checked
 * mechanically here, the same shape as the shell-purity and clock guards.
 *
 * The ramp is the source of the requirement: every `--text-*` shorthand names a weight and a
 * family, so the set of (family, weight) pairs the product renders is derivable, and a new ramp
 * entry — or a weight changed from 600 to 700 — turns this red until the face is bundled. What a
 * scan cannot do is prove a glyph exists inside the face: that is `/dev/type` in a browser, and
 * the result is recorded in `docs/04-font-notes.md`.
 */
import { describe, expect, it } from 'vitest';
import tokensCss from '../design/tokens.css?raw';
import indexHtml from '../index.html?raw';
import mainSource from './main.tsx?raw';
import muktaCss from '@fontsource/mukta/400.css?raw';
import barlowCss from '@fontsource/barlow/400.css?raw';
import barlowCondensedCss from '@fontsource/barlow-condensed/600.css?raw';

/* ------------------------------------------------------------ the tokens */

/** `--font-heading: "Barlow Condensed", …` → `{ heading: 'Barlow Condensed', … }`. */
function familiesByRole(): Record<string, string> {
  return Object.fromEntries(
    [...tokensCss.matchAll(/--font-([a-z-]+):\s*"([^"]+)"/g)].map((match) => [
      match[1]!,
      match[2]!,
    ]),
  );
}

/** The plain numeric custom properties, so `var(--font-heading-weight)` resolves to `600`. */
function numericVars(): Record<string, string> {
  return Object.fromEntries(
    [...tokensCss.matchAll(/--([a-z0-9-]+):\s*(\d+);/g)].map((match) => [match[1]!, match[2]!]),
  );
}

/**
 * Every (family, weight) the ramp renders, read off the `--text-*` font shorthands:
 * `700 23px/1 var(--font-heading)` → `Barlow Condensed 700`.
 */
function rampFaces(): string[] {
  const families = familiesByRole();
  const numbers = numericVars();
  const faces = new Set<string>();

  for (const [, value] of tokensCss.matchAll(/--text-[a-z0-9-]+:\s*([^;]+);/g)) {
    const role = value!.match(/var\(--font-([a-z-]+)\)/)?.[1];
    const family = role === undefined ? undefined : families[role];
    if (family === undefined) continue;

    const head = value!.trim().split(/\s+/)[0] ?? '';
    const weight = /^\d+$/.test(head)
      ? head
      : numbers[head.match(/var\(--([a-z0-9-]+)\)/)?.[1] ?? ''];
    if (weight === undefined) continue;

    faces.add(`${family} ${weight}`);
  }

  return [...faces].sort();
}

/* ------------------------------------------------------------ the bundle */

/** `@fontsource/barlow-condensed` → `Barlow Condensed`, the way tokens.css spells it. */
function familyOf(pkg: string): string {
  return pkg
    .split('-')
    .map((word) => word[0]!.toUpperCase() + word.slice(1))
    .join(' ');
}

/** Every face `main.tsx` imports: `@fontsource/mukta/700.css` → `Mukta 700`. */
function bundledFaces(): string[] {
  return [...mainSource.matchAll(/@fontsource\/([a-z-]+)\/(\d{3})\.css/g)]
    .map((match) => `${familyOf(match[1]!)} ${match[2]!}`)
    .sort();
}

/* -------------------------------------------------------------- the guard */

describe('the bundle covers the ramp', () => {
  it('bundles every weight of every family design/tokens.css renders', () => {
    const missing = rampFaces().filter((face) => !bundledFaces().includes(face));

    expect(
      missing,
      `${missing.join(', ')} — the ramp in design/tokens.css renders these and main.tsx does not import them.\nA missing weight is not an error: the browser synthesises the face and nobody is told [D15].`,
    ).toEqual([]);
  });

  it('reads a ramp that actually names the three families — the parse, not just its result', () => {
    const faces = rampFaces();

    expect(faces).toContain('Mukta 700');
    expect(faces).toContain('Barlow 400');
    // `--text-brand` is the wordmark, and the one place the heading face is asked for at 700.
    expect(faces).toContain('Barlow Condensed 700');
    // `var(--font-heading-weight)` resolved, rather than being skipped as unparseable.
    expect(faces).toContain('Barlow Condensed 600');
  });

  it('imports the four Devanagari weights tokens.md §2 puts Mukta at', () => {
    expect(bundledFaces().filter((face) => face.startsWith('Mukta'))).toEqual([
      'Mukta 400',
      'Mukta 500',
      'Mukta 600',
      'Mukta 700',
    ]);
  });
});

describe('what the bundled stylesheets promise', () => {
  const faces = [
    { family: 'Mukta', css: muktaCss },
    { family: 'Barlow', css: barlowCss },
    { family: 'Barlow Condensed', css: barlowCondensedCss },
  ];

  it('declares the family name the token asks for, exactly', () => {
    const families = Object.values(familiesByRole());

    for (const { family, css } of faces) {
      expect(families).toContain(family);
      expect(css).toContain(`font-family: '${family}'`);
    }
  });

  it('swaps rather than blocking — text is readable before the face arrives', () => {
    for (const { css } of faces) expect(css).toContain('font-display: swap');
  });

  it('serves woff2', () => {
    for (const { css } of faces) expect(css).toMatch(/url\([^)]+\.woff2\)\s*format\('woff2'\)/);
  });
});

describe('nothing is fetched at runtime', () => {
  /** The files the app ships — tests are excluded, as in `shellPurity.test.ts`: this file names a
      host in order to look for it, and a guard that failed on itself would be deleted, not fixed. */
  const SHIPPED: Readonly<Record<string, string>> = Object.fromEntries(
    Object.entries(
      import.meta.glob<string>('./**/*.{ts,tsx,css}', {
        query: '?raw',
        import: 'default',
        eager: true,
      }),
    )
      .map(([file, source]) => [file.replace('./', 'src/'), source] as const)
      .filter(([file]) => !/\.test\.tsx?$/.test(file) && !file.startsWith('src/test/')),
  );

  it('names no font host anywhere in the source or the HTML shell', () => {
    const hosts = /fonts\.(googleapis|gstatic|bunny|cdnfonts)\.com|use\.typekit/;
    const offenders = Object.entries({ ...SHIPPED, 'index.html': indexHtml })
      .filter(([, source]) => hosts.test(source))
      .map(([file]) => file);

    expect(
      offenders,
      `${offenders.join(', ')} fetches a font at runtime. Every face is bundled — offline is the product (design/pwa-checklist.md §2).`,
    ).toEqual([]);
  });
});
