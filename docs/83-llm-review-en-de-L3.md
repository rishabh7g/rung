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
