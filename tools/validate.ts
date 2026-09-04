/**
 * Schema v5 content validator (#73).
 *
 * Two layers:
 *   1. `content/schema/module.schema.json` (JSON Schema draft 2020-12) — the shape.
 *   2. the cross-checks below — everything the shape alone cannot say: filename <-> id,
 *      uniqueness, prerequisite ordering, the module budget (with its fixture relaxation),
 *      the M1-M3 enrichment rule, the native-gate fields, and rule-index ranges.
 *
 * Run it with `npm run content:validate` (walks `content/<course>/modules/*.json`).
 * The scriptMode cross-check (romanized courses need `script`) belongs to the course
 * build, which is the thing that knows scriptMode — deliberately not here.
 */
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import ajv2020Module from 'ajv/dist/2020.js';
import type { ErrorObject, ValidateFunction } from 'ajv';
import ajvFormatsModule from 'ajv-formats';

// ajv ships CommonJS: Node hands us `module.exports` (the class / the function), while
// TypeScript types the default import as the namespace. Re-point the types at the real value.
const Ajv2020 = ajv2020Module as unknown as typeof ajv2020Module.default;
const addFormats = ajvFormatsModule as unknown as typeof ajvFormatsModule.default;

/* ------------------------------------------------------------------ contract */

/** Module budget, PRD §5: 10 sentences, comprehension pool >= 6, M1-M3 fully enriched. */
export const SENTENCE_COUNT = 10;
export const POOL_MIN = 6;
export const ENRICHMENT_FULL_THROUGH_MODULE = 3;
/**
 * A word's `note` is "the one thing worth knowing about it" (`src/components/WhyRow.tsx`), and it
 * renders under every revealed Practice card and in the first tier of Sentence Detail. At 18px on
 * a 360px phone, 300 characters is six lines under one word; five words on a card is a page. Two
 * hundred is one fact and one example (#407). Anything longer is a rule, and belongs in `rules`.
 */
export const NOTE_MAX_CHARS = 200;

/** In Sentence Detail order [D10]; a module M1-M3 must carry all five on every sentence. */
export const ENRICHMENT_BLOCKS = ['sound', 'variations', 'mistake', 'usage', 'mnemonic'] as const;

export type Tag = 'free' | 'delta' | 'interference';

export interface ModuleRule {
  tag: Tag;
  text: string;
}

export interface ModuleWord {
  display: string;
  script?: string;
  cue: string;
  tag: Tag;
  /** The taught paradigm as discrete surfaces, including the word's own display. */
  forms: string[];
  note?: string;
}

export interface ModuleVariation {
  display: string;
  script?: string;
  cue: string;
  changed: string;
}

export interface ModuleMistake {
  display: string;
  script?: string;
  why: string;
}

export interface ModuleSentence {
  id: string;
  display: string;
  script?: string;
  cue: string;
  /** Optional in the schema (#268); the course build requires it unless the L2 is English. */
  glossEn?: string;
  literal?: string;
  deconstruction: {
    words: ModuleWord[];
    /** Integer indices into the module-level `rules` array. */
    rules: number[];
  };
  trap?: string;
  sound?: string;
  variations?: ModuleVariation[];
  mistake?: ModuleMistake;
  usage?: string;
  register?: 'neutral' | 'informal';
  mnemonic?: string;
}

export interface ModulePoolItem {
  id: string;
  display: string;
  script?: string;
  cue: string;
}

export interface Module {
  schemaVersion: 5;
  id: string;
  title: string;
  job: string;
  prerequisites: string[];
  verified: boolean;
  verifiedBy?: string | null;
  verifiedAt?: string | null;
  fixture?: boolean;
  complexity: {
    minWordsPerSentence: number;
    maxWordsPerSentence: number;
    allowedTenses: string[];
    allowedPatterns: string[];
    newWordCap: number;
  };
  rules: ModuleRule[];
  sentences: ModuleSentence[];
  comprehensionPool: ModulePoolItem[];
  exitTest: { generateCount: number; comprehendCount: number };
}

export interface ValidationIssue {
  /** JSON pointer into the module, e.g. `/sentences/3/deconstruction/rules/1`. */
  path: string;
  message: string;
}

export interface ValidationResult {
  /** Display name, e.g. `hi-mr/L1-M1.json`. */
  file: string;
  /** The module id, or null when the file did not survive schema validation. */
  id: string | null;
  ok: boolean;
  issues: ValidationIssue[];
}

export interface ValidateOptions {
  /**
   * Module ids already seen in THIS COURSE (id -> file), enabling the duplicate-id check.
   * Ids are unique per course, not globally — every course has an L1-M1.
   */
  seenIds?: ReadonlyMap<string, string>;
}

/* -------------------------------------------------------------------- paths */

const toolsDir = path.dirname(fileURLToPath(import.meta.url));
export const REPO_ROOT = path.resolve(toolsDir, '..');
export const SCHEMA_PATH = path.join(REPO_ROOT, 'content', 'schema', 'module.schema.json');
export const DEFAULT_CONTENT_ROOT = path.join(REPO_ROOT, 'content');

/* ------------------------------------------------------------------- schema */

let compiled: ValidateFunction | null = null;

function schemaValidator(): ValidateFunction {
  if (compiled !== null) return compiled;
  const ajv = new Ajv2020({ allErrors: true, strict: true });
  addFormats(ajv);
  const validate = ajv.compile(JSON.parse(readFileSync(SCHEMA_PATH, 'utf8')));
  compiled = validate;
  return validate;
}

function schemaIssue(error: ErrorObject): ValidationIssue {
  const at = error.instancePath === '' ? '/' : error.instancePath;
  switch (error.keyword) {
    case 'required':
      return { path: at, message: `missing required property "${error.params.missingProperty}"` };
    case 'additionalProperties':
      return {
        path: at,
        message: `unknown property "${error.params.additionalProperty}" (schema v5 is closed)`,
      };
    case 'enum':
      return { path: at, message: `must be one of: ${error.params.allowedValues.join(', ')}` };
    case 'const':
      return { path: at, message: `must be ${JSON.stringify(error.params.allowedValue)}` };
    case 'pattern':
      return { path: at, message: `must match ${String(error.params.pattern)}` };
    default:
      return { path: at, message: error.message ?? 'is invalid' };
  }
}

/* --------------------------------------------------------------- validation */

interface ParsedModuleId {
  level: string;
  number: number;
}

function parseModuleId(id: string): ParsedModuleId | null {
  const match = /^(L[1-3])-M([1-9]|10)$/.exec(id);
  if (match === null) return null;
  const [, level, number] = match;
  if (level === undefined || number === undefined) return null;
  return { level, number: Number(number) };
}

/**
 * Validates one parsed module against schema v5 plus the cross-checks.
 * `filename` is the reported name; its basename must equal the module id.
 */
export function validateModule(
  json: unknown,
  filename: string,
  opts: ValidateOptions = {},
): ValidationResult {
  const validate = schemaValidator();
  if (!validate(json)) {
    return {
      file: filename,
      id: null,
      ok: false,
      issues: (validate.errors ?? []).map(schemaIssue),
    };
  }

  const module = json as Module;
  const issues: ValidationIssue[] = [];

  // filename <-> id
  const base = path.basename(filename);
  const expectedId = base.replace(/\.json$/, '');
  if (module.id !== expectedId) {
    issues.push({
      path: '/id',
      message: `id "${module.id}" does not match filename "${base}" (expected id "${expectedId}")`,
    });
  }

  // unique module ids across the run
  const declaredBy = opts.seenIds?.get(module.id);
  if (declaredBy !== undefined) {
    issues.push({
      path: '/id',
      message: `duplicate module id "${module.id}" — already declared by ${declaredBy}`,
    });
  }

  // unique sentence and pool ids inside the module
  const sentenceIds = new Set<string>();
  module.sentences.forEach((sentence, i) => {
    if (sentenceIds.has(sentence.id)) {
      issues.push({
        path: `/sentences/${i}/id`,
        message: `duplicate sentence id "${sentence.id}"`,
      });
    }
    sentenceIds.add(sentence.id);
  });
  const poolIds = new Set<string>();
  module.comprehensionPool.forEach((item, i) => {
    if (poolIds.has(item.id)) {
      issues.push({
        path: `/comprehensionPool/${i}/id`,
        message: `duplicate comprehension item id "${item.id}"`,
      });
    }
    poolIds.add(item.id);
  });

  // a word's note is one fact, not a paragraph (#407)
  module.sentences.forEach((sentence, i) => {
    sentence.deconstruction.words.forEach((word, w) => {
      if (typeof word.note === 'string' && word.note.length > NOTE_MAX_CHARS) {
        issues.push({
          path: `/sentences/${i}/deconstruction/words/${w}/note`,
          message: `note is ${word.note.length} characters; the ceiling is ${NOTE_MAX_CHARS} — one fact and one example, and a rule belongs in "rules"`,
        });
      }
    });
  });

  // prerequisites earlier in the same level sequence
  const self = parseModuleId(module.id);
  module.prerequisites.forEach((prerequisite, i) => {
    const other = parseModuleId(prerequisite);
    if (self === null || other === null) return;
    if (other.level !== self.level || other.number >= self.number) {
      issues.push({
        path: `/prerequisites/${i}`,
        message: `prerequisite "${prerequisite}" must come earlier in the same level sequence as "${module.id}"`,
      });
    }
  });

  // module budget — relaxed for dev fixtures (PRD §17), which may never ship
  if (module.fixture !== true) {
    if (module.sentences.length !== SENTENCE_COUNT) {
      issues.push({
        path: '/sentences',
        message: `expected exactly ${SENTENCE_COUNT} sentences, found ${module.sentences.length}`,
      });
    }
    if (module.comprehensionPool.length < POOL_MIN) {
      issues.push({
        path: '/comprehensionPool',
        message: `expected at least ${POOL_MIN} comprehension items, found ${module.comprehensionPool.length}`,
      });
    }
  }

  // enrichment-full rule: M1-M3 of any level carry all five blocks on every sentence
  if (self !== null && self.number <= ENRICHMENT_FULL_THROUGH_MODULE) {
    module.sentences.forEach((sentence, i) => {
      for (const block of ENRICHMENT_BLOCKS) {
        const value = sentence[block];
        if (value === undefined || (Array.isArray(value) && value.length === 0)) {
          issues.push({
            path: `/sentences/${i}/${block}`,
            message: `modules M1-M${ENRICHMENT_FULL_THROUGH_MODULE} ship fully enriched: "${block}" is required on every sentence`,
          });
        }
      }
    });
  }

  // A shipped module names its reviewer. This is the guard that keeps the record honest: the
  // flag alone says "cleared to reach a learner" and says nothing about who cleared it, so
  // verified: true without a signature is a claim with no author and is rejected here.
  if (module.verified) {
    if (typeof module.verifiedBy !== 'string' || module.verifiedBy.trim() === '') {
      issues.push({
        path: '/verifiedBy',
        message: 'verified: true requires verifiedBy (who or what reviewed this module)',
      });
    }
    if (typeof module.verifiedAt !== 'string' || module.verifiedAt.trim() === '') {
      issues.push({
        path: '/verifiedAt',
        message: 'verified: true requires verifiedAt (when that review ran)',
      });
    }
  }

  // every deconstruction rule index points at a real module rule
  const ruleCount = module.rules.length;
  module.sentences.forEach((sentence, i) => {
    sentence.deconstruction.rules.forEach((index, j) => {
      if (index >= ruleCount) {
        issues.push({
          path: `/sentences/${i}/deconstruction/rules/${j}`,
          message: `rule index ${index} is out of range — the module declares ${ruleCount} rule${
            ruleCount === 1 ? '' : 's'
          } (0-${ruleCount - 1})`,
        });
      }
    });
  });

  return { file: filename, id: module.id, ok: issues.length === 0, issues };
}

/* ---------------------------------------------------------------------- CLI */

/** Absolute paths of every `<contentRoot>/<course>/modules/*.json`, sorted. */
export function collectModuleFiles(contentRoot: string): string[] {
  const files: string[] = [];
  for (const course of readdirSync(contentRoot, { withFileTypes: true })) {
    if (!course.isDirectory()) continue;
    const modulesDir = path.join(contentRoot, course.name, 'modules');
    let entries;
    try {
      entries = readdirSync(modulesDir, { withFileTypes: true });
    } catch {
      continue; // a course directory without modules/ (e.g. content/schema) is not an error
    }
    for (const entry of entries) {
      if (entry.isFile() && entry.name.endsWith('.json')) {
        files.push(path.join(modulesDir, entry.name));
      }
    }
  }
  return files.sort();
}

function courseOf(file: string): string {
  return path.basename(path.dirname(path.dirname(file)));
}

function displayName(file: string): string {
  return `${courseOf(file)}/${path.basename(file)}`;
}

/** Validates every module under a content root, threading the duplicate-id check per course. */
export function validateContentRoot(contentRoot: string): ValidationResult[] {
  const seenIdsByCourse = new Map<string, Map<string, string>>();
  const results: ValidationResult[] = [];
  for (const file of collectModuleFiles(contentRoot)) {
    const name = displayName(file);
    const course = courseOf(file);
    let seenIds = seenIdsByCourse.get(course);
    if (seenIds === undefined) {
      seenIds = new Map<string, string>();
      seenIdsByCourse.set(course, seenIds);
    }
    let json: unknown;
    try {
      json = JSON.parse(readFileSync(file, 'utf8'));
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      results.push({
        file: name,
        id: null,
        ok: false,
        issues: [{ path: '/', message: `invalid JSON: ${message}` }],
      });
      continue;
    }
    const result = validateModule(json, name, { seenIds });
    if (result.id !== null && !seenIds.has(result.id)) seenIds.set(result.id, name);
    results.push(result);
  }
  return results;
}

/** The output contract: one line per file, then `CONTENT <n>/<m> ok`. */
export function formatReport(results: readonly ValidationResult[]): {
  lines: string[];
  exitCode: number;
} {
  if (results.length === 0) return { lines: ['CONTENT no modules'], exitCode: 0 };

  const lines: string[] = [];
  let passed = 0;
  for (const result of results) {
    if (result.ok) {
      passed += 1;
      lines.push(`${result.file} ok`);
    } else {
      lines.push(`${result.file} FAIL`);
      for (const issue of result.issues) lines.push(`  ${issue.path}: ${issue.message}`);
    }
  }
  lines.push(`CONTENT ${passed}/${results.length} ok`);
  return { lines, exitCode: passed === results.length ? 0 : 1 };
}

function main(argv: readonly string[]): number {
  const root = argv[0] === undefined ? DEFAULT_CONTENT_ROOT : path.resolve(argv[0]);
  let report;
  try {
    report = formatReport(validateContentRoot(root));
  } catch (error) {
    const message = error instanceof Error ? error.message : String(error);
    console.error(`CONTENT error: ${message}`);
    return 1;
  }
  for (const line of report.lines) console.log(line);
  return report.exitCode;
}

const entry = process.argv[1];
if (entry !== undefined && path.resolve(entry) === fileURLToPath(import.meta.url)) {
  process.exit(main(process.argv.slice(2)));
}
