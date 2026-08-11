/**
 * The shell's behaviour (#84): the three tabs and where they go, the immersive rule, the back
 * headers, and the unknown route.
 *
 * Everything renders the real `<App />` rather than a hand-wired router, because the wiring IS
 * the ticket — a test that built its own `<Routes>` could pass while the app's table said
 * something else. The content layer is mocked at `fetch`, the way every boot test here does it.
 *
 * The layout half of the ticket — safe areas, the scroll column, tokens-only — is checked in
 * `layout.test.ts`: jsdom resolves neither `env()` nor `max()`, so the browser is where a
 * computed padding means anything, and the CSS source is where the rule can be pinned.
 */
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App.tsx';
import { BRAND } from '../brand.ts';
import { resetContentCache } from '../course/content.ts';
import { resetManifestCache } from '../course/manifest.ts';
import { resetStringsCache } from '../course/strings.ts';
import { useAppStore } from '../state/store.ts';
import { DEV_MANIFEST, mockContentFetch } from '../test/courseManifest.ts';
import { SHELL_ROUTES } from './routes.tsx';

/** Renders the app at `hash` and waits for boot — no screen mounts before there is a course. */
async function renderAt(hash: string) {
  window.location.hash = hash;
  mockContentFetch(DEV_MANIFEST);
  render(<App />);
  await screen.findByRole('main');
}

/** The tab links, in nav order — scoped to the nav, because screens have links of their own. */
function tabs(): string[] {
  return within(screen.getByRole('navigation', { name: 'Primary' }))
    .getAllByRole('link')
    .map((link) => link.textContent ?? '');
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

describe('bottom nav', () => {
  it('renders exactly the three tabs of the IA', async () => {
    await renderAt('#/');

    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
    expect(tabs()).toEqual(['Ladder', 'Practice', 'Settings']);
  });

  it('routes to each tab, and marks the one you are on', async () => {
    await renderAt('#/');
    expect(screen.getByRole('link', { name: 'Ladder' })).toHaveAttribute('aria-current', 'page');

    fireEvent.click(screen.getByRole('link', { name: 'Practice' }));
    expect(await screen.findByText('Screen stub — built in #96.')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Practice' })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: 'Ladder' })).not.toHaveAttribute('aria-current');

    fireEvent.click(screen.getByRole('link', { name: 'Settings' }));
    expect(await screen.findByText('Screen stub — built in #105.')).toBeInTheDocument();

    fireEvent.click(screen.getByRole('link', { name: 'Ladder' }));
    expect(await screen.findByRole('heading', { level: 1, name: BRAND })).toBeInTheDocument();
  });
});

describe('routes', () => {
  it.each(SHELL_ROUTES.map((route) => route.path))('mounts a screen at %s', async (path) => {
    const hash = `#${path.replace(':id', 'L1-M1')}`;

    await renderAt(hash);

    // Something rendered, and it was not the redirect: the location is still where we asked.
    expect(screen.getByRole('main')).not.toBeEmptyDOMElement();
    expect(window.location.hash).toBe(hash);
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
  });

  it('sends an unknown route to the Ladder, replacing it', async () => {
    await renderAt('#/nowhere');

    expect(await screen.findByRole('heading', { level: 1, name: BRAND })).toBeInTheDocument();
    expect(window.location.hash).toBe('#/');
  });
});

describe('headers', () => {
  it('wears the brand — mark + wordmark — on the three tabs', async () => {
    await renderAt('#/');

    const heading = screen.getByRole('heading', { level: 1, name: BRAND });
    // The rails mark rides inside the wordmark's heading and is hidden from the a11y tree.
    expect(heading.querySelector('svg')).toHaveAttribute('aria-hidden', 'true');
  });

  it('wears a back header on the children of a rung, and it goes to the Ladder', async () => {
    await renderAt('#/module/L1-M1');

    expect(screen.getByRole('heading', { level: 1, name: 'Module' })).toBeInTheDocument();
    expect(screen.queryByRole('heading', { level: 1, name: BRAND })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Back to the ladder' }));

    expect(await screen.findByRole('heading', { level: 1, name: BRAND })).toBeInTheDocument();
    expect(window.location.hash).toBe('#/');
  });

  it.each([
    ['#/sentence/S1', 'Sentence'],
    ['#/ritual', 'Exit ritual'],
    ['#/comprehension', 'Comprehension'],
    ['#/verdict', 'Verdict'],
  ])('%s is a child screen with a back header', async (hash, title) => {
    await renderAt(hash);

    expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back to the ladder' })).toBeInTheDocument();
  });
});

describe('immersive mode', () => {
  it('hides the nav entirely and always offers the pause ✕', async () => {
    await renderAt('#/practice');
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Pause session' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Start a session' }));

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pause session' })).toBeInTheDocument();
    // No brand, no back chevron — the ✕ is the only chrome a session has.
    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
  });

  it('pauses back to the Practice hub, nav and all', async () => {
    await renderAt('#/practice');
    fireEvent.click(screen.getByRole('button', { name: 'Start a session' }));

    fireEvent.click(screen.getByRole('button', { name: 'Pause session' }));

    expect(await screen.findByRole('button', { name: 'Start a session' })).toBeInTheDocument();
    expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
    expect(window.location.hash).toBe('#/practice');
  });

  it('ends with the route — the back button cannot walk out of a session and hide the nav', async () => {
    await renderAt('#/practice');
    fireEvent.click(screen.getByRole('button', { name: 'Start a session' }));
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();

    window.location.hash = '#/settings';

    await waitFor(() => {
      expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
    });
    expect(screen.queryByRole('button', { name: 'Pause session' })).not.toBeInTheDocument();
  });
});
