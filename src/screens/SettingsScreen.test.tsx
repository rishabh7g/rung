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
import { stringValue } from '../test/courseStrings.ts';
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

/**
 * The fifth course's files (#338): `content/en-ru/levels.json` and `content/en-ru/strings.json`.
 * en-ru is English (L1) → Russian (L2), still a dev fixture — its row carries `fixture: true`, so
 * only a `--with-fixtures` build offers it and not one of its ten rungs is authored yet. The smoke
 * below is the same one hi-en got: the row in the switcher, a ten-rung ladder, English chrome.
 */
const EN_RU_FILES = import.meta.glob<string>('../../content/en-ru/*.json', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function authoredEnRu(file: 'levels.json' | 'strings.json'): unknown {
  const text = EN_RU_FILES[`../../content/en-ru/${file}`];
  if (text === undefined) throw new Error(`content/en-ru/${file} is not authored`);
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
  /**
   * LANGUAGE leads (#323): "what do you read" is the question that makes sense before "what are
   * you studying", and the COURSE dropdown below is downstream of its answer.
   */
  it('renders LANGUAGE → COURSE → PRACTICE → STORAGE → Backup, under the screen title', async () => {
    await renderSettings();

    const headings = screen
      .getAllByRole('heading')
      .map((heading) => heading.textContent)
      .filter((text) => text !== 'rung'); // the shell's brand h1 sits above the screen

    expect(headings).toEqual(['Settings', 'LANGUAGE', 'COURSE', 'PRACTICE', 'STORAGE', 'Backup']);
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

/* ------------------------------------------------------------- the language section */

/**
 * "Your language" (#323) — the L1 choice, and the course move that follows from it.
 *
 * The one promise worth more than the rest: choosing a language may switch the course, and a
 * switch must never cost a learner anything. That is Invariant 8, already proved for the course
 * dropdown (#106), and it is asserted here as a deep-equal over the LEFT course's whole subtree
 * rather than as a spot check.
 */
describe('the LANGUAGE section (#323)', () => {
  function langSelect(): HTMLElement {
    return screen.getByRole('combobox', { name: stringValue(COURSE, 'settings.yourLanguage') });
  }

  it("offers the manifest's distinct L1s, deduped, in manifest order", async () => {
    await renderSettings();

    const labels = within(langSelect())
      .getAllByRole('option')
      .map((option) => option.textContent);

    // DEV_MANIFEST ships hi-mr, en-es, en-ar, hi-en — two distinct L1s, each named once.
    const expected: string[] = [];
    const seen = new Set<string>();
    for (const row of DEV_MANIFEST.courses) {
      if (seen.has(row.l1Tag)) continue;
      seen.add(row.l1Tag);
      expected.push(row.l1);
    }

    expect(labels).toEqual(expected);
    expect(new Set(labels).size).toBe(labels.length);
  });

  /** Unset means "follow the course" (#322): the active course's L1 shows, and nothing moves. */
  it("shows the active course's L1 when nothing is persisted, and switches nothing", async () => {
    await renderSettings();

    expect(langSelect()).toHaveValue('hi');
    expect(useAppStore.getState().settings.userLang).toBe('');
    expect(useAppStore.getState().activeCourse).toBe('hi-mr');
  });

  it('persists the chosen language', async () => {
    await renderSettings();

    fireEvent.change(langSelect(), { target: { value: 'en' } });

    await waitFor(() => expect(useAppStore.getState().settings.userLang).toBe('en'));
  });

  it('moves to the first manifest course in that language, and keeps what the old one earned', async () => {
    const ladder = tenRungLadder(2);
    await renderSettings(ladder);
    climb(ladder, 'L1-M1');

    const before = structuredClone(useAppStore.getState().courses[COURSE]);

    fireEvent.change(langSelect(), { target: { value: 'en' } });

    // The first English-L1 row in the manifest — chosen by the manifest's order, not by a list
    // this screen keeps.
    const target = DEV_MANIFEST.courses.find((row) => row.l1Tag === 'en');
    await waitFor(() => expect(useAppStore.getState().activeCourse).toBe(target?.id));

    // Invariant 8, in full: the course left behind is byte-identical, not merely present.
    expect(useAppStore.getState().courses[COURSE]).toEqual(before);
  });

  it('switches nothing when the active course already speaks the chosen language', async () => {
    await renderSettings();

    fireEvent.change(langSelect(), { target: { value: 'hi' } });

    await waitFor(() => expect(useAppStore.getState().settings.userLang).toBe('hi'));
    expect(useAppStore.getState().activeCourse).toBe('hi-mr');
  });
});

/* ------------------------------------------------------------------- the dropdown */

describe('the COURSE dropdown (F0)', () => {
  /**
   * #324: the field offers what there is to LEARN in the learner's own language, named by the
   * target language — not every course by its direction pair. Half of a pair label repeated the
   * language they had just chosen, and the other half was written for somebody else.
   */
  it('offers the courses in the user’s language, labelled by what they teach', async () => {
    const select = await renderSettings();

    const labels = within(select)
      .getAllByRole('option')
      .map((option) => option.textContent);

    // userLang is unset, so it resolves to hi-mr's own L1: the Hindi-L1 courses, in manifest
    // order, each named by its L2.
    expect(labels).toEqual(
      DEV_MANIFEST.courses.filter((course) => course.l1Tag === 'hi').map((course) => course.l2),
    );
    expect(select).toHaveValue('hi-mr');
  });

  it('offers no course outside the user’s language, in any form', async () => {
    const select = await renderSettings();

    const text = select.textContent ?? '';
    for (const course of DEV_MANIFEST.courses) {
      // No direction pairs anywhere, and nothing from an English-L1 course.
      expect(text).not.toContain(course.pairLabel);
      if (course.l1Tag !== 'hi')
        expect(within(select).queryByRole('option', { name: course.l2 })).toBeNull();
    }
  });

  it('surfaces a course added to the manifest with zero shell changes', async () => {
    const manifest = {
      ...DEV_MANIFEST,
      courses: [
        ...DEV_MANIFEST.courses,
        {
          id: 'hi-ta',
          l1: 'Hindi',
          l2: 'Tamil',
          l1Tag: 'hi',
          l2Tag: 'ta',
          l2Dir: 'ltr',
          pairLabel: 'hindi → tamil',
          scriptMode: 'native',
          dir: 'ltr',
          fixture: true,
        },
      ],
    };

    const select = await renderSettings(tenRungLadder(2), manifest);

    // A course in the learner's own language appears with no shell change — named by what it
    // teaches (#324), which is the whole of what the shell knows about it.
    const inHindi = manifest.courses.filter((course) => course.l1Tag === 'hi');
    expect(within(select).getAllByRole('option')).toHaveLength(inHindi.length);
    expect(within(select).getByRole('option', { name: 'Tamil' })).toBeInTheDocument();
  });

  it('runs the switch flow (#106): pointer moved, target ensured, re-boots into its words', async () => {
    const select = await renderSettings();

    fireEvent.change(select, { target: { value: 'hi-en' } });

    // `switchCourse`: the pointer moved and the target's subtree exists, at once.
    expect(useAppStore.getState().activeCourse).toBe('hi-en');
    expect(useAppStore.getState().courses['hi-en']).toBeDefined();
    // The provider re-boots into the chosen course's bundle: the words on screen are en-es's
    // own. The anchor was the reassurance note under the dropdown until #232 removed it, so it
    // is now the arrival toast — whose two pair labels the next case pins.
    expect(await screen.findByText(/^hi-en switchToast/)).toBeInTheDocument();
    // Invariant 8: the switch created the new subtree and deleted nobody's.
    expect(useAppStore.getState().courses[COURSE]).toBeDefined();
  });

  it('confirms with the toast in the TARGET course’s words, naming both pairs (#106)', async () => {
    const ladder = tenRungLadder(3);
    climb(ladder, 'L1-M1');
    const before = useAppStore.getState().courses[COURSE];
    const select = await renderSettings(ladder);

    fireEvent.change(select, { target: { value: 'hi-en' } });

    // The template is hi-en's own `switchToast` — the fixture value self-identifies its course —
    // `{to}` filled with the target's pairLabel and `{from}` with the pair being left. The TOAST
    // still names both directions in full: #324 changed what the dropdown offers, not what the
    // confirmation says.
    const toast = await screen.findByText('hi-en switchToast hindi → english hindi → marathi');
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

    fireEvent.change(select, { target: { value: 'hi-en' } });

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

  it('is offered as the last thing to learn, and is nothing the shell was told about', async () => {
    const select = await renderSettings();

    const labels = within(select)
      .getAllByRole('option')
      .map((option) => option.textContent);
    // Named by what it teaches since #324 — it shares hi-mr's L1, so it is in the list at all.
    //
    // `.at(-1)` survives en-ru's arrival (#338) precisely BECAUSE of #324: the field is filtered
    // to the learner's own language, so appending an English-L1 course cannot move the tail of
    // the Hindi list. Before #324 this had to loosen to `toContain`; it does not any more.
    expect(labels.at(-1)).toBe('English');
    // The switcher reads the row's own names and nothing else about it (`manifest.test.ts`) — the
    // fourth course is offered exactly like the first three, on a strict build as on a dev one.
    expect(within(select).getByRole('option', { name: 'English' })).toHaveValue('hi-en');
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

/* ------------------------------------------------- the fifth course, en-ru (#338) */

describe('the fifth course — en-ru (#343, shipping)', () => {
  /**
   * The same switch flow, run against the REAL en-ru files. The row shipped in #343, so it carries
   * no `fixture` key and a strict build emits it. The chrome is en-ru's English bundle — the L1 of
   * this course is English, so `lang` stays `en` and the ladder reads exactly as en-es's does.
   *
   * **Reaching it is a two-step journey since #324**, and that is the point rather than an
   * inconvenience: the course field offers only what the learner can READ, so an English course
   * appears once the language above it says English. A Hindi reader is never shown Russian.
   */
  function serveEnRu(): void {
    const base = globalThis.fetch;
    const json = (value: unknown) =>
      Promise.resolve(new Response(JSON.stringify(value), { status: 200 }));
    vi.stubGlobal(
      'fetch',
      vi.fn((input: RequestInfo | URL) => {
        const url = String(input);
        if (url.endsWith('/content/en-ru/levels.json')) return json(authoredEnRu('levels.json'));
        if (url.endsWith('/content/en-ru/strings.json')) return json(authoredEnRu('strings.json'));
        return base(input);
      }),
    );
  }

  /** The language field, by the course's own label for it. */
  function langSelect(): HTMLElement {
    return screen.getByRole('combobox', { name: stringValue(COURSE, 'settings.yourLanguage') });
  }

  it('is offered to an English reader as Russian, and to a Hindi reader not at all', async () => {
    const select = await renderSettings();

    // A Hindi reader sees the Hindi-L1 courses only: en-ru is not among them, in any form.
    expect(within(select).queryByRole('option', { name: 'Russian' })).toBeNull();
    expect(select.textContent ?? '').not.toContain('russian');

    // Say you read English, and the field offers what there is to learn in it (#324).
    fireEvent.change(langSelect(), { target: { value: 'en' } });

    const inEnglish = await screen.findByRole('combobox', { name: 'Active course' });
    await waitFor(() => {
      expect(within(inEnglish).getByRole('option', { name: 'Russian' })).toHaveValue('en-ru');
    });
  });

  it('boots a ladder of ten pending rungs in English chrome, and leaves hi-mr where it was', async () => {
    const ladder = tenRungLadder(3);
    climb(ladder, 'L1-M1');
    const before = useAppStore.getState().courses[COURSE];
    await renderSettings(ladder);
    serveEnRu();

    // English first, then Russian — the journey #324 made explicit.
    fireEvent.change(langSelect(), { target: { value: 'en' } });
    const select = await screen.findByRole('combobox', { name: 'Active course' });
    await waitFor(() => {
      expect(within(select).queryByRole('option', { name: 'Russian' })).not.toBeNull();
    });
    fireEvent.change(select, { target: { value: 'en-ru' } });

    // The arrival toast is en-ru's own `switchToast` — English, the L1 of this course. It names
    // the pair being LEFT, which after the language step above is the first English-L1 course
    // rather than hi-mr: the toast reports what actually happened, not what the test set up.
    expect(
      await screen.findByText(/You’re on english → russian now\. Your .+ ladder is saved/),
    ).toBeInTheDocument();
    // The document declares the course's L1 (#186): `en`, off the row's `l1Tag`. Russian is what
    // this course TEACHES, and not one Cyrillic line exists yet — the skeleton carries none.
    await waitFor(() => {
      expect(document.documentElement.lang).toBe('en');
    });
    expect(document.documentElement.dir).toBe('ltr');

    fireEvent.click(screen.getByRole('link', { name: 'Ladder' }));
    expect(await screen.findByText(/LEVEL 1 · 0 OF 10/)).toBeInTheDocument();
    expect(screen.getByText('Foundations — say what you need')).toBeInTheDocument();
    expect(within(screen.getByRole('list')).getAllByRole('listitem')).toHaveLength(10);
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
    // Nothing is passed, so M1 is the current rung with the one CTA a fresh rung gets [D22] —
    // in en-ru's own English words — and the rest of the ladder is locked, so that CTA is the
    // only link in the list. The pending line counts all ten (Invariant 2: counts only).
    expect(screen.getByText('M1 · CURRENT RUNG')).toBeInTheDocument();
    const rungLinks = within(screen.getByRole('list')).getAllByRole('link');
    expect(rungLinks).toHaveLength(1);
    expect(rungLinks[0]).toHaveTextContent('Start with the module');
    expect(rungLinks[0]).toHaveAttribute('href', '#/module/L1-M1');
    expect(screen.getByText('Level 1 · 10 of 10 rungs still to climb.')).toBeInTheDocument();

    // Invariant 8: the switch created en-ru's subtree and touched nobody else's.
    expect(useAppStore.getState().courses[COURSE]).toBe(before);
    expect(useAppStore.getState().courses['en-ru']).toBeDefined();

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
