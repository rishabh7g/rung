import { BRAND } from './brand.ts';
import styles from './App.module.css';

/**
 * Scaffold screen. It proves two things the rest of P1 builds on: design/tokens.css
 * is loaded (steel wordmark) and Devanagari renders before Mukta is bundled.
 * The real screens (Ladder, Module list, Detail) replace this; learner-facing copy
 * always comes from the course's strings.json, never from the shell.
 */
export default function App() {
  return (
    <main className={styles.screen}>
      <h1 className={styles.wordmark}>{BRAND}</h1>
      {/* render check only — not learner-facing copy */}
      <p className={styles.devanagari} lang="mr">
        शिडी
      </p>
      <p className={styles.caption}>tokens loaded · Devanagari renders</p>
    </main>
  );
}
