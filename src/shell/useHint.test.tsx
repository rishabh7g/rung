/**
 * The show-once hints (#319) — one promise, and the two ways it can break.
 *
 * The promise is **once per install**: the first time a surface is used the learner is told the
 * fact it rests on, and never again. Both failure modes are worth a test, because they fail in
 * opposite directions and only one of them is visible: a hint that repeats is the always-on copy
 * #225 removed, arriving one session at a time; a hint that never shows is a first-run learner
 * told nothing, which is the state #319 exists to fix and which nothing on screen would reveal.
 *
 * The storage is `localStorage` and the failure path is a browser that will not answer, so that
 * case is tested by making it throw: a hint that cannot be remembered is shown AGAIN, because for
 * copy whose whole job is to be seen once, being seen twice is the honest failure and being seen
 * zero times is not.
 */
import { cleanup, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { StringsContext, type Strings } from '../course/strings.ts';
import { STRINGS_KEYS } from '../course/stringsKeys.ts';
import { stringValue } from '../test/courseStrings.ts';
import { hintKey, hintSeen, markHintSeen } from './hints.ts';
import { HintLine, useHint } from './useHint.tsx';

const COURSE = 'hi-mr';

const STRINGS = Object.fromEntries(
  STRINGS_KEYS.map((key) => [key, stringValue(COURSE, key)]),
) as Strings;

function copy(key: string): string {
  return stringValue(COURSE, key);
}

function renderHint(active?: boolean) {
  return render(
    <StringsContext.Provider value={STRINGS}>
      <HintLine hint="recall" active={active} />
    </StringsContext.Provider>,
  );
}

beforeEach(() => {
  localStorage.clear();
});

afterEach(() => {
  vi.restoreAllMocks();
  localStorage.clear();
});

describe('once, and then never', () => {
  it('says it on the first visit', () => {
    renderHint();

    expect(screen.getByText(copy('hint.recall'))).toBeVisible();
  });

  it('says nothing on the second — a different mount, the same install', () => {
    renderHint();
    cleanup();
    renderHint();

    expect(screen.queryByText(copy('hint.recall'))).toBeNull();
  });

  /**
   * It renders `null` rather than something hidden: a surface drops it in unconditionally, and
   * the DOM is what says which visit this is. An `aria-hidden` line would still be a line in the
   * accessibility tree's neighbourhood and a node in every screenshot.
   */
  it('leaves nothing behind at all once it is spent', () => {
    const { container } = renderHint();
    expect(container.querySelector('p')).not.toBeNull();

    cleanup();
    const second = renderHint();

    expect(second.container.querySelector('p')).toBeNull();
    expect(second.container).toBeEmptyDOMElement();
  });

  /**
   * The hint is marked when it is SHOWN, not when it is acted on — there is nothing to act on. A
   * rule that waited for an acknowledgement would turn a show-once line into a permanent one for
   * everybody who ignores it, which is everybody, because it is copy.
   */
  it('is spent by being shown, with no acknowledgement to give', () => {
    expect(hintSeen('recall')).toBe(false);

    renderHint();

    expect(hintSeen('recall')).toBe(true);
    expect(localStorage.getItem(hintKey('recall'))).not.toBeNull();
  });
});

describe('the surface decides when the moment is', () => {
  /**
   * A hint spent on a screen the learner is only passing through is a hint they never got. So an
   * inactive surface neither shows it nor marks it — the reveal card's cue state is what
   * `hint.recall` is about, and a card already revealed has gone past it.
   */
  it('neither shows nor spends the hint while the surface is not at the moment', () => {
    renderHint(false);

    expect(screen.queryByText(copy('hint.recall'))).toBeNull();
    expect(hintSeen('recall')).toBe(false);

    cleanup();
    renderHint(true);

    expect(screen.getByText(copy('hint.recall'))).toBeVisible();
  });

  /**
   * The decision is taken once, on mount, and held: a line that vanished mid-look because
   * something else on the screen re-rendered would be worse than one never shown.
   */
  it('does not vanish under the learner when the surface re-renders', () => {
    const view = renderHint();
    expect(screen.getByText(copy('hint.recall'))).toBeVisible();

    view.rerender(
      <StringsContext.Provider value={STRINGS}>
        <HintLine hint="recall" />
      </StringsContext.Provider>,
    );

    expect(screen.getByText(copy('hint.recall'))).toBeVisible();
  });
});

describe('the three hints are three', () => {
  it('spends them one at a time — seeing one does not spend the others', () => {
    markHintSeen('recall');

    expect(hintSeen('recall')).toBe(true);
    expect(hintSeen('production')).toBe(false);
    expect(hintSeen('check')).toBe(false);
  });

  it('keys them apart, in a namespace that is visibly not progress', () => {
    expect(hintKey('recall')).toBe('rung:hint:recall');
    expect(hintKey('production')).toBe('rung:hint:production');
    expect(hintKey('check')).toBe('rung:hint:check');
    // `rung:state` is the store's, and nothing here may look like it (#82, PRD §8 F7).
    for (const hint of ['recall', 'production', 'check'] as const) {
      expect(hintKey(hint)).not.toBe('rung:state');
    }
  });
});

describe('a browser that will not remember', () => {
  /** Safari's private mode, an embedded webview with storage disabled: the access itself throws. */
  function breakStorage(): void {
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('storage disabled');
    });
    vi.spyOn(Storage.prototype, 'setItem').mockImplementation(() => {
      throw new Error('storage disabled');
    });
  }

  it('still renders the screen, and shows the hint rather than swallowing it', () => {
    breakStorage();

    expect(() => renderHint()).not.toThrow();
    expect(screen.getByText(copy('hint.recall'))).toBeVisible();
  });

  it('costs a repeat, never a crash', () => {
    breakStorage();

    renderHint();
    cleanup();

    expect(() => renderHint()).not.toThrow();
    expect(screen.getByText(copy('hint.recall'))).toBeVisible();
  });

  it('answers "not seen" rather than throwing out of the read', () => {
    breakStorage();

    expect(hintSeen('recall')).toBe(false);
    expect(() => markHintSeen('recall')).not.toThrow();
  });
});

describe('the hook, for a surface that wants the answer without the paragraph', () => {
  function Probe() {
    return <span data-testid="probe">{useHint('production') ? 'show' : 'hide'}</span>;
  }

  it('answers once, then hides', () => {
    render(<Probe />);
    expect(screen.getByTestId('probe')).toHaveTextContent('show');

    cleanup();
    render(<Probe />);

    expect(screen.getByTestId('probe')).toHaveTextContent('hide');
  });
});
