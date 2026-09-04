/**
 * The level strip (#86, compacted by #398) — one row of level chips, and the seal rule made
 * visible (PRD-design §5; design/tokens.md §6 "Level strip cell").
 *
 * It is the whole ladder at a glance: where the learner is (the active chip wears a 2 px accent
 * top bar and an accent label, over its rungs as mini squares), and what is not theirs yet (a
 * sealed chip is muted and wears a lock).
 *
 * **It used to be three tall cells**, each carrying the level's name and tagline from
 * `levels.json` and ten squares of its own — sticky, so they held roughly a third of the viewport
 * for the whole scroll, including while the learner read six locked rungs at the bottom of the
 * page. Two of the three are sealed for months, and their content is not authored: every course's
 * L2 and L3 ladders ship `draft: true`. So the strip was advertising unbuilt work from the most
 * expensive real estate in the app. The names and taglines can come back when the levels do, and
 * they will read as a promise then rather than as a tease.
 *
 * A sealed chip draws no squares either: ten identical greyed boxes said nothing its lock does
 * not, and they were most of what made a cell tall.
 *
 * **Only a sealed cell is interactive**, and that is the design rather than an oversight: the
 * active cell is the screen the learner is already on, so tapping it has nothing to do, while a
 * sealed one owes an answer — a counts-only toast naming what is left below it (PRD-design §5:
 * "sealed cells toast honestly when tapped"). So sealed cells are `<button>`s and open ones are
 * not, and nothing renders a control that does nothing.
 *
 * The component is presentational: every state on it is derived by the screen from
 * `src/engine/progression.ts` and handed over, and its one word is the course's — the chip's
 * kicker out of `strings.json` (`levelStrip.level`, #351 — it was the English "LEVEL", held back
 * as furniture in the register of the nav's tab labels until the nav's labels stopped being
 * English too).
 */
import { Lock } from 'lucide-react';
import { interpolate, useStrings } from '../../course/strings.ts';
import beat from './unlockBeat.module.css';
import styles from './LevelStrip.module.css';

/** What one mini square says about one rung. Ten per cell, in ladder order. */
export type SquareState = 'passed' | 'current' | 'pending' | 'sealed';

export interface LevelCell {
  /** 1-based position in the ladder — what the kicker prints and the toast names. */
  level: number;
  sealed: boolean;
  /** The level the rung list below the strip is showing. Exactly one cell is active. */
  active: boolean;
  /**
   * This level unsealed a moment ago: play the unlock beat on the cell ([Q4]'s recommendation,
   * PRD-design §12.3 — the rung's own beat, on the cell and on its first rung, same duration).
   * The screen decides, off a one-shot flag it consumes; the strip only renders the answer.
   */
  unsealed?: boolean;
  squares: readonly SquareState[];
}

interface LevelStripProps {
  cells: readonly LevelCell[];
  /** Called with the sealed cell's level number; the screen turns it into the honest toast. */
  onSealedTap: (level: number) => void;
}

export function LevelStrip({ cells, onSealedTap }: LevelStripProps) {
  const strings = useStrings();

  return (
    <div className={styles.strip}>
      {cells.map((cell) => {
        const body = (
          <>
            <span className={styles.head}>
              <span className={cell.sealed ? styles.labelSealed : styles.label}>
                {interpolate(strings['levelStrip.level'], { level: cell.level })}
              </span>
              {cell.sealed && <Lock className={styles.lock} aria-hidden="true" />}
            </span>
            {/* A sealed level draws no squares: ten identical greyed boxes said nothing the
                lock does not, and they were most of the strip's height (#398). */}
            {!cell.sealed && (
              <span className={styles.squares}>
                {cell.squares.map((square, index) => (
                  <span key={index} className={SQUARE_CLASS[square]} />
                ))}
              </span>
            )}
          </>
        );

        const className = [
          cell.active ? styles.cellActive : styles.cell,
          cell.unsealed === true ? beat.beat : null,
        ]
          .filter(Boolean)
          .join(' ');

        return cell.sealed ? (
          <button
            key={cell.level}
            type="button"
            className={className}
            onClick={() => onSealedTap(cell.level)}
          >
            {body}
          </button>
        ) : (
          // The beat's own handle, for a test and a live walk: the class name is a hash, and a
          // sealed cell never carries one — nothing celebrates a level that did not open.
          <div
            key={cell.level}
            className={className}
            data-beat={cell.unsealed === true ? 'level' : undefined}
          >
            {body}
          </div>
        );
      })}
    </div>
  );
}

/** One composed class per square state — the CSS does the sharing (`composes: square`). */
const SQUARE_CLASS: Readonly<Record<SquareState, string | undefined>> = {
  passed: styles.squarePassed,
  current: styles.squareCurrent,
  pending: styles.squarePending,
  sealed: styles.squareSealed,
};
