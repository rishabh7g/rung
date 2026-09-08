/**
 * Everything an author needs for ONE module, in about two kilobytes (#480–#487).
 *
 * Measured across twenty-two authoring and review agents, 3.12 MB of tool output was spent, and
 * 42% of it went on three files read WHOLE that nobody needed whole:
 *
 *   566 KB (18.6%)  a shipped module's JSON, `cat`-ed to see the field shape and match the voice
 *   366 KB (12.0%)  `tools/course-briefs.ts`, seven thousand lines read to reach one entry
 *   385 KB (12.7%)  a review doc, read end to end to copy its section structure
 *
 * A module file is ~25 KB and ten sentences long; ONE sentence shows the shape. A brief is one
 * object in a file of two hundred and seventy. So this prints the brief, the bounds, and a single
 * worked sentence from the previous module — the three things an author actually reads before
 * writing — and nothing else.
 *
 *   npm run content:kit -- <course> <moduleId>
 *
 * It is not a replacement for `npm run content:prompt`, which renders the full authoring prompt
 * including the schema, the tag definitions and the allowed vocabulary. This is the cheap look:
 * what am I writing, how long may it be, and what does a finished one look like.
 */
import { readFileSync, existsSync } from 'node:fs';

import { COURSE_BRIEFS } from './course-briefs.ts';

const [courseId, moduleId] = process.argv.slice(2);
if (courseId === undefined || moduleId === undefined) {
  console.error('usage: npm run content:kit -- <course> <moduleId>');
  process.exit(2);
}

const brief = COURSE_BRIEFS[courseId]?.[moduleId];
if (brief === undefined) {
  const known = Object.keys(COURSE_BRIEFS[courseId] ?? {}).join(', ');
  console.error(`no brief for "${courseId} ${moduleId}"${known === '' ? '' : ` — have: ${known}`}`);
  process.exit(2);
}

const rule = (n: number): string => '─'.repeat(n);
const out: string[] = [];

out.push(`${rule(78)}\n${courseId} ${brief.id} — ${brief.title}\n${brief.job}\n${rule(78)}`);
out.push(
  `\nBOUNDS  maxWordsPerSentence: ${brief.maxWordsPerSentence}  newWordCap: ${brief.newWordCap}`,
);
out.push(`\nPATTERNS`);
for (const p of brief.patterns) out.push(`  ${p}`);
out.push(`\nNOTES  (the brief an author writes to — obey every one)`);
for (const [i, n] of brief.notes.entries()) out.push(`\n${i + 1}. ${n}`);

/**
 * One finished sentence from the nearest shipped module, to show the field shape and the voice.
 * The previous rung is the right sample: it is the closest thing to what is being written.
 */
interface Sentence {
  id: string;
  [field: string]: unknown;
}
interface Module {
  sentences: Sentence[];
}
const number_ = Number(moduleId.split('M')[1]);
const level = moduleId.split('-')[0];
let sample: string | null = null;
for (let n = number_ - 1; n >= 1 && sample === null; n -= 1) {
  const file = `content/${courseId}/modules/${level}-M${n}.json`;
  if (!existsSync(file)) continue;
  const mod = JSON.parse(readFileSync(file, 'utf8')) as Module;
  const one = mod.sentences[1] ?? mod.sentences[0];
  if (one === undefined) continue;
  sample = `\n${rule(78)}\nONE SENTENCE FROM ${level}-M${n}, for the field shape and the voice\n${rule(78)}\n${JSON.stringify(one, null, 2)}`;
}
if (sample === null) {
  sample = `\n(no earlier ${level} module of ${courseId} is shipped yet — this is the level's first)`;
}
out.push(sample);

const text = out.join('\n');
console.log(text);
console.error(`\n[author-kit] ${(Buffer.byteLength(text) / 1024).toFixed(1)} KB`);
