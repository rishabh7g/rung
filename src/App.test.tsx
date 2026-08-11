import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App.tsx';
import { BRAND } from './brand.ts';
import { resetContentCache } from './course/content.ts';
import { resetManifestCache } from './course/manifest.ts';
import { resetStringsCache } from './course/strings.ts';
import { DEV_MANIFEST, mockContentFetch } from './test/courseManifest.ts';
import { stringValue } from './test/courseStrings.ts';

beforeEach(() => {
  resetContentCache();
  resetManifestCache();
  resetStringsCache();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('App', () => {
  it('renders the wordmark from the single brand constant', async () => {
    mockContentFetch(DEV_MANIFEST);

    render(<App />);

    expect(await screen.findByRole('heading', { level: 1, name: BRAND })).toBeInTheDocument();
  });

  it('boots manifest → provider → screen: no screen renders before a course is resolved', async () => {
    const fetchMock = mockContentFetch(DEV_MANIFEST);

    render(<App />);

    // Loading: the shell is up, the screen is not.
    expect(screen.queryByText(/active course/)).not.toBeInTheDocument();
    expect(
      await screen.findByText(/active course: hindi → marathi \(hi-mr\) · 3 in this build/),
    ).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith('/content/courses.json');
  });

  it('shows the content-error screen instead of the app when the manifest is broken', async () => {
    mockContentFetch({ courses: 'not an array' });

    render(<App />);

    expect(await screen.findByRole('alert')).toHaveTextContent(/no "courses" array/);
  });

  // SMOKE (#81) — these two go with the wiring the Ladder ticket (#86) replaces.
  it("lists the active course's L1 rungs, read from its own levels.json", async () => {
    const fetchMock = mockContentFetch(DEV_MANIFEST);

    render(<App />);

    expect(await screen.findByText('Who I am')).toBeInTheDocument();
    expect(screen.getByText('First exchange')).toBeInTheDocument();
    expect(screen.getByText(/Foundations · 2 of 3 rungs have content/)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith('/content/hi-mr/levels.json');
  });

  it('shows the content-error screen when the ladder is broken, not a blank rung list', async () => {
    mockContentFetch(DEV_MANIFEST, undefined, { levels: { courseId: 'hi-mr' } });

    render(<App />);

    expect(await screen.findByRole('alert')).toHaveTextContent(/levels: must be a non-empty array/);
  });

  it("renders the active course's own microcopy, interpolated — the shell supplies none", async () => {
    const fetchMock = mockContentFetch(DEV_MANIFEST);

    render(<App />);

    const ordinal = stringValue('hi-mr', 'ordinal').replace('{n}', '3');
    expect(
      await screen.findByText(`${stringValue('hi-mr', 'cueLabel')} · ${ordinal}`),
    ).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith('/content/hi-mr/strings.json');
  });
});
