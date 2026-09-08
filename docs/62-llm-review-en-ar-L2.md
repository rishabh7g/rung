# en-ar L2 — LLM review

The review that clears each en-ar L2 wave to ship, written in the same change that authors it
(`CLAUDE.md`). The **native-speaker gate is a separate, stricter bar and stays unmet**: every
section ends in open questions for a native pass, and no later wave may close one of them by
rewriting a shipped module.

Open questions are numbered as a fresh en-ar L2 chain from 1. The L1 reviews (`docs/07`, `09`,
`16`, `42`) number their own findings and are not continued here.

## Wave 1 — L2-M1, L2-M2 (#436)

Authored against the briefs of #427 and the decisions in `docs/54`. Reviewed against the real
cumulative index: 287 surfaces through L1-M10, and the wave carries the course to L2-M2.

### L2-M1 "Asking politely"

The module makes the imperative productive from a verb the learner already has — `tashrab` →
`ishrab`, `taʾkul` → `kul` — and states the rule that decides whether a vowel goes in front. Both
feminine imperatives (`ishrabī`, `kulī`) sit in the `forms` of their own rows, which is what keeps
them taught without a second sentence.

The register decision held exactly as `docs/54` set it. There is no address contrast to teach, so
M1 spends itself on the frames instead, and the chip marks only the ceremonial end: `law samaḥta`
(S02, S09) and the `hal yumkinuka` frames (S03, S10) chip `formal`, the rest stay `neutral`, and
`informal` is used nowhere.

**The finding of the wave, and it is a good one.** Authoring the gendered address produced
something neither the brief nor the issue anticipated: `samaḥta` and `samaḥti` are ONE spelling in
unvowelled Arabic — سمحت — and two in the romanization. So are `yumkinuka` and `yumkinuki`. This
course prints both lines under every sentence, and here they carry different amounts of
information: the romanized line names the addressee and the Arabic line does not. That is now
rule 5 of the module, and S02, S09 and their variations are authored to show it — a variation
whose `changed` line reads "the feminine address, and the Arabic line does not move" is teaching
something true about Arabic writing that no other course in this repo can teach.

### L2-M2 "Describing people"

`huwa` and `hiya` arrive because a verbless sentence has nowhere else to put the person — L1 never
needed them, since the `ya-`/`ta-` prefix carried it. The copula is still absent, which makes S01
a rest point dressed as a new sentence, and the note says so.

`ʿind-` gets its rule at last (S04): it is a PREPOSITION meaning "at", which is why it takes the
possessive suffixes rather than conjugating, and why there is no verb "to have" to look for. The
slogan "`ʿindī` means I have" is named and refused in the trap, exactly as `docs/54` asked.

Two things the module gets right that a vocabulary list would not: `ukht` is not built from `akh`
by adding `-a` (S06), so the pair is taught rather than derived; and the iḍāfa's first noun never
takes `al-` (S08), which is stated as the reason the phrase is definite rather than as an
exception to definiteness.

`as-sinn` (S10) is authored with the assimilated article as the row's `display` and both shapes in
its `forms`, which is the L1 pattern (`al-qahwa` with `qahwa`) and the reason the whole surface
resolves.

### The ratchet, twice

`tools/shown-surfaces.test.ts` caught two rounds before either module shipped. In M1: `kitābī`,
`tadhhabī`, `yā`, `ṣadīqī`, `tatakallamī`, `maʿanā` — six variation-only surfaces, and four of them
were feminine or possessive cells of L1 verbs, which is exactly the failure a `forms` list catches
and a variation slips past. In M2: `ʿind` bare, `ismu` bare, and `as-sinn` — the last of which was
not a variation problem at all but a word row whose `display` was the bare `sinn` when the sentence
showed the assimilated form. Every one was fixed in content. The en-ar baseline stays at 6, and
`sayyārat` — one of the six — is re-shown in an M2 variation without being added to.

## Wave 2 — L2-M3, L2-M4, L2-M5 (#445)

### L2-M3 "Describing things"

The three agreement laws `docs/54` demanded are all here, and S04 and S09 are the two sentences
that make them usable rather than merely odd. S02 gives the non-human plural (`al-kutub jamīla`,
feminine singular); S04 gives the human plural (`al-mudarrisūn mashghūlūn`); S09 gives a BROKEN
plural that is nonetheless human (`al-awlād laṭīfūn`), which is the sentence that separates the
two questions properly — the shape of the plural and the humanity of the noun are not the same
question, and a learner who has only seen S02 and S04 will think they are.

S03's second variation is worth pausing on: `as-sayyāra kabīra` and `as-sayyārāt kabīra` take the
SAME adjective. That is the law paying the learner back rather than costing them.

The definiteness rule (S01) is taught as what it is — one `al-` turning a phrase into a sentence —
and the mistake block is the phrase, not an ungrammatical string, because the error a learner
makes here produces something correct that means something else.

### L2-M4 "Getting around"

`bi-` finally gets its rule (S06), and it is the payoff of a decision L1 made three levels ago:
the learner has been saying it inside `bi-khayr` since M2 and `bi-kam` since M8 without being told
what it means. The elision rule is stated in the same sentence — `bi-al-ḥāfila` written, `bil-`
said — because the two lines disagree here in exactly the way M1's rule 5 described.

The dialect line is spent (S04's `al-ḥāfila` note names `al-bāṣ` and no sentence writes it), which
uses one of the three `docs/54` allows for the whole level.

### L2-M5 "Food and hosting"

`tafaḍḍal` gets its own sentence and its own note, because five English acts in one word is not a
vocabulary item. The hosting law is stated as a fact about how a refusal WORKS rather than as
etiquette: a single `lā shukran` is heard as politeness, so the refusal that lands adds a reason.

S03 and S08 are an authored pair the module needs: `hal turīd samak?` (a kind, no article) against
`hal turīdīn al-ḥulw?` (the one on the table, with it). They look identical otherwise, and the
article is the whole difference.

`alḥamdu lillāh` (S09) is taught with its everyday uses first and its religious reading not at
all, which is the honest description: it answers `kayfa ḥāluka`, ends a meal and marks any small
relief.

### The al-'d surface — a systematic finding, recorded because it will recur

The ratchet caught seven surfaces in M3 alone, and they were all the same thing: **an `al-`'d form
is its own index key**, so a word row whose `display` is the bare noun does not teach the definite
one the sentence actually shows. `al-buyūt`, `al-aḥmar`, `al-mudarris`, `al-lawn`, `bi-al-qiṭār`
and `bi-al-ḥāfila` all failed this way, and `as-sayyārāt` and `al-bāb` needed rows of their own —
new SHAPES of L1 lexemes, deconstructed here per the level's forms policy.

The fix is mechanical and belongs in the authoring habit rather than in a rule: **every en-ar word
row lists both shapes in `forms`**, and a row for an `al-`'d form of an L1 word is opened in the L2
module that first shows it. L1 set the pattern (`al-qahwa` with `qahwa` in its `forms`) and this
wave is where the pattern had to become a discipline. No baseline moved; en-ar stays at 6.

## Wave 3 — L2-M6…L2-M10 (#454) — the level closes

The last five rungs take en-ar to twenty modules. The level's `draft` flag comes off in the same
change.

### L2-M6 "Making plans together"

S01 opens the module without one new word: `hal turīd an nadhhab…?` is `hal` from L1-M2, `an` from
L1-M3 and `nadhhab` from L1-M4, and the invitation is the rearrangement. S02's `limādhā lā` is
L1-M9's question word doing a job it has never done. The clock is where the spend goes, and it is
also the course's densest run of sun letters — `as-sāʿa`, `ath-thāniya`, `an-niṣf`, `ar-rubʿ`,
`as-sabt` — with rule 3 saying plainly that the assimilation is spelling and not just sound,
because the build reads `al-thāniya` and `ath-thāniya` as different words.

`ar-rābiʿa` and `ar-rubʿ` share a root (S05), and the note says so: four, fourth and quarter are
one family. That is Arabic being easy for once, and the module says so rather than letting it pass.

### L2-M7 "On the phone"

`man` against `min` (S01) is the sentence the romanization's short-vowel rule was written for, and
the trap says as much. `laysa` enters in the third person only (S03, S04), which is the one L1
prohibition this level lifts — and S04 is worth noticing because the Arabic line DOES distinguish
`laysa` from `laysat`, where M1's `samaḥta`/`samaḥti` it does not. The two lines part company
selectively, and this module shows both halves of that.

### L2-M8 "When something goes wrong"

`ʿind-` gets the slogan refused again in a rule, and S01's trap is where the payoff lands: there
is nothing here that conjugates, and the past is `kāna ʿindī`. S07 introduces verb-first order
early — `ḍāʿa al-miftāḥ`, the key loses itself — and its mistake block explains why the
subject-first version is grammatical and wrong for the job, which is what M10 makes a rule of.

### L2-M9 "Comparing and choosing"

The comparative does not bend, and S01's second variation is the sentence that proves it: two
feminine nouns and `akbar` unmoved. `min` does its third job (S02) on L1-M1's row, and this module
opens nothing for it — the chain from `min` (origin) through `min faḍlika` (indexed whole to
protect it) to `min` (than) is now complete.

S10 is the module's own test of rule 3: `al-aḥmar` and `aṣghar` in one sentence, same pattern,
different jobs.

### L2-M10 "Telling what happened"

Verb-first agreement is the module's law and S03 is built to teach it: `dhahaba al-awlād` singular
before the subject, `akalū` and `rajaʿū` plural after it, in the same account about the same
children. Its two variations put the halves side by side. S09 adds the qualification that matters:
GENDER still agrees when number does not — `dhahabat ummī` — so the position rule suspends the
plural alone.

**A self-caught brief violation.** M10's first draft used `lam` twice (`lam ajidhu`, `lam
adhhab`), and `docs/54` bans `lam` for this level. Both sentences were rewritten rather than the
ban quietly relaxed: S04's third clause became `kāna fī as-sūq` and S05's became `kuntu fī
al-bayt`. The ratchet is what surfaced it — `lam` appeared as an untaught surface — which is a
second job the rule turns out to do.

### Open questions for the native pass



1. **`law samaḥta` against `min faḍlika`.** The module treats them as interchangeable softeners
   with `law samaḥta` fronting a request and `min faḍlika` closing one. Confirm that division
   holds across the Levant and the Gulf, or say which is regionally marked.
2. **`aʿṭinī`** (M1-S04). Authored as the everyday "give me". Confirm it does not read as brusque
   in MSA, where `hal yumkinuka an tuʿṭīnī` might be expected at a counter.
3. **`lā baʾsa`** (M1-S06). Given as both "you're welcome" and "never mind". Confirm both readings
   are current, and that it is not now bookish beside `ʿafwan`.
4. **`ishrab ash-shāy` as a host's line** (M1-S01). The `usage` says it is offered rather than
   ordered. Confirm a bare imperative plus `min faḍlika` reads that way at a table.
5. **`kabīra fī as-sinn`** (M2-S10). Authored as the respectful way to say someone is old.
   Confirm `kabīra fī as-sinn` rather than `musinna`, and that the phrase is not itself indirect
   enough to sound evasive.
6. **`ismuhā hind`** (M2-S03). The name is L1-M1's row and indexes. Confirm `Hind` reads as an
   ordinary Arab woman's name to a reader anywhere, since the course uses it as its stock example.
7. **The two lines disagreeing** (M1 rule 5). The module teaches that the romanization carries the
   addressee's gender and the Arabic does not. Confirm that is the right thing to tell a learner
   this early, rather than a fact to leave until they read unvowelled text for themselves.
8. **`al-awlād` for a mixed group** (M3-S09). Authored as covering children of either kind, with
   the masculine plural adjective. Confirm that is neutral rather than reading as "the boys".
9. **`ʿalā al-yamīn` for turning** (M4-S03). The module gives the sides as nouns needing `ʿalā`.
   Confirm a direction-giver would not more naturally say `ʿalā yamīnika`.
10. **`bi-al-ḥāfila` written unelided** (M4-S06). The course's rule, applied. Confirm it does not
    look wrong to a reader who has only ever seen `bil-ḥāfila`.
11. **`al-mazīd min ash-shāy`** (M5-S10). The `usage` already admits this is the correct MSA and
    not what a host says. A native pass should give the shorter form for the record, even though
    the course will not write it.
12. **`hādhā aṭ-ṭabaq laṭīf`** (M5-S07). `laṭīf` is used of a dish. Confirm it is idiomatic of
    food rather than of people and weather alone.
13. **`alḥamdu lillāh` as the default answer** (M5-S09). Authored as the commonest reply to
    `kayfa ḥāluka`. Confirm it has not been displaced by `bi-khayr` in everyday speech, which is
    what L1-M2 teaches.
14. **`limādhā lā nadhhab`** (M6-S02). Authored as an invitation. Confirm it does not read as a
    genuine complaint about why the group has not gone.
15. **The ordinal clock** (M6-S03…S05). `as-sāʿa al-khāmisa` is given as the everyday way to tell
    the time. Confirm the ordinal rather than the cardinal is what people actually say, and that
    `wa an-niṣf` is not now `wa nuṣṣ` in speech everywhere.
16. **`ālū`** (M7-S01). Written in `display` as the standard phone opening, on the grounds that it
    has no MSA rival anybody uses. Confirm this is right, and that `naʿam` or the answerer's name
    is not commoner.
17. **`laysa mawjūd` without the accusative** (M7-S03). The course drops case endings, so `laysa`
    is followed by an unmarked predicate where formal MSA would write `mawjūdan`. Confirm this
    reads as spoken-simple rather than as an error.
18. **`ḍāʿa al-miftāḥ`** (M8-S07). Authored as the way to report a loss without blaming anyone.
    Confirm `aḍaʿtu al-miftāḥ` is not what a speaker would actually say about their own key.
19. **`qāla ṣadīqī:` with a colon** (M10-S06). Reported speech is deferred, so the quotation is
    punctuated rather than grammaticalised. Confirm the colon is idiomatic in written MSA and does
    not look like a translation artefact.
20. **`kāna al-jaww bārid`** (M10-S01) and the other `kāna` predicates. Written without the
    accusative `-an` throughout, per the course's rule. This is the single decision a native
    reader is most likely to flag, and it is deliberate.
