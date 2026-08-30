# LLM review — en-fr L1-M1 and L1-M2

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Fable 5), which
cannot hear anything and is not a native or fluent French editor in the sense a course like this
eventually needs — it wrote the French, the English teaching prose and the pronunciation glosses,
and then audited all three. `verified: true` on both modules rests on the repo owner's standing
authority, exactly as hi-mr's (PR #190), en-es's (#192–#194), en-ar's (#199–#201) and hi-en's
(#270–#272) flips did; `verifiedBy` says so in words:
`"Claude Fable 5 — LLM review, authorised by repo owner"`, `verifiedAt` `2026-08-30`. **No native
or fluent-French gate exists for this course**, and the open-questions list at the bottom is the
outstanding work.

Nothing here reaches a learner yet: `content/courses.json` still carries `fixture: true` on the
en-fr row, so a strict build skips the course entirely (#331 is the issue that flips it). A dev
build (`--with-unverified --with-fixtures`) ships both rungs.

## What was authored

|                       | L1-M1 Who I am                         | L1-M2 First exchange   |
| --------------------- | -------------------------------------- | ---------------------- |
| sentences             | 10                                     | 10                     |
| new word rows         | 18 of 25 allowed                       | 11 of 25 allowed       |
| variations            | 3 on every sentence                    | 3 on every sentence    |
| pool items            | 12                                     | 12                     |
| tokens per sentence   | 3–4 (bounds 3–5)                       | 2–4 (bounds 2–5)       |
| enrichment            | full (all five blocks, every sentence) | full                   |
| `glossEn`             | every sentence                         | every sentence         |
| `literal`             | 7 of 10 (where the order diverges)     | 5 of 10                |
| `register`            | `neutral` on all ten                   | `neutral` on all ten   |
| prerequisites         | `[]`                                   | `["L1-M1"]`            |
| cumulative index      | 24 surfaces, `maxSpan` 3               | 37 surfaces, `maxSpan` 3 |

There was no fixture to replace: `content/en-fr/modules/` did not exist before this issue. The two
modules were written strictly in ladder order against `tools/course-briefs.ts` (#327) via
`npm run content:prompt`, rebuilding the index between them, so M2's prompt was generated against
M1's real cumulative inventory (24 surfaces). `content/en-fr/levels.json` now carries
`hasContent: true` and no `draft` flag on both rungs; the L1 level itself keeps its fixture-era
`draft` flag until #331.

Two standards that had to be retrofitted onto the older courses are baked in from the first
module, so en-fr will never need the retrofit: **three variations on every sentence** (#288's bar
on hi-en) and **twelve comprehension items per module** (#292's). Both are pinned in
`tools/content-build.test.ts`.

## The six decisions of the briefs' en-fr header, as shipped

1. **Register — the course speaks `vous`.** Every second-person line is the `vous` form:
   `Vous êtes fatiguée ?`, `Vous êtes anglais ?`, and the variations' `Vous êtes de Paris ?`,
   `Vous aimez le café ?`, `Vous vous appelez Marc ?`. No `tu`, `te`, `toi`, `ton`, `ta`, `tes` or
   `salut` appears in ANY L2 slot — display, `forms`, variation, mistake or pool item — and
   `src/course/types.test.ts` asserts it mechanically over every en-fr file it finds. The `être`
   row's `forms` are `suis · êtes · est` and deliberately do NOT list `es`, so the index never
   carries a shape the course does not teach; the emitted index is checked for its absence in
   `tools/content-build.test.ts`. `tu` and `salut` are named in prose — M2-S01's word note says
   `salut` "belongs with tu, the register this course does not write; you will hear it constantly
   and will not need it here" — because naming is not writing. Every sentence chips `neutral`.
2. **Elision.** `j'aime` (M1-S05) and `je m'appelle` (M1-S01) are each their own word row, and
   neither lists the bare stem in `forms`. That separation is the whole policy and it is
   observable on the real index: `j'aime` lands on `L1-M1-S05#0` while `aime` — opened by M1-S10's
   `Anne aime la musique` — lands on `L1-M1-S10#0`, so a learner tapping `aime` in a
   name-subject sentence is told "likes", not "I like". Straight `'` throughout; the type test
   rejects a curly one anywhere in an L2 slot.
3. **Accents.** Written everywhere, on capitals too (`Ça va ?`, `Ça va bien, merci`). The
   unaccented rivals the briefs kept out of L1 — `a`, `ou`, `là`, `ca` — are absent from the
   index, so no accent pair has a competitor yet. M2-S05's mistake plate is exactly this rule:
   `Je suis fatigue` says "I am tiredness", because `fatigue` without the accent is a noun.
4. **Multi-token surfaces.** `Je m'appelle` (2 tokens), `vous vous appelez` (3, on the same row),
   `Ça va` (2) and `Au revoir` (2). Each claims no bare part, which is what leaves `ça` free for
   M8's `Ça coûte combien ?` and `au` free for M7's `à + le` contraction — both verified absent
   from the M2 index. `maxSpan` is 3 from M1 onwards.
5. **Questions — intonation.** Every question in both modules is the statement with a rising voice
   and a mark: `Ça va ?`, `Comment ça va ?`, `Vous êtes anglais ?`. A space precedes every `?`, as
   French writes it; the tokenizer drops the lone mark, so it costs the index nothing. Inversion is
   present only as M2-S07's mistake plate (`Êtes vous anglais ?`, wrong for want of its hyphen) and
   named in the trap as the formal register. `est-ce que` appears nowhere: it carries a hyphen, and
   `surfaceIndexKeys` would have handed it the bare `est` and `ce` keys.
6. **Homographs.** `est` is a `forms` entry of M1-S02's one `être` row, so every `est` in both
   modules — and every later `Où est … ?` — opens a note written true of identity, origin,
   location and the M5 auxiliary alike. `le`, `la` and `les` are three separate article rows (the
   en-es precedent), each note naming the whole set. `de` is M1's, and its note was written for
   all four seats it will ever have in L1, because no later module can reach the key.

## The audit, sentence by sentence

Every grammatical claim in a `rules[].text`, a word `note`, a `trap`, a `mistake.why`, a `usage`
or a `sound` was checked against the sentence beside it — header rule 1 of
`tools/course-briefs.ts`, the rule hi-mr's M5 brief broke (`docs/07-llm-review-L1-M1-M5.md`, "The
#110 adjudication").

**L1-M1.** S01 `Je m'appelle Marc` — the reflexive chunk, `literal` "I call-myself Marc", trap
naming `Mon nom est Marc` as the word-for-word translation nobody says. S02 `Je suis de Paris` —
the `être` row and the `de` row, both written for every seat they will hold; mistake
`Je suis de la Paris` (a city takes no article after `de`). S03 `Je suis étudiant` — the bare
profession, mistake `Je suis un étudiant`, and the note is careful that the feminine `-e` here is
NOT silent: it wakes the final `-t`. S04 `Je suis français` — agreement with the subject, the
lowercase adjective against the capitalised noun `un Français`, and the `-e` waking the `-s` into
a `z`. S05–S07 `J'aime le café / la musique / les livres` — the definite article English drops,
one sentence per gender and number, with `*J'aime café` on the mistake plate. S08
`Marc est journaliste` — `est` from M1's own row, and `journaliste` chosen deliberately for a job
whose spelling does not change with the holder's sex. S09 `Anne est française` — the trap says
SUBJECT, not speaker. S10 `Anne aime la musique` — the bare `aime` row that keeps the elision
policy honest, with `Anne j'aime la musique` as the mistake.

**L1-M2.** S01 `Bonjour Marc` — one greeting for the whole day, mistake `Bon matin, Marc`
(recorded honestly as what Quebec says and France does not). S02 `Bonjour, ça va ?` — the idiom
taken whole, and the trap that "how are you?" does not survive word-for-word translation:
`Comment êtes-vous ?` asks what sort of person you are. S03 `Ça va bien, merci` — `bien` the
adverb against `bon` the adjective, which is the mistake plate. S04 `Comment ça va ?` — a question
word in front and nothing else moved. S05 `Je suis fatigué` — the one agreement the ear cannot
check, and the accent mistake above. S06 `Vous êtes fatiguée ?` — the `vous` row carrying the
course-wide decision, and the `vous êtes` liaison in the `sound` line. S07 `Vous êtes anglais ?` —
the intonation question against the hyphenated inversion. S08/S09 `Oui, …` / `Non, …` — the
one-word answers, with the trap that `non` does not make the sentence behind it negative (the
two-part `ne … pas` is M3's machine). S10 `Au revoir, Marc` — the fixed closing, with `au` named
as `à` welded onto `le` inside a phrase that never comes apart.

### Corrections applied during the pass

1. **`suis` cue widened to `am · are · is`.** The row owns three surfaces, and the first draft's
   cue read "I am" — so a learner tapping `est` in `Marc est journaliste` would have been shown
   "I am". Same correction on `livres` (`books` → `book · books`), `étudiant`
   (`student` → `student (m · f)`) and `français` (`French` → `French (m · f)`): a row that owns a
   paradigm must cue the paradigm, not the shape that happened to open it. This is the hi-mr
   `forms`-swallowing lesson one step further on — the row was right, the label on it was not.
2. **`professeur` replaced by `journaliste` in M1-S08.** The first draft's job word forced a note
   about whether the feminine is `un professeur` or `une professeure`, which is a live question in
   French usage and not something an L1 module should adjudicate in passing. `journaliste` has one
   spelling for both, so only the article would change, and the note says exactly that.
3. **Negation kept out of M1 and M2 variations.** An early draft used
   `Je ne m'appelle pas Marc` as a variation. `ne … pas` is M3's lesson and its own two index
   rows; showing it two modules early would have put a construction on screen with no row behind
   it. Replaced by `L'étudiant s'appelle Marc`, the en-es `El estudiante se llama Rohan`
   precedent.
4. **`et` kept out of M2's word rows.** M2-S03's third variation writes `Ça va bien, et je suis
   fatigué`, but `et` is M10's declared spend, so it is shown in a variation (which the index does
   not gate) and NOT opened as a row. The M10 brief still owns the key.
5. **An inverted variation removed.** M2-S04's third variation was `Comment vous appelez-vous ?`,
   which is correct French and breaks the course's own question policy — inversion is out of L1.
   It is now `Vous vous appelez comment ?`, the in-situ question, and rule 3 was rewritten to
   state the real law rather than half of it: a question word never drags the verb with it, and it
   may stand in front (`Comment ça va ?`) or stay where the answer would go. That wording is also
   what M8's `C'est combien ?` will need, so the module and the ladder now agree.
6. **The vocative comma made consistent.** M2's declared pattern is `Bonjour + , + name`, and the
   first draft's hero wrote `Bonjour Marc` while its closing wrote `Au revoir, Marc`. Every
   greeting now carries the comma, including the pool item — the module matches the pattern it
   declares.

### The pool audit — every token, and the row it lands on

Both pools were resolved token by token against the emitted cumulative index
(`public/content/en-fr/index/L1-M1.json` and `L1-M2.json`), and each landing was read back to the
word row it points at. 24 tokens in M1's twelve items and 32 in M2's; **zero unresolved, zero
landing on a row whose note is false of the sentence it appears in.** The landings worth naming:

- `est` in C02, C03, C08, C09, C11 (M1) and C08, C09 (M2) → `L1-M1-S02#1` `"suis"`
  `am · are · is` — the one `être` row, as designed.
- `étudiante` (M1-C08) → `L1-M1-S03#0` `"étudiant"`; `française` (M1-C10, M1-C12) →
  `L1-M1-S04#0` `"français"`; `fatiguée` (M2-C07, M2-C08) → `L1-M2-S05#0` `"fatigué"`;
  `livre` (M1-C05) → `L1-M1-S07#1` `"livres"` — every one a genuine other shape of that word.
- `ça va` (M2-C02, C03, C12) → `L1-M2-S02#0` `"Ça va"` taken whole, never split into `ça` + `va`.
- `au revoir` (M2-C10) → `L1-M2-S10#0` `"Au revoir"`, whole.
- `j'aime` (M1-C05, C12) → `L1-M1-S05#0`; `aime` (M1-C06, C07) → `L1-M1-S10#0`. Two rows, two
  notes, and the right one each time.

No pool item equals a hero sentence of its own module, case-insensitively — pinned in
`tools/content-build.test.ts`.

## Verification

- `npm run content:validate` — `CONTENT 42/42 ok`, both en-fr files included.
- `npm run content:build -- --with-unverified --with-fixtures` — `en-fr: 2 modules (L1-M1..M2)`,
  indexes 24 and 37 surfaces, no pool warnings.
- Strict `npm run content:build` — unchanged: `en-fr: 0 modules — fixture course, excluded by the
  gate`, and no `public/content/en-fr/` is written.
- `src/course/enFrAuthored.test.tsx` — the dev-build smoke, by test and never by a browser
  (CLAUDE.md bans Playwright and Chromium on this host): the real `<App />` booted over the real
  `content/en-fr/` tree, the ladder in English chrome with `lang="en"`, each rung's ten cards,
  Sentence Detail with the gloss paragraph present (the L2 is not English) and the WORD-FOR-WORD
  plate beside it, and the Why panel answering `Marc est de Paris`, `Merci, ça va bien` and
  `J'aime le livre` with the rows named above.
- `scripts/verify.sh --fast` green.

## Open questions for a native or fluent French reviewer

The list a later pass owes an answer to. These are the places where an LLM's judgement is weakest:
naturalness, register and anything that has to be heard.

1. **The vocative comma.** Every greeting now writes it (`Bonjour, Marc` · `Au revoir, Marc`),
   which matches careful written French and the module's declared pattern. In practice a great
   deal of written French drops it after `bonjour`. Is the comma the right thing to model?
2. **`Vous vous appelez Marc ?`** and **`Vous vous appelez comment ?`** are both offered as
   variations of the naming frame. Are the in-situ forms natural to a French ear, or does a
   speaker reach for `Comment vous appelez-vous ?` often enough that L1 should teach the inversion
   after all? This is the sharpest test of the intonation-only question policy.
3. **`Ça va bien, merci` vs `Ça va, merci`.** Both are shipped. Is `bien` the more usual answer, or
   does it read as slightly emphatic?
4. **`Comment êtes-vous ?`** is used on M2-S02's trap plate as the thing "how are you?" wrongly
   becomes. Is that gloss right — does it ask what sort of person you are, or is it simply odd?
5. **`Bon matin`** is flagged on M2-S01's mistake plate as Quebec usage, not France's. Is that a
   fair statement, and is flagging a regional usage as a "mistake" the right call for a course
   with no declared variety? (en-ar had to ratify a variety; en-fr has not, and probably should.)
6. **The pronunciation glosses are written in English respelling** (`zhuh ma-PEL`, `voo-ZET`,
   `frahn-SEH`). Nobody has heard them. Every `sound` line in both modules needs a listener.
7. **`journaliste` and `étudiant` as the two jobs of M1.** Are these the two an actual beginner
   most needs? And is `Je suis journaliste` the natural way to say it, or would a speaker say
   `Je travaille comme journaliste`?
8. **The `-e` claims.** Three separate claims are made about the feminine `-e`: silent after a
   vowel (`fatigué` / `fatiguée`), waking a final `-t` (`étudiant` / `étudiante`), and voicing a
   final `-s` (`français` / `française`, `anglais` / `anglaise`). All three are stated as fact in
   word notes. A native should confirm all three, and say whether the course is right to make so
   much of a distinction most learners will not hear for a year.
9. **Is `Anne aime la musique` a natural sentence**, or does a French speaker prefer
   `Anne aime bien la musique` / `Anne adore la musique`? The bare `aimer` + a thing is taught
   here as the plain "like", which is what en-es does with `gustar`; the two languages may not
   line up.
10. **The register decision itself.** `vous` course-wide is the survival choice, and it means a
    learner finishes L1 unable to speak to a friend. Is that the right trade for a first level, or
    should M2 have introduced `tu` as recognition-only? The decision is recorded in
    `tools/course-briefs.ts` and is cheap to revisit before more modules inherit it.
