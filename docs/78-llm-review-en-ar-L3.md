# en-ar L3 — LLM review

The review that clears each en-ar L3 wave to ship, written in the same change that authors it
(`CLAUDE.md`, "Ship `verified: true` in the authoring change"). The **native-speaker gate is a
separate, stricter bar and stays unmet**: every section below ends in open questions for a native
pass, and no later wave may close one of them by rewriting a shipped module.

Open questions are numbered as a fresh en-ar L3 chain from 1.

## Wave 1 — L3-M1, L3-M2 (#472)

Authored against the briefs written by #463 and the decisions recorded in `docs/70`. The level opens
on the real cumulative index through L2-M10 — **508 surfaces, maxSpan 3** — and a strict
`npm run build` now emits `en-ar: 22 modules (L1-M1..M10, L2-M1..M10, L3-M1..M2)`, with
`CONTENT 202/202 ok`.

The romanization laws of `docs/34` and `docs/54` carry unchanged: one word one key, hamza folding to
`'` and ʿayn staying `ʿ`, short vowels always written, the article written in full. Two of this
wave's three brief corrections are consequences of that last clause.

### L3-M1 "Your day, in detail" — a day chained out of nouns

The module's grammar is the **maṣdar**, and the reason it opens the level is that it changes the
SHAPE of a sentence rather than adding to it. English chains a day with verbs — *after I eat*,
*before I go* — and Arabic chains it with nouns: `baʿda al-futūr`, `qabla adh-dhahāb`. Every one of
the ten items is built on that swap, and the mistake plates are all one error: a verb where a noun
has to stand.

Rule 1 is the honesty the briefs demand of broken plurals, applied here: **a maṣdar is vocabulary,
not a formula.** `anām` gives `an-nawm`, `adhhab` gives `adh-dhahāb`, `waṣala` gives `al-wuṣūl`, and
nothing in the three letters predicts which shape comes out. So each is a row of its own, taught
beside the verb the ladder already owns, with no rule claiming a pattern. S10 adds the fact that
makes the noun usable rather than merely correct: **the maṣdar keeps the preposition its verb had** —
`adhhab ilā al-madrasa` becomes `adh-dhahāb ilā al-madrasa`, and the noun still goes somewhere.

The frequency set is the second spend, and it is cheaper than the brief expected (see below). Rule 3
states the fact that ties five words into one: **every one of them ends in a written `-an`**, the
adverbial accusative, and it is the same tail already sitting on L1's `shukran`, `kathīran` and
`qalīlan`. S04's mistake plate makes the tail load-bearing rather than decorative — without it,
`ʿāda` is the noun "a custom" and the sentence has two nouns and no adverb.

The `interference` rule of the module is `abadan`, and it is a clean one: **there is no Arabic word
for "never".** `abadan` is "ever", and the negative `lā` stands in front of the verb. English packs
both halves into a single word, so the `lā` is exactly what an English speaker drops — S06's plate is
`adhhab ilā as-sūq abadan`, which reads as "I go to the market ever". `nādiran` is deliberately
authored beside it as the contrast (S05): English's "rarely" quietly negates its own clause and
`nādiran` does not, so `lā ākul nādiran` is the over-correction and gets its own plate.

The sequencing spine costs three words — `awwalan`, `baʿda dhālika`, `akhīran` — because `thumma`,
`lākin` and `ayḍan` came with L1-M10. `baʿda dhālika` is indexed WHOLE so bare `dhālika` (L1-M9's)
is not spent twice, and S08's trap earns the phrase its own line: it is the one place in the module
where nothing after `baʿda` carries `al-`, because `dhālika` is already definite.

### L3-M2 "Work and study" — the iḍāfa, and the `t` you can hear

The module opens the construct chain, and the three laws travel with it because all three are
checkable on the page: **the first noun never takes `al-`, the second carries it, and the chain takes
its definiteness from the second.** `bāb al-bayt` is "the door of the house"; `bāb bayt` is "a door
of a house"; `al-bāb al-bayt` is not Arabic at all. English puts an article on both halves, so S01's
plate is `al-mudīr ash-sharika mashghūl` and the rule is stated as an article budget: one per chain,
and it sits at the end.

S05 is the item that tests whether the law landed rather than the phrase: `al-muwaẓẓaf fī ash-sharika`
keeps BOTH articles, because `fī` stands between the nouns and a preposition is not a chain. It looks
like one and is not, and the plate offers both repairs — drop the first article to build a chain, or
put `fī` back.

Rule 2 is the delta a learner can hear: **the tāʾ marbūṭa sounds its `t` in front of a second noun.**
`ash-shahāda` alone ends on a plain `-a`; `shahādat al-jāmiʿa` sounds the t. S04's mistake plate is
the only one in the wave whose `display` is spelled identically to the correct answer — written the
same way, said the wrong way — and its variation undoes the chain in the opposite direction so the
`-a` goes quiet again. That is the single most audible sign that a chain has been built rather than
memorised, and it is worth the plate.

`yajibu an` and `yumkinu an` are the obligation and possibility frames, and the module's point about
them is that **neither has a person in it**. `yajibu` is "it is necessary" — English's "I must" has
an I and `yajibu` has nothing, so the person appears only in the verb at the far end of the sentence.
S09's plate is `anā yajibu an adhhab`, the pronoun English pushes to the front. S09's variation makes
the impersonality visible by changing `adhhab` to `tadhhab` while `yajibu` does not move at all.

Two smaller things the module holds onto. S08 keeps L2-M3's agreement law running at the new length —
**a non-human plural takes a feminine singular adjective**, so `al-imtiḥānāt … ṣaʿba`, and the plate
(`ṣaʿbūn`) is wrong twice over, because that form is for people. And S07 reuses L2-M6's clock and
L1-M7's `ʿindī` without spending anything: Arabic still has no verb "to have", and a meeting sits at
you rather than being owned.

### Three brief corrections, and what the modules did instead

The `INDEX SEAM` note of each brief was rewritten against the real emitted index during authoring,
and each correction is marked in `tools/course-briefs.ts` as *corrected against the real index by the
authoring wave (#472)*. All three are recorded here because in each case the brief's claim was
plausible and the index disagreed.

- **`dāʾiman` is L1-M4's, not fresh.** The brief listed it among the frequency words the module would
  buy. The fold owns it already — as the key `dā'iman`, hamza folded to `'` under `docs/34`'s law,
  which is why a reader checking for the display spelling can miss it. So the module opens NO row for
  it: the `-an` adverbial fact went into `rules[3]` where it covers all five words at once, and
  `dāʾiman` is shown without a row in M1-S04's variation and in M2-S05's display. `aḥyānan` was
  already handled the same way by the brief and stayed that way.
- **`an` is L1-M3's, from the `urīd an` hinge.** The brief treated the particle as part of what
  `yajibu an` and `yumkinu an` would buy. It is spent, so both frames point back at that row instead,
  and the teaching moved to where it is useful anyway: S10's mistake plate is the MISSING `an`
  (`yumkinu adrus`), and its `why` names `urīd` explicitly, so the learner is told they have met this
  particle before rather than being handed it twice.
- **The elision the brief first wrote is not this course's scheme.** The brief's own examples were
  `baʿda l-ʿamal` and `qabla n-nawm` — classical, and what a native reads aloud. But this course
  writes the article in full, and the index owns `al-ʿamal` (L1-M4's), so `l-ʿamal` would have been a
  shown-but-untaught surface on the first build. The modules write `baʿda al-ʿamal`, `qabla an-nawm`
  and `adh-dhahāb`, keeping the sun-letter assimilation that IS part of the scheme (`an-`, `adh-`,
  `ash-`) and dropping the elision that is not. The `sound` lines carry what the eye cannot: S10's
  says the `l` of `al-` has vanished into the doubled `dh`.

### The rule that had to be narrowed to stay true

The brief's headline for M1 was that "a preposition in Arabic cannot take a verb". That is true of a
BARE verb and false in general: `baʿda an` + verb is ordinary MSA, and a learner who is told the
absolute version will hear it contradicted the first time they read anything.

So the rule as shipped says what is actually true — a preposition holds a NOUN — and **every mistake
plate in the module is built on the bare-verb error** (`baʿda adhhab`, `qabla anām`, `baʿda ākul`,
`baʿda waṣaltu`), which is a sentence Arabic really does reject, rather than on a form that exists.
The other road is then named rather than hidden: S10's `usage` says outright that Arabic has a second
route to "before I go" — `an` with a verb behind it — and that this course does not take it, because
the maṣdar is what a speaker reaches for first. That last clause is the claim a native pass has to
rule on, and it is question 2 below.

### The patterns, rewritten to the course's own no-endings law

The briefs' `patterns` carried case and mood vowels the course does not write: `aʿmalu fī`,
`adrusu`, `yajibu an V-subjunctive`, and an iḍāfa written as `<N> + <N>-genitive`.
`allowedPatterns` is a declaration about the DISPLAYS, so the shipped patterns match them —
`aʿmal + fī + <N>`, `adrus + <N> + fī + al-jāmiʿa`, `yajibu + an + V-1sg` — and M1's frequency
pattern was widened from the brief's `dāʾiman / abadan + V-1sg` to `dāʾiman / lā … abadan + V-1sg`,
because the `lā` is half the construction and a pattern that hides it teaches the error the module
exists to prevent.

`yajibu` and `yumkinu` keep their final `-u`, and the rows say why: they are frozen citation forms,
the way this course has always handled a form it shows without opening the system behind it. M1's
rule 2 does the same job for the genitive — `baʿda` and `qabla` put the noun after them in the
genitive, nothing changes on the page, and the word is named here only because it is the first time
the ladder has needed it. The case system as a system stays L4's, exactly as `docs/70` §2 fixes it,
and M2's rule 3 says the same of the subjunctive beyond these two frames.

### The ratchet

`tools/shown-surfaces.test.ts` held at **en-ar 6** across both modules, with **no finding at all**.
Every surface shown was either opened by a row in the module showing it or already owned upstream,
checked against the fold: `ʿamal`, `al-yawm` and `adhhab` are L1-M4's, `dhālika` L1-M9's, `bāb` and
`ʿindī` L1-M7's, `mashghūl` L1-M6's, `jiddan` L1-M3's, `as-sāʿa` and the ordinal hours L2-M6's,
`yaʿmal` L2-M8's and `waṣala` L2-M10's.

### Open questions for the native pass

1. **The maṣdar as the default** (M1, rule 0). The wave's most load-bearing claim. Confirm a speaker
   describing an ordinary day reaches for `baʿda al-wuṣūl ilā al-bayt` rather than a clause, and that
   the noun chain is the unmarked way to say it rather than the written one.
2. **`baʿda an` + verb** (M1-S10, `usage`). Confirm it is ordinary MSA, and say whether a learner
   restricted to the maṣdar for a whole module will sound compressed or simply careful.
3. **Writing the article in full** (M1, throughout). A native reads `baʿda l-ʿamal`. Confirm that
   writing `baʿda al-ʿamal` — and telling the learner in `sound` how it is actually said — teaches the
   right thing, rather than fixing a spelling pronunciation.
4. **`al-futūr`** (M1-S02). Confirm it is the everyday word for breakfast across the region, and
   whether the vowelling a learner will hear is `futūr` or `fuṭūr`.
5. **`qabla an-nawm`** (M1-S03). Confirm it is what a speaker says for "before sleeping", with the
   article on, and that `qabla an anām` is not the commoner form in speech.
6. **`nādiran` on its own** (M1-S05). Confirm a positive verb behind it is right, and specifically
   whether `nādiran mā` is what a speaker actually says — this is the question most likely to change
   a display.
7. **`lā … abadan`** (M1-S06). Confirm the pair is obligatory, and that a bare `abadan` is not heard
   as "never" in ordinary speech the way English hears it.
8. **`ʿādatan` at the head** (M1-S04). Confirm the sentence-initial position is neutral, and that the
   verb behind it genuinely does not move.
9. **The four-step spine** (M1-S07, S08, S09). Confirm `awwalan … thumma … baʿda dhālika … akhīran`
   is how somebody narrates a day aloud, rather than how a composition is structured.
10. **`mudīr ash-sharika`** (M2-S01). Confirm the chain is what a speaker uses to name someone by
    where they work, and that `al-mudīr fī ash-sharika` is a different thing rather than a variant.
11. **The sounded `t`** (M2-S04). Confirm `shahādat al-jāmiʿa` is heard with the t in ordinary
    unvocalised speech, and whether a speaker would reach for `shahāda jāmiʿiyya` instead.
12. **`yumkinu an adrus`** (M2-S10). Confirm the bare impersonal frame with a first-person verb is
    ordinary, or whether `yumkinunī an` is what a speaker says — the module treats the two frames as
    twins and this is where that could break.
13. **`rātib al-mudīr kabīr`** (M2-S06). Confirm `kabīr` is what modifies a salary, and that saying
    this about a named person's pay is as unremarkable as the `usage` line assumes.
