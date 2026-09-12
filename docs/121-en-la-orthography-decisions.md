# en-la — the orthography decisions (#630)

**Date:** 2026-09-12 · **Course:** en-la — English (L1) → Latin (L2), the eleventh course ·
**Status:** decided, to be executed by #631 (the font measurement), #632 (skeleton), #633 (briefs)
and #634–#636 (content).

This file is the durable record #630 asked for. Unlike en-ko and en-sa there is **no
`romanizationNote`** to carry the summary — en-la is a `native` row and its display already is its
script — so §10 drafts the paragraph the README and the brief header quote instead.

---

## 0. Why this file exists before any Latin was written

Every course before this one that needed a spelling decision was non-Latin, and the forcing rule
was `docs/design-contract.md` — "rung teaches speech, not script" (#353): *a new non-Latin course
is romanized from its first commit, never retrofitted.* Latin is Latin script, so that rule says
nothing about it, and the build says nothing either:

`tools/content-build.ts` `checkScriptMode` returns an **empty report** for anything but a
`romanized` row — its first two statements are `if (scriptMode !== 'romanized') return report;`.
So en-la ships with **no build gate on its spelling at all**. en-ar cannot misspell a long vowel
without `checkScriptMode` noticing something is wrong with the line; en-la can, silently, fifty
modules deep.

What is left is the word index, and it is not lenient — it is merely quiet. `tools/content-build.ts`
matches surfaces **verbatim** and `indexSurface` is **first-occurrence-wins**:

```ts
/** Claims `key` for `entry` unless an earlier occurrence owns it — first occurrence wins. */
function indexSurface(surfaces, key, entry) {
  if (surfaces.has(key)) return;
  surfaces.set(key, entry);
}
```

A word spelled two ways is two words, one of them with no "why" row; a word spelled one way that
should have been two is one row with a note that is wrong for half its occurrences. en-ru is the
precedent for deciding late — #353–#360 rewrote 959 display strings — and en-ko (#373, `docs/34`)
and en-sa (#604) are the precedent for deciding first. This file is en-la's, and the decisions
below are the ones the fifty modules execute.

---

## 1. The orthography: macrons per the OLD, `v` and `i`, no `j`

**Chosen:** every long vowel carries a macron, on every Latin string the learner can read — a
`display`, a `forms` entry, a `variations` display, a comprehension pool item. Consonantal u is
written `v` and consonantal i is written `i`; `j` never appears, and capital `V` is only ever the
consonant. Vowel quantity follows **one** authority, the **Oxford Latin Dictionary** (OLD),
including hidden quantity before `ns`/`nf` (`cōnsul`, `īnfāns`) and the long final `-ō` of the first
person (`amō`).

The full inventory of non-ASCII characters the course can emit is ten codepoints and no more:

| Character | Codepoint | Character | Codepoint |
|---|---|---|---|
| `Ā` | U+0100 | `ā` | U+0101 |
| `Ē` | U+0112 | `ē` | U+0113 |
| `Ī` | U+012A | `ī` | U+012B |
| `Ō` | U+014C | `ō` | U+014D |
| `Ū` | U+016A | `ū` | U+016B |

That table is the list #631 measures. `ȳ` U+0233 is decided out in §9.

### 1.1 Why macrons, argued against `surface.ts` rather than against taste

`src/engine/surface.ts` is the one definition of "same word". Rule 4 case-folds without a locale
and **never touches a diacritic**. Two consequences, and they point opposite ways — which is the
whole argument:

- A macron **keeps two words apart**. Unmarked, the perfect of every third- and fourth-conjugation
  verb collides with its present, and the collision lands inside L1: `venit` is taught in L1-M4 and
  `vēnit` in L1-M5. One key, one row, one note — and the note is wrong for whichever module did not
  write it.
- Case **does not** keep two words apart, so a sentence-initial capital is free and needs no rule.

Measured, not asserted (§8 carries the run):

```
normalizeSurface(venit) === normalizeSurface(vēnit)    false
normalizeSurface(est)   === normalizeSurface(ēst)      false
normalizeSurface(hic)   === normalizeSurface(hīc)      false
normalizeSurface(rosa)  === normalizeSurface(rosā)     false
normalizeSurface("Vēnit") === normalizeSurface("vēnit")  true
```

The pairs the macron is load-bearing for, each with the module that first needs it:

| Unmarked | Marked | The distinction | First collides at |
|---|---|---|---|
| `venit` | `vēnit` | comes / came | L1-M4 vs L1-M5 |
| `est` | `ēst` | is / eats | L1-M1 vs L2-M5 |
| `hic` | `hīc` | this / here | L1-M7 |
| `rosa` | `rosā` | nominative / ablative | L1-M7 |
| `liber` | `līber` | book / free | L2-M3 |
| `malum` | `mālum` | evil / apple | L2-M5 |
| `solum` | `sōlum` | ground / only | L3 |
| `os` | `ōs` | bone / mouth | L3-M7 |
| `ne` | `nē` | the enclitic / the negative | L1-M2 vs L3-M4 |

`rosa`/`rosā` is the one to keep in view: it is not a lexical pair but a **case ending**, which
means the macron is not a rare nicety in Latin — it is how the language's most ordinary grammatical
contrast reaches the index at all. A macron-less en-la would teach the ablative and index it as the
nominative.

### 1.2 Macrons are pronunciation, and that is why no acute is ever written

Vowel length is what the learner is asked to say, and Latin stress is **derivable** from it: the
penult takes the stress if it is heavy (long vowel, diphthong, or closed by a consonant), otherwise
the antepenult does. So the macron makes the stress recoverable and an acute would be a second mark
on the same vowel.

This is the opposite of en-ru, and deliberately: Russian needed acutes because unstressed vowels
**reduce**, so an unmarked Russian word is unpronounceable. Latin vowels do not reduce. **No acute
appears in any en-la display, ever** — the rule #373 (f) had to write for Korean, for the same
reason and with a different mark.

### 1.3 `v` and `i`, not `u` and `j`

`vīvō`, `via`, `iam`, `Iūlia`, `iuvenis`. This is the OLD's own convention, and the convention of
every dictionary a learner will open. `j` is a Renaissance printer's letter; writing it would put a
character in the display that the source of truth for the spelling does not contain. Capital `V` is
consonantal only, so `VĪVŌ` is never a display — §6's answer for inscriptions.

---

## 2. (a) The enclitic seam — the decision the course rests on

`-que`, `-ne` and `-ve` attach to the word before them. Printed Latin writes them solid:
`senātus populusque`, `vidēsne?`, `pater māterque`. Written solid **here**, `vidēsne` is a surface
that is neither `vidēs` nor `ne`, and the index says so:

```
surfaceIndexKeys("vidēsne")   ["vidēsne"]
surfaceIndexKeys("māterque")  ["māterque"]
```

One key, no parts. A learner tapping it gets the joined row or nothing, and the bare `vidēs` a
later module writes shares nothing with it. That is the `का` bug (`docs/08-marathi-third-review.md`,
correction 4) with Latin morphology behind it — and it lands in **L1-M2**, whose job is
"Greetings, wellbeing, yes/no questions", because `-ne` is the neutral yes/no particle.

**Decided: the hyphen, exactly as en-ko's particle hyphen (`docs/34` §2).** The host keeps its
isolation shape and the enclitic keeps a key of its own:

```
surfaceIndexKeys("agis-ne bene")      ["agis-ne bene","agis","ne"]
surfaceIndexKeys("vidēs-ne")          ["vidēs-ne","vidēs","ne"]
surfaceIndexKeys("pater māter-que")   ["pater māter-que","māter","que"]
surfaceIndexKeys("tū-ne es")          ["tū-ne es","tū","ne"]
```

`sound` carries the accent shift the enclitic causes — *vidḗsne*, *mātérque*, the enclitic making
the host's last syllable heavy — and the note says plainly that printed Latin writes it solid, so
the learner is never surprised by a page of Cicero. This is `docs/34` §1.2's rule in Latin:
**morphophonemic at the hyphen, orthographic everywhere else.**

### 2.1 The ordering law the hyphen creates, verified on shipped content

`surfaceIndexKeys` hands the part keys to whichever row is indexed **first**, and en-ko proves what
that means in practice. In the emitted `public/content/en-ko/index/L1-M1.json`:

| Key | Owner |
|---|---|
| `jeo` | `L1-M1-S01` word 0 — the host row |
| `jeo-neun` | `L1-M1-S01` word 0 — the host row |
| `neun` | `L1-M1-S01` word **0** — the host row, **not** the `-neun` row at word 1 |

The particle's own row does not own the particle's key: the host donated it one word earlier. That
is issue **#601** — "16 findings that are decided policy, not defects" — and en-la inherits it
rather than pretending otherwise.

**The law, for the briefs:** *the bare host is a word row at or before the seam that would donate
its key.* Index order is ladder → sentence → word → forms, so a host taught in an earlier sentence
(or an earlier word of the same sentence) owns its own key and the seam cannot steal it. L1-M2 must
therefore teach `agis` as its own row **before** it writes `agis-ne`, and the brief says so.

### 2.2 Three consequences to record

- **Lexicalised `-que` is written solid, and the list is closed.** `atque`, `neque`, `itaque`,
  `quoque`, `quisque`, `uterque`, `namque`, `undique`, `ubīque`, `dēnique`. Each is one word row and
  none is a seam — a hyphen in `itaque` would mint `ita` and `que` as keys for a word that is
  neither. This is en-sa's `namaste` rule (#604 (a)) and en-ko's lexicalised-particle rule.
- **`-ne` attaches to the questioned word, not always the verb.** `Tū-ne es?` asks "is it *you*?".
  The seam is a place the author chooses, not a suffix the verb row owns, so the brief names the
  host in each pattern.
- **The part key `ne` is not `nē`.** They are distinct keys (§8, run 1), so the enclitic in L1-M2
  and the negative of the subjunctive in L3–L4 never collide. `nē` gets its own owner when L3
  assigns it (#642), and no L1 row may claim it.

---

## 3. (b) Elision, and the hyphen nowhere else

Latin writes no elision: `multa est`, never `mult'est`. That matters here because `'` is the one
punctuation mark `surface.ts` rule 3 **exempts** at a token edge, and rule 2 folds `’` into it — so
an elided spelling would mint a real key:

```
normalizeSurface("mult’est")   "mult'est"
surfaceIndexKeys(…)            ["mult'est"]
```

One key, for a word that is two. **No apostrophe appears in any en-la string.** Elision is a fact
about verse and about speech, so where it matters it is carried by `sound`.

**No hyphen anywhere but the enclitic seam.** Prefixed verbs are one token (`redeō`, `abeō`,
`adsum`); `rēs pūblica` is two words and two rows, never `rēspūblica` and never `rēs-pūblica`.

---

## 4. (c) Citation forms, and what `forms` may hold

A row's `display` is **the shape its sentence first shows** — that is what first-occurrence-wins
makes true, and inventing a citation form the sentence does not contain would index a word the
learner never read. `forms` carries **every shape the course's sentences actually use** and never
the paradigm: the rule from `docs/07-llm-review-L1-M6-M10.md` binds, and a `forms` list holds
shapes of THAT word only.

So: five declensions and four conjugations are **never** written out. The dictionary entry
(`rosa, -ae f.`; `amō, amāre, amāvī, amātum`) belongs in the note's English prose, where it is
teaching rather than indexing.

Two Latin-specific riders:

- **A perfect stem is its own row, not a `forms` entry of the present.** `vēnī`/`vēnit` against
  `veniō`/`venit` is a different stem and a different index key (§1.1), and L1-M5 owns it with a
  note back to L1-M4's first-teach row. Treating it as a form would hand the perfect's key to the
  present's row and put M4's note under M5's word.
- **An inflected shape of the same stem IS a `forms` entry** — `rosa` owning `rosam`, `rosae`,
  `rosā` — provided the course's sentences write them.

---

## 5. (d) Gender, and the numerals that decline

The speaker's gender is in the first sentence of L1-M1: `discipulus`/`discipula`. Every row whose
display is gendered owns **both** shapes from its first row, the hero writing one and a variation
the other — hi-mr's precedent (`docs/26`, a speaker's gender inside "I"). The same holds for
`Rōmānus`/`Rōmāna`, `laetus`/`laeta`, and every predicate adjective in L1-M9.

`ūnus/ūna/ūnum`, `duo/duae/duo` and `trēs/tria` decline; `quattuor` upward do not. **The declining
numerals enter at L1-M8** and nothing below it writes one — pinned by the brief, because a number
that agrees is the single thing in this module English does not prepare a learner for.

---

## 6. (e) Homographs — removed by the macron, and the ones that stay

The macron **removes** nine collisions (§1.1's table). What is left is real homography, and each
gets an owning module in the briefs:

| Surface | Readings | Owner | The failure if unassigned |
|---|---|---|---|
| `quod` | which / because | L1-M9 owns "because"; the relative waits for L3 | a learner tapping "because" is told it means "which" |
| `ut` | as / so that (+ subj.) | L3 assigns it | the purpose clause reads as a comparison |
| `cum` | with (+ abl.) / when (+ subj.) | L2-M4 owns the preposition, L4-M6 the conjunction | "with the friend" glossed "when the friend" |
| `quam` | than / how / whom | L2-M9 owns "than" | the comparison's own word reads as an exclamation |
| `quī` | who / how | L3 assigns it | — |
| `eō` | I go / by that / there | L1-M4 owns the verb | the commonest verb glossed as an adverb |
| `ne` / `nē` | enclitic / negative | L1-M2 / L3-M4 | none — distinct keys (§2.2) |

`sē` and `suus` are deferred to L3-M5 with the accusative and infinitive, which is the first
construction that needs them.

---

## 7. (f) `sound`, and (g) which Latin

**Restored classical pronunciation**, named once and used in every `sound` line in L1–L4:

- `c` and `g` always hard — `Cicerō` is *ki-ke-ro*, and `magis` has the g of "get", never the j of
  "gin" (the ecclesiastical reading, and the reason this line has to be stated rather than assumed).
- `v` is *w* (`vīvō` = *wee-woh*); `i` before a vowel is *y* (`iam` = *yam*).
- `ae` is *eye*, `oe` is *oy*, `au` is *ow*.
- `r` trilled, `h` sounded, double consonants both said (`ille` = *il-le*).
- Vowel length as **length**, not quality — the macron is the instruction.
- Stress by the penultimate rule (§1.2), and the enclitic shift of §2.
- **No stress mark is ever written** (§1.2).

This is the only tradition under which the macrons are true, which is why it is the course's.
The **ecclesiastical** tradition (`c` before `e`/`i` as *ch*, `v` as *v*, `ae` as *eh*) is named as
**L5-M3**'s subject and appears in no `sound` line before it.

**Which Latin** (#630 (g)), decided once, course-wide:

- **The conversational classical register** — the comedies, Cicero's letters, and the ancient
  *Colloquia* phrasebooks. That is where a spoken L1 ladder's material actually exists.
- **`tū`/`vōs` is number, never register.** Latin has no T/V distinction; `vōs` to one person is
  simply wrong. Politeness is carried by the verb — `velim`, `quaesō`, `sīs` — which is why the
  `formal` register chip in this course sits on a **verb form** and never on a pronoun. Every other
  course puts it on a pronoun, so the brief must say this in a NOTE.
- **Modern vocabulary comes from one named source**, in this order: the Vatican's *Lexicon Recentis
  Latinitatis*, then the settled usage of the living-Latin community — `tēlephōnum`, `raeda`,
  `computātrum`, `birota`. Recorded here so that L2-M7 ("On the phone") and L3-M8 ("Money and
  paperwork") do not each coin their own word for the same object.
- **Inscriptional and legal Latin is L4-M7's** ("Official talk"), the ecclesiastical register is
  L5-M3's and L5-M4's, and no earlier module reaches for either.

### 7.1 (h) `script` is unused

`script` is typed on `Sentence`, `Variation` and `PoolItem` (`src/course/types.ts`), and en-la
**never authors it**: the display already is the script, so a `script` line would be the same
string twice. Said here so that a later reader who sees hi-mr's quiet Devanagari line does not add
one. The inscriptional capitals of L4-M7 are a **register**, not a script — they are handled as
`usage` prose, not as a second line (§1.3).

---

## 8. (i) `ȳ`, and the verification runs

**`ȳ` U+0233 is never written.** It occurs only in Greek loans (`Lȳdia`, `zōoscopȳ`), it is in
Latin Extended-B, and **no target in `tools/font-subset.ts` claims it** — `MUKTA_TARGETS`'
`latin-ext` covers U+0100–017F and U+1E00–1E9F, and U+0233 is in neither. A course that wrote it
would ship a character with no bundled glyph and no target to route it, which is #375's outcome
(B) for one rare vowel in one rare word. Greek loans are written with plain `y`, and any that needs
the length is not written at all. That keeps the course's inventory at exactly the ten codepoints
of §1.

### 8.1 The runs (the criteria #630 asked for)

Run against the real `src/engine/surface.ts` on 2026-09-12, via
`npx tsx` over a scratch script importing `normalizeSurface`, `surfaceIndexKeys` and
`surfaceSpan`:

**1. The macron keeps pairs apart; case does not.**

```
normalizeSurface(venit)  === normalizeSurface(vēnit)   false
normalizeSurface(est)    === normalizeSurface(ēst)     false
normalizeSurface(liber)  === normalizeSurface(līber)   false
normalizeSurface(malum)  === normalizeSurface(mālum)   false
normalizeSurface(hic)    === normalizeSurface(hīc)     false
normalizeSurface(rosa)   === normalizeSurface(rosā)    false
normalizeSurface(solum)  === normalizeSurface(sōlum)   false
normalizeSurface(os)     === normalizeSurface(ōs)      false
normalizeSurface(ne)     === normalizeSurface(nē)      false
normalizeSurface("Vēnit")                              "vēnit"
normalizeSurface("Vēnit") === normalizeSurface("vēnit")  true
```

**2. The seam buys part keys; solid spelling buys none.**

```
surfaceIndexKeys("vidēs-ne")           ["vidēs-ne","vidēs","ne"]
surfaceIndexKeys("pater māter-que")    ["pater māter-que","māter","que"]
surfaceIndexKeys("tū-ne es")           ["tū-ne es","tū","ne"]
surfaceIndexKeys("agis-ne bene")       ["agis-ne bene","agis","ne"]
surfaceIndexKeys("vidēsne")            ["vidēsne"]
surfaceIndexKeys("māterque")           ["māterque"]
```

**3. The question mark is stripped, so the seam is the only thing keeping a question distinct from
its statement twin.**

```
normalizeSurface("Agis-ne bene?")   "agis-ne bene"    span 2
normalizeSurface("Agis bene.")      "agis bene"       span 2
```

**4. No elision: an apostrophe mints one key for two words.**

```
normalizeSurface("mult’est")   "mult'est"     keys ["mult'est"]
```

**5. Every macron vowel is a single NFC codepoint** — no combining mark, so nothing in this course
is two codepoints where it looks like one (the problem that disqualified ISO 15919 for en-sa,
#604):

```
ā [1 ["U+0101"]]   ē [1 ["U+0113"]]   ī [1 ["U+012B"]]   ō [1 ["U+014D"]]   ū [1 ["U+016B"]]
Ā [1 ["U+0100"]]   Ē [1 ["U+0112"]]   Ī [1 ["U+012A"]]   Ō [1 ["U+014C"]]   Ū [1 ["U+016A"]]
```

**6. The host-donates-the-part-key law, on shipped content** — `public/content/en-ko/index/L1-M1.json`,
§2.1's table.

### 8.2 The cmap measurement, and the charge (#631)

Read with fontkit off the `@fontsource` **source** files — not the generated cuts, which contain
only what the harvest kept — on 2026-09-12:

| Face / weight | `Ā ā` | `Ē ē` | `Ī ī` | `Ō ō` | `Ū ū` | `ȳ Ȳ` |
|---|---|---|---|---|---|---|
| mukta `latin-ext` 400 | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| mukta `latin-ext` 600 | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| mukta `latin-ext` 700 | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| source-sans-3 `latin-ext` 400/600/700 | ✓ | ✓ | ✓ | ✓ | ✓ | ✗ |
| mukta `latin` 400/600/700 | ✗ | ✗ | ✗ | ✗ | ✗ | ✗ |

**Outcome: no target is widened and no face is added.** Mukta's own `latin-ext` source draws all ten
macron vowels at all three weights of the L2 ramp, which is #375's outcome (A) — the same answer
#222 got for en-ar's `ā ī ū`, now extended to `ē ō` that the file's comment had only ever called
"the ē ō a future scheme may want". Source Sans 3 draws them too, so there is a second bundled face
behind the first; Mukta is named first in `--font-devanagari` and answers.

Two things the same run settles:

- **`mukta latin` holds exactly three codepoints in U+0100–017F** (U+0131, U+0152, U+0153 — the
  three the `latin` target claims by hand). So the macrons are unambiguously the `latin-ext`
  target's, and the two targets stay disjoint.
- **`ȳ Ȳ` U+0233/U+0232 are drawn by nobody**, which is §8's decision measured rather than argued:
  no target claims them and no source draws them, so writing one would ship a character with no
  glyph and no routing.

**The charge.** `SCRIPT_BY_LANGUAGE_TAG` gains `la: 'latin-ext'`. Without it an en-la learner
precaches no `latin-ext` file at all — `ROMANIZATION_SCRIPT` fires on `scriptMode === 'romanized'`
and en-la is `native`, so nothing else in `coursesFromManifest` would reach the cut. Online the
browser fetches it from the `@font-face` `unicode-range` on demand and the defect is invisible;
offline every long vowel renders in the system face with the rest of its word in Mukta. The
comment that used to read *"a native-script course never prints a mark"* is corrected in the same
commit: it is true of every native row whose alphabet is not Latin, and false of this one.

`tools/payload-budget.test.ts` pins it — a new file, never deleted and so never a resurrected gate
— asserting that a `native` row tagged `la` is charged `latin-ext`, a `native` row tagged `it` is
charged nothing, a `romanized` row is charged by mode, and that no tag in the table names a script
the build does not cut. The change is a **no-op for every shipped course**: no shipped row carries
`la`, and `npm run budget` after it reports the same rows as before, `unmetered` at 0.0 KiB and
`precache 17 files 205.1 KiB gzip = shell ok`.

---

## 9. What no build gate can catch, and what replaces it

`checkScriptMode` does not run here (§0), so these are the substitutes, and every authoring issue
in the arc quotes their output:

1. **`src/course/types.test.ts`** gains an en-la block (#632): no `j`/`J`, no `'`, no `ȳ`, no acute,
   and a hyphen only immediately before `que`/`ne`/`ve`, across every Latin field of every en-la
   module. It passes vacuously until the first module and binds from then on.
2. **A per-wave orthography sweep** over the emitted course, whose counts each authoring PR quotes.
   It cannot know whether `consul` should have been `cōnsul` — no tool can, short of the OLD — so
   the macron itself stays a review responsibility, named in every review doc.
3. **The index, read.** Every authoring issue already requires that every pool token resolve to the
   right row; §1.1's pairs are the ones to read back by hand, `venit`/`vēnit` first.

---

## 10. The paragraph the README and the brief header quote

> Latin in en-la is written with **macrons on every long vowel**, per the Oxford Latin Dictionary,
> because vowel length is phonemic and the word index cannot see it otherwise: `venit` (comes,
> L1-M4) and `vēnit` (came, L1-M5) are two index keys only if the macron is written, and the
> ablative `rosā` is the nominative `rosa` without it. Consonantal u is `v` and consonantal i is
> `i` — `vīvō`, `iam`, `Iūlia` — and `j` never appears. No stress mark is ever written: Latin
> stress follows from vowel length, which the macron already gives. The enclitics `-que`, `-ne` and
> `-ve` are joined to their host with a **hyphen** (`agis-ne`, `māter-que`) so that the bare host
> and the bare enclitic each keep an index key of their own, with the accent shift given in the
> sound line and the note saying that printed Latin writes them solid; the lexicalised ones
> (`itaque`, `quoque`, `neque`, `atque`, `dēnique` and their closed list) are one word and carry no
> hyphen. Latin writes no elision, so no apostrophe appears in any display. The pronunciation
> taught throughout is **restored classical** — hard `c` and `g`, `v` as *w*, `ae` as *eye* — the
> only tradition under which the macrons are true; the ecclesiastical tradition is L5-M3's subject.
> `tū`/`vōs` is **number, not register**: Latin has no T/V distinction, so politeness rides on the
> verb (`velim`, `quaesō`, `sīs`) and the `formal` chip sits on a verb form rather than a pronoun.
> Every display string in this course follows this one scheme — the word index matches surfaces
> verbatim, so a second scheme would break resolution.

---

## 11. Open questions for the fluent-speaker gate

The review bar for this course is an LLM review plus the repo owner's authority, exactly as for the
other ten. A **fluent speaker of living Latin, or a Latin teacher**, has not seen any of it, and
Latin's version of that gate is stranger than en-sa's: there is no native speaker and there never
will be, so the gate is competence in a living community of use rather than nativity. Every review
doc in this arc ends in its own numbered questions. The standing ones from this file:

1. Is the enclitic **hyphen** (§2) legible to someone who reads Latin, or does `agis-ne` read as an
   error rather than as a teaching convention? The alternative — `nōnne`/`num`/bare intonation in
   L1 and the enclitic deferred to L2 — is honest spoken Latin too, and reversing this decision
   after L1 ships would be an en-ru-shaped rewrite.
2. Is `nummī` the right neutral money word for L1-M8 (§7's rule says one named source), against
   `sēstertiī` (classical but dated) and a modern coinage?
3. Does the restored-classical `sound` line serve a learner who will meet ecclesiastical Latin
   first in the wild, or should L1 name the other tradition earlier than L5-M3?
4. Which shape of "let's" does living Latin actually reach for — the hortatory subjunctive
   (`eāmus`) — and does teaching it in L2-M6 arrive before the learner can parse a subjunctive at
   all (#638 decides; this is the question behind that decision)?
