/**
 * Practice (#96) — the hub, the session machine, and the one rule the whole ticket exists for:
 *
 *   • **the routing contract, in both directions** (PRD §8 F4) — a Review mark moves a Leitner box
 *     and NEVER a production counter; a Produce got-it moves a counter and NEVER the queue,
 *   • **one session, counted once**: `startSession` is called on Begin and by nothing else, so
 *     `sessionCount` goes up by one and the queue ticks by one,
 *   • **the chips guide, they never gate**: Produce is reachable without reviewing or reading, and
 *     a Review chip with nothing due answers honestly instead of opening an empty phase,
 *   • **the summary is counts**, from the course's own templates — no clock, no duration, no
 *     percentage (Invariant 2),
 *   • **the snapshot is written per course on every advance**, and cleared at the summary (F7).
 *
 * Everything renders the real `<App />` over a mocked `fetch`, like every screen test here: the
 * session runs inside the shell's immersive rule, and a hand-wired router could pass while the
 * app's own table said something else. Strings come from the shared fixture, built FROM the
 * canonical key list, so a label reads `hi-mr practice.beginRead` — an assertion against the
 * prototype's English would pass on a hardcoded shell string, which is the one thing the strings
 * contract exists to prevent.
 */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App.tsx';
import { resetContentCache } from '../course/content.ts';
import { resetManifestCache } from '../course/manifest.ts';
import { resetStringsCache } from '../course/strings.ts';
import { ladderFromLevels } from '../engine/progression.ts';
import { emptyCourseState, useAppStore } from '../state/store.ts';
import type { ReviewItem } from '../state/types.ts';
import { levelsFixture, moduleFixture } from '../test/courseContent.ts';
import { DEV_MANIFEST, mockContentFetch } from '../test/courseManifest.ts';
import { stringValue } from '../test/courseStrings.ts';

const COURSE = 'hi-mr';
/** The fixture ladder: L1-M1 and L1-M2 are authored, L1-M3 is listed and unauthored. */
const M1 = 'L1-M1';
const M2 = 'L1-M2';

/** What the fixture bundle says for a key — the self-identifying value an assertion reads. */
function strings(key: string, courseId = COURSE): string {
  return stringValue(courseId, key);
}

/** A count line as the hub and the summary render it: the template, interpolated. */
function line(key: string, values: Record<string, number>): string {
  let filled = strings(key);
  for (const [name, value] of Object.entries(values)) {
    filled = filled.replace(`{${name}}`, String(value));
  }
  return filled;
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
function pass(...moduleIds: string[]): void {
  const store = useAppStore.getState();
  store.ensureCourse(COURSE);
  store.setLadder(COURSE, ladderFromLevels(levelsFixture(COURSE).levels));
  for (const moduleId of moduleIds) {
    store.passRitual(COURSE, moduleId, () => '2026-02-03T09:00:00.000Z');
  }
}

/** Renders the app on the Practice hub and waits for it. */
async function renderHub() {
  window.location.hash = '#/practice';
  mockContentFetch(DEV_MANIFEST);
  render(<App />);
  await screen.findByText(strings('practice.hubTitle'));
}

/** Waits for the hub's CTA (it needs the rung's module) and taps it. */
async function begin(label = 'practice.beginRead'): Promise<void> {
  fireEvent.click(await screen.findByRole('button', { name: strings(label) }));
}

function chip(phase: 'review' | 'read' | 'produce'): HTMLElement {
  return screen.getByRole('button', { name: strings(`practice.phase.${phase}`) });
}

/** Reveal → mark → Next: one card, answered the way a learner answers it. */
function answer(mark: 'mark.gotIt' | 'mark.missed'): void {
  fireEvent.click(screen.getByRole('button', { name: strings('revealLabel') }));
  fireEvent.click(screen.getByRole('button', { name: strings(mark) }));
  fireEvent.click(screen.getByRole('button', { name: strings('mark.next') }));
}

/** The cue on the card currently on screen — which sentence the session is serving. */
async function cardFor(sentenceId: string): Promise<HTMLElement> {
  const sentence = moduleFixture(sentenceId.slice(0, sentenceId.lastIndexOf('-'))).sentences.find(
    (item) => item.id === sentenceId,
  );
  return screen.findByText(sentence?.cue ?? sentenceId);
}

beforeEach(() => {
  resetContentCache();
  resetManifestCache();
  resetStringsCache();
  useAppStore.getState()._reset();
  window.location.hash = '';
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  window.location.hash = '';
});

/* ------------------------------------------------------------------------ the hub */

describe('the hub', () => {
  it('names the rung and what the three phases will serve — counts, from one plan', async () => {
    await renderHub();

    expect(await screen.findByText(`M1 · ${moduleFixture(M1).title}`)).toBeInTheDocument();
    // Nothing passed, so nothing is due: 0 to review, and the module's two sentences twice over.
    expect(screen.getByText(line('practice.hubReview', { count: 0 }))).toBeInTheDocument();
    expect(screen.getByText(line('practice.hubRead', { count: 2 }))).toBeInTheDocument();
    expect(screen.getByText(line('practice.hubProduce', { count: 2 }))).toBeInTheDocument();
    expect(screen.getByText(strings('practice.guideLine'))).toBeInTheDocument();
    expect(screen.getByRole('button', { name: strings('practice.beginRead') })).toBeInTheDocument();
  });

  it('offers to begin at Review when something is due, and counts what the tick will bring', async () => {
    pass(M1);
    // One due now, one due next session — the tick brings both, which is what the hub promises.
    seedQueue([
      { sentenceId: 'L1-M1-S01', box: 1, dueInSessions: 0 },
      { sentenceId: 'L1-M1-S02', box: 2, dueInSessions: 1 },
    ]);
    await renderHub();

    expect(await screen.findByText(line('practice.hubReview', { count: 2 }))).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: strings('practice.beginReview') }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole('button', { name: strings('practice.beginRead') }),
    ).not.toBeInTheDocument();
  });

  it('leaves the notebook invitation’s slot empty — #67 decides where it goes', async () => {
    await renderHub();

    const slot = document.querySelector('[data-slot="notebookInvitation"]');
    expect(slot).not.toBeNull();
    expect(slot?.textContent).toBe('');
    expect(screen.queryByText(strings('notebookInvitation'))).not.toBeInTheDocument();
  });

  it('offers no session on a rung nobody has authored — the note, and no CTA', async () => {
    // L1-M3 is listed with `hasContent: false`, so passing the two below it makes it the rung.
    pass(M1, M2);
    await renderHub();

    expect(await screen.findByText(strings('pendingAuthoring'))).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /practice\.begin/ })).not.toBeInTheDocument();
    expect(screen.queryByText(strings('practice.guideLine'))).not.toBeInTheDocument();
  });
});

/* -------------------------------------------------------------------- starting one */

describe('starting a session', () => {
  it('counts it once, ticks the queue once, and opens the snapshot at the first card', async () => {
    pass(M1);
    seedQueue([
      { sentenceId: 'L1-M1-S01', box: 1, dueInSessions: 0 },
      { sentenceId: 'L1-M1-S02', box: 3, dueInSessions: 4 },
    ]);
    await renderHub();

    await begin('practice.beginReview');

    expect(courseState()?.sessionCount).toBe(1);
    expect(courseState()?.reviewQueue).toEqual([
      { sentenceId: 'L1-M1-S01', box: 1, dueInSessions: 0 },
      { sentenceId: 'L1-M1-S02', box: 3, dueInSessions: 3 },
    ]);
    expect(courseState()?.session).toEqual({
      phase: 'review',
      idx: 0,
      queue: ['L1-M1-S01'],
    });
  });

  it('goes immersive: the nav is gone and the pause ✕ is the way out', async () => {
    await renderHub();

    await begin();

    expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Pause session' })).toBeInTheDocument();
  });

  it('starts at Read when nothing is due — never an empty Review phase', async () => {
    await renderHub();

    await begin();

    expect(chip('read')).toHaveAttribute('aria-pressed', 'true');
    expect(chip('review')).toHaveAttribute('aria-pressed', 'false');
    expect(courseState()?.session?.phase).toBe('read');
    // …on the rung's first sentence (#97).
    expect(await screen.findByText(moduleFixture(M1).sentences[0]!.display)).toBeInTheDocument();
  });
});

/* -------------------------------------------------------- the routing contract */

describe('a Review mark reaches the Leitner queue and never the counters', () => {
  beforeEach(() => {
    pass(M1);
    seedQueue([{ sentenceId: 'L1-M1-S01', box: 1, dueInSessions: 0 }]);
  });

  it('promotes the box on a got-it, and writes no production counter', async () => {
    await renderHub();
    await begin('practice.beginReview');
    await cardFor('L1-M1-S01');

    answer('mark.gotIt');

    expect(courseState()?.reviewQueue).toEqual([
      { sentenceId: 'L1-M1-S01', box: 2, dueInSessions: 3 },
    ]);
    expect(courseState()?.production).toEqual({});
  });

  it('sends a miss back to box 1, and still writes no production counter', async () => {
    await renderHub();
    await begin('practice.beginReview');
    await cardFor('L1-M1-S01');

    answer('mark.missed');

    expect(courseState()?.reviewQueue).toEqual([
      { sentenceId: 'L1-M1-S01', box: 1, dueInSessions: 1 },
    ]);
    expect(courseState()?.production).toEqual({});
  });

  it('hands over to Read when the last due card is answered', async () => {
    await renderHub();
    await begin('practice.beginReview');
    await cardFor('L1-M1-S01');

    answer('mark.gotIt');

    expect(chip('read')).toHaveAttribute('aria-pressed', 'true');
    expect(courseState()?.session?.phase).toBe('read');
  });
});

describe('a Produce got-it reaches the counters and never the queue', () => {
  /**
   * The discriminating seed: the very sentence about to be produced is ALSO in the review queue,
   * enrolled and not due. Nothing in the product puts it there — a rung's sentences enrol when it
   * is passed (#103), by which time it is no longer the rung being produced — and that is exactly
   * why it belongs here: without it, a Produce mark misrouted to `recordReview` would be a silent
   * no-op that no assertion could see. With it, the misroute moves a box, and these tests go red.
   */
  const ENROLLED_TWICE = [
    { sentenceId: 'L1-M1-S01', box: 2, dueInSessions: 2 },
    { sentenceId: 'L1-M2-S01', box: 2, dueInSessions: 5 },
  ] as const;

  /** What the queue must look like after a session start: ticked once, and nothing else. */
  const TICKED = [
    { sentenceId: 'L1-M1-S01', box: 2, dueInSessions: 1 },
    { sentenceId: 'L1-M2-S01', box: 2, dueInSessions: 4 },
  ];

  beforeEach(() => {
    pass(M1);
    seedQueue(ENROLLED_TWICE);
  });

  it('counts the sentence, and leaves every review box exactly where it was', async () => {
    await renderHub();
    await begin();
    fireEvent.click(chip('produce'));
    await cardFor('L1-M2-S01');

    answer('mark.gotIt');

    expect(courseState()?.production).toEqual({ 'L1-M2-S01': 1 });
    // Ticked once by the session start, and untouched by the mark — including the entry for the
    // sentence that was just produced.
    expect(courseState()?.reviewQueue).toEqual(TICKED);
  });

  it('counts nothing at all on a miss — the counters only ever go up', async () => {
    await renderHub();
    await begin();
    fireEvent.click(chip('produce'));
    await cardFor('L1-M2-S01');

    answer('mark.missed');

    expect(courseState()?.production).toEqual({});
    expect(courseState()?.reviewQueue).toEqual(TICKED);
  });

  it('serves the rung least-produced first, and moves on card by card', async () => {
    await renderHub();
    await begin();
    fireEvent.click(chip('produce'));
    await cardFor('L1-M2-S01');

    answer('mark.gotIt');
    await cardFor('L1-M2-S02');

    expect(courseState()?.session).toEqual({
      phase: 'produce',
      idx: 1,
      queue: ['L1-M2-S01', 'L1-M2-S02'],
    });
  });
});

/* ----------------------------------------------------------------- the Read phase */

/**
 * Read (#97) — the phase that costs nothing: one sentence at a time, the cue behind a toggle, and
 * a pager whose last step is Produce. The two rules under the assertions are that the CUE STARTS
 * HIDDEN (recall before recognition — the prototype opens with it showing, and this is the
 * deliberate divergence) and that the read-aloud nudge belongs to the PHASE, not to the sentence.
 */
describe('the Read phase', () => {
  /** The rung's sentences, in the module's own order — Read's material and its count. */
  function sentence(index: number) {
    return moduleFixture(M1).sentences[index]!;
  }

  /** A session that opens at Read: nothing is passed, so nothing is due. */
  async function read(): Promise<void> {
    await renderHub();
    await begin();
    await screen.findByText(sentence(0).display);
  }

  /** The pager's two controls, by the course's own labels. */
  function pager(key: 'read.prev' | 'read.next' | 'read.toProduce'): HTMLElement {
    return screen.getByRole('button', { name: strings(key) });
  }

  it('reads one sentence at a time, and counts the rung as it goes', async () => {
    await read();

    expect(screen.getByText(`READ · ${M1.split('-')[1]}`)).toBeInTheDocument();
    expect(screen.getByText('1 / 2')).toBeInTheDocument();
    // Back has nowhere to go on the rung's first sentence; the CHIPS are what never gate.
    expect(pager('read.prev')).toBeDisabled();

    fireEvent.click(pager('read.next'));

    expect(await screen.findByText(sentence(1).display)).toBeInTheDocument();
    expect(screen.getByText('2 / 2')).toBeInTheDocument();
    expect(screen.queryByText(sentence(0).display)).not.toBeInTheDocument();
    // The position is snapshotted like every other advance (PRD §8 F7).
    expect(courseState()?.session).toEqual({
      phase: 'read',
      idx: 1,
      queue: ['L1-M1-S01', 'L1-M1-S02'],
    });

    fireEvent.click(pager('read.prev'));

    expect(await screen.findByText(sentence(0).display)).toBeInTheDocument();
    expect(screen.getByText('1 / 2')).toBeInTheDocument();
  });

  it('keeps the cue hidden until it is asked for, and puts it away again', async () => {
    await read();

    expect(screen.queryByText(sentence(0).cue)).not.toBeInTheDocument();
    const toggle = screen.getByRole('button', { name: strings('read.showCue') });
    expect(toggle).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(toggle);

    expect(screen.getByText(sentence(0).cue)).toBeInTheDocument();
    const shown = screen.getByRole('button', { name: strings('read.hideCue') });
    expect(shown).toHaveAttribute('aria-expanded', 'true');

    fireEvent.click(shown);

    expect(screen.queryByText(sentence(0).cue)).not.toBeInTheDocument();
  });

  it('offers "why" and "open full" on the sentence it is showing', async () => {
    await read();

    expect(screen.getByRole('button', { name: strings('why.show') })).toBeInTheDocument();
    expect(screen.getByRole('link', { name: strings('why.openFull') })).toHaveAttribute(
      'href',
      `#/sentence/${sentence(0).id}`,
    );
  });

  it('closes "why" on a move, and leaves the cue where the learner put it', async () => {
    await read();

    fireEvent.click(screen.getByRole('button', { name: strings('read.showCue') }));
    fireEvent.click(screen.getByRole('button', { name: strings('why.show') }));
    expect(screen.getByRole('button', { name: strings('why.hide') })).toBeInTheDocument();

    fireEvent.click(pager('read.next'));

    await screen.findByText(sentence(1).display);
    // The prototype's split, kept: a new sentence's rows are not the last one's, but a learner who
    // asked for the cue asked for it for the phase.
    expect(screen.getByRole('button', { name: strings('why.show') })).toBeInTheDocument();
    expect(screen.getByText(sentence(1).cue)).toBeInTheDocument();
  });

  it('shows the read-aloud nudge ONCE, at the start of the phase — not under every sentence', async () => {
    await read();

    expect(screen.getByText(strings('nudge.read'))).toBeInTheDocument();

    fireEvent.click(pager('read.next'));

    await screen.findByText(sentence(1).display);
    expect(screen.queryByText(strings('nudge.read'))).not.toBeInTheDocument();

    // Coming back to Read is a phase start, so the instruction is worth saying again.
    fireEvent.click(chip('produce'));
    await cardFor('L1-M1-S01');
    fireEvent.click(chip('read'));

    expect(await screen.findByText(strings('nudge.read'))).toBeInTheDocument();
  });

  it('hands over to Produce when the rung has been read through', async () => {
    await read();

    fireEvent.click(pager('read.next'));
    await screen.findByText(sentence(1).display);
    // The last sentence's control says where it goes, as the prototype's does.
    fireEvent.click(pager('read.toProduce'));

    expect(chip('produce')).toHaveAttribute('aria-pressed', 'true');
    expect(courseState()?.session?.phase).toBe('produce');
    expect(courseState()?.session?.idx).toBe(0);
    expect(await screen.findByText(strings('revealLabel'))).toBeInTheDocument();
  });

  it('writes nothing on the way through: no box moves, no counter moves', async () => {
    // Enrolled and not due, so the session opens at Read with the queue standing behind it.
    seedQueue([{ sentenceId: 'L1-M1-S01', box: 2, dueInSessions: 3 }]);
    await read();

    fireEvent.click(screen.getByRole('button', { name: strings('read.showCue') }));
    fireEvent.click(pager('read.next'));
    await screen.findByText(sentence(1).display);

    // Ticked once by the session start, and by nothing since. Read is the phase between the two
    // that write, and it writes to neither.
    expect(courseState()?.reviewQueue).toEqual([
      { sentenceId: 'L1-M1-S01', box: 2, dueInSessions: 2 },
    ]);
    expect(courseState()?.production).toEqual({});
  });

  it('leaves the chips free — Produce is one tap away mid-read', async () => {
    await read();

    for (const phase of ['review', 'read', 'produce'] as const) {
      expect(chip(phase)).not.toBeDisabled();
    }

    fireEvent.click(chip('produce'));

    expect(await cardFor('L1-M1-S01')).toBeInTheDocument();
    expect(chip('produce')).toHaveAttribute('aria-pressed', 'true');
  });
});

/* ------------------------------------------------------------- the chips never gate */

describe('the chips', () => {
  it('reach Produce with nothing reviewed and nothing read', async () => {
    await renderHub();
    await begin();

    fireEvent.click(chip('produce'));

    expect(await cardFor('L1-M2-S01')).toBeInTheDocument();
    expect(chip('produce')).toHaveAttribute('aria-pressed', 'true');
  });

  it('are never disabled, in any phase', async () => {
    await renderHub();
    await begin();

    for (const phase of ['review', 'read', 'produce'] as const) {
      expect(chip(phase)).not.toBeDisabled();
    }
    fireEvent.click(chip('produce'));
    for (const phase of ['review', 'read', 'produce'] as const) {
      expect(chip(phase)).not.toBeDisabled();
    }
  });

  it('answer an empty Review honestly, in the course’s own words, and stay where they are', async () => {
    await renderHub();
    await begin();

    fireEvent.click(chip('review'));

    expect(await screen.findByRole('status')).toHaveTextContent(strings('practice.nothingDue'));
    expect(chip('read')).toHaveAttribute('aria-pressed', 'true');
    expect(chip('review')).toHaveAttribute('aria-pressed', 'false');
  });

  it('open Review when there IS something due — the refusal is about the queue, not the chip', async () => {
    pass(M1);
    seedQueue([{ sentenceId: 'L1-M1-S01', box: 1, dueInSessions: 0 }]);
    await renderHub();
    await begin('practice.beginReview');
    fireEvent.click(chip('produce'));

    fireEvent.click(chip('review'));

    expect(await cardFor('L1-M1-S01')).toBeInTheDocument();
    expect(screen.getByRole('status').textContent).toBe('');
  });
});

/* ---------------------------------------------------------------------- the summary */

describe('the summary', () => {
  /** One scripted session: one review got-it, then both produce cards — one had, one missed. */
  async function runSession(): Promise<void> {
    pass(M1);
    seedQueue([{ sentenceId: 'L1-M1-S01', box: 1, dueInSessions: 0 }]);
    await renderHub();
    await begin('practice.beginReview');

    await cardFor('L1-M1-S01');
    answer('mark.gotIt');

    fireEvent.click(chip('produce'));
    await cardFor('L1-M2-S01');
    answer('mark.gotIt');
    await cardFor('L1-M2-S02');
    answer('mark.missed');

    await screen.findByText(strings('practice.summaryTitle'));
  }

  it('counts what happened: reviewed, had, produced, and how many stand at two', async () => {
    await runSession();

    expect(screen.getByText(line('practice.summaryReviewed', { count: 1 }))).toBeInTheDocument();
    expect(screen.getByText(line('practice.summaryGotIt', { count: 1 }))).toBeInTheDocument();
    expect(screen.getByText(line('practice.summaryProduced', { count: 1 }))).toBeInTheDocument();
    // One got-it is not two: nothing on this rung is produced out yet.
    expect(
      screen.getByText(line('practice.summaryAtTwo', { count: 0, total: 2 })),
    ).toBeInTheDocument();
  });

  it('says nothing about time — no clock, no duration, no percentage (Invariant 2)', async () => {
    await runSession();

    const text = screen.getByRole('main').textContent ?? '';

    expect(text).not.toMatch(/%/);
    expect(text).not.toMatch(
      /\b(streak|second|seconds|minute|minutes|min|hour|hours|day|days|week|weeks|month|months|goal)\b/i,
    );
    expect(text).not.toMatch(/\d{4}-\d{2}-\d{2}|\d{1,2}:\d{2}/);
  });

  it('clears the snapshot: a session that reached its end is not one to resume', async () => {
    await runSession();

    expect(courseState()?.session).toBeNull();
    expect(courseState()?.sessionCount).toBe(1);
  });

  it('offers the way back to the Ladder, and taking it ends the session', async () => {
    await runSession();

    fireEvent.click(screen.getByRole('link', { name: strings('practice.backToLadder') }));

    await waitFor(() => {
      expect(screen.getByRole('navigation', { name: 'Primary' })).toBeInTheDocument();
    });
    expect(window.location.hash).toBe('#/');
  });
});

/* --------------------------------------------------------------- the snapshot, per course */

describe('the snapshot', () => {
  it('follows the learner card by card, and belongs to the course they are in', async () => {
    useAppStore.getState().ensureCourse('en-ar');
    await renderHub();
    await begin();

    fireEvent.click(chip('produce'));
    await cardFor('L1-M1-S01');
    expect(courseState()?.session).toEqual({
      phase: 'produce',
      idx: 0,
      queue: ['L1-M1-S01', 'L1-M1-S02'],
    });

    answer('mark.gotIt');

    expect(courseState()?.session?.idx).toBe(1);
    // Invariant 8: another course's position is not this session's to touch.
    expect(courseState('en-ar')?.session).toBeNull();
    expect(courseState('en-ar')?.sessionCount).toBe(0);
  });

  it('survives the pause ✕ — leaving is not losing your place (#99 picks it back up)', async () => {
    await renderHub();
    await begin();
    fireEvent.click(chip('produce'));
    await cardFor('L1-M1-S01');

    fireEvent.click(screen.getByRole('button', { name: 'Pause session' }));

    expect(await screen.findByText(strings('practice.hubTitle'))).toBeInTheDocument();
    expect(courseState()?.session).toEqual({
      phase: 'produce',
      idx: 0,
      queue: ['L1-M1-S01', 'L1-M1-S02'],
    });
    expect(courseState()?.sessionCount).toBe(1);
  });
});
