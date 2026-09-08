# en-de L2 — the authoring-brief decisions (#432)

The ten en-de L2 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['en-de']` L2-M1…L2-M10), pinned
against the REAL cumulative index — `public/content/en-de/index/L1-M10.json`, rebuilt and read on
2026-09-08: **203 surfaces, maxSpan 3**. The seven L1 decisions carry unchanged, and decision 2 —
the case fold meeting German capitalisation — governs this level more than any other.

## 1. Register — `du` enters at M1

#432 says "`Sie` enters at M1". L1's decision 3 says every second-person line in L1 was already
`Sie`, and the index agrees (`sie`, `Ihnen`, `Ihr`, `sind`, `möchten`). So the address that enters
here is **`du`**, as en-fr's L2 opens `tu` and en-ru's opens `ty`. Rule 1 applies to premises.

It is the most expensive register decision in the repo, and L1 said why in advance: `Sie` takes
the plural verb, so its form is spelled exactly like the infinitive and cost the index nothing;
`du` costs a second set of endings, its own imperative and `dein`/`dich`/`dir`. M1 pays all of it.
M4, M7, M8 `Sie` (`formal`); M6 `du` (`informal`); M1 shows the pair.

## 2. `sie` — the owner was decided in L1

#432 says the collision is "now live … owner decided here". It was decided in L1: decision 2 gave
the key to **L1-M2** as one entry with three readings, note already true of all three, separating
rule stated (`sie ist` she, `sie sind` they, `Sie sind` you). M2 of this level uses `sie` for "she"
and "they" and opens no rival row.

What IS decided here is the consequence L1 created by exclusion. L1 kept `ihnen` and the
possessive `ihr` out so `Ihnen` and `Ihr` would each own a clean key. **So "her" is taught on
`ihre` alone**, and a masculine or neuter possession takes the `von` periphrasis (`der Bruder von
Anna`) — ordinary spoken German, not a workaround. Bare `ihr` is never authored as a possessive;
`ihnen` stays out of L2 entirely.

## 3. Attributive adjective endings are DEFERRED

German's attributive adjective has three declensions chosen by what precedes it. **Every adjective
in en-de L2 is PREDICATIVE** — after `sein`, no ending — and the declension is named in M3 and
deferred to L3.

That is a relocation, not a hole: German's agreement lives in the ARTICLE, so M3's "agreement at
length" is spent on the case grid L1 half-built — `der`/`die`/`das` against `den`/`die`/`das`
against `dem`/`der`/`dem`, with `ein`, `einen`, `einem`, `kein` beside them. It is what lets M4
teach a two-way preposition and M8 teach a dative verb.

## 4. Separable verbs stay UNSPLIT in L2

L1's decision 4 named the hazard: a separated prefix is spelled like a preposition or an article,
so `Ich steige ein` puts `ein` on L1-M1's indefinite-article row. **A separable verb appears in L2
only unsplit** — the infinitive after a modal (`Sie müssen hier einsteigen`) or the participle in
the Perfekt (`Ich bin eingestiegen`). The split is named at M4 and deferred to L3.

It costs nothing, because M1's whole lesson is the modal bracket, so every L2 sentence that wants a
separable verb already has a modal in it. `an` is then free for M4 to own as a preposition, with a
note true of the prefix it will later become.

## 5. Which past — the Perfekt, except for the three that resist it

**The Perfekt is the spoken past for nearly every verb** (auxiliary in position two, participle at
the end — the bracket again), and **`sein`, `haben` and the modals prefer the Präteritum** (`war`,
`hatte`, `konnte`) — which is exactly why L1-M5 shipped `war`, `waren`, `hatte`, `hatten` and no
participle for either. `sein` as auxiliary goes with movement and change of state; `haben` takes
the rest. And the relief worth naming: unlike the three Romance courses here, **the German
participle never agrees with anything**.

Konjunktiv II is L3-M4's with one frozen exception: `könnten` in M1's politest request — the
treatment `je voudrais` gets in en-fr and `vorrei` in en-it.

## Collisions L2 meets, and their owners

- `das Essen` → L1-M3's `essen` (M5 points back, note true of verb and noun).
- `der Morgen` → L1-M6's `morgen` ("tomorrow"), with L1-M4's `morgens` a third relative (M6).
- `Frau` → L1-M2's title row, which also means "woman" and "wife" (M2).
- `am` → L1-M4's `am Montag` row, doing the superlative `am größten` at M9.
- `wie` → L1-M2's `Wie geht es Ihnen?` row, doing equality `so … wie` at M9.
- `nach` → L1-M5's `nach hause` is a phrase, so the bare preposition is fresh at M6 and carries
  both the clock's "past" and the direction.
- `der` → L1-M1's masculine nominative also answers for the dative feminine (M3).
- `sein` (possessive) is free: L1 only ever indexed `ist`, `bin`, `sind`, `war`, never the
  infinitive — so M2's note must say the two words are spelled alike.
- Umlauts and `ß` are kept by the fold, so `alter`/`älter` are two keys (M9) and a display must
  never be written in capitals (`STRASSE` folds to `strasse`, landing on no row).

## Bounds and shape

Bounds climb 8 → 10 (M1–M3: 8, M4–M7: 9, M8–M10: 10); pools to 12; M1–M3 fully enriched; M10's
items are four-sentence accounts in the Perfekt.
`npm run content:prompt -- en-de L2-M1` renders from the real index, and the decisions are pinned
by `tools/course-briefs.test.ts` (`en-de L2: the decisions its briefs settle (#432)`).
