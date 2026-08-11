/**
 * Immersive mode (#84) — the layout flag a Practice session raises (PRD-design §4 [D8]:
 * "Practice sessions go immersive: nav hidden, pause ✕ always available").
 *
 * It is one boolean, and it lives in a context rather than in the store on purpose. `src/state/`
 * is the persisted document whose shape is the export contract (#82, PRD §8 F7) — a transient
 * "a session is on screen right now" flag written there would be exported, imported, and
 * restored into a build that is showing the Ladder. What the learner earned persists; what the
 * chrome is doing this second does not. Lossless resume (#99) is the other half of that split:
 * the session itself becomes a per-course snapshot in state, and this flag is only ever the
 * shell's answer to "hide the nav".
 *
 * The shell reads it in one place (`AppShell`), which is what makes the rule impossible to get
 * half-right: there is no screen that can hide the nav without also getting the pause ✕, and no
 * way to render the ✕ without the nav being gone.
 */
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

export interface ImmersiveValue {
  /** True while a session is running: the bottom nav is gone and the pause ✕ is the way out. */
  immersive: boolean;
  /** Raised by the screen running the session — today Practice, and only Practice. */
  enterSession: () => void;
  /** The pause ✕, a route change, and the session ending all land here. */
  exitSession: () => void;
}

const ImmersiveContext = createContext<ImmersiveValue | null>(null);

interface ImmersiveProviderProps {
  children: ReactNode;
}

export function ImmersiveProvider({ children }: ImmersiveProviderProps) {
  const [immersive, setImmersive] = useState(false);
  // Stable identities: `AppShell` ends a session from an effect keyed on the route, so an
  // exitSession that changed every render would end one on every render too.
  const enterSession = useCallback(() => setImmersive(true), []);
  const exitSession = useCallback(() => setImmersive(false), []);

  const value = useMemo(
    () => ({ immersive, enterSession, exitSession }),
    [immersive, enterSession, exitSession],
  );

  return <ImmersiveContext.Provider value={value}>{children}</ImmersiveContext.Provider>;
}

/** The flag's read handle. Throws above the provider — a wiring bug, not a state to render. */
export function useImmersive(): ImmersiveValue {
  const value = useContext(ImmersiveContext);
  if (value === null) {
    throw new Error('useImmersive() must be called inside <ImmersiveProvider>');
  }
  return value;
}
