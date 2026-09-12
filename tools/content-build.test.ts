/**
 * The fixture-course seam (#606) and its close (#611) — what a course is before a single rung is
 * authored, and what changes the day it graduates.
 *
 * A new course enters as "a folder plus a manifest row" (Invariant 1) and nothing else: the row
 * carries `fixture: true`, `content/<id>/` holds only `levels.json` and `strings.json`, and
 * `content/<id>/modules/` does not exist at all. Six courses have entered that way — hi-en (#267),
 * en-fr (#326), en-de (#356), en-ko (#374), en-sa (#606), en-la (#632) — and each time the claim
 * that the pipeline tolerates it was proved by running a build rather than by reading the code.
 * This file made that proof a test, because the render-level suite that used to hold this seam went
 * on 2026-08-30 (#370) and the skeleton is now the only shape nothing else covers.
 *
 * **The seam has now cycled twice, and this file has been rewritten at each turn.** en-sa entered
 * it (#606) and graduated out (#611); en-la entered it (#632) and graduated out (#637). The
 * catalogue therefore holds no fixture row again, exactly as it did between #611 and #632 — so the
 * lesson of the cycle is the one thing worth keeping in prose:
 *
 *   • **The shipped manifest cannot be relied on to exercise the gate**, because whether it does
 *     depends on what happens to be mid-arc on the day. So the gate is proved against a SYNTHETIC
 *     tree — a scratch content root holding one real course whose row is flipped back to
 *     `fixture: true` — and that case stays green through every graduation. It is the shape of the
 *     test #273 retired on 2026-08-30, rebuilt, and the reason it was rebuilt is this paragraph.
 *   • **With nothing left to relax, `--with-fixtures` must change NOTHING about the real tree.**
 *     Strict and dev ship the same eleven courses, module for module. A course that could only
 *     reach a learner through a dev flag is what the gate exists to catch, and the equality below
 *     says so. It held between #611 and #632, broke when #634 authored en-la's first rung — by
 *     design, and the failure named which fact had moved — and holds again now.
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

/** The course this file was written about: the tenth, graduated out of the fixture seam by #611. */
const GRADUATED_COURSE = 'en-sa';

/** The course that sat in the seam most recently (#632) and graduated out of it (#637). */
const FIXTURE_COURSE = 'en-la';

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

describe('the manifest, with en-sa (#611) and en-la (#637) both graduated', () => {
  it('validates with no errors, hi-mr first and en-la last', () => {
    const { courses, errors } = validateManifest(MANIFEST);
    expect(errors).toEqual([]);
    expect(courses.length).toBe(MANIFEST.length);
    // hi-mr is the default course: `activeCourse` falls back to the manifest's FIRST row
    // (`src/course/manifest.ts`), so appending anywhere but the end would move the default.
    expect(courses[0]?.id).toBe('hi-mr');
    expect(courses.at(-1)?.id).toBe(FIXTURE_COURSE);
    // Eleven rows: ten that ship, and en-la in the seam.
    expect(courses.length).toBe(11);
    expect(courses.at(-2)?.id).toBe(GRADUATED_COURSE);
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

  /**
   * en-la's row, and the two things about it that a later reader would 'fix' in opposite
   * directions (#632).
   */
  it('carries the en-la row as a NATIVE Latin-script course, with no romanization note (#637)', () => {
    const row = MANIFEST.find((entry) => entry.id === FIXTURE_COURSE);
    expect(row).toBeDefined();
    expect(row?.l1).toBe('English');
    expect(row?.l2).toBe('Latin');
    expect(row?.l1Tag).toBe('en');
    expect(row?.l2Tag).toBe('la');
    expect(row?.pairLabel).toBe('english → latin');
    expect(row?.dir).toBe('ltr');
    expect(row?.l2Dir).toBe('ltr');
    // `native`, NOT `romanized`: Latin is written in Latin letters, so the display IS the script
    // and there is nothing to transliterate. The neighbouring en-sa case asserts the opposite for
    // the opposite reason, and the pair of them is the rule — `docs/design-contract.md`'s "rung
    // teaches speech, not script" is about asking a learner to decode an unfamiliar alphabet, not
    // about diacritics.
    expect(row?.scriptMode).toBe('native');
    // And so: no `romanizationNote`. en-la's one scheme is recorded in
    // docs/123-en-la-orthography-decisions.md instead, because there is no romanization to note —
    // the macrons are an orthography, and the row has no field for one.
    expect(Object.prototype.hasOwnProperty.call(row ?? {}, 'romanizationNote')).toBe(false);
    // Graduation drops the flag and nothing else: the key is gone, not set to false (#637).
    expect(Object.prototype.hasOwnProperty.call(row ?? {}, 'fixture')).toBe(false);
  });
});

/**
 * The rungs authored so far: L1-M1..M2 (#608), M3..M5 (#609), M6..M10 (#610) — the whole of
 * en-sa L1 — L2-M1..M2 (#613), L2-M3..M5 (#614) and L2-M6..M10 (#615), the whole of Level 2 — and
 * L3-M1..M2 (#617), which open Level 3, and L3-M3..M5 (#618). **#615 closed L2, so its level
 * `draft` flag came off with its tenth rung** — unlike L1, whose flag waited for a separate
 * graduation issue (#611). **L3 is five rungs into ten, so its level `draft` flag STAYS**, exactly
 * as L1's did until #611; L4 and L5 are still an empty skeleton and keep theirs.
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
  'L2-M6',
  'L2-M7',
  'L2-M8',
  'L2-M9',
  'L2-M10',
  'L3-M1',
  'L3-M2',
  'L3-M3',
  'L3-M4',
  'L3-M5',
];

describe('the graduated course ships a complete ladder and bundle', () => {
  it('is five levels of ten, with L1 and L2 out of draft and L3..L5 still placeholder lists', () => {
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
      // L1's level draft flag cleared at graduation (#611) and L2's came off with its tenth rung
      // (#615) — twenty rungs are authored, verified and shipping, and L3-M1..M2 (#617) make
      // twenty-two. L3 is two rungs into ten so its flag STAYS until the level closes; L4 and L5
      // are unauthored placeholder lists and keep theirs.
      const drafted = level.id !== 'L1' && level.id !== 'L2';
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
  it('strict: en-sa reaches a learner build, two complete levels and five rungs of a third', () => {
    expect(STRICT.exitCode).toBe(0);
    expect(STRICT.shipped.has(GRADUATED_COURSE)).toBe(true);
    expect(STRICT.shipped.get(GRADUATED_COURSE)).toEqual(AUTHORED);
    expect(STRICT.lines).toContain('en-sa: 25 modules (L1-M1..M10, L2-M1..M10, L3-M1..M5)');
    expect(STRICT.lines.filter((line) => line.includes('FAIL'))).toEqual([]);
    // Eleven courses in the emitted manifest, in manifest order — the app reads this file. With
    // no fixture row left (#637) the emitted list is the manifest itself again.
    expect(emittedCourseIds(STRICT)).toEqual(MANIFEST.map((row) => row.id));
    expect(emittedCourseIds(STRICT)).toHaveLength(11);
    expect(emittedCourseIds(STRICT)).toContain(FIXTURE_COURSE);
  });

  /**
   * en-la ships, and its FIRST LEVEL is whole. Asserted on the shape of the report line rather than
   * on an exact module count (#639): every authoring wave changes the count, and a test that pins it
   * turns each wave into a touch on this file for no gain. What is worth catching is a course that
   * stops shipping or ships a partial L1, and both of those still fail here.
   */
  it('strict: en-la ships too, with its first level whole (#637)', () => {
    expect(STRICT.shipped.has(FIXTURE_COURSE)).toBe(true);
    const line = STRICT.lines.find((l) => l.startsWith('en-la: '));
    expect(line, 'en-la has a report line').toBeDefined();
    expect(line).toMatch(/^en-la: \d+ modules \(L1-M1\.\.M10/);
    expect(STRICT.shipped.get(FIXTURE_COURSE)).toEqual(
      expect.arrayContaining(['L1-M1', 'L1-M5', 'L1-M10']),
    );
    expect(existsSync(path.join(STRICT.outRoot, FIXTURE_COURSE, 'levels.json'))).toBe(true);
  });

  it('strict: the course tree is emitted — levels, strings, 25 modules and 25 indexes', () => {
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
   * **The flag has nothing left to relax, and this case is that (#611, #637).**
   *
   * It has been true, then false, then true again: en-sa's graduation made the two gates agree,
   * en-la's first authored rung made them diverge by exactly one course, and en-la's graduation has
   * made them agree once more. Asserted as a full equality rather than as a named difference,
   * because that is the stronger claim whenever it is available — any divergence at all now means
   * some row has quietly become dev-only, which is the failure the gate exists to catch and which
   * nothing else in the suite would see.
   */
  it('dev: --with-fixtures changes nothing at all, because nothing is a fixture', () => {
    expect(DEV.exitCode).toBe(0);
    expect(DEV.lines).toContain('en-sa: 25 modules (L1-M1..M10, L2-M1..M10, L3-M1..M5)');
    // A shape rather than a count, for the reason the case above gives.
    expect(DEV.lines.find((l) => l.startsWith('en-la: '))).toMatch(
      /^en-la: \d+ modules \(L1-M1\.\.M10/,
    );
    expect(DEV.lines.filter((line) => line.includes('FAIL'))).toEqual([]);
    expect(emittedCourseIds(DEV)).toEqual(emittedCourseIds(STRICT));
    expect([...DEV.shipped.entries()].sort()).toEqual([...STRICT.shipped.entries()].sort());
    // And every course they share ships the same modules under both gates.
    for (const [id, modules] of STRICT.shipped) {
      expect(DEV.shipped.get(id), `${id} ships the same rungs under both gates`).toEqual(modules);
    }
  });
});

/**
 * **The seam, proved on a tree of this file's own making (#606, #611, #632).**
 *
 * Written when the catalogue held no fixture row and the gate's live branch had nothing to
 * exercise it. en-la (#632) exercises it again — the cases above assert that — but the synthetic
 * tree is kept, and deliberately: a scratch content root holding one real course whose row is
 * flipped back to `fixture: true` proves the gate whatever the catalogue happens to hold, so this
 * file does not go quiet the next time a graduation empties it. The difference that matters is that
 * this tree's course has TEN authored rungs, so `--with-fixtures` admits a course with content in
 * it; en-la's is empty until #634, and an empty course is dropped by both gates.
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
    expect(FIXTURE_DEV.lines).toContain('en-sa: 25 modules (L1-M1..M10, L2-M1..M10, L3-M1..M5)');
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
