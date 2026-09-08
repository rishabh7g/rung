# en-de L3 — LLM review

The review that clears each en-de L3 wave to ship, written in the same change that authors it
(`CLAUDE.md`, "Ship `verified: true` in the authoring change"). The **native-speaker gate is a
separate, stricter bar and stays unmet**: every section below ends in open questions for a native
pass, and no later wave may close one of them by rewriting a shipped module.

Open questions are numbered as a fresh en-de L3 chain from 1. `docs/67`'s L2 chain of forty is
closed and is not continued here — those forty stay open for the native pass regardless, and two of
them (Q9 and Q13, on whether predicative-only adjectives leave a learner sounding foreign) are
questions this level's M2 exists to answer rather than to close.

## Wave 1 — L3-M1, L3-M2 (#477)

Authored against the briefs written by #468 and the decisions recorded in `docs/75`, and reviewed
against the REAL cumulative index rather than against the briefs' account of it: **467 surfaces
through L2-M10, `maxSpan` 3**, growing to 487 after M1 and 512 after M2. A strict `npm run build`
emits `en-de: 22 modules (L1-M1..M10, L2-M1..M10, L3-M1..M2)` with `CONTENT 206/206 ok`, and the
suite is 525 green. `maxSpan` holds at 3 and nothing in this wave pushed at it, for a reason worth
naming: everything the level minted is ONE whitespace token. A stranded prefix is a word standing on
its own, a `zu`-infinitive is welded shut (`einzukaufen`), and a declined adjective is a single
surface. German gets longer at L3 without getting wider.

### L3-M1 "Your day, in detail" — one word, two ends of a clause

L2-M1 taught the bracket and built it out of two words: a modal in the second seat, its infinitive at
the very end, everything else in between. M1's whole delta is that **one word builds the same
bracket**. `Ich kaufe am Abend ein` is a verb split down the middle with the sentence living inside
it, and rule 0 says so in the terms a learner needs rather than the terms a grammar uses — the stem
takes the second seat, the prefix goes to the END, and it goes there even when eight words separate
it from its own stem.

The module's economy is that it teaches one error four times rather than four errors once. `Ich
einkaufe am Abend` (S01), `Ich anrufe meine Mutter` (S02), `Die Arbeit anfängt um neun` (S03) and
`Mitkommen Sie am Sonntag?` (S10) are the same English habit — keep the verb in one piece — met in
four different sentence shapes. That is deliberate and it is the right call: a learner does not have
four problems here, they have one, and the thing they need is to see it survive a change of subject,
a change of object and a change of mood. S03 is the sharpest of the four because its subject is a
thing rather than a person, which is where the trap earns its line: the split is a property of the
VERB and not of who is doing it. S10 is the widest, because a yes-or-no question fronts the stem and
the prefix still waits at the end, so the two halves of one word end up as far apart as the sentence
allows.

The second structure is the `zu`-infinitive, and it is here rather than anywhere else for a reason
rule 3 makes explicit: **the `zu` goes INSIDE a separable verb** — `einzukaufen`, `aufzustehen`,
`anzurufen` — so the wedge runs exactly where the split already runs, and the two facts are one fact.
A module that taught `um … zu` before the split would have to present the infix as an arbitrary
spelling.

S04 and S05 are then a genuine minimal pair rather than two examples of one thing. `Ich gehe in die
Stadt, um einzukaufen` is a purpose; `Ich habe keine Zeit, meine Mutter anzurufen` completes the noun
`Zeit` and takes no `um` at all. English says "to" in both, so a learner who learns only the first
sentence writes `um` into the second one, and S05's trap is the only place they will ever be told
which of the two they just said. The fence on the frame is honest and is stated without naming the
level that pays it: both halves of `um … zu` need the same subject, and when the subjects differ
German uses a word this course teaches later. Content that named `damit` here would have taught a
word it does not own; content that said nothing would have let a learner build it themselves.

The rest of the module is placement, and rule 4 states the whole price: **time, then manner, then
place** — `Ich fahre um acht mit dem Bus zur Arbeit`. L2-M6 already bought time-before-place, so the
new half is manner in the middle, and the trap draws the line where it actually falls: an English
sentence read word for word gives German that a native speaker will understand and never produce.
"Not wrong so much as translated" is the correct grade for this error and the module says exactly
that, which matters because a learner who is told it is wrong will not believe them.

Rule 5 is the relief, and it is a relief worth a rule: **German has no auxiliary `do`**. A frequency
word walks into the middle field and nothing else in the sentence moves. S08's plate is `Ich tue oft
eine Suppe essen`, which is not a German error at all — it is an English speaker inventing the
support their own language demands — and it is the plate this module most needed. Beside it, S09
carries the second half of the same economy: `nie` and `selten` negate by themselves, and `Ich stehe
nie nicht früh auf` is broken rather than emphatic.

One thing the module does not do, recorded so a later wave does not assume it was done: **every
display here is a main clause or a yes-or-no question**, which is precisely where a separable verb
splits. German puts the verb back together in a subordinate clause (`weil ich am Abend einkaufe`),
and M1 neither shows that nor claims it. The first module to write a subordinate clause around a
separable verb — M3, where the fronted subordinate clause arrives — is the module that has to say
so.

Register is nine `neutral` lines and one `formal`: S10, the `Sie` invitation. The other nine describe
a routine to nobody in particular, and a routine described to nobody has no register to chip.

### The seam that decided which verbs may split

The M1 brief's INDEX SEAM note is the strongest single constraint in the wave, and it is a constraint
about spelling rather than about meaning: **the prefix a split verb STRANDS decides whether the
module may write that verb at all.** Only four stranded prefixes are owned — `ein` is L1-M1's
indefinite article, `an` and `mit` are L2-M4's prepositions, `auf` is L1-M4's — and first-occurrence-
wins means the learner who taps the `ein` at the end of `Ich kaufe ein` is answered with a note about
the word "a".

The wave took that as a hard filter on its vocabulary. `abfahren`, `fernsehen`, `abholen` and
`aufhören` strand `ab` and `fern`, which nobody owns, so writing any of them would have forced a row
for a bare prefix — a row whose cue is a fragment and whose note nobody wants. **All four were
dropped**, and `ab` and `fern` stay unspent for a module that has a reason to pay for them. The
brief's own fourth pattern went with them, and the shipped `allowedPatterns` are not the brief's.

That is the right shape for the finding rather than a workaround, and it is worth stating as a law
for the level: in en-de, a separable verb costs whatever its prefix costs. The four the module keeps
— `einkaufen`, `anrufen`, `anfangen`, `mitkommen`, plus L1-M4's `aufstehen` in the `zu`-infinitive
rows — are exactly the four whose prefixes were paid for two levels ago, and rule 2 states the
sharing once for all of them instead of four rows restating it. The device is L1-M4's, copied: its
`auf` row already named both seats, detached prefix here and preposition elsewhere.

Two smaller payments fell out of the same note. `um` is L1-M4's clock word and `zu` is L1-M8's
"too much", so `um … zu` opened no row at all and the frame indexes as the whole surfaces its
sentences write. And the twenty keys M1 did mint are all verb shapes, frequency words and times
(`einkaufen`, `anfangen`, `mitkommen`, `rufe`, `ruft`, `fängt`, the three `zu`-infinitives,
`meistens`, `oft`, `manchmal`, `selten`, `nie`, `normalerweise`, `täglich`, `Mittag`, `Nachmittag`,
`Nacht`, `Woche`) — not one preposition among them, in a module about prepositions' twins.

### L3-M2 "Work and study" — one principle instead of three tables

This is the biggest single debt in the course and `docs/75` §2 called it that: L2 kept every adjective
predicative and said so three times in shipped content. The decision that makes M2 a module rather
than a reference card is rule 0, and it holds all three declensions on one sentence: **inside a noun
phrase the gender-and-case signal is carried exactly ONCE.** If `der`, `die`, `das`, `den` or `dem`
already carries it, the adjective goes weak and takes `-e` or `-en`. If nothing stands in front of the
noun, the adjective wears the article's own ending in its place. Every ending a learner will ever need
is an ending they already met on `der`, `die` and `das` — which is true, and which converts the
largest table in German into a question about what is standing in front.

Rule 1 then buys the mixed declension for one sentence rather than for a third table: `ein` has no
ending in three cells, so the adjective supplies the missing signal there and looks strong, and
everywhere else the `ein`-word carries it and the adjective is weak again. "Mixed is not a third
system; it is the first two, chosen cell by cell" is the whole of what a learner needs to hold.

S01 is where the argument is visible rather than asserted. The brief asked for minimal pairs on ONE
noun and never a table, and S01 carries the triple on one noun in one screen: `Der neue Kollege ist
sehr nett`, with `Ein neuer Kollege ist sehr nett` and `Neue Kollegen sind immer nett` as its
variations. Three seats, one word, and the choosing is the thing the learner sees.

The two error shapes are separated and weighted, which is the module's most consequential authoring
decision. The first error is no ending at all (`ein neu Kollege`) — English adjectives never inflect,
so there is nothing to transfer — and it gets four plates (S01, S03, S04, S06). The second is the one
the brief said survives into fluency: once `-en` is learnt it gets spread over everything, giving
`eine interessanten Arbeit` and `das größeren Büro`. It gets three plates (S05, S08, S09) and, more
usefully, it gets rule 3, which explains WHERE `-en` is right — masculine accusative, dative and
plural, the cells where the article in front is already doing heavy work — so the learner has
something to replace the habit with rather than only a prohibition. S04's trap is the same point from
the other side: every dative adjective in the module ends in `-en` whatever the gender, "which is
exactly why it is so easy to start using it everywhere".

S06 is the module's quietest good sentence. `Das ist anstrengende Arbeit` drops the article, and the
trap says the thing a learner would otherwise conclude on their own and get wrong: dropping the
article does not drop the ending, because the signal still has to be carried once and the adjective
is now the only thing left to carry it. That is rule 0 falling out rather than being restated.

The comparative and superlative are L2-M9's named debt and they are paid where they are cheapest, on
top of a declension the sentence is already teaching: `das größere Büro` (S09) and `die größte Firma`
(S10), with two endings on one word — `größ-er-e`. The important half is what did NOT move. L2-M9's
`am größten` stays exactly where it was, after `sein`, with no adjective ending, and S10's trap says
the two are not interchangeable and that swapping them is heard immediately. A module that had
quietly replaced `am größten` with `die größte` would have unshipped a row a level below it.

Rule 5 protects the oldest law in the course from the module most likely to break it: **a bare job
after `sein` still takes NO article.** M2 has just put an article and an adjective in front of every
other noun in sight, so `Ich bin Studentin` (S07) is exactly the sentence a learner would
over-correct, and the plate is `Ich bin eine Studentin`. The other half is stated with it — put an
adjective on the job and the article returns, `Sie ist eine neue Kollegin` — because a learner given
only the prohibition will produce the wrong sentence at the moment they think they have understood
the rule.

Two rows are tagged `interference` and both earn it. `studiere` means to study AT a university and
nothing else; revising for tomorrow is L1-M6's `lernen`, which is the word an English speaker reaches
for. And `suche` carries its own "for", so nothing stands between the verb and its object. Neither is
a grammar point and both are the kind of thing a learner gets wrong for years without being told.

`Kollegen` takes a row of its own, and it is the row `docs/75` §4 predicted a level early: `Kollege`
adds `-n` everywhere but the bare subject, which is L2-M2's `Herrn` class met a second time, and the
same form is the plural. M8's `des Kollegen` will meet it a third time with the genitive; the row
here is what stops that being a re-teach.

### The two collisions the brief did not predict

The M2 brief's seam note was written before the authoring and was right about the policy — every
declined shape is its own key, positives stay with L1-M10, L2-M2, L2-M3 and L1-M8 — and wrong about
two specific words. Both were found against the emitted fold, and both changed sentences.

**`kleiner` is L2-M9's COMPARATIVE** (`L2-M9-S08`), so it means "smaller". `ein kleiner Kurs` is
perfectly good German and a learner tapping `kleiner` in it would have been handed the comparative
note. The module routes around it completely: `klein` appears only in the dative, `in einem kleinen
Büro` (S04), and the row's note says the collision out loud — "do not reach for L2-M9's `kleiner`,
which means smaller".

The general form of that trap is worth more than the instance, because it is a fact about German
spelling rather than about this module: **the strong masculine nominative ending is `-er`, and so is
the comparative.** Every adjective L2-M9 compared with `-er` is therefore unusable in an
`ein __er N` slot for the rest of the course — `größer`, `älter`, `billiger`, `schneller`, `jünger`
and `länger`, beside `kleiner`. It is also, read the other way, why the module's two strong masculine
nominatives are writable at all: `ein guter Chef` is safe because `gut`'s comparative is suppletive
(L2-M9 opened `besser`), and `ein neuer Kollege` is safe because `neu` was never compared. Neither of
those is luck, but neither was chosen on purpose either, and a later wave that wants
`ein schneller Zug` needs to know it cannot have it.

**`meinen` is L2-M8's VERB "to mean"** (`L2-M8-S03`), not a free possessive slot, so `meinen neuen
Chef` would resolve to the verb. The module's possessive work moved to the feminine dative instead —
`mit meiner neuen Chefin` (S04) — which is a better sentence anyway, because it puts a possessive,
a dative and a weak `-en` in one phrase and shows `meiner` taking the ending L2-M3's `einer` already
taught.

### Zero re-teaches, and why that is the finding

`src/course/types.test.ts` holds a check for en-de that no other course has: **every en-de surface
must be opened by exactly ONE word row.** The allow-list is three entries (`nicht`, `dienstag`, `in`),
each with a written reason, and the comment above it says plainly that a fourth entry is a real
defect. The reason the check exists is the `का` bug in its milder form: first occurrence wins, so a
second row is a note the word index can never reach.

**The L2 waves tripped that check fourteen times. This wave tripped it zero times.**

That is the wave's headline finding, and it is not an absence of news. L3 is where the collision
surface is at its largest in this course, because every declined shape is a separate key — M2 alone
minted 25, of which `neue`, `neuen`, `neuer`, `interessante`, `anstrengende`, `größere`, `größte`,
`kleinen` and `meiner` are all shapes of words the ladder already owns. Fourteen collisions came out
of L2, where the inventory was smaller. Nothing collided here, and the reason is procedural rather
than lucky: `docs/75` §4 and the M2 brief listed every spent positive and every spent comparative
before an author wrote a sentence, so the rows that would have collided were never drafted. The two
words the brief got wrong were caught the same way, one step later, by folding the index instead of
trusting the note.

The three allow-listed duplicates are unchanged, and `nicht` is worth one line of reassurance: M1
writes `nicht` nowhere and M2 writes it only inside displays, so this wave neither added to the list
nor leaned on it.

### A judgement call: `formal` chipped four times, not ten

`docs/75` §1 assigns M2 to the `Sie`-speaking, `formal`-chipping group wholesale, on the ground that
a workplace module speaks to colleagues. The wave did not do that, and the departure is recorded here
because it is a decision rather than an oversight.

**A register chip describes the listener a sentence actually has.** Six of M2's ten sentences address
nobody at all: `Der neue Kollege ist sehr nett`, `Ich habe einen neuen Chef`, `Ein guter Chef ist sehr
wichtig`, `Ich arbeite in einem kleinen Büro`, `Das ist anstrengende Arbeit` and `Das größere Büro ist
sehr teuer` are statements about a workplace with no addressee in them, and they chip `neutral`.
The four that are spoken to somebody who is not a colleague chip `formal`: S05 says something kind
about another person's job, S07 answers what you do, S08 is said at a counter or in an office, and
S10 places your employer for a stranger. That split is visible in the `usage` line of each, which is
where a reader can check it.

Chipping all ten `formal` would have taught something false — that describing your own office is a
formal act — and would have made the chip useless as a signal exactly where L3-M8's counters need it
to still mean something.

### The ratchet

`tools/shown-surfaces.test.ts` held at **en-de 11** across both modules, with **no finding at all** —
not one shown-but-untaught surface in either file. This is the third consecutive wave in the
milestone with none, after en-it (#475) and en-fr (#476), and by now the cause is not in doubt: the
seam notes are corrected against the emitted index BEFORE the authoring rather than after it. Three
facts that would each have produced findings — the unowned `ab` and `fern`, `kleiner`, and `meinen` —
were caught while they were still sentences in a brief or a fold, and the module that shipped was
written around them.

### Open questions for the native pass

1. **`einkaufen` for the shopping** (M1-S01). Confirm `Ich kaufe am Abend ein` is what somebody says
   about their own evening, and whether `einkaufen gehen` is in fact commoner in speech.
2. **`Die Arbeit fängt um neun an`** (M1-S03). Confirm `die Arbeit` is what a speaker calls their
   working day here, and that `Ich fange um neun an` is not the ordinary way to say it instead.
3. **Time, manner, place** (M1, rule 4 and S06). Confirm `Ich fahre zur Arbeit mit dem Bus meistens`
   is heard as shuffled rather than as emphasis, and that the neutral order is as rigid as the rule
   says.
4. **The frequency words and their seats** (M1-S06, S08, S09). The module puts `meistens`, `oft`,
   `manchmal`, `selten` and `nie` in the middle field and fronts `normalerweise` and `manchmal`.
   Confirm which of them may open a clause and which may not.
5. **`nie` and `selten` alone** (M1-S09). Confirm neither ever takes a `nicht` with it in ordinary
   speech, including emphatically.
6. **`in der Nacht`** (M1-S09). The note says night is the one part of the day that does not take
   `am`. Confirm, and whether `nachts` is what a speaker actually says for a habit.
7. **`täglich`** (M1-S06). Confirm it is everyday speech rather than a written or official word, and
   that `jeden Tag` is not what somebody would say in the same sentence.
8. **A `zu`-infinitive with no `um`** (M1-S05). Confirm `Ich habe keine Zeit, meine Mutter anzurufen`
   takes no `um`, and that adding one is heard as an error rather than as a nuance.
9. **`Kommen Sie am Sonntag mit?`** (M1-S10). Confirm this invites rather than merely asks about
   arrangements, and that it is warm enough to use with somebody you address as `Sie`.
10. **The triple on one noun** (M2-S01). Confirm `der neue Kollege`, `ein neuer Kollege` and
    `neue Kollegen` are all ordinary, and that the bare plural is not the written-only member.
11. **`anstrengende Arbeit` with no article** (M2-S06). Confirm the article-free abstract noun is
    what a speaker says, and that `Das ist eine anstrengende Arbeit` says something different rather
    than the same thing.
12. **`Chef` and `Chefin`** (M2-S02). Confirm `Chef` is the ordinary word for the person you work
    for, that it carries no edge, and that `die Chefin` is what a woman in charge is called at work.
13. **`Stelle` against `Arbeit`** (M2-S08). The module says `Stelle` is the post you apply for and
    L2-M4's `Arbeit` is the work you do. Confirm, and whether `Job` has taken over `Stelle` in
    speech.
14. **`studieren` against `lernen`** (M2-S07). The wave's strongest lexical claim: that `studieren`
    only ever means a course of university study, so revising for tomorrow is `lernen`. Confirm,
    along with `an der Uni` rather than `in der Uni`, and that `Uni` is what everybody says.

## Wave 2 — L3-M3, L3-M4, L3-M5 (#486)

Authored against the same briefs and the same `docs/75`, and reviewed against the REAL cumulative
index rather than against the briefs' account of it: **512 surfaces through L3-M2**, growing to
**527 after M3, 544 after M4 and 560 after M5**. A strict `npm run content:build` emits
`en-de: 25 modules (L1-M1..M10, L2-M1..M10, L3-M1..M5)` with `CONTENT 209/209 ok`, and
`tools/shown-surfaces.test.ts` holds en-de at **11** with no finding in any of the three files.
The spend is 15, 17 and 16 keys against a `newWordCap` of 25 — the wave never came near it, because
its subject is word ORDER and a mood, and neither is bought with vocabulary.

`maxSpan` holds at 3, and this is the first en-de wave where that ceiling was actually touched
rather than merely respected. Wave 1 minted nothing but single tokens and said so. M3 mints
`Meiner Meinung nach` and M4 mints `An deiner Stelle`, both three whitespace tokens, both indexed
whole so the greedy longest-match walk takes them in one bite. Each sits on a phrase the learner
cannot usefully decompose — `nach` following its noun is not L2-M4's `nach`, and `deiner` exists in
the ladder nowhere else — so the joined key is the only honest one. Neither pushes past 3, and
nothing in the level needs a fourth token.

### L3-M3 "Opinions with reasons" — the clause that stands first

`docs/75` §3 is the section this module is built on, and the wave confirmed both of its corrections
against the fold before writing a line. `weil` and `dass` are **L1-M9**'s and `wenn` is
**L1-M10**'s, law included: L1-M9's rules already state that a subordinating conjunction sends the
finite verb last while `denn`, `und`, `aber` and `oder` leave it second. **M3 therefore opens no row
for any of the three and never presents verb-final order as news.** What it teaches instead is the
one thing L1 left standing — the subordinate clause standing FIRST, and the inversion that forces:

    Weil ich müde bin, bleibe ich zu Hause

Rule 0 says it in the terms a learner needs: the whole clause is the first element, so the main verb
takes the second seat, which is now the seat straight after the comma. **The two verbs end up side
by side across that comma**, `bin` and `bleibe`, one closing its clause and one opening the next, and
English has no equivalent of that shape at all. Rule 1 is the error the shape produces —
`Weil ich müde bin, ich gehe nach Hause` — and it is the module's mistake plate on S01, with the
brief's own canonical sentence (`gehe ich nach Hause`) kept as that sentence's first variation so the
two shapes sit one line apart.

The module's economy is `obwohl` against `trotzdem` on **one pair of facts**. S02 is
`Obwohl es teuer ist, kaufe ich es`; S03 is `Es ist teuer. Trotzdem kaufe ich es`. Same two facts,
two structures, and the word chosen decides where the verb goes — a conjunction that fronts its
clause, or an adverb that fronts itself and inverts exactly the way L1-M9's `deshalb` does. Rule 2
points back at `deshalb` and at L1-M10's `dann` and `also` rather than restating either, which is
what keeps the module inside its budget.

Softening is done by the FRAME, per `docs/75` and the same law L2-M1 stated for requests: the spend
is `Meiner Meinung nach` — a postposition governing the dative, whose `meiner` is L3-M2's, and which
fronts and therefore inverts — plus the four agreeing and disagreeing frames, `Das stimmt`,
`Da stimme ich zu`, `Du hast Recht` and `Das sehe ich anders`. Three of the four front something that
is not the subject, so the module gets to show inversion four more times without spending a rule on
it. `Ich weiß` landing on **L2-M3's `weiß`, the colour white**, is rule 5 and nothing else — the seam
is written once, no rival row is opened, and S10's variation `Ehrlich gesagt weiß ich nicht` is where
a learner will meet it.

### L3-M4 "If and then" — one mood, six words

`docs/59` §5 named this module in advance and the wave took it literally: **six cells and no
paradigm.** `wäre`, `hätte`, `könnte`, `sollte`, `müsste`, and `würde` plus an infinitive for
everything else. Rule 1 carries the fact that stops a learner inventing forms — an ordinary verb's
direct Konjunktiv II is spelled like its Präteritum and nobody says it, so there is no spoken
`ich führe` — and the module then never writes one.

Real against unreal sits on **L1-M10's `wenn`**, owned, and no row is opened for it. The pair is
authored side by side inside S01: the display is the unreal `Wenn ich Zeit hätte, würde ich kommen`
and its first variation is the real `Wenn ich Zeit habe, komme ich`. That ordering is a decision.
The news is the mood, and putting the unreal in the display puts the two Konjunktiv II forms where
the module wants them — `hätte` and `würde` meeting across the comma, in exactly the seats `bin` and
`bleibe` occupied one module earlier. **M3's law and M4's mood are the same sentence shape**, and
rule 3 says so rather than re-deriving the word order.

Every cell took **its own row**, which is `docs/75` §4's policy for a shape whose base is L1's or
L2's, and which this module applies eleven times: `wäre` and `wären` point back at L1-M5's `war` and
`waren`, `hätte` and `hätten` at `hatte` and `hatten`, `könnte` at L2-M1's `könnten`, `sollte` at
L2-M6's `sollen`, `müsste` at L2-M4's `müssen`, and `würde`, `würden` and `würdest` at nothing at
all, because `werden` is not taught until L3-M9. One judgement call inside that: **`solltest` is a
`forms` entry on the `sollte` row rather than a row of its own**, where `hätten` took a row beside
`hätte`. The reason is what each shape needs to point AT. `hätte` and `hätten` point back at two
different L1-M5 rows and are shown in two different sentences, S01 and S08; `solltest` points at the
same single L2-M6 `sollen` as its own citation form and is shown in the sentence that opens it. A row
is worth opening where it gives a learner a pointer they could not otherwise get.

`möchte` being itself a Konjunktiv II, of `mögen`, is the retro-explanation `docs/75` asked for, and
it sits in rule 4 rather than in a row, because L1-M3 owns the key and has since the third module of
the course. The past counterfactual is named as **L4-M3's** in rule 5 and no display uses it;
`falls` stays out entirely; `wenn` against `als` for time is handed to M5 in the same rule.

### L3-M5 "What someone said" — the gift, and the one word that splits

The brief asked for the no-backshift rule to be sold loudly, and rule 1 is the only rule in this
level written with a shout in it: **GERMAN DOES NOT BACKSHIFT.** `Ich komme morgen` reported is
`Er hat gesagt, dass er morgen kommt`, and the mistake plate on S01 is the backshifted version an
English speaker builds instead. It is the cheapest lesson in the level and the module spends a
sentence, a trap, a variation and a mistake on it anyway, because a learner will not believe it.

The genuinely fresh structure is the indirect question, and it splits two ways. A yes/no question
becomes `ob` (S02); a w-question keeps its own w-word and moves nothing but the verb (S03, S04, S09),
so `wann`, `wo` and `was` stay their L1 and L2 rows and **this module opens none of them**. The
interference rule spends itself on one word: English's `if` does two jobs, and
`Er hat gefragt, wenn ich Zeit habe` reports no question at all. The test the rule gives a learner is
the one that actually works — if "whether" fits in the English, it is `ob`.

The Plusquamperfekt costs the index almost nothing, exactly as `docs/75` predicted: `hatte`,
`hatten`, `war` and `waren` are L1-M5's and are re-shown here as auxiliaries rather than re-opened,
and the only participle the module had to mint is `genommen`, which no row owned. `nachdem` is the
one time clause taken, because it is the conjunction that FORCES the tense gap; `bevor`, `während`,
`seitdem` and `bis` stay L4-M6's and are named as such. `als` against `wenn` is rule 7 and two
pointers, never two rows. **Konjunktiv I is named as L4-M7's in rule 8 and never authored** — the
module says in as many words that everyday spoken German reports with the plain indicative, so that a
learner who meets `er sei` in a newspaper knows what they are looking at and knows they were not
short-changed.

### The seam the brief did not predict: `Antwort` and `antworten`

`docs/75` §4 lists the collisions this level meets and the M5 brief lists eleven fresh keys, and one
collision is in neither list because it is not between this module and an earlier one — **it is
inside a single sentence.** `die Antwort` has the plural `die Antworten`, which the fold lowercases
to `antworten`, which is spelt exactly like the infinitive of the verb. S08 teaches both the noun and
the verb, so the first draft carried `Antworten` in the noun's `forms` and `antworten` as a row of
its own, and those are **one key with two rows** — the second unreachable, which on this course is a
defect and not a device.

Two things follow, and both are worth recording for the next wave.

- **The plural was dropped, not the verb row.** `Antworten` came out of the noun's `forms` and the
  note now says the plural is spelt like the verb below it. The verb keeps the row because it is the
  one that carries a fact a learner needs — `antworten` takes the person in the DATIVE and never a
  direct object, `Er hat mir geantwortet` — and a plural noun carries nothing.
- **`npm run content:shown` cannot see this class of collision.** It folds every module up to and
  including the one under test and reports a row whose key an EARLIER module owns; two rows inside
  the same module are invisible to it. The check that caught it is `src/course/types.test.ts`'s en-de
  guard, which walks every row of every module and asserts one seat per key. On this course a clean
  `content:shown` is necessary and is not sufficient, and an author who stops at it will ship an
  unreachable row.

### The ratchet

`tools/shown-surfaces.test.ts` held at **en-de 11** across all three modules, with **no finding at
all** — not one shown-but-untaught surface in any file. Two near-misses were caught by
`npm run content:shown` while the modules were still drafts, and both are the same class of error: a
verb the ladder owns in its citation form and in one participle, reached for in a person-form nobody
has opened. `wohnt` in an M5 variation was the one that fired (L1-M1 owns `wohne` and `wohnen`, not
`wohnt`); `arbeitet` was caught by hand before it was written, on the same reasoning. The fix in both
cases was to route the sentence around the missing shape rather than to mint it —
`dass er aus Berlin kommt` says the same thing out of keys the ladder already has.

**The re-teach count for this wave is zero, across three modules and 48 new keys.** That makes the
en-de L3 chain 5-for-5 with none, against L2's fourteen, and the method is unchanged from Wave 1: the
spent keys are folded and read BEFORE the sentence is drafted, not after. Three routings around spent
keys are worth naming because the next wave will meet the same class:

- **`meiner` is L3-M2's** (feminine dative "my"), so `Meiner Meinung nach` is indexed as one
  three-token surface on the `Meinung` row and no possessive row is opened.
- **`guter` is L3-M2's**, so M3-S09's `ein guter Grund` opens a row for `Grund` alone; the adjective
  resolves to the module below, which is where it was taught and where it belongs.
- **`sagen` and `gesagt` are L2-M10's** and `sagt` is not, so M5-S01 opens `sagt` and points back
  rather than re-opening the lemma — the same policy L2-M9 used for `alt` and `älter`.

One shared file is left untouched and is named here so it is not mistaken for a content failure:
`src/course/types.test.ts` carries a literal list of the 206 module files that existed before this
wave and now finds 209. That list is not this wave's to edit.

### Open questions for the native pass

15. **`Da stimme ich zu`** (M3-S06). Confirm this is what somebody says in a meeting rather than the
    bare `Ich stimme zu`, and whether `Da bin ich ganz deiner Meinung` has displaced it in speech.
16. **`Das sehe ich anders`** (M3-S07). The module sells it as the polite German no. Confirm it is
    heard as polite rather than as cold, and that it works with somebody you address as `Sie`.
17. **`Recht` with a capital** (M3-S08). `Du hast Recht` is authored with the noun capitalised.
    Confirm the capital is what a German writer uses now, and that lowercase `recht haben` is not the
    commoner spelling in ordinary correspondence.
18. **`Meiner Meinung nach` in speech** (M3-S04). Confirm it is said aloud rather than only written,
    and whether `Ich finde` — which L1-M9 already ships — carries the whole job in conversation.
19. **`Ehrlich gesagt`** (M3-S10). Confirm the frame takes no comma after it, and that
    `Ehrlich gesagt bin ich nicht sicher` is the ordinary hedge rather than `Ich bin mir nicht sicher`
    with the reflexive this course has not taught.
20. **`trotzdem` after a full stop** (M3-S03). The display writes two sentences. Confirm a speaker
    really does stop there, rather than joining with `aber trotzdem` or an `und`.
21. **The six cells and nothing else** (M4, rule 0). The strongest structural claim in the wave: that
    `wäre`, `hätte`, `könnte`, `sollte`, `müsste` and `würde` cover everyday unreal German. Confirm,
    and name any seventh a speaker uses often enough that its absence is felt — `wüsste` and `käme`
    are the two candidates.
22. **`müsste` against `sollte`** (M4-S05). The module says `sollte` is somebody else's advice and
    `müsste` is what you already know you owe. Confirm the split is real and that neither is heard as
    the other.
23. **`An deiner Stelle`** (M4-S03). Confirm this is what a German says where English says "if I were
    you", and that `Wenn ich du wäre` is heard as a translation rather than as ordinary.
24. **`Ich hätte gern einen Termin`** (M4-S07). Confirm it is one tier above `Ich möchte` rather than
    a different meaning, and that a surgery expects it on the telephone.
25. **`zwei Kaffee` uncounted** (M4-S08). The trap says German counts the servings and adds no
    ending. Confirm, including whether `zwei Kaffees` is heard at all.
26. **`sonst` and its seat** (M4-S09). Confirm `sonst kommst du zu spät` is the ordinary order, and
    that `sonst` never behaves as a conjunction in speech.
27. **No backshift, tested to destruction** (M5, rule 1). Confirm there is no everyday register in
    which a German speaker DOES shift the tense back when reporting, and that
    `Er hat gesagt, dass er morgen kommt` sounds unremarkable for something said yesterday.
28. **Dropping `dass`** (M5, rule 0). The rule says speech often drops it and the verb returns to
    second place. Confirm how common that is, and whether the module should have shown it in a display
    rather than in a rule.
29. **`nachdem` and the tense gap** (M5-S05). Confirm German really is stricter than English here, and
    that `Nachdem ich gegessen habe, bin ich gegangen` is heard as wrong rather than as casual.
30. **`erzählen` against `sagen`** (M5-S07). The module says news you pass on is `erzählen` and that
    `Sie hat mir gesagt` is flat rather than wrong. Confirm the line between them, and that `erzählen`
    takes the person in the dative in every register.
31. **`antworten` with no direct object** (M5-S08). Confirm `Er hat mir geantwortet` is the only
    shape, and that `Er hat meine Frage geantwortet` is impossible rather than merely rare.
32. **`Als ich klein war`** (M5-S10). Confirm this is how a speaker opens a childhood story, and that
    `Geschichten erzählen` is what a parent is said to have done rather than `vorlesen`.

## Wave 3 — L3-M6..M10 (#556)

The wave that closes the level, authored against the same briefs and reviewed against the REAL
cumulative index rather than against the briefs' account of it: **560 surfaces through L3-M5**,
growing to **588 after M6, 609 after M7, 641 after M8, 676 after M9 and 686 after M10**. A strict
`npm run content:build` emits `en-de: 30 modules (L1-M1..M10, L2-M1..M10, L3-M1..M10)` with
`CONTENT 214/214 ok`, and `tools/shown-surfaces.test.ts` holds en-de at **11** with no finding in any
of the five files. The spend is 18, 15, 21, 16 and 10 rows against a `newWordCap` of 25, which the
wave never came near — the level's last five modules are grammar, not vocabulary, and the one module
that wanted to be pure vocabulary (M7's body) turned out to have been paid for by L2-M8 years ago.

`maxSpan` holds at **3**. The wave mints exactly one multi-token key, M10's `zum Glück` at two
tokens, and it is indexed whole because `Glück` exists nowhere else in the ladder and the phrase is
not usefully decomposed. Nothing here needs a fourth token.

**Re-teaches: zero, across five modules and 126 new keys.** That makes the en-de L3 chain 10-for-10
with none. `FORCED_DUPLICATES` in `src/course/types.test.ts` still has its three entries — `nicht`,
`dienstag`, `in` — and this wave adds no fourth.

### L3-M6 "Feelings in depth" — where the language keeps its emotions

The module's claim is the brief's: German does not have a handful of odd reflexive verbs, it keeps
its feelings there, and a learner without them cannot say anything about how they feel past L1-M9's
four adjectives. Rule 0 says exactly that and points at `Ich wasche mich`, which L1-M4 shipped with a
note already saying the pronoun belongs to the verb — so the module presents a system rather than a
novelty, and the five patterns are five verbs of one shape.

The pronoun bill is what makes it affordable, and the index confirmed every line of the brief's
seam: `mich` is **L1-M4**'s, `dir` and `uns` are **L2-M1**'s, `mir` is **L1-M9**'s, and only `sich`
is fresh. Its row carries all three readings on one key — third singular, third plural, and the `Sie`
form — the treatment `docs/59`'s decision 2 gave L1-M2's `sie`, and the second key in the course to
need it. S07 shows the third person and its variation shows the plural; the `Sie` reading is shown in
S03's `Fühlen Sie sich besser?`, so all three readings appear in a display and none of them opens a
second row.

The DATIVE reflexive is rule 2 and it is authored as the brief asked, one minimal pair on one verb:
S05's `Ich wasche mir die Hände` against the variation `Ich wasche mich`, with the object arriving
and the pronoun changing case in the same breath. `Ich mache mir Sorgen um meine Tochter` (S08) is
the same shape on a second verb, so the rule is not left standing on one example.

Rule 3 is the interference entry and it does the job the brief set it: the fixed prepositions are
taught as pairs and the module says plainly that there is no rule to reason from — `auf` and `über`
here are NOT L2-M4's two-way prepositions choosing by motion, because the verb has already chosen.
`gefallen` (S06) cost nothing: L2-M8's rules entry had already listed it among the dative verbs
without a row ever being opened, so `Das Buch gefällt mir` is the row that entry was waiting for.

Seven adjectives had to find seats without any of them re-teaching or riding on a display that does
not carry them: `enttäuscht` sits on S02 with `ärgern`, `wütend` on S07 with the third person, and
S09 and S10 carry the remaining five as ordinary lists — `Ich bin aufgeregt, stolz und sehr nervös`.
No row in this module teaches a word its sentence does not show.

### L3-M7 "Body and health" — the module L2 had already half-written

The brief's first note is the important one and the index agreed with all of it: `Kopf`,
`Kopfschmerzen`, `Bauchschmerzen`, `weh`, `Arzt`, `Ärztin`, `Hilfe`, `schlecht` and `brauchen` are
**L2-M8**'s, `krank`, `kalt` and `warm` are **L1-M9**'s, `tut` is **L2-M1**'s and `Ihnen` is
**L1-M2**'s. So the module opens no row for any of them, and spends what it has on `seit`, the body
parts and the surgery.

`seit` plus the PRESENT is rule 0 and the sharpest tense delta in the level. It is shown three times
in displays — S01 `seit drei Tagen`, S06 `seit gestern`, S10 `seit einem Jahr` — because the shape
has to be met with a stretch, with a point and outside the surgery before it stops feeling like a
medical idiom. The mistake block on S01 is `Ich habe Kopfschmerzen für drei Tage`, which is the
word-for-word English and which a German hears as a headache with a scheduled end.

Rule 1 is M6's dative reflexive one module later, and the two modules were written to make that
visible: S03's `Ich habe mir den Arm gebrochen` is `Ich wasche mir die Hände` with a different verb.
The mistake block earns its place exactly where the brief said it would — `Mein Rücken tut weh` is
not ungrammatical, and it is still not the sentence, so S02 carries it as a `mistake` rather than as
a `trap`.

Rule 3 collects the dative-experiencer family for the fourth time (`Mir ist kalt`, `Mir ist
schlecht`, `Mir tut der Kopf weh`, `Was fehlt Ihnen?`) and says in one line that the person is never
the subject. `fehlt` is the only genuinely new member and its row says what it means with a dative
person. The register is `formal` on the two surgery sentences (S04, S05) and neutral elsewhere: the
complaint itself is what you say to anyone.

### L3-M8 "Money and paperwork" — two grammars in one module, and why they fit

The genitive and the relative clause fit in one module for the reason the brief named: the relative
pronoun is spelled exactly like the definite article in every cell this level needs, and `der`,
`die`, `das`, `den` and `dem` are all **L1-M1**'s and **L1-M7**'s. **The module opens no pronoun row
at all** and writes rules 3 and 4 instead. Only the dative plural `denen` is fresh, and it gets the
one row (S03); `dessen` and `deren` stay out of the level.

The genitive is authored in its honest version. Rule 0 gives the forms and then says that ordinary
speech mostly says `von` plus the dative instead — which is already the learner's, because L2-M2
taught `der Bruder von Anna` — and S01's variation writes the spoken version next to the written one
rather than hiding it. Rule 1 carries the weak masculine class, because L2-M2 had already met its
edge when it had to write `Herrn`; the pool's C12 shows `das Büro des Kollegen`, which is the form
that class exists to explain.

Rule 2 is the honesty entry, in the register L2-M9 used for `größer wie`: spoken German puts `wegen`
with the DATIVE constantly, and S04's variation writes `Wegen dem Vertrag` beside the genitive
display. Neither is presented as wrong; the genitive is presented as what the form is written in.

Three genitive shapes of nouns the module does not own took their own rows, which is the law about a
new shape of an older lexeme: `Problems` (S07) points back at **L2-M8**'s `Problem`, `Tages` (S08)
points back at **L1-M4**'s `Tag`, and `Monat` — which nobody owned — takes a full row with `Monats`
and `Monate` in its forms.

### L3-M9 "Festivals and everyday culture" — two impersonals, one bracket

`man` comes first because it is what a learner will actually produce, and rule 0 says the thing that
makes it usable: it is completely ordinary, the stiff English `one` is not what it sounds like, and
the verb is always singular. Two displays are built on it, two more variations and three
pool items, so a learner meets it seven times before the module ends.

The passive is rule 1 and it is deliberately not given a new diagram: `werden` in position two and
the participle at the very END is **L2-M1**'s bracket for the fifth time in the course, and the rule
says so instead of drawing it again. `werden` is a three-job key on one row — become, passive
auxiliary, and the future auxiliary this course has never needed — with a note true of all three and
a mnemonic that tells them apart by what follows: an adjective means becoming, a participle at the
end means the passive. S08's `Es wird im Sommer sehr warm` and S02's `Das Fest wird im Dezember
gefeiert` put both readings in displays one page apart. The past passive, the `von`-agent and the
`sein`-passive are named in rule 3 as L4-M7's and appear nowhere.

Culture is described and never explained (rule 4). No display names a festival, a country or a
region, and the two ways the module has of saying where — `Hier` and `Bei uns`, both in S01's
variations — are exactly what the brief asked for: they say what happens where you are standing and
leave the rest of the map alone.

### L3-M10 "Your own story" — the exit test the level was building

Ten accounts of three or four sentences each, well under the eight-sentence ceiling, and every one of
them is a collision test rather than a topic. S01 puts all three pasts in one account with each doing
what the other two cannot: `hatte gearbeitet` first, `hat angerufen` second, `war` holding the state
across both. S02 fronts a `weil` clause so the two verbs meet across the comma (M3's shape). S04 is
reported speech with no backshift (M5). S05 is a condition and a piece of advice in Konjunktiv II
(M4). S06 is a reflexive feeling (M6), S07 is `seit` and the surgery (M7), S08 is the relative clause
and the genitive (M8), S09 is `man` and the present passive (M9), and S10 tells the same three
sentences to a friend and — in its variation — to a stranger, `du` against `Sie`, which is where
L2-M1 began.

The register chips are the level's last statement: S10 is `informal` and its variation is the `Sie`
version of the identical story, with nothing else moved.

### The seams the briefs got wrong, and what the index actually said

Every one of these was checked against the emitted index (folded through `cumulativeThrough`) and
against `npm run content:shown` before a line was written.

- **`Termin` is L3-M4's, not M7's.** M7's seam lists it as a fresh key. The index says
  `L3-M4` owns it — Wave 2 minted it for `Ich hätte gern einen Termin`. M7 therefore opens **no row**
  for it: S05 shows `Ich brauche einen Termin beim Arzt` and the usage line names L3-M4 as the owner.
- **`Woche` is L3-M1's, not M8's.** M8's seam lists `Woche` among its fresh keys and M9's brief names
  it in its vocabulary. The index says `L3-M1` minted it, on its own S01 row. No row is opened
  in either module; M8-S08's variation uses `während der Woche` and the sentence resolves to L3-M1.
- **`Jahr` moved from M8 to M7.** M8's seam claims `Jahr` and `Jahre`. But M7's own rule 0 is built
  on the brief's own example `Ich wohne seit einem Jahr hier`, and en-de allows exactly one row per
  surface, so the module that SHOWS it first has to own it. M7 opens `Jahr` with `Jahre` and `Jahren`
  in its forms; M8 keeps `Monat` and never shows a year.
- **`Hand` and `Hände` moved from M7 to M6.** M7's seam lists both. M6's note 3, though, requires the
  dative-reflexive minimal pair on one verb, and the pair German actually uses is
  `Ich wasche mich` / `Ich wasche mir die Hände`. One row can only sit in one module: **M6 opens
  `Hände`** (with `Hand` in its forms) as part of that pair, and M7 shows `Mir tut die Hand weh` in
  S09's variation with the note pointing back at M6. The brief's other body parts — `Rücken`, `Arm`,
  `Bein`, `Hals` — are all M7's as written.
- **`bei` and `beim` are minted at M7, and no seam names them.** Three of this wave's modules need
  the word — `beim Arzt` (M7), `bei der Bank` (M8), `Bei uns` (M9-S01's variation, a pattern the M9
  brief lists) — and none of the three seams mentions it, because each brief assumed a later module
  would. First need wins: M7-S05 opens one row, `beim` with `bei` in its forms, and the note names
  the `zum`/`zur` fusion L2-M2 already taught.
- **A month had to be MINTED, because a proper noun raises the ratchet.** M9's patterns are written
  `im + <month>` and its note 4 says festival names are proper nouns that never index (#61). On
  en-de, though, an unindexed proper noun in a display is exactly what the shown-but-untaught count
  counts — the standing 11 are `thomas`, `meyer` and their neighbours — so a bare `Weihnachten` or a
  bare `Dezember` in a display would have raised the baseline this wave is forbidden to raise.
  **No display in M9 names a festival at all**; every sentence anchors on `das Fest`, `der Feiertag`
  or `der Geburtstag`, and `Dezember` takes an ordinary row so that `im Dezember` resolves.
- **`vielen` is L2-M1's**, from `vielen Dank`. The first draft of M9's `viele` row listed `vielen` in
  its forms and `npm run content:shown` reported the collision immediately; the row now lists `viele`
  alone, which is also what the brief meant when it said `viele` is a separate key from L2-M6's
  `viel`.
- **M10's "ideally ZERO new words" is not reachable, and the schema is why.** `deconstruction.words`
  has `minItems: 1`, so ten sentences need ten rows; en-de asserts one row per surface, so a row on
  an already-taught word would be a re-teach and a defect. Ten NEW keys is therefore the floor, not
  the target. The wave spends them on ten discourse words and **not one noun**: `alles`, `wieder`,
  `eigentlich`, `nur`, `sofort`, `endlich`, `plötzlich`, `zum Glück`, `damals` and `früher`. Every
  one of them is what an account needs to stop being a timetable, and `früher` is the module's only
  `delta` row because English needs a verb (`used to`) where German needs an adverb.

### The ratchet

`tools/shown-surfaces.test.ts` held at **en-de 11** across all five modules and the strict build's
report for the course is unchanged, word for word, from the one Wave 2 left. Four findings fired
while the modules were drafts and all four were routed around rather than minted:

- `beim` (M7's pool) — fixed by opening the row the three modules all needed, above.
- `letzter`, `ausfülle`, `fülle` and `meinem` (four M8 variation displays) — `ausfülle` and `fülle`
  were added to the `ausfüllen` row's forms, since they are that verb's own paradigm; `letzter` and
  `meinem` were routed around, because they are adjective and possessive cells nobody has opened.
- `Geschenken` and `isst` (M9) — `Geschenken` went into the `Geschenk` row's forms; `isst` was
  routed around entirely, and rule 0's illustration was rewritten from `Hier isst man um zwölf` to
  `Hier geht man um acht nach Hause` so that the rule text and the ladder agree.
- `vielen` — the collision described above.

The class Wave 2 named is still the one that fires: **a verb the ladder owns in its citation form
and in one participle, reached for in a person-form nobody has opened.** This wave avoided
`kauft`, `braucht`, `isst`, `arbeitet`, `musste`, `geschlafen`, `geworden` and `tat` by routing the
sentence around them — `Jeder kommt mit einem Geschenk` rather than `Jeder kauft ein Geschenk`,
`Ich wäre lieber zu Hause geblieben` rather than anything built on `geschlafen`. Minting a person
form to save a sentence is how a wave spends its cap on nothing.

One shared file is left untouched and is named here so it is not mistaken for a content failure:
`src/course/types.test.ts` carries a literal list of the module files that existed before this wave
and will be red on the census until the merge updates it. That list is not this wave's to edit, and
neither is `content/en-de/levels.json`, whose `hasContent` flags for L3-M3..M10 the merge owns.

### Open questions for the native pass

33. **`sich freuen auf` against `sich freuen über`** (M6-S01). The module teaches `auf` for something
    still coming and `über` for something that has happened. Confirm a speaker really keeps them
    apart in conversation, and that `Ich freue mich über deine Nachricht` is what you say about a
    message that has already arrived.
34. **`Ich fühle mich wohl`** (M6-S03). Confirm `wohl` is comfort rather than health, that
    `Ich fühle mich nicht wohl` is the ordinary way to say you are unwell before you would say
    `krank`, and that `Mir ist nicht gut` has not displaced it.
35. **`Ich mache mir Sorgen um`** (M6-S08). Confirm `um` rather than `über` with `Sorgen`, and that
    the phrase is what a parent says rather than a written formula.
36. **`zufrieden` against `glücklich`** (M6-S10). The module's claim is that `zufrieden` is quiet
    contentment and that reaching for `glücklich` about a piece of work sounds much larger than an
    English speaker means. Confirm, and confirm `zufrieden mit` takes the dative in speech.
37. **`nervös` and `aufgeregt` together** (M6-S09). Confirm they are not the same word — that
    `aufgeregt` can be good news and `nervös` cannot — and that listing three feelings in one
    sentence is natural rather than literary.
38. **`Mir tut der Rücken weh` against `Ich habe Rückenschmerzen`** (M7-S02). The module prefers the
    dative sentence and treats `Mein Rücken tut weh` as the learner's error. Confirm the preference,
    and say which of the two a patient actually opens with at the surgery.
39. **`Was fehlt Ihnen?`** (M7-S04). Confirm this is the question a doctor asks rather than
    `Was kann ich für Sie tun?`, and that `Was fehlt dir?` is what a friend says.
40. **`Ich bin erkältet`** (M7-S07). Confirm the adjective is the everyday form and that
    `Ich habe eine Erkältung` is the heavier one, and that `Hals` covers the sore throat a patient
    means without `Halsschmerzen`.
41. **`seit` with a point and with a stretch** (M7-S01, S06). Confirm `seit gestern` and
    `seit drei Tagen` are equally ordinary, and that no speaker reaches for `für` in either.
42. **`wegen dem` in speech** (M8-S04). The module writes the genitive in the display and the dative
    in the variation, and says both are heard. Confirm the split is a register split rather than a
    regional one, and that writing `wegen des Vertrags` on a form is still expected.
43. **`überweisen` against `bezahlen`** (M8-S03, S06). Confirm `überweisen` is the ordinary verb for
    paying a bill or a rent from an account, and that `Ich bezahle die Miete` is what a speaker says
    about the same act when the mechanism is not the point.
44. **`das Amt`** (M8-S04). Confirm the bare `Amt` is what people say for the office they are going
    to, rather than the full `Bürgeramt`, and that `zum Amt gehen` is idiomatic.
45. **`man` and its reach** (M9-S01, S10). The module's strongest register claim: that `man` is
    completely ordinary and carries no stiffness. Confirm, and confirm `Bei uns` is heard as "where
    I am from" rather than as "at our house".
46. **The present passive in speech** (M9-S02, S07). Confirm `Das Fest wird im Dezember gefeiert` and
    `Am Feiertag wird nicht gearbeitet` are said aloud rather than only written, and whether `man`
    has taken over both in conversation.
47. **`Geburtstag` and the wish before the day** (M9-S10). The row says congratulating anyone before
    the day is widely avoided. Confirm that this holds across the German-speaking area, or name where
    it does not.
48. **`früher` for `used to`** (M10-S10). Confirm `Früher habe ich hier gearbeitet` is the natural
    way to say it and that no speaker reaches for a construction with `pflegen`.
49. **The account length** (M10, every item). Each display is three or four sentences where the brief
    allows eight. Confirm that this is what somebody actually tells at a bus stop, and name the item
    that reads as a written text rather than as speech.
50. **`Zum Glück` and `Eigentlich` as openers** (M10-S03, S08). Confirm both are ordinary sentence
    openers in speech, and that `eigentlich` reads as the soft contradiction the note claims rather
    than as filler.
