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
