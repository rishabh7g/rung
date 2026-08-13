/**
 * The retry interstitial (#102; PRD §8 F5 "unlimited, no shame framing, no failure counters",
 * PRD-design §6.6 flow 6, §7; prototype → Comprehend → the "Fresh sentences" state).
 *
 * A "not quite" in an attempt leads here, and here is two lines and one button — what is left of
 * the five layers design/tokens.md §6.3 froze, all course copy: the kicker, the title, and the CTA
 * that deals two new sentences. The body and the reassurance under it were read-once prose and
 * went on #231; the screen says the same thing by being this short. That is the entire screen, and
 * everything it does NOT have is the specification:
 *
 *   • **no counter of any kind** — not attempts, not failures, not "2 of ∞". This component takes
 *     no such prop, so there is no number here to render even by accident; the screen above
 *     keeps none either. Nothing about a failed round is stored (Invariant 4), so there is
 *     nothing to count with, which is the strongest form the promise can take.
 *   • **no red, no shame, no "wrong"** — the loud red belongs to the self-mark the learner
 *     themselves chose (design/tokens.md §7 rule 2). The rung waits, and the screen shows it by
 *     offering nothing but the way on.
 *   • **no way out but forward** — one control, `retry.cta`. The back chevron is the shell's, and
 *     leaving is always allowed; it just is not a decision this screen asks for.
 *
 * The kicker shipped later than the title and the CTA: the build awaited a course key for it (a
 * shell-owned learner-facing sentence is the one thing PRD §4 forbids), and the Sync-3 freeze
 * (#71) minted `retry.kicker` — per-course, because even the kicker says "again" in the course's
 * own words. The head's `M1 · EXIT RITUAL` kicker stays up throughout, so the screen is never
 * unlabelled.
 */
import { useStrings } from '../../course/strings.ts';
import { RegistrationMarks } from '../RegistrationMarks.tsx';
import styles from './RetryInterstitial.module.css';

interface RetryInterstitialProps {
  /** Deal a fresh attempt. The only thing on this screen, and it takes no argument. */
  onFresh: () => void;
  /** The course's writing direction — every word here is its copy. */
  dir?: string;
}

export function RetryInterstitial({ onFresh, dir }: RetryInterstitialProps) {
  const strings = useStrings();

  return (
    <section className={styles.retry}>
      <p className={styles.kicker} dir={dir}>
        {strings['retry.kicker']}
      </p>
      <h2 className={styles.title} dir={dir}>
        {strings['retry.title']}
      </h2>
      <div className={styles.ctaFrame}>
        <RegistrationMarks />
        <button type="button" className={styles.cta} onClick={onFresh} dir={dir}>
          {strings['retry.cta']}
        </button>
      </div>
    </section>
  );
}
