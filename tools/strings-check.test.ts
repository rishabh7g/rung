import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { completeStrings } from './fixtures/strings.ts';
import { checkStrings, flattenStrings } from './strings-check.ts';
import { STRINGS_KEYS, STRINGS_PLACEHOLDERS, type StringsKey } from '../src/course/stringsKeys.ts';
import { DEFAULT_CONTENT_ROOT } from './validate.ts';

/**
 * The three shipped bundles are the source of truth for what the canonical list must say — the
 * issue text predates five PRs and lists 21 keys; the files carry 39 (PR #120, verified across
 * courses by PR #124, plus the Ladder's three in #86 and the staged rung card's seven in #87).
 * Where they disagree, the files win, so the suite checks the list AGAINST the files rather than
 * the other way round.
 */
const COURSES = ['hi-mr', 'en-es', 'en-ar'] as const;

function authoredStrings(courseId: string): Record<string, unknown> {
  const file = path.join(DEFAULT_CONTENT_ROOT, courseId, 'strings.json');
  return JSON.parse(readFileSync(file, 'utf8')) as Record<string, unknown>;
}

/** A complete bundle, bent by `edit` into the shape a test is about. */
function bundle(edit?: (flat: Map<string, unknown>) => void): Record<string, unknown> {
  const flat = new Map<string, unknown>(
    STRINGS_KEYS.map((key) => [
      key,
      [`hi-mr ${key}`, ...STRINGS_PLACEHOLDERS[key]].join(' ') as unknown,
    ]),
  );
  edit?.(flat);
  const nested: Record<string, unknown> = {};
  for (const [key, value] of flat) {
    const parts = key.split('.');
    const leaf = parts.pop() as string;
    let node = nested;
    for (const part of parts) {
      node = (node[part] ??= {}) as Record<string, unknown>;
    }
    node[leaf] = value;
  }
  return nested;
}

describe('the canonical key list', () => {
  it('is exactly what the three shipped bundles carry — 77 keys, nested, identical', () => {
    for (const courseId of COURSES) {
      const keys = [...flattenStrings(authoredStrings(courseId)).keys()];

      expect(keys.length, courseId).toBe(77);
      expect([...keys].sort(), courseId).toEqual([...STRINGS_KEYS].sort());
    }
    expect(STRINGS_KEYS.length).toBe(77);
    expect(new Set(STRINGS_KEYS).size).toBe(77);
  });

  it('carries the five keys PR #120 added beyond the issue text', () => {
    const added: StringsKey[] = [
      'revealLabelComprehend',
      'ritual.stepTitle.write',
      'ritual.stepTitle.check',
      'ritual.stepTitle.confirm',
      'ritual.check.plateLabel',
    ];

    for (const key of added) expect(STRINGS_KEYS).toContain(key);
  });

  /**
   * The Ladder's three (#86). PRD-design §5 prints all three as copy — the counts-only pending
   * line, the ownership footer, the sealed-cell toast — and PRD §4's inventory never listed them,
   * so the screen would otherwise have had to hardcode them in the shell. Draft values in all
   * three bundles, flagged on #71 for the Sync-3 freeze.
   */
  it('carries the three keys the Ladder forced (#86)', () => {
    const added: StringsKey[] = ['ladder.pendingLine', 'ladder.ownership', 'ladder.sealedToast'];

    for (const key of added) expect(STRINGS_KEYS).toContain(key);
  });

  /**
   * The staged rung card's seven (#87). Every control across the four [D22] stages is a label the
   * learner reads, and PRD-design §6.2 prints them all — in English, for every course, which is
   * what a prototype does and what a product cannot. Draft values in all three bundles, on #71.
   */
  it('carries the seven keys the staged rung card forced (#87)', () => {
    const added: StringsKey[] = [
      'rungCard.startModule',
      'rungCard.freshNote',
      'rungCard.practice',
      'rungCard.revisitModule',
      'rungCard.exitRitual',
      'rungCard.module',
      'rungCard.practiceEarlier',
    ];

    for (const key of added) expect(STRINGS_KEYS).toContain(key);
  });

  /**
   * The module list's three (#88). PRD-design §6.4's screen says three things in its own right —
   * the helper above the cards, the "open full" label, and the note that a sentence carries an
   * interference trap — and the prototype writes all three in English for every course. Draft
   * values in all three bundles, flagged on #71.
   */
  it('carries the three keys the module list forced (#88)', () => {
    const added: StringsKey[] = ['module.helper', 'module.openFull', 'module.trapNote'];

    for (const key of added) expect(STRINGS_KEYS).toContain(key);
  });

  /**
   * Sentence Detail's four (#89). Its ten section labels stay English furniture, in the register
   * of the `M1 · SENTENCE 02` kicker — these four are not: the trap callout's heading is a
   * sentence about the learner's own first language, PRD §8 F3 names the mnemonic's label as
   * course copy ("labelled 'Pocket it'"), and the pager's two buttons are controls the learner
   * reads. Draft values in all three bundles, flagged on #71.
   */
  it('carries the four keys Sentence Detail forced (#89)', () => {
    const added: StringsKey[] = [
      'sentence.trapHead',
      'sentence.pocketIt',
      'sentence.prev',
      'sentence.next',
    ];

    for (const key of added) expect(STRINGS_KEYS).toContain(key);
  });

  /**
   * The "why" panel's three (#94). The toggle carries two labels because the prototype's does
   * ("why" / "hide why") and it names what it will do; `why.openFull` is deliberately not
   * `module.openFull` — one opens a sentence from a browsing list, the other leaves a running
   * session for it, and a shared key would mean a course could never word them differently (the
   * call #93 made for `mark.next` against `sentence.next`). Draft values in all three bundles,
   * flagged on #71.
   */
  it('carries the three keys the "why" panel forced (#94)', () => {
    const added: StringsKey[] = ['why.show', 'why.hide', 'why.openFull'];

    for (const key of added) expect(STRINGS_KEYS).toContain(key);
    expect(STRINGS_KEYS).toContain('module.openFull');
  });

  /**
   * The session machine's seventeen (#96). PRD-design §6.3's hub, its soft phase chips and its
   * counts-only summary are learner-facing top to bottom, and the prototype writes every line of
   * them in English for every course. Draft values in all three bundles, flagged on #71.
   */
  it('carries the seventeen keys the session machine forced (#96)', () => {
    const added: StringsKey[] = [
      'practice.hubTitle',
      'practice.hubReview',
      'practice.hubRead',
      'practice.hubProduce',
      'practice.guideLine',
      'practice.beginReview',
      'practice.beginRead',
      'practice.phase.review',
      'practice.phase.read',
      'practice.phase.produce',
      'practice.nothingDue',
      'practice.summaryTitle',
      'practice.summaryReviewed',
      'practice.summaryGotIt',
      'practice.summaryProduced',
      'practice.summaryAtTwo',
      'practice.backToLadder',
    ];

    for (const key of added) expect(STRINGS_KEYS).toContain(key);
  });

  /**
   * The Read phase's five (#97). PRD-design §6.3's read-through says five things in its own right
   * — the cue toggle's two labels and its pager's three — and the prototype writes all of them in
   * English for every course. `read.prev`/`read.next` are deliberately not `sentence.prev`/`.next`:
   * that pager browses a module, this one walks a rung mid-session and its last step leaves the
   * phase (`read.toProduce`). The read-aloud line itself is `nudge.read`, which PRD §4 has carried
   * since the first bundle. Draft values in all three bundles, flagged on #71.
   */
  it('carries the five keys the Read phase forced (#97)', () => {
    const added: StringsKey[] = [
      'read.showCue',
      'read.hideCue',
      'read.prev',
      'read.next',
      'read.toProduce',
    ];

    for (const key of added) expect(STRINGS_KEYS).toContain(key);
    expect(STRINGS_KEYS).toContain('nudge.read');
    expect(STRINGS_KEYS).toContain('sentence.next');
  });

  /**
   * The summary is COUNTS, never time (Invariant 2; #96's acceptance criterion). The shell holds
   * no copy of its own, so the only place a duration or a percentage could enter that screen is an
   * authored bundle — which is what this reads, in all three courses.
   */
  it('has no time, duration or percentage in any course’s session copy', () => {
    const TIME =
      /%|\b(streak|second|seconds|minute|minutes|hour|hours|day|days|week|weeks|month|months|min|sec)\b/i;

    for (const courseId of COURSES) {
      const flat = flattenStrings(authoredStrings(courseId));

      for (const [key, value] of flat) {
        if (!key.startsWith('practice.')) continue;
        expect(String(value), `${courseId} ${key}`).not.toMatch(TIME);
      }
    }
  });

  it('records the placeholder of every templated key, and none for the rest', () => {
    const templated = Object.entries(STRINGS_PLACEHOLDERS).filter(([, names]) => names.length > 0);

    expect(Object.fromEntries(templated)).toEqual({
      'ritual.constraint': ['{sentenceCount}', '{maxWords}'],
      'ritual.confirm.holdLabel': ['{ordinal}'],
      ordinal: ['{n}'],
      'ladder.pendingLine': ['{level}', '{remaining}', '{total}'],
      'ladder.sealedToast': ['{level}', '{remaining}'],
      'verdict.line': ['{nextModule}'],
      switchToast: ['{to}', '{from}'],
      'practice.hubReview': ['{count}'],
      'practice.hubRead': ['{count}'],
      'practice.hubProduce': ['{count}'],
      'practice.summaryReviewed': ['{count}'],
      'practice.summaryGotIt': ['{count}'],
      'practice.summaryProduced': ['{count}'],
      'practice.summaryAtTwo': ['{count}', '{total}'],
      'practice.resumeLine': ['{phase}', '{count}', '{total}'],
    });
  });
});

describe('the three shipped bundles', () => {
  it.each(COURSES)('%s passes the check with no issues', (courseId) => {
    expect(checkStrings(authoredStrings(courseId), courseId)).toEqual([]);
  });

  it('agrees on placeholders key for key across all three (PR #124, mechanised)', () => {
    const perCourse = COURSES.map((courseId) => flattenStrings(authoredStrings(courseId)));

    for (const key of STRINGS_KEYS) {
      const sets = perCourse.map((flat) =>
        (String(flat.get(key)).match(/\{[^{}]*\}/g) ?? []).sort(),
      );
      for (const set of sets) expect(set, key).toEqual([...STRINGS_PLACEHOLDERS[key]].sort());
    }
  });
});

describe('flattening', () => {
  it('joins nested objects on "." — ritual.check.copy is a path, not a key', () => {
    const flat = flattenStrings({ ritual: { check: { copy: 'check it' }, constraint: 'one' } });

    expect([...flat]).toEqual([
      ['ritual.check.copy', 'check it'],
      ['ritual.constraint', 'one'],
    ]);
  });

  it('keeps an empty object as a leaf, so a hollow branch cannot pass unnoticed', () => {
    expect([...flattenStrings({ ritual: {} })]).toEqual([['ritual', {}]]);
  });

  it('accepts a value written at a literal dotted key', () => {
    expect(flattenStrings({ 'retry.title': 'again' }).get('retry.title')).toBe('again');
  });
});

describe('the four rules', () => {
  it('passes a complete bundle', () => {
    expect(checkStrings(bundle(), 'hi-mr')).toEqual([]);
  });

  it('fails a missing key, naming course and key', () => {
    const issues = checkStrings(
      bundle((flat) => flat.delete('ritual.check.caption')),
      'hi-mr',
    );

    expect(issues).toEqual(['hi-mr/strings.json: missing key "ritual.check.caption"']);
  });

  it('fails an extra key as a typo tripwire, naming course and key', () => {
    const issues = checkStrings(
      bundle((flat) => {
        flat.delete('ritual.check.plateLabel');
        flat.set('ritual.check.plate', 'OUTSIDE THE APP');
      }),
      'en-es',
    );

    expect(issues).toEqual([
      'en-es/strings.json: missing key "ritual.check.plateLabel"',
      'en-es/strings.json: unknown key "ritual.check.plate" — not in the canonical list (src/course/stringsKeys.ts)',
    ]);
  });

  it.each([
    ['an empty string', '', 'an empty string'],
    ['a blank string', '   ', 'a blank string'],
    ['a number', 3, 'a number'],
    ['null', null, 'null'],
    ['an array', ['a'], 'an array'],
    ['an empty object', {}, 'an empty object'],
  ])('fails %s value, naming course and key', (_label, value, described) => {
    const issues = checkStrings(
      bundle((flat) => flat.set('retry.cta', value)),
      'en-ar',
    );

    expect(issues).toEqual([
      `en-ar/strings.json: "retry.cta" must be a non-empty string — got ${described}`,
    ]);
  });

  it('fails a leaf that grew children — the path moved, so the key is gone', () => {
    const issues = checkStrings(
      bundle((flat) => flat.set('retry.cta', { short: 'again', long: 'take fresh sentences' })),
      'hi-mr',
    );

    expect(issues).toEqual([
      'hi-mr/strings.json: missing key "retry.cta"',
      'hi-mr/strings.json: unknown key "retry.cta.short" — not in the canonical list (src/course/stringsKeys.ts)',
      'hi-mr/strings.json: unknown key "retry.cta.long" — not in the canonical list (src/course/stringsKeys.ts)',
    ]);
  });

  it('fails a dropped placeholder — a translation cannot lose {ordinal} silently', () => {
    const issues = checkStrings(
      bundle((flat) =>
        flat.set('ritual.confirm.holdLabel', 'I wrote my sentence — press and hold'),
      ),
      'en-es',
    );

    expect(issues).toEqual([
      'en-es/strings.json: "ritual.confirm.holdLabel" placeholders — expected {ordinal}, found none',
    ]);
  });

  it('fails an invented placeholder, and names both sides', () => {
    const issues = checkStrings(
      bundle((flat) => flat.set('switchToast', 'Hello {name}, you are on {to} now')),
      'hi-mr',
    );

    expect(issues).toEqual([
      'hi-mr/strings.json: "switchToast" placeholders — expected {from} {to}, found {name} {to}',
    ]);
  });

  it('tolerates reordered and repeated placeholders — the set is what matters', () => {
    const issues = checkStrings(
      bundle((flat) => flat.set('switchToast', '{from} → {to}. {to} is live now.')),
      'hi-mr',
    );

    expect(issues).toEqual([]);
  });

  it('catches a stray brace, which renders verbatim and matches nothing', () => {
    const issues = checkStrings(
      bundle((flat) => flat.set('ordinal', '{nवाँ')),
      'hi-mr',
    );

    expect(issues).toEqual([
      'hi-mr/strings.json: "ordinal" placeholders — expected {n}, found none',
      'hi-mr/strings.json: "ordinal" has a stray { or } — placeholders are written {likeThis}',
    ]);
  });

  it('rejects a file that is not an object at all', () => {
    expect(checkStrings([], 'hi-mr')).toEqual([
      'hi-mr/strings.json: must be a JSON object of microcopy keys, not an array',
    ]);
    expect(checkStrings(null, 'hi-mr')).toEqual([
      'hi-mr/strings.json: must be a JSON object of microcopy keys, not null',
    ]);
  });

  it('reports every problem in one pass, in file order', () => {
    const issues = checkStrings(
      bundle((flat) => {
        flat.delete('cueLabel');
        flat.set('revealLabel', '');
        flat.set('ordinal', 'वाँ');
        flat.set('notASetting', 'stray');
      }),
      'hi-mr',
    );

    expect(issues).toEqual([
      'hi-mr/strings.json: missing key "cueLabel"',
      'hi-mr/strings.json: "revealLabel" must be a non-empty string — got an empty string',
      'hi-mr/strings.json: "ordinal" placeholders — expected {n}, found none',
      'hi-mr/strings.json: unknown key "notASetting" — not in the canonical list (src/course/stringsKeys.ts)',
    ]);
  });
});

describe('the fixture builder', () => {
  it('scaffolds a bundle that passes, so gate tests stay about the gate', () => {
    expect(checkStrings(completeStrings('en-ar'), 'en-ar')).toEqual([]);
  });
});
