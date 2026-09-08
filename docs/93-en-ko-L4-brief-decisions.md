# en-ko L4 — the authoring-brief decisions (#527)

The ten en-ko L4 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['en-ko']` L4-M1…L4-M10) are the
first Nuance briefs this course has had, and they are written the day L3 closed. Every seam below
was pinned against the REAL cumulative index — the fold of `public/content/en-ko/index/L1-M1.json`
through `L3-M10.json`, read on **2026-09-08** with `npm run content:owner`, which reported

> `831 surfaces owned, folded over 30 modules through L3-M10`

and a **`maxSpan` of 2** (the largest `maxSpan` in any of the thirty emitted index files; L1 closed
at 185 surfaces, L2 at 539, L3 at 831). The review chain the level inherits is `docs/35`–`docs/37`
(L1), `docs/47` (spoken Korean), `docs/68`'s L2 questions 1–47 and `docs/84`'s L3 questions 1–57,
every one of which is a native-pass item that no authoring wave may close by rewriting a shipped
module. The L4 module list itself is RATIFIED (#423, 2026-09-07) and the briefs mirror
`content/en-ko/levels.json`'s titles and jobs verbatim, as `tools/course-briefs.test.ts` enforces.

This note records the decisions the briefs are written to, so the authoring waves inherit them
without re-deriving anything. The briefs repeat each decision in the module notes, because a prompt
only ever shows an author the notes.

## 1. The romanization laws, carried forward unchanged

The eight L1 decisions of #373 (`docs/34`) bind L4 exactly as they bound L2 and L3, and L4 opens no
ninth:

- **Revised Romanization, transcribing pronunciation**, pure ASCII, and **no stress marks ever**.
  `tools/course-briefs.test.ts` checks the patterns are ASCII; the L4 patterns are.
- **The particle hyphen**, host in its isolation shape: `jeon-e`, `hu-e`, `ttae-kkaji`,
  `yejeon-e-neun`. **A hyphen means a particle or copula boundary and nothing else**, so every
  ending this level opens — `-(eu)ryeomyeon`, `-janayo`, `-(neu)ndeyo`, `-(eu)myeonseo`, `-gineun`,
  `-(eu)lji`, `-gon`, `-eotdeon` — is written ATTACHED and earns no bare key. §4 records the one
  place the course has already broken that rule.
- **`display` is the romanization only, `script` is the Hangul**, now drawn by the bundled face
  (#375) — the one law that has changed under this course since `docs/34` §8 was written, and it
  changes nothing an author does.
- **Assimilation and aspiration are WRITTEN**, because the romanization is how it is said:
  `masinneun`, `jochi`, `gwallibi`, `wannyago`. L4 adds `jochanayo` (좋잖아요) to that list, and the
  `-eotdeon` cluster to the list of things the native gate must settle (Q60, Q68).
- **`jeo`, never `na`** — and `PLAIN_STYLE` in `src/course/types.test.ts` enforces it, including
  inside L4-M10's quoted dialogue.
- Teaching fields in English, `glossEn` forbidden (#405), `literal` on nearly every sentence. L4
  needs `literal` more than L3 did, because M1 reverses the whole sentence (purpose first) and M5's
  central form is a clause that never reaches its verb.

## 2. Register — the level where one value finally changes, and the one that still does not

`docs/60` §1 settled the register and `docs/76` §2 carried it unchanged. **L4 is the first level to
move it**, and the move is confined to one module.

- The speech level is still the `-yo` style everywhere except L4-M7.
- **L4-M7 opens `-(seu)pnida`.** L1 froze it at two whole phrases, L2-M1 and L2-M5 added one each to
  make four, L3 kept the freeze; Official talk is the module the freeze was always being kept for,
  and it is named as the owner by L3-M4's brief, L3-M8's brief and `docs/76` §3.
- **This is a TEST CHANGE, not only a content change.** `FROZEN_FORMAL_L2` in
  `src/course/types.test.ts` fails any token ending in `mnida` outside the four frozen phrases for
  **every module whose id does not start with `L1-`** — L4 included. The gate must be re-scoped to
  `L1-`/`L2-`/`L3-` in the same commit that authors L4-M7. It must not be deleted: the freeze is
  what keeps the other twenty-nine modules honest, and deleting it would let any later module drift
  into the deferential level by accident.
- **The chip: `formal` on an honoured-subject or `-mnida` line, `neutral` on plain `-yo`, and
  `informal` NEVER.** The forms that would earn `informal` are banmal; L1 banned them, L2, L3 and
  now L4 do not lift the ban. M4 (persuading), M5 (disagreeing) and M10 (quoted dialogue) are the
  three places an author will reach for it, and all three briefs say so out loud. M10 says it last
  and loudest, because a quoted line is a real person talking and a real person talking to a friend
  talks banmal.
- `-(eu)psida` arrives with the `-mnida` level in M7 and arrives with a warning: it is a proposal
  downward or among equals and is never said upward. The upward proposal stays L2-M6's
  `-(eu)llaeyo` with the honorific.

## 3. What L3 withheld, and where it lands

`docs/76` §3's table named seven pieces as out of L3. Six of them are paid here; the seventh has no
owner in L4 either, and that is deliberate.

| withheld by L3 | named in | paid by |
| --- | --- | --- |
| step-by-step instructions | L3-M2 | **L4-M1** |
| cause and consequence across a paragraph | L3-M3 | **L4-M2** |
| the passive (`jeopsu-ga dwaeyo`) | L3-M8 | **L4-M2**, as the `-i/hi/ri/gi` lexical class |
| the past counterfactual `V-eosseumyeon V-eosseul geoyeyo` | L3-M4, L3-M10 | **L4-M3** |
| every time clause — `-(eu)l ttae`, `-gi jeon-e`, `-(eu)n hu-e`, `-(eu)myeonseo`, `-neun dongan` | L3-M1, L3-M4, L3-M9 | **L4-M6** |
| `-(seu)pnida` and `-(eu)psida` — the formal speech level | L3-M4, L3-M8, L3-M10 | **L4-M7** |
| the past-habit SYSTEM beyond L3-M9's two frames | L3-M9, L3-M10 | **L4-M8** |
| banmal as a written sentence | L3-M1, M5, M6, M10 | nowhere in this course |

The passive is placed in M2 rather than in M7, where L3-M8's example sentence (`jeopsu-ga dwaeyo`)
came from, for a reason worth writing down: a consequence is exactly the sentence that names no
agent, so the passive belongs with cause and consequence and not with the counter it happened to be
overheard at. M7 reuses it; it does not own it.

And the three pieces L3 never had a reason to open, each landing in the module whose job cannot be
done without it:

- **Purpose — `-(eu)ryeomyeon` and `-gi wihaeseo` → L4-M1.** L3 could sequence but never say why a
  step was taken, and an instruction without a purpose is a list.
- **The concession and the appeal to shared knowledge — `-gineun hajiman`, `-janayo` → L4-M4.**
  Korean argues by conceding first; L3-M3 could state an opinion with a reason and stop.
- **The trailing `-(neu)ndeyo` → L4-M5.** The single most-used disagreement in the language is a
  sentence that stops before its own verb, and L3-M3's hedge cannot do it.

## 4. Seams — checked against the emitted fold, not guessed

`maxSpan` stays **2**, and the fold holds exactly nine multi-token surfaces after thirty modules:
`an dwaeyo`, `annyeonghi gyeseyo`, `eoya dwaeyo`, `gaya dwaeyo`, `geot gatayo`, `geu daeum-e`,
`go isseoyo`, `jal meogeosseumnida`, `mannaseo bangapseumnida`. **L4 adds one and only one:
`algo boni` (M10), indexed WHOLE**, so that the bare `algo` and the bare `boni` stay unspent for a
later level. A multi-token surface donates nothing (`docs/34` §2.1 point 3).

**The endings still do not collide with the particles, and the reason is still the hyphen.** A verb
ending is written attached, so `haryeomyeon`, `itjanayo`, `joeundeyo`, `halji`, `meogeumyeonseo`,
`hagineun`, `hagon` and `eotdeon` are each one clean key donating nothing to the free bare forms
`ryeomyeon`, `janayo`, `neunde`, `deyo`, `ji`, `myeonseo`, `gin` and `gon`. §4.1 records where that
invariant has already leaked.

The collisions that ARE real, every one probed with `npm run content:owner` on 2026-09-08:

- **`bwayo → L2-M6` and `bwasseoyo → L2-M10`, both SEE.** This is the level's most expensive seam,
  because two different modules want the `-a/eo boda` auxiliary. The ruling is to **write the
  auxiliary JOINED**, following this course's own `-a/eo juda` rows, which are all single tokens
  (`sseojuseyo`, `dowajuseyo`, `gidaryeojuseyo`, `namgyeojuseyo` — L2-M1 and L2-M7): M1 writes
  `haeboseyo`, `meogeoboseyo`, `sseoboseyo`, each verified free, and the collision disappears
  entirely. It costs one key per verb; that is the price of matching L2-M1, and the alternative
  costs a learner a note about seeing on a sentence about trying.
- **`gin → L2-M2`, LONG.** M4's concessive must therefore be spelled `-gineun hajiman` and never
  contracted to `-gin hajiman`. `hagineun` and `bissagineun` are free.
- **`mal → L3-M5`, WORD.** M3's prohibitive regret `V-ji mal geol geuraesseoyo` writes a bare `mal`
  and must not be written; `an V-(eu)l geol geuraesseoyo` says the same thing.
- **`han → L1-M8`, native ONE.** M6's `-(eu)n hu-e` may never be built on `hada`. Build it on
  `gada` (`gan`, free), `meokda` (`meogeun → L3-M7`) or `boda` (`bon → L3-M2`). This is `docs/34`
  §3's ruling for L1-M8 and `docs/76` §4's for L3-M2, at the third place it bites.
- **`nasseoyo → L3-M7`, the symptom that comes out.** M2 must not use it for "something happened";
  `saenggyeosseoyo` is free and is the word.
- **`geot gatayo → L3-M3` as a WHOLE two-token surface.** M5's `-(eu)l geot gatayo` resolves across
  that span onto L3-M3's row, so M5 must NOT mint a bare `gatayo` — it is free and it stays free.
- **`ge → L3-M4`** (from `-neun ge eottaeyo`), so M2's `V-ge dwaesseoyo` spends nothing on `ge`, and
  `-ge` is written attached (`salge dwaesseoyo`) like every other ending.
- **`beon → L3-M7`, `bun`/`si → L2-M6`, `sae → L2-M9`.** No step in M1 may be numbered with a bare
  counter; `meonjeo` and `geu daeum-e` (L2-M10) do the numbering.
- L1–L3's homograph owners all stand: `il → L1-M9` and `i → L1-M1` still block the bare Sino one and
  two, `kkeseo → L3-M8`, `deo → L2-M5`, `su → L2-M1`, `geot → L2-M9`, `jom → L2-M1`,
  `hajiman → L1-M10`, `geureonde`/`geunde → L1-M10`, `rago`/`irago → L3-M5`.
- Proper nouns DO index on this course (#61 exempts them from the shown-surface ratchet, not from
  the index), so a place name in M9 rides on top of a common-noun sentence.

### 4.1 Three places the index contradicted the first instinct

Recorded here because a later reader will otherwise trust the brief, or the doc, over the fold.

1. **`-deon` HAS a bare key, and `docs/76` says it never will.** `content:owner` reports
   `deon → L3-M9`. `docs/76` §4 states that `-deon` "never earns a bare key" because a verb ending
   is never hyphenated — and the emitted index disagrees, because `content/en-ko/modules/L3-M9.json`
   S04 lists the bare `"-deon"` inside its row's `forms` array, and `normalizeSurface` drops edge
   punctuation, so the hyphen came off and the key was minted. **The `forms` array mints keys too.**
   Two consequences bind L4-M8: it points BACK at L3-M9 for `-deon` rather than opening it, and no
   row in the level may put a bare `-eotdeon`, `-gon`, `-janayo` or `-eoss-eoss-` into a `forms`
   array. This is a correction to `docs/76` made here rather than in a shipped file, exactly as
   `docs/76` §4 corrected `docs/34`'s homograph table for `mal`.
2. **`ttae` is genuinely free, and the L3 deferral held.** L3-M9's brief said `ttae` "has no key and
   must not take one here"; `content:owner` says `ttae → free`, so the deferral was honoured in the
   authored content and not only in the brief. L4-M6 collects it, along with `jeon`, `hu`, `dongan`,
   `ji`, `nyeon`, `beolsseo`, `ajik` and `naseo`, all free. `geuttae` is also free and is ONE token
   — `surfaceIndexKeys` splits only hyphens — so M3 may write it without spending M6's key.
3. **Two modules both wanted the bare `ji`, and orthography settles it rather than sequence.**
   M5's `-(eu)lji` (uncertainty) is one attached token — `halji`, `galji` — while M6's `-(eu)n ji`
   (elapsed time) is a bound noun written with a SPACE and takes the bare key. Had M5 written its
   ending spaced, first-occurrence-wins would have given `ji` to the wrong module and M6's learner
   would have been shown a note about not knowing. The Korean orthography and the index agree here,
   which is the only reason the ruling is safe.

### 4.2 Two engineering consequences of merging these briefs

- `tools/course-briefs.test.ts` currently asserts `Object.keys(COURSE_BRIEFS['en-ko'])` equals
  exactly `L1-M1…L3-M10` ("covers exactly L1-M1..L3-M10 — L2 came with #433 and L3 with #469"). It
  has to grow the L4 ids in the same commit that merges the briefs.
- `tools/shown-surfaces.test.ts` holds en-ko at **12**, the baseline the course opened with and held
  across thirty shipped modules. A finding is fixed by opening the surface on the row that already
  owns its word, never by raising the number.

## 5. The shape of the level

- Bounds climb **12 → 13 → 14: M1–M3 at 12, M4–M7 at 13, M8–M10 at 14**, continuing L2's 8 → 10 and
  L3's 10 → 12 in the same 3/4/3 shape. The climb buys CLAUSE, not vocabulary, and each step is
  bought by a specific shape:
  - **12 for M1–M3.** An instruction longer than twelve words is two instructions, and M1 should
    not be allowed to write one. M2's `-aseo`/`-(eu)nikka` contrast and M3's counterfactual are both
    two-clause sentences that L3-M8 already proved fit in twelve.
  - **13 for M4–M7.** M4 needs a concession and a comeback in one sentence
    (`bissagineun hajiman ...`), M5 needs a lead-in plus a trailing `-(neu)ndeyo`, M6 needs a time
    clause IN FRONT of a full main clause — the first module in the course where a whole subordinate
    clause is grammatically required — and M7's announcements are the longest natural sentences the
    course has printed.
  - **14 for M8–M10.** M8 runs `yejeon-e-neun` against `jigeum-eun` inside one sentence, M9 carries
    a direction inside a narrative sentence, and M10 carries a quoted clause plus its frame. Fourteen
    is a ceiling for the sentence INSIDE the account, as it was at L3-M10, not for the account.
- `newWordCap` stays the PRD §5 **25** everywhere, which `tools/course-briefs.test.ts` enforces
  (`expect(brief.newWordCap).toBe(NEW_WORD_CAP)`); pools are authored to 12, the course's shipped
  size.
- **M10's items are capped at six sentences**, and its new-word spend should be near zero: the exit
  is assembly. Six rather than L3-M10's eight because the job is a SHAPE (a story that re-reads once
  the twist lands) rather than a length, and a quoted line costs a sentence of its own.
- Every module ships fully enriched, as all thirty below it did.

## 6. What L4 defers to L5, and why

| deferred | named in | belongs to |
| --- | --- | --- |
| idioms, proverbs, the figurative everyday | M8, M9, M10 | L5-M1 |
| irony, sarcasm, saying the opposite and being understood | M4, M5, M10 | L5-M2, L5-M7 |
| regional and generational speech | nowhere in L4 | L5-M3 |
| speeches, toasts, condolences, ceremony | M7 | L5-M4 |
| a structured case with objections answered | M4 | L5-M6 |
| `-(eu)l ppeonhaesseoyo` and the shades of nearly and barely | M3 | L5, unassigned |
| the written `-(neu)nda` style | M1, M7, M10 | nowhere in this course |
| banmal as a written sentence | M4, M5, M10 | nowhere in this course |

`-(eu)l ppeonhaesseoyo` is the one deferral without a named owner, and the reason is honest: a near
miss is not a counterfactual, M3 would have to teach the difference in the same breath as the
counterfactual itself, and no L5 job obviously wants it either. It is recorded as unassigned rather
than quietly dropped so that whoever writes the L5 briefs has to decide.

## Why the en-ko L4 ladder teaches what it teaches

The jobs are `content/en-ko/levels.json`'s and are mirrored verbatim; what the briefs add is which
English→Korean delta each job carries, and each pressure point lands in the module whose job cannot
be done without it.

Purpose in M1, because a step without a reason is a list and because Korean has no infinitive to
carry English's "to". The causal contrast and the passive in M2, because `-aseo` and `-(eu)nikka`
have been sitting side by side since L1-M9 and L3-M3 without ever being told apart, and because a
consequence is the sentence that names no agent. The doubled past in M3, because Korean marks
unreality with tense rather than with a mood, so the module opens almost no new grammar and spends
everything on the one rule that must be true before it is memorable: `-eosseoya haesseoyo` says HAD
TO, not should have. `-janayo` and `-gineun hajiman` in M4, because Korean argues by conceding
first and an English speaker's directness reads as an attack. The trailing `-(neu)ndeyo` in M5,
because the most-used disagreement in the language is a sentence that stops before its verb, and
because `jom eoryeoul geot gatayo` is a refusal and not a difficulty rating — the single most
expensive misreading in the course, since it survives every correction that is only about grammar.
The whole time-clause set in M6, held back by three separate L3 briefs so that it could be taught as
ONE system with one law: the tense of a time clause is fixed by the connective, not by the sentence.
The deferential level in M7, because a station and a counter are the only places a learner meets it
and the only places they need it. The four shapes of English "used to" in M8, because the mapping is
many-to-one in the wrong direction and a learner will otherwise use whichever they met first
everywhere. The experience frame and the compound directionals in M9, because a journey told in
Korean is verbs where an English one is prepositions. And in M10 almost nothing new at all: six
sentences, one quoted line, and a twist that makes the first four read differently.

`npm run content:prompt -- en-ko L4-M1` renders from the real index, and the bounds, the
withheld-piece owners, the collision rulings and the L5 deferrals should be pinned by
`tools/course-briefs.test.ts` (`en-ko L4: the decisions its briefs settle (#527)`) as the L2 and L3
sets are.

## Open questions for the native-speaker gate

Continuing this course's chain: `docs/84`'s L3 questions run to **57** (the L2 chain, 1–47, lives
separately in `docs/68`), so these begin at 58. Nothing here may be closed by an authoring wave rewriting a shipped module.

58. **`-(eu)ryeomyeon` against `-gi wihaeseo`** (M1). Confirm that `-(eu)ryeomyeon` is what a person
    actually says in front of an instruction, and that `-gi wihaeseo` reads as explanatory or
    written rather than spoken, so the brief's split between them is a register split and not an
    invention.
59. **The joined auxiliary** (M1, and §4 above). Confirm `haeboseyo` and `meogeoboseyo` written as
    single words match how this course already writes `dowajuseyo` and `gidaryeojuseyo`, and that no
    Korean reader would expect the space. The index ruling depends on the answer.
60. **`jochanayo`** (M4). Confirm the aspiration is written the way this course writes `jochi`, and
    that 좋잖아요 is heard often enough to be worth a row at all.
61. **`-janayo` upward** (M4). Confirm it is genuinely wrong rather than merely casual with an elder
    or a stranger, and whether the honorific `-(eu)sijanayo` changes that.
62. **`ttaemune` against `deokbune`** (M2). Confirm `ttaemune` really does lean negative in ordinary
    speech, and that using it for a piece of good luck reads as blaming rather than as neutral.
63. **The `-aseo` tense rule** (M2). Confirm a past marker before `-aseo` is ungrammatical rather
    than merely unusual, and that `-(eu)nikka` genuinely takes one.
64. **The passive inventory** (M2). Confirm `boyeoyo`, `deullyeoyo` and `yeollyeoyo` are the three a
    learner meets first, and name any fourth that belongs beside them at this level.
65. **`-eosseoya haesseoyo`** (M3). The module's load-bearing claim. Confirm it is ambiguous between
    had to and should have, and that `-(eu)l geol geuraesseoyo` is the unambiguous regret.
66. **`jom eoryeoul geot gatayo` as a refusal** (M5). Confirm a Korean listener hears a closed no
    rather than an opening, and whether anything in the reply reopens it.
67. **The trailing `-(neu)ndeyo`** (M5). Confirm a sentence that stops there is complete rather than
    interrupted, and that the unsaid objection is understood without any further marking.
68. **The `-eotdeon` romanization** (M8). The wave's unresolved spelling. Confirm how 갔던 and 살았던
    are said, and therefore written, under this course's rule that assimilation and tensing are
    written rather than spelled.
69. **`-deon` against `-eotdeon`** (M8). Confirm the split the brief states — unfinished or repeated
    against finished and shut — holds for a native ear, and that `-gon haesseoyo` is a third thing
    and not a synonym of either.
70. **`-(eu)myeonseo` and the same subject** (M6). Confirm the same-subject requirement is absolute,
    and that `-neun dongan` is what a speaker reaches for the moment the subjects differ.
71. **`ajik`** (M6). Confirm one word really does cover both not yet and still, with only the
    polarity of the clause deciding, and that no second adverb is needed for either.
72. **`-(eu)psida` upward** (M7). Confirm it cannot be said to an elder, a customer or a superior,
    and that `-(eu)sillaeyo` is what replaces it.
73. **Heard against said** (M7). Confirm the brief's division is right: that a learner at a counter
    hears `-(seu)pnida` and `-(eu)sipsio` constantly and produces almost none of it, and name
    anything in the set they genuinely do produce.
74. **`V-(eu)n jeok isseoyo`** (M9). Confirm the experience frame is what a Korean speaker uses for
    have you ever, and that the plain past would be heard as a different question rather than as a
    clumsy one.
75. **The quoted line's register** (M10). The level's sharpest register claim. Confirm a directly
    quoted `-yo` line inside a narrative reads as natural rather than as a sanitised banmal line,
    and that a quoted announcement in `-(seu)pnida` is the safest way to put the formal level into
    a story.
