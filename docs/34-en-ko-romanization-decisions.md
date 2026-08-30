# en-ko — the romanization decisions (#373), and the quiet Hangul line (#375)

**Date:** 2026-08-30 · **Course:** en-ko — English (L1) → Korean (L2), the ninth course ·
**Status:** decided, and executed by #374 (skeleton), #376 (briefs) and #377–#379 (content).

This file is the durable record #373 asked for. `content/courses.json`'s `romanizationNote` carries
the one-paragraph summary; everything a brief or an author needs beyond that paragraph is here.

---

## 0. Why this file exists before any Korean was written

`docs/design-contract.md` — "Divergence — rung teaches speech, not script (2026-08-30, #353)" —
ends with a forward rule:

> **A new non-Latin course is romanized from its first commit, never retrofitted.**

en-ru is why. It shipped `scriptMode: "native"`, which put **959 Cyrillic `display` strings** in
front of an English speaker who could not decode one of them, and undoing it took six issues
(#353–#360) and a rewrite of every module file in the course. Korean is written in Hangul. The same
mistake was available on day one, and this file is the thing that prevents it: the scheme was
settled before the manifest row existed, so the row's `romanizationNote` was true the moment it
landed and `tools/content-build.ts` `checkScriptMode` has been failing Hangul `display` strings
since before there was a module to put one in.

`checkScriptMode`'s allowed set is three Unicode scripts — Latin, Common, Inherited — and its own
comment names what it rejects: *"Cyrillic, Arabic, Devanagari, Greek, Hebrew, Han, Kana, **Hangul**,
Thai."* The rule is enforced, not merely intended.

---

## 1. The scheme: Revised Romanization (RR), transcribing pronunciation

**Chosen: the Revised Romanization of Korean** (South Korean government standard, 2000), the
transcription variety — the one that writes what is said, not what is spelled.

Three reasons, in the order they actually decided it:

1. **It is pure ASCII.** No macron, no breve, no apostrophe. That is mechanical, not aesthetic:
   `tools/payload-budget.ts` charges a romanized course a `latin-ext` font cut for its diacritics
   (`ROMANIZATION_SCRIPT`), which is what en-ar's `ā ī ū ḥ ṣ ḍ ṭ ẓ` and en-ru's acutes cost. An
   ASCII scheme is charged **nothing** — every character it can emit is inside Mukta's `latin` cut,
   `U+0000-00FF`. **Verified**: see §7.
2. **McCune–Reischauer is disqualified by `src/engine/surface.ts`, not by taste.** MR writes the
   aspirates with an apostrophe (`k'`, `t'`, `p'`, `ch'`) and two vowels with breves (`ŏ`, `ŭ`).
   `surface.ts` rule 2 folds every right-side apostrophe class into `'` U+0027 and rule 3 strips
   edge punctuation while exempting `'` — so MR would put Korean's single most important consonant
   contrast on the one character the normaliser has the most rules about, and would put two vowels
   outside ASCII for no gain. RR puts both in plain letters.
3. **It is what the learner meets everywhere else** — road signs, menus, every Korean-learning
   resource published since 2000. A speaking course whose spellings match nothing outside the app
   is teaching a private notation.

### 1.1 The full mapping

**Vowels (21).** `ㅏ a · ㅐ ae · ㅑ ya · ㅒ yae · ㅓ eo · ㅔ e · ㅕ yeo · ㅖ ye · ㅗ o · ㅘ wa ·
ㅙ wae · ㅚ oe · ㅛ yo · ㅜ u · ㅝ wo · ㅞ we · ㅟ wi · ㅠ yu · ㅡ eu · ㅢ ui · ㅣ i`

**Consonants, initial (19).** `ㄱ g · ㄲ kk · ㄴ n · ㄷ d · ㄸ tt · ㄹ r · ㅁ m · ㅂ b · ㅃ pp ·
ㅅ s · ㅆ ss · ㅇ —(silent) · ㅈ j · ㅉ jj · ㅊ ch · ㅋ k · ㅌ t · ㅍ p · ㅎ h`

**Consonants, final (batchim).** `ㄱㄲㅋ k · ㄴ n · ㄷㅅㅆㅈㅊㅌㅎ t · ㄹ l · ㅁ m · ㅂㅍ p ·
ㅇ ng`, and the clusters resolve to their pronounced member: `ㄳ k · ㄵ n · ㄶ n · ㄺ k · ㄻ m ·
ㄼ l (p in 밟-) · ㄽ l · ㄾ l · ㄿ p · ㅀ l · ㅄ p`.

**Word-internal sound changes are written, because RR transcribes.** `학교 hakgyo`, `신라 silla`,
`좋아요 joayo`, `같이 gachi`, `십만 simman`, `한국말 hangungmal`. The romanization is the sound.

### 1.2 One named deviation: the stem keeps its shape across the hyphen

Strict RR resyllabifies across a particle boundary: `책을` is `chaegeul`, `밥을` is `babeul` — the
final consonant voices and moves. **This course does not do that at the hyphen.** It writes
`chaek-eul`, `bap-eul`, `hakgyo-e`, and puts the liaison in `sound` ("say it as *chae-geul* — the
k softens to g between vowels").

The reason is the word index, not the phonetics. `tools/content-build.ts` matches surfaces
**verbatim** and is **first-occurrence-wins**. If the noun's romanized shape changed with every
particle — `chaek`, `chaeg-eul`, `chaeg-i`, `chaeng-man` — then "book" would mint a fresh surface
per particle, and the bare noun a later module wrote would resolve to none of them. The learner
taps the word and gets nothing, or gets a different word's note. That is the `का` bug
(`docs/08-marathi-third-review.md`, correction 4) with Korean morphology behind it.

So: **morphophonemic at the hyphen, phonemic everywhere else.** Inside a token, RR's sound changes
are written in full. At a particle or copula boundary, the stem is written in its isolation shape
and the ending is written in its own, and `sound` carries the join. Where a stem's linked shape is
audibly different enough that a learner would not recognise it (`ㅅ`/`ㅈ`/`ㅊ`/`ㅌ` finals — `옷`
is `ot` alone but *os-* before a vowel), the word row carries both shapes in `forms`, so both
resolve to the same row.

### 1.3 RR's disambiguation hyphen is banned

The standard allows a hyphen to break a syllable ambiguity (`중앙` → "jung-ang"). **Not here.** In
this repo a hyphen is a semantic split: `surfaceIndexKeys` grants a key to every hyphen part, so
"jung-ang" would mint the junk keys `jung` and `ang` and hand them to whichever row got there
first. Where a string is genuinely ambiguous, pick a different word for L1 or let `sound` carry the
break. The hyphen means one thing in this course: **a particle or the copula is attached here.**

---

## 2. The particle hyphen — the decision the whole course rests on

Korean writes its particles attached, with no space: `책을`, `저는`, `학교에서`. Romanized naively
that is one whitespace token each — `chaegeul`, `jeoneun`, `hakgyoeseo` — and
`tokenizeSurface` counts whitespace tokens. The consequence, if nothing is done: **the bare noun
never appears as a surface anywhere in the course**, so "book" has no row of its own and every
particle is invisible to the index.

`src/engine/surface.ts` already solves this, and its header says so under **Hyphens** (#116, [Q3]):
`al-qahwa` is one surface, and the emitter *also* indexes `al` and `qahwa` against the same entry.

**Decision: every particle and the copula are written hyphenated onto their host.**
`jeo-neun`, `chaek-eul`, `hakgyo-e`, `hakgyo-eseo`, `haksaeng-ieyo`, `chingu-hago`.

### 2.1 Verified, not assumed

Run against the real functions (`src/engine/surface.ts`), 2026-08-30:

| input | `normalizeSurface` | `surfaceIndexKeys` |
| --- | --- | --- |
| `Jeo-neun haksaeng-ieyo.` | `jeo-neun haksaeng-ieyo` | `["jeo-neun haksaeng-ieyo","jeo","neun","haksaeng","ieyo"]` |
| `chaek-eul` | `chaek-eul` | `["chaek-eul","chaek","eul"]` |
| `-neun` | `neun` | `["neun"]` |
| `jal jinaeseyo?` | `jal jinaeseyo` | `["jal jinaeseyo"]` |

Four things follow, and all four are load-bearing:

1. **A one-token hyphenated surface donates its parts.** `chaek-eul` earns `chaek-eul`, `chaek` and
   `eul`. One authored string, three useful keys — and the one that matters is `chaek`, because a
   row's own `display` is read before any of its longer forms, so a bare noun always resolves to
   the row that taught it. That is what the hyphen was chosen for.
2. **A leading hyphen is stripped as edge punctuation**, so a word row written `-neun` claims the
   key `neun` — *if it gets there first*. It does not, and the emitted index is what said so.
   L1-M1's index gives `neun` to the `jeo` row (via the form `jeo-neun`) and `ieyo` to the
   `haksaeng` row (via `haksaeng-ieyo`), because the emitter walks *sentence → word → forms* and
   the host row is written in sentence order, ahead of the ending it carries. **The plan changed
   rather than the module** (#377 says to do exactly that): putting the endings before the words
   they attach to would fix index entries nobody can reach, and would leave the breakdown panel no
   longer reading in sentence order. It is safe because Korean never writes a bare particle as its
   own whitespace token — pinned by a test, not assumed — and the particle rows still do their real
   job, which is being read in the deconstruction panel, directly, never through the index.
3. **A multi-token surface does NOT donate its individual tokens** — only hyphen parts. `jal
   jinaeseyo` earns one key. So a fixed phrase stays whole, which is what we want for greetings.
4. **The question mark is stripped**, so a question and its statement twin are the **same index
   key**. Intended: in Korean they are the same words. Recorded here so no later reader files it as
   a bug.

### 2.2 The allomorph pairs are two surfaces each

`은/는`, `이/가`, `을/를`, `으로/로`, `과/와` are one particle each with two shapes, chosen by
whether the previous syllable ends in a consonant. Romanized: `eun`/`neun`, `i`/`ga`, `eul`/`reul`,
`euro`/`ro`, `gwa`/`wa`. The index will never merge them.

**Decision: one word row per particle *function*, carrying both shapes in `forms`,** with a note
written to be true of both. `forms: ["-neun", "-eun"]` gives the row the keys `neun` and `eun`, and
the note says which host takes which. Two rows for one function would double the vocabulary count
and split a note that has to be read as one rule.

---

## 3. Homographs — assign an owner, because first occurrence wins

The romanization is pronunciation-faithful, so Korean's homophones stay homophones. They are not a
defect of the scheme; they are the language, and the product teaches speech.

| surface | readings | owner |
| --- | --- | --- |
| `nun` | 눈 eye · 눈 snow | keep the second out of L1 |
| `bae` | 배 pear · boat · belly | not taught in L1 |
| `mal` | 말 word · horse | word (M9); horse not taught |
| `cha` | 차 tea · car | **tea (M3)**; "car" stays out of L1 |
| `bam` | 밤 night · chestnut | night (M4); chestnut not taught |
| `i` | 이 subject particle · this · two · tooth | **the particle (M1)**; `i-geo` "this thing" is a separate hyphenated surface; the Sino-Korean two is `i` in M8 and is the one genuine collision — M8's numeral row must not steal the key, so the numeral is taught inside `i-cheon`-shaped compounds and as `du` (native) where a bare form is needed |

The rule the table serves: the earliest module to write a surface owns the note every later
module's learner sees. A later row with a different meaning is unreachable, and the learner is
shown a note that is false of the sentence in front of them.

---

## 4. Case folding is a non-issue here — checked, not assumed

`surface.ts` rule 4 lowercases without a locale and never touches diacritics. RR capitalises proper
nouns (`Hanguk`, `Seoul`) and sentence case capitalises the first word of a `display` — all of
which fold away harmlessly, exactly as `Soy`/`soy` do in en-es.

This is en-de's catastrophe (#361 (b): German capitalises every noun, so `Essen`/`essen` and
`Morgen`/`morgen` are one index entry each) **not happening**. Recorded so nobody goes looking for
it, and so nobody "fixes" the romanization to avoid a problem it does not have.

---

## 5. Transcription means one word has several spellings

Because RR writes the sound, a verb stem's shape changes with what follows: `joayo` / `jota`,
`meogeoyo` / `meokda`, `ilgeoyo` / `ikda`. The index matches verbatim, so those are separate
surfaces.

**Decision:** a word row's `forms` carries **every shape that course's sentences actually use**, and
only shapes of that same word. The `forms` rule from `docs/07-llm-review-L1-M6-M10.md` binds
unchanged: never a cousin, never a synonym, never a set of siblings — hi-mr shipped four rows whose
`forms` had swallowed a *different* word, and the Why panel answered taps with the wrong gloss.

In practice L1 teaches the polite `-yo` forms almost exclusively, so most rows carry one or two
shapes; M5's past forms are the exception and are listed on the same row as the present, because
they are the same verb.

---

## 6. `sound`, and why Korean is the opposite of Russian here

en-ru had to mark stress on every polysyllable (#355 requirement 2) because Russian vowel reduction
is unintelligible without it. **Korean has no English-style stress**, and marking one would teach a
wrong thing. No acutes, ever. If a later reader reaches for them out of symmetry with en-ar or
en-ru, this paragraph is the answer.

What `sound` must carry instead:

- **The three-way stop contrast** — plain `g d b j`, tense `kk tt pp jj`, aspirated `k t p ch`.
  English hears two categories (voiced/voiceless) where Korean has three, and the plain series is
  the one an English speaker gets wrong: it is neither English "g" nor English "k".
- **`eo` vs `o` and `eu` vs `u`**, which an English reader collapses on sight.
- **Unreleased finals** — `bap` does not end the way English "bop" does; the lips close and stop.
- **The liaison at the hyphen** (§1.2), every time it is audible.
- **Even pitch.** Written so it cannot be read as a stress mark.

---

## 7. Verification runs (the criteria #373 asked for)

**ASCII claim.** Every character the mapping in §1.1 can emit is `[a-z]`, plus the hyphen of §2 and
ordinary sentence punctuation. Consequence: **no `ko` key in `SCRIPT_BY_LANGUAGE_TAG`** for the
romanization, and no `latin-ext` charge — unlike `ar` and `ru`. en-ko is charged **content only**
for everything the learner reads.

**`checkScriptMode` policy.** The allowed set is Latin + Common + Inherited; Hangul is named in its
reject list. An ASCII romanization passes trivially; a Hangul `display` fails the build. Both halves
were exercised on the authored modules (#377–#379) and reported there.

**`surfaceIndexKeys`.** The table in §2.1 is the actual output, not a reading of the source.

---

## 8. The quiet Hangul `script` line (#375) — decision and the honest defect

`script` is the optional quiet native line, rendered in `--font-script-fallback` on five surfaces.
It is typed on `Sentence`, `Variation` **and** `PoolItem` (`src/course/types.ts`) — unlike `sound`,
which exists only on `Sentence`. So Hangul is authorable on all three, and #362's "do not put
`sound` on a variation" rule does not transfer.

**What was checked (2026-08-30).** `@fontsource/noto-sans-kr@5.3.0` exists and installs. It ships
**2250 files**: the Korean coverage is split Google-style into ~120 numbered `unicode-range` slices
per weight (`files/noto-sans-kr-0-400-normal.woff2` … `-119-`), and there is **no single
`noto-sans-kr-korean-400-normal.woff2`**. `tools/font-subset.ts` is built on one source file per
target (`files/<slug>-<subset>-<weight>-normal.woff2`), and a harvest of a few hundred Hangul
syllables would land in dozens of those slices at once. Bundling Hangul is therefore a **pipeline
change**, not a target addition.

**Decision: (B) — author the Hangul `script` line, and record the fallback as an honest defect.**

- The data is right forever: every sentence, every variation with a distinct Korean form, and every
  pool item carries its Hangul in `script`. If a face is bundled later, it renders with no content
  change.
- The rendering is the device's: with no `hangul` target, `coveredChars` drops those codepoints from
  every subset, `--font-script-fallback` falls through Mukta and Source Sans 3 (neither claims
  Hangul) to `system-ui`. On a phone that is a real Korean face. On a stripped Linux — the Pi that
  builds this repo included — it is tofu.
- This is exactly the shape of the defect en-ar has shipped since #202 and the README records:
  *"the romanization's ā ī ū ḥ ṣ ḍ ṭ ẓ ʾ ʿ render in the system font"*. The difference is that this
  one was found before authoring rather than after, and it is written down here **and** in the
  README's "en-ko ships" paragraph.
- **Not (C).** A learner who wants to see what they are saying should be able to; the field costs
  the build nothing, and #353 confines the native text to the quiet line rather than abolishing it.

**Follow-up, deliberately not done in this arc:** `tools/font-subset.ts`'s one-source-file-per-target
assumption is what blocks a Hangul cut. Fixing it (a target that reads several source files and
subsets their union) would let en-ko's quiet line render from a bundled face, and would be the same
mechanism any future CJK course needs. It is a pipeline issue, not a course issue, and it is not
allowed to block a module.

---

## 9. The `romanizationNote` paragraph, verbatim

The string below is what `content/courses.json`'s en-ko row carries. It is pasted, not re-derived.

> Revised Romanization of Korean (the 2000 South Korean standard), transcribing pronunciation
> rather than spelling: plain g d b j, tense kk tt pp jj and aspirated k t p ch; vowels a eo o u eu
> i with ae e for the front pair and the y-/w- glides written out; word-internal sound changes are
> written as they are said (hakgyo, silla, joayo). It is pure ASCII — no diacritic, no apostrophe —
> so nothing here needs a font cut of its own. One deliberate deviation from the standard: a
> particle or the copula is joined to its host with a hyphen and the host keeps its isolation shape
> (chaek-eul, jeo-neun, haksaeng-ieyo), with the liaison given in the sound line, so that the bare
> noun and the bare particle each keep an index key of their own; the standard's
> syllable-disambiguation hyphen is never used. Every display string in this course follows this one
> scheme — the word index matches surfaces verbatim, so a second scheme would break resolution.
