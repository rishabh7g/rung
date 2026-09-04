/**
 * The "why" panel (#94; PRD §8 F4 "'Why' on every reveal via the course word index", PRD-design
 * §6.3, §7) — depth on demand, at the exact moment of curiosity.
 *
 * It fills the slot `RevealCard` left for it (#93): a ghost toggle under the revealed answer that
 * expands **in place** over `--motion-expand` (250ms, design/tokens.md §5) into one `WhyRow` per
 * resolvable span of the sentence, plus the "open full" link to Sentence Detail. Every revealed
 * surface gets the same component — Review, Produce, and Comprehension (#101) — because it is a
 * panel about a sentence, not about a phase.
 *
 * **Resolution is graceful, and that is the design.** The learner is mid-flow: an unresolvable
 * span renders NOTHING — no error, no placeholder, no gap. Content legitimately carries tokens no
 * word row teaches (proper nouns like `Priya`, #61) and a sentence whose every token misses simply
 * expands to nothing at all. The resolver is pure (`src/engine/wordIndex.ts`); this is the piece
 * that fetches.
 *
 * **Cross-module lookups are loaded, not skipped.** The index is CUMULATIVE — practising L1-M2, most
 * of a sentence's words were taught in L1-M1 — so a ref usually names a module other than the one on
 * screen, and dropping those rows would empty the panel exactly where it teaches most. So the panel
 * loads whichever modules its refs name, through `useModules` (#81, #96), which is the content
 * layer's many-files loader and shares this panel's failure policy: a module that will not load
 * degrades **silently**, because `useModule`'s error screen is the right answer for a screen whose
 * whole content is missing and the wrong one for an optional expansion mid-session. The session's
 * Review queue (#96) reads the same way, which is what moved that loader out of this file.
 *
 * **Which index it asks.** The module is read out of the sentence id (`moduleIdOf`, #89) rather
 * than passed in: a sentence's own module's cumulative index is by construction the smallest one
 * that teaches all of its words, and it is the file the session already loaded. An id that names
 * no module (a Produce card built from something else later) expands to nothing, the same as an
 * unresolvable sentence.
 */
import { useState, type ReactNode } from 'react';
import { useIndex, useModules } from '../course/content.ts';
import type { L2Written } from '../course/manifest.ts';
import { useStrings } from '../course/strings.ts';
import type { ModuleContent, Word } from '../course/types.ts';
import { resolveSentence, type WordRef } from '../engine/wordIndex.ts';
import { moduleIdOf } from '../screens/sentence/sentenceId.ts';
import { WhyRow } from './WhyRow.tsx';
import styles from './WhyPanel.module.css';

interface WhyPanelProps {
  /** The revealed sentence's id — the index it resolves against, and where "open full" goes. */
  sentenceId: string;
  /** The revealed L2 line, exactly as the card shows it. Its spans are what the rows explain. */
  display: string;
  /**
   * Whether this surface offers "open full". Produce cards do and Review cards do not
   * (PRD §8 F4, PRD-design §6.3) — the phase is the session's knowledge, not this panel's.
   */
  /**
   * A control that belongs in the SAME ghost row, rendered before the toggle — a surface's
   * "show cue" (#97), which the prototype draws beside "why" and "open full" rather than above
   * them. The slot exists so the rows still expand under all three; every other surface leaves it
   * empty, and an empty one renders nothing.
   */
  leading?: ReactNode;
  /** The course's writing direction — every line here is its content or its copy. */
  dir?: string;
  /** The tags the L2 word rows are written in (#186). */
  l2?: L2Written;
}

export function WhyPanel({ sentenceId, display, leading, dir, l2 }: WhyPanelProps) {
  const strings = useStrings();
  const [open, setOpen] = useState(false);
  const moduleId = moduleIdOf(sentenceId);
  const panelId = `why-panel-${sentenceId}`;

  return (
    <div className={styles.why}>
      <div className={styles.controls}>
        {leading}
        <button
          type="button"
          className={styles.toggle}
          aria-expanded={open}
          // Only while there is one: a reference to an id no element has is a broken reference,
          // and a collapsed panel genuinely has no rows to name (the same call #88 made).
          aria-controls={open ? panelId : undefined}
          onClick={() => {
            setOpen(!open);
          }}
          dir={dir}
        >
          {open ? strings['why.hide'] : strings['why.show']}
        </button>
      </div>

      {/* The list is the expansion; an empty one draws nothing at all (`.rows:empty`). A sentence
          id that names no module can never resolve, so it opens to exactly that — and asks for no
          file on the way. */}
      {open && (
        <ul id={panelId} className={styles.rows}>
          {moduleId !== null && <WhyRows moduleId={moduleId} display={display} dir={dir} l2={l2} />}
        </ul>
      )}
    </div>
  );
}

interface WhyRowsProps {
  moduleId: string;
  display: string;
  dir?: string;
  l2?: L2Written;
}

/**
 * The rows themselves, mounted only while the panel is open — so the index file is fetched when
 * the learner asks "why", not on every reveal. While it is in flight there are no rows, which the
 * stylesheet draws as nothing: no spinner, no reserved space, no jump when they land.
 */
function WhyRows({ moduleId, display, dir, l2 }: WhyRowsProps) {
  const index = useIndex(moduleId);
  const spans = index.data === null ? [] : resolveSentence(display, index.data);
  const modules = useModules(spans.map((span) => span.ref.moduleId));

  return (
    <>
      {spans.map((span) => {
        const word = wordOf(modules, span.ref);
        // A ref whose module has not arrived (or never will) is simply not a row yet.
        if (word === undefined) return null;
        return <WhyRow key={`${span.start}-${span.surface}`} word={word} dir={dir} l2={l2} />;
      })}
    </>
  );
}

/** The word row a ref points at, or `undefined` if that module is not loaded (or never loads). */
function wordOf(modules: ReadonlyMap<string, ModuleContent>, ref: WordRef): Word | undefined {
  const sentence = modules.get(ref.moduleId)?.sentences.find((item) => item.id === ref.sentenceId);
  return sentence?.deconstruction.words[ref.wordIdx];
}
