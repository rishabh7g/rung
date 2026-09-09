/**
 * The route table (#84) — every screen the app has, in one list (PRD-design §4 [D8, D21]).
 *
 * It is data, not JSX scattered through a router, because two things read it: `App` builds the
 * `<Routes>` from it, and `AppShell` matches the current location against it to decide which
 * chrome the screen gets. A screen with a back header that a router did not know about, or a
 * route with no chrome rule, cannot happen while there is one table.
 *
 * `chrome` is the whole of that decision, and it comes straight from the IA: the Ladder,
 * Practice and Settings are the three tabs and wear the brand header; Module and Sentence Detail
 * are children of the active rung and wear a back header. Immersion overrides both — see
 * `AppShell`.
 *
 * **The table lost two rows when the exit ritual went.** `/ritual` rendered a comprehension test
 * and `/verdict` the pass checklist that followed it, and between them they were the only way to
 * climb a rung. A rung is now climbed on the last card of a Practice session
 * (`screens/practice/Session.tsx`), which is not a route at all — so the unlock path has no URL,
 * and there is nothing left for a deep link to reach into halfway.
 *
 * **Where "back" goes is IA too**, so it is in the table rather than in the header that draws the
 * chevron: every child of a rung returns to the Ladder except Sentence Detail, which returns to
 * the module it was opened from — with that module's scroll offset and open cards intact (#88,
 * #89). `backTarget()` is the whole of that decision, and `AppShell` only renders it.
 *
 * `label` is English shell furniture (the back header's title), not course copy: nothing here
 * is a learner-facing word, and every word that is ships in the course bundle (PRD §4, #80).
 */
import type { ReactElement } from 'react';
import { matchPath } from 'react-router-dom';
import { moduleIdOf } from '../screens/sentence/sentenceId.ts';
import LadderScreen from '../screens/LadderScreen.tsx';
import ModuleScreen from '../screens/ModuleScreen.tsx';
import SentenceScreen from '../screens/SentenceScreen.tsx';
import PracticeScreen from '../screens/PracticeScreen.tsx';
import SettingsScreen from '../screens/SettingsScreen.tsx';

/** The Ladder: home, first run, and where an unknown route lands. */
export const HOME_PATH = '/';
/** The Practice hub — where the pause ✕ returns a paused session, and where a rung is climbed. */
export const PRACTICE_PATH = '/practice';
export const SETTINGS_PATH = '/settings';

/* ----------------------------------------------------------- the climb's hand-over */

/**
 * **The unlock beat's one-shot flag** (#103) — the session summary's hand-over to the Ladder, and
 * the only navigation in the app that carries something the receiving screen celebrates.
 *
 * There were three of these while the exit ritual stood. Two were keys rather than celebrations:
 * they proved a learner had reached `/verdict` by passing the test on `/ritual` rather than by
 * typing the URL into a HashRouter PWA. Both routes are gone, and the last card of a session is
 * not a URL anyone can arrive at sideways, so there is nothing left to guard and this one flag
 * remains.
 *
 * The beat is "one moment, once" (PRD-design §3.6, §9 — the product's single sanctioned
 * celebration), so what fires it has to be a fact about THIS navigation and not a fact about the
 * ladder: a rung that just opened and a rung that opened last week are the same rung, and the
 * Ladder is the home screen the learner returns to a dozen times a day. A `justUnlocked` flag in
 * `rung:state` would survive a reload, an app kill and a course switch, and would have to be
 * cleaned up by whichever screen happened to see it first.
 *
 * So it rides in the history entry, and the Ladder **consumes it**: the screen reads it once on
 * mount, then replaces its own entry with a stateless one, so a reload of that entry is a Ladder
 * with nothing to celebrate. Coming back later is a new entry, which never carried a flag at all.
 *
 * It names the module that was passed rather than the one that opened, because that is the fact
 * the summary actually knows — where the beat lands (the newly current rung, and its level cell
 * when the pass unsealed one) is the Ladder's own derivation from the ladder it already has.
 */
export function passedRung(moduleId: string): { passedRung: string } {
  return { passedRung: moduleId };
}

/** The rung a navigation says was just passed — `null` for every navigation that says nothing. */
export function justPassed(state: unknown): string | null {
  if (typeof state !== 'object' || state === null || !('passedRung' in state)) return null;

  const moduleId = (state as { passedRung: unknown }).passedRung;
  return typeof moduleId === 'string' && moduleId !== '' ? moduleId : null;
}

/**
 * **The import's arrival flag** (#108) — written by the Backup section's confirm as it lands the
 * learner on the Ladder of the imported `activeCourse`, read by the Ladder to raise the one
 * confirmation toast. The same one-shot mechanism as `passedRung` above, for the same reason:
 * "a backup was just restored" is a fact about THIS navigation, not about the state — the
 * restored document and a document restored last week are indistinguishable, and a flag in
 * `rung:state` would be one more thing the import had to write and some screen had to clean up.
 * The Ladder consumes it exactly as it consumes the beat's: read once, entry replaced stateless.
 */
export function restoredBackup(): { restoredBackup: true } {
  return { restoredBackup: true };
}

/** Did this navigation come from the import's confirm? Anything else answers false. */
export function justRestored(state: unknown): boolean {
  return (
    typeof state === 'object' &&
    state !== null &&
    'restoredBackup' in state &&
    (state as { restoredBackup: unknown }).restoredBackup === true
  );
}

/**
 * Which header a screen gets. `brand` = the rails mark + wordmark (the three tabs);
 * `back` = a chevron to the Ladder plus the screen's name (the children of a rung).
 */
export type ShellChrome = 'brand' | 'back';

export interface ShellRoute {
  /** The route path, absolute — these are children of a pathless layout route. */
  path: string;
  /** Shell furniture: the back header's title. Never course copy. */
  label: string;
  chrome: ShellChrome;
  element: ReactElement;
}

export const SHELL_ROUTES: readonly ShellRoute[] = [
  { path: HOME_PATH, label: 'Ladder', chrome: 'brand', element: <LadderScreen /> },
  { path: '/module/:id', label: 'Module', chrome: 'back', element: <ModuleScreen /> },
  { path: '/sentence/:id', label: 'Sentence', chrome: 'back', element: <SentenceScreen /> },
  { path: PRACTICE_PATH, label: 'Practice', chrome: 'brand', element: <PracticeScreen /> },
  { path: SETTINGS_PATH, label: 'Settings', chrome: 'brand', element: <SettingsScreen /> },
];

/**
 * The table row a location is on, or `undefined` for a path no route claims — which the router
 * is redirecting to the Ladder anyway, so the shell shows the brand header for the frame it
 * renders on the way there.
 */
export function matchShellRoute(pathname: string): ShellRoute | undefined {
  return SHELL_ROUTES.find((route) => matchPath(route.path, pathname) !== null);
}

/** Where a back header goes, and what its control is called. Both are shell furniture. */
export interface BackTarget {
  path: string;
  /** The chevron's accessible name — English, like every `label` in the table. */
  label: string;
}

const TO_LADDER: BackTarget = { path: HOME_PATH, label: 'Back to the ladder' };

/**
 * Where the back chevron goes from `pathname`.
 *
 * The Ladder, for every child of a rung — **except Sentence Detail**, which came from its module
 * and returns to it: the module list restores the scroll offset the learner left behind
 * (`screens/module/moduleView.ts`, #88), so "back" is genuinely where they were rather than the
 * top of the ladder. The module is read out of the sentence id, which is all the URL
 * carries; an id that names no module (`/sentence/S1` — a deep link can carry anything) falls
 * back to the Ladder, exactly as the screen itself does.
 */
export function backTarget(pathname: string): BackTarget {
  const sentence = matchPath('/sentence/:id', pathname);
  const moduleId = sentence === null ? null : moduleIdOf(sentence.params.id ?? '');

  if (moduleId === null) return TO_LADDER;

  return { path: `/module/${moduleId}`, label: 'Back to the module' };
}
