import { existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import type { CourseRow, WordIndexFile } from './content-build.ts';
import { COURSE_BRIEFS, NEW_WORD_CAP, type ModuleBrief } from './course-briefs.ts';
import { generatePrompt, priorModuleId, renderPrompt } from './generate-prompt.ts';
import { DEFAULT_CONTENT_ROOT, SCHEMA_PATH } from './validate.ts';

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

/** Every briefed course answers the same two structural questions, so they are asked once. */
describe.each(['hi-mr', 'en-es', 'en-ar', 'hi-en'])('COURSE_BRIEFS %s', (courseId) => {
  const briefs = COURSE_BRIEFS[courseId];

  it('covers L1 M1–M10, keyed by id, each with patterns, notes and the §5 cap', () => {
    expect(briefs).toBeDefined();
    if (briefs === undefined) return;
    const expected = Array.from({ length: 10 }, (_, i) => `L1-M${i + 1}`);
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

  it('mirrors the authored levels.json titles and jobs verbatim', () => {
    const levels = JSON.parse(
      readFileSync(path.join(DEFAULT_CONTENT_ROOT, courseId, 'levels.json'), 'utf8'),
    ) as { levels: { id: string; modules: { id: string; title: string; job: string }[] }[] };
    const l1 = levels.levels.find((level) => level.id === 'L1');
    expect(l1).toBeDefined();
    for (const entry of l1?.modules ?? []) {
      const brief = briefs?.[entry.id];
      expect(brief, entry.id).toBeDefined();
      expect(brief?.title).toBe(entry.title);
      expect(brief?.job).toBe(entry.job);
    }
  });

  it('climbs its word bound across the level and never loosens it', () => {
    if (briefs === undefined) return;
    const bounds = Array.from(
      { length: 10 },
      (_, i) => briefs[`L1-M${i + 1}`]?.maxWordsPerSentence,
    );
    expect(bounds[0]).toBe(5);
    expect(bounds[9]).toBe(8);
    for (let i = 1; i < bounds.length; i += 1) {
      expect(Number(bounds[i]), `L1-M${i + 1}`).toBeGreaterThanOrEqual(Number(bounds[i - 1]));
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

/* ------------------------------------------------------------- prior module */

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
      JSON.stringify([HI_MR, EN_AR, HI_EN, UNBRIEFED]),
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
    expect(unknown.lines.join('\n')).toContain('hi-mr, en-ar, hi-en, en-ja');

    const unbriefedCourse = generatePrompt({ courseId: 'en-ja', moduleId: 'L1-M1', ...roots });
    expect(unbriefedCourse.exitCode).toBe(1);
    expect(unbriefedCourse.lines.join('\n')).toContain('no briefs yet');

    const unbriefedModule = generatePrompt({ courseId: 'hi-mr', moduleId: 'L2-M1', ...roots });
    expect(unbriefedModule.exitCode).toBe(1);
    expect(unbriefedModule.lines.join('\n')).toContain('no brief for "hi-mr L2-M1"');
    expect(unbriefedModule.lines.join('\n')).toContain('L1-M1');
  });

  it('never writes on failure', () => {
    const roots = tree();
    generatePrompt({ courseId: 'hi-mr', moduleId: 'L1-M3', ...roots });
    expect(existsSync(roots.promptsDir)).toBe(false);
  });
});
