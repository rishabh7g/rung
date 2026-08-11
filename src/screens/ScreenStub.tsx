/**
 * The placeholder every screen the shell routes to starts as (#84).
 *
 * The shell ships before the screens do — routes, nav, immersion and safe areas are what the
 * eight screens hang off — so each route needs something to render that is honest about being
 * scaffolding and says which ticket replaces it. It is English shell furniture, not copy: no
 * learner-facing word here comes from a course bundle, because none of it is learner-facing
 * (PRD §4; the guard is `src/shellPurity.test.ts`).
 */
import type { ReactNode } from 'react';
import styles from './ScreenStub.module.css';

interface ScreenStubProps {
  /** The screen's own name — the kicker a stub shows in place of its real header. */
  title: string;
  /** The issue that builds it, e.g. `#88`. */
  ticket: string;
  /** Anything the stub needs to be more than a note — the Practice session's start, today. */
  children?: ReactNode;
}

export function ScreenStub({ title, ticket, children }: ScreenStubProps) {
  return (
    <section className={styles.stub}>
      <p className={styles.kicker}>{title}</p>
      <p className={styles.note}>Screen stub — built in {ticket}.</p>
      {children}
    </section>
  );
}
