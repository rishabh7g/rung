# en-it L5 — the authoring-brief decisions (#568)

The ten en-it L5 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['en-it']` L5-M1…L5-M10) are the
last briefs this course will get: L5 is `Voice`, nothing defers past it, and a deferral that lands
nowhere here is a hole in the product rather than a promise. Every seam below was pinned against
the REAL cumulative index — the fold of `public/content/en-it/index/`, read on 2026-09-08 with
`npm run content:owner`, which reported **1350 surfaces owned, folded over 40 modules through
L4-M10**, at **maxSpan 3**.

That number moved three times while this wave was writing, because the L4 authoring waves were
landing at the same time: the first probe read **1220 surfaces over 37 modules through L4-M7**, the
middle of the wave read **1323 over 39 through L4-M9**, and the final pass read the 1350 above.
Every "free" claim in the ten briefs was re-run against the FINAL 40-module fold, and the two
claims that had been made against the shallower folds — `raccontare` and `storia`, which L5-M9
wanted for its retelling — came back owned by L4-M10 and were dropped. This is the ordinary hazard
of briefing a level while the level below it is being authored, and the only defence is to re-ask
the index at the end rather than to trust a note taken at the start.

The ten titles and jobs are levels.json's, ratified at #423, and are mirrored verbatim. The review
chain inherited is `docs/44` (spoken Italian), `docs/65` (L2), `docs/81` (L3) and `docs/99` (L4).

## 1. Register, the elision law, and the one bound that moves

`Lei` never reaches a display. That is `docs/57` §1's decision, kept by `docs/73` and by `docs/90`
§1, and it was re-confirmed here rather than remembered: `npm run content:owner -- en-it lei`
returns `lei L1-M10` — the pronoun *she* — and `normalizeSurface` folds case, so the key is spent
twice over. L5-M3 and L5-M10 are the two modules that talk about the polite address at length, and
both teach it in rules and notes only.

Straight apostrophes only, and the elision stays INSIDE the token, answering for nothing else. The
level buys six such keys — `anch'io`, `neanch'io`, `mo'`, `c'era una volta`, `l'importante è` and
`non vedo l'ora` — and none of them touches `anche` (L1-M10), `io` (L2-M5), `ora` (L4-M9) or `era`
(L2-M10).

**The course `maxSpan` moves from 3 to 4, once, in L5-M1.** `in bocca al lupo` and
`meglio tardi che mai` are four tokens each, both are `free`, and neither can be split without
teaching a constituent that does not exist. That is the whole of the increase: nothing else in L5
is longer than three tokens, and wherever a four-token phrase was tempting the brief writes the
three-token core and lets an owned word resolve beside it —

- `Non ce la faccio` over a three-token `ce la faccio` key, with L1-M3's `non` on its own row;
- `a meno che non` written as `a meno che` plus the same `non`, exactly as M1 does;
- `che ne so` bought instead of `non ne ho idea`, whose fourth token is L4-M5's `idea` anyway.

## 2. What L4 withheld, and where every piece of it lands

`docs/90` §6 named eight deferrals and the L4 module notes named a further five. All thirteen are
placed:

| Deferred by | What | Lands in |
| --- | --- | --- |
| L4-M1, L4-M9, `docs/73` §2 | Clitic attachment and combined clitics | **L5-M8** |
| L4-M9 | `ne` as a partitive | **L5-M8** |
| L3, L4-M3, L4-M8, L4-M10 | The passato remoto | **L5-M9**, recognition only; named in **L5-M3** as southern spoken |
| L3, L4-M6, L4-M8 | The trapassato | **L5-M9** |
| L4-M2, L4-M5 | `benché` / `sebbene` + congiuntivo | **L5-M6** |
| L4-M6 | `prima che` + congiuntivo | **L5-M6** |
| L4-M6 | The adverbial gerund (`mangiando`) | **L5-M6**, as `pur` + gerundio |
| L4-M2, L4-M7 | The `venire` passive as a system | **L5-M4** |
| L4-M3 | `sarei dovuto andare`, the essere twin | **L5-M9** |
| L4-M2 | `poiché` / `pertanto` | **L5-M4** |
| L4-M5 | Irony and sarcasm as disagreement | **L5-M7** |
| L4-M4 | Insisting and holding ground; the ironic climb-down | **L5-M6** and **L5-M2** |
| L4-M7 | Toasts, speeches, condolences | **L5-M4** |

Four things do NOT land anywhere, and §7 names them as holes rather than passing them on.

## 3. Seams where the index contradicted the first instinct

Every one of these was a wrong first guess, and `npm run content:owner` settled it:

- **`riso` is RICE.** `content:owner -- en-it riso` returns `riso L1-M8`, from the shopping module.
  The participle of *ridere* is spelled the same, first occurrence wins, and a learner tapping it
  would be shown a note about lunch — so M2 buys `abbiamo riso` WHOLE at two tokens and no bare
  participle row exists.
- **`sto` and `sta` are the verb `stare`.** `sto L1-M2` (from *Sto bene*) and `sta L2-M1` (from
  *Come sta*). The reduced demonstrative of youth speech therefore gets no row in M3 at all; it is
  carried by a rule.
- **`senti` is free and `senta` is not.** `senti free`, `senta L2-M1`. The POLITE one was bought
  two levels earlier as a frozen politeness word, and the familiar one has never been shown —
  although L4-M1's brief used `senti` to illustrate the `-ire` tu imperative, the shipped module
  did not take it. M7 buys it.
- **`viene` is free and `venire` is not.** `venire L4-M5`, `viene free`. The passive rule in M4
  therefore lands on `viene consegnato` as a whole key and points back at L4-M5's row for the verb.
- **`ne` is unowned after forty modules.** `content:owner -- en-it ne "ne ho due"` returns both
  `free`. `docs/73` §2 records `ne` as having gone to L3-M5 alongside `la` and `le`; the shipped
  module never took it. The index is the record, L4-M9's brief was right to call it unowned, and
  the L3 decisions doc is wrong on this line. M8 buys it.
- **`in fondo` is free**, although L4-M9's brief lists it among that module's fresh keys. The
  shipped L4-M9 never took it. M5 buys it.
- **`gente` is L2-M10's**, so M5 buys `la gente` as a whole two-token key over an owned noun.
- **`mangiando` and `parlando` are L2-M7's** — two cells of the `stare` + gerundio progressive from
  the phone module. M6 opens the adverbial gerund on FRESH verbs only (`essendo`, `avendo`,
  `sbagliando`) and points back for the other two.
- **`bravo` is L2-M2's and `bella` is L2-M3's**, so the sarcastic *Bravo!* (M7) and the greeting
  *Bella!* (M3) get no rows and both jobs are carried by rules — the same treatment L4-M7 had to
  give `prego`.
- **`caro` and `cara` are L1-M10's**, so a formal letter opening cannot be built out of `caro`;
  `egregio` and `carissimi` are M4's fresh keys instead.
- **`ora` is L4-M9's and `l'ora` is free**, so `non vedo l'ora` indexes WHOLE and does not reach
  for the owned noun.
- **L4-M10 shipped exactly the twelve keys its brief claimed.** Checked after the rebuild:
  `raccontare`, `storia`, `a quel punto`, `per fortuna`, `e allora`, `improvvisamente`,
  `all'improvviso`, `ha risposto`, `ha aggiunto`, `strano`, `sorpresa` and `silenzio` all return
  `L4-M10`. M9's narrative furniture is therefore borrowed, not bought.

## 4. Seams — L5 never edits a file below it

Five families run the whole height of the ladder and none of them is re-opened here:

- **The congiuntivo.** L3-M3 opened four cells on one trigger; L4-M5 named the paradigm; L5-M6 adds
  a TRIGGER CLASS (the conjunctions that govern it) and L5-M5 adds the impersonal triggers. Three
  levels, one mood, no file edited. `sia`, `abbia`, `possa` and `vada` keep L3-M3's and L2-M4's
  rows.
- **The gerundio.** L2-M7 owns the progressive cells; L5-M6 owns the adverbial use, on other verbs.
- **The past.** L2-M10 shipped the imperfetto cells, L3-M10 the narrative pair, L4-M3 the
  counterfactual, L4-M8 the paradigm; L5-M9 adds the trapassato as two-token
  auxiliary-plus-participle keys (`era partito`, `avevo finito`) so that neither the owned auxiliary
  nor the owned participle is bought twice.
- **The clitics.** `la` and `le` are L1-M1's ARTICLES forever, `lo` is L2-M5's and `gli` is
  L2-M2's; L3-M5 paid for the object forms as whole keys (`l'ho vista`); L5-M8 buys `me lo`,
  `te lo` and `glielo` the same way, each with a note saying what the bare word underneath is.
- **The imperative.** L2-M1 and L2-M4 own five Lei cells as vocabulary, L4-M1 owns the rule, and
  L5-M8 adds attachment to the tu forms only — the Lei imperative with an attached pronoun is left
  out on purpose (§7).

## 5. The shape of the level, module by module

**M1 Sayings and idioms** owns the frozen phrase and the pronominal verb as a LEXEME. It opens the
level because voice starts with knowing what is already said for you, and because it needs nothing
but M1's own vocabulary. It is the module that moves `maxSpan`.

**M2 Humour and teasing** owns the evaluative suffixes (`-ino`, `-one`, `-accio`) and the particles
of mock protest. It is second because banter is the first thing a foreigner is left out of, and it
takes L4-M4's deferred ironic climb-down. It also closes `docs/99`'s open question about `anch'io`
by buying it.

**M3 How they say it there** owns the standard-versus-marked axis and is the only module in the
course whose main output is RECOGNITION. It names the passato remoto as a southern spoken past and
shows none of its forms; it also owns the two-way rule for the address (`diamoci del tu`), which is
the outsider tell that costs the most.

**M4 Formal occasions** owns the passive as a paradigm — `essere` + participle against `venire` +
participle, with the limit that `venire` cannot form the compound tenses — plus the ceremonial
formulas and `poiché` / `pertanto`. It sits fourth because the passive is the biggest single system
L4 deferred and the level should not carry it late.

**M5 Big questions** owns the definite article on abstract nouns and generic plurals, plus the
impersonal congiuntivo triggers. It sits next to M6 on purpose: M5 states beliefs, M6 defends them.

**M6 Arguing a position** owns the conjunctions that govern the congiuntivo, the `pur` + gerundio
concessive and the scaffold that orders a case. It takes four separate L4 deferrals at once, which
is why it carries the level's highest per-sentence bound alongside M4.

**M7 Between the lines** owns distance-as-tense (the imperfetto and conditional of politeness, the
negative-question request) and irony as LEXICON. The lexicon point is not a stylistic preference:
this course has no audio, so irony that rides on tone cannot be taught here at all.

**M8 When words run out** owns clitic attachment, the combined clitics and `ne` — the last
structural debt in the course. It sits eighth because paraphrase needs a whole ladder to paraphrase
with, and because the repair frames are exactly the sentences attachment is needed for.

**M9 Telling it your way** owns the trapassato in production and the passato remoto in recognition,
plus `sarei dovuto andare`. It is the module where reading and speaking meet, because the story on
the page is in a tense nobody says out loud.

**M10 Your own voice** owns nothing. Its test is that eight sentences and a register change need
nothing new.

## 6. The bounds, and why

`maxWordsPerSentence` runs **11, 12, 12, 15, 14, 15, 13, 12, 14, 13**. L4 ended at 14 and L5 is the
top of the ramp, so the level lifts the ceiling by exactly one word and only twice:

- **M4 and M6 at 15.** These are the two modules whose register is genuinely longer — a toast and a
  condolence are complete formal sentences, and a concessive subordinate plus a main clause does
  not fit in fourteen words. The extra word is bought by content, not by ambition.
- **M5 and M9 at 14**, matching L4's ceiling: abstract talk subordinates and a retelling reorders,
  and both need the room L4-M7 and L4-M9 already had.
- **M1 at 11, the lowest in the level.** A saying is short, and a bound that lets an author pad a
  proverb has broken the module. M2, M3 and M8 sit at 12 for the same reason: a tease, a regional
  gloss and a repair are all short turns.
- **M7 at 13 and M10 at 13.** M10's applies INSIDE the eight-sentence piece, as at L3-M10 and
  L4-M10, and 13 rather than 11 because the formal half of a register switch is longer than the
  familiar half.

`newWordCap` stays the PRD §5 **25** in nine modules. **M10 is set to 15, and the field carries it
rather than a note.** `docs/90` §5 recorded L4-M10 as "set to 20" and the shipped brief has a cap
of 25 with the number 20 written into a note; a note is not what a wave obeys, and the discrepancy
between that doc and that brief is the argument for making the bound real here. Fifteen is chosen
because the closing module of the whole course should spend almost nothing: its hinge words are
`senti` (M7's), `comunque` (L4-M4's) and `allora` (L1-M10's), and every formula, particle and
filler it needs was bought by M2, M4, M7 and M8. Proper nouns are exempt (#61), so the pieces
themselves are not squeezed.

## 7. Deferrals that land nowhere — named as holes, not passed on

L5 is the last level, so these are the course's permanent gaps. Each is deliberate and each is
smaller than the alternative:

1. **The Lei imperative with an attached pronoun** (`me lo dica`, `si accomodi pure`). M8 teaches
   attachment on the infinitive, the tu imperative and the gerund, and keeps every polite repair on
   the finite frame (`me lo può ripetere`). Adding a fourth position would double the rule in the
   module that already carries the largest system in the level. **The hole:** a learner can attach
   familiarly and must go around the polite form.
2. **The `ci` of place with attachment** (`andarci`, `restarci`, `arrivarci`), sent to L5 by
   L4-M9. M8 names it in one line and buys no row. **The hole:** `ci` stays L2-M6's `ci vediamo`
   and L4-M6's `ci vuole`, and its locative job is never taught.
3. **The passato remoto in production.** M9 teaches a dozen third-person forms for READING and
   forbids any display that puts a first- or second-person remoto in the learner's mouth. This is a
   bounded hole and the right one: a course that ships it as production gets learners writing a
   printed past into spoken accounts, which is exactly why L3 and L4 refused it.
4. **The sequence of tenses under a past main verb** (`credevo che fosse`). This is the largest of
   the four and it is worth stating plainly: the course teaches `avessi` and `fossi` inside L3-M4's
   and L4-M3's `se` frame and never outside it, so a learner who wants to report what they used to
   think has no correct sentence. It is not fixable inside L5 — it needs a module of its own — and
   it should be carried into whatever comes after this ladder rather than quietly dropped.
5. **Free indirect speech**, refused by L4-M10 and refused again by L5-M9. This one is not a defect:
   it is a literary technique in a course that teaches talk.

## 8. Open questions for the native-speaker gate

Continuing this course's chain; `docs/90` ends at 61.

62. **`In bocca al lupo` and its obligatory reply** (M1). The brief states that the phrase REQUIRES
    `Crepi` (or `Crepi il lupo`) and that `grazie` leaves the exchange half-finished. Confirm the
    reply is still obligatory across generations, say which of the two forms is ordinary, and
    confirm that `buona fortuna` is genuinely avoided in the same situation rather than merely
    less common.
63. **The pronominal verbs a learner should PRODUCE** (M1). `farcela`, `cavarsela`, `andarsene` and
    `prendersela` are all shipped as lexemes. Say which of them a foreigner can safely use, which
    are better left to recognition, and whether `ce la faccio` is heard mainly in the negative.
64. **`scherzavo` against `ho scherzato`** (M2). The brief states that the repair that closes a
    tease is the imperfetto. Confirm this, and say whether `scherzo` in the present does the same
    job.
65. **`un attimino` and the tone of `-ino`** (M2). The brief states that the diminutive moves TONE
    and not size. Confirm that, and say whether `un attimino` is still current or now reads as
    ingratiating — it has a reputation.
66. **The generational words** (M3): `raga`, `tipo`, `figo`, `boh`, `cioè`. Confirm each is current
    in 2026, give the age band, and flag any that now dates the speaker rather than placing them.
    Nothing in this module ships until this question is answered.
67. **`mo'`** (M3). Confirm it is Roman rather than central-Italian generally, confirm the
    apostrophe is how it is written, and say whether a learner will actually hear it.
68. **`auguri` against `congratulazioni`** (M4). The brief splits them by TIME — `auguri` for what
    is ahead, `congratulazioni` for what is achieved — and says that to a bride and groom it is
    `auguri`. Confirm the split and the wedding case, which is the error an English speaker makes.
69. **The `venire` passive in speech** (M4). The rule that `venire` cannot form the compound tenses
    is not in doubt. Confirm how much of the `venire` passive is actually SAID at a ceremony rather
    than written, and say which of `viene consegnato` and `è stato consegnato` a speaker uses.
70. **The article on abstract nouns** (M5). Confirm `La libertà è importante` is obligatory and that
    the bare noun is simply wrong rather than a marked variant, and say whether the generic plural
    (`Gli italiani parlano molto`) follows the same law without exception.
71. **`a meno che non`** (M6). The expletive `non` is not in doubt as grammar; `docs/90` q58 asked
    the same of `finché non`. Confirm both are heard, and say whether `purché` is spoken Italian or
    belongs with the written register this level sends to M4.
72. **`non è che` plus which mood** (M7). The brief writes the indicative throughout and says the
    congiuntivo is also heard. Say which a speaker uses in an indirect request
    (`non è che potresti…`) and whether the mood changes the politeness.
73. **`volevo chiederti`** (M7). Confirm the imperfetto of politeness is ordinary everyday speech
    rather than regional, and place it on the ladder against `voglio` and `vorrei` — the brief
    claims it is politer than the first and less formal than the second.
74. **`glielo` for feminine and plural** (M8). The brief states that one form covers *to him*,
    *to her* and *to them*. Confirm no separate feminine form is used in speech, and say whether
    `a lei` is added when the referent would otherwise be ambiguous.
75. **The passato remoto recognition set** (M9). Name the dozen third-person forms worth listing for
    a reader, and say whether a northern speaker under forty reads them fluently or stumbles — the
    answer decides whether M9's reading rule needs more forms or fewer.
76. **The register switch inside one piece** (M10). Confirm that an eight-sentence piece which opens
    in the polite third person and drops into `tu` after `diamoci del tu` is natural spoken
    Italian rather than a literary device, and say who ordinarily offers the switch — the older
    speaker, the host, or the person of higher standing.
