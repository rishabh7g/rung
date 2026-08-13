/**
 * The one call that turns the build into an offline app (#90).
 *
 * `virtual:pwa-register` is vite-plugin-pwa's registration shim: in a build it registers the
 * generated `sw.js`, and in `vite dev` it is a no-op stub, because `devOptions.enabled` is false
 * (`tools/pwa.ts`) and a service worker sitting in front of HMR is a debugging tax with no
 * upside. So `npm run dev` behaves exactly as it did before this ticket; the worker exists in
 * `build` and `preview`.
 *
 * `immediate: true` registers on module evaluation rather than waiting for `load`: the first
 * visit is the ONLY moment this product is allowed to use the network, and everything it needs
 * offline has to be on the device before the learner walks away from the wifi. Since #211 that is
 * two halves — the shell, precached at install, and the active course, warmed into the worker's
 * cache-first routes by `src/pwa/offlineCourse.ts` — and registering early is what gets the
 * worker controlling the page in time for the warm to go through it.
 *
 * Registration is `registerType: 'autoUpdate'`, so there is no update prompt to write: a new
 * build's worker skips waiting, claims the page and reloads it. This product never asks a
 * learner to think about versions.
 */
import { registerSW } from 'virtual:pwa-register';

export function registerServiceWorker(): void {
  registerSW({ immediate: true });
}
