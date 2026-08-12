/**
 * The colour law, app-wide (#117) — the mechanical half of design/tokens.md §7 rule 2:
 * "Green/red exist only in self-marks; amber only in interference; success only in the unlock
 * beat."
 *
 * The per-screen guards already hold their own corner of it — `SentenceScreen.test.tsx` walks its
 * stylesheet's trap selectors, `RevealCard.test.tsx` pins the `--mark-*` fills to the two lit
 * segments — but rule 2 is a claim about the WHOLE app: the day a loud token reaches one new
 * stylesheet, no per-screen test is looking there. This scan is, the same way
 * `styleContract.test.ts` looks for hard-coded values everywhere: every loud token group has an
 * allowlist of the sheets sanctioned to speak it, and a new file using one is a failure until the
 * design package sanctions it here, on the record.
 *
 * `styleContract.test.ts` closes the back door: no raw hex/oklch can enter a stylesheet, so the
 * ONLY way to say green, red or amber is through these tokens — which makes this file-level scan
 * the whole of the law, not a heuristic.
 *
 * The fourth clause here is motion (§5): "prefers-reduced-motion collapses every one" — so any
 * sheet that declares an `animation` or `transition` must also carry the reduce block. That is the
 * reduced-motion pass of the #117 walk, kept true mechanically.
 *
 * The fifth is contrast (#184): every filled object the product paints text on clears WCAG AA
 * (4.5:1) — computed from `design/tokens.css`, not eyeballed. The CTA shipped at 3.71:1 for a
 * whole phase because nothing here could tell.
 *
 * The sixth is the other half of that (#185): the muted ink ramp. Its rungs are `color-mix()`
 * over `--color-text`, so they only exist once composited onto a ground — this clause does that
 * composite, walks every `color: var(--ink-*)` in `src/`, and holds each to 4.5:1. Four rungs
 * (55/50/45/40) drew text at 3.63 → 2.42:1 before it existed.
 */
import { describe, expect, it } from 'vitest';
import tokensCss from '../design/tokens.css?raw';

/** Every stylesheet under `src/`, keyed the way a failure should name it. */
const STYLESHEETS: Readonly<Record<string, string>> = Object.fromEntries(
  Object.entries(
    import.meta.glob<string>('./**/*.css', { query: '?raw', import: 'default', eager: true }),
  ).map(([file, source]) => [file.replace('./', 'src/'), source]),
);

/** Comments quote token names to document rules — the scan is about declarations. */
function stripComments(source: string): string {
  return source.replace(/\/\*[\s\S]*?\*\//g, ' ');
}

/**
 * Each loud token group and the sheets sanctioned to use it. The lists are the point: adding a
 * file here is a design decision (§7 rule 2), and this test is where it is made on the record.
 */
const LAWS = [
  {
    what: 'amber — interference only',
    pattern: /--interference-[a-z-]*\b/,
    sanctioned: [
      // The trap callout + tag pair on the module list's expanded card (#88).
      'src/screens/module/SentenceCard.module.css',
      // Detail's trap plate — its own test walks the selectors carrying these (#89).
      'src/screens/SentenceScreen.module.css',
      // The one amber chip (design/tokens.md §1: "interference traps + interference tag ONLY").
      'src/screens/TagChip.module.css',
    ],
  },
  {
    what: 'green/red — self-marks only',
    pattern: /--mark-(got|miss|fg)[a-z-]*\b/,
    sanctioned: [
      // The one control in the app allowed to be loud (PRD-design §7 [D11]) — Practice and
      // Comprehension both render THIS component, so the pair exists in one stylesheet.
      'src/components/SelfMark.module.css',
    ],
  },
  {
    what: 'success — the unlock beat only',
    pattern: /--motion-unlock\b/,
    sanctioned: [
      // The product's single celebration (#103); Ladder and level cell share these keyframes.
      'src/screens/ladder/unlockBeat.module.css',
    ],
  },
] as const;

describe('the colour law (design/tokens.md §7 rule 2)', () => {
  it.each(LAWS)('$what', ({ pattern, sanctioned }) => {
    const offenders = Object.entries(STYLESHEETS)
      .filter(([, source]) => pattern.test(stripComments(source)))
      .map(([file]) => file)
      .sort();

    expect(offenders).toEqual([...sanctioned].sort());
  });

  it('would catch a planted violation — the scan reads declarations, not comments', () => {
    const planted = '/* --mark-got-bg is fine to MENTION */ .x { background: var(--mark-got-bg); }';

    expect(LAWS[1].pattern.test(stripComments(planted))).toBe(true);
    expect(LAWS[1].pattern.test(stripComments('/* background: var(--mark-got-bg) */'))).toBe(false);
  });
});

describe('reduced motion (design/tokens.md §5)', () => {
  it('every sheet that moves also collapses: animation/transition ⇒ a reduce block', () => {
    const moving = Object.entries(STYLESHEETS)
      .filter(([, source]) =>
        /(?:^|[\s;{])(?:animation|transition)\s*:/m.test(stripComments(source)),
      )
      .map(([file, source]) => ({
        file,
        reduces: /@media\s*\(\s*prefers-reduced-motion\s*:\s*reduce\s*\)/.test(source),
      }));

    // The scan must be looking at something — all four motions ship today.
    expect(moving.length).toBeGreaterThanOrEqual(4);

    const silent = moving.filter((sheet) => !sheet.reduces).map((sheet) => sheet.file);
    expect(
      silent,
      `${silent.join(', ')} declares motion without a prefers-reduced-motion block`,
    ).toEqual([]);
  });
});

/* ------------------------------------------------- contrast (#184, §10) */

/**
 * `design/tokens.css` parsed the way `tools/tokens.ts` parses it — a flat `--name: value` scan,
 * last declaration winning — because the contrast of a fill is a property of the design package,
 * not of any stylesheet that consumes it.
 */
const TOKENS = new Map(
  [...tokensCss.matchAll(/--([a-z0-9-]+)\s*:\s*([^;{}]+);/g)].map(
    ([, name, value]) => [name!, value!.trim()] as const,
  ),
);

/** One token's literal colour, following a single `var()` hop (`--mark-fg: var(--color-bg)`). */
function colour(name: string): string {
  const raw = TOKENS.get(name.replace(/^--/, ''));
  if (raw === undefined) throw new Error(`design/tokens.css defines no ${name}`);

  const alias = raw.match(/^var\(\s*(--[a-z0-9-]+)\s*\)$/);
  return alias === null ? raw : colour(alias[1]!);
}

const clamp = (value: number): number => Math.min(1, Math.max(0, value));

/** sRGB companding — WCAG 2.2's relative-luminance definition, and its inverse for OKLab. */
const toLinear = (channel: number): number =>
  channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4;

/**
 * Linear-light sRGB for the two colour syntaxes the package speaks: `#rrggbb` and `oklch(L C H)`
 * (Ottosson's matrices, the same conversion a browser runs before it paints the amber and the
 * self-marks). Out-of-gamut components clamp, which is what the browser does too.
 */
function linearRgb(value: string): readonly [number, number, number] {
  const hex = value.match(/^#([0-9a-f]{6})$/i);
  if (hex !== null) {
    const packed = Number.parseInt(hex[1]!, 16);
    return [(packed >> 16) & 255, (packed >> 8) & 255, packed & 255].map((channel) =>
      toLinear(channel / 255),
    ) as unknown as readonly [number, number, number];
  }

  const oklch = value.match(/^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*\)$/);
  if (oklch === null) throw new Error(`contrast: cannot read the colour "${value}"`);

  const [lightness, chroma, hueDeg] = [+oklch[1]!, +oklch[2]!, +oklch[3]!];
  const hue = (hueDeg * Math.PI) / 180;
  const a = chroma * Math.cos(hue);
  const b = chroma * Math.sin(hue);

  const l = (lightness + 0.3963377774 * a + 0.2158037573 * b) ** 3;
  const m = (lightness - 0.1055613458 * a - 0.0638541728 * b) ** 3;
  const s = (lightness - 0.0894841775 * a - 1.291485548 * b) ** 3;

  return [
    clamp(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    clamp(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    clamp(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ] as const;
}

/** WCAG 2.2 contrast ratio, 1 → 21. */
function contrast(foreground: string, background: string): number {
  const luminance = (value: string): number => {
    const [r, g, b] = linearRgb(value);
    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
  };

  const [light, dark] = [luminance(foreground), luminance(background)].sort((x, y) => y - x);
  return (light! + 0.05) / (dark! + 0.05);
}

/**
 * Every filled object the product paints text on. AA for fills is PRD-design §10; the bar is the
 * full 4.5:1 and not the large-text 3:1 because none of these labels is WCAG "large" (≥24px, or
 * ≥18.66px at weight 700) — the CTA's 18px/600 is the case that missed (#184).
 *
 * Text on the *ground* is the ink ramp's clause below (#185) — same arithmetic, one extra step
 * (compositing the `color-mix()` onto the ground first).
 */
const FILLS = [
  // The one that shipped at 3.71:1 — six CTAs plus the lit phase chip, all this pair (#184).
  { what: 'primary CTA fill', label: '--color-bg', fill: '--color-accent' },
  { what: 'primary CTA, pressed', label: '--color-bg', fill: '--color-accent-700' },
  { what: 'self-mark — got it', label: '--mark-fg', fill: '--mark-got-bg' },
  { what: 'self-mark — missed', label: '--mark-fg', fill: '--mark-miss-bg' },
  { what: 'interference trap plate', label: '--interference-text', fill: '--interference-bg' },
  { what: 'interference tag chip', label: '--interference-tag-fg', fill: '--interference-tag-bg' },
  { what: 'delta tag chip', label: '--tag-delta-fg', fill: '--tag-delta-bg' },
  { what: 'free tag chip', label: '--tag-free-fg', fill: '--tag-free-bg' },
  { what: 'toast', label: '--toast-fg', fill: '--toast-bg' },
] as const;

const AA = 4.5;

describe('contrast — every fill clears WCAG AA (PRD-design §10, #184)', () => {
  it.each(FILLS)('$what', ({ label, fill }) => {
    const measured = contrast(colour(label), colour(fill));

    expect(
      Number(measured.toFixed(2)),
      `${label} on ${fill} measures ${measured.toFixed(2)}:1 — AA for fills is ${AA}:1`,
    ).toBeGreaterThanOrEqual(AA);
  });

  it('accent text on the ground clears AA as well — the ghost buttons and the crosshair', () => {
    expect(contrast(colour('--color-accent'), colour('--color-bg'))).toBeGreaterThanOrEqual(AA);
  });

  it('measures what the browser paints — the #184 pair, before and after', () => {
    // The measurement on the record in the issue: Industry's #5980a6 under the same label.
    expect(contrast('#f2f2f3', '#5980a6')).toBeCloseTo(3.71, 2);
    // And the value the design package now ships, quoted in design/tokens.md §1.
    expect(contrast(colour('--color-bg'), colour('--color-accent'))).toBeCloseTo(4.71, 2);
    // The green self-mark is the tightest oklch pair — proof the oklch path is not a stub.
    expect(contrast('#f2f2f3', 'oklch(0.52 0.10 150)')).toBeCloseTo(4.7, 1);
  });
});

/* ------------------------------------------------- the ink ramp (#185, §1) */

/** sRGB 0–255 for any colour the package speaks — `toLinear` run backwards over `linearRgb`. */
function srgb255(value: string): readonly [number, number, number] {
  const encode = (channel: number): number =>
    channel <= 0.0031308 ? channel * 12.92 : 1.055 * channel ** (1 / 2.4) - 0.055;

  return linearRgb(value).map((channel) => encode(channel) * 255) as unknown as readonly [
    number,
    number,
    number,
  ];
}

/**
 * One ink rung painted on one ground: `color-mix(in srgb, var(--color-text) N%, transparent)` is
 * the text colour at alpha N/100, and the browser composites that over whatever is behind it —
 * a straight per-channel lerp in sRGB. Nothing in the ramp is a colour until this happens, which
 * is why #184's fills-only table could not see it.
 */
function inkOn(percent: number, ground: string): string {
  const alpha = percent / 100;
  const [ink, paper] = [srgb255(colour('--color-text')), srgb255(ground)];

  const channel = (index: number): string =>
    Math.round(alpha * ink[index]! + (1 - alpha) * paper[index]!)
      .toString(16)
      .padStart(2, '0');

  return `#${channel(0)}${channel(1)}${channel(2)}`;
}

/** The ramp as `design/tokens.css` declares it: `--ink-<name>` → the percentage it mixes. */
const INK_RAMP: ReadonlyMap<number, number> = new Map(
  [
    ...tokensCss.matchAll(
      /--ink-(\d+)\s*:\s*color-mix\(in srgb,\s*var\(--color-text\)\s*([\d.]+)%,\s*transparent\)/g,
    ),
  ].map(([, name, percent]) => [Number(name), Number(percent)] as const),
);

/**
 * Every ground the product paints ink text on. `--color-bg` is the paper and the darkest of them;
 * the plates are lighter, and are here so a future plate colour cannot quietly become the tightest
 * pair in the app without this failing.
 */
const GROUNDS = ['--color-bg', '--color-surface', '--mistake-bg', '--interference-bg'] as const;

/** Every `color: var(--ink-N)` in `src/`, by rung, with the sheets a failure should name. */
function inkTextRungs(): Map<number, string[]> {
  const rungs = new Map<number, string[]>();

  for (const [file, source] of Object.entries(STYLESHEETS)) {
    for (const [, rung] of stripComments(source).matchAll(/\bcolor:\s*var\(--ink-(\d+)\)/g)) {
      const sheets = rungs.get(Number(rung)) ?? [];
      rungs.set(Number(rung), [...sheets, file]);
    }
  }

  return rungs;
}

/** The lowest rung the design package lets text stand on (design/tokens.md §1). */
const INK_TEXT_FLOOR = 65;

/** WCAG 1.4.11: non-text — hairlines, strokes, the registration marks — needs 3:1, not 4.5:1. */
const NON_TEXT = 3;

describe('the muted ink ramp clears AA wherever it draws text (#185)', () => {
  it('is named for its recipe — `--ink-N` mixes N% of --color-text', () => {
    expect(INK_RAMP.size).toBeGreaterThanOrEqual(4);

    for (const [name, percent] of INK_RAMP) expect(percent).toBe(name);
  });

  it.each([...inkTextRungs()].sort(([a], [b]) => b - a))(
    '--ink-%d as text clears 4.5:1 on every ground',
    (rung, sheets) => {
      const percent = INK_RAMP.get(rung);
      expect(percent, `design/tokens.css defines no --ink-${rung}`).toBeDefined();

      for (const ground of GROUNDS) {
        const measured = contrast(inkOn(percent!, colour(ground)), colour(ground));

        expect(
          Number(measured.toFixed(2)),
          `--ink-${rung} on ${ground} measures ${measured.toFixed(2)}:1 — AA is ${AA}:1. ` +
            `Drawn by ${[...new Set(sheets)].join(', ')}. None of the ramp's text is WCAG-large ` +
            `(largest is --devanagari-min-size, 18px/400), so 4.5:1 is the whole bar.`,
        ).toBeGreaterThanOrEqual(AA);
      }
    },
  );

  it('keeps the rungs below the floor for non-text only, and above 3:1 there', () => {
    const drawingText = [...inkTextRungs().keys()].filter((rung) => rung < INK_TEXT_FLOOR);
    expect(
      drawingText,
      `--ink-${drawingText.join('/')} is below the ${INK_TEXT_FLOOR}% text floor (design/tokens.md §1)`,
    ).toEqual([]);

    // What is left below the floor is `--ink-55`, the registration marks' stroke — decoration, so
    // strictly exempt, but it clears the 1.4.11 bar anyway and the ramp keeps no rung that cannot.
    for (const [rung, percent] of INK_RAMP) {
      if (rung >= INK_TEXT_FLOOR) continue;

      expect(
        contrast(inkOn(percent, colour('--color-bg')), colour('--color-bg')),
        `--ink-${rung} is under ${NON_TEXT}:1 — too faint even for a hairline`,
      ).toBeGreaterThanOrEqual(NON_TEXT);
    }
  });

  it('measures what the browser paints — the #185 rungs, before and after', () => {
    const onPaper = (percent: number): number =>
      contrast(inkOn(percent, colour('--color-bg')), colour('--color-bg'));

    // The four measurements on the record in the issue, sampled over CDP against the live build.
    expect(onPaper(55)).toBeCloseTo(3.63, 1);
    expect(onPaper(50)).toBeCloseTo(3.15, 1);
    expect(onPaper(45)).toBeCloseTo(2.76, 1);
    expect(onPaper(40)).toBeCloseTo(2.42, 1);

    // And the ramp the design package now ships, quoted in design/tokens.md §1.
    expect(onPaper(75)).toBeCloseTo(6.82, 1);
    expect(onPaper(70)).toBeCloseTo(5.79, 1);
    expect(onPaper(INK_TEXT_FLOOR)).toBeCloseTo(4.93, 1);

    // Why 65 and not the arithmetic floor: 62% lands ON the line (4.4988 unrounded, 4.5005 once
    // the channels quantise to 8 bits) and 61% misses. The floor rung is 65% so the quiet voice
    // has margin over every ground, not a rounding coin-flip on one of them.
    expect(onPaper(61)).toBeLessThan(AA);
    expect(onPaper(62)).toBeCloseTo(AA, 2);
  });
});
