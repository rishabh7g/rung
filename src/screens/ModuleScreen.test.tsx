/**
 * The module list (#88) — the five promises the screen makes, one describe each:
 *
 *   • a rung the ladder has not opened is not browsable, however it is asked for,
 *   • opening one **marks it studied, exactly once** — the write that moves the rung card [D22],
 *   • cards expand in place and **independently**: one open card is one open card,
 *   • the production dots read the counters and nothing else (0 / 1 / ≥2),
 *   • and a detour into Sentence Detail comes back to the same scroll offset and the same open
 *     cards (PRD-design §6.4).
 *
 * Everything renders the real `<App />` over a mocked `fetch`, the way every screen test in this
 * repo does: this screen is a guarded route, and a guard that works in a hand-wired router while
 * the app's table says something else is exactly the bug worth catching. The strings fixture is
 * built FROM the canonical key list, so a label reads `hi-mr module.openFull` — an assertion
 * against the prototype's English would pass on a hardcoded shell string, which is the one thing
 * the strings contract exists to prevent.
 */
import { act, cleanup, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App.tsx';
import { resetContentCache } from '../course/content.ts';
import { resetManifestCache } from '../course/manifest.ts';
import { resetStringsCache } from '../course/strings.ts';
import { ladderFromLevels } from '../engine/progression.ts';
import { useAppStore } from '../state/store.ts';
import { DEV_MANIFEST, mockContentFetch } from '../test/courseManifest.ts';
import { levelsFixture, moduleFixture, romanizedModuleFixture } from '../test/courseContent.ts';
import { stringValue } from '../test/courseStrings.ts';
import { moduleViewKey, readModuleView } from './module/moduleView.ts';

const COURSE = 'hi-mr';
/** The fixture ladder: L1-M1 authored and current, L1-M2 authored and locked, L1-M3 unauthored. */
const CURRENT = 'L1-M1';
const LOCKED = 'L1-M2';

/** What the fixture bundle says for a key — the self-identifying value an assertion reads. */
function strings(key: string, courseId = COURSE): string {
  return stringValue(courseId, key);
}

/** Renders the app at a hash and waits for the frame; the screen decides what lands in it. */
async function renderAt(hash: string, content: Parameters<typeof mockContentFetch>[2] = {}) {
  window.location.hash = hash;
  mockContentFetch(DEV_MANIFEST, undefined, content);
  render(<App />);
  await screen.findByRole('main');
}

/** Renders the module list and waits for its cards. */
async function renderModule(moduleId = CURRENT) {
  await renderAt(`#/module/${moduleId}`);
  await screen.findByText(moduleFixture(moduleId).sentences[0]!.display);
}

/**
 * The cards, in module order. A card is a list item with a toggle in it — which is also how it is
 * told apart from the word chips an expanded card lists inside itself.
 */
function cards(): HTMLElement[] {
  return screen
    .getAllByRole('listitem')
    .filter((item) => within(item).queryAllByRole('button').length > 0);
}

/** Which cards are open, read off the toggles' `aria-expanded` rather than off a class name. */
function openState(): boolean[] {
  return cards().map(
    (card) => within(card).getByRole('button').getAttribute('aria-expanded') === 'true',
  );
}

function toggle(index: number): void {
  fireEvent.click(within(cards()[index]!).getByRole('button'));
}

/** A card's two production dots, as the states they are drawn in. */
function dots(index: number): (string | null)[] {
  return [...cards()[index]!.querySelectorAll('[data-state]')].map((dot) =>
    dot.getAttribute('data-state'),
  );
}

/**
 * A call counter on the store's `markStudied`, cleared on the way in.
 *
 * zustand copies its actions onto every new state object it makes, so a spy installed in one test
 * is still the property in the next one — and `vi.spyOn` hands the same mock back rather than
 * wrapping it again, history included. Clearing is what makes "exactly once" mean this test.
 */
function spyOnMarkStudied() {
  const spy = vi.spyOn(useAppStore.getState(), 'markStudied');
  spy.mockClear();
  return spy;
}

/** The shell's one scroll area — jsdom has no layout, but it does hold a scrollTop. */
function scrollArea(): HTMLElement {
  return screen.getByRole('main');
}

function scrollTo(top: number): void {
  const main = scrollArea();
  main.scrollTop = top;
  fireEvent.scroll(main);
}

beforeEach(() => {
  resetContentCache();
  resetManifestCache();
  resetStringsCache();
  useAppStore.getState()._reset();
  sessionStorage.clear();
  window.location.hash = '';
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
  sessionStorage.clear();
  window.location.hash = '';
});

/* --------------------------------------------------------------------- the guard */

describe('the guard', () => {
  it('opens the current rung, with the module’s own title and its sentences', async () => {
    await renderModule();

    expect(screen.getByText('M1 · MODULE')).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 }).textContent).toBe(moduleFixture().title);
    expect(screen.getByText(strings('module.helper'))).toBeInTheDocument();
    expect(cards()).toHaveLength(moduleFixture().sentences.length);
  });

  it('closes the list with Practice — reading a rung never gates practising it', async () => {
    await renderModule();

    expect(screen.getByRole('link', { name: strings('rungCard.practice') })).toHaveAttribute(
      'href',
      '#/practice',
    );
  });

  it('keeps a passed rung open for review, and opens the new current one', async () => {
    // Progress the only way a module can have it (Invariant 1): one ritual, on the current rung.
    const store = useAppStore.getState();
    store.ensureCourse(COURSE);
    store.setLadder(COURSE, ladderFromLevels(levelsFixture(COURSE).levels));
    store.passRitual(COURSE, CURRENT, () => '2026-02-03T09:00:00.000Z');

    await renderModule(CURRENT);
    expect(screen.getByText('M1 · MODULE')).toBeInTheDocument();

    cleanup();
    await renderAt(`#/module/${LOCKED}`);
    expect(await screen.findByText('M2 · MODULE')).toBeInTheDocument();
  });

  it('sends a locked rung back to the Ladder instead of rendering it', async () => {
    await renderAt(`#/module/${LOCKED}`);

    // The Ladder, not the module: its current-rung card is the thing that proves which screen
    // this is, and the route replaced the bad entry rather than pushing over it.
    expect(await screen.findByText('M1 · CURRENT RUNG')).toBeInTheDocument();
    expect(window.location.hash).toBe('#/');
    expect(screen.queryByText('M2 · MODULE')).not.toBeInTheDocument();
  });

  it('sends an id the ladder does not list back to the Ladder too', async () => {
    await renderAt('#/module/L9-M9');

    expect(await screen.findByText('M1 · CURRENT RUNG')).toBeInTheDocument();
    expect(window.location.hash).toBe('#/');
  });
});

/* ---------------------------------------------------------------- markStudied */

describe('markStudied', () => {
  it('fires exactly once on first open, however much the screen re-renders', async () => {
    const markStudied = spyOnMarkStudied();

    await renderModule();
    // Two re-renders that must not look like a second open.
    toggle(0);
    toggle(0);

    expect(markStudied).toHaveBeenCalledTimes(1);
    expect(markStudied).toHaveBeenCalledWith(COURSE, CURRENT);
    expect(useAppStore.getState().courses[COURSE]?.studied[CURRENT]).toBe(true);
  });

  it('marks, and cannot unlock — every module status is where it was', async () => {
    await renderModule();

    await waitFor(() => {
      expect(useAppStore.getState().courses[COURSE]?.studied[CURRENT]).toBe(true);
    });
    // `modules` holds passed modules and nothing else (Invariant 1): reading a rung passes none.
    expect(useAppStore.getState().courses[COURSE]?.modules).toEqual({});
  });

  it('never marks a rung it refused to open', async () => {
    const markStudied = spyOnMarkStudied();

    await renderAt(`#/module/${LOCKED}`);
    await screen.findByText('M1 · CURRENT RUNG');

    expect(markStudied).not.toHaveBeenCalled();
  });
});

/* ------------------------------------------------------------------ expansion */

describe('a card', () => {
  it('shows the L2 line and its cue while collapsed, and nothing else', async () => {
    await renderModule();

    const sentence = moduleFixture().sentences[0]!;
    expect(screen.getByText(sentence.display)).toBeInTheDocument();
    expect(screen.getByText(sentence.cue)).toBeInTheDocument();
    // Nothing the expansion owns: not the word-for-word line, not the trap, not the way out.
    expect(screen.queryByText(sentence.literal)).not.toBeInTheDocument();
    expect(screen.queryByText(strings('module.trapNote'))).not.toBeInTheDocument();
    expect(screen.queryByText(strings('module.openFull'))).not.toBeInTheDocument();
    expect(openState()).toEqual([false, false]);
  });

  it('expands in place into the gloss, the literal, its word rows and "open full"', async () => {
    await renderModule();
    toggle(0);

    const sentence = moduleFixture().sentences[0]!;
    const card = within(cards()[0]!);

    expect(card.getByText(sentence.glossEn)).toBeInTheDocument();
    expect(card.getByText(sentence.literal)).toBeInTheDocument();
    for (const word of sentence.deconstruction.words) {
      expect(card.getByText(word.display)).toBeInTheDocument();
    }
    expect(card.getByText(strings('module.trapNote'))).toBeInTheDocument();
    expect(card.getByRole('link', { name: strings('module.openFull') })).toHaveAttribute(
      'href',
      `#/sentence/${sentence.id}`,
    );
  });

  it('leaves out what the sentence has not got — no trap note without a trap', async () => {
    await renderModule();
    // The fixture's second sentence carries no `trap`, and a section vanishes when a sentence
    // honestly has nothing to put in it (PRD §8 F3, the same rule Detail's [D10] order obeys).
    toggle(1);

    expect(within(cards()[1]!).queryByText(strings('module.trapNote'))).not.toBeInTheDocument();
  });

  it('opens and closes independently of every other card', async () => {
    await renderModule();

    toggle(0);
    expect(openState()).toEqual([true, false]);

    toggle(1);
    expect(openState()).toEqual([true, true]);

    toggle(0);
    expect(openState()).toEqual([false, true]);
  });
});

/* ---------------------------------------------------------------- the dots */

describe('the production dots', () => {
  it('draw 0, 1 and ≥2 got-its off the store’s counters', async () => {
    const first = `${CURRENT}-S01`;
    const second = `${CURRENT}-S02`;

    // The counters are written in Practice (#95); until that action exists, seeding the map is
    // the only way to render the states this screen has to be able to draw.
    useAppStore.getState().ensureCourse(COURSE);
    useAppStore.setState((state) => ({
      courses: {
        ...state.courses,
        [COURSE]: { ...state.courses[COURSE]!, production: { [first]: 1, [second]: 3 } },
      },
    }));

    await renderModule();

    expect(dots(0)).toEqual(['done', 'pending']);
    expect(dots(1)).toEqual(['done', 'done']);
  });

  it('draw both dots pending on a module nobody has produced yet', async () => {
    await renderModule();

    expect(dots(0)).toEqual(['pending', 'pending']);
    expect(dots(1)).toEqual(['pending', 'pending']);
  });
});

/* -------------------------------------------------------------- the quiet script */

describe('the quiet script line', () => {
  it('renders under the cue in a romanized course', async () => {
    useAppStore.getState().setActiveCourse('en-ar');
    await renderAt(`#/module/${CURRENT}`, { module: romanizedModuleFixture(CURRENT) });

    const sentence = romanizedModuleFixture(CURRENT).sentences[0]!;
    await screen.findByText(sentence.display);
    expect(within(cards()[0]!).getByText(sentence.script!)).toBeInTheDocument();
  });

  it('does not exist in a native course — there is no second script to show', async () => {
    await renderModule();

    // Every string the first card renders while collapsed: the L2 line and its cue, full stop.
    const sentence = moduleFixture().sentences[0]!;
    const lines = within(cards()[0]!).getByRole('button').textContent?.trim();

    expect(lines).toBe(`${sentence.display}${sentence.cue}`);
  });
});

/* ------------------------------------------------------------- scroll restore */

describe('leaving for Sentence Detail and coming back', () => {
  it('restores the scroll offset and the cards that were open', async () => {
    await renderModule();

    toggle(1);
    scrollTo(240);

    fireEvent.click(screen.getByRole('link', { name: strings('module.openFull') }));
    // Sentence Detail (#89): its kicker names the sentence the card opened.
    await screen.findByText('M1 · SENTENCE 02');
    // The offset is remembered on the way out, under its own sessionStorage key — never in the
    // store, whose shape is the export contract (#82).
    expect(readModuleView(moduleViewKey(COURSE, CURRENT))).toEqual({
      scrollTop: 240,
      expanded: [`${CURRENT}-S02`],
    });
    expect(localStorage.getItem('rung:state')).not.toContain('scrollTop');

    // Back to the list — the browser's back button under a HashRouter is a hash change.
    act(() => {
      window.location.hash = `#/module/${CURRENT}`;
    });
    await screen.findByText(moduleFixture().sentences[0]!.display);

    expect(scrollArea().scrollTop).toBe(240);
    expect(openState()).toEqual([false, true]);
  });

  it('opens a module nobody has visited this session at the top, collapsed', async () => {
    await renderModule();

    expect(scrollArea().scrollTop).toBe(0);
    expect(openState()).toEqual([false, false]);
  });
});
