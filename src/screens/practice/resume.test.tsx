/**
 * Lossless resume (#99) — the promise that an interrupted session costs a learner nothing but the
 * interruption (PRD §8 F4 "immersive mode + lossless resume", §8 F0 AC "resumable session
 * exactly", §17 "the prototype resets transient session state on course switch — do NOT copy").
 *
 * Five rules, and every case here is one of them:
 *
 *   • **The stored position is exact, not one card stale.** `visibilitychange → hidden` and
 *     `pagehide` write the card that is on screen, without waiting for the scheduled effect that
 *     normally does — which is the write a backgrounded or discarded page never runs.
 *   • **A killed page comes back to the same card.** The document is read back out of storage the
 *     way a reload reads it, into a fresh mount of the real `<App />`.
 *   • **A resume is not a session.** `sessionCount` goes up ONCE across a start, an interruption,
 *     a resume and a finish, and the review queue is ticked once — because `startSession` is the
 *     only caller of either and Continue is deliberately not it (#148's contract). Starting a NEW
 *     session from the same banner is the one that spends both.
 *   • **The snapshot belongs to its course.** Two courses hold two independent positions, and
 *     switching away and back offers that course's own, untouched (Invariant 8).
 *   • **The pause ✕ preserves it.** Leaving is not losing your place.
 *
 * Everything renders the real `<App />` over a mocked `fetch`, like every screen test here, and
 * every label comes from the shared fixture built FROM the canonical key list — so an assertion
 * reads `hi-mr practice.resumeContinue` and cannot pass against a hardcoded English string in the
 * shell.
 */
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../../App.tsx';
import { COMMIT_WINDOW_MS } from '../../components/useCommitWindow.ts';
import { resetContentCache } from '../../course/content.ts';
import { resetManifestCache } from '../../course/manifest.ts';
import { resetStringsCache } from '../../course/strings.ts';
import { ladderFromLevels } from '../../engine/progression.ts';
import { emptyCourseState, STORAGE_KEY, useAppStore } from '../../state/store.ts';
import type { ReviewItem, SessionSnapshot } from '../../state/types.ts';
import { levelsFixture, moduleFixture } from '../../test/courseContent.ts';
import { DEV_MANIFEST, mockContentFetch } from '../../test/courseManifest.ts';
import { stringValue } from '../../test/courseStrings.ts';
import { isResumable, resumePlan } from './resume.ts';

const COURSE = 'hi-mr';
const OTHER = 'en-ar';
/** The fixture ladder: L1-M1 and L1-M2 are authored, so passing M1 makes M2 the rung. */
const M1 = 'L1-M1';
const M2 = 'L1-M2';

/** What the fixture bundle says for a key — the self-identifying value an assertion reads. */
function strings(key: string, courseId = COURSE): string {
  return stringValue(courseId, key);
}

/** A template as the screen renders it: the course's own value, interpolated. */
function line(key: string, values: Record<string, string | number>, courseId = COURSE): string {
  let filled = strings(key, courseId);
  for (const [name, value] of Object.entries(values)) {
    filled = filled.replace(`{${name}}`, String(value));
  }
  return filled;
}

/** The banner's line for a position — the phase in the course's own name, and the card of the queue. */
function resumeLine(
  phase: 'review' | 'read' | 'produce',
  count: number,
  total: number,
  courseId = COURSE,
): string {
  return line(
    'practice.resumeLine',
    { phase: strings(`practice.phase.${phase}`, courseId), count, total },
    courseId,
  );
}

function courseState(courseId = COURSE) {
  return useAppStore.getState().courses[courseId];
}

/** Seeds a review queue directly — enrolment is the exit ritual's (#103), not this screen's. */
function seedQueue(queue: readonly ReviewItem[], courseId = COURSE): void {
  const store = useAppStore.getState();
  store.ensureCourse(courseId);
  useAppStore.setState((state) => ({
    courses: {
      ...state.courses,
      [courseId]: { ...(state.courses[courseId] ?? emptyCourseState()), reviewQueue: [...queue] },
    },
  }));
}

/** Progress the only way a module can have it (Invariant 1): the ritual, on the current rung. */
function pass(moduleId: string, courseId = COURSE): void {
  const store = useAppStore.getState();
  store.ensureCourse(courseId);
  store.setLadder(courseId, ladderFromLevels(levelsFixture(courseId).levels));
  store.passRitual(courseId, moduleId, () => '2026-02-03T09:00:00.000Z');
}

/** Renders the app on the Practice hub and waits for it. Returns the mount, so a test can kill it. */
async function renderHub(courseId = COURSE) {
  window.location.hash = '#/practice';
  mockContentFetch(DEV_MANIFEST);
  const view = render(<App />);
  await screen.findByText(strings('practice.hubTitle', courseId));
  return view;
}

/** Waits for the hub's CTA (it needs the rung's module) and taps it. */
async function begin(label = 'practice.beginRead', courseId = COURSE): Promise<void> {
  fireEvent.click(await screen.findByRole('button', { name: strings(label, courseId) }));
}

function chip(phase: 'review' | 'read' | 'produce', courseId = COURSE): HTMLElement {
  return screen.getByRole('button', { name: strings(`practice.phase.${phase}`, courseId) });
}

/**
 * Reveal → mark: one card, answered the way a learner answers it. The Next went on #313, so the
 * commit is the window elapsing.
 */
function answer(mark: 'mark.gotIt' | 'mark.missed', courseId = COURSE): void {
  fireEvent.click(screen.getByRole('button', { name: strings('revealLabel', courseId) }));
  fireEvent.click(screen.getByRole('button', { name: strings(mark, courseId) }));
  act(() => {
    vi.advanceTimersByTime(COMMIT_WINDOW_MS);
  });
}

/** The banner's two controls, by the course's own labels. */
function control(key: 'practice.resumeContinue' | 'practice.resumeNew', courseId = COURSE) {
  return screen.getByRole('button', { name: strings(key, courseId) });
}

/** The rung's sentences, in the module's own order. */
function sentence(index: number, moduleId = M1) {
  return moduleFixture(moduleId).sentences[index]!;
}

/** The tab going away, and coming back. */
function visibility(state: 'visible' | 'hidden'): void {
  Object.defineProperty(document, 'visibilityState', { value: state, configurable: true });
  act(() => {
    document.dispatchEvent(new Event('visibilitychange'));
  });
}

/**
 * THE APP KILL: the document as storage holds it, a page that is gone, and a boot that reads it
 * back. `_reset()` is how the in-memory store forgets — the raw string is put back after it,
 * because that is the half a kill does not take with it.
 */
async function killAndReboot(view: { unmount: () => void }): Promise<void> {
  const document_ = window.localStorage.getItem(STORAGE_KEY) ?? '';
  view.unmount();
  useAppStore.getState()._reset();
  window.localStorage.setItem(STORAGE_KEY, document_);
  await act(async () => {
    await useAppStore.persist.rehydrate();
  });
}

beforeEach(() => {
  resetContentCache();
  resetManifestCache();
  resetStringsCache();
  useAppStore.getState()._reset();
  window.localStorage.clear();
  window.location.hash = '';
  // The self-mark commits on a timer since #313, so every card answered here needs one.
  vi.useFakeTimers({ shouldAdvanceTime: true });
  // Seeded AFTER the clear above: the show-once hints (#319) live in localStorage too, and this
  // file is about the snapshot, not about which visit a learner is on.
  for (const hint of ['recall', 'production', 'check']) {
    window.localStorage.setItem(`rung:hint:${hint}`, '1');
  }
});

afterEach(() => {
  vi.useRealTimers();
  visibility('visible');
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  window.location.hash = '';
});

/* ------------------------------------------------------------------------ the flush */

/**
 * The snapshot is written from an effect, and an effect is scheduled work: a page that is
 * backgrounded, frozen or discarded in the gap after the tap never runs it, and the position comes
 * back one card stale. These two cases stand in for exactly that gap — the store is cleared behind
 * the session's back, so nothing but the flush can put the position there again (the component's
 * own write depends on the position, and the position has not changed).
 */
describe('the flush', () => {
  /** A session read one card in, with the scheduled write undone. */
  async function pendingAdvance(): Promise<SessionSnapshot> {
    await renderHub();
    await begin();
    await screen.findByText(sentence(0).display);
    fireEvent.click(screen.getByRole('button', { name: strings('read.next') }));
    await screen.findByText(sentence(1).display);

    useAppStore.getState().setSession(COURSE, null);
    expect(courseState()?.session).toBeNull();

    return { phase: 'read', idx: 1, queue: [`${M1}-S01`, `${M1}-S02`] };
  }

  it('writes the position the page was showing when the tab went hidden', async () => {
    const position = await pendingAdvance();

    visibility('hidden');

    expect(courseState()?.session).toEqual(position);
  });

  it('writes it on pagehide too — the path an unload takes', async () => {
    const position = await pendingAdvance();

    act(() => {
      window.dispatchEvent(new Event('pagehide'));
    });

    expect(courseState()?.session).toEqual(position);
  });

  it('writes nothing when the tab comes BACK — returning is not a moment to save', async () => {
    await pendingAdvance();

    visibility('visible');

    expect(courseState()?.session).toBeNull();
  });

  it('is gone with the session: a hub in the background writes no position', async () => {
    await renderHub();
    await begin();
    fireEvent.click(screen.getByRole('button', { name: strings('a11y.pauseSession') }));
    await screen.findByText(strings('practice.hubTitle'));
    useAppStore.getState().setSession(COURSE, null);

    visibility('hidden');

    expect(courseState()?.session).toBeNull();
  });
});

/* ------------------------------------------------------------------- the app kill */

describe('an app kill', () => {
  it('comes back to the exact card, through a real reload of the document', async () => {
    const view = await renderHub();
    await begin();
    fireEvent.click(chip('produce'));
    await screen.findByText(strings('revealLabel'));
    answer('mark.gotIt');
    // A Produce card shows the CUE and hides the L2 line until it is revealed (#93) — which is
    // exactly what makes it worth asserting on: the resumed session must come back to the same
    // unanswered card, not to an answer.
    await screen.findByText(sentence(1).cue);
    expect(courseState()?.session).toEqual({
      phase: 'produce',
      idx: 1,
      queue: [`${M1}-S01`, `${M1}-S02`],
    });

    await killAndReboot(view);
    await renderHub();

    // The hub offers it, in the course's own words, and says where it stopped.
    expect(await screen.findByText(resumeLine('produce', 2, 2))).toBeInTheDocument();
    fireEvent.click(control('practice.resumeContinue'));

    // …the same phase, the same card, the same place in the same queue.
    expect(chip('produce')).toHaveAttribute('aria-pressed', 'true');
    expect(await screen.findByText('2 / 2')).toBeInTheDocument();
    expect(screen.getByText(sentence(1).cue)).toBeInTheDocument();
    expect(screen.queryByText(sentence(1).display)).not.toBeInTheDocument();
    expect(courseState()?.session).toEqual({
      phase: 'produce',
      idx: 1,
      queue: [`${M1}-S01`, `${M1}-S02`],
    });
    // And the got-it from before the kill is still counted, once.
    expect(courseState()?.production).toEqual({ [`${M1}-S01`]: 1 });
  });

  it('comes back mid-Read as well — the phase is the snapshot’s, not the plan’s', async () => {
    const view = await renderHub();
    await begin();
    await screen.findByText(sentence(0).display);
    fireEvent.click(screen.getByRole('button', { name: strings('read.next') }));
    await screen.findByText(sentence(1).display);

    await killAndReboot(view);
    await renderHub();

    expect(await screen.findByText(resumeLine('read', 2, 2))).toBeInTheDocument();
    fireEvent.click(control('practice.resumeContinue'));

    expect(await screen.findByText(sentence(1).display)).toBeInTheDocument();
    expect(chip('read')).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByText('2 / 2')).toBeInTheDocument();
  });

  it('keeps the review cards it was serving, in the order it was serving them', async () => {
    pass(M1);
    seedQueue([
      { sentenceId: `${M1}-S01`, box: 1, dueInSessions: 0 },
      { sentenceId: `${M1}-S02`, box: 1, dueInSessions: 0 },
    ]);
    const view = await renderHub();
    await begin('practice.beginReview');
    await screen.findByText(strings('revealLabel'));
    answer('mark.gotIt');

    // The first card is answered, so its box has moved: re-deriving "what is due" would now serve
    // a different list, and the snapshot's own order is what the position means.
    await killAndReboot(view);
    await renderHub();
    fireEvent.click(control('practice.resumeContinue'));

    expect(await screen.findByText('2 / 2')).toBeInTheDocument();
    expect(courseState()?.session).toEqual({
      phase: 'review',
      idx: 1,
      queue: [`${M1}-S01`, `${M1}-S02`],
    });
  });
});

/* ------------------------------------------------------- one session, counted once */

describe('a resume is not a session', () => {
  beforeEach(() => {
    pass(M1);
    seedQueue([{ sentenceId: `${M1}-S01`, box: 2, dueInSessions: 3 }]);
  });

  it('counts once and ticks once across start → kill → resume → finish', async () => {
    const view = await renderHub();
    await begin();

    // The one start: the count spent, and the queue one session closer to due.
    expect(courseState()?.sessionCount).toBe(1);
    expect(courseState()?.reviewQueue).toEqual([
      { sentenceId: `${M1}-S01`, box: 2, dueInSessions: 2 },
    ]);

    fireEvent.click(chip('produce'));
    await screen.findByText(strings('revealLabel'));
    await killAndReboot(view);
    await renderHub();
    fireEvent.click(control('practice.resumeContinue'));
    await screen.findByText(strings('revealLabel'));

    // Resuming spends neither: not the count (closing a tab is not a session), and not the tick
    // (the queue would come due twice on one sitting's work).
    expect(courseState()?.sessionCount).toBe(1);
    expect(courseState()?.reviewQueue).toEqual([
      { sentenceId: `${M1}-S01`, box: 2, dueInSessions: 2 },
    ]);

    // …and finishing the resumed session still leaves one.
    answer('mark.gotIt');
    await screen.findByText(strings('revealLabel'));
    answer('mark.gotIt');
    await screen.findByText(strings('practice.summaryTitle'));

    expect(courseState()?.sessionCount).toBe(1);
    expect(courseState()?.reviewQueue).toEqual([
      { sentenceId: `${M1}-S01`, box: 2, dueInSessions: 2 },
    ]);
    // A session that reached its end is not one to resume.
    expect(courseState()?.session).toBeNull();
  });

  it('starts a NEW one from the same banner — the snapshot dropped, the count spent', async () => {
    await renderHub();
    await begin();
    fireEvent.click(chip('produce'));
    await screen.findByText(strings('revealLabel'));
    answer('mark.gotIt');
    fireEvent.click(screen.getByRole('button', { name: strings('a11y.pauseSession') }));
    await screen.findByText(strings('practice.hubTitle'));

    fireEvent.click(control('practice.resumeNew'));

    // A fresh session: counted, ticked a second time, and opened at the first card of its first
    // phase — the old position is gone rather than resumed.
    expect(courseState()?.sessionCount).toBe(2);
    expect(courseState()?.reviewQueue).toEqual([
      { sentenceId: `${M1}-S01`, box: 2, dueInSessions: 1 },
    ]);
    // M1 is passed in this block, so the rung being practised is M2.
    expect(courseState()?.session).toEqual({
      phase: 'read',
      idx: 0,
      queue: [`${M2}-S01`, `${M2}-S02`],
    });
    expect(await screen.findByText(sentence(0, M2).display)).toBeInTheDocument();
    // What the interrupted half EARNED is untouched: the counters are not a session's to reset.
    expect(courseState()?.production).toEqual({ [`${M2}-S01`]: 1 });
  });
});

/* ------------------------------------------------------------------- the pause ✕ */

describe('the pause ✕', () => {
  it('lands on the hub with the position intact, and the hub offers it back', async () => {
    await renderHub();
    await begin();
    fireEvent.click(chip('produce'));
    await screen.findByText(strings('revealLabel'));

    fireEvent.click(screen.getByRole('button', { name: strings('a11y.pauseSession') }));

    expect(await screen.findByText(strings('practice.hubTitle'))).toBeInTheDocument();
    expect(courseState()?.session).toEqual({
      phase: 'produce',
      idx: 0,
      queue: [`${M1}-S01`, `${M1}-S02`],
    });
    expect(screen.getByText(resumeLine('produce', 1, 2))).toBeInTheDocument();

    fireEvent.click(control('practice.resumeContinue'));

    expect(chip('produce')).toHaveAttribute('aria-pressed', 'true');
    expect(await screen.findByText('1 / 2')).toBeInTheDocument();
    expect(courseState()?.sessionCount).toBe(1);
  });
});

/* ------------------------------------------------------------------- the banner */

describe('the resume banner', () => {
  it('is not there when there is no session to resume — the hub offers Begin', async () => {
    await renderHub();

    expect(
      await screen.findByRole('button', { name: strings('practice.beginRead') }),
    ).toBeVisible();
    expect(
      screen.queryByRole('button', { name: strings('practice.resumeContinue') }),
    ).not.toBeInTheDocument();
  });

  it('replaces the Begin CTA rather than sitting beside it', async () => {
    await renderHub();
    await begin();
    fireEvent.click(screen.getByRole('button', { name: strings('a11y.pauseSession') }));
    await screen.findByText(strings('practice.hubTitle'));

    expect(control('practice.resumeContinue')).toBeInTheDocument();
    expect(control('practice.resumeNew')).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: strings('practice.beginRead') }),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: strings('practice.beginReview') }),
    ).not.toBeInTheDocument();
  });

  it('says where the session stopped — counts, and no word about time (Invariant 2)', async () => {
    await renderHub();
    await begin();
    await screen.findByText(sentence(0).display);
    fireEvent.click(screen.getByRole('button', { name: strings('read.next') }));
    await screen.findByText(sentence(1).display);
    fireEvent.click(screen.getByRole('button', { name: strings('a11y.pauseSession') }));
    await screen.findByText(strings('practice.hubTitle'));

    expect(screen.getByText(resumeLine('read', 2, 2))).toBeInTheDocument();

    const text = screen.getByRole('main').textContent ?? '';
    expect(text).not.toMatch(/%/);
    expect(text).not.toMatch(
      /\b(ago|second|seconds|minute|minutes|min|hour|hours|day|days|week|weeks|yesterday)\b/i,
    );
    expect(text).not.toMatch(/\d{4}-\d{2}-\d{2}|\d{1,2}:\d{2}/);
  });
});

/* ------------------------------------------------------------ two courses, two places */

describe('across a course switch', () => {
  /** The bare swap (#134). The learner-facing flow with its confirmation toast is #106's. */
  async function switchTo(courseId: string): Promise<void> {
    act(() => {
      useAppStore.getState().setActiveCourse(courseId);
    });
    await screen.findByText(strings('practice.hubTitle', courseId));
  }

  it('offers each course its own position, and never the other’s', async () => {
    // hi-mr, left mid-Produce on the second card.
    await renderHub();
    await begin();
    fireEvent.click(chip('produce'));
    await screen.findByText(strings('revealLabel'));
    answer('mark.gotIt');
    await screen.findByText(sentence(1).cue);
    fireEvent.click(screen.getByRole('button', { name: strings('a11y.pauseSession') }));
    await screen.findByText(strings('practice.hubTitle'));
    const hiMr = { phase: 'produce', idx: 1, queue: [`${M1}-S01`, `${M1}-S02`] };
    expect(courseState()?.session).toEqual(hiMr);

    // …then away to the other course, which has its own session and its own first card.
    await switchTo(OTHER);
    expect(courseState(OTHER)?.session).toBeNull();
    expect(
      screen.queryByRole('button', { name: strings('practice.resumeContinue', OTHER) }),
    ).not.toBeInTheDocument();

    await begin('practice.beginRead', OTHER);
    await screen.findByText(sentence(0).display);
    fireEvent.click(screen.getByRole('button', { name: strings('read.next', OTHER) }));
    await screen.findByText(sentence(1).display);
    fireEvent.click(screen.getByRole('button', { name: strings('a11y.pauseSession', OTHER) }));
    await screen.findByText(strings('practice.hubTitle', OTHER));
    const enAr = { phase: 'read', idx: 1, queue: [`${M1}-S01`, `${M1}-S02`] };
    expect(courseState(OTHER)?.session).toEqual(enAr);
    // The other course's banner is the other course's — its own phase, its own words.
    expect(screen.getByText(resumeLine('read', 2, 2, OTHER))).toBeInTheDocument();

    // …and back: hi-mr's own position, exactly as it was left (F0 AC).
    await switchTo(COURSE);
    expect(courseState()?.session).toEqual(hiMr);
    expect(courseState(OTHER)?.session).toEqual(enAr);
    expect(screen.getByText(resumeLine('produce', 2, 2))).toBeInTheDocument();

    fireEvent.click(control('practice.resumeContinue'));

    expect(chip('produce')).toHaveAttribute('aria-pressed', 'true');
    expect(await screen.findByText('2 / 2')).toBeInTheDocument();
    // One session each, and neither switch counted as one (Invariant 8).
    expect(courseState()?.sessionCount).toBe(1);
    expect(courseState(OTHER)?.sessionCount).toBe(1);
    expect(courseState()?.production).toEqual({ [`${M1}-S01`]: 1 });
  });

  it('survives the switch through storage as well as through memory', async () => {
    const view = await renderHub();
    await begin();
    await screen.findByText(sentence(0).display);
    fireEvent.click(screen.getByRole('button', { name: strings('read.next') }));
    await screen.findByText(sentence(1).display);
    fireEvent.click(screen.getByRole('button', { name: strings('a11y.pauseSession') }));
    await screen.findByText(strings('practice.hubTitle'));
    await switchTo(OTHER);

    // The kill happens while the OTHER course is active, and the reboot comes up in it.
    await killAndReboot(view);
    await renderHub(OTHER);
    expect(
      screen.queryByRole('button', { name: strings('practice.resumeContinue', OTHER) }),
    ).not.toBeInTheDocument();

    await switchTo(COURSE);

    expect(screen.getByText(resumeLine('read', 2, 2))).toBeInTheDocument();
    fireEvent.click(control('practice.resumeContinue'));
    await waitFor(() => {
      expect(screen.getByText('2 / 2')).toBeInTheDocument();
    });
    expect(courseState()?.sessionCount).toBe(1);
  });
});

/* ------------------------------------------------------------------ the pure join */

/**
 * `resumePlan` on its own: which queue a resumed session serves. The rule is that the phase named
 * by the snapshot keeps ITS order verbatim — the cards already answered have moved boxes, so
 * re-deriving that list would shift the position under the learner — while the phase it does not
 * name is planned fresh against the state as it now stands.
 */
describe('resumePlan', () => {
  const RUNG = ['L1-M2-S01', 'L1-M2-S02', 'L1-M2-S03'];
  const INPUT = {
    queue: [
      { sentenceId: 'L1-M1-S01', box: 1 as const, dueInSessions: 0 },
      { sentenceId: 'L1-M1-S02', box: 2 as const, dueInSessions: 4 },
    ],
    moduleSentenceIds: RUNG,
    production: { 'L1-M2-S01': 2, 'L1-M2-S02': 0, 'L1-M2-S03': 1 },
  };

  it('keeps a review snapshot’s own queue, and plans Produce fresh', () => {
    const snapshot: SessionSnapshot = {
      phase: 'review',
      idx: 1,
      queue: ['L1-M1-S01', 'L1-M1-S02'],
    };

    const plan = resumePlan(snapshot, INPUT);

    // Both cards, including the one that is no longer due — it was in the session being resumed.
    expect(plan.reviewIds).toEqual(['L1-M1-S01', 'L1-M1-S02']);
    // Produce has no stored order to honour: least-produced first, as of now.
    expect(plan.produceIds).toEqual(['L1-M2-S02', 'L1-M2-S03', 'L1-M2-S01']);
  });

  it('keeps a produce snapshot’s own queue, and plans Review fresh', () => {
    const snapshot: SessionSnapshot = { phase: 'produce', idx: 2, queue: [...RUNG] };

    const plan = resumePlan(snapshot, INPUT);

    expect(plan.produceIds).toEqual(RUNG);
    expect(plan.reviewIds).toEqual(['L1-M1-S01']);
  });

  it('plans both fresh for a read snapshot — Read walks the rung itself', () => {
    const snapshot: SessionSnapshot = { phase: 'read', idx: 1, queue: [...RUNG] };

    const plan = resumePlan(snapshot, INPUT);

    expect(plan.reviewIds).toEqual(['L1-M1-S01']);
    expect(plan.produceIds).toEqual(['L1-M2-S02', 'L1-M2-S03', 'L1-M2-S01']);
  });

  it('copies the snapshot’s queue rather than handing it out', () => {
    const snapshot: SessionSnapshot = { phase: 'produce', idx: 0, queue: [...RUNG] };

    const plan = resumePlan(snapshot, INPUT);
    plan.produceIds.push('L1-M2-S04');

    expect(snapshot.queue).toEqual(RUNG);
  });

  it('calls a position with no cards in it unresumable — a blank card is not a place', () => {
    expect(isResumable(null)).toBe(false);
    expect(isResumable({ phase: 'read', idx: 0, queue: [] })).toBe(false);
    expect(isResumable({ phase: 'read', idx: 0, queue: [`${M1}-S01`] })).toBe(true);
  });
});
