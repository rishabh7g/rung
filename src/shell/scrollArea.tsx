/**
 * The shell's one scroll area, handed to the screen inside it (#88).
 *
 * `AppShell`'s `<main>` is the only element in the app that scrolls (design/pwa-checklist.md §1:
 * the app column is `100dvh` and never scrolls), so a screen that needs to read or move a scroll
 * position — the module list restoring where the learner was, PRD-design §6.4 — has to ask the
 * shell for it rather than own one. Two things fall out of that, and both are the point:
 *
 *   • **The screen does not go looking for it.** No `document.querySelector('main')`, no walking
 *     up parent nodes for an `overflow` — the frame publishes the element it owns.
 *   • **A screen rendered outside the shell still renders.** `useScrollArea()` answers `null`
 *     there (a component test, `/dev/type`), and every caller treats "no scroll area" as "nothing
 *     to restore" rather than as an error.
 *
 * The value is the element itself, held in state by whoever provides it: it arrives once, when
 * the shell mounts, and a screen that reads it in an effect can list it as a dependency and be
 * re-run the one time it appears. A ref would hand every consumer something it must not read
 * while rendering.
 */
import { createContext, useContext } from 'react';

export const ScrollAreaContext = createContext<HTMLElement | null>(null);

/**
 * The scrolling element this screen lives in, or `null` outside the shell. Use it from an effect
 * — reading or writing a scroll offset during a render is a layout read either way.
 */
export function useScrollArea(): HTMLElement | null {
  return useContext(ScrollAreaContext);
}

/**
 * Moves the shell's scroll area, and the only place in the app that writes a scroll offset.
 *
 * It is a function here rather than an assignment at the call site for a real reason: the scroll
 * area reaches a screen through context, and a screen may not modify what a hook handed it
 * (`react-hooks/immutability`) — the frame owns the element, so the frame owns the write. A
 * screen with no scroll area (a component test, `/dev/type`) asks for nothing and gets nothing.
 */
export function setScrollOffset(area: HTMLElement | null, top: number): void {
  if (area === null) return;
  area.scrollTop = top;
}
