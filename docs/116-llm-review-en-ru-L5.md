# en-ru L5 — LLM review

The review that clears each en-ru L5 wave to ship, written in the same change that authors it
(`CLAUDE.md`, "Ship `verified: true` in the authoring change"). The **native-speaker gate is a
separate, stricter bar and stays unmet**: every section below ends in open questions for a native
pass, and no later wave may close one of them by rewriting a shipped module.

Open questions CONTINUE the chain `docs/107-en-ru-L5-brief-decisions.md` opened, whose last number
is 109. Nothing already numbered is renumbered here.

## Wave 1 — L5-M1, L5-M2 (#576)

Authored against the briefs in `tools/course-briefs.ts` and the decisions recorded in `docs/107`.

**The index this wave was written against.** Not the brief's account of it, and not a grep: every
claim below was put to `npm run content:owner -- en-ru …`, which folds the emitted
`public/content/en-ru/index/` files. On 2026-09-08 that tool closes each run with

```
966 surfaces owned, folded over 40 modules through L4-M10
```

and the deepest emitted index, `public/content/en-ru/index/L4-M10.json`, carries
`"surfaceCount": 966` and `"maxSpan": 3`. The L5-M1 brief's INDEX SEAM claims "the 966-surface fold
through L4-M10" — that number had **not** gone stale, and this is worth recording precisely because
the standing warning is that it usually has. The `maxSpan` of 3 had not gone stale either, which is
what makes this wave's raise to 4 the deliberate act the brief says it is.

### L5-M1 "Sayings and idioms" — the first module whose meaning is not in its parts

The ten displays, in order:

1. `Ya vsyó sdélal, i délo v shlyápe.`
2. `Ne nádo délat' iz múkhi sloná.`
3. `U menyá rúki ne dokhódyat do rabóty.`
4. `U menyá vsegdá rúki ne dokhódyat do písem.`
5. `Ya sevódnya ne v svoyéy tarélke.`
6. `Oná i yeyó sestrá kak dve kápli vodý.`
7. `Závtra u menyá ekzámen, i ya ne v svoyéy tarélke.`
8. `Ni púkha ni perá! — K chyórtu!`
9. `S lyógkim párom! — Spasíbo!`
10. `Ty iz vánnoy? S lyógkim párom!`

What it teaches. Eight idioms, each indexed **whole**, plus the three surfaces the sentences around
them need. The system is the FROZEN PHRASE and its one law — it does not inflect. Four levels have
taught that Russian agrees; this is the module that says where agreement stops. `ni púkha ni perá`
is a genitive answering to no verb in the sentence; `s lyógkim párom` is an instrumental with
nothing to govern it; `ne v svoyéy tarélke` carries its own `ne` inside and can never have it moved
out in front of the verb. `délat' iz múkhi sloná` is the one member whose verb still conjugates, and
that is said out loud on S02 and shown in its two variations, because a learner four levels into an
agreeing language will try to make the other seven agree as well.

The second half of the system is the RITUAL PAIR. Two of the eight demand a fixed answer, so they
are shipped as two-turn plates: S08 shows `Ni púkha ni perá! — K chyórtu!` and S09 shows
`S lyógkim párom! — Spasíbo!`, with the wrong reply on each `mistake` block. Answering
`ni púkha ni perá` with `spasíbo` is the module's headline interference — grammatical, polite and
the single most visible foreign move available here.

Register carries the rest: `rúki ne dokhódyat` goes anywhere, `s lyógkim párom` belongs to one
doorway and is a joke outside it, and rule 4 names the *poslovitsa* (`Tíshe yédesh', dál'she
búdesh'`) once in prose to say the course does not teach it. Nothing ironic is taught — L5-M7 owns
the sentence that means its opposite.

Rows opened (13 surfaces, cap 25): `délo v shlyápe`; `délat' iz múkhi sloná` with
`délayesh' iz múkhi sloná` and `délayet iz múkhi sloná`; `rúki ne dokhódyat`; `písem`;
`ne v svoyéy tarélke`; `kak dve kápli vodý`; `ekzámen`; `ni púkha ni perá`; `k chyórtu`;
`s lyógkim párom`; `vánnoy`.

`písem` is the level-never-edits-below law in action. It is the genitive plural of `pis'mó`, which
`content:owner` puts at `L1-M5`; the shape has never been shown, so it takes **its own row in this
module**, with a note pointing back at the first-teach row. `L1-M5.json` is untouched.

### L5-M2 "Humour and teasing" — the suffix that carries what English puts in an adjective

The ten displays, in order:

1. `Ya prósto shuchú.`
2. `Ne obizháysya, ya prósto shuchú.`
3. `On smeyótsya nádo mnoy.`
4. `Nu ty dayósh'!`
5. `Éhto ne dom, a dómik.`
6. `Vot kníga, a vot knízhka.`
7. `Bol'sháya sobáka i málen'kaya sobáchka.`
8. `Éhto Iván. Dlya menyá on Ványa.`
9. `Vánechka, ne obizháysya, ya prósto shuchú.`
10. `Éhto óchen' smeshnáya shútka.`

What it teaches. DIMINUTIVES as a derivational system rather than a word list — three suffix
families across S05-S07 (`dom` → `dómik`, `kníga` → `knízhka`, `sobáka` → `sobáchka`), each pair
shown with its base word beside it, because a diminutive with no base teaches nothing. The
consonant shift is taught as part of the word (`g` → `zh`, `k` → `ch`), so the derived form is
learned rather than computed. Each derived form is **its own row**, not a case shape riding its
noun's row: `docs/56` §4's rule is about case shapes, and this wave records that it does not reach
derivation — exactly as L4-M7's `otpravléniye` sits beside `otpravlyáyetsya`.

The name series is S08 and S09: `Iván` the passport, `Ványa` the friend, `Vánechka` affection or
teasing decided by the voice. The interference that costs a relationship rather than a mark gets
rule 3 and S09's `trap`: a diminutive is INTIMACY, not politeness, so `Vánechka` to a colleague is a
presumption and to a stranger a rudeness — and English speakers reach for it in precisely that
wrong place, having under-produced it everywhere else.

The verb half is S03: `smeyát'sya` **nad** plus the INSTRUMENTAL, the case `L3-M2`'s
`rabótayu inzhenérom` already opened, so the module opens a preposition and no case at all. Two hard
facts are stated plainly — `nad` plus instrumental is laughing AT and never laughing WITH (there is
no Russian frame for the warm version), and the preposition grows an `o` before `mnoy`.

Boundaries held: no irony as a system (L5-M7's), no slang or generational marking (L5-M3's), no mat
— said once in rule 4 and not gestured at again — and the `ty`/`vy` line is re-used from L2-M6, not
re-taught.

Rows opened (20 surfaces, cap 25): `shuchú` + `shútish'`; `ne obizháysya`; `smeyótsya` + `smeyús'` +
`smeyósh'sya` + `smeyát'sya`; `nad` + `nádo mnoy`; `nu ty dayósh'`; `dom`; `dómik`; `knízhka`;
`sobáka`; `sobáchka`; `Ványa`; `Vánechka`; `shútka`; `smeshnóy` + `smeshnáya`.

## The brief seams, checked against the real index

Every line below is what `npm run content:owner -- en-ru "<surface>"` printed on 2026-09-08, against
the 966-surface fold. Where the brief and the index disagreed, **the index won**.

### 1. `segódnya` is not this course's spelling — `sevódnya` is

L5-M1's pattern list writes `Ya segódnya ne v svoyéy tarélke`. The tool:

```
segódnya	free
sevódnya	L1-M10
```

The course romanizes сегодня phonetically, with the `v` that is actually said. Writing the brief's
spelling would have opened a second surface for a word L1-M10 already owns and left a learner
tapping it with no note at all. S05 and S07 ship `sevódnya`. This is the exact class of error the
standing warning names — a surface that looks right on the page and is not the shipped one — and it
was invisible to everything except the tool.

### 2. `smeshnó` is free, but `sméshno` is L4-M10's — so this wave shipped neither

L5-M2's fresh-key list ends in `smeshnó`. The tool:

```
smeshnó	free
sméshno	L4-M10
```

`smeshnó` really is free, so the brief's claim passes the letter of the check. It fails the point of
it: the two strings are the same Russian word (смешно) at two different stress marks, and shipping
`smeshnó` would have put смешно into the ladder twice with two accents and two notes. The
level-never-edits-below law forbids fixing `L4-M10.json`, and the "new shape gets its own row" law
does not apply — a re-accented spelling is not a new shape.

So this wave shipped **the adjective instead**: `smeshnóy` / `smeshnáya`, both free, both correctly
stressed, and a better fit for a module about jokes than a bare predicative adverb. The adverb is
left alone; question 116 below hands the stress itself to the native pass.

### 3. `nad mnoy` is not sayable — and `nádo mnoy` walks straight into L3-M4's `nádo`

L5-M2's brief lists `nad` as a fresh key and says nothing about the `o`-form. Russian's preposition
grows one before `mnoy` (надо мной), and its romanization tokenizes as two tokens the first of which
is a word this course already owns:

```
nad	free
nádo	L3-M4
nádo mnoy	free
```

Left as two loose tokens, a learner tapping `nádo` in `On smeyótsya nádo mnoy` would be handed
L3-M4's note — "it is necessary" — under a preposition. So `nádo mnoy` is indexed as a **two-token
whole key**, listed in the `nad` row's `forms`; the resolver's longest-match walk reaches it before
it can reach the bare `nádo`, and the learner gets the right note. S03's second variation
(`Ne nádo smeyát'sya.`) deliberately shows the real `nádo` a line later, so the two are seen side by
side. `content:owner` confirms the whole key was free before this module.

### 4. `dom` is free, and the brief's fresh-key list forgot it

The brief's diminutive example is written "(dom, dómik)" in prose, but only `dómik` appears in the
fresh-key list. The tool:

```
dom	free
dóma	L1-M5
domóy	L1-M5
```

L1-M5 owns the two adverbs (at home, homewards) and not the noun. S05 shows both halves of the pair,
so `dom` needed a row of its own or its display would have been shown-but-untaught. It has one.
Note that this is *not* a re-teach: `dóma` and `domóy` are different surfaces, and the fold never
saw the bare noun.

### 5. `dayósh'` and `obizháysya` are listed as fresh keys but must not be shipped as bare rows

The same brief note lists `dayósh'` and `obizháysya` among the fresh keys and then says to index
`nu ty dayósh'` and `ne obizháysya` **whole**. Both are true statements about free surfaces, and
taken together they are a trap: a bare row plus a whole-key row is two reachable keys, but every
display in the module shows the whole phrase, so the bare row would never be reached by anything and
`nu`/`ty`/`ne` would still resolve to their own owners. This wave ships the whole keys only —
`nu ty dayósh'` (three tokens) and `ne obizháysya` (two) — which is what makes the tease open one
note rather than four true-but-useless ones. Bare `nu` stays free for L5-M3, as the brief asks.

### 6. The rest of both briefs' seam lists held exactly

Confirmed as printed, with no correction needed. L5-M1: `délat' L2-M8`, `rúki L3-M7`, `vodý L2-M3`,
`dve L1-M5`, `kak L1-M2`, `iz L1-M1`, `do L2-M4`, `menyá L1-M1`. L5-M2: `kníga L1-M3`,
`prósto L4-M5`, `ne L1-M3`, `ty L2-M6`, `Iván L1-M1`, `Ánna L1-M1`, and `nu` free.

The claim that the bare parts of the idioms stay unclaimed also held, before and after: `délo`,
`shlyápe`, `púkha`, `perá`, `múkhi`, `sloná`, `kápli`, `svoyéy`, `tarélke`, `lyógkim` and `párom`
each printed `free`, and they are still free after this module, because a whitespace surface with no
hyphen in it earns exactly one index key (`surfaceIndexKeys` splits hyphens and nothing else). A
later module wanting bare `délo` may still have it.

### 7. Three surfaces neither brief listed, which the sentences needed

`ekzámen` (free), `vánnoy` (free) and `písem` (free) are shipped as rows. The first two are ordinary
new vocabulary that the two ritual pairs cannot be staged without — a wish needs something to wish
at, and `s lyógkim párom` needs a doorway. `písem` is the point-back row described above.

## The ratchet

- **maxSpan 3 → 4, deliberately, and this wave is where it happens.** `L4-M10.json` emits
  `"maxSpan": 3`; four of L5-M1's eight idiom keys are four tokens (`ne v svoyéy tarélke`,
  `ni púkha ni perá`, `délat' iz múkhi sloná`, `kak dve kápli vodý`). `maxSpanOf` in
  `tools/content-build.ts` derives the number from the keys, so nothing is configured and nothing is
  raised by hand — but the resolver's greedy walk now looks four tokens ahead on every en-ru
  display. The ceiling stays 4: **no L5 module of this course may write a five-token key.**
- **Shown surfaces: no new findings, in either module.**
  `npm run content:shown -- en-ru L5-M1` and `… L5-M2` both print
  `clean — every shown surface resolves`, with **zero** `RE-TEACH` lines and zero
  `COLLIDES INSIDE THIS MODULE` lines. No row of either module opens a key an earlier module owns,
  and no two rows of one module open the same folded key — which is why neither module needed the
  deliberate-repeat exception, and no note in this wave is duplicated to buy one.
- **`tools/shown-surfaces.test.ts`: 11/11, en-ru held at 20.** The baseline was neither raised nor
  lowered. This wave adds nothing to it and fixes nothing in it — the twenty are older findings and
  are not this wave's to move.
- **`npm run content:validate`: `CONTENT 377/377 ok`** — every module file in `content/`, both
  of this wave's included. The denominator moves while nine waves land in the same checkout;
  what matters is that it equals the numerator.
- **`src/course/types.test.ts`**: the en-ru lane case (#353) passes — display Latin, script
  Cyrillic, no Cyrillic character anywhere in a romanized or English field, every acute precomposed
  and NFC, every sentence carrying `sound`, `literal`, `usage` and `mnemonic`, and every word row
  carrying a `note`. The two failures in that file at the time of writing are the module census
  (360 vs the modules nine parallel waves are adding) and hi-en's own count guard; neither is en-ru
  and neither is this wave's to change.
- **Prerequisites**: `L5-M1` takes `[]` and `L5-M2` takes `["L5-M1"]` — earlier in the same level,
  never an L4 module.
- **Enrichment**: both are M1-M3, so every sentence ships all five blocks (`sound`, `variations`,
  `mistake`, `usage`, `mnemonic`). Every `note` is inside the 200-character ceiling.

## Open questions for the native pass

These continue the chain at 109 and are **not** closed by this wave. No later authoring wave may
close one by rewriting a shipped module.

110. **The obligatory reply to `ni púkha ni perá`** (M1, S08). Confirm that `K chyórtu` is still the
     only reply among speakers under forty, and that `spasíbo` is genuinely heard as cancelling the
     wish rather than merely as a foreigner's answer. If it has softened into an ordinary
     good-luck-and-thanks exchange, S08's `mistake` block is overstated and the trap should be
     re-graded.
111. **`S lyógkim párom` outside the banya** (M1, S09-S10). The module claims one situation only and
     a joke everywhere else. Confirm whether it is said after an ordinary shower at home, or whether
     it really is confined to a bath and a banya — S10 stages it at a bathroom door and would need
     rewriting if that is already the joke reading.
112. **`rúki ne dokhódyat` and its fixed plural** (M1, S03-S04). Confirm that the singular
     `ruká ne dokhódit` is never said, rather than merely rare. It is shipped as the `mistake` block
     on S03, which is the strongest claim in the module.
113. **`ne v svoyéy tarélke` frozen at `svoyéy`** (M1, S05). Confirm that `ne v moyéy tarélke` is
     wrong rather than unusual, and that the phrase reports a mood and never an illness.
114. **The conjugating idiom** (M1, S02). Confirm that `délayesh' iz múkhi sloná` and
     `délayet iz múkhi sloná` are the forms actually heard, and say whether the perfective
     `sdélat' iz múkhi sloná` is common enough that a later module should open it. This wave shipped
     imperfective only.
115. **`délo v shlyápe` register** (M1, S01). Confirm it is current rather than dated, and that a
     speaker under thirty would use it without irony. If it is dated, it is the wrong opener for the
     level.
116. **`sméshno`, and a stress this level cannot fix** (M2, seam 2). `L4-M10` ships `sméshno` for
     смешно, which this wave believes should be `smeshnó`. The level-never-edits-below law puts it
     out of reach here. Rule on the stress, and if it is wrong, say which change is allowed to fix a
     shipped L4 surface — this is the first case in en-ru where a lower level appears to hold a
     defective spelling and a higher level has no legal move.
117. **Marking stress on a proclitic preposition** (M2, S03). `nádo mnoy` is shipped with the acute
     on `nádo`, because the scheme marks every polysyllable, but in speech the stress is on `mnoy`
     and `nádo` is unstressed. Rule on whether the scheme should mark citation stress on a form that
     never carries it, or leave such prepositions bare.
118. **`Vánechka`'s boundary** (M2, S09). Confirm the two claims shipped in rule 3 and S09's trap:
     to a colleague it is a presumption, to a stranger a rudeness. Also say whether `Vánechka`
     between adult male friends reads as teasing rather than affection, since the module leaves that
     to the voice.
119. **`Nu ty dayósh'` and generational marking** (M2, S04). Confirm it is not marked as older
     speech. If it is, it belongs to L5-M3 with the rest of the marked material, and this module
     needs a replacement pattern.
120. **The belittling diminutive on a thing** (M2, S06). Confirm that `knízhka` of somebody's
     serious book is heard as slighting it, rather than as neutral or merely informal. The trap on
     S06 is the only place this module warns rather than encourages.
121. **`sobáchka` as affection, not size** (M2, S07). Confirm that a large dog its owner loves can
     be a `sobáchka`, which is what S07's `mistake` block rests on.
122. **`smeshnóy` of a person** (M2, S10). Confirm that `Ványa óchen' smeshnóy` reads as *funny* and
     not as *ridiculous*, which the same adjective can carry. If the ridiculous reading is live, the
     variation on S10 is a trap rather than a compliment and must be re-cued.
123. **A stress list, continuing questions 77, 89 and 109.** Every mark this wave writes for the
     first time, for confirmation as a block: `délo v shlyápe`, `múkhi`, `sloná`, `dokhódyat`,
     `písem`, `svoyéy`, `tarélke`, `kápli`, `vodý`, `ekzámen`, `púkha`, `perá`, `chyórtu`,
     `lyógkim`, `párom`, `vánnoy`, `shuchú`, `shútish'`, `shútka`, `obizháysya`, `smeyús'`,
     `smeyósh'sya`, `smeyótsya`, `smeyát'sya`, `dayósh'`, `dómik`, `knízhka`, `sobáka`, `sobáchka`,
     `Ványa`, `Vánechka`, `smeshnóy`, `smeshnáya`.

## Wave 2 — L5-M3, L5-M4 and L5-M5 (#585)

The RANGE modules of the level: where the speech is placed (M3), where the occasion is (M4), and
where the subject is not in the room at all (M5). Authored against the briefs in
`tools/course-briefs.ts` and the decisions in `docs/107`, in the same change that flips
`verified: true` on all three.

**The index this wave was written against.** Wave 1 above quotes the tool closing with
`966 surfaces owned, folded over 40 modules through L4-M10`. On 2026-09-08, after wave 1 landed,
every run in this wave closed with

```
999 surfaces owned, folded over 42 modules through L5-M2
```

so the seam moved by 33 surfaces and two modules while this level was being authored. Every claim
below was put to `npm run content:owner -- en-ru …`; nothing here rests on a grep.

### L5-M3 "How they say it there" — the words that carry no meaning and mark you anyway

Ten displays:

1. `Nu, ya prósto ne znáyu, chto skazát'.`
2. `Koróche, ya ne poshlá na rabótu.`
3. `On kupíl mne podárok, típa knígu.`
4. `Ya kak by soglásen, no ne sovsém.`
5. `V óbshchem, vsyó býlo khoroshó.`
6. `Slúshay, davay poydyóm domóy.`
7. `Privét, Ványa! Kak delá?`
8. `V Moskvé govoryát podyézd, a v Peterbúrge — parádnaya.`
9. `V Moskvé éhto bordyúr, a v Peterbúrge porébrik.`
10. `V Moskvé govoryát batón i shaurmá, a v Peterbúrge búlka i shavermá.`

Sixteen rows, eighteen surfaces. Six of them are the DISCOURSE PARTICLE set the brief names —
`nu`, `koróche`, `típa`, `kak by`, `v óbshchem`, `slúshay` (with `slúshayte` in its forms) — taught
as a class in `rules[0]`: unstressed, uninflected, attached to no case, and marking the speaker's
relation to what is said rather than saying anything. `privét` finally gets its own row (S07), which
is what `docs/107` question 4 asked for: L1-M2 named it in a trap and in a mistake plate and never
opened it, so a learner had been told what not to say without being told what it was.

The regional half is four pairs across S08–S10 and is deliberately a vocabulary spend, not a
system: `podyézd`/`parádnaya`, `bordyúr`/`porébrik`, `batón`/`búlka`, `shaurmá`/`shavermá`, plus
`Peterbúrge` as its own row. `rules[3]` says in as many words that the module reports what is said
where and ranks nothing.

Two things the module refuses. It teaches **no phonology**: S09's `usage` says outright that what a
Russian would hear first is the vowel reduction and not the vocabulary, that this course has no
audio and cannot teach that, and that the words are therefore where the difference is visible. And
it does not re-open the register law — `rules[1]` states the downward drift and points at L5-M2's
diminutive as the module that owns it, rather than restating it.

### L5-M4 "Formal occasions" — three frames, three cases, no new case

Ten displays:

1. `Pozdravlyáyu vas s dnyóm rozhdéniya!`
2. `Pozdravlyáyu vas s prázdnikom!`
3. `Zheláyu vam schást'ya i zdoróv'ya.`
4. `Zheláyu vam uspékhov v rabóte.`
5. `Davayte výp'yem za drúzhbu!`
6. `Ya khochú skazát' tost za vas.`
7. `Primíte moí soboléznovaniya.`
8. `Uvazháyemyy Iván, spasíbo vam za vsyó.`
9. `Dorogíye druz'yá i prisútstvuyushchiye, spasíbo vam.`
10. `Závtra svád'ba, i ya dólzhen skazát' rech'.`

Seventeen rows, eighteen surfaces, and the whole spend is nouns: `pozdravlyáyu s` takes the
instrumental, `zheláyu` the genitive, the toast `za` plus the accusative, and all three cases were
already the learner's. `rules[1]` states the genitive after `zheláyu` as the PARTITIVE genitive
L2-M3 opened — you wish somebody *some* happiness — so the frame is a fact rather than a list.

The two mistake plates the brief asked for are S01 (`Pozdravlyáyu vas na den' rozhdéniya!`, English
*congratulate on*) and S03 (`Zheláyu vam schást'ye i zdoróv'ye.`, the accusative out of *I wish you
happiness*). `tost` and `rech'` are both SAID rather than made, and S06 and S10 each carry the
`sdélat'` error as their mistake plate.

`uvazháyemyy` and `prisútstvuyushchiye` are taken as a **closed list of two frozen participial
address forms** and named as participles in `rules[4]`; nothing here forms a participle from a
verb, and the rule says so and points at `docs/107` for the hole.

### L5-M5 "Big questions" — government as meaning, not as a list

Ten displays:

1. `Ya véryu v spravedlívost'.`
2. `On vérit v bóga, a éhto yevó véra.`
3. `Ya vam véryu — u vas chístaya sóvest'.`
4. `Éhto zavísit ot pogódy.`
5. `Vsyó zavísit ot chelovéka.`
6. `Kázhdyy sam dólzhen znat', chto dlya nevó vázhno.`
7. `Glávnoye — éhto ne dén'gi, a schást'ye.`
8. `Délo v tom, chto zhizn' — éhto ne rabóta.`
9. `Ya ne véryu v sud'bú, ya véryu v svobódu.`
10. `Dlya menyá éhto tsénnosti i smysl zhízni.`

Eighteen rows, twenty-eight surfaces. The system is VERB GOVERNMENT taught as the thing that
decides meaning: `vérit' v` plus the accusative (S01, S02, S09) against `vérit'` plus a bare dative
(S03), one verb, two claims, and one English preposition for both. Beside it `zavísit ot` plus the
genitive (S04, S05), whose preposition this course had never opened. The third device is the
IMPERSONAL GENERALISER, which costs no new form at all: `kázhdyy sam …` in S06, `chelovék dólzhen
…` in S06's first variation and S05's second.

`rules[3]` carries the third L1 habit the brief names and the one no mistake plate can hold: an
English speaker hedges an abstract claim until it disappears, and in Russian a flat abstract
statement is normal and is not rudeness. The module reports beliefs and holds none — S02's `trap`
says that in one line, and `bog` and `véra` are vocabulary.

## The brief seams this wave had to correct

### 8. `éto` is not this course's spelling of *this* — `éhto` is, and `éto` is free

The L5-M5 brief's index seam closes its owned list with `éto -> L1-M1`. It is not:

```
éto	free
éhto	L1-M1
```

This is exactly the class of error the wave brief warns about one line earlier for `zná` — a
plausible romanization that the course does not use. The course writes `э` as `éh` throughout
(`éhta`, `éhti`, `éhto`, `éhtot`, `ehkzámen`), so `éto` is a key the index has never met. Had this
wave written the brief's spelling, six displays across M5 alone (S02, S04, S07, S08, S10 and four
pool items) would have been `SHOWN-BUT-UNTAUGHT`, and M3's S09 with them. Every display in all
three modules writes `éhto`, and the allowedPatterns list of L5-M5 was rewritten from the brief's
`Éto zavísit ot + <N-genitive>` to `Éhto zavísit ot + <N-genitive>` for the same reason.

### 9. Bare `v` is L1-M4's, not L1-M7's

The L5-M3 brief justifies indexing `v óbshchem` whole with "since bare `v` is L1-M7's". The module
is wrong; the reason is right:

```
v	L1-M4
```

`v óbshchem` is indexed whole regardless, and so is L5-M5's `délo v tom`. The correction matters
only for what a note may claim: both notes now point at L1-M4.

### 10. The brief's own cautionary tale about `zná` is itself wrong

The wave brief's "never grep for a surface" section says of en-ru's L4-M5 brief: "The shipped
surface is `zná`: the grep was blind to the acute." The tool says otherwise:

```
zná	free
znat'	L4-M5
znáyesh'	L2-M6
znáyete	L4-M5
```

No `zná` surface is shipped at all. What is true — and what L5-M3's own brief states correctly — is
the SPLIT: `znáyesh'` is L2-M6's and `znáyete` is L4-M5's, one paradigm across two modules. So the
lesson survives its example: L4-M5's brief was wrong to say the verb is untaught, but it was wrong
because L2-M6 and L4-M5 own conjugated forms, not because a bare `zná` exists. This wave adds no
third row for the verb; M3's S01 and M5's S06 and S08 use `znáyu`, `znat'` and `ne znáyu` as
already-taught surfaces with no row of their own.

### 11. The romanization of `-ие`: `prisútstvuyushchiye`, not `prisútstvuyushchie`

The L5-M4 brief's fresh-key list writes `prisútstvuyushchie`. Every `-ие` in the shipped index is
`-iye` without exception — `khoróshiye`, `bol'shíye`, `dorogíye`, `síniye`, `krásnyye`,
`málen'kiye`, `vysókiye` — so the brief's spelling would have forked one word into a surface the
course's own convention cannot produce. Shipped as `prisútstvuyushchiye`. Both spellings are free,
so nothing broke; the convention decided it, not the index.

### 12. `Peterbúrge` — the acute is on the third vowel, not the fourth

The L5-M3 brief says `Peterbúrge` carries "no acute on the first syllable and one on the fourth".
The word has four vowels, `e-e-ú-e`, and the stress is on the third of them. The surface the brief
writes is correct; only its description of it is off by one, and a wave that trusted the description
over the spelling would have shipped `Peterburgé`.

### 13. Two more paradigm holes the briefs did not name, and one they did

`prázdnikom` is the greeting's instrumental and it is free, while its dictionary form is not:

```
prázdnik	L3-M9
prázdnikom	free
```

So L5-M4's S02 row opens `prázdnikom` alone, `forms` of exactly one entry, with a note pointing
back at L3-M9 — the same shape the brief called out for `uvazháyemyy`/`uvazháyemye`, which the tool
confirms:

```
uvazháyemye	L4-M7
uvazháyemyy	free
```

The second unnamed hole is `schást'ya`/`schást'ye`. L5-M4 opens the genitive `schást'ya` for the
wish frame; L5-M5, two modules later, opens the nominative `schást'ye` for a subject. Neither row
lists the other's form, and M5's note names M4 as the owner of the genitive. `rozhdéniya` is the
third: it is free, `den' rozhdéniya` is L3-M9's, and this wave opens neither — only the three-token
`s dnyóm rozhdéniya`, so a bare `dnyóm` still reaches L1-M4's daytime note, which is true of that
word and false of the greeting.

### 14. `drúzhbu` carries an acute

The L5-M4 brief writes `za druzhbu` in prose. `дру́жбу` is a polysyllable, so under the en-ru stress
law it is `drúzhbu`, and it ships that way. The brief's own closing line — that `rech'` and `tost`
are monosyllables and carry NO acute — is the other half of the same law and is obeyed: `tost`,
`rech'`, `bog`, `smysl`, `zhizn'`, `sam` and `ot` all ship bare.

### 15. What the briefs got exactly right

Everything else in all three seam lists held, verbatim: `dnyóm -> L1-M4`, `den' rozhdéniya ->
L3-M9`, `za -> L2-M1`, `davayte`/`davay -> L2-M6`, `moí -> L2-M2`, `vam`/`vas`/`spasíbo -> L1-M2`,
`prostíte -> L2-M1` (and `primíte` fresh and not a form of it), `vot -> L4-M10`, `govoryát ->
L4-M7`, `Moskvé -> L1-M1`, `kak -> L1-M2`, `by -> L3-M4`, `právda -> L3-M3`, `dólzhen` and `nádo ->
L3-M4`, `chto -> L1-M9`, `sebyá -> L3-M6`, and the two findings the briefs were proudest of:

```
ot	free
chelovék	free
kázhdyy	L4-M9
kázhdyy den'	L1-M4
```

`ot` really had gone four levels unopened, and `kázhdyy` really did move out from under L1-M4's
whole key when L4-M9 took the bare adjective — so L5-M5's S06 mistake plate is built on exactly
that, showing a learner what `Kázhdyy den' dólzhen znat'` would mean.

Three keys this wave deliberately leaves free for a later module, having shown none of them bare:
`smysl` (only `smysl zhízni` is opened), `délo` (only `délo v tom`), and `soboléznovaniya` (only
`moí soboléznovaniya`).

## The ratchet

- **maxSpan holds at 4.** Wave 1 raised it from 3 and wrote the ceiling down: no L5 module of this
  course may write a five-token key. This wave's longest key is `s dnyóm rozhdéniya` at three
  tokens; `moí soboléznovaniya`, `za vas`, `kak by`, `v óbshchem`, `smysl zhízni` are two and
  `délo v tom` is three. Nothing about the resolver's walk changes.
- **Shown surfaces: no new findings, in any of the three.**
  `npm run content:shown -- en-ru L5-M3`, `… L5-M4` and `… L5-M5` each print
  `clean — every shown surface resolves`, with **zero** `RE-TEACH` lines and zero
  `COLLIDES INSIDE THIS MODULE` lines. No row of any module opens a key an earlier module owns, so
  no note in this wave is duplicated to buy the deliberate-repeat exception.
- **`tools/shown-surfaces.test.ts`: 11/11, en-ru held at 20.** Neither raised nor lowered. The
  twenty are older findings and are not this wave's to move.
- **`npm run content:validate`: `CONTENT 405/405 ok`** — every module file in `content/`, these
  three included. The denominator moved twice during this wave, from 402 to 405, as sibling waves
  landed in the same checkout; what matters is that it equals the numerator.
- **`src/course/types.test.ts`: 426/426.** The en-ru lane case (#353) passes — display Latin,
  script Cyrillic, not one Cyrillic character in a romanized or English field, every acute
  precomposed and NFC, every sentence carrying `literal`, `sound`, `usage`, `mnemonic` and a
  `mistake`, and every word row a `note`. Mid-wave, three cases in that file were red — the module
  census, en-ar's count guard (44 vs 42) and hi-en's (45 vs 42) — and all three were sibling waves'
  counts rather than en-ru's; by the final run those waves had updated them and the file is green.
  Nothing in it was changed here.
- **Prettier**: all three files pass `npx prettier --check`.
- **Prerequisites**: `L5-M3` takes `["L5-M2"]`, `L5-M4` takes `["L5-M3"]`, `L5-M5` takes
  `["L5-M4"]` — earlier in the same level, never an L4 module.
- **Enrichment**: M3 is inside the M1–M3 band, so every one of its sentences ships all five blocks.
  M4 and M5 ship all five anyway, because the en-ru lane case requires `sound`, `usage`, `mnemonic`
  and `mistake.why` on every sentence and a `note` on every word regardless of module number. Every
  `note` is inside the 200-character ceiling; the longest in the wave is 177.
- **Nothing below L5 was touched**, and no other course was touched. The only files this wave
  writes are the three modules and this section.

## Open questions for the native pass — wave 2

These continue the chain at 123 and are **not** closed by this wave. No later authoring wave may
close one by rewriting a shipped module.

124. **The four regional pairs, and whether they are still live** (M3, S08–S10). Confirm that
     `podyézd`/`parádnaya`, `bordyúr`/`porébrik`, `batón`/`búlka` and `shaurmá`/`shavermá` still
     split the way this module says, and in particular that `parádnaya` is current Petersburg
     speech rather than a self-conscious performance of it. This continues question 95, which asked
     the same of the brief's list; the module now ships the answer and it needs checking as shipped.
125. **`búlka` outside Petersburg** (M3, S10). S10's `trap` and the `búlka` note both rest on the
     claim that a `búlka` in Moscow may be a small sweet roll rather than a white loaf. Confirm
     that, because it is the only place in the module where the two cities disagree about the thing
     and not only the word.
126. **Filler density as a claim about speech** (M3, `rules[2]`). Continuing question 94. The rule
     asserts that Russian conversation with no `nu` in it is audibly stiff. Confirm the direction
     and, if possible, the strength: is the absence of fillers heard as foreign, as cold, or as
     careful?
127. **`típa` in the quoting sense** (M3, S03). The note claims `típa` both approximates a noun and
     quotes a speaker, on the model of English *like*. Confirm the quoting use is current and not
     generationally narrow; if it is narrow, the note should say whose speech it is.
128. **`slúshay` against `poslúshay`** (M3, S06). The module teaches only `slúshay`/`slúshayte`.
     Confirm that the perfective `poslúshay` is not the more usual floor-taking form, in which case
     a later module owes it a row rather than this one being rewritten.
129. **`privét` to somebody older but familiar** (M3, S07). The row draws the line at `ty`.
     Confirm the boundary case: an older colleague you are on `ty` terms with — is `privét` right,
     or does age reassert `zdrávstvuyte`?
130. **`uspékhov` as an obligatory plural** (M4, S04). The note claims the wish is always genitive
     plural and never `uspékha`. Confirm, and confirm that `Zheláyu vam uspékhov!` with no field
     named is the ordinary all-purpose form.
131. **`Primíte moí soboléznovaniya` and its register floor** (M4, S07). Continuing question 98.
     Confirm this is what a guest actually says rather than a written formula, and confirm the
     module is right that Russian has no shorter spoken condolence — S07's `trap` rests entirely on
     that, and on `izviníte` being actively wrong there rather than merely thin.
132. **`prisútstvuyushchiye` in speech** (M4, S09). Confirm the participle is used aloud at a
     wedding or a ceremony and is not confined to written programmes; if it is written-only, the
     module's `usage` line overstates it.
133. **`tost` and `rech'` and the `skazát'` verb** (M4, S06, S10). Confirm that both are SAID
     rather than made, and that `sdélat' tost` is wrong rather than merely unidiomatic — two
     mistake plates rest on it.
134. **`svád'ba` and what a guest is actually asked for** (M4, S10). The `svád'ba` note claims a
     guest's whole job is a congratulation and, if asked, a short toast. Confirm, and confirm that
     a `rech'` is the set piece rather than what any guest may be handed a microphone for.
135. **`vérit' v` against the bare dative** (M5, S01, S03). Continuing question 99. Confirm the two
     frames as shipped, and in particular S03's `trap`: that `ya véryu v vas` backs somebody as a
     cause and does not say *I believe what you just told me*.
136. **`u vas chístaya sóvest'`** (M5, S03). Confirm the collocation is `chístaya` and not
     `chístoye` or another adjective, and that the sentence reads as a warm acceptance rather than
     as an ironic accusation.
137. **`zavísit ot` and nothing else** (M5, S04). Continuing question 100. Confirm there is no live
     frame with `na`, so that the module is right to call `zavísit na` simply not Russian rather
     than a register slip.
138. **`chelovék` as *anybody*** (M5, S05, `rules[2]`). Confirm that `Chelovék dólzhen …` reads as
     a claim about people in general and not about a particular man, and that a native ear does not
     hear it as gendered.
139. **`smysl zhízni` and its weight** (M5, S10). The `trap` claims the phrase is ordinary
     conversational Russian rather than literary, and that using it is not a claim to profundity.
     Confirm — an English speaker's instinct is the opposite, and the whole `trap` rests on this.
140. **`Glávnoye — éhto ne dén'gi, a schást'ye` as a natural sentence** (M5, S07). Confirm the
     `ne … a` contrast is the right frame here and that `no` really is wrong rather than
     merely weaker, which is what S07's mistake plate asserts.
141. **A stress list, continuing questions 77, 89, 109 and 123.** Every mark this wave writes for
     the first time, for confirmation as a block: `koróche`, `típa`, `óbshchem`, `slúshay`,
     `slúshayte`, `privét`, `podyézd`, `parádnaya`, `Peterbúrge`, `bordyúr`, `porébrik`, `batón`,
     `búlka`, `shaurmá`, `shavermá`, `pozdravlyáyu`, `dnyóm`, `rozhdéniya`, `prázdnikom`,
     `zheláyu`, `schást'ya`, `zdoróv'ya`, `uspékhov`, `výp'yem`, `drúzhbu`, `primíte`,
     `soboléznovaniya`, `uvazháyemyy`, `prisútstvuyushchiye`, `svád'ba`, `véryu`, `vérit`,
     `vérit'`, `spravedlívost'`, `spravedlívosti`, `bóga`, `véra`, `sóvest'`, `zavísit`,
     `zavísyat`, `chelovék`, `chelovéka`, `vázhno`, `glávnoye`, `schást'ye`, `zhízni`, `sud'bá`,
     `sud'bú`, `svobóda`, `svobódu`, `tsénnosti`, `tsénnost'`. The monosyllables that deliberately
     carry no mark are on the same list for the same pass: `nu`, `tost`, `rech'`, `bog`, `smysl`,
     `zhizn'`, `sam`, `ot`.
