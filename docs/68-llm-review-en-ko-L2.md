# en-ko L2 — LLM review

The review that clears each en-ko L2 wave to ship, written in the same change that authors it
(`CLAUDE.md`, "Ship `verified: true` in the authoring change"). The **native-speaker gate is a
separate, stricter bar and stays unmet**: every section below ends in open questions for a native
pass, and no later wave may close one of them by rewriting a shipped module.

Open questions are numbered as a fresh en-ko L2 chain from 1.

## Wave 1 — L2-M1, L2-M2 (#442)

Authored against the briefs written by #433 and the decisions recorded in `docs/60`. The eight L1
decisions of #373 carry unchanged: Revised Romanization in every L2 slot, pure ASCII, no stress
marks, Hangul only on the `script` line, the particle hyphen with the host keeping its isolation
shape, `jeo` never `na`, and the `-yo` speech level throughout.

### L2-M1 "Asking politely" — the honorific goes on the wrong person

L1 shipped `-si-` inside five whole phrases — `annyeonghaseyo`, `juseyo`, `gaseyo`, `gyeseyo`,
`jinaeseyo` — with the rule named as deferred. This module makes it productive, and the whole of the
lesson is which person it lands on: **`-(eu)seyo` honours the SUBJECT of its own sentence, not the
listener.** `jeo-neun gayo` is right and `jeo-neun gaseyo` is wrong. An English speaker who has
learnt `-(eu)seyo` as "the polite one" gets this backwards on the first try, which is why the trap
and the mistake plate both sit on it.

The request itself is `-a/eo juseyo` — literally "do it and give it to me" — with L1-M3's `juseyo`
as the second half of every one. Each fused form is ONE whitespace token: `dowajuseyo`,
`gidaryeojuseyo`, `sseojuseyo`. Not hyphenated, because the hyphen in this course marks a particle
boundary and hyphenating here would mint `juseyo` a second time as a junk key.

`jom` is the module's best single word: literally "a little", functionally "please", and it goes in
front of almost any request without changing anything else in it.

The ability question `V-(eu)l su isseoyo?` is the softer alternative, and it is L1-M6's `-l` shape
doing a new job in front of a noun. **Korean has no verb "can"**: it has `su`, a noun meaning "way",
and L1-M3's `isseoyo`. That is why the negative is `su eopseoyo` — "there is no way" — and `su` is
the whole of what the construction costs.

### The chip, and the value that is missing on purpose

A line whose subject is honoured chips `formal`; plain `-yo` stays `neutral`; and **`informal` is
never used in this course**, because the forms that would earn it are banmal, which L1 banned and
this level does not lift. That is said out loud in rule 4 so a missing value reads as a decision
rather than an oversight.

### A test the L2 arrival required

`src/course/types.test.ts` asserted that `-mnida` appears in exactly two frozen phrases and nowhere
else — correct for a course that never taught the two speech levels side by side. L2-M1's whole job
includes teaching exactly that pair (`gomawoyo` against `gamsahamnida`, `mianhaeyo` against
`joesonghamnida`), so the set is widened by ONE at L2 and by one only: `joesonghamnida`, which the
brief charters. L1 keeps the original two, and any other `-mnida` is still a style slip.

Two consequences were taken rather than argued around. `gomapseumnida` was dropped from the
`gomawoyo` row — the briefs charter the apology pair, not a second thanks — and S09's mistake plate
was rewritten off `mianhamnida` onto `Mianhaseyo`, which teaches the module's own rule (you never
honour yourself) instead of smuggling in a fourth formal form.

This is the fourth time in the milestone that a second level has exposed a test encoding the LEVEL
as well as the rule, after hi-en's possessive ban, en-fr's `tu` ban and en-de's capital check.

### L2-M2 "Describing people" — the double subject

Korean's signature sentence, and English has no version of it: `jeo-neun ki-ga keoyo` means "I am
tall" and is built as *for-me, the-height is-big* — a topic, then a subject, then a predicate. Every
learner reaches for a copula instead. L1 had already shipped every piece (L1-M9's `joayo`,
`masisseoyo` and `bappayo` are descriptive verbs; L1-M1's `-eun/-neun` and `-i/-ga` are the
particles), so the module is assembly rather than new grammar and the mistakes go on the shape.

The rule that makes it possible: **Korean adjectives ARE verbs.** L1 taught four of them without
naming the class; this names it, and then teaches the `-(eu)n` shape they need to stand in front of
a noun. That shape lives in the SAME word row as its `-yo` shape, because it is one word wearing two
coats.

The family set is where **Korean is richer than English and the delta runs the other way**, so it is
not extra vocabulary: `hyeong` and `nuna` are what a MAN calls his older brother and sister, `oppa`
and `eonni` what a WOMAN calls hers, and there is no word for "older brother" that does not encode
the speaker's own gender. `dongsaeng` covers a younger sibling of either and encodes nothing —
English is precise about the younger one and vague about the older, and Korean is exactly the other
way round. Each of the four is authored with the speaker named in its own cue, so a learner cannot
file them as synonyms.

Honorific kinship needs no new machinery: `eomeoni`/`abeoji` against `eomma`/`appa` is a choice about
who is LISTENING; `-nim` raises a title, which is why L1-M1's `seonsaengnim` already carries one; and
`gyesida` is a whole separate honorific VERB for a person being somewhere, which L1-M2 shipped as
`gyeseyo`. That is M1's decision in the field — a handful of very common verbs have a different word
rather than an infix — so the module points back rather than opening anything.

### The ratchet

`tools/shown-surfaces.test.ts` held at **en-ko 12** across both modules. Every finding was fixed by
opening the surface on the row that already owned its word — `dowajul` and `gidaryeojul` beside
their `juseyo` forms, `malsseumhae` beside `malsseumhaseyo`, the whole `hyeong`/`oppa`/`nuna`/`eonni`
set on one row (which is what the brief asks for anyway), `jagayo`/`jageun` and
`jjalbayo`/`jjalbeun` beside their opposites. One variation was rewritten instead, off `jeongmal`,
which no module has yet earned.

### A red on main that is not this wave's

`scripts/verify.sh` fails one test on `main`: the splash byte-for-byte comparison introduced by #502
is rasteriser-dependent, and this container's libvips differs from whichever machine produced the
committed PNGs. Filed as #506 with the evidence. Everything else is green.

### Open questions for the native pass

1. **`jom` placement** (M1-S01). Confirm `Mul jom juseyo` is where a speaker puts it, and that
   `Jom mul juseyo` really is odd rather than merely less common.
2. **The fused request spelling** (M1, rule 1). Confirm `dowajuseyo` written solid is at least as
   ordinary as `dowa juseyo` spaced, since the course must pick one.
3. **`-(eu)seyo` on oneself** (M1, rule 0). Confirm `jeo-neun gaseyo` lands as a real error rather
   than as a quaint one, and that a listener notices immediately.
4. **`malsseumhaseyo`** (M1-S04). Confirm it is the ordinary way to ask somebody to speak slowly, and
   whether `cheoncheonhi malsseumhae juseyo` is in fact commoner.
5. **`su` as a noun** (M1-S07). Confirm the "there exists a way" framing helps rather than
   over-explains, and that `su eopseoyo` is the negative a learner will hear.
6. **`gomawoyo` against `gamsahamnida`** (M1-S08). Confirm the warm/formal split as described, and
   that `gomawoyo` is safe with a stranger of similar age.
7. **`gwaenchanayo`** (M1-S10). Confirm all four jobs — answering thanks, answering an apology,
   asking after somebody, declining an offer — and that intonation alone separates the question.
8. **The double subject** (M2, rule 0). Confirm `Jeo-neun ki-ga keoyo` is what a speaker says, and
   that dropping `jeo-neun` once the topic is established is as free as the module claims.
9. **When one subject is enough** (M2-S03). Confirm the split the module draws — whole person takes
   one, a part or property takes two — is a fair rule of thumb.
10. **`nun` for eye** (M2-S10). Confirm teaching only the eye reading is safe, and that the snow
    homograph does not cause trouble at this level.
11. **`eomma` from an adult** (M2-S07). Confirm it really does sound childish to a stranger, and that
    `eomeoni` is what an adult says about their own mother to somebody outside the family.
12. **`ne` for four and `ne` for yes** (M2-S09). Confirm they are said identically, and that the
    homograph is worth naming rather than leaving for a learner to notice.

## Wave 2 — L2-M3, L2-M4, L2-M5 (#451)

### L2-M3 "Describing things" — a job line that cannot mean what it means elsewhere

Korean marks no gender, no number and no article, so "agreement at length" has to be read honestly
or an author goes looking for endings that do not exist. **What Korean marks instead is ROLE, and it
marks it on the particle.** L1 shipped every one of them across six modules — `-i/-ga`,
`-eun/-neun`, `-eul/-reul`, `-do`, `-e`, `-eseo` — without ever laying them side by side, and this
module assembles the grid. That is the module's real subject; the colours are the vocabulary it
happens to be assembled on.

**Topic against subject** is the hardest thing in beginner Korean because no English sentence marks
it, so it is taught as what each DOES rather than what it translates to: `-eun/-neun` sets what the
sentence is about and very often implies a contrast; `-i/-ga` identifies, and is what brand-new
information takes. S10's `Nuga wasseoyo?` is the proof — a question word is by definition the newest
thing in a sentence, so it can never take the topic particle at all.

The slogan the module refuses out loud: **"Korean has no plurals" is false.** It has `-deul`; it
simply does not require it. A learner taught the slogan hears a missing ending for a year, and a
learner told the truth hears an optional one.

### The demonstrative and the particle that share a key

The briefs predicted this and the ratchet enforced it: a bare `i` is the SUBJECT PARTICLE's index
key, so the demonstrative "this" can never stand as its own whitespace token. Three sentences and
four pool items in M3 were rebuilt to drop it, and M4 and M5 write it joined — `i-jjok`,
`i-sikdang` — exactly as L1-M1's `i-geo` does. The check in `src/course/types.test.ts` that catches
it is the one asserting no bare particle is ever written alone, and it caught this on the first
build.

### L2-M4 "Getting around" — the particle pair L1 never contrasted

`-e` marks a DESTINATION or a static location; `-eseo` marks where an ACTION happens. L1-M7 taught
both without the law, and a directions module forces it open, because a direction is a destination
and a bus stop is a place where something is done. `-(eu)ro` joins them as a third member of the
family meaning TOWARD, and `-kkaji` marks the far end of a span.

**Riding takes an object particle** and no English speaker guesses it: `beoseu-reul tayo` — "the
bus, ride it" — where English rides ON a bus. Getting off takes `-eseo`, because getting off happens
somewhere. The two halves of one journey take different particles for a reason a learner can see
once it is pointed out, which is why they are authored as a pair.

Korean is verb-final, so a direction is one long adverbial chain ending in the verb, which is why
this module's per-sentence bound is the level's highest.

### L2-M5 "Food and hosting" — the rule that explains what a learner already has

L1-M8 used both number systems in one module without ever saying which was which. The law, at last:
**native numbers count things and always take a counter; Sino numbers do money, minutes, dates and
anything above ninety-nine.** A rule that explains something a learner already has is worth three
that only add.

A counter is not optional the way an English measure word is, and the order is fixed and reversed
from English: NOUN, number, counter — `maekju du byeong`. The native number shortens in front of it
(`hana` → `han`, `dul` → `du`, `set` → `se`), which L1-M8 showed without naming.

**The honorific verb set arrives at the table**, which is M1's decision made visible in the field:
`meokda` has a whole separate honorific word, `deusida`, so a host says `deuseyo` and
`masitge deuseyo` and never `meogeuseyo`. It is the clearest of the four irregular honorifics —
with `gyesida` (M2), `jumusida` and `malsseumhasida` — and a table is where a learner meets it first.

Refusing without offence is stated and not moralised: **in Korean hosting the offer is repeated**,
and a bare `aniyo` is heard as politeness rather than as a decision, so the refusal that lands adds a
reason — `gwaenchanayo, bae bulleoyo`. The etiquette with no English equivalent goes in `usage`: the
younger person pours for the older, and a glass is received with two hands.

### The -mnida set, widened once more and closed

`jal meogeosseumnida` is the third and last frozen `-mnida` phrase this course teaches, and the
brief names it as frozen. `FROZEN_FORMAL_L2` in `src/course/types.test.ts` now holds four entries
and will hold no more: L1's two, M1's `joesonghamnida`, and this. Its own mistake plate was written
off a fourth `-mnida` form onto the plain `-yo` past, which teaches the freeze instead of
undermining it.

### The ratchet

`tools/shown-surfaces.test.ts` held at **en-ko 12** across all three modules. Roughly forty findings
came up and every one was fixed in content: particle shapes added to the row that owns their host
(`yeok-i`/`yeok-euro`/`yeok-kkaji`, `gogi-neun`, `bibimbap-eun`, the `i-sikdang` set), pairs put on
one row where the brief asks for them anyway (`taeksi` beside `beoseu`, `saengseon` and `yachae`
beside `gogi`, `gabyeoweoyo` beside `mugeoweoyo`), and a handful of variations rewritten off
surfaces no module has yet earned.

### Open questions for the native pass

13. **The topic/subject law** (M3, rule 1). Confirm "the topic contrasts, the subject identifies" is
    a fair working rule for a beginner, and that S03's `chaek-eun` really does imply something else
    is cheap.
14. **The colour pairs** (M3-S01, S02, S07, S08). Confirm `ppalgayo`/`ppalgan`, `paraeyo`/`paran`,
    `norayo`/`noran`, `kkamayo`/`kkaman`, `hayayo`/`hayan` are the everyday forms and spellings.
15. **`paraeyo` for blue** (M3-S02). Confirm the modern reading is blue rather than blue-green, and
    that teaching only blue is safe.
16. **`-deul`** (M3, rule 4 and S09). Confirm it is genuinely optional in ordinary speech and that
    `chingu-deul-i wasseoyo` is what a speaker says when the plurality matters.
17. **`nuga`** (M3-S10). Confirm a question word can never take `-eun/-neun`, with no idiomatic
    exception a learner will run into.
18. **`-e` against `-eseo`** (M4, rule 0). Confirm the destination/action split holds at this grain,
    and that `sageori-eseo doraseyo` is right where `sageori-e` would be wrong.
19. **`-(eu)ro` as a direction** (M4-S02). Confirm `oenjjok-euro gaseyo` is what a passer-by says,
    and that `oenjjok-e gaseyo` really is odd.
20. **`beoseu-reul tayo`** (M4-S04). Confirm the object particle, and that `beoseu-e tayo` is wrong
    rather than regional.
21. **`doraseyo`** (M4-S03). Confirm the honorific imperative of `dolda` is spelled and said as
    written here, and that it is the verb used for turning at a junction.
22. **The two number systems** (M5, rule 0). Confirm the split as stated — native with counters, Sino
    for money, minutes and dates — and that nothing common crosses it at this level.
23. **`byeong`, `geureut`, `inbun`** (M5-S01, S02). Confirm these are the three counters a learner
    meets first at a table, and that `i-inbun` takes the Sino number as written.
24. **`deuseyo` against `meogeuseyo`** (M5-S04). Confirm `meogeuseyo` genuinely does not exist, and
    that the four irregular honorifics are the four named.
25. **`jal meogeosseumnida`** (M5-S07). Confirm it is said on standing up rather than on sitting
    down, and that the `-yo` alternative in the variation is ordinary.
26. **The repeated offer** (M5, rule 4 and S06). The wave's strongest cultural claim. Confirm a bare
    `aniyo` really does not end an offer, and that `bae bulleoyo` is the reason that lands.
27. **Two hands** (M5-S10). Confirm the etiquette as described, including whether it applies to
    receiving anything or only to drink.

## Wave 3 — L2-M6 … L2-M10 (#460)

The level closes, and with it the milestone: `npm run build` emits `en-ko: 20 modules (L1-M1..M10,
L2-M1..M10)`, and **all nine courses now have a complete second level**.

### L2-M6 "Making plans together" — where M5's number rule pays for itself

`-(eu)llae-yo` is the invitation ending L1 named as deferred, and plans are what it is for. `gachi
bap meogeullae-yo?` is the everyday Korean invitation, and it differs from a plain question exactly
as English "shall we" differs from "will you" — it asks the listener's WISH rather than a fact.

The clock is the module's real prize. **The hour is a native number with `-si`; the minutes are a
Sino number with `-bun`.** `du si samsip bun` uses both systems in four syllables, and there is no
rule beyond the one M5 already stated — which is the point of putting them side by side.

The days are a closed set on one root: `woryoil`, `hwayoil`, `suyoil`, `mogyoil`, `geumyoil`,
`toyoil`, `iryoil`. Seven words cost about two, and the week is the old planets in order.

**Register: this module moves the OPPOSITE way from the other eight courses.** Every other L2 chips
`informal` when friends make plans; en-ko has no informal tier to switch into, because banmal is not
written in this course at all. So it stays `neutral` throughout and the friendliness is carried by
the ending and by `gachi`. An author reading the other briefs will look for the chip; it is
deliberately absent, and the rule says so.

### L2-M7 "On the phone" — M1's decision, paid back in one word

`yeoboseyo` is an honorific imperative of a verb meaning "look here". A learner told that remembers
the word AND the rule; a learner given it as an unanalysable noise learns one word. The call then
runs on honorifics throughout — `Kim seonsaengnim gyeseyo?`, `an gyeseyo` — so this module is the
payoff of M1's whole decision, and it is where M2's separate honorific verb earns its keep.

**`-go isseoyo`, the progressive, opens here** and L1 named it as deferred for exactly this moment.
The delta worth stating: Korean's plain `-yo` present already covers a habitual action, so
`-go isseoyo` is reserved for what is genuinely in progress — the same restriction en-it puts on its
gerundio, where en-fr and en-de have no progressive at all.

`jamsiman-yo` earns its own line: it is a NOUN with `-yo` stuck on. **`-yo` politens a fragment, not
only a verb**, which is how Korean is polite in two syllables where English needs a clause.

`-l-geyo` is a PROMISE and `-l geoyeyo` is only a plan, and the difference is first-person: you
cannot promise on somebody else's behalf, and Korean grammar refuses to let you.

### L2-M8 "When something goes wrong" — `an` against `mot`

The law in one line: **`an` is "do not" or "will not"; `mot` is "cannot".** `mot gayo` means
something is stopping me and `an gayo` means I am choosing not to, and English's single "can't"
hides the difference. A problem report is the only place in the ladder where both are needed in the
same breath.

Pain and malfunction both use M2's double subject — `meori-ga apayo`, `i-geo-ga an dwaeyo` — so the
module opens no new class: it APPLIES one for the third time. A learner who sees a structure three
times learns the structure; a learner given three idioms learns three idioms.

Complaining calmly, and **Korean's answer is the honorific rather than the hedge**: the softening is
`jom`, `joesonghajiman`, and keeping the honorific on the person you are complaining to. Raising
your voice with a stranger is a heavier breach in Korean than in English, and the repair is the
ending, not the volume.

### L2-M9 "Comparing and choosing" — the word order is the delta

`-boda` attaches to the thing compared AGAINST, and that phrase comes in the middle, before the
predicate: `i-geo-ga geugeo-boda bissayo`. English puts the standard last; Korean puts it where a
verb-final language puts everything.

**Nothing declines and nothing agrees.** A comparative is the plain descriptive verb with a particle
somewhere else in the sentence, which is the relief this course keeps offering and keeps naming.

And the module that finally explains M3: **the topic particle marks CONTRAST, and a comparison is
contrast.** `i-geo-neun bissayo, geugeo-neun ssayo`. M3 taught the law; here a learner sees what it
was for.

Stating a preference is `deo joahaeyo` — "like more" — because **there is no Korean verb for
"prefer"**. That is the mirror image of German's `lieber`, where an adverb carries what English gives
to a verb, and the review names it as such.

### L2-M10 "Telling what happened" — and the lesson is not a tense

Four other courses in this repo spend their whole M10 on a perfect/imperfect split. **Korean has
none**: `-eoss-` covers everything English divides between the past simple and the present perfect,
and it also carries a RESULT reading — `gasseoyo` can mean "has gone, and so is not here". That is
one sentence's worth.

What replaces the aspect lesson is the real one: **Korean drops every subject once the topic is
set**, far more thoroughly than Spanish drops a pronoun. A four-sentence account names the speaker
once, in the first clause, and then says nothing about who is doing anything for three more
sentences. S10 is two sentences, three verbs, and not one word saying who. A learner who repeats
`jeo-neun` four times has written something that reads as insistent or as a list of unrelated facts,
and the mistake plates show exactly that.

`-aseo/-eoseo` does a second job here — L1-M9's "because" is also the narrative "and then" — with
`-go` beside it joining two events and claiming no link at all. S02 and S03 are the minimal pair the
brief asked for.

### The ratchet, and the run

`tools/shown-surfaces.test.ts` held at **en-ko 12** across all ten modules of the level — the
baseline it opened with. Across the three waves roughly a hundred findings were fixed in content and
none by raising a number: particle shapes added to the row that owns their host, pairs put on one
row where the briefs ask for them anyway, and variations rewritten off surfaces no module had yet
earned.

### The milestone closes

Nine courses, nine complete second levels. The `-mnida` set stands at four frozen phrases and will
not grow; the demonstrative is written joined everywhere; and the particle hyphen has held the
invariant it was chosen for — the bare host of every particle-marked noun still has an index key of
its own.

### Open questions for the native pass

28. **`-(eu)llae-yo`** (M6-S01). Confirm `gachi bap meogeullae-yo?` is the ordinary invitation, and
    that it is safe with somebody you address with `-yo` but do not know well.
29. **`halb`-style clock forms** (M6-S04). Confirm `du si samsip bun` is how a time is said, and that
    nobody mixes the systems in ordinary speech.
30. **The register decision** (M6, rule 3). Confirm that among friends of similar age, `-yo` with
    `-(eu)llae-yo` reads as friendly rather than distant — this is the module where the course's ban
    on banmal is most exposed.
31. **`yaksok isseoyo`** (M6-S07). Confirm it declines an invitation completely, and that nobody asks
    what the arrangement is.
32. **`yeoboseyo`** (M7-S01). Confirm the "look here" etymology is right, and that the word is
    genuinely restricted to the telephone.
33. **`-go isseoyo`** (M7, rule 1). Confirm it is reserved for what is in progress, and that
    `bap meogeoyo` alone is what a speaker says for a habit.
34. **`jamsiman-yo`** (M7-S05). Confirm the bare `jamsiman` really is impolite rather than merely
    brisk.
35. **`eotteoke dwaeyo`** (M7-S06). Confirm it is softer than `mwoyeyo` for asking a name or a
    number, and that it is what a stranger uses.
36. **`-l-geyo` against `-l geoyeyo`** (M7-S08). Confirm the promise/plan split, and that `-l-geyo`
    is genuinely first-person only.
37. **`an` against `mot`** (M8, rule 0). The wave's most load-bearing claim. Confirm the split as
    stated, and that a listener really does hear which one was used.
38. **`ireobeoryeosseoyo`** (M8-S04). Confirm `-beorida` adds the regret the note claims, and that
    leaving it out sounds oddly unbothered.
39. **Eating medicine** (M8-S06). Confirm `yak-eul meokda` is the only ordinary way to say it.
40. **`joesonghajiman`** (M8-S07). Confirm it opens a complaint, and that the plain
    `i-geo-ga gojang-ieyo` after it is not rude.
41. **`-boda` word order** (M9, rule 0). Confirm the standard always precedes the predicate, with no
    common alternative order.
42. **`gajang` against `jeil`** (M9-S03, S04). Confirm they are interchangeable and that `jeil` is
    the more colloquial.
43. **`deol`** (M9-S02). Confirm Korean really does prefer to say the other thing is `deo`, and that
    `deol` is comparatively rare.
44. **`sae`** (M9-S10). Confirm it is modifier-only, and that `saeyo` does not exist.
45. **Zero anaphora** (M10, rule 0). The lesson the whole module is built on. Confirm a four-sentence
    account names the speaker once at most, and that repeating `jeo-neun` reads as insistent.
46. **`-aseo` as "and then"** (M10-S02, S03). Confirm the narrative reading beside the causal one,
    and that the `-go` contrast is as flat as the module says.
47. **The result reading** (M10-S06). Confirm `jigeum jip-e gasseoyo` means "has gone", and that a
    listener does not hear it as "went just now".
