/**
 * The `/dev/type` specimen (#85) — that it is reachable in development, that it renders the
 * whole matrix the ticket specifies, and that it stays out of the product's IA.
 *
 * What jsdom cannot answer is the only question the page exists for: whether a glyph draws.
 * There are no fonts in jsdom, no rasteriser and no fallback chain, so every assertion here is
 * about the matrix being complete and correctly wired to the tokens — the glyphs themselves are
 * checked in a browser and written up in `docs/04-font-notes.md`.
 */
import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App.tsx';
import { resetContentCache } from '../course/content.ts';
import { resetManifestCache } from '../course/manifest.ts';
import { resetStringsCache } from '../course/strings.ts';
import { useAppStore } from '../state/store.ts';
import { DEV_MANIFEST, mockContentFetch } from '../test/courseManifest.ts';
import { SHELL_ROUTES } from '../shell/routes.tsx';
import { DEV_TYPE_PATH, devTypeRoute } from './typeRoute.tsx';

/** The ramp's four Devanagari steps and the three Mukta weights it renders (#113 trimmed 500). */
const SIZES = [18, 22, 26, 32];
const WEIGHTS = [400, 600, 700];

/** Built at runtime so this file's own source carries no Devanagari (`shellPurity.test.ts`). */
const LLA = String.fromCodePoint(0x933);
const KYA = String.fromCodePoint(0x915, 0x94d, 0x92f, 0x93e);

function cells(): HTMLElement[] {
  return screen.getAllByRole('list').filter((list) => list.dataset.face === 'devanagari');
}

async function renderSpecimen() {
  window.location.hash = `#${DEV_TYPE_PATH}`;
  mockContentFetch(DEV_MANIFEST);
  render(<App />);
  await screen.findByRole('heading', { name: 'type specimen' });
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

describe('the route', () => {
  it('exists in development — this suite runs with DEV set, as the dev server does', () => {
    expect(import.meta.env.DEV).toBe(true);
    expect(devTypeRoute).not.toBeNull();
  });

  it('renders at #/dev/type', async () => {
    await renderSpecimen();

    expect(screen.getByRole('heading', { name: 'type specimen' })).toBeInTheDocument();
  });

  it('renders outside the shell — a dev instrument gets no chrome to photograph', async () => {
    await renderSpecimen();

    expect(screen.queryByRole('navigation', { name: 'Primary' })).not.toBeInTheDocument();
  });

  it('is not a row of the product IA', () => {
    expect(SHELL_ROUTES.some((route) => route.path.startsWith('/dev'))).toBe(false);
  });
});

describe('the Devanagari matrix', () => {
  it('renders every size against every weight', async () => {
    await renderSpecimen();

    const matrix = cells().map((cell) => `${cell.dataset.size}/${cell.dataset.weight}`);

    expect(matrix).toEqual(SIZES.flatMap((size) => WEIGHTS.map((weight) => `${size}/${weight}`)));
  });

  it('starts at the 18px body-role floor', async () => {
    await renderSpecimen();

    expect(Math.min(...cells().map((cell) => Number(cell.dataset.size)))).toBe(18);
  });

  it('puts all fourteen specimens in every cell — a conjunct that only appears at 32px proves nothing', async () => {
    await renderSpecimen();

    for (const cell of cells()) {
      expect(cell.querySelectorAll('li')).toHaveLength(14);
    }
  });

  it('carries the letter and the conjuncts a Devanagari face gets wrong first', async () => {
    await renderSpecimen();

    const words = [...(cells()[0]?.querySelectorAll('li') ?? [])].map((item) => item.textContent);

    expect(words).toContain(LLA);
    expect(words).toContain(KYA);
  });

  it('marks the script for the browser, so shaping and line-breaking are Marathi rules', async () => {
    await renderSpecimen();

    for (const cell of cells()) expect(cell).toHaveAttribute('lang', 'mr');
  });
});

describe('the Latin specimens', () => {
  it('shows the romanization diacritics the PRD singles out [D15]', async () => {
    await renderSpecimen();

    for (const sample of ['ismī', 'ʾanā', 'ḥasan', 'ī ā ū ʿ ʾ']) {
      expect(screen.getAllByText(sample).length).toBeGreaterThan(0);
    }
  });

  it('renders them in Barlow at the one weight the ramp gives prose (#113)', async () => {
    await renderSpecimen();

    const weights = screen
      .getAllByRole('list')
      .filter((list) => list.dataset.face === 'body')
      .map((list) => Number(list.dataset.weight));

    expect(new Set(weights)).toEqual(new Set([400]));
  });

  it('shows the Barlow Condensed kickers and the wordmark weight', async () => {
    await renderSpecimen();

    const headings = [...document.querySelectorAll('[data-face="heading"]')];

    expect(headings).toHaveLength(4);
  });
});
