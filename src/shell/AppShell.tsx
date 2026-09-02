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
 *   2. **A child of the rung** (Module, Sentence Detail, the ritual screens) → a back chevron
 *      plus the screen's name. Where the chevron goes is the route table's answer
 *      (`backTarget`), not this file's: the Ladder for all of them but Sentence Detail, which
 *      returns to the module it was opened from, offset and open cards intact (#88, #89).
 *   3. **A tab** (Ladder, Practice, Settings) → the brand: rails mark + the lowercase wordmark
 *      from `src/brand.ts`, the one place the product name lives.
 *
 * **The nav renders for 3, and on a phone only for 3.** Immersion hides it entirely; below 768px
 * a child of the rung hides it too, which is the prototype's `navPad` reconciled (#117). A module,
 * a sentence and the ritual are work the learner opened deliberately, and each of them already
 * carries its way out in the header — so the bar underneath was three destinations nobody asked
 * for, spending a sixth of a 320px screen on them. The tabs keep it, because a tab with no nav is
 * a screen with no way off it.
 *
 * At 768px and up nothing is hidden: the nav is the left RAIL there (#249), beside the column
 * rather than under the thumb, so it costs the screen nothing on any route. That is a viewport
 * fact rather than a route fact, so it is a media query in `BottomNav.module.css` and not a second
 * condition here — a tablet rotated into portrait crosses the breakpoint with no route change.
 *
 * Layout: the column is `100dvh` and never scrolls; `<main>` is the one scroll area, per screen,
 * `overflow-x: hidden` and `overscroll-behavior: contain` so a session can't be pulled to
 * refresh. Safe areas: the header's top inset is `max(token, env(...))` — nothing sits above it,
 * so the larger of the two is the padding — while the bottom bar ADDS its inset,
 * `calc(token + env(...))` (#265). See the CSS.
 */
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { ChevronLeft, X } from 'lucide-react';
import { BRAND } from '../brand.ts';
import { useStrings } from '../course/strings.ts';
import { BottomNav } from './BottomNav.tsx';
import { RailsMark } from './RailsMark.tsx';
import { useImmersive } from './immersive.tsx';
import { PRACTICE_PATH, backTarget, matchShellRoute } from './routes.tsx';
import { ScrollAreaContext } from './scrollArea.tsx';
import styles from './AppShell.module.css';

export function AppShell() {
  const { immersive, exitSession } = useImmersive();
  const strings = useStrings();
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const route = matchShellRoute(pathname);
  // Inside a rung — the `back` chrome is exactly that set (Module, Sentence, the ritual, the
  // verdict), so the nav's phone rule is the header's own rule read a second time rather than a
  // second list of routes to keep in step with this one.
  const insideRung = route?.chrome === 'back';
  const back = backTarget(pathname);
  // Published to the screens through `ScrollAreaContext`: the frame owns the only scroll area,
  // and a screen that restores a position (#88) asks for it rather than hunting for it. State
  // rather than a ref, so a screen can depend on it arriving.
  const [screen, setScreen] = useState<HTMLElement | null>(null);

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
            aria-label={strings['a11y.pauseSession']}
          >
            <X className={styles.icon} />
          </button>
        ) : route?.chrome === 'back' ? (
          <>
            <button
              type="button"
              className={styles.back}
              onClick={() => void navigate(back.path)}
              aria-label={back.label}
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

      {/* Below the header: the scroll area and, at >=768px, the rail beside it (#249). `<main>`
          stays exactly where it was — this only gives it and the nav a shared flex parent so the
          two can lay out as a row at >=768px; ScrollAreaContext still publishes the same element. */}
      {/* The bar carried `env(safe-area-inset-bottom)` for everything above it (#265). Where it is
          hidden, the column below the header takes that inset instead — otherwise the sentence
          pager, which is sticky at the bottom of its own scroll area and has no inset of its own,
          would sit under the home indicator on exactly the screens this hides the bar on. */}
      <div className={insideRung ? styles.bodyInsideRung : styles.body}>
        <main className={styles.screen} ref={setScreen}>
          <ScrollAreaContext.Provider value={screen}>
            <Outlet />
          </ScrollAreaContext.Provider>
        </main>

        {!immersive && <BottomNav hiddenOnPhone={insideRung} />}
      </div>
    </div>
  );
}
