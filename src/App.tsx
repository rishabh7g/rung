import { BRAND } from './brand.ts';
import { CourseProvider, useCourse } from './course/CourseProvider.tsx';
import styles from './App.module.css';

/**
 * The app's root. Boot order is manifest → provider → screens (#79, PRD §8 F0): `CourseProvider`
 * owns the loading and content-error states, so everything it renders already has a course.
 */
export default function App() {
  return (
    <CourseProvider>
      <ScaffoldScreen />
    </CourseProvider>
  );
}

/**
 * Scaffold screen. It proves three things the rest of P1 builds on: design/tokens.css is loaded
 * (steel wordmark), Devanagari renders before Mukta is bundled, and the course layer resolved an
 * active course out of the emitted manifest. The real screens (Ladder, Module list, Detail)
 * replace this; learner-facing copy always comes from the course's strings.json, never from the
 * shell — the lines below are scaffolding, not copy.
 */
function ScaffoldScreen() {
  const { course, courses } = useCourse();

  return (
    <main className={styles.screen}>
      <h1 className={styles.wordmark}>{BRAND}</h1>
      {/* render check only — not learner-facing copy */}
      <p className={styles.devanagari} lang="mr">
        शिडी
      </p>
      <p className={styles.caption}>tokens loaded · Devanagari renders</p>
      <p className={styles.caption}>
        active course: {course.pairLabel} ({course.id}) · {courses.length} in this build
      </p>
    </main>
  );
}
