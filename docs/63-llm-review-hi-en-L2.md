# hi-en L2 — LLM review

The review that clears each hi-en L2 wave to ship, written in the same change that authors it
(`CLAUDE.md`). The **native-speaker gate is a separate, stricter bar and stays unmet**: every
section ends in open questions for a native pass, and no later wave may close one by rewriting a
shipped module.

Open questions are numbered as a fresh hi-en L2 chain from 1.

## Wave 1 — L2-M1, L2-M2 (#437)

Authored against the briefs of #428 and the decisions in `docs/55`. Reviewed against the real
cumulative index: 259 surfaces through L1-M10.

### L2-M1 "Asking politely"

The module is one sentence said five ways, and the ladder is visible in one screen: `Give me the
book` (S01) → `Please give me the book` (S02) → `Can you give me the book?` (S03) → `Could you give
me the book?` (S04) → `Would you mind waiting?` (S05). The chip carries the tier and the rules say
the law out loud — English politeness comes from turning the request into a question and making it
longer, and the verb never changes.

Three notes do work a rule could not:

- **S02's trap** says that `please` softens an order and does not turn it into a request. That is
  the sentence a Hindi speaker most needs, because mapping दीजिए onto imperative-plus-`please` is
  exactly what produces `Do it, please`.
- **S04's trap** says `could` is not a past tense here — it makes distance, and distance is
  politeness in English. Hindi does not do that at all, so it has to be said rather than shown.
- **S05's trap** is the answer, not the question: `Would you mind…?` is answered `No`, and the
  learner who says `Yes` has refused.

The Indian-English line is drawn once, in rule 5: `kindly` and `do the needful` are named as
ordinary and not wrong, and the course writes `please`. No sentence carries one.

### L2-M2 "Describing people"

The delta a Hindi speaker feels first is an ABSENCE — English adjectives never agree — and S01 is
built to make the absence visible: `My sister is tall` with the same `tall` as `My brother`. Two
levels of habit (gender and number) have to go at once, so the rule says both.

The stative-verb rule is spent where it bites: `He is having brown eyes` is the marker, and S03's
mistake block is exactly that sentence. It is the single most audible Indian-English feature in
this module's territory, and naming it as a marker rather than an error is the whole of `docs/55`
§1 in practice.

Two rulings held. **The possessive `'s` opens at M2** (S04), with the note saying the index sees
`brother` and `brother's` as two different words and the `'s`/`is`/`has` collision named in the
same breath. And **English is poorer than Hindi here**, which the module says plainly: `cousin`
covers eight Hindi words (S09), `uncle` four (S10), and `brother` carries no age, so `younger
sister` needs an extra word (S08). A course that only ever taught deltas one way would hide that.

S09's mistake block is `cousin brother` — ordinary in India, unusable abroad — which is the
Indian-English rule applied to a specific sentence rather than to a category.

### Two self-caught violations of the repo's own rules

- **`forms` must be a real paradigm.** The first draft put `short` in `long`'s `forms`, `daughter`
  in `sons`', `aunt` in `uncle`'s, and `sister's`/`friend's` in `brother's`. Every one of those is
  an antonym or a sibling lexeme rather than a shape of the same word, which is the rule
  `docs/07`'s forms discipline sets and hi-mr's own review had to enforce twice. All four were
  reverted and the variations rewritten instead.
- **A test outgrew its scope.** `src/course/types.test.ts` banned the possessive `'s` in every
  hi-en module, on the grounds that "no L1 job needs one". L2-M2's job does need one, so the check
  is now scoped to L1 — where the ban was made — and the straight-apostrophe rule still runs over
  everything. The comment records why.

### The ratchet

Caught in M1: `him`, `window`, `station`, `ana`, `much`, `for` — six variation-only surfaces.
`window` was promoted into S09's display (which needed it anyway, since `door` was already in S03's
variations); the rest were rewritten. Caught in M2: `short`, `got`, `sister's`, `friend's`, `ana`,
`teachers`, `these`, `younger`, `daughters`, `aunt`. `got` and `younger` became real rows —
`got` on S02, where `has got` had been used as a whole phrase for a level without the word ever
being taught, and `younger` as a genuine comparative of `young`. The hi-en baseline stays at 30.

### Open questions for the native pass

1. **The five-rung ladder** (M1). Authored as `Give` → `Please give` → `Can you` → `Could you` →
   `Would you mind`. Confirm the ordering matches how a British or American ear ranks them, and
   that `Can you` is not now level with `Could you` in speech.
2. **`Would you mind waiting?`** (M1-S05). The trap says the answer is `No`. Confirm that a native
   would in fact say `No, not at all` rather than `Sure` — which is what learners hear and which
   inverts the logic.
3. **`Thanks a lot`** (M1-S08). Given as the commonest spoken thanks. Confirm it does not read as
   sarcastic in isolation, which is a risk this note does not mention.
4. **`She's got long hair`** (M2-S02). The `has got` frame is British. Confirm it is the right
   default for a course that has not chosen a variety elsewhere, or whether `She has long hair`
   should be the display and `'s got` the variation.
5. **`hair` singular and `eyes` plural** (M2-S02, S03). Authored as a fact with no rule behind it.
   Confirm there is genuinely none to give.
6. **`cousin brother`** (M2-S09). Named in a mistake block as Indian English. Confirm the phrasing
   of the `why` does not read as a rebuke of the learner's own variety, which rule 5 of M1 is
   written to avoid.

## Wave 2 — L2-M3, L2-M4, L2-M5 (#446)

Three rungs against the briefs of #428. The wave's spine is the countable/uncountable split, which
M3 states as a law, M4 leaves alone, and M5 re-opens in the field.

### Two seam claims the brief got wrong, corrected against the rebuilt index

- **`brown` is not M3's to open.** The M3 brief lists it among the module's fresh keys, but
  L2-M2-S03 (`He's got brown eyes`) already owns it. M3 teaches `red`, `blue`, `green`, `black`,
  `white` and `yellow` and leaves `brown` where it is; nothing in the module needs it.
- **`bread` is M3's, not M5's.** Both briefs claim it. M3 comes first and needs it for the counter
  frame (`a piece of bread`), so M3 owns the row and M5-S04 and M5-S07 simply re-show it. M5's
  uncountable row is `salt`, which does the same work at the table.

### Two rows the briefs do not list and the module cannot do without

`bus` and `train` (M4-S06). The brief's transport patterns are `I go to <place> by N-transport` and
`Get on / Get off + the + N`, and the only vehicle L1 owns is `car` — which takes `get in`, not
`get on`, so the module's central contrast could not be shown at all without one of them. Both are
opened as ordinary rows in S06, where the zero-article rule is taught, and the ratchet confirms
nothing else in the wave leans on an untaught surface.

### The countability law, and why M5 does not contradict it

M3 states it once: an uncountable noun names a KIND rather than units, so it takes `some`,
`a lot of` and a counter, never `a` and never `-s`. M5-S09 (`Two teas, please`) looks like the
exception a learner will seize on, and the module says explicitly that it is not one — the cup is
being counted and simply not spoken. That is why `tea` gets a second row in M5 carrying only
`teas` in its `forms`: L1-M1 still owns the bare `tea`, and the plural is a new key that belongs to
the module teaching why it exists.

`much` and `many` are taught the way they are actually used rather than the way they are usually
explained: they live in questions and negatives, and a positive statement takes `a lot of`. The
mistake block on M3-S09 is `I have got much money`, which is the sentence the textbook rule
produces.

### The register half

M5 is M1's politeness law paying off. `Would you like…?` and `I'd like…` are the same `would` in two
seats, and rule 4 keeps the would-like sense off L1-M1's `like` row — the multi-token surface
carries the note, so the verb `like` (`I like tea`) is never overwritten. Rule 2 runs the refusal
delta in both directions, which is rarer than the usual one-way note: a ritual first refusal does
not survive translation, and neither does a host's duty to insist.

### The ratchet

Clean on all three modules at first build — the first wave in this course to need no content fix
after the check. The hi-en baseline stays at 30.

### Open questions for the native pass

7. **`The station is not far from here`** (M4-S04). The note claims bare `far` is awkward in a
   positive statement and that `a long way` is the natural form. Confirm, and confirm the claim is
   not too strong for a course this early.
8. **`opposite` vs `across from`** (M4-S05). Given as British and American forms of one meaning.
   Confirm they are interchangeable in the direction-giving frame, and that `opposite` without `to`
   is right in both varieties.
9. **`Get in the car`** (M4-S08). Authored without `to`. Confirm `get in the car` and
   `get into the car` are both current and that the shorter one is the right default.
10. **`Two teas, please`** (M5-S09). Confirm this is unremarkable in a café in both varieties, and
    that `Two teas` does not read as clipped without `Can I have`.
11. **`Could you pass the salt to me?`** (M5-S07). Named in the mistake block as less natural than
    `pass me the salt`, with the `why` saying it is not wrong. Confirm the ranking.
12. **`I'm full`** (M5-S05). Confirm it is the ordinary way to decline more food and carries no
    hint of complaint, and that `My stomach is full` really does read as non-native.
13. **`cheap` on a person** (M3-S06). The trap says it is close to an insult. Confirm the strength
    of that claim for both varieties.
14. **`a piece of advice`** (M3-S07). Given as the counter for `advice`. Confirm it is still current
    speech rather than a textbook survival.

## Wave 3 — L2-M6 through L2-M10 (#455)

Five rungs, and the level closes. A strict build emits `hi-en: 20 modules`.

### What each module actually spends its budget on

- **M6 Making plans together.** Not the futures — L1-M6 settled those and this module says so in
  rule 0. The spend is the time-preposition fork Hindi's single postposition has no shape for:
  `at` a clock time, `on` a day, `in` a month or a part of the day, and then `at night`, which
  breaks the pattern and is taught as the exception it is rather than smoothed over. `quarter to
  ten` gets the trap, because a learner who reads the first word as the hour arrives an hour early.
- **M7 On the phone.** Tag questions, built and never memorised: the auxiliary is always already in
  the sentence, and the tag mirrors it and flips its polarity. `isn't it?` as a universal tag is
  named in usage as ordinary Indian English and not written into a display — the mistake block shows
  the mirrored tag instead, and no rule calls the variety wrong. `say · tell · speak · talk` is
  taught by what follows each, not as a synonym list.
- **M8 When something goes wrong.** The present perfect enters here and nowhere else in L2, lifted
  narrowly to the present-result use. Rule 1 kills the slogan that produces `*I've lost it
  yesterday`: the form is about NOW, which is exactly why a finished time expression cannot sit in
  it. The register half is the level's sharpest: English complains indirectly, and the hedges
  (`I'm afraid…`, `It seems…`, `Sorry to bother you, but…`) are words rather than forms, as M1
  promised.
- **M9 Comparing and choosing.** The comparative changes the adjective, which Hindi never does, and
  both errors that follow get a mistake block (`*more taller`, `*tall than`). `than` vs `then` is
  its own rule: one letter, no audible difference, and `then` is L1-M10's key, so a slip would send
  every comparison in the course to a note about sequence.
- **M10 Telling what happened.** Nothing new is opened. The past continuous carries the background
  and the past simple moves the story, glued by `when`; the sequencers `first`, `after that` and
  `finally` join L1-M10's `then`. The irregular past forms are taught as a list, because that is
  what they are.

### Where the briefs needed correcting or extending

- **`help` is already L2-M1's.** The M8 seam lists it as a fresh key; M1 opened it. M8 re-shows it
  in `Sorry to bother you, but I need help` without a row.
- **`I've` needed a row the M8 seam does not list.** The seam names `haven't` and `hasn't` but not
  the affirmative contraction, and L1-M10 only ever indexed `i've got` as a whole surface — so bare
  `I've` was untaught in the module whose first display uses it. Opened as a row with `I have` in
  its `forms`.
- **`with` was the only ratchet finding in the wave**, on M8's `There is a problem with the phone`.
  It became a real row rather than a rewritten variation: the frame is the module's softest
  complaint and the word had to be taught to use it.
- **`bus` and `train` (M4), `phone` and `him` (M7), `evening` and `night` (M6), `bad` (M9).** Rows
  the briefs omit and the modules cannot do without — `bad` in particular, because L1-M2 owns only
  the whole surface `not bad`, whose meaning is "all right", so the bare adjective had never been
  taught at all.

### Comparative shapes, and the additions-only law

M9's brief says a comparative belongs in the `forms` of its adjective's own row where the course can
still edit that row, and gets its own row where it cannot. That is what happened: `taller`/`tallest`
went into M2's `tall`, and `bigger`/`biggest`, `smaller`/`smallest`, `cheaper`/`cheapest`,
`heavier`/`heaviest` into M3's rows — all L2, all editable. `happier` and `busier` got rows of their
own in M9-S10, because `happy` is L1-M5's and `busy` is L1-M9's and L1 is closed.

### The ratchet

One finding across five modules (`with`, above), fixed in content. The hi-en baseline stays at 30.

### Open questions for the native pass

15. **`Shall we…?`** (M6-S02). Given as current and neutral rather than dated. Confirm for both
    varieties — American English may hear it as more marked than British.
16. **`quarter to ten` / `half past eight`** (M6-S07, S08). Confirm the bare forms without `a` are
    what people say, and that `nine forty five` is not now the commoner form in speech.
17. **`That sounds good`** (M6-S05). Confirm it is the ordinary agreement token and not slightly
    American.
18. **`He is not in`** (M7-S04). Confirm this reading of `in` is current in an office, and that it
    does not sound dated.
19. **`Hold on a moment`** (M7-S06). Confirm `hold on` beats `hang on` and `just a moment` as the
    default on a phone.
20. **The tag-question inventory** (M7-S09). Four tags are shown: `isn't it?`, `aren't you?`,
    `does he?`, `won't you?`. Confirm the intonation claim implicit in the usage note — that a tag
    seeks confirmation rather than information — needs no separate teaching here.
21. **`I'm afraid`** (M8-S06). Confirm it is not too formal for a learner at this level, and that it
    is heard in shops and on phones and not only in offices.
22. **`It seems there is a problem`** (M8-S08). Confirm this is natural spoken English and that
    `There seems to be a problem` (the brief's form, avoided here because bare `there` is untaught)
    is not so much commoner that the choice misleads.
23. **`less expensive`** (M9-S02). Confirm `less` before an adjective is current rather than a
    textbook form, and that `not as expensive as` is not overwhelmingly the spoken default.
24. **`I prefer tea to coffee`** (M9-S09). Confirm the `to` frame is still ordinary speech rather
    than written English.
25. **The accounts** (M10, all ten). Each is three or four short sentences. Confirm they read as
    something a person would actually say, and flag any that reads as a grammar exercise.
