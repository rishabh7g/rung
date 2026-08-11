import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CourseProvider, useCourse } from './CourseProvider.tsx';
import { resetManifestCache } from './manifest.ts';
import { DEV_MANIFEST, STRICT_EMPTY_MANIFEST, mockManifestFetch } from '../test/courseManifest.ts';

/** Renders what the context holds, so a test can read the resolution the provider made. */
function CourseProbe() {
  const { course, courses, devBuild } = useCourse();

  return (
    <p>
      active {course.id} of {courses.length}
      {devBuild ? ' (dev build)' : ''}
    </p>
  );
}

beforeEach(() => {
  resetManifestCache();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('CourseProvider', () => {
  it('boots on the first manifest entry when nothing is persisted', async () => {
    mockManifestFetch(DEV_MANIFEST);

    render(
      <CourseProvider>
        <CourseProbe />
      </CourseProvider>,
    );

    expect(await screen.findByText(/active hi-mr of 3/)).toBeInTheDocument();
  });

  it('boots on the persisted course when it is still in the manifest', async () => {
    mockManifestFetch(DEV_MANIFEST);

    render(
      <CourseProvider persistedCourseId="en-ar">
        <CourseProbe />
      </CourseProvider>,
    );

    expect(await screen.findByText(/active en-ar of 3/)).toBeInTheDocument();
  });

  it('falls back to the first entry, with a warn, when the persisted course is gone', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    mockManifestFetch(DEV_MANIFEST);

    render(
      <CourseProvider persistedCourseId="fr-de">
        <CourseProbe />
      </CourseProvider>,
    );

    expect(await screen.findByText(/active hi-mr of 3/)).toBeInTheDocument();
    expect(warn).toHaveBeenCalledWith(expect.stringMatching(/"fr-de"/));
  });

  it('exposes the dev-build marker for a later banner, and nothing else changes', async () => {
    mockManifestFetch(DEV_MANIFEST);

    render(
      <CourseProvider>
        <CourseProbe />
      </CourseProvider>,
    );

    expect(await screen.findByText(/\(dev build\)/)).toBeInTheDocument();
  });

  it('reports devBuild false for a strict build', async () => {
    mockManifestFetch({ courses: DEV_MANIFEST.courses });

    render(
      <CourseProvider>
        <CourseProbe />
      </CourseProvider>,
    );

    expect(await screen.findByText(/active hi-mr of 3$/)).toBeInTheDocument();
  });

  it('shows the wordmark and nothing else while the manifest is in flight', () => {
    mockManifestFetch(DEV_MANIFEST);

    render(
      <CourseProvider>
        <CourseProbe />
      </CourseProvider>,
    );

    expect(screen.getByRole('main')).toHaveAttribute('aria-busy', 'true');
    expect(screen.queryByText(/active/)).not.toBeInTheDocument();
  });

  it('shows the content-error screen when the manifest cannot be fetched', async () => {
    vi.stubGlobal(
      'fetch',
      vi.fn(() => Promise.reject(new TypeError('Failed to fetch'))),
    );

    render(
      <CourseProvider>
        <CourseProbe />
      </CourseProvider>,
    );

    expect(await screen.findByRole('alert')).toHaveTextContent(/could not be fetched/);
    expect(screen.queryByText(/active/)).not.toBeInTheDocument();
  });

  it('shows the content-error screen for a strict build that shipped no courses', async () => {
    mockManifestFetch(STRICT_EMPTY_MANIFEST);

    render(
      <CourseProvider>
        <CourseProbe />
      </CourseProvider>,
    );

    expect(await screen.findByRole('alert')).toHaveTextContent(/declares no courses/);
  });

  it('surfaces a new course with no shell change — F0: a folder plus a manifest row', async () => {
    const withNewCourse = {
      ...DEV_MANIFEST,
      courses: [
        ...DEV_MANIFEST.courses,
        {
          id: 'en-fr',
          l1: 'English',
          l2: 'French',
          pairLabel: 'english → french',
          scriptMode: 'native',
          dir: 'ltr',
        },
      ],
    };
    mockManifestFetch(withNewCourse);

    render(
      <CourseProvider persistedCourseId="en-fr">
        <CourseProbe />
      </CourseProvider>,
    );

    expect(await screen.findByText(/active en-fr of 4/)).toBeInTheDocument();
  });
});

describe('useCourse', () => {
  it('throws when called above the provider — that is a wiring bug, not a state', () => {
    // A render that throws is noisy by design: React logs it, and jsdom reports the window
    // `error` event it rethrows on. Both are swallowed so a green run stays one line.
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const swallow = (event: ErrorEvent) => event.preventDefault();
    window.addEventListener('error', swallow);

    try {
      expect(() => render(<CourseProbe />)).toThrow(/inside <CourseProvider>/);
    } finally {
      window.removeEventListener('error', swallow);
    }
  });
});
