# en-ru L3 — LLM review

The review that clears each en-ru L3 wave to ship, written in the same change that authors it
(`CLAUDE.md`, "Ship `verified: true` in the authoring change"). The **native-speaker gate is a
separate, stricter bar and stays unmet**: every section below ends in open questions for a native
pass, and no later wave may close one of them by rewriting a shipped module.

Open questions are numbered as a fresh en-ru L3 chain from 1.

## Wave 1 — L3-M1, L3-M2 (#474)

Authored against the briefs written by #465 and the decisions recorded in `docs/72`. A strict
`npm run build` emits `en-ru: 22 modules (L1-M1..M10, L2-M1..M10, L3-M1..M2)` and `CONTENT 202/202
ok`. The course's own laws carry unchanged: romanized `display`, Cyrillic on the quiet `script`
line, a precomposed acute on every polysyllable, `vy` as the default register.

### L3-M1 "Your day, in detail" — the particle, and the negative that has to be doubled

L1-M9's `nrávitsya` and L2-M10's `vernúlsya` rode as vocabulary with their shape unexplained. This
is where the shape becomes a system, and the spelling half of it is one line: the particle is `-s'`
after a vowel and `-sya` after a consonant, and the personal ending underneath never bends to
accommodate it. S10 is what makes that a demonstration rather than an assertion — `prosypáyetsya`
is the he/she cell of S01's `prosypáyus'`, so a learner sees one verb wearing both spellings and
can read the rule off the two forms without being told a second time.

The half that usually goes unsaid is said out loud in rule 1: **the particle mostly does not mean
"myself"**. `umyváyus'` and `odeváyus'` really are reflexive; `vozvrashcháyus'` has nothing to
return and `lozhús'` has no self to lay down. An English speaker reads a reflexive and hunts for
the object, and a learner told only the first half will keep hunting.

What makes the module's mistake plates unusually good is that **every one of them lands on a real
other verb rather than on a non-word**. Drop the particle from `prosypáyus'` and you have
`prosypáyu`, to spill something. Drop it from `vozvrashcháyus'` and the verb is transitive and
waiting for the thing you are giving back. Drop it from `lozhús'` and you are laying something
down. (M2 supplies the sharpest of the family: `uchú` is "I teach".) The plate is therefore not
marking an error, it is showing the learner the sentence they actually produced — which is the
strongest form a plate can take.

`nikogdá` carries the module's loudest interference claim, and it is the exact mirror of a rule
another course shipped in the same wave: **Russian requires the second negative** — `Ya nikogdá ne
p'yu kófe`, literally "I never not drink coffee" — where English forbids exactly that pairing. An
English speaker builds `Ya nikogdá p'yu` and hears nothing wrong at all, while a Russian hears a
sentence that stopped halfway. hi-en L3-M1, authored alongside this one, spends a plate on
`*I do not hardly ever work at night`; the two rules should be read together, because they are the
same fact seen from either end.

The module's own find, not in the brief: **`závtrakayu` and `úzhinayu` are verbs**, so the meal is
inside the verb and there is no noun in the sentence to eat. S03's plate catches two English habits
in one go — `Obýchno ya iméyu závtrak v sem' chasóv` invents both a noun for the meal and a verb
for having, and Russian uses neither. S08's trap adds the consequence a learner needs: name the
food and it goes in its own clause, joined with `i`.

Everything else in the module is deliberately cheap. The sequencing spine costs two words, `zatém`
and `nakonéts`, because `snachála` is L2-M10's and `potóm` is L1-M10's; every clause is present and
imperfective, which is what lets an item run to two sentences without getting harder.

### L3-M2 "Work and study" — the fifth case, and the word for "as" that is not there

The instrumental opens here, on the record, because `docs/56` kept it out of L2 rather than open a
fifth case for one frame. Work is where it can no longer be dodged, and the module's loudest fact
is a subtraction: **there is no word for "as"**. `Ya rabótayu inzhenérom` is "I work as an
engineer" and the whole of the "as" is the `-om`. The English speaker's repair is worse than a gap,
which is why it earns the plate: `kak inzhenér` is a real Russian phrase meaning "the way an
engineer would", so the learner does not fail to communicate, they communicate something else.

The endings are stated in one rule — `-om` on a masculine or neuter noun, `-oy` on a feminine or on
anything ending in `-a`, `-im` on the adjective in front. The brief also offered `-ami`; the module
dropped it, because no plural instrumental appears anywhere in these ten sentences and a rule with
no row under it is a rule a learner cannot check. What the module added in its place is the stress
fact: the ending is written `-óm` when it is the stressed syllable, so `vrachóm` and `yazykóm` do
not rhyme with `inzhenérom` and `spórtom`. S02's `sound` line says so directly. That is the acute
earning its keep — under an unaccented romanization the four endings would look identical and
sound wrong three times out of four.

`s` + instrumental is the second frame, and the pairing is taught as one thing because the
preposition is the half an English speaker expects and the ending is the half they forget. S03
carries the module's best small trap: `kolléga` looks feminine, is not, and takes `-oy` anyway,
because the ending follows the `-a` the word ends in and not the person it names. `so mnoy` closes
the module — the same preposition with a vowel grown in front of an awkward cluster, filed beside
`v`/`vo` and `k`/`ko` so a learner hears it as one word rather than two.

`zanimát'sya` is the third instrumental frame and the module can afford it only because M1 already
paid for the particle: rule 4 points back rather than teaching `-sya` twice. The contrast that
makes it stick is a pair of traps rather than a rule — S06 says `zanimáyus' spórtom` takes no `s`
at all, and S03 says `s` never leaves its noun in the plain form. Put together, a learner has both
halves of what `s` does and does not do.

The other decision worth naming is the module's restraint: **three verbs, three jobs, no overlap.**
`rabótayu` is what you are paid for, `uchús'` is where you are enrolled, `zanimáyus'` is what you
occupy yourself with. S05's trap and its plate carry the sharpest edge of that — `uchús'` can never
take the subject as an object, and `Ya uchú v universitéte` says "I teach at university", the
opposite claim from the one intended. And the zero copula holds through S04 and S08, with a plate
(`Moy nachál'nik yest' óchen' dóbryy`) that is worth having precisely because `yest'` exists and
means something else.

### Three seams the brief had wrong, corrected against the real index

Every seam was re-derived against the REAL cumulative index — the fold of `L1-M1` through
`L2-M10`, **588 surfaces, maxSpan 3** — and three of the brief's claims did not survive it. Each
correction is now marked in `tools/course-briefs.ts` as the authoring wave's, so #483 and the
M6–M10 wave inherit the index rather than the guess.

- **`rédko` and `chásto` are not fresh.** L1-M4 owns both, and `rédko` is easy to miss because it
  does not head its own row: it rides in `chásto`'s `forms`, where a reader scanning module titles
  will not see it. Both words are shown here — S05's and S10's variations, `C11`, `C12` — and
  neither is rowed. Shown is taught, and L1-M4 taught them.
- **`kázhdyy` is only half-fresh.** L1-M4 owns `kázhdyy den'` as a WHOLE two-token key, while the
  bare word is free. S01's display carries the phrase and opens no row for it, which is exactly the
  job the multi-token index was built to do: the phrase has one owner and the bare adjective is
  still available to whichever later module needs it.
- **`ekzámen` is L1-M6's**, spelled `ehkzámen` under this course's eh-for-э rule. A brief written
  from the English word would never have found it, because the index key is not the spelling an
  author reaches for — which is the general lesson of this seam and the reason the correction is
  recorded rather than silently applied. The work diary therefore runs on `soveshchániye` instead,
  and the substitution improved the module: S09 is a diary entry, `Závtra u menyá soveshchániye`,
  which re-uses L1-M8's `u menyá` for an appointment rather than a possession and needs no new
  shape at all. Its own note draws the line the learner needs — a `soveshchániye` has an agenda,
  and meeting a friend is L2-M6's `vstrétimsya`.

One pattern moved with it. The brief's fifth pattern was `Mne nrávitsya moyá rabóta`; the module
declares `U menyá + <N-nominative>`. `nrávitsya` is L1-M9's row and the dative-subject family is
M6's, so a preference sentence here would have shown a shape this module is not allowed to own,
while `u menyá` is a shape the module only re-uses.

### The audit no tool runs

Three of this course's laws are load-bearing and none is fully checked by a test:
**zero Cyrillic outside `script`**, **zero decomposed accents**, and **an acute on every
polysyllabic token**. `src/course/types.test.ts` covers the first two only in part — it asserts
that `display`, `cue` and `forms` carry no Cyrillic, and that the module JSON contains no combining
acute anywhere — and for the third it asserts only that *some* stressed vowel appears in the file,
which a module with one accented word would satisfy.

The gap matters because a polysyllable written without its acute is a perfectly well-formed string
and a *different index key* from the one every other module writes. `vozvrashcháyus'` and
`vozvrashchayus'` fold to two surfaces, only one of them has a "why" row, and nothing on screen
tells a reader which they are looking at. That is the defect #355's stress rule exists for.

So this wave scripted the check across all three laws and ran it over both modules, covering not
only the `display` and `forms` slots but the inline Russian quoted inside the English teaching
prose — `sound`, `trap`, `note`, `usage`, `mistake.why`. The prose is where a stray unaccented
spelling is likeliest, because those strings are written by hand rather than lifted from a display,
and it is the one place the existing test's Cyrillic assertions deliberately do not reach (a note
may quote Cyrillic, so the test only requires that English is present). All three came back clean:
no Cyrillic outside `script`, no decomposed accent, no polysyllabic token without its precomposed
acute.

### A stale line in the generated prompt

`npm run content:prompt` is the only document an author of a module ever sees, so a wrong line in
it reproduces itself once per module. Its acceptance text still said `verified` stays false — the
opposite of `CLAUDE.md`'s standing default and of what every wave in this milestone has actually
done. `tools/generate-prompt.ts` now carries the correct instruction in the round trip: author
`verified: true` with its signature (`verifiedBy` naming the AUTHORITY, `verifiedAt` the date) and
write the wave's section of `docs/<n>-llm-review-<course>-<level>.md` in the same change, with the
NATIVE gate named as a separate, stricter bar so the review doc must end in its open questions. The
acceptance section now says only what it should — that the document must pass
`npm run content:validate` with zero issues.

### The ratchet

`tools/shown-surfaces.test.ts` held at **en-ru 20** across both modules, and this wave produced no
finding at all — no shown-but-untaught surface in either file. Both modules were authored against
the corrected seam list rather than the brief's original, so every surface they show is one an
earlier module already owns or one they open themselves. No baseline moved in either direction.

### Open questions for the native pass

1. **The `-s'` / `-sya` spelling rule** (M1, rule 0). Confirm "vowel takes `-s'`, consonant takes
   `-sya`" has no exception a learner will meet at this level.
2. **The particle that means no self** (M1, rule 1; S07). Confirm the framing — that `-s'` mostly
   marks a verb taking no object rather than a reflexive meaning — is a fair thing to tell a
   beginner rather than a simplification they will have to unlearn.
3. **`prosypáyus'` against `vstayú`** (M1-S01). Confirm waking and getting up are two verbs a
   Russian account of a morning genuinely names separately, and in that order.
4. **The compulsory `ne`** (M1, rule 2; S05). The wave's most load-bearing claim. Confirm the second
   negative is never dropped in ordinary speech, in any register.
5. **Frequency adverbs in front of the verb** (M1, rule 3). Confirm parking `obýchno` at the end of
   the clause, the way English parks "usually", really does read as an afterthought.
6. **`zatém` against `potóm`** (M1-S04). Confirm `zatém` is a shade more written, as the note
   claims, and that it is still natural spoken Russian inside a list.
7. **The meal verbs** (M1-S03, S08). Confirm `závtrakayu` and `úzhinayu` take no object at all, that
   `iméyu závtrak` is unavailable rather than merely clumsy, and that naming the food does require
   a second clause.
8. **`lozhús' spat'`** (M1-S09). Confirm the pair is fixed and that `spat'` is never dropped.
9. **The instrumental for a profession** (M2, rule 1; S01). The module's loudest claim. Confirm
   `Ya rabótayu inzhenérom` is the ordinary way to say what you do, and that `kak inzhenér` lands as
   a comparison rather than as a foreign-sounding version of the same sentence.
10. **`vrach` of a woman** (M2-S02). Confirm there is no everyday feminine form worth teaching, and
    that a woman is described as working `vrachóm` with nothing else marking her.
11. **`kolléga`** (M2-S03). Confirm the word covers a man as readily as a woman, and that `kollégoy`
    is the ending regardless of who is meant.
12. **`zanimát'sya` with no preposition** (M2, rule 4; S06, S07). Confirm `zanimáyus' spórtom` and
    `zanimáyus' rússkim yazykóm` are what a speaker says, and that adding `s` really does shift the
    meaning to doing the activity in someone's company.
13. **`nachál'nik`** (M2-S04). Confirm it is neutral enough to use to the person's face, and carries
    none of the edge an English ear might hear in "boss".
14. **`soveshchániye` against `vstrécha`** (M2-S09). Confirm the work-meeting reading, and that the
    note's claim — no Russian has a `soveshchániye` in a café — holds as firmly as it is stated.
