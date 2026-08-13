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
 * Two courses are briefed, L1 only: hi-mr and en-es. The L2/L3 module lists are RATIFIED
 * (#112 closed [Q1] — titles, jobs and sequence in levels.json are final), but their briefs are
 * written when the L2/L3 authoring project starts: a brief encodes pattern-and-interference
 * pedagogy that should be planned against the verified L1 ladder, not ahead of it. en-ar has no
 * brief at all — its module list is still placeholder text (PRD §5). The CLI says exactly this
 * when asked for a course or module without a brief.
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
 *    keeping the bare word free for whoever should own it.
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
};
