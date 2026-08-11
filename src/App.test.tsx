import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from './App.tsx';
import { BRAND } from './brand.ts';
import { resetManifestCache } from './course/manifest.ts';
import { DEV_MANIFEST, mockManifestFetch } from './test/courseManifest.ts';

beforeEach(() => {
  resetManifestCache();
});

afterEach(() => {
  vi.unstubAllGlobals();
});

describe('App', () => {
  it('renders the wordmark from the single brand constant', async () => {
    mockManifestFetch(DEV_MANIFEST);

    render(<App />);

    expect(await screen.findByRole('heading', { level: 1, name: BRAND })).toBeInTheDocument();
  });

  it('boots manifest → provider → screen: no screen renders before a course is resolved', async () => {
    const fetchMock = mockManifestFetch(DEV_MANIFEST);

    render(<App />);

    // Loading: the shell is up, the screen is not.
    expect(screen.queryByText(/active course/)).not.toBeInTheDocument();
    expect(
      await screen.findByText(/active course: hindi → marathi \(hi-mr\) · 3 in this build/),
    ).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith('/content/courses.json');
  });

  it('shows the content-error screen instead of the app when the manifest is broken', async () => {
    mockManifestFetch({ courses: 'not an array' });

    render(<App />);

    expect(await screen.findByRole('alert')).toHaveTextContent(/no "courses" array/);
  });
});
