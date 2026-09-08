# en-ru L4 — the authoring-brief decisions (#523)

The ten en-ru L4 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['en-ru']` L4-M1…L4-M10) are
written against the REAL cumulative index rather than against a memory of it: the fold of
`public/content/en-ru/index/L1-M1.json` through `L3-M10.json`, read on 2026-09-08 —
**785 surfaces, maxSpan 3, folded over 30 modules through `L3-M10`** — as
`npm run content:owner -- en-ru <surface> …` reports it on its own last line. Every INDEX SEAM
claim in the ten briefs was checked with that command, and §4 below records the ones where the
index disagreed with the first instinct.

The level list is RATIFIED (#423, `content/en-ru/levels.json`) and the briefs mirror its titles and
jobs verbatim; `tools/course-briefs.test.ts` enforces that. This note records the decisions the
briefs are written to, so the authoring waves inherit them without re-deriving anything. The briefs
repeat each decision in the module notes, because a prompt only ever shows an author the notes.

The review chain this level inherits: `docs/45` (spoken Russian), `docs/64` (L2), `docs/80` (L3),
and the brief-decision notes `docs/56` (L2) and `docs/72` (L3).

## 1. The course's own laws, unchanged

The seven L1 decisions carry into L4 untouched: the reading-first romanization,
`display` romanized with the Cyrillic on the quiet `script` line, **a precomposed acute on every
polysyllable and none on a monosyllable**, `ё` written `yó` in `display` and `ё` in `script` with
`е` never merging into it, one row per noun carrying its case shapes in `forms`, and aspect
partners on separate rows.

Register carries from `docs/56` §3 and `docs/72` §1 unchanged: `vy` is the default and chips
`neutral`, `ty` was an EVENT at L2-M6, and **L4 adds no register rule**. M7 (signs, counters,
announcements) speaks `vy` throughout and chips `formal`, which is the same call L3-M8 made for a
counter; the rest follow the scene.

Two of the level's own laws are worth restating because L4 leans on them harder than L3 did:

- **The acute is an index fact, not a typographical nicety.** `content:owner` reports `býlo` →
  `L1-M5` and `bylo` → `free`; `khoroshó` → `L1-M2` and `khorosho` → `free`. The L3-M4 brief's own
  pattern line writes the unaccented `bylo`, which is a surface the index has never met, and L4-M3
  runs on that word in every sentence — so the M3 brief says the taught spelling out loud.
- **Punctuation is grammar here for the fourth level running.** L3-M3 stated the comma law and
  L3-M5 and L3-M9 pointed back at it; L4-M2 points back for `tak chto` and `poéhtomu`, and L4-M10
  extends the same principle to the em dash of direct speech.

## 2. What L3 withheld, and where each piece lands

`docs/72` §2 and the L3 briefs name four things as L4's. L4 takes **three** of them and refuses
one:

- **The determinate / indeterminate motion system → L4-M9.** L3-M10 took `khodíl` and `yézdil` as
  vocabulary inside the `ránshe` frame and named the system itself as L4's business. M9's job line
  — a trip told in full — is what forces it, because a trip told in full contains both one
  direction and a round trip.
- **Participles → L4-M7, and only the short form.** `docs/72` kept participles out of L3 entirely
  and said the ladder does not ask for them until L4/L5. L4 opens exactly one slice: the
  short-form passive participle as a PREDICATE on a sign (`zakrýto`, `otkrýto`, `zányato`,
  `zapreshchenó`), taught as a word list rather than as a system. The attributive participle and
  the participial phrase stay L5's.
- **The past counterfactual → L4-M3.** L3-M4 opened `by` for the present unreal and pointed at this
  module by name; M3 runs the same machine over a finished event and adds the regret frames.
- **Refused: nothing new for aspect.** L2-M10 taught the choice in four sentences and L3-M10 at
  eight. L4 opens no new aspect law at all; it spends aspect in four new SEATS — the negative
  imperative (M1), `poká` against `poká ne` (M6), the indeterminate past (M9) and the twist (M10)
  — each pointing back rather than re-teaching. That is the level's single largest economy and it
  is what pays for the particles and the motion system.

## 3. The module-by-module ladder — what each owns and why it sits where it does

- **M1 Explaining how.** Owns `chtóby` and the purpose clause, plus the instruction imperatives.
  It sits first because every ordering word it needs is already taught (`snachála` L2-M10, `potóm`
  L1-M10, `zatém`/`nakonéts` L3-M1), so the module spends nothing on sequence and can afford the
  one construction. `chtóby` is `chto` + `by`, which is both the etymology and the reason it takes
  L3-M4's past — one word buys a whole construction, and the module that opens the level should be
  the cheapest one.
- **M2 Cause and consequence.** Owns `íz-za` + genitive and `blagodaryá` + dative — two
  prepositions and NO new case, because the genitive is L2-M3's and L3-M8's and the dative is
  L2-M1's and L3-M7's. It sits second because the paragraph is the unit L4 works in and cause is
  what holds a paragraph together; the two prepositions carry POLARITY, which English's single
  "because of" does not.
- **M3 What might have been.** Owns the past reading of L3-M4's `by`, and the impersonal regret
  frames `nádo býlo` / `ne nádo býlo`. It sits next to M2 because a regret is a counterfactual
  cause, and it opens no grammar at all — Russian's `by` has no tense, so the module's whole load
  is disambiguation.
- **M4 Persuading.** Owns the modal particles `ved'` and `zhe`, the ordering adverbs `vo-pérvykh` /
  `vo-vtorýkh`, and `zató`. It is the level's flagship for "say it the way they do", because these
  are the words an English speaker carries in intonation and a romanized course must therefore put
  on the page.
- **M5 Disagreeing well.** Owns the three softening devices — the negated question, `by` as
  politeness, and the negated adverb (`ne sovsém`, `vryad li`) — plus `da net`. Every device is a
  RE-USE, so the budget goes on vocabulary. It sits after M4 because you cannot soften a position
  you have not learnt to state.
- **M6 Before and after.** Owns the time CLAUSE: `poká`, `poká ne`, `poslé tovó kak`,
  `péred tem kak`, `s tekh por`. It sits in the middle because M9's journey and M10's story both
  need it, and because its aspect pairing (`poká` imperfective, `poká ne` perfective) is the
  tidiest rehearsal of L2-M10's law before the two narrative modules spend it.
- **M7 Official talk.** Owns the doerless sentence in three devices — short-form participle,
  reflexive passive, bare third-person plural. It sits here because the register is a listening
  skill and the module is half recognition; putting it later would crowd the two narrative modules.
- **M8 Back then.** Owns the instrumental predicate with `byt'` and `stat'`, and the then/now
  adverb pairs `ból'she ne`, `uzhé ne`, `vsyó yeshchyó`. It sits eighth because the instrumental is
  L3-M2's case in its third seat and the module is a contrast rather than a new system.
- **M9 Places and journeys.** Owns determinate against indeterminate. It is ninth because it is the
  level's hardest single system and because it needs M6's time clauses inside it.
- **M10 A story with a twist.** Owns direct speech and its punctuation. The level's exit, and it
  opens no new tense — the em dash, the inversion after it, and the twist connectors are the whole
  spend.

## 4. Seams — L4 never edits a file below it, and where the index contradicted the brief

The rule from `docs/56` §4 and `docs/72` §4 carries unchanged: a new shape of an older lexeme gets
its own row in the L4 module that first shows it, pointing back at the first-teach row, and **no
L1, L2 or L3 file is edited**. What follows is what `content:owner` actually said, quoted, on the
seams where the answer was not the expected one.

- **The verb "to know" is not taught anywhere in the course.**
  `npm run content:owner -- en-ru "znáyu" "znat'" "ne znáyu" "znáyete"` returns `free` for all
  four, and a scan of the emitted index for any `zna`-initial surface returns nothing across all
  thirty modules. M5's own second pattern — `Vy ne znáyete, gde …?` — therefore rested on a word no
  rung teaches, exactly as `vrachú` and `prishyól` did in the L3 briefs (`docs/80`, wave 3).
  **M5 opens the row.** This is the wave's single most consequential correction.
- **`poslé` is FREE, even though L2-M10 shipped `poslé étovo`.** `content:owner` says
  `poslé → free` and `poslé étovo → L2-M10`, because L2-M10 indexed the phrase WHOLE — the same
  shape that left the bare `den'` unowned until L3-M7 opened it (`docs/80`, wave 3). **M6 opens
  `poslé`.** The instinct that a two-word phrase spends its parts is wrong in this course and has
  now been wrong three times.
- **`stálo` is L3-M6's, so one lexeme's paradigm is already split.**
  `content:owner -- en-ru "stal" "stála" "stálo"` returns `free`, `free`, `L3-M6` — L3-M6 opened
  the neuter for `mne stálo grústno`. M8 opens `stal` and `stála` as its own rows pointing back,
  and may not re-claim `stálo`, whose note is about a feeling arriving and must not be made to
  answer for becoming a doctor.
- **The indeterminate motion verbs are half-owned already.**
  `content:owner -- en-ru "khodíl" "khodíla" "yézdil" "yézdila"` returns `L3-M10` for all four,
  while `"khodít'" "khozhú" "yézdit'" "yézzhu"` returns `free` for all four. So M9 — the module
  that NAMES the system — opens the infinitives and the present tense and points its notes back at
  L3-M10's past rows. Written to the naive brief, M9 would have re-opened four keys L3-M10 owns.
- **`uzhé` is L2-M5's, not fresh.** The L3-M7 brief listed `uzhé` among its fresh keys;
  `content:owner -- en-ru "uzhé"` says `L2-M5`. M6 points back rather than opening it.
- **`mózhno` is L2-M1's.** The L3-M8 brief said `mózhno` and `nel'zyá` "stay M4's"; only `nel'zyá`
  is M4's (`content:owner`: `mózhno → L2-M1`, `nel'zyá → L3-M4`). M1 repeats the correction rather
  than inheriting the error, because a prompt only shows an author the notes.
- **THE HYPHEN SEAM, and it is the level's sharpest.** `surfaceIndexKeys` splits HYPHENS and never
  whitespace — checked by running the real function, not assumed:
  `surfaceIndexKeys(normalizeSurface('íz-za'))` → `["íz-za","íz","za"]`, while
  `s odnóy storoný` and `tak chto` each yield ONE key. Three consequences the briefs act on:
  - `vo-pérvykh` **donates the bare `vo`**, which `content:owner` reports as `free` — and `vo` is a
    real word, the shape L1-M7's `v` takes before a consonant cluster. Left alone, a later
    `vo vrémya` or `vo vtórnik` would open a note about ordering an argument. The fix taken:
    M4's `vo-pérvykh` row carries a note written TRUE OF THE PART, naming `vo` as that shape of
    `v`. This is L3-M3's `po-móyemu` precedent (its hyphen already donated `móyemu`) and it is
    en-fr's `peut-être`/`peut` bug read forwards instead of backwards.
  - `íz-za` donates a bare `íz`, which no display will ever write alone — harmless, landing on this
    module's own row. It does NOT collide with L1-M1's `iz`: the acute makes them two keys.
  - `vsyó-taki` would donate `taki`, a key that is not a word. It is not written; M4 uses `zató`.
- **`íz-za` carries an acute, and that is a decision.** The law is unconditional — every
  polysyllable takes one — and the stress dictionaries mark `и́з-за`. Prepositions are proclitic in
  speech, so this is the first place the law and the phonetics pull apart in this course, and it is
  question 58 for the native gate. The briefs write `íz-za`.
- **Token count is a decision.** `poslé tovó kak`, `péred tem kak`, `do tovó kak`, `s tekh por`,
  `v kontsé kontsóv` and `ne nádo býlo` are all THREE tokens and sit at the course's existing
  `maxSpan`. **`s tekh por kak` would be FOUR** and would raise this course's `maxSpan` for the
  first time since L1-M8 — which widens the resolver's scan window for every module in the course —
  so the briefs index `s tekh por` and let `kak` (L1-M2's) resolve on its own. **maxSpan stays 3.**
- **Genitive `-ого` is `-ovo`**, so the clause heads are `poslé tovó kak` and `do tovó kak`, never
  `togó`. That is decision 0 and the same call behind L2-M10's `poslé étovo`.
- **Whole-indexed phrases, and what each keeps free.** `tak chto`, `tak kak` (leaving `tak`
  L3-M3's), `nádo býlo` and `ne nádo býlo` (leaving `nádo` L3-M4's), `da net` (leaving `da`
  L1-M2's), `vryad li` (leaving `li` L3-M5's), `ból'she ne`, `uzhé ne`, `vsyó yeshchyó`, and
  `v kontsé kontsóv` (leaving `kontsé` L2-M10's).
- **Derived words are not forms.** M7's `otpravlyáyetsya` and `otpravléniye` are two lexemes and
  two rows: the rule that a case shape rides on its noun's row covers declension, not derivation.
- **The em dash is not a seam at all**, checked rather than assumed: `normalizeSurface('—')`
  returns the empty string, and no dash appears among the 785 owned surfaces even though eleven
  L3-M9 displays already write one (`Devyátogo máya — Den' Pobédy`). M10 may write the dialogue
  dash freely.
- **A stress-list, not a spelling list.** `docs/80` wave 3 caught five stress slips in the L3
  briefs (`témperatúra`, `kashel'`, `nasmórk`, `podpís'`, `tabletka`). M7 is where L4 is most
  exposed to the same class: `zányato` is front-stressed and `zapreshchenó` is end-stressed, so the
  short neuter participles share no pattern and each is a separate key. The M7 brief says so in its
  own INDEX SEAM note. Two more the wave should not misspell: `voz'míte` carries the soft sign
  (`vozmíte` is a different key with no note behind it) and `prósim` is front-stressed.

## 5. What L4 defers to L5, and why

- **Attributive participles and participial phrases.** M7 opens the short form as a sign predicate
  because a learner reads those every day; the attributive participle is a written-register system
  that belongs with L5-M4's formal occasions and L5-M6's structured case.
- **The prefixed INDETERMINATE stem** (`prikhodít'`, `ukhodít'`). M9 already carries two forks; the
  imperfective half of the prefixed system doubles the module for no job L4 has.
- **`nestí` / `vestí` / `vezti`.** The same determinate fork on three more pairs. Named in a usage
  line at M9 and left.
- **Bookish connectors** — `sledovátel'no`, `takím óbrazom`, `poskól'ku`, `vsledstvie`,
  `v techénie`. These belong to L5-M6's Arguing a position, where the register is the point.
- **`rázve` / `neuzhéli`, irony and sarcasm.** levels.json gives implication and irony to L5-M2 and
  L5-M7 by name; M4 and M5 keep to the sincere register.
- **Diminutives as politeness, and the `-to` particle.** Both are derivational systems rather than
  words, and both are L5's.
- **`byválo`, free indirect style and the narrative present.** L5-M9's Telling it your way.
- **`yésli by ne`** ("if it were not for"). One more frame on top of M3's, and M3's job is the
  single machine, not its variants.

## 6. The shape of the level

- **Bounds climb 12 → 14**: M1–M3 at 12 words, M4–M7 at 13, M8–M10 at 14 — continuing L1's 5 → 8,
  L2's 8 → 10 and L3's 10 → 12, each level opening on the number the level below it closed on. The
  step sizes match the jobs: M1–M3 are single constructions and stay where L3 ended; M4–M7 need a
  concession or an announcement in one breath; M8–M10 are contrasts, journeys and accounts.
  **M10 is a narrative module and its bound applies INSIDE the account**, as it does at L3-M10.
- **`newWordCap` is 25 everywhere.** It is the PRD §5 figure and `tools/course-briefs.test.ts`
  asserts `toBe(NEW_WORD_CAP)` for every brief in the file, so it is not a per-module choice.
  `docs/80` wave 3 shows what to do when a module runs over: drop paradigm cells that no sentence
  and no variation shows, never raise the cap.
- **M10's items are six-sentence accounts** with exactly one line of dialogue each, which is what
  keeps six sentences honest at a 14-word bound.
- **Pools are authored to 12**, as at every level of this course.
- One thing to fix at merge rather than in a brief: the `en-ru L2` describe block in
  `tools/course-briefs.test.ts` asserts the course's brief keys are exactly `L1-M1…L3-M10`. Adding
  L4 makes that assertion false, and it is the merge's job to extend it — the fragment does not
  touch the test.

## 7. Open questions for the native pass

Continuing this course's chain; the last number used is 54, in `docs/80`'s wave 3. Nothing above is
renumbered.

55. **`chtóby` plus the past for a different subject** (M1, note 2). The module's load-bearing
    claim. Confirm that `Ya govoryú médlenno, chtóby vy pónyali` is what a Russian says and that
    the infinitive there (`chtóby vy ponyát'`) is impossible rather than merely odd, and confirm
    that after a verb of motion the bare infinitive (`Ya prishyól pomóch'`) is genuinely idiomatic
    and not a bookish shortening.
56. **The negative imperative is imperfective** (M1, note 3). Confirm that `Ne zakryváyte dver'` is
    the ordinary prohibition and that `Ne zakróyte dver'` reads as a warning about an accident
    rather than as an error, so the mistake block charges the right thing.
57. **`íz-za` against `blagodaryá`, and their polarity** (M2, note 2). Confirm that `íz-za` is
    genuinely negative in ordinary speech — that `íz-za váshey pómoshchi` reads as a complaint —
    and that `blagodaryá` is not so formal that a learner should be given `spasíbo, chto …`
    instead.
58. **Whether `íz-za` should carry an acute at all** (M2, §4 above). The course marks every
    polysyllable, stress dictionaries write `и́з-за`, and prepositions are proclitic in speech. Is
    `íz-za` the right thing to put in front of a learner, or does the mark teach a stress no
    speaker produces? This is the first place the stress law and the phonetics pull apart, and the
    answer sets a precedent for any later polysyllabic preposition.
59. **`by` has no tense** (M3, note 2). The level's largest claim. Confirm that
    `Yésli by u menyá býlo vrémya, ya by pozvoníl` genuinely carries both the present-unreal and
    the past-unreal reading, and confirm what actually disambiguates it in speech — an adverb, the
    aspect of the verbs, or only the situation.
60. **`nádo býlo` against `dólzhen byl`** (M3, note 3). Confirm that `nádo býlo pozvonít'` is the
    everyday regret and that `dólzhen byl` reads as obligation rather than regret, and confirm
    that `ne nádo býlo` is the natural refusal rather than something with a different verb.
61. **`ved'` and `zhe` — placement and force** (M4, note 2). The module's flagship. Confirm that
    `zhe` sits after the first stressed word and nowhere else, confirm that `Ved' vy sámi éhto
    skazáli` reads as an appeal to shared knowledge rather than as an accusation, and say whether
    a learner should be given both particles or only one.
62. **`da net`** (M5, note 3). Confirm that `Da net, navérnoye` is the ordinary mild refusal, that
    it is not regionally or generationally marked, and that a learner may safely produce it rather
    than only recognise it.
63. **`poká` against `poká ne`, and the aspect that goes with each** (M6, note 2). Confirm that the
    `ne` in `poká ne` negates nothing, that `Podozhdíte, poká ya ne vernús'` is the natural
    sentence, and that the imperfective/perfective split across the two is as clean as the brief
    states.
64. **Which doerless device a real sign uses** (M7, note 2). Confirm that `zakrýto` / `otkrýto` /
    `zányato` / `zapreshchenó` are the four a visitor actually reads, that `Vam pozvonyát` and
    `Zdes' ne kúryat` are the ordinary spoken equivalents of an English passive, and check every
    acute in the participle list — `zányato` front-stressed, `zapreshchenó` end-stressed — against
    a dictionary rather than a memory.
65. **The instrumental predicate, and when it is optional** (M8, note 2). Confirm that
    `Kogdá ya byl studéntom` is the default, and say what changes if a speaker uses the nominative
    instead — whether it is wrong, regional, or a real difference of meaning the brief should be
    naming.
66. **The indeterminate past as a round trip** (M9, note 2). The module's hardest claim. Confirm
    that `Vcherá ya khodíl v magazín` implies the return and `Vcherá ya poshyól v magazín` does
    not, and confirm that a Russian hearing the second would genuinely take the speaker to be still
    out.
67. **Direct speech: the dash and the inversion** (M10, note 2). Confirm that
    `— Ya ne znáyu, — skazál Iván` is the standard printed shape, that verb-before-subject is
    neutral there and subject-first is marked, and say whether a learner who writes quotation marks
    instead would be read as foreign or merely as informal.

`npm run content:prompt -- en-ru L4-M1` renders from the real index once the fragment is merged
into `tools/course-briefs.ts`, and the bounds, the withheld-piece owners, the seam corrections and
the L5 deferrals above should be pinned by a new `en-ru L4: the decisions its briefs settle (#523)`
block in `tools/course-briefs.test.ts`, in the shape of the L2 and L3 blocks already there.
