/**
 * The briefs against the ladders they claim to mirror (#109, #376).
 *
 * `tools/course-briefs.ts` says at the top that "titles and jobs mirror
 * `content/<courseId>/levels.json` verbatim (the test enforces it)". This is that test. It was
 * lost with the render-level suite in #370 and is restored here, at the level it belongs to: a
 * brief is a build-time artefact, so its test lives in `tools/`, reads the authored ladder off
 * disk, and needs no DOM.
 *
 * The second half pins the decisions en-ko's briefs settle, the way the deleted
 * `generate-prompt.test.ts` pinned en-ar's variety and en-de's register. A brief seeds every
 * future prompt, so a decision that quietly disappears from a note is a decision that quietly
 * stops being made.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { COURSE_BRIEFS, NEW_WORD_CAP } from './course-briefs.ts';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/**
 * The brief file's own source. Two of en-ko's decisions live in the header comment rather than in
 * a note — they govern all ten modules, and the header is where the other courses' course-wide
 * decisions are written too — so the only way to pin them is to read the file.
 */
const COURSE_BRIEFS_SOURCE = readFileSync(
  path.join(REPO_ROOT, 'tools', 'course-briefs.ts'),
  'utf8',
);

interface LadderModule {
  id: string;
  title: string;
  job: string;
}

/** The authored ladder for one course, flattened to id → {title, job}. */
function ladder(courseId: string): Map<string, LadderModule> {
  const file = path.join(REPO_ROOT, 'content', courseId, 'levels.json');
  const levels = JSON.parse(readFileSync(file, 'utf8')) as {
    levels: { modules: LadderModule[] }[];
  };
  const byId = new Map<string, LadderModule>();
  for (const level of levels.levels) {
    for (const module of level.modules) byId.set(module.id, module);
  }
  return byId;
}

describe('COURSE_BRIEFS mirrors levels.json', () => {
  it.each(Object.keys(COURSE_BRIEFS))('%s: every brief matches the ladder verbatim', (courseId) => {
    const authored = ladder(courseId);
    const briefs = Object.values(COURSE_BRIEFS[courseId] ?? {});
    expect(briefs.length).toBeGreaterThan(0);
    for (const brief of briefs) {
      const module = authored.get(brief.id);
      expect(module, `${courseId} ${brief.id} is in the ladder`).toBeDefined();
      expect(brief.title, `${courseId} ${brief.id} title`).toBe(module?.title);
      expect(brief.job, `${courseId} ${brief.id} job`).toBe(module?.job);
      expect(brief.patterns.length, `${courseId} ${brief.id} patterns`).toBeGreaterThan(0);
      expect(brief.notes.length, `${courseId} ${brief.id} notes`).toBeGreaterThan(0);
      expect(brief.newWordCap, `${courseId} ${brief.id} cap`).toBe(NEW_WORD_CAP);
    }
  });
});

describe('en-ko: the decisions its briefs settle (#373, #376)', () => {
  const briefs = Object.values(COURSE_BRIEFS['en-ko'] ?? {});
  const everything = briefs
    .flatMap((brief) => [...brief.patterns, ...brief.notes, brief.title, brief.job])
    .join('\n');

  it('covers exactly L1-M1..L1-M10', () => {
    expect(Object.keys(COURSE_BRIEFS['en-ko'] ?? {})).toEqual([
      'L1-M1',
      'L1-M2',
      'L1-M3',
      'L1-M4',
      'L1-M5',
      'L1-M6',
      'L1-M7',
      'L1-M8',
      'L1-M9',
      'L1-M10',
    ]);
  });

  /**
   * The whole reason this course exists in the shape it does: `docs/design-contract.md` (#353)
   * forbids an English-L1 course from asking the learner to decode a non-Latin script, and its
   * forward rule is that a new one is romanized from its first commit. A brief that wrote Hangul
   * would be seeding it into every prompt, and from there into the `display` strings the build
   * would then reject — so catch it here, where it starts.
   */
  it('writes no Hangul anywhere — the briefs teach the romanization (#353)', () => {
    expect(everything).not.toMatch(/[\p{Script=Hangul}]/u);
  });

  /**
   * #373 chose Revised Romanization partly BECAUSE it is pure ASCII: en-ar and en-ru are each
   * charged a `latin-ext` font cut for their romanization's diacritics, and this course is charged
   * none. A pattern that grew one would quietly cost that.
   */
  it('writes its patterns in pure ASCII — no stress mark, no diacritic', () => {
    for (const brief of briefs) {
      for (const pattern of brief.patterns) {
        // ASCII, plus the two meta-notation marks the pattern language itself uses (`→` for a
        // turn's hand-over, `…` for an elision). Neither can appear in a romanized surface.
        expect(pattern, `${brief.id} pattern`).toMatch(/^[\x20-\x7E→…]*$/u);
      }
    }
  });

  /**
   * The prose is English and may quote a French or German term (`passé composé`), so an accent
   * ban over the notes would fail on correct writing — the same trap #361 recorded when a blanket
   * `/ae|oe|ue/` ban flagged real German. What is checkable is the DECISION: en-ru marks stress on
   * every polysyllable (#355) and Korean must not, so the briefs have to say so out loud, or a
   * later author reaching for symmetry with en-ar and en-ru has nothing to stop them.
   */
  it('states that Korean marks no stress, the opposite of en-ru', () => {
    expect(COURSE_BRIEFS_SOURCE).toMatch(/Korean has NO English-style stress/);
    expect(COURSE_BRIEFS_SOURCE).toMatch(/No acutes, ever/);
  });

  it('settles the speech level in a NOTE, jeo included', () => {
    const notes = briefs.flatMap((brief) => brief.notes).join('\n');
    expect(notes).toMatch(/SPEECH LEVEL, settled course-wide/);
    expect(notes).toMatch(/this course speaks the -yo style/);
    expect(notes).toMatch(/The pronoun for I is jeo, never na/);
  });

  it('settles the particle hyphen and names the index seam it protects', () => {
    const notes = briefs.flatMap((brief) => brief.notes).join('\n');
    expect(notes).toMatch(/INDEX SEAM/);
    expect(notes).toMatch(/checked against the EMITTED index/);
    expect(notes).toMatch(/first occurrence winning/);
    // The guarantee the hyphen was chosen for, and the one the index actually delivers.
    expect(notes).toMatch(/the bare key chaek belongs to the chaek row/);
    // The hyphen is the scheme's one deviation from the standard, so every particle in a pattern
    // carries it — a pattern writing a bare particle would be teaching the other scheme.
    expect(everything).toMatch(/-neun/);
    expect(everything).toMatch(/-eul\/reul/);
  });

  it('keeps the deferred list deferred — the shapes L1 names but never writes', () => {
    const notes = briefs.flatMap((brief) => brief.notes).join('\n');
    for (const deferred of ['-go isseoyo', '-gess-', '-ji anayo']) {
      expect(notes, `${deferred} is named`).toContain(deferred);
    }
    expect(notes).toMatch(/DEFERRED|deferred/);
  });
});

describe('hi-mr L3: the decisions its briefs settle (#452)', () => {
  const all = COURSE_BRIEFS['hi-mr'] ?? {};
  const l3 = Object.entries(all).filter(([id]) => id.startsWith('L3-'));
  const notes = l3.flatMap(([, brief]) => brief.notes).join('\n');

  it('covers exactly L1-M1..L3-M10 — three levels, thirty modules', () => {
    expect(Object.keys(all)).toEqual([
      ...['L1', 'L2', 'L3'].flatMap((level) =>
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((n) => `${level}-M${n}`),
      ),
    ]);
  });

  /**
   * The bounds climb inside the level (#452): a converb chain needs ten words, a counterfactual
   * eleven, and an eight-sentence account twelve. They are pinned because a prompt renders them
   * verbatim into `complexity`, so a wrong number here becomes a wrong number in ten module files.
   */
  it('climbs its bounds 10 → 11 → 12 across the level', () => {
    const bound = (id: string): number | undefined => all[id]?.maxWordsPerSentence;
    for (const id of ['L3-M1', 'L3-M2', 'L3-M3']) expect(bound(id), id).toBe(10);
    for (const id of ['L3-M4', 'L3-M5', 'L3-M6', 'L3-M7']) expect(bound(id), id).toBe(11);
    for (const id of ['L3-M8', 'L3-M9', 'L3-M10']) expect(bound(id), id).toBe(12);
  });

  /**
   * Two decisions govern the whole level and must reach an author, who only ever sees the notes:
   * the register carried from L2 with #422's chip, and M10's eight-sentence ceiling.
   */
  it('states the register decision and the M10 shape in a NOTE', () => {
    expect(notes).toMatch(/chips? `?formal`?|chip formal/);
    expect(notes).toMatch(/informal/);
    expect(all['L3-M10']?.notes.join('\n')).toMatch(/AT MOST EIGHT SENTENCES/i);
  });

  it('assigns every shared lexeme an owner, in the notes', () => {
    // वाटणे has two jobs and one row (M3's); M6 points back rather than opening a second.
    expect(all['L3-M3']?.notes.join('\n')).toMatch(/वाटणे/);
    expect(all['L3-M6']?.notes.join('\n')).toMatch(/M3/);
    // भरणे is L2-M8's row doing bills and forms here.
    expect(all['L3-M8']?.notes.join('\n')).toMatch(/भरणे/);
    // की carries all three of its jobs on L2-M9's row.
    expect(all['L3-M5']?.notes.join('\n')).toMatch(/की/);
    // Every module names its index seam, the discipline docs/26 §4 set.
    for (const [id, brief] of l3.filter(([id]) => id !== 'L3-M10')) {
      expect(brief.notes.join('\n'), `${id} names its seam`).toMatch(/INDEX SEAM/);
    }
  });

  it('keeps the passive out and leaves L1-M9 बोललो pinned', () => {
    expect(COURSE_BRIEFS_SOURCE).toMatch(/The \*\*passive stays out of L3 entirely\*\*/);
    expect(all['L3-M5']?.notes.join('\n')).toMatch(/बोललो/);
  });
});
