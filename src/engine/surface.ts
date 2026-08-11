/**
 * Surface normalisation — the ONE definition of "same word" (#75).
 *
 * The build-time word-index emitter (`tools/content-build.ts`) and the runtime "why" resolver
 * (#94) must agree byte for byte: an index key the resolver cannot reproduce is a word that
 * silently has no "why". So the rule lives here, in the pure engine, and BOTH sides import it —
 * never a copy. `src/engine/` is pure TypeScript: no DOM, no Node, no clock (docs/01-plan.md §3).
 *
 * What the rule is, today:
 *   1. **NFC.** Devanagari is authored composed (docs/01-plan.md §7); normalising anyway means a
 *      decomposed paste can never miss its own entry.
 *   2. **Strip edge punctuation, per token.** From L1-M2 on, `display` carries sentence
 *      punctuation — a question mark on a question, a comma after a greeting (PR #119) — while
 *      the word rows that teach those words carry none. Edge-only: `al-Hind` and `don't` keep
 *      their insides.
 *   3. **Collapse whitespace.** Surfaces may span tokens (`Me llamo`, `se llama` in en-es), so a
 *      surface is exactly its tokens joined by one space — `normalizeSurface(x)` is by
 *      construction `tokenizeSurface(x).join(' ')`, which is what keeps the emitter's keys and
 *      the resolver's lookups the same strings.
 *
 * SEAM — #116 (romanized edge cases, [Q3]) owns everything else, deliberately not pre-solved:
 *   • **case** — `Soy`/`soy`, `Me gusta`/`me gusta` are distinct surfaces here. Case is preserved,
 *     not folded (#75 spec: "store verbatim otherwise").
 *   • **apostrophe class** — `'` U+0027, `’` U+2019, `ʼ` U+02BC are kept even at an edge, and the
 *     modifier letters `ʾ` U+02BE / `ʿ` U+02BF (hamza / ʿayn — letters, not punctuation) are never
 *     touched. Folding these together is #116's call; stripping them here would pre-empt it.
 *   • **hyphen splitting** — `al-qahwa` stays one surface; whether to also index `al` + `qahwa` is
 *     #116's decision.
 * When #116 lands, change these functions and both sides move together. That is the point.
 *
 * Worked examples are in `surface.test.ts`, in the courses' own scripts: `src/` itself carries no
 * course script at all, not even in a comment (#80, `src/shellPurity.test.ts`).
 */

/**
 * Leading/trailing punctuation, minus the apostrophe class above. `\p{P}` covers what the content
 * actually carries (`? , . ! - — " " ¿ ¡` and the Devanagari danda, U+0964) without an ASCII
 * allow-list that a new course would immediately outgrow.
 */
const EDGE_PUNCTUATION = /^(?:(?!['’ʼ])\p{P})+|(?:(?!['’ʼ])\p{P})+$/gu;

/** One whitespace-separated chunk of a display string, punctuation trimmed off both ends. */
function normalizeToken(token: string): string {
  return token.normalize('NFC').replace(EDGE_PUNCTUATION, '');
}

/**
 * Splits a display string the way both sides count words: on whitespace, each token normalised,
 * empties (a lone dash, a stray comma) dropped.
 */
export function tokenizeSurface(text: string): string[] {
  const tokens: string[] = [];
  for (const raw of text.split(/\s+/)) {
    const token = normalizeToken(raw);
    if (token !== '') tokens.push(token);
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

/** How many tokens a surface spans: one Marathi word → 1, `Me llamo` → 2. */
export function surfaceSpan(surface: string): number {
  return tokenizeSurface(surface).length;
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
