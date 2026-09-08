# en-de L5 — LLM review

The L5 authoring record for `en-de`. Each wave adds its own section: the modules it shipped with
their ten displays, the brief seams it had to correct against the emitted index, the ratchet, and
numbered open questions for the native-speaker pass, continuing the chain `docs/110` opened.

The index every claim below was checked against is the one `npm run content:owner -- en-de` prints
today: **945 surfaces, folded over 40 modules through `L4-M10`, `maxSpan` 3** — the whole authored
ladder L1-M1..L4-M10, nothing of L5 in it. That is the same number `docs/110` §3 and both L5-M1 and
L5-M2 briefs quote, so for once the seam count in the brief is not stale. What *is* stale is four
of the individual ownership claims, and they are set out in full below; three of them would have
shipped an unreachable row and one would have shipped a display no row could resolve.

The native-speaker gate is **unmet**. Every question in this file is open, and none of them may be
closed by editing a shipped module.

## Wave 1 — L5-M1, L5-M2 (#579)

The level's RANGE modules: the two rungs that stop German meaning the sum of its words. L5-M1 makes
a phrase a lexical unit; L5-M2 makes a sentence mean its opposite. Both are M1–M3 rungs, so all five
enrichment blocks ride every one of the twenty sentences, and en-de's own law — every sentence
carries a `sound` line — is met on all twenty.

### L5-M1 "Sayings and idioms" — the phrase as one word, and the reading with no error in it

The ten displays:

1. `Ich habe die Nase voll von der Arbeit.`
2. `Das ist eine Redewendung und kein Sprichwort.`
3. `Die Redewendung heißt wörtlich „die Nase voll“, aber sie bedeutet genug.`
4. `Ich verstehe hier wirklich nur Bahnhof.`
5. `Da drücke ich dir die Daumen.`
6. `„Schwein gehabt“ sagt man, wenn man Glück hatte.`
7. `Ich möchte das lieber unter vier Augen sagen.`
8. `Jetzt sind wir endlich über den Berg.`
9. `Übung macht den Meister, sagt man bei uns oft.`
10. `Man kann hier leicht den Faden verlieren.`

What it teaches. Seven fixed expressions, each indexed as a **whole span** so that a learner's tap
lands on the phrase and not on a noun: `die Nase voll`, `nur Bahnhof`, `Schwein gehabt`,
`unter vier Augen`, `über den Berg`, `den Faden verlieren` — plus one proverb,
`Übung macht den Meister`, which is four tokens and therefore *cannot* be a span (see the seams),
so it is written as a sentence with its three content words indexed singly. Around them the module
teaches the metalanguage that lets a learner ask about the eighth expression unaided —
`Redewendung`, `Sprichwort`, `wörtlich`, `bedeutet` — and it opens `verstehen`, the verb the whole
ladder reached L4-M10 without ever teaching in the present.

The six rules split the two kinds (rule 1: a proverb is a whole sentence, an idiom is a phrase that
takes a tense around it), name the fixedness (rule 0), and carry the two interference plates the
brief demanded: the near-twin that is not one — English crosses fingers, German presses thumbs
(rule 4) — and the expensive one, that `Ich verstehe nur Bahnhof` parses perfectly as *I only
understand station*, so the wrong reading arrives **with no error signal in it** (rule 3). Rule 5 is
the module's handover move: `Das sagt man, wenn …`, the phrase plus the occasion that licenses it.

Held back, as the brief instructs: irony (L5-M2), implicature (L5-M7), regional variants (L5-M3).
The L4-M5 particles — `doch`, `ja`, `mal`, `eben`, `halt` — are used freely and re-opened for
nothing; `Glück` stays L4-M10's and `zum Glück` L3-M10's, and neither is minted here.

Word budget: **23 new keys of the 25 allowed**. `das Eis brechen`, `Katze`, `Sack` and `Nase` as a
bare noun were all on the brief's candidate list and were all dropped — the budget is for the
saying, not for its scenery, and every one of those four would have bought a key that only one
display needed.

### L5-M2 "Humour and teasing" — the marked joke, and the repair that comes with it

The ten displays:

1. `Das war doch nur ein Scherz.`
2. `Das meinst du doch nicht im Ernst?`
3. `Er hat über den Witz nur gelacht.`
4. `Das war nicht ernst gemeint.`
5. `War das ernst oder war das Ironie?`
6. `Mein Chef hat leider keinen Humor.`
7. `So ein Quatsch, das war doch nicht witzig!`
8. `Das soll doch Spaß machen, oder nicht?`
9. `Sie ist oft frech, aber nicht komisch.`
10. `Bei uns macht man über den Chef keine ironischen Witze.`

What it teaches. The joke and its **withdrawal in the same item**, which is the module's real
product: `nur ein Scherz`, `nur Spaß` and `nicht ernst gemeint` are taught beside the teasing rather
than after it, and the third is the one that works upwards — sayable to a boss, where `nur Spaß` is
not. Alongside them the vocabulary of taking a joke — `Witz`/`Witze`, `lachen`/`lacht`/`gelacht`,
`witzig`, `Humor`, `Ironie`/`ironisch`, `Quatsch`, `frech` — and the module's two false friends,
`komisch` (odd far more often than comic) and `Spaß machen`, whose subject is the *thing*, not the
person: `Ich mache Spaß` means *I am kidding*, not *I am having fun*.

Because the pitch is doing the grammatical work, the `sound` line is not decoration here. Sentences
1, 2, 3, 4, 5, 7 and 8 write their contour out in words — the flat fall on `SHAIRTS` that keeps a
repair from sounding like a plea, the climb that lands high on `AIRNST`, the level line on
`guh-MYNT` — and rule 0 says why: German has no ironic mood, no tag and no punctuation for it, so an
item whose irony cannot be heard in that line has not been authored.

Register is the safety question the brief names, and the frames chip it: `informal` on the teasing
(2, 6, 7, 8, 9), `neutral` on the repairs and the rules of the room (1, 3, 4, 5, 10), so the pair is
visible on the page. Rule 2 states the delta plainly — teasing tracks the `du` line, and where you
would say `Sie` you do not tease. Rule 4 draws the line to L5-M7: here the joke is **marked and
repairable**; there nothing is marked and the hearer must infer. Rule 5 says out loud that the
vulgar register German banter really uses is out of this course, so no later author has to guess.

Word budget: **21 new keys of the 25 allowed**. `aufziehen` was dropped — separable, so it would
have bought `zieht` and leaned on `auf` in a module that has no room to teach a separable verb.

### The brief seams, checked against the emitted index

Four corrections, three of them the kind that ships an unreachable row.

**1. `verstanden` is NOT free.** The L5-M1 brief §5 is the module's headline find and it is
half wrong. It says: *"`content:owner` says `verstehen` free, `verstehe` free, `verstanden` free,
`verstehst` free … Only the Präteritum exists: `content:owner` says `verstand` L4-M10."* What
`npm run content:owner -- en-de` actually prints today:

```
verstehe	free
verstehen	free
verstehst	free
versteht	free
verstanden	L4-M10
verstand	L4-M10
```

Both past shapes are L4-M10's, not one. The brief's own instruction — *"forms `verstehe`,
`verstehst`, `versteht`, `verstanden`"* — would have opened a row on a key `L4-M10` already owns:
unreachable by construction, a `RE-TEACH` on the one course where that is a defect, and a second
seat on `verstanden` in `src/course/types.test.ts`'s one-owner-per-surface assertion. The row ships
with a **hole at both past cells**: `["verstehe", "verstehst", "versteht", "verstehen"]`, and its
note points back at L4-M10 for `verstand` and `verstanden`.

**2. `drücke` is free, and the brief did not say so.** The brief lists `drücken L4-M1` among the
already-owned nouns and verbs and stops there. The fold is finer than that:

```
drücken	L4-M1
drückt	L4-M1
drücke	free
drückst	free
```

So `Da drücke ich dir die Daumen` shows a surface no row in the course owns — a
`SHOWN-BUT-UNTAUGHT` finding, and a new count on a course whose ratchet is at 11. `drücke` is a new
shape of an older lexeme and gets its own row **in the module that first shows it**, with a note
back at L4-M1 and `forms: ["drücke"]` — a one-cell paradigm, because `drücken` and `drückt` are
L4-M1's and a fuller-looking list would swallow two owned cells.

**3. `macht` is free, and no brief mentions it at all.** `Übung macht den Meister` is on the L5-M1
brief as a proverb to be written out as a sentence with its content words indexed singly. Three of
those words had to be checked, and the third is the surprise:

```
machen	L1-M6
mache	L1-M6
machst	L2-M1
macht	free
Übung	free
Meister	free
```

The ladder taught `machen`, `mache` and `machst` and never the third person. `macht` gets its own
row here with a note back at L1-M6 and `forms: ["macht"]` — the same hole-shaped paradigm as
`drücke`. It pays for itself twice: L5-M2's `Bei uns macht man …` and `Bei der Arbeit macht man
keine Witze` both resolve through it, because `content:shown` folds L5-M1 before it reads L5-M2.

**4. `meinst` is NOT L2-M8's, and the L5-M2 brief says it is.** The brief §5 closes on:
*"`meinen` — L2-M8's VERB, the trap L4-M4 already walked into, so `Das meinst du nicht im Ernst`
resolves `meinst` to the verb and that is correct here."* It does not:

```
meinen	L2-M8
meine	L2-M2
meinst	free
meint	free
```

L2-M8 owns the **infinitive** and nothing else; `meine` is L2-M2's possessive. The brief's sentence
is the module's second display, and shipped on the brief's reasoning it would have shown an untaught
surface in position two. `meinst` gets a row, `forms: ["meinst", "meint"]`, with a hole where
`meinen` and `meine` sit and a note naming the `meinen`/`meinen` fold the brief was right to warn
about even while it was wrong about who owns what.

**What the briefs got right, checked rather than assumed.** `lachte L4-M10` with `lachen`, `lacht`
and `gelacht` all free — so the L5-M2 row is exactly the new-shape row the brief describes, with the
Präteritum cell deliberately missing. `ernst` and `Ernst` really are one key (`free` for both; the
fold lowercases), so the row is opened on the lowercase adjective and `im Ernst` is taken as a
two-token span, exactly as ruled. Every idiom span the two briefs proposed came back `free`:
`die Nase voll`, `Schwein gehabt`, `nur Bahnhof`, `unter vier Augen`, `über den Berg`,
`den Faden verlieren`, `im Ernst`, `nur Spaß`, `nicht ernst gemeint`, `Spaß machen`. And the seam
count is honest: 945 surfaces over 40 modules, which is what both briefs claim.

**The span law, confirmed against the emitted file rather than the prose.**
`public/content/en-de/index/L4-M10.json` carries `maxSpan: 3`. Every span shipped in these two
modules is two or three tokens, so the matching window over the forty shipped modules does not
widen. `Übung macht den Meister` is four tokens and is therefore a sentence, not a key — and
`Ich verstehe nur Bahnhof` is a sentence too, though for a different reason: `nur Bahnhof` alone is
the idiom, and the verb outside it carries the person.

**Two seams that shaped a display rather than a row.** `Nase` and `voll` are both free and neither
is taught: the only key is the three-token span. That is why L5-M1-S03 writes the phrase inside
German quotation marks — `heißt wörtlich „die Nase voll“` — rather than as bare `Nase voll`. Edge
punctuation is stripped per token, so `„die` folds to `die` and the three-token span still matches;
a bare `Nase voll` in that seat would have been two untaught surfaces. Likewise `jemand` is free, so
rule 5's frame is written `wenn man Glück hatte`, not `wenn jemand …`, and `gemeint` is free outside
the `nicht ernst gemeint` span, so no display in L5-M2 shows it alone.

### The ratchet

`tools/shown-surfaces.test.ts` holds `en-de` at **11**, and it stays at 11. Neither module adds a
finding — `npm run content:shown -- en-de L5-M1` and `… L5-M2` both print
`clean — every shown surface resolves`, with no `RE-TEACH` line, which on this course is the
requirement rather than the courtesy: `src/course/types.test.ts` asserts exactly one owning row per
surface for `en-de`, and a re-teach here is a second seat.

No baseline was lowered. The eleven existing findings are elsewhere in the ladder and nothing in
these two modules touches them; lowering one would mean editing a shipped module, which a level
above it may not do.

`npm run content:validate` → `CONTENT n/n ok`, every module in the tree passing (the total moves
while the eight sibling waves land, so the number in the line is not a fact about en-de). `npx vitest run tools/shown-surfaces.test.ts` →
11/11. `npx vitest run src/course/types.test.ts` fails on the module census (`finds all 360`) and on
`hi-en`'s count guard (`expected 40`, and rising as that course's own wave lands) — both are the
collecting parent's to update, and neither is en-de's. The en-de language law itself —
*keeps en-de to the decisions its briefs settled: Sie, umlauts, one sie row (#361)* — **passes** with
both new modules folded into it: one owner per surface, no lost capital, no all-caps display, no
`ß` respelled, and an umlaut or `ß` written in the German of each module.

### Open questions for the native pass

Continuing the chain in `docs/110-en-de-L5-brief-decisions.md`, which ends at 97.

98. **The seven idioms as a set** (M1). `die Nase voll haben`, `jemandem die Daumen drücken`,
    `Schwein gehabt`, `nur Bahnhof verstehen`, `unter vier Augen`, `über den Berg sein`,
    `den Faden verlieren`. Confirm all seven are current everyday German rather than the German of
    a phrasebook, and say which of them a speaker under thirty would not use.
99. **`Ich habe die Nase voll von der Arbeit`** (M1-S01). Confirm `von` plus the dative is the
    complement a speaker actually reaches for, and that the sentence reads as blunt-but-not-rude
    rather than as a resignation letter.
100. **`Da drücke ich dir die Daumen`** (M1-S05). Confirm the `da` opening is idiomatic rather than
     regional, and that the dative person is normally named (`dir`) rather than left out.
101. **`„Schwein gehabt“ sagt man, wenn man Glück hatte`** (M1-S06). Confirm the tense pairing —
     a Perfekt-shaped quotation explained with a Präteritum `hatte` — is what a speaker says, and
     not a compromise the module's tense list forced.
102. **`unter vier Augen` and the number** (M1-S07). The module claims the four is fixed however
     many people are being excluded. Confirm there is no `unter sechs Augen` in real use, and that
     the phrase is neutral rather than faintly conspiratorial.
103. **`Übung macht den Meister` quoted bare** (M1-S09). Confirm the proverb takes no article on
     `Übung` in every seat, including after a colon, and that `sagt man bei uns oft` is a natural
     frame for quoting a proverb rather than a translation of *as we say*.
104. **The repair ladder** (M2). `nur Spaß` / `nur ein Scherz` / `nicht ernst gemeint`. The module
     ranks them, and gives only the third to a `Sie` relationship. Confirm that ranking, and say
     what a speaker uses when the joke has genuinely offended and the third is not enough.
105. **`Das meinst du doch nicht im Ernst?`** (M2-S02). Confirm `doch` is what keeps this an
     invitation to laugh rather than an accusation, and that dropping it — as the variation does —
     really does turn it into a genuine question.
106. **`komisch` as the module's sharpest false friend** (M2-S09). Confirm that calling a joke
     `komisch` reads as *peculiar* rather than *comic* in ordinary speech, and that the frown
     reading is dominant enough to justify teaching it as interference.
107. **`Bei uns macht man über den Chef keine ironischen Witze`** (M2-S10). The claim is that the
     `du` line and the teasing line coincide almost exactly. Confirm that, and say where the two
     come apart — a boss on `du` terms is the case the module does not cover.
108. **The contours written into `sound`** (M2, seven items). Read the seven contour descriptions
     against how the lines are actually said. This is the one place in the course where the `sound`
     field carries meaning rather than pronunciation, and it is the field a native pass is most
     likely to find wrong.

## Wave 2 — L5-M3, L5-M4 and L5-M5 (#588)

The level's RANGE modules on the far side of the idiom pair: L5-M3 puts a German sentence on the
map, L5-M4 hands over the formulae for the four occasions where silence is not an option, and
L5-M5 opens the `zu`-infinitive and the abstract nouns that need it. L5-M3 is an M1–M3 rung, so all
five enrichment blocks ride each of its ten sentences; L5-M4 and L5-M5 carry all five anyway, and
en-de's own law — every sentence carries a `sound` line — is met on all thirty.

**The fold is deeper than every brief in this wave says.** All three briefs open §5 with *"checked
with `npm run content:owner` against 945 surfaces through L4-M10"*. What the tool prints today is

```
991 surfaces owned, folded over 42 modules through L5-M2
```

— L5-M1 and L5-M2 are in the emitted index now, and one of this wave's corrections falls out of
exactly that. Every ownership claim below was re-checked against the 991, not against the 945.

### L5-M3 "How they say it there" — one slot moves, the frame does not

The ten displays:

1. `Im Süden sagt man Grüß Gott.`
2. `Servus, ich hätte gern eine Semmel.`
3. `In Österreich heißt die Tüte Sackerl.`
4. `Bei uns heißt die Semmel Brötchen.`
5. `Das ist Dialekt, nicht Hochdeutsch.`
6. `Er spricht mit einem Akzent aus dem Norden.`
7. `Im Norden sagt man Moin und Tschüss.`
8. `Der Kollege sagt Mahlzeit, nicht Guten Tag.`
9. `Hier duzen wir uns, dort siezen wir uns.`
10. `Junge Leute sagen krass, wir sagen echt.`

Twenty-one rows: `Süden`, `Grüß Gott`, `Servus`, `Semmel`, `Österreich`, `Tüte`, `Sackerl`,
`Brötchen`, `Dialekt`, `Hochdeutsch`, `spricht`, `Akzent`, `Norden`, `Moin`, `Tschüss`, `Mahlzeit`,
`duzen`, `siezen`, `junge`, `krass`, `echt`. What it teaches is the brief's §2 claim made literal:
every sentence is a frame the learner already owns with one lexical slot swapped, and not one
display writes a dialect verb, a dialect case or a dialect article. The rules carry the status
inversion (`Grüß Gott` is the *neutral* greeting to a stranger in the south, `Guten Tag` the marked
one), the two-standards point about Österreich and die Schweiz, and the routing around `ihr`: the
plural you is named in prose and never written, because `ihr` is L1-M2's possessive row and a second
reading would be a fourth `FORCED_DUPLICATES` entry.

`Mundart`, `Aussprache` and `Schweiz` are on the brief's fresh-key menu and are not spent: the
module had ten sentences and twenty-one rows already, and a key opened in a display nobody needs is
a key the rest of the level cannot have.

### L5-M4 "Formal occasions" — a formula inventory, not a grammar

The ten displays:

1. `Ich möchte im Namen der Familie ein paar Worte sagen.`
2. `Auf die Gäste! Zum Wohl!`
3. `Wir wollen kurz anstoßen: Prost!`
4. `Die Rede war kurz und sehr herzlich.`
5. `Sehr geehrte Damen und Herren, wir danken Ihnen für alles.`
6. `Mein herzliches Beileid zum Verlust in der Familie.`
7. `Wir wünschen Ihnen alles Gute zur Hochzeit.`
8. `Herzlichen Glückwunsch zum Geburtstag und alles Gute!`
9. `Liebe Gäste, der Anlass ist heute sehr schön.`
10. `Mit freundlichen Grüßen kommt immer am Ende.`

Twenty rows, six of them spans: `im Namen`, `ein paar Worte`, `Zum Wohl`, `Sehr geehrte`,
`Liebe Gäste`, `Mit freundlichen Grüßen` — plus `Gast`, `anstoßen`, `Prost`, `Rede`, `herzlich`,
`Damen`, `Herren`, `danken`, `Beileid`, `Verlust`, `wünschen`, `Hochzeit`, `Glückwunsch`, `Anlass`.
What it teaches is the four occasions and the sequence around them: the glass up, the eyes met,
nobody drinking before `Prost` or `Zum Wohl`; the dative that `danken` and `wünschen` both take,
which is the sentence-level error an anglophone makes in the first line of a formal letter; and the
temperature rule — German condolence is short, and `herzlich` is the whole warmth budget. Nothing of
L4-M7's counter and Amt register is re-taught, and the genitive under `im Namen der Familie` is
leaned on without a row.

### L5-M5 "Big questions" — the `zu`-infinitive, and the nouns that need it

The ten displays:

1. `Für mich ist Freiheit wichtiger als Geld.`
2. `Es ist wichtig, immer ehrlich zu sein.`
3. `Es ist schwer, Menschen wirklich zu verstehen.`
4. `Ich bin davon überzeugt, dass Gerechtigkeit möglich ist.`
5. `Was bedeutet Verantwortung für dich?`
6. `Ohne Vertrauen gibt es keine Gesellschaft.`
7. `Was ist der Sinn des Lebens?`
8. `Die Wahrheit ist manchmal schwer zu sagen.`
9. `Für mich ist die Menschenwürde keine Meinung, sondern ein Wert.`
10. `Ohne Hoffnung und Überzeugung ist das Leben schwer.`

Twenty rows: `Freiheit`, `wichtiger`, `es ist wichtig`, `zu sein`, `Mensch`, `zu verstehen`,
`Gerechtigkeit`, `möglich`, `Verantwortung`, `ohne`, `Vertrauen`, `Gesellschaft`,
`Sinn des Lebens`, `Wahrheit`, `zu sagen`, `Menschenwürde`, `Wert`, `Hoffnung`, `Überzeugung`,
`Leben`. Four of them are the `zu`-spans the brief's §5 called the whole device, and one is the
three-token `Sinn des Lebens`, at the level's `maxSpan` ceiling. The rules carry both laws of the
clause type — `zu` immediately before the infinitive with nothing after it, and **no `zu` after a
modal**, which is the error English word order produces — plus the `glauben` interference and the
statement that sustaining a position is L5-M6's and not this module's. The `-heit` / `-keit` /
`-ung` gender regularity is carried in the word notes rather than in a rule, because it is a fact
about four of the rows and not a law of the module.

### The brief seams, checked against the emitted index

Nine corrections. Three would have shipped a display no row could resolve; one would have shipped an
unreachable row.

**1. `bedeutet` and `bedeuten` are L5-M1's, not fresh.** The L5-M5 brief §5 lists them among the
module's fresh keys: *"Fresh keys: … `Überzeugung`, `Menschenwürde`, `bedeuten`, `bedeutet`,
`möglich` …"*. That was true against the 945-surface fold the brief quotes and is false against the
991 the tool prints today:

```
bedeuten	L5-M1
bedeutet	L5-M1
```

L5-M1's `bedeutet` row (forms `["bedeutet", "bedeuten"]`) sits under *"Die Redewendung heißt
wörtlich …, aber sie bedeutet genug"*. Following the brief would have opened a second seat on a key
one rung below already owns — a `RE-TEACH` on the one course where that is a defect, and a second
row in `src/course/types.test.ts`'s one-owner-per-surface assertion. **This is the seam that only
exists because the index is now folded through L5-M2**; an author checking against the number the
brief quotes would not have found it. L5-M5-S05 shows `bedeutet` and opens no row for it, and the
brief's fourth pattern still works unchanged.

**2. `spricht` is free, and the L5-M3 brief does not say so.** The brief lists
*"`sprechen` (L1-M2)"* among the already-owned and stops. Its fifth pattern is
`Er spricht + mit + <Dat> + Akzent`:

```
sprechen	L1-M2
spricht	free
sprichst	L2-M1
```

The pattern the brief itself supplies could not have been written without a row: `spricht` is shown
and, before this module, untaught. It ships as a **paradigm with holes at every other cell** —
`forms: ["spricht"]`, nothing else — because `sprechen` is L1-M2's and `sprichst` is L2-M1's. This
is the `sarei` case from en-it's L4-M3 arriving on a verb whose full paradigm looks obviously
available.

**3. `junge` is free; `jung` is L2-M2's.** The brief's fresh-key list has `Junge`, which reads as the
noun *boy*. The fold lowercases, so the adjective and the noun are one key:

```
jung	L2-M2
junge	free
Junge	free
```

The row ships as the plural adjective shape of L2-M2's `jung`, with a note pointing back at the
first-teach row — a new shape of an older lexeme getting its own row in the module that first shows
it, rather than an edit to a file two levels below.

**4. `ohne` is free, and the L5-M5 brief lists it nowhere.** It appears in neither the fresh-key list
nor the already-owned list, and the brief's fifth pattern is `Ohne + <Akk> + gibt es + keine + <Akk>`:

```
ohne	free
```

Two of the module's ten displays open on it. It ships as a row.

**5. `andere` is free, and it is the word the obvious sentence wants.** `Es ist schwer, andere
Menschen zu verstehen` is the first sentence anyone writes for this brief's second pattern:

```
anders	L3-M3
andere	free
anderen	free
```

L3-M3 owns the adverb, not the adjective. Rather than spend a row on `andere` in a module about
values, S03 is `Es ist schwer, Menschen wirklich zu verstehen` — `wirklich` is L3-M3's and already
the learner's.

**6. `Ihrer`, `Ihrem` and `Ihres` are all free.** The L5-M4 brief's fourth pattern is
`Mein herzliches Beileid + zum + <Dat>`, and every natural filling of it is a possessive genitive:

```
Ihre	L2-M2
Ihrer	free
Ihrem	free
Ihres	free
```

Only the nominative/accusative `Ihre` is taught. `zum Verlust Ihrer Mutter` would have shown an
untaught surface in the module's most formulaic sentence. S06 writes `zum Verlust in der Familie`
instead, which keeps the dative the pattern asks for out of taught material.

**7. `steht` and `schreibt` are free.** A sentence that says where `Mit freundlichen Grüßen` goes
wants one of them:

```
stehen	L1-M4
steht	free
schreiben	free
schreibt	free
```

L1-M4 taught the infinitive and not the third person. S10 uses `kommt` (L2-M8) instead.

**8. `überall` is free.** `Tschüss sagt man überall, Servus nur im Süden` is the sentence the L5-M3
brief's Tschüss find invites, and `überall` is untaught. S10 of the module carries the same contrast
without it.

**9. There is no proper-noun exemption in the code.** `#491`'s exemption is a fact about why the
baselines are non-zero, not a branch in `checkShownSurfaces` — the function scans `display` and
`variations[].display`, and a name that no row owns is a finding like any other. `Bayern`, `Wien`
and `Hamburg` are all free, and a module about regional speech reaches for all three. None is
written: L5-M3 says `im Süden`, `im Norden` and `in Österreich`, and the only proper noun anywhere
in the wave's German is none at all.

**What the briefs got right, re-checked and confirmed.** `Tschüss free` (L5-M3's headline find
holds, and the only other occurrence is L2-M7's `mistake.display`, which the ratchet exempts);
`Viertel L2-M6`, so no city district; `Wohl L3-M6` and `lieber L2-M9`, so `Zum Wohl` and
`Liebe Gäste` ship as spans and `Lieber` is named in a rule and never written; `Worte L4-M10`, so
`ein paar Worte` is a span and the bare plural stays L4-M10's; `Würde L3-M4` and `Glaube L1-M9`, so
`Menschenwürde` and `Überzeugung` carry those two meanings; `zu L1-M8` — the *too* of
`Das ist zu teuer` — so every `zu`-infinitive is a two-token span claiming neither part; `frei
L2-M6` while `Freiheit` is free; `Familie L3-M9`, not L2-M2. `E-Mail` was not written anywhere, and
no display in the wave contains a hyphen at all, so no junk keys were spent.

### The ratchet

`tools/shown-surfaces.test.ts` holds `en-de` at **11**, and it stays at 11. None of the three
modules adds a finding:

```
L5-M3: clean — every shown surface resolves
L5-M4: clean — every shown surface resolves
L5-M5: clean — every shown surface resolves
```

with no `RE-TEACH` line on any of the three, which on this course is the requirement and not the
courtesy. No baseline was lowered: the eleven existing findings are below L5 and nothing here can
reach them — `checkShownSurfaces` resolves against the cumulative index *at* the module that shows
the surface, so a word taught at L5 cannot help a display at L2.

`npm run content:validate` → `CONTENT 390/390 ok`, and `CONTENT 400/400 ok` on a re-run ten
minutes later (the total moves while the eight sibling waves land, so the number is not a fact
about en-de). `npx vitest run tools/shown-surfaces.test.ts` → **11/11 passed**; a later re-run of
the same file shows `hi-mr` over its baseline while that course's own wave is mid-write, and
`en-de` passing in both. `npx vitest run src/course/types.test.ts` fails three assertions — the module
census (`finds all 378`), `en-ar`'s count guard (`expected 43 to be 42`) and `hi-en`'s
(`expected 44 to be 42`) — all three the collecting parent's to update as the sibling waves land,
and none of them en-de's. The en-de language law itself — *keeps en-de to the decisions its briefs
settled: Sie, umlauts, one sie row (#361)* — **passes** with all three new modules folded into it:
one owning row per surface across the whole course, no lost capital, no all-caps display, no `ß`
respelled away, and an umlaut or `ß` written in the German of each module.

### Open questions for the native pass

Continuing the chain, which now ends at 108.

109. **`Grüß Gott` as the *neutral* greeting** (M3, rule 1). The module's central status claim is
     that `Grüß Gott` is what you say to a stranger in Bavaria and Austria at any hour, and that
     `Guten Tag` there is the marked, distancing choice. Confirm the inversion, and say where it
     breaks — a Munich office, a young speaker, a phone call.
110. **`Servus` and the address it implies** (M3-S02). The note claims `Servus` is `du`-shaped and
     would not be said to an official. Confirm that, and confirm it really does serve both hello
     and goodbye in current use rather than only one of them.
111. **`Mahlzeit`** (M3-S08). Confirm it is still said in ordinary workplaces, that answering with
     `Mahlzeit` is correct, and that the window really is roughly eleven to two. This is the item
     most likely to have aged since the brief was written.
112. **`krass` and `echt` as the generational pair** (M3-S10). The brief asked for markers with
     decades behind them. Confirm `krass` still reads as young rather than dated, and that `echt`
     is the flat all-ages intensifier the note claims.
113. **`Sackerl` and `Semmel` as standards** (M3-S03, M3-S02). The module teaches them as Austrian
     standard rather than as regionalisms. Confirm an Austrian official register really does use
     them, and say whether `Semmel` extends into Bavaria as the module implies it does.
114. **`duzen` / `siezen` with the reflexive** (M3-S09). The mistake plate claims `Hier duzen wir`
     without `uns` is incomplete. Confirm the reflexive is obligatory when the address is mutual,
     and confirm `Wollen wir uns duzen?` is how the move is actually proposed.
115. **The toast sequence, and `Prost` against `Zum Wohl`** (M4, rule 1; M4-S02, M4-S03). Confirm
     the ordering claim — glasses up, eye contact, nobody drinks first — and confirm `Zum Wohl` is
     the more formal of the two rather than the regional one.
116. **`Mein herzliches Beileid zum Verlust in der Familie`** (M4-S06). The seam forced this
     phrasing in place of `zum Verlust Ihrer Mutter`. Confirm it is idiomatic on a card rather than
     merely grammatical, and say what a German would actually write if free to choose.
117. **The length rule for condolence** (M4, rule 2). The module claims one or two sentences is a
     complete condolence card and that adding warmth makes it worse. Confirm the temperature, and
     say whether it differs between a card, an email and a spoken sentence at a door.
118. **`Der Anlass ist heute sehr schön`** (M4-S09). `Anlass` against `Feier` is the note's
     distinction — the reason against the gathering. Confirm the sentence sounds like a speaker
     opening a toast rather than like an official describing an event.
119. **`schwer zu sagen` with no comma** (M5-S08). The module teaches the bare adjective-plus-`zu`
     tail as the one case that takes no comma, and says the comma returns as soon as an object
     appears. Confirm both halves against current orthography.
120. **`Ich bin davon überzeugt` as the ordinary abstract hedge** (M5-S04, rule 2). The brief's
     claim is that `glauben` is heavy enough that a learner should not use it for positions.
     Confirm `Ich bin davon überzeugt` is not itself too strong for an ordinary conversational
     claim, and say what sits between it and `Ich finde`.
121. **`Menschenwürde` outside a constitutional register** (M5-S09). The index forbids bare `Würde`
     and the compound was chosen as the better word anyway. Confirm a German speaker uses
     `Menschenwürde` in ordinary conversation rather than only when quoting the Grundgesetz.
122. **`Sinn des Lebens` as a three-token unit** (M5-S07). Confirm the phrase is fixed in that order
     with the genitive behind it, and that the mistake plate is right that `der Sinn von dem Leben`
     is not an available paraphrase.
