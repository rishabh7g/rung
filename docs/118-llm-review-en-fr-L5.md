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
