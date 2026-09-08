# en-fr L3 — LLM review

The review that clears each en-fr L3 wave to ship, written in the same change that authors it
(`CLAUDE.md`, "Ship `verified: true` in the authoring change"). The **native-speaker gate is a
separate, stricter bar and stays unmet**: every section below ends in open questions for a native
pass, and no later wave may close one of them by rewriting a shipped module.

Open questions are numbered as a fresh en-fr L3 chain from 1. `docs/66`'s L2 chain is closed and is
not continued here.

## Wave 1 — L3-M1, L3-M2 (#476)

Authored against the briefs written by #467 and the decisions recorded in `docs/74`, and reviewed
against the REAL cumulative index rather than against the briefs' account of it: **542 surfaces
through L2-M10, `maxSpan` 4**, growing to 570 after M1 and 599 after M2. A strict `npm run build`
emits `en-fr: 22 modules (L1-M1..M10, L2-M1..M10, L3-M1..M2)` with `CONTENT 202/202 ok`. `maxSpan`
stays 4 and nothing in this wave pushed at it: the longest new key is two tokens, and the level's
span is still being held open by L2's `est-ce que`.

### L3-M1 "Your day, in detail" — the pronoun is the whole delta

The verbs of a French day are ordinary `-er` verbs a learner can already conjugate. What is new is
one small word standing in front of each of them, and rule 0 refuses to dress it up as anything
else: `je me lave`, `tu te laves`, `elle se lave`, `nous nous lavons`, `vous vous lavez`,
`ils se lavent`. **English marks almost none of these** — it just says wash, get up, go to bed — so
there is nothing in the learner's own language for the pronoun to attach to, and the drop is the
module's whole error surface. Every one of the module's reflexive traps names what the bare verb
would mean instead, which is the only argument that ever works: `je couche` puts somebody ELSE to
bed, `je réveille` wakes somebody else up, `je lève` lifts something. The pronoun is not politeness
or emphasis; without it the sentence is about another person.

The elision is the second half and it is stated as obligatory rather than as a contraction: `me`,
`te` and `se` become `m'`, `t'` and `s'` before a vowel or a silent h, written as ONE key with the
apostrophe inside it. S03's plate is `je me habille`, and its trap carries the fact that makes the
rule predictable rather than arbitrary — a silent h counts as a vowel for every rule French has, so
`habiller` behaves exactly like a word beginning with `a`.

**A frequency adverb follows the verb** and English puts it in front, so `je souvent bois` is the
word order the learner's own language hands them and the one French will not take. The module draws
the line where it actually falls rather than at "adverbs go after verbs": `d'habitude`, `parfois`
and `chaque matin` set a whole clause and open a sentence quite happily, while `souvent` and
`rarement` colour the verb and stay beside it. Two positions, one distinction, and S07's trap is
where a learner is told which words may move.

`jamais` needs its `ne`, and this is where the course's oldest law is under the most pressure. Rule
3 states both halves without flinching: the pair `ne … jamais` is the negative, and speech drops the
`ne` so thoroughly that you will hear `je mange jamais` all day long — but writing it produces
something no French text contains. Telling a learner only the written half makes the course sound
wrong the first time they hear French; telling them only the spoken half teaches them to write badly.
The one line in the level that writes `je mange jamais` is S05's own mistake plate, where the whole
point is to strike it out, and its `why` writes the `ne` straight back in.

The sequencing spine is owned outright — `d'abord`, `ensuite` and `enfin` are L2-M10's, `puis` is
L1-M10's — so the module spends nothing on connectors and everything on LENGTH. That is the real
shape of the level: L1-M4's single habitual sentences grown into an account, with every clause still
in the present.

`chaque` closes the module on a small true thing: it takes a singular noun where `tous les jours`
takes a plural, and French offers a learner two everyday idioms for one daily habit where English
offers one.

### The key the index bought without being asked

S06's row opens `l'après-midi`, one token with a hyphen in it. `surfaceIndexKeys` indexes a
hyphenated surface AND each of its hyphen parts, so that single row quietly opened three keys:
`l'après-midi`, `l'après` and **`midi`** — and `midi` now resolves, for the rest of the course, to a
row whose cue reads "the afternoon".

Nobody chose that. It is the mechanical consequence of the rule that lets an Arabic `al-qahwa` teach
`qahwa`, applied to a French compound where the parts are not equally useful. It is not a defect
here — a learner who taps `midi` in some later module gets the nearest thing the course has, and the
junk key `l'après` is harmless because nothing shows it — but it belongs in this review because it
changes what a later module may do. The module that wants to teach noon will find the key spent by
L3-M1 and must point back at it rather than open a second row, exactly as if a person had spent it
on purpose. This is the first place in the milestone where a HYPHEN, rather than a word, has
committed the course to something.

### The seam correction, and one word the level could not write

The M2 brief chartered `dois`, `peux` and `veux` as a fresh trio and named `chez` beside them. The
index says `peux` is L2-M1's, opened at S02 inside `Est-ce que tu peux m'aider`, and `veux` is
L1-M3's, opened at S01. **Only `dois` was free**, and the correction was taken literally: no row was
opened for the other two, both are still shown — `Je ne peux pas venir à la réunion` at S07 — and
the modal-plus-bare-infinitive law lives in rule 2, which names all three verbs and says which one
is new. S07's trap does the rest, telling the learner that `peux` is the word they already met
asking for help, here doing its plain "can" job.

S07 also carries a second delta the trap catches almost in passing, and it would have been lost if
`peux` had been given a row of its own: **the `ne` and `pas` wrap the MODAL, not the infinitive.**
`Je ne peux pas venir` — the negative goes round the verb that bends, and the second verb stands
outside it, bare.

`il faut` cost nothing at all, which is worth recording because the brief called it a whole surface:
the index owns bare `faut` at L2-M4 and `il` since L1, so the impersonal arrives as two tokens the
course already had and the module could spend its budget elsewhere.

The finding with the most visible consequence is the smallest one. **Bare `soir` is not a key**:
L1-M4 owns `le soir` whole and L1-M6 owns `ce soir` whole, and nothing has ever opened the bare
noun. So `chaque soir` — which the M1 pattern list would have produced without anyone noticing —
cannot be written without showing an untaught surface. The correction is recorded in the M2 seam
note although the word it constrains is M1's, and it is paid at M1-S10: **`Chaque matin je bois un
thé`**, which works because L2-M7 opened the bare `matin` while L1-M4 owns only `le matin`. One word
of one display, decided by an index fact two levels away, is the clearest argument this repo has for
checking seam notes against the emitted index rather than against a memory of what the course
taught.

### L3-M2 "Work and study" — `chez`, and an obligation with nobody in it

The bare profession is the module's first delta and the French version has a half that Italian's
does not: the article vanishes after `être` (`je suis professeur`), it comes back the moment an
adjective arrives — and **the frame changes with it**. `C'est un bon professeur`, never
`il est un bon professeur`. A learner who learns only "add the article back" produces the wrong
sentence at exactly the point they think they have understood the rule, so S01's variation ships the
`c'est` frame beside the bare noun rather than leaving it for a later module.

`chez` is the module's best word and the one with no English equivalent at all. It takes a PERSON or
an organisation and never a place-noun: `chez le médecin`, `chez moi`, `chez mon père`, `chez une
grande entreprise`. S03's trap makes the case by counting — English needs *at the doctor's*, *at my
place*, *at that company*, three phrasings where French has one word — which is also why no English
habit will ever produce it and why the plate is built on `chez un bureau`, the error a learner
actually makes once they like the word.

The modals take a bare infinitive and English carries a `to` in *have to* and *want to*; `il faut`
sits beside them as the subjectless one. That pairing is the module's cleverest bit of architecture:
S10 puts `Il faut travailler pour un bon salaire` and `Je dois travailler pour un bon salaire` on one
screen, so the difference — a general truth against an obligation with a person in it — is visible
rather than asserted. The trap names the `il` as the same empty `il` as `il y a` and `il pleut`,
which is the honest description: it stands for nobody.

Two writing-only deltas close the module, and both are placed where a writing-only delta belongs.
`études` is plural where English *study* is singular, so `je fais une étude de français` says you
are conducting a piece of research; and `travail` is the noun beside L1-M4's verb `travaille`, one
letter apart and identical in speech, which is why S02's plate writes the wrong one out. A learner
who only ever hears French will never discover either of these, which is exactly the argument for
spending a plate on them.

The last rule is the one that replaces three English rules with one: **a subject after `de` stands
bare.** `des études de français`, `une licence de musique`, `un examen de français` — where English
says a degree *in* French and an exam *in* music and changes preposition as it goes.

### Both course laws held

`docs/58` §4's law — the `ne` is WRITTEN in every display and the spoken drop is named only in prose
— holds across every display, variation and pool line in both modules, with the single deliberate
exception of S05's mistake plate. And every elided form is one key with a STRAIGHT apostrophe inside
it: `d'habitude`, `m'habille`, `t'habilles`, `s'habille`, `l'après-midi`. Neither file contains a
curly apostrophe. This is the level where both laws are most exposed, because a reflexive pronoun
meets a vowel constantly and a negative turns up in half the sentences, so holding them here is worth
more than holding them in L2 was.

### The ratchet

`tools/shown-surfaces.test.ts` held at **en-fr 20** across both modules, with **no finding at all** —
not one shown-but-untaught surface in either. The three facts that would each have produced one
(`peux`, `veux`, and the missing bare `soir`) were caught while they were still a sentence in a
brief, which is the whole purpose of correcting a seam note against the emitted index before an
authoring wave rather than after it.

### Open questions for the native pass

1. **`me réveille` against `me lève`** (M1-S02). Confirm the eyes/feet split is how a speaker uses
   the two, and that `Je me réveille tôt mais je me lève tard` is an ordinary thing to say rather
   than a teaching sentence.
2. **The frequency adverb after the verb** (M1, rule 2). Confirm `je souvent bois` is impossible, and
   that `souvent` genuinely never opens a clause in ordinary speech.
3. **`parfois` in both positions** (M1-S07). Confirm both orders are equally ordinary, and whether
   `quelquefois`, which the module never mentions, is commoner than either.
4. **The written `ne`** (M1, rule 3 and S05). The course's oldest law, leaned on hardest here.
   Confirm `je mange jamais` is universal in speech and absent from writing at every register,
   including informal messaging, where the course's claim is most likely to be out of date.
5. **`l'après-midi` with no preposition** (M1-S06). Confirm `en l'après-midi` is not French at all,
   and that the bare time expression is what a speaker says.
6. **`je me couche`** (M1-S09). Confirm the trap's claim that a bare `je couche` says you put
   somebody else to bed, and that it carries no second reading a learner would rather not produce.
7. **`chaque matin` against `tous les matins`** (M1-S10). Confirm both are everyday and
   interchangeable, and that neither is the written-only one.
8. **The bare profession and the `c'est` frame** (M2, rule 0 and S01). Confirm `il est un bon
   professeur` is genuinely wrong rather than careless, and that `c'est un bon professeur` is the
   only ordinary repair.
9. **`chez` with an indefinite organisation** (M2-S03 and rule 1). Confirm `chez un médecin` and
   `chez une entreprise` are both what a speaker says, and that `chez` never reaches a place-noun in
   any idiom a learner would meet.
10. **`patron`** (M2-S05). Confirm it is the ordinary word for the person who employs you rather
    than `chef`, that it carries no edge, and that `la patronne` is what a woman in charge is
    called.
11. **`sympa`** (M2-S04). Confirm it is safe in an office about a colleague, and confirm the
    false-friend claim — that it never means *sympathetic*, which is `compatissant`.
12. **`faire des études` against `étudier`** (M2-S08). The wave's strongest lexical claim: the trap
    says there is no verb "to study" here and that `étudier` is not what a speaker says about a
    course of study. Confirm, including what a student says about tonight's revision.
13. **`passer un examen`** (M2-S09). Confirm the sit/pass false friend, and that `réussir` is the
    verb that carries the result.
14. **`il faut` against `on doit`** (M2-S10). Confirm `il faut` plus an infinitive is what a speaker
    uses for a general truth about work, and whether `on doit` is in fact commoner in speech.

## Wave 2 — L3-M3, L3-M4, L3-M5 (#485)

Authored against the same briefs and the same `docs/74` decisions, and again reviewed against the
REAL cumulative index rather than the briefs' account of it: **599 surfaces through L3-M2**, growing
to 619 after M3, 640 after M4 and **662 after M5**. A dev build emits
`en-fr: 25 modules (L1-M1..M10, L2-M1..M10, L3-M1..M5)` with `CONTENT 209/209 ok`, and
`npm run content:shown` reports every one of the three modules `clean`, with **no re-teach either**.

`maxSpan` stays 4 and this is the wave that finally spends it. Until now the only four-token key in
the course was L1-M7's `à côté de la`; M5 adds four more — `je lui ai parlé`, `je leur ai parlé`,
`je les ai vus`, `je les ai vues` — which is exactly the span `docs/74` §3 said the object clitics
would need when it wrote that the multi-token tool is "the reason `maxSpan` is 4". The tool was
sized for this module two issues before the module existed.

### L3-M3 "Opinions with reasons" — two triggers, and the escape hatch beside them

The subjunctive opens on four cells and refuses to become a paradigm. `soit`, `ait`, `puisse` and
`aille` are authored as WORDS, each with `forms: []` except `aille`, and rule 1 says so in as many
letters: *learn these four as words, not as a paradigm*, with the mood as a system named as L4's.
That is the only way to open a mood in a ten-sentence module without the module becoming about
conjugation, and it is what `docs/58` §5 asked for.

The module's loudest rule is not the subjunctive at all. **`que` is never dropped**, and it is rule
0 because it is the error an English speaker makes in every single frame the module teaches:
`je pense que`, `je crois que`, `il faut que`. English throws *that* away so habitually that leaving
it in sounds stiff, and `Je pense c'est vrai` is the sentence the habit builds. Putting it first also
makes the subjunctive cheaper to state, because by the time rule 1 arrives the learner has already
been told there is a `que` and a second clause on the far side of it — all rule 1 has to add is that
the doubt bends the verb over there.

The escape hatch got its own sentence rather than a footnote. S05 is `Il faut que j'aille à la gare`
and S07 is `Il faut partir, il n'y a pas beaucoup de temps`, and S07's trap says the thing the brief
insisted on: **`il faut` plus an infinitive names nobody, needs no `que` and needs no subjunctive,
and it is what a speaker says whenever nobody in particular is meant.** S05's own mistake plate ends
by offering the way out — *if you would rather not, drop the `que`* — so the two halves of the
decision are on the same screen as the rule.

`même si` is the counterweight and it is placed where a counterweight belongs, three sentences after
the last subjunctive cell, with S08's trap making the argument rather than asserting the rule:
**you do not bend a verb you have just conceded.** That is a reason a learner can carry to a trigger
this module never taught, which an exception list is not.

**Two deliberate refusals are worth recording, because both were tempting.** The brief lists
`je ne suis pas sûr` among the softeners, and `je ne suis pas sûr QUE` is a third subjunctive
trigger; S09 ships the bare softener with a comma — `Je ne suis pas sûr, mais je crois que oui` —
and leaves the trigger family closed, because `docs/74` chartered exactly two. And `je dirais`, also
on the brief's softener list, is a conditionnel: it was deferred to M4 rather than pre-empting a
tense one module early. Neither refusal costs the module anything a learner needs today.

### The second hyphen the index bought without being asked

Wave 1 recorded `l'après-midi` quietly opening `midi`. `peut-être` does it again, and this time the
parts are load-bearing: `surfaceIndexKeys` indexed `peut-être`, **`peut`** and **`être`**, so a
`peut` that no row describes now resolves, for the rest of the course, to a row whose cue reads
"maybe · perhaps".

The consequence was immediate and was paid one module later. M4 needed the present of *can* for
S05's positive counterpart and **did not write it**: the variation is `Il pourrait m'aider`, not
`Il peut m'aider`, and the mistake plate is a spelling error rather than a `peux`/`pourrais`
contrast. This is the second time in two waves that a hyphen has committed the course to something
no author chose, and it is now a pattern rather than an accident: **on this course a hyphenated
surface should be assumed to spend its parts, and the seam note should say which parts.** The module
that wants to teach `il peut` will find the key spent by L3-M3 and must point back at it.

### L3-M4 "If and then" — the seam note was wrong about the apostrophe

The M4 brief charters `s'il` as a fresh key. **It is not one.** L2-M1-S06 owns it, inside
`s'il te plaît`'s `forms`, and that row's note already reads *"the `s'il` is `si` plus `il`, elided
into one token"* — the exact fact M4 was chartered to teach, sitting in the course since L2 and
pointing the right way. So M4 opened `si` alone, put `s'ils` in its `forms`, and wrote the fusion
into `si`'s note and into rule 1; no row was opened for `s'il`, and `content:shown` reports no
re-teach as a result. A learner who taps `s'il` in `S'il pleut` is shown L2-M1's note, and it is the
right note. This is the second wave running in which checking a seam sentence against the emitted
index changed what the module was allowed to write.

Three more keys the brief did not mention had to be opened, all of them the same shape — an elision
the tokenizer sees as one token where the parts are already taught. **`j'avais`** (M4-S07) is the
clearest: `avais` is L2-M10's, `j'ai`, `j'étais` and `j'allais` are all keys, and `j'avais` was
simply never written. `CLAUDE.md`'s rule covers it exactly — a new shape of an older lexeme gets its
own row in the module that first shows it, with a note back at the first-teach row — and that is how
it was authored. `pleut` (beside L2-M10's `pleuvait`), `reste` (beside L1-M6's `rester`) and `vient`
(beside L1-M10's `venir`) are the same move without the apostrophe.

The tense itself is stated once and never re-derived: **the conditionnel is the futur stem plus the
imparfait endings.** S06 is where it is visible on the page, because `parlerais` is `parler` with
L2-M10's `-ais` on the end and nothing removed, and rule 2 names the four short stems — `devr-`,
`pourr-`, `ser-`, `viendr-` — as the whole of what has to be learnt separately. Rule 3 is the payoff
`docs/58` §5 promised: **L2-M1's `je voudrais` was this tense all along**, and S10 puts `j'aimerais`
and `je voudrais` on one screen as variations of each other so the claim is visible rather than
asserted.

The counterfactual frame is single, as chartered, and the interference is stated as an ORDER rather
than as a mood: `si` takes the imparfait, the wish takes the conditionnel, and `si je viendrais` is
the English *if I would* showing through. The `si j'avais eu … j'aurais …` version is named as
L4-M3's inside rule 4 and appears nowhere in the content.

`à ta place` is indexed whole, which leaves L2-M4's bare `place` untouched, and M3's `même si`
did not spend bare `si` — confirmed against the emitted index before M4 was written, not after.

### L3-M5 "What someone said" — the clitics, and a rule the ear cannot supply

Three shapes carry the whole module and they are taught as three, because choosing between them is
the error surface: **`que` reports a statement, `si` reports a yes/no question, and a request is not
a clause at all** but `de` plus an infinitive. S04's trap says it in one line, and S03's mistake
plate is `Il m'a demandé QUE j'avais le temps` — the sentence English word order builds. `si` is
M4's key doing a second job, and M4's note was amended in this same wave so that it is true of the
reporting job too, exactly as the brief required.

The backshift opens nothing. `venait`, `pouvait` and `partais` are new cells of verbs the learner
has, sitting in L2-M10's imparfait, and rule 0 says the tense is one the learner already owns in a
second seat. English performs the same shift, so the machinery transfers and only the obligation
does not — which is why the module spends its plates on the clitics instead.

**The object clitics arrive as multi-token surfaces and the reason is stated on the row, not in a
comment.** `je l'ai vue`, `je les ai vus`, `je les connais`, `je lui ai parlé`, `je leur ai parlé` —
each its own key, each with a `forms` list that carries the contrast it exists to teach
(`je l'ai vue` / `je l'ai vu`; `je les connais` / `je le connais` / `je la connais`). `le`, `la` and
`les` stay L1-M1's articles and no row touches them, which is the collision `docs/58` predicted and
`docs/74` §3 priced. Rule 3 makes the delta the POSITION rather than the word: English puts the
object after the verb and cannot do otherwise, so `je les connais` has nothing in the learner's own
language to attach to.

The participle agreement is the wave's best-placed rule and the hardest to teach honestly, because
**every ending it turns on is silent.** `vu`, `vue`, `vus` and `vues` are one sound. Rule 5 states
the rule and then states the limit in the same breath — `j'ai vu la voiture` has the object after
the participle and takes no agreement, and neither does `je lui ai parlé`, because `lui` is
indirect — and S08's trap makes the limit the whole point: *no agreement here, and that is the limit
of the rule rather than an exception to it.* A learner who has just met `je l'ai vue` will want to
write `parlée`, and the sentence that stops them is the one that comes immediately after.

`lui` and `leur` are opened as bare rows as well as inside their verbs, because the fact worth
knowing about them is a gap rather than a form: **they do not show gender.** `Je lui ai parlé` is
*I spoke to him* or *to her* with nothing in the sentence to say which — English marks the gender and
drops the *to*, French drops the gender and keeps the *to* inside the word. S10 closes on the other
half of `leur`, which is two words spelled the same: the pronoun never takes an `s`, the possessive
does, and only what follows tells them apart.

### The seam corrections this wave made, collected

The M5 brief also names **`voulait`** as a fresh key. It is not: M4 opened it one module earlier, in
the same wave, inside `voulais`'s `forms`, and M5-S02's variation points back at it rather than
opening a second row. And **`demandé` cannot be shown without `m'a` being shown** — `m'` is L2-M5's
key, but `m'a` is a single token to the tokenizer and no module had ever written it — so `m'a` was
opened as its own row with a note back at L2-M5. `qu'il` and `qu'elle` needed the same treatment
against L1-M9's `que`. Four of the wave's corrections are the same kind of thing: an apostrophe
makes a new token out of two taught words, and a seam note written from the grammar rather than from
the emitted index will miss every one of them.

### Both course laws held

The `ne` is written in every display, every variation and every pool line across all three modules —
checked by script rather than by eye, over every line carrying `pas`, `jamais`, `rien` or
`personne` — with the deliberate exceptions living only on mistake plates (M5-S02's
`qu'elle peut pas venir`, which exists to be struck out and whose `why` writes the `ne` back in).
Every elided form is one key with a STRAIGHT apostrophe inside it: `j'aille`, `s'ils`, `j'avais`,
`j'aimerais`, `qu'il`, `qu'elle`, `m'a`, `d'attendre`, `je l'ai vue`. No file in the wave contains a
curly apostrophe.

### The ratchet

`tools/shown-surfaces.test.ts` held at **en-fr 20** across all three modules, with **no finding in
any of them** — `npm run content:shown` reports `clean` for M3, M4 and M5 and reports no re-teach
either, which is a stricter result than wave 1's and is owed to the same discipline: every seam
sentence was checked against the emitted index before the module was written, and four of them were
wrong.

One thing outside `content/` goes red on this wave and is not a content defect:
`src/course/types.test.ts` pins the module-file list at **206**, and three new files make it 209.
The list is a single shared array that every parallel authoring wave touches, so it is updated once
by whoever lands the waves rather than three times by their authors.

### Open questions for the native pass

15. **`il faut que` against `il faut` plus an infinitive** (M3-S05 and S07). The module's central
    claim is that the infinitive is what a speaker reaches for whenever nobody in particular is
    meant, and that `il faut que j'aille` is reserved for naming the person. Confirm the split, and
    confirm `il faut que j'aille à la gare` is what somebody actually says rather than `je dois
    aller à la gare`.
16. **`à mon avis`** (M3-S06). Confirm it is the everyday softener rather than a written one, and
    where `selon moi` and `je trouve que` sit beside it — the module teaches neither.
17. **`même si` with the indicative** (M3-S08 and rule 3). Confirm the subjunctive after it is
    genuinely wrong rather than merely rarer, including after a `même si` that is plainly
    hypothetical.
18. **`je crois que oui`** (M3-S09). Confirm it is an ordinary whole answer, that `je crois que non`
    is its equal, and that `crois` really is commoner than `pense` in speech as the note claims.
19. **`je ne suis pas sûr` held back from its `que`** (M3-S09). The module ships the bare softener
    and refuses the third trigger. Confirm a speaker does use it bare, with a comma, as often as the
    module implies.
20. **`peut-être` after the verb** (M3-S10). Confirm `c'est peut-être vrai` is the ordinary position,
    and say how common the fronted `peut-être que` — named in the note and never shown — really is.
21. **`ait raison`** (M3-S03). The subjunctive of `avoir raison` after `je ne pense pas que`.
    Confirm a speaker says it rather than reaching for a frame that avoids the mood.
22. **`s'il` against `si elle`** (M4-S02 and S03, rule 1). The module's loudest claim: the fusion
    reaches `il` and `ils` and stops. Confirm `s'elle` and `s'on` appear at no register at all,
    including informal messaging.
23. **`à ta place`** (M4-S06). Confirm it is the ordinary frame for *if I were you*, and how it
    compares with `si j'étais toi`, which the module never shows.
24. **`j'aimerais` against `je voudrais`** (M4-S10). Confirm they are interchangeable for declining
    an invitation, and whether either carries a register the note does not name.
25. **`ce serait`** (M4-S08). Confirm the empty `ce` is obligatory and that `il serait super` is
    wrong rather than odd.
26. **`tu devrais` and `tu pourrais` as everyday advice** (M4-S04 and S05). Confirm the conditionnel
    is what a speaker actually uses, and that `tu devrais de` — the plate's error — is a real
    learner error rather than an invented one.
27. **`demandé` as a false friend** (M5-S03). Confirm it never carries the force of English
    *demanded*, and that `exigé`, named in the note and never taught, is the word that does.
28. **The obligatory backshift** (M5-S01 and rule 0). Confirm `il a dit qu'il vient` is genuinely
    not written, and say whether speech tolerates it when the arrangement still stands — this is the
    claim most likely to be stricter on the page than in the ear.
29. **A reported request with `de`** (M5-S05). Confirm `il m'a dit d'attendre` is the ordinary shape,
    and whether `de` is ever dropped in speech the way English drops *that*.
30. **The participle agreement in practice** (M5-S06, S07 and rule 5). The wave's strongest
    writing-only claim. Confirm educated writing still observes it after a preceding direct object,
    and say plainly whether it is fading — the course teaches it as a rule and a learner deserves to
    know if it is one that natives themselves miss.
31. **`connais` for people** (M5-S09). Confirm the note's claim that the verb is for people and
    places rather than facts, and that `je les connais bien, ce sont mes amis` is how somebody
    vouches for a person.
32. **`leur` invariable as a pronoun** (M5-S10). Confirm `je leurs ai parlé` is an error natives
    make on the page, and that the pronoun/possessive split is the way to teach the two.

## Wave 3 — L3-M6..M10 (#553)

The wave that closes the level. Authored against the same briefs and the same `docs/74` decisions,
and again reviewed against the REAL cumulative index rather than the briefs' account of it:
**662 surfaces through L3-M5**, growing to 687 after M6, 710 after M7, 734 after M8, 759 after M9
and **783 after M10**. The five deltas are 25, 23, 24, 25 and 24 — every one inside the briefs'
`newWordCap: 25`, and the level ends with 783 surfaces against L2's 542. A strict build
(no flags) emits `en-fr: 30 modules (L1-M1..M10, L2-M1..M10, L3-M1..M10)` with `CONTENT 214/214 ok`,
and `npm run content:shown` reports all five modules `clean` — no shown-but-untaught, no collision,
and, after one row was dropped, no re-teach either.

`maxSpan` stays 4 and this wave does not spend it: the longest new keys are three tokens
(`j'ai envie de`, `j'ai besoin de`, `à la fin`). What this wave spends instead is the *elision*
budget, and that is where almost every seam correction below comes from.

### L3-M6 "Feelings in depth" — the -é / -ant pair, and four feelings French HAS

The module's spine is rule 0, and it is authored as a meaning difference rather than a style one:
`je suis ennuyé` against `c'est ennuyeux`, `je suis fatigué` against `c'est fatigant`,
`je suis intéressé` against `c'est intéressant`. S02 puts both halves of one pair in a single
display — `Ce film est ennuyeux, et je suis ennuyé` — because the pair is only visible side by side,
and S03 does the same for `fatigant`. Both mistake plates are the sentence a learner actually says:
`Je suis ennuyeux` (you are boring company) and `Je suis fatigant` (you exhaust other people).

Four have-feelings get four sentences and four whole keys — `j'ai peur`, `j'ai envie de`,
`j'ai hâte`, `j'ai honte` — each indexed whole so that L2-M5's bare `me` and L1-M5's `j'ai` keep
their rows, exactly as the brief asked. `j'ai envie de` carries its `de` inside the key because the
`de` is compulsory; `j'ai peur` and `j'ai honte` do not, because nothing follows them obligatorily.

The `ça me` frame is three keys rather than one — `ça m'énerve`, `ça me plaît`, `ça m'inquiète` —
for a reason recorded below. Rule 4 is the agreement rule and it is authored around the split the
brief named: `inquiet / inquiète` and `fier / fière` are HEARD, `déçu / déçue`, `fâché / fâchée` and
`gêné / gênée` are not, and S10's two variations differ by two silent `-e` endings and nothing else.

### The M6 seam was wrong about three keys the index already owned

The M6 brief's INDEX SEAM says *"content, triste and fatigué stay L1's rows and this module adds
their feminines as forms on those rows."* Both halves fail. **The feminines are already there**:
`fatiguée` is L1-M2's and `contente` is L1-M9's, on the emitted index, so adding them here would
have been a re-teach of a key an L1 module already owns. And a module may not edit a file below it
in any case, so "adds their feminines as forms on those rows" was never an available move. The
module writes neither row; `fatiguée` appears in S01's display and resolves to L1-M2's note, which
is the correct outcome.

The same seam names **`ça me`** as a fresh key. It cannot do any work as one. `Ça m'énerve` tokenizes
as `ça` + `m'énerve`, so a two-token key `ça me` never matches it, and in `ça me plaît` a `ça me`
key would leave `plaît` unresolved. The three frames are therefore indexed whole, which is what the
seam's own principle — *frames whole so bare `me` stays L2-M5's* — actually requires. This is the
elision problem the wave hit five more times.

### L3-M7 "Body and health" — a contraction the index had already paid for

The M7 brief's INDEX SEAM lists **`au`, `aux`, `dos` and `médecin`** as fresh keys. None of them is:
`au` is L1-M7's, `aux` is L2-M8's, `dos` is L2-M8's and `médecin` is L3-M2's. The correction changes
what the module IS. The brief said the contraction "is the module's first rule and its first plate",
and that is still true — but it is a rule and a trap here, never a row, because writing a row for
`au` would put an unreachable note behind a key L1-M7 owns. Rule 0 says so in as many letters:
*both words are already on the ladder — what is new here is the reason, not the word.* S02's mistake
plate (`J'ai mal à le dos`) and S03's (`J'ai mal à les dents`) carry the plate the brief wanted.

`depuis` is the module's cleanest delta and gets two rules rather than one, because it carries two
separate facts: one word for both of English's (`depuis lundi` / `depuis trois jours`), and the
PRESENT tense behind it. The mistake plates on S01 and S06 are both the tense, not the word —
`J'ai eu mal à la tête depuis ce matin` and `J'ai été malade depuis trois jours` — because that is
the half an English speaker gets wrong after they have learnt the word.

The three-article symptom list is authored exactly as note 4 asked, in three neighbouring sentences:
`j'ai de la fièvre` (S04), `j'ai un rhume` and `j'ai la grippe` (S05), with L2-M5's negated partitive
governing `je n'ai pas de fièvre` and NOT governing `je n'ai pas la grippe`. S05's trap says the
quiet part out loud: no rule of the learner's picks these, the noun carries its own.

### L3-M8 "Money and paperwork" — where the elision broke the seam's plan

The M8 brief's INDEX SEAM asks for **`on paie` and `on signe` as whole keys**, "so L2-M6's bare `on`
keeps its row". Authored that way the module cannot ask its own headline question. `Où est-ce qu'on
signe ?` tokenizes as `où` + `est-ce` + `qu'on` + `signe`: the `on` has fused with `que` and there is
no `on signe` span left to match. The module therefore teaches **`payer` with forms
`["payer", "paie"]`** and **`signer` with forms `["signer", "signe"]`**, and leaves `on` alone —
which reaches the seam's actual goal (bare `on` still resolves to L2-M6) by a route the fold can
follow. The affirmative `Ici on paie en espèces` and the interrogative `Où est-ce qu'on signe ?` both
resolve, which no whole-key pair could have managed.

Two more corrections on the same note. **`il faut` is not a key** — `faut` is L2-M4's and `il` is
L1-M1's, so `il faut` resolves as two tokens and needs no row; the brief's "il faut stays L2-M4's"
is true in spirit and the phrase was never indexed. And **`pourriez-vous` is not taught anywhere**,
contrary to note 3's claim that it is "M4's conditional" — M4 opened `pourrais` and `voudrais`, not
the `vous` form. The module simply does not use it: `est-ce que`, `excusez-moi` and `je voudrais`
carry every request, which is what note 3 wanted from the frame list it got right.

`est-ce qu'on` is opened here as one key, with its note pointing back at L2-M1's `est-ce que`, and it
is the only place in the module where a question word changes shape. M9's brief claims `qu'on` for
itself and gets it: the two keys are different folds and neither shadows the other.

### L3-M9 "Festivals and everyday culture" — qui and que, and a date that is just a number

The relative pair is rule 0 and it is authored against the wrong English question rather than the
right French one: *English chooses between who and which by whether the thing is a person, which is
no help at all here.* S01 gives `qui` its subject job (`une fête qui dure cinq jours`), S02 gives
`que` its object job (`les gens que j'aime`), and S02's first variation puts the two in one line —
`Les gens qui sont ici sont mes amis` — so the split is visible without a second module.

`que` itself gets **no row**. It is L1-M9's key, and a row here would put the module's third note
behind a note the learner will never reach; the fact lives in rule 0 and rule 1 instead, which are
always shown. `qui` is fresh and gets its row; `qu'on` is fresh and gets its own, with the elision
inside the key exactly as the seam asked. Rule 1 is the half that costs marks: `que` elides, `qui`
never does, whatever follows it.

Two seam corrections here. **`premier` is L2-M4's**, not fresh — so the ordinal rule (rule 4) names
it and points back rather than opening a row, and S07's mistake plate (`le un mai`) does the
teaching. And **`Nouvel An` needed no key at all on the index's own terms**: `nouvel` is L2-M3's and
`an` is L1-M9's, so `le Nouvel An` already resolved token by token. It is opened as a two-token key
anyway, deliberately — New Year's Day is not derivable from *new* plus *year*, and the note carries
the capitalisation split that rule 5 states — and that is a judgement, not a correction, so it is
recorded as one.

The month names are the wave's one honest vocabulary spend: five of the twelve (`janvier`, `mai`,
`juillet`, `août`, `décembre`) rather than all of them, chosen for the dates the module actually
writes. The days were already L2-M6's, so `le dimanche` is opened as a two-token key for the habit
reading and the bare day is left where it is.

### L3-M10 "Your own story" — eight sentences, and the tense that cannot be heard

Each item is an account of six sentences, per note 1, with the per-sentence bound applied inside it.
The connectors are the whole declared spend — `pendant que`, `à la fin`, `au début`, `dès que` — and
everything else in the ten accounts is a re-use, which is the point of the module.

Rule 1 is the level's sharpest pair and S01 is authored as note 3 asked, as a minimal pair against
two steps in a row: `Pendant que j'attendais, mon frère est arrivé` beside
`J'attendais, et puis mon frère est arrivé`. Rule 2 separates the three connectors a learner blurs —
`quand`, `dès que` and `pendant que` — and S02's mistake plate is exactly that blur
(`Pendant que je l'ai vu, je suis parti`).

The auxiliary law is tested at length, as note 4 required: `elle est venue` and `ma sœur est venue`
agree with their subject, `je suis tombé` agrees, `j'ai téléphoné` and `j'ai signé` agree with
nothing, and `je l'ai cherché` agrees with the object in front of it. Every one of those agreements
is silent, which is the point of S05's trap and S10's — `était` and `étaient` are one sound and two
spellings, and an eight-sentence account is the only place a learner is forced to choose.

**`c'était` was not taught.** The M10 brief says it "stays L2-M10's separate key"; the emitted index
has `était` (L2-M10) but not `c'était`, which is one token to the tokenizer and had never been
written. It is opened here as its own row, with its note pointing back at L2-M10 — the sixth
apostrophe-made-a-new-token correction of this level, after wave 2's four and M8's `est-ce qu'on`.
The same fold explains three more of this module's rows: `l'ai`, `n'était` and `j'attendais` are all
new tokens made out of taught words.

One row was dropped after the check reported it: **`travaillais` is L2-M10's**, so the row's note
would have been unreachable. The account keeps the word — S05's display needs it — and the learner
is shown L2-M10's note, which says the same thing.

### The seam corrections this wave made, collected

| Brief | Claim | What the emitted index said |
| --- | --- | --- |
| M6 note 5 | `fatiguée`, `contente` to be added as forms on L1's rows | Both already owned — `fatiguée` L1-M2, `contente` L1-M9. No row written, and a level may not edit L1 anyway |
| M6 note 5 | `ça me` a fresh key | Cannot match `ça m'énerve` (one token, `m'énerve`) and leaves `plaît` bare. Three whole frames instead |
| M7 note 5 | `au`, `aux`, `dos`, `médecin` fresh | `au` L1-M7, `aux` L2-M8, `dos` L2-M8, `médecin` L3-M2. The contraction became a rule and two mistake plates, never a row |
| M8 note 5 | `on paie`, `on signe` as whole keys | Broken by `est-ce qu'on signe`. `payer` and `signer` carry their 3sg in `forms` instead; bare `on` still L2-M6's |
| M8 note 3 | `pourriez-vous` is "M4's conditional" | Not taught anywhere. M4 opened `pourrais` and `voudrais`. The module uses neither |
| M8 note 5 | `il faut` stays L2-M4's | Never a key at all: `il` + `faut`, two taught tokens |
| M9 note 5 | `premier` fresh | L2-M4's. Named in rule 4 and in S07's mistake plate, no row |
| M9 note 5 | `Nouvel An` fresh | Its parts were already taught (`nouvel` L2-M3, `an` L1-M9). Opened as a key anyway, deliberately — the meaning is not the sum |
| M10 note 5 | `c'était` stays L2-M10's | `était` is L2-M10's; `c'était` is a different token and was untaught. Opened here |
| M10 note 1 | the participles the accounts need | `travaillais` is L2-M10's — the row was written, the check reported it, and it was dropped |

Nine of the ten are the same class of thing, and six of those nine are the apostrophe: a fold makes
one token out of two taught words, and a seam note written from the grammar rather than from the
emitted index will miss every one. Wave 2 said this after four of them; wave 3 hit six more.

### Both course laws held

The `ne` is written in every display, every variation and every pool line across all five modules —
checked by script over every line carrying `pas`, `jamais`, `rien`, `personne` or `plus`, with zero
findings — and the spoken drop is named only in prose and on mistake plates that exist to be struck
out (`Je suis déçu, mais je suis pas fâché` in M6-S10, `On peut pas payer ici` in M8-S02, both of
whose `why` writes the `ne` back in). Every elided form is one key with a STRAIGHT apostrophe inside
it: `j'ai peur`, `j'ai envie de`, `ça m'énerve`, `ça m'inquiète`, `est-ce qu'on`, `qu'on`,
`pièce d'identité`, `l'échéance`, `c'était`, `l'ai`, `n'était`, `j'attendais`. No file in the wave
contains a curly apostrophe, checked by script over the raw bytes of all five files.

### The ratchet

`tools/shown-surfaces.test.ts` held at **en-fr 20** across all five modules — `11 passed (11)` — and
`npm run content:shown` reports `clean` for M6, M7, M8, M9 and M10 with **no shown-but-untaught, no
collision inside any module, and no re-teach**. The one re-teach the check did find (`travaillais`,
M10-S05) was removed in the same pass rather than argued for, which is the stricter of the two
options the check leaves open. No baseline was lowered and none was raised.

Two things outside `content/` are expected to be red on this wave and are not content defects.
`src/course/types.test.ts` pins the module-file list, and five new files move it again; the list is
a single shared array that every parallel authoring wave touches, so it is updated once by whoever
lands the waves. And `content/en-fr/levels.json` still carries `hasContent: false` for L3-M6..M10 —
also a single shared file, also landed once.

### Open questions for the native pass

33. **`je me sens` against a bare adjective** (M6-S01 and rule 1). Confirm `je me sens fatiguée` is
    what a speaker says rather than `je suis fatiguée`, and that the trap's claim holds — that
    `je sens fatiguée`, without the pronoun, really is heard as *I smell tired* rather than simply
    as a slip.
34. **`ennuyé` for bored** (M6-S02). The module's central lexical claim. Confirm `je suis ennuyé` is
    the ordinary way to say you are bored, and not chiefly *annoyed* or *bothered* — several
    reference works give both readings and the module teaches only one.
35. **`j'ai hâte` without `de`** (M6-S06). Confirm `j'ai hâte` stands alone in a message, and that
    `j'ai hâte de te voir` is the everyday closing rather than a written formula.
36. **`honte` against `gêné`** (M6-S07). Confirm the weight claim: that `j'ai honte` is too strong
    for a small social awkwardness and that `gêné` is what a speaker reaches for there.
37. **`ça me plaît` against `j'aime`** (M6-S09). Confirm both are ordinary about the same thing, and
    whether `ça me plaît` carries any distance or hedging that the module does not name.
38. **`avoir mal à` with a possessive** (M7-S01 and rule 1). Confirm `j'ai mal à ma tête` is
    genuinely not said, in any register, rather than merely marked.
39. **`depuis` with the present** (M7, rules 2 and 3). Confirm `j'ai eu mal depuis trois jours` is
    wrong rather than a different meaning, and that the present is obligatory whenever the state
    continues.
40. **The three symptom articles** (M7-S04, S05 and rule 4). Confirm `j'ai une fièvre` is not said,
    that `j'ai la grippe` keeps its article under the negative, and that `j'ai un rhume` never takes
    the partitive.
41. **`vous avez quelque chose contre …`** (M7-S07). Confirm this is what is actually said at a
    French pharmacy counter, and that `pour` in the same frame would be understood but marked.
42. **`avoir rendez-vous` with no article** (M7-S10). Confirm the article really is dropped in the
    bare statement, and when `un rendez-vous` comes back.
43. **Impersonal `on` on a notice** (M8-S01, S02 and rule 0). Confirm `ici on paie en espèces` is
    how a till sign reads, and that `nous payons` would be heard as a different, narrower claim.
44. **`reçu` against `facture`** (M8-S07 and rule 6). The wave's strongest lexical claim: that one
    proves payment and the other requests it, with no overlap. Confirm, including what a shop till
    hands you (`ticket`?) and what a tradesman sends.
45. **`échéance`** (M8-S09). Confirm it is the everyday word printed on a bill rather than an
    administrative one, and that a speaker uses it in conversation about a deadline.
46. **`faire un virement`** (M8-S08). Confirm the collocation, and that `envoyer un virement` is
    wrong rather than simply rarer.
47. **`pièce d'identité` as an unbreakable phrase** (M8-S10). Confirm the phrase never contracts in
    speech, and what a counter actually says when asking for it.
48. **`qui` and `que` by grammatical role** (M9, rules 0 and 1). Confirm the rule as stated is
    complete for everything a learner at this level will write, and that no ordinary sentence needs
    `dont` where the module offers `que`.
49. **`le dimanche` against `dimanche`** (M9-S09 and rule 2). Confirm the habit reading is carried by
    the article alone and that context never overrides it in speech.
50. **`en famille`** (M9-S04). Confirm the phrase takes no article and no possessive, and that
    `avec ma famille` really is the narrower thing the trap claims.
51. **`offrir` against `donner` for a present** (M9-S05). Confirm `on donne des cadeaux` is marked
    rather than merely plainer.
52. **The date with no `de` and no ordinal** (M9-S06, S07 and rule 4). Confirm `le quatorze juillet`
    and `le premier mai` are the only shapes, and that no spoken variant restores the `de`.
53. **`pendant que` with the imparfait** (M10-S01 and rule 1). The level's exit claim. Confirm
    `pendant que j'ai attendu` is impossible rather than merely odd, and that the pair really does
    change *what happened* rather than only how it sounds.
54. **`dès que` in the past** (M10-S02, S04 and rule 2). Confirm `dès que` takes the passé composé
    for a completed step, and whether a speaker would ever use the imparfait behind it.
55. **`tout le monde` with a singular verb** (M10-S06). Confirm `tout le monde sont partis` is an
    error natives never make in writing, and whether it is heard in speech.
56. **`ce n'était pas grave`** (M10-S09). Confirm this is how an account closes, and that the
    present-tense `ce n'est pas grave` is the same phrase doing a different job rather than a
    different phrase.
57. **The six-sentence account as a unit** (M10, all items). The wave's structural claim: that these
    read like a person talking rather than like ten exercises. This one needs a speaker to read all
    ten aloud and say which of them nobody would ever say.
