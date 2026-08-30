/**
 * The bottom nav (#84) — Ladder · Practice · Settings, the app's whole top level
 * (PRD-design §4 [D8]). There is no fourth tab and no onboarding above it [D21].
 *
 * Three rules it exists to keep, all of them in `BottomNav.module.css` rather than here, because
 * they are layout facts and the design contract is "tokens only, no hard-coded px" (rule 1):
 * items are `--nav-item-height` (56px, src/styles/tokenOverrides.css #244) tall inside a bar
 * padded symmetrically by `--space-1`, with the home indicator's strip ADDED beneath it —
 * `calc(--space-1 + env(safe-area-inset-bottom, 0px))`, never `max` (#265);
 * `touch-action: manipulation` kills the 300ms
 * double-tap-zoom delay (pwa-checklist §1); the active tab is an accent token, and it is
 * `NavLink`'s own `aria-current="page"` that selects it — the state a screen reader announces
 * and the state the learner sees are then the same state.
 *
 * The nav is not rendered at all during an immersive session — see `AppShell`.
 *
 * **The labels are the course's** (`nav.*`, #351). They were English furniture until hi-en and
 * hi-mr shipped, at which point the app's whole top level greeted a Hindi-L1 learner in the
 * language they came here to learn out of. One label per tab, used verbatim for the visible span,
 * the `aria-label` and the `title` — three renderings of one word, so they cannot drift.
 */
import { NavLink } from 'react-router-dom';
import { Pencil, Rows3, Settings } from 'lucide-react';
import { useCourse } from '../course/CourseProvider.tsx';
import { useStrings } from '../course/strings.ts';
import { HOME_PATH, PRACTICE_PATH, SETTINGS_PATH } from './routes.tsx';
import styles from './BottomNav.module.css';

/**
 * Icons are Lucide only (design/tokens.md §4), sized and stroked from `--icon-ui` /
 * `--icon-stroke` in CSS rather than through the components' px props — same reason as above.
 * Lucide has no ladder glyph; `Rows3` is the nearest thing to the mark's rails-and-rungs, and
 * the mark itself stays reserved for the brand header.
 */
const TABS = [
  { to: HOME_PATH, key: 'nav.ladder', Icon: Rows3 },
  { to: PRACTICE_PATH, key: 'nav.practice', Icon: Pencil },
  { to: SETTINGS_PATH, key: 'nav.settings', Icon: Settings },
] as const;

export function BottomNav() {
  const { course } = useCourse();
  const strings = useStrings();

  return (
    <nav className={styles.nav} aria-label={strings['a11y.primaryNav']}>
      {TABS.map(({ to, key, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end
          className={styles.item}
          // Mandatory, and set at EVERY viewport — the bar hides the span below (#245).
          aria-label={strings[key]}
          title={strings[key]}
        >
          <Icon className={styles.icon} />
          <span className={styles.label} dir={course.dir}>
            {strings[key]}
          </span>
        </NavLink>
      ))}
    </nav>
  );
}
