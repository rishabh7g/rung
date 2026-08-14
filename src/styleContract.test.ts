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
 *     a face by name, which is what the ban is about. `src/fonts/mukta.css` and (since #197)
 *     `src/fonts/naskh.css` are the two such sheets, and `src/fonts.test.ts` holds their faces to
 *     what the product renders.
 *   • **A `--font-*` custom property in `src/styles/tokenOverrides.css`** (#197). `design/` is
 *     read-only and re-copied wholesale, so an engineering decision that changes a token value
 *     cannot be written where the token lives. That one file is where it goes — and defining a
 *     token's value is the same category as an `@font-face`, not the styling-by-name the ban is
 *     about. The last test below keeps the register one file long.
 *   • **A `px` literal inside a media-query prelude** (#243), e.g. `@media (min-width: 768px)`.
 *     CSS forbids `var(--*)` in a media condition, so a breakpoint value has to be a literal —
 *     there is no other way to write one. Only the prelude (`@media` up to the opening `{`) is
 *     exempt; a `px` inside the block's own declarations is still banned.
 *   • **A `px` literal in a custom-property declaration in `src/styles/tokenOverrides.css`**
 *     (#243), e.g. `--nav-item-height: 56px;`. Same reasoning as the `--font-*` exemption above:
 *     that file is the one sanctioned place to change a `design/tokens.css` value, and changing a
 *     length means writing a length. An ordinary declaration (`padding: 12px`) in that same file
 *     is still banned — only the act of DEFINING a custom property is exempt.
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

/**
 * A media-query PRELUDE (`@media` up to the opening `{`) is the one place CSS forbids
 * `var(--*)`, so a breakpoint has to be a literal (#243). Only the prelude is blanked — the
 * block's own declarations are scanned like any other and a `px` inside them is still banned.
 */
function stripMediaPreludes(source: string): string {
  return source.replace(/@media[^{]*\{/g, (prelude) => prelude.replace(/[^\n{]/g, ' '));
}

/** The one file where a `px` custom-property DEFINITION is a sanctioned token override (#243). */
const TOKEN_OVERRIDES_FILE = 'src/styles/tokenOverrides.css';

/**
 * `src/styles/tokenOverrides.css` is the one sanctioned place to change a `design/tokens.css`
 * value, and changing a length means writing a length. Only a custom-property DEFINITION
 * (`--name: value;`) is exempt — an ordinary declaration in the same file (`padding: 12px`) is
 * still banned, so this blanks just the value half of a `--*:` declaration.
 */
function stripTokenOverridePxDefinitions(source: string): string {
  return source.replace(
    /(--[a-z0-9-]+\s*:\s*)([^;]*)(;)/gi,
    (_declaration, before: string, value: string, after: string) =>
      before + value.replace(/\d+(\.\d+)?px/g, (px) => ' '.repeat(px.length)) + after,
  );
}

function scanStylesheet(file: string, source: string): Violation[] {
  const violations: Violation[] = [];

  let stripped = stripMediaPreludes(stripFontFaces(stripComments(source)));
  if (file === TOKEN_OVERRIDES_FILE) {
    stripped = stripTokenOverridePxDefinitions(stripped);
  }

  stripped.split('\n').forEach((line, index) => {
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

  it('keeps the token-override register one file long (#197)', () => {
    // Redefining a `design/tokens.css` value is legitimate — the package is read-only, so the
    // override has to live in `src/`. It is legitimate in ONE place, with the reason in `docs/`;
    // a second sheet quietly redefining a token is drift, and this is what catches it.
    const redefiners = Object.entries(STYLESHEETS)
      .filter(([, source]) => /^\s*--[a-z0-9-]+:/m.test(stripComments(source)))
      .map(([file]) => file);

    expect(
      redefiners,
      `${redefiners.join(', ')} — only src/styles/tokenOverrides.css may set a design token, and only with a docs/ entry saying why (docs/design-contract.md).`,
    ).toEqual(['src/styles/tokenOverrides.css']);
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

  it('reads past a px literal in a media-query prelude, in any stylesheet (#243)', () => {
    const media = '@media (min-width: 768px) {\n  .a { color: var(--color-accent); }\n}';

    expect(scanStylesheet('src/Planted.css', media)).toEqual([]);
  });

  it('still catches a px literal inside a media-query BODY — only the prelude is exempt (#243)', () => {
    const media = '@media (min-width: 768px) {\n  .a { padding: 12px; }\n}';

    expect(scanStylesheet('src/Planted.css', media).map((violation) => violation.line)).toEqual([
      2,
    ]);
  });

  it('reads past a px literal in a custom-property definition in tokenOverrides.css (#243)', () => {
    const override = ':root {\n  --nav-item-height: 56px;\n}';

    expect(scanStylesheet('src/styles/tokenOverrides.css', override)).toEqual([]);
  });

  it('still catches the same custom-property definition in any OTHER stylesheet (#243)', () => {
    const override = ':root {\n  --nav-item-height: 56px;\n}';

    expect(scanStylesheet('src/Planted.css', override).map((violation) => violation.line)).toEqual([
      2,
    ]);
  });

  it('still catches an ordinary px declaration in tokenOverrides.css itself (#243)', () => {
    const ordinary = '.a { padding: 12px; }';

    expect(
      scanStylesheet('src/styles/tokenOverrides.css', ordinary).map((violation) => violation.line),
    ).toEqual([1]);
  });
});
