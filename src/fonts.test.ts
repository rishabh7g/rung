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
 * The bundle has three parts since #197: Barlow and Barlow Condensed come from @fontsource `latin`
 * subset imports in `main.tsx`, Mukta from `src/fonts/mukta.css` and Noto Naskh Arabic from
 * `src/fonts/naskh.css`, whose woff2 payloads `tools/font-subset.ts` generates per course at
 * build time.
 *
 * The ramp is not the whole requirement, and #197 is why. The romanized courses' quiet native
 * line keeps a `--text-*` size and swaps only the family (`font-family: var(--font-script-
 * fallback)`), so its face appears in no `--text-*` shorthand at all — an Arabic line that
 * regressed to `system-ui` would render in whatever the phone owned, or in tofu, and every test
 * here would stay green. So the requirement is read off the *stylesheets*: any rule that pairs a
 * `--text-*` shorthand with a `font-family: var(--font-*)` override contributes that (family,
 * weight) pair too, and the family is resolved through `src/styles/tokenOverrides.css` — the one
 * file allowed to change a value in the read-only `design/` package.
 */
import { describe, expect, it } from 'vitest';
import tokensCss from '../design/tokens.css?raw';
import indexHtml from '../index.html?raw';
import mainSource from './main.tsx?raw';
import muktaCss from './fonts/mukta.css?raw';
import naskhCss from './fonts/naskh.css?raw';
import overridesCss from './styles/tokenOverrides.css?raw';
import fontNotes from '../docs/04-font-notes.md?raw';
import barlowCss from '@fontsource/barlow/latin-400.css?raw';
import barlowCondensedCss from '@fontsource/barlow-condensed/latin-600.css?raw';

/* ------------------------------------------------------------ the tokens */

/** Every stylesheet under `src/`, keyed the way a failure should name it — the same glob
    `styleContract.test.ts` scans, because the same files are the source of truth for both. */
const STYLESHEETS: Readonly<Record<string, string>> = Object.fromEntries(
  Object.entries(
    import.meta.glob<string>('./**/*.css', { query: '?raw', import: 'default', eager: true }),
  ).map(([file, source]) => [file.replace('./', 'src/'), source]),
);

/**
 * `--font-heading: "Barlow Condensed", …` → `{ heading: 'Barlow Condensed', … }`, read from
 * `design/tokens.css` and then from the override sheet, which wins the way it wins in the
 * cascade: `main.tsx` imports it straight after the tokens, so its `:root` rule is later.
 *
 * A stack with no quoted family (`system-ui, sans-serif`) contributes no face — nothing to bundle
 * and nothing to check, which is exactly what `--font-script-fallback` was before #197.
 */
function familiesByRole(): Record<string, string> {
  const roles: Record<string, string> = {};
  for (const css of [tokensCss, overridesCss]) {
    for (const match of css.matchAll(/--font-([a-z-]+):\s*['"]([^'"]+)['"]/g)) {
      roles[match[1]!] = match[2]!;
    }
  }
  return roles;
}

/** The plain numeric custom properties, so `var(--font-heading-weight)` resolves to `600`. */
function numericVars(): Record<string, string> {
  return Object.fromEntries(
    [...tokensCss.matchAll(/--([a-z0-9-]+):\s*(\d+);/g)].map((match) => [match[1]!, match[2]!]),
  );
}

/** The `--text-*` shorthands, keyed by token name: `l2-hero` → `700 32px/1.55 var(…)`. */
function rampShorthands(): Record<string, string> {
  return Object.fromEntries(
    [...tokensCss.matchAll(/--(text-[a-z0-9-]+):\s*([^;]+);/g)].map((match) => [
      match[1]!,
      match[2]!,
    ]),
  );
}

/** The weight a `--text-*` shorthand renders at, `var(--font-heading-weight)` resolved. */
function weightOf(shorthand: string): string | undefined {
  const head = shorthand.trim().split(/\s+/)[0] ?? '';
  return /^\d+$/.test(head) ? head : numericVars()[head.match(/var\(--([a-z0-9-]+)\)/)?.[1] ?? ''];
}

/**
 * Every (family, weight) the ramp renders, read off the `--text-*` font shorthands:
 * `700 23px/1 var(--font-heading)` → `Barlow Condensed 700`.
 */
function rampFaces(): string[] {
  const families = familiesByRole();
  const faces = new Set<string>();

  for (const value of Object.values(rampShorthands())) {
    const role = value.match(/var\(--font-([a-z-]+)\)/)?.[1];
    const family = role === undefined ? undefined : families[role];
    if (family === undefined) continue;

    const weight = weightOf(value);
    if (weight === undefined) continue;

    faces.add(`${family} ${weight}`);
  }

  return [...faces].sort();
}

/**
 * The faces the ramp CANNOT name: a rule that takes a `--text-*` shorthand for its size and then
 * swaps the family (`font-family: var(--font-script-fallback)`) renders a pair no token spells out
 * (#197). The five `.script` rules are the whole population today — `styleContract.test.ts` calls
 * that override "the one place that does" — and this reads them out of the stylesheets rather than
 * trusting the count, so a sixth at another size joins the requirement automatically.
 */
function overriddenFaces(): { file: string; family: string; weight: string }[] {
  const families = familiesByRole();
  const shorthands = rampShorthands();
  const found: { file: string; family: string; weight: string }[] = [];

  for (const [file, source] of Object.entries(STYLESHEETS)) {
    for (const [, body] of source.matchAll(/\{([^}]*)\}/g)) {
      const role = body!.match(/font-family:\s*var\(--font-([a-z-]+)\)/)?.[1];
      const size = body!.match(/font:\s*var\(--(text-[a-z0-9-]+)\)/)?.[1];
      if (role === undefined || size === undefined) continue;

      const family = families[role];
      const weight = weightOf(shorthands[size] ?? '');
      if (family === undefined || weight === undefined) continue;

      found.push({ file, family, weight });
    }
  }
  return found;
}

/** Everything the product renders: the ramp, plus the family-swapped rules the ramp cannot see. */
function requiredFaces(): string[] {
  return [
    ...new Set([...rampFaces(), ...overriddenFaces().map((o) => `${o.family} ${o.weight}`)]),
  ].sort();
}

/* ------------------------------------------------------------ the bundle */

/** `@fontsource/barlow-condensed` → `Barlow Condensed`, the way tokens.css spells it. */
function familyOf(pkg: string): string {
  return pkg
    .split('-')
    .map((word) => word[0]!.toUpperCase() + word.slice(1))
    .join(' ');
}

/** Every `@font-face` family + weight a committed sheet declares: `Mukta 400`, `Noto Naskh
    Arabic 400`. One regex over both sheets — the family is read, never assumed. */
function facesIn(css: string): string[] {
  return [...css.matchAll(/@font-face\s*\{[^}]*\}/g)].flatMap((block) => {
    const family = block[0].match(/font-family:\s*['"]([^'"]+)['"]/)?.[1];
    const weight = block[0].match(/font-weight:\s*(\d{3})/)?.[1];
    return family !== undefined && weight !== undefined ? [`${family} ${weight}`] : [];
  });
}

/**
 * Every face the production graph carries: the `latin` subset imports in `main.tsx`
 * (`@fontsource/barlow/latin-400.css` → `Barlow 400` — the dev-only `latin-ext` dynamic imports
 * do not match and do not add faces), plus the faces the committed subset sheets declare.
 */
function bundledFaces(): string[] {
  const faces = new Set<string>(
    [...mainSource.matchAll(/@fontsource\/([a-z-]+)\/latin-(\d{3})\.css/g)].map(
      (match) => `${familyOf(match[1]!)} ${match[2]!}`,
    ),
  );
  for (const face of [...facesIn(muktaCss), ...facesIn(naskhCss)]) faces.add(face);
  return [...faces].sort();
}

/* -------------------------------------------------------------- the guard */

describe('the bundle covers what the product renders — and only that (#113, #197)', () => {
  it('bundles every weight of every family the product renders', () => {
    const missing = requiredFaces().filter((face) => !bundledFaces().includes(face));

    expect(
      missing,
      `${missing.join(', ')} — the product renders these and the bundle lacks them.\nA missing weight is not an error: the browser synthesises the face and nobody is told [D15].`,
    ).toEqual([]);
  });

  it('bundles nothing the product does not render', () => {
    const surplus = bundledFaces().filter((face) => !requiredFaces().includes(face));

    expect(
      surplus,
      `${surplus.join(', ')} — bundled, but nothing renders them. The precache ships every byte (#90), so unused headroom is pure payload; #113 trimmed Mukta 500, Barlow 500/600 and Barlow Condensed 500 on exactly this ground.`,
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

describe('the quiet native script line has a bundled face, not a guess (#197)', () => {
  /** The stack `--font-script-fallback` actually resolves to once the override has been applied. */
  const stack = [
    ...[tokensCss, overridesCss].join('\n').matchAll(/--font-script-fallback:([^;]+);/g),
  ]
    .at(-1)?.[1]
    ?.trim();

  it('names a face before it names system-ui — the five .script rules are the only Arabic on screen', () => {
    expect(
      stack,
      'design/tokens.css declares --font-script-fallback; something has to.',
    ).toBeDefined();
    expect(
      stack,
      `--font-script-fallback resolves to "${stack}" — a bare system-ui stack means the Arabic line renders in whatever the device owns, or in tofu where it owns nothing (docs/04-font-notes.md §8). Name the bundled face first.`,
    ).toMatch(/^['"][^'"]+['"]\s*,/);
  });

  it('names a face the bundle actually carries, at the weight the line renders', () => {
    const overrides = overriddenFaces();

    expect(overrides.length, 'no rule swaps the family off a --text-* shorthand any more').toBe(5);
    for (const { file, family, weight } of overrides) {
      expect(
        bundledFaces(),
        `${file} renders ${family} ${weight} and the bundle has no such face.`,
      ).toContain(`${family} ${weight}`);
    }
  });

  it('routes the Arabic block to that face — a range that misses it is the same as no face', () => {
    const range = naskhCss.match(/unicode-range:([^;]+);/)?.[1] ?? '';

    expect(range).toContain('U+0600-06FF');
    // The presentation forms a shaper may reach for, and the joiners that control ligation.
    expect(range).toContain('U+FE70-FEFC');
    expect(range).toContain('U+200C-200E');
  });

  it('keeps the override in src/ and imported after the read-only tokens (docs/design-contract.md)', () => {
    const tokens = mainSource.indexOf("import '../design/tokens.css';");
    const override = mainSource.indexOf("import './styles/tokenOverrides.css';");

    expect(tokens).toBeGreaterThan(-1);
    expect(
      override,
      'the override sheet is not imported — --font-script-fallback falls back to the design value',
    ).toBeGreaterThan(tokens);
    // design/ is wiped on re-copy: the face must never be written INTO the design package. The
    // token there still resolves to the system stack — its comment asks for a Naskh, the override
    // is the answer, and the day design ships one itself this line says the override is redundant.
    expect(tokensCss).not.toMatch(/--font-script-fallback:\s*['"]/);
  });

  it('is written down where a divergence has to be written down', () => {
    const family = familiesByRole()['script-fallback'];

    expect(family).toBeDefined();
    expect(overridesCss).toContain('04-font-notes');
    // The doc names the face and its licence — a bundled font with neither is the real failure.
    expect(fontNotes).toContain(family!);
    expect(fontNotes).toMatch(/SIL Open Font License|OFL/);
  });
});

describe('what the bundled stylesheets promise', () => {
  const faces = [
    { family: 'Mukta', css: muktaCss },
    { family: 'Noto Naskh Arabic', css: naskhCss },
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
