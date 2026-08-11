/**
 * The level strip (#86) — three cells, ten mini squares each, and the seal rule made visible
 * (PRD-design §5; design/tokens.md §6 "Level strip cell").
 *
 * It is the whole ladder at a glance: where the learner is (the active cell wears a 2 px accent
 * top bar and an accent label), what is behind them (squares in `--dot-done`), and what is not
 * theirs yet (a sealed cell is muted, wears a lock, and its squares are `--level-sealed`).
 *
 * **Only a sealed cell is interactive**, and that is the design rather than an oversight: the
 * active cell is the screen the learner is already on, so tapping it has nothing to do, while a
 * sealed one owes an answer — a counts-only toast naming what is left below it (PRD-design §5:
 * "sealed cells toast honestly when tapped"). So sealed cells are `<button>`s and open ones are
 * not, and nothing renders a control that does nothing.
 *
 * The component is presentational: every state on it is derived by the screen from
 * `src/engine/progression.ts` and handed over. It carries one word of its own — the English
 * "LEVEL" kicker, structural furniture the way the nav's tab labels are — and every learner-facing
 * word in it (the level's name and tagline) comes from the course's own `levels.json`.
 */
import { Lock } from 'lucide-react';
import beat from './unlockBeat.module.css';
import styles from './LevelStrip.module.css';

/** What one mini square says about one rung. Ten per cell, in ladder order. */
export type SquareState = 'passed' | 'current' | 'pending' | 'sealed';

export interface LevelCell {
  /** 1-based position in the ladder — what the kicker prints and the toast names. */
  level: number;
  /** The level's own name and tagline, from `levels.json`: "Foundations" · "say what you need". */
  name: string;
  tagline: string;
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
  /** The course's writing direction, for the name line — the only course copy in here. */
  dir?: string;
  /** Called with the sealed cell's level number; the screen turns it into the honest toast. */
  onSealedTap: (level: number) => void;
}

export function LevelStrip({ cells, dir, onSealedTap }: LevelStripProps) {
  return (
    <div className={styles.strip}>
      {cells.map((cell) => {
        const body = (
          <>
            <span className={styles.head}>
              <span className={cell.sealed ? styles.labelSealed : styles.label}>
                {/* Structural furniture, not copy: the level's own words are the line below. */}
                LEVEL {cell.level}
              </span>
              {cell.sealed && <Lock className={styles.lock} aria-hidden="true" />}
            </span>
            <span className={styles.name} dir={dir}>
              {cell.name} — {cell.tagline}
            </span>
            <span className={styles.squares}>
              {cell.squares.map((square, index) => (
                <span key={index} className={SQUARE_CLASS[square]} />
              ))}
            </span>
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
