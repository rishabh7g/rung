# en-ru L2 — LLM review

The review that clears each en-ru L2 wave to ship, written in the same change that authors it
(`CLAUDE.md`, "Ship `verified: true` in the authoring change"). The **native-speaker gate is a
separate, stricter bar and stays unmet**: every section below ends in open questions for a native
pass, and no later wave may close one of them by rewriting a shipped module.

Open questions are numbered as a fresh en-ru L2 chain from 1. The L1 reviews number their own
findings per document and are not continued here.

## Wave 1 — L2-M1, L2-M2 (#438)

Authored against the briefs written by #429 and the decisions recorded in `docs/56`. Reviewed
against the real cumulative index: 228 surfaces through L1-M10, 246 through L2-M1, 312 through
L2-M2, `maxSpan` 3.

### L2-M1 "Asking politely"

The module's grammar is the **aspect of an imperative**, which L1 shipped in pairs
(`chitát'`/`prochitál`, `kuplyú`/`kupíl`) without ever teaching the choice. `Skazhíte` asks for one
act; `Govoríte` says carry on, do it this way. They are authored on separate rows, each note naming
the other, because the L1 aspect-partner policy forbids one row carrying both — and here that
policy is doing real work: a single row would put the module's own lesson out of reach.

The half an English speaker cannot guess is the host's imperfective (`Prokhodíte`, `Sadítes'`),
which M5 will spend at a table and which this module names in rule 0 without opening either verb.

Two other things arrive:

- **The subjectless sentence.** `Mne núzhno rabótat'`, `Mózhno vódu?` — literally "to me
  necessary", "permitted water". L1-M9's `Mne nrávitsya` was already this shape and never said so.
  Rule 1 names it once and points forward to M3's `Zdes' net magazína` and M8's
  `Mne nuzhná pómoshch'`, so the learner meets the pattern rather than three unrelated idioms.
- **The polite negative question.** `Vy ne mózhete mne pomóch'?` is *softer* than the same question
  without `ne`, which is the reverse of what an English ear does with a negative question. Rule 2
  states it flatly, because nothing about the words explains it.

The register decision is honoured as `docs/56` records it: `vy` is the course default and `ty`
appears in no display until M6, so the `formal` chip marks only the elaborated request —
`Bud'te dobrý`, `Vy ne mózhete…?` — and plain `vy` to a stranger stays `neutral`.

`izviníte` and `prostíte` are given as **near-synonyms**, not as a clean split. The trap on S09 says
so explicitly, because a rule assigning one to apologies and the other to getting attention is
contradicted within a day of hearing Russian.

### L2-M2 "Describing people"

The long adjective arrives with all four nominative cells in one row's `forms`
(`vysókiy · vysókaya · vysókoye · vysókiye`) — one paradigm, one home, so M3 can add case shapes to
the same rows rather than opening new ones. Rule 0 states the split L1 left implicit: `ustál` and
`ustála` were **short-form** adjectives all along, the short form is not a shortening of the long
one, and only a handful of adjectives use it in ordinary speech.

`yevó` and `yeyó` each carry two jobs — "his"/"him", "her"/"her" — on one row apiece, with the note
true of both. `u nevó` and `u neyó` are their own keys (see the correction below), which is where
the n-after-a-preposition rule lands.

`mat'` and `doch'` are taught as words rather than as examples: they are the only two feminine
nouns of their shape in the course, and their `-er-` stem appears in every form but the
nominative. They are introduced two sentences apart so the pair is visible.

### One seam correction, made against the real index

**`u nevó` and `u neyó` must ride as whole two-token surfaces, not as a preposition plus a
pronoun.** The first draft opened bare `nevó` and `neyó` rows, and the build rejected it: `u` alone
is not taught anywhere in the course, because L1-M8 authored `u menyá` and `u vas` as whole
surfaces. Making the L2 pair match L1's shape is both the fix and the more honest teaching — the
frame is what a learner says, and there is no separate `u` to learn.

### A stress mark the brief omits

The M1 seam writes `bud'te`. The level's romanization rule (L1 decision, carried unchanged) puts an
acute on every polysyllable and none on a monosyllable, and `búd'te` is two syllables stressed on
the first — so the module ships **`búd'te`**, and the index key differs from the seam by one
codepoint. The rule wins over the seam here for the same reason `dáyte`, `zdrávstvuyte` and
`izviníte` all carry their marks: an unmarked romanization teaches an English reader to say the
word wrong, which is exactly what #355 decided the marks are for.

### The ratchet

Clean on both modules at first build once the `u nevó` correction was made. The en-ru baseline
stays at 20.

### Open questions for the native pass

1. **The aspect pair `skazhíte` / `govoríte`** (M1-S01). Confirm that `Skazhíte, pozháluysta` is the
   ordinary street request and that `Govoríte` in that seat would be heard as odd rather than merely
   emphatic.
2. **The polite negative** (M1-S03). Confirm `Vy ne mózhete mne pomóch'?` is genuinely softer than
   the affirmative and is not now dated or over-careful.
3. **`Mózhno vódu?`** (M1-S05). Confirm the verbless request is unremarkable in a café and reads as
   polite rather than clipped.
4. **`Bud'te dobrý`** (M1-S06). Confirm it is current spoken Russian rather than a written or
   older-generation formula, and that `Bud'te lyubézny` is not the commoner one.
5. **`Ne za chto`** (M1-S08). Confirm it is warmer than `pozháluysta` as an answer to thanks, as the
   usage line claims.
6. **`Búd'te dobrý` and its two stresses** (M1-S06). The module claims `dóbryy` (long form) and
   `dobrý` (short form) differ only in where the stress sits. Confirm, and confirm `búd'te` is
   stressed on the first syllable.
7. **`molodáya` of a grown sister** (M2-S02). Confirm it reads as "young" rather than "younger" and
   carries no implication about age order.
8. **`stáryy` of a parent** (M2-S10). The note calls it blunter than English "old". Confirm the
   strength of that and whether `pozhilóy` would be the ordinary courtesy.
9. **`úmnyy`** (M2-S09). Given as warm, closer to "bright" than to "clever". Confirm.
10. **`drug` / `podrúga`** (M2-S08). Confirm `drug` really is usable of a woman in the way the note
    claims, and that `podrúga` carries no romantic reading in the frame shown.
