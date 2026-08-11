/**
 * Course provider (#79) — resolves the active course at boot and hands it to the whole app
 * (PRD §8 F0). Boot order is manifest → provider → screens: no screen mounts until there is a
 * course, so nothing downstream needs a "no course yet" branch.
 *
 * Everything course-shaped hangs off this: levels, strings, modules, the word index, and the
 * per-course slice of state. That is what makes the app course-agnostic — a screen asks for
 * `course`, never for hi-mr.
 *
 * It is also where persistence meets the manifest (#82): the active course comes out of the
 * store, is resolved against the courses this build actually shipped, and is written back only
 * on the first run — never when resolution had to fall back (Invariant 8).
 */
import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { loadManifest, resolveActiveCourse, type Course } from './manifest.ts';
import { loadStrings, StringsContext, type Strings } from './strings.ts';
import { BootLoadingScreen, ContentErrorScreen } from './BootScreens.tsx';
import { useAppStore } from '../state/store.ts';

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
}

type BootState =
  | { status: 'loading' }
  | { status: 'ready'; value: CourseContextValue; strings: Strings }
  | { status: 'error'; detail: string };

export function CourseProvider({ children }: CourseProviderProps) {
  const [boot, setBoot] = useState<BootState>({ status: 'loading' });
  // The seam #79 left open, closed by #82: the previously active course is persisted state.
  // Subscribing rather than reading once is what makes a switch work — `setActiveCourse` (the
  // P4 flow, #106) re-runs this effect, so the new course's strings and content boot with it.
  const storedCourseId = useAppStore((state) => state.activeCourse);

  useEffect(() => {
    let cancelled = false;
    // `''` is the store's first-run value — nothing has been chosen yet, which is exactly
    // `resolveActiveCourse`'s "no persisted id" case (and not a course that went missing).
    const persistedCourseId = storedCourseId === '' ? undefined : storedCourseId;

    void (async () => {
      try {
        const { courses, devBuild } = await loadManifest();
        const course = resolveActiveCourse(courses, persistedCourseId);
        // Strings are part of BOOT, not of the first screen that wants a word (#80): the shell
        // owns no copy, so a screen mounted without its bundle would have nothing to render.
        const strings = await loadStrings(course.id);
        if (cancelled) return;

        const { ensureCourse, setActiveCourse } = useAppStore.getState();
        // Idempotent, so this is a no-op from the second boot on: the active course simply
        // always has somewhere to write (#83, #95, #96).
        ensureCourse(course.id);
        // First run only. A FALLBACK never writes: when a persisted course is missing from this
        // build, `resolveActiveCourse` warns and returns another one, and the stored id stays
        // exactly where it is — so the course keeps its position and gets it back when its
        // content returns (Invariant 8).
        if (persistedCourseId === undefined) setActiveCourse(course.id);

        setBoot({ status: 'ready', value: { course, courses, devBuild }, strings });
      } catch (error) {
        // Every failure below the manifest is one screen: the content layer did not load.
        if (!cancelled) setBoot({ status: 'error', detail: describe(error) });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [storedCourseId]);

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
