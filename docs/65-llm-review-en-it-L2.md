# en-it L2 — LLM review

The review that clears each en-it L2 wave to ship, written in the same change that authors it
(`CLAUDE.md`, "Ship `verified: true` in the authoring change"). The **native-speaker gate is a
separate, stricter bar and stays unmet**: every section below ends in open questions for a native
pass, and no later wave may close one of them by rewriting a shipped module.

Open questions are numbered as a fresh en-it L2 chain from 1. The L1 reviews number their own
findings per document and are not continued here.

## Wave 1 — L2-M1, L2-M2 (#439)

Authored against the briefs written by #430 and the decisions recorded in `docs/57`. Reviewed
against the real cumulative index: 263 surfaces through L1-M10, 280 through L2-M1, 358 through
L2-M2, `maxSpan` 3.

### L2-M1 "Asking politely"

The module teaches the polite VERB and not the polite pronoun, which is the level's register
decision and the thing that makes Italian different from every other course here: the language is
pro-drop, so politeness shows up as a third-person ending on a verb pointed at the person in front
of you. `Può ripetere?` beside `Puoi ripetere?`, `Come sta?` beside `Come stai?`. Every request is
authored in both addresses side by side, because the ending is the only signal in the sentence.

**`Lei` never reaches a display**, and the reason is checked against the real function rather than
assumed: `normalizeSurface` lowercases, so `Lei` folds to `lei` — already L1-M10's key for "she" —
and first occurrence wins. A polite `Lei` in a display would send every courteous sentence in the
course to a note about the third person feminine. It is named in prose, with its capital, and
nowhere else. `La` and `Le` are barred for the same reason.

The three-way split of "sorry" is the module's best content because English collapses it: `Scusi`
before the fact, `Mi dispiace` after it, `Permesso` to come through. The `Permesso` trap says the
thing a phrasebook will not — it is an announcement rather than a question, and waiting for
permission after saying it is what marks a foreigner.

The frozen-form discipline is held: `Scusi` and `Senta` are present subjunctives and `potrebbe` and
`potresti` are conditionals, and all four arrive as single words with a note saying L3 will show the
paradigm. Shipping the word while deferring the system is honest; pretending the forms are
unrelated would not be.

### L2-M2 "Describing people"

Features take `avere`, and age is where the mistake block sits, because `è trenta` is the
word-for-word translation and means nothing. The article is part of the frame (`ha i capelli`, never
`ha suoi capelli`), which is the same habit the possessive rule needs.

The possessive law is taught in both halves at once: a possessive keeps its article
(`il mio libro`), and it DROPS before a singular family member (`mio fratello`) — and comes back in
the plural (`i miei fratelli`). English drops it always and Spanish drops it always, so neither half
transfers.

`essere` against `stare` is explicitly NOT the Spanish split, said in the rule so an author who has
read the en-es briefs does not import the wrong law: Italian sends location to `essere`
(`Sono a Roma`) and keeps `stare` for health and how things are going.

The `-co` plural fork is taught as vocabulary rather than as a rule, because it is one: `amico` →
`amici` with a soft c, `bianco` → `bianchi` with the hard one kept, and `amica` → `amiche` hard in
the same word that softens in the masculine. Every plural sits in its own row's `forms`.

### One test the L2 arrival exposed

`src/course/types.test.ts`'s en-it elision case (#333) walks the ladder in order and checks each
apostrophe surface against what is taught at or before that module. Its comparator sorted by
`moduleNumber` alone, so **L2-M1 sorted in front of L1-M7** and `dov'è` — taught in L1 — was checked
against a set that did not yet contain it. The comparator now sorts by id with numeric collation,
which is level-then-number, and the now-unused `moduleNumber` helper is gone. This was a latent
defect that only a second level could surface, and it is the kind the ratchet cannot see.

### The ratchet

Clean on both modules at first build. The en-it baseline stays at 17.

### Open questions for the native pass

1. **The five-tier ladder** (M1). `Puoi` → `Può` → `Potresti` → `Potrebbe`, with `Scusi`/`Senta` in
   front. Confirm the ordering matches how an Italian ear ranks them.
2. **`Senta`** (M1-S08). Given as an ordinary opener rather than as brusque. Confirm, and confirm
   `Senta, scusi` in that order is natural.
3. **`Permesso`** (M1-S06). The trap says it announces rather than asks. Confirm, and confirm it is
   still current with younger speakers.
4. **`Grazie mille`** (M1-S07). Confirm it is not now dated beside `Grazie infinite` or plain
   `Grazie`.
5. **`aiutarmi`** (M1-S10). Confirm the enclitic form is what is said, rather than
   `mi può aiutare?`, which the level cannot write because bare `mi` is deferred to M5.
6. **`anziano` over `vecchio`** (M2-S02). The note calls `vecchio` blunter of a person. Confirm the
   strength of that.
7. **`simpatico`** (M2-S03). Given as the ordinary compliment. Confirm it does not read as faint
   praise.
8. **`bravo`** (M2-S07). Given as "good at something". Confirm the frame `è bravo` carries that
   without a complement.
9. **`capelli neri` vs `castani`** (M2-S10). The note says Italians reserve `neri` for genuinely
   black hair. Confirm.
10. **`marito` and `moglie`** (M2-S08). The note says Italian has no ordinary equivalent of
    "partner". Confirm for current usage.

## Wave 2 — L2-M3, L2-M4, L2-M5 (#448)

Three rungs against the briefs of #430. The wave's spine is the elision policy: three separate
modules turn on the fact that an apostrophe fuses two words into ONE index key.

### The elision, three times

- **`bell'uomo`** (M3-S04). The brief lists `bell'` as a fresh key, and it cannot be one: the
  shortened `bello` fuses with its noun and the engine sees a single token, exactly as it does with
  L1's `l'acqua` and `dov'è`. The row is `bell'uomo`, with a note saying there is no separate
  `bell'` for anything to resolve through. `bel`, `bei` and `begli` are ordinary separate words and
  do have their own rows.
- **`l'angolo` and `l'autobus`** (M4-S05, M4-S06). Both are authored, and `autobus` is authored
  separately beside `l'autobus` because the fused form does not answer for the bare one. Three
  shapes of one noun end up in the module — `l'autobus` with the article, `autobus` bare after `in`,
  `gli autobus` in the plural — and none is derivable from the others.
- **`dell'acqua` and `un'altra`** (M5-S04, M5-S08). The partitive elides, and its fused form does not
  answer for L1-M8's `l'acqua`; by the end of M5 the course holds `acqua`, `l'acqua`, `d'acqua` and
  `dell'acqua` as four keys. `un'altra` carries the apostrophe and `un altro` does not, which is one
  of the few places in Italian where the apostrophe records gender.

### Seam corrections against the real index

The M3 brief lists `bianco`, `verde`, `nero` and `lungo` among its fresh keys. All four were opened
by L2-M2, which needed them for hair and eyes, so M3 teaches `rosso`, `giallo`, `blu`, `rosa` and
`viola` and re-shows the rest. Nothing is lost: the `-co` fork is still demonstrated, on `sporco`
against `amico`.

### Where each module spends its budget

M3 states the grid as a summary of what L1 already shipped — four cells for `-o`, two for `-e` — and
refuses the shortcut that "-o is masculine": that is about nouns, and it is false there too. The
invariable colours are its best fact, because they are nouns pressed into service and a noun keeps
its shape. `bello`'s apocope is taught against the ARTICLE rather than against gender, which is the
only framing that makes four shapes into one rule.

M4 speaks the polite third person throughout and spends M1's frozen imperatives (`Giri`, `Prenda`,
`Vada`). Transport takes `in` and walking takes `a`, given as a list rather than a principle because
that is what it is. `Come si va…?` uses the impersonal `si`, free only because L1 authored
`si chiama` as a whole phrase.

M5 opens the clitics, and the index chooses which: `lo`, `li`, `mi` and `ti` are teachable because
`la`, `le`, `i` and `gli` are already L1-M1's ARTICLES, and `mi` and `ti` are free only because L1
wrote `mi chiamo`, `mi piace` and `ti chiami` whole. The placement rule — the clitic goes before the
verb — is the reverse of English in every sentence it touches. The present tense doing the future's
work (`Prendo un caffè`) is named here and pointed forward at M6.

### The ratchet

Four findings across the wave (`bell'uomo`, `io`, `buon`, `così`), each fixed by opening the row the
module actually needed. The en-it baseline stays at 17.

### Open questions for the native pass

11. **The invariable colours** (M3-S02). Confirm `le case rosa` and `i libri blu` are what is said,
    and that no speaker regularises them.
12. **`bel` / `bell'` / `bei` / `begli`** (M3-S03, S04). Confirm the article-tracking rule holds
    without exceptions a learner will meet, and that `begli occhi` is ordinary rather than literary.
13. **`sporchi` against `amici`** (M3-S07). Confirm the fork really is unpredictable and that no
    stress rule covers it for these two.
14. **`Vada sempre dritto`** (M4-S03). Confirm `sempre` is near-compulsory in the phrase, and that
    `diritto` and `dritto` are interchangeable here.
15. **`a piedi`** (M4-S07). Confirm it is the only member of the transport set taking `a`.
16. **`È lontano?`** (M4-S08). The module keeps `lontano` invariable as an adverb. Confirm a native
    would not say `È lontana?` of a feminine subject.
17. **`Come si va a…?`** (M4-S09). Confirm it beats `Come faccio ad arrivare a…?` in the street.
18. **`Prendo il pesce`** (M5-S02). Confirm the present is what a waiter hears, and that `Prenderò`
    would sound odd rather than merely formal.
19. **`Lo prendo io`** (M5-S05). Confirm the trailing `io` reads as contrast rather than as
    emphasis-for-its-own-sake.
20. **`Sono a posto`** (M5-S07). Confirm it is current and not regional, and that `Basta così` is
    the gentler of the two.
21. **`della verdura`** (M5-S10). Confirm the singular is right where English is plural, and that
    `delle verdure` would mean kinds rather than quantity.

## Wave 3 — L2-M6 through L2-M10 (#457)

Five rungs, and the level closes. A strict build emits `en-it: 20 modules`.

### What each module spends its budget on

- **M6 Making plans together.** The `noi` ending IS the suggestion — `Andiamo!` is both "we go" and
  "let's go" — so Italian needs no word where English needs "let's" and Spanish reaches for
  `vamos a`. That is a rest point, and the module says so. Its delta is the article on a day:
  `il lunedì` is Mondays in general and `lunedì` is the one coming up, a distinction English marks
  with a plural instead. `meno un quarto` is deliberately not shown, because `meno` is M9's key and
  its first note has to be the comparative one.
- **M7 On the phone.** `Pronto?` is taught as the adjective it is, not as an unanalysable noise.
  `stare + gerundio` opens, and the important half is what it does NOT do: `Domani sto lavorando` is
  wrong where English says "I'm working tomorrow", and M6's plain present is the repair.
  `più tardi` rides whole, which is what kept the bare `più` free for M9.
- **M8 When something goes wrong.** `Mi fa male la testa` is `mi piace` with a different verb, so
  the structural lesson costs nothing — and `mi fanno male i piedi` shows the verb counting the
  body parts rather than the person. The clitic goes on the BACK of an infinitive (`aiutarmi`),
  which is the other half of M5's rule. Complaining calmly is not hedging: the politeness is in
  `Scusi` and `Purtroppo`, and softening the claim itself reads as evasive.
- **M9 Comparing and choosing.** `più … di` against `più … che` is the choice English does not have,
  and it costs no new function words at all — `che` is L1-M5's and `di` is L1-M1's. `migliore`
  against `meglio` runs the opposite way from every other comparison in the level, because English
  and Spanish both merge what Italian keeps apart. `quello` apocopates exactly as M3's `bello` does:
  one rule, paid twice.
- **M10 Telling what happened.** The two pasts, and the slogan killed in the same words en-es's and
  en-ru's M10s use: what decides the tense is the ROLE the clause plays in the telling.
  `Da bambino andavo sempre al mare` is a habit rather than a duration, which is the case that most
  clearly breaks "ongoing". The auxiliary law is finally written down, and `rimanere` is flagged as
  the place it has to be learnt rather than reasoned out.

### Rows the briefs do not list

`lunedì` bare (M6 — L1-M4 owns only `il lunedì`), `io` and `buon` and `così` (M5), `fanno` and
`partito` (M8), `chiamato`, `quando`, `lavoravo`, `preso`, `siamo`, `tornati`, `da bambino` and
`dov'eri` (M10). Most are participles and imperfetto cells an account cannot be told without; two
are elisions that fuse (`dov'eri`, and `da bambino` riding whole with no article inside it).

### The ratchet

Sixteen findings across the wave, every one fixed by opening the row the module needed or by
rewriting the variation. Nothing was resolved by moving a baseline. The en-it baseline stays at 17.

### Open questions for the native pass

22. **`Ti va di…?`** (M6-S02). Confirm it is the everyday invitation and not regional, and that the
    `di` before a verb is compulsory.
23. **`Facciamo alle sette e mezza`** (M6-S05). Confirm `Facciamo` is how a time gets settled rather
    than a translation of "let's make it".
24. **`il lunedì` against `lunedì`** (M6-S09). Confirm the article really carries "every", and that
    a native would not also say `ogni lunedì` more often.
25. **`Pronto?`** (M7-S01). Confirm it is universal and that regional alternatives do not displace
    it.
26. **`Non c'è`** (M7-S03). Confirm it is what is said of a person who is out, without a pronoun.
27. **`Un attimo`** (M7-S07). Confirm it beats `Un momento` in speech.
28. **`Ho dimenticato il telefono a casa`** (M8-S03). Confirm Italian uses `dimenticare` where
    English says "left", and that `lasciare` really implies intent.
29. **The direct complaint** (M8-S10). The module claims a hedged Italian complaint reads as
    evasive. Confirm the strength of that, and that `Purtroppo` is the one acceptable softener.
30. **`più … che` with two adjectives** (M9-S02). Confirm `È più bello che utile` is ordinary speech
    rather than a textbook example.
31. **`migliore` / `meglio`** (M9-S03, S04). Confirm natives keep them apart consistently in speech.
32. **`Si mangia meglio qui`** (M9-S04). Confirm the impersonal is the natural way to compare two
    places to eat.
33. **`rimanere` taking `essere`** (M10-S03). Confirm, and confirm the module's framing — that
    Italian counts staying as a change of state — is not misleading.
34. **`c'era molta gente`** (M10-S07). Confirm the singular holds in speech and that
    `c'erano molte persone` is the alternative rather than a correction.
35. **The accounts** (M10, all ten). Confirm each reads as something a person would say, and flag
    any that reads as a grammar exercise.
