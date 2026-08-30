/**
 * The sixth course's AUTHORED rungs, walked through the real screens (#334–#336).
 *
 * en-it (#332–#337) is English → Italian, and no browser may open it on the host that builds it
 * (CLAUDE.md bans Playwright and Chromium on the Pi). So the dev-build smoke is this file:
 * `content/en-it/` is read off disk the way `SettingsScreen.test.tsx` reads a ladder and a bundle,
 * and the real `<App />` is booted into it over a mocked `fetch`, the way every screen test here
 * does. What it proves:
 *
 *   • the Ladder offers L1-M1 as the current rung with its one CTA, in en-it's English chrome,
 *   • every authored module's list renders its ten sentences as ten cards,
 *   • Sentence Detail renders the Italian hero under `lang="it"` with the English gloss paragraph
 *     PRESENT — the L2 is not English, so #268's exemption does not apply — beside the
 *     WORD-FOR-WORD plate,
 *   • and the Why panel, tapped on a comprehension item, answers with exactly the rows the briefs
 *     assigned: `mi piace` and `mi chiamo` whole (never a bare `mi`), the plural `studentessa` on
 *     M1's one `studente` row, and `stanca` on M2's one `stanco` row.
 *
 * The word index has no authored twin (`public/content/` is generated and gitignored, and
 * `verify.sh` runs TEST before CONTENT), so the one served here is folded in-test over the
 * authored modules with the engine's own surface rule (`src/engine/surface.ts`) — the same fold
 * `tools/content-build.ts` performs, first occurrence wins.
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

const COURSE = 'en-it';

const FILES = import.meta.glob<string>('../../content/en-it/**/*.json', {
  query: '?raw',
  import: 'default',
  eager: true,
});

/**
 * The rungs authored so far, in LADDER order — the fold below is cumulative over this list, so it
 * is derived from the files on disk rather than pinned, and grows as the authoring issues land.
 */
const AUTHORED: string[] = Object.keys(FILES)
  .map((path) => /modules\/(L1-M\d+)\.json$/.exec(path)?.[1])
  .filter((id): id is string => id !== undefined)
  .sort((a, b) => Number(a.slice(4)) - Number(b.slice(4)));

function authored(path: string): unknown {
  const text = FILES[`../../content/en-it/${path}`];
  if (text === undefined) throw new Error(`content/en-it/${path} is not authored`);
  return JSON.parse(text);
}

function levels(): Levels {
  return parseLevels(authored('levels.json'), 'content/en-it/levels.json');
}

function module(moduleId: string): ModuleContent {
  return parseModule(
    authored(`modules/${moduleId}.json`),
    `content/en-it/modules/${moduleId}.json`,
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

/** A `fetch` that answers en-it's files from disk and everything else from the shared fixtures. */
function serveAuthoredEnIt(): void {
  const base = mockContentFetch(DEV_MANIFEST, undefined, {});
  const json = (value: unknown) =>
    Promise.resolve(new Response(JSON.stringify(value), { status: 200 }));

  vi.stubGlobal(
    'fetch',
    vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith('/content/en-it/levels.json')) return json(authored('levels.json'));
      if (url.endsWith('/content/en-it/strings.json')) return json(authored('strings.json'));
      const moduleFile = /content\/en-it\/modules\/([^/]+)\.json$/.exec(url);
      if (moduleFile !== null) return json(authored(`modules/${moduleFile[1]}.json`));
      const indexFile = /content\/en-it\/index\/([^/]+)\.json$/.exec(url);
      if (indexFile !== null) return json(index(indexFile[1] as string));
      return base(input);
    }),
  );
}

/** Makes en-it the course the provider boots into — the pointer the switch flow (#106) moves. */
function activateEnIt(): void {
  useAppStore.getState().switchCourse(COURSE);
}

/** Passes every authored rung before `moduleId`, in ladder order, so that rung opens. */
function passRungsBefore(moduleId: string): void {
  const store = useAppStore.getState();
  store.setLadder(COURSE, ladderFromLevels(levels().levels));
  for (const id of AUTHORED) {
    if (id === moduleId) break;
    store.passRitual(COURSE, id, STAMP);
  }
}

/** Renders the app at a hash over the authored tree and waits for the frame. */
async function renderAt(hash: string) {
  serveAuthoredEnIt();
  activateEnIt();
  window.location.hash = hash;
  render(<App />);
  await screen.findByRole('main');
}

/** Renders the app at one rung, with everything before it passed. */
async function renderRung(moduleId: string, hash: string) {
  serveAuthoredEnIt();
  activateEnIt();
  passRungsBefore(moduleId);
  window.location.hash = hash;
  render(<App />);
  await screen.findByRole('main');
}

/** Renders the Why panel under the real provider, as a session would, and waits for boot. */
async function renderPanel(sentenceId: string, display: string) {
  serveAuthoredEnIt();
  activateEnIt();
  render(
    <CourseProvider>
      <HashRouter>
        <Routes>
          <Route path="/" element={<WhyPanel sentenceId={sentenceId} display={display} />} />
        </Routes>
      </HashRouter>
    </CourseProvider>,
  );
  await screen.findByRole('button', { name: 'why' });
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

describe('the Ladder over the authored en-it tree', () => {
  it('offers L1-M1 as the current rung with its CTA in English, and locks the rungs behind it', async () => {
    await renderAt('#/');

    expect(await screen.findByText(/LEVEL 1 · 0 OF 10/)).toBeInTheDocument();
    // The document speaks the course's L1 (#186): English, from the row's `l1Tag`.
    await waitFor(() => {
      expect(document.documentElement.lang).toBe('en');
    });
    expect(screen.getByText('Who I am')).toBeInTheDocument();
    expect(screen.getByText('First exchange')).toBeInTheDocument();
    expect(screen.getByText('M1 · CURRENT RUNG')).toBeInTheDocument();

    // The fresh current rung's one CTA [D22], in the course's own words, and nothing else in the
    // list is a link.
    const links = within(screen.getByRole('list')).getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveTextContent('Start with the module');
    expect(links[0]).toHaveAttribute('href', '#/module/L1-M1');
    expect(screen.getByText('Level 1 · 10 of 10 rungs still to climb.')).toBeInTheDocument();
  });
});

/* ------------------------------------------------------------------ the module list */

describe('the module list over every authored rung', () => {
  it('has rungs to walk at all', () => {
    expect(AUTHORED.length).toBeGreaterThan(0);
  });

  it.each(AUTHORED)(
    'renders the ten authored sentences of %s as ten cards',
    async (moduleId: string) => {
      await renderRung(moduleId, `#/module/${moduleId}`);
      const rung = module(moduleId);

      expect(await screen.findByText(rung.sentences[0]!.display)).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(rung.title);

      const cards = screen
        .getAllByRole('link')
        .filter((link) => link.getAttribute('href')?.startsWith('#/sentence/') === true);
      expect(cards).toHaveLength(10);
      expect(cards.map((card) => card.getAttribute('href'))).toEqual(
        rung.sentences.map((sentence) => `#/sentence/${sentence.id}`),
      );
    },
  );
});

/* ----------------------------------------------------------------- Sentence Detail */

describe('Sentence Detail over the authored en-it rungs', () => {
  /**
   * Every authored sentence, mechanically: the Italian hero declares `it`, the document stays
   * English, and the gloss paragraph is PRESENT — the half of #268 that applies to every course
   * whose L2 is not English, and the one thing hi-en's own walk asserts the other way round.
   */
  it.each(AUTHORED)(
    'renders %s-S01 with an Italian hero and an English gloss',
    async (moduleId) => {
      const sentence = module(moduleId).sentences[0]!;
      await renderRung(moduleId, `#/sentence/${sentence.id}`);

      const hero = await screen.findByRole('heading', { level: 2 });
      expect(hero).toHaveTextContent(sentence.display);
      expect(hero).toHaveAttribute('lang', 'it');
      expect(document.documentElement.lang).toBe('en');

      const gloss = section('gloss');
      expect(within(gloss).getByText(sentence.glossEn!)).toBeInTheDocument();
      expect(gloss.querySelector('p[lang]')).not.toBeNull();
    },
  );

  it('shows L1-M1-S05 — mi piace as ONE row, the article, and the reversed-subject rule', async () => {
    await renderAt('#/sentence/L1-M1-S05');

    const hero = await screen.findByRole('heading', { level: 2 });
    expect(hero).toHaveTextContent('Mi piace il caffè');
    expect(within(section('gloss')).getByText('To-me pleases the coffee')).toBeInTheDocument();

    // The chunk is one word row, so no bare `mi` row exists anywhere in the course.
    const words = section('words');
    expect(within(words).getByText('Mi piace')).toBeInTheDocument();
    expect(within(words).getByText('Mi piace · ti piace · gli piace')).toBeInTheDocument();
    expect(within(words).queryByText('mi')).toBeNull();
    // The trap plate is headed in the course's own words (its strings bundle is English).
    expect(within(section('trap')).getByText('English will mislead you')).toBeInTheDocument();
    expect(within(section('mistake')).getByText('Io piaccio il caffè')).toBeInTheDocument();
  });

  it('shows L1-M2-S08 once L1-M1 is passed — stanco as one row with its four shapes', async () => {
    await renderRung('L1-M2', '#/sentence/L1-M2-S08');

    const hero = await screen.findByRole('heading', { level: 2 });
    expect(hero).toHaveTextContent('Sei stanco?');
    expect(within(section('gloss')).getByText('You-are tired?')).toBeInTheDocument();

    const words = section('words');
    expect(within(words).getByText('stanco')).toBeInTheDocument();
    expect(within(words).getByText('stanco · stanca · stanchi · stanche')).toBeInTheDocument();
  });
});

/* ------------------------------------------------------------------- the Why panel */

describe('the Why panel over an en-it comprehension item', () => {
  it('answers `Mi piace molto la musica` with the chunk whole — never a bare mi', async () => {
    await renderPanel('L1-M1-C07', 'Mi piace molto la musica');
    fireEvent.click(screen.getByRole('button', { name: 'why' }));

    const first = await screen.findByText('Mi piace');
    const rows = within(first.closest('ul')!).getAllByRole('listitem');
    // Four rows, not five: `Mi piace` is one two-token surface and the walk takes it whole.
    expect(rows).toHaveLength(4);
    expect(rows.map((row) => row.textContent)).toEqual([
      expect.stringContaining('Mi piace'),
      expect.stringContaining('molto'),
      expect.stringContaining('la'),
      expect.stringContaining('musica'),
    ]);
    expect(within(rows[0]!).getByText('I like')).toBeInTheDocument();
    expect(within(rows[0]!).getByText(/piacere means "to be pleasing"/)).toBeInTheDocument();
  });

  it('answers `Sono studentessa` with M1 rows — the plural shape on the noun it belongs to', async () => {
    await renderPanel('L1-M1-C02', 'Sono studentessa');
    fireEvent.click(screen.getByRole('button', { name: 'why' }));

    const first = await screen.findByText('Sono');
    const rows = within(first.closest('ul')!).getAllByRole('listitem');
    expect(rows).toHaveLength(2);
    // `studentessa` is a shape of `studente`, so it opens that row's note and not one of its own.
    expect(within(rows[1]!).getByText('student')).toBeInTheDocument();
    expect(within(rows[1]!).getByText(/una studentessa/)).toBeInTheDocument();
  });

  it('answers `Sei stanca?` with M2 rows — the feminine on the one stanco row', async () => {
    await renderPanel('L1-M2-C05', 'Sei stanca?');
    fireEvent.click(screen.getByRole('button', { name: 'why' }));

    const first = await screen.findByText('Sei');
    const rows = within(first.closest('ul')!).getAllByRole('listitem');
    expect(rows).toHaveLength(2);
    expect(within(rows[0]!).getByText('you are')).toBeInTheDocument();
    expect(within(rows[1]!).getByText('tired')).toBeInTheDocument();
    expect(within(rows[1]!).getByText(/stanca of a woman/)).toBeInTheDocument();
  });
});
