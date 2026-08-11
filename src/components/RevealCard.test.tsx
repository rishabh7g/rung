/**
 * The reveal card (#93) — the six promises the make-or-break interaction makes:
 *
 *   • cue → reveal → mark → Next, and **Next does not exist until a mark does** [D11]: the
 *     assertion is `queryByRole(…) === null`, because hidden is not disabled,
 *   • nothing is preselected: a revealed card offers two segments and lights neither,
 *   • the card writes nothing (Invariant 4) — one `onResult` on Next, carrying the mark the
 *     learner settled on, and no storage of any kind underneath it,
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
import { fireEvent, render, screen } from '@testing-library/react';
import type { ReactNode } from 'react';
import { describe, expect, it, vi } from 'vitest';
import { StringsContext, type Strings } from '../course/strings.ts';
import { STRINGS_KEYS } from '../course/stringsKeys.ts';
import { moduleFixture, romanizedModuleFixture } from '../test/courseContent.ts';
import { stringValue } from '../test/courseStrings.ts';
import { RevealCard, type RevealMode } from './RevealCard.tsx';
import cardCss from './RevealCard.module.css?raw';
import cardSource from './RevealCard.tsx?raw';
import markSource from './SelfMark.tsx?raw';

const COURSE = 'hi-mr';

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
  mode?: RevealMode;
  script?: string;
  why?: ReactNode;
  sentenceId?: string;
}

function renderCard({ mode = 'review', script, why, sentenceId }: RenderOptions = {}) {
  const onResult = vi.fn();
  const view = render(
    <StringsContext.Provider value={STRINGS}>
      <RevealCard
        sentenceId={sentenceId ?? NATIVE.id}
        cue={NATIVE.cue}
        display={NATIVE.display}
        script={script}
        mode={mode}
        why={why}
        onResult={onResult}
      />
    </StringsContext.Provider>,
  );

  return { ...view, onResult };
}

/** The one control that must not exist before a mark does. */
function next(): HTMLElement | null {
  return screen.queryByRole('button', { name: copy('mark.next') });
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
  it('asks for the recall first: the cue, the course’s nudge, and one way forward', () => {
    renderCard();

    expect(screen.getByText(copy('cueLabel'))).toBeInTheDocument();
    expect(screen.getByText(NATIVE.cue)).toBeInTheDocument();
    expect(screen.getByText(copy('nudge.review'))).toBeInTheDocument();
    expect(screen.getAllByRole('button').map((button) => button.textContent)).toEqual([
      copy('revealLabel'),
    ]);
  });

  it('takes the nudge from the phase it is serving — Produce writes, Review recalls', () => {
    renderCard({ mode: 'produce' });

    expect(screen.getByText(copy('nudge.produce'))).toBeInTheDocument();
    expect(screen.queryByText(copy('nudge.review'))).not.toBeInTheDocument();
  });

  it('shows nothing of the answer — that is the whole point of the state', () => {
    renderCard();

    expect(screen.queryByText(NATIVE.display)).not.toBeInTheDocument();
    expect(screen.queryByText(copy('mark.prompt'))).not.toBeInTheDocument();
    expect(next()).toBeNull();
  });
});

describe('the revealed state', () => {
  it('shows the answer and asks the question, with neither mark chosen', () => {
    renderCard();
    reveal();

    expect(screen.getByText(NATIVE.display)).toBeInTheDocument();
    expect(screen.getByText(copy('mark.prompt'))).toBeInTheDocument();
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
    expect(screen.queryByText(copy('nudge.review'))).not.toBeInTheDocument();
  });

  /* [D11], the promise the whole ticket is about. */
  it('has NO Next in the DOM — hidden, not disabled', () => {
    const { container } = renderCard();
    reveal();

    expect(next()).toBeNull();
    // and not there wearing a `disabled` either — the gate is absence, not a dimmed control.
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
  it('brings Next into existence the moment a mark does', () => {
    renderCard();
    reveal();
    expect(next()).toBeNull();

    mark('mark.gotIt');

    expect(next()).toBeInTheDocument();
  });

  it('emits the mark on Next — once, and not before', () => {
    const { onResult } = renderCard();
    reveal();
    mark('mark.gotIt');

    expect(onResult).not.toHaveBeenCalled();

    fireEvent.click(next()!);

    expect(onResult.mock.calls).toEqual([[{ sentenceId: NATIVE.id, gotIt: true }]]);
  });

  it('emits a miss as a miss', () => {
    const { onResult } = renderCard();
    reveal();
    mark('mark.missed');
    fireEvent.click(next()!);

    expect(onResult.mock.calls).toEqual([[{ sentenceId: NATIVE.id, gotIt: false }]]);
  });

  it('sends the mark the learner settled on — changing it before Next changes the result', () => {
    const { onResult } = renderCard();
    reveal();
    mark('mark.missed');
    mark('mark.gotIt');
    fireEvent.click(next()!);

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
   * Invariant 4, as a source fact: what a mark COSTS is the parent's call — Leitner for a Review
   * mark, the production counters for a Produce one (#95, #96) — and a card that reached for the
   * store would make that decision twice, in the one place that cannot see the phase.
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
          mode="review"
          onResult={onResult}
        />
      </StringsContext.Provider>,
    );

    expect(screen.getByText(copy('nudge.review'))).toBeInTheDocument();
    expect(screen.queryByText('Soy de India')).not.toBeInTheDocument();
    expect(next()).toBeNull();
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
  it('is the 300ms reveal and the 200ms Next, and nothing else moves', () => {
    const animated = rules().filter(([, declarations]) => declarations.includes('animation:'));

    expect(animated).toEqual([
      ['.answer', expect.stringContaining('reveal-in var(--motion-reveal) both')],
      ['.next', expect.stringContaining('reveal-in var(--motion-next-appear) both')],
    ]);
  });

  it('collapses under prefers-reduced-motion — both the reveal and the Next', () => {
    const reduced = /@media \(prefers-reduced-motion: reduce\) \{([\s\S]*)\n\}/.exec(cardCss)?.[1];

    expect(reduced).toBeDefined();
    expect(reduced).toContain('.answer');
    expect(reduced).toContain('.next');
    expect(reduced).toMatch(/animation:\s*none/);
  });
});
