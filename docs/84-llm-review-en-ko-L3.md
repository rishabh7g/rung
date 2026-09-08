# en-ko L3 — LLM review

The review that clears each en-ko L3 wave to ship, written in the same change that authors it
(`CLAUDE.md`, "Ship `verified: true` in the authoring change"). The **native-speaker gate is a
separate, stricter bar and stays unmet**: every section below ends in open questions for a native
pass, and no later wave may close one of them by rewriting a shipped module.

Open questions are numbered as a fresh en-ko L3 chain from 1. `docs/68`'s L2 chain of forty-seven is
closed and is not continued here — those forty-seven stay open for the native pass regardless, and
one of them (Q45, on zero anaphora) is the law this level's M1 grows from a sentence to a paragraph.

## Wave 1 — L3-M1, L3-M2 (#478)

Authored against the briefs written by #469 and the decisions recorded in `docs/76`, and reviewed
against the REAL cumulative index rather than against the briefs' account of it: **539 surfaces
through L2-M10, `maxSpan` 2**, growing to 551 after M1 and 583 after M2. A strict `npm run build`
emits `en-ko: 22 modules (L1-M1..M10, L2-M1..M10, L3-M1..M2)` with `CONTENT 206/206 ok`, and the
suite is 525 green. `maxSpan` holds at **2**, and the reason is the romanization law rather than
restraint: a verb ending is never hyphenated in this course, so `ilhaneun`, `baeuneun`, `bon` and
`sseun` are each one clean token, and the only hyphens the level adds are particle boundaries on
nouns the modules own.

### The correction that had to come first: `jeo-ga` is not Korean

The M2 brief wrote **`jeo-ga`** as the subject of a modifier clause, in its pattern list and again in
a note. 저 plus 가 is 제가: the pronoun changes shape before the subject particle, and the form is
**`je-ga`**. There is no register, dialect or speed at which `jeo-ga` is a thing a Korean says.

This is the wave's most important finding for a reason that has nothing to do with the size of the
error. A brief's PATTERN is the line an author copies most literally — it is the shape of every
sentence the module will write — and M2's subject-carrying pattern is spent again by four later
modules (`docs/76` §3 hands the verb modifier to M3's hedge, M4's advice frame, M7's `apeun de` and
M9's festivals). A wrong pronoun in that one line would have propagated through a level, in a course
whose whole surface is a transcription and where a learner has nothing but the transcription to
check against.

The module does not merely use the right form; it makes the alternation the lesson. `je-ga` is
S01's first word row, tagged **`interference`**, with the note saying that `jeo` changes to `je` in
front of `-ga` and that inside a modifier clause this is the only shape available, because `-neun`
cannot go there. S05 teaches it a second time from the error side: its plate is
`Jeo-neun jeo-neun baeuneun sueop-eul joahaeyo` and the `why` names both halves of the repair — the
clause subject takes `-ga`, and `jeo` becomes `je`.

The index cost is nothing, which is the last thing that had to be checked rather than assumed:
**`je` is already L1-M1's key** (`L1-M1-S02`, the possessive "my"), and the particle hyphen means
`je-ga` indexes as its own surface without donating to or stealing from it. The alternation gets a
row, the older key keeps its note, and `docs/76` §4's invariant — a hyphen marks a particle boundary
and nothing else — is what makes the two coexist.

### L3-M1 "Your day, in detail" — one topic, and a paragraph that stops naming it

L2-M3 taught what the particles DO inside one sentence and L2-M10 taught zero anaphora as a fact
about narration. M1's job is the place those two meet: **the topic is set once, at the head, and is
then not named again**, while a participant who is new to the account arrives with `-i/-ga` and
comes back in a later sentence with `-eun/-neun`. That is one law with two faces, and the module is
right to author it as two rules rather than one, because a learner needs to know both when to stop
saying `jeo-neun` and when to start saying `chingu-neun`.

Almost every display is two sentences, which is the only way this lesson can be shown at all. S01's
second sentence has no subject in it and is complete; its trap says the thing a learner will not
believe on their own — saying `jeo-neun` again "sounds as though somebody had disputed who was
eating". S02 runs the other half on one noun in two lines: `Chingu-ga wayo. Chingu-neun hangsang
keopi-reul masyeoyo.` S09 pairs the two participants in one display, and its variation flips
`dongsaeng-i` to `dongsaeng-eun` with the reason attached. English marks none of this, so the only
teaching that works is what each particle DOES to the listener, and that is what the traps carry.

The vocabulary spend is the frequency set, and it is the detail L1-M4 could not reach: `botong`,
`hangsang`, `jaju`, `gakkeum`, `geoui`, `byeollo`, `jeonhyeo`. Rule 2 states the one thing that is
true of all of them — **they stand in front of the verb** — and S03's plate is the English habit of
hanging "often" off the end of a sentence.

The three that carry a rule of their own are the module's best work. **`byeollo`, `jeonhyeo` and
`geoui` require the negative that follows them.** English hides the negative inside "not
particularly" and "hardly", so a learner writes `byeollo masyeoyo` and believes they have written a
weaker statement; rule 3 says it is not a weaker statement, it is a broken one, and S05's trap adds
the half that makes it stick — the sentence is one a Korean speaker cannot finish. S07 then catches
the subtler failure, which is a reading error rather than a production error: `geoui an jayo` is not
"I almost don't sleep", because Korean reads `geoui` and the negative as one unit meaning next to
none. A learner who parses the two words separately gets a hedge where the sentence meant near zero,
and nothing else in the course would ever tell them.

Rule 4 is the length lesson: **everything piles up before the verb**, in one neutral order — time,
place, manner, object, verb. S04 is the full chain (`Jeo-neun maeil achim-e jip-eseo ppalli bap-eul
meogeoyo`) and its trap grades the English order correctly: a sentence written backwards still
parses, and a Korean listener hears it as shuffled rather than as wrong. That is the honest grade,
and it is the one that gets a learner to fix it.

The sequencing costs nothing at all — `meonjeo`, `geu daeum-e` and `machimnae` are L2-M10's,
`geurigo` and `hajiman` are L1-M10's — so the module spends its budget on frequency and length rather
than on connectors. Rule 5 fences the alternative explicitly: the real time CLAUSES belong to L4-M6,
and no display here writes one. That fence is worth its line, because an author who wants "while I
eat breakfast" will invent `-(eu)myeonseo` unprompted, and so will a learner reading a module that
did not say the ending exists elsewhere.

One quiet seam correction rides in this module and is worth recording: the brief listed `ireonayo`
among its fresh keys, and **`ireonayo` is L1-M4's** (`L1-M4-S01`). The module opens no row for it —
S01's single row is `botong` — so the getting-up verb resolves to the module that first taught it,
exactly as it should.

### L3-M2 "Work and study" — the clause goes in front, and the gap stays empty

This is the decision of the level and `docs/76` §3 says so: the verb modifier is Korean's relative
clause, and every sentence in the module is one reversal. **English builds the noun and hangs a
clause off the back of it; Korean builds the clause and lands on the noun.** `je-ga ilhaneun hoesa`.
Rule 0 states it with the negative fact attached — there is no relative pronoun anywhere in it — and
S01's trap repeats that there is no word for "that" or "which" at all, because a learner will
otherwise spend the module hunting for the one that got left out.

The mistake plates go on the ORDER rather than on the endings, which is the right allocation: S01
writes the noun first (`Hoesa je-ga ilhaneun …`) and S10 puts the clause subject outside the clause
(`Ilhaneun je-ga hoesa-neun …`). Both are what an English speaker builds, and neither is a spelling
error.

Rule 1 buys the tense system for one sentence: **the ending on the modifier carries the tense, and
the main verb at the end is free to stay in the present.** S02 is the proof and it is a better
sentence than a rule — `Eoje bon yeonghwa-neun jeongmal joayo`, where `bon` says the seeing was
yesterday and `joayo` says the film is good now. English has to conjugate both verbs; Korean
conjugates only the one at the end. The plate conjugates both, which is exactly what a learner does.

The second half of the lesson is the one that survives the first, and rule 2 is the module's most
valuable paragraph: **inside the clause nothing marks the head noun's role.** `je-ga ilhaneun hoesa`
has no `-eseo` on `hoesa` and no resumptive word standing in for it — the slot is simply left empty,
and the noun takes whatever particle the OUTER sentence hands it. S04's plate is the error in its
purest form, `Oneul hoeui-reul haneun hoeui-neun …`, a learner filling the gap because English gave
them nowhere else to put the noun's job. S05 makes the same point structurally rather than by
prohibition: `Jeo-neun je-ga baeuneun sueop-eul joahaeyo` has two subjects and two different
particles, and the trap says why a modifier clause can never contain a topic — a topic belongs to a
sentence, and a clause is not one. That is M1's law seen from the inside, which is the best reason
for these two modules to be a wave.

Rule 4 is the trap the brief asked for and the module earns twice: **on a descriptive verb `-(eu)n`
is the PRESENT.** `keun daehak` is the university that IS big, so one ending means past on an action
verb and now on a descriptive one. L2-M2 shipped `keun`, `jageun`, `gin` and `jjalbeun` without ever
needing to say this. The authoring decision worth recording is that **M2 opens no row for `keun`** —
the key is L2-M2's and a second row would be unreachable — so the teaching moved into rule 4 and
S06's trap, with `daehak` taking the sentence's only row. A row nobody can reach teaches nothing; a
trap on the sentence that shows the ending teaches it to everybody who opens the sentence.

Rule 5 does the same job for the prospective: **`-(eu)l` is not new.** `hal`, `gal` and `meogeul` are
L1-M6's and `bol` is L2-M6's, all of them shapes of the `-l geoyeyo` future, and in front of a noun
they do the same job with the `geoyeyo` taken away. The module points and opens nothing, and both
S03 and S08 carry the pointer in their traps — "Korean did not invent a second future to build this
with". That is a genuine saving and it is also a genuine teaching: a learner who is told these are
the same ending stops learning a second one.

The past modifiers are where the brief's list and the module part company, for the collision
`docs/76` §4 predicted. **`han` is L1-M8's native ONE** (from `han jan`), so the past modifier of
`hada` can never be written bare, and S04's `haneun` note says so in content rather than leaving the
absence unexplained. The wave built its past modifiers on `bon` (S02, S08) and on **`sseun`** (S07)
instead of the brief's `ilgeun` and `meogeun` — `sseun` from the `sseuda` inside L2-M1's
`sseojuseyo`, which also lets S07 teach a stem dropping its vowel before the ending. S07's trap is
the level's romanization law restated where it is most exposed: a verb ending is never hyphenated,
which is also why the modifier `-neun` has nothing to do with L1-M1's topic particle.

`-(eu)ro` closes the module by doing its second job — `keompyuteo-ro ilhaeyo`, `son-euro meogeoyo` —
and the trap makes the point that one particle covers what English splits between "to" and "with".
And S10 keeps the honorific fence: `sajangnim` carries the respect on the TITLE, the productive
`-si-` that would put it on the verb is M8's, and the trap says the sentence deliberately does not
reach for it.

### Three more seam corrections, and one key left open

**`meokneun` is not how 먹는 is said.** The brief listed it among M2's fresh keys; the surface is
pronounced *meongneun*, and `docs/34` §1.1 requires a word-internal sound change to be written, as
`hangungmal` and `hakgyo` already are. Either spelling would have been a defect of a different kind:
`meokneun` breaks the transcription law the whole course rests on, and `meongneun` is correct but
arrives with no sentence built to make the assimilation visible. The wave **avoided the surface
entirely** — M2's present modifiers are `ilhaneun`, `haneun` and `baeuneun`, none of which assimilate
— so the key stays open for the module that wants to teach the sound change as well as the ending.
That is the better outcome: a fourth present modifier bought this module nothing, and the first
written assimilation in a modifier deserves a display of its own.

**`ilccik` is not the shipped key.** The M1 brief spelled L1-M4's "early" that way; the emitted fold
has **`ilchik`** (`L1-M4-S01`), and a display resolves against what shipped rather than against what
a brief remembers. M1 writes `ilchik` at S01 and again in S09's variation, so both taps land on
L1-M4's row. Whether `ilchik` is the right transcription of 일찍 in the first place is a real
question and it is question 7 below — but it is a question about a shipped L1 row, and a level never
edits a file below it, so it belongs to the native pass and not to this wave.

**`sikdang-eseo` does not exist.** L2-M5 opened `sikdang`, `sikdang-eun` and `sikdang-i`
(`L2-M5-S09`) and no more, so a sentence about eating out in M2 would either show an untaught surface
or spend one of the module's rows opening a particle form on somebody else's noun. The wave routed
around it and M2 eats nowhere. The general rule this makes visible is worth carrying into the rest of
the level: **a particle shape is free when the module owns the noun and costs a row when it does
not.** M2 owns `hoesa`, `hoeui`, `sueop`, `siheom`, `bogoseo`, `sukje`, `daehak` and `keompyuteo`, so
`hoesa-neun`, `hoesa-eseo`, `hoeui-e`, `hoeui-ga`, `sueop-eul`, `siheom-eun`, `bogoseo-reul` and the
rest ride in the `forms` of the rows that already teach those nouns, and cost nothing at all.

### The register decision, carried into L3 without a new rule

`docs/76` §2 says L3 adds no register rule and applies the one it has, and both modules do exactly
that: the `-yo` style throughout, `jeo` and never `na`, `-mnida` untouched at its four frozen
phrases, and **`informal` deliberately absent** because the forms that would earn it are banmal.
M1's rule 6 states all of it in content, which is the only way a missing value reads as a decision
rather than an oversight to the next author.

What is worth recording is that **all twenty sentences in this wave chip `neutral`**, and one of them
tests the definition. The chip is `formal` on a line whose SUBJECT is honoured, and S10 talks about a
`sajangnim` — a raised title — in a plain `-yo` sentence with no `-si-` on the verb. It chips
`neutral`, and that is right: the respect is on the noun, the verb honours nobody, and a chip that
fired on the title would have made `formal` mean "a respectful person was mentioned" instead of "this
sentence honours its subject". M8, where the honorific runs through a whole exchange, is the module
that needs the chip to still mean the second thing.

### The ratchet

`tools/shown-surfaces.test.ts` held at **en-ko 12** across both modules, with **no finding at all** —
not one shown-but-untaught surface in either file, against 12 new keys in M1 and 32 in M2. In a
course where every particle is a separate surface, that number is not an accident of small
vocabulary: it is `docs/68`'s fix applied BEFORE the build rather than after it. Every particle shape
a display shows was authored into the `forms` of the row that owns its host — `bogoseo` with
`bogoseo-neun` and `bogoseo-reul`, `siheom` with `siheom-eun`, `siheom-i` and `siheom-eul`, `sueop`
with three, `hoeui` with three, `hoesa` with two — so the surfaces the ratchet looks for were taught
in the same row that first showed them. The L2 waves fixed roughly a hundred findings that way after
the fact; this one had none to fix.

### Open questions for the native pass

1. **Frequency in front of the verb** (M1, rule 2 and S03). Confirm no member of the set —
   `botong`, `hangsang`, `jaju`, `gakkeum` — can follow the verb in ordinary speech, and that
   `Hakgyo-eseo gongbuhaeyo jaju` is heard as an error rather than as an afterthought.
2. **The topic set once** (M1, rule 0 and S01). Confirm a two-sentence answer that repeats
   `jeo-neun` reads as insistent or contrastive, and that dropping it entirely, as S01's second
   variation does, is equally ordinary once the conversation knows who.
3. **`-ga` introduces, `-neun` returns** (M1-S02, S09). Confirm the pattern on a friend and a
   sibling, and whether a speaker would in fact drop both particles in relaxed speech.
4. **`byeollo` and `jeonhyeo` without their negative** (M1, rule 3 and S05). Confirm
   `byeollo masyeoyo` is genuinely unfinished rather than merely blunt, and that a listener waits for
   something that never comes.
5. **`geoui an jayo`** (M1-S07). Confirm it means next to none rather than "almost don't", and that
   `geoui` outside a negative is not something a learner will meet at this level.
6. **The chain order** (M1, rule 4 and S04). Confirm time, place, manner, object, verb is the
   neutral order, and that `jip-eseo ppalli` rather than `ppalli jip-eseo` is what a speaker says.
7. **`ilchik`** (M1-S01, and L1-M4's shipped row). The course transcribes 일찍 as `ilchik`. Confirm
   whether that is a fair Revised Romanization of the tense consonant, or whether the shipped key is
   wrong — in which case the fix belongs to L1-M4 and to a decision above this level, not to a
   rewrite here.
8. **The bare `haeyo` standing in** (M1-S06). Confirm `Hajiman jeo-neun jeonhyeo an haeyo` after
   `undonghaeyo` is what a speaker says, and that repeating `undonghaeyo` would sound laboured.
9. **Resting with `-eseo`** (M1-S08). Confirm `jip-eseo swieoyo` and that `jip-e swieoyo` is wrong
   rather than regional, given that resting looks more like a state than an action.
10. **`je-ga`** (M2-S01, rule 3). The wave's most load-bearing correction. Confirm 제가 is the only
    subject form, that `jeo-ga` is never heard at any speed or register, and that a learner saying it
    is noticed immediately.
11. **`je-ga ilhaneun hoesa`** (M2-S01, S10). Confirm this is how somebody refers to the company they
    work at, and whether `danineun hoesa` is in fact commoner in speech.
12. **Seeing an exam** (M2-S02, S08). The module says Korean sees an exam rather than taking one, so
    `bon siheom` and `bol siheom` are its modifiers. Confirm, and whether an adult says
    `siheom-eul chyeoyo` instead.
13. **`keun` as a present** (M2, rule 4 and S06). Confirm `keun daehak` can only mean the university
    that is big now, with no reading in which it used to be, and that the same holds for `jageun`,
    `gin` and `jjalbeun`.
14. **`sajangnim` in a plain `-yo` sentence** (M2-S10). Confirm that talking ABOUT a company head
    with the `-nim` title and no `-si-` on the verb is safe rather than curt, and that `sajangnim` is
    the head of the company rather than any manager.

## Wave 2 — L3-M3, L3-M4, L3-M5 (#487)

Authored against the briefs regenerated module by module — `npm run content:prompt -- en-ko L3-M3`
at **583 surfaces**, `L3-M4` at 606, `L3-M5` at 619 — and reviewed against the emitted fold rather
than against the briefs' account of it. The course closes the wave at **641 surfaces**, `maxSpan`
still **2**, and `npm run content:build` (strict, no flags) emits
`en-ko: 25 modules (L1-M1..M10, L2-M1..M10, L3-M1..M5)` with `CONTENT 209/209 ok`. The three
modules add 23, 13 and 22 keys.

`maxSpan` holds at 2 for the reason wave 1 gave and one new one. The reason wave 1 gave is the
romanization law: a verb ending is never hyphenated, so `isseumyeon`, `gamyeon`, `ondago`,
`masitdago`, `onyago` and `gajago` are each one clean token and the level's endings mint no bare
keys. The new one is that this wave adds the level's ONLY multi-token surface, `geot gatayo`
(M3-S01), indexed whole — so bare `geot` stays L2-M9's row and `gatayo` stays free underneath it,
exactly as `docs/76` §4 planned it.

### The romanization ruling this wave had to make: where the h is written and where it aspirates

`docs/34` §1.1 says word-internal sound changes are written because RR transcribes, and §5 ships
`jota` beside `joayo` as two shapes of the same stem. This wave is the first to need that rule in
bulk, and it needed it in two directions at once, so the line is drawn here rather than left to the
next author:

- **A stem-final h aspirates the consonant after it, and the aspirate is what gets written.**
  좋지 is `jochi`, not `joji`; 좋다고 is `jotago`; 그렇게 is `geureoke`. This is RR's own rule and it
  is already the course's practice through `jota`.
- **An h that OPENS a following morpheme keeps its letter.** `saenggakhaeyo` (M3), `mothaeyo` (M3)
  and every `-hada` verb already shipped — `gongbuhaeyo`, `jeonhwahaeyo`, `undonghaeyo` — are one
  family, and RR's own carve-out for a substantive followed by h is what they stand on.

**The M3 brief spells the long negative `joji anayo`, and that is the first of this wave's seam
corrections.** The module writes **`jochi anayo`**, teaches the change in the `jochi` note by
pointing at `geureoke` — where the same aspiration is already visible on the page — and keeps the
brief's minimal pair intact, because `an joayo` against `jochi anayo` is exactly the lesson. It
matters for the reason wave 1's `je-ga` did: a brief's example is the line an author copies most
literally, and this one would have taught a spelling no Korean says.

### L3-M3 "Opinions with reasons" — the hedge is not decoration, it is the sentence

`docs/76` names the module's frame as M2's modifier doing its first real job, and the module is
right to open on the minimal pair rather than on the ending. Rule 0 says the thing an English
speaker will not believe: **`I-sikdang-i joayo` is not a blunter version of `I-sikdang-i joeun geot
gatayo`** — it is a claim about fact, and the hedge is what makes the sentence a view at all. Rule
1 states the delta as a shape against a word: English states the claim flat and hangs "I think" on
the front; Korean rebuilds the sentence and needs no word for thinking anywhere in it. S02's trap
closes that loop from the other side — the verb ends a Korean sentence, so `saenggakhaeyo` cannot
come before what is thought, and S02's plate is exactly the English order.

The long negative is taught as PLACEMENT rather than meaning, which is the brief's own framing and
the right one. S05 is the pair on one word — `an joayo` in the variation, `jochi anayo` in the
display — and its trap refuses to grade either as stronger: the long form simply lets the listener
hear the word before the refusal, which is why a disagreement takes it. S06 then separates the two
long negatives on the axis English hides — `gaji anayo` is a choice, `gaji mothaeyo` is an
obstacle, and "I'm not going" covers both — and points back at L1-M3's `an` and L2-M8's `mot`
without opening a third negative.

The reasons are the module's hardest content and it spends two displays on them rather than one.
S06 writes `bappeunikka` and S07 writes `onikka`, so `-(eu)nikka` is seen on two stems before the
law is tested; **the law is that only `-(eu)nikka` may be followed by a request, a suggestion or an
order**, and S07's plate is `Bi-ga waseo taeksi-reul taseyo`, which is the sentence an author who
learnt `-aseo` in L1-M9 would write. S06's variation pays the other half by putting a `-(eu)llae-yo`
suggestion after the reason. `ttaemune` lands at S08 with the `interference` tag it deserves:
English says "because it rained" and "because of the rain" with almost the same words, and Korean
uses two different pieces of grammar.

A second seam correction rides here. **`bappeunikka`, not the `bappa-` shape the brief's `-aseo`
example would suggest.** The stem is `bappeu-`, and L1-M9's `bappaseo` drops that vowel while
`-(eu)nikka` does not, so the two reason endings on one verb look different on purpose. The
`bappeunikka` note says so.

The agree, disagree and soften frames cost almost nothing and teach a lot. `majayo` is tagged
`interference` because **its subject is the statement, not you** — `Jeo-neun majayo` claims that
you are the correct one, and that is S03's plate. `teullyeoyo` gets the same treatment from the
polite side: S09 disagrees by asking whether the thing is not wrong, with `hoksi` in front, and its
trap names the English habit it replaces — piling up qualifiers instead of changing the sentence.
S10 closes on `jal moreugesseoyo`, taught as one frozen phrase with its note saying outright that
the `-gess-` inside it is L3-M6's and is not being opened.

**One thing the brief asked for that the module does not do.** The generated `complexity` block
offers `clause + -dago + saenggakhaeyo` as an allowed pattern. `-dago` is M5's, deferred there
explicitly by both L2-M7 and L2-M10 and handed to M5 by `docs/76` §3, and the M3 guidance prose
never mentions it — the pattern list reached across two modules on its own. The module replaced it
with `N + ttaemune + clause` and `V-ji + mothaeyo`, and M5 opens `-dago` where it was always meant
to. Recorded because that pattern list is pinned by `tools/course-briefs.test.ts` and a later
reader will otherwise trust it.

### L3-M4 "If and then" — one ending, bought once and spent three ways

This is the cheapest module of the level and the brief is right that it should be. `-(eu)myeon` is
THE WHOLE CONDITIONAL — rule 0 says Korean does not split "if" from "whenever" and that only the
surroundings decide — and S01 and S02 are the same ending read the two ways, with M3's `hoksi`
available in front to force the doubtful reading. That pairing is the module's best teaching,
because a learner hunting for the difference is hunting for something that is not there.

Rule 1 is the only genuinely new mechanics in the file: **the ending picks its shape from the stem,
not from the meaning.** `gamyeon`, `omyeon`, `hamyeon` and `apeumyeon` against `isseumyeon`,
`eopseumyeon` and `joeumyeon`. S04's trap states the negative fact plainly — `haeumyeon` is not a
more careful `hamyeon`, it is not a shape the language has — and the plate writes it, because that
is what an English speaker who has seen the ending written with its bracket will produce.

The three spends are all assembly, and the module says so each time. **Prohibition** is the
condition plus L2-M8's `an dwaeyo`, and S03's plate is the error that proves the parse:
`neutge an gamyeon dwaeyo` says the opposite — that not going late is fine — because the negation
belongs to `dwaeyo` and never to the condition. **The wish** is the condition plus `joayo`, and
S09's trap is the one an English speaker never guesses: there is no verb for hoping in
`Naeil nalssi-ga joeumyeon jeongmal joayo` at all. **Obligation** is L2-M8's `-eoya dwaeyo`
untouched (S07), with a trap saying Korean did not grow a second "have to" for conditional
sentences.

Advice costs two keys, `ganeun` and **`ge`**, and `ge` is the only new grammar in it: it follows a
modifier and turns the clause into a thing that `eottaeyo` can ask about. S05's trap frames it as
the reversal it is — English asks about an action, Korean builds the action into a noun first — and
its plate is the same error `geot gatayo` catches in M3, which is the right cross-reference to make
while both are fresh. `geureomyeon` at S08 is the quiet find of the module: it is M3's `geureoke`
stem wearing this module's ending, so Korean's "then" is literally *if that is so*, and the plate
sets it against `geureoke` to show that "that way" is a different word.

The L4 fences are stated in content rather than only in the brief, and one of them is stated as a
mistake plate, which is better. S10's plate is **`Maeil undonghapsida`** — the "let us" an author
and a learner both reach for — with the `why` naming `-(eu)psida` as belonging to the `-mnida`
speech level this course does not teach. Rule 6 fences the past counterfactual (L4-M3),
`-(eu)myeonseo` (L4-M6) and `-gess-` (L3-M6) beside it.

Two brief entries were already spent before this module ran. The M4 INDEX SEAM lists `hoksi` and
"bi is fresh if a display needs weather" as fresh keys; **M3 took both**, because the briefs were
written as ten independent notes and the wave authors them in order. Neither is a defect — M4 uses
each correctly as somebody else's key — but a reader comparing the brief against the fold should
know why those two are missing from M4's thirteen.

### L3-M5 "What someone said" — the plain style appears, and the ban does not move

This is the level's most exposed decision and the module leads with it. Rule 0 states the grammar
and the prohibition IN THE SAME SENTENCE: `-dago` attaches to the plain style, so `gayo` becomes
`ondago` and `masisseoyo` becomes `masitdago` and the plain form is finally on the page — bound
inside a report, never as a sentence anybody says — and L3 does not lift the L1 ban. Banmal is
still never free-standing, `jeo` is still never `na`, and `informal` is still chipped nowhere in
this course. That had to be one rule rather than two, because an author reading only the first half
would read the plain stem as permission.

Rule 1 is the shape law and it is worth its line: **an action verb inserts an n and a describing
verb does not.** `ondago`, `gandago`, `baeundago` against `masitdago`, `jotago`, `eopdago`. It
splits the verbs exactly where M2's `-neun` and `-(eu)n` already split them, which is the second
time in the level that one distinction has paid twice.

The gift is tagged `free` and taught twice from the error side, which is the right allocation for
something whose only difficulty is unlearning. **Korean does not backshift**: S01's plate is
`naeil watdago` and S10's is `naeil siheom-i eopseotdago`, and both `why` lines say the same thing
in the learner's own terms — he said he IS coming, so the report keeps the present. Rule 3 then
carries the half that does move: the `jeo` inside the quote is not swapped for another pronoun, it
is simply dropped, because M1's law already says a subject the listener knows is not named again.
S03's plate leaves it in and reports the speaker's own learning instead of the friend's.

The five shapes get one display each, sorted by what was said rather than by who said it, which is
the sort a learner has to internalise: `-dago` (S01–S03), `-(i)rago` (S04), `-(eu)rago` (S05),
`-jago` (S06), `-nyago` (S07). S04 teaches the copula's allomorph pair on one sentence —
`haksaeng-irago` after a consonant, `uisa-rago` after a vowel — and the hyphen sits at the copula
boundary exactly where `haksaeng-ieyo` already put it, so `haksaeng` keeps L1-M1's key and `irago`
is the only new one that surface mints. S07 is where the second verb earns its place: a reported
question hands off to `mureosseoyo` rather than `haesseoyo`, and its trap names the missing word —
**there is no Korean for "whether"**, the ending is the whole of it.

S05 carries the register decision. **A reported command loses its politeness ending**: the teacher
said `oseyo` and the report is `orago`. The trap refuses to let that read as rudeness — an ending
like `-(eu)seyo` belongs to the sentence somebody actually spoke, and a report is your sentence,
not theirs — and the respect moves onto the title and the chip. S06 then collects M4's debt: "let
us" had nowhere to go there, because `-(eu)psida` is L4-M7's, and inside a report it is simply
`-jago`. That is the two modules of this wave paying each other, and it is the best argument for
authoring them together.

`mal` and `malsseum` close the module. **`mal` is free**, as `docs/76` §4's first correction
predicted and as the fold confirms: `hangungmal` is one whole token of L1-M1's and donates nothing.
S08 spends it on the fact English hides — **Korean agrees with the WORDS, not the person**, so
`chingu mal-i majayo` and never `chingu-ga majayo` — and there is no possessive particle between
the two nouns either. S09 gives `malsseum` its own row and its own trap: it is not a politer tone,
it is a different word, and once the speaker is somebody you raise the swap is obligatory. The
productive `-(eu)syeosseoyo` and `-kkeseo` stay M8's and are named as deferred rather than borrowed.

### The seam corrections, and one key left open

**`jeo-ga` came back, and the ratchet caught it.** M5-S04's second variation was authored as
`Minsu-neun jeo-ga haksaeng-irago haesseoyo` — the same error wave 1 corrected in M2's brief,
reappearing in a wave that had read the correction. `npm run content:shown -- en-ko L3-M5` reported
it as the file's only SHOWN-BUT-UNTAUGHT surface, because `je-ga` is a key and `jeo-ga` is not, and
the fix was one word. Two things are worth recording. The first is that the Hangul `script` line was
already correct while the romanization was wrong, which is the exact failure mode a transcription
course is exposed to. The second is that the check caught it **because wave 1 opened `je-ga` as a
row**: the index is what made the error mechanically visible, and a course that had left the
alternation untaught would have shipped it.

**`wanyago` is not how 왔냐고 is said.** The M5 brief lists it among the module's fresh keys; the
surface is pronounced *wannyago* — the past marker resolves to t and then assimilates to n in front
of the ending — and `docs/34` §1.1 requires that to be written, as `hangungmal` already is. This
wave **avoided the past reported question entirely**: S07 writes `onyago` and `ganyago`, both of
which are clean, so the key stays open for the module that wants to teach the assimilation as well
as the ending. That is wave 1's `meokneun` play repeated deliberately, and for the same reason — a
first written assimilation deserves a display built to make it audible.

**One assimilation this wave did write, and did build a display for.** `masinneun` (M3-S03) is
맛있는 said as it sounds, the t of the stem meeting the n of the ending, and the row's note says so
in content. Wave 1 left `meongneun` open precisely so that the first assimilated modifier could
arrive with a sentence around it; M3 needed a tasty-modifier for the hedge, so it took the debt and
paid it in the same row. `masitge` (L2-M5) and `masitdago` (M5-S02) are the same stem written with
`t` before a consonant that does not assimilate, so the three surfaces together are the rule.

**Register, reconciled rather than assumed.** The M3 brief says the elder-disagreement lines chip
`formal`; `docs/76` §2 says `formal` means an honoured SUBJECT, and wave 1 argued hard that the
chip must keep that meaning for M8's sake. The two are reconciled by making the formal-chipped
lines actually carry `-(eu)seyo` on the listener: M3-S07 `taseyo`, M4-S06 `deuseyo`, M4-S08
`taseyo`. M3-S10 (`Joesonghajiman, jeo-neun jal moreugesseoyo`) chips `formal` on the strength of
L2-M8-S07's shipped precedent, where a `joesonghajiman` line does the same. M5-S05, S09 and S10
chip `formal` because their subject is a `seonsaengnim`, which is L2-M2-S08's precedent. Eight of
the thirty sentences chip `formal`, twenty-two `neutral`, and `informal` appears nowhere — stated
in M3 rule 6 and again in M5 rule 0, so the absence reads as a decision at both ends of the wave.

### The ratchet

`tools/shown-surfaces.test.ts` holds en-ko at **12** across all three modules, unchanged since the
course opened and unchanged by 58 new keys. The one finding the wave produced — M5's `jeo-ga` — was
found by `npm run content:shown` before the build ran and fixed in the authoring pass, so the
emitted count never moved.

The discipline is `docs/68`'s, applied before the build rather than after it, and it is what made
the particle work free: every particle shape a display shows was authored into the `forms` of the
row that owns its host. `bi` carries `bi-ga`; `nalssi` carries `nalssi-ga`; `mal` carries `mal-i`
and `mal-eun`; `malsseum` carries `malsseum-eun` and `malsseum-i`. Where the host belongs to an
earlier module, the wave routed around the missing shape instead of opening a row on somebody
else's noun — `jeo-do`, `gogi-ga`, `saengseon-i`, `hoeui-eseo` and `sukje-reul` were each wanted at
some point by some display and none of them exists in the fold, so none of them was written. That
is wave 1's rule restated: **a particle shape is free when the module owns the noun and costs a row
when it does not.**

`npx vitest run src/course/types.test.ts` keeps every en-ko guard green — no Hangul outside
`script`, pure ASCII throughout, no bare particle as its own token, no plain-style pronoun, and
`-mnida` still at exactly its four frozen phrases. The one failing assertion in that file is the
206-file census, which enumerates every module in the repo by name and needs the three new rows;
that is a count, not a content defect, and it belongs to whoever lands the wave.

### Open questions for the native pass

15. **The hedge against the flat assertion** (M3, rule 0 and S01). Confirm that
    `I-sikdang-i joayo` really does read as a claim about fact rather than as a blunter opinion,
    and that a Korean speaker giving a view of a restaurant reaches for `geot gatayo` by default.
16. **`jochi anayo`** (M3-S05, and the ruling above). Confirm the aspiration is what a speaker says
    and what a reader expects to see romanized — `jochi` rather than `joji` for 좋지 — and,
    separately, that `saenggakhaeyo` and `mothaeyo` are the shapes to write rather than
    `saenggakaeyo` and `motaeyo`. These are one decision seen from two sides and both halves need a
    native eye.
17. **`an joayo` against `jochi anayo`** (M3, rule 2 and S05). Confirm the two are genuinely
    interchangeable in meaning, that neither is stronger, and that a disagreement really does
    prefer the long form in ordinary speech.
18. **`-(eu)nikka` before a request** (M3, rule 4 and S07). Confirm `Bi-ga waseo taeksi-reul taseyo`
    is heard as wrong rather than merely awkward, and that the block holds for a suggestion
    (`gallae-yo?`) as firmly as for an order.
19. **`bappeunikka`** (M3-S06). Confirm the stem vowel comes back before this ending while
    `bappaseo` drops it, and that a speaker would not say `bappanikka`.
20. **`majayo` and `teullyeoyo` taking the statement as subject** (M3-S03, S09; M5-S08). Confirm
    `Jeo-neun majayo` and `Chingu-ga majayo` are both wrong in the way the modules say, and that
    `Chingu mal-i majayo` is what a speaker actually says.
21. **`jal moreugesseoyo` as frozen** (M3-S10). Confirm `jal` here softens rather than measures,
    that the phrase is not felt as containing a live `-gess-`, and that stacking `jom` or
    `jeongmal` onto it is as odd as the plate says.
22. **The one conditional covering if and whenever** (M4, rule 0 and S01–S02). Confirm a speaker
    hears no ambiguity in `Sigan-i isseumyeon gachi gayo`, and that `hoksi` in front is what marks
    the doubtful reading rather than a separate ending.
23. **`geureomyeon`** (M4-S08). Confirm it is the ordinary "then" of conversation, that it is not
    interchangeable with L2-M10's `geu daeum-e`, and that `geureoke` in its place is heard as an
    error rather than as a shrug.
24. **The wish** (M4, rule 4 and S09). Confirm `Naeil nalssi-ga joeumyeon jeongmal joayo` is how a
    speaker hopes for something, and whether an adult would more often say it with
    `-(eu)myeon joagesseoyo` — which would put the shape inside M6's `-gess-` rather than here.
25. **`-neun ge eottaeyo?`** (M4-S05, S10). Confirm it is the everyday way to offer advice to a
    friend and to somebody senior alike, and that the bare `ge` is written and heard as its own
    word rather than as part of the modifier.
26. **The plain style bound inside a report** (M5, rule 0). The wave's most exposed decision.
    Confirm that a learner who has only ever seen `ondago` and `masitdago` inside `-dago` reports
    is in no danger of producing the bare plain form as a sentence, and that nothing in this module
    reads as permission to use banmal.
27. **The action against describing split** (M5, rule 1). Confirm `ondago`, `gandago` and
    `baeundago` against `masitdago`, `jotago` and `eopdago`, and that there is no verb at this
    level where the split is unclear to a speaker.
28. **No backshift** (M5, rule 2, S01 and S10). Confirm `Chingu-ga naeil ondago haesseoyo` is
    exactly "my friend said he is coming tomorrow", and that a past inside the quote would be heard
    as reporting a past event rather than as English's tense agreement.
29. **A reported command losing `-(eu)seyo`** (M5-S05). Confirm `Seonsaengnim-i naeil orago
    haesseoyo` is safe rather than curt when the teacher is not present, and how much is lost by
    not having M8's honorific infix available to write the fuller form.
30. **`wannyago`** (M5-S07, and the seam correction above). The wave avoided 왔냐고 rather than
    write it. Confirm the assimilation is real and that `wannyago` is the transcription, so the
    module that opens the past reported question knows what it is opening.
31. **`mal` against `malsseum`** (M5-S08, S09). Confirm the swap is obligatory rather than
    preferred once the speaker is raised, that `seonsaengnim mal-eun` is heard as an error, and
    that `chingu mal-i` with no particle between the two nouns is what a speaker says.
