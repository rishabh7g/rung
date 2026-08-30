/**
 * Sentence Detail (#89) — the six promises the screen makes, one describe each:
 *
 *   • the ten sections render in the frozen [D10] order, and in no other,
 *   • a section with nothing to say renders NOTHING — no heading, no empty plate,
 *   • the tag chips carry their name as text, never colour alone,
 *   • prev/next moves within the module, stops before its first sentence, and hands over to
 *     Practice after its last one rather than dead-ending (#367),
 *   • back lands on the module the learner came from, at the offset and with the cards they left,
 *   • `deconstruction.rules` resolve through the module's `rules`, and an index it does not have
 *     renders nothing rather than throwing.
 *
 * Plus the colour law, which is a stylesheet fact and is read off the stylesheet: **amber is the
 * trap and nothing else** (design/tokens.md §7 rule 2), and the mistake plate is neutral.
 *
 * Everything renders the real `<App />` over a mocked `fetch`, the way every screen test here
 * does: the route is guarded and reachable as a deep link, so a guard that works in a hand-wired
 * router while the app's table says something else is exactly the bug worth catching. The strings
 * fixture is built FROM the canonical key list, so a label reads `hi-mr sentence.pocketIt` — an
 * assertion against the prototype's English would pass on a hardcoded shell string, which is the
 * one thing the strings contract exists to prevent.
 */
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import App from '../App.tsx';
import { resetContentCache } from '../course/content.ts';
import { resetManifestCache } from '../course/manifest.ts';
import { interpolate, resetStringsCache } from '../course/strings.ts';
import { useAppStore } from '../state/store.ts';
import { DEV_MANIFEST, mockContentFetch } from '../test/courseManifest.ts';
import type { ModuleContent } from '../course/types.ts';
import { moduleFixture, romanizedModuleFixture } from '../test/courseContent.ts';
import { stringValue } from '../test/courseStrings.ts';
import { moduleViewKey, writeModuleView } from './module/moduleView.ts';
import detailCss from './SentenceScreen.module.css?raw';

const COURSE = 'hi-mr';
const MODULE = 'L1-M1';
/** The fixture's fully enriched sentence — literal, trap, sound, variations, mistake, usage, mnemonic. */
const FULL = `${MODULE}-S01`;
/** Its sparse twin: a gloss, words and one rule, and nothing else. */
const SPARSE = `${MODULE}-S02`;

/**
 * The fixture module, read the way the app reads it. The fixtures are JSON-shaped literals (a
 * `tag` is a `string` there and a `Tag` here), so typing one is the cast the loader makes at
 * runtime once its tripwires have passed (`src/course/content.ts`).
 */
function fixture(moduleId = MODULE): ModuleContent {
  return moduleFixture(moduleId) as unknown as ModuleContent;
}

/** What the fixture bundle says for a key — the self-identifying value an assertion reads. */
function strings(key: string, courseId = COURSE): string {
  return stringValue(courseId, key);
}

/** Renders the app at a hash and waits for the frame; the screen decides what lands in it. */
async function renderAt(hash: string, content: Parameters<typeof mockContentFetch>[2] = {}) {
  window.location.hash = hash;
  mockContentFetch(DEV_MANIFEST, undefined, content);
  render(<App />);
  await screen.findByRole('main');
}

/** Opens a sentence and waits for its hero. */
async function renderSentence(
  sentenceId = FULL,
  content: Parameters<typeof mockContentFetch>[2] = {},
) {
  await renderAt(`#/sentence/${sentenceId}`, content);
  await screen.findByRole('heading', { level: 2 });
}

/** The sections on screen, in DOM order — the frozen [D10] sequence, as the browser sees it. */
function sections(): string[] {
  return [...screen.getByRole('main').querySelectorAll('[data-section]')].map(
    (section) => section.getAttribute('data-section') ?? '',
  );
}

function section(name: string): HTMLElement {
  const found = screen.getByRole('main').querySelector(`[data-section="${name}"]`);
  if (found === null) throw new Error(`no ${name} section on screen`);
  return found as HTMLElement;
}

function pager(name: string): HTMLElement {
  return screen.getByRole('button', { name: strings(`sentence.${name}`) });
}

/** The fixture module with one sentence rewritten — the shape `mockContentFetch` answers with. */
function moduleWithSentence(sentenceId: string, patch: Record<string, unknown>) {
  const module = moduleFixture(MODULE);

  return {
    ...module,
    sentences: module.sentences.map((sentence) =>
      sentence.id === sentenceId ? { ...sentence, ...patch } : sentence,
    ),
  };
}

/** The stylesheet's rules as `[selector, declarations]`, comments stripped — see the colour law. */
function rules(): [string, string][] {
  const source = detailCss.replace(/\/\*[\s\S]*?\*\//g, '');

  return [...source.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((rule) => [
    (rule[1] ?? '').trim(),
    rule[2] ?? '',
  ]);
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

/* ------------------------------------------------------------- the frozen order */

describe('the section order [D10]', () => {
  it('renders all ten sections, in the one order, ending on the mnemonic', async () => {
    await renderSentence(FULL);

    expect(sections()).toEqual([
      'hero',
      'gloss',
      'words',
      'rules',
      'trap',
      'sound',
      'variations',
      'mistake',
      'usage',
      'mnemonic',
    ]);
  });

  it('puts the sentence, its cue and its gloss at the top, and "pocket it" at the bottom', async () => {
    await renderSentence(FULL);

    const sentence = fixture().sentences[0]!;
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent(sentence.display);
    expect(within(section('hero')).getByText(sentence.cue)).toBeInTheDocument();
    expect(within(section('gloss')).getByText(sentence.glossEn!)).toBeInTheDocument();
    expect(within(section('gloss')).getByText(sentence.literal!)).toBeInTheDocument();

    // The mnemonic's label is the course's, not the prototype's English (PRD §8 F3).
    const mnemonic = within(section('mnemonic'));
    expect(mnemonic.getByText(strings('sentence.pocketIt'))).toBeInTheDocument();
    expect(mnemonic.getByText(sentence.mnemonic!)).toBeInTheDocument();
  });

  it('draws each word as a row: the word, its cue, its tag, its note and its forms', async () => {
    await renderSentence(FULL);

    const word = fixture().sentences[0]!.deconstruction.words[0]!;
    const row = within(section('words')).getAllByRole('listitem')[0]!;

    expect(within(row).getByText(word.display)).toBeInTheDocument();
    expect(within(row).getByText(word.cue)).toBeInTheDocument();
    expect(within(row).getByText(word.note!)).toBeInTheDocument();
    // The paradigm is its own element inside the line, because it is L2 and the "forms:" label
    // is not (#186) — so the assertion reads the surfaces, not the whole line's text.
    expect(within(row).getByText(word.forms.join(' · '))).toBeInTheDocument();
    expect(within(row).getByText(/forms:/u)).toBeInTheDocument();
  });

  it('fills the changed part of a variation, and only it', async () => {
    await renderSentence(FULL);

    // "Me llamo Rohan" → "Me llamo Priya": the name is the swap, the frame is not.
    const tokens = [...section('variations').querySelectorAll('span')].map((token) => ({
      text: token.textContent,
      filled: token.className !== '',
    }));

    expect(tokens).toEqual([
      { text: 'Me', filled: false },
      { text: 'llamo', filled: false },
      { text: 'Priya', filled: true },
    ]);
  });

  it('shows the quiet script line in a romanized course', async () => {
    act(() => {
      useAppStore.getState().setActiveCourse('en-ar');
    });
    const romanized = romanizedModuleFixture(MODULE);
    await renderSentence(FULL, { module: romanized });

    expect(within(section('hero')).getByText(romanized.sentences[0]!.script!)).toBeInTheDocument();
  });

  it('has no second script to show in a native course — the hero is the line and its cue', async () => {
    await renderSentence(FULL);

    const sentence = fixture().sentences[0]!;
    expect(section('hero').textContent).toBe(`${sentence.display}${sentence.cue}`);
  });
});

/* ------------------------------------------------------------ empty sections */

describe('a section with nothing in it', () => {
  it('renders nothing at all — no heading, no empty plate', async () => {
    await renderSentence(SPARSE);

    // The fixture's second sentence has a gloss, words and one rule, and no enrichment past
    // them: M4+ modules may ship exactly like this, and the fixture courses are thinner still.
    expect(sections()).toEqual(['hero', 'gloss', 'words', 'rules']);

    for (const label of [
      'SOUND NOTE',
      'SAME PATTERN, SWAPPED PARTS',
      'COMMON MISTAKE',
      'WHEN TO USE IT',
    ]) {
      expect(screen.queryByText(label)).not.toBeInTheDocument();
    }
    expect(screen.queryByText(strings('sentence.trapHead'))).not.toBeInTheDocument();
    expect(screen.queryByText(strings('sentence.pocketIt'))).not.toBeInTheDocument();
  });

  it('keeps the usage section away when only its register is authored', async () => {
    await renderSentence(SPARSE);

    // The sparse fixture carries `register: 'informal'` and no `usage`: the register is an
    // ornament on that section, never a reason for it to exist.
    expect(screen.queryByText('informal')).not.toBeInTheDocument();
  });
});

/* ------------------------------------------------------------------- the gloss */

describe('the gloss, where the sentence has none (#268)', () => {
  /**
   * `glossEn` is optional in the schema: the build requires it wherever the L2 is not English,
   * and a course whose L2 IS English authors none, because it would print the hero twice. The
   * screen knows nothing of that rule — it renders what is present. An `undefined` in the patch
   * is a key the JSON answer simply does not carry.
   */
  it('renders no English paragraph, and still draws the word-for-word plate', async () => {
    await renderSentence(FULL, { module: moduleWithSentence(FULL, { glossEn: undefined }) });

    const sentence = fixture().sentences[0]!;
    const gloss = section('gloss');
    expect(gloss.querySelector('[lang]')).toBeNull();
    expect(screen.queryByText(sentence.glossEn!)).not.toBeInTheDocument();
    expect(gloss.children).toHaveLength(1);
    expect(within(gloss).getByText('WORD-FOR-WORD')).toBeInTheDocument();
    expect(within(gloss).getByText(sentence.literal!)).toBeInTheDocument();
  });

  it('drops the whole section when neither the gloss nor the literal is authored', async () => {
    await renderSentence(FULL, {
      module: moduleWithSentence(FULL, { glossEn: undefined, literal: undefined }),
    });

    expect(sections()).toEqual([
      'hero',
      'words',
      'rules',
      'trap',
      'sound',
      'variations',
      'mistake',
      'usage',
      'mnemonic',
    ]);
    expect(screen.queryByText('WORD-FOR-WORD')).not.toBeInTheDocument();
  });

  it('still marks the gloss English where a course authors one', async () => {
    await renderSentence(FULL);

    const paragraph = section('gloss').querySelector('p[lang]');
    expect(paragraph).toHaveAttribute('lang', 'en');
    expect(paragraph).toHaveTextContent(fixture().sentences[0]!.glossEn!);
  });
});

/* ------------------------------------------------------------------ tag chips */

describe('a tag chip', () => {
  it('always carries its name as text — colour is the emphasis, never the message', async () => {
    await renderSentence(FULL);

    const words = within(section('words'));
    const rows = words.getAllByRole('listitem');

    // The fixture's two words are `delta` and `free`; its rules are `free` and `delta`.
    expect(within(rows[0]!).getByText('delta')).toBeInTheDocument();
    expect(within(rows[1]!).getByText('free')).toBeInTheDocument();
    expect(within(section('rules')).getAllByText(/^(free|delta)$/)).toHaveLength(2);
  });

  it('names an interference tag in words, not in amber alone', async () => {
    await renderSentence(
      FULL,
      // hi-mr's real M1 opens on an interference word (माझं); the fixture is Latin, so the tag
      // is moved onto its first word to assert the chip rather than the content.
      {
        module: moduleWithSentence(FULL, {
          deconstruction: {
            ...fixture().sentences[0]!.deconstruction,
            words: fixture().sentences[0]!.deconstruction.words.map((word, index) =>
              index === 0 ? { ...word, tag: 'interference' } : word,
            ),
          },
        }),
      },
    );

    expect(within(section('words')).getByText('interference')).toBeInTheDocument();
  });
});

/* -------------------------------------------------------------------- the pager */

describe('prev and next', () => {
  it('moves to the next sentence in the module, and back again', async () => {
    await renderSentence(FULL);
    expect(screen.getByText('1 / 2')).toBeInTheDocument();

    fireEvent.click(pager('next'));

    await screen.findByText(fixture().sentences[1]!.display);
    expect(window.location.hash).toBe(`#/sentence/${SPARSE}`);
    expect(screen.getByText('2 / 2')).toBeInTheDocument();

    fireEvent.click(pager('prev'));

    await screen.findByText(fixture().sentences[0]!.display);
    expect(window.location.hash).toBe(`#/sentence/${FULL}`);
  });

  /**
   * The two ends of the module are NOT symmetric, and #367 is that asymmetry made honest.
   *
   * Before the first sentence there is genuinely nothing, so Prev stays disabled — that half of
   * this case is unchanged and must stay. After the last one there IS somewhere to go, and the
   * pager used to grey Next out and say nothing about it; now the trailing slot is a hand-over.
   */
  it('stops before the first sentence — there is no sentence 0', async () => {
    await renderSentence(FULL);

    expect(pager('prev')).toBeDisabled();
    expect(pager('next')).toBeEnabled();
  });

  it('hands over to Practice on the last sentence, instead of a dead Next (#367)', async () => {
    await renderSentence(FULL);
    fireEvent.click(pager('next'));
    await screen.findByText(fixture().sentences[1]!.display);

    // Prev is live now — the learner came from somewhere — and the trailing slot is no longer a
    // button at all: it is a link, which is what a real destination change is.
    expect(pager('prev')).toBeEnabled();
    expect(screen.queryByRole('button', { name: strings('sentence.next') })).toBeNull();
    const handOver = screen.getByRole('link', { name: strings('sentence.done') });

    fireEvent.click(handOver);

    // Practice, not back to the module list: the list's own closing move is a Practice link, so
    // routing through it would be one extra tap to the same place.
    await waitFor(() => {
      expect(window.location.hash).toBe('#/practice');
    });
  });

  it('keeps a working Next on every sentence that has one after it', async () => {
    await renderSentence(FULL);

    // The first of two: an enabled `sentence.next` button that advances, and no hand-over yet.
    expect(screen.queryByRole('link', { name: strings('sentence.done') })).toBeNull();
    fireEvent.click(pager('next'));

    await screen.findByText(fixture().sentences[1]!.display);
    expect(window.location.hash).toBe(`#/sentence/${SPARSE}`);
  });

  it('opens every sentence at its own top, however far down the last one was read', async () => {
    await renderSentence(FULL);
    const main = screen.getByRole('main');
    main.scrollTop = 320;

    fireEvent.click(pager('next'));
    await screen.findByText(fixture().sentences[1]!.display);

    expect(main.scrollTop).toBe(0);
  });
});

/* --------------------------------------------------------------------- the back */

describe('back', () => {
  it('returns to the module, at the offset the learner left', async () => {
    // What the module list wrote on the way out — since #217 that is the offset and nothing else:
    // its cards are links into this screen, so there is no open card to come back to (#88).
    writeModuleView(moduleViewKey(COURSE, MODULE), { scrollTop: 240 });

    await renderSentence(FULL);
    fireEvent.click(screen.getByRole('button', { name: 'Back to the module' }));

    // The module list's own kicker — Detail's reads `M1 · SENTENCE 01`, so this is the landmark
    // that says which screen we came back to (the helper line it used to be went on #229).
    await screen.findByText('M1 · MODULE');
    expect(window.location.hash).toBe(`#/module/${MODULE}`);
    expect(screen.getByRole('main').scrollTop).toBe(240);
    expect(screen.getByRole('main').querySelectorAll('[aria-expanded]')).toHaveLength(0);
  });

  it('sends a locked rung’s sentence back to the Ladder instead of reading it out', async () => {
    await renderAt('#/sentence/L1-M2-S01');

    expect(
      await screen.findByText(interpolate(strings('rungCard.currentRung'), { rung: 'M1' })),
    ).toBeInTheDocument();
    expect(window.location.hash).toBe('#/');
  });

  it('sends an id this module does not teach back to the module', async () => {
    await renderAt(`#/sentence/${MODULE}-S09`);

    expect(await screen.findByText('M1 · MODULE')).toBeInTheDocument();
    expect(window.location.hash).toBe(`#/module/${MODULE}`);
  });
});

/* ---------------------------------------------------------------------- the rules */

describe('the rules', () => {
  it('resolves this sentence’s indices through the module’s ordered rules', async () => {
    await renderSentence(FULL);

    // The fixture's first sentence points at rules [0, 1] — both of the module's, in order.
    const listed = within(section('rules'))
      .getAllByRole('listitem')
      .map((rule) => rule.textContent);
    const authored = fixture().rules;

    expect(listed).toEqual(authored.map((rule) => `${rule.tag}${rule.text}`));
  });

  it('renders nothing for an index the module has not got, and still draws the rest', async () => {
    await renderSentence(FULL, {
      module: moduleWithSentence(FULL, {
        deconstruction: {
          ...fixture().sentences[0]!.deconstruction,
          // 7 is past the end of a two-rule module: a build never ships this
          // (`tools/validate.ts` checks the ranges), and a learner never sees a crash if one did.
          rules: [1, 7],
        },
      }),
    });

    expect(within(section('rules')).getAllByRole('listitem')).toHaveLength(1);
    expect(within(section('rules')).getByText(fixture().rules[1]!.text)).toBeInTheDocument();
  });

  it('drops the whole section when not one index resolves', async () => {
    await renderSentence(FULL, {
      module: moduleWithSentence(FULL, {
        deconstruction: {
          ...fixture().sentences[0]!.deconstruction,
          rules: [11, 12],
        },
      }),
    });

    await waitFor(() => {
      expect(sections()).not.toContain('rules');
    });
    expect(screen.queryByText('RULES USED')).not.toBeInTheDocument();
  });
});

/* ---------------------------------------------------------------- the colour law */

describe('amber', () => {
  it('appears in the trap callout and nowhere else on the screen', async () => {
    const amber = rules().filter(([, declarations]) => declarations.includes('--interference-'));

    expect(amber.length).toBeGreaterThan(0);
    for (const [selector] of amber) {
      expect(selector, `${selector} carries an --interference-* token`).toMatch(/^\.trap/);
    }
  });

  it('leaves the mistake plate neutral — struck, never warned', async () => {
    const plate = rules().filter(([selector]) => selector.startsWith('.mistake'));
    const declarations = plate.map(([, body]) => body).join('');

    expect(plate.length).toBeGreaterThan(0);
    expect(declarations).toContain('--mistake-bg');
    expect(declarations).toContain('--mistake-border');
    expect(declarations).toContain('line-through');
    // Never amber, and never the self-marks' red either (design/tokens.md §1, §7 rule 2).
    expect(declarations).not.toMatch(/--interference-|--mark-miss-bg/);
  });

  it('is on screen when the sentence has a trap, and gone when it has not', async () => {
    await renderSentence(FULL);

    const trap = within(section('trap'));
    expect(trap.getByText(strings('sentence.trapHead'))).toBeInTheDocument();
    expect(trap.getByText(fixture().sentences[0]!.trap!)).toBeInTheDocument();
  });
});
