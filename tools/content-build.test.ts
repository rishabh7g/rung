/**
 * The fixture-course seam (#606) and its close (#611) — what a course is before a single rung is
 * authored, and what changes the day it graduates.
 *
 * A new course enters as "a folder plus a manifest row" (Invariant 1) and nothing else: the row
 * carries `fixture: true`, `content/<id>/` holds only `levels.json` and `strings.json`, and
 * `content/<id>/modules/` does not exist at all. Five courses have entered that way — hi-en (#267),
 * en-fr (#326), en-de (#356), en-ko (#374), en-sa (#606) — and each time the claim that the
 * pipeline tolerates it was proved by running a build rather than by reading the code. This file
 * made that proof a test, because the render-level suite that used to hold this seam went on
 * 2026-08-30 (#370) and the skeleton is now the only shape nothing else covers.
 *
 * **#611 graduated en-sa, so the catalogue carries no fixture row again.** Two things follow, and
 * both are asserted below rather than assumed:
 *
 *   • The seam can no longer be proved against the shipped manifest, so it is proved against a
 *     SYNTHETIC tree — a scratch content root holding one course whose row is flipped back to
 *     `fixture: true`. That is the shape of the test #273 retired on 2026-08-30; the gate it
 *     covered never went anywhere, and the last case in this file is it, rebuilt.
 *   • With nothing left to relax, `--with-fixtures` must change NOTHING about the real tree:
 *     strict and dev ship the same ten courses, module for module. A course that could only reach
 *     a learner through a dev flag is exactly what the gate exists to catch, and the equality
 *     below is the tripwire that says so.
 *
 * It asserts the seam at the level the surviving tests work at: the build's own functions, over the
 * AUTHORED tree, writing to a scratch directory. There is no DOM here and there is nothing to
 * render — see the note on the last test for the part of #606's smoke that cannot be written.
 */
import {
  cpSync,
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterAll, describe, expect, it } from 'vitest';
import { buildContent, validateManifest, type BuildReport } from './content-build.ts';
import { checkStrings } from './strings-check.ts';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONTENT = path.join(REPO_ROOT, 'content');

/** The course this file is about: the tenth, and the last row that carried `fixture: true`. */
const GRADUATED_COURSE = 'en-sa';

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

const SCRATCH: string[] = [];

function scratchDir(): string {
  const dir = mkdtempSync(path.join(tmpdir(), 'rung-content-'));
  SCRATCH.push(dir);
  return dir;
}

function build(flags: { withFixtures?: boolean }, contentRoot = CONTENT): Built {
  const outRoot = scratchDir();
  return { ...buildContent({ contentRoot, outRoot, ...flags }), outRoot };
}

const STRICT = build({});
const DEV = build({ withFixtures: true });

afterAll(() => {
  for (const dir of SCRATCH) rmSync(dir, { recursive: true, force: true });
});

/** The emitted manifest of a finished build, read back off the scratch tree it wrote. */
function emittedCourseIds(report: Built): string[] {
  const emitted = readJson<{ courses: { id: string }[] }>(report.outRoot, 'courses.json');
  return emitted.courses.map((row) => row.id);
}

describe('the manifest carries no fixture row again (#611)', () => {
  it('validates with no errors, hi-mr first and en-sa last', () => {
    const { courses, errors } = validateManifest(MANIFEST);
    expect(errors).toEqual([]);
    expect(courses.length).toBe(MANIFEST.length);
    // hi-mr is the default course: `activeCourse` falls back to the manifest's FIRST row
    // (`src/course/manifest.ts`), so appending anywhere but the end would move the default.
    expect(courses[0]?.id).toBe('hi-mr');
    expect(courses.at(-1)?.id).toBe(GRADUATED_COURSE);
    // Ten courses, and en-sa is the tenth.
    expect(courses.length).toBe(10);
  });

  it('holds no fixture course at all — every row in the catalogue ships', () => {
    const fixtures = MANIFEST.filter((row) => row.fixture === true).map((row) => row.id);
    expect(fixtures).toEqual([]);
  });

  it('keeps everything else on the en-sa row exactly as the fixture row carried it', () => {
    const row = MANIFEST.find((entry) => entry.id === GRADUATED_COURSE);
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
    // Graduation drops the flag and nothing else: the key is gone, not set to false.
    expect(Object.prototype.hasOwnProperty.call(row ?? {}, 'fixture')).toBe(false);
  });
});

/**
 * The rungs authored so far: L1-M1..M2 (#608), M3..M5 (#609), M6..M10 (#610) — the whole of
 * en-sa L1 — and L2-M1..M2 (#613) and L2-M3..M5 (#614), the first half of Level 2. L2-M6..M10 and
 * L3..L5 are still an empty skeleton, and L2 therefore keeps its own level `draft` flag, exactly as
 * L1 did until #611.
 */
const AUTHORED = [
  'L1-M1',
  'L1-M2',
  'L1-M3',
  'L1-M4',
  'L1-M5',
  'L1-M6',
  'L1-M7',
  'L1-M8',
  'L1-M9',
  'L1-M10',
  'L2-M1',
  'L2-M2',
  'L2-M3',
  'L2-M4',
  'L2-M5',
];

describe('the graduated course ships a complete ladder and bundle', () => {
  it('is five levels of ten, with L1 out of draft and L2..L5 still placeholder lists', () => {
    const levels = readJson<{
      courseId: string;
      levels: {
        id: string;
        draft?: boolean;
        draftNote?: string | null;
        modules: { id: string; title: string; job: string; hasContent: boolean; draft?: boolean }[];
      }[];
    }>(CONTENT, GRADUATED_COURSE, 'levels.json');

    expect(levels.courseId).toBe(GRADUATED_COURSE);
    expect(levels.levels.map((level) => level.id)).toEqual(['L1', 'L2', 'L3', 'L4', 'L5']);
    for (const level of levels.levels) {
      // L1's level draft flag cleared at graduation (#611) — its ten rungs are authored,
      // verified and shipping. L2..L5 are unauthored placeholder lists and keep theirs.
      const drafted = level.id !== 'L1';
      expect(level.draft, `${level.id} draft`).toBe(drafted ? true : undefined);
      expect(typeof level.draftNote, `${level.id} draftNote`).toBe(
        drafted ? 'string' : 'undefined',
      );
      expect(level.modules.length, `${level.id} rungs`).toBe(10);
      for (const module of level.modules) {
        // An authored rung loses its draft flag and gains content.
        const authored = AUTHORED.includes(module.id);
        expect(module.hasContent, `${module.id} hasContent`).toBe(authored);
        expect(module.draft, `${module.id} draft`).toBe(authored ? undefined : true);
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

    expect(flatten(GRADUATED_COURSE)).toEqual(flatten('en-ko'));
  });

  it('ships a complete strings bundle — every course does, en-sa included', () => {
    for (const row of MANIFEST) {
      const json = readJson<unknown>(CONTENT, row.id, 'strings.json');
      expect(checkStrings(json, row.id), row.id).toEqual([]);
    }
  });

  it('names its L2 in the one key that names a language, and nowhere else', () => {
    const strings = readJson<Record<string, unknown>>(CONTENT, GRADUATED_COURSE, 'strings.json');
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

  /**
   * #606 shipped the course with NO `modules/` folder, and this case pinned that a missing folder
   * is tolerated rather than an error. #608 created the folder with the first two rungs, #609
   * carried it to five and #610 closed the level at ten, so what is pinned now is its exact
   * contents: the ladder is authored in order, and an L2 file here without its `levels.json`
   * flag flipped would be a rung the app cannot reach.
   */
  it('has exactly the rungs authored so far, and nothing ahead of them', () => {
    const dir = path.join(CONTENT, GRADUATED_COURSE, 'modules');
    expect(existsSync(dir)).toBe(true);
    // AUTHORED is in LADDER order and readdir is in STRING order, where L1-M10 sorts next to
    // L1-M1 — so both sides are sorted before the comparison rather than the list reordered.
    expect(readdirSync(dir).sort()).toEqual(AUTHORED.map((id) => `${id}.json`).sort());
  });
});

describe('the gate ships the graduated course, and both gates now agree', () => {
  it('strict: en-sa reaches a learner build, with L1’s ten rungs and L2’s first five', () => {
    expect(STRICT.exitCode).toBe(0);
    expect(STRICT.shipped.has(GRADUATED_COURSE)).toBe(true);
    expect(STRICT.shipped.get(GRADUATED_COURSE)).toEqual(AUTHORED);
    expect(STRICT.lines).toContain('en-sa: 15 modules (L1-M1..M10, L2-M1..M5)');
    expect(STRICT.lines.filter((line) => line.includes('FAIL'))).toEqual([]);
    // Ten courses in the emitted manifest, in manifest order — the app reads this file.
    expect(emittedCourseIds(STRICT)).toEqual(MANIFEST.map((row) => row.id));
    expect(emittedCourseIds(STRICT)).toHaveLength(10);
  });

  it('strict: the course tree is emitted — levels, strings, fifteen modules and fifteen indexes', () => {
    const courseDir = path.join(STRICT.outRoot, GRADUATED_COURSE);
    expect(existsSync(path.join(courseDir, 'levels.json'))).toBe(true);
    expect(existsSync(path.join(courseDir, 'strings.json'))).toBe(true);
    for (const id of AUTHORED) {
      expect(existsSync(path.join(courseDir, 'modules', `${id}.json`)), `${id} module`).toBe(true);
      expect(existsSync(path.join(courseDir, 'index', `${id}.json`)), `${id} index`).toBe(true);
    }
    expect(readdirSync(path.join(courseDir, 'modules')).sort()).toEqual(
      AUTHORED.map((id) => `${id}.json`).sort(),
    );
  });

  /**
   * **The asymmetry #606 pinned is gone, and its absence is what this case holds.**
   *
   * While en-sa was a fixture, `--with-fixtures` was the difference between a course a learner
   * could reach and one they could not. With the row graduated the flag has nothing left to
   * relax, so the two gates must agree exactly — course for course and module for module. If they
   * ever diverge again, some row has quietly become dev-only, which is the failure the gate
   * exists to catch and which nothing else in the suite would see.
   */
  it('dev: --with-fixtures changes nothing at all, because nothing is a fixture', () => {
    expect(DEV.exitCode).toBe(0);
    expect(DEV.lines).toContain('en-sa: 15 modules (L1-M1..M10, L2-M1..M5)');
    expect(DEV.lines.filter((line) => line.includes('FAIL'))).toEqual([]);
    expect(emittedCourseIds(DEV)).toEqual(emittedCourseIds(STRICT));
    expect([...DEV.shipped.entries()].sort()).toEqual([...STRICT.shipped.entries()].sort());
  });
});

/**
 * **The seam itself, now that no shipped row sits in it (#606, #611).**
 *
 * The gate's fixture branch is still live code, and the catalogue no longer exercises it. So it is
 * exercised against a synthetic tree: a scratch content root holding one real course whose row is
 * flipped back to `fixture: true`. Strict must drop it, naming the flag; `--with-fixtures` must
 * admit it and ship every rung it has. That is exactly what #606 asserted against the shipped
 * manifest, and exactly what the eleventh course will walk into.
 */
describe('the fixture gate still drops a fixture course (on a synthetic tree)', () => {
  /** A one-course content root: en-sa's real files, under a manifest row carrying the flag. */
  function fixtureContentRoot(): string {
    const root = scratchDir();
    mkdirSync(path.join(root, GRADUATED_COURSE), { recursive: true });
    cpSync(path.join(CONTENT, GRADUATED_COURSE), path.join(root, GRADUATED_COURSE), {
      recursive: true,
    });
    const row = MANIFEST.find((entry) => entry.id === GRADUATED_COURSE);
    writeFileSync(
      path.join(root, 'courses.json'),
      JSON.stringify([{ ...row, fixture: true }], null, 2),
      'utf8',
    );
    return root;
  }

  const FIXTURE_ROOT = fixtureContentRoot();
  const FIXTURE_STRICT = build({}, FIXTURE_ROOT);
  const FIXTURE_DEV = build({ withFixtures: true }, FIXTURE_ROOT);

  it('strict: the course is excluded by the gate and reaches no learner', () => {
    expect(FIXTURE_STRICT.exitCode).toBe(0);
    expect(FIXTURE_STRICT.shipped.has(GRADUATED_COURSE)).toBe(false);
    expect(FIXTURE_STRICT.lines).toContain(
      'en-sa: 0 modules — fixture course, excluded by the gate (--with-fixtures ships it in dev)',
    );
    expect(emittedCourseIds(FIXTURE_STRICT)).toEqual([]);
    expect(existsSync(path.join(FIXTURE_STRICT.outRoot, GRADUATED_COURSE))).toBe(false);
  });

  it('dev: --with-fixtures admits it and ships the rungs it has, indexes and all', () => {
    expect(FIXTURE_DEV.exitCode).toBe(0);
    expect(FIXTURE_DEV.lines).toContain('en-sa: 15 modules (L1-M1..M10, L2-M1..M5)');
    expect(FIXTURE_DEV.lines.filter((line) => line.includes('FAIL'))).toEqual([]);
    expect(FIXTURE_DEV.shipped.has(GRADUATED_COURSE)).toBe(true);
    expect(emittedCourseIds(FIXTURE_DEV)).toContain(GRADUATED_COURSE);
    for (const id of AUTHORED) {
      expect(
        existsSync(path.join(FIXTURE_DEV.outRoot, GRADUATED_COURSE, 'index', `${id}.json`)),
        `${id} index`,
      ).toBe(true);
    }
  });
});
