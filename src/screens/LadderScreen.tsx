/**
 * The Ladder — the app's home screen (PRD-design §4 [D21]: no onboarding, first run lands here).
 *
 * A stub still: the level strip, seal states, rung markers and the ownership footer are #86, and
 * the staged rung card is #87. What it does carry is the boot smoke that used to sit in
 * `App.tsx` (#79, #81) — the active course, its microcopy through `useStrings()`, and L1's rungs
 * out of its own `levels.json`. That wiring belongs on the screen that will render it for real,
 * and keeping it alive here means the course layer stays exercised end-to-end while the shell
 * lands. #86 replaces every line of it.
 */
import { useCourse } from '../course/CourseProvider.tsx';
import { interpolate, useStrings } from '../course/strings.ts';
import { useLevels } from '../course/content.ts';
import { ContentErrorScreen } from '../course/BootScreens.tsx';
import { ScreenStub } from './ScreenStub.tsx';
import styles from './LadderScreen.module.css';

export default function LadderScreen() {
  const { course, courses } = useCourse();
  const strings = useStrings();
  const levels = useLevels();

  // The content layer failing is one screen, wherever it fails: the provider shows this when the
  // manifest or the strings bundle is broken, and a missing ladder is the same answer (#79).
  if (levels.error !== null) return <ContentErrorScreen detail={levels.error.message} />;

  const first = levels.data?.levels[0];

  return (
    <ScreenStub title="Ladder" ticket="#86">
      <p className={styles.courseString} dir={course.dir}>
        {strings.cueLabel} · {interpolate(strings.ordinal, { n: 3 })}
      </p>
      <p className={styles.note}>tokens loaded · course strings render</p>
      <p className={styles.note}>
        active course: {course.pairLabel} ({course.id}) · {courses.length} in this build
      </p>
      {first !== undefined && (
        <>
          <p className={styles.note}>
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
    </ScreenStub>
  );
}
