# LLM review — hi-en, the comprehension-pool pass

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Fable 5), which
cannot hear anything and is not a fluent-English editor in the sense this course eventually needs.
`verified: true` on all ten hi-en modules still rests on the repo owner's authority, exactly as
the five earlier hi-en reviews say; each of the ten was re-read whole here — rules, word rows,
notes, traps, sentences, variations and pools — and keeps `verifiedAt: "2026-08-24"` under this
pass's signature (all ten already carried today's date from #288's restamp; this pass re-earns it
rather than inheriting it). **No fluent-English gate exists for this course**, and the open
questions at the bottom continue `docs/21-llm-review-hi-en-variations.md`'s numbering (which
ended at 13), joining the 101 already outstanding across the five earlier hi-en reviews.

This is issue **#292**. Going in, hi-en's comprehension pools held 90 items — M1–M3 at eight,
M4/M5/M6/M9 at nine, M7/M8/M10 at ten. Coming out they hold **120: twelve per module**, the
per-module counts now pinned in `tools/content-build.test.ts`. Pool size is retry freshness
(`src/engine/comprehension.ts`: at `comprehendCount` 2, twelve items are six fresh exit attempts
before recycling, up from four at eight). **Nothing else moved**: no sentence, no variation, no
word row, no rule — the diff inside each module is appended pool objects only, plus the trailing
comma on the former last item. Items whose one-line form would pass 100 characters use the same
wrapped object shape the neighbouring long items already use; the shorter ones keep the
one-line shape. No existing item was reformatted, reworded or re-cued.

## Method

The constraint is `checkComprehensionPool` (`tools/content-build.ts`, PRD §6.3): every token of
every pool item must resolve in **that module's own cumulative index** — not the course's last
one — so every new item was authored from the module's own cumulative surface set
(24 → 40 → 57 → 91 → 109 → 127 → 149 → 172 → 189 → 203 keys) and gated by the strict build,
which reports zero pool warnings. Consequences the sweep enforces for free:

- none of the twenty-seven decided misses of `docs/17-llm-review-hi-en-surfaces.md` (`priya`,
  `jaipur`, the sibling-word exemptions, the reserved `three`/`six`/`hundred`, M10's
  `well`/`now`/`bus`) can appear in a pool item — they are not index keys, and an item using one
  fails the build. None appears;
- inflections the course never taught stay out: there is no `likes`, no `his`, no bare `got` —
  third-person like-sentences ride the copula (`Rohan is my teacher`), past retrieval rides the
  taught `did … see`;
- the multi-token keys resolve as spans, exactly as their existing pool uses prove out:
  `rohan sharma` (M1-C09), `there are` (M7-C12), `can i have` (M8-C11), `get up` (M9-C12).

Checks run on top of the build's own gate, each programmatic over the whole course:

- **hero-collision** — no pool item case-insensitively equals any of the 100 hero sentences
  (acceptance criterion 1, now also pinned as a test);
- **uniqueness** — no display duplicates any other pool item's, old or new, across the course;
- **complexity envelope** — every new item sits inside its module's
  `minWordsPerSentence`–`maxWordsPerSentence` band and its `allowedTenses` (M9-C08's
  pre-existing `she will eat` remains the pool's one tense outlier; this pass added none);
- **codepoint stability** — the 30 new cues introduce **zero characters** hi-en's content did
  not already carry, so the Devanagari subsets `fonts:build` derives cannot grow from this pass;
- **index identity** — `public/content/hi-en/index/*.json` byte-identical before vs after
  `npm run content:build` (pool items are never indexed; proven by hash, not assumed).

## The thirty items

Each recombines taught surfaces into a display the course has not shown — the exit ritual asks
the learner to READ, so an item that echoed a hero would test memory instead. Per module, with
what makes it fresh:

**M1** (8 → 12) — `My name is Rohan Sharma` (the #284 full-name key, first pool use) ·
`I am an English teacher` (the C07 compound frame, new noun) · `Rohan is my teacher`
(third-person copula meets the possessive) · `I like my book` (the like-frame over `my` + a new
noun). Cues stay in M1's plain register except C11's `रोहन मेरे शिक्षक हैं` — the honorific
plural for a teacher, matching what #288's M1-S05 variation established and docs/21's Q8
records.

**M2** (8 → 12) — `Are you an engineer?` (M1's noun in M2's question frame) · `Are you my
teacher?` (question over the possessive) · `No, I'm not tired` (the hero's short answer fused
with C08's negation) · `Hello, I am from Mumbai` (greeting + statement; Mumbai declarative for
the first time).

**M3** (8 → 12) — `I want to learn music` (want-to over a new object) · `Do you need water?`
(need interrogative; hero taught it declarative) · `I don't need sugar` (negation crosses from
want to need) · `Do you want two pens?` (numbered plural inside the question frame).

**M4** (9 → 12) — `She always drinks tea` (frequency adverb meets third-person -s) · `Does she
go to school?` (does-question over the go-frame) · `She eats breakfast at seven` (third-person
eats + time; the past-tense sibling lives in M5's pool).

**M5** (9 → 12) — `We drank coffee yesterday` (we + drank, both taught, never yet together) ·
`Did you see my keys?` (past retrieval over an M3 noun) · `I didn't eat rice yesterday`
(didn't + eat; the hero negated go).

**M6** (9 → 12) — `I'll call her tomorrow` (the `i'll` contraction's first pool outing, with the
object pronoun) · `They are coming next week` (they + the continuous-for-future frame) · `Will
you buy tea tomorrow?` (will-question over buy).

**M7** (10 → 12) — `Where is the school?` (where-is over a non-possessed noun) · `There are two
pens in the cup` (plural there-frame, cup as the container for the first time).

**M8** (10 → 12) — `Can I have five apples, please?` (the request frame over a new number-fruit
pair) · `This banana costs one rupee` (the taught singular `rupee`'s only pool use; singular
subject + `costs`).

**M9** (9 → 12) — `I think the food is very good` (think-statement over `food`; the hero asks
it) · `Why are you here?` (`here` leaves the because-clause into a question) · `I sleep early
because I get up early` (M4 machinery on both sides of M9's connector, at the module's
eight-word ceiling).

**M10** (10 → 12) — `I will cook tonight. Then I will sleep early.` (`tonight` + the Then-chain
in the future; C05 chains the past) · `My brother and my sister are here today` (`and` joining
subjects — C09 joins objects — with M9's `here` and M10's `today`).

## Verification

- `npm run content:validate` → **CONTENT 40/40 ok**
- `npm run content:build` (strict) → all four courses ship, **no pool warnings**
- `public/content/hi-en/index/*.json` before vs after rebuild: **byte-identical** (md5-verified,
  10/10 files)
- `npx vitest run tools/content-build.test.ts` → 82/82, including the new #292 pin
  (twelve per module, none a hero)
- `scripts/verify.sh` → `TYPES ok | LINT ok | TEST 1332/1332 ok | CONTENT ok | FONTS ok | BUILD ok | BUDGET ok`
- Payload, measured: `course:hi-en` **352.0 → 352.5 KiB** gzip (+0.5 KiB for 30 cued items),
  `precache:hi-en` 566.5 → **567.1 KiB**; shell and the other three courses unmoved, every font
  byte identical. The issue's raise-the-ceiling contingency was not needed.

## Open questions for a fluent-English pass

Numbering continues docs/21's list (which ended at 13); these four join the 101 already
outstanding across the five earlier hi-en reviews, for 105 in all.

14. **The honorific split inside one pool** — M1-C11 cues `रोहन मेरे शिक्षक हैं` (deference to
    the teacher, per #288's precedent) two lines under C02's plain `रोहन विद्यार्थी है`. Docs/21
    Q8 asked whether a native pass should flatten the variation lines; the same coexistence now
    sits inside a single module's pool.
15. **`This banana costs one rupee`** (M8-C12) — the only way to exercise the taught singular
    `rupee`, but a one-rupee banana is dated commerce. Does a comprehension item owe plausible
    prices, or only taught grammar?
16. **`They are coming next week`** (M6-C11) — destination-less `coming`; natural English and
    natural Hindi (`वे आ रहे हैं`), but every M6 frame the course *shows* carries a destination
    or object. A step the module never modelled, or honest ellipsis?
17. **`I sleep early because I get up early`** (M9-C12) — both clauses are pure M4 machinery;
    only the connector is M9's. Right use of the cumulative ladder at the exit, or does an M9
    attempt owe M9-native vocabulary?
