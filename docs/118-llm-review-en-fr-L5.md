# en-fr L5 — LLM review

The review that clears each en-fr L5 wave to ship, written in the same change that authors it
(`CLAUDE.md`, "Ship `verified: true` in the authoring change"). The **native-speaker gate is a
separate, stricter bar and stays unmet**: every section below ends in open questions for a native
pass, and no later wave may close one of them by rewriting a shipped module.

Open questions CONTINUE the chain `docs/109-en-fr-L5-brief-decisions.md` opened, which ends at 107.
This wave numbers from 108. Nothing already written is renumbered.

## Wave 1 — L5-M1, L5-M2 (#578)

Authored against the briefs `tools/course-briefs.ts` carries for these two rungs, and reviewed
against the REAL emitted index rather than against the briefs' account of it. Every call to
`npm run content:owner -- en-fr …` closes with the same footer, and that footer is the fold this
wave was written against:

```
981 surfaces owned, folded over 40 modules through L4-M10
```

**981 surfaces, 40 modules, through L4-M10**, and the deepest emitted index file
(`public/content/en-fr/index/L4-M10.json`) carries `maxSpan: 6`. `docs/100-llm-review-en-fr-L4.md`
was written against *783 surfaces through L3-M10, `maxSpan` 4*; both halves of that sentence are now
stale by a whole level, which is the first thing a later wave should re-check rather than inherit.
L5 is the level's first wave, so nothing of L5 was in the fold when these two were written;
`tools/check-shown.ts` folds the authored L5 files on top of it, which is what lets M2 lean on M1's
rows and what lets each module's own later sentences lean on its earlier ones.

L5-M1 spends **19 word rows**, L5-M2 spends **24**, both under the briefs' `newWordCap: 25`. Between
them they open **63 distinct index keys** (29 and 34), because almost every row here carries a
`forms` list of conjugated or negated shapes of one frozen item rather than an empty one.

**`maxSpan` moves, and it moves a long way: 6 → 8.** The longest key L5-M1 opens is
`ne coûte pas les yeux de la tête` at eight tokens, with `ce n'est pas la mer à boire` and
`coûter les yeux de la tête` behind it at seven and six. That is a property of idiom modules and
not of this one in particular — an idiom is one lexical item and the index has to carry it whole —
but it means the runtime resolver's greedy walk now looks eight tokens ahead on en-fr where it
looked six, and any later en-fr wave that reasons about spans should read the number off the
emitted file rather than off this paragraph.

### L5-M1 "Sayings and idioms" — the figurative everyday, and when it is used

The ten displays, in order:

1. `J'en ai marre de ce travail`
2. `Ça vaut le coup de venir`
3. `Ce n'est pas la mer à boire`
4. `Il pleut des cordes, comme on dit`
5. `Au sens propre, des cordes ; au sens figuré, la pluie`
6. `Ce soir, j'ai la flemme`
7. `Il m'a posé un lapin, j'ai le cafard`
8. `Cette voiture coûte les yeux de la tête`
9. `Vous pouvez me donner un coup de main ?`
10. `Revenons à nos moutons`

What it teaches. Ten expressions, each **one lexical item** and each indexed whole, plus the frame
for talking about an expression at all. The module's spine is the brief's second note: an idiom is
stored and retrieved whole, its parts do not carry their literal senses inside it, and it cannot be
varied — which is why every `mistake` plate here is a *variation* of the item rather than a grammar
slip (`la mer à nager`, `poser un lièvre`, `avoir faim`-style article-dropping in `j'ai flemme`).
Two classes are named because they are productive: **`avoir` + a DETERMINED noun** (`avoir la
flemme`, `avoir le cafard`), which is the L5 class against L1's `avoir faim` with its bare noun,
and **`en avoir` + noun** (`en avoir marre`, `en avoir assez`), where the `en` is a syllable of the
item and not a pronoun anybody may drop. Register is carried on the row rather than left to the
learner: `j'en ai marre` familiar-but-universal against `j'en ai assez` one rung up (S01 teaches
both, on the same sentence, precisely so the pair is visible), `avoir la flemme` and `avoir le
cafard` familiar, `ça vaut le coup` and `un coup de main` neutral, `ce n'est pas la mer à boire`
neutral and slightly dated, `revenons à nos moutons` neutral-to-formal and the only sentence in
the module marked `formal`.

S05 is the meta sentence and carries the `au sens propre` / `au sens figuré` frame with
`littéralement` beside it, using the rain idiom as its worked example — literally ropes, figuratively
rain — with the `cafard` / `tristesse` pair in its first variation so the frame is shown working on
a second item. `cafard` and `cordes` and `pluie` therefore exist here as **bare literal rows as
well as inside whole idioms**, which is deliberate: the picture is what makes an idiom memorable,
and a learner who does not know that a `cafard` is a cockroach has learnt a noise rather than an
expression. The two keys never meet — `cafard` and `avoir le cafard` are different index keys — so
neither row is unreachable.

The interference rule is the brief's third note, split in two. The IMAGES do not transfer
(`il pleut des cordes` is not cats and dogs, `coûter les yeux de la tête` is not an arm and a leg,
`revenons à nos moutons` has no English twin at all), and **DENSITY** does not transfer either: one
idiom per conversation is the honest figure, and the module says so in a rule rather than leaving
the learner to discover it by sounding like a phrasebook. Two sentences (S05's variation and S07)
deliberately stack two expressions in one line; the rule names them as teaching lines rather than
as models, because a wave that stacks idioms without saying so is teaching the wrong density by
example.

### L5-M2 "Humour and teasing" — banter, irony, and when not to

The ten displays, in order:

1. `Tu rigoles ?`
2. `Mais non, je te taquine`
3. `Qu'est-ce que tu es drôle !`
4. `Comme c'est malin !`
5. `C'était pour rire, ne le prends pas mal`
6. `Ah bon ? Sans blague ?`
7. `Mais bien sûr, tu es très amusant`
8. `Ne te moque pas de moi`
9. `C'est un drôle de type`
10. `Tu parles ! C'est n'importe quoi`

What it teaches. A small, exact grammar and a large pragmatics. The grammar is the **two exclamative
frames**, `qu'est-ce que` (S03) and `comme c'est` (S04), and the single fact that matters about
both: neither inverts. English moves its words (*how funny you are*) or leads with an article and a
noun (*what a fool*); French puts the frame down in front and leaves the clause exactly as it was —
`qu'est-ce que tu es drôle`, `comme c'est malin`. Both `mistake` plates attack that directly
(`qu'est-ce que es-tu drôle`, `comme quel malin`), the second one pointing back at L2-M9's `quel`
rather than trying to reopen it.

The pragmatics is the real content, and it is the brief's second note: **French banter is SIGNALLED,
not deadpan**. Seven of the ten sentences are markers — `tu rigoles` (S01), `je te taquine` /
`je plaisante` / `je rigole` (S02), `c'était pour rire` (S05), `ah bon` / `sans blague` /
`tu m'étonnes` / `ça alors` (S06), `mais bien sûr` said flat (S07), `tu parles` (S10) — and the
`hein` tag hangs off S01's first variation, S05's first, and S08's first. The register trio the
brief names is spent across S03 and S07 so the contrast is on the page rather than in prose:
`marrant` and `rigolo` familiar, `amusant` neutral, `drôle` between them and travelling almost
anywhere.

The false friend is S09, and it is the only genuine one in the module: `un drôle de type` is an odd
character, `un type drôle` is a funny man, and the variation pair shows the flip by moving the one
word. The row is tagged `interference` for that reason, as is `drôle` itself on S03.

The when-not-to is content, not a disclaimer: S08 (`ne te moque pas de moi`) is the module's one
line that is not itself a joke, and rule 6 states the honest rule — teasing is for people who
already know you, never about what a person cannot change, and always leaves room to laugh back. The
same rule holds the boundary the brief draws with L5-M7: everything here is MARKED and cooperative,
and unmarked pointed irony is M7's.

### The seams the briefs got wrong, and what `content:owner` actually said

Every claim below was checked with `npm run content:owner -- en-fr …` and nothing here was grepped.

**1. The L4 review's fold figure is two levels stale, and the L5 briefs inherit its shape.** Both
briefs' INDEX SEAM sections name surfaces without naming a count, which is the safer habit; the
number a later wave will reach for is `docs/100`'s *783 surfaces through L3-M10, `maxSpan` 4*.
Today the tool prints `981 surfaces owned, folded over 40 modules through L4-M10`, and the emitted
`maxSpan` is `6`. Both halves changed.

**2. L5-M1's whole-idiom list is correct, verbatim.** All twenty-one expressions the brief calls
free are free:

```
j'en ai marre	free          en avoir marre	free          en avoir assez	free
ça vaut le coup	free          ça marche	free              avoir la flemme	free
poser un lapin	free          il pleut des cordes	free      coûter les yeux de la tête	free
avoir le cafard	free          avoir un chat dans la gorge	free
ce n'est pas la mer à boire	free                          revenons à nos moutons	free
un coup de main	free          tourner autour du pot	free    sur le bout de la langue	free
faire la tête	free          n'importe quoi	free          comme on dit	free
au sens propre	free          au sens figuré	free
```

**3. The brief's list of OWNED PARTS is right as far as it goes and is missing two that this
module actually needed.** Confirmed exactly as written: `marche → L2-M6`, `yeux → L2-M2`,
`tête → L2-M8`, `main → L3-M7`, `pieds → L2-M4`, `gorge → L3-M7`, `boire → L1-M3`, `pain → L1-M3`,
`mer → L2-M10`, `prendre → L2-M4`, `coûte → L1-M8`. Two more belong on that list and are not on it:

```
pleut	L3-M4
tourner	L2-M4
```

`il pleut des cordes` and `tourner autour du pot` are free WHOLE and were always going to be, but a
wave reading the brief's part-list as complete would conclude their verbs were free and could take
a bare row. They cannot.

**4. `propre` is owned, and the brief does not say so.** The brief lists `sens` and `figuré` among
the fresh bare words the module may take — both confirmed free — but `au sens propre`'s middle word
is not free at all:

```
propre	L2-M3
sens	free
figuré	free
```

L2-M3 owns `propre` in its ordinary sense (clean). `au sens propre` is free as a three-token key and
is indexed whole here; a bare `propre` row at L5 would sit unreachable behind L2-M3's note, which is
`docs/74`'s rule again. The row's note says this out loud rather than leaving the learner to
discover that the word means something else everywhere but inside this frame.

**5. `coup` is still free, exactly as the brief claims, and this module kept it that way.**

```
coup	free
du coup	L4-M2
tout à coup	L4-M10
```

Both `ça vaut le coup` and `un coup de main` are indexed whole, so nothing in this wave takes the
bare key. The next en-fr wave inherits it free.

**6. Three fresh bare words this module took are not on the brief's list.** The brief names
`flemme, cafard, lapin, moutons, cordes, chat, expression, sens, figuré, littéralement, poser,
casser, tomber, mettre, avoir` — all confirmed free. Three more were needed and are also free:

```
pluie	free
tristesse	free
corde	free
```

`pluie` is the noun beside L3-M4's verb `pleut`; `tristesse` is the noun behind L1-M9's `triste`
and is used to say plainly what `avoir le cafard` says figuratively; `corde` is the singular sitting
in the `cordes` row's `forms`.

**7. L5-M2's whole-marker list is correct, verbatim** — all twenty-nine surfaces the brief names are
free, `tu rigoles`, `je te taquine`, `c'était pour rire`, `ne le prends pas mal`, `sans blague`,
`mais bien sûr`, `tu m'étonnes`, `ah bon`, `ça alors`, `tu parles`, `et alors`, `hein`, `quoi`,
`n'importe quoi`, `se moquer de`, `comme c'est`, `drôle`, `marrant`, `rigolo`, `amusant`, `malin`,
`moqueur`, `gênant`, `vexer` and the rest included.

**8. The `qu'est-ce que` hyphen purchase is real and prints exactly as the brief describes it.**

```
qu'est-ce que	free   [parts: qu'est → free, ce → L2-M1]
est-ce que	L2-M1   [parts: est → L1-M1, ce → L2-M1]
qu'est	free
```

The two frames are different keys and the brief is right that one does not cover the other. The row
is indexed whole and its note is written to be true of the bare `qu'est` it drags in: `qu'est` is a
hyphen part nobody says on its own, and it only ever appears inside `qu'est-ce que` or
`qu'est-ce que c'est`. `ce` stays L2-M1's — first occurrence wins and a part never steals an owned
key.

**9. Three of L5-M2's free WHOLE markers are built out of OWNED words, and the brief says so for
one of them only.** It names `sûr → L3-M3`. It does not name the other two:

```
sûr	L3-M3        bien sûr	free      mais bien sûr	free
comme	L4-M2        comme c'est	free
c'était	L3-M10       c'était pour rire	free    pour rire	free
prends	L4-M1        ne le prends pas mal	free
```

This is a seam with teeth, and it is not a shown-but-untaught risk — it is the opposite. Written as
separate tokens, `bien sûr`, `comme c'est` and `c'était pour rire` all resolve perfectly well
through L1-M2's `bien`, L3-M3's `sûr`, L4-M2's `comme` and L3-M10's `c'était`, so `check-shown`
would never complain. But the learner tapping them would be shown L4-M2's note about *comme* as
*like*, not the exclamative frame, and L3-M10's note about the imparfait, not the repair line. The
multi-token key is what makes this module's note reachable at all, because the resolver takes the
longest match at each position. Every marker in L5-M2 that spans owned words is therefore indexed
whole and deliberately so: `mais bien sûr` (3 tokens), `comme c'est` (2), `c'était pour rire` (3),
`ne le prends pas mal` (5).

**10. The en-fr elision law, checked one form at a time.** No elided form in either module was
assumed to be covered by its unelided root:

```
j'en ai marre	free      j'ai	L1-M5      m'a	L3-M5      n'est	L2-M7
c'était	L3-M10        c'est	L1-M8      qu'est	free      n'importe	free
s'il vous plaît	L1-M8
```

Straight apostrophes throughout, and `src/course/types.test.ts`'s en-fr case asserts it on every
display, form, variation and mistake plate in both files. The `ne` is written on every negative in
both modules — `ce n'est pas la mer à boire`, `ça ne vaut pas le coup`,
`ne coûte pas les yeux de la tête`, `ne le prends pas mal`, `ne te moque pas de moi` — including on
the `mistake` plates, which are the one slot the course would allow to write what it refuses. The
spoken drop (`c'est pas la mer à boire`, `le prends pas mal`) is stated in `sound` and in `mistake.why`
as prose, per `docs/58` §4, and is never a display.

**11. `n'importe quoi`'s `n'` is not the negator, and the module says so twice.** `n'importe → free`
and `importe → free`; the phrase is indexed whole. Rule 5 of L5-M2 is the `ne` law and rule 3 of the
same file carries the exception, because a learner five levels deep in *`ne` is always written* will
go looking for the missing `pas`. S10's `mistake` plate is that exact hunt.

### The ratchet

`npm run content:shown -- en-fr L5-M1` and `… L5-M2` both print
`clean — every shown surface resolves`. **No `SHOWN-BUT-UNTAUGHT`, no `COLLIDES INSIDE THIS MODULE`,
and no `RE-TEACH` in either file** — every key either module opens was `free` when this wave started,
so there is no re-teach to justify and no note pointing back at an earlier row's key.

Three near-collisions were designed around rather than discovered:

- `cafard` (bare, the insect) and `avoir le cafard` (the idiom) are two rows of L5-M1 and two
  different keys. Likewise `cordes` and `il pleut des cordes`, and `drôle`, `type` and
  `un drôle de type` across L5-M2's S03 and S09. In each case the bare row exists because a display
  or a variation shows the word bare; the whole row exists because the item is not its parts.
- Every conjugated or negated shape a display or variation actually shows sits in its own row's
  `forms` rather than in a second row: `j'en ai marre`, `ça ne vaut pas le coup`, `j'ai la flemme`,
  `elle a la flemme`, `m'a posé un lapin`, `j'ai le cafard`, `coûte les yeux de la tête`,
  `ne coûte pas les yeux de la tête`, `ne te moque pas de`, `ne te moque pas`, `pour rire`,
  `blague`. A second row for any of them would have been unreachable behind the first.
- No paradigm row in either module lists a cell a lower level owns, because no cell of any of these
  paradigms is a bare word at all — they are multi-token idiom surfaces, and every one was checked
  free with `content:owner` before it was written into a `forms` list.

`npx vitest run tools/shown-surfaces.test.ts` is **11/11**, with en-fr holding at its baseline of
**20**. This wave neither raises it nor lowers it: the twenty findings are pre-existing, they live
below L5, and a level never edits a file below it.

`npm run content:validate` is green — **`CONTENT n/n ok`**, where the count climbs through the
wave as the eight sibling courses land in the shared checkout (`371/371` when these two files were
written, `377/377` an hour later). `npx vitest run src/course/types.test.ts`
is red on two count assertions — the 360-module census and hi-en's `toBe(40)` — both of which belong
to other waves and to the parent; `npx vitest run src/course/types.test.ts -t "en-fr"` is **44
passed**, so every en-fr language law in that file holds on these two files.

### Open questions for the native pass

108. **Idiom currency, one by one** (M1). The whole module rests on ten expressions being what a
     French speaker actually says in 2026 rather than what a textbook says they say. Confirm each
     of `en avoir marre`, `en avoir assez`, `ça vaut le coup`, `ce n'est pas la mer à boire`,
     `il pleut des cordes`, `avoir la flemme`, `poser un lapin`, `avoir le cafard`,
     `coûter les yeux de la tête`, `un coup de main` and `revenons à nos moutons` is current, and
     name any that now reads as dated or regional rather than merely familiar.

109. **The register labels on those eleven** (M1). The module claims `en avoir marre` is familiar
     but universal, `avoir la flemme` and `avoir le cafard` familiar, `ça vaut le coup` and
     `un coup de main` neutral, `ce n'est pas la mer à boire` neutral and slightly dated, and
     `revenons à nos moutons` neutral-to-formal — the only `formal` sentence in either file. Confirm
     or correct each label, and say in particular whether `revenons à nos moutons` still belongs in
     a meeting or has crossed into self-conscious quotation.

110. **`avoir le cafard` against `avoir la flemme`** (M1). Confirm both are still the ordinary
     everyday words for their moods, and advise whether `avoir le cafard` is heard as heavier than
     the English *feeling low* the cue gives it — the difference between a flat afternoon and
     something a friend would follow up on.

111. **Whether the literal rows are a gift or a distraction** (M1). `cafard` (cockroach), `cordes`
     (ropes) and `pluie` are taught bare so that the idioms' pictures are visible. Advise whether a
     French speaker experiences those pictures at all — the module's own note says nobody sees the
     insect — and whether teaching them helps a learner or teaches a false etymology.

112. **The density claim** (M1). Rule 4 states that one idiom per conversation is the honest figure
     and that a learner using six sounds like a phrasebook. Confirm the figure, and say whether the
     ceiling differs by register — whether familiar speech among friends carries more of them than
     the neutral register does.

113. **`ça vaut le coup` in the negative** (M1). `ça ne vaut pas le coup` ships as a form on the
     same row. Confirm the negative is as everyday as the affirmative, and whether
     `ça ne vaut pas le coup de venir` is what a speaker says or whether they reach for
     `ce n'est pas la peine` instead.

114. **The exclamative frames, and which one a speaker actually reaches for** (M2). Confirm that
     `qu'est-ce que tu es drôle` and `comme c'est malin` are both live in speech, and rank them:
     the module presents `comme` as the shorter and slightly more written of the two, which is a
     claim about frequency the emitted index cannot check.

115. **`mais bien sûr` said flat** (M2). The module makes it French's plainest irony marker, and
     S07 is built on it. Without audio this is the wave's most exposed claim. Advise whether the
     flat reading survives in writing at all, and what a writer does instead when it does not.

116. **`tu m'étonnes`** (M2). Taught as always ironic — *you don't say*, meaning it was entirely
     predictable. Confirm it never carries its literal reading in speech, and say whether it is
     safe with a colleague or friends-only.

117. **The register trio** (M2). `marrant` and `rigolo` familiar, `amusant` neutral, `drôle`
     between them. Confirm the ordering, and in particular whether `rigolo` is childish in a way
     that makes it wrong on an adult and whether `amusant` really is safe in a bar or merely stiff.

118. **`un drôle de type` and its productivity** (M2). S09's second variation is `un drôle de film`,
     on the claim that `un drôle de + noun` is a productive frame rather than a fixed pair with
     `type`. Confirm the frame is productive, and name the nouns it does NOT take.

119. **`type` as a bare noun** (M2). Taught as *bloke* — familiar, for a man. Confirm the register,
     confirm it is not pejorative on its own, and advise whether a learner should be given it at all
     before they can hear the difference between `un type` and `un mec`.

120. **The teasing boundary** (M2). Rule 6 states that teasing is for people who already know you,
     is never about what a person cannot change, and always leaves room to laugh back. Confirm this
     is the rule a French speaker would actually give a foreigner, and correct it if the real
     boundary sits somewhere else.

121. **`ne te moque pas de moi` as the stop line** (M2). The module offers it as both the playful
     and the serious version of *stop it*, separated only by tone. Advise whether a learner needs a
     second, unmistakably serious line — and if so, whether it belongs here or in L5-M7.

122. **The `ne` on every negative, in a module about how friends talk** (M1, M2). The course writes
     `ce n'est pas la mer à boire`, `ne le prends pas mal` and `ne te moque pas de moi` in full
     while stating in prose that speech drops the `ne`. Confirm that a learner producing the full
     forms out loud among friends sounds careful rather than stilted, since this is the register in
     which the drop is most nearly universal.

## Wave 2 — L5-M3, L5-M4 and L5-M5 (#587)

The level's RANGE modules: where the course stops being one French, learns the sentences that are
said standing up, and puts an idea in the subject seat. Authored against the briefs
`tools/course-briefs.ts` carries for these three rungs, and reviewed — as wave 1 was — against the
REAL emitted index rather than against the briefs' account of it. Every call to
`npm run content:owner -- en-fr …` in this wave closed with the same footer:

```
1043 surfaces owned, folded over 42 modules through L5-M2
```

**1043 surfaces, 42 modules, through L5-M2.** Wave 1's paragraph above says *981 surfaces, 40
modules, through L4-M10*; both halves are now stale by two rungs, which is the seam a wave 3 should
re-read rather than inherit. The deepest emitted index file is now
`public/content/en-fr/index/L5-M2.json` and it still carries **`maxSpan: 8`** — wave 1 moved it from
6 to 8 for its idioms, and that move is what made L5-M4's seven-token
`je suis de tout cœur avec vous` reachable at all. Had the fold still been at 6, the warmest
condolence in the module could never have matched and the row would have been a note nobody is shown.

Each module spends **25 word rows**, exactly the briefs' `newWordCap: 25`. They open **27, 27 and 32**
distinct index keys respectively — L5-M5 is the outlier because its abstract nouns each carry two
surfaces, elided and bare, on one row.

### L5-M3 "How they say it there" — regional and generational speech; what marks an outsider

The ten displays, in order:

1. `À Toulouse, on dit plutôt chocolatine`
2. `Travail, ou boulot entre amis`
3. `On se tutoie ?`
4. `Chez nous, on dit septante`
5. `C'est carrément bien`
6. `À Marseille, on dit plutôt poche`
7. `Femme, ou meuf entre amis`
8. `On se vouvoie ou on se tutoie ?`
9. `Chez nous, on dit soixante-dix`
10. `C'est trop relou`

It teaches the brief's four axes as four axes and not as one list. **PLACE** rides two frames that
are deliberately not interchangeable: `à + city, on dit plutôt + word` REPORTS (S01, S06), and
`chez nous, on dit + word` CLAIMS (S04, S09) — the same fact said by an outsider and by a native of
the place. `chocolatine` / `pain au chocolat`, `poche` / `sac`, and the numbers. **AGE** is verlan
(`meuf`, `relou`, `chelou`) and the intensifiers (`carrément`, and `c'est grave bien` whole).
**REGISTER** is the frame `<neutral>, ou <familiar> entre amis`, which is the module's cheapest and
most reusable move: `travail` / `boulot`, `voiture` / `bagnole`, `femme` / `meuf`, `homme` / `mec`,
`bonjour` / `salut`. **ADDRESS** gets its own pair of sentences because French has a verb for the
move and English has none: `on se tutoie ?` and `on se vouvoie ?`, both frozen on `on`, with S03's
`mistake` plate striking out the grammatical-but-unsaid `Nous tutoyons ?`.

**The fourth axis — what speech drops — is taught entirely in prose, and that is a decision, not an
omission.** Rule 3 names `il le sait pas`, `t'as`, `t'es`, `y a`, `ouais` and `chais pas`, says they
are real, and says why no display writes one (`docs/58` §4). The brief's note 5 offers `ouais`,
`t'as`, `t'es`, `y a`, `chuis` and `wesh` as free surfaces to take; its note 4 forbids any reduced
form inside a display. **This wave resolved that against itself by taking none of them at all** —
not as a display, not as a variation, not as a word row — so all six stay `free` for a later wave
that decides a word row is not a display. Recorded here rather than in the file, because the file
can only show what it did take.

`salut` is the module's quietest win and the brief's most surprising claim held: after forty-two
modules of a course whose L1-M2 is `bonjour` / `au revoir`, `content:owner` still printed
`salut	free`. S07 takes it as one word covering both ends of a meeting, which is exactly the shape
L1-M2 needed two words for.

### L5-M4 "Formal occasions" — toasts, speeches, condolences, ceremonies

The ten displays, in order:

1. `Je tiens à vous remercier`
2. `Au nom de l'équipe, toutes mes félicitations`
3. `La date a été changée par la mairie`
4. `Toutes mes condoléances`
5. `Permettez-moi de vous présenter mes vœux`
6. `Je tiens à remercier les invités`
7. `Au nom de tous, toutes mes condoléances`
8. `Le mariage a été annulé par la mairie`
9. `Toutes mes condoléances, cher monsieur`
10. `Permettez-moi de lever mon verre`

The passive is **built** here rather than frozen, which is what L4-M7 promised when it shipped
`est annulé` and `sera fermé` as whole announcement shapes: `a été` + participle, the participle
agreeing with the subject, the agent on `par`. S03 and S08 are the pair that makes the agreement
visible — `la date a été changée` against `le mariage a été annulé`, with each `mistake` plate
striking out the other's ending. Beside it, rule 2 states the frequency trap in the strongest terms
the brief allows: the form transfers word for word, so a learner builds it right and then uses it at
English frequency, and rule 3 gives the rule for choosing — **passive** when the doer is named or
pointedly withheld and the register is formal, **`on`** when the doer is irrelevant, **pronominal**
when the claim is about what is generally done. S08 carries all three on one sentence: the display,
the variation `On a annulé le mariage`, and the variation `Ça ne se fait pas`.

The other half of the module is four shapes handed over whole — `je tiens à`, `au nom de`,
`permettez-moi de`, `toutes mes condoléances` — plus the thing the brief was most insistent about:
**condolence is a noun in French and `je suis désolé` is thin**. S04 gives `toutes mes condoléances`
for everyone and `je suis de tout cœur avec vous` for someone you know, and its `mistake` plate is
the word-for-word import `Je suis désolé pour votre perte`, whose every word is French and which no
French speaker says.

### L5-M5 "Big questions" — values, beliefs, abstract talk

The ten displays, in order:

1. `Le bonheur, c'est l'essentiel`
2. `Ce qui compte, c'est la liberté`
3. `Je crois en la justice`
4. `Il s'agit de respect`
5. `Pour moi, l'important, c'est le respect, parce que chacun compte`
6. `La liberté, c'est un droit`
7. `Ce qui compte, c'est l'amour`
8. `Je crois en l'avenir`
9. `Il s'agit de comprendre le monde`
10. `Pour moi, la liberté est un droit, parce que chacun est différent`

Rule 0 is the module and everything else serves it: **an abstract noun in its general sense takes
the definite article, and the article does not mean *the*.** It is stated as a rule about the noun's
ROLE, never as a list, and it is enforced by the `mistake` plates rather than by repetition — four of
the ten strike out a bare noun (`Bonheur, c'est l'essentiel`, `Je crois en justice`,
`Ce qui compte, c'est amour`, `Pour moi, liberté est un droit`). S01's variation is the proverb the
brief named, `L'argent ne fait pas le bonheur`, with an article on each noun.

The cleft is the module's one clean transfer and rule 1 says so out loud: *what matters is* →
`ce qui compte, c'est`, *what I mean is* → `ce que je veux dire, c'est`. `ce qui` and `ce que` are
taught as two-token pairs (rule 2) because bare `que` has been L1-M9's since the first questions and
bare `qui` L3-M9's since people. `croire` splits three ways (rule 3): `en` for a cause, `à` for a
claim, `que` for a thought — and the third is pointed back at L3-M3, never reopened. Rule 6 is the
one a learner will not think to ask for: **say whose opinion it is.** `pour moi`, `selon moi`,
`au fond`.

### The seams the briefs got wrong, and what `content:owner` actually said

**1. The fold's own footer moved two rungs and neither brief knows it.** Wave 1 recorded
*981 surfaces over 40 modules through L4-M10*. Every call in this wave printed
`1043 surfaces owned, folded over 42 modules through L5-M2`. The count and the module are both part
of what a brief calls its INDEX SEAM, and both go stale on every wave.

**2. `annulée`, the feminine participle, is L4-M2's too — and the brief only warns about `annulé`.**
The L5-M4 brief's correction of `docs/91` §3 is right and it is not far enough:

```
annulé	L4-M2
annulée	L4-M2
fermé	L4-M2
ouvert	L4-M7
```

So the module that BUILDS participle agreement cannot open either half of the participle the brief
hands it. This is the en-it `sarei` case with a different verb: a paradigm row for `annulé` /
`annulée` would have swallowed two owned cells and been unreachable behind L4-M2's note.
**The free feminine participle this wave actually spends is `changée`**, and only because the fold
splits the pair the other way round:

```
changée	free
changé	L4-M8
```

S03's row is `changée`, its `forms` list is `["changée"]` and it does **not** list `changé` — the
masculine is L4-M8's and listing it would have been the swallowed cell. S08 SHOWS `annulé` and
`annulée` in a display and a variation and teaches neither: both resolve to L4-M2's row, which is the
correct outcome and is why `content:shown` prints clean rather than printing a re-teach.

**3. `par` is free, exactly as the brief claimed, and the reason is worth keeping.** `par	free`
after forty-two modules, although `par accident` (L2-M8), `par conséquent` (L4-M2) and `par contre`
(L4-M4) are all shipped — each is indexed WHOLE, so the bare preposition was never spent. Confirmed
against the emitted index, not against a grep.

**4. `maxSpan` is the gate the brief told us to check, and this time it opened.** `content:owner`
reports `je suis de tout cœur avec vous	free`; it is seven tokens and the fold runs at 8, so it
matches. The brief's own warning — a six-token phrase can never match while the course runs at 3 —
is a wave-1-era number twice over. Read `maxSpan` off the deepest emitted index file, every time.

**5. `permettez-moi` behaves exactly as printed, including its parts.**

```
permettez-moi	free   [parts: permettez → free, moi → L2-M1]
```

Taking it buys bare `permettez` and touches nothing else, because `moi` is already L2-M1's and a
hyphen part never steals an owned key. Same shape as the number in L5-M3:

```
soixante-dix	free   [parts: soixante → free, dix → L1-M8]
quatre-vingt-dix	free   [parts: quatre → free, vingt → L1-M8, dix → L1-M8]
```

S09 takes `soixante-dix` and its note is written to be true of the bare `soixante` it silently buys.
**`quatre-vingt-dix` was NOT spent** — it is named in prose in S04's note and stays free, so a later
wave that wants the bare `quatre` has an unspoiled purchase.

**6. `cher` is L1-M8's and means EXPENSIVE, exactly as the brief warned.** `cher	L1-M8`,
`chère	L1-M8`, `cher monsieur	free`. S09's row is the whole `cher monsieur`; a bare `cher` row
here would have sat behind a price note forever. The asymmetry the brief flagged also holds:
`monsieur	free` while `madame	L4-M7`, so this module takes `monsieur` and re-uses `madame` in a
variation without reopening it.

**7. The elision law is the whole story in L5-M5, and every pair the brief named came back free.**

```
argent	free      l'argent	free
amour	free      l'amour	free
idée	free       l'idée	free
essentiel	free  l'essentiel	free
important	free  l'important	free
avenir	free     l'avenir	free
espoir	free     l'espoir	free
liberté	free    la liberté	free
```

Rather than two rows per lexeme — which would have collided, since the second row's note is
unreachable — **each row carries both surfaces in one `forms` list**. That is why L5-M5 spends 25
rows and opens 32 keys.

**8. The brief's claim that `argent` is glossed but unowned held, and the proverb was left in
pieces on purpose.** `content:owner` also prints
`l'argent ne fait pas le bonheur	free` as a six-token whole. This wave did **not** take it whole:
`ne → L1-M3`, `pas → L1-M3`, `fait → L1-M5` and `le → L1-M1` all resolve already, so the proverb
needed exactly two new rows (`l'argent`, `bonheur`) and a learner tapping any word in it lands on the
article lesson rather than on a frozen block. The whole key stays free.

**9. Function words the L5-M5 brief did not list, and that the module leans on.** All confirmed by
`content:owner` before a display was written: `ce	L2-M1`, `crois	L3-M3`, `parce que	L1-M9`,
`est	L1-M1`, `a	L2-M2`, `pour	L2-M5`, `moi	L2-M1`, `compte	L3-M8`, `vie	L4-M8`, `gens	L3-M9`,
`monde	L2-M10`. `pour moi	free` and `selon moi	free` are taken as pairs anyway, because the pair
is the move.

**10. `on dit` is free and is deliberately not taken.** `on	L2-M6`, `dit	L2-M6`, `on dit	free`,
`on dit plutôt	free`. L5-M3 takes the three-token `on dit plutôt` because it is the reporting
frame; `chez nous, on dit X` resolves through the two L2-M6 rows on its own, so a second frame row
would have bought nothing and hidden nothing. The two-token `on dit` remains free.

**11. Nothing was grepped.** Every surface in all three modules was put to `content:owner` before it
was written, including the ones a grep over accented text would have missed — `carrément`,
`vérité`, `différent`, `cérémonie`, `félicitations` — and the ones a grep would have mis-joined:
`vœux` and `cœur` are written with the joined `œ`, which `normalizeSurface` does not decompose, so
`voeux` would have been a different key entirely.

### The ratchet

`npm run content:shown -- en-fr L5-M3`, `… L5-M4` and `… L5-M5` each print
`clean — every shown surface resolves`. **No `SHOWN-BUT-UNTAUGHT`, no `COLLIDES INSIDE THIS MODULE`
and no `RE-TEACH` in any of the three** — every key the three modules open was `free` when the wave
started, so there is no re-teach to justify anywhere in this section.

One `SHOWN-BUT-UNTAUGHT` was found and fixed rather than reasoned around: L5-M5-S01's second
variation first read `Le bonheur, c'est simple`, and `simple` had no row because the row budget went
elsewhere. The check named it (`SHOWN-BUT-UNTAUGHT L5-M5-S01 variation: simple`) and the variation
became `Le bonheur, c'est important`, which resolves through S05's `l'important` row and teaches the
article rule better than the adjective it replaced. This is the tool doing the job the brief says it
does; the wave did not run a build to find it.

Near-collisions designed around rather than discovered:

- A whole formula and its bare noun are two keys, and both rows exist because both surfaces are
  shown: `toutes mes condoléances` / `condoléances`, `toutes mes félicitations` (with no bare
  `félicitations` row, because no display shows one), `meilleurs vœux` / `vœux`, `cher monsieur` /
  `monsieur`, `ce qui compte` / `ce qui` / `ce que`, `on se tutoie` / `on se vouvoie` / `tutoyer`.
- `c'est grave bien` has **no bare `grave` row and never could**: `grave	L3-M10`. The whole phrase
  is the row, rule 5 says why, and S05's `mistake` plate strikes out the bare `C'est grave` so the
  learner meets the L3 meaning rather than tripping over it later.
- Every elided/bare abstract pair in L5-M5 sits in ONE row's `forms` list. A second row would have
  been an unreachable note, which is the `का` bug in its milder form.
- No paradigm row anywhere in the three files lists a cell a lower level owns. The one place it was
  tempting is L5-M4's participles, and it is the one place a hole was cut: `changée` alone, with
  `changé` (L4-M8) left out of its own `forms` list.

`npx vitest run tools/shown-surfaces.test.ts` is **11/11**, with en-fr holding at its baseline of
**20**. This wave neither raises it nor lowers it: the twenty findings are pre-existing, they live
below L5, and a level never edits a file below it.

`npm run content:validate` is green — **`CONTENT n/n ok`**, where the count climbs through the wave
as the eight sibling courses land in the shared checkout (`396/396` when these three files were
written, `404/404` a few minutes later).
`npx vitest run src/course/types.test.ts` is red on three count assertions — the 378-module census,
en-ar's `toBe(42)` and hi-en's `toBe(42)` — all three of which belong to the parent and to sibling
waves, not to en-fr. `npx vitest run src/course/types.test.ts -t "en-fr"` is **47 passed**, so every
en-fr language law in that file holds on these three files: straight apostrophes in every L2 slot,
no `glossEn`, declared keys only, every `deconstruction.rules` index in range.

### Open questions for the native pass

123. **The two place frames, and whether a French speaker hears the difference the module claims**
     (M3). Rule 1 says `à + city, on dit plutôt X` REPORTS from outside and `chez nous, on dit X`
     CLAIMS from inside. Confirm that is real and not an author's tidy distinction, and say what a
     Toulousain actually says when correcting a Parisian.

124. **`poche` for a carrier bag, and how far it travels** (M3). The module gives it as Marseille's
     word and `sac` as everywhere else's. Confirm the geography — is it Marseille, Provence, the
     whole Midi? — and confirm a learner offered *une poche* at a till in Nice would hear the same
     word.

125. **`septante` and `nonante` as ordinary rather than quaint** (M3). The `trap` on S04 tells the
     learner not to repeat them back with a smile. Confirm that is the right instruction, and say
     whether `huitante` (named in prose only, and left unspent in the index) deserves the same
     footing or is genuinely narrower.

126. **The three verlan words, and whether three is the right number** (M3). `meuf`, `relou` and
     `chelou` are given as the ones that stuck, with rule 7 warning that verlan is a live game and
     not a closed list. Confirm all three are current in 2026 and not now dated, and name any that a
     twenty-year-old would no longer say.

127. **`carrément` / `grave` / `trop` as an age ladder** (M3). Rule 0 and S10's `mistake` plate claim
     that mixing `très` with `relou` sounds like two people wrote the sentence. Confirm the ladder —
     `très` ageless, `carrément` youngish, `grave` young — and correct the rungs if it is wrong.

128. **`meuf` as never an address** (M3). S07's `mistake` plate says you use it ABOUT someone and
     never TO them, and that calling a woman `meuf` to her face is rude rather than familiar.
     Confirm, and say whether the same holds for `mec`, which the module gives without that warning.

129. **The reduced forms taught only in prose** (M3). Rule 3 names `il le sait pas`, `t'as`, `t'es`,
     `y a`, `ouais` and `chais pas` and no display writes one, per `docs/58` §4. Advise whether a
     learner can actually acquire the listening skill from prose alone, and if not, what the course
     should do that does not break the writing law.

130. **`je tiens à` as the lectern opener** (M4). The module gives it as warmer and more deliberate
     than `je voudrais`, and the `trap` forbids hedging in front of it. Confirm the register, and
     confirm it is what is said at a leaving party rather than only in writing.

131. **Passive frequency, stated as a rule** (M4). Rule 2 says the passive is for formal register
     and for a named or pointedly withheld doer, and that `on a annulé` is what is said everywhere
     else. Give a French speaker's own division, and say whether the module's three-way rule
     (passive / `on` / pronominal) is one a native would recognise or an author's scaffold.

132. **`toutes mes condoléances` as the whole thing, said once** (M4). S04's `usage` says it is said
     once and not elaborated, and its `mistake` plate strikes out `Je suis désolé pour votre perte`.
     Confirm the flat delivery is right, and say what — if anything — is added when the death is very
     close to the person you are speaking to.

133. **`je suis de tout cœur avec vous` and who it is for** (M4). Given as the warm version, for
     someone you know. Confirm it is current and not written-only, and say whether it can be said to
     a colleague or only to a friend.

134. **`cher monsieur` at a funeral door** (M4). S09 puts a written-letter address into a spoken
     scene. Confirm that works out loud, or say whether `cher monsieur` belongs on the card only and
     the door wants something else.

135. **`lever mon verre` and `à votre santé` as one move** (M4). S10 has the glass going up before
     the words. Confirm the sequence and the formality, and say whether `à votre santé` is right at
     a wedding or whether the toast there has a different formula.

136. **The article rule, stated as ROLE rather than as a list** (M5). Rule 0 says any noun used in
     its general sense takes the definite article. Confirm the rule is safe stated that broadly, and
     name the ordinary cases where it fails, so a later wave can add the exception rather than
     leaving a learner to find it.

137. **`croire en` / `croire à`, and whether the split survives contact** (M5). Rule 3 gives `en` for
     a person, a cause or a future and `à` for a claim, a story or ghosts. Confirm, and say whether
     `je crois en la justice` and `je crois à la justice` really carry the two different readings the
     `trap` on S03 assigns them.

138. **`il s'agit de` frozen on `il`** (M5). The module says no other subject exists for this verb
     and strikes out `Ça s'agit de`. Confirm, and say whether a learner will meet
     `dont il s'agit` often enough that its absence here is a gap.

139. **`pour moi` / `selon moi` / `au fond` as a register ladder** (M5). Rule 6 makes the marker
     close to obligatory in French argument. Confirm that claim, confirm the ladder's order, and say
     whether an unmarked general claim really does land as an assertion on everybody's behalf.

140. **`chacun` as the abstract talker's word for people** (M5). Given as singular always, taking no
     article. Confirm, and say whether `chacun compte` and `chacun est différent` are sentences a
     French speaker would produce or only ones they would understand.

## Wave 3 — L5-M6 through L5-M10 (#595)

The level's closing five, and the course's: how to argue, how to hear what was not said, what to do
when the word will not come, how to retell something written in a tense you will never say, and —
last — how to change register on purpose inside one piece. Authored against the briefs
`tools/course-briefs.ts` carries for these five rungs and reviewed, as waves 1 and 2 were, against
the REAL emitted index rather than the briefs' account of it. Every call to
`npm run content:owner -- en-fr …` in this wave closed with the same footer:

```
1127 surfaces owned, folded over 45 modules through L5-M5
```

**1127 surfaces, 45 modules, through L5-M5.** Wave 2's paragraph above says *1043 surfaces, 42
modules, through L5-M2*, and wave 1's says *981, 40, through L4-M10*; both are stale by three rungs
and this one will be too. The deepest emitted index file is now
`public/content/en-fr/index/L5-M5.json` and it still carries **`maxSpan: 8`**. That number is load
bearing here for the second time: L5-M10's `si vous voyez ce que je veux dire` is EXACTLY eight
tokens — the deepest key on this ladder — and had wave 1 not moved the fold from 6 to 8 for its
idioms, the last module's most characteristic line could never have matched.

The five modules spend **25, 20, 19, 22 and 14 word rows** against a `newWordCap` of 25 throughout.
The descending shape is deliberate and is what the briefs asked for: L5-M6 is the level's densest
module and L5-M10 is an exit module, whose honest spend is a handful of sign-offs and two nouns.

### L5-M6 "Arguing a position" — a structured case, objections answered

The ten displays, in order:

1. `D'une part c'est utile, d'autre part c'est trop cher`
2. `Bien que ce soit vrai, ce n'est pas une preuve`
3. `C'est tellement cher que je ne peux pas. Néanmoins, c'est utile`
4. `Il y a tant de gens que c'est difficile`
5. `Quoique ce soit juste, je ne suis pas d'accord. Au contraire`
6. `Malgré le prix, c'est la meilleure solution. Autrement dit, c'est utile`
7. `Que pensez-vous de cette idée ?`
8. `Certains sont pour, d'autres sont contre. Or, la plupart ne disent rien`
9. `C'est cher, si bien que personne ne vient. En effet, c'est le problème`
10. `Premièrement c'est utile. Deuxièmement, ce n'est pas cher. En conclusion, c'est suffisant`

It takes the three things L4 left here, and takes them as ONE lesson rather than three lists.
**CONCESSION** is `bien que` and `quoique` with the subjunctive (S02, S05) and `malgré` with a bare
noun and no clause at all (S06). **RESULT** is `tellement … que`, `tant de … que`, `si bien que`,
`au point que` and `de sorte que` (S03, S04, S09). The two are deliberately adjacent, because rule 0
states the thing the briefs asked for by NAME rather than by pattern: `bien que` bends the verb
because what it concedes is not being asserted, and a result clause does not bend because the result
actually happened. Both mistake plates say it from the other side — `Bien que c'est vrai` on S02, and
`si bien que personne ne vienne` on S09 — so the error is shown facing in both directions.

**INVERSION** lands on S07 alone and is framed as a REGISTER rather than a grammar: rule 3 says
`est-ce que` stays correct everywhere and is what you say out loud, and the trap says a learner who
inverts everywhere sounds like a nineteenth-century novel. The module's single inverted key
(`que pensez-vous`, with `qu'en pensez-vous` and `comment expliquer que` on the same row) is the
whole purchase — the brief's finding that inversion is almost free in the index held exactly, and is
recorded below.

`or` gets the module's sharpest interference treatment: its own rule, its own row tagged
`interference`, and a mistake plate whose only change is `Ou` for `Or`. It is the level's second
false friend after L4-M4's `actuellement` and the first that inverts the meaning of a whole argument
rather than one word. The outline runs on `premièrement` / `deuxièmement` / `troisièmement`,
`d'une part` / `d'autre part` and `en conclusion` / `pour conclure` / `en résumé`, with rule 4
pointing back at L2-M10's `d'abord`, `ensuite`, `enfin` and saying what separates them: those three
NARRATE and these ARGUE. The past and imperfect subjunctive are named as not-taken in rule 6, in the
module a reader would expect to meet them in.

### L5-M7 "Between the lines" — implication, sarcasm, indirect requests

The ten displays, in order:

1. `Ce n'est pas mal, ton idée`
2. `Mine de rien, ce n'est pas terrible, sérieux`
3. `Tu n'aurais pas un stylo ?`
4. `Mais si, je te l'avais dit`
5. `Tu aurais pu me le dire, quand même`
6. `Passe-le-moi, ce n'est pas grave`
7. `Je vous l'envoie tout de suite`
8. `Il fait un peu froid ici, non ?`
9. `Ça ne te dérangerait pas de fermer la porte ?`
10. `Cela dit, je vois le sous-entendu`

Two systems, and the second is grammar. **LITOTES** is S01 and S02: `pas mal`, `pas faux` and
`pas bête` on one row, and `pas terrible` on its own with rule 1 to itself, because it is the one
that reverses. That separation is the module's main authoring decision — putting `pas terrible` on
the praise row would have given four surfaces one note, and the note would have been false for a
quarter of them. **TWO OBJECT PRONOUNS** are S04, S05, S06 and S07: `me le` / `te le` / `le lui` in
statements, and the flip after a positive imperative in `passe-le-moi` / `donne-le-moi` /
`dis-le-moi`. Rule 3 ties that flip back to L4-M1's positive-versus-negative pronoun rule rather than
presenting it as a new fact.

**Rule 6 says out loud that this course has no audio, and that the constraint is content.** The
brief asked for exactly that, and it is honoured in the material as well as in the prose: every
ironic line here is recoverable from the words and the situation alone. S08's
`Il fait un peu froid ici, non ?` is the test case — the sentence is literally true, the request is
entirely in where it is said, and the `non ?` hands the noticing to the other person. Nothing in the
module needs a voice to land, and the lines that would have have been left out rather than faked.

`si` is handled the way the brief demanded: `content:owner` reports `si → L3-M4` as the conditional
*if*, so the contradicting *si* can never have a bare row. It is taken whole as `mais si` and `si si`
on one row (S04) with rule 4 naming the homograph, and the mistake plate contrasts `Mais oui` with
`Mais si` so a learner meets the wrong answer as well as the right one.

### L5-M8 "When words run out" — paraphrase, ask what something means, repair a misunderstanding

The ten displays, in order:

1. `C'est un truc qui sert à ouvrir les bouteilles`
2. `Comment on dit ça en français ?`
3. `Qu'est-ce que ça veut dire, ce mot ?`
4. `C'est le machin dont je parle`
5. `Ce n'est pas ce que je voulais dire`
6. `Je me suis mal exprimé, excusez-moi`
7. `Je n'ai pas compris, vous pouvez répéter ?`
8. `Vous pouvez expliquer autrement, plus lentement ?`
9. `C'est-à-dire que je ne trouve pas le mot`
10. `Ça s'écrit comment ? Vous pouvez épeler ?`

Authored as a survival kit, in the brief's words, and not as a grammar chapter — but the grammar is
there and is stated by ROLE. Rule 0 says `qui` is the SUBJECT of its clause and `que` the OBJECT, and
rule 1 says in as many words that English's who/which cut runs at right angles to it, so the English
instinct is wrong half the time rather than merely unhelpful. Rule 2 covers the error a learner
actually makes most: English DROPS the relative and French never may. `dont` is the module's one
genuinely fresh bare relative (S04), taught by looking at the VERB — if it takes `de`, the relative is
`dont` — and `ce dont` is named in rule 7 and left shut, exactly as the brief asked.

Around the relative sit the placeholders (`machin`, with `truc` and `chose` on the same row) and the
four repair moves of rule 5: ask for the word (S02), ask what a word means (S03), ask for a repeat or
a rewording (S07, S08), take back what came out wrong (S05, S06). S08 is the one worth defending:
the brief wanted `plus lentement`, and the module pairs it with `expliquer autrement`, because a
repeat at the same speed helps nobody and a rewording is the request a French speaker will act on.
`épeler` appears as a REQUEST made of the other person (S10) and the alphabet is not taught, per the
brief. `lequel`, `duquel` and `auquel` are named as not-taken in rule 7.

### L5-M9 "Telling it your way" — retell a known story in your own register

The ten displays, in order:

1. `Il était une fois un roi et une reine`
2. `Dans l'histoire, le roi alla dans la forêt`
3. `Le loup vint et le roi prit le château`
4. `Il fut roi, et il eut raison`
5. `Dans le conte, il dit non au roi`
6. `En gros, je raconte une histoire de roi`
7. `Et là, le personnage est parti dans la forêt`
8. `Dans l'histoire il prit le château, mais moi je dirais qu'il est parti`
9. `Bref, voilà la fin de l'histoire`
10. `Voilà ma version de l'histoire, en gros`

The passé simple is taken as **recognition only and in the third person only**: `alla`/`allèrent`,
`vint`/`vinrent`, `prit`/`prirent`, `fut`/`furent`, `eut`/`eurent`. The brief asked for the
not-produced rule to be said twice, and it is: rule 0 states it, and S04's mistake plate
(`Je fus roi quand j'étais petit`) is a second statement of the same law with a first person in it,
after S02's plate has already struck out `Hier, je alla`. Rule 1 carries the mapping that is the
actual skill — read `il alla`, say `il est allé` — and names L4-M7's futur simple as the precedent.

**S08 is the module in one line.** `Dans l'histoire il prit le château, mais moi je dirais qu'il est
parti` holds both tenses in one sentence: the page's `prit` untouched, and the speaker's half in the
passé composé. Its mistake plate is the same sentence with `qu'il partit`, which is the failure the
whole module exists to prevent.

**The `dit` homograph is handled by never opening a row for it.** `content:owner` reports
`dit  L2-M6`, and the third-person passé simple of `dire` is spelt identically to the present and to
the participle L2-M6 owns. So S05 takes `il dit` as a two-token key, rule 5 explains the collapse,
and the mistake plate strikes out the invented `il disa` — which is how a learner tries to make the
form regular when nobody has told them it is already there. The retelling furniture around it is
`il était une fois`, `en gros` (with `du genre` and `genre` on the same row), `et là`, `bref`,
`voilà`, `raconte`, `version` and `fin`/`morale`; everything else is L1-M10, L2-M10, L3-M10 and
L4-M10 re-used and pointed back at, and no new narrative connector was opened.

### L5-M10 "Your own voice" — a piece that changes register midway

The ten displays, in order:

1. `Bonjour madame, je vous remercie`
2. `Je voudrais vous parler de ce poste`
3. `Pour être honnête, l'entretien a été difficile`
4. `En revanche, le travail est vraiment intéressant`
5. `C'est un bon poste, si vous voyez ce que je veux dire`
6. `On se tutoie ? Entre nous, c'est plus simple`
7. `Du coup, on se voit demain ?`
8. `Par contre, le chef est un peu relou`
9. `Si tu veux, un café ?`
10. `Bref, à plus. Bonne journée`

One speaker, one interview, and the turn at S06. Five sentences in `vous`, the offer, four in `tu`.
The brief asked for the switch to be MOTIVATED by something inside the account, and the motivation is
S03 and S05: the candidate admits the interview was hard (`pour être honnête`) and then says
something and leaves half of it unsaid (`si vous voyez ce que je veux dire`). Only after those two
does `on se tutoie ?` read as plausible rather than performed.

**All four carriers move, and the module says so.** Rule 0 names them — address pronoun, connector,
lexis, sentence shape — and S08 is the sentence built to prove it: `par contre` for `en revanche`,
`chef` for a formal title, `relou` for `pénible`, `un peu` doing the hedging. Four familiar choices
in eight words, **and not one of them is the pronoun.** Its mistake plate is the same line opened
with `Toutefois`, which is one written connector against one break-room adjective — the collision
this module exists to name. S01's plate does the same at the other end (`Salut` with `vous`), and
S05's plate breaks the switch by a single sentence (`si tu vois` one line before the offer).

**Rule 4 is the statement the brief asked for and the clearest thing this course can say about
itself.** English carries register on contraction; French carries it on the dropped `ne`; and this
course writes the `ne` in both halves by its own law (`docs/58` §4). So the most audible marker of
familiar French is unavailable to any display in this module, and the switch a learner can SEE is
carried by pronoun, connector and lexis instead. It arrives in the last module of the course, where a
learner is finally equipped to hear what is missing.

The module opens **fourteen rows and nothing structural**: `je vous remercie`, `poste`,
`pour être honnête`, `entretien`, `vraiment`, `si vous voyez ce que je veux dire`, `entre nous`,
`simple`, `on se voit`, `chef`, `si tu veux`, `un café`, `à plus`/`à bientôt` and `bonne journée`.
Every carrier it leans on was already paid for: `vous` L1-M2, `tu` L2-M1, `on`/`nous` L2-M6,
`en revanche`/`par contre`/`quand même` L4-M4, `du coup` L4-M2, `madame` L4-M7, `travail` L3-M2, and
`salut`/`boulot`/`relou`/`on se tutoie` L5-M3.

### The seams the briefs got wrong, and what `content:owner` actually said

**1. The wave's own working assumption about the emitted index was wrong, and it was wrong in the
useful direction.** This wave began believing `public/content/` was current through L4-M10 and that
`content:owner` could therefore not see waves 1 and 2. It can. Every call printed
`folded over 45 modules through L5-M5`, and `public/content/en-fr/index/` holds an `L5-M5.json`
whose `cumulativeThrough` is 45 entries long. That is the single most valuable correction this wave
has to offer, because it is what let the next four findings be found by asking instead of by
guessing.

**2. L5-M8's brief lists `ce qui` and `ce que` as free. Both are L5-M5's.**

```
ce qui	L5-M5
ce que	L5-M5
```

The brief was written before wave 2 shipped and could not have known. The consequence is small and
real: S05's `Ce n'est pas ce que je voulais dire` shows `ce que` and teaches nothing for it, because
L5-M5's row is what a learner tapping it is shown. The trap on S05 says so in as many words rather
than pretending the pair is new here.

**3. L5-M8's brief says `c'est-à-dire` BUYS bare `dire`. It does not — `dire` is L5-M5's.**

```
c'est-à-dire	free   [parts: c'est → L1-M8, à → L1-M4, dire → L5-M5]
```

The brief's instruction was to "take it deliberately, and write the note for the bare infinitive
rather than only for the hyphenated whole". That instruction is now impossible to carry out: every
one of the three hyphen parts is owned before this module reaches them, so the purchase is the whole
key and nothing else. The note on S09 is written for the connector alone, which is what the surface
actually earns.

**4. L5-M8's brief left `qu'est-ce que` conditional, and the condition resolved.** It said: "if
L5-M2 has already taken `qu'est-ce que` whole, this is a re-use; if it has not, this module buys bare
`qu'est`. The two modules must not both open it, and whichever ships first owns it." L5-M2 shipped
first:

```
qu'est-ce que	L5-M2   [parts: qu'est → L5-M2, ce → L2-M1]
qu'est-ce que ça veut dire	free   [parts: qu'est → L5-M2, ce → L2-M1]
```

So L5-M8 buys nothing there and S03 re-uses the L5-M2 key. The brief's conditional worked exactly as
a brief's conditional should, and is recorded here so the next wave does not re-litigate it.

**5. L5-M10's standing warning was right about the mechanism and wrong about two names on its list.**
It warned that `salut`, `bref`, `monsieur`, `dire`, `par`, `dont`, `qu'est-ce que` and the L5-M3
register twins would all have been taken by the time this module was authored. Six of the eight had:

```
salut	L5-M3        boulot	L5-M3        bagnole	L5-M3        on se tutoie	L5-M3
monsieur	L5-M4    par	L5-M4         dire	L5-M5        qu'est-ce que	L5-M2
```

But `bref  free` and `dont  free` at the moment they were read, because the modules that take them —
L5-M9 and L5-M8 — are in THIS wave and the index cannot see a module that has not been built.
`tools/check-shown.ts` can, and does: it folds `L5-M1` through the module under test off disk, which
is why L5-M10 showing `Bref, à plus` resolves against L5-M9's row and needs no purchase. **The
lesson for a later wave is that `content:owner` and `content:shown` answer different questions, and
only the second one knows about your siblings.**

**6. Everything else in the four remaining briefs held, and two claims held that were worth
re-checking.** L5-M6's forty-one named surfaces were all still `free`, `par exemple` included; its
outline finding held (`d'abord  L2-M10`, `ensuite  L2-M10`, `enfin  L2-M10`); and its inversion
finding held in full —

```
que pensez-vous	free   [parts: pensez → L1-M9, vous → L1-M2]
avez-vous	free   [parts: avez → L1-M5, vous → L1-M2]
n'est-ce pas	free   [parts: n'est → L2-M7, ce → L2-M1]
puis-je	free   [parts: puis → L1-M10, je → L1-M1]
```

— every hyphen part owned, so an inverted question strands no bare word. L5-M7's seam held entirely,
and one detail is worth adding to it: the brief records `aurais → L4-M3`, and the ELIDED `n'aurais`
is L4-M3's too, which is why `tu n'aurais pas` is a purchase of the whole key and of nothing under
it. L5-M9's seam held, `dit  L2-M6` included, and `pris  L2-M10` besides — so `prit` needed a row of
its own while the spoken `il a pris` needed nothing at all.

**7. Three surfaces were contested INSIDE this wave and had to be allocated by hand.** `cela dit` is
offered by both L5-M7's and L5-M10's briefs; it went to L5-M7. `voilà` is offered by both L5-M9's and
L5-M10's; it went to L5-M9. `en résumé` sits on L5-M6's `en conclusion` row, so L5-M9's `version` row
takes only the bare noun `résumé`. Nothing was taught twice and no module re-opened another's key.

**8. `content:shown` caught what reasoning missed, six times, and every one was in a `variation`.**
`l'envoie` and `dérangerait` in L5-M7, `vend`, `quoi` and `s'écrit` in L5-M8, `ils`/`rois` in L5-M9.
Variations are scanned exactly as displays are and are the easiest place in a module to leak an
untaught surface, because they are written last and read least. Two were fixed by adding the elided
form to the row that already owned the phrase, three by changing the variation, and one — `quoi` —
by opening a row that turned out to be worth having on its own (`ça veut dire quoi ?`,
`ça sert à quoi ?`, the question word speech leaves at the end).

### The ratchet

`npx vitest run tools/shown-surfaces.test.ts` → **11/11**, with `en-fr` holding at its baseline of
**20**. No baseline was lowered and none was raised. `npm run content:validate` → **`CONTENT n/n
ok`**, every module passing (the total climbed from 443 to 448 across this wave's runs as the
sibling courses landed theirs, which is why the figure is not quoted as a number here).
`npm run content:shown -- en-fr <module>` prints `clean — every shown surface resolves` for all
five, with **no RE-TEACH lines at all** — which is a first for this course at L5, and is the direct
result of finding out that `content:owner` could already see waves 1 and 2.

`npx vitest run src/course/types.test.ts` is red only on CENSUS assertions — the module-file list and
the per-course counts for `en-ar` and `hi-en` — none of which are en-fr's, all of which are the
parent's to reconcile, and all of which moved between this wave's first and last run as the sibling
waves landed. Every language law in that file passes, `keeps en-fr to the decisions its briefs
settled: straight apostrophes, vous (#327)` included: straight apostrophes throughout, no `glossEn`
anywhere, and the L1-scoped `tu` ban untouched by a level that spends four sentences in `tu` on
purpose.

### Open questions for the native pass

141. **`or` as a written-only pivot** (M6). Rule 2 and S08 give it as the turn word an argument uses,
     and the module places it only in writing-shaped sentences. Confirm that a French speaker uses
     `or` in speech at all, and if so in what kind of speech — a seminar, an argument in a kitchen,
     neither.

142. **`quoique` and `bien que` as genuinely interchangeable** (M6). S05's second variation swaps one
     for the other and claims the swap "changes nothing at all". Confirm, and say whether `quoique`
     carries any register or regional colour that `bien que` does not.

143. **`d'une part` as a promise that must be kept** (M6). S01's trap says half the pair alone
     "sounds like a sentence you abandoned". Confirm that a French speaker really would hear an
     unanswered `d'une part` as incomplete, rather than as ordinary loose speech.

144. **`en effet` as agreement rather than restatement** (M6). Rule 5 and S09 give it as *yes, and
     here is why*. Confirm the boundary against `en fait` (L4-M4's) and say whether a learner who
     uses `en effet` where `en fait` belongs sounds wrong or merely formal.

145. **The claim that `pas mal` is praise rather than faint praise** (M7). S01's trap says answering
     an idea with `c'est bien` can land flatter than `pas mal`. Confirm, and say whether that holds
     for a colleague's work as well as for a friend's cooking.

146. **`pas terrible` reversing, and how reliably** (M7). Rule 1 rests on `terrible` meaning *great*
     in speech. Confirm that reading, and say whether `pas terrible` is ever heard with the literal
     *not terrible* sense — for instance after someone has just said something was terrible.

147. **`sérieux` as a sentence-final interjection** (M7). S02 puts it at the end as *honestly*.
     Confirm the position, and say whether it reads as young — the module tags the sentence informal
     but makes no age claim, and L5-M3 was careful to.

148. **The answer to `ça ne te dérangerait pas` running backwards** (M7). S09's trap says the willing
     answer is `non`. Confirm, and say what a French speaker actually says when they want to agree
     warmly rather than merely say no.

149. **`machin` and `truc` as equally ordinary** (M8). S04's row puts them on one note as
     interchangeable masculines. Confirm, and say whether either is markedly more dismissive of the
     object or of the listener.

150. **`ça s'écrit comment ?` against `comment ça s'écrit ?`** (M8). S10 puts the question word at the
     end and the trap calls that what speech does. Confirm, and say whether the fronted version is
     merely more careful or actually more common in a shop or a doctor's waiting room.

151. **`je me suis mal exprimé` as the everyday repair** (M8). S06 gives it as short and ordinary.
     Confirm, and say whether it is heard between friends or only in settings where the speaker has
     something to lose.

152. **The passé simple forms chosen, and whether they are the right five** (M9). The module takes
     `fut`, `eut`, `alla`, `prit` and `vint` plus the plurals. Confirm these are the five a learner
     will actually meet first in a tale or a news column, and name any sixth that outranks one of
     them.

153. **`il dit` read as a past inside a tale** (M9). Rule 5 says the surroundings are the only signal.
     Confirm that a French reader resolves it without effort, and say whether a learner who reads it
     as a present loses anything a native would notice.

154. **`et là` licensing the historic present** (M9). Rule 4 and S07's second variation give it as the
     marker that changes lane. Confirm, and say whether `et là` is compatible with a passé composé
     clause in the same breath, which S07's main display assumes it is.

155. **`ma version` as an ordinary sign-off for a retelling** (M9). S10 closes the module on it.
     Confirm that a French speaker would end a retelling this way rather than with something like
     `voilà, c'est à peu près ça`.

156. **The whole of M10's turn, judged as one piece.** Ten sentences, one speaker, `vous` to `tu` at
     S06. Confirm that the motivation in S03 and S05 is enough to make the offer plausible, that the
     four familiar sentences really do read as one register rather than as a formal speaker using
     familiar words, and — the question this course cannot answer for itself — whether a piece with
     the `ne` written throughout can be heard as familiar French at all, or whether rule 4's
     admission is in fact an admission that the second half is unachievable in writing.

157. **`chef` as the neutral word for a boss** (M10). S08's row gives it for the head of anything and
     puts L3-M2's `patron` aside as the owner. Confirm, and say whether `chef` said about your own
     manager to a near-stranger is as unremarkable as the module assumes.

158. **`à plus` with the `s` sounded** (M10). S10's `sound` line claims the `s` is pronounced in the
     goodbye and nowhere else `plus` appears. Confirm — this is the one purely phonetic claim in the
     wave and the course has no audio to check it against.
