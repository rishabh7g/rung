/**
 * Sentence Detail (#89; PRD §8 F3 [D10]; PRD-design §6.4, §7) — one sentence, taken apart, in the
 * order the design froze and in no other.
 *
 * **The order is the feature.** Ten sections, always in this sequence, because a learner who
 * opens a second sentence must find the same shape in the same place:
 *
 *   hero → gloss → words → rules → trap → sound → variations → mistake → usage → mnemonic
 *
 * It runs from "what it says" to "why it says it" to "what will trip you" and lands on the one
 * thing worth carrying away — the mnemonic, labelled with the course's own "pocket it". The
 * order is asserted as a DOM fact in `SentenceScreen.test.tsx` (every section carries a
 * `data-section`), not left to the reading order of this file.
 *
 * **A section with nothing in it renders NOTHING** — no heading, no empty plate, no "not
 * available". Enrichment is optional in the schema past M3 (`src/course/types.ts`), the two
 * fixture courses are thinner than hi-mr, and a screen of empty headings would teach the learner
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
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, TriangleAlert } from 'lucide-react';
import { ContentErrorScreen } from '../course/BootScreens.tsx';
import { useCourse } from '../course/CourseProvider.tsx';
import { useModule } from '../course/content.ts';
import { l2Lang } from '../course/manifest.ts';
import { useStrings } from '../course/strings.ts';
import type { Rule, Sentence } from '../course/types.ts';
import { deriveStatuses, rungStage } from '../engine/progression.ts';
import { normalizeSurface, tokenizeSurface } from '../engine/surface.ts';
import { HOME_PATH } from '../shell/routes.tsx';
import { setScrollOffset, useScrollArea } from '../shell/scrollArea.tsx';
import { useAppStore } from '../state/store.ts';
import { rungLabel } from './ladder/rungLabel.ts';
import { ProductionDots } from './module/ProductionDots.tsx';
import { RegistrationMarks } from './RegistrationMarks.tsx';
import { moduleIdOf } from './sentence/sentenceId.ts';
import { TagChip } from './TagChip.tsx';
import { useProgression } from './useProgression.ts';
import styles from './SentenceScreen.module.css';

/**
 * The route's component. The module is read back out of the sentence id (`sentence/sentenceId.ts`)
 * — the URL carries nothing else — and an id that names no module goes to the Ladder rather than
 * asking the content layer for a file that cannot exist.
 *
 * The detail itself is **keyed by the sentence**, so prev/next is a fresh screen: a new sentence
 * starts at the top of its own page, which is what the scroll reset below is, and no section of
 * the previous one can survive into it.
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
  const l2 = l2Lang(course);
  const strings = useStrings();
  const module = useModule(moduleId);
  const { input, ready } = useProgression();
  const production = useAppStore((store) => store.courses[course.id]?.production);
  const scrollArea = useScrollArea();
  const navigate = useNavigate();

  /**
   * The same guard the module list keeps (#88), for the same reason: `/sentence/:id` is a real
   * deep link under a HashRouter, and a rung the ladder has locked has no readable sentences
   * however the learner arrives at one.
   */
  const status = ready ? deriveStatuses(input)[moduleId] : undefined;
  const openable =
    status !== undefined && status !== 'locked' && rungStage(input, moduleId) !== 'pending';

  // Every sentence opens at its own top. The shell's `<main>` keeps its offset across a route
  // change — arriving from a module list scrolled to 240 would otherwise open this screen 240px
  // down — and prev/next remounts this component, so one layout effect covers both.
  useLayoutEffect(() => {
    setScrollOffset(scrollArea, 0);
  }, [scrollArea]);

  // A rung that is not the learner's to open is not an error and not a message (#88).
  if (ready && !openable) return <Navigate to={HOME_PATH} replace />;

  if (module.error !== null) return <ContentErrorScreen detail={module.error.message} />;

  if (!ready || module.data === null) {
    return <article className={styles.detail} aria-busy="true" />;
  }

  const content = module.data;
  const sentence = content.sentences.find((item) => item.id === sentenceId);

  // The module opened and does not teach this sentence: the module list is the honest place for
  // that, and `replace` keeps the bad id out of the back stack.
  if (sentence === undefined) return <Navigate to={`/module/${moduleId}`} replace />;

  const at = content.sentences.indexOf(sentence);
  // `noUncheckedIndexedAccess` makes both ends of the module the type's problem rather than a
  // remembered `if`: no sentence before the first, none after the last.
  const previous = content.sentences[at - 1];
  const next = content.sentences[at + 1];

  /**
   * `deconstruction.rules` are integer indices into the MODULE's ordered `rules` array (PRD §7),
   * resolved here. An index the module does not have renders nothing at all — content that got
   * ahead of its rules list is a build failure (`tools/validate.ts` checks the ranges), and the
   * learner's screen is not the place to find out about one.
   */
  const rules = sentence.deconstruction.rules
    .map((index) => ({ index, rule: content.rules[index] }))
    .filter((entry): entry is { index: number; rule: Rule } => entry.rule !== undefined);

  const variations = sentence.variations ?? [];

  /** Opens a neighbour, or does nothing at the ends of the module — the pager's whole bound. */
  const step = (target: Sentence | undefined): void => {
    if (target !== undefined) void navigate(`/sentence/${target.id}`, { replace: true });
  };

  return (
    <article className={styles.detail}>
      {/* The prototype's header row, minus the chevron the shell owns (#84) — the same call the
          module list makes, and #117's to reconcile. */}
      <div className={styles.head}>
        <p className={styles.kicker}>
          {rungLabel(moduleId)} · SENTENCE {String(at + 1).padStart(2, '0')}
        </p>
        <ProductionDots produced={production?.[sentence.id] ?? 0} />
      </div>

      {/* 1 · hero — the sentence itself, at the one hero size in the ramp. */}
      <section data-section="hero" className={styles.hero}>
        <h2 className={styles.display} dir={course.dir} lang={l2.display}>
          {sentence.display}
        </h2>
        <p className={styles.cue} dir={course.dir}>
          {sentence.cue}
        </p>
        {/* Romanized courses only (PRD §4): the native script as recognition, never as something
            to produce — so it is the quietest line in the hero. */}
        {sentence.script !== undefined && (
          <p className={styles.script} lang={l2.script}>
            {sentence.script}
          </p>
        )}
      </section>

      {/* 2 · gloss — English by definition (`glossEn`), then the word-for-word line. */}
      <section data-section="gloss" className={styles.section}>
        {/* `glossEn` is English by name — in hi-mr that is a THIRD language on the screen. */}
        <p className={styles.gloss} lang="en">
          {sentence.glossEn}
        </p>
        {sentence.literal !== undefined && (
          <div className={styles.plateAccent}>
            <h3 className={styles.sectionLabel}>WORD-FOR-WORD</h3>
            <p className={styles.prose} dir={course.dir}>
              {sentence.literal}
            </p>
          </div>
        )}
      </section>

      {/* 3 · words — the rows the "why" resolver lands on (PRD §6.3): word, cue, tag, note, forms. */}
      {sentence.deconstruction.words.length > 0 && (
        <section data-section="words" className={styles.section}>
          <h3 className={styles.sectionLabel}>WORD BY WORD</h3>
          <ul className={styles.rows}>
            {sentence.deconstruction.words.map((word, index) => (
              <li key={`${word.display}-${index}`} className={styles.word}>
                <p className={styles.wordHead}>
                  <span className={styles.wordDisplay} dir={course.dir} lang={l2.display}>
                    {word.display}
                  </span>
                  <span className={styles.wordCue} dir={course.dir}>
                    {word.cue}
                  </span>
                  <TagChip tag={word.tag} />
                </p>
                {word.note !== undefined && (
                  <p className={styles.wordNote} dir={course.dir}>
                    {word.note}
                  </p>
                )}
                {/* The taught paradigm, `display` included — the surfaces the word index maps. */}
                {word.forms.length > 0 && (
                  <p className={styles.forms} dir={course.dir}>
                    forms: <span lang={l2.display}>{word.forms.join(' · ')}</span>
                  </p>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 4 · rules — the module's own, resolved from this sentence's indices. */}
      {rules.length > 0 && (
        <section data-section="rules" className={styles.section}>
          <h3 className={styles.sectionLabel}>RULES USED</h3>
          <ul className={styles.rules}>
            {rules.map(({ index, rule }) => (
              <li key={index} className={styles.rule}>
                <TagChip tag={rule.tag} />
                <span className={styles.prose} dir={course.dir}>
                  {rule.text}
                </span>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 5 · trap — the one loud object on the screen (design/tokens.md §7 rule 2). Its heading is
          the course's, because "Hindi will mislead you" is a sentence about the learner's own
          first language. */}
      {sentence.trap !== undefined && (
        <section data-section="trap" className={styles.trap}>
          <TriangleAlert className={styles.trapIcon} aria-hidden="true" />
          <div className={styles.trapText}>
            <p className={styles.trapHead} dir={course.dir}>
              {strings['sentence.trapHead']}
            </p>
            <p className={styles.trapBody} dir={course.dir}>
              {sentence.trap}
            </p>
          </div>
        </section>
      )}

      {/* 6 · sound — how it is said, in the course's words. No audio, ever (Invariant 5). */}
      {sentence.sound !== undefined && (
        <section data-section="sound" className={styles.plateQuiet}>
          <h3 className={styles.sectionLabel}>SOUND NOTE</h3>
          <p className={styles.prose} dir={course.dir}>
            {sentence.sound}
          </p>
        </section>
      )}

      {/* 7 · variations — same frame, one part swapped, and the swapped part is filled. */}
      {variations.length > 0 && (
        <section data-section="variations" className={styles.section}>
          <h3 className={styles.sectionLabel}>SAME PATTERN, SWAPPED PARTS</h3>
          <ul className={styles.rows}>
            {variations.map((variation, index) => (
              <li key={`${variation.display}-${index}`} className={styles.variation}>
                <p className={styles.variationLine} dir={course.dir} lang={l2.display}>
                  {changedTokens(sentence.display, variation.display).map((token, position) => (
                    <span
                      key={`${token.text}-${position}`}
                      className={token.changed ? styles.changed : undefined}
                    >
                      {token.text}
                    </span>
                  ))}
                </p>
                <p className={styles.variationCue} dir={course.dir}>
                  {variation.cue}
                </p>
                <p className={styles.variationChanged} dir={course.dir}>
                  {variation.changed}
                </p>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* 8 · mistake — struck, on the NEUTRAL plate: wrong L2 is information, not a warning. */}
      {sentence.mistake !== undefined && (
        <section data-section="mistake" className={styles.section}>
          <h3 className={styles.sectionLabel}>COMMON MISTAKE</h3>
          <div className={styles.mistake}>
            <p className={styles.mistakeDisplay} dir={course.dir} lang={l2.display}>
              {sentence.mistake.display}
            </p>
            <p className={styles.prose} dir={course.dir}>
              {sentence.mistake.why}
            </p>
          </div>
        </section>
      )}

      {/* 9 · usage — when a person actually says this, with the register beside it. */}
      {sentence.usage !== undefined && (
        <section data-section="usage" className={styles.plateQuiet}>
          <p className={styles.usageHead}>
            <span className={styles.sectionLabel}>WHEN TO USE IT</span>
            {sentence.register !== undefined && (
              <span className={styles.register}>{sentence.register}</span>
            )}
          </p>
          <p className={styles.prose} dir={course.dir}>
            {sentence.usage}
          </p>
        </section>
      )}

      {/* 10 · mnemonic — last, always: the one thing to carry away. A blueprint object, so it
          wears the four registration marks, and its label is the course's own (PRD §8 F3). */}
      {sentence.mnemonic !== undefined && (
        <section data-section="mnemonic" className={styles.mnemonic}>
          <RegistrationMarks />
          <p className={styles.courseLabel} dir={course.dir}>
            {strings['sentence.pocketIt']}
          </p>
          <p className={styles.prose} dir={course.dir}>
            {sentence.mnemonic}
          </p>
        </section>
      )}

      {/* The pager: within this module, and bounded by it. `replace`, because prev/next is one
          screen paging rather than ten destinations — the back chevron still returns to the
          module the learner came from, not to the sentence before this one. */}
      <nav className={styles.pager} aria-label="Sentences in this module">
        <button
          type="button"
          className={styles.step}
          disabled={previous === undefined}
          onClick={() => {
            step(previous);
          }}
          dir={course.dir}
        >
          <ArrowLeft className={styles.stepIcon} aria-hidden="true" />
          {strings['sentence.prev']}
        </button>
        {/* Counts, never time (Invariant 2) — and the prototype's "3 of 10" as the `n / total`
            the module list already writes, so the shell adds no English word of its own. */}
        <p className={styles.position}>
          {at + 1} / {content.sentences.length}
        </p>
        <button
          type="button"
          className={styles.step}
          disabled={next === undefined}
          onClick={() => {
            step(next);
          }}
          dir={course.dir}
        >
          {strings['sentence.next']}
          <ArrowRight className={styles.stepIcon} aria-hidden="true" />
        </button>
      </nav>
    </article>
  );
}

/**
 * A variation's tokens, each marked as changed or not: "same pattern, swapped parts" only reads
 * as a pattern if the swapped part is the one thing filled (`--variation-highlight`, [D10]).
 *
 * "Same word" is `normalizeSurface`'s definition and nobody else's (`src/engine/surface.ts`, #116)
 * — the same one the word index is built with, so a token that differs only by a trailing
 * question mark is not a swapped part here either. The token's own text is what renders: the
 * comparison is normalised, the screen is not.
 */
function changedTokens(base: string, variation: string): { text: string; changed: boolean }[] {
  const original = new Set(tokenizeSurface(base));

  return variation
    .split(/\s+/)
    .filter((text) => text !== '')
    .map((text) => {
      const surface = normalizeSurface(text);
      return { text, changed: surface !== '' && !original.has(surface) };
    });
}
