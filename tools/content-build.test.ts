import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import {
  buildContent,
  checkScriptMode,
  devBanner,
  gateModule,
  moduleRanges,
  parseFlags,
  validateManifest,
  type BuildFlags,
  type BuildReport,
  type CourseRow,
  type EmittedManifest,
  type Levels,
} from './content-build.ts';
import { DEFAULT_CONTENT_ROOT, REPO_ROOT, type Module } from './validate.ts';

/**
 * Fixture trees are written to a tmp dir and built with `buildContent`, so nothing here shells
 * out and no test can touch the repo's own `public/content/`. The module bodies are clones of
 * the authored `content/hi-mr/modules/L1-M1.json` — the only difference between two fixture
 * modules is the gate flag under test.
 *
 * `verified: true` appears ONLY on these tmp clones. Nothing under `content/` is verified; that
 * signature is a human's to give (#64).
 */
const HI_MR_M1 = path.join(DEFAULT_CONTENT_ROOT, 'hi-mr', 'modules', 'L1-M1.json');
const EN_AR_ROMANIZED = path.join(
  REPO_ROOT,
  'tools',
  'fixtures',
  'content',
  'en-ar',
  'modules',
  'L1-M4.json',
);

const STRICT: BuildFlags = { withUnverified: false, withFixtures: false };
const DEV: BuildFlags = { withUnverified: true, withFixtures: true };

const temporaryDirs: string[] = [];

afterAll(() => {
  for (const dir of temporaryDirs) rmSync(dir, { recursive: true, force: true });
});

function temporaryDir(prefix: string): string {
  const dir = mkdtempSync(path.join(tmpdir(), prefix));
  temporaryDirs.push(dir);
  return dir;
}

interface FixtureModule {
  id: string;
  verified?: boolean;
  fixture?: boolean;
}

interface FixtureCourse {
  row: CourseRow;
  modules: FixtureModule[];
  /** Module ids listed in levels.json. Defaults to the module ids, all hand-flagged hasContent: true. */
  listed?: string[];
}

function courseRow(id: string, overrides: Partial<CourseRow> = {}): CourseRow {
  return {
    id,
    l1: 'Hindi',
    l2: 'Marathi',
    pairLabel: 'hindi → marathi',
    scriptMode: 'native',
    dir: 'ltr',
    ...overrides,
  };
}

function moduleFrom(fixture: FixtureModule): Module {
  const module = JSON.parse(readFileSync(HI_MR_M1, 'utf8')) as Module;
  module.id = fixture.id;
  module.prerequisites = [];
  module.verified = fixture.verified ?? false;
  if (fixture.verified === true) {
    module.verifiedBy = 'a native speaker';
    module.verifiedAt = '2026-01-01T00:00:00Z';
  }
  if (fixture.fixture === true) module.fixture = true;
  return module;
}

/** Every entry claims `hasContent: true` — the hand-flag the build must never trust. */
function levelsFor(course: FixtureCourse): Levels {
  const ids = course.listed ?? course.modules.map((module) => module.id);
  return {
    courseId: course.row.id,
    levels: [
      {
        id: 'L1',
        name: 'Foundations',
        modules: ids.map((id) => ({
          id,
          title: `Title ${id}`,
          job: `Job ${id}`,
          hasContent: true,
        })),
      },
    ],
  };
}

/** Writes a whole `content/`-shaped tree: courses.json + one folder per course. */
function scaffold(courses: readonly FixtureCourse[]): string {
  const root = temporaryDir('rung-build-content-');
  writeFileSync(
    path.join(root, 'courses.json'),
    JSON.stringify(
      courses.map((course) => course.row),
      null,
      2,
    ),
    'utf8',
  );
  for (const course of courses) {
    const dir = path.join(root, course.row.id);
    mkdirSync(path.join(dir, 'modules'), { recursive: true });
    writeFileSync(
      path.join(dir, 'levels.json'),
      JSON.stringify(levelsFor(course), null, 2),
      'utf8',
    );
    writeFileSync(
      path.join(dir, 'strings.json'),
      JSON.stringify({ cueLabel: `${course.row.id} cue` }, null, 2),
      'utf8',
    );
    for (const fixture of course.modules) {
      const module = moduleFrom(fixture);
      writeFileSync(
        path.join(dir, 'modules', `${module.id}.json`),
        JSON.stringify(module, null, 2),
        'utf8',
      );
    }
  }
  return root;
}

function build(contentRoot: string, flags: BuildFlags): { report: BuildReport; outRoot: string } {
  const outRoot = path.join(temporaryDir('rung-build-out-'), 'content');
  return { report: buildContent({ contentRoot, outRoot, ...flags }), outRoot };
}

function readManifest(outRoot: string): EmittedManifest {
  return JSON.parse(readFileSync(path.join(outRoot, 'courses.json'), 'utf8')) as EmittedManifest;
}

function shippedIds(report: BuildReport, courseId: string): string[] {
  return report.shipped.get(courseId) ?? [];
}

/** One course, one module per corner of the gate's truth table. */
const TRUTH_TABLE: FixtureCourse[] = [
  {
    row: courseRow('hi-mr'),
    modules: [
      { id: 'L1-M1', verified: true },
      { id: 'L1-M2', verified: false },
      { id: 'L1-M3', verified: true, fixture: true },
      { id: 'L1-M4', verified: false, fixture: true },
    ],
  },
];

describe('the gate', () => {
  it('ships only verified, non-fixture modules by default', () => {
    const { report, outRoot } = build(scaffold(TRUTH_TABLE), STRICT);

    expect(report.exitCode).toBe(0);
    expect(shippedIds(report, 'hi-mr')).toEqual(['L1-M1']);
    expect(existsSync(path.join(outRoot, 'hi-mr', 'modules', 'L1-M1.json'))).toBe(true);
    for (const id of ['L1-M2', 'L1-M3', 'L1-M4']) {
      expect(existsSync(path.join(outRoot, 'hi-mr', 'modules', `${id}.json`))).toBe(false);
    }
  });

  it('adds the unverified modules — and only those — under --with-unverified', () => {
    const { report } = build(scaffold(TRUTH_TABLE), { withUnverified: true, withFixtures: false });

    expect(shippedIds(report, 'hi-mr')).toEqual(['L1-M1', 'L1-M2']);
  });

  it('adds the fixture modules — and only those — under --with-fixtures', () => {
    const { report } = build(scaffold(TRUTH_TABLE), { withUnverified: false, withFixtures: true });

    expect(shippedIds(report, 'hi-mr')).toEqual(['L1-M1', 'L1-M3']);
  });

  it('ships everything only when both relaxations are on', () => {
    const { report } = build(scaffold(TRUTH_TABLE), DEV);

    expect(shippedIds(report, 'hi-mr')).toEqual(['L1-M1', 'L1-M2', 'L1-M3', 'L1-M4']);
  });

  it('excludes a fixture COURSE wholesale, however verified its modules are', () => {
    const tree = scaffold([
      { row: courseRow('hi-mr'), modules: [{ id: 'L1-M1', verified: true }] },
      { row: courseRow('en-es', { fixture: true }), modules: [{ id: 'L1-M1', verified: true }] },
    ]);

    const strict = build(tree, STRICT);
    expect(strict.report.shipped.has('en-es')).toBe(false);
    expect(existsSync(path.join(strict.outRoot, 'en-es'))).toBe(false);

    const unverified = build(tree, { withUnverified: true, withFixtures: false });
    expect(unverified.report.shipped.has('en-es')).toBe(false);

    const fixtures = build(tree, { withUnverified: false, withFixtures: true });
    expect(shippedIds(fixtures.report, 'en-es')).toEqual(['L1-M1']);
  });

  it('reports the gate decision per module', () => {
    const module = moduleFrom({ id: 'L1-M1', verified: false, fixture: true });

    expect(gateModule(module, STRICT)).toEqual({ ship: false, reason: 'fixture' });
    expect(gateModule(module, { withUnverified: true, withFixtures: false })).toEqual({
      ship: false,
      reason: 'fixture',
    });
    expect(gateModule(module, { withUnverified: false, withFixtures: true })).toEqual({
      ship: false,
      reason: 'unverified',
    });
    expect(gateModule(module, DEV)).toEqual({ ship: true });
  });
});

describe('hasContent', () => {
  it('is recomputed from what shipped, never read from the authored flag', () => {
    const tree = scaffold(TRUTH_TABLE);

    const strict = build(tree, STRICT);
    const strictLevels = JSON.parse(
      readFileSync(path.join(strict.outRoot, 'hi-mr', 'levels.json'), 'utf8'),
    ) as Levels;
    expect(strictLevels.levels[0]?.modules.map((entry) => [entry.id, entry.hasContent])).toEqual([
      ['L1-M1', true],
      ['L1-M2', false],
      ['L1-M3', false],
      ['L1-M4', false],
    ]);

    const dev = build(tree, DEV);
    const devLevels = JSON.parse(
      readFileSync(path.join(dev.outRoot, 'hi-mr', 'levels.json'), 'utf8'),
    ) as Levels;
    expect(devLevels.levels[0]?.modules.every((entry) => entry.hasContent === true)).toBe(true);
  });

  it('is false for a module the ladder lists but nobody has authored', () => {
    const tree = scaffold([
      {
        row: courseRow('hi-mr'),
        modules: [{ id: 'L1-M1', verified: true }],
        listed: ['L1-M1', 'L1-M2', 'L1-M3'],
      },
    ]);

    const { outRoot } = build(tree, STRICT);
    const levels = JSON.parse(
      readFileSync(path.join(outRoot, 'hi-mr', 'levels.json'), 'utf8'),
    ) as Levels;

    expect(levels.levels[0]?.modules.map((entry) => entry.hasContent)).toEqual([
      true,
      false,
      false,
    ]);
  });

  it('leaves every other levels.json field alone', () => {
    const { outRoot } = build(scaffold(TRUTH_TABLE), STRICT);
    const levels = JSON.parse(
      readFileSync(path.join(outRoot, 'hi-mr', 'levels.json'), 'utf8'),
    ) as Levels;

    expect(levels.courseId).toBe('hi-mr');
    expect(levels.levels[0]?.name).toBe('Foundations');
    expect(levels.levels[0]?.modules[0]).toEqual({
      id: 'L1-M1',
      title: 'Title L1-M1',
      job: 'Job L1-M1',
      hasContent: true,
    });
  });
});

describe('the emitted manifest', () => {
  it('lists only courses that shipped at least one module, verbatim', () => {
    const tree = scaffold([
      { row: courseRow('hi-mr'), modules: [{ id: 'L1-M1', verified: true }] },
      { row: courseRow('en-es'), modules: [{ id: 'L1-M1', verified: false }] },
      {
        row: courseRow('en-ar', { scriptMode: 'romanized', romanizationNote: 'ALA-LC' }),
        modules: [{ id: 'L1-M1', verified: true }],
      },
    ]);

    const manifest = readManifest(build(tree, STRICT).outRoot);

    expect(manifest.courses.map((course) => course.id)).toEqual(['hi-mr', 'en-ar']);
    expect(manifest.courses[1]?.romanizationNote).toBe('ALA-LC');
  });

  it('carries no dev marker on a strict build', () => {
    const manifest = readManifest(build(scaffold(TRUTH_TABLE), STRICT).outRoot);

    expect(manifest.devBuild).toBeUndefined();
    expect(manifest.devBuildNote).toBeUndefined();
    expect(Object.keys(manifest)).toEqual(['courses']);
  });

  it('marks the build non-shippable as soon as either relaxation is on', () => {
    for (const flags of [
      DEV,
      { withUnverified: true, withFixtures: false },
      { withUnverified: false, withFixtures: true },
    ]) {
      const manifest = readManifest(build(scaffold(TRUTH_TABLE), flags).outRoot);

      expect(manifest.devBuild).toBe(true);
      expect(manifest.devBuildNote).toMatch(/NOT a shippable learner build/);
    }
  });

  it('copies strings.json for every shipped course, and for no other', () => {
    const tree = scaffold([
      { row: courseRow('hi-mr'), modules: [{ id: 'L1-M1', verified: true }] },
      { row: courseRow('en-es'), modules: [{ id: 'L1-M1', verified: false }] },
    ]);

    const { outRoot } = build(tree, STRICT);

    expect(JSON.parse(readFileSync(path.join(outRoot, 'hi-mr', 'strings.json'), 'utf8'))).toEqual({
      cueLabel: 'hi-mr cue',
    });
    expect(existsSync(path.join(outRoot, 'en-es', 'strings.json'))).toBe(false);
  });
});

describe('the banner', () => {
  it('names the relaxations in play, and says nothing on a strict build', () => {
    expect(devBanner(STRICT)).toBeNull();
    expect(devBanner(DEV)).toBe(
      'CONTENT ⚠ DEV BUILD — includes unverified and fixture content; NOT shippable',
    );
    expect(devBanner({ withUnverified: true, withFixtures: false })).toBe(
      'CONTENT ⚠ DEV BUILD — includes unverified content; NOT shippable',
    );
  });

  it('opens and closes the output of a relaxed build', () => {
    const { report } = build(scaffold(TRUTH_TABLE), DEV);
    const banner = devBanner(DEV);

    expect(report.lines[0]).toBe(banner);
    expect(report.lines.at(-1)).toBe(banner);
  });

  it('never appears on a strict build', () => {
    const { report } = build(scaffold(TRUTH_TABLE), STRICT);

    expect(report.lines.some((line) => line.includes('DEV BUILD'))).toBe(false);
  });
});

describe('the output tree', () => {
  it('is clean-recreated: yesterday’s output cannot survive today’s build', () => {
    const tree = scaffold(TRUTH_TABLE);
    const outRoot = path.join(temporaryDir('rung-build-out-'), 'content');
    mkdirSync(path.join(outRoot, 'zz-zz', 'modules'), { recursive: true });
    writeFileSync(path.join(outRoot, 'zz-zz', 'modules', 'L1-M1.json'), '{}', 'utf8');

    buildContent({ contentRoot: tree, outRoot, ...STRICT });

    expect(existsSync(path.join(outRoot, 'zz-zz'))).toBe(false);
    expect(existsSync(path.join(outRoot, 'hi-mr', 'modules', 'L1-M1.json'))).toBe(true);
  });

  it('copies module files byte for byte', () => {
    const tree = scaffold(TRUTH_TABLE);
    const { outRoot } = build(tree, STRICT);

    expect(readFileSync(path.join(outRoot, 'hi-mr', 'modules', 'L1-M1.json'), 'utf8')).toBe(
      readFileSync(path.join(tree, 'hi-mr', 'modules', 'L1-M1.json'), 'utf8'),
    );
  });

  it('treats a course with nothing authored yet as a state, not a failure', () => {
    const tree = scaffold([
      { row: courseRow('hi-mr'), modules: [{ id: 'L1-M1', verified: true }] },
      { row: courseRow('fr-de'), modules: [], listed: ['L1-M1'] },
    ]);

    const { report, outRoot } = build(tree, STRICT);

    expect(report.exitCode).toBe(0);
    expect(report.lines).toContain('fr-de: 0 modules — nothing authored yet');
    expect(readManifest(outRoot).courses.map((course) => course.id)).toEqual(['hi-mr']);
  });
});

describe('manifest validation', () => {
  function errorsFor(json: unknown): string[] {
    return validateManifest(json).errors;
  }

  it('accepts the authored manifest, extra course keys and all', () => {
    const json = JSON.parse(readFileSync(path.join(DEFAULT_CONTENT_ROOT, 'courses.json'), 'utf8'));
    const { courses, errors } = validateManifest(json);

    expect(errors).toEqual([]);
    expect(courses.map((course) => course.id)).toEqual(['hi-mr', 'en-es', 'en-ar']);
    expect(courses[2]?.romanizationNote).toMatch(/^ALA-LC/);
  });

  it('rejects a manifest that is not a non-empty array of objects', () => {
    expect(errorsFor({ courses: [] })).toEqual(['courses.json: must be an array of course rows']);
    expect(errorsFor([])).toEqual(['courses.json: declares no courses']);
    expect(errorsFor(['hi-mr'])).toEqual(['courses.json[0]: must be an object']);
  });

  it('names the offending row and field', () => {
    const errors = errorsFor([
      { ...courseRow('hi-mr'), l2: '' },
      { ...courseRow('en-es'), scriptMode: 'transliterated' },
      { ...courseRow('en-ar'), dir: 'sideways' },
      { ...courseRow('hi-mr') },
      { ...courseRow('Hi_MR') },
      { ...courseRow('en-fr'), fixture: 'yes' },
    ]);

    expect(errors).toEqual([
      'courses.json[0].l2: required, must be a non-empty string',
      'courses.json[1].scriptMode: must be one of: native, romanized',
      'courses.json[2].dir: must be one of: ltr, rtl',
      'courses.json[3].id: duplicate course id "hi-mr" — already declared by courses.json[0]',
      'courses.json[4].id: "Hi_MR" must be lowercase letters, digits and single hyphens',
      'courses.json[5].fixture: must be a boolean when present',
    ]);
  });

  it('fails the build, writing nothing, when a course has no folder', () => {
    const tree = scaffold([
      { row: courseRow('hi-mr'), modules: [{ id: 'L1-M1', verified: true }] },
    ]);
    writeFileSync(
      path.join(tree, 'courses.json'),
      JSON.stringify([courseRow('hi-mr'), courseRow('en-es')]),
      'utf8',
    );

    const { report, outRoot } = build(tree, STRICT);

    expect(report.exitCode).toBe(1);
    expect(report.lines).toEqual([
      'CONTENT build FAIL',
      '  courses.json: course "en-es" has no content/en-es/ folder',
    ]);
    expect(existsSync(outRoot)).toBe(false);
  });

  it('fails when a course folder has no manifest row', () => {
    const tree = scaffold([
      { row: courseRow('hi-mr'), modules: [{ id: 'L1-M1', verified: true }] },
      { row: courseRow('en-es'), modules: [{ id: 'L1-M1', verified: true }] },
    ]);
    writeFileSync(path.join(tree, 'courses.json'), JSON.stringify([courseRow('hi-mr')]), 'utf8');

    const { report } = build(tree, STRICT);

    expect(report.exitCode).toBe(1);
    expect(report.lines).toContain(
      '  en-es/modules/: no such course in courses.json — add the manifest row or remove the folder',
    );
  });
});

describe('module validation', () => {
  it('aborts on an invalid module, quoting #73’s message, and leaves the output untouched', () => {
    const tree = scaffold(TRUTH_TABLE);
    const broken = moduleFrom({ id: 'L1-M2' });
    broken.sentences.pop();
    writeFileSync(
      path.join(tree, 'hi-mr', 'modules', 'L1-M2.json'),
      JSON.stringify(broken),
      'utf8',
    );

    const outRoot = path.join(temporaryDir('rung-build-out-'), 'content');
    mkdirSync(outRoot, { recursive: true });
    writeFileSync(path.join(outRoot, 'courses.json'), 'previous build', 'utf8');
    const report = buildContent({ contentRoot: tree, outRoot, ...STRICT });

    expect(report.exitCode).toBe(1);
    expect(report.lines[0]).toBe('CONTENT build FAIL');
    expect(report.lines).toContain(
      '  hi-mr/L1-M2.json: /sentences: expected exactly 10 sentences, found 9',
    );
    expect(readFileSync(path.join(outRoot, 'courses.json'), 'utf8')).toBe('previous build');
  });

  it('validates modules the gate is about to drop, not just the ones that ship', () => {
    const tree = scaffold(TRUTH_TABLE);
    writeFileSync(path.join(tree, 'hi-mr', 'modules', 'L1-M4.json'), '{ not json', 'utf8');

    const { report } = build(tree, STRICT);

    expect(report.exitCode).toBe(1);
    expect(report.lines.join('\n')).toMatch(/hi-mr\/L1-M4\.json: invalid JSON/);
  });

  it('aborts when a module file is not listed in the course levels.json', () => {
    const tree = scaffold([
      {
        row: courseRow('hi-mr'),
        modules: [
          { id: 'L1-M1', verified: true },
          { id: 'L1-M2', verified: true },
        ],
        listed: ['L1-M1'],
      },
    ]);

    const { report } = build(tree, STRICT);

    expect(report.exitCode).toBe(1);
    expect(report.lines).toContain(
      '  hi-mr/L1-M2.json: "L1-M2" is not listed in hi-mr/levels.json',
    );
  });
});

describe('the scriptMode cross-check', () => {
  function romanizedFixture(): Module {
    return JSON.parse(readFileSync(EN_AR_ROMANIZED, 'utf8')) as Module;
  }

  it('accepts the romanized fixture and counts its optional script lines', () => {
    const report = checkScriptMode(romanizedFixture(), 'romanized');

    expect(report.errors).toEqual([]);
    expect(report.surfaces).toBeGreaterThan(report.withScript);
    expect(report.withScript).toBeGreaterThan(0);
  });

  it('requires a romanized display on every surface of a romanized course', () => {
    const module = romanizedFixture();
    const sentence = module.sentences[0];
    if (sentence === undefined) throw new Error('fixture has no sentences');
    delete (sentence.deconstruction.words[0] as Partial<{ display: string }>).display;
    const item = module.comprehensionPool[0];
    if (item === undefined) throw new Error('fixture has no comprehension pool');
    item.display = '   ';

    const report = checkScriptMode(module, 'romanized');

    expect(report.errors).toEqual([
      '/sentences/0/deconstruction/words/0/display: scriptMode romanized requires a romanized display on every surface',
      '/comprehensionPool/0/display: scriptMode romanized requires a romanized display on every surface',
    ]);
  });

  it('has nothing to say about a native course — display IS the native text', () => {
    const module = romanizedFixture();
    module.sentences[0]!.display = '';

    expect(checkScriptMode(module, 'native')).toEqual({ errors: [], surfaces: 0, withScript: 0 });
  });

  it('warns once per shipped module about the missing optional script lines', () => {
    const tree = scaffold([
      {
        row: courseRow('en-ar', { scriptMode: 'romanized' }),
        modules: [{ id: 'L1-M1', verified: true }],
      },
    ]);

    const { report } = build(tree, STRICT);

    expect(report.lines.filter((line) => line.includes('warn'))).toEqual([
      expect.stringContaining('romanized surfaces carry no script line'),
    ]);
  });
});

describe('the summary line', () => {
  it('compacts consecutive modules into a range', () => {
    expect(moduleRanges(['L1-M1'])).toBe('L1-M1');
    expect(moduleRanges(['L1-M1', 'L1-M2'])).toBe('L1-M1..M2');
    expect(moduleRanges(['L1-M9', 'L1-M10'])).toBe('L1-M9..M10');
    expect(moduleRanges(['L1-M1', 'L1-M3', 'L1-M4'])).toBe('L1-M1, L1-M3..M4');
    expect(moduleRanges(['L1-M10', 'L2-M1'])).toBe('L1-M10, L2-M1');
    expect(moduleRanges([])).toBe('');
  });

  it('reads the flags off argv, and refuses anything else', () => {
    expect(parseFlags([])).toEqual({ flags: STRICT, errors: [] });
    expect(parseFlags(['--with-unverified', '--with-fixtures'])).toEqual({
      flags: DEV,
      errors: [],
    });
    expect(parseFlags(['--ship-it']).errors).toEqual([
      'unknown flag "--ship-it" — expected --with-unverified and/or --with-fixtures (dev only)',
    ]);
  });
});

/**
 * The repo's own content, built both ways. This is the test that would catch someone quietly
 * marking a module verified, or a fixture course leaking into a strict build.
 */
describe('the authored content', () => {
  it('ships nothing at all on a strict build, and says why', () => {
    const { report, outRoot } = build(DEFAULT_CONTENT_ROOT, STRICT);

    expect(report.exitCode).toBe(0);
    expect(report.shipped.size).toBe(0);
    expect(readManifest(outRoot)).toEqual({ courses: [] });
    expect(report.lines).toEqual([
      'hi-mr: 0 modules — L1-M1, L1-M2 unverified (native gate #64; --with-unverified ships them in dev)',
      'en-es: 0 modules — fixture course, excluded by the gate (--with-fixtures ships it in dev)',
      'en-ar: 0 modules — fixture course, excluded by the gate (--with-fixtures ships it in dev)',
      expect.stringContaining('CONTENT ⚠ STRICT BUILD SHIPPED NO CONTENT'),
      'CONTENT build: nothing shipped | skipped: hi-mr (2 unverified), en-es (fixture course), en-ar (fixture course)',
    ]);
  });

  it('ships hi-mr L1-M1..M2 and both fixture courses on a dev build', () => {
    const { report, outRoot } = build(DEFAULT_CONTENT_ROOT, DEV);

    expect(report.exitCode).toBe(0);
    expect([...report.shipped]).toEqual([
      ['hi-mr', ['L1-M1', 'L1-M2']],
      ['en-es', ['L1-M1']],
      ['en-ar', ['L1-M1']],
    ]);
    expect(report.lines).toContain(
      'CONTENT build: hi-mr 2 modules (L1-M1..M2), en-es 1 module (L1-M1), en-ar 1 module (L1-M1)',
    );
    expect(readManifest(outRoot).devBuild).toBe(true);
    for (const file of [
      'hi-mr/levels.json',
      'hi-mr/strings.json',
      'hi-mr/modules/L1-M1.json',
      'hi-mr/modules/L1-M2.json',
      'en-es/modules/L1-M1.json',
      'en-ar/modules/L1-M1.json',
    ]) {
      expect(existsSync(path.join(outRoot, ...file.split('/')))).toBe(true);
    }
  });

  it('never claims content for a module nobody has authored', () => {
    const { outRoot } = build(DEFAULT_CONTENT_ROOT, DEV);
    const levels = JSON.parse(
      readFileSync(path.join(outRoot, 'hi-mr', 'levels.json'), 'utf8'),
    ) as Levels;
    const withContent = levels.levels.flatMap((level) =>
      level.modules.filter((entry) => entry.hasContent === true).map((entry) => entry.id),
    );

    expect(withContent).toEqual(['L1-M1', 'L1-M2']);
  });
});
