import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import { normalizeSurface } from '../src/engine/surface.ts';
import { checkScriptMode, type CourseRow, type WordIndexFile } from './content-build.ts';
import { COURSE_BRIEFS, NEW_WORD_CAP, type ModuleBrief } from './course-briefs.ts';
import { generatePrompt, priorModuleId, renderPrompt } from './generate-prompt.ts';
import { DEFAULT_CONTENT_ROOT, REPO_ROOT, SCHEMA_PATH } from './validate.ts';

/**
 * `renderPrompt` is pure, so most of this file feeds it rows/briefs/indexes directly; the
 * CLI-shaped tests write a manifest + built index into a tmp tree and run `generatePrompt`
 * against it — nothing shells out, and nothing touches the repo's own `.prompts/` or
 * `public/content/`.
 */

const SCHEMA_TEXT = readFileSync(SCHEMA_PATH, 'utf8');

const HI_MR: CourseRow = {
  id: 'hi-mr',
  l1: 'Hindi',
  l2: 'Marathi',
  l1Tag: 'hi',
  l2Tag: 'mr',
  l2Dir: 'ltr',
  pairLabel: 'hindi → marathi',
  scriptMode: 'native',
  dir: 'ltr',
};

const EN_ES: CourseRow = {
  id: 'en-es',
  l1: 'English',
  l2: 'Spanish',
  l1Tag: 'en',
  l2Tag: 'es',
  l2Dir: 'ltr',
  pairLabel: 'english → spanish',
  scriptMode: 'native',
  dir: 'ltr',
  fixture: true,
};

const EN_AR: CourseRow = {
  id: 'en-ar',
  l1: 'English',
  l2: 'Arabic',
  l1Tag: 'en',
  l2Tag: 'ar',
  l2Dir: 'rtl',
  pairLabel: 'english → arabic',
  scriptMode: 'romanized',
  dir: 'ltr',
  fixture: true,
  romanizationNote: 'ALA-LC-flavoured: long vowels ā ī ū; al- assimilates before sun letters',
};

/** The fourth course (#267): Hindi L1, English L2 — the first course whose L2 is English. */
const HI_EN: CourseRow = {
  id: 'hi-en',
  l1: 'Hindi',
  l2: 'English',
  l1Tag: 'hi',
  l2Tag: 'en',
  l2Dir: 'ltr',
  pairLabel: 'hindi → english',
  scriptMode: 'native',
  dir: 'ltr',
  fixture: true,
};

/** The fifth course (#332): English L1, Italian L2 — en-es's nearest sibling. The row is kept
    `fixture: true` here, as en-es's and hi-en's are: this file's rows exercise the CLI, not the
    manifest, and #337's graduation is asserted in `tools/content-build.test.ts`. */
const EN_IT: CourseRow = {
  id: 'en-it',
  l1: 'English',
  l2: 'Italian',
  l1Tag: 'en',
  l2Tag: 'it',
  l2Dir: 'ltr',
  pairLabel: 'english → italian',
  scriptMode: 'native',
  dir: 'ltr',
  fixture: true,
};

/** A row for a course with no brief at all — the CLI's "briefed so far" branch needs one. */
const UNBRIEFED: CourseRow = {
  id: 'en-ja',
  l1: 'English',
  l2: 'Japanese',
  l1Tag: 'en',
  l2Tag: 'ja',
  l2Dir: 'ltr',
  pairLabel: 'english → japanese',
  scriptMode: 'native',
  dir: 'ltr',
  fixture: true,
};

function indexThrough(moduleId: string, surfaces: readonly string[]): WordIndexFile {
  const cumulativeThrough: string[] = [];
  const upTo = Number(/-M(\d+)$/.exec(moduleId)?.[1]);
  for (let n = 1; n <= upTo; n += 1) cumulativeThrough.push(`L1-M${n}`);
  return {
    courseId: 'hi-mr',
    moduleId,
    cumulativeThrough,
    surfaceCount: surfaces.length,
    maxSpan: 1,
    surfaces: Object.fromEntries(
      surfaces.map((surface) => [
        surface,
        { moduleId: 'L1-M1', sentenceId: 'L1-M1-S01', wordIdx: 0 },
      ]),
    ),
  };
}

const temporaryDirs: string[] = [];

afterAll(() => {
  for (const dir of temporaryDirs) rmSync(dir, { recursive: true, force: true });
});

function temporaryDir(): string {
  const dir = mkdtempSync(path.join(tmpdir(), 'rung-prompt-'));
  temporaryDirs.push(dir);
  return dir;
}

/* ------------------------------------------------------------- course briefs */

/**
 * Which levels each course has briefs for, with the level's word-bound rails. L1 runs 5 → 8
 * everywhere; hi-mr's L2 (#295, the first L2 briefed) continues the climb, 8 → 10.
 */
const BRIEFED_LEVELS: Readonly<
  Record<string, readonly { level: string; firstBound: number; lastBound: number }[]>
> = {
  'hi-mr': [
    { level: 'L1', firstBound: 5, lastBound: 8 },
    { level: 'L2', firstBound: 8, lastBound: 10 },
  ],
  'en-es': [{ level: 'L1', firstBound: 5, lastBound: 8 }],
  'en-ar': [{ level: 'L1', firstBound: 5, lastBound: 8 }],
  'hi-en': [{ level: 'L1', firstBound: 5, lastBound: 8 }],
  'en-ru': [{ level: 'L1', firstBound: 5, lastBound: 8 }],
  'en-it': [{ level: 'L1', firstBound: 5, lastBound: 8 }],
  'en-fr': [{ level: 'L1', firstBound: 5, lastBound: 8 }],
  'en-de': [{ level: 'L1', firstBound: 5, lastBound: 8 }],
};

/** Every briefed course answers the same two structural questions, so they are asked once. */
describe.each(Object.keys(BRIEFED_LEVELS))('COURSE_BRIEFS %s', (courseId) => {
  const briefs = COURSE_BRIEFS[courseId];
  const briefedLevels = BRIEFED_LEVELS[courseId] ?? [];

  it('covers every briefed level M1–M10, keyed by id, each with patterns, notes and the §5 cap', () => {
    expect(briefs).toBeDefined();
    if (briefs === undefined) return;
    const expected = briefedLevels.flatMap(({ level }) =>
      Array.from({ length: 10 }, (_, i) => `${level}-M${i + 1}`),
    );
    expect(Object.keys(briefs).sort()).toEqual([...expected].sort());
    for (const id of expected) {
      const brief = briefs[id];
      expect(brief).toBeDefined();
      if (brief === undefined) continue;
      expect(brief.id).toBe(id);
      expect(brief.patterns.length).toBeGreaterThan(0);
      expect(brief.notes.length).toBeGreaterThan(0);
      expect(brief.maxWordsPerSentence).toBeGreaterThanOrEqual(3);
      expect(brief.newWordCap).toBe(NEW_WORD_CAP);
    }
  });

  it('mirrors the authored levels.json titles and jobs verbatim, for every briefed level', () => {
    const levels = JSON.parse(
      readFileSync(path.join(DEFAULT_CONTENT_ROOT, courseId, 'levels.json'), 'utf8'),
    ) as { levels: { id: string; modules: { id: string; title: string; job: string }[] }[] };
    for (const { level } of briefedLevels) {
      const authored = levels.levels.find((entry) => entry.id === level);
      expect(authored, level).toBeDefined();
      for (const entry of authored?.modules ?? []) {
        const brief = briefs?.[entry.id];
        expect(brief, entry.id).toBeDefined();
        expect(brief?.title).toBe(entry.title);
        expect(brief?.job).toBe(entry.job);
      }
    }
  });

  it('climbs its word bound across each level and never loosens it', () => {
    if (briefs === undefined) return;
    for (const { level, firstBound, lastBound } of briefedLevels) {
      const bounds = Array.from(
        { length: 10 },
        (_, i) => briefs[`${level}-M${i + 1}`]?.maxWordsPerSentence,
      );
      expect(bounds[0], `${level}-M1`).toBe(firstBound);
      expect(bounds[9], `${level}-M10`).toBe(lastBound);
      for (let i = 1; i < bounds.length; i += 1) {
        expect(Number(bounds[i]), `${level}-M${i + 1}`).toBeGreaterThanOrEqual(
          Number(bounds[i - 1]),
        );
      }
    }
  });
});

describe('COURSE_BRIEFS hi-mr', () => {
  const briefs = COURSE_BRIEFS['hi-mr'];

  it('carries the PRD emphases: M5 gender interference, M9 कारण/म्हणून, M10 turns', () => {
    expect(briefs?.['L1-M5']?.notes.join(' ')).toMatch(/interference/i);
    expect(briefs?.['L1-M9']?.patterns.join(' ')).toContain('कारण');
    expect(briefs?.['L1-M9']?.patterns.join(' ')).toContain('म्हणून');
    expect(briefs?.['L1-M10']?.notes.join(' ')).toMatch(/2–3|turn/i);
  });
});

describe('COURSE_BRIEFS hi-mr L2', () => {
  const briefs = COURSE_BRIEFS['hi-mr'];
  const notes = (id: string): string => briefs?.[id]?.notes.join(' ') ?? '';
  const patterns = (id: string): string => briefs?.[id]?.patterns.join(' ') ?? '';

  it('places each Hindi→Marathi pressure point in the module that needs it', () => {
    // M1: the two-step imperative, the softeners, the आप→आपण false friend.
    expect(notes('L2-M1')).toMatch(/register/i);
    expect(notes('L2-M1')).toContain('दे · कर · ये');
    expect(notes('L2-M1')).toContain('द्याल का');
    expect(notes('L2-M1')).toContain('माफ करा');
    expect(notes('L2-M1')).toContain('आपण');
    expect(notes('L2-M1')).toMatch(/interference/i);
    // M2: he/she from one वह, the plural/respect copula, the neuter person.
    expect(notes('L2-M2')).toContain('वह');
    expect(notes('L2-M2')).toContain('आहेत');
    expect(notes('L2-M2')).toContain('कोण');
    expect(notes('L2-M2')).toContain('मूल');
    // M3: the agreement grid at length, the feminine-plural interference, M8's precedents.
    expect(notes('L2-M3')).toContain('मोठ्या पिशव्या');
    expect(notes('L2-M3')).toContain('रुपया → रुपये');
    expect(notes('L2-M3')).toContain('केळं → केळी');
    // M4: the place -ला and the instrumental -ने, directions.
    expect(notes('L2-M4')).toContain('स्टेशनला');
    expect(notes('L2-M4')).toContain('बसने');
    expect(patterns('L2-M4')).toContain('डावीकडे');
    expect(patterns('L2-M4')).toContain('उजवीकडे');
    // M5: ordering with मिळेल, the host's घ्या, refusing with नको/पुरे, the Marathi table.
    expect(patterns('L2-M5')).toContain('मिळेल का');
    expect(notes('L2-M5')).toContain('घ्या');
    expect(notes('L2-M5')).toContain('पुरे');
    expect(notes('L2-M5')).toContain('पोळी');
    expect(notes('L2-M5')).toContain('जेवलात का');
    // M6: the -ऊ या suggestion, जमेल/चालेल, the clock.
    expect(notes('L2-M6')).toContain('जाऊ या');
    expect(notes('L2-M6')).toContain('जमणे');
    expect(notes('L2-M6')).toContain('चालेल');
    expect(notes('L2-M6')).toContain('वाजता');
    // M7: the continuous, contracted in display with both shapes on the row.
    expect(notes('L2-M7')).toContain('बोलतोय');
    expect(notes('L2-M7')).toContain('बोलत आहे');
    expect(notes('L2-M7')).toContain('कोण बोलतंय');
    expect(notes('L2-M7')).toContain('निरोप');
    // M8: the मिळणे/सापडणे split, the -त नाही frame, M5's law recycled on हरवणे.
    expect(notes('L2-M8')).toContain('मिळणे');
    expect(notes('L2-M8')).toContain('सापडणे');
    expect(notes('L2-M8')).toContain('चालत नाही');
    expect(notes('L2-M8')).toContain('हरवला');
    expect(notes('L2-M8')).toMatch(/interference/i);
    // M9: -पेक्षा glued, the superlative, one Hindi या split into की/किंवा.
    expect(notes('L2-M9')).toContain('चहापेक्षा');
    expect(notes('L2-M9')).toContain('जास्त');
    expect(notes('L2-M9')).toContain('सगळ्यात');
    expect(notes('L2-M9')).toContain('किंवा');
    expect(patterns('L2-M9')).toContain('चहा की कॉफी?');
    // M10: the third-person ergative, the sequencers, the four-sentence account.
    expect(notes('L2-M10')).toContain('त्याने');
    expect(notes('L2-M10')).toContain('तिने');
    expect(notes('L2-M10')).toContain('मग');
    expect(notes('L2-M10')).toContain('भेटलो');
    expect(notes('L2-M10')).toMatch(/four (short )?sentences/i);
  });

  it('pays the debts the L1 reviews recorded, and says where each was recorded', () => {
    // दे (docs/15's M10 note), the counting set (OQ 28), बोलणे (OQ 29), the ने question (Q20).
    expect(notes('L2-M1')).toContain('docs/15');
    expect(notes('L2-M5')).toContain('open question 28');
    expect(notes('L2-M7')).toContain('open question 29');
    expect(notes('L2-M10')).toContain('open question 20');
    // The pinned L1 sweep misses stand: a module's index is cumulative through itself.
    expect(notes('L2-M7')).toContain('बोललो');
    expect(notes('L2-M7')).toMatch(/pinned|STANDS/);
    // आम्ही can never get its own row (OQ 23) — the header says so; M1 restates the आपण seam.
    expect(notes('L2-M1')).toContain('L1-M10');
  });

  it('names the index seam wherever a Devanagari surface is decided', () => {
    // Forms entries become keys, so बसा's row must not list the bare stem बस (M4's bus)…
    expect(notes('L2-M1')).toContain('बसा');
    expect(notes('L2-M4')).toContain("the बस key stays the vehicle's");
    // …प्यायला-as-purpose is L1-M5's past key, so the -आयला frame writes around it…
    expect(notes('L2-M5')).toContain('प्यायला');
    expect(notes('L2-M5')).toContain('जेवायला');
    // …या carries two jobs in one note (come-polite and the -ऊ या invite)…
    expect(notes('L2-M1')).toContain('जाऊ या');
    // …कोण (M2) and कोणता (M9) are sibling keys, cross-referenced, never merged…
    expect(notes('L2-M9')).toContain('कोणता');
    expect(notes('L2-M9')).toContain('कोण');
    // …the course stays single-token (no multi-token surface, -पेक्षा and friends glue on)…
    expect(notes('L2-M9')).toContain('single-token');
    // …and proper nouns never index, so directions anchor on common nouns.
    expect(notes('L2-M4')).toContain('#61');
  });

  it('settles the register and forms policy in NOTES, since a prompt only shows the notes', () => {
    // The four-decision record is docs/26; M1 opens with it and M10 closes with it.
    expect(notes('L2-M1')).toContain('docs/26');
    expect(notes('L2-M10')).toContain('docs/26');
    // Language of fields unchanged from L1: English rules/notes, Hindi learner-facing lines.
    expect(notes('L2-M1')).toContain('rules[].text');
    expect(notes('L2-M1')).toContain('Devanagari');
    expect(notes('L2-M1')).toContain('glossEn');
    // The register chip has no formal value, so तू lines chip informal and usage carries formal.
    expect(notes('L2-M1')).toContain('informal');
    expect(notes('L2-M6')).toContain('informal');
    // L2 never edits an L1 file: new shapes of L1 lexemes point back instead.
    expect(notes('L2-M2')).toContain('no L1 file is edited');
    // A contraction and its full form share one row, participle -त listed as its own form.
    expect(notes('L2-M7')).toContain('बोलतोय · बोलतेय · बोलतंय · बोलत');
  });
});

describe('COURSE_BRIEFS en-es', () => {
  const briefs = COURSE_BRIEFS['en-es'];

  it('places each English→Spanish pressure point in the module that needs it', () => {
    expect(briefs?.['L1-M1']?.notes.join(' ')).toMatch(/pro-drop/i);
    expect(briefs?.['L1-M1']?.notes.join(' ')).toContain('gustar');
    expect(briefs?.['L1-M2']?.notes.join(' ')).toMatch(/ser\/estar|ser vs estar/i);
    expect(briefs?.['L1-M3']?.notes.join(' ')).toMatch(/gender/i);
    expect(briefs?.['L1-M4']?.notes.join(' ')).toMatch(/personal a/i);
    expect(briefs?.['L1-M5']?.notes.join(' ')).toMatch(/interference/i);
    expect(briefs?.['L1-M5']?.notes.join(' ')).toMatch(/preterite/i);
    expect(briefs?.['L1-M5']?.notes.join(' ')).toMatch(/imperfect/i);
    expect(briefs?.['L1-M6']?.patterns.join(' ')).toContain('voy a + V-inf');
    expect(briefs?.['L1-M7']?.patterns.join(' ')).toContain('Hay');
    expect(briefs?.['L1-M7']?.notes.join(' ')).toContain('estar');
    expect(briefs?.['L1-M9']?.patterns.join(' ')).toContain('porque');
    expect(briefs?.['L1-M9']?.patterns.join(' ')).toContain('por eso');
    expect(briefs?.['L1-M10']?.notes.join(' ')).toMatch(/2–3|turn/i);
  });

  it('names the index seam wherever a Spanish homograph is decided', () => {
    // First occurrence wins, so the module that OWNS a colliding surface must say so:
    // `a` (M4, answering for M6's plan a and M7's destination a) and `mañana` (M6, left
    // unclaimed by M4's `por la mañana`) are the `का` bug's Spanish twins.
    expect(briefs?.['L1-M4']?.notes.join(' ')).toContain('por la mañana');
    expect(briefs?.['L1-M6']?.notes.join(' ')).toContain('mañana');
    expect(briefs?.['L1-M8']?.notes.join(' ')).toContain('por favor');
    expect(briefs?.['L1-M9']?.notes.join(' ')).toContain('porque');
  });
});

describe('COURSE_BRIEFS en-ar', () => {
  const briefs = COURSE_BRIEFS['en-ar'];
  const allText = Object.values(briefs ?? {})
    .map((brief) => [...brief.patterns, ...brief.notes].join(' '))
    .join(' ');

  it('places each English→Arabic pressure point in the module that needs it', () => {
    expect(briefs?.['L1-M1']?.notes.join(' ')).toMatch(/present affirmative/i);
    expect(briefs?.['L1-M1']?.notes.join(' ')).toContain('uḥibb al-qahwa');
    expect(briefs?.['L1-M1']?.notes.join(' ')).toContain('urīd māʾ');
    expect(briefs?.['L1-M2']?.patterns.join(' ')).toContain('hal');
    expect(briefs?.['L1-M2']?.notes.join(' ')).toMatch(/sun letters/i);
    expect(briefs?.['L1-M3']?.notes.join(' ')).toMatch(/definiteness/i);
    expect(briefs?.['L1-M3']?.patterns.join(' ')).toContain('lā urīd');
    expect(briefs?.['L1-M4']?.notes.join(' ')).toMatch(/imperfect/i);
    expect(briefs?.['L1-M5']?.notes.join(' ')).toMatch(/interference/i);
    expect(briefs?.['L1-M5']?.notes.join(' ')).toContain('kāna');
    expect(briefs?.['L1-M5']?.notes.join(' ')).toContain('dhahabtu');
    expect(briefs?.['L1-M6']?.patterns.join(' ')).toContain('sa- + V-imperfect');
    expect(briefs?.['L1-M6']?.notes.join(' ')).toContain('sawfa');
    expect(briefs?.['L1-M7']?.notes.join(' ')).toMatch(/iḍāfa/i);
    expect(briefs?.['L1-M7']?.patterns.join(' ')).toContain('ʿind-');
    expect(briefs?.['L1-M8']?.notes.join(' ')).toMatch(/polarity/i);
    expect(briefs?.['L1-M9']?.patterns.join(' ')).toContain('li-ʾanna');
    expect(briefs?.['L1-M9']?.patterns.join(' ')).toContain('li-dhālika');
    expect(briefs?.['L1-M9']?.notes.join(' ')).toMatch(/SUBJECT/);
    expect(briefs?.['L1-M10']?.notes.join(' ')).toMatch(/2–3|turn/i);
  });

  it('names the index seam wherever a romanized Arabic surface is decided', () => {
    // A hyphenated surface also indexes each of its parts (`surfaceIndexKeys`), so the module
    // that teaches the first `al-` / `bi-` / `sa-` / `li-` word owns that clitic's bare key —
    // the `का` bug's Arabic twin — and a multi-token idiom is what keeps a bare word free.
    expect(briefs?.['L1-M1']?.notes.join(' ')).toContain('al-Hind');
    expect(briefs?.['L1-M2']?.notes.join(' ')).toContain('ṣabāḥ al-khayr');
    expect(briefs?.['L1-M2']?.notes.join(' ')).toContain('bi-khayr');
    expect(briefs?.['L1-M4']?.notes.join(' ')).toContain('al-yawm');
    expect(briefs?.['L1-M6']?.notes.join(' ')).toContain('sa-adhhab');
    expect(briefs?.['L1-M8']?.notes.join(' ')).toContain('min faḍlika');
    expect(briefs?.['L1-M9']?.notes.join(' ')).toContain('li-dhālika');
  });

  it('settles the variety in a NOTE, since a prompt only ever shows an author the notes', () => {
    expect(briefs?.['L1-M1']?.notes.join(' ')).toContain('Modern Standard Arabic');
    expect(briefs?.['L1-M1']?.notes.join(' ')).toMatch(/not a dialect/i);
    expect(briefs?.['L1-M10']?.notes.join(' ')).toMatch(/MSA/);
  });

  it('writes one romanization scheme: sun letters assimilated, hamza and ʿayn distinct', () => {
    // The briefs seed every prompt, so a sloppy example becomes sloppy content (#198). `al-`
    // before a sun letter must be written assimilated — lām excepted, where the assimilated
    // spelling IS `al-` (al-layl), and a `*`-starred form excepted, which is deliberately wrong.
    expect(allText).not.toMatch(/(?<!\*)\bal-(?:th|dh|sh|[tdrzsṣḍṭẓn])/);
    // Typographic quotes fold into the hamza and ʿayn classes (`src/engine/surface.ts`), so a
    // stray `’` or `‘` in an example is indistinguishable from a real consonant.
    expect(allText).not.toMatch(/[’‘ʼ]/);
    // Both letters are actually used, and neither is spelled with a plain apostrophe.
    expect(allText).toContain('māʾ');
    expect(allText).toContain('ʿalā');
  });
});

describe('COURSE_BRIEFS en-it', () => {
  const briefs = COURSE_BRIEFS['en-it'];
  const allText = Object.values(briefs ?? {})
    .map((brief) => [...brief.patterns, ...brief.notes].join(' '))
    .join(' ');

  it('places each English→Italian pressure point in the module that needs it', () => {
    expect(briefs?.['L1-M1']?.notes.join(' ')).toMatch(/pro-drop/i);
    expect(briefs?.['L1-M1']?.notes.join(' ')).toContain('piacere');
    expect(briefs?.['L1-M1']?.patterns.join(' ')).toContain('Mi chiamo + name');
    expect(briefs?.['L1-M2']?.notes.join(' ')).toMatch(/rising voice|intonation/i);
    expect(briefs?.['L1-M2']?.notes.join(' ')).toMatch(/no do-support/i);
    expect(briefs?.['L1-M3']?.notes.join(' ')).toContain('non');
    expect(briefs?.['L1-M3']?.notes.join(' ')).toMatch(/BARE infinitive/);
    expect(briefs?.['L1-M4']?.notes.join(' ')).toMatch(/ONE Italian present/);
    expect(briefs?.['L1-M5']?.notes.join(' ')).toMatch(/interference/i);
    expect(briefs?.['L1-M5']?.notes.join(' ')).toContain('passato prossimo');
    expect(briefs?.['L1-M5']?.notes.join(' ')).toMatch(/participle AGREES with the subject/);
    expect(briefs?.['L1-M6']?.notes.join(' ')).toContain('futuro semplice');
    expect(briefs?.['L1-M7']?.patterns.join(' ')).toContain('Ci sono');
    expect(briefs?.['L1-M8']?.notes.join(' ')).toMatch(/INVARIABLE/);
    expect(briefs?.['L1-M9']?.patterns.join(' ')).toContain('perché');
    expect(briefs?.['L1-M9']?.patterns.join(' ')).toContain('quindi');
    expect(briefs?.['L1-M9']?.notes.join(' ')).toContain('ho fame');
    expect(briefs?.['L1-M10']?.notes.join(' ')).toMatch(/2–3|turn/i);
  });

  /**
   * Each module names the false-but-memorable slogan it will attract and states the law that
   * replaces it (the header's rule 2, learned on hi-mr's M5). These are the ten laws, one per
   * module, and a brief that lost one would let the slogan back into a prompt.
   */
  it('names the slogan each module attracts, and the law replacing it', () => {
    expect(briefs?.['L1-M1']?.notes.join(' ')).toContain('-o is masculine, -a is feminine');
    expect(briefs?.['L1-M1']?.notes.join(' ')).toContain('piace means like');
    expect(briefs?.['L1-M2']?.notes.join(' ')).toMatch(/optional emphasis/);
    expect(briefs?.['L1-M3']?.notes.join(' ')).toContain('Add -s for the plural');
    expect(briefs?.['L1-M4']?.notes.join(' ')).toMatch(/\*sto mangiare/);
    expect(briefs?.['L1-M5']?.notes.join(' ')).toContain('Verbs of motion take essere');
    expect(briefs?.['L1-M6']?.notes.join(' ')).toMatch(
      /You need the future tense to talk about the future/,
    );
    expect(briefs?.['L1-M7']?.notes.join(' ')).toMatch(/c'è means there is\/are/);
    expect(briefs?.['L1-M8']?.notes.join(' ')).toMatch(/quanto is how much and quanti is how many/);
    expect(briefs?.['L1-M9']?.notes.join(' ')).toMatch(/perché means why/);
    expect(briefs?.['L1-M10']?.notes.join(' ')).toContain('You must write the subject pronoun');
  });

  it('settles the register in a NOTE, since a prompt only ever shows an author the notes', () => {
    // tu course-wide, Lei in no display string: the decision itself is #333's deliverable, and
    // a prompt carries it only if it is in the notes.
    expect(briefs?.['L1-M1']?.notes.join(' ')).toMatch(/L1 speaks tu/);
    expect(briefs?.['L1-M1']?.notes.join(' ')).toMatch(/NO display string/);
    expect(briefs?.['L1-M2']?.notes.join(' ')).toContain('come stai?');
    expect(briefs?.['L1-M2']?.notes.join(' ')).toMatch(/never come sta\?/);
    // The one module where the decision is most likely to be argued says why it holds anyway.
    expect(briefs?.['L1-M8']?.notes.join(' ')).toMatch(/REGISTER/);
    expect(briefs?.['L1-M8']?.notes.join(' ')).toMatch(/no Lei form in any display/);
  });

  it('names the index seam wherever an Italian homograph or elision is decided', () => {
    // First occurrence wins and an inner apostrophe never splits (`src/engine/surface.ts`), so
    // every colliding surface and every elided one has an owning module named in the notes.
    expect(briefs?.['L1-M1']?.notes.join(' ')).toContain('sono is ONE row');
    expect(briefs?.['L1-M1']?.notes.join(' ')).toContain('mi chiamo');
    expect(briefs?.['L1-M3']?.notes.join(' ')).toContain("un po' di");
    expect(briefs?.['L1-M4']?.notes.join(' ')).toContain('alle');
    expect(briefs?.['L1-M5']?.notes.join(' ')).toContain('ho');
    expect(briefs?.['L1-M6']?.notes.join(' ')).toContain('vado a Roma');
    expect(briefs?.['L1-M7']?.notes.join(' ')).toContain("c'è");
    expect(briefs?.['L1-M7']?.notes.join(' ')).toContain("dov'è");
    expect(briefs?.['L1-M8']?.notes.join(' ')).toContain('per favore');
    expect(briefs?.['L1-M9']?.notes.join(' ')).toMatch(/opens NO ho row/);
    // The accent seam is the other half: è/e and sì/si are one keystroke apart and the index
    // keeps them apart only because the accent is written.
    expect(briefs?.['L1-M2']?.notes.join(' ')).toMatch(/ACCENT SEAM/);
    expect(briefs?.['L1-M10']?.notes.join(' ')).toMatch(/ACCENT SEAM/);
  });

  it('writes one Italian orthography: straight apostrophes, and the accents actually on', () => {
    // The briefs seed every prompt, so a sloppy example becomes sloppy content. A curly quote
    // folds to a straight one on the index (`src/engine/surface.ts`) but would reach `display`
    // as a second spelling of the same word, so no example may carry one.
    expect(allText).not.toMatch(/[’‘]/);
    // The accents these briefs argue about have to be written in the briefs themselves.
    expect(allText).toContain('perché');
    expect(allText).toContain('è');
    expect(allText).toContain('sì');
    expect(allText).toContain('lunedì');
  });
});

describe('COURSE_BRIEFS hi-en', () => {
  const briefs = COURSE_BRIEFS['hi-en'];
  const notes = (id: string): string => briefs?.[id]?.notes.join(' ') ?? '';
  const patterns = (id: string): string => briefs?.[id]?.patterns.join(' ') ?? '';
  const allText = Object.values(briefs ?? {})
    .map((brief) => [...brief.patterns, ...brief.notes].join(' '))
    .join(' ');

  it('places each Hindi→English pressure point in the module that needs it', () => {
    // M1: the verb moves to the middle, be by person, THE article, like with a plain subject.
    expect(notes('L1-M1')).toMatch(/word ORDER/);
    expect(notes('L1-M1')).toContain('*I am student');
    expect(notes('L1-M1')).toContain('*Me tea likes');
    expect(notes('L1-M1')).toContain('मेरा नाम है रोहन');
    // M2: inversion, one you, short answers.
    expect(patterns('L1-M2')).toContain('How are you?');
    expect(notes('L1-M2')).toContain('Are you a teacher?');
    expect(notes('L1-M2')).toContain('तू / तुम / आप');
    expect(notes('L1-M2')).toContain("No, I'm not");
    // M3: want to, do-support, the three article cases, plural -s.
    expect(patterns('L1-M3')).toContain('I want to + V');
    expect(notes('L1-M3')).toContain('*I want eat');
    expect(notes('L1-M3')).toContain('*I not want tea');
    expect(notes('L1-M3')).toContain('*two book');
    // M4: third-person -s, prepositions of time in front, states take the simple present.
    expect(notes('L1-M4')).toContain('he gets up');
    expect(notes('L1-M4')).toContain('*I am knowing');
    expect(notes('L1-M4')).toContain('*I am having two brothers');
    expect(notes('L1-M4')).toContain('on Monday');
    // M5: one past form, did + base verb is the interference.
    expect(notes('L1-M5')).toMatch(/interference/i);
    expect(notes('L1-M5')).toContain("*I didn't went");
    expect(notes('L1-M5')).toContain('मैंने चाय पी');
    // M6: will + base, going to for plans, the continuous for arrangements.
    expect(patterns('L1-M6')).toContain('I will + V');
    expect(notes('L1-M6')).toContain('*I will to go');
    expect(notes('L1-M6')).toContain("I'm meeting her tomorrow");
    // M7: prepositions before the noun, the dummy subject Hindi lacks.
    expect(patterns('L1-M7')).toContain('There is');
    expect(notes('L1-M7')).toContain('*On the table is a book');
    expect(notes('L1-M7')).toContain('किताब है पर मेज़');
    // M8: how much vs how many, rupees.
    expect(notes('L1-M8')).toContain('*How much bananas?');
    expect(notes('L1-M8')).toContain('rupees');
    // M9: one connector, never both.
    expect(patterns('L1-M9')).toContain('because');
    expect(patterns('L1-M9')).toContain(', so');
    expect(notes('L1-M9')).toContain("*Because I'm tired, so I don't want coffee");
    // M10: turns, the never-dropped subject, he vs she.
    expect(notes('L1-M10')).toMatch(/2–3|turn/i);
    expect(notes('L1-M10')).toContain('*Am tired');
    expect(notes('L1-M10')).toContain('he vs she');
  });

  it('names the slogan each module attracts and states the law instead (rule 2)', () => {
    expect(notes('L1-M1')).toContain('"English has no gender"');
    expect(notes('L1-M3')).toContain('"the = specific, a = any"');
    expect(notes('L1-M4')).toContain('"English verbs don\'t change"');
    expect(notes('L1-M4')).toContain('"-ing means now"');
    expect(notes('L1-M6')).toContain('"will is the future"');
  });

  it('names the index seam wherever an English homograph or contraction is decided', () => {
    // First occurrence wins, so the module that OWNS a colliding surface must say so: one be row
    // (M1, extended by M5), to / do / the (M3), have + in / on / at (M4), it (M7), that / so (M9)
    // — and each contraction is one surface, owned by the module that introduces it.
    expect(notes('L1-M1')).toContain('am · is · are');
    expect(notes('L1-M1')).toContain('a · an');
    expect(notes('L1-M2')).toContain("I'm · I am");
    expect(notes('L1-M2')).toContain('good morning');
    expect(notes('L1-M2')).toContain('thank you');
    expect(notes('L1-M3')).toContain("don't · do not");
    expect(notes('L1-M3')).toContain('to is taught here as a BARE row');
    expect(notes('L1-M3')).toContain('this first bare do owns the key');
    expect(notes('L1-M3')).toContain('the is first taught here');
    expect(notes('L1-M4')).toContain('get up');
    expect(notes('L1-M4')).toContain('wake up');
    expect(notes('L1-M4')).toContain('POSSESSION only');
    expect(notes('L1-M4')).toContain('in / on / at are first taught here');
    expect(notes('L1-M5')).toContain('am · is · are · was · were');
    expect(notes('L1-M6')).toContain('going to');
    expect(notes('L1-M6')).toContain('going to + a PLACE');
    expect(notes('L1-M7')).toContain('there is · there are');
    expect(notes('L1-M7')).toContain('next to');
    expect(notes('L1-M7')).toContain("it's · it is");
    expect(notes('L1-M8')).toContain('how much; how many');
    expect(notes('L1-M8')).toContain('Can I have as ONE three-token surface');
    expect(notes('L1-M9')).toContain("the course's first that");
    expect(notes('L1-M9')).toContain("so is this module's consequence word and owns the key");
  });

  it('settles the language of every field in a NOTE, since a prompt only ever shows the notes', () => {
    // Hindi teaching prose, English only in the L2 slots, no glossEn, literal in English order —
    // and hi-mr's English notes named as the thing NOT to copy (#269).
    expect(notes('L1-M1')).toContain('every teaching field is Hindi in Devanagari');
    expect(notes('L1-M1')).toContain('English appears ONLY in display');
    expect(notes('L1-M1')).toContain('No glossEn on any sentence');
    expect(notes('L1-M1')).toContain('the Hindi words in English order');
    expect(notes('L1-M1')).toContain('content/hi-mr/modules/L1-M1.json');
    expect(notes('L1-M1')).toContain('hi-en must NOT copy it');
    expect(notes('L1-M10')).toContain('Devanagari');
    expect(notes('L1-M10')).toContain('no glossEn');
  });

  it('writes straight apostrophes only and every contraction as one surface', () => {
    // surface.ts folds a curly quote, but the briefs seed every prompt and display must be one
    // spelling — so no typographic quote anywhere, and the contractions the policy names appear.
    expect(allText).not.toMatch(/[’‘]/);
    for (const contraction of ["I'm", "don't", "doesn't", "didn't", "it's"]) {
      expect(allText).toContain(contraction);
    }
    // No possessive 's is taught: the one that appears is named as the thing not to write.
    expect(allText).toContain("never Rohan's book");
  });
});

describe('COURSE_BRIEFS en-fr', () => {
  const briefs = COURSE_BRIEFS['en-fr'];
  const notes = (id: string): string => briefs?.[id]?.notes.join(' ') ?? '';
  const patterns = (id: string): string => briefs?.[id]?.patterns.join(' ') ?? '';
  const ids = Array.from({ length: 10 }, (_, i) => `L1-M${i + 1}`);
  const allText = Object.values(briefs ?? {})
    .map((brief) => [...brief.patterns, ...brief.notes].join(' '))
    .join(' ');

  it('places each English→French pressure point in the module that needs it', () => {
    // M1: the reflexive chunk, être by person, gender, and the generic article English drops.
    expect(patterns('L1-M1')).toContain("Je m'appelle + name");
    expect(notes('L1-M1')).toContain('je suis · vous êtes · il/elle est');
    expect(notes('L1-M1')).toContain('*Je suis un étudiant');
    expect(notes('L1-M1')).toContain("*J'aime café");
    // M2: greetings tied to the register, ça va, one question strategy, agreement, no do.
    expect(patterns('L1-M2')).toContain('Ça va ?');
    expect(notes('L1-M2')).toContain('salut');
    expect(notes('L1-M2')).toContain('Vous êtes de Paris ?');
    expect(notes('L1-M2')).toContain('fatigué');
    expect(notes('L1-M2')).toContain('fatiguée');
    // The agreement rule names the SUBJECT, never the speaker — docs/08's thrice-made correction.
    expect(notes('L1-M2')).toMatch(/agrees with the SUBJECT/);
    expect(notes('L1-M2')).toContain('no French word standing in for');
    // M3: the bare infinitive, the two-part negation, the partitive, the silent plural.
    expect(patterns('L1-M3')).toContain('Je veux + V-inf');
    expect(notes('L1-M3')).toContain('*Je veux à manger');
    expect(notes('L1-M3')).toContain('*Je ne veux pas du café');
    expect(notes('L1-M3')).toContain('du pain, de la soupe, des pommes');
    // M4: one present for both English presents, the reflexive daily, the habitual article.
    expect(notes('L1-M4')).toContain('*Je suis manger');
    expect(notes('L1-M4')).toContain('je me lève');
    expect(notes('L1-M4')).toContain('"on Mondays"');
    expect(notes('L1-M4')).toContain('à sept heures');
    // M5: the passé composé, the être set with agreement, negation on the auxiliary, no did.
    expect(notes('L1-M5')).toContain("J'ai mangé");
    expect(notes('L1-M5')).toContain('je suis allée');
    expect(notes('L1-M5')).toContain("*Je n'ai pas allé");
    expect(notes('L1-M5')).toContain('*Je ne suis allé pas');
    expect(notes('L1-M5')).toMatch(/imparfait is DEFERRED/);
    // M6: aller + bare infinitive, the futur simple deferred, demain + present.
    expect(patterns('L1-M6')).toContain('Demain + je vais + V-inf');
    expect(notes('L1-M6')).toContain('*Je vais à manger');
    expect(notes('L1-M6')).toContain('Demain je travaille');
    expect(notes('L1-M6')).toMatch(/futur simple \(je mangerai\) is DEFERRED/);
    // M7: the invariable existential, simple vs compound prepositions, the location copula.
    expect(patterns('L1-M7')).toContain('Il y a');
    expect(notes('L1-M7')).toContain('*Il y ont');
    expect(notes('L1-M7')).toContain('sur la table');
    expect(notes('L1-M7')).toContain('à côté de la table');
    expect(notes('L1-M7')).toContain('Où est le livre ?');
    // M8: the price question, one combien de, quantities, the polite edge.
    expect(patterns('L1-M8')).toContain("C'est combien ?");
    expect(notes('L1-M8')).toContain('Combien de pain ?');
    expect(notes('L1-M8')).toContain('*combien des pommes');
    expect(notes('L1-M8')).toContain('un kilo de riz');
    // M9: the reason/consequence pair, the avoir states, the obligatory que.
    expect(patterns('L1-M9')).toContain('parce que');
    expect(patterns('L1-M9')).toContain(', donc');
    expect(notes('L1-M9')).toContain('*Je suis faim');
    expect(notes('L1-M9')).toContain("*Je pense c'est bien");
    // M10: turns, the never-dropped pronoun, gendered il/elle for things.
    expect(notes('L1-M10')).toMatch(/2–3|turn/i);
    expect(notes('L1-M10')).toContain('NEVER dropped');
    expect(notes('L1-M10')).toContain('*Il est belle');
  });

  it('settles the register in a NOTE, since a prompt only ever shows an author the notes', () => {
    // French forces a choice English never makes, and it is taken once for the course (#327):
    // vous throughout, tu named in prose and never written, je voudrais deferred with it.
    expect(notes('L1-M1')).toContain('this course speaks vous');
    expect(notes('L1-M1')).toContain('never WRITTEN in L1');
    expect(notes('L1-M1')).toContain('je voudrais');
    expect(notes('L1-M1')).toContain('register neutral');
    // …and it is still the register at the far end of the ladder, not a first-module aside.
    expect(notes('L1-M2')).toContain('register decision');
    expect(notes('L1-M3')).toContain('Vous voulez');
    expect(notes('L1-M8')).toContain("s'il te plaît is tu's and is never written here");
    expect(notes('L1-M10')).toContain('vous to the end, tu never written');
  });

  it('names the index seam wherever a French surface is decided', () => {
    // Every module says where its colliding surfaces land: first occurrence wins, so a key the
    // wrong module opens is a note the learner reads for the rest of the course.
    for (const id of ids) expect(notes(id), id).toContain('INDEX SEAM');
    // Elision: an inner apostrophe stays inside its token, so the fusion is its own row and the
    // bare stem is never listed on it (the hi-mr forms-swallowing bug in French dress).
    expect(notes('L1-M1')).toContain("j'aime is ONE surface");
    expect(notes('L1-M1')).toContain('never lists the bare aime in forms');
    expect(notes('L1-M5')).toContain("j'ai is one fused token");
    expect(notes('L1-M9')).toContain("the fused n'ai row");
    // Accents are letters, and each accented pair has an owner: à (M4) vs a, où (M7) vs ou,
    // mange (M4) vs mangé (M5), ça with its cedilla on the capital.
    expect(notes('L1-M4')).toContain('this module teaches the surface à first');
    expect(notes('L1-M4')).toContain('Bare a ("has") never appears in L1');
    expect(notes('L1-M7')).toContain('où carries its accent always');
    expect(notes('L1-M5')).toContain('the accent IS the tense');
    expect(notes('L1-M2')).toContain('*Ca va');
    // Multi-token surfaces keep bare words free, and each names the word it protects.
    expect(notes('L1-M1')).toContain('keeps the bare je free');
    expect(notes('L1-M2')).toContain('leaves ça free');
    expect(notes('L1-M4')).toContain('whole two-token surfaces');
    expect(notes('L1-M7')).toContain('ONE three-token surface');
    expect(notes('L1-M7')).toContain('à côté de · à côté du · à côté de la');
    expect(notes('L1-M8')).toContain("s'il vous plaît is ONE three-token surface");
    expect(notes('L1-M9')).toContain('parce que is a two-token surface');
    // Homograph owners, each stated in the module that owns the key.
    expect(notes('L1-M1')).toContain('forms suis · êtes · est');
    expect(notes('L1-M2')).toContain("est is already M1's");
    expect(notes('L1-M3')).toContain('pas is the negator');
    expect(notes('L1-M3')).toContain('"of the" before a place or a possessor');
    expect(notes('L1-M6')).toContain('ONE vais row');
    expect(notes('L1-M7')).toContain("du is M3's partitive row");
    expect(notes('L1-M8')).toContain("c'est is this module's row");
    expect(notes('L1-M10')).toContain('both il and elle are still free here');
    // The question policy exists partly BECAUSE of a seam: est-ce que carries a hyphen, and
    // surfaceIndexKeys would hand it the bare est and ce keys.
    expect(notes('L1-M2')).toContain('surfaceIndexKeys would hand it the bare est and ce keys');
  });

  it('names the slogan each module attracts and states the law instead (rule 2)', () => {
    // Header rule 2: a rule must be TRUE first and memorable second, so every module names the
    // memorable-and-false thing it will attract, in quotes, and the law that replaces it.
    for (const id of ids) {
      expect(notes(id), `${id} slogan`).toMatch(/slogan/i);
      expect(notes(id), `${id} law`).toContain('The law:');
    }
    expect(notes('L1-M1')).toContain('"un = a, le = the"');
    expect(notes('L1-M3')).toContain('"add -s for the plural"');
    expect(notes('L1-M4')).toContain('"French has no continuous, so drop the -ing"');
    expect(notes('L1-M6')).toContain('"will = the future tense"');
    expect(notes('L1-M9')).toContain('"être translates every \'I am\'"');
  });

  it('writes straight apostrophes and every accent — the briefs seed every prompt', () => {
    // A curly quote folds into the apostrophe class on the index (`src/engine/surface.ts`), so a
    // stray one in an example is indistinguishable from the straight one `display` must carry.
    expect(allText).not.toMatch(/[’‘]/);
    // Accents are never optional and the briefs must model that: every one of these is a word
    // whose unaccented spelling is a DIFFERENT word, or no word at all.
    for (const accented of ['être', 'à', 'où', 'ça', 'mangé', 'très']) {
      expect(allText, accented).toContain(accented);
    }
    // The elided fusions the policy names all appear, straight-quoted.
    for (const fusion of ["j'aime", "c'est", "n'ai", "m'appelle", "s'il vous plaît"]) {
      expect(allText, fusion).toContain(fusion);
    }
  });
});

/**
 * en-de (#356–#361) is the eighth course and en-fr's closest mirror, so most of this block has
 * en-fr's shape. What it adds is the seam no earlier course could reach: `src/engine/surface.ts`
 * rule 4 CASE-FOLDS, German capitalises every noun, and the two together merge pairs that are
 * genuinely two words. Those merges are asserted against the REAL `normalizeSurface` below rather
 * than described — the discipline #339 used on `ё`/`е` — because a brief that assumed the fold
 * wrongly would seed every future prompt with a plan the index cannot honour.
 */
describe('COURSE_BRIEFS en-de', () => {
  const briefs = COURSE_BRIEFS['en-de'];
  const notes = (id: string): string => briefs?.[id]?.notes.join(' ') ?? '';
  const patterns = (id: string): string => briefs?.[id]?.patterns.join(' ') ?? '';
  const ids = Array.from({ length: 10 }, (_, i) => `L1-M${i + 1}`);
  const allText = Object.values(briefs ?? {})
    .map((brief) => [...brief.patterns, ...brief.notes].join(' '))
    .join(' ');

  it('places each English→German pressure point in the module that needs it', () => {
    // M1: the name chunk, sein by person, three-way gender, and the two bare slots English fills.
    expect(patterns('L1-M1')).toContain('Ich heiße + name');
    expect(patterns('L1-M1')).toContain('Ich komme aus + place');
    expect(patterns('L1-M1')).toContain('Ich bin + N (profession, bare)');
    expect(patterns('L1-M1')).toContain('Ich mag + N (bare)');
    expect(notes('L1-M1')).toContain('ich bin · er/sie/es ist · Sie sind');
    expect(notes('L1-M1')).toContain('der Tisch (m) · die Tür (f) · das Buch (n)');
    expect(notes('L1-M1')).toContain('EVERY NOUN IS CAPITALISED');
    expect(notes('L1-M1')).toContain('*Ich bin ein Student');
    expect(notes('L1-M1')).toContain('*Ich mag den Kaffee');
    // …and it says the generic is the OPPOSITE of French and Spanish, for an author off #327/#191.
    expect(notes('L1-M1')).toMatch(/OPPOSITE of French and Spanish/i);
    // M2: greetings tied to the register, the dative experiencer, verb-first questions, doch.
    expect(patterns('L1-M2')).toContain('Wie geht es Ihnen + ?');
    expect(notes('L1-M2')).toContain('DATIVE-EXPERIENCER');
    expect(notes('L1-M2')).toContain('how goes it to-you');
    expect(notes('L1-M2')).toContain('VERB-FIRST');
    expect(notes('L1-M2')).toContain('Sind Sie müde?');
    expect(notes('L1-M2')).toContain('no German word standing in for English do');
    expect(notes('L1-M2')).toContain('doch');
    // M3: möchte, the clause-final infinitive, nicht vs kein, the masculine-only accusative.
    expect(patterns('L1-M3')).toContain('Ich möchte + N');
    expect(patterns('L1-M3')).toContain('Ich möchte + infinitive (clause-final)');
    expect(notes('L1-M3')).toContain('Ich möchte einen Kaffee trinken');
    expect(notes('L1-M3')).toContain('*Ich möchte nicht Brot');
    expect(notes('L1-M3')).toContain('Ich möchte kein Brot');
    expect(notes('L1-M3')).toMatch(/visible on the MASCULINE ONLY/);
    // M4: one present for both, the separable prefix, fronting that inverts, the reflexive daily.
    expect(notes('L1-M4')).toContain('*Ich bin essen');
    expect(notes('L1-M4')).toContain('Ich stehe um sieben Uhr auf');
    expect(notes('L1-M4')).toContain('Um sieben Uhr stehe ich auf');
    expect(notes('L1-M4')).toContain('second ELEMENT, not the second WORD');
    expect(notes('L1-M4')).toContain('Ich wasche mich');
    // M5: the Perfekt bracket, the haben/sein split, the ge- infix, and the named exception.
    expect(notes('L1-M5')).toContain('Ich habe Brot gegessen');
    expect(notes('L1-M5')).toContain('I have bread eaten');
    expect(notes('L1-M5')).toContain('*Ich habe nach Hause gegangen');
    expect(notes('L1-M5')).toContain('aufgestanden');
    expect(notes('L1-M5')).toMatch(/Präteritum is otherwise OUT of L1/);
    expect(notes('L1-M5')).toContain('Ich war müde');
    expect(notes('L1-M5')).toContain('Ich hatte Hunger');
    // M6: present-for-future, the inversion reused, werden deferred, and the will false friend.
    expect(patterns('L1-M6')).toContain('Morgen + V + ich + N');
    expect(notes('L1-M6')).toContain('Morgen esse ich Brot');
    expect(notes('L1-M6')).toContain('*Morgen ich esse Brot');
    expect(notes('L1-M6')).toMatch(/werden \+ infinitive .* is DEFERRED/);
    expect(notes('L1-M6')).toContain('Ich will does NOT mean "I will"');
    // M7: the invariable existential that takes the accusative, and the two-way prepositions.
    expect(patterns('L1-M7')).toContain('Es gibt + einen/eine/ein + N');
    expect(notes('L1-M7')).toContain('Es gibt einen Stuhl');
    expect(notes('L1-M7')).toContain('it gives a chair');
    expect(notes('L1-M7')).toContain('DATIVE for a LOCATION and the ACCUSATIVE for MOTION TOWARD');
    expect(notes('L1-M7')).toContain('Ich gehe in den Park');
    expect(notes('L1-M7')).toContain('Wo ist das Buch?');
    // M8: the price question, the backwards numbers, the bare measure phrase, the plural-less Euro.
    expect(patterns('L1-M8')).toContain('Was kostet + der/die/das + N + ?');
    expect(notes('L1-M8')).toContain('einundzwanzig');
    expect(notes('L1-M8')).toContain('one-and-twenty');
    expect(notes('L1-M8')).toContain('ein Kilo Brot');
    expect(notes('L1-M8')).toContain('*zwei Euros');
    // M9: weil against denn, the haben states, the dative experiencer, the obligatory dass.
    expect(patterns('L1-M9')).toContain('weil');
    expect(patterns('L1-M9')).toContain('denn');
    expect(notes('L1-M9')).toContain('weil ich müde bin');
    expect(notes('L1-M9')).toContain('denn ich bin müde');
    expect(notes('L1-M9')).toContain('*Ich bin Hunger');
    expect(notes('L1-M9')).toContain('Mir ist kalt');
    expect(notes('L1-M9')).toContain('*Ich denke das Buch ist gut');
    // M10: turns, the three conjunction behaviours, the false friend, gendered er/sie/es.
    expect(notes('L1-M10')).toMatch(/2–3|turn/i);
    expect(notes('L1-M10')).toContain('NEVER dropped');
    expect(notes('L1-M10')).toContain('Der Tisch ist groß. Er ist auch alt.');
    expect(notes('L1-M10')).toContain('also is a FALSE FRIEND');
  });

  it('settles the register in a NOTE, since a prompt only ever shows an author the notes', () => {
    // German forces a choice English never makes, and it is taken once for the whole course:
    // Sie throughout, du named in prose and never written, ihr going out with it.
    expect(notes('L1-M1')).toContain('this course speaks Sie');
    expect(notes('L1-M1')).toContain('never WRITTEN in L1');
    expect(notes('L1-M1')).toContain('register neutral');
    // The note says the thing that makes German's choice heavier than French's: Sie is not a
    // politeness coating, it takes the PLURAL verb form, and Ihr/Ihnen move with it.
    expect(notes('L1-M1')).toMatch(/PLURAL verb form/);
    expect(notes('L1-M1')).toContain('Sie sind, Sie haben');
    expect(notes('L1-M1')).toContain('Ihr');
    expect(notes('L1-M1')).toContain('Ihnen');
    // M2 is the module that first addresses somebody, so it names the slogan and states the law.
    expect(notes('L1-M2')).toMatch(/REGISTER, decided course-wide/);
    expect(notes('L1-M2')).toContain('"Sie is just polite you"');
    expect(notes('L1-M2')).toMatch(/distinct grammatical person that takes the PLURAL verb form/);
    expect(notes('L1-M2')).toContain('*Sie ist');
    expect(notes('L1-M2')).toContain('Hallo');
    // …and the register is still the register at the far end of the ladder.
    expect(notes('L1-M3')).toContain('Möchten Sie');
    expect(notes('L1-M10')).toContain('Sie to the end, du never written');
  });

  it('states the case-folding consequence, and it holds against the real normalizeSurface', () => {
    // Rule 4 of `src/engine/surface.ts` lowercases every token. Every course before this one was
    // briefed under that rule without feeling it; German capitalises every noun, so here the fold
    // MERGES words. Assert the merges against the function rather than trusting the prose.
    for (const [a, b] of [
      ['Sie', 'sie'],
      ['Essen', 'essen'],
      ['Morgen', 'morgen'],
      ['Ihnen', 'ihnen'],
      ['Ihr', 'ihr'],
    ] as const) {
      expect(normalizeSurface(a), `${a}/${b}`).toBe(normalizeSurface(b));
    }
    // A multi-token surface is NOT an escape hatch here, which is why the briefs do not reach for
    // one: `Sie sind` and `sie sind` fold to the same key too.
    expect(normalizeSurface('Sie sind')).toBe(normalizeSurface('sie sind'));
    // And these are NOT merges — different spellings are different keys, so `ist`/`isst` and
    // `das`/`dass` are homophone and spelling traps, never index collisions.
    for (const [a, b] of [
      ['ist', 'isst'],
      ['das', 'dass'],
      ['Maße', 'Masse'],
      ['schon', 'schön'],
      ['Mutter', 'Mütter'],
    ] as const) {
      expect(normalizeSurface(a), `${a}/${b}`).not.toBe(normalizeSurface(b));
    }
    // The prose says all of that, in the header section and in the notes an author actually sees.
    const source = readFileSync(path.join(REPO_ROOT, 'tools', 'course-briefs.ts'), 'utf8');
    const section = source.slice(source.indexOf('## en-de: decisions a brief must settle'));
    expect(section).toContain("normalizeSurface('Sie')    === normalizeSurface('sie')");
    expect(section).toContain('German capitalises every noun');
    expect(section).toMatch(/ONE index entry with THREE readings/);
    expect(notes('L1-M2')).toContain("normalizeSurface('Sie') === normalizeSurface('sie')");
    expect(notes('L1-M2')).toMatch(/ALL THREE readings/);
    expect(notes('L1-M2')).toContain('sie ist is "she is"; sie sind is "they are"');
    // The homophone / spelling traps are documented as exactly that, and NOT as index collisions.
    expect(notes('L1-M3')).toMatch(/HOMOPHONE, not an index merge/);
    expect(notes('L1-M9')).toMatch(/SPELLING trap, not an index collision/);
    expect(notes('L1-M9')).toContain('Ich denke, dass das Buch gut ist');
  });

  it('names the index seam wherever a German surface is decided', () => {
    // First occurrence wins, so a key the wrong module opens is a note the learner reads for the
    // rest of the course — the `का` bug. Every module says where its colliding surfaces land.
    for (const id of ids) expect(notes(id), id).toContain('INDEX SEAM');
    // The noun/verb homographs the fold manufactures, each with an owning module.
    expect(notes('L1-M3')).toContain('essen is opened here');
    expect(notes('L1-M3')).toContain('forms essen · esse');
    expect(notes('L1-M6')).toContain("morgen is THIS module's bare key");
    expect(notes('L1-M4')).toMatch(/NO MODULE BEFORE M6 WRITES A BARE Morgen/);
    expect(notes('L1-M4')).toContain('morgens');
    expect(notes('L1-M4')).toContain('am Morgen');
    expect(notes('L1-M2')).toContain('Guten Morgen');
    expect(notes('L1-M2')).toContain('Deutsch');
    expect(notes('L1-M1')).toContain('Leben and leben are kept out of L1');
    expect(notes('L1-M4')).toContain('arbeit, arbeite and arbeiten are three DISTINCT keys');
    // The articles: M1 owns all three, so M1's note must be true of every later seat.
    expect(notes('L1-M1')).toContain('masculine nominative AND feminine dative');
    expect(notes('L1-M7')).toContain('FEMININE DATIVE of M1');
    expect(notes('L1-M8')).toContain('DEMONSTRATIVE');
    // war and hatte are each one row covering two persons.
    expect(notes('L1-M5')).toMatch(/war and hatte are each ONE row covering TWO PERSONS/);
    // The separable-prefix collision — this course's own `का` bug — and its decision.
    expect(notes('L1-M4')).toContain('M4 OWNS auf');
    expect(notes('L1-M4')).toContain('auf dem Tisch');
    expect(notes('L1-M4')).toContain('DEFERRED');
    expect(notes('L1-M7')).toContain('this module opens no rival auf row');
    expect(notes('L1-M1')).toContain('aus is opened here');
    expect(notes('L1-M7')).toContain('leaves the bare key free for M8');
    expect(notes('L1-M8')).toContain('zu is opened HERE');
    // The multi-token surfaces, each named with the bare word it protects.
    expect(notes('L1-M1')).toContain('ONE two-token surface');
    expect(notes('L1-M1')).toContain('keeps the bare ich free');
    expect(notes('L1-M2')).toContain('wie geht es as ONE three-token surface');
    expect(notes('L1-M2')).toContain('keeps geht free');
    expect(notes('L1-M5')).toContain('nach Hause is taken here');
    expect(notes('L1-M7')).toContain('zu Hause is this module');
    expect(notes('L1-M7')).toContain('es gibt is taken as ONE two-token span');
    expect(notes('L1-M8')).toContain('wie viel and wie viele are two two-token spans');
    expect(notes('L1-M10')).toContain('Do NOT open a second sie row here');
  });

  it('names the false slogan each module attracts and states the law instead (rule 2)', () => {
    // Header rule 2: a rule must be TRUE first and memorable second, so every module names the
    // memorable-and-false thing it will attract, in quotes, and the law that replaces it.
    for (const id of ids) {
      expect(notes(id), `${id} slogan`).toMatch(/slogan/i);
      expect(notes(id), `${id} law`).toContain('The law:');
    }
    const SLOGANS: Record<string, string> = {
      'L1-M1': '"gender is arbitrary, just memorise it"',
      'L1-M2': '"Sie is just polite you"',
      'L1-M3': '"German puts the verb at the end"',
      'L1-M4': '"German has no continuous, so drop the -ing"',
      'L1-M5': '"the Perfekt is the perfect, so Ich habe gegessen means I have eaten"',
      'L1-M6': '"will = the future tense, so German must have one too"',
      'L1-M7': '"the accusative is the object case"',
      'L1-M8': '"numbers are just words in front of a noun"',
      'L1-M9': '"Germans say ich bin kalt for I am cold"',
      'L1-M10': '"er = he, sie = she, es = it"',
    };
    for (const [id, slogan] of Object.entries(SLOGANS)) {
      expect(notes(id), `${id} names its slogan`).toContain(slogan);
    }
    // The "verb at the end" slogan is named in M3, paid off in M5 and stated in full in M9.
    expect(notes('L1-M3')).toContain('VERB-SECOND');
    expect(notes('L1-M9')).toContain('SUBORDINATING');
    expect(notes('L1-M9')).toContain('COORDINATING');
    // And M3's other one — nicht is not simply "not".
    expect(notes('L1-M3')).toContain('"nicht = not"');
  });

  it('says the language of every field, and keeps umlauts and ß off the ae/ss transcription', () => {
    // The language law (#186/#196): English teaches, German is taught, and glossEn is required
    // because #268's exemption reaches only a course whose L2 IS English.
    expect(notes('L1-M1')).toContain('glossEn is REQUIRED on every sentence');
    expect(notes('L1-M1')).toMatch(/#268 exempts only a course whose L2 IS English/);
    expect(notes('L1-M1')).toContain('literal is the tool');
    expect(notes('L1-M10')).toContain('glossEn on every sentence');
    // The fold keeps diacritics, so the umlaut and ß are never optional and never transcribed.
    const source = readFileSync(path.join(REPO_ROOT, 'tools', 'course-briefs.ts'), 'utf8');
    const section = source.slice(source.indexOf('## en-de: decisions a brief must settle'));
    expect(section).toMatch(/umlaut is never optional/);
    expect(section).toMatch(/ß` does not fold to `ss`/);
    // No brief ever writes an umlaut as ae/oe/ue or a ß as ss — STARRED FORMS INCLUDED, the rule
    // en-ru's yó test pins: a brief seeds every prompt, so a wrong spelling on the page is a wrong
    // spelling somebody copies. Every one of these words keeps its own diacritic instead.
    for (const word of ['möchte', 'müde', 'heiße', 'groß', 'Stühle', 'Tür']) {
      expect(allText, word).toContain(word);
    }
    expect(allText).not.toMatch(/\b(moechte|muede|heisse|gross|Stuehle|Tuer|Strasse|dreissig)\b/);
    // Straight apostrophes only: the curly quote folds on the index, so a stray one in an example
    // is indistinguishable from the straight one a `display` must carry.
    expect(allText).not.toMatch(/[’‘]/);
  });

  it('reads the sentence bound as a real constraint, because the bracket costs tokens', () => {
    // German's clause bracket makes a sentence longer in tokens than the Romance equivalent at
    // the same difficulty, so the ceiling bites hardest exactly where the bracket appears.
    expect(notes('L1-M3')).toContain('LONGER IN TOKENS');
    expect(notes('L1-M3')).toContain('five tokens for what French says in four');
    expect(notes('L1-M5')).toContain('the bracket costs tokens');
    expect(briefs?.['L1-M3']?.maxWordsPerSentence).toBe(6);
    expect(briefs?.['L1-M5']?.maxWordsPerSentence).toBe(7);
  });
});

/* ------------------------------------------------------------- prior module */

/**
 * en-ru (#338–#343) is the first course written in Cyrillic, and the first whose L2 inflects hard
 * enough that the WORD INDEX is a pedagogy problem rather than a bookkeeping one. Six decisions
 * are settled in `tools/course-briefs.ts`'s "en-ru: the six decisions a brief must settle" and
 * repeated in the notes, because a prompt only ever shows an author the notes — and these are the
 * tests that keep them there.
 */
describe('COURSE_BRIEFS en-ru', () => {
  const briefs = COURSE_BRIEFS['en-ru'];
  const notes = (id: string): string => briefs?.[id]?.notes.join(' ') ?? '';
  const patterns = (id: string): string => briefs?.[id]?.patterns.join(' ') ?? '';
  const allNotes = Object.values(briefs ?? {})
    .map((brief) => brief.notes.join(' '))
    .join(' ');
  const allText = Object.values(briefs ?? {})
    .map((brief) => [...brief.patterns, ...brief.notes].join(' '))
    .join(' ');

  it('places each English→Russian pressure point in the module that needs it', () => {
    // M1: the present of "be" is written as nothing, and there are no articles either.
    expect(notes('L1-M1')).toMatch(/ZERO COPULA/);
    expect(notes('L1-M1')).toContain("*Ya yest' studént");
    expect(notes('L1-M1')).toMatch(/NO ARTICLES/);
    expect(patterns('L1-M1')).toContain('Menyá zovút + name');
    // M2: the question moves nothing, and the predicate carries the subject's gender.
    expect(notes('L1-M2')).toMatch(/MOVES NOTHING/);
    expect(notes('L1-M2')).toContain('ustál');
    expect(notes('L1-M2')).toContain('ustála');
    // M3: the first case ending, and negation as one word in one place.
    expect(notes('L1-M3')).toContain('Ya khochú vódu');
    expect(notes('L1-M3')).toContain('*Ya khochú vodá');
    expect(notes('L1-M3')).toMatch(/NEGATION IS ONE WORD IN ONE PLACE/);
    // M4: two conjugation classes, and aspect named but not taught.
    expect(notes('L1-M4')).toMatch(/IMPERFECTIVE PRESENT/);
    expect(notes('L1-M4')).toMatch(/class I/);
    expect(notes('L1-M4')).toMatch(/class II/);
    // M5: gender not person, "be" reappears, aspect decided.
    expect(notes('L1-M5')).toMatch(/GENDER AND NUMBER, NOT WITH PERSON/);
    expect(notes('L1-M5')).toContain('byl · bylá · býlo · býli');
    expect(notes('L1-M5')).toMatch(/PERFECTIVE/);
    expect(notes('L1-M5')).toMatch(/imperfective past .*DEFERRED|DEFERRED/);
    // M6: two futures, and the cross-wiring they invite.
    expect(notes('L1-M6')).toMatch(/TWO FUTURES/);
    expect(notes('L1-M6')).toContain('*Ya búdu poytí');
    expect(patterns('L1-M6')).toContain('Závtra ya búdu + V-inf (impf.)');
    // M7: the prepositional, the existential, and the missing dummy subject.
    expect(notes('L1-M7')).toMatch(/THE PREPOSITIONAL/);
    expect(notes('L1-M7')).toContain('na stolé');
    expect(notes('L1-M7')).toMatch(/NO DUMMY SUBJECT/);
    // M8: numbers govern the noun, and possession has no verb.
    expect(notes('L1-M8')).toMatch(/NUMBERS GOVERN THE NOUN/);
    expect(notes('L1-M8')).toContain("pyat' rubléy");
    expect(notes('L1-M8')).toMatch(/POSSESSION HAS NO VERB/);
    expect(notes('L1-M8')).toContain('Ya iméyu knígu');
    // M9: because/so, the obligatory comma, and the dative experiencer.
    expect(patterns('L1-M9')).toContain('potomú chto');
    expect(patterns('L1-M9')).toContain('poéhtomu');
    expect(notes('L1-M9')).toMatch(/DATIVE EXPERIENCERS/);
    expect(notes('L1-M9')).toContain('mne nrávyatsya knígi');
    expect(notes('L1-M9')).toMatch(/COMMA IS OBLIGATORY/);
    // M10: turns, and word order doing the article's old work.
    expect(notes('L1-M10')).toMatch(/2–3|turn/i);
    expect(notes('L1-M10')).toMatch(/WORD ORDER/);
  });

  it('settles the register in a NOTE, since a prompt only ever shows an author the notes', () => {
    // `ty` or `vy` is a choice English never makes and every addressed sentence forces. The
    // decision is course-wide, so it has to be readable from the prompt of any module that
    // addresses somebody — M2 takes it, and M1 and M10 repeat it.
    expect(notes('L1-M2')).toContain('vy');
    expect(notes('L1-M2')).toMatch(/REGISTER, decided course-wide/);
    expect(notes('L1-M2')).toContain('Zdrávstvuyte');
    expect(notes('L1-M2')).toContain('privét');
    expect(notes('L1-M2')).toMatch(/ty .*L2’s job|ty.*is L2/);
    expect(notes('L1-M1')).toMatch(/REGISTER, ratified for the whole course/);
    // The slogan and the law that replaces it.
    expect(notes('L1-M2')).toContain('vy is just the plural of ty');
    expect(notes('L1-M2')).toMatch(/BOTH the plural and the singular-polite/);
    // And the one exemption is argued, not smuggled: `Kak delá?` carries no ty/vy marking at all.
    expect(notes('L1-M2')).toContain('Kak delá?');
    expect(notes('L1-M2')).toContain('Kak u vas delá?');
  });

  /**
   * #355 romanized the course, and this is the case that moved most. The ё policy survives in
   * both halves — `yó` in the display, `ё` in the script — and the STRESS BAN INVERTED: the old
   * brief forbade an acute because it would be a codepoint the index has to match forever, and
   * the romanization marks it for exactly that reason, so a `forms` list is a stress list too.
   */
  it('settles the yó policy in a NOTE, and marks stress consistently', () => {
    expect(notes('L1-M1')).toMatch(/Write yó wherever a word has it/);
    expect(notes('L1-M4')).toMatch(/yó, course-wide/);
    expect(notes('L1-M4')).toContain("vy p'yóte");
    expect(notes('L1-M5')).toContain('poshyól');
    // Never the plain-`yo` spelling of a ё-word anywhere in the briefs, starred forms included.
    expect(allText).not.toMatch(/\bposhyol\b/);
    // The acute is PRECOMPOSED, never `a` + U+0301: one form in the files is one form in a diff.
    expect(allText).not.toMatch(/́/);
    // And no Cyrillic survives in a pattern or a note — the briefs teach the romanization.
    expect(allText).not.toMatch(/[Ѐ-ӿ]/);
  });

  it('fixes the case plan course-wide: which case, which module, and what is deferred', () => {
    // Six cases, ten modules: the plan is a decision, not something an author discovers in M8.
    expect(notes('L1-M1')).toMatch(/ACCUSATIVE SLOT/);
    expect(notes('L1-M1')).toContain('Ya iz Índii');
    expect(notes('L1-M3')).toMatch(/THE FIRST CASE ENDING/);
    expect(notes('L1-M7')).toMatch(/second case ending|THE PREPOSITIONAL/);
    expect(notes('L1-M8')).toContain('genitive plural');
    expect(notes('L1-M9')).toContain('DATIVE');
    // The instrumental is deferred out of L1 and appears only as frozen time adverbs, which M4
    // says are frozen rather than quietly teaching a seventh thing.
    expect(notes('L1-M4')).toContain('frozen instrumentals');
    expect(notes('L1-M4')).toMatch(/not taught at this level/);
    // Direction is written around with adverbs, so the v row answers for exactly two seats.
    expect(notes('L1-M6')).toContain('domóy');
    expect(notes('L1-M5')).toContain('dóma');
  });

  it('names the index seam wherever a Russian surface or homograph is decided', () => {
    // First occurrence wins, so every colliding surface has an owner and every multi-token
    // chunk is claimed by the module that keeps its parts free — the `का` bug's Russian twins.
    expect(notes('L1-M1')).toContain('Menyá zovút is a chunk');
    expect(notes('L1-M2')).toContain('kak delá');
    expect(notes('L1-M4')).toContain("kázhdyy den'");
    expect(notes('L1-M8')).toContain("u menyá yest'");
    expect(notes('L1-M9')).toContain('potomú chto');
    // The homographs. `yest'` is the big one: "to eat" is excluded from L1 outright, and M7 owns
    // the one row that is left, written true of M8's possession seat as well.
    expect(notes('L1-M7')).toMatch(/stays out of L1 entirely/);
    expect(notes('L1-M7')).toContain("yest' means eat");
    expect(notes('L1-M2')).toContain('net');
    expect(notes('L1-M9')).toMatch(/chto is this module’s row/);
    expect(notes('L1-M4')).toMatch(/this module teaches the surface v first/);
    // Case shapes and gender pairs live in ONE row's forms — never a second, unreachable row.
    expect(notes('L1-M3')).toMatch(/ONE row that first taught it/);
    expect(notes('L1-M5')).toMatch(/ONE byt' row/);
    expect(notes('L1-M6')).toMatch(/búdu goes on M5’s byt' row/);
    // …and an aspect pair is two words, so it is two rows.
    expect(notes('L1-M5')).toMatch(/aspect pair is TWO WORDS, not two forms/);
  });

  it('names the false slogan each module attracts and states the law instead (rule 2)', () => {
    const SLOGANS: Record<string, string> = {
      'L1-M1': 'Russian has no verb to be',
      'L1-M2': 'vy is just the plural of ty',
      'L1-M3': 'the accusative is the object case',
      'L1-M4': 'the present tense is one set of endings',
      'L1-M5': 'the past is the easy tense',
      'L1-M6': 'búdu = will',
      'L1-M7': "yest' means eat",
      'L1-M8': 'numbers are just words in front of a noun',
      'L1-M9': 'mne nrávitsya is Russian for I like',
      'L1-M10': 'no articles — one thing less to learn',
    };

    for (const [id, slogan] of Object.entries(SLOGANS)) {
      expect(notes(id), `${id} names its slogan`).toContain(slogan);
    }
    // A slogan is only half the rule: every one of them is named next to the law replacing it.
    expect(allNotes.match(/slogan/gi)?.length ?? 0).toBeGreaterThanOrEqual(10);
  });

  it('says the language of every field, and where the Cyrillic lives', () => {
    // romanized scriptMode since #355: `display` is the romanization and `script` carries the
    // Cyrillic. What the notes have to carry is `literal`, which is this course's most useful
    // line, and the gloss that #268's exemption does NOT reach.
    expect(notes('L1-M1')).toMatch(/literal on every sentence/);
    expect(notes('L1-M7')).toMatch(/literal earns its keep/);
  });
});

/**
 * The romanization scheme (#355) — the decision every en-ru module is written against.
 *
 * It lives in a FILE COMMENT rather than in code, because it is authoring guidance and nothing
 * executes it; that is exactly why it needs a test. A scheme nobody can check is a scheme the
 * next content PR quietly writes around, and the failure it causes is invisible: the word index
 * matches surfaces verbatim and is first-occurrence-wins, so a second spelling of a word is not a
 * typo a learner squints past — it is a word with no "why" row, or one that opens another word's.
 */
describe('the en-ru romanization scheme', () => {
  const source = readFileSync(path.join(REPO_ROOT, 'tools', 'course-briefs.ts'), 'utf8');
  // Both markers, and the end one searched FROM the start one: `### 1. The language of every
  // field` is a heading hi-mr's section uses too, several hundred lines earlier.
  const opens = source.indexOf('### 0. THE ROMANIZATION');
  const scheme = source.slice(opens, source.indexOf('### 1. The language of every field', opens));

  it('is stated at all, and states that it is the only one', () => {
    expect(scheme).not.toBe('');
    expect(scheme).toMatch(/and in\n \* no other/);
    expect(scheme).toMatch(/FIRST OCCURRENCE WINS/);
  });

  it('decides every collision Latin letters collapse, each with its reason', () => {
    // The list is the issue's, not a summary of it: е/э, и/ы, ь/ъ, ё, and the hushers.
    expect(scheme).toMatch(/е \/ э/);
    expect(scheme).toMatch(/и \/ ы/);
    expect(scheme).toMatch(/ь \/ ъ/);
    expect(scheme).toMatch(/ё/);
    expect(scheme).toMatch(/ж \/ ш \/ щ \/ ч/);
    // …and the merge the scheme deliberately MAKES, which is the one a reader would query.
    expect(scheme).toMatch(/`й` is ALSO `y`/);
  });

  it('decides stress: that it is marked, and what that costs', () => {
    expect(scheme).toMatch(/Stress is MARKED/);
    expect(scheme).toMatch(/Monosyllables carry NO acute/);
    expect(scheme).toMatch(/Every occurrence, every field/);
    expect(scheme).toMatch(/Precomposed, not decomposed/);
  });

  it('records that it was checked against the folder rather than assumed', () => {
    expect(scheme).toMatch(/Checked against the folder rather than assumed/);
    // The two folding rules that actually constrain a scheme: case cannot distinguish letters,
    // diacritics can. Both are named, because getting either backwards breaks the index.
    expect(scheme).toMatch(
      /nothing in this scheme may distinguish two\n \* letters by capitalisation/,
    );
    expect(scheme).toMatch(/Diacritics are NOT touched by the fold/);
  });

  it('carries the one-paragraph note the manifest row will take', () => {
    expect(scheme).toMatch(/romanizationNote/);
    expect(scheme).toMatch(/a second scheme would break resolution/);
  });

  /**
   * The acceptance criterion that cannot be met by reading: every character the scheme can emit
   * has to survive #354's codepoint policy. Run the check over the alphabet rather than over the
   * regex — a policy read by eye is a policy that passes by eye.
   */
  it('emits only characters `checkScriptMode` admits (#354)', () => {
    const alphabet = "a b v g d e ye zh z i y k l m n o p r s t u f kh ts ch sh shch ' eh yu ya yó";
    const stressed = 'á é í ó ú ý';
    const words = [
      'menyá',
      'zovút',
      'Iván',
      'éhto',
      'khoroshó',
      'vsyó',
      'yeyó',
      "yest'",
      "p'yóte",
      'nóvyy',
      'pozháluysta',
      'zdrávstvuyte',
      'potomú chto',
    ];
    const module = {
      sentences: [
        {
          display: `${alphabet} ${stressed}`,
          deconstruction: { words: [{ display: 'kníga', forms: words }] },
          variations: [],
        },
      ],
      comprehensionPool: words.map((display) => ({ display })),
    } as unknown as Parameters<typeof checkScriptMode>[0];

    expect(checkScriptMode(module, 'romanized').errors).toEqual([]);
  });
});

describe('priorModuleId', () => {
  it('walks the ladder: previous module, crossing levels, none before L1-M1', () => {
    expect(priorModuleId('L1-M1')).toBeNull();
    expect(priorModuleId('L1-M2')).toBe('L1-M1');
    expect(priorModuleId('L1-M10')).toBe('L1-M9');
    expect(priorModuleId('L2-M1')).toBe('L1-M10');
    expect(priorModuleId('L3-M1')).toBe('L2-M10');
    expect(priorModuleId('not-a-module')).toBeNull();
  });
});

/* ------------------------------------------------------------------- render */

describe('renderPrompt', () => {
  const briefM4 = COURSE_BRIEFS['hi-mr']?.['L1-M4'] as ModuleBrief;
  const index = indexThrough('L1-M3', ['माझं', 'नाव', 'आहे', 'चहा', 'हवा']);

  it('hi-mr L1-M4 embeds the full schema text, the L1-M3 surfaces and the brief bounds', () => {
    const prompt = renderPrompt({ course: HI_MR, brief: briefM4, schemaText: SCHEMA_TEXT, index });
    expect(prompt).toContain(SCHEMA_TEXT.trimEnd());
    for (const surface of Object.keys(index.surfaces)) expect(prompt).toContain(surface);
    expect(prompt).toContain('cumulative through L1-M3');
    expect(prompt).toContain('L1-M1, L1-M2, L1-M3');
    expect(prompt).toContain(`"maxWordsPerSentence": ${briefM4.maxWordsPerSentence}`);
    expect(prompt).toContain(`"newWordCap": ${NEW_WORD_CAP}`);
    for (const pattern of briefM4.patterns) expect(prompt).toContain(pattern);
    // Course-parameterised, not hard-coded: the pair is named from the manifest row.
    expect(prompt).toContain('expert Marathi teacher for native Hindi speakers');
    expect(prompt).toContain('npm run content:validate');
    expect(prompt).toContain('content/hi-mr/modules/L1-M4.json');
  });

  it('native course: display is native script, no romanization section', () => {
    const prompt = renderPrompt({ course: HI_MR, brief: briefM4, schemaText: SCHEMA_TEXT, index });
    expect(prompt).toContain('native-script');
    expect(prompt).not.toContain('Romanization scheme');
  });

  it('romanized fixture course renders the scheme and the script-line instruction', () => {
    const brief: ModuleBrief = {
      id: 'L1-M2',
      title: 'Ordering coffee',
      job: 'Ask for a drink politely',
      patterns: ['urīdu + N'],
      notes: ['The definite article assimilates before sun letters.'],
      maxWordsPerSentence: 5,
      newWordCap: NEW_WORD_CAP,
    };
    const roman = indexThrough('L1-M1', ['ismī', 'anā']);
    const prompt = renderPrompt({
      course: EN_AR,
      brief,
      schemaText: SCHEMA_TEXT,
      index: { ...roman, courseId: 'en-ar' },
    });
    expect(prompt).toContain('romanized');
    expect(prompt).toContain(`Romanization scheme: ${String(EN_AR.romanizationNote)}`);
    expect(prompt).toContain('native-script line goes in `script`');
    expect(prompt).toContain('expert Arabic teacher for native English speakers');
    expect(prompt).toContain('ismī');
  });

  it('en-es L1-M1 renders the Spanish brief: its patterns, its bounds and the pair', () => {
    const brief = COURSE_BRIEFS['en-es']?.['L1-M1'] as ModuleBrief;
    const prompt = renderPrompt({ course: EN_ES, brief, schemaText: SCHEMA_TEXT, index: null });
    expect(prompt).toContain(SCHEMA_TEXT.trimEnd());
    for (const pattern of brief.patterns) expect(prompt).toContain(pattern);
    expect(prompt).toContain(`"maxWordsPerSentence": ${brief.maxWordsPerSentence}`);
    expect(prompt).toContain(`"newWordCap": ${NEW_WORD_CAP}`);
    expect(prompt).toContain('expert Spanish teacher for native English speakers');
    expect(prompt).toContain('content/en-es/modules/L1-M1.json');
    expect(prompt).toContain('native-script');
  });

  it('hi-en L1-M1 renders the English brief for a Hindi speaker, language law in the notes', () => {
    const brief = COURSE_BRIEFS['hi-en']?.['L1-M1'] as ModuleBrief;
    const prompt = renderPrompt({ course: HI_EN, brief, schemaText: SCHEMA_TEXT, index: null });
    expect(prompt).toContain(SCHEMA_TEXT.trimEnd());
    for (const pattern of brief.patterns) expect(prompt).toContain(pattern);
    expect(prompt).toContain(`"maxWordsPerSentence": ${brief.maxWordsPerSentence}`);
    expect(prompt).toContain(`"newWordCap": ${NEW_WORD_CAP}`);
    expect(prompt).toContain('expert English teacher for native Hindi speakers');
    expect(prompt).toContain('content/hi-en/modules/L1-M1.json');
    // Native-script course: display is English, cue is Hindi, no script line, no romanization.
    expect(prompt).toContain('every `display` string is English in its own script');
    expect(prompt).toContain('every `cue` string is Hindi');
    expect(prompt).not.toContain('Romanization scheme');
    // The brief's field-language decisions reach the author through the notes.
    expect(prompt).toContain('No glossEn on any sentence');
    expect(prompt).toContain('hi-en must NOT copy it');
    expect(prompt).toContain("the course's first module");
  });

  it('first module of a course renders the empty-inventory wording instead of a surface list', () => {
    const briefM1 = COURSE_BRIEFS['hi-mr']?.['L1-M1'] as ModuleBrief;
    const prompt = renderPrompt({
      course: HI_MR,
      brief: briefM1,
      schemaText: SCHEMA_TEXT,
      index: null,
    });
    expect(prompt).toContain("the course's first module");
    expect(prompt).not.toContain('cumulative through');
  });
});

/* ---------------------------------------------------------------------- CLI */

describe('generatePrompt (CLI shape)', () => {
  function tree(): { contentRoot: string; builtRoot: string; promptsDir: string } {
    const dir = temporaryDir();
    const contentRoot = path.join(dir, 'content');
    const builtRoot = path.join(dir, 'public', 'content');
    mkdirSync(contentRoot, { recursive: true });
    writeFileSync(
      path.join(contentRoot, 'courses.json'),
      JSON.stringify([HI_MR, EN_AR, HI_EN, EN_IT, UNBRIEFED]),
    );
    return { contentRoot, builtRoot, promptsDir: path.join(dir, '.prompts') };
  }

  it('renders hi-mr L1-M3 from the built L1-M2 index and reports the surface count', () => {
    const roots = tree();
    const index = indexThrough('L1-M2', ['माझं', 'नाव', 'आहे']);
    mkdirSync(path.join(roots.builtRoot, 'hi-mr', 'index'), { recursive: true });
    writeFileSync(
      path.join(roots.builtRoot, 'hi-mr', 'index', 'L1-M2.json'),
      JSON.stringify(index),
    );

    const report = generatePrompt({ courseId: 'hi-mr', moduleId: 'L1-M3', ...roots });
    expect(report.exitCode).toBe(0);
    expect(report.lines.join('\n')).toContain('3 surfaces through L1-M2');
    expect(report.outFile).toBe(path.join(roots.promptsDir, 'hi-mr-L1-M3.md'));
    const written = readFileSync(report.outFile ?? '', 'utf8');
    expect(written).toContain('माझं · नाव · आहे');
    expect(written).toContain(SCHEMA_TEXT.trimEnd());
  });

  it('renders L1-M1 without any built index', () => {
    const roots = tree();
    const report = generatePrompt({ courseId: 'hi-mr', moduleId: 'L1-M1', ...roots });
    expect(report.exitCode).toBe(0);
    expect(report.lines.join('\n')).toContain('first module — empty inventory');
  });

  it('renders hi-mr L2-M1 from the built L1-M10 index — the ladder crosses levels (#295)', () => {
    const roots = tree();
    const index = indexThrough('L1-M10', ['मला', 'चहा', 'आवडतो', 'द्या']);
    mkdirSync(path.join(roots.builtRoot, 'hi-mr', 'index'), { recursive: true });
    writeFileSync(
      path.join(roots.builtRoot, 'hi-mr', 'index', 'L1-M10.json'),
      JSON.stringify(index),
    );

    const report = generatePrompt({ courseId: 'hi-mr', moduleId: 'L2-M1', ...roots });
    expect(report.exitCode).toBe(0);
    expect(report.lines.join('\n')).toContain('4 surfaces through L1-M10');
    expect(report.outFile).toBe(path.join(roots.promptsDir, 'hi-mr-L2-M1.md'));
    const written = readFileSync(report.outFile ?? '', 'utf8');
    const brief = COURSE_BRIEFS['hi-mr']?.['L2-M1'] as ModuleBrief;
    expect(written).toContain('Asking politely');
    expect(written).toContain('cumulative through L1-M10');
    for (const pattern of brief.patterns) expect(written).toContain(pattern);
    expect(written).toContain(`"maxWordsPerSentence": ${brief.maxWordsPerSentence}`);
    expect(written).toContain('content/hi-mr/modules/L2-M1.json');
    expect(written).toContain(SCHEMA_TEXT.trimEnd());
  });

  it('fails for hi-mr L2-M1 with the content:build hint when L1-M10 was never built', () => {
    const roots = tree();
    const report = generatePrompt({ courseId: 'hi-mr', moduleId: 'L2-M1', ...roots });
    expect(report.exitCode).toBe(1);
    expect(report.outFile).toBeNull();
    const text = report.lines.join('\n');
    expect(text).toContain('L1-M10');
    expect(text).toContain('npm run content:build -- --with-unverified');
  });

  it('renders en-ar L1-M1 from its own brief, romanization scheme included', () => {
    const roots = tree();
    const report = generatePrompt({ courseId: 'en-ar', moduleId: 'L1-M1', ...roots });
    expect(report.exitCode).toBe(0);
    expect(report.outFile).toBe(path.join(roots.promptsDir, 'en-ar-L1-M1.md'));
    const written = readFileSync(report.outFile ?? '', 'utf8');
    const brief = COURSE_BRIEFS['en-ar']?.['L1-M1'] as ModuleBrief;
    for (const pattern of brief.patterns) expect(written).toContain(pattern);
    expect(written).toContain(`Romanization scheme: ${String(EN_AR.romanizationNote)}`);
    expect(written).toContain('Modern Standard Arabic');
    expect(written).toContain(`"maxWordsPerSentence": ${brief.maxWordsPerSentence}`);
    expect(written).toContain('content/en-ar/modules/L1-M1.json');
    expect(written).toContain(SCHEMA_TEXT.trimEnd());
  });

  it('renders hi-en L1-M1 from its own brief — no index needed, the language note included', () => {
    const roots = tree();
    const report = generatePrompt({ courseId: 'hi-en', moduleId: 'L1-M1', ...roots });
    expect(report.exitCode).toBe(0);
    expect(report.lines.join('\n')).toContain('first module — empty inventory');
    expect(report.outFile).toBe(path.join(roots.promptsDir, 'hi-en-L1-M1.md'));
    const written = readFileSync(report.outFile ?? '', 'utf8');
    const brief = COURSE_BRIEFS['hi-en']?.['L1-M1'] as ModuleBrief;
    for (const pattern of brief.patterns) expect(written).toContain(pattern);
    expect(written).toContain('expert English teacher for native Hindi speakers');
    expect(written).toContain('No glossEn on any sentence');
    expect(written).toContain(`"maxWordsPerSentence": ${brief.maxWordsPerSentence}`);
    expect(written).toContain(SCHEMA_TEXT.trimEnd());
  });

  it('renders en-it L1-M1 from its own brief — the register decision reaches the author', () => {
    const roots = tree();
    const report = generatePrompt({ courseId: 'en-it', moduleId: 'L1-M1', ...roots });
    expect(report.exitCode).toBe(0);
    expect(report.lines.join('\n')).toContain('first module — empty inventory');
    expect(report.outFile).toBe(path.join(roots.promptsDir, 'en-it-L1-M1.md'));
    const written = readFileSync(report.outFile ?? '', 'utf8');
    const brief = COURSE_BRIEFS['en-it']?.['L1-M1'] as ModuleBrief;
    for (const pattern of brief.patterns) expect(written).toContain(pattern);
    expect(written).toContain('expert Italian teacher for native English speakers');
    expect(written).toContain('content/en-it/modules/L1-M1.json');
    expect(written).toContain('L1 speaks tu');
    expect(written).toContain(`"maxWordsPerSentence": ${brief.maxWordsPerSentence}`);
    expect(written).toContain(`"newWordCap": ${NEW_WORD_CAP}`);
    expect(written).not.toContain('Romanization scheme');
    expect(written).toContain(SCHEMA_TEXT.trimEnd());
  });

  it('fails with the content:build hint when the prior index is missing', () => {
    const roots = tree();
    const report = generatePrompt({ courseId: 'hi-mr', moduleId: 'L1-M3', ...roots });
    expect(report.exitCode).toBe(1);
    expect(report.outFile).toBeNull();
    const text = report.lines.join('\n');
    expect(text).toContain('index');
    expect(text).toContain('npm run content:build -- --with-unverified');
    expect(text).toContain('L1-M2');
  });

  it('fails clearly on an unknown course, an unbriefed course, and an unbriefed module', () => {
    const roots = tree();
    const unknown = generatePrompt({ courseId: 'xx-yy', moduleId: 'L1-M1', ...roots });
    expect(unknown.exitCode).toBe(1);
    expect(unknown.lines.join('\n')).toContain('unknown course "xx-yy"');
    expect(unknown.lines.join('\n')).toContain('hi-mr, en-ar, hi-en, en-it, en-ja');

    const unbriefedCourse = generatePrompt({ courseId: 'en-ja', moduleId: 'L1-M1', ...roots });
    expect(unbriefedCourse.exitCode).toBe(1);
    expect(unbriefedCourse.lines.join('\n')).toContain('no briefs yet');

    // hi-mr L2 is briefed (#295); L3 is the course's unbriefed rung now.
    const unbriefedModule = generatePrompt({ courseId: 'hi-mr', moduleId: 'L3-M1', ...roots });
    expect(unbriefedModule.exitCode).toBe(1);
    expect(unbriefedModule.lines.join('\n')).toContain('no brief for "hi-mr L3-M1"');
    expect(unbriefedModule.lines.join('\n')).toContain('L1-M1');
  });

  it('never writes on failure', () => {
    const roots = tree();
    generatePrompt({ courseId: 'hi-mr', moduleId: 'L1-M3', ...roots });
    expect(existsSync(roots.promptsDir)).toBe(false);
  });
});
