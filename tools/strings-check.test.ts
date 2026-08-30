import { readFileSync } from 'node:fs';
import path from 'node:path';
import { describe, expect, it } from 'vitest';
import { completeStrings } from './fixtures/strings.ts';
import { checkStrings, flattenStrings } from './strings-check.ts';
import { STRINGS_KEYS, STRINGS_PLACEHOLDERS, type StringsKey } from '../src/course/stringsKeys.ts';
import { DEFAULT_CONTENT_ROOT } from './validate.ts';

/**
 * The authored bundles are the source of truth for what the canonical list must say — the
 * issue text predates five PRs and lists 21 keys; the files carry 39 (PR #120, verified across
 * courses by PR #124, plus the Ladder's three in #86 and the staged rung card's seven in #87).
 * Where they disagree, the files win, so the suite checks the list AGAINST the files rather than
 * the other way round. Seven bundles now — hi-mr, en-es, en-ar, hi-en, en-ru, en-it and en-fr,
 * all seven shipping (#273, #343, #337, #331) — and the content build checks every one exactly the
 * same way. A bundle is checked whether or not its course ships: the gate decides what reaches a
 * learner, never what has to be well formed.
 */
const COURSES = ['hi-mr', 'en-es', 'en-ar', 'hi-en', 'en-ru', 'en-it', 'en-fr'] as const;

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
  it('is exactly what the seven authored bundles carry — 63 keys, nested, identical', () => {
    for (const courseId of COURSES) {
      const keys = [...flattenStrings(authoredStrings(courseId)).keys()];

      expect(keys.length, courseId).toBe(63);
      expect([...keys].sort(), courseId).toEqual([...STRINGS_KEYS].sort());
    }
    expect(STRINGS_KEYS.length).toBe(63);
    expect(new Set(STRINGS_KEYS).size).toBe(63);
  });

  /**
   * PR #120 added five keys beyond the issue text. `ritual.check.plateLabel` went with the dashed
   * resource plate on #230, and the three `ritual.stepTitle.*` went with the write half of the
   * ritual itself on #348 — the product retired notebook writing, so the Write / Check / Confirm
   * arc has no screen to title. One survivor, and it is the one that never belonged to the arc:
   * Comprehension reveals the L1 rather than the L2, so it needs a reveal label of its own.
   */
  it('carries the one key PR #120 added that survives (#230, #348)', () => {
    const added: StringsKey[] = ['revealLabelComprehend'];

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
   * The staged rung card's five (#87). Every control across the four [D22] stages is a label the
   * learner reads, and PRD-design §6.2 prints them all — in English, for every course, which is
   * what a prototype does and what a product cannot. Draft values in all three bundles, on #71.
   * Two of the seven are gone: the fresh rung's note was read once and went on #228, and
   * `practiceEarlier` went with the pending branch the same PR removed — its link pointed at a
   * Practice hub with nothing to serve for an unauthored rung. #228 left the orphaned key in
   * place; #233 retired it.
   */
  it('carries the five keys the staged rung card forced (#87, #228, #233)', () => {
    const added: StringsKey[] = [
      'rungCard.startModule',
      'rungCard.practice',
      'rungCard.revisitModule',
      'rungCard.exitRitual',
      'rungCard.module',
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
   * The session machine's (#96). PRD-design §6.3's hub, its soft phase chips and its counts-only
   * summary are learner-facing top to bottom, and the prototype writes every line of them in
   * English for every course. Draft values in all three bundles, flagged on #71.
   *
   * It forced sixteen; twelve of them are left. `practice.hubProduce`, `practice.phase.produce`,
   * `practice.summaryProduced` and `practice.summaryAtTwo` went with the Produce phase on #349,
   * and the summary's two count lines collapsed into `practice.summaryMarked` — asserted below
   * with the rest of that ticket's set, so this case stays a record of what #96 forced and what
   * survives of it.
   */
  it('carries the twelve surviving keys the session machine forced (#96)', () => {
    const added: StringsKey[] = [
      'practice.hubTitle',
      'practice.hubReview',
      'practice.hubRead',
      'practice.beginReview',
      'practice.beginRead',
      'practice.phase.review',
      'practice.phase.read',
      'practice.nothingDue',
      'practice.summaryTitle',
      'practice.summaryReviewed',
      'practice.summaryGotIt',
      'practice.backToLadder',
    ];

    for (const key of added) expect(STRINGS_KEYS).toContain(key);
  });

  /**
   * What #349 left in place of the Produce phase's keys: one summary line saying how much of the
   * rung is read through, and Read's own end-of-session pager label. The retired four (and
   * `read.toProduce`) are asserted GONE rather than merely unlisted — a key that comes back is a
   * bundle the app would then have to author a value for in seven languages.
   */
  it('carries #349’s two, and none of the five the Produce phase took with it', () => {
    for (const key of ['practice.summaryMarked', 'read.finish']) {
      expect(STRINGS_KEYS).toContain(key);
    }

    for (const retired of [
      'practice.hubProduce',
      'practice.phase.produce',
      'practice.summaryProduced',
      'practice.summaryAtTwo',
      'read.toProduce',
    ]) {
      expect(STRINGS_KEYS).not.toContain(retired);
    }
  });

  /**
   * The Read phase's five (#97). PRD-design §6.3's read-through says five things in its own right
   * — the cue toggle's two labels and its pager's three — and the prototype writes all of them in
   * English for every course. `read.prev`/`read.next` are deliberately not `sentence.prev`/`.next`:
   * that pager browses a module, this one walks a rung mid-session and its last step ends it
   * (`read.finish`, `read.toProduce` until #349). Draft values in all three bundles, flagged
   * on #71.
   */
  it('carries the five keys the Read phase forced (#97)', () => {
    const added: StringsKey[] = [
      'read.showCue',
      'read.hideCue',
      'read.prev',
      'read.next',
      'read.finish',
    ];

    for (const key of added) expect(STRINGS_KEYS).toContain(key);
    expect(STRINGS_KEYS).toContain('sentence.next');
  });

  /**
   * The Verdict's surviving three (#103, of the five it forced). PRD-design §6.7 prints the whole
   * screen in English for every course, and it is the last thing the learner reads at the end of
   * their own ritual, which makes it the last place the shell could be allowed to speak for them.
   * The other two — the third checklist line and the paragraph under the list — were read-once
   * copy and went on #231.
   *
   * Both survivors carry a number, and both are the module's own: `{ordinal}` is the course's word
   * for "the 11th" (rendered through `ordinal`) and `{count}`
   * is `exitTest.comprehendCount`, twice — "2 of 2" today, "3 of 3" for a module that asks for
   * three. Draft values in all three bundles, flagged on #71.
   */
  it('carries the three keys the Verdict forced (#103) that survive', () => {
    const added: StringsKey[] = [
      'verdict.checkSentence',
      'verdict.checkComprehension',
      'verdict.toLadder',
    ];

    for (const key of added) expect(STRINGS_KEYS).toContain(key);
    // The closing line the ritual ends on, which names the rung that just opened.
    expect(STRINGS_KEYS).toContain('verdict.line');
  });

  /**
   * The five of the six export/import forced (#108, PRD §8 F6/F7) that survive. The confirm's
   * replace warning and its two decisions, the friendly refusal and the Ladder's arrival toast
   * are all promises about the learner's own history — the last things they read before handing
   * it to a share sheet or replacing it with a file's — and the prototype writes every one in
   * English for every course, which is what a prototype does and what this product cannot. The
   * technical refusal reason under `settings.importFailed` stays English on purpose: it is
   * `ImportError`'s path-naming line, shell furniture like every stack-adjacent detail. Ratified
   * at the Sync-3 freeze (#71) with the rest of the drafts. The sixth was the explainer above the
   * export/import buttons, read-once copy that went on #232; `settings.importReplace` was cut to
   * one clause on the same ticket but kept, because it is the warning in front of a destructive
   * action.
   */
  it('carries the five keys export/import forced (#108) that survive', () => {
    const added: StringsKey[] = [
      'settings.importReplace',
      'settings.importConfirm',
      'settings.importCancel',
      'settings.importFailed',
      'importToast',
    ];

    for (const key of added) expect(STRINGS_KEYS).toContain(key);
  });

  /**
   * The retry interstitial's missing two (#69 → the Sync-3 freeze, #71), of which one survives.
   * design/tokens.md §6.3 froze five layers of course copy and the shipped build rendered three —
   * the kicker (`COMPREHEND · फिर से`, per-course because it says फिर से in the course that says
   * फिर से) and the reassurance under the body awaited keys. The freeze minted them at a count of
   * 96, and the canonical list was FROZEN there: a new key after that point is a design change.
   * #225 broke the freeze DOWNWARDS on owner instruction — the app's read-once copy is being
   * stripped — so the count now falls below §8.2's published list, and #231 took the reassurance
   * with the body it sat under. The kicker stays: without it the screen is unlabelled.
   */
  it('carries the one key the retry interstitial’s frozen spec forced (#69 → #71) that survives', () => {
    const added: StringsKey[] = ['retry.kicker'];

    for (const key of added) expect(STRINGS_KEYS).toContain(key);
  });

  /**
   * COUNTS, never time (Invariant 2) — the Sync-3 freeze's banned-vocabulary sweep (#71),
   * widened from #96's session-only scan to EVERY value in every bundle. The shell holds no
   * copy of its own, so the only door a streak, a duration or a percentage has into the product
   * is an authored bundle — which is what this reads, in all five courses. ("Today" and hi-mr's
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
      ordinal: ['{n}'],
      'ladder.pendingLine': ['{level}', '{remaining}', '{total}'],
      'ladder.sealedToast': ['{level}', '{remaining}'],
      'verdict.checkSentence': ['{ordinal}'],
      'verdict.checkComprehension': ['{count}', '{total}'],
      'verdict.line': ['{nextModule}'],
      switchToast: ['{to}', '{from}'],
      'practice.hubReview': ['{count}'],
      'practice.hubRead': ['{count}'],
      'practice.upNext': ['{phase}'],
      'practice.summaryReviewed': ['{count}'],
      'practice.summaryGotIt': ['{count}'],
      'practice.summaryMarked': ['{count}', '{total}'],
      'practice.resumeLine': ['{phase}', '{count}', '{total}'],
      'settings.statusLine': ['{level}', '{passed}', '{total}', '{rung}'],
      'settings.statusPending': ['{level}', '{passed}', '{total}'],
    });
  });
});

describe('the five authored bundles', () => {
  it.each(COURSES)('%s passes the check with no issues', (courseId) => {
    expect(checkStrings(authoredStrings(courseId), courseId)).toEqual([]);
  });

  it('agrees on placeholders key for key across all five (PR #124, mechanised)', () => {
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
  it('joins nested objects on "." — ritual.stepTitle.check is a path, not a key', () => {
    const flat = flattenStrings({
      ritual: { stepTitle: { check: 'Check' }, constraint: 'one' },
    });

    expect([...flat]).toEqual([
      ['ritual.stepTitle.check', 'Check'],
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
      bundle((flat) => flat.delete('retry.cta')),
      'hi-mr',
    );

    expect(issues).toEqual(['hi-mr/strings.json: missing key "retry.cta"']);
  });

  it('fails an extra key as a typo tripwire, naming course and key', () => {
    const issues = checkStrings(
      bundle((flat) => {
        flat.delete('retry.kicker');
        flat.set('retry.kickers', 'Again');
      }),
      'en-es',
    );

    expect(issues).toEqual([
      'en-es/strings.json: missing key "retry.kicker"',
      'en-es/strings.json: unknown key "retry.kickers" — not in the canonical list (src/course/stringsKeys.ts)',
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
      bundle((flat) => flat.set('verdict.checkSentence', 'You wrote a new sentence')),
      'en-es',
    );

    expect(issues).toEqual([
      'en-es/strings.json: "verdict.checkSentence" placeholders — expected {ordinal}, found none',
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
