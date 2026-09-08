# en-es L2 — LLM review

The review that clears each en-es L2 wave to ship, written in the same change that authors it
(`CLAUDE.md`, "Ship `verified: true` in the authoring change"). The **native-speaker gate is a
separate, stricter bar and stays unmet**: every section below ends in open questions for a native
pass, and no later wave may close one of them by rewriting a shipped module.

Open questions are numbered as a fresh en-es L2 chain from 1. The L1 reviews (`docs/07`, `14`,
`18`, `22`, `41`) number their own findings per document and are not continued here.

## Wave 1 — L2-M1, L2-M2 (#435)

Authored against the briefs written by #426 and the decisions recorded in `docs/53`. Reviewed
against the real cumulative index: 228 surfaces through L1-M10, 253 through L2-M1, 291 through
L2-M2, `maxSpan` 3.

### L2-M1 "Asking politely"

The module teaches the FRAME rather than the pronoun, which is the level's register decision and
the correction `docs/53` §0 records: L1-M2 already taught `usted` on a row of its own, so nothing
here introduces it. The ladder is visible in one screen — `¿Me da…?` (S01) beside `¿Me das…?`
(S02), `¿Puede…?` (S03) beside `¿Puedes…?` (S04) — and the chip carries the tier rather than the
prose.

Three things checked hard, because each is a place a brief could have been wrong:

- **`me` is this module's key, not M5's.** The brief gave the bare clitic to M5; authoring found
  that `¿Me da un café?` is M1's own first pattern, and first occurrence wins. Both brief notes
  were corrected in the same commit rather than authored around — M1's seam note now opens the
  row and M5's points back at it. This is the second time in the repo that authoring has moved a
  key an unexecuted brief had assigned elsewhere.
- **The stem change is a rest point, not news.** L1 shipped `quiero`/`quieres` (e→ie) and `cuesta`
  (o→ue) without ever naming the pattern, so rule 2 names it and points back at both, and S03's
  note says the o returns in `poder`. No sentence claims the change is unpredictable.
- **The three-way split of English "sorry"** (S05, S06, S07) is authored as three separate
  sentences rather than as one note listing three words, because the difference is which moment
  each belongs to and a list cannot show a moment.

S10 is the module's hardest sentence and it earns its place: `¿Me puede dar un vaso de agua?`
puts the clitic in front of BOTH verbs, which is the placement rule a learner cannot guess from
S01.

### L2-M2 "Describing people"

`tener` is the module's spine — features and possession alike — and the article that stands where
English wants a possessive (`tiene EL pelo largo`) is authored into the frame rather than
mentioned. The `ser`/`estar` pair is taught on `listo` (S07 against S08), which is the clearest
case in the language of the two verbs changing a word's MEANING rather than its strength, and it
is the honest sequel to L1-M2, which split identity from condition and stopped there.

Two rulings from `docs/53` held in the authoring and are worth recording as held:

- **`bueno` never appears.** Its key is L1-M10's discourse "well, …", so a good person is
  `simpático` or `amable` and a good thing waits for M3's `buena`. No sentence or variation in
  this wave writes masculine singular `bueno`.
- **`mayor` is this module's row** (S09), with its note already true of the comparative job M9
  will give it. M9 must point back rather than open a second row.

Two false friends are spent deliberately: `largo` (S03) is length and not English "large", and
`simpático` (S05) is good company and not English "sympathetic".

### The shown-surface ratchet did its job, twice

`tools/shown-surfaces.test.ts` (#491) caught two waves of variation-only surfaces that the build's
pool-token rule does not see, and both were fixed in content rather than by moving the baseline:

- L2-M1's first draft showed `esperar`, `más`, `despacio`, `tienes`, `entiendo` and `por` in
  variations alone. `esperar` was promoted into S09's display (which became `¿Puede esperar un
  momento?`, a better sentence than the verbless `Un momento, por favor` it replaced, now its own
  variation); the rest were rewritten out. **`por` in particular had to go**: `docs/53` §4 keeps
  bare `por` unowned across the whole level, and `Muchas gracias por el café` would have taken the
  key in a variation nobody planned.
- L2-M2's first draft showed `baja` and `simpáticos`. `simpáticos` was a real missing cell and
  joined `simpático`'s `forms`; `baja` was rewritten out, because no display in the wave teaches
  `bajo` and a `forms` list must hold shapes of the word it belongs to.

The en-es baseline stays at 10 and is unchanged by this wave.


## Wave 2 — L2-M3, L2-M4, L2-M5 (#444)

Reviewed against the cumulative index at each rung: 291 surfaces through L2-M2, and the wave
carries the course to L2-M5.

### L2-M3 "Describing things"

The four-cell grid is drilled on a colour (S05) and the two-cell class on `azul` (S01, S02),
which is the split the job line means by "at length". Three rulings from `docs/53` were paid here:

- **`bueno` never appears in a display, and S10 says why in its own note.** The row is authored on
  `buenas` with `forms` `buena · buenas · buenos` and no masculine singular, because that key is
  L1-M10's discourse "well, …". The note tells the learner what to say instead rather than leaving
  a hole they will fall into.
- **`gran` against `grande`** (S03, S04) is taught as one word in two positions rather than as two
  words, and `nuevo` (S07) gets the same treatment in its own note — the position shift is a
  pattern, not a quirk of one adjective.
- **`muy` against `mucho`** (S09) is authored with both rows in one sentence, because the error is
  a swap and a swap needs both halves visible.

`malo` (S06) is this module's key, with its note already distinguishing it from L1-M9's `mal`.

### L2-M4 "Getting around"

`hay` against `está` (S01, S02) is the module's law and the mistake block is the exact English
shape — `¿Hay la tienda…?`, "there is the shop". The polite imperative is taught as a recipe from
the I-form (`sigo` → `siga`, `giro` → `gire`, `cruzo` → `cruce`, `tomo` → `tome`) with a note in
rule 1 that L3's subjunctive will reuse the shape, so the level ships the words and names the
system rather than hiding the connection.

The seam decisions held: `a la derecha`, `a la izquierda` and `todo recto` are authored as
whole-phrase rows, keeping L1-M4's `a` and L1-M8's `todo` where they are; bare `se` (S06) is this
module's key with its note true of the impersonal and pointing at `se llama`.

One spelling rule earned its own sentence: `cruzo` → `cruce` (S09), because Spanish never writes
`ze` and a learner who does not know that will write `cruze` forever.

### L2-M5 "Food and hosting"

`para` enters for the recipient and nothing else (S01), with the `por`/`para` contrast named as
deferred in rule 0 — and bare `por` still appears nowhere in the level. The clitic law is taught
on `lo` (S03) with the note saying plainly why `la`, `los` and `las` are not offered.

Two things the module gets to say that a vocabulary list could not: `otro` takes no article (S04),
which is the whole sentence's lesson; and `que` after a verb of thinking is obligatory (S06),
where English drops "that" so freely that it feels optional.

The refusal (S05) was rewritten during authoring, and for the better. Its first draft was
`No, gracias, no tengo hambre`, which put `mucha` in a variation where no row owned it. Rather
than delete the variation, the display became `No, gracias, no tengo mucha hambre` and `mucha`
got a row of its own pointing back at L1-M1's `mucho` — which is exactly the level's forms policy
(a new SHAPE of an L1 lexeme is deconstructed in the L2 module that first shows it) doing its job
for the first time in this course.

### The ratchet, again

Three more rounds of variation-only surfaces were caught and fixed in content: `banco` and
`más rápido` in M4, `ya`, `nos` and `mucha` in M5. `banco` was promoted into M4-S02's display,
which is a better existence question than the shop it replaced; `mucha` became the row described
above; the rest were rewritten out. The en-es baseline stays at 10.

## Wave 3 — L2-M6…L2-M10 (#453) — the level closes

The last five rungs, taking en-es to twenty modules and 477 surfaces, `maxSpan` 3. The level's
`draft` flag comes off in the same change.

### L2-M6 "Making plans together"

The `nosotros` cell arrives and doubles as the suggestion — `¿Vamos al cine?` is both "we go" and
"shall we go", so Spanish needs no extra word where English needs "let's". `podemos` (S03) is the
sentence that shows the stem change has a rule: the stress moves off the stem and the `ue` goes
with it. The clock teaches `y media` and `y cuarto` and stops there, because `menos cuarto` would
spend M9's key before M9 could give it its comparative note — the brief's ruling, held.

`conmigo` (S02) is the one place in the language where a preposition and a pronoun have grown into
one word, and it gets a sentence rather than a footnote.

### L2-M7 "On the phone"

The payoff of a decision L1-M1 made: `Me llamo` was indexed whole, which left `llamo` free, so
`te llamo` (S05) is a different key with a different note. S05's own trap says it out loud,
because a learner who has said `me llamo` for two levels will otherwise read `te llamo` as
"I name you".

The gerund enters here and the module states what it does NOT do: `estoy comiendo` is this moment,
and tomorrow takes M6's plain present. `Diga` (S01) is Spain's phone opener and its note gives
`¿Aló?` and `¿Bueno?` as the Latin American ones — the second of which the level cannot teach,
since `bueno` is L1-M10's key. S10 opens no new word at all, which is what a module's last
sentence should look like.

### L2-M8 "When something goes wrong"

`doler` (S01, S02) is the structural payoff of the whole course: it is built exactly like
`gustar`, so the thing that hurts is the subject and `me duelen los pies` follows from `me gustan
los libros`. The rule says it in those words — `gustar` was never a quirk, it is a class.

`problema` (S09) keeps the promise L1-M1's gender note made when it refused the "-o/-a" shortcut.
And S10 gives the clitic its second legal position — glued to a dictionary-form verb, `ayudarme` —
with the mistake block set on the one place it may not go, loose between two verbs.

### L2-M9 "Comparing and choosing"

`más … que` costs no new function word, because `que` is M5's row and `de` is L1-M1's; the work is
the choice, not the vocabulary. `mejor`/`peor` and `mayor`/`menor` are taught as four words that
already carry their comparison, with the doubled `*más mejor` as the mistake — the same error
English makes with "more better".

`esta` against `está` (S03) is the accent law at its sharpest: the two sit in the same sentence
shapes, and S03's second variation puts both in one line so the difference is visible rather than
asserted.

### L2-M10 "Telling what happened"

Each item is a four-sentence account and the module opens almost nothing: `había`, `nadie`,
`algo`, `tarde`, `al final`, and the past cells an account needs. S10 introduces no new word at
all.

The imperfect/preterite law is stated as a role in the telling rather than as a property of the
event, and the slogan is killed in the same words en-ru's, en-it's and en-fr's M10s use. Two
sentences do the work a rule cannot: S03's `la película era muy buena` against `fui al cine`, and
S05's `estaba muy cansado` against `no comí nada`. The mistake blocks are all tense swaps, because
that is the only error this module can produce.

`llegué` (S04) earns its own note for the silent `u` that keeps the `g` hard — the same kind of
spelling rule as M4's `cruzo` → `cruce`, and the second time the course has had to explain that
Spanish spells around its own sounds.

### The ratchet across the wave

Five more rounds caught and fixed: `ir`, `juntos`, `punto`, `este` in M6; `médico`, `su`, `doy`,
`cuál`, `llame`, `fácil` in M7; `llamar` in M8; `lento`, `habla`, `yo`, `esto` in M9; `compré`,
`dolía`, `podía`, `tenía` in M10. Every one was a variation reaching for a word no row owned, and
every one was rewritten rather than baselined. Notice what the list is made of: mostly other cells
of verbs the module DOES teach, which is the failure mode a `forms` list is supposed to catch and
a variation slips past. **The en-es baseline stayed at 10 for the whole level** — ten modules, 249
new surfaces, and not one addition to the debt.

### Open questions for the native pass



1. **`¿Me da un café?` as the default counter frame.** The module makes it the ordinary way to
   order in Spain. In much of Latin America `¿Me regala un café?` or `Me da un café, por favor`
   without the question intonation is commoner. Is the Peninsular default the right one for a
   course that has already chosen `Soy de la India` and `enfermo`, or should `usage` name the
   regional alternative?
2. **`Disculpe` against `Perdone`.** S07's note calls them interchangeable and gives `Disculpe`
   as slightly commoner in Latin America. A native pass should say whether that is true of Spain
   too, or whether `Perdone` is doing work there that `Disculpe` does not.
3. **`muy amable` as a complete thank-you** (S08). Authored as a whole sentence with the subject
   and verb left out. Confirm it does not read as clipped in the mouth of a learner.
4. **`hermanos` for mixed siblings** (S06). The trap says asking `¿Tienes hermanos?` asks about
   siblings of either kind. Check that a native would not hear it as asking about brothers
   specifically and expect `¿Tienes hermanos o hermanas?` — which S06 writes — as the neutral form.
5. **`Es mi amiga y es muy amable`** (S10). Two clauses, no pronoun in either. Confirm the second
   `es` reads as the same person rather than as a new subject.
6. **`mayor` without an age** (S09). `Mi hermana es mayor` is authored as complete. A native pass
   should confirm it does not want `mayor que yo`.
7. **`Tome el autobús`** (M4-S07). In Spain `coja` is commoner for catching a bus and the note
   says so. Confirm that `tomar` reads as neutral rather than as a foreigner's word there.
8. **`¿Me pone un café?`** (M5-S02). Authored as the Spanish bar default with `¿Me da…?` and
   `¿Me trae…?` named as the wider forms. Check the note does not overstate how regional it is.
9. **`Creo que está fría`** (M5-S06). The negative variation writes `No creo que está frío`,
   which careful Spanish would put in the subjunctive. The variation's `changed` line says so;
   confirm the indicative is what people actually say, or the variation should go.
10. **`verdura` singular** (M5-S09). Authored as the kind-word with `verduras` counting
    individual ones. Confirm a menu would not simply say `verduras`.
11. **`un agua`** (M5-S08 variation). Written with `un` because the noun starts with a stressed
    a. Confirm `un agua` rather than `una agua` in a bar order.
12. **`Diga` as the phone opener** (M7-S01). Authored as Spain's, with `¿Aló?` and `¿Bueno?` named
    in `usage`. Confirm `Dígame` is not now the commoner of the two in Spain.
13. **`se pone`** (M7-S03). Given as "she's coming to the phone". Confirm it is still current
    rather than dated, and that `ahora se pone` is what a household actually says.
14. **`No funciona` for a phone** (M8-S03). The rule contrasts it with `trabajar` for people.
    Check that `no va` is not the commoner spoken form for a device that has stopped.
15. **`Es la tienda más barata de la calle`** (M9-S04). Confirm `de` rather than `en` for a street,
    which is the case the rule is stated on.
16. **`Hablamos mucho`** (M10-S02). Authored as a past, relying on context alone to separate it
    from the present. Confirm a native reads it as past in that four-sentence frame.
17. **`Mi madre dijo que estaba buena`** (M10-S07). The imperfect is kept after the reporting verb.
    Confirm this is what people say, and that the sentence does not want `estaba muy buena`.
18. **The whole-account items.** Every M10 display is four sentences. Confirm the pacing reads as
    one person telling one small story, rather than as four unconnected lines.
19. **`Estaba en el trabajo`** (M10-S06). The account runs `Mi hermano llamó ayer. Estaba en el
    trabajo.` and the cue reads it as "I was at work", but the Spanish is equally "he was". A
    native pass should say whether the four-sentence frame settles it, or whether the item needs
    `yo estaba` — which would break the module's own no-pronoun rule and is therefore a real
    question rather than a typo.
