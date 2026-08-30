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
import { stringValue } from '../test/courseStrings.ts';
import {
  COMPREHENSION_PATH,
  handover,
  RITUAL_PATH,
  SHELL_ROUTES,
  VERDICT_PATH,
} from './routes.tsx';

/**
 * Renders the app at `hash` and waits for boot — no screen mounts before there is a course.
 *
 * `state` seeds the history entry's location state, which is what the exit ritual's hand-over
 * travels in (#102): `history.state.usr` is where the browser keeps it and where React Router
 * reads it back, so this is the entry the hold's own `<Link state=…>` would have written —
 * without walking the ~900ms arc inside a test about the shell's frame. It is set AFTER the hash,
 * because changing the hash is itself a navigation and would drop it.
 */
async function renderAt(hash: string, state?: unknown) {
  window.location.hash = hash;
  if (state !== undefined) window.history.replaceState({ usr: state, key: 'seed', idx: 0 }, '');
  mockContentFetch(DEV_MANIFEST);
  render(<App />);
  await screen.findByRole('main');
}

/**
 * What a route in this table needs before it will mount: the exit ritual's two screens belong to
 * a rung that is produced out (#100), and part 2 is only ever entered from part 1's completed
 * hold (#102). Anything else in the table mounts on its own.
 */
function precondition(path: string): unknown {
  if (path !== RITUAL_PATH && path !== COMPREHENSION_PATH && path !== VERDICT_PATH) {
    return undefined;
  }
  produceRung();
  if (path === COMPREHENSION_PATH) return handover('hold');
  // The Verdict is where the comprehension leaves you (#103), and arriving there passes the rung.
  return path === VERDICT_PATH ? handover('comprehension') : undefined;
}

/**
 * Starts a real session from the Practice hub (#96) — the control that raises the immersive flag.
 * With no rung passed the review queue is empty, so the hub offers "Begin — Read first"; the label
 * comes from the course's own bundle, as every learner-facing word does.
 */
async function beginSession(): Promise<void> {
  fireEvent.click(
    await screen.findByRole('button', { name: stringValue('hi-mr', 'practice.beginRead') }),
  );
}

/**
 * The current rung, produced out — the one precondition a route in this table has (#100). The exit
 * ritual belongs to a rung whose every sentence has been self-marked got-it twice, and a deep link
 * into it while the rung is not lands on that rung's module instead. Seeding the counters (through
 * the store's one writer, as the app itself does) is what keeps these cases about the shell.
 */
function produceRung(): void {
  const store = useAppStore.getState();
  store.ensureCourse('hi-mr');
  for (const sentenceId of ['L1-M1-S01', 'L1-M1-S02']) {
    store.recordProduction('hi-mr', sentenceId);
    store.recordProduction('hi-mr', sentenceId);
  }
}

/**
 * The three tab labels, in nav order — the fixture bundle's values, because the nav's words are
 * the course's now (`nav.*`, #351) and a test that spelled them in English would be asserting
 * against the one thing that ticket removed.
 */
const TAB_LABELS = ['nav.ladder', 'nav.practice', 'nav.settings'].map((key) =>
  stringValue('hi-mr', key),
);

/** The tab links, in nav order — scoped to the nav, because screens have links of their own. */
function tabs(): string[] {
  return within(screen.getByRole('navigation', { name: stringValue('hi-mr', 'a11y.primaryNav') }))
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

    expect(
      screen.getByRole('navigation', { name: stringValue('hi-mr', 'a11y.primaryNav') }),
    ).toBeInTheDocument();
    expect(tabs()).toEqual(TAB_LABELS);
  });

  it('routes to each tab, and marks the one you are on', async () => {
    await renderAt('#/');
    const [ladder, practice, settings] = TAB_LABELS;
    expect(screen.getByRole('link', { name: ladder })).toHaveAttribute('aria-current', 'page');

    fireEvent.click(screen.getByRole('link', { name: practice }));
    expect(await screen.findByText(stringValue('hi-mr', 'practice.hubTitle'))).toBeInTheDocument();
    expect(screen.getByRole('link', { name: practice })).toHaveAttribute('aria-current', 'page');
    expect(screen.getByRole('link', { name: ladder })).not.toHaveAttribute('aria-current');

    fireEvent.click(screen.getByRole('link', { name: settings }));
    expect(
      await screen.findByRole('heading', { name: stringValue('hi-mr', 'settings.title') }),
    ).toBeInTheDocument();

    fireEvent.click(screen.getByRole('link', { name: ladder }));
    expect(await screen.findByRole('heading', { level: 1, name: BRAND })).toBeInTheDocument();
  });

  it('is icon-only, but every tab is still reachable by its accessible name and carries a title (#245)', async () => {
    await renderAt('#/');

    for (const label of TAB_LABELS) {
      const link = screen.getByRole('link', { name: label });
      expect(link).toHaveAttribute('title', label);
    }
  });
});

describe('routes', () => {
  it.each(SHELL_ROUTES.map((route) => route.path))('mounts a screen at %s', async (path) => {
    // Sentence Detail reads its module back out of the id (#89), so `:id` there is a sentence's
    // id and not a module's — an id that names no module is a route that redirects, which is the
    // one thing this case must not do.
    const hash = `#${path.replace('/sentence/:id', '/sentence/L1-M1-S01').replace(':id', 'L1-M1')}`;

    await renderAt(hash, precondition(path));

    // Something rendered, and it was not the redirect: the location is still where we asked.
    expect(screen.getByRole('main')).not.toBeEmptyDOMElement();
    expect(window.location.hash).toBe(hash);
    expect(
      screen.getByRole('navigation', { name: stringValue('hi-mr', 'a11y.primaryNav') }),
    ).toBeInTheDocument();
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
    ['#/ritual', 'Exit ritual'],
    ['#/comprehension', 'Comprehension'],
    ['#/verdict', 'Verdict'],
  ])('%s is a child screen with a back header', async (hash, title) => {
    await renderAt(hash, precondition(hash.slice(1)));

    expect(screen.getByRole('heading', { level: 1, name: title })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Back to the ladder' })).toBeInTheDocument();
  });

  it('takes Sentence Detail back to its module, not to the Ladder (#89)', async () => {
    await renderAt('#/sentence/L1-M1-S02');

    expect(screen.getByRole('heading', { level: 1, name: 'Sentence' })).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Back to the ladder' })).not.toBeInTheDocument();

    fireEvent.click(screen.getByRole('button', { name: 'Back to the module' }));

    expect(window.location.hash).toBe('#/module/L1-M1');
  });

  it('sends a sentence id that names no module back to the Ladder', async () => {
    // `/sentence/S1` is a real thing a deep link can carry: the screen refuses it, and the
    // chevron the shell drew on the way there points at the Ladder rather than at nothing.
    await renderAt('#/sentence/S1');

    expect(await screen.findByRole('heading', { level: 1, name: BRAND })).toBeInTheDocument();
    expect(window.location.hash).toBe('#/');
  });
});

describe('immersive mode', () => {
  it('hides the nav entirely and always offers the pause ✕', async () => {
    await renderAt('#/practice');
    expect(
      screen.getByRole('navigation', { name: stringValue('hi-mr', 'a11y.primaryNav') }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: stringValue('hi-mr', 'a11y.pauseSession') }),
    ).not.toBeInTheDocument();

    await beginSession();

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    expect(screen.queryByRole('link')).not.toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: stringValue('hi-mr', 'a11y.pauseSession') }),
    ).toBeInTheDocument();
    // No brand, no back chevron — the ✕ is the only chrome a session has.
    expect(screen.queryByRole('heading', { level: 1 })).not.toBeInTheDocument();
  });

  it('pauses back to the Practice hub, nav and all', async () => {
    await renderAt('#/practice');
    await beginSession();

    fireEvent.click(
      screen.getByRole('button', { name: stringValue('hi-mr', 'a11y.pauseSession') }),
    );

    expect(await screen.findByText(stringValue('hi-mr', 'practice.hubTitle'))).toBeInTheDocument();
    // The hub, with the session it just left still standing: since #99 the CTA slot holds the
    // resume plate rather than Begin, because pausing keeps the learner's place.
    expect(
      screen.getByRole('button', { name: stringValue('hi-mr', 'practice.resumeContinue') }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('navigation', { name: stringValue('hi-mr', 'a11y.primaryNav') }),
    ).toBeInTheDocument();
    expect(window.location.hash).toBe('#/practice');
  });

  it('ends with the route — the back button cannot walk out of a session and hide the nav', async () => {
    await renderAt('#/practice');
    await beginSession();
    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();

    window.location.hash = '#/settings';

    await waitFor(() => {
      expect(
        screen.getByRole('navigation', { name: stringValue('hi-mr', 'a11y.primaryNav') }),
      ).toBeInTheDocument();
    });
    expect(
      screen.queryByRole('button', { name: stringValue('hi-mr', 'a11y.pauseSession') }),
    ).not.toBeInTheDocument();
  });
});
