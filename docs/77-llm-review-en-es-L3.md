# en-es L3 — LLM review

The review that clears each en-es L3 wave to ship, written in the same change that authors it
(`CLAUDE.md`, "Ship `verified: true` in the authoring change"). The **native-speaker gate is a
separate, stricter bar and stays unmet**: every section below ends in open questions for a native
pass, and no later wave may close one of them by rewriting a shipped module.

Open questions are numbered as a fresh en-es L3 chain from 1.

## Wave 1 — L3-M1, L3-M2 (#471)

Authored against the briefs written by #462 and the decisions recorded in `docs/69`. The level opens
on the real cumulative index through L2-M10 — **477 surfaces, maxSpan 3** — and a strict
`npm run build` now emits `en-es: 22 modules (L1-M1..M10, L2-M1..M10, L3-M1..M2)`, with
`CONTENT 202/202 ok` across all nine courses.

### L3-M1 "Your day, in detail" — the habit is a verb, and Spanish had the adverb all along

The module's grammar is `soler` + infinitive, and what makes it worth the level's opening slot is
not that Spanish has a word English lacks — it is that Spanish has BOTH and prefers the one English
does not have. `normalmente` exists, reads exactly as English reads it, and sits exactly where
English puts it. The module teaches it in S03 and tags it `free` precisely so a learner can see the
choice being made over their shoulder: the adverb is available, costs nothing, and a speaker still
reaches for `suelo`. That is why S01's mistake plate is `Usualmente me levanto temprano` and its
`why` is one sentence long — *the word exists and no one says it*. A plate that called it
ungrammatical would be lying, and a learner who later hears `usualmente` would stop trusting the
course.

The second half of the same lesson is the pronoun, and the module states it as a rule about SHAPE
rather than about meaning: **the reflexive rides the end of an infinitive and stands in front of a
conjugated verb.** S02 is the minimal pair and it is one sentence — `Suelo ducharme temprano, pero
hoy me ducho tarde` — two orders of the same two pieces, with nothing changed but whether the verb
is conjugated. That is a cheaper way to teach it than any table, and the mistake plate (`Suelo me
ducho temprano`) is the error the pair is built to pre-empt.

The vocabulary spend is four reflexive routine verbs beside L1-M4's `me levanto`, and each of them
happens to break a stem vowel: `me despierto` (e → ie), `me acuesto` (o → ue), `me visto` (e → i).
The module does not present that as a paradigm, because the breaking is conditioned by stress and
the infinitives in the very same sentences show the stress moving off and the vowel healing —
`acostarme` beside `me acuesto`. S04's mistake plate is `Me acosto`, which is the form a learner
builds by analogy with every regular `-o` ending they have, and its `why` names the stress rather
than listing the verb as irregular.

`nunca` is the module's `interference` rule and it is one of the few Spanish facts with a clean
statement: **in front of the verb it stands alone; behind it the sentence must also carry `no`.**
S07 ships both orders in one item with the same meaning, so the learner watches the `no` arrive
because the word MOVED and not because anything was denied twice. English forbids exactly that
sentence, which is why the mistake plate is `Como carne nunca` — the shape an English speaker builds
on the first try.

Two smaller decisions are worth recording because each spends an index key deliberately. `a veces`
is indexed WHOLE, the multi-token tool of `docs/69` §3: bare `vez` has no row anywhere on the ladder
and `a` is L1-M4's forever, so a `vez` row would mint a note nobody would ever be shown. The plate
`A vez me visto` teaches the fixedness rather than the plural. And `casi` gets a row of its own
whose whole content is that **it cannot stand alone** — `Casi estudio por la noche` says the studying
nearly happened, which is a real error with a funny reading and the best argument the row could make
for itself.

S10 opens nothing at all, and the module says so in its own trap. Three reflexives, two sequencers
bought two levels ago, and not one new word: the level's job is length, and the last item is where
the learner is shown that a paragraph is recombination rather than more vocabulary.

Register is `neutral` throughout except S09, which is the `tú` question and chips `informal`, with
the `usted` version in its variations — `docs/69` §1's chip rule applied without amendment.

### L3-M2 "Work and study" — `por` against `para`, paid where it bites

`docs/53` §4 deferred the `por`/`para` system out of L2 for this module, and the deferral is what
makes the module affordable: **`para` is not a new word here.** L2-M5 bought it for a recipient
(`para mí`, `para ti`), so the module opens the bare `por` row and lets `para` do the rest of its job
from the rules and from the sentences, with S02's variation (`Es para mi jefe`) putting it back on
L2-M5's seat inside the same item. Nothing about the first use stops being true, which is rule 1 and
which is also the reason no second `para` row exists.

Bare `por` was checked against the emitted index rather than assumed: it is genuinely unowned at the
end of L2, because `por la mañana`, `por favor` and `por qué` were all indexed WHOLE. That is what
makes this row possible at all, and it is also what constrains its note — the note has to be true of
all three phrases without editing any of them, and S03's trap says exactly that: the `por` inside
`por la mañana` is this `por`, doing the stretch-of-time job.

The law is stated as what each word DOES rather than as a translation, because both are "for":
**`para` points forward — a purpose, a destination, a recipient, a deadline; `por` points at what is
behind or around the action — a cause, an exchange, a stretch, a route.** S01 puts both on the same
verb in two sentences (`Trabajo para una empresa. Trabajo por el sueldo.`), which is the pair the
brief asked for, and S02 stacks three `para` jobs — purpose, deadline, recipient — in two lines.

`saber` against `conocer` is the second delta and it costs one sentence to state. The index detail
that had to be got right: **`sé` is a distinct key from L2-M4's `se`**, because accents are letters
under L1-M2's law, and the two sit one keystroke apart. S04's row says so in its own note, which is
the record — a learner who reads `sé` as a typo for the `se` they already know has mis-parsed the
sentence and will not find out from anywhere else. The pair is authored so both halves of `saber`
appear in one breath (`Sé hablar español, pero no sé dónde está el jefe`), because the skill reading
is the one English hides behind "can" and the fact reading is the one it does not.

The personal `a` rides in with `conocer` and the module treats it as the mark it actually is:
**it translates to nothing, so English never prompts for it.** S05 carries the minimal pair inside
one sentence — `Conozco a mi jefe, pero no conozco la empresa` — a person, then a thing, with the `a`
appearing and vanishing across one `pero`.

The three obligation frames differ by **who is obliged**, and the module is honest about the trap it
creates by teaching them together: `tengo que` and `hay que` both need the `que`, `debo` takes the
infinitive bare, and a learner who has just drilled the first two will write `debo que hablar`. That
is S08's mistake plate, and it is a defect the module introduces and then closes rather than one it
inherits.

The rest is work vocabulary with one false friend doing real work: **`carrera` is the degree, not
the career**, and S10's mistake plate is the sentence an English speaker builds without noticing
(`Tengo una carrera en una empresa`). `reunión`/`reuniones` and `examen`/`exámenes` are each given a
one-line note about the accent mark moving because the stress does NOT — the same fact twice, in
opposite directions, which is the cheapest way to make the orthography look like a rule instead of a
decoration. And S09's trap is L1-M2's `ser`/`estar` law surfacing a level later: an event that
happens at a time takes `es`, and `está` would be asking where the meeting is standing.

### A prompt that offered fifteen words where the learner has met 477

The wave's most consequential finding is not in the content. `npm run content:prompt -- en-es L3-M1`
was rendering its "Allowed vocabulary (cumulative through L2-M10)" header over a list of FIFTEEN
surfaces — `al final · algo · comimos · dije · dijo …`, which is L2-M10's own delta and nothing else.

The cause is a #424 regression. When index files became deltas, each file's `surfaces` was narrowed
to what that module is the first to teach while `surfaceCount` and `maxSpan` stayed cumulative; every
reader had to start folding, and `tools/generate-prompt.ts` did not. It kept reading
`Object.keys(index.surfaces)`, so the header promised the whole ladder and the list underneath it
was one rung.

This is worth recording in a content review because of how quietly it would have failed. An author
who trusted the prompt would have written L3-M1 out of L2-M10's leftovers, and **nothing downstream
would have complained**: `checkComprehensionPool` folds correctly, the shown-surface ratchet folds
correctly, and the result would have been valid, buildable, and a tenth of the course it should have
been. The fix is `foldIndex` in `tools/generate-prompt.ts`, folding exactly as the runtime resolver
does, with `surfaceCount` as the check that the fold is complete — and it is pinned by
`tools/generate-prompt.test.ts`, as a unit test on the arithmetic rather than a snapshot of a
rendered prompt, because the defect was never in the words.

### The third person this course does not have yet

A constraint the next waves inherit, found while authoring S08 and worth stating once: **no
third-person present `-a` cell is taught anywhere through L2.** `come`, `trabaja`, `estudia`,
`habla` and `vive` are all absent from the 477. The course owns third persons only where an
irregular or a fused form bought one — `es`, `está`, `hay`, `tiene`, `puede`, `gusta`, `duele`,
`parece` — so any line about somebody else's routine has to run through `suele` + infinitive or one
of those.

That is not a defect; it is why `suele` earns two of this module's ten items (S08, and the `usted`
variation in S09). But it means an M6–M10 author who wants `mi hermana trabaja en un banco` is
opening a paradigm, not borrowing a word, and the brief for whichever module takes it should say so
before the sentence is written.

### The ratchet

`tools/shown-surfaces.test.ts` held at **en-es 10** across both modules, with **no finding at all** —
the first wave in the milestone to produce none. Every surface either had a row in the module that
showed it or was already owned upstream, checked against the fold rather than against the brief:
`médico`, `carne`, `cine`, `banco`, `estación`, `problema`, `rápido` and `larga` are all L2's,
and the whole sequencing spine (`primero`, `luego`, `después`, `entonces`, `al final`) was bought
across L1-M6, L1-M10, L2-M4, L2-M7 and L2-M10.

### Open questions for the native pass

1. **`soler` against the adverb** (M1, rule 0 and S01). The wave's strongest claim about ordinary
   speech. Confirm a speaker describing a routine reaches for `suelo` rather than `normalmente`, and
   that `Usualmente me levanto temprano` is understood-but-unsaid rather than simply wrong.
2. **One `suelo` over two infinitives** (M1-S01). Confirm `Suelo levantarme temprano y trabajar en
   casa` is what a speaker says, rather than repeating the verb for the second habit.
3. **`¿Sueles comer en casa o en el trabajo?`** (M1-S09). Confirm the question is ordinary between
   colleagues, and that the plate `¿Comes normalmente en casa?` really does read as translated.
4. **Both `nunca` orders** (M1-S07). Confirm `Nunca como carne` and `No como carne nunca` mean the
   same thing, and that the second is slightly more emphatic rather than differently emphatic.
5. **`casi nunca` with no verb behind it** (M1-S06). Confirm the fragment `Casi nunca por la noche`
   after a full first sentence is ordinary speech and not clipped.
6. **The bare second `a veces`** (M1-S05). Confirm `A veces me visto antes de comer, a veces después`
   drops the repeated clause the way the module claims.
7. **`despertarse` against `levantarse`** (M1-S03). Confirm the two verbs split where the module says
   English splits them, and that a speaker really does use both about one morning.
8. **`acostarse`** (M1-S04). Confirm it is the move to bed rather than the sleeping, and that
   `Siempre me acuesto muy tarde` is what someone says about themselves without sounding literary.
9. **`trabajo por una empresa`** (M2-S01). Confirm the plate's reading — working on the company's
   behalf, or in its place — is what a listener actually hears, rather than just an odd `por`.
10. **`empresa` against `compañía`, and `sueldo`** (M2-S01). Confirm `empresa` is the everyday word
    for a firm of any size, that `compañía` reads as a translation of the English, and that asking
    after someone's `sueldo` is as blunt in Spanish as the note claims.
11. **`debo` in speech** (M2-S08). Confirm the three-frame split is real — that `debo` carries a duty
    from inside and is the most formal of the three — or whether `tengo que` has simply swallowed it
    in ordinary conversation.
12. **`hay que` against `tienes que`** (M2-S07). Confirm `Aquí tienes que trabajar mucho` really does
    land as an instruction to one listener, so that the impersonal frame is doing necessary work.
13. **`conozco mi jefe`** (M2-S05). The module calls the missing personal `a` "the single most
    audible mark of an English speaker". Confirm that is fair, and that a listener notices it
    immediately rather than repairing it silently.

## Wave 2 — L3-M3, L3-M4, L3-M5 (#480)

Authored against the same briefs, on the real cumulative index the previous wave left behind —
**505 surfaces through L3-M2, maxSpan 3** — and each module authored against a prompt regenerated
after the one before it shipped, so the vocabulary offered was the ladder as it actually stood. A
strict `npm run content:build` now emits `en-es: 25 modules (L1-M1..M10, L2-M1..M10, L3-M1..M5)`,
with `CONTENT 209/209 ok` across all nine courses.

### L3-M3 "Opinions with reasons" — one trigger, four cells, and nothing else of the mood

The subjunctive opens here and the module's whole claim is that it can be opened on **one contrast a
learner cannot miss**: `creo que` takes the indicative, `no creo que` takes the subjunctive. S01 is
that pair with the SAME adjective on both sides — `Creo que es fácil. No creo que sea fácil.` — so
nothing varies across the full stop except the mood, and the English cue is deliberately the same
sentence twice with a `not` in it. That is the delta stated as cheaply as it can be stated: English
keeps one shape for both and Spanish does not, and no other word in the sentence warns you.

Four cells, and the module says out loud that four is the whole of it: `sea`, `tenga`, `pueda`,
`vaya`. Rule 1 gives them the only generalisation that is both true and affordable — **the
subjunctive is built off the `yo` form of the indicative** (`tengo` → `tenga`, `puedo` → `pueda`),
which is where `tenga`'s `g` comes from — and then names `sea` and `vaya` as the two that have to be
learnt whole. S04's trap is exactly that: `voy` gives nothing away, which is why `vaya` sits beside
`vamos` in one breath. A second fact each row repeats because it is the one that unsettles a reader:
**one cell covers `yo` and `él`/`ella` both**, so `no creo que sea fácil` takes its subject from the
conversation rather than from the verb.

S02 puts `cree que` and `no creo que` in one item, which is the module's answer to the question a
learner asks next: somebody else's belief is still a belief and keeps the indicative. **Only the
negation flips the mood.** And S03 is where the module closes the defect it has just opened —
`me parece que` is a positive frame and takes the indicative, so its mistake plate
(`Me parece que sea interesante`) is an over-correction of the module's own rule rather than an
English habit. That is the same shape as L3-M2's `debo que hablar`: a trap the module introduces and
then pays for.

`tan … como` is the wave's clearest index payment. `docs/69` §3 held it out of L2 because bare
`como` is L1-M4's "I eat", and the row is authored exactly as the seam asked: **`tan` carries the
row**, its note says the `como` that closes the frame is not the verb, and the `forms` list carries
the three multi-token surfaces the sentences and variations actually write (`tan difícil como`,
`tan fácil como`, `tan caro como`), so the longest-match walk resolves the whole phrase to this row
rather than dropping a learner onto a verb. Bare `tan` stays a key too, because S09 writes
`tan fácil` with no `como` behind it. S05's mistake plate is `tan difícil que`, which is what
English's "than" pulls in and which belongs to L2-M9's `más`/`menos` instead.

`estoy de acuerdo` is tagged `interference` rather than `delta` on purpose: English has a VERB where
Spanish has a place you stand in, so the plate is `Soy de acuerdo` and the note says agreement is a
position rather than something you do. `de acuerdo` is indexed alongside it because the clipped form
is the everyday one. `depende` earns its `interference` tag from one preposition — **`depende de`,
never `depende en`** — which English's "depends on" installs.

Two frames the brief listed did not ship, and both omissions are decisions rather than oversights.
**`yo diría que` is not here**, because `-ría` is L3-M4's by `docs/69` §2 and a conditional cell in
M3 would have opened the tense a module early; the frame is named in prose and left to M4's
grammar. **`sin embargo` is not a row**, as the brief itself asked — it is the heavier written twin
and lives in `usage`.

`no sé si` is the one place the brief's seam needed a payment it did not name. The frame is listed
among M3's softeners, but bare `si` is M4's fresh key, and writing `no sé si` with no row would have
put an untaught surface in front of a learner. So it is indexed **whole, as a three-token surface**
— the same tool `tan … como` and `a la derecha` use — which leaves bare `si` for M4 to open one
module later, exactly as the seam intends. S09's note says so, and its mistake plate is `No sé sí`,
because the accent is a letter and a reader does not repair the wrong one.

### L3-M4 "If and then" — one law about the `si` half, and the tense that comes free with the future

The conditional half of the module is genuinely easy and the module says so: **`si` takes the
present and never the future.** Everything after the comma is free — present or future, both
ordinary — so rule 0 is about one side of the sentence only, and S01's plate (`Si tendrás tiempo`)
is the English sentence word for word. S02 shows the two halves taking different tenses in one item
(`Si llueve, no voy al parque. Si puedo, iré.`) so the freedom is visible rather than described.

The `-ré` future is taught as an ending on the WHOLE infinitive, with the five that shorten named as
the entire irregularity: `haré`, `tendré`, `podré`, `diré`, `vendré`. S05 puts `tendré` and `vendré`
in one item because `tener` and `venir` shorten identically — "learning one of them is learning
both, and that is the only bargain this tense offers". The delta that had to be stated, and is, in
S03's trap and in a variation that rebuilds the same appointment with `voy a`: **L1-M6's `voy a` is
not replaced.** It is the near, spoken future; `-ré` is the more distant and more written one.

The conditional is then bought for almost nothing, which is why the module teaches the two tenses
together rather than in sequence: **the conditional is the future's stem with `-ía` on it.** S10 is
that claim made visible in one line — L1-M6's `hablaré`, two levels old, beside `hablaría`, one
letter of work away — and its `sound` block is the whole lesson (`a-bla-RE` against `a-bla-RI-a`).
`¿Podría…?` lands in S07 with the `formal` chip, and its trap points back at L2-M1: politeness was
bought with frames there because this tense was not available, and `¿podría?` is now a step above
`¿puede?` rather than a replacement for it.

The counterfactual is **one frame** — `si` + imperfect subjunctive, then the conditional — and the
module reads "one frame" as one construction rather than one verb: `tuviera` (S08) and `fuera` (S09)
both appear, both inside that single frame, and rule 4 names every other cell of the mood as a later
level's. S09's trap says it in the module's own voice: those two cells are all of it, and both live
in the same sentence shape. S08's plate is `Si tengo más tiempo, iría`, which is the half-built
sentence a learner produces when only one side of the frame has moved.

The brief's index seam was **wrong here against the real index, in one place that mattered**. It
says "the three cells L1-M6 shipped (`iré`, `seré`, and one more)" and that "`iré` and `seré` stay
L1-M6's rows". They do not: L1-M6 shipped `hablaré`, `hablarás`, `hablará` and `trabajaré`, and
neither `iré` nor `seré` is anywhere in the 546. So `iré` is opened here, with its own row in S02,
and `seré` is not used at all — `sería` is taught in S07 off a stem the module states rather than
off a cell the learner has met. The rest of the seam held: `si`, `tuviera`, `fuera`, `yo que tú` and
every `-ré`/`-ría` cell were unowned as claimed, and `puede` stayed L2-M1's with `podría` pointing
back at it.

`yo que tú` is indexed whole and is worth its key for what its note says: **a frame with no verb in
it at all**, where English needs four words and a subjunctive. The plate is `Yo que tú, voy al
médico` — the indicative that turns advice into a plan of your own.

### L3-M5 "What someone said" — the good news first, then the clitics

Backshift is tagged `free`, and that tag is the module's argument. **English already does this**:
"he says he's coming" becomes "he said he was coming", and Spanish takes the same step back. So rule
0 opens on the good news, the module spends nothing on the move itself, and the budget goes to the
cells (`venía`, `vendría`, `tenía`, `sabía`, `quería`) and to the clitics. Each backshifted cell is
its own row pointing back at the bare verb, and **no L1 or L2 file was edited** — `docs/53` §2 held.
S01 and S02 are the two halves of the rule in the same shape: present → imperfect, future →
conditional, each with the unreported version in the same item so the step is seen rather than
asserted.

Reporting a question is the `interference` tag, and its statement is precise: **a yes-or-no question
reports with `si` and never with `que`**. The reason a learner gets it wrong is stated too — `que` is
the word every OTHER reported clause takes — which makes the plate (`Me preguntó que tenía tiempo`)
an error with a cause rather than a curiosity. S04 carries the wh-half, and its plate is the missing
accent: `dónde` keeps it inside a report, with no question mark anywhere in the sentence, because
bare `donde` is the joining word instead.

The object clitics are the level's second collision and they are paid exactly as `docs/69` §3 said
they would be. `la`, `los` and `las` are L1-M1's article keys forever, so the module teaches
**`la vi`, `los conozco` and `las tengo` as two-token surfaces**, each its own index key, each with
a note saying why the bare word underneath is an article. S07 is the item that makes the point
without a rule: `Las llaves no están aquí. Las tengo en casa.` — both words in one breath, the
article leaning on a noun and the pronoun leaning on a verb, which is the only thing that separates
them on the page. Rule 2 says it in one line, and the resolver agrees: the two-token surface wins the
longest-match walk, so a learner tapping `Las tengo` is shown the pronoun and a learner tapping
`Las llaves` is shown L1-M1's article.

Placement is the delta an English speaker feels and S09 is the minimal pair: `Voy a verla mañana. La
vi ayer también.` One choice, two spellings, both ordinary, and `verla`'s note points at L3-M1's
`ducharme` because it is the same build. `le` was not re-opened — S08 uses L2-M7's row and spends
its own key on `lo dije`, whose note is the one-letter contrast that matters (`lo` is what was said,
`le` is who was told). **A sentence with both clitics (`se lo dije`) is never shown**, only named in
rule 3 as a later level's, which is what the brief asked.

One seam correction: the brief lists `lo dije` among the fresh keys, and it is authored as one —
but both halves already resolve on their own (`lo` is L2-M5's, `dije` is L2-M10's), so the key buys a
NOTE rather than a resolution. It is kept because the note is where the `lo`/`le` split is stated,
and a learner tapping the pair has asked exactly that question.

### The ratchet

`tools/shown-surfaces.test.ts` held at **en-es 10** across all three modules, with **no new finding
at any point** — the second wave in a row to produce none, and this one while opening two deliberate
homograph collisions. Every module was checked with `npm run content:shown` before it was built, and
each reported `clean — every shown surface resolves` with **no re-teach lines either**: not one row
in the three modules mints a note that an earlier module's key would hide.

Three surfaces were checked against the emitted fold rather than against the brief and changed what
got authored: `iré` and `seré` were NOT L1-M6's (above); `creo` is **L2-M5's** row, not L2-M9's as
M3's seam says, which changes nothing about the content but is the second brief line in this wave
that named the wrong owner; and `tiempo`, `fácil`, `difícil`, `interesante`, `verdad`, `llueve`,
`tenía` and `vivía` were all unowned at the top of the wave, so every one of them that appears is
authored with a row rather than borrowed.

New-surface spend stayed inside the PRD §5 cap of 25 with room: **M3 spent 24** (15 rows plus nine
`forms` entries, the most expensive module of the three because `tan … como` and `estoy de acuerdo`
each buy multi-token keys), **M4 spent 17**, **M5 spent 15**.

### Open questions for the native pass

14. **`no creo que` in ordinary speech** (M3, rule 0 and S01). The wave's central claim. Confirm a
    speaker really does reach for `no creo que sea` rather than `creo que no es`, and that the
    second is a different thing to say rather than a way round the subjunctive.
15. **One cell for `yo` and `él`** (M3-S01, S04; M4-S08). Every subjunctive and imperfect-subjunctive
    row says the subject comes from the conversation. Confirm that is how it actually lands, and that
    a listener never needs the pronoun spelled out in these sentences.
16. **`me parece que` against `creo que`** (M3-S03). Confirm the first is genuinely softer rather
    than merely different, and that `me parece que sea` is heard as an over-correction rather than as
    a regional variant.
17. **`no es tan fácil como parece`** (M3-S05 variation). Confirm the fixed phrase reads as idiomatic
    Spanish rather than as a translation of the English idiom it matches word for word.
18. **`de acuerdo` clipped** (M3-S06). The module claims the short form is the everyday one and the
    full `estoy de acuerdo` is for when it matters. Confirm that split.
19. **`la verdad es que`** (M3-S09). Confirm it announces honesty rather than bluntness, as the
    `usage` claims, and that it does not read as a preface to bad news.
20. **`aunque` + indicative** (M3-S07). Confirm that at this level, for a fact that is true, the
    indicative is what a speaker says, and that `aunque sea un poco caro` really does shift to "even
    if" rather than being a free variant.
21. **`si` + present carrying a future** (M4-S01). Confirm `Si tienes tiempo, te llamo mañana` is
    ordinary and that nobody hears the `te llamo` as present.
22. **`-ré` against `voy a`** (M4-S03). The module calls `-ré` the more written and more distant
    future. Confirm that is the living split rather than a textbook one, and that
    `Mañana tendré una reunión` is said as readily as it is written.
23. **`yo que tú`** (M4-S06). Confirm it is the everyday advice frame between friends, that
    `si yo fuera tú` is heavier rather than wrong, and that the frame never reaches a stranger.
24. **`¿Podría…?` against `¿Puede…?`** (M4-S07). Confirm `podría` is a step of distance rather than
    a change of register, and that using it with a friend sounds odd rather than polite.
25. **Two counterfactual cells, one frame** (M4-S08, S09). The wave read the brief's "exactly one
    counterfactual frame" as one construction, not one verb, and shipped `tuviera` and `fuera` inside
    it. Confirm that is one lesson to a learner's ear rather than the start of a paradigm.
26. **`las llaves` beside `las tengo`** (M5-S07). The item that carries the collision. Confirm a
    speaker really would answer this way rather than naming the keys again, and that the two `las`
    are as unremarkable to a native ear as the module claims.
27. **`lo dije` against `le dije`** (M5-S08). Confirm the one-letter split is heard immediately, and
    that a listener does not repair the wrong one from context.
28. **`voy a verla` against `la voy a ver`** (M5-S09). The module ships only the first and calls the
    two positions equally ordinary. Confirm the second is equally common in speech, and whether
    leaving it out of the module leaves a learner sounding bookish.
29. **`quería` as a softener** (M5-S10). The note says the imperfect of `querer` is also the softest
    way to ask for something and defers that use. Confirm the two uses are not confusable in the
    sentences shipped here.
