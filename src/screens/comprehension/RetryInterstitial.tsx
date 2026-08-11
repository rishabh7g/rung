/**
 * The retry interstitial (#102; PRD §8 F5 "unlimited, no shame framing, no failure counters",
 * PRD-design §6.6 flow 6, §7; prototype → Comprehend → the "Fresh sentences" state).
 *
 * A "not quite" in an attempt leads here, and here is three lines and one button: the course's
 * own title, its body ("one answer came out different — that's fine, that's information"), and
 * the CTA that deals two new sentences. That is the entire screen, and everything it does NOT
 * have is the specification:
 *
 *   • **no counter of any kind** — not attempts, not failures, not "2 of ∞". This component takes
 *     no such prop, so there is no number here to render even by accident; the screen above
 *     keeps none either. Nothing about a failed round is stored (Invariant 4), so there is
 *     nothing to count with, which is the strongest form the promise can take.
 *   • **no red, no shame, no "wrong"** — the loud red belongs to the self-mark the learner
 *     themselves chose (design/tokens.md §7 rule 2). The rung waits, and the copy says so in the
 *     course's own words.
 *   • **no way out but forward** — one control, `retry.cta`. The back chevron is the shell's, and
 *     leaving is always allowed; it just is not a decision this screen asks for.
 *
 * The prototype's two English lines above and below (its `COMPREHEND · AGAIN` kicker and
 * "Unlimited retries. The rung waits; nothing is counted against you.") are not rendered: there
 * is no course key for either, and a shell-owned learner-facing sentence is the one thing PRD §4
 * forbids. The head's `M1 · EXIT RITUAL` kicker stays up throughout, so the screen is never
 * unlabelled. Raised on #71 with the rest of the copy freeze, recorded on #117.
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
      <h2 className={styles.title} dir={dir}>
        {strings['retry.title']}
      </h2>
      <p className={styles.body} dir={dir}>
        {strings['retry.body']}
      </p>

      <div className={styles.ctaFrame}>
        <RegistrationMarks />
        <button type="button" className={styles.cta} onClick={onFresh} dir={dir}>
          {strings['retry.cta']}
        </button>
      </div>
    </section>
  );
}
