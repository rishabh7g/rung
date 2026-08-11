/**
 * Practice — the hub, and the immersive session that runs from it (PRD-design §4, §6.3).
 *
 * The session machine (phases, per-course snapshot, honest empty states) is #96 and every card
 * inside it has its own ticket. What this stub carries is the one thing the shell ticket owes
 * the design: a session that really runs, so the immersive rule is a behaviour rather than a
 * promise — raise the flag and the nav is gone with the pause ✕ in its place; the ✕ (or leaving
 * the route) puts the learner back on this hub.
 *
 * Nothing about the session is remembered, which is honest for a stub: the snapshot that
 * survives an app kill is #96's, and resuming into it is #99's.
 */
import { useImmersive } from '../shell/immersive.tsx';
import { ScreenStub } from './ScreenStub.tsx';
import styles from './PracticeScreen.module.css';

export default function PracticeScreen() {
  const { immersive, enterSession } = useImmersive();

  if (immersive) {
    return <ScreenStub title="Session" ticket="#96" />;
  }

  return (
    <ScreenStub title="Practice" ticket="#96">
      <button type="button" className={styles.start} onClick={enterSession}>
        Start a session
      </button>
    </ScreenStub>
  );
}
