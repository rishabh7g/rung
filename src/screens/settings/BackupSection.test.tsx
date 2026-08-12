/**
 * The Backup section (#108) — F7's two flows, proved over the real `<App />` the way every
 * Settings test is (#105), with progress seeded only the way the app can make it (Invariant 1):
 *
 *   • **Export**: ONE file carrying every course, named `rung-export-<YYYY-MM-DD>.json` off the
 *     brand constant and the store-layer clock — through the share sheet where files can ride
 *     one (mocked `canShare`/`share`), and as an anchor download everywhere else — and the
 *     file's content round-trips through `importState` back to the exact persisted slice.
 *   • **Import**: the F7 AC as a two-device test — export on storage A, import on storage B,
 *     every course's ladder, queue, counters and the active course reproduce exactly — behind
 *     the two-sided confirm: NO one-tap path (a picked file changes nothing until the learner
 *     has seen both sides and the replace warning), cancel changes nothing at all, a malformed
 *     file is refused with the course's friendly line plus the path-naming reason and the state
 *     untouched, and the confirm lands on the Ladder of the imported course with the one toast.
 *
 * The file input is created per tap and never mounted (Invariant 6 — the absence sweep in
 * `SettingsScreen.test.tsx` keeps holding `document.querySelector('input')` null at rest), so
 * the tests capture it off `document.createElement` the moment the tap makes it.
 */
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../../App.tsx';
import { resetContentCache } from '../../course/content.ts';
import { resetManifestCache } from '../../course/manifest.ts';
import { resetStringsCache } from '../../course/strings.ts';
import { ladderFromLevels } from '../../engine/progression.ts';
import { exportState, importState } from '../../state/serialize.ts';
import { STORAGE_KEY, persistedSlice, useAppStore } from '../../state/store.ts';
import type { AppState } from '../../state/types.ts';
import { DEV_MANIFEST, mockContentFetch } from '../../test/courseManifest.ts';
import { stringValue } from '../../test/courseStrings.ts';

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

/**
 * "Device A": a state only the app's own actions can reach — a rung passed WITH its enrolment
 * (`completeRitual`, the only way sentences enter review), counters, an open session's place,
 * a second course touched, a setting flipped. What F7's AC calls "ladder position, queue,
 * counters, and active course".
 */
function liveIn(ladder: ReturnType<typeof tenRungLadder>): void {
  const store = useAppStore.getState();
  store.ensureCourse(COURSE);
  store.setLadder(COURSE, ladderFromLevels(ladder.levels));
  store.setActiveCourse(COURSE);
  store.completeRitual(COURSE, 'L1-M1', ['L1-M1-S01', 'L1-M1-S02'], STAMP);
  store.markStudied(COURSE, 'L1-M2');
  store.recordProduction(COURSE, 'L1-M2-S01');
  store.recordProduction(COURSE, 'L1-M2-S01');
  store.startSession(COURSE, ['L1-M2-S01', 'L1-M2-S02']);
  store.setSession(COURSE, { phase: 'read', idx: 1, queue: ['L1-M2-S01', 'L1-M2-S02'] });
  store.ensureCourse('en-es');
  store.recordProduction('en-es', 'L1-M1-S01');
  store.setSetting('elapsedTickEnabled', false);
}

/** Renders the app at /settings and waits for the section's own landmark, the Export button. */
async function renderSettings(ladder = tenRungLadder(2)) {
  mockContentFetch(DEV_MANIFEST, undefined, { levels: ladder });
  window.location.hash = '#/settings';
  render(<App />);
  return await screen.findByRole('button', { name: 'Export' });
}

function strings(key: string): string {
  return stringValue(COURSE, key);
}

/* ------------------------------------------------------- the platform, stubbed per test */

function stubNavigator(name: 'share' | 'canShare', value: unknown): void {
  Object.defineProperty(window.navigator, name, { value, configurable: true });
}

function stubObjectUrls(): { created: Blob[]; revoked: string[] } {
  const created: Blob[] = [];
  const revoked: string[] = [];
  Object.defineProperty(URL, 'createObjectURL', {
    value: (blob: Blob) => {
      created.push(blob);
      return `blob:${BLOB_URL}`;
    },
    configurable: true,
  });
  Object.defineProperty(URL, 'revokeObjectURL', {
    value: (url: string) => void revoked.push(url),
    configurable: true,
  });
  return { created, revoked };
}

const BLOB_URL = 'rung-export-under-test';

/**
 * Taps Import and hands the flow `file`, the way the OS picker would: the input is created for
 * the tap and never mounted, so it is captured off `document.createElement` — filtered by tag,
 * because React is busy creating everything else.
 */
function pickFile(file: File): void {
  const created: HTMLInputElement[] = [];
  const original = document.createElement.bind(document);
  const spy = vi.spyOn(document, 'createElement').mockImplementation(((
    tagName: string,
    options?: ElementCreationOptions,
  ) => {
    const element = original(tagName as keyof HTMLElementTagNameMap, options);
    if (tagName === 'input') created.push(element as HTMLInputElement);
    return element;
  }) as typeof document.createElement);

  fireEvent.click(screen.getByRole('button', { name: 'Import' }));
  spy.mockRestore();

  const input = created.at(-1);
  if (input === undefined) throw new Error('the Import tap created no file input');
  expect(input.type).toBe('file');
  expect(input.accept).toContain('json');
  // Never mounted: the absence sweep's promise holds even mid-flow.
  expect(input.isConnected).toBe(false);

  Object.defineProperty(input, 'files', { value: [file] });
  input.dispatchEvent(new Event('change'));
}

/** A file as a share sheet, chat app or folder would hand it back. */
function exportFile(json: string): File {
  return new File([json], 'rung-export-2026-08-12.json', { type: 'application/json' });
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
  delete (window.navigator as { share?: unknown }).share;
  delete (window.navigator as { canShare?: unknown }).canShare;
  delete (URL as { createObjectURL?: unknown }).createObjectURL;
  delete (URL as { revokeObjectURL?: unknown }).revokeObjectURL;
  window.location.hash = '';
});

/* --------------------------------------------------------------------------- the export */

describe('the export (F7): one file, every course, via the share sheet', () => {
  it('shares ONE file named by the brand and the day, whose content is the exact slice', async () => {
    const asked: ShareData[] = [];
    stubNavigator('canShare', () => true);
    stubNavigator('share', (data: ShareData) => {
      asked.push(data);
      return Promise.resolve();
    });
    liveIn(tenRungLadder(2));
    await renderSettings();

    fireEvent.click(screen.getByRole('button', { name: 'Export' }));

    expect(asked).toHaveLength(1);
    const files = asked[0]?.files ?? [];
    expect(files).toHaveLength(1);
    const file = files[0] as File;
    // The brand constant + the store-layer clock's day: a record-keeping stamp, not UI framing.
    expect(file.name).toMatch(/^rung-export-\d{4}-\d{2}-\d{2}\.json$/);
    expect(file.type).toBe('application/json');
    // The file IS the persisted document — both courses, the counters, the open session's place.
    expect(importState(await file.text())).toEqual(persistedSlice(useAppStore.getState()));
  });

  it('falls back to an anchor download when files cannot ride a share sheet', async () => {
    // `canShare` present and honest: this platform shares, but not files.
    stubNavigator('canShare', () => false);
    stubNavigator('share', () => Promise.resolve());
    const urls = stubObjectUrls();
    const clicked: { download: string; href: string }[] = [];
    const click = vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (
      this: HTMLAnchorElement,
    ) {
      clicked.push({ download: this.download, href: this.href });
    });
    liveIn(tenRungLadder(2));
    await renderSettings();

    fireEvent.click(screen.getByRole('button', { name: 'Export' }));
    click.mockRestore();

    expect(clicked).toHaveLength(1);
    expect(clicked[0]?.download).toMatch(/^rung-export-\d{4}-\d{2}-\d{2}\.json$/);
    expect(clicked[0]?.href).toContain(BLOB_URL);
    // The same bytes the sheet would have carried, and the URL is not left dangling.
    expect(urls.created).toHaveLength(1);
    expect(importState(await (urls.created[0] as File).text())).toEqual(
      persistedSlice(useAppStore.getState()),
    );
    expect(urls.revoked).toEqual([`blob:${BLOB_URL}`]);
  });
});

/* --------------------------------------------------------------------------- the import */

describe('the import: the F7 AC, behind the two-sided confirm', () => {
  it('export on device A → import on device B reproduces every course exactly, and lands home', async () => {
    // Device A lives a little, and exports.
    liveIn(tenRungLadder(2));
    const deviceA = persistedSlice(useAppStore.getState());
    const json = exportState(deviceA);

    // Device B: a fresh document (the reset writes first-run state to storage, as a new
    // install's boot does), the same build.
    useAppStore.getState()._reset();
    await renderSettings();

    pickFile(exportFile(json));
    fireEvent.click(await screen.findByText(strings('settings.importConfirm')));

    // The whole document, exactly — ladder, queue, counters, session position, both courses,
    // the setting, the active course (deep equality against what device A held).
    expect(persistedSlice(useAppStore.getState())).toEqual(deviceA);
    // …and persisted: the localStorage document is the restored one, not the first-run one.
    const held = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as { state: AppState };
    expect(held.state).toEqual(deviceA);

    // The landing: the Ladder of the imported activeCourse, with the course's one toast.
    const toast = await screen.findByText(strings('importToast'));
    expect(toast.closest('[role="status"]')).not.toBeNull();
    expect(window.location.hash).toBe('#/');
  });

  it('has no one-tap path: a picked file changes nothing until the confirm — both sides shown', async () => {
    liveIn(tenRungLadder(2));
    await renderSettings();
    const before = persistedSlice(useAppStore.getState());

    // The incoming file: further along than this device, so the two sides visibly differ.
    const incoming: AppState = {
      ...before,
      courses: {
        ...before.courses,
        [COURSE]: {
          modules: {
            'L1-M1': { status: 'passed', passedAt: '2026-02-02T02:40:00.000Z' },
            'L1-M2': { status: 'passed', passedAt: '2026-02-03T09:00:00.000Z' },
            'L1-M3': { status: 'passed', passedAt: '2026-02-04T09:00:00.000Z' },
          },
          production: {},
          reviewQueue: [],
          sessionCount: 30,
          studied: {},
          session: null,
        },
      },
    };
    pickFile(exportFile(exportState(incoming)));

    // The consequence, before any change: the course's replace warning…
    const warning = await screen.findByText(strings('settings.importReplace'));
    const confirm = warning.parentElement;
    if (confirm === null) throw new Error('the warning renders inside the confirm');
    // …and the two sides, summarised per course in shell-rendered counts (scoped inside the
    // confirm — the dropdown's option carries the same pairLabel).
    const row = within(confirm).getByText('hindi → marathi').parentElement;
    expect(row?.textContent).toContain('on this device');
    expect(row?.textContent).toContain('1 passed · 1 sessions');
    expect(row?.textContent).toContain('in the file');
    expect(row?.textContent).toContain('3 passed · 30 sessions');
    // The one-tap path is gone: no Export/Import while the decision is open.
    expect(screen.queryByRole('button', { name: 'Export' })).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Import' })).not.toBeInTheDocument();
    // And nothing moved: the store holds the very objects it held.
    expect(useAppStore.getState().courses).toBe(before.courses);
  });

  it('cancel keeps what I have: the panel closes and the state is untouched', async () => {
    liveIn(tenRungLadder(2));
    await renderSettings();
    const before = useAppStore.getState().courses;

    pickFile(exportFile(exportState(persistedSlice(useAppStore.getState()))));
    fireEvent.click(await screen.findByText(strings('settings.importCancel')));

    expect(useAppStore.getState().courses).toBe(before);
    expect(screen.queryByText(strings('settings.importReplace'))).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Export' })).toBeInTheDocument();
  });

  it('refuses a malformed file with the friendly line + the path-naming reason, state untouched', async () => {
    liveIn(tenRungLadder(2));
    await renderSettings();
    const before = useAppStore.getState().courses;

    const broken = JSON.parse(exportState(persistedSlice(useAppStore.getState()))) as Esque;
    const queue = ((broken['courses'] as Esque)[COURSE] as { reviewQueue: { box: number }[] })
      .reviewQueue;
    const item = queue[0];
    if (item === undefined) throw new Error('the seeded state holds a review item');
    item.box = 5;
    pickFile(exportFile(JSON.stringify(broken)));

    const refusal = await screen.findByRole('alert');
    expect(refusal.textContent).toContain(strings('settings.importFailed'));
    expect(refusal.textContent).toContain('state.courses.hi-mr.reviewQueue[0].box');
    // Refused means untouched — and no confirm to tap through.
    expect(useAppStore.getState().courses).toBe(before);
    expect(screen.queryByText(strings('settings.importConfirm'))).not.toBeInTheDocument();
  });

  it('discards the transient tier with the state it belonged to (mid-session import)', async () => {
    liveIn(tenRungLadder(2));
    const json = exportState(persistedSlice(useAppStore.getState()));
    await renderSettings();
    sessionStorage.setItem(
      'rung:module-view:hi-mr:L1-M1',
      JSON.stringify({ scrollTop: 120, expanded: ['L1-M1-S01'] }),
    );

    pickFile(exportFile(json));
    fireEvent.click(await screen.findByText(strings('settings.importConfirm')));

    await waitFor(() => expect(sessionStorage.getItem('rung:module-view:hi-mr:L1-M1')).toBeNull());
  });
});

/** A parsed-JSON shape loose enough to break on purpose. */
type Esque = Record<string, unknown>;
