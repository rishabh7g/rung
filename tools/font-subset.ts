/**
 * Per-course font subsetting (#113, #197) — PRD-engineering §10 [D15]: "subset per course at
 * build time".
 *
 *   npm run fonts:build     → src/fonts/generated/mukta-{devanagari,latin}-{400,600,700}.woff2
 *                             src/fonts/generated/noto-naskh-arabic-arabic-400.woff2
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
 * Source Sans 3 joined on the narrowest terms of all (#222): the romanization's diacritics.
 * `ā ī ū ḍ ḥ ṣ ṭ` and their capitals are in Mukta's OWN `latin-ext` file — a subset this build had
 * never asked for — so they are cut here as a third Mukta target and draw in the same face as the
 * letters around them. The four marks Mukta has no glyph for (`ʾ` U+02BE, `ʿ` U+02BF, `Ẓ ẓ`
 * U+1E92-1E93) are Source Sans 3's, at the three ramp weights, routed by a `unicode-range` that
 * claims those four codepoints and nothing else. docs/04-font-notes.md §9 carries the decision.
 *
 * Noto Naskh Arabic joined on the same terms (#197): a romanized course prints its L2 in Latin
 * letters and sets the sentence again, quietly, in its own script (`--font-script-fallback`), and
 * until this face was bundled that line drew in whatever Arabic the device happened to own — or
 * tofu where it owned none. It is the same problem Mukta solves for Devanagari, so it takes the
 * same shape: one `ScriptTarget`, cut against the content the build emitted. GSUB closure matters
 * as much here as for conjuncts — Arabic's initial/medial/final forms are substitutions, not
 * codepoints, so retaining a letter retains every joined shape of it.
 *
 * Baselines ride along regardless of content:
 *
 *   • **Latin digits + ASCII punctuation, always.** The Ladder's L2 line renders `3वाँ` — the digit
 *     comes from Mukta's latin subset, and course strings may carry ASCII punctuation mid-string
 *     (docs/04-font-notes.md §5's caveat). Letters are deliberately absent: Mukta never renders
 *     shell prose.
 *   • **Arabic punctuation and the Arabic-Indic digits, always** — the marks a `script` line
 *     carries whatever the sentence says. Naskh's own `latin` subset is deliberately NOT bundled:
 *     a Latin character inside a script line routes out of the Arabic `unicode-range` to
 *     `system-ui`, which is what it did before this face existed (docs/04-font-notes.md §8).
 *   • **No diacritic baseline at all** — the two `latin-ext` cuts are letters end to end, and
 *     letters are exactly what content decides. A build with no romanized course in it emits an
 *     empty cut rather than ten marks nobody renders.
 *   • **The `/dev/type` specimen, dev builds only.** The specimen words (ळ, the conjuncts, the
 *     candrabindu — `src/dev/TypeSpecimen.tsx`) are read out of the component's source, the same
 *     source-scan idiom as `tools/make-icons.ts`, so the matrix stays tofu-free in the builds where
 *     the page exists. A learner build ships no specimen page and carries no specimen glyphs.
 *
 * The output is honest about the gate: a strict build that ships no modules gets near-empty
 * Devanagari files, and the subsets grow with the content that ships. That happened on 2026-08-13
 * (hi-mr L1-M1..M10, #110/#111): ~4 KiB per Devanagari weight became ~86-90 KiB, and
 * `tools/payload-budget.ts` said so out loud (docs/05-perf-notes.md §4). Arabic walked the same
 * curve: en-ar was a four-sentence fixture cut to ~2 KiB until #199-#201 authored the ladder and
 * #202 shipped it, at which point the Naskh subset became ~10 KiB of real content.
 *
 * `src/fonts/mukta.css`, `src/fonts/naskh.css` and `src/fonts/source-sans-3.css` (all committed)
 * declare the `@font-face` blocks pointing at the generated files; `tools/font-subset.test.ts`
 * keeps them in sync. The generated woff2 are gitignored — they are derived from content the same
 * way `public/content/` is.
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
const FONTSOURCE = path.join(REPO_ROOT, 'node_modules', '@fontsource');
export const GENERATED_DIR = path.join(REPO_ROOT, 'src', 'fonts', 'generated');

/* ----------------------------------------------------------------- the contract */

/** The Mukta weights the ramp renders — 400 (cue), 600 (card/list), 700 (hero). 500 was design
    headroom no `--text-*` token ever asked for, trimmed here (#113); `src/fonts.test.ts` goes red
    if the ramp starts asking for a weight this list lacks. */
export const MUKTA_WEIGHTS = [400, 600, 700] as const;

/** The Naskh weight the quiet script line renders. All five `.script` rules are
    `font: var(--text-body)` (400 15px) with the family swapped to `--font-script-fallback`, so one
    weight is the whole requirement — `src/fonts.test.ts` derives that pairing and goes red if the
    line ever asks for a weight this list lacks. */
export const NASKH_WEIGHTS = [400] as const;

/** The Source Sans 3 weights the romanization renders (#222) — the L2 ramp's three, because the
    marks sit inside `--text-l2-cue` (400), `--text-l2-card`/`--text-l2-list` (600) and
    `--text-l2-hero` (700) exactly as the letters beside them do. One weight would leave the hero's
    `ʿ` synthesised from 400 while its `a` came from Mukta 700 — the failure [D15] is about. */
export const SOURCE_SANS_WEIGHTS = [400, 600, 700] as const;

/**
 * A script target, mirroring @fontsource's own split — one source file, one output, one
 * `unicode-range` per script. A character no target claims falls through to the next family in
 * its stack by design; before #222 that is what happened to the romanization's ā ī ū ḥ ṣ ḍ ṭ ẓ ʾ ʿ,
 * which landed on `system-ui` because Mukta's `latin` range stops at U+00FF. Two targets close it
 * now — Mukta's own `latin-ext` for the twelve marks it draws, Source Sans 3's for the four it
 * does not (docs/04-font-notes.md §9).
 */
export interface ScriptTarget {
  subset: 'devanagari' | 'latin' | 'latin-ext' | 'arabic' | 'cyrillic';
  /** Does this codepoint belong to this target's `unicode-range`? */
  covers: (codePoint: number) => boolean;
  /** Characters included no matter what the content build shipped. */
  baseline: string;
}

/**
 * One bundled family and the script targets it is cut for. `slug` is both the @fontsource package
 * name and the output prefix, so `node_modules/@fontsource/<slug>/files/<slug>-<subset>-<weight>-
 * normal.woff2` in and `src/fonts/generated/<slug>-<subset>-<weight>.woff2` out — a new family is
 * one row here, one committed `@font-face` sheet, and nothing else.
 */
export interface SubsetFace {
  slug: 'mukta' | 'noto-naskh-arabic' | 'source-sans-3';
  /** The committed sheet whose `url()`s must match this face's outputs exactly. */
  sheet: string;
  weights: readonly number[];
  targets: readonly ScriptTarget[];
}

/** Space, digits, and ASCII punctuation — no letters (see the header). */
const LATIN_BASELINE = ' 0123456789!"#%&\'()*+,-./:;?@[]_{}';

/** Danda and double danda, Devanagari digits, and ZW(N)J — the joiners sit inside @fontsource's
    devanagari `unicode-range` (U+200C-200D) and control conjunct formation. */
const DEVANAGARI_BASELINE = '।॥०१२३४५६७८९‌‍';

/** The space, Arabic comma, semicolon and question mark, the Arabic-Indic digits, tatweel, and the
    joiners — the marks a `script` line carries whatever the sentence says. The space earns its
    place: without it a four-word Arabic line is set in two faces, Naskh for the words and the
    system face for the gaps between them, at whatever advance that face happens to use. Letters
    are absent for the same reason Mukta's latin baseline has none: content decides those. */
const ARABIC_BASELINE = ' ،؛؟٠١٢٣٤٥٦٧٨٩ـ‌‍';

/**
 * The numero sign (#325) — the one mark a Russian line carries that no other bundled cut draws.
 *
 * The ticket proposed a wider baseline: the space, the guillemets « », the em dash and №. Three of
 * those are deliberately NOT here, and the reason is the sheet's own rule. Mukta is named FIRST in
 * `--font-devanagari` and already draws the space, « » (its `latin` cut runs to U+00FF) and the em
 * dash (its U+2000-206F range) — so claiming them here would download this face to draw glyphs
 * Mukta already has, which is exactly what `source-sans-3.css` warns against, and a range holding
 * a SPACE would pull the Cyrillic cut into every course in the catalogue (the #211 bug, through
 * the font system instead of the precache).
 *
 * That is also why this diverges from the Arabic baseline, which does carry its space: Naskh is
 * reached only through `--font-script-fallback`, a per-course quiet line, where Source Sans 3
 * sits in the shared L2 family every course renders through. The cost is that a Cyrillic line's
 * gaps are set in Mukta and its letters in Source Sans 3 — no ink either way, so what differs is
 * the space's advance, which is the right trade against a face download for every other course.
 *
 * № (U+2116) is the exception: Mukta's `latin` range stops at U+206F and nothing else bundled
 * reaches it, so without this it falls to `system-ui` mid-line.
 */
const CYRILLIC_BASELINE = '№';

/** Nothing (#222). Every other baseline is punctuation a line carries whatever it says; a
    diacritic subset is nothing BUT letters, and letters are the one thing content decides — a
    build with no romanized course in it ships an empty cut of these files rather than ten marks
    nobody renders. */
const DIACRITIC_BASELINE = '';

export const MUKTA_TARGETS: readonly ScriptTarget[] = [
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
  /* #222 — the romanization's diacritics, in the face that draws the letters they belong to.
     Latin Extended-A carries the long vowels (ā ī ū, and the ē ō a future scheme may want);
     Latin Extended Additional carries the dot-below emphatics (ḍ ḥ ṣ ṭ) and their capitals. Both
     ranges start past U+00FF, so nothing here can claim a character the `latin` target already
     draws, and neither claims a space, a joiner or a digit — the overlap class #211 was bitten
     by. Mukta has no glyph at U+02BE, U+02BF, U+1E92 or U+1E93: those four are Source Sans 3's. */
  {
    subset: 'latin-ext',
    covers: (cp) => (cp >= 0x0100 && cp <= 0x017f) || (cp >= 0x1e00 && cp <= 0x1e9f),
    baseline: DIACRITIC_BASELINE,
  },
];

/** @fontsource's `arabic` range, trimmed to what a course line can plausibly carry: the Arabic
    block and its supplement/extended-A neighbours, the presentation forms a shaper may reach for,
    and the joiners. The astral ranges (Arabic mathematical alphabetic symbols, Rumi numerals) are
    not course text and buy nothing. */
export const NASKH_TARGETS: readonly ScriptTarget[] = [
  {
    subset: 'arabic',
    covers: (cp) =>
      cp === 0x0020 ||
      (cp >= 0x0600 && cp <= 0x06ff) ||
      (cp >= 0x0750 && cp <= 0x077f) ||
      (cp >= 0x0870 && cp <= 0x08ff) ||
      (cp >= 0xfb50 && cp <= 0xfdff) ||
      (cp >= 0xfe70 && cp <= 0xfefc) ||
      (cp >= 0x200c && cp <= 0x200e),
    baseline: ARABIC_BASELINE,
  },
];

/**
 * The four codepoints Mukta's `latin-ext` has no glyph for, measured rather than assumed (#222):
 * `ʾ` U+02BE and `ʿ` U+02BF — hamza and ʿayn, 698 of en-ar's marks between them — and `Ẓ ẓ`
 * U+1E92-1E93. The range is exactly those four, not the whole of Latin-ext: Mukta is named first
 * in `--font-devanagari`, so a broad range here would download a face to draw glyphs Mukta
 * already has. It overlaps Mukta's `latin-ext` range at U+1E92-1E93 and that is how family order
 * is supposed to work — Mukta is asked first and has nothing to give.
 */
export const SOURCE_SANS_TARGETS: readonly ScriptTarget[] = [
  {
    subset: 'latin-ext',
    covers: (cp) => cp === 0x02be || cp === 0x02bf || cp === 0x1e92 || cp === 0x1e93,
    baseline: DIACRITIC_BASELINE,
  },
  /**
   * Cyrillic (#325) — en-ru's HERO text, not a quiet secondary line.
   *
   * Mukta bundles no Cyrillic at all, so without this every letter of every en-ru sentence, word,
   * variation, mistake and pool item is whatever the device happens to own, or tofu where it owns
   * nothing. A course whose display line can be tofu does not ship, which is why en-ru's
   * graduation depends on this target existing.
   *
   * The face is PROVISIONAL by the ticket's own terms — Source Sans 3 is the zero-new-dependency
   * candidate (it is already a `SubsetFace` from #222, already second in `--font-devanagari`, and
   * `@fontsource/source-sans-3` ships a `cyrillic` subset at all three weights the L2 ramp uses).
   * A design review may replace it; that would be one row here and one committed sheet, and
   * nothing else.
   *
   * The range is the Cyrillic block and no more. The supplement (U+0500-052F), the extended
   * blocks and the historic letters buy nothing for a Russian L1 ladder — widen it only when
   * harvested content actually reaches them. **ё is a LETTER, not baseline**: it lives inside the
   * block and is therefore content-decided, exactly like every other letter in this file.
   */
  {
    subset: 'cyrillic',
    covers: (cp) => (cp >= 0x0400 && cp <= 0x04ff) || cp === 0x2116,
    baseline: CYRILLIC_BASELINE,
  },
];

export const FACES: readonly SubsetFace[] = [
  { slug: 'mukta', sheet: 'mukta.css', weights: MUKTA_WEIGHTS, targets: MUKTA_TARGETS },
  {
    slug: 'noto-naskh-arabic',
    sheet: 'naskh.css',
    weights: NASKH_WEIGHTS,
    targets: NASKH_TARGETS,
  },
  {
    slug: 'source-sans-3',
    sheet: 'source-sans-3.css',
    weights: SOURCE_SANS_WEIGHTS,
    targets: SOURCE_SANS_TARGETS,
  },
];

/** The files one face's rows produce — `tools/font-subset.test.ts` holds its sheet to this list. */
export function outputFiles(face: SubsetFace): string[] {
  return face.weights.flatMap((weight) =>
    face.targets.map((target) => `${face.slug}-${target.subset}-${weight}.woff2`),
  );
}

/** Every file this tool writes. */
export const OUTPUT_FILES = FACES.flatMap(outputFiles);

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
  const perFace: string[] = [];
  for (const face of FACES) {
    let bytes = 0;
    let was = 0;
    for (const weight of face.weights) {
      for (const target of face.targets) {
        const source = path.join(
          FONTSOURCE,
          face.slug,
          'files',
          `${face.slug}-${target.subset}-${weight}-normal.woff2`,
        );
        const text = subsetText(target, harvest.text, specimenSource, harvest.devBuild);
        const subset = await subsetFont(readFileSync(source), text, { targetFormat: 'woff2' });
        const out = path.join(GENERATED_DIR, `${face.slug}-${target.subset}-${weight}.woff2`);
        writeFileSync(out, subset);
        written += 1;
        bytes += subset.length;
        was += statSync(source).size;
      }
    }
    perFace.push(`${face.slug} ${bytes} bytes (from ${was})`);
  }

  const kind = harvest.devBuild ? 'dev build' : 'strict build';
  console.log(
    `FONTS ${written}/${OUTPUT_FILES.length} ok — ${perFace.join(', ')}, ` +
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
