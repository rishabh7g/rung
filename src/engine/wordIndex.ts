/**
 * The "why" resolver (#94; PRD §4 "word-index resolver", §6.3, §8 F4) — a revealed sentence, taken
 * apart against the course's cumulative word index.
 *
 * The index is emitted per module by the content build (`tools/content-build.ts`, #75) as
 * `{courseId, moduleId, cumulativeThrough, surfaceCount, maxSpan, surfaces}`, where a surface maps
 * to the `{moduleId, sentenceId, wordIdx}` triple naming the word row that TEACHES it. This file
 * is the other end of that contract: it says which spans of a sentence have a "why" and where each
 * one is written down. Fetching the module it is written down IN is the panel's job
 * (`src/components/WhyPanel.tsx`) — `src/engine/` is pure TypeScript: no React, no fetch, no clock
 * (docs/01-plan.md §3).
 *
 * Two rules, and they are the whole of it:
 *
 *   1. **`normalizeSurface` decides what "same word" means, here and in the emitter** — one
 *      definition, imported by both sides (`src/engine/surface.ts`). A lookup that normalised
 *      differently would be asking a different question of the same table, and a word would
 *      silently lose its "why"; `tools/content-build.test.ts` guards the seam, so NFC, edge
 *      punctuation, case-folding and the apostrophe classes (#116, [Q3]) are decided in exactly
 *      one file. Hyphens are the emitter's half of the same ruling: `al-qahwa` is one token and
 *      so one lookup, and the index also carries its parts (`surfaceIndexKeys`), so a bare
 *      `qahwa` in later content resolves without this side doing anything at all.
 *   2. **Longest span first.** en-es teaches `Me llamo` as ONE surface (`maxSpan: 2`), so
 *      `Me llamo Rohan` is two rows — `Me llamo` + `Rohan` — and never three unknown tokens.
 *      `matchSurfaces` walks that; this module only decides which matches are worth rendering.
 *
 * **An unresolved span is not an error.** It resolves to nothing and is dropped: content
 * legitimately carries tokens no word row teaches — proper nouns (`Priya`, #61) and the deliberate
 * wrong-language `mistake` lines the emitter never indexes. A learner asking "why" mid-reveal gets
 * the rows that exist; a placeholder naming the ones that do not would teach them the app is
 * broken.
 */
import { matchSurfaces, normalizeSurface, tokenizeSurface, type SurfaceLookup } from './surface.ts';

/**
 * Where a surface is taught: the module file, the sentence in it, and the word's position in that
 * sentence's `deconstruction.words`.
 *
 * Structurally identical to the emitted `WordIndexEntry` (`src/course/types.ts`), and declared
 * here rather than imported for the reason `leitner.ts` declares its own `ReviewItem`: the engine
 * is the layer everything else depends on, so it imports from none of them. A loaded index passes
 * straight in, which `wordIndex.test.ts` pins.
 */
export interface WordRef {
  moduleId: string;
  sentenceId: string;
  wordIdx: number;
}

/** What the resolver needs of an index — the emitted file's two load-bearing fields. */
export interface WordIndex {
  /** The longest indexed surface, in tokens. Bounds the greedy walk; 1 disables multi-token. */
  maxSpan: number;
  surfaces: Readonly<Record<string, WordRef>>;
}

/** One resolvable span of a sentence: which tokens it took, and the row that teaches them. */
export interface ResolvedSpan {
  /** The normalised surface — the index key that matched, and the row's stable identity. */
  surface: string;
  /** Index of the first token consumed, in the sentence's own token order. */
  start: number;
  /** Tokens consumed: > 1 for a multi-word surface like `Me llamo`. */
  span: number;
  ref: WordRef;
}

/**
 * The one surface → entry read. `Object.hasOwn` rather than `in` or a bare index: `surfaces` comes
 * out of `JSON.parse`, so it inherits `Object.prototype` — `surfaces['constructor']` is a function,
 * and a sentence carrying the word "constructor" would otherwise resolve to it.
 */
function entryOf(index: WordIndex, surface: string): WordRef | null {
  if (!Object.hasOwn(index.surfaces, surface)) return null;
  return index.surfaces[surface] ?? null;
}

/**
 * Where one surface is taught, or `null`.
 *
 * The argument is normalised on the way in, so a caller may pass a raw token off a sentence —
 * trailing question mark and all — or an index key already normalised, and get the same answer.
 * A string with nothing indexable in it (`—`, `   `) is a miss rather than a lookup.
 */
export function resolve(surface: string, index: WordIndex): WordRef | null {
  const key = normalizeSurface(surface);
  if (key === '') return null;
  return entryOf(index, key);
}

/**
 * A sentence's resolvable spans, in reading order — the rows a "why" panel renders.
 *
 * Greedy, bounded by the index's own `maxSpan`, so a course whose index says 1 can never match a
 * pair by accident. Unresolved tokens are dropped rather than reported: this is the render path,
 * and the build is where a miss is worth naming (`checkComprehensionPool`, #75).
 */
export function resolveSentence(display: string, index: WordIndex): readonly ResolvedSpan[] {
  const lookup: SurfaceLookup = {
    maxSpan: index.maxSpan,
    has: (surface) => entryOf(index, surface) !== null,
  };

  const spans: ResolvedSpan[] = [];
  for (const match of matchSurfaces(tokenizeSurface(display), lookup)) {
    const ref = match.resolved ? entryOf(index, match.surface) : null;
    if (ref !== null) {
      spans.push({ surface: match.surface, start: match.start, span: match.span, ref });
    }
  }

  return spans;
}
