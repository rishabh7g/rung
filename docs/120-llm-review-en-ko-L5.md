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
