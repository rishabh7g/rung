# en-de L2 — LLM review

The review that clears each en-de L2 wave to ship, written in the same change that authors it
(`CLAUDE.md`, "Ship `verified: true` in the authoring change"). The **native-speaker gate is a
separate, stricter bar and stays unmet**: every section below ends in open questions for a native
pass, and no later wave may close one of them by rewriting a shipped module.

Open questions are numbered as a fresh en-de L2 chain from 1.

## Wave 1 — L2-M1, L2-M2 (#441)

Authored against the briefs written by #432 and the decisions recorded in `docs/59`.

### L2-M1 "Asking politely" — the most expensive register decision in the repo, paid

L1 spoke `Sie` and said in advance why it could afford to: `Sie` takes the PLURAL verb, so its form
is spelled exactly like the infinitive and cost the index **nothing at all**. `du` costs a second
set of endings (`bist`, `hast`, `kannst`, `möchtest`, `sprichst`), its own imperative (`komm`,
`geh`, `gib`, `hilf`) and `dein`, `dich`, `dir`. This module pays all of it, in one wave.

The grammar is the **modal bracket**, and it is the biggest single word-order delta in the course:
the modal sits in position two and its infinitive goes to the very end of the clause, with
everything else in between. M4's directions, M6's suggestions, M7's calls and M8's requests all
borrow the frame, so the module authors it in both addresses and lets the pool test where the
infinitive lands.

The dative arrives with the request, and the module says the thing that turns three idioms into one
pattern: L1-M9's `Mir ist kalt` was already a dative sentence with no grammatical subject, and
`Wie geht es dir?` is the same shape. `könnten` enters as **one frozen cell** of Konjunktiv II, the
treatment en-fr gives `je voudrais` and en-it gives `vorrei`.

### L2-M2 "Describing people"

The module **opens no row for `sie`** in any of its three readings — L1-M2 owns the key with a note
already true of all three — and restates the separating rule where it finally matters: the VERB
tells you which, because the index cannot see the capital and never will.

The possessive "her" is taught on **`ihre` alone**, which is a key nothing else holds, because L1
deliberately kept the possessive `ihr` out so `Ihr Name` could own the polite "your". Where a
masculine possession is needed the sentence takes the `von` periphrasis — ordinary spoken German,
not a workaround.

Every adjective in the level stands after `sein` and takes no ending, and the module says so as a
decision rather than leaving it to look like an oversight: an attributive adjective has to be
declined, and the declension is L3's.

### A test the L2 arrival required, and one row it forced

`src/course/types.test.ts`'s en-de case (#361) held two L1 decisions over every en-de module — the
`du`-register ban across every slot including mistake plates, and the flat `neutral` register chip.
Both are exactly what L2-M1 is chartered to lift, and both are now scoped to L1 with comments
recording why. The lost-capital check needed a narrower cut rather than a scope: L2-M2 opens the
**lowercase** possessive `ihre`, so that one word leaves the ban at L2 while `Ihr` and `Ihnen` keep
their capitals everywhere.

This is the third time this milestone a second level has exposed a test encoding the level as well
as the rule (hi-en's possessive `'s`, en-fr's `tu` ban, en-it's ladder comparator were the others).

One row the brief does not list: **`Herrn`**. `Herr` adds `-n` everywhere but the bare subject, so
`die Frau von Herrn Weber` needs it — and the alternative was a sentence about a wife called
Herr Weber, which the first draft had.

### The ratchet

Six findings across the pair, each fixed by opening the row the module needed. The en-de baseline
stays at 11.

### A red on main that is not this wave's

`scripts/verify.sh` fails one test on `main` at `d027f2d`: the splash byte-for-byte comparison
introduced by #502 is rasteriser-dependent rather than font-dependent, and this container's libvips
differs from whichever machine produced the committed PNGs. Filed as #506, with the evidence.
Everything else is green: `TYPES ok | LINT ok | TEST 444/444 ok (excluding it) | CONTENT ok |
FONTS ok | BUILD ok | BUDGET ok`.

### Open questions for the native pass

1. **The `du` law** (M1, rule 0). Confirm the framing — `Sie` never wrong with a stranger, `du` for
   friends, family, children and people who have offered it — matches current usage.
2. **`Können Sie mir bitte helfen?`** (M1-S01). Confirm the word order with `bitte` before the
   infinitive is the ordinary one.
3. **`Könnten` against `Können`** (M1-S03). Confirm the tier is real in speech rather than only in
   writing.
4. **`Entschuldigung` against `Es tut mir leid`** (M1-S08, S09). Confirm the split, and whether
   `Verzeihung` is worth a later mention.
5. **`Gern geschehen`** (M1-S10). The module says `bitte` is what people mostly say. Confirm.
6. **The `du` imperative without a pronoun** (M1-S07). Confirm `Komm bitte` is a request rather than
   an order, and that `bitte` is doing all of that work.
7. **`ihre` for "her"** (M2-S04). Confirm the lowercase possessive is unambiguous in context, given
   that `Ihre` is only a capital away.
8. **The `von` periphrasis** (M2-S10). Confirm `die Frau von Herrn Weber` is at least as ordinary as
   `Herrn Webers Frau` in speech.
9. **Predicative-only adjectives** (M2, rule 2). Confirm a learner restricted to `Er ist groß` and
   `Seine Haare sind kurz` can describe people usefully without the attributive declension.
10. **`mein Freund`** (M2-S08). Confirm Germans hear the boyfriend reading first, and that
    `ein Freund von mir` is the ordinary repair.
