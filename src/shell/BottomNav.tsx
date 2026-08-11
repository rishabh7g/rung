/**
 * The bottom nav (#84) — Ladder · Practice · Settings, the app's whole top level
 * (PRD-design §4 [D8]). There is no fourth tab and no onboarding above it [D21].
 *
 * Three rules it exists to keep, all of them in `BottomNav.module.css` rather than here, because
 * they are layout facts and the design contract is "tokens only, no hard-coded px" (rule 1):
 * items are `--nav-item-height` (48px) tall and clear the home indicator by
 * `max(--space-8, env(safe-area-inset-bottom))`; `touch-action: manipulation` kills the 300ms
 * double-tap-zoom delay (pwa-checklist §1); the active tab is an accent token, and it is
 * `NavLink`'s own `aria-current="page"` that selects it — the state a screen reader announces
 * and the state the learner sees are then the same state.
 *
 * The nav is not rendered at all during an immersive session — see `AppShell`.
 */
import { NavLink } from 'react-router-dom';
import { Pencil, Rows3, Settings } from 'lucide-react';
import { HOME_PATH, PRACTICE_PATH, SETTINGS_PATH } from './routes.tsx';
import styles from './BottomNav.module.css';

/**
 * Icons are Lucide only (design/tokens.md §4), sized and stroked from `--icon-ui` /
 * `--icon-stroke` in CSS rather than through the components' px props — same reason as above.
 * Lucide has no ladder glyph; `Rows3` is the nearest thing to the mark's rails-and-rungs, and
 * the mark itself stays reserved for the brand header.
 */
const TABS = [
  { to: HOME_PATH, label: 'Ladder', Icon: Rows3 },
  { to: PRACTICE_PATH, label: 'Practice', Icon: Pencil },
  { to: SETTINGS_PATH, label: 'Settings', Icon: Settings },
] as const;

export function BottomNav() {
  return (
    <nav className={styles.nav} aria-label="Primary">
      {TABS.map(({ to, label, Icon }) => (
        <NavLink key={to} to={to} end className={styles.item}>
          <Icon className={styles.icon} />
          <span className={styles.label}>{label}</span>
        </NavLink>
      ))}
    </nav>
  );
}
