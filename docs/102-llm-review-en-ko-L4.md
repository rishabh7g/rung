# en-ko L4 — LLM review

The review that clears each en-ko L4 wave to ship, written in the same change that authors it
(`CLAUDE.md`, "Ship `verified: true` in the authoring change"). The **native-speaker gate is a
separate, stricter bar and stays unmet**: every section below ends in open questions for a native
pass, and no later wave may close one of them by rewriting a shipped module.

Open questions CONTINUE the chain `docs/93-en-ko-L4-brief-decisions.md` opened, whose last number is
**75**. This wave numbers from **76**. Nothing already numbered is renumbered, and the L3 chain in
`docs/84` and the L2 chain in `docs/68` both stay open for the native pass regardless.

## Wave 1 — L4-M1, L4-M2 (#536)

Authored against the briefs in `tools/course-briefs.ts` and the decisions recorded in `docs/93`, and
reviewed against the **REAL emitted index rather than the briefs' account of it**. Every ownership
claim quoted below was taken from `npm run content:owner -- en-ko …` reading
`public/content/en-ko/index/`, which at the time this wave was authored folded **831 surfaces over
30 modules through L3-M10, `maxSpan` 2**. After the two modules the same fold reads **931 surfaces
over 32 modules through L4-M2** — L4-M1 contributes 69 keys and L4-M2 contributes 31 — and
**`maxSpan` holds at 2**. It holds for the reason L3 gave: a verb ending is never hyphenated in this
course, so `garyeomyeon`, `meogeoboseyo`, `eopseunikka` and `deullyeoyo` are each one clean token,
and the only hyphens either module adds are particle boundaries on nouns it owns. The one two-token
surface in play, `geu daeum-e`, is L2-M10's and was reused rather than reopened.

`npm run content:validate` reports `CONTENT 288/288 ok`; both modules are clean under
`npm run content:shown`; `npx vitest run tools/shown-surfaces.test.ts` is 11/11 with en-ko holding at
its baseline of 12 and **neither new module contributing a single finding**.

### L4-M1 "Explaining how" — the purpose goes in front, and the auxiliary is one word

Ten displays:

1. `Meonjeo naembi-e mul-eul kkeurigo, geu daeum-e ramyeon-eul neoeuseyo.`
2. `Meonjeo sunseo-reul bogo, geu daeum-e beoteun-eul nureuseyo.`
3. `Yeok-e garyeomyeon i-jjok-euro gaseyo.`
4. `Yeyak-eul haryeomyeon igeo-reul nureuseyo.`
5. `Ramyeon-eul hanbeon meogeoboseyo.`
6. `Sae bangbeop-eul hanbeon haeboseyo.`
7. `Sogeum-eul jom neoeumyeon dwaeyo.`
8. `Igeo-reul sunseo-daero hamyeon dwaeyo.`
9. `Hanguk-e gagi wihaeseo hangugeo-reul baewoyo.`
10. `Ramyeon-eul meokgi wihaeseo mul-eul kkeuryeoyo.`

The five patterns take two sentences each, in order: the `meonjeo … -go, geu daeum-e … -(eu)seyo`
chain on S01–S02, `-(eu)ryeomyeon` on S03–S04, the trial auxiliary on S05–S06, `-(eu)myeon dwaeyo`
on S07–S08, `-gi wihaeseo` on S09–S10.

What it teaches is **purpose, not sequence**. The sequencing is bought and only spent: `-go` is
L1-M3's, `meonjeo`, `geu daeum-e` and `machimnae` are L2-M10's, and rule 5 says so rather than
letting an author re-teach them. What is new is why a step is taken, and it arrives as two frames
that English collapses into one word. `-(eu)ryeomyeon` (rule 0) heads an intention whose main clause
is an instruction — `garyeomyeon`, `haryeomyeon`, the shape above a ticket machine. `-gi wihaeseo`
(rule 1) is the neutral purpose adverbial on a nominalised stem — `gagi`, `meokgi`, `hagi` — and
belongs in an explanation. S03's mistake plate and S10's mistake plate are the two halves of the
same lesson, each showing the other frame in the place it does not fit.

Three interference rules carry the weight. Rule 2 is **order**: English puts the purpose last and
Korean puts it first, so the whole sentence reverses, and every `literal` line on S03, S04, S09 and
S10 is written to show the travel rather than to describe it. Rule 3 is the one the brief says
survives correction longest: English *try to* means attempt and possibly fail, `-a/eo boda` means do
it and see, so `meogeoboseyo` hands the bowl over rather than doubting the person. S05's trap and
S05's plate (`meogeuseyo`, the bare order) say it from both sides. Rule 4 is the orthography ruling
the brief demanded, discussed under the seams below.

The module ships `-daero`, which the brief did not name: `sunseo-daero` on S02 and S08 and
`bangbeop-daero` on S08's second variation, with the constraint stated in S08's trap — it attaches
to a noun and never to a verb, and written apart it would mean nothing.

### L4-M2 "Cause and consequence" — two endings finally contrasted, and a closed passive

Ten displays:

1. `Sago-ga saenggyeoseo neomu neujeosseoyo.`
2. `Jigeum bappeunikka naeil dasi jeonhwahaseyo.`
3. `Sago ttaemune mun-i an yeollyeoyo.`
4. `Yori-reul hagi ttaemune sigan-i eopseoyo.`
5. `Chingu deokbune hangugeo-reul jal baewosseoyo.`
6. `Sori ttaemune jeonhwa-ga jal an deullyeoyo.`
7. `Hanguk-e salge dwaesseoyo.`
8. `Bul-eul kyeoseo hwamyeon-i jal boyeoyo.`
9. `Sigan-i eopseunikka ramyeon-eul kkeuriseyo.`
10. `Geu gyeolgwa hangugeo-reul jal hage dwaesseoyo.`

The contrast between `-aseo` and `-(eu)nikka` is taught as **two laws rather than as a shade of
tone**, because that is what makes it checkable. Rule 0: `-(eu)nikka` may head an instruction and
`-aseo` may not, at all. S02 and S09 are the two instruction sentences and both plates are the same
error — `bappaseo … jeonhwahaseyo`, `eopseoseo … kkeuriseyo` — so a learner meets the ban twice, on
two different verbs. Rule 1: `-aseo` carries no tense of its own, and S01's plate is
`saenggyeosseoseo`, the form that does not exist. S08 repeats the tense rule where the two clauses
genuinely differ in time (the light went on, the screen is legible now), which is the case that
makes the single-marker rule look wrong to an English speaker.

The noun-headed causes are the either/or English has no shape for (rule 2). `ttaemune` leans
negative, `deokbune` is only ever positive, and the pair is taught by making each module's plate the
other word: S03's plate is `sago deokbune`, S05's plate is `chingu ttaemune`, and S05's trap says in
one line that the choice announces which way the luck went.

The consequence half is `V-ge dwaesseoyo` (rule 3) on S07 and S10, with S07's plate `sal geoyeyo` —
the form that would claim the decision. Beside it the **lexical, closed passive** (rule 4):
`yeollyeoyo` on S03, `deullyeoyo` on S06, `boyeoyo` on S08, three verbs and no more. S06's trap and
plate teach the particle consequence (`jeonhwa-ga`, not `jeonhwa-reul`) because that is where an
English speaker's active reading shows itself, and no sentence in the module writes a by-phrase.

S10 is the paragraph sentence the brief asked for: `geu gyeolgwa` takes no particle at all and
carries a cause across a sentence break rather than tying it to a clause, which is the difference
between this module and L3-M3.

### The brief seams this wave had to correct, and what the index actually said

**1. `boseyo` and `bogo` had never been taught, and the brief's own ruling depends on them.** The M1
brief rules that the trial auxiliary is written JOINED because a spaced one would resolve onto a
seeing row, and it is right about the seeing row: `content:owner` says `bwayo` → `L2-M6` and
`bwasseoyo` → `L2-M10`. What it did not notice is that the OTHER two shapes of the same verb are
unowned:

```
boseyo	free
bogo	free
```

So the instruction shape of *look* and its sequential shape had never appeared anywhere in thirty
modules, and S02 — whose pattern is literally `meonjeo + V-go, + geu daeum-e + V-(eu)seyo` — could
not be written without minting them. They take a row on S02 whose note points back at L2-M6 as the
row that owns the verb, exactly as the level law requires. This is the wave's most useful finding,
because it is the shape a brief cannot see: an owned lexeme is not an owned paradigm, and
`content:owner` answers about surfaces.

**2. The bare demonstrative `i` cannot be written, and the M1 pattern list invites it.** The pattern
`N-eul/reul + V-eoboseyo` and the brief's own worked line reach naturally for *this button*, *this
ramyeon*, *this method*. They are impossible here: `src/course/types.test.ts`'s `BARE_PARTICLES` set
contains `i` — the subject particle — and asserts that no indexed L2 slot writes it as its own
whitespace token. `i beoteun-eul nureuseyo` fails the course law even though `i` is L1-M1's key and
`i-jjok` is L2-M4's. Every *this N* in the module was therefore rewritten as `igeo-reul` (S04, S03's
first variation, S06's first variation) or the demonstrative was dropped (S05). `igeo` takes a row
on S08. A later L4 module reaching for a demonstrative should expect the same and budget the
`igeo` key rather than the adnominal.

**3. `V-ge dwaesseoyo` does NOT spend nothing.** The M2 brief says "`ge` is L3-M4 from
`-neun ge eottaeyo`, so `V-ge dwaesseoyo` spends nothing on `ge`". True of the bare key and
misleading about the frame, because an ending is never hyphenated in this course, so the key a
sentence actually shows is the whole token:

```
salge	free
hage	free
gage	free
```

Each verb the frame lands on costs one fresh key, which is the same arithmetic the M1 brief
correctly applies to the joined auxiliary (`haeboseyo`, `meogeoboseyo`, `nulleoboseyo`,
`neoeoboseyo` — four keys, one per verb). The module budgets `salge` and `hage` and uses no third.

**4. An owned noun is not an owned particle form, twice over.** Two sentences had to be abandoned
over this class:

```
ireum	L1-M1
ireum-eul	free   [parts: ireum → L1-M1, eul → L1-M1]
hoesa	L3-M2
hoesa-e	free   [parts: hoesa → L3-M2, e → L1-M4]
```

A "write your name here" sentence for the `-(eu)myeon dwaeyo` pattern and an "I was late to the
office" sentence for `-aseo` would each have minted a particle form of a noun a lower level owns,
and a level never edits a file below it. S07 became `Sogeum-eul jom neoeumyeon dwaeyo` and S01 of
M2 became `neomu neujeosseoyo` with no place named. The parts line in `content:owner`'s output is
what caught both, and it is the line an author should read first.

**5. What the briefs got right, checked and confirmed.** `meonjeo`, `daeum`, `machimnae` and the
two-token `geu daeum-e` are all L2-M10; `dwaeyo` L2-M7; `jom` L2-M1; `juseyo` L1-M3; `i-jjok-euro`
L2-M4; `hamyeon` L3-M4 while `haryeomyeon` is free; `ttaemune` L3-M3; `bi` L3-M3; `su` L2-M1; `mot`
L2-M8; `an` L1-M3 and the two-token `an dwaeyo` L2-M8; `nasseoyo` L3-M7, so `saenggyeosseoyo` (free)
is the word for *something happened* and the near miss the brief flagged is real. The M2 brief's
contrast pair needed no key at all — `bappeunikka` → `L3-M3` and `bappaseo` → `L1-M9` are both
already owned — which is why S02 spends its only row on `dasi`.

**6. A `forms` array minted `daero`, and it was allowed deliberately.** `sunseo-daero` and
`bangbeop-daero` are hyphenated because `-daero` attaches to a noun the way a particle does, and
`surfaceIndexKeys` therefore splits them and mints a real bare key:

```
sunseo-daero	free   [parts: sunseo → free, daero → free]
```

This is the same mechanism `docs/76` §4 said could not happen and that L3-M9's bare `-deon` proved
could. Here it is intended and harmless — `daero` is a particle, and every particle in this course
already owns a bare key the same way `eul`, `e` and `reul` do — but it is recorded because the rule
is the same either way: **no row may ever write `daero` alone**, and S08's trap says as much to the
learner.

**7. One deliberate re-teach, and it is `ttaemune`.** `npm run content:shown -- en-ko L4-M2` reports:

> `RE-TEACH L4-M2-S04 "ttaemune": L3-M3 owns the key`

The row is kept. S04 is the `-gi ttaemune` sentence, every other word in it is owned (`yori-reul`
and `hagi` by L4-M1, `sigan-i` by L2-M6, `eopseoyo` by L1-M3), and the schema requires a row. The
honest row is the word the sentence is about. A learner tapping it is shown L3-M3's note, which is
correct about the word and silent about the extension, so the extension is carried by module rule 5
and by S04's trap and plate — both reachable — rather than by the unreachable note. M1 has no
re-teach at all.

### The ratchet

`npx vitest run tools/shown-surfaces.test.ts` is **11/11**, and en-ko holds at its baseline of
**12**. The baseline is not lowered, because this wave fixed none of the twelve: they are

`saram-i · chaek-i · geunyang · geuraeyo · cha-do · il · uisa-yeosseoyo · anieosseoyo · hakgyo-e ·
oneul-do · minsu-ga · eopseoseo`

and every one of them is a forward reference inside L1–L3 — a surface shown by a module earlier than
the module that teaches it. Two of them are worth a note because this wave touches the same strings
from the other end. `hakgyo-e` is owned by L1-M7 in the full fold, so L4-M2-S03's second variation
and C12 resolve against it cleanly; the finding belongs to a module below L1-M7 and is untouched.
`eopseoseo` is now minted at L4-M2 as a form on S09's `eopseunikka` row, and that still does not
close the finding, because the index a module is checked against is cumulative only up to that
module. Closing either is a sweep over verified L1 content and is not this wave's to do.

**Both new modules contribute zero findings.** Every display, every variation display and every
comprehension item in L4-M1 and L4-M2 resolves against the index as it stands at that module, which
is what `npm run content:shown` reports as clean for each and what the ratchet test confirms by
course.

### Open questions for the native pass

76. **`neoko` and the written-aspiration law** (M1, and the reason S01 reads as it does). This
    course writes assimilation and aspiration (`jochi`, `masinneun`, `gwallibi`), so the `-go` form
    of the verb this module romanizes as `neoeuseyo` would have to be written `neoko` — and the
    connective, which is the whole point of the pattern, would become invisible to a learner. M1
    avoided that form entirely and reached for `kkeurigo`, `bogo` and `kyeogo` instead. Confirm that
    `neoko` is the right romanization under the law, and rule on whether a module may ever show it
    or whether the avoidance should become policy.

77. **The Hangul spacing of the joined auxiliary** (M1, rule 4). The romanization is joined by
    ruling — `haeboseyo`, `meogeoboseyo`, `nulleoboseyo`, `neoeoboseyo` — and the `script` lines were
    written joined to match, with no space before the auxiliary. Standard Korean orthography
    prefers the space there and permits the join. Confirm the join reads as ordinary rather than as a typo, since the
    script line is the only thing on the page a Korean reader would check.

78. **`-(eu)ryeomyeon` against `-gi wihaeseo` in front of an order** (M1, rules 0 and 1, S03's
    plate). The module states flatly that `-gi wihaeseo` sits badly in front of an instruction and
    that `-(eu)ryeomyeon` is what a sign uses. Confirm `Yeok-e gagi wihaeseo i-jjok-euro gaseyo` is
    genuinely odd rather than merely less idiomatic. This extends Q58.

79. **`hanbeon` as one word** (M1-S05, S06). Written together and glossed *give it a go* rather than
    *one time*, with the counter reading deliberately excluded (`beon` is L3-M7's dose). Confirm the
    spelling, and that `hanbeon` plus `-a/eo boda` is the ordinary pairing rather than a redundancy.

80. **`-daero`** (M1-S02, S08). New to the course and not named in the brief. Confirm `sunseo-daero`
    and `bangbeop-daero` are what a person says for *in that order* and *the way the method says*,
    that the particle hyphen is right for it, and that no natural sentence writes it apart.

81. **`Ramyeon-eul haryeomyeon`** (M1-S04, second variation). `hada` used of making instant noodles.
    Confirm it is what a Korean speaker says, or whether `kkeurida` is the only verb for it and the
    variation should have been `Ramyeon-eul kkeurillyeomyeon`.

82. **`igeo-reul`** (M1-S04, S08 and three variations). The demonstrative was forced into `igeo`
    because the bare adnominal `i` cannot be written in this course. Confirm `igeo-reul nureuseyo`
    and `igeo-reul sunseo-daero hamyeon dwaeyo` sound natural rather than childish, since a native
    speaker pointing at a kiosk might say nothing at all.

83. **The `-(eu)nikka` imperative ban stated as absolute** (M2, rule 0, S02 and S09 plates). The
    module says `-aseo` may not head an instruction *at all*. Confirm there is no register, speed or
    fixed phrase in which a `-aseo` clause precedes a command. This extends Q63 from the tense side
    to the mood side.

84. **`saenggyeosseoyo` for an event** (M2-S01). Chosen over L3-M7's `nasseoyo` on the brief's
    advice. Confirm `Sago-ga saenggyeoseo` is what is said of a traffic accident, and that
    `Sago-ga nasseoyo` is either wrong or means something else. This extends Q38.

85. **`geu gyeolgwa` with no particle** (M2-S10, trap). The module's paragraph-level claim: that it
    stands at the head of a sentence as a link back to the previous one and takes nothing behind it.
    Confirm it is spoken rather than only written, and that a speaker telling their own story would
    actually use it where the module puts it.

86. **`jeonhwa-ga … deullyeoyo`** (M2-S06, trap and plate). Confirm the phone — the device, not the
    sound — is what takes `-ga` in front of `deullyeoyo`, and that `jeonhwa-reul deureoyo` is wrong
    rather than a different sentence about answering the call. This extends Q64.

87. **`hage dwaesseoyo` of a skill** (M2-S10). `hangugeo-reul jal hage dwaesseoyo` for *I came to
    speak Korean well*. Confirm the frame reaches an acquired ability and not only a change of
    circumstance, since the module's own rule 3 explains it as the form used when nobody decided the
    outcome, and learning a language is at least partly decided.

## Wave 2 — L4-M3, L4-M4 and L4-M5 (#546)

The level's RANGE modules: the past counterfactual, the argument turn, and the refusal that never
says no. Authored against the briefs in `tools/course-briefs.ts` and reviewed, as Wave 1 was,
against the **REAL emitted index rather than the briefs' account of it** — every ownership claim
below is quoted from `npm run content:owner -- en-ko …`.

At the start of this wave the fold read **931 surfaces over 32 modules through L4-M2, `maxSpan` 2**.
After the three modules it reads **975 surfaces over 35 modules through L4-M5**: L4-M3 contributes
**16** keys, L4-M4 **14** and L4-M5 **14**. **`maxSpan` holds at 2**, for Wave 1's reason and one
more: every ending this wave teaches is written ATTACHED — `gasseumyeon`, `geuraesseoyo`,
`bissagineun`, `itjanayo`, `joeundeyo`, `galji` — so not one of them is a whitespace token that
could widen a span, and the only hyphens added anywhere are `iyu-ga` and `iyu-reul` on a noun this
wave itself mints. The one two-token surface in play, L3-M3's `geot gatayo`, is reused across
L4-M5's S04, S05 and S10 and never reopened; `gatayo` is still `free` after the wave, exactly as the
brief asked.

`npm run content:validate` reports every module `ok` — `CONTENT 315/315 ok` when this section was
written, and the total moves as the other eight courses' waves land; all three modules are clean under
`npm run content:shown`; `npx vitest run tools/shown-surfaces.test.ts` is 11/11 with en-ko holding at
its baseline of 12.

### L4-M3 "What might have been" — the past marked twice, and a frame that does not mean should have

```
S01  Geuttae ilchik gasseumyeon joasseul geoyeyo.
S02  Bi-ga an wasseumyeon chukje-e gasseul geoyeyo.
S03  Ilchik gal geol geuraesseoyo.
S04  Geu yeonghwa-reul an bol geol geuraesseoyo.
S05  Eoje ilchik jip-e gasseoya haesseoyo.
S06  Yak-eul meogeosseumyeon gwaenchanasseul geoyeyo.
S07  Jeongmal huhoehaeyo. Deo gongbuhal geol geuraesseoyo.
S08  Geuttae yeyak-eul haesseumyeon joasseul geoyeyo.
S09  Taeksi-reul tasseumyeon an neujeosseul geoyeyo.
S10  Yak-eul meogeosseoya haesseoyo. Geuraeseo huhoehaeyo.
```

The module teaches the counterfactual as **doubling, not as a new ending**. L3-M4's `-(eu)myeon` is
reused byte for byte and the only difference a learner can see is the past on both halves, which is
why rules 0, 1 and 5 all point at the same place from three directions: the doubling itself
(`gamyeon joayo` against `gasseumyeon joasseul geoyeyo`), the English habit of marking the AUXILIARY
(`gal geoyeosseoyo`, which nobody says), and the fact that English *if* is one word for the open
condition and the closed one. S02 and S09 are the pair that separates the two positions of `an`:
S02 negates the IF-half (`an wasseumyeon`, it did not rain) and S09 negates the OUTCOME
(`an neujeosseul geoyeyo`), and both traps say so.

Beside it the regret proper. `V-(eu)l geol geuraesseoyo` gets S03, S04 and S07 and is stated as the
UNAMBIGUOUS one; `V-eosseoya haesseoyo` gets S05 and S10 and is stated as **had to**, with S10's
second sentence (`Geuraeseo huhoehaeyo`) doing the work of forcing the regret reading. That is the
brief's slogan trap answered head on: the module never teaches *should have* with `-eosseoya
haesseoyo` alone, and S03's trap says in as many words that `ilchik gasseoya haesseoyo` would be
heard first as *I had to go early*.

The one re-teach in the wave is here. S04 takes a row on `an` (L1-M3), because the module's fifth
pattern is literally `an + V-(eu)l geol geuraesseoyo` and the position of the negative — in front of
the modifier, never in front of `geuraesseoyo` — is the whole content of the sentence. The row's
note points back at L1-M3 as the owner and adds only the position, and the mistake plate shows the
sentence a learner writes instead (`bol geol an geuraesseoyo`).

### L4-M4 "Persuading" — concede first, and an ending that presupposes agreement

```
S01  Jigeum sigan-i itjanayo. Cheoncheonhi gayo.
S02  I-sikdang-i jochanayo. Yeogi-eseo meogeoyo.
S03  Bissagineun hajiman, i-geo-ga jeongmal joayo.
S04  Meolgineun hajiman, beoseu-ga jaju isseoyo.
S05  Mullon jom bissayo. Geuraedo i-geo-ga deo joayo.
S06  Hagineun hajiman, jal an dwaesseoyo.
S07  Jigeum an bappeunikka hwaksilhi hal su isseoyo.
S08  Sasil i-geo-neun iyu-ga isseoyo.
S09  Mullon jochanayo. Geuraedo jom bissajanayo.
S10  Naeil-eun an bappeujanayo. Geureomyeon gachi gal su isseoyo.
```

Three moves, layered. `-janayo` on S01, S02, S09 and S10 is taught as a **presupposition, not an
intensifier and not a tag question**: rule 1 states the difference from English *is it not?* — the
tag hands the floor over, `-janayo` closes the point — and S01's mistake plate is the ending with a
question mark on it, which is the shape an English speaker writes first. Every `-janayo` sentence's
trap names the condition on it: the listener must actually have agreed, so S10, which tells the
listener about their own diary, only works if they really said so.

The concessive gets S03, S04 and S06, always spelled in FULL (`bissagineun`, `meolgineun`,
`hagineun`) with the contraction on the mistake plate rather than in a display. S06 is the one that
concedes the ACTION rather than a property — *I did do it, but* — which is the shape that keeps
credit for the effort. Then the turn-level frame: `mullon … geuraedo …` on S05 and S09, with rule 4
and S05's mistake plate both insisting the order is fixed, because reversed the turn ends by
conceding the point it was making. `sasil` (S08) introduces the fact the other person has not
weighed, and `iyu` is minted with its two particle forms so that the noun can be either half of a
sentence.

The module contributes **zero re-teaches**: every row is a fresh key.

### L4-M5 "Disagreeing well" — the sentence that never reaches its own verb

```
S01  I-geo-ga jeongmal joeundeyo...
S02  Jigeum-eun jom bappeundeyo...
S03  Jeo-neun jigeum ilhaneundeyo...
S04  Geulsseyo, bissal geot gatayo.
S05  Geulsseyo, naeil-eun bi-ga ol geot gatayo.
S06  Naeil galji moreugesseoyo.
S07  Chingu-ga olji moreugesseoyo.
S08  Joesonghajiman, jigeum-eun sigan-i eomneundeyo...
S09  Joesonghajiman, jeo-neun dareun geo-ga deo joeundeyo...
S10  Sigan-i jom eoryeoul geot gatayo.
```

Four of the ten displays end in an ellipsis and nothing else, which is this course's rendering of an
ending that lays down a background and stops. The `literal` line on each of them spells the gap out
in words — `good-but-and-then-nothing` — because rule 0 is right that no English punctuation renders
it, and the `cue` carries the English *but…* that the Korean deletes.

The allomorphy is taught rather than assumed: S01 and S02 take the adjective's `-(eu)ndeyo`, S03
takes the action verb's `-neundeyo`, and S08 shows `eopseoyo` siding with the action verbs and
picking up the written assimilation (`eomneundeyo`). S03's trap says outright that swapping the two
shapes is the commonest slip in the module.

**S10 is the module.** `Sigan-i jom eoryeoul geot gatayo` is shipped as a REFUSAL, its cue carries a
parenthetical `(No.)`, its trap says so in the plainest words the format allows, and its mistake
plate is the present modifier `eoryeoun geot gatayo` — the reading that turns a no into a difficulty
rating, which is exactly the misreading rule 1 calls the most expensive in the course. `geulsseyo`
(S04, S05) is given the same treatment in its note: a whole turn on its own, and not *maybe*.

The module contributes **zero re-teaches**. `geureonde` and `geunde` are pointed back at (rule 4)
and never written, and the flat contradiction `teullyeoyo` is named in rule 7 as the thing not to
say and never appears in a display.

### The brief seams this wave had to correct, and what the index actually said

**1. `iljjik` is not this course's spelling of 일찍; `ilchik` is, and L1-M4 owns it.** The M3 brief
writes `iljjik` three times — in its worked example (`Iljjik gasseumyeon bwasseul geoyeyo`), in the
slogan trap (`Iljjik gasseoya haesseoyo`) and in the unambiguous regret (`iljjik gal geol
geuraesseoyo`) — and it is the standard romanization. It is not the one on disk:

```
ilchik	L1-M4
iljjik	free
```

L1-M4 teaches 일찍 twice, in `Achim-e ilchik ireonayo` and `Bam-e ilchik jayo`, and its own `sound`
line already concedes the pronunciation (*"The ch of ilchik tenses after the l, closer to
il-jjik"*). Writing the brief's spelling would have minted a SECOND key for one word and left the
L1-M4 row unreachable from every L4 sentence that used it — the level law's failure mode exactly,
with the added insult that the level below could not be edited to fix it. All four L4-M3 sentences
that need *early* write `ilchik`, and it costs nothing. **This is the wave's most valuable finding**
and it generalises: a brief written from standard romanization is not a reliable guide to a course
that settled its own (`docs/34`), and `content:owner` is the only thing that knows which spelling
the ladder actually holds.

**2. `isseunikka` is free, and the M4 brief's fourth pattern walks straight into it.** Pattern 4 is
`clause-(eu)nikka + V-(eu)l + su + isseoyo`, and the brief's index note lists what it reuses — `su`
L2-M1, `jom` L2-M1 — without noticing that the most natural clause to put in front of it is unowned:

```
isseunikka	free
onikka	L3-M3
bappeunikka	L3-M3
eopseunikka	L4-M2
```

Three shapes of `-(eu)nikka` are owned and the *there is* one is not, so `Sigan-i isseunikka
hwaksilhi hal su isseoyo` would have spent a fresh key on an ending the module is not chartered to
teach. S07 was rewritten as `Jigeum an bappeunikka hwaksilhi hal su isseoyo`, which spends nothing
on the ending and puts the whole of the sentence's budget on `hwaksilhi`. This is Wave 1's finding
again from a third angle: **an owned ending is not an owned paradigm**.

**3. `nasseoyo` is L3-M7's symptom verb, and the obvious counterfactual for medicine collides with
it.** *If I had taken the medicine I would have got better* wants 나았을 from 낫다, which this
course would romanize into the same neighbourhood as L3-M7's 나다:

```
nasseoyo	L3-M7   (yeol-i nayo — a fever comes out)
nasseul	free
naasseoyo	free
```

L3-M7's row teaches `nayo`/`nasseoyo` as *comes out · appears*, the symptom verb, so a `nasseul`
minted here would sit one fold away from a word that means the opposite kind of thing. S06 was
rewritten onto L2-M1's `gwaenchanayo` — `Yak-eul meogeosseumyeon gwaenchanasseul geoyeyo` — which
spends one clean key and dodges the homograph entirely.

**4. The M3 brief's two self-corrections both check out, and a third of the same kind is added.**
`mal` is `L3-M5` as the brief says, so the prohibitive regret `V-ji mal geol geuraesseoyo` is not
written anywhere and rule 4 teaches `an V-(eu)l geol geuraesseoyo` instead. `geuttae` and `ttae` are
both `free` as the brief says, and written as ONE token `geuttae` donates nothing — after the wave
`ttae` is still `free`, unspent for L4-M6. The third: `han` is `L1-M8` native ONE, and no
counterfactual in the module is built on the `-(eu)n` of `hada`.

**5. The M4 brief's `gin` ruling checks out and is load-bearing.** `gin` is `L2-M2` (LONG, from
`gireoyo`), so `bissagin hajiman` would have folded a concessive onto an adjective. Every concessive
ships in full and the contraction appears only on mistake plates (S03, S06). `janayo` is `free`
before the wave and `free` after it: the ending is written attached on every one of the four
`-janayo` sentences, so no bare key is minted.

**6. The M5 brief's orthography ruling checks out, and both bare keys survive it.** `-(eu)lji` is
written attached (`galji`, `halji`, `olji`) and `-(neu)ndeyo` likewise (`joeundeyo`, `bappeundeyo`,
`ilhaneundeyo`, `eomneundeyo`). After the wave:

```
ji	free
neunde	free
deyo	free
gatayo	free
```

`ji` is still there for L4-M6's elapsed-time bound noun, which is the seam the brief was protecting,
and `gatayo` is still free because `geot gatayo` was matched as L3-M3's two-token key rather than
re-minted. Rule 3 of L4-M5 states the spacing difference for the learner so that M6 can rely on it.

**7. A noun that is owned does not bring its particles with it.** Wave 1 found this on verb
paradigms; it bit again here on nouns, and cost three rewrites:

```
sukje-reul	free   [parts: sukje → L3-M2, reul → L1-M1]
uisa-reul	free   [parts: uisa → L1-M1, reul → L1-M1]
hoesa-e	free   [parts: hoesa → L3-M2, e → L1-M4]
saram-i	free   [parts: saram → L1-M1, i → L1-M1]
bangbeop-i	free   [parts: bangbeop → L4-M1, i → L1-M1]
naeil-i	free   [parts: naeil → L1-M6, i → L1-M1]
```

`matchSurfaces` walks whole whitespace tokens, so `sukje-reul` must itself be a key — the hyphen
parts being owned is not enough. Every sentence in the wave was written against the particle-shaped
surfaces that already exist (`yak-eul`, `chukje-e`, `sigan-i`, `beoseu-ga`, `geo-ga`) rather than
against the nouns behind them. An author who writes from the noun list will produce
`SHOWN-BUT-UNTAUGHT` findings that look like typos and are not.

### The ratchet

`npx vitest run tools/shown-surfaces.test.ts` is **11/11**, and en-ko holds at its baseline of
**12**. The baseline is **not lowered**, because this wave fixed none of the twelve: they remain

`saram-i · chaek-i · geunyang · geuraeyo · cha-do · il · uisa-yeosseoyo · anieosseoyo · hakgyo-e ·
oneul-do · minsu-ga · eopseoseo`

and every one is still a forward reference inside L1–L3. Two of them brushed against this wave and
neither is closed by it. `saram-i` was a candidate subject for L4-M5's `-(eu)lji` sentence and was
rejected for exactly the reason it is on the list — S07 writes `chingu-ga` instead — so the wave
avoids the surface rather than teaching it, and a finding owned by a module below L1-M1 cannot be
closed from L4 anyway. `hakgyo-e` is owned by L1-M7 in the full fold, so L4-M3-S02's first variation
and S06's first variation resolve against it cleanly; the finding belongs to a module earlier than
L1-M7 and is untouched. Closing either is a sweep over verified L1 content and is not this wave's
to do.

**All three new modules contribute zero findings.** Every display, every variation display and every
comprehension item in L4-M3, L4-M4 and L4-M5 resolves against the index as it stands at that module,
which is what `npm run content:shown` reports as clean for each and what the ratchet test confirms
by course. The single `RE-TEACH` line in the wave — L4-M3-S04's `an`, owned by L1-M3 — is
information rather than a defect on this course, and it is kept deliberately: the sentence's whole
subject is where the negative sits.

### Open questions for the native pass

The chain continues from **87**, the last number in `docs/93-en-ko-L4-brief-decisions.md` and this
document taken together. Nothing above 87 existed before this wave, and nothing already numbered is
renumbered.

88. **`ilchik` against `iljjik`** (M3, four sentences). This wave held the L1-M4 spelling for the
    reason in seam 1, but the standard romanization is `iljjik` and L1-M4's own `sound` line says so.
    Rule on whether the course keeps `ilchik` for good, or whether L1-M4 should be migrated in a
    change that is licensed to edit L1 — this wave was not, and a level may never edit a file below
    it.

89. **`geuttae` written solid** (M3-S01, S08). Confirm 그때 is one word in this course's romanization
    and that a learner never needs to see `geu ttae`. The index consequence is that L4-M6's `ttae`
    stays unspent, so a ruling the other way would cost M6 a key.

90. **`-eosseoya haesseoyo` really is ambiguous** (M3-S05, S10, rule 3). The module's slogan trap
    depends on it. Confirm 일찍 갔어야 했어요 is heard first as *I had to go early* by a native ear
    with no context, and that S10's second sentence `Geuraeseo huhoehaeyo` is enough to force the
    regret reading rather than merely allowing it.

91. **The doubled past against a present outcome** (M3-S01 mistake plate). Confirm
    그때 일찍 가면 좋았을 거예요 is genuinely wrong rather than colloquially tolerable, since the whole
    module rests on the doubling being obligatory.

92. **`gal geol` against `gasseul geol`** (M3-S03, S07 mistake plates). Confirm 갔을 걸 그랬어요 and
    공부했을 걸 그랬어요 are errors rather than variants, and that the modifier before `geol` is always
    the plain `-(eu)l`.

93. **The negative regret's word order** (M3-S04, rule 4). Confirm 안 볼 걸 그랬어요 is the ordinary
    shape and 볼 걸 안 그랬어요 is not said at all. Separately, confirm whether `-지 말 걸 그랬어요` is
    in fact the commoner form in speech; it is barred here because `mal` is L3-M5's, and if it is the
    commoner form the ban is a real pedagogical cost that L5 should pay off.

94. **`gwaenchanasseul geoyeyo` for a recovery** (M3-S06). Chosen over 나았을 for the collision in
    seam 3. Confirm 약을 먹었으면 괜찮았을 거예요 is what is actually said about a cold, and that it
    does not read as *it would have been acceptable* rather than *I would have been better*.

95. **`huhoehaeyo` in the present about a closed past** (M3-S07, S10). Confirm the present tense is
    the ordinary one, that `huhoehaesseoyo` — shipped as a form and shown in S07's second variation —
    is not the default, and that 후회해요 is not too heavy a word for a missed film or a late start.

96. **`-janayo` and the stranger** (M4, rule 0 and every `-janayo` trap). Confirm the ending is
    genuinely WRONG rather than merely brusque with someone you have just met, and rule on where the
    line falls with a colleague you know only at work — the module's usage lines currently put it
    with friends and close colleagues only.

97. **`jochanayo` and the plate under it** (M4-S02). The written-aspiration law gives
    좋잖아요 → `jochanayo`. Confirm, and confirm that the mistake a learner actually makes is
    `joayojanayo` — the ending stuck onto a finished `-ayo` form — rather than the mis-romanization
    `jotjanayo`, which is what the plate would show if the law were the harder thing.

98. **The concessive written in full** (M4-S03, S06, rule 3). 비싸긴 and 하긴 are barred here only
    because `gin` is L2-M2's LONG. Confirm 비싸기는 하지만 is natural in speech and not merely
    correct in writing, and rule on whether L5 may ever write the contraction once the collision is
    survivable.

99. **`hwaksilhi` in an argument** (M4-S07). Confirm 확실히 할 수 있어요 reads as a commitment rather
    than as boasting, and that `hwaksilhi` is the right adverb here for a colleague rather than
    꼭 or 반드시.

100. **`iyu` beside L4-M2's `ttaemune`** (M4-S08). The note distinguishes them as *the cause stated
     inside a sentence* against *the reason as a thing you can hold*. Confirm 이거는 이유가 있어요 is
     what is said when you are about to give one, and that it does not sound defensive.

101. **`i-geo-ga` and `dareun geo-ga`** (M4-S03, S05; M5-S09). The course writes 이거가 and 다른 거가
     where 이게 and 다른 게 are the spoken norm — a decision inherited from L1-M1 and now carried into
     an argument module and a refusal module, where register matters more than it did in L1. Confirm
     the uncontracted form is still acceptable there, or rule that L5 must contract.

102. **The ellipsis as the rendering of a trailing ending** (M5, four displays, rule 0). Three ASCII
     dots is this course's device for a clause that stops. Confirm a native reader does not read them
     as a different kind of pause, and that the `literal` line's `good-but-and-then-nothing` is a
     fair gloss rather than a joke.

103. **`eomneundeyo`** (M5-S08). The written-assimilation law gives 없는데요 → `eomneundeyo`, on the
     rule that gives `masinneun`. Confirm the romanization, and confirm 시간이 없는데요 is the shape
     used to decline a senior's request rather than 시간이 없어서요.

104. **`sigan-i jom eoryeoul geot gatayo` as a closed no** (M5-S10, rule 1). The module's law, and the
     claim the whole course's politeness training rests on. Confirm the sentence leaves NO opening;
     confirm the present-modifier plate 어려운 것 같아요 really does read as a difficulty rating
     instead; and confirm that the parenthetical `(No.)` in the cue is the right way to teach a
     pragmatic fact the words do not carry.

## Wave 3 — L4-M6 through L4-M10 (#562)

The level's remaining RANGE modules and its exit: time clauses, the formal speech level, past habits,
journeys, and the story with a twist. Authored against the briefs in `tools/course-briefs.ts` and, as
in Waves 1 and 2, reviewed against the **REAL emitted index rather than the briefs' account of it** —
every ownership claim below is quoted from `npm run content:owner -- en-ko …`.

At the start of this wave the fold read **975 surfaces over 35 modules through L4-M5, `maxSpan` 2**.
After the five modules it reads **1104 surfaces over 40 modules through L4-M10**: L4-M6 contributes
**32** keys, L4-M7 **35**, L4-M8 **24**, L4-M9 **30** and L4-M10 **8**. In word ROWS — which is what
`newWordCap` is about — that is 19, 17, 15, 14 and 6, all inside the cap of 25, and the level exits on
six rows exactly as the M10 brief asked. **`maxSpan` holds at 2.** The fold held nine two-token
surfaces after thirty modules; `algo boni` is the tenth and the only one this wave adds, so the shape
the M10 brief called proven is still proven and still bounded.

`npm run content:validate` reports every module `ok` — `CONTENT 360/360 ok` when this section was
written, and the total moves as the other eight courses' waves land. All five modules are clean under
`npm run content:shown` with **no `SHOWN-BUT-UNTAUGHT`, no `COLLIDES INSIDE THIS MODULE` and not one
`RE-TEACH` line anywhere in the wave**; `npx vitest run tools/shown-surfaces.test.ts` is 11/11 with
en-ko holding at its baseline of 12; `npx vitest run src/course/types.test.ts` is 381/381.

### L4-M6 "Before and after" — the connective fixes the clause, the sentence fixes the tense

```
S01  Bap-eul meokgi jeon-e son-eul ssiseoyo.
S02  Hakgyo-e gan hu-e chingu-reul mannasseoyo.
S03  Hangugeo-reul baeul ttae hangsang eumak-eul deureoyo.
S04  Chingu-ga ilhaneun dongan jeo-neun chaek-eul ilgeosseoyo.
S05  Eumak-eul deureumyeonseo gongbuhaeyo.
S06  Sueop-i kkeunnal ttae-kkaji yeogi-eseo gidaryeoyo.
S07  Yeonghwa-neun beolsseo sijakhaesseoyo.
S08  Bap-eul ajik an meogeosseoyo.
S09  Hanguk-e on ji sip nyeon dwaesseoyo.
S10  Sigan-i isseul ttae jeonhwahalgeyo.
```

The module teaches five bound nouns and one ending, and the law it exists for is rule 0: **the shape
of the clause is fixed by the connective and never by the sentence.** S01 and its first variation are
the same sentence in two tenses with the clause untouched (`meokgi jeon-e` both times), and the
mistake plate is the shape English symmetry produces, `meogeotgi jeon-e`. S02 does the mirror: `hu-e`
takes the PAST modifier even where the sentence is future, and its plate is `gagi hu-e`, the
before-and-after pair made regular. Between them they say the thing no learner guesses, which is that
`jeon-e` and `hu-e` are not a matched pair at all.

`ttae` against L3-M4's `-(eu)myeon` gets S03 and S10, deliberately at the two ends of the module so
the contrast is met twice. S03's plate is `baeumyeon` — grammatical, and a hypothesis where a habit
was meant — and S10's second variation is the correct `isseumyeon` sentence with `changed` naming it
as a different promise. Neither module rewrites `-(eu)myeon`; both point at it.

The `while` split runs S04 against S05. `dongan` takes two subjects (the friend works, I read) and
`-(eu)myeonseo` takes one, and each plate breaks the other's rule: S04 puts `ttae` where a stretch
belongs, S05 puts two subjects under `-(eu)myeonseo`. S06 splits `until` — a clause needs `ttae` for
`-kkaji` to attach to, a noun does not, and the second variation is `hakgyo-kkaji` making that
concrete. S07 and S08 are the small words, and S08's two variations are the whole of `ajik`: the same
adverb reads as *not yet* under a negative and *still* without one, which is why the polarity switch
is a variation rather than a note. S09 is the elapsed frame, and its plate is `on hu-e … dwaesseoyo`,
the sequencing bound noun doing the measuring bound noun's job.

### L4-M7 "Official talk" — the level a learner hears, and answers at their own

```
S01  Jamsiman gidaryeojusipsio.
S02  Igeo-neun jeopsu changgu-imnida.
S03  Pyo-neun yeogi-e isseumnida.
S04  Jigeum pyo-ga eopseumnida.
S05  Jamsi hu-e annae bangsong-i isseumnida.
S06  Seunggaek yeoreobun, gicha-ga chulbalhamnida.
S07  Gicha-ga yeol si-e dochakhamnida.
S08  Sajangnim-kkeseo jigeum osimnida.
S09  Jeopsu-neun je-ga hamnida. Sinbunjeung-i isseumnikka?
S10  Yeoreobun, jigeum sijakhapsida.
```

This is the largest change the course has made since L1, and it is authored as **comprehension
before production**: every one of the twelve pool items is something said AT the learner, and every
sentence carries a `usage` line naming who is speaking and from where. The four endings each
get a home — `-(eu)sipsio` in S01, `-(seu)pnida` in S02–S08, `-(seu)pnikka` in S09, `-(eu)psida` in
S10 — and rule 5 states the answer rule plainly: understand the announcement and reply at your own
level. S09 is where that is dramatised, because it is the only sentence in the module with two
speakers in it, and its plate is the CORRECT `-yo` version, marked wrong for the room rather than for
the grammar.

The trap inside the set is `-(eu)psida`. S10's plate is `Sajangnim, gachi sijakhapsida` — a proposal
aimed upward — and rule 2 sends the upward version back to L2-M6's `-(eu)llaeyo` with the honorific,
which is where the course already keeps it. Nothing here lifts the banmal ban, nothing extends L3-M8,
and the four frozen phrases are named in rule 6 and left alone: not one of the `-mnida` shapes this
module opens points back at any of them.

### L4-M8 "Back then" — four Korean shapes under one English label

```
S01  Eoril ttae maeil hakgyo-e gagon haesseoyo.
S02  Yennal-e-neun sigol-eseo sarasseosseoyo.
S03  Yejeon-e-neun jaju yeonghwa-reul bwasseoyo. Ijen an bwayo.
S04  Jaju gatdeon sikdang-i ijen eopseoyo.
S05  Ilhaetdeon hoesa-neun mani byeonhaesseoyo.
S06  Haksaeng sijeol-e-neun maeil gongbuhagon haesseoyo.
S07  Geuttae-neun haksaeng-ieosseoyo. Ijen seonsaengnim-ieyo.
S08  Yennal-e-neun jip-eseo yori-reul hagon haesseoyo.
S09  Yejeon-e-neun sigol-eseo ilhaesseoyo. Ijen mani dallajyeosseoyo.
S10  Eoril ttae saratdeon sigol-e ijen an gayo.
```

The module is built so that each of the four shapes is teachable by its own meaning and never by the
English label. `V-gon haesseoyo` gets S01, S06 and S08 on three different stems (`gagon`,
`gongbuhagon`, `hagon`, with `meokgon` in a variation), and each of the three mistake plates is the
same error — the tense left off the auxiliary — because that is the one thing that actually goes
wrong with the frame. `-eotdeon` gets S04, S05 and S10, and S04's first variation is L3-M9's plain
`gadeon` on the SAME sentence, with `changed` saying what moves: *the open -deon, which keeps the
habit in view*. That is the contrast the brief asked for, and it is a variation rather than a note
because the two forms differ by nothing a learner can see except one syllable.

S07 is the gift, and it is authored as a gift: English needs *used to be* and Korean needs
`haksaeng-ieosseoyo`, which L1-M5 already taught, so the sentence spends its one row on
`geuttae-neun` instead and the `trap` says outright that reaching for `-gon` or `-eotdeon` here would
be wrong. S02's doubled past is stated as an END rather than as a stronger past, and its trap says the
sentence would be wrong about somewhere you still live.

### L4-M9 "Places and journeys" — the direction inside the verb

```
S01  Bada-e gabon jeok isseoyo?
S02  Yeohaeng-eul gaseo bada-reul bwasseoyo.
S03  San-e gabon jeok isseoyo. Eoje-neun an gasseoyo.
S04  Sageori-eseo oenjjok-euro doragaseyo.
S05  Gonghang-e deureogaseo chingu-reul mannasseoyo.
S06  Yeok-eseo nagaseo taeksi-reul tayo.
S07  San-e ollagal ttae sigan-i mani geollyeosseoyo.
S08  Naeryeogal ttae gil-eul ireobeoryeosseoyo.
S09  Jido-reul bogo oreunjjok-euro jjuk gasseoyo.
S10  Meonjeo gonghang-e gasseoyo. Geu daeum-e bada-e gasseoyo. Machimnae jip-e doragasseoyo.
```

**No new direction vocabulary at all**, exactly as the brief demanded: `oenjjok`, `oreunjjok`, `jjuk`,
`sageori`, `jeongnyujang`, `yeok`, `taseyo`, `naeriseyo`, `euro` and `kkaji` are L2-M4's and are used
in their already-owned particle-shaped forms (`sageori-eseo`, `oenjjok-euro`, `jeongnyujang-eseo`,
`yeok-kkaji`). What the module adds is the five compound verbs, and every one of the five mistake
plates is the same interference written a different way: `an-euro gaseo`, `bakk-euro gaseo`,
`wi-ro gal ttae`, `arae-ro gal ttae`, `oenjjok-e`. Rule 6 names the pattern so the plates read as one
lesson rather than five.

The experience frame gets S01 and S03, and S03 is the item the brief asked for: the SAME place under
both frames, `gabon jeok isseoyo` beside `eoje-neun an gasseoyo`, so the difference cannot be read as
a difference of place or of politeness. S10 is the six-stop trip, and its plate is the experience
frame pushed inside a chronological account, which `meonjeo` immediately contradicts.

### L4-M10 "A story with a twist" — the line of dialogue, and six new keys

```
S01  Eoje yeok-eseo jigap-eul ireobeoryeosseoyo. Gapjagi chingu-ga jeonhwahaesseoyo.
     "Jigap-i yeogi isseoyo" rago haesseoyo. Jeongmal gomawoyo.
S02  Chingu-ga yeonghwa-reul bwasseoyo. Yeonghwa-ga jeongmal seulpeosseoyo.
     Geureonde chingu-neun useosseoyo. Algo boni chingu-neun dareun yeonghwa-reul bwasseoyo.
S03  Oneul achim-e neujeosseoyo. Gapjagi bi-ga wasseoyo.
     Hoesa-eseo sajangnim-kkeseo "Oneul-eun hyuil-ieyo" rago malsseumhasyeosseoyo. Jeongmal joasseoyo.
S04  Eoje sijang-e gasseoyo. Sagwa-ga jeongmal ssasseoyo. Geuraeseo mani sasseoyo.
     Algo boni jip-e sagwa-ga mani isseoyo.
S05  Jip-eseo chaek-eul ilgeosseoyo. Gapjagi keun sori-ga deullyeosseoyo. Jeongmal nollasseoyo.
     Algo boni dongsaeng-i wasseoyo.
S06  Eoje chingu-ga jeonhwahaesseoyo. "Oneul saengil-ieyo" rago haesseoyo.
     Geuraeseo seonmul-eul sasseoyo. Algo boni je saengil-ieyo.
S07  Achim-e jigap-eul ireobeoryeosseoyo. Meonjeo hoesa-eseo chajasseoyo.
     Geu daeum-e yeok-eseo chajasseoyo. Algo boni jigap-i jip-e isseoyo.
S08  Eoje yeok-e gasseoyo. Annae bangsong-i deullyeosseoyo.
     "Gicha-ga jamsi hu-e chulbalhamnida" rago haesseoyo. Geuraeseo gapjagi ppalli gasseoyo.
S09  Oneul chingu-ga jip-e wasseoyo. Keopi-reul masyeosseoyo.
     Chingu-ga "Igeo-neun cha-yeyo" rago haesseoyo. Geuraeseo mani useosseoyo.
S10  Yejeon-e-neun hangugeo-reul mothaesseoyo. Gapjagi chingu-ga "Gachi gongbuhaeyo" rago haesseoyo.
     Geuraeseo maeil gongbuhaesseoyo. Ijen hangugeo-reul jal hage dwaesseoyo.
```

Six new keys for ten items, which is the smallest spend of the level: `gapjagi`, `algo boni`,
`useosseoyo`, `nollasseoyo`, `jigap`, `chajasseoyo`. Everything else is assembly, which is what the
exit of a level is supposed to be. Four items therefore carry a **deliberate repeat** in the sense
`tools/check-shown.ts` licenses — `gapjagi` is a row on S01, S03, S08 and S10, `algo boni` on S02, S04
and S06, `useosseoyo` on S02 and S09 — and in every case the repeated rows carry a **byte-identical
note**, which is what the collision check tests. `content:shown` reports no `COLLIDES` line for the
module, and a learner who taps the word in any of those items is shown the same sentence, so which row
the fold reaches is invisible.

The twist is authored as rule 3 defines it — a turn that makes the earlier sentences read differently
— and S04, S06 and S07 all land it on a PRESENT: the apples are still at home, the birthday is still
today, the wallet is still where it always was. S06 hides the twist inside the quotation itself, which
is the shape the module's title promises, and its plate is L3-M5's indirect report, which spells out
whose birthday and destroys the joke. S08 puts L4-M7's formal level inside the quotation marks and its
plate lets the level escape into the narration. S03 does the same job for the honorific: the director
is honoured by `malsseumhasyeosseoyo` outside the quotation, and the plate puts `-si-` inside it. No
item writes banmal, in a quotation or out of one.

### The brief seams this wave had to correct, and what the index actually said

1. **The M7 brief's demand for a test change is stale, and no test was changed.** Its note 2 says
   `FROZEN_FORMAL_L2` "fails any token ending in `mnida` outside those four phrases for every module
   whose id does not start with `L1-`", and that "authoring this module is therefore a TEST CHANGE in
   the same commit as the content". `src/course/types.test.ts` already reads
   `const frozenLevel = /^L[123]-/.test(module.id);`, above a comment that names #527 and `docs/93`
   and says in as many words: "**L4-M7 'Official talk' unfreezes the level** … The gate is therefore
   scoped to the levels that froze it, and NOT deleted." The re-scoping landed with the briefs, not
   with the content. This wave touched no file outside its five modules and this document, and
   `npx vitest run src/course/types.test.ts` is green.

2. **The briefs' index seams are all stated "through L3-M10"; the emitted index is deeper.** At the
   start of this wave `npm run content:owner -- en-ko …` printed `975 surfaces owned, folded over 35
   modules through L4-M5`, so every count in the five briefs was five modules behind before a word was
   written. No individual ownership claim turned out wrong because of it, but three of the surfaces
   the briefs called free are in fact L4's own — `dwaesseoyo` is L4-M2 (M6's brief says so), `meokgi`
   and `gagi` are L4-M1 — and an author who trusts the header rather than the tool will mint them
   again.

3. **`meokgi` and `gagi` are L4-M1's, so the `-gi` row has a hole.** `content:owner` gives
   `meokgi → L4-M1` and `gagi → L4-M1`. L4-M6-S01 shows `meokgi` in its display and gives it **no
   row**: the display resolves against L4-M1 and the sentence spends its rows on `jeon-e`, `son-eul`
   and `ssiseoyo`. The same holds for the first variation's `gagi`. Nothing in the module lists a bare
   `-gi` in a `forms` array.

4. **The past-modifier paradigm has two holes, and they are load-bearing.** M6's brief says the
   after-clause is never built on `hada` because `han` is L1-M8's native ONE; `content:owner` confirms
   `han → L1-M8`. It also says `meogeun` and `bon` point back, and `content:owner` confirms
   `meogeun → L3-M7` and `bon → L3-M2`. So L4-M6-S02's `gan` row lists exactly `["gan", "on"]` — the
   two cells that are free — and the note says why the other two are missing. A four-cell paradigm
   here would have made three unreachable rows and one collision.

5. **`naseo` was cleared and never spent.** M6's brief lists it among the surfaces "minted here".
   `content:owner` says `naseo` is free, and it is still free after the wave: no sentence needed it,
   and minting a key no display shows would put an unreachable row in the module. The same applies to
   M7's `gamnida` and `gasipsio`, both confirmed free and both left free — the module opens
   `gasimnida` instead, as the honorific partner of `osimnida`, because that is the form its sentence
   actually shows.

6. **`myeonseo` stays free, and so does `gon`.** M6's brief warns that a `forms` array MINTS INDEX
   KEYS, which is how a bare `-deon` became a real key at L3-M9. Every `-(eu)myeonseo` surface in
   L4-M6 is a whole attached word (`deureumyeonseo`, `ilhamyeonseo`, `meogeumyeonseo`,
   `masimyeonseo`) and every `-gon` surface in L4-M8 is a whole attached word (`gagon`, `hagon`,
   `gongbuhagon`, `meokgon`). After the wave the fold still says `myeonseo → free` and `gon → free`.

7. **The M8 brief contradicts itself about `eotdeon`, and the stricter half wins.** Its note 5 says no
   row "may put a bare `-eotdeon`, `-gon` or `-eoss-eoss-` into a forms array", and its own Fresh list
   then names `eotdeon`. This wave took the rule and not the list: L4-M8 mints `gatdeon`,
   `ilhaetdeon` and `saratdeon` as whole words and never `eotdeon`, which the fold still reports as
   **free**. `deon` itself is confirmed as `L3-M9` — the accident `docs/76` §4 said could not happen —
   and is pointed back at rather than reopened: `gadeon` and `meokdeon` appear only in variations,
   with no row.

8. **The experience past cannot be written `ga bwasseoyo`, and the brief is right about why.**
   `content:owner` gives `bwasseoyo → L2-M10`, so the two-token spelling would hand the learner a note
   about SEEING on a sentence about going. `gabon` and `jeok` are both free and are minted whole;
   L4-M9-S01's mistake plate is the split spelling, with the reason stated.

9. **A hyphen part is not enough — `matchSurfaces` walks whole whitespace tokens.** This is Wave 2's
   finding and it bit again, harder, because this wave mints nine nouns. `sigol` is free, but
   `sigol-eseo`, `sigol-i`, `sigol-e` and `sigol-eul` each had to be listed in the row's `forms`
   before the displays that show them would resolve. Every noun row in the wave is written that way
   (`pyo`, `changgu`, `jeopsu`, `bangsong`, `bada`, `san`, `gonghang`, `gil`, `jido`, `jigap`,
   `yeohaeng`, `yennal`, `sijeol`), and it is the single largest source of surfaces in the wave.

10. **The formal copula arrives as a hyphen part, exactly as `ieyo` did.** The M7 brief does not name
    `imnida`; `content:owner` said it was free. This course attaches the copula with the particle
    hyphen (`haksaeng-ieyo`, `chaek-ieyo`), so L4-M7-S02 writes `changgu-imnida` and the bare
    `imnida` is minted as a hyphen part of it — the same route by which `ieyo` became a key at L1-M1.
    No row displays the bare form, so nothing is unreachable.

11. **`rago` is L3-M5's, and that fact forced a spacing decision.** `content:owner` gives
    `rago → L3-M5` and `irago → L3-M5`; both arrived there as hyphen parts of `uisa-rago` and
    `haksaeng-irago`. For a DIRECT quote there is no host word to hyphenate onto — the token before it
    is a closing quotation mark — so the romanization sets `rago` off as its own whitespace token and
    the surface resolves to L3-M5 with nothing spent. The Hangul line writes it joined to the quote,
    which is the standard spelling. Rule 2 of L4-M10 declares the difference, and question 116 below
    puts it to the gate.

12. **Two romanizations were corrected against this course's own written-assimilation law.** The law
    (`docs/34`, and the surfaces `masinneun`, `meongneun`, `hangungmal`, `isseumnida`) writes
    nasalisation as it is said. The first drafts of this wave had `kkeutnal` and `osipnida`; both are
    nasalised in speech, so the shipped surfaces are **`kkeunnal`** / `kkeunnasseoyo` and
    **`osimnida`** / `gasimnida`. The `allowedPatterns` list still carries the morphological
    `-(eu)sipnida`, as the briefs carry `-(seu)pnida` for a surface that is written `hamnida`; rule 4
    of L4-M7 says both shapes and names which one the course writes.

13. **Tensification and `hada`-aspiration follow the existing precedent and were left alone.**
    `jeopsu`, `meokgon`, `gapjagi` and `gidaryeojusipsio` are all tensed in speech and are written
    untensed, as `hakgyo` and `meokgo` already are. `dochakhamnida`, `chulbalhamnida` and
    `sijakhaesseoyo` keep the consonant plus `h` across the `hada` boundary, as L2-M8's
    `mothaesseoyo` does. Both classes are consistent with what shipped below; neither is settled, and
    questions 108 and 112 put them to the gate.

### The ratchet

`npx vitest run tools/shown-surfaces.test.ts` is **11/11**, and en-ko holds at its baseline of **12**.
The baseline is **not lowered**, because this wave fixed none of the twelve. They remain

`saram-i · chaek-i · geunyang · geuraeyo · cha-do · il · uisa-yeosseoyo · anieosseoyo · hakgyo-e ·
oneul-do · minsu-ga · eopseoseo`

and every one is a forward reference inside an L1 variation, owned by a module below the one that
shows it. Two of them brushed this wave. `saram-i` was the obvious subject for L4-M7-S06's announcement
and for L4-M10-S01's stranger, and was avoided in both — S06 writes `seunggaek yeoreobun` and S01
writes `chingu-ga` — for the same reason Wave 2 avoided it: a finding owned by a module below L1-M1
cannot be closed from L4, and writing the surface again would only spread it. `il` appears in
L4-M6-S09's first variation as the Sino number one (`on ji il nyeon dwaesseoyo`), where it resolves
cleanly against L1-M9 in the full fold; the open finding belongs to L1-M4, L1-M5 and L1-M6, whose
variations show it earlier than L1-M9 teaches it, and closing it is a sweep over verified L1 content
that this wave is not licensed to make.

**All five new modules contribute zero findings.** Every display, every variation display and every
comprehension item in L4-M6 through L4-M10 resolves against the index as it stands at that module,
which is what `npm run content:shown` reports as clean for each and what the ratchet test confirms by
course. Unlike both earlier waves, this one produced **no `RE-TEACH` lines at all**: where a sentence
needed a word an earlier module owns, the word was shown in the display with no row of its own
(`meokgi`, `meogeun`, `gadeon`, `meokdeon`, `haksaeng-ieosseoyo`, `chulbalhamnida` in L4-M9's pool),
so the learner is sent to the owning module's note by design rather than by accident.

### Open questions for the native pass

The chain continues from **104**, the last number in `docs/93-en-ko-L4-brief-decisions.md` and this
document taken together. Nothing above 104 existed before this wave, and nothing already numbered is
renumbered.

105. **`son-eul ssiseoyo` with no possessor** (M6-S01). The note says Korean leaves the owner out
     because whose hands is obvious. Confirm that 밥을 먹기 전에 손을 씻어요 is what is actually said,
     and that adding 제 손을 would sound odd rather than merely redundant.

106. **`deureoyo` against L2-M6's `deullyeoyo`** (M6-S03). The note splits them as *you listening*
     against *a sound reaching you*. Confirm 음악을 들어요 is the natural collocation for listening to
     music while doing something else, and that the two verbs are as cleanly separated as the note
     claims.

107. **`-(eu)myeonseo` and the same-subject rule as an absolute** (M6-S05, rule 2). The module states
     it as a hard rule and its mistake plate breaks it with two subjects. Confirm there is no ordinary
     spoken register in which a different subject is tolerated, because the plate teaches that it is
     always wrong.

108. **`kkeunnal` for 끝날** (M6-S06). Written per the assimilation law that gives `masinneun` and
     `meongneun`, against the revised-romanization `kkeutnal`. Confirm the spelling, and rule on
     whether the same law should have produced `itseumnida` rather than the `isseumnida` the M7 brief
     specified — the two cannot both be right, and only the gate can settle which one the course keeps.

109. **`sip nyeon` across a space** (M6-S09). 십 년 is said [심 년], and the assimilation law writes
     nasalisation. This course writes it `sip nyeon` because the assimilation crosses a whitespace
     boundary and no shipped surface does that. Confirm, or rule that counters written after a Sino
     number must be joined and assimilated.

110. **`beolsseo` as always carrying surprise** (M6-S07). The trap says a flat English *already* is
     not what the word does. Confirm 벌써 always adds *so soon?*, and that a neutral report of
     completion would use something else.

111. **`gidaryeojusipsio` written joined** (M7-S01). The course keeps the `-a/eo juda` auxiliary joined
     from L2-M1 on, so this is one token where standard orthography writes 기다려 주십시오. Confirm the
     learner is not being taught a spelling they will never see on a sign.

112. **`dochakhamnida` and `chulbalhamnida`** (M7-S06, S07). Aspiration across the `hada` boundary is
     written as consonant plus `h`, following L2-M8's `mothaesseoyo`, rather than as the single
     aspirated sound the `sound` line describes. Confirm the convention holds for Sino-Korean noun
     plus 하다 as well as for 못하다.

113. **`osimnida` as the shape a learner should recognise** (M7-S08). Confirm 사장님께서 지금
     오십니다 is what an assistant says to a waiting visitor, and that `-si-` is genuinely obligatory
     once `-kkeseo` has marked the subject — the mistake plate treats dropping it as a contradiction
     rather than as a lesser register.

114. **The `-eotdeon` cluster** (M8-S04, S05, S10; the M8 brief names this explicitly as a gate
     question). The wave ships `gatdeon`, `ilhaetdeon` and `saratdeon`. The competing spellings are
     `gatteon` / `ilhaetteon` / `saratteon`, which write the tensing this course writes elsewhere only
     in `jochi` and `gwallibi`. Settle the cluster, and settle it for L5 at the same time.

115. **`gagon haesseoyo` against a bare past for a childhood habit** (M8-S01, S06, S08). Three of ten
     sentences use the frame. Confirm it is not literary or dated in speech, and that 어릴 때 매일
     학교에 가곤 했어요 is what an ordinary speaker says rather than 어릴 때 매일 학교에 갔어요.

116. **`rago` set off as its own word after a closing quotation mark** (M10, five displays, rule 2).
     The romanization and the Hangul line disagree on spacing here and nowhere else in the course.
     Confirm the Hangul 라고 joined to the quote is right, and rule on whether the romanization should
     match it — which would cost the course L3-M5's `rago` surface and mint a new key per quotation.

117. **`algo boni` indexed whole, and always on a present** (M10-S02, S04, S06, S07). Confirm 알고
     보니 is a fixed two-word discovery marker rather than a transparent 알고 + 보니, and confirm the
     present-tense landing in S04, S06 and S07 — 집에 사과가 많이 있어요 — is right, because the wave
     teaches that as the frame's normal shape.

118. **A quoted announcement as the only formal level inside a story** (M10-S08, rule 6). Confirm that
     안내 방송이 "…합니다"라고 했어요 is how a speaker reports a public announcement, and that
     attributing the quote to the 방송 rather than to a person is natural.

119. **`chajasseoyo` for searching rather than finding** (M10-S07). The note says 찾다 covers both and
     the story decides. Confirm 먼저 회사에서 찾았어요 reads as *I looked there* and not as *I found it
     there*, because the whole item turns on it.

120. **`nollasseoyo` beside `deullyeosseoyo`** (M10-S05). The plate marks the correct 큰 소리를
     들었어요 as the English sentence rather than as an error. Confirm that a Korean telling this story
     would put the sound in the subject slot, and that the plate is a fair thing to show a learner as
     wrong-for-the-story rather than wrong.
