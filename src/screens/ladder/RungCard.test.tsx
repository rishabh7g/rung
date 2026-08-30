/**
 * The staged rung card [D22] (#87) — four stages, and the promise that each one offers exactly
 * its own CTA set and none of the other three's.
 *
 * The assertion that matters is the NEGATIVE one: a stage is only "one clear action" if the other
 * stages' actions are absent, so every case compares the card's whole link list rather than
 * checking that a button it wants is somewhere on screen. Every stage — `exit_ready` included, now
 * that the production counters decide it (#95) — is reached on the real screen in
 * `LadderScreen.test.tsx`; this file renders the component directly to hold it to its four CTA
 * sets, one stage at a time, with nothing else on screen to read them off.
 *
 * Strings come from the shared fixture, built FROM the canonical key list, so a label reads
 * `hi-mr rungCard.practice`: an assertion against a prototype literal would pass on a hardcoded
 * shell string, which is the one thing the strings contract exists to prevent.
 */
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect, it } from 'vitest';
import { interpolate, StringsContext, type Strings } from '../../course/strings.ts';
import { STRINGS_KEYS } from '../../course/stringsKeys.ts';
import type { RungStage } from '../../engine/progression.ts';
import { stringValue } from '../../test/courseStrings.ts';
import { RungCard } from './RungCard.tsx';

const COURSE = 'hi-mr';
const MODULE = 'L1-M3';
const MODULE_PATH = `/module/${MODULE}`;

const STRINGS = Object.fromEntries(
  STRINGS_KEYS.map((key) => [key, stringValue(COURSE, key)]),
) as Strings;

/** What the card's copy says for a key — the fixture's self-identifying value. */
function copy(key: string): string {
  return stringValue(COURSE, key);
}

/** Every label the four stages can offer, so each case can prove the other stages' are absent. */
const EVERY_LABEL = [
  'rungCard.startModule',
  'rungCard.practice',
  'rungCard.revisitModule',
  'rungCard.exitRitual',
  'rungCard.module',
] as const;

function renderCard(stage: RungStage, production?: readonly number[]) {
  return render(
    <MemoryRouter>
      <StringsContext.Provider value={STRINGS}>
        <RungCard
          stage={stage}
          moduleId={MODULE}
          title="Needs and wants"
          job="Say what you want"
          production={production}
        />
      </StringsContext.Provider>
    </MemoryRouter>,
  );
}

/** The card's controls, in document order: label and where it goes — none, on a pending rung. */
function ctas(): [string, string][] {
  return screen
    .queryAllByRole('link')
    .map((link) => [link.textContent ?? '', link.getAttribute('href') ?? '']);
}

/* ------------------------------------------------------------------ the stages */

interface StageCase {
  stage: RungStage;
  ctas: [string, string][];
}

const STAGES: StageCase[] = [
  { stage: 'fresh', ctas: [['rungCard.startModule', MODULE_PATH]] },
  {
    stage: 'studied',
    ctas: [
      ['rungCard.practice', '/practice'],
      ['rungCard.revisitModule', MODULE_PATH],
    ],
  },
  {
    stage: 'exit_ready',
    ctas: [
      ['rungCard.exitRitual', '/ritual'],
      ['rungCard.practice', '/practice'],
      ['rungCard.module', MODULE_PATH],
    ],
  },
  /* An unauthored rung offers nothing and explains nothing: the empty set is the assertion. */
  { stage: 'pending', ctas: [] },
];

describe.each(STAGES)('the $stage stage', ({ stage, ctas: expected }) => {
  it('offers exactly its own CTA set, in order, each pointing where [D22] says', () => {
    renderCard(stage);

    expect(ctas()).toEqual(expected.map(([key, href]) => [copy(key), href]));
  });

  it('renders none of the other stages’ copy', () => {
    renderCard(stage);

    const mine = new Set(expected.map(([key]) => key));
    for (const key of EVERY_LABEL) {
      if (mine.has(key)) continue;
      expect(screen.queryByText(copy(key)), key).not.toBeInTheDocument();
    }
  });

  it('is still the rung’s card: kicker, title and job', () => {
    renderCard(stage);

    expect(
      screen.getByText(interpolate(copy('rungCard.currentRung'), { rung: 'M3' })),
    ).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe('Needs and wants');
    expect(screen.getByText('Say what you want')).toBeInTheDocument();
  });

  /* The blueprint grammar: registration marks are "never dropped" (design/tokens.md §7 rule 3). */
  it('wears the four + registration marks, one per corner', () => {
    const { container } = renderCard(stage);

    const marks = [...container.querySelectorAll('svg')];

    expect(marks).toHaveLength(4);
    expect(
      marks.every((mark) => mark.querySelector('path')?.getAttribute('d') === 'M8 0v16M0 8h16'),
    ).toBe(true);
    // Four different corner classes — one mark drawn four times in the same place is not a frame.
    expect(new Set(marks.map((mark) => mark.getAttribute('class'))).size).toBe(4);
  });
});

/* ------------------------------------------------------------- the writes, drawn (§6.1) */

describe('the production dots row', () => {
  it('draws one dot per sentence off the counters, and a counts-only line', () => {
    const { container } = renderCard('studied', [2, 2, 1, 0, 5]);

    // Five sentences = five squares; a count above one draws the same full dot (#88's component,
    // one apiece since #349).
    const squares = [...container.querySelectorAll('[data-state]')];
    expect(squares).toHaveLength(5);
    expect(squares.filter((square) => square.getAttribute('data-state') === 'done')).toHaveLength(
      4,
    );

    // Counts only — clamped, so the line and the dots never disagree; no note, no English.
    expect(screen.getByText('4 / 5')).toBeInTheDocument();
  });

  it('is a drawing, not an announcement: every dot is aria-hidden', () => {
    const { container } = renderCard('studied', [1, 0]);

    for (const pair of container.querySelectorAll('[data-state]')) {
      expect(pair.parentElement?.getAttribute('aria-hidden')).toBe('true');
    }
  });

  it('is absent while the sentences are unknown — a pending rung has nothing to count', () => {
    const { container } = renderCard('pending');

    expect(container.querySelector('[data-state]')).toBeNull();
    expect(container.textContent).not.toContain(' / ');
  });
});

/* ------------------------------------------------------------------- the copy */

describe('the labels', () => {
  it('every one of them comes from the course bundle', () => {
    for (const { stage, ctas: expected } of STAGES) {
      const { unmount } = renderCard(stage);

      for (const key of expected.map(([key]) => key)) {
        expect(screen.getByText(copy(key)), `${stage}: ${key}`).toBeInTheDocument();
      }
      unmount();
    }
  });

  /**
   * The mechanical half. The prototype's English is in `design/`, and a copy of it in this
   * component would render for a Hindi learner too — so no stage may put the prototype's words on
   * screen while the bundle says something else. `strings.json` is the only place a learner-facing
   * word may live (PRD §4): `src/shellPurity.test.ts` guards the script, this guards the sentence.
   */
  it('never put the prototype’s English on screen — the shell has no copy of its own', () => {
    for (const { stage } of STAGES) {
      const { container, unmount } = renderCard(stage);
      const rendered = container.textContent ?? '';

      for (const label of [
        'Start with the module',
        'revisit the module',
        'Exit ritual — open',
        'practice earlier rungs',
      ]) {
        expect(rendered, `${stage}: ${label}`).not.toContain(label);
      }
      unmount();
    }
  });
});
