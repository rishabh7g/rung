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
import ComprehensionScreen from '../screens/ComprehensionScreen.tsx';
import VerdictScreen from '../screens/VerdictScreen.tsx';
import SettingsScreen from '../screens/SettingsScreen.tsx';

/** The Ladder: home, first run, and where an unknown route lands. */
export const HOME_PATH = '/';
/** The Practice hub — where the pause ✕ returns a paused session. */
export const PRACTICE_PATH = '/practice';
export const SETTINGS_PATH = '/settings';
/**
 * The exit ritual — the only unlock path, and the rung card's primary once a rung is ready.
 *
 * **It IS the comprehension test now** (#348). The ritual used to open on a three-step arc asking
 * the learner to write an eleventh sentence in a notebook, sign it with a ~900ms hold, and only
 * then hand over to a second route for comprehension. The product retired notebook writing, so
 * the arc, the hold and the hand-over went with it — and rather than leave `/ritual` as a screen
 * that only redirects, the route renders the test directly. One route, one screen, and the rung
 * card's CTA and the back chevron point where they always did.
 */
export const RITUAL_PATH = '/ritual';
/** The ritual's end: the pass checklist and the climb back (#103). */
export const VERDICT_PATH = '/verdict';

/* ------------------------------------------------------- the ritual's hand-overs */

/**
 * What the ritual hands over to the Verdict.
 *
 * There used to be two steps and two tokens: the hold proved the learner had signed for an
 * eleventh sentence, and passing comprehension proved the test was taken. #348 retired notebook
 * writing, so the hold is gone and with it the `'hold'` token — the ritual IS the comprehension
 * test now, and the one hand-over left is the one that matters.
 */
export type RitualStep = 'comprehension';

/**
 * **How the last step is guarded: the navigation itself carries the proof.**
 *
 * Every route in this app is a real deep link — HashRouter, an installable PWA — so `#/verdict`
 * is a URL a learner can reach with the test never taken. What makes it legitimate is one fact
 * that happened a moment ago on another screen, and the honest question is where that fact should
 * live:
 *
 *   • **Not in the store.** Nothing about an unfinished ritual is progress, and Invariant 4 says
 *     only the pass writes anything; a `passedTheTest` flag in `rung:state` would be a durable
 *     record of a ritual in progress, surviving app kills and course switches, that some later
 *     screen would eventually have to clean up.
 *   • **In the history entry**, which is where "how did you get here" already lives. React
 *     Router's location state is per entry: Comprehension's own `navigate(state: …)` writes it,
 *     the Verdict reads it, a typed URL or a tap on a stale entry does not carry it, and it dies
 *     with the entry. It holds one literal string, so there is nothing in the mechanism a
 *     learner's own words could ever be put into.
 *
 * The token is a **key, not a claim**: it proves the learner arrived by passing, and the receiving
 * screen still asks the ladder whether the ritual was open at all (`exit_available`, #95), so a
 * forged history entry buys nothing a stale one does not.
 */
export function handover(step: RitualStep): { ritualStep: RitualStep } {
  return { ritualStep: step };
}

/** Did this navigation come from `step`? Anything else — a deep link, a refresh, a back tap onto
 * an entry that never held one — answers false, and the screen sends the learner to the step that
 * hands over. */
export function cameFrom(step: RitualStep, state: unknown): boolean {
  return (
    typeof state === 'object' &&
    state !== null &&
    'ritualStep' in state &&
    (state as { ritualStep: unknown }).ritualStep === step
  );
}

/**
 * **The unlock beat's one-shot flag** (#103) — the ritual's last hand-over, and the only one that
 * carries something the receiving screen celebrates.
 *
 * The beat is "one moment, once" (PRD-design §3.6, §9 — the product's single sanctioned
 * celebration), so what fires it has to be a fact about THIS navigation and not a fact about the
 * ladder: a rung that just opened and a rung that opened last week are the same rung, and the
 * Ladder is the home screen the learner returns to a dozen times a day. The same argument the
 * ritual's own guard makes (`handover` above) applies with even more force here — a `justUnlocked`
 * flag in `rung:state` would survive a reload, an app kill and a course switch, and would have to
 * be cleaned up by whichever screen happened to see it first.
 *
 * So it rides in the history entry, and the Ladder **consumes it**: the screen reads it once on
 * mount, then replaces its own entry with a stateless one, so a reload of that entry is a Ladder
 * with nothing to celebrate. Coming back later is a new entry, which never carried a flag at all.
 *
 * It names the module that was passed rather than the one that opened, because that is the fact
 * the Verdict actually knows — where the beat lands (the newly current rung, and its level cell
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
  { path: RITUAL_PATH, label: 'Exit ritual', chrome: 'back', element: <ComprehensionScreen /> },
  { path: VERDICT_PATH, label: 'Verdict', chrome: 'back', element: <VerdictScreen /> },
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
