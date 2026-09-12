/**
 * Read-only shown-surface check for ONE authored module, without running the build (#462–#487).
 *
 * `npm run content:build` is the authority and the ratchet in `tools/shown-surfaces.test.ts` is
 * the gate; both walk every course and write `public/content/`. An author working on one module —
 * or several authors working on different courses at once — needs the same answer for that module
 * alone, and needs it without a write. So this imports the ONE definition of "same word" from
 * `src/engine/surface.ts`, exactly as the emitter and the runtime resolver do, folds the shipped
 * index plus whatever L3 modules already exist, and reports what a display shows that no row
 * teaches.
 *
 *   npx tsx tools/check-shown.ts <course> <moduleId>
 *
 * It also REPORTS, without failing, a row whose surface an earlier module already owns. First
 * occurrence wins, so a learner tapping that word is shown the EARLIER note and this one is
 * unreachable. Most courses allow that deliberately — a re-teach whose note points back is how
 * `docs/53` §3's "re-taught, owned by nobody in L2" list works — so it is information, not a
 * verdict. en-de is the strict one: `src/course/types.test.ts` asserts exactly one owner per
 * surface there, and on that course a report here IS a defect.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';

import {
  matchSurfaces,
  normalizeSurface,
  surfaceIndexKeys,
  surfaceSpan,
  tokenizeSurface,
  type SurfaceLookup,
} from '../src/engine/surface.js';

const [course, moduleId] = process.argv.slice(2);
if (course === undefined || moduleId === undefined) {
  console.error('usage: npx tsx tools/check-shown.ts <course> <moduleId>');
  process.exit(2);
}

interface IndexFile {
  moduleId: string;
  cumulativeThrough: string[];
  surfaces: Record<string, unknown>;
  maxSpan: number;
}
interface Word {
  display: string;
  note: string;
  forms?: string[];
}
interface Sentence {
  id: string;
  display: string;
  variations?: { display: string }[];
  deconstruction: { words: Word[] };
}
interface Module {
  id: string;
  sentences: Sentence[];
  comprehensionPool: { id: string; display: string }[];
}

const read = <T>(path: string): T => JSON.parse(readFileSync(path, 'utf8')) as T;
const indexDir = `public/content/${course}/index`;
/**
 * The DEEPEST emitted index, not a hard-coded module. This read `L2-M10.json` while L3 was the
 * level being authored, which was true for exactly one level; the deepest file is the one whose
 * `cumulativeThrough` is longest, and picking it by filename does not work — `readdirSync` sorts
 * `L1-M10.json` before `L1-M2.json`.
 */
const shipped = readdirSync(indexDir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => read<IndexFile>(`${indexDir}/${f}`))
  .reduce((deepest, file) =>
    file.cumulativeThrough.length > deepest.cumulativeThrough.length ? file : deepest,
  );

/** Surface → the module that first taught it. First occurrence wins, as the emitter does. */
const taught = new Map<string, string>();
for (const m of shipped.cumulativeThrough) {
  for (const key of Object.keys(read<IndexFile>(`${indexDir}/${m}.json`).surfaces)) {
    if (!taught.has(key)) taught.set(key, m);
  }
}
let maxSpan = shipped.maxSpan;

const own = (surface: string, owner: string): void => {
  const key = normalizeSurface(surface);
  if (key === '') return;
  for (const k of surfaceIndexKeys(key)) if (!taught.has(k)) taught.set(k, owner);
  maxSpan = Math.max(maxSpan, surfaceSpan(key));
};

/**
 * Fold in the modules of THIS level already authored, up to and including this one — the ones the
 * emitted index cannot know about because they have not been built. `level` is read off the module
 * id rather than assumed, so the same check serves L3, L4 and L5.
 */
const [level] = moduleId.split('-');
const number = (id: string): number => Number(id.split('M')[1]);
const here = number(moduleId);
for (let n = 1; n <= here; n += 1) {
  const file = `content/${course}/modules/${level}-M${n}.json`;
  if (!existsSync(file)) continue;
  const mod = read<Module>(file);
  for (const s of mod.sentences) {
    for (const w of s.deconstruction.words) {
      for (const surface of [w.display, ...(w.forms ?? [])]) own(surface, mod.id);
    }
  }
}

const lookup: SurfaceLookup = { maxSpan, has: (surface) => taught.has(surface) };
const module_ = read<Module>(`content/${course}/modules/${moduleId}.json`);

const findings: string[] = [];
const scan = (text: string, where: string): void => {
  for (const match of matchSurfaces(tokenizeSurface(text), lookup)) {
    if (!match.resolved) findings.push(`SHOWN-BUT-UNTAUGHT ${where}: ${match.surface}`);
  }
};
for (const s of module_.sentences) {
  scan(s.display, s.id);
  for (const v of s.variations ?? []) scan(v.display, `${s.id} variation`);
}
for (const item of module_.comprehensionPool) scan(item.display, item.id);

/** A row whose key an earlier module owns resolves to that module's note, not to this one. */
const reteaches = new Set<string>();
/**
 * A key TWO ROWS OF THIS MODULE both open. The en-de L3-M3..M5 wave (#486) found this class the
 * hard way: `Antworten`, the plural of `die Antwort`, folds to exactly `antworten`, the verb's
 * infinitive, and one sentence taught both. The fold cannot tell them apart, so the second row is
 * unreachable — and the re-teach check above could not see it, because `taught` is built from the
 * modules BEFORE this one. `src/course/types.test.ts` caught it only because en-de asserts one
 * owner per surface; the other courses have no such guard, which is why this reports for every one
 * of them, and why it FAILS rather than merely reporting: unlike a re-teach, no course wants it.
 *
 * The exception is a DELIBERATE repeat, and hi-mr L3 has seven: a consolidation sentence whose
 * only row is a word the module already taught (L3-M1-S07's उठून under a woman's day). There is
 * nothing to delete — validate.ts requires a row — and nothing is lost either, PROVIDED both rows
 * carry the SAME note, because then which one the fold reaches is invisible. So the test is note
 * equality: two rows on one key with one note is a repeat, two rows with two notes is a defect.
 * Whatever the second row was going to say that the first does not belongs in the module's rules.
 */
const collisions = new Map<string, string>();
/** Bound-morpheme rows exempted below, one line per key — reported, like a re-teach, not failing. */
const donated = new Map<string, string>();
/**
 * A row writes a bound morpheme when its `display` or any of its `forms` carries a LEADING hyphen,
 * which is how en-ko writes a suffix in all 47 of its particle rows. Interior hyphens do not
 * count: `al-qahwa` and `peut-être` are whole words that happen to be spelled with one.
 */
const bound = (w: Word): boolean =>
  [w.display, ...(w.forms ?? [])].some((form) => form.startsWith('-'));
const mine = new Map<string, { row: string; note: string; whole: boolean }>();
for (const s of module_.sentences) {
  for (const w of s.deconstruction.words) {
    for (const surface of [w.display, ...(w.forms ?? [])]) {
      const key = normalizeSurface(surface);
      if (key === '') continue;
      const owner = taught.get(key);
      if (owner !== undefined && owner !== module_.id) {
        reteaches.add(
          `RE-TEACH ${s.id} "${key}": ${owner} owns the key, so its note is what a` +
            ' learner is shown — this row is only worth keeping if the sentence needs the word',
        );
      }
      /**
       * A row collides when the key it OPENS — its own whole surface — is one another row of this
       * module already earned, whether as a whole surface or as a hyphen PART. `surfaceIndexKeys`
       * splits hyphens, so `ʿalā ar-raghm min` silently buys `raghm` and `peut-être` silently buys
       * `peut`; a later row opening that word as its own display is unreachable, and this map was
       * blind to it while it held whole surfaces alone. en-ar's L4-M4 wave found the case by
       * reasoning about the emitter rather than by running this check, which is the wrong way
       * round.
       *
       * Only the whole key is TESTED, though every earned key is RECORDED. Part against part is
       * not a defect and flagging it is noise: en-ar's `al-` article makes every definite noun
       * donate `al`, so two ordinary nouns in one module would read as a collision. Nobody taps a
       * bound article — the learner taps the word.
       *
       * And the same argument exempts a BOUND-MORPHEME row whose key an earlier row only DONATED
       * as a part (#601). en-ko L1 teaches the particle system in rows of its own — `-neun`,
       * `-e`, `-eseo` — while `jeo-neun` and `jip-eseo` in the same module silently buy the bare
       * particle off the hyphen, which reported sixteen collisions that are decided policy:
       * `src/course/types.test.ts` accepts that the first host row owns the bare key, on the
       * ground that Korean never writes a bare particle as its own whitespace token. Nobody taps
       * `neun` either.
       *
       * The row says which it is, so no list is needed and none is kept: a leading hyphen on the
       * `display` or on any `forms` entry is how en-ko writes a suffix, and all sixteen carry one
       * (fourteen on the display, `euro` and `kkaji` on a form). `BARE_PARTICLES` in
       * `src/course/types.test.ts` was the obvious candidate and is the wrong one — it misses
       * `ieosseoyo`, `euro` and `kkaji`, so it cannot reach zero, and it answers a different
       * question: which particles a DISPLAY may not write as a token.
       *
       * BOTH conditions are required, which is what keeps en-ar's catch. `min al-mumkin an`
       * donates `mumkin` to a later bare `mumkin` row: that row carries no hyphen, so it is not
       * bound and still fires. And two rows that each open `-e` as their own whole surface with
       * two different notes still fire, because the earlier one earned it whole rather than as a
       * part — an unreachable second note is a defect wherever it is written.
       */
      const row = `${s.id} "${w.display}"`;
      const opened = mine.get(key);
      if (opened !== undefined && opened.row !== row && opened.note !== w.note) {
        // A bound morpheme against a key an earlier row only donated: decided, not a defect.
        if (bound(w) && !opened.whole) donated.set(key, `${opened.row} and ${row}`);
        else collisions.set(key, `${opened.row} and ${row}`);
      }
      for (const earned of surfaceIndexKeys(key)) {
        if (!mine.has(earned)) mine.set(earned, { row, note: w.note, whole: earned === key });
      }
    }
  }
}

for (const r of reteaches) console.log(r);
for (const [key, where] of donated) {
  console.log(
    `BOUND MORPHEME "${key}": ${where} — the earlier row donated the key off a hyphen and this` +
      ' one writes the suffix, which is decided policy (#601), not a defect.',
  );
}
for (const [key, where] of collisions) {
  findings.push(
    `COLLIDES INSIDE THIS MODULE "${key}": ${where} — the fold cannot tell them apart, so the` +
      ' second row is unreachable. One row, or two different surfaces.',
  );
}
if (findings.length === 0) {
  const notes = [
    reteaches.size === 0 ? '' : `${reteaches.size} re-teach(es)`,
    donated.size === 0 ? '' : `${donated.size} bound morpheme(s)`,
  ].filter((n) => n !== '');
  const tail = notes.length === 0 ? '' : `, ${notes.join(' and ')} reported above`;
  console.log(`${moduleId}: clean — every shown surface resolves${tail}`);
} else {
  for (const f of findings) console.log(f);
  process.exitCode = 1;
}
