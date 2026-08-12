import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import type { CourseRow, WordIndexFile } from './content-build.ts';
import { COURSE_BRIEFS, NEW_WORD_CAP, type ModuleBrief } from './course-briefs.ts';
import { generatePrompt, priorModuleId, renderPrompt } from './generate-prompt.ts';
import { DEFAULT_CONTENT_ROOT, SCHEMA_PATH } from './validate.ts';

/**
 * `renderPrompt` is pure, so most of this file feeds it rows/briefs/indexes directly; the
 * CLI-shaped tests write a manifest + built index into a tmp tree and run `generatePrompt`
 * against it — nothing shells out, and nothing touches the repo's own `.prompts/` or
 * `public/content/`.
 */

const SCHEMA_TEXT = readFileSync(SCHEMA_PATH, 'utf8');

const HI_MR: CourseRow = {
  id: 'hi-mr',
  l1: 'Hindi',
  l2: 'Marathi',
  l1Tag: 'hi',
  l2Tag: 'mr',
  pairLabel: 'hindi → marathi',
  scriptMode: 'native',
  dir: 'ltr',
};

const EN_AR: CourseRow = {
  id: 'en-ar',
  l1: 'English',
  l2: 'Arabic',
  l1Tag: 'en',
  l2Tag: 'ar',
  pairLabel: 'english → arabic',
  scriptMode: 'romanized',
  dir: 'ltr',
  fixture: true,
  romanizationNote: 'ALA-LC-flavoured: long vowels ā ī ū; al- assimilates before sun letters',
};

function indexThrough(moduleId: string, surfaces: readonly string[]): WordIndexFile {
  const cumulativeThrough: string[] = [];
  const upTo = Number(/-M(\d+)$/.exec(moduleId)?.[1]);
  for (let n = 1; n <= upTo; n += 1) cumulativeThrough.push(`L1-M${n}`);
  return {
    courseId: 'hi-mr',
    moduleId,
    cumulativeThrough,
    surfaceCount: surfaces.length,
    maxSpan: 1,
    surfaces: Object.fromEntries(
      surfaces.map((surface) => [
        surface,
        { moduleId: 'L1-M1', sentenceId: 'L1-M1-S01', wordIdx: 0 },
      ]),
    ),
  };
}

const temporaryDirs: string[] = [];

afterAll(() => {
  for (const dir of temporaryDirs) rmSync(dir, { recursive: true, force: true });
});

function temporaryDir(): string {
  const dir = mkdtempSync(path.join(tmpdir(), 'rung-prompt-'));
  temporaryDirs.push(dir);
  return dir;
}

/* ------------------------------------------------------------- course briefs */

describe('COURSE_BRIEFS hi-mr', () => {
  const briefs = COURSE_BRIEFS['hi-mr'];

  it('covers L1 M1–M10, keyed by id, each with patterns, notes and the §5 cap', () => {
    expect(briefs).toBeDefined();
    if (briefs === undefined) return;
    const expected = Array.from({ length: 10 }, (_, i) => `L1-M${i + 1}`);
    expect(Object.keys(briefs).sort()).toEqual([...expected].sort());
    for (const id of expected) {
      const brief = briefs[id];
      expect(brief).toBeDefined();
      if (brief === undefined) continue;
      expect(brief.id).toBe(id);
      expect(brief.patterns.length).toBeGreaterThan(0);
      expect(brief.notes.length).toBeGreaterThan(0);
      expect(brief.maxWordsPerSentence).toBeGreaterThanOrEqual(3);
      expect(brief.newWordCap).toBe(NEW_WORD_CAP);
    }
  });

  it('mirrors the authored levels.json titles and jobs verbatim', () => {
    const levels = JSON.parse(
      readFileSync(path.join(DEFAULT_CONTENT_ROOT, 'hi-mr', 'levels.json'), 'utf8'),
    ) as { levels: { id: string; modules: { id: string; title: string; job: string }[] }[] };
    const l1 = levels.levels.find((level) => level.id === 'L1');
    expect(l1).toBeDefined();
    for (const entry of l1?.modules ?? []) {
      const brief = briefs?.[entry.id];
      expect(brief, entry.id).toBeDefined();
      expect(brief?.title).toBe(entry.title);
      expect(brief?.job).toBe(entry.job);
    }
  });

  it('carries the PRD emphases: M5 gender interference, M9 कारण/म्हणून, M10 turns', () => {
    expect(briefs?.['L1-M5']?.notes.join(' ')).toMatch(/interference/i);
    expect(briefs?.['L1-M9']?.patterns.join(' ')).toContain('कारण');
    expect(briefs?.['L1-M9']?.patterns.join(' ')).toContain('म्हणून');
    expect(briefs?.['L1-M10']?.notes.join(' ')).toMatch(/2–3|turn/i);
  });
});

/* ------------------------------------------------------------- prior module */

describe('priorModuleId', () => {
  it('walks the ladder: previous module, crossing levels, none before L1-M1', () => {
    expect(priorModuleId('L1-M1')).toBeNull();
    expect(priorModuleId('L1-M2')).toBe('L1-M1');
    expect(priorModuleId('L1-M10')).toBe('L1-M9');
    expect(priorModuleId('L2-M1')).toBe('L1-M10');
    expect(priorModuleId('L3-M1')).toBe('L2-M10');
    expect(priorModuleId('not-a-module')).toBeNull();
  });
});

/* ------------------------------------------------------------------- render */

describe('renderPrompt', () => {
  const briefM4 = COURSE_BRIEFS['hi-mr']?.['L1-M4'] as ModuleBrief;
  const index = indexThrough('L1-M3', ['माझं', 'नाव', 'आहे', 'चहा', 'हवा']);

  it('hi-mr L1-M4 embeds the full schema text, the L1-M3 surfaces and the brief bounds', () => {
    const prompt = renderPrompt({ course: HI_MR, brief: briefM4, schemaText: SCHEMA_TEXT, index });
    expect(prompt).toContain(SCHEMA_TEXT.trimEnd());
    for (const surface of Object.keys(index.surfaces)) expect(prompt).toContain(surface);
    expect(prompt).toContain('cumulative through L1-M3');
    expect(prompt).toContain('L1-M1, L1-M2, L1-M3');
    expect(prompt).toContain(`"maxWordsPerSentence": ${briefM4.maxWordsPerSentence}`);
    expect(prompt).toContain(`"newWordCap": ${NEW_WORD_CAP}`);
    for (const pattern of briefM4.patterns) expect(prompt).toContain(pattern);
    // Course-parameterised, not hard-coded: the pair is named from the manifest row.
    expect(prompt).toContain('expert Marathi teacher for native Hindi speakers');
    expect(prompt).toContain('npm run content:validate');
    expect(prompt).toContain('content/hi-mr/modules/L1-M4.json');
  });

  it('native course: display is native script, no romanization section', () => {
    const prompt = renderPrompt({ course: HI_MR, brief: briefM4, schemaText: SCHEMA_TEXT, index });
    expect(prompt).toContain('native-script');
    expect(prompt).not.toContain('Romanization scheme');
  });

  it('romanized fixture course renders the scheme and the script-line instruction', () => {
    const brief: ModuleBrief = {
      id: 'L1-M2',
      title: 'Ordering coffee',
      job: 'Ask for a drink politely',
      patterns: ['urīdu + N'],
      notes: ['The definite article assimilates before sun letters.'],
      maxWordsPerSentence: 5,
      newWordCap: NEW_WORD_CAP,
    };
    const roman = indexThrough('L1-M1', ['ismī', 'anā']);
    const prompt = renderPrompt({
      course: EN_AR,
      brief,
      schemaText: SCHEMA_TEXT,
      index: { ...roman, courseId: 'en-ar' },
    });
    expect(prompt).toContain('romanized');
    expect(prompt).toContain(`Romanization scheme: ${String(EN_AR.romanizationNote)}`);
    expect(prompt).toContain('native-script line goes in `script`');
    expect(prompt).toContain('expert Arabic teacher for native English speakers');
    expect(prompt).toContain('ismī');
  });

  it('first module of a course renders the empty-inventory wording instead of a surface list', () => {
    const briefM1 = COURSE_BRIEFS['hi-mr']?.['L1-M1'] as ModuleBrief;
    const prompt = renderPrompt({
      course: HI_MR,
      brief: briefM1,
      schemaText: SCHEMA_TEXT,
      index: null,
    });
    expect(prompt).toContain("the course's first module");
    expect(prompt).not.toContain('cumulative through');
  });
});

/* ---------------------------------------------------------------------- CLI */

describe('generatePrompt (CLI shape)', () => {
  function tree(): { contentRoot: string; builtRoot: string; promptsDir: string } {
    const dir = temporaryDir();
    const contentRoot = path.join(dir, 'content');
    const builtRoot = path.join(dir, 'public', 'content');
    mkdirSync(contentRoot, { recursive: true });
    writeFileSync(path.join(contentRoot, 'courses.json'), JSON.stringify([HI_MR, EN_AR]));
    return { contentRoot, builtRoot, promptsDir: path.join(dir, '.prompts') };
  }

  it('renders hi-mr L1-M3 from the built L1-M2 index and reports the surface count', () => {
    const roots = tree();
    const index = indexThrough('L1-M2', ['माझं', 'नाव', 'आहे']);
    mkdirSync(path.join(roots.builtRoot, 'hi-mr', 'index'), { recursive: true });
    writeFileSync(
      path.join(roots.builtRoot, 'hi-mr', 'index', 'L1-M2.json'),
      JSON.stringify(index),
    );

    const report = generatePrompt({ courseId: 'hi-mr', moduleId: 'L1-M3', ...roots });
    expect(report.exitCode).toBe(0);
    expect(report.lines.join('\n')).toContain('3 surfaces through L1-M2');
    expect(report.outFile).toBe(path.join(roots.promptsDir, 'hi-mr-L1-M3.md'));
    const written = readFileSync(report.outFile ?? '', 'utf8');
    expect(written).toContain('माझं · नाव · आहे');
    expect(written).toContain(SCHEMA_TEXT.trimEnd());
  });

  it('renders L1-M1 without any built index', () => {
    const roots = tree();
    const report = generatePrompt({ courseId: 'hi-mr', moduleId: 'L1-M1', ...roots });
    expect(report.exitCode).toBe(0);
    expect(report.lines.join('\n')).toContain('first module — empty inventory');
  });

  it('fails with the content:build hint when the prior index is missing', () => {
    const roots = tree();
    const report = generatePrompt({ courseId: 'hi-mr', moduleId: 'L1-M3', ...roots });
    expect(report.exitCode).toBe(1);
    expect(report.outFile).toBeNull();
    const text = report.lines.join('\n');
    expect(text).toContain('index');
    expect(text).toContain('npm run content:build -- --with-unverified');
    expect(text).toContain('L1-M2');
  });

  it('fails clearly on an unknown course, an unbriefed course, and an unbriefed module', () => {
    const roots = tree();
    const unknown = generatePrompt({ courseId: 'xx-yy', moduleId: 'L1-M1', ...roots });
    expect(unknown.exitCode).toBe(1);
    expect(unknown.lines.join('\n')).toContain('unknown course "xx-yy"');
    expect(unknown.lines.join('\n')).toContain('hi-mr, en-ar');

    const unbriefedCourse = generatePrompt({ courseId: 'en-ar', moduleId: 'L1-M1', ...roots });
    expect(unbriefedCourse.exitCode).toBe(1);
    expect(unbriefedCourse.lines.join('\n')).toContain('no briefs yet');

    const unbriefedModule = generatePrompt({ courseId: 'hi-mr', moduleId: 'L2-M1', ...roots });
    expect(unbriefedModule.exitCode).toBe(1);
    expect(unbriefedModule.lines.join('\n')).toContain('no brief for "hi-mr L2-M1"');
    expect(unbriefedModule.lines.join('\n')).toContain('L1-M1');
  });

  it('never writes on failure', () => {
    const roots = tree();
    generatePrompt({ courseId: 'hi-mr', moduleId: 'L1-M3', ...roots });
    expect(existsSync(roots.promptsDir)).toBe(false);
  });
});
