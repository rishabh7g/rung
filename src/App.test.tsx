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

    // Loading: the boot screen is up, the Ladder is not — no screen mounts without a course.
    expect(screen.queryByText(/LEVEL/)).not.toBeInTheDocument();
    // Then the Ladder, whose first line is the position kicker off the active course's ladder.
    expect(await screen.findByText(/LEVEL 1 · 0 OF 3/)).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith('/content/courses.json');
  });

  it('shows the content-error screen instead of the app when the manifest is broken', async () => {
    mockContentFetch({ courses: 'not an array' });

    render(<App />);

    expect(await screen.findByRole('alert')).toHaveTextContent(/no "courses" array/);
  });

  // The boot half of the Ladder (#86): the screen the app opens on reads its rungs out of the
  // active course's own levels.json. What the screen DOES with them is `LadderScreen.test.tsx`.
  it("lists the active course's L1 rungs, read from its own levels.json", async () => {
    const fetchMock = mockContentFetch(DEV_MANIFEST);

    render(<App />);

    expect(await screen.findByText('Who I am')).toBeInTheDocument();
    expect(screen.getByText('First exchange')).toBeInTheDocument();
    expect(screen.getByText(/Foundations — say what you need/)).toBeInTheDocument();
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

    // The ownership footer is the Ladder's own line and the shell has no copy of its own to
    // fall back on: what renders is whatever hi-mr's bundle ships, verbatim (PRD §4).
    expect(await screen.findByText(stringValue('hi-mr', 'ladder.ownership'))).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith('/content/hi-mr/strings.json');
  });
});
