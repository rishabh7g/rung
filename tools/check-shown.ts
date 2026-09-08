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
import { existsSync, readFileSync } from 'node:fs';

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
  cumulativeThrough: string[];
  surfaces: Record<string, unknown>;
  maxSpan: number;
}
interface Word {
  display: string;
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
const shipped = read<IndexFile>(`${indexDir}/L2-M10.json`);

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

/** Fold in the L3 modules already authored, up to and including this one. */
const number = (id: string): number => Number(id.split('M')[1]);
const here = number(moduleId);
for (let n = 1; n <= here; n += 1) {
  const file = `content/${course}/modules/L3-M${n}.json`;
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
 * owner per surface; the other eight courses have no such guard, which is why this reports for all
 * nine, and why it FAILS rather than merely reporting: unlike a re-teach, no course wants it.
 */
const collisions = new Map<string, string>();
const mine = new Map<string, string>();
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
      const row = `${s.id} "${w.display}"`;
      const first = mine.get(key);
      if (first === undefined) mine.set(key, row);
      else if (first !== row) collisions.set(key, `${first} and ${row}`);
    }
  }
}

for (const r of reteaches) console.log(r);
for (const [key, where] of collisions) {
  findings.push(
    `COLLIDES INSIDE THIS MODULE "${key}": ${where} — the fold cannot tell them apart, so the` +
      ' second row is unreachable. One row, or two different surfaces.',
  );
}
if (findings.length === 0) {
  const tail = reteaches.size === 0 ? '' : `, ${reteaches.size} re-teach(es) reported above`;
  console.log(`${moduleId}: clean — every shown surface resolves${tail}`);
} else {
  for (const f of findings) console.log(f);
  process.exitCode = 1;
}
