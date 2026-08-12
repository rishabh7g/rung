/**
 * Settings (#105) — the screen's five promises, one describe each:
 *
 *   • the sections stand in F6's frozen order, the privacy line last,
 *   • the COURSE dropdown is the manifest, verbatim — a course added to the manifest is a row
 *     added here with zero shell changes — and switching writes the one string it may,
 *   • the status line is the ladder's own derivation in the course's template — mid-journey,
 *     fresh and pending-authoring each say exactly what is true, counts only,
 *   • the tick toggle reads and writes `settings.elapsedTickEnabled`,
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
import { fireEvent, render, screen, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import tokensCss from '../../design/tokens.css?raw';
import App from '../App.tsx';
import { resetContentCache } from '../course/content.ts';
import { resetManifestCache } from '../course/manifest.ts';
import { resetStringsCache } from '../course/strings.ts';
import { ladderFromLevels } from '../engine/progression.ts';
import { useAppStore } from '../state/store.ts';
import { DEV_MANIFEST, mockContentFetch } from '../test/courseManifest.ts';
import { stringValue } from '../test/courseStrings.ts';
import settingsCss from './SettingsScreen.module.css?raw';

/* ------------------------------------------------------------------ the fixtures */

const COURSE = 'hi-mr';
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

function strings(key: string): string {
  return stringValue(COURSE, key);
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

  it('ends on the privacy line — the course’s own promise, after every section', async () => {
    await renderSettings();

    const promise = screen.getByText(strings('settings.privacy'));
    const backup = screen.getByRole('heading', { name: 'Backup' });
    const follows = backup.compareDocumentPosition(promise) & Node.DOCUMENT_POSITION_FOLLOWING;
    expect(follows).toBeTruthy();
  });

  it('holds the two sibling tickets’ slots without their scope — stubs that name them', async () => {
    await renderSettings();

    expect(screen.getByText('Section stub — built in #107.')).toBeInTheDocument();
    expect(screen.getByText('Section stub — built in #108.')).toBeInTheDocument();
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
          pairLabel: 'french → german',
          scriptMode: 'native',
          dir: 'ltr',
          fixture: true,
        },
      ],
    };

    const select = await renderSettings(tenRungLadder(2), manifest);

    expect(within(select).getAllByRole('option')).toHaveLength(4);
    expect(within(select).getByRole('option', { name: 'french → german' })).toBeInTheDocument();
  });

  it('writes the one string a switch may write, and re-boots into that course’s words', async () => {
    const select = await renderSettings();

    fireEvent.change(select, { target: { value: 'en-es' } });

    // The bare swap (#106 adds the toast on top): the pointer moved, and nothing else did.
    expect(useAppStore.getState().activeCourse).toBe('en-es');
    // The provider re-boots into the chosen course's bundle — the note is en-es's now.
    expect(
      await screen.findByText(stringValue('en-es', 'settings.switchNote')),
    ).toBeInTheDocument();
    // Invariant 8: the switch created the new subtree and deleted nobody's.
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
