/**
 * The flat CSS namespace's one invariant (#496): no class name is defined in two stylesheets.
 *
 * Until #496 every stylesheet under `src/` was a CSS module, so the compiler hashed the names and
 * a generic one was free: the thirty modules declared 324 class selectors under only 199 distinct
 * names — `head` in eight files, `title` and `kicker` in seven, `card` and `display` in five. Those
 * duplicates are exactly what a global namespace cannot have, and nothing else in this repo would
 * notice one: no test asserts on a class attribute, so a collision restyles a screen silently and
 * ships. Hence a component prefix on every name (`.head` in the Ladder's stylesheet is
 * `.ladder-head`) and this file, which reads the shipped CSS back and proves the prefixes held.
 *
 * `@keyframes` names live in their own namespace and are checked in their own bucket — CSS lets a
 * class and an animation share a name (`.unlock-beat` runs `unlock-beat`), and two animations
 * sharing one is the same silent bug as two classes sharing one, since the later definition wins.
 *
 * Names are read from SELECTORS only — the text before each `{` — because a declaration's value
 * has dots in it that are not classes, and `url(./mukta-latin-400.woff2)` in every font sheet
 * would otherwise report `.woff2` as the repo's worst collision.
 */
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Where a name was defined. */
export interface Definition {
  name: string;
  file: string;
}

/**
 * Every global `.css` under `src/`, repo-relative and sorted, vendored font sheets included.
 *
 * `*.module.css` is excluded on purpose: a CSS module's names are hashed per file and colliding
 * ones are safe, so counting them here would report the very duplicates #496 exists to make
 * impossible. `no-css-modules-remain` in the test file is what proves the exclusion is empty.
 */
export function stylesheets(dir = path.join(REPO_ROOT, 'src')): string[] {
  return readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const full = path.join(dir, entry.name);
      if (entry.isDirectory()) return stylesheets(full);
      const global = entry.name.endsWith('.css') && !entry.name.endsWith('.module.css');
      return global ? [path.relative(REPO_ROOT, full)] : [];
    })
    .sort();
}

/** The stylesheet with comments, strings and `url()` payloads blanked — prose has dots in it too. */
function code(css: string): string {
  return css
    .replace(/\/\*[\s\S]*?\*\//g, ' ')
    .replace(/"[^"]*"|'[^']*'/g, '""')
    .replace(/url\([^)]*\)/g, 'url()');
}

/** Each selector list in the sheet: the text between the last `{`, `}` or `;` and the next `{`. */
function selectors(css: string): string[] {
  const clean = code(css);
  const chunks: string[] = [];
  let start = 0;
  for (let i = 0; i < clean.length; i++) {
    const char = clean[i];
    if (char === '{') chunks.push(clean.slice(start, i));
    if (char === '{' || char === '}' || char === ';') start = i + 1;
  }
  return chunks;
}

/**
 * The class selectors a stylesheet defines. Repeats within one file are kept — they are ordinary
 * cascade, and `collisions` only ever compares across files.
 */
export function classesIn(file: string, css: string): Definition[] {
  return selectors(css).flatMap((selector) =>
    [...selector.matchAll(/\.(-?[A-Za-z_][A-Za-z0-9_-]*)/g)].map((match) => ({
      name: match[1] as string,
      file,
    })),
  );
}

/** The `@keyframes` a stylesheet defines. */
export function keyframesIn(file: string, css: string): Definition[] {
  return [...code(css).matchAll(/@keyframes\s+(-?[A-Za-z_][A-Za-z0-9_-]*)/g)].map((match) => ({
    name: match[1] as string,
    file,
  }));
}

/** A name defined in more than one file, with the files that define it. */
export interface Collision {
  name: string;
  files: string[];
}

/** The collisions in a set of definitions — the empty array is the whole point. */
export function collisions(definitions: Definition[]): Collision[] {
  const byName = new Map<string, Set<string>>();
  for (const { name, file } of definitions) {
    const files = byName.get(name) ?? new Set<string>();
    files.add(file);
    byName.set(name, files);
  }
  return [...byName]
    .filter(([, files]) => files.size > 1)
    .map(([name, files]) => ({ name, files: [...files].sort() }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/** Reads every global stylesheet under `src/` and returns its class and `@keyframes` definitions. */
export function definitions(files = stylesheets()): {
  classes: Definition[];
  keyframes: Definition[];
} {
  const sheets = files.map((file) => ({
    file,
    css: readFileSync(path.join(REPO_ROOT, file), 'utf8'),
  }));
  return {
    classes: sheets.flatMap(({ file, css }) => classesIn(file, css)),
    keyframes: sheets.flatMap(({ file, css }) => keyframesIn(file, css)),
  };
}

/** `tsx tools/css-classes.ts` — the report, and exit 1 on a collision. */
function main(): void {
  const files = stylesheets();
  const { classes, keyframes } = definitions(files);
  const distinct = new Set(classes.map((definition) => definition.name));
  const clashes = [...collisions(classes), ...collisions(keyframes)];
  console.log(
    `CSS ${files.length} stylesheets — ${classes.length} class selectors, ` +
      `${distinct.size} distinct names, ${keyframes.length} @keyframes`,
  );
  for (const { name, files: where } of clashes) {
    console.error(`CSS collision: ${name} is defined in ${where.join(' and ')}`);
  }
  if (clashes.length > 0) process.exit(1);
  console.log('CSS ok — every name belongs to exactly one stylesheet');
}

if (process.argv[1] === fileURLToPath(import.meta.url)) main();
