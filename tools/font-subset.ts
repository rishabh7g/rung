/**
 * Per-course font subsetting (#113) — PRD-engineering §10 [D15]: "subset per course at build time".
 *
 *   npm run fonts:build     → src/fonts/generated/mukta-{devanagari,latin}-{400,600,700}.woff2
 *
 * Mukta is the heavy face — 557 KB of the 804 KB the unsubset bundle shipped (docs/04-font-notes.md
 * §5) — and it renders COURSE text only (`--font-devanagari`), so what it must draw is knowable at
 * build time: it is exactly the strings the content build just emitted under `public/content/`.
 * This tool harvests them per course, unions the per-course repertoires, and subsets each shipped
 * weight with HarfBuzz (`subset-font`), which closes over GSUB so every conjunct, half form and
 * matra composable from the retained characters survives. Barlow and Barlow Condensed are NOT
 * glyph-subset: they carry the shell's open-ended English UI, so `main.tsx` imports their
 * `latin` subset files whole and drops the rest (latin-ext, vietnamese) instead.
 *
 * Two baselines ride along regardless of content:
 *
 *   • **Latin digits + ASCII punctuation, always.** The Ladder's L2 line renders `3वाँ` — the digit
 *     comes from Mukta's latin subset, and course strings may carry ASCII punctuation mid-string
 *     (docs/04-font-notes.md §5's caveat). Letters are deliberately absent: Mukta never renders
 *     shell prose.
 *   • **The `/dev/type` specimen, dev builds only.** The specimen words (ळ, the conjuncts, the
 *     candrabindu — `src/dev/TypeSpecimen.tsx`) are read out of the component's source, the same
 *     source-scan idiom as `tools/make-icons.ts`, so the matrix stays tofu-free in the builds where
 *     the page exists. A learner build ships no specimen page and carries no specimen glyphs.
 *
 * The output is honest about the gate: a strict build that ships no modules gets near-empty
 * Devanagari files, and the subsets grow with the content that ships. That happened on 2026-08-13
 * (hi-mr L1-M1..M10, #110/#111): ~4 KiB per Devanagari weight became ~86-90 KiB, and
 * `tools/payload-budget.ts` said so out loud (docs/05-perf-notes.md §4).
 *
 * `src/fonts/mukta.css` (committed) declares the six `@font-face` blocks pointing at the generated
 * files; `tools/font-subset.test.ts` keeps the two in sync. The generated woff2 are gitignored —
 * they are derived from content the same way `public/content/` is.
 */
import { mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import subsetFont from 'subset-font';

// `path.dirname(fileURLToPath(...))`, not `new URL('..', import.meta.url)`: Vite rewrites the
// second form into an asset URL, and this module is read by a vitest test (`tools/tokens.ts`).
const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT_OUT = path.join(REPO_ROOT, 'public', 'content');
const SPECIMEN = path.join(REPO_ROOT, 'src', 'dev', 'TypeSpecimen.tsx');
const SOURCE_DIR = path.join(REPO_ROOT, 'node_modules', '@fontsource', 'mukta', 'files');
export const GENERATED_DIR = path.join(REPO_ROOT, 'src', 'fonts', 'generated');

/* ----------------------------------------------------------------- the contract */

/** The Mukta weights the ramp renders — 400 (cue), 600 (card/list), 700 (hero). 500 was design
    headroom no `--text-*` token ever asked for, trimmed here (#113); `src/fonts.test.ts` goes red
    if the ramp starts asking for a weight this list lacks. */
export const MUKTA_WEIGHTS = [400, 600, 700] as const;

/**
 * The two script targets, mirroring @fontsource's own split — one source file, one output, one
 * `unicode-range` per script. A character outside both ranges is not Mukta's problem: romanized
 * L2 is Barlow's (`--font-body`), and anything else falls through to `system-ui` by design.
 */
export interface ScriptTarget {
  subset: 'devanagari' | 'latin';
  /** Does this codepoint belong to this target's `unicode-range`? */
  covers: (codePoint: number) => boolean;
  /** Characters included no matter what the content build shipped. */
  baseline: string;
}

/** Space, digits, and ASCII punctuation — no letters (see the header). */
const LATIN_BASELINE = ' 0123456789!"#%&\'()*+,-./:;?@[]_{}';

/** Danda and double danda, Devanagari digits, and ZW(N)J — the joiners sit inside @fontsource's
    devanagari `unicode-range` (U+200C-200D) and control conjunct formation. */
const DEVANAGARI_BASELINE = '।॥०१२३४५६७८९‌‍';

export const TARGETS: readonly ScriptTarget[] = [
  {
    subset: 'devanagari',
    covers: (cp) =>
      (cp >= 0x0900 && cp <= 0x097f) ||
      (cp >= 0x1cd0 && cp <= 0x1cf9) ||
      (cp >= 0xa8e0 && cp <= 0xa8ff) ||
      (cp >= 0xa830 && cp <= 0xa839) ||
      cp === 0x200c ||
      cp === 0x200d,
    baseline: DEVANAGARI_BASELINE,
  },
  {
    subset: 'latin',
    covers: (cp) => cp <= 0x00ff || (cp >= 0x2000 && cp <= 0x206f),
    baseline: LATIN_BASELINE,
  },
];

/** Every file this tool writes — `tools/font-subset.test.ts` holds `src/fonts/mukta.css` to it. */
export const OUTPUT_FILES = MUKTA_WEIGHTS.flatMap((weight) =>
  TARGETS.map((target) => `mukta-${target.subset}-${weight}.woff2`),
);

/* ----------------------------------------------------------------- the harvest */

/** Every string value anywhere in a parsed JSON document, keys excluded — course text lives in
    values (`surface`, `native`, strings.json's copy), and keys are ASCII ids. */
export function collectStrings(node: unknown): string[] {
  if (typeof node === 'string') return [node];
  if (Array.isArray(node)) return node.flatMap(collectStrings);
  if (node !== null && typeof node === 'object') {
    return Object.values(node).flatMap(collectStrings);
  }
  return [];
}

/** All `.json` files under a directory, depth-first — a course ships levels, strings, modules
    and the word index, and every one of them can carry course script. */
function jsonFilesUnder(dir: string): string[] {
  return readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) return jsonFilesUnder(full);
    return entry.name.endsWith('.json') ? [full] : [];
  });
}

/** The distinct characters of `text` that `target` covers, sorted for deterministic output. */
export function coveredChars(text: string, target: ScriptTarget): string {
  const kept = new Set<string>();
  for (const char of text) {
    const cp = char.codePointAt(0);
    if (cp !== undefined && target.covers(cp)) kept.add(char);
  }
  return [...kept].sort().join('');
}

/**
 * The subset text for one target: its baseline, plus everything harvested from the shipped
 * courses, plus — in dev builds only — the `/dev/type` specimen words, read from the component's
 * source so the matrix and the subset can never disagree (the page itself never ships: its route
 * is behind `import.meta.env.DEV`, so learner builds carry neither the page nor its glyphs).
 */
export function subsetText(
  target: ScriptTarget,
  harvested: string,
  specimenSource: string,
  devBuild: boolean,
): string {
  const sources = target.baseline + harvested + (devBuild ? specimenSource : '');
  return coveredChars(sources, target);
}

/* ----------------------------------------------------------------- the build */

interface ContentHarvest {
  devBuild: boolean;
  courses: string[];
  text: string;
}

/** Reads what the content build emitted — this tool runs AFTER `content:build` and subsets to
    exactly what shipped, dev relaxations included (`courses.json` carries `devBuild: true`). */
function harvestContent(): ContentHarvest {
  const manifestPath = path.join(CONTENT_OUT, 'courses.json');
  let manifestRaw: string;
  try {
    manifestRaw = readFileSync(manifestPath, 'utf8');
  } catch {
    throw new Error(`no ${manifestPath} — run \`npm run content:build\` first`);
  }
  const manifest = JSON.parse(manifestRaw) as { devBuild?: boolean; courses?: { id: string }[] };
  const courses = (manifest.courses ?? []).map((course) => course.id);

  let text = '';
  for (const id of courses) {
    for (const file of jsonFilesUnder(path.join(CONTENT_OUT, id))) {
      text += collectStrings(JSON.parse(readFileSync(file, 'utf8'))).join('');
    }
  }
  return { devBuild: manifest.devBuild === true, courses, text };
}

async function main(): Promise<number> {
  const harvest = harvestContent();
  const specimenSource = readFileSync(SPECIMEN, 'utf8');
  mkdirSync(GENERATED_DIR, { recursive: true });

  let written = 0;
  let bytes = 0;
  let was = 0;
  for (const weight of MUKTA_WEIGHTS) {
    for (const target of TARGETS) {
      const source = path.join(SOURCE_DIR, `mukta-${target.subset}-${weight}-normal.woff2`);
      const text = subsetText(target, harvest.text, specimenSource, harvest.devBuild);
      const subset = await subsetFont(readFileSync(source), text, { targetFormat: 'woff2' });
      const out = path.join(GENERATED_DIR, `mukta-${target.subset}-${weight}.woff2`);
      writeFileSync(out, subset);
      written += 1;
      bytes += subset.length;
      was += statSync(source).size;
    }
  }

  const kind = harvest.devBuild ? 'dev build' : 'strict build';
  console.log(
    `FONTS mukta ${written}/${OUTPUT_FILES.length} ok — ${bytes} bytes (from ${was}), ` +
      `${kind}, courses: ${harvest.courses.length === 0 ? 'none' : harvest.courses.join(', ')}`,
  );
  return 0;
}

const entry = process.argv[1];
if (entry !== undefined && path.resolve(entry) === fileURLToPath(import.meta.url)) {
  main().then(
    (code) => process.exit(code),
    (error: unknown) => {
      console.error(`FONTS error: ${error instanceof Error ? error.message : String(error)}`);
      process.exit(1);
    },
  );
}
