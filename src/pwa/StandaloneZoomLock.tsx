/**
 * Pinch-zoom off in the installed app, on in the browser (#250).
 *
 * WHY THIS IS CODE AND NOT A LINE IN `index.html`. The static viewport tag is served identically
 * whether this launch is a browser tab or a Home Screen app — the same URL is a tab on one launch
 * and an installed app on the next, and only the client can tell them apart
 * (`matchMedia('(display-mode: standalone)')`). So the meta tag has to be amended after the fact
 * rather than written differently up front.
 *
 * WHY STANDALONE ONLY, AND WHY THAT IS NOT AN ARBITRARY LINE. iOS Safari has ignored
 * `user-scalable=no` in ordinary browser tabs since iOS 10, but still honours it from a
 * home-screen launch. A static flag in `index.html` would therefore be a no-op on the iOS tabs it
 * looks like it governs, while genuinely breaking zoom in Android and desktop Chrome tabs — the
 * worst of both. Scoped here, it changes exactly the mode it claims to.
 *
 * ACCESSIBILITY — A DECISION, NOT AN OVERSIGHT. Disabling pinch-zoom violates WCAG 2.1 SC 1.4.4
 * (Resize Text) for standalone users. Zoom stays fully available wherever the app is a website;
 * this is the deliberate, declared exception the house UI standard's §7 makes for the installed
 * app's feel, narrowed to standalone only rather than applied everywhere.
 *
 * WHAT IT MUST NOT BREAK. `viewport-fit=cover` is what turns `env(safe-area-inset-*)` on — the
 * header's and the bottom nav's safe-area padding both read it (`src/shell/layout.test.ts`
 * "never uses a bare env()"). Standalone is exactly where losing it would hurt most: no browser
 * chrome is left to hold the bars off the notch. So this AMENDS the existing content string and
 * never writes a hardcoded one; `viewport-fit=cover`, `width=device-width` and `initial-scale=1`
 * pass through untouched, in order.
 */
import { useEffect } from 'react';

/** The two directives this component owns — everything else in the tag is not ours. */
const LOCK = ['maximum-scale=1', 'user-scalable=no'];

const OWNED = /^(maximum-scale|user-scalable)\s*=/i;

/** The tag as it reads with our directives removed — every other one preserved, in order. */
function withoutLock(content: string): string[] {
  return content
    .split(',')
    .map((directive) => directive.trim())
    .filter((directive) => directive.length > 0 && !OWNED.test(directive));
}

/**
 * Idempotent by construction: it strips our directives before deciding whether to re-add them,
 * so it reads the CURRENT tag rather than a captured original and cannot get stuck locked after a
 * display-mode change.
 */
function syncViewport(meta: HTMLMetaElement, standalone: boolean): void {
  const base = withoutLock(meta.content);
  meta.content = (standalone ? [...base, ...LOCK] : base).join(', ');
}

export function StandaloneZoomLock(): null {
  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>('meta[name="viewport"]');
    if (!meta) return;

    const query = window.matchMedia?.('(display-mode: standalone)');
    const apply = (): void => syncViewport(meta, query?.matches === true);
    apply();

    // Honour a display-mode change without a reload (installing, or a PWA opened back out into a
    // tab) — rung has no per-route metadata reset to guard against, unlike a server-rendered app,
    // so re-running is display-mode-change only, not per navigation.
    query?.addEventListener('change', apply);

    return () => {
      query?.removeEventListener('change', apply);
      // Leave the tag as we found it, so an unmount never strands the app zoom-locked.
      syncViewport(meta, false);
    };
  }, []);

  return null;
}
