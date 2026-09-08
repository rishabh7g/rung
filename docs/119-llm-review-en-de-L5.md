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
