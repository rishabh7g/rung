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
 * offline — the shell, the fonts, every course JSON — has to be in the precache before the
 * learner walks away from the wifi.
 *
 * Registration is `registerType: 'autoUpdate'`, so there is no update prompt to write: a new
 * build's worker skips waiting, claims the page and reloads it. This product never asks a
 * learner to think about versions.
 */
import { registerSW } from 'virtual:pwa-register';

export function registerServiceWorker(): void {
  registerSW({ immediate: true });
}
