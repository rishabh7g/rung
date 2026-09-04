/**
 * The session (#388; PRD §8 F3, PRD-design §6.3, flow 3) — the 20–30 minutes the whole product is
 * built around, running immersive: fifteen cards, one after another, ending on a score.
 *
 * **Every card is the same card, and there is exactly one thing to do on it.** The learner reads
 * the cue in the language they already speak, guesses the sentence in the language they are
 * learning, taps reveal, and marks themselves. That mark commits the card and moves to the next
 * one. There is no pager, no cue toggle, no phase chip and no second section — the whole session
 * is one queue (`engine/session.ts`) and one gesture repeated.
 *
 * **What this replaced, and why.** Practice used to run in two halves. *Review* served up to five
 * due cards exactly as above; *Read* walked the current rung showing the L2 sentence outright,
 * with the cue hidden behind a toggle, a Back/Next pager, and an "open full" link out to Sentence
 * Detail. Two halves meant two chips to explain them, a hand-over line between them, and a hub
 * that described both before the first card. Watched in use, that was too many ideas: a first-time
 * learner could not tell what she was being asked to do, and the "why" control read to her as a
 * question she had to answer.
 *
 * The Read half was also teaching the wrong way round. Its own header used to argue for L2-first
 * on the grounds that Read sat one phase before Produce — and Produce had already been retired
 * (#349), so nothing was being primed. Showing the answer and then asking "did you get it?" is a
 * verdict with nothing behind it, which is precisely why #368 had taken the self-mark off that
 * card and made the pager write the exit counter instead. Giving every card a cue fixes the cause:
 * there is something to recall against, so the mark means something again — and the mark can go
 * back to being the exit gate.
 *
 * **THE ROUTING CONTRACT LIVES HERE, AND NOWHERE ELSE.** The reveal card imports no store at all —
 * it emits `onResult({sentenceId, gotIt})` and stops (#93). So what a mark COSTS is this
 * component's knowledge, and it is decided by which rung the card came from, not by where the
 * learner is:
 *
 * | the card is | a got-it writes | a miss writes | and never to |
 * |---|---|---|---|
 * | a sentence of THIS rung | `recordProduction` — the counter that opens the exit ritual | nothing | the review queue |
 * | a sentence of an EARLIER rung | `recordReview` → `applyMark` (box + countdown) | `recordReview` (back to box 1) | the exit counters |
 *
 * They are different numbers answering different questions — the counters measure what has been
 * built on the rung being climbed, the queue measures what is being kept from the rungs below —
 * and crossing them would open a rung's exit ritual on sentences the learner never worked.
 *
 * **A miss on a this-rung card writes nothing at all**, and that is the gate being honest rather
 * than an omission. The sentence comes round again in a later session; the ritual waits until the
 * learner has actually had it right once. Marking is IDEMPOTENT: a sentence already at the gate
 * writes nothing, so a repeated card (the session pads with rung sentences when the ladder holds
 * fewer than fifteen — `engine/session.ts`) cannot inflate a counter. The number is a fact about
 * the sentence, not a tally of taps.
 *
 * **The position is snapshotted per course on every advance** (PRD §8 F7 — `session`), written
 * through `setSession` and cleared at the summary. Nothing else about a session persists: what the
 * learner earned is in the counters and the queue, and this is only where they were.
 *
 * **And it is flushed the moment the page goes away** (#99). That write is a passive effect, and a
 * passive effect is SCHEDULED: tap a mark, and the OS can background, freeze or discard the page
 * in the gap before React gets round to running it — which is exactly when a learner leaves — so
 * the position would come back one advance stale. `visibilitychange → hidden` and `pagehide` write
 * the CURRENT position synchronously, off a ref the commit keeps up to date, and between them they
 * fire on every path a phone actually takes (home button, app switcher, tab close, bfcache). An
 * unchanged position leaves the state object untouched, so nothing re-renders and no screen sees a
 * flush happen — it costs one rewrite of a document that already said the same thing, which is the
 * right price for the last moment the app is certain it can still write.
 *
 * **Coming back is a `resume` prop, and it is deliberately NOT a second `startSession`** (#99):
 * the count and the review queue's tick were spent when the session opened, and charging a learner
 * a session for closing their tab is the divergence PRD §17 names. The hub restores the snapshot's
 * index here, and the plan it hands over IS the snapshot's own queue (`resume.ts`).
 *
 * **Leaving the route ends the session** (`AppShell`), with the position kept. That is still the
 * only way out of a session other than finishing it.
 */
import { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useModules } from '../../course/content.ts';
import type { L2Written } from '../../course/manifest.ts';
import type { Sentence } from '../../course/types.ts';
import { MARKS_PER_SENTENCE } from '../../engine/exit.ts';
import type { SessionPlan } from '../../engine/session.ts';
import { RevealCard, type RevealResult } from '../../components/RevealCard.tsx';
import { WhyPanel } from '../../components/WhyPanel.tsx';
import { useAppStore } from '../../state/store.ts';
import type { SessionSnapshot } from '../../state/types.ts';
import { rungLabel } from '../ladder/rungLabel.ts';
import { moduleIdOf } from '../sentence/sentenceId.ts';
import { SessionSummary } from './SessionSummary.tsx';
import { Tick } from './Tick.tsx';
import styles from './Session.module.css';

/** Shared, so a course with no counters yet reads the same map every render. */
const NO_COUNTERS: Readonly<Record<string, number>> = {};

/**
 * Everything the session holds that is not in the plan: where the learner is, and what they have
 * done since the first card. The counts are the summary's, and they are counted here rather than
 * derived from the store afterwards — "got it this session" is a different number from "got it
 * ever", and only one of them is a session's own.
 */
interface Live {
  /** Position in the plan's card list. Nothing but a mark moves it. */
  idx: number;
  /** The summary is on screen — the session's last state, and where the snapshot is cleared. */
  done: boolean;
  gotIt: number;
}

interface SessionProps {
  courseId: string;
  /** The rung being practised — which of the cards a mark should count towards its exit gate. */
  rungIds: readonly string[];
  /** What this session serves, taken once at `startSession` (`engine/session.ts`). */
  plan: SessionPlan;
  /**
   * Where an INTERRUPTED session picks up (#99) — the per-course snapshot's index. Absent on a
   * fresh session, which opens at the first card.
   */
  resume?: { idx: number };
  /** The course's writing direction — every word on screen is its content or its copy. */
  dir?: string;
  /** The tags the L2 lines are written in (#186); everything else is L1 and inherits. */
  l2?: L2Written;
}

export function Session({ courseId, rungIds, plan, resume, dir, l2 }: SessionProps) {
  const recordReview = useAppStore((store) => store.recordReview);
  const recordProduction = useAppStore((store) => store.recordProduction);
  const setSession = useAppStore((store) => store.setSession);
  const production = useAppStore((store) => store.courses[courseId]?.production) ?? NO_COUNTERS;

  const cards = plan.cardIds;

  // `setLive`, never `setState`: `src/state/unlockPath.test.ts` scans the shell for that call and
  // the store's actions are the only place allowed to make it (Invariant 1).
  const [live, setLive] = useState<Live>(() => ({
    // Clamped, because a snapshot can outlive the queue it indexes: a resumed session must land on
    // a real card rather than on the blank one an out-of-range index draws.
    idx: Math.min(Math.max(0, resume?.idx ?? 0), Math.max(0, cards.length - 1)),
    done: false,
    // Zero on a resume too: this counts THIS sitting's cards, which is what the summary is about.
    // What the interrupted half earned is already in the counters and the review queue — those are
    // the numbers that keep, and nothing here re-counts them.
    gotIt: 0,
  }));

  /* ------------------------------------------------------------------ the material */

  /** Which cards are the rung's. A Set because it is asked once per mark and once per render. */
  const inRung = useMemo(() => new Set(rungIds), [rungIds]);

  // The earlier-rung cards routinely come from several different modules, so the session loads
  // whatever modules its ids name — silently, through the content layer's cache (`useModules`,
  // #81/#94).
  const moduleIds = useMemo(
    () => [...new Set(cards.map((id) => moduleIdOf(id)).filter(isModuleId))],
    [cards],
  );
  const modules = useModules(moduleIds);
  const sentences = useMemo(() => {
    const byId = new Map<string, Sentence>();
    for (const module of modules.values()) {
      for (const sentence of module.sentences) byId.set(sentence.id, sentence);
    }
    return byId;
  }, [modules]);

  /* --------------------------------------------------------------- the snapshot */

  /**
   * Where the learner is, as of this render — `null` at the summary, because a session that
   * reached its end is not one to resume. Memoised so it only changes when the position does.
   */
  const position = useMemo<SessionSnapshot | null>(
    () => (live.done ? null : { idx: live.idx, queue: [...cards] }),
    [live.done, live.idx, cards],
  );

  /**
   * The same position, held where an event listener can read it — and kept up to date in a LAYOUT
   * effect, which is the whole trick: layout effects run synchronously with the commit, while the
   * write below is a passive effect and therefore scheduled. So this ref always holds the card
   * that is actually on screen, and the flush can persist it without waiting for work the browser
   * may never get round to running.
   */
  const pending = useRef(position);
  useLayoutEffect(() => {
    pending.current = position;
  }, [position]);

  // Written on every advance, cleared at the summary (PRD §8 F7). It is an effect because it is a
  // write, and `setSession` ignores an unchanged position — so a re-render that has not moved
  // touches neither the store nor localStorage.
  useEffect(() => {
    setSession(courseId, position);
  }, [courseId, position, setSession]);

  /**
   * THE FLUSH (#99) — the position, written the moment the page goes away.
   *
   * A phone leaves a session by backgrounding it, not by finishing it, and the effect above is
   * scheduled work: between the tap that moved the card and React committing that write, the OS
   * can freeze or discard the page and the last advance is simply lost. `visibilitychange →
   * hidden` is the one event that fires on every one of those paths (home button, app switcher,
   * tab switch, close) and `pagehide` catches the bfcache/unload path the older Safaris take, so
   * between them the stored position is exact rather than one card stale.
   *
   * It writes SYNCHRONOUSLY, off the ref — the whole point is not to be scheduled — and an
   * unchanged position is not a state change, so the ordinary path re-renders nothing.
   */
  useEffect(() => {
    const flush = (): void => setSession(courseId, pending.current);
    const onVisibility = (): void => {
      // Only `hidden`: coming BACK is not a moment to write, and a visible tab's position is
      // already whatever the effect above last wrote.
      if (document.visibilityState === 'hidden') flush();
    };

    document.addEventListener('visibilitychange', onVisibility);
    window.addEventListener('pagehide', flush);
    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('pagehide', flush);
    };
  }, [courseId, setSession]);

  /* ----------------------------------------------------------------- the mark */

  /**
   * A card, marked — the routing contract in the header, as code. One handler, because there is
   * one card type; the branch is a question about the SENTENCE (whose rung is it?), which is the
   * only thing that can decide what the mark is worth.
   *
   * The advance is unconditional: every mark commits its card and moves on, and the last one ends
   * the session. That is the whole interaction model of this screen.
   */
  const onMark = useCallback(
    ({ sentenceId, gotIt }: RevealResult) => {
      if (inRung.has(sentenceId)) {
        // The exit gate. Got-its only, and only up to the threshold — re-marking a sentence
        // already at the gate writes nothing (#95, and the counters never decrement).
        if (gotIt && (production[sentenceId] ?? 0) < MARKS_PER_SENTENCE) {
          recordProduction(courseId, sentenceId);
        }
      } else {
        // The Leitner queue. Both marks matter here: got-it promotes a box, a miss returns it to
        // box 1 — `engine/leitner.ts` decides which.
        recordReview(courseId, sentenceId, gotIt);
      }

      setLive((held) => ({
        ...held,
        gotIt: held.gotIt + (gotIt ? 1 : 0),
        ...(held.idx + 1 < cards.length ? { idx: held.idx + 1 } : { done: true }),
      }));
    },
    [cards.length, courseId, inRung, production, recordProduction, recordReview],
  );

  /* ------------------------------------------------------------------ the screen */

  const sentenceId = cards[live.idx];
  const sentence = sentenceId === undefined ? undefined : sentences.get(sentenceId);
  const fromRung = sentenceId === undefined ? undefined : moduleIdOf(sentenceId);
  /** The rung's sentences marked through — the exit gate's own number, and the summary's link. */
  const marked = rungIds.filter((id) => (production[id] ?? 0) >= MARKS_PER_SENTENCE).length;

  return (
    <section className={styles.session}>
      {/* The gentle elapsed tick (#98): numberless, 2px, as the prototype draws it, and the only
          time affordance in the app (PRD §2 boundary note). It runs while a CARD is on screen —
          `!live.done`, so a finished session stops accruing and the bar leaves with it — and it is
          a duration, never a clock: there is no time string anywhere in this session
          (Invariant 2). */}
      <Tick active={!live.done} />

      {live.done && (
        <SessionSummary
          gotIt={live.gotIt}
          total={cards.length}
          marked={marked}
          rungTotal={rungIds.length}
          dir={dir}
        />
      )}

      {!live.done && sentence !== undefined && sentenceId !== undefined && (
        <div className={styles.card}>
          <div className={styles.head}>
            {/* Structural furniture, like the module list's `M1 · MODULE` — raised on #71. A card
                from an earlier rung says so, because a sentence the learner last saw three rungs
                ago arriving unannounced reads as a mistake. A card from the rung they are on needs
                no such note: it is what they came here for. */}
            <p className={styles.kicker}>
              {inRung.has(sentenceId)
                ? rungLabel(fromRung ?? '')
                : `FROM ${rungLabel(fromRung ?? '')}`}
            </p>
            {/* Counts, never time — and no English "of": the shell owns neither word (#88, #89). */}
            <p className={styles.position}>
              {live.idx + 1} / {cards.length}
            </p>
          </div>

          <RevealCard
            // Keyed by the position, not the sentence: the session can serve one sentence twice
            // (`engine/session.ts` pads a short ladder with the rung), and a key that repeated
            // would hand the second showing the first one's revealed state.
            key={`${live.idx}-${sentenceId}`}
            sentenceId={sentenceId}
            cue={sentence.cue}
            display={sentence.display}
            script={sentence.script ?? undefined}
            why={<WhyPanel sentenceId={sentenceId} display={sentence.display} dir={dir} l2={l2} />}
            onResult={onMark}
            dir={dir}
            l2={l2}
          />
        </div>
      )}

      {/* A card whose module has not arrived yet (or never will) is nothing to draw: the session
          waits rather than inventing a sentence, and the other cards are unaffected. */}
      {!live.done && sentence === undefined && <div className={styles.card} aria-busy="true" />}
    </section>
  );
}

/** `moduleIdOf` answers `null` for anything that is not a sentence id; those name no module. */
function isModuleId(moduleId: string | null): moduleId is string {
  return moduleId !== null;
}
