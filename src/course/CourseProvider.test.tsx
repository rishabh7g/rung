import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { CourseProvider, useCourse } from './CourseProvider.tsx';
import { resetManifestCache } from './manifest.ts';
import { resetStringsCache, useStrings } from './strings.ts';
import { DEV_MANIFEST, STRICT_EMPTY_MANIFEST, mockContentFetch } from '../test/courseManifest.ts';
import { completeStrings, stringValue } from '../test/courseStrings.ts';
import { useAppStore } from '../state/store.ts';

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

/** The same, for the microcopy half: what a screen would render, from the bundle only. */
function StringsProbe() {
  const strings = useStrings();

  return <p>says {strings['retry.title']}</p>;
}

/** What a previous run left behind: the store IS the persisted course id (#82). */
function persistCourse(courseId: string): void {
  useAppStore.getState().setActiveCourse(courseId);
}

beforeEach(() => {
  resetManifestCache();
  resetStringsCache();
  useAppStore.getState()._reset();
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe('CourseProvider', () => {
  it('boots on the first manifest entry when nothing is persisted', async () => {
    mockContentFetch(DEV_MANIFEST);

    render(
      <CourseProvider>
        <CourseProbe />
      </CourseProvider>,
    );

    expect(await screen.findByText(/active hi-mr of 3/)).toBeInTheDocument();
  });

  it('boots on the persisted course when it is still in the manifest', async () => {
    mockContentFetch(DEV_MANIFEST);
    persistCourse('en-ar');

    render(
      <CourseProvider>
        <CourseProbe />
      </CourseProvider>,
    );

    expect(await screen.findByText(/active en-ar of 3/)).toBeInTheDocument();
  });

  it('falls back to the first entry, with a warn, when the persisted course is gone', async () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});
    mockContentFetch(DEV_MANIFEST);
    persistCourse('fr-de');

    render(
      <CourseProvider>
        <CourseProbe />
      </CourseProvider>,
    );

    expect(await screen.findByText(/active hi-mr of 3/)).toBeInTheDocument();
    expect(warn).toHaveBeenCalledWith(expect.stringMatching(/"fr-de"/));
  });

  it('exposes the dev-build marker for a later banner, and nothing else changes', async () => {
    mockContentFetch(DEV_MANIFEST);

    render(
      <CourseProvider>
        <CourseProbe />
      </CourseProvider>,
    );

    expect(await screen.findByText(/\(dev build\)/)).toBeInTheDocument();
  });

  it('reports devBuild false for a strict build', async () => {
    mockContentFetch({ courses: DEV_MANIFEST.courses });

    render(
      <CourseProvider>
        <CourseProbe />
      </CourseProvider>,
    );

    expect(await screen.findByText(/active hi-mr of 3$/)).toBeInTheDocument();
  });

  it('shows the wordmark and nothing else while the manifest is in flight', () => {
    mockContentFetch(DEV_MANIFEST);

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
    mockContentFetch(STRICT_EMPTY_MANIFEST);

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
          l1Tag: 'en',
          l2Tag: 'fr',
          pairLabel: 'english → french',
          scriptMode: 'native',
          dir: 'ltr',
        },
      ],
    };
    mockContentFetch(withNewCourse);
    persistCourse('en-fr');

    render(
      <CourseProvider>
        <CourseProbe />
      </CourseProvider>,
    );

    expect(await screen.findByText(/active en-fr of 4/)).toBeInTheDocument();
  });

  it("loads the active course's strings as part of boot, not after it", async () => {
    const fetchMock = mockContentFetch(DEV_MANIFEST);
    persistCourse('en-ar');

    render(
      <CourseProvider>
        <StringsProbe />
      </CourseProvider>,
    );

    // No screen mounts half-dressed: the first render below the provider already has the bundle.
    expect(screen.queryByText(/says/)).not.toBeInTheDocument();
    expect(
      await screen.findByText(`says ${stringValue('en-ar', 'retry.title')}`),
    ).toBeInTheDocument();
    expect(fetchMock).toHaveBeenCalledWith('/content/en-ar/strings.json');
  });

  it('shows the content-error screen when the bundle is missing a key — never a blank word', async () => {
    const gutted = completeStrings('hi-mr');
    delete gutted['cueLabel'];
    mockContentFetch(DEV_MANIFEST, gutted);

    render(
      <CourseProvider>
        <StringsProbe />
      </CourseProvider>,
    );

    expect(await screen.findByRole('alert')).toHaveTextContent(/no usable value for cueLabel/);
    expect(screen.queryByText(/says/)).not.toBeInTheDocument();
  });
});

describe('useCourse and useStrings', () => {
  it.each([
    ['useCourse', <CourseProbe key="course" />],
    ['useStrings', <StringsProbe key="strings" />],
  ])('%s throws when called above the provider — that is a wiring bug, not a state', (_, probe) => {
    // A render that throws is noisy by design: React logs it, and jsdom reports the window
    // `error` event it rethrows on. Both are swallowed so a green run stays one line.
    vi.spyOn(console, 'error').mockImplementation(() => {});
    const swallow = (event: ErrorEvent) => event.preventDefault();
    window.addEventListener('error', swallow);

    try {
      expect(() => render(probe)).toThrow(/inside <CourseProvider>/);
    } finally {
      window.removeEventListener('error', swallow);
    }
  });
});

describe('the persistence seam (#82)', () => {
  it('records the course it resolved on the first run, so the next boot restores it', async () => {
    mockContentFetch(DEV_MANIFEST);

    render(
      <CourseProvider>
        <CourseProbe />
      </CourseProvider>,
    );

    expect(await screen.findByText(/active hi-mr of 3/)).toBeInTheDocument();
    expect(useAppStore.getState().activeCourse).toBe('hi-mr');
  });

  it('gives the active course its per-course subtree, empty and idempotently', async () => {
    mockContentFetch(DEV_MANIFEST);
    persistCourse('en-ar');

    render(
      <CourseProvider>
        <CourseProbe />
      </CourseProvider>,
    );

    await screen.findByText(/active en-ar of 3/);
    expect(useAppStore.getState().courses['en-ar']).toEqual({
      modules: {},
      production: {},
      reviewQueue: [],
      sessionCount: 0,
      studied: {},
      session: null,
    });
  });

  it('never overwrites the stored id with a fallback — the missing course keeps its place', async () => {
    vi.spyOn(console, 'warn').mockImplementation(() => {});
    mockContentFetch(DEV_MANIFEST);
    persistCourse('en-es');
    useAppStore.getState().ensureCourse('en-es');
    // A build without --with-fixtures: en-es is gone from the manifest, not from the learner.
    mockContentFetch({ courses: [DEV_MANIFEST.courses[0]] });

    render(
      <CourseProvider>
        <CourseProbe />
      </CourseProvider>,
    );

    expect(await screen.findByText(/active hi-mr of 1/)).toBeInTheDocument();
    expect(useAppStore.getState().activeCourse).toBe('en-es');
    expect(useAppStore.getState().courses['en-es']).toBeDefined();
  });
});
