import { HashRouter, Navigate, Route, Routes } from 'react-router-dom';
import { CourseProvider } from './course/CourseProvider.tsx';
import { AppShell } from './shell/AppShell.tsx';
import { ImmersiveProvider } from './shell/immersive.tsx';
import { HOME_PATH, SHELL_ROUTES } from './shell/routes.tsx';

/**
 * The app's root: three providers deep, and nothing else.
 *
 * Boot order is manifest → provider → screens (#79, PRD §8 F0), so `CourseProvider` is outermost
 * — it owns the loading and content-error screens, and everything below it already has a course
 * and its words. Then the immersive flag (#84), which is shell state and above the router
 * because the shell and the screen that raises it read the same one. Then the routes.
 *
 * **HashRouter, not BrowserRouter:** the product is a static, installable, zero-backend PWA
 * (PRD §3) — a deep link under a history router needs a server rewrite, and there is no server
 * to ask. `#/module/L1-M1` survives a refresh, an offline cold start and whatever static host
 * #91 lands on.
 *
 * Every screen is a child of one pathless layout route, so `AppShell` mounts once and stays
 * mounted across navigation — the frame does not blink between screens. The route table itself
 * is `src/shell/routes.tsx`; unknown paths land on the Ladder, replacing the bad entry rather
 * than trapping the back button behind it.
 */
export default function App() {
  return (
    <CourseProvider>
      <ImmersiveProvider>
        <HashRouter>
          <Routes>
            <Route element={<AppShell />}>
              {SHELL_ROUTES.map(({ path, element }) => (
                <Route key={path} path={path} element={element} />
              ))}
              <Route path="*" element={<Navigate to={HOME_PATH} replace />} />
            </Route>
          </Routes>
        </HashRouter>
      </ImmersiveProvider>
    </CourseProvider>
  );
}
