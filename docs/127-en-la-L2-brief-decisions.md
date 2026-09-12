# en-la L2 — the brief decisions (#638)

**Date:** 2026-09-12 · **Course:** en-la — English (L1) → Latin (L2) · **Level:** 2 "Conversations —
hold your own" · **Status:** briefs written, no content authored. The ten `ModuleBrief`s live in
`tools/course-briefs.ts` under `COURSE_BRIEFS['en-la']`, and the course-wide reasoning is in that
file's header section, "## en-la L2: the decisions, taken against the finished L1 (#638)".

This file records the four decisions a reader would otherwise have to reconstruct from twenty notes,
and the one number every brief was planned against.

---

## 0. The index the level was planned against

**189 surfaces through L1-M10, `maxSpan` 1**, folded across all ten emitted files rather than read
off the last one. From #424 each index file's `surfaces` holds only what that module is the first to
teach while `surfaceCount` stays cumulative, so `L1-M10.json` reports 189 over a delta of fifteen
keys. A reader who does not fold plans a level out of the last rung's leftovers — the defect
`tools/generate-prompt.test.ts` exists to catch. Stated as arithmetic so it is checkable:

```
24 + 20 + 18 + 24 + 11 + 16 + 16 + 24 + 21 + 15 = 189
```

Confirmed live: `npm run content:prompt -- en-la L2-M1` reports
`PROMPT .prompts/en-la-L2-M1.md ok (189 surfaces through L1-M10)`.

---

## 1. Politeness is a verb, and the `formal` chip proves it

Every other L2-M1 in `tools/course-briefs.ts` teaches a polite address — `usted`, `Lei`, `vous`,
`Sie`, `vy`, `bhavān` — because six of the eleven courses have one. **Latin does not.** L1-M2 settled
that `tū` is one person and `vōs` is more than one, and `vōs` to one person is wrong rather than
formal.

So en-la becomes the one course in the catalogue whose `formal` register chip (#422) sits on a **verb
form**: `velim`, `quaesō`, and the fixed phrases around them. The decision has a cost worth naming —
an author working from habit will reach for the plural as a courtesy, and a reviewer comparing en-la
to its five siblings will read its absence as an omission. M1's note therefore states the ban twice,
once as register and once as a chip rule, because a prompt shows an author only the notes of the
module being written.

---

## 2. Two subjunctives, both as vocabulary, and the mood deferred

L1 opened no subjunctive at all. L2 needs two things it cannot say without one:

- **`velim`** (M1) — "I should like", the softener that makes a request polite.
- **`eāmus`** (M6) — "let's go", without which a module whose job is "invitations, suggestions,
  settling a time" cannot do its job.

**Both are written as fixed forms and neither is explained.** The notes name the mood and stop, the
way L1-M8 taught `quantī cōnstat` whole. The productive subjunctive is **L3-M4's**, and the reason
the discipline matters is arithmetic: a module that explains the mood has to teach four persons in
two tenses, which is more than `NEW_WORD_CAP` allows beside the module's own vocabulary.

The alternative for M6 was a plain future, `ībimus?`, and it was **rejected**: that asks about fact
where the module needs an invitation. `nōlī` (M1) is an imperative and not a subjunctive, and its
note says so, because it sits in the same module as `velim`.

---

## 3. `ēst` — the macron pair L1 was forbidden to spend

`docs/123` §1.1 listed `est`/`ēst` as the second pair the macron keeps apart. L1-M1 took `est` for
"is" and every later L1 module was forbidden to write `ēst`; the L1 review confirmed the key was
still free at graduation.

**M5 spends it.** `ēst` is "he eats", one bar from "he is", and the two rows will sit side by side in
the emitted index — which is the orthography's whole argument arriving in a module about food. The
verb is `edō`, and `ēst` is a `forms` entry of that row rather than a row of its own, because it is
the same verb.

The same module inherits the next instance of the same problem: `edō`'s alternative infinitive
**`ēsse` collides with `esse`** ("to be") by exactly one bar. So `ēsse` is **named in prose and
written nowhere**, `edere` is the infinitive this course uses, and the pattern L1 used for `ēst`
itself is reused one level up.

---

## 4. What L2 withholds, and where each piece lands

Named as deferred in the module that would otherwise reach for it:

- **The productive subjunctive** — L3-M4 (§2).
- **Every past but the perfect** — L4-M8. M10's four-sentence account is exactly where an author
  reaches for `legēbam`, and its note says the keys `legēbam`, `habēbam` and `eram` are still free.
- **The relative pronoun** — L3. M9 wants it for comparison and gets the ablative and `quam` instead.
- **`sē` and `suus`** — L3-M5, with the accusative and infinitive.
- **The passive** — L4-M7. M8 needs "it is broken" and gets `frāctus est` taught as an **adjective
  with `sum`**, which is the decision that keeps the passive out.
- **The locative** — L4-M9. M4 needs "at home" and writes `domum`/`domō` as two shapes of one row,
  with `domī` named and unwritten.
- **`possum`** — no level below L3 has it, so M8 says `nōn inveniō` ("I do not find") and means
  "I cannot find". The gap is stated rather than papered over.
- **The vocative** — and **M7 is the module that wants it most**. A telephone call is where `Mārce`
  belongs, and L1 got away without a vocative only because every name it greeted had one identical
  to its nominative. M7 writes `Mārcus hīc est` instead and names the gap.

---

## 5. Seams, and the law that carries forward

L1's ordering law holds unchanged: `surfaceIndexKeys` hands the part keys to whichever row is indexed
first, so **a new `X-ne` or `X-que` needs `X` opened in an earlier sentence.** L2's three seams all
reuse hosts L1 already taught, so the law is satisfied before they are written:

| Module | Seam | Host | Owned since |
|---|---|---|---|
| L2-M2 | `pater māter-que` | `māter` | this module — must be an earlier sentence |
| L2-M5 | `vīnum aquam-que` | `aquam` | L1-M3-S01 |
| L2-M6 | `venīs-ne mēcum` | `venīs` | L1-M9-S07 |

**M2 is the one that needs care**, because its host is new in the same module. Every authoring wave
reads the emitted index back rather than assuming, and `tools/course-briefs.test.ts` pins the set of
modules allowed to open a seam at all — L1-M2, L1-M10, L2-M2, L2-M5, L2-M6 and no others.

The lexicalised list is closed and unchanged: `atque`, `neque`, `itaque`, `quoque`, `namque`,
`dēnique`, each one word with no hyphen.

---

## 6. Open questions this level inherits and adds

Standing: the twenty-four in `docs/123` §11, `docs/124` §6, `docs/125` §5 and `docs/126` §6 — all
still unanswered, because the gate is a fluent speaker of living Latin and that reader has not seen
the course. Added by these briefs:

1. **Is `velim` the right first politeness**, against `sī placet` or a bare `quaesō` on an
   imperative? `velim` is a subjunctive, and teaching it first means the level's first module writes a
   form it declines to explain.
2. **Does `eāmus` earn its place in M6**, or should the module accept `ībimus?` and leave every
   subjunctive to L3? §2 argues it does; a teacher may disagree, and reversing it after M6 ships
   would cost a rewritten module.
3. **Is `raeda` the right word for a car** (M4)? It is the *Lexicon Recentis Latinitatis*'s and it
   classically means a four-wheeled carriage. The alternative, `autocinētum`, is uglier and more
   exact.
4. **Is teaching `frāctus est` as an adjective honest**, or does it plant a habit L4-M7 then has to
   break when the passive arrives?
5. **Is `nummus` still right** — asked at L1-M8 (`docs/123` §11) and now answered in ten modules of
   content, which makes M9's price comparisons the last cheap moment to change it.
