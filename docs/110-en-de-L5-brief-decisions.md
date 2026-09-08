# en-de L5 — the authoring-brief decisions (#570)

The ten en-de L5 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['en-de']` L5-M1…L5-M10) are the
LAST briefs this course will ever get. L5 is `Voice`, the top of the ladder, and nothing defers past
it: a deferral that lands nowhere here is a hole in the product, not a plan, and §6 names the two
that are.

Every seam below was pinned against the REAL cumulative index — the fold of
`public/content/en-de/index/L1-M1.json` through `L4-M10.json`, read through
`npm run content:owner` on 2026-09-08:
**945 surfaces, maxSpan 3, folded over 40 modules through L4-M10** (L1 closed at 203, L2 at 467,
L3 at 686, so L4 added 259). L4 authored and verified all ten of its modules while this wave was
running, so unlike the L4 wave — which planned against 686 surfaces and its own predictions of what
L4 would mint — this level is planned against a COMPLETE lower ladder with nothing predicted.

It inherits the review chain: `docs/46` (spoken German), `docs/59` (the L2 decisions and the seven
index rules), `docs/75` (L3), `docs/83`'s fifty open questions, `docs/92` (the L4 decisions) and
`docs/101` (the L4 review). Every INDEX SEAM claim in the briefs was checked with
`npm run content:owner -- en-de "<surface>"`, and where a check is about the fold rather than about
ownership it was run against `normalizeSurface` / `surfaceIndexKeys` themselves.

## 1. Register — L5 adds no address, and spends the two it has

`docs/59` §1 settled `Sie`, `docs/75` §1 settled `du`, `docs/92` §1 added the German spoken AT the
learner. L5 adds no third address and no fourth register. What it adds is the ability to CHOOSE
among the ones it has, which is what `Voice` means:

- **M2** puts the du line to a use it has not had: German teasing tracks it almost exactly, so the
  register choice becomes a safety question rather than a politeness one.
- **M4** is the level's formal pole and is a different formality from L4-M7's. M7 owns the counter,
  the announcement and the Amt; M4 owns the toast, the speech, the condolence and the signed letter.
  Neither may write a word of the other's.
- **M9** rehearses the switch on somebody else's content, and **M10** performs it on the learner's
  own, inside one eight-sentence piece. That is the same device L3-M10 and L4-M10 used — one story,
  two tellings — moved from BETWEEN items to INSIDE one.
- **The plural `ihr` is not available**, which constrains every module that would like to address a
  group. See §3.

## 2. What the lower levels withheld, and where it lands

`docs/92` §6 is the only place in this course that names L5 by module. All seven bullets are
honoured:

| Withheld by | The thing | Lands in |
| --- | --- | --- |
| docs/92 §6 | idiom and the figurative everyday | **M1** |
| docs/92 §6 | irony, teasing, saying the opposite of what you mean | **M2** |
| docs/92 §6 | regional and generational speech | **M3** |
| docs/92 §6 | toasts, speeches, condolences | **M4** |
| docs/92 §6 | a structured case with objections answered in order | **M6** |
| docs/92 §6 | implication and indirect requests | **M7** |
| docs/92 §6 | Konjunktiv I of a verb other than `sein` | **M6** (`könne`, one row) |
| docs/92 §6 | `zu` + infinitive beyond L3-M1's `um … zu` | **M5** (as spans — §3) |
| L4-M4 note 4 | the sustained case | **M6** |
| L4-M5 note 4 | irony; implication; regional particles | **M2**, **M7**, **M3** |
| L4-M9 note 3 | regional speech and what marks an outsider | **M3** |
| L4-M10 note 5 | irony, a story told against itself, a story retold in another register | **M2**, **M7**, **M9** |

The two grammatical deferrals in `docs/92` §6's last bullet were withheld with the reason "nothing
at L4 needs them", which is not the same as "L5 needs them". Both were re-tested rather than
assumed, and both are taken:

- **Konjunktiv I beyond `sei`** is taken by **M6**, because quoting the claim you are about to answer
  is the one job in the level that needs it. `content:owner` says `sei L4-M7` and `seien L4-M7`, so
  M6 opens no row for `sein`; `könne` is free and takes the level's single new row, with `müsse` and
  `wolle` named in its note and never written. Two Konjunktiv I rows in the whole product is the
  honest total for a mood a learner reads and does not produce.
- **The plain `zu` + infinitive** is taken by **M5**, because abstract talk cannot be done without
  it. How it is indexed is §3's hardest ruling.

## 3. Where instinct and the real index disagree

Twelve findings: a surface the briefs were about to call fresh that turned out to be owned, or owned
and UNREACHABLE. The four that changed a module's shape are first.

- **`verstehen` is FREE, and the course has never taught it.** First instinct: the verb for *to
  understand* is L1 or L2 vocabulary and M8 will point back at it.
  `npm run content:owner -- en-de "verstehen" "verstehe" "verstanden" "verstehst"` returns `free`
  four times, and `grep -r versteh content/en-de/modules/` matches nothing at all. The ladder reached
  the top of L4 without the verb. Only the past exists — `content:owner` says `verstand L4-M10`,
  minted for a narrative. This is the single largest find of the wave and it is a product hole, not
  an index curiosity. **M1 pays for it**, because M1 is the first L5 module that SHOWS the surface
  (`Ich verstehe nur Bahnhof`) and CLAUDE.md's law is that a new shape of an older lexeme gets its
  row in the module that first shows it, with a note back at the first-teach row. M8, which looks
  like the natural owner, inherits it instead and spends its cap on repair vocabulary.
- **`Würde` is L3-M4's, so no display in this course may say *dignity*.** First instinct: the abstract
  noun of M5 is fresh. `content:owner` says `würde L3-M4` and the fold lowercases (`docs/59`
  decision 2), so `Würde` and the all-purpose unreal auxiliary are ONE key. L3-M4's note is about an
  infinitive at the end of the clause, which is false of human dignity — the `का` bug again, and the
  exact shape of `docs/92`'s `Stimme` finding. M5 writes `Menschenwürde` (one token, checked free)
  or routes around.
- **`Glaube` is L1-M9's, so no display may say *faith* either.** `content:owner` says `Glaube L1-M9`,
  `glauben L1-M9`, `glaube L1-M9`. The row is the opinion verb of `Ich glaube, dass …`; the noun
  `der Glaube` folds straight onto it. M5 writes `Überzeugung` (free). Two unreachable abstract nouns
  in one module is why M5's seam note is the longest in the level.
- **`Lieber` is L2-M9's, so a masculine letter opening is unreachable.** `content:owner` says
  `lieber L2-M9` — the preference adverb, the row that says German has no verb for *prefer*. So
  `Lieber Thomas` resolves a learner's tap to a note about preferring things. `Liebe` is a DIFFERENT
  key and is free (checked), so M4 and M10 open letters with `Liebe Gäste` / `Liebe Anna` or with
  `Sehr geehrte`, and `Lieber` is named in `usage` and never written.

And eight more, each of which cost a row or saved one:

- **`ihr` is L1-M2's, so the plural *you* cannot be taught.** The row is the possessive `Ihr` of
  `Ihr Name`, whose note already ends by saying that `ihr` meaning *her/their* is not taught there. A
  third reading cannot have a row, a rival row would be a fourth `FORCED_DUPLICATES` entry
  (`src/course/types.test.ts` calls that "a real defect"), and this level may not edit L1-M2. Every
  L5 module addresses `du` or `Sie`; M3 names the plural in `usage` and M10 may not author a piece
  addressed to a group.
- **`ernst` and `Ernst` are one key (M2).** Checked against the real function:
  `normalizeSurface('Ernst') === normalizeSurface('ernst') === 'ernst'`. The adjective of
  `nicht ernst gemeint` and the noun of `im Ernst` cannot both hold a row. Ruling: the row is the
  lowercase adjective, its note covers both readings, and `im Ernst` is taken as a SPAN — free,
  checked, and it claims neither part.
- **`lachen` is a new shape, not a fresh lexeme (M2).** `content:owner` says `lachte L4-M10` — the
  Präteritum shipped one level below, and its note already carries the `über` + accusative rule. So
  M2's `lachen` row exists, points back, and must not repeat that rule.
- **`erzählen` and `Geschichte` are L3-M5's (M9).** First instinct: the module that is ABOUT
  retelling mints the verb for retelling. `content:owner` says `erzählen L3-M5`, `erzählt L3-M5`,
  `Geschichte L3-M5` — Wave 3 minted all three for reported speech. M9 opens none of them.
- **`Wohl` is L3-M6's (M4).** The comfortable `wohl` of `Ich fühle mich wohl`. `Zum Wohl` is
  therefore a span, on the device `docs/92` gave L4-M5's hedges.
- **`Bitte` as a noun is unreachable (M7).** `content:owner` says `Bitte L1-M8` — the *please* of a
  request plus the *you're welcome* reply. M7 uses L4-M7's `bitten` where it needs a verb.
- **`Tschüss` is FREE, which nobody expected.** It looked certain to be L1-M2's. `content:owner` says
  `Tschüss free`, and the only occurrence in the whole course is L2-M7's `mistake.display`
  (`Vielen Dank, tschüss`), which the shown-surface ratchet exempts. M3 opens the row. See §7 for the
  part of that finding which is a hole.

- **A PERSON FORM is not covered by its lemma's row unless the row lists it.** The wave ran every
  concrete word in its own `patterns` through `content:owner` as a last pass, and two frames failed:
  `content:owner` says `drücken L4-M1` but **`drücke` free**, and `meinen L2-M8` but **`meinst`
  free**. Forms ARE indexed and owned — that is how `schon` rides in L2-M2's `noch` row — but only
  the forms a row actually lists. So M1 opens `drücke` as a new shape with a note back at L4-M1, and
  M2's disbelief line was rewritten from `Das meinst du doch nicht im Ernst?` to
  `Das ist doch nicht dein Ernst?`, every token of which resolves. **Checking the brief's own example
  sentences, not only its fresh-key list, is what caught both**; a pattern is a display in waiting.

Two seams the briefs got RIGHT and that are worth recording because they are cheap:

- **`Wörter` and `Wort` are two keys**, because the fold keeps the umlaut. So the plural is reachable
  where `Antworten`/`antworten` was not. M8 still does not open it: L4-M10's `Wort` note already
  names `Worte` against `Wörter`, so M8 writes `Wort` or `Wörterbuch` and re-teaches nothing.
- **`Freiheit` is fresh while `frei` is L2-M6's**; **`Feier` is fresh while `feiern` is L3-M9's**;
  **`langsamer` is fresh while `langsam` is L4-M1's**. Three separate keys apiece, each row pointing
  back at the other.

## 4. The two level-wide laws this wave adds

- **THE SPAN CEILING IS THREE TOKENS, level-wide.** `maxSpan` is a single course-wide number computed
  by `maxSpanOf` from the longest indexed key, and the runtime resolver widens its matching window to
  it for EVERY module. The current value is 3. A four-token span anywhere in L5 would re-widen that
  window over all forty shipped modules, so `Ich verstehe nur Bahnhof`, `Übung macht den Meister`,
  `Das war ja klar` and `Wie meinen Sie das` are written as SENTENCES with their content words
  indexed singly, never as one key. `es sei denn`, `Es war einmal`, `zwischen den Zeilen`,
  `Mit freundlichen Grüßen`, `so etwas wie` and `Sinn des Lebens` sit exactly on the ceiling and are
  the level's longest keys. This is a checkable law, not a style preference: a brief that asks for a
  four-token span asks for a change to how the whole product resolves text.
- **THE SPAN IS THE LEVEL'S PRIMARY INSTRUMENT, because L5's vocabulary is other modules' words.**
  `surfaceIndexKeys` splits hyphens and never whitespace (re-checked), so a multi-token surface
  donates no token. That is the only reason M1 can teach idioms whose every noun is owned, M4 can
  teach `Zum Wohl` over L3-M6's `wohl`, M5 can teach the `zu`-infinitive over L1-M8's `zu`, M7 can
  teach `wohl kaum` over two owned particles, and M8 can teach `Ich meine` over L2-M2's possessive
  `meine`. It is the same tool `docs/92` §4 gave L4-M5, used four levels' worth harder.
  - The corollary is the hyphen, and it is checked: `surfaceIndexKeys('Hals- und Beinbruch')` returns
    `["Hals- und Beinbruch", "Hals"]`, so the officialese ellipsis hyphen does not merely make an
    awkward key, it CLAIMS `Hals`, which is L3-M7's. `docs/92`'s ban stands and now has a second
    reason. Same check, same result, for `E-Mail`, whose parts `e` and `mail` are two junk keys: M3
    writes `Nachricht` (L2-M7's) or `Mail`.

## 5. The shape of the level

**Bounds do not climb. They range 11 → 14, and 14 is L4's ceiling held rather than raised.** This is
the first level in the course whose bounds go DOWN in places, and the reason is the level's own
subject: voice is partly the ability to be short, and a bound that rises every level teaches the
opposite. The per-module choices:

| Module | max | Why |
| --- | --- | --- |
| M1 Sayings and idioms | **11** | A saying that needs twelve words is not a saying. Below L3's ceiling on purpose. |
| M2 Humour and teasing | **12** | A joke with a long run-up is not one; the repair that follows it is shorter still. |
| M3 How they say it there | **11** | The module is one word swapped into a frame the learner already owns. |
| M4 Formal occasions | **14** | A ceremonial sentence is a single long formulaic clause (`Ich möchte im Namen aller Gäste ein paar Worte sagen`). L4's ceiling, not above it. |
| M5 Big questions | **14** | The `zu`-infinitive puts a third element at the end of the clause, exactly the L4 argument for 14. |
| M6 Arguing a position | **14** | A signposted claim with a `dass` clause under it costs fourteen. |
| M7 Between the lines | **12** | A hint that needs fourteen words has stopped hinting. |
| M8 When words run out | **12** | A repair turn is short by definition, and a learner in trouble cannot produce fourteen words. |
| M9 Telling it your way | **14** | Narrative, as at L4-M8 and L4-M10. |
| M10 Your own voice | **14** | Applied INSIDE the eight-sentence piece, as at L3-M10 and L4-M10. |

`newWordCap` is **25 in every one of the ten briefs, and it cannot be anything else**:
`tools/course-briefs.test.ts` line 64 asserts `brief.newWordCap === NEW_WORD_CAP` for every brief in
every course, so a lower number in the FIELD fails TEST rather than tightening a module. That is why
`docs/92` §5 records L4-M10 as "capped at 14" while `COURSE_BRIEFS['en-de']['L4-M10'].newWordCap` is
25: the argument lives in a NOTE and the field carries the constant. **L5-M10 follows that precedent
exactly** — its first note argues the number down to **12 as a target** and the field stays 25.

The arithmetic behind the 12 is `docs/83`'s, unchanged: `deconstruction.words` has `minItems: 1` and
en-de asserts one row per surface, so ten items need TEN fresh keys whatever the ambition, and
"ideally zero" is not reachable. Twelve is the floor plus two. It is tighter than L4-M10's 14 because
L4-M10 had to buy four dialogue verbs while this module has forty-nine modules of vocabulary behind
it and every register marker its own patterns need is already owned (`So` L2-M9, `jetzt` L3-M4,
`ehrlich gesagt` L4-M5). This is the last rung of the last level, so a key it leaves unpaid is unpaid
forever — which is the one argument for aiming at 12 that a target can make and a field could not.

Module by module — what it owns, and why it sits there:

- **M1 Sayings and idioms.** Owns the FIXED EXPRESSION as an indivisible unit, the metalanguage for
  it (`Sprichwort`, `Redewendung`, `wörtlich`), and — the wave's find — `verstehen`. It sits first
  because it is the first module in the course where a German sentence stops meaning the sum of its
  words, and everything above it assumes that lesson.
- **M2 Humour and teasing.** Owns the MARKED joke and its withdrawal: `Witz`, `Scherz`, `Spaß`,
  `lachen`, `ernst`, and the repair spans. It sits second because it is M1's twin — a figurative
  reading that is public and conventional, next to one that is private and situational — and because
  M7 needs the contrast standing behind it.
- **M3 How they say it there.** Owns REGIONAL LEXICAL SUBSTITUTION: one slot changed in a frame the
  learner owns. It sits third because it is recognition-shaped and cheap, and because M4's and M9's
  register work assumes the learner knows that "neutral German" has a location.
- **M4 Formal occasions.** Owns the CEREMONIAL FORMULA INVENTORY — toast, speech opening, condolence,
  signed letter. It sits fourth, at the level's formal pole, opposite M2 and M3, and it is where the
  `Lieber` ruling is stated for M10 to inherit.
- **M5 Big questions.** Owns the ABSTRACT NOUN and the plain `zu`-INFINITIVE. It sits fifth because
  M6 argues about the things M5 names, and because the `zu`-infinitive is the clause type both need.
- **M6 Arguing a position.** Owns DISCOURSE SCAFFOLDING (`erstens`/`zweitens`/`drittens`, `folglich`,
  `somit`, `allerdings`, `jedoch`), the objection move, and Konjunktiv I on `könne`. It sits sixth
  because it is L4-M4 one rung up and must have M5's nouns beneath it.
- **M7 Between the lines.** Owns IMPLICATURE — the indirect request and the sarcastic remark, built
  from L3-M4's Konjunktiv II frames and L4-M5's particles without opening a verb row. It sits seventh
  because every device it leans on is now behind it.
- **M8 When words run out.** Owns PARAPHRASE and REPAIR. It sits eighth, before the two long-form
  modules rather than after them, because it is what makes every other module survivable in the
  street.
- **M9 Telling it your way.** Owns NARRATIVE REGISTER as four dials moving together — tense, density,
  discourse words, opening. It sits ninth as M10's dress rehearsal, on somebody else's content.
- **M10 Your own voice.** Owns exactly one thing: the REGISTER SWITCH INSIDE ONE PIECE. No new
  grammar at all, eight sentences, the per-sentence bound applying inside the item, and a cap of 12.

## 6. What L5 defers — and the two deferrals that land nowhere

This is the last level. Everything below either lands or is named as a hole.

**Deliberately out of the product, and that is a decision rather than an omission:**

- **Vulgar and obscene registers.** German banter uses them; the course does not carry them, and M2's
  note says so out loud rather than leaving an author to find the line by being told off.
- **Dialect GRAMMAR.** M3 teaches lexical substitution and names the southern Perfekt preference that
  L4-M8 already put in `usage`. No display writes a dialect verb form, case or article, and no
  display is respelled phonetically.
- **Real political controversy.** M6 teaches the SHAPE of a case; a case about Saturday opening hours
  teaches it as well as a sharper one would.
- **`müsse` and `wolle`.** Named in M6's `könne` note, never written — the `gekonnt`/`gemusst`
  precedent from `docs/92` §4, where a free key is deliberately left unspent.

**And two holes, named as holes because there is nowhere left to pass them to:**

- **The plural `ihr` is untaught and unteachable in this course.** A learner who finishes en-de
  cannot address a group. The cause is an index collision with L1-M2's possessive `Ihr` that only a
  change to a shipped L1 module could fix, and a level never edits a file below it. Every L5 module
  routes around it; that is containment, not a fix. It goes to the native gate as **Q75**, and if the
  answer is that the gap is unacceptable it is an L1 re-authoring issue, not an L5 one.
- **L2-M7 shows `tschüss` where nothing teaches it, and L5 cannot help.** M3 opens the `Tschüss`
   row, but `checkShownSurfaces` resolves each module against the index cumulative AT that module, so
   L2-M7 is two levels below the fix and the en-de shown-surface baseline of 11 does not move. (The
   occurrence is in `mistake.display`, which #491 exempts, so the baseline is not actually charged
   for it — the hole is that a learner meets the word in a mistake plate two levels before the course
   teaches it, and no L5 module can change that.)

For the record, the en-de shown-surface findings were re-derived while checking this: 20 findings
over 11 distinct surfaces — `thomas`, `sie`, `guten`, `morgen`, `abend`, `meyer`, `geht`, `es`,
`arbeit`, `bücher`, `brote` — in L1-M1, L1-M2, L1-M7, L1-M8 and L2-M7. The baseline of 11 in
`tools/shown-surfaces.test.ts` is that count, no L5 module may raise it, and no L5 module can lower
it either, because every finding is in L1 or L2.

## 7. Three debts that stay standing

- **The native-speaker gate is unmet, and this is the last level, so the gate is now the only thing
  between the ladder and a native reader.** `docs/83` ended at 50 and `docs/92` at 70; this doc
  continues at 71 and renumbers nothing. Several earlier questions bear directly on L5: Q50's
  `Eigentlich` as an opener is a word M7 may not re-teach, Q60's ruling on which particles may be
  written governs M2 and M7 completely, and Q66's southern Perfekt is the practice M3 and M9 both
  point back at.
- **A level never edits a file below it.** Every §3 ruling is a `rules` entry, a span or a pointer.
  The two unreachable abstract nouns of M5 and the unreachable `Lieber` of M4 are routed around,
  never corrected.
- **`FORCED_DUPLICATES` still has exactly three entries** — `nicht`, `dienstag`, `in`. Four separate
  rulings in this level (`Würde`, `Glaube`, `Lieber`, `ihr`) were each one step from adding a fourth,
  and each was refused. If a native reviewer decides one of them must be taught, the correct
  resolution is a change to the module that owns the key, not an exemption here.

## Open questions for the native pass

Continuing this course's chain; `docs/83` ended at 50, `docs/92` at 70, and nothing there is
renumbered.

71. **Which four idioms actually earn the rows** (M1). The brief proposes `die Nase voll haben`,
    `jemandem die Daumen drücken`, `Schwein gehabt`, `nur Bahnhof (verstehen)`, `unter vier Augen`,
    `über den Berg sein`, `das Eis brechen`, `den Faden verlieren`. Confirm each is current rather
    than dated, name any that reads as a textbook idiom nobody says, and say which four a learner
    meets first.
72. **`Ich verstehe nur Bahnhof` as the module's anchor** (M1). It is the sentence that pays for
    `verstehen` (§3). Confirm it is ordinary spoken German and not a phrase-book curiosity, and that
    a speaker would not more naturally say `Ich verstehe kein Wort`.
73. **The teasing/`du` correlation** (M2). The brief's claim is that German teasing tracks the `du`
    line almost exactly — where you would say `Sie`, you do not tease. Confirm, and name the everyday
    exception (colleagues on `Sie`, a shopkeeper you have known for years).
74. **`Das meinst du doch nicht im Ernst?`** (M2). Confirm this is the ordinary way to check whether a
    remark was serious, that `im Ernst` and not `ernsthaft` is what a speaker reaches for, and that
    the `doch` in it is the softening `doch` `docs/92` §4 forbade M5 to write — in which case M2 may
    not write it either and the frame loses a word.
75. **The plural `ihr`, which this course cannot teach** (§6 hole 1). Say plainly whether a learner
    who finishes en-de without ever being able to address a group has an unacceptable gap. If yes,
    this becomes an L1-M2 re-authoring issue and not an L5 one; if no, say what the learner should be
    told instead.
76. **`Grüß Gott` is neutral, not informal** (M3). The brief's claim is that it is the ordinary all-day
    greeting to a stranger in Bavaria and Austria, and that `Guten Tag` is the MARKED choice there.
    Confirm, and say whether a foreigner using `Grüß Gott` reads as at home or as trying too hard.
77. **Which generational markers are safe to ship** (M3). The brief proposes `krass` and `echt` and
    deliberately avoids anything newer. Confirm both have enough decades behind them not to date the
    course, and name one more that is safe.
78. **`Semmel` / `Brötchen` / `Sackerl` / `Tüte`** (M3). Confirm these are the substitutions a learner
    actually trips over, and name the one everyday item whose regional split matters more.
79. **The German toast sequence** (M4). The brief teaches that the glass is raised, eye contact is
    made, and nobody drinks before `Prost` or `Zum Wohl`. Confirm the sequence, and confirm the split
    between the two words — whether `Zum Wohl` really is the more formal of the pair or whether that
    is a textbook distinction.
80. **Written condolence** (M4). The brief's claim is that German condolence stays formal and short,
    that warmth is carried by `herzlich` rather than by extra sentences, and that a translated English
    card reads as gushing. Confirm, and give the one sentence a learner should have by heart.
81. **`Liebe Gäste` in place of `Lieber`** (M4, §3). The index forbids the masculine opening. Confirm
    `Liebe Gäste` and `Liebe Anna` are natural, and say what a learner should write to one man —
    given that `Lieber Thomas` may not appear in any display.
82. **`Überzeugung` for belief, and how heavy `glauben` really is** (M5, §3). The brief's claim is
    that `Ich glaube` leans religious in a way English *I believe* does not, so the ordinary abstract
    hedge is `Ich finde` or `Ich bin überzeugt`. Confirm, and say whether `der Glaube` being
    unwritable costs the module anything a native reader would notice.
83. **`Menschenwürde` standing in for `Würde`** (M5, §3). The index forbids the bare noun. Confirm
    `Menschenwürde` is ordinary in ordinary talk about values and not only in constitutional prose,
    and name what a speaker would say instead if it is not.
84. **The `zu`-infinitive taught as per-verb spans** (M5, §4). `zu sein`, `zu sagen`, `zu verstehen`,
    `zu tun`. The index forces this — a bare `zu` resolves to L1-M8's *too*. Say whether a learner
    tapping `zu sagen` and getting one note for the pair is well served, or whether the rule needs to
    be visible as a rule about `zu` alone.
85. **`nämlich` against `folglich` and `somit`** (M6). `docs/92` gave `nämlich` to L4-M4 and this
    module may not re-teach it. Confirm `folglich` and `somit` are what a speaker uses for a
    consequence in ordinary argument rather than only in writing, and name the spoken alternative if
    there is one.
86. **`Man könnte einwenden, dass …`** (M6). Confirm this is how a German speaker raises an objection
    against themselves, and that it is not too written for a conversation at this level.
87. **`könne` as the level's one new Konjunktiv I row** (M6, §2). `Er behauptet, er könne nicht
    kommen`. Confirm the form and confirm a learner who has `sei` (L4-M7) and `könne` and nothing else
    can read an ordinary reported claim.
88. **`Es zieht` as an indirect request** (M7). Confirm the bare statement of a problem really does
    function as *please shut the window*, and that a German speaker would act on it rather than agree
    with it.
89. **The directness calibration** (M7). The brief's rule of thumb is that a German request for an
    object is usually direct while a German complaint about a person usually is not. Confirm or
    replace it — it is the single sentence in the level most likely to be a memorable falsehood.
90. **`Na super` as sarcasm** (M7). Confirm it is current, that it is unambiguous in context, and
    that writing it in a display without an audio track is teachable at all.
91. **`Wie heißt das auf Deutsch?` against `Was heißt … auf Deutsch?`** (M8). Confirm which a learner
    should have first, and confirm `auf` and not `in`.
92. **`Wie bitte?`** (M8). Confirm it is the ordinary repair signal, that it is not curt, and that it
    is preferable to `Entschuldigung?` or `Was?` for a learner talking to a stranger.
93. **`Ich meine …` as the reformulation opener** (M8, §3). It is indexed as a span because `meine` is
    L2-M2's possessive. Confirm `Ich meine nicht X, sondern Y` is how a speaker corrects themselves,
    and that `sondern` (L4-M6's) is right there rather than `aber`.
94. **The four register dials** (M9). Tense, density, discourse words, opening. Confirm that a
    fairy tale told in the Perfekt really does sound like somebody recounting their weekend, and that
    moving one dial alone reads as an error rather than as a register.
95. **`Es war einmal` and its spoken twin** (M9). The brief pairs it with `Also, da war mal …`.
    Confirm the spoken opening, or give the one a speaker actually uses.
96. **The register pivot inside one piece** (M10). Confirm that a German speaker really does switch
    address or tense mid-piece in the situations the brief proposes — a formal complaint that turns
    exasperated, a speech that drops into confidence — and that the switch reads as voice rather than
    as a mistake. If it reads as a mistake, M10's whole format is wrong and the level ends on
    something else.
97. **Where the ladder ends** (whole level). Read the ten L5 jobs against each other and say what a
    learner who completes them can and cannot do. This is the last question the course will ask
    before the gate, and the useful answer is the list of things `Voice` does not deliver.
