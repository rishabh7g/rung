# en-ko L5 — the authoring-brief decisions (#571)

The ten en-ko L5 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['en-ko']` L5-M1…L5-M10) are the
LAST briefs this course will get, and they are written the day L4 closed. Every seam below was
pinned against the REAL cumulative index — the fold of `public/content/en-ko/index/L1-M1.json`
through `L4-M10.json`, read on **2026-09-08** with `npm run content:owner`, which reported

> `1104 surfaces owned, folded over 40 modules through L4-M10`

and a **`maxSpan` of 2**, with exactly **ten two-token surfaces** in the fold: `algo boni`,
`an dwaeyo`, `annyeonghi gyeseyo`, `eoya dwaeyo`, `gaya dwaeyo`, `geot gatayo`, `geu daeum-e`,
`go isseoyo`, `jal meogeosseumnida`, `mannaseo bangapseumnida`. (L1 closed at 185, L2 at 539, L3 at
831, L4 at 1104.) The fold moved three times while these briefs were being written, as the L4
authoring waves landed M6, M8 and then M9–M10; **every seam below was re-checked against the
complete forty-module fold afterwards**, and nothing in the briefs rests on the partial reads.

The review chain the level inherits is `docs/35`–`docs/37` (L1), `docs/47` (spoken Korean),
`docs/68`'s L2 questions 1–47, `docs/84`'s L3 questions 1–57 and `docs/102`/`docs/93`'s L4 questions
58–120 — every one a native-pass item that no authoring wave may close by rewriting a shipped
module. The L5 module list is RATIFIED (#423, 2026-09-07) and the briefs mirror
`content/en-ko/levels.json`'s titles and jobs verbatim, as `tools/course-briefs.test.ts` enforces.

This note records the decisions the briefs are written to, so the authoring waves inherit them
without re-deriving anything. The briefs repeat each decision in the module notes, because a prompt
only ever shows an author the notes.

## 1. The romanization laws, carried forward unchanged

Nothing in `docs/34` moves. `display` is the ROMANIZATION only and `script` the Hangul, drawn by the
bundled face (#375). Particles attach with a hyphen; ENDINGS DO NOT. Assimilation, tensing,
palatalisation and aspiration are WRITTEN, because the romanization is how a sentence is SAID:
`masinneun`, `jochi`, `masinneyo`, `chumneyo`, `jochanayo`. Proper nouns index on this course, which
matters twice at L5 — `seoul` and `busan` earn real rows in M3, and whichever tale M9 retells pays a
key per named character.

Two consequences the L5 briefs turn into orthography rulings, both of them descendants of the
accident `docs/93` §4 recorded:

- **`-(i)raneun` is written attached, with no hyphen** (M1, M5, M9). `jayu-raneun` would mint a bare
  `raneun` key. `content:owner` says `raneun` is free today, and `jayuraneun` is free as a whole,
  so the attached form is both correct and cheap.
- **`-neyo`, `-jyo`, `-kkayo` stay free** (M3, M7). All three are free in the fold and must be
  written only as attached whole forms — `joeuneyo`, `masinneyo`, `chumneyo`, `geureochyo`,
  `majjyo`, `halkkayo`, `galkkayo`, every one verified free. Listing one bare inside a `forms`
  array is exactly how L3-M9 minted `deon` and L1-M9 minted `eoseo`.

## 2. Register — the two levels, the switch, and the ban that does not lift

This course speaks TWO speech levels and L5 changes neither. `-yo` is the working register; L4-M7
opened deferential `-(seu)pnida` for what a learner hears at a counter, and L5 uses it in exactly
three places: **M4** produces it (the only module in the course where production is required rather
than recognised), **M9** may retell in it, and **M10** switches into or out of it once.

The `-mnida` freeze needs **no further test change**. `src/course/types.test.ts` computes
`frozenLevel` as `/^L[123]-/`, so L4-M7's re-scoping already covers every level above it and L5-M4
inherits the lift. An author expecting a test change in the same commit, as L4-M7 required, will not
find one.

`PLAIN_STYLE` still fails `na`, `nan`, `nae`, `neo` in every slot, quotation included. **The banmal
ban does not lift at L5**, and §6 names what that costs.

## 3. What L4 withheld, and where it lands

`docs/93` §6 is the contract. Every row of it is discharged here except the two it already declared
homeless, which §6 below names as holes rather than passing on.

| deferred by L4 | named in | lands at |
| --- | --- | --- |
| idioms, proverbs, the figurative everyday | L4-M8, M9, M10 | **L5-M1**, whole-indexed as two-token keys |
| irony, sarcasm, saying the opposite | L4-M4, M5, M10 | **L5-M2** (signalled) and **L5-M7** (unsignalled) |
| regional and generational speech | nowhere in L4 | **L5-M3**, comprehension-only for the dialect |
| speeches, toasts, condolences, ceremony | L4-M7 | **L5-M4**, as fixed formulae |
| a structured case with objections answered | L4-M4 | **L5-M6** |
| `-(eu)l ppeonhaesseoyo`, the shades of nearly and barely | L4-M3 | **L5-M2** — see below |
| the written `-(neu)nda` style | L4-M1, M7, M10 | **nowhere — a hole, §6** |
| banmal as a written sentence | L4-M4, M5, M10 | **nowhere — a hole, §6** |

**`-(eu)l ppeonhaesseoyo` now has an owner, and the reasoning is worth keeping.** `docs/93` recorded
it as unassigned because a near miss is not a counterfactual and no L5 job obviously wanted it. It
goes to **M2** because the frame's commonest real use is not the near miss at all: `jugeul
ppeonhaesseoyo` is comic exaggeration far more often than it is a report of danger, and hyperbole is
what a teasing module runs on. Putting it there also lets `gyeou` (barely) sit beside it, so the
nearly/barely pair L4-M3 could not hold is taught as one contrast. The brief carries the guard-rail
in the same note: **it is not a counterfactual**, it says nothing about what would have followed, and
it may never be paired with `-eosseumyeon` here.

Three L4 review questions also pointed forward at L5, and two of them land:

- **`docs/102` Q101, the uncontracted `i-geo-ga` where speakers say `i-ge`** — lands at **M3**. It is
  precisely a what-marks-an-outsider item, and M3 is the module chartered to say so. `content:owner`
  reports `i-ge` free as a whole with parts `i` → L1-M1 and `ge` → L3-M4, so the contraction can be
  taught without disturbing anything below. No shipped module is rewritten.
- **`docs/102` Q98, whether L5 may write `-gin hajiman`** — the answer is **no**, and it is an index
  answer rather than a taste one: `gin` is L2-M2 (LONG) and the collision L4-M4 dodged is exactly as
  live at L5. M6 reuses `-gineun hajiman` written in full.
- **`docs/102` Q93, the prohibitive `-ji mal geol geuraesseoyo`** — **L5 cannot pay this off**, and
  §6 records it as a hole. The bar is structural: `mal` is L3-M5's WORD, minted from that module's
  row, so writing the prohibitive anywhere in the course shows a note about speech on a sentence
  about regret. The fix is a content change to L3-M5's row, which is an issue and not an L5 module.

## 4. Seams — checked against the emitted fold, not guessed

Everything here was read with `npm run content:owner -- en-ko …` against the forty-module fold. The
five that changed a brief are first.

1. **`gachi` is L2-M6, so `value` cannot be `gachi`** (M5). My first instinct minted it. The index
   says `gachi → L2-M6` — 같이, TOGETHER, whose palatalisation this course writes — so 가치 and 같이
   are ONE KEY in this romanization and a learner tapping *value* would be shown a note about doing
   something with someone. M5 says **`gachigwan`** (free), which is the better word for a values
   conversation anyway. The same reasoning removes `sam` for 삶: free, but it shares its romanization
   with the Sino numeral three, so M5 says `insaeng`.
2. **`dwaesseoyo` is L4-M2, so the curt refusal 됐어요 cannot be written** (M7). `content:owner` says
   `dwaesseoyo → L4-M2`, minted for `-ge dwaesseoyo`, *it came about*. The polite decline in M7 is
   `gwaenchanayo`, which the index puts at **L2-M1** and which M7 points back at.
3. **`eoseo` is L1-M9, so `eoseo osipsio` is barred** (M4). I wrote the doorway welcome before
   checking. `content:owner` says `eoseo → L1-M9` — the CAUSAL ending, because L1-M9's `-aseo` row
   lists `"-eoseo"` bare in its `forms` array and `normalizeSurface` strips the edge hyphen. This is
   `docs/93` §4's `deon` accident at a **second confirmed site**, and it is why §1 above states the
   ending rule as a law rather than a preference.
4. **`yennal` is L4-M8, so the storybook opening is already bought** (M9). I expected 옛날 옛날에 to
   be fresh. `content:owner` says `yennal → L4-M8` and `yennal-e → L4-M8`, minted for
   `yennal-e-neun`. M9 points back for both tokens and indexes only the doubled `yennal yennal-e`
   whole (free; parts `yennal` → L4-M8, `e` → L1-M4, so it donates nothing).
5. **`mal` is L3-M5, and here that is CORRECT** (M1). The same key L4-M3 had to dodge is the right
   one for `-raneun mal-i isseoyo`, because that frame means precisely *a saying*. `mal-i isseoyo` is
   free as a whole and is indexed whole; the point-back to L3-M5 is honest. A key is not a trap by
   itself — it is a trap when the row it points at means something else.

Rulings that shaped more than one module:

- **The whole-idiom ruling.** `surfaceIndexKeys` splits on hyphens ONLY, never on spaces, so a
  two-token surface earns its own key and beats its parts in the resolver's longest-match walk. Every
  figurative pair is therefore indexed WHOLE: `nun-i nopayo`, `son-i keoyo`, `bal-i neolbeoyo`,
  `ip-e majayo`, `mal-i isseoyo` (M1), `jugeul ppeonhaesseoyo` (M2), `yereul deureo` (M6),
  `jom geuraeyo` (M7), `je mareun` (M8), `yennal yennal-e` (M9) — all ten verified free as wholes.
- **`maxSpan` stays 2.** Three-token proverbs are barred for that reason and not for taste:
  `sigeun juk meokgi` would take the course to 3 and widen every lookup in it. A longer formula ships
  as a SENTENCE whose content words earn ordinary rows, which is how M4's
  `samga goin-ui myeongbog-eul bimnida` is handled — its fixedness lives in a rule, not in a key.
- **The body parts and the address terms were already bought.** `nun` L2-M2, `son` L2-M5, `meori`
  L2-M2, `maeum` L3-M6; `eonni`, `hyeong`, `nuna`, `oppa` all L2-M2, `seonsaengnim`, `chingu`,
  `saram` L1-M1. M1 spends only its predicates and M3 spends only `seonbae`/`hubae`.
- **The repair kit was already bought too** (M8), which is the level's happiest finding:
  `cheoncheonhi` L2-M1, `dasi` L4-M2, `hanbeon` L4-M1, `hangungmal` L1-M1, `juseyo` L1-M3,
  `deullyeoyo` L4-M2 — so `jal an deullyeoyo` costs NOTHING, and the saving buys the circumlocution
  half of the module. The trap next door: `deureoyo` is **L4-M6**, one letter away, so *listen* is
  never written with it.
- **`-gi ttaemun-ieyo` is safe** (M6). `ttaemune` is L3-M3 and both noun and clause forms resolve
  there, but bare `ttaemun` is free, and `ttaemun-ieyo` reports free with parts `ttaemun` free and
  `ieyo` L1-M1. So M6 mints `ttaemun`, points `ieyo` back, and leaves L3-M3 untouched.
- **`-(eu)lkkayo` was never taught anywhere** (M7). `kkayo`, `halkkayo` and `galkkayo` are all free
  after forty modules, because L2-M6 chose `-(eu)llaeyo` for the invitation and nothing since needed
  the self-directed proposal. This is a gap the L5 index check found rather than a deferral, and M7
  takes it because *shall I* is the least intrusive request the language has.
- **Two words a joke module would assume are free**: `jaemi` and `jaemiisseoyo` are BOTH free — this
  course has never taught *fun* — so M2 mints them and its word budget has to allow for it.
- **Small surprises worth recording**: `byeollo` is L3-M1 (the habits module bought the
  not-particularly hedge), `sori` is L4-M2 (so M3 says `mokssori` for a voice), `geugeo` is L2-M9
  while `geuge` is free, `dallayo` is L3-M9, `munje` is free after forty modules.

## 5. The shape of the level

- Bounds **do not run to 16 across the board**. `docs/48` §3 sketched 14 → 16 for L5; the briefs
  spend it in four places only and hold the rest at L4's 14, because this level is about voice and
  not length:
  - **14 for M1, M2, M3, M7.** An idiom that needs sixteen words is not an idiom; a joke dies at
    length; M3's items are two short spoken lines set against each other; and **M7's bound
    deliberately does not climb at all** — an implication that needs sixteen words has already stated
    itself, so the ceiling is part of the teaching.
  - **15 for M8 and M9.** M8's paraphrase is a modifier clause in front of a bare `geo`, which eats
    words before the sentence starts; M9's retold sentences carry a frame narrator or a quotation.
  - **16 for M4, M5, M6, M10.** M4's condolence and toast are the longest natural sentences the
    course prints. M5 is the real reason the level has a 16 at all: Korean puts the ENTIRE modifier
    before the noun, so a nominalised subject reaches its predicate late. M6 needs a claim and its
    `waenyahamyeon … -gi ttaemun-ieyo` bracket in one breath. M10 sits at the level's working bound
    exactly as L3-M10 sat at 12 and L4-M10 at 14.
- `newWordCap` is **25 everywhere**, and not by choice: `tools/course-briefs.test.ts` asserts
  `expect(brief.newWordCap).toBe(NEW_WORD_CAP)`. Where a module should spend less than that, the
  NOTE binds rather than the cap — which has worked twice, L3-M10 shipping with ONE surface added.
- **M10's items are capped at eight sentences**, matching L3-M10, with the per-sentence bound applying
  INSIDE the piece. Its new-word spend should be zero or near it: the exit of the product is assembly.
- **M3 is the only module in the course with a split payload** — production (`-neyo`, `-jyo`, the
  contraction, the address rules) against comprehension-only (the dialect). The pool carries what a
  learner hears; no sentence slot asks them to produce a dialect form.
- Every module ships fully enriched, as all forty below it do.

## 6. What L5 defers — and this is the last level, so each one is a hole

Nothing may be deferred past here. Four things end without an owner, and naming them as product
holes is the honest close:

1. **Banmal as a written sentence.** Fifty modules, no plain style, enforced by `PLAIN_STYLE`. At L5
   the cost stops being theoretical: **M2's teasing, M3's generational speech and M9's tale told to a
   child all live in banmal in real life**, and each brief has to say so and then not write it. This
   is the largest known gap in the course and it is a level-list decision, not an authoring one — a
   sixth level or a banmal module would be a new issue, not a rewrite of anything shipped.
2. **The written `-(neu)nda` style.** Deferred by L4-M1, M7 and M10 and now by L5-M4, M6 and M9. A
   learner finishing this course can speak Korean and cannot read a newspaper, a recipe or a
   storybook, which is a defensible scope for a spoken course but must be recorded as chosen rather
   than overlooked.
3. **`-ji mal geol geuraesseoyo`, the prohibitive regret** (`docs/102` Q93). Barred at L4-M3 by the
   `mal` collision and barred here for the identical reason. If the native gate confirms it is the
   commoner form, the remedy is a content fix to **L3-M5's row** so the bare `mal` key stops being
   minted — an issue against L3, not an L5 module.
4. **`sajaseongeo`, the four-character hanja idiom.** L5-M1 owns the figurative everyday and stops at
   phrases people say; the four-character set is a written-register object and there is nowhere in a
   two-speech-level spoken course to put it.

## Why the en-ko L5 ladder teaches what it teaches

The jobs are `content/en-ko/levels.json`'s and are mirrored verbatim; what the briefs add is which
English→Korean delta each job carries, and each pressure point lands in the module whose job cannot
be done without it.

The fixed phrase in M1, because an idiom is a lexical item and not a metaphor to solve, and because
the whole-key ruling is the only thing that stops `nun-i nopayo` resolving onto a row about
eyesight. The disclaimer in M2, because English marks a joke with tone and Korean marks it with a
sentence, and a learner's deadpan is simply heard as a claim; the hyperbole frame goes there with
it. The two stance endings in M3, because their ABSENCE is what makes correct Korean sound like a
form being read out, while the dialect stays where a learner actually meets it, in the ear. The
recited formula in M4, because English condolence varies as a sign of sincerity and Korean
condolence does not vary at all — the single largest pragmatic reversal in the level. Free-standing
clause nominalisation in M5, because the course has used `-gi` three times inside fixed frames and
never once let a clause be a subject, which is what abstract talk is made of. The bracketed
`waenyahamyeon … -gi ttaemun-ieyo` in M6, because English has no forward-announcing *because* and a
five-sentence case falls apart without one. The hint in M7, because Korean hints by DEFAULT wherever
English hints by choice, and because sarcasm in a course with no audio can only be taught for
reception. The repair kit in M8, because it turned out to be almost entirely bought already and is
the module that makes the other forty-nine survivable outside the app. Register as the only variable
in M9, because Korean carries a retelling's stance in the ending where English carries it in tense.
And in M10 almost nothing new at all: eight sentences, one switch, and the rule that the switch
follows the ADDRESSEE and not the mood.

`npm run content:prompt -- en-ko L5-M1` renders from the real index, and the bounds, the
withheld-piece owners, the collision rulings and the holes in §6 should be pinned by
`tools/course-briefs.test.ts` (`en-ko L5: the decisions its briefs settle (#571)`) as the L2, L3 and
L4 sets are.

## Open questions for the native-speaker gate

Continuing this course's chain: `docs/93`/`docs/102`'s L4 questions run to **120** (L1–L3 live in
`docs/68` and `docs/84`), so these begin at 121. Nothing here may be closed by an authoring wave
rewriting a shipped module.

121. **The four body-part idioms** (M1). Confirm `nun-i nopayo`, `son-i keoyo`, `bal-i neolbeoyo` and
     `ip-e majayo` are all current everyday speech rather than one live idiom and three dictionary
     entries, and name any fifth that belongs beside them ahead of one of these.
122. **Who a `sokdam` may be quoted to** (M1). The brief claims a proverb aimed at a stranger or an
     elder reads as lecturing. Confirm, and rule on whether quoting one about oneself is exempt.
123. **`-raneun mal-i isseoyo` against `-rago haeyo`** (M1). Confirm the citation frame is what a
     speaker actually says before a proverb, and that the gloss frame `-raneun tteus-ieyo` is what
     they say when asked to explain one.
124. **The disclaimer's position** (M2). Confirm `nongdam-ieyo` follows the remark rather than
     preceding it, and rule on whether `jangnan-ieyo` is interchangeable or is specifically for a
     physical or childish tease.
125. **`jugeul ppeonhaesseoyo` as comedy** (M2). The module's load-bearing claim and the reason the
     `docs/93` orphan lands here. Confirm the frame is heard as exaggeration in ordinary talk and not
     as a report of real danger, and that `gyeou` is its natural partner for *barely*.
126. **Teasing upward** (M2). Confirm a tease aimed at an elder is wrong in any tone, and rule on
     where the line falls with a `seonbae` a few years older whom you know well.
127. **`-jyo` against `-janayo`** (M3, and L4-M4). The brief splits them as *invites you to agree*
     against *tells you that you agree*. Confirm, and confirm `-jyo` is safe with a stranger where
     `-janayo` (question 96) is not.
128. **`-neyo` on something you were just told** (M3). Confirm this reads as having only now believed
     the speaker, which is the brief's claim, and that the ending is genuinely restricted to
     first-hand noticing.
129. **`dangsin`** (M3). Confirm it is wrong as an everyday *you* rather than merely formal, and name
     what a learner should do when they know neither name nor title.
130. **`i-ge` against `i-geo-ga`** (M3; closes `docs/102` question 101 forward rather than backward).
     Confirm the contraction is the spoken norm across registers, and that teaching it at L5 without
     touching L1-M1's shipped rows is the right resolution.
131. **How much dialect a learner can be shown** (M3). The module is comprehension-only. Confirm the
     southern shapes chosen for the pool are the ones a visitor actually hears, and rule on whether
     any Jeju material belongs at all or is beyond recognition for a learner at this level.
132. **The condolence formula** (M4). The level's sharpest claim: that
     `samga goin-ui myeongbog-eul bimnida` is recited whole and that improvising is worse than
     silence. Confirm, and name what a non-Korean is actually expected to say if anything.
133. **The toast** (M4). Confirm `geonbae` and `N-eul/reul wihayeo` are both current, and rule on
     whether a learner should ever propose one rather than answer one.
134. **`chukhahamnida` and its occasions** (M4). Confirm the deferential form is what is said at a
     wedding, and name the occasions where `chukhahaeyo` would be right instead.
135. **`gachigwan` for values** (M5). Chosen over `gachi` for the collision in §4 seam 1. Confirm
     `gachigwan` is what a speaker uses in an ordinary conversation about what matters, and is not
     too bookish for the register this course speaks.
136. **`-neun geo` against `-(eu)m` and `-gi`** (M5). Confirm `-neun geo` is the spoken nominaliser
     and that the module is right to teach it alone, leaving `-(eu)m` unwritten; name any frame at
     this level where `-gi` is obligatory instead.
137. **`-(i)raneun geo-seun`** (M5). Confirm the definition frame is natural in speech rather than
     essayistic, and that the attached `-(i)raneun` spelling matches how it is said.
138. **The `waenyahamyeon` bracket** (M6). Confirm the two halves really are used together, and that
     `waenyahamyeon` alone or `-gi ttaemun-ieyo` alone is the weaker sentence the brief claims.
139. **`geureoke saenggakhal su-do isseoyo`** (M6). Confirm this is how a speaker raises an objection
     against themselves, and that it does not read as agreeing.
140. **The ordinals in speech** (M6). Confirm `cheotjjae`, `duljjae` and `majimageuro` are said aloud
     in an ordinary argument rather than only written, and name what replaces them if not.
141. **The hint as a request** (M7). Confirm `bang-i jom chumneyo` is heard as *close the window*
     rather than as small talk, and that `jom` is what carries the request.
142. **`-(eu)lkkayo` after forty modules without it** (M7). Confirm the self-directed proposal is
     common enough that its absence from L1–L4 is a real gap, and that M7 is the right place for it
     rather than an earlier level in a later revision.
143. **Sarcasm taught for reception only** (M7). Confirm `jal handa` said of a mistake is the
     recognisable marked case, and confirm the brief's rule that a learner attempting Korean sarcasm
     is heard as sincere or rude and never as funny.
144. **`nunchi`** (M7). Confirm the noun is used about people the way the module teaches it
     (`nunchi-ga eopseoyo`), and that naming the skill is not itself rude.
145. **`mworagoyo`** (M8). Confirm it is a neutral repair request and not a challenge, and name the
     softer form if there is one a learner should prefer.
146. **`geureon tteus-i anieyo`** (M8). Confirm cancelling the wrong reading directly is the ordinary
     repair rather than a restatement, and that it is safe upward.
147. **The circumlocution frame** (M8). Confirm `jong-i-reul jareuneun geo` is what a speaker says
     when the noun is missing, and that ending on the bare `geo` is natural rather than childish.
148. **Which tale M9 retells.** Proper nouns index, so the cast is a budget decision. Name one or two
     tales every Korean adult knows that can be told in eight sentences with two named characters or
     fewer.
149. **`i iyagi-neun …-raneun iyagi-yeyo`** (M9). Confirm the frame narrator is how a retelling
     announces itself, and that it does not sound like a school exercise.
150. **No historic present in narrative** (M9). Confirm a Korean retelling stays in the past, and
     that a present-tense narration reads as a summary rather than as liveliness.
151. **The register switch's trigger** (M10). The module's law. Confirm a speaker moves between `-yo`
     and `-(seu)pnida` at a change of addressee or footing and not at a change of mood, and name the
     commonest real trigger a learner will meet.
152. **Dropping from `-(seu)pnida` to `-yo` mid-piece** (M10). The brief calls this the hardest and
     most useful of the three shapes. Confirm it happens, and that it does not read as a lapse.
