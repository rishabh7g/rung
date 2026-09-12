# en-sa — the romanization and the sandhi rule (#604)

**Date:** 2026-09-12 · **Course:** en-sa — English (L1) → Sanskrit (L2), the tenth course ·
**Parent:** #603 · **Status:** decided; executed by the skeleton, brief and authoring issues of the
arc. The codepoint list in §1.2 is the hand-off to the font issue (#605).

This file is the durable record #604 asked for. `content/courses.json`'s en-sa `romanizationNote`
will carry the one-paragraph summary (§11, drafted verbatim); everything a brief or an author needs
beyond that paragraph is here.

Every mechanical claim below was **run**, and the command and its real output are quoted at the
point of the claim. Where a run contradicted the recommendation the issue arrived with, the
contradiction is recorded and the wording changed — see §1.3 (ISO 15919's anusvāra is precomposed
after all) and §9 (`script?` is typed on five surfaces, not the three `docs/34` §8 says).

---

## 0. Why this file exists before any Sanskrit was written

`docs/design-contract.md` — "Divergence — rung teaches speech, not script (2026-08-30, #353)" —
ends with a forward rule:

> **Forward rule: a new non-Latin course is romanized from its first commit, never retrofitted.**

en-ru is the measured cost of not doing that: 959 Cyrillic `display` strings plus 698 prose fields,
undone across #353–#360. en-ko (#373, `docs/34-en-ko-romanization-decisions.md`) is the precedent
for deciding first, and this file follows its shape deliberately.

Sanskrit is written in Devanagari, so en-sa ships `scriptMode: "romanized"` and the Devanagari is
confined to the quiet `script` line (§9). `tools/content-build.ts` `checkScriptMode` enforces it,
and its own comment names Devanagari in the reject list. §10 runs that check over the full IAST
mapping before a single module exists.

**The tools verified against, and the one command that reaches them:**

```
cd /home/user/rung && npx tsx <script>
```

`tsx` is this repo's runner for `tools/*` (`package.json`: `content:validate`, `content:build`,
`fonts:build` and `budget` are all `tsx …`), so a scratch script that imports
`src/engine/surface.ts` and `tools/content-build.ts` directly runs the real code with no shim.
The two scratch scripts used here live outside the repo and are not committed.

---

## 1. The scheme: IAST, precomposed

**Chosen: IAST** — the International Alphabet of Sanskrit Transliteration, the 1894 Geneva
standard, in **precomposed (NFC) form**.

Three reasons, in the order they actually decided it:

1. **Every ASCII scheme is disqualified by `src/engine/surface.ts` rule 4, not by taste** (§1.3).
   Rule 4 case-folds to lowercase without a locale; Harvard-Kyoto and ITRANS both carry meaning in
   capitalisation, so both collapse distinct words into one index key. Verified, not argued.
2. **ISO 15919 costs composition where IAST does not** (§1.4). ISO's vocalic liquids are a base
   letter plus a combining ring below that NFC does not compose — two and three codepoints for a
   single letter. IAST's are precomposed, single codepoints, every one of them.
3. **It is what the learner meets everywhere else.** Every Sanskrit dictionary, grammar and
   textbook in English uses IAST. A speaking course with a private notation teaches a notation.

### 1.1 The full mapping

**Vowels (13 simple + 2 diphthong pairs).**
`अ a · आ ā · इ i · ई ī · उ u · ऊ ū · ऋ ṛ · ॠ ṝ · ऌ ḷ · ॡ ḹ · ए e · ऐ ai · ओ o · औ au`

**The two ayogavāha.** `ं ṃ` anusvāra · `ः ḥ` visarga.

**Consonants, the five series plus the semivowels and sibilants.**

| series | IAST |
| --- | --- |
| velar | `k kh g gh ṅ` |
| palatal | `c ch j jh ñ` |
| retroflex | `ṭ ṭh ḍ ḍh ṇ` |
| dental | `t th d dh n` |
| labial | `p ph b bh m` |
| semivowels | `y r l v` |
| sibilants + h | `ś ṣ s h` |

Two conventions fixed here so no author re-picks them:

- **`c`, never `ch`, for च; `ch` is छ.** The English-spelling habit ("chai") is wrong in IAST and
  would collide छ with च.
- **`v`, never `w`, for व.** `sound` carries the "between v and w" realisation; the spelling does
  not move.
- **`jñ` is written `jñ`** (`j` + `ñ`), and the *pronunciation* is a `sound` matter (§7).

### 1.2 The exact codepoint list — the hand-off to the font issue (#605)

Derived by walking the §1.1 mapping character by character, lowercase and its `toUpperCase()`,
and printing every codepoint above U+007F. **32 non-ASCII codepoints, all NFC length 1.**

| char | codepoint | char | codepoint |
| --- | --- | --- | --- |
| `Ñ` | U+00D1 | `ñ` | U+00F1 |
| `Ā` | U+0100 | `ā` | U+0101 |
| `Ī` | U+012A | `ī` | U+012B |
| `Ś` | U+015A | `ś` | U+015B |
| `Ū` | U+016A | `ū` | U+016B |
| `Ḍ` | U+1E0C | `ḍ` | U+1E0D |
| `Ḥ` | U+1E24 | `ḥ` | U+1E25 |
| `Ḷ` | U+1E36 | `ḷ` | U+1E37 |
| `Ḹ` | U+1E38 | `ḹ` | U+1E39 |
| `Ṃ` | U+1E42 | `ṃ` | U+1E43 |
| `Ṅ` | U+1E44 | `ṅ` | U+1E45 |
| `Ṇ` | U+1E46 | `ṇ` | U+1E47 |
| `Ṛ` | U+1E5A | `ṛ` | U+1E5B |
| `Ṝ` | U+1E5C | `ṝ` | U+1E5D |
| `Ṣ` | U+1E62 | `ṣ` | U+1E63 |
| `Ṭ` | U+1E6C | `ṭ` | U+1E6D |

As one flat list, lowercase then uppercase, for a subsetter's range argument:

```
ñ ā ī ś ū ḍ ḥ ḷ ḹ ṃ ṅ ṇ ṛ ṝ ṣ ṭ
Ñ Ā Ī Ś Ū Ḍ Ḥ Ḷ Ḹ Ṃ Ṅ Ṇ Ṛ Ṝ Ṣ Ṭ
U+00D1 U+00F1 U+0100 U+0101 U+012A U+012B U+015A U+015B U+016A U+016B
U+1E0C U+1E0D U+1E24 U+1E25 U+1E36 U+1E37 U+1E38 U+1E39 U+1E42 U+1E43
U+1E44 U+1E45 U+1E46 U+1E47 U+1E5A U+1E5B U+1E5C U+1E5D U+1E62 U+1E63
U+1E6C U+1E6D
```

Everything else the scheme emits is `[a-z]`/`[A-Z]` plus ordinary sentence punctuation.

**What #605 must measure, not assume.** en-ar printed `ā ī ū ḥ ṣ ḍ ṭ ẓ`; IAST adds
`ñ ś ḷ ḹ ṃ ṅ ṇ ṛ ṝ` and their capitals — nine new letter shapes against that course, eighteen with
case. Measured across the whole authored tree rather than against en-ar alone (§10), one of the
nine is not new to the catalogue at all: en-es already prints `ñ`, and it is claimed by the `latin`
target rather than `latin-ext`, so the eight genuinely new shapes are `ś ḷ ḹ ṃ ṅ ṇ ṛ ṝ`. Whether
Mukta's sources draw them is a font measurement, and this doc hands over the list rather than a
guess.

**Two budget facts checked while here, because #605 inherits them.**
`tools/payload-budget.ts` already carries `sa: 'devanagari'` in `SCRIPT_BY_LANGUAGE_TAG`
(line 102 — it predates this arc), and `ROMANIZATION_SCRIPT = 'latin-ext'` (line 90) is pushed
onto a course's script list whenever `row.scriptMode === 'romanized'` (line 149). So en-sa is
charged **both**: `devanagari` for the quiet `script` line and `latin-ext` for the display
diacritics. That is the en-ar shape, not the en-ko shape (en-ko's display is ASCII and pays
nothing for it).

**In practice the uppercase half is nearly empty.** Only a sentence-initial word and a proper noun
capitalise, so `Rāmaḥ`, `Bhavān`, `Śrī` and friends are the realistic uppercase surface. The list
above is complete rather than realistic on purpose: a font cut sized to the realistic set draws
tofu the first time an author writes a sentence starting with `Ṣ`.

### 1.3 Harvard-Kyoto and ITRANS are disqualified — the run

`src/engine/surface.ts` rule 4: *"Case-fold to lowercase (#116, [Q3]) … `toLowerCase()` without a
locale is the Unicode default fold … and it never touches diacritics."* Harvard-Kyoto writes vowel
length as **capitalisation** (`A I U R Ri` = ā ī ū ṛ); ITRANS writes `Sh` for ṣ against `sh` for ś.
Both put a phonemic contrast on the one axis this repo deliberately flattens.

Command:

```
cd /home/user/rung && npx tsx <scratch>/en-sa-check.ts
```

which imports `normalizeSurface` and `surfaceIndexKeys` from `src/engine/surface.ts` and prints
`input | normalizeSurface | surfaceIndexKeys`. Real output, 2026-09-12:

| input | `normalizeSurface` | `surfaceIndexKeys` | verdict |
| --- | --- | --- | --- |
| `kAla` (HK, "time" = kāla) | `kala` | `["kala"]` | **collides** |
| `kala` (HK, "art") | `kala` | `["kala"]` | **collides** |
| `Sha` (ITRANS, ṣa) | `sha` | `["sha"]` | **collides** |
| `sha` (ITRANS, śa) | `sha` | `["sha"]` | **collides** |
| `kāla` (IAST) | `kāla` | `["kāla"]` | distinct |
| `kala` (IAST) | `kala` | `["kala"]` | distinct |
| `śa` (IAST) | `śa` | `["śa"]` | distinct |
| `ṣa` (IAST) | `ṣa` | `["ṣa"]` | distinct |

The script's own equality assertions, quoted:

```
== A. Harvard-Kyoto case-fold collision ==
"kAla" | "kala" | ["kala"]
"kala" | "kala" | ["kala"]
collide: true

== B. ITRANS case-fold collision ==
"Sha" | "sha" | ["sha"]
"sha" | "sha" | ["sha"]
collide: true

== C. IAST stays distinct ==
kāla===kala: false
śa===ṣa: false
saḥ===sā: false
Rāmaḥ===rāmaḥ: true
```

Read that last line as the point of the whole check: **case folds, diacritics do not.** `Rāmaḥ`
and `rāmaḥ` are one word, which is what sentence case needs; `kāla` and `kala` are two, which is
what Sanskrit needs. An ASCII scheme gets exactly the wrong half of that deal.

This is `docs/34` §1's McCune–Reischauer argument with a different rule of the same file.

### 1.4 ISO 15919 loses on composition — the run, and a correction to the ticket

Same script, section H. Real output:

```
== H. NFC composition: IAST vs ISO 15919 ==
IAST ṛ: len=1 NFC.len=1 NFC.codepoints=[U+1E5B]
ISO r̥: len=2 NFC.len=2 NFC.codepoints=[U+0072 U+0325]
IAST ṃ: len=1 NFC.len=1 NFC.codepoints=[U+1E43]
ISO ṁ: len=1 NFC.len=1 NFC.codepoints=[U+1E41]
IAST ṝ: len=1 NFC.len=1 NFC.codepoints=[U+1E5D]
ISO r̥̄: len=3 NFC.len=3 NFC.codepoints=[U+0072 U+0325 U+0304]
IAST ḷ: len=1 NFC.len=1 NFC.codepoints=[U+1E37]
ISO l̥: len=2 NFC.len=2 NFC.codepoints=[U+006C U+0325]
```

`'r̥'.normalize('NFC').length` is **2**, and it stays 2: U+0072 plus **combining ring below
U+0325**, which has no precomposed form to compose into. The long vocalic r is worse — **3**
codepoints. IAST's `ṛ` U+1E5B, `ṝ` U+1E5D, `ḷ` U+1E37, `ḹ` U+1E39 and `ṃ` U+1E43 are all single,
precomposed codepoints.

**Correction to the issue's wording.** #604 reason 2 says ISO "writes `r̥` *and* `ṁ`" as if both
were the composition problem. **`ṁ` is precomposed** (U+1E41, NFC length 1) and is not a
composition problem at all — it is merely a different letter from IAST's `ṃ`. The argument against
ISO 15919 therefore rests on **the vocalic liquids alone**, and that is enough: four of the
scheme's letters would be multi-codepoint sequences.

Why multi-codepoint matters here rather than being cosmetic:

- `surface.ts` rule 1 normalises to NFC and the doc-comment's whole point is that "a decomposed
  paste can never miss its own entry" — a letter that NFC *cannot* compose defeats that guarantee
  by construction; two authors typing the ring in different orders relative to a macron produce
  two different index keys for one word.
- `checkScriptMode` passes it (U+0325 is `Script=Inherited`, explicitly allowed), so the build
  would **not** catch the drift. The protection has to be the scheme.
- A combining ring below renders as the font happens to place it. A precomposed glyph is drawn
  once, correctly, by whichever cut #605 lands on.

**Decision: IAST, NFC, precomposed.** Authors type precomposed characters; a decomposed paste is
still folded by rule 1, so nothing breaks — but nothing in the scheme *requires* decomposition.

---

## 2. External sandhi — the decision the whole course rests on

Sanskrit rewrites the edge of a word according to its neighbour. `rāmaḥ gacchati` is *said*
`rāmo gacchati`; `saḥ api` is *said* `so 'pi`; `tat eva` is *said* `tad eva`.

**Decision: `display` carries the PADA form. External sandhi is NEVER written across a word
boundary. The spoken join is carried by `sound`.**

So the hero line is `Rāmaḥ gacchati.` and its `sound` says: *said as* rāmo gacchati — *the final
-aḥ becomes -o before a voiced sound.*

### 2.1 Why, in index terms rather than phonetic ones

`tools/content-build.ts` matches surfaces **verbatim** and is **first-occurrence-wins**. Written
with sandhi, one noun stem becomes a family of unrelated strings. The run, section F:

```
== F. sandhi across a word boundary vs pada form ==
"rāmaḥ gacchati" | "rāmaḥ gacchati" | ["rāmaḥ gacchati"]
"rāmo gacchati" | "rāmo gacchati" | ["rāmo gacchati"]
"rāmaḥ" | "rāmaḥ" | ["rāmaḥ"]
"rāmo" | "rāmo" | ["rāmo"]
"tat eva" | "tat eva" | ["tat eva"]
"tad eva" | "tad eva" | ["tad eva"]
```

Three things this proves rather than asserts:

1. `rāmaḥ` and `rāmo` are **two index keys**, with nothing relating them. So are `tat` and `tad`.
2. A multi-token surface donates **only itself** — `["rāmaḥ gacchati"]`, not its tokens. So writing
   the sandhied sentence does not quietly also register the sandhied word.
3. Therefore, across ten sentences, "Rāma" would be authored as `rāmaḥ rāmo rāma rāmas rāmaś` —
   five surfaces, **four of them with no word row**, and the bare `rāmaḥ` a later module writes
   resolving to none of the four.

That is the `का` bug — `docs/08-marathi-third-review.md` correction 4 — with Sanskrit morphology
behind it instead of Marathi's. There, M2-S05's `का` owned the surface for the whole course and
M9's correct "why" row was unreachable through the index, so `WhyPanel` rendered a gloss and a note
that were both false of the sentence on screen. The failure mode is identical: a learner taps a
word and is told about a different one.

And it is exactly `docs/34` §1.2's decision for Korean, restated for a different morphology:
**morphophonemic at the boundary, phonemic everywhere else.** Korean writes `chaek-eul` and puts
the liaison in `sound`; Sanskrit writes `rāmaḥ gacchati` and puts the join in `sound`.

Two further reasons, both secondary to the index but real:

- Beginner spoken-Sanskrit material does this anyway. Pada-paṭha is a native Sanskrit concept, not
  an invention of this course.
- A learner who reads `rāmo` in module 3 and `rāmaḥ` in module 7 has no way to know they are one
  word. The pada form is the form the course can teach, repeat and test.

### 2.2 Consequence 1 — internal sandhi IS written in full

Sandhi inside a single token is written exactly as it is said, because it never crosses a
whitespace boundary and so never splits a surface:

- **Compounds:** `pustakālayaḥ` (pustaka + ālaya), **never** `pustaka-ālayaḥ`. A compound is **one
  word row**, with its members explained in the row's `note` and taught as their own rows wherever
  the course teaches them separately.
- **Lexicalised joins:** `namaste` (namaḥ + te), `namaskāraḥ`. One word, one row.
- **Prefixed verbs:** `āgacchati` (ā + gacchati), `pratigacchati`. One word, one row.
- **Within-word vowel coalescence generally:** `mahārājaḥ`, `sadaiva`.

The test is mechanical and needs no grammar: **is there a space?** No space, write the sandhi.
Space, write the pada form.

### 2.3 Consequence 2 — a word-final nasal is `m`, never `ṃ`

In pada form the final nasal of `kim`, `phalam`, `pustakam`, `gṛham`, `mahyam` is **`m`**. The
anusvāra `ṃ` is a *sandhi product* — it is what that `m` becomes before a following consonant —
and this course does not write external sandhi, so it does not write the anusvāra at a word end.

**Say it in every brief**, because every dictionary and every printed text quotes the sandhied
shape `किं`/`kiṃ`, and an author copying a dictionary will produce `kiṃ` in one module and `kim`
in another. Those are two index keys (`ṃ` U+1E43 is not `m`), so the collision is silent and
learner-visible.

`ṃ` is still in the scheme and still authored — **word-internally**, where it is not a boundary
phenomenon: `saṃskṛtam`, `siṃhaḥ`, `aṃśaḥ`, `saṃbhāṣaṇam`. Same test as §2.2: inside a token,
write what is said.

### 2.4 Consequence 3 — the avagraha never appears in L1

The avagraha `'` marks an elided initial `a` after `-o`/`-e`: `saḥ api` → `so 'pi`. With no
external sandhi, **there is no avagraha in this course at all.**

This matters because `'` is not inert to the normaliser. `surface.ts` rule 2 folds every
right-side apostrophe (`’ ʼ ʾ`) to `'` U+0027, and rule 3's `EDGE_PUNCTUATION` regex is written
`/^(?:(?!')\p{P})+|(?:(?!')\p{P})+$/gu` — **`'` is explicitly exempt**, so it is kept at a token
edge. Run, section D:

```
== D. avagraha survives edge-punctuation stripping ==
"'pi" | "'pi" | ["'pi"]
"api" | "api" | ["api"]
"’pi" | "'pi" | ["'pi"]
"so 'pi" | "so 'pi" | ["so 'pi"]
"saḥ api" | "saḥ api" | ["saḥ api"]
'pi===api: false
’pi==='pi: true
```

So `'pi` is a **real index key that is not `api`**, and the typographic `’pi` folds into it rather
than being a third thing. If a single author wrote one sandhied line, the course would carry a
word the index cannot connect to the `api` row that taught it, and the learner tapping it gets
nothing.

**When a later level teaches sandhi as a spoken fact** — the L4-M7 "Official talk" candidate, where
recited and official Sanskrit carries full sandhi — the sandhied shape enters as a **`forms` entry
of its pada row**, never as a new row. `so 'pi` goes in `saḥ`'s `forms` (and `'pi` in `api`'s), so
both keys point at the row that already taught the word. That keeps the rule of §4 intact: a
`forms` list holds other shapes of **that** word.

---

## 3. The hyphen — decided: none

`surfaceIndexKeys` grants an index key to **every hyphen part**. Korean needed that, because its
particles attach with no space and the bare noun would otherwise never appear as a surface
(`docs/34` §2). **Sanskrit has no attached particles**: `ca`, `api`, `eva`, `iti`, `khalu`, `hi`
are ordinary whitespace tokens, and its compounds are sandhied internally (§2.2).

So the hyphen has no job here, and it has a cost. Run, section E:

```
== E. hyphen mints keys ==
"grāma-pustakālayaḥ" | "grāma-pustakālayaḥ" | ["grāma-pustakālayaḥ","grāma","pustakālayaḥ"]
"pustaka-ālayaḥ" | "pustaka-ālayaḥ" | ["pustaka-ālayaḥ","pustaka","ālayaḥ"]
"pustakālayaḥ" | "pustakālayaḥ" | ["pustakālayaḥ"]
"mātā-pitarau" | "mātā-pitarau" | ["mātā-pitarau","mātā","pitarau"]
```

Read `pustaka-ālayaḥ`: hyphenating at the seam mints `pustaka` and `ālayaḥ` — **two shapes that
never stand alone in Sanskrit**. `ālayaḥ` as a free word is fine, but `pustaka` (the compound-stem
form) is not the free word, which is `pustakam`; and first-occurrence-wins means whichever row got
there first now owns a junk key that a later real row cannot reclaim.

**Decision: no hyphen in `display` anywhere in en-sa L1.**

The one candidate exception #604 named — a sandhi-free compound whose two members are both taught
words, `grāma-pustakālayaḥ` — is **rejected**. The run shows it would mint `grāma` and
`pustakālayaḥ`, and those are real words with real rows of their own; the hyphenated compound would
either steal their keys (if it is authored first) or gain nothing (if it is not). Write the
compound as one token, `grāmapustakālayaḥ`, and let its `note` name the members.

Recorded so nobody reintroduces it: in this repo a hyphen is a **semantic split**, and Sanskrit has
nothing to split.

---

## 4. Citation forms, and the `forms` rule

A Sanskrit noun has eight cases × three numbers; a verb has three persons × three numbers per
tense. Nothing like the whole paradigm belongs in a word row.

**Decision: a word row's `display` is**

- **the nominative singular** for nouns and adjectives — `rāmaḥ`, `bālā`, `phalam`, `chātraḥ`,
  `pustakam`, `gṛham`;
- **the third person singular present** for verbs — `gacchati`, `paṭhati`, `asti`, `khādati`.

Why that and not the dictionary's stem (`rāma`, `gam`): **a row's own `display` is read before any
of its `forms`**, and the nominative singular / third singular present is the shape the sentence in
front of the learner actually shows first. A stem citation would put a form the course never
prints at the top of the panel.

**The `forms` rule from `docs/07-llm-review-L1-M6-M10.md` binds unchanged.** A row's `forms`
carries **every shape that course's sentences actually use, and only shapes of that same word**:

- Never a cousin. `gacchati`'s `forms` may hold `gacchāmi`, `gacchasi`, `gacchāmaḥ`, `gatavān` —
  never `āgacchati`, which is a different word with its own row.
- Never a synonym. `pustakam`'s `forms` never hold `granthaḥ`.
- Never a set of siblings. The numerals are not each other's `forms`; that is exactly the repair
  `docs/07` M8-1 made (`दहा` had swallowed seven numbers) and M7-2/M7-3 made twice more.
- **Never the paradigm.** Eight cases authored "for completeness" would mint index keys for shapes
  no sentence prints, and first-occurrence-wins would hand them to the wrong row later.

In practice an L1 noun row carries one to three shapes (`rāmaḥ`, `rāmam`, `rāmasya` — only if all
three are used), and a verb row carries the persons the module's sentences reach.

---

## 5. The dual, and the three genders

### 5.1 The dual is not optional

Sanskrit has three numbers, and the dual is obligatory for exactly two of anything: `dve phale`
(two fruits), `dvau chātrau` (two students), `mātāpitarau` (parents). Numerals 1–4 decline, and by
gender: `dvau` (m.) / `dve` (f., n.).

**Decision: the dual first appears at L1-M8 and nowhere earlier.** M8 is where counting and "two
of something" are unavoidable; before it, every sentence stays singular or genuinely plural
(three or more), and a brief that wants "two" earlier changes the sentence rather than the rule.

Stated as a rule for the briefs: **no module before M8 may author a dual form**, in a sentence, a
variation, a mistake or a pool item. A dual smuggled into M3 teaches a number the learner has no
frame for, and first-occurrence-wins gives its surface to a module that cannot explain it.

### 5.2 Gendered rows own both shapes from their first row

Every row whose display is gendered carries **both shapes from the moment it first appears** — in
`display` (the one the sentence shows) plus the other in `forms`, with a `note` that names the
split:

- `chātraḥ` / `chātrā` — a student, male / female
- `bhavān` / `bhavatī` — the polite "you", addressing a man / a woman (§8)
- `gatavān` / `gatavatī` — the participial past, a male / female subject (§8)
- `aham … gatavān` vs `aham … gatavatī` — the speaker's own gender inside "I"

That last one is **hi-mr's precedent** (`docs/26-hi-mr-L2-brief-decisions.md`): a speaker's gender
is carried inside the first-person sentence, so "I went" is two sentences, not one, and the course
has to decide which it shows and how it names the other. Sanskrit has the same problem with the
participial past and solves it the same way — the row owns both.

**The failure prevented:** a learner is shown `gatavān`, learns it as "went", and has no way to
know that a woman saying the same sentence says `gatavatī`. Half the learners are taught a form
they must not use.

---

## 6. Homographs the romanization keeps

IAST is faithful, so Sanskrit's real collisions survive it. They are the language, not a defect of
the scheme, and the policy is `docs/34` §3's: **assign an owner, because first occurrence wins.**

| surface | readings | policy |
| --- | --- | --- |
| `te` | they (m. nom. pl. of saḥ) · your / to you (enclitic) | one owning module; the other reading is either kept out of L1 or taught as a second row whose key the brief knows is unreachable, with the owning row's `note` covering both |
| `me` | my / to me (enclitic) · (dual forms elsewhere) | the enclitic owns it |
| `kim` | what · the yes-no question particle | **one row, one note covering both seats** — this is the `का` shape exactly, and the `का` repair is the model: the note says which position means which |
| `api` | also · the question marker | one row, note covering both |
| `vā` | or · the question tag | one row, note covering both |
| `tat` | that (n. nom./acc. sg.) · it | one row; the two readings are one word |

The rule the table serves: **the earliest module to write a surface owns the note every later
module's learner sees.** A later row with a different meaning is unreachable through the index, and
the learner is shown a note that is false of the sentence in front of them.

**The failure named, so a brief can picture it:** a learner taps `te` in *tava pustakam* territory
expecting "your" and `WhyPanel` says "they (masculine plural)". That is `docs/08` correction 4
happening again in a different language, and it is planned away in the briefs, not discovered in
review.

**What is NOT a problem, having checked it.** `saḥ` / `sā` / `sa` differ only by a visarga and a
macron, and rule 4 *"never touches diacritics"*. Verified in the §1.3 run:

```
saḥ===sā: false
"saḥ" | "saḥ" | ["saḥ"]
"sā" | "sā" | ["sā"]
"sa" | "sa" | ["sa"]
```

Three distinct keys. This is **en-de's case-folding catastrophe (#361(b))** — where German's
capitalised nouns merged `Essen`/`essen` into one index entry — **not happening here**. Recorded in
one sentence so nobody goes looking for it, and so nobody "fixes" the romanization to dodge a
problem it does not have.

---

## 7. What `sound` must always cover

`sound` is `Sentence`-only (§9). Every en-sa sentence's `sound` line covers whichever of these it
actually contains:

1. **Vowel length is phonemic.** `kāla` (time) vs `kala` (art); `dīna` vs `dina`. An English reader
   sees a decoration; it is a different word (§1.3 proves the index agrees).
2. **The four-way stop contrast** where English has two. `k kh g gh` is unaspirated-voiceless,
   aspirated-voiceless, unaspirated-voiced, aspirated-voiced — and the same four times over in
   five places. **`bh dh gh jh ḍh` do not exist in English at all**, and the `sound` line says so
   in words rather than assuming the learner will infer it from spelling.
3. **Retroflex against dental.** `ṭ ḍ ṇ ṣ` (tongue curled back to the roof) against `t d n s`
   (tongue on the teeth). English `t` is neither, and sits between them — so an English speaker
   gets both wrong by default, which is why this is on the sentence and not left to the word note.
4. **The visarga is an echo.** `namaḥ` is said "nama-ha", `rāmaḥ` "rāma-ha" — a light repetition of
   the preceding vowel, not an English "h". Say it every time a visarga is on screen, because it is
   on screen constantly (it is the nominative singular ending of the commonest noun class).
5. **The sandhi join the display does not write** (§2) — every time a boundary is audibly different
   from what is printed. This is the line that makes §2's decision honest: the display is the
   teachable form, `sound` is the said form, and neither is hidden.

### 7.1 The pronunciation tradition, named once

**This course adopts the pan-Indian pronunciation tradition** — the way Sanskrit is actually spoken
today in India, by teachers, in saṃskṛta-sambhāṣaṇam classes, and in recitation outside the
specialist Vedic schools. Concretely and course-wide:

- **`ṛ` is said *ri***, so `kṛṣṇa` is "krishna" and `ṛtam` is "ritam". (The reconstructed
  syllabic-r is not taught.)
- **`jñ` is said *gya***, so `jñānam` is "gyaanam" and `yajña` is "yagya".
- `v` is between English v and w; `ś` and `ṣ` are both close to English "sh" and their difference
  is described as tongue position rather than left to spelling.

**The whole course holds to this one tradition.** A later module that switches to a regional or
reconstructed reading would teach two pronunciations of one letter, and a learner has no way to
know which is meant. If a level ever needs the alternative, it is a `note` **about** the tradition,
never a change of it.

### 7.2 No stress marks, ever

**Sanskrit has syllable weight, not English stress.** A syllable is heavy (long vowel, or short
vowel before two consonants) or light, and that governs metre — it is not a loudness accent an
English speaker can transfer. Marking it with acutes would teach a wrong thing that the learner
would then carry into every word.

This is the **deliberate opposite of en-ru**, where marking stress on every polysyllable was
mandatory (#355 requirement 2) because Russian vowel reduction is unintelligible without it. It is
`docs/34` §6's Korean decision for a different reason. If a later reader reaches for acutes out of
symmetry with en-ru or en-ar, **this paragraph is the answer**: no acute appears in an en-sa
`display`, and the codepoint list of §1.2 does not contain one.

---

## 8. Which Sanskrit — decided once, course-wide

**The living spoken register — saṃskṛta-sambhāṣaṇam**, the Sanskrit of conversation classes and
spoken-Sanskrit movements, not the classical literary language.

Concretely, and binding on every brief:

| area | en-sa L1 teaches | deferred |
| --- | --- | --- |
| "you" | **`bhavān` (m.) / `bhavatī` (f.) with a THIRD-person verb** — `bhavān kiṃ karoti?` | — |
| intimate "you" | — | **`tvam` + second-person endings, from L2-M1** |
| past | **the participial past — `gatavān` / `gatavatī`, `khāditavān` / `khāditavatī`** | the imperfect `agacchat`, the perfect `jagāma`, the aorist and the remaining lakāras |
| future | **the simple future — `gamiṣyāmi`, `gamiṣyati`** | the periphrastic future |
| register | everyday spoken | the classical literary register |

Three reasons, all decided rather than open:

1. **`bhavān` + third person is the everyday "you" in spoken Sanskrit**, and getting it wrong makes
   every polite sentence in the course wrong. Teaching `tvam` first would have the learner
   addressing strangers the way Sanskrit addresses children and gods.
2. **The participial past is what a speaker says**, and it is one form built on a stem the learner
   already has, against a lakāra system that would cost L1 its whole budget.
3. **en-ar's MSA decision is the precedent for teaching a standard nobody speaks at home**: a
   single coherent register that every resource and every teacher shares beats an authentic-but-
   unteachable mixture. en-sa makes the same trade in the other direction — the *spoken* standard
   rather than the literary one — for the same reason: one register, taught consistently.

**Where the classical register goes: L4-M7 "Official talk."** That is the module where recited and
official Sanskrit — full external sandhi (§2.4), the literary tenses, the formal vocabulary —
belongs, and naming it here means **no earlier module may reach for it**. A brief that wants a
literary form before L4-M7 is asking for the register decision to be reopened, and the answer is
this section.

---

## 9. Devanagari appears in exactly one field

**Decision: Devanagari appears in `script` and nowhere else** — never in `display`, never in
`forms`, never inside the English teaching prose (`note`, `why`, `trap`, `usage`, `mnemonic`,
`changed`, `cue`). `checkScriptMode` enforces the first two; the rest is an authoring rule, and
en-ar's measured record (Arabic inside prose in 3 places out of ~750, each a note *about* the
spelling) is the bar.

Because `display` is pada form (§2), **the `script` line is pada form too**: `रामः गच्छति।`, not
`रामो गच्छति।`. The two lines have to be the same sentence, or the quiet line is teaching a
different string from the one being learned. The **danda `।` (U+0964) is the full stop** and the
double danda `॥` is not used in L1 — matching hi-mr, which is the repo's existing Devanagari
practice. Verified that the danda is inert to the index (run, section G):

```
== G. danda and sentence punctuation ==
"gacchati." | "gacchati" | ["gacchati"]
"kim?" | "kim" | ["kim"]
"रामः गच्छति।" | "रामः गच्छति" | ["रामः गच्छति"]
```

— rule 3's `\p{P}` covers U+0964 explicitly (the doc-comment names it), so the danda is stripped
as edge punctuation exactly as a full stop is.

### 9.1 Which surfaces carry `script?` and which carry `sound?` — checked, with a correction

Read off `src/course/types.ts` directly:

| interface | `script?` | `sound?` | line |
| --- | --- | --- | --- |
| `Word` | **yes** | no | `script?: string` at **line 41** |
| `Variation` | **yes** | no | line **59** |
| `Mistake` | **yes** | no | line **68** |
| `Sentence` | **yes** | **yes** | `script?` line **83**, `sound?` line **96** |
| `PoolItem` | **yes** | no | line **112** |

Two facts the authoring issues inherit rather than assume:

1. **`sound` is `Sentence`-only.** Confirmed: `sound?: string` appears once in the file, at line 96,
   inside `Sentence`. #362's "do not put `sound` on a variation" rule holds because the type makes
   it impossible. Every §7 requirement is therefore a *sentence-level* obligation.
2. **`script?` is on FIVE surfaces, not three.** `docs/34` §8 says it is "typed on `Sentence`,
   `Variation` **and** `PoolItem`" — that is true but **incomplete**: `Word` (line 41) and
   `Mistake` (line 68) carry it as well. `Word`'s own comment says *"No word row uses it today;
   pool items do."* — a statement about practice, not about the type.

   **The en-sa authoring decision, stated so it is not left to taste:** author `script` on every
   **sentence**, on every **variation** with a distinct Sanskrit form, and on every **pool item**
   — the en-ko instruction, unchanged. Word rows and the mistake callout carry **no** `script` in
   L1, following the existing repo practice rather than the type's full reach: a word row's
   Devanagari would repeat a fragment of the sentence's own quiet line directly beneath it, and
   `mistake.display` is wrong by design and never read (it is the one surface the shown-surface
   ratchet exempts).

---

## 10. Fonts — measured, not assumed (#605)

Measured on 2026-09-12 with fontkit against the `@fontsource` **source** files in `node_modules`,
not against generated cuts: no en-sa module is authored yet, so the harvest-driven cuts for this
course do not exist. `hasGlyphForCodePoint` on the source is what decides, because
`tools/font-subset.ts` is harvest-driven and a character a target *claims* but the source face
has no glyph for is dropped from the subset with **no error and no warning** (the en-fr `sœur`
defect, `tools/font-coverage.test.ts`'s reason for existing).

**Result: every codepoint en-sa can put in front of a learner is already drawn by a bundled face,
at every weight it is cut at. No code change — `tools/font-subset.ts` and
`tools/font-coverage.test.ts` are untouched by this issue.** This is #375's outcome (A).

### The romanized `display` line — IAST

Mukta's own `latin-ext` cut, at 400/600/700 (`MUKTA_WEIGHTS`, the whole L2 ramp). Source Sans 3's
`latin-ext` draws all of them too, at the same three weights, so there is a second face behind
every mark — but nothing routes to it, because Mukta is named first in `--font-devanagari` and has
the glyph.

| cp | char | claimed by (target) | drawn by | 400 | 600 | 700 | status |
| --- | --- | --- | --- | --- | --- | --- | --- |
| U+0101 / U+0100 | ā / Ā | mukta `latin-ext` | Mukta latin-ext (+ SS3) | yes | yes | yes | already shipped by en-ar |
| U+012B / U+012A | ī / Ī | mukta `latin-ext` | Mukta latin-ext (+ SS3) | yes | yes | yes | already shipped by en-ar |
| U+016B / U+016A | ū / Ū | mukta `latin-ext` | Mukta latin-ext (+ SS3) | yes | yes | yes | already shipped by en-ar |
| U+1E5B / U+1E5A | ṛ / Ṛ | mukta `latin-ext` | Mukta latin-ext (+ SS3) | yes | yes | yes | **new** |
| U+1E5D / U+1E5C | ṝ / Ṝ | mukta `latin-ext` | Mukta latin-ext (+ SS3) | yes | yes | yes | **new** |
| U+1E37 / U+1E36 | ḷ / Ḷ | mukta `latin-ext` | Mukta latin-ext (+ SS3) | yes | yes | yes | **new** |
| U+1E39 / U+1E38 | ḹ / Ḹ | mukta `latin-ext` | Mukta latin-ext (+ SS3) | yes | yes | yes | **new** |
| U+1E43 / U+1E42 | ṃ / Ṃ | mukta `latin-ext` | Mukta latin-ext (+ SS3) | yes | yes | yes | **new** |
| U+1E25 / U+1E24 | ḥ / Ḥ | mukta `latin-ext` | Mukta latin-ext (+ SS3) | yes | yes | yes | already shipped by en-ar |
| U+1E45 / U+1E44 | ṅ / Ṅ | mukta `latin-ext` | Mukta latin-ext (+ SS3) | yes | yes | yes | **new** |
| U+00F1 / U+00D1 | ñ / Ñ | mukta **`latin`** | Mukta latin (+ SS3 latin) | yes | yes | yes | already shipped by en-es |
| U+1E47 / U+1E46 | ṇ / Ṇ | mukta `latin-ext` | Mukta latin-ext (+ SS3) | yes | yes | yes | **new** |
| U+1E6D / U+1E6C | ṭ / Ṭ | mukta `latin-ext` | Mukta latin-ext (+ SS3) | yes | yes | yes | already shipped by en-ar |
| U+1E0D / U+1E0C | ḍ / Ḍ | mukta `latin-ext` | Mukta latin-ext (+ SS3) | yes | yes | yes | already shipped by en-ar |
| U+015B / U+015A | ś / Ś | mukta `latin-ext` | Mukta latin-ext (+ SS3) | yes | yes | yes | **new** |
| U+1E63 / U+1E62 | ṣ / Ṣ | mukta `latin-ext` | Mukta latin-ext (+ SS3) | yes | yes | yes | already shipped by en-ar |

Both cases were measured deliberately. `src/engine/surface.ts` rule 4 lowercases for the word
index, but `display` carries sentence case, so a capital is really rendered — and every capital
above is drawn.

**Which marks are actually new.** Harvested from the authored `content/` tree: en-ar ships
`Ā ā Ī ī Ū ū Ḍ ḍ Ḥ ḥ Ṣ ṣ Ṭ ṭ` and en-es ships `Ñ ñ`. So the eight pairs new to the catalogue are
`ṛ ṝ ḷ ḹ ṃ ṅ ṇ ś` and their capitals — all in Mukta's `latin-ext`, all already claimed by the
existing `latin-ext` target (U+0100–017F plus U+1E00–1E9F), all drawn.

**`ñ` is the `latin` target's, not `latin-ext`'s**, and that is worth writing down because the two
targets are deliberately disjoint: it is U+00F1, inside the `latin` target's `cp <= 0x00FF`, and
Mukta's `latin-ext` source has no glyph for it. It needs no widening either way — Mukta's `latin`
cut draws it, as en-es has proved since that course shipped.

### The quiet Devanagari `script` line

Mukta's `devanagari` cut, at 400/600/700. Already funded: `SCRIPT_BY_LANGUAGE_TAG` in
`tools/payload-budget.ts` carries `sa: 'devanagari'` (line 102), hi-mr already ships this face, and
no new dependency is involved.

| cp | char | drawn by Mukta devanagari 400 / 600 / 700 |
| --- | --- | --- |
| U+0960 | ॠ vocalic RR (independent) | yes / yes / yes |
| U+090C | ऌ vocalic L (independent) | yes / yes / yes |
| U+0961 | ॡ vocalic LL (independent) | yes / yes / yes |
| U+093D | ऽ avagraha | yes / yes / yes |
| U+0943 | ृ vowel sign vocalic R | yes / yes / yes |
| U+0944 | ॄ vowel sign vocalic RR | yes / yes / yes |
| U+0962 | ॢ vowel sign vocalic L | yes / yes / yes |
| U+0963 | ॣ vowel sign vocalic LL | yes / yes / yes |
| U+091C, U+094D, U+091E | ज ् ञ (the parts of ज्ञ) | yes / yes / yes |
| U+0915, U+094D, U+0937 | क ् ष (the parts of क्ष) | yes / yes / yes |

Measured wider than the list, since the cmap was open anyway: **of the whole U+0900–097F block,
the single codepoint Mukta has no glyph for is U+0978 (DEVANAGARI LETTER MARWARI DDA)** — not
Sanskrit, not reachable from any authoring rule this course has. `ॐ` U+0950, candrabindu U+0901,
anusvāra U+0902, visarga U+0903, ऋ U+090B, nukta U+093C, the Vedic accents udātta U+0951 and
anudātta U+0952, and both daṇḍas U+0964/U+0965 are all drawn at all three weights.

### Conjunct shaping — a separate observation, and a separate severity

Codepoint coverage is a fact about the cmap; a conjunct is a fact about GSUB, and the two fail
differently. A missing ligature degrades to a **visible half-form** (`ज्ञ` set as ज्+ञ), which is
legible-but-wrong, not tofu.

Measured, not assumed. Mukta's `devanagari` 400 advertises `abvs akhn blws cjct haln nukt pres
psts rphf abvm blwm kern`, and shaping the sequences through fontkit gives one glyph each:

- `ज्ञ` (U+091C U+094D U+091E) → 1 glyph, `JaNya.dv`
- `क्ष` (U+0915 U+094D U+0937) → 1 glyph, `KaSsa.dv`
- `क्त` → `KaTa.dv`, `त्र` → `TaRa.dv` (spot checks)

And it **survives the subset**. A synthetic harvest of plausible en-sa script lines
(`ज्ञानम् क्षेत्रम् ऋषिः कृष्ण संस्कृतम् तत्त्वम्` plus the Devanagari baseline) cut through
`subset-font` retained 37 characters, 99,352 B → 22,156 B, and the cut still shapes `ज्ञ` and
`क्ष` to one glyph each with no `.notdef` — which is the GSUB closure `tools/font-subset.ts`'s
header claims HarfBuzz gives, now measured rather than trusted.

### The one real authoring hazard the measurement turned up: NFC

Every IAST mark above is **precomposed**. Their decomposed (NFD) spellings carry combining marks —
U+0304 macron, U+0323 dot below, U+0307 dot above, U+0301 acute, U+0303 tilde — and **no target in
`tools/font-subset.ts` claims any of them**: the `latin` target stops at U+00FF and `latin-ext`
starts at U+0100. A decomposed `ā` would therefore pass `checkScriptMode` (which allows
`Script=Inherited` precisely so normalisation form is not the build's business), be dropped from
every cut by `coveredChars`, and render its base letter in Mukta with its accent from `system-ui`
— a misplaced mark, which reads worse than tofu because it looks deliberate.

Nothing in the content build normalises: `tools/content-build.ts` emits the authored bytes
verbatim, and `harvestContent()` reads those bytes. Only `src/engine/surface.ts` normalises, and
only the index key. So this is an authoring rule, not a code change — and it is the rule en-ru
already carries ("precomposed and NFC", `tools/course-briefs.ts` L5-M10).

**Author every IAST `display`, `forms` entry, `cue` and `script` line in NFC, with precomposed
marks.** Not a new target and not a `FALLS_THROUGH` entry: widening a target to the combining
block would bundle marks to compose accents that should never have been authored decomposed.

### Budget — confirmed unchanged, both rows

Read rather than assumed, in `tools/payload-budget.ts`:

- `SCRIPT_BY_LANGUAGE_TAG` already carries `sa: 'devanagari'` (line 102). **Do not add it again.**
- `COURSE_SCRIPTS` (line 85) already lists `latin-ext`, and `ROMANIZATION_SCRIPT` (line 90) pushes
  it onto any row whose `scriptMode` is `romanized` (line 149). en-sa needs **no new entry** in
  either list: the IAST is charged `latin-ext` automatically and the quiet line is charged
  `devanagari` by the `sa` tag.

The authoring instruction for the `script` field itself — which surfaces carry it, in what
form — is §9.1 above, where it was checked against `src/course/types.ts` directly.

## 11. The #354 codepoint policy — run over the full mapping

`tools/content-build.ts` `checkScriptMode` rejects anything in a romanized course's `display` or
`forms` outside three Unicode scripts. The regex, quoted from the real file (line 303):

```ts
const LATIN_SURFACE = /^[\p{Script=Latin}\p{Script=Common}\p{Script=Inherited}]*$/u;
```

Command:

```
cd /home/user/rung && npx tsx <scratch>/en-sa-scriptmode.ts
```

The script imports `checkScriptMode` from `tools/content-build.ts` (it is exported), builds a
fixture module whose `display` — on the sentence, the word row, the word's `forms`, the variation,
the mistake and the pool item — is **every character §1.1 can emit, lowercase and uppercase**, and
runs the real check. Real output, 2026-09-12:

```
fixture (lower): a ā i ī u ū ṛ ṝ ḷ ḹ e ai o au ṃ ḥ k kh g gh ṅ c ch j jh ñ ṭ ṭh ḍ ḍh ṇ t th d dh n p ph b bh m y r l v ś ṣ s h
fixture (upper): A Ā I Ī U Ū Ṛ Ṝ Ḷ Ḹ E AI O AU Ṃ Ḥ K KH G GH Ṅ C CH J JH Ñ Ṭ ṬH Ḍ ḌH Ṇ T TH D DH N P PH B BH M Y R L V Ś Ṣ S H
surfaces checked: 5 | withScript: 1
errors: NONE
```

**Every IAST character passes.** No finding: the scheme is `Script=Latin` by construction, exactly
as #604 reason 3 predicted, and it is now proved rather than predicted.

**Negative control**, same run — one Devanagari word appended to the same `display`:

```
negative control errors: [
  '/sentences/0/display: scriptMode romanized requires a Latin-script romanization — found "र", "ा", "म", "ः"'
]
```

So both halves of the gate are exercised before a module exists: IAST passes, Devanagari in
`display` fails and names the offending characters. The quiet `script` line carrying
`रामः गच्छति।` was present throughout and was **not** checked (`withScript: 1`) — that is the
shape of the rule (#353), not an omission, and §9's decision depends on it.

---

## 12. The `romanizationNote` paragraph, verbatim

The string below is what `content/courses.json`'s en-sa row carries. The skeleton issue pastes it;
it is not re-derived.

> IAST (the International Alphabet of Sanskrit Transliteration) for spoken Sanskrit in Latin letters: long vowels ā ī ū and the vocalic liquids ṛ ṝ ḷ ḹ; retroflex ṭ ṭh ḍ ḍh ṇ ṣ against dental t th d dh n s; the three sibilants ś ṣ s; the nasals ṅ ñ ṇ n m; anusvāra ṃ and visarga ḥ. Every word is written in its PADA form — external sandhi is never written across a word boundary (rāmaḥ gacchati, not rāmo gacchati) and the spoken join is carried by the sound line instead, while internal sandhi inside a single token is written in full, so a compound is one word. A word-final nasal is m and never ṃ, and the avagraha never appears. Stress is not marked: Sanskrit has syllable weight, not English stress. Every display string in this course follows this one scheme — the word index matches surfaces verbatim, so a second scheme would break resolution.

---

## 13. What was run, and what came back — the index

| claim | run | result |
| --- | --- | --- |
| Harvard-Kyoto collides under rule 4 | `normalizeSurface('kAla')` vs `('kala')` | both `kala` — **collide: true** |
| ITRANS collides under rule 4 | `normalizeSurface('Sha')` vs `('sha')` | both `sha` — **collide: true** |
| IAST length contrast survives | `normalizeSurface('kāla')` vs `('kala')` | `kāla` vs `kala` — **false** (distinct) |
| IAST sibilant contrast survives | `normalizeSurface('śa')` vs `('ṣa')` | `śa` vs `ṣa` — **false** (distinct) |
| sentence case folds harmlessly | `normalizeSurface('Rāmaḥ')` vs `('rāmaḥ')` | **true** (one word) |
| `saḥ` / `sā` / `sa` stay three words | same | `saḥ===sā: false`; three distinct keys |
| ISO 15919 `r̥` will not compose | `'r̥'.normalize('NFC').length` | **2** — `[U+0072 U+0325]` |
| ISO 15919 `r̥̄` will not compose | `'r̥̄'.normalize('NFC').length` | **3** — `[U+0072 U+0325 U+0304]` |
| IAST `ṛ ṝ ḷ ṃ` are precomposed | same probe | **1** each — U+1E5B, U+1E5D, U+1E37, U+1E43 |
| **contradiction:** ISO `ṁ` is also precomposed | same probe | **1** — U+1E41; §1.4 records the correction to #604's wording |
| avagraha is a real, distinct key | `surfaceIndexKeys(normalizeSurface("'pi"))` | `["'pi"]`; `'pi===api: false` |
| `’` folds into `'` | `normalizeSurface('’pi')` | `'pi` — `’pi==='pi: true` |
| sandhied vs pada are different keys | `normalizeSurface('rāmaḥ')` vs `('rāmo')` | two keys; `tat`/`tad` likewise |
| a multi-token surface donates no tokens | `surfaceIndexKeys('rāmaḥ gacchati')` | `["rāmaḥ gacchati"]` only |
| a hyphen mints its parts | `surfaceIndexKeys('pustaka-ālayaḥ')` | `["pustaka-ālayaḥ","pustaka","ālayaḥ"]` |
| the danda is stripped as edge punctuation | `normalizeSurface('रामः गच्छति।')` | `रामः गच्छति` |
| full IAST mapping passes #354 | `checkScriptMode(fixture, 'romanized')` | `surfaces checked: 5 · errors: NONE` |
| Devanagari in `display` fails #354 | same, with `रामः` appended | error naming `"र", "ा", "म", "ः"` |
| the quiet `script` line is not checked | same run | `withScript: 1`, no error |
| `sound?` is `Sentence`-only | read `src/course/types.ts` | one occurrence, **line 96** |
| **contradiction:** `script?` is on five types | read `src/course/types.ts` | lines **41, 59, 68, 83, 112** — `Word` and `Mistake` too; §9.1 records it |
| en-sa is charged two font scripts | read `tools/payload-budget.ts` | `sa: 'devanagari'` (line 102) + `ROMANIZATION_SCRIPT = 'latin-ext'` (line 90, applied line 149) |

Nothing run contradicted the **sandhi**, **hyphen**, **citation-form**, **dual**, **homograph**,
**register** or **`script`-field** decisions; each is recorded above with the evidence that
supports it. The two contradictions found were both in supporting detail, are both corrections to
wording rather than to a decision, and are stated in place (§1.4, §9.1) rather than quietly fixed.

---

## 14. Open questions for the native-speaker gate

The native-speaker gate is a separate, stricter bar, and it is **unmet**. These are its questions
for this document; no authoring wave may close one by rewriting a shipped module.

1. **Is the pada-form display acceptable to a Sanskrit teacher**, or does writing `rāmaḥ gacchati`
   on screen teach a shape a speaker would flinch at even with the `sound` line correcting it?
2. **Is `bhavān` + third person the right everyday "you" for a beginner**, or does a spoken-Sanskrit
   teacher start with `tvam` and add `bhavān` as politeness later?
3. **Is "`ṛ` = *ri*, `jñ` = *gya*" the right tradition to commit the whole course to**, given that a
   learner in a different region will hear something else?
4. **Is L1-M8 the right first appearance of the dual**, or does a spoken register use it earlier
   (kinship pairs — `mātāpitarau` — are extremely common and might belong in the family module)?
5. **`kim` as one row covering both the interrogative and the particle** — does a teacher treat
   those as one word or two?
6. **Is the participial past the right L1 past tense in practice**, or do spoken-Sanskrit classes
   reach for `agacchat` sooner than this plan assumes?
