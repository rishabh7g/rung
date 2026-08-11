/**
 * Which module a sentence id belongs to: `L1-M1-S02` → `L1-M1` (#89).
 *
 * Sentence Detail is reached as `/sentence/:id` and nothing else is in the URL, so the module is
 * read back out of the id — the one place in the app that derives meaning from the SHAPE of an
 * id, and it is derivation rather than knowledge: the schema fixes a sentence id as its module's
 * id plus `-S<nn>` (`content/schema/module.schema.json`), and the build fails a file whose ids
 * do not (`tools/validate.ts`, filename ↔ id). Everything downstream — which sentences are the
 * prev/next, whether the rung is the learner's to open — comes from the module file itself.
 *
 * **A comprehension item's id answers the same way** (`L1-M1-C01` → `L1-M1`, #102): the schema
 * fixes that shape just as tightly (`poolItemId`, `<moduleId>-C<nn>`), and the question the
 * callers ask is the same one — which module's word index teaches this line. The exit ritual's
 * comprehension items are the reason: `WhyPanel` (#94) resolves whatever it is shown against the
 * index of the module the line came from, and a pool item comes from a module like a sentence
 * does. Nothing else changes with the letter: `/sentence/L1-M1-C01` finds no such sentence in the
 * module and lands on the module list, which is where an id that names nothing readable belongs.
 *
 * A string that is neither answers `null` rather than a guess: `/sentence/S1` is a real thing a
 * HashRouter deep link can carry, and "no module" is the honest answer that sends the screen (and
 * the shell's back chevron) to the Ladder.
 */

/** `L1-M1-S02` / `L1-M1-C01` → `L1-M1`; `null` for anything that is not `<moduleId>-[SC]<digits>`. */
export function moduleIdOf(sentenceId: string): string | null {
  return /^(.+)-[SC]\d+$/.exec(sentenceId)?.[1] ?? null;
}
