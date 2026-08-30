/**
 * The language law (#186, #196) — two languages are on screen at once, and the markup has to say
 * which is which AND which way each of them runs (PRD §4; WCAG 3.1.1 Language of Page, 3.1.2
 * Language of Parts, 1.3.2 Meaningful Sequence).
 *
 * A course is a PAIR. hi-mr speaks to the learner in Hindi (its L1: the chrome, the cues, the
 * traps, the mnemonics) about sentences written in Marathi (its L2). Before this ticket the app
 * threaded the course's `dir` onto 36 elements of a single screen and its `lang` onto none, so
 * the document stayed `lang="en"`: a screen reader announced every Devanagari line in an English
 * voice, and the browser applied English hyphenation, quotes and font fallback to both languages.
 *
 * The fix is not 36 more attributes. `lang` INHERITS, so the honest shape is:
 *
 *   • the document declares the course's L1, once, where the course resolves (`CourseProvider`);
 *   • every line written in the L2 declares the L2, because it is the exception to that;
 *   • the one line that is neither — `glossEn`, English by definition in every course — says so.
 *
 * A tag alone is not enough for a course whose L2 is written the other way round (#196). en-ar
 * prints its Arabic romanized, so the course runs `ltr` — and the quiet native line beneath every
 * sentence is Arabic, running `rtl` inside it. An rtl string in an ltr paragraph is not merely
 * unlabelled: the bidi algorithm puts its terminal punctuation on the wrong end. So the L2's
 * direction is declared beside its tag (`l2Dir`), the pair is handed out together
 * (`l2Written(course)`), and neither half may be rendered without the other.
 *
 * This file is the mechanical half of that, in four clauses: the manifest carries the tags and the
 * directions, the document tracks the active course, the taught language is marked as itself (and
 * pointed the right way) on a real screen, and — the clause that makes the next screen inherit all
 * of it — **no L2 surface may be rendered on an element that does not declare a language and a
 * direction**, scanned out of the source the way `shellPurity.test.ts` and `colourLaw.test.ts`
 * scan theirs.
 */
import { act, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App.tsx';
import { resetContentCache } from './course/content.ts';
import { l2Written, resetManifestCache, type Course } from './course/manifest.ts';
import { resetStringsCache } from './course/strings.ts';
import { useAppStore } from './state/store.ts';
import { romanizedModuleFixture } from './test/courseContent.ts';
import { DEV_MANIFEST, mockContentFetch, type ContentOverrides } from './test/courseManifest.ts';

/* ------------------------------------------------------------------ the tags */

/**
 * The authored manifest itself, not a fixture: what the product ships is the thing under test
 * (`src/course/types.test.ts` reads the content tree the same way).
 */
const AUTHORED = JSON.parse(
  Object.values(
    import.meta.glob<string>('../content/courses.json', {
      query: '?raw',
      import: 'default',
      eager: true,
    }),
  )[0] ?? '[]',
) as Course[];

/** Language, optional script, optional region — the shape both validators enforce. */
const LANGUAGE_TAG = /^[a-z]{2,3}(-[A-Z][a-z]{3})?(-([A-Z]{2}|\d{3}))?$/;

describe('every course names its two languages in tags, not just in words', () => {
  it('carries a well-formed BCP-47 tag for each side of the pair', () => {
    expect(AUTHORED).not.toHaveLength(0);

    for (const course of AUTHORED) {
      expect(course.l1Tag, `${course.id}.l1Tag`).toMatch(LANGUAGE_TAG);
      expect(course.l2Tag, `${course.id}.l2Tag`).toMatch(LANGUAGE_TAG);
      // A course that taught the language it speaks in would have nothing to teach.
      expect(course.l1Tag, `${course.id}: L1 and L2 are the same language`).not.toBe(course.l2Tag);
    }
  });

  it('romanizes the tag exactly when it romanizes the script', () => {
    for (const course of AUTHORED) {
      const written = l2Written(course);

      // `ar` printed in Latin letters is `ar-Latn` — same language, another script, which is why
      // en-ar reads `dir: 'ltr'`. The quiet native line beside it stays the plain tag.
      expect(written.display.lang).toBe(
        course.scriptMode === 'romanized' ? `${course.l2Tag}-Latn` : course.l2Tag,
      );
      expect(written.script.lang).toBe(course.l2Tag);
    }
  });

  it('says which way its L2 runs, as data rather than as a guess about the script (#196)', () => {
    for (const course of AUTHORED) {
      expect(['ltr', 'rtl'], `${course.id}.l2Dir`).toContain(course.l2Dir);
    }
  });

  it('points the printed line and the native line each their own way', () => {
    for (const course of AUTHORED) {
      const written = l2Written(course);

      // Latin letters run left to right whatever the language does, so a romanized display line
      // is `ltr` however the language is written. The native line always runs the language's way.
      expect(written.display.dir, `${course.id} display`).toBe(
        course.scriptMode === 'romanized' ? 'ltr' : course.l2Dir,
      );
      expect(written.script.dir, `${course.id} script`).toBe(course.l2Dir);
    }
  });

  it('is Hindi about Marathi for the pair the product was built for', () => {
    const hiMr = AUTHORED.find((course) => course.id === 'hi-mr');

    expect(hiMr?.l1Tag).toBe('hi');
    expect(hiMr?.l2Tag).toBe('mr');
  });

  it('is Hindi about English for the fourth course (#267, shipping since #273)', () => {
    const hiEn = AUTHORED.find((course) => course.id === 'hi-en');

    // The chrome of this course is Hindi and the sentences are English, and the shell knows
    // nothing of that: it reads `l1Tag` for the document and `l2Tag` for the taught line. The
    // row carries no fixture flag — #273 deleted it, so a learner build ships the course.
    expect(hiEn?.l1Tag).toBe('hi');
    expect(hiEn?.l2Tag).toBe('en');
    expect(hiEn?.fixture).toBeUndefined();
  });

  it('is English about Italian for the fifth course (#332, shipping since #337)', () => {
    const enIt = AUTHORED.find((course) => course.id === 'en-it');

    // The nearest sibling en-es has: same L1, a Latin-script L2 that also pro-drops. The shell
    // knows nothing of that — it reads `l1Tag` for the document and `l2Tag` for the taught line.
    // The row carries no fixture flag — #337 deleted it, so a learner build ships the course.
    expect(enIt?.l1Tag).toBe('en');
    expect(enIt?.l2Tag).toBe('it');
    expect(enIt?.fixture).toBeUndefined();
  });

  it('is English about French for the fifth course (#326, shipping since #331)', () => {
    const enFr = AUTHORED.find((course) => course.id === 'en-fr');

    // Same L1 as en-es, a different L2: the chrome is English and the sentences are French, and
    // the shell reads `l1Tag` for the document and `l2Tag` for the taught line without knowing
    // either language. The row carries no fixture flag — #331 deleted it, so a learner build
    // ships the course.
    expect(enFr?.l1Tag).toBe('en');
    expect(enFr?.l2Tag).toBe('fr');
    expect(enFr?.fixture).toBeUndefined();
  });

  it('is English about German for the eighth course, still behind the gate (#356)', () => {
    const enDe = AUTHORED.find((course) => course.id === 'en-de');

    // en-fr's closest sibling: the same English L1, another Latin-script L2. The shell reads
    // `l1Tag` for the document and `l2Tag` for the taught line and knows neither language — which
    // is why `ä ö ü ß` need no code anywhere, only a font cut that already claims U+0000-00FF.
    // The row still carries `fixture: true`: nothing in this course reaches a learner build until
    // its graduation issue deletes the flag, the way #331 deleted en-fr's.
    expect(enDe?.l1Tag).toBe('en');
    expect(enDe?.l2Tag).toBe('de');
    expect(enDe?.fixture).toBe(true);
  });

  it('is an ltr course with an rtl second line for the pair that needs both (#196)', () => {
    const enAr = AUTHORED.find((course) => course.id === 'en-ar');

    // The two are DIFFERENT facts and this row is the proof: everything the learner reads runs
    // left to right, and the quiet Arabic line under each sentence runs right to left.
    expect(enAr?.dir).toBe('ltr');
    expect(enAr?.l2Dir).toBe('rtl');
  });
});

/* -------------------------------------------------------------- the document */

/** Renders the app at a hash over the mocked content tree and waits for the frame. */
async function renderAt(hash: string, content: ContentOverrides = {}) {
  window.location.hash = hash;
  mockContentFetch(DEV_MANIFEST, undefined, content);
  render(<App />);
  await screen.findByRole('main');
}

beforeEach(() => {
  resetManifestCache();
  resetStringsCache();
  resetContentCache();
  useAppStore.getState()._reset();
  // What `index.html` ships, and what every one of these cases has to change to pass.
  document.documentElement.lang = 'en';
  document.documentElement.removeAttribute('dir');
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('the document declares the course, not English', () => {
  it('boots into the active course L1 — and takes its direction with it', async () => {
    await renderAt('#/');

    await waitFor(() => {
      expect(document.documentElement.lang).toBe('hi');
    });
    expect(document.documentElement.dir).toBe('ltr');
  });

  it('follows a course switch, because a switch is a new language', async () => {
    await renderAt('#/');
    await waitFor(() => {
      expect(document.documentElement.lang).toBe('hi');
    });

    // The P4 switch (#106) is a store write; the provider re-boots on it, strings and all.
    act(() => {
      useAppStore.getState().setActiveCourse('en-es');
    });

    await waitFor(() => {
      expect(document.documentElement.lang).toBe('en');
    });
  });
});

/* ------------------------------------------------------- the taught language */

/** Every string on screen that declares itself to be in `tag`, trimmed. */
function labelled(tag: string): string[] {
  return [...screen.getByRole('main').querySelectorAll(`[lang="${tag}"]`)].map((element) =>
    (element.textContent ?? '').replace(/\s+/gu, ' ').trim(),
  );
}

describe('L2 lines say they are L2, and L1 lines say nothing (they inherit)', () => {
  /**
   * Sentence Detail is the densest mix in the product: the hero, the word rows, the paradigm, the
   * variations and the wrong-L2 mistake are all L2; the cue, the trap, the sound note and the
   * mnemonic are all L1; and the gloss is English in a course that speaks Hindi. The fixture's
   * content is Spanish text (`src/test/courseContent.ts`) under the hi-mr manifest row — the tag
   * is what is under test, not the words.
   */
  beforeEach(async () => {
    await renderAt('#/sentence/L1-M1-S01');
    await screen.findByRole('heading', { level: 2 });
  });

  it('marks every taught surface with the L2 tag, and marks nothing else', () => {
    // The whole set, in document order — an exact list, so a line that stops being marked and a
    // line that should never have been marked are the same failure.
    expect(labelled('mr')).toEqual([
      'Me llamo Rohan', // the hero sentence
      'Me llamo', // a word row's L2 surface
      'Me llamo · te llamas · se llama', // its paradigm, without the shell's "forms:" label
      'Rohan', // the second word row — its L1 cue reads the same, and is NOT marked
      'MellamoPriya', // a variation: one span per token (the spacing is the stylesheet's)
      'Mi nombre es Rohan', // the common mistake — wrong L2 is still L2
    ]);
  });

  it('never marks the course own words as the language it teaches', () => {
    const l2 = labelled('mr');

    for (const l1 of [
      'My name is Rohan', // the cue
      'English says "my name is"; Spanish calls yourself something.', // the trap
      'The double l is a y sound.', // the sound note
      'Me llamo = I call myself.', // the mnemonic
    ]) {
      expect(l2).not.toContain(l1);
    }
  });

  it('leaves L1 copy to inherit the document, rather than repeating the tag on it', () => {
    const cue = screen.getByText('My name is Rohan');

    // The nearest declaration above the cue IS the document's — set from the course's L1.
    expect(cue.closest('[lang]')).toBe(document.documentElement);
    expect(document.documentElement.lang).toBe('hi');
  });

  it('marks the gloss English, because `glossEn` is English in every course', () => {
    expect(labelled('en')).toContain('lit. "I call myself Rohan"');
  });

  it('gives the hero the direction its own script runs, not just its tag (#196)', () => {
    // hi-mr is ltr on both counts; the assertion that matters is that the hero takes its
    // direction from the L2 at all, which is what makes the en-ar case below possible.
    expect(screen.getByRole('heading', { level: 2 })).toHaveAttribute('dir', 'ltr');
  });
});

/* ------------------------------- the taught direction (the romanized course) */

describe('a romanized course points its two L2 lines opposite ways (#196)', () => {
  /**
   * en-ar is the row that needs this: `dir: 'ltr'` (the chrome is English, the sentence is printed
   * in Latin letters) and `l2Dir: 'rtl'` (the quiet native line is Arabic). The fixture module is
   * the real en-ar pair — `ismī Rohān` over `اسمي روهان` — so both lines are on screen at once.
   */
  beforeEach(async () => {
    act(() => {
      useAppStore.getState().setActiveCourse('en-ar');
    });
    await renderAt('#/sentence/L1-M1-S01', { module: romanizedModuleFixture('L1-M1') });
    await screen.findByRole('heading', { level: 2 });
  });

  it('prints the romanized line ltr and the native line rtl, each with its own tag', () => {
    const display = screen.getByRole('heading', { level: 2 });
    const script = screen.getByText('اسمي روهان');

    expect(display).toHaveAttribute('lang', 'ar-Latn');
    expect(display).toHaveAttribute('dir', 'ltr');
    // The bug this ticket exists for: without this the Arabic sits in an ltr paragraph and its
    // terminal punctuation lands on the wrong end of the line.
    expect(script).toHaveAttribute('lang', 'ar');
    expect(script).toHaveAttribute('dir', 'rtl');
  });

  it('leaves the document itself ltr — the interface language did not change', () => {
    expect(document.documentElement.lang).toBe('en');
    expect(document.documentElement.dir).toBe('ltr');
  });

  it('never resolves an L2 direction with `auto` — the course declares it, the browser guesses', () => {
    const directed = [...screen.getByRole('main').querySelectorAll('[dir]')];

    // `dir="auto"` reads the first strong character, so an Arabic line opening with a Latin
    // brand name or a digit would resolve ltr — the very failure this pairing removes.
    expect(directed.map((element) => element.getAttribute('dir'))).not.toContain('auto');
  });
});

/* ------------------------------------------------------------- the guard rail */

/**
 * Every shipped component, comments stripped: a `lang="en"` quoted in a doc comment is prose, and
 * a scan that counted it would be measuring the writing rather than the markup.
 *
 * `src/dev/TypeSpecimen.tsx` is out for the reason `shellPurity.test.ts` gives — the `/dev/type`
 * font specimen renders Devanagari on purpose and never ships (the route is `DEV`-only, so a
 * production build tree-shakes it away).
 */
const SOURCES = Object.entries(
  import.meta.glob<string>('./**/*.tsx', { query: '?raw', import: 'default', eager: true }),
)
  .filter(([path]) => !path.includes('.test.') && path !== './dev/TypeSpecimen.tsx')
  .map(([path, source]) => [path, stripComments(source)] as const);

/** Block and line comments out, everything else (including line count) intact. */
function stripComments(source: string): string {
  return source
    .replace(/\/\*[\s\S]*?\*\//gu, (block) => block.replace(/[^\n]/gu, ' '))
    .replace(
      /(^|[^:])\/\/[^\n]*/gu,
      (line, before: string) => before + ' '.repeat(line.length - 1),
    );
}

/**
 * An L2 surface rendered as JSX TEXT: `{sentence.display}`, `{word.display}`, `{item.script}`,
 * `{display}`. The lookbehind is what keeps everything that is not text out of it — `display={…}`,
 * `className={styles.display}` and `lang={l2.display.lang}` sit behind an `=`, a `key`
 * interpolates behind a `$`, and `changedTokens(a.display, b.display)` behind a `(` or a `,`.
 */
const L2_SURFACE = /(?<![=($,])\{\s*(?:[A-Za-z_$][\w$]*\.)*(?:display|script)\s*\}/gu;

/**
 * The one file allowed to name a language in the source: Sentence Detail, for `glossEn`, in
 * English. The module list's card carried the second `lang="en"` until #217 took the gloss off it.
 */
const GLOSS_FILES = ['./screens/SentenceScreen.tsx'];

/** The opening tag an L2 surface is rendered inside, as source text. */
function enclosingTag(source: string, at: number): string {
  // JSX children follow their own tag, and no attribute value in this tree contains a `<`, so
  // the last one before the expression opens it.
  return source.slice(source.lastIndexOf('<', at), at);
}

/** Every L2 surface in `src/` whose opening tag does not carry `attribute`, as `path:line`. */
function surfacesMissing(attribute: 'lang' | 'dir'): string[] {
  const declared = new RegExp(`\\s${attribute}=`, 'u');
  const missing: string[] = [];

  for (const [path, source] of SOURCES) {
    for (const match of source.matchAll(L2_SURFACE)) {
      const at = match.index;
      if (!declared.test(enclosingTag(source, at))) {
        missing.push(`${path}:${source.slice(0, at).split('\n').length} ${match[0]}`);
      }
    }
  }
  return missing;
}

describe('an L2 line with no language, or no direction, is a failure, not a review comment', () => {
  it('renders no taught surface on an element that does not declare a language', () => {
    expect(surfacesMissing('lang')).toEqual([]);
  });

  it('renders no taught surface on an element that does not declare a direction (#196)', () => {
    // The other half of the same fact. A line marked `lang="ar"` and left to inherit `dir="ltr"`
    // is still rendered wrong — the quiet native line under every en-ar sentence was exactly
    // that until this ticket, and `l2Written()` hands the two out together so it cannot recur.
    expect(surfacesMissing('dir')).toEqual([]);
  });

  it('exercises the rule it scans for — a planted surface missing either half is caught', () => {
    const planted = {
      lang: '<p className={styles.display} dir={dir}>\n  {sentence.display}\n</p>',
      dir: '<p className={styles.script} lang={l2?.script.lang}>\n  {sentence.script}\n</p>',
    };

    for (const [attribute, source] of Object.entries(planted)) {
      const [match, ...rest] = [...source.matchAll(L2_SURFACE)];

      expect(rest).toEqual([]);
      expect(
        new RegExp(`\\s${attribute}=`, 'u').test(enclosingTag(source, match?.index ?? 0)),
      ).toBe(false);
    }
  });

  it('takes every language it declares from the manifest, never from the source', () => {
    const hardcoded = SOURCES.flatMap(([path, source]) =>
      [...source.matchAll(/lang="([^"]*)"/gu)].map(([, tag]) => `${path} lang="${tag ?? ''}"`),
    );

    // `glossEn` is the one line whose language is a fact about the SCHEMA rather than about the
    // course, so it is the one literal. Every other `lang` resolves through `l2Written(course)`
    // or the document, and a course id may never appear in `src/` (PRD §4, `shellPurity.test.ts`).
    expect(hardcoded.sort()).toEqual(GLOSS_FILES.map((path) => `${path} lang="en"`).sort());
  });

  it('takes every direction from the manifest too — no literal, and never `auto` (#196)', () => {
    const hardcoded = SOURCES.flatMap(([path, source]) =>
      [...source.matchAll(/\sdir="([^"]*)"/gu)].map(([, value]) => `${path} dir="${value ?? ''}"`),
    );

    // `dir="auto"` is the browser guessing from the first strong character in the string. It is
    // the right answer for text whose language nobody declared — and every line here is content
    // whose language the manifest names, so there is nothing to guess about.
    expect(hardcoded).toEqual([]);
  });
});
