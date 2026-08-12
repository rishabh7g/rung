/**
 * Course build (#74) — everything under `public/content/` (PRD §4 tree, §6 pipeline).
 *
 * Reads the authored tree in `content/`, validates it, and emits the learner bundle:
 * manifest, per-course levels.json + strings.json, and the module files that PASS THE GATE.
 *
 * The gate (PRD §3, §6.2, [D4]) is the point of this tool:
 *   default        ship only modules with `verified: true` AND without `fixture: true`,
 *                  and only from courses without `fixture: true`. This is production truth —
 *                  a learner build can never contain unverified or sample content.
 *   --with-unverified   dev only: ship modules the native gate (#64) has not signed off.
 *   --with-fixtures     dev only: ship fixture courses and fixture modules (§17).
 *
 * The two relaxations are independent, and either one makes the output a DEV BUILD: the run
 * prints a banner and the emitted courses.json carries `devBuild: true`, so no artefact can
 * quietly masquerade as a learner build. `predev` runs with both flags (so `npm run dev` has
 * something to render while every module is still unverified); `prebuild` runs strict.
 *
 * Module validation is NOT reimplemented here — `validateModule` (#73) owns it, and `checkStrings`
 * (#76) owns the strings.json key list. This tool adds only what it alone knows: the manifest
 * shape, the course's `scriptMode`, the gate, and the per-module word index (#75) — which only a
 * whole-course build can compute, because a surface is taught once and stays taught for every
 * later module.
 */
import { copyFileSync, mkdirSync, readFileSync, rmSync, statSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  matchSurfaces,
  surfaceKeys,
  surfaceSpan,
  tokenizeSurface,
  type SurfaceLookup,
} from '../src/engine/surface.ts';
import { checkStrings } from './strings-check.ts';
import {
  DEFAULT_CONTENT_ROOT,
  REPO_ROOT,
  collectModuleFiles,
  validateModule,
  type Module,
  type ValidationIssue,
} from './validate.ts';

/* ------------------------------------------------------------------ contract */

export type ScriptMode = 'native' | 'romanized';
export type Direction = 'ltr' | 'rtl';

const SCRIPT_MODES: readonly string[] = ['native', 'romanized'];
const DIRECTIONS: readonly string[] = ['ltr', 'rtl'];
/** Course ids name a folder and a URL segment; keep them boring. */
const COURSE_ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** A row of `content/courses.json` (PRD §4). Extra course keys (en-ar's `romanizationNote`) ride along. */
export interface CourseRow {
  id: string;
  l1: string;
  l2: string;
  pairLabel: string;
  scriptMode: ScriptMode;
  dir: Direction;
  /** Dev fixture course — never ships without `--with-fixtures` (PRD §3, §17). */
  fixture?: boolean;
  [key: string]: unknown;
}

export interface LevelModuleEntry {
  id: string;
  /** Recomputed at build time from what actually shipped — the authored value is never trusted. */
  hasContent?: boolean;
  [key: string]: unknown;
}

export interface Level {
  id: string;
  modules: LevelModuleEntry[];
  [key: string]: unknown;
}

export interface Levels {
  courseId: string;
  levels: Level[];
  [key: string]: unknown;
}

/** The emitted `public/content/courses.json`. The dev keys exist ONLY on a relaxed build. */
export interface EmittedManifest {
  devBuild?: true;
  devBuildNote?: string;
  courses: CourseRow[];
}

/**
 * The emitted `public/content/<courseId>/sizes.json` (#107) — how many bytes this course's
 * shipped content actually weighs, computed here because only the build knows what shipped.
 * PRD §17: "storage figures are illustrative; compute them" — Settings' STORAGE rows read this
 * file rather than guessing, and a HEAD request per precached file at runtime would be a
 * network conversation the privacy line promises never happens.
 *
 * `bytes` sums every other file the course ships — modules, indexes, levels.json, strings.json —
 * and not this file itself: a file cannot carry its own length, and its ~60 bytes are noise
 * against the smallest course. Same emit discipline as `hasContent`: recomputed from what was
 * actually written, never authored.
 */
export interface CourseSizesFile {
  courseId: string;
  /** How many files the sum covers — everything the course ships except sizes.json itself. */
  files: number;
  bytes: number;
}

export interface BuildFlags {
  /** Ship modules that have not passed the native gate (#64). Dev only. */
  withUnverified: boolean;
  /** Ship fixture courses and fixture modules (PRD §3, §17). Dev only. */
  withFixtures: boolean;
}

export interface BuildOptions extends Partial<BuildFlags> {
  contentRoot: string;
  outRoot: string;
}

export interface BuildReport {
  lines: string[];
  exitCode: number;
  /** courseId → shipped module ids in ladder order. Empty when the build failed. */
  shipped: Map<string, string[]>;
}

export const DEFAULT_OUT_ROOT = path.join(REPO_ROOT, 'public', 'content');

/** The unmissable line a relaxed build prints first and last. `null` for a strict build. */
export function devBanner(flags: BuildFlags): string | null {
  const relaxations: string[] = [];
  if (flags.withUnverified) relaxations.push('unverified');
  if (flags.withFixtures) relaxations.push('fixture');
  if (relaxations.length === 0) return null;
  return `CONTENT ⚠ DEV BUILD — includes ${relaxations.join(' and ')} content; NOT shippable`;
}

/* ---------------------------------------------------------------------- args */

export function parseFlags(argv: readonly string[]): { flags: BuildFlags; errors: string[] } {
  const flags: BuildFlags = { withUnverified: false, withFixtures: false };
  const errors: string[] = [];
  for (const arg of argv) {
    switch (arg) {
      case '--with-unverified':
        flags.withUnverified = true;
        break;
      case '--with-fixtures':
        flags.withFixtures = true;
        break;
      default:
        errors.push(
          `unknown flag "${arg}" — expected --with-unverified and/or --with-fixtures (dev only)`,
        );
    }
  }
  return { flags, errors };
}

/* ------------------------------------------------------------------ manifest */

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim() !== '';
}

/**
 * Validates the shape of `content/courses.json` (PRD §4): an array of
 * `{id, l1, l2, pairLabel, scriptMode, dir}` with unique ids. Unknown keys are kept, not
 * rejected — a course may carry its own metadata (en-ar declares its `romanizationNote` here).
 */
export function validateManifest(json: unknown): { courses: CourseRow[]; errors: string[] } {
  const errors: string[] = [];
  if (!Array.isArray(json)) {
    return { courses: [], errors: ['courses.json: must be an array of course rows'] };
  }
  if (json.length === 0) {
    return { courses: [], errors: ['courses.json: declares no courses'] };
  }

  const courses: CourseRow[] = [];
  const seen = new Map<string, number>();
  json.forEach((row: unknown, index) => {
    const at = `courses.json[${index}]`;
    if (!isRecord(row)) {
      errors.push(`${at}: must be an object`);
      return;
    }
    let ok = true;
    for (const field of ['id', 'l1', 'l2', 'pairLabel'] as const) {
      if (!isNonEmptyString(row[field])) {
        errors.push(`${at}.${field}: required, must be a non-empty string`);
        ok = false;
      }
    }
    if (!SCRIPT_MODES.includes(row.scriptMode as string)) {
      errors.push(`${at}.scriptMode: must be one of: ${SCRIPT_MODES.join(', ')}`);
      ok = false;
    }
    if (!DIRECTIONS.includes(row.dir as string)) {
      errors.push(`${at}.dir: must be one of: ${DIRECTIONS.join(', ')}`);
      ok = false;
    }
    if (row.fixture !== undefined && typeof row.fixture !== 'boolean') {
      errors.push(`${at}.fixture: must be a boolean when present`);
      ok = false;
    }
    const id = row.id;
    if (typeof id === 'string' && id !== '') {
      if (!COURSE_ID.test(id)) {
        errors.push(`${at}.id: "${id}" must be lowercase letters, digits and single hyphens`);
        ok = false;
      }
      const first = seen.get(id);
      if (first !== undefined) {
        errors.push(
          `${at}.id: duplicate course id "${id}" — already declared by courses.json[${first}]`,
        );
        ok = false;
      } else {
        seen.set(id, index);
      }
    }
    if (ok) courses.push(row as CourseRow);
  });

  return { courses, errors };
}

/* ---------------------------------------------------------------- scriptMode */

export interface ScriptModeReport {
  errors: string[];
  /** Readable surfaces inspected: sentences, words, variations, mistakes and pool items. */
  surfaces: number;
  withScript: number;
}

/**
 * PRD §6.6: a `romanized` course needs a romanized `display` on EVERY readable surface (error);
 * the native `script` line is optional-but-recommended (warning, aggregated by the caller).
 * `native` courses have nothing to cross-check — `display` is already the native text.
 */
export function checkScriptMode(module: Module, scriptMode: ScriptMode): ScriptModeReport {
  const report: ScriptModeReport = { errors: [], surfaces: 0, withScript: 0 };
  if (scriptMode !== 'romanized') return report;

  const visit = (surface: { display?: unknown; script?: unknown }, at: string): void => {
    report.surfaces += 1;
    if (!isNonEmptyString(surface.display)) {
      report.errors.push(
        `${at}/display: scriptMode romanized requires a romanized display on every surface`,
      );
    }
    if (isNonEmptyString(surface.script)) report.withScript += 1;
  };

  module.sentences.forEach((sentence, i) => {
    visit(sentence, `/sentences/${i}`);
    sentence.deconstruction.words.forEach((word, j) =>
      visit(word, `/sentences/${i}/deconstruction/words/${j}`),
    );
    (sentence.variations ?? []).forEach((variation, j) =>
      visit(variation, `/sentences/${i}/variations/${j}`),
    );
    if (sentence.mistake !== undefined) visit(sentence.mistake, `/sentences/${i}/mistake`);
  });
  module.comprehensionPool.forEach((item, i) => visit(item, `/comprehensionPool/${i}`));

  return report;
}

/* ---------------------------------------------------------------------- gate */

export type GateVerdict = { ship: true } | { ship: false; reason: string };

/**
 * The native gate, module by module. A fixture COURSE is excluded wholesale by the caller;
 * this decides the two per-module rules, which relax independently.
 */
export function gateModule(module: Module, flags: BuildFlags): GateVerdict {
  if (module.fixture === true && !flags.withFixtures) {
    return { ship: false, reason: 'fixture' };
  }
  if (module.verified !== true && !flags.withUnverified) {
    return { ship: false, reason: 'unverified' };
  }
  return { ship: true };
}

/* ------------------------------------------------------------------ ordering */

interface ParsedModuleId {
  level: number;
  number: number;
}

/** Ladder order, not lexical order: L1-M2 comes before L1-M10. */
function parseModuleId(id: string): ParsedModuleId | null {
  const match = /^L([1-3])-M([1-9]|10)$/.exec(id);
  if (match === null) return null;
  const [, level, number] = match;
  if (level === undefined || number === undefined) return null;
  return { level: Number(level), number: Number(number) };
}

function byLadderOrder(a: string, b: string): number {
  const left = parseModuleId(a);
  const right = parseModuleId(b);
  if (left === null || right === null) return a.localeCompare(b);
  return left.level - right.level || left.number - right.number;
}

/** `[L1-M1, L1-M2, L2-M1]` → `L1-M1..M2, L2-M1`; a lone module stays `L1-M1`. */
export function moduleRanges(ids: readonly string[]): string {
  const runs: string[] = [];
  let start: string | null = null;
  let end: string | null = null;

  const flush = (): void => {
    if (start === null || end === null) return;
    const from = parseModuleId(start);
    const to = parseModuleId(end);
    runs.push(start === end || from === null || to === null ? start : `${start}..M${to.number}`);
    start = null;
    end = null;
  };

  for (const id of ids) {
    const current = parseModuleId(id);
    const previous = end === null ? null : parseModuleId(end);
    const consecutive =
      current !== null &&
      previous !== null &&
      current.level === previous.level &&
      current.number === previous.number + 1;
    if (consecutive) {
      end = id;
      continue;
    }
    flush();
    start = id;
    end = id;
  }
  flush();
  return runs.join(', ');
}

/* ---------------------------------------------------------------- word index */

/**
 * Where a surface is TAUGHT — the word row that defines it, so the "why" resolver can open
 * `modules/<moduleId>.json`, find `<sentenceId>`, and read `deconstruction.words[wordIdx]`.
 */
export interface WordIndexEntry {
  moduleId: string;
  sentenceId: string;
  wordIdx: number;
}

/** The emitted `public/content/<courseId>/index/<moduleId>.json` (PRD §4 tree, §6.3). */
export interface WordIndexFile {
  courseId: string;
  moduleId: string;
  /** The shipped modules folded in, in ladder order, ending with `moduleId`. */
  cumulativeThrough: string[];
  surfaceCount: number;
  /** Longest surface in tokens — the resolver's greedy-match bound; 2 for en-es's `Me llamo`. */
  maxSpan: number;
  /** Normalised surface → its defining word entry. Code-point sorted; first occurrence wins. */
  surfaces: Record<string, WordIndexEntry>;
}

/** Code-unit order: deterministic and locale-independent, unlike `localeCompare`. */
function byCodePoint(a: string, b: string): number {
  return a < b ? -1 : a > b ? 1 : 0;
}

function sortedSurfaces(
  surfaces: ReadonlyMap<string, WordIndexEntry>,
): Record<string, WordIndexEntry> {
  const sorted: Record<string, WordIndexEntry> = {};
  for (const surface of [...surfaces.keys()].sort(byCodePoint)) {
    const entry = surfaces.get(surface);
    if (entry !== undefined) sorted[surface] = entry;
  }
  return sorted;
}

/**
 * One index per module, each CUMULATIVE over everything shipped at or before it in ladder order
 * (PRD §6.3) — a module does not re-teach what an earlier one taught, so a module-local index
 * would leave most of L1-M2's own sentences unexplainable (PR #119).
 *
 * Indexed: every word row's `display` and every entry of its `forms` — each as its joined surface
 * PLUS, for a hyphenated surface, its hyphen parts (`surfaceKeys`, #116: `al-Hind` also indexes
 * `al` and `hind`, so the article prefix has a "why" under nouns no row teaches). Nothing else —
 * a variation is a sentence, and a `mistake` is WRONG L2 by definition (deliberately-wrong
 * Spanish, wrong-language intrusions in hi-mr; PR #124), so indexing one would teach the error.
 *
 * Romanized courses index themselves: `display`/`forms` ARE the romanization and the native line
 * lives in `script`, which is never read here — so en-ar indexes `ismī`, never اسمي.
 *
 * First occurrence wins, in ladder → sentence → word → forms order: the pointer names where the
 * learner MET the word, and a later module reusing it cannot steal the definition.
 *
 * `modules` is the shipped sequence, so the index describes what a learner build actually
 * contains: a module the gate held back teaches nothing, here or on the learner's screen.
 */
export function buildWordIndex(
  courseId: string,
  modules: readonly { id: string; module: Module }[],
): WordIndexFile[] {
  const surfaces = new Map<string, WordIndexEntry>();
  const through: string[] = [];
  const files: WordIndexFile[] = [];
  let maxSpan = 1;

  for (const shipped of modules) {
    through.push(shipped.id);
    for (const sentence of shipped.module.sentences) {
      sentence.deconstruction.words.forEach((word, wordIdx) => {
        for (const raw of [word.display, ...word.forms]) {
          for (const surface of surfaceKeys(raw)) {
            if (surfaces.has(surface)) continue;
            surfaces.set(surface, { moduleId: shipped.id, sentenceId: sentence.id, wordIdx });
            maxSpan = Math.max(maxSpan, surfaceSpan(surface));
          }
        }
      });
    }
    files.push({
      courseId,
      moduleId: shipped.id,
      cumulativeThrough: [...through],
      surfaceCount: surfaces.size,
      maxSpan,
      surfaces: sortedSurfaces(surfaces),
    });
  }

  return files;
}

/**
 * The build-failing rule of PRD §6.3: every token of every comprehension-pool item must resolve
 * in that module's cumulative index. A pool item is what the learner is asked to UNDERSTAND at the
 * exit ritual, so an untaught word in one is a content bug — caught here, at build, rather than as
 * a "why" row that silently has nothing to say.
 *
 * Pool items only. Variations and mistakes are deliberately outside the rule: a mistake is wrong
 * L2 by definition, and variations carry proper nouns the modules never declare (प्रिया / Priya —
 * the known gap on #61). Extending the rule to them would fail the build on correct content.
 *
 * The index is the SHIPPED sequence, so a build that shipped L1-M2 without L1-M1 fails here, and
 * the named range (`is not taught by L1-M2`) says why: in THAT build those words really are
 * untaught. Ship the ladder in order.
 */
export function checkComprehensionPool(module: Module, index: WordIndexFile): ValidationIssue[] {
  const lookup: SurfaceLookup = {
    maxSpan: index.maxSpan,
    has: (surface) => Object.hasOwn(index.surfaces, surface),
  };
  const taught = moduleRanges(index.cumulativeThrough);
  const issues: ValidationIssue[] = [];

  module.comprehensionPool.forEach((item, i) => {
    for (const match of matchSurfaces(tokenizeSurface(item.display), lookup)) {
      if (match.resolved) continue;
      issues.push({
        path: `/comprehensionPool/${i}/display`,
        message:
          `"${match.surface}" (item ${item.id}) is not taught by ${taught} — every ` +
          `comprehension token must resolve in the cumulative word index (PRD §6.3)`,
      });
    }
  });

  return issues;
}

/* --------------------------------------------------------------------- build */

interface CoursePlan {
  row: CourseRow;
  levels: Levels;
  stringsFile: string;
  shipped: { id: string; file: string }[];
  /** One per shipped module, same order — computed before anything is written. */
  indexes: WordIndexFile[];
  gatedOut: { id: string; reason: string }[];
  /** Course-level exclusion (a fixture course on a strict build); modules are not even considered. */
  excluded: string | null;
  warnings: string[];
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function isDirectory(dir: string): boolean {
  try {
    return statSync(dir).isDirectory();
  } catch {
    return false;
  }
}

function readJsonFile(file: string, label: string, errors: string[]): { json: unknown } | null {
  let raw: string;
  try {
    raw = readFileSync(file, 'utf8');
  } catch {
    errors.push(`${label}: missing (expected ${path.relative(REPO_ROOT, file)})`);
    return null;
  }
  try {
    return { json: JSON.parse(raw) };
  } catch (error) {
    errors.push(`${label}: invalid JSON: ${errorMessage(error)}`);
    return null;
  }
}

/** Groups `<contentRoot>/<course>/modules/*.json` by course, reusing the validator's walker. */
function modulesByCourse(contentRoot: string): Map<string, string[]> {
  const byCourse = new Map<string, string[]>();
  for (const file of collectModuleFiles(contentRoot)) {
    const course = path.basename(path.dirname(path.dirname(file)));
    const files = byCourse.get(course);
    if (files === undefined) byCourse.set(course, [file]);
    else files.push(file);
  }
  return byCourse;
}

/** Minimal levels.json shape check — enough to recompute `hasContent` safely. */
function validateLevels(json: unknown, courseId: string, errors: string[]): Levels | null {
  const label = `${courseId}/levels.json`;
  if (!isRecord(json) || !Array.isArray(json.levels)) {
    errors.push(`${label}: must be an object with a levels array`);
    return null;
  }
  if (json.courseId !== courseId) {
    errors.push(
      `${label}: courseId "${String(json.courseId)}" does not match the folder "${courseId}"`,
    );
    return null;
  }
  let ok = true;
  json.levels.forEach((level: unknown, i) => {
    if (!isRecord(level) || !isNonEmptyString(level.id) || !Array.isArray(level.modules)) {
      errors.push(`${label}: levels[${i}] must be an object with an id and a modules array`);
      ok = false;
      return;
    }
    level.modules.forEach((entry: unknown, j) => {
      if (!isRecord(entry) || !isNonEmptyString(entry.id)) {
        errors.push(`${label}: levels[${i}].modules[${j}] must be an object with an id`);
        ok = false;
      }
    });
  });
  return ok ? (json as unknown as Levels) : null;
}

function emitLevels(levels: Levels, shipped: ReadonlySet<string>): Levels {
  return {
    ...levels,
    levels: levels.levels.map((level) => ({
      ...level,
      modules: level.modules.map((entry) => ({ ...entry, hasContent: shipped.has(entry.id) })),
    })),
  };
}

/** Returns the bytes written, so the emit loop can sum a course's weight as it writes it. */
function writeJson(file: string, value: unknown): number {
  const text = `${JSON.stringify(value, null, 2)}\n`;
  writeFileSync(file, text, 'utf8');
  return Buffer.byteLength(text, 'utf8');
}

/**
 * Builds the whole tree. Everything is read and validated BEFORE anything is written: a build
 * that fails leaves the previous output untouched rather than half-replaced (and npm aborts the
 * `dev`/`build` it is hooked to, so a stale tree is never silently served).
 */
export function buildContent(options: BuildOptions): BuildReport {
  const flags: BuildFlags = {
    withUnverified: options.withUnverified ?? false,
    withFixtures: options.withFixtures ?? false,
  };
  const { contentRoot, outRoot } = options;
  const errors: string[] = [];
  const banner = devBanner(flags);

  const manifestFile = path.join(contentRoot, 'courses.json');
  const manifestJson = readJsonFile(manifestFile, 'courses.json', errors);
  const manifest =
    manifestJson === null
      ? { courses: [] as CourseRow[], errors: [] }
      : validateManifest(manifestJson.json);
  errors.push(...manifest.errors);

  const moduleFiles = modulesByCourse(contentRoot);
  const plans: CoursePlan[] = [];

  // A folder with modules but no manifest row is a whole course that would silently not ship.
  for (const course of moduleFiles.keys()) {
    if (!manifest.courses.some((row) => row.id === course)) {
      errors.push(
        `${course}/modules/: no such course in courses.json — add the manifest row or remove the folder`,
      );
    }
  }

  for (const row of manifest.courses) {
    const courseDir = path.join(contentRoot, row.id);
    if (!isDirectory(courseDir)) {
      errors.push(`courses.json: course "${row.id}" has no content/${row.id}/ folder`);
      continue;
    }
    const levelsJson = readJsonFile(
      path.join(courseDir, 'levels.json'),
      `${row.id}/levels.json`,
      errors,
    );
    const levels = levelsJson === null ? null : validateLevels(levelsJson.json, row.id, errors);

    const stringsFile = path.join(courseDir, 'strings.json');
    const stringsJson = readJsonFile(stringsFile, `${row.id}/strings.json`, errors);
    // Completeness against the canonical key list (#76) — PRD §6.5: a missing key is a build
    // failure, because the shell has no fallback copy. `checkStrings` already names course + key.
    if (stringsJson !== null) errors.push(...checkStrings(stringsJson.json, row.id));

    // A course with nothing authored yet is a state, not an error: it simply ships nothing and
    // drops out of the manifest. The gate must never freeze work in progress.
    const files = moduleFiles.get(row.id) ?? [];

    const courseExcluded = row.fixture === true && !flags.withFixtures;
    const seenIds = new Map<string, string>();
    const shipped: { id: string; file: string; module: Module }[] = [];
    const gatedOut: { id: string; reason: string }[] = [];
    const warnings: string[] = [];
    const known = new Set(
      (levels?.levels ?? []).flatMap((level) => level.modules.map((entry) => entry.id)),
    );

    for (const file of files) {
      const name = `${row.id}/${path.basename(file)}`;
      const parsed = readJsonFile(file, name, errors);
      if (parsed === null) continue;

      // Validation is #73's job, in full, for every module — shipped or not.
      const result = validateModule(parsed.json, name, { seenIds });
      if (!result.ok) {
        for (const issue of result.issues) errors.push(`${name}: ${issue.path}: ${issue.message}`);
        continue;
      }
      const module = parsed.json as Module;
      if (result.id !== null) seenIds.set(result.id, name);

      const scriptMode = checkScriptMode(module, row.scriptMode);
      for (const issue of scriptMode.errors) errors.push(`${name}: ${issue}`);

      if (levels !== null && !known.has(module.id)) {
        errors.push(`${name}: "${module.id}" is not listed in ${row.id}/levels.json`);
        continue;
      }

      if (courseExcluded) continue;
      const verdict = gateModule(module, flags);
      if (!verdict.ship) {
        gatedOut.push({ id: module.id, reason: verdict.reason });
        continue;
      }
      shipped.push({ id: module.id, file, module });
      const missing = scriptMode.surfaces - scriptMode.withScript;
      if (missing > 0) {
        warnings.push(
          `  warn ${name}: ${missing} of ${scriptMode.surfaces} romanized surfaces carry no script line (optional but recommended)`,
        );
      }
    }

    if (levels === null) continue;
    shipped.sort((a, b) => byLadderOrder(a.id, b.id));
    gatedOut.sort((a, b) => byLadderOrder(a.id, b.id));

    // The index needs the whole shipped sequence in ladder order, so it is built here — and the
    // pool rule runs with it, in the read-and-validate phase, so a content bug leaves the previous
    // output untouched rather than half-replaced.
    const indexes = buildWordIndex(row.id, shipped);
    shipped.forEach((entry, i) => {
      const index = indexes[i];
      if (index === undefined) return;
      const name = `${row.id}/${path.basename(entry.file)}`;
      for (const issue of checkComprehensionPool(entry.module, index)) {
        errors.push(`${name}: ${issue.path}: ${issue.message}`);
      }
    });

    plans.push({
      row,
      levels,
      stringsFile,
      shipped,
      indexes,
      gatedOut,
      excluded: courseExcluded ? 'fixture course' : null,
      warnings,
    });
  }

  if (errors.length > 0) {
    const lines = ['CONTENT build FAIL', ...errors.map((error) => `  ${error}`)];
    return { lines, exitCode: 1, shipped: new Map() };
  }

  /* ------------------------------------------------------------------ emit */

  rmSync(outRoot, { recursive: true, force: true });
  mkdirSync(outRoot, { recursive: true });

  const shipping = plans.filter((plan) => plan.shipped.length > 0);
  const shipped = new Map<string, string[]>();

  for (const plan of shipping) {
    const courseOut = path.join(outRoot, plan.row.id);
    // The course's weight, counted AS it is emitted (#107): a copy adds the source's size (same
    // bytes by `copies module files byte for byte`), a write adds what writeJson reports.
    let files = 0;
    let bytes = 0;
    const copy = (from: string, to: string): void => {
      copyFileSync(from, to);
      files += 1;
      bytes += statSync(from).size;
    };
    const write = (file: string, value: unknown): void => {
      files += 1;
      bytes += writeJson(file, value);
    };

    mkdirSync(path.join(courseOut, 'modules'), { recursive: true });
    for (const module of plan.shipped) {
      copy(module.file, path.join(courseOut, 'modules', `${module.id}.json`));
    }
    mkdirSync(path.join(courseOut, 'index'), { recursive: true });
    for (const index of plan.indexes) {
      write(path.join(courseOut, 'index', `${index.moduleId}.json`), index);
    }
    const ids = plan.shipped.map((module) => module.id);
    write(path.join(courseOut, 'levels.json'), emitLevels(plan.levels, new Set(ids)));
    copy(plan.stringsFile, path.join(courseOut, 'strings.json'));

    const sizes: CourseSizesFile = { courseId: plan.row.id, files, bytes };
    writeJson(path.join(courseOut, 'sizes.json'), sizes);
    shipped.set(plan.row.id, ids);
  }

  const emitted: EmittedManifest = {
    ...(banner === null
      ? {}
      : {
          devBuild: true as const,
          devBuildNote:
            'Built with a relaxed content gate — includes unverified and/or fixture content. NOT a shippable learner build.',
        }),
    courses: shipping.map((plan) => plan.row),
  };
  writeJson(path.join(outRoot, 'courses.json'), emitted);

  /* ----------------------------------------------------------------- report */

  const lines: string[] = [];
  if (banner !== null) lines.push(banner);

  for (const plan of plans) {
    const id = plan.row.id;
    const ids = plan.shipped.map((module) => module.id);
    if (plan.excluded !== null) {
      lines.push(
        `${id}: 0 modules — ${plan.excluded}, excluded by the gate (--with-fixtures ships it in dev)`,
      );
      continue;
    }
    if (ids.length === 0) {
      lines.push(`${id}: 0 modules — ${describeGated(plan.gatedOut)}`);
      continue;
    }
    lines.push(`${id}: ${countModules(ids.length)} (${moduleRanges(ids)})`);
    for (const index of plan.indexes) {
      lines.push(`  index ${index.moduleId}: ${index.surfaceCount} surfaces`);
    }
    if (plan.gatedOut.length > 0) lines.push(`  held back: ${describeGated(plan.gatedOut)}`);
    lines.push(...plan.warnings);
  }

  const shippedSummary = shipping
    .map(
      (plan) =>
        `${plan.row.id} ${countModules(plan.shipped.length)} (${moduleRanges(plan.shipped.map((m) => m.id))})`,
    )
    .join(', ');
  const skippedSummary = plans
    .filter((plan) => plan.shipped.length === 0)
    .map((plan) => `${plan.row.id} (${plan.excluded ?? summariseReasons(plan.gatedOut)})`)
    .join(', ');

  if (shipping.length === 0) {
    lines.push(
      banner === null
        ? 'CONTENT ⚠ STRICT BUILD SHIPPED NO CONTENT — no module has passed the native gate (#64). ' +
            'That is the honest production result; npm run dev relaxes the gate so the app has something to render.'
        : 'CONTENT ⚠ NOTHING SHIPPED — even with the relaxed gate no module qualified; see the per-course lines above.',
    );
  }
  lines.push(
    `CONTENT build: ${shippedSummary === '' ? 'nothing shipped' : shippedSummary}` +
      (skippedSummary === '' ? '' : ` | skipped: ${skippedSummary}`),
  );
  if (banner !== null) lines.push(banner);

  return { lines, exitCode: 0, shipped };
}

function countModules(count: number): string {
  return `${count} module${count === 1 ? '' : 's'}`;
}

/** `L1-M1, L1-M2 unverified (native gate #64; --with-unverified ships them in dev)`. */
function describeGated(gatedOut: readonly { id: string; reason: string }[]): string {
  if (gatedOut.length === 0) return 'nothing authored yet';
  return [...new Set(gatedOut.map((module) => module.reason))]
    .map((reason) => {
      const ids = gatedOut.filter((module) => module.reason === reason).map((module) => module.id);
      const flag = reason === 'unverified' ? '--with-unverified' : '--with-fixtures';
      const why = reason === 'unverified' ? 'native gate #64' : 'sample content';
      return `${ids.join(', ')} ${reason} (${why}; ${flag} ships ${ids.length === 1 ? 'it' : 'them'} in dev)`;
    })
    .join('; ');
}

/** The compact form for the summary line: `2 unverified`. */
function summariseReasons(gatedOut: readonly { id: string; reason: string }[]): string {
  if (gatedOut.length === 0) return 'no modules';
  return [...new Set(gatedOut.map((module) => module.reason))]
    .map((reason) => `${gatedOut.filter((module) => module.reason === reason).length} ${reason}`)
    .join(', ');
}

/* ----------------------------------------------------------------------- CLI */

function main(argv: readonly string[]): number {
  const { flags, errors } = parseFlags(argv);
  if (errors.length > 0) {
    console.error('CONTENT build FAIL');
    for (const error of errors) console.error(`  ${error}`);
    return 1;
  }
  let report: BuildReport;
  try {
    report = buildContent({
      contentRoot: DEFAULT_CONTENT_ROOT,
      outRoot: DEFAULT_OUT_ROOT,
      ...flags,
    });
  } catch (error) {
    console.error(`CONTENT build error: ${errorMessage(error)}`);
    return 1;
  }
  for (const line of report.lines) console.log(line);
  return report.exitCode;
}

const entry = process.argv[1];
if (entry !== undefined && path.resolve(entry) === fileURLToPath(import.meta.url)) {
  process.exit(main(process.argv.slice(2)));
}
