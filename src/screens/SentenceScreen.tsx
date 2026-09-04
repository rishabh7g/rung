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
 * anywhere in the app. Every section carries a `data-section`, as before.
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
import { useLayoutEffect, useState } from 'react';
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp, TriangleAlert } from 'lucide-react';
import { ContentErrorScreen } from '../course/BootScreens.tsx';
import { useCourse } from '../course/CourseProvider.tsx';
import { useModule, useModules } from '../course/content.ts';
import { l2Written } from '../course/manifest.ts';
import { useStrings } from '../course/strings.ts';
import type { Rule, Sentence } from '../course/types.ts';
import { deriveStatuses, rungStage } from '../engine/progression.ts';
import { normalizeSurface, tokenizeSurface } from '../engine/surface.ts';
import { HOME_PATH, PRACTICE_PATH } from '../shell/routes.tsx';
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
  const l2 = l2Written(course);
  const strings = useStrings();
  const module = useModule(moduleId);
  const { input, ready } = useProgression();
  const production = useAppStore((store) => store.courses[course.id]?.production);
  const scrollArea = useScrollArea();
  const navigate = useNavigate();
  // `setDeeper`, never `setState`: `src/state/unlockPath.test.ts` scans the shell for that call and
  // the store's actions are the only place allowed to make it (Invariant 1). Closed on every
  // sentence — the detail is keyed by id, so prev/next remounts it shut (#401).
  const [deeper, setDeeper] = useState(false);
  const deeperId = `sentence-deeper-${sentenceId}`;

  /**
   * The same guard the module list keeps (#88), for the same reason: `/sentence/:id` is a real
   * deep link under a HashRouter, and a rung the ladder has locked has no readable sentences
   * however the learner arrives at one.
   */
  const statuses = ready ? deriveStatuses(input) : undefined;
  const status = statuses?.[moduleId];
  const openable =
    status !== undefined && status !== 'locked' && rungStage(input, moduleId) !== 'pending';

  /**
   * Where the last sentence hands over to — and it is not one place, because a module the learner
   * has PASSED is a different situation from the rung they are climbing.
   *
   * The rung they are climbing ends at Practice: reading it is the preparation, and the module
   * list's own closing move is the same link. A module they passed weeks ago ends at the NEXT
   * module, because someone re-reading the ladder from the top is reading, not practising. The
   * old unconditional Practice link got this wrong twice over: it interrupted the read, and since
   * the Practice hub resolves the CURRENT rung rather than the module on screen, a learner
   * re-reading M3 while sitting on M7 was handed M7 — a module they had not asked about and were
   * not looking at.
   *
   * "Next" is the ladder's own order, so re-reading M3 offers M4 rather than jumping to the
   * frontier: the learner is walking the ladder, and the walk continues where they are.
   *
   * Two conditions guard it, and both are the same openability test this screen already applies
   * to itself above — a hand-over that lands on `Navigate to={HOME_PATH}` is worse than no
   * hand-over at all. A locked next rung is reachable in real life: passing L1-M10 without having
   * passed L1-M4 leaves L2 sealed, so L2-M1 is locked and the offer has to fall back.
   */
  const ladder = input.levels.flatMap((level) => level.moduleIds);
  const after = ladder[ladder.indexOf(moduleId) + 1];
  const handOverTo =
    status === 'passed' &&
    after !== undefined &&
    statuses?.[after] !== undefined &&
    statuses[after] !== 'locked' &&
    rungStage(input, after) !== 'pending'
      ? after
      : undefined;

  /**
   * Where the FIRST sentence hands BACK to — the same move as `handOverTo`, pointing the other way,
   * and it exists for the same reason that one does.
   *
   * The leading slot went dead on a module's first sentence because there is genuinely nothing
   * before it INSIDE the module. There is something before it on the LADDER, though, and that is
   * the walk the learner is actually on: someone reading M4 from the top has M3 behind them, and
   * the read continues at M3's LAST sentence rather than stopping at a greyed-out control. The
   * asymmetry #367 called honest was only ever honest about the module; it was never true of the
   * ladder, and the first sentence is exactly where the two differ.
   *
   * The previous rung by the ladder's own order, so it crosses a level boundary the way `after`
   * does: the first sentence of L2-M1 hands back to the last sentence of L1-M10.
   *
   * The same guard as forwards, and it is the openability test this screen already applies to
   * itself — a hand-back that lands on `Navigate to={HOME_PATH}` is worse than a disabled button.
   * A locked or pending rung behind the learner is not hypothetical: L1 can be passed with L1-M4
   * still unpassed, and a rung mid-ritual is not readable.
   *
   * Unlike forwards, the destination is NOT built by convention. `<id>-S01` is a first sentence in
   * every course, but a module's last sentence is `-S10` only while every module carries exactly
   * ten — which `tools/validate.ts` requires of shipped content and relaxes for fixtures — so the
   * id is read off the previous module's own `sentences` instead. `useModules` is the loader for
   * that: a file that will not load is simply absent, which leaves the slot the disabled button it
   * was before, and it is asked for ONLY on a first sentence with an eligible rung behind it, so
   * no other sentence in the app pays a second fetch for it.
   */
  const before = ladder[ladder.indexOf(moduleId) - 1];
  const handBackTo =
    module.data?.sentences[0]?.id === sentenceId &&
    before !== undefined &&
    statuses?.[before] !== undefined &&
    statuses[before] !== 'locked' &&
    rungStage(input, before) !== 'pending'
      ? before
      : undefined;
  const behind = useModules(handBackTo === undefined ? [] : [handBackTo]);
  const handBackAt =
    handBackTo === undefined ? undefined : behind.get(handBackTo)?.sentences.at(-1);

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
        <h2 className={styles.display} dir={l2.display.dir} lang={l2.display.lang}>
          {sentence.display}
        </h2>
        <p className={styles.cue} dir={course.dir}>
          {sentence.cue}
        </p>
        {/* Romanized courses only (PRD §4): the native script as recognition, never as something
            to produce — so it is the quietest line in the hero. */}
        {sentence.script !== undefined && (
          <p className={styles.script} dir={l2.script.dir} lang={l2.script.lang}>
            {sentence.script}
          </p>
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
                  <span className={styles.wordDisplay} dir={l2.display.dir} lang={l2.display.lang}>
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
                    forms:{' '}
                    <span dir={l2.display.dir} lang={l2.display.lang}>
                      {word.forms.join(' · ')}
                    </span>
                  </p>
                )}
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

      {/* THE DISCLOSURE (#401, #408). Above it is what a sentence IS — the line, its words, and the
          one thing that will bite; below it, still in the frozen order, is everything else the
          course has to say about it. Six sections and three screens per sentence was the reading
          path a first-timer walked ten times a module, and most of it restated the tier above (the
          gloss says the literal; a word's note says its rule). Nothing is removed and nothing
          moves: one control, and the depth is one tap away for the sentence that earns the question.

          It wears the pager's button shape — a hairline frame at the secondary height, centred —
          and a chevron the pager does not need. The first version was a ghost: accent text between
          two hairlines, and between the amber trap and the "pocket it" plate it read as a caption.
          Watched in use, it was not tapped. A disclosure has to look like a door (#408). */}
      <button
        type="button"
        className={styles.deeper}
        aria-expanded={deeper}
        // Only while there is one: a reference to an id no element has is a broken reference
        // (`WhyPanel`'s call, #88's before it).
        aria-controls={deeper ? deeperId : undefined}
        onClick={() => {
          setDeeper(!deeper);
        }}
        dir={course.dir}
      >
        {deeper ? strings['sentence.less'] : strings['sentence.deeper']}
        {deeper ? (
          <ChevronUp className={styles.deeperIcon} aria-hidden="true" />
        ) : (
          <ChevronDown className={styles.deeperIcon} aria-hidden="true" />
        )}
      </button>

      {deeper && (
        <div id={deeperId} className={styles.depth}>
          {/* 2 · gloss — the English gloss, then the word-for-word line. Both are optional: the
            build requires the gloss only where neither language of the pair is English (hi-mr) and
            forbids it where either is (#268, #405) — the hero or the cue already reads in English.
            So the section obeys the rule every other optional section does — nothing to show,
            nothing rendered. */}
          {(sentence.glossEn !== undefined || sentence.literal !== undefined) && (
            <section data-section="gloss" className={styles.section}>
              {/* The gloss is English wherever it exists — in hi-mr that is a THIRD language on the
                screen — so it is the one line that declares its language as a literal rather than
                through the manifest (`langLaw.test.tsx`). */}
              {sentence.glossEn !== undefined && (
                <p className={styles.gloss} lang="en">
                  {sentence.glossEn}
                </p>
              )}
              {sentence.literal !== undefined && (
                <div className={styles.plateAccent}>
                  <h3 className={styles.sectionLabel}>WORD-FOR-WORD</h3>
                  <p className={styles.prose} dir={course.dir}>
                    {sentence.literal}
                  </p>
                </div>
              )}
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
                    <p className={styles.variationLine} dir={l2.display.dir} lang={l2.display.lang}>
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
                <p className={styles.mistakeDisplay} dir={l2.display.dir} lang={l2.display.lang}>
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
        </div>
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
      <nav className={styles.pager} aria-label={strings['a11y.sentencePager']}>
        {/**
         * The leading slot is the trailing one's mirror: paging inside the module wherever there is
         * a sentence before this one, and on the FIRST sentence a HAND-BACK to the module behind
         * this one on the ladder (`handBackAt`, resolved above) rather than a dead control.
         *
         * It stays a disabled button wherever there is nothing behind: the first module of the
         * ladder, a previous rung the ladder has locked or left mid-ritual, and the moment before
         * that module's file has arrived. Those are the cases where the old asymmetry was telling
         * the truth.
         *
         * A `<Link>` for the hand-back and a button for the paging, for the reason the trailing
         * slot draws the same distinction: paging replaces, because it is one screen turning its
         * own pages; leaving for another module is a destination change and belongs in history.
         */}
        {handBackAt === undefined ? (
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
        ) : (
          <Link className={styles.step} to={`/sentence/${handBackAt.id}`} dir={course.dir}>
            <ArrowLeft className={styles.stepIcon} aria-hidden="true" />
            {strings['sentence.prevModule']}
          </Link>
        )}
        {/* Counts, never time (Invariant 2) — and the prototype's "3 of 10" as the `n / total`
            the module list already writes, so the shell adds no English word of its own. */}
        <p className={styles.position}>
          {at + 1} / {content.sentences.length}
        </p>
        {/**
         * The trailing slot is a HAND-OVER on the last sentence, not a dead button (#367).
         *
         * Reaching the end of a module's sentences used to grey Next out and stop: the screen
         * closed on a piece of content, a disabled control and nothing else. Every other
         * walk-through surface in the app names its own end — the module LIST closes with a
         * Practice link ("reading a module is never a gate in front of practising it"). This is
         * the one that did not, and the asymmetry was the bug.
         *
         * **Prev's bound is untouched and stays disabled on the first sentence**, because that
         * asymmetry is honest: there is genuinely nothing before the first sentence, and there is
         * genuinely somewhere to go after the last one.
         *
         * **Where it goes depends on whether this module is behind the learner** (`handOverTo`,
         * computed above). On the rung they are climbing it goes to PRACTICE, and arriving there
         * starts nothing: the hub is a count plus one Start CTA, and `startSession` — which spends
         * a session count and ticks the review queue — runs only on that deliberate tap (the
         * structural version of #316 was built and backed out over exactly this). Routing through
         * the module list would have been one extra tap to the same place, since that list's own
         * closing move is a Practice link. A learner mid-session meets the resume banner there and
         * is offered their position back rather than a silent restart.
         *
         * On a module they have PASSED it goes to the next module's FIRST SENTENCE instead, so a
         * re-read of the ladder carries straight on rather than being bounced into the practice
         * hub for a rung the learner is not looking at.
         *
         * The target id is built by convention — every module's first sentence is `<id>-S01`,
         * checked across all nine courses' content — and the convention failing is not a broken
         * link: an id this screen cannot find falls through to `Navigate to={/module/:id}` above,
         * which is the module list, which is a fair place to arrive.
         *
         * A `<Link>`, not the pager's `navigate(replace)`: prev/next is one screen paging, so it
         * replaces; this is a real destination change and belongs in history.
         */}
        {next === undefined ? (
          <Link
            className={styles.step}
            to={handOverTo === undefined ? PRACTICE_PATH : `/sentence/${handOverTo}-S01`}
            dir={course.dir}
          >
            {handOverTo === undefined ? strings['sentence.done'] : strings['sentence.nextModule']}
            <ArrowRight className={styles.stepIcon} aria-hidden="true" />
          </Link>
        ) : (
          <button
            type="button"
            className={styles.step}
            onClick={() => {
              step(next);
            }}
            dir={course.dir}
          >
            {strings['sentence.next']}
            <ArrowRight className={styles.stepIcon} aria-hidden="true" />
          </button>
        )}
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
