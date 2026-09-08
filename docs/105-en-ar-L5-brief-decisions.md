# en-ar L5 — the authoring-brief decisions (#565)

The ten en-ar L5 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['en-ar']` L5-M1…L5-M10) close this
course's brief chain: `docs/54` (L2), `docs/70` (L3), `docs/87` (L4), and this. **L5 is the last
level of the product**, so every decision below is taken under a rule the earlier docs did not have
to obey: there is nothing after it, and a deferral made here lands nowhere. §5 says out loud where
that bites.

Every seam was pinned against the REAL cumulative index — the fold of
`public/content/en-ar/index/L1-M1.json` onwards, read with `npm run content:owner -- en-ar …` on
**2026-09-08**. The fold moved twice while these briefs were being written, because the L4 authoring
waves were landing at the same time; the readings are recorded with their depth:

| reading | fold | surfaces | `maxSpan` |
| --- | --- | --- | --- |
| first | 36 modules through `L4-M6` | 989 | 5 |
| second | 38 modules through `L4-M8` | 1059 | 5 |
| **planning reading (the one the briefs are written to)** | **39 modules through `L4-M9`** | **1095** | **5** |

`L4-M10` was not yet in the fold when these briefs were written, so its **brief's claims are treated
as SPENT** per the third rule in `tools/course-briefs.ts`'s header: `fajʾatan`, `dhāta yawm`,
`ajāba`, `radda`, `mufājaʾa`, `ṣamt`, `raʾaytu` and `iltaqaytu` are read as owned by `L4-M10` and no
L5 module opens any of them. Nothing below calls a surface free on the strength of a module JSON
read by hand.

Titles and jobs are `content/en-ar/levels.json`'s, mirrored verbatim (#423 ratified them on
2026-09-07; a test enforces the mirror).

## 1. The romanization laws, unchanged — and the one that finally costs the course something

Every law of `docs/34`, `docs/54`, `docs/70` and `docs/87` carries unaltered: one word → one key,
hamza `ʾ` folding to `'` in the index and ʿayn `ʿ` never merging with it, initial hamza unwritten
(so `anna` and `ʾanna` are two keys), the hyphenated clitic indexing whole AND by part, short vowels
always written, sun-letter assimilation spelled, elision never written, `display` romanized and
`script` the Arabic line on every sentence, variation and pool item.

At L4 the law that did the work was **case and mood endings are not written unless lexical**
(L2-M1 rule 4), which made every subjunctive and jussive a matter of the CONNECTOR rather than of a
new verb shape. At L5 the same law does something less comfortable: **it makes one deferral
unpayable.** See §5.1.

Two new spelling bans fall out of the index and are written into the briefs that need them, because
each would have bought a junk key:

- **`alā`, never `a-lā`** (M7). The negative-question particle. `alā → free`, but
  `a-lā → free   [parts: a → free, lā → L1-M2]` — the hyphen would buy a bare one-letter key `a`
  that then answers for every later interrogative alif in the course.
- **Never `bi-aḍ-ḍabṭ`** (M8). `bi-aḍ-ḍabṭ → free   [parts: bi → L1-M2, aḍ → free, ḍabṭ → free]`.
  `docs/87` §3 recorded that every sun-letter article prefix was already owned — `ash → L1-M2`,
  `as → L1-M2`, `ar → L2-M5`, `ad → L3-M7`, `at → L3-M6`, `aṣ → L1-M4`, `az → L3-M7`. **`aḍ` is
  not**, and it is the one that would be bought here. `tamāman → L3-M3` does the job already, so M8
  points back instead.

## 2. What the lower levels withheld FOR L5, and where each one lands

`docs/87` §5 deferred six things to this level by name. Five land; one does not, and §5.1 names it as
a hole rather than passing it on.

- **`mā` as a free relative and as the older negative particle → L5-M1 (recognition) and L5-M8
  (the row).** `docs/87` §3 recorded the surprise that bare `mā` is unowned after thirty modules and
  L4 deliberately left it that way; it is still `mā → free` at 1095 surfaces. The placement is
  deliberate and split: **M1's proverbs index WHOLE** (`mā qalla wa dalla`), so the fossilised
  negator is met without buying the key, and **M8 buys bare `mā`** in `mā maʿnā hādhihi al-kalima`,
  where its row can be written for all three of its jobs at once — the interrogative *what*, the
  free relative *that which*, and the negator a learner meets in a saying. First occurrence wins, so
  the module that buys it writes the note every later learner sees; M8 is the module where that note
  is most often read.
- **`kay`, `min ajl an`, `bi-al-ʿaks`, `bi-ikhtiṣār`, `innamā`, `ghayr anna` → L5-M6.** All still
  free at the planning reading, exactly as L4 promised: `bi-al-ʿaks → free`, `bi-ikhtiṣār → free`,
  `innamā → free`, `ghayr anna → free`, `kay → free`, `min ajl → free`. M6 spends the whole set in
  one module, which is the level's largest legitimate opening and is affordable only because L4
  named each in `usage` and bought none.
- **Sarcasm, implication and indirect refusal → L5-M7**, which is the job line.
- **A three-part then / later / now contrast → L5-M10**, folded into the register pivot rather than
  kept as a separate tense exercise.
- **Regional and generational forms → L5-M3**, and see §3 for what the ratified variety law lets
  that module actually do.
- **The dual as a system → NOWHERE. §5.1.**

`docs/48` §4's second ratification amendment — "the passive has an owner", L4-M7 with L4-M2 as its
second home — is honoured and not reopened: L5-M8 and L5-M9 both USE the internal passive
(`yusammā` / `tusammā` in M8; the formal retelling in M9) and neither opens it.

## 3. The variety law is the constraint that shapes M3, and it is not negotiable

L5-M3's job is "Regional and generational speech; what marks an outsider", and the obvious reading
of it — teach some Levantine, teach some Egyptian — is barred. #198 ratified **Modern Standard
Arabic** and `content/courses.json` declares the scheme; `tools/course-briefs.ts` §en-ar states that
no module may quietly switch, and that where the MSA form sounds formal in the street the sentence's
`usage` line says so in words and **never smuggles the dialect form into `display`**.

So M3 is briefed as a **metalinguistic** module: MSA display throughout, dialect named in `usage`
and `sound` only, and the deliverable is that a learner can TALK about variation rather than produce
it. Its one grammar payload is the **nisba adjective as a productive shape** (`miṣrī`, `shāmī`,
`maghribī`, `shaʿbī`, `baladī`) — the `-ī` the ladder has used since L1-M1's `al-Hind`, named as a
rule for the first time.

This is an honest reading of the job rather than a full one, and the brief says so. The gap between
what M3 can teach and what its job line promises is native-pass question 89.

## 4. A section per module — what it owns and why it sits there

The level's arc is **pragmatic**, where L3's was nominal and L4's verbal. Almost nothing new is
opened morphologically; what L5 buys is the layer above the grammar — which utterance is fixed,
which is marked, which means something other than it says, and which register it belongs to. That
falls out of the ten ratified jobs rather than being imposed on them.

- **M1 Sayings and idioms.** Owns the FIXED EXPRESSION in two shapes: the body idiom, which is an
  iḍāfa L3 already opened (`khafīf ad-damm`, `ṭawīl al-bāl`) with a meaning the parts do not carry;
  and the proverb, which preserves `man` + past + past and `mā` + past as fossils. Both fossils are
  RECOGNITION ONLY and both index whole. It sits first because it is the level's cheapest entry —
  the learner stops composing and starts repeating — and because it is where the `mā` question is
  answered without spending the key.
- **M2 Humour and teasing.** Owns the VOCATIVE `yā` (free after thirty-nine modules) and the joking
  frame with its retraction. It sits second so that the level's central pragmatic axis — MARKED
  against UNMARKED — is opened on the safe side first: banter is marked, and M7's sarcasm is the
  same words unmarked. Teaching them in the other order would hand a learner irony before they can
  signal a joke.
- **M3 How they say it there.** Owns the metalinguistic vocabulary and the nisba. §3.
- **M4 Formal occasions.** Owns the CEREMONIAL PAIR — a formula and its obligatory reply — and the
  OPTATIVE, a past-shaped verb used as a wish (`raḥimahu allāh`, `bārakallāh fīk`). Naming it
  precisely matters: no new shape is taught, the morphology is L1-M5's perfect, and only the JOB is
  new. It also buys `allāh` (§6, the level's headline seam). It sits after M3 because the ceremonial
  register is the one register that does NOT vary regionally, and the contrast is worth having.
- **M5 Big questions.** Owns the GENERIC ARTICLE — `al-` on an abstract noun meaning the thing in
  general — which is the single biggest structural delta of abstract Arabic, and the belief pair
  `ūmin bi-` (faith) against `aʿtaqid anna` (opinion), where English lets one verb do both. It sits
  fifth because M6 defends a position and M5 supplies the positions worth defending; keeping that
  line is what stops the two becoming one module.
- **M6 Arguing a position.** Owns the DISCOURSE SCAFFOLD, and spends the whole set L4 left free
  (§2). Its system is named as discourse marking rather than as grammar, because it is: the claim is
  that Arabic marks the shape of an argument on the surface far more heavily than English does, so
  the delta is DENSITY and the learner's error is under-marking.
- **M7 Between the lines.** Owns INDIRECTION in three named devices — the statement that is a
  request, `laʿalla` for the softened suggestion, and the negative question `alā` + imperfect — plus
  the admission that sarcasm cannot be taught in a `display` line at all and lives in `usage`. It
  sits directly opposite M2 by design.
- **M8 When words run out.** Owns the REPAIR KIT, and is where the course's three oldest holes are
  finally paid: `afham`, `aʿrif` and `aw` (§6). It sits at M8 rather than earlier only because the
  paraphrase frames (`shayʾ mithl`, `nawʿ min`) need a stock of nouns to paraphrase WITH; on
  usefulness alone it is the most immediately usable module in the course.
- **M9 Telling it your way.** Owns REGISTER SELECTION as a set of choices rather than a grammar — the
  same event told plainly and formally side by side — plus the frozen opener `kāna yā mā kān`. It is
  the rehearsal for M10.
- **M10 Your own voice.** Owns the PIVOT and nothing else. Eight sentences, the bound applying inside
  the piece as at L3-M10 and L4-M10, and the turn is a REGISTER change rather than a plot twist
  (L4-M10 owns the twist). Its seam note is a ledger, not a list.

## 5. Bounds, and the deferrals that land nowhere

### 5.1 The dual as a system is a HOLE, and the reason is a ratified law

`docs/70` §2 left the dual standing for L4; `docs/87` §2 passed it to L5 as the one thing L4 did not
take. **L5 cannot take it either, and it should not be passed on again — this is the last level.**

The reason is structural rather than editorial. The MSA dual has two written forms, `-ān` and
`-ayn`, and the difference between them **is case** — nominative against oblique. The course's
L2-M1 rule 4 forbids writing case endings unless lexical, so the paradigm cannot be written at all
without breaking a ratified law, and half of it cannot be written without breaking the other half.

The index shows the course has already paid for that quietly, and the inconsistency is visible:

    kitābān   → L1-M8      (nominative -ān, per docs/34's amendment: display keeps -ān, usage says
                             speech has kitābayn)
    yawmayn   → L3-M7      (oblique -ayn)
    marratayn → L3-M7      (oblique -ayn)
    ithnān, ithnayn, sanatayn, shahrayn, sāʿatayn, kitābayn, ʿaynān, yadān → all free

So the course ships **both** case forms of the dual as vocabulary, chosen per item by what the
sentence needed, with no rule anywhere that reconciles them. That is not a defect a brief can fix
and no L5 job needs the dual, so:

- **Recorded as a hole in the product**, not as a deferral. Nothing in L5 opens the dual as a system.
- **The honest fix is a law change, not a module**: pick ONE written dual (the oblique `-ayn`, which
  is what speech uses everywhere and what L3-M7 already shipped twice) and amend `docs/34`'s note so
  `kitābān` becomes `kitābayn`. That is a change to a shipped L1 module and therefore forbidden to
  an authoring wave (a level never edits a file below it); it needs its own issue and the native
  gate's answer first. **Native-pass question 87.**

### 5.2 Bounds — L5 does NOT climb to 16, and that is a deliberate deviation

`docs/48` §B3 recommends word bounds climbing `L4 12 → 14, L5 14 → 16`. **These briefs stop at 14**,
the ceiling L4 reached, and spend most of the level below it:

| module | `maxWordsPerSentence` | why |
| --- | --- | --- |
| M1 Sayings and idioms | 12 | A proverb that needs fourteen words is not a proverb. The items are fixed strings plus one framing clause. |
| M2 Humour and teasing | 12 | A tease and its retraction are both short, and a joke that needs a subordinate clause has already failed. |
| M3 How they say it there | 13 | Two clauses: the observation and the form it is about. |
| M4 Formal occasions | 13 | A formula plus its reply; the formulae themselves are four or five words. |
| M5 Big questions | 13 | Abstract nominal sentences are structurally short — no copula, no auxiliary. |
| M6 Arguing a position | 14 | The level's only genuinely long sentences: marker plus two clauses. |
| M7 Between the lines | 13 | An indirect request is short by nature; length destroys the indirection. |
| M8 When words run out | 13 | Repair under pressure. An item that cannot be said in one breath cannot be used. |
| M9 Telling it your way | 14 | The formal half of each retelling is the level's longest clause type. |
| M10 Your own voice | 14 | Applies INSIDE the eight-sentence piece, as at L3-M10 and L4-M10. |

The argument for deviating: **L5's jobs are pragmatic and pragmatic utterances are short.** L4's
climb to 14 was earned — its modules joined two clauses with a new connector and the extra words
were the connector's. Nothing in L5 does that except M6 and M9. A bound is a maximum, and raising it
to 16 on seven modules that will never reach 13 would buy nothing while inviting an author to pad a
proverb. This is recorded as a deviation from `docs/48` §B3 rather than as an oversight.

`newWordCap` stays the PRD §5 **25 on nine modules**, and pools are authored to 12. **M10 is set to
12**, and that is the second deliberate deviation. M10 is the last module of the last level: nothing
after it can absorb an unpaid key, and L3-M10 added exactly one surface. A cap of 25 there would be
a licence the module must not use, so it is written as a constraint instead. The brief says the same
thing in prose, because a prompt only ever shows an author the notes.

## 6. Seams — where the index contradicted the first instinct

Ten, checked with `npm run content:owner -- en-ar …` at the 1095-surface fold. Five would each have
put a shipped sentence on ground the brief had mis-described.

- **`allāh` is FREE after thirty-nine modules.** The first instinct was that a course with thirty-nine
  modules of Arabic must own the commonest word in the language; it does not.
  `in shāʾ allāh → L1-M6` — a THREE-TOKEN key, and `surfaceIndexKeys` splits only on hyphens, never
  on spaces, so neither `allāh` nor `shāʾ` was ever spent. `mā shāʾ allāh → free`,
  `al-ḥamdu li-llāh → free`, `wa allāh → free`. **L5-M4 buys `allāh`**, and its note therefore
  answers for every later occurrence in the course, so the brief says: write the note about the
  word, not about the condolence.
- **The course has no verb of understanding.** `afham → free`, `fahimtu → free`, `afhamu → free`,
  `tafham → free` — and the raw key set confirms it: **no key among the 1095 contains `fahm` or
  `fham`.** Thirty-nine modules including L2-M8 "When something goes wrong", which bought
  `nasītu → L2-M8` and `mushkila → L2-M8` and never bought "I understand". L5-M8 buys it.
- **The course has no verb of knowing either.** `aʿrif → free`, `aʿrifu → free`, `aʿlam → free`,
  `yaʿlam → free`, `adrī → free`, `ʿaraftu → free`. Same module pays it.
- **The course has no word for "or".** `aw → free`, `am → free`, and `aw` is absent from the key set
  outright (the only `aw`-initial keys are `awlād`, `awwal`, `awwalan`). L2-M9 "Comparing and
  choosing" taught preference without ever buying the disjunction. L5-M8 buys `aw`, and its brief
  carries the delta that English *or* is a paraphrase hedge ("a chair, or something") while Arabic
  `aw` is a real disjunction and cannot fill that slot.
- **`law samaḥta` is fully paid and must NOT be indexed whole.** The instinct was the opposite —
  the politest phrase in the course looked unbought, since `law samaḥta → free`. But `law → L2-M1`
  and `samaḥta → L2-M1` are both owned, so a whole-phrase row would buy one key over two paid words
  and teach nothing. M7 points back instead. (`law samaḥti → free` likewise, and likewise refused.)

Five smaller findings, recorded because they are the kind that bite silently:

- **`ghayr anna` and `min nāḥiya` must index WHOLE or they misfire.** `ghayr → L4-M4` (the negating
  *other/non-*) and `nāḥiya → L4-M4`, so a bare-part resolution would hand the learner L4-M4's note
  under M6's concessive and under M6's two-sided frame. Both are two-token phrases, so indexing them
  whole is free — `surfaceIndexKeys` never splits on a space.
- **`yabdū` is free although `yabdū anna → L4-M5`.** The same multi-token save, from the other side:
  L4-M5 bought the frame and left the bare verb. L5 does not need it, but a brief that assumed
  "L4-M5 taught `yabdū`" would have been wrong about which key carries the note.
- **"History" is not a fresh key.** `taʾrīkh → L3-M8`, bought there as the DATE on a form. The
  abstract sense M5 wants is the same key and gets a point-back row whose note must be true of both
  — the homograph law (`tools/course-briefs.ts` rule 3) doing exactly what it was written for.
- **`ay` and `ayy` are two keys separated by one letter.** `ay → free`, `ayy → L2-M9`. M8's brief
  forbids illustrating either with the other, for the same reason `docs/87` §3 forbade illustrating
  M1's imperative derivation with `idhhab`/`adhhab`.
- **`fikra → L3-M3`, so `ʿalā fikra` is free only as a phrase.** M2's conversational aside indexes
  whole and buys nothing; the bare noun stays L3-M3's opinion word.

Two mechanical facts were re-checked rather than assumed, because three modules lean on them:

- `surfaceIndexKeys` splits on hyphens ONLY. That is what leaves `allāh` free under `in shāʾ allāh`,
  what lets `man jadda wajada` and `mā qalla wa dalla` protect `man` and `mā`, and what makes
  `kāna yā mā kān` (M9) cost one key while protecting both M2's `yā` and M8's `mā`.
- `maxSpan` is **5** at the planning reading, so a five-token phrase still resolves whole under the
  runtime's longest-match-first walk. `aṣ-ṣabr miftāḥ al-faraj` is four tokens and safe;
  `man jadda wajada` is three. No L5 brief proposes a phrase longer than five.

## 7. Open questions for the native pass

Numbering continues the en-ar chain. `docs/87-en-ar-L4-brief-decisions.md` ends at **86**, so this
block starts at **87**. Nothing existing is renumbered. These are questions about the BRIEFS, not
about shipped sentences, and each should be re-asked of the authored module when it exists.

**The native-speaker gate remains unmet on this course, as it has been since L1.** L5 is the last
level, so the questions below are the last ones a brief can raise — and questions 87 and 89 are
about holes that no later level exists to fix.

87. **The dual, and which case form the course should write** (§5.1, and it is a question about the
    whole ladder rather than about L5). The course ships `kitābān` at L1-M8 and `yawmayn` /
    `marratayn` at L3-M7 — both case forms of the same system, chosen per item. Confirm that the
    oblique `-ayn` is what a speaker says in every position, and therefore that the honest amendment
    is to write `-ayn` everywhere and retire `-ān` from `display`. If the answer is yes, this needs
    its own issue against L1-M8: a level never edits a file below it, so no authoring wave may fix
    it.
88. **The proverbs themselves, and whether their grammar is safe to show** (M1). Confirm that
    `man jadda wajada` and `mā qalla wa dalla` are proverbs a speaker actually uses rather than
    schoolbook specimens, and — the real question — whether presenting `man` + past and `mā` + past
    as RECOGNITION-ONLY fossils is right, or whether a learner will inevitably start producing them.
89. **How much of M3's job line is reachable under #198** (§3). The job is "Regional and generational
    speech; what marks an outsider" and the ratified MSA law forbids a dialect form in `display`. Say
    whether a metalinguistic module — talk ABOUT variation, produce none of it — is a genuine partial
    answer or whether it is a module that promises what it cannot deliver, and if the latter, what
    the smallest honest change to the law would be.
90. **The body idioms** (M1). Confirm `khafīf ad-damm`, `ṭawīl al-bāl` and `qalbuhu abyaḍ` are
    everyday in the educated-neutral register this course pins, that their MSA forms are understood
    across the regions rather than being Levantine or Egyptian, and that the literal glosses the
    brief uses (light of blood, long of mind, his heart is white) are how a speaker would explain
    them.
91. **The marked/unmarked axis** (M2 against M7). The level's most load-bearing pragmatic claim:
    that Arabic banter is normally MARKED — by `yā` + kin term, by an explicit `amzaḥ`, by a laugh —
    while sarcasm is not, and that an unmarked deadpan tease from a foreigner reads as an insult.
    Confirm, and say whether the claim holds across the regions or is one region's.
92. **`yā` + kin term to a non-relative** (M2). Confirm `yā akhī` and `yā ʿammī` to someone who is
    neither, that the register is friendly rather than condescending, and which of the two a learner
    should be given first.
93. **What not to tease about** (M2). The brief names family, appearance and wealth. Confirm the
    list, and add or remove.
94. **The optative as a past-shaped wish** (M4). Confirm `raḥimahu allāh`, `bārakallāh fīk` and
    `aʿẓama allāh ajrakum` are heard as wishes rather than as statements about the past, and that
    describing them to a learner as "the perfect doing a performative job" is true rather than a
    grammarian's tidying.
95. **The obligatory reply** (M4). Confirm each formula's pair — what answers `alf mabrūk`, what
    answers `al-baqāʾ li-llāh` — and confirm that silence where the reply belongs is the error the
    brief says it is.
96. **`allāh` in a course that teaches no religion** (M4, §6). The word is unbought after
    thirty-nine modules and M4 buys it. Confirm the framing — these are social formulae used by
    speakers of every background in the region — and say whether any of M4's formulae would be
    avoided by a speaker who is not Muslim, in which case the brief needs a second set.
97. **The generic article** (M5). Confirm `al-ḥurriyya muhimma` is *freedom is important* and not
    *the freedom is important*, that the article is genuinely obligatory rather than preferred, and
    whether there is any abstract noun in M5's set where the bare form is what a speaker says.
98. **`ūmin bi-` against `aʿtaqid anna`** (M5). Confirm the faith/opinion split is real and that a
    speaker would not use `aʿtaqid` for a belief in a principle.
99. **The argument scaffold's density** (M6). The level's other load-bearing claim: that a spoken
    Arabic case marks its steps more heavily than an English one, so a learner's error is
    under-marking. Confirm, and confirm specifically that `qad yaqūl qāʾil inna …` is said out loud
    rather than being a written-essay move.
100. **`bi-al-ʿaks` and its weight** (M6). Confirm it is ordinary and unemphatic where English *on
     the contrary* is rare and heated, since the brief hangs a mistake plate on that difference.
101. **`innamā` and `ghayr anna` in speech** (M6). Both were held back from L4 as the second members
     of frames. Confirm they are heard, and whether `ghayr anna` is a genuine spoken alternative to
     `lākin` or reads as written Arabic.
102. **The statement as a request** (M7). Confirm `al-jaww ḥārr hunā` works as *open the window*,
     and give the two or three other statements-that-are-requests a learner would most often need.
103. **`laʿalla` and `alā` + imperfect** (M7). Confirm `laʿalla` is a live spoken softener rather
     than a literary particle, and that the negative question `alā tudhhab maʿanā` is the warm
     invitation the brief claims and not an accusation.
104. **Whether sarcasm can be taught at all in this format** (M7). The brief concedes it cannot live
     in `display` and puts it in `usage` and `sound`. Say whether that concession is right, and what
     a learner can usefully be given instead of examples they cannot hear.
105. **The three unbought words** (M8, §6). Confirm the forms the module should buy: `afham` or
     `afhamu` for *I understand*; `aʿrif` against `aʿlam` against `adrī` for *I know*, and which one
     a learner should have first; and whether `aw` or `am` is what a speaker uses in an ordinary
     statement rather than a question.
106. **The repair kit without an apology** (M8). Confirm that asking directly — `mā maʿnā hādhihi
     al-kalima`, `lam afham` — is polite rather than blunt, and that opening every repair with
     `āsif` reads as distress. This is the module's whole register claim.
107. **`shayʾ mithl` and `nawʿ min`** (M8). Confirm both are what a speaker reaches for when a word
     is missing, and whether `yusammā` / `tusammā` is really used conversationally for *it is
     called* or belongs to L4-M7's official register only.
108. **Register as grammar, not just vocabulary** (M9). Confirm the brief's claim that a formal
     Arabic retelling moves the GRAMMAR — the passive appears, clauses lengthen, `fa-` and `thumma`
     replace a string of `wa` — rather than only the word choice, since the module's mistake plate
     is aimed at a learner who swaps nouns and stops.
109. **`kāna yā mā kān`** (M9). Confirm it is the storytelling opener across the regions, whether it
     is used for anything other than a children's tale, and whether `fī qadīm az-zamān` is its
     everyday twin or a written variant.
110. **The pivot as a clause** (M10). Confirm that English's one-word register pivot (*Anyway.*) has
     no Arabic equivalent, that `ʿalā kull ḥāl` standing alone as a sentence reads as unfinished,
     and what a natural pivot sentence looks like.
111. **The level's register as a whole, and the course's.** `docs/87` asked at 86 whether L4 still
     sounded like one person's Arabic. L5 adds a ceremonial register (M4), a metalinguistic one
     (M3), an argumentative one (M6) and a deliberately plain one (M9), and M10 asks a learner to
     move between two of them inside eight sentences. Confirm the whole five-level course still
     reads as one voice — and say where, if anywhere, L5 has drifted into written MSA or into a
     register a learner would never be in.
