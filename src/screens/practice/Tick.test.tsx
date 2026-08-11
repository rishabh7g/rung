/**
 * The gentle elapsed tick (#98) — the five promises the product's only time affordance makes:
 *
 *   • **it is numberless**, in every state: no text content, no live region, `aria-hidden` — a
 *     bar that could be READ would be the calendar framing Invariant 2 forbids, wearing a hairline,
 *   • it fills against elapsed time in COARSE steps (~15s), caps at full and stays there,
 *   • **off is off**: `settings.elapsedTickEnabled: false` renders nothing at all — no track, no
 *     box, zero layout trace,
 *   • a pause banks what it accrued rather than resetting or fast-forwarding it, so resuming
 *     never jumps and never passes the cap,
 *   • it measures with `performance.now()` and constructs no date, which is what keeps the guard
 *     in `src/state/clock.test.ts` whole (a duration is not a calendar — see `Tick.tsx`).
 *
 * The component renders directly: it takes one prop and reads one setting, and everything above
 * is its own. Its place in the session (under the chips, gone at the summary) is asserted through
 * `<App />` in `src/screens/PracticeScreen.test.tsx`.
 *
 * Time is faked, and `vi.advanceTimersByTime` moves `performance.now()` with the interval — which
 * is the whole reason a monotonic timer is testable where a wall clock would need a stub.
 */
import { act, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { useAppStore } from '../../state/store.ts';
import { Tick } from './Tick.tsx';
import tickCss from './Tick.module.css?raw';
import tickSource from './Tick.tsx?raw';

/** `--motion-tick-cap`: the tick fills once over ~25 minutes (design/tokens.md §5). */
const CAP_MS = 25 * 60 * 1000;
const MINUTE = 60 * 1000;

/**
 * A stretch of practice that is deliberately NOT a whole number of 15s samples.
 *
 * The samples land on a grid set by the moment the tick started running, so from a fresh mount
 * one of them falls exactly on the cap and the clamp never has to do anything. Seven seconds off
 * the grid is what real elapsed time looks like — a session that paused once — and it is what
 * makes `Math.min(…, 1)` the thing being tested rather than an arithmetic coincidence.
 */
const OFF_GRID_MS = 5 * MINUTE + 7_000;

function renderTick(active = true) {
  return render(<Tick active={active} />);
}

/** The track, or null when the tick is drawing nothing at all. */
function track(container: HTMLElement): HTMLElement | null {
  return container.querySelector<HTMLElement>('[data-slot="elapsedTick"]');
}

/** How full the bar is — the one number the component puts in the DOM, and never in words. */
function filled(container: HTMLElement): number | null {
  const node = track(container);
  return node === null ? null : Number(node.style.getPropertyValue('--tick-fraction'));
}

function advance(ms: number): void {
  act(() => {
    vi.advanceTimersByTime(ms);
  });
}

/** The tab going to the background, and coming back. */
function visibility(state: 'visible' | 'hidden'): void {
  Object.defineProperty(document, 'visibilityState', { value: state, configurable: true });
  act(() => {
    document.dispatchEvent(new Event('visibilitychange'));
  });
}

beforeEach(() => {
  useAppStore.getState()._reset();
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  visibility('visible');
});

/* ------------------------------------------------------------------ numberless */

describe('the tick says nothing', () => {
  it('holds no text, in any state — it is ambience, not a readout', () => {
    const { container } = renderTick();

    expect(container.textContent).toBe('');
    advance(13 * MINUTE);
    expect(container.textContent).toBe('');
    advance(40 * MINUTE);
    expect(container.textContent).toBe('');
  });

  it('announces nothing: aria-hidden, and no live region anywhere under it', () => {
    const { container } = renderTick();
    const node = track(container);

    expect(node).toHaveAttribute('aria-hidden', 'true');
    expect(node?.getAttribute('aria-live')).toBeNull();
    expect(node?.querySelector('[aria-live], [role="status"], [role="timer"]')).toBeNull();
    expect(node?.getAttribute('title')).toBeNull();
  });
});

/* ---------------------------------------------------------------------- the fill */

describe('the fill', () => {
  it('starts empty and fills against elapsed time', () => {
    const { container } = renderTick();

    expect(filled(container)).toBe(0);

    advance(CAP_MS / 2);

    expect(filled(container)).toBeCloseTo(0.5, 5);
  });

  it('moves in coarse steps — one sample every 15 seconds, not every frame', () => {
    const { container } = renderTick();

    advance(14_000);
    expect(filled(container)).toBe(0);

    advance(1_000);
    expect(filled(container)).toBeCloseTo(15_000 / CAP_MS, 5);
  });

  it('caps at full and stays there — it fills once, and never counts down', () => {
    const { container } = renderTick();

    advance(CAP_MS);
    expect(filled(container)).toBe(1);

    advance(90 * MINUTE);
    expect(filled(container)).toBe(1);
  });
});

/* ------------------------------------------------------------------- off is off */

describe('the setting', () => {
  it('ships ON — the design recommendation, until [Q3]/#70 says otherwise', () => {
    const { container } = renderTick();

    expect(useAppStore.getState().settings.elapsedTickEnabled).toBe(true);
    expect(track(container)).not.toBeNull();
  });

  it('renders nothing at all when it is off — zero layout trace', () => {
    act(() => {
      useAppStore.getState().setSetting('elapsedTickEnabled', false);
    });

    const { container } = renderTick();

    expect(container.innerHTML).toBe('');
    expect(container.firstChild).toBeNull();
  });

  it('leaves mid-session when it is switched off, and takes its box with it', () => {
    const { container } = renderTick();
    advance(5 * MINUTE);
    expect(track(container)).not.toBeNull();

    act(() => {
      useAppStore.getState().setSetting('elapsedTickEnabled', false);
    });

    expect(container.innerHTML).toBe('');
  });
});

/* ---------------------------------------------------------------------- pausing */

describe('pausing', () => {
  it('draws nothing while the session is not on a phase', () => {
    const { container } = renderTick(false);

    expect(container.innerHTML).toBe('');
  });

  it('banks what it accrued and resumes there — a pause is neither a reset nor a fast-forward', () => {
    const { container, rerender } = renderTick();
    advance(5 * MINUTE);
    expect(filled(container)).toBeCloseTo(0.2, 5);

    rerender(<Tick active={false} />);
    advance(60 * MINUTE);
    rerender(<Tick active />);

    // The hour away was not practice: the bar picks up at the five minutes that were.
    expect(filled(container)).toBeCloseTo(0.2, 5);
  });

  it('resumes without jumping past the cap, however long it was away', () => {
    const { container, rerender } = renderTick();
    advance(OFF_GRID_MS);

    rerender(<Tick active={false} />);
    advance(10 * 60 * MINUTE);
    rerender(<Tick active />);

    // Resuming samples immediately, at the banked total and not a millisecond of the pause.
    expect(filled(container)).toBeCloseTo(OFF_GRID_MS / CAP_MS, 5);

    // Long enough that a sample lands PAST the cap rather than on it — the clamp's own test.
    advance(CAP_MS);

    expect(filled(container)).toBe(1);
  });

  it('accrues nothing while the tab is in the background', () => {
    const { container } = renderTick();
    advance(5 * MINUTE);

    visibility('hidden');
    advance(30 * MINUTE);
    visibility('visible');

    // Still on screen the whole time — backgrounded is paused, not hidden.
    expect(track(container)).not.toBeNull();
    expect(filled(container)).toBeCloseTo(0.2, 5);
  });
});

/* ----------------------------------------------------------------- the measurement */

/**
 * The reason this component may measure time at all: it reads a DURATION off a monotonic timer,
 * not a position in a calendar. `src/state/clock.test.ts` bans date construction outside
 * `clock.ts` and this keeps that ban whole rather than asking for an exemption from it — asserted
 * here, against the same two patterns the guard scans for.
 */
describe('the measurement', () => {
  it('is performance.now(), never a date', () => {
    expect(tickSource).toContain('performance.now()');
    expect(tickSource).not.toMatch(/\bnew\s+Date\b/);
    expect(tickSource).not.toMatch(/\bDate\s*\.\s*now\b/);
  });

  it('never persists it — the session start is a ref, and state v6 carries no timestamp', () => {
    const { container } = renderTick();
    advance(10 * MINUTE);

    expect(JSON.stringify(useAppStore.getState())).not.toContain('tick-fraction');
    expect(useAppStore.getState().courses).toEqual({});
    expect(filled(container)).toBeCloseTo(0.4, 5);
  });
});

/* ---------------------------------------------------------------------- the motion */

/* Motion is a stylesheet fact, so it is read off the stylesheet (design/tokens.md §5). */
describe('the motion', () => {
  it('is a 1s linear width transition on the fill, and nothing else moves', () => {
    expect(tickCss).toMatch(/\.fill\b[\s\S]*?transition:\s*width 1s linear/);
    expect(tickCss).not.toMatch(/animation:/);
  });

  it('takes its width from the fraction the component measures, in tokens either side', () => {
    expect(tickCss).toMatch(/width:\s*calc\(var\(--tick-fraction, 0\) \* 100%\)/);
    expect(tickCss).toContain('var(--tick-track)');
    expect(tickCss).toContain('var(--tick-fill)');
    expect(tickCss).toContain('var(--tick-height)');
  });

  it('keeps the fill under prefers-reduced-motion and drops only the transition', () => {
    const reduced = /@media \(prefers-reduced-motion: reduce\) \{([\s\S]*)\n\}/.exec(tickCss)?.[1];

    expect(reduced).toBeDefined();
    expect(reduced).toContain('.fill');
    expect(reduced).toMatch(/transition:\s*none/);
    // The width is the whole of what the tick says; reduced motion drops the gliding, not it.
    expect(reduced).not.toContain('width');
  });
});
