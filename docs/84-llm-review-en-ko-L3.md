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

---

## Wave 3 — L3-M6..M10 (#558)

The five modules that close the level, authored against the briefs and reviewed against the REAL
cumulative index rather than against the briefs' account of it: **583 surfaces through L3-M2,
`maxSpan` 2**, growing to 601 after M6, 636 after M7, 699 after M8, 760 after M9 and **773** after
M10. `npm run content:validate` is `CONTENT 211/211 ok`, `npm run content:shown` is clean on all
five with **no shown-but-untaught line and no re-teach reported anywhere**, and
`npx vitest run tools/shown-surfaces.test.ts` is 11/11 with en-ko holding at **12**.

**One condition on reading the numbers.** L3-M3, L3-M4 and L3-M5 were not in this worktree when
this wave was authored — they are a separate wave, merged by the same change — so the strict build
here emits `en-ko: 27 modules (L1-M1..M10, L2-M1..M10, L3-M1..M2, L3-M6..M10)` rather than 30, and
every check above was run against the index through L3-M2 plus this wave's own rows. Nothing in
these five files depends on a key M3, M4 or M5 will own: where the brief handed a shape to one of
them, this wave either declined the shape or took a neighbouring form the seam explicitly does not
list, so the merge adds rows and steals none. Each case is named below. 

### L3-M6 "Feelings in depth" — the feeling you can see, and the one you cannot

The module is built on the one law an English speaker never guesses: **Korean will not let you
state another person's inner state directly.** `Jeo-neun neomu gippeoyo` is right; `Chingu-neun
gippeoyo` is not, and S02 answers it with `Chingu-ga gippeohaeyo` — the descriptive verb turned
into something a person is visibly doing. The payoff the brief asked for is pointed at rather than
re-taught: L1-M1's `joahaeyo` IS this rule already frozen, `joayo` being it-is-good-to-me and
`joahaeyo` likes-it, and rule 1 says so in those words. The mistake plate on S02 and S03 is that
sentence twice, once for the verb shape and once for the particle: a friend takes `-ga`, never
`-neun`, because the sentence is about what they are doing.

`-gess-` opens as **conjecture and not as a second future**, which is the half of it that half the
material a learner meets gets wrong. `himdeulgesseoyo` (that must be hard), `masitgesseoyo` (that
looks good) and `algesseoyo` (I see) share one row and one note, and rule 4 says out loud that every
plan is still L1-M6's `-l geoyeyo`. Nuance is spent on DEGREE rather than on lexemes, exactly as the
brief asked — `neomu` is the only intensifier bought, and `jom`, `jogeum`, L3-M1's `byeollo` and
L2-M1's `gwaenchanayo` do the rest with no new keys at all. Every clause is present; the past of a
feeling is handed forward to M10, and M10 takes it.

Register stays **neutral throughout, and rule 6 says that is a decision.** Feelings are what friends
talk about and every other course's M6 chips informal somewhere; en-ko cannot, because the forms
that would earn it are banmal, which L1 banned and this level does not lift. Warmth is carried by
`-gess-` to sympathise and `jom` to soften instead.

### L3-M7 "Body and health" — the part hurts, and you do not

The double subject gets its fourth and most natural outing. `Jeo-neun mok-i apayo` is as-for-me,
the-throat-hurts, and the delta that survives four modules of practice is that **there is no
possessive anywhere in it**: `jeo-neun` has already said whose throat it is, so `je mok-i apayo` is
what a learner writes and is the mistake plate on S01. L2-M2's `meori` and L2-M8's `apayo` are spent
and not re-opened — `meori` appears only in a variation, and no row in this file re-teaches either.

The symptom frame is the module's best delta because English has no version of it: **a symptom comes
out.** `Yeol-i nayo`, `Gichim-i nayo` — one verb for anything that appears on its own, with the
symptom marked `-i/-ga` and the sick person named nowhere at all. Beside it, catching something
inverts the English picture twice over: `Gamgi-e geollyeosseoyo` is I-got-caught-ON-a-cold, the
illness taking `-e`, and it is said in the past about a cold you still have. `heori` and `deung` are
authored as one English word splitting into two Korean ones, with the split not where an English
speaker would put it.

L3-M2's modifier does everyday work here, which is the whole reason it was opened at M2:
`maeil meongneun yak`, `eoje meogeun yak`, `apeun de`. `meongneun` is also where the romanization law
earns its keep — spelled meok-neun, written as it is said. `de` is authored as a noun that cannot
stand alone, which is the honest fact about it and the reason M2 and M7 are one lesson in two parts.

### L3-M8 "Money and paperwork" — the honorific at full stretch, and the ten-thousand

This is the module the `-si-` decision was made for. L2-M1 made `-(eu)seyo` productive in the
imperative and stopped; here `-kkeseo` replaces `-i/-ga` on an honoured subject, `-(eu)syeosseoyo`
carries the honorific past (`osyeosseoyo`, `badeusyeosseoyo`, `malsseumhasyeosseoyo`), and the
honorific nouns replace an ordinary word outright — `seongham` for a name, `daek` for a house,
L3-M5's `malsseum` for speech. L2-M1's one rule that never bends is restated as rule 3 and plated on
S01: **never of oneself.** `Jeo-kkeseo` is the mistake, and the fix is `Jeo-neun`.

The numbers are L2-M5's law finally stretched. **Korean counts in ten-thousands**, so thirty
thousand won is `samman won` and a hundred and fifty thousand is `siboman won`, and the mistake
plate is the one an English speaker actually makes: `samsip cheon won`, thirty thousands, built the
English way. Dates are Sino throughout, big to small, with a single `-e` on the end of the whole
date. `-kkeseo` was genuinely unowned, exactly as the brief said — L2-M2's brief listed it in a
pattern and no L2 sentence ever shipped it — so this module takes it cleanly.

What stays out is named in rule 8 because this is the brief whose edge touches it: the clerk
genuinely does speak `-(seu)pnida`, and this course still does not write it. `gamsahamnida` in M10
is one of the four frozen phrases the course already owns, and nothing grows the set.

### L3-M9 "Festivals and everyday culture" — the modifier leaves the office

`-deon` opens as the level's fourth modifier and as ONE frame: `halmeoni-ga mandeuldeon tteokguk`,
the tteokguk grandmother used to make. It is the only modifier in the course that carries a feeling
as well as a tense, and S04's trap is the pair a learner will confuse — `mandeun tteokguk` is the
one she made, `mandeuldeon tteokguk` is the one she used to make. `-eoss-eoss-` lands beside it,
also as one frame, and rule 2 says the thing about it that matters: **two pasts do not mean longer
ago.** `gasseosseoyo` says the habit has ended, so it answers do-you-still rather than when.

L2-M7's progressive gets its second life on a crowd, which is the reading that module reserved it
for, and L2-M3's `-deul` finally has a sentence that needs it. The culture is the vocabulary spend
and the claims stay small: a display says what is on the street, `usage` says when the day falls,
and nothing is asserted as universal. `ttae` takes no key anywhere in the file — a festival is
placed with `-e`, and every time clause is L4-M6's.

### L3-M10 "Your own story" — eight sentences, one named subject

The job is an account built from the whole ladder, and the new-word spend is the smallest of the
level and contains **no fresh noun at all**: twelve rows, eleven of them a past or a future shape of
a verb the ladder already owns, plus one reported form. The lesson is the two halves of the level
meeting. L2-M10's zero anaphora is stretched from four sentences to eight — S10 runs seven
sentences without naming its speaker once — and L3-M1's topic-against-subject law runs across a
paragraph, with `chingu-ga` introducing and `chingu-neun` returning. Both failures are plated: an
account that opens every sentence with `jeo-neun`, and one that marks every return with `-i/-ga` and
so reads as three different friends.

S05 and S06 are **one story told twice**, which is what the register rule demanded. The teacher takes
`-i` and a bare verb for a friend, `-kkeseo` and `dowajusyeosseoyo` for an elder, and the speech
level does not move between them: both are `-yo` sentences, neither is banmal, and the choice this
course offers is between two values rather than three. S06's mistake plate is `Jeo-kkeseo`, the same
one M8 opened with, because M10 is the last place an author can mistake the absent informal for an
oversight.

The story shape the brief asked for is in every account that can carry it: a reason (`geuraeseo`,
L1-M9's `-aseo`), a feeling (`apasseoyo`, `buranhaesseoyo`, `seulpeosseoyo`, `himdeureosseoyo` — the
past of a feeling that M6 deferred to here), and one reported line.

### The brief seams this wave had to correct, and what the index actually said

1. **`gippeo haeyo` is one token, not two** (M6, brief note 1 and pattern 2). The brief writes the
   third-person feeling shape with a space. The same note names L1-M1's `joahaeyo` as this rule
   already frozen, and `joahaeyo` is ONE whitespace token in the emitted fold. A spaced form would
   make the index read `haeyo` as a separate verb and would break the course's own law that a space
   never sits inside a word. Shipped `gippeohaeyo`, `seulpeohaeyo`, with rule 2 saying why.
2. **`hwaga nayo` is not written in M6** (brief note 5). The note points its `na-` verb at M7's
   `nayo` row — but M7 is later, and a display may not show a surface a later module owns. M6 leaves
   it out; `nayo` opens in M7, where the brief put it.
3. **`swieuseyo` is not a form; the imperative of 쉬다 is `swiseyo`** (M7, brief note 4). The
   `-(eu)seyo` set in the emitted fold decides it without appeal: `anjeuseyo` and `badeuseyo` carry
   the `-eu-` because those stems end in a consonant, while `gaseyo`, `oseyo`, `taseyo`, `naeriseyo`
   and `jinaeseyo` do not. 쉬다 ends in a vowel. Shipped `swiseyo`, with rule 6 and the mistake plate
   on S09 stating the split, and `masimyeon` in S08 shown as the same rule on the same seam.
4. **`masimyeon` is M7's, not M4's** (M7, brief note 5). The note assigns the `-(eu)myeon` forms to
   M4, and M4's own seam lists them: `hamyeon`, `gamyeon`, `isseumyeon`, `eopseumyeon`, `omyeon`.
   `masimyeon` is not among them, so M7 takes it and points back at M4's frame in the row note. No
   key M4 will own is touched.
5. **`sseo juseyo` is one token** (M8, pattern 4). L2-M1 shipped `sseojuseyo` joined, and its own
   rule says every `-a/eo juseyo` form is ONE whitespace token, never hyphenated. The emitted fold
   has `sseojuseyo`, `dowajuseyo`, `gidaryeojuseyo` and no spaced variant. Shipped joined, in the
   romanization and in the Hangul, as L2-M1 does.
6. **`sadeuseyo` is not written** (M8, brief note 1). The honorific of 살다 is 사세요; there is no
   `사드세요`. Rather than ship a form this review cannot vouch for, M8 opens only the honorific PAST
   `-(eu)syeosseoyo` and leaves the honorific present to L2-M1's `-(eu)seyo` set, which the course
   already owns. Flagged as Q30 for the native pass rather than guessed at.
7. **150,000 is `siboman`, not `simoman`** (M8, brief note 2). 십오 fuses to `sibo`, which the same
   brief sentence writes correctly two words later in `siboil`. Shipped `siboman`. The `m` in the
   brief's spelling is probably 십만 leaking in, and that word is genuinely `simman` — ㅂ before ㅁ is
   said as ㅁ, and this course writes what is said. Both spellings are in the `man` row's forms.
8. **`gwanribi` is `gwallibi`** (M8, brief note 3). 관리 is [괄리], and `courses.json`'s
   `romanizationNote` names `silla` as the model for exactly this ㄴ+ㄹ → ㄹㄹ change. Shipped
   `gwallibi`, with the mistake plate on S04 carrying the spelling-versus-sound rule.
9. **No display writes a phone number, and `gong` is not taught** (M8, brief note 2 against brief
   note 5). Reading digits one by one needs bare Sino `il` and `i`, and note 5 of the same brief
   forbids both — `il` is L1-M9's WORK and `i` is L1-M1's SUBJECT PARTICLE. This wave adds a third
   collision to that list: Sino eight is `pal`, which is now L3-M7's ARM. The digit-by-digit phone
   number therefore cannot be written under this course's romanization at all, and it belongs to a
   decision above this level rather than to a workaround here.
10. **Proper nouns DO index on en-ko** (M9, brief note 4). The note says they never do. The emitted
    fold says otherwise: `hanguk`, `kim`, `minsu` and `yuna` all have rows, and `tools/content-build.ts`
    has no proper-noun exemption in `checkShownSurfaces` — an unindexed proper noun in a display is
    counted as a finding and would push en-ko's ratchet above 12. `Chuseok` and `Seollal` therefore
    take rows of their own, as the course's other proper nouns already do.
11. **`saenggil` is `saengil`** (M9, brief note 4). 생일 is [생일]; there is no inserted ㄴ. Shipped
    `saengil`, with the row note saying the `il` is the Sino day and is written only inside the word.
12. **`saram-i` is left alone** (M9). It is one of the twelve shown-but-untaught surfaces the course
    already carries, so the crowd sentences use `saram-deul-i` throughout and this module opens no
    `saram-i` key. Fixing the surface belongs to the file that shows it, and a level never edits a
    file below it.
13. **No `-(eu)nikka` form is written** (M10, patterns and brief note 5). The note offers "M3's
    `-(eu)nikka`, or L1-M9's `-aseo`" for the reason, and with M3 outside this worktree every account
    takes the second. The pattern stays in `allowedPatterns` verbatim, because the patterns are the
    brief's and a bound is not a requirement to use it.
14. **The reported line is `gwaenchantago`** (M10, brief note 5). M5's seam names the forms that
    module writes — `gandago`, `masitdago`, `haksaeng-irago`, `gajago`, `wanyago` — and this one is
    deliberately not among them, so after the merge M10 owns a key M5 does not and no row of either
    module is left unreachable behind the other.
15. **One in-wave edit, recorded so it is not read as a backward one:** M8's `kadeu` row gained the
    form `kadeu-reul` so that M10-S08's account resolves. M6..M10 are one change; no file below L3-M6
    was opened by this wave, and nothing in L1, L2 or L3-M1..M2 was edited at all.

### The ratchet

`tools/shown-surfaces.test.ts` held at **en-ko 12**, unchanged, against 190 new keys across the five
modules — 18 in M6, 35 in M7, 63 in M8, 61 in M9 and 13 in M10. There was **no finding to fix and no
re-teach reported on any of the five runs**, which in a course where every particle is a separate
surface is the wave-1 discipline repeated rather than luck: every particle shape a display shows was
authored into the `forms` of the row that owns its host — `mok` with `mok-i` and `mok-eul`, `gamgi`
with `gamgi-e`, `wolse` with four, `eunhaeng` with `-e` and `-eseo`, `saram-deul` with three,
`yejeon` with `yejeon-e` and `yejeon-e-neun` — so the surfaces the ratchet looks for were taught in
the same row that first showed them.

Three keys in this wave are new SHAPES of older lexemes and take their own row rather than editing
the file that first taught the word, which is the law and also what keeps the count clean:
`jigeum-eun` in M9 (L2-M7's `jigeum`, whose bare key is untouched), `ipgo` in M10 (L3-M9's `ipeun`),
and `dowajusyeosseoyo` in M10 beside S05's `dowajwosseoyo`, the two halves of the register pair each
owning the key it shows.

`maxSpan` holds at **2**. The level's romanization law is why: a verb ending is never hyphenated in
this course, so `meongneun`, `mandeuldeon`, `gasseosseoyo`, `masimyeon`, `malsseumhasyeosseoyo` and
`gwaenchantago` are each one clean token, and the only multi-token surfaces these five files rely on
are L2's own `an dwaeyo`, `go isseoyo` and `geu daeum-e`.

### Open questions for the native pass

32. **The third-person feeling law** (M6, rule 0 and S02). Confirm that `Chingu-neun gippeoyo` is
    heard as an error rather than as a poetic liberty, and that `Chingu-ga gippeohaeyo` is what a
    speaker actually says about a friend in front of them.
33. **`gippeohaeyo` and `seulpeohaeyo` as everyday words** (M6-S02, S03). Confirm both are ordinary
    rather than bookish, and whether a speaker would more often reach for a describing phrase —
    `gibun-i joa boyeoyo` and its family — than for the `-a/eo haeyo` shape.
34. **`neomu` as plain very** (M6, rule 3 and S01). Confirm `neomu gippeoyo` is unmixed good news and
    carries no residue of too much, and that a learner using it for every intensifier is not marked.
35. **`-gess-` to sympathise** (M6, rule 4 and S09). Confirm `Geugeo-neun jeongmal himdeulgesseoyo`
    is the natural answer to somebody's bad news, and that the plain `himdeureoyo` there really does
    read as claiming to know how their week felt.
36. **`maeum-i apayo`** (M6-S10). Confirm it is grief rather than a medical sentence, and that the
    contrast drawn with `gibun` — today's weather against the climate — is one a speaker recognises.
37. **`mok` for a sore throat** (M7-S01). Confirm `mok-i apayo` is what you say at a pharmacy for a
    sore throat rather than for a stiff neck, and that nothing further is needed to tell them apart.
38. **The symptom verb** (M7, rule 2 and S02). Confirm `yeol-i nayo` and `gichim-i nayo` are both
    ordinary, and that there is no everyday alternative with `isseoyo` that a learner will hear and
    conclude the rule is optional.
39. **`gamgi-e geollyeosseoyo` in the past** (M7, rule 3 and S03). Confirm the past is what is said
    about a cold you still have, and that a present `geollyeoyo` is wrong rather than merely rare.
40. **`heori` against `deung`** (M7-S04). Confirm the split, and that saying `deung` of an aching
    waist is heard as a mistake rather than as a loose usage.
41. **`swiseyo`** (M7, rule 6 and S09). The wave's sharpest romanization correction. Confirm 쉬세요 is
    the only imperative of 쉬다 and that `swieuseyo` is never heard, so the rule as stated — the
    `-eu-` separates two consonants and drops after a vowel — holds without exception at this level.
42. **`apeun de`** (M7-S06). Confirm `de` cannot stand without a modifier in front of it, and that
    `apeun de` is what a doctor or a patient actually says rather than a textbook phrase.
43. **The dose counters** (M7-S07). Confirm `-beon` and `-al` are what a pharmacist uses, that
    `han beon` and `du al` are the native shapes, and that a daily frequency would ordinarily carry a
    time word this module has not opened.
44. **`-kkeseo` inside a `-yo` sentence** (M8, rule 0 and S01). Confirm that the honorific subject
    particle is at home in `-yo` speech rather than pulling `-(seu)pnida` after it, and that
    `Sajangnim-kkeseo malsseumhasyeosseoyo` is a sentence an office worker says out loud.
45. **`seongham` and `daek`** (M8-S02). Confirm both are ordinary counter words rather than very
    formal ones, and that a clerk asking a foreigner for a name reaches for `seongham` rather than
    `ireum`.
46. **`siboman` and `simman`** (M8, rule 4 and S03). Confirm both romanizations against how the
    numbers are said, and that `samsip cheon won` is genuinely not available as a way of saying
    thirty thousand.
47. **The honorific present** (M8, rule 1). The brief's example was `sadeuseyo`, which this wave did
    not ship. Confirm that the honorific present of 살다 is 사세요 and that no auxiliary 드시 attaches to
    it — and, if a module should teach `Eodi saseyo?`, whether it belongs here or in L4-M7.
48. **`gwallibi`** (M8-S04). Confirm the ㄴ+ㄹ assimilation is written the way this course writes
    `silla`, and that `gwallibi` is the word on the slip rather than a longer phrase.
49. **The date and its single particle** (M8-S10). Confirm `Samwol siboil-e` carries one `-e` on the
    day and none on the month, and that a spoken date would not add a year in front of it here.
50. **`-deon`** (M9, rule 0 and S04). Confirm `halmeoni-ga mandeuldeon tteokguk` carries the
    remembering the module claims for it, and that `mandeun tteokguk` genuinely cannot.
51. **The double past** (M9, rule 1 and S05). Confirm `gasseosseoyo` says the habit has ended rather
    than that the going was long ago, and that a speaker would use it unprompted about a place they
    have stopped visiting.
52. **`sebae` and `sebaehaneun nal`** (M9-S08). Confirm the description of the bow is accurate and
    small enough, and that `nal` with a clause in front is the ordinary way to name a day.
53. **`chukje` against `myeongjeol`** (M9-S10, rule and trap). Confirm calling Chuseok a `chukje` is
    heard as a mistake, and that `hyuil` is the right word for a plain day off.
54. **`saengil`** (M9-S09). Confirm the romanization, and that a birthday sentence with nothing
    saying whose is read as the speaker's by default.
55. **Seven sentences and no named subject** (M10-S10). Confirm an account this long holds together
    with the speaker named nowhere at all, and that a listener does not lose track by the fifth
    sentence.
56. **`gwaenchantago haesseoyo`** (M10-S03). Confirm the plain form under `-dago`, and that a friend
    reassuring you would be reported this way rather than with a quotation.
57. **The register pair** (M10-S05 and S06). The wave's load-bearing register claim. Confirm the two
    tellings differ only in `-kkeseo` and `-si-`, that both are ordinary `-yo` speech, and that the
    elder version does not in fact pull `-(seu)pnida` after it in a real conversation.
