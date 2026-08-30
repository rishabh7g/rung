/**
 * The Verdict (#103) — the keystone, in five describes:
 *
 *   • **the guard**: the verdict is where Comprehension leaves you, and the entry is spent on
 *     arrival, so a reload cannot mint a second one,
 *   • **the receipt**: two checklist lines and the closing sentence, every one of them the
 *     course's own words,
 *   • **the write**: arriving passes the rung AND enrols its sentences — the ritual's one write,
 *     recorded on entry rather than on the button, because the comprehension is what earned it,
 *   • **the way out**: "climb to the ladder" carries the one-shot unlock flag,
 *   • **the whole loop**: produced rung → arc → hold → comprehension → verdict → Ladder, walked
 *     end to end through the real app, with the beat landing once on the rung that just opened and
 *     not again on the next visit.
 *
 * Everything renders the real `<App />` over a mocked `fetch`, the way every screen test in this
 * repo does. The strings fixture is built FROM the canonical key list, so an assertion reads
 * `hi-mr verdict.checkComprehension` — asserting the prototype's English would pass on a hardcoded
 * shell string, which is the one thing the strings contract exists to prevent.
 */
import { StrictMode } from 'react';
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App.tsx';
import { COMMIT_WINDOW_MS } from '../components/useCommitWindow.ts';
import { resetContentCache } from '../course/content.ts';
import { resetManifestCache } from '../course/manifest.ts';
import { resetStringsCache } from '../course/strings.ts';
import { handover, justPassed } from '../shell/routes.tsx';
import { useAppStore } from '../state/store.ts';
import { DEV_MANIFEST, mockContentFetch } from '../test/courseManifest.ts';
import { moduleFixture } from '../test/courseContent.ts';
import { stringValue } from '../test/courseStrings.ts';

const COURSE = 'hi-mr';
/** The fixture ladder's current rung, and the one this verdict is always about. */
const CURRENT = 'L1-M1';
/** The rung it opens — the fixture's L1 is `L1-M1`, `L1-M2`, `L1-M3` — as the Ladder prints it. */
const NEXT_KICKER = 'M2 · CURRENT RUNG';

/** What the fixture bundle says for a key — the self-identifying value an assertion reads. */
function strings(key: string): string {
  return stringValue(COURSE, key);
}

/** The two sentences `moduleFixture` teaches, by id. */
const SENTENCES = [`${CURRENT}-S01`, `${CURRENT}-S02`];

/**
 * Seeds production the only way the app can: one `recordProduction` per Produce-phase got-it. Two
 * per sentence across the whole rung is exactly what `exit_available` means (PRD §8 F1) — and it
 * is what opens the ritual this screen ends.
 */
function produceRung(): void {
  const store = useAppStore.getState();
  store.ensureCourse(COURSE);
  for (let round = 0; round < 2; round += 1) {
    for (const sentenceId of SENTENCES) store.recordProduction(COURSE, sentenceId);
  }
}

/**
 * Renders the app at `hash`, seeding the history entry's location state — which is where the
 * ritual's hand-over travels (#102): `history.state.usr` is what React Router reads back, so this
 * is the entry Comprehension's own `navigate(…, {state})` would have written, without replaying
 * the whole test inside a case about this screen. The full walk is the last describe.
 */
async function renderAt(hash: string, state?: unknown, module: unknown = moduleFixture(CURRENT)) {
  window.location.hash = hash;
  if (state !== undefined) window.history.replaceState({ usr: state, key: 'seed', idx: 0 }, '');
  mockContentFetch(DEV_MANIFEST, undefined, { module });
  // Under `<StrictMode>`, as `main.tsx` mounts it — and that is not incidental here: this screen
  // WRITES from an effect, and StrictMode invokes every effect twice against the same render's
  // values. A second `completeRitual` for a rung the first one just passed would throw out of
  // `passRitual` (Invariant 1), so the double-invoke is the case, not a detail of the harness.
  render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
  await screen.findByRole('main');
}

/**
 * The receipt's last line, in the course's own words — the module's own `exitTest.comprehendCount`
 * on both sides of it, which is "2 of 2" for the fixture. The anchor that says the verdict is up.
 */
function comprehensionCheck(): string {
  return strings('verdict.checkComprehension').replace('{count}', '2').replace('{total}', '2');
}

/** The verdict, once it has drawn: found by the last line of the receipt it ends on. */
async function verdict(): Promise<HTMLElement> {
  await screen.findByText(comprehensionCheck());
  return screen.getByRole('main');
}

/** The passed-modules map as it stands right now. */
function modules() {
  return useAppStore.getState().courses[COURSE]?.modules;
}

function reviewQueue() {
  return useAppStore.getState().courses[COURSE]?.reviewQueue ?? [];
}

/** What the current history entry carries — the unlock beat's one-shot flag, or nothing. */
function flag(): string | null {
  return justPassed((window.history.state as { usr?: unknown } | null)?.usr);
}

beforeEach(() => {
  resetContentCache();
  resetManifestCache();
  resetStringsCache();
  useAppStore.getState()._reset();
  window.location.hash = '';
  window.history.replaceState(null, '');
  // The show-once hints (#319) have tests of their own; seeded as seen so this file sees the
  // steady-state screens its assertions were written against.
  for (const hint of ['recall', 'production', 'check']) {
    localStorage.setItem(`rung:hint:${hint}`, '1');
  }
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  localStorage.clear();
  window.location.hash = '';
});

/* ------------------------------------------------------------------------- the guard */

describe('the verdict is where the comprehension leaves you', () => {
  it('opens on the receipt when the hand-over says the test was taken', async () => {
    produceRung();
    await renderAt('#/verdict', handover('comprehension'));

    expect(await screen.findByText(comprehensionCheck())).toBeVisible();
    expect(window.location.hash).toBe('#/verdict');
  });

  it('sends a deep link to the Ladder — the ritual is over, and its result is there', async () => {
    produceRung();
    await renderAt('#/verdict');

    await waitFor(() => expect(window.location.hash).toBe('#/'));
    expect(modules()).toEqual({});
  });

  it('spends the entry on arrival, so a reload cannot mint a second verdict', async () => {
    produceRung();
    await renderAt('#/verdict', handover('comprehension'));
    await verdict();

    // The token is gone from the entry the screen is standing on — and the screen is still up.
    const usr = (window.history.state as { usr?: unknown } | null)?.usr;
    expect(usr).toBeNull();
    expect(screen.getByText(comprehensionCheck())).toBeVisible();
  });

  it('has nothing to show for a rung that was never produced out', async () => {
    // No counters: the token is a key, not a claim — the ladder is still asked (#95, #102).
    await renderAt('#/verdict', handover('comprehension'));

    await waitFor(() => expect(window.location.hash).toBe(`#/module/${CURRENT}`));
    expect(modules()).toEqual({});
  });

  it('renders under the shell’s back header, as a child of the rung', async () => {
    produceRung();
    await renderAt('#/verdict', handover('comprehension'));
    await verdict();

    expect(screen.getByRole('button', { name: 'Back to the ladder' })).toBeVisible();
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Verdict');
  });
});

/* ----------------------------------------------------------------------- the receipt */

describe('the checklist is the learner’s receipt, in the course’s own words', () => {
  it('renders both checks and the closing line from strings', async () => {
    produceRung();
    await renderAt('#/verdict', handover('comprehension'));
    const main = await verdict();

    // The 11th sentence: the course's own ordinal for "the one after the ten this rung taught".
    const ordinal = strings('ordinal').replace('{n}', '3');
    expect(
      within(main).getByText(strings('verdict.checkSentence').replace('{ordinal}', ordinal)),
    ).toBeVisible();
    // The module's own `exitTest.comprehendCount` — 2 of 2, from the file rather than the shell.
    expect(within(main).getByText(comprehensionCheck())).toBeVisible();
    // Two lines and no more: the receipt is what the learner did, and nothing about the app.
    expect(within(main).getAllByRole('listitem')).toHaveLength(2);
    // And the course's closing sentence, naming the rung that just opened by its own title.
    expect(
      within(main).getByText(strings('verdict.line').replace('{nextModule}', 'First exchange')),
    ).toBeVisible();
  });

  it('names the rung it is about, and says nothing the shell made up', async () => {
    produceRung();
    await renderAt('#/verdict', handover('comprehension'));
    const main = await verdict();

    expect(within(main).getByRole('heading', { level: 2 }).textContent).toBe('M1 · Passed');
    expect(within(main).getByText('EXIT RITUAL COMPLETE')).toBeVisible();
  });

  it('drops the closing line at the top of the ladder — nothing opened, so nothing is named', async () => {
    // A ladder of one rung: passing it opens nothing, and the completion state is quiet.
    const oneRung = {
      courseId: COURSE,
      levels: [
        {
          id: 'L1',
          name: 'Foundations',
          tagline: 'say what you need',
          draft: false,
          draftNote: null,
          modules: [
            { id: CURRENT, title: 'Who I am', job: 'Introduce yourself', hasContent: true },
          ],
        },
      ],
    };
    produceRung();
    window.location.hash = '#/verdict';
    window.history.replaceState({ usr: handover('comprehension'), key: 'seed', idx: 0 }, '');
    mockContentFetch(DEV_MANIFEST, undefined, { levels: oneRung });
    render(
      <StrictMode>
        <App />
      </StrictMode>,
    );
    const main = await verdict();

    expect(within(main).getByText(comprehensionCheck())).toBeVisible();
    expect(within(main).queryByText(/verdict\.line/)).toBeNull();
    // The pass still happened: a last rung is a rung.
    await waitFor(() => expect(modules()?.[CURRENT]?.status).toBe('passed'));
  });
});

/* ------------------------------------------------------------------------- the write */

describe('arriving is what records the ritual', () => {
  it('passes the rung and enrols its sentences — the pass does not wait for the button', async () => {
    produceRung();
    await renderAt('#/verdict', handover('comprehension'));
    await verdict();

    await waitFor(() =>
      expect(modules()).toEqual({ [CURRENT]: { status: 'passed', passedAt: expect.any(String) } }),
    );
    expect(reviewQueue()).toEqual([
      { sentenceId: SENTENCES[0], box: 1, dueInSessions: 1 },
      { sentenceId: SENTENCES[1], box: 1, dueInSessions: 1 },
    ]);
  });

  it('writes once, however many times the screen re-renders', async () => {
    produceRung();
    await renderAt('#/verdict', handover('comprehension'));
    await verdict();
    await waitFor(() => expect(modules()?.[CURRENT]).toBeDefined());
    const passed = modules();

    // A real re-render on the same mount: a store write the screen is subscribed to. `StrictMode`
    // has already double-invoked the effect once; this makes the component render again with the
    // ladder moved on. A second `completeRitual` for a rung that is no longer current would throw
    // out of `passRitual`, so "still standing" is half the assertion and "same object" is the
    // other — nothing rebuilt the map, so nothing wrote it twice.
    act(() => useAppStore.getState().markStudied(COURSE, 'L1-M2'));

    expect(modules()).toBe(passed);
    expect(screen.getByText(comprehensionCheck())).toBeVisible();
  });

  it('moves the ladder on: the next rung is current the moment the verdict is up', async () => {
    produceRung();
    await renderAt('#/verdict', handover('comprehension'));
    await verdict();

    await waitFor(() => expect(modules()?.[CURRENT]).toBeDefined());
    fireEvent.click(screen.getByRole('link', { name: strings('verdict.toLadder') }));

    // The Ladder's own card, for the rung that just opened.
    expect(await screen.findByText(NEXT_KICKER)).toBeVisible();
  });
});

/* ----------------------------------------------------------------------- the way out */

describe('“climb to the ladder” carries the beat', () => {
  it('is a link to the Ladder, and it hands over the rung that was just passed', async () => {
    produceRung();
    await renderAt('#/verdict', handover('comprehension'));
    await verdict();

    fireEvent.click(screen.getByRole('link', { name: strings('verdict.toLadder') }));

    await waitFor(() => expect(window.location.hash).toBe('#/'));
    // The Ladder spends the flag as it lands, so what is asserted here is the beat itself.
    expect(await screen.findByText(NEXT_KICKER)).toBeVisible();
    expect(document.querySelector('[data-beat="rung"]')).not.toBeNull();
  });
});

/* ------------------------------------------------------------------ the whole loop */

describe('the loop closes: produced rung → ritual → comprehension → verdict → ladder', () => {
  it('walks it end to end, and the beat lands once on the rung that opened', async () => {
    produceRung();
    /**
     * Fake timers for the whole walk: two of the chain's steps are timers rather than taps now —
     * each self-mark's commit window (#313).
     */
    vi.useFakeTimers({ shouldAdvanceTime: true });
    try {
      // The ritual IS the comprehension test since #348: opening it opens the items.
      await renderAt('#/ritual');
      await screen.findByRole('main');

      // Two items, revealed and marked "same meaning" — the only way to the verdict.
      for (let item = 0; item < 2; item += 1) {
        fireEvent.click(screen.getByRole('button', { name: strings('revealLabelComprehend') }));
        fireEvent.click(screen.getByRole('button', { name: strings('mark.gotIt') }));
        act(() => vi.advanceTimersByTime(COMMIT_WINDOW_MS));
      }

      await waitFor(() => expect(window.location.hash).toBe('#/verdict'));
    } finally {
      vi.useRealTimers();
    }
    await verdict();
    await waitFor(() => expect(modules()?.[CURRENT]?.status).toBe('passed'));
    expect(reviewQueue().map((item) => item.sentenceId)).toEqual(SENTENCES);

    // The climb: the flag rides on the navigation, and the Ladder spends it on arrival.
    fireEvent.click(screen.getByRole('link', { name: strings('verdict.toLadder') }));
    await waitFor(() => expect(window.location.hash).toBe('#/'));
    expect(await screen.findByText(NEXT_KICKER)).toBeVisible();
    expect(document.querySelector('[data-beat="rung"]')).not.toBeNull();
    await waitFor(() => expect(flag()).toBeNull());

    // And a revisit is a Ladder with nothing to celebrate: same rung, no beat.
    fireEvent.click(screen.getByRole('link', { name: 'Practice' }));
    await screen.findByText(strings('practice.hubTitle'));
    fireEvent.click(screen.getByRole('link', { name: 'Ladder' }));

    expect(await screen.findByText(NEXT_KICKER)).toBeVisible();
    expect(document.querySelector('[data-beat="rung"]')).toBeNull();
    // The pass is still there — only the celebration is over.
    expect(modules()?.[CURRENT]?.status).toBe('passed');
  });
});
