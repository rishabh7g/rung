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
