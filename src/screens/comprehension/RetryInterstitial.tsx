/**
 * The retry interstitial (#102; PRD §8 F5 "unlimited, no shame framing, no failure counters",
 * PRD-design §6.6 flow 6, §7; prototype → Comprehend → the "Fresh sentences" state).
 *
 * A "not quite" in an attempt leads here, and here is four lines and one button — the five layers
 * design/tokens.md §6.3 froze, all course copy: the kicker, the title, the body ("one answer came
 * out different — that's fine, that's information"), the quieter reassurance ("unlimited retries;
 * nothing is counted against you"), and the CTA that deals two new sentences. That is the entire
 * screen, and everything it does NOT have is the specification:
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
 * The kicker and the reassurance shipped later than the other three: the build awaited course
 * keys for them (a shell-owned learner-facing sentence is the one thing PRD §4 forbids), and the
 * Sync-3 freeze (#71) minted `retry.kicker` / `retry.reassure` — per-course, because the kicker
 * says "फिर से" in the course that says फिर से. The head's `M1 · EXIT RITUAL` kicker stays up
 * throughout, so the screen is never unlabelled.
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
      <p className={styles.body} dir={dir}>
        {strings['retry.body']}
      </p>
      <p className={styles.reassure} dir={dir}>
        {strings['retry.reassure']}
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
