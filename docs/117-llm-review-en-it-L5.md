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

## Wave 2 — L5-M3, L5-M4 and L5-M5 (#586)

The level's RANGE modules: where the Italian in front of a learner comes from, what is said on the
four occasions that have a script, and how to talk about nothing in the room. Authored against the
briefs in `tools/course-briefs.ts` and against the REAL cumulative index, which this wave inherited
from Wave 1 rather than from L4: `npm run content:owner -- en-it …` reported **1411 surfaces owned,
folded over 42 modules through L5-M2**, at **`maxSpan` 4**, for every one of the ~180 lookups below.
That is two modules deeper than the fold Wave 1 planned against, and the difference is not cosmetic
— it is what turned two of L5-M3's "fresh, confirmed free" keys into owned ones.

**`maxSpan` does not move in this wave.** L5-M1 took it from 3 to 4 and nothing here is longer than
three tokens: `la stessa cosa`, `diamoci del tu`, `passato remoto`, `sentite condoglianze`,
`a nome di`, `in qualità di`, `è importante che`, `è giusto che`, `è normale che`, `l'importante è`.
Between them the three modules add **75 rows**, 25 apiece, each module exactly at its `newWordCap`.

### L5-M3 "How they say it there" — the module whose output is recognition

Ten displays:

1. `Al nord si dice cornetto, al sud brioche`
2. `Anguria e cocomero: la stessa cosa`
3. `Il napoletano non è un accento, è una lingua`
4. `Raga, che figo questo posto!`
5. `Cioè, tipo, non capisco niente`
6. `A Roma si dice mo', non adesso`
7. `Il passato remoto si parla solo al sud`
8. `Diamoci del tu, siamo amici`
9. `Lo straniero non parla il dialetto`
10. `Il milanese, il romano e il toscano parlano italiano`

What it teaches, on the brief's three axes and in that order. **Lexical** (S01, S02): one referent
and two standard words, `cornetto`/`brioche` and `anguria`/`cocomero`, with the verdict stated as
*neither is wrong* rather than as a preference — `la stessa cosa` is bought whole precisely so the
verdict has a row of its own. **Grammatical** (S07): the `passato remoto` is NAMED, as a written
past everywhere and a spoken past in the south, and not one form of it is conjugated — those are
L5-M9's, and this row says so in its note. **Generational** (S04, S05, S06): `raga`, `figo`, `tipo`,
`cioè` and `mo'`, each tagged as peer speech and each carrying its own dating warning.

The two interference rows are the expensive ones and they close the module. `dialetto` (S03, S09) is
the false friend: S03 states the claim positively — *il napoletano non è un accento, è una lingua* —
and S09 puts a `straniero` beside it, so the learner meets the word twice before being told what it
costs. `diamoci del tu` (S08) is the address law, shipped as ONE frozen offer with the rule that you
wait to be handed it. S10 closes on the thing all of this sits on: three regions, one standard.

Recognition rather than production is asserted twice, as the brief demands — once in rule 0 (*the
output of this module is recognition*) and once per marked row in its own `note`. No dialect line
appears anywhere, in a display, a variation, a mistake plate or a pool item.

**25 rows** against a cap of 25, `minWordsPerSentence` 5, `maxWordsPerSentence` 12.

### L5-M4 "Formal occasions" — the passive, at last, and the formulas that are not built

Ten displays:

1. `Auguri di cuore! Evviva gli sposi!`
2. `Congratulazioni per il premio; inoltre, è un grande onore`
3. `Le mie sentite condoglianze, ti sono vicino`
4. `Facciamo un brindisi! Cin cin!`
5. `Brindiamo alla salute, cin cin!`
6. `Il premio viene consegnato oggi, pertanto brindiamo`
7. `Mia madre è stata premiata ieri`
8. `Egregio signore, carissimi amici, vorrei ringraziare`
9. `Vorrei parlare a nome di mia madre, in qualità di figlia`
10. `Poiché è tardi, il discorso è finito`

The passive is taught as a PAIR of auxiliaries with a limit welded to it. S06 gives `viene
consegnato` — venire staging the handing-over as a process — and its own third variation is
`Il premio è stato consegnato`, so the learner sees the two auxiliaries side by side inside one
sentence's enrichment rather than two modules apart. Its mistake plate is the sentence the rule
exists to stop, `Il premio è venuto consegnato`, and rule 1 says in as many words that no Italian
will repair it because there is nothing there to repair. S07 then does the agreement: `è stata
premiata`, two feminine endings chiming, with the masculine in a variation and the half-agreed
`è stato premiato` on a feminine subject as the mistake.

The formula set is learned whole and split by TIME, which is the brief's central interference claim:
`auguri` for what is ahead (S01, to `gli sposi`) against `congratulazioni` for what is done (S02,
for a `premio`), each with the other as its mistake plate. `condoglianze` (S03) ships plural-only
with `sentite condoglianze` as a form of the same row, so the fold cannot separate the formula from
the word, and `ti sono vicino` — three tokens all owned since L2 — is the warm alternative beside
it. The toast is deliberately small: `un brindisi` is what you MAKE and `cin cin` is what you SAY
(S04, whose mistake is `Facciamo un cin cin`), and `brindiamo alla salute` (S05) buys the
preposition, because `brindare` takes `a`.

The written layer is one line of letter register (S08: `Egregio` to one stranger, `carissimi` to a
room) and the three connectives L4-M2 sent here — `inoltre` in S02, `pertanto` in S06, `poiché` in
S10 — each introduced inside a sentence a speech would actually contain, never as a list. S09 is the
brief's fifth pattern in full, `vorrei ringraziare … a nome di … in qualità di`, and it is the
longest display in the module at eleven words against a bound of fifteen.

**25 rows** against a cap of 25, `minWordsPerSentence` 5, `maxWordsPerSentence` 15.

### L5-M5 "Big questions" — the article nobody corrects you on

Ten displays:

1. `La libertà è importante per la gente`
2. `Ciò che conta è il rispetto`
3. `È importante che ognuno abbia rispetto`
4. `È giusto che la gente abbia una casa`
5. `È normale che chiunque abbia paura`
6. `Credo in questi valori: onestà e giustizia`
7. `L'importante è la felicità, non i soldi`
8. `Mia madre è educata, ma molto sensibile`
9. `In fondo, quello che conta è la vita`
10. `La società parla di fede, di religione, di morte`

The article law is the module and it is drilled by repetition rather than by explanation. Every
abstract noun in every display carries its article — `la libertà`, `il rispetto`, `la felicità`,
`la vita`, `la società`, `la fede`, `la religione`, `la morte`, `la gente` — and S10 stacks four of
them in one sentence so the habit is visible as a habit. Both mistake plates that matter here strip
the article out (`Liberta è importante per gente`, `Societa parla di fede…`), and rule 0 names why
this error survives: the sentence is otherwise perfect, so nobody stops it to mention a missing
`la`.

The three impersonal triggers (S03, S04, S05) extend an owned paradigm and open nothing: `abbia` is
L3-M3's in all three, and each display's mistake plate is the same clause with the indicative in it.
Their bare adjectives — `importante`, `giusto`, `normale` — ride inside the trigger rows as forms
rather than as three rows of their own, which is what kept the module at cap; see the seam below.
`chiunque` (S05) is deliberately paired with a trigger that already demands the mood, so the note can
say it triggers it alone.

The noun clause of abstraction ships as three surfaces with one job: `ciò che` (S02), `quello che`
(S09) and `l'importante è` (S07), the last carrying its elision inside the token per the course law.
`credo in` (S06) is bought as a two-token key over L3-M3's `credo`, and its trap points at
`credere di` — L3-M3's escape hatch — rather than pushing every belief through the mood, exactly as
the brief asks. The false friends are the two the brief names and no more: `educato` and `sensibile`
(S08). No display takes a position on politics or religion; S10 names the topics and stops.

**25 rows** against a cap of 25, `minWordsPerSentence` 6, `maxWordsPerSentence` 14.

### The brief seams, checked against the emitted index

**L5-M3 §5 is wrong about two of its fresh keys, and the reason is the fold, not the brief.**
`npm run content:owner -- en-it raga tipo cioè boh mah mo' figo …` printed:

```
raga	free       tipo	free      cioè	free
boh	L5-M1      mah	L5-M1
mo'	free       figo	free      dialetto	free      accento	free
```

The brief lists `boh` and `mah` among "Fresh, confirmed free". They are not: **L5-M1 took both**, and
L5-M1 shipped in Wave 1 of this same level. This is the INDEX SEAM going stale in the most literal
way available — the brief was written against a fold that stopped at L4-M10, and two modules of the
same level have landed since. Neither word takes a row here. Rule 3 names them and says where they
live, and no display shows either, so nothing is re-taught and nothing is unreachable.

**Everything else L5-M3 §5 claims is correct, including both of its counter-intuitive collisions.**

```
sto	L1-M2      sta	L2-M1      lei	L1-M10     bella	L2-M3
attimo	L2-M7      un attimo	free
adesso	L3-M6      ora	L4-M9      mo'	free
```

`sto` and `sta` are the verb `stare` from `Sto bene` and `Come sta`, so the reduced demonstrative of
youth speech can never have a row; it is not shown at all here. `lei` is L1-M10's pronoun, which is
the second reason — on top of the course law — that the polite third person appears in no display in
this course, and this module writes it nowhere, not even in a rule. `mo'` is confirmed free and is
taught as the Roman twin of an owned pair, exactly as §5 predicted.

**L5-M4 §5 held completely, and then bit somewhere it did not name.**

```
venire	L4-M5     viene	free      è stato	free     è stata	free
auguri	free      congratulazioni	free      condoglianze	free
sentite condoglianze	free      cin cin	free      alla salute	free
poiché	free      pertanto	free      inoltre	free      egregio	free      carissimi	free
```

Every claim in the brief's §5 is confirmed: the infinitive `venire` is L4-M5's and the third person
`viene` is not, so `viene` opens a row here whose note points back at L4-M5 rather than re-opening
the verb; `è stato` and `è stata` are free and ship as ONE row with two forms, because they are two
shapes of one auxiliary and two rows would have been a second agreement lesson with nothing new in
it. The seam the brief does NOT name is the plural of its own fresh key:

```
premio	free      premi	L4-M1
```

**`premi` is L4-M1's.** The `premio` row therefore ships with `forms: ["premio"]` and no plural at
all — a complete-looking paradigm here would have been an unreachable row, which is the same class
of finding as L4-M3's `sarei`/`sarebbe` hole. The participles `premiato`/`premiata` and
`consegnato`/`consegnata` are both free and are bought as agreeing pairs, which is where this
module's paradigm work actually belongs.

**L5-M5 §5 held, including the correction it inherited.**

```
gente	L2-M10    la gente	free
libertà	free     giustizia	free    vita	free      società	free
verità	L4-M3     punto di vista	L4-M4  secondo me	L3-M3   dipende	L4-M5
sia	L3-M3     abbia	L3-M3     possa	L3-M3
in fondo	free
```

`gente` is L2-M10's and `la gente` is free, exactly as the brief warns, so the two-token key is
bought over the owned noun and L2-M10's row is not re-opened — and the note on it does the work the
brief wanted, naming the singular agreement. `in fondo` is confirmed **free** despite L4-M9's brief
having listed it: the shipped L4-M9 never took it, the index is the record, and this module buys it.

The seam this module found for itself is the one that made its budget work:

```
importante	free    giusto	free    normale	free    conta	free    ciò	free
```

All three bare adjectives behind the impersonal triggers are unspent after forty-two modules, and
so is `conta`. Bought as separate rows they are four of the twenty-five; folded into the rows that
first SHOW them — `importante` inside `è importante che`, `giusto` inside `è giusto che`, `normale`
inside `è normale che`, `conta` beside `contare su` — they cost nothing and the module could afford
`educato` and `sensibile`, which the brief names as compulsory. Two keys the brief lists were
dropped for that budget and are not taught here: **`umanità` and `coscienza`**. A later module may
still buy either; nothing in this wave shows them.

**A note for the next wave, on words that look owned and are not.** Several everyday surfaces came
back `free` after forty-two modules and therefore cannot be written into a display without a row:
`o` (or), `tutti`, `so`, `me`, `su`, `agli`, `ai`, `degli`, `stessa`, `nella`, `nei`, `va bene`,
`tanto`, `uguale`, `cose`, `nostro`, `speciale` — and `qualcuno`, although `qualcosa` beside it is
L3-M7's. Three sentences in this wave were rewritten after `content:owner` refused one of these —
`Anguria o cocomero?` became `Anguria e cocomero`, because `e` is L1-M10's and `o` is nobody's. This
is the opposite failure mode from the one the wave law warns about: not a brief claiming a word is
free when it is owned, but an author assuming a word must be owned because it is ordinary.

### The ratchet

`npm run content:shown -- en-it L5-M3`, `… L5-M4` and `… L5-M5` each print `clean — every shown
surface resolves`, with **no RE-TEACH lines and no COLLIDES lines on any of the three**. That is
designed rather than lucky, and two decisions bought it: every multi-word formula is indexed WHOLE
(`la stessa cosa`, `diamoci del tu`, `sentite condoglianze`, `a nome di`, `in qualità di`, the three
`è … che` triggers, `l'importante è`), and every new cell of an already-taught lexeme is a row of
its own pointing back at its first teach — `parlano` back at L1-M4's `parlare`, `viene` back at
L4-M5's `venire`, `carissimi` back at L1-M10's `caro`, `la gente` back at L2-M10's `gente`, `credo
in` back at L3-M3's `credo`. No file below L5 was touched.

`npx vitest run tools/shown-surfaces.test.ts` passes **11/11** with **en-it holding at its baseline
of 17**. The baseline is NOT lowered in this change: the seventeen findings are pre-existing, in
modules this wave may not touch, and these three modules add none of their own.

`npm run content:validate` reports `CONTENT ok` on every module in the tree, these three included.
The denominator moves as sibling waves land: the run that cleared this change read
**`CONTENT 405/405 ok`**, and an earlier run in the same session read `402/402`.

`npx vitest run src/course/types.test.ts` was red on exactly three assertions while this wave was
written, and all three are module-census counts belonging to somebody else: the global
`finds all 378`, the `en-ar` count (42 → 44) and the `hi-en` count (42 → 45). They move as sibling
waves land and are the parent's to update; the passing total moved from 420 to 423 during this
session without any of the three changing. Every en-it law in the file passes, including the two
that bite here — *display is Italian, teaching fields English* (no `glossEn`, no `script`, no curly
apostrophe in any display, form, variation or pool item, and a non-empty `note` on all 75 rows) and
*teaches every apostrophe surface it writes*, which walks the whole ladder and finds `mo'` answered
by its own row in L5-M3 and `l'importante` answered by `l'importante è` in L5-M5. No other
apostrophe surface is written by this wave.

### Open questions for the native pass

119. **The five generational words, as a current set** (M3-S04, S05, S06). Continuing `docs/108`
     q66. The module ships `raga`, `figo`, `tipo`, `cioè` and `mo'` and asserts each is peer speech
     that dates the speaker. Confirm each is still said in 2026 by people under about thirty, and
     name any that has aged into a parody of itself — `figo` is the one this reviewer is least sure
     of.

120. **`mo'` — Roman, or central-southern generally** (M3-S06). Continuing `docs/108` q67. The row
     says *Roman and central-southern*; the display says `A Roma si dice mo'`. Confirm the wider
     claim in the note is right, and say whether a Roman would hear `mo'` from a foreigner as
     charming, as mockery, or as neither.

121. **Where the `cornetto`/`brioche` line actually falls** (M3-S01). The module makes it north
     against south. Confirm that is close enough to be taught, name the region where `brioche`
     genuinely dominates, and say whether ordering the "wrong" one really passes without comment.

122. **`anguria` against `cocomero`, and who says which** (M3-S02). The row puts `cocomero` in Rome
     and Tuscany and `anguria` in the north. Confirm the split, and say whether `cocomero` is heard
     further south than Rome or whether a third word takes over there.

123. **The `passato remoto` as a SPOKEN southern past** (M3-S07). The module states it flatly:
     `Il passato remoto si parla solo al sud`. Confirm the tense really is in ordinary spoken use in
     the south for recent events, and say how far north the spoken use reaches before it stops.

124. **`Diamoci del tu` — who offers it, and whether the wait is still real** (M3-S08). The module
     makes waiting to be offered the `tu` a law and calls dropping it unilaterally a presumption.
     Confirm that in 2026 this still holds outside a workplace, and say at what age gap or in what
     setting the wait has quietly disappeared.

125. **`raga` as an address only** (M3-S04). The note says it can never be the subject of a sentence
     and is never said to anybody older. Confirm both halves, and say whether it is used to address
     a mixed group or has stayed male.

126. **The `dialetto` claim, as an Italian would state it** (M3-S03, S09). The module writes
     `Il napoletano non è un accento, è una lingua` as a plain fact. Confirm an Italian would accept
     that sentence without qualification, and say whether calling Neapolitan a `dialetto` in the
     same breath would be felt as a contradiction or as normal usage.

127. **`auguri` to a bride and groom, `congratulazioni` as the error** (M4-S01). Continuing
     `docs/108` q68. The module makes `Congratulazioni agli sposi!` a mistake plate. Confirm it
     really is felt as wrong rather than merely as unusual, and say what is said to the parents of
     the couple, who have arguably achieved something.

128. **`venire` in the passive, in actual speech** (M4-S06). Continuing `docs/108` q69. The rule that
     `venire` forms no compound passive is not in doubt as grammar. What is in doubt is frequency:
     confirm that `viene consegnato` is what a real ceremony or announcement says, rather than a
     textbook's preference, and say whether `è stato consegnato` would simply be used for both.

129. **`Evviva gli sposi!`** (M4-S01). Confirm this is still raised at a wedding table rather than
     being a phrase Italians associate with old films, and if it has dated, say what has replaced
     it.

130. **The ban on improvising a condolence** (M4-S03). The module states that Italian expects
     `le mie sentite condoglianze` and that a fresh sentence reads as not knowing what to say.
     Confirm the strength of that claim, and say what a close friend says instead of the formula,
     if anything, beyond `ti sono vicino`.

131. **`Egregio` and `carissimi` as live openings** (M4-S08). Confirm `Egregio` is still written at
     the top of a formal letter in 2026 rather than surviving only in templates, and confirm
     `carissimi` is the right warm opening for a room rather than for a written circular.

132. **`poiché`, `pertanto` and `inoltre` in a SPOKEN speech** (M4-S02, S06, S10). The module puts
     all three into displays that are spoken aloud at an occasion, while its rule calls them written
     connectives. Confirm that is the right line — that a person giving a toast really does reach
     for them — or say which of the three would sound absurd out loud.

133. **The article on the abstract noun, as obligatory** (M5-S01, S10). Continuing `docs/108` q70.
     The module treats `La libertà è importante` as the only possibility and `Libertà è importante`
     as not a sentence. Confirm there is no register — a headline, a slogan, a book title — in which
     the bare noun is normal, because the module currently admits none.

134. **`la gente` and its singular verb** (M5-S04). The module writes `che la gente abbia` and makes
     `abbiano` the mistake. Confirm the plural agreement is genuinely wrong rather than merely
     informal, since English speakers will hear it constantly in their own language.

135. **`ciò che` against `quello che`** (M5-S02, S09). The module calls `quello che` the everyday
     twin and `ciò che` slightly more written, and treats them as interchangeable in these two
     sentences. Confirm the register split, and say whether `ciò che` in speech reads as careful or
     as stiff.

136. **`educato` and `sensibile` as the right two** (M5-S08). The module names exactly two false
     friends and refuses a longer list. Confirm these two are the pair that costs an English speaker
     most in abstract conversation, and if a third belongs beside them, name it and say why it beats
     one of these.

137. **`chiunque` triggering the mood by itself** (M5-S05). The note claims `chiunque` takes the
     congiuntivo on its own, independently of `è normale che`. Confirm that, and give one ordinary
     sentence where `chiunque` stands alone with the mood after it.

138. **`L'importante è …` and how it lands** (M5-S07). The module teaches it as a neutral way of
     naming a priority. Confirm it does not carry a whiff of lecturing the listener, and say whether
     `L'importante è la salute` is as ordinary as this reviewer believes it to be.

## Wave 3 — L5-M6 through L5-M10 (#594)

The level's RANGE modules, and the last five rungs of the course: how to argue, how to hear what was
not said, how to keep talking through a word you do not have, how to retell a story in the past
people actually speak, and how to change register inside one piece. Authored against the briefs in
`tools/course-briefs.ts` and against the REAL cumulative index, which this wave inherited from Wave
2 rather than from L4: at the moment the five modules were written, `npm run content:owner -- en-it
…` closed every one of its ~200 lookups with **1523 surfaces owned, folded over 45 modules through
L5-M5**, at **`maxSpan` 4**. That is five modules deeper than the fold the L5 briefs were written
against, and the difference is not cosmetic — it turned one of L5-M8's "fresh, confirmed free" keys
into an owned one.

**`maxSpan` does not move in this wave, and it is 4 rather than 3.** L5-M1 took it from 3 to 4 and
nothing here is longer than four: `il fatto è che` is this wave's only four-token key, and it was
confirmed free at span 4 before it was bought. Everything else stops at three:
`in primo luogo`, `in secondo luogo`, `in conclusione`, `a meno che`, `pur essendo`, `volevo
chiederti`, `in un certo senso`, `ci mancherebbe altro`, `come si dice`, `come si chiama`,
`che vuol dire`, `una specie di`, `quella cosa che`, `nel senso che`, `che ne so`,
`c'era una volta`, `per farla breve`, `sarei dovuto andare`, `cordiali saluti`, `dammi del tu`.
Between them the five modules add **97 rows**: 24, 17, 22, 19 and 15, every one of them under the
level's cap of 25 and the last two deliberately well under it.

### L5-M6 "Arguing a position" — the trigger class, not the mood

Ten displays:

1. `In primo luogo, il fatto è che il problema non è il tempo`
2. `In secondo luogo il lavoro è pesante. Ad esempio, nessuno dorme`
3. `Benché tu abbia ragione, insisto: questa è la mia obiezione`
4. `Sebbene sia difficile, nessuno può obiettare`
5. `Nonostante tutto, ammetto una cosa: sbagliando ho capito il motivo`
6. `D'altra parte il lavoro va avanti. Tuttavia, il tempo manca`
7. `Essendo già tardi, decido domani, purché tu sia d'accordo`
8. `Sostengo la stessa cosa, a meno che non ci sia un problema`
9. `Pur essendo d'accordo, non cambia niente. Pur avendo ragione, non insisto`
10. `In conclusione, lo spiego affinché sia tutto giusto, prima che sia tardi`

What it teaches. **The trigger class** (rule 0, S03–S05, S07, S10): `benché`, `sebbene`,
`nonostante`, `a meno che`, `purché`, `affinché` and `prima che`, with the fact the brief demanded
stated in exactly its terms — *the mood here is grammatical AGREEMENT, not doubt*, and the speaker
can be completely certain and the verb still goes to the congiuntivo. Not one congiuntivo FORM is
bought: every one of them (`sia`, `abbia`) is L3-M3's, and no display anywhere in the module writes
a congiuntivo imperfetto, which is the tense note 4 forbids. **The compressed concessive** (rule 1,
S05, S07, S09): `pur essendo`, `pur`, `essendo`, `avendo`, `sbagliando` — the adverbial gerund
L4-M6 deferred. **The scaffold** (rule 2, S01, S02, S06, S10): `in primo luogo`, `in secondo luogo`,
`d'altra parte`, `tuttavia`, `in conclusione`, with `innanzitutto` carried as a FORM of the first
rather than as a row of its own, so the module lands at 24 rows against a cap of 25.

The two interference rules are the ones that cost something. `a meno che` (rule 3, S08) carries the
expletive `non` written outside the key, resolving on L1-M3's `non` — the second sighting of the
trick L4-M6 taught on `finché non`, and the note says so. `tuttavia` (rule 4, S06) opens its clause
and cannot sit inside it, pointed back at L4-M2's positional law rather than re-derived, and the
mistake plate for S06 is *the seam rather than the word*: `tuttavia` hung off a comma.

`prima che` (S10) is the different-subject twin of L4-M6's `prima di`, which that brief named in one
line and this module pays for. **24 rows**, `minWordsPerSentence` 6, `maxWordsPerSentence` 15.

### L5-M7 "Between the lines" — the module that buys no grammar

Ten displays:

1. `Volevo chiederti un favore, se hai un momento`
2. `Non è che potresti aiutarmi un momento?`
3. `Senti, ti dispiacerebbe aspettare un momento?`
4. `Disturbo? Per caso hai visto il mio telefono?`
5. `Certo, come no: figuriamoci se arriva in orario`
6. `Ci mancherebbe, non è un problema`
7. `Lascia perdere, non era importante`
8. `Diciamo che, in un certo senso, hai ragione`
9. `Onestamente, non mi sembra una buona idea`
10. `Davvero? Sul serio, diciamo che dipende`

What it teaches. **Distance as tense** (rules 0 and 1, S01–S03): `volevo chiederti` indexes WHOLE
over L4-M3's `volevo`, so the imperfetto-of-politeness lives in a rule and not in a row, exactly as
the brief required; the conditional tier (`potresti`, `ti dispiacerebbe`) is L3-M4's and L2-M1's and
is re-read rather than re-bought; `non è che` and `per caso` are the two frames that hand the hearer
a ready-made no. The module buys **17 rows and no grammar at all**, which is the brief's own claim
made literal. **Irony as lexicon** (rule 4, S05, S10): `certo`, `come no`, `figuriamoci`,
`ci mancherebbe altro`, with `davvero` and `sul serio` added as the two markers that let a written
line be checked or switched back to sincere. The sarcastic `bravo` gets NO row — L2-M2 owns it — and
its second job is carried by rule 4 in one sentence, which is the tool L4-M7 had to use on `prego`.

The three interference rules are the brief's three: politeness that grows by adding words against
politeness that changes the tense (rule 2, and S02's mistake plate is a three-hedge pile-up);
directness calibrated differently, with `mi passi il sale` named in the rule and deliberately not
bought (rule 3); and written irony that cannot ride on tone (rule 4). Nothing here teaches teasing,
which is L5-M2's, and nothing produces passive aggression: S05 and S10 are marked in their `usage`
as recognition.

**`non è che` takes the ordinary present throughout**, as note 4 demands, and rule 5 says so and
sends the choice to the native gate rather than settling it — question 141 below.

### L5-M8 "When words run out" — the last structural debt

Ten displays:

1. `Come si dice questo in italiano?`
2. `Che vuol dire questa parola?`
3. `Non ho capito: me lo puoi ripetere più piano?`
4. `Dimmi tutto, e poi dimmelo ancora`
5. `Ripetimi il numero. Ripetimelo, per favore`
6. `Spiegami quella cosa che hai detto: voglio capire`
7. `Come si chiama quel coso? È una specie di pane`
8. `Te lo dico io: glielo spiego domani`
9. `Che ne so? Non ne parlo mai`
10. `Nel senso che intendevo un'altra cosa`

What it teaches, in the brief's order and no other. **Rule 0, attachment**: the pronoun attaches to
an infinitive, a tu imperative and a gerund and stands before a finite verb, and *the position is
decided by the verb form and by nothing else* — S04's trap sets `dimmi` against `me lo dici` as the
same words in the same relation. **Rule 1, the combined clitic**: indirect first, `mi`/`ti`/`ci`/`vi`
change their vowel to `e`, `gli` + `lo` fuses to `glielo`. **Rule 2, `ne`**. Around them the
paraphrase kit (rule 3) and the two things English gives no help with (rule 4: `mi lo` is not a
form; `glielo` is one word for three English pronouns and there is no feminine).

Every combined form is bought as its OWN key — `me lo`, `te lo`, `glielo`, `dimmelo`, `ripetimelo` —
with a note naming the bare word underneath, which is the tool L3-M5 used for `l'ho vista`, and none
of L1-M1's `la`/`le`, L2-M5's `lo` or L2-M2's `gli` is re-opened. Rule 5 carries the three named
absences the brief lists: the Lei imperative `me lo dica` (every polite repair here stays on the
finite frame), the `ci` of place with attachment, and L5-M1's `farcela`/`cavarsela`, explained as the
machine already welded shut and not bought a second time.

Two rows beyond the brief's list earn their place: `parola` (S02), without which `che vuol dire` has
nothing to point at, and `più piano` (S03), because bare `piano` is unowned — see the seams below.
**22 rows**, `maxWordsPerSentence` 12.

### L5-M9 "Telling it your way" — read one tense, say the other

Ten displays:

1. `C'era una volta una bambina che abitava in un paese piccolo`
2. `In questa fiaba la protagonista era una bambina`
3. `Il personaggio disse una cosa strana e andò a casa`
4. `Fu una storia lunga. Visse molti anni in città`
5. `Quando sono arrivato, era partito da un'ora`
6. `Avevo finito il lavoro quando è arrivata mia madre`
7. `Sarei dovuto andare prima. Alla fine sono rimasto`
8. `In breve, la morale della favola è questa`
9. `Per farla breve, questa versione è la mia`
10. `Ebbe paura, vide il mare, fece una cosa strana e venne a casa`

What it teaches. **The passato remoto, receptively and only in the third person** (rule 0, S03, S04,
S10): eight verbs bought as eight rows, each carrying its own plural as a FORM — `fu`/`furono`,
`ebbe`/`ebbero`, `disse`/`dissero`, `fece`/`fecero`, `andò`/`andarono`, `venne`/`vennero`,
`vide`/`videro`, `visse`/`vissero`. Sixteen surfaces, "about a dozen third-person forms and no more",
for eight rows of the budget. The recognition-only limit is in the RULE text as note 4 demands, not
in advice; no display puts a first- or second-person remoto in the learner's mouth, and both mistake
plates that could (`Io dissi …`, `Ebbi paura …`) exist precisely to forbid it. **The trapassato,
productively** (rules 1 and 2, S05, S06): `era partito` and `avevo finito` bought as TWO-TOKEN
auxiliary-plus-participle keys so that neither L2-M10's `era`/`avevo` nor L3-M10's participles is
re-taught, with `era partita` / `erano partiti` / `aveva finito` / `avevamo finito` carried as forms.
**The last cell of the compound conditional** (rule 3, S07): `sarei dovuto andare`, indexing WHOLE
over L4-M3's `sarei`, with `sarei dovuta andare` as its feminine form and the auxiliary rule stated —
the verb at the END picks it.

Rule 4 is the module's exercise: an English retelling keeps the source tense, an Italian one changes
it, and every remoto row's note names the passato prossimo it becomes out loud (`disse` → `ha detto`,
`fu` → `è stata`, `vide` → `ha visto`, `venne` → `è venuto`). `fiaba` carries `favola` and both
plurals as forms rather than taking a second row. **19 rows**, `maxWordsPerSentence` 14.

### L5-M10 "Your own voice" — the exit test of the whole course

Ten pieces of eight sentences. The register switch is marked in every one, and in S03 it runs
BACKWARDS — informal to formal — because the person being addressed changes:

1. `Buongiorno. La ringrazio per il messaggio. Vorrei parlare del lavoro. Le dispiace? Diamoci del tu. Senti, ho un problema. Ne parlo domani. A presto.`
2. `Buonasera. Mi permetta una parola. Il treno è in ritardo. Come sta? Adesso diamoci del tu. Come stai? Tutto bene? Ci vediamo domani.`
3. `Salve. Sono un collega di Anna. Dammi del tu. Come va? Tutto bene, grazie. Adesso parlo con il capo. Buongiorno. Grazie mille.`
4. `Egregio collega, buongiorno. Gentilmente, mi serve una risposta. Il documento è pronto. Grazie per il tempo. Cordiali saluti. Poi ci sentiamo. Ciao! A domani.`
5. `Ciao! Come stai? Tutto bene qui. Il lavoro va avanti. Ci vediamo sabato? Dimmi tutto. Un abbraccio. A presto.`
6. `Buongiorno. Prende un caffè? Volentieri, grazie. Adesso diamoci del tu. Senti, ti va un caffè? Volentieri! Ci vediamo al bar. A dopo.`
7. `Buonasera. Il documento arriva domani, senz'altro. Grazie per il messaggio. Adesso diamoci del tu. Ciao, come stai? Tutto bene, grazie. Ci sentiamo dopo. Un saluto.`
8. `Buongiorno. Resto a disposizione per il lavoro. Il documento è pronto. Grazie mille. Distinti saluti. Senti, poi ci vediamo? Dimmi quando. Ciao!`
9. `Buongiorno. Spero di non disturbare. Ho un problema con il lavoro. Grazie per il tempo. Adesso diamoci del tu. Senti, speriamo bene. Ci vediamo domani. A presto.`
10. `Buongiorno. Mi permetta un momento. Il problema è il tempo. Grazie mille. Adesso diamoci del tu. Ciao, tutto bene? Dimmi quando ci vediamo. A dopo.`

The brief's four markers are named in rule 0 and every piece carries all four: the person of the verb
(`come sta` against `come stai`, S02; `prende` against `ti va`, S06), the greeting and the closing
(rule 3), the formulas of L5-M4 against the particles of L5-M2, and the LENGTH of the sentence — S10
exists to make the last one visible, with three sentences of four or five words before the switch and
three of two or three after it. Rule 2 carries the brief's second interference point: the move to tu
is OFFERED and accepted, and `diamoci del tu` (L5-M3's) or `dammi del tu` is the hinge of eight of
the ten pieces. S05 is the control: it never switches, so the others have something to be visible
against.

**It teaches no grammar, and the fifteen rows are greetings and sign-offs.** `salve`, `buonasera`,
`mi permetta`, `gentilmente`, `cordiali saluti` (+ `distinti saluti` as a form), `a disposizione`,
`senz'altro`, `spero` (+ `speriamo`), `ringrazio` (+ `la ringrazio`, `ti ringrazio`), `volentieri`,
`dammi del tu`, `un abbraccio`, `un saluto`, `a presto`, `a dopo`. The brief asks a closing module to
move the fold by fewer than fifteen; it moves it by **fifteen rows**, and by more surfaces than that
only because three rows carry a second form. Everything else in all eighty sentences is owned by the
forty-nine modules below, which is what the module is a test of.

`Lei` appears in no display in any of the ten pieces, as the course's orthographic law requires — the
polite address is carried entirely by third-person verbs (`sta`, `prende`, `permetta`, `dispiace`).
`minWordsPerSentence` is **1** here rather than L4-M10's 3, because a one-word greeting (`Salve.`,
`Buonasera.`, `Ciao!`) is a sentence of the piece and is the shortest thing the register scale has.

### The brief seams, checked against the emitted index

**L5-M8 §5 is wrong about one of its "fresh, confirmed free" keys, and the reason is the fold.**
`npm run content:owner -- en-it ne "me lo" glielo dimmi "si dice" "come si dice" "si chiama" "come si chiama" "ne ho"` printed, at the fold this wave was written against:

```
ne	free       me lo	free      glielo	free     dimmi	free
si dice	L5-M3      come si dice	free
si chiama	L1-M1      come si chiama	free
ne ho	L3-M5
```

Three things follow, and only the first is a correction.

1. **`si dice` is L5-M3's, not free.** The brief lists it among "Fresh, confirmed free"; L5-M3
   shipped it in Wave 2 of this same level, three modules before this one was authored. This is the
   INDEX SEAM going stale in the most literal way available, and it is the same failure Wave 2
   recorded for `boh` and `mah`. `si dice` takes no row here. `come si dice` is bought at three
   tokens and indexes WHOLE over it, longest-match-first, so nothing is re-taught and nothing is
   unreachable.
2. **`come si chiama` is the same case and the brief did not flag it at all.** `si chiama` is
   L1-M1's, from the introductions module, forty-eight modules below. The three-token key resolves
   whole over it for exactly the reason the brief itself gives about `tomar el pelo` over `pelo`: an
   owned single word never blocks a longer key that contains it. Bought, and the row's note points
   back at L1-M1.
3. **The brief is RIGHT that bare `ne` is unowned, and `docs/73` §2 is half-right rather than
   wrong.** `ne` is free after forty-five modules, exactly as L4-M9's brief said. But `ne ho` is
   **L3-M5's**, a two-token key: that module took `ne` inside a phrase and never as a bare row, which
   is how the L3 decisions doc came to record `ne` as spent. The consequence is operational — a
   display here writing `ne ho` would resolve to L3-M5 and never reach this module's row — so no
   display in L5-M8 or L5-M10 writes it. `Non ne parlo mai` (S09) is what opens the bare key.

**L5-M10 §6's index seam is the staler of the two, and by a wide margin.** The brief says the fold
"reported 1350 surfaces over 40 modules through L4-M10 at maxSpan 3". Today `npm run content:owner`
closes every run with:

```
1523 surfaces owned, folded over 45 modules through L5-M5
```

Both halves of the brief's claim have moved: 1350 → **1523**, 40 modules → **45**, and `maxSpan` 3 →
**4**, which L5-M1 raised in Wave 1. The span matters and not only the count: `il fatto è che`, this
wave's one four-token key, could not have been bought at all under the number the brief quotes. A
later reader should take the fold from the tool and never from a brief.

**L5-M6 §5, L5-M7 §5 and L5-M9 §5 are correct in every particular, including their counter-intuitive
claims.** Checked and confirmed:

```
mangiando	L2-M7    parlando	L2-M7    essendo	free     avendo	free    sbagliando	free
anche se	L3-M3     però	L4-M4     comunque	L4-M4    insomma	L4-M4
è vero che	L4-M4     punto di vista	L4-M4    prima di	L4-M6    finché non	L4-M6
infine	L3-M1      fatto	L3-M10    il fatto è che	free   d'accordo	L2-M6

senti	free       senta	L2-M1     volevo	L4-M3    bravo	L2-M2    certo	free
magari	L3-M3      forse	L3-M3     ti va	L2-M6    chissà	L4-M5   piuttosto	L4-M5

raccontare	L4-M10   storia	L4-M10   a quel punto	L4-M10   per fortuna	L4-M10
c'era	L2-M10     una volta	L4-M8   già	L4-M6     mentre	L3-M10   appena	L3-M10
detto	L3-M5      finito	L3-M10   alla fine	L2-M10   sarei	L4-M3
fu / furono / disse / dissero / andò / andarono / visse / vissero	all free
```

L5-M7's is the pleasing one: the brief predicted that `senti` would be free and `senta` owned, which
runs opposite to the obvious guess, and the index agrees exactly. So `senti` is this module's to buy
and its note points at L2-M1's `senta` rather than re-explaining the imperative.

**What no brief warned about: five very ordinary words are unowned after forty-five modules, and
three of them were caught only by asking.**

```
bambino	free      bambina	L4-M8    bambini	L4-M8
te	free       tutti	free     aspetto	free    piano	free    so	free
attenzione	L4-M7    l'attenzione	free
```

`bambino` is the sharpest: L4-M8 taught `bambina`, `bambine` and `bambini`, and the masculine
singular has never been shown. L5-M9-S02 was drafted as *il protagonista era un bambino* and would
have shipped a SHOWN-BUT-UNTAUGHT finding on the most innocent word in the sentence; it now reads
`la protagonista era una bambina`, which also lets the row make its point that `protagonista` has one
ending and two articles. `te` and `tutti` are free while `ti`, `te lo` and `tutto` are owned, which
rules out `sono d'accordo con te` and `affinché tutti capiscano` as drafted; `aspetto` is free while
`aspetta`, `aspetti`, `aspettare` and `aspettato` are owned; `piano` is free while L5-M1's
`piano piano` is owned, which is why L5-M8 buys `più piano` as a two-token key rather than writing
the bare word; and `so` is free while `non saprei` is owned, so `non so` cannot be written and
`che ne so` is bought whole. `l'attenzione` against L4-M7's `attenzione` is the en-it elision law
biting exactly as `src/course/types.test.ts` says it does — a display writing `grazie per
l'attenzione` would have a word with no "why" — so L5-M10-S10 writes `Grazie mille` instead.

**A paradigm-row hole was checked for and none was needed.** Every cell of the eight remoto rows in
L5-M9 (`fu`, `furono`, `ebbe`, `ebbero`, `disse`, `dissero`, `fece`, `fecero`, `andò`, `andarono`,
`venne`, `vennero`, `vide`, `videro`, `visse`, `vissero`) was queried individually before the forms
lists were written, and all sixteen came back `free`: this tense is genuinely untouched below L5, so
none of these rows swallows an owned cell the way L4-M3's `sarei` would have. The same check on
`essendo`/`avendo` in L5-M6 found `mangiando` and `parlando` owned by L2-M7, which is why the
`essendo` row's forms list holds `essendo` alone and rule 1 points at L2-M7 for the two the learner
already has.

### The ratchet

`npm run content:shown -- en-it L5-M6`, `… L5-M7`, `… L5-M8`, `… L5-M9` and `… L5-M10` each print
`clean — every shown surface resolves`, with **no RE-TEACH lines and no COLLIDES lines on any of the
five**. Two of those were earned rather than given:

- L5-M8's `coso` row first shipped with `cosa` in its `forms`, which the check reported as a
  RE-TEACH against L1-M5. The word is in the row's NOTE, where it belongs — the note's whole job is
  to separate `coso` from `cosa` — and out of the forms list, where it would have bought a key an
  earlier module owns.
- L5-M10 first carried `mi permetta` as a row on BOTH S02 and S10, which is a genuine
  COLLIDES INSIDE THIS MODULE: two rows, one key, two different notes, so the second is unreachable.
  The fix was to leave the row on S02, where the phrase is first shown, and give S10 the row it
  actually needed — `a dopo`, the shortest close in the module and the last word of the course.
  Not an exemption and not a duplicated note: a different surface.

No file below L5 was touched, and no file of another course. Every new cell of an already-taught
lexeme is a row of its own pointing back at its first teach: `senti` back at L2-M1's `senta`,
`ripetimi` back at L2-M1's `ripetere`, `spiegami` back at L4-M2's `spiegare`, `ringrazio` back at
L2-M1's `grazie`, `ti dispiacerebbe` back at L2-M1's `mi dispiace`, `dammi del tu` back at L5-M3's
`diamoci del tu`, `figuriamoci` back at L5-M1's `figurati`, `ebbe` back at L2-M9's `ha paura`,
`gentilmente` back at L2-M2's `gentile`, and `sarei dovuto andare` back at L4-M3's `avrei dovuto`.

`npx vitest run tools/shown-surfaces.test.ts` passes **11/11** with **en-it holding at its baseline
of 17**. The baseline is NOT lowered in this change: the seventeen findings are pre-existing, in
modules this wave may not touch, and these five modules add none of their own.

`npm run content:validate` reports `ok` on every module in the tree, these five included. The
denominator moves as sibling waves land while this one is written: an early run in the session read
`CONTENT 439/439 ok` and the run that cleared this change read **`CONTENT 447/447 ok`**.

`npx vitest run src/course/types.test.ts` is red only on module-census counts belonging to somebody
else. Three were red when this wave was written — the global `finds all …` list, the `en-ar` count
(48 → 49) and the `hi-en` count (47 → 48); by the final run a sibling had already updated two of
them, and the remaining two reds are the global list (444 declared, 448 files present) and `hi-en`
(48 → 49). They move as sibling waves land and are the parent's to update. **Every en-it law in the
file passes**, including the two that
bite here — *keeps the Italian course the ordinary way round* (no `glossEn`, no `script`, no curly
apostrophe in any display, form, variation or pool item, and a non-empty `note` on all 97 rows) and
*teaches every apostrophe surface it writes*, which walks the whole ladder and finds this wave's
`d'altra parte` and `senz'altro` answered by their own rows, and `un'altra`, `un'ora` and `d'accordo`
answered by L2's and L4's.

### Open questions for the native pass

139. **`benché`, `sebbene` and `nonostante` as one interchangeable set** (M6-S03, S04, S05).
     Continuing `docs/117` q138. The module treats the three as freely swappable and shows
     `benché` ↔ `sebbene` in a variation pair. Confirm they really are interchangeable in speech,
     and say whether any of the three is now mainly written — `sebbene` is the one this reviewer
     suspects.

140. **`a meno che non` with the expletive `non` obligatory** (M6-S08). The module states flatly
     that the `non` is not optional and the mistake plate rejects `a meno che ci sia`. Confirm that
     dropping it is genuinely wrong rather than merely colloquial, and say what a speaker would do
     in fast speech.

141. **`non è che` with the indicative** (M7-S02, rule 5). The brief refused to settle this and so
     does the module: every `non è che` here takes the ordinary present (`non è che hai un
     momento?`). Confirm the indicative is at least as common as the congiuntivo in speech, and say
     whether the choice carries any difference in politeness or only in register.

142. **`certo, come no` as the standard written sarcasm marker** (M7-S05). The module makes it the
     canonical pair and teaches it for recognition only. Confirm the pair is still read as sarcasm
     without any tone to help, and name a marker that would be commoner in a text message.

143. **`disturbo?` as a whole apology** (M7-S04). The row claims the single word, asked at a door,
     is the entire move and that the answer is normally `figurati` or `ci mancherebbe`. Confirm
     both halves, and say whether `disturbo?` is now more common than `permesso?`.

144. **`sul serio` doing two opposite jobs** (M7-S10). The trap says that as a question it doubts
     and in front of a statement it insists, with only the punctuation between them. Confirm that
     is a fair description, and say whether `davvero` splits the same way.

145. **`più piano` heard as slower or as quieter** (M8-S03). The note says the request is heard as
     either. Confirm that ambiguity is real, and say what a speaker would use if they specifically
     meant more slowly and nothing else.

146. **`coso` — how informal, and how gendered** (M8-S07). The row makes it masculine for any
     object, informal, never written. Confirm the gender claim holds even for a feminine referent,
     and say whether a woman is ever called `cosa` in the same way `coso` is used of a man.

147. **The doubling in `dimmi` against the single m in `spiegami`** (M8-S04, S06). The module gives
     the doubling to the four short imperatives (`di'`, `da'`, `fa'`, `sta'`, `va'`) and to nothing
     else. Confirm the list is complete for a learner at this level, and say whether `dammi` and
     `dimmi` are the only two they will ever actually need.

148. **`glielo` with no feminine, taught as absolute** (M8-S08). The module states there is no
     feminine version and rejects `le lo`. Confirm nothing regional or informal contradicts that,
     and say whether `gliela`, `glieli` and `gliele` should have been shown here or are rightly
     left out.

149. **`nel senso che` as the standard repair** (M8-S10). The module makes it the frame for undoing
     a misunderstanding you caused, with `intendevo` in the imperfetto. Confirm the tense choice,
     and say whether `nel senso che` is neutral or already marks the speaker as under thirty.

150. **The eight remoto verbs as the right eight** (M9-S03, S04, S10). The module ships
     `fu`, `ebbe`, `disse`, `fece`, `andò`, `venne`, `vide`, `visse` with their plurals, for
     recognition only. Confirm these are the eight a reader of an ordinary printed fairy tale meets
     first, and name any that should have displaced one of them — `nacque` and `morì` were the two
     considered and dropped.

151. **`sarei dovuto andare` against `avrei dovuto andare`** (M9-S07). The module takes the essere
     line and puts `avrei dovuto andare` on the mistake plate as *heard, and taught in some books*.
     Confirm which one an educated speaker actually says, and whether the module has been too
     prescriptive here.

152. **`la morale` against `il morale`** (M9-S08). The trap makes the article the only thing
     separating the lesson of a story from somebody's spirits. Confirm the split is that clean, and
     say whether `la morale della favola` is still said outside of children's books.

153. **`per farla breve` and its frozen `la`** (M9-S09). The note says the clitic refers to nothing
     nameable and cannot be changed. Confirm `farlo breve` is genuinely not said, and say whether
     `per farla breve` or `in breve` is the commoner cut in speech.

154. **`salve` as the middle-distance greeting** (M10-S03). The module claims it is the only word
     that sits between `ciao` and `buongiorno`. Confirm that reading, and say whether `salve` has
     aged — this reviewer has seen it called both timeless and faintly bureaucratic.

155. **`dammi del tu` against `diamoci del tu`** (M10-S03). The row splits them as one person's
     offer about themselves against a mutual one. Confirm the split, and say which is heard more
     often when the two speakers are of clearly different seniority.

156. **`un saluto` as a middle-distance sign-off** (M10-S07). The module places it between
     `cordiali saluti` and `un abbraccio`. Confirm the ordering, and say whether `un caro saluto`
     is now the commoner form of the same move.

157. **`mi permetta` as a live opening** (M10-S02, S10). The module makes it the most formal thing
     it owns. Confirm it is still said rather than only written, and say what would be used in its
     place in an ordinary office.

158. **Whether a register switch inside eight sentences is realistic at all** (M10, all ten
     pieces). This is the exit test of the whole course and it rests on an assumption no brief
     proved: that a real Italian exchange offers, accepts and completes the move to `tu` inside a
     single short piece. Confirm that happens, or say how many exchanges it usually takes — and if
     it is normally slower, say which of the ten pieces reads as forced.
