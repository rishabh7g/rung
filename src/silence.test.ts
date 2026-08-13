/**
 * The silence guard (#97) — invariant [D1] asserted in code: **"the app plays no audio, records
 * nothing"** (design/PRD-engineering.md §1, §3 "out of scope: audio"; PRD-design §11).
 *
 * It belongs to the Read phase's ticket because Read is where the temptation lands. The phase asks
 * the learner to say the sentence out loud, and the obvious "help" is a play button — a synthesised
 * voice for a Marathi sentence, or a recorder to compare yourself against. Both are the product
 * saying the line for the learner, which is the one thing the pen-belongs-to-the-learner rule
 * (Invariant 3) rules out, and neither could ever be right offline, unverified, for a course whose
 * pronunciation nobody has signed off. The reading is the learner's own voice; the app has none.
 *
 * So the rule is mechanical rather than remembered, in the same shape as #80's shell-purity scan
 * and #82's calendar-free one: no shipped file under `src/` may name a sound API. Same three
 * edges, for the same reasons:
 *
 *   • **Comments count.** A doc comment is where a call waits before it becomes code. Naming the
 *     rule in prose without writing the call is possible — this file's own prose does it — and a
 *     scan that skipped comments would teach the habit that hides one.
 *   • **The list is the browser's, not a guess.** Playback (`Audio`, `<audio>`, `<video>`),
 *     synthesis (`speechSynthesis`, `SpeechSynthesisUtterance`) and capture (`MediaRecorder`,
 *     `getUserMedia`) — the three ways a page makes or takes a sound. The playback pattern is
 *     unbounded, so `AudioContext`, `webkitAudioContext` and `OfflineAudioContext` come with it.
 *   • **Escapes are out of reach.** `globalThis['Aud' + 'io']`, an alias, or a sound made inside a
 *     dependency all slip past a text scan. That is not the failure mode it exists for — the
 *     well-meant `new Audio(src)` is — and `ALLOWED` is empty, which is where it stays.
 *
 * The tests below plant each violation and prove the scanner bites, so a pattern that stops
 * matching cannot pass as a clean tree.
 */
import { describe, expect, it } from 'vitest';

/* ----------------------------------------------------------------- the rule */

/**
 * Every way the platform makes or records a sound. Case matters: the constructors and interfaces
 * are capitalised (`Audio`, `MediaRecorder`), so prose about "audio" in a comment is not a
 * violation while `new Audio(` is — and the markup patterns are the lowercase elements JSX
 * writes, because a capitalised `<Audio />` is a component nobody here has.
 */
const SOUND_APIS = [
  /**
   * `new Audio(src)` — and, unbounded on purpose, every `…Audio…` interface with it:
   * `AudioContext`, `webkitAudioContext`, `OfflineAudioContext`, `AudioBuffer`. A boundary here
   * would let the prefixed spellings through, which are exactly the ones a workaround reaches for.
   */
  { name: 'Audio', pattern: /Audio/ },
  /** `speechSynthesis.speak(…)` and the utterance it speaks. */
  { name: 'speechSynthesis', pattern: /[sS]peechSynthesis/ },
  /** Capture: the recorder, and the permission prompt that feeds it. */
  { name: 'MediaRecorder', pattern: /MediaRecorder/ },
  { name: 'getUserMedia', pattern: /getUserMedia/ },
  /** The elements themselves — in JSX, in a template string, or in `createElement`. */
  { name: '<audio>', pattern: /<\s*audio[\s/>]|createElement\(\s*['"`]audio['"`]/ },
  { name: '<video>', pattern: /<\s*video[\s/>]|createElement\(\s*['"`]video['"`]/ },
] as const;

/** Files exempt from the scan. **Empty, and that is the point** — the app is silent everywhere. */
const ALLOWED: readonly string[] = [];

/**
 * Every TypeScript file under `src/`, keyed the way a failure should name it: `src/App.tsx`.
 * Root-absolute rather than relative to this file, as #82's is, so the keys read the same
 * whichever directory the scan is asked from.
 */
const SOURCES: Readonly<Record<string, string>> = Object.fromEntries(
  Object.entries(
    import.meta.glob<string>('/src/**/*.{ts,tsx}', {
      query: '?raw',
      import: 'default',
      eager: true,
    }),
  ).map(([file, source]) => [file.replace(/^\//, ''), source]),
);

/**
 * The files the app ships. Tests are excluded because a test must be able to NAME what it forbids
 * — this file is the proof — and so is `src/test/`, which is fixtures.
 */
function shellFiles(allowed: readonly string[] = ALLOWED): string[] {
  return Object.keys(SOURCES)
    .filter(
      (file) =>
        !/\.test\.tsx?$/.test(file) && !file.startsWith('src/test/') && !allowed.includes(file),
    )
    .sort();
}

interface Violation {
  file: string;
  line: number;
  api: string;
  /** The offending line, trimmed — enough to see what got written where. */
  text: string;
}

/** One violation per line per API: a paste is usually a whole line, and that is the fix unit. */
function scanSource(file: string, source: string): Violation[] {
  const violations: Violation[] = [];

  source.split('\n').forEach((line, index) => {
    for (const { name, pattern } of SOUND_APIS) {
      if (pattern.test(line)) {
        violations.push({ file, line: index + 1, api: name, text: line.trim() });
      }
    }
  });

  return violations;
}

/* ---------------------------------------------------------------- the guard */

describe('the app is silent', () => {
  it('names no sound API anywhere it ships', () => {
    const violations = shellFiles().flatMap((file) => scanSource(file, SOURCES[file] ?? ''));

    expect(
      violations,
      violations
        .map((violation) => `${violation.file}:${violation.line} names ${violation.api}`)
        .join('\n')
        .concat(
          '\nThe app plays no audio and records nothing ([D1], PRD-engineering §1): the reading happens in the learner’s own voice, outside the app.',
        ),
    ).toEqual([]);
  });

  it('scans the real tree — the shell files, and not the tests beside them', () => {
    const files = shellFiles();

    expect(files).toContain('src/screens/practice/ReadPhase.tsx');
    expect(files).toContain('src/App.tsx');
    expect(files.some((file) => /\.test\.tsx?$/.test(file))).toBe(false);
    expect(files.some((file) => file.startsWith('src/test/'))).toBe(false);
  });

  it('exempts nothing at all — there is no file that gets to make a sound', () => {
    expect(ALLOWED).toEqual([]);
  });
});

describe('the scanner itself', () => {
  it('catches a constructed sound', () => {
    const planted = 'const bell = new Audio(chime);';

    expect(scanSource('src/Planted.ts', `const ok = 'fine';\n${planted}\n`)).toEqual([
      { file: 'src/Planted.ts', line: 2, api: 'Audio', text: planted },
    ]);
  });

  it('catches the Web Audio graph a “gentle chime” would be built on', () => {
    expect(scanSource('src/Planted.ts', 'const ctx = new AudioContext();')).toHaveLength(1);
  });

  it('catches a spoken sentence — the temptation this phase brings', () => {
    const planted = 'speechSynthesis.speak(new SpeechSynthesisUtterance(sentence.display));';

    expect(scanSource('src/Planted.ts', planted)).toEqual([
      { file: 'src/Planted.ts', line: 1, api: 'speechSynthesis', text: planted },
    ]);
  });

  it('catches a recorder and the permission prompt that feeds it', () => {
    const capture = 'const stream = await navigator.mediaDevices.getUserMedia({ audio: true });';

    expect(scanSource('src/Planted.ts', 'const rec = new MediaRecorder(stream);')).toHaveLength(1);
    expect(scanSource('src/Planted.tsx', capture)).toEqual([
      { file: 'src/Planted.tsx', line: 1, api: 'getUserMedia', text: capture },
    ]);
  });

  it('catches the elements, in JSX and in createElement', () => {
    expect(scanSource('src/Planted.tsx', '<audio src={clip} controls />')).toHaveLength(1);
    expect(scanSource('src/Planted.tsx', '  <video />')).toHaveLength(1);
    expect(scanSource('src/Planted.ts', "document.createElement('audio');")).toHaveLength(1);
  });

  it('catches a call hidden in a comment — that is where one waits to become code', () => {
    expect(scanSource('src/Planted.ts', ' * cheaper than a new Audio() per card')).toHaveLength(1);
  });

  it('leaves the prose alone — a phase named “read aloud” is not a sound API', () => {
    const fine =
      '// the nudge asks the learner to read aloud, in their own voice\n' +
      "const nudge = strings['nudge.read'];\n" +
      '<p className={styles.nudge}>{nudge}</p>\n';

    expect(scanSource('src/Planted.tsx', fine)).toEqual([]);
  });
});
