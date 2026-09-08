/**
 * Per-course, per-module authoring briefs (#109) — the course-specific half of the
 * generation prompt. `generate-prompt.ts` renders one of these into a complete prompt;
 * everything here is what a schema or an index CANNOT say: what the module is FOR, which
 * sentence patterns it may use, and where the L1 helps or misleads.
 *
 * Titles and jobs mirror `content/<courseId>/levels.json` verbatim (the test enforces it) —
 * levels.json stays the single source of the ladder, and a brief only adds the authoring
 * guidance on top.
 *
 * Nine courses are briefed: hi-mr through L2, and en-es, en-ar, hi-en, en-ru, en-it, en-fr,
 * en-de and en-ko L1 only. The
 * L2/L3 module lists are RATIFIED (#112 closed [Q1] — titles, jobs and sequence in levels.json
 * are final), the L4/L5 lists are PROPOSED (docs/48-five-level-ladder-plan.md §4, awaiting the
 * same ratification), and a level's briefs are written when its authoring project starts: a
 * brief encodes
 * pattern-and-interference pedagogy that should be planned against the verified ladder below it,
 * not ahead of it. hi-mr's L2 briefs (#295) are the first written to that rule — planned against
 * the finished L1 index (222 surfaces through L1-M10) and the L1 review chain; hi-mr's L3 waits
 * for a verified L2. en-ar's, hi-en's, en-ru's, en-it's, en-fr's and en-de's own L2/L3 lists are
 * still placeholder text
 * (PRD §5) and are not briefed either. The CLI says exactly this when asked for a course or
 * module without a brief.
 *
 * Being briefed is not being shipped, and en-de and en-ko are the proof in both directions: each
 * row was `fixture: true` with no `content/<id>/modules/` at all when its brief was written (#356
 * and #361; #374 and #376), and the ten L1 modules were authored against it afterwards
 * (#362–#364; #377–#379) and let out of the gate (#365; #380). A brief is what the FIRST authoring issue is written against, so it comes
 * before the content, not after it.
 *
 * ## Three rules these briefs are written to, learned the hard way on hi-mr
 *
 * 1. **Every example is checked against the rule it illustrates.** M5's brief once illustrated
 *    "the transitive past agrees with the OBJECT" with `मी चहा प्यायलो` — a form that agrees
 *    with the speaker, i.e. the opposite of the rule beside it (docs/07-llm-review-L1-M1-M5.md,
 *    "The #110 adjudication"). A brief seeds every future prompt, so a self-contradicting
 *    example propagates.
 * 2. **A rule must be TRUE first and memorable second.** The third Marathi review
 *    (docs/08-marathi-third-review.md) found the Marathi itself flawless and every defect in the
 *    layer around it: three module rules named the wrong grammatical role because they were
 *    written as slogans ("agrees with the SPEAKER" for what is subject agreement). Spanish
 *    teaching is unusually rich in slogans that are memorable and false — "ser is permanent,
 *    estar is temporary", "-o is masculine, -a is feminine", "the preterite is for completed
 *    actions", "gustar is just backwards". Each brief below names the slogan its module will
 *    attract and states the law the slogan replaces.
 * 3. **Plan homographs against the word index, not against the JSON.** The index is cumulative
 *    and FIRST OCCURRENCE WINS (`tools/content-build.ts`), so the earliest module to teach a
 *    surface owns the "why" note every later module's learner sees — a later row for the same
 *    spelling with a different meaning is unreachable, and the learner is shown a note that is
 *    false of the sentence in front of them (the `का` bug, review 08 correction 4). Surfaces are
 *    normalised by `src/engine/surface.ts`: case is folded, edge punctuation is dropped, and
 *    ACCENTS ARE KEPT — so `qué`/`que`, `cómo`/`como`, `sí`/`si`, `él`/`el`, `está`/`esta` are
 *    distinct entries only as long as the accent is actually written. Spanish's true collisions
 *    (`a`, `mañana`, `por`, `como`, `quiero`) are assigned to an owning module in the notes
 *    below, and a multi-token surface (`Me llamo`, `por la mañana`, `por favor`) is the tool for
 *    keeping the bare word free for whoever should own it. Romanized Arabic is exposed on two
 *    further seams that Spanish is not — hyphen parts and the apostrophe classes — so en-ar's
 *    index rules get their own section below. English has two of its own — contractions, which
 *    survive normalisation as ONE token (`don't`), and a stock of tiny homographs (`to`, `do`,
 *    `have`, `that`, `it`) — so hi-en's get theirs. Russian adds two more, and they are the
 *    sharpest yet: `ё` and `е` are DIFFERENT codepoints the fold never merges (checked against
 *    the real function, not assumed — `normalizeSurface('всё') !== normalizeSurface('все')`), and
 *    a case system turns one noun into several written shapes, every one of which must live in
 *    the `forms` of the ONE row that first taught the word. en-ru's index rules get their own
 *    section below too. Italian adds a seam of its own: the ELISION apostrophe, which
 *    `surface.ts` keeps INSIDE a token while `surfaceIndexKeys` splits only hyphens — so
 *    `l'acqua`, `c'è` and `un po'` are each one key answering for nothing else, and `acqua`, `è`
 *    and `po` are untouched by them — so en-it's get theirs too. German is the first course
 *    exposed on what the folder THROWS AWAY rather than what it keeps: rule 4 lowercases every
 *    token, German capitalises every noun, and the two together silently merge `Sie`/`sie`,
 *    `Essen`/`essen` and `Morgen`/`morgen` into one entry each — checked against the real
 *    function, not assumed (`normalizeSurface('Sie') === normalizeSurface('sie')`) — so en-de's
 *    index rules get their own section below, and it is the longest of the eight.
 *
 * ## Why the en-es ladder teaches what it teaches
 *
 * The ten communicative jobs are levels.json's and are mirrored verbatim; what a brief adds is
 * WHICH English→Spanish delta each job carries. The sequence is ordered so that each pressure
 * point lands in the module whose job cannot be done without it: pro-drop and `gustar` in M1
 * (the first verb the learner writes, and the first "I like"), `ser` vs `estar` in M2 (wellbeing
 * is the question that forces the choice), gender and article/adjective agreement in M3 (every
 * want names a noun), present-tense conjugation across persons plus reflexives and the personal
 * `a` in M4 (a day is other people and getting up), preterite vs imperfect in M5 (the level's
 * richest interference zone — one English past, two Spanish ones), `ir a` + infinitive in M6,
 * `estar` + location and `hay` in M7 (M2's split at its most mechanical), price agreement in M8,
 * `porque` / `por eso` in M9, and recombination into 2–3 sentence turns in M10. `por` vs `para`
 * and the subjunctive are deliberately OUT of L1: neither is needed by any of these ten jobs,
 * and importing them would spend the word budget on a contrast the learner cannot yet frame.
 *
 * en-es's own `content/en-es/modules/L1-M1.json` started as a four-sentence `fixture: true` seam
 * proof, and was replaced rather than extended: #206 authored M1 fresh to the full ten sentences
 * against the brief below, and #195 graduated the course out of `fixture: true` altogether.
 *
 * ## en-ar: the two decisions a brief must settle before any Arabic is written
 *
 * ### 1. The variety is Modern Standard Arabic — RATIFIED (#198), not a per-module choice
 *
 * Arabic forks in a way Spanish and Marathi do not: MSA is what is written and universally
 * understood but nobody speaks it at home, while a dialect (Egyptian, Levantine) is what a learner
 * would actually say. This course teaches **MSA**, and no module may quietly switch:
 *
 * - It is already ratified elsewhere and a brief may not contradict it — `content/courses.json`
 *   declares the scheme as "ALA-LC-flavoured Modern Standard Arabic", and the seam-proof fixture
 *   is MSA throughout (`uḥibb`, `urīd`, `anā min al-Hind`).
 * - Only MSA has an agreed spelling, and this course prints a native Arabic line under every
 *   romanized sentence (#196/#197). A dialect course would have to invent an orthography for the
 *   quiet line, and two authors would spell it two ways.
 * - One MSA course serves every learner. Choosing Cairo or Beirut forks the course by region on
 *   grounds the ladder cannot supply.
 *
 * The honest objection — that the ten jobs of L1 are CONVERSATIONAL, and conversational MSA is a
 * register nobody uses — is answered by pinning the register rather than the variety. L1 is
 * **spoken-simple MSA**: the educated-neutral Arabic a teacher or a newsreader would say out loud.
 * Concretely, and every module inherits this: pause forms with NO case endings (`al-bayt`, never
 * `al-baytu`), no dual except the counted "two" in M8, no passive, no `lam`/`laysa` negation, no
 * literary vocabulary, and sentences short enough to be said. Where the MSA form is understood
 * everywhere but sounds formal in the street, the sentence's `usage` line says so in words — it
 * never smuggles the dialect form into `display`.
 *
 * ### 2. The romanization scheme, stated once, because it is also an index contract
 *
 * `content/courses.json`'s `romanizationNote` is the declared scheme and the prompt quotes it
 * verbatim; these briefs pin the four points it leaves to an author, chosen so that every spelling
 * ROUND-TRIPS through `src/engine/surface.ts` (one word → one key, forever):
 *
 * - **Write whatever carries the person; drop whatever carries only case or mood.** So the
 *   perfect's person suffix is written in full (`dhahabtu` I went · `dhahabta` you-m ·
 *   `dhahabti` you-f — three persons, three surfaces), while the imperfect's indicative `-u` is
 *   not (`uḥibb`, not `uḥibbu`; the person is already in the `u-`/`tu-`/`ya-` prefix). Writing
 *   iʿrāb instead would give `baytun`/`baytan`/`baytin` — three index entries for one word.
 * - **Short vowels are always written.** `surface.ts` folds case but never touches diacritics, so
 *   `min` (from) and `man` (who) stay two words only as long as both vowels are on the page.
 *   Long vowels are `ā ī ū`; the emphatics and pharyngeals are `ḥ ṣ ḍ ṭ ẓ`.
 * - **`ʾ` is hamza and `ʿ` is ʿayn, and they are different letters.** `surface.ts` folds the
 *   hamza class to `'` and the ʿayn class to `ʿ` and never merges the two (#116 [Q3]) — so `māʾ`
 *   (water) indexes as `mā'` and stays distinct from `mā`. Never write a plain `'` for ʿayn and
 *   never use a curly quote. Word-INITIAL hamza is not written (`anā`, `urīd`, `uḥibb`), matching
 *   the fixture; medial and final hamza is (`māʾ`, `masāʾ`, `qaraʾtu`).
 * - **Three exemptions from "no case endings", because they are lexical, not grammatical:** the
 *   adverbial `-an` (`marḥaban`, `shukran`, `ghadan`, `dāʾiman`), frozen expressions
 *   (`as-salāmu ʿalaykum`), and the verb person-suffixes above.
 *
 * ### 3. Arabic's own index seams — `al-`, the clitics, and the multi-token save
 *
 * `surfaceIndexKeys` indexes a hyphenated surface AND each of its hyphen parts, all pointing at the
 * same word row, first occurrence winning. That makes the hyphen the course's main planning tool
 * and its main hazard, and it yields one law every module obeys:
 *
 * - **The first word carrying a clitic owns that clitic's bare key, so its `note` must define the
 *   clitic and not just the word.** `al-Hind` (M1) indexes `al-hind`, `al` and `hind`, so the `al`
 *   key answers for every article in the course; `bi-khayr` (M2) owns `bi` for M8's `bi-kam`;
 *   `sa-adhhab` (M6) owns `sa`; `li-ʾanna` (M9) owns `li` for `li-dhālika`.
 * - **The bare noun is an alias, not a rival.** `al-qahwa` also indexes `qahwa`, so a later
 *   `urīd qahwa` resolves to the same row — which is why that row's `forms` list both, and its
 *   note must be true of the article-ed and the bare form alike.
 * - **Sun-letter assimilation is spelling here, not just pronunciation.** `ash-shāy` and
 *   `al-shāy` are two different words to the build. Write the assimilated form always.
 * - **Elision is never written.** Say `fī al-madrasa` even though it is pronounced *fi l-madrasa*;
 *   the elided spelling would be a second surface for the same word. The `sound` field is where
 *   the elision belongs.
 * - **`wa` ("and") is written as a free word** even though Arabic script joins it — one clean `wa`
 *   key instead of a fresh hyphenated surface for every word it attaches to. The `script` line
 *   still writes it joined; `script` is never indexed (`content-build.ts`).
 * - **A multi-token surface is the tool for keeping a bare word free**, exactly as in en-es:
 *   `ṣabāḥ al-khayr` (M2) leaves `ṣabāḥ` for M4's `fī aṣ-ṣabāḥ`, and `min faḍlika` (M8) leaves
 *   M1's `min` ("from") owning `min`. The resolver's longest-match-first walk takes the phrase
 *   whole wherever it appears.
 *
 * ### Why the en-ar ladder teaches what it teaches
 *
 * The jobs are levels.json's, mirrored verbatim; the brief adds which English→Arabic delta each
 * job carries. The vanishing present copula and the person-inside-the-verb land in M1 (the first
 * sentence a learner writes has no "is" in it), sun letters and gendered address in M2 (a greeting
 * is addressed to a man or a woman and cannot dodge it), gender agreement on adjectives and verbs
 * plus `lā` negation in M3 (every want names a noun), the imperfect across persons in M4, the
 * perfect's suffix conjugation and `kāna` in M5 (the copula comes back), `sa-`/`sawfa` in M6, the
 * iḍāfa, place prepositions and `ʿind-` possession in M7, counting and its gender polarity in M8,
 * `li-ʾanna`/`li-dhālika` in M9, and recombination into turns in M10. Kept deliberately OUT of L1:
 * the dual (except M8's counted "two"), the passive, `lam`/`laysa` negation, the full case system,
 * and broken plurals as a system — plurals appear only as vocabulary the sentences need.
 *
 * en-ar's own `content/en-ar/modules/L1-M1.json` started as a four-sentence `fixture: true` seam
 * proof (#118), not a first draft: #199 re-authored M1 fresh to the full ten sentences against the
 * brief below — the seam proof's four frames are the only part that survived — and #202 graduated
 * the course out of `fixture: true` altogether.
 *
 * Amended 2026-09-05 (`docs/42-llm-review-en-ar-spoken.md`): three of the decisions above moved
 * by one notch each, register-side only. M6 teaches `sa-` alone and demotes `sawfa` to a
 * recognition row and variation; the "no case endings" law is clarified to write the construct
 * `-t` of a 3–10 number (`thalāthat kutub`, `khamsat riyālāt`), which is the tāʾ marbūṭa the
 * course already writes in `sayyāratī`, not iʿrāb; and the dual stays `kitābān` in `display`
 * with `usage` saying that speech has `kitābayn` — the owner's open dialect question.
 *
 * ## hi-en: the four decisions a brief must settle before any English is written
 *
 * hi-en (#267–#273) is the first course whose L2 is the language these briefs — and hi-mr's own
 * module notes — are written in. That inverts one habit and exposes two index seams the other three
 * courses never met, so the decisions are stated once here and repeated in the notes, because a
 * prompt only ever shows an author the notes.
 *
 * ### 1. The language of every field — Hindi teaches, English is the thing taught
 *
 * The language law (#186/#196; the scan that enforced it went with the render-level suite on
 * 2026-08-30, so it is a review rule now): the document speaks the course's L1 (`hi`),
 * every L2 line declares `en`, and unlabelled prose inherits the L1. So in hi-en **every teaching
 * field is Hindi, in Devanagari** — `rules[].text`, word `note`, `trap`, `sound`,
 * `variations[].changed`, `mistake.why`, `usage`, `mnemonic` and `cue` — and English appears ONLY in
 * the L2 slots: sentence / word / variation / mistake / pool `display`, and word `forms`. A Hindi
 * field may quote the English word it is explaining (`like` का मतलब पसंद करना); quoting is not
 * switching.
 *
 * hi-mr's modules write `rules[].text` and word `note` in English (`content/hi-mr/modules/L1-M1.json`,
 * `rules[0]`: "Word order is Subject–Object–Verb, exactly as in Hindi…") — a quirk tolerated for one
 * bilingual learner — and **hi-en must NOT copy it**: here an English note about an English word is
 * the lesson explaining itself in the language the learner does not yet have, and on screen that
 * note inherits `lang="hi"` and is read in a Hindi voice. M1's first note and M10's last say so.
 *
 * Two field rules follow from the L2 being English:
 *
 * - **`glossEn` is OMITTED on every hi-en sentence.** The build (`checkGlossEn`) requires the gloss
 *   only where NEITHER language of the pair is English (#268, #405) — hi-mr alone today. An English
 *   gloss of an English line is the hero line twice, and Sentence Detail drops the paragraph when
 *   the key is absent.
 * - **`literal` is the Hindi words in ENGLISH order** — `मेरा नाम है रोहन` under `My name is Rohan`,
 *   `किताब है पर मेज़` under `The book is on the table` — the same device as hi-mr's
 *   `मेरा(नपुं.) नाम रोहन है` and en-es's `I call-myself Rohan` (the L1's words in the L2's order),
 *   pointed the other way. It is the most useful line this course has, because the whole delta of
 *   Hindi→English is ORDER: the verb moves to the middle and every postposition becomes a
 *   preposition. Carry it on every M1–M3 sentence; from M4 it is optional and still the right tool
 *   wherever the order moves (M7's prepositions, M9's one-connector rule). Hyphenate a multi-word
 *   Hindi gloss of one English word (`मैं पसंद-करता-हूँ चाय`), as en-es hyphenates `call-myself`.
 *
 * The prompt's own Script section already says the other half — `display` is English, `cue` is
 * Hindi, `script` unused — so a brief need not repeat it.
 *
 * ### 2. Contractions are single index surfaces — one policy for the whole course
 *
 * `src/engine/surface.ts` strips EDGE punctuation only, folds `’` to `'` and lowercases, so `don't`,
 * `I'm`, `isn't`, `it's` are each ONE token and ONE index key — `I'm` never lands on `I` or on `am`.
 * The policy, ratified here and repeated in the notes:
 *
 * - **`display` uses the contraction a fluent speaker would say** — `I'm fine`, `I don't want tea`,
 *   `He doesn't get up early`, `I didn't go`, `It's on the table` — and writes the full form only
 *   where a contraction is impossible (`Yes, I am`: sentence-final `am` never contracts). The first
 *   pass exempted a module whose lesson was the uncontracted word (M1's `I am a student`, M6's
 *   `I will go`); the spoken-English pass (2026-09-05, `docs/39-…`) withdrew that: a learner who
 *   practises `I am from India` fifteen times is practising a sentence nobody says, so `I'm` is
 *   taught in M1-S02 and M6 plans with `be + -ing` / `going to`, keeping `will` for promises.
 * - **A contraction is its own word row, in the module that introduces it, and that row's `forms`
 *   lists BOTH shapes** — `don't` · `do not`; `I'm` · `I am` — so either spelling resolves to one
 *   true note (a two-word form is a two-token key, and the longest-match walk takes `do not` whole),
 *   and the note is written true of both shapes. Owners: `I'm` (M2), `don't` (M3), `doesn't` (M4),
 *   `didn't` (M5), `it's` (M7), `I'll` (M6, one variation at most). A row never pre-lists a sibling:
 *   M3's `don't` row does not carry `doesn't`, or M4's 3sg lesson becomes unreachable.
 * - **Straight `'` only** in authored text (the curly quote folds on the index, but `display` must be
 *   one spelling), and **no possessive `'s` in L1**: `Rohan's` would be a fresh surface needing its
 *   own row, and no L1 job needs one (`His name is Rohan`, not `My brother's name`).
 *
 * ### 3. Multi-token surfaces keep bare words free — and capture what is inside them
 *
 * As in en-es (`Me llamo`, `por favor`) and en-ar (`ṣabāḥ al-khayr`), a surface may span tokens and
 * the resolver takes the longest match first. Two consequences, both planning tools: a multi-token
 * surface claims NO bare part (`thank you` leaves `you` to M2's pronoun row), and it captures every
 * bare part wherever the phrase appears (`there is` swallows the `is` inside it, so a tap opens the
 * existential note, not `be`'s). The course's multi-token surfaces and their owners: `good morning` ·
 * `thank you` (M2); `get up` · `wake up` (M4); `going to` (M6); `there is` · `there are` · `next to` ·
 * `in front of` (M7); `how much` · `how many` · `Can I have` (M8). Each is named in its module's INDEX
 * SEAM note with the word it protects: `how` stays M2's (`How are you?`), `have` stays M4's
 * possession row (`Can I have` never touches it), `go` and `to` stay M4's and M3's — and because
 * `going to` is claimed as the PLAN marker, no display after M6 may write `going to` + a place;
 * movement is `go to` / `went to` / `will go to`.
 *
 * ### 4. Homographs — first occurrence wins, so every colliding surface has an owner
 *
 * English's commonest words are its worst homographs, and the index is cumulative with FIRST
 * OCCURRENCE WINS (`tools/content-build.ts`), so the earliest module to write a surface owns the note
 * every later learner sees. The owners, each stated again in that module's notes:
 *
 * - **`be`** — ONE row, opened by M1's first `is` (`My name is Rohan`) with `forms` `am · is · are`;
 *   later sentences' `am` / `are` are not re-deconstructed. M5 EXTENDS that row — `forms` gains
 *   `was · were`, the note gains the past — rather than opening a second `be` row the index could
 *   never reach for `is`.
 * - **`to`** — M3 (`want to` + verb), as a bare row; its note is written true of M4's `go to school`
 *   and M7's `to the shop` (को / तक) as well, since those inherit the key.
 * - **`do`** — M3, do-support; the note defines the helper AND the main verb करना. `does` / `doesn't`
 *   are M4's rows and `did` / `didn't` M5's — each again both jobs.
 * - **`like`** — M1's verb only; `like` = "similar to" stays out of L1.
 * - **`have`** — M4, possession only (`I have two brothers`, the state verb the `*I am having` trap
 *   needs); auxiliary `have` stays out of L1, `have tea` is written `drink tea`, and M8's request
 *   rides `Can I have` whole.
 * - **`a` / `an`** — M1, one row with both in `forms`; **`the`** — M3; a kind of thing in general, mass
 *   or plural, takes nothing (M1's `I like tea`).
 * - **`in` / `on` / `at`** — M4 (time), and M7's place uses inherit those rows, so M4's notes are
 *   written true of both seats (`on Monday` · `on the table`).
 * - **`it`** — M7 (the thing-pronoun, with `it's`); **`that`** — M9 (the conjunction of `I think
 *   that …`, with the pointing word defined in the same note); M7 and M8 point with `this` so the
 *   key is free. **`her`** — M6's object pronoun (`I'm meeting her tomorrow`), note true of the
 *   possessive too. **`so`** — M9's consequence word; the intensifier (`so tired`) stays out (`very`).
 * - **`he` / `she`** — M4 (the 3sg subject), with M10 returning to the split; **`and` / `but` /
 *   `also` / `then`** — M10's spend, so earlier modules keep one clause per sentence.
 *
 * ### Why the hi-en ladder teaches what it teaches
 *
 * The jobs are levels.json's, mirrored verbatim; the brief adds which Hindi→English delta each job
 * carries. SVO and the article land in M1 (the first sentence a learner writes puts `is` in the
 * middle and an `a` before `student`), inversion and the one `you` in M2, do-support and `want to`
 * in M3, third-person `-s` and the simple/continuous split in M4, the one-form past and `did` in M5,
 * the three futures in M6, prepositions-before-the-noun and `there is` in M7, `how much` / `how many`
 * and counting in M8, the one-connector rule in M9, and the never-dropped subject pronoun plus
 * `he` / `she` in M10. Kept deliberately OUT of L1: the present perfect and auxiliary `have`, `can`
 * outside the fixed `Can I have`, the possessive `'s`, the passive, comparatives (L2-M9), conditionals
 * (L3-M4), and `-ing` anywhere except M6's arrangements and a starred `*I am knowing`.
 *
 * There was no seam-proof fixture to replace: `content/hi-en/modules/` did not exist until #270
 * authored L1-M1 against the brief below, and #273 graduated the course out of `fixture: true`
 * — the fourth course shipping. en-ru followed the same path (#338 → #343) and is the fifth; all
 * five shipping courses are briefed here.
 *
 * ## hi-mr L2: the four decisions, taken against the finished L1 (#295)
 *
 * The first L2 briefed anywhere: ten modules planned against the REAL cumulative L1 index —
 * 222 surfaces through L1-M10, maxSpan 1, rebuilt and read rather than remembered (the briefs
 * were planned at 215; the spoken pass of 2026-09-05 added seven, and the figure here is the
 * rebuild of 2026-09-07 — no seam moved) — and against
 * the L1 review chain (docs/08 open questions 1–22, docs/15 23–30, docs/19 31–40, docs/23
 * 41–48). The four decisions below are hi-mr L2's equivalents of hi-en's four, recorded in
 * `docs/26-hi-mr-L2-brief-decisions.md` and repeated in the notes, because a prompt only ever
 * shows an author the notes.
 *
 * ### 1. Language of fields — L2 keeps L1's split, field for field
 *
 * hi-mr writes `rules[].text` and word `note` in English, and every learner-facing line —
 * `cue`, `literal`, `trap`, `sound`, `usage`, `mistake.why`, `variations[].changed`, `mnemonic`
 * — in Hindi (Devanagari), with `glossEn` required on every sentence (neither language of the pair
 * is English — the one course where `checkGlossEn` still bites, #405). The English is the tolerated quirk of a course with one
 * bilingual learner (the hi-en section above forbids copying it INTO hi-en) — and mid-course is
 * the wrong place to fix a voice: an L2 module whose notes suddenly spoke Hindi would fork the
 * course's own conventions for zero pedagogy. L2 copies `content/hi-mr/modules/L1-M1.json`'s
 * split exactly.
 *
 * ### 2. Register — L1 taught तू as the default; L2 finally teaches WHEN
 *
 * docs/08 Q16 recorded the choice; L2-M1 is the module that pays for it: तू for a friend or
 * family your own age or younger, तुम्ही for elders, strangers and counters — and every L2
 * brief states which register its frames speak (M4, M7 and M8 talk to strangers: तुम्ही; M6's
 * plans are among friends: तू). Marathi has no दीजिए tier — the imperative stops at
 * तुम्ही + -आ, and politeness above it goes into words (जरा, कृपया) or the future question
 * (द्याल का?). The register chip gained a third value in #422, so the tier the L1 briefs had to
 * carry in words now lives as data: तू frames chip `informal`, the तुम्ही + -आ / कृपया end chips
 * `formal`, and everything between stays `neutral`. आपण stays the course's "we" (L1-M10's row): the very-formal "you" job (docs/08 Q17)
 * is named in prose, never a display subject.
 *
 * ### 3. Forms — L2 never edits an L1 file
 *
 * The additions-only invariant, made structural: a new SHAPE of an L1 lexeme (माझ्या, घरं,
 * जायचं, बोला…) is deconstructed in the L2 module that first shows it — its own row, its note
 * pointing back to the first-teach row — because the bare word's key is L1's forever (first
 * occurrence wins) and re-verifying shipped L1 files from every L2 issue would churn what the
 * gate froze. (docs/15 put दुकानाजवळ on दुकान's own L1 row; that was L1 repairing L1 — across
 * levels the rule flips.) Within L2 the docs/15 discipline continues: a first-teach row lists
 * the shapes its LEVEL shows (plan the wave, not the module), `[]` stays honest for invariables
 * and re-teaches, and a spoken contraction and its full form share one row — बोलतोय · बोलतेय ·
 * बोलतंय · बोलत — the hi-en `don't · do not` precedent. The participle -त is listed as a
 * single-token form of its verb's row, so the two-word spellings (बोलत आहे, चालत नाही) resolve
 * word by word — the -त form to the verb's row, आहे/नाही to M1's/M2's — and negation never
 * needs a new row.
 *
 * ### 4. Seams — hi-mr stays single-token, and the owners are decided up front
 *
 * maxSpan is 1 and stays 1: Devanagari GLUES what other courses span — postpositions
 * (स्टेशनला, चहापेक्षा, सगळ्यात), the continuous (बोलतोय), the purpose infinitive (जेवायला) —
 * so every fused form is a fresh single-token key owned by the module that first shows it, and
 * the multi-token tool (en-es's `Me llamo`) stays unused. The collisions, each named again in
 * its module's notes: बसा's row must NOT list the bare stem बस in `forms`, or M4's bus lands on
 * "sit"; प्यायला-as-purpose is spelled exactly like L1-M5's past प्यायला, whose row owns the
 * key, so the -आयला frame is shown on जेवायला/खायला and writes around it; या (M1) carries two
 * jobs in one note — "come (polite)" and the invite particle after -ऊ (जाऊ या, M6) — the hi-en
 * do-row precedent; कोण (M2) and कोणता (M9) are sibling keys whose notes cross-reference;
 * proper nouns (रोहन, पुणे, पुण्याला) never index (#61), so every direction anchors on a common
 * noun. L2 also pays L1's three recorded debts — दे (docs/15's M10 note) in M1, the counting
 * set (open question 28) across M5's table and M6's clock, and बोलणे (open question 29) in M7 —
 * while the three pinned L1 sweep misses (प्रिया, पाच, बोललो) STAND, because a module's index
 * is cumulative through itself and no L2 row reaches back into an L1 reader's screen. And what
 * first-occurrence-wins takes away, it also settles: आम्ही can never get a row of its own
 * (open question 23) — the आपण row keeps teaching the split.
 *
 * ### Why the hi-mr L2 ladder teaches what it teaches
 *
 * The jobs are levels.json's, mirrored verbatim; the brief adds which Hindi→Marathi delta each
 * job carries, sequenced so each pressure point lands in the module whose job cannot be done
 * without it: the two-step imperative and the आप→आपण trap in M1 (a request is addressed, and
 * must pick a register); तो/ती/ते and आहेत in M2 (describing a person forks Hindi's one वह by
 * gender); the full agreement paradigm — plurals at last — in M3; the place -ला and the
 * instrumental -ने in M4; मिळेल and the guest script in M5; the -ऊ या suggestion and
 * जमेल/चालेल in M6; the continuous -तोय in M7 (a phone call happens NOW); the -त नाही negative
 * and the मिळणे/सापडणे split in M8; -पेक्षा, सगळ्यात and की/किंवा in M9; and the third-person
 * ergative — त्याने/तिने, the ने withheld since L1-M5 — in M10, where a past-tense account
 * cannot dodge it. Kept deliberately OUT of L2: the genitive as a system (M2 shows one -चं
 * frame; L3 owns the rest), conditionals and reported speech (L3-M4/M5 per levels.json), the
 * passive, and the -ऊन converb — none of the ten jobs needs them. Bounds climb 8 → 10; pools
 * are authored to 12, the course's shipped size (#305).
 *
 * ## hi-mr L3: the four decisions, taken against the finished L2 (#452)
 *
 * The first L3 briefed anywhere, and the first level in this repo planned against a verified
 * level that is itself above L1. The pinning number is the REAL cumulative index through
 * L2-M10 — `public/content/hi-mr/index/L2-M10.json`, rebuilt and read: **441 surfaces,
 * maxSpan 1** — not L1's 222, and not a remembered figure. The L2 review chain it inherits is
 * `docs/49-llm-review-hi-mr-L2.md` (open questions 49–70, all standing for a native pass); the
 * full decision record for this level is `docs/50-hi-mr-L3-brief-decisions.md`. Each decision is
 * repeated inside the module notes, because a prompt only ever shows an author the notes.
 *
 * ### 1. Language of fields — unchanged from L1 and L2, field for field
 *
 * `rules[].text` and word `note` in English; every learner-facing line — `cue`, `trap`, `sound`,
 * `variations[].changed`, `mistake.why`, `usage`, `mnemonic` — in Hindi in Devanagari; `glossEn`
 * on every sentence; `literal` wherever the word order or a gender decision moves. The quirk of
 * this one bilingual course (docs/26 §1) is not revisited at L3.
 *
 * ### 2. Register — carried from L2 unchanged, chip included
 *
 * L2-M1 settled it and #422 gave the तुम्ही + -आ / कृपया tier its own chip: तू lines chip
 * `informal`, the कृपया-tier lines chip `formal`, everything safe with anyone stays `neutral`.
 * L3 adds no register rule; it applies the one it has, and the modules that face counters and
 * doctors (M7, M8) speak तुम्ही throughout while M1's own day and M10's story speak whichever
 * the listener earns.
 *
 * ### 3. What L2 deliberately withheld, and where it lands here
 *
 * L2 kept four things out by name, and each has an owner now: the **genitive as a system** at
 * M2 (L2-M2 taught one frame, माझ्या भावाचं नाव, and stopped); the **-ऊन converb** at M1, where
 * a day told at length cannot be told without it; **conditionals** at M4 (जर … तर, plus ONE
 * counterfactual frame — the system is L4-M3's); and **reported speech** at M5, on the की whose
 * L2-M9 note was deliberately written without a fence. The **passive stays out of L3 entirely**.
 * Two L2 debts stay standing rather than being quietly paid: L1-M9's बोललो remains the pinned
 * index miss (M5's note says why merging बोलणे into म्हणणे would poison both rows), and every
 * open question in docs/49 is a native-pass item, not an authoring one.
 *
 * ### 4. Forms and seams — L3 never edits an L1 or an L2 file
 *
 * Single-token, as the whole course has been: every -ऊन converb, every -चा/-ची/-चं genitive
 * form, every -मध्ये and -कडे form is its own key, deconstructed in the module that first shows
 * it with its note pointing back at the base word's row. The homographs and shared lexemes are
 * assigned up front: **वाटणे** is ONE lexeme with two jobs — "I think" at M3 and "it feels" at
 * M6 — and M3 owns the row; **भरणे** is L2-M8's (पोट भरलं) and M8 re-shows it for bills and
 * forms without opening a second family; **की** stays L2-M9's row across all three of its jobs;
 * **-कडे** stands bare for the first time at M7, and its row says डावीकडे and उजवीकडे (L2-M4)
 * were the same ending glued on. Bounds climb 10 → 12 (M1–M3: 10, M4–M7: 11, M8–M10: 12),
 * pools are authored to 12, M1–M3 ship fully enriched, and **M10's items are capped at eight
 * sentences** — "Your own story" is one item, not a notebook.
 *
 * ## en-it: the five decisions a brief must settle before any Italian is written
 *
 * en-it (#332–#337) is the fifth course briefed and the nearest sibling en-es has: same L1
 * (English), a Latin-script Romance L2 that also pro-drops, also genders its nouns, also runs
 * "like" through a verb meaning "please". So most of the en-es section above transfers, and this
 * one records only what does NOT — the places where copying Spanish, or copying French, would
 * ship something false. Each decision is repeated in the module notes, because a prompt only ever
 * shows an author the notes.
 *
 * ### 1. Register — the whole of L1 speaks `tu`, and `Lei` appears in no display string
 *
 * Italian forces a choice English never makes, and it is a COURSE-WIDE choice, not a per-module
 * one: `tu` (one person you are on familiar terms with) or `Lei` (the polite address, which takes
 * the THIRD-person form of the verb while still meaning "you"). L1 is `tu` throughout, and `Lei`
 * is named in prose from M2 on but never written in a `display`:
 *
 * - **The ten L1 jobs are all doable in `tu` or with no second person at all.** Politeness in L1
 *   is carried by WORDS, not by the person of the verb: `per favore`, `grazie`, and `vorrei`
 *   ("I would like", M3) are polite in either register, and `quanto costa?` has no person in it —
 *   so even M8's shop counter never has to pick a side.
 * - **`Lei` is not one form, it is a whole paradigm.** Teaching it honestly means the third-person
 *   present across every verb the course has (`sta`, `è`, `vuole`, `ha`) plus the capital-L
 *   spelling convention — an entire second address system inside a 25-word module cap. A learner
 *   who has only met `Lei` cannot speak to a friend at all; one who has only met `tu` is
 *   over-familiar at a shop counter, which is a smaller failure and one the `usage` line can warn
 *   about in words.
 * - **The register chip had two values when this L1 was authored, `neutral` and `informal`** —
 *   there was nowhere for a genuine third tier to live as data, exactly the argument hi-mr's L2
 *   briefs made about कृपया. So `Lei` would have been a register the file could not label. #422
 *   added `formal` for the L2s that teach that address; en-it L1 is unchanged by it.
 *
 * Concretely, and every module inherits it: `ciao` and `come stai?`, never `come sta?`;
 * `buongiorno` is taught as the daytime greeting that is polite AND usable with a friend, which is
 * true of it and is not true of `ciao`; second-person verbs end in `-i` (`stai`, `sei`, `vuoi`,
 * `hai`, `ti chiami`); `Lei` and the polite paradigm are named as deferred to L2.
 *
 * ### 2. Elision — the apostrophe is an index seam, and the policy is one line
 *
 * `src/engine/surface.ts` strips EDGE punctuation only and keeps an inner apostrophe (the curly
 * `’` folds to a straight `'`), and `surfaceIndexKeys` splits HYPHENS and nothing else. So an
 * elided Italian shape is ONE index surface with no parts: `l'acqua` does not answer for `acqua`,
 * `c'è` does not answer for `è`, `un po'` does not answer for `po`. The course-wide policy:
 *
 * - **A written elision of an article onto its noun is a `forms` entry on the NOUN's row.**
 *   `acqua` · `l'acqua`; `amico` · `l'amico`. One row, one true note — and that note says the
 *   article is `l'` before a vowel, so a learner tapping either spelling is told the same thing.
 *   The bare `il` / `la` rows (M1) state the same law from the other side.
 * - **An elision that fuses two taught words is a `forms` entry on the row of the first of them**,
 *   whose note then explains the fusion: `dove` · `dov'è` (M7). The exception is `c'è`, whose
 *   first element (`ci`) is taught nowhere in L1 — so `c'è` is its OWN row (M7), and `ci sono` is
 *   the two-token surface beside it.
 * - **Preposition+article elisions stay OUT of L1.** `dell'`, `all'`, `nell'` are real and correct
 *   and none of the ten jobs needs one: L1 contracts only before a consonant (`al`, `del`, `sul`,
 *   `nel`, `alla`, `della`, `alle`), each its own single-token surface. `un po' di` (M3) is the
 *   one apostrophe outside the article rule, and it is claimed whole as a three-token surface.
 *   Since the spoken-Italian pass (2026-09-05, `docs/44-llm-review-en-it-spoken.md`) the row also
 *   carries `un po'` as a form and `acqua` carries `d'acqua`, so `un po' d'acqua` — what is said —
 *   resolves as `un po'` + `d'acqua`; `un po' di pane` is still taken whole.
 * - **Straight `'` only in authored text.** The curly quote folds on the index, but `display` must
 *   carry one spelling or two spellings of one word reach the learner.
 *
 * ### 3. Accents are letters here, exactly as in Spanish
 *
 * `surface.ts` case-folds and never touches diacritics, so an accent is what keeps two words
 * apart — and dropping one silently merges them onto a single "why" note for the rest of the
 * course. The pairs L1 actually writes: **`è` (is) vs `e` (and)** — the loudest, because both are
 * taught (M1 and M10) and they are one keystroke apart; **`sì` (yes) vs `si` (the reflexive third
 * person)** — M2 and M4; **`là` (there) vs `la` (the)** — which is why M7 points with `lì` and
 * `qui` and leaves `là` alone. `perché`, `caffè`, `città`, `più`, `lunedì` carry their accents
 * always. The accent is never optional and never a stylistic choice.
 *
 * ### 4. Multi-token surfaces keep bare words free — the en-es tool, in Italian
 *
 * The resolver takes the LONGEST indexed surface at each position, so a surface may span tokens,
 * it claims no bare part, and it captures every bare part wherever the phrase appears. The
 * course's multi-token surfaces and their owners: `mi chiamo` and `mi piace` / `mi piacciono`
 * (M1); `un po' di` (M3); `ci sono` and `vicino a` (M7); `per favore` and `quanto costa` /
 * `quanto costano` (M8). Each is named in its module's INDEX SEAM note with the word it protects:
 * `mi chiamo` and `mi piace` leave no bare `mi` for a later module to have to claim, `un po' di`
 * leaves `di` to M1's `sono di + place`, `vicino a` leaves bare `a` to M6's `vado a Roma`,
 * `per favore` leaves bare `per` unclaimed, `quanto costa` leaves the agreeing quantifier
 * `quanto / quanta / quanti / quante` free for M8's own row, and `ci sono` swallows the `sono`
 * inside it so a tap there opens the existential note and not M1's `essere`.
 *
 * ### 5. Homographs — first occurrence wins, so every colliding surface has a named owner
 *
 * The index is cumulative and the earliest module to write a surface owns the note every later
 * learner sees (the `का` bug, docs/08 correction 4). The owners, each stated again in that
 * module's notes:
 *
 * - **`sono`** — M1, ONE row, "I am". Its note is written true of every seat `sono` takes in this
 *   course, because no later row can reach the key: it is also the `loro` form ("they are"), and
 *   from M5 it is the helper that builds the past of the movement verbs (`sono andato`). M5 does
 *   not open a second `sono` row; it writes its own rule text, and M7's `ci sono` takes its own
 *   two-token key.
 * - **`perché`** — M9, ONE row owning BOTH "why" and "because". Italian spells them the same, so
 *   there is no orthographic escape of the kind Spanish has in `por qué` / `porque`: one row, one
 *   note true in both directions, and telling them apart from the sentence is the module's own
 *   comprehension work.
 * - **`la`** — M1, the feminine definite article. The object pronoun `la` ("her / it") is the same
 *   spelling and stays OUT of L1 entirely, or the article's note becomes false for half its taps.
 *   Same for `lo`: M3's masculine article before `s`+consonant and `z`, never the object pronoun.
 * - **`ho`** — M5, opened as the helper of the passato prossimo (`ho mangiato`) and therefore the
 *   owner of the key M9's `ho fame` inherits. Its note defines BOTH jobs: the helper, and the
 *   plain "I have" M9 leans on. M9 opens no `ho` row.
 * - **The preposition+article contractions are their own surfaces**, which is what keeps the bare
 *   prepositions free for their owners: `alle` (M4, `alle 7`), `al` / `nel` / `sul` (M7),
 *   `della` (M8) — leaving `di` to M1 (`sono di India`), `a` to M6 (`vado a Roma`) and `in` to M7
 *   (`in cucina`). Bare `su` and bare `per` are written nowhere in L1, so no module has to own
 *   them.
 * - **`e` / `è`** — M10 and M1, two rows, kept apart by the accent and by nothing else (decision 3).
 * - **`sto` / `stai`** — M2, the two shapes of `stare` the greeting needs, in one row; `stare` as
 *   "to stay" and the progressive `sto mangiando` stay out of L1, and M4 names that deferral.
 *
 * ### Why the en-it ladder teaches what it teaches
 *
 * The jobs are levels.json's, mirrored verbatim; the brief adds which English→Italian delta each
 * job carries, sequenced so each pressure point lands in the module whose job cannot be done
 * without it: pro-drop, `mi chiamo` as a chunk and `mi piace`'s reversed subject in M1 (the first
 * verb the learner writes, and the first "I like"); intonation questions and adjective agreement in
 * M2 (a greeting asks and answers, and the answer changes with who is speaking); the bare
 * infinitive after `voglio`, the single `non`, and the vowel-change plural in M3 (every want names
 * a noun); one present for both English presents, reflexive dailies and fronted time in M4; the
 * passato prossimo with its `avere` / `essere` split and participle agreement in M5 (the level's
 * richest interference zone); present-for-plans in M6; `c'è` / `ci sono` and the contractions in
 * M7; agreement in the price question and the invariable `euro` in M8; `perché` in both directions
 * and the `avere` states in M9; recombination into turns, with pro-drop held across sentence
 * boundaries, in M10.
 *
 * Kept deliberately OUT of L1, and named as deferred in the module that would otherwise reach for
 * it: `Lei` and the polite paradigm (decision 1); the imperfetto (M5 — English's one past maps to
 * the passato prossimo at this level); the futuro semplice (M6); the subjunctive, which `penso
 * che` drags in (M9 stays on `penso di` + infinitive); the progressive `sto + gerundio` (M4);
 * object and partitive pronouns (`lo`, `la`, `ne`); and `ci` as anything but the frozen `c'è` /
 * `ci sono`. None of the ten jobs needs any of them, and importing one would spend the word budget
 * on a contrast the learner cannot yet frame.
 *
 * There was no seam-proof fixture to replace: `content/en-it/modules/` did not exist until #334
 * authored L1-M1 against the brief below, and #337 graduated the course out of `fixture: true`
 * — the fifth course shipping, all five courses briefed here.
 *
 * ## en-ru: the seven decisions a brief must settle before any Russian is written
 *
 * en-ru (#338–#343) is the product's seventh course. It shipped written in Cyrillic and #353–#360
 * romanized it: **rung teaches speech, not script** (docs/design-contract.md, 2026-08-30), so no
 * English-L1 course may ask its learner to decode a script they cannot read. The language law
 * runs as it does in en-es and en-ar — the document speaks English (`l1Tag: en`), every teaching
 * field is English, and Russian appears only in the L2 slots — but Russian diverges from English
 * harder than either, and it diverges through INFLECTION, which is exactly what a
 * verbatim-matching word index feels. The seven decisions below are settled here and repeated in
 * the notes, because a prompt only ever shows an author the notes.
 *
 * ### 0. THE ROMANIZATION — one scheme, and it is not optional
 *
 * **Every `display` and every `forms` entry in this course is written in the scheme below, and in
 * no other.** The word index matches surfaces VERBATIM and is FIRST OCCURRENCE WINS, so a second
 * spelling of a word is not a typo the learner squints past — it is a word the index has never
 * met, with no "why" row behind it, or worse, a word that lands on a DIFFERENT word's note. The
 * en-ar `romanizationNote` says exactly this about its own scheme, and it is the reason both
 * courses have one rather than a house style.
 *
 * The scheme is **reading-first, not reversible**: it is chosen so an English speaker with no
 * Russian can say the word, not so a Slavist can recover the Cyrillic. Where those two goals
 * disagree, readability wins — a learner who can pronounce `menyá zovút` has what this product
 * sells, and a learner who can reconstruct `меня зовут` from it has a party trick.
 *
 * ```
 *   а  a     й  y     с  s     ш  sh        е  e   after a consonant
 *   б  b     к  k     т  t     щ  shch      е  ye  word-initially, after a vowel, or after ь
 *   в  v     л  l     у  u     ъ  —         ё  yó  always, monosyllable or not
 *   г  g     м  m     ф  f     ы  y         э  eh
 *   д  d     н  n     х  kh    ь  '         ю  yu
 *   ж  zh    о  o     ц  ts    (U+0027)     я  ya
 *   з  z     п  p     ч  ch
 *   и  i     р  r
 *
 *   stress   á é í ó ú ý  — the stressed vowel, on every word of more than one syllable
 * ```
 *
 * The decisions inside that table, each with the reason it was taken — these are the collisions
 * Latin letters collapse, and every one of them is an index key:
 *
 * - **е / э, both wanting `e`.** `е` takes the bare letter because it is an order of magnitude
 *   more common; `э` is written **`eh`**, which is also what an English reader says when they see
 *   it (`éhto` for `это` reads "EH-tuh", which is right). A digraph rather than a diacritic
 *   because `э` still has to be able to take the stress acute, and `è` + acute is not a character.
 * - **е is `ye` where it is /je/** — word-initially, after a vowel, and after `ь`: `yest'`,
 *   `yeyó`, `p'yosh'`. After a consonant it is `e`: `menyá`, `moskvé`, `net`. The rule is
 *   deterministic from the Cyrillic, so it never produces two spellings of one word — and it is
 *   the single biggest readability win in the scheme, because `est'` invites an English reader to
 *   say "est".
 * - **и / ы, both wanting `i`.** `и` is `i`; `ы` is **`y`**. `ы` is a genuinely different vowel
 *   and it is in shipped content (`Москвы`), so it cannot be merged.
 * - **`й` is ALSO `y`**, and that is a deliberate merge rather than an oversight. English `y` does
 *   exactly this double duty already ("myth" and "yes"), the two never contrast in the same slot
 *   (`ы` is a syllable nucleus, `й` is not), and the alternative — `j` — reads as /dʒ/ to the
 *   audience this scheme is for. `новый` is `nóvyy`; `мой` is `moy`; `мы` is `my`.
 * - **ь / ъ, the silent signs.** `ь` is written **`'`** U+0027 and `ъ` is **not written at all**.
 *   Two separate calls. `ь` is worth keeping because it is the difference between `мат` and
 *   `мать`, and `'` survives the folder: `src/engine/surface.ts` strips EDGE punctuation but
 *   exempts `'` by name (rule 3), so `mat'` keeps its apostrophe as an index key. `ъ` is dropped
 *   because its whole job — blocking palatalization before a `ye`/`ya`/`yu` — is already done by
 *   the digraph's own `y`: `объявление` is `obyavlénie`, which reads correctly, and no L1 word
 *   depends on the distinction.
 * - **`г` is `v` where Russian SAYS /v/**, and this is the one place the table above is overruled
 *   rather than applied (#359). `сегодня` is said [sʲɪˈvodʲnʲə], so it is written **`sevódnya`**,
 *   not `segódnya`; the same call covers the genitive endings `-ого` / `-его` as **`-ovo`** /
 *   **`-evo`** if any ever reach L1 (`его` → `yevó`). The table is the DEFAULT and the scheme's
 *   stated principle is that reading-first beats reversible — and this is the case where obeying
 *   the letter would teach an English reader to say a word wrong. "se-GOD-nya" is not a
 *   mispronunciation a learner recovers from on their own, and the whole reason this course is
 *   romanized (#353) is that they cannot read the Cyrillic to check. **Note what this does NOT
 *   license**: `что` stays `chto` and `конечно` stays `konéchno`, because the `ch` there is still
 *   a `ch` the reader can see and the `sound` line carries the "shto"/"kanyeshna" — the `г`/`v`
 *   swap is singled out because the letter and the sound are not even neighbours. Every module
 *   writing one of these words says so in a `note`, quoting the Cyrillic, because that is exactly
 *   the case where a parenthetical Cyrillic earns its place (decision 1).
 * - **ё.** The pre-romanization brief mandated writing `ё` everywhere so the index kept it apart
 *   from `е`. That decision stands and gets stronger: **`ё` is always written `yó`, monosyllable
 *   or not.** Russian `ё` is by definition the stressed vowel of its word, so the acute is part of
 *   the letter's spelling rather than a stress decision — `vsyó`, `yeyó`, `yeshchyó`, `poshyól` —
 *   and `vsyó` (everything) therefore cannot merge with `vse` (everybody), which are two words.
 * - **ж / ш / щ / ч, the hushers.** `zh` / `sh` / `shch` / `ch`. `ш` vs `щ` is the pair that
 *   matters and `sh` vs `shch` keeps them four letters apart; `shch` is the spelling English
 *   already knows from *borshch*. Digraphs rather than háčeks (`ž š č`) because the audience is an
 *   English reader, not a Slavist, and because every extra codepoint is one more thing an author
 *   can get subtly wrong in one field out of six.
 *
 * **Stress is MARKED — an acute on the stressed vowel** (`á é í ó ú ý`), and this OVERTURNS the
 * pre-romanization decision that forbade it. The old reasoning was that `кни́га` and `книга` are
 * two surfaces and the index has to match one of them forever. That reasoning is still true, and
 * it is now the argument FOR marking rather than against: Russian vowel reduction is
 * unintelligible without stress — an unstressed `о` is not "o" — and a romanization that hides it
 * teaches an English reader to say the word wrong. So the mark is chosen deliberately and the
 * consistency requirement is the price:
 *
 * - **Every occurrence, every field.** `display`, `forms`, variations, mistakes, pool items. A
 *   word with the acute in one place and without it in another is TWO index keys and one of them
 *   has no note.
 * - **Monosyllables carry NO acute** — `chay`, `khleb`, `net`, `dom`, `stol`. There is nothing to
 *   disambiguate, and marking them would double the codepoints an author has to get right for no
 *   reading gain. `yó` is not an exception to this: its acute is spelling, not stress-choosing.
 * - **Precomposed, not decomposed.** Author `á` U+00E1, not `a` + U+0301. The folder NFC-composes
 *   anyway (rule 1) so both resolve, but one form in the files is one form to read in a diff.
 *
 * **Checked against the folder rather than assumed** (`src/engine/surface.ts`, rules 1–5, read and
 * run): `toLowerCase()` is applied with no locale, so **nothing in this scheme may distinguish two
 * letters by capitalisation** — and nothing does, which is why `ы`/`й` are separated by position
 * rather than by case. Diacritics are NOT touched by the fold, so the acute survives and `vsyó`
 * stays distinct from `vso`. The apostrophe classes `’ ʼ ʾ` all fold to `'`, so a typographic
 * apostrophe pasted into a file lands on the same key as the ASCII one this scheme writes — a
 * gift rather than a hazard, but author the ASCII one. And the whole emitted alphabet passes
 * `checkScriptMode`'s codepoint policy (#354) — verified by running the check over a fixture
 * carrying every character the scheme can emit, not by reading the regex.
 *
 * **The one-paragraph summary for the manifest row's `romanizationNote`** (#360 puts it there, in
 * the shape en-ar's takes):
 *
 * > A reading-first romanization: `zh sh shch ch kh ts` for the hushers and `х`/`ц`, `ye`/`e` for
 * > `е` by position, `yó` for the always-stressed `ё`, `y` for both `ы` and `й`, `eh` for `э`,
 * > `'` for the soft sign and nothing for the hard sign. An acute marks the stressed vowel on
 * > every word of more than one syllable. Every display string in this course follows this one
 * > scheme — the word index matches surfaces verbatim, so a second scheme would break resolution.
 *
 * ### 1. The language of every field, and the lines a sentence carries
 *
 * `scriptMode: romanized`, so **`display` is the ROMANIZATION and `script` carries the Cyrillic**
 * on every surface that has one — the quiet native line, which is the only place in this course
 * the Cyrillic appears on a learner's screen (docs/design-contract.md, #353). This inverts the
 * pre-#355 brief, which said the course was native, that there was no romanization anywhere in
 * it, and that `script` was unused; all three clauses are now false and the old text is gone
 * rather than left to contradict this one. Every teaching field — `rules[].text`, word `note`,
 * `trap`, `sound`, `variations[].changed`, `mistake.why`, `usage`, `mnemonic`, `cue` — is
 * ENGLISH, and may quote Cyrillic inside English prose where the note is ABOUT the spelling
 * (en-ar's shape: 3 such quotes in ~750 prose fields, never as the thing being read).
 *
 * - **No `glossEn`** (#405). The L1 cue is already English and `literal` is the word-for-word line;
 *   `checkGlossEn` fails the build on a third. A register, a gender, a plural English lacks — that
 *   goes in the word `note`. The build requires a gloss only where neither language is English.
 * - **`literal` is the workhorse of this course.** Russian says whole sentences with words English
 *   does not have and drops words English cannot drop, so write the Russian words in English
 *   order under any sentence whose construction is not word-for-word: `Menyá zovút Iván` →
 *   "me they-call Ivan"; `Mne nrávitsya Moskvá` → "to-me pleases Moscow"; `U menyá yest' kníga` →
 *   "at me is book"; `Na stolé yest' kníga` → "on table is book". Hyphenate a multi-word English
 *   gloss of one Russian word, as en-es hyphenates `call-myself`: `ya vstayú` → `I get-up`.
 * - **The stress marks are the DISPLAY's, and only the display's.** The `script` line is ordinary
 *   Russian orthography — `меня зовут`, no acutes, `ё` written as `ё` — because that is what a
 *   learner meets in a book, and it is not indexed. `sound` keeps doing its own job in English
 *   syllables ("KNEE-ga"); the acute says WHERE the stress is, `sound` says what it does to the
 *   vowels around it.
 *
 * ### 2. Register: `вы` is the course-wide default, and `ты` stays OUT of L1
 *
 * Russian forces a choice English never makes, on every sentence addressed to somebody. The
 * decision, taken for the whole course:
 *
 * - **Every second-person line in L1 uses `vy`** — the polite/plural address: `Kak vas zovút?`,
 *   `Vy khotíte chay?`, `U vas yest' khleb?`, `Dáyte, pozháluysta`. `vy` is the survival register:
 *   a learner meets strangers, shop assistants and hosts long before friends, and `ty` to a
 *   stranger is a rudeness English has no way to commit by accident.
 * - **`ty` never appears in a `display` line in L1.** It is named in prose — the notes say it
 *   exists, that it takes its own verb endings, and that choosing it is L2's job — so the learner
 *   is told the truth about the fork without being asked to write on both sides of it.
 * - The greetings follow: **`zdrávstvuyte`** (M2), not `privét`, which is the `ty`-tier greeting
 *   and is named in a `usage` line rather than written on a hero line.
 * - **`Kak delá?` is the one exemption, and honestly so**: it contains no second-person word at
 *   all — it is verbless, literally "how [are the] affairs" — so it carries no `ty`/`vy` marking
 *   to get wrong. Its fully polite expansion is `Kak u vas delá?`, and M2's `usage` line says
 *   which to prefer with somebody just met.
 *
 * The false slogan here is "`vy` is just the plural of `ty`". The law: `vy` is BOTH the plural
 * and the singular-polite, and it always takes the plural verb form even when it means one
 * person — `Vy khotíte chay?`, said to a single stranger.
 *
 * ### 3. The `ё` policy, on BOTH lines — `yó` in the display, `ё` in the script
 *
 * This decision predates the romanization and survives it, in two halves.
 *
 * **In `display`: `ё` is `yó`** — `poshyól`, `yeyó`, `vsyó`, `yeshchyó`, `p'yóte`,
 * `vstayóte` — and never `yo`, never `e`. That is decision 0's rule, and its payoff is the one
 * the Cyrillic version bought: `vsyó` (everything) never merges with `vse` (everybody), which are
 * genuinely two words, and one word is one index key.
 *
 * **In `script`: always write the diaeresis** — `пошёл`, `её`, `всё`, `ещё` — never the
 * `е`-spelling of a `ё`-word. Real Russian print usually drops it, so this is a deliberate
 * departure, and it is now a departure that costs nothing at all: the `script` line is not
 * indexed, so this half is purely about showing the learner the true spelling of the word. Say so
 * in a `usage` or `sound` line the first time a `ё` word appears, so a learner meeting a book that
 * omits it is not ambushed — and note that the `yó` in the display is what tells them the stress
 * a real Russian text would leave them to guess.
 *
 * The folder was read rather than assumed (`src/engine/surface.ts`, rules 1–5): it NFC-normalises,
 * folds the two apostrophe classes, strips edge punctuation and lowercases, and it touches no
 * diacritic. So `vsyó` and `vso` are two keys, and `yó` written as `yo` in one field out of six
 * would be a word with no note behind it.
 *
 * ### 4. Case: what L1 teaches, where, and what it defers — the course's biggest decision
 *
 * Russian has six cases and L1 cannot teach them. Teaching them badly — a declension table nobody
 * can use — is worse than teaching four of them where the ten jobs actually need them. The plan,
 * fixed here so that no module improvises:
 *
 * - **Nominative** — M1. The citation form and the subject; every word row's `display` is the
 *   nominative unless the module is teaching a shape.
 * - **Accusative, the SLOT** — M1. `Ya lyublyú chay` is already an object sentence, but M1's liked
 *   things are chosen so the form does not move: masculine inanimate and neuter nouns are
 *   identical in the accusative (`chay`, `khleb`, `molokó`, `sport`) and `kófe` does not decline
 *   at all. M1 names the slot and promises the ending.
 * - **Accusative, the ENDING** — M3. The first case ending a learner writes: feminine `-a/-ya`
 *   becomes `-u/-yu` — `vodá → vódu`, `kníga → knígu`, `múzyka → múzyku`. `*Ya khochú vodá` is THE
 *   interference of the module. **The stress MOVES on `vodá → vódu`**, and the acute is what shows
 *   it — a reason to mark stress that the Cyrillic version could not offer at all.
 * - **Genitive as a frozen partner** — M1, and only after `iz`: `Ya iz Índii`, `Ya iz Moskvý`. The
 *   note says what it is — the shape `iz` always takes — and does not generalise.
 * - **Prepositional** — M7. The second ending taught: `v`/`na` + `-e` on the ordinary noun —
 *   `stol → na stolé`, `magazín → v magazíne`, `Moskvá → v Moskvé`, `rabóta → na rabóte`.
 * - **Genitive as the counting case** — M8. After 1 the noun is nominative singular, after 2–4
 *   genitive singular, after 5 and up genitive plural: `odín rubl'` · `dva rublyá` ·
 *   `pyat' rubléy`. One honest note, the shapes the sentences need in `forms`, and no table.
 * - **Dative** — M9, and PRONOUNS only: `mne khólodno`, `mne nrávitsya`, `vam`. The dative of
 *   nouns is not taught; none of the ten jobs needs it.
 * - **Instrumental — DEFERRED ENTIRELY.** The only instrumental shapes in L1 are the frozen time
 *   adverbs `útrom`, `dnyóm`, `vécherom`, `nóch'yu` (M4), which the course teaches as single time
 *   words and says are frozen. No module explains the case; no module declines a noun into it.
 *
 * Two consequences every module obeys. First, **direction is not a seat this level opens**: `v` +
 * accusative for "into" is written around with `domóy` (homeward) and `dóma` (at home), which are
 * adverbs and take no case at all, so M4's `v` (time) and M7's `v` (place) are the only two seats
 * the `v` row has to answer for. Second, **a noun's shapes never sprawl**: see 5.
 *
 * ### 5. Every case shape of a word lives in ONE row's `forms` — and aspect pairs do not
 *
 * The index is cumulative and FIRST OCCURRENCE WINS, so the module that first teaches a word owns
 * the note every later learner sees when they tap ANY shape of it. Therefore:
 *
 * - **All shapes on one row.** `vodá · vódu` (M3), `stol · stolé` (M7), `rubl' · rublyá · rubléy`
 *   (M8), `chas · chasá · chasóv` (M4), `kníga · knígu · knígi` (M3, the plural added when M8
 *   counts them). A second row for a case form would be unreachable, and the note on the first row
 *   is therefore written true of every shape it lists. **Note what the romanization changed here:
 *   `vodá` and `vódu` differ in TWO places now — the ending and the acute — so an author who moves
 *   the ending and forgets the stress produces `vodu`, which is a surface the index has never met.
 *   Every `forms` list in this course is a stress list as much as an ending list.**
 * - **The same rule for the gender pairs.** The past `poshyól · poshlá · poshló · poshlí` is ONE
 *   row (M5); so is the speaker-describing `ustál · ustála` (M2); so is `byl · bylá · býlo · býli`
 *   (M5). The gender is the SPEAKER's, and the row's note says so once. `byl` is the monosyllable
 *   exemption in action: bare `byl`, acute on the other three.
 * - **`byt'` is ONE row across the whole level.** M5 opens it with `byl · bylá · býlo · býli` and
 *   M6 EXTENDS that same row with `búdu · búdete · búdet` rather than opening a second — a second
 *   row would be reachable and WRONG, two notes for one lexeme. One row, one note, and that note
 *   is the level's best weapon against the "Russian has no verb to be" slogan: the past is there,
 *   the future is there, and the PRESENT is the empty cell.
 * - **Aspect pairs are two words, not two forms.** `pit'`/`výpit'`, `chitát'`/`prochitát'`,
 *   `pokupát'`/`kupít'`, `idtí`/`poytí` are separate lexemes and get separate rows, each owned by
 *   the module that teaches it and each note true of its own aspect only. What travels together on
 *   one row is one lexeme's own paradigm: `kupít'`'s row carries `kupíl · kupíla · kupíli` and
 *   gains `kuplyú` in M6, because those are all the same word.
 * - **`Índii` is one surface with two jobs**, and M1 owns it: the genitive after `iz` (M1's
 *   `Ya iz Índii`) and the prepositional after `v`. M1's `Índiya` row lists `Índiya · Índii` and
 *   its note is written true of both seats, so a later `v Índii` cannot land on a false note. The
 *   romanization does not move this seam: `Индия`/`Индии` are two surfaces and `Índiya`/`Índii`
 *   are two surfaces, with the stress on the same syllable in both.
 *
 * ### 6. Multi-token surfaces and the homograph owners
 *
 * A surface may span tokens and the resolver takes the LONGEST match first, so a multi-token
 * surface both keeps its parts' bare keys free and CAPTURES those parts wherever the phrase
 * appears. Russian's chunks, with their owners:
 *
 * - `menyá zovút` (M1) — the name formula, taught whole. `Menyá zovút Iván` is "me they-call
 *   Ivan"; `Moyó ímya — Iván` is grammatical and nobody introduces themselves that way.
 * - `kak delá` (M2) — leaves the bare `kak` to M2's own "how" row (`Kak vas zovút?`).
 * - `dóbroye útro` (M2) — leaves `útrom` free; a different surface, so no clash.
 * - `do svidániya` (M2), `kázhdyy den'` (M4), `skól'ko stóit` and `skól'ko stóyat` (M8),
 *   `u vas yest'` and `u menyá yest'` (M8 — three tokens each, so this course's `maxSpan` is 3),
 *   `potomú chto` (M9).
 * - A bare `u` is never written on any display or pool line: `surfaceIndexKeys` splits hyphen
 *   parts, not whitespace tokens, so `u` inside `u menyá yest'` earns no key of its own.
 *
 * And the homographs, first occurrence winning, each with an owner. **Every one of these was
 * re-checked against the scheme rather than carried over**, because a romanization can merge two
 * Cyrillic surfaces or split one, and either moves who owns a key:
 *
 * - **`yest'` — the big one, settled by exclusion plus one owner.** Russian's `есть` is both "to
 *   eat" and the existential "there is". **"To eat" stays OUT of L1 entirely**: no module writes
 *   it, food is bought (`kupít' khleb`) and drunk (`pit' chay`), and none of the ten jobs needs
 *   it. That leaves one sense, and **M7 owns the bare `yest'` row** — the existential "there is"
 *   of `Na stolé yest' kníga` — with a note written true of both its seats, because M8's
 *   `u menyá yest'` is the same word doing possession. M8's three-token chunks win the longest
 *   match wherever they appear, so a tap inside one opens the possession note and a tap on a bare
 *   `yest'` opens M7's. **The scheme keeps the apostrophe at the token edge** — the folder exempts
 *   `'` from edge stripping by name — so `yest'` and a hypothetical `yest` are two keys and only
 *   the first is ever written.
 * - **`net`** — M2, as the answer "no". Its second life as the existential negative ("there
 *   isn't") takes the genitive of negation, which this level does not teach, so the note names
 *   that job and says it is L2's. No L1 display writes `net` in that sense. Monosyllable, so no
 *   acute — and that is the whole rule visible in one word.
 * - **`chto`** — M9, as the conjunction of `Ya dúmayu, chto …` (the comma before it is obligatory
 *   in writing, unlike English "I think that"). Its question sense, "what", is named in the same
 *   note; earlier modules ask yes/no questions and `Kak vas zovút?`, so no earlier surface claims
 *   the key.
 * - **`v`** — M4, in the time seat (`v sem' chasóv`), and its note must be written true of M7's
 *   place seat too (`v magazíne`), because M7's own row would be unreachable. The en-es `a`
 *   precedent, exactly.
 * - **`ya`** — M1, with `forms` `ya · menyá · mne`: the subject, the object and the to-form of one
 *   pronoun, all named in one note, so M9's `mne khólodno` lands on something true. Likewise `vy`
 *   (M2) carries `vy · vas · vam`. **A romanization seam the Cyrillic did not have:** `я` is one
 *   letter and `ya` is two, so the pronoun `ya` is now a PREFIX of every `ya`-initial word the
 *   course writes (`yazýk`). That costs nothing — the index matches whole tokens, and
 *   `surfaceIndexKeys` splits hyphen parts, never letters — but it is the kind of thing to check
 *   before assuming, so it is written down as checked.
 * - **`khoroshó`** — M2 ("fine", the answer), its note covering the adverb job ("well") because M9
 *   and M10 reuse the key.
 * - **A pair the romanization CREATES, and the one to watch.** `y` writes both `ы` and `й`, so two
 *   Cyrillic words could in principle meet in one Latin surface. Walked across L1's vocabulary:
 *   they do not, because `ы` is always a syllable nucleus and `й` never is, so the two never land
 *   in the same slot of the same shape. **Any module adding vocabulary must re-run that check
 *   rather than inherit it** — the finding is about the words L1 teaches, not about the scheme.
 * - Proper nouns never index unless a word row declares them (#61), so every place or person a
 *   sentence or a pool item names — `Iván`, `Ánna`, `Moskvá`, `Índiya` — needs a row in the module
 *   that first writes it, or the pool rule fails the build.
 *
 * ### Why the en-ru ladder teaches what it teaches
 *
 * The jobs are levels.json's, mirrored verbatim; the brief adds which English→Russian delta each
 * job carries, sequenced so each pressure point lands in the module whose job cannot be done
 * without it: the ZERO COPULA and the total absence of articles in M1 (the first sentence a
 * learner writes has no "is" and no "a" in it, and neither omission has an English twin); the `вы`
 * decision, intonation questions and the speaker's own gender on the predicate in M2 (a greeting
 * is addressed to somebody, and `ustál`/`ustála` cannot dodge who is speaking); the first case
 * ending in M3 (every want names a noun); conjugation classes and time words in M4; the
 * gender-agreeing past and the aspect choice in M5 (the level's richest interference zone, and
 * where "Russian has no to be" dies); the two futures in M6; the prepositional and existential
 * `yest'` in M7; the counting genitive and `u vas yest'` in M8; dative experiencers and
 * `potomú chto`/`poéhtomu` in M9; and recombination into turns, with word order doing the article's
 * old work, in M10. Kept deliberately OUT of L1: the instrumental as a case, the declension of
 * adjectives (they appear only in fixed phrases and as short-form predicates), verbs of motion as
 * a system, the imperfective past, the genitive of negation, participles, and `ты`.
 *
 * There is no seam-proof fixture to replace: `content/en-ru/modules/` did not exist until the
 * first authoring issue created it, exactly as on hi-en. Bounds climb 5 → 8, as en-es's do; pools
 * are authored to 12 and every sentence to three variations from the first module, so en-ru never
 * needs the retrofits #288 and #292 had to make.
 *
 * ### What the romanization did NOT change
 *
 * Worth saying plainly, because a reader arriving at #355 could reasonably expect more upheaval
 * than there was. The ladder, the ten jobs, the case plan, the register decision, the aspect
 * rules, the chunk list and every homograph OWNER are unchanged — they are facts about Russian,
 * and Russian did not move. What changed is the alphabet those facts are written in, plus two
 * consequences of it: a `forms` list is now a stress list as well as an ending list (decision 5),
 * and the `script` line went from unused to carrying the Cyrillic on every surface (decision 1).
 * A module brief that names a specific form names the romanized one; the grammar behind it reads
 * as it always did.
 * ## en-fr: decisions a brief must settle
 *
 * en-fr (#326–#331) is en-es's closest sibling — the same English L1, another Latin-script Romance
 * L2 — so most of the en-es section above transfers unchanged. What does NOT transfer is on this
 * list, and every point is repeated in the module notes, because a prompt only ever shows an
 * author the notes.
 *
 * ### 1. Register — the course speaks `vous`, and `tu` is named but never written (#327)
 *
 * French forces a choice English never makes, and the choice cannot be left to a module: a course
 * that greeted with `salut` in M2 and asked `vous voulez … ?` in M3 would be teaching two
 * different relationships. The decision, taken here and inherited by all ten modules:
 *
 * - **Every second-person line in L1 is `vous`** — `vous êtes`, `vous voulez`, `vous allez`,
 *   `s'il vous plaît`. That is the survival register: the learner's first French is spoken to a
 *   shopkeeper, a stranger, an official, a colleague, and `vous` is never wrong there, while `tu`
 *   to the wrong person is.
 * - **`tu` and its forms stay OUT of L1 display entirely** — no `tu es`, no `tu veux`, no
 *   `s'il te plaît`, and no `es` in any `forms` list, so the index never carries a shape the
 *   course does not teach. M2's notes name `tu` and `salut` in prose as what the learner will
 *   HEAR and what a later level owes them; naming is not writing.
 * - **The register chip had two values when this L1 was authored, `neutral` and `informal`** —
 *   every en-fr L1 sentence chips `neutral`, and the politeness above neutral is carried in words
 *   (`s'il vous plaît`, M8) and in the `usage` line. #422 added `formal` for the L2s that teach
 *   `vous` as an address; L1 keeps the two it used.
 * - **`je voudrais` stays out of L1.** It is the conditional of `vouloir` — a whole tense, spent
 *   on politeness the course already buys with `s'il vous plaît` — so M3 and M8 write `je veux`
 *   and let `usage` say when it would sound blunt. This is en-fr's `por`/`para`: named as
 *   deferred, so a later author does not import it a level early.
 *
 * ### 2. Elision makes the apostrophe an index seam
 *
 * `src/engine/surface.ts` strips EDGE punctuation only and folds `’` to `'`, so an inner
 * apostrophe stays inside its token: `j'aime`, `c'est`, `n'ai`, `m'appelle` and `s'il` are each ONE
 * surface, and each is DISTINCT from the bare word inside it (`aime`, `est`, `ai`, `appelle`, `il`).
 * The course-wide policy:
 *
 * - **Write the elision French writes, always** — `j'aime`, never `*je aime`; `c'est`, never
 *   `*ce est` — and use a straight `'` only. The curly quote folds on the index, but `display`
 *   must be one spelling.
 * - **An elided fusion is its own word row**, opened by the module that first writes it, and its
 *   note names BOTH halves: `j'aime` is `je` + `aime`, `n'ai` is `ne` + `ai`. It is never listed
 *   in the bare word's `forms`, because `forms` holds other shapes of THAT word and `j'aime` is
 *   two words fused — the hi-mr `forms`-swallowing bug (docs/07-llm-review-L1-M6-M10.md) in French
 *   dress. Equally, the bare stem is never listed on the fusion's row: `aime` must stay free for
 *   M10's `elle aime`, or a learner tapping it is told "I like".
 * - **What a fusion's `forms` MAY hold is other PERSONS of the same verb**, exactly as en-es's
 *   `Me llamo` row lists `te llamas · se llama`: `je m'appelle` may carry `vous vous appelez`.
 * - **Negation is written around the elision, not through it.** `ne` elides to `n'` before a
 *   vowel, so a negated vowel-initial verb costs a whole new row (`n'ai`, `n'aime`). Prefer a
 *   consonant-initial verb in a negated display (`je ne veux pas`, `je ne suis pas allé`) so `ne`
 *   stays bare, and open the fusion's row only where the sentence genuinely needs it (M9's
 *   `je n'ai pas faim`).
 *
 * ### 3. Accents are letters, and capitals keep them
 *
 * `normalizeSurface` folds case and never touches diacritics, so an accent is the whole difference
 * between two index entries — and a dropped accent silently merges two words for the rest of the
 * course. The accent is NEVER optional, on a capital either (`À bientôt`, `Ça va ?`). The pairs
 * this course actually meets, each with an owner:
 *
 * - **`à` (to, at) vs `a` (has)** — `à` is M4's row (`à 7 heures`), written true of M7's place
 *   seat (`à la maison`). Bare `a` stays OUT of L1: the course writes `j'ai` (one fused token) and
 *   `il y a` (one three-token surface), so nothing ever competes for the unaccented key.
 * - **`où` (where) vs `ou` (or)** — `où` is M7's (`où est … ?`). Bare `ou` stays out of L1; M10's
 *   joiners are `et · mais · aussi · et puis · alors`, and none of them is `ou`.
 * - **`la` (the, f) vs `là` (there)** — `la` is M1's article row. `là` stays out of L1.
 * - **`mange` (I eat, M4) vs `mangé` (eaten, M5)** — the accent IS the tense, exactly as en-es's
 *   `hablo`/`habló`, and M5 must write it on every participle.
 * - **`ç` is not `c`** — `ça`, `français`. A `*ca va` would open a second, unreachable entry.
 *
 * ### 4. Multi-token surfaces keep bare words free — and one of them has a hyphen
 *
 * As in en-es, a surface may span tokens, the resolver takes the longest match first, and a
 * multi-token surface claims NO bare part. The course's spans and their owners: `je m'appelle`
 * (M1, leaving `je` for `je suis`), `ça va` (M2), `le matin` · `le lundi` (M4, leaving `matin` and
 * the weekday free), `il y a` · `à côté de` · `près de` (M7, leaving `il`, `à`, `de` alone),
 * `s'il vous plaît` (M8, leaving M2's `vous` untouched), `combien de` (M8, beside the bare
 * `combien` of `c'est combien ?`), `parce que` (M9, leaving `que` for `je pense que`).
 *
 * The exception that must be planned rather than discovered: **`surfaceIndexKeys` also indexes the
 * HYPHEN PARTS of a token**, so `est-ce que` would claim the bare `est` and `ce` keys. That is one
 * reason the question policy below is intonation rather than `est-ce que`; the other is that the
 * intonation question is what a speaker actually says.
 *
 * And one span must be authored with its contractions, because a contraction is a different string
 * and the phrase will not match through it: the `à côté de` row's `forms` list `à côté de` ·
 * `à côté du` · `à côté de la`, all shapes of one preposition, so `à côté du lit` resolves whole
 * instead of stranding `côté`.
 *
 * ### 5. Questions — intonation, and question words in front (RATIFIED here)
 *
 * L1 asks with the statement said as a question, written with a space before the mark the way
 * French writes it (`Vous êtes de Paris ?`), and with a question word in front where there is one
 * (`Où est le livre ?`, `C'est combien ?`, `Pourquoi ?`). Inversion (`Êtes-vous …`) and `est-ce
 * que` both stay out of L1: inversion is a register the survival learner does not need, `est-ce
 * que` costs the `est` key (above), and neither is what is said across a counter. The index drops
 * a lone `?` token either way, so the space before it is typography, not a seam.
 *
 * ### 6. Homographs — first occurrence wins, so every colliding surface has an owner
 *
 * - **`est`** — M1 owns it, inside the `être` row whose `forms` are `suis · êtes · est` (the three
 *   persons this course writes; `es` is `tu`'s and stays out). That row's note is the one a learner
 *   sees when they tap `est` in M7's `Où est le livre ?` and in M10's `Il est bon`, so it must be
 *   written true of identity, origin AND location — French has one `être` and no ser/estar split.
 *   M5 leans on the same row for `je suis allé`, so the note names the auxiliary job too.
 * - **`le` / `la` / `les`** — M1 and M3 article rows. The object pronouns spelled the same way
 *   (`je le veux`) stay OUT of L1, so the article note is never false of what is on the screen.
 * - **`de`** — M1's row, and the busiest key in the course: origin (`je suis de Delhi`), the `de`
 *   of a quantity (`un kilo de riz`, M8), the `de` inside M7's compound prepositions, and the bare
 *   `de` that replaces `du` / `de la` / `un` / `une` after `ne … pas` (`je ne veux pas de café`,
 *   M3). No later module can reach the key, so M1's note is written true of every one of those
 *   seats, the way en-es's M4 note had to cover three seats of `a`.
 * - **`du` / `de la` / `des`** — M3's partitive rows. `du` is `de + le` whichever job it is doing,
 *   so the note says both: "some" before an uncountable noun, "of the" before a possessor or a
 *   place — which keeps it true of M7's `à côté du lit`. `des` is M3's too, and its note names the
 *   plural indefinite AND the `de + les` contraction, so M7 need not open a rival.
 * - **`pas`** — M3's negator, half of `ne … pas`; the noun `pas` (a step) is not L1 vocabulary.
 * - **`vais`** — M6's row, note true of both its seats: the plan marker (`je vais manger`, no
 *   preposition) and plain movement (`je vais au marché`, M7).
 * - **`j'ai`** — M5's row, opened as the passé-composé auxiliary and inherited by M9's
 *   `j'ai faim`, so its note is written true of both: "I have", and the auxiliary of the past.
 * - **`c'est`** — M8's row (`C'est combien ?`). M1 and M2 write around it rather than spending an
 *   early row on a fusion neither job needs.
 * - **`il` / `elle`** — M10's rows. M7's `il y a` is a three-token surface and claims no part, so
 *   both keys are still free when M10 needs them for the gendered thing-pronoun.
 * - **`que`** — M9's, from `je pense que`; `parce que` is a two-token surface beside it and takes
 *   nothing from it.
 *
 * There was no seam-proof fixture to replace: `content/en-fr/modules/` did not exist until #328
 * authored L1-M1 against the briefs below, and #331 graduated the course out of `fixture: true`
 * — the fifth course shipping, all five courses briefed here.
 *
 * ## en-de: decisions a brief must settle
 *
 * en-de (#356–#361) is the product's eighth course and en-fr's closest mirror — the same English
 * L1, another Latin-script L2 with grammatical gender and a compound past — so most of the en-es
 * and en-fr sections above transfer unchanged. What does NOT transfer is on this list, and every
 * point is repeated in the module notes, because a prompt only ever shows an author the notes.
 *
 * One of these is new in kind rather than in degree. Every course so far has planned its index
 * around what `src/engine/surface.ts` KEEPS — Spanish accents, Russian `ё`, the Italian elision
 * apostrophe. German is the first course that has to plan around what the folder THROWS AWAY, and
 * that is decision 2. It is why this section is longer than en-fr's.
 *
 * ### 1. The language of every field, and the lines a sentence carries
 *
 * The language law (#186/#196; the scan that enforced it went with the render-level suite on
 * 2026-08-30, so it is a review rule now): the document speaks the course's L1 (`en`)
 * and every L2 line declares `de`. So every teaching field is ENGLISH — `rules[].text`, word
 * `note`, `trap`, `sound`, `variations[].changed`, `mistake.why`, `usage`, `mnemonic` and `cue` —
 * and German appears ONLY in the L2 slots: sentence / word / variation / mistake / pool `display`,
 * and word `forms`. An English field may quote the German it explains; quoting is not switching.
 *
 * - **No `glossEn`** (#405). The L1 cue is already English and `literal` is the word-for-word line;
 *   `checkGlossEn` fails the build on a third, and requires a gloss only where neither language of
 *   the pair is English. What a gloss would have said goes in the word `note`.
 * - **`literal` is this course's most useful line, and German earns it far more often than French
 *   does**, because the clause bracket moves a verb English never moves: `Ich habe Brot gegessen`
 *   is "I have bread eaten", `Ich möchte einen Kaffee trinken` is "I would-like a coffee drink",
 *   `Wie geht es Ihnen?` is "how goes it to-you", `Mir ist kalt` is "to-me is cold", `Es gibt einen
 *   Stuhl` is "it gives a chair", `einundzwanzig` is "one-and-twenty". Carry `literal` on every
 *   sentence whose order or construction is not word for word — from M3 on that is most of them.
 *   Hyphenate a multi-word English gloss of one German word, as en-es hyphenates `call-myself`.
 * - `scriptMode` is `native` and `script` goes unused: German is written in the alphabet the
 *   learner already reads, so `display` carries the German itself and there is no quiet second
 *   line. What `sound` owes a learner instead is `ch`, `z`, `w`, `v`, `r`, `ei` against `ie`, the
 *   three umlauts and the final `-e` — none of it guessable from the spelling by an anglophone.
 *
 * ### 2. CASE FOLDING MEETS GERMAN CAPITALISATION — the seam no earlier course could reach
 *
 * Rule 4 of `src/engine/surface.ts` lowercases every token, deliberately: `Soy` and `soy` are one
 * word, because `display` carries sentence case and the word rows carry citation case and a
 * learner's "why" tap must not care which it hit. Seven courses were briefed under that rule and
 * none of them felt it, because in none of them does capitalisation carry meaning.
 *
 * **German capitalises every noun.** So in this course, and in no other so far, the fold silently
 * merges pairs that are genuinely two words. Checked against the real function rather than assumed
 * — the discipline #339 used on `ё`/`е` — and this is what came back:
 *
 * ```
 *   normalizeSurface('Sie')    === normalizeSurface('sie')    → 'sie'      MERGED
 *   normalizeSurface('Essen')  === normalizeSurface('essen')  → 'essen'    MERGED
 *   normalizeSurface('Morgen') === normalizeSurface('morgen') → 'morgen'   MERGED
 *   normalizeSurface('Ihnen')  === normalizeSurface('ihnen')  → 'ihnen'    MERGED
 *   normalizeSurface('ist')    !== normalizeSurface('isst')                two keys
 *   normalizeSurface('das')    !== normalizeSurface('dass')                two keys
 *   normalizeSurface('Maße')   !== normalizeSurface('Masse')               two keys (ß is not ss)
 *   normalizeSurface('schon')  !== normalizeSurface('schön')               two keys (umlaut kept)
 * ```
 *
 * There is no escape hatch and the briefs must stop looking for one. In particular **a multi-token
 * surface does NOT separate `Sie` from `sie`**: `Sie sind` and `sie sind` fold to the same key
 * `sie sind`, so spanning tokens buys nothing here — it is the tool for keeping a bare word FREE
 * (decision 5), not for telling two capitalisations apart. The consequences, decided course-wide:
 *
 * - **`sie` is ONE index entry with THREE readings, it is M2's, and its note is written true of
 *   all three.** German writes `sie` for "she", `sie` for "they" and `Sie` for the formal "you",
 *   and the index cannot hold them apart. M2 is the first module that addresses somebody, so M2
 *   opens the row, and its note carries the rule that actually separates the readings — **the verb
 *   form, and in writing the capital**: `sie ist` is "she is" (singular verb), `sie sind` is "they
 *   are" (plural verb, lowercase), `Sie sind` is "you are" (plural verb, capital mid-sentence). No
 *   later module opens a rival `sie` row, and M10's `sie` for a feminine THING (`die Tür … sie`)
 *   lands on M2's note, so M2's note must already say that `sie` for a thing is grammatical gender
 *   and not a person. This is the single most important index decision in the course.
 * - **The capital is still written, every time, even though the index folds it.** `Sie`, `Ihnen`
 *   and `Ihr` are capitalised mid-sentence and every noun is capitalised anywhere, because that is
 *   correct German and it is the ONLY visible signal of the reading a learner gets. The index
 *   cannot see it; the reader can. And never write a display in all capitals for emphasis — the
 *   same seam pointing the other way: `STRASSE` folds to `strasse` while `Straße` folds to
 *   `straße`, two keys, so a shouted line would land on no row at all (checked).
 * - **`Ihnen` / `ihnen` and `Ihr` / `ihr` fold too, and the register decision is what creates
 *   them.** Settled by exclusion so that each key keeps ONE reading: `ihnen` ("to them"), the
 *   pronoun `ihr` ("you", plural familiar) and the possessive `ihr` ("her" / "their") are all OUT
 *   of L1 — none of the ten jobs needs a third-person dative or a second possessor — so `Ihnen`
 *   (M2, `Wie geht es Ihnen?`) and `Ihr` (M2, `Ihr Name`) each own a key with nothing behind it.
 * - **Every noun/verb pair sharing a stem is one key, and each has a named owner** (decision 6).
 * - **`ist` / `isst` is NOT an index collision, and neither is `das` / `dass`.** Different
 *   spellings are different keys and the folder never merges them: it lowercases, it does not
 *   respell. `ist`/`isst` is a HOMOPHONE — the ear collides, the eye does not — so it belongs in a
 *   `sound` line or a sentence `trap`, never in an index plan. `das`/`dass` is a SPELLING trap for
 *   an anglophone who hears one word where German writes two, so it belongs in a `trap` on M9's
 *   `dass` sentence. Calling either an index collision would be false, and the plan below budgets
 *   no row for it.
 *
 * ### 3. Register — the course speaks `Sie`, and `du` is named but never written
 *
 * German forces a choice English never makes, and it cannot be left to a module: a course that
 * greeted with `Hallo, wie geht's?` in M2 and asked `Möchten Sie einen Kaffee?` in M3 would be
 * teaching two different relationships. The decision, taken here and inherited by all ten modules:
 *
 * - **Every second-person line in L1 is `Sie`** — `Sie sind`, `Sie haben`, `Sie möchten`,
 *   `Wie geht es Ihnen?`, `Ihr Name`. That is the survival register: the learner's first German is
 *   spoken to a shopkeeper, an official, a landlord or a colleague, where `Sie` is never wrong and
 *   `du` to the wrong person is — a rudeness English has no way to commit by accident.
 * - **`du` and its forms stay OUT of L1 display entirely** — no `du bist`, no `du hast`, no
 *   `dein`, no `dich`, no `dir`, and no `-st` ending in any `forms` list, so the index never
 *   carries a shape the course does not teach. `ihr`, the plural of `du`, goes with it. M2 names
 *   `du` and `Hallo` in prose as what the learner will HEAR and what a later level owes them;
 *   naming is not writing.
 * - **The false slogan is "`Sie` is just polite `you`", and it is heavier here than `vous` was in
 *   French.** The law: `Sie` is a distinct grammatical person taking the **PLURAL** verb form —
 *   `Sie sind`, `Sie haben`, `Sie möchten`, `Sie kommen` — with its own possessive `Ihr` and its
 *   own dative `Ihnen`. A module that quietly switched register would change the conjugation the
 *   learner is being drilled on, not merely the tone of it.
 * - **And the choice pays for itself in the paradigm.** Because `Sie` takes the plural, its form
 *   of every regular verb is spelled exactly like the INFINITIVE — `essen`, `kommen`, `arbeiten`,
 *   `möchten` — so a learner who has met the infinitive has already met the `Sie` form, and the
 *   index gets one key for both. `du` would have cost a whole second set of endings, its own
 *   imperative and `dein`/`dich`/`dir`. That is the argument for `Sie` on grounds the ladder can
 *   actually supply, rather than on politeness.
 * - **The register chip had two values when this L1 was authored, `neutral` and `informal`** —
 *   every en-de L1 sentence chips `neutral`, and politeness above neutral is carried by words
 *   (`bitte`, M8; `Ich möchte` rather than `Ich will`, M3) and by the `usage` line. #422 added
 *   `formal` for the L2s that teach `Sie` as an address; L1 keeps the two it used.
 * - **`Wie geht's?` is named and not written.** It is the `du`-flavoured casual form, and `geht's`
 *   would be a fused single-token key (`surface.ts` keeps an inner apostrophe) spent on a
 *   contraction no L1 job needs. Displays write `Wie geht es Ihnen?`; `usage` says the other
 *   exists.
 *
 * The honest objection — that a learner who has only met `Sie` cannot speak to a friend — is the
 * one en-it answered about `Lei` and en-fr about `tu`, and the answer is the same: being
 * over-formal with a friend is a smaller failure than being over-familiar with a stranger, and it
 * is one a `usage` line can warn about in words.
 *
 * ### 4. Separable-verb prefixes collide with prepositions — this course's own `का` bug
 *
 * `surface.ts` splits on whitespace, so in `Ich stehe um sieben Uhr auf` the flown-off prefix
 * `auf` is a bare token and earns the bare index key `auf` (checked: the token list is
 * `ich · stehe · um · sieben · uhr · auf`). If M4 teaches `aufstehen` first, M4's SEPARABLE PREFIX
 * owns the key `auf`, and M7's learner tapping `auf` in `auf dem Tisch` is shown "the separable
 * prefix of aufstehen" — a note that is false of the sentence in front of them. That is the `का`
 * bug (docs/08-marathi-third-review.md correction 4) in German dress, and it is reachable, not
 * hypothetical. The plan, fixed here:
 *
 * - **L1 teaches exactly ONE separable verb, `aufstehen`, so exactly ONE bare prefix key is
 *   spent.** `anrufen`, `ausgehen`, `mitkommen`, `vorstellen` and `zumachen` are named in M4's
 *   prose as the same mechanic and DEFERRED, which is what keeps `an`, `aus`, `mit`, `vor` and
 *   `zu` clean for their prepositional owners.
 * - **M4 owns `auf`, opens ONE row, and that row's note names BOTH seats** — the prefix that flew
 *   to the end of `Ich stehe um sieben Uhr auf`, and M7's plain preposition `auf dem Tisch` ("on").
 *   M7 opens no rival `auf` row, because the index could never reach it; M7's rule text carries the
 *   two-way preposition law and M4's note is written true of it in advance. This is the en-es `a`,
 *   en-fr `à` and en-ru `v` precedent, applied to a prefix instead of a preposition.
 * - **The prepositions whose earliest module is already the prepositional one keep their key
 *   outright:** `aus` is M1's (`Ich komme aus Indien`), `um` is M4's (`um sieben Uhr`), and `in`,
 *   `an`, `unter`, `neben`, `vor`, `hinter` and `mit` are M7's.
 * - **Bare `nach` and bare `zu` are never written in L1**, so no module has to own them: the
 *   course writes `nach Hause` and `zu Hause` as multi-token surfaces (decision 5) and `zur Arbeit`
 *   as the contraction `zur`, all different keys from the bare prepositions. That leaves bare `zu`
 *   free for M8 in its OTHER job, "too" (`Das ist zu teuer`), with nothing earlier competing. And
 *   `möchte` takes a BARE infinitive, so no `zu` + infinitive appears in L1 either.
 * - **A separable verb's Perfekt infixes the `ge-` into ONE token** — `aufgestanden` — so it is a
 *   single fresh key with no parts (`surfaceIndexKeys` splits hyphens, not morphemes; checked). It
 *   is a `forms` entry on M4's `aufstehen` row, extended by M5, never a second row.
 *
 * ### 5. Multi-token surfaces keep bare words free
 *
 * The resolver takes the LONGEST indexed surface at each position (`matchSurfaces`), so a surface
 * may span tokens, it claims NO bare part (`surfaceIndexKeys` splits hyphen parts, never
 * whitespace tokens), and it captures every bare part wherever the phrase appears. The course's
 * spans and their owners, each named again in its module's INDEX SEAM note with the word it
 * protects:
 *
 * - `ich heiße` (M1) — the name formula taught whole, leaving bare `ich` to M1's own pronoun row
 *   and never listing the bare `heiße`. Its `forms` may hold another PERSON of the same verb
 *   (`Sie heißen`), the en-fr `je m'appelle` / `vous vous appelez` precedent.
 * - `Guten Tag` · `Guten Morgen` · `Guten Abend` (M2) — three spans, so bare `Guten` is never
 *   written and the accusative `-en` on `Guten` never has to be explained at M2's word cap.
 * - `wie geht es` (M2) — three tokens, and it is what keeps `geht` free for M4's `gehen` while
 *   leaving M2's own bare `wie` (`Wie heißen Sie?`) untouched.
 * - `am Morgen` (M4) — the save that makes decision 6's `Morgen`/`morgen` split work.
 * - `nach Hause` (M5, in `Ich bin nach Hause gegangen`) and `zu Hause` (M7). M5 gets there first
 *   and owns its span; M7 owns the other and its note points back. Bare `Hause` is never written.
 * - `es gibt` (M7) — keeps `gibt` free (`geben` is taught nowhere else in L1) and leaves bare `es`
 *   for M10's thing-pronoun.
 * - `wie viel` · `wie viele` (M8) — two spans of their own, beside M2's bare `wie`.
 * - `zum Beispiel` is NOT used in L1 and no module needs it; naming it here stops an author
 *   reaching for it.
 *
 * ### 6. Homographs — first occurrence wins, so every colliding surface has a named owner
 *
 * The index is cumulative and the earliest module to write a surface owns the note every later
 * learner sees. German's collisions are mostly manufactured by decision 2's fold, so the owners
 * below are chosen against the fold, not against the spelling:
 *
 * - **`sie`** — M2, one row, three readings (decision 2). The most important row in the course.
 * - **`essen`** — M3, opened as the clause-final infinitive of `Ich möchte etwas essen`, with
 *   `forms` `essen · esse`. That one key does THREE jobs and the note names all three: the
 *   infinitive, the `Sie` form (`Sie essen` — decision 3's payoff, the plural spelled like the
 *   infinitive) and the noun `das Essen`. The noun is nonetheless kept OUT of L1 display — L1's
 *   food is concrete (`Brot`, `Kaffee`, `Wasser`, `Suppe`), so nothing has to lean on the third
 *   reading. M4's `Ich esse` extends M3's row rather than opening a second one the index could
 *   never reach. The same note says that `isst` (`er isst`) is a DIFFERENT key and a homophone of
 *   `ist`, not a collision.
 * - **`Morgen` / `morgen` — the sharp one, and the bare key is M6's, meaning "tomorrow".** M4
 *   wants "morning" and M6 wants "tomorrow" and M4 gets there first, so M4 is written around it:
 *   M4's morning is the adverb **`morgens`** — a different single-token key, and the habitual
 *   sense M4's job actually wants — plus the span `am Morgen`, and M2's greeting is the span
 *   `Guten Morgen`. **No module before M6 writes a bare `Morgen`.** M6's note still names both
 *   readings, because the index cannot tell them apart and the learner is owed the truth.
 * - **`Deutsch`** — M2 (`Sprechen Sie Deutsch?`), the language name, bare after `sprechen` with no
 *   article. The adjective `deutsch` is the same key and is kept out of L1; the note says so.
 * - **`Leben` / `leben`** — kept out of L1 in BOTH readings, decided on index grounds: residence
 *   is `wohnen` (`Ich wohne in Berlin`, M1) and no L1 job needs "life". An exclusion is a
 *   decision, and this one costs the course nothing.
 * - **`Arbeit` / `arbeiten` — checked, and NOT a collision.** `arbeit`, `arbeite` and `arbeiten`
 *   are three distinct keys; the fold lowercases and nothing else, so the noun never merges with a
 *   verb form. M4 owns all three — the `arbeiten` row (`forms` `arbeiten · arbeite`, the
 *   infinitive-and-`Sie`-form point again) and the `Arbeit` row — because M4's day contains work.
 * - **`der` / `die` / `das`** — M1 owns all three as the definite articles, and **M1's note must
 *   be true of every later use, or the later use stays out of L1.** So: `der` is masculine
 *   nominative AND feminine dative (M7's `auf der Straße` inherits M1's row, so M1's note names
 *   the dative seat); `die` is feminine AND plural (M8's plural inherits it, so the note says
 *   both); `das` is neuter AND the demonstrative "that" of M8's `Was kostet das?` (both). Kept OUT
 *   of L1 so that M1's note stays true: all three as RELATIVE pronouns, and the genitive.
 * - **`ein` / `eine` / `einen`** — M1 opens `ein` and `eine`; `einen` is M3's, the first visible
 *   accusative ending, and it is a different key, so both rows stay reachable. `kein` / `keine` /
 *   `keinen` are M3's own rows beside them.
 * - **`war` and `hatte` are each ONE row covering TWO persons** — `ich war` and `er/sie/es war`
 *   are the same written form, and so are `ich hatte` and `er hatte`. One row each (M5), with a
 *   note that says the form does not move between those two persons rather than leaving a learner
 *   to discover it. `waren` / `hatten` (the `Sie` forms) are `forms` entries on the same rows.
 * - **`möchte` and `mag` are two lemmas in practice and get two owners** — `Ich mag` (M1, "I
 *   like", a standing preference) and `Ich möchte` (M3, "I would like", a request). Neither row's
 *   note answers for the other, and M3's says in one line why the polite form is the one a shop
 *   counter wants. `mögen` as a bare infinitive is written nowhere in L1.
 * - **The contractions are their own surfaces**, which is what keeps the bare prepositions and
 *   articles free: `im`, `am`, `zum`, `zur`, `ins`, `ans`. `am` is M4's, because M4's `am Montag`
 *   writes it first, and its note covers the TIME seat and M7's PLACE seat alike (`am Tisch`) —
 *   exactly as en-es's `a` had to. The rest are M7's.
 * - **`und` / `aber` / `auch` / `dann` / `also`** — M10's spend, so earlier modules keep one
 *   clause per sentence. `also` is a FALSE FRIEND: it means "so", not English "also", which is
 *   `auch`. Both are named in the same M10 note, because they will otherwise be confused.
 *
 * ### 7. Umlauts and ß are kept by the fold, so they are never optional
 *
 * `surface.ts` NFC-normalises, folds the apostrophe classes, strips edge punctuation and
 * lowercases — it NEVER strips diacritics. Checked, not assumed: `schon` / `schön`,
 * `konnte` / `könnte` and `Mutter` / `Mütter` come back as distinct keys, and so do `Maße` /
 * `Masse`, because **`ß` does not fold to `ss`** either. Therefore:
 *
 * - **The umlaut is never optional and the `ae` / `oe` / `ue` transcription is never used**, in a
 *   `display`, a `forms` entry or a starred mistake — capitals included (`Über`, `Ärztin`). A
 *   `*schon` written for `schön` does not look like a typo to the index; it is a different word.
 * - **`ß` is written where the orthography wants it** — after a long vowel or a diphthong
 *   (`heiße`, `Straße`, `groß`, `dreißig`) — and `ss` after a short one (`isst`, `Wasser`,
 *   `dass`). Never substitute `ss` for `ß`: `Maße` and `Masse` are two entries. The capital `ẞ` is
 *   needed nowhere in L1 (and lowercases to `ß` in any case — checked), and the all-caps spelling
 *   `STRASSE` is banned by decision 2 for a different reason.
 *
 * ### Why the en-de ladder teaches what it teaches
 *
 * The jobs are levels.json's, mirrored verbatim; the brief adds which English→German delta each
 * job carries, sequenced so each pressure point lands in the module whose job cannot be done
 * without it: three-way gender, the bare profession and the bare generic in M1 (the first sentence
 * a learner writes names a noun, and English's `a` is exactly what German does not want there);
 * the `Sie` decision, verb-first yes/no questions with no do-support, and the dative experiencer of
 * `Wie geht es Ihnen?` in M2 (a greeting is addressed to somebody and can dodge neither); the
 * clause bracket and the `nicht`/`kein` split in M3 (every want names a noun, and the level's
 * sharpest interference is negating one); the one present that covers both English presents,
 * verb-second made visible by fronting, and the separable prefix in M4; the Perfekt with its
 * `haben`/`sein` split, plus the deliberate `war`/`hatte` exception, in M5 (the module most likely
 * to ship stilted German); present-for-future and the `will` false friend in M6; `es gibt` and the
 * two-way prepositions in M7 (where "the accusative is the object case" dies); the backwards
 * two-digit numbers and the bare measure phrase in M8; `weil` against `denn`, the `haben` states
 * and `Mir ist kalt` in M9 (where the "verb at the end" slogan is finally stated as a law); and
 * recombination into turns, with `er`/`sie`/`es` for THINGS, in M10 — which lands straight back on
 * decision 2's `sie` row.
 *
 * Kept deliberately OUT of L1, and named as deferred in the module that would otherwise reach for
 * it: `du` and the whole familiar paradigm (decision 3); the Präteritum except `war` and `hatte`
 * (M5); `werden` + infinitive as the future (M6); the genitive; adjective endings before a noun
 * (adjectives appear only after `sein`, where they are uninflected — `Der Kaffee ist gut`);
 * relative clauses; the Konjunktiv beyond the frozen `möchte`; the dative as a paradigm (M7 uses
 * fixed dative phrases and M9 the fixed `mir`); and every separable verb but `aufstehen`.
 *
 * There is no seam-proof fixture to replace: `content/en-de/modules/` does not exist, exactly as
 * on hi-en, en-ru and en-it. The manifest row is `fixture: true` (#356) and stays there until the
 * course's own graduation issue; briefing a course is not shipping it. Bounds climb 5 → 8, as
 * en-fr's do — and every brief says that German's clause bracket makes a sentence LONGER IN TOKENS
 * than the Romance equivalent at the same difficulty (`Ich möchte einen Kaffee trinken` is five
 * tokens for what French says in four), so the ceiling is a real constraint on M3 and M5 rather
 * than slack.
 *
 * ## en-ko: the decisions a brief must settle before any Korean is written
 *
 * en-ko is the first course **born** conforming to `docs/design-contract.md`'s "rung teaches
 * speech, not script" (#353). Its manifest row is `scriptMode: "romanized"` from its first commit
 * (#374), so no English speaker is ever asked to decode Hangul, and `checkScriptMode` fails the
 * build on a Hangul `display` before a module can ship one. en-ru had to be dragged into that
 * shape across #353–#360, 959 Cyrillic strings at a time. This one never will be, and the reason
 * it never will be is that the scheme was settled BEFORE the row existed — #373, recorded in
 * `docs/34-en-ko-romanization-decisions.md`, which is the citable source for everything below.
 *
 * 1. **The romanization is Revised Romanization, transcribing pronunciation, and it is not
 *    reopened in a brief.** Word-internal sound changes are written as they are said (`hakgyo`,
 *    `silla`, `joayo`, `simman`). It is pure ASCII, which is why this course — unlike en-ar and
 *    en-ru — is charged no font cut for anything a learner reads. McCune-Reischauer was rejected
 *    on a mechanical ground, not a taste one: its aspirates are written with an apostrophe, and
 *    `src/engine/surface.ts` rules 2 and 3 fold apostrophe classes and strip edge punctuation, so
 *    MR would put Korean's most important consonant contrast on the one character the normaliser
 *    has the most rules about.
 *
 * 2. **THE PARTICLE HYPHEN, and it is the decision the whole course rests on.** Korean writes its
 *    particles attached, with no space, so a naive romanization gives `chaegeul`, `jeoneun`,
 *    `hakgyoeseo` — one whitespace token each, and `tokenizeSurface` counts whitespace tokens. The
 *    bare noun would then never appear as a surface anywhere in the course, and "book" would have
 *    no row for a learner to tap. `surface.ts` already solves exactly this, and its header says so
 *    under **Hyphens** (#116, [Q3]): `al-qahwa` is one surface and the emitter ALSO indexes `al`
 *    and `qahwa` against the same entry. So every particle and the copula are joined to their host
 *    by a hyphen — `jeo-neun`, `chaek-eul`, `hakgyo-e`, `haksaeng-ieyo` — and the host keeps its
 *    ISOLATION shape across the join (`chaek-eul`, never the resyllabified `chaeg-eul`), because a
 *    stem that respelled itself for every particle would mint a fresh unreachable surface each
 *    time. The liaison goes in `sound`, where a pronunciation note belongs. Checked against the
 *    real functions rather than assumed: `surfaceIndexKeys(normalizeSurface('chaek-eul'))` is
 *    `['chaek-eul', 'chaek', 'eul']`, and `normalizeSurface('-neun')` is `'neun'` — a leading
 *    hyphen is edge punctuation and is stripped, which is what lets a word row written `-neun`
 *    own the bare particle key. RR's own syllable-disambiguation hyphen (`jung-ang`) is therefore
 *    BANNED: in this repo a hyphen is a semantic split, and that one would mint the junk keys
 *    `jung` and `ang`.
 *
 * 3. **SPEECH LEVEL, decided course-wide: this course speaks 해요체, the `-yo` ending.** Korean
 *    has no neutral verb form — every sentence encodes the relationship to the listener — so the
 *    choice is unavoidable and is made once, here, not per module. `-yo` is what an adult learner
 *    speaks to a stranger, a shopkeeper or a colleague, and it is never wrong in those places. The
 *    plain style (`meogeo`, `ga`) is never written; the formal `-mnida` style is written in
 *    exactly two frozen phrases the learner will hear on day one, `gamsahamnida` and
 *    `mannaseo bangapseumnida`, and both are taught as fixed phrases with a note saying so. Three
 *    consequences, and they are why this is one decision rather than ten: the pronoun for "I" is
 *    `jeo` (humble), never `na`, and `je` is its possessive; the honorific infix `-si-` that makes
 *    `annyeonghaseyo` and `juseyo` is a SEPARATE axis — it raises the SUBJECT, not the listener —
 *    and L1 teaches those as whole phrases with the productive rule named as deferred; and `-yo`
 *    is not a politeness suffix bolted onto a finished word, because the stem changes shape before
 *    it (`-ayo` after an a/o stem, `-eoyo` otherwise, `haeyo` for `hada` verbs), which is the
 *    conjugation the level is drilling from M4 on.
 *
 * 4. **HOMOGRAPHS — the romanization keeps Korean's homophones, and that is correct.** The
 *    product teaches speech, so two words that sound alike are alike on the page. What matters is
 *    that first occurrence wins, so each collision is assigned an owner: `cha` is TEA (M3) and
 *    "car" stays out of L1; `mal` is "word" (M9) and "horse" is not taught; `nun`, `bae` and `bam`
 *    take one reading each and the other stays out. The sharp one is `i`, which is the subject
 *    particle (M1's row, and it must stay M1's), the demonstrative "this", the Sino-Korean two and
 *    the word for "tooth" — so the demonstrative is written as the hyphenated `i-geo` and M8's
 *    numeral appears inside compounds rather than bare.
 *
 * 5. **CASE FOLDING IS A NON-ISSUE HERE, and that is worth writing down.** `surface.ts` rule 4
 *    lowercases without a locale; RR capitalises proper nouns and sentence case capitalises the
 *    first word, and all of it folds away harmlessly, exactly as `Soy`/`soy` does in en-es. This
 *    is en-de's catastrophe — German capitalises every noun, so `Essen`/`essen` and
 *    `Morgen`/`morgen` are one entry each — NOT happening. Recorded so nobody goes looking for it,
 *    and so nobody "fixes" the romanization to dodge a problem it does not have.
 *
 * 6. **TRANSCRIPTION MEANS ONE WORD HAS SEVERAL SPELLINGS.** Because RR writes the sound, a stem's
 *    shape moves with what follows it: `joayo`/`jota`, `meogeoyo`/`meokda`, `ilgeoyo`/`ikda`. The
 *    index matches verbatim, so those are separate surfaces, and a word row's `forms` carries
 *    every shape that course's sentences actually use — and only shapes of THAT word. The `forms`
 *    rule from `docs/07-llm-review-L1-M6-M10.md` binds unchanged: never a cousin, never a synonym.
 *    In practice L1 speaks the `-yo` forms almost throughout, so most rows carry one or two
 *    shapes; M5's past forms are the exception and sit on the same row as the present, because
 *    they are the same verb.
 *
 * 7. **`sound` CARRIES WHAT THE ROMANIZATION CANNOT, and Korean is the opposite of Russian here.**
 *    en-ru had to mark stress on every polysyllable because Russian vowel reduction is
 *    unintelligible without it; Korean has NO English-style stress, and marking one would teach a
 *    wrong thing. No acutes, ever — if a later reader reaches for them out of symmetry with en-ar
 *    or en-ru, this is the answer. What `sound` must carry instead: the three-way stop contrast
 *    (plain `g d b j`, tense `kk tt pp jj`, aspirated `k t p ch`) where English hears two
 *    categories; `eo` against `o` and `eu` against `u`, which an English reader collapses on
 *    sight; unreleased final consonants; and the liaison at the particle hyphen every time it is
 *    audible.
 *
 * 8. **Hangul lives in exactly one field: `script`, the quiet native line.** Never in `display`,
 *    never in `forms`, never quoted inside an English rule or note. `checkScriptMode` enforces the
 *    first two; the third is on the author. `script` is typed on `Sentence`, `Variation` AND
 *    `PoolItem` — unlike `sound`, which exists only on `Sentence` — so it is authored on all
 *    three. It renders from a system face today: `tools/font-subset.ts` bundles no Hangul, because
 *    `@fontsource/noto-sans-kr` splits Korean across ~120 numbered range files per weight and the
 *    subsetter is built on one source file per target. That is an honest, recorded defect (#375,
 *    `docs/34-en-ko-romanization-decisions.md` §8), not a reason to withhold the line.
 *
 * Kept deliberately OUT of L1, and named as deferred in the module that would otherwise reach for
 * it: the plain and `-mnida` speech levels as productive systems (decision 3); the progressive
 * `-go isseoyo` (M4); `-(eu)llae yo` and `-gess-` as futures (M6); the long negative `-ji anayo`
 * and `mot` beyond one named mention (M3); honorific `-si-` as a rule rather than a phrase; the
 * topic/subject contrast beyond a working rule (M1); Sino-Korean numerals above the price range
 * M8 needs; and every clause-joining ending but `-go` and `-aseo/-eoseo` (M9, M10).
 *
 * Bounds climb 4 → 7, LOWER than the European courses at the same rungs and deliberately so:
 * Korean's eojeol spacing packs a clause into fewer whitespace tokens (`jeo-neun haksaeng-ieyo` is
 * two tokens for what German needs three to say), so `maxWordsPerSentence` is slack here and the
 * bound that actually bites is `newWordCap` — every particle, every ending and every counter is a
 * new surface.
 *
 * ## en-es L2: the decisions, taken against the finished L1 (#426)
 *
 * The second L2 briefed, after hi-mr's (#295). Planned against the REAL cumulative L1 index —
 * **228 surfaces through L1-M10, maxSpan 3**, rebuilt and read rather than remembered — and
 * against the spoken-Spanish pass (docs/41). The four decisions below are recorded in
 * `docs/53-en-es-L2-brief-decisions.md` and repeated in the module notes, because a prompt only
 * ever shows an author the notes.
 *
 * ### 1. Register — `usted` is not new here, and the correction matters
 *
 * The issue that commissioned these briefs said L1 "kept `usted` out of every display". The index
 * says otherwise, and rule 1 (check the example against the rule) applies to a brief's premises
 * too: **L1-M2 teaches `usted` on a row of its own** (`¿Cómo está usted?`, `¿Es usted de la
 * India?` are display sentences), and `es`, `está` and `quiere` each already carry "…and usted"
 * in their notes. So L2 does not introduce the pronoun. What it settles is everything the pronoun
 * alone never decided:
 *
 * - **The frame, not the pronoun, is where politeness lives.** `usted` is a grammatical address,
 *   not a politeness dial: `Deme el pan, usted` is rude and `¿Me pones un café?` to a friend is
 *   not. The tier the learner controls is the FRAME — a bare imperative, `¿Puede…?`, `¿Me da…?`,
 *   `¿Me podría…?` (deferred, conditional is L3) — and M1 teaches the frames in both addresses
 *   side by side. The slogan to kill: "`usted` is formal, `tú` is informal". In Spain `tú` is
 *   ordinary with a shop assistant; across much of Colombia and Central America `usted` goes to a
 *   grandchild out of affection. What is invariant is the AGREEMENT, so that is what a rule says.
 * - **Which module speaks which.** M4 (asking the way), M7 (the phone) and M8 (a problem with a
 *   stranger or staff) speak `usted`; M6 (plans with friends) speaks `tú`; M2, M3, M5 and M9 are
 *   written in whichever the scene actually implies and say so in `usage`. M1 shows the pair.
 * - **The chip carries it now** (#422): `tú`-only frames chip `informal`, the `usted` frames and
 *   the `perdone` / `disculpe` end chip `formal`, everything safe with anyone stays `neutral`.
 *   The tier the L1 briefs had to smuggle into `usage` prose is data from this level on.
 * - **The paradigm `usted` drags in.** L1 gave the learner `es`, `está` and `quiere`; L2 owes the
 *   rest of the third person, and it arrives as vocabulary rather than as a new system: `tiene`
 *   (M2), `puede` (M1), `da` (M1), `dice` (M7), `prefiere` (M9), plus the `usted` imperative
 *   (`perdone`, `disculpe`, `dígame`, `siga`, `gire`) which M1 opens and M4 and M7 spend.
 *
 * ### 2. Forms — L2 never edits an L1 file
 *
 * The additions-only invariant, structural exactly as in hi-mr: a new SHAPE of an L1 lexeme
 * (`estamos`, `vamos a`, `quieres` in a new cell, `comía` in a narrative role) is deconstructed
 * in the L2 module that first shows it, its note pointing back to the first-teach row, because
 * the bare word's key is L1's forever and re-verifying frozen L1 files from every L2 issue would
 * churn what the gate passed. Within L2 the discipline continues: a first-teach row lists the
 * cells its LEVEL shows (plan the wave, not the module), `[]` stays honest for invariables and
 * re-teaches, and one paradigm has ONE home.
 *
 * ### 3. Seams — the multi-token surface is Spanish's tool, and every collision has an owner
 *
 * maxSpan is 3 and stays 3. Where Marathi glues (`स्टेशनला`) Spanish SPANS, so the tool L1 built
 * with `Me llamo`, `por favor` and `al lado de` — a phrase indexed whole, leaving its bare words
 * free — is how L2 keeps a later module's word off an earlier module's note. First occurrence
 * wins, so these are decided up front rather than discovered:
 *
 * - `a` is L1-M4's ("at eight", the personal `a`). Directions therefore index **`a la derecha`
 *   and `a la izquierda` whole** (M4), and `todo recto` whole, because `todo` is L1-M8's.
 * - `como` is L1-M4's "I eat". A comparison written `tan alto como` would land the learner on an
 *   eating note — the `का` bug in Spanish — so **`tan … como` is kept out of L2 entirely** and
 *   named as L3's in M9's notes. This is an index decision driving a syllabus decision, and it is
 *   the clearest case in the repo of the two being the same decision.
 * - `la`, `los`, `las` are L1-M1's ARTICLES. The direct-object clitics spelled identically can
 *   therefore never be first-taught, so **L2 teaches the clitic system on `lo`, `me` and `te`
 *   only** (M5), and `la`/`los`/`las` as objects wait for L3.
 * - `bueno` is L1-M10's discourse "well, …". The adjective is taught on **`buena`, `buenos`,
 *   `buenas`** (M3) and masculine singular `bueno` never appears in a display; `mejor` (M9) picks
 *   the family up. The same trap in reverse is a gift to M7: the Mexican way to answer a phone is
 *   `¿Bueno?`, which a usage line names and no display teaches.
 * - `se` (M4, impersonal `¿Cómo se va…?`), `le` (M7, indirect object), `lo` (M5, direct object),
 *   `que` (M5, the linker — its note true of the comparative job M9 spends), `luego` (M7),
 *   `tarde` (M6), `día` (M6), `cerca` (M4) are all bare keys L1 left free precisely because it
 *   indexed `se llama`, `le gusta`, `por favor`, `por qué`, `hasta luego`, `por la tarde`,
 *   `todos los días` and `cerca de` whole. L2 spends them, one owner each.
 * - `mañana` (L1-M6, "tomorrow"), `hora` (L1-M4), `hay` and `está` (L1-M7/M2), `qué` (L1-M4),
 *   `nada` (L1-M3), `mal` (L1-M9), `muy` (L1-M8) and `mucho` (L1-M1) are re-taught by L2 modules
 *   that own none of them. `hermano`, `malo`, `esta`, `cuál`, `quién` and `más` ARE free and are
 *   assigned: M2, M3, M9, M9, M7, M9.
 * - Accents are still letters (L1-M2's law), and L2 puts more weight on it than L1 did: `esta`
 *   (this) beside `está` (is), `mas` never written for `más`, `si`/`sí`, `que`/`qué`, `cual` never
 *   for `cuál`. A dropped accent here merges a demonstrative into a verb for the rest of the course.
 * - Proper nouns never index (#61), so every direction, every call and every account anchors on a
 *   common noun (`la plaza`, `la estación`, `el mensaje`), not on `Ana` or `México`.
 *
 * ### 4. What L2 withholds, and where each piece lands
 *
 * Named in the module that would otherwise reach for it, so a later author does not import it a
 * level early: the **subjunctive** (L3-M3/M4 per `content/en-es/levels.json`) — M1's requests stop
 * at `¿Puede…?` and never reach `Quiero que venga`; the **conditional** `podría`/`querría` (L3),
 * which is why M1 and M8 buy politeness with frames rather than with a tense; the **perfect**
 * `he perdido` (L3), so M8 and M10 tell a past with L1-M5's preterite; **`por` vs `para` as a
 * system** (L3) — `para` enters at M5 for a recipient (`Para mí, una sopa`) and nothing else, and
 * bare `por` stays unowned across the whole level, riding only inside `por favor`, `por qué` and
 * `por eso`; **`tan … como`** (L3, for the index reason above); **object `la`/`los`/`las`** (L3,
 * same reason); and the **future in `-ré`** beyond the three cells L1-M6 already shipped.
 *
 * ### Why the en-es L2 ladder teaches what it teaches
 *
 * The jobs are levels.json's, mirrored verbatim; the brief adds which English→Spanish delta each
 * job carries, sequenced so each pressure point lands in the module whose job cannot be done
 * without it: the stem-changing verbs and the request frames in M1 (L1 shipped `quiero`/`quieres`
 * and `cuesta` without ever naming e→ie or o→ue; a request needs `puede`, so the law is named
 * where it is first paid for); `tener` and the `ser`/`estar` MEANING pairs — `es listo` beside
 * `está listo` — in M2, which is the honest sequel to L1-M2's split; the full four-cell agreement
 * grid plus `grande`→`gran` in M3; the `hay`/`está` division and the `usted` imperative in M4;
 * clitic pronouns and `para` in M5; the `nosotros` cell, the clock and the arrangement-present in
 * M6; the gerund in M7, because a call is happening NOW and `Te llamo` finally pays off L1-M1's
 * decision to index `Me llamo` whole; `doler` and `tener que` in M8, where `gustar` stops being a
 * quirk and becomes a CLASS; the comparatives in M9; and in M10 the one thing an account cannot
 * dodge — the division of labour between the preterite and the imperfect, whose endings L1-M5
 * already taught and whose USE it deliberately did not. Bounds climb 8 → 10 (M1–M3: 8, M4–M7: 9,
 * M8–M10: 10), pools are authored to 12, M1–M3 ship fully enriched (validator law, any level),
 * and M10's items are four-sentence accounts.
 *
 * ## en-ar L2: the decisions, taken against the finished L1 (#427)
 *
 * Planned against the REAL cumulative L1 index — **287 surfaces through L1-M10, maxSpan 3**,
 * rebuilt and read — and against the spoken pass (`docs/42`). Recorded in
 * `docs/54-en-ar-L2-brief-decisions.md` and repeated in the module notes, because a prompt only
 * ever shows an author the notes.
 *
 * ### 1. MSA stays, and the dialect question is finally answered — PROSE ONLY
 *
 * The variety decision (#198) is not reopened: L2 is spoken-simple MSA, pause forms, no case
 * endings, no passive, no `lam`/`laysa` beyond the one cell M7 is given below. What L2 must
 * settle is the pressure L1 never felt, because L1 never made a phone call or sat at a table: at
 * those two moments the MSA line is understood everywhere and said by nobody. `al-ḥāfila` is the
 * bus in every Arabic newspaper and `al-bāṣ` is the bus every passenger says; `hal turīd
 * al-mazīd?` is correct and stiff where a host says something shorter. **The rule: a dialect form
 * may be NAMED in `usage` prose, in words, and may never appear in `display`, in `script`, in
 * `forms`, or in a pool item.** It is the L1 rule ("where the MSA form sounds formal in the
 * street, `usage` says so in words") applied to the two modules that make it bite, and it keeps
 * the index — which is what `script` and `forms` feed — monolingual in MSA. M4, M5 and M7 each
 * carry one such line and no more; a module that needed a second would be teaching the wrong
 * variety.
 *
 * ### 2. Register — en-ar has no `tú`/`usted` split, and that is the decision
 *
 * Every other L2 in this repo spends its M1 on an address contrast. Arabic's second person forks
 * by GENDER, not by politeness — `anta`/`anti`, `ismuka`/`ismuki`, `ḥāluka`/`ḥāluki` — and L1
 * taught that fork from M1 onward, so there is no `tú`/`usted` decision to take. What replaces it
 * is a much narrower one: MSA is ALREADY the formal register of the language, so the chip (#422)
 * marks only the ceremonial end — `law samaḥta`, `tafaḍḍal`, `as-salāmu ʿalaykum`,
 * `shukran jazīlan` chip `formal`; everything else stays `neutral`; and **`informal` is unused in
 * this course**, because the forms that would earn it are the dialect forms decision 1 keeps out
 * of `display`. Say that in the notes rather than leaving a later author to wonder whether the
 * value was forgotten. The gendered pair, meanwhile, is a rest point by now: every request in M1
 * is authored `-ka`/`-ki`, and the learner has done this since L1-M1.
 *
 * ### 3. Agreement at length — three laws, all cutting against English, all stated TRUE
 *
 * "Agreement at length" is M3's job line, and Arabic's version of it is the most counter-intuitive
 * grammar in any course here. The briefs state each law in full because each has a memorable false
 * version an author will otherwise reach for:
 *
 * - **A plural of NON-HUMAN things takes feminine SINGULAR agreement** — `al-kutub jamīla`, "the
 *   books, she is beautiful"; `as-sayyārāt kabīra`. Only human plurals take plural adjectives
 *   (`al-mudarrisūn mashghūlūn`). The slogan to kill is the silent one: "plural noun, plural
 *   adjective", which is English's law and is wrong in Arabic more often than it is right.
 * - **A verb placed BEFORE its subject stays singular** — `dhahaba al-awlād ilā as-sūq`, never
 *   `*dhahabū al-awlād`; it agrees in gender only. M10 owns this one, because a four-sentence
 *   account with named people cannot dodge verb-first order the way L1's pronoun subjects did.
 * - **The `afʿal` comparative is invariable** — `hiya akbar min ukhtihā`, no feminine, no plural,
 *   after nine modules in which every adjective bent. M9 owns it.
 *
 * ### 4. Seams — the hyphen laws carry, and L2 adds four collisions of its own
 *
 * `surfaceIndexKeys` still indexes a hyphenated surface AND each hyphen part, first occurrence
 * winning, so the L1 clitic owners stand: `al` (M1), `bi` (M2), `sa` (M6), `li` (M9), and the
 * multi-token saves (`ṣabāḥ al-khayr`, `min faḍlika`) keep their bare words free. L2's own:
 *
 * - **`min` is "than".** The comparative's "than" is spelled exactly like L1-M1's "from", whose
 *   row owns the key forever. M9 therefore points back and opens no row, and M1's chain is worth
 *   seeing whole: L1-M8 indexed `min faḍlika` as a phrase precisely so that `min` stayed L1-M1's,
 *   and now a third job arrives on the same note.
 * - **`man` is not `min`.** "Who" and "from" differ by one short vowel, and short vowels are
 *   always written (the romanization contract) — so they are two keys only as long as no author
 *   gets lazy. M7 opens `man` and its note names the collision.
 * - **`afʿal` is a PATTERN, not a meaning.** M3's colours are `aḥmar`, `azraq`, `aswad` and M9's
 *   comparatives are `akbar`, `arkhaṣ`, `aghlā` — the same shape, and `aḥmar` is not "redder".
 *   M9's rule says the root decides, so that M3's colours do not retroactively become
 *   comparatives in a learner's head.
 * - **`laysa` enters at M7, as ONE frozen cell.** L1 banned it, and rightly; but a phone call's
 *   whole business is absence, `lā` cannot negate a nominal sentence, and `huwa ghayr mawjūd` is
 *   an evasion. So M7 gets `laysa`/`laysat` in the third person only, taught as vocabulary with
 *   its conjugation named as L3's. This is the one L1 prohibition L2 lifts, and it is lifted
 *   narrowly and on the record.
 *
 * ### Why the en-ar L2 ladder teaches what it teaches
 *
 * The jobs are levels.json's, mirrored verbatim; the brief adds which English→Arabic delta each
 * job carries, sequenced so each pressure point lands where its job needs it: the imperative and
 * its prosthetic vowel in M1 (`tadhhab` → `idhhab`, and initial hamza stays unwritten, so the
 * romanization contract does the work); the third-person free pronouns `huwa`/`hiya` and the
 * `-hā` suffix in M2, which L1 never needed because a verb prefix carried the person; the three
 * plural systems and the definiteness rule that turns `al-bayt al-kabīr` (a phrase) into
 * `al-bayt kabīr` (a sentence) in M3; the imperative on motion verbs and `ʿalā al-yamīn` in M4;
 * `tafaḍḍal` — one word for five English hosting acts — in M5; the ordinal clock (`as-sāʿa
 * al-khāmisa`) and `an` + verb in M6; `man`, `laysa` and `ālū` in M7; `ʿindī` doing its third job
 * (`ʿindī ṣudāʿ`) in M8; `afʿal` and `min` in M9; and in M10 the perfect as the narrative tense,
 * `kāna` + imperfect for the background, and verb-first order with its singular agreement. Kept
 * deliberately OUT of L2 and named where it would be reached for: the full case system, the
 * passive, `lam` and `laysa` beyond M7's cell, `qad`, the jussive, the dual beyond L1-M8's
 * counted pair and M3's recognition row, and broken plurals as a derivational SYSTEM — they stay
 * vocabulary, listed in the `forms` of the row that teaches the singular. Bounds climb 8 → 10
 * (M1–M3: 8, M4–M7: 9, M8–M10: 10), pools are authored to 12, M1–M3 ship fully enriched, and
 * M10's items are four-sentence accounts with every person suffix written in full.
 *
 * ## hi-en L2: the decisions, taken against the finished L1 (#428)
 *
 * Planned against the REAL cumulative L1 index — **259 surfaces through L1-M10, maxSpan 3**,
 * rebuilt and read — and against the spoken-English pass (`docs/39`), which is what put `I'm` into
 * M1 and moved M6's plans onto `be + -ing`. Recorded in `docs/55-hi-en-L2-brief-decisions.md` and
 * repeated in the module notes. **The four L1 decisions carry unchanged** — Hindi in every
 * teaching field and no `glossEn`; contractions as single index surfaces; multi-token surfaces
 * keeping bare words free; first-occurrence-wins homograph owners — and M1's first note and M10's
 * last say so, because a level that quietly forked them would fork the course.
 *
 * ### 1. Register in English is WORDS, not forms — and the Indian-English line is drawn in `usage`
 *
 * This is the decision hi-en's L2 exists to make, and it is the mirror image of hi-mr's. Hindi
 * grades a request three ways in the VERB — दे · दो · दीजिए — on top of तू / तुम / आप. English has
 * one `you`, one imperative, and buys the whole scale with words and with sentence SHAPE:
 *
 *     Give me the book. → Please give me the book. → Can you give me the book?
 *       → Could you give me the book? → Would you mind giving me the book?
 *
 * The law, stated in M1 and true everywhere: **English politeness comes from turning the request
 * into a question and from making it longer; the verb never changes.** A learner who maps दीजिए
 * onto an imperative-plus-`please` produces `Do it, please` — grammatical, and blunt. The chip
 * (#422) carries the tiers now: the bare imperative among friends chips `informal`, the
 * `please` / `Can you` tier `neutral`, and `Could you` / `Would you mind` chip `formal`.
 *
 * The harder half is that this course's learner speaks a real, widely-spoken variety whose
 * politeness formulas differ from the international-neutral English the course teaches: `kindly do
 * the needful`, `please revert`, `I am having a doubt`, `isn't it?` as a universal tag. These are
 * not errors in Indian English and the course must not call them errors. **The rule: an
 * Indian-English form may be NAMED in `usage` prose, in words, and never appears in `display`, in
 * `forms` or in a pool item** — the same shape as en-ar's dialect rule, for the same reason. M1
 * carries the `kindly` line and M7 the `isn't it?` line; no other module needs one.
 *
 * ### 2. Contractions — a correction, and the owners L2 actually adds
 *
 * The commissioning issue lists `won't` and `we'll` among the contractions L2 must own. The index
 * says they are already **L1-M6's**, along with `I'll`, `you'll`, `he'll`, `she'll` and `they'll`
 * — as `wasn't`/`weren't` are L1-M1's, `don't` M3's, `doesn't` M4's, `didn't` M5's, `it's`/`there's`
 * /`where's` M7's, `isn't`/`aren't` M9's and `that's` M10's. Rule 1 applies to a brief's premises,
 * so the list is corrected rather than copied. What L2 genuinely adds, one row each with BOTH
 * shapes in `forms` and never a pre-listed sibling: **`can't`** (M1), **`I'd`** (M5), **`let's`**
 * (M6), **`you'd`** (M6), **`haven't`** and **`hasn't`** (M8), **`shouldn't`** (M8),
 * **`wouldn't`** (M9). Straight `'` only, as in L1.
 *
 * ### 3. The possessive `'s` — L1 banned it, M2 opens it, and it is a separate word to the index
 *
 * L1's decision 2 ends "no possessive `'s` in L1: `Rohan's` would be a fresh surface needing its
 * own row, and no L1 job needs one". M2's job needs one — relationships are what it is for — so
 * the ban lifts there, on the record, with the consequence stated in the note: `brother` and
 * `brother's` are two index keys, so the possessive is deconstructed on its own row pointing back
 * at the bare noun, and a proper-noun possessive (`Rohan's`) never indexes at all (#61). The
 * collision to name in the same breath is that `'s` is also `is` and `has` — `he's` is L1-M6's and
 * `he's got` is L1-M10's — so a learner meets three different `'s` and needs one note that admits it.
 *
 * ### 4. What L2 withholds, and the one prohibition it lifts
 *
 * Kept out and named in the module that would reach for it: **reported speech** (L3-M5 per
 * `content/hi-en/levels.json`), which is why M7 takes a message with `Can I take a message?` and
 * not with `He said that…`; the **past perfect** and **`used to`** (L3), so M10's account runs on
 * the past simple and the past continuous alone; the **passive**; **relative clauses**; and
 * **conditionals** beyond the frozen `Would you mind`.
 *
 * The prohibition L2 lifts is the **present perfect**, at M8 and nowhere else. A problem report is
 * where English speakers actually use it — `I've lost my key`, `The bus hasn't come` — and the
 * simple past is a poor substitute for a present result. It is lifted narrowly: the
 * present-result use only, with the verbs the course already owns, and the law that makes it
 * teachable stated true — **the present perfect is about NOW, so it can never carry a finished
 * time expression** (`I've lost it yesterday` is the error, not a stylistic slip). Its experience
 * and duration uses (`I've been to Delhi`, `I've lived here for a year`) are named as L3's.
 * The slogan to kill is "the present perfect is for the recent past": recency has nothing to do
 * with it, which is why `I've lost my key` holds whether the key went missing a minute or a month ago.
 *
 * ### Why the hi-en L2 ladder teaches what it teaches
 *
 * The jobs are levels.json's, mirrored verbatim; the brief adds which Hindi→English delta each job
 * carries. The politeness ladder in M1, because a request is the first place one `you` has to do
 * three Hindi jobs; the NON-agreement of adjectives and the stative-verb rule (`He is having brown
 * eyes` is the marker to spend a mistake on) in M2; countable versus uncountable in M3, which is
 * where "agreement at length" actually bites in English — Hindi counts सामान and English cannot
 * count `luggage`; phrasal verbs and the zero article of `by bus` and `go to school` in M4; the
 * offer frame `Would you like…?` in M5, where `Do you want…?` is grammatical and blunt; the
 * suggestion frames and the `at`/`on`/`in` fork of time in M6, where Hindi has one postposition;
 * tag questions in M7, whose mirrored auxiliary is the whole point and whose Indian-English
 * universal `isn't it?` is named in prose; the present perfect and indirect complaint in M8; the
 * comparative and the `than`/`then` pair in M9; and the past continuous as background against the
 * past simple in M10, plus the sequencers an account needs. Bounds climb 8 → 10 (M1–M3: 8, M4–M7:
 * 9, M8–M10: 10), pools are authored to 12, M1–M3 ship fully enriched, and M10's items are
 * four-sentence accounts.
 *
 * ## en-ru L2: the decisions, taken against the finished L1 (#429)
 *
 * Planned against the REAL cumulative L1 index — **228 surfaces through L1-M10, maxSpan 3**,
 * rebuilt and read. Recorded in `docs/56-en-ru-L2-brief-decisions.md` and repeated in the module
 * notes. The seven L1 decisions carry unchanged: the romanization scheme, **a stress mark on
 * every polysyllable** (monosyllables take none), `ё` written `yó` in `display` and `ё` in
 * `script` with `е` never merging into it, one row per noun carrying its case shapes in `forms`,
 * and aspect pairs kept on separate rows.
 *
 * ### 1. The cases — which enter where, and the one that does not
 *
 * L1 held to nominative and accusative plus two seats it could not avoid: the prepositional after
 * `v`/`na` (M7 — `Moskvé`, `kómnate`, `rabóte`, `stolé`) and the genitive after numbers and `u`
 * (M4, M8 — `chasá`, `rubléy`, `u menyá`). L2 finishes the four cases the ten jobs need, each in
 * the module whose job cannot be done without it:
 *
 * - **Dative at M1**, because a request has a recipient: `Dáyte mne…`, `Skazhíte mne…`. `mne`
 *   (L1-M1) and `vam` (L1-M2) are already keys, so what M1 adds is the dative of a NOUN and, more
 *   importantly, the **dative-subject frame** — `Mne núzhno`, `Mne mózhno` — a sentence with no
 *   subject at all, which L1-M9's `Mne nrávitsya` used without naming.
 * - **Genitive at M3**, in the two jobs that make it unavoidable: `net` + genitive for absence
 *   (`Zdes' net magazína` — again no subject) and the genitive of quantity (`mnógo vodý`,
 *   `nemnógo sákhara`), which gives L1-M6's `mnógo` and L1-M10's `nemnógo` the complement they
 *   were always missing.
 * - **Accusative of motion at M4**: `v magazín` (going) against L1-M7's `v magazíne` (being). For
 *   an inanimate masculine noun the accusative IS the nominative, so this costs no new key at all
 *   — the contrast is taught in a rule and in the feminine shapes (`v Moskvú`), and M4 points back
 *   at L1-M7's `v` and `na` rows rather than re-opening them.
 * - **Genitive of comparison at M9**: `Moskvá ból'she Peterbúrga`. It is what a Russian says, it
 *   is shorter than the alternative, and it spends the case M3 already taught instead of opening a
 *   conjunction. `chem` is named in `usage` as the always-available alternative and as the
 *   REQUIRED one when the two compared things are not both bare nouns.
 *
 * **The instrumental stays OUT of L2**, and M4 is where the decision is taken and stated: Russian
 * says both `na avtóbuse` and `avtóbusom` for "by bus", and this course teaches `na avtóbuse` —
 * one preposition and one case the learner already owns from `na rabóte`, doing a new job — rather
 * than opening a fifth case for a single frame. `peshkóm` ("on foot") comes in as a WORD, with a
 * usage line saying it is a frozen instrumental and not a pattern to copy. The instrumental proper
 * is L3's.
 *
 * ### 2. Aspect — at M1 in the imperative, at M10 in the narrative
 *
 * L1 shipped perfective and imperfective partners as separate rows without ever teaching the
 * choice (`chitát'`/`prochitál`, `pozvonyú`, `kuplyú`/`kupíl`, `napishú`/`napisál`). L2 teaches it
 * twice, in the two places it decides what a sentence means:
 *
 * - **M1, the imperative.** `Skazhíte` (perfective — do this one thing) against `Govoríte`
 *   (imperfective — proceed, keep going, this is how it is done). The half a learner cannot guess
 *   is that a HOST uses the imperfective — `Sadítes'`, `Prokhodíte`, `Ugoshcháytes'` — and that
 *   the perfective in the same seat lands as an order. M5 spends this in the field and points back.
 * - **M10, the narrative.** The perfective moves the account forward one completed whole at a
 *   time; the imperfective paints the standing situation, the habit, the activity named for its
 *   own sake. The slogan to kill is the one en-es's M10 kills in Spanish — "perfective is
 *   completed, imperfective is ongoing" — and it is false the same way: `Ya dva chasá chitál` is
 *   bounded and imperfective, `Ya prochitál za dva chasá` is perfective, and what differs is how
 *   the clause is being USED, not how long the reading took. The fact that makes aspect visible is
 *   already in the learner's hands: **the perfective has no present tense**, which is why L1-M6's
 *   `napishú` and `pozvonyú` are futures.
 *
 * ### 3. Register — `vy` stays the default, `ty` enters at M6, and the switch is an EVENT
 *
 * L1's decision 2 stands: `vy` is the course-wide default and `ty` appeared in no L1 display. M6
 * is where it enters, because plans are made with friends, and it costs a real spend — `ty`,
 * `tebyá`, `tebé`, the `-esh'`/`-ish'` second-singular of every verb the course owns, and the
 * singular imperative (`skazhí`, `day`, `pozvoní`). The chip (#422) maps as: `ty` frames chip
 * `informal`, the elaborated request (`Bud'te dobrý`, `Vy ne mózhete…?`) chips `formal`, and plain
 * `vy` to a stranger stays **`neutral`** — it is the unmarked default of this language, not a
 * politeness tier, and chipping it `formal` would make eight modules formal and say nothing. The
 * fact English has no equivalent of, and which belongs in `usage` rather than in a rule: in
 * Russian the move from `vy` to `ty` is NEGOTIATED out loud (`Davay na ty`), so a learner does not
 * drift into it.
 *
 * ### 4. Forms and seams — L2 never edits an L1 file, and five collisions have owners
 *
 * A new case shape of an L1 noun is deconstructed in the L2 module that first shows it, on its own
 * row pointing back at the first-teach row, because the bare word's key is L1's forever and L2
 * never edits an L1 file. Within L2 the L1 policy holds: one noun, one row, every case shape this
 * LEVEL shows in its `forms`, and an aspect partner never on the same row. The collisions:
 *
 * - **`net` has two jobs** — "no" (L1-M2) and "there isn't" + genitive (M3). L1-M2's row owns the
 *   key, so M3 points back and writes its rule around it; the same row then answers for M7's
 *   `Yevó net dóma`.
 * - **`yevó` and `yeyó` each carry two jobs** — "his/her" and "him/her" — because Russian's
 *   genitive and accusative pronouns are the possessives. One row each (M2), note true of both.
 * - **`n-` after a preposition**: `u nevó`, not `*u yevó`. A spelling rule with index consequences
 *   — `nevó` and `yevó` are two keys — so both are authored on M2's rows and the note says why.
 * - **`éhto` is not `éhtot`.** L1-M1 owns `éhto` ("this is", the pointing sentence); M9's `éhtot`
 *   / `éhta` / `éhti` ("this + noun") is a different word that declines, and merging them would put
 *   every choice in the course on a note about identification.
 * - **`lúchshe` serves two positives** — `khoroshó` (L1-M2, well) and `khoróshiy` (good) — exactly
 *   as `mejor` does in en-es. M9 owns it and says so.
 *
 * ### Why the en-ru L2 ladder teaches what it teaches
 *
 * The jobs are levels.json's, mirrored verbatim. The imperative's aspect and the dative-subject
 * frame in M1, because a request is addressed and Russian addresses it without a subject; the long
 * adjective and the third-person pronouns in M2, where L1's short-form `ustál` finally gets its
 * partner; the full agreement grid and the genitive of absence in M3; the accusative/prepositional
 * motion contrast and the determinate motion verbs `idtí` / `yékhat'` in M4 — with the
 * indeterminate `khodít'` / `yézdit'` named and deferred, because one trip is all a direction needs;
 * the imperfective host imperative in M5; `ty` and `Davay poydyóm` in M6; the genitive of absence
 * turned on a person (`Yevó net`) in M7; `Mne núzhen` / `nuzhná` / `núzhno` agreeing with the thing
 * NEEDED and `U menyá bolít golová` in M8, which is where Russian's habit of putting the person in
 * an oblique case stops being a curiosity and becomes the way the language works; the comparative
 * and its genitive in M9; and aspect at length in M10. Kept OUT and named where it would be
 * reached for: the instrumental, the conditional `by`, reflexive verbs as a system (L1-M9's
 * `nrávitsya` and M10's `vernúlsya` ride as vocabulary), participles, prefixed motion verbs beyond
 * L1's `po-`/`pri-`, and numbers above a hundred. Bounds climb 8 → 10 (M1–M3: 8, M4–M7: 9,
 * M8–M10: 10), pools are authored to 12, M1–M3 ship fully enriched, and M10's items are
 * four-sentence accounts.
 *
 * ## en-it L2: the decisions, taken against the finished L1 (#430)
 *
 * Planned against the REAL cumulative L1 index — **263 surfaces through L1-M10, maxSpan 3**,
 * rebuilt and read. Recorded in `docs/57-en-it-L2-brief-decisions.md` and repeated in the module
 * notes. The five L1 decisions carry unchanged: the elision apostrophe stays INSIDE a token, so
 * `l'acqua` and `c'è` are single keys answering for nothing else; accents are letters; multi-token
 * surfaces keep bare words free; and every homograph has a named owner.
 *
 * ### 1. `Lei` — the forms enter at M1, the PRONOUN does not, and the index is why
 *
 * The L1 header promised `Lei` to L2, and the issue that commissioned these briefs asked for "the
 * capital-L spelling". The index refuses it, and this was checked against the real function rather
 * than assumed: `normalizeSurface('Lei') === 'lei'` — rule 4 lowercases without a locale — and
 * **`lei` is already L1-M10's key, where it means "she"**. First occurrence wins, so no L2 row can
 * ever take it back, and a display `Lei` would send every polite sentence in the course to a note
 * about the third person feminine. This is en-de's `Sie`/`sie` catastrophe, arriving in Italian.
 *
 * The answer is not a workaround, it is the idiomatic form: **the polite address is taught as a
 * VERB CHOICE, and the pronoun `Lei` appears in no L2 `display`.** Italian is pro-drop and the
 * polite pronoun is normally omitted anyway — `Come sta?`, `Vuole un caffè?`, `Scusi, dov'è la
 * stazione?` are what people actually say — so the course loses nothing and gains a rule that is
 * true: *politeness in Italian is carried by the third-person verb, not by a pronoun the speaker
 * usually leaves out.* `Lei` is NAMED in `usage` prose, in words, with its capital, exactly as
 * en-ar names a dialect form. The same reasoning bars the polite object clitics `La` and `Le`:
 * both fold onto L1-M1's ARTICLES.
 *
 * Which modules speak it: M4 (asking the way), M7 (the phone) and M8 (a problem with staff or a
 * stranger) are third-person throughout and chip `formal` (#422); M6's plans are `tu` and chip
 * `informal`; M1 shows the pair side by side; M2, M3, M5 and M9 follow the scene and say which in
 * `usage`. The paradigm the address needs is mostly already the learner's — `è`, `vuole`, `ha`,
 * `va`, `fa`, `prende`, `esce` are all L1 rows — so M1's real spend is `sta`, `può`, and the
 * frozen politeness cells `potrebbe` / `potresti`.
 *
 * ### 2. The formal imperative is the congiuntivo, and L2 ships the words without the system
 *
 * `Scusi`, `Senta`, `Giri`, `Prenda`, `Vada` are the forms M1 and M4 need, and they are — exactly
 * — present subjunctive forms. The congiuntivo as a SYSTEM is L3-M3/M4's per
 * `content/en-it/levels.json` and stays out. So these enter as **frozen politeness words**, taught
 * one by one, with a note saying plainly that L3 will show them again as a paradigm. Shipping the
 * word while deferring the system is the same move en-ar makes with `laysa` and en-es with
 * `vorrei`'s conditional; hiding the connection would leave L3 re-teaching a form the learner has
 * been saying for ten modules.
 *
 * ### 3. Clitics — `lo`, `li`, `mi`, `ti` only, and the articles are the reason
 *
 * `la`, `le`, `i` and `gli` are L1-M1's ARTICLES; the direct-object pronouns spelled identically
 * can therefore never be first-taught. `lo` and `li` are free (L1 only ever indexed `l'italiano`,
 * `il`, `la`, `le`, `i`, `gli`), and `mi` and `ti` are free because L1 indexed `mi chiamo`,
 * `mi piace`, `mi alzo`, `ti chiami` and `ti alzi` WHOLE. So M5 teaches the clitic system on
 * `lo`, `li`, `mi` and `ti`, names `la`/`le` as objects in prose, and leaves them to L3. This is
 * the same ruling en-es takes for the same reason, in the same level — the two Romance courses
 * agree because the same tool made the same trap.
 *
 * The one genuinely Italian addition: a clitic ATTACHES to an infinitive as one word — `aiutarmi`,
 * `lasciarlo` — which the index sees as a single fresh key, not as `aiutare` + `mi`. M8 owns
 * `aiutarmi` and its note says so.
 *
 * ### 4. What L2 withholds, and what M10 finally teaches
 *
 * Out, and named where it would be reached for: the **congiuntivo** as a system (L3-M3/M4); the
 * **conditional** as a system — `vorrei` is L1-M3's frozen row and M1 adds `potrebbe`/`potresti`
 * as two more frozen cells, nothing more; **`ne`** and the combined clitics; the **passato
 * remoto**; the **trapassato**; and **`la`/`le` as objects** (decision 3).
 *
 * M10's own decision is the one L1 set up and could not take: L1-M5 shipped the passato prossimo
 * with BOTH auxiliaries and with participle agreement (`ho mangiato`, `sono andata`, `siamo
 * andati`) and never taught the choice against the **imperfetto**, which L2 opens here. The law:
 * the imperfetto paints the standing situation, the habit, the age, the weather; the passato
 * prossimo moves the account forward one completed step. The slogan to kill is the one en-es and
 * en-ru kill in their own M10s — "one is for completed actions, the other for ongoing ones" —
 * false the same way, and the three courses should say so in the same words. The auxiliary rule
 * gets stated at last too: `essere` for movement and change of state and for reflexives, with the
 * participle agreeing with the SUBJECT; `avere` for everything else, with no agreement.
 *
 * ### Why the en-it L2 ladder teaches what it teaches
 *
 * The jobs are levels.json's, mirrored verbatim. The polite verb and Italian's three-way split of
 * English "sorry" — `Scusi` / `Mi dispiace` / `Permesso` — in M1; `avere` for features, `stare`
 * against `essere`, and the article that stays on a possessive (`il mio libro`) but vanishes
 * before a singular family member (`mio fratello`) in M2; the four-cell grid plus the invariable
 * colours (`blu`, `rosa`, `viola`) and the `-co` plurals that fork (`bianchi` against `amici`) in
 * M3; the frozen formal imperatives and `in autobus` in M4; the partitive `del`/`della` and the
 * clitics in M5; the `noi` cell and `Ci vediamo` in M6; `Pronto?` and `stare` + gerundio in M7;
 * `Mi fa male` and `aiutarmi` in M8; `più … di` against `più … che` — the distinction Italian
 * forces and English does not have — plus `migliore` against `meglio` in M9; and the imperfetto
 * in M10. Bounds climb 8 → 10 (M1–M3: 8, M4–M7: 9, M8–M10: 10), pools are authored to 12, M1–M3
 * ship fully enriched, and M10's items are four-sentence accounts.
 *
 * ## en-fr L2: the decisions, taken against the finished L1 (#431)
 *
 * Planned against the REAL cumulative L1 index — **175 surfaces through L1-M10, maxSpan 4** (the
 * widest span in the repo, and it is `à côté de la`), rebuilt and read. Recorded in
 * `docs/58-en-fr-L2-brief-decisions.md` and repeated in the module notes. The L1 decisions carry
 * unchanged: elision keeps the apostrophe INSIDE a token (`j'ai`, `c'est`, `l'eau` are single
 * keys), accents are letters and capitals keep them, questions are intonation and fronted question
 * words, and every homograph has a named owner.
 *
 * ### 1. Register — `tu` enters at M1, as a paradigm, and the switch has a VERB
 *
 * L1's decision 1 was explicit: every second-person line is `vous`, `tu` and its forms stay out of
 * `display` and out of every `forms` list, and M2's notes name `tu` in prose as what a later level
 * owes the learner. This is that level. M1 opens the whole paradigm — `tu es`, `tu as`, `tu veux`,
 * `tu peux`, `tu vas`, `tu fais`, `tu te lèves`, `s'il te plaît` — and the law is the one L1
 * recorded: `vous` is never wrong with a stranger, a shopkeeper, an official or a new colleague;
 * `tu` is for friends, family, children, and people who have offered it.
 *
 * The fact English has no equivalent of, and it belongs in `usage` rather than in a rule: French
 * has VERBS for this — `tutoyer` and `vouvoyer` — and the switch is asked for out loud (`On peut
 * se tutoyer?`), the way Russian asks `Davay na ty`. A learner who knows only that `tu` is
 * "informal" will switch too early. Which module speaks which: M4 (the street), M7 (the phone) and
 * M8 (staff and strangers) are `vous` throughout; M6's plans are `tu`; M1 shows the pair; M2, M3,
 * M5 and M9 follow the scene and say which in `usage`. The chip (#422), whose `formal` value L1's
 * own decision anticipated: `tu` frames chip `informal`, `vous` plus the elaborated request
 * (`Pourriez-vous…?` is L3's, so here it is `Est-ce que vous pouvez…?` and `je voudrais`) chips
 * `formal`, and a line safe with either stays `neutral`.
 *
 * **`je voudrais` enters at M1**, and only as a frozen cell. L1 kept it out by name — "it is the
 * conditional of `vouloir`, a whole tense spent on politeness the course already buys with `s'il
 * vous plaît`" — and the ordering job at M5 needs it. So it arrives as ONE word with a note saying
 * what tense it belongs to and that the tense itself is **L3-M4's**. Nothing else conditional
 * appears in L2; `pourriez` and `j'aimerais` are named and not written.
 *
 * ### 2. The negated partitive — the rule L1 set up perfectly and could not state
 *
 * L1-M3 taught `du`, `de la` and `des` and L1-M3 taught `ne … pas`, and it never put them in the
 * same sentence. M5 does: **after a negation every partitive collapses to `de`** — `Je ne veux pas
 * de café`, `Il n'y a pas de pain` — which is one of the few French rules with no exceptions worth
 * teaching a learner, and which produces `*Je ne veux pas du café` in every English speaker who
 * has not been told. It is M5's headline and it costs one new key.
 *
 * ### 3. Clitics — `me`, `te`, `moi`, `toi` only, because `le`/`la`/`les` are L1-M1's ARTICLES
 *
 * The third time this repo takes the same ruling in the same level: en-es on `lo`/`me`/`te`, en-it
 * on `lo`/`li`/`mi`/`ti`, and now en-fr. `le`, `la` and `les` are L1-M1's articles and first
 * occurrence wins, so the identically-spelled object pronouns can never be first-taught. M5
 * teaches the system on `me` and `te` and on the stressed `moi` / `toi` (`Pour moi, un café`), and
 * names the direct-object series as L3's. `en` and `y` as PRONOUNS are deferred too, and for a
 * second reason: `en` is M4's preposition (`en bus`, `en France`), so the pronoun would land on a
 * note about transport.
 *
 * The French addition, mirroring en-it's `aiutarmi`: elision fuses a clitic to what follows, so
 * `m'aider` is ONE key rather than `me` + `aider`. M8 owns it and its note says where the `me`
 * went.
 *
 * ### 4. `ne` is written, and the spoken drop is named in prose
 *
 * Real spoken French drops `ne` — `Il est pas là`, `Je sais pas` — and this course writes it, in
 * every `display`, every `forms` entry and every pool item. The reason is the index rather than
 * prescription: a course that wrote both would fork `n'est pas` and `est pas` into two surfaces
 * for one negation, and a learner tapping either would get half the rule. **One `usage` line at
 * M7 names the drop**, because a phone call is where the learner will first hear it, and no other
 * module carries one. Same shape as en-ar's dialect rule and hi-en's Indian-English rule; the
 * three courses should read alike.
 *
 * ### 5. What L2 withholds, and what M10 finally teaches
 *
 * Out, named where it would be reached for: the **subjunctive** (`il faut que` — M4 ships `il
 * faut` + infinitive as a frozen impersonal and stops there); the **conditional** as a system
 * (L3-M4, with `je voudrais` the single frozen exception); the **plus-que-parfait**; **reported
 * speech**; **object `le`/`la`/`les`, `en` and `y`**; and the **full inversion system** — `est-ce
 * que` is the everyday question marker this level teaches, and inversion appears only inside the
 * frozen request frames.
 *
 * M10 takes the decision L1 set up: L1-M5 shipped the passé composé with BOTH auxiliaries and with
 * participle agreement (`je suis allée`, `elle est restée`) and never taught the choice against the
 * **imparfait**, which opens here. The imparfait paints the standing situation; the passé composé
 * moves the account one completed step. It is the same law and the same dead slogan as en-es's,
 * en-ru's and en-it's M10 — "one is for completed actions, the other for ongoing ones" — and the
 * four courses say it in the same words. The auxiliary law is stated at last: `être` for the
 * movement and change-of-state verbs and for reflexives, with the participle agreeing with the
 * SUBJECT; `avoir` for everything else, with no agreement.
 *
 * ### Why the en-fr L2 ladder teaches what it teaches
 *
 * The jobs are levels.json's, mirrored verbatim. `tu` as a paradigm and `est-ce que` in M1;
 * `avoir` for age and features and the possessive that agrees with the THING (`sa voiture` is his
 * or her car alike) in M2; the four-cell grid, the BAGS adjectives that precede, and their
 * pre-vowel shapes (`un bel appartement`) in M3; `à` / `en` / `au` for places and `en bus` against
 * `à pied` for transport in M4, with `il faut` as a frozen impersonal; the negated partitive and
 * the clitics in M5; `on` as the everyday "we" in M6 — the single most useful thing in the level —
 * ; `Allô` and the absence of any continuous tense in M7; `avoir mal à` and `m'aider` in M8;
 * `meilleur` against `mieux` in M9, which is Italian's split rather than Spanish's merge; and the
 * imparfait in M10. Bounds climb 8 → 10 (M1–M3: 8, M4–M7: 9, M8–M10: 10), pools are authored to
 * 12, M1–M3 ship fully enriched, and M10's items are four-sentence accounts.
 *
 * ## en-de L2: the decisions, taken against the finished L1 (#432)
 *
 * Planned against the REAL cumulative L1 index — **203 surfaces through L1-M10, maxSpan 3**,
 * rebuilt and read. Recorded in `docs/59-en-de-L2-brief-decisions.md` and repeated in the module
 * notes. The seven L1 decisions carry unchanged, and decision 2 — the case fold meeting German
 * capitalisation — governs this level more than any other.
 *
 * ### 1. Register — `du` enters at M1, and the paradigm is the price
 *
 * The commissioning issue says "`Sie` enters at M1"; L1's decision 3 says every second-person line
 * in L1 was already `Sie`, and the index agrees (`sie`, `Ihnen`, `Ihr`, `sind`, `möchten` are all
 * L1-M2's and L1-M3's). So the address that enters here is **`du`**, exactly as en-fr's L2 opens
 * `tu` and en-ru's opens `ty`. Briefs rule 1 applies to a brief's premises, so the premise is
 * corrected rather than copied.
 *
 * It is the most expensive register decision in the repo, and L1 said why in advance: `Sie` takes
 * the plural verb, so its form is spelled exactly like the infinitive and cost the index nothing,
 * while `du` costs a whole second set of endings (`bist`, `hast`, `kannst`, `möchtest`,
 * `sprichst`), its own imperative (`komm`, `geh`, `gib`, `hilf`), and `dein` / `dich` / `dir`. M1
 * pays all of it. The law is L1's: `Sie` is never wrong with a shopkeeper, an official, a landlord
 * or a colleague; `du` is for friends, family, children and anyone who has offered it, and in
 * German the offer is made out loud (`Wollen wir uns duzen?`) — the same negotiated switch en-fr
 * and en-ru describe. Which module speaks which: M4, M7 and M8 are `Sie` throughout and chip
 * `formal`; M6's plans are `du` and chip `informal`; M1 shows the pair; the rest follow the scene
 * and say which in `usage`.
 *
 * ### 2. `sie` — the owner was decided in L1, and L2 inherits rather than decides
 *
 * The issue says the `Sie`/`sie` collision is "now live … owner decided here". It was decided in
 * L1: decision 2 gave the key to **L1-M2**, as ONE entry with THREE readings, with the note
 * already written true of all three and the separating rule stated (the verb form, and in writing
 * the capital: `sie ist` she, `sie sind` they, `Sie sind` you). So M2 of this level uses `sie` for
 * "she" and "they" and **opens no rival row** — it points back, and the L1 note it points at was
 * written for exactly this moment.
 *
 * What IS decided here is the consequence L1 created by exclusion. L1 kept `ihnen` ("to them") and
 * the possessive `ihr` ("her") out so that `Ihnen` and `Ihr` would each own a clean key — and M2's
 * job is relationships, which wants "her brother". The ruling: **the possessive "her" is taught on
 * `ihre` alone** (feminine and plural, a key nothing else holds), and where a masculine or neuter
 * possession is needed the sentence takes the `von` periphrasis — `der Bruder von Anna` — which is
 * ordinary spoken German, not a workaround. Bare `ihr` is never authored as a possessive, and
 * `ihnen` stays out of L2 entirely; both are named in prose and left to L3.
 *
 * ### 3. Attributive adjective endings are DEFERRED, and "agreement at length" is the article grid
 *
 * German's attributive adjective takes one of three declensions depending on what stands in front
 * of it (`ein guter Mann`, `der gute Mann`, `guter Wein`), and no honest brief can fit that into a
 * module whose neighbours are teaching colours. So **every adjective in en-de L2 is PREDICATIVE** —
 * after `sein`, where it takes no ending at all (`Das Auto ist rot`, `Berlin ist größer als
 * München`) — and the attributive declension is named in M3's notes as L3's.
 *
 * That is not a hole in M3, it is a relocation: German's agreement lives in the ARTICLE, and M3's
 * job line ("agreement at length") is spent on the case grid L1 half-built — `der` / `die` / `das`
 * against `den` / `die` / `das` against `dem` / `der` / `dem`, with `ein`, `einen`, `einem` and
 * `kein` beside them. L1 shipped `der`, `die`, `das`, `den`, `dem`, `ein`, `eine`, `einen`,
 * `kein`, `keine` and `keinen` without ever laying them out; this is where the grid is assembled,
 * and it is what lets M4 teach a two-way preposition and M8 teach a dative verb.
 *
 * ### 4. Separable verbs stay UNSPLIT in L2 — the modal bracket does the work
 *
 * L1's decision 4 named the hazard: a separated prefix at the end of a clause is spelled exactly
 * like a preposition or an article, so `Ich steige ein` puts `ein` on L1-M1's INDEFINITE ARTICLE
 * row and `Ich rufe Sie an` needs an `an` that M4 also wants as a preposition. The ruling that
 * removes the problem for a whole level: **a separable verb appears in L2 only in its unsplit
 * forms** — the infinitive after a modal (`Sie müssen hier einsteigen`, `Ich möchte Sie anrufen`)
 * and the participle in the Perfekt (`Ich habe angerufen`) — and never in a split main clause. The
 * split is named in M4's notes and deferred to L3.
 *
 * This costs nothing, because M1's whole lesson is the modal bracket, so every L2 sentence that
 * wants a separable verb already has a modal in it. `an` is then free for M4 to own as a
 * preposition, with one note true of the preposition and of the prefix it will later become.
 *
 * ### 5. Which past — the Perfekt, except for the three that resist it
 *
 * M10's decision, and it is the true description of spoken German rather than a simplification:
 * **the Perfekt is the spoken past for nearly every verb**, with `haben` or `sein` in position two
 * and the participle at the very end — the bracket again — and **`sein`, `haben` and the modals
 * prefer the Präteritum** (`war`, `hatte`, `konnte`), which is why L1-M5 shipped `war`, `waren`,
 * `hatte` and `hatten` and no participle for either. `sein` as an auxiliary goes with movement and
 * change of state (`gegangen`, `gefahren`, `gekommen`, `geblieben`, and `aufgestanden`, which
 * L1-M4 already shipped); `haben` takes the rest. And the relief worth naming out loud: unlike the
 * three Romance courses in this repo, **the German participle never agrees with anything**.
 *
 * Konjunktiv II stays L3-M4's, with exactly one frozen exception: `könnten` in M1's most polite
 * request, taught as a word with its mood named — the same treatment `je voudrais` gets in en-fr
 * and `vorrei` in en-it.
 *
 * ### Why the en-de L2 ladder teaches what it teaches
 *
 * The jobs are levels.json's, mirrored verbatim. The `du` paradigm and the modal bracket in M1 —
 * German's signature word order, and the frame every later module borrows; `sie` doing its other
 * two readings and `haben` for features in M2; the article grid across three cases in M3; the
 * two-way prepositions (`ins Kino` against `im Kino`, both of which L1-M7 shipped as contractions
 * without the rule) and unsplit separable verbs in M4; the dative of the recipient and `das Essen`
 * landing on L1-M3's `essen` row in M5; `halb neun` meaning half past EIGHT and the verb-second
 * inversion after a fronted time in M6; answering the phone with a surname and `Auf Wiederhören`
 * in M7, plus the fact German shares with French and not with Italian — no continuous tense at
 * all; the dative verbs (`helfen`, `gefallen`) and the `nicht` / `kein` rule L1 shipped both
 * halves of in M8; `-er … als`, `am -sten` and `lieber` as the way German says "prefer" in M9; and
 * the Perfekt at length in M10. Bounds climb 8 → 10 (M1–M3: 8, M4–M7: 9, M8–M10: 10), pools are
 * authored to 12, M1–M3 ship fully enriched, and M10's items are four-sentence accounts in the
 * Perfekt.
 *
 * ## en-ko L2: the decisions, taken against the finished L1 (#433)
 *
 * Planned against the REAL cumulative L1 index — **185 surfaces through L1-M10, maxSpan 2**,
 * rebuilt and read. Recorded in `docs/60-en-ko-L2-brief-decisions.md` and repeated in the module
 * notes. The eight L1 decisions carry unchanged: Revised Romanization transcribing pronunciation,
 * pure ASCII, no stress marks ever, the particle hyphen with the host keeping its isolation shape,
 * `jeo` never `na`, and Hangul confined to `script`.
 *
 * ### 1. The speech level meets the honorifics — `-yo` stays, `-si-` becomes productive
 *
 * L1's decision 3 settled the speech level course-wide: this course speaks the `-yo` style, the
 * plain style is never written, and the formal `-mnida` style appears in exactly two frozen
 * phrases (`gamsahamnida`, `mannaseo bangapseumnida`) taught as fixed units. Nothing there is
 * reopened. What L2 must add is the OTHER axis, which L1 could only gesture at: the honorific
 * `-si-`, which raises the SUBJECT rather than the listener, and which L1 shipped inside five
 * whole phrases — `annyeonghaseyo`, `juseyo`, `gaseyo`, `gyeseyo`, `jinaeseyo` — with the
 * productive rule named as deferred.
 *
 * **M1 makes it productive.** `-(eu)seyo` is `-si-` plus `-eoyo`, and once a learner can build it
 * they can be polite to anyone about anyone: `anjeuseyo`, `gidaryeojuseyo`, `malsseumhaseyo`. Two
 * consequences the briefs state rather than discover. Some verbs do not take the infix at all and
 * have a **separate honorific word** — `meokda` → `deusida`, `itda` → `gyesida`, `jada` →
 * `jumusida`, `malhada` → `malsseumhasida` — and those are four vocabulary rows, not a rule (M5
 * and M7 spend them, and L1-M2's `gyeseyo` is already one of them, which the notes point back at).
 * And the honorific is about the person the sentence is ABOUT, so a learner never uses it of
 * themselves: `jeo-neun gayo`, never `*jeo-neun gaseyo`. That is the module's mistake block.
 *
 * The chip (#422): a line whose SUBJECT is honoured chips `formal`, plain `-yo` stays `neutral`,
 * and **`informal` is never used in en-ko L2**, because the forms that would earn it are `banmal`
 * — the plain style L1 banned and this level does not lift. Say so in a note, so a value missing
 * on purpose reads as deliberate. `-(seu)pnida` likewise stays named-in-`usage` only; `content/
 * en-ko/levels.json` puts "Official talk" at L4-M7, and that is where it is heard.
 *
 * ### 2. What L1 deferred, and which of it L2 collects
 *
 * L1's header listed what it withheld. L2 takes exactly three of them and leaves the rest:
 *
 * - **`-go isseoyo`, the progressive, opens at M7** — a phone call is happening NOW, which is the
 *   same argument hi-mr's M7 makes for `-toy` and en-it's for `stare` + gerundio. It is also the
 *   one place the three courses agree while en-fr and en-de have no progressive at all.
 * - **`mot`, the inability negative, opens at M8** — a problem report is where "can't" is needed,
 *   and the law is a clean pair with L1-M3's `an`: `an` is don't or won't, `mot` is can't.
 * - **`-(eu)llae-yo`, the invitation ending, opens at M6** — plans are what it is for.
 *
 * Left deferred and named where they would be reached for: `-gess-` as a future (M6 uses L1-M6's
 * `-l geoyeyo` and opens no second one); the long negative `-ji anayo`; the plain style entirely;
 * `-(eu)psida`, which belongs to the `-mnida` level and travels with it; reported speech `-dago`;
 * `-deon`; and the double past `-eoss-eoss-`.
 *
 * ### 3. "Agreement at length" in a language with no agreement — M3 teaches the particles
 *
 * Korean marks no gender, no number and no article, so M3's job line cannot mean what it means in
 * the Romance courses. What Korean marks instead is ROLE, on the particle, and L1 shipped every
 * one of them — `-i/-ga`, `-eun/-neun`, `-eul/-reul`, `-do`, `-e`, `-eseo` — across six modules
 * without ever laying them side by side. M3 assembles the grid and teaches the one distinction L1
 * could only gesture at: **topic `-eun/-neun` against subject `-i/-ga`**, which is the hardest
 * thing in beginner Korean and the thing no English sentence marks at all.
 *
 * The second half of M3 is the attributive: a descriptive verb becomes a modifier with `-(eu)n`
 * (`keun jip`, `joeun chingu`), which is how Korean does the job English gives an adjective. M2
 * opens it and M3 walks it, and between them they replace the four-cell grid the other courses
 * spend M3 on. The slogan to refuse is "Korean has no plurals": it has `-deul`, it simply does not
 * require it, and the true rule is that number is optional and marked only when it matters.
 *
 * ### 4. Two number systems, one rule, stated at M5
 *
 * L1-M8 shipped native numbers with counters (`han jan`, `du gae`, `se myeong`) and Sino numbers
 * for money (`ocheon won`, `samcheon won`) and never said which is which. **M5 states it: native
 * numbers count things with a counter, Sino numbers do money, minutes, dates and anything above
 * ninety-nine** — and M6 immediately spends it on the clock, where the fork is at its most visible
 * and most useful: the hour is native (`du si`) and the minutes are Sino (`samsip bun`), in one
 * breath. A learner who has been saying both since L1-M8 without knowing why gets the rule that
 * explains what they already have, which is worth more than three that only add.
 *
 * ### 5. The seams — the particle hyphen holds, and the Hangul line is still unbundled
 *
 * `surfaceIndexKeys` indexes a hyphenated surface AND each part, so `chaek-eul` keeps `chaek` free
 * and every new particle joins that way. L2's own: `-ro/-euro` (M4, direction), `-boda` (M9,
 * comparison), `-kkaji` (M4), `-hago` (M9), `-eoya` (M8). The homograph owners L1 set stand — `i`
 * is M1's subject particle and the demonstrative stays hyphenated as `i-geo`, `cha` is tea and the
 * car word stays out, `mal` is "word" — and L2 adds two: `deo` is M5's ("more", in an offer) and
 * M9's comparative points back at it rather than opening a row; `bae` stays out as a fruit so that
 * M5's `bae bulleoyo` ("full") can use the belly reading.
 *
 * The Hangul `script` line still renders from a system face and bundles no font: `tools/font-
 * subset.ts` cannot subset `@fontsource/noto-sans-kr`, which splits Korean across ~120 numbered
 * range files per weight. That is #382, it is unchanged by this level, and it is recorded here so
 * that nobody reads the absence of a font change as an oversight.
 *
 * ### Why the en-ko L2 ladder teaches what it teaches
 *
 * The jobs are levels.json's, mirrored verbatim. The productive `-(eu)seyo` and the `-a/eo juseyo`
 * request in M1; the double-subject sentence (`jeo-neun ki-ga keoyo`) and the four-way sibling
 * split — Korean has no word for "older brother" that does not encode the speaker's own gender —
 * in M2; the particle grid and the attributive `-(eu)n` in M3; `-ro` and `-reul tada` in M4, where
 * riding a bus takes an object particle rather than a preposition; the two number systems and the
 * honorific `deusida` in M5; `-(eu)llae-yo` and the native/Sino clock in M6; `yeoboseyo` — an
 * honorific imperative of "to look", M1's rule visible in one word — and `-go isseoyo` in M7;
 * `mot` and `-eoya dwaeyo` in M8; `-boda`, which puts the standard BEFORE the adjective, in M9;
 * and the account in M10, whose real lesson is that Korean drops every subject after the topic is
 * set — a zero anaphora far stronger than Spanish's pro-drop. Bounds climb 8 → 10 (M1–M3: 8,
 * M4–M7: 9, M8–M10: 10) — higher than L1's 4 → 7, because a request and an account need the
 * adverbials L1 could do without — pools are authored to 12, M1–M3 ship fully enriched, and M10's
 * items are four-sentence accounts in `-eoss-`.
 *
 */

/** PRD §5 module budget: at most 25 new words per module, every course, every level. */
export const NEW_WORD_CAP = 25;

export interface ModuleBrief {
  id: string;
  /** Mirrors levels.json. */
  title: string;
  /** Mirrors levels.json. */
  job: string;
  /** Allowed sentence patterns, in the course's own notation — becomes `allowedPatterns`. */
  patterns: string[];
  /** Authoring guidance beyond the job: what to teach, where the L1 helps or misleads. */
  notes: string[];
  maxWordsPerSentence: number;
  newWordCap: number;
}

/** courseId → moduleId → brief. */
export const COURSE_BRIEFS: Readonly<Record<string, Readonly<Record<string, ModuleBrief>>>> = {
  'hi-mr': {
    'L1-M1': {
      id: 'L1-M1',
      title: 'Who I am',
      job: 'Introduce yourself and state your likes',
      patterns: ['मी + N/Adj + आहे', 'माझा/माझी/माझं + N + N + आहे', 'मला + N + आवड-'],
      notes: [
        'The copula आहे covers both हूँ and है; it changes with person (आहे · आहेस · आहात), never with gender.',
        'Possessives agree with the gender of the thing possessed — माझा (m) · माझी (f) · माझं (n). Hindi has no neuter, so माझं has no Hindi twin: tag it interference.',
        'Liking: मला + thing + आवड-; the thing liked is the grammatical subject, so the verb ending follows it (आवडतो · आवडते · आवडतं).',
        'Spoken register (2026-09-05, docs/40): the self-introduction is what an Indian in Maharashtra actually says — मी स्टुडंट आहे (विद्यार्थी a form), मी हिंदी बोलतो (no आहे; -तो/-ते follows the speaker), माझी मातृभाषा हिंदी आहे — not माझा देश भारत आहे. The like is मला गाणी आवडतात (plural आवडतात), not संगीत.',
      ],
      maxWordsPerSentence: 5,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M2': {
      id: 'L1-M2',
      title: 'First exchange',
      job: 'Greetings, wellbeing, yes/no questions',
      patterns: [
        'तू/तुम्ही + N/Adj + आहेस/आहात',
        'मी + बरा/बरी + आहे',
        'तुझा/तुझी/तुझं + N + काय + आहे',
        '<statement> + का',
        'हो/नाही + <statement>',
      ],
      notes: [
        'A yes/no question is the plain statement plus का at the very end — Hindi fronts क्या, Marathi moves nothing.',
        'Two words for "you": तू (informal, takes आहेस) and तुम्ही (polite/plural, takes आहात).',
        'One-word answers हो / नाही; नाही also carries "नहीं है" — no आहे after it.',
        'काय ("what") is one letter from का (question marker) — call the difference out.',
      ],
      maxWordsPerSentence: 5,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M3': {
      id: 'L1-M3',
      title: 'Needs and wants',
      job: "Say what you want and don't want",
      patterns: ['मला + N + हवा/हवी/हवं (आहे)', 'मला + N + नको (आहे)', 'मला + V-आयचं आहे'],
      notes: [
        'Wanting is dative, exactly like liking in M1: मला + thing + हवा-. The thing wanted is the subject, so हवा · हवी · हवं agrees with IT — Hindi "मुझे … चाहिए" never inflects, so the agreement is the trap.',
        'Refusing: नको replaces हवा- wholesale ("नहीं चाहिए" in one word) and needs no नाही.',
        'Wanting TO DO something: मला + V-आयचं आहे (मला चहा प्यायचा आहे) — the -आयच- form agrees with the object.',
      ],
      maxWordsPerSentence: 6,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M4': {
      id: 'L1-M4',
      title: 'My day',
      job: 'Daily habits and time words',
      patterns: ['मी + time + V-तो/-ते', 'मी रोज + N + V-तो/-ते', 'तू कधी + V-तोस/-तेस'],
      notes: [
        'Habitual present: the verb ends -तो (m) / -ते (f) / -तात (pl) — the SPEAKER\'s gender shows on every habit verb, where Hindi "मैं … करता/करती हूँ" needs an auxiliary and Marathi does not: no separate आहे.',
        'Time words carry the module: रोज, सकाळी, दुपारी, संध्याकाळी, रात्री, कधी, and मग — the everyday "then" (2026-09-05, docs/40: मग मी कामाला जातो replaced नंतर मी काम करतो; नंतर stays a form on the मग row).',
        'Keep every sentence a daily habit — no past, no future, no requests.',
      ],
      maxWordsPerSentence: 6,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M5': {
      id: 'L1-M5',
      title: 'Yesterday',
      job: 'Past tense — the big gender zone',
      patterns: [
        'मी काल + N + V-ला/-ली/-लं',
        'मी काल + V-लो/-ले',
        'तू काल + V-लास/-लीस',
        '<past statement> + का',
      ],
      notes: [
        'THE richest interference zone of the whole course: with a transitive verb the past ending follows the OBJECT, never the speaker — मी भात खाल्ला (m) · मी कॉफी प्यायली (f) · मी पाणी प्यायलं (n). Hindi "मैंने … खाया/पी" agrees too, but the ने-construction is gone: मी and तू never take ने, so *मीने does not exist. Tag these interference and spend the mistakes here.',
        'Intransitive past agrees with the subject: मी गेलो (m) · मी गेले (f).',
        "काल anchors every sentence in yesterday; recycle M4's daily-routine verbs in the past.",
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M6': {
      id: 'L1-M6',
      title: 'Tomorrow',
      job: 'Future and plans',
      patterns: ['मी उद्या + V-णार आहे', 'मी + V-ईन', 'तू + V-णार का'],
      notes: [
        'Two futures: the plan (V-णार आहे — "going to", the everyday one) and the plain future (V-ईन) — lead with -णार, it does the daily work.',
        '-णार itself never changes for gender: उद्या मी जाणार आहे works for every speaker — a rest point after M5, say so.',
        'उद्या anchors the module; questions are just the statement + का, as taught in M2.',
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M7': {
      id: 'L1-M7',
      title: 'Where things are',
      job: 'Locations and postpositions',
      patterns: ['N + N-त/-वर/-खाली/-जवळ + आहे', 'N कुठे आहे', 'N-त/-वर + N + आहे'],
      notes: [
        'Location suffixes GLUE onto the noun and the noun changes shape (the oblique): घर → घरात, टेबल → टेबलावर — Hindi keeps में/पर as separate words, so the fused form is the delta to drill.',
        'Core set: -त (in), -वर (on), -खाली (under), -जवळ (near), -समोर (in front of).',
        'कुठे asks "where" and sits where the answer will sit, exactly as काय did in M2.',
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M8': {
      id: 'L1-M8',
      title: 'Numbers & shopping',
      job: 'Prices, quantities, buying',
      patterns: ['हे/ही + कितीला + आहे', 'मला + qty + N + द्या', 'N + num + रुपये + आहे'],
      notes: [
        'Asking a price: कितीला ("for how much") — किती + the dative -ला the learner has carried since मला. हे कितीला आहे? is the module\'s anchor sentence.',
        'Numbers: teach the ones the sentences actually use (दोन, पाच, दहा, वीस, पन्नास, शंभर…) as vocabulary, not a counting drill.',
        'Polite imperative द्या ("दीजिए") for buying; quantities like किलो / अर्धा किलो ride along as nouns.',
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M9': {
      id: 'L1-M9',
      title: 'Feelings & opinions',
      job: 'Why — because and so',
      patterns: [
        '<statement> कारण <statement>',
        '<statement>, म्हणून <statement>',
        'मला + N + आवडतं कारण …',
      ],
      notes: [
        'The pair that carries the module: कारण ("because" — the reason follows it) and म्हणून ("so/therefore" — the consequence follows it). Same facts, opposite order: build sentence pairs that show both.',
        'Hindi क्योंकि/इसलिए map cleanly (delta, not interference) — the work is choosing the right one, so make the comprehension pool test that choice.',
        'Feelings vocabulary (मजा, राग, कंटाळा…) rides the dative frame from M1/M3: मला कंटाळा आला. 2026-09-05 (docs/40): आनंद झाला was retired as wedding-speech register — the everyday line is मला खूप मजा आली (मजा f → आली); a कारण/म्हणून sentence must give a reason that holds (मला कॉफी आवडत नाही, म्हणून मी चहा पितो), never a mirrored preference.',
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M10': {
      id: 'L1-M10',
      title: 'Connected talk',
      job: 'Short 2–3 sentence exchanges',
      patterns: ['<M1–M9 pattern> + <M1–M9 pattern>', '<question> → <answer + reason>'],
      notes: [
        'Each item is a TURN of 2–3 short sentences, not one long one — a question and its answer, or a statement, a reason and a follow-up. The per-sentence bound applies to each sentence inside the turn.',
        "Recombination is the lesson: nearly everything should come from M1–M9's vocabulary and patterns; spend new words only where a turn genuinely needs one.",
        'Keep turns everyday and symmetric: greeting → wellbeing → plan; want → reason → buy.',
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M1': {
      id: 'L2-M1',
      title: 'Asking politely',
      job: 'Requests, thanks, apologies in the right register',
      patterns: [
        'जरा/कृपया + N + द्या/करा',
        'मला + N + द्याल का?',
        'तू: दे · कर · ये — तुम्ही: द्या · करा · या',
        'माफ करा, <statement>',
        'धन्यवाद · आभारी आहे',
      ],
      notes: [
        'REGISTER, decided for the whole level and repeated here because the prompt only ever shows an author the notes (the full decision record is docs/26-hi-mr-L2-brief-decisions.md; language of fields is unchanged from L1 — rules[].text and word note in English, every learner-facing line in Hindi in Devanagari, glossEn on every sentence): L1 taught तू as the everyday default (docs/08 Q16); this module teaches WHEN. The law: तू for a friend or family your own age or younger, तुम्ही for elders, strangers and counters. Author the same request in both registers side by side and let the chip carry the law now that #422 has widened it: तू lines chip `informal`, the तुम्ही + -आ frames and the कृपया / आभारी आहे end chip `formal`, and a line that is safe with anyone stays `neutral`. The usage line says WHO the frame is for; it no longer has to smuggle the tier in words.',
        "The imperative pair is the grammar of the module: informal = the bare stem (दे · कर · ये — L1 never taught दे: docs/15 recorded that debt on M10's द्या row, and it is paid here), polite = stem + -आ (द्या · करा · या · बसा; vowel stems contract, देणे → द्या). Hindi climbs three steps — दे → दो → दीजिए — and Marathi has TWO: there is no -इए tier, and reaching for one (*द्याजी, *करिये) is the Hindi habit to star. Politeness above तुम्ही + -आ goes into words (जरा, कृपया) or the future question, never into a new verb form.",
        'THE interference of the module, and the course\'s best false friend: Hindi आप does not map to आपण. आपण looks like आप and is the course\'s "we" — L1-M10\'s row, whose note teaches the inclusive/exclusive split — so *आपण द्या meant as "आप दीजिए" misfires twice. The polite "you" is तुम्ही (M2\'s row, आहात and all). आपण as a very formal "you" (आपण कुठे राहता?) is real Marathi — docs/08 open question 17 — but stays OUT of L2 displays; a usage line may name it. Tag the reach interference and spend a mistake on it.',
        'The softeners: जरा ("just / a moment\'s worth" — जरा पाणी द्या is the everyday please), कृपया (formal please — notice-board and announcement register; say so in usage), and the polite-future question मला … द्याल का? ("will you give?" — the तुम्ही cell of देणे\'s future, Hindi देंगे क्या?). A request shaped as a question is a move Hindi and Marathi share — transfer — so the work is the new cell द्याल, not the idea.',
        'Apology and thanks: माफ करा ("sorry / excuse me" — माफ is the new word, करा is this module\'s polite imperative doing real work: write the करा row\'s note true of माफ करा and of कृपया मदत करा — M8\'s help line — alike); धन्यवाद is a FRESH key here since 2026-09-05 (docs/40: L1-M2 no longer says मी बरी आहे, धन्यवाद — the spoken answer hands the question back, and everyday thanks is थँक्यू, which a usage line should name); आभारी आहे ("[I] am grateful" — the formal Pune thanks, आहे recycled from L1-M1) as the register step above it.',
        "INDEX SEAM: दे, करा, या, बसा, द्याल, माफ, जरा, कृपया, आभारी are fresh keys; द्या stays L1-M8's row (a re-teach here — its note is already polite). या is taught as \"come (polite)\" AND as the invite particle a verb's -ऊ cell takes — जाऊ या, M6's frame — ONE row, note true of both jobs now (the hi-en do-row precedent), or M6's suggestions land on a \"come\" note that is false of them. बसा's row lists no informal partner: the bare stem बस is spelled exactly like the vehicle M4 teaches, and forms entries become index keys — the बस key stays the vehicle's.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M2': {
      id: 'L2-M2',
      title: 'Describing people',
      job: 'Appearance, character, relationships',
      patterns: [
        'तो/ती/ते + Adj/N + आहे/आहेत',
        'ती कोण आहे? — ती माझी + N + आहे',
        'हा/ही माझा/माझी + N + आहे',
        'माझ्या + N-oblique-चं + नाव + <name> + आहे',
      ],
      notes: [
        'तो · ती · ते — the he/she split Hindi\'s one वह never makes, and THE interference of the module: वह serves a man and a woman alike, Marathi forks तो (he / that-m) · ती (she / that-f) · ते (it / that-n), and picking तो for a woman is the mistake to spend on. L1 dodged pronouns entirely — docs/19 open question 40 shows रोहन repeated because L1 taught no तो; the debt is paid here. The same three words also POINT — ते पुस्तक "that book" — the far twins of L1-M8\'s हा/ही/हे, and M3 will lean on that job: write each note true of both.',
        "आहेत — the plural and respect copula L1 kept out (docs/19 call 4): ते माझे आईवडील आहेत. The respect-plural is Hindi's own habit (पिताजी हैं → वडील … आहेत): transfer, a rest point — say so. In real family speech वडील rides the respect-plural (ते) while आई stays singular-intimate (ती माझी आई) — an honest asymmetry worth one usage line, not a rule.",
        "The family set carries the module: भाऊ, बहीण, आई, वडील, मुलगा, मुलगी, मित्र, मैत्रीण — and मोठा/लहान do double duty exactly as Hindi's बड़ा/छोटा: elder AND big (मोठा भाऊ = बड़ा भाई). One row each, the note true of both jobs, because M3 inherits these keys for size.",
        'Person-adjectives split by ending, previewing M3\'s law: उंच, लहान, हुशार end in a consonant and never bend; चांगला bends (चांगला मुलगा · चांगली मुलगी). And the one genuinely Hindi-less person: मूल ("child") is NEUTER — हे मूल हुशार आहे — a person in the gender Hindi does not have, L1-M1\'s माझं interference with a face. Tag it.',
        "The genitive, ONE frame only: माझ्या भावाचं नाव रोहन आहे — Hindi's का/की/के fused onto the owner (भाई का → भावाचं), agreeing with the thing OWNED exactly as का does: the rule transfers; the fusion and the oblique bend (भाऊ → भावा-, माझा → माझ्या) are the delta, the same bend the learner met in घरात/टेबलावर (L1-M7). Keep it to this frame — the genitive as a system is L3's — and note that a proper-noun owner (रोहनचं) never indexes (#61), so the taught row is the common-noun one (भावाचं).",
        "INDEX SEAM: तो, ती, ते, आहेत, कोण, माझ्या, भावाचं and the family nouns are fresh keys. कोण asks who and sits where the answer sits (ती कोण आहे? — the काय/कुठे law of L1-M2/M7); M7's phone opener recycles it, and M9's कोणता (\"which\") is its sibling key — cross-reference, do not merge. माझ्या and भावाचं are new SHAPES of L1 words: per the level's forms policy (docs/26) they are deconstructed here, their notes pointing back to L1-M1's माझा and this module's भाऊ — no L1 file is edited.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M3': {
      id: 'L2-M3',
      title: 'Describing things',
      job: 'Size, colour, quality — adjective agreement at length',
      patterns: [
        'हा/ही/हे + N + Adj + आहे',
        'ते/ती + N-pl + Adj-pl + आहेत',
        'मला + Adj + N + हवा/हवी/हवं',
        'हा N + Adj आहे, तो + Adj आहे',
      ],
      notes: [
        'The law, and it is Hindi\'s own law: adjectives ending in -आ bend, everything else stands still — मोठा bends, लाल / स्वस्त / सुंदर / उंच never do, exactly as बड़ा bends and लाल does not. TRANSFER; say so, a rest point. Then the delta — WHICH endings. Singular: -ा (m) · -ी (f) · -ं (n, the spoken house style: मोठं, not मोठे — docs/08 Q15). Plural: -े (m) · -्या (f) · -ी (n). "At length" is the job: this module walks the whole grid where L1 only flashed corners of it (बरा/बरी, अर्धा/अर्धी/अर्धं).',
        "THE interference, spend the mistakes here: the feminine plural. Hindi's -ी serves one and many (बड़ी पिशवी, बड़ी पिशवियाँ); Marathi bends it to -्या — मोठी पिशवी but मोठ्या पिशव्या — so *मोठी पिशव्या is the Hindi-shaped error. And the neuter plural -ी looks exactly like the feminine singular: मोठी खोली (one big room, f) beside मोठी घरं (big houses, n-pl) — the same मोठी, two jobs. Show the pair.",
        "Noun plurals ride the same seam, and L1-M8 already seeded both precedents in its forms lists: रुपया → रुपये (m) and केळं → केळी (n). The new plural shapes of L1 nouns — घरं, खोल्या, पिशव्या, पुस्तकं, बाटल्या — are deconstructed HERE, each row pointing back to its L1 first-teach (forms policy, docs/26): the bare word's key stays where L1 put it.",
        'Colours are the vocabulary spend, and they rehearse the split: काळा, पांढरा, निळा, हिरवा, नवा, जुना bend; लाल stands still (Hindi agrees with itself here — लाल is invariable in both languages). स्वस्त ("cheap", invariable) arrives as महाग\'s partner — L1-M8\'s महाग recycled into contrast pairs: ही भाजी स्वस्त आहे, ती महाग आहे.',
        "Quality verdicts recycle the course's own words attributively — छान (L1-M9), महाग (L1-M8), बरा (L1-M2) — and the want-frame from L1-M3 turns description into choosing: मला मोठी पिशवी हवी. The comprehension pool's job is the grid: same noun, wrong ending, which line is right.",
        "INDEX SEAM: every bent shape is a fresh single-token key. Within the level, a first-teach adjective row lists the shapes the LEVEL shows (मोठा's row was opened by M2 — its forms carry the six cells this module needs; the paradigm has ONE home, docs/15's discipline). हा/ही/हे stay L1-M8's rows and तो/ती/ते stay M2's — this module re-teaches the pointing pair and owns neither.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M4': {
      id: 'L2-M4',
      title: 'Getting around',
      job: 'Directions, transport, asking the way',
      patterns: [
        'N-ला कसं जायचं?',
        'डावीकडे/उजवीकडे वळा · सरळ जा',
        'मी N-ने जातो/जाते',
        'N कुठे आहे? — इथे/तिथे आहे',
        'जरा सांगा, …?',
      ],
      notes: [
        'The place -ला, glued: स्टेशनला जा, दुकानाला जा — going TO a place takes -ला on the noun, with the same oblique bend the learner owns from L1-M7 (दुकान → दुकाना-, the घरात/दुकानात law pointed at a new suffix). THE interference: Hindi goes bare (स्टेशन जाओ), so *स्टेशन जा is the Hindi-shaped miss — star it and spend a mistake. घरी (L1-M5) is the one exception already taught: home takes -ई, not -ला.',
        'The instrumental -ने: बसने, रिक्षाने, गाडीने — "by bus", Hindi\'s free-standing से glued on (बस से → बसने), so *बससे is the shape to star. Tag delta, and keep the note to "by/with": -ने has a second job in the past that M10 owns — do not open it here.',
        'Directions are the vocabulary spend: डावीकडे / उजवीकडे (the -कडे "toward" side-words), सरळ ("straight" — an invariable doing adverb work), पुढे / मागे, इथे / तिथे (Hindi यहाँ/वहाँ), and the imperative pair from M1 on the road verbs: वळा ("turn", वळणे), थांबा ("stop/wait", थांबणे), जा (everyday Marathi says जा to तू and तुम्ही alike — the one road verb where the registers share a shape; say so). This module talks to strangers: तुम्ही frames throughout, the register law of M1 in the field.',
        "कसं जायचं? — \"how does one get there\": the -आयचं frame from L1-M3 (प्यायचा's family) pointed at a new job, impersonal and everyday, neuter default कसं (L1-M2's कसा row lists it). जायचं is a new shape of an L1 lexeme — its row points back to जाणे's family (L1-M6's जाणार, docs/26 forms policy). Asking is M1's kit recycled: जरा सांगा, स्टेशनला कसं जायचं? — सांगणे (\"tell\") opens here as the ask-the-way verb; M7 reuses it for messages.",
        "Transport nouns: बस, रिक्षा, गाडी (the everyday word for a car and a train alike — the cue says which the sentence means), स्टेशन. INDEX SEAM: the बस key stays the vehicle's — Marathi's own \"sit!\" (the informal of M1's बसा) is spelled the same, which is exactly why M1's बसा row lists no bare stem; a usage line may name the coincidence, display never shows sit-बस. Proper place-names (पुणे, पुण्याला, मुंबई) ride as unindexed proper nouns (#61, the प्रिया precedent) — anchor every indexed direction on a common noun (स्टेशनला, दुकानाला, बागेत).",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M5': {
      id: 'L2-M5',
      title: 'Food and hosting',
      job: 'Ordering, offering, refusing without offence',
      patterns: [
        'मला + N + मिळेल का?',
        'आणखी + N + घ्या',
        'तुम्हाला + N + हवा/हवी/हवं का?',
        'नको, धन्यवाद · पुरे',
        'जेवायला या',
        'num + N-pl + द्या',
      ],
      notes: [
        'Ordering without ordering anyone around: चहा मिळेल का? — मिळणे ("get / be available") in its -ईल cell (L1-M6\'s खाईल family), the Hindi मिलेगा? frame — transfer of the move, so the work is the verb. Write मिळणे\'s note true of its HALF of Hindi\'s मिलना only: get/receive/be-available. The other half — find-after-searching — is सापडणे, M8\'s row; a note here that claims "find" poisons that seam (docs/26).',
        'The host\'s script: घ्या ("take / have some" — घेणे\'s polite imperative by M1\'s law, Hindi लीजिए), आणखी ("more" — आणखी भात घ्या; Hindi और → आणखी, and Hindi\'s other और, "and", is L1-M2\'s आणि: one Hindi word, two Marathi ones, the reverse of the usual trap), बसा recycled from M1, and the offer question in the तुम्ही register: तुम्हाला आणखी पोळी हवी का? — तुम्हाला is the तुम्ही dative the मला/तुला family lacked (new shape, row points back to L1-M2\'s तुम्ही).',
        'Refusing without offence IS the job title: नको does the heavy lifting (L1-M3\'s row — "नहीं चाहिए in one word"), softened by the words around it: नको, धन्यवाद (धन्यवाद is L2-M1\'s key since docs/40, not L1\'s) · आता नको ("not now", आता from L1-M3) · पुरे ("enough, I\'m done" — the table word; Hindi\'s बस्स → पुरे, and a Hindi speaker\'s "बस!" at a Marathi table is the sit/vehicle homograph, not "enough": one usage line, gently). पोट भरलं ("[my] stomach is full" — the idiom that ends the refusal dance: भरलं agrees with पोट, L1-M5\'s law in one polite sentence).',
        'The Marathi table: जेवणे — ONE verb for "eat a meal" where Hindi says खाना खाना: मी जेवलो/जेवले, and जेवलात का? ("have you eaten?" — the polite past -त cell from L1-M5\'s केलंत, THE Maharashtrian care-question). जेवण (the meal), पोळी (the everyday word where Hindi says रोटी — the word swap that marks a Pune table; delta), गोड ("sweet", invariable by M3\'s law — गोड आहे is the compliment). The invitation: जेवायला या — the purpose infinitive -आयला (Hindi खाने के लिए in one glued word) with M1\'s या doing its come-job.',
        "Counting the order pays docs/15 open question 28's debt: तीन, चार, पाच enter as rows (L1-M8 taught only the shop set — दोन, दहा, वीस, पन्नास, शंभर — and पाच stayed a pinned miss); चार पोळ्या द्या puts M3's feminine plural to work (पोळी → पोळ्या on one row). M6's clock takes the next instalment.",
        'INDEX SEAM: the -आयला frame is shown on जेवायला and खायला ONLY — प्यायला-as-purpose is spelled exactly like L1-M5\'s past प्यायला (मी चहा प्यायला), whose row owns the key forever: a purpose-प्यायला display would land the learner on "drank (m)", so write around it. मिळेल, घ्या, आणखी, पुरे, जेवायला, खायला, तुम्हाला, the जेवलो family, जेवण, पोळी, पोळ्या, गोड, पोट, भरलं, तीन, चार, पाच are fresh keys; द्या and नको stay L1\'s rows.',
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M6': {
      id: 'L2-M6',
      title: 'Making plans together',
      job: 'Invitations, suggestions, settling a time',
      patterns: [
        'V-ऊ या! (जाऊ या · भेटू या · करू या)',
        'तुला उद्या जमेल का?',
        'किती वाजता? — सात वाजता',
        'उद्या चालेल का? — चालेल!',
        'येणार का? / येशील का?',
      ],
      notes: [
        'The suggestion frame is the one loud thing: verb -ऊ + या = "let\'s —" (जाऊ या · भेटू या · करू या). The learner owns every piece — the -ऊ cells from L1 (जाऊ, येऊ, भेटू) and M1\'s या, whose note already carries this second job — so the lesson is assembly, not new forms. The pair to show: bare -ऊ का? asks (जाऊ का? — "shall we?"), -ऊ या proposes (जाऊ या — "let\'s"). Hindi folds both into चलें/करें; the two-word Marathi split is the delta, and करू (करणे\'s -ऊ cell) is the one new key the frame needs.',
        "जमणे — the can-make-it verb Hindi does not quite have: तुला उद्या जमेल का? · मला जमणार नाही, माफ करा — the dative frame the course has run on since L1-M1 (मला/तुला) with -ईल/-णार cells. Tag delta and let it carry the polite refusal: जमणार नाही is how a plan is declined without offence (M5's art, applied to time).",
        "चालेल — \"that works\": उद्या चालेल का? — चालेल! Hindi's चलेगा, twin for once — transfer — and the settling word of the module. Write चालणे's note true of the VERB, not just the idiom: M8 negates the same lexeme for things that do not work (चालत नाही), and that use inherits this row's story (docs/26 seam).",
        "The clock: किती वाजता? — सात वाजता (Hindi सात बजे → सात वाजता, the same वाज्/बज् root: delta of shape, not of idea; किती recycled from L1-M8). The clock numbers सहा, सात, आठ, नऊ join the counting set — docs/15 open question 28's second instalment, after M5's table — and दहा was L1-M8's. परवा (\"day after tomorrow\") joins उद्या if a sentence needs it.",
        "This module speaks तू — plans are among friends, the first sustained informal module after M1's law: येशील का? (the तू future cell L1-M6's forms listed but never showed — docs/15 open question 25 asked whether showing it helps or floods; here it earns its display), तुला जमेल का?, and the negative future -णार नाही, which L1 never wrote: नाही simply follows the -णार form, nothing new to conjugate — a rest point, say so. Chip the तू lines informal, honestly.",
        "INDEX SEAM: करू, जमेल, जमणार, चालेल, वाजता, सहा, सात, आठ, नऊ, परवा are fresh keys. जाऊ, येऊ, भेटू stay L1's rows (M6/M10) — the -ऊ या frame ADDS no key for या (M1's row answers, its note already true of the invite job) and re-teaches the cells it borrows. भेटू या is two taught words doing the module's title; the pool should test -ऊ का? against -ऊ या.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M7': {
      id: 'L2-M7',
      title: 'On the phone',
      job: 'Calls and messages — openings, closings, taking a message',
      patterns: [
        'हॅलो, कोण बोलतंय? — मी + <name> + बोलतोय/बोलतेय',
        'N + आहे का? — नाही, तो/ती + V-तोय/-तेय',
        'निरोप सांगू का?',
        'मी नंतर फोन करतो/करते',
        'मी फोन ठेवतो/ठेवते',
      ],
      notes: [
        'THE grammar of the module: the continuous -तोय / -तेय / -तंय — बोलत आहे said as one word (बोलतोय m · बोलतेय f · बोलतंय n), Marathi\'s "right now" tense, which L1-M4 deliberately fenced off ("keep every sentence a daily habit"). Hindi बोल रहा हूँ / रही हूँ → one glued form: the gender rides the ending exactly as रहा/रही carried it — transfer of the idea, delta of the shape. Display writes the spoken contraction (the house style that writes माझं, docs/08 Q15) and the row\'s forms list the full family INCLUDING the bare participle: बोलतोय · बोलतेय · बोलतंय · बोलत — so the formal two-word spelling बोलत आहे resolves word by word, बोलत to this row and आहे to L1-M1\'s (docs/26 forms policy; the hi-en don\'t · do not precedent).',
        "The opening script: हॅलो, कोण बोलतंय? — the unknown speaker gets the NEUTER (कोण recycled from M2): not rude, just unknown — say so, because Hindi's कौन बोल रहा है has no ungendered cell to reach for, and the Hindi speaker otherwise guesses a gender at a stranger. The answer names yourself: मी रोहन बोलतोय (the proper noun rides unindexed, #61). This module talks to strangers and elders: तुम्ही register, M1's law.",
        "Taking a message is the continuous at work: आई जेवतेय (\"she's eating\" — M5's जेवणे in the new tense) · वडील बोलतायत (the respect-plural cell; M2's आहेत logic on a verb) — and the offer rides M6's frame: निरोप सांगू का? (\"shall I pass on a message?\" — सांगणे from M4 in its -ऊ cell, निरोप the new noun). निरोप द्या recycles L1-M8's द्या.",
        'Closings are the habitual doing promise work: मी नंतर फोन करतो ("I\'ll call later") · मी फोन ठेवतो ("I\'m hanging up") — Marathi, like Hindi (रखता हूँ, करता हूँ), uses the present for the about-to: the -तो the learner has owned since L1-M4 in a new JOB, no new form. Delta of use, not of shape — say exactly that, it is the cheapest lesson in the level. ठेवणे ("put/keep") is the one new verb; फोन and नंतर are L1-M7/M4\'s rows.',
        "बोलणे itself is the debt this module pays: docs/15 open question 29 recorded that L1-M9's variation leaned on बोललो with the verb taught nowhere — one of the three pinned sweep misses. The lexeme's first rows open here. The pinned miss STANDS: a module's index is cumulative through itself, so L1-M9's reader still meets बोललो unresolved (the content-build test keeps pinning exactly that); what changes is that from this rung upward, बोल- surfaces resolve. State it precisely — additions-only, across levels.",
        "INDEX SEAM: हॅलो (one token — the ॅ is the English-vowel sign; hi-mr stays single-token even on the phone), बोलतोय-family, बोलत, निरोप, ठेवतो-family, सांगू, जेवतेय/जेवतोय, बोलतायत are fresh keys. कोण stays M2's row; फोन stays L1-M7's (its note is already the telephone). This is the level's rest module for vocabulary — the tense is the spend; say so and keep the word count low.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M8': {
      id: 'L2-M8',
      title: 'When something goes wrong',
      job: 'Problems, asking for help, complaining calmly',
      patterns: [
        'माझा/माझी/माझं + N + हरवला/हरवली/हरवलं',
        'N + चालत नाही',
        'मला + N + सापडत नाही',
        'जरा मदत करा · हळू बोला · पुन्हा सांगा',
        'काम झालं नाही',
      ],
      notes: [
        "THE interference of the module — Hindi's one मिलना is two Marathi verbs, and the wrong one sounds fine to a Hindi ear: मिळणे is get/receive (M5's मिळेल), सापडणे is find-after-looking — मला चावी सापडत नाही (\"can't find my key\"), where Hindi says चाबी नहीं मिल रही. *मला चावी मिळत नाही says the shop is out of keys. Tag interference, spend the mistake here, and keep each verb's note true of its half (M5's mirror seam, docs/26).",
        "The -त नाही frame — the negation L1 never taught (docs/19 call 4 re-planned around the वाचत/करत stems): verb-त + नाही = \"doesn't / isn't —ing\": फोन चालत नाही (\"doesn't work\" — चालणे, M6's चालेल lexeme, its row's promise kept), पाणी येत नाही, मला सापडत नाही. Two taught pieces — the participle -त as a form on the verb's row (M7's policy) and L1-M2's नाही — and NO agreement to compute in this frame: a rest point inside a stressful module, say so.",
        "Lost, forgot, ran out — L1-M5's crown recycled as the three calm complaints: माझा फोन हरवला · माझी पिशवी हरवली · माझं पुस्तक हरवलं (हरवणे — the past agrees with the lost thing, the exact gender law of L1-M5 with M1's possessive in front; Hindi खो गया/गई agrees the same way — transfer of law, delta of verb); पैसे संपले · चहा संपला · दूध संपलं (संपणे \"run out\" — the kitchen's word, same law; पैसे is docs/19 call 4's last re-planned word, landed at last); मी विसरलो/विसरले (\"I forgot\" — subject agreement, गेलो's class). Keep विसरणे to the bare and infinitive frames (मी सांगायला विसरलो) — whether its object version agrees like M5's transitives is flagged for the native pass in docs/26, not asserted.",
        'Asking for help is M1\'s register kit at the moment it exists for: जरा मदत करा ("please help" — मदत the new noun, करा M1\'s row), माफ करा for interrupting, हळू बोला ("speak slowly") and पुन्हा सांगा ("say it again") — the learner\'s own survival lines, the sentences this app exists to hand over; say so. बोला is the polite cell of M7\'s बोलणे by M1\'s law — a new shape, its own row pointing at M7\'s family (docs/26); हळू and पुन्हा are the new adverbs. This module speaks तुम्ही: counters, strangers, offices.',
        "काय झालं? — \"what happened / what's wrong\": zero new words (L1-M2's काय + L1-M9's झालं), the module's opener. The calm complaint is the negated past: काम झालं नाही (\"the work didn't happen\") — the frame L1-M9's own variation previewed (बोललो नाही, the pinned exemption), now taught properly: नाही after the past form, nothing else moves. अडचण (\"difficulty\", f) rides L1-M9's feeling-frame: अडचण आली — the trouble COMES to you, कंटाळा आला's twin.",
        "INDEX SEAM: हरवला/हरवली/हरवलं/हरवले, संपला/संपली/संपलं/संपले, विसरलो/विसरले, सापडत, चालत, येत, मदत, हळू, पुन्हा, बोला, चावी, पैसे, अडचण, सांगायला are fresh keys — the -त participles land as forms on their L2 verbs' rows (सापडणे's, चालणे's via M6, येणे's pointing at L1-M6's family). चालत's row-of-origin is M6's चालेल: same level, one row, forms चालेल · चालत (docs/26). काम, काय, झालं, नाही all stay L1's rows.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M9': {
      id: 'L2-M9',
      title: 'Comparing and choosing',
      job: 'More, less, better — stating a preference',
      patterns: [
        'N-पेक्षा + N + जास्त/कमी + Adj + आहे',
        'मला + N-पेक्षा + N + जास्त + आवडतो/आवडते/आवडतं',
        'चहा की कॉफी?',
        'सगळ्यात + Adj + N',
        'कोणता/कोणती/कोणतं + N + हवा/हवी/हवं?',
      ],
      notes: [
        'THE delta: -पेक्षा, "than", glued: चहापेक्षा कॉफी मला जास्त आवडते — Hindi\'s free-standing से becomes a suffix on the compared thing (चाय से ज़्यादा → चहापेक्षा जास्त), L1-M7\'s glue-law (घरात, टेबलावर) doing comparison, oblique bend included (दूध → दुधापेक्षा). *चहा से / *चहासे is the Hindi shape to star. The sentence\'s architecture transfers — both languages say "X-than Y more" — so the fusion is the whole lesson.',
        "जास्त and कमी — more/less, ज़्यादा/कम's twins, invariable by M3's law (no -आ, no bending). Neither language has an -er/-est: comparison is these words plus -पेक्षा, so once the suffix lands the system is TRANSFER — a rest-point module before M10, say so. \"Better\" is built, not a word: X-पेक्षा चांगला (M2's चांगला, agreeing by M3's grid), X-पेक्षा छान (L1-M9's छान, invariable).",
        "सगळ्यात — the superlative: \"in all\" = -est: सगळ्यात छान, सगळ्यात स्वस्त भाजी, सगळ्यात मोठं दुकान — Hindi सबसे → सगळ्या + त, L1-M7's own -त doing superlative duty: the learner can PARSE the word they are handed; point it out. Recycles M3's grid and M8-L1's shop.",
        "की — the choosing question's \"or\": चहा की कॉफी? — and in a STATEMENT \"or\" is किंवा (चहा किंवा कॉफी चालेल — M6's चालेल). Hindi's one या is two Marathi words split by sentence TYPE: the module's pair-lesson, L1-M9's कारण/म्हणून device reborn at the same rung — build the pairs, make the pool test the choice. SEAM: की will later also report speech (तो म्हणाला की… — L3-M5's job); write की's note as the question-or WITHOUT fencing that future job out (no \"only\").",
        'कोणता / कोणती / कोणतं — "which one", agreeing like Hindi\'s कौन-सा/-सी (transfer of agreement, delta of shape): कोणता चहा हवा? कोणती भाजी हवी? — M2\'s कोण ("who") is its sibling key: cross-reference the notes, never merge the rows. The answer points with L1-M8\'s हा/ही/हे — recycled, no new key.',
        "INDEX SEAM: hi-mr stays single-token, so every -पेक्षा form is its own fresh key (चहापेक्षा, कॉफीपेक्षा, दुधापेक्षा…) — each deconstructed in this module with its note pointing back to the base noun's L1 row (bare पेक्षा never stands free in the course and gets no key). जास्त, कमी, सगळ्यात, की, किंवा, दोन्ही (if a sentence needs \"both\") and the कोणता set are the module's other keys; the preference verdicts recycle the course's oldest frames — आवडतो (L1-M1), हवा (L1-M3), चालेल (M6) — which keeps the new-word spend small before M10.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M10': {
      id: 'L2-M10',
      title: 'Telling what happened',
      job: 'A four-sentence account in the past',
      patterns: [
        'आधी + <past>. मग + <past>. शेवटी + <past>.',
        'त्याने/तिने + N + V-ला/-ली/-लं',
        'मी + N-ला + भेटलो/भेटले',
        '<account> → मग काय झालं?',
      ],
      notes: [
        'The format: each item is an ACCOUNT of four short sentences — levels.json\'s job, L1-M10\'s 2–3-sentence turns grown up into the level\'s written exit — and the per-sentence bound applies to each sentence inside it. The account runs on the sequencers: आधी ("first"), मग ("then" — Hindi फिर; L1-M4\'s नंतर is its twin and stays honest, but मग is what speech says), शेवटी ("in the end"). मग काय झालं? — the listener\'s question that keeps a turn alive — is zero new words by M8\'s precedent.',
        'The grammar debt of the whole course comes due — ने. L1-M5 said only that मी and तू never take it, and docs/08 open question 20 asked when the course would admit the rest; the answer is here: the third-person past-transitive takes -ने — तो → त्याने, ती → तिने, ते → त्यांनी — and the verb STILL agrees with the object, the law unchanged since L1-M5: त्याने चहा प्यायला · तिने भाजी केली · त्यांनी काम केलं. For once the Hindi habit HELPS — उसने/उन्होंने is the same architecture: transfer — and the ने the learner has been suppressing since M5 finally lands where Marathi wants it. The delta is only the shapes (त्या-, ति-), and M4\'s -ने ("by bus") may now be named as the same ending\'s other job.',
        "Meeting people: मी रोहनला भेटलो (\"I met Rohan\") — भेटणे takes -ला on the person met (M4's place -ला extended to people; Hindi's से मिला makes *रोहनसे the shape to star) and its past agrees with the MEETER, not the met: मी भेटलो · ती भेटली — भेटणे sits in गेलो's subject-agreeing class even with a -ला complement. The भेटलो family's row points at L1-M10's भेटू (docs/26 forms policy).",
        'सांगितलं — सांगणे\'s past ("he told me": त्याने मला सांगितलं — ergative + dative + neuter default in one everyday line); the participle is irregular (सांगितलं, never *सांगलं) — its row says so and points at M4\'s सांगा.',
        "New-word spend is the smallest of the level, the M10 tradition: the त्याने/तिने/त्यांनी set, the three sequencers, the भेटलो family, सांगितलं — everything else must come from L1 and L2-M1…M9 (हरवलं and संपले from M8, जेवलो from M5, गेलो/आलो/झालं from L1). A fourth sentence that needs a new noun probably wants rewriting; say so. Past tense only — L1-M5's envelope at full width: transitive object-agreement, intransitive subject-agreement, ergative third person.",
        "Register closes where M1 opened (docs/26): an account speaks the register its listener earns — a friend hears तू-frames and the informal chip, an elder's version swaps them out — and a good final item shows the SAME event told both ways, the level's two lessons (register and the past) in one pool entry.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
    'L3-M1': {
      id: 'L3-M1',
      title: 'Your day, in detail',
      job: 'Longer habitual narration with sequencing words',
      patterns: [
        'V-ऊन + मग + V-तो/ते',
        'आधी … मग … नंतर … शेवटी …',
        'रोज + time-word + मी + V-तो/ते',
        'मी + N-ला + जाऊन + N + करतो',
      ],
      notes: [
        "THE grammar of the module: the -ऊन converb — उठून, जाऊन, करून, जेवून, \"having got up / having gone\". Hindi's करके is the same idea in a different body (उठकर → उठून), so the MOVE transfers and only the ending is new: tag delta, and say plainly that a chain of -ऊन forms is how Marathi tells a day without a full stop after every verb. Every converb is its own single-token key, deconstructed here with its note pointing back to the verb's first-teach row (L1-M4's उठतो, L1-M6's जाणार, L2-M5's जेवलो) — the forms policy of docs/26, unchanged.",
        'The converb carries no person and no gender — उठून is उठून whoever got up, and the LAST verb in the chain carries everything: मी उठून चहा करतो · ती उठून चहा करते. That is the whole economy of the shape, and the one place a Hindi speaker over-thinks it: there is nothing to agree with until the end of the sentence. Say it, and let the pool test it with the same chain under मी and ती.',
        "Sequencing words are all owned already — आधी, मग, शेवटी (L2-M10), नंतर (L1-M4), रोज and the time-of-day set (L1-M4) — so the module spends almost nothing on vocabulary and everything on length: this is where L1-M4's single habitual sentences become a paragraph. New words, if any, are the daily-routine verbs the ladder still lacks (आंघोळ, तयार) and no more than a handful; a sentence that needs a new noun is a sentence that wants rewriting.",
        "Length is the delta the learner will feel: the bound climbs to ten words, and an item may run two sentences. Keep every clause inside L1-M4's habitual, and keep the tense simple present throughout — the past is L2-M10's and the -तोय continuous is L2-M7's; naming them in a usage line is fine, writing them here is not.",
        "INDEX SEAM: उठून, जाऊन, करून, जेवून, येऊन and any other -ऊन form are FRESH single-token keys owned by this module — no L1 or L2 file is edited, and the bare stems stay where they were first taught. आंघोळ (if used) is this module's; the daily nouns and every time word stay L1-M4's.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
    'L3-M2': {
      id: 'L3-M2',
      title: 'Work and study',
      job: 'Explain what you do all day, and how',
      patterns: [
        'N-चा/-ची/-चं + N + आहे',
        'माझ्या + N-oblique-चं + काम + Adj + आहे',
        'मी + N-मध्ये + काम करतो/करते',
        'मी + N + शिकतो/शिकते',
      ],
      notes: [
        "THE decision of the level lands here: the genitive becomes a SYSTEM. L2-M2 taught one frame (माझ्या भावाचं नाव) and deliberately stopped; this module opens the grid — -चा (m) · -ची (f) · -चं (n) · -चे (m.pl) · -च्या (f.pl), agreeing with the thing OWNED, over the oblique bend on the owner (ऑफिस → ऑफिसचं, कंपनी → कंपनीचा, मित्र → मित्राचं). Hindi's का/की/के agrees the same way, so the law transfers whole and the fusion plus the bend are the delta — exactly the argument L2-M2 made about one frame, now said about all of them.",
        "Work vocabulary is the spend, and it is the module's only spend: ऑफिस, कंपनी, कामगार or नोकरी, शाळा, कॉलेज, अभ्यास, शिकवणे. Prefer the words a Pune speaker actually says (ऑफिस over कार्यालय, नोकरी for a job) and note the formal twin in a usage line rather than in a display — the same discipline that kept थँक्यू out of L2-M1's displays.",
        '-मध्ये ("in") joins the glue-set the learner owns from L1-M7 (-त, -वर) and L2-M4 (-ला, -ने): मी ऑफिसमध्ये काम करतो. Its note must say what -त does NOT do — -त is the everyday in for small containers and rooms (खोलीत, दुकानात), -मध्ये is the wider one and the only one that fits a borrowed noun like ऑफिस. One row, one contrast, no list.',
        'The verbs are all owned: करतो, शिकतो, वाचतो, जातो (L1-M4), शिकवणे is the one new lexeme ("teach", the causative twin of शिकणे — say that they are a pair, because Hindi\'s सीखना/सिखाना pairs the same way). Keep tense to the simple present: this module is L1-M4 grown up, not a new tense.',
        "INDEX SEAM: every -चा/-ची/-चं form is its own single-token key (ऑफिसचं, कंपनीची, मित्राचा…), each deconstructed here with its note pointing at the base noun's row; bare चा never stands free in this course and gets no key, exactly as bare पेक्षा did not (L2-M9). भावाचं stays L2-M2's row. ऑफिस, कंपनी, नोकरी, शाळा, कॉलेज, अभ्यास, शिकवतो and -मध्ये forms are fresh.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
    'L3-M3': {
      id: 'L3-M3',
      title: 'Opinions with reasons',
      job: 'Agree, disagree, soften — reasons attached',
      patterns: [
        'मला वाटतं की + clause',
        'माझ्या मते + clause',
        'हे बरोबर आहे / हे चूक आहे',
        'clause + कारण + clause',
        'कदाचित + clause',
      ],
      notes: [
        'मला वाटतं is the module\'s spine and the course\'s next dative frame: "it seems to me" — वाटणे takes मला exactly as आवडतो and हवं do (L1-M1, L1-M3), so the frame is owned and only the verb is new. Write वाटणे\'s row TRUE OF BOTH ITS JOBS now, because L3-M6 inherits it for feelings (मला काळजी वाटते): it is the seems/feels verb, and "I think" is one of its uses, not its definition. The row lives here; M6 points back at it.',
        "की opens the clause, and this is the second half of the promise L2-M9's की note left open: there it was the question-or (चहा की कॉफी?), here it is the joiner (मला वाटतं की हे महाग आहे). Same key, two jobs — the हा/ही/हे precedent — and reported speech proper is L3-M5's, which takes the same की with a different verb. Do not fence either job out.",
        'Agreeing and disagreeing without rudeness: बरोबर ("right"), चूक ("wrong"), खरं ("true") — all three sit in the हे … आहे frame the learner has had since L1-M8, and the softening is done with words, not with grammar: कदाचित ("maybe"), थोडं (L1-M3), and the question tag ना. The register law of L2-M1 applies unchanged — disagreement with an elder chips formal and reaches for कदाचित first.',
        "Reasons are already owned: कारण and म्हणून (L1-M9). This module's job is to attach them to an OPINION rather than to a feeling — मला वाटतं की चहा चांगला आहे, कारण तो स्वस्त आहे — and to keep both clauses inside the bounds. Two clauses is the ceiling here; three is L3-M10's.",
        "INDEX SEAM: वाटतं (with its वाटते/वाटतो cells as forms), मते, बरोबर, चूक, खरं, कदाचित and ना are fresh keys. की stays L2-M9's row, and its note there was written without a fence for exactly this reason. कारण and म्हणून stay L1-M9's. This is a fully-enriched module (M1–M3 law): all five blocks on all ten sentences.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
    'L3-M4': {
      id: 'L3-M4',
      title: 'If and then',
      job: 'Conditions, wishes, advice',
      patterns: [
        'जर + clause + तर + clause',
        'clause + तर + clause',
        'तुम्ही + V-आयला + पाहिजे',
        'जर + V-लो/-लं + असतं + तर + …',
      ],
      notes: [
        "The real condition first: जर … तर, and the honest news is that जर is optional in speech while तर is not — पाऊस आला तर मी येणार नाही is what a person says. Hindi's अगर … तो is the same pair with the same optionality, so the architecture transfers and the words are the delta. Teach the तर half as the load-bearing one; a display may drop जर, never तर.",
        "Advice is -आयला पाहिजे: तुम्ही डॉक्टरकडे जायला पाहिजे. The -आयला shape is L2-M5's purpose ending (जेवायला, खायला) doing a second job, and पाहिजे is the new word — impersonal, unchanging, and NOT a verb the learner conjugates. Hindi's चाहिए sits in the same spot, which is the transfer; the delta is that Marathi puts the -आयला on the verb instead of an infinitive plus a postposition.",
        'The counterfactual is the module\'s ceiling and its one genuinely hard shape: जर मी लवकर गेलो असतो तर… — the past form plus असतं/असता/असते. Keep it to ONE frame, first person, and only in M4 sentences that need it; the full system is L4-M3\'s ("What might have been", docs/48 §4). Say that in the note so an author does not open it wider.',
        'Wishes ride the frames already owned: मला … हवं होतं ("I wanted"), आवडलं असतं ("I would have liked") — prefer the first, name the second. And keep the tense envelope declared: present and future in the real conditional, past-plus-असतं in the counterfactual, nothing else.',
        "INDEX SEAM: जर, तर, पाहिजे, असतं (with असता/असते as forms) are fresh keys, and every -आयला form beyond L2-M5's जेवायला/खायला (जायला, करायला — करायला already landed as a form on L2-M8's सांगायला row) resolves to its owner. पाऊस is fresh if a sentence needs weather; otherwise keep the conditions to owned nouns (काम, पैसे, वेळ).",
      ],
      maxWordsPerSentence: 11,
      newWordCap: NEW_WORD_CAP,
    },
    'L3-M5': {
      id: 'L3-M5',
      title: 'What someone said',
      job: "Reporting other people's words",
      patterns: [
        'तो/ती + म्हणाला/म्हणाली + की + clause',
        'त्याने/तिने + सांगितलं + की + clause',
        'clause + असं + तो + म्हणाला',
        'त्याने विचारलं की + clause',
      ],
      notes: [
        'The one great gift of this module, and it must be said in the first note: Marathi does NOT backshift. What the person said stays in the tense they said it in — तो म्हणाला की मी उद्या येईन ("he said he will come tomorrow", with येईन exactly as he spoke it). Hindi does the same (उसने कहा कि मैं कल आऊँगा), so a Hindi speaker is already right and only an English-trained instinct misleads. Tag it free, and spend the saved effort on the verb.',
        "म्हणणे is the new lexeme: म्हणाला · म्हणाली · म्हणाले, the past that agrees with the SPEAKER (गेलो's class, not the ergative class) — and note the contrast the learner can now feel: त्याने सांगितलं takes ने and the neuter (L2-M10), तो म्हणाला takes neither. Two ways to report, two different laws, one module: that pair IS the lesson.",
        'की is L2-M9\'s key doing the job L3-M3 opened for it. Reported speech may also drop it — तो म्हणाला, "उद्या येतो" — and Marathi\'s own device असं ("thus", pointing back at what was said) is worth one row: असं तो म्हणाला. Keep quoted-speech displays to sentences the learner already owns, so the report never smuggles in new grammar inside the quote.',
        'Questions reported: विचारणे ("ask") — त्याने विचारलं की तू कुठे होतास?. Keep the reported question to the words the ladder owns, and note that the question word stays where the answer sits (L1-M2\'s law), unchanged by being reported.',
        "INDEX SEAM: म्हणाला/म्हणाली/म्हणाले, विचारलं, असं are fresh keys; सांगितलं stays L2-M10's row and की stays L2-M9's. The pinned L1 miss बोललो (docs/15 Q29) is NOT paid here — बोलणे is speaking, म्हणणे is saying-that, and merging them to close an old debt would poison both rows. Say so in the brief.",
      ],
      maxWordsPerSentence: 11,
      newWordCap: NEW_WORD_CAP,
    },
    'L3-M6': {
      id: 'L3-M6',
      title: 'Feelings in depth',
      job: 'Nuance past good and bad',
      patterns: [
        'मला + N + वाटतं/वाटते',
        'मला + N + झाला/झाली/झालं',
        'मला + N + आला/आली',
        'मी + Adj + आहे',
      ],
      notes: [
        'The module runs on frames the learner already owns, and that is the point: L1-M9 taught भूक लागली and कंटाळा आला, L2-M8 taught अडचण आली, L3-M3 taught मला वाटतं. Feelings in Marathi mostly COME to you or SEEM to you — मला काळजी वाटते, मला भीती वाटते, मला आनंद झाला, मला राग आला — so the whole module is new nouns in owned frames. Say that plainly; it is the cheapest depth in the level.',
        "वाटणे is L3-M3's row, and its note there was written true of both jobs for this module. Do not open a second वाटणे row: point back at M3's, and let the new work be which noun goes in front of it — काळजी (worry) and भीती (fear) take वाटणे; आनंद (joy) and दुःख (sorrow) take होणे; राग (L1-M9's own word) takes येणे. That three-way split is the delta, and a Hindi speaker cannot guess it, because Hindi says डर लगता है with a different verb again.",
        'The adjective route exists too and is the smaller half: मी खूश आहे, मी दुःखी आहे — but Marathi prefers the noun-plus-frame route for most feelings, and a learner who reaches for the adjective every time sounds translated. One or two adjective sentences, no more, and a usage line saying which route a native would pick.',
        'Nuance past good and bad means degree words as much as new nouns: खूप (L1), थोडं (L1), जरा (L2-M1) and the honest middle — ठीक आहे. Keep every sentence inside a frame already taught; this module adds no grammar at all, and the brief should say so, because an author who invents a construction here has misread the job.',
        "INDEX SEAM: काळजी, भीती, आनंद, दुःख, खूश, दुःखी, ठीक are fresh keys. वाटतं stays L3-M3's row, आला/आली stay L1-M9's, झालं stays L2-M8's. राग is L1-M9's and is re-shown here, not re-opened.",
      ],
      maxWordsPerSentence: 11,
      newWordCap: NEW_WORD_CAP,
    },
    'L3-M7': {
      id: 'L3-M7',
      title: 'Body and health',
      job: 'Say what hurts, and where',
      patterns: [
        'माझं + N + दुखतंय',
        'मला + ताप + आला आहे',
        'मला + N + दुखतं',
        'तुम्ही + औषध + घ्या',
      ],
      notes: [
        "THE frame of the module: the body part is the SUBJECT and it does the hurting — माझं डोकं दुखतंय, माझा हात दुखतोय. दुखणे takes L2-M7's spoken continuous, so the shape is owned and only the verb is new; the possessive in front of it is L3-M2's genitive doing ordinary work. Hindi offers two rivals — सिर दर्द कर रहा है and मेरे सिर में दर्द है — and neither maps: there is no दर्द noun in the Marathi frame at all. Tag interference and spend the mistake there.",
        "The body words are the vocabulary spend: डोकं (n), हात (m), पाय (m), पोट (L2-M5's, re-shown), डोळे (m.pl), कान. Gender matters more than usual here because the verb agrees with the part — डोकं दुखतंय, हात दुखतोय, डोळे दुखतायत — so every body row states its gender, and the pool should test the agreement rather than the vocabulary.",
        'Illness rides the coming-frame the course has used since L1-M9: मला ताप आला आहे ("I have a fever"), मला सर्दी झाली आहे. The perfect (-आला आहे) is new as a shape but not as an idea — it is L2-M7\'s continuous logic on a past participle — so keep it to these two or three fixed lines and do not open the tense as a system; that is L4\'s.',
        "The doctor's script closes the module and reuses L2-M1 whole: डॉक्टरकडे जा (\"go to the doctor\" — -कडे, the toward-ending L2-M4 taught inside डावीकडे, now standing on its own with a person), औषध घ्या (L2-M5's घ्या), आराम करा (L2-M1's करा). Register: this module talks to and about doctors and elders — तुम्ही frames, formal chips on the imperative lines.",
        "INDEX SEAM: दुखतंय (with दुखतोय/दुखतायत/दुखतं as forms), डोकं, हात, पाय, डोळे, कान, ताप, सर्दी, औषध, डॉक्टरकडे, आराम are fresh keys. पोट stays L2-M5's row, घ्या stays L2-M5's, करा stays L2-M1's. -कडे appears bare for the first time here: its row says डावीकडे and उजवीकडे (L2-M4) were the same ending glued to a direction word.",
      ],
      maxWordsPerSentence: 11,
      newWordCap: NEW_WORD_CAP,
    },
    'L3-M8': {
      id: 'L3-M8',
      title: 'Money and paperwork',
      job: 'Rent, bills, forms, offices',
      patterns: [
        'N + किती + आहे?',
        'मी + N + भरलं/भरली',
        'हा + फॉर्म + भरा',
        'मला + N-ची + पावती + हवी',
      ],
      notes: [
        'भरणे is the module\'s hinge and its one real seam: L2-M8 taught पोट भरलं ("filled"), and the SAME verb pays a bill and fills a form — बिल भरलं, फॉर्म भरा. One lexeme, three everyday jobs, and Hindi does exactly the same with भरना, so this is transfer the learner can be told about rather than drilled on. The row of origin is L2-M8\'s; this module re-shows the cells it needs and never opens a second family.',
        'The paperwork nouns are the spend: भाडं (rent, n), बिल, फॉर्म, अर्ज (application), सही (signature, f), कागद (paper), पावती (receipt, f), बँक. Prefer the words heard at a Pune counter — फॉर्म and बिल are the honest borrowings, and a usage line may name अर्ज as the formal twin of the English word on the same window.',
        "Money questions recycle L1-M8 exactly — किती, कितीला, रुपये — and L3-M2's genitive does the rest of the work: घरचं भाडं, विजेचं बिल. Keep the arithmetic out; the module is about the transaction, not the sum, and every amount should be a number the ladder already owns (L1-M8's shop set plus L2-M5 and L2-M6's clock hours).",
        "The counter register is तुम्ही throughout, and this is where L2-M1's formal tier earns its keep: कृपया इथे सही करा chips formal, जरा हा फॉर्म भरा chips formal, and the same request to a friend would chip informal. One sentence should show the pair, because a learner meets both windows in one afternoon.",
        "INDEX SEAM: भाडं, बिल, फॉर्म, अर्ज, सही, कागद, पावती, बँक and the -चं genitive forms this module needs are fresh keys. भरलं/भरला/भरली stay L2-M8's row, किती and रुपये stay L1-M8's, करा stays L2-M1's. Do not open विजेचं as a lexeme — वीज (electricity) is a fresh noun if a display needs it, and its genitive is the module's, not a bare compound.",
      ],
      maxWordsPerSentence: 12,
      newWordCap: NEW_WORD_CAP,
    },
    'L3-M9': {
      id: 'L3-M9',
      title: 'Festivals and everyday culture',
      job: 'Talk about what is happening around you',
      patterns: [
        'आज + N + आहे',
        'N-मध्ये + खूप + गर्दी + आहे',
        'लोक + V-तायत',
        'उद्या + N-ची + सुट्टी + आहे',
      ],
      notes: [
        "This is the module where L2-M7's continuous leaves the phone and describes a street: लोक गाणी ऐकतायत, सगळे जेवतायत. The plural cell -तायत is owned (L2-M7 taught it as the respect form) and here it does its other job — many people — which is worth one note and no new grammar. The habitual sits beside it for what is true every year: दिवाळीत सुट्टी असते.",
        'असणे in its habitual cell — असतो/असते/असतं — is the module\'s one new shape, and it is the difference between "is right now" (आहे) and "is, as a rule" (असतं): आज सुट्टी आहे against दिवाळीत सुट्टी असते. Hindi splits the same way (है against होता है), so the idea transfers and only the cells are new. Keep the two side by side in one sentence pair, and let the pool test the choice.',
        "The cultural vocabulary is the spend, and it must be Maharashtra's own rather than a generic list: गणपती and गणेशोत्सव, दिवाळी, सण (festival), पूजा, सुट्टी (holiday), गर्दी (crowd), मिरवणूक if a display needs a procession. Every one of these is a word a learner will hear in Pune in the same week; a note may name the Hindi twin where there is one (त्योहार → सण), and none of these is a proper noun exempt from the index — they are common nouns and get rows.",
        'Keep the register neutral and the claims small. The module describes what is happening, it does not explain religion: a display says आज गणपती आहे, आणि खूप गर्दी आहे, and a usage line can say when the festival falls. Nothing here should assert a practice as universal — Maharashtra is not one custom — and the brief should say that in words, because an author reaching for colour is exactly how a course starts lecturing.',
        "INDEX SEAM: सण, पूजा, सुट्टी, गर्दी, लोक, सगळे, असतो/असते/असतं and the festival names are fresh keys. -तायत stays L2-M7's row (re-shown for the plural job), गाणी stays L1-M4's, आहे stays L1-M1's. दिवाळीत is the -त ending (L1-M7) on a fresh noun and gets its own key.",
      ],
      maxWordsPerSentence: 12,
      newWordCap: NEW_WORD_CAP,
    },
    'L3-M10': {
      id: 'L3-M10',
      title: 'Your own story',
      job: 'An eight-sentence account, built from the whole ladder',
      patterns: [
        '<eight-sentence account>',
        'आधी … मग … नंतर … शेवटी …',
        'V-ऊन + clause',
        'clause + कारण + clause',
      ],
      notes: [
        'The format, and the cap: each item is an account of AT MOST EIGHT sentences — the level\'s written exit, L2-M10\'s four grown up, and the per-sentence bound applies to each sentence inside it. Eight is a ceiling and not a target: a six-sentence story that holds together beats an eight-sentence one padded to the number. "Written unaided" is the job, so every item should be assemblable from the ladder with no new word at all.',
        'New-word spend is the smallest of the level, the M10 tradition — ideally ZERO. Everything the account needs is already taught: the -ऊन chain (M1), the genitive (M2), an opinion with its reason (M3), a condition (M4), a reported line (M5), a feeling (M6), and the whole of L1 and L2 underneath. A sentence that needs a new noun is a sentence that wants rewriting; say so, and mean it.',
        "The tense envelope is the widest the course has had: past (L2-M10, ergative included), present habitual (L1-M4, L3-M1), continuous (L2-M7), future (L1-M6) and the real conditional (L3-M4) may all appear inside one account — which is exactly what makes it the exit. What stays out: the counterfactual beyond L3-M4's single frame, and the passive, which this level never opens.",
        'Register is chosen by the listener and held for the whole account, the law L2-M1 opened and L2-M10 closed on: one item should tell the SAME story to a friend and to an elder, and a pool entry should carry both, so the level ends where it began. Chip honestly — तू lines informal, the कृपया tier formal, the rest neutral.',
        "A good story has a shape, not just a sequence: something wanted, something in the way, what happened in the end. L2-M10's accounts were chronological; this one should carry a reason (कारण) and a feeling (M6) inside it, which is the difference between a timetable and a story. The pool tests comprehension of a story, so its items should be the ones a learner would want to retell.",
      ],
      maxWordsPerSentence: 12,
      newWordCap: NEW_WORD_CAP,
    },
  },
  'en-es': {
    'L1-M1': {
      id: 'L1-M1',
      title: 'Who I am',
      job: 'Introduce yourself and state what you like',
      patterns: [
        'Me llamo + name',
        'Soy de + place',
        'Soy + N/Adj',
        'Me gusta + el/la + N',
        'Me gustan + los/las + N-pl',
        'Quiero + N',
      ],
      notes: [
        'Pro-drop, stated as the law and not as "Spanish drops pronouns": the ending already names the person, so a neutral statement carries no subject pronoun — Soy de la India, not Yo soy de la India. yo / tú are not ungrammatical, they are MARKED: they come back to contrast or disambiguate (Yo soy de la India, ella es de México). Tag it delta and repeat it in every sentence of the module. The spoken-Spanish pass (2026-09-05, docs/41) corrected the example itself: India is one of the few countries that keeps its article, so every Soy de India in the course became Soy de la India, and Soy estudiante de español became Soy estudiante.',
        'Liking runs on gustar = "to please", so the thing liked is the SUBJECT and the verb agrees with IT, not with the person: Me gusta el café (one thing) · Me gustan los libros (more than one). me only names who is pleased and never changes for number. Write that agreement rule — "gustar is backwards" is memorable and tells an author nothing about when to write gustan.',
        'First contact with gender: a noun carries a gender and its article shows it — el café (m) · la casa (f). Teach each noun WITH its article and leave the agreement drill to M3; do not offer the "-o is masculine, -a is feminine" shortcut, which misses el día, la mano and el problema.',
        'Me llamo is reflexive — literally "I call myself" — and is how a name is given; Mi nombre es… is grammatical and nobody says it. ser here is identity and origin only: the ser/estar choice is M2\'s job, so no estar in this module.',
        "This module opens the course's word index, so its surface choices bind every later module (first occurrence wins). Teach Me llamo and Me gusta as whole two-token surfaces — that is what keeps the bare me free — and treat the existing four-sentence fixture at content/en-es/modules/L1-M1.json as a seam proof to replace, not a draft to extend.",
      ],
      maxWordsPerSentence: 5,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M2': {
      id: 'L1-M2',
      title: 'First exchange',
      job: 'Greetings, wellbeing, yes/no questions',
      patterns: [
        'Hola/Buenos días + , + name',
        '¿Cómo estás/está usted?',
        'Estoy + Adj',
        '¿Eres/Es de + place?',
        'Sí/No + , + <statement>',
      ],
      notes: [
        'The module exists to force the ser/estar choice, and the rule must be the true one: ser classifies (identity, origin, what something IS) and estar reports a condition or a state. "ser is permanent, estar is temporary" is the slogan every author reaches for and it is false in both directions — es joven is temporary, está muerto is permanent. Author to the split the module drills: Soy de la India (origin → ser) · Estoy bien (condition → estar).',
        'A yes/no question is the statement, unchanged, said as a question and written between ¿ … ?: ¿Eres de México? beside Eres de México. English fronts do/are and Spanish moves nothing — that is the delta. Write both marks even though the index strips edge punctuation (¿Cómo indexes as cómo).',
        'Two "you"s: tú takes the -s form (eres, estás), usted takes the SAME form as él/ella (es, está) while still meaning "you" — usted es de México. That mismatch is the interference to tag, not the politeness itself.',
        'Accents are letters in the index, so this module must spell them: cómo (how) and como (I eat, taught in M4) are two entries, as are qué/que and sí (yes)/si (if). An unaccented ¿Como estás? merges two different words onto one "why" note for the rest of the course.',
      ],
      maxWordsPerSentence: 5,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M3': {
      id: 'L1-M3',
      title: 'Needs and wants',
      job: "Say what you want and don't want",
      patterns: [
        'Quiero + un/una + N',
        'No quiero + N',
        'Quiero + V-inf',
        'Necesito + N',
        '¿Quieres + un/una + N?',
      ],
      notes: [
        'Every want names a noun, so this is where gender stops being a label and becomes agreement: un/una and el/la track the noun, the plural adds -s/-es with los/las. Gender is a property of the noun learned with its article — the "-o/-a" shortcut fails on el día, la mano, el problema, and on el agua, which is feminine but takes el in the singular because it starts with a stressed a-: el agua fría, with the adjective still feminine.',
        'Adjectives normally FOLLOW the noun and agree with it: un coche rojo · una casa roja · unos coches rojos. English puts the adjective first and never inflects it, so both halves are delta.',
        'Negation is one word in front of the verb and nothing else changes: No quiero café. English needs a "do not" auxiliary that Spanish has no equivalent of.',
        'Wanting to DO something is quiero + a bare infinitive — Quiero comer, with no word for "to". English "want to eat" tempts a stray a or que into the sentence; *Quiero a comer and *Quiero que comer are both wrong, and are worth a mistake block.',
      ],
      maxWordsPerSentence: 6,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M4': {
      id: 'L1-M4',
      title: 'My day',
      job: 'Daily habits and time words',
      patterns: [
        '(Yo) + V-o + todos los días',
        'Me levanto a las + hour',
        'Por la mañana/tarde/noche + V-o',
        'Veo a + person',
        '¿A qué hora + V-as/-es?',
      ],
      notes: [
        "The spine is the present tense across persons, one stem plus an ending per person, in all three verb classes: hablo · hablas · habla; como · comes · come; vivo · vives · vive. The ending is what carries M1's pro-drop, so keep the pronouns out and let the ending do the work.",
        'Daily verbs are reflexive and the pronoun is part of the verb, changing with the person: me levanto · te levantas · se levanta. English "I get up" has nothing there at all, so the dropped me is the commonest slip and belongs in a mistake block.',
        'The personal a: when a direct object is a specific person, a stands in front of them — Veo a mi hermana. It is not "to", it is not translated, and a thing never takes it: Veo la casa. Say what it marks; "the personal a means to" is exactly the memorable-but-false rule to avoid.',
        "INDEX SEAM, decided here: this module teaches the surface a first, so its row answers every later tap — the plan a of M6 (voy a comer) and the destination a and al of M7. Write that row true of all three seats with the personal a as its instance, because M6's and M7's own rows will be unreachable through the index. Teach the time-of-day phrases as whole surfaces (por la mañana · por la tarde · por la noche): that leaves the bare mañana unclaimed for M6 to teach as \"tomorrow\", and keeps the bare por free for M9. Note also that como (I eat) is distinct from M2's cómo (how) only because the accent is written.",
      ],
      maxWordsPerSentence: 6,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M5': {
      id: 'L1-M5',
      title: 'Yesterday',
      job: 'Past tense — the first big divergence',
      patterns: [
        'Ayer + V-é/-í + N',
        'Ayer no + V-é/-í',
        '¿Qué + V-aste/-iste + ayer?',
        'Antes + V-aba/-ía + todos los días',
        'Era/Estaba + Adj',
      ],
      notes: [
        'THE richest interference zone of the level: English has one simple past and Spanish has two, and the choice is not "completed vs ongoing" — it is how the event is PRESENTED. The preterite presents it as one bounded whole (Ayer comí arroz); the imperfect presents it as an unbounded frame — a past habit or a background state (Antes comía arroz todos los días · Estaba cansado). Both describe finished time, which is why the slogan sends authors wrong; tag the pair interference and spend the mistakes here.',
        "Lead with the preterite — it does the day's work — and hold the imperfect to its two clearest jobs at this level: the past habit, and the background state (era, estaba, había). Anchor every sentence with ayer and recycle M4's daily verbs into the past.",
        'The accent IS the tense, so it must be written: hablo (I speak) · hablé (I spoke) · habló (he spoke) are three different words that differ by nothing else, and the index keeps them apart only on that accent.',
        'Spend the irregular budget on the ones the sentences need — fui, hice, tuve, estuve — and note that fui is the preterite of BOTH ser and ir, so the sentence decides: Fui a la tienda (went) · Fui estudiante (was).',
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M6': {
      id: 'L1-M6',
      title: 'Tomorrow',
      job: 'Future and plans',
      patterns: [
        'Mañana + voy a + V-inf',
        '¿Vas a + V-inf?',
        'Voy a + V-inf + time',
        'Mañana + V-o',
        'Mañana + V-ré',
      ],
      notes: [
        'Two futures, and the everyday one leads: ir a + infinitive (Mañana voy a trabajar). The synthetic future (trabajaré) gets one or two sentences for recognition, and the plain present is a normal future too (Mañana trabajo). "-ré is the future tense" is the slogan that would make an author write the form Spanish speakers use least.',
        'ir is irregular and carries the module: voy · vas · va · vamos · van. It is worth its share of the word cap on its own.',
        'The a in voy a comer is obligatory and means nothing by itself — English "going to" hides it, so *Voy comer is the mistake to show. A learner tapping a here is shown M4\'s row (first occurrence wins), so state the plan seat in this module\'s rule text rather than relying on a fresh word row being reachable.',
        'The bare surface mañana is free because M4 deliberately taught por la mañana whole. Claim it here for "tomorrow", and let the row say both jobs — mañana alone is tomorrow, por la mañana is in the morning — so a learner who taps it in either place is told the truth.',
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M7': {
      id: 'L1-M7',
      title: 'Where things are',
      job: 'Locations and prepositions',
      patterns: [
        'N + está + en + place',
        '¿Dónde está + N?',
        'Hay + un/una + N + en + place',
        'N + está + debajo de/al lado de/cerca de + N',
      ],
      notes: [
        "Where a thing or a person IS takes estar, always — M2's split at its most mechanical: El libro está en la mesa, never *es en la mesa. The one exception is an event, which takes ser (La fiesta es en mi casa); keep events out of L1 rather than pretending the exception does not exist.",
        'hay vs está, one English "there is" for two Spanish jobs: hay asserts that something EXISTS and never inflects for number — Hay un libro en la mesa · Hay dos libros en la mesa, never *hayn — while está says where a known thing is. Choosing between them is the module\'s comprehension work.',
        'Prepositions stay separate words, but two contractions are obligatory: a + el = al and de + el = del, masculine singular only — al lado del libro, never *a el, *de el.',
        'The compound prepositions end in de and the de is not optional: debajo de la mesa, al lado de la casa, cerca de la tienda, delante de la puerta. English "under the table" has no "of", so the missing de is the trap.',
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M8': {
      id: 'L1-M8',
      title: 'Numbers & shopping',
      job: 'Prices, quantities, buying',
      patterns: [
        '¿Cuánto cuesta + el/la + N?',
        '¿Cuánto cuestan + los/las + N-pl?',
        '¿Cuánto es (todo)?',
        'Quiero + num + N + , por favor',
        'Un kilo/Una botella de + N',
      ],
      notes: [
        "The price question agrees with the THING, not with the buyer: ¿Cuánto cuesta el café? · ¿Cuánto cuestan los libros? Name the link back to M1 — this is gustar's reversal again, and a learner who has met it once should be told it is the same shape. The total is a different question and takes ser — ¿Cuánto es? / ¿Cuánto es todo? — which is what the spoken-Spanish pass (2026-09-05, docs/41) put in S10 in place of ¿Cuánto cuesta todo?.",
        'uno shortens to un before a masculine noun and becomes una before a feminine one — un libro · una mesa — and only stands whole when nothing follows it (Quiero uno). *uno libro is the mistake to show.',
        'Numbers are vocabulary the sentences actually use (uno…diez, veinte, cien), not a counting drill; quantities take de — un kilo de arroz, una botella de agua.',
        "Teach por favor as ONE two-token surface at the edge of the request (Quiero dos cafés, por favor). That keeps the bare por unclaimed for M9's por qué and por eso, which is the difference between a learner getting the right note and the first one that happened to be indexed.",
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M9': {
      id: 'L1-M9',
      title: 'Feelings & opinions',
      job: 'Why — because and so',
      patterns: [
        '<statement> + porque + <statement>',
        '<statement> + , por eso + <statement>',
        '¿Por qué + <question>?',
        'Estoy + Adj-o/-a',
      ],
      notes: [
        'The pair that carries the module: porque introduces the REASON and por eso introduces the CONSEQUENCE. The same two facts in opposite order — No quiero café porque estoy enfermo · Estoy enfermo, por eso no quiero café — so build the sentences in pairs and make the comprehension pool test the choice. The pair was cansado until the spoken-Spanish pass (2026-09-05, docs/41): a tired person wants coffee, so the reason did not hold, and enfermo (taught in this module) replaced it.',
        'Three spellings, three words, and the module lives or dies on writing them exactly: ¿Por qué…? (why — two words, accented) · porque (because — one word, no accent) · por eso (so). The hazard here is orthographic rather than grammatical: drop the accent and the index merges "why" into "because" for the whole course.',
        'Feelings ride estar + adjective, and the adjective agrees with the SUBJECT — whoever the sentence is about: Estoy cansado (a man about himself) · Estoy cansada (a woman) · ¿Estás cansada? (to a woman). Say subject, not speaker: with tú it is the person being asked, and the speaker-shaped version of this rule is exactly the defect the third Marathi review had to correct three times.',
        'por vs para stays OUT of L1: this module needs por only inside the fixed por qué and por eso, and para has no job any of these ten modules can give it. Say so in the notes so a later author does not import the contrast a level early.',
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M10': {
      id: 'L1-M10',
      title: 'Connected talk',
      job: 'Short 2–3 sentence exchanges',
      patterns: [
        '<M1–M9 pattern> + <M1–M9 pattern>',
        '<question> → <answer + porque + reason>',
        '<statement> + y/pero + <statement>',
      ],
      notes: [
        'Each item is a TURN of 2–3 short sentences, not one long one — a question and its answer, or a statement, a reason and a follow-up. The per-sentence bound applies to each sentence inside the turn.',
        'Recombination is the lesson: nearly everything comes from M1–M9. The honest new spend is the joiners that make a turn hold together — y, pero, también, entonces — and little else.',
        'Keep the turns everyday and symmetric: greeting → wellbeing → plan (¿Cómo estás? · Estoy bien, gracias. · Mañana voy a trabajar.); want → reason → buy.',
        'A turn is where pro-drop is most tempting to break: once the person is established Spanish keeps dropping the pronoun, and a yo at the head of every sentence reads as insistence or contrast, not as neutral speech. That, not "Spanish drops pronouns", is the rule to state.',
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M1': {
      id: 'L2-M1',
      title: 'Asking politely',
      job: 'Requests, thanks, apologies in the right register',
      patterns: [
        '¿Puede/Puedes + V-inf?',
        '¿Me da/das + un/una + N?',
        'Perdone/Disculpe + , + <request>',
        'Lo siento + , + <statement>',
        'Muchas gracias + , + <closing>',
      ],
      notes: [
        'REGISTER, decided for the whole level and repeated here because a prompt only ever shows an author the notes (the full record is docs/53-en-es-L2-brief-decisions.md). L1-M2 already taught usted on a row of its own — ¿Cómo está usted? is a display sentence there, and the es / está / quiere notes already say "…and usted" — so this module does NOT introduce the pronoun. It teaches the FRAME, which is where politeness actually lives: a bare imperative, ¿Puede…?, ¿Me da…?. Write the same request in both addresses side by side — ¿Me pones un café? (a friend) beside ¿Me pone un café, por favor? (a counter) — and let #422\'s chip carry the tier: tú-only frames chip `informal`, the usted frames and the perdone / disculpe end chip `formal`, anything safe with either stays `neutral`.',
        'The slogan to kill: "usted is formal, tú is informal". It is false in both directions — in Spain tú is ordinary with a shop assistant, and across much of Colombia and Central America usted goes to a grandchild out of affection. State the law that IS invariant instead: usted takes the él/ella verb form while still meaning "you" (usted puede, never *usted puedes), and the choice of address is a claim about the relationship, not a rung on a politeness ladder. Put the regional facts in usage, never in a rule.',
        'The grammar of the module is the stem change, and L1 shipped both patterns without ever naming them: quiero / quieres (e→ie, L1-M1 and M3) and cuesta (o→ue, L1-M8). Name the law here because a request needs poder: puedo · puedes · puede, with the change in the STRESSED syllable and nowhere else — which is why the nosotros cell M6 teaches is podemos, not *puedemos. Tag it delta and point back at both L1 rows; this is a rest point disguised as new grammar.',
        'Apology and thanks: Lo siento is regret for something that happened, Perdone / Perdona is asking to be excused before you interrupt, and Disculpe is the neutral street-and-counter form — English "sorry" covers all three and picking one by feel is the interference to spend a mistake on. Perdón (L1-M10\'s key) is re-taught here, not owned. Thanks climbs gracias (L1-M2) → muchas gracias → muchísimas gracias, and de nada (L1-M10) answers all three.',
        "INDEX SEAM: me, puedo, puedes, puede, da, das, dar, perdone, disculpe and siento are fresh keys. The bare me is THIS module's, not M5's: L1 indexed me llamo, me gusta and me levanto whole, so the bare key was free, and ¿Me da…? is the first frame in the course that needs it — first occurrence wins, so the row is opened here with a note true of the clitic and naming the three L1 phrases it is not. Lo siento is indexed WHOLE, as L1-M1 indexed Me llamo, so that the bare lo stays free for M5's direct object — a two-token surface is how this course keeps a later module off an earlier module's note. Muchas gracias likewise rides whole, leaving gracias L1-M2's. por favor stays L1-M8's row: it is re-shown in half the frames here and owned by none of them.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M2': {
      id: 'L2-M2',
      title: 'Describing people',
      job: 'Appearance, character, relationships',
      patterns: [
        '<person> + es + Adj',
        '<person> + está + Adj',
        'Tengo/Tiene + un/una + N',
        'Tiene + el/los + N + Adj',
        'Es mi + N',
      ],
      notes: [
        'The third pillar of English "to be": Spanish describes a feature with TENER, not with ser or estar — Tiene los ojos verdes, Tiene el pelo largo, where English says "has green eyes" but also "is tall-haired" in half its idioms. tener is irregular in the yo cell (tengo) and stem-changing everywhere else (tienes, tiene) — M1\'s e→ie law, paid a second time. The article where English wants a possessive is part of the frame: tiene EL pelo largo, not *su pelo.',
        'ser and estar again, and this time the pair that changes MEANING rather than aspect: es listo (clever) beside está listo (ready); es aburrido (a boring person) beside está aburrido (bored right now). This is the honest sequel to L1-M2, which split identity from condition; with a character adjective the same split produces two different words in English, and that is the module\'s best mistake block. The L1 slogan stays dead — "permanent vs temporary" explains neither pair.',
        'The family and person set: hermano (a FRESH key — L1-M4 taught only hermana / hermanas, and this row points back at it), padre, madre, padres, hijo, hija, amigo, amiga; alto, bajo, joven, mayor, delgado, moreno, rubio, simpático, amable; pelo, ojos. Author them in gendered pairs so M3 inherits a grid rather than a list.',
        'mayor is this module\'s key, not M9\'s: it means "older" of a person here and "greater" as a comparative there, and first occurrence wins, so write the note true of both jobs now and let M9 cross-reference it. The same discipline governs bueno: its key is L1-M10\'s discourse "well, …", so a good PERSON is written buena persona or es muy amable, and masculine singular bueno never appears in a display in this course. M3 restates the rule for things.',
        "INDEX SEAM: tengo, tienes, tiene, hermano, padre, madre, hijo, hija, amigo, amiga, alto, bajo, joven, mayor, listo, simpático, amable, pelo, ojos are fresh keys. está and es stay L1-M2's rows (their forms already carry están and son); this module re-teaches them and owns neither. Every adjective row lists the four cells the LEVEL shows — alto · alta · altos · altas — because a paradigm has one home, and M3 shows the grid rather than opening second rows.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M3': {
      id: 'L2-M3',
      title: 'Describing things',
      job: 'Size, colour, quality — agreement at length',
      patterns: [
        'el/la + N + es + Adj',
        'los/las + N-pl + son + Adj-pl',
        'un/una + N + Adj',
        'un gran + N + / + un + N + grande',
        'Es + muy + Adj',
      ],
      notes: [
        '"At length" is the job: L1 flashed corners of the grid (rojo / roja / rojos / rojas at M3, caro at M8, the -o/-a feelings at M9) and this module walks all of it. The law by ending, and it is the true one: an adjective in -o has four cells; one in -e or in a consonant (grande, verde, azul, fácil, joven) has TWO — it never marks gender, only number; one in -or, -án or a nationality adds -a (trabajador → trabajadora, español → española, which L1-M1 already shipped). The shortcut to refuse is "-o is masculine, -a is feminine": it is about NOUNS, it is false (el día, la mano, el problema), and it does not describe agreement at all.',
        'The one shape change worth teaching: grande apocopates to gran before ANY singular noun, and the position moves the meaning — un gran libro is a great book, un libro grande is a big one. English does this with stress and word choice, so both halves are delta. Keep the rest of the position rule simple: the adjective follows the noun, and the exceptions are lexical, not a system to open here.',
        'Colours are the vocabulary spend and they rehearse the split: negro, blanco, amarillo bend through four cells; verde and azul mark number only; rojo (L1-M3) is re-taught, not owned. Pair each colour with an L1 noun so the grid is drilled against words the learner already has — la puerta es azul, los libros son verdes.',
        "muy against mucho, and the classic error to spend a mistake on: muy modifies an adjective (muy caro, muy fría), mucho modifies a verb or counts a noun (me gusta mucho, mucha agua). *Muy me gusta and *Es mucho caro are both wrong and both are literal English. Neither key is this module's — muy is L1-M8's and mucho is L1-M1's — so the note re-teaches the pair without opening a row.",
        'The bueno rule, restated for things: the key is L1-M10\'s discourse "well, …", so this module writes buena, buenos, buenas freely and never shows masculine singular bueno in a display. When a masculine singular "good" is genuinely needed, the sentence takes está muy bien or es estupendo instead; M9\'s mejor picks the family up. malo is free and IS this module\'s, with L1-M9\'s mal (badly) cross-referenced in its note.',
        "INDEX SEAM: grande, gran, grandes, negro, blanco, amarillo, verde, azul, largo, corto, nuevo, viejo, fácil, difícil, malo are fresh keys, each row carrying the cells this level shows. son stays L1-M2's (es's forms list). Accents are letters: fácil and difícil are written with them every time, or the index gains two words nobody meant.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M4': {
      id: 'L2-M4',
      title: 'Getting around',
      job: 'Directions, transport, asking the way',
      patterns: [
        'Perdone + , + ¿dónde está + el/la + N?',
        '¿Cómo se va a + el/la + N?',
        'Siga/Gire/Cruce + <direction>',
        'a la derecha / a la izquierda / todo recto',
        'Voy en + N-transport',
      ],
      notes: [
        "This module talks to strangers: usted throughout, chipped `formal`, and it is where M1's frames are spent in the field. The usted imperative is the new cell — siga, gire, cruce, tome, and perdone from M1 — formed from the yo stem with the OTHER vowel (sigo → siga, giro → gire), which is the shape the subjunctive will reuse in L3; say that it is coming and do not open it. A tú imperative (sigue, gira) is named in usage and never shown, because the street scene does not motivate it.",
        'hay against está, the split L1-M7 set up and this module has to decide: hay introduces something whose existence is the news, and it never takes a definite article (Hay un banco en la plaza, ¿Hay una farmacia cerca?); está locates something both speakers already know (El banco está al lado de la plaza). *Hay el banco is the error, and it is the exact shape of English "there is the bank". Both keys are L1\'s — hay at M7, está at M2 — so this module owns neither and re-teaches both.',
        'Impersonal se, and it is this module\'s key: ¿Cómo se va a la estación? — "how does one get there", the frame that lets a learner ask directions without conjugating anything. L1 kept the bare se free by indexing Me llamo, se llama and se levanta whole, so write the note true of BOTH jobs now — the impersonal here, the reflexive there — or M5\'s se acabó and every later impersonal lands on a note that is false of it.',
        "The direction phrases are indexed WHOLE — a la derecha, a la izquierda, todo recto — because a is L1-M4's (\"at eight\", the personal a) and todo is L1-M8's, and a bare direction word would put the learner on either note. This is the same tool L1 used for al lado de. cerca and lejos stand bare and ARE this module's; cerca de stays L1-M7's phrase, so the note says which is which.",
        "INDEX SEAM: se, siga, gire, cruce, tome, derecha, izquierda, recto, cerca, lejos, calle, plaza, esquina, estación, autobús, metro, tren, coche, taxi, primera, segunda are fresh keys. dónde, en, hay, al and al lado de stay L1-M7's; a stays L1-M4's. Place names (Madrid, la Gran Vía) never index (#61), so anchor every direction on a common noun.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M5': {
      id: 'L2-M5',
      title: 'Food and hosting',
      job: 'Ordering, offering, refusing without offence',
      patterns: [
        'Para mí + , + un/una + N',
        '¿Me pone/trae + un/una + N?',
        '¿Quieres otro/otra + N?',
        'No + , + gracias + , + <reason>',
        'Creo que + <statement>',
      ],
      notes: [
        "para enters HERE and does exactly one job in this level: the recipient. Para mí, una sopa is how a table orders, and para ti / para ella extend it. The por / para contrast is L3's and is named as deferred in this note, because L1 already refused it (L1-M9) and importing it now would spend the module's budget on a distinction none of the ten L2 jobs needs. Bare por stays unowned through the whole level — it appears only inside por favor, por qué and por eso.",
        "The clitic pronoun system is completed here — M1 already opened bare me for its ¿Me da…? frame, so this module points back at that row rather than re-teaching it — and the index decides its shape: te and lo are still free keys, but la, los and las are L1-M1's ARTICLES, so a feminine or plural direct object can never be first-taught in this course. Teach the law on lo (¿El pan? Lo quiero caliente) and on te, with me re-shown on M1's row (¿Me pone un café?), say in the note that the feminine and plural forms exist and wait for L3, and never write a display sentence that needs them. The placement rule is the delta: the pronoun goes BEFORE the conjugated verb (Lo quiero), where English puts it after.",
        "que is this module's key and it earns it twice: as the linker after a verb of thinking or saying (Creo que está frío, Dice que no viene) — which English can drop and Spanish never can, the interference to spend a mistake on — and as the second half of M9's comparative (más caro que). Write the note true of both jobs now; M9 points back rather than opening a second row. It is not L1-M4's qué: the accent is the whole difference, and dropping it merges a question word into a conjunction for the rest of the course.",
        "Offering and refusing: otro / otra carries the offer (¿Quieres otro café?) precisely so that más stays free for M9's comparative — and note that otro takes NO article, so *un otro café is the error English speakers write. Refusing without offence is the cultural half of the job: a first no is often ritual, the accepted refusal adds a reason (No, gracias, ya he comido → in L2's tenses, No, gracias, no tengo hambre), and tener hambre / tener sed are tener doing the job English gives \"to be\" — M2's verb, a third time.",
        "INDEX SEAM: para, lo, me, te, que, otro, otra, pone, trae, creo, dice, carne, pescado, verdura, arroz, postre, cuenta, vaso, plato, hambre, sed are fresh keys. Lo siento stays M1's whole-phrase row, which is what left bare lo free for this module; bare me stays M1's row. Me gusta, me llamo and por favor stay L1's whole-phrase rows; the bare me taught here is the clitic, and its note names all three so the learner is never told that me means only one thing.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M6': {
      id: 'L2-M6',
      title: 'Making plans together',
      job: 'Invitations, suggestions, settling a time',
      patterns: [
        '¿Quieres + V-inf?',
        '¿Vamos a + V-inf?',
        'Podemos + V-inf',
        '¿A qué hora?  — A las + <number> + y media/cuarto',
        'Vale + , + <arrangement>',
      ],
      notes: [
        "Plans are made among friends: tú and nosotros throughout, chipped `informal` where the frame is tú-only, and the register law of M1 applies in reverse — an usted invitation reads as a business appointment, which is M7's scene, not this one. Say so in usage.",
        'The nosotros cell arrives, and it is the last person the course was missing: -amos / -emos / -imos (hablamos, comemos, vivimos, podemos, vamos). L1-M6 already shipped vamos inside vamos a — this module opens the cell properly and points back. The delta worth naming: Spanish makes a suggestion with the plain nosotros present (¿Vamos al cine?), where English needs "shall we" or "let\'s" — the auxiliary has no Spanish equivalent, and reaching for one is the error.',
        'The arrangement present: a settled plan is spoken in the PRESENT (Mañana como con Ana, El sábado vamos a la playa), not only with L1-M6\'s voy a. English does the same thing ("I\'m eating with Ana tomorrow"), so this is transfer and a rest point — say so, and let the time word carry the future rather than the verb.',
        'The clock is the vocabulary spend: tres, cuatro, cinco, seis, siete, nueve, once, doce beside L1-M8\'s uno, dos, ocho, diez; y media, y cuarto, en punto. The frame is ¿A qué hora…? — A las ocho, with a re-taught from L1-M4 ("before a clock time it is at") and hora from L1-M4 as well; neither is owned here. menos cuarto is real and is deliberately NOT shown: menos is M9\'s key and the comparative note it will carry must be its first, so a usage line names the clock use and M9 delivers it.',
        "INDEX SEAM: día, tarde, podemos, comemos, vamos a (as the frame), quedamos, vale, tres, cuatro, cinco, seis, siete, nueve, once, doce, media, cuarto, fin de semana, viernes, domingo, cine are fresh keys. día and tarde are bare keys L1 left free by indexing todos los días, buenos días, todo el día and por la tarde whole — the note says so, because a learner who has met four phrases containing día has never met the word. mañana stays L1-M6's (\"tomorrow\"), and por la mañana stays L1-M4's phrase. cuarto is the clock's quarter here and not a room; the room word is not taught in this course. vale is Spain's — a usage line gives Mexico's sale and the neutral está bien, and no rule claims one is standard.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M7': {
      id: 'L2-M7',
      title: 'On the phone',
      job: 'Calls and messages — openings, closings, taking a message',
      patterns: [
        '¿Dígame? — ¿Está + <name>?',
        'Soy + <name> + , + ¿de parte de quién?',
        'Estoy + V-ando/-iendo',
        '¿Le puedo dejar un mensaje?',
        'Te llamo + <time>',
      ],
      notes: [
        'A business call speaks usted, chipped `formal`; a call to a friend keeps tú, and both belong in this module because the phone is where the choice is made blind — you cannot see who answered. The openings are regional and a rule must not pick one: ¿Dígame? and ¿Diga? in Spain, ¿Aló? through much of South America, and ¿Bueno? in Mexico. That last one is a gift the index arranged: bueno\'s key is L1-M10\'s discourse "well, …", so the phone answer is named in usage and never first-taught, and the learner meets it as a second job of a word they own.',
        'The gerund, and this is the module that motivates it: a call happens NOW, so estar + -ando / -iendo finally has a job (Está hablando, Estoy comiendo, No puede ponerse, está trabajando). The delta is what it does NOT do — Spanish never uses it for the future the way English does. *Mañana estoy trabajando for "I\'m working tomorrow" is wrong, and the right sentence is M6\'s arrangement present, Mañana trabajo. Spend the mistake there, not on the formation.',
        'Te llamo mañana is the payoff of a decision L1 made in its very first module: Me llamo was indexed as a two-token surface, which left llamo and llama free, so "I call you" and "my name is" are different keys with different notes. Write llamo\'s note so it says this out loud — the same verb, two jobs, told apart by the little pronoun — because a learner who has said Me llamo Rohan for ten modules will read Te llamo as "I name you" otherwise.',
        "The indirect object le is this module's key (¿Le puedo dejar un mensaje?, Le digo que ha llamado → in L2's tenses, Le digo que llamó). L1 left it free by indexing le gusta whole, and the note must be true of both: le names the person something is done TO or FOR, which is exactly why gustar reads the way it does. decir is the verb: digo, dice, and the usted imperative dígame from M4's rule, irregular in the yo cell like tengo.",
        "INDEX SEAM: le, llamo, llama, dígame, diga, digo, dice, mensaje, número, móvil, quién, ahora, luego, hablando, comiendo, ponerse are fresh keys. quién is qué's sibling (L1-M4) and cuál's (M9) — cross-reference all three, merge none. luego is free because L1-M10 indexed hasta luego whole. está is L1-M2's row doing availability here (¿Está Ana? = \"is Ana there?\"), a third job for a key this course does not own; say so rather than opening a row it cannot have.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M8': {
      id: 'L2-M8',
      title: 'When something goes wrong',
      job: 'Problems, asking for help, complaining calmly',
      patterns: [
        'Me duele + el/la + N',
        'No funciona + el/la + N',
        '¿Me puede ayudar?',
        'Tengo que + V-inf',
        'Perdone + , + creo que hay un problema',
      ],
      notes: [
        'doler is the structural payoff of the whole course: it is built exactly like gustar (L1-M1) — Me duele la cabeza, Me duelen los pies — so the thing that hurts is the SUBJECT and the verb agrees with it, while me only names who feels it. The lesson is not a second quirk; it is that gustar was never a quirk. Say that explicitly, name the class (gustar, doler, and the interesar / parecer the learner will meet in L3), and note the article where English wants a possessive: me duele LA cabeza, never *mi cabeza.',
        "tener que + infinitive is the obligation frame, and it is this module's other new structure: Tengo que ir al médico. English \"have to\" is a near-perfect match, so this is transfer — but que is obligatory (*Tengo ir is the error) and que's row is M5's, re-taught here and owned there. hay que (impersonal obligation) is named in usage and left to L3.",
        "Problems and calm complaint: no funciona, está roto / rota, se ha perdido → in L2's tenses, he perdido is OUT (the perfect is L3), so the past here is L1-M5's preterite: perdí el móvil, no llegó el paquete. The complaint frame is Perdone, creo que hay un error — M1's apology, M5's creo que, L1-M7's hay — and the module's job is that it stays calm: Spanish complains through the frame, not through volume, and an unsoftened No funciona reads as an accusation.",
        'problema pays off a promise L1-M1\'s gender note made in passing: it is masculine despite the -a, because it is one of the Greek -ma nouns (el problema, el tema, el sistema). This is where the promise is kept, and it is the best evidence against the "-o/-a" shortcut the course has refused three times. Author it with its article every time.',
        "INDEX SEAM: duele, duelen, ayudar, ayuda, funciona, roto, rota, problema, error, médico, cabeza, pies, paquete, tengo que (as the frame) are fresh keys. me stays M5's clitic row and le stays M7's; mal is L1-M9's (badly), re-taught here in me encuentro mal and owned there; malo stays M3's. This module speaks usted to staff and strangers, chipped `formal`, and tú only where the scene is a friend — the register law of M1, in the module where the temperature is highest.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M9': {
      id: 'L2-M9',
      title: 'Comparing and choosing',
      job: 'More, less, better — stating a preference',
      patterns: [
        'A + es + más/menos + Adj + que + B',
        'el/la + más + Adj',
        'A + es + mejor/peor + que + B',
        '¿Cuál prefieres? — Prefiero + este/esta',
        'Este + N + es + Adj-er + , + pero + <statement>',
      ],
      notes: [
        'The comparative is two words around the adjective and nothing else changes: más caro que, menos caro que — no ending, no vowel change, where English forks between -er and "more". The superlative adds the article to the same frame: el más caro, la más barata, and the group is marked with de, not "in" (el más caro DE la tienda) — that preposition is the delta English speakers miss.',
        'tan … como is deliberately NOT taught, and the reason is worth stating in the note because it is the clearest case in this course of the index deciding the syllabus: como is L1-M4\'s key, where it means "I eat". A comparison written tan alto como would send the learner to an eating note for the rest of the course, and no later row can take the key back — first occurrence wins. Equality comparison is therefore L3\'s, where it can be authored with the seam planned for; a usage line may say the structure exists.',
        'The irregular four, and the true law: mejor and peor replace *más bueno and *más malo, and mayor and menor replace *más grande / *más pequeño when the meaning is age or abstract size. mejor serves BOTH bueno and bien — Canta mejor is "sings better", from the adverb — which is the fact the slogan "mejor is the comparative of bueno" hides. mayor is M2\'s key ("older", of a person) and this note points back at it rather than opening a second row.',
        'Choosing needs the demonstratives and the choice question: este, esta, estos, estas ("this one here") beside ese / esa, and ¿Cuál prefieres? against ¿Qué prefieres? — cuál picks from a known set, qué asks open. qué is L1-M4\'s key and cuál is fresh, so cross-reference and merge nothing. preferir is e→ie once more (prefiero, prefieres, prefiere): M1\'s law, its third payment, and by now a rest point.',
        "INDEX SEAM: más, menos, mejor, peor, menor, barato, pequeño, prefiero, prefieres, cuál, este, esta, estos, estas are fresh keys. que stays M5's row, whose note was written true of this job for exactly this reason. esta and está are two keys ONLY while the accent is written — L1-M2's accent law at its sharpest, because here the two words sit in the same sentence shapes (Esta sopa está fría). mucho and muy stay L1's; más is not a synonym for either and its note should say so.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M10': {
      id: 'L2-M10',
      title: 'Telling what happened',
      job: 'A four-sentence account in the past',
      patterns: [
        '<imperfect background> + , + <preterite event>',
        '<preterite event> + y + <preterite event>',
        '<preterite event> + porque + <imperfect reason>',
        'Al final + , + <preterite event>',
      ],
      notes: [
        'Each item is an ACCOUNT of exactly four short sentences, not one long one, and the per-sentence bound applies to each sentence inside it. Almost every word comes from L1 and from M1–M9; the honest new spend is the third-person preterite cells a story needs (dijo, tuvo, pudo, llegó, perdió, llamó, fue) and había, the imperfect of hay.',
        'THE decision of the module, and the reason it exists: L1-M5 taught the preterite AND the imperfect endings and deliberately did not teach the CHOICE. Here it is, and the rule must be the true one — the imperfect paints the standing situation the story happens against (what was already going on, what things were like, the time, the weather, a habit), and the preterite moves the story forward one completed step at a time. Era tarde y no había nadie en la calle. Entonces llamé a Ana.',
        'The slogan to kill, and it is the most damaging one in Spanish teaching: "the preterite is for completed actions, the imperfect for ongoing ones". It breaks on the first real account. Ayer comí a las ocho is completed and so is Comí allí todos los días de mi infancia if the speaker frames it as one bounded stretch; Comía cuando llamaste is not "ongoing" in any objective sense — it is background for the call. Duration does not decide it and repetition does not decide it; the ROLE the clause plays in the telling decides it. Author the pairs so the same event appears in both roles.',
        'Build the accounts out of scenes the ladder already supports: a plan that fell through (M6 + M8), a call that came at the wrong time (M7), a meal that was wrong (M5 + M8), directions that failed (M4). Join them with the connectors L1-M10 shipped — y, pero, entonces, también — plus después (L1-M6), luego (M7) and al final. Keep pro-drop: once the subject is established the account keeps dropping it, and a yo at the head of every sentence reads as insistence, which is the rule L1-M10 stated and this module tests hardest.',
        "Nothing new is opened here: no perfect (he llegado is L3), no conditional, no subjunctive, no tan … como. INDEX SEAM: dijo, tuvo, pudo, llegó, perdió, llamó, había and al final are fresh keys, each a new CELL of a verb whose bare row lives elsewhere — its note points back to the first-teach row (dijo → M7's dice, tuvo → M2's tiene, pudo → M1's puede) and no L1 or earlier-L2 file is edited to accommodate it. fue is already L1-M5's, and it answers for both ir and ser — say so, because an account uses both.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
    'L3-M1': {
      id: 'L3-M1',
      title: 'Your day, in detail',
      job: 'Longer habitual narration with sequencing words',
      patterns: [
        'Suelo + V-inf',
        'Primero … luego … después … al final …',
        'Normalmente + me + V-o + a + las + <hour>',
        'Casi siempre / Casi nunca + V-o',
        'A veces + V-o + , + pero + V-o',
      ],
      notes: [
        'THE grammar of the module is soler + infinitive — suelo levantarme temprano, suele comer en casa — which is how Spanish says "usually" without an adverb. English has no verb for it at all, so the MOVE is the delta and not the vocabulary: tag it delta and say plainly that a Spanish speaker reaches for soler where an English speaker reaches for an adverb. The infinitive after it carries the reflexive pronoun on its end (levantarme, ducharme), which is the second half of the same lesson.',
        'FREQUENCY is the level of detail L1-M4 could not reach: siempre, casi siempre, normalmente, a veces, casi nunca, nunca. Two facts they carry: nunca before the verb needs NO other negative (Nunca como carne), and after it the sentence takes one (No como carne nunca) — the double negative English forbids is obligatory in Spanish once the word follows. Author both orders, and spend a mistake block on the version an English speaker builds.',
        "Reflexive routine verbs are the vocabulary spend and the only one: me ducho, me visto, me acuesto, me despierto, beside L1-M4's me levanto. Each is a fresh single-token key deconstructed here, with its note pointing back at L1-M4's row — the forms policy of docs/53 §2, unchanged. The bound climbs to ten words and an item may run two sentences: this is L1-M4's single habituals grown into a paragraph.",
        "The sequencing spine is already owned — primero (L2-M4), luego (L2-M7), después (L1-M6), entonces (L1-M10), al final (L2-M10) — so almost nothing is spent on connectors. Keep every clause in the simple present: the preterite and imperfect are L2-M10's and the perfect is M7's, and naming them in a usage line is fine while writing them here is not.",
        "INDEX SEAM: suelo, sueles, suele, levantarme, ducharme, me ducho, me visto, me acuesto, me despierto, siempre, nunca, normalmente, casi and a veces are fresh keys. a veces indexes WHOLE, because bare vez has no row and a is L1-M4's — the multi-token tool of docs/53 §3, used the same way a la derecha used it. me levanto stays L1-M4's, and every sequencer stays where it was first taught.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
    'L3-M2': {
      id: 'L3-M2',
      title: 'Work and study',
      job: 'Explain what you do all day, and how',
      patterns: [
        'Trabajo para + <company> + , + por + <hours>',
        'Estudio para + V-inf',
        'Tengo que + V-inf',
        'Sé + V-inf + , + pero + no conozco + N',
        'Hay que + V-inf',
      ],
      notes: [
        'THE decision of the level lands here: por AGAINST para becomes a system, which docs/53 §4 deferred from L2 for exactly this module. The working law, stated as what each DOES rather than as a translation, because both are "for": para points FORWARD to a purpose, a destination or a deadline (estudio para ser médico, es para ti, para el lunes); por points at a cause, an exchange, a duration or a route (trabajo por dinero, gracias por todo, por la mañana, por aquí). Author minimal pairs — trabajo para una empresa against trabajo por la mañana — and let the pool test which the context wants.',
        'saber against conocer is the second delta and it costs one sentence to state: saber is a FACT or a SKILL and takes a clause or an infinitive (sé dónde está, sé conducir); conocer is an ACQUAINTANCE and takes a person, a place or a thing (conozco a María, conozco Madrid). English\'s single "know" hides the split, and work is where a learner needs both in the same breath. Note the personal a on conozco a María, which L2 never had a reason to show.',
        'Obligation gets its three frames and no more: tengo que + infinitive (personal), hay que + infinitive (impersonal — one has to), and debo + infinitive (a duty, and the most formal of the three). They are not interchangeable and the difference is who is obliged, so a note that says only "must" has taught nothing.',
        'Work vocabulary is the rest of the spend: empresa, jefe, reunión, sueldo, horario, carrera, examen, aprobar. Prefer what a speaker actually says and put a regional twin in usage rather than in a display — the discipline that kept masculine bueno out of every en-es display (docs/53 §3).',
        "INDEX SEAM: por, para (L2-M5's row, doing its second job — point back and write the rule around it rather than opening a second), sé, conozco, hay que, tengo que, debo, empresa, jefe, reunión, sueldo, horario, carrera, examen and aprobar are the keys at issue. Bare por is unowned at the end of L2 and this module takes it; its note must be true of por la mañana, por favor and por qué, all of which are already indexed WHOLE and stay where they are. hay que and tengo que index whole, because bare que is L2-M5's.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
    'L3-M3': {
      id: 'L3-M3',
      title: 'Opinions with reasons',
      job: 'Agree, disagree, soften — reasons attached',
      patterns: [
        'Creo que + <indicative>',
        'No creo que + <subjunctive>',
        'Me parece que + <clause>',
        'No es tan + Adj + como + <N>',
        'Estoy de acuerdo + , + aunque + <clause>',
      ],
      notes: [
        "THE SUBJUNCTIVE OPENS HERE, on the one trigger a learner cannot miss: creo que takes the INDICATIVE and no creo que takes the SUBJUNCTIVE. Creo que es fácil against No creo que sea fácil. That is the whole of what this module teaches of the mood — one contrast, one pair of verbs (sea, tenga, pueda, vaya), and the system itself is named as L4's. A module that opened the subjunctive as a paradigm would spend the level on it and teach a learner nothing they could say.",
        'Softening is what an opinion needs and Spanish softens with the FRAME, exactly as L2-M1 said of requests: me parece que, yo diría que, la verdad es que, no sé si. None of them weakens the claim; they place it. An English speaker hedging the claim itself ("it might be a little bit wrong") sounds evasive rather than polite, and usage should say so without judging either language.',
        'tan … como arrives at last, and docs/53 §3 held it out of L2 for an index reason that is still true: como is L1-M4\'s "I eat". So the surface is indexed WHOLE as tan … como is written — tan fácil como, tan caro como — with tan carrying the row and the note saying why the bare como underneath belongs to a verb. It is the clearest case in the repo of a syllabus decision and an index decision being one decision, and this is where it is paid.',
        'Agreeing and disagreeing need frames, not vocabulary: estoy de acuerdo, no estoy de acuerdo, depende, sí pero. aunque ("although") joins a concession, and at this level it takes the indicative — the subjunctive after aunque is L4\'s and is named as deferred. sin embargo is the heavier written twin and goes in usage.',
        "INDEX SEAM: sea, tenga, pueda, vaya, tan, aunque, depende, estoy de acuerdo, me parece and de acuerdo are fresh keys. tan … como indexes as the multi-token surfaces the sentences write. creo is L2-M9's row and is not re-opened; que stays L2-M5's, with a note here that is true of the opinion-clause job too; parece is fresh and pointed at by M6, which will need it again for the gustar family.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
    'L3-M4': {
      id: 'L3-M4',
      title: 'If and then',
      job: 'Conditions, wishes, advice',
      patterns: [
        'Si + <present> + , + <present/future>',
        'Si + tuviera + N + , + V-ría',
        'Yo que tú + , + V-ría',
        'V-ré + <complement>',
        '¿Podría + V-inf + ?',
      ],
      notes: [
        'The real conditional first, and it is easy: si + PRESENT, then present or future — Si llueve, no salgo. Si tienes tiempo, te llamo. The trap worth a mistake block is that Spanish NEVER puts a future after si: *Si lloverá does not exist, where English happily says "if it will rain". One sentence of rule, one plate, done.',
        "The -ré future opens beyond the three cells L1-M6 shipped (iré, seré, and one more): haré, tendré, podré, diré, vendré. The delta to state is that Spanish already had a future — voy a + infinitive, L1-M6's — and the -ré form is the WRITTEN and more distant one, not a replacement. A learner who thinks they were taught the wrong future in L1 has been taught badly here.",
        "The conditional -ría is the module's most useful shape and it is bought for advice and for politeness, not for grammar: yo que tú, iría al médico; ¿podría ayudarme? docs/53 §4 deferred podría from L2 for exactly this, which is why L2-M1 and L2-M8 bought their politeness with frames instead. Teach the endings on a handful of verbs and no more.",
        'EXACTLY ONE COUNTERFACTUAL FRAME: si + imperfect subjunctive, then the conditional — Si tuviera tiempo, iría. The full imperfect subjunctive is L4-M3\'s ("What might have been", docs/48 §4) and is named as deferred here. One frame is enough to say a wish; a paradigm here would swallow the module.',
        "INDEX SEAM: si, haré, tendré, podré, diré, vendré, -ría cells (iría, sería, podría, tendría, haría), tuviera, fuera and yo que tú are fresh keys. si and L1-M2's sí are TWO keys, because accents are letters (L1-M2's law) — say so in the row's note, since the two sit one keystroke apart and mean opposite things. iré and seré stay L1-M6's rows; puede stays L2-M1's, and podría points back at it.",
      ],
      maxWordsPerSentence: 11,
      newWordCap: NEW_WORD_CAP,
    },
    'L3-M5': {
      id: 'L3-M5',
      title: 'What someone said',
      job: "Reporting other people's words",
      patterns: [
        'Dijo que + <clause, backshifted>',
        'Me preguntó si + <clause>',
        'La vi + <complement>',
        'Los conozco + <complement>',
        'Le dije que + <clause>',
      ],
      notes: [
        "Reporting backshifts the tense, exactly as English does, and that is the good news: dice que viene → dijo que venía; dice que vendrá → dijo que vendría. The present becomes the IMPERFECT (L2-M10's tense, doing a second job) and the future becomes the conditional (M4's). Nothing new is opened for either — this module spends its budget on the frame and on the clitics below.",
        'A yes/no question is reported with si and never with que: Me preguntó si tenía tiempo. A wh-question keeps its word and its accent: Me preguntó dónde vivía. Both are one line of rule and one plate each, and an English speaker gets the first one wrong by reaching for "that".',
        "THE OBJECT CLITICS la, los and las arrive, and docs/53 §3 held them out of L2 because they are spelled exactly like L1-M1's ARTICLES and the bare keys are hers forever. So they are taught the only honest way: as MULTI-TOKEN surfaces with the verb they lean on — la vi, los conozco, las tengo — each its own index key, with the note saying why the bare word underneath is an article. That is the same tool a la derecha used, and the reason maxSpan is 3.",
        "Order and placement are the delta an English speaker feels: the clitic goes BEFORE a conjugated verb (la vi) and may attach to an infinitive (voy a verla) — one choice, two spellings, and both are ordinary. le is L2-M7's row and is not re-opened; a sentence with both (se lo dije) is L4's and is named as deferred rather than shown.",
        "INDEX SEAM: preguntó, la vi, las vi, los conozco, las tengo, lo dije and the backshifted cells an account needs (venía, vendría, quería, sabía) are fresh keys. Every backshifted cell points back at the row of its bare verb and edits no L1 or L2 file. dijo and dije stay L2-M10's; si stays M4's, freshly opened there; que stays L2-M5's.",
      ],
      maxWordsPerSentence: 11,
      newWordCap: NEW_WORD_CAP,
    },
    'L3-M6': {
      id: 'L3-M6',
      title: 'Feelings in depth',
      job: 'Nuance past good and bad',
      patterns: [
        'Me + <gustar-verb> + <N>',
        'Estoy + Adj + , + no soy + Adj',
        'Tengo + <noun feeling>',
        'Tengo ganas de + V-inf',
        'Me da + <noun>',
      ],
      notes: [
        'ser AGAINST estar with an adjective is the module\'s spine, and it is not a rule about permanence: it CHANGES THE MEANING. Es aburrido is boring and está aburrido is bored; es listo is clever and está listo is ready; es rico is wealthy and está rico is delicious. L1 taught both verbs and L2 used both; this is where the pairs are put side by side and the slogan "ser is permanent" is retired, because está muerto is about as permanent as it gets.',
        "The gustar family grows into a CLASS: encantar, molestar, importar, doler (M7's), faltar, parecer. All of them run backwards from an English point of view — the thing liked is the SUBJECT and the person is an indirect object — so me encantan los libros has a plural verb because the books are plural. L1 shipped me gusta and me gustan as whole surfaces without naming the class; naming it turns six verbs into one pattern.",
        'Feelings Spanish keeps as NOUNS, where English uses adjectives: tengo miedo, tengo ganas de, tengo vergüenza, me da pena, me da igual. A learner translating "I am afraid" as soy miedoso has said something about their character. Author the tener set and the me da set together, because they are the two shapes the same idea takes.',
        "Vocabulary is the rest: contento (already L2's), enfadado, preocupado, orgulloso, harto, tranquilo. Keep the register plain — this module follows the scene and says which address in usage, per docs/53 §1 — and keep every clause in the present, because the past of a feeling is M10's business.",
        "INDEX SEAM: encantar cells (me encanta, me encantan), me molesta, me importa, me da igual, me da pena, tengo miedo, tengo ganas de, aburrido, listo, enfadado, preocupado, orgulloso and harto are fresh keys, the multi-token ones indexed whole because me and da would otherwise land on rows they do not belong to. me gusta, me gustan, le gusta and te gusta stay L1's whole surfaces; parece is M3's; contento, triste, cansado and nervioso stay where L1 and L2 taught them.",
      ],
      maxWordsPerSentence: 11,
      newWordCap: NEW_WORD_CAP,
    },
    'L3-M7': {
      id: 'L3-M7',
      title: 'Body and health',
      job: 'Say what hurts, and where',
      patterns: [
        'Me duele + el/la + <body part>',
        'Me he + V-participle',
        'Me duele desde hace + <time>',
        'Tengo + <symptom>',
        '¿Puede darme algo para + <N> + ?',
      ],
      notes: [
        'THE PERFECT OPENS HERE and docs/53 §4 deferred it from L2 for this module: he + participle, for something that has happened and still matters — me he hecho daño, he perdido las llaves, ¿has ido al médico? That "still matters" is the whole of the difference from L1-M5\'s preterite, and health is where a learner meets it first, because a symptom is by definition still true. In much of Latin America the preterite covers both; say so in usage and do not pretend the split is universal.',
        "The body part takes a DEFINITE ARTICLE where English takes a possessive: me duele la cabeza, never me duele mi cabeza. The indirect object me has already said whose head it is, and saying it twice is what marks a learner. doler is M6's gustar class in the field — L2-M8 shipped duele without naming the class, and this module points back at both rows rather than opening a third.",
        "Symptoms are tener nouns, matching M6's shape: tengo fiebre, tengo tos, tengo gripe, tengo náuseas. And the two questions a pharmacy needs: ¿Puede darme algo para la tos? and ¿Cada cuánto lo tomo? — both built from frames the learner already owns, with para doing M2's forward-pointing job.",
        'desde hace is the duration frame and it is a genuine delta: me duele desde hace tres días — "it has hurt for three days" — where Spanish uses the PRESENT and English the perfect. It is the mirror of the rule above and the two belong in one module so a learner can see they are not in conflict.',
        "INDEX SEAM: he, has, ha, hemos, the participles this module needs (hecho, perdido, ido, roto), desde hace, fiebre, tos, gripe, garganta, espalda, estómago, brazo, pierna, pastilla and farmacia are fresh keys. duele and cabeza stay L2-M8's rows; médico stays L1's; para stays L2-M5's with M2's rule around it; the perfect auxiliary is one row and every participle points back at its verb.",
      ],
      maxWordsPerSentence: 11,
      newWordCap: NEW_WORD_CAP,
    },
    'L3-M8': {
      id: 'L3-M8',
      title: 'Money and paperwork',
      job: 'Rent, bills, forms, offices',
      patterns: [
        'Aquí se + V-3sg',
        '¿Se puede + V-inf + ?',
        'Tengo que pagar + <N> + antes del + <date>',
        'Necesito + <document>',
        'Perdone + , + ¿dónde se firma?',
      ],
      notes: [
        "IMPERSONAL se is the module's grammar and it is everywhere in an office: aquí se paga en efectivo, no se puede fumar, ¿dónde se firma? It says a thing is done without saying by whom, which is what a sign and a counter clerk both want. L2-M4 opened the se row for the impersonal street sense; this module points back at it and shows the shape at length rather than opening a second family. The passive with ser is the written twin and is named as L4's.",
        'This module speaks usted throughout and chips formal, per docs/53 §1: a counter is exactly the place the register decision was made for. The usted imperative L2-M1 opened — perdone, disculpe, firme, rellene, espere — is spent here, and the frames stay the ones a learner owns (¿Me da…?, ¿Puede…?, ¿Podría…? from M4).',
        "Deadlines and amounts are where M2's por/para earns its second outing: para el lunes is a deadline, por adelantado is a manner, antes del día quince is a limit. Numbers above L1-M8's range come in as vocabulary and not as a system — a rent is four digits and a learner needs to say it.",
        'The vocabulary is the spend and it should be the words on an actual form: alquiler, factura, recibo, plazo, cita previa, formulario, firmar, rellenar, entregar, sello, DNI or documento. Prefer what appears on the paper over what a textbook prefers, and put the regional twin in usage.',
        "INDEX SEAM: alquiler, factura, recibo, plazo, formulario, firmar, rellenar, entregar, efectivo, cita, se paga, se puede, se firma and the usted imperative cells (firme, rellene, espere) are fresh keys, with the se + verb surfaces indexed WHOLE so L2-M4's bare se keeps its row. banco and cuenta stay L2's; problema stays L2-M8's; perdone and disculpe stay L2-M1's.",
      ],
      maxWordsPerSentence: 12,
      newWordCap: NEW_WORD_CAP,
    },
    'L3-M9': {
      id: 'L3-M9',
      title: 'Festivals and everyday culture',
      job: 'Talk about what is happening around you',
      patterns: [
        'El + <day> + hay + <event>',
        'Los + <day-plural> + <habitual>',
        'El + <ordinal> + de + <month>',
        'Estamos en + <season/month>',
        'Se celebra + <event> + en + <month>',
      ],
      notes: [
        'THE ARTICLE IS THE TENSE HERE, and it is a distinction English marks with different words entirely: el domingo is THIS Sunday and los domingos is EVERY Sunday. El viernes voy a una fiesta against Los viernes salgo con amigos. Spanish also takes no preposition at all — never en el domingo — which is the second half of the same trap and the one an English speaker builds first.',
        'Dates are read el + cardinal + de + month — el quince de agosto — with only the first of the month taking an ordinal (el primero, and in Spain el uno). Months and seasons are the vocabulary spend, and they are lowercase in Spanish, which is worth one line because a learner will capitalise them out of English habit.',
        'M8\'s impersonal se does its cultural job here: se celebra, se come, se regala. "What is done" is exactly how a festival is described, and pointing back at M8\'s rows rather than opening new ones keeps the module cheap enough to spend on the calendar.',
        'Festival vocabulary is chosen for what a learner will actually meet in the year they arrive, not for a list: fiesta, cumpleaños, regalo, Navidad, Semana Santa, Nochevieja, verbena or feria depending on the region. Name the regional spread in usage and let no display claim a festival belongs to the whole language.',
        "INDEX SEAM: día, domingo and the rest of the days, the months, primavera, verano, otoño, invierno, fiesta, cumpleaños, regalo, celebrar, and the ordinal primero are fresh keys where they are not already owned. todos los días and todo el día stay L1's whole surfaces and this module's los domingos must not be built in a way that collides with them — check the emitted index rather than assuming. se celebra and se come index whole, as M8's do.",
      ],
      maxWordsPerSentence: 12,
      newWordCap: NEW_WORD_CAP,
    },
    'L3-M10': {
      id: 'L3-M10',
      title: 'Your own story',
      job: 'An eight-sentence account, built from the whole ladder',
      patterns: [
        '<imperfect scene> + . + <preterite step> + . + <preterite step> + .',
        'Al final + <preterite> + , + y + <perfect>',
        'Cuando + <imperfect> + , + <preterite>',
        'Dijo que + <backshifted clause>',
      ],
      notes: [
        "Each item is an ACCOUNT of six to eight short sentences, and the per-sentence bound applies to each sentence inside it. Nearly every word has been met; the honest new spend is a handful of connectors (mientras, en cuanto, al principio) and whatever participles the story needs. This is the level's exit and it should read like a person talking, not like a drill.",
        "THREE PASTS NOW SHARE ONE ACCOUNT and each does its own job: the IMPERFECT sets the scene (L2-M10's), the PRETERITE moves it one step (L1-M5's), and the PERFECT (M7's) is what is still true at the moment of telling — Era tarde. Salí. Y desde entonces no he vuelto. That third slot is what L3 added, and the whole module is the place to show it doing something the other two cannot.",
        'cuando + imperfect against cuando + preterite is the sharpest pair in the level and belongs here: Cuando vivía en Madrid, trabajaba en un bar is habitual background; Cuando llegué, ya no estaba is one moment against another. Author it as a minimal pair, because it is the sentence a learner most often gets half right.',
        'SUBJECT DROPPING carries across the whole account, which L2-M10 named and this module tests at eight sentences rather than four. A yo at the head of every sentence reads as insistence; naming the speaker once at the start and once more when the subject genuinely changes is what a Spanish account does. Let the pool carry the over-pronouned version as the thing to notice.',
        'INDEX SEAM: mientras, en cuanto, al principio, desde entonces and any participle the accounts need are fresh keys. Everything else is a re-use, and that is the point of the module — nothing is opened that the ladder has not already paid for. cuando is fresh if the index still has it free at the end of M9; check the emitted file rather than assuming, per docs/53 §3.',
      ],
      maxWordsPerSentence: 12,
      newWordCap: NEW_WORD_CAP,
    },
  },
  'en-ar': {
    'L1-M1': {
      id: 'L1-M1',
      title: 'Who I am',
      job: 'Introduce yourself and state what you like',
      patterns: ['ismī + name', 'anā min + place', 'anā + N/Adj', 'uḥibb + al- + N', 'urīd + N'],
      notes: [
        'VARIETY, ratified for the whole course (#198) and repeated here because the prompt only ever shows an author the notes: this is Modern Standard Arabic, not a dialect — the fixture, the romanization scheme in courses.json and the native script line all assume it. The register is pinned to spoken-simple MSA: pause forms with no case endings (al-bayt, never al-baytu), no dual outside M8\'s counted "two", no passive, no lam/laysa negation, no literary vocabulary. Where the MSA form is understood everywhere but sounds formal in the street, say so in usage — never swap a dialect form into display.',
        'The law behind the slogan "Arabic has no verb to be": in the PRESENT AFFIRMATIVE a sentence that starts with a noun or a pronoun simply has no copula — ismī Rohān ("my-name Rohan") · anā min al-Hind ("I from the-India"). It is the present affirmative only: the past has kāna (M5) and the present negative needs laysa, which L1 does not teach. Inserting huwa (*ismī huwa Rohān) is the English habit and the mistake to show.',
        'The person lives INSIDE the verb, as a prefix: uḥibb = I-like, tuḥibb = you-like/she-likes, yuḥibb = he-likes. So a verbal sentence needs no pronoun and anā uḥibb reads as emphasis, not as neutral speech. Where there is no verb — anā min al-Hind — the pronoun is obligatory, because nothing else carries the person. State both halves; "Arabic drops pronouns" states neither.',
        'al- is the module\'s interference, and it cuts both ways. A general statement KEEPS the article where English drops it: uḥibb al-qahwa is "I like coffee" (uḥibb qahwa sounds like "I like a coffee"). A request DROPS it where English would keep it: urīd māʾ, not urīd al-māʾ — al-māʾ is that particular water on the table. Author the pair together so the contrast is visible.',
        'Possession is a suffix, not a word: ism + -ī = ismī (my name) · ismuka (your-m) · ismuki (your-f) · ismuhu (his). It is the same machinery M7 will use for ʿindī ("at-me" = I have), so teach the suffix as the pattern and the name as the example.',
        'INDEX SEAM, decided here: this module opens the course\'s word index, and al-Hind is the first hyphenated surface — it indexes al-hind, al AND hind (surfaceIndexKeys), so its row owns the bare al key for the whole course. Write that row to define the ARTICLE (al- = the, hyphenated onto its noun, assimilating before some letters — M2), not just to gloss India. Give al-qahwa the forms ["al-qahwa", "qahwa"] so the bare noun a later request writes resolves to the same true note. Treat content/en-ar/modules/L1-M1.json as a seam proof to replace, not a draft to extend.',
      ],
      maxWordsPerSentence: 5,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M2': {
      id: 'L1-M2',
      title: 'First exchange',
      job: 'Greetings, wellbeing, yes/no questions',
      patterns: [
        'as-salāmu ʿalaykum',
        'ṣabāḥ al-khayr + , + name',
        'kayfa + ḥāl- + -uka/-uki',
        'anā bi-khayr',
        'hal + <statement>',
        'naʿam/lā + , + <statement>',
      ],
      notes: [
        'A yes/no question is the statement, unchanged, with hal in front: hal anta min al-Hind? beside anta min al-Hind. hal never inflects and nothing moves — English fronts an auxiliary ("are you", "do you") that Arabic has no equivalent of, and that is the delta. Say also that speech often asks with intonation alone; hal is what gets written.',
        'The two "you"s split by GENDER, not by politeness: anta to a man, anti to a woman, and the suffix follows — kayfa ḥāluka? (to a man) · kayfa ḥāluki? (to a woman) · anta min al-Hind? · anti min al-Hind? English "you" is one word for both, so every question the learner asks now forces a choice it never had to make. The plural/polite antum is out of L1.',
        'Sun letters arrive with the greeting, and in THIS course they are spelling and not merely pronunciation: al- assimilates to the first letter of the noun in as-salāmu ʿalaykum, and stays plain before a moon letter in ṣabāḥ al-khayr. Because the romanization writes the assimilation, ash-shāy and *al-shāy are two different words to the build — the slogan "sun and moon letters are just a pronunciation rule you can ignore in writing" is false here in the most expensive possible way.',
        'INDEX SEAM: teach ṣabāḥ al-khayr and as-salāmu ʿalaykum as WHOLE multi-token surfaces (they are idioms — "morning of goodness", "peace be upon you"), which is what leaves the bare ṣabāḥ unclaimed for M4\'s fī aṣ-ṣabāḥ. bi-khayr is the course\'s first bi- word, so its row owns the bare bi key that M8\'s bi-kam will land on: write the note to define the clitic bi- ("with, in") as well as the phrase.',
        'as-salāmu keeps its -u: it is a frozen expression, one of the three places this course writes a vowel that would otherwise be a case ending (see the header). Everything else in the module stays in pause form — anā bi-khayr, not anā bi-khayrin.',
      ],
      maxWordsPerSentence: 5,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M3': {
      id: 'L1-M3',
      title: 'Needs and wants',
      job: "Say what you want and don't want",
      patterns: [
        'urīd + N',
        'lā urīd + al- + N',
        'urīd an + V-imperfect',
        'hal turīd + N',
        'al- + N + al- + Adj',
      ],
      notes: [
        'Negation is one word in front of the verb and nothing else changes: lā urīd al-qahwa. English needs a "do not" auxiliary that Arabic has no equivalent of. State the boundary too: lā negates a VERB, while a verbless present sentence (anā taʿbān) would need laysa — so keep every negation in this module verbal, and say why the other kind is not being taught.',
        'Wanting to DO something is urīd an + a fully conjugated imperfect: urīd an ashrab al-qahwa ("I want that I-drink the-coffee"). There is no infinitive to reach for — an is obligatory and the second verb still carries its own person prefix. Both English-shaped attempts are worth a mistake block: *urīd ashrab (no an) and *urīd an yashrab (an is there but the person slipped to "he").',
        'Gender on the adjective, and the second agreement English has nothing like: the adjective FOLLOWS its noun and agrees with it in gender AND in definiteness, and that second agreement is the difference between a phrase and a whole sentence — bayt kabīr (a big house) · al-bayt al-kabīr (the big house) · al-bayt kabīr (the house IS big). Feminine adds -a: sayyāra kabīra · qahwa sākhina.',
        'Gender on the verb, where the prefix does double duty: turīd is BOTH "you (m) want" and "she wants", and "you (f) want" is turīdīn — the -īn ending, not the prefix, is what separates them. English "you want"/"she wants" never collide, so this is interference, not delta. (The final -a of turīdīna is mood and is not written; the -īn is the person and is.)',
        'The slogan to kill: "add -a to make it feminine". Gender is a property of the NOUN and is learned with it — shams (sun), yad (hand) and al-Hind are feminine with no -a in sight. What the -a reliably marks is the AGREEING word: the adjective, the verb, the number in M8. Teach each noun with its gender, never by its ending.',
      ],
      maxWordsPerSentence: 6,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M4': {
      id: 'L1-M4',
      title: 'My day',
      job: 'Daily habits and time words',
      patterns: [
        'V-imperfect + kull yawm',
        'fī aṣ-ṣabāḥ + V-imperfect',
        'adhhab ilā + al- + N',
        'matā + V-imperfect',
      ],
      notes: [
        'The spine is the imperfect across persons, and the person is a PREFIX: ashrab (I) · tashrab (you-m / she) · yashrab (he) · nashrab (we). Name it the NON-PAST, not "the present tense" — one form covers "I drink", "I am drinking" and "I do drink", it is what lā and an attach to in M3, and sa- will make it future in M6. One honest clause is owed on M1\'s verbs: uḥibb and urīd take a u- prefix rather than a- because of their verb pattern, so the learner is not told a uniform rule that their first two verbs break.',
        'There is no auxiliary and no separate habitual form. English needs "do" for a question and "usually" is optional; Arabic asks hal tadhhab? and marks the habit with a TIME word — kull yawm, dāʾiman, aḥyānan — never on the verb. (dāʾiman and aḥyānan carry the adverbial -an that the scheme writes; see the header.)',
        'Time words carry the module: fī aṣ-ṣabāḥ, fī al-masāʾ, fī al-layl, kull yawm, al-yawm, dāʾiman, aḥyānan, matā. Write fī al-madrasa and fī al-masāʾ in full even though speech elides the a (said fi l-masāʾ) — the elided spelling would be a second surface for the same word, and the elision belongs in sound.',
        'INDEX SEAM: fī aṣ-ṣabāḥ claims aṣ and ṣabāḥ, and it is free to do so only because M2 taught ṣabāḥ al-khayr as one surface — write the ṣabāḥ row true of both places. al-yawm is the module\'s mañana: it indexes al-yawm, al and yawm, so its row owns the bare yawm that kull yawm never claims (a two-token surface claims no bare part). Let that one row say both jobs — yawm alone is "day", al-yawm is "today" — so whichever the learner taps, they are told the truth.',
        'Keep every sentence a daily habit: no past, no future, no requests. Those are M5, M6 and M3.',
      ],
      maxWordsPerSentence: 6,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M5': {
      id: 'L1-M5',
      title: 'Yesterday',
      job: 'Past tense — the first big divergence',
      patterns: [
        'ams + V-perfect',
        'V-perfect + al- + N',
        'kuntu + Adj',
        'hal + V-perfect-ta + ams',
      ],
      notes: [
        "THE structural divergence of the level, and the law is about WHERE the person sits, not about time: the perfect marks the person with a SUFFIX where M4's imperfect marked it with a prefix — dhahabtu (I went) · dhahabta (you-m) · dhahabti (you-f) · dhahaba (he). Same stem, opposite end of the word. This course writes those suffix vowels in full precisely because they are the person; it never writes case endings on nouns (header rule), so dhahabtu and al-bayt are consistent, not contradictory.",
        'kāna is the verb M1 said was missing, and it is missing only in the present: kuntu fī al-bayt (I was at home) · kuntu taʿbān (I was tired) · kāna al-jaww bārid (the weather was cold). Author at least one sentence that puts kāna beside its copula-less present twin, so "Arabic has no verb to be" dies where the learner can see it. (Full MSA puts kāna\'s predicate in the accusative; pause forms hide it, and that simplification is deliberate — say so rather than half-writing it.)',
        'Interference: English marks the past on the verb but never the person — "I went", "you went", "he went" are one form — so a learner reaching for anā dhahabtu is translating a pronoun Arabic already has inside the suffix. Same pro-drop law as M1, at the other end of the word. Tag it interference and spend the mistakes here.',
        'Recycle M4\'s daily verbs into the perfect and anchor every sentence with ams. M1\'s al- law is still running and is worth one checked pair: sharibtu al-qahwa is "I drank the coffee" (that coffee), sharibtu qahwa is "I drank coffee".',
        'Bounded on purpose: no past negation (MSA needs lam plus a verb form this level does not teach), no dual, no passive. Keeping mā out of the module also keeps it away from māʾ, which the index separates by one apostrophe.',
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M6': {
      id: 'L1-M6',
      title: 'Tomorrow',
      job: 'Future and plans',
      patterns: [
        'sa- + V-imperfect + ghadan',
        'sawfa + V-imperfect',
        'ghadan + V-imperfect',
        'hal sa- + V-imperfect',
      ],
      notes: [
        'There is no future tense to learn — the slogan "sa- is the future tense" would have an author invent one. The law: M4\'s imperfect is unmarked for time, and sa- (glued to the front) or sawfa (a free word before it) mark it as future; a future time word on its own is often enough (ghadan adhhab ilā al-madrasa). Lead with sa-, which does the daily work, and give sawfa one or two sentences for recognition.',
        'sa- never changes for person — the person stays in the prefix underneath it: sa-adhhab · sa-tadhhab · sa-yadhhab. After M5 that is a genuine rest point, and the module should say so out loud.',
        "INDEX SEAM: sa-adhhab indexes as itself plus the parts sa and adhhab, so the FIRST sa- verb in this module owns the bare sa key for the course — write its note to define the prefix, not just the verb, exactly as M1's al-Hind had to define the article. adhhab itself is already M4's and stays M4's; a learner tapping the whole sa-adhhab still gets this module's row, because the resolver takes the longest match first.",
        'ghadan keeps its -an: it is the adverbial ending the scheme writes (with shukran, marḥaban, dāʾiman), not a case ending — there is no bare *ghad in this use. Say it in the word row so no later module trims it.',
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M7': {
      id: 'L1-M7',
      title: 'Where things are',
      job: 'Locations and prepositions',
      patterns: [
        'al- + N + fī/ʿalā/taḥt + al- + N',
        'ayna + al- + N',
        'hunāka + N + fī + al- + N',
        'N + al- + N',
        'ʿind- + N',
      ],
      notes: [
        'This is M1\'s copula law doing its most useful work: al-kitāb ʿalā aṭ-ṭāwila is a complete sentence with no "is" in it. Core set: fī (in), ʿalā (on), taḥt (under), amām (in front of), ilā (to, from M4). They stay separate words and never fuse with the article — fī al-bayt, written in full even though it is said fi l-bayt.',
        'hunāka vs the plain sentence, and the difference is carried by al- rather than by word order: hunāka kitāb ʿalā aṭ-ṭāwila asserts that a book EXISTS there and its noun is indefinite, while al-kitāb ʿalā aṭ-ṭāwila says where a known book is. One English "there is / it is" for two Arabic shapes — make the comprehension pool test the choice.',
        'The iḍāfa, and the slogan to refuse is "iḍāfa is just of": in bāb al-bayt ("the door of the house") the POSSESSED noun comes first and takes NO al- even though it is definite, and only the last noun carries the article — so *al-bāb al-bayt is wrong, and it is the one place M1\'s "a general noun keeps al-" is overridden. The suffix route from M1 works alongside it: baytī (my house), and note that a tāʾ marbūṭa noun brings its t back under a suffix (sayyāra → sayyāratī), so both spellings belong in forms.',
        'ʿind- is how Arabic HAS things and there is no verb in it: ʿindī sayyāra is literally "at-me a car". It is a preposition with a pronoun suffix, so it changes with the person — ʿindī · ʿindaka · ʿindahu — and the sentence stays verbless, which is why negating it would need laysa and why L1 keeps it affirmative. English "to have" is a plain verb; tag the mismatch interference, not delta.',
        "Sun letters keep earning their keep across the module's nouns — aṭ-ṭāwila, as-sayyāra assimilate; al-bayt, al-kitāb do not. Every one of them is a distinct index key, so spell them the way M2 decided.",
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M8': {
      id: 'L1-M8',
      title: 'Numbers & shopping',
      job: 'Prices, quantities, buying',
      patterns: [
        'bi-kam + hādhā',
        'urīd + num + N-pl + , min faḍlika',
        'kam + N-sg + ʿindaka',
        'hādhā bi- + num + N',
      ],
      notes: [
        'The price question is still verbless: bi-kam hādhā? — literally "for how much [is] this?". Beside it, kam ("how many") takes a SINGULAR noun in Arabic — kam kitāb ʿindaka?, never a plural. English "how many books" makes the plural feel obligatory, so this is interference and worth a mistake block.',
        'Counting does not work the English way, and "numbers just go in front of the noun" is the slogan that hides it. One is the noun plus wāḥid (kitāb wāḥid); two is a DUAL ending on the noun itself with no number word at all (kitābān); only from three does a number word stand in front of a plural noun (thalātha kutub). This is the dual\'s single appearance in L1 — not on verbs, not on adjectives, not anywhere else.',
        "Gender polarity, 3–10: the number takes the OPPOSITE gender marker from the noun's singular — thalātha kutub (kitāb is masculine, so the number carries -a) · thalāth sayyārāt (sayyāra is feminine, so the number goes bare). Numbers are the one word class that disagrees on purpose, which is exactly why M3's note said the -a marks the agreeing word rather than the noun. Name the law and demonstrate it on one pair; do not drill it.",
        'INDEX SEAM: teach min faḍlika / min faḍliki as ONE two-token surface (literally "of your favour", and gendered like every other address since M2). That keeps M1\'s min ("from") as the owner of the bare min key, and the longest-match walk still takes the phrase whole wherever it appears. bi-kam\'s bare bi lands on M2\'s bi-khayr row — which is why that row had to define the clitic.',
        'Numbers are vocabulary the sentences actually use (wāḥid … ʿashara, ʿishrūn, miʾa), not a counting drill, and the currency is whatever the sentences name — pick one and keep it.',
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M9': {
      id: 'L1-M9',
      title: 'Feelings & opinions',
      job: 'Why — because and so',
      patterns: [
        '<statement> + li-ʾanna + <statement>',
        '<statement> + , li-dhālika + <statement>',
        'limādhā + <question>',
        'anā + Adj',
      ],
      notes: [
        'The pair that carries the module: li-ʾanna introduces the REASON and li-dhālika introduces the CONSEQUENCE. The same two facts in opposite order — lā urīd al-qahwa li-ʾannī taʿbān · anā taʿbān, li-dhālika lā urīd al-qahwa — so build the sentences in pairs and make the comprehension pool test the choice.',
        'li-ʾanna cannot be followed straight by a verb the way English "because" can: it needs a noun or an attached pronoun — li-ʾannī (because I), li-ʾannaka (because you-m), li-ʾanna al-qahwa ghāliya (because the coffee is expensive). Put the whole family in forms so every spelling resolves to one row, and show the English-shaped attempt as the mistake.',
        "Feelings ride M1's verbless sentence, and the adjective agrees with the SUBJECT — whoever the sentence is about, not whoever is speaking: anā taʿbān (a man about himself) · anā taʿbāna (a woman) · hal anti taʿbāna? (asked of a woman). Write subject, not speaker: with anti it is the person being asked. Naming the wrong agreer is the exact defect the third Marathi review had to correct three times (docs/08-marathi-third-review.md).",
        'INDEX SEAM: li-ʾanna is the course\'s first li- word, so it owns the bare li key that li-dhālika will also generate — its note defines the clitic li- ("for, to") as well as the conjunction. limādhā ("why") is written solid, with no hyphen, so it is its own surface and never touches li. And li-ʾanna normalises to li-\'anna: the hamza folds to an apostrophe and the ʿayn class never joins it, so nothing here collides with ʿind- or ʿalā.',
        "Bounded: negate verbs with M3's lā and keep the verbless sentences affirmative — laysa stays out of L1, and no reason clause may reach for it.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M10': {
      id: 'L1-M10',
      title: 'Connected talk',
      job: 'Short 2–3 sentence exchanges',
      patterns: [
        '<M1–M9 pattern> + <M1–M9 pattern>',
        '<question> → <answer + li-ʾanna + reason>',
        '<statement> + wa/lākin + <statement>',
      ],
      notes: [
        'Each item is a TURN of 2–3 short sentences, not one long one — a question and its answer, or a statement, a reason and a follow-up. The per-sentence bound applies to each sentence inside the turn.',
        'Recombination is the lesson: nearly everything comes from M1–M9. The honest new spend is the joiners that hold a turn together — wa (and), lākin (but), ayḍan (also), thumma (then) — and little else. Keep the turns everyday and symmetric: greeting → wellbeing → plan (as-salāmu ʿalaykum · kayfa ḥāluka? · anā bi-khayr, sa-adhhab ilā al-madrasa ghadan); want → reason → buy.',
        'The slogan this module attracts is "Arabic is VSO", and it would make an author reorder perfectly natural sentences. The law: both orders are normal Arabic, and L1 has been writing the noun-first one all along — ismī Rohān, anā min al-Hind, al-kitāb ʿalā aṭ-ṭāwila. Verb-first happens by itself whenever the verb carries its own subject (dhahabtu ilā al-madrasa ams). VSO describes formal narrative prose, not a rule a conversational turn must obey.',
        "wa is written as a separate word here (the header's one deliberate departure from Arabic's own joining), so a turn full of wa still costs the index one key. The script line joins it as Arabic does; keep the two consistent across every turn.",
        'A turn is where the register is most tempting to break: keep every sentence in the same spoken-simple MSA the course has used since M1, and put "in Cairo you would hear something else" in usage, never in display.',
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M1': {
      id: 'L2-M1',
      title: 'Asking politely',
      job: 'Requests, thanks, apologies in the right register',
      patterns: [
        'V-imperative + min faḍlika/faḍliki',
        'law samaḥta/samaḥti + , + <request>',
        'hal yumkinuka/yumkinuki + an + V?',
        'aʿṭinī + al- + N + min faḍlika',
        'shukran jazīlan — ʿafwan',
      ],
      notes: [
        "REGISTER, decided for the whole level and repeated here because a prompt only ever shows an author the notes (full record: docs/54-en-ar-L2-brief-decisions.md). Arabic's second person forks by GENDER, not by politeness — anta/anti, ismuka/ismuki — and L1 taught that fork from its first module, so this course has no tú/usted decision to take and this module does not spend itself on one. MSA is already the language's formal register, so #422's chip marks only the ceremonial end: law samaḥta, tafaḍḍal, shukran jazīlan and as-salāmu ʿalaykum chip `formal`, everything else stays `neutral`, and `informal` is UNUSED in en-ar — the forms that would earn it are dialect forms, which never reach display. Say that in a note; a value that is missing on purpose should look deliberate.",
        "The grammar of the module is the imperative, and it falls out of a verb the learner already has: take the ta- form, drop the prefix, and if what is left cannot start a word, put a vowel in front — tadhhab → idhhab, tashrab → ishrab, taktub → uktub, ta'kul → kul. Word-initial hamza is not written (the romanization contract), so these are spelled with a plain vowel and each is one clean key. The feminine adds -ī: idhhabī, ishrabī. English has one imperative for everyone; Arabic has four, and this module authors the two the course uses.",
        'Softening is lexical, not grammatical, and that is the delta: Arabic does not have a polite verb form above the imperative, so politeness is bought with min faḍlika (L1-M8\'s phrase, re-taught here and owned there), law samaḥta ("if you would permit" — the everyday please of a request made to a stranger), and the question frame hal yumkinuka an…? ("is it possible for you to…"), which is the softest of the three and the one that survives being said to anyone. An imperative alone is not rude; an imperative with nothing around it is abrupt, and that distinction belongs in usage.',
        'Thanks and apology: shukran (L1-M2) climbs to shukran jazīlan, and both are the adverbial -an the scheme exempts from the no-case-endings law, alongside ghadan and dāʾiman. ʿafwan (L1-M10) answers thanks AND excuses an interruption — one word, two jobs, its row already L1\'s. āsif / āsifa is regret for something done; lā baʾsa is "no harm done", and mushkila is deliberately left for M8, which needs it as a noun in its own right.',
        'INDEX SEAM: idhhab, ishrab, kul, uktub, aʿṭinī, samaḥta, samaḥti, law, yumkinuka, yumkinuki, jazīlan, āsif, āsifa and baʾsa are fresh keys. min faḍlika stays L1-M8\'s multi-token surface, and the reason is worth restating in the note, because the whole chain is about to pay off a third time: that phrase was indexed whole so that min stayed L1-M1\'s "from", and M9\'s comparative "than" will land on that same row. Write āsif with the initial hamza UNWRITTEN and baʾsa with the medial hamza written as ʾ — never a plain apostrophe, never a curly quote, or the two hamza classes stop round-tripping.',
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M2': {
      id: 'L2-M2',
      title: 'Describing people',
      job: 'Appearance, character, relationships',
      patterns: [
        'huwa/hiya + Adj',
        'hādhā/hādhihi + N + -ī',
        'ʿindī + N',
        'ismuhā + <name>',
        'N + N-ī  (iḍāfa)',
      ],
      notes: [
        'The third person finally stands on its own two feet. L1 never needed huwa or hiya — the ya-/ta- prefix carried the person inside the verb, and a nominal sentence about someone used their name — so this module opens both, plus the -hā suffix that pairs with L1-M7\'s -hu: ismuhā, baytuhā, ʿindahā, sayyāratuhā. The nominal sentence still has NO copula (huwa ṭawīl, "he tall"), which is L1-M1\'s law meeting a new subject: transfer, a rest point, and worth saying so rather than re-teaching it as news.',
        'Possession is a preposition, not a verb, and this is the module to say why: ʿind- (L1-M7) is literally "at", which is exactly why it takes the possessive suffixes rather than conjugating, and why its past is kāna ʿindī (L1-M5\'s kāna). The slogan to kill is "ʿindī means I have" — memorable, and it leaves an author with no way to explain ʿindahā or the past. Relationship by iḍāfa is the other half: bayt ṣadīqī, ism ukhtī — two nouns in a row, the first NEVER taking al-, which L1-M7 taught and this module drills on people.',
        'The family and person set: akh, ukht, ab, umm, ibn, bint, ṣadīq, ṣadīqa, zawj, zawja; ṭawīl, qaṣīr, shābb, laṭīf, karīm, dhakī. Author them as gendered pairs so M3 inherits a grid. kabīr is L1-M3\'s key ("big"), and "old" of a person is kabīr fī as-sinn — the same row, its note true of both jobs, and no second row opened for the age reading.',
        'Character adjectives are where an author reaches for the English "is" and finds nothing: hiya laṭīfa jiddan is three words and one of them is "very" (jiddan, L1-M3, another adverbial -an). Keep the sentences nominal here; the verb comes back in M4 and M10. Tag every gendered pair delta ONCE and then treat it as the rest point it has become — the learner has been marking -a since L1-M1\'s ṭālib / ṭāliba.',
        "INDEX SEAM: huwa, hiya, ismuhā, baytuhā, ʿindahā, akh, ukht, ab, umm, ibn, bint, zawj, zawja, ṭawīl, qaṣīr, shābb, laṭīf, karīm, dhakī and sinn are fresh keys. The person suffixes attach with NO hyphen, unlike the al-/bi-/li-/sa- clitics, so each suffixed shape is its own single key and belongs in the forms list of the row that teaches the bare word — the pattern L1-M7 set with baytī · baytuka · baytuki · baytuhu. hādhā and hādhihi stay L1-M8's rows; ṣadīq is fresh here even though ṣadīqa is not yet taught anywhere — author both cells on the one row.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M3': {
      id: 'L2-M3',
      title: 'Describing things',
      job: 'Size, colour, quality — agreement at length',
      patterns: [
        'al- + N + al- + Adj   (a phrase)',
        'al- + N + Adj   (a sentence)',
        'al- + N-pl + Adj-f-sg',
        'N + Adj + jiddan',
        'hādhā + N + aḥmar',
      ],
      notes: [
        'THE law of the module, and the most counter-intuitive grammar in any course in this repo: **a plural of NON-HUMAN things takes feminine SINGULAR agreement.** al-kutub jamīla — "the books, she is beautiful"; as-sayyārāt kabīra; al-buyūt qadīma. Only a plural of PEOPLE takes a plural adjective: al-mudarrisūn mashghūlūn. English has no such split, so the silent slogan an author brings — "plural noun, plural adjective" — is wrong in Arabic more often than it is right. State the law with both halves and spend the module\'s mistakes here.',
        'The definiteness rule, which turns three words into either a phrase or a sentence depending on one al-: al-bayt al-kabīr is "the big house" (the adjective matches the noun in definiteness) and al-bayt kabīr is "the house is big" (it does not, so the sentence has a predicate). L1-M3 shipped the first shape; this module pays off the pair, and it is the single most useful thing in the level, because it is how Arabic says "is" without a verb.',
        "Three plural systems, taught as vocabulary and not as derivation: sound masculine -ūn on human nouns (mudarrisūn), sound feminine -āt (sayyārāt, mudarrisāt, riyālāt — L1-M8 shipped two of these), and BROKEN plurals, which reshape the word from inside (kitāb → kutub, L1-M8; bayt → buyūt; walad → awlād; lawn → alwān). A broken plural lives in the forms of the row that teaches its singular — never in a row of its own — and no rule in this course claims the pattern is predictable, because it is not. The dual (L1-M8's kitābān, sayyāratān) is re-shown, not re-taught, with docs/42's usage line about spoken kitābayn standing.",
        'Colours follow the afʿal / faʿlāʾ pattern: aḥmar / ḥamrāʾ, azraq / zarqāʾ, aswad / sawdāʾ, abyaḍ / bayḍāʾ, akhḍar / khaḍrāʾ. Two warnings belong in the note. The feminine is NOT the -a the learner has been writing since L1-M1, so the pattern must be shown as a pair rather than derived. And afʿal is the same shape M9 will use for the comparative — aḥmar is not "redder" — so this row says the shape is a pattern and the root decides the meaning, and M9\'s row says it back.',
        "INDEX SEAM: jadīd, qadīm, naẓīf, ṭawīl (M2's, re-taught for things), aḥmar, ḥamrāʾ, azraq, zarqāʾ, aswad, sawdāʾ, abyaḍ, akhḍar, buyūt, awlād, alwān, mudarrisūn are fresh keys. Every faʿlāʾ feminine carries a FINAL hamza written as ʾ — ḥamrāʾ, never ḥamra — which is the same contract that keeps māʾ apart from mā; drop it and two colours merge into one entry. kutub, sayyārāt and riyālāt stay L1-M8's rows, and the al-'d shapes index their bare parts onto those same rows, which is what makes al-kutub resolvable at all.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M4': {
      id: 'L2-M4',
      title: 'Getting around',
      job: 'Directions, transport, asking the way',
      patterns: [
        'ʿafwan + , + ayna + al- + N?',
        'kayfa adhhab ilā + al- + N?',
        'V-imperative + ʿalā al-yamīn / ʿalā al-yasār',
        'ilā al-amām + thumma + <direction>',
        'adhhab bi- + al- + N-transport',
      ],
      notes: [
        'Directions are M1\'s imperative spent in the street: idhhab, khudh ("take" — a fresh verb whose imperative is irregular enough to be taught as a shape, not derived), and the frame that lets a learner ask without conjugating anything, kayfa adhhab ilā…? ("how do I go to…"). ayna (L1-M7) and kayfa (L1-M2) are both re-taught and owned elsewhere; ilā is L1-M4\'s. This module owns the direction words, not the question words.',
        'The direction phrases hang off ʿalā (L1-M7): ʿalā al-yamīn, ʿalā al-yasār, and ilā al-amām for straight on. Each indexes its bare parts too — yamīn, yasār, amām (the last already L1-M7\'s "in front of", re-teaching itself as "forward") — so the rows carry notes true of the phrase and of the bare word alike, which is the al- law L1 set in its first module. hunā ("here") is fresh and pairs with L1-M7\'s hunāka.',
        'Transport is where decision 1 of this level bites for the first time: the MSA word for a bus is al-ḥāfila, and the word every passenger in every Arab city says is al-bāṣ. Display, script, forms and pool take al-ḥāfila; ONE usage line names al-bāṣ in words. That is the whole dialect policy — prose only, never a field the index reads — and this module is one of the three that is allowed to use it. The rest: al-qiṭār, al-maḥaṭṭa, al-maṭār, sayyārat ujra (a taxi, and an iḍāfa the learner can now parse), as-sayyāra (L1-M3, with its sun letter).',
        'bi- for the means of travel (adhhab bi-al-ḥāfila) is the same bi- L1-M2 taught inside bi-khayr and L1-M8 inside bi-kam — one key, three jobs, and its row is M2\'s. This is the strongest example in the course of why the hyphen law matters: a learner who met bi only inside "well" and "how much" is now told what it actually means, on the row where it has lived all along.',
        "INDEX SEAM: khudh, yamīn, yasār, amām (as \"forward\"), hunā, ḥāfila, qiṭār, maḥaṭṭa, maṭār, ujra, bayna, warāʾ and jānib are fresh keys; bi-jānib indexes bi onto M2's row and jānib onto this module's. ʿalā, hunāka, ayna and amām-as-\"in front of\" stay L1-M7's; ilā stays L1-M4's; kayfa stays L1-M2's. Place names never index (#61), so anchor every direction on a common noun (al-maḥaṭṭa, as-sūq) and not on a city.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M5': {
      id: 'L2-M5',
      title: 'Food and hosting',
      job: 'Ordering, offering, refusing without offence',
      patterns: [
        'tafaḍḍal / tafaḍḍalī',
        'urīd + al- + N + min faḍlika',
        'hal turīd + al- + N?',
        'lā shukran + , + anā shabʿān/shabʿāna',
        'al-ḥisāb min faḍlika',
      ],
      notes: [
        'tafaḍḍal / tafaḍḍalī is the most useful word in this module and possibly in the course: it hands something over, invites someone in, offers a seat, gives permission and says "after you" — five English acts, one Arabic word, chipped `formal` and said by everyone. Teach it as a whole gesture rather than as a verb form, and let usage carry the range; a learner who leaves this module with only tafaḍḍal has still gained more than a page of vocabulary.',
        "Ordering recycles almost everything: urīd (L1-M1), min faḍlika (L1-M8), the numbers and their gender polarity (L1-M8), hādhā / hādhihi (L1-M8) for pointing at a menu. The honest new spend is the food itself — laḥm, samak, khuḍār, ruzz, ḥulw, ṭabaq, al-ḥisāb — and the offer question hal turīd…? (L1-M3's turīd inside L1-M2's hal), which is a rest point dressed as a new frame.",
        'Refusing without offence is the cultural half of the job and it needs a rule, not a phrase list: in Arab hosting an offer is EXPECTED to be repeated, so a single lā shukran is heard as politeness rather than as a decision, and the refusal that lands adds a reason — lā shukran, anā shabʿān ("I am full"). The reverse also matters: a host who accepts the first refusal has under-hosted. Put the law in usage, keep display to the sentences themselves, and do not moralise in a rule.',
        "This module's dialect line (decision 1, second of three): the MSA offer hal turīd al-mazīd? is correct and stiff at a real table. ONE usage line may name what a host actually says; display, script, forms and pool stay MSA. And alḥamdu lillāh after eating is not religious vocabulary here — it is what a guest says when the meal ends, and its usage line should say exactly that.",
        "INDEX SEAM: tafaḍḍal, tafaḍḍalī, laḥm, samak, khuḍār, ruzz, ḥulw, ṭabaq, ḥisāb, shabʿān, shabʿāna and mazīd are fresh keys. lā stays L1-M3's, shukran L1-M2's, min faḍlika L1-M8's phrase, urīd / turīd / turīdīn L1-M1's and L1-M3's rows. alḥamdu lillāh rides as ONE multi-token surface — the tool that keeps al and lillāh from being spent here — exactly as as-salāmu ʿalaykum does in L1-M2.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M6': {
      id: 'L2-M6',
      title: 'Making plans together',
      job: 'Invitations, suggestions, settling a time',
      patterns: [
        'hal turīd an nadhhab ilā + al- + N?',
        'limādhā lā + V-naḥnu + ?',
        'as-sāʿa + al-<ordinal>',
        'sa-nakūn hunāka + fī as-sāʿa + al-<ordinal>',
        'muwāfiq — in shāʾ allāh',
      ],
      notes: [
        "The suggestion frame is an + a verb, and L1 already shipped an inside urīd an ashrab (L1-M3) — so the delta is not the particle but the person: hal turīd an nadhhab…? asks with YOU and answers with WE, which is the shape every invitation in Arabic takes. limādhā lā nadhhab…? (\"why don't we go\") reuses L1-M9's limādhā and L1-M3's lā for a job neither has done before; say so, because it looks like new grammar and is not.",
        "The clock is the vocabulary spend and it is genuinely new: time takes ORDINALS in the feminine, agreeing with as-sāʿa — as-sāʿa al-wāḥida, ath-thāniya, ath-thālitha, ar-rābiʿa, al-khāmisa — where L1-M8 taught only cardinals and their gender polarity. Two things fall out of it, and both belong in the note: this is the course's densest run of sun letters (ath-, ar-, as-), which are SPELLING and not just sound; and the half and quarter are joined with wa — wa an-niṣf, wa ar-rubʿ — the same free-standing wa L1-M1 owns.",
        'Agreeing and hedging: muwāfiq / muwāfiqa ("agreed"), ṭayyib (L1-M10), and in shāʾ allāh, which L1-M6 already taught as a future marker. Its second job belongs here and belongs in usage rather than in a rule: in speech it is also how a soft no is given, so a plan sealed only with in shāʾ allāh is not sealed. That is a fact about the language, stated without comment, and it is exactly the kind of thing a learner cannot get from a table of verbs.',
        'Days and horizons come from L1 where they can: ghadan, al-usbūʿ al-qādim and baʿd aẓ-ẓuhr are all L1-M6\'s, re-shown here. The new ones are the day names the plan needs (al-jumʿa, as-sabt, al-aḥad) and mawʿid ("an appointment"). Keep the module\'s own future in sa- (L1-M6, and docs/42 demoted sawfa to recognition) — no new tense is opened to settle a time.',
        "INDEX SEAM: mawʿid, muwāfiq, muwāfiqa, sāʿa, wāḥida (as an ordinal — L1-M8's wāḥida is the cardinal \"one\" and owns the key, so this note points back rather than opening a second row), thāniya, thālitha, rābiʿa, khāmisa, niṣf, rubʿ, jumʿa, sabt, aḥad are fresh keys. an stays L1-M3's row, limādhā L1-M9's, lā L1-M3's, wa L1-M1's, in shāʾ allāh L1-M6's whole-phrase surface. Write every sun-letter assimilation (ath-thāniya, never al-thāniya): the build sees two different words, and half the module's keys are at stake. Two assimilated articles are themselves fresh hyphen-part keys — ath and ar, joining L1's as, ash, aṣ, aẓ and aṭ — so the first row to carry each defines the article, not just the word.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M7': {
      id: 'L2-M7',
      title: 'On the phone',
      job: 'Calls and messages — openings, closings, taking a message',
      patterns: [
        'ālū + , + man maʿī?',
        'hal + <name> + mawjūd/mawjūda?',
        'laysa mawjūdan + , + <offer>',
        'hal yumkinuka an tatruka risāla?',
        'sa-attaṣil bika/biki + ghadan',
      ],
      notes: [
        'man is this module\'s key and its note must name the collision it walks into: man ("who") and min ("from", L1-M1\'s) differ by one short vowel, and short vowels are ALWAYS written in this course precisely so that pairs like this stay two words. Write man maʿī? ("who is with me", the Arabic for "who\'s calling") with its vowel every time; an author who slips writes min maʿī and the learner is sent to a note about origins for the rest of the course.',
        "laysa enters here, and it is the one L1 prohibition this level lifts. L1 banned lam and laysa outright and was right to; but a phone call's entire business is absence, lā cannot negate a nominal sentence, and huwa ghayr mawjūd is an evasion. So M7 gets laysa and laysat in the THIRD PERSON ONLY, taught as two vocabulary items rather than as a verb, with the rest of the paradigm named in the note as L3's. Nothing else in L2 may use it.",
        'The opening is a loanword and the course should say so plainly: ālū is what every Arabic speaker says when picking up, from the French, and there is no MSA alternative anybody uses. This is decision 1\'s third and last permitted dialect-adjacent line — ālū is in display because it IS the standard telephone opening, while the everyday word for a mobile (which varies by country) stays in usage prose beside the MSA hātif. mawjūd / mawjūda ("present, available") carries the rest of the call.',
        "Messages recycle the level's own tools: hal yumkinuka an…? is M1's softener, an + verb is M6's frame, tatruka and tatakallam are L1-M10's verb doing new work, and sa- (L1-M6) promises the call back. risāla and raqm are the two nouns worth spending on. mashghūl (L1-M6, \"busy\") comes back at exactly the moment it is most useful — the line is busy, the person is busy — one row, both jobs, and the note is already true of them.",
        "INDEX SEAM: ālū, man, laysa, laysat, mawjūd, mawjūda, risāla, raqm, hātif, attaṣil and tatruka are fresh keys. min stays L1-M1's and must never be written where man is meant. maʿī, maʿaka and maʿaki stay L1-M10's rows, doing the phone's \"with me\" here. bika / biki index bi onto L1-M2's row, as every bi- clitic in the course does.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M8': {
      id: 'L2-M8',
      title: 'When something goes wrong',
      job: 'Problems, asking for help, complaining calmly',
      patterns: [
        'ʿindī + mushkila',
        'hādhā lā yaʿmal',
        'sāʿidnī min faḍlika',
        'aḥtāj ilā + al- + N',
        'ʿafwan + , + hunāka mushkila fī + al- + N',
      ],
      notes: [
        'ʿind- does its third job here and earns its rule at last: ʿindī mushkila ("I have a problem"), ʿindī ṣudāʿ ("I have a headache"). The slogan to kill is "ʿindī means I have" — memorable, and it leaves an author unable to explain ʿindahā, or the past kāna ʿindī, or why there is no verb to conjugate. The law: ʿind- is a PREPOSITION meaning "at", it takes the possessive suffixes exactly as bayt does, and Arabic expresses having by locating a thing at a person. State that and the whole family falls out.',
        'Negation of a verb is L1-M3\'s lā + imperfect, re-used rather than re-taught: hādhā lā yaʿmal ("this doesn\'t work"). The nominal negation the module might reach for is M7\'s laysa, and it stays there — this module names it and does not use it, which is what keeps the lift narrow. The past goes through L1-M5\'s perfect: nasītu ("I forgot"), ḍāʿa ("it got lost"), taʾakhkhartu ("I was late"), with every person suffix written in full.',
        "Asking for help is M1's imperative on a new verb — sāʿidnī, with the -nī object suffix the learner met in M1's aʿṭinī — plus the noun musāʿada and aḥtāj ilā (\"I need\", which takes ilā, L1-M4's, and not a bare object: *aḥtāj māʾ is the error English produces). Author the pair so the learner sees the same root twice: sāʿidnī and musāʿada.",
        'Complaining calmly is the job\'s real content and it is a register lesson: Arabic complains through the frame, not through volume — ʿafwan (L1-M10) opens it, hunāka mushkila states it, and min faḍlika closes it. An unframed hādhā lā yaʿmal is an accusation. hunāka is doing its existential job here ("there is"), which is a second job for L1-M7\'s location row — point back at that row, and write the note true of both, because no L2 row can take the key.',
        "INDEX SEAM: mushkila, mushkilāt, yaʿmal, sāʿidnī, musāʿada, aḥtāj, ṣudāʿ, ḥumma, nasītu, ḍāʿa and taʾakhkhartu are fresh keys. ʿindī, ʿindaka, ʿindaki and ʿindahu stay L1-M7's row (ʿindahā is M2's addition to it); hunāka stays L1-M7's; lā stays L1-M3's; ʿafwan and min faḍlika stay L1-M10's and L1-M8's. taʾakhkhartu carries a MEDIAL hamza written ʾ, like masāʾ and baʾsa — the class that must never be a plain apostrophe.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M9': {
      id: 'L2-M9',
      title: 'Comparing and choosing',
      job: 'More, less, better — stating a preference',
      patterns: [
        'A + afʿal + min + B',
        'afʿal + N   (the superlative)',
        'ufaḍḍil + al- + N',
        'ayy + N + turīd?',
        'hādhā akthar min dhālika',
      ],
      notes: [
        "The comparative is one shape and it does not bend: afʿal, from the root, invariable for gender and number — huwa akbar min akhīhi and hiya akbar min ukhtihā use the SAME word, after nine modules in which every adjective took an -a. That is the delta, and it is a relief rather than a burden: akbar, aṣghar, aṭwal, aqṣar, arkhaṣ (from L1-M8's rakhīṣ), aghlā (from ghālī), aḥsan, asraʿ. Show each beside the plain adjective the learner already owns.",
        '"Than" is min, and the key is L1-M1\'s "from". This is the third job to land on that one row — origin in L1-M1, the phrase min faḍlika indexed whole in L1-M8 to protect it, and comparison here — and under first-occurrence-wins no row this module writes can take it. So M9 points back explicitly and opens nothing, and the note the learner sees is L1-M1\'s: make sure the brief for that row is written to bear this weight.',
        'The superlative is the SAME afʿal in an iḍāfa with an indefinite singular — akbar bayt, "the biggest house", literally "biggest of a house" — or al-akbar standing alone. English has two endings and two words (-er, -est, more, most); Arabic has one shape doing both jobs, and which one is meant is decided by what follows. That is the rule; "add al- for the superlative" is the slogan that breaks on akbar bayt.',
        'The warning M3 was written to set up: afʿal is a PATTERN, not a meaning. aḥmar, azraq and aswad have the same shape and are colours, not comparatives — nothing is "redder" here — because the root decides and the pattern is shared. Say it in this module as well as in M3, since a learner meeting akbar after alwān will otherwise generalise in the wrong direction.',
        "Choosing: ufaḍḍil (\"I prefer\"), ayy / ayya (\"which\" — a sibling of L1-M7's ayna and L1-M4's matā, cross-referenced and merged with neither), and akthar / aqall for quantity. INDEX SEAM: akbar, aṣghar, aṭwal, aqṣar, arkhaṣ, aghlā, aḥsan, asraʿ, akthar, aqall, ufaḍḍil and ayy are fresh keys. min stays L1-M1's; dhālika stays L1-M9's; kabīr, rakhīṣ and ghālī stay L1-M3's and L1-M8's, each comparative row pointing back at the adjective it is built from rather than restating it.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M10': {
      id: 'L2-M10',
      title: 'Telling what happened',
      job: 'A four-sentence account in the past',
      patterns: [
        'V-perfect + <subject> + ilā + al- + N',
        'dhahabtu + ilā + al- + N + wa + V-perfect',
        'kāna + <subject> + V-imperfect',
        'thumma + V-perfect + , + lākin + <statement>',
      ],
      notes: [
        "Each item is an ACCOUNT of exactly four short sentences, not one long one, and the per-sentence bound applies to each sentence inside it. The perfect is Arabic's narrative tense and L1-M5 already taught its suffix conjugation, so almost every verb here is a known verb in a known cell — write every person suffix IN FULL (dhahabtu · dhahabta · dhahabti · dhahaba · dhahabat), which is the one place the no-case-endings law makes an exception, because those suffixes carry the person and not the case.",
        "THE delta of the module, and the reason a four-sentence account needs it: **a verb placed before its subject stays SINGULAR.** dhahaba al-awlād ilā as-sūq — never dhahabū al-awlād — agreeing in gender only (dhahabat al-banāt). L1 dodged this entirely by using pronoun subjects, where the question cannot arise. It is the mirror of M3's non-human-plural law: Arabic's agreement is decided by position and by what kind of thing the subject is, not by number alone. Spend the mistakes here.",
        'Background versus event, and Arabic solves it with a verb rather than a tense: kāna (L1-M5) plus the IMPERFECT gives the standing situation — kuntu ashrab al-qahwa ʿindamā ittaṣala ("I was drinking coffee when he called") — while the bare perfect moves the story on one step. This is the whole of L2\'s past-tense apparatus. qad, lam and the passive stay OUT and are named here as L3\'s, so a later author does not import them into an account that does not need them.',
        'Build the accounts from scenes the ladder supports: a plan that failed (M6 + M8), a call at the wrong moment (M7), a meal (M5), directions that went wrong (M4). Join them with what L1-M10 shipped — thumma, lākin, ayḍan, wa — plus baʿda dhālika and fī an-nihāya. The honest new spend is the third-person perfect cells a story needs: qāla, raʾā, waṣala, ittaṣala, and their feminine partners.',
        "INDEX SEAM: qultu, qāla, qālat, raʾaytu, raʾā, waṣaltu, waṣala, ittaṣala, dhahabat, akalat, nihāya and ʿindamā are fresh keys, each a new CELL of a verb whose row lives elsewhere where one exists — its note points back to the first-teach row and no L1 or earlier-L2 file is edited to accommodate it. kāna, kuntu, kunta and kunti stay L1-M5's row, which is where the background frame belongs. raʾaytu carries a medial hamza written ʾ; qultu is spelled with the ū collapsed to u, and the row's forms carry both cells so the account resolves.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
  },
  'hi-en': {
    'L1-M1': {
      id: 'L1-M1',
      title: 'Who I am',
      job: 'Introduce yourself and state what you like',
      patterns: ['My name is + name', 'I am from + place', 'I am + a/an + N', 'I like + N'],
      notes: [
        'LANGUAGE OF EVERY FIELD, decided for the whole course and repeated here because the prompt only ever shows an author the notes: every teaching field is Hindi in Devanagari — rules[].text, word note, trap, sound, variations[].changed, mistake.why, usage, mnemonic and cue — and English appears ONLY in display (sentence, word, variation, mistake, pool) and in word forms. A Hindi field may quote the English word it explains; it never switches into English prose. hi-mr writes its rules[].text and word notes in English (content/hi-mr/modules/L1-M1.json, rules[0]) — a quirk for one bilingual learner — and hi-en must NOT copy it: here the English IS the thing being taught, and a note inherits lang="hi" on screen. No glossEn on any sentence (#268 — an English gloss of an English line is the hero line twice); literal on EVERY sentence of M1–M3, the Hindi words in English order: मेरा नाम है रोहन under My name is Rohan.',
        'The whole delta of this course is word ORDER, and M1 states it on its first line: the verb comes SECOND, right after its subject, and what stood before है in Hindi now stands after the verb — My name is Rohan beside मेरा नाम रोहन है; I like tea beside मुझे चाय पसंद है. Write that law, not the slogan "English is SVO" (true, and it tells a Hindi speaker nothing about what to move); literal is where the learner watches है jump. The subject word is never dropped, even where Hindi would drop it — M10 spends on that; say it here once.',
        'be is am / is / are by PERSON and number — I am · you are · he / she / it is · we / they are — exactly as होना is (हूँ · है · हैं), and never by gender: है serves a man and a woman alike, and so does is. The forms are new and the habit is old, so tag the be row delta, not interference. The slogan this module attracts is "English has no gender", and it is half true in a way that bites later: nouns and verbs carry none, but a PERSON must be he or she (M4, M10) — so state the law about the verb only.',
        'The article before a countable singular noun is THE interference of the module and the mistake to spend on: I am a student, never *I am student — Hindi has no article and मैं विद्यार्थी हूँ needs none. a before a consonant sound, an before a vowel sound (a student · an engineer — the sound, not the letter), and ONE row teaches both: display a, forms a · an. Pair it with its absence in the same module so the learner sees the line: I am a teacher (one countable person → a) · I like tea (a kind of thing in general → nothing; I like the tea would mean that particular tea). "the = specific, a = any" is the slogan, and M3 kills it; M1 teaches only these two cases.',
        'Liking takes a plain subject: मुझे चाय पसंद है is dative in Hindi (the liker is मुझे, चाय is the grammatical subject and पसंद है agrees with it) and nominative in English — I like tea: the liker is the subject, like is an ordinary verb, the thing liked is its object. The Hindi shape produces *Me tea likes, and that is the mistake block. No article on the generic object (I like tea · I like books), and like here is the verb only: like = "similar to" (like my brother) stays out of L1, because this row owns the key for the course.',
        "from stands BEFORE the place — I am from Delhi · I am from India: Hindi's postposition दिल्ली से becomes a preposition, and so will every में / पर / को in M4 and M7. State it once, here, as the law (the Hindi से / में / पर word comes FIRST in English) and let literal show it: मैं हूँ से दिल्ली. Capital I always — the index folds case (I and i are one key), so the capital is for the reader, not the resolver, and I is how English is written.",
        "INDEX SEAM, decided here because this module opens the course's word index (first occurrence wins): deconstruct is ONCE, in My name is Rohan, with forms am · is · are — the one be row of the whole course, which M5 will extend with was · were; am and are in later sentences are not new words. Deconstruct a with forms a · an; I, my, name, from, like and each noun get one row each. No contractions yet — I am a student is written whole because am is the lesson, and I'm arrives in M2 as its own row (straight apostrophe, one surface). There is no fixture to replace: content/hi-en/modules/ does not exist until this module is authored.",
      ],
      maxWordsPerSentence: 5,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M2': {
      id: 'L1-M2',
      title: 'First exchange',
      job: 'Greetings, wellbeing, yes/no questions',
      patterns: [
        'Hello / Good morning + , + name',
        'How are you?',
        "I'm + Adj + , thank you",
        'Are you + a/an + N / from + place?',
        'What is your name?',
        "Yes, I am / No, I'm not",
      ],
      notes: [
        "The question law, and the delta of the module: a yes/no question MOVES be in front of the subject — Are you a teacher? beside You are a teacher — where Hindi puts क्या at the front and moves nothing (क्या आप शिक्षक हैं?). Write the pair so the learner sees the swap, and give the wh-question the same shape with its word first: How are you? · What is your name? (M1's My name is … answered). *You are a teacher? with only the mark changed is the Hindi habit and the mistake to show; every question ends in ? in display (the index strips edge punctuation, so you? indexes as you).",
        "Short answers keep the verb and drop the rest: Yes, I am · No, I'm not — Hindi answers with हाँ / नहीं alone or repeats the whole sentence, and both are possible in English, but the short answer is the idiom. The contraction policy starts here: I'm is the display form wherever speech contracts (I'm fine · No, I'm not), it is ONE index surface (surface.ts keeps the inner apostrophe), and it gets its own row with forms I'm · I am — a note true of both shapes, because sentence-final am never contracts: Yes, I am, never *Yes, I'm. Straight apostrophe only. not is its own row here (No, I'm not); M3's don't row will not re-teach it.",
        'One you for तू / तुम / आप, and it takes are for one person or many: the politeness Hindi puts into the pronoun and its verb (आप हैं) moves into WORDS — thank you, Good morning, a name, please (M8). Tag you delta, not interference: a Hindi speaker is used to a plural-shaped verb on a polite you (आप हैं), so you are is familiar ground; what is new is that there is no other choice to make. Keep the module in the first and second person — I and you — and hold he / she for M4, where the third person earns its -s.',
        "Adjectives never agree: fine, tired, happy are one form for a man, a woman, two people — I'm fine · you are fine · (from M4) she is fine — where Hindi's ठीक stays put but थका / थकी changes. This is delta and a rest point; say so. Feelings in depth are M9's: M2 needs the wellbeing pair fine / tired (and well, if used), and the be row from M1 answers am / are here, so do not re-deconstruct them.",
        "INDEX SEAM: teach good morning (and good night, if used) as a WHOLE two-token surface — the good inside it greets, it does not describe the morning — which keeps the bare good free for the adjective a later module writes (the tea is good) and morning free for M4's in the morning. thank you is whole too: it is a formula, and it leaves you to this module's pronoun row (a multi-token surface claims no bare part). The complexity floor is 3 words a sentence, so Thank you rides inside a longer line: I'm fine, thank you.",
      ],
      maxWordsPerSentence: 5,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M3': {
      id: 'L1-M3',
      title: 'Needs and wants',
      job: "Say what you want and don't want",
      patterns: [
        'I want + a/an/the + N',
        "I don't want + N",
        'I want to + V',
        'I need + N',
        'Do you want + N?',
        'I want + num + N-s',
      ],
      notes: [
        "Two shapes of wanting and one word between them: want + noun (I want tea · I want a book) and want TO + verb (I want to eat — मैं खाना चाहता हूँ). Hindi's infinitive खाना is one word, so *I want eat is the shape the Hindi habit produces and the mistake to show; to is obligatory and means nothing by itself. need works the same way (I need a pen · I need to go). INDEX SEAM: to is taught here as a BARE row, not inside a want to surface, so its note must already be true of the seats that will inherit the key — M4's go to school and M7's to the shop (को / तक): to is a verb-joiner before a verb and a direction word before a place. (M6's going to is a whole surface, so the to inside it never reaches this row — but the note should not contradict it either.)",
        "Negation needs a helper: I don't want tea — Hindi's one नहीं (मैं चाय नहीं चाहता) becomes do + not, and the main verb stays in its base form. *I not want tea and *I no want tea are the Hindi-shaped attempts; spend the mistake here. Contraction policy: don't is the display form (speech contracts it), ONE index surface, its own row with forms don't · do not — and it does NOT carry doesn't, which is M4's row and M4's lesson (the -s moves onto does). Negating be needs no do: I'm not a teacher (M2's not).",
        "Questions with an ordinary verb take the same helper in front: Do you want tea? — beside M2's Are you a teacher?, which moved be and borrowed nothing. That contrast is the module's comprehension work: be moves, every other verb borrows do. INDEX SEAM: this first bare do owns the key for the course, and do is also the main verb करना (What do you do? in M4 · I did my homework in M5), so the row's note defines BOTH — the helper that carries a question or a negative and means nothing, and the verb that means करना. does / doesn't and did / didn't are later modules' own rows.",
        'a / an vs the vs nothing, and the slogan to kill is "the = specific, a = any": the article answers one question — can the listener already tell WHICH one? Yes → the (I need the key: the one we both know). No, and it is one countable thing → a / an (I want a book: any book). A kind of thing in general, mass or plural → NOTHING (I want tea · I like books; I want the tea means a particular tea). the is first taught here and owns its key; a / an is M1\'s row. Write the three in one module so the learner sees them side by side, and make the pool test the choice.',
        "Plural -s after a number, and the noun must carry it: I want two books — Hindi can say दो किताब and mean the plural, English cannot (*two book), so that is the mistake. Nouns whose plural the module uses are rows with forms book · books. This is one of the two -s endings of the level — the NOUN's, met again after numbers in M8 — and M4 adds the other, the verb's he gets; say which one this is.",
      ],
      maxWordsPerSentence: 6,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M4': {
      id: 'L1-M4',
      title: 'My day',
      job: 'Daily habits and time words',
      patterns: [
        'I + V + at + time',
        'He/She + V-s + at + time',
        'I + V + in the morning / on Monday',
        'I + always/usually/never + V',
        "Does he/she + V? / He/She doesn't + V",
        'I have + N',
      ],
      notes: [
        'The spine is the present simple across persons, and the law is about where the -s goes: ONE letter marks the third person singular — I get up · you get up · he gets up · she gets up · we get up · they get up — and nothing else changes. It is the most-missed letter in Indian English, because Hindi marks the GENDER on a habit verb (उठता / उठती) and English marks the PERSON: a woman and a man both get up, and only he / she / it takes -s. Tag the -s interference and spend a mistake on *he get up. The slogan "English verbs don\'t change" is the one this module attracts, and it is exactly wrong about the one change that matters: one form for I / you / we / they, -s for he / she / it.',
        "Time words sit IN FRONT of the time: at 7 (सात बजे), in the morning (सुबह), on Monday (सोमवार को), every day (हर रोज़) — Hindi's postposition becomes a preposition, the slot M1 opened with from. Core set: at for a clock time, in for a part of the day, on for a day. INDEX SEAM: in / on / at are first taught here, and M7 will write them for PLACE (in the box · on the table · at home) and inherit these rows — so write each note true of both seats now: on = पर for a surface (on the table) and को for a day (on Monday); in = में for a place (in the box) and the part-of-day word Hindi leaves bare (in the morning = सुबह); at = a point, in time (at 7) or in space (at home). in the morning is in + the + morning with no phrase row (the is M3's), and morning is free because M2 taught good morning whole. Frequency words (always · usually · sometimes · never) go between subject and verb — I usually drink tea — and never carries its own negation: I never drink coffee, not *I don't never.",
        "get up and wake up are WHOLE two-token surfaces (the meaning is not the sum of the parts; forms get up · gets up), which keeps up unclaimed and, more usefully, keeps get free of a meaning it does not have here. The verbs of the day are rows with PRESENT forms only — go · goes, eat · eats, drink · drinks, work · works, sleep · sleeps — because their pasts are M5's new surfaces and M5's rows. Write I eat breakfast, never I have breakfast: have is taught in this module as possession, and a have-breakfast display would land a learner on a note that is false of it.",
        "Simple vs continuous, and the slogan \"-ing means now\" is the trap: a habit takes the simple present even while it is happening (I drink tea every day), and a STATE takes the simple present always — I know Rohan · I have two brothers · I like tea — so *I am knowing and *I am having two brothers are the classic Indian-English errors and this module's mistake plates. Keep the continuous OUT of M4's displays except inside a starred mistake: its one L1 job is M6's arrangements. have enters here as the state verb that trap needs, and it is POSSESSION only (मेरे दो भाई हैं → I have two brothers): its row owns the key, so auxiliary have stays out of L1 and M8 requests with Can I have as a whole surface. he / she arrive here as the third-person subjects the -s needs; say once that वह is both, and that picking the wrong one is the tell M10 returns to.",
        "Questions and negatives carry the person on the helper, not the verb: Do you get up early? · Does he get up early? · He doesn't get up early — the -s moves onto does and the main verb goes back to its base form. *Does he gets up is the double marking a Hindi speaker makes and the mistake to show. does and doesn't are this module's rows (doesn't lists doesn't · does not); M3's do row answers the bare do. Keep every sentence a daily habit — no past, no future, no requests; those are M5, M6 and M3.",
      ],
      maxWordsPerSentence: 6,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M5': {
      id: 'L1-M5',
      title: 'Yesterday',
      job: 'Past tense — went, ate, did',
      patterns: [
        'Yesterday + I + V-ed / went / ate',
        "I didn't + V",
        'Did you + V + yesterday?',
        'What did you + V?',
        'I was / We were + Adj',
      ],
      notes: [
        'THE structural rest point of the level, said as a delta: the past has ONE form for every person and every gender — I ate · she ate · they ate; I went · he went — where Hindi\'s past agrees (खाया / खाई, गया / गई) and, with a transitive verb, agrees with the OBJECT through ने (मैंने चाय पी · मैंने खाना खाया: पी follows चाय, खाया follows खाना). English never agrees in the past at all, so the learner has less to do, not more. The slogan "English verbs don\'t change" is false here in the other direction: the form changes for TENSE (eat → ate), never for person — say both halves.',
        "Regular pasts take -ed (work → worked, cook → cooked) and the verbs a day actually needs are irregular: went, ate, had, saw, did, drank, got up, was / were. Spend the irregular budget on the ones the sentences use and no more. INDEX SEAM: M4's verb rows list present forms only, so every past form is a NEW surface with its own row here (went: go का past, one form for every person) — EXCEPT be. was / were are added to M1's be row (forms am · is · are · was · were, note extended to the past) rather than opened as a second be row, because first occurrence wins and only M1's row will ever answer is: make that edit in M1's file when this module is authored, and let the note say that was / were split by number — I / he / she / it was · you / we / they were — where the present split by person.",
        "Negatives and questions take did + the BASE verb, and the tense lives on did alone: I didn't go · Did you eat? · What did you eat yesterday? — so *I didn't went and *Did you ate? are the double-marked shapes the learner produces (Hindi marks the past on the main verb and has nothing else to carry it) and THE interference of the module: spend the mistakes here. did / didn't are this module's rows (didn't lists didn't · did not), and the did row, like M3's do, defines the helper AND the main verb (What did you do? — one did that carries the tense, one do that means करना).",
        "yesterday anchors every sentence, and it is a delta worth one line: Hindi's कल is yesterday AND tomorrow and the verb decides; English has two words and the verb does not decide — yesterday and tomorrow (M6) carry the time the Hindi verb used to. Recycle M4's daily verbs into the past (I get up at 7 → Yesterday I got up at 8; got up is a new two-token surface, M4's get up row stays as it is) and keep the module bounded: no past continuous, no present perfect (auxiliary have stays out of L1), no used to.",
        "was / were carry states back into the past with no agreement and no did — I was tired · We were happy · Were you tired? (be still moves on its own, M2's law). was is the lesson, so a negative be is written whole here, I was not tired, rather than spending a row on wasn't; the module's budget is the verbs.",
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M6': {
      id: 'L1-M6',
      title: 'Tomorrow',
      job: 'Future and plans',
      patterns: [
        'I will + V + tomorrow',
        'Will you + V?',
        "I'm going to + V",
        "I'm + V-ing + tomorrow / next week",
      ],
      notes: [
        "will + base verb is the plain future, and it is a rest after M4–M5: I will go · she will go · they will go — no -s, no agreement, no gender (जाऊँगा / जाऊँगी → will go, one form). The two Hindi-shaped mistakes are *I will to go (M3's to misapplied: to follows want, never will) and *I will going; spend the mistake on *I will to go. will is written WHOLE in this module's statements and questions (I will go to Delhi tomorrow · Will you come?) because the auxiliary IS the lesson and the learner must be able to tap it; I'll may appear once, as a variation, with its own row (I'll · I will). won't stays out of L1 — M3's don't and M5's didn't have taught negation, and the module's spend is the three futures.",
        "Three ways to talk about tomorrow, and the slogan \"will is the future\" is the one to refuse — it is the tense-book answer and the least used of the three in speech. The law: will for a decision or a prediction (I will call you), going to for a PLAN already made (I'm going to visit my aunt), the present continuous for an ARRANGEMENT fixed with someone (I'm meeting her tomorrow). Lead with will (it does the module's work and has no agreement), give going to two or three sentences, and the arrangement one or two — the continuous's only L1 job, and the reason M4 kept -ing out of its displays. A time word (tomorrow, next week, on Monday) sits with every one of them, the way yesterday anchored M5.",
        "INDEX SEAM: teach going to as ONE two-token surface meaning the plan marker (forms going to only), so the to inside it never opens M3's row and go stays M4's. The cost is real and binds the rest of the course: the resolver takes the longest match first, so after this module no display may write going to + a PLACE — I'm going to the market would open the plan note, which is false of it. Movement is go to / went to / will go to (I will go to Delhi tomorrow), and the going to row's note says so in one clause. tomorrow is the module's word and M5's twin (कल both ways); if the module writes next week, next is its row (अगला) and M7's next to is a separate whole surface, so the two never touch.",
        "The arrangement sentence is the learner's first -ing, so say what it is made of: be (M1's row — I'm, she is) + verb-ing, and the -ing verb is a new surface with its own row (meeting = meet + -ing). Bound it: one or two sentences, always with a future time word, never for a habit or a state (M4's *I am knowing is still wrong); *I am meet (no -ing) and *I meeting her (no be) are the shapes to show if a mistake is spent here. her in I'm meeting her tomorrow is the object pronoun — and if it is the course's first her, its note also covers the possessive (her book = उसकी किताब), because one key answers both.",
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M7': {
      id: 'L1-M7',
      title: 'Where things are',
      job: 'Locations and prepositions',
      patterns: [
        'The + N + is/are + in/on/under + the + N',
        'Where is / are + the + N?',
        "It's + next to / near / behind + the + N",
        'There is + a/an + N + in/on + the + N',
        'There are + num + N-s + in/on + the + N',
      ],
      notes: [
        "Place words come BEFORE the noun — on the table (मेज़ पर), in the box (डिब्बे में), under the chair (कुर्सी के नीचे), next to the bank, near the school, behind the door — M1's from law at full stretch, and literal is the tool again: किताब है पर मेज़ under The book is on the table. *The book is table on is the Hindi shape and a mistake block. The article rides along: on THE table, the one we can both see (M3's law) — *on table is the Hindi habit dropping it.",
        "there is / there are is the dummy subject Hindi does not have: मेज़ पर एक किताब है starts with the place and has no subject word at all, so the Hindi speaker writes *On the table is a book — and that is the module's mistake. English must put SOMETHING before the verb, and there is that something: There is a book on the table · There are two cups in the box — is / are by the number of the thing (a book · two cups), the way M1's be split by person. Beside it, the plain sentence says where a KNOWN thing is — The book is on the table — so the pair is a book (new → there is) vs the book (known → the book is): M3's article law doing M7's work. Make the pool test the choice.",
        "Where is the shop? is M2's inversion with a question word: where first, is second, the thing third — Hindi's दुकान कहाँ है? keeps the verb last; Where are the cups? by number. it enters here as the pronoun for a THING (Where is it? · It's on the table): वह covers he, she and it, English splits people (he / she, M4) from things (it), and this row owns the key. it's is the module's contraction row (it's · it is) — It's on the table is the display, It is only where speech would say it whole. Point with this (This is my book), never that: that is M9's key (the conjunction), and a pointing that written here would hand M9's I think that … a note about pointing.",
        "INDEX SEAM: teach there is and there are as WHOLE two-token surfaces (one row, forms there is · there are), so the is inside them opens the existential note and not M1's be row — the longest match wins — and the bare there is claimed by nothing (L1 never writes it alone). next to and in front of are whole surfaces too (forms next to; in front of), which keeps next M6's (next week) and leaves of free for M8's a kilo of. in / on / at resolve to M4's rows, whose notes were written for this: nothing here may make them false. The new keys this module owns are under, near, behind, where, it / it's, there is / there are, next to, in front of — and the furniture the sentences name.",
        "Bounded: no possessive 's (my book · your book, never Rohan's book, a fresh surface L1 does not teach), no prepositional phrase inside a subject (The book on the table is … blows the bound), and having things is still M4's have (I have a car), not a lesson here — Hindi's मेरे पास एक गाड़ी है is where a learner reaches for there is, and the pair is worth one comprehension item, not a new rule.",
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M8': {
      id: 'L1-M8',
      title: 'Numbers & shopping',
      job: 'Prices, quantities, buying',
      patterns: [
        'How much is this?',
        'How much does it cost?',
        "It's + num + rupees",
        'Can I have + a/an / num + N(-s) + , please?',
        'a kilo / a bottle of + N',
        'How many + N-s + do you want?',
      ],
      notes: [
        "Two price questions and the helper each takes: How much is this? (be moves — M2's law) and How much does it cost? (an ordinary verb borrows does — M4's law, and cost stays base: *How much does it costs is the double marking again). It's fifty rupees answers both; rupees (रुपये) is the currency throughout — the course is for a Hindi speaker in India, so name it once and keep it — and the plural -s is on it. Hindi puts the price word last (यह कितने का है?); literal shows the jump.",
        "how much vs how many, and the law is COUNTABILITY, not size: how much for a mass noun and for money (How much rice? · How much is it?), how many for a countable plural (How many bananas? — with the -s). Hindi's कितना / कितनी / कितने split by gender and number, never by countability, so the Hindi speaker reaches for how much everywhere (*How much bananas?) — tag it interference and show it. INDEX SEAM: both are WHOLE two-token surfaces (forms how much; how many), which is what keeps how as M2's (How are you?) and leaves much / many unclaimed — L1 never writes them bare.",
        "Numbers are vocabulary the sentences use (two, five, ten, twenty, fifty, hundred), not a counting drill, and after a number the noun takes -s: two bananas · five rupees — M3's rule under pressure, because Hindi can say पाँच रुपये and, colloquially, पाँच रुपया, and English has no such latitude (*five rupee is the mistake). Quantities take of: a kilo of rice · a bottle of water · two kilos of sugar — a is M1's row doing the unit's work, and of is first taught here and owns its key (M7 kept in front of whole so that it would). one is the number and a is the unstressed one: I want one banana insists, I want a banana does not.",
        "Requests: Can I have two bananas, please? and the bare Two kilos of rice, please. please sits at the edge after a comma and is its own row — the politeness Hindi carries in दीजिए and आप lives in this one word (M2's law). INDEX SEAM: teach Can I have as ONE three-token surface, the request formula, so the have inside it never lands on M4's possession row (whose note is false of a request) and can stays unclaimed — L1 teaches no other can. The bound is 7 words, so requests stay short: Can I have a bottle of water? is exactly 7.",
        "this is the pointing word (How much is this? · This is fifty rupees) and it stays this: that is M9's key, and until M9 has claimed it the pointing that stays out of display. Keep the shopping simple — no comparatives (cheaper, more: L2-M9), no change / discount idioms — and make the pool test how much vs how many and the -s after a number.",
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M9': {
      id: 'L1-M9',
      title: 'Feelings & opinions',
      job: 'Why — because and so',
      patterns: [
        '<statement> + because + <statement>',
        '<statement> + , so + <statement>',
        'Why + are you / do you + …?',
        "I'm + Adj",
        'I think (that) + <statement>',
      ],
      notes: [
        "The pair that carries the module: because introduces the REASON and so introduces the CONSEQUENCE — I don't want coffee because I'm tired · I'm tired, so I don't want coffee — the same two facts in opposite order, so author them in pairs and make the pool test the choice. THE interference of the module is that Hindi uses BOTH in one sentence (क्योंकि मैं थका हूँ, इसलिए मुझे कॉफ़ी नहीं चाहिए is ordinary Hindi) and English takes exactly ONE: *Because I'm tired, so I don't want coffee is the classic Indian-English sentence and this module's mistake plate. Say it as the law — one connector for two clauses, either word, never both — and let literal show it once: मैं नहीं चाहता कॉफ़ी क्योंकि मैं हूँ थका.",
        "Why …? takes M2's inversion or M4's helper: Why are you sad? (be moves) · Why do you like tea? (an ordinary verb borrows do) — and the answer opens with Because (Because I'm tired: a fragment that is normal in speech; say so in usage and keep full sentences in display). Hindi's क्यों sits before the verb (तुम उदास क्यों हो?); literal shows why jumping to the front.",
        "Feelings ride be + adjective, and the adjective never agrees — I'm tired · she is tired · they are tired (थका / थकी / थके → tired) — M2's rest point at full stretch: tag delta, and do not re-deconstruct am / is / are. Hindi's dative feelings (मुझे गुस्सा आ रहा है) come out as be + adjective with the feeler as the SUBJECT — I'm angry — M1's like law again, and *Me anger is coming is the shape to show if a mistake is spent on it. Spend the new words on the feelings themselves (tired, happy, sad, angry, hungry, busy) and on very (very tired); so as an intensifier (so tired) stays OUT, because so is this module's consequence word and owns the key.",
        "Opinions: I think (that) the tea is good — that is optional and usually dropped in speech; write it in at least one display so it is taught, and make that row's note true of BOTH jobs of the word, because this is the course's first that and it owns the key: the conjunction कि (I think that …) and the pointing word वह (That is my book) — one spelling, one row, two uses. M7 and M8 pointed with this precisely so this module would get the key. I think takes no helper in a statement and the usual do in a question (Do you think …?).",
        "Bounded: no if (L3-M4), no comparatives, no too / enough; because and so are each ONE row (so = इसलिए, the consequence word, never the intensifier), and the bound is 8 words — I'm tired, so I don't want coffee is 7, which is the shape every pair should stay inside.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M10': {
      id: 'L1-M10',
      title: 'Connected talk',
      job: 'Short 2–3 sentence exchanges',
      patterns: [
        '<M1–M9 pattern> + <M1–M9 pattern>',
        '<question> → <answer + because + reason>',
        '<statement> + and / but + <statement>',
        '<statement> + . + Then + <statement>',
      ],
      notes: [
        'Each item is a TURN of 2–3 short sentences, not one long one — a question and its answer, or a statement, a reason and a follow-up. The per-sentence bound applies to each sentence inside the turn.',
        "Recombination is the lesson: nearly everything comes from M1–M9. The honest new spend is the joiners that hold a turn together — and, but, also, then — and little else. Keep the turns everyday and symmetric: greeting → wellbeing → plan (Good morning, Rohan. · How are you? · I'm fine, thank you. I will go to Delhi tomorrow.); want → reason → buy.",
        "The slogan this module attracts is the Hindi speaker's own ear: थक गया is a whole sentence, so *Am tired and *Went to the market yesterday come out once the person is established in a turn. The law: an English sentence always has a subject word, even when the context has made it obvious — I'm tired · It's very good — and the second sentence of a turn repeats the pronoun Hindi would drop. This is the mirror image of en-es's pro-drop rule and the one loud thing of the module: tag it interference and spend the mistakes here (*Am tired · *Is a good shop · *Went to the market yesterday).",
        'he vs she, at last: वह is one word for a man and a woman, and a Hindi speaker who learned he first says he for everyone — mixing them inside one turn (My sister is a teacher. *He works in Delhi.) is the tell and a mistake plate here. State it as the law M1\'s "no gender" slogan hid: nouns and verbs carry no gender, but the pronoun for a PERSON must be chosen — he for a man, she for a woman, it for a thing (M7) — and once chosen it holds for the turn. Articles in running text: the second mention of a thing takes the (I have a book. The book is on the table.) — M3\'s law across a sentence boundary, and worth one turn.',
        "Language of the fields holds to the last turn: Hindi (Devanagari) in every teaching field — rules[].text, note, trap, sound, changed, why, usage, mnemonic, cue — English only in display and forms; no glossEn on any sentence; literal wherever a turn's order moves. A turn is where an author is most tempted to slip an English aside into a note because the English is right there; do not — the note is read in a Hindi voice on screen, and hi-mr's English notes are the quirk this course does not copy.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M1': {
      id: 'L2-M1',
      title: 'Asking politely',
      job: 'Requests, thanks, apologies in the right register',
      patterns: [
        'Please + V + <object>',
        'Can you + V + <object>?',
        'Could you + V + <object>?',
        'Would you mind + V-ing + <object>?',
        'Excuse me + , + <request>',
      ],
      notes: [
        "REGISTER, decided for the whole level and repeated here because a prompt only ever shows an author the notes (full record: docs/55-hi-en-L2-brief-decisions.md; the four L1 decisions — Hindi in every teaching field with no glossEn, contractions as single index surfaces, multi-token surfaces, first-occurrence-wins owners — carry into L2 unchanged, field for field). Hindi grades a request in the VERB — दे · दो · दीजिए — on top of तू / तुम / आप. English has one you, one imperative, and buys the entire scale with words and with sentence SHAPE: Give me the book → Please give me the book → Can you give me the book? → Could you give me the book? → Would you mind giving me the book? The law: English politeness comes from turning the request into a QUESTION and from making it LONGER; the verb never changes. #422's chip carries the tiers — the bare imperative among friends chips `informal`, the please / Can you tier `neutral`, Could you and Would you mind chip `formal`.",
        "THE interference, and it deserves the module's first mistake block: a learner who maps दीजिए onto imperative-plus-please produces Do it, please — grammatical English, and blunt. So is Give me a pen, please to a stranger. State the true rule rather than a politeness scale of adverbs: please softens an order and does not turn it into a request; only the question form does that. Author the same request at all three tiers side by side so the ladder is visible in one screen.",
        "The Indian-English line, drawn once for the course: kindly do the needful, please revert and I am having a doubt are ordinary in the English the learner hears every day and are NOT errors — but they read as archaic or opaque to the international reader this course is preparing them for. The rule is en-ar's dialect rule in another language: an Indian-English form may be NAMED in usage prose, in words, and never appears in display, in forms or in a pool item. This module carries the kindly line; M7 carries the isn't it? line; no other module needs one, and no rule anywhere calls the variety wrong.",
        "Sorry against Excuse me, a split Hindi's माफ़ कीजिए does not make: sorry apologises for something that has happened (you stepped on a foot), excuse me asks for something about to happen (you want to get past, or to interrupt, or to ask a stranger a question). Getting them backwards is the most audible small error a Hindi speaker makes in English, and it costs nothing to fix. sorry is L1-M10's row, re-taught here and owned there; thank you is L1-M2's multi-token surface, climbing to thanks a lot without opening a second row.",
        "INDEX SEAM: could, can't, mind, me, excuse me, thanks a lot and would you mind are this module's keys. can't is its own row with can't · can not · cannot in forms (the L1 contraction policy: both shapes on one row, the note true of all of them) and it does NOT pre-list couldn't, which is M8's. Would you mind rides as a three-token surface, the maximum this course spans, so that would stays free for M9's I'd rather and mind stays free as a verb; Excuse me rides as a two-token surface, which is what leaves the bare me to this module's own request frames. please stays L1-M8's row.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M2': {
      id: 'L2-M2',
      title: 'Describing people',
      job: 'Appearance, character, relationships',
      patterns: [
        '<person> + is + Adj',
        "<person> + has got / 's got + <feature>",
        'My + N + is + Adj + and + Adj',
        "<person>'s + N + is + <name>",
        'a + Adj + Adj + N',
      ],
      notes: [
        "The delta a Hindi speaker feels first is an ABSENCE: English adjectives never agree. लंबा · लंबी · लंबे bends for gender and number; tall does not — a tall man, a tall woman, tall women, and the word is the same every time. Nine modules of Hindi habit are pushing the other way, so state it as a law and not as a footnote, and let the module's pool test it (a tall women is the error to catch). The second half is order: English fixes the sequence of stacked adjectives (opinion before size, size before colour — a nice tall young man) where Hindi is freer. M3 gives the full ladder; here two adjectives is enough.",
        "THE marker to spend a mistake on: He is having brown eyes. State verbs — have, know, like, want, need, understand — do not take -ing in international English, however ordinary the progressive is in Indian English. The law is about what the verb MEANS, not about the moment: have describes a state that simply holds, so there is no ongoing version of it to report. This pays off L1-M4's have row (possession only) and L1-M10's have got, which is the natural way to say it: She's got long hair.",
        "The possessive 's opens here, and L1 banned it on purpose — so say why the ban lifts and what it costs. My brother's name is Rohan is the sentence relationships need. The index sees brother and brother's as two different words, so the possessive gets its own row pointing back at the bare noun, and a proper-noun possessive (Rohan's) never indexes at all (#61) — anchor the taught row on a common noun. Name the collision in the same note: 's is also is (he's, L1-M6) and has (he's got, L1-M10), so the learner meets three of them and deserves one honest note rather than three confident ones.",
        "The family set is where English is POORER than Hindi, and a course that only ever teaches deltas one way would hide it: cousin covers चचेरा, ममेरा, फुफेरा and मौसेरा alike; uncle and aunt each cover four Hindi words; brother and sister carry no age, so बड़ा भाई needs older brother. Teach the workarounds (my mother's brother, my older sister) and let usage say plainly that English cannot make the distinctions Hindi makes without extra words. wife, husband, son, daughter, father, mother, parents are the rest of the spend; brother, brothers, sister and sisters stay L1-M4's and L1-M10's rows.",
        "INDEX SEAM: tall, short, young, old, kind, funny, clever, quiet, friendly, hair, eyes, cousin, uncle, aunt, wife, husband, son, daughter, father, mother, parents and the possessive rows (brother's, sister's, friend's) are fresh keys. hair is UNCOUNTABLE in the mass sense (she's got long hair, never *hairs) — the first of M3's uncountables, flagged here so M3 can lean on it. has and have stay L1-M4's row; he's, she's and they're stay L1-M6's; he's got and she's got stay L1-M10's multi-token surfaces, which is what keeps got free.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M3': {
      id: 'L2-M3',
      title: 'Describing things',
      job: 'Size, colour, quality — agreement at length',
      patterns: [
        'The + N + is + Adj',
        'a + Adj + Adj + N',
        'some + N-uncountable',
        'a lot of + N   /   much + N?   /   many + N-pl?',
        'a + <counter> + of + N-uncountable',
      ],
      notes: [
        '"Agreement at length" means something different in English than in every other course here, and this module is where it bites: adjectives do not agree at all (M2\'s law), but NOUNS split into countable and uncountable, and that split has no counterpart in Hindi. सामान, फल and सलाह are counted freely; luggage, fruit, advice, information, furniture, bread, money, water and hair are not. *Three luggages, *many informations and *a good news are the errors, and they are the most persistent ones a Hindi speaker makes in English. The law: an uncountable noun names a KIND rather than units — it takes some, a lot of and a counter (a piece of, a glass of, a slice of), never a and never -s.',
        'much and many belong to this module and their real rule is not the one usually taught. "much for uncountable, many for countable" is correct about grammar and wrong about usage: *I have much money is not English. The law: much and many live in questions and negatives (Is there much sugar? I haven\'t got many pens), and a positive statement takes a lot of. L1-M8\'s how much and how many are multi-token surfaces, so the bare words are free for this module — say so, because a learner who has asked how much for two levels has never met much on its own.',
        "The adjective-order ladder in full, since M2 only needed two: opinion → size → age → colour → origin → material → noun. a nice big old brown wooden table is nobody's sentence, but the ORDER is fixed and Hindi's is not, so a learner who says a brown big table sounds wrong for a reason they cannot hear. Teach the working version — opinion before fact, size before colour — and let the full ladder sit in a rule for reference.",
        "Colours and qualities are the vocabulary spend: red, blue, green, black, white, yellow, brown; big and small (with L1-M3's some and L1-M8's this and that pointing at them), long, short (M2's, re-taught for things), heavy, light, clean, dirty, cheap, expensive. Pair each with an L1 noun so the module drills grammar and not vocabulary: The bag is heavy, These bottles are expensive.",
        "INDEX SEAM: much, many, a lot of, red, blue, green, black, white, yellow, brown, big, small, heavy, light, clean, dirty, cheap, expensive, luggage, advice, information, furniture, bread, money and piece are fresh keys. a lot of rides as a three-token surface — the course's span limit — so that a stays L1-M1's, lot stays free and of stays L1-M8's (kilo of). some stays L1-M3's row, its note now doing uncountable work; the, a and an stay L1-M3's and L1-M1's. water and sugar (L1-M3) are re-shown here as uncountables, which is what they always were: the note points back rather than opening a row.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M4': {
      id: 'L2-M4',
      title: 'Getting around',
      job: 'Directions, transport, asking the way',
      patterns: [
        'Excuse me + , + how do I get to + <place>?',
        'Turn left / Turn right / Go straight',
        'Take the + <ordinal> + left',
        'Get on / Get off + the + N',
        'I go to + <place> + by + N-transport',
      ],
      notes: [
        "Phrasal verbs arrive properly here, and L1 already built the machinery for them: get up and wake up are multi-token surfaces (L1-M4), so the pattern is familiar and the index handling is settled. get on, get off, get in and get out of are each ONE surface with its own row, and the bare get — free, because L1 only ever indexed the phrases — is this module's, with a note true of the family and of get a ticket alike. The delta worth naming: the particle is not a preposition and cannot be dropped or guessed; get on a bus and get in a car are fixed, and Hindi's single चढ़ना covers both.",
        'The zero article, which Hindi speakers cannot get from Hindi because Hindi has no articles at all: by bus, by train, by car take NO article (*by the bus is the error), and go to school, go to work, go to bed (L1-M9) name the institution rather than the building and take none either — but go to the shop, go to the bank and go to the market do, because those are places. Give the working rule (the activity takes no article, the building does) and one honest line saying English speakers cannot state the rule either, they have simply learnt the list.',
        "Directions are the vocabulary spend: turn, left, right, straight, opposite, across from, corner, traffic light, crossing, road, station, ticket, far. The frames are M1's politeness in the field — Excuse me, how do I get to the station? — which is chipped `neutral` and is the right register for a stranger; a bare Where is the station? is not rude but is noticeably abrupt, and usage should say so rather than a rule.",
        "next to and in front of stay L1-M7's multi-token surfaces and are re-shown here doing directions; near and behind stay L1-M7's rows; on and in stay L1-M4's, whose notes were written true of both the time and the place seat. This module owns opposite and across from, and across from rides as a two-token surface so that across stays free.",
        "INDEX SEAM: get, get on, get off, get in, get out of, turn, left, right, straight, opposite, across from, corner, traffic light, crossing, road, station, ticket, far, by (the means-of-travel one) and second are fresh keys. by is a genuinely new word — L1 never indexed it — so its row is written for the means reading and named as the one this course teaches. take and takes stay L1-M3's row, doing take the second left and take a bus here; how stays L1-M2's, because how do I get to… is not a multi-token surface and must not become one.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M5': {
      id: 'L2-M5',
      title: 'Food and hosting',
      job: 'Ordering, offering, refusing without offence',
      patterns: [
        'Would you like + some + N?',
        "I'd like + a/an + N + , + please",
        'Can I have + the + N + , + please?',
        'No + , + thanks + , + <reason>',
        'Could you pass me + the + N?',
      ],
      notes: [
        "The offer frame is the module's grammar, and the reason is register rather than tense: Do you want some tea? is perfectly grammatical English and lands as blunt or even challenging, where Hindi's क्या आप चाय लेंगे? is neutral. Would you like…? is what a host says, and I'd like… is what a guest orders — the same would, two seats, one pair of rows. This is M1's law paying off immediately: politeness is bought with a longer, less direct frame, not with a different verb.",
        "some in a question, which contradicts the rule most learners are given: Would you like some tea? uses some, not any, because an OFFER expects yes. The law: any is for open questions and negatives (Have you got any sugar? I haven't got any), some is for offers, requests and positive statements. any is this module's key and some stays L1-M3's row, its note now covering both jobs.",
        "Refusing without offence is the cultural half, and it runs in BOTH directions here, which is rarer and more useful than a one-way delta. In Indian hosting a first refusal is often ritual and a host is expected to insist; in international English No, thanks is taken at face value, and insisting past it reads as pressure rather than as hospitality. So a learner needs the softeners that make a refusal final and warm at once — No, thanks, I'm full · Maybe later · I'm fine, thanks — and a host needs to know that one offer is enough. Put both halves in usage; no rule moralises about either culture.",
        'Countability in the field, straight out of M3: a coffee means a cup of coffee and two teas is normal in a café, which looks like it breaks the uncountable law and does not — the container is being counted, not the substance. Say that, because a learner who has just met the law will otherwise decide it has exceptions rather than a mechanism. The rest of the spend is food: bread (uncountable), vegetables, chicken, salt, plate, spoon, glass, bill, menu.',
        "INDEX SEAM: would, would you like, I'd, like (the would-like sense), any, full, bread, vegetables, chicken, salt, plate, spoon, glass, bill and menu are fresh keys. I'd is its own row with I'd · I would in forms and does NOT pre-list you'd, which is M6's. Would you like rides as a three-token surface, which keeps the bare would available for the row this module also opens — and note that L1-M1's like row is the VERB (I like tea): the would like sense is a different word wearing the same spelling, so its note must be written on the multi-token row and never allowed to overwrite M1's. Can I have stays L1-M8's whole surface, thanks and thank you stay L1-M2's, please stays L1-M8's.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M6': {
      id: 'L2-M6',
      title: 'Making plans together',
      job: 'Invitations, suggestions, settling a time',
      patterns: [
        "Let's + V",
        'Shall we + V?',
        'How about + V-ing?',
        'Are you free on + <day>?',
        "I'm meeting + <person> + at + <time>",
      ],
      notes: [
        "L1-M6 already settled the three futures (docs/39): will for a promise or a decision made now, going to for an intention, and be + -ing for an arrangement. So this module does not teach the future again — it teaches the SUGGESTION frames that sit on top of it: Let's go, Shall we go?, How about going?, Do you want to go?, Are you free on Friday? Say that in the first note, because a brief that re-opened the futures would spend the whole budget re-teaching what the learner has.",
        "THE delta of the module is time prepositions, where Hindi's one postposition faces an English three-way fork with a memorised exception: at + a clock time (at seven, at half past eight), on + a day or date (on Friday, on Monday — L1-M4 shipped that seat), in + a month, a year or a part of the day (in the morning, in the evening) — and then at night, which breaks the pattern and simply has to be learnt. Name the exception rather than smoothing it over; a rule that pretends English is regular here will be contradicted by the first evening the learner talks about.",
        "The clock is the other spend: o'clock, half past, quarter past, quarter to, and the days the plan needs (Friday, Saturday, Sunday — L1-M4 owns Monday). English says half past eight where Hindi says साढ़े आठ and the number moves; that mismatch is worth one mistake block, because a learner who translates literally arrives an hour early.",
        "Agreeing and settling: okay (L1-M10), sure, that sounds good, see you then (L1-M10's see you). Keep the invitations among friends — this module chips `informal` where the frame is friends-only (Let's, How about) and `neutral` for Shall we and Are you free — and let M7 carry the business register.",
        "INDEX SEAM: let's, shall, how about, free, sure, sounds, o'clock, half past, quarter past, quarter to, Friday, Saturday, Sunday and you'd are fresh keys. let's is its own row with let's · let us in forms, and how about rides as a two-token surface so that how stays L1-M2's and about stays free. going to stays L1-M6's PLAN marker and no display in this module may write going to plus a place — L1's decision 3, still binding. at, on and in stay L1-M4's rows, and their notes were written true of the time seat, which is the one this module uses.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M7': {
      id: 'L2-M7',
      title: 'On the phone',
      job: 'Calls and messages — openings, closings, taking a message',
      patterns: [
        'Hello + , + this is + <name>',
        'Can I speak to + <name> + , + please?',
        "He's not in + . + Can I take a message?",
        "I'll call you back + , + <time>",
        "<statement> + , + aren't you? / isn't he?",
      ],
      notes: [
        "Tag questions are this module's grammar and they are English at its least Hindi-like: Hindi appends one invariant tag — ना, है ना — and English MIRRORS the sentence's auxiliary and FLIPS its polarity. You're coming, aren't you? · He doesn't know, does he? · You've got my number, haven't you? Every tag is built, none is memorised, and the auxiliary the learner needs is always already in the sentence. Author them against the auxiliaries the course owns (are/aren't from L1-M9, do/don't from L1-M3, does/doesn't from L1-M4, will/won't from L1-M6).",
        "The Indian-English line, drawn a second and last time: isn't it? as a universal tag — You're coming, isn't it? — is ordinary in Indian English and is not an error in it. It is also not international English, and a learner reaching for it is reaching for the ONE tag Hindi's ना taught them. Name it in usage, in words, never in display; the mistake block shows the mirrored tag instead, and no rule calls the variety wrong.",
        "This is Rohan is what English says on a phone where Hindi says मैं रोहन बोल रहा हूँ — not I am Rohan, which sounds like an introduction at a door. It is a small, fixed, high-frequency delta and it belongs in the first sentence of the module. this is rides as a two-token surface, so that L1-M8's this and L1-M1's is are both left where they are.",
        "say · tell · speak · talk, the four-way split of Hindi's बोलना and कहना, and the phone is where all four turn up in one conversation. The law is about what follows them: tell takes a person (tell me, tell him), say does not (*say me is the error, say something to me is the repair), speak and talk are about the activity (speak English, talk to my brother, speak to Rohan on the phone). Give the frames, not a synonym list; *He told that he will call is the sentence to catch.",
        "INDEX SEAM: this is, speak, message, back, hold on, wrong number, in (the not-in sense — a second job for L1-M4's row, pointed back at, never re-opened), say, tell, talk and moment are fresh keys where they are not already owned. Reported speech is NOT opened here: a message is taken with Can I take a message? and passed on with He called, which is L1-M5's past simple; He said that he would call is L3-M5's and is named as deferred in this note. it's, there's and where's stay L1-M7's rows; I'll stays L1-M6's.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M8': {
      id: 'L2-M8',
      title: 'When something goes wrong',
      job: 'Problems, asking for help, complaining calmly',
      patterns: [
        "I've lost + my + N",
        "The + N + doesn't work",
        'Can you help me + , + please?',
        "I'm afraid + <statement>",
        "There's a problem with + the + N",
      ],
      notes: [
        "The present perfect enters HERE and nowhere else in L2, and the level's decision record says why: a problem report is where English speakers actually use it — I've lost my key, The bus hasn't come, I haven't got my ticket — and the simple past cannot say that a past event still matters now. It is lifted narrowly: the PRESENT RESULT use only, on verbs the course already owns, with have / has plus a past participle taught as a pair of shapes rather than as a system. Its experience and duration uses (I've been to Delhi, I've lived here for a year) are named in this note as L3's and no display may show them.",
        "The law that makes it teachable, and the slogan that ruins it: \"the present perfect is for the recent past\" is false and produces *I've lost it yesterday. The rule is that the present perfect is about NOW — the past event is mentioned only for the result it left — which is exactly why it can never carry a finished time expression. I've lost my key holds whether the key went missing a minute or a month ago; I lost my key yesterday is the simple past because the sentence is about yesterday. Spend the module's mistakes on this pair, side by side.",
        "Complaining calmly is the register lesson of the level and its sharpest test: English complains INDIRECTLY, and a direct complaint that is neutral in Hindi reads as aggressive in English. The hedges are the content — I'm afraid…, There seems to be a problem, Sorry to bother you, but… — and they are words rather than forms, exactly as M1 said politeness would be. This is worth stating as the module's law: in English the more serious the complaint, the softer the frame.",
        "The rest of the kit: it doesn't work (L1-M4's doesn't doing its most useful job), it's broken, I can't find it (M1's can't), Can you help me?, should and shouldn't for advice, and the past simple from L1-M5 for anything with a finished time. help, problem, broken, lost, ticket, wallet, late (L1-M9) and again are the vocabulary.",
        "INDEX SEAM: haven't, hasn't, shouldn't, couldn't, should, lost, broken, found, help, problem, wallet, afraid, bother, seems and again are fresh keys. haven't and hasn't are separate rows — the L1 policy forbids a row pre-listing its sibling, which is why M3's don't never carried doesn't — each with both shapes in forms. lost and broken are past PARTICIPLES sitting in the forms of their verbs' rows where those rows exist, and getting their own row where they do not; the note says which, because a participle that quietly becomes a second verb row is how a course loses track of a paradigm.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M9': {
      id: 'L2-M9',
      title: 'Comparing and choosing',
      job: 'More, less, better — stating a preference',
      patterns: [
        'A + is + Adj-er + than + B',
        'A + is + more + Adj + than + B',
        'the + Adj-est + N   /   the most + Adj + N',
        'A + is + as + Adj + as + B',
        "I'd rather + V   /   I prefer + N",
      ],
      notes: [
        "The comparative changes the ADJECTIVE, which Hindi never does: राम श्याम से लंबा है compares with a postposition and leaves लंबा alone, while English says Ram is taller than Shyam. Two errors follow from that one fact and both deserve a mistake block: *Ram is more taller (the double comparative, because the learner marks the comparison twice) and *Ram is tall than Shyam (because Hindi's adjective needed no change). The law for which form: one syllable takes -er, three or more take more, two syllables go either way except that a final -y always becomes -ier (busier, happier, from L1-M9's busy and L1-M5's happy).",
        "than and then are one letter and no audible difference apart, and then is L1-M10's key — the sequencer an account uses. A brief that let than be spelled then would send every comparison in the course to a note about what happens next, and first occurrence wins, so no later row could take it back. Write than with its a every time; the note on this row says the pair out loud, because the learner will hear them as the same word.",
        'The superlative takes the, always — the tallest, the most expensive — where the comparative takes none, and the irregulars are the four that matter: good → better → the best, bad → worse → the worst. better serves both good and well, which is why He plays better is not a mistake and *He plays more good is. The slogan to kill is "add -er and -est": it produces *beautifuller and *expensivest, and the syllable rule above is what replaces it.',
        "as … as is the equality frame and it is safe here in a way it is not in every course: as tall as Rohan, not as tall as him is a level too far — keep the object to a name or a noun. Choosing needs Which one?, I'd rather (M5's I'd, doing a second job — its row's note must be true of both I'd like and I'd rather) and I prefer, which takes a noun or an -ing form and not a bare infinitive: *I prefer to going is the error, I prefer tea and I prefer going both work.",
        "INDEX SEAM: than, more, most, less, better, best, worse, worst, as, rather, prefer, which and taller-type comparative shapes are fresh keys. A comparative shape belongs in the forms of the adjective's own row where that adjective is this level's (tall · taller · tallest, M2's row) and gets a row of its own only where the adjective is L1's and cannot be edited — the additions-only law, stated in the level's decision record. so stays L1-M9's consequence word; very stays L1-M2's; that stays L1-M9's conjunction row, whose note already covers the pointing word.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M10': {
      id: 'L2-M10',
      title: 'Telling what happened',
      job: 'A four-sentence account in the past',
      patterns: [
        'First + , + <past simple> + . + Then + , + <past simple>',
        '<past continuous> + when + <past simple>',
        '<past simple> + because + <past simple>',
        'After that + , + <past simple> + . + Finally + , + <past simple>',
      ],
      notes: [
        "Each item is an ACCOUNT of exactly four short sentences, not one long one, and the per-sentence bound applies to each sentence inside it. The sequencers are the honest new spend — first, after that, finally, joining L1-M10's then, and, but and so — and everything else is recombination. The four L1 decisions still bind at the end of the level exactly as they did at the start: Hindi in every teaching field with no glossEn; every contraction one surface and one row with both shapes in forms; multi-token surfaces claiming no bare part; and first occurrence winning, so no row here reaches back to redefine an L1 key.",
        "THE structure of the module: the past continuous carries the background and the past simple moves the story — I was waiting at the station when the phone rang. was and were are L1-M1's be row, which L1-M5 extended with the past rather than opening a second row, so this module extends nothing and simply uses it. The delta is the pairing, not the forms: English marks background with a TENSE where Hindi marks it with रहा था in a shape the learner already has, so this is closer to transfer than to new grammar — say so, and spend the budget on when, which glues the two clauses and is this module's key.",
        "The error an account produces at length, even from a learner who passed L1-M5: *I didn't went. did and didn't carry the past, so the main verb goes back to its base form — I didn't go, Did you go? — and the same rule governs the question. One mistake block, and then let the accounts drill it, because four sentences give it four chances to appear.",
        'Build the accounts from scenes the ladder supports: a plan that fell through (M6 and M8), a call at the wrong moment (M7), a meal (M5), directions that went wrong (M4). Keep them everyday and keep the clauses short; an account is four small sentences that hang together, not one long one broken up by full stops.',
        "Nothing new is opened here. The past perfect (I had gone), used to, the passive and reported speech all stay OUT and are named in this note as L3's — reported speech specifically is L3-M5's, which is why M7 took a message without it. INDEX SEAM: first, after that, finally, when, rang, waiting and the irregular past forms an account needs are fresh keys; each past form belongs in the forms of its verb's row where the course owns that row, and the note points back rather than opening a second one. then, and, but, also and so stay L1-M10's and L1-M9's rows; because stays L1-M9's; yesterday stays L1-M5's.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
  },
  'en-ru': {
    'L1-M1': {
      id: 'L1-M1',
      title: 'Who I am',
      job: 'Introduce yourself and state what you like',
      patterns: [
        'Menyá zovút + name',
        'Ya iz + place (gen.)',
        'Ya + N (nom.)',
        'Éhto + N (nom.)',
        'Ya lyublyú + N (acc.)',
      ],
      notes: [
        'THE ZERO COPULA, and it is the module. Russian writes no present-tense "to be" at all: Ya studént is "I student" and Menyá zovút Iván is "me they-call Ivan". There is no word to leave out and no word to put in — *Ya yest\' studént is the English habit and THE interference of this course. Use literal on every sentence so the missing verb is visible, and tag it interference, not delta: the gap is easy to read and hard to write. The slogan this module attracts is "Russian has no verb to be"; the law replacing it is that only the PRESENT is zero — byl (M5) and búdu (M6) are real words, and M5 opens the one byt\' row that says so.',
        'NO ARTICLES, at all. kníga is "book", "a book" and "the book", and nothing marks the difference. That is a delta — one whole system with nothing to learn — but say the second half too, because M10 pays for it: the work English gives a/the is done in Russian by WORD ORDER, and new information goes last. Do not let a rule here promise that articles are simply absent.',
        'Menyá zovút is a chunk, taught whole as one two-token surface: it keeps the bare menyá free and it is how a name is actually given. Moyó ímya — Iván is grammatical and nobody says it. The ya row is opened here with forms ya · menyá · mne — the subject, the object and the to-form of one pronoun — and its note names all three jobs, because first occurrence wins and M9’s mne khólodno will land on this row.',
        "NOUN GENDER, by ending, with its exceptions stated rather than hidden: a noun ending in a consonant is masculine (stol, khleb, chay), one in -a/-ya is feminine (kníga, vodá, múzyka), one in -o/-e is neuter (molokó, pis'mó). Two honest caveats belong in the note the first time they bite: nouns ending in the soft sign -' can be either and must be learned with their gender (rubl' is masculine, dver' feminine), and kófe is masculine despite its -e. Gender is a property of the noun, learned with it — \"-a is feminine\" is memorable and incomplete (pápa, muzhchína are masculine).",
        "Ya lyublyú + object names the ACCUSATIVE SLOT without teaching an ending. Choose the liked things so the form does not move: chay, khleb, sport, molokó are masculine-inanimate or neuter, which look identical in the accusative, and kófe does not decline at all. Say that plainly and promise M3, where the feminine ending lands. lyubít' is a class II verb with a stem change in the I-form only — lyublyú · lyúbite — so write lyublyú and leave the paradigm to M4.",
        'Ya iz Índii is the one place a case ending appears in M1, and it is taught as a frozen partner, not a system: iz always takes the genitive, and Índiya becomes Índii, Moskvá becomes Moskvý. INDEX SEAM: Índii is ALSO the prepositional (v Índii), so M1’s Índiya row carries Índiya · Índii and its note is written true of both seats — a later v Índii would otherwise land on a note that says only "from".',
        'REGISTER, ratified for the whole course and repeated here because a prompt only ever shows an author the notes: this course speaks vy, the polite address, and ty never appears in an L1 display line. M1 is all first person, so nothing here is addressed yet — but the sound and usage lines may already say that Russian will ask the learner to choose, and that this course has chosen. Write yó wherever a word has it (the course-wide policy: poshyól, vsyó, yeyó, never the e-spelling), because the index keeps yó and e apart.',
      ],
      maxWordsPerSentence: 5,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M2': {
      id: 'L1-M2',
      title: 'First exchange',
      job: 'Greetings, wellbeing, yes/no questions',
      patterns: [
        'Zdrávstvuyte + , + name',
        'Kak delá?',
        'Kak vas zovút?',
        'Vy + V-ete/-ite + ?',
        'Da / Net + , + <statement>',
        'Ya + Adj-short (ustál / ustála)',
      ],
      notes: [
        'A YES/NO QUESTION MOVES NOTHING. Vy iz Moskvý? is the statement Vy iz Moskvý with a question mark — no auxiliary appears, no word changes place, and nothing corresponds to English do or are. Spoken Russian carries the question in a rising pitch on the questioned word, which is what the ? stands for; say that in sound rather than pretending punctuation is the whole story. This is a clean delta and the module should spend it: English speakers reliably over-build the question.',
        'REGISTER, decided course-wide and stated here because this is the module that addresses somebody: this course speaks vy. Zdrávstvuyte is the greeting (privét is the ty-tier one and belongs in a usage line, never on a hero line); Kak vas zovút? asks the name; every second-person verb in L1 is the vy-form. The false slogan is "vy is just the plural of ty"; the law is that vy is BOTH the plural and the singular-polite, and it always takes the plural verb form even for one person. ty exists, takes its own endings, and is L2’s job — say that once, here.',
        'Kak delá? is the exemption, and an honest one: it contains no second-person word at all — it is verbless, "how [are the] affairs" — so it carries no ty/vy marking to get wrong. The fully polite expansion is Kak u vas delá?, and the usage line says to prefer it with somebody just met. INDEX SEAM: teach kak delá as ONE two-token surface, which leaves the bare kak free for this module’s own "how" row in Kak vas zovút?.',
        'THE SPEAKER’S OWN GENDER IS IN THE SENTENCE. Ya ustál is said by a man and Ya ustála by a woman — the short-form predicate agrees with whoever is speaking, and English marks this nowhere. One row, forms ustál · ustála, and a note that says the gender is the SUBJECT’s (with vy it is the person being asked), never "the speaker’s" as a slogan — that exact imprecision is the defect the third Marathi review had to correct three times.',
        'Short answers are Da / Net plus the statement: Da, ya iz Moskvý. INDEX SEAM: net is this module’s row, meaning "no". Its second life as the existential negative ("there isn’t") takes the genitive of negation, which this level does not teach — the note names that job and says it is L2’s, and no L1 display writes net in that sense. Same discipline on khoroshó, whose row is opened here as the answer "fine" and whose note must also cover the adverb "well", because M9 and M10 reuse the key.',
        'Other whole surfaces to claim here, each leaving a bare word free: dóbroye útro (which leaves útrom to M4 — a different surface, so no clash) and do svidániya. Spend the rest of the budget on spasíbo, pozháluysta and Kak vas zovút?, and keep every sentence to the greeting exchange: no wants, no past, no plans.',
      ],
      maxWordsPerSentence: 5,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M3': {
      id: 'L1-M3',
      title: 'Needs and wants',
      job: "Say what you want and don't want",
      patterns: [
        'Ya khochú + N (acc.)',
        'Ya ne khochú + N (acc.)',
        'Ya khochú + V-inf',
        'Vy khotíte + N (acc.) + ?',
        'Ya ne + V',
      ],
      notes: [
        'THE FIRST CASE ENDING, and the module exists for it: a feminine noun in -a/-ya becomes -u/-yu when it is the object. Ya khochú vódu, not *Ya khochú vodá — the starred form is the interference, and it is worth the module’s mistake budget. The slogan to name and replace is "the accusative is the object case, so the object changes": it does not always change, and M1 already showed why — masculine-inanimate and neuter nouns are identical in the accusative (Ya khochú chay), kófe never moves at all, and only the feminine -a/-ya actually shifts at this level. Stating that is what makes M1’s unchanged objects make sense in retrospect.',
        'INDEX SEAM: every shape of a noun lives in the forms of the ONE row that first taught it. vodá · vódu, kníga · knígu, múzyka · múzyku — one row each, one note each, written true of both shapes. A second row for vódu would be a second note for the same word, and the earlier row would keep answering every tap anyway.',
        'NEGATION IS ONE WORD IN ONE PLACE: ne goes straight in front of the verb and nothing else moves — Ya ne khochú kófe. English needs a do-not auxiliary that Russian has no equivalent of, so this is a delta to celebrate. INDEX SEAM: ne is this module’s row and its note has to survive every later negative — M5’s past, M6’s future, M9’s reason clauses — so write it as a rule about the particle, not about wanting.',
        'Wanting TO DO something is khochú plus a bare infinitive: Ya khochú rabótat\', with no word for "to". English "want to" tempts a stray chto or chtóby into the sentence; *Ya khochú chto rabótat\' does not exist and is worth showing.',
        "khotét' is irregular and this module pays for it once: khochú · khotíte (and khóchesh' · khóchet · khotím · khotyát, which the note may list but the displays do not use, because L1 addresses only vy). Keep the plural of nouns out of the grammar and in the vocabulary — knígi appears as a shape on kníga’s row when M8 counts them, not as a lesson here.",
        'Amended 2026-09-05 (docs/45-llm-review-en-ru-spoken.md): Ya khochú + N, pozháluysta is NOT a request and no L1 display writes it — Russians order with Mne khleb, pozháluysta (mne is M1’s row, so the surface is already taught) or a bare Khleb, pozháluysta. khochú states a want; the request has no verb.',
      ],
      maxWordsPerSentence: 6,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M4': {
      id: 'L1-M4',
      title: 'My day',
      job: 'Daily habits and time words',
      patterns: [
        "Ya + V-yu/-u + kázhdyy den'",
        'Útrom / Vécherom + ya + V',
        'Ya vstayú v + num + chasóv',
        'Vy + V-ete/-ite + ?',
        'Ya chásto / vsegdá + V',
      ],
      notes: [
        'Habits live in the IMPERFECTIVE PRESENT, and this module is purely imperfective: Ya rabótayu kázhdyy den\', Ya vstayú ráno, Útrom ya p\'yu chay. Aspect is lurking behind every one of these verbs and M5 is where it lands — name it here in one sentence ("every verb in this module is the shape Russian uses for something you do repeatedly; M5 shows the other shape and why it exists") and then leave it alone. Do not import a perfective into M4.',
        'CONJUGATION IN TWO CLASSES, and the class is a property of the verb: class I takes -yu/-esh\'/-et/-em/-ete/-yut (rabótayu · rabótayete, chitáyu · chitáyete) and class II takes -yu/-ish\'/-it/-im/-ite/-yat (govoryú · govoríte). The slogan to name and replace is "the present tense is one set of endings"; the law is that there are two sets and the verb carries which. Learn a verb with its class, exactly as a noun is learned with its gender. L1 writes only the ya- and vy-forms, since ty is out.',
        "yó, course-wide, bites first here: pit' is ya p'yu · vy p'yóte and vstavát' is ya vstayú · vy vstayóte. Write the yó. The index keeps yó and e apart, so the e-spelling of a yó-word is a surface this course never taught — a learner tapping it would be shown nothing.",
        "TIME WORDS carry the module, and four of them are frozen instrumentals that this course teaches as single words: útrom, dnyóm, vécherom, nóch'yu. Say they are frozen shapes and that the case they come from is not taught at this level — that is honest, it is one sentence, and it stops an author from opening the instrumental. Beside them: ráno, pózdno, chásto, vsegdá, inogdá, and the two-token surface kázhdyy den' (which leaves dnyóm, a different surface, alone).",
        "INDEX SEAM, decided here: this module teaches the surface v first, in the clock seat (Ya vstayú v sem' chasóv), so its row answers every later tap — including M7’s place seat (v magazíne). Write that row true of BOTH jobs, because M7’s own row would be unreachable. The clock also pre-teaches M8’s counting rule for free: chas · chasá · chasóv are three shapes of ONE word on ONE row, and the note says after 1 it is chas, after 2–4 chasá, after 5 and up chasóv.",
        'Keep every sentence a habit — no past, no plans, no requests — and keep the subject pronoun ya on the page. Russian can drop it and colloquially does, but a dropped pronoun is a stylistic choice a beginner cannot yet control, and the verb ending here is enough of a lesson on its own. Amended 2026-09-05 (docs/45): ONE ya per sentence — it is never repeated for the same subject in a second clause (Ya ustál, poéhtomu ne rabótayu); the repeated ya was the English habit on the page.',
      ],
      maxWordsPerSentence: 6,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M5': {
      id: 'L1-M5',
      title: 'Yesterday',
      job: 'Past tense — the first big divergence',
      patterns: [
        'Vcherá ya + V-l / V-la',
        'Vcherá ya + V-l + N (acc.)',
        'Vcherá ya ne + V-l / V-la',
        'Vy + V-li + vcherá + ?',
        'Vcherá ya byl / bylá + dóma',
      ],
      notes: [
        'THE PAST AGREES WITH GENDER AND NUMBER, NOT WITH PERSON. The endings are -l (m) · -la (f) · -lo (n) · -li (pl), and the same speaker writes a different word depending on who they are: Vcherá ya kupíl khleb from a man, Vcherá ya kupíla khleb from a woman. English marks none of this, and a learner has to decide something about themselves before the sentence can be written. Say SUBJECT, not speaker, as the rule — with vy it is the person addressed, and vy always takes -li, even for one person. The slogan to name and replace is "the past is the easy tense" (one form for everybody, no auxiliary): it is easy in person and hard in gender, and ASPECT still picks the verb.',
        '"TO BE" COMES BACK, and it kills M1’s slogan for good: byl · bylá · býlo · býli is a real word where the present had none. INDEX SEAM: this is ONE byt\' row, opened here, and M6 EXTENDS it with búdu · búdete · búdet rather than opening a second — one lexeme, one note, and the note is where the whole shape of Russian "be" is finally told: past yes, future yes, present empty. Keep its display sentences simple and case-free: Vcherá ya byl dóma — dóma is an adverb ("at home"), so no case is opened, and M6 gets domóy ("homeward") the same way. Amended 2026-09-05 (docs/45): S05 counts its coffee — Vcherá ya výpil dve cháshki kófe — because a bare perfective with a mass noun sounds unfinished; dve and cháshka · cháshki are M5 rows, and M8’s dva row no longer carries dve.',
        "ASPECT, named and decided. Yesterday’s sentences are single finished events, so they take the PERFECTIVE: kupíl, výpil, prochitál, poshyól. The imperfective past (Ya rabótal — \"I was working / I used to work\") is DEFERRED out of L1 and named as deferred, so the learner knows a second past exists rather than believing the one they have is all there is. byt' is the one exception on the page, because byl is the only past it has. INDEX SEAM: an aspect pair is TWO WORDS, not two forms — pit' (M4) and výpit' (M5) get separate rows, as do chitát' and prochitát', each note true of its own aspect. What shares a row is one lexeme’s own paradigm: kupít' carries kupíl · kupíla · kupíli, and M6 adds kuplyú to that same row.",
        'THERE IS NO DID. Negation is still M3’s one word in one place, now in front of the past verb: Vcherá ya ne kupíl khleb. Nothing is added and nothing moves — a delta, and the sharpest one this module has.',
        'yó is unavoidable here and that is a feature: poshyól is the course’s flagship yó-word and its pair poshlá has none. Write both, on one row (poshyól · poshlá · poshlí), and let a sound line say why the two dots are on the page when Russian books usually drop them.',
        'vcherá anchors every sentence, and the vocabulary is the perfective partners of M4’s habits plus what a day actually contains. Do not spend the budget on a paradigm table: the four endings are the rule, and the sentences are the evidence.',
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M6': {
      id: 'L1-M6',
      title: 'Tomorrow',
      job: 'Future and plans',
      patterns: [
        'Závtra ya búdu + V-inf (impf.)',
        'Závtra ya + V-perf (non-past)',
        'Závtra ya ne búdu + V-inf',
        'Vy búdete + V-inf + závtra + ?',
      ],
      notes: [
        'TWO FUTURES, and which one you get is decided by the verb, not by the meaning. An IMPERFECTIVE verb builds its future with búdu plus the infinitive: Závtra ya búdu rabótat\'. A PERFECTIVE verb has no búdu future at all — its present-tense form IS its future: Závtra ya kuplyú khleb, Závtra ya poydú domóy. The slogan to name and replace is "búdu = will": búdu is not a translation of will, it is half of one of the two futures, and the other half never touches it. *Ya búdu poytí and *Ya búdu kupít\' are the classic cross-wiring and belong in a mistake block.',
        "INDEX SEAM: búdu goes on M5’s byt' row (forms gain búdu · búdete · búdet), not on a new one — one lexeme, one note, and that note now carries the complete story the course has been building since M1: no present, byl in the past, búdu in the future. Likewise kuplyú joins M5’s kupít' row and poydú joins its poshyól row, because they are the same words; only genuinely new lexemes get new rows here.",
        'The perfective futures are taught as VOCABULARY with a rule beside them, not as a paradigm: the learner meets kuplyú and poydú in sentences and is told why they look like a present tense. Lead with búdu + infinitive, which is the pattern they can build themselves from anything M4 taught.',
        'závtra anchors the module the way vcherá anchored M5, and domóy (an adverb, "homeward") keeps direction out of the case system — Závtra ya poydú domóy opens no accusative-of-motion seat, which is deliberate: v + accusative for "into" is not a seat this level opens, so M4’s v (time) and M7’s v (place) stay the only two jobs that row has to answer for.',
        "Negation stays exactly where M3 put it, in front of the finite verb: Závtra ya ne búdu rabótat' — ne before búdu, never before the infinitive.",
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M7': {
      id: 'L1-M7',
      title: 'Where things are',
      job: 'Locations and prepositions',
      patterns: [
        'Gde + N + ?',
        'N + v / na + place (prep.)',
        "Na + place (prep.) + yest' + N",
        "N + zdes' / tam",
      ],
      notes: [
        'THE PREPOSITIONAL, the second case ending this level teaches, and the only one that is never used without a preposition — which is where its name comes from and is worth saying. The everyday shape is -e on the ordinary noun: stol → na stolé, magazín → v magazíne, rabóta → na rabóte, Moskvá → v Moskvé. v is broadly "inside" and na broadly "on" or "at", but the pairing is lexical as often as it is logical (na rabóte, na póchte), so teach each place WITH its preposition rather than offering a rule that will fail by M8.',
        'INDEX SEAM: the shapes live on the noun’s own row — stol · stolé, magazín · magazíne — never on a second row, and the note is written true of both. And the bare v belongs to M4 (the clock seat), so a learner tapping v here is shown M4’s row: M4’s note was written true of this seat too, and this module’s rule text carries the place job rather than relying on a new row being reachable.',
        "EXISTENTIAL yest', and this module OWNS the row. Na stolé yest' kníga asserts that a book is there; Kníga na stolé says where a known book is, and drops yest' entirely. That drop is the module’s comprehension work, and it is genuinely subtle: yest' appears when existence is the news and vanishes when location is. INDEX SEAM: \"to eat\" — the other yest' — stays out of L1 entirely, so this row has exactly one lexical rival, M8’s possession chunks u menyá yest' / u vas yest', which are the SAME word and are captured whole by the longest-match walk. Write this note true of both seats, because it is the note a learner will meet from either.",
        'THERE IS NO DUMMY SUBJECT. English "there is" has a "there" that means nothing and an "is" that agrees; Russian has neither, so na stolé yest\' kníga is literally "on table is book". literal earns its keep on every sentence in this module — it is the only place the learner can see that the English "there" corresponds to nothing at all.',
        'Gde …? asks the question, zdes\' and tam answer it without any case at all, and word order is already doing article work: state it once here (Kníga na stolé = "the book is on the table"; Na stolé kníga = "there is a book on the table") and let M10 make it the lesson.',
        'The slogan to name and replace is "yest\' means eat". The law: the yest\' this module teaches is the existential "there is", the same word M8 uses for possession, and the eating verb is a different lexeme this course never writes.',
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M8': {
      id: 'L1-M8',
      title: 'Numbers & shopping',
      job: 'Prices, quantities, buying',
      patterns: [
        "Skól'ko stóit + N (nom.) + ?",
        "Skól'ko stóyat + N-pl (nom.) + ?",
        "U vas yest' + N (nom.) + ?",
        "U menyá yest' + N (nom.)",
        'Dáyte, pozháluysta + , + N (acc.)',
        'N + stóit + num + N (gen.)',
      ],
      notes: [
        "NUMBERS GOVERN THE NOUN, and that is the module’s one grammatical claim: after 1 the noun is nominative singular (odín rubl'), after 2, 3 and 4 it is genitive singular (dva rublyá), and after 5 and up it is genitive plural (pyat' rubléy, sto rubléy). Teach the shapes the sentences actually need as forms on the noun’s own row — rubl' · rublyá · rubléy — state the rule once in one honest note, and build no declension table. The slogan to name and replace is \"numbers are just words in front of a noun\"; the law is that the number decides the noun’s case, which English never does. M4’s clock already showed the same split on chas · chasá · chasóv, so name the link back: it is one rule, met twice.",
        "THE PRICE QUESTION AGREES WITH THE THING, not with the buyer: Skól'ko stóit kníga? for one, Skól'ko stóyat knígi? for more than one. Teach skól'ko stóit and skól'ko stóyat as two whole two-token surfaces, and name the link forward to M9’s mne nrávitsya / mne nrávyatsya — it is the same shape twice, a verb agreeing with the thing rather than with the person.",
        "POSSESSION HAS NO VERB. U menyá yest' kníga is literally \"at me is book\" — the owner sits in a prepositional phrase and the thing owned is the SUBJECT. Russian does have a verb imét', but it is bookish and abstract (imét' právo, \"to have a right\") and nobody uses it for owning a book — so Ya iméyu knígu is the anglophone trap of the whole course and belongs in a mistake block, flagged as unnatural rather than as ungrammatical, which is the honest charge. INDEX SEAM: u menyá yest' and u vas yest' are THREE-token surfaces (this course’s maxSpan is 3) that capture the yest' inside them, so a tap anywhere in the phrase opens the possession note while a bare yest' still opens M7’s existential row. Never write a bare u anywhere — it earns no key of its own, because surfaceIndexKeys splits hyphen parts, not whitespace. Amended 2026-09-05 (docs/45): the two chunk rows also carry the two-token forms U vas and U menyá, so A u vas? (M10) and U menyá dva biléta resolve; still no bare u.",
        "The shop script is the module’s usable half: Dáyte, pozháluysta, vódu (dáyte is the vy-form imperative — the register decision again, and the only imperative L1 teaches), spasíbo, rubl'. Keep the numbers to what the sentences use — odín/odná, dva/dve, tri, chetýre, pyat', désyat', dvádtsat', sto — and note that odín and dva are the only two that change for gender (odín rubl' · odná kníga; dva rublyá · dve knígi).",
        'Every place, price and product a pool item names has to be taught by a word row somewhere in the cumulative index, or the build fails on it. Plan the pool against the index, not against the sentences.',
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M9': {
      id: 'L1-M9',
      title: 'Feelings & opinions',
      job: 'Why — because and so',
      patterns: [
        '<statement> + , potomú chto + <statement>',
        '<statement> + , poéhtomu + <statement>',
        'Pochemú + <question> + ?',
        'Mne + Adv (khólodno / zhárko)',
        'Mne nrávitsya + N (nom.)',
        'Ya dúmayu, chto + <statement>',
      ],
      notes: [
        'potomú chto and poéhtomu map cleanly onto "because" and "so", and the clean mapping is the delta: potomú chto introduces the REASON, poéhtomu the CONSEQUENCE, and the same two facts written in the opposite order give the pair. Build the sentences in pairs — Ya ne khochú rabótat\', potomú chto ya ustál · Ya ustál, poéhtomu ya ne khochú rabótat\' — and make the comprehension pool test the choice. INDEX SEAM: potomú chto is ONE two-token surface, which leaves the bare chto free for this module’s own conjunction row.',
        'THE COMMA IS OBLIGATORY. Russian writes a comma before potomú chto and before chto, always — Ya dúmayu, chto éhto khoroshó. English drops "that" and drops the comma; Russian does neither. It is a punctuation rule and it is not optional, so say it as a law rather than a preference. INDEX SEAM: chto is this module’s row, as the conjunction; its note names the question sense ("what") too, since no earlier module claimed the key and a later learner may tap it in either job.',
        'DATIVE EXPERIENCERS — this course’s gustar, and the interference to spend the module on. Mne khólodno is "to-me [it is] cold", with no subject at all and no verb: the person who feels something goes in the DATIVE, and the English "I am cold" pattern (*Ya kholódnyy) says that you are a cold person. Mne nrávitsya Moskvá is the same shape with a subject: the thing liked is the SUBJECT, so the verb agrees with IT — mne nrávitsya kníga, mne nrávyatsya knígi — and mne never changes. The slogan to name and replace is "mne nrávitsya is Russian for I like"; the law is that the thing does the pleasing and the person is the one pleased, exactly as in M8’s Skól\'ko stóyat knígi?.',
        'INDEX SEAM: mne is a shape of ya and belongs to M1’s row, which was written with forms ya · menyá · mne and a note naming all three jobs — so a tap here lands on something true. This module’s rule text carries the dative lesson; no second ya row is opened, and none would be reachable.',
        'Feelings that DO take a subject use the short-form predicate from M2, which agrees with whoever is being described: Ya ustál · Ya ustála. Keep the two shapes apart in the rules — mne khólodno has no subject and cannot agree with anything; ya ustál has one and must.',
        'Pochemú …? asks the question, and its answer is potomú chto; they look alike, they are two words, and the module must write both often enough that the learner sees the difference.',
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M10': {
      id: 'L1-M10',
      title: 'Connected talk',
      job: 'Short 2–3 sentence exchanges',
      patterns: [
        '<M1–M9 pattern> + <M1–M9 pattern>',
        '<question> → <answer + potomú chto + reason>',
        '<statement> + i / no + <statement>',
      ],
      notes: [
        'Each item is a TURN of 2–3 short sentences, not one long one — a greeting and its answer, a question and its reply, a statement with a reason and a follow-up. The per-sentence bound applies to each sentence inside the turn, and the turn is what the learner writes.',
        'Recombination is the lesson: nearly everything comes from M1–M9. The honest new spend is the joiners that hold a turn together — i, no, tózhe, potóm — and the third-person pronouns.',
        'WORD ORDER DOES THE ARTICLE’S OLD WORK, and this is where M1’s "no articles" promise is paid. The slogan to name and replace is "no articles — one thing less to learn"; the law is that the article’s job moved into the ORDER, and new information goes LAST: Kníga na stolé is "the book is on the table" (we know the book; where it is, is the news) and Na stolé kníga is "there is a book on the table" (we know the table; the book is the news). Both are correct Russian and they are not interchangeable. Build at least one comprehension pair on exactly this.',
        'on · oná · onó · oní refer to things as well as people, by GRAMMATICAL gender, not by sex: a table is on, a book is oná, milk is onó. English "it" covers all three, so an English speaker will reach for onó and be wrong most of the time. One row, forms on · oná · onó · oní, note written true of the thing-uses.',
        'KEEP THE SUBJECT PRONOUN. Russian can drop ya and colloquially does, especially in answers, but the ending alone does not always identify the person (the past agrees with gender and number, not person, so byl with no pronoun is genuinely ambiguous) and a beginner cannot yet judge when the drop reads as natural rather than clipped. So L1 writes the pronoun, and this module says why rather than pretending Russian requires it. Amended 2026-09-05 (docs/45-llm-review-en-ru-spoken.md): written ONCE per sentence. A second clause with the same subject never repeats it — Ya studént i rabótayu, Seychás ya rabótayu, a potóm poydú domóy — and the module’s rule now says so.',
        "Keep the turns everyday and symmetric, and reuse the register decision on every addressed line: greeting → wellbeing → plan (Zdrávstvuyte! Kak delá? · Khoroshó, spasíbo. · Závtra ya búdu rabótat'.); want → reason → buy.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M1': {
      id: 'L2-M1',
      title: 'Asking politely',
      job: 'Requests, thanks, apologies in the right register',
      patterns: [
        'V-imperative-perfective + , + pozháluysta',
        'Dáyte mne + N-acc + , + pozháluysta',
        'Vy ne mózhete + V-inf + ?',
        'Mne núzhno + N/V-inf',
        "Bol'shóye spasíbo — Ne za chto",
      ],
      notes: [
        "REGISTER, decided for the whole level and repeated here because a prompt only ever shows an author the notes (full record: docs/56-en-ru-L2-brief-decisions.md; the seven L1 decisions carry unchanged — the romanization scheme, a stress mark on every polysyllable and none on a monosyllable, yó in display and ё in script with е never merging, one row per noun with its case shapes in forms, aspect partners on separate rows). L1's decision 2 stands: vy is the course-wide default and ty appears in no display until M6. So this module is not an address contrast; the chip marks the elaborated request — Bud'te dobrý, Vy ne mózhete…? — as `formal`, and plain vy to a stranger stays `neutral`, because it is this language's unmarked default and not a politeness tier.",
        "THE grammar of the module is the imperative's ASPECT, which L1 shipped in pairs (chitát' / prochitál, kuplyú / kupíl) without ever teaching the choice. Skazhíte, pozháluysta (perfective) asks for ONE act and is the shape of every ordinary request; Govoríte (imperfective) says proceed, keep going, this is how it is done. The half a learner cannot guess, and the one to spend a mistake on: a HOST uses the imperfective — Sadítes', Prokhodíte — and the perfective in that seat lands as an order. M5 spends this at a table and points back here. The -te ending is the vy imperative and every L1 imperative already had it (dáyte, izviníte, zdrávstvuyte), so the FORM is a rest point and the aspect is the whole lesson.",
        "The dative enters here because a request has a recipient, and with it Russian's signature shape: a sentence with NO SUBJECT. Mne núzhno idtí, Mne mózhno? — literally \"to me [is] necessary\", \"to me [is] permitted\". L1-M9's Mne nrávitsya was already this shape and never said so; name it now, because M3's Zdes' net magazína and M8's Mne nuzhná pómoshch' are the same sentence type and the learner should meet the pattern once rather than three times. mne is L1-M1's row and vam is L1-M2's; what this module adds is the dative of a NOUN (Ivánu, drúgu) and the frame itself.",
        "The politeness moves are lexical, and one of them is genuinely surprising: a NEGATIVE question is MORE polite in Russian, not less — Vy ne mózhete mne pomóch'? is softer than Vy mózhete…?, where English hears a negative question as doubt or complaint. Tag it delta and spend a mistake on the reverse assumption. The rest: pozháluysta (L1-M3) for both please and you're welcome, bud'te dobrý as the formal opener, bol'shóye spasíbo above L1-M2's spasíbo, and izviníte (L1-M10) beside prostíte — near-synonyms, with izviníte the everyday one and prostíte the weightier apology. Say near-synonyms rather than inventing a clean split the language does not have.",
        "INDEX SEAM: skazhíte, govoríte, pomogíte, pomóch', mózhete, mózhno, núzhno, bud'te, dobrý, prostíte, bol'shóye and za are fresh keys, each polysyllable carrying its stress mark. dáyte stays L1-M8's row, pozháluysta L1-M3's, izviníte L1-M10's, mne L1-M1's, vam L1-M2's, spasíbo L1-M2's. skazhíte and govoríte are aspect partners and therefore go on SEPARATE rows (the L1 policy), each note naming the other; a single row carrying both would make the module's own lesson unreachable.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M2': {
      id: 'L2-M2',
      title: 'Describing people',
      job: 'Appearance, character, relationships',
      patterns: [
        'On/Oná + Adj-long',
        'Yevó/Yeyó zovút + <name>',
        "U nevó/neyó yest' + N",
        'Ehto moy/moyá + N',
        'On + Adj-short   (ustál, svobóden)',
      ],
      notes: [
        'The long adjective arrives, and L1 set it up without saying so: ustál / ustála / ustáli (L1-M2) are SHORT-form adjectives, which can only stand as a predicate, and rússkiy (L1-M1) is a long one. This module teaches the long form and its four nominative endings — vysókiy · vysókaya · vysókoye · vysókiye — which can stand both before a noun and after the missing "is". State the split honestly: the short form is not a contraction of the long one, and only a handful of adjectives (ustál, svobóden, zányat, rad) use it in everyday speech. There is still no copula: On vysókiy is two words, exactly as L1-M1 taught.',
        'The third person gets its objects: yevó and yeyó, each carrying TWO jobs — "his"/"him", "her"/"her" — because Russian\'s genitive and accusative pronouns are also its possessives. One row each, the note true of both, or half the module\'s sentences land on a note that is false of them. With them comes a spelling rule that has index consequences: after a preposition they take an n-, so u nevó and u neyó are their own keys beside yevó and yeyó, and all four are authored here with the rule in the note.',
        "Possession extends L1-M8's frame to other people: U nevó yest' mashína, U neyó yest' brat. The frame itself — literally \"at him there is\" — is the same oblique-person habit as M1's Mne núzhno, and pointing that out costs one sentence and saves the learner from meeting it as a third unrelated idiom. Yevó zovút Iván extends L1-M1's menyá zovút the same way: the pattern is the learner's already, only the pronoun is new.",
        "The family and person set: brat, sestrá, mat', otéts, syn, doch', zhená, muzh, drug, podrúga; vysókiy, molodóy, stáryy, khoróshiy, dóbryy, úmnyy, vesyólyy. Two of these are worth a line each. mat' and doch' are the two feminine nouns in the course that end in a consonant-plus-soft-sign and decline unlike anything else, so they are taught as words with their shapes in forms and no rule claims they are regular. vesyólyy carries a yó and must be written with it, or it merges with nothing at all — which is the point: the yó rule is not about ambiguity, it is about one word having one spelling.",
        "INDEX SEAM: yevó, yeyó, nevó, neyó, vysókiy, molodóy, khoróshiy, dóbryy, úmnyy, vesyólyy, brat, sestrá, mat', otéts, syn, doch', zhená, muzh, drug, podrúga and the moy / moyá / moyó / moí rows are fresh keys. on, oná, oní and onó stay L1-M10's rows; ustál and ustála stay L1-M2's, re-shown here as the short form they always were; yest' and u menyá yest' stay L1-M8's. Every adjective row carries the four nominative cells this level shows in its forms — one paradigm, one home — and M3 adds the case shapes to those same rows rather than opening new ones.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M3': {
      id: 'L2-M3',
      title: 'Describing things',
      job: 'Size, colour, quality — agreement at length',
      patterns: [
        'Ehto + Adj + N',
        'Ya khochú + Adj-acc + N-acc',
        "Zdes' net + N-gen",
        'mnógo / nemnógo + N-gen',
        "N + óchen' + Adj",
      ],
      notes: [
        '"At length" is the grid: the adjective agrees with its noun in gender, number AND case, so a word the learner met in M2 as vysókiy appears here as vysókuyu, vysókom and vysókikh. Keep the grid to the cases this course owns — nominative, accusative, prepositional, genitive — and put every cell in the FORMS of the adjective\'s own row, which M2 opened. This is the module where Russian\'s central difficulty becomes visible, and the honest framing is that it is bookkeeping rather than a new idea: the endings are few and they repeat.',
        'The genitive of absence, and it is the module\'s best sentence type: net + genitive says the thing IS NOT HERE, and the sentence has no subject at all — Zdes\' net magazína, U menyá net vremeni. English cannot mirror it ("there is no shop" keeps a dummy subject), and it is the same subjectless shape as M1\'s Mne núzhno. net is L1-M2\'s key, where it means "no", so this module points back and writes its rule around that row rather than opening a second one — first occurrence wins, and a learner tapping net must reach a note that admits both jobs.',
        "The genitive of quantity finally gives L1's quantity words their complement: mnógo vodý (L1-M6's mnógo), nemnógo sákhara (L1-M10's nemnógo), stakán vodý, cháshka cháya. The law is one line — a word of amount is followed by the genitive — and it also explains L1-M8's rubléy and L1-M4's chasóv, which the learner has been saying for two levels without knowing why. Say that; a rule that retroactively explains something already learnt is worth three that only add.",
        "Colours and qualities are the vocabulary spend: krásnyy, sínij, zelyónyy, chyórnyy, bélyy, zhyóltyy; bol'shóy, málen'kiy, nóvyy, dorogóy, deshyóvyy, chístyy. Four of those carry yó and must be spelled with it every time (zelyónyy, chyórnyy, zhyóltyy, deshyóvyy) — the L1 rule, biting harder here than anywhere else in the course simply because colours are where it lands. dorogóy pairs with L1-M8's stóit, and the pool's job is the grid: same noun, wrong ending, which line is right.",
        "INDEX SEAM: krásnyy, sínij, zelyónyy, chyórnyy, bélyy, zhyóltyy, bol'shóy, málen'kiy, nóvyy, dorogóy, deshyóvyy, chístyy, vrémya and stakán are fresh keys, with every case shape this level shows sitting in the owning row's forms. net stays L1-M2's; mnógo stays L1-M6's; nemnógo stays L1-M10's; khleb, vodá, sákhar, chay, kníga and cháshka stay their L1 rows, and their new GENITIVE shapes (vodý, sákhara, cháya, knígi — note knígi is already L1-M3's plural key and now answers for the genitive too) are deconstructed here on their own rows pointing back, because L2 never edits an L1 file.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M4': {
      id: 'L2-M4',
      title: 'Getting around',
      job: 'Directions, transport, asking the way',
      patterns: [
        'Izviníte, kak doyti do + N-gen + ?',
        'Idíte pryámo + , + potóm nalévo',
        'Ya yédu v + N-acc',
        'Ya yédu na + N-prep   (na avtóbuse)',
        'Kudá vy idyóte? — Gde ostanóvka?',
      ],
      notes: [
        "THE preposition law of the module, and it is one contrast doing all the work: v and na take the ACCUSATIVE for motion and the PREPOSITIONAL for location — Ya idú v magazín (going) against Ya v magazíne (being), L1-M7's own sentence. For an inanimate masculine noun the accusative IS the nominative, so half of this costs no new surface at all; the contrast is taught in a rule and shown in the feminine (v Moskvú against L1-M1's Moskvé). v and na are L1-M7's rows and stay there — this module points back and never re-opens them — and the question words fork the same way: gde asks where something IS (L1-M7), kudá asks where it is GOING, and kudá is this module's key.",
        "Motion verbs, kept to what a direction needs: idtí (going, on foot, ONE trip) and yékhat' (going, by vehicle, one trip). The split English never makes is the vehicle one — a Russian cannot say \"I'm going to Moscow\" without deciding whether they walk — and it is the delta to tag. The OTHER split, between one trip (idtí) and going habitually (khodít'), is real and is deferred: L3 owns it, and this module's notes name it so a later author does not import it. L1-M5's poshyól and poydú belong to this family and their rows are pointed back at.",
        'The transport decision, taken here and stated because Russian offers two answers: "by bus" is both na avtóbuse and avtóbusom, and this course teaches **na avtóbuse** — one preposition and one case the learner already owns from L1-M7\'s na rabóte, doing a new job — rather than opening the instrumental for a single frame. peshkóm ("on foot") comes in as a WORD, and a usage line says it is a frozen instrumental rather than a pattern to copy. The instrumental proper is L3\'s, and no display in this level may use it.',
        "Directions are the vocabulary spend and they reuse M1's imperative: idíte, povernite, nalévo, naprávo, pryámo, ryádom, dalekó, blízko, úlitsa, ploshchad', ostanóvka, stántsiya, perekryóstok, mashína, avtóbus, póyezd, metró. do takes the genitive (kak doyti do vokzála), which is M3's case doing a fourth job — point back rather than re-explaining. metró does not decline at all, which is worth one line, because it is the first indeclinable noun the course shows.",
        "INDEX SEAM: kudá, idtí, idú, idyóte, idíte, yékhat', yédu, yédete, povernite, nalévo, naprávo, pryámo, ryádom, dalekó, blízko, úlitsa, ploshchad', ostanóvka, stántsiya, perekryóstok, avtóbus, póyezd, metró, mashína, do and peshkóm are fresh keys, every polysyllable stressed. perekryóstok carries a yó. v, na, gde, magazín and rabóta stay L1-M7's rows; poshyól, poshlá and poydú stay L1-M5's; potóm stays L1-M10's. Place names never index (#61), so anchor every direction on a common noun.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M5': {
      id: 'L2-M5',
      title: 'Food and hosting',
      job: 'Ordering, offering, refusing without offence',
      patterns: [
        'Mne + , + pozháluysta + , + N-acc',
        "Sadítes' + ! + Ugoshcháytes'!",
        'Vam chay íli kófe?',
        'Net + , + spasíbo + , + ya syt / sytá',
        'Cháshka cháya + , + pozháluysta',
      ],
      notes: [
        "This is where M1's aspect decision is spent, and the module should say so in its first note: a host speaks in the IMPERFECTIVE — Sadítes', Prokhodíte, Ugoshcháytes', Beríte — and the perfective in the same seat (Sad'tes' as a one-off command) lands as an order rather than as hospitality. It is the clearest evidence in the course that aspect is about how an action is being PRESENTED and not about how long it takes. Point back at M1's rows; open no new aspect rule here.",
        'Ordering is the dative from M1 plus the accusative from L1-M3: Mne, pozháluysta, sup — literally "to me, please, soup", with no verb at all, which is what a Russian actually says at a counter. Ya khochú (L1-M3) is grammatical and blunter than English "I want", so the note should say that the verbless dative frame is the polite one; this is register carried by shape again, exactly as M1 promised.',
        "The genitive of quantity in the field, straight from M3: cháshka cháya, stakán vodý, nemnógo sákhara, mnógo khléba. Four L1 nouns getting their genitive shapes, each deconstructed on its own row pointing back — the additions-only law, and the module where it produces the most rows. Say in the note that this is the same rule as M3's mnógo vodý, or the learner meets it twice as two idioms.",
        "Refusing without offence, with the cultural half stated plainly and without moralising: in Russian hosting an offer is expected to be repeated, so a single Net, spasíbo is heard as politeness rather than as a decision, and the refusal that lands adds a reason — Net, spasíbo, ya uzhé syt. The reverse is worth a line too: a guest who accepts the first offer of a third helping has not been rude. syt / sytá is another short-form adjective (M2's rows), which is why it agrees with the speaker and cannot stand before a noun.",
        "INDEX SEAM: sadítes', prokhodíte, ugoshcháytes', beríte, syt, sytá, uzhé, íli, sup, myáso, rýba, óvoshchi, sol', tarélka, schyot and vkúsno are fresh keys; schyot carries a yó. chay, khleb, vodá, sákhar, kófe, cháshka, mnógo and nemnógo stay their L1 rows, with their genitive shapes deconstructed here. Príyatnogo appetíta rides as a two-token surface, keeping both its words free — the en-es Me llamo tool, in Russian.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M6': {
      id: 'L2-M6',
      title: 'Making plans together',
      job: 'Invitations, suggestions, settling a time',
      patterns: [
        'Davay + V-1pl-future',
        'Ty svobóden / svobódna + v subbótu?',
        "Vo skól'ko? — V pyat' chasóv",
        "Ty khóchesh' + V-inf + ?",
        'Khoroshó + , + do závtra',
      ],
      notes: [
        "**ty enters here**, and it is the register decision of the level: L1's default was vy and no L1 display showed ty, because a learner who guesses wrong with a stranger is rude, while a learner who guesses wrong with a friend is merely stiff. Plans are made with friends, so this is the module that pays for it — ty, tebyá, tebé, the -esh'/-ish' second-singular of the verbs the course owns (khóchesh', chitáyesh', rabótayesh', búdesh', znáyesh'), and the singular imperative (skazhí, day, pozvoní). Every ty frame chips `informal`; a vy frame in the same module stays `neutral`.",
        'The fact English has nothing like, and it belongs in usage rather than in a rule: in Russian the move from vy to ty is NEGOTIATED out loud — Davay na ty — rather than drifted into. A learner who knows only that ty is "informal" will switch too early and land somewhere between presumptuous and childish. Say what the trigger actually is: age and closeness, agreed between the two people, and irreversible once agreed.',
        "Davay is the suggestion particle and it takes the first-person PLURAL of the future: Davay poydyóm v kinó, Davay vstrétimsya závtra. Davayte is its vy partner, so the pair also drills the module's register point. English \"let's\" is one word for both, and the delta is that Russian's carries an address with it.",
        "Time is the other spend and it forks by preposition: v + accusative for a clock hour (v pyat' chasóv — L1-M4's chasóv and L1-M8's pyat', already owned) and v + accusative for a day (v subbótu, where the feminine ending is visible), while a part of the day is the bare instrumental adverb L1-M4 already taught as words (útrom, vécherom, dnyóm, nóch'yu) — say that they are frozen forms and not a pattern, exactly as M4 said of peshkóm. Days: ponedél'nik, subbóta, voskresén'ye. Vo skól'ko? asks the hour, and vo is skól'ko's prepositional partner spelled with an extra vowel — one more key, one more note.",
        "INDEX SEAM: ty, tebyá, tebé, khóchesh', chitáyesh', rabótayesh', búdesh', znáyesh', skazhí, day, pozvoní, davay, davayte, poydyóm, vstrétimsya, svobóden, svobódna, ponedél'nik, subbóta, subbótu, voskresén'ye, vo and kinó are fresh keys. khoroshó (L1-M2) does a second job here as \"agreed\" and stays L1's row; skól'ko stays L1-M8's; závtra stays L1-M6's; chasóv stays L1-M4's. skazhí and skazhíte are the same verb in two addresses and belong on the SAME row (forms carry both), unlike an aspect partner, which never does — the distinction is worth stating once here, since this module produces both kinds.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M7': {
      id: 'L2-M7',
      title: 'On the phone',
      job: 'Calls and messages — openings, closings, taking a message',
      patterns: [
        'Alló + . + Ehto + <name>',
        'Mózhno + <name>-acc + ?',
        "Yevó / Yeyó net + . + Chto peredát'?",
        'Ya vam pozvonyú + <time>',
        'Podozhdíte + , + pozháluysta',
      ],
      notes: [
        "The genitive of absence, turned on a person, and it is the most useful sentence in the module: Yevó net dóma, Yeyó seychás net. M3 taught net + genitive for a thing that is not here; a person who is not here takes the same shape, with M2's yevó / yeyó already in the genitive. Three modules, one construction — say so, because a learner who meets it a third time as a new idiom has learnt nothing from the first two.",
        'Phone openings, and the delta is small, fixed and high-frequency: Russian answers with Alló (or Da, or Slúshayu) and identifies with Ehto Iván — the same "this is" move English makes, where a learner might reach for Ya Iván, which sounds like an introduction at a door. Ehto is L1-M1\'s row doing exactly its own job, so this module points back rather than opening anything. Mózhno Ánnu? ("may I have Anna?") is M1\'s mózhno with an accusative name — and a name never indexes (#61), so the taught row is mózhno\'s.',
        "Aspect on the phone, the level's third payment: Ya vam pozvonyú (perfective — one call, a promise) against Ya búdu vam zvonít' (imperfective future — I'll be calling, repeatedly). Teach the perfective, name the other in a usage line, and let the pair show what L1-M6 could only assert: the perfective has no present, which is why pozvonyú is a future and not a \"I am calling\".",
        "Register on the phone is worth one honest line: vy is the default even with someone you would ty in person, because you do not know who has picked up — so this module is written in vy throughout and chipped `neutral`, with M6's ty deliberately absent. That is not a rule about politeness; it is a rule about not knowing.",
        "INDEX SEAM: alló, peredát', peredáyte, soobshchéniye, nómer, perezvonyú, podozhdíte, minútku, slúshayu and zvonít' are fresh keys. net stays L1-M2's row, now answering for its third job; yevó, yeyó, nevó and neyó stay M2's; pozvonyú, pozvoníl and pozvoníte stay L1-M6's; chto stays L1-M9's; ehto stays L1-M1's; seychás stays L1-M10's. Reported speech is NOT opened here — a message is taken with Chto peredát'? and passed on with On zvoníl, the past L1-M6 already owns — and the note says that On skazál, chto… is L3's.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M8': {
      id: 'L2-M8',
      title: 'When something goes wrong',
      job: 'Problems, asking for help, complaining calmly',
      patterns: [
        'U menyá probléma',
        'Ne rabótayet + N',
        'Mne núzhen / nuzhná / núzhno + N',
        'U menyá bolít + N',
        'Ya poteryál / poteryála + N-acc',
      ],
      notes: [
        "Mne núzhen bilét · Mne nuzhná pómoshch' · Mne núzhno vrémya — and this is the module's best rule, because English hides it completely. The thing NEEDED is the subject and núzhen agrees with IT, while the person sits in the dative; \"I need a ticket\" has the person as subject and shows none of this. It is M1's dative-subject frame with agreement switched on, and it is the moment Russian's habit of putting the person in an oblique case stops being a curiosity and becomes the way the language works. Spend the mistakes here: *Mne núzhno pómoshch' is the error.",
        "U menyá bolít golová is the same habit again: the body part is the SUBJECT (bolít agrees with it, and bolyát for two) and the person is in the genitive after u, exactly as in L1-M8's u menyá yest'. Author the pair — U menyá bolít golová, U menyá bolyát nógi — and point back at both L1-M8's frame and this module's núzhen rule, so three sentences in the same shape are learnt as one thing.",
        'The past tense agrees with the SPEAKER, which L1-M5 taught with kupíl / kupíla and which a problem report drills at length: Ya poteryál (a man) · Ya poteryála (a woman). Say subject, not speaker, when the subject is someone else — On poteryál, Oná poteryála — because the speaker-shaped version of this rule is precisely the defect the third Marathi review had to correct three times (docs/08).',
        'Complaining calmly, and the delta runs the OPPOSITE way from English\'s: Russian complains directly, and the hedged English complaint ("I\'m afraid there seems to be a small problem") reads as insincere or evasive rather than as polite. What carries politeness instead is the frame from M1 — Izviníte, pozháluysta, u menyá probléma — and then a plain statement of what is wrong. Say that in usage without judging either language; a learner who softens a Russian complaint the English way will not be understood as polite.',
        "INDEX SEAM: probléma, núzhen, nuzhná, poteryál, poteryála, bolít, bolyát, golová, nógi, pómoshch', slomálsya, rabótayet (as \"it works\", a second job for L1-M3's rabótat' family — its row stays L1's) and k sozhaléniyu are fresh keys. núzhno stays M1's row and núzhen / nuzhná join it in forms, because they are one word's cells and not aspect partners. u menyá and u menyá yest' stay L1-M8's; ne stays L1-M3's; izviníte stays L1-M10's.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M9': {
      id: 'L2-M9',
      title: 'Comparing and choosing',
      job: 'More, less, better — stating a preference',
      patterns: [
        'A + Adj-comparative + B-gen',
        'A + Adj-comparative + , + chem + B',
        'sámyy + Adj + N',
        'Kakóy vy predpochitáyete?',
        'Ehtot + N + lúchshe',
      ],
      notes: [
        'The comparative is one ending — -yeye on most adjectives (interésneye, krasívyeye) — plus a short list of irregulars that are the ones actually used: lúchshe, khúzhe, ból\'she, mén\'she, dorózhe, deshévle, výshe, molózhe. Teach the list as vocabulary and the ending as a rule, and kill the slogan the ending invites: "add -yeye" produces *khoroshéye, and the double comparative *bóleye lúchshe is the error even native speakers are teased for.',
        "\"Than\" is the GENITIVE, and this is the level's fourth spend of M3's case: Moskvá ból'she Peterbúrga, On výshe menyá. It is what a Russian says, it is shorter, and it costs no new word at all. chem is named in usage as the always-available alternative AND as the required one when the two compared things are not both bare nouns (Segódnya teplée, chem vcherá). Give the genitive in display and let chem live in the usage line, so the learner leaves with the idiomatic one.",
        'The superlative is sámyy + the adjective, and sámyy declines along with it: sámyy bol\'shóy górod, sámaya interésnaya kníga. It is the easy half of the module and a rest point after the comparatives; say so. lúchshe is the sharp one: it serves BOTH khoroshó (L1-M2, "well") and khoróshiy ("good"), exactly as mejor does in en-es — On igráyet lúchshe is "plays better" — so its note must be true of the adverb and the adjective alike.',
        'Choosing needs a demonstrative and a question word, and both walk into collisions worth naming. ehtot / ehta / ehti ("this + noun") is NOT L1-M1\'s ehto ("this is"): they are different words, ehtot declines, and merging them would send every choice in the course to a note about identifying things. kakóy ("which, what kind of") declines like an adjective and is a sibling of L1-M9\'s chto — cross-reference, merge neither. predpochitáyu takes an accusative noun or an infinitive.',
        "INDEX SEAM: lúchshe, khúzhe, ból'she, mén'she, dorózhe, deshévle, výshe, interésneye, sámyy, sámaya, chem, ehtot, ehta, ehti, kakóy and predpochitáyu are fresh keys, each polysyllable stressed. A comparative shape belongs in the forms of its adjective's row where that adjective is this level's (M2's or M3's); where the positive is L1's it takes a row of its own pointing back, because L2 never edits an L1 file. khoroshó stays L1-M2's; plókho stays L1-M9's; ehto stays L1-M1's; mnógo stays L1-M6's, and its comparative ból'she is authored here on a new row.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M10': {
      id: 'L2-M10',
      title: 'Telling what happened',
      job: 'A four-sentence account in the past',
      patterns: [
        'Snachála + V-perfective-past + , + potóm + V-perfective-past',
        'Ya + V-imperfective-past + , + kogdá + V-perfective-past',
        'Býlo + Adv + , + poéhtomu + V-perfective-past',
        'V kontsé + V-perfective-past',
      ],
      notes: [
        "Each item is an ACCOUNT of exactly four short sentences, not one long one, and the per-sentence bound applies to each sentence inside it. Almost every word is already the learner's; the honest new spend is the sequencers (snachála, kogdá, v kontsé, poslé étovo, joining L1-M10's potóm, i, a, no) and the third-person perfective past cells a story needs.",
        "THE decision of the module: aspect at length. The perfective presents an action as a COMPLETED WHOLE with a result and moves the account forward one step at a time; the imperfective presents it as a process, a repetition, or simply names the activity, and it is what paints the standing situation. Ya prochitál gazétu i poshyól domóy against Ya chitál gazétu, kogdá on pozvoníl. L1 shipped both members of half a dozen pairs on separate rows (chitát' / prochitál, kuplyú / kupíl, napishú / napisál) without ever teaching the choice; this is where it is taught.",
        'The slogan to kill, and en-es\'s M10 kills the same one in Spanish: "perfective is completed, imperfective is ongoing". It breaks on the first real account. Ya dva chasá chitál is bounded and imperfective; Ya prochitál za dva chasá is perfective; the reading took the same two hours. What differs is how the clause is being USED in the telling — as a whole with a result, or as a background and a process. Duration does not decide it and repetition does not decide it. Author the pairs so the same event appears in both roles.',
        'One fact makes aspect visible and the learner already has it: the perfective has NO present tense. L1-M6\'s napishú, pozvonyú and kuplyú are futures for exactly that reason, and a learner who has been told they are "the future" can now be told why. Use it as the module\'s diagnostic — if a form has no present, it is perfective — rather than asking anyone to memorise pairs.',
        "Nothing new is opened. Reflexive verbs stay OUT as a system: L1-M9's nrávitsya and this module's vernúlsya ride as vocabulary with their notes pointing at each other, and the -sya rule is L3's. So are the conditional by, participles, and prefixed motion verbs beyond L1's po- and pri-. INDEX SEAM: snachála, kogdá, kontsé, vernúlsya, uvídel, uvídela, skazál, skazála and the perfective past cells an account needs are fresh keys, each on its own row (aspect partners never share one) and each pointing back at the imperfective's row where the course owns it. byl, bylá, býlo and býli stay L1-M5's; potóm, i, a and no stay L1-M10's; vcherá stays L1-M5's; poéhtomu and potomú chto stay L1-M9's.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
  },
  'en-it': {
    'L1-M1': {
      id: 'L1-M1',
      title: 'Who I am',
      job: 'Introduce yourself and state what you like',
      patterns: [
        'Mi chiamo + name',
        'Sono di + city',
        'Sono + N/Adj',
        'Mi piace + il/la + N',
        'Mi piacciono + i/le + N-pl',
      ],
      notes: [
        'REGISTER, ratified for the whole course and repeated here because a prompt only ever shows an author the notes: L1 speaks tu, and Lei — the polite address that takes the THIRD-person form of the verb while still meaning "you" — is named in prose and written in NO display string, anywhere in this level. Every second person in this course ends in -i (ti chiami, stai, sei, vuoi, hai). M1 has no second person of its own, so the decision costs nothing here and binds everything after it.',
        'Pro-drop, stated as the law and not as "Italian drops pronouns": the ending already names the person, so a neutral statement carries no subject pronoun — Sono di Roma, not Io sono di Roma. io and tu are not ungrammatical, they are MARKED, and come back only to contrast (Io sono di Roma, lei è di Milano). This is the opposite of English AND of French, where the subject pronoun is compulsory; tag it delta and repeat it in every sentence of the module.',
        'Mi chiamo is a reflexive verb the learner meets before the word "reflexive" — chiamarsi, literally "I call myself" — and it is how a name is given. The little pronoun says whose name it is: mi chiamo · ti chiami · si chiama. Il mio nome è… is grammatical and nobody introduces themselves that way. Teach it as a two-token chunk, not as mi + chiamo.',
        "WHERE YOU ARE FROM is a CITY here, not a country, and that is a real Italian constraint rather than a simplification: Sono di Roma is the everyday sentence, while a country takes an article and usually another verb (Vengo dall'India), which would drag dall' — a preposition+article elision this course keeps out of L1 — into the first module. So origin is either a city (Sono di Roma) or a nationality adjective agreeing with the speaker (Sono indiano · Sono indiana). *Sono di India is the shape a Spanish or English ear produces and it is worth a mistake block.",
        'Liking runs on piacere = "to be pleasing", so the thing liked is the SUBJECT and the verb agrees with IT, not with the person: Mi piace il caffè (one thing) · Mi piacciono i libri (more than one). mi only names who is pleased and never changes for number. Write that agreement rule — "piace means like" is memorable and tells an author nothing about when to write piacciono. Italian also keeps the definite article where English drops it: Mi piace il caffè is "I like coffee", and *Mi piace caffè is the English shape showing through.',
        'First contact with gender: every noun carries one and its article shows it — il caffè (m) · la casa (f). Teach each noun WITH its article and leave the full paradigm to M3. Do NOT offer the slogan "-o is masculine, -a is feminine": il problema and il cinema end in -a and are masculine, la mano ends in -o and is feminine, and every noun in -e (il pane, la notte) picks a side its ending cannot show. The law that replaces it: gender is a property of the noun, learned with its article.',
        'INDEX SEAM, decided here because this module opens the course\'s word index and first occurrence wins: sono is ONE row for the whole course, so its note must be true of every seat it takes — "I am" here, the loro form ("they are"), and from M5 the helper that builds the past of the movement verbs (sono andato). è (is) gets its own row and its accent is never optional: e without it is "and", which M10 teaches. la is the FEMININE ARTICLE row and nothing else — the object pronoun la stays out of L1 entirely. di is M1\'s too, and its note must be true of both jobs the course gives it — the origin "from" here, and the "of" of M8\'s un chilo di riso — because M3\'s un po\' di is claimed whole and no later row can reach the bare key. Teach mi chiamo, mi piace and mi piacciono as whole multi-token surfaces: that is what stops a bare mi row from ever being needed.',
      ],
      maxWordsPerSentence: 5,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M2': {
      id: 'L1-M2',
      title: 'First exchange',
      job: 'Greetings, wellbeing, yes/no questions',
      patterns: [
        'Ciao/Buongiorno + , + name',
        'Come stai?',
        'Sto + Adv',
        'Sei di + city?',
        'Sì/No + , + <statement>',
      ],
      notes: [
        'REGISTER, the module that pays for the decision: the greeting is ciao and the question is come stai?, never come sta?. Say what each greeting is FOR rather than ranking them — ciao is for someone you are on tu terms with and does both hello and goodbye; buongiorno is the daytime greeting you can say to anyone, friend or stranger, and is what you say walking into a shop. Lei is named in the usage line as the thing this course does not yet teach, and it is written in no display.',
        "A yes/no question is the statement, unchanged, said with a rising voice and written with a question mark: Sei di Roma? beside Sei di Roma. English fronts do or are; Italian moves NOTHING and has no do-support at all. That is a delta to celebrate, not a rule to drill — and the module's mistakes are the English shapes leaking in (*Fai sei di Roma?, and Sei tu di Roma? offered as a neutral question when it is in fact a contrast).",
        'Wellbeing runs on stare, not on essere: Come stai? · Sto bene. essere says who or what you are (M1); stare says how you are doing. Both shapes the greeting needs — sto and stai — belong in ONE row, and the rest of stare (its "to stay" sense, and the progressive sto mangiando) stays out of L1; M4 names that deferral.',
        'Adjective agreement arrives here because the answer to "how are you?" changes with WHO is speaking: stanco for a man about himself, stanca for a woman (and stanchi · stanche in the plural, which L1 does not need). Say SUBJECT, not speaker: with tu it is the person being asked (Sei stanca?), and the speaker-shaped version of this rule is exactly the defect the third Marathi review had to correct three times (docs/08).',
        'Short answers: Sì and No stand alone or head a full sentence (Sì, sono di Roma). ACCENT SEAM: sì (yes) carries its accent always, because si without it is the reflexive third person M4 teaches (si chiama, si alza) — one keystroke, two different words, and the index keeps them apart only if the accent is written. The slogan to kill here is "the accent on sì is optional emphasis"; it is a letter.',
      ],
      maxWordsPerSentence: 5,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M3': {
      id: 'L1-M3',
      title: 'Needs and wants',
      job: "Say what you want and don't want",
      patterns: [
        'Voglio + un/una + N',
        'Non voglio + N',
        'Voglio + V-inf',
        'Vorrei + un/una + N',
        "Un po' di + N",
      ],
      notes: [
        'Wanting to DO something is voglio + a BARE infinitive — Voglio mangiare, with no word for "to". English "want to eat" pushes a stray a or di into the sentence; *Voglio a mangiare and *Voglio di mangiare are both wrong and are worth a mistake block. (Italian does put a preposition after some other verbs — vado a mangiare, M6 — which is why the rule must name volere and not "Italian verbs".)',
        "Negation is ONE word in ONE place: non, immediately before the verb, and nothing else in the sentence changes — Non voglio il caffè. English needs a do-support auxiliary Italian has no equivalent of, so *Non faccio voglio is the shape to kill. INDEX SEAM: non is M3's row and its note has to survive every later negative in the course (M5's non ho mangiato, M9's non voglio … perché …), so write it about the POSITION, not about this module's verb.",
        "Every want names a noun, so this is where gender stops being a label and becomes a paradigm. The indefinite article: un before most masculine nouns (un libro, un amico), uno before a masculine noun starting s+consonant or z (uno studente, uno zaino), una before a feminine one (una casa), un' before a feminine noun starting with a vowel (un'amica). The definite plural comes with it: i libri, gli studenti, gli amici, le case. Teach the article WITH the noun, never as a table to memorise.",
        'The plural is a VOWEL CHANGE on the ending and never an -s: libro → libri, casa → case, studente → studenti, amica → amiche (the h keeps the c hard). "Add -s for the plural" is the single most productive English error in this language and the slogan this module exists to replace; the law is that the last vowel does the work. Tag it interference and spend a mistake block on *libros / *casas.',
        'vorrei is the polite want, and in a tu-only course it is one of the two things carrying politeness (per favore, M8, is the other): it is the conditional of volere, "I would like", and it is what you say across a counter. voglio is direct without being rude — a child to a parent, a friend at a table. Teach vorrei as a whole word here rather than opening the conditional; the tense is L2\'s.',
        "INDEX SEAM: un po' di is claimed WHOLE, as a three-token surface. src/engine/surface.ts strips edge punctuation but never an inner apostrophe, so po' is its own token and does not answer for po — and claiming the phrase whole leaves bare di to M1's Sono di Roma, whose note has to be true of the \"of\" seat as well. It is the only apostrophe in L1 outside the article rule. Since the spoken-Italian pass (2026-09-05, docs/44) un po' is also a forms entry on the row, so un po' d'acqua resolves through it and through d'acqua on M8's acqua row. lo is the masculine article row here and never the object pronoun, which stays out of L1; un'amica, when it appears, is a forms entry on amica rather than a row of its own.",
      ],
      maxWordsPerSentence: 6,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M4': {
      id: 'L1-M4',
      title: 'My day',
      job: 'Daily habits and time words',
      patterns: [
        '(Io) + V-o + ogni giorno / tutti i giorni',
        'Mi alzo alle + hour',
        'Di mattina/sera + V-o',
        'Il lunedì + V-o',
        'A che ora + V-i?',
      ],
      notes: [
        'ONE Italian present covers BOTH English presents: mangio is "I eat" AND "I am eating", and which one it is comes from the sentence, never from the form. The interference is the English -ing looking for a home — *sono mangiando and *sto mangiare are the two shapes it takes, and both belong in mistake blocks. Italian does have a progressive (sto mangiando, stare + gerund) and it is for what is happening right this second; it is DEFERRED to L2, and M2\'s stare row already says so.',
        "The spine is the present across persons in all three classes, one stem plus an ending: parlo · parli · parla; prendo · prendi · prende; dormo · dormi · dorme. The ending is what carries M1's pro-drop, so keep the pronouns out and let the ending do the work — and note that the tu ending is -i in every class, which is the one shape a tu-only course needs most.",
        'Daily verbs are reflexive and the little pronoun is part of the verb, changing with the person: mi alzo · ti alzi · si alza. English "I get up" has nothing there at all, so the dropped mi is the commonest slip and belongs in a mistake block (*Alzo alle sette). ACCENT SEAM: si (the reflexive third person) is the unaccented twin of M2\'s sì (yes) — the index keeps them apart only because both accents are written.',
        'Time goes in FRONT, and the article is what marks a habit: alle 7 (at 7), di mattina / di sera (in the morning / in the evening), and il lunedì — WITH the article — meaning "on Mondays", every Monday, where bare lunedì is one particular Monday. That article does work English does with a plural -s, and it is worth a rule of its own. lunedì carries its accent always.',
        "INDEX SEAM: alle is a single token (a + le) and is M4's row, which keeps bare a free for M6's vado a Roma; its note says what the contraction is made of, because M7's al, nel and sul inherit the same law. Teach di mattina and di sera as whole two-token surfaces — the di inside them is not M1's \"from / of\" and a tap must not open that note, which is exactly what a longer surface prevents.",
      ],
      maxWordsPerSentence: 6,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M5': {
      id: 'L1-M5',
      title: 'Yesterday',
      job: 'Past tense — the first big divergence',
      patterns: [
        'Ieri + ho + V-participle',
        'Ieri + sono + andato/andata + a + place',
        'Ieri non ho + V-participle',
        'Cosa hai + V-participle + ieri?',
      ],
      notes: [
        'THE interference zone of the level, and it is not the one Spanish has: Italian\'s everyday past is ONE tense, the passato prossimo, built from a helper plus a participle — ho mangiato, sono andato. What splits is the HELPER. Most verbs take avere (ho mangiato, ho comprato, ho visto); a fixed, small set — the verbs of going, coming, staying, being and becoming, plus every reflexive — takes essere (sono andato, sono stato, mi sono alzato). "Verbs of motion take essere" is the slogan; it is nearly right and it leaks (ho camminato and ho viaggiato take avere), so state it as a LIST this module teaches, not as a category the learner can derive.',
        "With essere the participle AGREES with the subject, exactly like an adjective: sono andato (a man) · sono andata (a woman) · siamo andati. With avere it does not move at all: ho mangiato, whoever is speaking. That pair — agreement on one helper, none on the other — is the module's comprehension work, and the mistakes are *sono mangiato and *ho andato.",
        'There is no did-support and no separate simple past to reach for: ho mangiato translates "I ate" as readily as "I have eaten", and the question is Cosa hai mangiato?, with no auxiliary invented for it (cosa is what is said; the spoken-Italian pass, 2026-09-05, docs/44, made it the display and kept che cosa and che as forms of the same row). The slogan to name and kill is "the passato prossimo is the present perfect, so it means \'have eaten\'"; the law is that ONE Italian tense covers both English pasts in ordinary speech.',
        'The imperfetto (mangiavo, ero, avevo) is the OTHER Italian past and it is deliberately OUT of L1: it presents a past as an unbounded frame — a habit, a background state — and it needs a contrast the learner cannot yet frame. Name it as deferred in a note rather than half-teaching it, and anchor every sentence here with ieri so nothing in the module is asking for it.',
        "INDEX SEAM, three decisions: (1) the participle gets its OWN row per verb (mangiato; andato with forms andato · andata), because participle formation is what this module actually teaches; (2) ho is M5's row and it owns the key M9's ho fame will inherit, so its note defines BOTH jobs — the helper here, and the plain \"I have\" there; (3) the sono in sono andato resolves to M1's row, since first occurrence wins and no row here can reach that key — which is why M1's sono note was written to cover the helper seat. Do not open a second sono row; put the essere/avere split in this module's rule text.",
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M6': {
      id: 'L1-M6',
      title: 'Tomorrow',
      job: 'Future and plans',
      patterns: [
        'Domani + V-o',
        'Domani vado a + place',
        'Domani vado a + V-inf',
        'La settimana prossima + V-o',
      ],
      notes: [
        'The everyday Italian future is the PRESENT plus a time word: Domani vado a Roma · Domani lavoro. English half-shares this ("I\'m going tomorrow"), so it is a delta the learner already half-owns — say so, and let the time word carry the tense. "You need the future tense to talk about the future" is the slogan that would make an author write the form Italians use least in conversation.',
        'The futuro semplice (andrò, lavorerò) is real, is used for predictions and promises, and is DEFERRED to L2: it is a full new set of endings for a job the present already does at this level. Name the deferral in a note so a later author does not import it a level early, and keep every sentence of M6 inside present-for-plans.',
        'andare is irregular and carries the module: vado · vai · va. It is worth its share of the word cap on its own, and it brings in the destination a — vado a Roma, vado a casa (no article on casa: that is the idiom, not a slip) — and the a that stands between andare and an infinitive, vado a comprare. (The spoken-Italian pass, 2026-09-05, docs/44, moved S02 to Stasera mangio fuori — vado a mangiare is not how eating out is said — so the a + infinitive hero is S10.)',
        "INDEX SEAM: bare a is claimed HERE, and its note has to be true of both seats this course gives it — the destination (vado a Roma) and the a before an infinitive after andare (vado a mangiare). M4 kept its hands off it by teaching alle whole, and M7's vicino a is a two-token surface for the same reason, so this row answers every later tap. domani is a plain adverb: no article and no preposition in a plan sentence (*Il domani vado a Roma, *Nel domani vado a Roma).",
        "Keep the plan sentences to ONE clause. The temptation at this bound is to hang a reason on the end, and perché is M9's — a turn of two sentences is M10's job, not this one.",
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M7': {
      id: 'L1-M7',
      title: 'Where things are',
      job: 'Locations and prepositions',
      patterns: [
        'N + è + in/su + place',
        "Dov'è + N?",
        "C'è + un/una + N + in + place",
        'Ci sono + num + N-pl',
        'N + è + vicino a + N',
      ],
      notes: [
        'Existence splits by NUMBER, and this is a delta English shares: c\'è for one thing, ci sono for more than one — C\'è un libro sul tavolo · Ci sono due libri sul tavolo — exactly as English says "there is" / "there are". Do NOT copy French here: il y a is invariable and Italian\'s is not, so a French-trained ear writes *C\'è due libri. The slogan to kill is "c\'è means there is/are"; the law is that it agrees with what follows, and choosing is the module\'s comprehension work.',
        'Where a thing IS takes essere, plainly: Il libro è sul tavolo. Italian has no ser/estar split to negotiate — one verb does identity, origin and location — which is a genuine free ride for an English speaker who has met Spanish, and worth saying in as many words.',
        'Prepositions stand BEFORE the noun (in cucina, su, sotto, dietro, vicino a) and several of them fuse with a following definite article into one written word: a + il = al, in + il = nel, su + il = sul, and their feminine partners alla, nella, sulla. That fusion is compulsory — *in il tavolo and *su il tavolo are not options — and each fused form is its own single-token surface in the index, which is exactly what keeps bare in and bare a answering for their own rows.',
        'vicino keeps its a: vicino alla stazione, vicino a Roma. English "near the station" has no "to", so the missing a is the trap; teach vicino a as a two-token surface, which also keeps M6\'s bare a untouched.',
        "INDEX SEAM: c'è is ONE token with an inner apostrophe and gets its OWN row, because its first element (ci) is taught nowhere in L1; ci sono is the two-token surface beside it, and it swallows the sono inside it, so a tap there opens the existential note and never M1's essere. dov'è is a forms entry on the dove row, whose note explains the fusion (dove + è). Point with qui and lì, not with là: là is the accented twin of M1's article la and no job here is worth the collision.",
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M8': {
      id: 'L1-M8',
      title: 'Numbers & shopping',
      job: 'Prices, quantities, buying',
      patterns: [
        'Quanto costa + il/la + N?',
        'Quanto costano + i/le + N-pl?',
        'num + N + , per favore',
        'Un chilo di + N',
      ],
      notes: [
        "The price question agrees with the THING, not with the buyer: Quanto costa il caffè? · Quanto costano i libri? Name the link back to M1 — this is piacere's reversal again, the thing is the subject — and a learner who has met it once should be told it is the same shape twice.",
        'quanto agrees in gender AND number with what it counts: quanto pane · quanta acqua · quanti libri · quante case. English splits much from many by countability; Italian makes no such split and asks for agreement instead. Say it as a trade, not as a freebie — "quanto is how much and quanti is how many" is close enough to feel right while being wrong about what actually changes.',
        'euro is INVARIABLE in the plural: due euro, dieci euro, never *due euri. So is caffè, and every noun ending in a stressed vowel (due caffè, tre città). These refuse the vowel change M3 taught, so they belong here as a named class rather than as one-off exceptions. Numbers are vocabulary the sentences actually use (uno…dieci, venti, cento), not a counting drill, and quantities take di — un chilo di riso, una bottiglia di vino.',
        "REGISTER: this is the module the tu-only decision is most likely to be questioned in, because a real shop counter uses Lei. It does not need to be questioned: quanto costa? has no person in it, per favore and M3's vorrei carry the politeness, and Vorrei due caffè, per favore is exactly what a customer says. Put in usage that a shopkeeper will address the learner with Lei and that answering in tu is over-familiar rather than wrong — and write no Lei form in any display.",
        "INDEX SEAM: per favore is claimed WHOLE, at the edge of the request, which leaves bare per unclaimed for the whole level — no L1 module needs it, and whichever module eventually does gets a clean key. quanto costa and quanto costano are two-token surfaces, which is what leaves the agreeing quantifier quanto / quanta / quanti / quante free for its own row here. della is M8's contraction row (di + la); bare di stays M1's, and un chilo di riso is exactly the \"of\" seat M1's note was written to cover.",
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M9': {
      id: 'L1-M9',
      title: 'Feelings & opinions',
      job: 'Why — because and so',
      patterns: [
        '<statement> + perché + <statement>',
        '<statement> + , quindi + <statement>',
        'Perché + <question>?',
        'Ho + fame/freddo/sete',
      ],
      notes: [
        'perché is ONE word doing BOTH jobs: it asks "why" (Perché non mangi?) and it answers "because" (Non mangio perché sono stanco). Spanish separates them in spelling and Italian does not, so there is no orthographic escape here — one index row, one note true in both directions, and telling them apart from the sentence IS the module\'s comprehension work. "perché means why" is the slogan; the law is that the same word turns the question around and answers it.',
        'The consequence partner is quindi (or così): the same two facts in the opposite order — Non voglio il caffè perché sono stanco · Sono stanco, quindi non voglio il caffè. Build the sentences in pairs and make the comprehension pool test the choice.',
        'The avere states: Italian says ho fame, ho freddo, ho sete, ho sonno, ho caldo where English says "I am hungry / cold / thirsty / sleepy / hot". The noun is BARE — no article — and the verb is avere, so *sono fame is the classic anglophone sentence and the mistake block this module owes. State the law as the closed list the module teaches, NOT as "feelings take avere": sono stanco and sono contento take essere, and both appear here (contento, not felice, since the spoken-Italian pass, 2026-09-05, docs/44 — felice stays a form for recognition).',
        "Feelings that ARE adjectives ride essere and agree with the SUBJECT: sono stanco (a man about himself) · sono stanca (a woman) · Sei stanca? (to a woman). Say subject, not speaker — with tu it is the person being asked. This is M2's agreement rule again, at a bound where it finally has a reason to move.",
        "penso che drags in the subjunctive (penso che sia…), which is not L1's. Keep opinions on penso di + infinitive (penso di andare) and on the plain perché clause, and name the deferral so a later author does not import a mood a level early. INDEX SEAM: this module opens NO ho row — M5's helper row already owns that key and its note was written to define the plain \"I have\" as well; put the states in this module's rule text instead.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M10': {
      id: 'L1-M10',
      title: 'Connected talk',
      job: 'Short 2–3 sentence exchanges',
      patterns: [
        '<M1–M9 pattern> + <M1–M9 pattern>',
        '<question> → <answer + perché + reason>',
        '<statement> + e/ma + <statement>',
        '<statement> + . + Poi + <statement>',
      ],
      notes: [
        'Each item is a TURN of 2–3 short sentences, not one long one — a question and its answer, or a statement, a reason and a follow-up. The per-sentence bound applies to each sentence inside the turn.',
        'Recombination is the lesson: nearly everything comes from M1–M9. The honest new spend is the joiners that hold a turn together — e, ma, anche, poi, allora — and little else. Keep the turns everyday and symmetric: greeting → wellbeing → plan (Ciao, Anna. · Come stai? · Sto bene, grazie. Domani vado a Roma.); want → reason → buy.',
        'A turn is where pro-drop is most tempting to break, and it is this module\'s loud rule: once the person is established Italian keeps dropping the pronoun, and an io at the head of every sentence reads as insistence or contrast, not as neutral speech. "You must write the subject pronoun" is the English — and French — habit this module exists to unlearn; the law is that the ending carries the person and a pronoun MARKS something.',
        'lui and lei are for PEOPLE, and they earn their place only where a turn switches person or draws a contrast (Anna è di Roma. Lui è di Milano.). For a THING Italian reaches for no pronoun at all: it drops the subject and lets the verb and the agreeing adjective carry the gender — Il caffè è buono. È caldo. (esso and essa exist and nobody says them.) That is the mirror of English "it", and the second half of the pro-drop rule above.',
        'ACCENT SEAM, cashed here: e ("and") is the new joiner and it is M1\'s è ("is") minus one accent. Both appear inside the same turns, so this is the module where a dropped accent does the most damage — write è on every copula and e bare, and let a mistake block show what comes out when they swap (*Il caffè e buono).',
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M1': {
      id: 'L2-M1',
      title: 'Asking politely',
      job: 'Requests, thanks, apologies in the right register',
      patterns: [
        'Scusi / Scusa + , + <request>',
        'Può / Puoi + V-inf + ?',
        'Potrebbe / Potresti + V-inf + ?',
        'Mi dispiace + , + <statement>',
        'Grazie mille — Prego',
      ],
      notes: [
        "REGISTER, decided for the whole level and repeated here because a prompt only ever shows an author the notes (full record: docs/57-en-it-L2-brief-decisions.md; the five L1 decisions carry unchanged — the elision apostrophe inside a token, accents as letters, multi-token surfaces, named homograph owners). L1 spoke tu throughout and promised Lei to this level. What arrives is the polite VERB, not the pronoun: Italian is pro-drop and the polite pronoun is normally left out — Come sta?, Vuole un caffè?, Scusi, dov'è la stazione? — so the law is that politeness rides the THIRD-PERSON VERB. Author every request in both addresses side by side: Puoi aprire la finestra? beside Può aprire la finestra?. tu frames chip `informal`, the third-person frames and the Potrebbe tier chip `formal`, anything safe with either stays `neutral`.",
        'The pronoun Lei stays OUT of display, and the reason is the index, checked against the real function rather than assumed: surface.ts lowercases, so Lei folds to lei — and lei is already L1-M10\'s key, meaning "she". First occurrence wins, so no row here could take it back, and a display Lei would send every polite sentence in the course to a note about the third person feminine. Name Lei in usage prose, with its capital, and never in display, forms or a pool item. The polite object clitics La and Le are barred for the same reason: both fold onto L1-M1\'s articles.',
        'Italian splits English "sorry" three ways and the module lives on the split: Scusi / Scusa asks to be excused before the fact (interrupting, getting past, asking a stranger); Mi dispiace is regret for something that has happened; Permesso asks permission to come in or to pass through a crowd. English speakers reach for one word and Italians hear the wrong one; spend a mistake block on it. Note that Scusi is also the first of this level\'s frozen formal imperatives — see the next note — so it carries two lessons at once.',
        "The formal imperatives this level uses — Scusi, Senta, and M4's Giri, Prenda, Vada — are present SUBJUNCTIVE forms, and the congiuntivo as a system is L3-M3/M4's. So they enter as frozen politeness words, taught one at a time, with a note saying plainly that L3 will show them again as a paradigm. The same discipline governs the conditional: vorrei is L1-M3's frozen row, and this module adds potrebbe and potresti as two more frozen cells and nothing else. Shipping the word while deferring the system is honest; pretending the forms are unrelated is not.",
        "INDEX SEAM: scusi, scusa, senta, dispiace, permesso, può, puoi, posso, potrebbe, potresti and sta are fresh keys. Mi dispiace and Grazie mille ride as two-token surfaces — the tool L1 built with mi chiamo and mi piace — which is what keeps the bare mi free for M5's clitic. per favore stays L1-M8's row, prego and mille stay L1-M10's, grazie stays L1-M2's, vorrei stays L1-M3's, and lei stays L1-M10's and is never written with a capital in a field the index reads.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M2': {
      id: 'L2-M2',
      title: 'Describing people',
      job: 'Appearance, character, relationships',
      patterns: [
        '<person> + è + Adj',
        '<person> + ha + i/gli/le + N + Adj',
        'mio/mia + N-family',
        'il mio / la mia + N',
        '<person> + sta + bene / male',
      ],
      notes: [
        'Features take AVERE, not essere: ha i capelli lunghi, ha gli occhi verdi, ha trent\'anni. English says "has green eyes" and then "is thirty", and Italian uses the same verb for both — so age is the sentence to spend a mistake on, because *è trenta is the literal translation and is wrong. The article is part of the frame (ha I capelli, not *ha suoi capelli), which is the same habit M2 will meet again in the possessive rule below.',
        "essere against stare, and it is NOT Spanish's split — say so, because an author who has read the en-es briefs will import the wrong law. Italian's stare covers health and how someone is doing (Come sta?, Sto bene, L1-M2's own rows) and a few fixed uses; identity, origin, character and even location go to essere (Sono a Roma, where Spanish would say estoy). The working rule: essere for everything except how you FEEL and how things are GOING.",
        "The possessive rule is Italian's most distinctive small law and it has two halves that must be taught together: a possessive normally keeps its article — il mio libro, la mia casa, i miei amici — and the article DROPS before a singular family member: mio fratello, mia sorella, but i miei fratelli. English drops the article always and Spanish drops it always, so both halves are delta. Author the pair in one screen.",
        "The family and person set: fratello, sorella, padre, madre, figlio, figlia, marito, moglie, amico, amica, nonno, nonna; alto, basso, giovane, anziano, simpatico, gentile, bravo, magro. Two spellings to plan for, because M3 inherits them: amico pluralises to amici with a SOFT c and simpatico to simpatici, while a word like bianco goes to bianchi with the hard sound preserved — the -co plural forks and no rule predicts it, so each plural sits in its own row's forms.",
        "INDEX SEAM: ha (L1-M5's row, doing possession here — point back, do not re-open), sta, mio, mia, miei, mie, suo, sua, tuo, tua, fratello, sorella, padre, madre, figlio, figlia, marito, moglie, amico, amica, capelli, occhi, anni, alto, basso, giovane, anziano, simpatico, gentile and magro are the keys. lui and lei stay L1-M10's rows and lei is never capitalised in an indexed field (M1's rule). trent'anni carries an elision and is ONE key — the L1 policy, and the reason a bare anni row is authored separately.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M3': {
      id: 'L2-M3',
      title: 'Describing things',
      job: 'Size, colour, quality — agreement at length',
      patterns: [
        'il/la + N + è + Adj',
        'i/le + N-pl + sono + Adj-pl',
        'un/una + N + Adj',
        'un bel + N   /   un + N + bello',
        'N + molto + Adj',
      ],
      notes: [
        '"At length" is the grid, and Italian\'s is smaller than it looks: an adjective in -o has FOUR cells (rosso · rossa · rossi · rosse) and one in -e has TWO (grande · grandi, felice · felici) — it never marks gender, only number. L1 shipped both classes without naming the split (buono / buona / buoni / buone at M1, grande / grandi at M3, triste / tristi at M9), so the law arrives as a summary of what the learner already has rather than as news. The shortcut to refuse is "-o is masculine, -a is feminine": it is about nouns, and it is false of il problema and la mano just as it is in Spanish.',
        "The invariable colours are the module's best fact: blu, rosa, viola and beige do not change at all — le case rosa, i libri blu — because they are nouns pressed into service as adjectives. Everything else bends: rosso, nero, bianco, giallo, verde (an -e adjective, so two cells). And the plural of a -co adjective forks unpredictably: bianco → bianchi keeps the hard sound with an h, while simpatico → simpatici goes soft. Put each plural in its own row's forms and let no rule claim the fork is predictable.",
        "bello and buono apocopate before a noun and it is worth one careful rule: un bel libro, un bell'uomo, i bei libri, begli occhi — the shapes track the article the noun would take (il → bel, l' → bell', i → bei, gli → begli). After the noun, nothing changes: un libro bello. buono does the same on a smaller scale (un buon libro), and its four full cells are already L1-M1's row, so this module extends nothing there and teaches the apocope on bello.",
        'molto is the intensifier and it is invariable when it modifies an adjective (molto caro, molto cara) and bends when it counts a noun (molti libri, molta acqua). L1-M1 owns molto as "very much"; this module re-teaches both jobs on that row rather than opening one, and its own spend is poco\'s partner set, already L1-M4\'s. The trap is the reverse of the Spanish one: *molta cara is the error, and it comes from a learner who has just learnt that adjectives agree.',
        "INDEX SEAM: rosso, nero, bianco, giallo, verde, blu, rosa, viola, bel, bell', bei, begli, bello, lungo, corto, nuovo, vecchio, pulito, sporco, pesante and leggero are fresh keys, each row carrying the cells this level shows. grande, grandi, buono's four cells, caro's four (L1-M10) and molto (L1-M1) stay their L1 rows. bell' is a distinct key from bello — the elision apostrophe stays inside the token, so the index sees two words — and that is why both are authored here with cross-referring notes.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M4': {
      id: 'L2-M4',
      title: 'Getting around',
      job: 'Directions, transport, asking the way',
      patterns: [
        "Scusi + , + dov'è + il/la + N?",
        'Giri a destra / a sinistra',
        'Vada sempre dritto',
        'Prenda + il/la + N',
        'Vado in autobus / a piedi',
      ],
      notes: [
        "This module speaks the polite third person throughout, chipped `formal`, and it is where M1's frozen imperatives are spent: Giri, Prenda, Vada, Senta, Scusi. Say again in the note that these are subjunctive forms L3 will teach as a paradigm — a learner who meets them twice as unrelated things has been badly served — and that the tu partners (gira, prendi, va') exist and are named in usage rather than shown, because a stranger in the street is the scene.",
        'Transport takes IN, not con and not per: vado in autobus, in treno, in macchina, in metropolitana — and a piedi for walking, which uses a instead for no reason a rule can give. English "by bus" and Spanish "en autobús" both mislead a little, so tag it delta and give the list rather than a principle. il biglietto, la fermata, la stazione (L1-M7) and il binario are the nouns.',
        "Directions are the vocabulary spend: destra, sinistra, dritto, sempre, avanti, dopo, prima, l'angolo, il semaforo, la piazza, la strada, il ponte. a destra and a sinistra are indexed WHOLE, which keeps the bare a on L1-M5's row where it belongs and gives the direction phrase its own note — the same move en-es makes with a la derecha, and for the same reason.",
        "c'è against ci sono (L1-M7's rows) does the existential work — C'è una banca qui vicino? — and dov'è (also L1-M7, and an elision that is one key) asks for a place both speakers know. Both are re-taught here and owned there. The one new question shape is Come si va a…?, whose si is impersonal: it is a fresh key, and its note should say that this si is the same one hiding inside si chiama (L1-M1's multi-token surface, which is what left the bare si free).",
        "INDEX SEAM: giri, prenda, vada, destra, sinistra, dritto, avanti, angolo, semaforo, piazza, strada, ponte, biglietto, fermata, binario, autobus, l'autobus, metropolitana, macchina, si, lontano and vicino (the bare adverb — L1-M7 owns vicino a as a phrase) are fresh keys. l'autobus is one key with the elision inside it and does NOT answer for a bare autobus, so both are authored, the second pointing at the first. a destra and a sinistra ride whole; a, in, dove and dov'è stay L1's rows. Street and city names never index (#61).",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M5': {
      id: 'L2-M5',
      title: 'Food and hosting',
      job: 'Ordering, offering, refusing without offence',
      patterns: [
        'Per me + , + un/una + N',
        'Prendo + il/la + N',
        'Vorrei + del/della + N',
        'Lo prendo / Li prendo',
        'No + , + grazie + , + <reason>',
      ],
      notes: [
        "Ordering is L1's own vocabulary in a new seat: Prendo un caffè (L1-M6's prendo, and \"I'll take\" is what an Italian says where English says \"I'll have\"), Vorrei un tavolo per due (L1-M3's vorrei), Per me una pizza. The delta is the present tense doing the work of English's future — Prendo, not *Prenderò — which is the same habit M6 will use for arrangements. Say it here and point forward.",
        "The partitive article arrives: del pane, della carne, dell'acqua, dei libri — di fused with the article, meaning \"some\". L1 shipped di (M1), d'acqua (M8) and un po' di (M3) and never combined it, so the fusion is the news and the meaning is already known. Each fused form is its own key with the elision inside it where there is one, and dell'acqua does not answer for L1-M8's l'acqua — both are authored and cross-referenced.",
        "The direct-object clitics open here, and the index decides which: lo, li, mi and ti are free keys, while la, le, i and gli are L1-M1's ARTICLES and can never be first-taught as pronouns. So the law is taught on lo and li (Il pane? Lo prendo. I libri? Li voglio) and on mi and ti (Mi porta il conto?), with the feminine and the indirect forms named in prose and left to L3. The placement rule is the delta: the clitic goes BEFORE the conjugated verb, where English puts the object after it.",
        "Refusing without offence is the cultural half: an Italian host offers again, and a bare No is heard as an opening rather than as an answer — the refusal that lands adds a reason and a warmth word (No, grazie, sono a posto · Basta così, grazie · Magari più tardi). Put it in usage. The other half is the small ritual vocabulary a meal needs: Buon appetito, il conto, un altro / un'altra (note the apostrophe: the feminine indefinite elides, un'altra, and the masculine does not, un altro — one of the few places Italian's apostrophe carries gender).",
        "INDEX SEAM: lo, li, mi, ti, del, della, dell'acqua, dei, delle, conto, carne, pesce, verdura, dolce, bicchiere, forchetta, altro, un'altra, posto, basta and appetito are fresh keys. Mi chiamo, mi piace, mi alzo, ti chiami and ti alzi stay L1's multi-token surfaces — which is exactly what left the bare mi and ti available for this module — and the clitic rows' notes name all of them, so a learner is never told that mi means only one thing. prendo, vorrei, per favore and un po' di stay their L1 rows.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M6': {
      id: 'L2-M6',
      title: 'Making plans together',
      job: 'Invitations, suggestions, settling a time',
      patterns: [
        'Andiamo + a + <place> + ?',
        'Ti va di + V-inf + ?',
        'Sei libero / libera + <day> + ?',
        'Ci vediamo alle + <hour>',
        "Facciamo alle otto — D'accordo",
      ],
      notes: [
        "Plans are made among friends: tu and noi throughout, chipped `informal` where the frame is tu-only, and the polite third person deliberately absent — an invitation in the Lei forms reads as a business appointment, which is M7's scene. Say so in usage rather than in a rule.",
        'The noi cell arrives and it doubles as the suggestion: Andiamo! is both "we go" and "let\'s go", so Italian needs no extra word where English needs "let\'s" and Spanish reaches for vamos a. That is a rest point — the ending does the work — and the honest new spend is the -iamo ending itself across the verbs the course owns (andiamo, facciamo, prendiamo, mangiamo, vediamo).',
        'Ci vediamo ("see you") is the closing every plan ends on, and its ci is the same impersonal-ish particle family M4 opened with si — one note, cross-referenced, no second family. Ti va di…? is the everyday invitation frame and it is built on L1-M6\'s va: literally "does it suit you to…", the same shape as mi piace, which the note should point at because the learner already owns that pattern.',
        "The clock: alle sette is L1-M4's, and this module adds e mezza, e un quarto and in punto, plus the days L1 did not teach (martedì, mercoledì, giovedì, venerdì, domenica beside L1-M4's lunedì and sabato). meno un quarto is real and is deliberately NOT shown: meno is M9's key and its comparative note must be its first, so a usage line names the clock use and M9 delivers the word. The article on a day means \"every\" — il lunedì (L1-M4) is Mondays in general, lunedì alone is this coming Monday — a distinction English makes with a plural and Italian with an article.",
        "INDEX SEAM: andiamo, facciamo, prendiamo, vediamo, ci vediamo, ti va, libera (L1-M10 owns libero and its cells), martedì, mercoledì, giovedì, venerdì, domenica, mezza, quarto, punto and d'accordo are fresh keys. d'accordo carries an elision and is one key. va stays L1-M6's row, alle sette stays L1-M4's phrase, sabato and il sabato stay L1-M4's, stasera and domani stay L1-M6's. ci is authored here as a bare key even though c'è and ci sono (L1-M7) contain it — those are their own surfaces and answer for nothing outside themselves.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M7': {
      id: 'L2-M7',
      title: 'On the phone',
      job: 'Calls and messages — openings, closings, taking a message',
      patterns: [
        'Pronto? — Sono + <name>',
        'Posso parlare con + <name> + ?',
        "Non c'è + . + Vuole lasciare un messaggio?",
        'Sto parlando con + <person>',
        'La richiamo più tardi',
      ],
      notes: [
        'Pronto? is how Italy answers a phone and it means "ready" — a fact worth one line, because a learner who meets it as an unanalysable noise learns nothing, and one who is told it is an adjective can hear the rest of the language in it. The identification is Sono Rohan ("I am Rohan"), where English says "this is" — small, fixed, high-frequency, and the first sentence of the module.',
        "stare + gerundio opens here, because a call is happening NOW: Sto parlando, Sta mangiando, Non può, sta lavorando. L1 taught sto and stai (M2) and M2 added sta, so the auxiliary is the learner's and only the -ando / -endo form is new. The delta is what it does NOT do: Italian uses the plain present far more than English uses its simple present, so the gerundio is reserved for what is genuinely in progress at this moment — *Domani sto lavorando is wrong where English says \"I'm working tomorrow\", and M6's plain present is the repair.",
        "This module speaks the polite third person, chipped `formal`, because you cannot see who picked up — and it is where the level's Lei ruling is most visible: the sentences are Vuole lasciare un messaggio? and La richiamo, with no pronoun anywhere, which is what an Italian says. The polite object clitic La is barred from display (it folds onto L1-M1's article), so a note names it in prose and the display uses the frame without it: Richiamo più tardi.",
        "Taking a message needs no new tense: Non c'è (L1-M7's c'è, negated), Ha lasciato un messaggio (L1-M5's passato prossimo), Richiamo più tardi (M5's present-for-future). Reported speech — Ha detto che… — is L3-M5's and is named as deferred here, which is why a message is passed on with the words themselves.",
        "INDEX SEAM: pronto, parlare (L1-M4's row — point back), parlando, mangiando, lavorando, messaggio, numero, richiamo, tardi, lasciare, attimo and sbagliato are fresh keys. più is M9's key and is used here inside più tardi — which rides as a two-token surface so that the bare più stays free for M9's comparative, exactly as L1-M8 protected min in en-ar. c'è, non and sono stay their L1 rows; la is never authored as a clitic in this course.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M8': {
      id: 'L2-M8',
      title: 'When something goes wrong',
      job: 'Problems, asking for help, complaining calmly',
      patterns: [
        'Non funziona + il/la + N',
        'Ho perso + il/la + N',
        'Mi fa male + il/la + N',
        'Può aiutarmi + , + per favore?',
        "C'è un problema con + il/la + N",
      ],
      notes: [
        "Mi fa male la testa is the module's structural lesson and it is the same shape as mi piace (L1-M1): the body part is the SUBJECT and mi only names who feels it, so it is mi fanno male i piedi in the plural. Italian, Spanish and Russian all put the person in an oblique case for this, and a learner who has been saying mi piace for two levels already owns the pattern — say that, and the rule costs nothing. The article where English wants a possessive is part of the frame: la testa, never *mia testa.",
        "aiutarmi is one word to the index and that is the genuinely Italian thing here: a clitic ATTACHES to an infinitive, so aiutarmi, lasciarlo and dirmi are fresh single keys, not aiutare plus mi. Author aiutarmi on its own row with a note saying where the mi went, because a learner who has just met the clitic in M5 will look for it in front of the verb and not find it. Può aiutarmi? is the module's core request and it is M1's frame with M5's clitic glued on.",
        "The past here is L1-M5's passato prossimo, which is all a problem needs: Ho perso il biglietto, Ho dimenticato il telefono, Il treno è partito (essere, because it is movement — M10 states the auxiliary law; here it is used and pointed forward). No perfect beyond that, no imperfetto yet, and no congiuntivo, which is what Purtroppo credo che… would drag in — so belief is stated plainly with Penso di (L1-M9's phrase) and the que-clause is left to L3.",
        "Complaining calmly is a register lesson and Italian's answer is not English's: the softening comes from the frame — Scusi, c'è un problema… — and from Purtroppo, not from hedging the claim itself. A learner who translates \"there seems to be a small problem with the room\" produces something evasive rather than polite. Say what the language actually does and let the mistake block show the over-hedged version.",
        "INDEX SEAM: funziona, perso, dimenticato, rotto, male, testa, piedi, aiutarmi, aiutare, aiuto, problema, purtroppo, chiave and telefono are fresh keys. problema is masculine despite the -a, which is the promise L1-M1's gender note made and this module keeps — author it with its article every time. fa stays L1-M6's row, doing fa male here; mi stays M5's clitic row; ho, è and the participles stay L1-M5's rows; scusi and può stay M1's; per favore stays L1-M8's.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M9': {
      id: 'L2-M9',
      title: 'Comparing and choosing',
      job: 'More, less, better — stating a preference',
      patterns: [
        'A + è + più + Adj + di + B',
        'A + è + più + Adj + che + Adj',
        'il/la più + Adj',
        'A + è + migliore / peggiore + di + B',
        'Preferisco + questo / quello',
      ],
      notes: [
        'THE distinction of the module, and Italian forces a choice English does not have: più … DI compares two things on one quality (Roma è più grande di Milano), and più … CHE compares two qualities, two verbs or two prepositional phrases about the same thing (È più bello che utile · Mangio più a casa che al ristorante). The working rule: di before a noun or a pronoun, che before anything else. Spend a mistake block on it, because English\'s single "than" gives no signal at all.',
        'che is L1-M5\'s key ("what, that"), so this module points back rather than opening a row, and its note must be true of the comparative job as well — the same discipline en-es applies to que. di is L1-M1\'s key. Between them, the comparative costs this module no new function words at all, which is worth saying: the work is the choice, not the vocabulary.',
        'migliore against meglio is Italian keeping apart what English merges: migliore is the adjective (È il ristorante migliore) and meglio is the adverb (Si mangia meglio qui) — where English says "better" for both and Spanish uses mejor for both. Same for peggiore / peggio. That is a delta running the opposite way from every other comparison in this level, and it deserves the module\'s second mistake block.',
        "preferire brings the -isc- verbs, which are a third of Italy's third conjugation and are due: preferisco, preferisci, preferisce — an infix appearing in the singular and the third plural and absent from noi and voi. Author it as a shape rather than as an irregularity, and pair it with capire and finire in a rule so the class is visible. Choosing also needs the demonstratives: questo / questa / questi / queste for what is here, quello for what is there, and quello apocopates before a noun like bello (quel libro, quell'uomo, quei libri) — M3's rule, paid a second time.",
        "INDEX SEAM: più, meno, migliore, meglio, peggiore, peggio, preferisco, preferisci, preferisce, questo, questa, questi, queste, quello, quel, quell', quei and quale are fresh keys. più tardi (M7) rides as a two-token surface, which is what left the bare più to this module. che stays L1-M5's row and di stays L1-M1's; molto stays L1-M1's and is not a synonym for più, which its note should say. quale is a sibling of L1-M5's che cosa and of cosa — cross-reference all three, merge none.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M10': {
      id: 'L2-M10',
      title: 'Telling what happened',
      job: 'A four-sentence account in the past',
      patterns: [
        '<imperfetto background> + , + <passato prossimo event>',
        '<passato prossimo> + e + <passato prossimo>',
        "C'era + <N> + , + poi + <passato prossimo>",
        'Alla fine + <passato prossimo>',
      ],
      notes: [
        "Each item is an ACCOUNT of exactly four short sentences, not one long one, and the per-sentence bound applies to each sentence inside it. Nearly every word comes from L1 and from M1–M9; the honest new spend is the imperfetto itself — ero, avevo, c'era, faceva, pioveva, era — and the sequencers prima, dopo and alla fine beside L1-M10's poi and allora.",
        "THE decision of the module: L1-M5 shipped the passato prossimo with BOTH auxiliaries and with participle agreement, and never taught the choice against the imperfetto, which opens here. The law, and it must be the true one — the imperfetto paints the standing situation the story happens against (what was already going on, what things were like, the weather, a habit, an age) and the passato prossimo moves the account forward one completed step at a time. Era tardi e non c'era nessuno. Allora ho chiamato Anna.",
        'The slogan to kill is the one en-es\'s and en-ru\'s M10s kill in their own languages, and the three courses should say it in the same words: "one tense is for completed actions and the other for ongoing ones". It breaks on the first real account. Ieri ho mangiato alle otto is completed; Mangiavo quando hai chiamato is not "ongoing" in any objective sense — it is background for the call; Da bambino andavo sempre al mare is a habit, not a duration. What decides it is the ROLE the clause plays in the telling. Author the pairs so the same event appears in both roles.',
        'The auxiliary law gets stated at last, because an account cannot avoid it: essere for movement and change of state (è andato, sono partiti, siamo tornati — L1-M5 and L1-M10 shipped the forms) and for reflexives, with the participle agreeing with the SUBJECT in gender and number; avere for everything else, with no agreement at all. L1 taught the agreement by example (sono andata, siamo andati); this is where the rule behind it is written down.',
        "Nothing new is opened. The passato remoto, the trapassato, the congiuntivo and reported speech all stay OUT and are named here as L3's. INDEX SEAM: ero, era, eri, avevo, aveva, c'era, faceva, pioveva, prima, dopo, alla fine, nessuno and the imperfetto cells an account needs are fresh keys, each pointing back at its verb's L1 row rather than editing it. poi, allora, e, ma and anche stay L1-M10's; ieri and stamattina stay L1-M5's; perché and quindi stay L1-M9's.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
  },
  'en-fr': {
    'L1-M1': {
      id: 'L1-M1',
      title: 'Who I am',
      job: 'Introduce yourself and state what you like',
      patterns: [
        "Je m'appelle + name",
        'Je suis de + place',
        'Je suis + N (profession, bare)',
        'Je suis + Adj',
        "J'aime + le/la/les + N",
      ],
      notes: [
        'LANGUAGE OF THE FIELDS, settled once for the course: the document speaks the course\'s L1, so every teaching field — rules[].text, word note, trap, sound, variations[].changed, mistake.why, usage, mnemonic and cue — is ENGLISH, and French appears only in the L2 slots: sentence / word / variation / mistake / pool display, and word forms. An English field may quote the French it explains; quoting is not switching. glossEn is FORBIDDEN on this course (#405): the cue is the English reading and literal the word-for-word one, and checkGlossEn fails the build on a third. Anything a gloss would have added goes in the word note. literal is the tool wherever the French construction is not word for word — je m\'appelle is "I call-myself", il y a is "it there has".',
        "REGISTER, settled course-wide here and inherited by all ten modules: this course speaks vous. Every second-person line in L1 is the vous form — vous êtes, vous voulez, vous allez, s'il vous plaît — because the learner's first French is spoken to a stranger, a shopkeeper or an official, where vous is never wrong and tu can be. tu, es, veux and s'il te plaît are never WRITTEN in L1: no display, no forms entry, so the index never carries a shape the course does not teach. M2 names tu and salut in prose as what the learner will hear and what a later level owes them; naming is not writing. Every sentence chips register neutral — the schema has no formal value — and politeness above neutral is carried by words (s'il vous plaît, M8) and by the usage line. je voudrais, the conditional, stays out of L1 for the same reason: a whole tense spent on politeness s'il vous plaît already buys.",
        'je m\'appelle is a chunk before it is grammar: s\'appeler is reflexive — literally "I call myself" — and it is how a name is given, where Mon nom est … is grammatical and nobody says it. Teach it as ONE two-token surface, which is also what keeps the bare je free for je suis; its forms may hold another PERSON of the same verb (vous vous appelez), never the bare appelle.',
        "être is irregular and carries the module: je suis · vous êtes · il/elle est. ONE row, forms suis · êtes · est — and because first occurrence wins, that row's note is what every later learner is shown, so it must be true of identity (je suis étudiant), of origin (je suis de Delhi), of M7's location (Où est le livre ?) and of M5's auxiliary (je suis allé). Say the law rather than a comparison: French has ONE verb \"to be\", and it does classifying and locating alike. After être a profession stands bare — Je suis étudiant, never *Je suis un étudiant — and un comes back only when something describes the noun.",
        'First contact with gender: every noun has one and its article shows it — le café (m) · la maison (f), un livre (m) · une maison (f). Teach each noun WITH its article and leave the agreement drill to M3. Offer no letter-shaped shortcut: French has no reliable one, and le problème, le musée and la main each break the obvious guess.',
        'The slogan this module attracts is "un = a, le = the", and it is false in the very sentence the module exists to teach: a whole class of thing takes the DEFINITE article in French where English drops it — J\'aime le café is "I like coffee", not "I like the coffee", and *J\'aime café is THE interference here. The law: after aimer, and before any generic, French writes le / la / les.',
        "INDEX SEAM, decided here. je elides to j' before a vowel, and src/engine/surface.ts keeps an inner apostrophe inside its token, so j'aime is ONE surface and a different one from aime: it gets its own word row whose note names both halves, and it never lists the bare aime in forms, or M10's elle aime opens a note that says \"I like\". Straight ' only, never a curly one. This module also opens de, which becomes the busiest key in the course — no later module can reach it — so its note is written true of every seat de takes in L1: origin (je suis de Delhi), the de of a quantity (un kilo de riz, M8), the de inside M7's à côté de, and the bare de that replaces du / de la / un / une after ne … pas (je ne veux pas de café, M3).",
      ],
      maxWordsPerSentence: 5,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M2': {
      id: 'L1-M2',
      title: 'First exchange',
      job: 'Greetings, wellbeing, yes/no questions',
      patterns: [
        'Bonjour + , + name',
        'Ça va ?',
        'Comment ça va ?',
        'Ça va + bien/très bien + , merci',
        'Vous êtes de + place + ?',
        'Oui/Non + , + <statement>',
      ],
      notes: [
        "Greetings are where the register decision becomes visible, so tie them to it: bonjour is this course's greeting, good from morning until evening and safe with anyone. salut is the informal one and belongs with tu — name it in the notes as what the learner will hear from a friend, and never write it in a display. The same split governs the closing: au revoir, not the à plus a friend would say.",
        "Wellbeing runs on ça va, which has no second person in it at all and so costs the register nothing: Ça va ? on its own is the question, Comment ça va ? the fuller one, and Ça va bien, merci the answer. Take ça va as ONE two-token surface — the idiom is not decomposable for a beginner, and taking it whole leaves ça free for M8's Ça coûte combien ?",
        'QUESTION POLICY, ratified here for the whole level: L1 asks with the statement said as a question, written with a space before the mark the way French writes it — Vous êtes de Paris ? — and with a question word in front where there is one (Comment ça va ?, and M7\'s Où est le livre ?). Inversion (Êtes-vous de Paris ?) and est-ce que both stay OUT of L1. The slogan waiting here is "French questions need est-ce que", and writing to it would spend the module on the form a speaker uses least across a counter; est-ce que also carries a hyphen, and surfaceIndexKeys would hand it the bare est and ce keys. The law: the everyday question IS the statement, with a rising voice and a question mark.',
        'There is no French word standing in for English\'s do. English builds both its question and its negative out of it, and French builds neither: the question is the statement with a mark (Vous voulez du café ?) and the negative wraps the verb in ne … pas (M3). Nothing is inserted and nothing is fronted — so a learner hunting for the French "do" is hunting for a word that does not exist.',
        'An adjective agrees with the SUBJECT — whoever or whatever the sentence is about, not whoever is speaking: Je suis fatigué (a man about himself) · Je suis fatiguée (a woman) · Vous êtes fatiguée ? (asked of a woman). The -e is written and silent, so fatigué and fatiguée are one sound: the ear cannot check what the eye must. Write SUBJECT, not speaker — that exact wording had to be corrected three times in docs/08-marathi-third-review.md.',
        "INDEX SEAM: est is already M1's, inside the être row whose forms are suis · êtes · est, so nothing here re-teaches it and nothing here may contradict it. c'est is DEFERRED to M8, the first module with a job for it — an early row would spend a fusion neither greeting needs. oui, non and merci are bare one-token rows with no rivals anywhere in the course. Accents are letters: Ça carries its cedilla on the capital too, and a *Ca va would open a second, unreachable entry.",
      ],
      maxWordsPerSentence: 5,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M3': {
      id: 'L1-M3',
      title: 'Needs and wants',
      job: "Say what you want and don't want",
      patterns: [
        'Je veux + un/une + N',
        'Je veux + du/de la/des + N',
        'Je veux + V-inf',
        'Je ne veux pas + de + N',
        'Vous voulez + du/de la + N + ?',
      ],
      notes: [
        'vouloir is the module\'s verb: je veux · vous voulez. Wanting to DO something is je veux plus a BARE infinitive — Je veux manger, with no word for "to" anywhere in it. English\'s "want to eat" pushes in a preposition French does not have there: *Je veux à manger and *Je veux de manger are both wrong, and one of them is worth the mistake block.',
        "Negation is TWO words WRAPPING the verb, not one word in front of it: ne before it and pas after it — Je ne veux pas. Both halves are written, however often speech drops the ne, and a display always writes both. And the negation changes the article behind it: du, de la, des, un and une all collapse to a bare de after ne … pas — Je veux du café becomes Je ne veux pas de café, never *Je ne veux pas du café. That bare de lands on M1's de key, which was written true of this seat; this module's rule text carries the collapse, because no row here can reach the key.",
        'For an unmeasured amount French writes a partitive where English writes nothing at all: du pain, de la soupe, des pommes. du is de + le and des is de + les, so these are contractions before they are anything else — write them as their own rows here, since every later module inherits them. du\'s note says BOTH of its jobs, "some" before an uncountable noun and "of the" before a place or a possessor, which is what keeps it true of M7\'s à côté du lit. des is the plural of un/une as well as of du/de la, and its note names the de + les reading too, so M7 need not open a rival row.',
        'The slogan is "add -s for the plural", and the half it hides is the half that matters: the -s is WRITTEN and SILENT. le livre and les livres differ in speech by the ARTICLE alone — le against les — and by nothing on the noun. The law: French marks a plural on the article for the ear and on the noun for the eye, so a learner who is only listening must listen to the little word.',
        "INDEX SEAM: ne and pas are two rows here, and pas is the negator's key for the whole course. Prefer a consonant-initial verb in a negated display so ne stays bare — Je ne veux pas, Je ne mange pas — because ne elides to n' before a vowel and a negated vowel-initial verb costs a whole new fused row (n'ai, M9). Register: the question form of this module is Vous voulez … ?, and je voudrais — the conditional — stays out of L1, its politeness bought again in M8 by s'il vous plaît at no tense at all.",
      ],
      maxWordsPerSentence: 6,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M4': {
      id: 'L1-M4',
      title: 'My day',
      job: 'Daily habits and time words',
      patterns: [
        'Je + V-e + tous les jours',
        'Je me lève à + num + heures',
        'Le matin + je + V-e',
        'Le lundi + je + V-e',
        'Vous vous levez à quelle heure ?',
      ],
      notes: [
        'The delta to celebrate: French has ONE present and it covers both of English\'s. Je mange is "I eat" AND "I am eating" — the same three words, and which one it is comes from the sentence around it. The interference is a learner assembling the English shape out of French parts: *Je suis manger is not a near miss, it is two verbs with nothing joining them. The slogan behind it — "French has no continuous, so drop the -ing" — is memorable and backwards. The law: le présent covers both English presents; there is nothing to drop, because there was never a second form to build.',
        'Daily verbs are reflexive and the little pronoun is part of the verb, changing with the person: je me lève · vous vous levez. English "I get up" has nothing standing where me stands, so the dropped me is the commonest slip in the module and belongs in a mistake block. Mind the accent while you are there: je me lève carries a grave on the è and vous vous levez does not — a spelling rule of the verb, and the index keeps the two shapes apart on it.',
        'Time goes in FRONT of the clause or at its end, and the definite article is what turns a day into a habit: le matin is "in the morning" (every morning) and le lundi is "on Mondays", while lundi on its own is one particular Monday. Teach le matin and le lundi as whole two-token surfaces — that leaves matin and the weekday free, and it attaches the idiom\'s note to the idiom. The clock is à + number + heures, and heures is written plural from two upwards: à sept heures, but à une heure.',
        'The spine is the -er present across the persons this course writes: je mange · vous mangez · il/elle mange. Three of those endings are SILENT — mange, manges and mangent are one sound — so the subject pronoun is what carries the person to the ear. That is why French cannot drop its pronouns, and it is the law M10 comes back to.',
        "INDEX SEAM, decided here: this module teaches the surface à first, so its row answers every later tap — M7's place seat (à la maison, à côté de …) inherits it, and M7's own row would be unreachable, so write M4's note true of both. Bare a (\"has\") never appears in L1 at all: the course writes j'ai as one fused token (M5) and il y a as one three-token surface (M7), so nothing competes for the unaccented key — and the accent is the whole difference between the two words, on a capital as much as anywhere.",
      ],
      maxWordsPerSentence: 6,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M5': {
      id: 'L1-M5',
      title: 'Yesterday',
      job: 'Past tense — the first big divergence',
      patterns: [
        "Hier + j'ai + V-participle + N",
        'Hier + je suis allé(e) + à/au + place',
        "Je n'ai pas + V-participle",
        'Je ne suis pas allé(e) + à/au + place',
        'Vous avez + V-participle + ?',
      ],
      notes: [
        "One French past does the work of English's simple past, and it is the passé composé: TWO words, an auxiliary carrying the person and a past participle carrying the verb — J'ai mangé du pain. The slogan waiting here is \"passé composé = the perfect, so j'ai mangé is 'I have eaten'\", and writing to it would mistranslate every sentence in the module. The law: the passé composé is French's ORDINARY past — J'ai mangé is \"I ate\", and English's \"I have eaten\" is only sometimes the same thing.",
        "Most verbs take avoir, and a short closed set of movement-and-change verbs takes être — aller, venir, partir, arriver, rester. Keep the set to the two or three the sentences actually need; the full list is not an L1 job. With être the participle AGREES with the subject, written and silent: je suis allé (a man) · je suis allée (a woman). With avoir it does not: j'ai mangé, whoever is speaking.",
        "The negation still wraps the AUXILIARY, never the participle: Je ne suis pas allé and Je n'ai pas mangé, never *Je ne suis allé pas. And there is no did anywhere — English builds its past question and its past negative out of do, and French has nothing standing there. *Je n'ai pas allé is wrong on the auxiliary (aller takes être, so it is Je ne suis pas allé); *Je ne suis allé pas is wrong on the placement. Show one of them, and say which rule it breaks.",
        "The imparfait is DEFERRED, deliberately, and the notes must say so. English has one simple past and French has two, but this level does not import the contrast: every one of the ten jobs here is a bounded event anchored by hier, and the imparfait's work — a past habit, a background state — has no sentence in this module that needs it. Naming it as deferred is what stops a later author importing it a level early.",
        'INDEX SEAM: the accent IS the tense. mange (M4, "I eat") and mangé ("eaten") differ by nothing else, and normalizeSurface keeps accents, so they are two entries — write the acute on every -er participle, every time. Each participle is its OWN word row here, never a forms entry on M4\'s present row: a tap on mangé must open "the past participle of manger", not "I eat". j\'ai is one fused token and gets its own row, opened here as the auxiliary and inherited by M9\'s j\'ai faim — so its note is written true of both, "I have" and "the auxiliary of the past". je suis re-uses M1\'s être row rather than opening a second one the index could never reach, and this module\'s rule text carries the auxiliary job.',
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M6': {
      id: 'L1-M6',
      title: 'Tomorrow',
      job: 'Future and plans',
      patterns: [
        'Demain + je vais + V-inf',
        'Je vais + V-inf + <time>',
        'Vous allez + V-inf + ?',
        'Je ne vais pas + V-inf',
        'Demain + je + V-e',
      ],
      notes: [
        'The everyday future is aller + a BARE infinitive — Je vais manger. English\'s "going to" is the same idea with a to inside it, and that to is exactly what French does not write: *Je vais à manger is the interference, and this is the one frame where the English cognate helps right up to the last word.',
        "aller is irregular and worth its share of the word cap on its own: je vais · vous allez · il/elle va. ONE vais row, and its note is true of both its seats — the plan marker here, and plain movement in M7's Je vais au marché — because first occurrence wins and M7's own row would be unreachable through the index.",
        'The futur simple (je mangerai) is DEFERRED. The slogan is "will = the future tense", and writing to it would spend the module on the form French speakers reach for least when they are making a plan. The law: a plan is aller + infinitive — and the plain present is a perfectly normal future once a time word says so, which is why Demain je travaille is what a speaker actually says. Both of those belong here; the -rai form does not.',
        'INDEX SEAM: demain is a bare one-token surface with no rival, because M4 deliberately took le matin whole and left every other time word free. The negation of a plan wraps the AUXILIARY verb, as in M5: Je ne vais pas manger, never *Je vais ne pas manger — and vais is consonant-initial, so ne stays bare and no new fused row is needed.',
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M7': {
      id: 'L1-M7',
      title: 'Where things are',
      job: 'Locations and prepositions',
      patterns: [
        'N + est + dans/sur/sous + le/la + N',
        'Il y a + un/une + N + sur + la + N',
        'Où est + le/la + N + ?',
        'N + est + à côté de/près de + le/la + N',
        'Je vais + au/à la + N',
      ],
      notes: [
        'il y a is the module\'s idiom and it NEVER changes: Il y a un livre sur la table and Il y a deux livres sur la table are the same three words. English splits "there is" from "there are" and French does not — a delta to celebrate, and the slogan it replaces is exactly "there is / there are, so French must have two as well", which produces *Il y ont. The law: one invariable phrase covers both numbers, and what changes is the article on the noun behind it. Take il y a as ONE three-token surface: that is also what leaves il and elle free for M10\'s thing-pronouns.',
        'Prepositions stand in FRONT of the noun, as in English, and the split to get right is simple against compound. The simple ones take nothing after them: dans la boîte, sur la table, sous la table. The compound ones END in de and the de is not optional: à côté de la table, près de la maison. English\'s "next to the table" has no "of", so the missing de is the trap — and it is a trap only on the compound set, so say which set the rule is about.',
        "Where a thing IS takes être — the same verb M1 taught, and there is no second copula anywhere in French: Le livre est sur la table. The question is the question word in front and nothing moved: Où est le livre ? Inversion (Où est-il ?) stays out of L1 per M2's question policy. il y a asserts that something EXISTS; est says where a known thing is — choosing between them is this module's comprehension work.",
        "Two contractions are obligatory and are surfaces in their own right: à + le = au and de + le = du — je vais au marché, à côté du lit, never *à le or *de le. au is opened here; du is M3's partitive row, whose note already says both of its jobs, so a learner tapping du inside à côté du lit is told the truth. Keep aux and des out of the place phrases: des is M3's plural row and a second reading here would fight it.",
        'INDEX SEAM: où carries its accent always — ou ("or") is a different word and the accent is the whole difference, and ou has no job in L1, so nothing competes. à is M4\'s key and its note was written true of this seat. à côté de is a three-token surface, and its forms MUST list the contracted shapes the module writes — à côté de · à côté du · à côté de la — because a contraction is a different string and the phrase will not match through it, which would strand côté with no row at all.',
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M8': {
      id: 'L1-M8',
      title: 'Numbers & shopping',
      job: 'Prices, quantities, buying',
      patterns: [
        "C'est combien ?",
        'Ça coûte combien ?',
        'Combien de + N + ?',
        "num + N + , s'il vous plaît",
        'Un kilo de + N',
      ],
      notes: [
        "The price question has two everyday shapes and both put the question word at the END, which is where spoken French puts it: C'est combien ? and Ça coûte combien ? Neither inverts, per M2's policy. c'est is opened HERE, as its own fused row — the first module with a job for it — and its note names both halves: c' is ce (\"this, that\") elided before est.",
        'The slogan is "much for uncountables, many for countables, so French must split too", and it is false: ONE combien de covers both — Combien de pommes ? and Combien de pain ? The law: combien de plus a noun, whatever the noun counts, and no article between them — never *combien des pommes. Teach combien de as a two-token surface beside the bare combien of C\'est combien ?, so each note answers for its own job.',
        'Numbers are vocabulary the sentences actually use — un … dix, plus vingt and cent if a price needs them — not a counting drill, and no display may write a number the module has not taught. un is both "one" and the masculine article, and une the feminine: Je veux un café is "a coffee" and "one coffee" at once. French does not distinguish them, so the note must not pretend to.',
        "A quantity takes de and nothing after it: un kilo de riz, une bouteille d'eau — no article, and M3's du would be wrong here. d'eau is one fused token: if the module writes it, it gets its own row, whose note names both halves.",
        "s'il vous plaît is ONE three-token surface and it is the vous shape the course's register decision requires — s'il te plaît is tu's and is never written here. Taking it whole leaves M2's vous row untouched. Its note may say what the phrase is made of (\"if it pleases you\") without the module teaching si or plaire. Prices are in euros, and euro takes a written, silent plural -s: dix euros.",
        "INDEX SEAM: c'est is this module's row and ça is its other one — ça va was taken whole in M2 precisely so that ça would still be free here for Ça coûte combien ? Register: the course writes je veux with s'il vous plaît at the edge of the request, and the usage line says when je veux alone would sound blunt; je voudrais, the conditional, stays out of L1. Revised 2026-09-05 (docs/43): a counter request is the bare noun and the phrase — Trois pommes, s'il vous plaît, Un café, s'il vous plaît — and je veux is kept only as a statement of wanting, never framed as ordering.",
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M9': {
      id: 'L1-M9',
      title: 'Feelings & opinions',
      job: 'Why — because and so',
      patterns: [
        '<statement> + parce que + <statement>',
        '<statement> + , donc + <statement>',
        'Pourquoi + <question> + ?',
        "J'ai + faim/froid/soif",
        'Je pense que + <statement>',
      ],
      notes: [
        "The pair that carries the module: parce que introduces the REASON and donc introduces the CONSEQUENCE — the same two facts in opposite order. Je veux du thé parce que j'ai froid · J'ai froid, donc je veux du thé. Build the sentences in pairs and make the comprehension pool test the choice.",
        'Three spellings, three words, and the module lives or dies on writing them exactly: pourquoi (why — ONE word), parce que (because — TWO words), donc (so). The hazard here is orthographic rather than grammatical: a *parceque would open a second, unreachable entry for the rest of the course. pour on its own has no job in L1 and stays out, so nothing competes with the inside of pourquoi.',
        'The avoir states: French says you HAVE hunger, cold, thirst and years where English says you ARE — j\'ai faim, j\'ai froid, j\'ai soif, j\'ai vingt ans. The slogan is "être translates every \'I am\'", and *Je suis faim is the classic sentence it produces, which does not mean "I am hungry" but "I am hunger" — faim is a noun. The law: a bodily state is avoir + a BARE noun, with no article at all.',
        'je pense que … , and que is NEVER optional. English drops "that" freely — "I think it\'s good" — and French cannot: Je pense que c\'est bien, never *Je pense c\'est bien. It is a small word carrying a whole clause, and dropping it is the commonest anglophone slip in this frame.',
        "INDEX SEAM: parce que is a two-token surface and claims nothing inside itself, so que stays free for je pense que — two rows, each note written for its own job. j'ai is M5's row, opened there as the past auxiliary and inherited here: its note was written true of \"I have\" as well, so a learner tapping j'ai in j'ai faim is told the truth. Negating an avoir state costs the fused n'ai row — Je n'ai pas faim — so open it here with a note naming both halves if the module writes it.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M10': {
      id: 'L1-M10',
      title: 'Connected talk',
      job: 'Short 2–3 sentence exchanges',
      patterns: [
        '<M1–M9 pattern> + <M1–M9 pattern>',
        '<question> → <answer + parce que + reason>',
        '<statement> + et/mais + <statement>',
        '<statement> + , et puis / . Alors + <statement>',
      ],
      notes: [
        'Each item is a TURN of 2–3 short sentences, not one long one — a question and its answer, or a statement, a reason and a follow-up. The per-sentence bound applies to each sentence inside the turn.',
        "Recombination is the lesson: nearly everything comes from M1–M9. The honest new spend is the joiners that hold a turn together — et, mais, aussi, puis, alors — and little else. ou is NOT among them: it would sit one accent away from M7's où, and no turn here needs it. aussi goes AFTER what it adds to (Je veux du thé aussi); at the head of a sentence it means something else and reads as formal, so keep it out of first position. Revised 2026-09-05 (docs/43): the sequencer is written et puis, never a sentence-initial Puis, and going home is rentrer — je rentre, opened here — because je vais à la maison is not what a French speaker says.",
        "A delta, and the last one: French subject pronouns are NEVER dropped, exactly as English's are not. The reason is the one M4 gave — je mange, il mange and ils mangent are one sound, so the ending cannot carry the person and the pronoun must. Write the pronoun in every clause of every turn, including the second and third sentences where the person is already obvious.",
        'il and elle are the GENDER OF THE NOUN, not the sex of a person: le café … il, la maison … elle. The slogan is "il = he, elle = she", and it is why an anglophone, having no French twin for "it", defaults to il for everything. The law: il and elle name the GRAMMATICAL GENDER of the noun they stand for, so a house is elle and a coffee is il — La maison est grande. Elle est belle. — never *Il est belle, which the feminine adjective beside it makes visible. This module is where a two-sentence turn forces the choice for the first time, so tag it interference and spend a mistake plate on it. INDEX SEAM: both il and elle are still free here, because M7 took il y a whole as a three-token surface and claimed no part of it.',
        "Language of the fields holds to the last turn: ENGLISH in every teaching field — rules[].text, note, trap, sound, changed, why, usage, mnemonic, cue — French only in display and forms, glossEn on every sentence, and literal wherever a turn's order moves. The register holds too: vous to the end, tu never written.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M1': {
      id: 'L2-M1',
      title: 'Asking politely',
      job: 'Requests, thanks, apologies in the right register',
      patterns: [
        'Est-ce que vous pouvez + V-inf + ?',
        'Est-ce que tu peux + V-inf + ?',
        "Je voudrais + un/une + N + , + s'il vous plaît",
        'Excusez-moi + , + <request>',
        'Merci beaucoup — De rien',
      ],
      notes: [
        "REGISTER, decided for the whole level and repeated here because a prompt only ever shows an author the notes (full record: docs/58-en-fr-L2-brief-decisions.md; the L1 decisions carry unchanged — elision keeps the apostrophe inside a token, accents are letters and capitals keep them, every homograph has a named owner). L1's decision 1 was explicit: every second-person line was vous, tu stayed out of display and out of every forms list, and M2's notes named it in prose as what a later level owed. This is that level. The paradigm opens here — tu es, tu as, tu veux, tu peux, tu vas, tu fais, s'il te plaît — and the law is L1's: vous is never wrong with a stranger, a shopkeeper, an official or a new colleague; tu is for friends, family, children and people who have offered it. tu frames chip `informal`, vous plus the elaborated request chips `formal`, a line safe with either stays `neutral`.",
        'The fact English has nothing like, and it belongs in usage rather than in a rule: French has VERBS for this — tutoyer and vouvoyer — and the switch is asked for out loud (On peut se tutoyer?), the way Russian asks Davay na ty. A learner who knows only that tu is "informal" switches too early. Note also the shape that makes tu easy: for most verbs the tu form is the je form plus -s, and for vouloir and pouvoir it is spelled identically (je veux / tu veux, je peux / tu peux) — a rest point hiding inside a new paradigm.',
        "je voudrais enters here and ONLY as a frozen cell. L1 kept it out by name — it is the conditional of vouloir, a whole tense spent on politeness the course already buys with s'il vous plaît — and M5's ordering job needs it. So it arrives as one word, with a note saying which tense it belongs to and that the tense is L3-M4's. pourriez and j'aimerais are named in the same note and never written. This is the same discipline en-it applies to vorrei and en-ar to laysa: ship the word, defer the system, say so.",
        'Questions get their everyday marker: est-ce que in front of a statement turns it into a question and changes nothing else — Est-ce que vous avez du pain? — which is exactly the tool an English speaker needs, since English fronts do/are and French otherwise moves nothing. Inversion (Pouvez-vous…?) appears in this level ONLY inside the frozen request frames, and the inversion system is named as deferred. L1 asked with intonation and with fronted question words; both continue.',
        "INDEX SEAM: tu, es, as, veux (the tu cell — same spelling as L1-M3's je cell, so the row lists both and the note says they are identical), peux, pouvez, vas, fais, voudrais, est-ce que, excusez-moi, excuse-moi, pardon, désolé, désolée, beaucoup, de rien and s'il te plaît are fresh keys. est-ce que splits on its hyphen into qu'est and ce as well as indexing whole — three keys pointing at one row, the en-ar hyphen law in French — so author it once and let the parts inherit. s'il vous plaît stays L1-M8's whole surface, merci stays L1-M2's, and the bare s'il in s'il te plaît is a new key of its own.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M2': {
      id: 'L2-M2',
      title: 'Describing people',
      job: 'Appearance, character, relationships',
      patterns: [
        'Il/Elle est + Adj',
        'Il/Elle a + les + N + Adj',
        'Elle a + <number> + ans',
        'mon/ma/mes + N-family',
        'son/sa/ses + N',
      ],
      notes: [
        "Age takes AVOIR, not être: elle a trente ans, not *elle est trente. L1-M9 already shipped an and ans, so the noun is the learner's and only the verb choice is new — and it is the single most reliable English error in French. Features take avoir too (il a les cheveux bruns, elle a les yeux verts), with the definite article where English wants a possessive: les cheveux, never *ses cheveux, in this frame.",
        'THE delta of the module: a French possessive agrees with the THING POSSESSED, not with the owner. sa voiture is his car AND her car; son frère is her brother AND his. English marks the owner and French marks the noun, so a learner reaching for a masculine word to mean "his" gets it exactly backwards. Spend the mistakes here, and author pairs where the owner\'s gender changes and the possessive does not.',
        'The euphonic quirk that follows immediately: before a vowel the FEMININE possessive borrows the masculine shape — mon amie, ton école, son adresse — because French will not put ma before a vowel. It is not a gender change and a rule that says so will confuse the learner in M3; say that the sound decides the spelling, which is the same instinct behind bel and vieil in the next module.',
        'The family and person set: frère, sœur, père, mère, fils, fille, mari, femme, ami, amie, enfant; and the adjectives grand (L1-M10, doing size here), petit, jeune, vieux, gentil, sympa, intelligent. femme carries two jobs — "woman" and "wife" — on one row, and fille carries "girl" and "daughter": author each note true of both, because no second row can take the key. sœur is written with the œ ligature and the index keeps it, so sœur and soeur would be TWO keys — write the ligature every time.',
        "INDEX SEAM: a (the avoir cell — L1-M5 owns ai and avez, and this third-person cell is fresh), ans-with-a-number, mon, ma, mes, ton, ta, tes, son, sa, ses, frère, sœur, père, mère, fils, fille, mari, femme, ami, amie, enfant, cheveux, yeux, petit, jeune, vieux, gentil, sympa and intelligent are fresh keys. il and elle stay L1-M10's rows; grand and grande stay L1-M10's; est stays L1-M1's. Every adjective row carries the four cells this level shows, and M3 adds nothing to them but the irregular shapes.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M3': {
      id: 'L2-M3',
      title: 'Describing things',
      job: 'Size, colour, quality — agreement at length',
      patterns: [
        'Le/La + N + est + Adj',
        'Les + N-pl + sont + Adj-pl',
        'un/une + N + Adj',
        'un beau + N   /   un bel + N-vowel',
        "C'est + très + Adj",
      ],
      notes: [
        '"At length" is the grid, and French\'s has a silent half an author must still spell: -e for the feminine, -s for the plural, -es for both — grand · grande · grands · grandes, where three of the four sound identical. An adjective already ending in -e adds nothing for gender (rouge, jaune, jeune) and one ending in -s adds nothing for the plural (gris, français). Say plainly that agreement here is almost entirely a WRITING rule, because a learner who cannot hear it will not believe it matters — and the index does, since grand and grande are two keys.',
        'Position, and it is the reverse of English: the adjective normally FOLLOWS the noun (une voiture rouge, un livre intéressant), and a small closed set precedes it — beau, joli, jeune, vieux, bon, mauvais, grand, petit, gros, nouveau. The memorable summary is beauty, age, goodness, size; the true statement is that it is a LIST and not a rule, so teach the list. Two of them change meaning with position (un grand homme is a great man, un homme grand is a tall one), which is worth one line and no more.',
        "The three irregulars with a pre-vowel shape: beau → bel, nouveau → nouvel, vieux → vieil before a masculine noun starting with a vowel — un bel appartement, un nouvel ami, un vieil homme — with the feminine going belle, nouvelle, vieille. It is the same instinct as M2's mon amie: French avoids the vowel clash and changes the spelling to do it. Each shape is its own index key, so all of them are authored here and cross-referenced.",
        "Colours are the vocabulary spend and one of them refuses to bend: rouge, jaune and rose are -e adjectives (number only); bleu, vert, noir, gris take all four cells; blanc goes to blanche; and marron and orange are INVARIABLE, because they are nouns doing an adjective's work — les chaussures marron. très (L1-M10) modifies an adjective and beaucoup modifies a verb: *très j'aime is the error and j'aime beaucoup is the repair, which is the same pair en-es teaches as muy and mucho.",
        "INDEX SEAM: beau, bel, belle, beaux, nouveau, nouvel, nouvelle, vieux, vieille, joli, mauvais, gros, rouge, bleu, bleue, vert, verte, noir, blanc, blanche, jaune, gris, marron, long, court, propre, sale, lourd and léger are fresh keys, each row carrying the cells this level shows. grand, grande, bon and bonne stay L1-M10's rows; très stays L1-M10's; cher and chère stay L1-M8's. beau and bel are different keys, not variants of one spelling — the elision-adjacent seam that L1 met in l'eau and c'est.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M4': {
      id: 'L2-M4',
      title: 'Getting around',
      job: 'Directions, transport, asking the way',
      patterns: [
        'Pardon + , + où est + le/la + N + ?',
        'Tournez à gauche / à droite',
        'Allez tout droit + , + puis + <direction>',
        'Je vais à + <place> / en + <country>',
        'Il faut + V-inf',
      ],
      notes: [
        "This module speaks vous throughout, chipped `formal`, and its imperative is free: the vous imperative is the present tense with the pronoun removed — vous tournez → Tournez, vous allez → Allez, vous prenez → Prenez, vous continuez → Continuez. Every one of those present forms is already L1's or M1's, so the module's grammar costs nothing and the budget goes to the prepositions and the vocabulary. The tu imperative (tourne, va, prends) is named in usage and not shown, because the scene is a stranger in the street.",
        'THE preposition set, and French forks where English says one word. For places: à + a town (à Paris), en + a feminine country (en France, en Inde), au + a masculine country (au Japon), aux + a plural one. For transport: EN for anything you get inside (en bus, en train, en voiture, en avion) and À for anything you sit on or use with your body (à pied, à vélo, à moto). That second rule is genuinely reliable and worth stating as a rule rather than a list. à, au and en are all L1 keys (M4, M7 and — for en — this module opens the bare preposition), so the notes point back where they must.',
        'The trap the module must catch: droite is "right" and tout droit is "straight on", one letter and a whole different direction. Author them in the same sentence at least once, and put the pair in a mistake block; a learner who hears them as the same word will turn where they should not. à gauche and à droite ride as two-token surfaces, which keeps L1-M4\'s à on its own row — the tool en-es uses for a la derecha, in French.',
        "il faut enters as a FROZEN impersonal plus an infinitive: Il faut tourner à gauche, Il faut prendre le bus. It is the most useful obligation frame in the language and it costs one word; il faut QUE plus a subjunctive is L3's and is named here as deferred, so a later author does not import the tense with the word.",
        "INDEX SEAM: tournez, allez (L1-M6's row — point back), prenez, continuez, gauche, à gauche, à droite, droite, droit, tout droit, rue, place, coin, feu, gare, arrêt, bus, train, voiture (L1-M3's row), métro, avion, vélo, pied, à pied, loin, faut and en (the bare preposition) are fresh keys where they are not already owned. il y a, près de, à côté de and their du / de la partners stay L1-M7's surfaces — the four-token ones are the widest in the repo and are re-shown, not re-taught. Town and country names never index (#61), so anchor every direction on a common noun.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M5': {
      id: 'L2-M5',
      title: 'Food and hosting',
      job: 'Ordering, offering, refusing without offence',
      patterns: [
        "Je voudrais + du/de la/des + N + , + s'il vous plaît",
        'Je ne veux pas de + N',
        'Pour moi + , + un/une + N',
        'Encore + du/de la + N + ?',
        "L'addition + , + s'il vous plaît",
      ],
      notes: [
        "THE rule of the module, and L1 set it up perfectly without ever stating it: L1-M3 taught du, de la and des, and L1-M3 taught ne … pas, and the two never met in one sentence. They meet here. **After a negation every partitive collapses to de** — Je ne veux pas DE café, Il n'y a pas DE pain, Je ne mange pas DE viande. It is one of the few French rules with no exception worth a learner's time, and *Je ne veux pas du café is what every English speaker writes who has not been told. One rule, one mistake block, one new key.",
        "Ordering is M1's frozen je voudrais plus L1's partitives, and the register point is worth making: Je veux un café is grammatical and lands as a demand, exactly as Do you want…? does in English. Je voudrais and Pour moi are what people say. The stressed pronoun moi arrives here for that frame and it is the module's other structural item: French has a second set of pronouns for standing alone and for following a preposition — moi, toi — where the subject forms je and tu cannot go.",
        "The clitic system opens narrowly, and the index decides how: me and te are free keys, but le, la and les are L1-M1's ARTICLES, so the identically spelled direct-object pronouns can never be first-taught in this course. Teach the placement law on me and te (Vous pouvez me donner…?) and on the stressed moi / toi, name the direct-object series in prose as L3's, and never write a display sentence that needs one. en and y as pronouns are deferred too, and for a second reason: en is M4's preposition.",
        "Offering and refusing: encore du café? carries the offer — and it is chosen deliberately so that plus stays free for M9's comparative, the same protection en-es gives más by offering otro. A refusal in French is softened by a compliment rather than by a reason (Non merci, c'était très bon · C'est très gentil, mais ça va), and a host offers once or twice rather than insisting; say so in usage, and note that this is a genuinely different shape from the Indian and Russian hosting the other courses describe.",
        "INDEX SEAM: moi, toi, me, te, de (the negated-partitive one — L1-M1 owns de as \"of/from\", so this note points back and the rule is written around that row), encore, addition, viande, poisson, légumes, riz (L1-M8's), dessert, verre, assiette, gentil (M2's) and désirez are fresh keys. du, de la, des and ne … pas stay L1-M3's rows; s'il vous plaît stays L1-M8's; je voudrais stays M1's.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M6': {
      id: 'L2-M6',
      title: 'Making plans together',
      job: 'Invitations, suggestions, settling a time',
      patterns: [
        'On va + à + <place> + ?',
        'Tu es libre + <day> + ?',
        'Ça te dit de + V-inf + ?',
        'On se voit à + <hour>',
        "D'accord + , + à + <day>",
      ],
      notes: [
        "on is the single most useful thing in this level, and it is the reason M6 exists where it does: in everyday French on IS \"we\" — On va au cinéma?, On se voit demain?, Qu'est-ce qu'on fait? — and it takes the third-person singular verb, so every form the learner needs is already theirs from L1's il and elle sentences. nous exists and is written; in speech it is the formal or emphatic one. Teach on as the default and name nous in usage; a course that taught nous allons first would give the learner a sentence they will rarely hear.",
        "Plans are made among friends: tu and on throughout, chipped `informal` where the frame is tu-only, and the vous of M4 and M7 deliberately absent — an invitation in vous reads as a business appointment. The suggestion frames are Ça te dit de…?, On peut…, Tu veux…? and the plain question On y va?, and none of them needs a new tense: L1-M6's aller plus an infinitive already carries the future.",
        "The clock and the calendar: à sept heures is L1-M4's, and this module adds et demie, et quart and the days L1 did not teach (mardi, mercredi, jeudi, vendredi, samedi, dimanche beside L1-M4's le lundi). moins le quart is real and deliberately NOT shown — moins is M9's key and its comparative note must be its first — so a usage line names it and M9 delivers the word. The article makes a day habitual: le lundi (L1-M4, a two-token surface) is Mondays in general and bare lundi is this coming Monday, which is a distinction English makes with a plural.",
        'Agreeing and settling: d\'accord (one key, the apostrophe inside it), ça marche, super, à demain, à lundi. The à of à demain is L1-M4\'s row doing a third job — "see you at" — so point back rather than opening anything; the phrase itself is the useful unit and belongs in usage as the standard sign-off.',
        "INDEX SEAM: on, se, dit, libre, mardi, mercredi, jeudi, vendredi, samedi, dimanche, demie, quart, d'accord, marche, super, cinéma and ensemble are fresh keys. le lundi stays L1-M4's two-token surface and bare lundi is a fresh key of its own — say that in the note, because the learner has met the phrase for two levels without meeting the word. tu and te stay M1's and M5's rows; va, vais and allez stay L1-M6's; heures and à quelle heure stay L1-M4's.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M7': {
      id: 'L2-M7',
      title: 'On the phone',
      job: 'Calls and messages — openings, closings, taking a message',
      patterns: [
        "Allô + ? + C'est + <name> + à l'appareil",
        'Je voudrais parler à + <name>',
        "Il n'est pas là + . + Je peux laisser un message?",
        'Ne quittez pas',
        'Je vous rappelle + <time>',
      ],
      notes: [
        "The opening is fixed and small: Allô? answers the phone and nothing else in French — it is not a greeting at a door — and the identification is C'est Rohan à l'appareil, where L1-M8's c'est does the work and à l'appareil is the phrase that makes it a phone call. This module speaks vous throughout, chipped `formal`, for a reason worth one honest line: you cannot see who picked up.",
        'THE delta of the module is an absence: **French has no continuous tense.** Je parle covers "I speak" and "I am speaking" alike, so a learner who reaches for an -ing equivalent finds none, and être en train de parler is emphatic ("right in the middle of") rather than the default. This is the exact opposite of en-it\'s M7, where a call is what finally motivates stare + gerundio, and it is worth saying so plainly: two neighbouring languages, opposite answers.',
        "Negation around the compound frames the whole call: Il n'est pas là, Je ne peux pas, Ne quittez pas — L1-M3's ne … pas with the elided n' L1-M5 already showed in n'ai. And here is the level's one dialect-shaped line: spoken French drops the ne (Il est pas là, Je sais pas), and this course writes it everywhere, in display, forms and pool alike, because writing both would fork one negation into two surfaces. ONE usage line here names the drop — a phone call is where a learner first hears it — and no other module carries one.",
        "Taking a message needs no new tense: laisser un message, rappeler, le numéro, ne quittez pas, and the past is L1-M5's passé composé (Il a appelé). Reported speech — Il a dit que… — is L3's and is named here as deferred, which is why a message is passed on with the words themselves.",
        "INDEX SEAM: allô, appareil, à l'appareil, parler (L1-M5's parlé is the participle — the infinitive is fresh and its row points at it), quittez, laisser, message, numéro, rappelle, rappeler, là and appelé are fresh keys. à l'appareil carries an elision inside it and is one key; là is a fresh key and is NOT L1's la article — the accent is the whole difference, and the L1 accent rule is what keeps them apart. c'est stays L1-M8's, ne … pas and n' stay L1-M3's and L1-M5's, je voudrais stays M1's, vous stays L1-M1's.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M8': {
      id: 'L2-M8',
      title: 'When something goes wrong',
      job: 'Problems, asking for help, complaining calmly',
      patterns: [
        'Ça ne marche pas',
        "J'ai perdu + mon/ma + N",
        "J'ai mal à la + N",
        "Vous pouvez m'aider + , + s'il vous plaît?",
        'Il y a un problème avec + le/la + N',
      ],
      notes: [
        "avoir mal à is the frame a problem needs and it is built from parts the learner owns: L1-M9's avoir-idioms (j'ai faim, j'ai froid, j'ai soif), M4's à contracting to au and à la, and M2's rule that the article stands where English wants a possessive — J'ai mal à la tête, J'ai mal au dos, never *à ma tête. Say that it is the same avoir the learner has been using for hunger and cold since L1-M9; French treats a state as something you HAVE, and this is the fourth member of a family, not a new idiom.",
        "m'aider is ONE key to the index and that is the French thing here: elision fuses a clitic to what follows, so m'aider, t'aider and l'addition are single surfaces rather than two words each. Author m'aider on its own row with a note saying where the me went, because a learner who met me in front of a verb at M5 will look for it here and not find it. Vous pouvez m'aider? is the module's core request — M1's frame with M5's clitic glued on.",
        "The past here is L1-M5's passé composé and nothing more: J'ai perdu mon billet, J'ai oublié mon téléphone, Le train est parti (être, because it is movement — M10 states the auxiliary law; here it is used and pointed forward). No plus-que-parfait, no subjunctive, and no conditional beyond M1's frozen je voudrais, which is why a complaint here is framed rather than hedged.",
        "Complaining calmly, and French's answer differs from English's: the softening comes from the opening (Excusez-moi, il y a un problème…) and from Malheureusement, not from weakening the claim. Directness about the fault itself is normal and is not rude; an English speaker's \"there seems to be a slight issue\" reads as evasive rather than as polite. Say what the language does, put the over-hedged version in the mistake block, and judge neither.",
        "INDEX SEAM: marche (M6's row — \"it works\" and ça marche are the same word, so point back), perdu, oublié, cassé, mal, tête, dos, m'aider, aider, aide, problème, malheureusement, clé, billet and téléphone are fresh keys. j'ai, ai and avez stay L1-M5's rows; il y a stays L1-M7's; ne … pas stays L1-M3's; excusez-moi stays M1's; au and à la stay L1-M7's and M4's. mal is a fresh key and its note must be true of j'ai mal and of the adverb alike, since no later row can take it.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M9': {
      id: 'L2-M9',
      title: 'Comparing and choosing',
      job: 'More, less, better — stating a preference',
      patterns: [
        'A + est + plus + Adj + que + B',
        'A + est + moins + Adj + que + B',
        'le/la plus + Adj',
        'A + est + meilleur que + B',
        'Je préfère + ce/cette + N',
      ],
      notes: [
        'The comparative is two words around an unchanged adjective — plus grand que, moins cher que, aussi grand que — where English forks between -er and "more". Nothing bends but the adjective\'s own agreement, which M3 already taught. The superlative adds the article to the same frame (le plus grand, la moins chère) and marks the group with de and not "in": le plus grand de la ville. That preposition is the half English speakers miss.',
        'que is L1-M9\'s key, where it means "that" (je pense que…), so the comparative que lands on that row and this module points back rather than opening a second one — the discipline en-es applies to que and en-it to che, in the third Romance course. plus and moins are this module\'s own keys, and plus has a pronunciation fork worth a sound line rather than a rule: silent -s in plus grand, sounded in plus de and in the standalone plus.',
        'meilleur against mieux is French keeping apart what English merges, exactly as Italian keeps migliore from meglio and unlike Spanish\'s single mejor: meilleur is the adjective (C\'est le meilleur restaurant) and mieux is the adverb (On mange mieux ici). *plus bon and *plus bien are the errors the slogan "add plus" produces. Cross-reference the en-it split in the note if it helps an author see the pattern; the three courses do not agree here and pretending they do would teach a false symmetry.',
        "Choosing needs the demonstratives and a question word that agrees: ce / cet / cette / ces (with cet before a vowel, the same euphonic instinct as M2's mon amie and M3's bel) and quel / quelle / quels / quelles, which is an adjective and bends with its noun — Quel livre? Quelle voiture? The standalone forms celui-ci and lequel are named and deferred to L3; a learner can choose with quel and a noun, and does not need two systems in one module. préférer takes a noun or an infinitive.",
        "INDEX SEAM: plus, moins, aussi (L1-M10's row — \"also\" and the aussi … que of equality are the same word, so point back and write the note true of both), meilleur, meilleure, mieux, pire, préfère, préférer, ce, cet, cette, ces, quel, quelle and ville are fresh keys. que stays L1-M9's; très and bon stay L1-M10's; cher stays L1-M8's. beaucoup (M3's) is not a synonym for plus and its note should say so.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M10': {
      id: 'L2-M10',
      title: 'Telling what happened',
      job: 'A four-sentence account in the past',
      patterns: [
        '<imparfait background> + , + <passé composé event>',
        "D'abord + <passé composé> + , + ensuite + <passé composé>",
        'Il y avait + <N> + , + alors + <passé composé>',
        'Enfin + <passé composé>',
      ],
      notes: [
        "Each item is an ACCOUNT of exactly four short sentences, not one long one, and the per-sentence bound applies to each sentence inside it. Nearly every word comes from L1 and from M1–M9; the honest new spend is the imparfait itself — c'était, il y avait, je faisais, il pleuvait, j'étais, j'avais — and the sequencers d'abord, ensuite and enfin beside L1-M10's puis, et puis and alors.",
        "THE decision of the module: L1-M5 shipped the passé composé with BOTH auxiliaries and with participle agreement (je suis allée, elle est restée) and never taught the choice against the imparfait, which opens here. The law, and it must be the true one — the imparfait paints the standing situation the story happens against (what was already going on, what things were like, the weather, a habit, an age) and the passé composé moves the account forward one completed step at a time. Il était tard et il n'y avait personne. Alors j'ai appelé Anne.",
        'The slogan to kill is the one en-es, en-ru and en-it kill in their own M10s, and the four courses should say it in the same words: "one is for completed actions and the other for ongoing ones". It breaks on the first real account. Hier j\'ai mangé à huit heures is completed; Je mangeais quand tu as appelé is not "ongoing" in any objective sense — it is background for the call; Quand j\'étais petit, j\'allais toujours à la mer is a habit and not a duration. What decides it is the ROLE the clause plays in the telling. Author the pairs so the same event appears in both roles.',
        'The auxiliary law gets stated at last, because an account cannot avoid it: être for the movement and change-of-state verbs (aller, venir, partir, rester, rentrer, arriver — L1-M5 and L1-M10 shipped four of them) and for reflexives, with the participle agreeing with the SUBJECT in gender and number; avoir for everything else, with no agreement at all. L1 taught the agreement by example in allée and restée; this is where the rule behind it is written down.',
        "Nothing new is opened. The plus-que-parfait, the subjunctive, the conditional beyond M1's frozen je voudrais, and reported speech all stay OUT and are named here as L3's. INDEX SEAM: c'était, étais, était, avais, avait, il y avait, faisais, pleuvait, d'abord, ensuite, enfin, personne, quand and the imparfait cells an account needs are fresh keys, each pointing back at its verb's L1 row rather than editing it. c'était carries an elision and is one key, distinct from L1-M8's c'est. puis, et puis, alors, aussi and mais stay L1-M10's; hier stays L1-M5's; parce que and donc stay L1-M9's.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
  },

  'en-de': {
    'L1-M1': {
      id: 'L1-M1',
      title: 'Who I am',
      job: 'Introduce yourself and state what you like',
      patterns: [
        'Ich heiße + name',
        'Ich komme aus + place',
        'Ich wohne in + place',
        'Ich bin + N (profession, bare)',
        'Ich mag + N (bare)',
        'Das ist + der/die/das + N',
      ],
      notes: [
        'LANGUAGE OF THE FIELDS, settled once for the course: the document speaks the course\'s L1, so every teaching field — rules[].text, word note, trap, sound, variations[].changed, mistake.why, usage, mnemonic and cue — is ENGLISH, and German appears only in the L2 slots: sentence / word / variation / mistake / pool display, and word forms. An English field may quote the German it explains; quoting is not switching. glossEn is FORBIDDEN on this course (#405): the cue is the English reading and literal the word-for-word one, and checkGlossEn fails the build on a third. Anything a gloss would have added goes in the word note. literal is the tool wherever the German construction is not word for word, and German needs it more often than French does: Ich habe Brot gegessen is "I have bread eaten", Wie geht es Ihnen? is "how goes it to-you", Es gibt einen Stuhl is "it gives a chair". Hyphenate a multi-word English gloss of one German word, as en-es hyphenates call-myself.',
        "REGISTER, settled course-wide here and inherited by all ten modules: this course speaks Sie. Every second-person line in L1 is the Sie form — Sie sind, Sie haben, Sie möchten, Wie geht es Ihnen?, Ihr Name — because the learner's first German is spoken to a shopkeeper, an official or a landlord, where Sie is never wrong and du can be. du and its forms are never WRITTEN in L1: no du bist, no du hast, no dein, no dich, no dir, no -st ending in any forms list, and no ihr (the plural of du) either — so the index never carries a shape the course does not teach. M2 names du and Hallo in prose as what the learner will hear and what a later level owes them; naming is not writing. Sie is NOT a politeness coating on the same verb: it takes the PLURAL verb form (Sie sind, Sie haben), and the possessive Ihr and the dative Ihnen move with it. That is also why it is cheap — the plural of a regular verb is spelled exactly like the infinitive, so essen, kommen and arbeiten each serve twice. Every sentence chips register neutral; the schema has no formal value, and politeness above neutral rides on words (bitte, M8) and on the usage line.",
        'Ich heiße is a chunk before it is grammar: heißen is "to be called", and it is how a name is given, where Mein Name ist … is grammatical and stiff. Teach it as ONE two-token surface, which is also what keeps the bare ich free for Ich bin and Ich komme; its forms may hold another PERSON of the same verb (Sie heißen), never the bare heiße. Note the ß: heiße is spelled with ß because the vowel before it is long, and surface.ts does NOT fold ß to ss (checked), so the ss spelling of this word would be a second, unreachable entry. These briefs never write that spelling, not even starred as a mistake — a brief seeds every prompt, and a wrong spelling on the page is a wrong spelling somebody copies (the en-ru yó rule, applied to ß).',
        "sein is irregular and carries the module: ich bin · er/sie/es ist · Sie sind. ONE row, forms bin · ist · sind — and because first occurrence wins, that row's note is what every later learner is shown, so it must be true of identity (Ich bin Student), of a state (Ich bin müde, M2), of M7's location (Das Buch ist auf dem Tisch) and of M5's Perfekt auxiliary (Ich bin nach Hause gegangen). German has ONE verb \"to be\" and it does classifying and locating alike — no ser/estar split to warn about. bist is du's form and is NOT written or listed anywhere, exactly as en-fr keeps es out; sind is doing double duty as the Sie form and the they-form, which M2 explains when it opens the sie row.",
        'THREE-WAY GENDER, and EVERY NOUN IS CAPITALISED. der Tisch (m) · die Tür (f) · das Buch (n) — a third box English and French have no twin for, and the capital is orthography the learner must PRODUCE, on every noun, in every position. Teach each noun with its article. The slogan this module attracts is "gender is arbitrary, just memorise it", and it wastes the one thing that would help. The law: gender is largely PREDICTABLE from the ending — a noun in -ung, -heit, -keit, -schaft, -ion or -tät is feminine; one in -chen or -lein is neuter; an -er agent noun (Lehrer, Kellner) is masculine — and what is left over is genuinely learned, which the note should say rather than pretend otherwise.',
        "TWO PLACES ENGLISH WANTS AN ARTICLE AND GERMAN DOES NOT, and they are this module's interference. A profession stands BARE after sein: Ich bin Student, never *Ich bin ein Student. And a generic — a whole class of thing — takes a BARE noun: Ich mag Kaffee, not *Ich mag den Kaffee, which means one particular coffee already on the table. Say explicitly that this is the OPPOSITE of French and Spanish, where the generic takes the definite article (J'aime le café, Me gusta el café): an author coming off #327 or #191 will import the wrong law, and a learner coming off a Romance language will too.",
        "INDEX SEAM, decided here. M1 opens der, die and das as the definite articles, and because first occurrence wins its note must be TRUE OF EVERY LATER USE: der is masculine nominative AND feminine dative (M7's auf der Straße lands on this row), die is feminine AND plural (M8's plural lands on it), das is neuter AND the demonstrative \"that\" of M8's Was kostet das?. All three as RELATIVE pronouns, and the genitive, stay OUT of L1 so the note stays true. ein and eine are opened here; einen is M3's (a different key, so both rows stay reachable). aus is opened here as the preposition of Ich komme aus Indien, which is what keeps it out of the hands of a separable ausgehen — deferred out of L1 for exactly that reason. Leben and leben are kept out of L1 in BOTH readings, since surface.ts folds case and would make them one entry: residence is wohnen.",
      ],
      maxWordsPerSentence: 5,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M2': {
      id: 'L1-M2',
      title: 'First exchange',
      job: 'Greetings, wellbeing, yes/no questions',
      patterns: [
        'Guten Tag + , + name',
        'Wie geht es Ihnen + ?',
        'Mir geht es + gut/sehr gut + , danke',
        'Sind Sie + Adj + ?',
        'Kommen Sie aus + place + ?',
        'Ja / Nein / Doch + , + <statement>',
      ],
      notes: [
        'Greetings are where the register decision becomes visible, so tie them to it: Guten Tag is this course\'s greeting, safe with anyone from mid-morning to evening, with Guten Morgen and Guten Abend beside it. Hallo is the informal one and belongs with du — name it in the notes as what the learner will hear, and never write it in a display. The same split governs the closing: Auf Wiedersehen, not the Tschüss a friend would say. REGISTER, decided course-wide and restated here because this is the module that first addresses somebody: the course speaks Sie. The false slogan is "Sie is just polite you". The law: Sie is a distinct grammatical person that takes the PLURAL verb form — Sie sind, Sie haben, Sie kommen, never *Sie ist — with its own possessive Ihr and its own dative Ihnen. du exists, takes its own -st endings and its own dein/dich/dir, and choosing it is L2\'s job; say that once, here.',
        'Wellbeing is a DATIVE-EXPERIENCER construction and it is the first sign of what German does with people: Wie geht es Ihnen? is literally "how goes it to-you", and the answer Mir geht es gut is "to-me goes it well". English puts the person in the subject slot ("how are you", "I am fine") and German puts it in a case slot with a dummy es as the subject. Carry literal on both lines. This is not a quirk to memorise and forget — it is the construction M9 comes back to for Mir ist kalt, so name it as a pattern the level will reuse.',
        'A YES/NO QUESTION IS VERB-FIRST, and nothing is inserted: Sind Sie müde? is the statement Sie sind müde with the verb moved to the front. There is no German word standing in for English do — the question does not build one and M3\'s negative does not either — so a learner hunting for the German "do" is hunting for a word that does not exist. *Tun Sie müde sein? is not a near miss; it is a sentence with two verbs and no grammar. This is a clean delta and the module should spend it.',
        'ja, nein and doch — and doch has no English equivalent at all. It is the yes that CONTRADICTS a negative question: asked Sind Sie nicht müde? ("aren\'t you tired?"), ja is ambiguous in English and German answers Doch to mean "yes, I am". One sentence and one usage line is the right spend; it is a word an English speaker will hear constantly and never produce.',
        'INDEX SEAM, and it is the most important one in the course. surface.ts CASE-FOLDS (rule 4), and German capitalises every noun, so Sie and sie are ONE index entry — checked against the real function, not assumed: normalizeSurface(\'Sie\') === normalizeSurface(\'sie\'). A multi-token surface does not help, because Sie sind and sie sind fold to the same key too. So M2 opens ONE sie row and its note is written true of ALL THREE readings the course teaches — "she", "they" and the formal "you" — with the rule that actually tells them apart: the VERB FORM, and in writing the CAPITAL. sie ist is "she is"; sie sind is "they are"; Sie sind is "you are". No later module opens a rival row, and M10\'s sie for a feminine THING (die Tür … sie) lands here, so this note already says that sie for a thing is grammatical gender, not a person. Write the capital every time anyway: the index cannot see it, the reader can.',
        'INDEX SEAM, the rest of it. Ihnen and ihnen fold as well, and so do Ihr and ihr — settled by exclusion so each key keeps one reading: ihnen ("to them"), ihr ("you" plural) and ihr ("her" / "their") are all OUT of L1, so Ihnen (here, in Wie geht es Ihnen?) and Ihr (here, in Ihr Name) each own a clean key. Take Guten Tag, Guten Morgen and Guten Abend as three whole two-token surfaces: bare Guten is then never written, the accusative -en on it never has to be explained at this word cap, and — decisively — Guten Morgen leaves the bare key morgen free for M6\'s "tomorrow". Take wie geht es as ONE three-token surface, which keeps geht free for M4\'s gehen and leaves this module\'s own bare wie (Wie heißen Sie?) untouched. Wie geht\'s? is the du-flavoured casual form: name it in usage, never write it, because geht\'s is a fused single-token key (surface.ts keeps an inner apostrophe) that no L1 job needs. Deutsch is opened here in Sprechen Sie Deutsch? — bare after sprechen, no article, and its note says the adjective deutsch is the SAME key after the fold and is not taught in L1.',
      ],
      maxWordsPerSentence: 5,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M3': {
      id: 'L1-M3',
      title: 'Needs and wants',
      job: "Say what you want and don't want",
      patterns: [
        'Ich möchte + N',
        'Ich möchte + einen/eine/ein + N',
        'Ich möchte + infinitive (clause-final)',
        'Ich möchte + kein/keine/keinen + N',
        'Ich + V + nicht',
        'Möchten Sie + N + ?',
      ],
      notes: [
        'möchten is the module\'s verb and the level\'s politeness in one word: ich möchte · Sie möchten. Wanting to DO something is möchte plus a BARE infinitive with the infinitive AT THE END of the clause — Ich möchte einen Kaffee trinken, literally "I would-like a coffee drink". There is no word for "to" anywhere in it: *Ich möchte zu trinken is the English habit and is worth the mistake block. Carry literal on every clause-final line, because the order is the lesson.',
        'THE CLAUSE BRACKET, and the slogan it is about to attract. An author writing this module will reach for "German puts the verb at the end", and it is false of every sentence here. The law: a German main clause is VERB-SECOND — the finite verb is the second element — and what goes to the END is the NON-FINITE part: the infinitive after a modal here, the participle in M5\'s Perfekt. Ich möchte einen Kaffee trinken has möchte in second position and trinken last; the clause is a BRACKET with the object inside it, not a reversal. Say the law here, pay it off in M5, and state it in full in M9, where a subordinate clause finally does send the finite verb last.',
        'NEGATION IS THE LEVEL\'S SHARPEST INTERFERENCE, because German splits one English word in two by WHAT is being negated. nicht negates a verb, an adjective or a whole sentence and stands after the verb or at the end — Ich arbeite nicht, Der Kaffee ist nicht gut. kein negates a NOUN that would otherwise take ein or no article at all, and it inflects like ein — Ich möchte kein Brot, Ich möchte keinen Kaffee, never *Ich möchte nicht Brot. The slogan is "nicht = not"; the law is that nicht and kein divide one English word by their target, not by politeness or emphasis. Spend a mistake plate on *nicht Brot.',
        "THE ACCUSATIVE ARRIVES, and it is visible on the MASCULINE ONLY: der/ein becomes den/einen, while die, das, eine and ein look exactly as they did in M1. Ich möchte einen Kaffee (m) beside Ich möchte eine Suppe (f) and Ich möchte ein Brot (n) — one ending moved and two did not, which is precisely why the ending is easy to skip and must be drilled. Choose the masculine noun deliberately in at least three sentences. einen and keinen are their own rows here, distinct keys from M1's ein and from kein, so all of them stay reachable.",
        "A NOTE ON THE BOUND, and it applies to this module first. German's clause bracket makes a sentence LONGER IN TOKENS than the Romance equivalent at the same difficulty: Ich möchte einen Kaffee trinken is five tokens for what French says in four. Read maxWordsPerSentence as a real constraint here, not as slack — a sentence that needs a sixth word usually needs a different sentence.",
        'REGISTER holds here, and this is the module where a question is first asked of somebody who might buy something: Möchten Sie einen Kaffee? — verb-first, Sie form, plural verb ending, exactly as M2 settled it. The du question (*Möchtest du …?) is never written. And say in one line why möchte rather than will: Ich will einen Kaffee is grammatical and blunt, the polite want is möchte, and M6 has to warn that will is not the English "will" at all.',
        "INDEX SEAM: essen is opened here, as the clause-final infinitive of Ich möchte etwas essen, with forms essen · esse. Because surface.ts case-folds, that ONE key does three jobs and the note names all three: the infinitive, the Sie form (Sie essen — the plural is spelled like the infinitive, the register decision paying off), and the noun das Essen. The noun is nonetheless kept out of L1 display — L1's food is concrete (Brot, Kaffee, Wasser, Suppe) — so nothing has to lean on the third reading, and M4's Ich esse extends THIS row rather than opening a second the index could never reach. Same note: isst (er isst) is a DIFFERENT key from ist, and their collision is a HOMOPHONE, not an index merge — the ear collides, the eye does not — so it belongs in a sound line, never in the index plan. möchte is this module's row and mag is M1's: two lemmas doing two jobs, and neither note answers for the other.",
      ],
      maxWordsPerSentence: 6,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M4': {
      id: 'L1-M4',
      title: 'My day',
      job: 'Daily habits and time words',
      patterns: [
        'Ich + V-e + jeden Tag',
        'Ich stehe um + num + Uhr auf',
        'Um + num + Uhr + V + ich + …',
        'Morgens / Abends + V + ich + N',
        'Am Montag + V + ich + …',
        'Ich wasche mich',
      ],
      notes: [
        'The delta to celebrate: German has ONE present and it covers both of English\'s. Ich esse is "I eat" AND "I am eating" — the same two words, and which one it is comes from the sentence around it. The interference is a learner assembling the English shape out of German parts: *Ich bin essen is not a near miss, it is two verbs with nothing joining them. The slogan behind it is "German has no continuous, so drop the -ing", and it is memorable and backwards. The law: the German present covers both English presents; there is nothing to drop, because there was never a second form to build. The present endings across the persons this course writes are -e for ich and -en for Sie (ich arbeite · Sie arbeiten), with er/sie/es taking -t (er arbeitet).',
        'SEPARABLE VERBS LAND HERE, and they are the most alien mechanic in the level: the prefix detaches from its verb and flies to the END of the clause. Ich stehe um sieben Uhr auf — aufstehen split in half with four words between the halves. It is the same bracket M3 opened, built from a different part. L1 teaches exactly ONE separable verb, aufstehen, and names anrufen, ausgehen, mitkommen and vorstellen in prose as the same mechanic, DEFERRED — which is a word-budget decision and an index decision at once (see the seam note).',
        'TIME FRONTED, AND FRONTING INVERTS — this is where VERB-SECOND becomes visible. Um sieben Uhr stehe ich auf: the time phrase is the FIRST element, so the verb stays second and the subject moves behind it. The law to state, precisely: the finite verb is the second ELEMENT, not the second WORD, and whatever is fronted counts as the first element however many words it contains (Um sieben Uhr is three words and one element). *Um sieben Uhr ich stehe auf is the English word order and the commonest slip in the module. The time vocabulary is jeden Tag, morgens, abends, am Montag, um sieben Uhr, früh and spät.',
        'Reflexive dailies: Ich wasche mich. The little pronoun is part of the verb and English has nothing standing where mich stands, so the dropped mich is a predictable slip and belongs in a mistake block. Keep the set small — waschen is enough at this cap. CHANGED 2026-09-05 (docs/46): the daily HERO is Ich dusche jeden Tag — the verb people actually say, and it is not reflexive; Ich wasche mich stays as the variation and the mistake plate that carry the mich row.',
        "INDEX SEAM, and it is this course's own का bug, decided here. surface.ts splits on whitespace, so the flown-off prefix in Ich stehe um sieben Uhr auf is a BARE TOKEN and earns the bare key auf (checked: the token list is ich · stehe · um · sieben · uhr · auf). M4 gets there before M7, so M4 OWNS auf, opens ONE row, and that row's note names BOTH seats: the separable prefix of aufstehen, and M7's plain preposition auf dem Tisch (\"on\"). M7 opens no rival auf row, because the index could never reach it. Teaching one separable verb is what keeps this to a single key: an, aus, mit, vor and zu stay clean for their prepositional owners. The Perfekt aufgestanden infixes the ge- INSIDE one token, so it is a single fresh key with no parts (surfaceIndexKeys splits hyphens, not morphemes — checked) and it is a forms entry on this row, extended by M5.",
        'INDEX SEAM, the Morgen decision — the sharpest in the course, and M4 is the module that has to give way. Morgen ("morning") and morgen ("tomorrow") fold to ONE key. M4 wants the morning and M6 wants tomorrow, and M4 gets there first, so M4 is written AROUND it: this module\'s morning is the adverb morgens ("in the mornings", which is the habitual sense the job actually wants and a different single-token key), plus the two-token span am Morgen where a noun is unavoidable. NO MODULE BEFORE M6 WRITES A BARE Morgen, so the bare key belongs to M6, meaning "tomorrow". am is opened here for am Montag, and its note covers the TIME seat and M7\'s PLACE seat alike (am Tisch), because M7 could not reach the key — the en-es a precedent. arbeiten and Arbeit are both this module\'s: arbeit, arbeite and arbeiten are three DISTINCT keys (checked — the fold lowercases and nothing else), so the noun never merges with a verb form.',
      ],
      maxWordsPerSentence: 6,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M5': {
      id: 'L1-M5',
      title: 'Yesterday',
      job: 'Past tense — the first big divergence',
      patterns: [
        'Gestern + habe ich + N + V-participle',
        'Ich habe + N + V-participle',
        'Ich bin nach Hause gegangen',
        'Ich bin + um + num + Uhr + aufgestanden',
        'Ich war + Adj',
        'Ich hatte + N',
        'Haben Sie + N + V-participle + ?',
      ],
      notes: [
        'The everyday spoken past is the PERFEKT, and it is TWO parts bracketing the clause: haben or sein in second position carrying the person, and a past participle AT THE END carrying the verb. Ich habe Brot gegessen — literally "I have bread eaten", which is what literal must say on the line. The slogan waiting here is "the Perfekt is the perfect, so Ich habe gegessen means I have eaten", and writing to it mistranslates every sentence in the module. The law: the Perfekt is German\'s ORDINARY spoken past — Ich habe Brot gegessen is "I ate bread" — and English\'s "I have eaten" is only sometimes the same thing. There is no did anywhere: German builds neither its past question nor its past negative out of an auxiliary English would recognise.',
        'Most verbs take haben; a closed set of MOVEMENT-AND-CHANGE verbs takes sein — gehen, kommen, fahren. Ich bin nach Hause gegangen, not *Ich habe nach Hause gegangen. Keep the sein set to the two or three the sentences actually need; the full list is not an L1 job. This is the same sein row M1 opened, doing a fourth job, so M5 writes its rule text rather than opening a second row.',
        "PARTICIPLES have two shapes and the verb carries which: weak verbs take ge-…-t (gemacht, gekauft; gearbeitet takes a linking -e- because the stem ends in -t) and strong verbs take ge-…-en with a vowel change to learn (gegessen, getrunken, gegangen). And a SEPARABLE verb infixes the ge- between prefix and stem: aufstehen becomes aufgestanden, never *geaufstanden — M4's mechanic returning with a twist, and the payoff of having taught it there.",
        'THE DELIBERATE EXCEPTION, and the module ships stilted German without it. The Präteritum is otherwise OUT of L1 — no ich ging, no ich machte — but war and hatte ARE the everyday spoken past of sein and haben, and nobody says the Perfekt of them in conversation. So this module teaches Ich war müde and Ich hatte Hunger, not Ich bin müde gewesen and Ich habe Hunger gehabt, which are grammatical and are not what anybody says. State the exception in words, or a later author will "correct" it into the pattern.',
        'INDEX SEAM: war and hatte are each ONE row covering TWO PERSONS — ich war and er/sie/es war are the same written form, and so are ich hatte and er hatte — so each note says so rather than leaving a learner to discover it, and waren and hatten (the Sie forms) are forms entries on the same rows. Each participle is its own word row here, never a forms entry on M4\'s present row: a tap on gegessen must open "the past participle of essen", not "I eat". aufgestanden is the exception and belongs on M4\'s aufstehen row, because it is that verb\'s own shape. nach Hause is taken here as a two-token span — M5 writes it before M7 does, so M5 owns it and M7 owns zu Hause, with M7\'s note pointing back; bare Hause and bare nach are written nowhere in L1. gestern is a bare one-token surface with no rival.',
        "The bound is 7 here for the same reason M3's was tight: the bracket costs tokens. Ich bin um sieben Uhr aufgestanden is six words for one English clause of five, so plan the sentence around the bracket rather than filling the ceiling and then discovering the participle has nowhere to go.",
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M6': {
      id: 'L1-M6',
      title: 'Tomorrow',
      job: 'Future and plans',
      patterns: [
        'Morgen + V + ich + N',
        'Morgen + V + ich + nach + place',
        'Am Montag + V + ich + …',
        'Ich möchte morgen + infinitive (clause-final)',
        'Was machen Sie morgen + ?',
      ],
      notes: [
        'The delta, and the whole module: THE PRESENT TENSE PLUS A TIME WORD IS THE FUTURE. Morgen esse ich Brot is "tomorrow I will eat bread" — no auxiliary, no extra tense, nothing added but the time word. English cannot do this ("*tomorrow I eat bread" is at best odd), so the interference is a learner reaching for a helper verb that German does not want here.',
        "And because Morgen is FRONTED, the clause INVERTS: Morgen esse ich Brot, not *Morgen ich esse Brot. This is M4's verb-second law being REUSED, not re-taught — say that in the note, and let the rule text point back to M4 rather than restating the whole law. Every sentence in this module is a chance to drill it, because a time word is fronted in nearly all of them.",
        'werden + infinitive (ich werde essen) is DEFERRED, and naming it as deferred is what stops a later author importing it a level early. The slogan is "will = the future tense, so German must have one too"; the law is that German\'s everyday future is the present with a time word, and werden is reserved for prediction and emphasis a survival learner does not need yet.',
        'THE SHARPEST FALSE FRIEND GERMAN HAS FOR AN ENGLISH SPEAKER: Ich will does NOT mean "I will". It means "I want", and it is blunter than möchte. Ich will Brot is "I want bread", said the way a child says it. The law: will is the verb wollen, not a future auxiliary; the future is this module\'s present-plus-time-word, and the polite want is M3\'s möchte. Spend a mistake plate on it here, and keep wollen out of the displays — naming it is enough.',
        'INDEX SEAM: morgen is THIS module\'s bare key, meaning "tomorrow", and it was reserved for it. surface.ts case-folds, so Morgen ("morning") and morgen ("tomorrow") are ONE entry; M2 wrote Guten Morgen as a whole span and M4 wrote morgens and am Morgen, precisely so that no earlier module claimed the bare key. The note still names BOTH readings, because the index cannot tell them apart and the learner is owed the truth — and it points at am Morgen and morgens as where the other reading lives. nach Hause is M5\'s span, so a plan that goes home reuses it rather than opening a rival.',
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M7': {
      id: 'L1-M7',
      title: 'Where things are',
      job: 'Locations and prepositions',
      patterns: [
        'Es gibt + einen/eine/ein + N',
        'Der/Die/Das + N + ist + in/auf/unter/neben/vor/hinter + dem/der + N',
        'Ich gehe in + den/die/das + N',
        'Wo ist + der/die/das + N + ?',
        'Ich bin zu Hause',
      ],
      notes: [
        'es gibt is the module\'s idiom and it NEVER changes: Es gibt einen Stuhl and Es gibt zwei Stühle are the same two words. English splits "there is" from "there are" and German does not — a delta to celebrate. But it takes the ACCUSATIVE (einen Stuhl, not *ein Stuhl), with no object relationship anywhere in the sentence, and that is the first hint of what this module is really about. literal earns its keep here: Es gibt einen Stuhl is "it gives a chair". CHANGED 2026-09-05 (docs/46): the hero is anchored — Hier gibt es einen Stuhl — so the idiom\'s two halves flip behind a fronted word or in a question (gibt es), and the row carries gibt es as a form.',
        "THE TWO-WAY PREPOSITIONS, and this is the module that kills a slogan. in, auf, unter, neben, vor and hinter take the DATIVE for a LOCATION and the ACCUSATIVE for MOTION TOWARD: Ich bin im Park (dative — where I am) against Ich gehe in den Park (accusative — where I am going). The slogan is \"the accusative is the object case\". The law: the accusative ALSO marks motion-toward after these six prepositions, and es gibt takes it with no object relationship at all — so the case is not a job description, it is a form that the preposition and the meaning together choose. This is the level's second-richest interference zone after M3's negation, and it deserves the module's mistake budget.",
        "Where a thing IS takes sein — the same verb M1 taught, and there is still no second copula: Das Buch ist auf dem Tisch. The question is the question word in front, with the verb still second: Wo ist das Buch? es gibt asserts that something EXISTS; ist says where a known thing is, and choosing between them is this module's comprehension work.",
        'THE CONTRACTIONS ARE OBLIGATORY AND ARE SURFACES IN THEIR OWN RIGHT: in dem is im, an dem is am, zu dem is zum, zu der is zur, in das is ins, an das is ans. Write im Park, never *in dem Park, in ordinary speech. Each is its own index key, which is exactly what keeps the bare prepositions and the bare articles free for their owners.',
        "INDEX SEAM: auf is M4's row — M4's separable prefix got there first — and M4's note was written true of THIS seat, so this module opens no rival auf row and its rule text carries the preposition law instead. Same discipline on am, which is M4's (am Montag) and whose note already covers am Tisch. der in auf der Straße is the FEMININE DATIVE of M1's der row, not a new word: M1's note names that seat, so the tap resolves to something true. es gibt is taken as ONE two-token span, which keeps gibt free (geben is taught nowhere else in L1) and leaves bare es for M10's thing-pronoun. zu Hause is this module's span; nach Hause is M5's, and this note points back at it. Bare zu is not written here at all — the course spells zur Arbeit as the contraction — which leaves the bare key free for M8's zu (\"too\").",
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M8': {
      id: 'L1-M8',
      title: 'Numbers & shopping',
      job: 'Prices, quantities, buying',
      patterns: [
        'Was kostet + der/die/das + N + ?',
        'Wie viel kostet + N + ?',
        'Wie viele + N + möchten Sie + ?',
        'Ich möchte + num + N + , bitte',
        'Ein Kilo + N + , bitte',
        'Das ist zu teuer',
      ],
      notes: [
        'The price question has two everyday shapes and both keep the verb second: Was kostet das? and Wie viel kostet das Brot? The counting question is Wie viele plus a plural noun — Wie viele Stühle möchten Sie? English splits "much" from "many" and German splits viel from viele the same way, so this one is a delta, not a trap. bitte carries the politeness the register decision left to words.',
        'GERMAN READS TWO-DIGIT NUMBERS BACKWARDS, and it is a genuine, permanent interference worth its own sentence and its own trap. einundzwanzig is "one-and-twenty": the UNITS come first, then und, then the tens, and the whole thing is written as ONE word. The slogan is "numbers are just words in front of a noun". The law: above twenty a German number reverses the order English says it in, so a learner hearing sechsundvierzig must not write 64. literal is the tool: einundzwanzig is "one-and-twenty". Keep every sentence inside the numbers this module actually teaches — no display may write a number with no row behind it.',
        'A MEASURE PHRASE TAKES A BARE NOUN — no "of" and no von: ein Kilo Brot, eine Flasche Wasser, eine Tasse Kaffee. That is a delta from English ("a kilo OF bread") and from French (un kilo DE riz) alike, so say both if the author may be coming off #327. And Euro takes NO plural -s after a number: zwei Euro, zwanzig Euro, never *zwei Euros. CHANGED 2026-09-05 (docs/46): the law stands but the heroes moved to what a counter hears — Ein Kilo Äpfel, bitte (bread is sold by the loaf: Ein Brot, bitte) and Einen Kaffee, bitte (the cup goes unnamed; eine Tasse Tee is a variation).',
        'Numbers are vocabulary the sentences use — eins to zwölf, plus zwanzig, dreißig and hundert if a price needs them — not a counting drill. Note the two spellings a learner will get wrong: eins stands alone as the counting word but becomes ein/eine before a noun (ein Brot, not *eins Brot), and dreißig is the one ten spelled with ß rather than the -zig of zwanzig and vierzig.',
        'INDEX SEAM: wie viel and wie viele are two two-token spans of their own, beside M2\'s bare wie (Wie heißen Sie?) — three keys, three notes, none of them answering for another. das in Was kostet das? is the DEMONSTRATIVE "that one", and it lands on M1\'s das row, whose note was written true of this seat as well as of the neuter article; this module opens no rival. die in a plural (die Stühle) lands on M1\'s die row for the same reason. zu is opened HERE, in Das ist zu teuer ("too"), and it is free to be because no earlier module wrote a bare zu: M7 spells its contractions zum and zur and its span zu Hause. teuer and billig are plain adjectives after sein, uninflected — adjective endings before a noun stay out of L1.',
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M9': {
      id: 'L1-M9',
      title: 'Feelings & opinions',
      job: 'Why — because and so',
      patterns: [
        '<statement> + , weil + <clause with the verb LAST>',
        '<statement> + , denn + <clause with the verb SECOND>',
        'Deshalb + V + ich + …',
        'Warum + V + Sie + … + ?',
        'Ich habe + Hunger/Durst/Angst',
        'Mir ist + kalt/warm',
        'Ich denke + , dass + <clause with the verb LAST>',
      ],
      notes: [
        'THE TRUE LAW BEHIND THE SLOGAN, finally stated. weil sends the finite verb to the END of its clause — Ich möchte Tee, weil ich müde bin — and denn does NOT: Ich möchte Tee, denn ich bin müde. Same meaning, same two facts, one word apart, and the word order flips. The slogan is "German puts the verb at the end", which M3 already had to correct; the law, in full and here: a SUBORDINATING conjunction (weil, dass, wenn) sends the finite verb last, a COORDINATING one (denn, und, aber, oder) leaves the clause alone and the verb stays second. Build the sentences in pairs and let the comprehension pool test the choice. deshalb is the consequence word and it is FRONTED, so it inverts: Ich bin müde. Deshalb möchte ich Tee. — M4\'s verb-second law once more.',
        'THE haben STATES: German says you HAVE hunger, thirst and fear where English says you ARE. Ich habe Hunger, Ich habe Durst, Ich habe Angst. The classic is *Ich bin Hunger, which does not mean "I am hungry" — Hunger is a noun, so it says "I am hunger". The law: a bodily state of this family is haben plus a BARE noun, with no article at all.',
        'THE DATIVE EXPERIENCER RETURNS, and M2 is what paid for it. Temperature is Mir ist kalt — "to-me is cold" — with the person in the dative and no subject at all. The slogan is "Germans say ich bin kalt for I am cold"; the law is that *Ich bin kalt is a grammatical German sentence meaning the speaker is cold-HEARTED, which is why it is worth a mistake plate rather than a footnote. Point back at M2\'s Wie geht es Ihnen? in the rule text: this is the same construction, and it is the second time the learner meets it.',
        'Ich denke, dass … — and dass is NEVER optional. English drops "that" freely ("I think it is good") and German cannot: Ich denke, dass das Buch gut ist, never *Ich denke das Buch ist gut. dass is doing TWO jobs at once — it holds the clause and it sends the verb to the end — so name both. The comma before it is obligatory in writing, unlike English. WITHDRAWN 2026-09-05 (docs/46): "never optional" is false of spoken German — after denken, glauben and finden speech drops dass and keeps the clause verb-second (Ich glaube, das Buch ist gut), and the plain opinion is Ich finde das Buch gut. The law that stands: WITH dass the verb goes last; without it, second. M9-S08 now teaches all three shapes.',
        "THE das / dass TRAP BELONGS ON THIS SENTENCE, and it is a SPELLING trap, not an index collision: das and dass are different spellings, so surface.ts gives them different keys and the index never merges them (checked). What collides is the anglophone's ear, which hears one word where German writes two. Ich denke, dass das Buch gut ist contains both, one after the other, so it is the sentence to hang the trap on: dass is the conjunction, das is the neuter article.",
        "INDEX SEAM: weil, denn, deshalb, warum and dass are each their own bare one-token row here, with no rivals earlier in the course. habe is M5's row, opened there as the Perfekt auxiliary, and its note was written true of plain \"I have\" as well — so a learner tapping habe in Ich habe Hunger is told something true, and this module opens no rival. mir is a bare row here and its note covers the dative experiencer in both its seats, M2's and this one. ist is M1's sein row; note in passing that isst (M3's essen row) is a DIFFERENT key, and that the ist/isst pair is a homophone for the ear and never a merge for the index.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M10': {
      id: 'L1-M10',
      title: 'Connected talk',
      job: 'Short 2–3 sentence exchanges',
      patterns: [
        '<M1–M9 pattern> + <M1–M9 pattern>',
        '<statement> + und/aber + <statement>',
        '<question> → <answer + , weil + reason>',
        '<statement> + . + Dann/Also + <statement>',
      ],
      notes: [
        "Each item is a TURN of 2–3 short sentences, not one long one — a question and its answer, or a statement, a reason and a follow-up. The per-sentence bound applies to each sentence inside the turn, and German's bracket makes that bound bite harder than it did in en-fr, so prefer three short sentences to two long ones.",
        "THE RECOMBINATION LAW, and it is M9's contrast reused across a whole turn: und, aber, oder and denn are COORDINATING — they do not occupy the first position of the clause after them, so the verb stays SECOND and the subject stays in front of it (Ich bin müde, aber ich möchte Tee) — while weil, dass and wenn are SUBORDINATING and send the finite verb LAST. dann and also are neither: they are ADVERBS, they DO occupy first position, and so they invert (Dann gehe ich nach Hause). Three behaviours, one turn, and getting them straight is the module.",
        'also is a FALSE FRIEND and it will be confused with the word it looks like: German also means "so, therefore", and English "also" is German auch. Ich bin müde, also möchte ich Tee is "so I would like tea". Name both words in the SAME note, because naming them apart is what lets a learner keep the wrong pairing. auch goes AFTER what it adds to (Ich möchte auch Tee), not at the head of a sentence.',
        "A delta, and the easy one: German subject pronouns are NEVER dropped, exactly as English's are not. Write the pronoun in every clause of every turn, including the second and third sentences where the person is already obvious. Nothing to unlearn here, so spend the note on the next point instead.",
        'er / sie / es FOR THINGS, BY GRAMMATICAL GENDER — the anglophone tell, and the module exists to force it. Der Tisch ist groß. Er ist auch alt. — "the table … he". Die Tür ist klein. Sie ist neu. — "the door … she". The slogan is "er = he, sie = she, es = it". The law: er, sie and es name the GENDER OF THE NOUN they stand for, so a table is er and a door is sie, and an English speaker with no German twin for "it" will default to es for everything. *Der Tisch ist groß. Es ist alt. is the mistake to plate. INDEX SEAM: this lands straight back on M2\'s sie row — the same single folded key that already carries "she", "they" and the formal "you" now carries a feminine THING as well, and M2\'s note was written to cover it. Do NOT open a second sie row here; the index could never reach it. er and es are still free, because M2 took wie geht es as a whole span and M7 took es gibt as another, so neither claimed the bare es.',
        "Language of the fields holds to the last turn: ENGLISH in every teaching field — rules[].text, note, trap, sound, changed, why, usage, mnemonic, cue — German only in display and forms, glossEn on every sentence, and literal wherever a turn's order moves. The register holds too: Sie to the end, du never written, and every noun still capitalised.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M1': {
      id: 'L2-M1',
      title: 'Asking politely',
      job: 'Requests, thanks, apologies in the right register',
      patterns: [
        'Können Sie mir bitte + N-acc + geben?',
        'Kannst du mir bitte + V-inf + ?',
        'Könnten Sie mir + V-inf + ?',
        'Entschuldigung + , + <request>',
        'Danke schön — Gern geschehen',
      ],
      notes: [
        'REGISTER, decided for the whole level and repeated here because a prompt only ever shows an author the notes (full record: docs/59-en-de-L2-brief-decisions.md; the seven L1 decisions carry unchanged, and decision 2 — the case fold meeting German capitalisation — governs this level more than any other). L1 spoke Sie throughout and kept du and its forms out of display AND out of every forms list, so the address that enters here is du. It is the most expensive register decision in the repo and L1 said why in advance: Sie takes the plural verb, so its form is spelled exactly like the infinitive and cost the index nothing, while du costs a second set of endings (bist, hast, kannst, möchtest, sprichst), its own imperative (komm, geh, gib, hilf) and dein / dich / dir. This module pays all of it. du frames chip `informal`, the Sie frames and the Könnten tier chip `formal`, a line safe with either stays `neutral`.',
        "THE grammar of the module and of the level: the MODAL BRACKET. A modal is conjugated in position two and its infinitive goes to the very END of the clause — Können Sie mir bitte das Buch geben? — with everything else in between. English keeps its verbs together and German splits them around the sentence, so this is the biggest single word-order delta in the course, and every later module borrows the frame: M4's directions, M6's suggestions, M7's calls and M8's requests for help are all this shape. Author it in both addresses and let the pool test where the infinitive lands.",
        "The dative arrives with the request, because a request has a recipient: mir (L1-M9's row, from Mir ist kalt), dir, Ihnen (L1-M2's, from Wie geht es Ihnen?), uns. Point back at both L1 rows rather than opening them again, and note that L1-M9's Mir ist kalt was already a dative-subject sentence with no grammatical subject at all — the same shape M8 will use for Mir ist schlecht. A learner who is shown the connection learns one pattern instead of three idioms.",
        "könnten is Konjunktiv II and the mood is L3-M4's, so it enters as exactly ONE frozen cell — the politest request in the module — with a note naming the mood it belongs to and saying the rest is deferred. That is the treatment en-fr gives je voudrais and en-it gives vorrei. The rest of the politeness is lexical and mostly already the learner's: bitte (L1-M8), danke (L1-M2) climbing to danke schön and vielen Dank, Entschuldigung for getting attention, and Es tut mir leid for regret — a three-way split English makes with one word, like Italian's Scusi / Mi dispiace / Permesso.",
        "INDEX SEAM: du, bist, hast, kannst, kann, können, könnten, willst, möchtest, gehst, machst, kommst, sprichst, dein, deine, dich, dir, uns, komm, geh, gib, hilf, entschuldigung, leid, schön, vielen, dank and geschehen are fresh keys. mir stays L1-M9's row, Ihnen stays L1-M2's, bitte stays L1-M8's, danke stays L1-M2's. Write every capital where German writes one — Sie, Ihnen, Ihr and every noun — even though the index folds it: the fold cannot see the capital and the reader can, and it is the only visible signal of which sie is meant (L1 decision 2).",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M2': {
      id: 'L2-M2',
      title: 'Describing people',
      job: 'Appearance, character, relationships',
      patterns: [
        'Er/Sie ist + Adj',
        'Er/Sie hat + Adj-less + N-acc',
        'Das ist mein/meine + N',
        'Ihre + N + heißt + <name>',
        'Der + N + von + <name>',
      ],
      notes: [
        'sie does its other two readings here — "she" and "they" — and this module OPENS NO ROW for either. L1\'s decision 2 gave the key to L1-M2 as one entry with three readings, with the note already written true of all three and the separating rule stated: sie ist is "she is" (singular verb), sie sind is "they are" (plural verb, lowercase), Sie sind is "you are" (plural verb, capital mid-sentence). Point back at that note, restate the rule in a rules[] entry here, and let the verb form do the work — because the index cannot see the capital and never will.',
        'The possessive "her" is the one thing this module must decide, and the index decides it. L1 kept ihnen and the possessive ihr OUT so that Ihnen and Ihr would each own a clean key — Ihr Name is L1-M2\'s "your name". So the possessive "her" is taught on **ihre alone** (feminine and plural: ihre Schwester, ihre Kinder), which is a key nothing else holds, and where a masculine or neuter possession is needed the sentence takes the von periphrasis — der Bruder von Anna — which is ordinary spoken German and not a workaround. Bare ihr is never authored as a possessive. sein and seine ("his") are free and are this module\'s.',
        "haben carries features, sein carries identity: Er hat kurze Haare — no, in this level Er hat die Haare kurz is avoided too, because BOTH need an attributive adjective. Author features as predicative sentences instead: Seine Haare sind kurz, Ihre Augen sind blau, Er ist groß. That is decision 3 of the level in the field: every adjective in en-de L2 stands after sein and takes no ending, and the attributive declension is L3's. Say it in the note so the constraint reads as a decision rather than as an oversight.",
        'The family and person set: Bruder, Schwester, Vater, Mutter, Sohn, Tochter, Mann, Freund, Freundin, Eltern, Kind; groß and klein (L1-M10\'s rows), alt (L1-M10), jung, nett, freundlich, ruhig, lustig. Frau is L1-M2\'s key, where it is the title "Frau Weber" — and it also means "woman" and "wife", so point back and write nothing new: one key, three readings, exactly as sie has three. das Mädchen is neuter despite meaning "girl", which is the most famous fact about German gender and belongs in a trap here: gender is a property of the WORD, and -chen makes anything neuter.',
        "INDEX SEAM: ihre, sein (the possessive — note that the verb sein was never indexed by L1, which only ever showed ist, bin, sind and war, so this key is free and its note must say the two words are spelled alike), seine, meine, von, Bruder, Schwester, Vater, Mutter, Sohn, Tochter, Sohn, Kind, Eltern, Freund, Freundin, Haare, Augen, jung, nett, freundlich, ruhig, lustig and Mädchen are fresh keys. sie, Frau, Herr and Ihr stay L1-M2's rows; er, alt, groß and klein stay L1-M10's; ist and sind stay L1-M1's and L1-M2's.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M3': {
      id: 'L2-M3',
      title: 'Describing things',
      job: 'Size, colour, quality — agreement at length',
      patterns: [
        'Der/Die/Das + N + ist + Adj',
        'Ich sehe + den/die/das + N',
        'Ich gebe + dem/der/dem + N + <thing>',
        'Ein/Eine/Ein + N + ist + Adj',
        'Das ist kein/keine/kein + N',
      ],
      notes: [
        '"Agreement at length" means something different in German than in the Romance courses, and this module is where the level\'s third decision shows its face: German\'s agreement lives in the ARTICLE, not on the adjective, so the grid this module walks is der / die / das against den / die / das (accusative) against dem / der / dem (dative), with ein, eine, einen, einem and the kein series beside them. L1 shipped der, die, das, den, dem, ein, eine, einen, kein, keine and keinen across five modules without ever laying them out. This is where they become a table.',
        'Adjectives stay PREDICATIVE throughout this level — Das Auto ist rot, Die Tür ist blau — where they take no ending at all. The attributive declension (ein guter Mann · der gute Mann · guter Wein, three declensions chosen by what stands in front) is named here and deferred to L3. Say why in the note: it is the one German system too large to sit beside a module teaching colours, and pretending otherwise would give an author ten sentences of endings and no colours.',
        'The law that makes the grid worth learning, and it is the payoff an English speaker cannot guess: because case is marked on the article, German word order is FREE in a way English\'s is not — Den Apfel esse ich is a normal sentence meaning "I\'m eating the apple", with the object first. English marks its object by position alone, so this is the deepest structural delta in the course. One rule, one example pair, and the pool tests which noun is doing what.',
        "Gender is a property of the WORD and is not predictable from meaning, and the module should say so once, plainly, rather than offering a rule that fails: das Mädchen (girl) is neuter, der Löffel and die Gabel sit at the same table with different genders. Teach every noun with its article, exactly as en-es does, and refuse the shortcuts. Colours and qualities are the vocabulary spend: rot, blau, grün, schwarz, weiß, gelb, braun; neu and alt (L1-M10's), sauber, schmutzig, schwer, leicht, lang, kurz, billig and teuer (L1-M8's).",
        "INDEX SEAM: rot, blau, grün, schwarz, weiß, gelb, braun, sauber, schmutzig, schwer, leicht, lang, kurz, der (the dative feminine — L1-M1 owns der as the masculine nominative, so this cell lands on that row and the note must be true of both), einem and einer are fresh keys where they are not already L1's. weiß carries an ß and the fold KEEPS it (L1 decision 7), so Maße and Masse would be two keys and a shouted STRASSE would land on no row at all — never write a display in capitals. den, dem, ein, eine, einen, kein, keine and keinen stay their L1 rows and this module re-teaches them as a system.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M4': {
      id: 'L2-M4',
      title: 'Getting around',
      job: 'Directions, transport, asking the way',
      patterns: [
        'Entschuldigung + , + wo ist + der/die/das + N?',
        'Gehen Sie geradeaus + , + dann links',
        'Sie müssen + <place> + einsteigen',
        'Ich fahre mit dem Bus / mit der Bahn',
        'Wie komme ich zum/zur + N + ?',
      ],
      notes: [
        "THE preposition law of the module, and L1 shipped both halves without the rule: a two-way preposition — in, auf, an, neben, vor, hinter, unter, über — takes the ACCUSATIVE for motion into a place and the DATIVE for being in one. L1-M7 gave the learner ins Kino and im Kino as two contractions and never said why they differ; here it is. Ich gehe ins Kino against Ich bin im Kino, Ich stelle es auf den Tisch against Es steht auf dem Tisch. It is M3's grid doing real work, which is why M3 comes first.",
        "Separable verbs appear in this level ONLY unsplit, and the reason is the index: a separated prefix at the end of a clause is spelled exactly like an article or a preposition, so Ich steige ein would put ein on L1-M1's INDEFINITE ARTICLE row. The ruling for the whole level: a separable verb rides behind a modal (Sie müssen hier einsteigen, Ich möchte Sie anrufen) or sits in the Perfekt as a participle (Ich bin eingestiegen), and never splits. The split is named here and deferred to L3. It costs nothing, because M1's lesson is the modal bracket and every L2 sentence that wants a separable verb already has a modal in it.",
        "The Sie imperative is free: it is the infinitive with Sie after it — Gehen Sie, Nehmen Sie, Fahren Sie — which is the same spelling the learner has had since L1-M1, so the module's grammar budget goes to the prepositions and the vocabulary rather than to a new form. The du imperative (geh, nimm, fahr) is M1's and is named in usage here, not shown, because the scene is a stranger in the street. This module speaks Sie throughout and chips `formal`.",
        "Transport takes mit plus the DATIVE — mit dem Bus, mit der Bahn, mit dem Auto — and walking is zu Fuß, a fixed phrase. zum and zur (L1-M7's contractions of zu dem and zu der) are the direction words a learner actually needs and are already theirs; nach takes a bare city or country name (nach Berlin) with no article at all. Give the three as a short list rather than as a principle, because German does not have one here.",
        "INDEX SEAM: links, rechts, geradeaus, Ampel, Ecke, Bahnhof, Haltestelle, Bahn, Auto, Zug, Fuß, an (the preposition, and its note must be true of the separable prefix it will later become — L1's decision 4 in the field), über, mit, einsteigen, aussteigen, anrufen, ankommen and abfahren are fresh keys. Note that the infinitive form of each separable verb is ONE token and therefore one clean key; only the split form would be a problem, and this level never writes it. auf, in, vor, hinter, unter, neben, zu, zum, zur, im and ins stay L1-M4's and L1-M7's rows; wo stays L1-M6's. Place names never index (#61).",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M5': {
      id: 'L2-M5',
      title: 'Food and hosting',
      job: 'Ordering, offering, refusing without offence',
      patterns: [
        'Ich möchte + einen/eine/ein + N + , + bitte',
        'Bringen Sie mir bitte + den/die/das + N',
        'Möchten Sie noch + N + ?',
        'Nein danke + , + ich bin satt',
        'Die Rechnung + , + bitte',
      ],
      notes: [
        'Ordering is L1\'s own vocabulary in a new seat: Ich möchte (L1-M3, and the polite want the course has used since its third module) plus M3\'s accusative article, and the dative of the recipient from M1 — Bringen Sie mir bitte die Rechnung. Ich will exists and is blunt in a way English "I want" is not quite; say so in usage and keep möchte in display. Zusammen oder getrennt? is worth one sentence of its own: a German table is asked whether it pays together or separately, and a learner who has never heard the question will not understand the answer they are expected to give.',
        'das Essen lands on L1-M3\'s essen row and cannot do otherwise — decision 2\'s fold merges the noun and the verb into one key — so this module points back and writes no new row, with its note true of "to eat" and "the meal" alike. That is the pattern for every noun/verb pair in this course, and this is the one L2 actually meets. Write the capital anyway: the index cannot see it, the reader can.',
        "Refusing without offence, and German's answer is the opposite of the Indian, Russian and Italian hosting the other courses describe — worth saying plainly, because a learner carrying one culture's script into another gets it wrong in both directions. A German offer is made once or twice and Nein, danke is taken at face value; insisting past a refusal is the impolite move, not the hospitable one. So the refusal needs no elaborate softening: Nein danke, ich bin satt is complete and warm enough, and Vielleicht später is the hedge if one is wanted.",
        "The vocabulary: Fleisch, Fisch, Gemüse, Reis, Salat, Kuchen, Teller, Glas, Gabel, Löffel, Rechnung, Speisekarte, satt and noch. noch is the offer word (Möchten Sie noch Kaffee?) and is chosen deliberately so that mehr stays free for M9's comparative — the same protection en-es gives más by offering otro and en-fr gives plus by offering encore.",
        "INDEX SEAM: Fleisch, Fisch, Gemüse, Reis, Salat, Kuchen, Teller, Glas, Gabel, Löffel, Rechnung, Speisekarte, satt, noch, bringen, zusammen and getrennt are fresh keys. essen stays L1-M3's row and answers for das Essen too; möchte and möchten stay L1-M3's; bitte stays L1-M8's; mir stays L1-M9's; the article cells stay M3's and L1's. Every noun is capitalised in display and in forms even though the fold ignores it — correct German is the only signal the reader gets.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M6': {
      id: 'L2-M6',
      title: 'Making plans together',
      job: 'Invitations, suggestions, settling a time',
      patterns: [
        'Wollen wir + V-inf + ?',
        'Hast du am + <day> + Zeit?',
        'Um wie viel Uhr? — Um halb neun',
        'Morgen gehe ich + <place>',
        'Abgemacht + , + bis + <day>',
      ],
      notes: [
        "Plans are made among friends: du and wir throughout, chipped `informal` where the frame is du-only, and the Sie of M4 and M7 deliberately absent — an invitation in Sie reads as a business appointment. The suggestion frame is M1's modal bracket with wir — Wollen wir ins Kino gehen? Sollen wir um acht essen? — so the module opens no new structure and spends its budget on the clock and the word order.",
        'THE trap of the module, and it is the one that makes learners miss trains: **halb neun is half past EIGHT.** German counts toward the coming hour, where English counts from the last one, so halb acht is 7:30 and halb neun is 8:30. Viertel nach and Viertel vor behave like English. Author the pair in a mistake block and let the pool test it; there is no rule to state beyond the direction of counting, and stating that plainly is worth more than a table.',
        'Word order is the module\'s grammar: German\'s verb is SECOND in a main clause, and "second" counts phrases and not words — so when a time expression comes first the subject moves behind the verb. Ich gehe morgen ins Kino and Morgen gehe ich ins Kino are both correct and *Morgen ich gehe is not. English fronts a time and changes nothing, which is exactly why this needs a mistake block. The companion rule, worth one line: when both appear, TIME comes before PLACE — Ich fahre am Montag nach Berlin.',
        "The clock and the calendar: um (L1-M4), Uhr (L1-M4), the numbers from L1-M8, and the days L1 did not teach — Mittwoch, Donnerstag, Samstag, Sonntag beside L1-M4's Montag and Dienstag and L1-M6's Freitag. am is L1-M4's row doing am Montag here. And the collision decision 2 predicted, which this module is the first to meet: der Morgen (\"the morning\") folds onto L1-M6's morgen (\"tomorrow\") and L1-M4's morgens is a third relative. Point back at L1-M6's row, write the rules[] entry here, and open nothing.",
        'INDEX SEAM: wollen, sollen, wir, Mittwoch, Donnerstag, Samstag, Sonntag, halb, Viertel, nach (as the clock\'s "past" — L1-M5 owns nach hause as a phrase, so the bare preposition is fresh and its note carries both jobs), vor (L1-M7\'s row, doing "to" on the clock — point back), abgemacht, bis and frei are fresh keys where they are not already owned. morgen stays L1-M6\'s, and der Morgen lands on it. um, Uhr, Zeit and am stay L1\'s rows.',
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M7': {
      id: 'L2-M7',
      title: 'On the phone',
      job: 'Calls and messages — openings, closings, taking a message',
      patterns: [
        '<Surname> + . — Guten Tag + , + hier ist + <name>',
        'Kann ich bitte + <person> + sprechen?',
        'Er/Sie ist nicht da',
        'Kann ich eine Nachricht hinterlassen?',
        'Auf Wiederhören',
      ],
      notes: [
        "The German telephone convention is a genuine cultural fact and it is the module's first sentence: the person answering says their SURNAME — Weber. — rather than hello, and the caller opens with Guten Tag, hier ist Rohan Sharma. L1-M2 already taught Weber and Guten Tag, so the words are the learner's and only the convention is new. A learner who answers a German phone with Hallo? is not wrong, but will sound like a stranger; a learner who does not expect a bare surname will think they have the wrong number.",
        'The delta German shares with French and not with Italian: **there is no continuous tense.** Ich spreche covers "I speak" and "I am speaking" alike, so a learner reaching for an -ing equivalent finds none, and gerade (Er telefoniert gerade) is the word that carries "right now" when it matters. en-it\'s M7 is where a phone call finally motivates a progressive; here it is where the absence of one has to be stated, and the two briefs should be read together.',
        "Separable verbs are all over this scene — anrufen, zurückrufen, hinterlassen (inseparable, and worth naming as the contrast) — and every one of them rides unsplit behind a modal, per the level's ruling: Ich möchte Sie morgen anrufen, Kann ich eine Nachricht hinterlassen? Ich rufe Sie zurück is the split form and stays out of display; usage may say it exists. This module speaks Sie throughout and chips `formal`, for the honest reason that you cannot see who picked up.",
        "Auf Wiederhören is the closing, and it is Auf Wiedersehen (L1-M2) with the seeing swapped for hearing — a small joke the language makes that a learner will remember for years. Taking a message needs no new tense: Er ist nicht da, Kann ich etwas ausrichten?, and the past is M10's Perfekt (Er hat angerufen). Reported speech — Er hat gesagt, dass… — is L3's and named as deferred here, which is why a message is passed on with the words themselves.",
        "INDEX SEAM: hier, Nachricht, hinterlassen, zurückrufen, telefonieren, gerade, Nummer, da, ausrichten and Wiederhören are fresh keys. Auf Wiederhören rides as a two-token surface beside L1-M2's Auf Wiedersehen — the multi-token tool keeping auf on L1-M4's row. nicht stays L1-M2's, sprechen and spreche stay L1-M2's, ist stays L1-M1's, kann and können stay M1's, and sie stays L1-M2's three-reading row, which this module leans on twice a sentence.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M8': {
      id: 'L2-M8',
      title: 'When something goes wrong',
      job: 'Problems, asking for help, complaining calmly',
      patterns: [
        'Es funktioniert nicht',
        'Ich habe + mein/meine + N + verloren',
        'Können Sie mir helfen?',
        'Mir ist schlecht / Ich habe Kopfschmerzen',
        'Entschuldigung + , + es gibt ein Problem',
      ],
      notes: [
        "helfen takes the DATIVE, and it is not alone: helfen, danken, gefallen, gehören and passen all take a dative object where English takes a direct one — Ich helfe Ihnen, never *Ich helfe Sie. It is a short closed list and it should be taught as a list, because no rule predicts membership. This is M3's grid earning its keep a second time, and Können Sie mir helfen? is the module's core sentence: M1's modal bracket, M1's dative, M3's case.",
        'Mir ist schlecht is a dative-subject sentence with no grammatical subject at all — and L1-M9 already shipped one, Mir ist kalt, without naming the pattern. Name it here and the family falls out: Mir ist schlecht, Mir ist warm, Mir tut der Kopf weh. German, Russian and Italian all put the person in an oblique case for how they feel; a learner who is shown the connection to L1-M9 learns one thing instead of four.',
        'nicht against kein, and L1 shipped both halves without the rule: **kein negates a noun that would take ein or no article at all** (Ich habe kein Geld, Das ist kein Problem) and **nicht negates everything else** — a verb, an adjective, or a noun with a definite article (Es funktioniert nicht, Der Bus kommt nicht). It is one of the few German rules with a clean statement, and an English speaker who has only "not" will use nicht everywhere. Spend the mistakes here.',
        "Complaining calmly is a register lesson and German's answer is closer to Russian's than to English's: the softening is the opening (Entschuldigung, …) and the word leider, not a weakening of the claim itself. Es funktioniert nicht is a normal thing to say and is not rude. An English speaker's \"there seems to be a slight issue\" reads as evasive rather than as polite; say so in usage and judge neither language.",
        "INDEX SEAM: funktioniert, verloren, vergessen, kaputt, helfen, Hilfe, brauche, brauchen, schlecht, Kopfschmerzen, Kopf, weh, Problem, leider, Schlüssel and Geldbeutel are fresh keys. Every participle here (verloren, vergessen) belongs in the forms of its verb's row where the course owns one, and takes a row of its own where it does not — M10 states the Perfekt law that governs them. mir stays L1-M9's, kalt stays L1-M9's, nicht stays L1-M2's, kein / keine / keinen stay L1-M3's, es gibt stays L1-M7's whole surface, and Entschuldigung stays M1's.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M9': {
      id: 'L2-M9',
      title: 'Comparing and choosing',
      job: 'More, less, better — stating a preference',
      patterns: [
        'A + ist + Adj-er + als + B',
        'A + ist + so + Adj + wie + B',
        'A + ist am + Adj-sten',
        'Ich trinke lieber + N',
        'Welcher/Welche/Welches + N + ?',
      ],
      notes: [
        "The comparative is -er and the standard is als: größer als, billiger als, älter als. Two German particulars make it more than an English lookalike. First, many one-syllable adjectives take an UMLAUT in the comparative — alt → älter, groß → größer, jung → jünger, lang → länger — and the fold KEEPS umlauts (L1 decision 7), so alter and älter are two separate index keys and each comparative belongs in its adjective's row as a form. Second, the superlative in a predicate is am -sten — Berlin ist am größten — which conveniently needs no adjective ending, so it fits inside this level's predicative-only rule.",
        'als against wie, and this is the mistake block: a comparison of UNEQUALS takes als (größer als) and a comparison of EQUALS takes so … wie (so groß wie). *größer wie is the error, it is extremely common in speech among native speakers too, and the brief should say that honestly rather than pretending it never happens — a learner who hears it in Germany and then reads a rule denying it stops trusting the course.',
        'The irregulars are the ones actually used: gut → besser → am besten, viel → mehr → am meisten, gern → lieber → am liebsten. That last one is the module\'s best delta: **German states a preference with an adverb, not a verb** — Ich trinke lieber Tee means "I prefer tea", literally "I drink more gladly tea" — where English needs the verb "prefer" and Spanish preferir. gern is the positive of that ladder and enters here.',
        'Choosing needs two declining words: welcher / welche / welches ("which") and dieser / diese / dieses ("this"), both of which take the same endings as der / die / das — so they are M3\'s grid a third time rather than a new system, and the note should say so. Adjectives stay predicative here as everywhere in this level: Welches Auto ist billiger? and not a declined attributive comparative, which is L3\'s.',
        "INDEX SEAM: als, so, wie (L1-M2 owns wie from Wie geht es Ihnen? — the equality wie lands on that row, so point back and write the rule around it rather than opening a second), größer, älter, jünger, länger, besser, mehr, lieber, gern, am, welcher, welche, welches, dieser, diese and dieses are fresh keys where they are not already owned. am is L1-M4's row (am Montag) doing the superlative here — one key, two jobs, note true of both. Each comparative shape belongs in the forms of its adjective's row where that adjective is this level's, and takes its own row pointing back where the positive is L1's.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M10': {
      id: 'L2-M10',
      title: 'Telling what happened',
      job: 'A four-sentence account in the past',
      patterns: [
        'Zuerst + habe ich + <N> + V-participle',
        'Dann + bin ich + <place> + gegangen',
        'Es war + Adj + , + also + <clause>',
        'Schließlich + habe ich + <clause>',
      ],
      notes: [
        "Each item is an ACCOUNT of exactly four short sentences, not one long one, and the per-sentence bound applies to each sentence inside it. Nearly every word comes from L1 and from M1–M9; the honest new spend is the sequencers (zuerst, danach, schließlich, beside L1-M10's dann and also) and the participles an account needs.",
        "THE decision of the module, and it is the true description of spoken German rather than a simplification: **the Perfekt is the spoken past for nearly every verb** — haben or sein in position two, the participle at the very END, which is M1's bracket again — and **sein, haben and the modals prefer the Präteritum**: war, hatte, konnte, wollte. That is exactly why L1-M5 shipped war, waren, hatte and hatten and no participle for either of them. State the split as the rule; a course that taught ich bin gewesen as the everyday past would be teaching a form Germans rarely say.",
        'The auxiliary law: sein goes with movement and change of state — gegangen, gefahren, gekommen, geblieben, aufgestanden (L1-M4 shipped that one) — and haben takes everything else. And the relief worth naming out loud, because three courses in this repo say the opposite: **the German participle never agrees with anything.** en-es, en-fr and en-it all make their participle agree in one auxiliary or the other; German simply does not, and a learner arriving from any Romance language should be told so.',
        "Participle formation is regular enough to state: ge- plus the stem plus -t for a weak verb (gemacht, gearbeitet — both L1-M5's), ge- plus a changed stem plus -en for a strong one (gegangen, gegessen, getrunken — also L1-M5's), and a separable verb wraps the ge- INSIDE it (angerufen, eingestiegen, aufgestanden). That last shape is the one place a separable verb appears in this level without a modal in front of it, and it is still one clean token, so the level's ruling holds.",
        "Nothing new is opened. The Plusquamperfekt, Konjunktiv II beyond M1's frozen könnten, the passive and reported speech all stay OUT and are named here as L3's. INDEX SEAM: zuerst, danach, schließlich, gefahren, gekommen, geblieben, angerufen, eingestiegen, verloren (M8's), gesehen, gesagt and konnte are fresh keys; each participle belongs in the forms of its verb's row where the course owns one and points back rather than editing an L1 file. war, waren, hatte, hatten, gegangen, gegessen, getrunken, gemacht, gearbeitet and gestern stay L1-M5's rows; dann, also, aber and und stay L1-M10's; weil, denn and deshalb stay L1-M9's.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
  },
  'en-ko': {
    'L1-M1': {
      id: 'L1-M1',
      title: 'Who I am',
      job: 'Introduce yourself and state what you like',
      patterns: [
        'jeo-neun + N + -ieyo/-yeyo',
        'je ireum-eun + name + -ieyo/-yeyo',
        'jeo-neun + place saram-ieyo',
        'jeo-neun + N-eul/reul + joahaeyo',
        'i-geo-neun + N + -ieyo/-yeyo',
      ],
      notes: [
        "LANGUAGE OF THE FIELDS, settled once for the course: the document speaks the course's L1, so every teaching field — rules[].text, word note, trap, sound, variations[].changed, mistake.why, usage, mnemonic and cue — is ENGLISH, and Korean appears only in the L2 slots: sentence / word / variation / mistake / pool display, and word forms. Those slots carry the ROMANIZATION (#373), never Hangul; checkScriptMode fails the build on a Hangul display or form, and the quiet Hangul line goes in script, which is typed on sentences, variations AND pool items. An English field may quote the romanization it explains. glossEn is FORBIDDEN on this course (#405): the cue is the English reading and literal the word-for-word one, and checkGlossEn fails the build on a third. Anything a gloss would have added goes in the word note. literal is needed on nearly every sentence in this course rather than occasionally: jeo-neun chaek-eul ilgeoyo is 'I-topic book-object read', and an author who skips literal is hiding the one thing that makes Korean word order learnable.",
        "THREE STRUCTURAL FACTS, all in M1, because no Korean sentence can dodge them. (a) The verb is LAST, in every clause, always — none of German's verb-second subtlety, and nothing moves it. (b) The PARTICLE marks the role, so word order carries emphasis rather than grammar: moving a noun does not change who did what. (c) The copula ATTACHES to the noun — haksaeng-ieyo is one word, not a noun plus a verb. The slogan this module attracts is 'Korean is backwards'; the law that replaces it is 'verb-final and particle-marked', and stating it that way is what makes M7's and M9's word order predictable instead of surprising.",
        'SPEECH LEVEL, settled course-wide (see the section above) and inherited by all ten modules: this course speaks the -yo style. The pronoun for I is jeo, never na, and the possessive is je — na, nae and the plain style are never WRITTEN anywhere in L1, not even on a mistake plate, so the index never carries a shape the course does not teach. -ieyo after a consonant, -yeyo after a vowel: haksaeng-ieyo, uisa-yeyo. Every sentence chips register neutral.',
        "TOPIC vs SUBJECT is NAMED here, not solved. -neun/-eun marks what the sentence is ABOUT; -i/-ga marks what is new, singled out, or the answer to a question. The honest L1 rule is exactly that much, plus the admission that the rest comes with exposure — a brief that promises a clean rule is lying, and a module that hides the distinction leaves the learner unable to read any real Korean. Introductions take -neun (jeo-neun …), which is why this module can teach it as the default and let M7's existence sentences show -i/-ga doing its own job.",
        "TWO ABSENCES ENGLISH WILL TRY TO FILL, and they are this module's cheapest wins. There are NO ARTICLES — chaek is 'book', 'a book' and 'the book', and nothing on the page tells them apart. And there is NO PLURAL MARKING in ordinary speech: chaek is also 'books' when the context says so, and -deul exists but is not taught in L1. Both are deltas, not interference: the learner has less to write, and the mistake to plate is inventing a word for 'a'.",
        "joahaeyo IS A VERB, and that is the module's one real interference. English 'like' takes an object and so does joahaeyo, but Korean marks the object with -eul/-reul and puts the verb last: jeo-neun keopi-reul joahaeyo. The trap is the M9 word joayo, which is a DESCRIBING verb meaning 'is good' and takes no object at all; keopi-ga joayo is 'coffee is good', not 'I like coffee'. Name joayo here as the thing this word is not, and let M9 open it — the two are different keys, so both rows stay reachable.",
        "INDEX SEAM, decided here and load-bearing for the whole course, and it was checked against the EMITTED index rather than reasoned out. Nouns are rows; a particle-marked shape (keopi-reul, haksaeng-i) lives in that noun's forms, exactly as en-ru's case shapes live in the forms of the row that first taught the word — Korean particles are the same kind of thing. Two consequences fall out of the emitter walking sentence → word → forms with first occurrence winning. (a) THE GUARANTEE THAT MATTERS: a row's own display is read before any longer form, so the bare key chaek belongs to the chaek row, keopi to keopi's, haksaeng to haksaeng's — and a later module writing a bare noun (keopi juseyo, hanguk saram) resolves to the right word. That is what the particle hyphen was chosen for. (b) THE PART THAT DID NOT GO TO PLAN, recorded rather than papered over: the bare PARTICLE keys — neun, eun, i, ga, eul, reul, ieyo, yeyo — are claimed by whichever host row carries that particle first (jeo-neun donates neun to the jeo row, haksaeng-ieyo donates ieyo to haksaeng's), not by the particle rows. Reordering the deconstruction to put the endings before the words they attach to would fix an index entry nobody can ever reach, at the cost of a breakdown panel that no longer reads in sentence order — so it is NOT done. It is safe precisely because Korean never writes a bare particle as its own whitespace token, and that is pinned by a test rather than assumed. The particle rows still earn their place: the deconstruction panel is read directly, not through the index, and -neun is where the learner is told what -neun does. One row per particle FUNCTION carrying both allomorphs in forms — -neun/-eun, -i/-ga, -eul/-reul — with a note true of both shapes. The demonstrative is written i-geo, never a bare i. cha is TEA and M3 owns it; the word for car is not taught in L1.",
      ],
      maxWordsPerSentence: 4,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M2': {
      id: 'L1-M2',
      title: 'First exchange',
      job: 'Greetings, wellbeing, yes/no questions',
      patterns: [
        'annyeonghaseyo',
        '<M1 statement> + ? (intonation only)',
        'ne / aniyo + , + <statement>',
        'jal jinaeseyo + ?',
        'mannaseo bangapseumnida',
        'N + -ieyo/-yeyo + ?',
      ],
      notes: [
        "annyeonghaseyo is ONE greeting for every hour of the day and for both people in the exchange — there is no good-morning / good-afternoon split to teach, which is a clean delta from every European course in the catalogue. The goodbye is where Korean asks something English never does: annyeonghi gaseyo is said to the person LEAVING and annyeonghi gyeseyo to the person STAYING, so the choice is about who walks away, not about register. Teach both as whole surfaces with one usage line; it is the module's most memorable fact.",
        "A YES/NO QUESTION IS MADE BY INTONATION ALONE. The words do not move, nothing is inserted, and the ending does not change: haksaeng-ieyo is 'you are a student' and haksaeng-ieyo? is 'are you a student?'. That is a DOUBLE delta — no inversion (German moves the verb, M2 of en-de spends a note on it) and no do-support (English builds a word that Korean has no equivalent for) — and it means the sound field is carrying grammatical information here, which no other course's M2 has to do. Write the rise explicitly in every question's sound line. INDEX CONSEQUENCE, and it is intended: surface.ts strips edge punctuation, so a question and its statement twin are the SAME index key. They are the same words; the pitch is not spelled. Say so in the review doc rather than letting a later reader file it as a bug.",
        "ne and aniyo ANSWER THE QUESTION, NOT THE FACT, and this is the module's sharpest interference. Asked haksaeng-i aniyeyo? ('aren't you a student?'), a Korean speaker says ne to mean 'that is right — I am not', where English says 'no'. English answers the fact; Korean agrees or disagrees with the asker. One sentence and one usage line is the right spend, and the mistake plate writes itself.",
        "jal jinaeseyo? is NOT the automatic greeting English makes 'how are you' into. It is a real question, asked of somebody you have not seen for a while, and answering it with a real answer is normal. A learner who greets a shopkeeper with it every morning is producing something odd, so the usage line has to say when it is used — and the module must NOT author it as the reflex second half of annyeonghaseyo. This is a place where a calque would ship fluent-looking nonsense. Changed 2026-09-05 (docs/47): the hero is now jal jinaesseoyo?, the past shape natives actually open with, taught whole; jal jinaeseyo? stays as the present-tense variation.",
        'gamsahamnida is -mnida, the formal-polite style, inside a -yo course, and mannaseo bangapseumnida is the same. Both are taught as FROZEN PHRASES with a note that says exactly that: the style they belong to is real, this course does not teach it productively, and these two are learned whole because they are what the learner will actually hear and say. Naming the exception is what keeps the register decision honest; leaving it unnamed is what makes a later module drift.',
        "INDEX SEAM: take jal jinaeseyo as ONE two-token surface. A multi-token surface does NOT donate its individual tokens (checked: surfaceIndexKeys of a two-token surface returns only the whole and any hyphen parts), so jal stays free for M4's jal jayo and M9's jal haeyo, exactly as en-de's Guten Morgen frees morgen. annyeonghaseyo, annyeonghi gaseyo and annyeonghi gyeseyo are three whole surfaces; the bare annyeong is the plain-style hello and is never written. ne and aniyo are bare one-token rows with no rivals later in the course.",
      ],
      maxWordsPerSentence: 4,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M3': {
      id: 'L1-M3',
      title: 'Needs and wants',
      job: "Say what you want and don't want",
      patterns: [
        'N-eul/reul + juseyo',
        'V-go sipeoyo',
        'N-i/ga + isseoyo',
        'N-i/ga + eopseoyo',
        'an + V-ayo/-eoyo',
        'N-do + juseyo',
      ],
      notes: [
        "juseyo is the everyday shape of asking for anything — mul-eul juseyo, keopi-reul juseyo — and it is the honorific -si- appearing for the second time (annyeonghaseyo was the first). Teach it whole, note that the -se- inside it is the same piece, and say plainly that the productive rule is a later level's. That is the register decision doing its job: the phrase is authored, the system is deferred, and the note says which is which. Changed 2026-09-05 (docs/47): the heroes now say mul juseyo, keopi du jan juseyo — the object marker is optional in a short spoken request, kept on a variation, and still taught by M1's -eul row.",
        "-go sipeoyo attaches to the VERB STEM, not to a finished word: meokda gives meokgo sipeoyo, gada gives gago sipeoyo. The object still comes first and the whole construction still lands at the end of the clause — jeo-neun bap-eul meokgo sipeoyo, literally 'I-topic rice-object eat-want'. Carry literal on every one of them; the order IS the lesson, and it is M1's verb-final law being paid off rather than a new rule. Changed 2026-09-05 (docs/47): the hero is bap meokgo sipeoyo; jeo-neun is the variation, and from M3 on one jeo-neun hero per module is kept as the contrastive case.",
        "isseoyo / eopseoyo IS THE MODULE'S BIG IDEA: one pair of verbs covers 'there is / there isn't' AND 'I have / I don't have'. English splits those into two constructions and Korean does not, which is a delta worth a rule of its own. And eopseoyo is a WORD, not a negated verb — it is not an- plus isseoyo, and a learner who builds *an isseoyo has built something ungrammatical. Both take -i/-ga on the thing that exists, which is where M1's subject particle finally does its own job rather than sitting in the shadow of -neun.",
        "NEGATION SPLITS THREE WAYS, and L1 teaches ONE. an goes in front of the verb — an meogeoyo, 'I do not eat' — and that is the course's negation. mot means unable-to for reasons outside you (mot gayo, 'I can't go'), and the long form -ji anayo says the same thing as an with a different weight. Name both as deferred, in prose, in this module, so a later module does not quietly introduce one; write neither. The slogan to kill is that Korean has one 'not' the way English does.",
        "-do means 'too' and it REPLACES the particle rather than joining it: keopi-reul juseyo becomes keopi-do juseyo, not *keopi-reul-do juseyo. English adds 'also' as a separate word and leaves everything else alone, so the interference is real and cheap to plate. It is also the module's second particle row after M1's three, and the same one-row-per-function rule applies.",
        'INDEX SEAM: cha is opened here as TEA (the collision was assigned in the section above — the word for car is not taught in L1). isseoyo and eopseoyo are two rows, each with the -yo form and, on isseoyo, the shapes M7 will reuse for location — M7 opens NO rival row, so this note must already be true of both existence and location. juseyo is one row; the phrase-level pattern N-eul/reul juseyo is not a surface. -do is its own particle row, listed before any host word that carries it, exactly as M1 ordered its three.',
      ],
      maxWordsPerSentence: 5,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M4': {
      id: 'L1-M4',
      title: 'My day',
      job: 'Daily habits and time words',
      patterns: [
        'jeo-neun + N-eul/reul + V-ayo/-eoyo',
        '<time>-e + V-ayo/-eoyo',
        'maeil + V-ayo/-eoyo',
        'achim-e / jeonyeog-e + V-ayo/-eoyo',
        'N-eul/reul + haeyo',
      ],
      notes: [
        "THE CONJUGATION THE WHOLE LEVEL RUNS ON, and the romanization makes it visible: a stem whose last vowel is a or o takes -ayo (gada → gayo, boda → bwayo), everything else takes -eoyo (meokda → meogeoyo, masida → masyeoyo), and a hada verb becomes haeyo. In Hangul this choice is buried inside a syllable block; written in Latin letters it is on the surface, which is a genuine advantage of this course's romanization and worth saying once, here. Every verb row's forms carry the shapes this course actually writes — the -yo form always, and from M5 the past of the same verb — and only shapes of that verb.",
        "ONE KOREAN PRESENT COVERS BOTH ENGLISH PRESENTS: meogeoyo is 'I eat' AND 'I am eating'. The delta to celebrate, and the interference to plate is building something for the progressive. -go isseoyo exists and is genuinely used; it is DEFERRED, named here in prose and written nowhere.",
        'SUBJECTS ARE DROPPED whenever context supplies them, and this is the module where that becomes a rule rather than a liberty. meogeoyo on its own is a whole sentence. It is the exact opposite of English and German, where the pronoun is compulsory, and it is the single most natural-sounding thing a learner can start doing — so author at least three sentences with no subject at all, and say in the notes that repeating jeo-neun in every sentence is the anglophone tell M10 will come back to.',
        'TIME: -e marks a POINT in time — ahop si-e, achim-e, jeonyeog-e — and it is the same particle M7 will use for place. That is one row, not two, and its note is written true of both from the start (M7 opens no rival). The honest exception, which every learner trips on: oneul, eoje, naeil and maeil take NO particle at all. *naeil-e is wrong. State the exception in the same note as the rule, never in a later module.',
        'hada verbs are the productive pattern that makes the module possible at this word cap: gongbu-haeyo, il-haeyo, unwundong-haeyo. Author them as single tokens (gongbuhaeyo), because that is how they are spoken and written, and note that the noun half is a word in its own right — which is what lets M8 and M9 reuse them without a new row.',
        "INDEX SEAM: -e is opened here (time) and M7 extends it (place) with no second row. bam is opened here as NIGHT; the chestnut reading is not taught. The verb rows opened here — gayo, meogeoyo, masyeoyo, ilgeoyo, jayo — are the rows M5's past forms attach to, so their notes must be written to survive that: 'the -yo form of X' rather than 'the present of X'. jal is still free here (M2 spent it inside a two-token surface) and is opened as the adverb in jal jayo.",
      ],
      maxWordsPerSentence: 5,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M5': {
      id: 'L1-M5',
      title: 'Yesterday',
      job: 'Past tense — the first big divergence',
      patterns: [
        'jeo-neun + V-asseoyo/-eosseoyo',
        'eoje + V-asseoyo/-eosseoyo',
        'N + -ieosseoyo/-yeosseoyo',
        'an + V-asseoyo/-eosseoyo',
      ],
      notes: [
        "THE PAST IS AN INFIX, NOT AN AUXILIARY. -at-/-eot- goes INSIDE the word, before the ending: meogeoyo → meogeosseoyo, gayo → gasseoyo, haeyo → haesseoyo. Nothing is added in front — no have, no did, no was. Every European course in this catalogue teaches a past built from two words, so an author coming off en-de's Perfekt or en-fr's passé composé will reach for one; say explicitly that there is nothing to reach for. The mistake plate is a learner hunting for the Korean word for 'did'.",
        "IT IS THE SAME STEM RULE AS M4, APPLIED TWICE. The vowel that chose -ayo or -eoyo in the present chooses -asseoyo or -eosseoyo in the past, so a learner who has M4's rule already has this one. Frame it that way in the note — one rule, two tenses — rather than as a new paradigm to memorise. This is the module where the romanization pays off most visibly, because the a/eo choice is right there in the spelling on both forms.",
        "NO PERFECT / PRETERITE SPLIT. Korean has ONE everyday past, and it does the work English divides between 'I ate', 'I have eaten' and 'I did eat'. After German's haben/sein choice and French's auxiliary rules this is a genuine relief, and naming it as a relief is worth more than leaving it unsaid — a learner braced for a choice will invent one.",
        "The copula has its own past — haksaeng-ieosseoyo, uisa-yeosseoyo — built the same way from M1's -ieyo/-yeyo, so it is the same rule a third time rather than a fourth thing. Negation is unchanged: an sits in front of the verb exactly as it did in M3, and the infix does not move it.",
        "INDEX SEAM, and it is the one to verify against the emitted index rather than reason about: a past form goes in the FORMS of the M4 row that taught the verb, because it is the same verb — never a new row. gasseoyo belongs to M4's gayo row, meogeosseoyo to meogeoyo's. Read public/content/en-ko/index/L1-M5.json and confirm each past key points at the M4 sentence that opened the verb; if one opened a row of its own, the module is wrong, not the index. eoje is a bare row of its own with no rival.",
      ],
      maxWordsPerSentence: 5,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M6': {
      id: 'L1-M6',
      title: 'Tomorrow',
      job: 'Future and plans',
      patterns: [
        'naeil + V-(eu)l geoyeyo',
        'jeo-neun + <place>-e + gal geoyeyo',
        'naeil + V-ayo/-eoyo',
        'naeil + V-go sipeoyo',
      ],
      notes: [
        "THE PRESENT PLUS A TIME WORD ALREADY IS A FUTURE: naeil gayo is 'I'm going tomorrow' and nothing further is needed. Teach that first, because it is free — the learner already has M4's forms — and it is what Korean speakers actually say for a settled plan. The delta is the same one German reaches by a different road, and it is worth naming the parallel for an author coming off #361.",
        "-(eu)l geoyeyo IS A NOUN-PHRASE CONSTRUCTION, NOT A MODAL, and that is the module's law. It is built from a verb form plus geot ('thing') plus M1's copula, which is why it ENDS in -yeyo: gal geoyeyo is, piece by piece, 'it is a thing-that-will-be-gone'. English 'will' is a modal that sits in front of the verb and changes nothing else; a learner looking for the Korean word for 'will' is looking for a word that does not exist. Carry literal on these lines and let M1's copula do the explaining.",
        "The stem rule is one line and must be stated exactly: -l geoyeyo after a vowel (gada → gal geoyeyo), -eul geoyeyo after a consonant (meokda → meogeul geoyeyo). It is the same shape of choice as -ieyo/-yeyo and -ayo/-eoyo, so it is the level's pattern for a third time rather than an exception.",
        'DEFERRED, named here and written nowhere: -gess- (the other future, and the one an intermediate learner meets in weather reports) and -(eu)llae yo (the offering / intending one). Naming them is what stops a later module reaching for one; writing one would put a shape in the index the course cannot explain.',
        "INDEX SEAM: naeil is a bare row and takes NO particle (M4's exception, restated). geoyeyo is its own row, and its note says what it is made of, because a learner will tap it. gal is a form of M4's gayo row, not a new row — verify that against the emitted index the way M5's past forms are verified.",
      ],
      maxWordsPerSentence: 6,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M7': {
      id: 'L1-M7',
      title: 'Where things are',
      job: 'Locations and prepositions',
      patterns: [
        'N-i/ga + <place>-e + isseoyo',
        'N-eun/neun + eodi-e + isseoyo + ?',
        '<place>-eseo + V-ayo/-eoyo',
        'N-i/ga + <N> wi-e / ap-e / yeop-e + isseoyo',
      ],
      notes: [
        "THIS IS THE MODULE WHERE ENGLISH PREPOSITIONS STOP EXISTING, and the -e / -eseo split is the level's second-sharpest interference after M3's negation. -e marks where something IS or where it is GOING; -eseo marks where an action HAPPENS. hakgyo-e isseoyo is 'I am at school'; hakgyo-eseo gongbuhaeyo is 'I study at school'. English uses 'at' for both, so the learner has no signal at all until this note gives them one. The test is not the place, it is the verb: existence and motion-toward take -e, an activity takes -eseo.",
        "POSITION WORDS ARE NOUNS, NOT PREPOSITIONS. wi, arae, ap, dwi and yeop follow their noun and then take -e themselves: chaeksang wi-e is 'desk top-at', literally the opposite order to 'on the desk'. That is M1's particle-marked law doing something new, not a fresh rule, and framing it that way is what makes it stick. Author each as a two-piece surface (chaeksang wi-e) so the bare noun stays tappable.",
        "isseoyo returns from M3 and opens NO new row: the note M3 wrote already covers existence and location, which is why M3 was told to write it that way. Same for -e, opened in M4 for time and extended here to place on the same row. This is the course's cleanest demonstration of planning against the index instead of against the JSON — two modules, one row, one note that was true from the start.",
        "eodi ('where') plus M2's intonation question is the whole question pattern: eodi-e isseoyo? — no inversion, no do-support, no question word order. Note that eodi takes -e like any other place, which is why the question looks exactly like the answer with one word swapped. Changed 2026-09-05 (docs/47): the hero is keopi eodi isseoyo? — in speech both markers are dropped; the fully marked form stays as a variation and the rule names both.",
        'INDEX SEAM, and this one needs checking on the emitted index: hakgyo-e and hakgyo-eseo are two surfaces that BOTH donate the bare key hakgyo, and only the first one written owns it. Decide the order deliberately, put the fuller note on whichever row appears first, and quote the emitted entry in the review. wi, ap, yeop and dwi each get a row through their two-piece surface. -eseo is its own particle row, listed before any host that carries it.',
      ],
      maxWordsPerSentence: 6,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M8': {
      id: 'L1-M8',
      title: 'Numbers & shopping',
      job: 'Prices, quantities, buying',
      patterns: [
        'N + <number> + <counter> + juseyo',
        'eolmayeyo + ?',
        'N-eun/neun + <number> won-ieyo',
        'myeot + <counter> + ?',
      ],
      notes: [
        "TWO NUMBER SYSTEMS, AND THE MODULE HAS TO BE HONEST ABOUT IT. Sino-Korean (il, i, sam, sa, o …) counts money, minutes, dates and anything written; native Korean (hana, dul, set, net, daseot …) counts THINGS and hours. Nothing in English prepares a learner for a language with two complete numeral sets divided by job, and no other course in this catalogue carries a comparable load. The slogan to kill is 'just learn the numbers'; the law is that the JOB picks the system.",
        "COUNTERS ARE OBLIGATORY and the order is noun–number–counter: keopi du jan ('coffee two cups'), sagwa se gae, chingu du myeong. English can say 'two coffees'; Korean cannot. Teach -gae (things), -myeong (people), -jan (cups) and -si (hours) and no more — the cap will not stand for more.",
        'THE FIRST FOUR NATIVE NUMERALS SHRINK BEFORE A COUNTER: hana → han, dul → du, set → se, net → ne. It is not optional and it is not a dialect thing. Every counted phrase in the module uses the short form, and the full form appears only when counting alone. Both shapes live in the forms of ONE row per numeral, because they are the same word.',
        'THE CAP WILL BIND HERE, harder than anywhere else in the level: every numeral, every counter and won are all new surfaces. Plan the module against newWordCap BEFORE authoring. If it binds, cut the number of SENTENCES that need fresh numerals — never cut the honesty of the two-system rule, and never teach a counter without its numerals.',
        "INDEX SEAM: the Sino-Korean i ('two') must NOT be written bare, because M1's subject-particle row owns the key i and first occurrence wins — so prices are authored as whole numerals (icheon-won, ocheon-won) and bare Sino numerals stay out. du, se and ne are opened here with their long forms in the same row's forms. won is its own row. eolmayeyo is one surface built on M1's copula, and its note says so.",
      ],
      maxWordsPerSentence: 6,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M9': {
      id: 'L1-M9',
      title: 'Feelings & opinions',
      job: 'Why — because and so',
      patterns: [
        'N-i/ga + joayo / masisseoyo',
        'wae + V-ayo/-eoyo + ?',
        '<stem>-aseo/-eoseo + <clause>',
        'geuraeseo + <clause>',
        'jeo-neun + N-eul/reul + joahaeyo',
      ],
      notes: [
        "KOREAN ADJECTIVES ARE VERBS, and this is the module's headline. joayo is 'is good' — it conjugates with the same -ayo/-eoyo endings M4 taught, it takes the past -asseoyo M5 taught, and it takes NO copula in front of it. keopi-ga joayo is a complete sentence. The interference is severe because it lands straight on M1's copula rule: an English speaker reaches for -ieyo and produces *keopi-ga joeun-ieyo, which is not a near miss. The slogan is 'adjectives need is'; the law is that Korean's describing words ARE verbs and conjugate like them.",
        "joayo vs joahaeyo is the collision this module has to keep straight, and M1 already owns half of it. joahaeyo is transitive and takes -eul/-reul (jeo-neun keopi-reul joahaeyo, 'I like coffee'); joayo is a describing verb and takes -i/-ga on the thing being described (keopi-ga joayo, 'coffee is good'). They are different keys, so both rows are reachable — but each note must say what the OTHER one is, or a learner will read one and use the other.",
        "-aseo/-eoseo PUTS THE REASON FIRST. It attaches to the verb stem, the reason clause comes before the result, and the ending carries no tense of its own — the tense sits on the final verb: bappaseo mot gayo would be 'being busy, I can't go', and in this course's negation policy that is written with an rather than mot. English can put 'because' either side; Korean cannot move this one. Carry literal on every one of them.",
        "geuraeseo is the sentence-initial pair to -aseo: it starts a NEW sentence and means 'so, that's why'. One clause ending, one connector, same relationship — teaching them together is what makes M10's turns possible. wae ('why') plus M2's intonation is the question, and the answer is the -aseo clause.",
        "INDEX SEAM: mal is opened here as WORD (the horse reading stays out of L1 — assigned in the section above). joayo opens its own row here and its note names joahaeyo; M1's joahaeyo row already names joayo, so the pair is covered from both sides. masisseoyo is one row (it is built from mat plus isseoyo historically, but it is learned whole and the pieces are not taught). geuraeseo is a bare row with no rival.",
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M10': {
      id: 'L1-M10',
      title: 'Connected talk',
      job: 'Short 2–3 sentence exchanges',
      patterns: [
        '<sentence> + . + geurigo + <sentence>',
        '<sentence> + . + hajiman + <sentence>',
        '<question> → <answer> + . + geuraeseo + <reason>',
        '<stem>-go + <clause>',
      ],
      notes: [
        "Each item is a TURN of two or three short sentences — a question and its answer, or a statement, a reason and a follow-up — not one long sentence. The per-sentence bound applies to each sentence inside the turn. Korean's eojeol spacing means these turns stay short in tokens even when they say a lot, so prefer three real sentences to two padded ones.",
        "THE RECOMBINATION LAW: Korean joins clauses in two places and the module must keep them apart. A SENTENCE CONNECTOR starts a new sentence — geurigo ('and'), geuraeseo ('so'), hajiman ('but') — while a CLAUSE ENDING joins inside one sentence: -go ('and then', on the stem) and M9's -aseo/-eoseo ('because'). Same relationships, two grammatical places, and choosing the wrong one is what makes a turn read as translated rather than spoken.",
        'PRO-DROP IS THE NATURALNESS MARKER, and this is the module that enforces it. M4 introduced dropping the subject; here it becomes the rule across a whole turn — jeo-neun appears in the FIRST sentence of a turn at most, and usually not at all. Repeating it in every sentence is the anglophone tell, and a turn that repeats it is wrong even though every sentence in it is grammatical. Author at least half the turns with no explicit subject anywhere.',
        "SPEECH LEVEL HOLDS ACROSS THE WHOLE TURN. One -mnida ending inside a -yo turn is audible, and the frozen phrases from M2 are the only place it appears. This is now a within-item consistency problem rather than a between-module one, which is exactly why it is worth restating in the last module's brief.",
        "hajiman and geureonde both translate as 'but', and the difference is worth one line and no more: hajiman contrasts, geureonde changes the subject or softens into a new topic. Write hajiman in the displays and name geureonde in prose — a second connector for the same job would spend words the cap needs elsewhere. Withdrawn 2026-09-05 (docs/47): the displays now write geunde, the everyday 'but' a speaker actually hears; hajiman and geureonde are forms on the same geunde row and named in its note.",
        "Language of the fields holds to the last turn: ENGLISH in every teaching field, the ROMANIZATION in every L2 slot, Hangul only in script, glossEn on every sentence, and literal wherever a turn's order moves — which, with two clauses and a verb at the end of each, is most of them.",
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M1': {
      id: 'L2-M1',
      title: 'Asking politely',
      job: 'Requests, thanks, apologies in the right register',
      patterns: [
        'jom + N-eul/reul + juseyo',
        'V-a/eo + juseyo',
        'V-(eu)seyo',
        'V-(eu)l su isseoyo?',
        'gomawoyo / gamsahamnida',
      ],
      notes: [
        'SPEECH LEVEL AND HONORIFICS, decided for the whole level and repeated here because a prompt only ever shows an author the notes (full record: docs/60-en-ko-L2-brief-decisions.md; the eight L1 decisions carry unchanged — Revised Romanization, pure ASCII, no stress marks ever, the particle hyphen with the host keeping its isolation shape, jeo never na, Hangul only in script). L1 settled the speech level: this course speaks the -yo style, the plain style is never written, and -mnida appears in two frozen phrases. That is not reopened. What this module adds is the OTHER axis: the honorific -si-, which raises the SUBJECT of the sentence rather than the listener.',
        'L1 shipped -si- inside five whole phrases — annyeonghaseyo, juseyo, gaseyo, gyeseyo, jinaeseyo — with the rule named as deferred. This module makes it productive: -(eu)seyo is -si- plus -eoyo, so anjeuseyo, gidaryeojuseyo and malsseumhaseyo are buildable rather than memorised. THE mistake block: the honorific is about the person the sentence is ABOUT, so a learner never uses it of themselves. jeo-neun gayo is right and jeo-neun gaseyo is wrong, and an English speaker who has learnt that -(eu)seyo means polite will get this backwards on their first try.',
        "The request itself is -a/eo juseyo, literally do-it-and-give-me: dowajuseyo (please help), gidaryeojuseyo (please wait), sseojuseyo (please write it). juseyo is L1-M3's row and each fused form is its own single token, so the new rows point back at it rather than re-teaching it. jom is the softener that goes in front of almost any request, and it is the single most useful politeness word in the language: literally a little, functionally please. The softer alternative is the ability question, V-(eu)l su isseoyo, which is L1-M6's -l shape doing a new job.",
        'Thanks and apology finally get their -yo forms, which pays off the speech-level decision visibly: gomawoyo is the -yo thanks and gamsahamnida (L1-M2) is the frozen formal one, so the learner sees the two levels side by side for the first time and can be told which is which. Apology splits the same way, mianhaeyo against joesonghamnida, and gwaenchanayo (it is fine) answers both. The chip: a line whose subject is honoured chips `formal`, plain -yo stays `neutral`, and `informal` is NEVER used in this course, because the forms that would earn it are banmal, which L1 banned and this level does not lift. Say that, so a value missing on purpose reads as deliberate.',
        "INDEX SEAM: jom, dowajuseyo, gidaryeojuseyo, sseojuseyo, anjeuseyo, malsseumhaseyo, gomawoyo, mianhaeyo, joesonghamnida, gwaenchanayo, su and -(eu)seyo are fresh keys. juseyo stays L1-M3's row, gamsahamnida stays L1-M2's frozen phrase, and annyeonghaseyo, gaseyo and gyeseyo stay L1-M2's. Every fused request form is ONE whitespace token and therefore one clean key; do not hyphenate it, because the hyphen in this course is reserved for a particle boundary and would mint the junk key juseyo twice over.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M2': {
      id: 'L2-M2',
      title: 'Describing people',
      job: 'Appearance, character, relationships',
      patterns: [
        'N-eun/neun + N-i/ga + Adj-verb-yo',
        'N-eun/neun + Adj-verb-yo',
        'Adj-(eu)n + N',
        'je + N-eun/neun + N-ieyo',
        'N-kkeseo + gyeseyo',
      ],
      notes: [
        "THE structure of the module, and Korean's signature sentence: the DOUBLE SUBJECT. jeo-neun ki-ga keoyo means I am tall, and it is built as for-me, the-height is-big — a topic, then a subject, then a predicate. English has no version of this and every learner tries to build I-am-tall with a copula instead. L1 already shipped the pieces (L1-M9's joayo, masisseoyo, bappayo are all descriptive verbs, and L1-M1's -eun/-neun and -i/-ga are the particles), so the sentence is assembly rather than new grammar. Say so and spend the mistakes on the shape.",
        'Korean adjectives ARE verbs, which is the fact that makes the sentence above possible: keoyo, jagayo, yeppeoyo, chinjeolhaeyo conjugate exactly like action verbs and need no copula at all. L1 taught four of them without naming the class. Name it, and then teach the attributive form the class needs to modify a noun: -(eu)n turns a descriptive verb into a modifier that goes BEFORE the noun — keun jip, joeun chingu, yeppeun saram. M3 walks the same ending at length.',
        "The family set is where Korean is richer than English and the delta runs the other way, so the module must not present it as extra vocabulary to memorise: hyeong and nuna are what a MAN calls his older brother and sister, oppa and eonni are what a WOMAN calls hers, and there is no word for older brother that does not encode the speaker's own gender. dongsaeng covers a younger sibling of either. Author the four in one screen with the speaker named in each cue, or the learner will file them as synonyms.",
        "Honorific kinship and the honorific of existence: eomeoni and abeoji are the respectful words and eomma and appa are what a child says; -nim raises a title (L1-M1's seonsaengnim is already one); and gyesida is the separate honorific verb for a person being somewhere, which L1-M2 shipped as gyeseyo. That is M1's decision in the field — four verbs have a whole different honorific word rather than an infix — so point back at L1-M2's row and at M1's rule instead of opening anything.",
        "INDEX SEAM: keoyo, keun, jagayo, jageun, yeppeoyo, yeppeun, chinjeolhaeyo, ki, meori, nun, hyeong, nuna, oppa, eonni, dongsaeng, eomeoni, abeoji, eomma, appa, gajok and -(eu)n are fresh keys. nun is the eye here and the snow reading stays OUT of the course, which is L1's homograph discipline continued. joayo, masisseoyo, bappayo and pigonhaeyo stay L1-M9's rows; gyeseyo stays L1-M2's; seonsaengnim, ssi, saram and chingu stay L1-M1's; je and jeo stay L1-M1's. Each descriptive verb's attributive shape belongs in the SAME row's forms as its -yo shape, because they are one word.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M3': {
      id: 'L2-M3',
      title: 'Describing things',
      job: 'Size, colour, quality — agreement at length',
      patterns: [
        'N-eun/neun + Adj-verb-yo',
        'N-i/ga + Adj-verb-yo',
        'Adj-(eu)n + N + -eul/reul + V-yo',
        'Adj-verb-go + Adj-verb-yo',
        'i-geo-neun + Adj-(eu)n + N-ieyo',
      ],
      notes: [
        "Korean marks no gender, no number and no article, so this module's job line cannot mean what it means in the Romance courses. What Korean marks instead is ROLE, on the particle, and L1 shipped every one of them across six modules without ever laying them side by side: -i/-ga, -eun/-neun, -eul/-reul, -do, -e, -eseo. This module assembles the grid. That is the honest reading of agreement at length in a language with no agreement, and it should be stated in the first note so an author does not go looking for endings that do not exist.",
        'THE distinction, and it is the hardest thing in beginner Korean because no English sentence marks it: topic -eun/-neun against subject -i/-ga. The working law, stated as what each DOES rather than as a translation. The topic sets what the sentence is about and often implies a contrast with something else (i chaek-eun bissayo — this book, at least, is expensive); the subject simply identifies who or what does or is the thing, and is what a brand-new piece of information takes (nuga wasseoyo? chingu-ga wasseoyo). Author minimal pairs, and let the pool test which particle a context wants.',
        "The attributive -(eu)n from M2 at length: ppalgan sagwa, keun jip, joeun chaek. Add -go for stacking two descriptions in one clause — keugo joayo, ssago masisseoyo — which is L1-M3's own -go (meokgo, masigo) doing a second job, so point back at that row rather than opening one. Together these two endings are what this course has instead of an adjective grid, and a module that taught them well has taught the whole of Korean description.",
        "Colours are the vocabulary spend and they are descriptive verbs like everything else, with irregular attributives worth authoring as pairs: ppalgayo / ppalgan, paraeyo / paran, norayo / noran, kkamayo / kkaman, hayayo / hayan. The other qualities: gilda / gin, jjalpda / jjalbeun, mugeoweoyo, gabyeoweoyo, ssayo, bissayo (which pays back L1-M8's price sentences). The slogan to refuse is Korean has no plurals: it has -deul, it simply does not require it, and the true rule is that number is optional and is marked only when it matters.",
        "INDEX SEAM: ppalgayo, ppalgan, paraeyo, paran, norayo, kkamayo, hayayo, gilda-shapes, ssayo, bissayo, mugeoweoyo, gabyeoweoyo and -deul are fresh keys. -i, -ga, -eun, -neun, -eul, -reul and -do stay L1-M1's and L1-M3's rows and this module re-teaches them as a system; -go stays L1-M3's; i-geo stays L1-M1's, and the bare i remains the SUBJECT PARTICLE's key, which is why the demonstrative is written hyphenated and never bare. cha stays tea (L1-M1) and the car word stays out of the course.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M4': {
      id: 'L2-M4',
      title: 'Getting around',
      job: 'Directions, transport, asking the way',
      patterns: [
        'N-e + eotteoke + gayo?',
        'N-(eu)ro + gaseyo',
        'N-eul/reul + tayo',
        'N-eseo + naeryeoyo',
        'yeogi-eseo + N-kkaji',
      ],
      notes: [
        "The particle pair L1 shipped and never contrasted: -e marks a DESTINATION or a static location (hakgyo-e gayo, jip-e isseoyo) and -eseo marks where an ACTION happens (hakgyo-eseo gongbuhaeyo). L1-M7 taught both and this is the module whose job forces the difference into the open, because a direction is a destination and a bus stop is where something happens. Point back at L1-M7's rows, state the law, and let the pool test it.",
        "-(eu)ro is the module's own particle and it means toward: oenjjok-euro gaseyo, i-jjok-euro oseyo. It is a third member of the -e / -eseo family and a learner should meet it as such rather than as an idiom. -kkaji (up to, as far as) joins it for the span from here to there, with -buteo named in usage as its partner and not shown.",
        'Riding takes an OBJECT particle, which English speakers never guess: beoseu-reul tayo, jihacheol-eul tayo — literally the bus, ride it — where English says ride ON a bus. Getting off is naerida with -eseo. Author the pair together, because they are the two halves of every journey and they take different particles for a reason the learner can see once it is pointed out.',
        "Directions reuse M1's honorific imperative in the field: gaseyo, oseyo, doraseyo, geonneoseyo, and the vocabulary oenjjok, oreunjjok, jjuk, ap, dwi, geonneopyeon, sageori, jeongnyujang, yeok. This module speaks -yo throughout with the honorific on the imperatives, chipped `formal` where the subject is the listener being honoured. Word order does the rest of the work: Korean is verb-final and a direction sentence is one long adverbial chain ending in the verb, which is exactly why this level's bound climbs to nine here.",
        "INDEX SEAM: -ro, -euro, -kkaji, tayo, naeryeoyo, oenjjok, oreunjjok, jjuk, ap, dwi, geonneopyeon, sageori, jeongnyujang, yeok, beoseu, jihacheol, taeksi, gicha, eotteoke and oseyo are fresh keys, each particle carrying its hyphen so the host noun stays free — checked against the emitted index, first occurrence winning. -e and -eseo stay L1-M7's rows; eodi and eodi-e stay L1-M7's; gaseyo stays L1-M2's; wi-e and yeop-e stay L1-M7's. Place names never index (#61), so anchor every direction on a common noun.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M5': {
      id: 'L2-M5',
      title: 'Food and hosting',
      job: 'Ordering, offering, refusing without offence',
      patterns: [
        'N + <native number> + <counter> + juseyo',
        'N-i/ga + <Sino number> + won-ieyo',
        'deo + deuseyo',
        'jal + meogeosseumnida',
        'gwaenchanayo + , + bae + bulleoyo',
      ],
      notes: [
        'THE rule of the module, and L1 shipped both halves without it: Korean has TWO number systems, and L1-M8 used native numbers with counters (han jan, du gae, se myeong) and Sino numbers for money (ocheon won, samcheon won) in the same module without saying which is which. The law: **native numbers count things and always take a counter; Sino numbers do money, minutes, dates and anything above ninety-nine.** M6 spends this immediately on the clock, where both appear in one breath. A rule that explains what a learner already has is worth three that only add.',
        "The counters this module adds to L1-M8's gae, myeong and jan: byeong for bottles, geureut for bowls, inbun for portions. A counter is not optional in Korean the way a measure word is optional in English, and the order is fixed — noun, number, counter — which is the reverse of English's number-then-noun. Author them against the food the module teaches so the drill is grammar rather than vocabulary.",
        "The honorific verb set arrives at the table, which is M1's decision made visible: meokda has a separate honorific word, deusida, so a host says deuseyo and masitge deuseyo and never *meogeuseyo. This is the clearest case of the four irregular honorifics (with gyesida, jumusida and malsseumhasida), and a table is where a learner meets it first. jal meogeosseumnida is said after eating and is a THIRD frozen -mnida phrase beside L1-M2's two: flag it as frozen in its note, exactly as they are, so the level's speech-level decision stays intact.",
        'Refusing without offence, with the cultural half stated and not moralised: in Korean hosting the offer is repeated and a bare aniyo is heard as politeness rather than as a decision, so the refusal that lands adds a reason (gwaenchanayo, bae bulleoyo). The other half a learner needs is the etiquette that has no English equivalent: the younger person pours for the older, and a glass is received with two hands. Put both in usage; no rule judges either culture.',
        "INDEX SEAM: byeong, geureut, inbun, deuseyo, deo, mani, jogeum, bae, bulleoyo, gogi, saengseon, yachae, bap-sang, mul-kkeut and sikdang are fresh keys. deo is this module's key and means more in an offer; M9's comparative points back at it rather than opening a row. bae is the belly here and the fruit reading stays OUT of the course, which is L1's homograph discipline continued. gae, myeong, jan, hana, han, dul, du, se and set stay L1-M8's rows; juseyo stays L1-M3's; bap and mul stay L1-M3's; gwaenchanayo stays M1's.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M6': {
      id: 'L2-M6',
      title: 'Making plans together',
      job: 'Invitations, suggestions, settling a time',
      patterns: [
        'gachi + V-(eu)llae-yo?',
        'eonje + V-l geoyeyo?',
        '<native number> + si + <Sino number> + bun-e',
        'N-yoil-e + sigan + isseoyo?',
        'joayo + , + geuraeyo',
      ],
      notes: [
        "-(eu)llae-yo is the invitation ending and L1 named it as deferred; plans are what it is for, so it opens here. gachi bap meogeullae-yo? is the everyday Korean invitation, and it differs from a plain question in exactly the way English let's differs from will you — it asks the listener's wish rather than a fact. No second future is opened: L1-M6's -l geoyeyo carries the plan itself, and -gess- stays deferred and is named in this note so a later author does not import it. -(eu)psida belongs to the -mnida level and travels with it, so it is named in usage and never written.",
        "THE clock, and it is where M5's number rule pays for itself in one breath: the HOUR is a native number with the counter -si and the MINUTES are a Sino number with -bun. du si samsip bun is half past two, and it uses both systems in four syllables. There is no rule beyond the one M5 stated, which is the point: this module is where a learner sees that the rule was worth learning. Author several times in a row so the fork becomes automatic.",
        "The days are a closed set built on one root — woryoil, hwayoil, suyoil, mogyoil, geumyoil, toyoil, iryoil — and -yoil is the shared ending, which makes seven words cost about two. Point that out; a learner who sees the pattern will not memorise seven. -e marks the day as well as the hour (woryoil-e, du si-e), which is L1-M7's particle doing a fourth job and needs no new row.",
        'Plans are made among friends, but this course still speaks -yo: there is no informal tier to switch to, because banmal is not written in en-ko L2 at all. So the register move here is the OPPOSITE of the other eight courses — the module stays `neutral` throughout and the friendliness is carried by the ending (-(eu)llae-yo rather than an honorific imperative) and by gachi. Say so, because an author who has read the other L2 briefs will look for a `informal` chip and must be told it is deliberately absent.',
        "INDEX SEAM: -(eu)llae-yo, gachi, eonje, sigan, si, bun, woryoil, hwayoil, suyoil, mogyoil, geumyoil, toyoil, iryoil, yoil, geuraeyo, yaksok and manayo are fresh keys. joayo stays L1-M9's row, doing sounds-good here — a second job, pointed back at, never re-opened; -l geoyeyo, gal, hal and meogeul stay L1-M6's; naeil stays L1-M6's; oneul stays L1-M4's; -e stays L1-M7's; the native and Sino numerals stay L1-M8's.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M7': {
      id: 'L2-M7',
      title: 'On the phone',
      job: 'Calls and messages — openings, closings, taking a message',
      patterns: [
        'yeoboseyo',
        'N-ssi + gyeseyo?',
        'jigeum + V-go isseoyo',
        'jamsiman-yo',
        'najunge + jeonhwahalgeyo',
      ],
      notes: [
        "yeoboseyo is how Korea answers a phone and it is M1's rule visible inside a single word: it is an honorific imperative of a verb meaning to look here. A learner told that will remember both the word and the rule; a learner given it as an unanalysable noise learns one word. The call then runs on honorifics throughout — Kim seonsaengnim gyeseyo? asks whether the teacher is (honourably) there, using the separate honorific verb L1-M2 already shipped as gyeseyo — so this module is the payoff of M1's whole decision and chips `formal` on every honoured-subject line.",
        "-go isseoyo, the progressive, opens here, and L1 named it as deferred for exactly this moment: a call is happening NOW. jigeum bap meokgo isseoyo, jeonhwahago isseoyo. The -go is L1-M3's own linking ending in a new frame, so point back rather than opening a family. The delta worth stating: Korean's plain -yo present already covers a habitual action, so -go isseoyo is reserved for what is genuinely in progress — the same restriction en-it puts on its gerundio, while en-fr and en-de have no progressive at all.",
        "Absence uses the negation the course already owns: an gyeseyo (L1-M3's an) — literally is-not honourably-present — which is how a Korean office says he is not in. Note that the honorific stays even in the negative and even about someone absent, because it is about the person, not the situation. jamsiman-yo (one moment) is the hold, and it is a noun with -yo stuck on, which is worth one line: -yo also politens a fragment, not only a verb.",
        "Taking a message needs no new tense: memo, jeonhwa beonho, jeonhwahaesseoyo (L1-M5's past). Reported speech (-dago) is L3's and is named as deferred here, which is why a message is passed on with the words themselves. -l-geyo (najunge jeonhwahalgeyo, I'll call later) is a promise ending built on L1-M6's -l shape; teach it as one item, not as a system.",
        "INDEX SEAM: yeoboseyo, jeonhwa, jeonhwahaeyo, beonho, memo, jigeum, jamsiman-yo, najunge, -go isseoyo and -l-geyo are fresh keys. gyeseyo stays L1-M2's row, an stays L1-M3's, -go stays L1-M3's, ssi and seonsaengnim stay L1-M1's, -eoss- stays L1-M5's. jamsiman-yo carries a hyphen at a real morpheme boundary, so the index also holds jamsiman and yo — check the emitted index rather than assuming, as L1's decision 2 requires.",
      ],
      maxWordsPerSentence: 9,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M8': {
      id: 'L2-M8',
      title: 'When something goes wrong',
      job: 'Problems, asking for help, complaining calmly',
      patterns: [
        'N-i/ga + an + dwaeyo',
        'N-eul/reul + ireobeoryeosseoyo',
        'N-i/ga + apayo',
        'mot + V-yo',
        'V-eoya + dwaeyo',
      ],
      notes: [
        "mot opens here, and L1 named it as deferred with one mention: it is the INABILITY negative, and it pairs cleanly with L1-M3's an. The law in one line: an is do not or will not, mot is cannot. mot gayo means something is stopping me and an gayo means I am choosing not to, and English's single can't and won't hide the difference. This is the module's first mistake block, and a problem report is the only place in the ladder where both are needed in the same breath.",
        'Pain and malfunction both use the double-subject sentence M2 taught: meori-ga apayo (my head hurts, literally as-for-me the-head hurts) and i-geo-ga an dwaeyo (this does not work). apayo is a descriptive verb like everything in M2 and M3, so the module opens no new class — it applies one. Say so; a learner who sees the third use of a structure learns it, and a learner given three idioms learns three.',
        "-eoya dwaeyo is the obligation ending: gayaa dwaeyo, gidaryeoya dwaeyo. It is built on the same -a/-eo stem the course has been conjugating since L1-M4, so the shape is familiar and only the frame is new. Paired with M1's dowajuseyo and the ability question V-(eu)l su isseoyo, that is the whole kit a problem needs, and no new tense is opened.",
        "Complaining calmly, and Korean's answer is the honorific rather than the hedge: the softening comes from jom (M1's), from joesonghajiman (I am sorry but), and from keeping the honorific on the person you are complaining TO. Raising your voice with a stranger is a heavier breach in Korean than in English, and the repair is the ending, not the volume. State that in usage, without judging either language, and let the mistake block show the too-blunt version rather than the over-hedged one.",
        "INDEX SEAM: mot, dwaeyo, an-dwaeyo-shapes, gojang, ireobeoryeosseoyo, apayo, apeun, dachyeosseoyo, byeongwon, yak, joesonghajiman and -eoya are fresh keys. an stays L1-M3's row and this module's note must be true of the an / mot pair without editing it. meori stays M2's, jom stays M1's, dowajuseyo stays M1's, -eoss- stays L1-M5's, -i and -ga stay L1-M1's.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M9': {
      id: 'L2-M9',
      title: 'Comparing and choosing',
      job: 'More, less, better — stating a preference',
      patterns: [
        'A-neun/eun + B-boda + Adj-verb-yo',
        'A-neun/eun + B-boda + deo + Adj-verb-yo',
        'N + jung-eseo + gajang + Adj-(eu)n + N',
        'eoneu + N-i/ga + deo + joayo?',
        'jeo-neun + N-eul/reul + deo + joahaeyo',
      ],
      notes: [
        "-boda is the comparison particle and the WORD ORDER is the delta: it attaches to the thing compared AGAINST, and that phrase comes first — Seoul-i Busan-boda keoyo, literally Seoul, than-Busan, is-big. English puts the standard last (bigger than Busan) and Korean puts it in the middle before the predicate, which is where a verb-final language puts everything. deo (more) is optional and usually present; it is M5's row doing its second job, so this module points back rather than opening one.",
        "The superlative is gajang or jeil in front of the descriptive verb — gajang keoyo, jeil masisseoyo — with the group marked by jung-eseo (among). Both words mean the same thing and jeil is the more colloquial; say that rather than inventing a distinction. Nothing declines and nothing agrees, which is the relief this course keeps offering and should keep naming: Korean's difficulty is in the particles and the endings, never in the shapes of its adjectives.",
        "The topic particle does a second job here and it is the one that finally explains it: -eun/-neun marks CONTRAST, which is exactly what a comparison is. i-geo-neun bissayo, geugeo-neun ssayo — this one is expensive, that one is cheap. M3 taught the topic/subject distinction as a law; this module is where a learner sees why it was worth the trouble. Point back at M3's rows and add no new particle for contrast.",
        "Stating a preference: deo joahaeyo (like more) is how Korean says prefer, on L1-M1's joahaeyo row — there is no separate verb, which is the mirror image of en-de's lieber and worth naming as such. Choosing needs eoneu (which) and geot / geo (thing, and L1-M1's i-geo already contains it), plus -hago for joining two options. eoneu is a sibling of L1-M9's wae and L1-M8's myeot: cross-reference all three and merge none.",
        "INDEX SEAM: -boda, gajang, jeil, jung-eseo, eoneu, -hago, deol, geugeo and geot are fresh keys. deo stays M5's row; joahaeyo and i-geo stay L1-M1's; -eun and -neun stay L1-M1's; joayo stays L1-M9's; bissayo and ssayo stay M3's. -boda carries its hyphen at a particle boundary like every other particle in this course, so the index holds boda as well and the bare host stays free — the guarantee the hyphen was chosen for.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
    'L2-M10': {
      id: 'L2-M10',
      title: 'Telling what happened',
      job: 'A four-sentence account in the past',
      patterns: [
        'meonjeo + V-eosseoyo',
        'geu daeum-e + V-eosseoyo',
        'V-go + V-eosseoyo',
        'V-aseo/eoseo + V-eosseoyo',
      ],
      notes: [
        "Each item is an ACCOUNT of exactly four short sentences, not one long one, and the per-sentence bound applies to each sentence inside it. The past is L1-M5's -eoss- and no new tense is opened; the honest new spend is the sequencers — meonjeo, geu daeum-e, machimnae — beside L1-M10's geurigo and hajiman.",
        'THE lesson of the module, and it is not a tense: Korean drops every subject once the topic is set, far more thoroughly than Spanish drops a pronoun. A four-sentence account in Korean names the speaker once, in the first clause, and then says nothing about who is doing anything for three more sentences — and a learner who repeats jeo-neun four times has written something that reads as insistent or as a list of unrelated facts. State it as the rule the account is built on and let the pool test the version with too many pronouns.',
        "-aseo/-eoseo does a second job here and it is worth its own rule: L1-M9 taught it as because, and in a narrative it also means and then, for two events where the first leads into the second — sijang-e gaseo gwa-reul sasseoyo (I went to the market and bought fruit). The neighbouring ending -go simply joins two events with no such link. Point back at L1-M9's row rather than opening a second one, and author a minimal pair so the difference is visible.",
        "Korean has no perfect / imperfect split, which is worth saying out loud because four other courses in this repo spend their whole M10 on one: -eoss- covers everything English divides between the past simple and the present perfect, and it also carries a RESULT reading — gasseoyo can mean has gone and so is not here. That is the only subtlety, and it is one sentence's worth. What replaces the aspect lesson is the zero-anaphora lesson above.",
        "Nothing new is opened. -deon, the double past -eoss-eoss-, reported speech -dago and the plain style all stay OUT and are named here as L3's. INDEX SEAM: meonjeo, geu, daeum, geu daeum-e, machimnae, sasseoyo, gasseoyo (L1-M6's gal family in the past) and the -eoss- cells an account needs are fresh keys, each pointing back at its verb's row rather than editing an L1 file. -eoss- and its shipped cells stay L1-M5's; -aseo and -eoseo stay L1-M9's; -go stays L1-M3's; geurigo, hajiman, geunde and geureonde stay L1-M10's; eoje stays L1-M5's.",
      ],
      maxWordsPerSentence: 10,
      newWordCap: NEW_WORD_CAP,
    },
  },
};
