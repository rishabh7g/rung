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
