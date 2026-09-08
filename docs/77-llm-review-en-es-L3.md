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
