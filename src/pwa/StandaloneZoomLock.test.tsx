import { render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { StandaloneZoomLock } from './StandaloneZoomLock.tsx';

/** What `index.html` ships — the string the lock has to amend, not replace. */
const STATIC_TAG = 'width=device-width, initial-scale=1, viewport-fit=cover';

function viewportMeta(): HTMLMetaElement {
  const meta = document.querySelector<HTMLMetaElement>('meta[name="viewport"]');
  if (!meta) throw new Error('viewport meta tag missing from the test document');
  return meta;
}

/**
 * jsdom has no matchMedia; this is the only browser input the component reads. A real
 * `MediaQueryList`'s own `.matches` updates before its `change` listeners fire — this stub does
 * the same, so `fire` behaves like a real display-mode change rather than a bare event.
 */
function stubDisplayMode(standalone: boolean): {
  fire: (matches: boolean) => void;
} {
  const listeners = new Set<(event: { matches: boolean }) => void>();
  const list = {
    matches: standalone,
    addEventListener: (_type: string, listener: (event: { matches: boolean }) => void) => {
      listeners.add(listener);
    },
    removeEventListener: (_type: string, listener: (event: { matches: boolean }) => void) => {
      listeners.delete(listener);
    },
  };
  vi.stubGlobal(
    'matchMedia',
    vi.fn((query: string) => (query === '(display-mode: standalone)' ? list : { matches: false })),
  );
  return {
    fire: (matches: boolean) => {
      list.matches = matches;
      listeners.forEach((listener) => listener({ matches }));
    },
  };
}

beforeEach(() => {
  const meta = document.createElement('meta');
  meta.name = 'viewport';
  meta.content = STATIC_TAG;
  document.head.appendChild(meta);
});

afterEach(() => {
  viewportMeta().remove();
  vi.unstubAllGlobals();
});

describe('StandaloneZoomLock (#250)', () => {
  it('locks zoom from a home-screen launch — while keeping viewport-fit=cover', () => {
    stubDisplayMode(true);

    render(<StandaloneZoomLock />);

    const { content } = viewportMeta();
    expect(content).toContain('user-scalable=no');
    expect(content).toContain('maximum-scale=1');

    // THE ASSERTION THAT MATTERS. viewport-fit=cover is what turns env(safe-area-inset-*) on;
    // losing it silently regresses the header's notch padding and the nav's safe area in exactly
    // the mode this component acts on. A lock that wrote a hardcoded content string would pass
    // every other assertion here and fail this one.
    expect(content).toContain('viewport-fit=cover');
    expect(content).toContain('width=device-width');
    expect(content).toContain('initial-scale=1');
  });

  it('leaves a browser tab viewport alone', () => {
    stubDisplayMode(false);

    render(<StandaloneZoomLock />);

    expect(viewportMeta().content).toBe(STATIC_TAG);
  });

  it('running the sync twice in standalone leaves exactly one copy of each directive', () => {
    const { fire } = stubDisplayMode(true);

    render(<StandaloneZoomLock />);
    fire(true);
    fire(true);

    const { content } = viewportMeta();
    const directives = content.split(',').map((directive) => directive.trim());
    expect(directives.filter((directive) => directive === 'user-scalable=no')).toHaveLength(1);
    expect(directives.filter((directive) => directive === 'maximum-scale=1')).toHaveLength(1);
  });

  it('lifts the lock on a display-mode change back to a browser tab', () => {
    const { fire } = stubDisplayMode(true);

    render(<StandaloneZoomLock />);
    expect(viewportMeta().content).toContain('user-scalable=no');

    fire(false);

    expect(viewportMeta().content).toBe(STATIC_TAG);
  });

  it('leaves the tag as it found it on unmount, never stranding the app zoom-locked', () => {
    stubDisplayMode(true);

    const { unmount } = render(<StandaloneZoomLock />);
    expect(viewportMeta().content).toContain('user-scalable=no');

    unmount();

    expect(viewportMeta().content).toBe(STATIC_TAG);
  });
});
