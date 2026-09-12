# en-la L4 — the brief decisions (#646)

**Date:** 2026-09-12 · **Course:** en-la — English (L1) → Latin (L2) · **Level:** 4 "Nuance — say it
the way they do" · **Status:** briefs written, no content authored. The ten `ModuleBrief`s live in
`tools/course-briefs.ts` under `COURSE_BRIEFS['en-la']`, and the course-wide reasoning is in that
file's header section, "## en-la L4: the decisions, taken against the finished L3 (#646)".

This file records the six decisions a reader would otherwise reconstruct from sixty notes, the two
runs that settled two of them against the real code, and the one number every brief was planned
against.

---

## 0. The index the level was planned against

**479 surfaces through L3-M10, `maxSpan` 1**, folded across all thirty emitted files. From #424 each
index file's `surfaces` holds only what that module is the first to teach while `surfaceCount` stays
cumulative, so `L3-M10.json` reports 479 over a delta of six keys. Stated as arithmetic:

```
L1:  24 + 20 + 18 + 24 + 11 + 16 + 16 + 24 + 21 + 15 = 189
L2:   9 + 17 + 23 + 12 + 11 + 14 + 13 + 14 + 20 +  8 = 141
L3:  14 + 20 + 13 + 20 + 12 + 12 + 20 + 17 + 15 +  6 = 149
                                              total  = 479
```

Confirmed live: `npm run content:prompt -- en-la L4-M1` reports
`PROMPT .prompts/en-la-L4-M1.md ok (479 surfaces through L3-M10)`.

---

## 1. Four promissory notes come due in this level

L4 is where everything this course has deferred arrives, and every one of them was tracked in a review
doc rather than remembered:

- **The gerund and the gerundive → M1.** L3-M2 wrote `ad labōrem eō` ("I go to work", with work as a
  place) and named the gerund as deferred in a rule.
- **The passive → M7.** L2-M8's `frāctus est` and L3-M6's `sollicitus sum` were both taught as
  ADJECTIVES with `sum`, both said so out loud, and both pointed here.
- **The imperfect → M8.** L1-M5 settled that the past was the perfect and only the perfect, and named
  `legēbam`, `habēbam` and `eram` as keys to hold open. **Thirty-one modules later they are still
  free**, confirmed in `docs/126` §6, `docs/128` §3.2 and `docs/130` §3.2.
- **The locative → M9.** L2-M4 named `domī` as deferred; L3-M7 wanted it again for
  `melius est … manēre` and wrote `domum īre` instead.

No level in this course has had to honour four at once, and the only reason it is affordable is that
L4's vocabulary is almost entirely L1–L3's.

---

## 2. The past counterfactual is written in full, and this is where en-la diverges from en-sa

`sī vēnissēs, vīdissēs` — "if you had come, you would have seen", the **pluperfect subjunctive in both
halves**. en-sa reached its equivalent module with no such form in the language and had to teach an
honest workaround. **Latin has the form**, and refusing it would be a simplification with nothing
behind it — so M3 writes it as a system rather than as a fixed pair.

The cost is **two new subjunctive tenses in one module**: the pluperfect for the past unreal and the
**imperfect subjunctive** (`venīrem`, `gaudērem`) for the present unreal. That is the largest
grammatical spend anywhere in this course, and the brief pays it deliberately because L3-M4 opened the
present subjunctive only and said this module would need the rest.

### 2.1 The one-letter trap the level creates for itself

`venīrem` is a **mood** and `venīēbam` is a **tense**. M3 opens the first and M8 the second, four
modules apart, and in some verbs the two are close enough to confuse. So **each module disowns the
other's shape in its own notes**: M3 says the indicative imperfect is M8's and must not appear, M8 says
the mood is M3's and must not. A learner meeting both inside one level needs each module to point at
the other, and a brief is the only place that can be arranged.

---

## 3. An abbreviation is a display, and the undotted form is the only one written

#646 asked whether an abbreviation is a display at all, and told us to decide and record the run. Run
against the real `src/engine/surface.ts`:

```
normalizeSurface('SPQR')     -> 'spqr'      surfaceIndexKeys -> ['SPQR']
normalizeSurface('S.P.Q.R.') -> 's.p.q.r'   surfaceIndexKeys -> ['S.P.Q.R.']
normalizeSurface('D.M.')     -> 'd.m'       surfaceIndexKeys -> ['D.M.']
```

**Rule 3 strips a trailing dot and keeps the interior ones.** So an abbreviation *is* a perfectly good
display — it indexes as one key, `surfaceIndexKeys` splits nothing because there is no hyphen — but the
dotted and undotted spellings are **two different keys for one thing**.

**The decision:** M7 writes the **undotted form only** (`SPQR`), one row, one key, with the expansion
in the note. `D.M.` and every other dotted abbreviation is named in prose and written nowhere. The
alternative — writing both — would put two rows in the index for one inscription and give a learner
tapping one of them a note about the other.

---

## 4. `cum` gets its second reading, and the remedy is different from L3's

L1-M7 owns the key `cum` for "with" plus the ablative (`cum magistrō`). M6 needs `cum` plus a
**subjunctive** for "when" (`cum vēnisset, gaudēbam`). Same four letters, same key, two grammars, and
**first occurrence wins** — the index will hand a learner L1-M7's note whichever one they tap.

L3's remedy for `quod`, `quam` and `ut` was to write one reading and name the other in prose. **That
is not available here**, because a time clause is the module's job. So M6's instruction is explicit:
**every `cum` sentence in that module carries a word row of its own whose note names both readings and
says which is which.** The note is the only place the distinction can live, and the brief says so
rather than leaving an author to discover it.

`dōnec` takes the **indicative only** — the subjunctive after it means "until such time as" — which is
the fourth homograph handled the L3 way.

---

## 5. Place constructions are a closed list, and the plate is fenced on both sides

`Rōmam eō`, `Rōmā veniō`, `Rōmae sum` — three shapes and no prepositions, for city names and for
`domus`. **Nothing else in the language does this.** Everything else needs `ad`, `ab` or `in`.

So M9 writes **two** mistake plates rather than one:

- `ad Rōmam eō` — the error thirty modules of `ad scholam` produce.
- `scholam eō` — the error over-generalising this module produces.

A rule with a closed list has to be fenced on both sides, and this is the clearest instance of that
anywhere in the course.

`Rōmae` is **also a genitive**: the locative of a first-declension city name is identical to its
genitive singular. That is the same collision L2-M2 named for `magistrī` and L3-M8 for `librī` — no
mark, no gate, and the note names it. The simpler course, which the brief recommends, is to write only
the locative reading and say the other exists.

---

## 6. `inquit` is postpositive, and quotation marks are the one new character question

M10 quotes direct speech, which is the opposite of L3-M5's reported speech, and the module should carry
one sentence of each so a learner can see the contrast.

`inquit` means "he says" and "he said" — the same shape for both, like M6's `solvit` — and it goes
**after the first word or two of the quotation**, never before it: `"Venī", inquit, "domum"`. English
puts "he said" outside the line and Latin puts it inside. An author who writes `inquit` first has
produced something no Roman wrote, and this is the module's one hard fact.

Quotation marks are the first non-Latin character this course has had to admit into a `display`. Rule 3
strips punctuation from a token **edge** (but never an apostrophe), so a quoted word should normalize
cleanly — the brief's instruction is to write the quotation with ordinary double quotes and then
**read the emitted index back** for any key that has kept one, rather than trusting the rule.

---

## 7. What L4 withholds, and where each piece lands

- **The ablative absolute** — M2 wants it for "given that" and M4 for a concession. **L5.**
- **The indirect question** proper — M5's `haud sciō an` only looks like one. **L5.**
- **The passive in any person but the third**, and the perfect passive as a tense — M7 opens the
  impersonal third person and L2-M8's adjective arrangement stands for everything else.
- **The pluperfect indicative**, and the **future perfect** — no module needs either.
- **`quod`** as a second "because" or as a relative, still; **`quamvīs`** and **`quārē`**, whose keys
  would carry readings `licet` and `quia` already cover.
- **`rūs`/`rūrī`** and the **supine** — M9's closed list is closed at cities and home.
- **`vōs`**, which L2-M1 banned course-wide. M7 is the natural place to smuggle it back as officialese
  and its note forbids it.

---

## 8. Open questions this level inherits and adds

Standing: the seventy in `docs/123` §11, `docs/124` §6, `docs/125` §5, `docs/126` §6, `docs/127` §6,
`docs/128` §1.7, §2.7, §3.7, `docs/129` §7 and `docs/130` §1.7, §2.8 and §3.8 — all still unanswered,
because the gate is a fluent speaker of living Latin and that reader has not seen the course. Added by
these briefs:

1. **Is writing two new subjunctive tenses in one module right**, or should the present unreal go to
   M5 with the potential subjunctive and leave M3 the past alone? §2 argues one module, because the
   two conditions are a contrast and a contrast wants one place.
2. **Is `haud sciō an` teachable at all?** It means the opposite of what it looks like, and a learner
   who half-remembers it will say the reverse of what they mean — which is worse than not knowing it.
3. **Should M7 write an inscription at all?** `SPQR` and `cavē canem` are the most recognisable Latin
   in the world and neither is something a learner will produce. The alternative is a module of plain
   passives with no epigraphy in it.
4. **Is `sōlēbam` a crutch?** M8 teaches it beside the imperfect because it is the shape an English
   speaker reaches for, and a teacher may say the plain imperfect should carry the whole job.
5. **Is `nunc` really absent for thirty-one modules by design or by accident?** The present tense
   carried it, which is defensible, and a learner describing today has wanted the word since L1-M4.
6. **Does `ideō … quia` survive in living Latin**, or is it a textbook frame? M2 teaches it as the
   thing that makes a long causal sentence hold together.
