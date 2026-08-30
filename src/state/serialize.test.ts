/**
 * The export contract, proved (#104, PRD §8 F7) — four laws, each with its own section:
 *
 *   1. **Round-trip.** `importState(exportState(s))` deep-equals `s` — once over the rich
 *      hand-built fixture, and as a property over seeded random states (two courses, passed
 *      modules, queues, snapshots), because the law has to hold for every state the app can
 *      reach, not the one the test author thought of.
 *   2. **The file reads like F7.** The PRD's example document imports cleanly, the export is
 *      2-space with F7's key order and sorted maps, and two exports of the same state are the
 *      same bytes however the maps were built up.
 *   3. **A bad file is refused with a reason that names a path.** Wrong versions, missing
 *      fields, a wrong enum, an unknown key, a stray map key — every one an `ImportError`
 *      whose reason a screen can show as it is (#105/#108).
 *   4. **Older documents go through the store's `migrate`, and Invariant 4 holds.** A v5
 *      payload imports as the same wrap the rehydrate path would produce (one migration, not a
 *      copy — asserted over `serialize.ts`'s source too), and no string vocabulary in the
 *      shape accepts learner-authored text — walked off `STATE_V10` itself, so a field added to
 *      the shape is a field added to this assertion.
 */
import { describe, expect, it } from 'vitest';
import { ImportError, STATE_V10, exportState, importState } from './serialize.ts';
import { emptyCourseState, migrate } from './store.ts';
import type { AppState, CourseState, LeitnerBox, SessionPhase } from './types.ts';

/* ------------------------------------------------------------------------ the fixtures */

/**
 * A state that exercises every branch of the shape: two courses, passed modules, production
 * counters, a review queue with an overdue item (negative countdown, Invariant 2), a live
 * session snapshot in one course and `null` in the other.
 */
function richState(): AppState {
  return {
    stateVersion: 10,
    activeCourse: 'hi-mr',
    courses: {
      'hi-mr': {
        modules: {
          'L1-M1': { status: 'passed', passedAt: '2026-02-02T02:40:00.000Z' },
          'L1-M2': { status: 'passed', passedAt: '2026-03-15T18:05:12.345Z' },
        },
        production: { 'L1-M3-S01': 2, 'L1-M3-S02': 1 },
        reviewQueue: [
          { sentenceId: 'L1-M1-S03', box: 2, dueInSessions: 1 },
          { sentenceId: 'L1-M2-S07', box: 1, dueInSessions: -2 },
        ],
        sessionCount: 14,
        studied: { 'L1-M3': true, 'L1-M4': false },
        session: { phase: 'read', idx: 4, queue: ['L1-M3-S01', 'L1-M3-S02'] },
      },
      'en-ar': emptyCourseState(),
    },
    // A SET language (#322), so the rich state exercises the populated branch of the vocabulary;
    // the randomised state below covers the unset `''` sentinel.
    settings: { elapsedTickEnabled: true, userLang: 'hi' },
  };
}

/**
 * PRD §8 F7's example document, verbatim in shape and key order — the session queue's `"…"`
 * placeholder filled with real sentence ids, because the example elides what the contract
 * requires.
 */
const F7_EXAMPLE = `{
  "stateVersion": 8,
  "activeCourse": "hi-mr",
  "courses": {
    "hi-mr": {
      "modules": { "L1-M1": { "status": "passed", "passedAt": "2026-02-02T02:40:00.000Z" } },
      "production": { "L1-M3-S01": 2 },
      "reviewQueue": [ { "sentenceId": "L1-M1-S03", "box": 2, "dueInSessions": 1 } ],
      "sessionCount": 14, "studied": { "L1-M3": true },
      "session": { "phase": "read", "idx": 4, "queue": ["L1-M3-S01", "L1-M3-S02"] }
    },
    "en-ar": { "modules": {}, "production": {}, "reviewQueue": [], "sessionCount": 0, "studied": {}, "session": null }
  },
  "settings": { "elapsedTickEnabled": true }
}`;

/** The rich fixture as a parsed document — the base every malformed fixture below mutates. */
function document_(): Record<string, unknown> {
  return JSON.parse(exportState(richState())) as Record<string, unknown>;
}

/** Imports a mutated document and answers the `ImportError` it must throw. */
function refusal(mutate: (parsed: Record<string, unknown>) => void): ImportError {
  const parsed = document_();
  mutate(parsed);
  try {
    importState(JSON.stringify(parsed));
  } catch (error) {
    if (error instanceof ImportError) return error;
    throw error;
  }
  throw new Error('importState accepted a document it must refuse');
}

/** The hi-mr subtree of a parsed document, for fixtures that reach inside a course. */
function hiMr(parsed: Record<string, unknown>): Record<string, unknown> {
  const courses = parsed['courses'] as Record<string, Record<string, unknown>>;
  const course = courses['hi-mr'];
  if (course === undefined) throw new Error('the rich fixture holds hi-mr');
  return course;
}

/* -------------------------------------------------------------- the property generator */

/** Mulberry32 — a tiny seeded PRNG, so a red run names a seed a human can replay. */
function mulberry32(seed: number): () => number {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** A random state built only from vocabulary-legal parts — what the app could actually hold. */
function generateState(rand: () => number): AppState {
  const int = (max: number): number => Math.floor(rand() * (max + 1));
  const pick = <T>(items: readonly T[]): T => {
    const item = items[int(items.length - 1)];
    if (item === undefined) throw new Error('pick: empty list');
    return item;
  };
  const sentenceId = (): string =>
    `L${1 + int(2)}-M${1 + int(9)}-S${String(1 + int(9)).padStart(2, '0')}`;
  const instant = (): string =>
    `202${int(6)}-0${1 + int(8)}-1${int(9)}T0${int(9)}:1${int(9)}:2${int(9)}.${String(int(999)).padStart(3, '0')}Z`;

  const course = (): CourseState => {
    const modules: CourseState['modules'] = {};
    const production: CourseState['production'] = {};
    const studied: CourseState['studied'] = {};
    for (let i = 0; i < int(3); i += 1) {
      modules[`L${1 + int(2)}-M${1 + int(9)}`] = { status: 'passed', passedAt: instant() };
    }
    for (let i = 0; i < int(4); i += 1) production[sentenceId()] = int(5);
    for (let i = 0; i < int(3); i += 1) studied[`L${1 + int(2)}-M${1 + int(9)}`] = rand() < 0.7;

    return {
      modules,
      production,
      reviewQueue: Array.from({ length: int(4) }, () => ({
        sentenceId: sentenceId(),
        box: pick<LeitnerBox>([1, 2, 3]),
        dueInSessions: int(10) - 4,
      })),
      sessionCount: int(50),
      studied,
      session:
        rand() < 0.4
          ? null
          : {
              phase: pick<SessionPhase>(['review', 'read']),
              idx: int(8),
              queue: Array.from({ length: int(5) }, sentenceId),
            },
    };
  };

  const courseIds = ['hi-mr', 'en-ar', 'de', 'x9-longcourse-id'];
  const courses: AppState['courses'] = {};
  for (const courseId of courseIds.slice(0, int(3))) courses[courseId] = course();

  return {
    stateVersion: 10,
    activeCourse: rand() < 0.2 ? '' : pick(courseIds),
    courses,
    settings: {
      elapsedTickEnabled: rand() < 0.5,
      // Both branches of the vocabulary, at the same 1-in-5 rate the empty `activeCourse` takes:
      // unset is a real persisted state, not a gap, so the round-trip law has to hold over it.
      userLang: rand() < 0.2 ? '' : pick(['hi', 'en', 'ar-Latn']),
    },
  };
}

/* ------------------------------------------------------- the v8 → v9 language field (#322) */

describe('a v8 backup predates the user language', () => {
  /** A v8 document: the shape before `settings.userLang` existed. */
  const V8 = `{
  "stateVersion": 8,
  "activeCourse": "hi-mr",
  "courses": {
    "hi-mr": {
      "modules": {},
      "production": {},
      "reviewQueue": [],
      "sessionCount": 3,
      "studied": {},
      "session": null
    }
  },
  "settings": { "elapsedTickEnabled": true }
}`;

  /**
   * The upgrade a real learner takes. Their file was written by an app that had no notion of a
   * user language, and it must still open — landing on the unset sentinel, which resolves to the
   * active course's own L1 and is therefore the behaviour they already had.
   */
  it('imports cleanly and lands with the language unset', () => {
    const state = importState(V8);

    expect(state.stateVersion).toBe(10);
    expect(state.settings.userLang).toBe('');
    // And nothing they earned is lost on the way through.
    expect(state.courses['hi-mr']?.sessionCount).toBe(3);
  });

  it('re-exports at the current version, so the next import needs no migration at all', () => {
    const round = importState(exportState(importState(V8)));

    expect(round.stateVersion).toBe(10);
    expect(round.settings.userLang).toBe('');
  });

  /** A v9 document with a language SET keeps it — the field is carried, not re-defaulted. */
  it('keeps a language the learner chose', () => {
    const chosen = exportState({
      ...richState(),
      settings: { elapsedTickEnabled: true, userLang: 'en' },
    });

    expect(importState(chosen).settings.userLang).toBe('en');
  });
});

/* --------------------------------------------------------------------- 1. the round trip */

describe('the round-trip law', () => {
  it('importState(exportState(s)) deep-equals s for the rich fixture', () => {
    const state = richState();

    expect(importState(exportState(state))).toEqual(state);
  });

  it('holds as a property over seeded random states', () => {
    for (let seed = 1; seed <= 30; seed += 1) {
      const state = generateState(mulberry32(seed));

      expect(importState(exportState(state)), `seed ${seed}`).toEqual(state);
    }
  });
});

/* ------------------------------------------------------------------------- 2. the file */

describe('the exported file', () => {
  it("imports PRD §8 F7's example document cleanly", () => {
    const state = importState(F7_EXAMPLE);

    expect(state.activeCourse).toBe('hi-mr');
    expect(state.courses['hi-mr']?.modules['L1-M1']).toEqual({
      status: 'passed',
      passedAt: '2026-02-02T02:40:00.000Z',
    });
    expect(state.courses['en-ar']).toEqual(emptyCourseState());
    // And the example survives its own round trip — F7's document IS an export.
    expect(importState(exportState(state))).toEqual(state);
  });

  it("is 2-space indented in F7's key order, maps sorted", () => {
    const file = exportState(richState());
    const parsed = JSON.parse(file) as Record<string, unknown>;

    expect(file.startsWith('{\n  "stateVersion": 10,\n  "activeCourse"')).toBe(true);
    expect(Object.keys(parsed)).toEqual(['stateVersion', 'activeCourse', 'courses', 'settings']);
    expect(Object.keys(hiMr(parsed))).toEqual([
      'modules',
      'production',
      'reviewQueue',
      'sessionCount',
      'studied',
      'session',
    ]);
    expect(Object.keys(parsed['courses'] as object)).toEqual(['en-ar', 'hi-mr']);
  });

  it('writes the same bytes however the maps were built up', () => {
    const state = richState();
    const rebuilt: AppState = {
      ...state,
      // Every map rebuilt with its entries in reverse insertion order.
      courses: Object.fromEntries(
        Object.entries(state.courses)
          .reverse()
          .map(([courseId, course]) => [
            courseId,
            {
              ...course,
              modules: Object.fromEntries(Object.entries(course.modules).reverse()),
              production: Object.fromEntries(Object.entries(course.production).reverse()),
              studied: Object.fromEntries(Object.entries(course.studied).reverse()),
            },
          ]),
      ),
    };

    expect(exportState(rebuilt)).toBe(exportState(state));
  });
});

/* ----------------------------------------------------------------------- 3. the refusals */

describe('a bad file is refused with a reason that names a path', () => {
  it('a file that is not JSON', () => {
    expect(() => importState('not json at all')).toThrowError(ImportError);
    expect(() => importState('not json at all')).toThrowError(/state: this file is not JSON/);
  });

  it('a document that is not an object', () => {
    expect(() => importState('[1, 2, 3]')).toThrowError(ImportError);
  });

  it('a missing or non-integer stateVersion', () => {
    expect(refusal((parsed) => delete parsed['stateVersion']).reason).toContain(
      'state.stateVersion',
    );
    expect(refusal((parsed) => (parsed['stateVersion'] = 'six')).reason).toContain(
      'state.stateVersion',
    );
  });

  it('a newer document — v11 says update rung, not import less', () => {
    const error = refusal((parsed) => (parsed['stateVersion'] = 11));

    expect(error.reason).toContain('v11');
    expect(error.reason).toContain('update rung');
  });

  /**
   * Invariant 4 in its narrowest form (#322): `userLang` is a bounded vocabulary, so a document
   * carrying free text where a language tag belongs is refused — and the refusal names the path,
   * because a file a learner has to fix is only fixable if the reason says where.
   */
  it('a userLang that is not a language tag, named down to the field', () => {
    const error = refusal(
      (parsed) => ((parsed['settings'] as Record<string, unknown>)['userLang'] = 'not a tag!'),
    );

    expect(error.reason).toContain('state.settings.userLang');
    expect(error.reason).toContain('BCP-47');
  });

  it('a version older than any migration route', () => {
    const error = refusal((parsed) => (parsed['stateVersion'] = 4));

    expect(error.reason).toContain('v4');
    expect(error.reason).toContain('v5');
  });

  it('a missing course field', () => {
    const error = refusal((parsed) => delete hiMr(parsed)['reviewQueue']);

    expect(error.reason).toContain('state.courses.hi-mr.reviewQueue');
    expect(error.reason).toContain('found nothing');
  });

  it('a wrong box enum, named down to the item', () => {
    const error = refusal((parsed) => {
      (hiMr(parsed)['reviewQueue'] as { box: number }[])[0]!.box = 4;
    });

    expect(error.reason).toContain('state.courses.hi-mr.reviewQueue[0].box');
    expect(error.reason).toContain('1, 2 or 3');
  });

  it('an unknown extra key, at the root and inside a course', () => {
    expect(refusal((parsed) => (parsed['attempts'] = [])).reason).toContain(
      'state.attempts: unknown key',
    );
    expect(refusal((parsed) => (hiMr(parsed)['notes'] = 'my notes')).reason).toContain(
      'state.courses.hi-mr.notes: unknown key',
    );
  });

  it('a map key that is not in its vocabulary — where a stray sentence would hide', () => {
    const error = refusal((parsed) => {
      (hiMr(parsed)['production'] as Record<string, number>)['मैं पानी पीता हूँ'] = 2;
    });

    expect(error.reason).toContain('state.courses.hi-mr.production');
    expect(error.reason).toContain('"मैं पानी पीता हूँ" is not');
  });

  it('a malformed passedAt — the one date, shape-checked', () => {
    const error = refusal((parsed) => {
      (hiMr(parsed)['modules'] as Record<string, { passedAt: string }>)['L1-M1']!.passedAt =
        'yesterday';
    });

    expect(error.reason).toContain('state.courses.hi-mr.modules.L1-M1.passedAt');
  });
});

/* ------------------------------------------------------- 4. migration route + Invariant 4 */

describe('older documents route through the store migration', () => {
  const v5 = {
    stateVersion: 5,
    modules: { 'L1-M1': { status: 'passed', passedAt: '2026-02-02T02:40:00.000Z' } },
    production: { 'L1-M3-S01': 2 },
    settings: { elapsedTickEnabled: false },
  };

  it("imports a v5 payload as the wrap under courses['hi-mr'] (F7)", () => {
    const state = importState(JSON.stringify(v5));

    // The very answer `migrate` gives the rehydrate path — one migration, not a copy of it.
    expect(state).toEqual(migrate(v5, 5));
    expect(state.activeCourse).toBe('hi-mr');
    expect(state.courses['hi-mr']).toEqual({
      ...emptyCourseState(),
      modules: { 'L1-M1': { status: 'passed', passedAt: '2026-02-02T02:40:00.000Z' } },
      production: { 'L1-M3-S01': 2 },
    });
    expect(state.settings).toEqual({ elapsedTickEnabled: false, userLang: '' });
  });

  it('imports a v6 backup written before the notebook bit existed — an export outlives the app that wrote it', () => {
    const v6 = {
      stateVersion: 6,
      activeCourse: 'hi-mr',
      courses: { 'hi-mr': emptyCourseState() },
      settings: { elapsedTickEnabled: false },
    };

    const state = importState(JSON.stringify(v6));

    expect(state).toEqual(migrate(v6, 6));
    expect(state.stateVersion).toBe(10);
    expect(state.settings).toEqual({ elapsedTickEnabled: false, userLang: '' });
  });

  it('imports a v7 backup carrying the retired invitation bit — the field v8 refuses (#227)', () => {
    const v7 = `{
  "stateVersion": 7,
  "activeCourse": "hi-mr",
  "courses": {
    "hi-mr": {
      "modules": { "L1-M1": { "status": "passed", "passedAt": "2026-02-02T02:40:00.000Z" } },
      "production": { "L1-M3-S01": 2 },
      "reviewQueue": [ { "sentenceId": "L1-M1-S03", "box": 2, "dueInSessions": 1 } ],
      "sessionCount": 14, "studied": { "L1-M3": true },
      "session": { "phase": "read", "idx": 4, "queue": ["L1-M3-S01", "L1-M3-S02"] }
    }
  },
  "settings": { "elapsedTickEnabled": false, "notebookInvitationDismissed": true }
}`;

    const state = importState(v7);

    // A learner's file outlives the app that wrote it: everything they earned comes back, and
    // the one field v8 retired is left behind by the migration rather than refused by `object`.
    expect(state.stateVersion).toBe(10);
    expect(state.settings).toEqual({ elapsedTickEnabled: false, userLang: '' });
    expect(state.courses['hi-mr']?.sessionCount).toBe(14);
    expect(state.courses['hi-mr']?.session).toEqual({
      phase: 'read',
      idx: 4,
      queue: ['L1-M3-S01', 'L1-M3-S02'],
    });
    // And what came back is a document this build can write out and read again.
    expect(importState(exportState(state))).toEqual(state);
    expect(exportState(state)).not.toContain('notebookInvitationDismissed');
  });

  it('validates what the migration answers — the wrap is trusted to wrap, never to bless', () => {
    const poisoned = JSON.stringify({ ...v5, production: { 'L1-M3-S01': 'twice' } });

    expect(() => importState(poisoned)).toThrowError(ImportError);
    expect(() => importState(poisoned)).toThrowError(/state\.courses\.hi-mr\.production/);
  });

  it("shares the store's migrate by import — serialize.ts declares no second migration", () => {
    const source = Object.values(
      import.meta.glob<string>('/src/state/serialize.ts', {
        query: '?raw',
        import: 'default',
        eager: true,
      }),
    )[0];
    if (source === undefined) throw new Error('serialize.ts source not found');

    expect(source).toMatch(/import\s*\{[^}]*\bmigrate\b[^}]*\}\s*from\s*'\.\/store\.ts'/);
    expect(source).not.toMatch(/function migrate/);
  });
});

describe('Invariant 4 — no field can hold learner-authored text', () => {
  /** What a learner might actually write — each must be rejected by EVERY vocabulary. */
  const learnerText = [
    'मैं ठीक हूँ',
    'mī pāṇī pito',
    'I forgot the word for water today',
    'L1-M1-S03 but with my own note attached',
    'two\nlines',
    'a'.repeat(200),
  ];

  it('every string vocabulary in the shape rejects learner text', () => {
    // Walked off the shape itself: a field added to `types.ts` reaches the export only through
    // `STATE_V10`, and its vocabulary lands in this list without this test changing.
    expect(STATE_V10.strings.length).toBeGreaterThan(0);

    for (const vocabulary of STATE_V10.strings) {
      for (const text of learnerText) {
        expect(
          vocabulary.accepts(text),
          `"${vocabulary.name}" accepted ${JSON.stringify(text)}`,
        ).toBe(false);
      }
    }
  });

  it('a document smuggling text where an id belongs is refused', () => {
    const error = refusal((parsed) => {
      (hiMr(parsed)['session'] as { queue: string[] }).queue.push('मैं पानी पीता हूँ');
    });

    expect(error.reason).toContain('state.courses.hi-mr.session.queue[2]');
  });
});
