# en-it L2 — the authoring-brief decisions (#430)

The ten en-it L2 briefs (`tools/course-briefs.ts`, `COURSE_BRIEFS['en-it']` L2-M1…L2-M10), pinned
against the REAL cumulative index — `public/content/en-it/index/L1-M10.json`, rebuilt and read on
2026-09-08: **263 surfaces, maxSpan 3**. The five L1 decisions carry unchanged: the elision
apostrophe stays inside a token, accents are letters, multi-token surfaces keep bare words free,
every homograph has a named owner.

## 1. `Lei` — the forms enter at M1, the pronoun does not

The L1 header promised `Lei` to L2 and #430 asked for "the capital-L spelling". The index refuses
it, checked against the real function rather than assumed:

```
normalizeSurface('Lei') === 'lei'      // rule 4 lowercases, no locale
```

and **`lei` is already L1-M10's key, meaning "she"**. First occurrence wins, so no L2 row can take
it back; a display `Lei` sends every polite sentence in the course to a note about the third person
feminine. This is en-de's `Sie`/`sie` catastrophe, in Italian. The same fold bars the polite object
clitics `La` and `Le`, which land on L1-M1's articles.

The answer is the idiomatic form, not a workaround: **the polite address is taught as a VERB
CHOICE and `Lei` appears in no L2 `display`.** Italian is pro-drop and the polite pronoun is
normally omitted — `Come sta?`, `Vuole un caffè?`, `Scusi, dov'è la stazione?` — so the rule the
course teaches is true: politeness rides the third-person verb. `Lei` is named in `usage` prose,
with its capital, exactly as en-ar names a dialect form.

Who speaks it: M4, M7 and M8 third-person throughout, chipped `formal`; M6 `tu`, chipped
`informal`; M1 shows the pair; M2, M3, M5 and M9 follow the scene. The paradigm is mostly already
the learner's (`è`, `vuole`, `ha`, `va`, `fa`, `prende`, `esce` are L1 rows), so M1's real spend is
`sta`, `può` and the frozen `potrebbe` / `potresti`.

## 2. The formal imperative is the congiuntivo — ship the words, defer the system

`Scusi`, `Senta`, `Giri`, `Prenda`, `Vada` are present subjunctive forms. The congiuntivo as a
system is L3-M3/M4's. They enter as **frozen politeness words**, with a note saying plainly that
L3 will show them again as a paradigm — the same move en-ar makes with `laysa`. The conditional
gets the same treatment: `vorrei` is L1-M3's frozen row and M1 adds `potrebbe`/`potresti`, nothing
more.

## 3. Clitics — `lo`, `li`, `mi`, `ti` only

`la`, `le`, `i`, `gli` are L1-M1's articles, so the identically-spelled object pronouns can never
be first-taught. `lo` and `li` are free; `mi` and `ti` are free because L1 indexed `mi chiamo`,
`mi piace`, `mi alzo`, `ti chiami`, `ti alzi` whole. M5 teaches the system on those four and
leaves `la`/`le` to L3. **en-es takes the same ruling for the same reason in the same level** —
the two Romance courses agree because the same tool made the same trap.

The Italian addition: a clitic ATTACHES to an infinitive as one word (`aiutarmi`, `lasciarlo`),
which the index sees as a single fresh key. M8 owns `aiutarmi` and says where the `mi` went.

## 4. What L2 withholds, and what M10 finally teaches

Out, named where it would be reached for: the **congiuntivo** as a system; the **conditional** as
a system; **`ne`** and combined clitics; the **passato remoto**; the **trapassato**; **`la`/`le`
as objects**; **reported speech** (L3-M5, named at M7).

M10 takes the decision L1 set up and could not: L1-M5 shipped the passato prossimo with both
auxiliaries and with participle agreement and never taught the choice against the **imperfetto**,
which opens here. The imperfetto paints the standing situation; the passato prossimo moves the
account one completed step. The slogan to kill is the one en-es's and en-ru's M10s kill in their
own languages — "one is for completed actions, the other for ongoing ones" — and the three courses
say it in the same words. The auxiliary law is stated at last: `essere` for movement, change of
state and reflexives, with the participle agreeing with the subject; `avere` for everything else,
with no agreement.

## Seams L2 adds

- `a destra` / `a sinistra` (M4) and `più tardi` (M7) ride whole, keeping `a` on L1-M5's row and
  `più` free for M9.
- `Mi dispiace` and `Grazie mille` (M1) ride whole, keeping bare `mi` free for M5.
- `l'autobus`, `dell'acqua`, `bell'`, `un'altra`, `d'accordo`, `trent'anni` are each ONE key with
  the elision inside it, answering for nothing else — so `autobus` and `bello` are authored
  separately and cross-referenced.
- `si` (M4, impersonal) and `ci` (M6) are bare keys L1 left free by indexing `si chiama`, `c'è` and
  `ci sono` whole.
- `che` (L1-M5) gains the comparative job at M9 and stays L1's row; `di` stays L1-M1's.
- `molto` (L1-M1) is re-taught at M3 for both its jobs and owned there.

## Bounds and shape

Bounds climb 8 → 10 (M1–M3: 8, M4–M7: 9, M8–M10: 10); pools to 12; M1–M3 fully enriched; M10's
items are four-sentence accounts. `npm run content:prompt -- en-it L2-M1` renders from the real
index, and the decisions are pinned by `tools/course-briefs.test.ts`
(`en-it L2: the decisions its briefs settle (#430)`).
