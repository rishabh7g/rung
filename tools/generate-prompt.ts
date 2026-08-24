/**
 * Generation-prompt CLI (#109) — `npm run content:prompt -- <courseId> <moduleId>`.
 *
 * The authoring accelerator of PRD §6.1: renders ONE complete, schema-v5-aware generation
 * prompt for any course + module into `.prompts/<courseId>-<moduleId>.md`, parameterised
 * entirely from what the repo already knows — the course row in `content/courses.json`
 * (L1, L2, scriptMode, romanization scheme), the module's brief (`course-briefs.ts`), the
 * schema text itself, and the CUMULATIVE word index the course build emitted for the prior
 * module. Rishabh pastes the file into Claude and validates the result with the existing
 * pipeline; no API call, no key, no network — ever (PRD §9: AI may assist authoring, but
 * only outside the app, behind the native gate).
 *
 * The prior module's index is REQUIRED (first module of a course excepted): the whole point
 * of delta authoring is "build from what the learner has met, cap what is new", and only a
 * course build knows the cumulative inventory. Run
 * `npm run content:build -- --with-unverified --with-fixtures` first; the CLI says so when
 * the index is missing rather than rendering a prompt that would invent vocabulary.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  DEFAULT_OUT_ROOT,
  validateManifest,
  type CourseRow,
  type WordIndexFile,
} from './content-build.ts';
import { COURSE_BRIEFS, type ModuleBrief } from './course-briefs.ts';
import {
  DEFAULT_CONTENT_ROOT,
  ENRICHMENT_BLOCKS,
  ENRICHMENT_FULL_THROUGH_MODULE,
  POOL_MIN,
  REPO_ROOT,
  SCHEMA_PATH,
  SENTENCE_COUNT,
} from './validate.ts';

/* ------------------------------------------------------------------ contract */

export const DEFAULT_PROMPTS_DIR = path.join(REPO_ROOT, '.prompts');

export interface PromptInputs {
  course: CourseRow;
  brief: ModuleBrief;
  /** The verbatim text of content/schema/module.schema.json — the output contract. */
  schemaText: string;
  /** The PRIOR module's cumulative index; null only for the course's first module. */
  index: WordIndexFile | null;
}

export interface PromptReport {
  lines: string[];
  exitCode: number;
  /** Absolute path of the rendered prompt, or null when nothing was written. */
  outFile: string | null;
}

/* -------------------------------------------------------------- ladder order */

/**
 * The module whose cumulative index feeds this prompt: the previous rung of the ladder,
 * crossing levels (L2-M1 builds on everything through L1-M10). Null for L1-M1 — the course's
 * first module starts from an empty inventory — and for ids outside the L1-3/M1-10 grid.
 */
export function priorModuleId(moduleId: string): string | null {
  const match = /^L([1-3])-M([1-9]|10)$/.exec(moduleId);
  if (match === null) return null;
  const level = Number(match[1]);
  const number = Number(match[2]);
  if (number > 1) return `L${level}-M${number - 1}`;
  return level > 1 ? `L${level - 1}-M10` : null;
}

/* -------------------------------------------------------------------- render */

function bullets(items: readonly string[]): string {
  return items.map((item) => `- ${item}`).join('\n');
}

/** The complexity object the prompt asks for — brief bounds, schema-complete. */
function complexityJson(brief: ModuleBrief): string {
  return JSON.stringify(
    {
      minWordsPerSentence: 3,
      maxWordsPerSentence: brief.maxWordsPerSentence,
      allowedTenses: ['<the tense(s) this module actually uses>'],
      allowedPatterns: brief.patterns,
      newWordCap: brief.newWordCap,
    },
    null,
    2,
  );
}

function scriptSection(course: CourseRow): string {
  if (course.scriptMode === 'romanized') {
    const scheme =
      typeof course.romanizationNote === 'string' && course.romanizationNote.trim() !== ''
        ? course.romanizationNote
        : `the course's one declared romanization scheme`;
    return [
      `This course is **romanized**: every \`display\` string — sentences, deconstruction words,`,
      `\`forms\` entries, variations, mistakes and pool items alike — is written in Latin letters`,
      `following the scheme below, and the native-script line goes in \`script\` on every surface`,
      `(optional in the schema, required here). Use ONE scheme throughout: the word index matches`,
      `\`display\` surfaces verbatim, so a second spelling of the same word breaks resolution.`,
      ``,
      `> Romanization scheme: ${scheme}`,
    ].join('\n');
  }
  return [
    `This course is **native-script**: every \`display\` string is ${course.l2} in its own script,`,
    `every \`cue\` string is ${course.l1}. Do not use the \`script\` field.`,
  ].join('\n');
}

function vocabularySection(
  course: CourseRow,
  brief: ModuleBrief,
  index: WordIndexFile | null,
): string {
  const cap = `You may introduce at most **${brief.newWordCap} new words**. Every new word must be fully
deconstructed where it first appears — \`display\`, \`cue\`, \`tag\`, \`forms\` (the taught paradigm,
or \`[]\`), and a \`note\` saying why its tag is what it is. A word taught below is NOT new and
must not be re-deconstructed as if it were.`;

  if (index === null) {
    return [
      `## Allowed vocabulary`,
      ``,
      `This is the course's first module: the learner has met NO ${course.l2} yet. Everything you`,
      `use is new and counts against the cap.`,
      ``,
      cap,
    ].join('\n');
  }

  const surfaces = Object.keys(index.surfaces);
  return [
    `## Allowed vocabulary (cumulative through ${index.moduleId})`,
    ``,
    `The learner has met exactly these ${surfaces.length} surfaces (${index.cumulativeThrough.join(
      ', ',
    )}). Build the sentences from them first:`,
    ``,
    surfaces.join(' · '),
    ``,
    cap,
    ``,
    `Every token of every \`comprehensionPool\` item must resolve against the vocabulary taught by`,
    `${index.cumulativeThrough.join(', ')} plus THIS module's own deconstructions — the course build`,
    `fails otherwise, so a pool item may never use a word no module has taught.`,
  ].join('\n');
}

function enrichmentSection(course: CourseRow, brief: ModuleBrief): string {
  const number = Number(/-M([1-9]|10)$/.exec(brief.id)?.[1] ?? '99');
  const blocks = ENRICHMENT_BLOCKS.map((block) => `\`${block}\``).join(', ');
  if (number <= ENRICHMENT_FULL_THROUGH_MODULE) {
    return [
      `Modules M1–M${ENRICHMENT_FULL_THROUGH_MODULE} of any level ship FULLY ENRICHED: every sentence carries all five blocks —`,
      `${blocks}. The \`mistake\` is deliberately-wrong ${course.l2} driven by a ${course.l1} habit,`,
      `with \`why\`; \`variations\` are real sentences (1–2 per sentence) each naming what \`changed\`.`,
    ].join('\n');
  }
  return [
    `Enrichment blocks (${blocks}) are optional from M${ENRICHMENT_FULL_THROUGH_MODULE + 1} on — include one where it genuinely`,
    `earns its place (a trap worth a mistake, a pattern worth a variation), not by rote.`,
  ].join('\n');
}

/** The whole prompt, pure and deterministic — the CLI only adds file I/O around this. */
export function renderPrompt({ course, brief, schemaText, index }: PromptInputs): string {
  return `<!--
  Generated by \`npm run content:prompt -- ${course.id} ${brief.id}\` — regenerate, don't edit.

  Round trip:
    1. Paste this entire file into Claude.
    2. Save the returned JSON to content/${course.id}/modules/${brief.id}.json.
    3. Run \`npm run content:validate\` — feed failures back and re-ask until it passes.
    4. The native gate (#64) reviews and flips \`verified\` — never set it yourself.
-->

# Author ${course.id} ${brief.id} — ${brief.title}

You are an expert ${course.l2} teacher for native ${course.l1} speakers, authoring by the
**delta-learning method**: teach only what differs from ${course.l1}. What transfers is left
quiet; what is genuinely new is the lesson; where ${course.l1} actively misleads, that is the
one loud thing.

## The module

- Course: ${course.pairLabel} (\`${course.id}\`)
- Module: \`${brief.id}\` — **${brief.title}**
- Job: ${brief.job}

Guidance:

${bullets(brief.notes)}

## Complexity bounds

Every sentence stays inside these bounds, and the output declares this same \`complexity\`
object (fill in the real \`allowedTenses\`):

\`\`\`json
${complexityJson(brief)}
\`\`\`

## Tags — pair-specific: ${course.l1} → ${course.l2}

Every word and rule carries exactly one tag, judged for THIS pair:

- \`free\` — transfers from ${course.l1} unchanged; nothing to relearn. Quiet.
- \`delta\` — genuinely new in ${course.l2}; this is the lesson.
- \`interference\` — ${course.l1} actively misleads here. The one loud tag; use it precisely,
  and say in the \`note\` what the ${course.l1} habit gets wrong.

## Script

${scriptSection(course)}

## Output contract — module JSON Schema (v5)

Return ONE JSON document, and nothing else, that validates against this schema exactly:

\`\`\`json
${schemaText.trimEnd()}
\`\`\`

The validator (\`npm run content:validate\`) also enforces, beyond the schema:

- \`id\` is \`"${brief.id}"\`; exactly ${SENTENCE_COUNT} sentences; \`comprehensionPool\` has at least ${POOL_MIN} items.
- \`prerequisites\` list only earlier modules of the same level.
- Every \`deconstruction.rules\` entry indexes into the module-level \`rules\` array.
- \`verified\` stays \`false\` and \`verifiedBy\`/\`verifiedAt\` stay \`null\` — the native gate owns them.

${vocabularySection(course, brief, index)}

## Enrichment

${enrichmentSection(course, brief)}

## Acceptance

The document must pass \`npm run content:validate\` with zero issues. Output the JSON only —
no prose before or after it.
`;
}

/* ----------------------------------------------------------------------- CLI */

export interface GenerateOptions {
  courseId: string;
  moduleId: string;
  contentRoot?: string;
  /** Where the course build emitted `public/content/` — the index is read from here. */
  builtRoot?: string;
  promptsDir?: string;
}

function errorMessage(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}

function fail(lines: string[]): PromptReport {
  return {
    lines: ['PROMPT FAIL', ...lines.map((line) => `  ${line}`)],
    exitCode: 1,
    outFile: null,
  };
}

export function generatePrompt(options: GenerateOptions): PromptReport {
  const contentRoot = options.contentRoot ?? DEFAULT_CONTENT_ROOT;
  const builtRoot = options.builtRoot ?? DEFAULT_OUT_ROOT;
  const promptsDir = options.promptsDir ?? DEFAULT_PROMPTS_DIR;
  const { courseId, moduleId } = options;

  let manifestJson: unknown;
  try {
    manifestJson = JSON.parse(readFileSync(path.join(contentRoot, 'courses.json'), 'utf8'));
  } catch (error) {
    return fail([`courses.json: ${errorMessage(error)}`]);
  }
  const manifest = validateManifest(manifestJson);
  if (manifest.errors.length > 0) return fail(manifest.errors);

  const course = manifest.courses.find((row) => row.id === courseId);
  if (course === undefined) {
    return fail([
      `unknown course "${courseId}" — courses.json declares: ${manifest.courses
        .map((row) => row.id)
        .join(', ')}`,
    ]);
  }

  const briefs = COURSE_BRIEFS[courseId];
  if (briefs === undefined) {
    return fail([
      `course "${courseId}" has no briefs yet (tools/course-briefs.ts) — briefed so far: ${Object.keys(
        COURSE_BRIEFS,
      ).join(
        ', ',
      )}; a level's briefs are written when its authoring project starts, and the remaining courses' L2/L3 module lists are pending (PRD §5)`,
    ]);
  }
  const brief = briefs[moduleId];
  if (brief === undefined) {
    return fail([
      `no brief for "${courseId} ${moduleId}" — briefed modules: ${Object.keys(briefs).join(', ')}`,
    ]);
  }

  const prior = priorModuleId(moduleId);
  let index: WordIndexFile | null = null;
  if (prior !== null) {
    const indexFile = path.join(builtRoot, courseId, 'index', `${prior}.json`);
    try {
      index = JSON.parse(readFileSync(indexFile, 'utf8')) as WordIndexFile;
    } catch {
      return fail([
        `missing cumulative index ${path.relative(REPO_ROOT, indexFile)} — the prompt needs the`,
        `vocabulary taught through ${prior}. Run \`npm run content:build -- --with-unverified`,
        `--with-fixtures\` first (and author/ship ${prior} before prompting for ${moduleId}).`,
      ]);
    }
  }

  let schemaText: string;
  try {
    schemaText = readFileSync(SCHEMA_PATH, 'utf8');
  } catch (error) {
    return fail([`schema: ${errorMessage(error)}`]);
  }

  const outFile = path.join(promptsDir, `${courseId}-${moduleId}.md`);
  mkdirSync(promptsDir, { recursive: true });
  writeFileSync(outFile, renderPrompt({ course, brief, schemaText, index }), 'utf8');

  const vocabulary =
    index === null
      ? 'first module — empty inventory'
      : `${index.surfaceCount} surfaces through ${index.moduleId}`;
  return {
    lines: [`PROMPT ${path.relative(REPO_ROOT, outFile)} ok (${vocabulary})`],
    exitCode: 0,
    outFile,
  };
}

function main(argv: readonly string[]): number {
  const [courseId, moduleId, ...rest] = argv;
  if (courseId === undefined || moduleId === undefined || rest.length > 0) {
    console.error('PROMPT FAIL');
    console.error('  usage: npm run content:prompt -- <courseId> <moduleId>   e.g. hi-mr L1-M3');
    return 1;
  }
  let report: PromptReport;
  try {
    report = generatePrompt({ courseId, moduleId });
  } catch (error) {
    console.error(`PROMPT error: ${errorMessage(error)}`);
    return 1;
  }
  for (const line of report.lines) {
    (report.exitCode === 0 ? console.log : console.error)(line);
  }
  return report.exitCode;
}

const entry = process.argv[1];
if (entry !== undefined && path.resolve(entry) === fileURLToPath(import.meta.url)) {
  process.exit(main(process.argv.slice(2)));
}
