/**
 * The fifth course's AUTHORED rungs, walked through the real screens (#328).
 *
 * en-fr (#326–#331) is English → French: the same L1 as en-es, another Latin-script Romance L2,
 * and the first course added behind the gate since hi-en. No browser may open it on the host that
 * builds it (CLAUDE.md bans Playwright and Chromium on the Pi), so the dev-build smoke is this
 * file: `content/en-fr/` is read off disk the way `SettingsScreen.test.tsx` reads the ladder and
 * the bundle, and the real `<App />` is booted into it over a mocked `fetch`, the way every screen
 * test in this repo does. What it proves, one describe each:
 *
 *   • the Ladder offers L1-M1 as the current rung with its one CTA, in en-fr's own English words,
 *   • the module list renders each authored rung's ten sentences as ten cards,
 *   • Sentence Detail renders the hero in French and the chrome in English, WITH the gloss
 *     paragraph (the L2 is not English, so `glossEn` is required — #268's exemption does not
 *     apply) and the WORD-FOR-WORD plate wherever the order diverges,
 *   • the Why panel, tapped on a comprehension item, answers with the rows the briefs assigned —
 *     the elided fusion as ONE row, `est` landing on M1's one `être` row, the multi-token idioms
 *     taken whole.
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

const COURSE = 'en-fr';
/** The rungs authored so far, in ladder order — the fold below is cumulative over this list. */
const AUTHORED = ['L1-M1', 'L1-M2'] as const;

const FILES = import.meta.glob<string>('../../content/en-fr/**/*.json', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function authored(path: string): unknown {
  const text = FILES[`../../content/en-fr/${path}`];
  if (text === undefined) throw new Error(`content/en-fr/${path} is not authored`);
  return JSON.parse(text);
}

function levels(): Levels {
  return parseLevels(authored('levels.json'), 'content/en-fr/levels.json');
}

function module(moduleId: string): ModuleContent {
  return parseModule(
    authored(`modules/${moduleId}.json`),
    `content/en-fr/modules/${moduleId}.json`,
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
 * A `fetch` over the whole content tree that answers en-fr's files from disk — ladder, bundle,
 * the authored modules and their indexes — and everything else from the shared fixtures.
 */
function serveAuthoredEnFr(): void {
  const base = mockContentFetch(DEV_MANIFEST, undefined, {});
  const json = (value: unknown) =>
    Promise.resolve(new Response(JSON.stringify(value), { status: 200 }));

  vi.stubGlobal(
    'fetch',
    vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith('/content/en-fr/levels.json')) return json(authored('levels.json'));
      if (url.endsWith('/content/en-fr/strings.json')) return json(authored('strings.json'));
      const moduleFile = /content\/en-fr\/modules\/([^/]+)\.json$/.exec(url);
      if (moduleFile !== null) return json(authored(`modules/${moduleFile[1]}.json`));
      const indexFile = /content\/en-fr\/index\/([^/]+)\.json$/.exec(url);
      if (indexFile !== null) return json(index(indexFile[1] as string));
      return base(input);
    }),
  );
}

/** Makes en-fr the course the provider boots into — the pointer the switch flow (#106) moves. */
function activateEnFr(): void {
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

/** Renders the Why panel under the real provider, as a session would, and waits for boot. */
async function renderPanel(sentenceId: string, display: string) {
  serveAuthoredEnFr();
  activateEnFr();
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

/** Renders the app at a hash over the authored tree and waits for the frame. */
async function renderAt(hash: string) {
  serveAuthoredEnFr();
  activateEnFr();
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

/**
 * The rows of the Why panel's answer list, in resolution order, found from any text that appears
 * exactly once inside it — a display can repeat its own cue (`Marc` / `Marc`), so the anchor is a
 * cue rather than a surface.
 */
function whyRows(anchor: string): HTMLElement[] {
  return within(screen.getByText(anchor).closest('ul')!).getAllByRole('listitem');
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

describe('the Ladder over the authored en-fr tree', () => {
  it('offers L1-M1 as the current rung with its CTA in English, the rest of the ten locked', async () => {
    await renderAt('#/');

    expect(await screen.findByText(/LEVEL 1 · 0 OF 10/)).toBeInTheDocument();
    // The document speaks the course's L1 (#186): English, from the row's `l1Tag`.
    await waitFor(() => {
      expect(document.documentElement.lang).toBe('en');
    });
    expect(screen.getByText('Who I am')).toBeInTheDocument();
    expect(screen.getByText('First exchange')).toBeInTheDocument();
    expect(screen.getByText('M1 · CURRENT RUNG')).toBeInTheDocument();

    const links = within(screen.getByRole('list')).getAllByRole('link');
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveTextContent('Start with the module');
    expect(links[0]).toHaveAttribute('href', '#/module/L1-M1');
    expect(screen.getByText('Level 1 · 10 of 10 rungs still to climb.')).toBeInTheDocument();
  });
});

/* ------------------------------------------------------------------ the module list */

describe('the module list over the authored rungs', () => {
  it.each(AUTHORED)('renders the ten authored sentences of %s as ten cards', async (moduleId) => {
    serveAuthoredEnFr();
    activateEnFr();
    passRungsBefore(moduleId);
    window.location.hash = `#/module/${moduleId}`;
    render(<App />);
    await screen.findByRole('main');
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
    for (const sentence of rung.sentences) {
      expect(screen.getByText(sentence.display)).toBeInTheDocument();
    }
  });
});

/* ----------------------------------------------------------------- Sentence Detail */

describe('Sentence Detail over the authored rungs', () => {
  it('shows L1-M1-S01 with a French hero, English chrome, the gloss AND the word-for-word plate', async () => {
    await renderAt('#/sentence/L1-M1-S01');
    const sentence = module('L1-M1').sentences[0]!;

    const hero = await screen.findByRole('heading', { level: 2 });
    expect(hero).toHaveTextContent("Je m'appelle Marc");
    // The language law (#186): the L2 line declares `fr`, the document speaks the L1.
    expect(hero).toHaveAttribute('lang', 'fr');
    expect(document.documentElement.lang).toBe('en');
    expect(within(section('hero')).getByText('My name is Marc')).toBeInTheDocument();

    // The L2 is not English, so the gloss paragraph IS present (#268's exemption is hi-en's) —
    // and the literal carries the construction English has no shape for.
    const gloss = section('gloss');
    expect(gloss.querySelector('p[lang="en"]')).not.toBeNull();
    expect(within(gloss).getByText(sentence.glossEn!)).toBeInTheDocument();
    expect(within(gloss).getByText('WORD-FOR-WORD')).toBeInTheDocument();
    expect(within(gloss).getByText('I call-myself Marc')).toBeInTheDocument();

    // The word rows: the reflexive chunk taken whole, with its paradigm and its English note.
    const words = section('words');
    expect(within(words).getByText("Je m'appelle")).toBeInTheDocument();
    expect(within(words).getByText('my name is · to be called')).toBeInTheDocument();
    expect(within(words).getByText(sentence.deconstruction.words[0]!.note!)).toBeInTheDocument();

    // The trap plate, headed in the course's own words, and the rest of the enrichment.
    expect(within(section('trap')).getByText('English will mislead you')).toBeInTheDocument();
    expect(within(section('trap')).getByText(sentence.trap!)).toBeInTheDocument();
    expect(within(section('mistake')).getByText("Je m'appelle est Marc")).toBeInTheDocument();
    expect(within(section('mnemonic')).getByText(sentence.mnemonic!)).toBeInTheDocument();
  });

  it('shows L1-M1-S05 with the elided fusion as ONE word row, not je plus aime', async () => {
    await renderAt('#/sentence/L1-M1-S05');

    expect(await screen.findByRole('heading', { level: 2 })).toHaveTextContent("J'aime le café");
    const words = section('words');
    // Three rows, and the first is the fusion whole: `j'aime`, never a `je` row beside an `aime`.
    expect(within(words).getAllByRole('listitem')).toHaveLength(3);
    expect(within(words).getByText("J'aime")).toBeInTheDocument();
    expect(within(words).getByText('I like')).toBeInTheDocument();
    expect(within(words).getByText('the (masculine)')).toBeInTheDocument();
    // The interference this module exists for is on the plate, in French.
    expect(within(section('mistake')).getByText("J'aime café")).toBeInTheDocument();
  });

  it('shows L1-M2-S06 once L1-M1 is passed — the vous row the register decision requires', async () => {
    serveAuthoredEnFr();
    activateEnFr();
    passRungsBefore('L1-M2');
    window.location.hash = '#/sentence/L1-M2-S06';
    render(<App />);
    await screen.findByRole('main');

    expect(await screen.findByRole('heading', { level: 2 })).toHaveTextContent(
      'Vous êtes fatiguée ?',
    );
    const words = section('words');
    expect(within(words).getByText('Vous')).toBeInTheDocument();
    // The note is English prose about a French word, and it carries the course-wide decision.
    expect(within(words).getByText(/This course writes vous everywhere/)).toBeInTheDocument();
  });
});

/* ------------------------------------------------------------------- the Why panel */

describe('the Why panel over an en-fr comprehension item', () => {
  it('answers `Marc est de Paris` with four rows — est landing on M1 one être row', async () => {
    await renderPanel('L1-M1-C02', 'Marc est de Paris');
    fireEvent.click(screen.getByRole('button', { name: 'why' }));

    await screen.findByText('am · are · is');
    const rows = whyRows('am · are · is');
    expect(rows.map((row) => row.textContent)).toEqual([
      expect.stringContaining('Marc'),
      expect.stringContaining('suis'),
      expect.stringContaining('de'),
      expect.stringContaining('Paris'),
    ]);
    // `est` is a FORM of M1's one être row, so the tap opens that row and its note — which was
    // written true of identity, origin and location alike.
    expect(within(rows[1]!).getByText('am · are · is')).toBeInTheDocument();
    expect(within(rows[1]!).getByText(/the one French verb/)).toBeInTheDocument();
    expect(within(rows[2]!).getByText('from · of')).toBeInTheDocument();
  });

  it('answers `Merci, ça va bien` with three rows — the idiom taken whole', async () => {
    await renderPanel('L1-M2-C12', 'Merci, ça va bien');
    fireEvent.click(screen.getByRole('button', { name: 'why' }));

    await screen.findByText("how are you? · I'm fine");
    const rows = whyRows("how are you? · I'm fine");
    // `ça va` is ONE two-token surface, so the answer is three rows and not four: the idiom is
    // not decomposed into `ça` and `va`, which is what keeps `ça` free for L1-M8.
    expect(rows).toHaveLength(3);
    expect(rows.map((row) => row.textContent)).toEqual([
      expect.stringContaining('merci'),
      expect.stringContaining('Ça va'),
      expect.stringContaining('bien'),
    ]);
    expect(within(rows[1]!).getByText("how are you? · I'm fine")).toBeInTheDocument();
  });

  it("answers `J'aime le livre` with the fusion whole and livre on M1's one book row", async () => {
    await renderPanel('L1-M1-C05', "J'aime le livre");
    fireEvent.click(screen.getByRole('button', { name: 'why' }));

    await screen.findByText('book · books');
    const rows = whyRows('book · books');
    expect(rows).toHaveLength(3);
    expect(rows.map((row) => row.textContent)).toEqual([
      expect.stringContaining("J'aime"),
      expect.stringContaining('le'),
      expect.stringContaining('livres'),
    ]);
    // The singular resolves to the row that lists both shapes — not to a second, unreachable row.
    expect(within(rows[2]!).getByText('book · books')).toBeInTheDocument();
  });
});
