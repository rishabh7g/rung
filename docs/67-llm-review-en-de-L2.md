# en-de L2 — LLM review

The review that clears each en-de L2 wave to ship, written in the same change that authors it
(`CLAUDE.md`, "Ship `verified: true` in the authoring change"). The **native-speaker gate is a
separate, stricter bar and stays unmet**: every section below ends in open questions for a native
pass, and no later wave may close one of them by rewriting a shipped module.

Open questions are numbered as a fresh en-de L2 chain from 1.

## Wave 1 — L2-M1, L2-M2 (#441)

Authored against the briefs written by #432 and the decisions recorded in `docs/59`.

### L2-M1 "Asking politely" — the most expensive register decision in the repo, paid

L1 spoke `Sie` and said in advance why it could afford to: `Sie` takes the PLURAL verb, so its form
is spelled exactly like the infinitive and cost the index **nothing at all**. `du` costs a second
set of endings (`bist`, `hast`, `kannst`, `möchtest`, `sprichst`), its own imperative (`komm`,
`geh`, `gib`, `hilf`) and `dein`, `dich`, `dir`. This module pays all of it, in one wave.

The grammar is the **modal bracket**, and it is the biggest single word-order delta in the course:
the modal sits in position two and its infinitive goes to the very end of the clause, with
everything else in between. M4's directions, M6's suggestions, M7's calls and M8's requests all
borrow the frame, so the module authors it in both addresses and lets the pool test where the
infinitive lands.

The dative arrives with the request, and the module says the thing that turns three idioms into one
pattern: L1-M9's `Mir ist kalt` was already a dative sentence with no grammatical subject, and
`Wie geht es dir?` is the same shape. `könnten` enters as **one frozen cell** of Konjunktiv II, the
treatment en-fr gives `je voudrais` and en-it gives `vorrei`.

### L2-M2 "Describing people"

The module **opens no row for `sie`** in any of its three readings — L1-M2 owns the key with a note
already true of all three — and restates the separating rule where it finally matters: the VERB
tells you which, because the index cannot see the capital and never will.

The possessive "her" is taught on **`ihre` alone**, which is a key nothing else holds, because L1
deliberately kept the possessive `ihr` out so `Ihr Name` could own the polite "your". Where a
masculine possession is needed the sentence takes the `von` periphrasis — ordinary spoken German,
not a workaround.

Every adjective in the level stands after `sein` and takes no ending, and the module says so as a
decision rather than leaving it to look like an oversight: an attributive adjective has to be
declined, and the declension is L3's.

### A test the L2 arrival required, and one row it forced

`src/course/types.test.ts`'s en-de case (#361) held two L1 decisions over every en-de module — the
`du`-register ban across every slot including mistake plates, and the flat `neutral` register chip.
Both are exactly what L2-M1 is chartered to lift, and both are now scoped to L1 with comments
recording why. The lost-capital check needed a narrower cut rather than a scope: L2-M2 opens the
**lowercase** possessive `ihre`, so that one word leaves the ban at L2 while `Ihr` and `Ihnen` keep
their capitals everywhere.

This is the third time this milestone a second level has exposed a test encoding the level as well
as the rule (hi-en's possessive `'s`, en-fr's `tu` ban, en-it's ladder comparator were the others).

One row the brief does not list: **`Herrn`**. `Herr` adds `-n` everywhere but the bare subject, so
`die Frau von Herrn Weber` needs it — and the alternative was a sentence about a wife called
Herr Weber, which the first draft had.

### The ratchet

Six findings across the pair, each fixed by opening the row the module needed. The en-de baseline
stays at 11.

### A red on main that is not this wave's

`scripts/verify.sh` fails one test on `main` at `d027f2d`: the splash byte-for-byte comparison
introduced by #502 is rasteriser-dependent rather than font-dependent, and this container's libvips
differs from whichever machine produced the committed PNGs. Filed as #506, with the evidence.
Everything else is green: `TYPES ok | LINT ok | TEST 444/444 ok (excluding it) | CONTENT ok |
FONTS ok | BUILD ok | BUDGET ok`.

### Open questions for the native pass

1. **The `du` law** (M1, rule 0). Confirm the framing — `Sie` never wrong with a stranger, `du` for
   friends, family, children and people who have offered it — matches current usage.
2. **`Können Sie mir bitte helfen?`** (M1-S01). Confirm the word order with `bitte` before the
   infinitive is the ordinary one.
3. **`Könnten` against `Können`** (M1-S03). Confirm the tier is real in speech rather than only in
   writing.
4. **`Entschuldigung` against `Es tut mir leid`** (M1-S08, S09). Confirm the split, and whether
   `Verzeihung` is worth a later mention.
5. **`Gern geschehen`** (M1-S10). The module says `bitte` is what people mostly say. Confirm.
6. **The `du` imperative without a pronoun** (M1-S07). Confirm `Komm bitte` is a request rather than
   an order, and that `bitte` is doing all of that work.
7. **`ihre` for "her"** (M2-S04). Confirm the lowercase possessive is unambiguous in context, given
   that `Ihre` is only a capital away.
8. **The `von` periphrasis** (M2-S10). Confirm `die Frau von Herrn Weber` is at least as ordinary as
   `Herrn Webers Frau` in speech.
9. **Predicative-only adjectives** (M2, rule 2). Confirm a learner restricted to `Er ist groß` and
   `Seine Haare sind kurz` can describe people usefully without the attributive declension.
10. **`mein Freund`** (M2-S08). Confirm Germans hear the boyfriend reading first, and that
    `ein Freund von mir` is the ordinary repair.

## Wave 2 — L2-M3, L2-M4, L2-M5 (#450)

### L2-M3 "Describing things" — the grid, and what it buys

L1 shipped `der`, `die`, `das`, `den`, `dem`, `ein`, `eine`, `einen`, `einem` and the `kein` series
across five modules without ever laying them out. M3 is where they become a table, and the table is
worth a module only because of what it buys: **word order is free in a way English's is not**. `Den
Apfel esse ich` is an ordinary sentence — `den` says the noun is the object, so its position no
longer has to. That is the deepest structural delta in the course, and it is only available once the
grid is on one page.

Adjectives stay **predicative** throughout — `Das Auto ist rot`, where they take no ending at all.
The attributive declension (`ein guter Mann`, `der gute Mann`, `guter Wein`: three declensions
chosen by what stands in front) is too large to sit beside a module teaching colours, and it is said
to belong to L3 rather than left looking like an oversight.

`weiß` and `Straße` carry the `ß` and the index KEEPS it, so `Maße` and `Masse` are two keys. The
module's mistake plates spell the respellings out — `Das Auto ist weiss`, `Die Strasse ist sehr
breit` — which is the one place a `ss` is allowed to appear (see below).

### L2-M4 "Getting around" — two-way prepositions

`in`, `auf`, `an`, `über`, `unter`, `vor`, `hinter`, `neben` and `zwischen` take the ACCUSATIVE for
motion and the DATIVE for location, and the case is the whole difference: `Ich gehe in den Park`
against `Ich bin in dem Park`. L1-M7 shipped both seats of `in` without naming the rule; this is
where it is named.

Separable verbs are kept **unsplit behind a modal** — `Ich möchte einsteigen`, never `Ich steige
ein` — for an index reason as much as a pedagogical one: a stranded `ein` folds onto L1-M1's
article row and the note a learner would be shown is about "a", not about boarding a train.

Transport splits three ways and the module takes all three: `mit` + dative for a vehicle, `zu Fuß`
for walking (never `mit Fuß`), and `nach` for a destination that is a place name.

### L2-M5 "Food and hosting" — the refusal that is taken at face value

This is the one module in the milestone whose culture note points the OPPOSITE way from its
siblings. hi-mr, hi-en, en-ru and en-it all teach that a first refusal is a ritual and a host will
offer again. **A German refusal is taken at face value.** `Nein danke, ich bin satt` ends the offer,
and a learner who has internalised the other courses' hosting will go hungry. `Zusammen oder
getrennt?` is asked at every German table and a learner who has never heard it freezes at exactly
the wrong moment.

`noch` is the offer word — `Möchten Sie noch Kaffee?` — chosen deliberately so `mehr` stays free for
M9's comparatives. The teaching sits in the trap rather than a word row, because M2-S07 already owns
the `noch` key (see below).

### Three unreachable rows the duplicate check caught

`src/course/types.test.ts` asserts that every en-de surface has exactly ONE row that opens it,
because first-occurrence-wins makes a second row a note nobody will ever be shown. This wave tripped
it seven times, and every one was fixed in content rather than by widening the allow-list:

- `der` (M3-S06) — L1-M1 owns it. The sentence's teaching is the feminine DATIVE `der Kollegin`
  against the masculine nominative `der Kollege`, so the sentence was rebuilt on `Kollegin`, a free
  key, and the minimal pair is now on one noun stem rather than two.
- `essen` (M5-S09) — L1-M3 owns it, because the fold merges `das Essen` and `essen`. That fact is
  already rule 3 of the module, so the row was free to teach `lecker` instead, which is the word a
  host actually wants to hear.
- `blau`, `grün`, `lang`, `kurz` (M3) — all four are M2's, opened for eyes and hair. M3-S09 was
  rebuilt on `breit`/`schmal`, the dimension M2 never took.
- `Auto` (M4-S06) and `noch` (M5-S05) — M3 and M2 own them; the rows were dropped and the notes
  fold into prose that was already carrying them.
- `Löffel` (M5-S10) — M3 owns it. The table setting took `Messer`, which makes the point better
  anyway: `der Löffel`, `die Gabel`, `das Messer`, three genders at one setting and no rule behind
  it.

### One test change, and why it is not a loosened check

The ß check (`heisse|strasse|gross|weiss` never appears) reached mistake plates too, and M3's plates
have to WRITE the respelling in order to strike it out. The exemption is narrow: a mistake display
is let through only when its own `why` carries a real `ß`. A plate that respells without correcting
it still fails, which is the defect the check exists for.

### The ratchet

`tools/shown-surfaces.test.ts` held at **en-de 11** across all three modules. One finding —
`vielleicht`, from M5-S06's hedge variation — was fixed by opening the row the module's own brief
names, not by raising the baseline.

### Open questions for the native pass

11. **Free word order** (M3, rule 1). Confirm `Den Apfel esse ich` is ordinary rather than marked,
    and that a learner producing it unprompted sounds natural rather than emphatic.
12. **`der Kollegin`** (M3-S06). Confirm the fronted dative recipient is what a speaker reaches for
    when the recipient is the point, and that `Der Kollegin gebe ich das Buch` needs no more context
    than it has.
13. **Predicative-only through a whole colour module** (M3, rule 2). Confirm a learner who can only
    say `Das Auto ist rot` can describe things usefully, and that deferring the attributive
    declension to L3 does not leave them sounding foreign in ordinary speech.
14. **`breit`/`schmal`** (M3-S09). Confirm both are the everyday words for a street's width.
15. **Two-way prepositions** (M4). Confirm the accusative-for-motion / dative-for-location split is
    stated at the right grain, and that nine prepositions is not too many for one module.
16. **Separable verbs behind a modal** (M4). Confirm `Ich möchte einsteigen` is ordinary, and that
    never showing the split form at this level is safe rather than misleading.
17. **`zu Fuß`** (M4-S06). Confirm `mit Fuß` is the mistake an English speaker actually makes.
18. **The refusal taken at face value** (M5, rule 1). This is the wave's strongest cultural claim
    and the one most worth checking. Confirm a host offers once or twice and stops.
19. **`Zusammen oder getrennt?`** (M5, rule 2). Confirm it is asked as routinely as the module says,
    including when the party is obviously together.
20. **`noch` against `mehr`** (M5-S05). Confirm `Möchten Sie mehr Kaffee?` is wrong rather than
    merely unusual, and that the article-less `noch Kaffee` is the ordinary offer.
21. **`lecker`** (M5-S09). Confirm it is the compliment a host expects, and that `sehr gut` reads as
    flat beside it.
22. **`satt`** (M5-S06). Confirm it is neutral rather than blunt, and that `voll` of a person who
    has eaten is genuinely wrong.

## Wave 3 — L2-M6 … L2-M10 (#459)

The level closes. A strict `npm run build` emits `en-de: 20 modules (L1-M1..M10, L2-M1..M10)`, and
en-de is the eighth of nine courses with a complete second level.

### L2-M6 "Making plans together" — the verb holds second place

The module's grammar is that **the verb is SECOND in a main clause and "second" counts PHRASES**.
Front a time and the subject moves behind the verb: `Am Samstag gehe ich ins Kino`, never `Am
Samstag ich gehe`. English fronts a time and changes nothing, which is what makes this worth a
module rather than a footnote — and it pays off three more times before the level ends (M9's `Am
liebsten trinke ich Tee`, M10's whole account architecture).

The companion rule is one line and nobody ever states it: **time comes before place.** `Am
Donnerstag fahre ich nach Berlin`, and the English habit is the reverse.

And then the trap that makes learners miss trains: **`halb neun` is half past EIGHT.** German counts
toward the hour that is coming. There is no rule beyond the direction of the counting, and saying
that plainly is worth more than a table. `Viertel nach` and `Viertel vor` behave like English and
are deliberately shown beside it so the over-correction does not happen either.

Register: `du` and `wir` throughout, `informal` where the frame is du-only. M4 and M7 speak `Sie`
and this module deliberately does not — an invitation in `Sie` reads as a business appointment.

### L2-M7 "On the phone" — the surname, and the tense that is not there

The German telephone convention is a genuine cultural fact and it is the module's first sentence:
**the person answering says their SURNAME** and the caller opens with `Guten Tag, hier ist …`. Every
word was L1-M2's already; only the convention is new. A learner who does not expect a bare surname
thinks they have dialled wrong.

The delta German shares with French and not with Italian: **there is no continuous tense.** `Ich
spreche` covers "I speak" and "I am speaking" alike, and `gerade` is an adverb doing a tense's job
when "right now" matters. en-it's M7 is where a phone call finally motivates a progressive; this is
where the absence of one has to be stated, and the two briefs should be read together.

`Auf Wiederhören` is `Auf Wiedersehen` with the seeing swapped for hearing — a small joke the
language makes that a learner remembers for years. It rides as a two-token surface beside L1-M2's,
the multi-token tool keeping `auf` on L1-M4's row.

`hinterlassen` is the useful contrast to `anrufen` and `zurückrufen`: it looks separable and is not,
because `hinter-` is never stressed. The stress, not the spelling, is the rule.

### L2-M8 "When something goes wrong" — the dative list, and kein against nicht

**`helfen` takes the dative**, and it heads a short closed list — `helfen`, `danken`, `gefallen`,
`gehören`, `passen` — that no rule predicts membership of. `Können Sie mir helfen?` is M1's bracket,
M1's dative and M3's case in one sentence, which is the article grid earning its keep a second time.

`Mir ist schlecht` has **no grammatical subject at all**, and L1-M9 already shipped one of these
(`Mir ist kalt`) without naming the pattern. Naming it here makes the family fall out at once, and
`Ich bin schlecht` — "I am a bad person" — is one of the costliest one-word slips in the course.

**`kein` against `nicht`** is one of the few German rules with a clean statement, and L1 shipped both
halves without ever making it: `kein` negates a noun that would take `ein` or no article, `nicht`
negates everything else. The mistakes are spent here.

Complaining calmly is a register lesson and German's answer is closer to Russian's than to English's:
the softening is the OPENING (`Entschuldigung, …`) and the word `leider`, not a weakening of the
claim. `Es funktioniert nicht` is normal and is not rude.

### L2-M9 "Comparing and choosing" — a preference with no verb for it

The comparative is `-er` and the standard is `als`. Two German particulars make it more than an
English lookalike: many one-syllable adjectives take an **umlaut** (`alt → älter`, `groß → größer`,
`jung → jünger`, `lang → länger`) and the fold KEEPS umlauts, so each comparative is a surface of its
own; and the predicate superlative is `am -sten`, which takes no adjective ending and so fits inside
this level's predicative-only rule.

**`als` against `wie`** is the mistake block, and the module says honestly that native speakers
produce `größer wie` constantly in speech, particularly in the south. A learner who hears it in
Germany and then reads a rule pretending it never happens stops trusting the course.

The module's best delta: **German states a preference with an ADVERB, not a verb.** `Ich trinke
lieber Tee` is "I prefer tea" — literally "I drink more gladly tea" — where English needs the verb
and Spanish `preferir`. `gern` (M1's), `lieber`, `am liebsten`: one word, three rungs, and the whole
preference system is that.

`welcher`/`welche`/`welches` and `dieser`/`diese`/`dieses` take the same endings as `der`/`die`/`das`,
so choosing is M3's grid a third time rather than a new system.

### L2-M10 "Telling what happened" — the Perfekt, and the relief

The decision of the module is the true description of spoken German rather than a simplification:
**the Perfekt is the spoken past for nearly every verb** — auxiliary in position two, participle at
the very END, which is M1's bracket for the fourth time — **and `sein`, `haben` and the modals prefer
the Präteritum**: `war`, `hatte`, `konnte`, `wollte`. That is exactly why L1-M5 shipped `war`,
`waren`, `hatte` and `hatten` and no participle for either.

The auxiliary law is meaning, not shape: `sein` for movement and change of state, `haben` for
everything else. `geblieben` is the one worth naming, because staying is not movement and takes
`sein` anyway.

And the relief, said out loud because three courses in this repo say the opposite: **the German
participle never agrees with anything.** en-es, en-fr and en-it all make theirs agree in one
auxiliary or the other. A learner arriving from any Romance language will otherwise spend weeks
hunting a rule that is not there.

Separable participles wrap the `ge-` INSIDE — `angerufen`, `eingestiegen`, `aufgestanden` — and that
is the one place a separable verb appears in this level without a modal in front of it. It is still
one clean token, so M4's ruling holds.

### Seven more rows the index had already spent

The duplicate check fired again across this wave, and again every hit was fixed in content:
`kommen` (L1-M1's — M8 opened `kommt` instead and pointed back), `warm` (L1-M9's — M10-S10 took
`wärmer`, which ties M9's umlaut comparative into the account), `dass` and `zusammen` (L1-M9's and
M5's — both fold into traps that were already carrying them), and `ist` (L1-M1's, caught while
adding auxiliary forms). The pattern by now is settled: when the key is spent, the sentence is
rebuilt on one the module can hold, or the teaching moves into prose.

### The ratchet

`tools/shown-surfaces.test.ts` held at **en-de 11** across all five modules — the same baseline the
level opened with. Roughly thirty findings came up across the wave and every one was fixed in
content: rows opened where the module owned the teaching (`meinen`, `Stadt`, `kommt`, `vergessen`,
`am -sten` as a family of forms), and variations rewritten onto taught surfaces where they did not
(`könnte`, `für`, `Telefonnummer`, `Computer`, `Tasche`, `Zimmer`, `dabei`, `mehr` before M9 owned
it).

### A provenance field, corrected

The five modules of #450 and #459 carry `"verifiedBy": "LLM review, authorised by repo owner"` —
the form already used by en-ko's L1 — rather than naming a model. The claim the field makes is about
the AUTHORITY behind the review, and that is the repo owner's either way; the model name adds
nothing a reader of the content needs. M1 and M2 keep what they shipped with.

### Open questions for the native pass

23. **Verb-second with a fronted time** (M6, rule 0). Confirm `Am Samstag gehe ich ins Kino` is the
    ordinary way to say it and not a marked one.
24. **`halb neun`** (M6-S04). Confirm nobody hedges this in speech — that a German saying `halb
    neun` always means 8:30 and never 9:30, in any region.
25. **`Hast du Zeit?` against `Bist du frei?`** (M6-S02). Confirm the split, and that asking a friend
    `Bist du am Mittwoch frei?` really does read oddly.
26. **`Abgemacht`** (M6-S10). Confirm it is warm rather than businesslike between friends.
27. **The surname answer** (M7, rule 0). Confirm it is still the norm on a landline and on a mobile
    when the number is unknown, and whether a younger speaker now answers with `Hallo?`.
28. **`hier ist`** (M7-S01). Confirm `das ist` is genuinely wrong on the phone rather than merely
    unusual.
29. **`Kann ich bitte Frau Weber sprechen?`** (M7-S02). Confirm the accusative version without `mit`
    is what a switchboard expects.
30. **`ausrichten` against `hinterlassen`** (M7-S05). Confirm the seats — that the one answering says
    `ausrichten` and the caller says `hinterlassen`.
31. **The dative verb list** (M8, rule 0). Confirm `helfen`, `danken`, `gefallen`, `gehören`,
    `passen` is the right five to teach as the list, and nothing commoner is missing from it.
32. **`Mir ist schlecht`** (M8-S04). Confirm `Ich bin schlecht` really does land as a statement about
    character, which is how the trap sells it.
33. **`kaputt`** (M8-S09). Confirm it is neutral to a landlord and carries no informality an English
    ear would hear in it.
34. **`Der Bus kommt leider nicht`** (M8-S08). Confirm `leider` inside the sentence is where a
    speaker puts it.
35. **`größer wie` in speech** (M9, rule 1). Confirm the module is right to say this openly, and that
    the regional picture is as described.
36. **`lieber` and `am liebsten`** (M9-S04, S05). Confirm there is genuinely no everyday verb for
    "prefer" at this level, and that `bevorzugen` is as formal as the omission assumes.
37. **`dieser` against `der`** (M9-S09). Confirm `dieser` is heavier than English "this" and that a
    learner over-using it sounds translated.
38. **The Präteritum/Perfekt split** (M10, rule 0). The wave's strongest structural claim. Confirm
    `war`, `hatte`, `konnte` and `wollte` are what people say, and that `ich bin gewesen` and `ich
    habe gekonnt` are as rare in speech as the module claims — including in the south, where the
    picture is said to differ.
39. **`geblieben` with `sein`** (M10-S04). Confirm the "change of where you are" framing is a fair
    way to remember the list rather than a rationalisation.
40. **The four-sentence account** (M10-S10). Confirm three fronted words with the verb second in each
    reads as natural narration and not as a drill.
