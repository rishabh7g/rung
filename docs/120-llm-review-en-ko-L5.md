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
