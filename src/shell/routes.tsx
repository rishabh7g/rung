/**
 * The route table (#84) — every screen the app has, in one list (PRD-design §4 [D8, D21]).
 *
 * It is data, not JSX scattered through a router, because two things read it: `App` builds the
 * `<Routes>` from it, and `AppShell` matches the current location against it to decide which
 * chrome the screen gets. A screen with a back header that a router did not know about, or a
 * route with no chrome rule, cannot happen while there is one table.
 *
 * `chrome` is the whole of that decision, and it comes straight from the IA: the Ladder,
 * Practice and Settings are the three tabs and wear the brand header; Module, Sentence Detail
 * and the exit ritual's screens are children of the active rung and wear a back header.
 * Immersion overrides both — see `AppShell`.
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
import RitualScreen from '../screens/RitualScreen.tsx';
import ComprehensionScreen from '../screens/ComprehensionScreen.tsx';
import VerdictScreen from '../screens/VerdictScreen.tsx';
import SettingsScreen from '../screens/SettingsScreen.tsx';

/** The Ladder: home, first run, and where an unknown route lands. */
export const HOME_PATH = '/';
/** The Practice hub — where the pause ✕ returns a paused session. */
export const PRACTICE_PATH = '/practice';
export const SETTINGS_PATH = '/settings';
/** The exit ritual — the only unlock path, and the rung card's primary once a rung is ready. */
export const RITUAL_PATH = '/ritual';

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
  { path: RITUAL_PATH, label: 'Exit ritual', chrome: 'back', element: <RitualScreen /> },
  {
    path: '/comprehension',
    label: 'Comprehension',
    chrome: 'back',
    element: <ComprehensionScreen />,
  },
  { path: '/verdict', label: 'Verdict', chrome: 'back', element: <VerdictScreen /> },
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
 * and returns to it: the module list restores the offset and the open cards the learner left
 * behind (`screens/module/moduleView.ts`, #88), so "back" is genuinely where they were rather
 * than the top of the ladder. The module is read out of the sentence id, which is all the URL
 * carries; an id that names no module (`/sentence/S1` — a deep link can carry anything) falls
 * back to the Ladder, exactly as the screen itself does.
 */
export function backTarget(pathname: string): BackTarget {
  const sentence = matchPath('/sentence/:id', pathname);
  const moduleId = sentence === null ? null : moduleIdOf(sentence.params.id ?? '');

  if (moduleId === null) return TO_LADDER;

  return { path: `/module/${moduleId}`, label: 'Back to the module' };
}
