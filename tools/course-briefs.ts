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
 * Seven courses are briefed: hi-mr through L2, and en-es, en-ar, hi-en, en-ru, en-it and en-fr L1
 * only. The
 * L2/L3 module lists are RATIFIED (#112 closed [Q1] — titles, jobs and sequence in levels.json
 * are final), and a level's briefs are written when its authoring project starts: a brief encodes
 * pattern-and-interference pedagogy that should be planned against the verified ladder below it,
 * not ahead of it. hi-mr's L2 briefs (#295) are the first written to that rule — planned against
 * the finished L1 index (215 surfaces through L1-M10) and the L1 review chain; hi-mr's L3 waits
 * for a verified L2. en-ar's, hi-en's, en-ru's, en-it's and en-fr's own L2/L3 lists are still
 * placeholder text
 * (PRD §5) and are not briefed either. The CLI says exactly this when asked for a course or
 * module without a brief.
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
 *    and `po` are untouched by them — so en-it's get theirs too.
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
 * ## hi-en: the four decisions a brief must settle before any English is written
 *
 * hi-en (#267–#273) is the first course whose L2 is the language these briefs — and hi-mr's own
 * module notes — are written in. That inverts one habit and exposes two index seams the other three
 * courses never met, so the decisions are stated once here and repeated in the notes, because a
 * prompt only ever shows an author the notes.
 *
 * ### 1. The language of every field — Hindi teaches, English is the thing taught
 *
 * The language law (#186/#196, `src/langLaw.test.tsx`): the document speaks the course's L1 (`hi`),
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
 * - **`glossEn` is OMITTED on every hi-en sentence.** #268 made it optional where `l2Tag` is `en`
 *   and the build (`checkGlossEn`) still requires it for every other L2; an English gloss of an
 *   English line is the hero line twice, and Sentence Detail drops the paragraph when the key is
 *   absent.
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
 *   where a contraction is impossible (`Yes, I am`: sentence-final `am` never contracts) or where the
 *   uncontracted word IS the module's lesson (M1's `I am a student`, because `am` is what M1 teaches;
 *   M6's `I will go`, because `will` is; M5's `was not`, because `was` is).
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
 * 215 surfaces through L1-M10, maxSpan 1, rebuilt and read rather than remembered — and against
 * the L1 review chain (docs/08 open questions 1–22, docs/15 23–30, docs/19 31–40, docs/23
 * 41–48). The four decisions below are hi-mr L2's equivalents of hi-en's four, recorded in
 * `docs/26-hi-mr-L2-brief-decisions.md` and repeated in the notes, because a prompt only ever
 * shows an author the notes.
 *
 * ### 1. Language of fields — L2 keeps L1's split, field for field
 *
 * hi-mr writes `rules[].text` and word `note` in English, and every learner-facing line —
 * `cue`, `literal`, `trap`, `sound`, `usage`, `mistake.why`, `variations[].changed`, `mnemonic`
 * — in Hindi (Devanagari), with `glossEn` required on every sentence (the L2 is not English, so
 * #268's exemption does not apply). The English is the tolerated quirk of a course with one
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
 * (द्याल का?). The schema's register chip has exactly two values, `neutral` and `informal` — so
 * तू frames chip informal, and the formal end (कृपया, आभारी आहे) is carried by the `usage` line
 * in words. आपण stays the course's "we" (L1-M10's row): the very-formal "you" job (docs/08 Q17)
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
 * - **The schema's register chip has two values, `neutral` and `informal`** — there is nowhere for
 *   a genuine third tier to live as data, exactly the argument hi-mr's L2 briefs make about
 *   कृपया. So `Lei` would be a register the file could not label.
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
 * ## en-ru: the six decisions a brief must settle before any Russian is written
 *
 * en-ru (#338–#343) is the product's seventh course and the first written in Cyrillic. The
 * language law runs as it does in en-es and en-ar — the document speaks English (`l1Tag: en`),
 * every teaching field is English, and Russian appears only in the L2 slots — but Russian
 * diverges from English harder than either, and it diverges through INFLECTION, which is exactly
 * what a verbatim-matching word index feels. The six decisions below are settled here and
 * repeated in the notes, because a prompt only ever shows an author the notes.
 *
 * ### 1. The language of every field, and the lines a sentence carries
 *
 * `scriptMode: native`, so `display` IS the Cyrillic — there is no romanization anywhere in this
 * course, and the `script` field is UNUSED (the prompt's own Script section says so: `script`
 * exists for a romanized course's quiet native line, and a native course has nothing to put
 * under itself). Every teaching field — `rules[].text`, word `note`, `trap`, `sound`,
 * `variations[].changed`, `mistake.why`, `usage`, `mnemonic`, `cue` — is ENGLISH, and may quote
 * Cyrillic inside English prose. Russian appears in sentence / word / variation / mistake / pool
 * `display` and in word `forms`, and nowhere else.
 *
 * - **`glossEn` is REQUIRED on every sentence.** #268's exemption is for a course whose L2 IS
 *   English (hi-en); Russian is not, so the gloss is mandatory and the build enforces it.
 * - **`literal` is the workhorse of this course.** Russian says whole sentences with words English
 *   does not have and drops words English cannot drop, so write the Russian words in English
 *   order under any sentence whose construction is not word-for-word: `Меня зовут Иван` →
 *   "me they-call Ivan"; `Мне нравится Москва` → "to-me pleases Moscow"; `У меня есть книга` →
 *   "at me is book"; `На столе есть книга` → "on table is book". Hyphenate a multi-word English
 *   gloss of one Russian word, as en-es hyphenates `call-myself`: `я встаю` → `I get-up`.
 * - **Stress is NOT written.** Normal Russian text carries no stress marks, and an acute accent
 *   would be a codepoint the index has to match forever — `кни́га` and `книга` are two different
 *   surfaces. So no sentence, word, form, variation, mistake or pool item ever writes one. Where
 *   stress is worth teaching it goes in `sound`, in English words ("KNEE-ga").
 *
 * ### 2. Register: `вы` is the course-wide default, and `ты` stays OUT of L1
 *
 * Russian forces a choice English never makes, on every sentence addressed to somebody. The
 * decision, taken for the whole course:
 *
 * - **Every second-person line in L1 uses `вы`** — the polite/plural address: `Как вас зовут?`,
 *   `Вы хотите чай?`, `У вас есть хлеб?`, `Дайте, пожалуйста`. `вы` is the survival register: a
 *   learner meets strangers, shop assistants and hosts long before friends, and `ты` to a
 *   stranger is a rudeness English has no way to commit by accident.
 * - **`ты` never appears in a `display` line in L1.** It is named in prose — the notes say it
 *   exists, that it takes its own verb endings, and that choosing it is L2's job — so the learner
 *   is told the truth about the fork without being asked to write on both sides of it.
 * - The greetings follow: **`здравствуйте`** (M2), not `привет`, which is the `ты`-tier greeting
 *   and is named in a `usage` line rather than written on a hero line.
 * - **`Как дела?` is the one exemption, and honestly so**: it contains no second-person word at
 *   all — it is verbless, literally "how [are the] affairs" — so it carries no `ты`/`вы` marking
 *   to get wrong. Its fully polite expansion is `Как у вас дела?`, and M2's `usage` line says
 *   which to prefer with somebody just met.
 *
 * The false slogan here is "`вы` is just the plural of `ты`". The law: `вы` is BOTH the plural
 * and the singular-polite, and it always takes the plural verb form even when it means one
 * person — `Вы хотите чай?`, said to a single stranger.
 *
 * ### 3. The `ё` policy: always write `ё`, because the index keeps it apart from `е`
 *
 * `src/engine/surface.ts` NFC-normalises, folds the two apostrophe classes, strips edge
 * punctuation and lowercases — and that is all. It does NOT fold `ё` to `е`. Checked against the
 * real function rather than assumed: `Ё` lowercases to `ё` (Cyrillic case-folds correctly, so
 * `Меня` and `меня` are one surface), while `всё` and `все` normalise to two different keys, and
 * `пошёл` spelled `пошел` would be a word the index had never met.
 *
 * **The policy: always write `ё` where the word has `ё`** — `пошёл`, `её`, `всё`, `ещё`, `пьёшь`,
 * `встаёшь` — and never the `е`-spelling of a `ё`-word. Real Russian print usually drops the
 * diaeresis, so this is a deliberate departure, and it buys two things: one word is one surface,
 * and `всё` (everything) never merges with `все` (everybody), which are genuinely two words. Say
 * so in a `usage` or `sound` line the first time a `ё` word appears, so a learner meeting a book
 * that omits it is not ambushed.
 *
 * ### 4. Case: what L1 teaches, where, and what it defers — the course's biggest decision
 *
 * Russian has six cases and L1 cannot teach them. Teaching them badly — a declension table nobody
 * can use — is worse than teaching four of them where the ten jobs actually need them. The plan,
 * fixed here so that no module improvises:
 *
 * - **Nominative** — M1. The citation form and the subject; every word row's `display` is the
 *   nominative unless the module is teaching a shape.
 * - **Accusative, the SLOT** — M1. `Я люблю чай` is already an object sentence, but M1's liked
 *   things are chosen so the form does not move: masculine inanimate and neuter nouns are
 *   identical in the accusative (`чай`, `хлеб`, `молоко`, `спорт`) and `кофе` does not decline at
 *   all. M1 names the slot and promises the ending.
 * - **Accusative, the ENDING** — M3. The first case ending a learner writes: feminine `-а/-я`
 *   becomes `-у/-ю` — `вода → воду`, `книга → книгу`, `музыка → музыку`. `*Я хочу вода` is THE
 *   interference of the module.
 * - **Genitive as a frozen partner** — M1, and only after `из`: `Я из Индии`, `Я из Москвы`. The
 *   note says what it is — the shape `из` always takes — and does not generalise.
 * - **Prepositional** — M7. The second ending taught: `в`/`на` + `-е` on the ordinary noun —
 *   `стол → на столе`, `магазин → в магазине`, `Москва → в Москве`, `работа → на работе`.
 * - **Genitive as the counting case** — M8. After 1 the noun is nominative singular, after 2–4
 *   genitive singular, after 5 and up genitive plural: `один рубль` · `два рубля` ·
 *   `пять рублей`. One honest note, the shapes the sentences need in `forms`, and no table.
 * - **Dative** — M9, and PRONOUNS only: `мне холодно`, `мне нравится`, `вам`. The dative of nouns
 *   is not taught; none of the ten jobs needs it.
 * - **Instrumental — DEFERRED ENTIRELY.** The only instrumental shapes in L1 are the frozen time
 *   adverbs `утром`, `днём`, `вечером`, `ночью` (M4), which the course teaches as single time
 *   words and says are frozen. No module explains the case; no module declines a noun into it.
 *
 * Two consequences every module obeys. First, **direction is not a seat this level opens**: `в` +
 * accusative for "into" is written around with `домой` (homeward) and `дома` (at home), which are
 * adverbs and take no case at all, so M4's `в` (time) and M7's `в` (place) are the only two seats
 * the `в` row has to answer for. Second, **a noun's shapes never sprawl**: see 5.
 *
 * ### 5. Every case shape of a word lives in ONE row's `forms` — and aspect pairs do not
 *
 * The index is cumulative and FIRST OCCURRENCE WINS, so the module that first teaches a word owns
 * the note every later learner sees when they tap ANY shape of it. Therefore:
 *
 * - **All shapes on one row.** `вода · воду` (M3), `стол · столе` (M7), `рубль · рубля · рублей`
 *   (M8), `час · часа · часов` (M4), `книга · книгу · книги` (M3, the plural added when M8 counts
 *   them). A second row for a case form would be unreachable, and the note on the first row is
 *   therefore written true of every shape it lists.
 * - **The same rule for the gender pairs.** The past `пошёл · пошла · пошло · пошли` is ONE row
 *   (M5); so is the speaker-describing `устал · устала` (M2); so is `был · была · было · были`
 *   (M5). The gender is the SPEAKER's, and the row's note says so once.
 * - **`быть` is ONE row across the whole level.** M5 opens it with `был · была · было · были` and
 *   M6 EXTENDS that same row with `буду · будете · будет` rather than opening a second — a second
 *   row would be reachable and WRONG, two notes for one lexeme. One row, one note, and that note
 *   is the level's best weapon against the "Russian has no verb to be" slogan: the past is there,
 *   the future is there, and the PRESENT is the empty cell.
 * - **Aspect pairs are two words, not two forms.** `пить`/`выпить`, `читать`/`прочитать`,
 *   `покупать`/`купить`, `идти`/`пойти` are separate lexemes and get separate rows, each owned by
 *   the module that teaches it and each note true of its own aspect only. What travels together on
 *   one row is one lexeme's own paradigm: `купить`'s row carries `купил · купила · купили` and
 *   gains `куплю` in M6, because those are all the same word.
 * - **`Индии` is one surface with two jobs**, and M1 owns it: the genitive after `из` (M1's
 *   `Я из Индии`) and the prepositional after `в`. M1's `Индия` row lists `Индия · Индии` and its
 *   note is written true of both seats, so a later `в Индии` cannot land on a false note.
 *
 * ### 6. Multi-token surfaces and the homograph owners
 *
 * A surface may span tokens and the resolver takes the LONGEST match first, so a multi-token
 * surface both keeps its parts' bare keys free and CAPTURES those parts wherever the phrase
 * appears. Russian's chunks, with their owners:
 *
 * - `меня зовут` (M1) — the name formula, taught whole. `Меня зовут Иван` is "me they-call Ivan";
 *   `Моё имя — Иван` is grammatical and nobody introduces themselves that way.
 * - `как дела` (M2) — leaves the bare `как` to M2's own "how" row (`Как вас зовут?`).
 * - `доброе утро` (M2) — leaves `утром` free; a different surface, so no clash.
 * - `до свидания` (M2), `каждый день` (M4), `сколько стоит` and `сколько стоят` (M8),
 *   `у вас есть` and `у меня есть` (M8 — three tokens each, so this course's `maxSpan` is 3),
 *   `потому что` (M9).
 * - A bare `у` is never written on any display or pool line: `surfaceIndexKeys` splits hyphen
 *   parts, not whitespace tokens, so `у` inside `у меня есть` earns no key of its own.
 *
 * And the homographs, first occurrence winning, each with an owner:
 *
 * - **`есть` — the big one, settled by exclusion plus one owner.** Russian's `есть` is both "to
 *   eat" and the existential "there is". **"To eat" stays OUT of L1 entirely**: no module writes
 *   it, food is bought (`купить хлеб`) and drunk (`пить чай`), and none of the ten jobs needs it.
 *   That leaves one sense, and **M7 owns the bare `есть` row** — the existential "there is" of
 *   `На столе есть книга` — with a note written true of both its seats, because M8's
 *   `у меня есть` is the same word doing possession. M8's three-token chunks win the longest match
 *   wherever they appear, so a tap inside one opens the possession note and a tap on a bare `есть`
 *   opens M7's.
 * - **`нет`** — M2, as the answer "no". Its second life as the existential negative ("there
 *   isn't") takes the genitive of negation, which this level does not teach, so the note names
 *   that job and says it is L2's. No L1 display writes `нет` in that sense.
 * - **`что`** — M9, as the conjunction of `Я думаю, что …` (the comma before `что` is obligatory
 *   in writing, unlike English "I think that"). Its question sense, "what", is named in the same
 *   note; earlier modules ask yes/no questions and `Как вас зовут?`, so no earlier surface claims
 *   the key.
 * - **`в`** — M4, in the time seat (`в семь часов`), and its note must be written true of M7's
 *   place seat too (`в магазине`), because M7's own row would be unreachable. The en-es `a`
 *   precedent, exactly.
 * - **`я`** — M1, with `forms` `я · меня · мне`: the subject, the object and the to-form of one
 *   pronoun, all named in one note, so M9's `мне холодно` lands on something true. Likewise `вы`
 *   (M2) carries `вы · вас · вам`.
 * - **`хорошо`** — M2 ("fine", the answer), its note covering the adverb job ("well") because M9
 *   and M10 reuse the key.
 * - Proper nouns never index unless a word row declares them (#61), so every place or person a
 *   sentence or a pool item names — `Иван`, `Анна`, `Москва`, `Индия` — needs a row in the module
 *   that first writes it, or the pool rule fails the build.
 *
 * ### Why the en-ru ladder teaches what it teaches
 *
 * The jobs are levels.json's, mirrored verbatim; the brief adds which English→Russian delta each
 * job carries, sequenced so each pressure point lands in the module whose job cannot be done
 * without it: the ZERO COPULA and the total absence of articles in M1 (the first sentence a
 * learner writes has no "is" and no "a" in it, and neither omission has an English twin); the `вы`
 * decision, intonation questions and the speaker's own gender on the predicate in M2 (a greeting
 * is addressed to somebody, and `устал`/`устала` cannot dodge who is speaking); the first case
 * ending in M3 (every want names a noun); conjugation classes and time words in M4; the
 * gender-agreeing past and the aspect choice in M5 (the level's richest interference zone, and
 * where "Russian has no to be" dies); the two futures in M6; the prepositional and existential
 * `есть` in M7; the counting genitive and `у вас есть` in M8; dative experiencers and
 * `потому что`/`поэтому` in M9; and recombination into turns, with word order doing the article's
 * old work, in M10. Kept deliberately OUT of L1: the instrumental as a case, the declension of
 * adjectives (they appear only in fixed phrases and as short-form predicates), verbs of motion as
 * a system, the imperfective past, the genitive of negation, participles, and `ты`.
 *
 * There is no seam-proof fixture to replace: `content/en-ru/modules/` did not exist until the
 * first authoring issue created it, exactly as on hi-en. Bounds climb 5 → 8, as en-es's do; pools
 * are authored to 12 and every sentence to three variations from the first module, so en-ru never
 * needs the retrofits #288 and #292 had to make.
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
 * - **The schema's register chip has two values, `neutral` and `informal`** — every en-fr L1
 *   sentence chips `neutral`, and the politeness above neutral is carried in words
 *   (`s'il vous plaît`, M8) and in the `usage` line, never by a third chip.
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
 *   joiners are `et · mais · aussi · puis · alors`, and none of them is `ou`.
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
        'Time words carry the module: रोज, सकाळी, दुपारी, संध्याकाळी, रात्री, कधी, नंतर.',
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
        'Feelings vocabulary (आनंद, राग, कंटाळा…) rides the dative frame from M1/M3: मला कंटाळा आला.',
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
        "REGISTER, decided for the whole level and repeated here because the prompt only ever shows an author the notes (the full decision record is docs/26-hi-mr-L2-brief-decisions.md; language of fields is unchanged from L1 — rules[].text and word note in English, every learner-facing line in Hindi in Devanagari, glossEn on every sentence): L1 taught तू as the everyday default (docs/08 Q16); this module teaches WHEN. The law: तू for a friend or family your own age or younger, तुम्ही for elders, strangers and counters. Author the same request in both registers side by side, chip the तू lines informal (the schema's only non-neutral register value), and carry the formal end — कृपया, आभारी आहे — in the usage line, because there is no formal chip.",
        "The imperative pair is the grammar of the module: informal = the bare stem (दे · कर · ये — L1 never taught दे: docs/15 recorded that debt on M10's द्या row, and it is paid here), polite = stem + -आ (द्या · करा · या · बसा; vowel stems contract, देणे → द्या). Hindi climbs three steps — दे → दो → दीजिए — and Marathi has TWO: there is no -इए tier, and reaching for one (*द्याजी, *करिये) is the Hindi habit to star. Politeness above तुम्ही + -आ goes into words (जरा, कृपया) or the future question, never into a new verb form.",
        'THE interference of the module, and the course\'s best false friend: Hindi आप does not map to आपण. आपण looks like आप and is the course\'s "we" — L1-M10\'s row, whose note teaches the inclusive/exclusive split — so *आपण द्या meant as "आप दीजिए" misfires twice. The polite "you" is तुम्ही (M2\'s row, आहात and all). आपण as a very formal "you" (आपण कुठे राहता?) is real Marathi — docs/08 open question 17 — but stays OUT of L2 displays; a usage line may name it. Tag the reach interference and spend a mistake on it.',
        'The softeners: जरा ("just / a moment\'s worth" — जरा पाणी द्या is the everyday please), कृपया (formal please — notice-board and announcement register; say so in usage), and the polite-future question मला … द्याल का? ("will you give?" — the तुम्ही cell of देणे\'s future, Hindi देंगे क्या?). A request shaped as a question is a move Hindi and Marathi share — transfer — so the work is the new cell द्याल, not the idea.',
        'Apology and thanks: माफ करा ("sorry / excuse me" — माफ is the new word, करा is this module\'s polite imperative doing real work: write the करा row\'s note true of माफ करा and of कृपया मदत करा — M8\'s help line — alike); धन्यवाद recycled from L1-M2; आभारी आहे ("[I] am grateful" — the formal Pune thanks, आहे recycled from L1-M1) as the register step above it.',
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
        'Refusing without offence IS the job title: नको does the heavy lifting (L1-M3\'s row — "नहीं चाहिए in one word"), softened by the words around it: नको, धन्यवाद · आता नको ("not now", आता from L1-M3) · पुरे ("enough, I\'m done" — the table word; Hindi\'s बस्स → पुरे, and a Hindi speaker\'s "बस!" at a Marathi table is the sit/vehicle homograph, not "enough": one usage line, gently). पोट भरलं ("[my] stomach is full" — the idiom that ends the refusal dance: भरलं agrees with पोट, L1-M5\'s law in one polite sentence).',
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
        'Pro-drop, stated as the law and not as "Spanish drops pronouns": the ending already names the person, so a neutral statement carries no subject pronoun — Soy de India, not Yo soy de India. yo / tú are not ungrammatical, they are MARKED: they come back to contrast or disambiguate (Yo soy de India, ella es de México). Tag it delta and repeat it in every sentence of the module.',
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
        'The module exists to force the ser/estar choice, and the rule must be the true one: ser classifies (identity, origin, what something IS) and estar reports a condition or a state. "ser is permanent, estar is temporary" is the slogan every author reaches for and it is false in both directions — es joven is temporary, está muerto is permanent. Author to the split the module drills: Soy de India (origin → ser) · Estoy bien (condition → estar).',
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
        'Quiero + num + N + , por favor',
        'Un kilo/Una botella de + N',
      ],
      notes: [
        "The price question agrees with the THING, not with the buyer: ¿Cuánto cuesta el café? · ¿Cuánto cuestan los libros? Name the link back to M1 — this is gustar's reversal again, and a learner who has met it once should be told it is the same shape.",
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
        'The pair that carries the module: porque introduces the REASON and por eso introduces the CONSEQUENCE. The same two facts in opposite order — No quiero café porque estoy cansado · Estoy cansado, por eso no quiero café — so build the sentences in pairs and make the comprehension pool test the choice.',
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
  },
  'en-ru': {
    'L1-M1': {
      id: 'L1-M1',
      title: 'Who I am',
      job: 'Introduce yourself and state what you like',
      patterns: [
        'Меня зовут + name',
        'Я из + place (gen.)',
        'Я + N (nom.)',
        'Это + N (nom.)',
        'Я люблю + N (acc.)',
      ],
      notes: [
        'THE ZERO COPULA, and it is the module. Russian writes no present-tense "to be" at all: Я студент is "I student" and Меня зовут Иван is "me they-call Ivan". There is no word to leave out and no word to put in — *Я есть студент is the English habit and THE interference of this course. Use literal on every sentence so the missing verb is visible, and tag it interference, not delta: the gap is easy to read and hard to write. The slogan this module attracts is "Russian has no verb to be"; the law replacing it is that only the PRESENT is zero — был (M5) and буду (M6) are real words, and M5 opens the one быть row that says so.',
        'NO ARTICLES, at all. книга is "book", "a book" and "the book", and nothing marks the difference. That is a delta — one whole system with nothing to learn — but say the second half too, because M10 pays for it: the work English gives a/the is done in Russian by WORD ORDER, and new information goes last. Do not let a rule here promise that articles are simply absent.',
        'Меня зовут is a chunk, taught whole as one two-token surface: it keeps the bare меня free and it is how a name is actually given. Моё имя — Иван is grammatical and nobody says it. The я row is opened here with forms я · меня · мне — the subject, the object and the to-form of one pronoun — and its note names all three jobs, because first occurrence wins and M9’s мне холодно will land on this row.',
        'NOUN GENDER, by ending, with its exceptions stated rather than hidden: a noun ending in a consonant is masculine (стол, хлеб, чай), one in -а/-я is feminine (книга, вода, музыка), one in -о/-е is neuter (молоко, письмо). Two honest caveats belong in the note the first time they bite: nouns in -ь can be either and must be learned with their gender (рубль is masculine, дверь feminine), and кофе is masculine despite its -е. Gender is a property of the noun, learned with it — "-а is feminine" is memorable and incomplete (папа, мужчина are masculine).',
        'Я люблю + object names the ACCUSATIVE SLOT without teaching an ending. Choose the liked things so the form does not move: чай, хлеб, спорт, молоко are masculine-inanimate or neuter, which look identical in the accusative, and кофе does not decline at all. Say that plainly and promise M3, where the feminine ending lands. любить is a class II verb with a stem change in the I-form only — люблю · любите — so write люблю and leave the paradigm to M4.',
        'Я из Индии is the one place a case ending appears in M1, and it is taught as a frozen partner, not a system: из always takes the genitive, and Индия becomes Индии, Москва becomes Москвы. INDEX SEAM: Индии is ALSO the prepositional (в Индии), so M1’s Индия row carries Индия · Индии and its note is written true of both seats — a later в Индии would otherwise land on a note that says only "from".',
        'REGISTER, ratified for the whole course and repeated here because a prompt only ever shows an author the notes: this course speaks вы, the polite address, and ты never appears in an L1 display line. M1 is all first person, so nothing here is addressed yet — but the sound and usage lines may already say that Russian will ask the learner to choose, and that this course has chosen. Write ё wherever a word has it (the course-wide policy: пошёл, всё, её, never the е-spelling), because the index keeps ё and е apart.',
      ],
      maxWordsPerSentence: 5,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M2': {
      id: 'L1-M2',
      title: 'First exchange',
      job: 'Greetings, wellbeing, yes/no questions',
      patterns: [
        'Здравствуйте + , + name',
        'Как дела?',
        'Как вас зовут?',
        'Вы + V-ете/-ите + ?',
        'Да / Нет + , + <statement>',
        'Я + Adj-short (устал / устала)',
      ],
      notes: [
        'A YES/NO QUESTION MOVES NOTHING. Вы из Москвы? is the statement Вы из Москвы with a question mark — no auxiliary appears, no word changes place, and nothing corresponds to English do or are. Spoken Russian carries the question in a rising pitch on the questioned word, which is what the ? stands for; say that in sound rather than pretending punctuation is the whole story. This is a clean delta and the module should spend it: English speakers reliably over-build the question.',
        'REGISTER, decided course-wide and stated here because this is the module that addresses somebody: this course speaks вы. Здравствуйте is the greeting (привет is the ты-tier one and belongs in a usage line, never on a hero line); Как вас зовут? asks the name; every second-person verb in L1 is the вы-form. The false slogan is "вы is just the plural of ты"; the law is that вы is BOTH the plural and the singular-polite, and it always takes the plural verb form even for one person. ты exists, takes its own endings, and is L2’s job — say that once, here.',
        'Как дела? is the exemption, and an honest one: it contains no second-person word at all — it is verbless, "how [are the] affairs" — so it carries no ты/вы marking to get wrong. The fully polite expansion is Как у вас дела?, and the usage line says to prefer it with somebody just met. INDEX SEAM: teach как дела as ONE two-token surface, which leaves the bare как free for this module’s own "how" row in Как вас зовут?.',
        'THE SPEAKER’S OWN GENDER IS IN THE SENTENCE. Я устал is said by a man and Я устала by a woman — the short-form predicate agrees with whoever is speaking, and English marks this nowhere. One row, forms устал · устала, and a note that says the gender is the SUBJECT’s (with вы it is the person being asked), never "the speaker’s" as a slogan — that exact imprecision is the defect the third Marathi review had to correct three times.',
        'Short answers are Да / Нет plus the statement: Да, я из Москвы. INDEX SEAM: нет is this module’s row, meaning "no". Its second life as the existential negative ("there isn’t") takes the genitive of negation, which this level does not teach — the note names that job and says it is L2’s, and no L1 display writes нет in that sense. Same discipline on хорошо, whose row is opened here as the answer "fine" and whose note must also cover the adverb "well", because M9 and M10 reuse the key.',
        'Other whole surfaces to claim here, each leaving a bare word free: доброе утро (which leaves утром to M4 — a different surface, so no clash) and до свидания. Spend the rest of the budget on спасибо, пожалуйста and Как вас зовут?, and keep every sentence to the greeting exchange: no wants, no past, no plans.',
      ],
      maxWordsPerSentence: 5,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M3': {
      id: 'L1-M3',
      title: 'Needs and wants',
      job: "Say what you want and don't want",
      patterns: [
        'Я хочу + N (acc.)',
        'Я не хочу + N (acc.)',
        'Я хочу + V-inf',
        'Вы хотите + N (acc.) + ?',
        'Я не + V',
      ],
      notes: [
        'THE FIRST CASE ENDING, and the module exists for it: a feminine noun in -а/-я becomes -у/-ю when it is the object. Я хочу воду, not *Я хочу вода — the starred form is the interference, and it is worth the module’s mistake budget. The slogan to name and replace is "the accusative is the object case, so the object changes": it does not always change, and M1 already showed why — masculine-inanimate and neuter nouns are identical in the accusative (Я хочу чай), кофе never moves at all, and only the feminine -а/-я actually shifts at this level. Stating that is what makes M1’s unchanged objects make sense in retrospect.',
        'INDEX SEAM: every shape of a noun lives in the forms of the ONE row that first taught it. вода · воду, книга · книгу, музыка · музыку — one row each, one note each, written true of both shapes. A second row for воду would be a second note for the same word, and the earlier row would keep answering every tap anyway.',
        'NEGATION IS ONE WORD IN ONE PLACE: не goes straight in front of the verb and nothing else moves — Я не хочу кофе. English needs a do-not auxiliary that Russian has no equivalent of, so this is a delta to celebrate. INDEX SEAM: не is this module’s row and its note has to survive every later negative — M5’s past, M6’s future, M9’s reason clauses — so write it as a rule about the particle, not about wanting.',
        'Wanting TO DO something is хочу plus a bare infinitive: Я хочу работать, with no word for "to". English "want to" tempts a stray что or чтобы into the sentence; *Я хочу что работать does not exist and is worth showing.',
        'хотеть is irregular and this module pays for it once: хочу · хотите (and хочешь · хочет · хотим · хотят, which the note may list but the displays do not use, because L1 addresses only вы). Keep the plural of nouns out of the grammar and in the vocabulary — книги appears as a shape on книга’s row when M8 counts them, not as a lesson here.',
      ],
      maxWordsPerSentence: 6,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M4': {
      id: 'L1-M4',
      title: 'My day',
      job: 'Daily habits and time words',
      patterns: [
        'Я + V-ю/-у + каждый день',
        'Утром / Вечером + я + V',
        'Я встаю в + num + часов',
        'Вы + V-ете/-ите + ?',
        'Я часто / всегда + V',
      ],
      notes: [
        'Habits live in the IMPERFECTIVE PRESENT, and this module is purely imperfective: Я работаю каждый день, Я встаю рано, Утром я пью чай. Aspect is lurking behind every one of these verbs and M5 is where it lands — name it here in one sentence ("every verb in this module is the shape Russian uses for something you do repeatedly; M5 shows the other shape and why it exists") and then leave it alone. Do not import a perfective into M4.',
        'CONJUGATION IN TWO CLASSES, and the class is a property of the verb: class I takes -ю/-ешь/-ет/-ем/-ете/-ют (работаю · работаете, читаю · читаете) and class II takes -ю/-ишь/-ит/-им/-ите/-ят (говорю · говорите). The slogan to name and replace is "the present tense is one set of endings"; the law is that there are two sets and the verb carries which. Learn a verb with its class, exactly as a noun is learned with its gender. L1 writes only the я- and вы-forms, since ты is out.',
        'ё, course-wide, bites first here: пить is я пью · вы пьёте and вставать is я встаю · вы встаёте. Write the ё. The index keeps ё and е apart, so the е-spelling of a ё-word is a surface this course never taught — a learner tapping it would be shown nothing.',
        'TIME WORDS carry the module, and four of them are frozen instrumentals that this course teaches as single words: утром, днём, вечером, ночью. Say they are frozen shapes and that the case they come from is not taught at this level — that is honest, it is one sentence, and it stops an author from opening the instrumental. Beside them: рано, поздно, часто, всегда, иногда, and the two-token surface каждый день (which leaves днём, a different surface, alone).',
        'INDEX SEAM, decided here: this module teaches the surface в first, in the clock seat (Я встаю в семь часов), so its row answers every later tap — including M7’s place seat (в магазине). Write that row true of BOTH jobs, because M7’s own row would be unreachable. The clock also pre-teaches M8’s counting rule for free: час · часа · часов are three shapes of ONE word on ONE row, and the note says after 1 it is час, after 2–4 часа, after 5 and up часов.',
        'Keep every sentence a habit — no past, no plans, no requests — and keep the subject pronoun я on the page. Russian can drop it and colloquially does, but a dropped pronoun is a stylistic choice a beginner cannot yet control, and the verb ending here is enough of a lesson on its own.',
      ],
      maxWordsPerSentence: 6,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M5': {
      id: 'L1-M5',
      title: 'Yesterday',
      job: 'Past tense — the first big divergence',
      patterns: [
        'Вчера я + V-л / V-ла',
        'Вчера я + V-л + N (acc.)',
        'Вчера я не + V-л / V-ла',
        'Вы + V-ли + вчера + ?',
        'Вчера я был / была + дома',
      ],
      notes: [
        'THE PAST AGREES WITH GENDER AND NUMBER, NOT WITH PERSON. The endings are -л (m) · -ла (f) · -ло (n) · -ли (pl), and the same speaker writes a different word depending on who they are: Вчера я купил хлеб from a man, Вчера я купила хлеб from a woman. English marks none of this, and a learner has to decide something about themselves before the sentence can be written. Say SUBJECT, not speaker, as the rule — with вы it is the person addressed, and вы always takes -ли, even for one person. The slogan to name and replace is "the past is the easy tense" (one form for everybody, no auxiliary): it is easy in person and hard in gender, and ASPECT still picks the verb.',
        '"TO BE" COMES BACK, and it kills M1’s slogan for good: был · была · было · были is a real word where the present had none. INDEX SEAM: this is ONE быть row, opened here, and M6 EXTENDS it with буду · будете · будет rather than opening a second — one lexeme, one note, and the note is where the whole shape of Russian "be" is finally told: past yes, future yes, present empty. Keep its display sentences simple and case-free: Вчера я был дома — дома is an adverb ("at home"), so no case is opened, and M6 gets домой ("homeward") the same way.',
        'ASPECT, named and decided. Yesterday’s sentences are single finished events, so they take the PERFECTIVE: купил, выпил, прочитал, пошёл. The imperfective past (Я работал — "I was working / I used to work") is DEFERRED out of L1 and named as deferred, so the learner knows a second past exists rather than believing the one they have is all there is. быть is the one exception on the page, because был is the only past it has. INDEX SEAM: an aspect pair is TWO WORDS, not two forms — пить (M4) and выпить (M5) get separate rows, as do читать and прочитать, each note true of its own aspect. What shares a row is one lexeme’s own paradigm: купить carries купил · купила · купили, and M6 adds куплю to that same row.',
        'THERE IS NO DID. Negation is still M3’s one word in one place, now in front of the past verb: Вчера я не купил хлеб. Nothing is added and nothing moves — a delta, and the sharpest one this module has.',
        'ё is unavoidable here and that is a feature: пошёл is the course’s flagship ё-word and its pair пошла has none. Write both, on one row (пошёл · пошла · пошли), and let a sound line say why the two dots are on the page when Russian books usually drop them.',
        'вчера anchors every sentence, and the vocabulary is the perfective partners of M4’s habits plus what a day actually contains. Do not spend the budget on a paradigm table: the four endings are the rule, and the sentences are the evidence.',
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M6': {
      id: 'L1-M6',
      title: 'Tomorrow',
      job: 'Future and plans',
      patterns: [
        'Завтра я буду + V-inf (impf.)',
        'Завтра я + V-perf (non-past)',
        'Завтра я не буду + V-inf',
        'Вы будете + V-inf + завтра + ?',
      ],
      notes: [
        'TWO FUTURES, and which one you get is decided by the verb, not by the meaning. An IMPERFECTIVE verb builds its future with буду plus the infinitive: Завтра я буду работать. A PERFECTIVE verb has no буду future at all — its present-tense form IS its future: Завтра я куплю хлеб, Завтра я пойду домой. The slogan to name and replace is "буду = will": буду is not a translation of will, it is half of one of the two futures, and the other half never touches it. *Я буду пойти and *Я буду купить are the classic cross-wiring and belong in a mistake block.',
        'INDEX SEAM: буду goes on M5’s быть row (forms gain буду · будете · будет), not on a new one — one lexeme, one note, and that note now carries the complete story the course has been building since M1: no present, был in the past, буду in the future. Likewise куплю joins M5’s купить row and пойду joins its пошёл row, because they are the same words; only genuinely new lexemes get new rows here.',
        'The perfective futures are taught as VOCABULARY with a rule beside them, not as a paradigm: the learner meets куплю and пойду in sentences and is told why they look like a present tense. Lead with буду + infinitive, which is the pattern they can build themselves from anything M4 taught.',
        'завтра anchors the module the way вчера anchored M5, and домой (an adverb, "homeward") keeps direction out of the case system — Завтра я пойду домой opens no accusative-of-motion seat, which is deliberate: в + accusative for "into" is not a seat this level opens, so M4’s в (time) and M7’s в (place) stay the only two jobs that row has to answer for.',
        'Negation stays exactly where M3 put it, in front of the finite verb: Завтра я не буду работать — не before буду, never before the infinitive.',
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M7': {
      id: 'L1-M7',
      title: 'Where things are',
      job: 'Locations and prepositions',
      patterns: [
        'Где + N + ?',
        'N + в / на + place (prep.)',
        'На + place (prep.) + есть + N',
        'N + здесь / там',
      ],
      notes: [
        'THE PREPOSITIONAL, the second case ending this level teaches, and the only one that is never used without a preposition — which is where its name comes from and is worth saying. The everyday shape is -е on the ordinary noun: стол → на столе, магазин → в магазине, работа → на работе, Москва → в Москве. в is broadly "inside" and на broadly "on" or "at", but the pairing is lexical as often as it is logical (на работе, на почте), so teach each place WITH its preposition rather than offering a rule that will fail by M8.',
        'INDEX SEAM: the shapes live on the noun’s own row — стол · столе, магазин · магазине — never on a second row, and the note is written true of both. And the bare в belongs to M4 (the clock seat), so a learner tapping в here is shown M4’s row: M4’s note was written true of this seat too, and this module’s rule text carries the place job rather than relying on a new row being reachable.',
        'EXISTENTIAL есть, and this module OWNS the row. На столе есть книга asserts that a book is there; Книга на столе says where a known book is, and drops есть entirely. That drop is the module’s comprehension work, and it is genuinely subtle: есть appears when existence is the news and vanishes when location is. INDEX SEAM: "to eat" — the other есть — stays out of L1 entirely, so this row has exactly one lexical rival, M8’s possession chunks у меня есть / у вас есть, which are the SAME word and are captured whole by the longest-match walk. Write this note true of both seats, because it is the note a learner will meet from either.',
        'THERE IS NO DUMMY SUBJECT. English "there is" has a "there" that means nothing and an "is" that agrees; Russian has neither, so на столе есть книга is literally "on table is book". literal earns its keep on every sentence in this module — it is the only place the learner can see that the English "there" corresponds to nothing at all.',
        'Где …? asks the question, здесь and там answer it without any case at all, and word order is already doing article work: state it once here (Книга на столе = "the book is on the table"; На столе книга = "there is a book on the table") and let M10 make it the lesson.',
        'The slogan to name and replace is "есть means eat". The law: the есть this module teaches is the existential "there is", the same word M8 uses for possession, and the eating verb is a different lexeme this course never writes.',
      ],
      maxWordsPerSentence: 7,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M8': {
      id: 'L1-M8',
      title: 'Numbers & shopping',
      job: 'Prices, quantities, buying',
      patterns: [
        'Сколько стоит + N (nom.) + ?',
        'Сколько стоят + N-pl (nom.) + ?',
        'У вас есть + N (nom.) + ?',
        'У меня есть + N (nom.)',
        'Дайте, пожалуйста + , + N (acc.)',
        'N + стоит + num + N (gen.)',
      ],
      notes: [
        'NUMBERS GOVERN THE NOUN, and that is the module’s one grammatical claim: after 1 the noun is nominative singular (один рубль), after 2, 3 and 4 it is genitive singular (два рубля), and after 5 and up it is genitive plural (пять рублей, сто рублей). Teach the shapes the sentences actually need as forms on the noun’s own row — рубль · рубля · рублей — state the rule once in one honest note, and build no declension table. The slogan to name and replace is "numbers are just words in front of a noun"; the law is that the number decides the noun’s case, which English never does. M4’s clock already showed the same split on час · часа · часов, so name the link back: it is one rule, met twice.',
        'THE PRICE QUESTION AGREES WITH THE THING, not with the buyer: Сколько стоит книга? for one, Сколько стоят книги? for more than one. Teach сколько стоит and сколько стоят as two whole two-token surfaces, and name the link forward to M9’s мне нравится / мне нравятся — it is the same shape twice, a verb agreeing with the thing rather than with the person.',
        'POSSESSION HAS NO VERB. У меня есть книга is literally "at me is book" — the owner sits in a prepositional phrase and the thing owned is the SUBJECT. Russian does have a verb иметь, but it is bookish and abstract (иметь право, "to have a right") and nobody uses it for owning a book — so Я имею книгу is the anglophone trap of the whole course and belongs in a mistake block, flagged as unnatural rather than as ungrammatical, which is the honest charge. INDEX SEAM: у меня есть and у вас есть are THREE-token surfaces (this course’s maxSpan is 3) that capture the есть inside them, so a tap anywhere in the phrase opens the possession note while a bare есть still opens M7’s existential row. Never write a bare у anywhere — it earns no key of its own, because surfaceIndexKeys splits hyphen parts, not whitespace.',
        'The shop script is the module’s usable half: Дайте, пожалуйста, воду (дайте is the вы-form imperative — the register decision again, and the only imperative L1 teaches), спасибо, рубль. Keep the numbers to what the sentences use — один/одна, два/две, три, четыре, пять, десять, двадцать, сто — and note that один and два are the only two that change for gender (один рубль · одна книга; два рубля · две книги).',
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
        '<statement> + , потому что + <statement>',
        '<statement> + , поэтому + <statement>',
        'Почему + <question> + ?',
        'Мне + Adv (холодно / жарко)',
        'Мне нравится + N (nom.)',
        'Я думаю, что + <statement>',
      ],
      notes: [
        'потому что and поэтому map cleanly onto "because" and "so", and the clean mapping is the delta: потому что introduces the REASON, поэтому the CONSEQUENCE, and the same two facts written in the opposite order give the pair. Build the sentences in pairs — Я не хочу работать, потому что я устал · Я устал, поэтому я не хочу работать — and make the comprehension pool test the choice. INDEX SEAM: потому что is ONE two-token surface, which leaves the bare что free for this module’s own conjunction row.',
        'THE COMMA IS OBLIGATORY. Russian writes a comma before потому что and before что, always — Я думаю, что это хорошо. English drops "that" and drops the comma; Russian does neither. It is a punctuation rule and it is not optional, so say it as a law rather than a preference. INDEX SEAM: что is this module’s row, as the conjunction; its note names the question sense ("what") too, since no earlier module claimed the key and a later learner may tap it in either job.',
        'DATIVE EXPERIENCERS — this course’s gustar, and the interference to spend the module on. Мне холодно is "to-me [it is] cold", with no subject at all and no verb: the person who feels something goes in the DATIVE, and the English "I am cold" pattern (*Я холодный) says that you are a cold person. Мне нравится Москва is the same shape with a subject: the thing liked is the SUBJECT, so the verb agrees with IT — мне нравится книга, мне нравятся книги — and мне never changes. The slogan to name and replace is "мне нравится is Russian for I like"; the law is that the thing does the pleasing and the person is the one pleased, exactly as in M8’s Сколько стоят книги?.',
        'INDEX SEAM: мне is a shape of я and belongs to M1’s row, which was written with forms я · меня · мне and a note naming all three jobs — so a tap here lands on something true. This module’s rule text carries the dative lesson; no second я row is opened, and none would be reachable.',
        'Feelings that DO take a subject use the short-form predicate from M2, which agrees with whoever is being described: Я устал · Я устала. Keep the two shapes apart in the rules — мне холодно has no subject and cannot agree with anything; я устал has one and must.',
        'Почему …? asks the question, and its answer is потому что; they look alike, they are two words, and the module must write both often enough that the learner sees the difference.',
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
        '<question> → <answer + потому что + reason>',
        '<statement> + и / но + <statement>',
      ],
      notes: [
        'Each item is a TURN of 2–3 short sentences, not one long one — a greeting and its answer, a question and its reply, a statement with a reason and a follow-up. The per-sentence bound applies to each sentence inside the turn, and the turn is what the learner writes.',
        'Recombination is the lesson: nearly everything comes from M1–M9. The honest new spend is the joiners that hold a turn together — и, но, тоже, потом — and the third-person pronouns.',
        'WORD ORDER DOES THE ARTICLE’S OLD WORK, and this is where M1’s "no articles" promise is paid. The slogan to name and replace is "no articles — one thing less to learn"; the law is that the article’s job moved into the ORDER, and new information goes LAST: Книга на столе is "the book is on the table" (we know the book; where it is, is the news) and На столе книга is "there is a book on the table" (we know the table; the book is the news). Both are correct Russian and they are not interchangeable. Build at least one comprehension pair on exactly this.',
        'он · она · оно · они refer to things as well as people, by GRAMMATICAL gender, not by sex: a table is он, a book is она, milk is оно. English "it" covers all three, so an English speaker will reach for оно and be wrong most of the time. One row, forms он · она · оно · они, note written true of the thing-uses.',
        'KEEP THE SUBJECT PRONOUN. Russian can drop я and colloquially does, especially in answers, but the ending alone does not always identify the person (the past agrees with gender and number, not person, so был with no pronoun is genuinely ambiguous) and a beginner cannot yet judge when the drop reads as natural rather than clipped. So L1 writes the pronoun, and this module says why rather than pretending Russian requires it.',
        'Keep the turns everyday and symmetric, and reuse the register decision on every addressed line: greeting → wellbeing → plan (Здравствуйте! Как дела? · Хорошо, спасибо. · Завтра я буду работать.); want → reason → buy.',
      ],
      maxWordsPerSentence: 8,
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
        "INDEX SEAM: un po' di is claimed WHOLE, as a three-token surface. src/engine/surface.ts strips edge punctuation but never an inner apostrophe, so po' is its own token and does not answer for po — and claiming the phrase whole leaves bare di to M1's Sono di Roma, whose note has to be true of the \"of\" seat as well. It is the only apostrophe in L1 outside the article rule. lo is the masculine article row here and never the object pronoun, which stays out of L1; un'amica, when it appears, is a forms entry on amica rather than a row of its own.",
      ],
      maxWordsPerSentence: 6,
      newWordCap: NEW_WORD_CAP,
    },
    'L1-M4': {
      id: 'L1-M4',
      title: 'My day',
      job: 'Daily habits and time words',
      patterns: [
        '(Io) + V-o + ogni giorno',
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
        'Che cosa hai + V-participle + ieri?',
      ],
      notes: [
        'THE interference zone of the level, and it is not the one Spanish has: Italian\'s everyday past is ONE tense, the passato prossimo, built from a helper plus a participle — ho mangiato, sono andato. What splits is the HELPER. Most verbs take avere (ho mangiato, ho comprato, ho visto); a fixed, small set — the verbs of going, coming, staying, being and becoming, plus every reflexive — takes essere (sono andato, sono stato, mi sono alzato). "Verbs of motion take essere" is the slogan; it is nearly right and it leaks (ho camminato and ho viaggiato take avere), so state it as a LIST this module teaches, not as a category the learner can derive.',
        "With essere the participle AGREES with the subject, exactly like an adjective: sono andato (a man) · sono andata (a woman) · siamo andati. With avere it does not move at all: ho mangiato, whoever is speaking. That pair — agreement on one helper, none on the other — is the module's comprehension work, and the mistakes are *sono mangiato and *ho andato.",
        'There is no did-support and no separate simple past to reach for: ho mangiato translates "I ate" as readily as "I have eaten", and the question is Che cosa hai mangiato?, with no auxiliary invented for it. The slogan to name and kill is "the passato prossimo is the present perfect, so it means \'have eaten\'"; the law is that ONE Italian tense covers both English pasts in ordinary speech.',
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
        'andare is irregular and carries the module: vado · vai · va. It is worth its share of the word cap on its own, and it brings in the destination a — vado a Roma, vado a casa (no article on casa: that is the idiom, not a slip) — and the a that stands between andare and an infinitive, vado a mangiare.',
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
        'Voglio + num + N + , per favore',
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
        'The avere states: Italian says ho fame, ho freddo, ho sete, ho sonno, ho caldo where English says "I am hungry / cold / thirsty / sleepy / hot". The noun is BARE — no article — and the verb is avere, so *sono fame is the classic anglophone sentence and the mistake block this module owes. State the law as the closed list the module teaches, NOT as "feelings take avere": sono stanco and sono felice take essere, and both appear here.',
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
        'LANGUAGE OF THE FIELDS, settled once for the course: the document speaks the course\'s L1, so every teaching field — rules[].text, word note, trap, sound, variations[].changed, mistake.why, usage, mnemonic and cue — is ENGLISH, and French appears only in the L2 slots: sentence / word / variation / mistake / pool display, and word forms. An English field may quote the French it explains; quoting is not switching. glossEn is REQUIRED on every sentence (the L2 is not English, so #268\'s exemption does not apply), and literal is the tool wherever the French construction is not word for word — je m\'appelle is "I call-myself", il y a is "it there has".',
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
        "Je veux + num + N + , s'il vous plaît",
        'Un kilo de + N',
      ],
      notes: [
        "The price question has two everyday shapes and both put the question word at the END, which is where spoken French puts it: C'est combien ? and Ça coûte combien ? Neither inverts, per M2's policy. c'est is opened HERE, as its own fused row — the first module with a job for it — and its note names both halves: c' is ce (\"this, that\") elided before est.",
        'The slogan is "much for uncountables, many for countables, so French must split too", and it is false: ONE combien de covers both — Combien de pommes ? and Combien de pain ? The law: combien de plus a noun, whatever the noun counts, and no article between them — never *combien des pommes. Teach combien de as a two-token surface beside the bare combien of C\'est combien ?, so each note answers for its own job.',
        'Numbers are vocabulary the sentences actually use — un … dix, plus vingt and cent if a price needs them — not a counting drill, and no display may write a number the module has not taught. un is both "one" and the masculine article, and une the feminine: Je veux un café is "a coffee" and "one coffee" at once. French does not distinguish them, so the note must not pretend to.',
        "A quantity takes de and nothing after it: un kilo de riz, une bouteille d'eau — no article, and M3's du would be wrong here. d'eau is one fused token: if the module writes it, it gets its own row, whose note names both halves.",
        "s'il vous plaît is ONE three-token surface and it is the vous shape the course's register decision requires — s'il te plaît is tu's and is never written here. Taking it whole leaves M2's vous row untouched. Its note may say what the phrase is made of (\"if it pleases you\") without the module teaching si or plaire. Prices are in euros, and euro takes a written, silent plural -s: dix euros.",
        "INDEX SEAM: c'est is this module's row and ça is its other one — ça va was taken whole in M2 precisely so that ça would still be free here for Ça coûte combien ? Register: the course writes je veux with s'il vous plaît at the edge of the request, and the usage line says when je veux alone would sound blunt; je voudrais, the conditional, stays out of L1.",
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
        '<statement> + . + Puis/Alors + <statement>',
      ],
      notes: [
        'Each item is a TURN of 2–3 short sentences, not one long one — a question and its answer, or a statement, a reason and a follow-up. The per-sentence bound applies to each sentence inside the turn.',
        "Recombination is the lesson: nearly everything comes from M1–M9. The honest new spend is the joiners that hold a turn together — et, mais, aussi, puis, alors — and little else. ou is NOT among them: it would sit one accent away from M7's où, and no turn here needs it. aussi goes AFTER what it adds to (Je veux du thé aussi); at the head of a sentence it means something else and reads as formal, so keep it out of first position.",
        "A delta, and the last one: French subject pronouns are NEVER dropped, exactly as English's are not. The reason is the one M4 gave — je mange, il mange and ils mangent are one sound, so the ending cannot carry the person and the pronoun must. Write the pronoun in every clause of every turn, including the second and third sentences where the person is already obvious.",
        'il and elle are the GENDER OF THE NOUN, not the sex of a person: le café … il, la maison … elle. The slogan is "il = he, elle = she", and it is why an anglophone, having no French twin for "it", defaults to il for everything. The law: il and elle name the GRAMMATICAL GENDER of the noun they stand for, so a house is elle and a coffee is il — La maison est grande. Elle est belle. — never *Il est belle, which the feminine adjective beside it makes visible. This module is where a two-sentence turn forces the choice for the first time, so tag it interference and spend a mistake plate on it. INDEX SEAM: both il and elle are still free here, because M7 took il y a whole as a three-token surface and claimed no part of it.',
        "Language of the fields holds to the last turn: ENGLISH in every teaching field — rules[].text, note, trap, sound, changed, why, usage, mnemonic, cue — French only in display and forms, glossEn on every sentence, and literal wherever a turn's order moves. The register holds too: vous to the end, tu never written.",
      ],
      maxWordsPerSentence: 8,
      newWordCap: NEW_WORD_CAP,
    },
  },
};
