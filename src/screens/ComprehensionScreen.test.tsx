/**
 * The exit ritual's Comprehension (#102) — five promises, one describe each:
 *
 *   • **the guard**: part 2 is where part 1 leaves you, and nowhere else,
 *   • **the item**: the model answer is not on screen until it is asked for, and Next is not on
 *     screen until a mark exists [D11],
 *   • **the retry**: fresh sentences every time — no repeats within a test, a pool of 6 supporting
 *     ≥ 3 fresh attempts before recycling (PRD §8 F5's AC), and unlimited attempts with no counter
 *     anywhere in them,
 *   • **Invariant 4**: a failed round writes *nothing* — the persisted document is byte-identical
 *     across one, and these files cannot reach the store to make it otherwise,
 *   • **the pass seam**: two "same meaning" marks hand over to #103's Verdict, carrying the token
 *     that says the comprehension was really taken.
 *
 * Everything renders the real `<App />` over a mocked `fetch`, the way every screen test in this
 * repo does — and the only way in is the one the learner has: the arc's ~900ms hold, paid in full,
 * and the CTA it opens. A test that mounted this screen directly would be testing a route the
 * product does not offer. The strings fixture is built FROM the canonical key list, so a line
 * reads `hi-mr retry.body` — an assertion against the prototype's English would pass on a
 * hardcoded shell string, which is the one thing the strings contract exists to prevent.
 *
 * The draw is genuinely random (`Math.random`, `engine/comprehension.ts`), so nothing here asserts
 * *which* items come up: every assertion is about the relationships the PRD names — distinct
 * within an attempt, disjoint across fresh ones. `comprehension.test.ts` pins the algorithm itself
 * against an injected sequence.
 */
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App.tsx';
import { resetContentCache } from '../course/content.ts';
import { resetManifestCache } from '../course/manifest.ts';
import { resetStringsCache } from '../course/strings.ts';
import type { PoolItem } from '../course/types.ts';
import { cameFrom, handover } from '../shell/routes.tsx';
import { persistedSlice, STORAGE_KEY, useAppStore } from '../state/store.ts';
import { DEV_MANIFEST, mockContentFetch } from '../test/courseManifest.ts';
import { moduleFixture } from '../test/courseContent.ts';
import { stringValue } from '../test/courseStrings.ts';
import itemSource from './comprehension/ComprehensionItem.tsx?raw';
import retrySource from './comprehension/RetryInterstitial.tsx?raw';
import screenSource from './ComprehensionScreen.tsx?raw';

const COURSE = 'hi-mr';
/** The fixture ladder's current rung: authored, unlocked, and the only module this screen reads. */
const CURRENT = 'L1-M1';
/** `--motion-hold-total` [D14] — the whole press-and-hold, in milliseconds (#101). */
const HOLD_MS = 900;
/** Injected, so nothing here touches the wall clock — `passedAt` is a receipt, not a schedule. */
const STAMP = () => '2026-02-03T09:00:00.000Z';

/** What the fixture bundle says for a key — the self-identifying value an assertion reads. */
function strings(key: string): string {
  return stringValue(COURSE, key);
}

/** `L1-M1-S01`, `L1-M1-S02` — how the modules author their sentence ids. */
function sentenceId(index: number): string {
  return `${CURRENT}-S${String(index + 1).padStart(2, '0')}`;
}

/**
 * A pool of `size` items. The displays are built on `Me llamo`, which the word-index fixture
 * teaches, so the "why" panel on a reveal has a real row to resolve — and each carries its own
 * name, so "which items did that attempt deal" is a question the DOM can answer.
 */
const NAMES = ['Priya', 'Rohan', 'Meera', 'Arjun', 'Kavya', 'Nikhil', 'Sana', 'Vikram'];

function poolOf(size: number): PoolItem[] {
  return Array.from({ length: size }, (_, index) => ({
    id: `${CURRENT}-C${String(index + 1).padStart(2, '0')}`,
    display: `Me llamo ${NAMES[index] ?? String(index)}`,
    cue: `My name is ${NAMES[index] ?? String(index)}`,
  }));
}

/** The rung's module with a pool of `size` — hi-mr L1-M1 ships 8, the authored floor is 6. */
function poolModule(size = 6, pool: PoolItem[] = poolOf(size)) {
  return { ...moduleFixture(CURRENT), comprehensionPool: pool };
}

/**
 * Seeds production the only way the app can: one `recordProduction` per Produce-phase got-it.
 * Two per sentence across the whole rung is exactly what `exit_available` means (PRD §8 F1) — and
 * it is what opens the ritual whose hold opens this screen.
 */
function produceRung(sentences = 2): void {
  const store = useAppStore.getState();
  store.ensureCourse(COURSE);
  for (let round = 0; round < 2; round += 1) {
    for (let index = 0; index < sentences; index += 1) {
      store.recordProduction(COURSE, sentenceId(index));
    }
  }
}

/** Renders the app at `hash` with the module the test asked for, and waits for the shell's frame. */
async function renderAt(hash: string, module: unknown): Promise<void> {
  window.location.hash = hash;
  mockContentFetch(DEV_MANIFEST, undefined, { module });
  render(<App />);
  await screen.findByRole('main');
}

/**
 * The learner's own way in: `/ritual`, the whole ~900ms hold, then the CTA it reveals. Nothing in
 * this file reaches `#/comprehension` any other way, because nothing in the product does.
 */
async function walkIn(module: unknown = poolModule()): Promise<void> {
  produceRung();
  vi.useFakeTimers({ shouldAdvanceTime: true });
  try {
    await renderAt('#/ritual', module);
    const arc = await screen.findByRole('list');
    const confirm = within(arc).getAllByRole('listitem')[2];
    fireEvent.pointerDown(within(confirm as HTMLElement).getByRole('button'));
    act(() => vi.advanceTimersByTime(HOLD_MS));
  } finally {
    vi.useRealTimers();
  }

  fireEvent.click(screen.getByRole('link', { name: strings('ritual.confirm.toComprehension') }));
  await waitFor(() => expect(window.location.hash).toBe('#/comprehension'));
}

/* ------------------------------------------------------- the item, as the learner drives it */

/** The pool item on screen, found by its own display — the draw is random, by design. */
function onScreen(pool: readonly PoolItem[]): PoolItem {
  const showing = pool.filter((item) => screen.queryByText(item.display) !== null);
  if (showing.length !== 1) {
    throw new Error(`expected exactly one pool item on screen, found ${showing.length}`);
  }
  return showing[0] as PoolItem;
}

function reveal(): void {
  fireEvent.click(screen.getByRole('button', { name: strings('revealLabelComprehend') }));
}

function mark(kind: 'got' | 'miss'): void {
  fireEvent.click(
    screen.getByRole('button', { name: strings(kind === 'got' ? 'mark.gotIt' : 'mark.missed') }),
  );
}

function next(): void {
  fireEvent.click(screen.getByRole('button', { name: strings('mark.next') }));
}

/** One whole attempt, marked as told — and the ids it dealt, in the order it showed them. */
function playAttempt(pool: readonly PoolItem[], marks: readonly ('got' | 'miss')[]): string[] {
  return marks.map((kind) => {
    const item = onScreen(pool);
    reveal();
    mark(kind);
    next();
    return item.id;
  });
}

/** The interstitial's own control — "Fresh sentences". */
function fresh(): void {
  fireEvent.click(screen.getByRole('button', { name: strings('retry.cta') }));
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

/* ------------------------------------------------------------------------- the guard */

describe('part 2 is where part 1 leaves you', () => {
  it('opens on the items when the hold was actually held', async () => {
    await walkIn();

    expect(window.location.hash).toBe('#/comprehension');
    expect(screen.getByText(onScreen(poolOf(6)).display)).toBeVisible();
  });

  it('sends a deep link back to the ritual — the hold is what opens this screen', async () => {
    produceRung();
    await renderAt('#/comprehension', poolModule());

    await waitFor(() => expect(window.location.hash).toBe('#/ritual'));
    // And it really is the arc, not an empty frame with a rewritten URL.
    expect(await screen.findByText(strings('ritual.stepTitle.write'))).toBeVisible();
  });

  it('sends a deep link on to the module when the rung is not produced out either', async () => {
    // No counters: the ritual's own guard takes it from here, and the work is where it points.
    await renderAt('#/comprehension', poolModule());

    await waitFor(() => expect(window.location.hash).toBe(`#/module/${CURRENT}`));
  });

  it('lets go the moment the rung it was testing is no longer the current one', async () => {
    await walkIn();

    // What #103 will do at the end of this ritual: the rung passes, the ladder moves on — and the
    // entry that carried the hold's token is not a licence to keep testing a finished rung.
    act(() => {
      useAppStore.getState().passRitual(COURSE, CURRENT, STAMP);
    });

    await waitFor(() => expect(window.location.hash).toBe('#/module/L1-M2'));
  });

  it('renders under the shell’s back header, as a child of the rung', async () => {
    await walkIn();

    expect(screen.getByRole('button', { name: 'Back to the ladder' })).toBeVisible();
    expect(screen.getByRole('heading', { level: 1 }).textContent).toBe('Comprehension');
  });

  /** The token itself: a key in the history entry, and only the ritual's own step turns it. */
  describe('the hand-over token', () => {
    it('answers only for the step that handed over', () => {
      expect(cameFrom('hold', handover('hold'))).toBe(true);
      expect(cameFrom('comprehension', handover('hold'))).toBe(false);
      expect(cameFrom('hold', handover('comprehension'))).toBe(false);
    });

    it('answers false for everything a deep link can carry', () => {
      for (const state of [null, undefined, '', 'hold', 0, [], {}, { ritualStep: 'held' }]) {
        expect(cameFrom('hold', state), JSON.stringify(state) ?? 'undefined').toBe(false);
      }
    });
  });
});

/* -------------------------------------------------------------------------- the item */

describe('the item: read it, then ask for the answer', () => {
  it('shows the line under test and the course’s comprehend nudge, and no answer yet', async () => {
    const pool = poolOf(6);
    await walkIn(poolModule(6, pool));
    const item = onScreen(pool);

    expect(screen.getByText(item.display)).toBeVisible();
    expect(screen.getByText(strings('nudge.comprehend'))).toBeVisible();
    // The model answer is not merely hidden — it is not in the document at all.
    for (const each of pool) expect(screen.queryByText(each.cue)).toBeNull();
  });

  it('reveals the scripted answer — the item’s own cue — under the course’s L1 label', async () => {
    const pool = poolOf(6);
    await walkIn(poolModule(6, pool));
    const item = onScreen(pool);

    reveal();

    expect(screen.getByText(item.cue)).toBeVisible();
    expect(screen.getByText(strings('cueLabel'))).toBeVisible();
    // One answer, its own: no other item's cue arrives with it.
    for (const each of pool.filter((other) => other.id !== item.id)) {
      expect(screen.queryByText(each.cue)).toBeNull();
    }
  });

  it('offers "why" on the reveal, and only on the reveal (#94)', async () => {
    await walkIn();

    expect(screen.queryByRole('button', { name: strings('why.show') })).toBeNull();
    reveal();

    const why = screen.getByRole('button', { name: strings('why.show') });
    fireEvent.click(why);
    // The panel resolves the pool item against its module's own index: `Me llamo` is a row.
    expect(await screen.findByText('Me llamo')).toBeVisible();
    // A pool item has no Detail page, so the panel offers no way out of the ritual.
    expect(screen.queryByRole('link', { name: strings('why.openFull') })).toBeNull();
  });

  it('hides Next until a mark exists — hidden, not disabled [D11]', async () => {
    await walkIn();
    reveal();

    expect(screen.queryByRole('button', { name: strings('mark.next') })).toBeNull();
    // The self-mark is the shared control, verbatim: the same two segments as Practice (#93).
    expect(screen.getByRole('button', { name: strings('mark.gotIt') })).toBeVisible();
    expect(screen.getByRole('button', { name: strings('mark.missed') })).toBeVisible();

    mark('miss');
    expect(screen.getByRole('button', { name: strings('mark.next') })).toBeVisible();
  });

  it('counts the items 1 / 2, and never shows the same one twice in a test', async () => {
    const pool = poolOf(6);
    await walkIn(poolModule(6, pool));

    // The head's counts, in the prototype's own order: the ritual's part, then the item's place
    // in the attempt ("part 2 of 2 · 1 of 2").
    expect(screen.getByRole('main').textContent).toContain('2 / 2 · 1 / 2');
    const first = onScreen(pool);
    reveal();
    mark('got');
    next();

    expect(screen.getByRole('main').textContent).toContain('2 / 2 · 2 / 2');
    expect(onScreen(pool).id).not.toBe(first.id);
  });

  it('carries the quiet script line in a romanized course’s pool item', async () => {
    const pool = poolOf(2).map((item, index) =>
      index === 0 ? { ...item, script: 'أنا من الهند' } : item,
    );
    await walkIn(poolModule(2, pool));

    // The two-item pool means whichever item leads, the other follows — so the script line is on
    // screen for one of them; find the one that carries it.
    const scripted = pool[0] as PoolItem;
    if (onScreen(pool).id !== scripted.id) {
      reveal();
      mark('got');
      next();
    }

    expect(screen.getByText(scripted.script as string)).toBeVisible();
  });

  it('offers nothing to type into, anywhere on the screen (Invariant 6)', async () => {
    await walkIn();
    reveal();

    expect(document.querySelectorAll('input, textarea, select, [contenteditable]')).toHaveLength(0);
  });
});

/* -------------------------------------------------------------------------- the retry */

describe('any "not quite" deals fresh sentences, calmly and forever', () => {
  it('still shows the second item after a miss on the first — nothing is cut short', async () => {
    const pool = poolOf(6);
    await walkIn(poolModule(6, pool));

    const first = onScreen(pool);
    reveal();
    mark('miss');
    next();

    expect(onScreen(pool).id).not.toBe(first.id);
    expect(screen.queryByText(strings('retry.title'))).toBeNull();
  });

  it('lands on the interstitial: the course’s three lines, one control, and no counter', async () => {
    const pool = poolOf(6);
    await walkIn(poolModule(6, pool));
    playAttempt(pool, ['miss', 'got']);

    expect(screen.getByText(strings('retry.title'))).toBeVisible();
    expect(screen.getByText(strings('retry.body'))).toBeVisible();
    expect(screen.getByRole('button', { name: strings('retry.cta') })).toBeVisible();
    // No item is on screen, so nothing counts one: the head keeps the ritual's part and drops the
    // position (`2 / 2`, and no `1 / 2` beside it).
    expect(screen.queryByText(/\d \/ 2 · /)).toBeNull();
  });

  it('deals two NEW sentences, and never one the attempt just used', async () => {
    const pool = poolOf(6);
    await walkIn(poolModule(6, pool));

    const first = playAttempt(pool, ['miss', 'miss']);
    fresh();
    const second = playAttempt(pool, ['got', 'miss']);

    expect(new Set(first).size).toBe(2);
    expect(new Set(second).size).toBe(2);
    expect(second.every((id) => !first.includes(id))).toBe(true);
  });

  /** PRD §8 F5, acceptance criterion, verbatim — on the real screen. */
  it('a pool of 6 supports ≥ 3 fresh attempts before recycling', async () => {
    const pool = poolOf(6);
    await walkIn(poolModule(6, pool));

    const first = playAttempt(pool, ['miss', 'got']);
    fresh();
    const second = playAttempt(pool, ['got', 'miss']);
    fresh();
    const third = playAttempt(pool, ['miss', 'miss']);

    const dealt = [...first, ...second, ...third];
    expect(dealt).toHaveLength(6);
    expect(new Set(dealt).size).toBe(6);

    // The pool is spent: the fourth attempt recycles — and still never repeats the round the
    // learner just failed.
    fresh();
    const fourth = playAttempt(pool, ['miss', 'miss']);

    expect(new Set(fourth).size).toBe(2);
    expect(fourth.every((id) => !third.includes(id))).toBe(true);
  });

  it('says exactly the same thing on the third failure as on the first — no failure counter', async () => {
    const pool = poolOf(6);
    await walkIn(poolModule(6, pool));

    playAttempt(pool, ['miss', 'miss']);
    const firstTime = screen.getByRole('main').textContent;
    fresh();
    playAttempt(pool, ['miss', 'miss']);
    fresh();
    playAttempt(pool, ['miss', 'miss']);

    // Byte-identical: no attempt number, no tally, no shading of the words after three failures.
    expect(screen.getByRole('main').textContent).toBe(firstTime);
  });
});

/* ------------------------------------------------- Invariant 4: a failed round writes nothing */

describe('nothing is stored on a failed round', () => {
  it('leaves the persisted document byte-identical across two failed attempts', async () => {
    const pool = poolOf(6);
    await walkIn(poolModule(6, pool));

    const state = JSON.stringify(persistedSlice(useAppStore.getState()));
    const stored = window.localStorage.getItem(STORAGE_KEY);

    playAttempt(pool, ['miss', 'got']);
    fresh();
    playAttempt(pool, ['got', 'miss']);
    fresh();

    expect(screen.getByText(onScreen(pool).display)).toBeVisible();
    expect(JSON.stringify(persistedSlice(useAppStore.getState()))).toBe(state);
    expect(window.localStorage.getItem(STORAGE_KEY)).toBe(stored);
  });

  it('writes no module, no counter and no queue entry — the ritual pays on the pass only', async () => {
    const pool = poolOf(6);
    await walkIn(poolModule(6, pool));
    const before = useAppStore.getState().courses[COURSE];

    playAttempt(pool, ['miss', 'miss']);
    fresh();

    const after = useAppStore.getState().courses[COURSE];
    expect(after).toBe(before);
    expect(after?.modules).toEqual({});
    expect(after?.reviewQueue).toEqual([]);
    expect(after?.session).toBeNull();
    // The counters are the ones the Produce phase earned, untouched by anything here.
    expect(after?.production).toEqual({ [sentenceId(0)]: 2, [sentenceId(1)]: 2 });
  });

  /**
   * The source scan, in the posture `unlockPath.test.ts` and `RitualScreen.test.tsx` use: prose
   * cannot keep an invariant, and the way this one breaks is a well-meant "just record the
   * attempt", not a decision. These three files may not reach the store or storage at all, so
   * there is nothing to review about *when* they write — they cannot.
   */
  const FILES: Readonly<Record<string, string>> = {
    'src/screens/ComprehensionScreen.tsx': screenSource,
    'src/screens/comprehension/ComprehensionItem.tsx': itemSource,
    'src/screens/comprehension/RetryInterstitial.tsx': retrySource,
  };

  const BANNED = [
    { what: 'a store import', pattern: /from '.*state\/store\.ts'/ },
    { what: 'a store hook', pattern: /useAppStore\(/ },
    { what: 'a write to storage', pattern: /(local|session)Storage/ },
    { what: 'a text field', pattern: /<(input|textarea|select)\b/ },
    { what: 'an input handler', pattern: /\bon(Change|Input|Paste|Drop|Submit)\b/ },
  ] as const;

  function scan(file: string, source: string): string[] {
    return source
      .split('\n')
      .flatMap((line, index) =>
        BANNED.filter(({ pattern }) => pattern.test(line)).map(
          ({ what }) => `${file}:${index + 1} carries ${what}`,
        ),
      );
  }

  it('cannot write: no store, no storage, and nowhere for an attempt to be recorded', () => {
    const violations = Object.entries(FILES).flatMap(([file, source]) => scan(file, source));

    expect(
      violations,
      violations
        .join('\n')
        .concat(
          '\nOnly the eventual pass writes anything (Invariant 4): a failed round leaves no attempt history, no counter and no state.',
        ),
    ).toEqual([]);
  });

  it('catches a planted store write', () => {
    const planted = [
      "import { useAppStore } from '../state/store.ts';",
      'const attempts = useAppStore((store) => store.attempts);',
      "localStorage.setItem('attempts', String(failed));",
    ].join('\n');

    expect(scan('src/screens/Planted.tsx', planted)).toHaveLength(3);
  });
});

/* ----------------------------------------------------------------------- the pass seam */

describe('two "same meaning" marks finish the test', () => {
  it('hands over to the Verdict (#103) with the token that says it was taken', async () => {
    const pool = poolOf(6);
    await walkIn(poolModule(6, pool));

    playAttempt(pool, ['got', 'got']);

    await waitFor(() => expect(window.location.hash).toBe('#/verdict'));
    // The seam, as the next ticket will read it: the navigation itself carries the proof.
    expect(cameFrom('comprehension', (window.history.state as { usr?: unknown } | null)?.usr)).toBe(
      true,
    );
    // And #102 still wrote nothing — the pass is #103's to record.
    expect(useAppStore.getState().courses[COURSE]?.modules).toEqual({});
  });

  it('does not finish on one "same meaning" and one "not quite"', async () => {
    const pool = poolOf(6);
    await walkIn(poolModule(6, pool));

    playAttempt(pool, ['got', 'miss']);

    expect(window.location.hash).toBe('#/comprehension');
    expect(screen.getByText(strings('retry.title'))).toBeVisible();
  });
});
