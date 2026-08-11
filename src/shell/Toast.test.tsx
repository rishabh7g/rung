/**
 * The toast (#86) — the timer and the live region, apart from the screen that raises one.
 *
 * `LadderScreen.test.tsx` proves the sealed-cell tap says the right thing; this proves the
 * control underneath it behaves: it holds a message for `TOAST_DURATION_MS` and then stops
 * holding it, a second message replaces the first rather than queueing behind it, and the region
 * a screen reader is watching exists before there is anything in it. #106 reuses all three.
 */
import { act, render, renderHook, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { TOAST_DURATION_MS, Toast, useToast } from './Toast.tsx';

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

/** The hook and the component wired the way a screen wires them. */
function renderToast() {
  const hook = renderHook(() => useToast());
  const view = render(<Toast message={hook.result.current.message} />);

  return {
    show: (message: string) => act(() => hook.result.current.show(message)),
    dismiss: () => act(() => hook.result.current.dismiss()),
    rerender: () => view.rerender(<Toast message={hook.result.current.message} />),
    unmount: () => hook.unmount(),
  };
}

describe('Toast', () => {
  it('is a live region before it has anything to say', () => {
    render(<Toast message={null} />);

    const region = screen.getByRole('status');
    expect(region).toBeInTheDocument();
    expect(region).toHaveAttribute('aria-live', 'polite');
    expect(region).toBeEmptyDOMElement();
  });

  it('shows a message and clears itself when the time is up', () => {
    const toast = renderToast();

    toast.show('sealed — 8 rungs left');
    toast.rerender();
    expect(screen.getByRole('status')).toHaveTextContent('sealed — 8 rungs left');

    act(() => vi.advanceTimersByTime(TOAST_DURATION_MS));
    toast.rerender();
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  it('replaces a message rather than queueing behind it, and restarts the clock', () => {
    const toast = renderToast();

    toast.show('first');
    act(() => vi.advanceTimersByTime(TOAST_DURATION_MS - 100));
    toast.show('second');
    toast.rerender();

    expect(screen.getByRole('status')).toHaveTextContent('second');

    // The first message's timer would have fired by now; it was cleared, not left running.
    act(() => vi.advanceTimersByTime(200));
    toast.rerender();
    expect(screen.getByRole('status')).toHaveTextContent('second');

    act(() => vi.advanceTimersByTime(TOAST_DURATION_MS));
    toast.rerender();
    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  it('clears on demand', () => {
    const toast = renderToast();

    toast.show('sealed');
    toast.dismiss();
    toast.rerender();

    expect(screen.getByRole('status')).toBeEmptyDOMElement();
  });

  it('does not leave a timer pointing at an unmounted screen', () => {
    const toast = renderToast();
    toast.show('sealed');

    toast.unmount();

    expect(() => act(() => vi.advanceTimersByTime(TOAST_DURATION_MS))).not.toThrow();
  });
});
