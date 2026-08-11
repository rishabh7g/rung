/**
 * How the Ladder prints a module id: `L1-M3` → `M3`, the way the prototype labels its rungs
 * (design/Rung App v3.3.dc.html → Ladder).
 *
 * **Display only.** Nothing derives meaning from the shape of an id — a rung's position is the
 * ladder's order, which is the engine's whole answer (`src/engine/progression.ts`). It lives in
 * its own module because both the rows (`LadderScreen`) and the card (`RungCard`) print it, and
 * the screen imports the card: a helper exported from either one would be a cycle or a copy.
 */
export function rungLabel(moduleId: string): string {
  return moduleId.split('-').at(-1) ?? moduleId;
}
