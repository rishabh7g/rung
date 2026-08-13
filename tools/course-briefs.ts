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
 * Three courses are briefed, L1 only: hi-mr, en-es and en-ar. The L2/L3 module lists are RATIFIED
 * (#112 closed [Q1] — titles, jobs and sequence in levels.json are final), but their briefs are
 * written when the L2/L3 authoring project starts: a brief encodes pattern-and-interference
 * pedagogy that should be planned against the verified L1 ladder, not ahead of it. en-ar's own
 * L2/L3 lists are still placeholder text (PRD §5) and are not briefed either. The CLI says exactly
 * this when asked for a course or module without a brief.
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
 *    index rules get their own section below.
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
 * en-ar's own `content/en-ar/modules/L1-M1.json` is a four-sentence `fixture: true` seam proof
 * (#118), not a first draft: M1 is re-authored fresh to the full ten sentences against the brief
 * below, and the fixture's four frames are the only part that survives.
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
};
