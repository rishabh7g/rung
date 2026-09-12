/**
 * @vitest-environment node
 *
 * Which font cuts a course is charged for (#631) — the one rule in `tools/payload-budget.ts` that
 * no other file can see, and the one a new course gets wrong silently.
 *
 * `coursesFromManifest` decides it from two things and nothing else: the course's language tags,
 * through `SCRIPT_BY_LANGUAGE_TAG`, and its `scriptMode`, through `ROMANIZATION_SCRIPT`. Getting it
 * wrong costs nothing at build time and shows up only offline, as a line half-drawn in the system
 * face — so the interesting cases are pinned here rather than left to a reader of the table.
 *
 * en-la is why this file exists. Every romanized course pays for `latin-ext` because `scriptMode`
 * says so; en-la is `native` — Latin is written in Latin letters — and still prints ten macron
 * vowels above U+00FF, because #630 fixed its orthography at macrons per the OLD so that `venit`
 * and `vēnit` are two index keys. That mark is charged by the tag, not by the mode, and the
 * distinction is exactly what a later reader would collapse.
 *
 * This is a new file, not a resurrected one: no `tools/payload-budget.test.ts` has existed before
 * (the 2026-08-30 cuts, #362-#365 and #370, never touched one), so nothing here is a gate this
 * repo used to have.
 */
import { describe, expect, it } from 'vitest';
import { COURSE_SCRIPTS, SCRIPT_BY_LANGUAGE_TAG, coursesFromManifest } from './payload-budget.ts';

/** One manifest row, in the shape the emitted `courses.json` carries. */
const row = (id: string, l1Tag: string, l2Tag: string, scriptMode: 'native' | 'romanized') => ({
  id,
  l1Tag,
  l2Tag,
  scriptMode,
});

const scriptsOf = (...rows: ReturnType<typeof row>[]): Record<string, readonly string[]> =>
  Object.fromEntries(coursesFromManifest({ courses: rows }).map((c) => [c.id, [...c.scripts]]));

describe('what a course is charged for', () => {
  it('charges a native Latin-script course nothing — the shell already draws its letters', () => {
    expect(scriptsOf(row('en-it', 'en', 'it', 'native'))).toEqual({ 'en-it': [] });
  });

  it('charges en-la the latin-ext cut its macrons need, though the row is native (#631)', () => {
    expect(scriptsOf(row('en-la', 'en', 'la', 'native'))).toEqual({ 'en-la': ['latin-ext'] });
  });

  it('charges a romanized course latin-ext for its marks, by mode rather than by tag (#222)', () => {
    expect(scriptsOf(row('en-ko', 'en', 'ko', 'romanized'))).toEqual({
      'en-ko': ['korean', 'latin-ext'],
    });
  });

  it('charges both tags of a course that renders two non-Latin lines', () => {
    expect(scriptsOf(row('hi-mr', 'hi', 'mr', 'native'))).toEqual({ 'hi-mr': ['devanagari'] });
  });

  it('never charges the same cut twice — en-sa is romanized AND tagged latin-ext-adjacent', () => {
    // `sa` maps to devanagari for the quiet line; the romanization adds latin-ext once.
    expect(scriptsOf(row('en-sa', 'en', 'sa', 'romanized'))).toEqual({
      'en-sa': ['devanagari', 'latin-ext'],
    });
  });

  it('keeps the table closed — every value is a script the build actually cuts', () => {
    for (const [tag, script] of Object.entries(SCRIPT_BY_LANGUAGE_TAG)) {
      expect(COURSE_SCRIPTS, `${tag} maps to a script no face is cut for`).toContain(script);
    }
  });

  it('leaves an unknown tag content-only rather than guessing a face for it', () => {
    expect(scriptsOf(row('en-xx', 'en', 'xx', 'native'))).toEqual({ 'en-xx': [] });
  });
});
