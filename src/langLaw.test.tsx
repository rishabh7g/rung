/**
 * The language law (#186) — two languages are on screen at once, and the markup has to say which
 * is which (PRD §4; WCAG 3.1.1 Language of Page, 3.1.2 Language of Parts).
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
 * This file is the mechanical half of that, in four clauses: the manifest carries the tags, the
 * document tracks the active course, the taught language is marked as itself on a real screen,
 * and — the clause that makes the next screen inherit all of it — **no L2 surface may be rendered
 * on an element that does not declare a language**, scanned out of the source the way
 * `shellPurity.test.ts` and `colourLaw.test.ts` scan theirs.
 */
import { act, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App.tsx';
import { resetContentCache } from './course/content.ts';
import { l2Lang, resetManifestCache, type Course } from './course/manifest.ts';
import { resetStringsCache } from './course/strings.ts';
import { useAppStore } from './state/store.ts';
import { DEV_MANIFEST, mockContentFetch } from './test/courseManifest.ts';

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
      const written = l2Lang(course);

      // `ar` printed in Latin letters is `ar-Latn` — same language, another script, which is why
      // en-ar reads `dir: 'ltr'`. The quiet native line beside it stays the plain tag.
      expect(written.display).toBe(
        course.scriptMode === 'romanized' ? `${course.l2Tag}-Latn` : course.l2Tag,
      );
      expect(written.script).toBe(course.l2Tag);
    }
  });

  it('is Hindi about Marathi for the pair the product was built for', () => {
    const hiMr = AUTHORED.find((course) => course.id === 'hi-mr');

    expect(hiMr?.l1Tag).toBe('hi');
    expect(hiMr?.l2Tag).toBe('mr');
  });
});

/* -------------------------------------------------------------- the document */

/** Renders the app at a hash over the mocked content tree and waits for the frame. */
async function renderAt(hash: string) {
  window.location.hash = hash;
  mockContentFetch(DEV_MANIFEST);
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
 * `className={styles.display}` and `lang={l2.display}` sit behind an `=`, a `key` interpolates
 * behind a `$`, and `changedTokens(a.display, b.display)` behind a `(` or a `,`.
 */
const L2_SURFACE = /(?<![=($,])\{\s*(?:[A-Za-z_$][\w$]*\.)*(?:display|script)\s*\}/gu;

/** The two files allowed to name a language in the source — both for `glossEn`, both English. */
const GLOSS_FILES = ['./screens/SentenceScreen.tsx', './screens/module/SentenceCard.tsx'];

describe('a language-less L2 line is a failure, not a review comment', () => {
  it('renders no taught surface on an element that does not declare a language', () => {
    const unlabelled: string[] = [];

    for (const [path, source] of SOURCES) {
      for (const match of source.matchAll(L2_SURFACE)) {
        const at = match.index;
        // The enclosing opening tag: JSX children follow their own tag, and no attribute value
        // in this tree contains a `<`, so the last one before the expression opens it.
        const tag = source.slice(source.lastIndexOf('<', at), at);
        if (!/\slang=/u.test(tag)) {
          const line = source.slice(0, at).split('\n').length;
          unlabelled.push(`${path}:${line} ${match[0]}`);
        }
      }
    }

    expect(unlabelled).toEqual([]);
  });

  it('exercises the rule it scans for — a planted surface with no lang is caught', () => {
    const planted = '<p className={styles.display} dir={dir}>\n  {sentence.display}\n</p>';
    const [match, ...rest] = [...planted.matchAll(L2_SURFACE)];

    expect(rest).toEqual([]);
    expect(match?.[0]).toBe('{sentence.display}');
    expect(/\slang=/u.test(planted.slice(0, match?.index))).toBe(false);
  });

  it('takes every language it declares from the manifest, never from the source', () => {
    const hardcoded = SOURCES.flatMap(([path, source]) =>
      [...source.matchAll(/lang="([^"]*)"/gu)].map(([, tag]) => `${path} lang="${tag ?? ''}"`),
    );

    // `glossEn` is the one line whose language is a fact about the SCHEMA rather than about the
    // course, so it is the one literal. Every other `lang` resolves through `l2Lang(course)` or
    // the document, and a course id may never appear in `src/` (PRD §4, `shellPurity.test.ts`).
    expect(hardcoded.sort()).toEqual(GLOSS_FILES.map((path) => `${path} lang="en"`).sort());
  });
});
