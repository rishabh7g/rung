/**
 * The fonts are bundled, and they are the fonts the tokens ask for (#85, [D15]) — and no more
 * than them (#113).
 *
 * `--font-devanagari: "Mukta", system-ui, sans-serif` is a *request*. If Mukta 700 is not in the
 * bundle the browser does not fail, it substitutes: it synthesises a bold from 400, or drops to
 * `system-ui`, and on a device with no Devanagari installed that is a screen of boxes. Nothing
 * errors, no test goes red, and the first person to find out is the learner — which is why the
 * link between the ramp in `design/tokens.css` and the bundle is checked mechanically here, the
 * same shape as the shell-purity and clock guards.
 *
 * The ramp is the source of the requirement: every `--text-*` shorthand names a weight and a
 * family, so the set of (family, weight) pairs the product renders is derivable, and a new ramp
 * entry — or a weight changed from 600 to 700 — turns this red until the face is bundled. Since
 * #113 the bundle is also held to the ramp in the OTHER direction: the app is offline-first and
 * precaches every shipped byte, so a face nothing renders is not headroom, it is dead payload
 * (`tools/payload-budget.ts` meters the total). What a scan cannot do is prove a glyph exists
 * inside a face: that is `/dev/type` in a browser, recorded in docs/04-font-notes.md and
 * docs/05-perf-notes.md.
 *
 * The bundle has two parts since #113: Barlow and Barlow Condensed come from @fontsource `latin`
 * subset imports in `main.tsx`, and Mukta from `src/fonts/mukta.css`, whose woff2 payloads
 * `tools/font-subset.ts` generates per course at build time.
 */
import { describe, expect, it } from 'vitest';
import tokensCss from '../design/tokens.css?raw';
import indexHtml from '../index.html?raw';
import mainSource from './main.tsx?raw';
import muktaCss from './fonts/mukta.css?raw';
import barlowCss from '@fontsource/barlow/latin-400.css?raw';
import barlowCondensedCss from '@fontsource/barlow-condensed/latin-600.css?raw';

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

/**
 * Every face the production graph carries: the `latin` subset imports in `main.tsx`
 * (`@fontsource/barlow/latin-400.css` → `Barlow 400` — the dev-only `latin-ext` dynamic imports
 * do not match and do not add faces), plus the weights `src/fonts/mukta.css` declares.
 */
function bundledFaces(): string[] {
  const faces = new Set<string>(
    [...mainSource.matchAll(/@fontsource\/([a-z-]+)\/latin-(\d{3})\.css/g)].map(
      (match) => `${familyOf(match[1]!)} ${match[2]!}`,
    ),
  );
  for (const [, weight] of muktaCss.matchAll(/font-weight:\s*(\d{3})/g)) {
    faces.add(`Mukta ${weight!}`);
  }
  return [...faces].sort();
}

/* -------------------------------------------------------------- the guard */

describe('the bundle covers the ramp — and only the ramp (#113)', () => {
  it('bundles every weight of every family design/tokens.css renders', () => {
    const missing = rampFaces().filter((face) => !bundledFaces().includes(face));

    expect(
      missing,
      `${missing.join(', ')} — the ramp in design/tokens.css renders these and the bundle lacks them.\nA missing weight is not an error: the browser synthesises the face and nobody is told [D15].`,
    ).toEqual([]);
  });

  it('bundles nothing the ramp does not render', () => {
    const surplus = bundledFaces().filter((face) => !rampFaces().includes(face));

    expect(
      surplus,
      `${surplus.join(', ')} — bundled, but no --text-* token renders them. The precache ships every byte (#90), so unused headroom is pure payload; #113 trimmed Mukta 500, Barlow 500/600 and Barlow Condensed 500 on exactly this ground.`,
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

  it('ships script subsets, never a whole family (#113)', () => {
    // `@fontsource/mukta/400.css` bundles devanagari + latin + latin-ext + vietnamese; the
    // subset-file imports (`latin-400.css`) and src/fonts/mukta.css carry only what renders.
    const whole = [...mainSource.matchAll(/@fontsource\/[a-z-]+\/\d{3}\.css/g)].map((m) => m[0]);

    expect(
      whole,
      `${whole.join(', ')} — a whole-family import ships every script subset; import the subset files instead (docs/05-perf-notes.md).`,
    ).toEqual([]);
  });

  it('keeps latin-ext out of the production graph — dev builds only (#113)', () => {
    // The static imports are the production bundle; latin-ext (the ī ā ū of the romanized fixture
    // and /dev/type) may appear only as a dynamic import inside the `import.meta.env.DEV` branch.
    const statics = [...mainSource.matchAll(/^import '([^']*latin-ext[^']*)';$/gm)].map(
      (m) => m[1],
    );

    expect(statics).toEqual([]);
    expect(mainSource).toContain("void import('@fontsource/barlow/latin-ext-400.css');");
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
    for (const { css } of faces) expect(css).toMatch(/\.woff2'?\)\s*format\('woff2'\)/);
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
