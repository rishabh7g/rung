/**
 * The build-time values `vite.config.ts` `define`s into the app (#211).
 *
 * One today: the revision of the content this build shipped, a hash of the emitted
 * `public/content/` tree (`contentRevision()` in `tools/pwa.ts`). The service worker names its
 * course-content cache after it and the app composes the same name from
 * `src/pwa/cacheNames.ts` — so the page knows which cache is current and which one an older
 * content build left behind.
 *
 * `'dev'` when there was no emitted content to hash, which is what `npm test` compiles against:
 * `scripts/verify.sh` runs TEST before CONTENT.
 */
declare const __RUNG_CONTENT_REVISION__: string;
