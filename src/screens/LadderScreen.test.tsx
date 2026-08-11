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
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App.tsx';
import { resetContentCache } from '../course/content.ts';
import { resetManifestCache } from '../course/manifest.ts';
import { resetStringsCache } from '../course/strings.ts';
import { ladderFromLevels } from '../engine/progression.ts';
import { useAppStore } from '../state/store.ts';
import { DEV_MANIFEST, mockContentFetch } from '../test/courseManifest.ts';
import { stringValue } from '../test/courseStrings.ts';

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
    draftNote: id === 'L1' ? null : 'Draft list, pending [Q1].',
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
    expect(screen.getByRole('link', { name: 'L1 rung 1' })).toHaveAttribute(
      'href',
      '#/module/L1-M1',
    );
  });

  it('locks M2–M10 — visible, listed, and not a control anywhere', async () => {
    await renderLadder();

    expect(rows()).toHaveLength(10);
    expect(openRungs()).toEqual(['L1 rung 1']);

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

  it('shows the ownership footer, from the course bundle', async () => {
    await renderLadder();

    expect(screen.getByText(strings('ladder.ownership'))).toBeInTheDocument();
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
    expect(openRungs()).toEqual([
      'M1 · L1 rung 1what L1 rung 1 doesPASSED',
      'M2 · L1 rung 2what L1 rung 2 doesPASSED',
      'M3 · L1 rung 3what L1 rung 3 doesPASSED',
      'L1 rung 4',
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
    // No celebration beyond the sanctioned beat (#68/#103) — the footer is the last word.
    expect(screen.getByText(strings('ladder.ownership'))).toBeInTheDocument();
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
