# LLM review — en-ko L5-M1 and L5-M2

This is the first authoring wave of en-ko's fifth level: `L5-M1` *Sayings and idioms* and `L5-M2`
*Humour and teasing*, the level's RANGE modules (#580). Both were written against the **emitted
index at `public/content/en-ko/index/`, folded to `L4-M10` — 1104 surfaces over 40 modules, with
`maxSpan: 2`** — read only through `npm run content:owner` and `npm run content:shown`, never by
grep and never by reading a shipped module whole. Every ownership claim quoted below is a line
`content:owner` actually printed on 2026-09-08, not a claim copied out of the brief; where the two
disagreed, the emitted index won and the disagreement is written down in [§3](#3-the-brief-seams-i-had-to-correct).

No file below L5 was touched, no other course was touched, and no build was run: `public/content/`
is shared with eight sibling waves and the strict build is the parent's.

## 1. What was authored

### L5-M1 — Sayings and idioms

*The figurative everyday, and when it is used.* Ten sentences, 8 rules, 13 new rows, pool of 12,
`prerequisites: []` (it opens the level).

| # | Display | What it teaches |
|---|---|---|
| S01 | `Je chingu-neun nun-i nopayo.` | The body-part frame, first contact: a body part + `-i/-ga` + an ordinary adjective, meaning nothing a learner could compute. |
| S02 | `Nun-i nopayoraneun mal-i isseoyo.` | The CITATION frame `-raneun mal-i isseoyo`, *there is a saying that* — `-raneun` written straight onto the saying. |
| S03 | `Geu mal-eun kkadaroweoyoraneun tteus-ieyo.` | The GLOSS frame `-raneun tteus-ieyo`, *it means that* — what a Korean speaker actually says when asked. |
| S04 | `Eomeoni-neun son-i keoyo.` | The second saying, and the interference rule: English has a big *heart*, Korean a big *hand*. |
| S05 | `Son-i keoyoraneun mal-eun neogeureowoyoraneun tteus-ieyo.` | Both frames in one sentence — the saying defined and the gloss defining it, each marked. |
| S06 | `Sajangnim-eun bal-i neolbeoyo.` | The third saying: wide feet, wide circle. |
| S07 | `Bal-i neolbeoseo chingu-ga manhi isseoyo.` | The `-aseo` frame, and the law that the saying bends at its LAST word only. |
| S08 | `Igeo-neun ip-e majayo?` | The fourth saying, and the one built on `-e` rather than `-i/-ga`; the particle is part of the fixed phrase. |
| S09 | `Sokdam-eun jjalbeun biyu-yeyo.` | `sokdam` and `biyu` — naming the category, and the two-word ceiling on what is learned whole. |
| S10 | `Eoreun-hante sokdam-eul malhamyeon an dwaeyo.` | The when-not-to the job names: a saying carries its listener with it, and it does not go upward. |

New rows: `nun-i nopayo`, `mal-i isseoyo`, `kkadaroweoyo`, `tteus-ieyo`, `son-i keoyo`,
`neogeureowoyo`, `bal-i neolbeoyo`, `manhi`, `ip-e majayo`, `sokdam`, `biyu`, `eoreun`, `malhaeyo`.

### L5-M2 — Humour and teasing

*Banter, irony, and when not to.* Ten sentences, 8 rules, 13 new rows, pool of 12,
`prerequisites: ["L5-M1"]`.

| # | Display | What it teaches |
|---|---|---|
| S01 | `Oneul sukje-ga eopseoyo. Nongdam-ieyo.` | The DISCLAIMER as a full sentence placed after the remark — the module's carrier. |
| S02 | `Eoje neomu bappaseo jugeul ppeonhaesseoyo.` | `-(eu)l ppeonhaesseoyo`, L4-M3's homeless deferral, landing here as hyperbole rather than as a near miss. |
| S03 | `Oneul gyeou jip-e wasseoyo.` | `gyeou`, *barely* — the half of the pair that says the thing DID happen. |
| S04 | `Geu iyagi-neun jinjja utgyeoyo.` | `utgyeoyo` about the thing, and `iyagi`, what a joke arrives inside. |
| S05 | `Chingu-ga neomu utgyeoseo jeongmal manhi useoyo.` | `useoyo` about the person, against `utgyeoyo` about the thing; both in their `-aseo` form. |
| S06 | `Jinjja daebak-ieyo. Wanjeon utgyeoyo.` | The amplifiers `daebak` and `wanjeon`, and the fact that `daebak` still takes its copula in `-yo` speech. |
| S07 | `Je chingu-neun jinjja jaemiisseoyo.` | `jinjja` and `jaemiisseoyo` — good company, which is not the same as funny. |
| S08 | `Oneul sihum itjanayo. Jangnan-ieyo.` | L4-M4's `-janayo` used as the tease: an invention presented as common knowledge, then withdrawn. |
| S09 | `Eoreun-hante jangnan-eul hamyeon an dwaeyo.` | The when-not-to: Korean teasing runs downward or sideways, and no disclaimer repairs an upward one. |
| S10 | `Geu nongdam-eun jaemi-ga eopseoyo.` | `jaemi`, and the verdict on a flat joke — milder in Korean than its English translation sounds. |

New rows: `nongdam`, `jugeul ppeonhaesseoyo`, `gyeou`, `iyagi`, `utgyeoyo`, `useoyo`, `daebak`,
`wanjeon`, `jinjja`, `jaemiisseoyo`, `sihum`, `jangnan`, `jaemi`.

## 2. What the briefs got right, checked rather than assumed

Confirmed verbatim against `content:owner`, because a brief seam that happens to be true is still
only true until someone checks it:

- **The five whole idiom keys.** `nun-i nopayo · son-i keoyo · bal-i neolbeoyo · ip-e majayo ·
  mal-i isseoyo` all printed `free`, with parts exactly as the brief claimed:
  `nun → L2-M2`, `son → L2-M5`, `i → L1-M1`, `e → L1-M4`, `mal → L3-M5`, and `bal → free`,
  `ip → free`. The longest-match walk therefore hands a learner the *fussiness* note, never
  L2-M2's note about eyes.
- **`mal` is L3-M5 and that is CORRECT here.** The brief's most interesting claim — the same key
  that barred L4-M3's prohibitive is the right one for a citation frame — holds. My row is the
  whole `mal-i isseoyo`, free, so L3-M5's word row is pointed back at honestly and never opened
  by mistake.
- **The span law.** The fold's `maxSpan` is 2 and it holds exactly ten two-token surfaces:
  `algo boni · an dwaeyo · annyeonghi gyeseyo · eoya dwaeyo · gaya dwaeyo · geot gatayo ·
  geu daeum-e · go isseoyo · jal meogeosseumnida · mannaseo bangapseumnida`. Every surface these
  two modules add is one or two tokens, so `maxSpan` stays 2 and no three-token proverb was
  smuggled in. `sigeun juk meokgi` stays barred, as note 4 asked.
- **`raneun` is free and stays free.** `content:owner` printed `raneun  free`. Every `-raneun`
  surface here ships ATTACHED and hyphenless — `nun-i nopayoraneun`, `son-i keoyoraneun`,
  `ip-e majayoraneun`, `kkadaroweoyoraneun`, `neogeureowoyoraneun` — and because
  `surfaceIndexKeys` splits on hyphens only, none of them donates a bare `raneun` key. L1-M9's
  `eoseo` and L3-M9's `-deon` do not happen a third time.
- **The `jaemi` surprise.** `jaemi  free` and `jaemiisseoyo  free`, after forty modules. The brief
  was right that this course has never taught fun, and the new-word budget carries both.
- **The fold itself.** `1104 surfaces owned, folded over 40 modules through L4-M10` — the "forty-
  module fold" both briefs write against is the real one.

## 3. The brief seams I had to correct

### 3.1 `janayo` is FREE, not L4-M4's — and the brief's own advice is what saves it

L5-M2 note 5 says: *"janayo is L4-M4's and is written as itjanayo or jochanayo, never bare."*
`content:owner` says something different about the first half:

```
janayo      free
itjanayo    L4-M4
jochanayo   L4-M4
```

L4-M4 owns the two ATTACHED surfaces. The bare key was never minted, because neither of them
carries a hyphen and a hyphenless whitespace token donates nothing. So writing `janayo` bare in a
display or a `forms` array would not have re-taught an owned surface — it would have MINTED a new
bare ending key, which is precisely the `-deon` accident `docs/76` §4 said could never happen. The
brief's instruction is right and its ownership claim is wrong, and the instruction is right *for a
different reason than the one it gives*. S08 uses `itjanayo` and nothing else.

### 3.2 `ppeonhaesseoyo` is kept out of the index by the SPACE, not by attachment

Same note calls `ppeonhaesseoyo` an ending that *"rides an attached stem (jugeul, neomeojil)"*.
It does not ride anything attached: `jugeul ppeonhaesseoyo` is two whitespace tokens.

```
jugeul                       free
ppeonhaesseoyo               free
jugeul ppeonhaesseoyo        free
neomeojil ppeonhaesseoyo     free
useul ppeonhaesseoyo         free
```

What keeps the bare ending out of the fold is that `surfaceIndexKeys` splits on hyphens and never
on spaces, so a two-token surface donates neither half — `jugeul` stays free too. The outcome the
brief wanted is the one shipped (one row, three span-2 forms, no bare `ppeonhaesseoyo` key), but an
author who believed the stated mechanism and wrote `jugeul-ppeonhaesseoyo` with a hyphen would have
minted both halves in one stroke.

### 3.3 The `useoyo` paradigm ships with a HOLE at the past

L5-M2 note 5 lists `useoyo` under *"Fresh, and every one verified free"*. The word is; its past is
not:

```
useoyo        free
useosseoyo    L4-M10
utgyeoyo      free
utgyeoseo     free
utgyeosseoyo  free
```

`useosseoyo` is L4-M10's, so the `useoyo` row ships `["useoyo", "useoseo"]` and stops — the third
cell is deliberately missing, exactly as en-it's L4-M3 had to leave `sarebbe` out of `sarei`'s
paradigm. `utgyeoyo`'s own past is free, so that row carries all three. A complete-looking
`useoyo` paradigm would have been an unreachable row, not a generosity.

### 3.4 The "fresh" list for L5-M1 mixes rows with hyphen donations

L5-M1 note 5 lists *"sokdam, bal, ip, nopayo, neolbeoyo, tteus, tteus-ieyo, biyu"* as fresh. All
eight printed `free`, so the list is true about the index — but it is not a list of rows, and
reading it as one produces collisions:

- **`bal` and `ip` get minted with no row of their own.** `bal-i neolbeoyo` donates `bal` and `i`;
  `ip-e majayo` donates `ip` and `e`. A separate bare `bal` row placed after the idiom row would
  have opened a key the idiom row already earned, and `check-shown` would have called it
  `COLLIDES INSIDE THIS MODULE`. Both words reach the fold pointing at the saying that teaches
  them, which is the right destination anyway: the module exists to stop a learner computing the
  saying from its parts.
- **`nopayo` and `neolbeoyo` are NOT minted at all**, by anybody, and stay free after this wave —
  a whitespace token is never split, so `nun-i nopayo` earns `nun` and `i` and never `nopayo`.
  The brief's word "fresh" is accurate and its implication that the module buys them is not.
- **`tteus` IS minted**, as the hyphen part of the `tteus-ieyo` row, so no bare `tteus` row is
  needed and none was written.

### 3.5 `biyu` takes `-yeyo`, not `-ieyo`

The brief writes `tteus`, `tteus-ieyo`, `biyu` in one breath. `biyu` ends in a vowel, so the
copula contracts:

```
biyu-yeyo   free   [parts: biyu → free, yeyo → L1-M1]
biyu-ieyo   free   [parts: biyu → free, ieyo → L1-M1]
```

Both keys are available, which is exactly the danger — the index would have accepted the wrong
Korean silently. S09 ships `biyu-yeyo` and the sentence's `mistake` plate is `biyu-ieyo`, so the
contraction is taught rather than merely obeyed.

### 3.6 `mal-eun` and `mal-i` are L3-M5's; `mal-eul` is not

```
mal-eun   L3-M5
mal-i     L3-M5
mal-eul   free
```

The gloss frame's `Geu mal-eun …` and the citation frame's `… mal-i isseoyo` both ride L3-M5 and
cost nothing. `mal-eul` would have been a mint, so no sentence writes it; S10 reaches for
`sokdam-eul` instead, which is a form on this module's own `sokdam` row.

### 3.7 `manhi` is free after forty modules

Not a brief claim, but the seam the sentences actually rested on. `content:owner` prints
`manayo  L1-M9` and `manhi  free`: this course has taught *there are many* for four levels and
never the adverb *a lot*. L5-M1 mints it in S07, and L5-M2 leans on it twice (S05, and pool item
C09) across the level boundary.

### 3.8 `hante` enters the fold as a donation

`eoreun-hante  free  [parts: eoreun → free, hante → free]`. The L5-M1 `eoreun` row therefore mints
both `eoreun` and the bare particle key `hante`, under the #373 decision that a host row donates
its particle keys. That is accepted rather than worked around, as `src/course/types.test.ts`'s case
comment says it should be — Korean never writes `hante` as its own whitespace token, and no display
in either module does.

## 4. The ratchet

`npx vitest run tools/shown-surfaces.test.ts` → **11 passed (11)**. en-ko's baseline is 12 and is
**unchanged**: no baseline was raised, and none was lowered, because neither new module contributed
a finding. `npm run content:shown` reports both modules `clean — every shown surface resolves`,
with **no `RE-TEACH` line and no `COLLIDES INSIDE THIS MODULE` line on either**.

That is not luck; it is three constraints held while writing:

1. **Every sentence display, every `variations[].display` and every pool item is built only from
   surfaces `content:owner` had already placed, or from a row/`forms` entry inside these two
   modules.** `mistake.display` is the one exempt slot (#491) and is the only place deliberately
   wrong Korean appears — `nun-i keoyo`, `biyu-ieyo`, `jaemi isseoyo`, `bappasseumyeon`.
2. **A row appears in exactly one sentence.** `check-shown`'s collision test is note equality, so
   two rows on one key with two notes is a defect; none was written, and no deliberate repeat was
   needed.
3. **Within a sentence, a donating row is ordered after any row that opens what it donates** — the
   reason `sokdam` precedes `biyu` in S09's word list and `eoreun` precedes `malhaeyo` in S10's.

## 5. Verification

- `npm run content:validate` → `CONTENT 378/378 ok`. The denominator climbs while eight sibling
  waves land in the same checkout — it read `CONTENT 376/376 ok` earlier in this pass — but it has
  been `n/n` at every reading.
- `npm run content:shown -- en-ko L5-M1` → `L5-M1: clean — every shown surface resolves`
- `npm run content:shown -- en-ko L5-M2` → `L5-M2: clean — every shown surface resolves`
- `npx vitest run tools/shown-surfaces.test.ts` → `Tests  11 passed (11)`
- `npx vitest run src/course/types.test.ts` → `Tests  399 passed (399)`. Mid-pass this file was red
  on the module census alone (`finds all 375 …`), which is the parent's counter and moved as the
  waves landed; every other assertion was green throughout, including the en-ko decisions case —
  no Hangul outside `script`, pure-ASCII romanization, no bare particle as its own whitespace
  token, no plain-style pronoun, and a `script` line on every sentence, word, variation, mistake
  plate and pool item.

No build was run. `public/content/` is untouched.

## 6. Open questions for the native-speaker gate

Continuing the chain in `docs/111-en-ko-L5-brief-decisions.md`, whose last numbered question is 152.
Nothing above is renumbered. **The native-speaker bar is not met by anything in this document** —
an LLM pass cleared these modules to ship and nothing more.

153. **`-yo` form + `-raneun` as a citation frame** (M1). The largest single risk in the wave.
     `nun-i nopayoraneun mal-i isseoyo` quotes the polite form and hangs `-raneun` straight on it.
     A speaker may prefer the plain `nun-i nopdaneun mal-i isseoyo`, which this course cannot write
     without opening the plain style. Confirm the `-yo`-form citation is heard as ordinary speech
     rather than as a learner's workaround; if it is not, the frame has to move or the level has to
     buy `-daneun`.

154. **The same question for the gloss frame** (M1, S03/S05). `kkadaroweoyoraneun tteus-ieyo` and
     `neogeureowoyoraneun tteus-ieyo`. Confirm a speaker glosses a saying this way in conversation,
     and name what they would actually say if not.

155. **Writing `-raneun` with no quotation marks** (M1). L4-M10 sets `-rago` off after a closing
     quote; this module joins `-raneun` to the saying with nothing between. Confirm that is the
     ordinary orthography for the citation frame, and that a learner reading the romanization aloud
     lands on the right prosody with no pause marked.

156. **The four sayings, one at a time** (M1). Confirm each is current, and that its gloss is the
     one a speaker would give: `nun-i nopayo` = picky about people or things; `son-i keoyo` =
     generous, open-handed; `bal-i neolbeoyo` = knows everybody; `ip-e majayo` = suits my taste,
     of food only. Flag any that is dated, regional, or carries a sting the note does not name.

157. **`ip-e majayo` as a question to a guest** (M1, S08). Confirm `Igeo-neun ip-e majayo?` is
     what a host actually asks at the table, and not a phrase only ever heard in the answer.

158. **Is the elder rule too strong?** (M1, S10 and M2, S09). Both modules end on a flat
     prohibition — `eoreun-hante … hamyeon an dwaeyo`. Confirm the pragmatic fact (a `sokdam`
     quoted upward reads as lecturing; a tease aimed upward is not funny) and rule on whether a
     course should state it as a prohibition at all, or as a strong default with named exceptions.

159. **`sokdam` for what this module teaches** (M1, S09). These four are `gwanyongeo`, idioms,
     rather than `sokdam`, proverbs, in the strict classification. Confirm whether calling them
     `sokdam` in a beginner's course is acceptable shorthand or a mislabel worth a second noun.

160. **`neogeureowoyo` and `kkadaroweoyo` as the plain glosses** (M1). Confirm these are the words
     a speaker would reach for when asked what the sayings mean, and that `neogeureowoyo` really
     is said of a person's temperament rather than of an act.

161. **`jugeul ppeonhaesseoyo` as comedy** (M2, S02). The brief's gift — the same figure as English
     *I nearly died*. Confirm it is comic far more often than literal in everyday speech, and that
     `neomu bappaseo jugeul ppeonhaesseoyo` reads as a joke and not as an alarming report.

162. **`gyeou` against `ppeonhaesseoyo`** (M2, S03). Confirm `Oneul gyeou jip-e wasseoyo` is the
     natural way to say *I only just got home*, and that `gyeou` is not heard as complaint.

163. **The amplifier register** (M2, S06/S07). `jinjja`, `wanjeon`, `daebak` are written here in
     `-yo` speech with a copula (`daebak-ieyo`). Confirm that combination is real rather than a
     compromise the course invented to avoid banmal, and rule on whether `wanjeon` in front of a
     `-yo` verb is acceptable or reads as slang bolted to polite speech.

164. **`utgyeoyo` / `useoyo` / `jaemiisseoyo` as a three-way split** (M2, S04/S05/S07). Confirm the
     module's rule: the thing is `utgyeoyo`, the person `useoyo`, and a person who is good company
     `jaemiisseoyo`. Flag whether `utgyeoyo` said of a person is merely *ridiculous*, as the trap
     claims, or is ordinary praise.

165. **`jaemi-ga eopseoyo` as a mild verdict** (M2, S10). The note claims it is gentler than the
     English *that joke isn't funny*. Confirm, and say what the harsher Korean would be, so a
     later module can teach the difference rather than leaving a learner to discover it.

166. **The hole this module could not fill: banmal.** Real teasing lives in the plain style and
     this course does not speak it. `docs/111` records it as a hole rather than letting M2 pretend
     otherwise. Confirm that a `-yo`-only tease is still recognisable as a tease to a Korean ear,
     or say plainly that the module teaches the disclaimer and not the humour.

## Wave 2 — L5-M3, L5-M4 and L5-M5 (#589)

The second authoring wave of en-ko's fifth level: `L5-M3` *How they say it there*, `L5-M4` *Formal
occasions* and `L5-M5` *Big questions*. Written against the **emitted index at
`public/content/en-ko/index/`, folded to `L5-M2` — 1170 surfaces over 42 modules, with
`maxSpan: 2`** — read only through `npm run content:owner` and `npm run content:shown`, never by
grep and never by reading a shipped module whole. Every ownership claim below is a line
`content:owner` printed on 2026-09-08.

That fold is itself the first correction. All three briefs were written when the deepest index was
`L4-M10` (1104 surfaces over 40 modules, as [§1](#1-what-was-authored) of wave 1 records). Wave 1
added two modules and 66 surfaces, and one of the words the L5-M3 brief lists as "fresh and
verified free" is now owned — see [§W2.1](#w21-eoreun-is-l5-m1s-the-brief-was-written-one-wave-too-early).

No file below L5 was touched, no other course was touched, and no build was run: `public/content/`
is shared with eight sibling waves and the strict build is the parent's.

### L5-M3 — How they say it there

*Regional and generational speech; what marks an outsider.* Ten sentences, 8 rules, 20 new rows,
pool of 12, `prerequisites: ["L5-M2"]`, `exitTest` 1 generate / **3** comprehend — the only ratio
in the level that is not 1/2, because half this module's payload is recognition.

| # | Display | What it teaches |
|---|---|---|
| S01 | `Seoul-eseo-neun pyojunmal-eul malhaeyo. Busan-eseo-neun satuori-reul malhaeyo.` | The module's premise said out loud for the first time: the course has been teaching ONE Korean, and it has a name. |
| S02 | `Jibang-eseo-neun mal-i jeongmal dallayo.` | `jibang`, everywhere that is not Seoul — and the first southern shape, `masisseoye`, taught as a row and shown only in the pool. |
| S03 | `Satuori-neun mokssori-do jeongmal dallayo.` | A dialect is not only its words. `mokssori` for the human voice, kept clear of L4-M2's `sori`. |
| S04 | `I-ge jeongmal masinneyo!` | The two production halves at once: `-neyo`, the ending of something just noticed, and `i-ge`, the contraction every speaker uses. |
| S05 | `Yoseum nalssi-ga jeongmal chumneyo.` | `-neyo` in the safest sentence in Korean small talk, and `yoseum`, the window a generational remark opens with. |
| S06 | `Seonbae-nim, yeogi jeongmal masitjyo?` | `-jyo`, the tag that INVITES agreement, against L4-M4's `-janayo`, which tells the listener they already agree. |
| S07 | `Hubae-do satuori-reul sseoyo, geureochyo?` | `hubae` completing the one new pair of address, and `geureochyo` — `-jyo` standing alone as a whole tag. |
| S08 | `Dangsin-eun joeun mal-i anieyo.` | The loudest textbook mistake in the language, stopped by naming it. The only sentence in the course whose job is to prevent a word being said. |
| S09 | `Yoseum jeolmeun saram-eun pyojunmal-eul jal haeyo.` | The generational observation, and `jeolmeun` as a modifier that cannot stand without its noun. |
| S10 | `Geureochyo? Ne, manneyo.` | Both endings in one exchange, in the only order they work in: `-jyo` asks, `-neyo` answers. |

New rows: `satuori`, `pyojunmal`, `Seoul`, `Busan`, `jibang`, `masisseoye`, `mokssori`, `eoksuro`,
`i-ge`, `masinneyo`, `yoseum`, `geurayo`, `seonbae`, `masitjyo`, `hubae`, `geureochyo`, `dangsin`,
`geosigi`, `jeolmeun saram`, `manneyo`.

**The production/comprehension split is carried by WHERE a row is shown, not by anything in the
schema.** The four dialect rows — `masisseoye` (with `geuraeye` and `joaye` in its forms),
`eoksuro`, `geurayo`, `geosigi` — appear in the comprehension pool and in **no sentence display,
no variation and no mistake plate**. Every other row appears in its own sentence. That is the
mechanism by which the brief's "recognition only — no sentence slot asks them to produce one" is
enforced, and it is worth naming because nothing in `validate.ts` or `check-shown.ts` would have
noticed if it had been broken.

### L5-M4 — Formal occasions

*Toasts, speeches, condolences, ceremonies.* Ten sentences, 8 rules, 21 new rows, pool of 12,
`prerequisites: ["L5-M3"]`. Every sentence is `register: "formal"` — the only module in the course
where that chip is on all ten.

| # | Display | What it teaches |
|---|---|---|
| S01 | `Gyeolhon-eul chukhahamnida.` | The congratulation, with its occasion named in front of it, because `chukhahamnida` does not stretch the way *congratulations* does. |
| S02 | `Geonbae! Gyeolhon-eul wihayeo!` | The whole Korean toast: a shout, a noun with its object particle, `wihayeo`, and then everybody drinks. |
| S03 | `Saehae bok mani badeuseyo.` | The calendar greeting, spending only `saehae` and `bok` — `mani` and `badeuseyo` are L2-M5's already. |
| S04 | `Samga goin-ui myeongbog-eul bimnida.` | The condolence, recited whole. Four rows, one sentence, and a rule saying it is never built from parts. |
| S05 | `Sangsim-i keusigetseumnida.` | The second condolence formula, and the ending that GUESSES at another person's feeling rather than asserting it. |
| S06 | `Jangnyesik-eseo-neun geureoke malhamnida.` | `-(seu)pnida` produced on an ordinary verb, and the module's law restated: at a funeral, *that* is what you say. |
| S07 | `Sonnim yeoreobun, jamsi gidaryeo jusipsio.` | `jusipsio` — L1-M3's `juseyo` raised to the register a room asks for — riding on the `-eo` stem. |
| S08 | `Sillyehamnida. Chuksa-reul hamnida.` | `sillyehamnida` asking for the floor, kept clear of L2-M1's `joesonghamnida`, which admits a fault. |
| S09 | `Sonnim yeoreobun, hwanyeonghamnida.` | The welcome a host gives a ROOM — and the brief's `eoseo osipsio` trap sidestepped entirely rather than survived. |
| S10 | `Yeoreobun, uri-reul wihayeo geonbae!` | The `N-eul/reul wihayeo` frame the other way round, and the interference rule: a Korean toast never grows a sentence in the middle. |

New rows: `gyeolhon`, `chukhahamnida`, `geonbae`, `wihayeo`, `saehae`, `bok`, `samga`, `goin`,
`myeongbok`, `bimnida`, `sangsim`, `keusigetseumnida`, `jangnyesik`, `malhamnida`, `sonnim`,
`gidaryeo`, `jusipsio`, `sillyehamnida`, `chuksa`, `hwanyeonghamnida`, `uri`.

### L5-M5 — Big questions

*Values, beliefs, abstract talk.* Ten sentences, 8 rules, 16 new rows, pool of 12,
`prerequisites: ["L5-M4"]`.

| # | Display | What it teaches |
|---|---|---|
| S01 | `Haengbog-i jeongmal jungyohaeyo.` | The predicate every big question ends on, and the first abstract noun — with the `k → g` softening the romanization has to write. |
| S02 | `Hanguk-e saneun geo-ga jaemiisseoyo.` | The module's whole move: a clause made into a thing by `V-neun geo`, which then takes an ordinary particle. |
| S03 | `Jayuraneun geo-seun jeongmal jungyohaeyo.` | The DEFINITION frame `N-(i)raneun geo-seun`, written with no hyphen on `-raneun`, exactly as L5-M1 writes it. |
| S04 | `Saram-mada gachigwan-i dallayo.` | `saram-mada` — each person, not *some people* — and `gachigwan`, the word the `gachi` collision forces and which is the better one anyway. |
| S05 | `Insaeng-eun jjalbeun kkum-ieyo.` | The back-to-front build: the modifier is decided before the noun it modifies is reached. |
| S06 | `Jeo-neun uimi-ga jungyohadago saenggakhaeyo.` | The reported belief, `-dago` on the stem, against L3-M5's `-rago`, which quotes the words. |
| S07 | `Jeo-neun chingu-reul mideoyo.` | One Korean verb for English *trust* and *believe*; the object is what decides which one a translation needs. |
| S08 | `Mideum-eun saram-mada dallayo.` | The noun made from the verb, and the frame reused: this module names the shape and leaves the content out. |
| S09 | `Sesang-i byeonhaneun geo-reul mideoyo.` | A full clause nominalised as an OBJECT, with the believing verb arriving last. |
| S10 | `Geu jilmun-e jeongdab-eun eopseoyo.` | Where the module stops: a question that has no right answer, which is not the same as refusing to answer it. |

New rows: `haengbok`, `jungyohaeyo`, `saneun`, `jayu`, `geo-seun`, `saram-mada`, `gachigwan`,
`insaeng`, `kkum`, `uimi`, `mideoyo`, `mideum`, `sesang`, `byeonhaneun`, `jilmun`, `jeongdap`.

### The brief seams I had to correct

#### W2.1 `eoreun` is L5-M1's; the brief was written one wave too early

L5-M3's brief §5 lists `eoreun` among the surfaces that are "fresh and verified free". It is not:

```
eoreun	L5-M1
```

L5-M1 minted it as a row in wave 1 ([§1](#1-what-was-authored) lists it), and the brief was written
against the fold through `L4-M10`. No row is minted for it here; the word simply resolves in a
display if one needs it. Everything else in the brief's fresh list checked out free — `satuori`,
`jibang`, `seoul`, `busan`, `dangsin`, `jeolmeun`, `yoseum`, `seonbae`, `hubae`, `mokssori`,
`pyojunmal`, and `neyo`/`jyo` — and the rest of the M3 seam's *owned* claims were all confirmed
verbatim: `geuraeyo L2-M6`, `jeongmal/hangsang/gakkeum/jaju L3-M1`, `geureonde/geunde L1-M10`,
`sori L4-M2`, and the address inventory it says is already bought:

```
eonni	L2-M2      hyeong	L2-M2      nuna	L2-M2      oppa	L2-M2
seonsaengnim	L1-M1      chingu	L1-M1      saram	L1-M1
```

#### W2.2 `i-ge` is free as a WHOLE KEY, and the brief's phrasing hides that

The brief says "`i-ge` resolves through `i` at L1-M1 and `ge` at L3-M4". What `content:owner` prints is:

```
i-ge	free   [parts: i → L1-M1, ge → L3-M4]
```

The parts are owned and **the whole key is not**, and `matchSurfaces` never falls back to the parts
of a token it is scanning: a display writing `I-ge` needs the key `i-ge` itself. Taking the brief at
its word would have left `L5-M3-S04` shown-but-untaught. `i-ge` therefore earns a row, and that row
ships with a **hole** where the paradigm cell an earlier module owns would go —

```
igeo	L4-M1
```

— so `forms` is `["i-ge"]` alone. This is en-it's `sarei`/`sarebbe` case in a different alphabet:
the complete-looking paradigm would have swallowed L4-M1's cell.

#### W2.3 `joeuneyo` is not how `좋네요` is said

The brief's §5 names "the attached `joeuneyo-`, `masinneyo-`, `chumneyo-` and `geureochyo-`class
forms". Three of the four are right. The `-neyo` form of *good* is not `joeuneyo`: the course's own
orthography law says assimilation is WRITTEN because the romanization is how it is said (`masinneun`,
`jochi`, `gwallibi`), and `좋네요` is said `jonneyo`. `content:owner` was no help either way —

```
joeuneyo	free
jonneyo	free
```

— so nothing in the index forced the choice and the law had to. The module ships `jonneyo`, in
`masinneyo`'s forms beside `chumneyo`. The same law is what produced `masitjyo`, `jochyo`,
`geureochyo` and `manneyo` (`맞네요` → `manneyo`), all four confirmed free.

#### W2.4 The ending discipline held, and one bare suffix was minted anyway

The brief's orthography ruling is that `neyo` and `jyo` "MUST STAY FREE — written attached, never
hyphenated, never listed bare in a `forms` array". They do:

```
neyo	free      jyo	free
```

and no row or form in any of the three modules writes either bare. But a `forms` array mints index
keys through its HYPHEN PARTS as well as whole, and walking every row and form of the three modules
through `surfaceIndexKeys` shows exactly seven keys entering the fold that way and no other route:

| Minted by donation | From | Class |
|---|---|---|
| `nim` | `seonbae-nim` (M3) | bare honorific suffix |
| `ui` | `goin-ui` (M4) | bare genitive particle |
| `mada` | `saram-mada` (M5) | bare particle — the brief said "minted here", and this is how |
| `seun` | `geo-seun` (M5) | bare fragment |
| `myeongbog`, `haengbog`, `jeongdab` | `myeongbog-eul`, `haengbog-i`, `jeongdab-eun` | liaison stems, harmless |

The first four are the `-deon` / `-eoseo` accident class the course keeps meeting, and all four are
unavoidable: the display has to write the attached form, so the row has to own it, so the part is
donated. This is `hante`'s route in wave 1 ([§3.8](#38-hante-enters-the-fold-as-a-donation)),
recorded rather than avoided. None of them is a key a learner can tap, because Korean never writes
any of the four as its own whitespace token and no display in these modules does.

#### W2.5 `eoseo` confirmed — and the trap sidestepped rather than survived

L5-M4's brief warns that the doorway welcome `eoseo osipsio` must not be written. Confirmed:

```
eoseo	L1-M9
```

`eoseo` really is the CAUSAL ending, minted by L1-M9's `-aseo` row listing `-eoseo` bare in its
forms. The module does not write a careful near-miss; it uses a different word altogether,
`hwanyeonghamnida` (free), which is the welcome given to a ROOM and is what the occasion actually
wants. The trap costs nothing when the sentence is chosen to avoid it.

#### W2.6 `chukhahamnida` takes its occasion — but `saengil` takes no particle

The brief's rule that "every row must carry the OCCASION and not merely the gloss" is right, and
the shown-surface check taught us its limit. `Saengil-eul chukhahamnida` was the first draft of
S01's variation, and it came back `SHOWN-BUT-UNTAUGHT ... saengil-eul`: `saengil` is L3-M9's, no
row here owns it, and so no row here could mint its attached form. That forced the fixed phrase —
`생일 축하합니다`, which really is said with no particle at all, beside `결혼을 축하합니다`, which
takes one. The check pushed the module onto the idiomatic form, and the asymmetry is now what the
variation's `changed` line says.

#### W2.7 L5-M4's `-mnida` gate is genuinely already lifted

The brief says to expect no test change, and it is right for the reason it gives. In
`src/course/types.test.ts` the guard reads `const frozenLevel = /^L[123]-/.test(module.id)`, so a
`-mnida` form on an L4 or L5 display is content rather than a style slip. Ten displays here carry
one and the en-ko case is green. The reuse claim holds too:

```
hamnida	L4-M7      imnida	L4-M7      yeoreobun	L4-M7      pyo	L4-M7      jamsi	L4-M7
```

so S06's `malhaeyo`/`malhamnida` contrast and S08's `hamnida` cost nothing. Every one of the
seventeen surfaces the M4 brief calls fresh checked out free, and the owned side was confirmed
verbatim: `mani L2-M5`, `badeuseyo L2-M5`, `gamsahamnida L1-M2`, `joesonghamnida L2-M1`,
`juseyo L1-M3`, `jal L1-M2`.

#### W2.8 `dago` is FREE — it is `rago` that is L3-M5's

The most load-bearing correction of the wave. L5-M5's brief §5 says "`dago` is L3-M5, so a reported
belief spends nothing on its ending". What `content:owner` prints is:

```
dago	free
rago	L3-M5
irago	L3-M5
```

L3-M5 bought the QUOTATIVE `-rago`, not the reportative `-dago`, and the difference is the whole
distinction rule 4 of this module now teaches. A reported belief is not free. Writing it as
`jungyoha-dago` would also have put a fifth bare ending into the index, so the module ships it
attached inside `jungyohaeyo`'s forms —

```
jungyohadago	free      joeundago	free      haendago	free
```

— which spends one form entry, mints no bare `dago`, and keeps the en-ko ending law intact.

#### W2.9 `geo-ga`, `geo-reul` and `geo-neun` are L2-M9's, and `geo-seun` is not

The M5 brief says "`geo` is L1-M1 and `geot` is L2-M9, so the nominaliser's head noun and its
particles cost nothing". The claim is true and stronger than it says — the particle-attached keys
are already there —

```
geo	L1-M1      geot	L2-M9
geo-ga	L2-M9   [parts: geo → L1-M1, ga → L1-M1]
geo-reul	L2-M9   [parts: geo → L1-M1, reul → L1-M1]
geo-neun	L2-M9   [parts: geo → L1-M1, neun → L1-M1]
```

— which is why S02 and S09 write `geo-ga` and `geo-reul` with no row at all. But the one the
definition frame needs is not among them:

```
geo-seun	free   [parts: geo → L1-M1, seun → free]
```

so `geo-seun` earns a row here and donates the fragment `seun` (§W2.4). The alternative spelling
`geot-eun` is also free and would have donated nothing new, but `것은` is said `거슨`, and the
course writes what is said.

#### W2.10 `hangug-eseo` would have minted a second spelling of Korea

The M5 brief's worked example is `hangug-eseo saneun geo-ga jaemiisseoyo`. That liaison spelling is
free, and it is free for a bad reason:

```
hangug-eseo	free   [parts: hangug → free, eseo → L1-M7]
hanguk-e	L1-M6   [parts: hanguk → L1-M1, e → L1-M4]
hanguk	L1-M1
hangug	free
```

The course writes `hanguk-` with no liaison before a particle, and `hangug` is free only because
nothing has ever written it. Shipping the brief's spelling would have put a second romanization of
*Korea* into the index as a donated part. S02 ships `Hanguk-e saneun geo-ga jaemiisseoyo` instead —
`hanguk-e` is L1-M6's, already keyed, and `살다` takes `-e` as readily as `-eseo`. Two other M5
seam claims were confirmed exactly as written: `gachi L2-M6` (so *value* must be `gachigwan`, which
is free) and `saneun` free, needing a row of its own.

#### W2.11 The span law held without being tested

The deepest emitted index reports `maxSpan: 2`, and every row and form in all three modules is one
or two tokens. The M4 brief's ruling — that `samga goin-ui myeongbog-eul bimnida` cannot be indexed
whole and must ship as a SENTENCE whose four content words earn the rows — is what S04 does, and
nothing in the wave raises the course's span.

### The ratchet

`npx vitest run tools/shown-surfaces.test.ts` → **11 passed (11)**. en-ko's baseline is 12 and is
**unchanged**: no baseline was raised, and none was lowered, because none of the three modules
contributed a finding. `npm run content:shown` reports all three `clean — every shown surface
resolves`, with **no `RE-TEACH` line and no `COLLIDES INSIDE THIS MODULE` line on any of them**.

The three constraints wave 1 named held again, plus one this wave had to learn:

1. **Every sentence display, every `variations[].display` and every pool item is built only from
   surfaces `content:owner` had already placed, or from a row or `forms` entry inside these three
   modules.** `mistake.display` is the one exempt slot (#491), and it is where the deliberately
   wrong Korean lives: `igeo-ga`, `dangsin-eun yoseum eotteoke jinaeseyo`, `sori`, `chuwoyoneyo`,
   `teullyeoyo`, `joesonghamnida` at a wedding, `sarayo-ga`, `jayu-raneun`, `mideoyo` fronted.
2. **A row appears in exactly one sentence.** `check-shown`'s collision test is note equality, so
   two rows on one key with two notes is a defect; none was written and no deliberate repeat was
   needed.
3. **Within a module, a row that opens a key is written before any row that would donate it.**
   `seonbae` opens `seonbae` in its own display, and `seonbae-nim` follows it in the same row's
   `forms` rather than in a later row of its own — a second row would have collided.
4. **New this wave: a variation is where a module quietly overspends.** Fourteen distinct
   surfaces were ever flagged `SHOWN-BUT-UNTAUGHT` across the three modules — `satuori-ga`,
   `wiheomhan`, `mal-ieyo`, `moreuneyo`, `saengil-eul`, `gamnida`, `geo-yeyo`, `jayu-ga`,
   `hanguk-eseo`, `haengbogiraneun`, `eoryeowoyo`, `saram-eul`, `gachigwan-eun`, `saram-i` — and
   **every one of them appeared in a `variations[].display`**. Exactly one, `hanguk-eseo`, was also
   in a hero sentence. A variation is the slot an author writes fastest and checks last, and it
   buys index keys at exactly the same rate as a hero line does.

### Verification

- `npm run content:validate` → `CONTENT 405/405 ok` at the last reading; it read `CONTENT 404/404
  ok` a few minutes earlier. The denominator climbs as eight sibling waves land in the same
  checkout, and it has been `n/n` at every reading.
- `npm run content:shown -- en-ko L5-M3` → `L5-M3: clean — every shown surface resolves`
- `npm run content:shown -- en-ko L5-M4` → `L5-M4: clean — every shown surface resolves`
- `npm run content:shown -- en-ko L5-M5` → `L5-M5: clean — every shown surface resolves`
- `npx vitest run tools/shown-surfaces.test.ts` → `Tests  11 passed (11)`
- `npx vitest run src/course/types.test.ts` → `Tests  426 passed (426)`. Mid-pass this file was red
  on three census counters, all of them other people's: the module census (`finds all 378 …`, then
  404), the en-ar count (`expected 45 to be 42`) and the hi-en count (`expected 45 to be 42`). All
  three went green as the sibling waves landed their own counter updates. The en-ko case — *keeps
  en-ko to the decisions #373 settled* — was **green throughout**: no Hangul outside `script`,
  pure-ASCII romanization, no bare particle as its own whitespace token, no plain-style pronoun, a
  `note` on every word row, and a `script` line on every sentence, word, variation, mistake plate
  and pool item. It is worth noting that the en-ko case is guarded by `toBeGreaterThan(0)` rather
  than by a fixed module count, so unlike the other three it never stops short of its own walk.

No build was run. `public/content/` is untouched.

### Open questions for the native-speaker gate

Continuing the chain; the last numbered question in this file and in
`docs/111-en-ko-L5-brief-decisions.md` is 166. Nothing above is renumbered. **The native-speaker bar
is not met by anything in this document** — an LLM pass cleared these modules to ship and nothing
more, and on L5-M3 that gap is wider than anywhere else in the course, because a dialect judged by
an LLM is a dialect judged from writing about it.

167. **The four southern shapes, one at a time** (M3, pool). `masisseoye`, `geuraeye`, `joaye`
     (the Gyeongsang polite `-예`), `eoksuro`, `geurayo` and `geosigi`. Confirm each is current
     rather than televised, name the region each really belongs to, and flag any that a speaker
     from there would call a caricature. This is the single highest-risk item in the wave: the
     module asks a learner to RECOGNISE these, and a wrong one teaches a false ear.

168. **Is `-예` the right shape to show first?** (M3, C01–C03). It was chosen because it is polite,
     and this course cannot write banmal. Confirm that polite Gyeongsang really is what a visitor
     hears in Busan, or say which banmal shape they would actually meet first — and if it is a
     banmal one, that is a hole `docs/111` should record rather than a thing to fix here.

169. **`jonneyo` against `joeuneyo`** (M3, S04 forms). The module writes `좋네요` as `jonneyo`
     because the course romanizes what is said. Confirm the assimilation is obligatory in ordinary
     speech and not a fast-speech option, since the brief itself wrote `joeuneyo`.

170. **`-neyo` on a fact the listener just told you** (M3, rule 0). The rule claims it reads as
     though you had only just believed them. Confirm that is the actual pragmatic effect, and say
     whether it is rude or merely odd.

171. **`-jyo` against `-janayo` as this module frames them** (M3, S06, S07). *Invites* against
     *tells*. Confirm, and rule on whether `-jyo` aimed upward at a `seonbae-nim` is as safe as
     S06 assumes — the module teaches it as the tag for talking upward.

172. **`Dangsin-eun joeun mal-i anieyo` as a sentence** (M3, S08). The display is metalinguistic:
     it uses the word in order to forbid it. Confirm the sentence is natural Korean and not a
     learner's construction, and that using `dangsin` as a citation subject does not itself read
     oddly.

173. **`i-ge` as the default, and `igeo-ga` as the marker** (M3, S04). Confirm that the
     uncontracted `igeo-ga` at the head of a spoken sentence really does mark an outsider, and is
     not simply careful or emphatic speech.

174. **`mokssori` for the accent's sound** (M3, S03). The sentence says a dialect's `mokssori` is
     different. Confirm a speaker would use `mokssori` for pitch and intonation rather than for the
     voice of one person, and if not, name the word that carries `억양` at this level.

175. **Is `jeolmeun saram` the generational statement a speaker would make?** (M3, S09). Confirm
     `요즘 젊은 사람은 표준말을 잘 해요` is heard as an ordinary observation rather than as a
     complaint, and that `jal haeyo` is the right verb for speaking a standard well.

176. **`Sangsim-i keusigetseumnida`** (M4, S05). Confirm it is said at a Korean funeral in this
     exact shape, and that it is said to the bereaved family rather than about them. The module
     teaches `keusigetseumnida` as an unanalysed piece of one formula; rule on whether that is
     honest or whether the `-si-` and `-gess-` need naming.

177. **Two condolences on one visit** (M4, S04/S05). The module shows both formulae and the S05
     variation puts them in one breath. Confirm a mourner says both, in that order, or say which
     one alone is correct.

178. **`hwanyeonghamnida` to a room** (M4, S09). Chosen to avoid the `eoseo osipsio` trap. Confirm
     it is what a host actually says at the opening of a ceremony, and that `손님 여러분` in front
     of it is natural rather than a written formula lifted into speech.

179. **`Sonnim yeoreobun, jamsi gidaryeo jusipsio` on the occasion side of the line** (M4, S07).
     The module claims this is a host in the room and not L4-M7's announcement register. Confirm
     the sentence is at home at a wedding hall, and flag it if it only ever sounds like a station.

180. **`Chuksa-reul hamnida` as the speaker's own announcement** (M4, S08). Confirm somebody
     stepping up to give a `chuksa` says this of themselves, rather than it being what the MC says
     about them.

181. **The toast that must not grow** (M4, S10 and its mistake plate). Confirm that adding a
     thank-you inside `우리를 위하여 … 건배` really does stop it being a toast, and say what a host
     who wants to say more actually does instead.

182. **`geo-seun` as the spelling** (M5, S03). `것은` is written `geo-seun` here because the course
     romanizes what is said, and that donates the fragment `seun` to the index (§W2.4). Confirm
     `[거슨]` is the ordinary pronunciation in speech at this register, and rule on whether a
     course that writes what is said should still prefer `geot-eun` where the alternative mints a
     fragment.

183. **`-neun geo` against `-neun geot`** (M5, throughout). The module writes `geo` everywhere.
     Confirm that is the spoken form at this register and that `geot` would read as written Korean,
     since L2-M9 owns `geot` and a learner will meet both.

184. **`Jayuraneun geo-seun …` as a real opening** (M5, S03). Confirm a speaker opens a serious
     conversation this way, and that it does not read as translated philosophy. Name what they
     would say instead if it does.

185. **`-dago` on an adjective stem** (M5, S06). `중요하다고`. Confirm the shape is right for a
     descriptive verb and that `jungyohadago` is what a speaker says rather than `jungyohaedago`.

186. **`mideoyo` for both *trust* and *believe*** (M5, S07/S09). Confirm one verb really covers
     trusting a person and believing a proposition, and flag whether `믿어요` said of a friend
     carries more weight in Korean than English *I trust him* does.

187. **`Insaeng-eun jjalbeun kkum-ieyo`** (M5, S05). Confirm this reads as an ordinary reflective
     remark and not as a line from a poem; the module needs it to be sayable at a table.

188. **`Geu jilmun-e jeongdab-eun eopseoyo`** (M5, S10). Confirm `-e` is the particle a question
     takes here, and that the sentence closes a conversation kindly rather than dismissively —
     the `usage` line claims it does.

189. **`gachigwan` for an everyday conversation** (M5, S04/S08). It was forced by the `gachi`
     collision and the brief calls it the better word anyway. Confirm two friends really say
     `가치관` to each other, or name the plainer thing they would say.

190. **The hole this wave could not fill, again: banmal.** Generational speech IS a banmal question
     and dialect production is mostly a banmal question, and this course speaks neither. L5-M3
     teaches the observation and the recognition, and it cannot teach the sound. Confirm a
     `-yo`-only learner can still USE what M3 gives them, or say plainly that the module is
     preparation for a level this ladder does not have.

## Wave 3 — L5-M6 through L5-M10 (#597)

The third and last authoring wave of en-ko's fifth level, and the last five rungs of the product:
`L5-M6` *Arguing a position*, `L5-M7` *Between the lines*, `L5-M8` *When words run out*, `L5-M9`
*Telling it your way* and `L5-M10` *Your own voice*. Written against the **emitted index at
`public/content/en-ko/index/`, folded to `L5-M5` — 1299 surfaces over 45 modules, with
`maxSpan: 2`** — read only through `npm run content:owner` and `npm run content:shown`, never by
grep and never by reading a shipped module whole. Every ownership claim below is a line
`content:owner` printed on 2026-09-08.

That fold is the first correction, and it is the same one wave 2 had to make. **All five briefs
name an index seam measured against `L4-M10` — 1104 surfaces over 40 modules.** By the time this
wave started, waves 1 and 2 had added five modules and 195 surfaces, and three words the briefs
call free or owned had moved. The corrections are in
[the seam section](#the-brief-seams-i-had-to-correct-wave-3) below.

No file below L5 was touched, no other course was touched, and no build was run by this wave:
`public/content/` is shared with eight sibling waves and the strict build is the parent's.

### L5-M6 — Arguing a position

*A structured case, objections answered.* Ten sentences, 8 rules, 14 new rows, pool of 12,
`prerequisites: ["L5-M5"]`, `exitTest` 1 generate / 2 comprehend. 23 surfaces added.

1. `Cheotjjae, sigan-i eopseoyo.`
2. `Duljjae, i-sikdang-eun neomu bissayo.`
3. `Waenyahamyeon sigan-i eopgi ttaemun-ieyo.`
4. `Yereul deureo, beoseu-ga neomu neujeoyo.`
5. `Geureoke saenggakhal su-do isseoyo. Hajiman munje-ga isseoyo.`
6. `Majimageuro, je gyeollon-eun ganeun geo-ga joayo.`
7. `Chingu-neun chanseong-ieyo. Hajiman je jujang-eun dallayo.`
8. `Munje-ga hana isseoyo. Sigan-i neomu jjalbayo.`
9. `Waenyahamyeon jeo-neun jigeum sigan-i eopgi ttaemun-ieyo.`
10. `Je jujang-eun chanseong-ieyo. Hajiman bandae-do manhi isseoyo.`

What it teaches: the **discourse frame** as a closed set of words whose only job is to say where in
a case the listener is — `cheotjjae`, `duljjae`, `majimageuro` at the front, `yereul deureo` in
front of an example — plus the one piece of real grammar, the **bracketed because**:
`waenyahamyeon` opens and `-gi ttaemun-ieyo` closes, and half of it is half a construction. The
objection half is what separates it from L4-M4: this module *raises* the objection
(`geureoke saenggakhal su-do isseoyo`) and then turns with `hajiman` or `geuraedo`, where L4-M4
conceded a point somebody else had already made. Five nouns carry the case — `jujang`, `munje`,
`gyeollon`, `chanseong`, `bandae` — and all five are nouns with a copula, never verbs.

### L5-M7 — Between the lines

*Implication, sarcasm, indirect requests.* Ten sentences, 8 rules, 10 new rows, pool of 12,
`prerequisites: ["L5-M6"]`, `exitTest` 1 generate / 2 comprehend. 20 surfaces added. The only
module in the level whose per-sentence bound does **not** climb: 14, as L4 had it.

1. `Bang-i jom chumneyo.`
2. `Geureomyeon je-ga halkkayo?`
3. `Hoksi sigan isseuseyo?`
4. `Chingu-neun nunchi-ga isseoyo.`
5. `Changmun-i yeollyeosseoyo. Bang-i jom chumneyo.`
6. `Geunyang mureosseoyo. Gwaenchanayo.`
7. `Eojjeom geureoke jal haesseoyo?`
8. `Ama eoryeoul geot gatayo.`
9. `Geugeo-neun jom geuraeyo.`
10. `Bunwigi-ga an joayo. Geunyang gayo.`

What it teaches: **the hint as a request** — describe the situation and stop — assembled almost
entirely out of owned parts (L2-M1's `jom`, which is the request marker and not *a little*; L5-M3's
`-neyo`, which frames the observation as just noticed rather than as a grievance). What is new is
the **tentative self-offer** `V-(eu)lkkayo`, a question you ask about yourself and so the least
intrusive request the language has; `nunchi`, Korean's own name for the skill; and `jom geuraeyo`,
the two-word decline that names no fault. Sarcasm is taught for **reception only**, inside a marked
frame, and the rule says in as many words that an English-shaped attempt is heard as sincere or as
rude and never as funny.

### L5-M8 — When words run out

*Paraphrase, ask what something means, repair a misunderstanding.* Ten sentences, 8 rules, 12 new
rows, pool of 12, `prerequisites: ["L5-M7"]`, `exitTest` 1 generate / 2 comprehend. 21 surfaces
added.

1. `Geugeo museun tteus-ieyo?`
2. `Igeo-reul hangungmal-lo mworago haeyo?`
3. `Dasi hanbeon malsseumhae juseyo. Bareum-i eoryeoweoyo.`
4. `Geu danueo-reul moreugesseoyo.`
5. `Cheoncheonhi dasi seolmyeonghae juseyo.`
6. `Jong-i-reul jareuneun geo-reul malhaeyo.`
7. `Je mareun geuge anieyo.`
8. `Geuge sagwa-hago bisseushaeyo.`
9. `Mworagoyo? Jal an deullyeoyo.`
10. `Hangungmal-lo cheoncheonhi malsseumhae juseyo.`

What it teaches: **metalanguage plus circumlocution**. The metalanguage is a closed set of
questions about language itself, and the brief was right that it is nearly free at the index — which
is what buys the second half. The circumlocution is L5-M5's nominaliser doing a different job: when
the noun is missing, build a modifier clause and end on `geo`. The repair frames sit beside them —
`je mareun` opening the correction, and the **cancel** (`geuge anieyo`) rather than the English
restatement. `mworagoyo` is flagged as a repair request and not a challenge, and `deullyeoyo` is
pinned against L4-M6's `deureoyo` in a rule of its own.

### L5-M9 — Telling it your way

*Retell a known story in your own register.* Ten sentences, 8 rules, 11 new rows, pool of 12,
`prerequisites: ["L5-M8"]`, `exitTest` 1 generate / 2 comprehend. 19 surfaces added.

1. `Yennal yennal-e sigol-e halmeoni-ga sarasseoyo.`
2. `Halmeoni-neun san-e gasseoyo. Geurigo horangi-reul mannasseoyo.`
3. `Horangi-ga "Bap-eul juseyo" rago haesseoyo. Halmeoni-neun museoweosseoyo.`
4. `Geuraeseo halmeoni-neun domangchyeosseoyo. Algo boni horangi-do museoweosseoyo.`
5. `Gyeolguk halmeoni-neun jip-e wasseoyo.`
6. `Geurigo iyagi-neun kkeut-ieyo.`
7. `Geu dongwha-neun jaemiisseoyo.`
8. `Geu dongwha-ui jueingong-i museoweosseoyo.`
9. `Geu iyagi-neun horangi iyagi-yeyo.`
10. `Yennal yennal-e halmeoni-ga sigol-e sarasseumnida.`

What it teaches: **register as the only variable**. S01 and S10 are the same tale, the same words
and the same order, and only the ending moves — `sarasseoyo` to `sarasseumnida`. Between them the
tale itself: a meeting, a quoted line that keeps its own ending under L3-M5's `rago`, L4-M10's
`algo boni` on the one turn, and the two closes that close different things (`gyeolguk` on the last
event, `kkeut-ieyo` on the telling). S09 is the **frame narrator**, the summary sentence that makes
a retelling a retelling. The tale ships with **no proper nouns at all** — see
[§W3.13](#w313-the-tale-was-chosen-to-cost-zero-proper-nouns).

### L5-M10 — Your own voice

*An eight-sentence piece that changes register midway.* Ten pieces of five to seven sentences each,
8 rules, 10 rows over **2 distinct surfaces**, pool of 12, `prerequisites: ["L5-M9"]`, `exitTest`
1 generate / 2 comprehend.

1. `Oneul chingu-ga gyeolhon-eul haesseoyo. Jeongmal joasseoyo. Geurigo je-ga chuksa-reul haesseoyo. Yeoreobun, jinjja gamsahamnida. Chingu-reul wihayeo geonbae-reul hagesseumnida.`
2. `Eoje yeok-eseo ilhaesseoyo. Saram-deul-i manhi wasseoyo. Geuraeseo bangsong-eul haesseoyo. "Yeoreobun, annae malsseum deurigesseumnida. Gicha-ga jamsi hu-e chulbalhamnida." Ijen jip-e wasseoyo. Pigonhaeyo.`
3. `Oneul hoesa-eseo hoeui-ga isseoyo. Jeo-neun jom bappeundeyo. Sajangnim-kkeseo "Jigeum sijakhapsida" rago malsseumhasyeosseoyo. Yeoreobun, je-ga bogoseo-reul malsseum deurigesseumnida.`
4. `Yeoreobun, annyeonghaseyo. Jamsiman gidaryeo jusipsio. Oneul jal hagesseumnida. Geurigo sueop-i kkeunnasseoyo. Chingu-ga jeonhwahaesseoyo. Ijen gwaenchanayo. Jeongmal pigonhaeyo.`
5. `Yennal-e-neun hangugeo-reul mothaesseoyo. Geuttae-neun jeongmal himdeureosseoyo. Jigeum-eun hakgyo-eseo ilhaeyo. Yeoreobun, oneul jeongmal gamsahamnida. Ijen jal hagesseumnida.`
6. `Oneul jangnyesik-e gasseoyo. Jeo-neun jom seulpeosseoyo. Saram-deul-i manhi wasseoyo. Yeoreobun, je-ga malsseum deurigesseumnida. Samga goin-ui myeongbog-eul bimnida.`
7. `Eoje hoeui-e gasseoyo. Bunwigi-ga an joasseoyo. Jeo-neun nunchi-ga eopseosseoyo. Sajangnim-kkeseo "Yeoreobun, dasi hagesseumnida" rago malsseumhasyeosseoyo. Ijen gwaenchanayo.`
8. `Eoje chingu-ga iyagi-reul haesseoyo. "Yennal yennal-e halmeoni-ga sarasseoyo" rago haesseoyo. Jeongmal jaemiisseosseoyo. Oneul hakgyo-eseo haksaeng-deul-i mureosseoyo. Yeoreobun, je-ga iyagi-reul malsseum deurigesseumnida. Yennal yennal-e halmeoni-ga sigol-e sarasseumnida.`
9. `I-sikdang-eun jom geuraeyo. Cheotjjae, neomu bissayo. Duljjae, neomu meoreoyo. Geuraedo chingu-neun chanseong-ieyo. Yeoreobun, majimageuro je gyeollon-eul malsseum deurigesseumnida. Gamsahamnida.`
10. `Oneul hakgyo-eseo gongbuhaesseoyo. Jeongmal himdeureosseoyo. Geuraedo jaemiisseosseoyo. Sueop-i kkeunnasseoyo. Geurigo saram-deul-i manhi wasseoyo. Yeoreobun, jeongmal gamsahamnida. Jal hagesseumnida.`

What it teaches: **the switch, and the rule that it is triggered by the addressee and not by the
mood.** Every piece makes the trigger visible on the page — `yeoreobun` naming a room (1, 3, 5, 6,
8, 9, 10), a quotation begun (2, 7), or a room that leaves (4). Three shapes are represented: the
account that ends formally (1, 3, 5, 6, 8, 9, 10), the account that quotes an announcement (2, 7),
and the hard one, the piece that **begins** formally and drops to `-yo` once the class is over and
a friend has phoned (4). Every earlier module of the level appears somewhere in the envelope —
M6's frame and M7's decline in piece 9, M7's hint in 7, M9's tale told twice in 8, M4's funeral
formula in 6, L4-M5's `-neundeyo` in 3 — and the module's own spend is two surfaces.

### The brief seams I had to correct (wave 3)

Every quoted line below is `npm run content:owner -- en-ko …` output on 2026-09-08, against the
`L5-M5` fold.

#### W3.1 `eopgi` is FREE, and the other three -gi stems are all L4-M1's

The L5-M6 brief: *"The nominalised stems it rides on (hagi, gagi, meokgi, eopgi) are L4-M1's and
L4-M2's and are reused."* Two things are wrong with that sentence.

```
hagi	L4-M1
gagi	L4-M1
meokgi	L4-M1
eopgi	free
```

`eopgi` is **not owned**, and it is the one the brief's own worked example needs
(`waenyahamyeon sigan-i eopgi ttaemun-ieyo`). It ships as its own row in S09, tagged `delta`, with
a note pointing back at L4-M1's `hagi`. And no `-gi` stem is L4-M2's: all three owned ones are
L4-M1's. A wave that had trusted the brief would have shipped a hero sentence on an untaught word.

#### W3.2 `saenggakhal` is free — the concession costs two rows, not zero

The same brief lists `geureoke` and `saenggakhaeyo` as L3-M3's and `su` as L2-M1's, which makes the
concession look free. It is not:

```
geureoke	L3-M3
saenggakhaeyo	L3-M3
saenggakhal	free
su	L2-M1
su-do	free   [parts: su → L2-M1, do → L1-M3]
```

Both `saenggakhal` and `su-do` had to be minted. `su-do` is the more interesting of the two: **both
its parts are owned and the whole key is still free**, because `su-do` is one whitespace token and
`matchSurfaces` looks the whole token up before anything else. An author who reasons "su is bought,
-do is bought, therefore su-do is bought" ships an untaught surface. The hyphen inside a token is
not a word boundary to the matcher; it is only a donation rule at emit time, and donations run
*outward* from a minted key, never inward to make one.

#### W3.3 `ttaemun-ieyo` and `yereul deureo` confirmed exactly as the brief said

Two of the level's better brief calls, both verified rather than assumed:

```
ttaemune	L3-M3
ttaemun	free
ttaemun-ieyo	free   [parts: ttaemun → free, ieyo → L1-M1]
yereul deureo	free
yereul	free
deureo	free
deureoyo	L4-M6
deullyeoyo	L4-M2
```

`ttaemun-ieyo` mints `ttaemun` as a donation and leaves L3-M3's `ttaemune` alone, exactly as
written. And `yereul deureo` indexed whole donates **nothing**: `surfaceIndexKeys` splits on
hyphens, not on spaces, so a two-token surface leaves both its words unspent. That is why
`deureo` is still free after this wave — the dangerous bare key the brief was worried about was
never at risk once the surface was indexed whole.

#### W3.4 The L5-M7 brief writes `jega`; the course writes `je-ga`, and they are different keys

```
je-ga	L3-M2   [parts: je → L1-M1, ga → L1-M1]
jega	free
```

The brief's pattern line is `jega + V-(eu)lkkayo?`. Written that way it would have minted a second
spelling of a word L3-M2 already owns, for identical Hangul (제가). The course law is that
particles attach with a hyphen, and the fold agrees: the module writes `je-ga`, which resolves.
**The unhyphenated spelling of an owned particle-carrying word is always a free key, and minting
one is always a defect.** This is the same class of error as `hangug-eseo` in
[§W2.10](#w210-hangug-eseo-would-have-minted-a-second-spelling-of-korea).

#### W3.5 `isseuseyo` is free; `chumneyo` is already L5-M3's

The L5-M7 brief treats its own pattern lines as available. Half of one of them was:

```
isseuseyo	free
chumneyo	L5-M3
jom	L2-M1
bang	free
```

`hoksi + N + isseuseyo?` needed `isseuseyo` minted (S03, a row of its own with a note about L3-M8's
`-si-` landing on the listener, never on your own time). The headline hint `bang-i jom chumneyo` is
the reverse: `chumneyo` was bought by **wave 1's own L5-M3**, in the `masinneyo | jonneyo | chumneyo`
forms list, so the sentence's verb costs nothing and only `bang` had to be minted. Two claims in
one brief line, each wrong in the opposite direction.

#### W3.6 `jal handa` cannot be written in this course, so the sarcasm frame changed

The L5-M7 brief asks for sarcasm reception *"inside a marked frame — `jal handa` said of a mistake,
named as such in the pool"*. But `-(neu)nda` is banned course-wide, and the L5-M9 and L5-M10 briefs
both say so in as many words (*"No written -(neu)nda, which is nowhere in this course"*). The
frame ships instead as `Eojjeom geureoke jal haesseoyo?` — a `-yo` exclamation whose words are
positive either way — with `eojjeom` as the row, tagged `interference`, and a rule and a trap that
both say the flat delivery is what flips it and that a course with no audio can only teach its
reception. This is a brief asking for a surface the course's own register decision forbids.

#### W3.7 `geo-yeyo` would have minted a second key for L1-M6's future

The L5-M8 brief's fourth pattern is `V-(neu)n + geo-yeyo`.

```
geo-yeyo	free   [parts: geo → L1-M1, yeyo → L1-M1]
geoyeyo	L1-M6
```

`geoyeyo` is L1-M6's, where it is the **second half of the future** (`gal geoyeyo`, will go). The
Hangul is 거예요 in both cases. Writing the brief's hyphenated spelling would have put two keys on
one written form, one meaning *will* and one meaning *it is the one that* — and a learner tapping
either would get the wrong note half the time. The pattern was replaced with
`V-(neu)n + geo-reul + malhaeyo`, which is built from L5-M5's `geo-reul` and L5-M1's `malhaeyo` and
mints nothing (S06). **The romanization's hyphen is the only thing separating these two keys, which
makes it exactly the wrong place to draw a distinction the learner has to see.**

#### W3.8 `malsseumhae` is L2-M1's, so the repair kit really is free — but `malsseumhaeyo` is not

```
malsseumhae	L2-M1
malsseumhaeyo	free
dasi	L4-M2
hanbeon	L4-M1
juseyo	L1-M3
cheoncheonhi	L2-M1
```

The brief's claim that `dasi hanbeon malsseumhae juseyo` is fully owned is **correct**, and it is
the finding that shaped the module: the repair kit is on the ladder already and only has to be
assembled. The brief also lists `malsseumhaeyo` among the fresh words; it was **not** minted,
because nothing needs it and it would sit one letter from an owned surface. The freed budget went
to the circumlocution half instead.

#### W3.9 `hangungmal-lo` puts a second particle spelling into the fold

```
hangungmal-lo	free   [parts: hangungmal → L1-M1, lo → free]
ro	L2-M4
```

`hangungmal-lo` is the honest romanization — after the `l` of `mal` the instrumental is *said*
`-lo`, and this course writes assimilation. Minting it donates the bare part `lo`, and L2-M4
already owns `ro` for the same particle. **The fold now holds two keys for one particle,
distinguished only by the assimilation the romanization records.** This is not avoidable while the
course romanizes what is said, and it is the third time this level has produced a key nobody
intended (`docs/76` §4 on `-deon`, [§W2.4](#w24-the-ending-discipline-held-and-one-bare-suffix-was-minted-anyway),
and now this). Nobody taps a bound particle, so nothing is lost today; it is recorded because the
count of such keys is now three and rising.

#### W3.10 `iyagi` is L5-M2's, not fresh

The L5-M9 brief: *"Fresh, and it should stay a short list: iyagi, dongwha, gyeolguk, kkeut,
jueingong."*

```
iyagi	L5-M2
iyagi-yeyo	free   [parts: iyagi → L5-M2, yeyo → L1-M1]
```

`iyagi` was bought by wave 1's L5-M2 with `iyagi | iyagi-neun | iyagi-ga | iyagi-reul`. The brief
was written before that wave landed. What this module needed was the copula form for its frame
narrator, and `iyagi-yeyo` is free, so it ships as its own row (S09) with a note pointing back at
L5-M2 — the "new shape of an older lexeme gets its own row" rule, applied inside the same level.

#### W3.11 `yennal yennal-e` confirmed, and the brief's honesty about it is worth repeating

```
yennal yennal-e	free   [parts: yennal → L4-M8, e → L1-M4]
sarasseoyo	free
sarayo	L4-M2
sarasseumnida	free
```

The brief's own recorded correction — *"I expected the tale-opening to be fresh; content:owner says
yennal is L4-M8"* — holds today. The doubled surface is free as a whole and donates nothing, so it
costs exactly one key. `sarasseoyo` and `sarasseumnida` are both free and both minted, and they are
the module's whole argument: one pair of surfaces, one difference, and it is the ending.

#### W3.12 `sarayo` is L4-M2's, not L3-M9's — and four more citation fixes

Notes in a shipped module cite other modules by number, and a wrong citation is a wrong fact on a
learner's screen. Five were caught by asking rather than remembering, and all five were fixed
before the modules shipped:

```
sarayo	L4-M2
museoweoyo	L3-M6
ui	L5-M4
hago	L2-M9
bwayo	L2-M6
mal	L3-M5
```

`sarayo` had been written as L3-M9's (L3-M9 owns `halmeoni`, which is what the memory attached to),
`museoweoyo` as L2-M9's, `-ui` as L3-M7's, `-hago` as L2-M2's and `bwayo` as L1-M8's. `mal` at
L3-M5 was the only one already right. **A citation inside a note is an ownership claim and belongs
in `content:owner`'s output, not in an author's recollection.**

#### W3.13 The tale was chosen to cost zero proper nouns

The L5-M9 brief ends its seam with a real design lever: *"Proper nouns DO index on this course, so
a tale with three named characters costs three keys and a tale with one costs one — which is a
reason to choose the tale for its cast as much as for its plot."* Taken to its conclusion, the
cheapest cast is **none**: `halmeoni` is L3-M9's and `horangi` is one fresh common noun, so the
whole tale is told with a single new character word and no proper noun at all. The module spends
its budget on `domangchyeosseoyo`, `museoweosseoyo`, `gyeolguk`, `kkeut`, `dongwha`, `jueingong`
and the two `sara-` forms instead — every one of which a learner can reuse on a different tale.

#### W3.14 The span count: this wave added four two-token surfaces, and L5-M10 added none

The L5-M10 brief: *"this course's maxSpan is 2 and the emitted fold holds TEN two-token surfaces
after forty modules, the L5 briefs above add ten more, and this module should add NONE."* Wave 3
added **four**: `yereul deureo` (M6), `jom geuraeyo` (M7), `je mareun` (M8) and `yennal yennal-e`
(M9). Each is a surface whose meaning is nothing either word says alone, which is the only case
that earns a span. **`maxSpan` is still 2** on every emitted file of this wave, and `L5-M10`'s
emitted index holds exactly two surfaces, `hagesseumnida` and `deurigesseumnida` — neither of them
spanning.

#### W3.15 L5-M10 spends two surfaces, not one — and why

The brief holds the module to L3-M10's standard of one. It ships **two**: `hagesseumnida` and
`deurigesseumnida`, both free, both `-gesseumnida` commitment forms. The reason is structural
rather than lexical. Every one of the ten pieces needs at least one word row
(`deconstruction.words` may not be empty), and a row on an already-owned surface is unreachable —
first occurrence wins, so the learner would be shown the earlier module's note. Two rows, five
pieces each, with a **byte-identical note on every repeat** (which is what `check-shown`'s
collision test requires of a deliberate repeat), gives every piece a reachable row while adding two
keys. The alternative — one surface in all ten pieces — would have forced the same sentence into
ten different scenes. The formal half of five pieces is `malsseum deurigesseumnida`, which is the
ordinary opener of a Korean formal address, and of the other five, `jal hagesseumnida`.

#### W3.16 Formal lines that could not be written

Worth recording for whoever writes L5's successor, if there is one. These are all free and all
obvious things a formal half wants:

```
butakhamnida	free
il-eul	free   [parts: il → L1-M9, eul → L1-M1]
sonnim-i	free   [parts: sonnim → L5-M4, i → L1-M1]
gippeosseoyo	free
malhaesseoyo	free
isseosseoyo	free
```

`jal butakhamnida` — the standard *I look forward to working with you* — is unavailable, and so is
`sonnim-i` even though L5-M4 owns `sonnim`. The pieces route around them (`saram-deul-i` for
`sonnim-i`, `jal hagesseumnida` for `butakhamnida`). The pattern is the familiar one: **a noun is
owned and the particle-bearing form of it is not**, and the fold has no opinion about which forms
an author will want next.

### The ratchet

`npx vitest run tools/shown-surfaces.test.ts` → **11 passed (11)**. en-ko's baseline is **12 and
unchanged**: no baseline was raised, and none was lowered, because none of the five modules
contributed a finding. `npm run content:shown` reports all five `clean — every shown surface
resolves`, with **no `RE-TEACH` line and no `COLLIDES INSIDE THIS MODULE` line on any of them**.

The rules that produced that, in the order they cost time:

1. **Every sentence display, every `variations[].display` and every pool item is built only from
   surfaces `content:owner` had already placed, or from a row or `forms` entry inside these five
   modules.** Wave 2's finding — that a variation is where a module overspends — was taken as a
   working rule this time: every variation line was checked before it was written, not after.
   `mistake.display` is the one exempt slot (#491), and it is where the deliberately wrong Korean
   lives: `sigan-i eopseoyo, cheotjjae`, `geureoke saenggakhaeyo su-do isseoyo`, `bang-i jom
   chuwoyo`, `mworagoyo? jal an deureoyo`, `hangungmal-e`, `geu dongwha jueingong-i`, and every
   register slip in L5-M10.
2. **A row appears in exactly one sentence, except in L5-M10, where two rows repeat five times
   each with a byte-identical note.** The collision test is note equality, so the repeat is
   invisible to the fold and reachable for the learner; L4-M10 set that precedent with `gapjagi`
   and `algo boni`.
3. **A `forms` list never lists a form another row of the same module opens as its display.**
   `chanseong` carries `chanseong-ieyo` and `chanseong-eun`; no later row displays `chanseong`.
4. **A paradigm was checked cell by cell before it was written.** `halkkayo | galkkayo |
   meogeulkkayo` ships complete because `content:owner` reported all three free — unlike en-it's
   `sarei`, this one had no owned cell to leave a hole for. The hole rule was still applied to
   `bandae | bandae-yeyo | bandae-do`, where the copula and the `-do` form were checked
   individually.
5. **New this wave: the whole-token rule.** `su-do`, `je-ga`, `geo-yeyo`, `bang-i`, `sonnim-i` and
   `il-eul` are all cases where the parts are owned and the whole is not. `matchSurfaces` resolves
   a whitespace token as a unit first, so the only safe question is the one about the token you are
   actually going to write. Asking about the parts is asking a different question.

### Verification

- `npm run content:validate` → `CONTENT 448/448 ok`. The denominator climbs as eight sibling waves
  land in the same checkout; it has been `n/n` at every reading.
- `npm run content:shown -- en-ko L5-M6` → `L5-M6: clean — every shown surface resolves`
- `npm run content:shown -- en-ko L5-M7` → `L5-M7: clean — every shown surface resolves`
- `npm run content:shown -- en-ko L5-M8` → `L5-M8: clean — every shown surface resolves`
- `npm run content:shown -- en-ko L5-M9` → `L5-M9: clean — every shown surface resolves`
- `npm run content:shown -- en-ko L5-M10` → `L5-M10: clean — every shown surface resolves`
- `npx vitest run tools/shown-surfaces.test.ts` → `Tests  11 passed (11)`
- `npx vitest run src/course/types.test.ts` → `Tests  2 failed | 467 passed (469)`. Both failures
  are census counters belonging to other people: the module census (`finds all 444 …`) and the
  hi-en count (`expected 49 to be 48`). The en-ko case — *keeps en-ko to the decisions #373
  settled* — was **green**: no Hangul outside `script`, pure-ASCII romanization, no bare particle
  as its own whitespace token, no plain-style pronoun anywhere including inside the quotations in
  L5-M9 and L5-M10, a `note` on every word row, and a `script` line on every sentence, word,
  variation, mistake plate and pool item. The `-mnida` gate is scoped to L1–L3, so L5-M9's
  `sarasseumnida` and L5-M10's two new surfaces pass it by construction.
- `npx prettier --check` on all five files → `All matched files use Prettier code style!`

No build was run by this wave.

### Open questions for the native-speaker gate

Continuing the chain; the last numbered question in this file and in
`docs/111-en-ko-L5-brief-decisions.md` is 190. Nothing above is renumbered. **The native-speaker bar
is not met by anything in this document** — an LLM pass cleared these modules to ship, and the
questions below are what an LLM pass cannot answer.

191. **`waenyahamyeon` with `-gi ttaemun-ieyo`, every time** (M6, S03/S09). The module teaches them
     as one bracket and calls `waenyahamyeon` alone half a construction. Confirm a speaker really
     does close it, in ordinary spoken `-yo`, or say how often the front half stands by itself.

192. **`Geureoke saenggakhal su-do isseoyo`** (M6, S05). Confirm this reads as *one could see it
     that way* — a concession you are about to turn — rather than as *you might be thinking that*,
     which would be a different and more pointed act.

193. **`chanseong-ieyo` and `bandae-yeyo` said of a person** (M6, S07/S10). The module insists on
     the noun with a copula and rules out `chanseonghaeyo` in its `mistake` plate. Confirm
     `친구는 찬성이에요` is what two friends actually say, and not committee language.

194. **`Yereul deureo`** (M6, S04). Confirm it is the everyday spoken *for example* and not the
     written one, and that a comma pause after it is right.

195. **`Bang-i jom chumneyo` as a request** (M7, S01/S05). The whole module rests on this reading.
     Confirm it is heard as *close the window*, and confirm the module's claim that answering
     *yes, it is* is a refusal rather than agreement.

196. **`Je-ga halkkayo?` frequency** (M7, S02). Confirm the self-offer is the default way to
     volunteer, and flag whether it is too tentative in a workplace where somebody has to just do
     the thing.

197. **`Eojjeom geureoke jal haesseoyo?`** (M7, S07). This replaced the brief's `jal handa`, which
     this course cannot write. Confirm the `-yo` exclamation carries the same double reading, and
     say whether teaching sarcasm reception without audio is worth doing at all or should be cut.

198. **`Geugeo-neun jom geuraeyo`** (M7, S09). Confirm it declines without naming a fault, and that
     supplying the adjective (`jom bissayo`) really is a different act rather than a softer one.

199. **`nunchi-ga isseoyo` / `eopseoyo`** (M7, S04). Confirm `nunchi-ga eopseoyo` is the ordinary
     complaint and not an insult, and that `nunchi-reul bwayo` is the right form for *reading the
     room* as an action.

200. **`Mworagoyo?`** (M8, S09). The rule claims it is a repair request and not a challenge, and
     that English intonation flips it. Confirm the flip is real, and say what a learner should do
     with their voice instead.

201. **`Je mareun geuge anieyo`** (M8, S07). The module teaches Korean repair as *cancel the wrong
     reading* rather than *restate the right one*, and calls it blunter than a learner expects.
     Confirm that is correct and not merely a possible phrasing.

202. **`Jong-i-reul jareuneun geo-reul malhaeyo`** (M8, S06). Confirm this is how a Korean speaker
     circumlocutes a missing noun, and flag whether `-reul malhaeyo` or something else is the
     natural closing verb.

203. **`hangungmal-lo` against `hangugeo-ro`** (M8, S02/S10). Both exist; the course owns
     `hangungmal` at L1-M1 and `hangugeo` from L2. Confirm `한국말로` is the one said in a
     conversation, and note that the module's choice put a second particle key (`lo` beside L2-M4's
     `ro`) into the fold.

204. **The tale itself** (M9). A grandmother, a tiger, a demand for rice, a flight, and the tiger
     frightened too. Confirm it reads as a recognisable Korean folk tale rather than as an
     invention, and if it does not, name one that can be told inside this ladder's vocabulary.

205. **`museoweosseoyo` for both sides** (M9, S03/S04). The note claims it covers *was afraid* and
     *was frightening*, which is what lets S04's turn land. Confirm, or split the sentence.

206. **`Geu iyagi-neun horangi iyagi-yeyo`** (M9, S09). Confirm the bare topic noun in front of
     `iyagi` is right and that `호랑이의 이야기` really would mean something else, as the `mistake`
     plate claims.

207. **`sarasseoyo` against `sarasseumnida` as the module's whole argument** (M9, S01/S10). Confirm
     a Korean speaker retelling the same tale to a room would change only the ending — and say what
     else *would* move that this course has no way to teach.

208. **`malsseum deurigesseumnida` and `jal hagesseumnida`** (M10, five pieces each). Confirm both
     are what a speaker says at the moment they take the floor, and flag any piece where the line
     is too formal for the occasion — the wedding toast (1) and the classroom (8) are the two most
     at risk.

209. **The formal-to-`-yo` drop** (M10, piece 4). This is the shape the brief calls hardest and
     most useful. Confirm the trigger — the class ending and a friend phoning — is enough to license
     the drop mid-piece, and that the piece does not read as a register slip.

210. **The hole this level never filled, said once more at its last rung: banmal.** L5-M10 is the
     final slot in the product, and its absence could be mistaken for an oversight. Confirm that a
     `-yo`-and-`-(seu)pnida` learner who has finished this ladder can hold a real conversation with
     a peer, or say plainly what they will be unable to do until a level this ladder does not have
     teaches them plain style.
