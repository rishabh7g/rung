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
  it('is exactly what the three shipped bundles carry — 83 keys, nested, identical', () => {
    for (const courseId of COURSES) {
      const keys = [...flattenStrings(authoredStrings(courseId)).keys()];

      expect(keys.length, courseId).toBe(83);
      expect([...keys].sort(), courseId).toEqual([...STRINGS_KEYS].sort());
    }
    expect(STRINGS_KEYS.length).toBe(83);
    expect(new Set(STRINGS_KEYS).size).toBe(83);
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
   * The Ladder's two survivors (#86). PRD-design §5 prints three lines as copy — the counts-only
   * pending line, the ownership footer, the sealed-cell toast — and PRD §4's inventory never
   * listed them, so the screen would otherwise have had to hardcode them in the shell. The
   * ownership footer was read-once copy and went on #228; these two stayed.
   */
  it('carries the two keys the Ladder forced that survive (#86, #228)', () => {
    const added: StringsKey[] = ['ladder.pendingLine', 'ladder.sealedToast'];

    for (const key of added) expect(STRINGS_KEYS).toContain(key);
  });

  /**
   * The staged rung card's six (#87). Every control across the four [D22] stages is a label the
   * learner reads, and PRD-design §6.2 prints them all — in English, for every course, which is
   * what a prototype does and what a product cannot. Draft values in all three bundles, on #71;
   * the seventh was the fresh rung's note, read once and removed on #228.
   */
  it('carries the six keys the staged rung card forced (#87, #228)', () => {
    const added: StringsKey[] = [
      'rungCard.startModule',
      'rungCard.practice',
      'rungCard.revisitModule',
      'rungCard.exitRitual',
      'rungCard.module',
      'rungCard.practiceEarlier',
    ];

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
   * ("why" / "hide why") and it names what it will do; `why.openFull` was deliberately never
   * shared with the module list's own "open full" label — one opened a sentence from a browsing
   * list, the other leaves a running session for it, and a shared key would mean a course could
   * never word them differently (the call #93 made for `mark.next` against `sentence.next`). The
   * list's twin rendered nowhere in the end and went on #229; these three stayed. Draft values in
   * all three bundles, flagged on #71.
   */
  it('carries the three keys the "why" panel forced (#94)', () => {
    const added: StringsKey[] = ['why.show', 'why.hide', 'why.openFull'];

    for (const key of added) expect(STRINGS_KEYS).toContain(key);
  });

  /**
   * The session machine's sixteen (#96). PRD-design §6.3's hub, its soft phase chips and its
   * counts-only summary are learner-facing top to bottom, and the prototype writes every line of
   * them in English for every course. Draft values in all three bundles, flagged on #71.
   */
  it('carries the sixteen keys the session machine forced (#96)', () => {
    const added: StringsKey[] = [
      'practice.hubTitle',
      'practice.hubReview',
      'practice.hubRead',
      'practice.hubProduce',
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
   * phase (`read.toProduce`). Draft values in all three bundles, flagged on #71.
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
    expect(STRINGS_KEYS).toContain('sentence.next');
  });

  /**
   * The Verdict's five (#103). PRD-design §6.7 prints the whole screen — the three checklist
   * lines, the honesty line under them and the CTA that climbs back — in English for every
   * course, and it is the last thing the learner reads at the end of their own ritual, which
   * makes it the last place the shell could be allowed to speak for them.
   *
   * Two carry a number, and both are the module's own: `{ordinal}` is the course's word for "the
   * 11th" (rendered through `ordinal`, as `ritual.confirm.holdLabel` does) and `{count}` is
   * `exitTest.comprehendCount`, twice — "2 of 2" today, "3 of 3" for a module that asks for
   * three. Draft values in all three bundles, flagged on #71.
   */
  it('carries the five keys the Verdict forced (#103)', () => {
    const added: StringsKey[] = [
      'verdict.checkSentence',
      'verdict.checkChecked',
      'verdict.checkComprehension',
      'verdict.honesty',
      'verdict.toLadder',
    ];

    for (const key of added) expect(STRINGS_KEYS).toContain(key);
    // The honesty line the ritual has always ended on, which names the rung that just opened.
    expect(STRINGS_KEYS).toContain('verdict.line');
  });

  /**
   * The Backup section's six (#108, PRD §8 F6/F7). The explainer, the confirm's replace warning
   * and its two decisions, the friendly refusal and the Ladder's arrival toast are all promises
   * about the learner's own history — the last things they read before handing it to a share
   * sheet or replacing it with a file's — and the prototype writes every one in English for
   * every course, which is what a prototype does and what this product cannot. The technical
   * refusal reason under `settings.importFailed` stays English on purpose: it is `ImportError`'s
   * path-naming line, shell furniture like every stack-adjacent detail. Ratified at the Sync-3
   * freeze (#71) with the rest of the drafts.
   */
  it('carries the six keys export/import forced (#108)', () => {
    const added: StringsKey[] = [
      'settings.backupNote',
      'settings.importReplace',
      'settings.importConfirm',
      'settings.importCancel',
      'settings.importFailed',
      'importToast',
    ];

    for (const key of added) expect(STRINGS_KEYS).toContain(key);
  });

  /**
   * The retry interstitial's missing two (#69 → the Sync-3 freeze, #71). design/tokens.md §6.3
   * froze five layers of course copy and the shipped build rendered three — the kicker
   * (`COMPREHEND · फिर से`, per-course because it says फिर से in the course that says फिर से) and
   * the reassurance ("unlimited retries; nothing is counted against you") awaited keys. The
   * freeze minted them at a count of 96, and the canonical list was FROZEN there: a new key after
   * that point is a design change. #225 broke the freeze DOWNWARDS on owner instruction — the
   * app's read-once copy is being stripped — so the count now falls below §8.2's published list.
   */
  it('carries the two keys the retry interstitial’s frozen spec forced (#69 → #71)', () => {
    const added: StringsKey[] = ['retry.kicker', 'retry.reassure'];

    for (const key of added) expect(STRINGS_KEYS).toContain(key);
  });

  /**
   * COUNTS, never time (Invariant 2) — the Sync-3 freeze's banned-vocabulary sweep (#71),
   * widened from #96's session-only scan to EVERY value in every bundle. The shell holds no
   * copy of its own, so the only door a streak, a duration or a percentage has into the product
   * is an authored bundle — which is what this reads, in all three courses. ("Today" and hi-mr's
   * "आज" pass by construction: the word-bounded scan bans the calendar's units, not every word
   * that contains one — ratified at the freeze alongside the scheduler's "due", which counts
   * sessions, never days.)
   */
  it('has no time, duration or percentage anywhere in any course’s copy', () => {
    const TIME =
      /%|\b(streak|second|seconds|minute|minutes|hour|hours|day|days|week|weeks|month|months|min|sec)\b/i;

    for (const courseId of COURSES) {
      const flat = flattenStrings(authoredStrings(courseId));

      for (const [key, value] of flat) {
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
      'verdict.checkSentence': ['{ordinal}'],
      'verdict.checkComprehension': ['{count}', '{total}'],
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
      'settings.statusLine': ['{level}', '{passed}', '{total}', '{rung}'],
      'settings.statusPending': ['{level}', '{passed}', '{total}'],
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
