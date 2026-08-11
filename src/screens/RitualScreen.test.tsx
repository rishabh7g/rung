/**
 * The exit ritual's arc (#100) — four promises, one describe each:
 *
 *   • **the guard**: the ritual belongs to a rung that is produced out, and to no other state,
 *   • **step 2 is guidance only**: zero interactive elements inside it, of any kind [D18],
 *   • **the learner's sentence has nowhere to arrive and nowhere to live** (Invariants 4 and 6),
 *   • **every word is the course's**, and the two numbers in it are this rung's own.
 *
 * Everything renders the real `<App />` over a mocked `fetch`, the way every screen test in this
 * repo does: `/ritual` is a guarded route reached through the app's own table, and a guard that
 * works in a hand-wired router while the table says something else is exactly the bug worth
 * catching. The strings fixture is built FROM the canonical key list, so a line reads
 * `hi-mr ritual.check.caption` — an assertion against the prototype's English would pass on a
 * hardcoded shell string, which is the one thing the strings contract exists to prevent.
 *
 * Progress is seeded the only way the app can make it: one `recordProduction` per Produce-phase
 * got-it, one `passRitual` per climbed rung. A fixture that wrote `production` directly would be
 * testing a state the app cannot reach.
 */
import { render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App.tsx';
import { resetContentCache } from '../course/content.ts';
import { resetManifestCache } from '../course/manifest.ts';
import { interpolate, resetStringsCache } from '../course/strings.ts';
import { ladderFromLevels } from '../engine/progression.ts';
import { useAppStore } from '../state/store.ts';
import { DEV_MANIFEST, mockContentFetch } from '../test/courseManifest.ts';
import { levelsFixture, moduleFixture } from '../test/courseContent.ts';
import { stringValue } from '../test/courseStrings.ts';
import ritualCss from './RitualScreen.module.css?raw';
import ritualSource from './RitualScreen.tsx?raw';

const COURSE = 'hi-mr';
/** The fixture ladder's current rung: authored, unlocked, and the only module this screen reads. */
const CURRENT = 'L1-M1';
/** Injected, so nothing here touches the wall clock — `passedAt` is a receipt, not a schedule. */
const STAMP = () => '2026-02-03T09:00:00.000Z';

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
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
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

describe('step 2 is guidance, and guidance is all it is', () => {
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

  it('says so in the course’s own words: the missing buttons are the design', async () => {
    await renderRitual();
    await findSteps();

    expect(within(checkStep()).getByText(strings('ritual.check.caption'))).toBeVisible();
  });

  it('carries the जांचो copy, the plate’s label and its two static resource rows', async () => {
    await renderRitual();
    await findSteps();
    const step = checkStep();

    for (const key of [
      'ritual.check.copy',
      'ritual.check.plateLabel',
      'ritual.check.resourcePerson',
      'ritual.check.resourceInternet',
    ]) {
      expect(within(step).getByText(strings(key)), key).toBeVisible();
    }
  });

  it('draws the plate with the one border token reserved for "outside the app"', async () => {
    await renderRitual();
    await findSteps();

    // Read off the stylesheet: jsdom resolves neither CSS modules nor custom properties, and the
    // token is the assertion — dashed is a meaning here, not a decoration (design/tokens.md §3).
    // Comments are stripped the way `styleContract.test.ts` strips them: they quote the token to
    // explain it, which is the opposite of a second use of it.
    const declarations = ritualCss.replace(/\/\*[\s\S]*?\*\//g, '');

    expect(declarations).toMatch(/\.plate\s*\{[^}]*--border-dashed-world/);
    expect(declarations.match(/--border-dashed-world/g)).toHaveLength(1);
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
   * Two claims about this flow's own file. **Nothing can arrive**: no field, no change or paste
   * handler, no clipboard read, no form. **Nothing can be kept**: no state cell of any kind — the
   * arc is a pure function of the course's strings and the rung's module, so there is no variable
   * anywhere in it for a sentence to live in, not even for one render. #101 adds the hold
   * control's own progress state in its own file, so that is a conscious edit in that diff rather
   * than a hole this one leaves open.
   */
  const BANNED = [
    { what: 'a text field', pattern: /<(input|textarea|select)\b/ },
    { what: 'an editable node', pattern: /contentEditable/ },
    { what: 'an input handler', pattern: /\bon(Change|Input|Paste|Drop|Submit)\b/ },
    { what: 'a clipboard read', pattern: /clipboard|execCommand/ },
    { what: 'a form', pattern: /<form\b|FormData/ },
    { what: 'a place to keep it', pattern: /\buse(State|Reducer|Ref)\b/ },
    { what: 'a write to storage', pattern: /(local|session)Storage/ },
  ] as const;

  function scan(file: string, source: string): string[] {
    return source
      .split('\n')
      .flatMap((line, index) =>
        BANNED.filter(({ pattern }) => pattern.test(line)).map(
          ({ what }) => `${file}:${index + 1} carries ${what}`,
        ),
      );
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

  it('catches a planted field, a planted handler and a planted state cell', () => {
    const planted = [
      '<input value={sentence} />',
      'onChange={(event) => setSentence(event.target.value)}',
      'const [sentence, setSentence] = useState("");',
    ].join('\n');

    expect(scan('src/screens/Planted.tsx', planted)).toHaveLength(3);
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

  it('interpolates the constraint from the module: how many sentences, and the word cap', async () => {
    produceRung(3);
    await renderRitual(ritualModule(3, 7));
    await findSteps();

    const constraint = interpolate(strings('ritual.constraint'), {
      sentenceCount: 3,
      maxWords: 7,
    });

    expect(screen.getByText(constraint)).toBeVisible();
    // The fixture's own placeholders never reach the screen.
    expect(screen.queryByText(/\{sentenceCount\}|\{maxWords\}/)).toBeNull();
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

  it('leaves step 3 to #101: its title, and no control standing in for the hold', async () => {
    produceRung();
    await renderRitual();
    const [, , confirm] = await findSteps();

    expect(within(confirm!).getByRole('heading').textContent).toBe(
      strings('ritual.stepTitle.confirm'),
    );
    expect(within(confirm!).queryAllByRole('button', { hidden: true })).toEqual([]);
  });

  it('renders under the shell’s back header, as a child of the rung', async () => {
    produceRung();
    await renderRitual();
    await findSteps();

    expect(screen.getByRole('button', { name: 'Back to the ladder' })).toBeVisible();
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Exit ritual');
  });
});
