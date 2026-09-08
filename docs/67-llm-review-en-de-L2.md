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

## Wave 2 — L2-M3, L2-M4, L2-M5 (#450)

### L2-M3 "Describing things" — the grid, and what it buys

L1 shipped `der`, `die`, `das`, `den`, `dem`, `ein`, `eine`, `einen`, `einem` and the `kein` series
across five modules without ever laying them out. M3 is where they become a table, and the table is
worth a module only because of what it buys: **word order is free in a way English's is not**. `Den
Apfel esse ich` is an ordinary sentence — `den` says the noun is the object, so its position no
longer has to. That is the deepest structural delta in the course, and it is only available once the
grid is on one page.

Adjectives stay **predicative** throughout — `Das Auto ist rot`, where they take no ending at all.
The attributive declension (`ein guter Mann`, `der gute Mann`, `guter Wein`: three declensions
chosen by what stands in front) is too large to sit beside a module teaching colours, and it is said
to belong to L3 rather than left looking like an oversight.

`weiß` and `Straße` carry the `ß` and the index KEEPS it, so `Maße` and `Masse` are two keys. The
module's mistake plates spell the respellings out — `Das Auto ist weiss`, `Die Strasse ist sehr
breit` — which is the one place a `ss` is allowed to appear (see below).

### L2-M4 "Getting around" — two-way prepositions

`in`, `auf`, `an`, `über`, `unter`, `vor`, `hinter`, `neben` and `zwischen` take the ACCUSATIVE for
motion and the DATIVE for location, and the case is the whole difference: `Ich gehe in den Park`
against `Ich bin in dem Park`. L1-M7 shipped both seats of `in` without naming the rule; this is
where it is named.

Separable verbs are kept **unsplit behind a modal** — `Ich möchte einsteigen`, never `Ich steige
ein` — for an index reason as much as a pedagogical one: a stranded `ein` folds onto L1-M1's
article row and the note a learner would be shown is about "a", not about boarding a train.

Transport splits three ways and the module takes all three: `mit` + dative for a vehicle, `zu Fuß`
for walking (never `mit Fuß`), and `nach` for a destination that is a place name.

### L2-M5 "Food and hosting" — the refusal that is taken at face value

This is the one module in the milestone whose culture note points the OPPOSITE way from its
siblings. hi-mr, hi-en, en-ru and en-it all teach that a first refusal is a ritual and a host will
offer again. **A German refusal is taken at face value.** `Nein danke, ich bin satt` ends the offer,
and a learner who has internalised the other courses' hosting will go hungry. `Zusammen oder
getrennt?` is asked at every German table and a learner who has never heard it freezes at exactly
the wrong moment.

`noch` is the offer word — `Möchten Sie noch Kaffee?` — chosen deliberately so `mehr` stays free for
M9's comparatives. The teaching sits in the trap rather than a word row, because M2-S07 already owns
the `noch` key (see below).

### Three unreachable rows the duplicate check caught

`src/course/types.test.ts` asserts that every en-de surface has exactly ONE row that opens it,
because first-occurrence-wins makes a second row a note nobody will ever be shown. This wave tripped
it seven times, and every one was fixed in content rather than by widening the allow-list:

- `der` (M3-S06) — L1-M1 owns it. The sentence's teaching is the feminine DATIVE `der Kollegin`
  against the masculine nominative `der Kollege`, so the sentence was rebuilt on `Kollegin`, a free
  key, and the minimal pair is now on one noun stem rather than two.
- `essen` (M5-S09) — L1-M3 owns it, because the fold merges `das Essen` and `essen`. That fact is
  already rule 3 of the module, so the row was free to teach `lecker` instead, which is the word a
  host actually wants to hear.
- `blau`, `grün`, `lang`, `kurz` (M3) — all four are M2's, opened for eyes and hair. M3-S09 was
  rebuilt on `breit`/`schmal`, the dimension M2 never took.
- `Auto` (M4-S06) and `noch` (M5-S05) — M3 and M2 own them; the rows were dropped and the notes
  fold into prose that was already carrying them.
- `Löffel` (M5-S10) — M3 owns it. The table setting took `Messer`, which makes the point better
  anyway: `der Löffel`, `die Gabel`, `das Messer`, three genders at one setting and no rule behind
  it.

### One test change, and why it is not a loosened check

The ß check (`heisse|strasse|gross|weiss` never appears) reached mistake plates too, and M3's plates
have to WRITE the respelling in order to strike it out. The exemption is narrow: a mistake display
is let through only when its own `why` carries a real `ß`. A plate that respells without correcting
it still fails, which is the defect the check exists for.

### The ratchet

`tools/shown-surfaces.test.ts` held at **en-de 11** across all three modules. One finding —
`vielleicht`, from M5-S06's hedge variation — was fixed by opening the row the module's own brief
names, not by raising the baseline.

### Open questions for the native pass

11. **Free word order** (M3, rule 1). Confirm `Den Apfel esse ich` is ordinary rather than marked,
    and that a learner producing it unprompted sounds natural rather than emphatic.
12. **`der Kollegin`** (M3-S06). Confirm the fronted dative recipient is what a speaker reaches for
    when the recipient is the point, and that `Der Kollegin gebe ich das Buch` needs no more context
    than it has.
13. **Predicative-only through a whole colour module** (M3, rule 2). Confirm a learner who can only
    say `Das Auto ist rot` can describe things usefully, and that deferring the attributive
    declension to L3 does not leave them sounding foreign in ordinary speech.
14. **`breit`/`schmal`** (M3-S09). Confirm both are the everyday words for a street's width.
15. **Two-way prepositions** (M4). Confirm the accusative-for-motion / dative-for-location split is
    stated at the right grain, and that nine prepositions is not too many for one module.
16. **Separable verbs behind a modal** (M4). Confirm `Ich möchte einsteigen` is ordinary, and that
    never showing the split form at this level is safe rather than misleading.
17. **`zu Fuß`** (M4-S06). Confirm `mit Fuß` is the mistake an English speaker actually makes.
18. **The refusal taken at face value** (M5, rule 1). This is the wave's strongest cultural claim
    and the one most worth checking. Confirm a host offers once or twice and stops.
19. **`Zusammen oder getrennt?`** (M5, rule 2). Confirm it is asked as routinely as the module says,
    including when the party is obviously together.
20. **`noch` against `mehr`** (M5-S05). Confirm `Möchten Sie mehr Kaffee?` is wrong rather than
    merely unusual, and that the article-less `noch Kaffee` is the ordinary offer.
21. **`lecker`** (M5-S09). Confirm it is the compliment a host expects, and that `sehr gut` reads as
    flat beside it.
22. **`satt`** (M5-S06). Confirm it is neutral rather than blunt, and that `voll` of a person who
    has eaten is genuinely wrong.
