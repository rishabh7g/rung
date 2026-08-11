/**
 * The app shell (#84) — the frame every screen renders inside: one column the height of the
 * viewport, a header, the screen's own scroll area, and the bottom nav
 * (PRD-design §4 [D8, D21]; design/pwa-checklist.md §1–2).
 *
 * It renders one of three headers, and the order of that decision is the product rule:
 *
 *   1. **A session is running** → nothing but the pause ✕, top right, `--tap-min` square. It is
 *      ALWAYS there while the flag is up: an immersive screen with no way out is the failure
 *      this shell exists to make impossible. Tapping it ends the session and lands on the
 *      Practice hub.
 *   2. **A child of the rung** (Module, Sentence Detail, the ritual screens) → a back chevron to
 *      the Ladder plus the screen's name.
 *   3. **A tab** (Ladder, Practice, Settings) → the brand: rails mark + the lowercase wordmark
 *      from `src/brand.ts`, the one place the product name lives.
 *
 * The nav renders for 2 and 3 alike. The prototype also drops it on the child screens (its
 * `navPad` state) — that is chrome those screens own, and the fidelity pass (#117) is where the
 * two get reconciled; the rule this ticket owes is "immersion hides it entirely".
 *
 * Layout: the column is `100dvh` and never scrolls; `<main>` is the one scroll area, per screen,
 * `overflow-x: hidden` and `overscroll-behavior: contain` so a session can't be pulled to
 * refresh. Safe areas are `max(token, env(...))` everywhere — see the CSS.
 */
import { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, X } from 'lucide-react';
import { BRAND } from '../brand.ts';
import { BottomNav } from './BottomNav.tsx';
import { RailsMark } from './RailsMark.tsx';
import { useImmersive } from './immersive.tsx';
import { HOME_PATH, PRACTICE_PATH, matchShellRoute } from './routes.tsx';
import styles from './AppShell.module.css';

export function AppShell() {
  const { immersive, exitSession } = useImmersive();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const route = matchShellRoute(pathname);

  // A session belongs to the route it runs on, so leaving that route ends it — otherwise the
  // Android back button walks out of Practice and leaves the nav hidden with no ✕ to bring it
  // back. Nothing is lost by this: what a session IS lives in state (#96) and comes back on
  // resume (#99); this flag is only the shell's answer to "hide the nav".
  useEffect(() => {
    exitSession();
  }, [pathname, exitSession]);

  function pauseSession() {
    exitSession();
    void navigate(PRACTICE_PATH);
  }

  return (
    <div className={styles.app}>
      <header className={immersive ? styles.headerImmersive : styles.header}>
        {immersive ? (
          <button
            type="button"
            className={styles.pause}
            onClick={pauseSession}
            aria-label="Pause session"
          >
            <X className={styles.icon} />
          </button>
        ) : route?.chrome === 'back' ? (
          <>
            <button
              type="button"
              className={styles.back}
              onClick={() => void navigate(HOME_PATH)}
              aria-label="Back to the ladder"
            >
              <ChevronLeft className={styles.icon} />
            </button>
            <h1 className={styles.screenTitle}>{route.label}</h1>
          </>
        ) : (
          <h1 className={styles.brand}>
            <RailsMark className={styles.mark} />
            {BRAND}
          </h1>
        )}
      </header>

      <main className={styles.screen}>
        <Outlet />
      </main>

      {!immersive && <BottomNav />}
    </div>
  );
}
