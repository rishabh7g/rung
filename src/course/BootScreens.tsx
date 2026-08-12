/**
 * The two screens the app shows before it has a course (#79, F0 boot order).
 *
 * They live beside `CourseProvider` rather than in `src/screens/` because they are the
 * provider's own non-ready renders: nothing else can reach them, and no learner flow leads
 * here. The real screens mount only once a course is resolved.
 *
 * The shell carries ZERO course-specific strings (PRD §4) — all learner microcopy ships in the
 * course's strings.json. The English below is the one honest exception: it is what the app says
 * when no course bundle loaded, so by definition no bundle can supply it.
 */
import { BRAND } from '../brand.ts';
import styles from './BootScreens.module.css';

/**
 * Loading. Deliberately quiet — the wordmark and nothing else. Content is local and precached,
 * so this is a frame or two after the first load; a spinner would be more motion than wait.
 */
export function BootLoadingScreen() {
  return (
    <main className={styles.screen} aria-busy="true">
      <p className={styles.wordmark}>{BRAND}</p>
    </main>
  );
}

/**
 * The content tripwire, made visible: the manifest is missing, malformed, or empty. A strict
 * build ships only modules cleared to reach a learner, so an empty manifest means the gate held
 * everything back — this was the whole `npm run build` output until hi-mr L1-M1..M10 shipped
 * (2026-08-13, #110/#111). Seeing it now means content genuinely failed to build (README, "The
 * content gate").
 */
export function ContentErrorScreen({ detail }: { detail: string }) {
  return (
    <main className={styles.screen} role="alert">
      <h1 className={styles.wordmark}>{BRAND}</h1>
      <p className={styles.message}>This build has no course content to show.</p>
      <p className={styles.detail}>{detail}</p>
    </main>
  );
}
