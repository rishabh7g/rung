/**
 * The Ladder (#86) — the home screen's four promises, one describe each:
 *
 *   • a fresh install shows one climbable rung and nine that are genuinely not,
 *   • a mid-journey ladder shows the climb behind it and opens every passed rung,
 *   • a finished ladder goes quiet rather than celebrating,
 *   • and every number on it is a count — no `%`, no clock, no streak (Invariant 2).
 *
 * Everything renders the real `<App />` over a mocked `fetch`, the way every boot test in this
 * repo does: the screen is reached through the app's own route table, so a Ladder that renders
 * beautifully somewhere the router does not point cannot pass. Progress is seeded through
 * `passRitual` rather than written into the store, because that is the only way a module can
 * become passed (Invariant 1) — a fixture that wrote `modules` directly would be testing a state
 * the app cannot reach.
 *
 * The ladder itself is ten rungs per level (the product's shape) rather than the trimmed
 * `levelsFixture`, because "M2–M10 are locked" is the assertion.
 */
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App.tsx';
import { resetContentCache } from '../course/content.ts';
import { resetManifestCache } from '../course/manifest.ts';
import { resetStringsCache } from '../course/strings.ts';
import { ladderFromLevels } from '../engine/progression.ts';
import { justPassed, passedRung } from '../shell/routes.tsx';
import { useAppStore } from '../state/store.ts';
import { DEV_MANIFEST, mockContentFetch } from '../test/courseManifest.ts';
import { stringValue } from '../test/courseStrings.ts';
import beatCss from './ladder/unlockBeat.module.css?raw';

/* ------------------------------------------------------------------ the ladder */

const COURSE = 'hi-mr';
/** Injected, so nothing here touches the wall clock — `passedAt` is a receipt, not a schedule. */
const STAMP = () => '2026-02-03T09:00:00.000Z';

/** One level of ten rungs, ids and titles derived from its position so a failure reads itself. */
function level(id: string, name: string, tagline: string, authored: number) {
  return {
    id,
    name,
    tagline,
    draft: id !== 'L1',
    draftNote: id === 'L1' ? null : 'Draft list — nothing here is authored.',
    modules: Array.from({ length: 10 }, (_, index) => ({
      id: `${id}-M${index + 1}`,
      title: `${id} rung ${index + 1}`,
      job: `what ${id} rung ${index + 1} does`,
      hasContent: index < authored,
    })),
  };
}

/** The product's shape: 3 levels × 10 modules, two of L1's authored (as hi-mr ships today). */
function tenRungLadder(courseId = COURSE) {
  return {
    courseId,
    levels: [
      level('L1', 'Foundations', 'say what you need', 2),
      level('L2', 'Conversations', 'hold your own', 0),
      level('L3', 'Fluency', 'stories & opinions', 0),
    ],
  };
}

/**
 * Seeds production the only way the app can: one `recordProduction` per Read-phase got-it, in the
 * order the learner would have marked them. One per sentence is what opens the exit ritual (#349).
 */
function produce(...sentenceIds: string[]): void {
  const store = useAppStore.getState();
  store.ensureCourse(COURSE);
  for (const sentenceId of sentenceIds) store.recordProduction(COURSE, sentenceId);
}

/** Seeds progress the only way the app can make it: one exit ritual per rung, in order. */
function climb(...moduleIds: string[]): void {
  const store = useAppStore.getState();
  store.ensureCourse(COURSE);
  store.setLadder(COURSE, ladderFromLevels(tenRungLadder().levels));
  for (const moduleId of moduleIds) store.passRitual(COURSE, moduleId, STAMP);
}

/** Renders the app on the Ladder and waits for the ladder itself to arrive. */
async function renderLadder() {
  mockContentFetch(DEV_MANIFEST, undefined, { levels: tenRungLadder() });
  render(<App />);
  await screen.findByRole('list');
}

/* ------------------------------------------------------------------ the queries */

/** The rung rows, in ladder order. */
function rows(): HTMLElement[] {
  return within(screen.getByRole('list')).getAllByRole('listitem');
}

/**
 * Which marker a row is wearing, read off the drawing rather than off a hashed class name:
 * passed is a filled disc with a check, current is the crosshair, locked is a bare ring [D16].
 */
function marker(row: HTMLElement): string {
  const svg = row.querySelector('svg');
  if (svg === null) return 'none';
  const circles = svg.querySelectorAll('circle').length;
  const paths = svg.querySelectorAll('path').length;
  if (circles === 1 && paths === 1) return 'passed';
  if (circles === 0 && paths === 1) return 'current';
  if (circles === 1 && paths === 0) return 'locked';
  return 'unknown';
}

function markers(): string[] {
  return rows().map(marker);
}

/** Every link inside the rung list — the rungs the learner can actually open. */
function openRungs(): string[] {
  return within(screen.getByRole('list'))
    .queryAllByRole('link')
    .map((link) => link.textContent ?? '');
}

function strings(key: string): string {
  return stringValue(COURSE, key);
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
  window.location.hash = '';
});

/* -------------------------------------------------------------------- fresh */

describe('a fresh install', () => {
  it('hands the store the course ladder it has no other way to get', async () => {
    await renderLadder();

    await waitFor(() => {
      expect(useAppStore.getState().ladders[COURSE]).toHaveLength(3);
    });
    expect(useAppStore.getState().ladders[COURSE]?.[0]?.moduleIds).toHaveLength(10);
  });

  it('makes M1 the current rung and the dominant object on the screen', async () => {
    await renderLadder();

    expect(screen.getByText('M1 · CURRENT RUNG')).toBeInTheDocument();
    // The only heading below the shell's wordmark: the rung the learner is on.
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('L1 rung 1');
    expect(screen.getByText('what L1 rung 1 does')).toBeInTheDocument();
    // The card's primary CTA is the way into the rung — the title stopped being a link with #87.
    expect(screen.getByRole('link', { name: strings('rungCard.startModule') })).toHaveAttribute(
      'href',
      '#/module/L1-M1',
    );
  });

  it('locks M2–M10 — visible, listed, and not a control anywhere', async () => {
    await renderLadder();

    expect(rows()).toHaveLength(10);
    expect(openRungs()).toEqual([strings('rungCard.startModule')]);

    for (let rung = 2; rung <= 10; rung += 1) {
      const title = `L1 rung ${rung}`;
      expect(screen.getByText(title)).toBeInTheDocument();
      expect(screen.queryByRole('link', { name: new RegExp(title) })).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: new RegExp(title) })).not.toBeInTheDocument();
    }

    // Nothing focusable smuggled in either: a locked rung has no tabindex and no handler.
    for (const row of rows().slice(1)) {
      expect(row).not.toHaveAttribute('tabindex');
      expect(row).not.toHaveAttribute('role');
    }
  });

  it('draws the [D16] marker each state owns', async () => {
    await renderLadder();

    expect(markers()).toEqual(['current', ...Array<string>(9).fill('locked')]);
  });

  it('reads LEVEL 1 · 0 OF 10 and closes with the course’s own pending line', async () => {
    await renderLadder();

    expect(screen.getByText(/LEVEL 1 · 0 OF 10/)).toBeInTheDocument();
    expect(
      screen.getByText(
        strings('ladder.pendingLine')
          .replace('{level}', '1')
          .replace('{remaining}', '10')
          .replace('{total}', '10'),
      ),
    ).toBeInTheDocument();
  });

  /**
   * #350: the home screen names what the learner is learning, in the course's own words.
   *
   * The assertion is against the FIXTURE's value (`hi-mr ladder.learning`), which is the whole
   * point of the shared strings fixture: an assertion against "Marathi" would pass just as well
   * on a shell that hardcoded the manifest's English `l2`, and that is exactly the thing this
   * key exists to prevent.
   */
  it('names what the learner is learning, in the course’s own words', async () => {
    await renderLadder();

    const learning = screen.getByText(strings('ladder.learning'));
    expect(learning).toBeInTheDocument();
    expect(learning).toHaveAttribute('dir', 'ltr');
  });

  it('seals Levels 2 and 3, and only they are tappable', async () => {
    await renderLadder();

    expect(screen.getByText('Foundations — say what you need')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /LEVEL 2/ })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /LEVEL 3/ })).toBeInTheDocument();
    // The active cell is where the learner already is: a control with nothing to do is not one.
    expect(screen.queryByRole('button', { name: /LEVEL 1/ })).not.toBeInTheDocument();
  });

  it('answers a sealed cell with an honest count, not a lecture', async () => {
    await renderLadder();

    fireEvent.click(screen.getByRole('button', { name: /LEVEL 2/ }));

    const toast = await screen.findByRole('status');
    // Level 2, and the ten rungs of Level 1 that are still in the way.
    expect(toast).toHaveTextContent(
      strings('ladder.sealedToast').replace('{level}', '2').replace('{remaining}', '10'),
    );
  });
});

/* -------------------------------------------------------------- mid-journey */

describe('mid-journey — three rungs climbed', () => {
  beforeEach(() => {
    climb('L1-M1', 'L1-M2', 'L1-M3');
  });

  it('moves the current rung to M4 and opens every rung behind it', async () => {
    await renderLadder();

    expect(screen.getByText('M4 · CURRENT RUNG')).toBeInTheDocument();
    // M4's module is not authored in this ladder, so its card is the pending stage: no CTA and
    // no note, so the only links in the list are the rungs already passed [D22].
    expect(openRungs()).toEqual([
      'M1 · L1 rung 1what L1 rung 1 doesPASSED',
      'M2 · L1 rung 2what L1 rung 2 doesPASSED',
      'M3 · L1 rung 3what L1 rung 3 doesPASSED',
    ]);
    expect(screen.getByRole('link', { name: /L1 rung 2/ })).toHaveAttribute(
      'href',
      '#/module/L1-M2',
    );
  });

  it('checks off the climbed rungs and leaves the rest hollow', async () => {
    await renderLadder();

    expect(markers()).toEqual([
      'passed',
      'passed',
      'passed',
      'current',
      ...Array<string>(6).fill('locked'),
    ]);
  });

  it('counts in the header and the pending line — 3 of 10, 7 to go', async () => {
    await renderLadder();

    expect(screen.getByText(/LEVEL 1 · 3 OF 10/)).toBeInTheDocument();
    expect(
      screen.getByText(
        strings('ladder.pendingLine')
          .replace('{level}', '1')
          .replace('{remaining}', '7')
          .replace('{total}', '10'),
      ),
    ).toBeInTheDocument();
  });

  it('keeps Level 2 sealed until every rung below it is climbed, and says how many', async () => {
    await renderLadder();

    fireEvent.click(screen.getByRole('button', { name: /LEVEL 2/ }));

    expect(await screen.findByRole('status')).toHaveTextContent(
      strings('ladder.sealedToast').replace('{level}', '2').replace('{remaining}', '7'),
    );
  });
});

/* --------------------------------------------------------- the staged rung card */

/**
 * [D22] on the real screen (#87): which stage the card is in, and the promise under all four —
 * **the stage guides, it never gates**. The Practice tab is asserted per stage, because a card
 * that made Practice unreachable would be a phase gate wearing a CTA's clothes.
 *
 * All four stages are reached through `<App />` now (#95): `exit_ready` used to need an injected
 * predicate, and needs nothing of the kind since the counters exist — the case below produces the
 * rung's sentences out through `recordProduction`, the same action a Produce got-it calls, and the
 * card follows. The card's own four-stage table is `ladder/RungCard.test.tsx`.
 */
describe('the staged rung card [D22]', () => {
  /** The tab that must survive every stage. */
  function practiceTab(): HTMLElement {
    return within(screen.getByRole('navigation')).getByRole('link', { name: 'Practice' });
  }

  it('opens fresh: one action into the module, and nothing beside it', async () => {
    await renderLadder();

    expect(screen.getByRole('link', { name: strings('rungCard.startModule') })).toHaveAttribute(
      'href',
      '#/module/L1-M1',
    );
    expect(screen.queryByText(strings('rungCard.practice'))).not.toBeInTheDocument();
    expect(screen.queryByText(strings('rungCard.exitRitual'))).not.toBeInTheDocument();
  });

  it('flips to Practice the moment the module is opened — markStudied, no reload', async () => {
    await renderLadder();
    expect(screen.getByText(strings('rungCard.startModule'))).toBeInTheDocument();

    // What #88's module screen fires on first open. Nothing about the card is stored, so the
    // stage moves with the flag the engine reads.
    act(() => {
      useAppStore.getState().markStudied(COURSE, 'L1-M1');
    });

    expect(screen.getByRole('link', { name: strings('rungCard.practice') })).toHaveAttribute(
      'href',
      '#/practice',
    );
    expect(screen.getByRole('link', { name: strings('rungCard.revisitModule') })).toHaveAttribute(
      'href',
      '#/module/L1-M1',
    );
    expect(screen.queryByText(strings('rungCard.startModule'))).not.toBeInTheDocument();
  });

  it('offers the exit ritual once every sentence is produced twice — the real counters', async () => {
    useAppStore.getState().markStudied(COURSE, 'L1-M1');
    produce('L1-M1-S01', 'L1-M1-S02', 'L1-M1-S01', 'L1-M1-S02');

    await renderLadder();

    // The rung's module has to load before the card can know its sentences, so this is a find.
    expect(
      await screen.findByRole('link', { name: strings('rungCard.exitRitual') }),
    ).toHaveAttribute('href', '#/ritual');
    // Practice and Module drop to secondary — quieter, never gone.
    expect(screen.getByRole('link', { name: strings('rungCard.practice') })).toHaveAttribute(
      'href',
      '#/practice',
    );
    expect(screen.getByRole('link', { name: strings('rungCard.module') })).toHaveAttribute(
      'href',
      '#/module/L1-M1',
    );
  });

  it('holds the ritual back while one sentence is a got-it short', async () => {
    useAppStore.getState().markStudied(COURSE, 'L1-M1');
    // One of the module's two sentences marked, the other not — nine-of-ten at the fixture's scale.
    produce('L1-M1-S01', 'L1-M1-S01');

    await renderLadder();
    await screen.findByRole('link', { name: strings('rungCard.practice') });

    expect(screen.queryByText(strings('rungCard.exitRitual'))).not.toBeInTheDocument();

    // …and the got-it that finishes it opens the ritual, with no reload: the stage is derived.
    act(() => {
      useAppStore.getState().recordProduction(COURSE, 'L1-M1-S02');
    });

    expect(screen.getByRole('link', { name: strings('rungCard.exitRitual') })).toBeInTheDocument();
  });

  it('answers a rung with no module yet with the rung, and nothing else', async () => {
    climb('L1-M1', 'L1-M2');
    await renderLadder();

    expect(screen.getByText('M3 · CURRENT RUNG')).toBeInTheDocument();
    // The card offers no CTA and no explanation: the two links in the list are the passed rungs.
    expect(openRungs()).toEqual([
      'M1 · L1 rung 1what L1 rung 1 doesPASSED',
      'M2 · L1 rung 2what L1 rung 2 doesPASSED',
    ]);
    // There is nothing behind this rung to open, so nothing offers to open it.
    expect(screen.queryAllByRole('link').map((link) => link.getAttribute('href'))).not.toContain(
      '#/module/L1-M3',
    );
  });

  /** The invariant, per stage: phases guide, never gate. */
  it.each([
    ['fresh', [] as string[], false],
    ['studied', [] as string[], true],
    ['pending', ['L1-M1', 'L1-M2'], false],
  ])('leaves the Practice tab exactly where it was — %s', async (_stage, climbed, studied) => {
    if (climbed.length > 0) climb(...climbed);
    await renderLadder();
    if (studied) {
      act(() => {
        useAppStore.getState().markStudied(COURSE, 'L1-M1');
      });
    }

    expect(practiceTab()).toHaveAttribute('href', '#/practice');
  });
});

/* -------------------------------------------------------------- the unlock beat */

/**
 * The product's one celebration (#103; PRD-design §3.6, §9, §12.3 [Q4]) — and the whole of what
 * keeps it to one moment.
 *
 * The Verdict's "climb to the ladder" carries a one-shot flag naming the rung it just passed
 * (`passedRung`, `shell/routes.tsx`); the Ladder plays the beat on what that pass OPENED and
 * spends the flag as it lands. `VerdictScreen.test.tsx` walks the whole loop through the real
 * ritual; these cases are about where the beat lands and where it does not, which needs a ten-rung
 * ladder and a level boundary rather than a ~900ms hold.
 *
 * The handles are `data-beat` attributes rather than class names, because a CSS-module class is a
 * hash — and the same two attributes are what a live walk in a browser reads.
 */
describe('the unlock beat', () => {
  /** Arrives on the Ladder the way the Verdict does: one navigation carrying the flag. */
  async function arriveAfterPassing(moduleId: string) {
    window.location.hash = '#/';
    window.history.replaceState({ usr: passedRung(moduleId), key: 'seed', idx: 0 }, '');
    await renderLadder();
  }

  function beats(): string[] {
    return [...document.querySelectorAll('[data-beat]')].map(
      (node) => node.getAttribute('data-beat') ?? '',
    );
  }

  it('plays on the rung the pass opened, and on nothing else', async () => {
    climb('L1-M1');
    await arriveAfterPassing('L1-M1');

    expect(beats()).toEqual(['rung']);
    // On the card of the rung that is now current — not on the one that was just passed.
    expect(document.querySelector('[data-beat="rung"]')?.textContent).toContain(
      'M2 · CURRENT RUNG',
    );
  });

  it('does not play on an ordinary visit — no flag, no beat', async () => {
    climb('L1-M1');
    await renderLadder();

    expect(beats()).toEqual([]);
  });

  it('spends the flag on arrival, and never plays again on that entry', async () => {
    climb('L1-M1');
    await arriveAfterPassing('L1-M1');

    // The entry the screen is standing on no longer carries it: a reload has nothing to replay.
    await waitFor(() =>
      expect(justPassed((window.history.state as { usr?: unknown } | null)?.usr)).toBeNull(),
    );
    // And the beat is still up — spending the flag does not take back the celebration.
    expect(beats()).toEqual(['rung']);
  });

  it('is over by the next visit: leave the Ladder and come back, and nothing beats', async () => {
    climb('L1-M1');
    await arriveAfterPassing('L1-M1');
    expect(beats()).toEqual(['rung']);

    fireEvent.click(screen.getByRole('link', { name: 'Practice' }));
    await screen.findByText(strings('practice.hubTitle'));
    fireEvent.click(screen.getByRole('link', { name: 'Ladder' }));
    await screen.findByText('M2 · CURRENT RUNG');

    expect(beats()).toEqual([]);
  });

  /**
   * The seal rule made a moment (PRD-design §5, §12.3 [Q4]): a level unlocks only when EVERY
   * module of the previous one is passed, so the tenth pass is the one that unseals — and the
   * recommendation is the rung's own beat, on the level cell and on its first rung.
   */
  it('adds the level cell at exactly 10 of 10 — the pass that unsealed it', async () => {
    climb(...Array.from({ length: 10 }, (_, index) => `L1-M${index + 1}`));
    await arriveAfterPassing('L1-M10');

    expect(beats().sort()).toEqual(['level', 'rung']);
    expect(document.querySelector('[data-beat="level"]')?.textContent).toContain('LEVEL 2');
    expect(document.querySelector('[data-beat="rung"]')?.textContent).toContain(
      'M1 · CURRENT RUNG',
    );
  });

  it('does not touch the strip at nine of ten — the level below is not complete', async () => {
    climb(...Array.from({ length: 9 }, (_, index) => `L1-M${index + 1}`));
    await arriveAfterPassing('L1-M9');

    expect(beats()).toEqual(['rung']);
    expect(screen.getByText(/LEVEL 1 · 9 OF 10/)).toBeInTheDocument();
  });

  it('stays quiet on a ladder with nothing left to open', async () => {
    const all = ['L1', 'L2', 'L3'].flatMap((id) =>
      Array.from({ length: 10 }, (_, index) => `${id}-M${index + 1}`),
    );
    climb(...all);
    await arriveAfterPassing('L3-M10');

    // Nothing opened, so nothing beats: the completion state is quiet (PRD-design §3.6).
    expect(beats()).toEqual([]);
  });

  /**
   * The motion itself, read out of the stylesheet — jsdom runs no animation, and the values are
   * the design's rather than this file's: 1000ms `--motion-unlock`, cubic-bezier(.2,.7,.3,1),
   * ONCE, with a 10px settle off the space scale (design/tokens.md §5).
   */
  describe('the movement', () => {
    it('is the design’s duration, easing and single iteration', () => {
      const rule = /\.beat \{([\s\S]*?)\n\}/.exec(beatCss)?.[1] ?? '';

      expect(rule).toContain('var(--motion-unlock)');
      expect(rule).toContain('cubic-bezier(0.2, 0.7, 0.3, 1)');
      // No `infinite`, no iteration count at all: one beat is the whole point.
      expect(rule).not.toMatch(/infinite|iteration-count/);
      expect(beatCss).toContain('var(--color-accent-200)');
      expect(beatCss).toContain('translateY(var(--space-3))');
    });

    it('collapses under prefers-reduced-motion — the loudest movement is the first to go', () => {
      const reduced = /@media \(prefers-reduced-motion: reduce\) \{([\s\S]*)\n\}/.exec(
        beatCss,
      )?.[1];

      expect(reduced).toBeDefined();
      expect(reduced).toContain('animation: none');
    });
  });
});

/* ------------------------------------------------------------ the whole ladder */

describe('a finished ladder', () => {
  beforeEach(() => {
    const all = ['L1', 'L2', 'L3'].flatMap((id) =>
      Array.from({ length: 10 }, (_, index) => `${id}-M${index + 1}`),
    );
    climb(...all);
  });

  it('goes quiet: the last level, every rung passed, no current rung and no pending line', async () => {
    await renderLadder();

    expect(screen.getByText(/LEVEL 3 · 10 OF 10/)).toBeInTheDocument();
    expect(markers()).toEqual(Array<string>(10).fill('passed'));
    expect(screen.queryByText(/CURRENT RUNG/)).not.toBeInTheDocument();
    expect(screen.queryByText(/ladder\.pendingLine/)).not.toBeInTheDocument();
  });

  it('unseals every level: no cell is a control any more', async () => {
    await renderLadder();

    expect(screen.queryAllByRole('button')).toEqual([]);
  });
});

/* ---------------------------------------------------------------- invariants */

describe('counts, never time', () => {
  it.each([
    ['fresh', [] as string[]],
    ['mid-journey', ['L1-M1', 'L1-M2', 'L1-M3']],
  ])('renders no percentage and no calendar word — %s', async (_name, climbed) => {
    if (climbed.length > 0) climb(...climbed);
    await renderLadder();

    const text = screen.getByRole('main').textContent ?? '';

    expect(text).not.toMatch(/%/);
    expect(text).not.toMatch(
      /\b(streak|day|days|week|weeks|month|today|tomorrow|yesterday|minute|hour|goal|due)\b/i,
    );
    // Nothing that looks like a date or a clock either.
    expect(text).not.toMatch(/\d{4}-\d{2}-\d{2}|\d{1,2}:\d{2}/);
  });
});
