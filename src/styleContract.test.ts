/**
 * Tokens only (#84) — the mechanical half of design-contract rule 1: "Style exclusively against
 * `design/tokens.css`. Load it and use `var(--*)` only. No hard-coded hex, px, or font names in
 * components."
 *
 * A hard-coded value is not a bug the day it is written; it is a bug the day the token changes
 * and one screen does not. Prose cannot catch that, and neither can review at the pace this repo
 * merges — a scan can: no stylesheet the app ships may carry a hex colour, a px length, or a
 * font family by name, because every one of those has a token (`design/tokens.md`), and a value
 * with no token is a design decision that has not been made yet.
 *
 * The scan reads `src/**` only. `design/tokens.css` is the source of the values and obviously
 * full of them; it is imported in place and never copied (`main.tsx`).
 *
 * Five things are deliberately allowed:
 *
 *   • **Comments.** They are stripped before the scan: the rules quote token values
 *     ("48px", "the design's 30px gap") to say what a var resolves to, which is the opposite of
 *     the habit this guards against.
 *   • **`@font-face` blocks.** They are stripped too (#113): `font-family: 'Mukta'` inside one
 *     DEFINES the face that `--font-devanagari` names — the opposite of styling an element with
 *     a face by name, which is what the ban is about. `src/fonts/mukta.css` is the one such
 *     sheet, and `src/fonts.test.ts` holds its faces to the ramp.
 *   • **`100dvh` and percentages.** Viewport and relative units are layout, not design values —
 *     there is no token for "as tall as the viewport" and there should not be.
 *   • **`0` and `calc()` on tokens.** `border: 0`, `margin-left: calc(-1 * var(--space-3))`: no
 *     magic number enters either one.
 *   • **`font-family: var(--…)`.** The ban is on a face written by NAME; a token is the opposite
 *     of one. The `--text-*` shorthands carry a family each, so the only way to keep a size and
 *     swap the face is a second declaration — which is what the romanized courses' quiet script
 *     line does with `--font-script-fallback` (design/tokens.md §2), and the one place that does.
 *
 * The sibling guards are `shellPurity.test.ts` (no course script in the shell) and
 * `state/clock.test.ts` (no wall clock outside `clock.ts`) — same shape, same reason.
 */
import { describe, expect, it } from 'vitest';

/** Every stylesheet under `src/`, keyed the way a failure should name it: `src/shell/x.css`. */
const STYLESHEETS: Readonly<Record<string, string>> = Object.fromEntries(
  Object.entries(
    import.meta.glob<string>('./**/*.css', { query: '?raw', import: 'default', eager: true }),
  ).map(([file, source]) => [file.replace('./', 'src/'), source]),
);

/** The values that must come from a token instead. */
const BANNED = [
  { what: 'a hex colour', pattern: /#[0-9a-fA-F]{3,8}\b/ },
  { what: 'a px length', pattern: /\b\d+(\.\d+)?px\b/ },
  { what: 'a font family by name', pattern: /font-family\s*:(?!\s*var\(--)/ },
] as const;

interface Violation {
  file: string;
  line: number;
  what: string;
  text: string;
}

/** Comments carry the token values as documentation — the scan is about declarations. */
function stripComments(source: string): string {
  // Keeps line numbering: a multi-line comment collapses to its own newlines.
  return source.replace(/\/\*[\s\S]*?\*\//g, (comment) => comment.replace(/[^\n]/g, ' '));
}

/** `@font-face` defines a face for the tokens to name; only styling WITH one is banned (#113). */
function stripFontFaces(source: string): string {
  // Same newline-preserving collapse as comments. @font-face bodies have no nested braces.
  return source.replace(/@font-face\s*\{[^}]*\}/g, (block) => block.replace(/[^\n]/g, ' '));
}

function scanStylesheet(file: string, source: string): Violation[] {
  const violations: Violation[] = [];

  stripFontFaces(stripComments(source))
    .split('\n')
    .forEach((line, index) => {
      for (const { what, pattern } of BANNED) {
        if (pattern.test(line)) {
          violations.push({ file, line: index + 1, what, text: line.trim() });
        }
      }
    });

  return violations;
}

describe('style contract', () => {
  it('finds no hard-coded design value in any stylesheet the app ships', () => {
    const violations = Object.entries(STYLESHEETS).flatMap(([file, source]) =>
      scanStylesheet(file, source),
    );

    expect(
      violations,
      violations
        .map((violation) => `${violation.file}:${violation.line} carries ${violation.what}`)
        .join('\n')
        .concat(
          '\nEvery colour, length and face has a token in design/tokens.css — style with var(--*) (docs/design-contract.md rule 1).',
        ),
    ).toEqual([]);
  });

  it('scans the real tree — the global sheet and every CSS module beside a component', () => {
    const files = Object.keys(STYLESHEETS);

    expect(files).toContain('src/styles/global.css');
    expect(files).toContain('src/shell/AppShell.module.css');
    expect(files).toContain('src/shell/BottomNav.module.css');
  });
});

describe('the scanner itself', () => {
  it('catches a hex, a px and a named face', () => {
    const planted = [
      '.a { color: #5980a6; }',
      '.b { padding: 12px; }',
      '.c { font-family: Barlow; }',
    ].join('\n');

    expect(scanStylesheet('src/Planted.css', planted).map((violation) => violation.line)).toEqual([
      1, 2, 3,
    ]);
  });

  it('leaves tokens, dvh, percentages and zero alone', () => {
    const fine = [
      '.a { color: var(--color-accent); }',
      '.b { height: 100dvh; width: 100%; border: 0; }',
      '.c { font: var(--text-body); margin-left: calc(-1 * var(--space-3)); }',
      '.d { padding-bottom: max(var(--space-8), env(safe-area-inset-bottom)); }',
      // A face from a token is the opposite of a face by name — the quiet script line (#88).
      '.e { font-family: var(--font-script-fallback); }',
    ].join('\n');

    expect(scanStylesheet('src/Planted.css', fine)).toEqual([]);
  });

  it('reads past a comment that quotes the value a token resolves to', () => {
    const commented = '/* --nav-item-height is 48px, #5980a6 is the accent */\n.a { color: red; }';

    expect(scanStylesheet('src/Planted.css', commented)).toEqual([]);
  });

  it('reads past an @font-face — defining a face is not styling with one (#113)', () => {
    const declared = [
      '@font-face {',
      "  font-family: 'Mukta';",
      "  src: url('./generated/mukta-devanagari-400.woff2') format('woff2');",
      '}',
      '.a { font-family: Mukta; }', // …but USING the name directly is still caught.
    ].join('\n');

    expect(scanStylesheet('src/Planted.css', declared).map((violation) => violation.line)).toEqual([
      5,
    ]);
  });
});
