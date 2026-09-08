/**
 * The collision gate for the global stylesheets (#496).
 *
 * A duplicate class name is the one failure mode this migration created and the one nothing else
 * would catch — no test in this repo asserts on a class attribute, so two files declaring `.head`
 * simply restyle each other and ship. So the check runs in TEST on every commit, and the first
 * case below is the proof that its clean result means anything: it injects a duplicate and
 * requires it to be found. An empty answer from a check never shown to be capable of a non-empty
 * one is not evidence.
 */
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { classesIn, collisions, definitions, keyframesIn, stylesheets } from './css-classes.ts';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** Every file under `dir`, repo-relative and sorted — the tree walk the last block asserts over. */
function sourceFiles(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true })
    .flatMap((entry) => {
      const full = path.join(dir, entry.name);
      return entry.isDirectory() ? sourceFiles(full) : [path.relative(REPO_ROOT, full)];
    })
    .sort();
}

const read = (file: string): string => readFileSync(path.join(REPO_ROOT, file), 'utf8');

describe('the collision check finds collisions', () => {
  it('names a class two stylesheets share, and the files sharing it', () => {
    const injected = [
      ...classesIn('a.css', '.ladder-head { color: red }'),
      ...classesIn('b.css', '.ladder-head { color: blue }'),
    ];
    expect(collisions(injected)).toEqual([{ name: 'ladder-head', files: ['a.css', 'b.css'] }]);
  });

  it('leaves a name repeated inside ONE stylesheet alone — that is cascade, not collision', () => {
    const sheet = '.ladder-head { color: red } @media print { .ladder-head { color: blue } }';
    expect(collisions(classesIn('a.css', sheet))).toEqual([]);
  });

  it('reads selectors only, so a font sheet’s url() is not a class', () => {
    const face = '@font-face { src: url(./mukta-latin-400.woff2) format("woff2") }';
    expect(classesIn('mukta.css', face)).toEqual([]);
  });

  it('ignores class names written in prose inside comments', () => {
    expect(classesIn('a.css', '/* .ladder-head is the Ladder’s */ .ladder-row { top: 0 }')).toEqual(
      [{ name: 'ladder-row', file: 'a.css' }],
    );
  });

  it('finds two stylesheets defining the same @keyframes', () => {
    const injected = [
      ...keyframesIn('a.css', '@keyframes reveal-in { from { opacity: 0 } }'),
      ...keyframesIn('b.css', '@keyframes reveal-in { from { opacity: 1 } }'),
    ];
    expect(collisions(injected)).toEqual([{ name: 'reveal-in', files: ['a.css', 'b.css'] }]);
  });
});

describe('the shipped stylesheets', () => {
  const { classes, keyframes } = definitions();

  it('are read at all — an empty corpus would pass every check below', () => {
    expect(stylesheets().length).toBeGreaterThan(1);
    expect(classes.length).toBeGreaterThan(1);
  });

  it('define every class name in exactly one file', () => {
    expect(collisions(classes)).toEqual([]);
  });

  it('define every @keyframes in exactly one file', () => {
    expect(collisions(keyframes)).toEqual([]);
  });
});

/**
 * The migration's other half: `stylesheets()` skips `*.module.css`, so the collision check above is
 * only worth as much as this. A single CSS module reintroduced anywhere under `src/` would be
 * invisible to it — hashed names, no collisions, and a component styled on the one axis the check
 * cannot see.
 */
describe('no CSS module remains under src/ (#496)', () => {
  const files = sourceFiles(path.join(REPO_ROOT, 'src'));

  it('walks the tree it claims to — the file list holds this very repo’s stylesheets', () => {
    expect(files).toContain('src/shell/toast.css');
    expect(files).toContain('src/shell/Toast.tsx');
  });

  it('has no *.module.css file', () => {
    expect(files.filter((file) => file.endsWith('.module.css'))).toEqual([]);
  });

  it('has no component importing a styles object from a stylesheet', () => {
    const importers = files
      .filter((file) => /\.tsx?$/.test(file))
      .filter((file) => /^import\s+\w+\s+from\s+'[^']*\.css'/m.test(read(file)));
    expect(importers).toEqual([]);
  });
});
