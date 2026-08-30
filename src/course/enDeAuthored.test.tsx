/**
 * The eighth course's AUTHORED rungs, walked through the real screens (#364).
 *
 * en-de (#356–#361) is English → German: en-fr's closest mirror, another Latin-script L2 with
 * grammatical gender and a compound past. No browser may open it on the host that builds it
 * (CLAUDE.md bans Playwright and Chromium on the Pi), so the dev-build smoke is this file, exactly
 * as `enFrAuthored.test.tsx` is en-fr's: `content/en-de/` is read off disk and the real `<App />`
 * is booted into it over a mocked `fetch`.
 *
 * **It reads the AUTHORED tree, never the emitted one, and that is what makes it runnable here.**
 * `public/content/` is generated and gitignored, `verify.sh` runs TEST before CONTENT, and — the
 * reason that matters for this branch — the DEV build currently fails on en-de because L1-M1…M5
 * are being authored in parallel (#362, #363) and the pool rule (PRD §6.3) cannot resolve the
 * words these five modules inherit. So the index served here is folded in-test with the engine's
 * own surface rule (`src/engine/surface.ts`) over the modules that actually exist, first
 * occurrence wins — the same fold `tools/content-build.ts` performs.
 *
 * **AUTHORED is therefore the back half of the ladder only.** Every assertion below is written so
 * that it stays true when M1–M5 land: nothing asserts a row COUNT in the Why panel, because an
 * unresolvable span renders nothing today and will render a row tomorrow. What is asserted is that
 * the rows THESE modules own carry the cue and the note the briefs assigned them. When the
 * branches merge, widen `AUTHORED` to all ten and the Ladder/first-rung cases in
 * `docs/31`/`docs/32`'s files fold in beside these.
 */
import { fireEvent, render, screen, within } from '@testing-library/react';
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

const COURSE = 'en-de';
/** The rungs this issue authored, in ladder order — the fold below is cumulative over this list. */
const AUTHORED = ['L1-M6', 'L1-M7', 'L1-M8', 'L1-M9', 'L1-M10'] as const;
/** Everything before them, which exists in the ladder and not yet on disk. */
const AHEAD_OF_AUTHORED = ['L1-M1', 'L1-M2', 'L1-M3', 'L1-M4', 'L1-M5'] as const;

const FILES = import.meta.glob<string>('../../content/en-de/**/*.json', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function authored(path: string): unknown {
  const text = FILES[`../../content/en-de/${path}`];
  if (text === undefined) throw new Error(`content/en-de/${path} is not authored`);
  return JSON.parse(text);
}

function levels(): Levels {
  return parseLevels(authored('levels.json'), 'content/en-de/levels.json');
}

function module(moduleId: string): ModuleContent {
  return parseModule(
    authored(`modules/${moduleId}.json`),
    `content/en-de/modules/${moduleId}.json`,
  );
}

/** The cumulative index through `moduleId`, folded exactly as `buildWordIndex` folds it. */
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

/** A `fetch` that answers en-de's files from disk and everything else from the shared fixtures. */
function serveAuthoredEnDe(): void {
  const base = mockContentFetch(DEV_MANIFEST, undefined, {});
  const json = (value: unknown) =>
    Promise.resolve(new Response(JSON.stringify(value), { status: 200 }));

  vi.stubGlobal(
    'fetch',
    vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith('/content/en-de/levels.json')) return json(authored('levels.json'));
      if (url.endsWith('/content/en-de/strings.json')) return json(authored('strings.json'));
      const moduleFile = /content\/en-de\/modules\/([^/]+)\.json$/.exec(url);
      if (moduleFile !== null) return json(authored(`modules/${moduleFile[1]}.json`));
      const indexFile = /content\/en-de\/index\/([^/]+)\.json$/.exec(url);
      if (indexFile !== null) return json(index(indexFile[1] as string));
      return base(input);
    }),
  );
}

function activateEnDe(): void {
  useAppStore.getState().switchCourse(COURSE);
}

/** Passes every rung before `moduleId`, authored or not, so that rung opens. */
function passRungsBefore(moduleId: string): void {
  const store = useAppStore.getState();
  store.setLadder(COURSE, ladderFromLevels(levels().levels));
  for (const id of [...AHEAD_OF_AUTHORED, ...AUTHORED]) {
    if (id === moduleId) break;
    store.passRitual(COURSE, id, STAMP);
  }
}

async function renderPanel(sentenceId: string, display: string) {
  serveAuthoredEnDe();
  activateEnDe();
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

async function renderAt(hash: string, unlockThrough?: string) {
  serveAuthoredEnDe();
  activateEnDe();
  if (unlockThrough !== undefined) passRungsBefore(unlockThrough);
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

/* ------------------------------------------------------------------ the module list */

describe('the module list over the authored en-de rungs', () => {
  it.each(AUTHORED)('renders the ten authored sentences of %s as ten cards', async (moduleId) => {
    await renderAt(`#/module/${moduleId}`, moduleId);
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
    // M10's items are TURNS of two or three sentences and they render as ONE card each, whole —
    // the #111/#194/#330 check, and the reason no schema change was needed here.
    for (const sentence of rung.sentences) {
      expect(screen.getByText(sentence.display)).toBeInTheDocument();
    }
  });
});

/* ----------------------------------------------------------------- Sentence Detail */

describe('Sentence Detail over the authored en-de rungs', () => {
  it('shows L1-M6-S01 with a German hero, English chrome, the gloss AND the word-for-word plate', async () => {
    await renderAt('#/sentence/L1-M6-S01', 'L1-M6');
    const sentence = module('L1-M6').sentences[0]!;

    const hero = await screen.findByRole('heading', { level: 2 });
    expect(hero).toHaveTextContent('Morgen esse ich Brot');
    // The language law (#186): the L2 line declares `de`, the document speaks the L1.
    expect(hero).toHaveAttribute('lang', 'de');
    expect(document.documentElement.lang).toBe('en');
    expect(within(section('hero')).getByText("Tomorrow I'll eat bread")).toBeInTheDocument();

    // The L2 is German, so #268's exemption does not reach this course: the gloss IS present.
    const gloss = section('gloss');
    expect(gloss.querySelector('p[lang="en"]')).not.toBeNull();
    expect(within(gloss).getByText(sentence.glossEn!)).toBeInTheDocument();
    expect(within(gloss).getByText('WORD-FOR-WORD')).toBeInTheDocument();
    expect(within(gloss).getByText('Tomorrow eat I bread')).toBeInTheDocument();

    // The row this whole course was sequenced around: the bare `morgen` key, meaning "tomorrow",
    // with a note true of the "morning" reading the case fold cannot hold apart from it.
    const words = section('words');
    expect(within(words).getByText('morgen')).toBeInTheDocument();
    expect(within(words).getByText('tomorrow')).toBeInTheDocument();
    expect(
      within(words).getByText(/Capitalised as a noun, Morgen is "morning"/),
    ).toBeInTheDocument();

    expect(within(section('mistake')).getByText('Morgen ich esse Brot')).toBeInTheDocument();
    expect(within(section('sound')).getByText(sentence.sound!)).toBeInTheDocument();
  });

  it('shows L1-M7-S08 with the accusative doing MOTION, not object duty', async () => {
    await renderAt('#/sentence/L1-M7-S08', 'L1-M7');

    expect(await screen.findByRole('heading', { level: 2 })).toHaveTextContent(
      'Ich gehe in den Park',
    );
    const words = section('words');
    expect(within(words).getByText('in')).toBeInTheDocument();
    expect(within(words).getByText('the (masculine, accusative)')).toBeInTheDocument();
    // The slogan the briefs sent this module to kill, refuted on the page.
    expect(
      within(section('trap')).getByText(/There is no object in this sentence/),
    ).toBeInTheDocument();
    expect(within(section('mistake')).getByText('Ich gehe in dem Park')).toBeInTheDocument();
  });

  it('shows L1-M9-S08 with dass and das side by side, and the spelling trap on it', async () => {
    await renderAt('#/sentence/L1-M9-S08', 'L1-M9');

    expect(await screen.findByRole('heading', { level: 2 })).toHaveTextContent(
      'Ich denke, dass das Buch gut ist',
    );
    // `literal` earns its keep here: the subordinate clause sends the finite verb to the end.
    expect(
      within(section('gloss')).getByText('I think, that the book good is'),
    ).toBeInTheDocument();
    const words = section('words');
    expect(within(words).getByText('that (conjunction)')).toBeInTheDocument();
    expect(within(section('trap')).getByText(/dass das is not a stutter/)).toBeInTheDocument();
  });

  it('shows L1-M10-S02 as a TURN — two sentences in one hero, er for a masculine thing', async () => {
    await renderAt('#/sentence/L1-M10-S02', 'L1-M10');

    const hero = await screen.findByRole('heading', { level: 2 });
    expect(hero).toHaveTextContent('Der Tisch ist groß. Er ist auch alt.');
    expect(hero).toHaveAttribute('lang', 'de');
    const words = section('words');
    expect(within(words).getByText('he · it (masculine)')).toBeInTheDocument();
    expect(within(words).getByText('too · also · as well')).toBeInTheDocument();
    expect(
      within(section('mistake')).getByText('Der Tisch ist groß. Es ist auch alt.'),
    ).toBeInTheDocument();
  });
});

/* ------------------------------------------------------------------- the Why panel */

describe('the Why panel over an en-de comprehension item', () => {
  /**
   * Row COUNTS are deliberately not asserted anywhere below. An unresolvable span renders nothing
   * (WhyPanel's graceful-resolution rule), and on this branch the words these modules inherit from
   * L1-M1…M5 are unresolvable, so a count pinned today would be wrong the day #362 and #363 land.
   * What is pinned is the landing itself: the row, its cue, and the note the briefs assigned it.
   */
  it('answers `Ich bin zu Hause` with zu Hause taken WHOLE — M7 span, not zu plus Hause', async () => {
    await renderPanel('L1-M7-C09', 'Ich bin zu Hause');
    fireEvent.click(screen.getByRole('button', { name: 'why' }));

    expect(await screen.findByText('at home')).toBeInTheDocument();
    // The span claims no bare part, which is what keeps `zu` free for M8's "too" and leaves
    // `nach Hause` to M5. The note says both.
    expect(screen.getByText(/M5's nach Hause is where you are GOING/)).toBeInTheDocument();
    expect(screen.queryByText('too (excessively)')).not.toBeInTheDocument();
  });

  it('answers `Das ist zu teuer` with the bare zu on M8 row, in its "too" job', async () => {
    await renderPanel('L1-M8-C07', 'Das Brot ist zu teuer');
    fireEvent.click(screen.getByRole('button', { name: 'why' }));

    expect(await screen.findByText('too (excessively)')).toBeInTheDocument();
    expect(screen.getByText('expensive')).toBeInTheDocument();
    // No earlier module wrote a bare `zu`, which is the whole reason this row is reachable.
    expect(
      screen.getByText(/this is the only place in the level where the bare word is written/),
    ).toBeInTheDocument();
  });

  it('answers `Es gibt Stühle im Park` with es gibt whole and the plural on M7 Stuhl row', async () => {
    await renderPanel('L1-M7-C14', 'Es gibt Stühle im Park');
    fireEvent.click(screen.getByRole('button', { name: 'why' }));

    expect(await screen.findByText('there is · there are')).toBeInTheDocument();
    // `Stühle` is a FORM on the `Stuhl` row, so the tap opens that row rather than a second,
    // unreachable one — and `im` is M7's contraction, not a bare `in` plus a bare `dem`.
    expect(screen.getByText('chair')).toBeInTheDocument();
    expect(screen.getByText('in the (masculine/neuter, dative)')).toBeInTheDocument();
    expect(screen.getByText('park')).toBeInTheDocument();
  });

  it('answers `Ich arbeite immer am Montag` without opening a rival row for anything', async () => {
    await renderPanel('L1-M10-C15', 'Ich arbeite immer am Montag');
    fireEvent.click(screen.getByRole('button', { name: 'why' }));

    // `immer` is M10's and is the only token here these five modules teach: `am` and `Montag` are
    // M4's and `arbeite` is M4's, so on this branch they resolve to nothing at all and no rival
    // row was opened to make them resolve.
    expect(await screen.findByText('always')).toBeInTheDocument();
    expect(screen.queryByText('on the')).not.toBeInTheDocument();
  });
});
