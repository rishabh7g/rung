/**
 * The `/dev/type` route (#85) — and the guard that keeps the specimen out of the product.
 *
 * `import.meta.env.DEV` is a literal Vite replaces at build time, so in a production build this
 * is `false ? … : null` and everything the branch reaches is dead code before Rollup starts.
 *
 * The import is dynamic **and inside the branch**, which is the part that had to be learned: a
 * static import tree-shakes the component away but not its stylesheet — Vite emits a CSS
 * module's CSS for any module that entered the graph, so `dist/assets/index-*.css` shipped the
 * specimen's class names (`_specimen_`, `_s18_`, …) and the JS shipped the class-name map beside
 * them. With the `import()` behind the flag there is no module, no chunk and no CSS: the
 * acceptance check is a grep of the built output, not this comment.
 *
 * It is deliberately NOT a row of `SHELL_ROUTES`. That table is the product's IA — two things
 * read it, one of them to decide a screen's chrome — and a dev instrument in it would be a
 * screen the shell believes in, with a back header to nowhere. The route is a sibling of the
 * layout route instead, so the specimen renders full-bleed with no chrome to confuse a
 * screenshot, and `matchShellRoute` never has to know it exists.
 */
import { Suspense, lazy } from 'react';
import { Route } from 'react-router-dom';

/** Reachable at `#/dev/type` — HashRouter, like every other path (App). */
export const DEV_TYPE_PATH = '/dev/type';

/** The route in development; `null` in a production build, where the path 404s to the Ladder. */
export const devTypeRoute = import.meta.env.DEV ? devTypeRouteElement() : null;

function devTypeRouteElement() {
  const TypeSpecimen = lazy(() => import('./TypeSpecimen.tsx'));

  return (
    <Route
      path={DEV_TYPE_PATH}
      element={
        <Suspense fallback={null}>
          <TypeSpecimen />
        </Suspense>
      }
    />
  );
}
