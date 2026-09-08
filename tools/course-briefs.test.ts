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

  it('covers exactly L1-M1..L5-M10 — L2 #433, L3 #469, L4 #527, L5 #571', () => {
    expect(Object.keys(COURSE_BRIEFS['en-ko'] ?? {})).toEqual([
      ...['L1', 'L2', 'L3', 'L4', 'L5'].flatMap((level) =>
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((n) => `${level}-M${n}`),
      ),
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

  /**
   * The shapes L1 names but never writes. L2 later collected `-go isseoyo` (#433, at M7), so the
   * check is scoped to the L1 briefs — where the deferral was made and must still be visible.
   */
  it('keeps the deferred list deferred in the L1 briefs', () => {
    const notes = Object.entries(COURSE_BRIEFS['en-ko'] ?? {})
      .filter(([id]) => id.startsWith('L1-'))
      .flatMap(([, brief]) => brief.notes)
      .join('\n');
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

  it('covers exactly L1-M1..L5-M10 — five levels, fifty modules, the whole ladder', () => {
    expect(Object.keys(all)).toEqual([
      ...['L1', 'L2', 'L3', 'L4', 'L5'].flatMap((level) =>
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

describe('en-es L2: the decisions its briefs settle (#426)', () => {
  const all = COURSE_BRIEFS['en-es'] ?? {};
  const l2 = Object.entries(all).filter(([id]) => id.startsWith('L2-'));
  const notes = l2.flatMap(([, brief]) => brief.notes).join('\n');

  it('covers exactly L1-M1..L5-M10 — five levels, fifty modules, the whole ladder', () => {
    expect(Object.keys(all)).toEqual([
      ...['L1', 'L2', 'L3', 'L4', 'L5'].flatMap((level) =>
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((n) => `${level}-M${n}`),
      ),
    ]);
  });

  /**
   * The bounds climb inside the level, continuing L1's 5 → 8. They are pinned because a prompt
   * renders them verbatim into `complexity`, so a wrong number here becomes a wrong number in ten
   * module files.
   */
  it('climbs its bounds 8 → 9 → 10 across the level', () => {
    const bound = (id: string): number | undefined => all[id]?.maxWordsPerSentence;
    for (const id of ['L2-M1', 'L2-M2', 'L2-M3']) expect(bound(id), id).toBe(8);
    for (const id of ['L2-M4', 'L2-M5', 'L2-M6', 'L2-M7']) expect(bound(id), id).toBe(9);
    for (const id of ['L2-M8', 'L2-M9', 'L2-M10']) expect(bound(id), id).toBe(10);
  });

  /**
   * The register decision governs the whole level and must reach an author, who only ever sees
   * the notes: the chip from #422, and the correction that `usted` is L1-M2's and not new here.
   */
  it('states the register decision, the chip and the L1 correction in a NOTE', () => {
    const m1 = all['L2-M1']?.notes.join('\n') ?? '';
    expect(m1).toMatch(/`informal`/);
    expect(m1).toMatch(/`formal`/);
    expect(m1).toMatch(/`neutral`/);
    // The premise #426 got wrong: L1-M2 already taught usted, so L2 teaches the FRAME.
    expect(m1).toMatch(/L1-M2 already taught usted/);
    expect(m1).toMatch(/slogan to kill: "usted is formal, tú is informal"/);
    // Which module speaks which — the street, the phone and a complaint are usted; plans are tú.
    expect(all['L2-M4']?.notes.join('\n')).toMatch(/usted throughout/);
    expect(all['L2-M6']?.notes.join('\n')).toMatch(/tú and nosotros throughout/);
  });

  /**
   * The two syllabus decisions the INDEX forced. If either disappears from a note, a later author
   * writes the sentence that takes the key, and no row can take it back.
   */
  it('keeps `tan … como` and the feminine object clitics out, for index reasons', () => {
    const m9 = all['L2-M9']?.notes.join('\n') ?? '';
    expect(m9).toMatch(/tan … como is deliberately NOT taught/);
    expect(m9).toMatch(/como is L1-M4's key/);
    const m5 = all['L2-M5']?.notes.join('\n') ?? '';
    expect(m5).toMatch(/la, los and las are L1-M1's ARTICLES/);
    expect(m5).toMatch(/wait for L3/);
    // And the whole-phrase tool that made `lo`, `me` and `le` available in the first place.
    expect(all['L2-M1']?.notes.join('\n')).toMatch(/Lo siento is indexed WHOLE/);
    expect(all['L2-M7']?.notes.join('\n')).toMatch(/Me llamo was indexed as a two-token surface/);
  });

  it('assigns every shared lexeme an owner, in the notes', () => {
    // `bueno` is L1-M10's discourse marker, so the adjective is taught on its other three cells.
    expect(all['L2-M2']?.notes.join('\n')).toMatch(/bueno/);
    expect(all['L2-M3']?.notes.join('\n')).toMatch(/never shows masculine singular bueno/);
    // `mayor` has two jobs and one row (M2's); M9 points back rather than opening a second.
    expect(all['L2-M2']?.notes.join('\n')).toMatch(/mayor is this module's key/);
    expect(all['L2-M9']?.notes.join('\n')).toMatch(/mayor is M2's key/);
    // `que` carries the linker and the comparative on M5's row.
    expect(all['L2-M5']?.notes.join('\n')).toMatch(/que is this module's key/);
    expect(all['L2-M9']?.notes.join('\n')).toMatch(/que stays M5's row/);
    // Every module names its index seam, the discipline docs/26 §4 set.
    for (const [id, brief] of l2) {
      expect(brief.notes.join('\n'), `${id} names its seam`).toMatch(/INDEX SEAM/);
    }
  });

  /** The deferrals, and the one preposition that is allowed in early. */
  it('defers the subjunctive, the perfect and por/para, and lets `para` in at M5 alone', () => {
    expect(COURSE_BRIEFS_SOURCE).toMatch(/### 4\. What L2 withholds, and where each piece lands/);
    expect(all['L2-M5']?.notes.join('\n')).toMatch(/para enters HERE/);
    expect(all['L2-M5']?.notes.join('\n')).toMatch(/Bare por stays unowned/);
    expect(all['L2-M8']?.notes.join('\n')).toMatch(/the perfect is L3/);
    expect(notes).toMatch(/subjunctive/);
    // M10's shape is the job line's own words, and it opens nothing new.
    expect(all['L2-M10']?.notes.join('\n')).toMatch(/exactly four short sentences/);
  });
});

describe('en-es L3: the decisions its briefs settle (#462)', () => {
  const all = COURSE_BRIEFS['en-es'] ?? {};
  const l3 = Object.entries(all).filter(([id]) => id.startsWith('L3-'));
  const notes = l3.flatMap(([, brief]) => brief.notes).join('\n');

  /**
   * The bounds climb 10 → 11 → 12, continuing L2's 8 → 10 and matching hi-mr's L3 (#452). They are
   * pinned because a prompt renders them verbatim into `complexity`, so a wrong number here
   * becomes a wrong number in ten module files.
   */
  it('climbs its bounds 10 → 11 → 12 across the level', () => {
    const bound = (id: string): number | undefined => all[id]?.maxWordsPerSentence;
    for (const id of ['L3-M1', 'L3-M2', 'L3-M3']) expect(bound(id), id).toBe(10);
    for (const id of ['L3-M4', 'L3-M5', 'L3-M6', 'L3-M7']) expect(bound(id), id).toBe(11);
    for (const id of ['L3-M8', 'L3-M9', 'L3-M10']) expect(bound(id), id).toBe(12);
  });

  /**
   * Everything `docs/53` §4 named as withheld from L2 has an owner here, and the owner is named in
   * the notes — an author only ever sees the notes. A piece that lost its owner between the two
   * levels would be a piece no module ever teaches.
   */
  it('gives every piece L2 withheld an owner', () => {
    expect(all['L3-M2']?.notes.join('\n'), 'por vs para').toMatch(/por AGAINST para/);
    expect(all['L3-M3']?.notes.join('\n'), 'the subjunctive').toMatch(/SUBJUNCTIVE OPENS HERE/);
    expect(all['L3-M3']?.notes.join('\n'), 'tan … como').toMatch(/tan … como/);
    expect(all['L3-M4']?.notes.join('\n'), 'the conditional').toMatch(/conditional -ría/);
    expect(all['L3-M4']?.notes.join('\n'), 'the -ré future').toMatch(/-ré future/);
    expect(all['L3-M5']?.notes.join('\n'), 'the object clitics').toMatch(/OBJECT CLITICS/);
    expect(all['L3-M7']?.notes.join('\n'), 'the perfect').toMatch(/PERFECT OPENS HERE/);
  });

  /**
   * The two index collisions `docs/53` §3 predicted are paid the way it said they would be — with
   * a MULTI-TOKEN surface, because `como` is L1-M4's verb and `la`/`los`/`las` are L1-M1's
   * articles. A brief that taught either as a bare key would mint a note nobody is ever shown.
   */
  it('pays its two predicted collisions with whole surfaces', () => {
    expect(all['L3-M3']?.notes.join('\n')).toMatch(/indexed WHOLE/);
    expect(all['L3-M5']?.notes.join('\n')).toMatch(/MULTI-TOKEN surfaces/);
    expect(notes).toMatch(/maxSpan is 3/);
  });

  it('names its seam in every module but the last', () => {
    for (const [id, brief] of l3.filter(([id]) => id !== 'L3-M10')) {
      expect(brief.notes.join('\n'), `${id} names its seam`).toMatch(/INDEX SEAM/);
    }
  });

  /** L4 is where the level stops, and each brief that touches its edge says so. */
  it('names what it defers to L4', () => {
    expect(all['L3-M3']?.notes.join('\n')).toMatch(/named as L4/);
    expect(all['L3-M4']?.notes.join('\n')).toMatch(/L4-M3/);
    expect(all['L3-M5']?.notes.join('\n')).toMatch(/L4/);
    expect(all['L3-M8']?.notes.join('\n')).toMatch(/L4/);
  });
});

describe('en-ar L2: the decisions its briefs settle (#427)', () => {
  const all = COURSE_BRIEFS['en-ar'] ?? {};
  const l2 = Object.entries(all).filter(([id]) => id.startsWith('L2-'));
  const notes = l2.flatMap(([, brief]) => brief.notes).join('\n');

  it('covers exactly L1-M1..L5-M10 — five levels, fifty modules, the whole ladder', () => {
    expect(Object.keys(all)).toEqual([
      ...['L1', 'L2', 'L3', 'L4', 'L5'].flatMap((level) =>
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((n) => `${level}-M${n}`),
      ),
    ]);
  });

  it('climbs its bounds 8 → 9 → 10 across the level', () => {
    const bound = (id: string): number | undefined => all[id]?.maxWordsPerSentence;
    for (const id of ['L2-M1', 'L2-M2', 'L2-M3']) expect(bound(id), id).toBe(8);
    for (const id of ['L2-M4', 'L2-M5', 'L2-M6', 'L2-M7']) expect(bound(id), id).toBe(9);
    for (const id of ['L2-M8', 'L2-M9', 'L2-M10']) expect(bound(id), id).toBe(10);
  });

  /**
   * The two course-wide decisions, both of which have to reach an author through a note: the
   * variety stays MSA with dialect confined to prose, and the chip marks a ceremonial end rather
   * than an address contrast this language does not have.
   */
  it('keeps the dialect in prose and states the register decision in a NOTE', () => {
    expect(COURSE_BRIEFS_SOURCE).toMatch(/MSA stays, and the dialect question is finally answered/);
    // The three modules allowed a dialect line each say so where an author will read it.
    expect(all['L2-M4']?.notes.join('\n')).toMatch(/al-bāṣ/);
    expect(all['L2-M4']?.notes.join('\n')).toMatch(/prose only, never a field the index reads/);
    expect(all['L2-M5']?.notes.join('\n')).toMatch(/display, script, forms and pool stay MSA/);
    const m1 = all['L2-M1']?.notes.join('\n') ?? '';
    expect(m1).toMatch(/no tú\/usted decision to take/);
    expect(m1).toMatch(/`formal`/);
    expect(m1).toMatch(/`informal` is UNUSED in en-ar/);
  });

  /** The three agreement laws, each stated where its module can reach it. */
  it('states the three agreement laws that cut against English', () => {
    expect(all['L2-M3']?.notes.join('\n')).toMatch(/NON-HUMAN things takes feminine SINGULAR/);
    expect(all['L2-M10']?.notes.join('\n')).toMatch(/before its subject stays SINGULAR/);
    expect(all['L2-M9']?.notes.join('\n')).toMatch(/invariable for gender and number/);
  });

  it('assigns every shared key an owner, in the notes', () => {
    // `min` is L1-M1's, and the comparative is its third job.
    expect(all['L2-M9']?.notes.join('\n')).toMatch(/"Than" is min, and the key is L1-M1's/);
    // `man` must never be written as `min`.
    expect(all['L2-M7']?.notes.join('\n')).toMatch(/man \("who"\) and min/);
    // `afʿal` is a pattern, said in both modules that use it.
    expect(all['L2-M3']?.notes.join('\n')).toMatch(/afʿal is the same shape M9 will use/);
    expect(all['L2-M9']?.notes.join('\n')).toMatch(/afʿal is a PATTERN, not a meaning/);
    // `ʿind-` is a preposition; the slogan is named and refused.
    expect(all['L2-M8']?.notes.join('\n')).toMatch(/slogan to kill is "ʿindī means I have"/);
    for (const [id, brief] of l2) {
      expect(brief.notes.join('\n'), `${id} names its seam`).toMatch(/INDEX SEAM/);
    }
  });

  /** The one prohibition L2 lifts, and the ones it does not. */
  it('lifts `laysa` at M7 alone and keeps the rest of L1 ban standing', () => {
    expect(all['L2-M7']?.notes.join('\n')).toMatch(/THIRD PERSON ONLY/);
    expect(all['L2-M8']?.notes.join('\n')).toMatch(/this module names it and does not use it/);
    expect(all['L2-M10']?.notes.join('\n')).toMatch(/qad, lam and the passive stay OUT/);
    expect(notes).toMatch(/person suffix/i);
  });
});

describe('en-ar L3: the decisions its briefs settle (#463)', () => {
  const all = COURSE_BRIEFS['en-ar'] ?? {};
  const l3 = Object.entries(all).filter(([id]) => id.startsWith('L3-'));
  const notes = l3.flatMap(([, brief]) => brief.notes).join('\n');

  /**
   * The bounds climb 10 → 11 → 12, continuing L2's 8 → 10 and matching hi-mr's and en-es's L3.
   * They are pinned because a prompt renders them verbatim into `complexity`.
   */
  it('climbs its bounds 10 → 11 → 12 across the level', () => {
    const bound = (id: string): number | undefined => all[id]?.maxWordsPerSentence;
    for (const id of ['L3-M1', 'L3-M2', 'L3-M3']) expect(bound(id), id).toBe(10);
    for (const id of ['L3-M4', 'L3-M5', 'L3-M6', 'L3-M7']) expect(bound(id), id).toBe(11);
    for (const id of ['L3-M8', 'L3-M9', 'L3-M10']) expect(bound(id), id).toBe(12);
  });

  /**
   * `docs/54`'s "What L2 withholds" list has an owner for every piece L3 takes, and the owner is
   * named in the notes — an author only ever sees the notes.
   */
  it('gives the pieces L2 withheld an owner, and narrows the rest', () => {
    expect(all['L3-M4']?.notes.join('\n'), 'lam and the jussive').toMatch(/JUSSIVE OPENS/);
    expect(all['L3-M7']?.notes.join('\n'), 'qad').toMatch(/qad OPENS HERE/);
    expect(all['L3-M3']?.notes.join('\n'), 'one cell of the case system').toMatch(/ACCUSATIVE/);
    // The passive stays out: M8 teaches the participle a sign is written in and defers the verb.
    expect(all['L3-M8']?.notes.join('\n')).toMatch(/PASSIVE PARTICIPLE/);
    expect(all['L3-M8']?.notes.join('\n')).toMatch(/passive verb itself/);
    // Broken plurals stay vocabulary, in the forms of their singular's row — never a system.
    expect(notes).toMatch(/[Bb]roken plurals?/);
  });

  /**
   * The three collisions this level walks into are all with rows L1 and L2 already own, and each
   * brief points back rather than opening a second family.
   */
  it('points back at every row it collides with', () => {
    expect(all['L3-M4']?.notes.join('\n'), "law is L2-M1's").toMatch(/law samaḥt/);
    expect(all['L3-M6']?.notes.join('\n'), "bi- is L1-M2's").toMatch(/L1-M2's clitic row/);
    expect(all['L3-M3']?.notes.join('\n'), "li- is L1-M9's").toMatch(/L1-M9/);
    expect(all['L3-M7']?.notes.join('\n'), "yuʿjibunī is M6's").toMatch(/M6/);
  });

  it('names its seam in every module but the last', () => {
    for (const [id, brief] of l3.filter(([id]) => id !== 'L3-M10')) {
      expect(brief.notes.join('\n'), `${id} names its seam`).toMatch(/INDEX SEAM/);
    }
  });

  /** L4 is where the level stops, and each brief that touches its edge says so. */
  it('names what it defers to L4', () => {
    expect(all['L3-M2']?.notes.join('\n'), 'the subjunctive beyond two frames').toMatch(/L4/);
    expect(all['L3-M4']?.notes.join('\n'), 'the jussive as a mood').toMatch(/L4/);
    expect(all['L3-M7']?.notes.join('\n'), 'the dual as a system').toMatch(/L4/);
    expect(all['L3-M8']?.notes.join('\n'), 'the passive verb').toMatch(/L4/);
  });
});

describe('hi-en L2: the decisions its briefs settle (#428)', () => {
  const all = COURSE_BRIEFS['hi-en'] ?? {};
  const l2 = Object.entries(all).filter(([id]) => id.startsWith('L2-'));

  it('covers exactly L1-M1..L5-M10 — five levels, fifty modules, the whole ladder', () => {
    expect(Object.keys(all)).toEqual([
      ...['L1', 'L2', 'L3', 'L4', 'L5'].flatMap((level) =>
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((n) => `${level}-M${n}`),
      ),
    ]);
  });

  it('climbs its bounds 8 → 9 → 10 across the level', () => {
    const bound = (id: string): number | undefined => all[id]?.maxWordsPerSentence;
    for (const id of ['L2-M1', 'L2-M2', 'L2-M3']) expect(bound(id), id).toBe(8);
    for (const id of ['L2-M4', 'L2-M5', 'L2-M6', 'L2-M7']) expect(bound(id), id).toBe(9);
    for (const id of ['L2-M8', 'L2-M9', 'L2-M10']) expect(bound(id), id).toBe(10);
  });

  /**
   * The decision this L2 exists to make: one `you`, and a politeness scale built out of words.
   * If it stops reaching an author, the course starts teaching `Do it, please`.
   */
  it('states register-in-words, the chip and the Indian-English line in a NOTE', () => {
    const m1 = all['L2-M1']?.notes.join('\n') ?? '';
    expect(m1).toMatch(/turning the request into a QUESTION and from making it LONGER/);
    expect(m1).toMatch(/`informal`/);
    expect(m1).toMatch(/`formal`/);
    // The variety is named in usage and never called wrong.
    expect(m1).toMatch(/kindly do the needful/);
    expect(m1).toMatch(/never appears in display, in forms or in a pool item/);
    expect(all['L2-M7']?.notes.join('\n')).toMatch(/isn't it\? as a universal tag/);
  });

  /** The contraction correction — L1 already owns `won't` and `we'll`. */
  it('corrects the contraction list and assigns the ones L2 actually adds', () => {
    expect(COURSE_BRIEFS_SOURCE).toMatch(/The commissioning issue lists `won't` and `we'll`/);
    expect(COURSE_BRIEFS_SOURCE).toMatch(/they are already \*\*L1-M6's\*\*/);
    expect(all['L2-M1']?.notes.join('\n')).toMatch(/can't is its own row/);
    expect(all['L2-M5']?.notes.join('\n')).toMatch(/I'd is its own row/);
    expect(all['L2-M6']?.notes.join('\n')).toMatch(/let's is its own row/);
    expect(all['L2-M8']?.notes.join('\n')).toMatch(/haven't and hasn't are separate rows/);
  });

  it('opens the possessive at M2 and the present perfect at M8, both on the record', () => {
    expect(all['L2-M2']?.notes.join('\n')).toMatch(/The possessive 's opens here/);
    expect(all['L2-M2']?.notes.join('\n')).toMatch(/brother and brother's as two different words/);
    const m8 = all['L2-M8']?.notes.join('\n') ?? '';
    expect(m8).toMatch(/present perfect enters HERE and nowhere else in L2/);
    expect(m8).toMatch(/never carry a finished time expression/);
    // Reported speech stays L3-M5's, and M7 is the module that would otherwise reach for it.
    expect(all['L2-M7']?.notes.join('\n')).toMatch(/L3-M5's/);
    expect(all['L2-M10']?.notes.join('\n')).toMatch(/past perfect \(I had gone\), used to/);
  });

  it('assigns every new surface an owner, and says the L1 decisions still bind', () => {
    // `than` against L1-M10's `then` — one letter, no audible difference, no way back.
    expect(all['L2-M9']?.notes.join('\n')).toMatch(/than and then are one letter/);
    // The multi-token tool, used four more times.
    expect(all['L2-M1']?.notes.join('\n')).toMatch(/three-token surface/);
    expect(all['L2-M3']?.notes.join('\n')).toMatch(/a lot of rides as a three-token surface/);
    // The bookends: the four L1 decisions, restated at both ends of the level.
    expect(all['L2-M1']?.notes.join('\n')).toMatch(/four L1 decisions/);
    expect(all['L2-M10']?.notes.join('\n')).toMatch(/four L1 decisions still bind/);
    for (const [id, brief] of l2) {
      expect(brief.notes.join('\n'), `${id} names its seam`).toMatch(/INDEX SEAM/);
    }
  });
});

describe('hi-en L3: the decisions its briefs settle (#464)', () => {
  const all = COURSE_BRIEFS['hi-en'] ?? {};
  const l3 = Object.entries(all).filter(([id]) => id.startsWith('L3-'));

  it('climbs its bounds 10 → 11 → 12 across the level', () => {
    const bound = (id: string): number | undefined => all[id]?.maxWordsPerSentence;
    for (const id of ['L3-M1', 'L3-M2', 'L3-M3']) expect(bound(id), id).toBe(10);
    for (const id of ['L3-M4', 'L3-M5', 'L3-M6', 'L3-M7']) expect(bound(id), id).toBe(11);
    for (const id of ['L3-M8', 'L3-M9', 'L3-M10']) expect(bound(id), id).toBe(12);
  });

  /**
   * `docs/55` §4 named five things L2 withheld. Every one has an owner here, named in the notes,
   * because an author only ever sees the notes.
   */
  it('gives every piece L2 withheld an owner', () => {
    expect(all['L3-M4']?.notes.join('\n'), 'conditionals').toMatch(/no will after if/i);
    expect(all['L3-M5']?.notes.join('\n'), 'reported speech').toMatch(/REPORTED QUESTIONS/);
    expect(all['L3-M8']?.notes.join('\n'), 'the passive').toMatch(/PASSIVE OPENS HERE/);
    expect(all['L3-M9']?.notes.join('\n'), 'relative clauses').toMatch(/RELATIVE CLAUSES OPEN/);
    expect(all['L3-M10']?.notes.join('\n'), 'used to').toMatch(/used to/);
    expect(all['L3-M10']?.notes.join('\n'), 'the past perfect').toMatch(/PAST PERFECT/);
    // The perfect's duration use, which L2-M8 explicitly deferred while lifting the result use.
    expect(all['L3-M7']?.notes.join('\n')).toMatch(/for AGAINST since/);
  });

  /**
   * This is the one course whose target language is the interference language's opposite, so the
   * briefs are written against what a Hindi speaker actually produces. The four highest-frequency
   * markers of Indian English each have a module that owns them.
   */
  it('names the interference each module is built to catch', () => {
    expect(all['L3-M1']?.notes.join('\n'), 'stative -ing').toMatch(/STATIVE VERBS DO NOT TAKE/);
    expect(all['L3-M2']?.notes.join('\n'), 'uncountables').toMatch(/UNCOUNTABLE NOUNS/);
    expect(all['L3-M3']?.notes.join('\n'), '*I am agree').toMatch(/agree is a VERB/);
    expect(all['L3-M6']?.notes.join('\n'), '-ed against -ing').toMatch(/-ed AGAINST -ing/);
  });

  it('names its seam in every module but the last', () => {
    for (const [id, brief] of l3.filter(([id]) => id !== 'L3-M10')) {
      expect(brief.notes.join('\n'), `${id} names its seam`).toMatch(/INDEX SEAM/);
    }
  });

  it('names what it defers to L4', () => {
    expect(all['L3-M4']?.notes.join('\n'), 'the third conditional').toMatch(/L4-M3/);
    expect(all['L3-M8']?.notes.join('\n'), 'the perfect passive').toMatch(/L4/);
  });
});

describe('en-ru L2: the decisions its briefs settle (#429)', () => {
  const all = COURSE_BRIEFS['en-ru'] ?? {};
  const l2 = Object.entries(all).filter(([id]) => id.startsWith('L2-'));

  it('covers exactly L1-M1..L5-M10 — five levels, fifty modules, the whole ladder', () => {
    expect(Object.keys(all)).toEqual([
      ...['L1', 'L2', 'L3', 'L4', 'L5'].flatMap((level) =>
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((n) => `${level}-M${n}`),
      ),
    ]);
  });

  it('climbs its bounds 8 → 9 → 10 across the level', () => {
    const bound = (id: string): number | undefined => all[id]?.maxWordsPerSentence;
    for (const id of ['L2-M1', 'L2-M2', 'L2-M3']) expect(bound(id), id).toBe(8);
    for (const id of ['L2-M4', 'L2-M5', 'L2-M6', 'L2-M7']) expect(bound(id), id).toBe(9);
    for (const id of ['L2-M8', 'L2-M9', 'L2-M10']) expect(bound(id), id).toBe(10);
  });

  /** Which case enters where — and the fifth one that does not, with its reason. */
  it('places each case in the module that needs it, and keeps the instrumental out', () => {
    expect(all['L2-M1']?.notes.join('\n')).toMatch(/dative enters here/);
    expect(all['L2-M3']?.notes.join('\n')).toMatch(/genitive of absence/);
    expect(all['L2-M4']?.notes.join('\n')).toMatch(/ACCUSATIVE for motion and the PREPOSITIONAL/);
    expect(all['L2-M9']?.notes.join('\n')).toMatch(/"Than" is the GENITIVE/);
    const m4 = all['L2-M4']?.notes.join('\n') ?? '';
    expect(m4).toMatch(/na avtóbuse\*\* — one preposition and one case/);
    expect(m4).toMatch(/instrumental proper is L3's/);
  });

  /** Aspect, taught twice, and the slogan it shares with en-es. */
  it('teaches aspect at M1 and M10, and names the slogan both courses kill', () => {
    expect(all['L2-M1']?.notes.join('\n')).toMatch(/imperative's ASPECT/);
    expect(all['L2-M5']?.notes.join('\n')).toMatch(/host speaks in the IMPERFECTIVE/);
    const m10 = all['L2-M10']?.notes.join('\n') ?? '';
    expect(m10).toMatch(/perfective is completed, imperfective is ongoing/);
    expect(m10).toMatch(/perfective has NO present tense/);
  });

  /** `vy` stays neutral, `ty` costs a module, and the switch is negotiated. */
  it('states the register decision and the chip mapping in a NOTE', () => {
    expect(all['L2-M1']?.notes.join('\n')).toMatch(/plain vy to a stranger stays `neutral`/);
    const m6 = all['L2-M6']?.notes.join('\n') ?? '';
    expect(m6).toMatch(/ty enters here/);
    expect(m6).toMatch(/chips `informal`/);
    expect(m6).toMatch(/NEGOTIATED out loud/);
    expect(all['L2-M7']?.notes.join('\n')).toMatch(/vy is the default even with someone/);
  });

  it('assigns every collision an owner, in the notes', () => {
    // `net` has three jobs across three modules and one row — L1-M2's.
    expect(all['L2-M3']?.notes.join('\n')).toMatch(/net is L1-M2's key/);
    expect(all['L2-M7']?.notes.join('\n')).toMatch(/net stays L1-M2's row/);
    // `yevó`/`yeyó` carry two jobs each, and the n- rule makes two more keys.
    expect(all['L2-M2']?.notes.join('\n')).toMatch(/TWO jobs/);
    expect(all['L2-M2']?.notes.join('\n')).toMatch(/they take an n-/);
    // `éhtot` is not L1-M1's `ehto`, and `lúchshe` serves two positives.
    expect(all['L2-M9']?.notes.join('\n')).toMatch(/is NOT L1-M1's ehto/);
    expect(all['L2-M9']?.notes.join('\n')).toMatch(/serves BOTH khoroshó/);
    for (const [id, brief] of l2) {
      expect(brief.notes.join('\n'), `${id} names its seam`).toMatch(/INDEX SEAM/);
    }
  });
});

describe('en-ru L3: the decisions its briefs settle (#465)', () => {
  const all = COURSE_BRIEFS['en-ru'] ?? {};
  const l3 = Object.entries(all).filter(([id]) => id.startsWith('L3-'));
  const notes = l3.flatMap(([, brief]) => brief.notes).join('\n');

  it('climbs its bounds 10 → 11 → 12 across the level', () => {
    const bound = (id: string): number | undefined => all[id]?.maxWordsPerSentence;
    for (const id of ['L3-M1', 'L3-M2', 'L3-M3']) expect(bound(id), id).toBe(10);
    for (const id of ['L3-M4', 'L3-M5', 'L3-M6', 'L3-M7']) expect(bound(id), id).toBe(11);
    for (const id of ['L3-M8', 'L3-M9', 'L3-M10']) expect(bound(id), id).toBe(12);
  });

  /**
   * `docs/56`'s "What L2 withholds" list is the level's plan. Every piece L3 takes has an owner
   * named in the notes, because an author only ever sees the notes.
   */
  it('gives every piece L2 withheld an owner', () => {
    expect(all['L3-M2']?.notes.join('\n'), 'the instrumental').toMatch(/INSTRUMENTAL OPENS HERE/);
    expect(all['L3-M1']?.notes.join('\n'), 'reflexives as a system').toMatch(/REFLEXIVE VERBS/);
    expect(all['L3-M4']?.notes.join('\n'), 'the conditional by').toMatch(/CONDITIONAL by OPENS/);
    expect(all['L3-M8']?.notes.join('\n'), 'numbers above a hundred').toMatch(/above a hundred/);
    expect(all['L3-M10']?.notes.join('\n'), 'prefixed motion verbs').toMatch(/PREFIXED MOTION/);
    expect(all['L3-M10']?.notes.join('\n'), 'khodíl / yézdil').toMatch(/khodíl/);
  });

  /**
   * The comma before a subordinate clause is grammar in Russian rather than style, and it is
   * stated once at M3 and pointed back at twice — the same discipline the seams use.
   */
  it('states the comma law once and points back at it', () => {
    expect(all['L3-M3']?.notes.join('\n')).toMatch(/COMMA IS OBLIGATORY/);
    expect(all['L3-M5']?.notes.join('\n')).toMatch(/M3's comma law/);
    expect(all['L3-M9']?.notes.join('\n')).toMatch(/M3's law/);
  });

  /** The stress rule (#355) and the quiet Cyrillic line are the course's law, restated for L3. */
  it('restates the stress and script law', () => {
    expect(notes).toMatch(/STRESS IS WRITTEN ON EVERY POLYSYLLABLE/);
    expect(notes).toMatch(/script line/);
  });

  it('names its seam in every module but the last', () => {
    for (const [id, brief] of l3.filter(([id]) => id !== 'L3-M10')) {
      expect(brief.notes.join('\n'), `${id} names its seam`).toMatch(/INDEX SEAM/);
    }
  });

  it('names what it defers to L4', () => {
    expect(all['L3-M10']?.notes.join('\n'), 'determinate/indeterminate').toMatch(/L4/);
  });
});

describe('en-it L2: the decisions its briefs settle (#430)', () => {
  const all = COURSE_BRIEFS['en-it'] ?? {};
  const l2 = Object.entries(all).filter(([id]) => id.startsWith('L2-'));

  it('covers exactly L1-M1..L5-M10 — five levels, fifty modules, the whole ladder', () => {
    expect(Object.keys(all)).toEqual([
      ...['L1', 'L2', 'L3', 'L4', 'L5'].flatMap((level) =>
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((n) => `${level}-M${n}`),
      ),
    ]);
  });

  it('climbs its bounds 8 → 9 → 10 across the level', () => {
    const bound = (id: string): number | undefined => all[id]?.maxWordsPerSentence;
    for (const id of ['L2-M1', 'L2-M2', 'L2-M3']) expect(bound(id), id).toBe(8);
    for (const id of ['L2-M4', 'L2-M5', 'L2-M6', 'L2-M7']) expect(bound(id), id).toBe(9);
    for (const id of ['L2-M8', 'L2-M9', 'L2-M10']) expect(bound(id), id).toBe(10);
  });

  /**
   * The ruling the case fold forced: `Lei` folds onto L1-M10's `lei` ("she"), so the polite
   * address is a verb choice and the pronoun never reaches a display. If this note goes, the
   * course starts teaching a pronoun whose tap says "she".
   */
  it('teaches the polite address as a verb and keeps the pronoun out of display', () => {
    const m1 = all['L2-M1']?.notes.join('\n') ?? '';
    expect(m1).toMatch(/The pronoun Lei stays OUT of display/);
    expect(m1).toMatch(/surface\.ts lowercases, so Lei folds to lei/);
    expect(m1).toMatch(/politeness rides the THIRD-PERSON VERB/);
    expect(m1).toMatch(/`formal`/);
    expect(m1).toMatch(/`informal`/);
    expect(COURSE_BRIEFS_SOURCE).toMatch(/en-de's `Sie`\/`sie` catastrophe, arriving in Italian/);
  });

  /** Words shipped, systems deferred — the congiuntivo and the conditional. */
  it('ships the formal imperatives as frozen words and defers the congiuntivo', () => {
    expect(all['L2-M1']?.notes.join('\n')).toMatch(/present SUBJUNCTIVE forms/);
    expect(all['L2-M1']?.notes.join('\n')).toMatch(/frozen politeness words/);
    expect(all['L2-M4']?.notes.join('\n')).toMatch(/subjunctive forms L3 will teach as a paradigm/);
  });

  /** The clitic ruling, shared with en-es, and the infinitive that swallows one. */
  it('teaches the clitics on lo/li/mi/ti and names the articles as the reason', () => {
    const m5 = all['L2-M5']?.notes.join('\n') ?? '';
    expect(m5).toMatch(/la, le, i and gli are L1-M1's ARTICLES/);
    expect(m5).toMatch(/left to L3/);
    expect(all['L2-M8']?.notes.join('\n')).toMatch(/aiutarmi is one word to the index/);
  });

  it('assigns every seam an owner, and pins M10 to the shared slogan', () => {
    expect(all['L2-M4']?.notes.join('\n')).toMatch(/a destra and a sinistra are indexed WHOLE/);
    expect(all['L2-M7']?.notes.join('\n')).toMatch(/più tardi — which rides as a two-token/);
    expect(all['L2-M9']?.notes.join('\n')).toMatch(/che is L1-M5's key/);
    expect(all['L2-M9']?.notes.join('\n')).toMatch(/migliore against meglio/);
    const m10 = all['L2-M10']?.notes.join('\n') ?? '';
    expect(m10).toMatch(/one tense is for completed actions and the other for ongoing ones/);
    expect(m10).toMatch(/essere for movement and change of state/);
    for (const [id, brief] of l2) {
      expect(brief.notes.join('\n'), `${id} names its seam`).toMatch(/INDEX SEAM/);
    }
  });
});

describe('en-it L3: the decisions its briefs settle (#466)', () => {
  const all = COURSE_BRIEFS['en-it'] ?? {};
  const l3 = Object.entries(all).filter(([id]) => id.startsWith('L3-'));
  const notes = l3.flatMap(([, brief]) => brief.notes).join('\n');

  it('climbs its bounds 10 → 11 → 12 across the level', () => {
    const bound = (id: string): number | undefined => all[id]?.maxWordsPerSentence;
    for (const id of ['L3-M1', 'L3-M2', 'L3-M3']) expect(bound(id), id).toBe(10);
    for (const id of ['L3-M4', 'L3-M5', 'L3-M6', 'L3-M7']) expect(bound(id), id).toBe(11);
    for (const id of ['L3-M8', 'L3-M9', 'L3-M10']) expect(bound(id), id).toBe(12);
  });

  /**
   * `docs/57` §4 named seven withheld pieces. The four L3 takes have owners named in the notes,
   * and the three it does not take are still named where a module would reach for them.
   */
  it('gives the pieces it takes an owner, and leaves the rest named', () => {
    expect(all['L3-M3']?.notes.join('\n'), 'the congiuntivo').toMatch(/CONGIUNTIVO OPENS HERE/);
    expect(all['L3-M4']?.notes.join('\n'), 'the conditional').toMatch(/CONDIZIONALE OPENS/);
    expect(all['L3-M5']?.notes.join('\n'), 'reported speech').toMatch(
      /reported speech as L3-M5|docs\/57 named reported speech/,
    );
    expect(all['L3-M5']?.notes.join('\n'), 'la, le and ne').toMatch(/OBJECT CLITICS/);
    // Still out, and named: the mood and the tense as SYSTEMS, and the passato remoto's relatives.
    expect(all['L3-M3']?.notes.join('\n')).toMatch(/names the system as L4/);
    expect(all['L3-M4']?.notes.join('\n')).toMatch(/L4-M3/);
    expect(all['L3-M8']?.notes.join('\n')).toMatch(/still L4/);
  });

  /**
   * The elision law is this course's own and L3 leans on it harder than L2 did, so every brief
   * that writes an elided form says the surface is ONE key with the elision inside it.
   */
  it('keeps the elision law, one key per elided surface', () => {
    expect(notes).toMatch(/elision inside it/);
    expect(all['L3-M1']?.notes.join('\n')).toMatch(/STRAIGHT apostrophes only/);
  });

  /**
   * `la` and `le` are L1-M1's ARTICLES, so M5's object clitics can only be taught as whole
   * surfaces — the collision `docs/57` predicted, paid the way it said it would be.
   */
  it('pays the la / le collision with whole surfaces', () => {
    expect(all['L3-M5']?.notes.join('\n')).toMatch(/MULTI-TOKEN surfaces/);
    expect(all['L3-M5']?.notes.join('\n')).toMatch(/maxSpan is 3/);
  });

  it('names its seam in every module but the last', () => {
    for (const [id, brief] of l3.filter(([id]) => id !== 'L3-M10')) {
      expect(brief.notes.join('\n'), `${id} names its seam`).toMatch(/INDEX SEAM/);
    }
  });
});

describe('en-fr L2: the decisions its briefs settle (#431)', () => {
  const all = COURSE_BRIEFS['en-fr'] ?? {};
  const l2 = Object.entries(all).filter(([id]) => id.startsWith('L2-'));

  it('covers exactly L1-M1..L5-M10 — five levels, fifty modules, the whole ladder', () => {
    expect(Object.keys(all)).toEqual([
      ...['L1', 'L2', 'L3', 'L4', 'L5'].flatMap((level) =>
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((n) => `${level}-M${n}`),
      ),
    ]);
  });

  it('climbs its bounds 8 → 9 → 10 across the level', () => {
    const bound = (id: string): number | undefined => all[id]?.maxWordsPerSentence;
    for (const id of ['L2-M1', 'L2-M2', 'L2-M3']) expect(bound(id), id).toBe(8);
    for (const id of ['L2-M4', 'L2-M5', 'L2-M6', 'L2-M7']) expect(bound(id), id).toBe(9);
    for (const id of ['L2-M8', 'L2-M9', 'L2-M10']) expect(bound(id), id).toBe(10);
  });

  /** L1 promised `tu` to this level and named `je voudrais` as deferred; M1 pays both debts. */
  it('opens the `tu` paradigm and `je voudrais` at M1, both on the record', () => {
    const m1 = all['L2-M1']?.notes.join('\n') ?? '';
    expect(m1).toMatch(/The paradigm opens here/);
    expect(m1).toMatch(/tutoyer and vouvoyer/);
    expect(m1).toMatch(/`informal`/);
    expect(m1).toMatch(/`formal`/);
    expect(m1).toMatch(/je voudrais enters here and ONLY as a frozen cell/);
    expect(m1).toMatch(/L3-M4's/);
    expect(all['L2-M6']?.notes.join('\n')).toMatch(/tu and on throughout/);
  });

  /** The rule L1 set up in two separate modules and never joined. */
  it('states the negated partitive at M5 and the clitic ruling that follows', () => {
    const m5 = all['L2-M5']?.notes.join('\n') ?? '';
    expect(m5).toMatch(/After a negation every partitive collapses to de/);
    expect(m5).toMatch(/le, la and les are L1-M1's ARTICLES/);
    expect(m5).toMatch(/en is M4's preposition/);
    expect(all['L2-M8']?.notes.join('\n')).toMatch(/m'aider is ONE key to the index/);
  });

  /** `ne` written everywhere, the spoken drop named once. */
  it('writes `ne` and names the spoken drop in exactly one module', () => {
    expect(COURSE_BRIEFS_SOURCE).toMatch(/`ne` is written, and the spoken drop is named in prose/);
    expect(all['L2-M7']?.notes.join('\n')).toMatch(/spoken French drops the ne/);
    expect(all['L2-M7']?.notes.join('\n')).toMatch(/no other module carries one/);
    // The absence that makes this M7 the mirror of en-it's.
    expect(all['L2-M7']?.notes.join('\n')).toMatch(/French has no continuous tense/);
  });

  it('assigns every seam an owner, and pins M10 to the shared slogan', () => {
    expect(all['L2-M2']?.notes.join('\n')).toMatch(/agrees with the THING POSSESSED/);
    expect(all['L2-M4']?.notes.join('\n')).toMatch(/droite is "right" and tout droit/);
    expect(all['L2-M9']?.notes.join('\n')).toMatch(/meilleur against mieux/);
    expect(all['L2-M9']?.notes.join('\n')).toMatch(/que is L1-M9's key/);
    const m10 = all['L2-M10']?.notes.join('\n') ?? '';
    expect(m10).toMatch(/one is for completed actions and the other for ongoing ones/);
    expect(m10).toMatch(/être for the movement and change-of-state verbs/);
    for (const [id, brief] of l2) {
      expect(brief.notes.join('\n'), `${id} names its seam`).toMatch(/INDEX SEAM/);
    }
  });
});

describe('en-fr L3: the decisions its briefs settle (#467)', () => {
  const all = COURSE_BRIEFS['en-fr'] ?? {};
  const l3 = Object.entries(all).filter(([id]) => id.startsWith('L3-'));
  const notes = l3.flatMap(([, brief]) => brief.notes).join('\n');

  it('climbs its bounds 10 → 11 → 12 across the level', () => {
    const bound = (id: string): number | undefined => all[id]?.maxWordsPerSentence;
    for (const id of ['L3-M1', 'L3-M2', 'L3-M3']) expect(bound(id), id).toBe(10);
    for (const id of ['L3-M4', 'L3-M5', 'L3-M6', 'L3-M7']) expect(bound(id), id).toBe(11);
    for (const id of ['L3-M8', 'L3-M9', 'L3-M10']) expect(bound(id), id).toBe(12);
  });

  /**
   * `docs/58` §5 named six withheld pieces. Each one L3 takes has an owner named in the notes,
   * and what it does not take is still named where a module would reach for it.
   */
  it('gives the pieces it takes an owner', () => {
    expect(all['L3-M3']?.notes.join('\n'), 'the subjunctive').toMatch(/SUBJUNCTIVE OPENS HERE/);
    expect(all['L3-M4']?.notes.join('\n'), 'the conditional').toMatch(/CONDITIONNEL OPENS/);
    expect(all['L3-M5']?.notes.join('\n'), 'reported speech').toMatch(/reported speech/);
    expect(all['L3-M5']?.notes.join('\n'), 'le, la, les, lui, leur').toMatch(/OBJECT CLITICS/);
    expect(all['L3-M9']?.notes.join('\n'), 'relative clauses').toMatch(/RELATIVE CLAUSES OPEN/);
    // Still out and named: the plus-que-parfait counterfactual is L4-M3's.
    expect(all['L3-M4']?.notes.join('\n')).toMatch(/L4-M3/);
    expect(all['L3-M3']?.notes.join('\n')).toMatch(/names the system as L4/);
  });

  /**
   * Two of this course's own laws carry into L3 and the briefs restate both, because an author
   * only ever sees the notes: the written `ne` (docs/58 §4) and the straight apostrophe with one
   * key per elided surface.
   */
  it('keeps the written ne and the elision law', () => {
    expect(notes).toMatch(/the ne is WRITTEN|ne stays written/);
    expect(all['L3-M1']?.notes.join('\n')).toMatch(/STRAIGHT apostrophes only/);
    expect(notes).toMatch(/ONE key with the elision inside it/);
  });

  /**
   * The participle agreement this level tests is a WRITING-ONLY rule — the learner hears nothing
   * and must write it — which is what makes an eight-sentence account the only honest test of it.
   */
  it('keeps the writing-only agreement rule and its limit', () => {
    expect(all['L3-M5']?.notes.join('\n')).toMatch(/WRITING-ONLY|writing-only/);
    expect(all['L3-M10']?.notes.join('\n')).toMatch(/writing-only|WRITING-ONLY/);
  });

  it('names its seam in every module but the last', () => {
    for (const [id, brief] of l3.filter(([id]) => id !== 'L3-M10')) {
      expect(brief.notes.join('\n'), `${id} names its seam`).toMatch(/INDEX SEAM/);
    }
  });
});

describe('en-de L2: the decisions its briefs settle (#432)', () => {
  const all = COURSE_BRIEFS['en-de'] ?? {};
  const l2 = Object.entries(all).filter(([id]) => id.startsWith('L2-'));

  it('covers exactly L1-M1..L5-M10 — five levels, fifty modules, the whole ladder', () => {
    expect(Object.keys(all)).toEqual([
      ...['L1', 'L2', 'L3', 'L4', 'L5'].flatMap((level) =>
        ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'].map((n) => `${level}-M${n}`),
      ),
    ]);
  });

  it('climbs its bounds 8 → 9 → 10 across the level', () => {
    const bound = (id: string): number | undefined => all[id]?.maxWordsPerSentence;
    for (const id of ['L2-M1', 'L2-M2', 'L2-M3']) expect(bound(id), id).toBe(8);
    for (const id of ['L2-M4', 'L2-M5', 'L2-M6', 'L2-M7']) expect(bound(id), id).toBe(9);
    for (const id of ['L2-M8', 'L2-M9', 'L2-M10']) expect(bound(id), id).toBe(10);
  });

  /** L1 spoke `Sie`, so the address that enters is `du` — and it is the priciest in the repo. */
  it('opens `du` at M1 and states what it costs', () => {
    const m1 = all['L2-M1']?.notes.join('\n') ?? '';
    expect(m1).toMatch(/the address that enters here is du/);
    expect(m1).toMatch(/`informal`/);
    expect(m1).toMatch(/`formal`/);
    expect(m1).toMatch(/MODAL BRACKET/);
    expect(m1).toMatch(/könnten is Konjunktiv II/);
    expect(COURSE_BRIEFS_SOURCE).toMatch(/The commissioning issue says "`Sie` enters at M1"/);
  });

  /** `sie` was settled in L1; L2 inherits it and rules on the debris. */
  it('inherits the `sie` row from L1-M2 and rules on the possessive `ihr`', () => {
    const m2 = all['L2-M2']?.notes.join('\n') ?? '';
    expect(m2).toMatch(/OPENS NO ROW for either/);
    expect(m2).toMatch(/ihre alone/);
    expect(m2).toMatch(/von periphrasis/);
    expect(m2).toMatch(/Bare ihr is never authored as a possessive/);
  });

  /** The two rulings that let a German L2 exist at all. */
  it('defers the attributive declension and keeps separable verbs unsplit', () => {
    expect(all['L2-M3']?.notes.join('\n')).toMatch(/Adjectives stay PREDICATIVE/);
    expect(all['L2-M3']?.notes.join('\n')).toMatch(/deferred to L3/);
    const m4 = all['L2-M4']?.notes.join('\n') ?? '';
    expect(m4).toMatch(/Separable verbs appear in this level ONLY unsplit/);
    expect(m4).toMatch(/INDEFINITE ARTICLE row/);
    expect(m4).toMatch(/ACCUSATIVE for motion into a place and the DATIVE/);
  });

  it('states the past-tense split and the collisions L1 predicted', () => {
    const m10 = all['L2-M10']?.notes.join('\n') ?? '';
    expect(m10).toMatch(/Perfekt is the spoken past for nearly every verb/);
    expect(m10).toMatch(/sein, haben and the modals prefer the Präteritum/);
    expect(m10).toMatch(/German participle never agrees with anything/);
    // The fold's own casualties, each pointed back at its L1 owner.
    expect(all['L2-M5']?.notes.join('\n')).toMatch(/das Essen lands on L1-M3's essen row/);
    expect(all['L2-M6']?.notes.join('\n')).toMatch(/der Morgen \("the morning"\) folds onto/);
    expect(all['L2-M8']?.notes.join('\n')).toMatch(/kein negates a noun/);
    expect(all['L2-M9']?.notes.join('\n')).toMatch(/the fold KEEPS umlauts/);
    for (const [id, brief] of l2) {
      expect(brief.notes.join('\n'), `${id} names its seam`).toMatch(/INDEX SEAM/);
    }
  });
});

describe('en-de L3: the decisions its briefs settle (#468)', () => {
  const all = COURSE_BRIEFS['en-de'] ?? {};
  const l3 = Object.entries(all).filter(([id]) => id.startsWith('L3-'));
  const notes = l3.flatMap(([, brief]) => brief.notes).join('\n');

  it('climbs its bounds 10 → 11 → 12 across the level', () => {
    const bound = (id: string): number | undefined => all[id]?.maxWordsPerSentence;
    for (const id of ['L3-M1', 'L3-M2', 'L3-M3']) expect(bound(id), id).toBe(10);
    for (const id of ['L3-M4', 'L3-M5', 'L3-M6', 'L3-M7']) expect(bound(id), id).toBe(11);
    for (const id of ['L3-M8', 'L3-M9', 'L3-M10']) expect(bound(id), id).toBe(12);
  });

  /**
   * The level's biggest single debt: L2 kept every adjective PREDICATIVE and said so as a
   * decision, naming the three attributive declensions as L3's. If that owner went missing
   * between the levels, the course would never teach them at all.
   */
  it('pays the debt L2 named — the attributive declension', () => {
    expect(all['L3-M2']?.notes.join('\n')).toMatch(/attributive|declension/i);
  });

  /**
   * The rest of what `docs/59` withheld, each in the module whose job needs it.
   */
  it('gives the other withheld pieces an owner', () => {
    expect(all['L3-M4']?.notes.join('\n'), 'Konjunktiv II').toMatch(/Konjunktiv II/);
    expect(all['L3-M5']?.notes.join('\n'), 'reported speech').toMatch(/[Rr]eported speech/);
    expect(all['L3-M5']?.notes.join('\n'), 'the Plusquamperfekt').toMatch(/Plusquamperfekt/);
    expect(all['L3-M8']?.notes.join('\n'), 'the genitive').toMatch(/[Gg]enitive/);
    expect(all['L3-M8']?.notes.join('\n'), 'relative clauses').toMatch(/[Rr]elative/);
    expect(all['L3-M9']?.notes.join('\n'), 'the werden passive').toMatch(/werden/);
  });

  /**
   * Two claims in the commissioning plan were FALSE against the real index, and the briefs are
   * written to the index rather than to the plan — the same correction `docs/53` §0 recorded for
   * en-es. `weil`, `dass` and `wenn` are L1's WITH their law, so no L3 module may present
   * verb-final order as new; and L1-M4 already splits a separable verb. Both facts have to reach
   * an author, who only ever sees the notes.
   */
  it('records the two places the plan and the index disagreed', () => {
    expect(all['L3-M3']?.notes.join('\n'), 'weil/dass/wenn are L1-M9 and L1-M10').toMatch(
      /L1-M9|L1-M10/,
    );
    expect(all['L3-M1']?.notes.join('\n'), 'L1-M4 already splits one').toMatch(/L1-M4/);
  });

  it('names its seam in every module but the last', () => {
    for (const [id, brief] of l3.filter(([id]) => id !== 'L3-M10')) {
      expect(brief.notes.join('\n'), `${id} names its seam`).toMatch(/INDEX SEAM/);
    }
  });

  it('names what it defers to L4', () => {
    expect(notes).toMatch(/L4-M3/);
    expect(notes).toMatch(/L4/);
  });
});

describe('en-ko L2: the decisions its briefs settle (#433)', () => {
  const all = COURSE_BRIEFS['en-ko'] ?? {};
  const l2 = Object.entries(all).filter(([id]) => id.startsWith('L2-'));

  it('climbs its bounds 8 → 9 → 10 across the level', () => {
    const bound = (id: string): number | undefined => all[id]?.maxWordsPerSentence;
    for (const id of ['L2-M1', 'L2-M2', 'L2-M3']) expect(bound(id), id).toBe(8);
    for (const id of ['L2-M4', 'L2-M5', 'L2-M6', 'L2-M7']) expect(bound(id), id).toBe(9);
    for (const id of ['L2-M8', 'L2-M9', 'L2-M10']) expect(bound(id), id).toBe(10);
  });

  /**
   * L1 settled the speech level and shipped `-si-` inside five whole phrases. M1 makes it
   * productive — and the mistake that follows immediately is using it about yourself.
   */
  it('makes the honorific productive at M1 and forbids it of the speaker', () => {
    const m1 = all['L2-M1']?.notes.join('\n') ?? '';
    expect(m1).toMatch(/This module makes it productive/);
    expect(m1).toMatch(/jeo-neun gayo is right and jeo-neun gaseyo is wrong/);
    expect(m1).toMatch(/`formal`/);
    expect(m1).toMatch(/`informal` is NEVER used in this course/);
    // The four verbs with a separate honorific word are vocabulary, not a rule.
    expect(m1).toMatch(/separate honorific word|honorific -si-|raises the SUBJECT/);
    expect(all['L2-M5']?.notes.join('\n')).toMatch(/meokda has a separate honorific word, deusida/);
  });

  /** Exactly three of L1's deferrals are collected, and the rest are named again. */
  it('collects `-go isseoyo`, `mot` and `-(eu)llae-yo`, and leaves the rest deferred', () => {
    expect(all['L2-M7']?.notes.join('\n')).toMatch(/-go isseoyo, the progressive, opens here/);
    expect(all['L2-M8']?.notes.join('\n')).toMatch(/mot opens here/);
    expect(all['L2-M6']?.notes.join('\n')).toMatch(/-\(eu\)llae-yo is the invitation ending/);
    expect(all['L2-M6']?.notes.join('\n')).toMatch(/-gess- stays deferred/);
    expect(all['L2-M10']?.notes.join('\n')).toMatch(/-deon, the double past -eoss-eoss-/);
  });

  /** What "agreement at length" means in a language with none, and the number rule L1 owed. */
  it('spends M3 on the particle grid and states the two number systems at M5', () => {
    const m3 = all['L2-M3']?.notes.join('\n') ?? '';
    expect(m3).toMatch(/Korean marks no gender, no number and no article/);
    expect(m3).toMatch(/topic -eun\/-neun against subject -i\/-ga/);
    expect(all['L2-M5']?.notes.join('\n')).toMatch(/native numbers count things/);
    expect(all['L2-M6']?.notes.join('\n')).toMatch(/HOUR is a native number/);
  });

  it('assigns every new particle and homograph an owner, in the notes', () => {
    // `deo` is M5's and M9 points back; `bae` and `nun` take one reading each, as L1 ruled.
    expect(all['L2-M5']?.notes.join('\n')).toMatch(/bae is the belly here/);
    expect(all['L2-M2']?.notes.join('\n')).toMatch(/nun is the eye here/);
    expect(all['L2-M9']?.notes.join('\n')).toMatch(/M5's row doing its second job/);
    // M10's real lesson is not a tense.
    expect(all['L2-M10']?.notes.join('\n')).toMatch(/Korean drops every subject/);
    for (const [id, brief] of l2) {
      expect(brief.notes.join('\n'), `${id} names its seam`).toMatch(/INDEX SEAM/);
    }
  });
});

describe('en-ko L3: the decisions its briefs settle (#469)', () => {
  const all = COURSE_BRIEFS['en-ko'] ?? {};
  const l3 = Object.entries(all).filter(([id]) => id.startsWith('L3-'));
  const notes = l3.flatMap(([, brief]) => brief.notes).join('\n');

  it('climbs its bounds 10 → 11 → 12 across the level', () => {
    const bound = (id: string): number | undefined => all[id]?.maxWordsPerSentence;
    for (const id of ['L3-M1', 'L3-M2', 'L3-M3']) expect(bound(id), id).toBe(10);
    for (const id of ['L3-M4', 'L3-M5', 'L3-M6', 'L3-M7']) expect(bound(id), id).toBe(11);
    for (const id of ['L3-M8', 'L3-M9', 'L3-M10']) expect(bound(id), id).toBe(12);
  });

  /**
   * The level's biggest structural debt: the VERB MODIFIER is Korean's relative clause, and a
   * module that has to describe anything cannot do without it. If its owner went missing between
   * the levels the course would never teach it at all.
   */
  it('pays the debt L2 left — the verb modifier', () => {
    expect(all['L3-M2']?.notes.join('\n')).toMatch(/-\(eu\)n|modifier/i);
  });

  it('gives the other withheld pieces an owner', () => {
    expect(all['L3-M4']?.notes.join('\n'), 'the conditional').toMatch(/-\(eu\)myeon|myeon/);
    expect(all['L3-M5']?.notes.join('\n'), 'reported speech').toMatch(/-dago|dago/);
    expect(all['L3-M8']?.notes.join('\n'), 'the honorific at length').toMatch(/-si-|honorific/);
    expect(all['L3-M9']?.notes.join('\n'), 'the retrospective').toMatch(/-deon|deon/);
  });

  /**
   * The register decision is the OPPOSITE of the other eight courses and has to survive into L3,
   * because an author who has read any other L3 brief will look for the `informal` chip. banmal is
   * what would earn it, L1 banned it, and neither L2 nor L3 lifts the ban.
   */
  it('keeps informal deliberately absent, and says so', () => {
    expect(notes).toMatch(/informal/);
    expect(notes).toMatch(/banmal/);
  });

  it('names its seam in every module but the last', () => {
    for (const [id, brief] of l3.filter(([id]) => id !== 'L3-M10')) {
      expect(brief.notes.join('\n'), `${id} names its seam`).toMatch(/INDEX SEAM/);
    }
  });

  it('names what it defers to L4', () => {
    expect(notes).toMatch(/L4/);
  });
});
