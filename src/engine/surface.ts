/**
 * Surface normalisation — the ONE definition of "same word" (#75).
 *
 * The build-time word-index emitter (`tools/content-build.ts`) and the runtime "why" resolver
 * (#94) must agree byte for byte: an index key the resolver cannot reproduce is a word that
 * silently has no "why". So the rule lives here, in the pure engine, and BOTH sides import it —
 * never a copy. `src/engine/` is pure TypeScript: no DOM, no Node, no clock (docs/01-plan.md §3).
 *
 * What the rule is, today (#116 closed [Q3] — the romanized edge cases are decided here):
 *   1. **NFC.** Devanagari is authored composed (docs/01-plan.md §7); normalising anyway means a
 *      decomposed paste can never miss its own entry.
 *   2. **Fold the apostrophe classes** — two classes, never each other (#116, [Q3]):
 *      the hamza/apostrophe class `’` U+2019, `ʼ` U+02BC, `ʾ` U+02BE folds to `'` U+0027, and the
 *      ʿayn class `‘` U+2018 folds to `ʿ` U+02BF. In romanization convention the right-side
 *      apostrophes all write hamza (or a plain elision, `don't`) and the left quote writes ʿayn —
 *      but hamza and ʿayn are DISTINCT consonants, so the two classes must never merge: folding
 *      `saʾal` (asked) into `saʿal` (coughed) would be inventing a homograph.
 *   3. **Strip edge punctuation, per token.** From L1-M2 on, `display` carries sentence
 *      punctuation — a question mark on a question, a comma after a greeting (PR #119) — while
 *      the word rows that teach those words carry none. Edge-only: `al-Hind` and `don't` keep
 *      their insides. After the fold, `'` is the only apostrophe left to exempt; `ʿ` is a letter
 *      (`\p{Lm}`) and was never at risk.
 *   4. **Case-fold to lowercase** (#116, [Q3]): `Soy` and `soy` are one word — `display` carries
 *      sentence case, the word rows carry citation case, and a learner's "why" tap must not care
 *      which it hit. `toLowerCase()` without a locale is the Unicode default fold: a no-op for
 *      Devanagari, and it never touches diacritics, so `sí` (yes) and `si` (if) stay distinct.
 *   5. **Collapse whitespace.** Surfaces may span tokens (`Me llamo`, `se llama` in en-es), so a
 *      surface is exactly its tokens joined by one space — `normalizeSurface(x)` is by
 *      construction `tokenizeSurface(x).join(' ')`, which is what keeps the emitter's keys and
 *      the resolver's lookups the same strings.
 *
 * **Hyphens** (#116, [Q3]): `al-qahwa` stays ONE surface — a hyphenated token is one whitespace
 * token, so the joined form is the primary key on both sides. But the emitter ALSO indexes each
 * hyphen part (`al`, `qahwa`) via `surfaceIndexKeys` below, pointing at the same word entry, so a
 * later module writing the bare part still resolves. First occurrence wins as ever: a part never
 * steals a key an earlier surface already owns, and the resolver's longest-match-first walk means
 * the joined key always beats its parts when both could apply.
 *
 * Worked examples are in `surface.test.ts`, in the courses' own scripts: `src/` itself carries no
 * course script at all, not even in a comment (#80, `src/shellPurity.test.ts`).
 */

/** The hamza/apostrophe class: `’` U+2019, `ʼ` U+02BC, `ʾ` U+02BE — every right-side apostrophe. */
const APOSTROPHE_CLASS = /[’ʼʾ]/gu;
/** The ʿayn class: `‘` U+2018, the typographic stand-in for `ʿ` U+02BF. */
const AYN_CLASS = /‘/gu;

/**
 * Leading/trailing punctuation, minus `'` (kept: elision and folded hamza live at word edges,
 * `māʾ` → `mā'`). `\p{P}` covers what the content actually carries (`? , . ! - — " " ¿ ¡` and the
 * Devanagari danda, U+0964) without an ASCII allow-list that a new course would immediately
 * outgrow.
 */
const EDGE_PUNCTUATION = /^(?:(?!')\p{P})+|(?:(?!')\p{P})+$/gu;

/** One whitespace-separated chunk of a display string, folded, trimmed and lowercased. */
function normalizeToken(token: string): string {
  return token
    .normalize('NFC')
    .replace(APOSTROPHE_CLASS, "'")
    .replace(AYN_CLASS, 'ʿ')
    .replace(EDGE_PUNCTUATION, '')
    .toLowerCase();
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

/**
 * Every key a NORMALISED surface earns in the word index (#116, [Q3] hyphen rule): the surface
 * itself first, then each hyphen part of each of its tokens, once. `al-qahwa` → `al-qahwa`, `al`,
 * `qahwa`; a surface without a hyphen is just itself. The emitter maps them all to the same word
 * entry (first occurrence wins), so this lives here — next to `normalizeSurface`, the single
 * source of "same word" — rather than in the build, where the resolver could not see the rule.
 */
export function surfaceIndexKeys(surface: string): string[] {
  const keys = [surface];
  for (const token of surface.split(' ')) {
    if (!token.includes('-')) continue;
    for (const part of token.split('-')) {
      if (part !== '' && !keys.includes(part)) keys.push(part);
    }
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
