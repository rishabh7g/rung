import { execFileSync } from 'node:child_process';
import { mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import {
  DEFAULT_CONTENT_ROOT,
  REPO_ROOT,
  collectModuleFiles,
  formatReport,
  validateContentRoot,
  validateModule,
  type Module,
  type ValidationResult,
} from './validate.ts';

/**
 * The positive fixtures are (a) the authored hi-mr modules — the shape ground truth — and
 * (b) tools/fixtures/content/en-ar/modules/L1-M4.json, the PRD §7 romanized shape lifted from
 * the v3.3 prototype's en-ar sample: `fixture: true` (relaxed budget: 4 sentences, pool of 2),
 * numbered M4 because the prototype leaves two of its four sentences unenriched and the
 * enrichment-full rule is NOT relaxed for fixtures — only the counts are.
 * Every negative fixture is that same authored L1-M1 with exactly one thing broken.
 */
const FIXTURE_ROOT = path.join(REPO_ROOT, 'tools', 'fixtures', 'content');
const HI_MR_M1 = path.join(DEFAULT_CONTENT_ROOT, 'hi-mr', 'modules', 'L1-M1.json');

const temporaryRoots: string[] = [];

afterAll(() => {
  for (const root of temporaryRoots) rmSync(root, { recursive: true, force: true });
});

function temporaryContentRoot(): string {
  const root = mkdtempSync(path.join(tmpdir(), 'rung-content-'));
  temporaryRoots.push(root);
  return root;
}

function writeModule(root: string, course: string, module: Module): void {
  const dir = path.join(root, course, 'modules');
  mkdirSync(dir, { recursive: true });
  writeFileSync(path.join(dir, `${module.id}.json`), JSON.stringify(module), 'utf8');
}

/** A fresh mutable copy of the authored L1-M1 — every negative fixture starts here. */
function authoredM1(): Module {
  return JSON.parse(readFileSync(HI_MR_M1, 'utf8')) as Module;
}

function at<T>(items: readonly T[], index: number): T {
  const item = items[index];
  if (item === undefined) throw new Error(`fixture has no item at index ${index}`);
  return item;
}

/** Lets a test write a value schema v5 forbids, which TypeScript would otherwise refuse. */
function loosen(value: object): Record<string, unknown> {
  return value as Record<string, unknown>;
}

function messageAt(result: ValidationResult, pointer: string): string {
  const issue = result.issues.find((candidate) => candidate.path === pointer);
  if (issue === undefined) {
    throw new Error(
      `expected an issue at ${pointer}, got: ${result.issues.map((i) => `${i.path}: ${i.message}`).join(' | ')}`,
    );
  }
  return issue.message;
}

describe('the authored content', () => {
  it('validates every module under content/, and reports the summary line', () => {
    const results = validateContentRoot(DEFAULT_CONTENT_ROOT);
    const report = formatReport(results);

    expect(results.map((result) => result.id)).toEqual(expect.arrayContaining(['L1-M1', 'L1-M2']));
    expect(results.filter((result) => !result.ok)).toEqual([]);
    expect(report.lines.slice(0, results.length)).toEqual(
      results.map((result) => `${result.file} ok`),
    );
    expect(report.lines.at(-1)).toMatch(/^CONTENT (\d+)\/\1 ok$/);
    expect(report.exitCode).toBe(0);
  });
});

describe('positive fixtures', () => {
  it('accepts the romanized dev fixture: script lines, and a budget relaxed by fixture: true', () => {
    expect(collectModuleFiles(FIXTURE_ROOT)).toHaveLength(1);

    const report = formatReport(validateContentRoot(FIXTURE_ROOT));

    expect(report.lines).toEqual(['en-ar/L1-M4.json ok', 'CONTENT 1/1 ok']);
    expect(report.exitCode).toBe(0);
  });

  it('treats module ids as unique per course, not globally', () => {
    const root = temporaryContentRoot();
    writeModule(root, 'hi-mr', authoredM1());
    writeModule(root, 'xx-yy', authoredM1());

    const report = formatReport(validateContentRoot(root));

    expect(report.lines).toEqual(['hi-mr/L1-M1.json ok', 'xx-yy/L1-M1.json ok', 'CONTENT 2/2 ok']);
  });

  it('makes enrichment optional from M4 on', () => {
    const module = authoredM1();
    module.id = 'L1-M4';
    for (const [index, sentence] of module.sentences.entries()) {
      sentence.id = `L1-M4-S${String(index + 1).padStart(2, '0')}`;
      delete sentence.mistake;
      delete sentence.mnemonic;
    }
    for (const [index, item] of module.comprehensionPool.entries()) {
      item.id = `L1-M4-C${String(index + 1).padStart(2, '0')}`;
    }

    expect(validateModule(module, 'hi-mr/L1-M4.json').ok).toBe(true);
  });
});

describe('negative fixtures — the budget', () => {
  it('rejects a module without exactly 10 sentences', () => {
    const module = authoredM1();
    module.sentences.pop();

    const result = validateModule(module, 'hi-mr/L1-M1.json');

    expect(result.ok).toBe(false);
    expect(messageAt(result, '/sentences')).toBe('expected exactly 10 sentences, found 9');
  });

  it('rejects a comprehension pool below 6', () => {
    const module = authoredM1();
    module.comprehensionPool = module.comprehensionPool.slice(0, 4);

    const result = validateModule(module, 'hi-mr/L1-M1.json');

    expect(messageAt(result, '/comprehensionPool')).toBe(
      'expected at least 6 comprehension items, found 4',
    );
  });

  it('relaxes both counts — and only those — when fixture is true', () => {
    const module = authoredM1();
    module.fixture = true;
    module.sentences = module.sentences.slice(0, 4);
    module.comprehensionPool = module.comprehensionPool.slice(0, 2);

    expect(validateModule(module, 'hi-mr/L1-M1.json').ok).toBe(true);
  });
});

describe('negative fixtures — enrichment, ids and ordering', () => {
  it('requires all five enrichment blocks on every sentence of M1-M3', () => {
    const module = authoredM1();
    delete at(module.sentences, 1).mistake;
    at(module.sentences, 2).variations = [];

    const result = validateModule(module, 'hi-mr/L1-M1.json');

    expect(messageAt(result, '/sentences/1/mistake')).toBe(
      'modules M1-M3 ship fully enriched: "mistake" is required on every sentence',
    );
    expect(messageAt(result, '/sentences/2/variations')).toMatch(/"variations" is required/);
  });

  it('rejects a module whose id does not match its filename', () => {
    const result = validateModule(authoredM1(), 'hi-mr/L1-M2.json');

    expect(messageAt(result, '/id')).toBe(
      'id "L1-M1" does not match filename "L1-M2.json" (expected id "L1-M2")',
    );
  });

  it('rejects a duplicate module id inside one course', () => {
    const seenIds = new Map([['L1-M1', 'hi-mr/L1-M1.json']]);

    const result = validateModule(authoredM1(), 'hi-mr/L1-M1.json', { seenIds });

    expect(messageAt(result, '/id')).toBe(
      'duplicate module id "L1-M1" — already declared by hi-mr/L1-M1.json',
    );
  });

  it('rejects a duplicate sentence id', () => {
    const module = authoredM1();
    at(module.sentences, 3).id = at(module.sentences, 0).id;

    const result = validateModule(module, 'hi-mr/L1-M1.json');

    expect(messageAt(result, '/sentences/3/id')).toBe('duplicate sentence id "L1-M1-S01"');
  });

  it('rejects a prerequisite that is not earlier in the same level sequence', () => {
    const module = authoredM1();
    module.id = 'L1-M2';
    module.prerequisites = ['L1-M3', 'L2-M1'];

    const result = validateModule(module, 'hi-mr/L1-M2.json');

    expect(messageAt(result, '/prerequisites/0')).toBe(
      'prerequisite "L1-M3" must come earlier in the same level sequence as "L1-M2"',
    );
    expect(messageAt(result, '/prerequisites/1')).toMatch(
      /^prerequisite "L2-M1" must come earlier/,
    );
  });

  it('rejects verified: true without verifiedBy and verifiedAt', () => {
    const module = authoredM1();
    module.verified = true;

    const result = validateModule(module, 'hi-mr/L1-M1.json');

    expect(messageAt(result, '/verifiedBy')).toBe(
      'verified: true requires verifiedBy (who ran the native gate)',
    );
    expect(messageAt(result, '/verifiedAt')).toBe(
      'verified: true requires verifiedAt (when the native gate ran)',
    );
  });

  it('rejects a deconstruction rule index that is out of range', () => {
    const module = authoredM1();
    at(module.sentences, 0).deconstruction.rules = [0, 99];

    const result = validateModule(module, 'hi-mr/L1-M1.json');

    expect(messageAt(result, '/sentences/0/deconstruction/rules/1')).toBe(
      'rule index 99 is out of range — the module declares 6 rules (0-5)',
    );
  });
});

describe('negative fixtures — the closed shape (the six ratified decisions)', () => {
  it('rejects forms written as the prototype\'s " · " string', () => {
    const module = authoredM1();
    loosen(at(at(module.sentences, 0).deconstruction.words, 0)).forms = 'माझा · माझी · माझं';

    const result = validateModule(module, 'hi-mr/L1-M1.json');

    expect(messageAt(result, '/sentences/0/deconstruction/words/0/forms')).toBe('must be array');
  });

  it('rejects mistake written as an array', () => {
    const module = authoredM1();
    loosen(at(module.sentences, 0)).mistake = [at(module.sentences, 0).mistake];

    const result = validateModule(module, 'hi-mr/L1-M1.json');

    expect(messageAt(result, '/sentences/0/mistake')).toBe('must be object');
  });

  it('rejects words embedded on a comprehension item', () => {
    const module = authoredM1();
    loosen(at(module.comprehensionPool, 0)).words = [];

    const result = validateModule(module, 'hi-mr/L1-M1.json');

    expect(messageAt(result, '/comprehensionPool/0')).toBe(
      'unknown property "words" (schema v5 is closed)',
    );
  });

  it('rejects retired prototype field names anywhere in a sentence', () => {
    const module = authoredM1();
    loosen(at(module.sentences, 0)).phon = 'माझं = माझ + ं';

    const result = validateModule(module, 'hi-mr/L1-M1.json');

    expect(messageAt(result, '/sentences/0')).toBe('unknown property "phon" (schema v5 is closed)');
  });

  it('rejects an unknown word tag, a stale schemaVersion and a malformed sentence id', () => {
    const module = authoredM1();
    loosen(module).schemaVersion = 4;
    at(module.sentences, 0).id = 'L1-M1-S1';
    loosen(at(at(module.sentences, 1).deconstruction.words, 0)).tag = 'cognate';

    const result = validateModule(module, 'hi-mr/L1-M1.json');

    expect(messageAt(result, '/schemaVersion')).toBe('must be 5');
    expect(messageAt(result, '/sentences/0/id')).toMatch(/^must match \^L\[1-3\]-M/);
    expect(messageAt(result, '/sentences/1/deconstruction/words/0/tag')).toBe(
      'must be one of: free, delta, interference',
    );
  });

  it('reports schema failures with a JSON-pointer path and no module id', () => {
    const result = validateModule({ schemaVersion: 5 }, 'hi-mr/L1-M1.json');

    expect(result.id).toBeNull();
    expect(result.issues.map((issue) => issue.path)).toEqual(
      expect.arrayContaining(['/', '/', '/']),
    );
    expect(messageAt(result, '/')).toMatch(/^missing required property "/);
  });
});

describe('the output contract', () => {
  it('reports an empty content root as CONTENT no modules, exit 0', () => {
    const report = formatReport(validateContentRoot(temporaryContentRoot()));

    expect(report.lines).toEqual(['CONTENT no modules']);
    expect(report.exitCode).toBe(0);
  });

  it('lists each failing file with its issues, and counts only the passing ones', () => {
    const root = temporaryContentRoot();
    writeModule(root, 'hi-mr', authoredM1());
    const broken = authoredM1();
    broken.id = 'L1-M2';
    broken.sentences.pop();
    writeModule(root, 'hi-mr', broken);
    mkdirSync(path.join(root, 'hi-mr', 'modules'), { recursive: true });
    writeFileSync(path.join(root, 'hi-mr', 'modules', 'L1-M3.json'), '{ not json', 'utf8');

    const report = formatReport(validateContentRoot(root));

    expect(report.lines[0]).toBe('hi-mr/L1-M1.json ok');
    expect(report.lines[1]).toBe('hi-mr/L1-M2.json FAIL');
    expect(report.lines[2]).toBe('  /sentences: expected exactly 10 sentences, found 9');
    expect(report.lines[3]).toBe('hi-mr/L1-M3.json FAIL');
    expect(report.lines[4]).toMatch(/^ {2}\/: invalid JSON: /);
    expect(report.lines.at(-1)).toBe('CONTENT 1/3 ok');
    expect(report.exitCode).toBe(1);
  });
});

describe('the CLI', () => {
  function runCli(root: string): { stdout: string; status: number } {
    try {
      const stdout = execFileSync('npm', ['run', '--silent', 'content:validate', '--', root], {
        cwd: REPO_ROOT,
        encoding: 'utf8',
      });
      return { stdout, status: 0 };
    } catch (error) {
      const failure = error as { stdout?: string; status?: number };
      return { stdout: failure.stdout ?? '', status: failure.status ?? -1 };
    }
  }

  it('prints the report and exits 0 when every module passes', { timeout: 60_000 }, () => {
    const { stdout, status } = runCli(FIXTURE_ROOT);

    expect(stdout.trim().split('\n')).toEqual(['en-ar/L1-M4.json ok', 'CONTENT 1/1 ok']);
    expect(status).toBe(0);
  });

  it('exits 1 when a module fails', { timeout: 60_000 }, () => {
    const root = temporaryContentRoot();
    const broken = authoredM1();
    broken.sentences.pop();
    writeModule(root, 'hi-mr', broken);

    const { stdout, status } = runCli(root);

    expect(stdout).toContain('hi-mr/L1-M1.json FAIL');
    expect(stdout).toContain('  /sentences: expected exactly 10 sentences, found 9');
    expect(stdout).toContain('CONTENT 0/1 ok');
    expect(status).toBe(1);
  });
});
