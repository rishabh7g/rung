/**
 * Surface normalisation — the ONE definition of "same word" (#75).
 *
 * The build-time word-index emitter (`tools/content-build.ts`) and the runtime "why" resolver
 * (#94) must agree byte for byte: an index key the resolver cannot reproduce is a word that
 * silently has no "why". So the rule lives here, in the pure engine, and BOTH sides import it —
 * never a copy. `src/engine/` is pure TypeScript: no DOM, no Node, no clock (docs/01-plan.md §3).
 *
 * What the rule is (#75 laid 1–3; #116 ratified 4–6, closing [Q3] — PRD-engineering §14):
 *   1. **NFC.** Devanagari is authored composed (docs/01-plan.md §7); normalising anyway means a
 *      decomposed paste can never miss its own entry.
 *   2. **Strip edge punctuation, per token.** From L1-M2 on, `display` carries sentence
 *      punctuation — a question mark on a question, a comma after a greeting (PR #119) — while
 *      the word rows that teach those words carry none. Edge-only: `don't` keeps its inside.
 *   3. **Collapse whitespace.** Surfaces may span tokens (`Me llamo`, `se llama` in en-es), so a
 *      surface is exactly its tokens joined by one space — `normalizeSurface(x)` is by
 *      construction `tokenizeSurface(x).join(' ')`, which is what keeps the emitter's keys and
 *      the resolver's lookups the same strings.
 *   4. **Fold case.** `Soy` mid-sentence is `soy`; a romanized course would otherwise teach the
 *      capitalised form and miss every lowercase occurrence (or vice versa). Keys are lowercase.
 *   5. **Fold the apostrophe classes onto the modifier letters.** A typist's `'` U+0027, the
 *      typographic `’` U+2019 and `ʼ` U+02BC all mean the hamza `ʾ` U+02BE in romanized text;
 *      `‘` U+2018 and `ʻ` U+02BB mean the ʿayn `ʿ` U+02BF. Each class folds onto its letter —
 *      BEFORE edge stripping, so an edge apostrophe becomes a letter and survives, as it always
 *      did. The two classes NEVER merge: hamza and ʿayn are distinct consonants, and folding
 *      them together would merge distinct words.
 *   6. **A hyphen is a token boundary.** `al-Hind` is the tokens `al` + `hind`, exactly as if
 *      spaced — so the hyphenated article prefix (`al-`) behaves like en-es's multi-token
 *      `Me llamo`: the emitter indexes the joined surface (and its parts — `surfaceKeys`), and
 *      the resolver's longest-match-first walk prefers the whole over the pieces.
 *
 * Worked examples are in `surface.test.ts`, in the courses' own scripts: `src/` itself carries no
 * course script at all, not even in a comment (#80, `src/shellPurity.test.ts`).
 */

/** The right-ring class: ASCII/typographic apostrophes that mean the hamza in romanized text. */
const HAMZA_CLASS = /['’ʼ]/g;

/** The left-ring class: the marks that mean the ʿayn. Never folded with the hamza class. */
const AYN_CLASS = /[‘ʻ]/g;

/** Hyphens that bound tokens (rule 6): hyphen-minus U+002D and the Unicode hyphen U+2010. */
const HYPHENS = /[-‐]/;

/**
 * Leading/trailing punctuation. `\p{P}` covers what the content actually carries
 * (`? , . ! — " " ¿ ¡` and the Devanagari danda, U+0964) without an ASCII allow-list that a new
 * course would immediately outgrow. Runs AFTER the apostrophe folds, whose outputs are modifier
 * LETTERS (`\p{Lm}`) — so an apostrophe at a word edge is never stripped, it becomes ʾ.
 */
const EDGE_PUNCTUATION = /^\p{P}+|\p{P}+$/gu;

/** One hyphen-free chunk of a display string, folded and trimmed per rules 1–5. */
function normalizeToken(token: string): string {
  return token
    .normalize('NFC')
    .replace(HAMZA_CLASS, 'ʾ')
    .replace(AYN_CLASS, 'ʿ')
    .replace(EDGE_PUNCTUATION, '')
    .toLowerCase();
}

/**
 * Splits a display string the way both sides count words: on whitespace AND hyphens (rule 6),
 * each token normalised, empties (a lone dash, a stray comma) dropped.
 */
export function tokenizeSurface(text: string): string[] {
  const tokens: string[] = [];
  for (const chunk of text.split(/\s+/)) {
    for (const piece of chunk.split(HYPHENS)) {
      const token = normalizeToken(piece);
      if (token !== '') tokens.push(token);
    }
  }
  return tokens;
}

/**
 * The index key for a surface — a word `display`, a `forms` entry, or a span of a sentence.
 * Returns `''` for a string with nothing indexable in it; callers skip those.
 */
export function normalizeSurface(text: string): string {
  return tokenizeSurface(text).join(' ');
}

/** How many tokens a surface spans: one Marathi word → 1, `Me llamo` and `al-Hind` → 2. */
export function surfaceSpan(surface: string): number {
  return tokenizeSurface(surface).length;
}

/**
 * Every index key one taught surface produces — the emitter's side of rule 6 (#116).
 *
 * The joined surface first, then, for a HYPHENATED chunk only, each hyphen part on its own: the
 * article prefix in `al-Hind` is worth a "why" even under a noun the course never taught, so `al`
 * and `hind` each point at the row that taught the compound. A spaced multi-token surface
 * (`Me llamo`) contributes no parts — `llamo` alone is not taught, and indexing it would claim
 * it is. The resolver needs no counterpart: its longest-match-first walk already prefers the
 * joined surface and falls back to the parts.
 */
export function surfaceKeys(raw: string): string[] {
  const keys: string[] = [];
  const push = (key: string): void => {
    if (key !== '' && !keys.includes(key)) keys.push(key);
  };

  push(normalizeSurface(raw));
  for (const chunk of raw.split(/\s+/)) {
    if (!HYPHENS.test(chunk)) continue;
    for (const part of tokenizeSurface(chunk)) push(part);
  }
  return keys;
}

/** What `matchSurfaces` needs of an index — the emitter's map or the runtime's loaded JSON. */
export interface SurfaceLookup {
  /** The longest indexed surface, in tokens. Bounds the greedy walk; 1 disables multi-token. */
  maxSpan: number;
  has: (surface: string) => boolean;
}

export interface SurfaceMatch {
  /** The normalised surface as matched — the index key when `resolved`. */
  surface: string;
  /** Index of the first token consumed. */
  start: number;
  /** Tokens consumed: > 1 only for a multi-token surface. */
  span: number;
  resolved: boolean;
}

/**
 * Walks a token list left to right, taking the LONGEST indexed surface at each position — the one
 * matching order that lets `se llama Rohan` resolve as `se llama` + `Rohan` rather than three
 * unknown words. An unmatched token is reported as a one-token unresolved match and the walk
 * continues, so a caller sees every problem token, not just the first.
 */
export function matchSurfaces(
  tokens: readonly string[],
  lookup: SurfaceLookup,
): readonly SurfaceMatch[] {
  const longest = Math.max(1, Math.floor(lookup.maxSpan));
  const matches: SurfaceMatch[] = [];
  let at = 0;

  while (at < tokens.length) {
    const remaining = tokens.length - at;
    let taken: SurfaceMatch | null = null;
    for (let span = Math.min(longest, remaining); span >= 1; span -= 1) {
      const surface = tokens.slice(at, at + span).join(' ');
      if (lookup.has(surface)) {
        taken = { surface, start: at, span, resolved: true };
        break;
      }
    }
    const match = taken ?? {
      surface: tokens[at] ?? '',
      start: at,
      span: 1,
      resolved: false,
    };
    matches.push(match);
    at += match.span;
  }

  return matches;
}
