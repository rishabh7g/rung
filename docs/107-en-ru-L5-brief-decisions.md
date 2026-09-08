# en-ru L5 — the authoring-brief decisions (#567)

The ten en-ru L5 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['en-ru']` L5-M1…L5-M10) are the
last level of this course and the last level of this product: **nothing defers past L5**, so a
piece the ladder has been passing along since L2 either lands in one of these ten modules or is
named below as a hole.

Every seam was pinned against the REAL cumulative index, read with
`npm run content:owner -- en-ru <surface> …` on **2026-09-08**. The fold moved twice while the
briefs were being written, because the L4 authoring waves were landing as they were read:

| read at | fold | surfaces | `maxSpan` |
| --- | --- | --- | --- |
| first pass | 36 modules through L4-M6 | 893 | 3 |
| second pass | 39 modules through L4-M9 | 952 | 3 |
| **final pass — what every claim below is checked against** | **40 modules through L4-M10** | **966** | **3** |

Titles and jobs are `content/en-ru/levels.json` verbatim (#423 ratified the list; the brief test
enforces the mirror). The review chain this level inherits is `docs/45` (spoken Russian),
`docs/64`, `docs/80` and `docs/98`, and the decisions it inherits are `docs/56`, `docs/72` and
`docs/89`.

## 1. The course's own laws, unchanged — and the one that changes

Romanized `display`, Cyrillic on the quiet `script` line, **a precomposed acute on every
polysyllable and none on a monosyllable**, NFC and never a combining mark, `ё` written `yó`, and no
Cyrillic character in a romanized field. L5-M1 and L5-M10 restate all of it, because this level
writes more monosyllables than any below it (`tost`, `rech'`, `smysl`, `bog`, `uzh`, `vzglyad`) and
a wave that marks one of them has invented a key.

Register carries from `docs/56` §3 unchanged: `vy` is the default, `ty` was an EVENT at L2-M6, and
**L5 adds no register rule** — it adds the ability to MOVE between the registers the course already
has. M4 and M6 speak `vy` and chip `formal`; M2, M3 and M10's second half chip `informal`.

**The one law that changes: `maxSpan` rises 3 → 4, at L5-M1.** It is the first raise since L1-M8
and it is deliberate. Four of M1's eight idioms are four tokens (`ni púkha ni perá`,
`kak dve kápli vodý`, `ne v svoyéy tarélke`, `délat' iz múkhi sloná`), and an idiom is one lexeme
that happens to be four words: letting it split hands the learner `púkha` and `perá` as *fluff* and
*feather*, which is the wrong note under the right word. The cost is bounded and precedented —
en-fr's index already runs at `maxSpan` 6 and en-ar's at 5, against en-es's and en-ru's 3 — and the
ceiling is 4: **no L5 module may write a five-token key.** M8's `ya iméyu v vidú` is the only other
module to use the new room.

## 2. What L4 withheld, and where each piece lands

`docs/89` §5 names nine deferrals. L5 takes **six and a half** of them:

- **Diminutives → L5-M2.** Taken as the derivational system they are (`-ik`/`-chik`,
  `-ka`/`-ochka`, and the name series `Iván` → `Ványa` → `Vánechka`), with the warning that a
  diminutive is intimacy and not politeness.
- **`rázve` / `neuzhéli`, and irony → L5-M7**, which `levels.json` gives implication and sarcasm by
  name. Jokes that are visibly jokes stay at M2; the sentence that means its opposite is M7's.
- **The `-to` particle → L5-M7 (emphatic) and L5-M8 (indefinite).** These are two different
  morphemes and the split is on purpose: `ya-to znáyu` is contrastive insistence, `chto-to` is an
  unidentified something, and teaching them in one module would blur both.
- **Bookish connectors → L5-M6.** `slédovatel'no`, `takím óbrazom`, `poskól'ku`, `vslédstviye`,
  `v rezul'táte`, `tem ne méneye`. With them, the two written-register VARIANTS the lower level
  sent along: L4-M1's `dlya tovó chtóby` and L4-M6's `v techéniye`, each one row shown beside the
  plain form it varies.
- **`byválo`, free indirect style and the narrative present → L5-M9.** All three, as `docs/89`
  said.
- **The prefixed indeterminate stem → half taken.** L5-M9 takes `prikhódit` as VOCABULARY inside
  the narrative-present frame, because `I vot on prikhódit i govorít …` is the frame. The prefix
  GRID on the indeterminate stem is not taught: see §5.

## 3. The module-by-module ladder — what each owns and why it sits where it does

- **M1 Sayings and idioms** — the frozen phrase, and the two idioms that demand a reply
  (`ni púkha ni perá` → `k chyórtu`, `s lyógkim párom` → `spasíbo`). It opens the level because M2,
  M3 and M7 all rest on its one fact: a Russian sentence can mean something its words do not. It is
  also where `maxSpan` rises, and doing that first means every later module knows the room it has.
- **M2 Humour and teasing** — diminutives as a derivational system, plus `smeyát'sya nad` +
  INSTRUMENTAL (L3-M2's case, third seat; and there is no Russian frame meaning *laugh with*).
- **M3 How they say it there** — the DISCOURSE PARTICLE (`nu`, `koróche`, `típa`, `kak by`,
  `v óbshchem`, `slúshay`), whose absence is what marks a foreigner, plus a small regional lexical
  set. It also finally teaches `privét`: see §4.
- **M4 Formal occasions** — the CASE OF GOOD WISHES: `pozdravlyáyu s` + instrumental, `zheláyu` +
  genitive, `za` + accusative. Three frames, three cases, no new case. It also holds the closed
  list of frozen attributive participles (`uvazháyemyy`, `prisútstvuyushchie`).
- **M5 Big questions** — VERB GOVERNMENT for abstract talk: `vérit' v` + accusative against
  `vérit'` + dative, `zavísit ot` + genitive, and the impersonal generaliser (`chelovék dólzhen …`).
- **M6 Arguing a position** — the CONCESSION-REFUTATION pair
  (`Na pérvyy vzglyad … , no na sámom déle …`) and the written connector register. It sits after M5
  because a case needs something to be about, and next to M5 because the two must not merge: M5
  states a belief, M6 defends one.
- **M7 Between the lines** — the rhetorical question (`rázve` expects *no*, `neuzhéli` expects
  surprise), the emphatic `-to`, and the indirect request that is a plain statement of fact
  (`Zdes' khólodno`). The level's only module whose bound goes DOWN: see §6.
- **M8 When words run out** — the indefinite `-to` / `-nibud'` series, the circumlocution frame
  (`Éto takáya shtúka, kotóraya …`) and the repair moves. The most immediately useful module in the
  product, and it sits after M7 on purpose: M7 is where a learner first fails to understand
  something.
- **M9 Telling it your way** — the narrative present, `byválo`, and the story frames
  (`Zhil-byl …`, `Odnázhdy …`, `I vot …`, `koróche govoryá`).
- **M10 Your own voice** — NOTHING NEW except three or four pivot phrases. The eight-sentence piece
  changes register midway and signals the change; the per-sentence bound applies inside the piece.

## 4. Seams — L5 never edits a file below it, and where the index contradicted the brief

Five places where the first instinct was wrong and `content:owner` settled it. Each is written into
the module's own INDEX SEAM note, because an author only ever sees the notes.

1. **`dnyóm` is L1-M4's, not fresh** (M4). The instinct was that a congratulation opens
   `s dnyóm rozhdéniya` whole and mints `dnyóm`. `content:owner -- en-ru dnyóm` returns **L1-M4** —
   the time adverb *in the daytime*, a frozen instrumental of `den'`. So `s dnyóm rozhdéniya`
   indexes WHOLE at three tokens: the greeting opens the greeting's note and a bare `dnyóm` still
   opens L1-M4's, which is true of the word and false of the phrase. `den' rozhdéniya` → L3-M9,
   also whole. Same shape as L4-M6's discovery about `poslé` / `poslé étovo`.
2. **`ot` is FREE** (M5). Four levels of directions, letters, causes and journeys, and nobody
   opened the commonest preposition in the language: `content:owner -- en-ru ot` returns `free`
   across all forty modules (L2-M4 took `do`, L4-M2 took `íz-za` and `blagodaryá`). M5 opens it, in
   `zavísit ot`. `chelovék` is free too, at 966 surfaces.
3. **`kotóraya` is FREE, and it is a hole in a paradigm L3-M9 believes it owns** (M8).
   `content:owner -- en-ru kotóryy kotóroye kotórye kotóruyu` returns **L3-M9** for all four and
   **`free`** for the feminine nominative. L3-M9 writes `kotóraya` five times — in a rule, in a word
   note, in a `complexity.allowedPattern`, and in a `mistake.display`, which #491 exempts — so the
   module shipped green (`npx tsx tools/check-shown.ts en-ru L3-M9` says *clean*) with a gap in the
   middle of its own paradigm. M8 needs the form for `takáya shtúka, kotóraya …` and opens it as its
   OWN row pointing back at L3-M9's, editing no L3 file.
4. **`privét` is FREE** (M3). L1-M2 names it in `rules[6]`, in a `trap` and in a `mistake.display`
   — all three exempt from the ratchet — and never opens a row. A learner has therefore been told
   what NOT to say without being told what it is. M3 opens it, pointing back at L1-M2's register
   rule; M3 is the right owner because that rule is generational and regional, which is M3's job.
5. **`kázhdyy` moved under the brief while the brief was being written** (M5). The L4-M9 brief
   claimed `kázhdyy den'` → L1-M4 as a whole key "with the bare `kázhdyy` still free"; L4-M9 has
   since been authored and now owns the bare adjective (`content:owner` returns **L4-M9**). Every
   claim in this document was re-read against the final 966-surface fold for exactly this reason.

Four more seams that are stated in the briefs and were checked rather than assumed:

- **`znáchit` → L4-M2** and **`yest'` → L1-M7**, so M8's `chto znáchit` and `to yest'` index WHOLE
  at two tokens; otherwise a tap on `to yest'` says *there is*.
- **`po-rússki` → L1-M4 already**, hyphen parts and all (`po` → L1-M4, `rússki` → L1-M4), so M8's
  most idiomatic sentence costs the index nothing.
- **`pérvyy` free, `pérvykh` L4-M4's** — L4-M4's `vo-pérvykh` donated both its hyphen parts, so
  `vo` → L4-M4 too. M6 indexes `na pérvyy vzglyad` WHOLE and **no L5 display may write a bare
  `vo`**, which would open an argument-ordering note under a shape of L1-M7's `v`.
- **`zhil-byl` is one token** (M9) and its donated parts are already owned (`zhil` → L4-M8,
  `byl` → L1-M5): nothing is stolen, nothing is re-taught, and a hyphenated pair costs no span at
  all.

**The hyphen the level could not avoid** (M7). `surfaceIndexKeys` splits `ya-to` into `ya`, `to`
and the whole; `content:owner -- en-ru ya-to` returns `free   [parts: ya → L1-M1, to → free]`. So
the emphatic clitic DONATES a bare `to` that nothing in forty modules has claimed, and M7 will own
it. The brief takes the fix rather than the workaround, as L4-M4 did with `vo`: the row's note is
written TRUE OF THE PART, naming `to` as the clitic half and saying that the separate word `to` (as
in `to yest'`) is a different animal, which M8 indexes whole. **And the stress law decides the
spelling, on index grounds:** both halves of `ya-to` are monosyllables, so it is written with no
mark at all — `yá` and `ya` are two different keys (`content:owner` returns `free` for `yá` and
L1-M1 for `ya`), and an invented acute would donate a key pointing at nothing instead of at L1-M1's
pronoun. The same reasoning covers `on-to`, `chto-to`, `gde-to`, `kto-to` and `zhil-byl`. The one
form the law does not cleanly decide is M10's `vsyó-taki`, whose second element is an unstressed
POLYSYLLABLE: see question 96.

## 5. Where every deferral lands — and the four holes this product ships with

This is the last level, so a deferral that lands nowhere is a hole in the product rather than a
plan. Named as holes, not passed on:

- **The PRODUCTIVE attributive participle.** `docs/89` sent it to "L5-M4's formal occasions and
  L5-M6's structured case". M4 takes a CLOSED LIST of frozen address forms (`uvazháyemyy`,
  `prisútstvuyushchie`) and names them as participles in one usage line; M6 declines to open the
  system, because a module that has to teach six connectors and the concession-refutation pair
  cannot also teach participle formation without spending its whole `newWordCap` on endings.
  **Forming a participle from a verb is therefore not taught anywhere in this product.** A learner
  finishing L5 reads `zakrýto` (L4-M7) and `uvazháyemyy` (L5-M4) and cannot make a third. This is
  the largest hole and it is the honest candidate for a sixth level or for a later L5-M4 wave with
  its own issue.
- **The prefix grid on the indeterminate stem** (`prikhodít'`, `ukhodít'`, `uyezzhát'`). M9 takes
  `prikhódit` as vocabulary in one frame; the imperfective half of the prefixed motion system is
  not taught. Smaller than it looks — the learner owns every perfective member from L3-M10 and
  L4-M9 — but it is a hole and it should be recorded as one.
- **`nestí` / `vestí` / `vezti`.** Not taught anywhere. `docs/89` named them in a usage line at
  L4-M9 and left them, and L5 has no module whose job they serve.
- **`yésli by ne`** ("if it were not for"). One frame on top of L4-M3's; no L5 module's job needs
  it, and inventing a home for it in M5 or M6 would have been the wrong kind of tidiness.

Everything else `docs/89` §5 listed is placed in §2 above. Two smaller pieces from further down the
ladder also land here: `docs/56`'s note that `mat` and obscenity are out of scope is restated in
M2 and M3 rather than left implicit, and `docs/72`'s deferral of the storyteller's register lands
whole at M9.

## 6. The shape of the level

- **Bounds: 14 → 15, with one deliberate step DOWN.** M1–M3 at 14, M4–M6 at 15, **M7 at 13**,
  M8 at 14, M9–M10 at 15. The level opens on the number L4 closed on, as every level of this course
  has (L1 5 → 8, L2 8 → 10, L3 10 → 12, L4 12 → 14), and it raises the ceiling by exactly ONE word,
  because L5 is about voice and not length. The step down at M7 is the module's content rather than
  an oversight: implication works by saying LESS than is meant, `Zdes' khólodno` is two words, and a
  thirteen-word bound is the brief telling the author so. M9's and M10's bounds apply INSIDE the
  retelling and the eight-sentence piece, as at L3-M10 and L4-M10.
- **`newWordCap` is 25 everywhere.** PRD §5's figure; `tools/course-briefs.test.ts` asserts
  `toBe(NEW_WORD_CAP)` for every brief in the file. M10's honest spend is three or four pivot
  phrases and it should come nowhere near the cap; if a module runs over, drop paradigm cells no
  sentence shows (`docs/80` wave 3), never raise the cap.
- **`maxSpan` 3 → 4 at M1, ceiling 4.** §1. The only other module to use the room is M8
  (`ya iméyu v vidú`).
- **M10's items are eight-sentence pieces** with exactly one signalled register pivot each.
- **Pools are authored to 12**, as at every level of this course.
- One thing for the merge rather than a brief: the `en-ru` describe blocks in
  `tools/course-briefs.test.ts` assert bounds per level; adding L5 wants a new
  `en-ru L5: the decisions its briefs settle (#567)` block in the shape of the L2, L3 and L4 ones,
  pinning the 14/15/13 bound pattern, the `maxSpan` raise, the four holes in §5 and the five seam
  corrections in §4. The fragment does not touch the test.

## 7. Open questions for the native pass

Continuing this course's chain. The last number used is **89**, in `docs/98`'s wave 2. Nothing above
is renumbered. `docs/98`'s L4 review waves were still landing as this was written, so if a wave has
taken 90–95 in the meantime, **this block is renumbered upward at merge and `docs/98` is not
touched.**

90. **The idiom set itself** (M1). Confirm that these eight are the figurative phrases a Russian
    actually uses in ordinary speech in 2026, and that none is dated or bookish. Specifically:
    is `délo v shlyápe` still current or does it read as a grandparent's phrase, and is
    `rúki ne dokhódyat` the ordinary way to say one has not got round to something?
91. **The two ritual replies** (M1, note 2). Confirm that `ni púkha ni perá` is answered
    `k chyórtu` and never `spasíbo`, that answering it `spasíbo` is genuinely the visible foreign
    move rather than merely unusual, and that `s lyógkim párom` is still said outside a banya.
92. **Where the diminutive line is** (M2, note 3). The module's social claim. Confirm that
    `Vánechka` to a colleague reads as presumption rather than warmth, say whether a foreigner
    should be taught to PRODUCE name diminutives at all or only to recognise them, and confirm that
    a diminutive on a thing (`knízhka` of a serious book) is heard as belittling.
93. **`smeyát'sya nad` and the missing frame** (M2, note 2). Confirm that `nad` + instrumental is
    always *laugh at* and that Russian has no ordinary way to say *laugh with*, so the brief is not
    hiding a frame a learner will need.
94. **Filler density and generational marking** (M3, note 2). The module's whole premise. Confirm
    that `típa` and `koróche` mark a speaker as young rather than merely as informal, that
    `kak by` is the hedge the brief claims, and say which of the six a learner over forty should be
    taught to produce and which only to recognise.
95. **The regional pairs** (M3, note 2). Confirm `podyézd` / `parádnaya`, `bordyúr` / `porébrik`,
    `batón` / `búlka` and `shaurmá` / `shavermá` are the pairs a visitor meets first, and confirm
    which member is the unmarked national default so the course teaches that one as the base.
96. **`vsyó-taki`, and the stress law's edge** (M10, §4 above). Its second element is a POLYSYLLABLE
    that carries no stress, so the law — a mark on every polysyllable — and the phonetics pull
    apart, exactly as they did for `íz-za` in question 58. Is `vsyó-taki` right, or should the
    course write an acute it does not hear? The answer should settle the general case of an
    unstressed polysyllabic clitic, since `chto-nibud'` is the same shape.
97. **`zheláyu` + genitive, and the toast** (M4, note 2). Confirm that `Zheláyu vam schást'ya` is
    the natural wish and that the accusative there is wrong rather than regional, and confirm that
    `Davayte výp'yem za …` is what is actually said at a table rather than a phrasebook sentence.
98. **`Primíte moí soboléznovaniya`** (M4, note 2). Confirm this is the sentence a guest says rather
    than an official one, and say what a Russian says to a friend, which may be shorter and is the
    version a learner will need first.
99. **`vérit' v` against `vérit'` + dative** (M5, note 2). The module's load-bearing claim. Confirm
    that `Ya vam véryu` is *I believe you* and `Ya véryu v vas` is *I believe in you*, and confirm
    the frames do not overlap in ordinary speech.
100. **`zavísit ot`, and whether `ot` is really untaught** (M5, §4). The index says `ot` is free
     across forty modules, which is startling. Confirm the course has genuinely never needed it —
     that L2-M4's directions really do run on `do` alone — so that opening it at M5 is not a
     duplicate of a row a reviewer remembers seeing.
101. **The register of the bookish connectors** (M6, note 3). Confirm that `slédovatel'no` and
     `vslédstviye` are written-register in the way the brief says, that `odnáko` also lives as a
     spoken exclamation of surprise, and say which of the six a learner may safely use in speech.
102. **`rázve` against `neuzhéli`** (M7, note 2). Confirm the split — `rázve` challenges and expects
     *no*, `neuzhéli` asks for confirmation of something surprising — and confirm that a learner
     producing `rázve` is heard as arguing rather than as rude.
103. **The emphatic `-to`** (M7, note 2). Confirm that `Ya-to znáyu` carries the unstated contrast
     the brief claims, say whether it is safe for a learner to produce, and confirm that writing it
     with no stress mark matches how it is printed.
104. **`-to` against `-nibud'` under negation** (M8, note 3). Confirm that the English
     *some-/any-* mapping holds where the brief says it holds and fails where it says it fails, and
     confirm what a Russian actually says for *I did not see anything* so the mistake plate charges
     the right thing.
105. **`Éto takáya shtúka, kotóraya …`** (M8, note 2). Confirm that `shtúka` is what a speaker
     reaches for when the word is missing and is not too casual for a shop or an office, and confirm
     the feminine relative agrees as the brief writes it.
106. **The narrative present, and `Zhil-byl`** (M9, note 2). Confirm that the present-tense switch
     mid-story is ordinary spoken narration rather than a literary device, and confirm that
     `Zhil-byl` opens a fairy tale ONLY, so that using it for an anecdote is heard as a joke.
107. **`byválo`** (M9, note 2). Confirm it is still used by speakers under fifty, and say how it
     differs in feel from L3-M10's `ránshe` + imperfective, which the brief calls warmer and more
     nostalgic.
108. **The register pivot** (M10, note 3). The product's last claim. Confirm that
     `Yésli chéstno` and `Chéstno govoryá` signal the turn the brief describes, and confirm that a
     piece may change tone across such a pivot while the `vy` pronoun holds — that the pronoun and
     the register are genuinely separable, which is what the whole module depends on.
109. **A stress list, continuing questions 77 and 89.** Every mark this wave writes for the first
     time, checked against a dictionary rather than a memory: `slédovatel'no` (front-stressed),
     `vslédstviye`, `porébrik`, `obizháysya`, `agá`, `soboléznovaniya`, `prisútstvuyushchie`,
     `spravedlívost'`, `sóvest'`, `sud'bá`, `odnázhdy`, `byválo`, `seryózno` — and the monosyllables
     that must carry NO mark: `tost`, `rech'`, `smysl`, `bog`, `uzh`, `vzglyad`, `kto`, `to`.

`npm run content:prompt -- en-ru L5-M1` renders from the real index once the fragment is merged into
`tools/course-briefs.ts`.
