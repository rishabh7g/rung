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
