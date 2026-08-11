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
 * loads whichever modules its refs name, through the content layer's own cache (`loadModule`, #81),
 * which the session has usually already warmed. A module that will not load degrades **silently**:
 * `useModule`'s error screen is the right answer for a screen whose whole content is missing and
 * the wrong one for an optional expansion mid-session. That policy is this panel's, which is why
 * the loading lives here rather than in `content.ts`.
 *
 * **Which index it asks.** The module is read out of the sentence id (`moduleIdOf`, #89) rather
 * than passed in: a sentence's own module's cumulative index is by construction the smallest one
 * that teaches all of its words, and it is the file the session already loaded. An id that names
 * no module (a Produce card built from something else later) expands to nothing, the same as an
 * unresolvable sentence.
 */
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useCourse } from '../course/CourseProvider.tsx';
import { loadModule, useIndex } from '../course/content.ts';
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
  openFull?: boolean;
  /** The course's writing direction — every line here is its content or its copy. */
  dir?: string;
}

export function WhyPanel({ sentenceId, display, openFull = false, dir }: WhyPanelProps) {
  const strings = useStrings();
  const [open, setOpen] = useState(false);
  const moduleId = moduleIdOf(sentenceId);
  const panelId = `why-panel-${sentenceId}`;

  return (
    <div className={styles.why}>
      <div className={styles.controls}>
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

        {/* The one control that leaves the session — a link, because it navigates (#88's split). */}
        {openFull && (
          <Link className={styles.openFull} to={`/sentence/${sentenceId}`} dir={dir}>
            {strings['why.openFull']}
            <ArrowRight className={styles.openFullIcon} aria-hidden="true" />
          </Link>
        )}
      </div>

      {/* The list is the expansion; an empty one draws nothing at all (`.rows:empty`). A sentence
          id that names no module can never resolve, so it opens to exactly that — and asks for no
          file on the way. */}
      {open && (
        <ul id={panelId} className={styles.rows}>
          {moduleId !== null && <WhyRows moduleId={moduleId} display={display} dir={dir} />}
        </ul>
      )}
    </div>
  );
}

interface WhyRowsProps {
  moduleId: string;
  display: string;
  dir?: string;
}

/**
 * The rows themselves, mounted only while the panel is open — so the index file is fetched when
 * the learner asks "why", not on every reveal. While it is in flight there are no rows, which the
 * stylesheet draws as nothing: no spinner, no reserved space, no jump when they land.
 */
function WhyRows({ moduleId, display, dir }: WhyRowsProps) {
  const index = useIndex(moduleId);
  const spans = index.data === null ? [] : resolveSentence(display, index.data);
  const modules = useDefiningModules(spans.map((span) => span.ref));

  return (
    <>
      {spans.map((span) => {
        const word = wordOf(modules, span.ref);
        // A ref whose module has not arrived (or never will) is simply not a row yet.
        if (word === undefined) return null;
        return <WhyRow key={`${span.start}-${span.surface}`} word={word} dir={dir} />;
      })}
    </>
  );
}

/** The word row a ref points at, or `undefined` if that module is not loaded (or never loads). */
function wordOf(modules: ReadonlyMap<string, ModuleContent>, ref: WordRef): Word | undefined {
  const sentence = modules.get(ref.moduleId)?.sentences.find((item) => item.id === ref.sentenceId);
  return sentence?.deconstruction.words[ref.wordIdx];
}

/** Shared, so a render with nothing to show is reference-equal to the last one. */
const NO_MODULES: ReadonlyMap<string, ModuleContent> = new Map();

/**
 * Loads every module the refs name, and answers with the ones that arrived.
 *
 * `loadModule` is the content layer's cached loader, so the module already on screen costs
 * nothing and a second span pointing at the same file costs nothing either. A rejection is
 * **swallowed** — that module's rows do not render, and the rest of the panel does.
 *
 * The dependency is the module ids as a sorted string rather than the array, so a re-render that
 * resolves to the same set does not re-enter the effect; and the answer is tagged with the key it
 * answers for, so a new sentence never renders through the previous one's modules.
 */
function useDefiningModules(refs: readonly WordRef[]): ReadonlyMap<string, ModuleContent> {
  const { course } = useCourse();
  const key = [...new Set(refs.map((ref) => ref.moduleId))].sort().join(' ');
  const [loaded, setLoaded] = useState<{
    key: string;
    modules: ReadonlyMap<string, ModuleContent>;
  } | null>(null);

  useEffect(() => {
    let cancelled = false;
    const moduleIds = key === '' ? [] : key.split(' ');

    void Promise.all(
      moduleIds.map((moduleId) =>
        loadModule(course.id, moduleId).then(
          (module) => [moduleId, module] as const,
          () => null,
        ),
      ),
    ).then((entries) => {
      if (cancelled) return;
      const modules = new Map(entries.filter((entry) => entry !== null));
      setLoaded({ key: `${course.id} ${key}`, modules });
    });

    return () => {
      cancelled = true;
    };
  }, [course.id, key]);

  return loaded !== null && loaded.key === `${course.id} ${key}` ? loaded.modules : NO_MODULES;
}
