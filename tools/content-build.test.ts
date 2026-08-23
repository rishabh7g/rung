import {
  existsSync,
  mkdirSync,
  mkdtempSync,
  readFileSync,
  readdirSync,
  rmSync,
  statSync,
  writeFileSync,
} from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import {
  buildContent,
  buildWordIndex,
  checkComprehensionPool,
  checkGlossEn,
  checkScriptMode,
  devBanner,
  gateModule,
  moduleRanges,
  parseFlags,
  validateManifest,
  type BuildFlags,
  type BuildReport,
  type CourseRow,
  type CourseSizesFile,
  type EmittedManifest,
  type Levels,
  type WordIndexFile,
} from './content-build.ts';
import { matchSurfaces, tokenizeSurface } from '../src/engine/surface.ts';
import { completeStrings } from './fixtures/strings.ts';
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
  /** Applied last, so a test can bend the clone into the shape it is actually about. */
  edit?: (module: Module) => void;
}

interface FixtureCourse {
  row: CourseRow;
  modules: FixtureModule[];
  /** Module ids listed in levels.json. Defaults to the module ids, all hand-flagged hasContent: true. */
  listed?: string[];
  /** Defaults to a complete bundle built from the canonical key list (#76); override to break it. */
  strings?: Record<string, unknown>;
}

function courseRow(id: string, overrides: Partial<CourseRow> = {}): CourseRow {
  return {
    id,
    l1: 'Hindi',
    l2: 'Marathi',
    l1Tag: 'hi',
    l2Tag: 'mr',
    l2Dir: 'ltr',
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
    module.verifiedAt = '2026-01-01';
  }
  if (fixture.fixture === true) module.fixture = true;
  fixture.edit?.(module);
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
      JSON.stringify(course.strings ?? completeStrings(course.row.id), null, 2),
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

function readIndex(outRoot: string, courseId: string, moduleId: string): WordIndexFile {
  const file = path.join(outRoot, courseId, 'index', `${moduleId}.json`);
  return JSON.parse(readFileSync(file, 'utf8')) as WordIndexFile;
}

/** A module straight out of `content/` — the real thing, not a fixture clone. */
function authored(courseId: string, moduleId: string): Module {
  const file = path.join(DEFAULT_CONTENT_ROOT, courseId, 'modules', `${moduleId}.json`);
  return JSON.parse(readFileSync(file, 'utf8')) as Module;
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

    expect(JSON.parse(readFileSync(path.join(outRoot, 'hi-mr', 'strings.json'), 'utf8'))).toEqual(
      completeStrings('hi-mr'),
    );
    expect(existsSync(path.join(outRoot, 'en-es', 'strings.json'))).toBe(false);
  });
});

/** The build's half of #76 — the check itself is covered in `strings-check.test.ts`. */
describe('the strings gate', () => {
  function tamper(edit: (bundle: Record<string, unknown>) => void): Record<string, unknown> {
    const bundle = completeStrings('hi-mr');
    edit(bundle);
    return bundle;
  }

  it('fails the build, writing nothing, when a course drops a key (PRD §6.5)', () => {
    const tree = scaffold([
      {
        row: courseRow('hi-mr'),
        modules: [{ id: 'L1-M1', verified: true }],
        strings: tamper((bundle) => {
          delete (bundle.retry as Record<string, unknown>).cta;
        }),
      },
    ]);

    const { report, outRoot } = build(tree, STRICT);

    expect(report.exitCode).toBe(1);
    expect(report.lines).toEqual([
      'CONTENT build FAIL',
      '  hi-mr/strings.json: missing key "retry.cta"',
    ]);
    expect(existsSync(outRoot)).toBe(false);
  });

  it('checks the strings of a course the gate will ship nothing from', () => {
    const tree = scaffold([
      { row: courseRow('hi-mr'), modules: [{ id: 'L1-M1', verified: true }] },
      {
        row: courseRow('en-es', { fixture: true }),
        modules: [{ id: 'L1-M1', verified: false, fixture: true }],
        strings: tamper((bundle) => {
          bundle.importToast = '';
        }),
      },
    ]);

    const { report } = build(tree, STRICT);

    expect(report.exitCode).toBe(1);
    expect(report.lines).toContain(
      '  en-es/strings.json: "importToast" must be a non-empty string — got an empty string',
    );
  });

  it('fails a placeholder a translation dropped, naming course and key', () => {
    const tree = scaffold([
      {
        row: courseRow('hi-mr'),
        modules: [{ id: 'L1-M1', verified: true }],
        strings: tamper((bundle) => {
          bundle.switchToast = 'You are on the other course now.';
        }),
      },
    ]);

    const { report } = build(tree, STRICT);

    expect(report.exitCode).toBe(1);
    expect(report.lines).toContain(
      '  hi-mr/strings.json: "switchToast" placeholders — expected {from} {to}, found none',
    );
  });

  it('passes the three authored bundles as they ship', () => {
    const { report } = build(DEFAULT_CONTENT_ROOT, DEV);

    expect(report.exitCode).toBe(0);
    expect(report.lines.join('\n')).not.toMatch(/strings\.json/);
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

  it('emits sizes.json per shipped course — the sum of every other emitted byte (#107)', () => {
    const tree = scaffold([
      {
        row: courseRow('hi-mr'),
        modules: [
          { id: 'L1-M1', verified: true },
          { id: 'L1-M2', verified: true },
        ],
      },
    ]);

    const { outRoot } = build(tree, STRICT);
    const courseOut = path.join(outRoot, 'hi-mr');
    const sizes = JSON.parse(
      readFileSync(path.join(courseOut, 'sizes.json'), 'utf8'),
    ) as CourseSizesFile;

    // Recount from the emitted tree itself: every file except sizes.json, which cannot carry
    // its own length. modules + indexes + levels.json + strings.json = 2 + 2 + 1 + 1.
    const emitted = [
      ...readdirSync(path.join(courseOut, 'modules')).map((f) => path.join('modules', f)),
      ...readdirSync(path.join(courseOut, 'index')).map((f) => path.join('index', f)),
      'levels.json',
      'strings.json',
    ];
    const bytes = emitted.reduce((sum, file) => sum + statSync(path.join(courseOut, file)).size, 0);

    expect(sizes.courseId).toBe('hi-mr');
    expect(sizes.files).toBe(6);
    expect(emitted).toHaveLength(6);
    expect(sizes.bytes).toBe(bytes);
    expect(sizes.bytes).toBeGreaterThan(0);
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
    expect(courses.map((course) => course.id)).toEqual(['hi-mr', 'en-es', 'en-ar', 'hi-en']);
    expect(courses[2]?.romanizationNote).toMatch(/^ALA-LC/);
    // hi-en (#267) is authored behind the gate: the row validates like any other and says so.
    expect(courses[3]?.fixture).toBe(true);
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

  it('rejects a row that never says which way its L2 runs (#196)', () => {
    const noL2Dir: Record<string, unknown> = { ...courseRow('hi-mr') };
    delete noL2Dir['l2Dir'];

    // `dir` is the course as the learner meets it; `l2Dir` is the language in its own script.
    // en-ar differs on the two, so a row that declares only the first has not said enough.
    expect(errorsFor([noL2Dir, { ...courseRow('en-ar'), l2Dir: 'sideways' }])).toEqual([
      'courses.json[0].l2Dir: must be one of: ltr, rtl',
      'courses.json[1].l2Dir: must be one of: ltr, rtl',
    ]);
    expect(errorsFor([{ ...courseRow('en-ar'), dir: 'ltr', l2Dir: 'rtl' }])).toEqual([]);
  });

  it('rejects a row whose language tags are missing or malformed (#186)', () => {
    const noTag: Record<string, unknown> = { ...courseRow('hi-mr') };
    delete noTag['l1Tag'];
    const errors = errorsFor([
      noTag,
      { ...courseRow('en-es'), l2Tag: 'Spanish' },
      { ...courseRow('en-ar'), l2Tag: 'ar_Latn' },
    ]);

    // A name is for the learner and a tag is for the browser; "Spanish" is neither.
    expect(errors).toEqual([
      'courses.json[0].l1Tag: required, must be a BCP-47 language tag like "hi" or "ar-Latn"',
      'courses.json[1].l2Tag: required, must be a BCP-47 language tag like "hi" or "ar-Latn"',
      'courses.json[2].l2Tag: required, must be a BCP-47 language tag like "hi" or "ar-Latn"',
    ]);
    // And the shape it does accept: a script subtag, which is what a romanized course needs.
    expect(errorsFor([{ ...courseRow('en-ar'), l2Tag: 'ar' }])).toEqual([]);
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

describe('the glossEn cross-check (#268)', () => {
  /** The hi-mr clone with the gloss taken off one sentence and blanked on another. */
  function withoutGloss(module: Module): Module {
    delete module.sentences[3]!.glossEn;
    module.sentences[5]!.glossEn = '   ';
    return module;
  }

  /** The same edit, as a fixture would author it: the fourth sentence simply has no gloss. */
  function dropGloss(module: Module): void {
    delete module.sentences[3]!.glossEn;
  }

  it('accepts the authored clone — every sentence carries its gloss', () => {
    expect(checkGlossEn(moduleFrom({ id: 'L1-M1' }), 'mr')).toEqual([]);
  });

  it('requires a non-empty gloss on every sentence of a course whose L2 is not English', () => {
    expect(checkGlossEn(withoutGloss(moduleFrom({ id: 'L1-M1' })), 'mr')).toEqual([
      '/sentences/3/glossEn: required unless the course\'s l2Tag is "en" (this row: "mr")',
      '/sentences/5/glossEn: required unless the course\'s l2Tag is "en" (this row: "mr")',
    ]);
  });

  it('has nothing to say where the L2 is English — the gloss would only repeat the hero', () => {
    expect(checkGlossEn(withoutGloss(moduleFrom({ id: 'L1-M1' })), 'en')).toEqual([]);
  });

  it('fails the build under any other l2Tag, naming the module and the sentence', () => {
    const tree = scaffold([
      {
        row: courseRow('en-es', { l1: 'English', l2: 'Spanish', l1Tag: 'en', l2Tag: 'es' }),
        modules: [{ id: 'L1-M1', verified: true, edit: dropGloss }],
      },
    ]);

    const { report } = build(tree, STRICT);

    expect(report.exitCode).toBe(1);
    expect(report.lines).toContain(
      '  en-es/L1-M1.json: /sentences/3/glossEn: required unless the course\'s l2Tag is "en" (this row: "es")',
    );
  });

  it('builds the same module under an l2Tag of en', () => {
    const tree = scaffold([
      {
        row: courseRow('hi-en', { l1Tag: 'hi', l2Tag: 'en', l1: 'Hindi', l2: 'English' }),
        modules: [{ id: 'L1-M1', verified: true, edit: dropGloss }],
      },
    ]);

    const { report } = build(tree, STRICT);

    expect(report.exitCode).toBe(0);
    expect(shippedIds(report, 'hi-en')).toEqual(['L1-M1']);
    expect(report.lines).toContain('CONTENT build: hi-en 1 module (L1-M1)');
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
 * The word index (#75). `teaches` bolts an extra word row onto the clone's first sentence, which
 * is how a fixture module comes to teach something the module before it did not.
 */
describe('the word index', () => {
  function teaches(display: string, forms: string[] = []): (module: Module) => void {
    return (module) => {
      module.sentences[0]?.deconstruction.words.push({
        display,
        cue: 'नया',
        tag: 'free',
        forms,
      });
    };
  }

  const M1_THEN_M2: FixtureCourse[] = [
    {
      row: courseRow('hi-mr'),
      modules: [
        { id: 'L1-M1', verified: true },
        // A clone: it re-teaches every one of M1's words, and adds exactly one of its own.
        { id: 'L1-M2', verified: true, edit: teaches('झाड', ['झाड', 'झाडं']) },
      ],
    },
  ];

  it('emits one index per shipped module — and none for a module the gate held back', () => {
    const { outRoot } = build(
      scaffold([
        {
          row: courseRow('hi-mr'),
          modules: [
            { id: 'L1-M1', verified: true },
            { id: 'L1-M2', verified: false },
          ],
        },
      ]),
      STRICT,
    );

    expect(existsSync(path.join(outRoot, 'hi-mr', 'index', 'L1-M1.json'))).toBe(true);
    expect(existsSync(path.join(outRoot, 'hi-mr', 'index', 'L1-M2.json'))).toBe(false);
  });

  it('grows cumulatively: M2 is a strict superset of M1', () => {
    const { outRoot } = build(scaffold(M1_THEN_M2), STRICT);
    const first = readIndex(outRoot, 'hi-mr', 'L1-M1');
    const second = readIndex(outRoot, 'hi-mr', 'L1-M2');

    expect(first.cumulativeThrough).toEqual(['L1-M1']);
    expect(second.cumulativeThrough).toEqual(['L1-M1', 'L1-M2']);
    for (const surface of Object.keys(first.surfaces)) {
      expect(second.surfaces[surface]).toEqual(first.surfaces[surface]);
    }
    expect(second.surfaceCount).toBe(first.surfaceCount + 2);
    expect(Object.keys(second.surfaces)).toContain('झाडं');
  });

  it('keeps the first occurrence: re-teaching a word never steals its pointer', () => {
    const { outRoot } = build(scaffold(M1_THEN_M2), STRICT);
    const second = readIndex(outRoot, 'hi-mr', 'L1-M2');

    // The clone teaches all of M1's words a second time; every one still points at M1 …
    const owners = new Set(Object.values(second.surfaces).map((entry) => entry.moduleId));
    expect([...owners].sort()).toEqual(['L1-M1', 'L1-M2']);
    expect(second.surfaces['आहे']?.moduleId).toBe('L1-M1');
    // … and inside a module the earliest sentence that teaches a surface owns it.
    expect(second.surfaces['आहे']).toEqual({
      moduleId: 'L1-M1',
      sentenceId: 'L1-M1-S01',
      wordIdx: 3,
    });
    // … while the one genuinely new surface points at the module that introduced it.
    expect(second.surfaces['झाड']?.moduleId).toBe('L1-M2');
  });

  it('points at the defining word entry, forms included', () => {
    const { outRoot } = build(scaffold(M1_THEN_M2), STRICT);
    const index = readIndex(outRoot, 'hi-mr', 'L1-M1');
    const entry = index.surfaces['आहेस'];
    if (entry === undefined) throw new Error('आहेस is a taught form of आहे');
    const word = authored('hi-mr', 'L1-M1').sentences.find((s) => s.id === entry.sentenceId)
      ?.deconstruction.words[entry.wordIdx];

    // आहेस is never a `display` — it is reachable only through आहे's paradigm.
    expect(word?.display).toBe('आहे');
    expect(word?.forms).toContain('आहेस');
  });

  it('indexes what is TAUGHT — never a variation, never a mistake', () => {
    const modules = [
      { id: 'L1-M1', module: authored('hi-mr', 'L1-M1') },
      { id: 'L1-M2', module: authored('hi-mr', 'L1-M2') },
    ];
    const index = buildWordIndex('hi-mr', modules)[1];
    if (index === undefined) throw new Error('expected an index per module');

    // नमस्ते and हाँ are the Hindi intrusions M2's mistake lines warn against (PR #124);
    // प्रिया is a proper noun that only ever appears in a variation (the known gap on #61).
    for (const surface of ['नमस्ते', 'हाँ', 'प्रिया']) {
      expect(Object.keys(index.surfaces)).not.toContain(surface);
    }
    expect(JSON.stringify(modules[0]?.module.sentences[0]?.variations)).toContain('प्रिया');
  });

  it('is deterministic: surfaces are code-point sorted', () => {
    const { outRoot } = build(scaffold(M1_THEN_M2), STRICT);
    const keys = Object.keys(readIndex(outRoot, 'hi-mr', 'L1-M2').surfaces);

    expect(keys).toEqual([...keys].sort((a, b) => (a < b ? -1 : a > b ? 1 : 0)));
  });

  it('notes the surface count per module in the build output', () => {
    const { report } = build(scaffold(M1_THEN_M2), STRICT);

    expect(report.lines).toContain('  index L1-M1: 26 surfaces');
    expect(report.lines).toContain('  index L1-M2: 28 surfaces');
  });
});

describe('the romanized edge cases (#116, [Q3])', () => {
  /** A clone-edit that appends one word row to the module's first sentence. */
  function teachesWord(display: string): (module: Module) => void {
    return (module) => {
      module.sentences[0]?.deconstruction.words.push({
        display,
        cue: 'नया',
        tag: 'free',
        forms: [],
      });
    };
  }

  /** A whole authored course, in ladder order — the real content, not a trimmed stand-in. */
  function authoredCourse(courseId: string): { id: string; module: Module }[] {
    const dir = path.join(DEFAULT_CONTENT_ROOT, courseId, 'modules');
    return readdirSync(dir)
      .filter((file) => file.endsWith('.json'))
      .map((file) => file.replace('.json', ''))
      .sort((a, b) => {
        const rung = (id: string): number => Number(/M(\d+)/.exec(id)?.[1] ?? 0);
        return rung(a) - rung(b);
      })
      .map((id) => ({ id, module: authored(courseId, id) }));
  }

  function lastIndex(courseId: string): WordIndexFile {
    const indexes = buildWordIndex(courseId, authoredCourse(courseId));
    const last = indexes[indexes.length - 1];
    if (last === undefined) throw new Error(`${courseId} built no index`);
    return last;
  }

  it('emits case-folded keys, so a mid-sentence `soy` finds the row taught as `Soy`', () => {
    const index = lastIndex('en-es');

    expect(index.surfaces['soy']).toBeDefined();
    expect(index.surfaces['Soy']).toBeUndefined();
    for (const key of Object.keys(index.surfaces)) {
      expect(key).toBe(key.toLowerCase());
    }
  });

  it("emits apostrophe-folded keys: `māʾ` is stored as `mā'`, the key any variant resolves to", () => {
    const index = lastIndex('en-ar');

    expect(index.surfaces["mā'"]).toBeDefined();
    expect(index.surfaces['māʾ']).toBeUndefined();
  });

  it('indexes a hyphenated surface under its parts too, all pointing at the same entry', () => {
    const index = lastIndex('en-ar');

    expect(index.surfaces['al-hind']).toBeDefined();
    expect(index.surfaces['hind']).toEqual(index.surfaces['al-hind']);
    // `al` names the row where the learner first met an al- word — S02's al-Hind.
    expect(index.surfaces['al']).toEqual(index.surfaces['al-hind']);
    expect(index.surfaces['qahwa']).toEqual(index.surfaces['al-qahwa']);
  });

  it('never lets a hyphen part steal a key an earlier surface already owns', () => {
    const { outRoot } = build(
      scaffold([
        {
          row: courseRow('hi-mr'),
          modules: [
            { id: 'L1-M1', verified: true, edit: teachesWord('kot') },
            { id: 'L1-M2', verified: true, edit: teachesWord('rain-kot') },
          ],
        },
      ]),
      STRICT,
    );
    const index = readIndex(outRoot, 'hi-mr', 'L1-M2');

    // M2's rain-kot earns `rain-kot` and `rain`; `kot` still belongs to the module that taught it.
    expect(index.surfaces['rain-kot']?.moduleId).toBe('L1-M2');
    expect(index.surfaces['rain']?.moduleId).toBe('L1-M2');
    expect(index.surfaces['kot']?.moduleId).toBe('L1-M1');
  });

  it('resolves every sentence and pool token of all three authored courses — the [Q3] sweep', () => {
    // The "why" path is sentence displays; the exit ritual reads the pool. Variations are outside
    // the sweep by design: they legitimately carry untaught tokens (proper nouns like Priya, and
    // variation-only forms — the documented gap on #61) and the panel drops what cannot resolve.
    for (const courseId of ['en-ar', 'en-es', 'hi-mr']) {
      const modules = authoredCourse(courseId);
      const index = lastIndex(courseId);
      const lookup = {
        maxSpan: index.maxSpan,
        has: (surface: string) => Object.hasOwn(index.surfaces, surface),
      };
      const misses: string[] = [];
      const sweep = (display: string, at: string): void => {
        for (const match of matchSurfaces(tokenizeSurface(display), lookup)) {
          if (!match.resolved) misses.push(`${courseId}/${at}: "${match.surface}"`);
        }
      };
      for (const { id, module } of modules) {
        for (const sentence of module.sentences) sweep(sentence.display, `${id}/${sentence.id}`);
        for (const item of module.comprehensionPool) sweep(item.display, `${id}/${item.id}`);
      }

      expect(misses).toEqual([]);
    }
  });
});

describe('the comprehension-pool rule', () => {
  it('fails the build, naming the course, the module, the item and the token', () => {
    const tree = scaffold([
      {
        row: courseRow('hi-mr'),
        modules: [
          {
            id: 'L1-M1',
            verified: true,
            edit: (module) => {
              const item = module.comprehensionPool[0];
              if (item !== undefined) item.display = 'मी नमस्ते आहे';
            },
          },
        ],
      },
    ]);

    const { report, outRoot } = build(tree, STRICT);

    expect(report.exitCode).toBe(1);
    expect(report.lines).toContain(
      '  hi-mr/L1-M1.json: /comprehensionPool/0/display: "नमस्ते" (item L1-M1-C01) is not taught ' +
        'by L1-M1 — every comprehension token must resolve in the cumulative word index (PRD §6.3)',
    );
    expect(existsSync(outRoot)).toBe(false);
  });

  it('resolves against everything taught so far, not just this module', () => {
    const first = authored('hi-mr', 'L1-M1');
    const second = authored('hi-mr', 'L1-M2');
    const [, cumulative] = buildWordIndex('hi-mr', [
      { id: 'L1-M1', module: first },
      { id: 'L1-M2', module: second },
    ]);
    const [moduleLocal] = buildWordIndex('hi-mr', [{ id: 'L1-M2', module: second }]);
    if (cumulative === undefined || moduleLocal === undefined) throw new Error('no index');

    // M2 deliberately does not re-teach M1's words (PR #119), so a module-local index would
    // reject its own pool — the failure this test exists to keep failing.
    expect(checkComprehensionPool(second, cumulative)).toEqual([]);
    expect(checkComprehensionPool(second, moduleLocal).length).toBeGreaterThan(0);
    expect(checkComprehensionPool(second, moduleLocal)[0]?.message).toContain('is not taught by');
  });

  it('strips edge punctuation before matching, so `?` and `,` resolve', () => {
    const first = authored('hi-mr', 'L1-M1');
    const second = authored('hi-mr', 'L1-M2');
    const [, index] = buildWordIndex('hi-mr', [
      { id: 'L1-M1', module: first },
      { id: 'L1-M2', module: second },
    ]);
    if (index === undefined) throw new Error('no index');
    const punctuated = second.comprehensionPool.filter((item) => /[?,]/.test(item.display));

    expect(punctuated.map((item) => item.id)).toContain('L1-M2-C01'); // नमस्कार, तुम्ही कसे आहात?
    expect(Object.keys(index.surfaces)).not.toContain('आहात?'); // the key is the bare word …
    expect(Object.keys(index.surfaces)).toContain('आहात');
    expect(checkComprehensionPool(second, index)).toEqual([]); // … and the token still resolves
  });

  it('says nothing about variations or mistakes — they are wrong L2 by design', () => {
    const second = authored('hi-mr', 'L1-M2');
    const [, index] = buildWordIndex('hi-mr', [
      { id: 'L1-M1', module: authored('hi-mr', 'L1-M1') },
      { id: 'L1-M2', module: second },
    ]);
    if (index === undefined) throw new Error('no index');
    const mistakes = second.sentences.map((sentence) => sentence.mistake?.display ?? '').join(' ');

    expect(mistakes).toContain('नमस्ते'); // the Hindi intrusion the callout warns against
    expect(Object.keys(index.surfaces)).not.toContain('नमस्ते'); // never indexed …
    expect(checkComprehensionPool(second, index)).toEqual([]); // … and never a build failure
  });
});

/**
 * #116 will fold case and the apostrophe class. The only way that lands safely is if there is
 * exactly ONE normalisation to change — so this suite guards the seam, not the behaviour.
 */
describe('the shared normaliser', () => {
  const SOURCE_ROOTS = ['src', 'tools'];
  const OWNER = path.join('src', 'engine', 'surface.ts');

  function sourceFiles(): string[] {
    const files: string[] = [];
    for (const root of SOURCE_ROOTS) {
      for (const entry of readdirSync(path.join(REPO_ROOT, root), {
        recursive: true,
        withFileTypes: true,
      })) {
        if (!entry.isFile() || !entry.name.endsWith('.ts')) continue;
        files.push(path.relative(REPO_ROOT, path.join(entry.parentPath, entry.name)));
      }
    }
    return files;
  }

  it('is what the emitter imports — no local copy of the rule', () => {
    const emitter = readFileSync(path.join(REPO_ROOT, 'tools', 'content-build.ts'), 'utf8');

    expect(emitter).toContain("from '../src/engine/surface.ts'");
  });

  it('is the only place NFC and edge punctuation are decided', () => {
    const owners = sourceFiles().filter((file) => {
      if (file.endsWith('.test.ts')) return false;
      const source = readFileSync(path.join(REPO_ROOT, file), 'utf8');
      return source.includes("normalize('NFC')") || source.includes('\\p{P}');
    });

    expect(owners).toEqual([OWNER]);
  });
});

/**
 * The repo's own content, built both ways. This is the test that would catch a fixture course
 * leaking into a strict build, or a module shipping without a named reviewer.
 *
 * hi-mr, en-es and en-ar all ship, and since #267 the repo carries a fixture course again: hi-en,
 * Hindi → English, a manifest row with `fixture: true`, a ladder and a strings bundle, and no
 * `modules/` folder at all until #270 authors the first one. So the two builds differ in the
 * banner, the `devBuild` key, and ONE report line — strict drops hi-en as a fixture course, dev
 * admits it and finds nothing authored — and in neither build does hi-en reach the emitted
 * manifest, which lists only courses that shipped ≥ 1 module. The synthetic roots above build
 * fixture rows and unverified modules and watch them be dropped; what *this* block asserts is
 * that the repo's real content needs no relaxation to reach a learner, and that the fourth course
 * cannot.
 */
describe('the authored content', () => {
  it('ships hi-mr, en-es and en-ar L1-M1..M10 on a strict build', () => {
    const { report, outRoot } = build(DEFAULT_CONTENT_ROOT, STRICT);
    const L1 = [
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
    ];

    expect(report.exitCode).toBe(0);
    expect([...report.shipped]).toEqual([
      ['hi-mr', L1],
      ['en-es', L1],
      ['en-ar', L1],
    ]);
    expect(readManifest(outRoot).courses.map((course) => course.id)).toEqual([
      'hi-mr',
      'en-es',
      'en-ar',
    ]);
    // No EMITTED row carries `fixture` — hi-en's authored row does (#267) and is exactly what the
    // gate dropped — and the envelope carries no dev key.
    expect(readManifest(outRoot).courses.some((course) => 'fixture' in course)).toBe(false);
    expect(readManifest(outRoot).devBuild).toBeUndefined();
    expect(report.lines).toEqual([
      'hi-mr: 10 modules (L1-M1..M10)',
      ...Array.from({ length: 10 }, (_, i) => expect.stringContaining(`index L1-M${i + 1}: `)),
      'en-es: 10 modules (L1-M1..M10)',
      ...Array.from({ length: 10 }, (_, i) => expect.stringContaining(`index L1-M${i + 1}: `)),
      'en-ar: 10 modules (L1-M1..M10)',
      ...Array.from({ length: 10 }, (_, i) => expect.stringContaining(`index L1-M${i + 1}: `)),
      'hi-en: 0 modules — fixture course, excluded by the gate (--with-fixtures ships it in dev)',
      'CONTENT build: hi-mr 10 modules (L1-M1..M10), en-es 10 modules (L1-M1..M10), en-ar 10 modules (L1-M1..M10) | skipped: hi-en (fixture course)',
    ]);
    // The gate, on the real tree: the fixture course's folder is not even created.
    expect(existsSync(path.join(outRoot, 'hi-en'))).toBe(false);
  });

  /**
   * The thirty shipping modules — hi-mr's ten (#110, #111), en-es's ten (#192–#195) and en-ar's
   * ten (#199–#202) — ship on an LLM review the owner authorised, not on the native gate, which is
   * open for all three languages. What the gate enforces is the signature: a module that reaches a
   * learner names who cleared it and when (tools/validate.ts), so the record can never quietly
   * claim a check nobody ran.
   */
  it('names a reviewer and a date on every module it ships strictly', () => {
    const { outRoot } = build(DEFAULT_CONTENT_ROOT, STRICT);

    for (const courseId of ['hi-mr', 'en-es', 'en-ar']) {
      for (let i = 1; i <= 10; i += 1) {
        const module = JSON.parse(
          readFileSync(path.join(outRoot, courseId, 'modules', `L1-M${i}.json`), 'utf8'),
        ) as { verified: boolean; verifiedBy: string; verifiedAt: string };

        expect(module.verified, `${courseId}/L1-M${i}`).toBe(true);
        expect(module.verifiedBy, `${courseId}/L1-M${i}`).toMatch(/\S/);
        expect(module.verifiedAt, `${courseId}/L1-M${i}`).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    }
  });

  it('ships hi-mr, en-es and en-ar L1-M1..M10 and hi-en L1-M1..M5 on a dev build', () => {
    const { report, outRoot } = build(DEFAULT_CONTENT_ROOT, DEV);

    expect(report.exitCode).toBe(0);
    expect([...report.shipped]).toEqual([
      [
        'hi-mr',
        ['L1-M1', 'L1-M2', 'L1-M3', 'L1-M4', 'L1-M5', 'L1-M6', 'L1-M7', 'L1-M8', 'L1-M9', 'L1-M10'],
      ],
      [
        'en-es',
        ['L1-M1', 'L1-M2', 'L1-M3', 'L1-M4', 'L1-M5', 'L1-M6', 'L1-M7', 'L1-M8', 'L1-M9', 'L1-M10'],
      ],
      [
        'en-ar',
        ['L1-M1', 'L1-M2', 'L1-M3', 'L1-M4', 'L1-M5', 'L1-M6', 'L1-M7', 'L1-M8', 'L1-M9', 'L1-M10'],
      ],
      ['hi-en', ['L1-M1', 'L1-M2', 'L1-M3', 'L1-M4', 'L1-M5']],
    ]);
    // hi-en (#267): `--with-fixtures` admits the fixture course, and since #270 / #271 it has
    // rungs to ship — the first five of the L1 ladder, each verified on the owner-authorised LLM
    // review.
    expect(report.lines).toContain('hi-en: 5 modules (L1-M1..M5)');
    expect(report.lines).toContain(
      'CONTENT build: hi-mr 10 modules (L1-M1..M10), en-es 10 modules (L1-M1..M10), en-ar 10 modules (L1-M1..M10), hi-en 5 modules (L1-M1..M5)',
    );
    expect(readManifest(outRoot).devBuild).toBe(true);
    // The manifest lists what shipped: all four courses — hi-en's row still carries `fixture`,
    // which is what the strict build above drops it for.
    expect(readManifest(outRoot).courses.map((course) => course.id)).toEqual([
      'hi-mr',
      'en-es',
      'en-ar',
      'hi-en',
    ]);
    expect(readManifest(outRoot).courses.at(-1)).toMatchObject({ id: 'hi-en', fixture: true });
    for (const file of [
      'hi-mr/levels.json',
      'hi-mr/strings.json',
      'hi-mr/modules/L1-M1.json',
      'hi-mr/modules/L1-M2.json',
      'hi-mr/modules/L1-M3.json',
      'hi-mr/modules/L1-M4.json',
      'hi-mr/modules/L1-M5.json',
      'hi-mr/modules/L1-M6.json',
      'hi-mr/modules/L1-M7.json',
      'hi-mr/modules/L1-M8.json',
      'hi-mr/modules/L1-M9.json',
      'hi-mr/modules/L1-M10.json',
      'en-es/modules/L1-M1.json',
      'en-es/modules/L1-M2.json',
      'en-es/modules/L1-M3.json',
      'en-es/modules/L1-M4.json',
      'en-es/modules/L1-M5.json',
      'en-es/modules/L1-M6.json',
      'en-es/modules/L1-M7.json',
      'en-es/modules/L1-M8.json',
      'en-es/modules/L1-M9.json',
      'en-es/modules/L1-M10.json',
      'en-ar/modules/L1-M1.json',
      'en-ar/modules/L1-M2.json',
      'en-ar/modules/L1-M3.json',
      'en-ar/modules/L1-M4.json',
      'en-ar/modules/L1-M5.json',
      'en-ar/modules/L1-M6.json',
      'en-ar/modules/L1-M7.json',
      'en-ar/modules/L1-M8.json',
      'en-ar/modules/L1-M9.json',
      'en-ar/modules/L1-M10.json',
      'hi-en/levels.json',
      'hi-en/strings.json',
      'hi-en/modules/L1-M1.json',
      'hi-en/modules/L1-M2.json',
      'hi-en/modules/L1-M3.json',
      'hi-en/modules/L1-M4.json',
      'hi-en/modules/L1-M5.json',
      'hi-en/index/L1-M1.json',
      'hi-en/index/L1-M2.json',
      'hi-en/index/L1-M3.json',
      'hi-en/index/L1-M4.json',
      'hi-en/index/L1-M5.json',
    ]) {
      expect(existsSync(path.join(outRoot, ...file.split('/')))).toBe(true);
    }
  });

  /**
   * hi-en's index seams (#270, `tools/course-briefs.ts` "hi-en: the four decisions"): the build
   * only proves that every pool token RESOLVES (PRD §6.3); this pins that each one resolves to
   * the row the briefs assigned, which is what the Why panel actually answers with. hi-mr shipped
   * four rows whose `forms` had swallowed a different word (docs/07-llm-review-L1-M6-M10.md), so
   * the landings are asserted by row, not by existence.
   */
  it('lands hi-en on the rows the briefs assigned — one be row, contractions whole, formulas whole', () => {
    const { outRoot } = build(DEFAULT_CONTENT_ROOT, DEV);
    const index = readIndex(outRoot, 'hi-en', 'L1-M2');
    const be = { moduleId: 'L1-M1', sentenceId: 'L1-M1-S01', wordIdx: 2 };
    const article = { moduleId: 'L1-M1', sentenceId: 'L1-M1-S04', wordIdx: 0 };
    const im = { moduleId: 'L1-M2', sentenceId: 'L1-M2-S04', wordIdx: 0 };

    expect(index.cumulativeThrough).toEqual(['L1-M1', 'L1-M2']);
    // `I'm` is ONE token (the inner apostrophe survives normalisation) and its row lists both
    // shapes, so `I am` — a two-token key — opens the same note; `Good morning` and `thank you`
    // are two-token surfaces, hence the span.
    expect(index.maxSpan).toBe(2);
    // M1's `is` opened the course's one `be` row; `am` / `are` are its forms, never new rows.
    expect(index.surfaces['is']).toEqual(be);
    expect(index.surfaces['am']).toEqual(be);
    expect(index.surfaces['are']).toEqual(be);
    // `a` · `an`: one row, both shapes.
    expect(index.surfaces['a']).toEqual(article);
    expect(index.surfaces['an']).toEqual(article);
    // The contraction is its own row (M2), and the full form resolves to it too.
    expect(index.surfaces["i'm"]).toEqual(im);
    expect(index.surfaces['i am']).toEqual(im);
    // Multi-token formulas claim no bare part: `you` stays the pronoun row, `good` and `morning`
    // are unclaimed (M4's `in the morning` needs `morning` free), `thank` is nothing on its own.
    expect(index.surfaces['good morning']).toMatchObject({ sentenceId: 'L1-M2-S02', wordIdx: 0 });
    expect(index.surfaces['thank you']).toMatchObject({ sentenceId: 'L1-M2-S04', wordIdx: 2 });
    expect(index.surfaces['you']).toMatchObject({ sentenceId: 'L1-M2-S03', wordIdx: 1 });
    for (const unclaimed of ['good', 'morning', 'thank']) {
      expect(index.surfaces[unclaimed], `${unclaimed} must stay unclaimed`).toBeUndefined();
    }
    // `No` (the answer) and `not` (the negator) are two rows; `not` is M2's so M3's `don't` need
    // not re-teach it.
    expect(index.surfaces['no']).toMatchObject({ sentenceId: 'L1-M2-S09', wordIdx: 0 });
    expect(index.surfaces['not']).toMatchObject({ sentenceId: 'L1-M2-S09', wordIdx: 1 });
    // Keys the briefs reserve for later modules are still free after M2.
    for (const reserved of ['to', 'do', 'the', 'likes', 'does', "don't", 'he', 'she', 'it']) {
      expect(index.surfaces[reserved], `${reserved} is a later module's`).toBeUndefined();
    }
    expect(Object.keys(index.surfaces)).toHaveLength(index.surfaceCount);
  });

  /**
   * The same audit over the next three rungs (#271): M3 opened `to` / `do` / `the` / `don't`, M4
   * `he` / `she` / `have` / `in` / `on` / `at` / `does` / `doesn't` and the two-token `get up` /
   * `wake up`, M5 `did` / `didn't` and the irregular pasts — and M5 EXTENDED M1's one `be` row with
   * `was · were` in M1's own file instead of opening a second row the index could never reach for
   * `is`. Every later module inherits these keys, so the landings are pinned by row, not by
   * existence (docs/12-llm-review-hi-en-L1-M3-M5.md has the full token-by-token tables).
   */
  it('lands hi-en M3–M5 on the rows the briefs assigned — be extended in M1, helpers and pasts their own rows', () => {
    const { outRoot } = build(DEFAULT_CONTENT_ROOT, DEV);
    const index = readIndex(outRoot, 'hi-en', 'L1-M5');
    const row = (moduleId: string, sentence: number, wordIdx: number) => ({
      moduleId,
      sentenceId: `${moduleId}-S${String(sentence).padStart(2, '0')}`,
      wordIdx,
    });
    const be = row('L1-M1', 1, 2);

    expect(index.cumulativeThrough).toEqual(['L1-M1', 'L1-M2', 'L1-M3', 'L1-M4', 'L1-M5']);
    expect(index.maxSpan).toBe(2);
    // ONE be row, now five shapes: M5's `was` / `were` open M1's note, never a second row.
    for (const shape of ['am', 'is', 'are', 'was', 'were']) {
      expect(index.surfaces[shape], shape).toEqual(be);
    }
    // M3: `to` bare (M4's `go to school` and M7's `to the shop` inherit it), `do` the helper AND
    // करना, `the` the article, `don't` one surface listing both shapes — and `doesn't` NOT on it.
    expect(index.surfaces['to']).toEqual(row('L1-M3', 3, 0));
    expect(index.surfaces['do']).toEqual(row('L1-M3', 8, 0));
    expect(index.surfaces['the']).toEqual(row('L1-M3', 7, 0));
    expect(index.surfaces["don't"]).toEqual(row('L1-M3', 5, 0));
    expect(index.surfaces['do not']).toEqual(row('L1-M3', 5, 0));
    expect(index.surfaces['want']).toEqual(row('L1-M3', 1, 0));
    expect(index.surfaces['need']).toEqual(row('L1-M3', 6, 0));
    // `book` still lands on M1's `books` row (forms `book · books`): M3 opened no second row.
    expect(index.surfaces['book']).toEqual(row('L1-M1', 9, 0));
    // M4: the pronouns, possession-only `have` (with `has`), the three time/place words, the
    // two-token verbs (bare `up` / `get` / `wake` unclaimed), `does` / `doesn't` their own rows.
    expect(index.surfaces['he']).toEqual(row('L1-M4', 3, 0));
    expect(index.surfaces['she']).toEqual(row('L1-M4', 6, 0));
    expect(index.surfaces['have']).toEqual(row('L1-M4', 10, 0));
    expect(index.surfaces['has']).toEqual(row('L1-M4', 10, 0));
    expect(index.surfaces['at']).toEqual(row('L1-M4', 2, 1));
    expect(index.surfaces['in']).toEqual(row('L1-M4', 4, 2));
    expect(index.surfaces['on']).toEqual(row('L1-M4', 6, 2));
    expect(index.surfaces['get up']).toEqual(row('L1-M4', 2, 0));
    expect(index.surfaces['gets up']).toEqual(row('L1-M4', 2, 0));
    expect(index.surfaces['wake up']).toEqual(row('L1-M4', 1, 1));
    expect(index.surfaces['does']).toEqual(row('L1-M4', 8, 0));
    expect(index.surfaces["doesn't"]).toEqual(row('L1-M4', 9, 0));
    expect(index.surfaces['does not']).toEqual(row('L1-M4', 9, 0));
    expect(index.surfaces['go']).toEqual(row('L1-M4', 3, 1));
    expect(index.surfaces['goes']).toEqual(row('L1-M4', 3, 1));
    // `morning` was free for M4 because M2 kept `good morning` whole.
    expect(index.surfaces['morning']).toEqual(row('L1-M4', 4, 3));
    // M5: `did` / `didn't` their own rows, every past form a NEW surface (M4's rows list present
    // forms only), `got up` a fresh two-token surface beside M4's `get up`, `saw` on the `see` row.
    expect(index.surfaces['did']).toEqual(row('L1-M5', 7, 0));
    expect(index.surfaces["didn't"]).toEqual(row('L1-M5', 6, 0));
    expect(index.surfaces['did not']).toEqual(row('L1-M5', 6, 0));
    expect(index.surfaces['went']).toEqual(row('L1-M5', 2, 0));
    expect(index.surfaces['ate']).toEqual(row('L1-M5', 3, 0));
    expect(index.surfaces['drank']).toEqual(row('L1-M5', 4, 0));
    expect(index.surfaces['worked']).toEqual(row('L1-M5', 5, 0));
    expect(index.surfaces['got up']).toEqual(row('L1-M5', 1, 1));
    expect(index.surfaces['see']).toEqual(row('L1-M5', 8, 0));
    expect(index.surfaces['saw']).toEqual(row('L1-M5', 8, 0));
    expect(index.surfaces['yesterday']).toEqual(row('L1-M5', 1, 0));
    expect(index.surfaces['we']).toEqual(row('L1-M5', 10, 0));
    expect(index.surfaces['home']).toEqual(row('L1-M5', 5, 1));
    // Multi-token surfaces claim no bare part, and the briefs' later keys are still free.
    for (const unclaimed of ['up', 'get', 'wake', 'got', 'good', 'thank']) {
      expect(index.surfaces[unclaimed], `${unclaimed} must stay unclaimed`).toBeUndefined();
    }
    for (const reserved of [
      'it',
      "it's",
      'will',
      "i'll",
      'going to',
      'tomorrow',
      'her',
      'there is',
      'there are',
      'where',
      'under',
      'near',
      'next to',
      'how much',
      'how many',
      'please',
      'of',
      'because',
      'so',
      'that',
      'very',
      'and',
      'but',
      'also',
      'then',
      'likes',
      'one',
    ]) {
      expect(index.surfaces[reserved], `${reserved} is a later module's`).toBeUndefined();
    }
    expect(Object.keys(index.surfaces)).toHaveLength(index.surfaceCount);
  });

  it('indexes hi-mr cumulatively — L1-M2 is L1-M1 plus what M2 teaches', () => {
    const { report, outRoot } = build(DEFAULT_CONTENT_ROOT, DEV);
    const first = readIndex(outRoot, 'hi-mr', 'L1-M1');
    const second = readIndex(outRoot, 'hi-mr', 'L1-M2');

    expect(first.surfaceCount).toBe(26);
    expect(second.surfaceCount).toBe(47);
    expect(Object.keys(first.surfaces).every((s) => Object.hasOwn(second.surfaces, s))).toBe(true);
    expect(report.lines).toContain('  index L1-M1: 26 surfaces');
    expect(report.lines).toContain('  index L1-M2: 47 surfaces');
  });

  it('indexes the romanized course in Latin script — the Arabic line is never a key [D20]', () => {
    const { outRoot } = build(DEFAULT_CONTENT_ROOT, DEV);
    const index = readIndex(outRoot, 'en-ar', 'L1-M1');
    // Arabic block + supplement + presentation forms, as escapes: the range ends on U+FEFF.
    const arabic = /[\u0600-\u06FF\u0750-\u077F\uFB50-\uFDFF\uFE70-\uFEFF]/;
    const module = readFileSync(path.join(outRoot, 'en-ar', 'modules', 'L1-M1.json'), 'utf8');

    expect(Object.keys(index.surfaces)).toContain('ismī');
    expect(Object.keys(index.surfaces)).toContain('al-qahwa');
    expect(Object.keys(index.surfaces).filter((surface) => arabic.test(surface))).toEqual([]);
    expect(arabic.test(module)).toBe(true); // the script lines are there — they are just not index keys
  });

  it('handles a multi-token surface: en-es indexes `Me llamo` as one surface', () => {
    const { outRoot } = build(DEFAULT_CONTENT_ROOT, DEV);
    const index = readIndex(outRoot, 'en-es', 'L1-M1');

    expect(index.maxSpan).toBe(2);
    expect(index.surfaces['se llama']).toEqual({
      moduleId: 'L1-M1',
      sentenceId: 'L1-M1-S01',
      wordIdx: 0,
    });
  });

  it('never claims content for a module nobody has authored', () => {
    const { outRoot } = build(DEFAULT_CONTENT_ROOT, DEV);
    const levels = JSON.parse(
      readFileSync(path.join(outRoot, 'hi-mr', 'levels.json'), 'utf8'),
    ) as Levels;
    const withContent = levels.levels.flatMap((level) =>
      level.modules.filter((entry) => entry.hasContent === true).map((entry) => entry.id),
    );

    expect(withContent).toEqual([
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
    ]);
  });
});
