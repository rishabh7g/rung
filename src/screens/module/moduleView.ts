/**
 * Where the module list was when the learner left it (#88, #217; PRD-design §6.4: "scroll restore
 * on back").
 *
 * **One number, because there is one thing to remember.** The list used to hold open cards too,
 * back when a card expanded in place; since #217 a card is a link into Sentence Detail and has no
 * state of its own, so the remembered view is exactly the scroll offset.
 *
 * **This is not progress, so it is not in the store.** `src/state/` is one persisted document
 * whose shape is the export contract (#82, PRD §8 F7) — everything in it is something the learner
 * earned and would want back on a new device. How far down a list a thumb had got is neither: it
 * is the current visit's UI, it means nothing tomorrow, and it must never ride along in an
 * export. So it lives in **`sessionStorage`**, which is exactly that lifetime — this tab, until
 * it closes — under its own key namespace, and nothing reads it but the screen that wrote it.
 *
 * One record per course + module, because a module's positions mean nothing to another module and
 * a course switch must not restore hi-mr's scroll into en-ar's list (Invariant 8).
 *
 * Every access is wrapped: `sessionStorage` throws on access in a locked-down browser (Safari's
 * private mode, an embedded webview with storage disabled), and a screen that cannot remember a
 * scroll offset must still render the module. A failed read is "nothing remembered"; a failed
 * write is nothing at all.
 */

/** What the module list remembers between visits. Transient by definition. */
export interface ModuleView {
  /** The shell's scroll offset when the learner left, in CSS pixels. */
  scrollTop: number;
}

/** A module nobody has visited this session: the top of the list. */
export const EMPTY_MODULE_VIEW: ModuleView = { scrollTop: 0 };

/**
 * `rung:module-view:<courseId>:<moduleId>` — its own namespace beside the store's `rung:state`,
 * so it is obvious at a glance in devtools that this key is not progress.
 */
export function moduleViewKey(courseId: string, moduleId: string): string {
  return `rung:module-view:${courseId}:${moduleId}`;
}

/**
 * What was remembered for `key`, or the empty view — a bad record is treated as no record.
 *
 * It reads a field at a time rather than trusting the record's shape, which is also what makes it
 * tolerant of a record written before #217: a leftover `expanded` array is simply not asked for,
 * and a session already open when the new build loaded restores its scroll offset as usual.
 */
export function readModuleView(key: string): ModuleView {
  let raw: string | null;
  try {
    raw = sessionStorage.getItem(key);
  } catch {
    return EMPTY_MODULE_VIEW;
  }
  if (raw === null) return EMPTY_MODULE_VIEW;

  try {
    const payload: unknown = JSON.parse(raw);
    if (payload === null || typeof payload !== 'object') return EMPTY_MODULE_VIEW;

    const { scrollTop } = payload as Partial<ModuleView>;
    return {
      scrollTop: typeof scrollTop === 'number' && Number.isFinite(scrollTop) ? scrollTop : 0,
    };
  } catch {
    return EMPTY_MODULE_VIEW;
  }
}

/** Remembers `view` for `key`. Storage that refuses to hold it costs the learner a scroll offset. */
export function writeModuleView(key: string, view: ModuleView): void {
  try {
    sessionStorage.setItem(key, JSON.stringify(view));
  } catch {
    // A browser with storage switched off still browses modules; it just always opens at the top.
  }
}
