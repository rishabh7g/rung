# LLM review — en-ar L1-M6 … L1-M10

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Opus 5), which
does not speak Arabic, has never heard it, and cannot judge how any of this lands in a room.
`verified: true` on all five modules rests on the repo owner's explicit authority (2026-08-13),
exactly as `docs/07-llm-review-en-ar-L1-M1-M2.md` recorded for M1–M2 (PR #216) and
`docs/09-llm-review-en-ar-L1-M3-M5.md` for M3–M5 (PR #218); `verifiedBy` says so in words.
**No native Arabic gate exists for this course** — none is scheduled — so the open-questions list
at the bottom is not a formality, it is the outstanding work.

These five rungs finish the Arabic ladder. Nothing structural is left after M5's inside-out verb:
M6 puts a letter on the front of it, M7 takes the copula's absence and builds a whole module out
of the hole, M8 is the level's one genuinely alien system (counting), M9 is two conjunctions and
a pile of adjectives, and M10 is recombination. The level's shape has been the same since #198:
the hard things land where the job cannot be done without them, and the last module spends almost
nothing new.

## What was authored

| | M6 Tomorrow | M7 Where things are | M8 Numbers & shopping | M9 Feelings & opinions | M10 Connected talk |
|---|---|---|---|---|---|
| sentences | 10 | 10 | 10 | 10 | 10 (turns of 2–3) |
| new word rows | 11 of 25 allowed | 14 of 25 | 14 of 25 | 14 of 25 | 13 of 25 |
| pool items | 8 | 8 | 8 | 8 | 8 |
| module rules | 11 | 11 | 12 | 10 | 10 |
| rules cited by a sentence | **11/11** | **11/11** | **12/12** | **10/10** | **10/10** |
| tokens per sentence | 3–7 (bound 7) | 2–4 (bound 7) | 2–5 (bound 7) | 3–6 (bound 8) | 1–8 per sentence inside the turn (bound 8) |
| enrichment | full (all five blocks, every sentence) | full | full | full | full |
| `script` line | on every sentence, word row, variation, mistake and pool item | same | same | same | same |
| prerequisites | `["L1-M5"]` | `["L1-M6"]` | `["L1-M7"]` | `["L1-M8"]` | `["L1-M9"]` |
| cumulative index | 132 → **164** surfaces | 164 → **191** | 191 → **217** | 217 → **256** | 256 → **275** |

`ENRICHMENT_FULL_THROUGH_MODULE` is 3, so none of these five owed the full five blocks. All five
ship them anyway, for the reason #218 gave: at 11–14 word rows a module the budget is not the
constraint, and a half-enriched M10 would be the first module in the course where a learner taps a
sentence and gets less than the one before it.

Written strictly in ladder order, rebuilding the index between modules, so each module was authored
and then audited against its own real cumulative inventory — M6 against M1–M5, M7 against M1–M6,
and so on. All five were authored from the briefs in `tools/course-briefs.ts` (#198 / PR #215).

## What this pass found wrong, and fixed

Unlike #218, these five modules did not exist before the review — they were authored and reviewed in
one pass, so "defects found" means calls that the first draft got wrong and the audit caught before
anything was flipped. Six of them mattered.

1. **Four `mistake` plates were not mistakes.** `SentenceScreen` draws the mistake block struck
   through, so a plate holding good Arabic teaches a learner to avoid a sentence they should be
   using. Each was replaced:
   - **M7-S06** had `Rohān kāna fī as-sūq al-yawm` ("Rohan was at the market today") called wrong
     because `kāna` is the past. It is not wrong — earlier today is still today. Replaced with
     `Rohān yakūn fī as-sūq al-yawm`, which puts M6's own verb where the present needs none.
   - **M10-S02** had a fronted time phrase (`lākin fī al-masāʾ sa-adhhab`) and a `why` that opened
     with *"not wrong so much as top-heavy"* — a plate arguing against itself. Replaced with a
     `lākin` that announces a contrast and then repeats the first sentence verbatim, which is a
     real misuse of the word the sentence teaches.
   - **M6-S07** repeated M6-S06's plate (a verbless sentence pushed into tomorrow) one sentence
     later. Replaced with `sa-akūn mashghūl ams` — the future marker over `ams`, which is
     unambiguous and unique in the module.
   - **M7-S04**'s `why` claimed `hunāka al-kitāb …` was simply wrong; `hunāka` also means "over
     there", so the sentence has a reading. The `why` now says which reading survives and why it is
     not the one the learner meant.
2. **`naʾkul` would have been claimed by a future row.** M6's `sa-ākul` first listed `sa-naʾkul` in
   `forms`, and `surfaceIndexKeys` splits the hyphen — so bare `naʾkul` ("we eat") would have
   opened a row headed **sa-ākul · I will eat**, while its siblings `taʾkul` and `yaʾkul` opened
   M4's **ākul · I eat**. One paradigm, two glosses, split by which module happened to write which
   person. `sa-naʾkul` was dropped so M6's `ākul` paradigm mirrors M4's exactly and `naʾkul` stays
   unclaimed.
3. **`al-kutub` did not resolve.** M9-S06's variation writes it and M8's `kutub` row had empty
   `forms`. Added, so the article-ed plural opens the row that teaches the plural.
4. **`tanām` / `yanām` were owned by a row whose note did not mention them.** M9's `sa-anām` row
   generates those two bare part keys through its `forms`. The note now names them in the non-past
   as well as under `sa-`, which is the rule every part-key owner in this course obeys.
5. **"there is no bare *ghad"** was overstated in M6's rule 5 and word row. `ghad` is a real noun
   ("the morrow"); what is true is that the ADVERB is `ghadan` and never `*ghad`. Both now say
   that, because a brief-derived rule that a reader can falsify costs more than it teaches.
6. **`ilā al-liqāʾ` was assigned to the wrong speaker.** The first draft said it is said by the one
   leaving and `maʿa as-salāma` by the one staying, as if the pair were strictly allocated. The
   note now says `maʿa as-salāma` is said TO the one leaving and `ilā al-liqāʾ` is the natural
   answer, usable by either side.

Nothing else was changed. Three calls this pass disagreed with are left standing because M1–M5
already shipped them; they are open questions below, not silent decisions.

## The ratified decisions, and where they show

The variety and the romanization were settled in #198 and are not revisited here.

- **Spoken-simple MSA, pause forms.** No case endings except the header's three lexical exemptions.
  Three places in this stretch would otherwise have needed one, and each says so out loud rather
  than half-writing it: M6-S07's `sa-akūn mashghūl` (full MSA `mashghūlan` after `yakūn` — the
  word row says so, following M5's `kuntu taʿbān`), M8's `kitābān` (full MSA also has `kitābayn`,
  which carries only case — the row writes `-ān` throughout), and M8's `ghālī` (full MSA `ghālin`,
  whose ending disappears in pause; rule 9 and the word row both state it).
- **The adverbial `-an` is written.** `ghadan`, `qarīban`, `ayḍan`, `qalīlan`, `ʿafwan`, `ahlan`,
  `ṭabʿan`, `maʿan` — eight new members of the class that already held `shukran`, `kathīran`,
  `jiddan`, `dāʾiman` and `aḥyānan`. M6 rule 6 draws the boundary the class needs: `al-usbūʿ
  al-qādim` and `baʿd aẓ-ẓuhr` are ordinary noun phrases doing adverbial work and wear no `-an`.
- **Assimilation always written, elision never.** `aẓ-ẓuhr` (M6), `aṭ-ṭāwila` (M7) — both new sun
  letters, both spelled as said. `fī al-bayt`, `fī al-masāʾ`, `fī aṣ-ṣabāḥ` still written in full
  with the elision in `sound` (*"fi l-BAYT"*, *"fi l-ma-SAAʾ"*), and M7-S06's own trap now says the
  law out loud at the moment `fī` becomes a free word: *"fī does not shorten on the page."*
- **`wa` a free word.** M6-S10, M8-S09, M8-C08, M10-S03 and M10-S06 write `wa` spaced in `display`
  and joined in `script` (`وسأشرب`, `وهذا`, `والحليب`, `وأريد`, `وأحب`). `lākin` is never joined,
  which is correct and is stated in its word row so the two are not confused.
- **`ʾ` and `ʿ` kept apart.** New in this stretch: `in shāʾ Allāh`, `raʾyī`, `jāʾiʿ` (which carries
  BOTH, and gets a rule of its own in M9), `ilā al-liqāʾ`, `sa-taʾkul` against `usbūʿ`, `ʿalā`,
  `ʿindī`, `ʿafwan`, `ṭabʿan`, `al-ʿarabiyya`, `ṣaʿb`, `maʿī`. Word-initial hamza still unwritten
  (`ayna`, `amām`, `ashtarī`, `atakallam`, `ahlan`, `ayḍan`).

### Arabic script checked against every romanization

Every `display` in all five modules — sentences, word rows, variations, mistakes and pool items —
was read against its `script` line character by character. No mismatches. The `content:build` run
reports **no `warn … carries no script line`** for any of the ten en-ar modules, so every readable
surface has its Arabic original.

Two places where a *wrong* romanization carries a *right* script, and that is correct rather than a
bug — the class #216 and #218 both accepted:

- **M6-S04**'s mistake `baʿd al-ẓuhr` and **M7-S05**'s `al-sayyāra` carry the same Arabic as their
  sentences, because unpointed Arabic writes no sun-letter assimilation at all. M6-S04's `why` now
  says so in words (*"Bare Arabic script writes neither spelling differently, which is precisely
  why the romanization has to."*).

And one where a wrong romanization gets its own wrong script, deliberately: **M7-S09**'s
`sayyāraī` is written `سيارةي`, with the closed **ة** still sitting where an open **ت** belongs —
the same error in both scripts, which is what makes the plate teachable in Arabic as well as in
romanization.

## The slogan traps, and what was written instead

- **"sa- is the future tense"** → M6 rule 0 refuses the tense outright: *"There is no future tense
  to learn. M4's non-past is unmarked for time, and sa- glued to its front aims it at the future."*
  Rule 4 then removes the other half of the illusion — `ghadan ākul fī al-bayt` is good Arabic with
  no `sa-` in it — and M6-S05 is that sentence.
- **"Arabic has no verb to be"**, third and final appearance → M6 rule 7 lines all three tenses up
  in one breath (`al-jaww bārid` · `kāna al-jaww bārid ams` · `sa-yakūn al-jaww bārid ghadan`) and
  M6-S06's two variations put the other two tenses one line under the sentence. M7 then spends a
  whole module on what the missing copula makes possible.
- **"iḍāfa is just of"** → M7 rules 4 and 5 are a pair: rule 4 states the law (the possessed noun
  first, no `al-` on it, the article on the last noun only) and rule 5 names why the slogan fails —
  *"it is not English word order with 'of' deleted; it is a rule about which noun may wear the
  article, and the order decides the meaning: bāb al-bayt is the house's door, bayt al-bāb would be
  the door's house."* S07's mistake is `al-bāb al-bayt`.
- **"numbers just go in front of the noun"** → M8 rules 2, 3, 4 and 6. Three count shapes are
  taught as three shapes (`kitāb wāḥid` · `kitābān` · `thalātha kutub`), each on its own sentence,
  each with its own mistake plate, and rule 6 says explicitly that the slogan is what hides them.
- **Gender polarity** → M8 rule 5 and the matched pair S06/S07 (`thalātha kutub` against `thalāth
  sayyārāt`), demonstrated once and not drilled, exactly as the brief asked. Both sentences' mistake
  plates are the polarity error from opposite sides.
- **"the adjective agrees with the speaker"** → M9 rule 5 says **SUBJECT**, names the case that
  catches "speaker" (*"hal anti ḥazīna? is asked OF a woman, whoever is doing the asking"*), and
  M9-S05 makes the point with a thing rather than a person (`al-mūsīqā jamīla`, feminine despite
  its ending). This is the defect the third Marathi review had to correct three times
  (`docs/08-marathi-third-review.md`), pre-empted for the third module running.
- **"Arabic is VSO"** → M10 rule 2, in the brief's own terms: both orders are ordinary, L1 has been
  writing noun-first since `ismī Rohān`, and verb-first happens by itself whenever the verb already
  carries its subject. M10-S07's trap makes the same point from inside a verb-first answer
  (`naʿam, atakallam qalīlan`) — it is verb-first because there is no pronoun to write, not because
  of a word-order rule.
- **"have is a verb"** → M7 rules 7 and 8. `ʿindī sayyāra` is "at-me a car", the sentence stays
  verbless, and rule 8 draws the consequence the level cannot escape: a verbless sentence would
  need `laysa` to negate, so every `ʿind-` sentence in L1 is affirmative.

## The index audit — where every token actually lands

Run against the emitted `public/content/en-ar/index/L1-M<n>.json` through the real engine
(`matchSurfaces` + `normalizeSurface` + `surfaceIndexKeys` from `src/engine/surface.ts`), resolving
each hit back to `modules/<id>.json → sentences[<sid>].deconstruction.words[<idx>]` — the exact row
`WhyPanel` would render, module by module against that module's own cumulative index.

**Sentences: 50 sentences, 221 tokens, 0 unresolved, 0 wrong-word landings, 20 forms-hits.
Pool: 40 items, 149 tokens, 0 unresolved, 0 wrong-word landings, 26 forms-hits.**
The build's own PRD §6.3 gate (comprehension tokens must resolve) passes, and so does the stricter
question — whether each token lands on the RIGHT row.

Per module:

| module | sentences | pool | forms-hits (S / C) |
|---|---|---|---|
| M6 | 10 sentences, 43 tokens, 0 unresolved | 8 items, 28 tokens, 0 unresolved | 3 / 5 |
| M7 | 10, 32 tokens, 0 | 8, 25 tokens, 0 | 3 / 4 |
| M8 | 10, 32 tokens, 0 | 8, 28 tokens, 0 | 6 / 6 |
| M9 | 10, 46 tokens, 0 | 8, 33 tokens, 0 | 2 / 7 |
| M10 | 10, 68 tokens, 0 | 8, 35 tokens, 0 | 6 / 4 |

### Every surface that lands on a row headed by something else

Only these; everything else resolved to its own row.

| module | tapped | row it opens | same word? |
|---|---|---|---|
| M6 | `sa-tadhhab` (S04), `sa-yadhhab` (C07) | **sa-adhhab** (M6-S01) | yes — other persons of the same future verb |
| M6 | `sa-akūn` (S07), `sa-takūn` (C06) | **sa-yakūn** (M6-S06) | yes |
| M6 | `sa-tashrab` (C02) | **sa-ashrab** (M6-S03) | yes |
| M6 | `mashghūla` (C06) | **mashghūl** (M6-S07) | yes — feminine of the same adjective |
| M6 | `nadhhab` (C04) | **adhhab** (M4-S01) | yes — M4's own paradigm, reached under `sawfa` |
| M6 | `qahwa` (S03) | **al-qahwa** (M1-S05) | yes — the alias M1's brief required |
| M7 | `kitāb` (S04) | **al-kitāb** (M7-S01) | yes — its own bare form |
| M7 | `as-sayyāra` (S05) | **sayyāra** (M3-S09) | yes |
| M7 | `kabīr` (S07, C06) | **kabīra** (M3-S09) | yes — masculine of the same adjective |
| M7 | `sayyāratuka` (C02) | **sayyāratī** (M7-S09) | yes — another person of the same possessed noun |
| M7 | `ʿindaka` (C05) | **ʿindī** (M7-S08) | yes |
| M7 | `madrasa` (C03) | **al-madrasa** (M4-S01) | yes |
| M8 | `kitāb` (S01, S04), `ʿindaka` (S01), `ʿindahu` (S07, C04) | **al-kitāb** (M7) / **ʿindī** (M7) | yes |
| M8 | `khubz` (S03) | **al-khubz** (M5-S10) | yes |
| M8 | `thalāth` (S07) | **thalātha** (M8-S06) | yes — the polarity pair, one row |
| M8 | `hādhihi` (C05), `ghāliya` (C05), `min faḍliki` (C03) | **hādhā** / **ghālī** / **min faḍlika** (M8) | yes |
| M9 | `li-ʾanna` (S04, C07) | **li-ʾannī** (M9-S01) | yes — the same conjunction without its suffix |
| M9 | `bārida` (S04) | **bārid** (M5-S07) | yes |
| M9 | `ḥazīna`, `jāʾiʿa`, `sahla`, `ghāḍiba` (pool) | their masculine rows in M9 | yes |
| M10 | `sa-tadhhab`, `sa-nadhhab` (S02, S10, C07) | **sa-adhhab** (M6-S01) | yes |
| M10 | `tuḥibb` (S06) | **uḥibb** (M1-S05) | yes |
| M10 | `tatakallam` (S07) | **atakallam** (M10-S07) | yes |
| M10 | `tadhhab` (S09, C05) | **adhhab** (M4-S01) | yes |
| M10 | `ḥāluki` (C01) | **ḥāluka** (M2-S04) | yes |
| M10 | `maʿaka` (C06) | **maʿī** (M10-S09) | yes |

**Every `forms` list in all five modules was read one entry at a time.** All 90 of them (18 + 19 +
22 + 25 + 6) are another shape of the row's own word — a bare or article-ed form of the same noun,
a gender pair of the same adjective, a person of the same verb, a `sa-` form of the verb the row
heads, or a person-suffixed form of the same preposition. Not one is a cousin, a synonym or a set
of siblings — the bug class that shipped four times in hi-mr
(`docs/07-llm-review-L1-M6-M10.md`: M6-1, M7-2, M7-3, M8-1).

Edge punctuation is stripped per token by `normalizeSurface`, so `ghadan?`, `naʿam,`, `ash-shāy?`,
`al-liqāʾ!` and `al-bayt,` resolve exactly as their bare forms do — checked in the walk, not
assumed. M10's multi-sentence turns are tokenised the same way, so a full stop inside a turn costs
nothing.

### The clitic law — every bare part key these modules create, and who owns it

`surfaceIndexKeys` indexes each hyphen part of a token against the same row, first occurrence
winning. M6–M10 create **21** new bare part keys. Each one's owner note defines the part, which is
the brief's requirement.

| bare key | owner row | is the owner's note true of the bare key? |
|---|---|---|
| `sa` | **sa-adhhab** (M6-S01) | yes, and this is the brief's explicit instruction, met: *"sa- is the whole future: a single letter glued to the front of M4's adhhab … It is not a word and cannot stand alone."* `adhhab` itself was already M4's and stayed M4's, exactly as #218 predicted. |
| `akūn`, `takūn`, `nakūn` | **sa-yakūn** (M6-S06) | yes: the note names all four persons and says *"the bare yakūn is the same verb without the future marker"*. `yakūn` is in the row's own `forms`. |
| `aẓ`, `ẓuhr` | **baʿd aẓ-ẓuhr** (M6-S04) | yes: *"ẓ is a sun letter, so the article assimilates … ẓuhr on its own is noon, the middle of the day."* Joins `al` (M1), `as`/`ash` (M2), `aṣ` (M4), `aṭ` (M7) as the course's article keys. |
| `usbūʿ`, `qādim` | **al-usbūʿ al-qādim** (M6-S08) | yes: *"usbūʿ is a week and qādim is 'coming'."* The `al` part is M1's and stays M1's. |
| `aṭ` | **aṭ-ṭāwila** (M7-S01) | yes: *"ṭ is a sun letter, so the article assimilates and is written as it is said."* |
| `li` | **li-ʾannī** (M9-S01) | yes, the brief's instruction met: *"The li- on its front is the clitic 'for, to', and it is the same li- inside li-dhālika and limādhā."* |
| `'anna`, `'annī`, `'annaka`, `'annaki`, `'annahu` | **li-ʾannī** | yes — the whole family is in the row's `forms` and the note glosses each person. |
| `dhālika` | **li-dhālika** (M9-S02) | yes: *"dhālika on its own is 'that', the far-pointing partner of M8's hādhā."* |
| `sabab` | **bi-sabab** (M9-S08) | yes: *"M2's bi- glued to sabab ('reason')."* The `bi` part is M2's `bi-khayr` row's and stays there — which is why that row had to define the clitic, and it does. |
| `tanām`, `yanām` | **sa-anām** (M9-S10) | yes, after the fix in defect 4: *"Strip the sa- and the same three are simply anām, tanām, yanām in the non-past."* |
| `salāma` | **maʿa as-salāma** (M10-S08) | yes: *"maʿa plus salāma, from the same root as M2's as-salām."* The `as` part is M2's. |
| `liqā'` | **ilā al-liqāʾ** (M10-S10) | yes: *"M4's ilā plus liqāʾ, the meeting."* The `al` part is M1's. |

**No key was stolen.** `bi-kam` (M8-S02) yields `bi` (M2's) and `kam` — and `kam` is M8-S01's own
row, deliberately taught one sentence EARLIER so that first-occurrence-wins leaves the bare
counting word answering for itself and `bi-kam` answering for the price question. `bi-khamsa`
(M8-S08) yields `bi` (M2's) and `khamsa`, which is in that row's own `forms`. `bi-sabab` yields
`bi` (M2's). Every `sa-` verb yields `sa` (M6-S01's) plus a bare verb that M4 or the row itself
already owns.

### Reverse sweep

All **135 word rows and 176 `forms` entries** across the ten en-ar modules, checked against the
final cumulative index (275 surfaces): **0 shadowed, 0 forms entries resolving anywhere but their
own row.** Every row owns the surface it is headed by, every `forms` entry opens the row that lists
it, and the only keys any row does not own are the shared hyphen parts in the table above.

### The unresolved tokens, all deliberate

Sentence heroes and pool items are 0/0 in all five modules. Nineteen tokens across `variations` and
`mistake` plates do not resolve, which is correct: those blocks are static text on Sentence Detail
(`src/screens/SentenceScreen.tsx` sections 7 and 8) — not tappable, never sent to the resolver —
and a `mistake` is wrong-L2 by definition, so some of them SHOULD have no row.

| where | token | why it is right |
|---|---|---|
| M6-S04 mistake | `al-ẓuhr` | **must not resolve** — the whole lesson is that it is not another spelling of `aẓ-ẓuhr`, it is no word at all. M4-S02's `al-ṣabāḥ` and M2-S10's `al-shāy` are the same plate |
| M6-S04 mistake | `baʿd` | bare `baʿd` is unclaimed by design: `baʿd aẓ-ẓuhr` is a two-token surface and claims no bare part, exactly as `kull yawm` never claimed `yawm` |
| M6-S08 mistake | `al-usbūʿ` | the plate's error IS the phrase falling apart; the whole two-token surface is the only indexed form |
| M6-S09 mistake | `qarīb` | correct at the time — M6's own index has no `qarīb`. M7-S10 then teaches it as the adjective, and M6's `why` points forward to that |
| M7-S01 mistake | `huwa` | the copula L1 never teaches; it exists to be crossed out |
| M7-S05 mistake · M7-S07 mistake · M7-S09 mistake · M7-S10 mistake | `al-sayyāra`, `al-bāb`, `sayyāraī`, `al-baytī` | each is the plate's error itself — an unassimilated article, an iḍāfa first noun wearing `al-`, a missing tāʾ, an article on a possessed noun |
| M8-S03 mistake | `faḍl` | "please" with no person on it is not a word of this course |
| M8-S05 mistake | `ithnān` | the number "two" exists but is never how two things are counted; the plate says so |
| M8-S05 variation · M8-S08 variation · M8-S10 variation | `sayyāratān`, `bi-riyāl`, `sa-ashtarī` | correct Arabic, deliberately not indexed: the dual of a second noun, a one-riyāl price and a future of the shopping verb are recognition material, not taught rows |
| M9-S04 mistake | `li-ʾannahā` | the plate's error is a pronoun AND a noun doing one job |
| M6-S04, M10-S06, M10-S07, M10-S09 variations | `sa-tadhhabīn`, `tuḥibbīn`, `tatakallamīn`, `tadhhabīn` | the feminine `-īn` forms are shown in variations for recognition and deliberately kept out of `forms`, the same call M3 made when it gave `turīdīn` its own row rather than folding it into `turīd` |

### Index seams decided here (they bind L2, if it is ever authored)

- **`sa` is M6-S01's and defines the prefix**, as the brief instructed. Every later `sa-` verb —
  `sa-ashtarī` (M8), `sa-anām` (M9) — inherits it without argument.
- **`kam` is taught before `bi-kam`, one sentence apart, on purpose.** Reversing them would have
  given the bare counting word the price question's note.
- **`fī` became a free word in M7 and nothing broke.** The four `fī …` phrases from M4–M5 and M9's
  `fī raʾyī` still win by longest match; the promise M5-S05's note made (*"M7 will set fī free"*) is
  kept, and it is the only forward promise in the course that a later module had to honour.
- **`maxSpan` is now 3**, because `in shāʾ Allāh` (M6-S05) is the course's first three-token surface.
  The resolver's greedy walk handles it; nothing else in the app reads `maxSpan` except the walk.
- **Still unclaimed after M10, and free for L2:** `laysa`, `lam`, `lan`, `mā`, `huwa`, `hiya`,
  `naḥnu`, `antum`, `ʿind` (bare — every form is written solid), `baʿd`, `qabl`, `bayna`,
  `ithnān`, `sitta`…`ʿashara`, `ʿishrūn`, `miʾa`, `in`, `shāʾ`, `Allāh`, `raʾy`, `faḍl`, `ghad`,
  `mumkin`, `jazīlan`, `marḥaban`, `Miṣr`, `nūr`.

## Where this pass disagreed and left it alone

Three calls a stricter reading would change, all left as they are because M1–M5 already shipped the
same shape and diverging mid-course costs more than the wart. Each is an open question below.

1. **Paradigm-row cues name one person.** A learner tapping `sa-nadhhab` in M10-S10 sees a row
   headed **sa-adhhab · I will go**, with the note underneath immediately naming `na-` as "we".
   This is #218's open question 17 and #216's shipped convention, carried forward unchanged — the
   course also still carries the other style (M3's `turīd` · "you want; she wants"). If it is ever
   settled it should be settled for all ten modules at once, not forked at M6.
2. **A `mistake` plate byte-identical to a `variation`.** This stretch adds none, but it does not
   remove any either: M1-S04, M2-S09, M5-S04 and M5-S06 still print one string twice on the same
   screen, once correct-for-her and once wrong-for-him. #218's open question 18 stands. M6-S07's
   plate was deliberately rewritten to avoid becoming a fifth instance.
3. **Grammatical-but-marked mistakes.** M7-S02's `taḥt kitāb` ("under a book") and M7-S08's
   `anā ʿindī sayyāra` (emphasis, not error) are both good Arabic that mean something slightly
   different. This is #218's open question 19 and #216's chosen shape for the pro-drop lesson; both
   `why` lines describe the meaning shift rather than calling the sentence ungrammatical.
4. **`allowedPatterns` does not enumerate every sentence.** M8-S09, M9-S05, M9-S08 and several of
   M10's turns sit outside the listed patterns. The
   patterns mirror the brief verbatim, which is what the field is for — the validator does not
   enforce them as a grammar — and M1–M5 are in the same position.

## Verification

- `npm run content:validate` → **CONTENT 30/30 ok**, no `fixture` flag on any en-ar module
- `npm run content:build -- --with-unverified --with-fixtures` →
  `en-ar: 10 modules (L1-M1..M10)`, indexes `164 / 191 / 217 / 256 / 275` surfaces for M6…M10,
  and **no `warn … carries no script line`** anywhere in the course
- `npm run content:build` (strict) → `en-ar: 0 modules — fixture course, excluded by the gate`,
  which is still correct: the course carries `fixture: true` in `content/courses.json` until #202
- `vitest run tools/validate.test.ts tools/content-build.test.ts src/course/types.test.ts` →
  **128/128 ok**, with the pinned inventories in `src/course/types.test.ts` (25 → 30 module files,
  en-ar romanization rule now covering 10) and `tools/content-build.test.ts` (dev-build shipped
  list, build line and emitted-file list) extended to all ten en-ar modules
- Full suite `vitest run` → **1188/1188 ok, 59 files** — run once because #217/PR #219 changed the
  module-list screen layer on `main`; nothing in that change touches content, and nothing here
  touches the screen layer
- **Rule reachability: 11/11 in M6, 11/11 in M7, 12/12 in M8, 10/10 in M9, 10/10 in M10** — every
  rule every module declares is cited by at least one sentence's `deconstruction.rules`, so every
  rule reaches a screen. `SentenceScreen` renders rules solely through those indices
  (`src/screens/SentenceScreen.tsx`, PRD §7), which is why an uncited rule reaches no learner —
  the defect #218 found in M5. M1–M5 re-checked at the same time: 9/9, 8/8, 9/9, 8/8, 8/8.
- **`content/en-ar/levels.json`: all ten L1 rows checked one at a time — L1-M1 … L1-M10 every one
  `hasContent: true` with no `draft` key.** This is the check #218's agent died in the middle of,
  and no validator or test catches a module file that ships while its ladder row stays locked. The
  L1 `draftNote` now records that the level itself stays `draft: true` only until the course leaves
  `fixture: true` at #202. L2 and L3 are untouched placeholders.
- Non-browser smoke per the host's standing rule (no browser automation on this machine):
  `vite` served the dev build on :5199 and `curl` fetched each artefact —
  `/content/en-ar/modules/L1-M6.json` (28,963 B), `L1-M7` (27,979 B), `L1-M8` (28,250 B),
  `L1-M9` (29,695 B), `L1-M10` (30,209 B) and their five index files
  (17,169 / 19,978 / 22,698 / 26,754 / 28,785 B), all `200`; `/content/en-ar/levels.json` read back
  with all ten L1 rows unlocked; `L1-M10.json` read back with `verified: true`, the LLM
  `verifiedBy` string, its ten rules and its Arabic `script` lines intact; `index/L1-M10.json` read
  back at 275 surfaces, `maxSpan: 3`. The RTL/font/visual-order checks #216 ran under CDP are NOT
  re-run here: the character repertoire M6–M10 adds is the same Naskh subset M1–M5 established, and
  the course still writes no Arabic-Indic digits anywhere (M8's numbers are words, not figures).

## Open questions for a native pass

Nothing below has been changed in the content. These are the calls where guessing would be worse
than asking. **No native Arabic reviewer exists for this course**, so this list is the honest state
of the modules. The twenty-two questions here are additional to the nineteen in
`docs/07-llm-review-en-ar-L1-M1-M2.md` and the twenty in `docs/09-llm-review-en-ar-L1-M3-M5.md`,
all of which still stand.

### Register and naturalness

1. **`in shāʾ Allāh` in a language course (M6-S05).** Included because a "Tomorrow" module without
   it would be teaching a future nobody actually says, and the note frames it as a softener rather
   than a religious statement. Is that framing right, and is the placement (sentence-final, after a
   comma) the everyday one?
2. **`sawfa` at all.** The brief asked for one or two recognition sentences and M6 gives it two
   (S02 and C04). Is `sawfa` genuinely met in spoken-simple MSA, or is it so bookish that a
   beginner should only ever see `sa-`?
3. **`baʿd aẓ-ẓuhr` for "this afternoon".** Chosen for the sun letter and the pairing with
   `fī aṣ-ṣabāḥ`. Is it what a person says, or is it `fī al-ʿaṣr` / `baʿda al-ẓuhr` with the vowel?
4. **`al-usbūʿ al-qādim` vs `al-usbūʿ al-muqbil`.** Both are given in dictionaries. Which is the
   everyday one?
5. **`riyāl` as the course's currency (M8).** The brief said pick one and keep it. `riyāl` covers a
   large part of the peninsula and leaves Egypt, the Levant and the Maghreb outside. Is a neutral
   choice possible, or should the sentences name no currency at all?
6. **`ghālī` written for `ghālin` (M8-S09).** Rule 9 declares the pause-form spelling out loud.
   Does it read as an error to an educated reader, or as the pause form the course intends? This is
   the same question M5's `kuntu taʿbān` raised, on a different word class.
7. **`ṭayyib` as "okay" (M10-S04).** Is it neutral MSA in this use, or has a colloquial discourse
   marker been let into `display` — the one thing #198 said never to do?
8. **`ahlan` on its own.** Written without `wa sahlan` in the hero and mentioned with it in the
   note. Is bare `ahlan` the everyday greeting, or is the doubled form the real one?
9. **`atakallam al-ʿarabiyya` (M10-S07).** Is the article kept when naming the language spoken, or
   is `atakallam ʿarabiyyan` / `atakallam ʿarabī` what is said?
10. **`fī raʾyī` (M9-S06).** Chosen over `aẓunn anna …` because `anna` would have collided with
    `li-ʾanna`'s indexed part `'anna` in the word index. Is `fī raʾyī` natural at this level, or has
    an index constraint chosen a phrase a beginner would not use?

### Grammar calls a native would settle in a second

11. **`al-jaww bārid ghadan` as M6-S06's mistake.** The plate says a verbless sentence cannot take a
    future time word. Is that firm, or is the sentence acceptable with the time word carrying the
    tense the way `ghadan ākul` does one sentence earlier? These two calls have to agree and this
    pass could not prove that they do.
12. **`Rohān yakūn fī as-sūq al-yawm` as M7-S06's mistake.** Written on the understanding that
    `yakūn` is for the habitual and the future, never for a present state. Is that clean enough to
    strike through?
13. **`kam hādhā?` as M8-S02's mistake.** Called "how many is this?", which is not a question. Is it
    genuinely unsayable, or does `kam hādhā` circulate as a price question?
14. **`bi-khamsa riyālāt` (M8-S08).** Is the price answered with `bi-` in the everyday register, or
    is the bare `khamsa riyālāt` what a shopkeeper says?
15. **`ʿindī kitābān` (M8-S05).** The dual is taught in the `-ān` form only, and the note says the
    other spelling carries only case. Does `kitābān` read as correct in every position a beginner
    will put it, or does dropping `kitābayn` produce sentences that look broken?
16. **`bi-sabab` against `li-ʾanna` (M9-S08).** The module treats the split as exactly parallel to
    English "because" / "because of". Is that true, or does `li-ʾanna` with a bare noun occur?
17. **`maʿa as-salāma` / `ilā al-liqāʾ` allocation (M10-S08, S10).** The notes say `maʿa as-salāma`
    is said TO the one leaving and `ilā al-liqāʾ` answers it. Is that the real division, or do both
    go either way?
18. **Adverb position.** M10 rule 5 fixes `ayḍan` and `qalīlan` at the end of what they qualify, and
    M10-S03's mistake plate is a fronted `ayḍan`. This is the same question #218 asked of `jiddan`
    and `faqaṭ` (its open question 7) and it is now load-bearing for two more words.

### Sound notes — the author cannot hear any of this

19. Every `sound` line is derived from written descriptions of MSA phonology, not from listening.
    New in these modules: the heavy `ẓ` of `aẓ-ẓuhr`, the doubled `l` of `atakallam` and
    `al-liqāʾ`, the doubled `m` of `muhimm`, the doubled `n` of `li-ʾannī`, the `ʿ` closing
    `usbūʿ` and `jāʾiʿ`, the catch inside `raʾyī`, the long final `ī` of `ashtarī` and `ghālī`,
    and the run-together `inshaʾAllāh`.
20. **Stress.** Every capitalised syllable (`sa-ADH-hab`, `li-ʾan-NEE`, `a-ta-KAL-lam`,
    `ki-taa-BAAN`, `ma-ʿEE`) is the author's claim and carries no citation — the romanization
    scheme does not mark stress. `sa-ADH-hab` in particular: does the prefix really leave the
    verb's own stress where M4 put it?
21. **Whether `sa-` is audible at all.** M6's whole lesson rests on one unstressed syllable. If it
    is routinely swallowed in speech, the `sound` lines are teaching a distinction the ear cannot
    make, and the module should lean harder on `ghadan`.

### Pedagogy calls the owner decides

22. **M8 teaches counting and stops at ten.** `wāḥid`, the dual, `thalātha`/`thalāth`,
    `bi-khamsa`, and the polarity law — but no 11–19, no tens, no hundreds, and no Arabic-Indic
    figures anywhere in the course. A learner leaves L1 able to ask a price and unable to
    understand most answers. Is that the right hole to leave in the level, or does L1 owe the
    numbers to twenty and the digits to go with them?
