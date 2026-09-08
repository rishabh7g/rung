# en-ar L2 — the authoring-brief decisions (#427)

The ten en-ar L2 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['en-ar']` L2-M1…L2-M10), written
against the verified L1 ladder rather than ahead of it. Every seam below was pinned against the
REAL cumulative index — `public/content/en-ar/index/L1-M10.json`, rebuilt and read on 2026-09-08:
**287 surfaces, maxSpan 3** — and against the spoken pass (`docs/42`), whose three amendments
(the `sa-` demotion of `sawfa`, the construct `-t` of a 3–10 number, the `kitābān`/`kitābayn`
usage line) carry into L2 unchanged.

## 1. MSA stays, and the dialect question is answered: PROSE ONLY

The variety (#198) is not reopened. What L2 must settle is a pressure L1 never felt, because L1
never made a phone call or sat at a table: `al-ḥāfila` is the bus in every newspaper and `al-bāṣ`
is the bus every passenger says; the MSA offer at a table is correct and stiff.

**The rule: a dialect form may be NAMED in `usage` prose, in words, and may never appear in
`display`, `script`, `forms` or a pool item.** This is L1's own rule ("where the MSA form sounds
formal in the street, `usage` says so") applied at the two moments that make it bite, and it keeps
the index — fed by `display` and `forms` — monolingual. Exactly three modules carry such a line:
M4 (the bus), M5 (the offer), M7 (the word for a mobile). A module needing a second would be
teaching the wrong variety.

`ālū` is not an exception to this: it is the standard telephone opening in MSA-speaking practice
everywhere, has no MSA rival anybody uses, and is therefore in `display` like any other word.

## 2. Register — en-ar has no `tú`/`usted` split, and that IS the decision

Arabic's second person forks by gender, not politeness (`anta`/`anti`, `ismuka`/`ismuki`), and L1
taught that fork from M1, so M1 does not spend itself on an address contrast the way the other
eight L2s do. MSA is already the formal register, so #422's chip marks only the ceremonial end —
`law samaḥta`, `tafaḍḍal`, `shukran jazīlan`, `as-salāmu ʿalaykum` chip `formal`, everything else
`neutral`, and **`informal` is unused in this course**, because the forms that would earn it are
the dialect forms decision 1 keeps out of `display`. The briefs say so, so that a missing value
reads as deliberate.

## 3. Agreement at length — three laws, each with a false version to refuse

- **Non-human plurals take feminine singular agreement** (M3): `al-kutub jamīla`, `as-sayyārāt
  kabīra`. Only human plurals take plural adjectives. The silent slogan to refuse is English's
  own — "plural noun, plural adjective".
- **A verb before its subject stays singular** (M10): `dhahaba al-awlād`, never `*dhahabū
  al-awlād`; gender agreement only. L1 dodged it with pronoun subjects; a four-sentence account
  with named people cannot.
- **The `afʿal` comparative is invariable** (M9): `hiya akbar min ukhtihā`, after nine modules in
  which every adjective bent.

## 4. Seams — the hyphen laws carry, and L2 adds four collisions

The L1 clitic owners stand (`al` M1, `bi` M2, `sa` M6, `li` M9) and `surfaceIndexKeys` still
indexes a hyphenated surface and each of its parts. New:

- **`min` is "than"** (M9) — the key is L1-M1's "from". Third job on one row: origin (L1-M1), the
  phrase `min faḍlika` indexed whole (L1-M8) to protect it, comparison (M9). M9 points back and
  opens nothing.
- **`man` is not `min`** (M7) — one short vowel apart, and short vowels are always written for
  exactly this reason.
- **`afʿal` is a pattern, not a meaning** — M3's colours (`aḥmar`, `azraq`) and M9's comparatives
  (`akbar`) share the shape; the root decides. Both modules say it.
- **`laysa` enters at M7 as one frozen cell** — third person only (`laysa`, `laysat`), taught as
  vocabulary, conjugation deferred to L3. It is the one L1 prohibition L2 lifts, lifted narrowly
  and on the record, because a call's whole business is absence and `lā` cannot negate a nominal
  sentence.
- Two assimilated articles are fresh hyphen-part keys at M6 (`ath`, `ar`), joining L1's `as`,
  `ash`, `aṣ`, `aẓ`, `aṭ`.

Every romanized surface in these briefs was round-tripped through `src/engine/surface.ts`: one
word → one key, hamza folding to `'` and ʿayn staying `ʿ`, `ḥamrāʾ` → `ḥamrā'`, `taʾakhkhartu` →
`ta'akhkhartu`, `alḥamdu lillāh` staying one multi-token surface.

## What L2 withholds

Named in the module that would reach for it: the full case system; the passive; `lam` and `laysa`
beyond M7's cell; `qad`; the jussive; the dual beyond L1-M8's counted pair and M3's recognition
row; and broken plurals as a derivational SYSTEM — they stay vocabulary, listed in the `forms` of
the row that teaches the singular, and no rule claims the pattern is predictable, because it is
not.

## Bounds and shape

Bounds climb 8 → 10 (M1–M3: 8, M4–M7: 9, M8–M10: 10); `newWordCap` stays the PRD §5 25; pools are
authored to 12; M1–M3 ship fully enriched (validator law, any level); M10's items are
four-sentence accounts with every person suffix written in full.
`npm run content:prompt -- en-ar L2-M1` renders today from the real index, and the decisions above
are pinned by `tools/course-briefs.test.ts` (`en-ar L2: the decisions its briefs settle (#427)`).
