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
