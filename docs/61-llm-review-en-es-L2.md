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
