/**
 * Schema v5, as TypeScript (#81, PRD §7, §4).
 *
 * These are the shapes the app READS — the emitted tree under `public/content/`, never the
 * authored one. Three files, three types:
 *
 *   content/<courseId>/levels.json          → `Levels`        (the ladder: 3 levels × 10 rungs)
 *   content/<courseId>/modules/<id>.json     → `ModuleContent` (a rung's sentences and pool)
 *   content/<courseId>/index/<id>.json       → `WordIndex`     (surface → the word that teaches it)
 *
 * They are DERIVED FROM THE CONTENT, not from a sketch: `content/schema/module.schema.json`
 * (the frozen v5 contract, #73) plus the modules that actually exist — hi-mr, en-es and en-ar,
 * L1-M1..M10 apiece. `src/course/types.test.ts` reads those real files and fails if any
 * of them carries a key no type here declares, so "the type mirrors the content" is mechanical
 * rather than a promise. Optional means optional in the schema, and the comments say which
 * optional fields today's content actually uses.
 *
 * The build validates every authored file against the schema before it ships (`tools/validate.ts`);
 * what `content.ts` re-checks at runtime is only the cheap tripwires — see its header.
 */

/* ------------------------------------------------------------------ modules */

/** Delta-learning tag — pair-specific by definition (PRD §1). Free / delta / interference. */
export type Tag = 'free' | 'delta' | 'interference';

/** The chip beside WHEN TO USE IT. A closed enum: widen the schema first, then this. */
export type Register = 'neutral' | 'informal';

/** One module-level grammar rule. The array is ORDERED — sentences point into it by index. */
export interface Rule {
  tag: Tag;
  text: string;
}

/** One word row of a sentence's deconstruction — the unit the "why" resolver lands on. */
export interface Word {
  /** Primary L2 string: the native text in native courses, the romanization in romanized ones. */
  display: string;
  /** Quiet native line, romanized courses only. No word row uses it today; pool items do. */
  script?: string;
  /** The L1 cue (Hindi for hi-mr, English for en-es and en-ar). */
  cue: string;
  tag: Tag;
  /** The taught paradigm as discrete surfaces, INCLUDING `display`; `[]` when there are none. */
  forms: string[];
  note?: string;
}

export interface Deconstruction {
  words: Word[];
  /** Integer indices into the module's `rules` array — which is why that order is contractual. */
  rules: number[];
}

/** A "same frame, one thing changed" restatement of the sentence. */
export interface Variation {
  display: string;
  script?: string;
  cue: string;
  /** What changed, in the course's own words. */
  changed: string;
}

/** The one wrong-L2 callout per sentence — a single object, never an array. */
export interface Mistake {
  display: string;
  script?: string;
  why: string;
}

/**
 * One of a module's sentences. Keys are authored in the frozen Sentence Detail order [D10]:
 * hero, gloss, words, rules, trap, sound, variations, mistake, usage, mnemonic — and every
 * enrichment field is optional in the schema because a section vanishes when a sentence honestly
 * has nothing to put in it. M1–M3 carry all of them (`tools/validate.ts` enforces that), so the
 * screens can rely on the content plan without the type pretending the fields are required.
 */
export interface Sentence {
  id: string;
  display: string;
  /** Quiet native-script line — wanted in romanized courses (en-ar), absent in native ones. */
  script?: string;
  cue: string;
  /**
   * English gloss of the line. Optional in the schema (#268): the build requires it wherever the
   * L2 is not English, and a course whose L2 IS English authors none — it would repeat `display`.
   * The screen renders it when present, and branches on nothing else.
   */
  glossEn?: string;
  /** Word-for-word rendering, under the gloss. */
  literal?: string;
  deconstruction: Deconstruction;
  /** L1-interference warning, on the sentence. */
  trap?: string;
  sound?: string;
  variations?: Variation[];
  mistake?: Mistake;
  usage?: string;
  register?: Register;
  mnemonic?: string;
}

/**
 * A comprehension item — exactly `{id, display, cue}` (+ optional `script`). No embedded words:
 * its "why" row resolves through the word index, which is why every token of it must already be
 * taught (the build enforces that; PRD §6.3).
 */
export interface PoolItem {
  id: string;
  display: string;
  script?: string;
  cue: string;
}

/** The module's declared bounds — what an 11th sentence of the same complexity may use. */
export interface Complexity {
  minWordsPerSentence: number;
  maxWordsPerSentence: number;
  allowedTenses: string[];
  allowedPatterns: string[];
  newWordCap: number;
}

/** How many novel sentences and comprehension items the exit ritual asks for. */
export interface ExitTest {
  generateCount: number;
  comprehendCount: number;
}

/** One module file: `public/content/<courseId>/modules/<moduleId>.json`. */
/**
 * Authored module keys the build does NOT emit (#404): the pipeline's own bookkeeping —
 * `prerequisites` (the validator's ordering check), `complexity` (the authoring bounds the prompt
 * asks for and the validator enforces), and the native gate's record (`verified`, `verifiedBy`,
 * `verifiedAt`, plus the dev `fixture` flag the build already excludes by). The app reads none of
 * them, so a learner downloading them was paying for the pipeline's paperwork — about 1.5% of
 * every module. `tools/content-build.ts` strips them at emit; `types.test.ts` strips them before
 * checking the authored files against this shape. One list, both readers.
 */
export const PIPELINE_ONLY_MODULE_KEYS = [
  'prerequisites',
  'verified',
  'verifiedBy',
  'verifiedAt',
  'fixture',
  'complexity',
] as const;

export interface ModuleContent {
  /** Always 5. A different number is a different contract, and the loader refuses it. */
  schemaVersion: 5;
  id: string;
  title: string;
  job: string;
  rules: Rule[];
  sentences: Sentence[];
  comprehensionPool: PoolItem[];
  exitTest: ExitTest;
}

/* ------------------------------------------------------------------- levels */

/** One rung of the ladder, as `levels.json` lists it. */
export interface LevelModule {
  id: string;
  title: string;
  job: string;
  /**
   * Whether this module's file SHIPPED — recomputed by the build from the emitted tree, so the
   * authored flag is never trusted (README, "The content gate"). False is the pending-authoring
   * rung state, not an error.
   */
  hasContent: boolean;
  /** Placeholder row in an unauthored ladder (en-es and en-ar L2/L3). Absent means a real,
      listed module. */
  draft?: boolean;
}

/** One level: L1 Foundations, L2 Conversations, L3 Fluency (PRD §5, names per course). */
export interface Level {
  id: string;
  name: string;
  tagline: string;
  modules: LevelModule[];
  /** Unratified list — true on a ladder nobody has authored (en-es and en-ar L2/L3). Absent/false
      means ratified (hi-mr's L2/L3 ratified by #112, closing [Q1]). */
  draft?: boolean;
  /** Why it is draft, in the course's own words; `null` on a ratified level. */
  draftNote?: string | null;
}

/** One course's ladder: `public/content/<courseId>/levels.json`. */
export interface Levels {
  courseId: string;
  levels: Level[];
}

/* --------------------------------------------------------------- word index */

/**
 * Where a surface is TAUGHT: open `modules/<moduleId>.json`, find `<sentenceId>`, read
 * `deconstruction.words[wordIdx]`. That triple is the whole answer the "why" row needs.
 */
export interface WordIndexEntry {
  moduleId: string;
  sentenceId: string;
  wordIdx: number;
}

/**
 * One module's word index: `public/content/<courseId>/index/<moduleId>.json` (#75, PRD §6.3).
 *
 * CUMULATIVE — L1-M2's index is L1-M1's plus what M2 adds, because a module never re-teaches
 * what an earlier one taught — and first occurrence wins, so an entry names where the learner
 * MET the word. Keys are `normalizeSurface`d (`src/engine/surface.ts`) and code-point sorted;
 * a lookup must normalise the same way or it is asking a different question.
 */
export interface WordIndex {
  courseId: string;
  moduleId: string;
  /** The shipped modules folded in, in ladder order, ending with `moduleId`. */
  cumulativeThrough: string[];
  surfaceCount: number;
  /**
   * Longest surface in TOKENS — the bound a greedy multi-word match needs: en-es teaches
   * `Me llamo` as one surface, so its index says 2 and hi-mr's says 1.
   */
  maxSpan: number;
  /** Surface → the word row that teaches it. `noUncheckedIndexedAccess` makes a miss explicit. */
  surfaces: Record<string, WordIndexEntry>;
}

/* -------------------------------------------------------------------- sizes */

/**
 * A course's shipped weight: `public/content/<courseId>/sizes.json` (#107, PRD §17: "storage
 * figures are illustrative; compute them"). Emitted by `tools/content-build.ts` as it writes the
 * course — `bytes` sums every other emitted file (modules, indexes, levels.json, strings.json),
 * never itself — so Settings' STORAGE rows render what the build actually put on the device
 * rather than a guess, and without a single runtime network request beyond the precached file.
 */
export interface CourseSizes {
  courseId: string;
  /** How many files the sum covers — everything the course ships except sizes.json itself. */
  files: number;
  bytes: number;
}
