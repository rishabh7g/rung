# en-ko L3 — the authoring-brief decisions (#469)

The ten en-ko L3 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['en-ko']` L3-M1…L3-M10) are
written after seven other L3 sets — hi-mr (#452, `docs/50`), en-es (#462, `docs/69`), en-ar (#463),
hi-en (#464), en-ru (#465), en-it (#466), en-fr (#467) and en-de (#468, `docs/75`) — the last of
the nine. Every seam below was pinned against the REAL cumulative index: the fold of
`public/content/en-ko/index/L1-M1.json` through `L2-M10.json`, rebuilt and read on 2026-09-08,
**539 surfaces, maxSpan 2** (L1 closed at 185; L2 added 354). The review chain the level inherits is
`docs/35`–`docs/37` (L1), `docs/47` (spoken Korean) and `docs/68`'s en-ko L2 questions 1–47, every
one of which is a native-pass item that no authoring wave may close by rewriting a shipped module.

This note records the decisions the briefs are written to, so the authoring waves inherit them
without re-deriving anything. The briefs repeat each decision in the module notes, because a prompt
only ever shows an author the notes.

## 1. The romanization laws, carried forward unchanged

The eight L1 decisions of #373 (`docs/34`) bind L3 exactly as they bound L2, and L3 opens no ninth:

- **Revised Romanization, transcribing pronunciation**, pure ASCII, and **no stress marks ever**
  (`docs/34` §6 — Korean has no English-style stress and marking one teaches a wrong thing).
- **The particle hyphen**, with the host in its isolation shape and the liaison in `sound`:
  `jeo-neun`, `chaek-eul`, `hakgyo-eseo`. RR's own syllable-disambiguation hyphen stays banned.
- **A hyphen means a particle or copula boundary and nothing else.** This is the law that decides
  most of §4 below: a VERB ending is never hyphenated, so `-neun`, `-(eu)n`, `-(eu)l`, `-(eu)myeon`,
  `-dago`, `-deon` and `-gess-` never earn keys of their own and never donate to a particle row.
- **`jeo`, never `na`** — restated in M5, which is the first module in the course to print a plain
  form of any kind.
- **Hangul only on the quiet `script` line**, which still renders from a system face and bundles no
  font (#382, `docs/34` §8). Unchanged by this level, recorded so the absence of a font change does
  not read as an oversight.
- Teaching fields in English, `glossEn` forbidden (#405), `literal` on nearly every sentence — and
  L3 needs `literal` more than L2 did, because a modifier clause (M2) reverses English order over a
  whole phrase rather than over a word.

## 2. Register — carried from L2, including the value that is deliberately absent

`docs/60` §1 settled it and L3 adds no register rule; it applies the one it has, and it restates it
three times because this course is the exception in the repo.

- The speech level is the `-yo` style. **`-mnida` stays frozen at four phrases and grows no
  further** (L1-M2's two, L2-M1's `joesonghamnida`, L2-M5's `jal meogeosseumnida`), pinned by
  `FROZEN_FORMAL_L2` in `src/course/types.test.ts`.
- **The chip: `formal` on an honoured-subject line, `neutral` on plain `-yo`, and `informal`
  NEVER.** The forms that would earn `informal` are banmal; L1 banned them, L2 did not lift the ban
  and **L3 does not lift it either**. Stated in M1 as a level decision, worked in M5, and restated
  in M6 and M10.
- **L3 does not lift the ban even though M5 prints plain forms.** `-dago` takes the plain stem
  (`gandago`, `masitdago`), so the plain style finally appears on the page — BOUND inside a report,
  never as a sentence a learner produces. M5's brief says this in its first note, because it is the
  level's most exposed decision and an author will otherwise read the plain stem as permission.
- M6 is where the absence bites hardest — feelings are what friends talk about, and every other
  course's L3-M6 chips `informal` somewhere. en-ko cannot, and M6's fourth note says so out loud.
  M10 says it once more, because M10 is the last place the missing value can be mistaken for an
  oversight.
- M8 (offices and counters) speaks honorifics throughout and chips `formal` on nearly every line;
  M7 (doctors and pharmacists) does the same on its instruction lines; everything else stays
  `neutral` and says which listener it assumes in `usage`.

## 3. What L2 withheld, and where it lands

`docs/60` §2 named the pieces L2 kept out. Each has an owner now, and this is the list an authoring
wave checks itself against:

- **`-dago`, reported speech → L3-M5.** Deferred explicitly by BOTH L2-M7 ("Reported speech
  (-dago) is L3's") and L2-M10. M5 opens all five shapes: `-dago`, `-(i)rago`, `-(eu)rago`,
  `-jago`, `-nyago`.
- **The plain style → L3-M5, and it is still not lifted** (§2 above).
- **`-gess-` → L3-M6**, as CONJECTURE and sympathy (`himdeulgesseoyo`, `masitgesseoyo`,
  `algesseoyo`), not as a second future: L1-M6's `-l geoyeyo` still carries every plan.
- **`-ji anayo` → L3-M3**, the long negative, beside L1-M3's short `an` and L2-M8's `mot`. The law
  is placement: the long form puts the negation at the END, which is why a disagreement takes it.
- **`-deon` → L3-M9**, one frame, as the fourth verb modifier and the retrospective.
- **`-eoss-eoss-` → L3-M9**, one frame (`yejeon-e-neun jaju gasseosseoyo`). L2-M10 named `-deon`
  and the double past together as L3's, and M9 pays both.
- **`-(eu)psida` → OUT, and named as L4-M7's** in M4 (the advice module, where an author will reach
  for "let us") and again in M8. It belongs to the `-mnida` speech level and travels with it.

Two further pieces of L2 business are carried up rather than deferred:

- **Topic `-eun/-neun` against subject `-i/-ga` at PARAGRAPH length → L3-M1.** L2-M3 assembled the
  particle grid and taught the law inside one sentence; M1 makes it govern a paragraph — topic set
  once and then dropped, `-i/-ga` for a new participant, `-eun/-neun` when it returns — and M10
  tests it at eight sentences.
- **The Sino/native number split AT SCALE → L3-M8.** L2-M5 stated the law and L2-M6 spent it on the
  clock; an office needs `man`, `baek`, `cheon`, dates and a phone number, and the delta that has
  not yet been said is that **Korean counts in ten-thousands**.

And the two big pieces L2 never had a reason to open:

- **The verb modifier `-(eu)n / -neun / -(eu)l` → L3-M2**, which is THE decision of the level:
  Korean's relative clause, no relative pronoun, the clause in front of the noun, the tense on the
  modifier, and no role-marking on the head noun inside the clause. M3's hedge
  (`-(eu)n/-neun geot gatayo`), M4's advice frame (`-neun ge eottaeyo?`), M7's `apeun de` and M9's
  festival descriptions are all it in the field — which is why it lands at M2 and not later.
- **Honorific `-si-` at length → L3-M8.** L2-M1 made `-(eu)seyo` productive in the imperative only;
  M8 runs it through the statement, the question, the past `-(eu)syeosseoyo`, the honorific subject
  particle `-kkeseo` and the honorific nouns (`malsseum`, `seongham`, `daek`). M2 and M5 both name
  M8 as its owner rather than opening it early, and M5's reports use only the honorific forms L2
  already shipped.

**What stays OUT of L3 entirely**, each named in the brief whose edge touches it:

| out of L3 | named in | belongs to |
| --- | --- | --- |
| every time clause — `-(eu)l ttae`, `-gi jeon-e`, `-(eu)n hu-e`, `-(eu)myeonseo`, `-neun dongan` | M1, M4, M9 | L4-M6 "Before and after" |
| step-by-step instructions | M2 | L4-M1 "Explaining how" |
| cause and consequence across a paragraph | M3 | L4-M2 "Cause and consequence" |
| the past counterfactual `V-eosseumyeon V-eosseul geoyeyo` | M4 | L4-M3 "What might have been" |
| `-(seu)pnida` and `-(eu)psida` — the formal speech level | M4, M8 | L4-M7 "Official talk" |
| the past-habit SYSTEM beyond M9's two frames | M9 | L4-M8 "Back then" |
| the passive (`jeopsu-ga dwaeyo`) | M8 | not before L4 |
| banmal as a written sentence | M1, M5, M6, M10 | nowhere in this course |

## 4. Seams — checked against the emitted fold, not guessed

maxSpan stays **2**, and the fold holds only eight multi-token surfaces at the end of L2
(`an dwaeyo`, `annyeonghi gyeseyo`, `eoya dwaeyo`, `gaya dwaeyo`, `geu daeum-e`, `go isseoyo`,
`jal meogeosseumnida`, `mannaseo bangapseumnida`). L3 adds one and only one two-token surface:
**`geot gatayo`** (M3), indexed WHOLE — a multi-token surface donates nothing (`docs/34` §2.1
point 3), so bare `geot` stays L2-M9's row and `gatayo` stays free underneath it.

**The endings do not collide with the particles, and the reason is the hyphen.** `-neun` as a verb
MODIFIER (M2) is spelled the same as L1-M1's topic particle, but a modifier is written attached with
no hyphen, so `ilhaneun` is one clean key that donates nothing to `neun`. The same holds for
`-(eu)n` against the topic allomorph `eun`, and for `-(eu)myeon`, `-dago` and `-deon`, none of which
has or will ever have a bare key. **This is the invariant the whole scheme rests on and every INDEX
SEAM note in the level restates it.**

The collisions that ARE real, all probed against the fold:

- **`han` is L1-M8's NATIVE ONE** (from `han jan`), so the `-(eu)n` past modifier of `hada` can
  never be written bare as `han`. M2 builds its past modifiers on other verbs.
- **`hal`, `gal`, `meogeul` (L1-M6) and `bol` (L2-M6) are already keys** from the `-l geoyeyo`
  future. The `-(eu)l` MODIFIER is the same shape doing the same job in front of a noun, so M2
  points back and opens nothing.
- **`il` is L1-M9's WORK and `i` is L1-M1's SUBJECT PARTICLE**, so the Sino one and two can never be
  written bare in M8's numbers. They go inside a single token — `icheon`, `ilman`, `siboil` —
  exactly as L1-M8's `ocheon`, L2-M5's `chilcheon` and L2-M6's `samsip` already do. This is
  `docs/34` §3's ruling for L1-M8, carried up to the scale where it finally bites.
- **`bun` is L2-M6's MINUTE**, so M8's honorific counter for people must never be written bare;
  `-nim` on the title does the work instead.
- **`si` is L2-M6's HOUR**, so the honorific infix `-si-` has no bare key either and is only ever
  shown inside a conjugated form (`-(eu)seyo`, `-(eu)syeosseoyo`).
- L1 and L2's homograph owners all stand: `nun` is the eye (L2-M2), `bae` is the belly (L2-M5, and
  M7's stomach-ache sentence resolves onto it correctly), `cha` is tea (L1-M1), `deo` is L2-M5's
  "more", the bare `i` is the particle and the demonstrative stays written joined (`i-geo`,
  `i-sikdang`).
- Proper nouns never index (#61), so M9's festival names ride on top of a common-noun sentence.

### Two places `docs/60`'s plan and the real index disagreed

Both were found by folding the index rather than by reading the L2 briefs, and both are recorded
here because a later reader will otherwise trust the brief:

1. **`mal` is FREE.** `docs/34` §3's homograph table assigns "word" to an L1-M9 row, but no L1 or L2
   sentence ever wrote `mal` as its own token — `hangungmal` (L1-M1) is one whole token and donates
   nothing, and `malsseumhaseyo` (L2-M1) is another. So **M5 takes the bare `mal`**, with `malsseum`
   as its honorific twin on the same row, and the docs/34 table is corrected here rather than in a
   shipped file.
2. **`-kkeseo` was never shipped.** L2-M2's brief lists `N-kkeseo + gyeseyo` among its patterns, but
   no L2-M2 sentence wrote it and the fold has no `kkeseo` key. So **M8 takes it cleanly**, as the
   honorific subject particle, rather than pointing back at a row that does not exist.

A third, smaller mismatch is worth naming so nobody files it as a bug: L2-M1's INDEX SEAM note calls
`-(eu)seyo` a fresh key, and there is no bare `seyo` key in the fold — for the good reason above,
that an honorific form is one unhyphenated token (`anjeuseyo`, `malsseumhaseyo`, `deuseyo` are the
keys that exist). The note meant the ending was opened, not that a key was minted, and M8's
honorific work is planned against the forms rather than against the ending.

## 5. The shape of the level

- Bounds climb 10 → 12: **M1–M3 at 10 words, M4–M7 at 11, M8–M10 at 12** — continuing L2's 8 → 10,
  and matching hi-mr's and en-es's L3. Korean is verb-final and an L3 sentence carries a modifier
  clause in front of its noun, so the climb buys clause length rather than vocabulary.
- `newWordCap` stays the PRD §5 25 everywhere; pools are authored to 12, the course's shipped size.
- M1–M3 ship fully enriched (the validator's law); en-ko's own habit through L1 and L2 is that
  every module does.
- `tools/shown-surfaces.test.ts` holds en-ko at **12**, the baseline the course opened with and held
  across all twenty shipped modules. A finding is fixed by opening the surface on the row that
  already owns its word, never by raising the number.
- **M10's items are capped at eight sentences** and its new-word spend should be zero: the exit is
  assembly, not vocabulary. Its lesson is the level's two halves meeting — zero anaphora (L2-M10's)
  at eight sentences, and M1's topic-against-subject law across a whole paragraph.

## Why the en-ko L3 ladder teaches what it teaches

The jobs are `content/en-ko/levels.json`'s and are mirrored verbatim; what the briefs add is which
English→Korean delta each job carries, and each pressure point lands in the module whose job cannot
be done without it. The topic/subject law at paragraph length in M1, because a day told at length is
where the choice stops being about one sentence. The verb modifier in M2, because explaining what
you do all day is explaining the work you do and the company you work at — and because M3, M4, M7
and M9 all spend it afterwards. The hedge `-(eu)n/-neun geot gatayo` and the long negative in M3,
because Korean states an opinion by hedging it and disagrees by putting the negation last.
`-(eu)myeon` in M4, one ending covering both "if" and "whenever", bought once and spent three ways.
`-dago` and the four other quotative shapes in M5, with the no-backshift gift that makes the tense
free and the plain stem that must not be mistaken for permission. The third-person feeling rule
`-a/eo haeyo` in M6, which is the one law of Korean feelings no English speaker guesses, with
`-gess-` beside it to sympathise. The double subject and the symptom-comes-out frame in M7, both
applications rather than new classes. Honorific `-si-` at length and the numbers at ten-thousand
scale in M8, because an office is the only place that needs both in one breath. `-deon` and the
double past in M9, where a festival is what you did every year and remember. And in M10 nothing new
at all: the whole inventory, told as one eight-sentence account with a reason, a feeling and one
reported line inside it.

`npm run content:prompt -- en-ko L3-M1` renders from the real index, and the bounds, the
withheld-piece owners, the collision rulings and the L4 deferrals are pinned by
`tools/course-briefs.test.ts` (`en-ko L3: the decisions its briefs settle (#469)`).
