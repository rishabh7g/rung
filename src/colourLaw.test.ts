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
 */
import { describe, expect, it } from 'vitest';

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
