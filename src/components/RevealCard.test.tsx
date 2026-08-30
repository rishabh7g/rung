/**
 * The reveal card (#93, #313) — the six promises the make-or-break interaction makes:
 *
 *   • cue → reveal → mark, and **the mark is the last tap**: no Next exists in any state, which
 *     is asserted as an absence of buttons rather than as a `disabled` attribute,
 *   • nothing is preselected: a revealed card offers two segments and lights neither,
 *   • the card writes nothing (Invariant 4) — one `onResult` per card when the commit window
 *     elapses, carrying the mark the learner settled on, and no storage of any kind underneath it,
 *   • there is no input element anywhere in the tree, in any state (Invariant 6),
 *   • the romanized courses' quiet `script` line renders under the answer, and a native course's
 *     card has no such line at all,
 *   • the reveal is the motion, and `prefers-reduced-motion` collapses it (design/tokens.md §5).
 *
 * The component renders directly rather than through `<App />`: no screen mounts it yet — the
 * session that does is #96 — and every promise above is the card's own. Strings come from the
 * shared fixture, built FROM the canonical key list, so a label reads `hi-mr mark.next`: an
 * assertion against the prototype's "Next" would pass on a hardcoded shell string, which is the
 * one thing the strings contract exists to prevent.
 */
import { act, fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { StringsContext, type Strings } from '../course/strings.ts';
import { STRINGS_KEYS } from '../course/stringsKeys.ts';
import { moduleFixture, romanizedModuleFixture } from '../test/courseContent.ts';
import { stringValue } from '../test/courseStrings.ts';
import { RevealCard } from './RevealCard.tsx';
import { COMMIT_WINDOW_MS } from './useCommitWindow.ts';
import cardCss from './RevealCard.module.css?raw';
import cardSource from './RevealCard.tsx?raw';
import markSource from './SelfMark.tsx?raw';

const COURSE = 'hi-mr';

/**
 * The show-once recall hint (#319) is deliberately NOT part of these tests: it renders on the
 * first cue of an install and never again, so leaving it live would make every assertion below
 * depend on which test ran first. `localStorage` is seeded as "already seen", and the hint has
 * tests of its own (`src/shell/useHint.test.tsx`).
 */
beforeEach(() => {
  localStorage.setItem('rung:hint:recall', '1');
  vi.useFakeTimers({ shouldAdvanceTime: true });
});

afterEach(() => {
  vi.useRealTimers();
  localStorage.clear();
});

/** Let the commit window elapse — the moment a mark becomes a result. */
function settle(): void {
  act(() => {
    vi.advanceTimersByTime(COMMIT_WINDOW_MS);
  });
}

const STRINGS = Object.fromEntries(
  STRINGS_KEYS.map((key) => [key, stringValue(COURSE, key)]),
) as Strings;

/** A native-script course's sentence: a cue, an answer, and no `script` line. */
const NATIVE = moduleFixture().sentences[0]!;
/** A romanized course's (en-ar): the romanization is the answer, the script rides along quietly. */
const ROMANIZED = romanizedModuleFixture().sentences[0]!;

/** What the fixture bundle says for a key — the self-identifying value an assertion reads. */
function copy(key: string): string {
  return stringValue(COURSE, key);
}

interface RenderOptions {
  script?: string;
  why?: ReactNode;
  sentenceId?: string;
}

function renderCard({ script, why, sentenceId }: RenderOptions = {}) {
  const onResult = vi.fn();
  const view = render(
    <StringsContext.Provider value={STRINGS}>
      <RevealCard
        sentenceId={sentenceId ?? NATIVE.id}
        cue={NATIVE.cue}
        display={NATIVE.display}
        script={script}
        why={why}
        onResult={onResult}
      />
    </StringsContext.Provider>,
  );

  return { ...view, onResult };
}

function reveal(): void {
  fireEvent.click(screen.getByRole('button', { name: copy('revealLabel') }));
}

function mark(which: 'mark.gotIt' | 'mark.missed'): void {
  fireEvent.click(screen.getByRole('button', { name: copy(which) }));
}

/**
 * The stylesheet's rules as `[selector, declarations]` — comments and at-rule blocks stripped, so
 * the keyframes' steps and the reduced-motion override do not read as rules of their own.
 */
function rules(): [string, string][] {
  const source = cardCss
    .replace(/\/\*[\s\S]*?\*\//g, '')
    .replace(/@(?:media|keyframes)[^{]*\{[\s\S]*?\n\}/g, '');

  return [...source.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((rule) => [
    (rule[1] ?? '').trim(),
    rule[2] ?? '',
  ]);
}

/* ------------------------------------------------------------------ the three states */

describe('the cue state', () => {
  it('asks for the recall first: the cue, and one way forward', () => {
    renderCard();

    expect(screen.getByText(copy('cueLabel'))).toBeInTheDocument();
    expect(screen.getByText(NATIVE.cue)).toBeInTheDocument();
    expect(screen.getAllByRole('button').map((button) => button.textContent)).toEqual([
      copy('revealLabel'),
    ]);
  });

  it('shows nothing of the answer — that is the whole point of the state', () => {
    renderCard();

    expect(screen.queryByText(NATIVE.display)).not.toBeInTheDocument();
    expect(screen.queryByText(copy('mark.gotIt'))).not.toBeInTheDocument();
  });
});

describe('the revealed state', () => {
  it('shows the answer and offers the mark, with neither segment chosen', () => {
    renderCard();
    reveal();

    expect(screen.getByText(NATIVE.display)).toBeInTheDocument();
    expect(
      screen
        .getAllByRole('button')
        .map((button) => [button.textContent, button.getAttribute('aria-pressed')]),
    ).toEqual([
      [copy('mark.gotIt'), 'false'],
      [copy('mark.missed'), 'false'],
    ]);
  });

  it('keeps the cue on screen — the learner is comparing, not being tested', () => {
    renderCard();
    reveal();

    expect(screen.getByText(NATIVE.cue)).toBeInTheDocument();
    expect(screen.queryByText(copy('revealLabel'))).not.toBeInTheDocument();
  });

  /**
   * [D11] asked for a Next that was absent rather than disabled; #313 removed the Next itself, and
   * this is what is left of that promise — the mark is the only thing on the card to do, and it is
   * not waiting on a second control to make it count.
   */
  it('offers the two segments and NOTHING else — no Next, nothing disabled', () => {
    const { container } = renderCard();
    reveal();

    expect(screen.getAllByRole('button').map((button) => button.textContent)).toEqual([
      copy('mark.gotIt'),
      copy('mark.missed'),
    ]);
    expect(container.querySelectorAll('button[disabled]')).toHaveLength(0);
  });

  it('renders the quiet script line for a romanized course, and none for a native one', () => {
    const { unmount } = renderCard({ script: ROMANIZED.script });
    reveal();

    expect(screen.getByText(ROMANIZED.script!)).toBeInTheDocument();

    unmount();
    renderCard();
    reveal();

    expect(screen.queryByText(ROMANIZED.script!)).not.toBeInTheDocument();
  });

  /* The seam #94 fills — it is a slot, and an empty slot draws nothing. */
  it('renders the “why” slot only when the parent fills it', () => {
    const { unmount } = renderCard();
    reveal();

    expect(screen.queryByTestId('why')).toBeNull();

    unmount();
    renderCard({ why: <p data-testid="why">word rows</p> });
    reveal();

    expect(screen.getByTestId('why')).toBeInTheDocument();
  });
});

describe('the marked state', () => {
  /* The window is what the Next used to be: nothing is committed while it runs. */
  it('emits the mark when the window elapses — once, and not before', () => {
    const { onResult } = renderCard();
    reveal();
    mark('mark.gotIt');

    expect(onResult).not.toHaveBeenCalled();

    settle();

    expect(onResult.mock.calls).toEqual([[{ sentenceId: NATIVE.id, gotIt: true }]]);
  });

  it('emits a miss as a miss', () => {
    const { onResult } = renderCard();
    reveal();
    mark('mark.missed');
    settle();

    expect(onResult.mock.calls).toEqual([[{ sentenceId: NATIVE.id, gotIt: false }]]);
  });

  /**
   * The promise the Next was really making, and the whole reason the window exists rather than an
   * immediate commit: a learner who taps "missed", thinks again and taps "got it" sends ONE
   * result, and it is the one they meant.
   */
  it('sends the mark the learner settled on — changing it inside the window changes the result', () => {
    const { onResult } = renderCard();
    reveal();
    mark('mark.missed');
    mark('mark.gotIt');
    settle();

    expect(onResult.mock.calls).toEqual([[{ sentenceId: NATIVE.id, gotIt: true }]]);
  });

  /* Changing the mark restarts the window, so the first choice's timer cannot fire behind it. */
  it('emits exactly once when the mark is changed twice inside the window', () => {
    const { onResult } = renderCard();
    reveal();
    mark('mark.gotIt');
    mark('mark.missed');
    mark('mark.gotIt');
    settle();
    settle();

    expect(onResult.mock.calls).toEqual([[{ sentenceId: NATIVE.id, gotIt: true }]]);
  });

  it('lights exactly the segment chosen', () => {
    renderCard();
    reveal();
    mark('mark.missed');

    expect(screen.getByRole('button', { name: copy('mark.missed') })).toHaveAttribute(
      'aria-pressed',
      'true',
    );
    expect(screen.getByRole('button', { name: copy('mark.gotIt') })).toHaveAttribute(
      'aria-pressed',
      'false',
    );
  });
});

/* --------------------------------------------------------------------- the invariants */

describe('the card as a whole', () => {
  /* Invariant 6. The recall happens in the learner's head, mouth or notebook — never in here. */
  it('contains no input element in any of the three states', () => {
    const { container } = renderCard();
    const inputs = () => container.querySelectorAll('input, textarea, [contenteditable]');

    expect(inputs(), 'cue').toHaveLength(0);
    reveal();
    expect(inputs(), 'revealed').toHaveLength(0);
    mark('mark.gotIt');
    expect(inputs(), 'marked').toHaveLength(0);
  });

  /**
   * Invariant 4, as a source fact: what a mark COSTS is the parent's call — Leitner's `applyMark`
   * for a Review mark, `recordProduction` for a Produce one (#95), routed by the session machine
   * (#96) — and a card that reached for the store would make that decision twice, in the one place
   * that cannot see the phase.
   */
  it('writes nothing: no store, no storage, in either file', () => {
    for (const [file, source] of [
      ['RevealCard.tsx', cardSource],
      ['SelfMark.tsx', markSource],
    ] as const) {
      expect(source, file).not.toMatch(/useAppStore|localStorage|sessionStorage/);
    }
  });

  it('starts a new sentence fresh — a new cue never arrives with the last answer under it', () => {
    const { rerender, onResult } = renderCard();
    reveal();
    mark('mark.gotIt');

    rerender(
      <StringsContext.Provider value={STRINGS}>
        <RevealCard
          sentenceId="L1-M1-S02"
          cue="I am from India"
          display="Soy de India"
          onResult={onResult}
        />
      </StringsContext.Provider>,
    );

    expect(screen.getByText('I am from India')).toBeInTheDocument();
    expect(screen.getByText(copy('revealLabel'))).toBeInTheDocument();
    expect(screen.queryByText('Soy de India')).not.toBeInTheDocument();
  });

  /**
   * And the window that was running when it was swapped belongs to the sentence it was opened for.
   * The parent keys the card in both real call sites, so this is the belt-and-braces path — but a
   * mark credited to the NEXT sentence is the worst thing this component could do quietly, and
   * `useCommitWindow` captures the callback at the choice to make sure it cannot.
   */
  it('commits a mark to the sentence it was made on, even if the parent swaps mid-window', () => {
    const { rerender, onResult } = renderCard();
    reveal();
    mark('mark.gotIt');

    rerender(
      <StringsContext.Provider value={STRINGS}>
        <RevealCard
          sentenceId="L1-M1-S02"
          cue="I am from India"
          display="Soy de India"
          onResult={onResult}
        />
      </StringsContext.Provider>,
    );
    settle();

    expect(onResult.mock.calls).toEqual([[{ sentenceId: NATIVE.id, gotIt: true }]]);
  });

  /* The blueprint grammar: registration marks are "never dropped" (design/tokens.md §7 rule 3). */
  it('wears the four + registration marks on the reveal CTA, then on the answer plate', () => {
    const { container } = renderCard();

    expect(container.querySelectorAll('svg')).toHaveLength(4);
    reveal();
    expect(container.querySelectorAll('svg')).toHaveLength(4);
  });
});

/* Motion is a stylesheet fact, so it is read off the stylesheet (design/tokens.md §5). */
describe('the motion', () => {
  it('is the 300ms reveal, and nothing else moves', () => {
    const animated = rules().filter(([, declarations]) => declarations.includes('animation:'));

    expect(animated).toEqual([
      ['.answer', expect.stringContaining('reveal-in var(--motion-reveal) both')],
    ]);
  });

  it('collapses the reveal under prefers-reduced-motion', () => {
    const reduced = /@media \(prefers-reduced-motion: reduce\) \{([\s\S]*?)\n\}/.exec(cardCss)?.[1];

    expect(reduced).toBeDefined();
    expect(reduced).toContain('.answer');
    expect(reduced).toMatch(/animation:\s*none/);
  });

  /**
   * The commit window is a JavaScript gate, not an animation [D14]'s reason — a stylesheet that
   * could shorten it would fire the commit in 0.01ms under this very media query, rushing exactly
   * the learners the query exists to protect.
   */
  it('does not put the commit window in the stylesheet', () => {
    // Declarations only: this file's own prose explains why the window is not here, and a scan
    // that read comments would fail on the explanation.
    const declarations = rules()
      .map(([, body]) => body)
      .join('\n');

    expect(declarations).not.toMatch(/commit/i);
    // The mark row carries no animation of its own, so there is no `animationend` for a commit to
    // hang off even by accident — the only animation on the card is the reveal, asserted above.
    const markRows = rules().filter(([selector]) => selector.startsWith('.marks'));

    expect(markRows.length).toBeGreaterThan(0);
    for (const [selector, body] of markRows) {
      expect(body, selector).not.toMatch(/animation|transition/);
    }
  });
});
