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

## Wave 2 — L3-M3, L3-M4, L3-M5 (#483)

Authored against the same briefs (#465) and the same decisions (`docs/72`), continuing wave 1's
voice. A dev build emits `en-ru: 25 modules (L1-M1..M10, L2-M1..M10, L3-M1..M5)` and
`CONTENT 209/209 ok`; the cumulative index runs 621 → 642 → 656 → **672 surfaces**, maxSpan
unchanged. The course's laws carry: romanized `display`, Cyrillic on the quiet `script` line, a
precomposed acute on every polysyllable, `vy` as the default register, and no `glossEn` anywhere
(the pair has English on one side, so the build forbids it).

### L3-M3 "Opinions with reasons" — the comma becomes a spelling rule

`docs/72` §3 promised the comma law would be *stated* here and pointed back at twice. Stating it is
the whole module, and what makes it stick is that the law is shown doing three different jobs
rather than one: it fences a `chto` clause (S01, S05, S06, S09), it closes a `khotyá` clause before
the main one opens (S07), and it sets off a parenthetical opener — `po-móyemu`, `navérnoye`, a bare
`kázhetsya` — at the head of its sentence (S02, S08). Those are two rules in the file, 0 and 1,
because a learner told only about subordinate clauses will not predict the comma after
`Po-móyemu`, and a learner told only about openers will not predict the one before `chto`. Rule 1
says the part that is easiest to get wrong on paper: an opener parked *inside* a sentence takes a
comma on **both** sides.

The claim that carries the module is about status rather than shape: **a missing comma here is a
spelling mistake, not a matter of taste.** That is a strong thing to tell a beginner, so the module
demonstrates it rather than asserting it — S01's mistake plate is the comma-less sentence and
nothing else, which is the smallest possible way to show that the comma *is* the error.

`soglásen` is the level's first short-form adjective, and the module got a better deal than the
brief expected by teaching **three** of them instead of one. `soglásen` / `soglásna` / `soglásny`
(S03), `uvéren` / `uvérena` (S06) and `prav` / `pravá` / `právy` (S09) are one rule (rule 2) with
three rows under it, and the third earns its place twice over: `vy právy` is where a learner
discovers that `vy`'s politeness is a plural all the way down — the same plural `vy khotíte` has
carried since L1-M3 — and `pravá` is where the stress moves onto the ending, which an unaccented
romanization would hide completely. M6 still gets `rad` as `docs/72` §4 says; it now points back at
a family rather than at a single word.

`potomú chto` is the other half of the job and it needed **no row at all** (see the seams below).
Rule 3 therefore carries the whole fact — two words, one conjunction, comma in front of the pair —
and S04's plate is the split version, `potomú, chto`, which is the error a learner who has met bare
`chto` will actually produce. The module's cheapest good sentence is S10, `Pochemú vy tak
dúmayete?`: four words, one of them new, and it is the question that makes every other sentence in
the module answerable.

### L3-M4 "If and then" — the rule that saves a Spanish learner ruins a Russian one

Two conditional machines, taught in that order, and both of them are subtractions. The real one
first: **the future goes in both halves.** `Yésli búdet vrémya, ya pozvonyú` is word for word "if
there will be time, I will call", and rule 0 is tagged `interference` because the English habit here
is not vagueness but a *rule someone was taught* — never use the future after "if" — which produces
a wrong sentence with total confidence. S01's plate is `Yésli yest' vrémya`, the shape that habit
builds, and the `why` says the thing that matters: it is not clumsy Russian, it is a **habit instead
of a plan**, which is a different sentence.

The counterfactual is the relief `docs/72` §2 promised, and the module says so out loud in rule 1:
**past tense plus `by`, in both halves, with not one new ending.** Three sentences run it — S04
(`býlo vrémya`), S05 (`býli dén'gi`) and S10 (`byl vrachóm`) — and three rather than one is
deliberate, because the only thing a learner can get wrong is *forgetting the second `by`*, and
S10's plate is exactly that. S04's `trap` names the difficulty from the other side: a learner
expecting a fresh paradigm goes looking for one and finds nothing, which feels like a gap rather
than a gift.

The impersonal modals are the module's other half, and they split into two rules where the brief
had one. Rule 2 is the dative-subject frame — `mne nádo`, `vam nádo`, no nominative anywhere,
L2-M1's `mne núzhno` grown up. Rule 3 is the agreement fact, and it is where `dólzhen` parts company
with the rest: it is the one modal here that **agrees** (`dólzhen` / `dolzhná` / `dolzhný`, exactly
like M3's `soglásen`) and the one that takes a **nominative** subject, so `ya dólzhen` and `mne
nádo` are opposite shapes carrying nearly the same meaning. S06's plate is `Mne dólzhen`, the
crossing of the two. `mózhno` and `nel'zyá` close the rule by agreeing with nothing at all, and
`nel'zyá` gets the fact a sign-reader needs: it already contains its negative, so `ne mózhno`
(S08's plate) is not a thing.

Rule 4 is a `free` tag doing real work: `nádo` and `núzhno` overlap almost completely, and the one
difference worth carrying is what may follow — `nádo` takes an infinitive, `núzhno` also takes a
noun (`mne núzhen bilét`, L2-M8's row, untouched). That is `docs/72` §4's seam honoured exactly:
`núzhno` stays L2-M1's and `nádo`'s note says how the two differ.

The module's own find: **`dén'gi` is a plural**, and `býli dén'gi` is a sentence a learner can get
wrong twice — once for the verb and once for the `by`. It rides in the daydream sentence because
that is the sentence every learner wants early, which makes it the cheapest place to put a fact they
would otherwise meet cold.

### L3-M5 "What someone said" — the tense that does not move, and the particle that will not move

**Russian does not backshift**, and rule 0 is tagged `interference` for the same reason M4's rule 0
is: English's sequence of tenses is not a stylistic habit but a rule speakers apply without
noticing. `On skazál, chto on bólen` is "he said he was ill" with a present-tense Russian clause,
and S01's plate — `chto on byl bólen` — earns its space because it is **grammatical Russian that
says something else**: ill at some earlier time, and presumably better now. That is the strongest
form a plate can take, and it is the form wave 1 identified in M1. The rule gets three
demonstrations across three tenses, so a learner sees it is about *keeping* rather than about the
present: S03 keeps a present (`ne mogú` for "couldn't"), S04's second variation and S10 keep a
**future** (`pridú` for "would come"), and S07 keeps a verbless present (`éhto právda` for "it was
true").

`li` is the module's hardest single item, as the brief said, and it took two sentences rather than
one. S05 is the bare form (`svobóden li ya`) and S08 the polite `ne … li` (`ne zanyát li ya`), and
the second carries a fact the first cannot: **the `ne` is not a negative.** Rule 2 states the
position law — `li` follows the FIRST word of its clause and nowhere else — and the two plates
attack it from the only two available angles: S05's puts `li` first, S08's puts it third. What makes
the rule teachable rather than arbitrary is the consequence stated in the traps: because `li` is a
second-position particle, **the word being asked about has to move to the front to carry it**, which
is why `svobóden` leads a clause whose subject is `ya`. A wh-question needs none of this, and S04
says so — `gde` stays put, and only the comma is added.

The comma law's second tour (rule 1) is quiet on purpose. `docs/72` §3 wants it predictable by M9,
so the rule here says it is the same fence on a third kind of clause and spends its plate (S04) on a
reported *question*, which is where a learner is likeliest to think the rule has lapsed.

Rule 3 is the dative of the person told, and it turned out to be a larger job than the brief allowed
for — `yemú`, `yey` and `im` are taught nowhere below (see the seams), so this module opens all
three. Having to row them was a gift: S02, S03 and S10 now carry one fact between them that a single
row could not have shown, which is that Russian has **one** shape where English has two ("told her"
and "said to her"), with no preposition in either. S02's plate is the invented preposition, `skazál
k yey`.

Rule 4 keeps `sprosíl` and `poprosíl` apart, which English does not: `sprosíl` asks a question,
`poprosíl` asks a favour, and a request is an infinitive rather than a clause — no `chto`, no comma.
S06's plate builds the clause anyway, because that is what an English speaker reaching for "asked me
that I would call" produces. `chtóby` stays out of L3 entirely; nothing in the module needs it and
the brief does not ask for it.

### Four seams the brief had wrong, corrected against the real index

Every seam was re-derived against the real cumulative index before each module was written, and four
of the briefs' claims did not survive it. Wave 1's lesson repeats itself in all four: **a brief is
written in the spelling an author reaches for, and the index key is not that spelling.**

- **`potomú chto` is not a fresh key — L1-M9 owns it, whole.** The M3 brief lists it among the fresh
  keys beside `schitáyu` and `soglásen`. It is already in the module's own allowed-vocabulary list,
  indexed as the two-token key `docs/72` §4 specifies. So M3 opens **no row** for it: the
  comma-before-the-pair fact lives in rule 3, where it belongs anyway, and the module spends the row
  it saved on `právda` instead. The brief was right about `dúmayu`, which stays L1-M9's.
- **`mózhno` is not a fresh key — L2-M1 owns it.** The M4 brief pairs it with `nel'zyá` as though
  both were new. Only `nel'zyá` is. That correction is why M4 teaches a smoking verb at all: S07
  needed a row of its own, so `kurít'` became the module's word there, and it then pays for itself
  by giving S08's `nel'zyá` something to prohibit and the module its sign-reading pair.
- **`yemú` and `yey` are not L2-M1's — nothing below teaches them.** The M5 brief says the two "stay
  L2-M1's row and this module adds no cell to them", and the index disagrees flatly: L2-M1 taught
  `mne`, and L1/L2 between them taught the noun datives (`ivánu`, `ánne`, `brátu`, `ottsú`,
  `podrúge`, `sestré`) and `vam`, `nam`, `tebé` — but **no third-person dative pronoun exists in
  this course**. M5 opens `yemú`, `yey` and `im` as three rows. This is the wave's most consequential
  correction: written to the brief, the module would have shipped three sentences resting on a word
  no rung teaches.
- **Bare `skól'ko` is untaught.** L1-M8 indexed `skól'ko stóit` and `skól'ko stóyat` **whole**, on
  purpose, so the bare word has no owner at all. M5-S09 wanted `skól'ko éhto stóit` — one word slid
  into the middle of the frozen phrase — and found the gap. The row it opens says exactly that, and
  the trap names the learner's version of the problem: the phrase was learned as a lump, so
  splitting it feels illegal when it is not.

Two smaller ones, recorded because they are the same class of error. The M4 brief writes the past
cells as `bylo` and `poshól`; the index spells them **`býlo`** and **`poshyól`**, under this
course's `yó`-for-ё rule and its acute law. And `pozvonít'` (M5-S06) and `pomóg` (M4-S10) are both
fresh keys whose lemmas are taught: L1-M6 shipped `pozvonyú` / `pozvoníl` / `pozvoníte` / `pozvoní`
without the infinitive, and L2-M1 shipped `pomóch'` / `pomogíte` without a past. Both are new rows
here rather than edits to an earlier file, per `docs/72` §4.

### The ratchet

`tools/shown-surfaces.test.ts` held at **en-ru 20** across all three modules, and this wave, like
wave 1, produced **no finding at all**: `npm run content:shown -- en-ru L3-M3` (and M4, and M5)
each reports `clean — every shown surface resolves`, with **no RE-TEACH lines either**, because no
row in any of the three re-opens a key an earlier module owns. Every surface the three modules show
is one an earlier module owns or one they open themselves. No baseline moved in either direction,
and the fifty-one surfaces the wave adds (621 → 672) are all rowed.

The audit no tool runs was scripted again, over this wave's three modules and over wave 1's two as a
control, covering `display`, `forms` and the inline Russian quoted in the English prose — `note`,
`trap`, `sound`, `usage`, `mnemonic`, `mistake.why`, `changed`, `literal` and the rule texts. Three
laws, all clean: **no Cyrillic in a romanized field** (the homoglyph defect — Cyrillic `а е и о с р
х` are invisible inside Latin text and fork an index key), **no decomposed accent anywhere** (every
acute precomposed, every string NFC), and **no polysyllabic token without its acute**, counted as
runs of vowels with `y` treated as a glide before a plain vowel so that `ya`, `yésli` and
`priyátnogo` are scanned correctly rather than under-counted. The prose sweep is the half that
matters, because those strings are typed by hand rather than lifted from a display.

### Open questions for the native pass

15. **`schitáyu` against `dúmayu`** (M3-S01). Confirm `schitáyu` is the ordinary verb for an opinion
    a speaker is ready to defend, and that it is not too bookish for speech.
16. **The comma as spelling** (M3, rule 0). The wave's most load-bearing claim about status rather
    than shape. Confirm a missing comma before `chto` reads to an ordinary reader as an error rather
    than as informality.
17. **`po-móyemu`** (M3-S02). Confirm it is the softener a Russian actually reaches for, and that it
    is not noticeably more written, or more dated, than `mne kázhetsya`.
18. **`právda` as a bare predicate** (M3-S03). Confirm `éhto právda` is what is said. The module
    deliberately never writes the negative, because `neprávda` is one word and the two-word form
    carries a contrast a beginner does not need — confirm that avoidance was right.
19. **Three short forms as one family** (M3, rule 2). Confirm `soglásen`, `uvéren` and `prav` really
    do behave alike for a learner, and that `vy právy` (never `vy prav`) is exceptionless.
20. **The comma before `potomú chto`** (M3, rule 3; S04). Confirm the comma sits in front of the pair
    in ordinary writing, and say whether `potomú, chto` is a real alternative with a different
    emphasis that a learner will meet in print and be confused by.
21. **`navérnoye`** (M3-S08). Confirm it reads as "probably" rather than "almost certainly", and that
    the comma after it is obligatory in current practice rather than merely usual.
22. **The future in both halves** (M4, rule 0; S01). The module's loudest claim. Confirm `Yésli búdet
    vrémya, ya pozvonyú` is the ordinary sentence, and that `Yésli yest' vrémya` genuinely shifts it
    to a habit rather than simply sounding foreign.
23. **`by` in both halves** (M4, rule 1; S10). Confirm the particle is required in both, and that
    `Yésli ya byl vrachóm, ya by …` lands as a claim about the past rather than as a conditional
    with a word missing.
24. **`nádo` against `núzhno`** (M4, rule 4). Confirm they are interchangeable where both fit, that
    `nádo` is the more spoken of the two, and that the infinitive/noun split is the right single line
    to give a learner.
25. **`dólzhen`'s weight** (M4-S06). Confirm `Ya dólzhen rabótat' sevódnya` is an ordinary way to name
    an obligation to a colleague, and does not sound heavier than the situation warrants.
26. **`dén'gi` as a plural** (M4-S05). Confirm `býli dén'gi` is what is said, and that no singular
    exists for a learner to be tempted by.
27. **`mózhno` and `nel'zyá` with no subject** (M4-S07, S08). Confirm `Zdes' mózhno kurít'?` is how
    permission is asked of a room, and that `Vam nel'zyá rabótat'` is the natural way to aim the
    prohibition at one person without sounding like a sign.
28. **`opázdyvayu`** (M4-S09). Confirm the present imperfective is what a person actually says on the
    way out of a door, and that no perfective is wanted there.
29. **No backshift** (M5, rule 0; S01). The wave's other load-bearing claim. Confirm `On skazál, chto
    on bólen` is heard as "he said he was ill", and that `chto on byl bólen` really does report a
    different fact rather than being a heavier way of saying the same one.
30. **`li` in second position** (M5, rule 2; S05, S08). The module's hardest item. Confirm both
    `svobóden li ya` and `ne zanyát li ya` are natural, and say which a speaker reaches for first —
    the module teaches the bare form as the plain one and `ne … li` as the polite one.
31. **`bólen` against `bolít`** (M5-S01). Confirm `bólen` is the everyday way to report that a person
    is ill, that it does not read as clinical, and that the seam back to L2-M8's `bolít` — a body
    part, not a person — is drawn where a learner needs it.
32. **`sprosíl` against `poprosíl`** (M5, rule 4; S06). Confirm the split is as clean as stated, and
    that `poprosíla menyá pozvonít'` needs no `chtóby` at this level.
33. **`skól'ko` split from `stóit`** (M5-S09). Confirm `skól'ko éhto stóit` is the ordinary order, and
    that `skól'ko stóit éhto` is odd rather than merely marked — the plate says the second one.
34. **The dative pronouns** (M5-S02, S03, S10). Confirm `yemú`, `yey` and `im` carry the whole of
    English's "told him" and "said to him" with no preposition, and that the slot straight after the
    reporting verb, before the comma, is where a speaker puts them.
