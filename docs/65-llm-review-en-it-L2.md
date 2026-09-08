# en-it L2 — LLM review

The review that clears each en-it L2 wave to ship, written in the same change that authors it
(`CLAUDE.md`, "Ship `verified: true` in the authoring change"). The **native-speaker gate is a
separate, stricter bar and stays unmet**: every section below ends in open questions for a native
pass, and no later wave may close one of them by rewriting a shipped module.

Open questions are numbered as a fresh en-it L2 chain from 1. The L1 reviews number their own
findings per document and are not continued here.

## Wave 1 — L2-M1, L2-M2 (#439)

Authored against the briefs written by #430 and the decisions recorded in `docs/57`. Reviewed
against the real cumulative index: 263 surfaces through L1-M10, 280 through L2-M1, 358 through
L2-M2, `maxSpan` 3.

### L2-M1 "Asking politely"

The module teaches the polite VERB and not the polite pronoun, which is the level's register
decision and the thing that makes Italian different from every other course here: the language is
pro-drop, so politeness shows up as a third-person ending on a verb pointed at the person in front
of you. `Può ripetere?` beside `Puoi ripetere?`, `Come sta?` beside `Come stai?`. Every request is
authored in both addresses side by side, because the ending is the only signal in the sentence.

**`Lei` never reaches a display**, and the reason is checked against the real function rather than
assumed: `normalizeSurface` lowercases, so `Lei` folds to `lei` — already L1-M10's key for "she" —
and first occurrence wins. A polite `Lei` in a display would send every courteous sentence in the
course to a note about the third person feminine. It is named in prose, with its capital, and
nowhere else. `La` and `Le` are barred for the same reason.

The three-way split of "sorry" is the module's best content because English collapses it: `Scusi`
before the fact, `Mi dispiace` after it, `Permesso` to come through. The `Permesso` trap says the
thing a phrasebook will not — it is an announcement rather than a question, and waiting for
permission after saying it is what marks a foreigner.

The frozen-form discipline is held: `Scusi` and `Senta` are present subjunctives and `potrebbe` and
`potresti` are conditionals, and all four arrive as single words with a note saying L3 will show the
paradigm. Shipping the word while deferring the system is honest; pretending the forms are
unrelated would not be.

### L2-M2 "Describing people"

Features take `avere`, and age is where the mistake block sits, because `è trenta` is the
word-for-word translation and means nothing. The article is part of the frame (`ha i capelli`, never
`ha suoi capelli`), which is the same habit the possessive rule needs.

The possessive law is taught in both halves at once: a possessive keeps its article
(`il mio libro`), and it DROPS before a singular family member (`mio fratello`) — and comes back in
the plural (`i miei fratelli`). English drops it always and Spanish drops it always, so neither half
transfers.

`essere` against `stare` is explicitly NOT the Spanish split, said in the rule so an author who has
read the en-es briefs does not import the wrong law: Italian sends location to `essere`
(`Sono a Roma`) and keeps `stare` for health and how things are going.

The `-co` plural fork is taught as vocabulary rather than as a rule, because it is one: `amico` →
`amici` with a soft c, `bianco` → `bianchi` with the hard one kept, and `amica` → `amiche` hard in
the same word that softens in the masculine. Every plural sits in its own row's `forms`.

### One test the L2 arrival exposed

`src/course/types.test.ts`'s en-it elision case (#333) walks the ladder in order and checks each
apostrophe surface against what is taught at or before that module. Its comparator sorted by
`moduleNumber` alone, so **L2-M1 sorted in front of L1-M7** and `dov'è` — taught in L1 — was checked
against a set that did not yet contain it. The comparator now sorts by id with numeric collation,
which is level-then-number, and the now-unused `moduleNumber` helper is gone. This was a latent
defect that only a second level could surface, and it is the kind the ratchet cannot see.

### The ratchet

Clean on both modules at first build. The en-it baseline stays at 17.

### Open questions for the native pass

1. **The five-tier ladder** (M1). `Puoi` → `Può` → `Potresti` → `Potrebbe`, with `Scusi`/`Senta` in
   front. Confirm the ordering matches how an Italian ear ranks them.
2. **`Senta`** (M1-S08). Given as an ordinary opener rather than as brusque. Confirm, and confirm
   `Senta, scusi` in that order is natural.
3. **`Permesso`** (M1-S06). The trap says it announces rather than asks. Confirm, and confirm it is
   still current with younger speakers.
4. **`Grazie mille`** (M1-S07). Confirm it is not now dated beside `Grazie infinite` or plain
   `Grazie`.
5. **`aiutarmi`** (M1-S10). Confirm the enclitic form is what is said, rather than
   `mi può aiutare?`, which the level cannot write because bare `mi` is deferred to M5.
6. **`anziano` over `vecchio`** (M2-S02). The note calls `vecchio` blunter of a person. Confirm the
   strength of that.
7. **`simpatico`** (M2-S03). Given as the ordinary compliment. Confirm it does not read as faint
   praise.
8. **`bravo`** (M2-S07). Given as "good at something". Confirm the frame `è bravo` carries that
   without a complement.
9. **`capelli neri` vs `castani`** (M2-S10). The note says Italians reserve `neri` for genuinely
   black hair. Confirm.
10. **`marito` and `moglie`** (M2-S08). The note says Italian has no ordinary equivalent of
    "partner". Confirm for current usage.
