/**
 * The "why" panel (#94) — the six promises it makes on a revealed card:
 *
 *   • it is a TOGGLE: collapsed until asked, and it does not even fetch the index before then,
 *   • it expands into one row per resolvable span, greedily — `Me llamo` is one row, not two,
 *   • a span that does not resolve renders NOTHING: no error, no placeholder, no gap (#61),
 *   • a word taught in another module is fetched and rendered (the index is cumulative), and a
 *     module that will not load costs its own rows and nothing else,
 *   • "open full" leaves the session for `/sentence/:id`,
 *   • it fills the slot `RevealCard` left for it (#93), inside the answer plate.
 *
 * Everything renders over a mocked `fetch` under the real `CourseProvider`, so the panel reads the
 * active course the way it will in a session. Strings come from the fixture bundle built FROM the
 * canonical key list, so a label reads `hi-mr why.show`: an assertion against the prototype's
 * "why" would pass on a hardcoded shell string, which is the one thing the strings contract exists
 * to prevent.
 */
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { HashRouter, Route, Routes, useParams } from 'react-router-dom';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { resetContentCache } from '../course/content.ts';
import { CourseProvider } from '../course/CourseProvider.tsx';
import { resetManifestCache } from '../course/manifest.ts';
import { resetStringsCache } from '../course/strings.ts';
import { useAppStore } from '../state/store.ts';
import { indexFixture, moduleFixture } from '../test/courseContent.ts';
import { DEV_MANIFEST, mockContentFetch, type ContentOverrides } from '../test/courseManifest.ts';
import { stringValue } from '../test/courseStrings.ts';
import { RevealCard } from './RevealCard.tsx';
import { WhyPanel } from './WhyPanel.tsx';
import panelCss from './WhyPanel.module.css?raw';

/** The first course in the manifest — what `resolveActiveCourse` boots with. */
const COURSE = 'hi-mr';
const MODULE = 'L1-M1';
/** `Me llamo Rohan`: the multi-word surface the whole greedy rule exists for. */
const SENTENCE = moduleFixture(MODULE).sentences[0]!;

/** What the fixture bundle says for a key — the self-identifying value an assertion reads. */
function copy(key: string): string {
  return stringValue(COURSE, key);
}

let fetchMock: ReturnType<typeof mockContentFetch>;

/** Every URL the app has asked for, in order — how "not fetched until asked" is asserted. */
function fetched(): string[] {
  return fetchMock.mock.calls.map(([input]) => String(input));
}

interface PanelOptions {
  display?: string;
  sentenceId?: string;
  openFull?: boolean;
  content?: ContentOverrides;
  /** A URL fragment whose fetch answers 404 — one broken file, everything else intact. */
  broken?: string;
}

/** Where "open full" lands, so the assertion is the destination rather than a href string. */
function SentenceStub() {
  const { id } = useParams();
  return <p>detail of {id}</p>;
}

/**
 * Renders the panel at `/` with a real router under it, and waits for boot. The panel is rendered
 * directly rather than through `<App />` because no screen mounts a reveal card yet — the session
 * that will is #96 — and every promise here is the panel's own.
 */
async function renderPanel({
  display = SENTENCE.display,
  sentenceId = SENTENCE.id,
  openFull = false,
  content = {},
  broken,
}: PanelOptions = {}) {
  fetchMock = mockContentFetch(DEV_MANIFEST, undefined, content);

  if (broken !== undefined) {
    const routed = fetchMock;
    fetchMock = vi.fn((input: RequestInfo | URL) =>
      String(input).includes(broken)
        ? Promise.resolve(new Response('{}', { status: 404 }))
        : routed(input),
    );
    vi.stubGlobal('fetch', fetchMock);
  }

  const view = render(
    <CourseProvider>
      <HashRouter>
        <Routes>
          <Route
            path="/"
            element={<WhyPanel sentenceId={sentenceId} display={display} openFull={openFull} />}
          />
          <Route path="/sentence/:id" element={<SentenceStub />} />
        </Routes>
      </HashRouter>
    </CourseProvider>,
  );

  await screen.findByRole('button', { name: copy('why.show') });
  return view;
}

function toggle(): void {
  fireEvent.click(screen.getByRole('button', { name: /why\.(show|hide)$/ }));
}

/** The expansion's list — present whenever the panel is open, whatever resolved into it. */
function rows(): HTMLElement {
  return screen.getByRole('list');
}

/** Waits for the index round trip and the module loads it triggers to settle. */
async function settled(): Promise<void> {
  await waitFor(() => {
    expect(fetched().some((url) => url.includes(`index/${MODULE}.json`))).toBe(true);
  });
  await act(async () => {
    await Promise.resolve();
  });
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
  vi.restoreAllMocks();
  window.location.hash = '';
});

/* ------------------------------------------------------------------ the toggle */

describe('the toggle', () => {
  it('is closed until asked — depth on demand, in the course’s own word', async () => {
    await renderPanel();

    const button = screen.getByRole('button', { name: copy('why.show') });
    expect(button).toHaveAttribute('aria-expanded', 'false');
    expect(screen.queryByRole('list')).toBeNull();
  });

  it('does not fetch the word index until the learner asks why', async () => {
    await renderPanel();

    expect(fetched().some((url) => url.includes('/index/'))).toBe(false);

    toggle();
    await settled();

    expect(fetched().filter((url) => url.includes(`index/${MODULE}.json`))).toHaveLength(1);
  });

  it('closes again, and says so both in its label and to a screen reader', async () => {
    await renderPanel();
    toggle();

    const open = screen.getByRole('button', { name: copy('why.hide') });
    expect(open).toHaveAttribute('aria-expanded', 'true');
    expect(open).toHaveAttribute('aria-controls', `why-panel-${SENTENCE.id}`);

    toggle();

    const closed = screen.getByRole('button', { name: copy('why.show') });
    expect(closed).toHaveAttribute('aria-expanded', 'false');
    expect(closed).not.toHaveAttribute('aria-controls');
    expect(screen.queryByRole('list')).toBeNull();
  });
});

/* -------------------------------------------------------------------- the rows */

describe('the rows', () => {
  it('renders one per resolvable span — word, cue, tag and note', async () => {
    await renderPanel();
    toggle();

    const first = await screen.findByText('Me llamo');
    const row = first.closest('li')!;

    expect(within(row).getByText('my name is')).toBeInTheDocument();
    // The shared chip (#89), not a second recipe: its label is the tag's own name.
    expect(within(row).getByText('delta')).toBeInTheDocument();
    expect(within(row).getByText('Reflexive: literally "I call myself".')).toBeInTheDocument();
  });

  /* The greedy rule, and the whole reason the index carries `maxSpan`. */
  it('takes `Me llamo` as ONE row, never as two unknown words', async () => {
    await renderPanel();
    toggle();
    await settled();

    const listed = within(rows()).getAllByRole('listitem');

    expect(listed).toHaveLength(2);
    expect(listed.map((row) => row.textContent)).toEqual([
      expect.stringContaining('Me llamo'),
      expect.stringContaining('Rohan'),
    ]);
    expect(screen.queryByText('llamo')).toBeNull();
  });

  /* #61: a proper noun the content carries and no word row teaches. */
  it('renders nothing at all for a span that does not resolve', async () => {
    await renderPanel({ display: 'Me llamo Priya' });
    toggle();
    await settled();

    expect(within(rows()).getAllByRole('listitem')).toHaveLength(1);
    expect(screen.queryByText(/Priya/)).toBeNull();
  });

  it('expands to an empty panel when nothing resolves — never an error, never a placeholder', async () => {
    // The fixture's own mistake line, minus the name it borrows: wrong L2 by design, so the
    // emitter never indexed a word of it (#75).
    await renderPanel({ display: 'Mi nombre es' });
    toggle();
    await settled();

    expect(rows()).toBeEmptyDOMElement();
    expect(screen.queryAllByRole('listitem')).toHaveLength(0);
    // Still a working toggle: the panel opened, it simply had nothing to say.
    expect(screen.getByRole('button', { name: copy('why.hide') })).toBeInTheDocument();
  });

  it('says nothing for an id that names no module, and does not go looking', async () => {
    await renderPanel({ sentenceId: 'S1' });
    toggle();

    expect(rows()).toBeEmptyDOMElement();
    expect(fetched().some((url) => url.includes('/index/'))).toBe(false);
  });
});

/* --------------------------------------------------------- across modules */

describe('a word taught in another module', () => {
  /** The cumulative index's everyday case: practising here, the word was taught back there. */
  const ELSEWHERE = 'L1-M0';
  const CROSS_MODULE = {
    ...indexFixture(COURSE, MODULE),
    surfaces: {
      'Me llamo': { moduleId: ELSEWHERE, sentenceId: `${ELSEWHERE}-S01`, wordIdx: 0 },
      Rohan: { moduleId: MODULE, sentenceId: `${MODULE}-S01`, wordIdx: 1 },
    },
  };

  it('is fetched from the module that teaches it, and rendered like any other', async () => {
    await renderPanel({ content: { index: CROSS_MODULE } });
    toggle();

    expect(await screen.findByText('Me llamo')).toBeInTheDocument();
    expect(fetched()).toContain(`/content/${COURSE}/modules/${ELSEWHERE}.json`);
    expect(within(rows()).getAllByRole('listitem')).toHaveLength(2);
  });

  it('costs only its own rows when that module will not load — the panel degrades, silently', async () => {
    await renderPanel({ content: { index: CROSS_MODULE }, broken: `modules/${ELSEWHERE}.json` });
    toggle();

    await waitFor(() => {
      expect(within(rows()).getAllByRole('listitem')).toHaveLength(1);
    });
    expect(screen.queryByText('Me llamo')).toBeNull();
  });
});

/* --------------------------------------------------------------- open full */

describe('open full', () => {
  it('is a Produce card’s control — absent unless the session offers it', async () => {
    await renderPanel();

    expect(screen.queryByRole('link', { name: copy('why.openFull') })).toBeNull();
  });

  it('leaves the session for the sentence in full', async () => {
    await renderPanel({ openFull: true });

    fireEvent.click(screen.getByRole('link', { name: copy('why.openFull') }));

    expect(await screen.findByText(`detail of ${SENTENCE.id}`)).toBeInTheDocument();
    expect(window.location.hash).toBe(`#/sentence/${SENTENCE.id}`);
  });
});

/* ---------------------------------------------------------------- the seam */

describe('the reveal card’s slot', () => {
  it('is where the panel lands: revealed answer, then the why, inside the plate', async () => {
    fetchMock = mockContentFetch(DEV_MANIFEST);

    render(
      <CourseProvider>
        <HashRouter>
          <RevealCard
            sentenceId={SENTENCE.id}
            cue={SENTENCE.cue}
            display={SENTENCE.display}
            mode="review"
            why={<WhyPanel sentenceId={SENTENCE.id} display={SENTENCE.display} />}
            onResult={vi.fn()}
          />
        </HashRouter>
      </CourseProvider>,
    );

    // The slot is empty until the answer is on screen: no "why" before the reveal.
    const reveal = await screen.findByRole('button', { name: copy('revealLabel') });
    expect(screen.queryByRole('button', { name: copy('why.show') })).toBeNull();

    fireEvent.click(reveal);
    fireEvent.click(screen.getByRole('button', { name: copy('why.show') }));

    const word = await screen.findByText('Me llamo');
    // In the plate with the answer, which is what "expands in place" means here.
    expect(word.closest('[id^="why-panel-"]')).toBeInTheDocument();
    expect(screen.getByText(SENTENCE.display)).toBeInTheDocument();
  });
});

/* Motion is a stylesheet fact, so it is read off the stylesheet (design/tokens.md §5). */
describe('the motion', () => {
  it('is the 250ms in-place expansion, and nothing else moves', () => {
    // Comments and at-rule blocks stripped, so the keyframes' steps and the reduced-motion
    // override do not read as rules of their own (the same scan `RevealCard.test.tsx` runs).
    const source = panelCss
      .replace(/\/\*[\s\S]*?\*\//g, '')
      .replace(/@(?:media|keyframes)[^{]*\{[\s\S]*?\n\}/g, '');
    const animated = [...source.matchAll(/animation:\s*([^;]+);/g)].map((match) => match[1]);

    expect(animated).toEqual(['expand-in var(--motion-expand) both']);
  });

  it('collapses under prefers-reduced-motion', () => {
    const reduced = /@media \(prefers-reduced-motion: reduce\) \{([\s\S]*)\n\}/.exec(panelCss)?.[1];

    expect(reduced).toBeDefined();
    expect(reduced).toContain('.rows');
    expect(reduced).toMatch(/animation:\s*none/);
  });
});
