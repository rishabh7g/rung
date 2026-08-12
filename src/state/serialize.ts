/**
 * The export contract (#104) — state v7 as one file, and the only door back in (PRD §8 F7,
 * docs/01-plan.md §6).
 *
 * There is no backend and no account, so this file IS the learner's history: every ladder, every
 * counter, every queue, in one JSON document that leaves the device only when they send it. Two
 * functions, and both of them are contracts rather than conveniences:
 *
 *   • `exportState` writes the document. Two-space indent, F7's key order, and every map sorted by
 *     its key — a human reads these, and a diff between two exports should show what CHANGED
 *     rather than what got re-serialised in a different order.
 *   • `importState` reads one back, and TRUSTS NOTHING. A file has no provenance: it has been
 *     through a share sheet, a chat app, a text editor and a version of this app that may not be
 *     this one. So every field is validated by hand — no schema dependency, because the shape is
 *     small, the reasons have to name a path a person can find, and a validator that ships as data
 *     is a second declaration of the shape waiting to disagree with `types.ts`.
 *
 * **The migration is the store's, not a copy of it.** A document older than v7 is routed through
 * `migrate` from `store.ts` — the same function `persist` runs on rehydrate — so a file and a
 * reload can never disagree about what a v5 document means. What this module adds is the
 * validation of the RESULT: the rehydrate path reads what this app itself wrote, the import path
 * reads what someone sent, and only the second one has to be suspicious.
 *
 * **Invariant 4 is asserted here, mechanically.** Every string the shape can hold declares its
 * VOCABULARY — a course/module/sentence id, a closed enum, or the one ISO instant — and there is
 * no vocabulary for free text, because there is no field for it: the app never evaluates, grades
 * or stores what the learner wrote. `serialize.test.ts` walks the vocabularies off the shape below
 * and fails if any of them would accept a sentence, so "no learner-authored text exists anywhere"
 * (F7's own words) is a test rather than a promise.
 */
import { OLDEST_MIGRATABLE_VERSION, migrate } from './store.ts';
import {
  STATE_VERSION,
  type AppState,
  type CourseState,
  type LeitnerBox,
  type ModuleProgress,
  type ReviewItem,
  type SessionPhase,
  type SessionSnapshot,
  type Settings,
} from './types.ts';

/* --------------------------------------------------------------------------- the failure */

/**
 * Why a file could not be imported, in one sentence a screen can show as it is (#105/#108 own the
 * screen). One type, so a caller can tell "this file is not a rung export" from a bug of its own —
 * and `reason` is the same text as `message`, named so the UI never has to reach for `.message`
 * and get a stack-shaped string from somewhere else.
 */
export class ImportError extends Error {
  /** What is wrong and WHERE: reasons name a path, `state.courses.hi-mr.reviewQueue[0].box`. */
  readonly reason: string;

  constructor(reason: string) {
    super(reason);
    this.name = 'ImportError';
    this.reason = reason;
  }
}

/** The root of every path in a reason. Short, and it names the thing rather than the file. */
const DOCUMENT = 'state';

/* ------------------------------------------------------------------------ the vocabulary */

/**
 * A kind of string state v7 may hold, and the test of whether a given string is one.
 *
 * **This list is Invariant 4's surface.** Every string in the document is an id the CONTENT
 * authored, a member of a closed enum, or the one timestamp — none of which can express a
 * sentence: no spaces, no script characters, and a bounded length. There is deliberately no
 * `text` vocabulary, and adding one would be the moment this app started keeping what the learner
 * wrote. `serialize.test.ts` gathers these off the shape and fails if any accepts learner text.
 */
export interface Vocabulary {
  /** Reads inside a reason: "expected a module id like L1-M1, found …". */
  readonly name: string;
  readonly accepts: (value: string) => boolean;
}

function pattern(name: string, shape: RegExp): Vocabulary {
  return { name, accepts: (value) => shape.test(value) };
}

/**
 * The four vocabularies, and every one of them is bounded.
 *
 * The id patterns are a shade wider than what the ladder ships today (3 levels × 10 rungs,
 * `content/schema/module.schema.json`) on purpose: an export must outlive the size of the ladder
 * that wrote it, and a file that stopped importing because L4 shipped would be the export contract
 * failing at the one job it has. Wider, not open — a bound is what makes these identifiers.
 *
 * `instant` is checked as a SHAPE rather than parsed. Parsing would construct a date, and
 * `clock.ts` is the app's only date-construction site (`clock.test.ts` scans for exactly that);
 * the app's one writer of this field is `systemClock()`, whose output is this pattern verbatim.
 */
const VOCABULARY = {
  /** A manifest course id — `hi-mr`, `en-ar`. The same alphabet `tools/content-build.ts` enforces. */
  courseId: pattern('a course id like hi-mr', /^[a-z0-9]{1,16}(-[a-z0-9]{1,16}){0,3}$/),
  /** A module id as authored — `L1-M1`. */
  moduleId: pattern('a module id like L1-M1', /^L\d{1,2}-M\d{1,2}$/),
  /** A sentence id — `L1-M1-S03`; `-C03` is the comprehension pool's, which state never keys on. */
  sentenceId: pattern('a sentence id like L1-M1-S03', /^L\d{1,2}-M\d{1,2}-[SC]\d{2}$/),
  /** `systemClock()`'s output, exactly: `2026-02-02T02:40:00.000Z`. */
  instant: pattern(
    'an ISO-8601 instant like 2026-02-02T02:40:00.000Z',
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/,
  ),
} as const;

/**
 * `activeCourse` is a course id **or** `''` — the first-run value, before a boot has resolved one
 * (`CourseProvider`). It is not cross-checked against `courses`, and that is Invariant 8 rather
 * than laziness: when a course's content is missing from a build the app falls back to another one
 * and LEAVES the stored id alone, so the course gets its ladder back when the folder returns. A
 * validator that demanded a matching subtree would refuse exactly that document.
 */
const ACTIVE_COURSE: Vocabulary = {
  name: `${VOCABULARY.courseId.name}, or "" before the first boot resolves one`,
  accepts: (value) => value === '' || VOCABULARY.courseId.accepts(value),
};

/* ------------------------------------------------------------------------- the combinators */

/**
 * One node of the shape: how to READ it out of a parsed file (or throw naming its path), how to
 * WRITE it as canonical JSON, and which string vocabularies it can hold.
 *
 * Read and write live together deliberately — they are the two halves of one contract, and the
 * round-trip law (`importState(exportState(s))` deep-equals `s`) is only checkable because neither
 * half can be changed without the other being right there.
 */
export interface Shape<T> {
  /** What this accepts, in a phrase a reason can end with: "a whole number ≥ 0". */
  readonly expected: string;
  /** Answers `value` as a `T`, or throws `ImportError` naming `path`. */
  readonly read: (value: unknown, path: string) => T;
  /** `value` as canonical JSON: this shape's key order, maps sorted by key. */
  readonly write: (value: T) => unknown;
  /** Every string vocabulary this subtree can hold — Invariant 4's mechanical surface. */
  readonly strings: readonly Vocabulary[];
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function fail(path: string, expected: string, found: unknown): never {
  throw new ImportError(`${path}: expected ${expected}, found ${describe(found)}`);
}

/** The offending value, short enough to read in one line. `undefined` is a missing key. */
function describe(value: unknown): string {
  if (value === undefined) return 'nothing';
  const printed = JSON.stringify(value) ?? String(value);
  return printed.length > 40 ? `${printed.slice(0, 39)}…` : printed;
}

/** `1, 2 or 3` — the closed list as a person would say it. */
function phrase(values: readonly (string | number)[]): string {
  const printed = values.map((value) => JSON.stringify(value));
  const last = printed.at(-1) ?? '';
  return printed.length < 2 ? last : `${printed.slice(0, -1).join(', ')} or ${last}`;
}

/** Exactly this value and nothing else — `stateVersion: 6`, `status: 'passed'`. */
function literal<T extends string | number>(value: T): Shape<T> {
  const expected = phrase([value]);
  return {
    expected,
    read: (found, path) => (found === value ? value : fail(path, expected, found)),
    write: () => value,
    strings: typeof value === 'string' ? [closed([value])] : [],
  };
}

/** One of a closed list — the Leitner boxes, the session phases. */
function enumOf<T extends string | number>(values: readonly T[]): Shape<T> {
  const expected = phrase(values);
  const members: readonly unknown[] = values;
  return {
    expected,
    read: (found, path) => (members.includes(found) ? (found as T) : fail(path, expected, found)),
    write: (value) => value,
    strings: [closed(values.filter((value): value is T & string => typeof value === 'string'))],
  };
}

/** A closed list of literals, as a vocabulary: it accepts its members and nothing else. */
function closed(values: readonly string[]): Vocabulary {
  return { name: phrase(values), accepts: (value) => values.includes(value) };
}

/** A string from one vocabulary — every string in the document goes through here. */
function id(vocabulary: Vocabulary): Shape<string> {
  return {
    expected: vocabulary.name,
    read: (found, path) =>
      typeof found === 'string' && vocabulary.accepts(found)
        ? found
        : fail(path, vocabulary.name, found),
    write: (value) => value,
    strings: [vocabulary],
  };
}

function integer(expected: string, min?: number): Shape<number> {
  return {
    expected,
    read: (found, path) =>
      typeof found === 'number' && Number.isInteger(found) && (min === undefined || found >= min)
        ? found
        : fail(path, expected, found),
    write: (value) => value,
    strings: [],
  };
}

/**
 * A count: whole, and never below zero. `sessionCount`, the production counters and the session's
 * position are all counts — nothing in the app can lower one (`productionCounters.test.ts` proves
 * it of the counters), so a negative one was not written by this app.
 */
const COUNT = integer('a whole number ≥ 0', 0);

/**
 * A countdown in sessions, and it may be NEGATIVE: `dueInSessions <= 0` is due now, and
 * `engine/leitner.ts` sorts -2 ahead of -1 as the more overdue of the two. Whole, therefore, and
 * nothing more — the queue's clock is the learner's, and this validator does not get an opinion
 * about how far behind they are (Invariant 2).
 */
const COUNTDOWN = integer('a whole number');

const FLAG: Shape<boolean> = {
  expected: 'true or false',
  read: (found, path) => (typeof found === 'boolean' ? found : fail(path, 'true or false', found)),
  write: (value) => value,
  strings: [],
};

/** An ordered list — the review queue and the session's queue, whose order is their meaning. */
function list<T>(item: Shape<T>): Shape<T[]> {
  const expected = `a list of ${item.expected}`;
  return {
    expected,
    read: (found, path) =>
      Array.isArray(found)
        ? found.map((entry, index) => item.read(entry, `${path}[${index}]`))
        : fail(path, expected, found),
    write: (value) => value.map((entry) => item.write(entry)),
    strings: item.strings,
  };
}

/**
 * A map keyed by an id — `courses`, `modules`, `production`, `studied`. The KEY is validated too:
 * a map key is a string in the document like any other, and it is where a stray sentence would be
 * easiest to hide.
 *
 * Written with its keys sorted, which is what makes two exports of the same state the same bytes
 * however the maps were built up.
 */
function record<T>(keys: Vocabulary, value: Shape<T>): Shape<Record<string, T>> {
  const expected = `a map of ${keys.name} to ${value.expected}`;
  return {
    expected,
    read: (found, path) => {
      if (!isRecord(found)) return fail(path, expected, found);

      return Object.fromEntries(
        Object.entries(found).map(([key, held]) => {
          if (!keys.accepts(key)) {
            throw new ImportError(`${path}: "${key}" is not ${keys.name}`);
          }
          return [key, value.read(held, `${path}.${key}`)];
        }),
      );
    },
    write: (map) =>
      Object.fromEntries(
        Object.entries(map)
          .sort(([left], [right]) => (left < right ? -1 : left > right ? 1 : 0))
          .map(([key, held]) => [key, value.write(held)]),
      ),
    strings: [keys, ...value.strings],
  };
}

/** `null`, or the shape — the per-course session snapshot, and nothing else in v7. */
function nullable<T>(shape: Shape<T>): Shape<T | null> {
  return {
    expected: `${shape.expected} or null`,
    read: (found, path) => (found === null ? null : shape.read(found, path)),
    write: (value) => (value === null ? null : shape.write(value)),
    strings: shape.strings,
  };
}

type Fields<T> = { readonly [K in keyof T]-?: Shape<T[K]> };

/**
 * A fixed set of named fields — every one of them required, **and no others**: an unknown key is
 * rejected rather than dropped, because a key this app does not understand means the file was
 * written by something that understood more than v7 does, and importing the parts we recognise
 * would be a silent, partial restore of somebody's entire history.
 *
 * Typed `Fields<T>`, which is the compile-time half of the contract: `object<CourseState>` will
 * not typecheck until every field of `CourseState` has a shape here, so a field added to
 * `types.ts` — including one that could hold learner text — cannot reach the export without
 * passing through this file. The field order is the EXPORT's key order.
 */
function object<T extends object>(expected: string, fields: Fields<T>): Shape<T> {
  const keys = Object.keys(fields) as (keyof T & string)[];

  return {
    expected,
    read: (found, path) => {
      if (!isRecord(found)) return fail(path, expected, found);

      for (const key of Object.keys(found)) {
        if (!keys.includes(key as keyof T & string)) {
          throw new ImportError(
            `${path}.${key}: unknown key — state v${STATE_VERSION} has no such field, and a file this app cannot read whole it does not read in part`,
          );
        }
      }

      const read: Record<string, unknown> = {};
      for (const key of keys) read[key] = readField(fields, found, key, path);
      return read as T;
    },
    write: (value) => {
      const written: Record<string, unknown> = {};
      for (const key of keys) written[key] = writeField(fields, value, key);
      return written;
    },
    strings: keys.flatMap((key) => fields[key].strings),
  };
}

/*
 * The two helpers exist for one reason: inside `object`, `fields[key]` is a UNION of shapes and
 * TypeScript will not call a union of signatures with a union of arguments. Pinning the key to a
 * type parameter makes each call a single, concrete shape again — with no cast, which is the point.
 */
function readField<T extends object, K extends keyof T & string>(
  fields: Fields<T>,
  found: Record<string, unknown>,
  key: K,
  path: string,
): T[K] {
  return fields[key].read(found[key], `${path}.${key}`);
}

function writeField<T extends object, K extends keyof T & string>(
  fields: Fields<T>,
  value: T,
  key: K,
): unknown {
  return fields[key].write(value[key]);
}

/* ---------------------------------------------------------------------------- state v7 */

/** `{status: 'passed', passedAt}`. There is no failure to record — a module is passed or absent. */
const MODULE_PROGRESS = object<ModuleProgress>('a passed module', {
  status: literal('passed'),
  passedAt: id(VOCABULARY.instant),
});

const REVIEW_ITEM = object<ReviewItem>('a review item', {
  sentenceId: id(VOCABULARY.sentenceId),
  box: enumOf<LeitnerBox>([1, 2, 3]),
  dueInSessions: COUNTDOWN,
});

/** The in-flight session: a POSITION, never the cards — `{phase, idx, queue}` and nothing more. */
const SESSION_SNAPSHOT = object<SessionSnapshot>('a session snapshot', {
  phase: enumOf<SessionPhase>(['review', 'read', 'produce']),
  idx: COUNT,
  queue: list(id(VOCABULARY.sentenceId)),
});

/** One course's whole ladder — the six keys F7 prints, in F7's order. */
const COURSE = object<CourseState>('a course subtree', {
  modules: record(VOCABULARY.moduleId, MODULE_PROGRESS),
  production: record(VOCABULARY.sentenceId, COUNT),
  reviewQueue: list(REVIEW_ITEM),
  sessionCount: COUNT,
  studied: record(VOCABULARY.moduleId, FLAG),
  session: nullable(SESSION_SNAPSHOT),
});

const SETTINGS = object<Settings>('the settings', {
  elapsedTickEnabled: FLAG,
  notebookInvitationDismissed: FLAG,
});

/**
 * The document, top to bottom — PRD §8 F7 prints exactly this, and this is the order it is
 * written in. Exported so `serialize.test.ts` can walk the shape itself: the vocabularies below
 * are Invariant 4's assertion, and a test that re-declared them would be asserting its own list.
 */
export const STATE_V7 = object<AppState>('the exported rung state', {
  stateVersion: literal(STATE_VERSION),
  activeCourse: id(ACTIVE_COURSE),
  courses: record(VOCABULARY.courseId, COURSE),
  settings: SETTINGS,
});

/* ------------------------------------------------------------------------------ export */

/**
 * The learner's whole history as one JSON document — **every course** (F7), not just the active
 * one, because a backup that restored one ladder would be a backup that lost the others.
 *
 * Two-space indent and stable key order: F7's order for the named fields, sorted keys for every
 * map. Rishabh may open one of these in a text editor, and two exports of the same state are the
 * same bytes — so a diff between yesterday's file and today's shows what the learner DID.
 */
export function exportState(state: AppState): string {
  return JSON.stringify(STATE_V7.write(state), null, 2);
}

/* ------------------------------------------------------------------------------ import */

/**
 * A file, read back into state — or an `ImportError` naming the field that stopped it. Nothing is
 * written here: this answers a document, and the caller (#108) decides what to do with it, so a
 * refused import cannot have half-replaced anything.
 *
 * Four routes out of `stateVersion`, and only one of them restores anything:
 *
 *   • **v7** — validated field by field, and answered as a freshly built document.
 *   • **older, and upgradable** — through `migrate` (the store's own, #82), then validated exactly
 *     as a v7 file is. The migration is trusted to WRAP, never to bless: what comes back out of it
 *     is read with the same suspicion as what went in.
 *   • **older than any route** — refused. Answering first-run state would tell the learner their
 *     history was restored while handing them an empty ladder.
 *   • **newer** — refused, and it says so: a v8 file knows things this build does not, and reading
 *     the v7-shaped parts of it would quietly drop the rest.
 */
export function importState(json: string): AppState {
  let parsed: unknown;
  try {
    parsed = JSON.parse(json) as unknown;
  } catch (cause) {
    throw new ImportError(
      `${DOCUMENT}: this file is not JSON (${cause instanceof Error ? cause.message : String(cause)})`,
    );
  }

  const version = versionOf(parsed);

  if (version === STATE_VERSION) return STATE_V7.read(parsed, DOCUMENT);

  if (version > STATE_VERSION) {
    throw new ImportError(
      `${DOCUMENT}.stateVersion: this file is state v${version} and this app reads v${STATE_VERSION} — update rung, then import it again`,
    );
  }

  if (version < OLDEST_MIGRATABLE_VERSION) {
    throw new ImportError(
      `${DOCUMENT}.stateVersion: this file is state v${version}, and the oldest this app knows how to upgrade is v${OLDEST_MIGRATABLE_VERSION}`,
    );
  }

  // The store's migration, not a second one: a file and a rehydrate must never disagree about
  // what a v5 document means (#82's contract, and `serialize.test.ts` proves there is one of it).
  return STATE_V7.read(migrate(parsed, version), DOCUMENT);
}

/** The version the file was written at — the one field read before anything else is trusted. */
function versionOf(parsed: unknown): number {
  if (!isRecord(parsed)) return fail(DOCUMENT, STATE_V7.expected, parsed);

  const version = parsed['stateVersion'];
  if (typeof version !== 'number' || !Number.isInteger(version)) {
    return fail(
      `${DOCUMENT}.stateVersion`,
      `the state version this file was written at (v${STATE_VERSION} is current)`,
      version,
    );
  }

  return version;
}
