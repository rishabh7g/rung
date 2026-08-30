/**
 * The show-once hint, as a thing a screen can render (#319) — `hints.ts` is where the fact lives;
 * this is how a surface asks for it.
 *
 * **The decision is taken once, on mount, and held.** If the answer were re-read every render the
 * hint would vanish mid-look the moment anything else on the screen changed — a line that
 * disappears while it is being read is worse than one that was never shown. So the screen asks at
 * mount, keeps that answer for as long as it is up, and the marking happens beside it.
 *
 * **It is marked as seen when it is SHOWN, not when it is acted on.** There is nothing to act on:
 * a hint is a sentence, not a control. The one thing that would be worse than showing it twice is
 * a rule that waits for an acknowledgement the learner never gives, and turns a show-once line
 * into a permanent one for everybody who ignores it — which is everybody, because it is copy.
 */
import { useEffect, useState } from 'react';
import { useStrings } from '../course/strings.ts';
import { hintSeen, markHintSeen, type Hint } from './hints.ts';

/**
 * Should `hint` be shown on this surface right now?
 *
 * @param active whether the surface is in the state the hint is about — a card that has not been
 *   revealed has not reached the moment `hint.recall` is for, and a hint spent on a screen the
 *   learner is passing through is a hint they never got.
 */
export function useHint(hint: Hint, active = true): boolean {
  /**
   * Read once, at mount, before anything marks it: `useState`'s initialiser runs before the effect
   * below, so the first render of the first visit sees `false` and every later one sees `true`.
   */
  const [unseen] = useState(() => !hintSeen(hint));
  const show = unseen && active;

  useEffect(() => {
    if (show) markHintSeen(hint);
  }, [hint, show]);

  return show;
}

interface HintProps {
  /** Which hint — also the `hint.*` key its sentence is under. */
  hint: Hint;
  /** Is the surface at the moment this hint is about? Defaults to yes. */
  active?: boolean;
  /** The class the surface dresses it in — a hint has no geometry of its own. */
  className?: string;
  /** The course's writing direction: the sentence is its copy. */
  dir?: string;
}

/**
 * The hint itself, in the course's own words — a paragraph and nothing else. It renders `null`
 * once seen, so a surface can drop it in unconditionally and the DOM tells the truth about which
 * visit this is.
 */
export function HintLine({ hint, active, className, dir }: HintProps) {
  const strings = useStrings();
  const show = useHint(hint, active);

  if (!show) return null;

  return (
    <p className={className} dir={dir}>
      {strings[`hint.${hint}`]}
    </p>
  );
}
