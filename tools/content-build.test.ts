/**
 * The fixture-course seam (#606) — what a course is before a single rung is authored.
 *
 * A new course enters as "a folder plus a manifest row" (Invariant 1) and nothing else: the row
 * carries `fixture: true`, `content/<id>/` holds only `levels.json` and `strings.json`, and
 * `content/<id>/modules/` does not exist at all. Four courses have entered that way — hi-en (#267),
 * en-fr (#326), en-de (#356), en-ko (#374) — and each time the claim that the pipeline tolerates it
 * was proved by running a build rather than by reading the code. This file makes that proof a test,
 * because the render-level suite that used to hold this seam went on 2026-08-30 (#370) and the
 * skeleton is now the only shape nothing else covers.
 *
 * It asserts the seam at the level the surviving tests work at: the build's own functions, over the
 * AUTHORED tree, writing to a scratch directory. There is no DOM here and there is nothing to
 * render — see the note on the last test for the part of #606's smoke that cannot be written.
 */
import { existsSync, mkdtempSync, readFileSync, rmSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, describe, expect, it } from 'vitest';
import { buildContent, validateManifest, type BuildReport } from './content-build.ts';
import { checkStrings } from './strings-check.ts';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = path.join(REPO_ROOT, 'content');

/** The course this file is about: the tenth, and the only fixture row in the manifest. */
const FIXTURE_COURSE = 'en-sa';

interface CourseRowJson {
  id: string;
  l1: string;
  l2: string;
  l1Tag: string;
  l2Tag: string;
  l2Dir: string;
  pairLabel: string;
  scriptMode: string;
  dir: string;
  fixture?: boolean;
  romanizationNote?: string;
}

function readJson<T>(...segments: string[]): T {
  return JSON.parse(readFileSync(path.join(...segments), 'utf8')) as T;
}

const MANIFEST = readJson<CourseRowJson[]>(CONTENT, 'courses.json');

/**
 * One real build per gate, over the authored tree and into a scratch directory — `public/content/`
 * is the dev server's and `verify.sh` runs TEST before CONTENT, so a test may never write there.
 */
interface Built extends BuildReport {
  outRoot: string;
}

function build(flags: { withFixtures?: boolean }): Built {
  const outRoot = mkdtempSync(path.join(tmpdir(), 'rung-content-'));
  return { ...buildContent({ contentRoot: CONTENT, outRoot, ...flags }), outRoot };
}

const STRICT = build({});
const DEV = build({ withFixtures: true });

afterAll(() => {
  for (const { outRoot } of [STRICT, DEV]) rmSync(outRoot, { recursive: true, force: true });
});

/** The emitted manifest of a finished build, read back off the scratch tree it wrote. */
function emittedCourseIds(report: Built): string[] {
  const emitted = readJson<{ courses: { id: string }[] }>(report.outRoot, 'courses.json');
  return emitted.courses.map((row) => row.id);
}

describe('the manifest carries the fixture row (#606)', () => {
  it('validates with no errors, hi-mr first and en-sa last', () => {
    const { courses, errors } = validateManifest(MANIFEST);
    expect(errors).toEqual([]);
    expect(courses.length).toBe(MANIFEST.length);
    // hi-mr is the default course: `activeCourse` falls back to the manifest's FIRST row
    // (`src/course/manifest.ts`), so appending anywhere but the end would move the default.
    expect(courses[0]?.id).toBe('hi-mr');
    expect(courses.at(-1)?.id).toBe(FIXTURE_COURSE);
  });

  it('is the only fixture course, and it is romanized', () => {
    const fixtures = MANIFEST.filter((row) => row.fixture === true).map((row) => row.id);
    expect(fixtures).toEqual([FIXTURE_COURSE]);

    const row = MANIFEST.find((entry) => entry.id === FIXTURE_COURSE);
    expect(row).toBeDefined();
    expect(row?.l1).toBe('English');
    expect(row?.l2).toBe('Sanskrit');
    expect(row?.l1Tag).toBe('en');
    expect(row?.l2Tag).toBe('sa');
    expect(row?.pairLabel).toBe('english → sanskrit');
    expect(row?.dir).toBe('ltr');
    expect(row?.l2Dir).toBe('ltr');
    // `romanized`, NOT `native` — `docs/design-contract.md`'s "rung teaches speech, not script"
    // (#353) forbids asking an English speaker to decode Devanagari, and its forward rule is that
    // a new non-Latin course is romanized from its first commit. hi-mr is `native` for the
    // opposite and correct reason: its learner reads Devanagari already. Matching en-sa to hi-mr
    // would undo the rule, so this line is the tripwire that says so.
    expect(row?.scriptMode).toBe('romanized');
    // A romanized course states its ONE scheme, because the word index matches surfaces verbatim.
    expect(row?.romanizationNote).toMatch(/^IAST \(the International Alphabet/);
    expect(row?.romanizationNote).toContain('PADA form');
  });
});

describe('the fixture course ships a complete ladder and bundle', () => {
  it('is five levels of ten, every rung undrafted content and every level drafted', () => {
    const levels = readJson<{
      courseId: string;
      levels: {
        id: string;
        draft?: boolean;
        draftNote?: string | null;
        modules: { id: string; title: string; job: string; hasContent: boolean; draft?: boolean }[];
      }[];
    }>(CONTENT, FIXTURE_COURSE, 'levels.json');

    expect(levels.courseId).toBe(FIXTURE_COURSE);
    expect(levels.levels.map((level) => level.id)).toEqual(['L1', 'L2', 'L3', 'L4', 'L5']);
    for (const level of levels.levels) {
      expect(level.draft, `${level.id} draft`).toBe(true);
      expect(typeof level.draftNote, `${level.id} draftNote`).toBe('string');
      expect(level.modules.length, `${level.id} rungs`).toBe(10);
      for (const module of level.modules) {
        expect(module.hasContent, `${module.id} hasContent`).toBe(false);
        expect(module.draft, `${module.id} draft`).toBe(true);
      }
    }
  });

  it('inherits the ratified ladder verbatim — every title and job is en-ko’s (#423)', () => {
    type Ladder = {
      levels: { id: string; modules: { id: string; title: string; job: string }[] }[];
    };
    const flatten = (course: string): [string, string, string][] =>
      readJson<Ladder>(CONTENT, course, 'levels.json').levels.flatMap((level) =>
        level.modules.map((module): [string, string, string] => [
          module.id,
          module.title,
          module.job,
        ]),
      );

    expect(flatten(FIXTURE_COURSE)).toEqual(flatten('en-ko'));
  });

  it('ships a complete strings bundle — every course does, the fixture included', () => {
    for (const row of MANIFEST) {
      const json = readJson<unknown>(CONTENT, row.id, 'strings.json');
      expect(checkStrings(json, row.id), row.id).toEqual([]);
    }
  });

  it('names its L2 in the one key that names a language, and nowhere else', () => {
    const strings = readJson<Record<string, unknown>>(CONTENT, FIXTURE_COURSE, 'strings.json');
    const korean = readJson<Record<string, unknown>>(CONTENT, 'en-ko', 'strings.json');

    expect(strings['revealLabel']).toBe('Reveal the Sanskrit');
    // The L1 is still English, so the trap heading is UNCHANGED — it is the learner's own first
    // language that misleads them, not the one they are learning.
    expect((strings['sentence'] as Record<string, unknown>)['trapHead']).toBe(
      'English will mislead you',
    );
    // Everything else is en-ko's bundle, byte for byte: exactly one key differs.
    const differing = Object.keys(strings).filter(
      (key) => JSON.stringify(strings[key]) !== JSON.stringify(korean[key]),
    );
    expect(differing).toEqual(['revealLabel']);
  });

  it('has no modules folder at all — the skeleton the pipeline tolerates', () => {
    expect(existsSync(path.join(CONTENT, FIXTURE_COURSE, 'modules'))).toBe(false);
  });
});

describe('the gate drops the fixture course, and the build does not trip over it', () => {
  it('strict: en-sa is excluded by the gate and reaches no learner', () => {
    expect(STRICT.exitCode).toBe(0);
    expect(STRICT.shipped.has(FIXTURE_COURSE)).toBe(false);
    expect(STRICT.lines).toContain(
      'en-sa: 0 modules — fixture course, excluded by the gate (--with-fixtures ships it in dev)',
    );
    expect(emittedCourseIds(STRICT)).not.toContain(FIXTURE_COURSE);
    // The other nine are untouched by the extra row.
    expect(emittedCourseIds(STRICT)).toEqual(
      MANIFEST.filter((row) => row.fixture !== true).map((row) => row.id),
    );
  });

  it('dev: --with-fixtures admits the course and reports it as unauthored, without erroring', () => {
    expect(DEV.exitCode).toBe(0);
    expect(DEV.lines).toContain('en-sa: 0 modules — nothing authored yet');
    // The absent `content/en-sa/modules/` is the whole point: a missing folder is not an error.
    expect(DEV.lines.filter((line) => line.includes('FAIL'))).toEqual([]);
  });

  /**
   * **What the dev build still does NOT do, and what #606's smoke therefore cannot assert.**
   *
   * `emitTree` writes only the courses that shipped at least one module, and the emitted
   * `courses.json` is filtered the same way. So a course with an empty ladder is absent from the
   * manifest the APP reads on both gates, `--with-fixtures` included: the Settings switcher cannot
   * offer `english → sanskrit`, and no ladder of ten pending rungs can boot, until the first rung
   * is authored. There is no render to smoke yet, which is why the seam is pinned here instead.
   */
  it('emits nothing for a course with an empty ladder, even with --with-fixtures', () => {
    expect(DEV.shipped.has(FIXTURE_COURSE)).toBe(false);
    expect(emittedCourseIds(DEV)).not.toContain(FIXTURE_COURSE);
    expect(existsSync(path.join(DEV.outRoot, FIXTURE_COURSE))).toBe(false);
  });
});
