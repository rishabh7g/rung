/**
 * The session (#96; PRD §8 F4, PRD-design §6.3, flow 3) — the 20–30 minutes the whole product is
 * built around, running immersive: Review → Read → Produce as soft chips, ending on a counts-only
 * summary.
 *
 * **THE ROUTING CONTRACT LIVES HERE, AND NOWHERE ELSE.** The self-mark control is deliberately
 * identical in every phase ([D11], `components/SelfMark`) and the reveal card imports no store at
 * all — it emits `onResult({sentenceId, gotIt})` and stops (#93). So the phase, which is the only
 * thing that decides what a mark COSTS, is this component's knowledge:
 *
 * | phase | a mark goes to | and never to |
 * |---|---|---|
 * | Review | `recordReview` → `applyMark` on the Leitner queue (box + countdown) | the production counters |
 * | Produce | `recordProduction` on a got-it — the counter that opens the exit ritual | the review queue |
 *
 * They are different numbers answering different questions — Review measures what is being KEPT,
 * production measures what is being BUILT — and crossing them would open a rung's exit ritual on
 * sentences the learner never produced (PRD §8 F1). One `onResult` handler per phase, and they are
 * two functions rather than one with a branch inside it, so the wiring is legible in the diff.
 *
 * **The chips guide, they never gate** (`PhaseChips`): every phase is one tap away at any moment,
 * in any order, and the session is finished whenever the learner says it is — leaving the route
 * ends it (`AppShell`), with the position kept.
 *
 * **The position is snapshotted per course on every advance** (PRD §8 F7 — `session`), written
 * through `setSession` and cleared at the summary. Nothing else about a session persists: what the
 * learner earned is in the counters and the queue, and this is only where they were. Restoring it
 * — a resume banner, and `startSession` deliberately NOT called again — is #99's.
 *
 * **Read (#97) is the phase that costs nothing.** It writes to neither queue: its pager moves the
 * position and hands over to Produce at the end of the rung, which is why it needs no `onResult`
 * of its own. `ReadPhase` draws the card; the position stays here, because the snapshot is here.
 */
import { useCallback, useEffect, useMemo, useState } from 'react';
import { useModules } from '../../course/content.ts';
import { useStrings } from '../../course/strings.ts';
import type { Sentence } from '../../course/types.ts';
import { PRODUCTIONS_PER_SENTENCE } from '../../engine/exit.ts';
import type { SessionPlan } from '../../engine/session.ts';
import { RevealCard, type RevealResult } from '../../components/RevealCard.tsx';
import { WhyPanel } from '../../components/WhyPanel.tsx';
import { useAppStore } from '../../state/store.ts';
import type { SessionPhase } from '../../state/types.ts';
import { Toast, useToast } from '../../shell/Toast.tsx';
import { rungLabel } from '../ladder/rungLabel.ts';
import { ProductionDots } from '../module/ProductionDots.tsx';
import { moduleIdOf } from '../sentence/sentenceId.ts';
import { PhaseChips } from './PhaseChips.tsx';
import { ReadPhase } from './ReadPhase.tsx';
import { SessionSummary } from './SessionSummary.tsx';
import styles from './Session.module.css';

/** Shared, so a course with no counters yet reads the same map every render. */
const NO_COUNTERS: Readonly<Record<string, number>> = {};

/**
 * Everything the session holds that is not in the plan: where the learner is, and what they have
 * done since the first card. The counts are the summary's, and they are counted here rather than
 * derived from the store afterwards — "produced this session" is a different number from "produced
 * ever", and only one of them is a session's own.
 */
interface Live {
  phase: SessionPhase;
  /** Position in the current phase's queue. A phase change resets it; nothing else moves it. */
  idx: number;
  /** The summary is on screen — the session's last state, and where the snapshot is cleared. */
  done: boolean;
  reviewed: number;
  gotIt: number;
  produced: number;
}

interface SessionProps {
  courseId: string;
  /** The rung being practised — its sentences are Read's and Produce's material. */
  moduleId: string;
  /** The rung's sentence ids in the module's own order (Read's order, and the summary's total). */
  sentenceIds: readonly string[];
  /** What this session serves, taken once at `startSession` (`engine/session.ts`). */
  plan: SessionPlan;
  /** The course's writing direction — every word on screen is its content or its copy. */
  dir?: string;
}

export function Session({ courseId, moduleId, sentenceIds, plan, dir }: SessionProps) {
  const strings = useStrings();
  const toast = useToast();
  const recordReview = useAppStore((store) => store.recordReview);
  const recordProduction = useAppStore((store) => store.recordProduction);
  const setSession = useAppStore((store) => store.setSession);
  const production = useAppStore((store) => store.courses[courseId]?.production) ?? NO_COUNTERS;

  // `setLive`, never `setState`: `src/state/unlockPath.test.ts` scans the shell for that call and
  // the store's actions are the only place allowed to make it (Invariant 1).
  const [live, setLive] = useState<Live>(() => ({
    // A session with nothing due opens at Read (`startSession` wrote the same phase into the
    // snapshot); the Review chip is still there, and still answers.
    phase: plan.reviewIds.length > 0 ? 'review' : 'read',
    idx: 0,
    done: false,
    reviewed: 0,
    gotIt: 0,
    produced: 0,
  }));

  /* ------------------------------------------------------------------ the material */

  // Review's five cards routinely come from five different rungs, so the session loads whatever
  // modules its ids name — silently, through the content layer's cache (`useModules`, #81/#94).
  const moduleIds = useMemo(
    () => [
      ...new Set([moduleId, ...plan.reviewIds.map((id) => moduleIdOf(id)).filter(isModuleId)]),
    ],
    [moduleId, plan.reviewIds],
  );
  const modules = useModules(moduleIds);
  const sentences = useMemo(() => {
    const byId = new Map<string, Sentence>();
    for (const module of modules.values()) {
      for (const sentence of module.sentences) byId.set(sentence.id, sentence);
    }
    return byId;
  }, [modules]);

  /** The ids the phase on screen serves — the queue the snapshot records. */
  const queue = useMemo(() => {
    if (live.phase === 'review') return plan.reviewIds;
    if (live.phase === 'produce') return plan.produceIds;
    return sentenceIds;
  }, [live.phase, plan.reviewIds, plan.produceIds, sentenceIds]);

  /* --------------------------------------------------------------- the snapshot */

  // Written on every advance and every phase change, cleared at the summary (PRD §8 F7). It is an
  // effect because it is a write, and `setSession` ignores an unchanged position — so a re-render
  // that has not moved touches neither the store nor localStorage.
  useEffect(() => {
    setSession(
      courseId,
      live.done ? null : { phase: live.phase, idx: live.idx, queue: [...queue] },
    );
  }, [courseId, live.done, live.phase, live.idx, queue, setSession]);

  /* ----------------------------------------------------------------- the marks */

  /**
   * A REVIEW mark: the Leitner queue, and nothing else. Got-it promotes a box, a miss returns it
   * to box 1 — `engine/leitner.ts` decides which, `recordReview` writes it, and the production
   * counters are not in this function.
   */
  const onReview = useCallback(
    ({ sentenceId, gotIt }: RevealResult) => {
      recordReview(courseId, sentenceId, gotIt);
      setLive((held) => ({
        ...held,
        reviewed: held.reviewed + 1,
        gotIt: held.gotIt + (gotIt ? 1 : 0),
        // The last review card hands over to Read, which is where the session goes next.
        ...(held.idx + 1 < plan.reviewIds.length
          ? { idx: held.idx + 1 }
          : { phase: 'read' as const, idx: 0 }),
      }));
    },
    [courseId, plan.reviewIds.length, recordReview],
  );

  /**
   * A PRODUCE mark: the production counters, and nothing else — and only on a got-it. A missed
   * sentence writes nothing at all (the counters only ever count up, #95) and the review queue is
   * not in this function either.
   */
  const onProduce = useCallback(
    ({ sentenceId, gotIt }: RevealResult) => {
      if (gotIt) recordProduction(courseId, sentenceId);
      setLive((held) => ({
        ...held,
        produced: held.produced + (gotIt ? 1 : 0),
        ...(held.idx + 1 < plan.produceIds.length ? { idx: held.idx + 1 } : { done: true }),
      }));
    },
    [courseId, plan.produceIds.length, recordProduction],
  );

  /* ------------------------------------------------------------------ reading */

  /**
   * Read's pager, and the whole of what Read costs: a position. No box moves, no counter moves —
   * the phase between the two that write is the one that does not (PRD §8 F4). Back is never
   * called on the first sentence; the control is disabled there, and the clamp is belt-and-braces.
   */
  const onReadPrev = useCallback(() => {
    setLive((held) => ({ ...held, idx: Math.max(0, held.idx - 1) }));
  }, []);

  /** Next — and, on the rung's last sentence, the hand-over to Produce (PRD-design §6.3). */
  const onReadNext = useCallback(() => {
    setLive((held) =>
      held.idx + 1 < sentenceIds.length
        ? { ...held, idx: held.idx + 1 }
        : { ...held, phase: 'produce' as const, idx: 0 },
    );
  }, [sentenceIds.length]);

  /**
   * A chip. Every phase is reachable from every phase — except that Review with nothing due
   * answers instead of opening, in the course's own words. That is a message, not a lock.
   */
  const onJump = useCallback(
    (phase: SessionPhase) => {
      if (phase === 'review' && plan.reviewIds.length === 0) {
        toast.show(strings['practice.nothingDue']);
        return;
      }
      setLive((held) => ({ ...held, phase, idx: 0, done: false }));
    },
    [plan.reviewIds.length, strings, toast],
  );

  /* ------------------------------------------------------------------ the screen */

  const sentenceId = queue[live.idx];
  const sentence = sentenceId === undefined ? undefined : sentences.get(sentenceId);
  /** The rung's sentences standing at the two the exit ritual asks for — the summary's last count. */
  const atTwo = sentenceIds.filter(
    (id) => (production[id] ?? 0) >= PRODUCTIONS_PER_SENTENCE,
  ).length;

  return (
    <section className={styles.session}>
      {/* The chips stay up at the summary, as they do in the prototype: a finished session is
          still a session, and going back for one more card is the learner's call. */}
      <PhaseChips phase={live.phase} onJump={onJump} dir={dir} />

      {/* The gentle elapsed tick sits here in the prototype, under the chips — numberless, 2px,
          and #98's. There is no time string anywhere in this session (Invariant 2). */}

      {live.done && (
        <SessionSummary
          reviewed={live.reviewed}
          gotIt={live.gotIt}
          produced={live.produced}
          atTwo={atTwo}
          total={sentenceIds.length}
          dir={dir}
        />
      )}

      {/* Read (#97): one sentence, its cue behind a toggle, and a pager that ends in Produce.
          It is keyed by nothing on purpose — the nudge is shown once per PHASE, and a key per
          sentence would remount it (and the cue toggle) under every card. */}
      {!live.done && live.phase === 'read' && sentence !== undefined && (
        <ReadPhase
          moduleId={moduleId}
          sentence={sentence}
          at={live.idx}
          total={queue.length}
          onPrev={onReadPrev}
          onNext={onReadNext}
          dir={dir}
        />
      )}

      {!live.done &&
        live.phase !== 'read' &&
        sentence !== undefined &&
        sentenceId !== undefined && (
          <div className={styles.card}>
            <div className={styles.head}>
              {/* Structural furniture, like the module list's `M1 · MODULE` — raised on #71. */}
              <p className={styles.kicker}>
                {live.phase === 'review'
                  ? `REVIEW · FROM ${rungLabel(moduleIdOf(sentenceId) ?? moduleId)}`
                  : `PRODUCE · ${rungLabel(moduleId)}`}
              </p>
              {/* The rung's own two dots on a Produce card, exactly as the prototype draws them. */}
              {live.phase === 'produce' && (
                <ProductionDots produced={production[sentenceId] ?? 0} direction="row" />
              )}
              {/* Counts, never time — and no English "of": the shell owns neither word (#88, #89). */}
              <p className={styles.position}>
                {live.idx + 1} / {queue.length}
              </p>
            </div>

            <RevealCard
              // Keyed by the card, so the next cue can never arrive with the last answer under it.
              key={sentenceId}
              sentenceId={sentenceId}
              cue={sentence.cue}
              display={sentence.display}
              script={sentence.script ?? undefined}
              mode={live.phase === 'review' ? 'review' : 'produce'}
              why={
                <WhyPanel
                  sentenceId={sentenceId}
                  display={sentence.display}
                  // Produce cards offer "open full", Review cards do not (PRD §8 F4): leaving a
                  // review for a whole screen of answers is leaving the recall behind.
                  openFull={live.phase === 'produce'}
                  dir={dir}
                />
              }
              onResult={live.phase === 'review' ? onReview : onProduce}
              dir={dir}
            />
          </div>
        )}

      {/* A card whose module has not arrived yet (or never will) is nothing to draw: the session
          waits rather than inventing a sentence, and the phase's other cards are unaffected. Read
          waits the same way — a rung whose file is still in flight has no sentence to read. */}
      {!live.done && sentence === undefined && <div className={styles.card} aria-busy="true" />}

      <Toast message={toast.message} dir={dir} />
    </section>
  );
}

/** `moduleIdOf` answers `null` for anything that is not a sentence id; those name no module. */
function isModuleId(moduleId: string | null): moduleId is string {
  return moduleId !== null;
}
