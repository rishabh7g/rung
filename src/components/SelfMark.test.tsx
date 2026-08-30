/**
 * The self-mark [D11] (#93) — four promises, and two of them are the product's contract:
 *
 *   • it is NEVER preselected — `mark={null}` lights neither segment,
 *   • it holds nothing: what is lit is exactly what the parent passed,
 *   • it contains no input element (Invariant 6),
 *   • the fills are the two `--mark-*` tokens and nothing else is (design/tokens.md §6).
 *
 * The labels come from the shared strings fixture, built FROM the canonical key list, so a
 * segment reads `hi-mr mark.gotIt`: an assertion against the prototype's "Got it" would pass on a
 * hardcoded shell string, which is the one thing the strings contract exists to prevent.
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { StringsContext, type Strings } from '../course/strings.ts';
import { STRINGS_KEYS } from '../course/stringsKeys.ts';
import { stringValue } from '../test/courseStrings.ts';
import { SelfMark, type Mark } from './SelfMark.tsx';
import markCss from './SelfMark.module.css?raw';

const COURSE = 'hi-mr';

const STRINGS = Object.fromEntries(
  STRINGS_KEYS.map((key) => [key, stringValue(COURSE, key)]),
) as Strings;

/** What the fixture bundle says for a key — the self-identifying value an assertion reads. */
function copy(key: string): string {
  return stringValue(COURSE, key);
}

function renderMark(mark: Mark | null, onMark = vi.fn()) {
  const view = render(
    <StringsContext.Provider value={STRINGS}>
      <SelfMark mark={mark} onMark={onMark} />
    </StringsContext.Provider>,
  );

  return { ...view, onMark };
}

/**
 * Both segments, in DOCUMENT order, as `[label, pressed]` — which is also the visual order and
 * the tab order, and the reason every expectation below reads `missed` first.
 *
 * The got-it segment sits SECOND on purpose: it is the mark a learner takes most often and the
 * one their thumb should already be resting on, and it led until the ordering was measured
 * against a one-handed phone rather than against reading order. Asserting document order rather
 * than querying by name is what makes that a pinned decision instead of a coincidence.
 */
function segments(): [string, string | null][] {
  return screen
    .getAllByRole('button')
    .map((option) => [option.textContent ?? '', option.getAttribute('aria-pressed')]);
}

/** The stylesheet's rules as `[selector, declarations]`, comments stripped. */
function rules(): [string, string][] {
  const source = markCss.replace(/\/\*[\s\S]*?\*\//g, '');

  return [...source.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((rule) => [
    (rule[1] ?? '').trim(),
    rule[2] ?? '',
  ]);
}

describe('the self-mark', () => {
  it('is never preselected — the mark is the learner’s act, not the app’s', () => {
    renderMark(null);

    expect(segments()).toEqual([
      [copy('mark.missed'), 'false'],
      [copy('mark.gotIt'), 'false'],
    ]);
  });

  it('lights exactly the segment the parent passed, one at a time', () => {
    const { unmount } = renderMark('got');

    expect(segments()).toEqual([
      [copy('mark.missed'), 'false'],
      [copy('mark.gotIt'), 'true'],
    ]);

    unmount();
    renderMark('miss');

    expect(segments()).toEqual([
      [copy('mark.missed'), 'true'],
      [copy('mark.gotIt'), 'false'],
    ]);
  });

  it('emits the mark and holds nothing — the segments do not light themselves', () => {
    const { onMark } = renderMark(null);

    fireEvent.click(screen.getByRole('button', { name: copy('mark.gotIt') }));
    fireEvent.click(screen.getByRole('button', { name: copy('mark.missed') }));

    expect(onMark.mock.calls).toEqual([['got'], ['miss']]);
    // Nothing moved on screen: the parent owns the mark (that is what the [D11] gate hangs off).
    expect(segments()).toEqual([
      [copy('mark.missed'), 'false'],
      [copy('mark.gotIt'), 'false'],
    ]);
  });

  /* #225 took the question away: the group is unnamed, and its two segments say what it is. */
  it('is a group of two, and takes no accessible name from a question above it', () => {
    render(
      <StringsContext.Provider value={STRINGS}>
        <SelfMark mark={null} onMark={vi.fn()} />
      </StringsContext.Provider>,
    );

    const group = screen.getByRole('group');

    expect(group).not.toHaveAttribute('aria-labelledby');
    expect(group).not.toHaveAccessibleName();
  });

  /* Invariant 6: the design system's own seg wraps a radio input; this control may not. */
  it('contains no input element in any state', () => {
    for (const mark of [null, 'got', 'miss'] as const) {
      const { container, unmount } = renderMark(mark);

      expect(container.querySelectorAll('input, textarea, [contenteditable]')).toHaveLength(0);
      unmount();
    }
  });
});

/* The fills are a stylesheet fact, so they are read off the stylesheet (design/tokens.md §6). */
describe('the fills', () => {
  it('are the two --mark-* tokens with --mark-fg, and only on a selected segment', () => {
    const got = rules().find(([selector]) => selector === '.optionGot')?.[1] ?? '';
    const miss = rules().find(([selector]) => selector === '.optionMiss')?.[1] ?? '';

    expect(got).toMatch(/background:\s*var\(--mark-got-bg\)/);
    expect(got).toMatch(/color:\s*var\(--mark-fg\)/);
    expect(miss).toMatch(/background:\s*var\(--mark-miss-bg\)/);
    expect(miss).toMatch(/color:\s*var\(--mark-fg\)/);

    for (const [selector, declarations] of rules()) {
      if (!declarations.includes('--mark-')) continue;
      expect(selector, `${selector} carries a --mark-* token`).toMatch(/^\.option(Got|Miss)/);
    }
  });

  it('leave an unselected segment transparent, with the ink it inherits', () => {
    const option = rules().find(([selector]) => selector === '.option')?.[1] ?? '';

    expect(option).toMatch(/background:\s*transparent/);
    expect(option).toMatch(/color:\s*inherit/);
  });

  it('sit on a 44px segment — the --tap-min floor (design/tokens.md §4)', () => {
    const option = rules().find(([selector]) => selector === '.option')?.[1] ?? '';

    expect(option).toMatch(/min-height:\s*var\(--seg-opt-height\)/);
  });
});
