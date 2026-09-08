# en-fr L2 — LLM review

The review that clears each en-fr L2 wave to ship, written in the same change that authors it
(`CLAUDE.md`, "Ship `verified: true` in the authoring change"). The **native-speaker gate is a
separate, stricter bar and stays unmet**: every section below ends in open questions for a native
pass, and no later wave may close one of them by rewriting a shipped module.

Open questions are numbered as a fresh en-fr L2 chain from 1.

## Wave 1 — L2-M1, L2-M2 (#440)

Authored against the briefs written by #431 and the decisions recorded in `docs/58`.

### L2-M1 "Asking politely" — the level pays L1's debt

L1's decision 1 was explicit and was written down as a debt: every second-person line was `vous`,
`tu` appeared in no display and in no `forms` list, and the briefs named it as what a later level
owed. **This is that level.** The paradigm opens — `tu es`, `tu as`, `tu peux`, `tu vas`,
`tu fais`, `s'il te plaît` — and the law is L1's own: `vous` is never wrong with a stranger, and
getting it wrong upward costs nothing while getting it wrong downward costs a good deal.

The module also finds the rest point hiding in the new paradigm: for most verbs the `tu` form is the
`je` form plus a silent `-s`, and for `vouloir` and `pouvoir` it is spelled identically. `je peux`
and `tu peux` are one word twice, which halves what looks like a new conjugation.

`est-ce que` is the everyday question marker and is taught as what it is: a thing you put in front
of a statement that changes nothing else. `je voudrais` arrives as **one frozen cell** of a tense L3
owns, with `pourriez` and `j'aimerais` named and never written — the same discipline en-it applies
to `vorrei`.

### L2-M2 "Describing people"

Age and features take `avoir`, which is the single most reliable English error in French. The
possessive agrees with the **thing possessed** — `sa voiture` is his car and hers alike — and the
module spends its mistakes there, because a learner hunting for a masculine word to mean "his" has
the system exactly backwards. The euphonic quirk follows immediately: `mon amie` is feminine, and
the note says the SOUND decided the spelling rather than the gender, which is the same instinct
behind `bel` and `vieil` in M3.

`sœur` is written with the ligature every time, because `sœur` and `soeur` would be two index keys.
`femme` and `fille` each carry two jobs on one row, and both notes are written true of both
readings — no second row can take those keys back.

### Two tests the L2 arrival required

`src/course/types.test.ts`'s en-fr case (#327) held two L1 decisions over EVERY en-fr module: that
no slot anywhere writes a `tu`-register word, and that every sentence is chipped `neutral`. Both
were correct for a level that spoke only `vous`, and both are exactly what L2-M1 is chartered to
lift. They are now scoped to L1 — where the decisions were made — with comments recording why. The
straight-apostrophe rule and the `glossEn` ban still run over everything, because those were never
level-specific.

This is the second time in this milestone that a second level has exposed an L1-shaped assertion
(hi-en's possessive `'s` ban was the first, en-it's ladder comparator the third). The pattern is
worth naming: a test written against a one-level course encodes the level as well as the rule.

### The ratchet

Five findings, all in M2 (`ce`, `sont`, `enfants`, `sympa`, `parents`), each fixed by opening the
row the module needed. The en-fr baseline stays at 20.

### Open questions for the native pass

1. **The `tu` law** (M1, rule 0). Confirm the framing — `vous` never wrong with a stranger, `tu` for
   friends and family and people who have offered it — matches current usage across generations.
2. **`On peut se tutoyer?`** (M1, rule 1). Named in prose. Confirm the negotiation is still
   explicit rather than something younger speakers simply start.
3. **`est-ce que` in speech** (M1-S01). Confirm it is the everyday marker and that dropping it for
   pure intonation is at least as common among friends.
4. **`Je voudrais` against `Je veux`** (M1-S05). The module says the shorter form lands as a demand.
   Confirm the strength of that.
5. **The three sorries** (M1-S07, S08). `Excusez-moi` before, `Pardon` on contact, `Je suis désolé`
   after. Confirm the split, and that `Pardon` alone is not now the commonest of the three.
6. **`Tu vas bien?`** (M1-S04). Confirm it is the ordinary greeting between friends and expects an
   answer.
7. **`mon amie`** (M2-S06). Confirm learners are told the sound rule rather than a gender rule, and
   that `mon ami` really does carry a possible romantic reading.
8. **`les cheveux` over `ses cheveux`** (M2-S02). Confirm the article is compulsory in this frame.
9. **`sympa`** (M2-S07). Confirm it is invariable in speech and is the everyday compliment rather
   than `gentil`.
10. **`femme` said FAM** (M2-S09). Confirm this is the only word of its kind the course will meet.

## Wave 2 — L2-M3, L2-M4, L2-M5 (#449)

Three rungs against the briefs of #431.

### What each module spends its budget on

- **M3 Describing things.** The grid is stated as what it actually is: **almost entirely a writing
  rule**. `grand`, `grande`, `grands`, `grandes` — three of the four sound identical, and a learner
  who cannot hear it will not believe it matters. The index does, because `grand` and `grande` are
  two keys. Position is taught as a LIST rather than a rule, because that is what it is, and the
  three pre-vowel shapes (`bel`, `nouvel`, `vieil`) are each their own index key rather than
  variants of one spelling. `propre` gets a line for changing meaning with position, and `marron`
  for refusing to bend at all — it is a chestnut doing an adjective's work.
- **M4 Getting around.** The imperative is **free**: the `vous` imperative is the present tense with
  the pronoun removed, and every one of those present forms was already the learner's, so the whole
  budget goes to prepositions and vocabulary. Transport splits on the one genuinely reliable rule in
  the module — `en` for anything you get inside, `à` for anything you sit on — and `droite` against
  `tout droit` gets its own mistake block, because one letter is a whole different direction.
  `il faut` arrives frozen, with `il faut que` plus a subjunctive named as L3's so a later author
  does not import the tense with the word.
- **M5 Food and hosting.** The module's rule is the one L1 set up perfectly and never stated:
  L1-M3 taught `du`, `de la`, `des`, and L1-M3 taught `ne … pas`, and the two never met in one
  sentence. **After a negation every partitive collapses to `de`.** One rule, no exceptions worth a
  learner's time, one mistake block. The stressed pronouns `moi` and `toi` arrive for `Pour moi`,
  and the object pronouns open narrowly on `me` and `te` — because `le`, `la` and `les` are already
  L1-M1's ARTICLES and the identically spelled object pronouns can never be first-taught here.

### The refusal, which is different in this course

Every other course in this collection describes hosting where the offer is expected to be repeated.
French is the exception: a host offers once or twice and stops, and the refusal is softened by a
**compliment** rather than by a reason — `Non merci, c'est très gentil`. The usage line says so
without judging either shape.

### Seam notes

`encore` carries the offer deliberately, which keeps `plus` free for M9's comparative — the same
protection en-es gives `más` by offering `otro`. `près` is opened as a bare adverb beside L1-M7's
`près de`, and `prendre` and `aller` sit in the `forms` of the rows that show them rather than
taking rows of their own.

### The ratchet

Ten findings across the wave, each fixed by opening the row the module needed or by rewriting the
variation. The en-fr baseline stays at 20.

### Open questions for the native pass

11. **The front-adjective list** (M3, rule 1). Confirm the ten given are the ones worth teaching and
    that none of them is now usually placed after the noun in speech.
12. **`bel`, `nouvel`, `vieil`** (M3-S05, S06). Confirm these three are the whole set a learner
    meets.
13. **`marron` invariable** (M3-S03). Confirm speakers do not regularise it to `marronne`.
14. **`propre`** (M3-S09). Confirm the position/meaning split is live rather than a textbook point.
15. **`en` / `à` for transport** (M4-S05, S06). Confirm the inside/on rule holds without exceptions
    a learner will meet.
16. **`tout droit` against `à droite`** (M4-S03). Confirm the pair really is the confusion the
    module claims.
17. **`il faut` + infinitive** (M4-S07). Confirm it is the everyday obligation frame and not
    formal.
18. **`arrêt de bus`** (M4-S09). Confirm the bare `de` and that `arrêt d'autobus` is not the
    commoner form.
19. **The negated partitive** (M5-S02, S07, S10). Confirm there is genuinely no exception at this
    level.
20. **`Encore du café?`** (M5-S05). Confirm this is what a host says rather than `Vous en voulez
    encore?`.
21. **The compliment-shaped refusal** (M5-S06). Confirm `C'est très gentil, mais ça va` is current
    and that a French host really does stop after one or two offers.
