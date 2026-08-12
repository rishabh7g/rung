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
 * Text on the *ground* is a different question and a different ticket: the quiet ink ramp
 * (`--ink-55…40`) is #185's, and its `color-mix()` values do not resolve here anyway.
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
