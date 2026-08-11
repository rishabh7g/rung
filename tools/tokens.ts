/**
 * `design/tokens.css`, read at build time (#90).
 *
 * Three build-time artefacts carry a colour that a stylesheet cannot: the web app manifest
 * (`background_color`/`theme_color` are JSON, and JSON has no `var()`), the `<meta name=
 * "theme-color">` in `index.html`, and the rasterised app icons. Hard-coding `#f2f2f3` in three
 * more places is exactly the drift `src/styleContract.test.ts` bans inside `src/` — so they all
 * read the token instead, here, and the design package stays the one source of the value.
 *
 * The parse is deliberately small: a flat `--name: value;` scan over the file's text, which is
 * how `src/fonts.test.ts` reads the same file. It resolves one level of `var(--other)` so an
 * alias like `--mark-fg: var(--color-bg)` answers with a colour, and refuses anything it cannot
 * resolve to a literal — a build that guesses a brand colour is worse than one that stops.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * The design package is read-only and imported in place, never copied (docs/design-contract.md).
 *
 * Resolved from `path.dirname(import.meta.url)` rather than `new URL('../design/…',
 * import.meta.url)` — the same idiom as `tools/validate.ts`, and for a reason: Vite rewrites the
 * `new URL(<literal>, import.meta.url)` form into an *asset* URL, so under vitest that expression
 * stops being a file path and `fileURLToPath` throws.
 */
export const TOKENS_CSS_PATH = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  '..',
  'design',
  'tokens.css',
);

/** Every `--name: value` in the file, last declaration winning, as CSS itself would resolve it. */
function declarations(): Map<string, string> {
  const source = readFileSync(TOKENS_CSS_PATH, 'utf8');
  const values = new Map<string, string>();

  for (const [, name, value] of source.matchAll(/--([a-z0-9-]+)\s*:\s*([^;{}]+);/g)) {
    values.set(name!, value!.trim());
  }

  return values;
}

/**
 * The literal value of one custom property — `token('--color-bg')` → `#f2f2f3`.
 *
 * Throws when the token is absent or still reads as a `var()` after one hop, because both mean
 * the caller is about to bake a value the design package does not actually define.
 */
export function token(name: string): string {
  const key = name.replace(/^--/, '');
  const values = declarations();

  const raw = values.get(key);
  if (raw === undefined) throw new Error(`tokens: design/tokens.css defines no --${key}`);

  const alias = raw.match(/^var\(\s*--([a-z0-9-]+)\s*\)$/);
  const value = alias === null ? raw : values.get(alias[1]!);
  if (value === undefined)
    throw new Error(`tokens: --${key} aliases --${alias![1]}, which is absent`);
  if (value.includes('var(')) {
    throw new Error(`tokens: --${key} resolves to "${value}", which is not a literal value`);
  }

  return value;
}
