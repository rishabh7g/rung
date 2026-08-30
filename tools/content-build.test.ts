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
    expect(courses.map((course) => course.id)).toEqual([
      'hi-mr',
      'en-es',
      'en-ar',
      'hi-en',
      'en-it',
    ]);
    expect(courses[2]?.romanizationNote).toMatch(/^ALA-LC/);
    // hi-en graduated in #273, as en-es (#195) and en-ar (#202) did before it. en-it (#332) is
    // the course being authored behind the gate right now, so it is the one row that still
    // carries `fixture` — #337 deletes it.
    expect(courses.filter((course) => 'fixture' in course).map((course) => course.id)).toEqual([
      'en-it',
    ]);
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

  it('resolves every sentence and pool token of all four authored courses — the [Q3] sweep', () => {
    // The "why" path is sentence displays; the exit ritual reads the pool. Variations are outside
    // the sweep by design: they legitimately carry untaught tokens (proper nouns like Priya, and
    // variation-only forms — the documented gap on #61) and the panel drops what cannot resolve.
    for (const courseId of ['en-ar', 'en-es', 'hi-en', 'hi-mr']) {
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

  /**
   * #289's contract — the en-es comprehension pools serve FRESH sentences. 26 of the 80 pool
   * items used to be byte-identical (case-insensitively) to a hero sentence of their own module,
   * so the exit test's comprehension half re-served what the learner had just produced — recall
   * of the lesson, not comprehension. The rebuild replaced every duplicate with a recombination
   * of taught surfaces and grew each pool from 8 to 12 (at comprehendCount 2, pool size is retry
   * freshness — `src/engine/comprehension.ts`). This pins both halves so a later edit can neither
   * hand a hero back to the pool nor shrink the retry budget;
   * `docs/22-llm-review-en-es-comprehension.md` is the item-by-item review.
   */
  it('keeps every en-es pool item fresh — 12 per module, none equal to any hero sentence (#289)', () => {
    const modules = authoredCourse('en-es');
    const heroes = new Set(
      modules.flatMap(({ module }) =>
        module.sentences.map((sentence) => sentence.display.toLowerCase()),
      ),
    );

    for (const { id, module } of modules) {
      expect(module.comprehensionPool.length, `${id} pool size`).toBeGreaterThanOrEqual(12);
      for (const item of module.comprehensionPool) {
        expect(heroes.has(item.display.toLowerCase()), `${item.id} re-serves a hero sentence`).toBe(
          false,
        );
      }
    }
  });

  /**
   * #281's seam — the surfaces en-es SHOWS in its variation lines, swept against the index of the
   * module that shows them (not the last one), because a variation a learner reads in M1 has only
   * M1's cumulative index behind it.
   *
   * Variations are outside the [Q3] sweep above by design, and they stay outside the build's own
   * rules: a variation may legitimately carry an untaught token. What this pins is that the list of
   * such tokens is a *decided* list rather than a drifting one. Every entry below is one of three
   * things, and `docs/14-llm-review-en-es-surfaces.md` says which is which per line:
   *
   *   - a proper noun (`ana`, `méxico`) — never a word row in any course (#61);
   *   - a forward reference to a later module's own row (`es` → M2, `quieres` → M3, `muy` → M8,
   *     `casa` → M7) — the learner meets it on schedule;
   *   - a recorded exemption (`profesor`, `buenas`/`tardes`, `hermano`) — a surface that would only
   *     resolve by landing on a row headed by a DIFFERENT word, which is the forms-hit bug the
   *     reviews have caught four times.
   *
   * A new variation that resolves nowhere fails here, so #285's third-variation pass has to decide
   * about it rather than discover it later.
   */
  it('sweeps every en-es variation line down to ten decided misses (#281)', () => {
    const modules = authoredCourse('en-es');
    const indexes = buildWordIndex('en-es', modules);
    const misses: string[] = [];

    modules.forEach(({ id, module }, at) => {
      const index = indexes[at];
      if (index === undefined) throw new Error(`${id} built no index`);
      const lookup = {
        maxSpan: index.maxSpan,
        has: (surface: string) => Object.hasOwn(index.surfaces, surface),
      };
      for (const sentence of module.sentences) {
        for (const variation of sentence.variations ?? []) {
          for (const match of matchSurfaces(tokenizeSurface(variation.display), lookup)) {
            if (!match.resolved) misses.push(`${id}/${sentence.id}: "${match.surface}"`);
          }
        }
      }
    });

    expect(misses).toEqual([
      'L1-M1/L1-M1-S01: "ana"',
      'L1-M1/L1-M1-S02: "méxico"',
      'L1-M1/L1-M1-S02: "es"',
      'L1-M1/L1-M1-S03: "profesor"',
      'L1-M1/L1-M1-S08: "quieres"',
      'L1-M2/L1-M2-S02: "buenas"',
      'L1-M2/L1-M2-S02: "tardes"',
      'L1-M2/L1-M2-S04: "muy"',
      'L1-M4/L1-M4-S05: "hermano"',
      'L1-M4/L1-M4-S06: "casa"',
    ]);
  });

  /**
   * The other half of #281: the additions-only invariant, stated as a test rather than as a
   * before/after diff done by hand. Every surface a word row teaches lands on the row that FIRST
   * teaches it, so a paradigm swept into an early module's `forms` can silently move a later
   * module's own row out of the index. These are the en-es seams that pass deliberately close to
   * that edge.
   */
  it('keeps en-es paradigm seams on the row that owns them (#281)', () => {
    const index = lastIndex('en-es');
    const row = (surface: string): string =>
      `${index.surfaces[surface]?.moduleId}/${index.surfaces[surface]?.sentenceId}#${index.surfaces[surface]?.wordIdx}`;

    // querer: M1 keeps `quiere`, M3 keeps its own `quieres` row.
    expect(row('quiere')).toBe('L1-M1/L1-M1-S08#0');
    expect(row('quieres')).toBe('L1-M3/L1-M3-S09#0');
    // hacer: `hizo` rides with `hice`, and `hiciste` stays the row a learner taps in ¿Qué hiciste?
    expect(row('hizo')).toBe('L1-M5/L1-M5-S04#0');
    expect(row('hiciste')).toBe('L1-M5/L1-M5-S05#0');
    // The gustar frame is multi-token, so bare `te`, `gusta` and `gustan` stay unclaimed.
    expect(row('te gusta')).toBe('L1-M1/L1-M1-S04#0');
    expect(row('te gustan')).toBe('L1-M1/L1-M1-S06#0');
    for (const bare of ['te', 'gusta', 'gustan']) {
      expect(Object.hasOwn(index.surfaces, bare)).toBe(false);
    }
    // estar/ser stay sibling rows: the plurals join the third-person row, nothing merges.
    expect(row('están')).toBe('L1-M2/L1-M2-S06#0');
    expect(row('son')).toBe('L1-M2/L1-M2-S09#0');
    expect(row('estoy')).toBe('L1-M2/L1-M2-S04#0');
    expect(row('estás')).toBe('L1-M2/L1-M2-S03#1');
  });

  /**
   * #282's seam — #281's sweep, for hi-mr: every variation line against the index of the module
   * that shows it. Every remaining miss is a *decided* miss, and
   * `docs/15-llm-review-hi-mr-surfaces.md` says which kind per line:
   *
   *   - a proper noun (`प्रिया`) — never a word row in any course (#61);
   *   - a recorded exemption (`पाच`, a sibling number of `दोन`, not a shape of it; `बोललो`, a verb
   *     — बोलणे — L1 never teaches) — each would only resolve by landing on a row headed by a
   *     DIFFERENT word, the forms-hit bug, and neither appears in any sentence display to hang a
   *     row of its own on.
   *
   * A new variation that resolves nowhere fails here, so #286's third-variation pass has to
   * decide about a new surface rather than discover it later.
   */
  it('sweeps every hi-mr variation line down to three decided misses (#282)', () => {
    const modules = authoredCourse('hi-mr');
    const indexes = buildWordIndex('hi-mr', modules);
    const misses: string[] = [];

    modules.forEach(({ id, module }, at) => {
      const index = indexes[at];
      if (index === undefined) throw new Error(`${id} built no index`);
      const lookup = {
        maxSpan: index.maxSpan,
        has: (surface: string) => Object.hasOwn(index.surfaces, surface),
      };
      for (const sentence of module.sentences) {
        for (const variation of sentence.variations ?? []) {
          for (const match of matchSurfaces(tokenizeSurface(variation.display), lookup)) {
            if (!match.resolved) misses.push(`${id}/${sentence.id}: "${match.surface}"`);
          }
        }
      }
    });

    expect(misses).toEqual([
      'L1-M1/L1-M1-S01: "प्रिया"',
      'L1-M8/L1-M8-S07: "पाच"',
      'L1-M9/L1-M9-S04: "बोललो"',
    ]);
  });

  /**
   * The hi-mr paradigm seams (#282) — the additions that pass closest to first-occurrence-wins,
   * pinned to the row that owns each. The load-bearing ones: जाणे's let's-form rides M6-S01's
   * जाणार (the verb's only row), while येणे keeps its two futures as sibling rows — S04's own note
   * rules येईन "a different form, not a shape of येणार", so the -ईन/-ऊ family lives on S07 and
   * येणार stays alone.
   */
  it('keeps hi-mr paradigm seams on the row that owns them (#282)', () => {
    const index = lastIndex('hi-mr');
    const row = (surface: string): string =>
      `${index.surfaces[surface]?.moduleId}/${index.surfaces[surface]?.sentenceId}#${index.surfaces[surface]?.wordIdx}`;

    // झोपणे: the future joins M4's own row; M5's past row is untouched.
    expect(row('झोपणार')).toBe('L1-M4/L1-M4-S06#2');
    expect(row('झोपले')).toBe('L1-M5/L1-M5-S05#0');
    // जाणे: जाऊ rides the M6 first-teach row — M10-S10's re-teach row steals neither key.
    expect(row('जाणार')).toBe('L1-M6/L1-M6-S01#1');
    expect(row('जाऊ')).toBe('L1-M6/L1-M6-S01#1');
    // येणे: the -णार plan and the -ईन promise stay sibling rows; the persons join the promise.
    expect(row('येणार')).toBe('L1-M6/L1-M6-S04#0');
    for (const person of ['येईन', 'येशील', 'येईल', 'येऊ']) {
      expect(row(person)).toBe('L1-M6/L1-M6-S07#1');
    }
    // खाणे: the promise row carries its persons — and खाऊ stays out: as a bare surface it is
    // the everyday noun ("treat"), and inventing that homograph would gloss it "will eat".
    expect(row('खाशील')).toBe('L1-M6/L1-M6-S10#0');
    expect(row('खाईल')).toBe('L1-M6/L1-M6-S10#0');
    expect(Object.hasOwn(index.surfaces, 'खाऊ')).toBe(false);
    // दुकान: the bent दुकानाजवळ joins दुकान's row; घराजवळ keeps its own.
    expect(row('दुकानाजवळ')).toBe('L1-M7/L1-M7-S06#0');
    expect(row('घराजवळ')).toBe('L1-M7/L1-M7-S06#1');
    // The two "we"s share M10's row (the M2 तू/तुम्ही precedent); भेटू keeps its own.
    expect(row('आपण')).toBe('L1-M10/L1-M10-S09#0');
    expect(row('आम्ही')).toBe('L1-M10/L1-M10-S09#0');
    expect(row('भेटू')).toBe('L1-M10/L1-M10-S09#1');
  });

  /**
   * #283's seam — the sweep, for en-ar: every variation line against the index of the module that
   * shows it. Every remaining miss is a *decided* miss, and
   * `docs/16-llm-review-en-ar-surfaces.md` says which kind per line:
   *
   *   - a proper noun (`priyā`, `miṣr`) — never a word row in any course (#61);
   *   - a recorded exemption (`marḥaban`, a sibling greeting of as-salāmu ʿalaykum, not a shape of
   *     it — the en-es `buenas tardes` ruling; and `ṣabāḥ` + `an-nūr`, the greeting reply the
   *     additions-only invariant locks out: any M2 surface containing `an-nūr` would hand its
   *     hyphen part `an` to M2 and steal M3-S03's own key, and bare `ṣabāḥ` belongs to M4's
   *     `fī aṣ-ṣabāḥ` row — a forward reference that resolves from M4 on).
   *
   * A new variation that resolves nowhere fails here, so #287's third-variation pass has to
   * decide about a new surface rather than discover it later.
   */
  it('sweeps every en-ar variation line down to six decided misses (#283)', () => {
    const modules = authoredCourse('en-ar');
    const indexes = buildWordIndex('en-ar', modules);
    const misses: string[] = [];

    modules.forEach(({ id, module }, at) => {
      const index = indexes[at];
      if (index === undefined) throw new Error(`${id} built no index`);
      const lookup = {
        maxSpan: index.maxSpan,
        has: (surface: string) => Object.hasOwn(index.surfaces, surface),
      };
      for (const sentence of module.sentences) {
        for (const variation of sentence.variations ?? []) {
          for (const match of matchSurfaces(tokenizeSurface(variation.display), lookup)) {
            if (!match.resolved) misses.push(`${id}/${sentence.id}: "${match.surface}"`);
          }
        }
      }
    });

    expect(misses).toEqual([
      'L1-M1/L1-M1-S01: "priyā"',
      'L1-M1/L1-M1-S02: "miṣr"',
      'L1-M2/L1-M2-S01: "marḥaban"',
      'L1-M2/L1-M2-S03: "ṣabāḥ"',
      'L1-M2/L1-M2-S03: "an-nūr"',
      'L1-M5/L1-M5-S09: "priyā"',
    ]);
  });

  /**
   * The en-ar paradigm seams (#283) — the feminine -īn cluster and the price/dual/future forms,
   * pinned to the row that owns each. The load-bearing ones: the plain and sa- futures of dhahaba
   * stay sibling rows (tadhhabīn on M4's adhhab, sa-tadhhabīn on M6's sa-adhhab), M3's turīdīn
   * keeps the row that first taught the -īn ending, and the M2 greeting frame takes only the
   * two-token `masāʾ al-khayr` — bare `masā'` and `ṣabāḥ` still belong to M4's time-phrase rows,
   * and `an` to M3's own row, which is why `an-nūr` stays out of the index entirely.
   */
  it('keeps en-ar paradigm seams on the row that owns them (#283)', () => {
    const index = lastIndex('en-ar');
    const row = (surface: string): string =>
      `${index.surfaces[surface]?.moduleId}/${index.surfaces[surface]?.sentenceId}#${index.surfaces[surface]?.wordIdx}`;

    // dhahaba: the feminine joins each future's own row; the two rows stay siblings.
    expect(row('tadhhab')).toBe('L1-M4/L1-M4-S01#0');
    expect(row('tadhhabīn')).toBe('L1-M4/L1-M4-S01#0');
    expect(row('sa-tadhhab')).toBe('L1-M6/L1-M6-S01#0');
    expect(row('sa-tadhhabīn')).toBe('L1-M6/L1-M6-S01#0');
    // The -īn precedent row is untouched: turīdīn is still M3's own row, not a form of turīd.
    expect(row('turīd')).toBe('L1-M3/L1-M3-S04#0');
    expect(row('turīdīn')).toBe('L1-M3/L1-M3-S06#0');
    // The other two feminine cells land on the row that owns each verb.
    expect(row('tuḥibbīn')).toBe('L1-M1/L1-M1-S05#0');
    expect(row('tatakallamīn')).toBe('L1-M10/L1-M10-S07#0');
    // The greeting frame: the two-token twin joins M2's row; the bare pieces stay where the
    // ladder first teaches them, and the reply's `an-` never enters the index.
    expect(row("masā' al-khayr")).toBe('L1-M2/L1-M2-S03#0');
    expect(row("masā'")).toBe('L1-M4/L1-M4-S10#0');
    expect(row('ṣabāḥ')).toBe('L1-M4/L1-M4-S02#0');
    expect(row('an')).toBe('L1-M3/L1-M3-S03#0');
    for (const locked of ['an-nūr', 'nūr', 'ṣabāḥ an-nūr', 'marḥaban']) {
      expect(Object.hasOwn(index.surfaces, locked)).toBe(false);
    }
    // The dual rides the noun's own plural row; singular and possessive keep their rows.
    expect(row('sayyāratān')).toBe('L1-M8/L1-M8-S07#0');
    expect(row('sayyāra')).toBe('L1-M3/L1-M3-S09#0');
    expect(row('sayyāratī')).toBe('L1-M7/L1-M7-S09#0');
    // bi-riyāl joins riyāl's row without touching bi's own key; sa-ashtarī likewise leaves
    // `sa` with M6.
    expect(row('bi-riyāl')).toBe('L1-M8/L1-M8-S08#1');
    expect(row('bi')).toBe('L1-M2/L1-M2-S05#0');
    expect(row('sa-ashtarī')).toBe('L1-M8/L1-M8-S10#0');
    expect(row('sa')).toBe('L1-M6/L1-M6-S01#0');
  });

  /**
   * #291's contract — the en-ar pools grew from 8 to 12 items per module, so at comprehendCount 2
   * a retry has six fresh deals before recycling (`src/engine/comprehension.ts`: pool size IS
   * retry freshness). The count is pinned exactly, so the next growth pass moves it deliberately;
   * the other two clauses are the issue's own acceptance criteria: every item carries BOTH the
   * romanized `display` and the Arabic `script` line, and no pool item is a hero sentence retold —
   * compared case-insensitively through the one shared normaliser, because `Rohān` vs `rohān` or a
   * dropped `?` must not disguise a duplicate. Resolution is not re-proved here: the [Q3] sweep
   * above and `checkComprehensionPool` in the build already gate every token.
   */
  it('grows every en-ar pool to exactly 12 items, scripted, and none a hero sentence (#291)', () => {
    const modules = authoredCourse('en-ar');
    const heroes = new Set(
      modules.flatMap(({ module }) =>
        module.sentences.map((sentence) => tokenizeSurface(sentence.display).join(' ')),
      ),
    );

    expect(modules).toHaveLength(10);
    for (const { id, module } of modules) {
      expect(module.comprehensionPool, `${id} pool count`).toHaveLength(12);
      for (const item of module.comprehensionPool) {
        expect(item.display, `${item.id} display`).not.toBe('');
        expect(item.script ?? '', `${item.id} carries an Arabic script line`).not.toBe('');
        expect(
          heroes.has(tokenizeSurface(item.display).join(' ')),
          `${item.id} must not equal a hero sentence: "${item.display}"`,
        ).toBe(false);
      }
    }
  });

  /**
   * #284's seam — the sweep, for hi-en: every variation line against the index of the module that
   * shows it. Every remaining miss is a *decided* miss, and
   * `docs/17-llm-review-hi-en-surfaces.md` says which kind per line:
   *
   *   - a name or place shown only in variation lines (`priya` eight times, `jaipur`) — hi-en
   *     teaches the proper nouns its displays carry (Rohan, Delhi, Mumbai), and a name shown only
   *     in a variation has no display to hang a row on;
   *   - a forward reference to a later module's own row (`mumbai` → M2, `doctor` → M2,
   *     `coffee` → M3, `water` → M3, `films` → M5) — the learner meets it on schedule;
   *   - a recorded exemption: the sibling words the changed lines gloss in prose (`farmer`,
   *     `actor`, `cricket`, `dogs`, `hindi`, `speak`, `milk` — each would only resolve by landing
   *     on a row headed by a DIFFERENT word, the forms-hit bug), the M10 trio its own changed
   *     lines declare untaught (`well`, `now`, `bus` — इस सीढ़ी पर नहीं सिखाया), and the numbers
   *     docs/13 reserves for later authoring (`three`, `six`);
   *   - the informal greeting #294 shows whole (`How's it going?`, M2-S03): its own changed-note
   *     says टुकड़े बाद में — `it` is M7's on schedule, `how's` and bare `going` stay unclaimed
   *     (docs/13's seam keeps `going` free), so all three tokens are decided misses.
   *
   * A new variation that resolves nowhere fails here, so #288's third-variation pass has to
   * decide about a new surface rather than discover it later.
   */
  it('sweeps every hi-en variation line down to thirty decided misses (#284, #294)', () => {
    const modules = authoredCourse('hi-en');
    const indexes = buildWordIndex('hi-en', modules);
    const misses: string[] = [];

    modules.forEach(({ id, module }, at) => {
      const index = indexes[at];
      if (index === undefined) throw new Error(`${id} built no index`);
      const lookup = {
        maxSpan: index.maxSpan,
        has: (surface: string) => Object.hasOwn(index.surfaces, surface),
      };
      for (const sentence of module.sentences) {
        for (const variation of sentence.variations ?? []) {
          for (const match of matchSurfaces(tokenizeSurface(variation.display), lookup)) {
            if (!match.resolved) misses.push(`${id}/${sentence.id}: "${match.surface}"`);
          }
        }
      }
    });

    expect(misses).toEqual([
      'L1-M1/L1-M1-S01: "priya"',
      'L1-M1/L1-M1-S02: "mumbai"',
      'L1-M1/L1-M1-S03: "jaipur"',
      'L1-M1/L1-M1-S03: "priya"',
      'L1-M1/L1-M1-S04: "doctor"',
      'L1-M1/L1-M1-S05: "priya"',
      'L1-M1/L1-M1-S05: "farmer"',
      'L1-M1/L1-M1-S06: "actor"',
      'L1-M1/L1-M1-S07: "coffee"',
      'L1-M1/L1-M1-S07: "water"',
      'L1-M1/L1-M1-S08: "cricket"',
      'L1-M1/L1-M1-S08: "films"',
      'L1-M1/L1-M1-S09: "dogs"',
      'L1-M1/L1-M1-S10: "hindi"',
      'L1-M2/L1-M2-S01: "priya"',
      'L1-M2/L1-M2-S02: "priya"',
      'L1-M2/L1-M2-S03: "how\'s"',
      'L1-M2/L1-M2-S03: "it"',
      'L1-M2/L1-M2-S03: "going"',
      'L1-M2/L1-M2-S07: "priya"',
      'L1-M3/L1-M3-S03: "speak"',
      'L1-M3/L1-M3-S09: "milk"',
      'L1-M3/L1-M3-S10: "three"',
      'L1-M4/L1-M4-S01: "six"',
      'L1-M4/L1-M4-S02: "six"',
      'L1-M10/L1-M10-S01: "priya"',
      'L1-M10/L1-M10-S02: "well"',
      'L1-M10/L1-M10-S03: "now"',
      'L1-M10/L1-M10-S09: "bus"',
      'L1-M10/L1-M10-S10: "priya"',
    ]);
  });

  /**
   * The hi-en surface-pass seams (#284) — the one addition and the refusals around it, pinned to
   * the row that owns each. The load-bearing ones: the full name `Rohan Sharma` is a two-token
   * surface on the name's own row, and a multi-token surface grants no bare-word key
   * (`surfaceIndexKeys`), so `sharma` alone stays out and `rohan` is untouched; every sibling row
   * an exempted variation word could have squatted on still heads its own word; and the reserved
   * numbers of docs/13 (`three`, `six`, `hundred`) plus M10's declared-untaught trio
   * (`well`, `now`, `bus`) stay free for later authoring.
   */
  it('keeps hi-en surface-pass seams on the row that owns them (#284)', () => {
    const index = lastIndex('hi-en');
    const row = (surface: string): string =>
      `${index.surfaces[surface]?.moduleId}/${index.surfaces[surface]?.sentenceId}#${index.surfaces[surface]?.wordIdx}`;

    // The full name rides the name row; the surname alone is no key, the first name unmoved.
    expect(row('rohan sharma')).toBe('L1-M1/L1-M1-S01#3');
    expect(row('rohan')).toBe('L1-M1/L1-M1-S01#3');
    expect(Object.hasOwn(index.surfaces, 'sharma')).toBe(false);
    // The sibling rows keep their own word — no exempted variation word landed on any of them.
    expect(row('teacher')).toBe('L1-M1/L1-M1-S05#0');
    expect(row('engineer')).toBe('L1-M1/L1-M1-S06#0');
    expect(row('music')).toBe('L1-M1/L1-M1-S08#0');
    expect(row('books')).toBe('L1-M1/L1-M1-S09#0');
    expect(row('english')).toBe('L1-M1/L1-M1-S10#0');
    expect(row('learn')).toBe('L1-M3/L1-M3-S03#1');
    expect(row('sugar')).toBe('L1-M3/L1-M3-S09#0');
    expect(row('fine')).toBe('L1-M2/L1-M2-S04#1');
    // The exempted words themselves stay out of the index entirely.
    for (const exempted of [
      'farmer',
      'actor',
      'cricket',
      'dog',
      'dogs',
      'hindi',
      'speak',
      'milk',
      'priya',
      'jaipur',
    ]) {
      expect(Object.hasOwn(index.surfaces, exempted), `${exempted} stays unclaimed`).toBe(false);
    }
    // Reserved for later authoring: docs/13's numbers, and the trio M10's changed lines refuse.
    for (const reserved of ['three', 'six', 'hundred', 'well', 'now', 'bus']) {
      expect(Object.hasOwn(index.surfaces, reserved), `${reserved} stays reserved`).toBe(false);
    }
    // The forward references resolve on schedule, each on the later module's own row.
    expect(row('mumbai')).toBe('L1-M2/L1-M2-S07#0');
    expect(row('doctor')).toBe('L1-M2/L1-M2-S06#0');
    expect(row('coffee')).toBe('L1-M3/L1-M3-S05#1');
    expect(row('water')).toBe('L1-M3/L1-M3-S06#1');
    expect(row('films')).toBe('L1-M5/L1-M5-S08#1');
    expect(row('film')).toBe('L1-M5/L1-M5-S08#1');
  });

  /**
   * #292 — the hi-en comprehension pools, grown to twelve per module. Pool size is retry
   * freshness (`src/engine/comprehension.ts`: at comprehendCount 2, twelve items are six fresh
   * attempts before recycling), so a shrink is a regression this pins against. The second half
   * pins the course's standing property that no pool item duplicates a hero sentence — a pool
   * item is what the exit ritual asks the learner to READ fresh, and a hero copy would hand the
   * answer to memory instead of comprehension (`docs/25-llm-review-hi-en-comprehension.md`).
   */
  it('ships twelve comprehension items per hi-en module, none of them a hero sentence (#292)', () => {
    const modules = authoredCourse('hi-en');
    const heroes = new Set(
      modules.flatMap(({ module }) => module.sentences.map((s) => s.display.toLowerCase())),
    );

    for (const { id, module } of modules) {
      expect(module.comprehensionPool, `${id} pool size`).toHaveLength(12);
      for (const item of module.comprehensionPool) {
        expect(heroes.has(item.display.toLowerCase()), `${item.id} duplicates a hero`).toBe(false);
      }
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

  /**
   * #290 — hi-mr's retry freshness. Pool size IS the retry budget (`src/engine/comprehension.ts`:
   * a retry excludes everything already used until the pool exhausts), so 12 items at 2 an
   * attempt is 6 fresh attempts. And none of them may be a hero sentence wearing a pool id — a
   * pool that echoes its heroes tests recall of the module, not comprehension of new text.
   */
  it('keeps every hi-mr pool at 12+ items, none echoing a hero sentence (#290)', () => {
    const modules = Array.from({ length: 10 }, (_, i) => authored('hi-mr', `L1-M${i + 1}`));
    const heroes = new Set(
      modules.flatMap((module) => module.sentences.map((s) => s.display.trim().toLowerCase())),
    );

    for (const module of modules) {
      expect(module.comprehensionPool.length, module.id).toBeGreaterThanOrEqual(12);
      for (const item of module.comprehensionPool) {
        expect(heroes.has(item.display.trim().toLowerCase()), `${item.id} echoes a hero`).toBe(
          false,
        );
      }
    }
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
 * hi-mr, en-es, en-ar and — since #273 — hi-en all ship: the repo holds no fixture course and
 * no unverified module, so the two builds carry the same four courses and differ only in the
 * banner and the `devBuild` key. hi-en was authored behind the gate (#267 row with
 * `fixture: true`, #270–#272 the ten rungs) and graduated the way en-es (#195) and en-ar (#202)
 * did: the flag deleted, nothing relaxed. The synthetic roots above build fixture rows and
 * unverified modules and watch them be dropped; what *this* block asserts is that the repo's real
 * content needs no relaxation to reach a learner — all four courses, forty rungs, on a strict build.
 */
describe('the authored content', () => {
  /** Everything a strict build must emit for the fourth course (#273): the ladder, the Hindi
   *  bundle, the ten rungs and their ten cumulative indexes. */
  /** The ten L1 rungs, in ladder order — shared by every course in this block since #336. */
  const L1_MODULES = [
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
  /** The en-it rungs authored so far (#334 → #336), and the report line they produce. */
  const EN_IT_AUTHORED = L1_MODULES;
  const EN_IT_LINE = `${EN_IT_AUTHORED.length} modules (L1-M1..M${EN_IT_AUTHORED.length})`;

  const HI_EN_FILES = [
    'hi-en/levels.json',
    'hi-en/strings.json',
    ...Array.from({ length: 10 }, (_, i) => `hi-en/modules/L1-M${i + 1}.json`),
    ...Array.from({ length: 10 }, (_, i) => `hi-en/index/L1-M${i + 1}.json`),
  ];

  it('ships hi-mr, en-es, en-ar and hi-en L1-M1..M10 on a strict build', () => {
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
      ['hi-en', L1],
    ]);
    // Four courses, in manifest order — hi-mr first and default, hi-en last (#273).
    expect(readManifest(outRoot).courses.map((course) => course.id)).toEqual([
      'hi-mr',
      'en-es',
      'en-ar',
      'hi-en',
    ]);
    // No EMITTED row carries `fixture`: en-it's authored row does, and that is exactly why the
    // strict gate never emitted it. The envelope carries no dev key.
    expect(readManifest(outRoot).courses.some((course) => 'fixture' in course)).toBe(false);
    expect(readManifest(outRoot).devBuild).toBeUndefined();
    // Nothing skipped, so the summary line carries no `| skipped:` tail.
    expect(report.lines).toEqual([
      'hi-mr: 10 modules (L1-M1..M10)',
      ...Array.from({ length: 10 }, (_, i) => expect.stringContaining(`index L1-M${i + 1}: `)),
      'en-es: 10 modules (L1-M1..M10)',
      ...Array.from({ length: 10 }, (_, i) => expect.stringContaining(`index L1-M${i + 1}: `)),
      'en-ar: 10 modules (L1-M1..M10)',
      ...Array.from({ length: 10 }, (_, i) => expect.stringContaining(`index L1-M${i + 1}: `)),
      'hi-en: 10 modules (L1-M1..M10)',
      ...Array.from({ length: 10 }, (_, i) => expect.stringContaining(`index L1-M${i + 1}: `)),
      // en-it (#332) is a fixture course with nothing authored: the strict gate drops it whole,
      // says so by name, and the manifest above never listed it.
      'en-it: 0 modules — fixture course, excluded by the gate (--with-fixtures ships it in dev)',
      'CONTENT build: hi-mr 10 modules (L1-M1..M10), en-es 10 modules (L1-M1..M10), en-ar 10 modules (L1-M1..M10), hi-en 10 modules (L1-M1..M10) | skipped: en-it (fixture course)',
    ]);
    // The strict tree carries the fourth course whole — the files a learner's device fetches
    // (AC 2 of #273), and the emitted ladder says all ten L1 rungs have content.
    for (const file of HI_EN_FILES) {
      expect(existsSync(path.join(outRoot, ...file.split('/'))), file).toBe(true);
    }
    const levels = JSON.parse(readFileSync(path.join(outRoot, 'hi-en', 'levels.json'), 'utf8')) as {
      levels: { id: string; draft?: boolean; modules: { hasContent: boolean }[] }[];
    };
    expect(levels.levels[0]?.draft).toBeUndefined();
    expect(levels.levels[0]?.modules.map((module) => module.hasContent)).toEqual(
      Array.from({ length: 10 }, () => true),
    );
    // L2 and L3 are still placeholder lists and say so.
    expect(levels.levels.slice(1).map((level) => level.draft)).toEqual([true, true]);
  });

  /**
   * The forty shipping modules — hi-mr's ten (#110, #111), en-es's ten (#192–#195), en-ar's ten
   * (#199–#202) and hi-en's ten (#270–#273) — ship on an LLM review the owner authorised, not on
   * the native gate, which is open for all four languages. What the gate enforces is the
   * signature: a module that reaches a learner names who cleared it and when (tools/validate.ts),
   * so the record can never quietly claim a check nobody ran.
   */
  it('names a reviewer and a date on every module it ships strictly', () => {
    const { outRoot } = build(DEFAULT_CONTENT_ROOT, STRICT);

    for (const courseId of ['hi-mr', 'en-es', 'en-ar', 'hi-en']) {
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

  it('ships hi-mr, en-es, en-ar and hi-en L1-M1..M10 on a dev build', () => {
    const { report, outRoot } = build(DEFAULT_CONTENT_ROOT, DEV);
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
      ['hi-en', L1],
      ['en-it', EN_IT_AUTHORED],
    ]);
    // hi-en was authored behind this relaxation (#267, #270–#272) and graduated in #273, so a dev
    // build now ships exactly what the strict build above does — the same ten rungs, the same
    // report line — and differs only in the banner and the `devBuild` key.
    expect(report.lines).toContain('hi-en: 10 modules (L1-M1..M10)');
    expect(report.lines).toContain('  index L1-M10: 207 surfaces');
    expect(report.lines).toContain(
      `CONTENT build: hi-mr 10 modules (L1-M1..M10), en-es 10 modules (L1-M1..M10), en-ar 10 modules (L1-M1..M10), hi-en 10 modules (L1-M1..M10), en-it ${EN_IT_LINE}`,
    );
    // en-it is the course being authored behind the gate right now (#332): the relaxation is what
    // admits it, and the strict build above drops it whole. Its rungs land in ladder order.
    expect(report.lines).toContain(`en-it: ${EN_IT_LINE}`);
    expect(readManifest(outRoot).devBuild).toBe(true);
    // The manifest lists what SHIPPED, and a dev build ships en-it — WITH its `fixture` flag, so
    // no artefact can pretend the course has graduated before #337 deletes it.
    expect(readManifest(outRoot).courses.map((course) => course.id)).toEqual([
      'hi-mr',
      'en-es',
      'en-ar',
      'hi-en',
      'en-it',
    ]);
    expect(readManifest(outRoot).courses.at(-1)).toMatchObject({
      id: 'en-it',
      l1Tag: 'en',
      l2Tag: 'it',
      fixture: true,
    });
    expect(
      readManifest(outRoot)
        .courses.filter((course) => 'fixture' in course)
        .map((course) => course.id),
    ).toEqual(['en-it']);
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
      'hi-en/modules/L1-M6.json',
      'hi-en/modules/L1-M7.json',
      'hi-en/modules/L1-M8.json',
      'hi-en/modules/L1-M9.json',
      'hi-en/modules/L1-M10.json',
      'hi-en/index/L1-M1.json',
      'hi-en/index/L1-M2.json',
      'hi-en/index/L1-M3.json',
      'hi-en/index/L1-M4.json',
      'hi-en/index/L1-M5.json',
      'hi-en/index/L1-M6.json',
      'hi-en/index/L1-M7.json',
      'hi-en/index/L1-M8.json',
      'hi-en/index/L1-M9.json',
      'hi-en/index/L1-M10.json',
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

  /**
   * The last five rungs (#272): the multi-token surfaces the briefs reserved are whole keys that
   * claim no bare part (`going to` never opens M3's `to`; `there is` swallows its `is`; `Can I have`
   * never reaches M4's possession row; `in front of` leaves `of` to M8), each homograph has the
   * owner the briefs named (`it` / `it's` M7, `this` M8, `that` M9, `so` the consequence word),
   * and the one recorded deviation holds: M6's `I'll` row lists only itself, so `I will` resolves
   * to `I` + `will` and the auxiliary the brief wants tappable stays tappable
   * (docs/13-llm-review-hi-en-L1-M6-M10.md has the token-by-token tables).
   */
  it('lands hi-en M6–M10 on the rows the briefs assigned — formulas whole, homographs owned, I will still two rows', () => {
    const { outRoot } = build(DEFAULT_CONTENT_ROOT, DEV);
    const index = readIndex(outRoot, 'hi-en', 'L1-M10');
    const row = (moduleId: string, sentence: number, wordIdx: number) => ({
      moduleId,
      sentenceId: `${moduleId}-S${String(sentence).padStart(2, '0')}`,
      wordIdx,
    });

    expect(index.cumulativeThrough).toEqual([
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
    // `in front of` and `Can I have` are three-token keys.
    expect(index.maxSpan).toBe(3);
    // 203 after #284; #294 added the four informal alternates as forms on their own rows —
    // `hi` (Hello), `not bad` (fine), `bye` (Goodbye), `see ya` (See you) — and nothing else.
    expect(index.surfaceCount).toBe(207);
    // M6: `will` bare (the lesson), `I'll` its own row listing ONLY itself — `i will` is no key, so
    // `I will go` opens `I` then `will`; `going to` whole (bare `going` unclaimed) and `to` still M3's.
    expect(index.surfaces['will']).toEqual(row('L1-M6', 1, 0));
    expect(index.surfaces['tomorrow']).toEqual(row('L1-M6', 1, 1));
    expect(index.surfaces["i'll"]).toEqual(row('L1-M6', 10, 1));
    expect(index.surfaces['i will']).toBeUndefined();
    expect(index.surfaces['going to']).toEqual(row('L1-M6', 5, 0));
    expect(index.surfaces['going']).toBeUndefined();
    expect(index.surfaces['to']).toEqual(row('L1-M3', 3, 0));
    expect(index.surfaces['her']).toEqual(row('L1-M6', 8, 1));
    expect(index.surfaces['meeting']).toEqual(row('L1-M6', 8, 0));
    expect(index.surfaces['they']).toEqual(row('L1-M6', 4, 0));
    expect(index.surfaces['next']).toEqual(row('L1-M6', 7, 0));
    // M7: `there is` / `there are` one row (bare `there` unclaimed; the `is` inside never reaches
    // M1's be row), `it` and `it's · it is` two rows, the place words, `next to` / `in front of`
    // whole — `next` stays M6's and `of` lands on M8's row.
    expect(index.surfaces['there is']).toEqual(row('L1-M7', 9, 0));
    expect(index.surfaces['there are']).toEqual(row('L1-M7', 9, 0));
    expect(index.surfaces['there']).toBeUndefined();
    expect(index.surfaces['is']).toEqual(row('L1-M1', 1, 2));
    expect(index.surfaces['it']).toEqual(row('L1-M7', 6, 0));
    expect(index.surfaces["it's"]).toEqual(row('L1-M7', 5, 0));
    expect(index.surfaces['it is']).toEqual(row('L1-M7', 5, 0));
    expect(index.surfaces['where']).toEqual(row('L1-M7', 4, 0));
    expect(index.surfaces['under']).toEqual(row('L1-M7', 3, 0));
    expect(index.surfaces['behind']).toEqual(row('L1-M7', 5, 1));
    expect(index.surfaces['near']).toEqual(row('L1-M7', 6, 1));
    expect(index.surfaces['next to']).toEqual(row('L1-M7', 7, 0));
    expect(index.surfaces['in front of']).toEqual(row('L1-M7', 8, 0));
    expect(index.surfaces['front']).toBeUndefined();
    // M8: `how much` / `how many` whole (`how` stays M2's, `much` / `many` unclaimed), `Can I have`
    // whole (`can` unclaimed, `have` still M4's possession row), `this`, `please`, `of`, the money.
    expect(index.surfaces['how much']).toEqual(row('L1-M8', 1, 0));
    expect(index.surfaces['how many']).toEqual(row('L1-M8', 8, 0));
    expect(index.surfaces['how']).toEqual(row('L1-M2', 3, 0));
    for (const unclaimed of ['much', 'many', 'can']) {
      expect(index.surfaces[unclaimed], `${unclaimed} must stay unclaimed`).toBeUndefined();
    }
    expect(index.surfaces['can i have']).toEqual(row('L1-M8', 5, 0));
    expect(index.surfaces['have']).toEqual(row('L1-M4', 10, 0));
    expect(index.surfaces['this']).toEqual(row('L1-M8', 1, 1));
    expect(index.surfaces['please']).toEqual(row('L1-M8', 5, 2));
    expect(index.surfaces['of']).toEqual(row('L1-M8', 6, 1));
    expect(index.surfaces['rupees']).toEqual(row('L1-M8', 2, 1));
    expect(index.surfaces['rupee']).toEqual(row('L1-M8', 2, 1));
    expect(index.surfaces['cost']).toEqual(row('L1-M8', 3, 0));
    expect(index.surfaces['costs']).toEqual(row('L1-M8', 3, 0));
    expect(index.surfaces['one']).toEqual(row('L1-M8', 9, 0));
    // M9: `because` and `so` one row each, `why`, `that` (both jobs, one row), `very`, `think`.
    expect(index.surfaces['because']).toEqual(row('L1-M9', 1, 0));
    expect(index.surfaces['so']).toEqual(row('L1-M9', 2, 0));
    expect(index.surfaces['why']).toEqual(row('L1-M9', 3, 0));
    expect(index.surfaces['that']).toEqual(row('L1-M9', 9, 1));
    expect(index.surfaces['think']).toEqual(row('L1-M9', 9, 0));
    expect(index.surfaces['very']).toEqual(row('L1-M9', 6, 0));
    // M10: the joiners and the fixed courtesies, `See you` whole (M5's `see` untouched).
    expect(index.surfaces['and']).toEqual(row('L1-M10', 2, 0));
    expect(index.surfaces['but']).toEqual(row('L1-M10', 3, 0));
    expect(index.surfaces['also']).toEqual(row('L1-M10', 8, 0));
    expect(index.surfaces['then']).toEqual(row('L1-M10', 7, 0));
    expect(index.surfaces['see you']).toEqual(row('L1-M10', 10, 2));
    expect(index.surfaces['see']).toEqual(row('L1-M5', 8, 0));
    expect(index.surfaces['today']).toEqual(row('L1-M10', 1, 0));
    // Still nobody's after the whole ladder — the keys the briefs kept out of L1.
    for (const unclaimed of ['likes', 'him', 'his', 'too', 'meet', "won't", 'hundred']) {
      expect(index.surfaces[unclaimed], `${unclaimed} is outside L1`).toBeUndefined();
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
