import { BRAND } from './brand.ts';
import { CourseProvider, useCourse } from './course/CourseProvider.tsx';
import { interpolate, useStrings } from './course/strings.ts';
import { useLevels } from './course/content.ts';
import { ContentErrorScreen } from './course/BootScreens.tsx';
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
 * (steel wordmark), the course layer resolved an active course out of the emitted manifest, and
 * that course's microcopy loaded — the two lines below come from `strings.json` through
 * `useStrings()`, which is the ONLY way a learner-facing word reaches the screen (#80, PRD §4).
 * The script rendering here is the course's, not the shell's: `src/` carries no Devanagari at all
 * (`shellPurity.test.ts`), and the font stack itself gets its own page in #85.
 *
 * The real screens (Ladder, Module list, Detail) replace this; the English captions are
 * scaffolding, not copy.
 */
function ScaffoldScreen() {
  const { course, courses } = useCourse();
  const strings = useStrings();
  // SMOKE (#81) — replaced by Ladder (#86). The ladder is what levels.json is for; listing L1's
  // rungs here proves the loader reads the active course's file and the hook hands over a value.
  const levels = useLevels();

  // The content layer failing is one screen, wherever it fails: the provider shows this when the
  // manifest or the strings bundle is broken, and a missing ladder is the same answer (#79).
  if (levels.error !== null) return <ContentErrorScreen detail={levels.error.message} />;

  const first = levels.data?.levels[0];

  return (
    <main className={styles.screen}>
      <h1 className={styles.wordmark}>{BRAND}</h1>
      <p className={styles.courseString} dir={course.dir}>
        {strings.cueLabel} · {interpolate(strings.ordinal, { n: 3 })}
      </p>
      <p className={styles.caption}>tokens loaded · course strings render</p>
      <p className={styles.caption}>
        active course: {course.pairLabel} ({course.id}) · {courses.length} in this build
      </p>
      {first !== undefined && (
        <>
          <p className={styles.caption}>
            {first.name} · {first.modules.filter((module) => module.hasContent).length} of{' '}
            {first.modules.length} rungs have content
          </p>
          <ol className={styles.rungs} dir={course.dir}>
            {first.modules.map((module) => (
              <li key={module.id}>{module.title}</li>
            ))}
          </ol>
        </>
      )}
    </main>
  );
}
