/**
 * The exit ritual's arc (#100) — four promises, one describe each:
 *
 *   • **the guard**: the ritual belongs to a rung that is produced out, and to no other state,
 *   • **step 2 says nothing and offers nothing**: a title, and zero interactive elements inside
 *     it, of any kind [D18],
 *   • **the learner's sentence has nowhere to arrive and nowhere to live** (Invariants 4 and 6),
 *   • **every word is the course's**, and the two numbers in it are this rung's own.
 *
 * Everything renders the real `<App />` over a mocked `fetch`, the way every screen test in this
 * repo does: `/ritual` is a guarded route reached through the app's own table, and a guard that
 * works in a hand-wired router while the table says something else is exactly the bug worth
 * catching. The strings fixture is built FROM the canonical key list, so a line reads
 * `hi-mr ritual.stepTitle.check` — an assertion against the prototype's English would pass on a
 * hardcoded shell string, which is the one thing the strings contract exists to prevent.
 *
 * Progress is seeded the only way the app can make it: one `recordProduction` per Produce-phase
 * got-it, one `passRitual` per climbed rung. A fixture that wrote `production` directly would be
 * testing a state the app cannot reach.
 */
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App.tsx';
import { SIGNED_BEAT_MS } from '../components/HoldToConfirm.tsx';
import { resetContentCache } from '../course/content.ts';
import { resetManifestCache } from '../course/manifest.ts';
import { interpolate, resetStringsCache } from '../course/strings.ts';
import { ladderFromLevels } from '../engine/progression.ts';
import { useAppStore } from '../state/store.ts';
import { DEV_MANIFEST, mockContentFetch } from '../test/courseManifest.ts';
import { levelsFixture, moduleFixture } from '../test/courseContent.ts';
import { stringValue } from '../test/courseStrings.ts';
import holdSource from '../components/HoldToConfirm.tsx?raw';
import ritualCss from './RitualScreen.module.css?raw';
import ritualSource from './RitualScreen.tsx?raw';

const COURSE = 'hi-mr';
/** The fixture ladder's current rung: authored, unlocked, and the only module this screen reads. */
const CURRENT = 'L1-M1';
/** Injected, so nothing here touches the wall clock — `passedAt` is a receipt, not a schedule. */
const STAMP = () => '2026-02-03T09:00:00.000Z';
/** `--motion-hold-total` [D14] — the whole press-and-hold, in milliseconds (#101). */
const HOLD_MS = 900;

/** What the fixture bundle says for a key — the self-identifying value an assertion reads. */
function strings(key: string, courseId = COURSE): string {
  return stringValue(courseId, key);
}

/** `L1-M1-S01`, `L1-M1-S02`, … — how the modules author their sentence ids. */
function sentenceId(index: number): string {
  return `${CURRENT}-S${String(index + 1).padStart(2, '0')}`;
}

/**
 * The rung's module, resized: `sentences` many sentences, and a `maxWords` word cap. Both numbers
 * are what the constraint interpolates, so a test that changes them is a test that the line comes
 * from the module rather than from the screen.
 */
function ritualModule(sentences: number, maxWords: number) {
  const base = moduleFixture(CURRENT);
  const [first, second] = base.sentences;

  return {
    ...base,
    complexity: { ...base.complexity, maxWordsPerSentence: maxWords },
    sentences: Array.from({ length: sentences }, (_, index) => ({
      ...(index === 0 ? first! : second!),
      id: sentenceId(index),
    })),
  };
}

/**
 * Seeds production the only way the app can: one `recordProduction` per Produce-phase got-it.
 * Two per sentence across the whole rung is exactly what `exit_available` means (PRD §8 F1).
 */
function produce(...sentenceIds: string[]): void {
  const store = useAppStore.getState();
  store.ensureCourse(COURSE);
  for (const id of sentenceIds) store.recordProduction(COURSE, id);
}

/** The whole rung, produced out — the state the exit ritual exists for. */
function produceRung(sentences = 2): void {
  const ids = Array.from({ length: sentences }, (_, index) => sentenceId(index));
  produce(...ids, ...ids);
}

/** Renders `/ritual` with the module the test asked for, and waits for the shell's frame. */
async function renderRitual(module: unknown = moduleFixture(CURRENT)) {
  window.location.hash = '#/ritual';
  mockContentFetch(DEV_MANIFEST, undefined, { module });
  render(<App />);
  await screen.findByRole('main');
}

/** The three steps, in the arc's order — and the wait for the guard to have let them render. */
async function findSteps(): Promise<HTMLElement[]> {
  const arc = await screen.findByRole('list');
  return within(arc).getAllByRole('listitem');
}

/** Step 2 — the जांचो step, the region [D18] makes its claim about. */
function checkStep(): HTMLElement {
  const step = document.querySelector<HTMLElement>('[data-step="check"]');
  if (step === null) throw new Error('the arc has no check step');
  return step;
}

beforeEach(() => {
  resetContentCache();
  resetManifestCache();
  resetStringsCache();
  useAppStore.getState()._reset();
  window.location.hash = '';
  /**
   * The show-once check hint (#319) is seeded as ALREADY SEEN for this file's default, because
   * the steady state — what the arc looks like on every visit after the first — is what these
   * assertions are about. The first visit has its own case, below, which clears it.
   */
  localStorage.setItem('rung:hint:check', '1');
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  localStorage.clear();
  window.location.hash = '';
});

/* ------------------------------------------------------------------- the guard */

describe('the ritual belongs to a rung that is produced out', () => {
  it('opens on a rung whose every sentence is at two', async () => {
    produceRung();
    await renderRitual();

    expect(await findSteps()).toHaveLength(3);
    expect(window.location.hash).toBe('#/ritual');
  });

  it('sends a rung nobody has produced to its module, not to a message', async () => {
    await renderRitual();

    await waitFor(() => expect(window.location.hash).toBe(`#/module/${CURRENT}`));
    // And it really is the module list, not an empty frame with a rewritten URL.
    expect(await screen.findByText(moduleFixture(CURRENT).sentences[0]!.display)).toBeVisible();
  });

  it('sends a half-produced rung to its module too — "every sentence" means every one', async () => {
    // S01 twice, S02 once: one got-it short of the whole rung.
    produce(sentenceId(0), sentenceId(0), sentenceId(1));
    await renderRitual();

    await waitFor(() => expect(window.location.hash).toBe(`#/module/${CURRENT}`));
  });

  it('reads the counters, not the reading: opening the module opens nothing', async () => {
    useAppStore.getState().ensureCourse(COURSE);
    useAppStore.getState().markStudied(COURSE, CURRENT);
    await renderRitual();

    await waitFor(() => expect(window.location.hash).toBe(`#/module/${CURRENT}`));
  });

  it('opens for a produced rung the learner never opened the module of', async () => {
    // `studied` is false throughout: the ritual is earned by producing, not by browsing.
    produceRung();
    await renderRitual();

    expect(await findSteps()).toHaveLength(3);
    expect(useAppStore.getState().courses[COURSE]?.studied[CURRENT]).toBeUndefined();
  });

  it('sends a finished ladder home — there is no rung to write an 11th sentence for', async () => {
    const ladder = levelsFixture(COURSE);
    const store = useAppStore.getState();
    store.ensureCourse(COURSE);
    store.setLadder(COURSE, ladderFromLevels(ladder.levels));
    for (const level of ladder.levels) {
      for (const module of level.modules) store.passRitual(COURSE, module.id, STAMP);
    }

    await renderRitual();

    await waitFor(() => expect(window.location.hash).toBe('#/'));
  });
});

/* ------------------------------------------------- step 2: the honesty design [D18] */

describe('step 2 is a title, and a title is all it is', () => {
  /**
   * Every ARIA role a learner can act on — the widget roles, plus the composites a control hides
   * inside. The assertion is the absence of ALL of them: [D18] is not "no buttons", it is
   * "nothing to press", so a link dressed as text or a `role="menuitem"` div fails it too.
   */
  const INTERACTIVE_ROLES = [
    'button',
    'link',
    'checkbox',
    'radio',
    'radiogroup',
    'switch',
    'slider',
    'spinbutton',
    'textbox',
    'searchbox',
    'combobox',
    'listbox',
    'option',
    'menu',
    'menubar',
    'menuitem',
    'menuitemcheckbox',
    'menuitemradio',
    'tab',
    'tablist',
    'tree',
    'treeitem',
    'grid',
    'gridcell',
    'dialog',
    'form',
    'search',
    'progressbar',
    'scrollbar',
  ] as const;

  /** Anything the browser itself would focus or fire — the same claim, asked of the DOM. */
  const FOCUSABLE =
    'a[href], area[href], button, input, textarea, select, details, summary, iframe, object, embed, [contenteditable], [tabindex], [onclick]';

  beforeEach(() => {
    produceRung();
  });

  it('answers no interactive ARIA role of any kind', async () => {
    await renderRitual();
    await findSteps();
    const step = checkStep();

    const found = INTERACTIVE_ROLES.flatMap((role) =>
      within(step)
        .queryAllByRole(role, { hidden: true })
        .map(() => role),
    );

    expect(found, `step 2 offers ${found.join(', ')} — [D18] says it offers nothing`).toEqual([]);
  });

  it('holds nothing the browser would focus, and nothing with a click handler', async () => {
    await renderRitual();
    await findSteps();

    expect([...checkStep().querySelectorAll(FOCUSABLE)].map((node) => node.outerHTML)).toEqual([]);
  });

  it('is its number and its जांचो title, with nothing under them', async () => {
    await renderRitual();
    await findSteps();
    const step = checkStep();

    // #230 took the copy, the dashed plate and the caption. What is left must be the two things
    // every step wears and no hollow container behind them — an empty box is an object, and this
    // screen draws objects only where something happens.
    expect([...step.children].map((node) => node.tagName)).toEqual(['SPAN', 'H3']);
    expect(within(step).getByRole('heading').textContent).toBe(strings('ritual.stepTitle.check'));
  });

  /**
   * The one exception, and the reason it is not a reversal of #230 (#319): on the FIRST ritual of
   * an install the step says once that the checking is the learner's own, because nothing else in
   * the app ever says it — there is no onboarding ([D21]) and #230 removed the paragraph that used
   * to. It is a sentence, never a control, so the step keeps its zero interactive elements; and it
   * is gone from the second ritual onwards, which is the shape the test above describes.
   */
  it('says once, on the first ritual of an install, that the checking is the learner’s', async () => {
    localStorage.removeItem('rung:hint:check');
    await renderRitual();
    await findSteps();

    const first = checkStep();
    expect([...first.children].map((node) => node.tagName)).toEqual(['SPAN', 'H3', 'P']);
    expect(within(first).getByText(strings('hint.check'))).toBeVisible();
    // Still nothing to interact with: the hint says the app cannot check, so it offers no way to.
    expect([...first.querySelectorAll(FOCUSABLE)]).toEqual([]);

    // A second visit is the steady state again — the hint is spent, not repeated.
    cleanup();
    resetContentCache();
    resetManifestCache();
    resetStringsCache();
    await renderRitual();
    await findSteps();

    expect([...checkStep().children].map((node) => node.tagName)).toEqual(['SPAN', 'H3']);
  });
});

/* ---------------------------------------- Invariants 4 and 6: the sentence never arrives */

describe('the learner’s sentence never enters the app', () => {
  it('renders no input, textarea, select or editable node anywhere on the screen', async () => {
    produceRung();
    await renderRitual();
    await findSteps();

    expect(document.querySelectorAll('input, textarea, select, [contenteditable]')).toHaveLength(0);
  });

  /**
   * The source scan — the same shape as `shellPurity.test.ts` and `styleContract.test.ts`, and for
   * the same reason: prose cannot keep an invariant, a scan can.
   *
   * Two claims about this flow's files. **Nothing can arrive**: no field, no change or paste
   * handler, no clipboard read, no form. **Nothing can be kept**: no state cell of any kind — the
   * arc is a pure function of the course's strings and the rung's module, so there is no variable
   * anywhere in it for a sentence to live in, not even for one render.
   *
   * The second claim has exactly ONE exemption, and it is named rather than left implicit: the
   * hold control (#101) keeps how full its bar is, so `HoldToConfirm.tsx` is scanned for
   * everything above EXCEPT the state cell (`ARRIVAL`, below). That is safe for a reason that can
   * be checked rather than trusted — the cell holds a number between 0 and 1 produced by a timer,
   * there is still nothing on this screen to type into and no handler that could carry text into
   * it, and the file may not grow one without reddening this file. A hold's progress is not
   * learner content; the ban is on the sentence having somewhere to live, not on arithmetic.
   */
  const ARRIVAL = [
    { what: 'a text field', pattern: /<(input|textarea|select)\b/ },
    { what: 'an editable node', pattern: /contentEditable/ },
    { what: 'an input handler', pattern: /\bon(Change|Input|Paste|Drop|Submit)\b/ },
    { what: 'a clipboard read', pattern: /clipboard|execCommand/ },
    { what: 'a form', pattern: /<form\b|FormData/ },
    { what: 'a write to storage', pattern: /(local|session)Storage/ },
  ] as const;

  /** The arc's own extra promise: no variable at all, so not even a render can hold a sentence. */
  const KEEPING = { what: 'a place to keep it', pattern: /\buse(State|Reducer|Ref)\b/ } as const;

  const BANNED = [...ARRIVAL, KEEPING] as const;

  function scanWith(
    rules: readonly { what: string; pattern: RegExp }[],
    file: string,
    source: string,
  ): string[] {
    return source
      .split('\n')
      .flatMap((line, index) =>
        rules
          .filter(({ pattern }) => pattern.test(line))
          .map(({ what }) => `${file}:${index + 1} carries ${what}`),
      );
  }

  function scan(file: string, source: string): string[] {
    return scanWith(BANNED, file, source);
  }

  it('has no way to receive the sentence, and no variable to hold it', () => {
    const violations = scan('src/screens/RitualScreen.tsx', ritualSource);

    expect(
      violations,
      violations
        .join('\n')
        .concat(
          '\nThe 11th sentence stays on paper: the app never evaluates, grades or stores learner writing (Invariant 4), and it has no input fields (Invariant 6).',
        ),
    ).toEqual([]);
  });

  it('gives the hold control nowhere to receive one either — its state is a number', () => {
    const violations = scanWith(ARRIVAL, 'src/components/HoldToConfirm.tsx', holdSource);

    expect(
      violations,
      violations
        .join('\n')
        .concat(
          '\nThe hold keeps how full its bar is and nothing else: no field, no handler and no storage may appear beside it (Invariants 4 and 6).',
        ),
    ).toEqual([]);
    // The exemption is exactly one cell, and it is the progress: nothing is stored beside it.
    expect(holdSource.match(/=\s*useState\(/g)).toHaveLength(1);
    expect(holdSource).not.toMatch(/useReducer\(/);
  });

  it('catches a planted field, a planted handler and a planted state cell', () => {
    const planted = [
      '<input value={sentence} />',
      'onChange={(event) => setSentence(event.target.value)}',
      'const [sentence, setSentence] = useState("");',
    ].join('\n');

    expect(scan('src/screens/Planted.tsx', planted)).toHaveLength(3);
    // The hold's exemption is the state cell and only the state cell.
    expect(scanWith(ARRIVAL, 'src/components/Planted.tsx', planted)).toHaveLength(2);
  });

  it('leaves the screen’s own prose alone — the guard is about code, not about words', () => {
    const prose = ' * no state, no ref, no input fields, and nothing in storage';

    expect(scan('src/screens/Planted.tsx', prose)).toEqual([]);
  });
});

/* --------------------------------------------------------- the words and the numbers */

describe('every word is the course’s, and the numbers are this rung’s', () => {
  it('titles the three steps from the bundle, in the arc’s order', async () => {
    produceRung();
    await renderRitual();

    const steps = await findSteps();

    expect(steps.map((step) => within(step).getByRole('heading').textContent)).toEqual([
      strings('ritual.stepTitle.write'),
      strings('ritual.stepTitle.check'),
      strings('ritual.stepTitle.confirm'),
    ]);
  });

  it('interpolates the constraint from the module: this rung’s own word cap', async () => {
    produceRung(3);
    await renderRitual(ritualModule(3, 7));
    await findSteps();

    const constraint = interpolate(strings('ritual.constraint'), { maxWords: 7 });

    expect(screen.getByText(constraint)).toBeVisible();
    // The fixture's own placeholder never reaches the screen.
    expect(screen.queryByText(/\{maxWords\}/)).toBeNull();
  });

  it('names the sentence after the rung’s own, through the course’s ordinal', async () => {
    produceRung(3);
    await renderRitual(ritualModule(3, 7));
    await findSteps();

    // Three sentences taught, so the one to write is the 4th — in the course's own ordinal.
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(
      interpolate(strings('ordinal'), { n: 4 }),
    );
  });

  it('stands the hold under step 3’s title, labelled with the head’s own ordinal', async () => {
    produceRung(3);
    await renderRitual(ritualModule(3, 7));
    const [, , confirm] = await findSteps();

    expect(within(confirm!).getByRole('heading').textContent).toBe(
      strings('ritual.stepTitle.confirm'),
    );

    // The same ordinal the head renders — "the 4th" for a three-sentence rung — inside the
    // course's own hold label. The screen owns the number; the control owns the hold (#101).
    const label = interpolate(strings('ritual.confirm.holdLabel'), {
      ordinal: interpolate(strings('ordinal'), { n: 4 }),
    });

    expect(within(confirm!).getByRole('button', { name: label })).toBeVisible();
    // One control in the whole step, and nowhere to go yet: holding it is what moves the arc.
    expect(within(confirm!).getAllByRole('button')).toHaveLength(1);
    expect(within(confirm!).queryAllByRole('link')).toEqual([]);
  });

  /**
   * The arc's own end-to-end: the weight is paid on the real screen, through the real route, and
   * what it opens is part 2 itself — since #314 the paid hold navigates rather than revealing a
   * link to tap. The hold's own promises — release resets, no tap-through, reduced motion keeps
   * the duration — are `HoldToConfirm.test.tsx`'s, at the step level.
   */
  it('opens Comprehension only after the whole ~900ms is held', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    try {
      produceRung();
      await renderRitual();
      const [, , confirm] = await findSteps();
      const hold = within(confirm!).getByRole('button');

      // A tap: nothing at all, which is the acceptance criterion in one line.
      fireEvent.pointerDown(hold);
      fireEvent.pointerUp(hold);
      act(() => vi.advanceTimersByTime(HOLD_MS));
      expect(within(confirm!).queryAllByRole('link')).toEqual([]);

      fireEvent.pointerDown(hold);
      act(() => vi.advanceTimersByTime(HOLD_MS));

      expect(within(confirm!).getByText(strings('ritual.confirm.done'))).toBeVisible();
      // The ✓ is the whole of the signed state: nothing to tap, and the arc has not moved yet.
      expect(within(confirm!).queryAllByRole('link')).toEqual([]);
      expect(window.location.hash).toBe('#/ritual');

      // The badge fills off the DOM, not off a variable: the ✓ state marks itself, and the arc's
      // stylesheet reads that mark (the prototype's `s3Bg`). The screen still holds no state.
      expect(
        within(confirm!).getByText(strings('ritual.confirm.done')).closest('[data-hold]'),
      ).not.toBeNull();
      expect(ritualCss.replace(/\/\*[\s\S]*?\*\//g, '')).toMatch(
        /\.step:has\(\[data-hold='signed'\]\) \.stepNumber/,
      );

      // And then the beat carries the learner into part 2, with no second tap (#314).
      act(() => vi.advanceTimersByTime(SIGNED_BEAT_MS));
      await waitFor(() => expect(window.location.hash).toBe('#/comprehension'));
    } finally {
      vi.useRealTimers();
    }
  });

  it('renders under the shell’s back header, as a child of the rung', async () => {
    produceRung();
    await renderRitual();
    await findSteps();

    expect(screen.getByRole('button', { name: 'Back to the ladder' })).toBeVisible();
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Exit ritual');
  });
});
