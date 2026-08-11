/**
 * localStorage, asked once to be durable (#90; design/pwa-checklist.md §3.5).
 *
 * Every rung this learner has climbed lives in one `localStorage` document and nowhere else —
 * there is no backend and no account to restore from (docs/01-plan.md §3). Best-effort storage
 * is evictable: a browser under storage pressure may clear it, and for an installed app that has
 * been on a home screen for a month that is the whole ladder, gone, with no way back.
 * `navigator.storage.persist()` asks the browser not to, and Chrome grants it outright for an
 * installed PWA.
 *
 * **Once, and after the first write.** The checklist says "on first save", and the order matters
 * both ways round: asking before there is anything to keep is asking to protect an empty box,
 * and asking again on every keystroke of progress would be a permission prompt in the browsers
 * that show one. So the wrapper writes first, then asks, then never asks again for the life of
 * the page — the answer does not change within a session.
 *
 * The outcome is logged rather than acted on. There is nothing useful to do with a "no": the app
 * has no second storage to fall back to, the learner has no button to press, and F7's manual
 * export (PRD §8) is the real answer to durability. What a log gives is an explanation on the
 * day a ladder does vanish.
 */
import type { StateStorage } from 'zustand/middleware';

/** Per page load. A session's answer is the session's answer; a reload asks again. */
let asked = false;

/** Exported for the test, which needs a fresh page's worth of state per case. */
export function resetPersistenceRequest(): void {
  asked = false;
}

/**
 * Asks the browser to keep this origin's storage, at most once, and never throws: this runs
 * inside a state write, and a store that could not save because a *log line* rejected would be
 * the bug this function exists to prevent.
 */
export function requestPersistence(): void {
  if (asked) return;
  asked = true;

  // Safari before 15.2 and every non-secure context: no StorageManager, nothing to ask.
  const storage = navigator.storage as StorageManager | undefined;
  if (typeof storage?.persist !== 'function') {
    console.info(
      'rung: storage persistence unavailable — progress is evictable (F7 export is the backup)',
    );
    return;
  }

  try {
    void storage.persist().then(
      (granted) => {
        console.info(
          granted
            ? 'rung: storage persistence granted — progress will not be evicted'
            : 'rung: storage persistence denied — progress is evictable (F7 export is the backup)',
        );
      },
      (error: unknown) => {
        console.info(`rung: storage persistence could not be requested — ${String(error)}`);
      },
    );
  } catch (error) {
    // A synchronous throw, not a rejection — same answer: the state is already saved.
    console.info(`rung: storage persistence could not be requested — ${String(error)}`);
  }
}

/**
 * What `src/state/store.ts` persists through. A plain pass-through to `localStorage` with one
 * addition: the first successful write asks for durability.
 *
 * The ask happens AFTER `setItem` returns, so a browser that refuses the request, or has no
 * StorageManager at all, still saved the state — durability is an upgrade to the write, never a
 * condition of it.
 */
export const durableLocalStorage: StateStorage = {
  getItem: (name) => localStorage.getItem(name),
  setItem: (name, value) => {
    localStorage.setItem(name, value);
    requestPersistence();
  },
  removeItem: (name) => localStorage.removeItem(name),
};
