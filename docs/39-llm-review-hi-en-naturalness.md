# hi-en — the naturalness audit (how English is actually spoken)

**Date:** 2026-09-05 · **Reviewer:** Claude, LLM review, authorised by the repo owner ·
**Scope:** `content/hi-en` only — all 100 sentence displays, 300 variations, 100 mistake plates,
120 comprehension items, 100 sound lines, and the word notes the findings touch ·
**Content changed by this pass: none.** This is the audit the six earlier hi-en reviews
(docs/11, 12, 13, 17, 21, 25, 27) deferred to "a fluent / native English pass". It rules on their
naturalness questions and adds what they missed, ranked so the owner can apply the top of the
list first. **It is still an LLM review, not a native ear** — the bar for `verified: true` stays
the repo owner's authority.

**The question asked of every line was not "is it correct" but "would a fluent speaker say it
this way, unprompted, in this situation".** Textbook-correct lines that no one says are findings.

---

## Verdict in three lines

- **The grammar is clean.** No display, variation or pool item is wrong English. The sound lines
  (all 100 sampled) match general pronunciation; nothing there needs changing.
- **The course sounds like a textbook in four systematic places:** it never contracts `be`
  outside `I'm` / `It's`; it uses `will` for planned futures its own M6 rule says take `going to`;
  it teaches the Indian-English `sleep late / sleep early`; and it writes `I think that …`,
  `Goodbye`, `I also like …` where speech has `I think …`, `Bye`, `… too`.
- **About a dozen individual lines are odd** (a reason that runs backwards, a habit on a single
  `Monday`, `I like water`, `Yes, Rohan is`). Each has a one-line replacement below.

---

## Tier 1 — a fluent speaker would notice (fix)

Ordered by how much of the course each touches. Every replacement resolves against rows the
course already teaches unless marked **new row** or **decided miss** (a variation surface the
sweep may not resolve, the precedent being `How's it going?` in docs/27).

### 1. Uncontracted `be` everywhere except `I'm` and `It's`

The course teaches `I'm` (M2) and `It's` (M7) as "the spoken form", then writes the full form on
every other subject. In speech `She is coming`, `We are going to`, `is not`, `was not`, `were not`
are emphatic or stiff; the neutral spoken shapes are `She's`, `We're`, `isn't`, `wasn't`,
`weren't`. This is the single biggest textbook tell in the course.

- Lines a native speaker would contract: M6-S03 var `She is going to buy a car`, M6-S05 var
  `She is going to visit Mumbai tomorrow`, M6-S06 `We are going to cook rice tomorrow`, M6-S07
  var `He is going to learn English`, M6-S08 var `We are meeting her next week`, M6-S09
  `She is coming to Delhi next week` (+ var `She is not coming next week`, C11 `They are coming
  next week`), M7-S06 var `No, it is not near the school`, M7-S03 var `The keys are not under
  the chair`, M5-S09 var `I was not happy yesterday`, M5-S10 var `We were not tired yesterday`,
  M9-S04 `… my friend is not here`, M9-S02 var / M9-S07 var / M10-S03 var `She is …`, M2-S05
  `What is your name?` (spoken: `What's your name?` — the sound line already admits it).
- **Recommendation (owner decision, one row):** extend M1's `be` row `forms` with
  `'s · 're · isn't · aren't · wasn't · weren't` and give M2-S05's `What` row a `What's` form,
  following the `I'm · I am` / `It's · It is` precedent. Then let the displays above contract.
  If the owner prefers to keep L1 uncontracted as a reading aid, the minimum fix is the
  **negatives**: `is not / was not / were not` in a statement are the lines that sound least like
  speech (M9-S04 is a display).
- Keep uncontracted, deliberately: `Yes, I am` (M2-S08 — sentence-final auxiliary never
  contracts, the note says so), `I am from India` etc. in M1 (`I'm` is M2's lesson).

### 2. `will` used for plans, against M6's own rule

M6 rule 1 says it right: `will` = a decision made now or a guess; `going to` = a plan already
made; `be + -ing` = an arrangement. Then three of the four `will` displays state pre-made plans
with `tomorrow`, which is exactly what a native speaker does **not** use `will` for.

- M6-S03 `She will buy a car tomorrow` → swap display and variation: **`She's going to buy a
  car`** (display), `She will buy a car tomorrow` demoted or dropped. Resolves docs/13 Q1.
- M6-S04 `They will eat at home tomorrow` → **`They're eating at home tomorrow`** (arrangement,
  S08/S09's frame) or, keeping `will`, recast the cue as an on-the-spot decision. Resolves
  docs/13 Q2 (`eat at home` itself is fine).
- M10-S04 `I want rice because I will cook tonight` → **`I need rice because I'm cooking
  tonight`** (`need` is M3's; `cooking` is a new -ing form on M6's `cook` row).
- M6-S01 `I will go to Delhi tomorrow` → **keep.** Rule 4 bans `going to` before a place at this
  rung, and `I'm going to Delhi tomorrow` would need that seam reopened. Its usage line should
  stop saying `will` states an इरादा; say फ़ैसला अभी लिया (`Okay — I'll go to Delhi tomorrow`).
- Genuinely will-shaped and natural, keep: M6-S02 `Will you come tomorrow?`, M6-S10 `I will call
  you tomorrow` (a promise), M9-S02 var `I'm tired, so I will sleep early` (decision — but see 3).
- docs/13 Q5 (`I will call you` vs `I'll call you`): a native speaker says `I'll`. The display
  can stay `I will` because the tappable row is the lesson, but the usage line should say the
  spoken form is `I'll` — it currently does not.

### 3. `sleep late` / `sleep early` is Indian English

In general English `sleep late` means *sleep in* (wake up late) — the opposite of the cue देर से
सोना. `sleep early` is not idiomatic at all; the phrase is `go to bed early`. A learner who says
`I sleep late because I'm busy` abroad will be misunderstood. Resolves docs/13 Q12 and Q23: the
note should not carry "both readings" — the display should say what the cue means.

- M9-S05 `Why do you sleep late?` → **`Why do you go to bed late?`**; M9-S06 `I sleep late
  because I'm very busy` → **`I go to bed late because I'm very busy`**; var `I don't sleep
  late` → `I don't go to bed late`; M9-C02 `… so I sleep late` → `… so I go to bed late`;
  M9-C12 `I sleep early because I get up early` → `I go to bed early because I get up early`;
  M10-S03 `I will sleep early` → **`I'll go to bed early`**; M10-C11 `Then I will sleep early` →
  `Then I'll go to bed early`; M9-S02 var likewise.
- **New row:** `go to bed` (multi-token surface like `next to`, `going to`; cue सोने जाना).
  M9 has 16 of its 25 rows used, so there is room. `sleep` can stay as a row (`I sleep at ten`)
  or go, since after this change no display uses it.
- Alternative that avoids a new row: `stay up late` — also a new surface, and it has no
  `early` counterpart, so `go to bed` is the better buy.

### 4. The coffee reason runs backwards (M9-S01, S02)

`I don't want coffee because I'm tired` and `I'm tired, so I don't want coffee`: to a fluent
ear tiredness is the reason to **want** coffee, so both lines read as a puzzle. The negation is
worth keeping (it is what the `because` / `so` machinery is tested on). One replacement fixes
both and resolves whole from taught rows (`it's` M7, `late` M9):

- M9-S01 → **`I don't want coffee because it's late`** (cue: मुझे कॉफ़ी नहीं चाहिए क्योंकि देर हो गई
  है). Mistake plate becomes `Because it's late, so I don't want coffee` — the same lesson.
- M9-S02 → **`It's late, so I don't want coffee`** (cue: देर हो गई है, इसलिए मुझे कॉफ़ी नहीं चाहिए).
- The variations `I want tea because I'm tired` and `She is tired, so she doesn't want coffee`
  need the same treatment (`she doesn't want coffee because it's late`, or keep `tired` with a
  positive: `She's tired, so she wants coffee`).

### 5. A habit on a single `Monday` (M4-S06)

`She works on Monday` states one particular Monday; the habit the cue and usage line describe is
`She works on Mondays`. Resolves docs/12 Q1 — a native speaker hears the singular as a schedule
for this week only.

- M4-S06 display → **`She works on Mondays`**; vars `He works on Mondays`, `Does she work on
  Mondays?`; M4-C04 `Does she work on Mondays?`. Add `Mondays` to the `Monday` row's `forms`.
  Cues are unchanged (Hindi has no plural here).
- Keep singular where the day is one event: M5 `She worked on Monday`, M6 `Will you come on
  Monday?` / `on Monday` throughout, M10 `See you on Monday`. M9-S06 var `She is very busy on
  Monday` is fine as one Monday.

### 6. `I think that …` in a spoken opinion (M9-S09, S10)

Speech drops `that` after `think` almost always; `I think that the tea is good` is written or
careful register. The row note already says so — the display should match.

- M9-S09 display ↔ variation: **`I think the tea is good`** (display), `I think that the tea is
  good` (variation, changed-note: कि लिखा भी जा सकता है). Same for the var `I think that Rohan is
  a good teacher` and `I don't think that the tea is good` → drop `that`. M9-S10 already drops
  it in the display; its var `Do you think that the tea is good?` and M9-C07 can drop it too.
- `good` for tea is fine; `nice` is the other everyday word and is untaught — no change.

### 7. `Goodbye` is marked; `Bye` is the default (M10-S10)

Resolves docs/13 Q16 and docs/27 Q21. `Goodbye` in modern speech is formal or final (a
departure, a phone-line close); everyday leave-taking is `Bye` / `See you`. The row already
lists `Bye` as a form and docs/27 already showed `Bye` in a variation — the display should be the
common one.

- M10-S10 display → **`Okay, thanks. Bye, Rohan. See you tomorrow.`** with `Goodbye` kept as the
  form (note: औपचारिक या आख़िरी विदा). `thanks` becomes a form on `thank you` (docs/27 Q20 —
  promote). Its `informal` chip then honestly fits every word in the turn.

### 8. Individual lines that no one says

- **M2-S08 var `Yes, Rohan is`** → drop; replace with `Yes, I am tired` (or `Yes, he is` once
  `he` exists — it is M4's). Resolves docs/11 Q3. No native speaker echoes a name here.
- **M3-S09 var `Yes, I want sugar`** → **`Yes, please`** (decided miss: `please` is M8's; the
  learner meets it four sentences on). `Yes, I want sugar` to someone making your tea sounds
  like a child.
- **M1-S07 var `I like water`** → `I like Mumbai` or `I like books`. Nobody states a liking for
  water; the "uncountable, no article" point is already made by `tea` / `coffee` / `music`.
- **M3-S06 var `I need tea`** → `I need a book` or `I need two pens`. `need water` is thirst;
  `need tea` is a joke.
- **M3-S01 var `I want the tea`** (cue मुझे वह चाय चाहिए) → `I want the book`. `the tea` needs a
  context no card gives; resolves docs/12 Q2 in the same spirit — keep `I want the pen` /
  `Do you want the book?` in the pool (a pool item is allowed to test `the` bare).
- **M1-C06 `I like my name`** → `I like my teacher`. Resolves docs/11 Q4 (`I am a music teacher`
  is fine, keep).
- **M4-S04 `I eat breakfast in the morning`** → swap with its variation: **`I drink tea in the
  morning`** (display), `I eat breakfast at seven` (variation). Breakfast is in the morning by
  definition; resolves docs/12 Q7.
- **M10-S06 `I have a new book. The book is very good.`** — a speaker says `It's very good`.
  The a→the lesson is real but the second sentence is where `it` lives. Keep the display for the
  lesson only if the usage line says the spoken shape is `It's`, and add the variation
  `I have a new book. It's very good.` (resolves whole: `It's` is M7's).
- **M10-S08 `I also like coffee`** — grammatical, but speech says `I like coffee too`. `too` is
  untaught; add `I like coffee too` as a decided-miss variation and let the usage line name it.
  Resolves docs/13 Q15.
- **M2-S04 / M10-S02 `I'm fine, thank you`** — universally understood and what every course
  teaches, but a native speaker today says `I'm good, thanks` (US) / `Fine, thanks` / `Not bad`.
  Keep the display; add `I'm good, thanks` as a variation once `thanks` is a form (7 above) and
  let the `good` row (M9) carry the "I'm good = I'm fine" sense. Resolves docs/11 Q2: not wrong,
  slightly dated.

---

## Tier 2 — natural enough; rulings on the questions the earlier passes left open

Each of these was asked "is this natural?" by docs/11–27. **Keep as written** unless noted.

- `Hello, my name is Rohan` (docs/11 Q1) — keep; `Hi, I'm Rohan` is already the variation and
  is what a native speaker opens with. Right split.
- `Are you tired?` (Q6) — keep; natural when someone looks tired. `Are you okay?` is the general
  check-in and `okay` is M10's — a fine L2 add.
- `I am from India` then `I am from Delhi` (Q7) — keep; a speaker gives one or the other by
  audience, both in sequence is a classroom shape but not wrong.
- `Rohan is a student` etc. with a name before `he` exists (Q5) — keep; natural.
- `Good morning, teacher` (Q8) — Indian classroom English; general English says `sir` / `miss`
  / the name. Keep, but the changed-note should say it is an Indian-classroom vocative.
- `Delhi` = डेली (Q10) — correct for the English word; keep.
- `I like English` / `I like cricket` (Q12) — keep.
- `Do you want tea?` / `Do you want sugar?` (docs/12 Q5) — keep at L1; natural among family and
  friends, which is where tea is offered. To a guest or customer the offer is `Would you like
  …?` — L2's "Asking politely" is the place. The usage line could say so in one clause.
- `I need the key` (Q6) — keep; the usage line already supplies the situation.
- `He goes to school at nine` / `I go to school at nine` (Q3) — keep; natural for a child or a
  teacher, and `school` is the right first place-word. `go to work` would be the adult's line
  and `work` as a noun is untaught — L2.
- `I want to read a book` (Q4) — keep; flat but natural.
- `She drank tea yesterday morning` (Q8) — keep; `yesterday morning` is exactly what is said.
- `He worked at home yesterday` (Q9) — keep; `worked from home` is the office idiom, `at home`
  is plain and correct.
- `I was happy yesterday` (Q10) — keep; a little bare on its own, natural in an exchange.
- `Did you see the film yesterday?` (Q11) — keep `see`: `see a film` (cinema) / `watch a film`
  (at home) — both natural, `see` is right for the cue's वह फ़िल्म.
- `Take tea` / `do breakfast` named only as mistakes (Q12) — right level; the learner hears them
  daily and should know they are Indian English, not general.
- `film` / `movie` (Q13) — keep; both fine.
- `school` note narrowing article-drop to learning (Q15) — harmless at L1.
- `I'm going to learn English next week` (docs/13 Q3) — natural enough; `start learning` is the
  fuller phrase but a native speaker does say `I'm going to learn X next year`. Keep.
- `I'm meeting her tomorrow` / `She is coming to Delhi next week` (Q4) — natural (modulo
  contraction, Tier 1.1). `I'm meeting her tomorrow` without a place is exactly how it is said.
- `Is it near the school?` / `It's in front of the shop` without antecedent (Q6, Q7) — fine as
  cards; they are answers, and the usage lines say so.
- `There is a book on the table` beside `The book is on the table` (Q8) — both natural, both
  said. Keep.
- `It costs ten rupees` vs `It's ten rupees` (Q9) — in a shop `It's ten rupees` is what is said
  and it is S02's display; `costs` as a verb is fine in `How much does it cost?` and its answer.
  Keep both.
- `Five bananas cost twenty rupees` (Q10) — `are twenty rupees` (the variation) is the shop
  shape; `cost` is fine as a statement. Keep, or swap display and variation — low value.
- `I want one apple, not two` (Q11) — natural as a correction, though a native speaker at a
  stall says `Just one, not two`. Keep.
- `She is angry because I'm late` (Q13) — fine without `with me`. Keep.
- `I'm very tired today, but I'm happy. I will sleep early.` (Q14) — one speaker, natural once
  Tier 1.3 fixes the last sentence.
- `Give me two bananas` as a tone error (Q17) — in India at a stall `Give me two bananas` is
  ordinary and not rude; in general English it is abrupt. The plate is right for the course's
  aim (general English) but the word रूखा overstates it; say सीधा, बिना please. The most native
  shop line of all is `Two bananas, please` — S06 already teaches that shape.
- `visit my brother` (Q18) — keep `visit`; it is general and Indian. The reasoning recorded in
  docs/13 ("`meet` + person is a first encounter") is not right — `I'm meeting my brother
  tomorrow` is normal English for a planned get-together, and M6-S08 itself uses `meeting her`.
  Nothing in the content says the wrong thing; only the docs did.
- `call you` (Q19), `market` (Q20), `rupees` (Q21), `kilo` (Q22), `Sorry` alone (Q24) — all
  natural, keep.
- `today night` never named as a mistake (Q25) — it should be: it is the most common Hindi
  calque in this module's territory. Recommend the M10-S04 plate become `I want rice because I
  will cook today night` (or ride the `tonight` row's note).
- `Yes, I do. I also like coffee.` (Q15) — see Tier 1.8.
- `I like India` (docs/21 Q7), `I want a book, not two` (Q9), `Why don't you want coffee?`
  (Q10), the elliptical answers `Ten rupees.` / `I want five, please` / `No, thank you` (Q11),
  `She is not coming next week` (Q13, modulo contraction), `They are coming next week` (docs/25
  Q16), `This banana costs one rupee` (Q15 — dated price, but a comprehension item owes grammar,
  not economics) — all natural, keep.
- `Yeah` / `Yep` / `Nope` untaught (docs/27 Q18) — right restraint at L1; `Yeah` is the one worth
  a form on the `Yes` row when L2 opens, since it is what the learner will hear most.
- `And you?` neutral (Q19) — right; it is the polite return.
- `क्या हाल है?` as the one informal cue (Q22) — right; an informal English line deserves an
  informal cue. Policy: cue register follows the English line's register.

---

## Sound lines — all 100 sampled, no change

Every Devanagari approximation and intonation claim was checked against general pronunciation.
All hold. Notes, none of which need an edit:

- The transcriptions lean US where US and UK differ: `student` स्टूडेंट (UK स्ट्यूडेंट), `new` न्यू /
  नू (both given), `ate` एट (UK also /ɛt/, the note says so), `twenty` ट्वेनी (US casual),
  `want` वॉन्ट (UK; US closer to वांट), `water` वॉटर (US has a flapped t). Indian learners hear
  both; the choice is consistent and harmless.
- "`t` साफ़" on `not` / `don't` / `didn't` — in connected speech the final t is usually
  unreleased or glottal. Not wrong as a target for a beginner.
- The intonation claims are right: rise on yes/no questions, fall on wh-questions and on
  `How are you?`, stressed stranded auxiliary in `Yes, I am`, weak `can` in `Can I have`.
- `Hello` stressed on the second syllable, `engineer` on the last, `tomorrow` / `today` /
  `okay` / `because` on the second, `sugar` with श, `two` with silent w, `where` with silent h,
  `the` = दि before a vowel sound, `going to` ≈ गॉना, `there is` ≈ देयर्ज़, `see you` ≈ सीया,
  `because` ≈ कज़ — all correct.

---

## Register — one note

The `neutral` / `informal` calls of docs/27 stand. One addition for the usage lines rather than
the chip: the M3 offers (`Do you want tea?`) and M8 requests (`Can I have …?`) are neutral in
general English **among people who know each other**; to a stranger or a guest a fluent speaker
softens further (`Would you like …?`, `Could I have …?`). That is L2-M1's job, and the L1 usage
lines could point at it in a clause.

---

## What to apply first

If the owner takes only three things from this pass:

1. **Tier 1.3** — replace `sleep late / early` with `go to bed late / early` (a learner will be
   misunderstood otherwise).
2. **Tier 1.4** — fix the backwards coffee reason (M9-S01 / S02); the replacement resolves whole
   from taught rows.
3. **Tier 1.1** — decide the contraction policy once (`'s · 're · isn't · aren't · wasn't ·
   weren't` as forms on the `be` row); every other contraction finding follows from it.

Then Tier 1.2, 1.5, 1.6, 1.7 and the eleven line swaps in 1.8, in that order.

## Open questions for the owner

Numbering continues docs/27's list (which ended at 22).

23. **Contraction policy** (Tier 1.1) — teach `'s` / `'re` / `isn't` / `aren't` / `wasn't` /
    `weren't` at L1, or keep L1 uncontracted as a reading aid and contract only the negatives?
24. **`go to bed` as a new M9 row** (Tier 1.3) versus `stay up late` versus leaving the
    Indianism with a note that names both readings. This pass recommends the row.
25. **Whether displays may lead with `going to` / `-ing` for plans** (Tier 1.2) when the module's
    brief pattern list opens on `I will + V + tomorrow`. The rule text already says `will` is the
    least common of the three; the displays should agree with the rule.
