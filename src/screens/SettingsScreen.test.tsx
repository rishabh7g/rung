/**
 * Settings (#105) — the screen's five promises, one describe each:
 *
 *   • the sections stand in F6's frozen order, and the screen ends with the last of them: the
 *     closing privacy line went on #232 with the screen's other read-once copy,
 *   • the COURSE dropdown is the manifest, verbatim — a course added to the manifest is a row
 *     added here with zero shell changes — and switching writes the one string it may,
 *   • the status line is the ladder's own derivation in the course's template — mid-journey,
 *     fresh and pending-authoring each say exactly what is true, counts only,
 *   • the tick toggle reads and writes `settings.elapsedTickEnabled`,
 *   • the STORAGE section (#107) computes every figure it shows — the meter from a mocked
 *     `estimate()`, the rows from the build's sizes files and the serialized state — degrades
 *     honestly when the API is missing, and since #232 asks the browser nothing else,
 *   • and no checking or translation control exists anywhere on it (F6's AC, [D18]).
 *
 * Everything renders the real `<App />` over a mocked `fetch`, reached through the app's own
 * route table, the way every boot test in this repo does. Progress is seeded through
 * `passRitual` because that is the only way a module can become passed (Invariant 1).
 *
 * Plus the mobile guard prose cannot keep: the select's type is ≥16px (iOS zooms the page on
 * focus below that — design/pwa-checklist.md §1) and its target is ≥44px, asserted against the
 * stylesheet and the tokens it resolves to, the same way `styleContract.test.ts` reads CSS.
 */
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import tokensCss from '../../design/tokens.css?raw';
import App from '../App.tsx';
import { resetContentCache } from '../course/content.ts';
import { resetManifestCache } from '../course/manifest.ts';
import { resetStringsCache } from '../course/strings.ts';
import { ladderFromLevels } from '../engine/progression.ts';
import { exportState } from '../state/serialize.ts';
import { persistedSlice, useAppStore } from '../state/store.ts';
import { DEV_MANIFEST, mockContentFetch } from '../test/courseManifest.ts';
import { sizesFixture } from '../test/courseContent.ts';
import { formatBytes } from './settings/formatBytes.ts';
import settingsCss from './SettingsScreen.module.css?raw';

/* ------------------------------------------------------------------ the fixtures */

const COURSE = 'hi-mr';

/**
 * The fourth course's AUTHORED files, not fixtures (#267): `content/hi-en/levels.json` and
 * `content/hi-en/strings.json`, read off disk the way `langLaw.test.tsx` reads the manifest. hi-en
 * ships since #273, and no browser on this host may open it — this is the smoke that proves the
 * course boots: the row in the switcher, the ten-rung ladder, the Hindi chrome.
 */
const HI_EN_FILES = import.meta.glob<string>('../../content/hi-en/*.json', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function authored(file: 'levels.json' | 'strings.json'): unknown {
  const text = HI_EN_FILES[`../../content/hi-en/${file}`];
  if (text === undefined) throw new Error(`content/hi-en/${file} is not authored`);
  return JSON.parse(text);
}
/** Injected, so nothing here touches the wall clock — `passedAt` is a receipt, not a schedule. */
const STAMP = () => '2026-02-03T09:00:00.000Z';

/** The product's shape: one level of ten rungs, the first `authored` of them with content. */
function tenRungLadder(authored: number) {
  return {
    courseId: COURSE,
    levels: [
      {
        id: 'L1',
        name: 'Foundations',
        tagline: 'say what you need',
        draft: false,
        draftNote: null,
        modules: Array.from({ length: 10 }, (_, index) => ({
          id: `L1-M${index + 1}`,
          title: `L1 rung ${index + 1}`,
          job: `what L1 rung ${index + 1} does`,
          hasContent: index < authored,
        })),
      },
    ],
  };
}

/** Seeds progress the only way the app can make it: one exit ritual per rung, in order. */
function climb(ladder: ReturnType<typeof tenRungLadder>, ...moduleIds: string[]): void {
  const store = useAppStore.getState();
  store.ensureCourse(COURSE);
  store.setLadder(COURSE, ladderFromLevels(ladder.levels));
  for (const moduleId of moduleIds) store.passRitual(COURSE, moduleId, STAMP);
}

/** Renders the app at /settings and waits for the screen's one landmark, the course select. */
async function renderSettings(ladder = tenRungLadder(2), manifest: unknown = DEV_MANIFEST) {
  mockContentFetch(manifest, undefined, { levels: ladder });
  window.location.hash = '#/settings';
  render(<App />);
  return await screen.findByRole('combobox', { name: 'Active course' });
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
  window.location.hash = '';
});

/* -------------------------------------------------------------- the section order */

describe('the frozen section order (F6)', () => {
  it('renders COURSE → PRACTICE → STORAGE → Backup, under the screen title', async () => {
    await renderSettings();

    const headings = screen
      .getAllByRole('heading')
      .map((heading) => heading.textContent)
      .filter((text) => text !== 'rung'); // the shell's brand h1 sits above the screen

    expect(headings).toEqual(['Settings', 'COURSE', 'PRACTICE', 'STORAGE', 'Backup']);
  });

  it('ends on the Backup section — no closing promise, in either voice (#232)', async () => {
    await renderSettings();

    // The screen used to close on a privacy line: the shell's frame around the course's promise.
    // Both halves went as read-once copy — the app still behaves that way, it just stops saying so.
    expect(screen.queryByText(/zero inputs/)).not.toBeInTheDocument();
    expect(screen.queryByText(/zero network/)).not.toBeInTheDocument();
    expect(screen.queryByText(/Built by Rishabh/)).not.toBeInTheDocument();
    expect(screen.queryByText(/never talks to the internet/)).not.toBeInTheDocument();
  });

  it('carries no stub — every section F6 names has its real body now (#107, #108)', async () => {
    await renderSettings();

    expect(screen.queryByText(/Section stub/)).not.toBeInTheDocument();
    // #108's body stands in the slot: the two Backup controls.
    expect(screen.getByRole('button', { name: 'Export' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Import' })).toBeInTheDocument();
  });
});

/* ------------------------------------------------------------------- the dropdown */

describe('the COURSE dropdown (F0)', () => {
  it('lists the manifest, verbatim, pairLabel per row, the active course selected', async () => {
    const select = await renderSettings();

    const labels = within(select)
      .getAllByRole('option')
      .map((option) => option.textContent);
    expect(labels).toEqual(DEV_MANIFEST.courses.map((course) => course.pairLabel));
    expect(select).toHaveValue('hi-mr');
  });

  it('surfaces a course added to the manifest with zero shell changes', async () => {
    const manifest = {
      ...DEV_MANIFEST,
      courses: [
        ...DEV_MANIFEST.courses,
        {
          id: 'fr-de',
          l1: 'French',
          l2: 'German',
          l1Tag: 'fr',
          l2Tag: 'de',
          l2Dir: 'ltr',
          pairLabel: 'french → german',
          scriptMode: 'native',
          dir: 'ltr',
          fixture: true,
        },
      ],
    };

    const select = await renderSettings(tenRungLadder(2), manifest);

    expect(within(select).getAllByRole('option')).toHaveLength(DEV_MANIFEST.courses.length + 1);
    expect(within(select).getByRole('option', { name: 'french → german' })).toBeInTheDocument();
  });

  it('runs the switch flow (#106): pointer moved, target ensured, re-boots into its words', async () => {
    const select = await renderSettings();

    fireEvent.change(select, { target: { value: 'en-es' } });

    // `switchCourse`: the pointer moved and the target's subtree exists, at once.
    expect(useAppStore.getState().activeCourse).toBe('en-es');
    expect(useAppStore.getState().courses['en-es']).toBeDefined();
    // The provider re-boots into the chosen course's bundle: the words on screen are en-es's
    // own. The anchor was the reassurance note under the dropdown until #232 removed it, so it
    // is now the arrival toast — whose two pair labels the next case pins.
    expect(await screen.findByText(/^en-es switchToast/)).toBeInTheDocument();
    // Invariant 8: the switch created the new subtree and deleted nobody's.
    expect(useAppStore.getState().courses[COURSE]).toBeDefined();
  });

  it('confirms with the toast in the TARGET course’s words, naming both pairs (#106)', async () => {
    const ladder = tenRungLadder(3);
    climb(ladder, 'L1-M1');
    const before = useAppStore.getState().courses[COURSE];
    const select = await renderSettings(ladder);

    fireEvent.change(select, { target: { value: 'en-es' } });

    // The template is en-es's own `switchToast` — the fixture value self-identifies its course —
    // `{to}` filled with the target's pairLabel and `{from}` with the pair being left.
    const toast = await screen.findByText('en-es switchToast english → spanish hindi → marathi');
    // …delivered as the shared transient line (#86): a polite live region, no dismiss control.
    expect(toast.closest('[role="status"]')).not.toBeNull();
    // And the promise the toast speaks is true: the ladder left behind is the very object it was.
    expect(useAppStore.getState().courses[COURSE]).toBe(before);
  });

  it('resets transient UI on switch — the module views’ open cards and offsets (#106)', async () => {
    const select = await renderSettings();
    sessionStorage.setItem(
      'rung:module-view:hi-mr:L1-M1',
      JSON.stringify({ scrollTop: 120, expanded: ['L1-M1-S01'] }),
    );

    fireEvent.change(select, { target: { value: 'en-es' } });

    // The sweep is synchronous with the swap: the new course's screens start fresh.
    expect(sessionStorage.getItem('rung:module-view:hi-mr:L1-M1')).toBeNull();
    // Transient is ALL it reset — the persistent subtree is still there (Invariant 8).
    expect(useAppStore.getState().courses[COURSE]).toBeDefined();
  });

  it('keeps the select at ≥16px type and a ≥44px target (design/pwa-checklist.md §1)', () => {
    // jsdom computes no stylesheet, so the guard reads the same sources the build ships: the
    // select's declarations, and the tokens they resolve to.
    const rule = /\.select\s*{[^}]*}/.exec(settingsCss)?.[0];
    expect(rule).toBeDefined();
    expect(rule).toContain('font-size: var(--devanagari-min-size)');
    expect(rule).toContain('min-height: var(--tap-min)');

    const floor = /--devanagari-min-size:\s*([\d.]+)px/.exec(tokensCss)?.[1];
    const target = /--tap-min:\s*([\d.]+)px/.exec(tokensCss)?.[1];
    expect(Number(floor)).toBeGreaterThanOrEqual(16);
    expect(Number(target)).toBeGreaterThanOrEqual(44);
  });
});

/* ----------------------------------------------------- the fourth course, hi-en (#267) */

describe('the fourth course — hi-en (#267, shipping since #273)', () => {
  /**
   * The switch flow above, run against the REAL hi-en files: the manifest row is in `DEV_MANIFEST`
   * (no `fixture` key since #273 graduated the course), and the fetch for hi-en's ladder and bundle
   * answers with what `content/hi-en/` holds today — ten L1 rungs, all ten authored (#270–#272)
   * and verified, Hindi chrome.
   * hi-mr keeps the test's own ten-rung ladder and its self-identifying fixture bundle, so the two
   * courses cannot be confused on screen. The authored rungs themselves — module list, Sentence
   * Detail, the Why panel — are walked in `src/course/hiEnAuthored.test.tsx`.
   */
  function serveAuthoredHiEn(): void {
    const base = globalThis.fetch;
    const json = (value: unknown) =>
      Promise.resolve(new Response(JSON.stringify(value), { status: 200 }));
    vi.stubGlobal(
      'fetch',
      vi.fn((input: RequestInfo | URL) => {
        const url = String(input);
        if (url.endsWith('/content/hi-en/levels.json')) return json(authored('levels.json'));
        if (url.endsWith('/content/hi-en/strings.json')) return json(authored('strings.json'));
        return base(input);
      }),
    );
  }

  /** The rung rows of the one list the Ladder renders, in ladder order. */
  function rungs(): HTMLElement[] {
    return within(screen.getByRole('list')).getAllByRole('listitem');
  }

  it('is offered as the last pair, and is nothing the shell was told about', async () => {
    const select = await renderSettings();

    const labels = within(select)
      .getAllByRole('option')
      .map((option) => option.textContent);
    expect(labels.at(-1)).toBe('hindi → english');
    // The switcher reads `pairLabel` and nothing else about the row (`manifest.test.ts`) — the
    // fourth course is offered exactly like the first three, on a strict build as on a dev one.
    expect(within(select).getByRole('option', { name: 'hindi → english' })).toHaveValue('hi-en');
  });

  it('boots a ladder of ten pending rungs in Hindi chrome, and leaves hi-mr exactly where it was', async () => {
    const ladder = tenRungLadder(3);
    climb(ladder, 'L1-M1');
    const before = useAppStore.getState().courses[COURSE];
    const select = await renderSettings(ladder);
    serveAuthoredHiEn();

    fireEvent.change(select, { target: { value: 'hi-en' } });

    // The arrival toast is hi-en's own `switchToast` — the authored Hindi, `{to}` and `{from}`
    // filled with the two pair labels — so the bundle that booted is the one on disk.
    expect(
      await screen.findByText(
        'अब hindi → english चल रहा है. तुम्हारी hindi → marathi सीढ़ी जहाँ थी, ठीक वहीं सुरक्षित है.',
      ),
    ).toBeInTheDocument();
    // The document speaks the course's L1 (#186): Hindi, from the row's `l1Tag`, not from its id.
    await waitFor(() => {
      expect(document.documentElement.lang).toBe('hi');
    });
    expect(document.documentElement.dir).toBe('ltr');

    // On to the Ladder, through the app's own nav — the ten rungs of the authored L1.
    fireEvent.click(screen.getByRole('link', { name: 'Ladder' }));
    expect(await screen.findByText(/LEVEL 1 · 0 OF 10/)).toBeInTheDocument();
    expect(screen.getByText('Foundations — say what you need')).toBeInTheDocument();
    expect(rungs()).toHaveLength(10);
    for (const title of [
      'Who I am',
      'First exchange',
      'Needs and wants',
      'My day',
      'Yesterday',
      'Tomorrow',
      'Where things are',
      'Numbers & shopping',
      'Feelings & opinions',
      'Connected talk',
    ]) {
      expect(screen.getByText(title)).toBeInTheDocument();
    }
    // Nothing passed: M1 is the current rung, and since #270 it has content behind it, so the
    // card carries the one CTA a fresh rung gets [D22] — in hi-en's own words — and M2–M10 are
    // locked, so that CTA is the only link in the list.
    expect(screen.getByText('M1 · CURRENT RUNG')).toBeInTheDocument();
    const rungLinks = within(screen.getByRole('list')).getAllByRole('link');
    expect(rungLinks).toHaveLength(1);
    expect(rungLinks[0]).toHaveTextContent('Module से शुरू करो');
    expect(rungLinks[0]).toHaveAttribute('href', '#/module/L1-M1');
    // …and the pending line is hi-en's Hindi, counting all ten (Invariant 2: counts only).
    expect(screen.getByText('Level 1 · 10 में से 10 rungs अभी बाकी.')).toBeInTheDocument();

    // Invariant 8: the switch created hi-en's subtree and touched nobody else's.
    expect(useAppStore.getState().courses[COURSE]).toBe(before);
    expect(useAppStore.getState().courses['hi-en']).toBeDefined();

    // Back to hi-mr: its ladder is where the climb left it — one rung passed, M2 current.
    fireEvent.click(screen.getByRole('link', { name: 'Settings' }));
    fireEvent.change(await screen.findByRole('combobox', { name: 'Active course' }), {
      target: { value: COURSE },
    });
    fireEvent.click(screen.getByRole('link', { name: 'Ladder' }));
    expect(await screen.findByText(/LEVEL 1 · 1 OF 10/)).toBeInTheDocument();
    expect(screen.getByText('M2 · CURRENT RUNG')).toBeInTheDocument();
    expect(useAppStore.getState().courses[COURSE]).toBe(before);
  });
});

/* ----------------------------------------------------------------- the status line */

describe('the status line', () => {
  it('fresh: level 1, nothing passed, M1 in progress — counts only', async () => {
    await renderSettings(tenRungLadder(2));

    expect(screen.getByText('hi-mr settings.statusLine 1 0 10 M1')).toBeInTheDocument();
  });

  it('mid-journey: the climb behind it counted, the current rung named', async () => {
    const ladder = tenRungLadder(3);
    climb(ladder, 'L1-M1', 'L1-M2');

    await renderSettings(ladder);

    expect(screen.getByText('hi-mr settings.statusLine 1 2 10 M3')).toBeInTheDocument();
  });

  it('pending authoring: the honest variant, which names no rung', async () => {
    const ladder = tenRungLadder(2);
    climb(ladder, 'L1-M1', 'L1-M2');

    await renderSettings(ladder);

    expect(screen.getByText('hi-mr settings.statusPending 1 2 10')).toBeInTheDocument();
    expect(screen.queryByText(/settings\.statusLine/)).not.toBeInTheDocument();
  });

  it('says nothing about time, ever — no %, no clock, no streak (Invariant 2)', async () => {
    const ladder = tenRungLadder(3);
    climb(ladder, 'L1-M1', 'L1-M2');

    await renderSettings(ladder);
    const settings = screen.getByRole('heading', { name: 'Settings' }).closest('section');

    expect(settings?.textContent).not.toMatch(/%|\bday\b|\bweek\b|\bstreak\b|\d+:\d\d/);
  });
});

/* ------------------------------------------------------------------- the tick toggle */

describe('the elapsed-tick toggle', () => {
  it('reads the store: On is the shipped default', async () => {
    await renderSettings();

    expect(screen.getByRole('button', { name: 'On' })).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByRole('button', { name: 'Off' })).toHaveAttribute('aria-pressed', 'false');
  });

  it('writes `settings.elapsedTickEnabled`, and only it', async () => {
    await renderSettings();
    const before = useAppStore.getState();

    fireEvent.click(screen.getByRole('button', { name: 'Off' }));

    const after = useAppStore.getState();
    expect(after.settings.elapsedTickEnabled).toBe(false);
    expect(screen.getByRole('button', { name: 'Off' })).toHaveAttribute('aria-pressed', 'true');
    // A setting is not progress: the course subtrees are the very objects they were.
    expect(after.courses).toBe(before.courses);

    fireEvent.click(screen.getByRole('button', { name: 'On' }));
    expect(useAppStore.getState().settings.elapsedTickEnabled).toBe(true);
  });
});

/* ------------------------------------------------------------------ the STORAGE section */

describe('the STORAGE section (#107)', () => {
  /** jsdom has no `navigator.storage`; a test that needs one installs exactly what it mocks. */
  function stubNavigatorStorage(storage: unknown): void {
    Object.defineProperty(window.navigator, 'storage', { value: storage, configurable: true });
  }

  afterEach(() => {
    delete (window.navigator as { storage?: unknown }).storage;
  });

  /** The state's real weight, measured the way the section measures it. */
  function progressBytes(): number {
    return new Blob([exportState(persistedSlice(useAppStore.getState()))]).size;
  }

  it('renders the quota meter from a mocked estimate(), counts only — never a percent', async () => {
    stubNavigatorStorage({
      estimate: () => Promise.resolve({ usage: 12 * 1024 * 1024, quota: 1024 ** 3 }),
    });

    await renderSettings();

    const meter = await screen.findByRole('meter', { name: 'Storage used on this device' });
    expect(meter).toHaveAttribute('aria-valuenow', String(12 * 1024 * 1024));
    expect(meter).toHaveAttribute('aria-valuemax', String(1024 ** 3));
    expect(screen.getByText('12 MB used of 1 GB the browser offers')).toBeInTheDocument();
  });

  it('renders one computed content row per manifest course, from the build’s sizes files', async () => {
    await renderSettings();

    for (const course of DEV_MANIFEST.courses) {
      const row = await screen.findByText(`${course.pairLabel} course (offline)`);
      expect(row.parentElement?.textContent).toContain(formatBytes(sizesFixture(course.id).bytes));
    }
  });

  it('renders the one progress row at the serialized state’s real size', async () => {
    await renderSettings();

    const row = screen.getByText('Your saved progress — all courses');
    expect(row.parentElement?.textContent).toContain(formatBytes(progressBytes()));
  });

  it('grows the progress row with the state it measures — a passed rung weighs something', async () => {
    const before = progressBytes();
    const ladder = tenRungLadder(3);
    climb(ladder, 'L1-M1', 'L1-M2');

    await renderSettings(ladder);

    const after = progressBytes();
    expect(after).toBeGreaterThan(before);
    const row = screen.getByText('Your saved progress — all courses');
    expect(row.parentElement?.textContent).toContain(formatBytes(after));
  });

  it('omits the meter when estimate() is unavailable — the rows are unchanged ([Q2])', async () => {
    await renderSettings(); // jsdom: no navigator.storage at all

    await screen.findByText('hindi → marathi course (offline)');
    expect(screen.queryByRole('meter')).not.toBeInTheDocument();
    expect(screen.getByText('Your saved progress — all courses')).toBeInTheDocument();
  });

  /**
   * The section is numbers now. Its two closing sentences — the durability report and the
   * honesty line under it — were read-once copy and went on #232, and `persisted()` went with
   * them: it was read for the line and nothing else. The one ask still happens where it always
   * did, at the first persisted write (#90, `state/durableStorage.ts`), which is where
   * `durableStorage.test.ts` holds it.
   */
  it('asks the browser nothing about durability — the section is live numbers only (#232)', async () => {
    const persisted = vi.fn(() => Promise.resolve(true));
    stubNavigatorStorage({ persisted });

    await renderSettings();
    await screen.findByText('hindi → marathi course (offline)');

    expect(persisted).not.toHaveBeenCalled();
    // No course sentence survives under the kicker — every line in the section is a number.
    const section = screen.getByRole('heading', { name: 'STORAGE' }).closest('section');
    expect(within(section as HTMLElement).queryByText(/^hi-mr /)).not.toBeInTheDocument();
  });
});

/* ------------------------------------------------------------------ the absence sweep */

describe('what must not exist (F6 AC, [D18], Invariant 4)', () => {
  it('offers no checking or translation control, by role and name, anywhere', async () => {
    await renderSettings();

    const controls = ['button', 'link', 'combobox', 'option', 'checkbox', 'radio', 'switch']
      .flatMap((role) => screen.queryAllByRole(role))
      .map((control) => `${control.tagName}:${control.textContent ?? ''}`);

    for (const control of controls) {
      expect(control).not.toMatch(/check|translat|grade|verif/i);
    }
  });

  it('holds no text input — zero, like every screen of this product (Invariant 6)', async () => {
    await renderSettings();

    expect(screen.queryAllByRole('textbox')).toHaveLength(0);
    expect(document.querySelector('input, textarea')).toBeNull();
  });
});
