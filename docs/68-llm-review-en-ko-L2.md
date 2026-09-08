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
