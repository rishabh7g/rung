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
 *     a contraction as ONE row, `a` / `an` as one row, the cross-module rows loaded,
 *   • since #271, the same walk over L1-M3..M5 — module list, Sentence Detail with the
 *     contraction rows (`don't`, `does`, `didn't`), and the Why panel landing `the` / `do` on
 *     M3's rows, `has` on M4's possession-only `have`, and `was` on M1's one `be` row, which M5
 *     extended in M1's file rather than opening a second,
 *   • and, since #272, the last five rungs L1-M6..M10 — the module list of each (M10's turns
 *     render whole, 2–3 sentences to a card), Sentence Detail with the whole-surface rows (`will`,
 *     `There is`, `Can I have`, `because`, a turn's `sister`), and the Why panel answering `I will`
 *     with `I` then `will` (never an `I'll` row), `There are` with the `There is` row, `Can I have`
 *     whole (never M4's `have`), `that` with the one M9 row, and a turn's `See you` across its
 *     sentence boundary.
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
/** The ten rungs #270, #271 and #272 authored, in ladder order — the fold below is cumulative over this list. */
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
  passRungsBefore('L1-M2');
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

/* ------------------------------------------------------- the next three rungs (#271) */

describe('the module list over L1-M3, L1-M4 and L1-M5', () => {
  it.each(['L1-M3', 'L1-M4', 'L1-M5'] as const)(
    'renders the ten authored sentences of %s as ten cards once the rungs before it are passed',
    async (moduleId) => {
      serveAuthoredHiEn();
      activateHiEn();
      passRungsBefore(moduleId);
      window.location.hash = `#/module/${moduleId}`;
      render(<App />);
      await screen.findByRole('main');
      const authored = module(moduleId);

      expect(await screen.findByText(authored.sentences[0]!.display)).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(authored.title);
      const cards = screen
        .getAllByRole('link')
        .filter((link) => link.getAttribute('href')?.startsWith('#/sentence/') === true);
      expect(cards).toHaveLength(10);
      expect(cards.map((card) => card.getAttribute('href'))).toEqual(
        authored.sentences.map((sentence) => `#/sentence/${sentence.id}`),
      );
    },
  );
});

describe('Sentence Detail over L1-M3, L1-M4 and L1-M5', () => {
  it.each([
    {
      sentenceId: 'L1-M3-S05',
      hero: "I don't want coffee",
      literal: 'मैं नहीं चाहता कॉफ़ी',
      word: "don't",
      cue: 'नहीं (do + not)',
      mistake: 'I not want coffee',
    },
    {
      sentenceId: 'L1-M4-S08',
      hero: 'Does he get up early?',
      literal: 'क्या वह उठता जल्दी?',
      word: 'does',
      cue: '(he / she का सवाल-सहारा) · करता / करती है',
      mistake: 'Does he gets up early?',
    },
    {
      sentenceId: 'L1-M5-S06',
      hero: "I didn't go to school yesterday",
      literal: 'मैं नहीं गया को स्कूल कल',
      word: "didn't",
      cue: 'नहीं (did + not)',
      mistake: "I didn't went to school yesterday",
    },
  ])(
    'shows $sentenceId — English hero, no gloss, the WORD-FOR-WORD plate, the helper as one row',
    async ({ sentenceId, hero, literal, word, cue, mistake }) => {
      serveAuthoredHiEn();
      activateHiEn();
      passRungsBefore(sentenceId.slice(0, 5));
      window.location.hash = `#/sentence/${sentenceId}`;
      render(<App />);
      await screen.findByRole('main');

      const heading = await screen.findByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent(hero);
      expect(heading).toHaveAttribute('lang', 'en');
      expect(document.documentElement.lang).toBe('hi');
      // #268 still holds past M2: no gloss paragraph, and the literal plate is there.
      expect(section('gloss').querySelector('p[lang]')).toBeNull();
      expect(within(section('gloss')).getByText('WORD-FOR-WORD')).toBeInTheDocument();
      expect(within(section('gloss')).getByText(literal)).toBeInTheDocument();
      // The contraction is ONE word row with its Hindi cue (the briefs' course-wide policy).
      const words = section('words');
      expect(within(words).getByText(word)).toBeInTheDocument();
      expect(within(words).getByText(cue)).toBeInTheDocument();
      expect(within(section('mistake')).getByText(mistake)).toBeInTheDocument();
    },
  );
});

describe('the Why panel over the M3–M5 comprehension items', () => {
  it("answers `Do you want the book?` with five rows — `do` the helper, `the` the article, `book` on M1's `books` row", async () => {
    await renderPanel('L1-M3-C08', 'Do you want the book?');
    fireEvent.click(screen.getByRole('button', { name: 'क्यों?' }));

    const theRow = await screen.findByText('वह / वही (जो पता है)');
    const rows = within(theRow.closest('ul')!).getAllByRole('listitem');
    expect(rows.map((row) => row.textContent)).toEqual([
      expect.stringContaining('do'),
      expect.stringContaining('you'),
      expect.stringContaining('want'),
      expect.stringContaining('the'),
      expect.stringContaining('books'),
    ]);
    // `do` opens the note that defines BOTH jobs; `the` the article law; `book` the M1 row.
    expect(within(rows[0]!).getByText(/एक शब्द, दो काम/)).toBeInTheDocument();
    expect(within(rows[3]!).getByText(/हिंदी में ऐसा कोई शब्द नहीं/)).toBeInTheDocument();
    expect(within(rows[4]!).getByText('किताबें')).toBeInTheDocument();
  });

  it('answers `He has two brothers` with `has` on the possession-only `have` row', async () => {
    await renderPanel('L1-M4-C06', 'He has two brothers');
    fireEvent.click(screen.getByRole('button', { name: 'क्यों?' }));

    const haveRow = await screen.findByText('के पास होना · (मेरे) हैं');
    const rows = within(haveRow.closest('ul')!).getAllByRole('listitem');
    expect(rows.map((row) => row.textContent)).toEqual([
      expect.stringContaining('he'),
      expect.stringContaining('have'),
      expect.stringContaining('two'),
      expect.stringContaining('brothers'),
    ]);
    expect(within(rows[1]!).getByText(/I am having two brothers नहीं/)).toBeInTheDocument();
  });

  it("answers `I was at home yesterday` with `was` on M1's one `be` row, as M5 extended it", async () => {
    await renderPanel('L1-M5-C08', 'I was at home yesterday');
    fireEvent.click(screen.getByRole('button', { name: 'क्यों?' }));

    const beRow = await screen.findByText('हूँ · है · हैं');
    const rows = within(beRow.closest('ul')!).getAllByRole('listitem');
    expect(rows.map((row) => row.textContent)).toEqual([
      expect.stringContaining('I'),
      expect.stringContaining('is'),
      expect.stringContaining('at'),
      expect.stringContaining('home'),
      expect.stringContaining('Yesterday'),
    ]);
    // The note M5 wrote into M1's file — true of all five shapes — and M4's `at` in its place seat.
    expect(within(rows[1]!).getByText(/बँटवारा वचन से, लिंग से नहीं/)).toBeInTheDocument();
    expect(within(rows[2]!).getByText(/at home = घर पर/)).toBeInTheDocument();
  });
});

/* ------------------------------------------------------- the last five rungs (#272) */

describe('the module list over L1-M6 … L1-M10', () => {
  it.each(['L1-M6', 'L1-M7', 'L1-M8', 'L1-M9', 'L1-M10'] as const)(
    'renders the ten authored sentences of %s as ten cards once the rungs before it are passed',
    async (moduleId) => {
      serveAuthoredHiEn();
      activateHiEn();
      passRungsBefore(moduleId);
      window.location.hash = `#/module/${moduleId}`;
      render(<App />);
      await screen.findByRole('main');
      const authored = module(moduleId);

      // M10's items are turns — 2–3 sentences in one display — and each renders whole in one card.
      expect(await screen.findByText(authored.sentences[0]!.display)).toBeInTheDocument();
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(authored.title);
      const cards = screen
        .getAllByRole('link')
        .filter((link) => link.getAttribute('href')?.startsWith('#/sentence/') === true);
      expect(cards).toHaveLength(10);
      expect(cards.map((card) => card.getAttribute('href'))).toEqual(
        authored.sentences.map((sentence) => `#/sentence/${sentence.id}`),
      );
      for (const sentence of authored.sentences) {
        expect(screen.getByText(sentence.display)).toBeInTheDocument();
      }
    },
  );
});

describe('Sentence Detail over L1-M6 … L1-M10', () => {
  it.each([
    {
      moduleId: 'L1-M6',
      sentenceId: 'L1-M6-S01',
      hero: 'I will go to Delhi tomorrow',
      literal: 'मैं जाऊँगा को दिल्ली कल',
      word: 'will',
      cue: '-ऊँगा · -एगा · -एँगे (आने वाले कल का सहारा)',
      mistake: 'I will to go to Delhi tomorrow',
    },
    {
      moduleId: 'L1-M7',
      sentenceId: 'L1-M7-S09',
      hero: 'There is a book on the table',
      literal: 'वहाँ-है एक किताब पर वह मेज़',
      word: 'There is',
      cue: '… है (किसी जगह पर कुछ होना)',
      mistake: 'On the table is a book',
    },
    {
      moduleId: 'L1-M8',
      sentenceId: 'L1-M8-S05',
      hero: 'Can I have two bananas, please?',
      literal: 'क्या-मुझे-मिलेंगे दो केले, प्लीज़?',
      word: 'Can I have',
      cue: 'क्या मुझे … मिलेगा · … दीजिए (माँगने का साँचा)',
      mistake: 'Give me two bananas',
    },
    {
      moduleId: 'L1-M9',
      sentenceId: 'L1-M9-S01',
      hero: "I don't want coffee because I'm tired",
      literal: 'मैं नहीं चाहता कॉफ़ी क्योंकि मैं-हूँ थका',
      word: 'because',
      cue: 'क्योंकि',
      mistake: "Because I'm tired, so I don't want coffee",
    },
    {
      // A turn: two sentences in one hero, one literal for both, the he/she plate.
      moduleId: 'L1-M10',
      sentenceId: 'L1-M10-S05',
      hero: 'My sister is a teacher. She works in Delhi.',
      literal: 'मेरी बहन है एक शिक्षिका. वह काम-करती-है में दिल्ली.',
      word: 'sister',
      cue: 'बहन',
      mistake: 'My sister is a teacher. He works in Delhi.',
    },
  ])(
    'shows $sentenceId — English hero, no gloss, the WORD-FOR-WORD plate, the whole-surface row',
    async ({ moduleId, sentenceId, hero, literal, word, cue, mistake }) => {
      serveAuthoredHiEn();
      activateHiEn();
      passRungsBefore(moduleId);
      window.location.hash = `#/sentence/${sentenceId}`;
      render(<App />);
      await screen.findByRole('main');

      const heading = await screen.findByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent(hero);
      expect(heading).toHaveAttribute('lang', 'en');
      expect(document.documentElement.lang).toBe('hi');
      expect(section('gloss').querySelector('p[lang]')).toBeNull();
      expect(within(section('gloss')).getByText('WORD-FOR-WORD')).toBeInTheDocument();
      expect(within(section('gloss')).getByText(literal)).toBeInTheDocument();
      const words = section('words');
      expect(within(words).getByText(word)).toBeInTheDocument();
      expect(within(words).getByText(cue)).toBeInTheDocument();
      expect(within(section('mistake')).getByText(mistake)).toBeInTheDocument();
    },
  );
});

describe('the Why panel over the M6–M10 comprehension items', () => {
  it("answers `I will go to Mumbai tomorrow` with `I` then `will` — no `I'll` row swallows the pair", async () => {
    await renderPanel('L1-M6-C01', 'I will go to Mumbai tomorrow');
    fireEvent.click(screen.getByRole('button', { name: 'क्यों?' }));

    const tomorrowRow = await screen.findByText('कल (आने वाला)');
    const rows = within(tomorrowRow.closest('ul')!).getAllByRole('listitem');
    expect(rows.map((row) => row.textContent)).toEqual([
      expect.stringContaining('I'),
      expect.stringContaining('will'),
      expect.stringContaining('go'),
      expect.stringContaining('to'),
      expect.stringContaining('Mumbai'),
      expect.stringContaining('tomorrow'),
    ]);
    // The auxiliary's own note — one form for every subject — and M3's `to` in its direction seat.
    expect(within(rows[1]!).getByText(/एक ही रूप सबके लिए/)).toBeInTheDocument();
    expect(within(rows[3]!).getByText(/जगह से पहले यह दिशा का शब्द है/)).toBeInTheDocument();
  });

  it("answers `There are two books on the table` with the one `There is` row, never M1's `be`", async () => {
    await renderPanel('L1-M7-C06', 'There are two books on the table');
    fireEvent.click(screen.getByRole('button', { name: 'क्यों?' }));

    const thereRow = await screen.findByText('… है (किसी जगह पर कुछ होना)');
    const rows = within(thereRow.closest('ul')!).getAllByRole('listitem');
    expect(rows.map((row) => row.textContent)).toEqual([
      expect.stringContaining('There is'),
      expect.stringContaining('two'),
      expect.stringContaining('books'),
      expect.stringContaining('on'),
      expect.stringContaining('the'),
      expect.stringContaining('table'),
    ]);
    expect(within(rows[0]!).getByText(/बस सीट भरता है/)).toBeInTheDocument();
  });

  it("answers `Can I have a kilo of sugar?` with the formula whole and `of` on M8's row", async () => {
    await renderPanel('L1-M8-C04', 'Can I have a kilo of sugar?');
    fireEvent.click(screen.getByRole('button', { name: 'क्यों?' }));

    const formulaRow = await screen.findByText('क्या मुझे … मिलेगा · … दीजिए (माँगने का साँचा)');
    const rows = within(formulaRow.closest('ul')!).getAllByRole('listitem');
    expect(rows.map((row) => row.textContent)).toEqual([
      expect.stringContaining('Can I have'),
      expect.stringContaining('a'),
      expect.stringContaining('kilo'),
      expect.stringContaining('of'),
      expect.stringContaining('sugar'),
    ]);
    // The request note says in words that its `have` is NOT M4's possession row.
    expect(within(rows[0]!).getByText(/के पास होना नहीं है/)).toBeInTheDocument();
    expect(within(rows[3]!).getByText(/मात्रा और चीज़ के बीच का जोड़/)).toBeInTheDocument();
  });

  it('answers `Do you think that the tea is good?` with `that` on the one M9 row — both jobs in one note', async () => {
    await renderPanel('L1-M9-C07', 'Do you think that the tea is good?');
    fireEvent.click(screen.getByRole('button', { name: 'क्यों?' }));

    const thatRow = await screen.findByText('कि (जोड़) · वह (दूर की चीज़)');
    const rows = within(thatRow.closest('ul')!).getAllByRole('listitem');
    expect(rows).toHaveLength(8);
    expect(rows[3]).toHaveTextContent('that');
    expect(within(rows[3]!).getByText(/एक शब्द, दो काम/)).toBeInTheDocument();
  });

  it('answers a turn — `Okay, thank you. See you tomorrow.` — token by token across its sentence boundary', async () => {
    await renderPanel('L1-M10-C08', 'Okay, thank you. See you tomorrow.');
    fireEvent.click(screen.getByRole('button', { name: 'क्यों?' }));

    const seeYouRow = await screen.findByText('फिर मिलते हैं');
    const rows = within(seeYouRow.closest('ul')!).getAllByRole('listitem');
    expect(rows.map((row) => row.textContent)).toEqual([
      expect.stringContaining('Okay'),
      expect.stringContaining('thank you'),
      expect.stringContaining('See you'),
      expect.stringContaining('tomorrow'),
    ]);
    // `thank you` is M2's whole surface, `See you` M10's — M5's `see` (देखना) is never opened.
    expect(within(rows[1]!).getByText('धन्यवाद')).toBeInTheDocument();
    expect(
      within(rows[2]!).getByText(/देखना वाला see यहाँ अपने मतलब में नहीं/),
    ).toBeInTheDocument();
  });
});
