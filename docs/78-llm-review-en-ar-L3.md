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

## Wave 2 — L3-M3, L3-M4, L3-M5 (#481)

Authored against the same briefs (#463) and `docs/70`, continuing wave 1's voice. The wave opens on
the emitted index through L3-M2 — **561 surfaces** — and closes with `en-ar: 25 modules
(L1-M1..M10, L2-M1..M10, L3-M1..M5)` and `CONTENT 209/209 ok`. Bounds climb as `docs/70` §4 fixes
them: M3 at 10 words, M4 and M5 at 11.

The wave's five brief corrections all have one root, and it is the same root wave 1 found: **the
briefs were written in textbook MSA and this course is not written in it.** `docs/54`'s
no-case-endings law and `docs/34`'s hamza rules together decide more of these three modules'
spelling than any decision taken here.

### L3-M3 "Opinions with reasons" — one cell of the case system, opened where it can be seen

The module's law is `anna`, and the honest version of it is narrower than the brief's. The brief's
worked example was `aʿtaqidu anna al-kitāba jamīlun` — an indicative `-u`, an accusative `-a` and a
nominative `-un`, none of which this course writes. So the module states the case and then says
where it is visible: **the accusative is why a pronoun has to attach.** `annahā` and `annahu` are
the cell made audible, `anna hiya` does not exist, and a definite noun behind `anna` looks exactly
as it did before — which is what `rules[1]` says in as many words, following L3-M1's rule 2 on the
genitive precisely. That is one cell, on one trigger, and nothing else of the system opens.

`rules[0]` carries the part a learner can act on: **what follows `anna` is a noun or an attached
pronoun and never a verb.** Every mistake plate in the module is built on a sentence Arabic really
rejects — `anna hiya ṣaʿba` (S02), `anna yakūn khaṭaʾ` (S07), `anna dhahabat hind` (S08) — and S08
is the item that tests it rather than states it: Arabic's ordinary sentence may lead with its verb,
and behind `anna` it may not.

The softeners are the module's `interference` rule, and the claim is about WHERE the politeness sits
rather than how much of it there is. `fī raʾyī`, `rubbamā` and `lā aʿtaqid` all stand outside the
sentence and leave it whole; English hedges inside the claim. S06's plate is the stacked hedge
`aʿtaqid rubbamā hādhā ṣaʿb`, which is the English habit in Arabic words, and the rule refuses to
grade either language: they put the politeness in different places.

### L3-M4 "If and then" — two ifs, and the one job the jussive is opened for

`idhā` against `law` is stated as a real split rather than a register: `idhā` for what is still
open, `law` for what did not happen. **Both take the past whatever the English says**, which is
`rules[0]` and S01's plate (`idhā adhhab`), and it is the first thing an English speaker gets wrong.
`law` is L2-M1's word and gets no row: `rules[2]` points back at `law samaḥta` and says the polite
phrase is this same "if", because a learner who filed it away as half of "please" will not otherwise
recognise it.

The jussive opens for `lam` and for the prohibition, and the module is careful about what a learner
can actually SEE. For a sound verb this course writes the jussive and the ordinary present
identically — `lam adhhab` is `adhhab` — so the mood is invisible there and the module says so.
Where it is visible is the hollow verb, and that is where the two rows went: **`akūn` becomes
`akun`, `anām` becomes `anam`** (S04, S05), with S04's plate being the long vowel kept. This is the
one place in the course where a vowel length is grammar rather than spelling, and S10's plate closes
the loop from the other side — `yajibu an tanam` is wrong because `an` is not `lam`.

The prohibition is the module's `interference`: **`lā tadhhab` is not the imperative negated.**
L2-M4's `idhhab` has no negative form at all, so `lā idhhab` — the shape English leads you straight
to — does not exist, and S02's plate is exactly that.

`la-` is the whole of Arabic's conditional and the module says that as a relief rather than a fact:
one letter on the answer clause, no mood to conjugate, where the Romance courses spend a module.
`laytanī` (S07) is carried in as one of M3's sisters of `anna` rather than as new machinery — the
`-nī` attaches for the accusative reason M3 already opened — which is what lets the wish and the
regret share one grammar.

### L3-M5 "What someone said" — the relief, stated as a relief

**Arabic does not backshift**, and the module spends its two loudest blocks on making that a fact
rather than a permission. `rules[1]` is the `interference` one and it is the sharper half: pulling
the tense back does not sound stiff in Arabic, it reports something else. `qāla innahu kāna marīḍ`
says he was ill earlier and presumably is not now, so S02's plate is not a style note — the learner
who writes it has passed on the wrong message. S09 runs the same law over a past inside a report:
English has "she hadn't slept" and Arabic has only the one past, so `kānat lam tanam` is two pasts
where one belongs.

`inna` is taught as `anna`'s twin rather than as a second particle, and M3's law is restated on it
whole — noun or attached pronoun, never a bare verb, `innahu`/`innahā`/`innahum` attaching for the
accusative. The split the module does enforce is which verb takes which: **`qāla` takes `inna`,
`aʿtaqid` and `akhbaranī` take `anna`**, and S07 and S10 each carry a plate for the wrong one.

The reported question is the second law and it is one line: **a yes/no question takes `hal` or
`mā idhā` and never `anna`** (S04, S05), while a wh-question keeps its own word (S06). S04's plate
is `saʾalanī anna ʿindī waqt`, which reports a statement, and S05's is bare `idhā`, which builds a
condition — the two ways English's "if" leads a learner wrong, one each.

Two smaller things. `akhbaranī` and `saʾalanī` carry the "me" inside them and `qāla` does not, so
S03's plate is the doubled me (`akhbaranī lī`) and S08's is the attached one (`qālanī`); the module
calls the difference between `qāla lī` and `akhbaranī` one of warmth rather than of grammar, which
is question 29. And `mādhā` is presented as L1-M9's `limādhā` with the `li-` taken off, so the
wh-question costs one word and no rule.

### Five brief corrections, and what the modules did instead

Each was checked against the emitted index or against a shipped module before it was overridden.

- **`aʿtaqidu` keeps no `-u`, and no noun takes an ending.** The brief's `aʿtaqidu anna al-kitāba
  jamīlun` carries three endings this course does not write. Every 1sg imperfect the ladder owns is
  bare — `adhhab`, `ashrab`, `ākul`, `aʿmal`, `adrus`, `anām` — so the module writes `aʿtaqid`,
  `aẓunn` and `aqūl`, and M5 writes `yaqūl` where the brief wrote `yaqūlu`. `yajibu` and `yumkinu`
  stay frozen citation forms, as wave 1 fixed them.
- **`li-ʾanna`, `fī raʾyī` and `muwāfiq` are not fresh keys.** The brief's `INDEX SEAM` listed all
  three. `li-ʾanna` (with `li-ʾannī`, `li-ʾannaka`, `li-ʾannaki`, `li-ʾannahu`) and `fī raʾyī` are
  L1-M9's, and `muwāfiq`/`muwāfiqa` are L2-M6's. So M3 opens **no row** for any of them: the
  point-backs went into `rules[2]`, `rules[4]` and `rules[5]`, where a learner is actually shown
  them, and the words are used across six displays without a dead row anywhere.
- **`anna` is fresh only because of the initial-hamza rule.** The index already owns `'anna`,
  `'annahu`, `'annaka`, `'annaki` and `'annī` — as the hyphen PARTS of L1-M9's `li-ʾanna`, per
  `docs/34`'s clitic law. This course does not write word-initial hamza (`anā`, `an`, `ams`,
  `ākul`), so bare `anna` normalises to `anna` and is genuinely unowned, while `li-ʾanna` keeps its
  medial `ʾ`. The two spellings of one particle are named in `rules[2]` rather than left to be
  noticed, and question 16 is whether that is enough.
- **`lastu muwāfiqan` became `lastu muwāfiq`.** The brief wrote the accusative predicate. L2-M7
  shipped `huwa laysa mawjūd` and `hiya laysat mawjūda` with no ending at all, and L2-M1's rule 4
  states the governing principle: the written `-an` survives *because it is lexical rather than
  grammatical*. `muwāfiqan` after `lastu` is grammatical, so it goes, and `rules[5]` points at
  L2-M7 for the precedent. This is the correction most likely to be reversed by a native pass, and
  it is question 17.
- **M4's jussive cells, and M5's bare `mā`.** The brief named `adhhab`, `tafʿal` and `arā` as fresh
  jussive keys: `adhhab` is L1-M4's and is *identical* in the jussive here, and `tafʿal` and `arā`
  are taught by no module at all. So M4 shows the jussive on the verbs where it is visible —
  `akun`, `takun`, `yakun`, `anam`, `yanam` — and says in `rules[4]` that a sound verb does not
  move. M5's brief calls bare `mā` "L1's question word"; the ladder has never taught it (only
  `māʾ`, water). `mā idhā` is still indexed WHOLE, which keeps `mā` unspent for whoever needs it.

### The ratchet

`tools/shown-surfaces.test.ts` held at **en-ar 6** across all three modules, with **no finding at
all** — every display, variation and pool item resolves. `npm run content:shown` reports two
RE-TEACH lines and both are deliberate: `laysa` and `laysat` sit in M3-S05's `lastu` paradigm so a
learner sees the three cells together, and L2-M7 keeps the key and the note, which is the point-back
the brief asked for made structural rather than written twice.

Everything else shown was opened by a row in the module showing it or already owned upstream:
`hādhā` and `hādhihi` L1-M8's, `ghālī`, `ghāliya` and `rakhīṣ` L1-M8's, `muhimma`, `ṣaʿb`, `sahl`
and `jamīla` L1-M9's, `lākin` and `ayḍan` L1-M10's, `kunta`/`kuntu`/`kāna` L2-M3's, `hunā` and
`hunāka` L2-M4's, `mawjūd` and `laysa` L2-M7's, `al-ḥisāb` and `as-samak` L2-M8's, `mumtāz` and
`qālat` L2-M10's, and `al-imtiḥān`, `al-jāmiʿa` and `yajibu` L3-M2's. Three whole-surface keys were
minted rather than spending a bare word: `lā aʿtaqid` (M3), `lā tadhhab` (M4) and `mā idhā` (M5).

### Open questions for the native pass

14. **The bare imperfect** (M3, throughout; M5-S07, S10). The course writes `aʿtaqid`, `aẓunn`,
    `aqūl` and `yaqūl` with no indicative `-u`. Confirm this reads as ordinary speech rather than as
    clipped, and that a reporting frame in particular does not want the ending back.
15. **The accusative shown only on the pronoun** (M3, rule 2). Confirm a learner who never writes
    `al-kitāba` is nevertheless heard as correct in ordinary speech, and that the attaching pronoun
    is where a native would say the case is actually audible.
16. **`anna` beside `li-ʾanna`** (M3, rule 3). The initial-hamza convention gives one particle two
    spellings on the page. Confirm a learner reads them as one word, and say whether the note
    should be louder than it is.
17. **`lastu muwāfiq`** (M3-S05). The book form is `lastu muwāfiqan`. Confirm the bare predicate is
    what is heard, and say whether this is the place the course's no-endings law finally costs more
    than it saves. This is the wave's most reversible decision.
18. **`aẓunn` against `aʿtaqid`** (M3-S08). Confirm which a speaker reaches for first, and whether
    `aẓunn` carries more doubt than the module's `usage` implies.
19. **`hādhā khaṭaʾ`** (M3-S07). Confirm the bare noun predicate is what is said for "this is a
    mistake", rather than `hādhā ghayr ṣaḥīḥ`.
20. **`idhā` + past for a future** (M4-S01). Confirm `idhā dhahabtu ilā as-sūq` is what a speaker
    says, and that the present after `idhā` is genuinely wrong rather than merely colloquial.
21. **`lam` against `mā` + past** (M4-S03). `docs/70` §2 asserts `lam` is what a speaker actually
    says. Confirm, and say whether it differs by region.
22. **`lā tadhhab` as advice** (M4-S02). Confirm the bare prohibition is not too blunt for the
    register the module claims, and whether `min al-afḍal an lā tadhhab` is the commoner softening.
23. **`laytanī`** (M4-S07). Confirm it is current speech rather than literary, and whether
    `yā laytanī` is what is actually said.
24. **`min al-afḍal an`** (M4-S08). Confirm it is the everyday "you'd better", and that `al-afḍal`
    is not heard as a comparative still waiting for its `min`.
25. **`naṣīḥa` counted** (M4-S09). Confirm `naṣīḥa jayyida` for a single piece of advice, and that
    a speaker would not reach for the plural here.
26. **`inna` after saying, `anna` after telling** (M5, rule 3; S03, S07, S10). The module enforces
    the split and plates the wrong one twice. Confirm it is real in speech rather than a written
    convention, and whether `qāla anna` simply passes.
27. **No backshift as a change of meaning** (M5, rules 1–2; S02, S09). The module claims
    `qāla innahu kāna marīḍ` reports something different rather than sounding heavy. Confirm the
    meaning really moves.
28. **`mā idhā` against `hal`** (M5-S05). Confirm both are used in a reported question, which one a
    speaker reaches for, and whether framing `mā idhā` as "more careful" is right.
29. **`qāla lī` against `akhbaranī`** (M5-S08). The module calls the difference warmth rather than
    grammar. Confirm, and say whether either is marked in ordinary speech.
30. **`khabar` counted** (M5-S09). Confirm `khabar sayyiʾ` is how a single piece of bad news is
    named, and that the `akhbaranī` root connection is one a speaker would recognise.
