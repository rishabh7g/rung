/**
 * `author-kit` earns its place by being SMALL — that is the whole point of it (#480–#487).
 *
 * The measurement that produced it: across twenty-two authoring agents, 18.6% of all tool output
 * was shipped module JSON read whole to see a field shape, and another 12% was
 * `tools/course-briefs.ts` read to reach one entry. Both are ~25 KB and 7000 lines respectively;
 * what an author needs from them is one sentence and one object.
 *
 * So the assertions here are about SIZE and COMPLETENESS together. A kit that grew to the size of
 * the files it replaces would pass a content check and fail its reason for existing.
 */
import { describe, expect, it } from 'vitest';
import { execFileSync } from 'node:child_process';

const kit = (course: string, moduleId: string): string =>
  execFileSync('npx', ['tsx', 'tools/author-kit.ts', course, moduleId], {
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  });

describe('author-kit', () => {
  const text = kit('en-es', 'L3-M6');

  it('carries the four things an author reads before writing', () => {
    expect(text, 'the title and job').toMatch(/Feelings in depth/);
    expect(text, 'the bounds a prompt renders into complexity').toMatch(/maxWordsPerSentence: 11/);
    expect(text, 'the patterns').toMatch(/PATTERNS/);
    expect(text, 'every note, because a prompt only ever shows an author the notes').toMatch(
      /NOTES/,
    );
    // The nearest SHIPPED rung, whichever it is — later modules of the level may not exist yet.
    expect(text, 'a worked sentence for the field shape').toMatch(/ONE SENTENCE FROM L3-M\d+/);
  });

  /**
   * The sample is ONE sentence, not ten. A module has ten and they are ~2.5 KB each; the shape is
   * visible in the first. This is the assertion that stops the tool drifting back into a `cat`.
   */
  it('samples exactly one sentence, with its whole field set', () => {
    const sample = text.slice(text.indexOf('ONE SENTENCE FROM'));
    expect(sample.match(/"deconstruction"/g) ?? [], 'one deconstruction, not ten').toHaveLength(1);
    for (const field of ['display', 'cue', 'trap', 'sound', 'variations', 'mistake', 'usage']) {
      expect(sample, `the sample keeps ${field}`).toMatch(new RegExp(`"${field}"`));
    }
  });

  it('stays under 8 KB — the size is the feature', () => {
    expect(Buffer.byteLength(text)).toBeLessThan(8 * 1024);
  });

  /** The first module of a level has no earlier rung to sample, and must say so rather than throw. */
  it('says so when there is no earlier module to sample', () => {
    expect(kit('en-es', 'L3-M1')).toMatch(/no earlier L3 module/);
  });

  it('refuses a module it has no brief for, naming what it does have', () => {
    expect(() => kit('en-es', 'L9-M1')).toThrow();
  });
});
