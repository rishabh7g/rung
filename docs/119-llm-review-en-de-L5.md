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

## Wave 3 — L5-M6 through L5-M10 (#596)

The level's remaining RANGE modules, and with them the last rung of the product. L5-M6 makes the
unit of composition longer than a paragraph; L5-M7 puts the meaning outside the words; L5-M8 is the
survival module that keeps a conversation alive through the gap; L5-M9 turns the register dials on
somebody else's story and L5-M10 turns them on the learner's own. None is an M1–M3 rung, so the
five enrichment blocks are not required — all fifty sentences carry them anyway, and en-de's own
law, a `sound` line on every sentence, is met on all fifty.

**The fold is two waves deeper than every brief in this wave says.** All five briefs open their
index-seam paragraph with *"checked with `npm run content:owner` against 945 surfaces through
L4-M10"*. What the tool printed when this wave started was

```
1068 surfaces owned, folded over 45 modules through L5-M5
```

and, once these five were emitted, `1158 surfaces owned, folded over 49 modules through L5-M9`.
Every ownership claim below was re-checked against the 1068, not against the 945 the briefs quote.

### L5-M6 "Arguing a position" — the signposts, and the claim that is not yours

The ten displays:

1. `Meine These ist, dass das Büro am Samstag öffnen muss.`
2. `Erstens kommen am Samstag mehr Leute in die Stadt, zum Beispiel Familien.`
3. `Zweitens haben viele Kollegen unter der Woche keine Zeit. Allerdings kostet das Geld.`
4. `Drittens haben wir dafür einen Beleg aus dem letzten Jahr.`
5. `Folglich müssen wir das Büro am Samstag öffnen.`
6. `Man könnte einwenden, dass die Kollegen am Samstag frei haben wollen.`
7. `Dieses Gegenargument kann ich jedoch widerlegen.`
8. `Er behauptet, er könne am Samstag nicht arbeiten.`
9. `Angenommen, wir öffnen nicht: dann kommen die Kunden nicht mehr.`
10. `Zusammenfassend ist mein Fazit: Das Büro öffnet am Samstag.`

Twenty-five rows, which is the brief's own fresh-key list spent exactly: `These`, `Standpunkt`,
`erstens`, `zum Beispiel`, `Beispiel`, `zweitens`, `allerdings`, `drittens`, `Beleg`, `folglich`,
`somit`, `einwenden`, `Einwand`, `jedoch`, `widerlegen`, `Gegenargument`, `im Gegenteil`,
`behaupten` (forms `behaupten`, `behauptet`), `Behauptung`, `könne`, `angenommen`, `es sei denn`,
`zusammenfassend`, `abschließend`, `Fazit`. The ten displays are one continuous case about whether
an office should open on a Saturday, which is the brief's §4 instruction taken literally: the module
teaches the shape of an argument and never the subject of one.

What it teaches is architecture. Rule 0 states the thing the three signpost families have in common
and that learners never generalise — every one of them is an ordinary adverb in the first field, so
the L1-M4 verb-second law governs all nine of them, and the commonest written error in a German
case is the English comma after *firstly*. Rule 1 is the level's single new Konjunktiv I row: `könne`
carries the reported claim, `müsse` and `wolle` are named in its note and never written, and `sein`
opens nothing because `sei` and `seien` are L4-M7's. That keeps the mood at two rows in the whole
product. Rules 2 and 3 are the two interference plates the brief §3 asked for — `jedoch` and
`allerdings` as counted words rather than free-floating *however*, and `im Gegenteil` as a reversal
of a negative claim rather than English *on the contrary*. Rule 4 is the concession depth: German
signposts a main clause where English subordinates, and `angenommen` and `es sei denn` are the two
exceptions, both taught whole.

### L5-M7 "Between the lines" — the situation is half the sentence

The ten displays:

1. `Es ist wirklich kalt hier drinnen.`
2. `Hätten Sie vielleicht einen Moment für mich?`
3. `Es wäre schön, wenn das Fenster offen wäre.`
4. `Na super, jetzt habe ich keine Lust mehr.`
5. `Damit will er sagen, dass er nicht kommen kann.`
6. `Das ist eine Andeutung zwischen den Zeilen.`
7. `Ausgerechnet heute ist der Chef nicht im Büro.`
8. `Das ist sozusagen ein Hinweis, aber nicht ganz klar.`
9. `Es zieht hier. Das ist deutlich genug.`
10. `Ich möchte Sie wirklich nicht stören, aber es ist spät.`

Nineteen rows: `drinnen`, `Hinweis`, `Hätten Sie`, `stören` (forms `stören`, `stört`),
`Es wäre schön`, `offen`, `Na super`, `Lust`, `will`, `andeuten`, `zwischen den Zeilen`,
`Andeutung`, `ausgerechnet`, `Absicht`, `sozusagen`, `klar`, `ziehen` (forms `ziehen`, `zieht`),
`deutlich`, `wohl kaum` — the brief's list plus `drinnen` and `will`, both of which its own patterns
require and neither of which it names. Six under the cap, which is the right shape for a module
whose brief says the frames are already bought.

What it teaches is that the `usage` line is doing more work than the display. Rule 0 says so
outright, and every sentence is authored to be unremarkable on the page and a request in the room.
Rule 1 names the two German devices and points at the modules that paid for them — the Konjunktiv II
frame (L3-M4, L2-M1) and the bare statement of a problem, which is the more German of the two and
the one an anglophone under-uses. `Es zieht` (S09) is the module's proof: two words, no subject, and
a room full of people closes the window. Rule 2 is the calibration plate, stated in both directions
as the brief §3 demanded — direct about objects, indirect about people — and rule 3 is the hedge
delta, which points back at L4-M5 rather than restating it. Rule 4 draws the L5-M2 boundary in the
module's own terms: there the speaker will admit it was a joke, here the speaker will admit nothing.

### L5-M8 "When words run out" — four frames and a three-step repair

The ten displays:

1. `Wie heißt das auf Deutsch?`
2. `Was bedeutet das? Ich verstehe das Wort nicht.`
3. `Das ist so etwas wie ein Ding für das Büro.`
4. `Das ist eine Art Wörterbuch für Kinder.`
5. `Können Sie das bitte wiederholen?`
6. `Wie bitte? Können Sie das bitte buchstabieren?`
7. `Ich meine nicht das Buch, sondern das Wort.`
8. `Verzeihung, das war wohl ein Missverständnis.`
9. `Können Sie mir das bitte erklären?`
10. `Keine Ahnung, wie man dieses Wort benutzt.`

Twenty-five rows: `Wie heißt das`, `auf Deutsch`, `Was bedeutet das`, `Ausdruck`, `beschreiben`,
`so etwas wie`, `Ding`, `Sache`, `eine Art`, `Art`, `Wörterbuch`, `wiederholen`, `langsamer`,
`Wie bitte`, `buchstabieren`, `Ich meine`, `gemeint`, `Verzeihung`, `Missverständnis`, `erklären`,
`Erklärung`, `ähnlich`, `keine Ahnung`, `benutzen` (forms `benutzen`, `benutzt`), `übersetzen` —
the brief's list minus `bedeuten`, which is not free (see the seams below).

What it teaches is two systems the brief insists must not blur, and the module keeps them in
separate rules. Rule 0 is PARAPHRASE as a set of frames rather than a set of words, and the one
grammatical fact that separates the two frames it opens: `so etwas wie` leaves the following noun's
article alone, `eine Art` strips it. Rule 1 is REPAIR as a three-step sequence — signal, locate,
reformulate — and it names the failure it exists to prevent: a learner who can only signal gets the
whole sentence back at the same speed. Rule 2 carries the formulae a learner cannot invent
(`heißen` not `sagen`, `auf` not `in`, `Wie bitte` sharing nothing with `Es tut mir leid`,
`langsamer` as a comparative because you are asking for slower than *now*). Rule 3 is the `meine` /
`meinen` trap arriving for the third time in the course, and the answer is the span. Rule 4 is the
register law: every repair here puts the trouble on the learner's side, and the mistake plate on S08
is a grammatical sentence rejected purely for blaming the hearer.

### L5-M9 "Telling it your way" — four dials, moved together

The ten displays:

1. `Es war einmal ein König, der in einem Schloss wohnte.`
2. `Also, da war mal ein König, und der wohnte in einem Schloss.`
3. `Im Wald sah der Held plötzlich ein Licht.`
4. `Die Königin fragte laut, warum der Held so leise war.`
5. `Kurz gesagt: Der König ging in den Wald und kam nicht wieder.`
6. `Ausführlich erzählt, war das eine lange Geschichte.`
7. `Der König war jedenfalls sehr alt.`
8. `Am Ende hat der Held die Geschichte im Schloss erzählt.`
9. `Der Wolf kam in den Wald. Also, der Wolf ist gekommen.`
10. `Am Schluss war der Held wieder im Wald.`

Seventeen rows: `Es war einmal`, `König`, `Märchen`, `Fassung`, `Wald`, `Held`, `Königin`,
`Handlung`, `kurz gesagt`, `knapp`, `ausführlich`, `Version`, `jedenfalls`, `im Grunde`, `Schloss`,
`Wolf`, `Schluss`. Eight under the cap, because the brief is right that the retelling vocabulary was
bought at L3-M5 and the Präteritum at L4-M8 and L4-M10; the module spends its budget on fairy-tale
furniture and on the words that name a telling.

What it teaches is choice. Rule 0 names the four dials — tense, density, discourse words, opening —
and insists they move together, which is why S01 and S02 are the same sentence in two registers and
S09 is the same event in two tenses inside one item. Rule 1 is the tense dial on its own, because it
is the one with no English equivalent to lean on, and rule 2 states that delta plainly: English has
one past for both registers, so a learner has no reason to expect the tense itself to move. Rule 3
fixes the two openings and points at L4-M5 for the `mal` in `Also, da war mal`. Rule 4 records what
the module does NOT open, and it is most of the vocabulary a naive author would have minted. Three
of the ten mistake plates are the same verb-second error under a front-loaded time or place phrase,
which is deliberate: a retelling front-loads in nearly every line, and that is where the rule breaks.

### L5-M10 "Your own voice" — the pivot is the grammar

Ten pieces, four to five sentences each, every sentence inside the bound. The displays, given by
their pivot line, with the piece named:

1. Complaint letter that stops being one — pivot `Ehrlich gesagt, jetzt reicht es mir.` →
   `So, und jetzt möchte ich mein Geld zurück.`
2. Apology that turns into an accusation — pivot `Aber ehrlich gesagt, Sie haben mich nie angerufen.`
3. Joke that is withdrawn — pivot `Aber im Ernst: Das war nicht witzig.`
4. Formal booking request that relaxes — pivot `Also, mir ist der Tag eigentlich egal.`
5. Company reassurance that becomes personal — pivot `Und ehrlich gesagt: Ich hätte auch gefragt.`
6. Toast that drops into confidence — pivot `Naja, und ehrlich gesagt, ich bin ziemlich nervös.`
7. Structured case that collapses — pivot `Naja, vielleicht habe ich das doch gesagt.`
8. Thank-you that becomes a request — pivot `Und jetzt eine Frage: Haben Sie noch den Rest?`
9. Third formal letter that loses patience — pivot `Also, ich verstehe das wirklich nicht mehr.`
10. Formal card with one warm sentence in it — pivot `Ganz ehrlich, das Fest war wirklich toll.`

Twelve rows, which is the brief §6 arithmetic met exactly: `reicht`, `und jetzt`, `Ärger`, `Spaß`,
`egal`, `Sorge`, `toll`, `wahr`, `Rest`, `Brief`, `Ganz ehrlich`, `Liebe Grüße`. Ten of them are the
floor the schema forces — `deconstruction.words` has `minItems: 1` and en-de asserts one row per
surface — and the other two are the pivot markers themselves, `und jetzt` and `Ganz ehrlich`.
Everything else in fifty-odd sentences of German is borrowed from the forty-nine modules below.

What it teaches has no grammar of its own, and rule 3 says so as a prohibition. Rule 0 defines the
item: a piece, not a sentence, with a namable pivot line. Rule 1 is the interference the brief §4
identified — English shifts register through vocabulary, German through the address and the tense,
so an English-shaped shift leaves `Sie` and the tense untouched and the piece does not move. Rule 2
is the whole-course warning restated at the end of the ladder: warming a German formal register with
informal markers is what marks a foreigner. Rule 4 is an authoring decision recorded where a reader
will meet it — the `register` chip names where the piece LANDS, because a chip cannot hold two
values and the piece deliberately has two. Nine of the ten mistake plates are register errors rather
than grammar errors, as rule 3 requires: a pivot smeared across a whole piece, a pivot cancelled in
the next clause, a pivot run in the wrong direction, two closings from two registers, and — on S05 —
a letter that pivots all the way to `du` after opening `Sehr geehrte Damen und Herren`.

### The brief seams, checked against the emitted index

Eight corrections. Two would have shipped a display no row could resolve; one would have shipped a
row on a key an earlier module already owns.

**1. All five briefs quote a stale fold.** Each says *"checked with `npm run content:owner` against
945 surfaces through L4-M10"*. The tool printed `1068 surfaces owned, folded over 45 modules through
L5-M5` throughout this wave. Every claim below is against the 1068. The seam sentence in a brief
names a count AND a module and both go stale; the emitted index is the authority and it moves every
time a sibling wave lands.

**2. `bedeuten` and `bedeutet` are L5-M1's, and the L5-M8 brief still lists `bedeuten` as fresh.**
The brief §5 fresh-key list ends *"… `Sache`, `gemeint`, `bedeuten`, and the spans …"*:

```
bedeuten	L5-M1
bedeutet	L5-M1
```

This is Wave 2's correction #1 arriving in a second brief that was written from the same stale
945-surface fold. L5-M8 opens no row for the verb, writes `Was bedeutet das` as a three-token span
instead (free, and it claims none of `was`, `bedeutet` or `das`), and lets L5-M1's row carry the
tap. Following the brief would have been a `RE-TEACH` — a defect on this course — and a second seat
in `src/course/types.test.ts`'s one-owner-per-surface assertion.

**3. `sollten` is NOT L3-M4's; only `sollte` is.** The L5-M7 brief §4 names the Konjunktiv II
inventory as *"L3-M4 (`würde`, `hätte`, `wäre`, `könnte`, `sollte`, `müsste`)"*, which reads as a
paradigm and is not one:

```
sollte	L3-M4
sollten	free
```

`hätten` and `würden` are L3-M4's and `könnten` is L2-M1's, so the plural is bought for three of the
six and not for `sollten`. This is exactly the hole-in-a-paradigm case the wave brief warns about,
and it bites at L5-M6 rather than L5-M7: the natural opening for a case is
*Meine These ist, dass wir am Samstag öffnen sollten*, and it would have shown an untaught surface.
L5-M6-S01 writes `öffnen muss` instead.

**4. `will` is free, and the L5-M7 brief's own pattern needs it.** The brief lists
`Damit + will er sagen + , + dass + <verb-final>` among the module's patterns and does not name
`will` anywhere in §4 or §5:

```
wollen	L2-M6
wollte	L2-M10
will	free
```

So the third-person singular of a verb bought at L2-M6 was unowned at the top of L5. L5-M7-S05 opens
a row for it with a note pointing back at L2-M6 — the *new shape of an older lexeme gets its own row
in the module that first shows it* rule, applied rather than worked around. The row also carries the
false-friend warning that `will` is not English *will*, which is worth a row on its own.

**5. `Liebe` is free; only `Liebe Gäste` is owned.** The L5-M10 brief §6 says the two surfaces the
module may not write are `Lieber` and plural `ihr`, and that *"the piece opens with `Liebe` or
`Sehr geehrte`"*:

```
Liebe	free
Liebe Gäste	L5-M4
Sehr geehrte	L5-M4
Liebe Grüße	free
```

L5-M4 bought the two spans, not the bare adjective. A piece opening `Liebe Kollegen,` would have
shown an untaught surface on the last rung of the course. L5-M10 opens only with `Sehr geehrte` or
with the whole L5-M4 span `Liebe Gäste`, and takes its one informal sign-off as the span
`Liebe Grüße` — free, two tokens, and it claims neither part.

**6. `Na ja` written as two tokens is not `naja`.** This is the `sodass` / `so dass` warning
docs/92 inherited, in a second word:

```
naja	L4-M5
Na ja	free
```

The L5-M9 brief §2 asks for *"`also`, `na ja`, `jedenfalls` all over the spoken one"*, spelled with a
space. All five modules of this wave write `naja` as one token wherever the particle appears.

**7. `Wörter` is free, and the L5-M8 brief's reason for avoiding it is not the reason.** The brief
§4 says *"`Wort` and `Worte` — L4-M10, whose row note already distinguishes `Worte` from `Wörter`,
so neither is re-opened"*:

```
Wort	L4-M10
Worte	L4-M10
Wörter	free
```

L4-M10's note *mentions* `Wörter`; it does not own the surface. So the plural is unowned, and the
module writes the compound `Wörterbuch` — its own key — and never the bare plural. The brief's
instruction was right and its justification was wrong, which is the more dangerous shape of a seam
error because it survives a careless re-check.

**8. A dozen high-frequency paradigm cells are unowned, and the fold is the only way to find out.**
None of these is named in any brief; each would have produced a `SHOWN-BUT-UNTAUGHT` in a display an
author would have sworn was safe:

```
gab	free          es gab	L4-M8        alte	free       alt	L1-M10
großen	free       groß	L1-M10        alten	free      diesen	free
dieser	L2-M9      Helden	free         Wochen	free      arbeitet	free
braucht	free      unsere	free         gutes	free      niemand	free
genau	free       richtig	free         steht	free      bald	free
```

The pattern is consistent: the citation form is bought and the inflected cell is not. `es gab` is
L4-M8's as a span while bare `gab` is free, so a Präteritum narrative must write the span — L5-M9
does. `alt` and `groß` are L1-M10's while every attributive ending is free, so L5-M9's fairy-tale
furniture is predicative throughout (`Der König war jedenfalls sehr alt`) and never attributive.
`dieser`, `diese` and `dieses` are L2-M9's while the accusative masculine `diesen` is free, so
L5-M6 and L5-M8 use only the nominative and the neuter. And `Held` is a weak noun whose accusative
`Helden` is free, so all four L5-M9 displays that carry it keep it as the subject.

Two things the briefs got right and that are worth confirming rather than correcting. `es sei denn`
is three tokens, free, and claims none of `es`, `sei` (L4-M7) or `denn` (L1-M9); the emitted index
reports `maxSpan: 3`, so it and `zwischen den Zeilen`, `so etwas wie`, `Es war einmal` and
`Was bedeutet das` are all reachable, and a four-token phrase would not have been. And the L5-M9
plural law holds: `Märchen` is its own plural (one surface, one row), and `Helden`, `Könige`,
`Wälder`, `Wölfe` and `Schlösser` are all free but none is taught, so this wave adds no unreachable
plural row of the `Antworten` / `antworten` kind that docs/59 recorded.

### The ratchet

`tools/shown-surfaces.test.ts` holds `en-de` at **11**, and it stays at 11. None of the five modules
adds a finding:

```
L5-M6: clean — every shown surface resolves
L5-M7: clean — every shown surface resolves
L5-M8: clean — every shown surface resolves
L5-M9: clean — every shown surface resolves
L5-M10: clean — every shown surface resolves
```

with no `RE-TEACH` line on any of the five, which on this course is the requirement and not the
courtesy — `src/course/types.test.ts` asserts one owning row per surface, so a re-teach here is a
second seat on a key and not merely an unreachable note. No baseline was lowered: the eleven
existing findings are below L5 and nothing authored here can reach them, because
`checkShownSurfaces` resolves against the cumulative index *at* the module that shows the surface.

`npm run content:validate` → `CONTENT 445/445 ok` (`CONTENT 444/444 ok` on the run ten minutes
earlier — the total moves while the eight sibling waves land, so the number is not a fact about
en-de). `npx vitest run tools/shown-surfaces.test.ts` → **11/11 passed**, on three separate runs
across the wave. `npx vitest run src/course/types.test.ts` fails exactly one assertion, the module
census (*finds all 444 — nine L1-L4 ladders, and L5 closing course by course*), against a list that
had gained `content/en-ru/modules/L5-M10.json` between two runs; that one is the collecting parent's
to update as the sibling waves land, and it is not en-de's. The en-de language law itself — *keeps
en-de to the decisions its briefs settled: Sie, umlauts, one sie row (#361)* — **passes** with all
five new modules folded into it: one owning row per surface across the whole course, no lowercase
`ihr` or `ihnen`, no all-caps display, no `ß` respelled away, and an umlaut or `ß` written in the
German of each of the five.

### Open questions for the native pass

Continuing the chain, which now ends at 122.

123. **`Meine These ist, dass …` as an ordinary opening** (M6-S01). The module presents it as how a
     German speaker opens a case in a meeting or an email, not only in a seminar. Confirm the
     register, and say whether `Mein Standpunkt ist, dass …` is genuinely the everyday alternative
     the variation claims or whether it is heavier than `These`.
124. **`erstens` / `zweitens` / `drittens` with no comma** (M6-S02, rule 0). The module teaches that
     the ordinal takes the first field and the verb follows it directly, and that the English-style
     comma is a word-order error and not a punctuation choice. Confirm both halves, and say whether
     current usage tolerates `Erstens,` in writing.
125. **`allerdings` against `jedoch`** (M6-S03, M6-S07). The claim is that `allerdings` concedes
     something against your own case and `jedoch` is the flatter written *however*. Confirm the
     split, and confirm `jedoch` directly after the finite verb is as natural as `jedoch` in first
     position.
126. **`im Gegenteil` as a reversal of a NEGATIVE claim** (M6, rule 3; M6-S07 variation). The module
     says it lands as a rebuke after a neutral statement. Confirm the strength, and say what a
     German speaker uses instead when they only want to correct a detail.
127. **`Er behauptet, er könne …` with no `dass`** (M6-S08, rule 1). The module teaches the
     Konjunktiv I as verb-second with no `dass`, and claims `er kann` would quietly make the claim
     the speaker's own. Confirm both, and say how often `könne` is actually heard in speech as
     against read in print.
128. **`es sei denn` and `angenommen` as the two clause-openers that stay verb-second** (M6-S09).
     Confirm neither sends the verb to the end, and confirm the comma placement the module uses:
     `Wir öffnen am Samstag, es sei denn, der Chef sagt nein.`
129. **`Es zieht` as a complete request** (M7-S09). The module's strongest claim is that two words
     in a train or a waiting room will get somebody to close a window, and that adding the request
     undoes it. Confirm the effect, and say whether `Es zieht` alone is regionally uneven.
130. **`ausgerechnet` and where it sits** (M7-S07). The note says it goes immediately in front of
     the word it complains about and that moving it detaches it from anything. Confirm, and say
     whether `Ausgerechnet heute …` is as ordinary in speech as the module implies.
131. **`Na super` as sarcastic by default** (M7-S04). The claim is that the `na` is what turns it,
     that `Super!` alone is sincere, and that the falling contour is the marker. Confirm all three,
     and say whether `Na super` is safe with a colleague or only with a friend.
132. **`Wie bitte?` against `Entschuldigung?`** (M8-S06). The module teaches `Wie bitte?` as the
     repair signal and says a falling contour turns it into a challenge. Confirm the contour claim,
     and say which of the two a stranger in a shop would actually hear more often.
133. **`so etwas wie` keeping the article and `eine Art` stripping it** (M8-S03, M8-S04, rule 0).
     The module makes this the one grammatical fact separating the two paraphrase frames, and rejects
     `eine Art von einem Wörterbuch` on the mistake plate. Confirm both, and say whether
     `eine Art von` survives anywhere in current usage.
134. **`Verzeihung` against `Entschuldigung`** (M8-S08). The note claims `Verzeihung` is a shade
     more formal and fits a mistake you actually made. Confirm the split, and say whether
     `Verzeihung` now reads as dated to a younger speaker.
135. **The tense dial as a hard register law** (M9, rules 0–2; M9-S01, M9-S02, M9-S09). The module
     claims a fairy tale in the Perfekt sounds like somebody recounting their weekend, and that the
     four dials must move together. Confirm the strength of the claim for a northern speaker, and
     say how much the southern Perfekt preference L4-M8 recorded softens it in practice.
136. **`am Schluss` against `am Ende`** (M9-S10). The note claims `Schluss` is the end of a telling
     and `Ende` the end of anything. Confirm the distinction is real rather than stylistic, and say
     whether `Am Schluss` opening a sentence is spoken or written.
137. **`mir ist der Tag egal` as a flexible offer** (M10-S04). The claim is that the dative is what
     keeps `egal` from shrugging at the whole subject, and that `Der Tag ist egal` in a booking
     email lands badly. Confirm, and say how a German would actually offer the flexibility.
138. **A formal letter that pivots but keeps `Sie`** (M10-S05, M10-S09). The module insists the
     warmth comes from the content and never from the address, and its mistake plate rejects a
     letter that slips into `du`. Confirm that a company writing to a customer can pivot this far
     and stay in `Sie`, and say where the real ceiling is.
139. **`Ganz ehrlich` inside a formal card** (M10-S10). The last item of the course claims a formal
     card can carry one warm sentence in the middle and still close `Mit freundlichen Grüßen`.
     Confirm the piece reads as one person writing rather than as two, and say whether `Ganz ehrlich`
     is the right marker for it or whether a German would reach for something else.
