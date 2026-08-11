/**
 * The press-and-hold confirmation (#101) — one promise, asked six ways:
 *
 *   **the weight cannot be avoided.** ~900ms of held pointer, or nothing happens [D14].
 *
 * So the cases are mostly about what does NOT confirm: a tap, ten taps, a hold one step short, a
 * finger that lifts, wanders off (`pointerleave`) or is taken away by the system
 * (`pointercancel`) — and, the one that matters most, a hold under `prefers-reduced-motion`,
 * where every animation in the product collapses to nothing (design/tokens.md §5) and this
 * duration must not. A fill driven by a CSS transition would pass that case instantly; this one
 * is a JavaScript timer, and the test holds it to the same 900ms with reduced motion reported.
 *
 * Time is faked, and the interval is the only clock in the component: `advanceTimersByTime(900)`
 * is exactly 30 steps of `--motion-hold-step`. Events are real `PointerEvent`s through
 * `fireEvent` — the control listens for nothing else, which is the point of Pointer Events
 * (design/pwa-checklist.md §1).
 *
 * Strings come from the shared fixture, built FROM the canonical key list, so the label reads
 * `hi-mr ritual.confirm.holdLabel {ordinal}` — an assertion against the prototype's English would
 * pass on a hardcoded shell string, which is the one thing the strings contract exists to prevent.
 */
import { act, fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { StringsContext, interpolate, type Strings } from '../course/strings.ts';
import { STRINGS_KEYS } from '../course/stringsKeys.ts';
import { stringValue } from '../test/courseStrings.ts';
import { HoldToConfirm } from './HoldToConfirm.tsx';
import holdCss from './HoldToConfirm.module.css?raw';

const COURSE = 'hi-mr';
/** The course's own word for "the 11th", as the ritual's head hands it down. */
const ORDINAL = '11th';

const STRINGS = Object.fromEntries(
  STRINGS_KEYS.map((key) => [key, stringValue(COURSE, key)]),
) as Strings;

/** What the fixture bundle says for a key — the self-identifying value an assertion reads. */
function copy(key: string): string {
  return stringValue(COURSE, key);
}

/** `--motion-hold-total` [D14]: the whole hold, and the number this file exists to defend. */
const HOLD_MS = 900;
/** `--motion-hold-step`: one sampling step of the fill. */
const STEP_MS = 30;

function renderHold() {
  const onConfirm = vi.fn();
  const view = render(
    <MemoryRouter>
      <StringsContext.Provider value={STRINGS}>
        <HoldToConfirm ordinal={ORDINAL} onConfirm={onConfirm} />
      </StringsContext.Provider>
    </MemoryRouter>,
  );

  return { ...view, onConfirm };
}

/** The control — found by the course's own label, with the ordinal already in it. */
function control(): HTMLElement | null {
  return screen.queryByRole('button', {
    name: interpolate(copy('ritual.confirm.holdLabel'), { ordinal: ORDINAL }),
  });
}

function held(): HTMLElement {
  const node = control();
  if (node === null) throw new Error('the hold control is not on screen');
  return node;
}

/** How full the bar is: the one number the component writes to the DOM. */
function progress(): number {
  return Number(held().style.getPropertyValue('--hold-progress'));
}

function press(): void {
  fireEvent.pointerDown(held());
}

function hold(ms: number): void {
  act(() => {
    vi.advanceTimersByTime(ms);
  });
}

/** The ✓ state's line, which only exists once the hold is paid. */
function signed(): HTMLElement | null {
  return screen.queryByText(copy('ritual.confirm.done'));
}

/** The way on to part 2 — Comprehension (#102). */
function cta(): HTMLElement | null {
  return screen.queryByRole('link', { name: copy('ritual.confirm.toComprehension') });
}

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.unstubAllGlobals();
});

/* ------------------------------------------------------------- the hold completes */

describe('a full hold, and exactly one of it', () => {
  it('confirms after the whole duration, and emits once', () => {
    const { onConfirm } = renderHold();

    press();
    hold(HOLD_MS);

    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(signed()).toBeVisible();
    expect(cta()).toHaveAttribute('href', '/comprehension');
    // The control is gone: there is nothing left to press, so there is nothing to press twice.
    expect(control()).toBeNull();
  });

  it('never emits a second time, however long the finger stays down', () => {
    const { onConfirm } = renderHold();

    press();
    hold(HOLD_MS * 4);

    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it('fills linearly on the way: a third of the hold is a third of the bar', () => {
    renderHold();

    press();
    expect(progress()).toBe(0);

    hold(HOLD_MS / 3);
    expect(progress()).toBeCloseTo(1 / 3, 5);

    hold(HOLD_MS / 3);
    expect(progress()).toBeCloseTo(2 / 3, 5);
  });
});

/* ------------------------------------------------------- and every way it does not */

describe('anything short of the duration does nothing at all', () => {
  it('does not confirm one step short — no tap-through past the hold', () => {
    const { onConfirm } = renderHold();

    press();
    hold(HOLD_MS - STEP_MS);

    expect(onConfirm).not.toHaveBeenCalled();
    expect(signed()).toBeNull();
    expect(control()).toBeVisible();
  });

  it('resets the bar to 0 when the finger lifts early, and keeps nothing', () => {
    const { onConfirm } = renderHold();

    press();
    hold(HOLD_MS / 2);
    expect(progress()).toBeCloseTo(0.5, 5);

    fireEvent.pointerUp(held());

    expect(progress()).toBe(0);
    expect(onConfirm).not.toHaveBeenCalled();
    // And the abandoned timer is really stopped, not merely hidden: time passes, nothing happens.
    hold(HOLD_MS);
    expect(onConfirm).not.toHaveBeenCalled();
    expect(progress()).toBe(0);
  });

  it('resets on pointerleave — a mouse that wanders off mid-press', () => {
    const { onConfirm } = renderHold();

    press();
    hold(HOLD_MS / 2);
    fireEvent.pointerLeave(held());

    expect(progress()).toBe(0);
    hold(HOLD_MS);
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('resets on pointercancel — the system taking the gesture away', () => {
    const { onConfirm } = renderHold();

    press();
    hold(HOLD_MS / 2);
    fireEvent.pointerCancel(held());

    expect(progress()).toBe(0);
    hold(HOLD_MS);
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it('never completes on taps, however many and however fast', () => {
    const { onConfirm } = renderHold();

    for (let tap = 0; tap < 20; tap += 1) {
      press();
      hold(STEP_MS * 2);
      fireEvent.pointerUp(held());
    }

    expect(onConfirm).not.toHaveBeenCalled();
    expect(progress()).toBe(0);
    expect(signed()).toBeNull();
  });

  it('ignores a plain click — the pointer has to stay down', () => {
    const { onConfirm } = renderHold();

    fireEvent.click(held());
    hold(HOLD_MS * 2);

    expect(onConfirm).not.toHaveBeenCalled();
    expect(signed()).toBeNull();
  });

  it('starts the next press from empty — half a hold is never banked', () => {
    const { onConfirm } = renderHold();

    press();
    hold(HOLD_MS - STEP_MS);
    fireEvent.pointerUp(held());

    // A fresh press one step short of the duration is still one step short.
    press();
    hold(HOLD_MS - STEP_MS);
    expect(onConfirm).not.toHaveBeenCalled();

    // The last step is this press's, not the previous one's.
    hold(STEP_MS);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });
});

/* -------------------------------------------------- reduced motion keeps the weight */

describe('prefers-reduced-motion drops the movement, never the duration', () => {
  /** A browser that reports "reduce" to everything that asks. */
  function reduceMotion(): void {
    vi.stubGlobal('matchMedia', (query: string) => ({
      matches: true,
      media: query,
      onchange: null,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      addListener: vi.fn(),
      removeListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));
  }

  it('still takes the whole duration, and a tap still passes nothing', () => {
    reduceMotion();
    const { onConfirm } = renderHold();

    // The tap first: under reduced motion a CSS-driven fill would already be full here.
    fireEvent.pointerDown(held());
    fireEvent.pointerUp(held());
    hold(HOLD_MS * 2);
    expect(onConfirm).not.toHaveBeenCalled();

    press();
    hold(HOLD_MS - STEP_MS);
    expect(onConfirm).not.toHaveBeenCalled();

    hold(STEP_MS);
    expect(onConfirm).toHaveBeenCalledTimes(1);
    expect(signed()).toBeVisible();
  });

  it('collapses the glide and the ✓ entrance, and nothing else', () => {
    // Read off the stylesheet: jsdom resolves neither CSS modules nor media queries, and the
    // claim is about what the block contains — the same reading `Tick.test.tsx` does (#98).
    const reduced = /@media \(prefers-reduced-motion: reduce\) \{([\s\S]*)\n\}/.exec(holdCss)?.[1];

    expect(reduced).toBeDefined();
    expect(reduced).toMatch(/transition:\s*none/);
    expect(reduced).toMatch(/animation:\s*none/);
    // No duration hides in the sheet for a media query to shorten: the hold is a timer, in
    // HoldToConfirm.tsx, and the only thing the fill's transition times is one 30ms step.
    expect(holdCss.replace(/\/\*[\s\S]*?\*\//g, '')).not.toMatch(/--motion-hold-total/);
  });
});

/* ------------------------------------------------------- the control, and its words */

describe('the control itself', () => {
  it('owns the gesture: touch-action none, so a hold is never a scroll', () => {
    // The token-free half of design/pwa-checklist.md §1, read off the sheet for the same reason
    // as above. `manipulation` — every other control's value — would let the page take the drag.
    const declarations = holdCss.replace(/\/\*[\s\S]*?\*\//g, '');

    expect(declarations).toMatch(/\.control\s*\{[^}]*touch-action:\s*none/);
  });

  it('is 56px of thumb: the design package’s own size for a press-and-hold', () => {
    const declarations = holdCss.replace(/\/\*[\s\S]*?\*\//g, '');

    expect(declarations).toMatch(/\.control\s*\{[^}]*min-height:\s*var\(--hold-height\)/);
  });

  it('grows the fill from the left, in step with the hold', () => {
    const declarations = holdCss.replace(/\/\*[\s\S]*?\*\//g, '');

    expect(declarations).toMatch(/\.fill\s*\{[^}]*transform-origin:\s*left/);
    expect(declarations).toMatch(/\.fill\s*\{[^}]*transform:\s*scaleX\(var\(--hold-progress/);
  });

  it('says the course’s own line, with the head’s ordinal in it', () => {
    renderHold();

    expect(control()).toBeVisible();
    // The fixture's placeholder never reaches the screen — the ordinal replaces it.
    expect(screen.queryByText(/\{ordinal\}/)).toBeNull();
    expect(held().textContent).toContain(ORDINAL);
  });

  it('is a control the learner can act on, and the only one until it is held', () => {
    renderHold();

    expect(screen.getAllByRole('button')).toHaveLength(1);
    expect(screen.queryAllByRole('link')).toEqual([]);
  });
});
