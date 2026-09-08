/**
 * Sentence Detail (#89; PRD §8 F3 [D10]; PRD-design §6.4, §7) — one sentence, taken apart, in the
 * order the design froze and in no other.
 *
 * **The order is the feature, and it is now in two tiers** (#401). A learner who opens a second
 * sentence must find the same shape in the same place, so within each tier the sequence is fixed:
 *
 *   ALWAYS:  hero → words → trap  ·  [go deeper]  ·  mnemonic
 *   DEEPER:  gloss → rules → sound → variations → mistake → usage
 *
 * The first tier is what a sentence IS — the line, its words, the one thing that will bite — and
 * it lands on the one thing worth carrying away, the mnemonic, labelled with the course's own
 * "pocket it". The second is everything else the course has to say, behind one control, in the
 * order it always had. It used to be ten sections in one column, three screens for every
 * sentence of every module (every optional block ships on every sentence — measured on M1, M3,
 * M4, M7, M10), and most of the lower half restated the upper: the gloss says the literal, a
 * word's note says its rule, the trap and the note both warn off the same mistake. That is the
 * reading path a first-time learner walks ten times a module, and it was the most information
 * anywhere in the app. Every section carries a `data-section`, as before, and since #414 each is
 * its own component under `sentence/` — this file keeps the guards, the hand-over derivation and
 * the order.
 *
 * **A section with nothing in it renders NOTHING** — no heading, no empty plate, no "not
 * available". Enrichment is optional in the schema past M3 (`src/course/types.ts`), en-es and
 * en-ar are thinner than hi-mr, and a screen of empty headings would teach the learner
 * that the content is broken rather than that this sentence is simple.
 *
 * **Amber appears once.** The interference trap is the only loud object here (design/tokens.md §7
 * rule 2) — the mistake plate is deliberately neutral (`--mistake-border`/`--mistake-bg`, struck
 * text), because a wrong sentence is information, not a warning. The stylesheet is where that
 * lives, and `SentenceScreen.test.tsx` scans it.
 *
 * **It writes nothing.** Reading a sentence marks nothing and unlocks nothing: the module list is
 * what flips `studied` [D22] (#88), the ritual is the only unlock path (Invariant 1). This screen
 * reads the module file, the ladder and the production counters, and moves between sentences.
 *
 * Two divergences from the prototype, both the shell's shape rather than this screen's, and both
 * #117's to reconcile: the prototype draws its own header row (chevron + `M1 · SENTENCE 02` +
 * dots) where the shell owns the chevron and the screen's name (#84), so the kicker and the dots
 * render as the screen's first row; and its prev/next bar is a fixed footer outside its scroll
 * area, where the app has exactly one scroll area (`<main>`), so the pager is **sticky** at the
 * bottom of the screen's own column. Everything else — including the section order — is the
 * prototype's, and the type sizes are the standing 18px-Mukta divergence recorded in the CSS.
 */
import { useLayoutEffect } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { ContentErrorScreen } from '../course/BootScreens.tsx';
import { useCourse } from '../course/CourseProvider.tsx';
import { useModule } from '../course/content.ts';
import { l2Written } from '../course/manifest.ts';
import { useStrings } from '../course/strings.ts';
import { deriveStatuses } from '../engine/progression.ts';
import { HOME_PATH } from '../shell/routes.tsx';
import { setScrollOffset, useScrollArea } from '../shell/scrollArea.tsx';
import { useAppStore } from '../state/store.ts';
import { rungLabel } from './ladder/rungLabel.ts';
import { ProductionDots } from './module/ProductionDots.tsx';
import { Deeper } from './sentence/Deeper.tsx';
import { GlossSection } from './sentence/GlossSection.tsx';
import { HeroSection } from './sentence/HeroSection.tsx';
import { MistakeSection } from './sentence/MistakeSection.tsx';
import { MnemonicSection } from './sentence/MnemonicSection.tsx';
import { RulesSection } from './sentence/RulesSection.tsx';
import { SentencePager } from './sentence/SentencePager.tsx';
import { moduleIdOf } from './sentence/sentenceId.ts';
import { SoundSection } from './sentence/SoundSection.tsx';
import { TrapSection } from './sentence/TrapSection.tsx';
import { UsageSection } from './sentence/UsageSection.tsx';
import { isOpenableRung, useLadderHandOver } from './sentence/useLadderHandOver.ts';
import { VariationsSection } from './sentence/VariationsSection.tsx';
import { WordsSection } from './sentence/WordsSection.tsx';
import { useProgression } from './useProgression.ts';
import './sentence-screen.css';

/**
 * The route's component. The module is read back out of the sentence id (`sentence/sentenceId.ts`)
 * — the URL carries nothing else — and an id that names no module goes to the Ladder rather than
 * asking the content layer for a file that cannot exist.
 *
 * The detail itself is **keyed by the sentence**, so prev/next is a fresh screen: a new sentence
 * starts at the top of its own page, which is what the scroll reset below is, and no section of
 * the previous one can survive into it — the disclosure included.
 */
export default function SentenceScreen() {
  const { id = '' } = useParams();
  const moduleId = moduleIdOf(id);

  if (moduleId === null) return <Navigate to={HOME_PATH} replace />;

  return <SentenceDetail key={id} moduleId={moduleId} sentenceId={id} />;
}

interface SentenceDetailProps {
  moduleId: string;
  sentenceId: string;
}

function SentenceDetail({ moduleId, sentenceId }: SentenceDetailProps) {
  const { course } = useCourse();
  // The taught language, which is NOT the one the document declares (#186).
  const l2 = l2Written(course);
  const strings = useStrings();
  const module = useModule(moduleId);
  const { input, ready } = useProgression();
  const production = useAppStore((store) => store.courses[course.id]?.production);
  const scrollArea = useScrollArea();

  // The same guard the module list keeps (#88): `/sentence/:id` is a real deep link under a
  // HashRouter, and a locked rung has no readable sentences however the learner arrives at one.
  const statuses = ready ? deriveStatuses(input) : undefined;
  const openable = isOpenableRung(input, statuses, moduleId);
  const isFirstSentence = module.data?.sentences[0]?.id === sentenceId;
  const { handOverTo, handBackAt } = useLadderHandOver(input, statuses, moduleId, isFirstSentence);

  // Every sentence opens at its own top. The shell's `<main>` keeps its offset across a route
  // change, and prev/next remounts this component, so one layout effect covers both.
  useLayoutEffect(() => {
    setScrollOffset(scrollArea, 0);
  }, [scrollArea]);

  // A rung that is not the learner's to open is not an error and not a message (#88).
  if (ready && !openable) return <Navigate to={HOME_PATH} replace />;

  if (module.error !== null) return <ContentErrorScreen detail={module.error.message} />;

  if (!ready || module.data === null) {
    return <article className="sentence-detail" aria-busy="true" />;
  }

  const content = module.data;
  const sentence = content.sentences.find((item) => item.id === sentenceId);

  // The module opened and does not teach this sentence: the module list is the honest place for
  // that, and `replace` keeps the bad id out of the back stack.
  if (sentence === undefined) return <Navigate to={`/module/${moduleId}`} replace />;

  const at = content.sentences.indexOf(sentence);
  // `noUncheckedIndexedAccess` makes both ends of the module the type's problem: no sentence
  // before the first, none after the last.
  const previous = content.sentences[at - 1];
  const next = content.sentences[at + 1];

  return (
    <article className="sentence-detail">
      {/* The prototype's header row, minus the chevron the shell owns (#84, #117). */}
      <div className="sentence-head">
        <p className="sentence-kicker">
          {rungLabel(moduleId)} · SENTENCE {String(at + 1).padStart(2, '0')}
        </p>
        <ProductionDots produced={production?.[sentence.id] ?? 0} />
      </div>
      <HeroSection sentence={sentence} l2={l2} />
      <WordsSection sentence={sentence} l2={l2} />
      <TrapSection sentence={sentence} strings={strings} />
      <Deeper id={`sentence-deeper-${sentenceId}`} strings={strings}>
        <GlossSection sentence={sentence} />
        <RulesSection sentence={sentence} moduleRules={content.rules} />
        <SoundSection sentence={sentence} />
        <VariationsSection sentence={sentence} l2={l2} />
        <MistakeSection sentence={sentence} l2={l2} />
        <UsageSection sentence={sentence} />
      </Deeper>
      <MnemonicSection sentence={sentence} strings={strings} />
      <SentencePager
        at={at}
        total={content.sentences.length}
        previous={previous}
        next={next}
        handOverTo={handOverTo}
        handBackAt={handBackAt}
        strings={strings}
      />
    </article>
  );
}
