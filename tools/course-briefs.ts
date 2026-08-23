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
 * Four courses are briefed, L1 only: hi-mr, en-es, en-ar and hi-en. The L2/L3 module lists are RATIFIED
 * (#112 closed [Q1] — titles, jobs and sequence in levels.json are final), but their briefs are
 * written when the L2/L3 authoring project starts: a brief encodes pattern-and-interference
 * pedagogy that should be planned against the verified L1 ladder, not ahead of it. en-ar's and
 * hi-en's own L2/L3 lists are still placeholder text (PRD §5) and are not briefed either. The CLI
 * says exactly this when asked for a course or module without a brief.
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
 *    `have`, `that`, `it`) — so hi-en's get theirs.
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
 * There is no seam-proof fixture to replace: `content/hi-en/modules/` does not exist until #270
 * authors L1-M1 against the brief below.
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
};
