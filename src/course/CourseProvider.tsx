/**
 * Course provider (#79) — resolves the active course at boot and hands it to the whole app
 * (PRD §8 F0). Boot order is manifest → provider → screens: no screen mounts until there is a
 * course, so nothing downstream needs a "no course yet" branch.
 *
 * Everything course-shaped hangs off this: levels, strings, modules, the word index, and the
 * per-course slice of state. That is what makes the app course-agnostic — a screen asks for
 * `course`, never for hi-mr.
 */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { loadManifest, resolveActiveCourse, type Course } from './manifest.ts';
import { loadStrings, StringsContext, type Strings } from './strings.ts';
import { BootLoadingScreen, ContentErrorScreen } from './BootScreens.tsx';

export interface CourseContextValue {
  /** The active course. Never null below the provider — that is the point of the boot gate. */
  course: Course;
  /** Every course in this build, in manifest order. The P4 Settings dropdown renders from it. */
  courses: readonly Course[];
  /** True when the bundle was built with a relaxed content gate. A later ticket shows a banner. */
  devBuild: boolean;
}

const CourseContext = createContext<CourseContextValue | null>(null);

/** The course layer's read handle. Throws when called above the provider — a wiring bug. */
export function useCourse(): CourseContextValue {
  const value = useContext(CourseContext);
  if (value === null) {
    throw new Error('useCourse() must be called inside <CourseProvider>');
  }
  return value;
}

interface CourseProviderProps {
  children: ReactNode;
  /**
   * SEAM — #82 (state store) wires this up.
   *
   * The store does not exist yet, so the provider is NOT coupled to persistence: it takes the
   * previously active course id as a prop and defaults to undefined, which resolves to the first
   * manifest entry. When #82 lands, read `state.activeCourse` and pass it here (or read it inside
   * this component and drop the prop) — the resolution rule itself is already done and tested in
   * `resolveActiveCourse`, so nothing below this line has to change.
   */
  persistedCourseId?: string;
}

type BootState =
  | { status: 'loading' }
  | { status: 'ready'; value: CourseContextValue; strings: Strings }
  | { status: 'error'; detail: string };

export function CourseProvider({ children, persistedCourseId }: CourseProviderProps) {
  const [boot, setBoot] = useState<BootState>({ status: 'loading' });

  useEffect(() => {
    let cancelled = false;

    void (async () => {
      try {
        const { courses, devBuild } = await loadManifest();
        const course = resolveActiveCourse(courses, persistedCourseId);
        // Strings are part of BOOT, not of the first screen that wants a word (#80): the shell
        // owns no copy, so a screen mounted without its bundle would have nothing to render.
        const strings = await loadStrings(course.id);
        if (!cancelled) {
          setBoot({ status: 'ready', value: { course, courses, devBuild }, strings });
        }
      } catch (error) {
        // Every failure below the manifest is one screen: the content layer did not load.
        if (!cancelled) setBoot({ status: 'error', detail: describe(error) });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [persistedCourseId]);

  if (boot.status === 'loading') return <BootLoadingScreen />;
  if (boot.status === 'error') return <ContentErrorScreen detail={boot.detail} />;

  // Two contexts, one provider: `useCourse()` answers "which course", `useStrings()` answers
  // "in whose words". They are filled by the same boot, so a screen never has one without
  // the other, and neither hook needs a null branch.
  return (
    <CourseContext.Provider value={boot.value}>
      <StringsContext.Provider value={boot.strings}>{children}</StringsContext.Provider>
    </CourseContext.Provider>
  );
}

function describe(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
