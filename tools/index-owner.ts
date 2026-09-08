/**
 * Who owns a surface? A read-only query over the emitted index (#510, #520-#527).
 *
 *   npm run content:owner -- <course> <surface> [surface ...]
 *   npm run content:owner -- en-ru "den'" "prishyól" "mózhno"
 *
 * Every authoring and brief-writing wave so far has hand-rolled this, because the emitted index
 * files are DELTAS (#424) — each one carries only its own module's additions — so "is this word
 * taught?" means folding every file named in the last one's `cumulativeThrough` and applying the
 * same normalisation the runtime resolver applies. Six agents wrote six versions of that fold in
 * one afternoon, and a brief that is wrong about the index is how a sentence comes to rest on an
 * untaught word: en-ru's L3-M5 brief said `yemú` and `yey` "stay L2-M1's row" when nothing in the
 * course had ever taught a third-person dative.
 *
 * So the fold lives here once, importing `normalizeSurface` and `surfaceIndexKeys` from
 * `src/engine/surface.ts` exactly as the emitter and the resolver do. It reads
 * `public/content/<course>/index/`, which `npm run content:build` writes — it never builds, and
 * it never writes, so any number of agents may run it at once.
 *
 * Output is one line per surface: the module that owns it, or `free`. A surface whose whole form
 * is free but whose hyphen parts are owned says so, because `surfaceIndexKeys` indexes both and
 * that is exactly the seam authors keep tripping on (en-fr's `peut-être` bought bare `peut`).
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import path from 'node:path';

import { normalizeSurface, surfaceIndexKeys } from '../src/engine/surface.js';

interface IndexFile {
  moduleId: string;
  cumulativeThrough: string[];
  surfaces: Record<string, unknown>;
}

const [course, ...surfaces] = process.argv.slice(2);
if (course === undefined || surfaces.length === 0) {
  console.error('usage: npm run content:owner -- <course> <surface> [surface ...]');
  process.exit(2);
}

const dir = path.join('public', 'content', course, 'index');
if (!existsSync(dir)) {
  console.error(`no ${dir} — run \`npm run content:build\` first`);
  process.exit(2);
}

/**
 * The LAST module's file names every module before it, so its `cumulativeThrough` IS the fold
 * order — and the last module is the one with the longest such list, not the last filename:
 * `readdirSync` sorts `L1-M10.json` before `L1-M2.json`, which is how a fold silently comes back
 * holding twenty-four surfaces instead of eight hundred.
 */
const read = (moduleId: string): IndexFile =>
  JSON.parse(readFileSync(path.join(dir, `${moduleId}.json`), 'utf8')) as IndexFile;
const all = readdirSync(dir)
  .filter((f) => f.endsWith('.json'))
  .map((f) => read(path.basename(f, '.json')));
const last = all.reduce((deepest, file) =>
  file.cumulativeThrough.length > deepest.cumulativeThrough.length ? file : deepest,
);

/** Surface key → the module that first taught it. First occurrence wins, as the emitter does. */
const owner = new Map<string, string>();
for (const moduleId of last.cumulativeThrough) {
  for (const key of Object.keys(read(moduleId).surfaces))
    if (!owner.has(key)) owner.set(key, moduleId);
}

for (const surface of surfaces) {
  const key = normalizeSurface(surface);
  const whole = owner.get(key);
  const parts = surfaceIndexKeys(key)
    .filter((k) => k !== key)
    .map((k) => `${k} → ${owner.get(k) ?? 'free'}`);
  const tail = parts.length === 0 ? '' : `   [parts: ${parts.join(', ')}]`;
  console.log(`${surface}\t${whole ?? 'free'}${tail}`);
}
console.log(
  `\n${owner.size} surfaces owned, folded over ${last.cumulativeThrough.length} modules through ${last.moduleId}`,
);
