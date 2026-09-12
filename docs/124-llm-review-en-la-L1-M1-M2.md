# en-la L1-M1…M2 — the LLM review (#634)

**Date:** 2026-09-12 · **Course:** en-la — English (L1) → Latin (L2), the eleventh course ·
**Modules:** L1-M1 "Who I am", L1-M2 "First exchange" · **Wave:** the first · **Bar:** LLM review,
authorised by the repo owner. **The fluent-speaker gate is a separate, stricter bar and it is
unmet** — §6 carries its numbered questions.

Authored against the en-la L1 briefs (#633) and the orthography settled in
`docs/123-en-la-orthography-decisions.md` (#630). Signature on both files:
`verifiedBy: "Claude Opus 5 — LLM review, authorised by repo owner"`, `verifiedAt: 2026-09-12`.

---

## 1. What was checked, and with what

- **`npm run content:validate`** → `en-la/L1-M1.json ok`, `en-la/L1-M2.json ok`, `CONTENT 462/462 ok`.
- **The dev build**, which is the only gate that sees this course while the row carries
  `fixture: true`: `en-la: 2 modules (L1-M1..M2)`, `index L1-M1: 24 surfaces`,
  `index L1-M2: 44 surfaces`, and **no `shown but untaught` line at all** — the ratchet opens at
  zero, which is the bar en-sa set (#608) and the one every course authored under #491 has to meet.
- **The emitted index, read back** rather than reasoned about: §2 and §3 quote it.
- **`src/course/types.test.ts`**'s en-la block (#632), which is this course's substitute for the
  build gate it does not get: no `j`, no apostrophe, no acute in either composition, NFC, the ten
  macron vowels and nothing else above ASCII, a hyphen only before `que`/`ne`/`ve`, no `script`
  line. Green on both modules.
- **`scripts/verify.sh --fast`** → `TEST 887/888`. The one failure is pre-existing on a clean tree
  in this container: `scripts/generate-splash.test.ts` compares committed PNG bytes against what
  this machine's `sharp`/libvips regenerates. No committed binary was regenerated to silence it.

There is no `checkScriptMode` line to quote, and that absence is the point: it returns an empty
report for anything but a `romanized` row, so **nothing in the build looked at en-la's spelling.**
What did the looking is the list above.

---

## 2. The enclitic seam came out BETTER than en-ko's, and that is a result rather than a wash

#630 §2.1 predicted the shape of the risk from en-ko's shipped index: there, the key `neun` belongs
to the HOST row at word 0 and not to the `-neun` row at word 1, because the host's `forms` carried
the joined form and donated the part key one word earlier. That is #601 — "16 findings that are
decided policy, not defects" — and en-la was expected to inherit it.

It did not, and the reason is a choice this wave made deliberately: **the joined forms live in the
PARTICLE's row, not in the host's, and every host is opened in an earlier sentence.** From the
emitted `public/content/en-la/index/L1-M2.json`:

| Key | Owner |
|---|---|
| `agis`, `agō`, `agit` | `L1-M2-S02` word 1 — the `agis` row |
| `valē`, `valēte`, `valeō`, `valēs` | `L1-M2-S04` word 1 — the `valeō` row |
| `tū` | `L1-M2-S05` word 0 — the `tū` row |
| `ne` | `L1-M2-S06` word 0 — **the `-ne` row** |
| `agis-ne`, `valēs-ne`, `tū-ne` | `L1-M2-S06` word 0 — **the `-ne` row** |

So every bare host answers for itself, and the particle keeps a key of its own as well. A learner
tapping `agis` in a later module gets the verb; a learner tapping `agis-ne` gets the particle, which
is the interesting half of that token.

**What made it work was sentence order, and it is fragile.** `surfaceIndexKeys('agis-ne')` is
`['agis-ne', 'agis', 'ne']`, so the `-ne` row donates `agis`, `valēs` and `tū` as part keys the
moment it is indexed. Each of those survives only because its own row is indexed first — S02, S04
and S05 all sit above S06. **A later module that writes a new `X-ne` must open `X` in an earlier
sentence, or the seam takes it.** That is now a standing rule for the course and it is written into
§5's carry-forward list.

---

## 3. The macron pairs, read back from the index

#630 §1.1 named nine collisions the macron removes, and the ones that fall inside L1 were read back
rather than assumed. From `index/L1-M1.json` (24 surfaces) and `index/L1-M2.json` (44):

- `est` is owned (`L1-M1-S01` word 1, the `sum` row); **`ēst` is absent** — free for L2-M5, which
  #638 assigned it.
- `liber` and `librī` are both owned by the same row and neither is the other's key.
- `venit`/`vēnit`, `rosa`/`rosā`, `hic`/`hīc` are **all absent**, which is what M4, M5 and M7 need:
  the pair that proves the macron is load-bearing has to be written by the modules that teach the
  two tenses, not squatted on by M1.
- `nōn` (M2-S08) and `nē` are not in collision: `nē` is absent, as #630 §2.2 requires, and L3-M4
  will open it.
- `Mārcus` and `Mārcō` are one row, so the dative of a name resolves to the name.

The ratchet's zero is the other half of this: both names in the course, `Mārcus` and `Iūlia`, carry
word rows of their own. A name riding unindexed is COUNTED by `tools/shown-surfaces.test.ts` (#491,
and the CLAUDE.md line that misled three earlier waves), so giving them rows is what keeps the
baseline off the floor the older courses sit on.

---

## 4. Corrections made during the wave

1. **`tools/content-build.test.ts`'s dev/strict equality case broke, exactly as #632 built it to.**
   It asserted that `--with-fixtures` changed nothing about the emitted manifest, which was true
   only while en-la had no modules. L1-M1 ended that: dev ships en-la, strict drops it, and the two
   manifests now differ by one course. Rewritten to assert the difference **by name** — the extra
   course is the fixture row and there is exactly one — so that a second course drifting into
   dev-only still fails the case. The header paragraph that predicted the expiry was corrected where
   it stood rather than deleted.
2. **The mistake plate had to be exempted from the spelling bans, and the test caught it before a
   human would have.** `L1-M1-S06`'s plate is `Julia discipula est.` — deliberately spelled with the
   `j` that #630 forbids, because the module is teaching that Latin has no such letter. The en-la
   block in `src/course/types.test.ts` failed on it, correctly, and the fix is en-sa's `pada` flag in
   a different alphabet: a plate may violate `j`, the apostrophe, the acute and the seam rule,
   because those are the wrong things a module most wants to show and `buildWordIndex` never reads a
   mistake. It may NOT violate NFC, the course alphabet or the absent `script` line, because those
   render wrong rather than teaching wrong.
3. **Two brief notes contradicted themselves on where `nōn` is opened.** M2's index-seam note listed
   `nōn` as a fresh row, M3's listed it as fresh again, and M5's called it "M3's row extended".
   M2 opens it (as the one-word answer), M3 extends it (as the verb negator), M5 extends it again —
   fixed in the briefs, which is the right direction: the plan moves to match the index, not the
   other way round.
4. **M2's brief claimed `tū` would carry `tē` in its forms.** Nothing in L1 writes `tē`, and a
   `forms` list holds shapes the course actually uses, so the claim was removed rather than honoured
   by inventing a sentence for it.
5. **`male` was dropped from M2 entirely.** It had no hero to open a row in, and a variation showing
   an untaught surface would have raised the ratchet on the wave that was supposed to open it at
   zero. Better a module with one fewer adverb than a baseline the course then lives with.

---

## 5. What the next wave inherits

- **A new `X-ne` or `X-que` needs `X` opened in an earlier sentence** (§2). M10 is where `-que`
  lands, and its hosts are all L1 words by then, but the rule has to be checked and not assumed.
- **`ēst`, `nē`, `venit`, `vēnit`, `rosa`, `rosā`, `hic`, `hīc` are free** and are owed to the
  modules #633 assigned them to. M4 must not reach for `vēnit` and M5 must not reach for `venit`.
- **`sum`'s row owns `sum`, `es`, `est`, `sunt`**, and its note is written broadly enough to carry
  M7's "there is" reading. M7 checks that rather than opening a second row.
- **`agis`'s row is the verb `agō`**, so M4's `agit` and any other shape join it.
- **The ratchet is at zero**, held by `tools/shown-surfaces.test.ts` treating an absent course as 0.
  M3–M10 lower or hold it; they never raise it.

---

## 6. Open questions for the fluent-speaker gate

A fluent speaker of living Latin, or a Latin teacher, has seen none of this. The gate for Latin is
stranger than for any other course in the catalogue, en-sa included: there is no native speaker and
there never will be, so the gate is competence in a living community of use rather than nativity.
These are this wave's questions, and they are additions to the four standing ones in `docs/123` §11.

1. **Is `Mihi nōmen est Mārcus` the right hero for the name sentence**, against the blunter
   `Mārcus sum`? M1 teaches the dative of possession first so that M3's `habeō` lands as a clean
   delta rather than as a correction. A teacher may judge that a beginner should meet `Mārcus sum`
   first and the dative second.
2. **Is `Quid agis?` the right greeting to teach before `Valēs-ne?`** — and is the English cue "How
   are you?" doing damage by hiding that the Latin asks what you are doing? The module says so in a
   rule and a trap, but the cue is what a learner reads first.
3. **Does the enclitic hyphen read as an error to someone who reads Latin?** §2 shows it is
   mechanically better than the alternative, and the note says printed Latin joins the halves. That
   is an argument about the index, not about the page. This is `docs/123` §11's first question, and
   the first wave is the cheapest moment to reverse it.
4. **Is `ita` overweighted as "yes"?** The module's rule says the verb-echo is the everyday answer
   and `ita` is the nearest available word, but two of ten heroes open with `ita` or `minimē`,
   because a one-word verb-echo hero would have been a single token. A teacher may want the echo
   itself as a hero, which would mean relaxing `minWordsPerSentence` to 1.
5. **`Salvē, discipula!` and `Valē, magister!` use the vocative by accident of declension** —
   first- and third-declension vocatives are identical to the nominative, so the module never shows
   a vocative that differs. `Mārce` (from `Mārcus`) is the shape that does, and it is deliberately
   not written here, because it would be a second row for a name M1 already owns. Should L1 teach it
   at all, or does a course that greets people by name owe the learner one module where the name
   changes shape?
6. **Is `optimē` the right second adverb**, against `satis bene` or `nōn male`? It was chosen for
   the stress pattern as much as for the sense — `OP-ti-mē` demonstrates the antepenult rule on a
   word whose final vowel is long, which is exactly the shape a learner mis-stresses.
