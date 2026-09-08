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
