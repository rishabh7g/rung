# hi-en L2 — the authoring-brief decisions (#428)

The ten hi-en L2 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['hi-en']` L2-M1…L2-M10), pinned
against the REAL cumulative index — `public/content/hi-en/index/L1-M10.json`, rebuilt and read on
2026-09-08: **259 surfaces, maxSpan 3** — and against the spoken-English pass (`docs/39`), which
put `I'm` into M1 and moved M6's plans onto `be + -ing`.

**The four L1 decisions carry unchanged**: Hindi in every teaching field with no `glossEn`;
contractions as single index surfaces; multi-token surfaces keeping bare words free; and
first-occurrence-wins homograph owners. M1's first note and M10's last say so.

## 1. Register in English is WORDS, not forms

Hindi grades a request in the verb — दे · दो · दीजिए — on top of तू / तुम / आप. English has one
`you`, one imperative, and buys the whole scale with words and with sentence shape:

> Give me the book. → Please give me the book. → Can you give me the book? → Could you give me the
> book? → Would you mind giving me the book?

**The law: English politeness comes from turning the request into a question and from making it
longer; the verb never changes.** A learner who maps दीजिए onto imperative-plus-`please` produces
`Do it, please` — grammatical, and blunt. The chip (#422) carries the tiers: bare imperative among
friends `informal`, the `please` / `Can you` tier `neutral`, `Could you` / `Would you mind`
`formal`.

### The Indian-English line

The learner speaks a real, widely-spoken variety whose politeness formulas differ from the
international-neutral English this course teaches: `kindly do the needful`, `please revert`, `I am
having a doubt`, `isn't it?` as a universal tag. **These are not errors and no rule may call them
errors.** The rule is en-ar's dialect rule in another language: an Indian-English form may be
NAMED in `usage` prose, in words, and never appears in `display`, `forms` or a pool item. M1
carries the `kindly` line and M7 the `isn't it?` line; no other module needs one.

## 2. Contractions — a correction to the commissioning issue

#428 lists `won't` and `we'll` among the contractions L2 must own. The index says both are already
**L1-M6's**, with `I'll`, `you'll`, `he'll`, `she'll` and `they'll`; `wasn't`/`weren't` are
L1-M1's, `don't` M3's, `doesn't` M4's, `didn't` M5's, `it's`/`there's`/`where's` M7's,
`isn't`/`aren't` M9's and `that's` M10's. Briefs rule 1 applies to a brief's premises, so the list
is corrected rather than copied.

What L2 genuinely adds, one row each with both shapes in `forms` and never a pre-listed sibling:
`can't` (M1), `I'd` (M5), `let's` and `you'd` (M6), `haven't`, `hasn't` and `shouldn't` (M8),
`wouldn't` (M9). Straight `'` only.

## 3. The possessive `'s` — the ban lifts at M2

L1's decision 2 ended "no possessive `'s` in L1 … no L1 job needs one". M2's job needs one, so the
ban lifts there with its cost stated: `brother` and `brother's` are two index keys, the possessive
is deconstructed on its own row pointing back at the bare noun, and a proper-noun possessive
(`Rohan's`) never indexes at all (#61). The collision named in the same note: `'s` is also `is`
(`he's`, L1-M6) and `has` (`he's got`, L1-M10) — three different `'s`, one honest note.

## 4. What L2 withholds, and the one prohibition it lifts

Out, and named where it would be reached for: **reported speech** (L3-M5), which is why M7 takes a
message with `Can I take a message?`; the **past perfect** and **`used to`** (L3), so M10 runs on
the past simple and past continuous alone; the **passive**; **relative clauses**; **conditionals**
beyond the frozen `Would you mind`.

Lifted: the **present perfect**, at M8 and nowhere else — the present-result use only, on verbs
the course already owns. The law that makes it teachable: **it is about NOW, so it can never carry
a finished time expression** (`*I've lost it yesterday`). The slogan to kill is "the present
perfect is for the recent past" — recency has nothing to do with it, which is why `I've lost my
key` holds whether the key went missing a minute or a month ago. Experience and duration uses are
L3's.

## Seams L2 adds

- `Would you mind` (M1) and `a lot of` (M3) ride as three-token surfaces, the course's span limit;
  `Excuse me`, `how about`, `across from`, `this is` and `Would you like` as two-token surfaces.
- `get` is free (L1 only ever indexed `get up` / `gets up`), so M4 owns it for the phrasal family.
- `by` is genuinely new — L1 never indexed it — and M4's row teaches the means reading.
- `much` and `many` are free (L1-M8 indexed `how much` / `how many` whole), so M3 owns them.
- `than` (M9) is one letter from L1-M10's `then` and no audible distance at all; the row says so.
- `would like` (M5) wears L1-M1's `like` spelling and must live on the multi-token row, never
  overwriting the verb.
- `in` gains a third job at M7 (`he's not in`), pointed back at L1-M4's row, never re-opened.

## Bounds and shape

Bounds climb 8 → 10 (M1–M3: 8, M4–M7: 9, M8–M10: 10); `newWordCap` stays 25; pools are authored
to 12; M1–M3 ship fully enriched; M10's items are four-sentence accounts with sequencers.
`npm run content:prompt -- hi-en L2-M1` renders from the real index, and the decisions above are
pinned by `tools/course-briefs.test.ts` (`hi-en L2: the decisions its briefs settle (#428)`).
