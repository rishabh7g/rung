/**
 * The module list (#88, #217) — a rung's ten sentences, browsable and nothing more
 * (PRD §8 F2; PRD-design §6.4, flow 4: "a card → Detail. Scroll restore on back").
 *
 * It is the **read** half of the product, and it is deliberately quiet: there is nothing to
 * answer here, nothing to get wrong, and no control that judges anything. Four things it owes:
 *
 *   1. **A guard.** `/module/:id` is a real deep link (HashRouter, an installable PWA), so the
 *      route is reachable with any id in it. A rung the ladder has locked, an id the ladder does
 *      not list, and a rung whose module this build never shipped all land back on the Ladder —
 *      the same answer the rung card gives by having no link to offer. Invariant 1 lives in
 *      `passRitual`; this is the screen not pretending otherwise.
 *   2. **`markStudied`, once, on first open.** The `studied` flag is what turns the rung card
 *      from "Start with the module" into "Practice" [D22] — so opening this screen is what moves
 *      the Ladder, and it is idempotent in the store, which is what lets an effect fire it.
 *      It marks; it cannot unlock (`state/store.ts`).
 *   3. **The cards**, each one a link into Sentence Detail (`module/SentenceCard.tsx`) and
 *      nothing more since #217 — the details live in exactly one screen, so the list neither
 *      expands nor holds any per-card state. Each carries its production dots, which live off
 *      `courses[<id>].production`, written by a Practice got-it through the store's one counter
 *      action (`recordProduction`, #95). This screen only reads them: a full dot on every card is
 *      the rung's exit ritual open, drawn one sentence at a time.
 *   4. **Where the learner was.** The scroll offset survives a detour into Sentence Detail, in
 *      `sessionStorage` and never in the store (`module/moduleView.ts`).
 *
 * Every learner-facing word is the course's: the sentences are its content and the closing
 * Practice link is its `strings.json` — the cards themselves add no label at all. The helper line
 * that used to sit above them went on #229: it was read-once copy, and stale since #217 took
 * expand-in-place away. The English here is structural furniture in the register of the nav's tab
 * labels — the `M1 · MODULE` kicker — and the counter is a count.
 *
 * **Two divergences from the prototype**, both the shell's shape rather than this screen's:
 * the prototype draws its own header row (chevron + kicker + title + counter) where the shell
 * owns the chevron and the screen's name (#84), so the kicker, title and counter render as the
 * screen's first row; and the prototype's own list is the scroll area, where here the shell's
 * `<main>` is the one scroll area in the app. Both are #117's to reconcile.
 */
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { useCourse } from '../course/CourseProvider.tsx';
import { l2Written } from '../course/manifest.ts';
import { useStrings } from '../course/strings.ts';
import { useModule } from '../course/content.ts';
import { ContentErrorScreen } from '../course/BootScreens.tsx';
import { MARKS_PER_SENTENCE } from '../engine/exit.ts';
import { deriveStatuses, rungStage } from '../engine/progression.ts';
import { useAppStore } from '../state/store.ts';
import { PRACTICE_PATH, HOME_PATH } from '../shell/routes.tsx';
import { setScrollOffset, useScrollArea } from '../shell/scrollArea.tsx';
import { rungLabel } from './ladder/rungLabel.ts';
import { SentenceCard } from './module/SentenceCard.tsx';
import {
  moduleViewKey,
  readModuleView,
  writeModuleView,
  type ModuleView,
} from './module/moduleView.ts';
import { useProgression } from './useProgression.ts';
import styles from './ModuleScreen.module.css';

/**
 * The route's component. It reads the id and hands it to a **keyed** list, so opening a different
 * rung is a fresh screen rather than the same one with new content: how far down the learner had
 * scrolled belongs to one module, and React would otherwise keep it.
 */
export default function ModuleScreen() {
  const { id = '' } = useParams();

  return <ModuleList key={id} moduleId={id} />;
}

interface ModuleListProps {
  moduleId: string;
}

function ModuleList({ moduleId }: ModuleListProps) {
  const { course } = useCourse();
  const l2 = l2Written(course);
  const strings = useStrings();
  const module = useModule(moduleId);
  const { input, ready } = useProgression();
  const markStudied = useAppStore((store) => store.markStudied);
  const production = useAppStore((store) => store.courses[course.id]?.production);
  const scrollArea = useScrollArea();

  /**
   * Whether this rung is the learner's to open, and the whole of the guard: the ladder lists it,
   * it is not locked, and this build shipped its module file (`rungStage`'s `pending` is exactly
   * "listed, not authored"). False while the ladder is still loading — nothing is openable before
   * there is a ladder to ask.
   */
  const status = ready ? deriveStatuses(input)[moduleId] : undefined;
  const openable =
    status !== undefined && status !== 'locked' && rungStage(input, moduleId) !== 'pending';

  // Opening a rung is what marks it studied [D22] — the one thing this screen writes, and the
  // only reason the rung card behind it changes. Idempotent in the store, so the effect fires it
  // once per open and a re-render (a got-it landing, a scroll) never fires it again.
  useEffect(() => {
    if (openable) markStudied(course.id, moduleId);
  }, [openable, course.id, moduleId, markStudied]);

  /* ------------------------------------------------------- where the learner was */

  const viewKey = moduleViewKey(course.id, moduleId);
  /** What this module was left at. Read once, on mount: it is where the screen starts, not state. */
  const [left] = useState<ModuleView>(() => readModuleView(viewKey));
  /** The live scroll offset, kept out of state: nothing re-renders because a list moved. */
  const offset = useRef(left.scrollTop);
  const restored = useRef(false);

  // Scrolling itself only moves a ref — a sessionStorage write per scroll event is a write per
  // frame of a fling, and the number has to be true exactly once: when the learner leaves for
  // Sentence Detail (or anywhere), which is when this effect is cleaned up.
  useEffect(() => {
    if (scrollArea === null) return;

    const onScroll = () => {
      offset.current = scrollArea.scrollTop;
    };
    scrollArea.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      scrollArea.removeEventListener('scroll', onScroll);
      writeModuleView(viewKey, { scrollTop: offset.current });
    };
  }, [scrollArea, viewKey]);

  // And back in, once the sentences are on screen — a layout effect, before the browser paints,
  // so returning from Detail lands where the learner left rather than at the top for a frame.
  useLayoutEffect(() => {
    if (scrollArea === null || restored.current || module.data === null) return;

    restored.current = true;
    setScrollOffset(scrollArea, left.scrollTop);
  }, [scrollArea, module.data, left.scrollTop]);

  /* ------------------------------------------------------------------- the screen */

  // A rung that is not the learner's to open is not an error and not a message: the Ladder is
  // where it belongs, and `replace` keeps the bad entry out of the back stack.
  if (ready && !openable) return <Navigate to={HOME_PATH} replace />;

  // A module file that will not load is the content layer failing, which is one screen wherever
  // it fails (#79).
  if (module.error !== null) return <ContentErrorScreen detail={module.error.message} />;

  // Nothing honest to draw yet: the ladder decides whether this screen may exist at all, and the
  // module file is everything on it. The shell's frame is already up, so it waits.
  if (!ready || module.data === null) return <section className={styles.module} aria-busy="true" />;

  const sentences = module.data.sentences;
  // Sentences MARKED, not marks made: the counters have no ceiling (`recordProduction` only adds),
  // so summing them would let one sentence read four times carry the module past a total that
  // means "every sentence is done". Capping each at the gate is what keeps `n / 10` an answer to
  // "how much of this rung is read through".
  const marked = sentences.filter(
    (sentence) => (production?.[sentence.id] ?? 0) >= MARKS_PER_SENTENCE,
  ).length;

  return (
    <section className={styles.module}>
      <div className={styles.head}>
        <div className={styles.headText}>
          {/* Structural furniture, like the Ladder's `M1 · CURRENT RUNG` — raised on #71. */}
          <p className={styles.kicker}>{rungLabel(moduleId)} · MODULE</p>
          <h2 className={styles.title} dir={course.dir}>
            {module.data.title}
          </h2>
        </div>
        {/* Counts, never time (Invariant 2): got-its across the module, out of the one per
            sentence the exit ritual asks for (`MARKS_PER_SENTENCE`, the same constant the exit
            rule reads — one since #349, so this reads `n / 10` where it read `n / 20`). Written
            by Read got-its; read here. */}
        <p className={styles.count}>
          {marked} / {sentences.length * MARKS_PER_SENTENCE}
        </p>
      </div>

      <ol className={styles.cards}>
        {sentences.map((sentence) => (
          <SentenceCard
            key={sentence.id}
            sentence={sentence}
            produced={production?.[sentence.id] ?? 0}
            dir={course.dir}
            l2={l2}
          />
        ))}
      </ol>

      {/* The prototype closes the list with Practice, and the reason is the invariant: reading a
          module is never a gate in front of practising it. Same label as the rung card's, because
          it is the same tab. */}
      <Link className={styles.practice} to={PRACTICE_PATH} dir={course.dir}>
        {strings['rungCard.practice']}
      </Link>
    </section>
  );
}
