/**
 * The seventh course's AUTHORED rungs, walked through the real screens (#340–#342).
 *
 * en-ru is English → Russian — the product's first course written in Cyrillic — and no browser
 * may open it on the host that builds it (CLAUDE.md bans Playwright and Chromium on the Pi). So
 * the dev-build smoke is this file, exactly as `hiEnAuthored.test.tsx` is hi-en's:
 * `content/en-ru/` is read off disk and the real `<App />` is booted into it over a mocked
 * `fetch`. What it proves, one describe each:
 *
 *   • the Ladder offers L1-M1 as the current rung with its one CTA, in en-ru's English chrome,
 *   • the module list renders each authored module's ten sentences as ten cards,
 *   • Sentence Detail renders the hero on the L2 line (`lang="ru"`, the document still `en`), WITH
 *     the English gloss paragraph — #268's exemption is for a course whose L2 is English, and
 *     Russian is not one — and the WORD-FOR-WORD plate beside it,
 *   • the Why panel, tapped on a comprehension item, answers with the rows the briefs assigned:
 *     `меня зовут` whole rather than as two words, a case shape landing on the row that first
 *     taught the word (`Москвы` → M1's `Москва`, `устала` → M2's `устал`), and the polite
 *     pronoun's object shape (`вас`) landing on the one `Вы` row.
 *
 * The word index has no authored twin (`public/content/` is generated and gitignored, and
 * `verify.sh` runs TEST before CONTENT), so the one served here is folded in-test over the
 * authored modules with the engine's own surface rule — the same fold `tools/content-build.ts`
 * performs, first occurrence wins.
 *
 * **The course is mid-romanization (#353–#360)** and the assertions below are split along the
 * batch boundary rather than converted wholesale: M1–M5 still assert Cyrillic hero lines because
 * that is what those files still hold (#357/#358 have not landed), and the M6–M10 block asserts
 * the romanization of `tools/course-briefs.ts` §0 because #359 rewrote exactly those five files.
 * The `script` line under each hero carries the Cyrillic, and it is not what the screens assert:
 * what a learner is asked to SAY is the `display`, and this file tests what the learner meets.
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

const COURSE = 'en-ru';
/** The rungs authored so far, in ladder order — the fold below is cumulative over this list. */
const AUTHORED = [
  'L1-M1',
  'L1-M2',
  'L1-M3',
  'L1-M4',
  'L1-M5',
  'L1-M6',
  'L1-M7',
  'L1-M8',
  'L1-M9',
  'L1-M10',
] as const;

const FILES = import.meta.glob<string>('../../content/en-ru/**/*.json', {
  query: '?raw',
  import: 'default',
  eager: true,
});

function authored(path: string): unknown {
  const text = FILES[`../../content/en-ru/${path}`];
  if (text === undefined) throw new Error(`content/en-ru/${path} is not authored`);
  return JSON.parse(text);
}

function levels(): Levels {
  return parseLevels(authored('levels.json'), 'content/en-ru/levels.json');
}

function module(moduleId: string): ModuleContent {
  return parseModule(
    authored(`modules/${moduleId}.json`),
    `content/en-ru/modules/${moduleId}.json`,
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

/** A `fetch` that answers en-ru's files from disk and everything else from the shared fixtures. */
function serveAuthoredEnRu(): void {
  const base = mockContentFetch(DEV_MANIFEST, undefined, {});
  const json = (value: unknown) =>
    Promise.resolve(new Response(JSON.stringify(value), { status: 200 }));

  vi.stubGlobal(
    'fetch',
    vi.fn((input: RequestInfo | URL) => {
      const url = String(input);
      if (url.endsWith('/content/en-ru/levels.json')) return json(authored('levels.json'));
      if (url.endsWith('/content/en-ru/strings.json')) return json(authored('strings.json'));
      const moduleFile = /content\/en-ru\/modules\/([^/]+)\.json$/.exec(url);
      if (moduleFile !== null) return json(authored(`modules/${moduleFile[1]}.json`));
      const indexFile = /content\/en-ru\/index\/([^/]+)\.json$/.exec(url);
      if (indexFile !== null) return json(index(indexFile[1] as string));
      return base(input);
    }),
  );
}

/** Makes en-ru the course the provider boots into — the pointer the switch flow (#106) moves. */
function activateEnRu(): void {
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
  serveAuthoredEnRu();
  activateEnRu();
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
  serveAuthoredEnRu();
  activateEnRu();
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

describe('the Ladder over the authored en-ru tree', () => {
  it('offers L1-M1 as the current rung with its CTA in English, the rest of the ladder locked', async () => {
    await renderAt('#/');

    expect(await screen.findByText(/LEVEL 1 · 0 OF 10/)).toBeInTheDocument();
    // The document declares this course's L1, and this course's L1 is English (#186).
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

describe('the module list over each authored rung', () => {
  it.each(AUTHORED)('renders the ten authored sentences of %s as ten cards', async (moduleId) => {
    serveAuthoredEnRu();
    activateEnRu();
    passRungsBefore(moduleId);
    window.location.hash = `#/module/${moduleId}`;
    render(<App />);
    await screen.findByRole('main');
    const authoredModule = module(moduleId);

    expect(await screen.findByText(authoredModule.sentences[0]!.display)).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(authoredModule.title);

    const cards = screen
      .getAllByRole('link')
      .filter((link) => link.getAttribute('href')?.startsWith('#/sentence/') === true);
    expect(cards).toHaveLength(10);
    expect(cards.map((card) => card.getAttribute('href'))).toEqual(
      authoredModule.sentences.map((sentence) => `#/sentence/${sentence.id}`),
    );
    for (const sentence of authoredModule.sentences) {
      expect(screen.getByText(sentence.display)).toBeInTheDocument();
    }
  });
});

/* ----------------------------------------------------------------- Sentence Detail */

describe('Sentence Detail over the authored rungs', () => {
  it('shows L1-M1-S01 with a Cyrillic hero, English chrome, the gloss paragraph and the plate', async () => {
    await renderAt('#/sentence/L1-M1-S01');
    const sentence = module('L1-M1').sentences[0]!;

    const hero = await screen.findByRole('heading', { level: 2 });
    expect(hero).toHaveTextContent('Меня зовут Иван.');
    // The language law (#186): the L2 line declares `ru`, the document speaks the L1, `en`.
    expect(hero).toHaveAttribute('lang', 'ru');
    expect(hero).toHaveAttribute('dir', 'ltr');
    expect(document.documentElement.lang).toBe('en');

    // #268's exemption does NOT reach this course: the L2 is Russian, so the gloss is present,
    // in English, beside the WORD-FOR-WORD plate.
    const gloss = section('gloss');
    expect(within(gloss).getByText(sentence.glossEn!)).toBeInTheDocument();
    expect(within(gloss).getByText('WORD-FOR-WORD')).toBeInTheDocument();
    expect(within(gloss).getByText('Me they-call Ivan')).toBeInTheDocument();

    // The word rows: the name formula taught WHOLE, as the briefs assigned it.
    const words = section('words');
    expect(within(words).getAllByText('Меня зовут').length).toBeGreaterThan(0);
    expect(within(words).getByText('my name is')).toBeInTheDocument();
    expect(within(words).getByText(sentence.deconstruction.words[0]!.note!)).toBeInTheDocument();

    // The trap plate, headed in this course's own English words, and the rest of the enrichment.
    expect(within(section('trap')).getByText('English will mislead you')).toBeInTheDocument();
    expect(within(section('trap')).getByText(sentence.trap!)).toBeInTheDocument();
    expect(within(section('mistake')).getByText('Моё имя Иван.')).toBeInTheDocument();
    expect(within(section('mnemonic')).getByText(sentence.mnemonic!)).toBeInTheDocument();
  });

  it('shows the zero-copula sentence with no "is" row to own — two words, two rows', async () => {
    await renderAt('#/sentence/L1-M1-S03');

    const hero = await screen.findByRole('heading', { level: 2 });
    expect(hero).toHaveTextContent('Я студент.');

    // Я студент is the whole sentence: the rows are the pronoun and the noun, and there is no
    // third row standing in for a copula, because there is no copula on the page to teach.
    const rows = within(section('words')).getAllByRole('listitem');
    expect(rows).toHaveLength(2);
    expect(rows.map((row) => row.textContent)).toEqual([
      expect.stringContaining('я'),
      expect.stringContaining('студент'),
    ]);
    expect(within(section('mistake')).getByText('Я есть студент.')).toBeInTheDocument();
  });

  it('shows L1-M2-S08 once L1-M1 is passed — the speaker-gender pair on ONE row', async () => {
    serveAuthoredEnRu();
    activateEnRu();
    passRungsBefore('L1-M2');
    window.location.hash = '#/sentence/L1-M2-S08';
    render(<App />);
    await screen.findByRole('main');

    const hero = await screen.findByRole('heading', { level: 2 });
    expect(hero).toHaveTextContent('Я устал.');

    // One row carries both shapes — the gender is the SUBJECT's, and вы takes the plural.
    const words = section('words');
    expect(within(words).getByText('устал')).toBeInTheDocument();
    expect(within(words).getByText('устал · устала · устали')).toBeInTheDocument();
  });
});

/* ------------------------------------------------- the middle rungs (#341) */

describe('Sentence Detail over L1-M3, L1-M4 and L1-M5', () => {
  /** Renders one sentence of an authored rung, with every rung before it passed. */
  async function renderSentence(moduleId: string, sentenceId: string) {
    serveAuthoredEnRu();
    activateEnRu();
    passRungsBefore(moduleId);
    window.location.hash = `#/sentence/${sentenceId}`;
    render(<App />);
    await screen.findByRole('main');
  }

  it('shows M3’s first case ending — the noun’s two shapes on ONE row', async () => {
    await renderSentence('L1-M3', 'L1-M3-S02');

    expect(await screen.findByRole('heading', { level: 2 })).toHaveTextContent('Я хочу воду.');
    // вода and воду are the same word, so they share a row and a note — a second row for the
    // bent shape would be a second note the index could never reach.
    const words = section('words');
    expect(within(words).getAllByText('вода').length).toBeGreaterThan(0);
    expect(within(words).getByText('вода · воду')).toBeInTheDocument();
    expect(within(section('mistake')).getByText('Я хочу вода.')).toBeInTheDocument();
  });

  it('shows M4’s clock hour with all three number-driven shapes on one row', async () => {
    await renderSentence('L1-M4', 'L1-M4-S02');

    expect(await screen.findByRole('heading', { level: 2 })).toHaveTextContent(
      'Я встаю в семь часов.',
    );
    const words = section('words');
    expect(within(words).getByText('час · часа · часов')).toBeInTheDocument();
    // The в row is M4's, and its note has to answer for M7's place seat as well.
    expect(within(words).getByText('at · in')).toBeInTheDocument();
  });

  it('shows M5’s past with the gender pair and the one быть row', async () => {
    await renderSentence('L1-M5', 'L1-M5-S01');

    expect(await screen.findByRole('heading', { level: 2 })).toHaveTextContent('Вчера я был дома.');
    const words = section('words');
    // The verb that had no present tense at all now has seven shapes, all on ONE row: M5 opened
    // it with the past and M6 extended it with the future, rather than forking the lexeme.
    expect(
      within(words).getByText('был · была · было · были · буду · будете · будет'),
    ).toBeInTheDocument();
    expect(within(words).getByText('was')).toBeInTheDocument();
    expect(within(section('mistake')).getByText('Вчера я есть дома.')).toBeInTheDocument();
  });

  it('shows M5’s two endings answering to two different masters', async () => {
    await renderSentence('L1-M5', 'L1-M5-S03');

    expect(await screen.findByRole('heading', { level: 2 })).toHaveTextContent(
      'Вчера я купила газету.',
    );
    // купила follows the speaker; газету follows its job in the sentence. The trap says so.
    expect(
      within(section('trap')).getByText(/Two -а endings, two different reasons/),
    ).toBeInTheDocument();
    expect(within(section('words')).getByText('газета · газету')).toBeInTheDocument();
  });
});

/* -------------------------------------------------- the last five rungs (#342) */

describe('Sentence Detail over L1-M6 … L1-M10', () => {
  async function renderSentence(moduleId: string, sentenceId: string) {
    serveAuthoredEnRu();
    activateEnRu();
    passRungsBefore(moduleId);
    window.location.hash = `#/sentence/${sentenceId}`;
    render(<App />);
    await screen.findByRole('main');
  }

  it('shows M6’s perfective future — a present-shaped verb with no búdu in the sentence', async () => {
    await renderSentence('L1-M6', 'L1-M6-S03');

    // Romanized since #359: the hero line is the scheme, and the Cyrillic is the quiet `script`
    // line under it. Asserting the romanization rather than the Cyrillic is the point — it is
    // what a learner who cannot read Cyrillic is asked to say.
    expect(await screen.findByRole('heading', { level: 2 })).toHaveTextContent(
      "Závtra ya napishú pis'mó.",
    );
    expect(within(section('words')).getByText('I will write')).toBeInTheDocument();
    expect(
      within(section('mistake')).getByText("Závtra ya búdu napishú pis'mó."),
    ).toBeInTheDocument();
  });

  it("shows M7’s existential yest' — the one row that also serves M8’s possession", async () => {
    await renderSentence('L1-M7', 'L1-M7-S03');

    expect(await screen.findByRole('heading', { level: 2 })).toHaveTextContent(
      "Na stolé yest' kníga.",
    );
    const words = section('words');
    // The apostrophe is load-bearing: `src/engine/surface.ts` exempts `'` from edge stripping by
    // name, so `yest'` is the index key and `yest` is a surface this course never wrote.
    expect(within(words).getAllByText("yest'").length).toBeGreaterThan(0);
    expect(within(words).getByText('there is · there are')).toBeInTheDocument();
    // The literal is the point of the rung: English's "there" corresponds to nothing at all.
    expect(within(section('gloss')).getByText('On table is book')).toBeInTheDocument();
  });

  it('shows M8’s possession frame whole — three tokens, and no verb "to have"', async () => {
    await renderSentence('L1-M8', 'L1-M8-S06');

    expect(await screen.findByRole('heading', { level: 2 })).toHaveTextContent(
      "U menyá yest' bilét.",
    );
    const words = section('words');
    expect(within(words).getAllByText("U menyá yest'").length).toBeGreaterThan(0);
    expect(within(words).getByText('I have')).toBeInTheDocument();
    expect(within(section('gloss')).getByText('At me is ticket')).toBeInTheDocument();
  });

  it('shows M9’s dative experiencer — no subject, and the verb following the thing', async () => {
    await renderSentence('L1-M9', 'L1-M9-S03');

    expect(await screen.findByRole('heading', { level: 2 })).toHaveTextContent(
      'Mne nrávitsya Moskvá.',
    );
    expect(within(section('words')).getByText('nrávitsya · nrávyatsya')).toBeInTheDocument();
    expect(within(section('gloss')).getByText('To-me pleases Moscow')).toBeInTheDocument();
  });

  it('renders an M10 turn whole — two sentences on one card, with its own gloss', async () => {
    await renderSentence('L1-M10', 'L1-M10-S07');

    // A turn is 2–3 short sentences and the hero line carries all of them, unsplit.
    expect(await screen.findByRole('heading', { level: 2 })).toHaveTextContent(
      'Gde klyuch? On na stolé.',
    );
    expect(within(section('words')).getByText('On · oná · onó · oní')).toBeInTheDocument();
    expect(within(section('mistake')).getByText('Gde klyuch? Onó na stolé.')).toBeInTheDocument();
  });
});

/* ------------------------------------------------------------------- the Why panel */

describe('the Why panel over an en-ru comprehension item', () => {
  it('answers `Меня зовут Анна.` with TWO rows — the formula whole, never as меня + зовут', async () => {
    await renderPanel('L1-M1-C01', 'Меня зовут Анна.');
    fireEvent.click(screen.getByRole('button', { name: 'why' }));

    const first = await screen.findByText('Меня зовут');
    const rows = within(first.closest('ul')!).getAllByRole('listitem');
    expect(rows).toHaveLength(2);
    expect(rows.map((row) => row.textContent)).toEqual([
      expect.stringContaining('Меня зовут'),
      expect.stringContaining('Анна'),
    ]);
    // The cues are English — the L1 of this course.
    expect(within(rows[0]!).getByText('my name is')).toBeInTheDocument();
    expect(within(rows[1]!).getByText('Anna')).toBeInTheDocument();
  });

  it('lands a case shape on the row that first taught the word — Москвы on M1’s Москва', async () => {
    await renderPanel('L1-M1-C03', 'Анна из Москвы.');
    fireEvent.click(screen.getByRole('button', { name: 'why' }));

    const first = await screen.findByText('Анна');
    const rows = within(first.closest('ul')!).getAllByRole('listitem');
    expect(rows).toHaveLength(3);
    // The third row is Москва's, not a second row for the bent shape: a case form never opens
    // one, so the note a learner reads here is the one written true of both shapes.
    expect(within(rows[2]!).getByText('Москва')).toBeInTheDocument();
    expect(within(rows[2]!).getByText('Moscow')).toBeInTheDocument();
    expect(within(rows[2]!).getByText(/Москвы is what из takes/)).toBeInTheDocument();
  });

  it("takes M8’s three-token possession chunk whole, never as u + menyá + yest'", async () => {
    await renderPanel('L1-M8-C04', "U menyá yest' klyuch.");
    fireEvent.click(screen.getByRole('button', { name: 'why' }));

    const first = await screen.findByText("U menyá yest'");
    const rows = within(first.closest('ul')!).getAllByRole('listitem');
    // Two rows, not four: the resolver takes the longest match, so the chunk swallows its own
    // `yest'` and the bare `u` never has to resolve at all. The romanization did not move this
    // seam — `у меня есть` was three tokens and `u menyá yest'` is three tokens (#359).
    expect(rows).toHaveLength(2);
    expect(within(rows[0]!).getByText('I have')).toBeInTheDocument();
    expect(within(rows[1]!).getByText('Klyuch')).toBeInTheDocument();
  });

  it('lands устала on M2’s ONE устал row, and вас on the ONE Вы row', async () => {
    await renderPanel('L1-M2-C09', 'Я устала.');
    fireEvent.click(screen.getByRole('button', { name: 'why' }));

    const tired = await screen.findByText('устал');
    const rows = within(tired.closest('ul')!).getAllByRole('listitem');
    expect(rows).toHaveLength(2);
    expect(within(rows[1]!).getByText(/устала for a woman/)).toBeInTheDocument();

    // …and the polite pronoun's object shape, on the same one row as its subject shape.
    resetContentCache();
    resetStringsCache();
    vi.unstubAllGlobals();
    await renderPanel('L1-M2-S05', 'Как вас зовут?');
    fireEvent.click(screen.getAllByRole('button', { name: 'why' })[0]!);

    const how = await screen.findAllByText('Как');
    const askRows = within(how[0]!.closest('ul')!).getAllByRole('listitem');
    expect(askRows).toHaveLength(3);
    expect(within(askRows[1]!).getByText('Вы')).toBeInTheDocument();
    expect(within(askRows[1]!).getByText('you (polite)')).toBeInTheDocument();
    expect(within(askRows[2]!).getByText('зовут')).toBeInTheDocument();
  });
});
