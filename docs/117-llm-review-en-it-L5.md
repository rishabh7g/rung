# en-it L5 — LLM review

The review that clears each en-it L5 wave to ship, written in the same change that authors it
(`CLAUDE.md`, "Ship `verified: true` in the authoring change"). The **native-speaker gate is a
separate, stricter bar and stays unmet**: every section below ends in open questions for a native
pass, and no later wave may close one of them by rewriting a shipped module.

Open questions CONTINUE this course's chain, and the chain has a seam in it that this file has to
name before it can use it. `docs/108-en-it-L5-brief-decisions.md` ends at **76**, but
`docs/99-llm-review-en-it-L4.md` already runs **62 → 102**: both files continued from `docs/90`'s
last number, 61, so the range 62–76 is *already used twice* in this course. Starting this file at 77
would collide a third time. It therefore starts at **103**, one past the highest number the course
has actually issued. Nothing existing is renumbered, and a later L5 wave should take its max from
this file as well as from `docs/108`.

## Wave 1 — L5-M1, L5-M2 (#577)

Authored against the briefs in `tools/course-briefs.ts` and the decisions recorded in `docs/108`,
and reviewed against the REAL cumulative index rather than against the briefs' account of it. Every
seam below was checked with `npm run content:owner -- en-it …` before a line was written, and the
tool reported **1350 surfaces owned, folded over 40 modules through L4-M10**, at **`maxSpan` 3** —
the deepest emitted index in `public/content/en-it/index/`, `L4-M10.json`, whose `cumulativeThrough`
is 40 long. That is the fold these two modules were planned against. Neither brief names a surface
count; the number is recorded here so the next L5 wave can tell whether its own brief has gone stale.

**`maxSpan` moves in this wave, and this is the one place in the course where it does.** `in bocca
al lupo` and `meglio tardi che mai` are four tokens each and are indexed WHOLE, so the emitted index
goes from 3 to 4 at `L5-M1`. Nothing else in either module is longer than three tokens — `non vedo
l'ora` is *three*, because the elision stays inside `l'ora` under the en-it apostrophe law, and
`Non ce la faccio` is `non` (L1-M3) standing in front of the three-token `ce la faccio`, so no
four-token key is bought for the negative. Between them the two modules add **61 keys**; after the
wave `content:owner` reports **1411 surfaces owned, folded over 42 modules through L5-M2**.

### L5-M1 "Sayings and idioms" — the phrase that must not be built

The ten displays:

1. `In bocca al lupo! Crepi!`
2. `Non vedo l'ora di partire`
3. `Meglio tardi che mai, dice il proverbio`
4. `Piove sul bagnato è un modo di dire, non alla lettera`
5. `Mi raccomando, non dimenticare le chiavi`
6. `Grazie mille! Figurati, non è niente`
7. `Ce la faccio, piano piano`
8. `Me la cavo bene con l'italiano`
9. `Me ne vado a casa, è tardi`
10. `Boh, se la prende sempre per niente`

Every module below this one taught sentences a learner BUILDS. This is the first that is about
sentences which must not be built at all, and the whole of its difficulty is that instinct: a learner
who has just spent forty modules learning to assemble Italian has to be told, for ten sentences, to
stop. Rule 0 says it in the only form that survives contact with the material — a frozen phrase is a
single long word with spaces in it, and the grammar underneath it is not the grammar being used.
S01, S03 and S04 are the proof: `meglio` is L2-M9's and `tardi` is L2-M7's and `piove` is L1-M9's,
and not one of those rows is re-opened, because the saying is bought whole and taking it apart is
what breaks it.

The second half of the module is the pronominal verb, and it is taught the way the brief demands:
as a LEXEME and never as a paradigm. Each of the four gets two rows — the infinitive
(`farcela`, `cavarsela`, `andarsene`, `prendersela`), which is the shape a dictionary lists, and one
conjugated cell carrying at most one alternate in `forms` (`ce la faccio`/`ce la fai`,
`me la cavo`/`te la cavi`, `me ne vado`/`se ne va`, `se la prende`/`te la prendi`). No third person
is invented to complete a set, and rule 1 states plainly that the machinery which attaches the
pronouns is L5-M8's and that these four are to be taken whole until then — the same deferral L2-M1
made when it shipped `scusi` and left the mood behind it for later. Four of the ten mistake plates
are the `mi la` / `si la` error, because `mi` becoming `me` in front of `la` and `ne` is the one
piece of the machine a learner meets before the machine itself.

The obligatory reply, which English has no analogue for at all, is rule 3 and is shown twice: `Crepi`
in S01, where the mistake plate is the learner's `grazie`, and `Figurati` in S06, which is the same
move running the other way — the reply, not the opening. S02's trap is the third face of the same
interference: `buona fortuna` is real Italian that an Italian avoids in exactly the moment an
English speaker reaches for *good luck*.

What the module deliberately does not do: no vulgar or aggressive idiom (L5-M2's, and even there only
as a named category), nothing regional (L5-M3's), no ironic USE of a saying (L5-M7's) — every item
here is meant sincerely and every `usage` line says who says it to whom — and no attachment rule.

**20 rows** against a cap of 25, `minWordsPerSentence` 3, `maxWordsPerSentence` 11.

### L5-M2 "Humour and teasing" — the suffix that moves tone, and the tense that closes a joke

The ten displays:

1. `Ma dai, non ci credo!`
2. `Ma va! Addirittura, non ci credo`
3. `Ti prendo in giro, scherzavo`
4. `Senti chi parla! Non ti offendere`
5. `Che tempaccio! Ho detto una parolaccia`
6. `Un attimino, arrivo subito`
7. `Che carino! Che bellino! Un bacione, poverino!`
8. `Che ridere! Abbiamo riso, sei buffo`
9. `Senza offesa, ma sei esagerato e permaloso`
10. `Sei divertente. Anch'io! Non sono buffo. Neanch'io!`

The module has one job a course with no audio can barely do and must do anyway: mark a sentence as
not seriously meant, using words alone. Rule 1 says so out loud — in speech the tone would carry it,
this course has no audio at all, so the particles have to, and an item that is not funny on the page
is not funny. `ma dai`, `ma va`, `addirittura` and `senti chi parla` are therefore each bought WHOLE
and each given a direction: rule text and the S02 trap state that `ma dai` invites the other person
to go on while `ma va` tells them to stop, which is the distinction a learner otherwise merges.

The evaluative suffix is the module's system, and rule 0 refuses the size reading in the only place
it matters — on the words themselves. Seven altered words are shown across S05, S06 and S07:
`tempaccio`, `parolaccia`, `attimino`, `carino`, `bellino`, `bacione`, `poverino`. Rule 5 then says
the thing that keeps them from being a rule: they are LEXICALISED, a dictionary lists each one, and a
learner who builds an eighth by pattern is inventing a word. Every base stays where its own module
put it — `bello` is L2-M3's, `tempo` is L3-M4's, `attimo` is L2-M7's, and `parola` is not taught at
all — and each altered row's note names its base and its base's owner instead of re-opening it.
Two of the ten mistake plates are gender agreement (`parolaccio`, `Che carina, poverino!`), because
the suffix takes the gender of the word it lands on and nothing else about it changes.

S03 carries the tense decision, which is worth a row of its own: `scherzavo` is an imperfetto and has
to be. `ho scherzato` is perfectly grammatical and lands as a confession to a finished act, which
turns a light tease into an apology for having committed one; that is S03's mistake plate and its
trap. S10 carries the echo replies as single words with the elision inside them, and its mistake
plate is `Non sono buffo. Anch'io!` — the error English tolerates (*me too* after a negative) and
Italian does not.

What the module deliberately does not do: no sarcasm and no implication, which are L5-M7's — a tease
here is meant to be SEEN, an implication there is meant to be inferred — no regional humour
(L5-M3's), and no vulgarity beyond naming `parolaccia` as a category, which is exactly as far as
S05 goes.

**24 rows** against a cap of 25, `minWordsPerSentence` 3, `maxWordsPerSentence` 12.

### The brief seams, checked against the emitted index

**Both briefs' index seams held.** This is worth stating plainly, because the wave law assumes they
rot: every surface either brief listed as `free` came back `free` on the 40-module fold, and every
surface either brief listed as owned came back with the owner it named. What follows is the checking,
and then the seams the briefs did not name.

**L5-M1 §5, the two instincts the brief had already corrected — both re-confirmed.**
`npm run content:owner -- en-it magari 'meno male'` printed:

```
magari	L3-M3
meno male	L4-M3
```

Neither has a row here and neither is re-shown; the brief's correction stands.

**L5-M1 §5, the parts of the four-token keys stay unspent — confirmed, and it bites.**

```
bocca	free      lupo	free      tardi	L2-M7      mai	L3-M1
piove	L1-M9     acqua	L1-M8     non	L1-M3
```

`surfaceIndexKeys` splits hyphens and nothing else, so a four-token key donates none of its words:
`in bocca al lupo` buys neither `bocca` nor `lupo`, and `piove sul bagnato` buys neither `piove`
(which is L1-M9's anyway) nor `bagnato`. **This cost a variation.** `Piove sempre sul bagnato` was
drafted and dropped, because inserting `sempre` splits the whole key and leaves bare `bagnato`
standing, which `content:owner` reports `free` — a SHOWN-BUT-UNTAUGHT surface. The same rule killed
`Crepi il lupo!`. A frozen phrase may be shown whole or not at all, and every variation in M1 obeys
that.

**L5-M2 §5, `riso` — confirmed, and it is the sharpest seam in the wave.**

```
riso	L1-M8
abbiamo riso	free
```

The participle of `ridere` is spelled exactly like L1-M8's *rice*, from the shopping module, and
first occurrence wins — so a learner tapping the bare word inside a laughing sentence is shown a note
about lunch. `abbiamo riso` is therefore indexed WHOLE at two tokens, no bare-participle row exists,
and S08's trap says so in as many words. Bare `riso` is never written in a display, a variation or a
pool item anywhere in this wave.

**L5-M2 §5, `anch'io` — confirmed free, bought here, and it closes `docs/99` q77.** That question
asked "whether `anch'io` should be bought at L5", because L4-M3 wrote the unelided `anche io` for
want of a row. It is bought: `anch'io` and `neanch'io` are one token each with the elision inside
them, and they answer for neither `anche` (L1-M10) nor `io` (L2-M5), which the tool confirms:

```
anch'io	free      neanch'io	free      anche	L1-M10      io	L2-M5
```

**The seam neither brief named: how many ordinary words are still `free`.** This is the finding this
wave most wants to hand forward. An author drafting L5 assumes that after forty modules the everyday
vocabulary is owned. It is not, and the words that are missing are not exotic:

```
so	free        chiama	free      arrivi	free      te	free       tutti	free
proprio	free    davvero	free    solito	free     scherzo	free    parola	free
brutta	free     serata	free     dai	free        senti	free      giro	free
```

`so` is the one to remember: `non lo so` is the first thing a beginner says, `lo` is L2-M5's and
`non` is L1-M3's, and the verb in the middle of it has never been bought by anybody. Every one of
these was drafted into a display or a variation at some point in this wave and then removed. **A
"common word" is not evidence of ownership; the tool is.** Note also that `dai` and `senti` being
free is not a problem *for these modules* — `ma dai` and `senti chi parla` are whole keys — but it
does mean neither `Dai!` nor a sentence-initial `Senti,` can be written in en-it until somebody buys
them.

**The one place the brief's own list forced a choice: `un attimino`.** L5-M2 §5 says two things that
pull apart — "Every altered noun is its OWN single-token key whose note names the base", and then
lists the fresh surface as `un attimino`, two tokens. `content:owner` says both are available:

```
un attimino	free      attimino	free
```

Taking only `un attimino` would leave bare `attimino` unspent and unreachable; taking only
`attimino` would make the display's `Un attimino` resolve as `un` + `attimino`, which is right but
loses the fixed formula. The row is therefore `attimino` with `un attimino` in its `forms`, so ONE
row opens both keys, the longest-match walk takes the two-token key in the display, and there is no
collision — `check-shown` treats two keys opened by the same row as one row, which it is.

**Two surfaces the L5-M1 brief listed and this wave did not spend: `mah` and nothing else.** `mah` is
carried in `boh`'s `forms` rather than given a row of its own, because the two are not a paradigm and
a second row would have cost a slot for a word whose whole content is *the other shrug*. Its one
appearance is S10's third variation, `Mah, non capisco`, and `boh`'s note distinguishes them. Every
other fresh surface either brief listed is spent: 21 of 21 in M1's list, and 23 of the 26 in M2's.
The three unspent are `capirai`, `confidenza` and `dare del tu`, dropped against the 25-row cap and
named here so a later module can take them. M2 also buys one surface its brief did not list,
`prendo in giro` — the conjugated cell beside the infinitive `prendere in giro`, which
`content:owner` reports `free`; without it `Ti prendo in giro` has no row behind its verb.

### The ratchet

`npm run content:shown -- en-it L5-M1` and `… L5-M2` both print `clean — every shown surface
resolves`, with **no RE-TEACH lines and no COLLIDES lines** on either module. That is the intended
outcome rather than a lucky one: no row in this wave opens a key an earlier module owns, because
every frozen phrase is indexed whole and every altered noun is a new word rather than a re-teach of
its base.

`npx vitest run tools/shown-surfaces.test.ts` passes 11/11 with **en-it holding at its baseline of
17**. The baseline is NOT lowered in this change: the seventeen findings are pre-existing, in modules
this wave may not touch, and nothing here adds to them. `npm run content:validate` reports
`CONTENT ok` on every module in the tree, these two included; the denominator moves as sibling waves
land, so the run that cleared this change read `CONTENT 378/378 ok`.

`npx vitest run src/course/types.test.ts` was red on three module-census assertions while this wave
was being written — the global `finds all 360`, and the `en-ar` and `hi-en` counts, none of them
en-it's and all of them the parent's or a sibling course's — and went green again once those counts
were updated elsewhere in the same collection. Every en-it law in that file passes throughout,
including the two that matter here: *display is
Italian, teaching fields English* (no `glossEn`, no `script`, no curly apostrophe anywhere, a
non-empty `note` on every one of the 44 rows) and *teaches every apostrophe surface it writes*, which
walks the whole ladder and finds `l'ora` answered by `non vedo l'ora`, `l'italiano` by L1-M1's row,
and `anch'io`/`neanch'io` by their own.

### Open questions for the native pass

103. **The reply to `In bocca al lupo` in 2026** (M1-S01). The module makes `Crepi` obligatory and
     makes `grazie` a mistake plate. Confirm that `Crepi` (or `Crepi il lupo`) is still the reply an
     adult actually gives, that answering `grazie` really does read as leaving the exchange
     unfinished rather than merely as a foreigner's slip, and that the phrase is not now felt as
     old-fashioned in any age group.

104. **`buona fortuna` as the trap it is claimed to be** (M1-S01 trap). The module states that an
     Italian AVOIDS `buona fortuna` before an exam because it is felt as tempting fate. Confirm the
     avoidance is real and general rather than a superstition of one region or generation, and say
     what `buona fortuna` is used for instead, if anything.

105. **`piove sul bagnato`, good or bad** (M1-S04). The module teaches it as trouble landing on
     trouble and its trap says English speakers wrongly read it as good things piling up. Confirm
     the Italian is predominantly negative, and say whether a speaker would ever use it of good
     fortune without irony.

106. **The four pronominal cells chosen, and the ones left out** (M1-S07 to S10). Each lexeme ships
     with one alternate: `ce la fai`, `te la cavi`, `se ne va`, `te la prendi`. Confirm these are the
     cells a learner meets first, and say which cell of each verb is the one actually most heard —
     if it is a different one, a later module must buy it rather than this module being rewritten.

107. **`me la cavo` against `ce la faccio`** (M1-S08 trap). The module splits them as *adequate at a
     whole skill* against *succeeding at one job*. Confirm the split is how a speaker feels it, and
     confirm that `me la cavo` really is the modest answer to a compliment about your Italian rather
     than a way of admitting you are bad at it.

108. **`boh` against `mah`** (M1-S10). The note says `boh` is ignorance and `mah` is doubt about
     something you do know. Confirm that distinction, and confirm that `mah` deserves no row of its
     own — if a native pass finds them further apart than the note claims, `mah` needs buying in a
     later L5 module and not by editing this one.

109. **`mi raccomando` and how hard it leans** (M1-S05). The module presents it as pressure added to
     an order already given, with *please* too weak and *I'm warning you* too strong. Confirm the
     weight, and confirm that a stranger may not use it — the `usage` line restricts it to a parent
     or a friend and that restriction is a guess.

110. **`ma dai` against `ma va`, and the direction of each** (M2-S02 trap). The module claims
     `ma dai` invites the story to continue and `ma va` shuts it down. Confirm the directions, and
     confirm that `ma va` is safe between friends but not with a stranger, which is what the `usage`
     line asserts.

111. **`scherzavo` against `ho scherzato`** (M2-S03). Continuing `docs/108` q64. The module now
     SHIPS the claim that `ho scherzato` reads as a confession to a finished act. Confirm that a
     native speaker hears the passato prossimo that way, and say whether `stavo scherzando` competes
     with `scherzavo` in ordinary speech.

112. **`un attimino` and how it is heard** (M2-S06). Continuing `docs/108` q65. The note says
     Italians tease each other about how often it is said. Confirm that a learner using it is heard
     as fluent rather than as parroting a cliché, and confirm that `-ino` on it really is softening
     and not shortening.

113. **The seven altered words as the right seven** (M2-S05, S06, S07). `tempaccio`, `parolaccia`,
     `attimino`, `carino`, `bellino`, `bacione`, `poverino`. Confirm each is current and lexicalised
     rather than felt as freshly built, and in particular confirm `bellino` said of an adult is
     faintly patronising, which is what its note claims.

114. **`bacioni` as a sign-off** (M2-S07). The note says the plural is how a message to a friend
     ends, where English writes *love*. Confirm that, confirm who may write it to whom, and say
     whether the singular `bacione` is ever the sign-off instead.

115. **`buffo` against `divertente`** (M2-S08, S09). The module splits them as *smile at* against
     *smile with*. Confirm that `sei buffo` said to a friend lands as a tease rather than as an
     insult, which the module assumes throughout.

116. **`senza offesa` before, `non ti offendere` after** (M2-S04, S09). The module fixes the order:
     one precedes the offending remark, the other follows it. Confirm both, and confirm that either
     of them actually helps rather than, as in English, guaranteeing that the remark will offend.

117. **`permaloso` as a tease rather than a diagnosis** (M2-S09). The note says calling a friend
     `permaloso` is itself a tease. Confirm the word is light enough for that, and say what the
     heavier word would be if a speaker meant it seriously.

118. **The exaggeration rule, tested against a real table** (M2 rule 2). The module asserts that an
     English speaker who understates is simply not heard as joking in Italian. This is the largest
     claim in the wave and the one hardest to check from outside the language: confirm it, and give
     one exchange in which understatement WOULD be read as a joke, if such an exchange exists.
