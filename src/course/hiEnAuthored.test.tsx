/**
 * The fourth course's AUTHORED rungs, walked through the real screens (#270).
 *
 * hi-en (#267–#273) is Hindi → English — the first course whose L2 is the language every other
 * course teaches IN — and no browser may open it on the host that builds it (CLAUDE.md bans
 * Playwright and Chromium on the Pi). So the dev-build smoke is this file: `content/hi-en/` is
 * read off disk the way `SettingsScreen.test.tsx` reads the ladder and the bundle, and the real
 * `<App />` is booted into it over a mocked `fetch`, the way every screen test in this repo does.
 * What it proves, one describe each:
 *
 *   • the Ladder offers L1-M1 as the current rung with its one CTA, in hi-en's own words,
 *   • the module list renders the ten authored sentences as ten cards,
 *   • Sentence Detail renders the hero in English and the chrome in Hindi, with NO gloss paragraph
 *     (#268: the L2 is English, so `glossEn` is omitted) and the WORD-FOR-WORD plate present,
 *   • the Why panel, tapped on a comprehension item, answers with the rows the briefs assigned —
 *     a contraction as ONE row, `a` / `an` as one row, the cross-module rows loaded.
 *
 * The word index has no authored twin (`public/content/` is generated and gitignored, and
 * `verify.sh` runs TEST before CONTENT), so the one served here is folded in-test over the
 * authored modules with the engine's own surface rule (`src/engine/surface.ts`) — the same fold
 * `tools/content-build.ts` performs, first occurrence wins. The emitted file is checked against
 * the same landings in `tools/content-build.test.ts`.
 */
import { fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App.tsx';
import { WhyPanel } from '../components/WhyPanel.tsx';
import { normalizeSurface, surfaceIndexKeys, surfaceSpan } from '../engine/surface.ts';
import { ladderFromLevels } from '../engine/progression.ts';
import { useAppStore } from '../state/store.ts';
import { DEV_MANIFEST, mockContentFetch } from '../test/courseManifest.ts';
import { parseLevels, parseModule, resetContentCache } from './content.ts';
import { CourseProvider } from './CourseProvider.tsx';
import { resetManifestCache } from './manifest.ts';
import { resetStringsCache } from './strings.ts';
import type { Levels, ModuleContent, WordIndex, WordIndexEntry } from './types.ts';

/* ------------------------------------------------------------------ the authored tree */

const COURSE = 'hi-en';
/** The rungs #270 authored, in ladder order — the fold below is cumulative over this list. */
const AUTHORED = ['L1-M1', 'L1-M2'] as const;

const FILES = import.meta.glob<string>('../../content/hi-en/**/*.json', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function authored(path: string): unknown {
  const text = FILES[`../../content/hi-en/${path}`];
  if (text === undefined) throw new Error(`content/hi-en/${path} is not authored`);
  return JSON.parse(text);
}

function levels(): Levels {
  return parseLevels(authored('levels.json'), 'content/hi-en/levels.json');
}

function module(moduleId: string): ModuleContent {
  return parseModule(
    authored(`modules/${moduleId}.json`),
    `content/hi-en/modules/${moduleId}.json`,
  );
}

/**
 * The cumulative index through `moduleId`, folded exactly as the emitter folds it: every word
 * row's `display` and `forms`, each under every key the engine grants it, first occurrence wins.
 */
function index(moduleId: string): WordIndex {
  const surfaces: Record<string, WordIndexEntry> = {};
  const through: string[] = [];
  let maxSpan = 1;

  for (const id of AUTHORED) {
    through.push(id);
    for (const sentence of module(id).sentences) {
      sentence.deconstruction.words.forEach((word, wordIdx) => {
        for (const raw of [word.display, ...word.forms]) {
          const surface = normalizeSurface(raw);
          if (surface === '') continue;
          for (const key of surfaceIndexKeys(surface)) {
            if (Object.hasOwn(surfaces, key)) continue;
            surfaces[key] = { moduleId: id, sentenceId: sentence.id, wordIdx };
            maxSpan = Math.max(maxSpan, surfaceSpan(key));
          }
        }
      });
    }
    if (id === moduleId) break;
  }

  return {
    courseId: COURSE,
    moduleId,
    cumulativeThrough: through,
    surfaceCount: Object.keys(surfaces).length,
    maxSpan,
    surfaces,
  };
}

/** Injected, so nothing here touches the wall clock — `passedAt` is a receipt, not a schedule. */
const STAMP = () => '2026-02-03T09:00:00.000Z';

/**
 * A `fetch` over the whole content tree that answers hi-en's files from disk — ladder, bundle,
 * the two modules and their indexes — and everything else from the shared fixtures.
 */
function serveAuthoredHiEn(): void {
  const base = mockContentFetch(DEV_MANIFEST, undefined, {});
  const json = (value: unknown) =>
    Promise.resolve(new Response(JSON.stringify(value), { status: 200 }));

  vi.stubGlobal(
    'fetch',
    vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith('/content/hi-en/levels.json')) return json(authored('levels.json'));
      if (url.endsWith('/content/hi-en/strings.json')) return json(authored('strings.json'));
      const moduleFile = /content\/hi-en\/modules\/([^/]+)\.json$/.exec(url);
      if (moduleFile !== null) return json(authored(`modules/${moduleFile[1]}.json`));
      const indexFile = /content\/hi-en\/index\/([^/]+)\.json$/.exec(url);
      if (indexFile !== null) return json(index(indexFile[1] as string));
      return base(input);
    }),
  );
}

/** Makes hi-en the course the provider boots into — the pointer the switch flow (#106) moves. */
function activateHiEn(): void {
  useAppStore.getState().switchCourse(COURSE);
}

/** Passes L1-M1 the only way a rung can be passed (Invariant 1), so L1-M2 opens. */
function passFirstRung(): void {
  const store = useAppStore.getState();
  store.setLadder(COURSE, ladderFromLevels(levels().levels));
  store.passRitual(COURSE, 'L1-M1', STAMP);
}

/** Renders the app at a hash over the authored tree and waits for the frame. */
async function renderAt(hash: string) {
  serveAuthoredHiEn();
  activateHiEn();
  window.location.hash = hash;
  render(<App />);
  await screen.findByRole('main');
}

/** The sections on screen, in DOM order — the frozen [D10] sequence, as the browser sees it. */
function section(name: string): HTMLElement {
  const found = screen.getByRole('main').querySelector(`[data-section="${name}"]`);
  if (found === null) throw new Error(`no ${name} section on screen`);
  return found as HTMLElement;
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

/* ----------------------------------------------------------------------- the ladder */

describe('the Ladder over the authored hi-en tree', () => {
  it('offers L1-M1 as the current rung with its CTA in Hindi, and keeps the nine behind it locked', async () => {
    await renderAt('#/');

    expect(await screen.findByText(/LEVEL 1 · 0 OF 10/)).toBeInTheDocument();
    await waitFor(() => {
      expect(document.documentElement.lang).toBe('hi');
    });
    expect(screen.getByText('Who I am')).toBeInTheDocument();
    expect(screen.getByText('First exchange')).toBeInTheDocument();
    expect(screen.getByText('M1 · CURRENT RUNG')).toBeInTheDocument();

    // Two rungs are authored, one is open: the fresh current rung's one CTA [D22], in the
    // course's own words, and nothing else in the list is a link.
    const links = within(screen.getByRole('list')).getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveTextContent('Module से शुरू करो');
    expect(links[0]).toHaveAttribute('href', '#/module/L1-M1');
    expect(screen.getByText('Level 1 · 10 में से 10 rungs अभी बाकी.')).toBeInTheDocument();
  });
});

/* ------------------------------------------------------------------ the module list */

describe('the module list over L1-M1', () => {
  it('renders the ten authored sentences as ten cards into Sentence Detail', async () => {
    await renderAt('#/module/L1-M1');
    const first = module('L1-M1');

    expect(await screen.findByText(first.sentences[0]!.display)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Who I am');

    const cards = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href')?.startsWith('#/sentence/') === true);
    expect(cards).toHaveLength(10);
    expect(cards.map((card) => card.getAttribute('href'))).toEqual(
      first.sentences.map((sentence) => `#/sentence/${sentence.id}`),
    );
    for (const sentence of first.sentences) {
      expect(screen.getByText(sentence.display)).toBeInTheDocument();
    }
  });
});

/* ----------------------------------------------------------------- Sentence Detail */

describe('Sentence Detail over the authored rungs', () => {
  it('shows L1-M1-S01 with an English hero, Hindi chrome, no gloss paragraph and the WORD-FOR-WORD plate', async () => {
    await renderAt('#/sentence/L1-M1-S01');
    const sentence = module('L1-M1').sentences[0]!;

    const hero = await screen.findByRole('heading', { level: 2 });
    expect(hero).toHaveTextContent('My name is Rohan');
    // The language law (#186): the L2 line declares `en`, the document speaks the L1.
    expect(hero).toHaveAttribute('lang', 'en');
    expect(document.documentElement.lang).toBe('hi');
    expect(within(section('hero')).getByText('मेरा नाम रोहन है')).toBeInTheDocument();

    // #268: the L2 is English, so no English gloss — and the section still carries the literal.
    const gloss = section('gloss');
    expect(gloss.querySelector('p[lang]')).toBeNull();
    expect(gloss.children).toHaveLength(1);
    expect(within(gloss).getByText('WORD-FOR-WORD')).toBeInTheDocument();
    expect(within(gloss).getByText('मेरा नाम है रोहन')).toBeInTheDocument();

    // The word rows: the course's one `be` row, opened here, with its Hindi cue and note.
    const words = section('words');
    expect(within(words).getByText('is')).toBeInTheDocument();
    expect(within(words).getByText('हूँ · है · हैं')).toBeInTheDocument();
    expect(within(words).getByText(sentence.deconstruction.words[2]!.note!)).toBeInTheDocument();

    // The trap plate, headed in the course's own words, and the rest of the enrichment in Hindi.
    expect(within(section('trap')).getByText('यहाँ हिंदी धोखा देगी')).toBeInTheDocument();
    expect(within(section('trap')).getByText(sentence.trap!)).toBeInTheDocument();
    expect(within(section('mistake')).getByText('My name Rohan is')).toBeInTheDocument();
    expect(within(section('mnemonic')).getByText(sentence.mnemonic!)).toBeInTheDocument();
  });

  it('shows L1-M2-S04 once L1-M1 is passed — the contraction and the formula as word rows', async () => {
    serveAuthoredHiEn();
    activateHiEn();
    passFirstRung();
    window.location.hash = '#/sentence/L1-M2-S04';
    render(<App />);
    await screen.findByRole('main');

    const hero = await screen.findByRole('heading', { level: 2 });
    expect(hero).toHaveTextContent("I'm fine, thank you");
    expect(section('gloss').querySelector('p[lang]')).toBeNull();
    expect(within(section('gloss')).getByText('मैं-हूँ ठीक, धन्यवाद')).toBeInTheDocument();

    const words = section('words');
    expect(within(words).getByText("I'm")).toBeInTheDocument();
    expect(within(words).getByText('thank you')).toBeInTheDocument();
    expect(within(words).getByText('धन्यवाद')).toBeInTheDocument();
  });
});

/* ------------------------------------------------------------------- the Why panel */

describe('the Why panel over a hi-en comprehension item', () => {
  /** Renders the panel under the real provider, as a session would, and waits for boot. */
  async function renderPanel(sentenceId: string, display: string) {
    serveAuthoredHiEn();
    activateHiEn();
    render(
      <CourseProvider>
        <HashRouter>
          <Routes>
            <Route path="/" element={<WhyPanel sentenceId={sentenceId} display={display} />} />
          </Routes>
        </HashRouter>
      </CourseProvider>,
    );
    await screen.findByRole('button', { name: 'क्यों?' });
  }

  it("answers `No, I'm a teacher` with four rows — the contraction whole, the M1 rows loaded", async () => {
    await renderPanel('L1-M2-C05', "No, I'm a teacher");
    fireEvent.click(screen.getByRole('button', { name: 'क्यों?' }));

    const first = await screen.findByText('No');
    const rows = within(first.closest('ul')!).getAllByRole('listitem');
    expect(rows.map((row) => row.textContent)).toEqual([
      expect.stringContaining('No'),
      expect.stringContaining("I'm"),
      expect.stringContaining('a'),
      expect.stringContaining('teacher'),
    ]);
    // The cues are Hindi, and `I'm` opens the contraction's own note — true of both shapes.
    expect(within(rows[0]!).getByText('नहीं')).toBeInTheDocument();
    expect(within(rows[1]!).getByText('मैं हूँ')).toBeInTheDocument();
    expect(within(rows[1]!).getByText(/I am का बोलचाल वाला रूप/)).toBeInTheDocument();
    expect(within(rows[2]!).getByText('एक')).toBeInTheDocument();
    expect(within(rows[3]!).getByText('शिक्षक')).toBeInTheDocument();
  });

  it('answers `Yes, I am a doctor` with `I am` on the contraction row and `a` on the one article row', async () => {
    await renderPanel('L1-M2-C04', 'Yes, I am a doctor');
    fireEvent.click(screen.getByRole('button', { name: 'क्यों?' }));

    const first = await screen.findByText('Yes');
    const rows = within(first.closest('ul')!).getAllByRole('listitem');
    expect(rows).toHaveLength(4);
    expect(rows.map((row) => row.textContent)).toEqual([
      expect.stringContaining('Yes'),
      expect.stringContaining("I'm"),
      expect.stringContaining('a'),
      expect.stringContaining('doctor'),
    ]);
    expect(within(rows[2]!).getByText(/व्यंजन की आवाज़ से पहले a/)).toBeInTheDocument();
  });
});
