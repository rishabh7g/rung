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

## Wave 3 — L3-M6..M10 (#549)

The wave that closes the level. Authored against the same briefs (#462–#467) and the same decisions
(`docs/72`), continuing waves 1 and 2's voice. A **strict** build — no flags — emits
`en-ru: 30 modules (L1-M1..M10, L2-M1..M10, L3-M1..M10)` and `CONTENT 214/214 ok`; the cumulative
index runs 672 → 692 → 714 → 739 → 764 → **785 surfaces**, maxSpan unchanged at 2. The course's laws
carry: romanized `display`, Cyrillic on the quiet `script` line, one precomposed acute per
polysyllable, and no `glossEn` anywhere. Every module ships `verified: true` with its signature in
this same change, and no module edits a file below it — the five new shapes of older lexemes
(`vrachú`, `prishyól`, `opozdál`, `vernúlis'`, `dnya`) each take a row in the module that first
shows them, with the note pointing back at the first-teach row.

### L3-M6 "Feelings in depth" — one frame, seven feelings

The brief called the dative-subject frame the module's spine and it is: five of the ten sentences
are `mne` plus a bare `-o` predicate with no subject in them at all, and the module's whole claim is
that this is **one** shape rather than seven words. Rule 0 says it and names the two places the
learner has already met it without its name — L1-M9's `mne nrávitsya`, L2-M1's `mne núzhno` — and
rule 1 says the English half: `ya grústnyy` is not a clumsier way of saying `mne grústno`, it is a
different claim about a person's character. Every mistake plate in the family is that same error
with a different word in it (`ya skúchnyy`, `ya stýdnyy`, `ya byl stráshno`), which is deliberate:
the learner meets one error five times rather than five errors once.

`rad` is the module's exception and is placed as one — S04 sits in the middle of the dative
sentences and its trap opens "This one is NOT the dative frame." It is M3's `soglásen` a second
time (rule 2 says so and points there rather than teaching the short form again), and with
`svobóden` and `zanyát` from L2 that is very nearly the whole short-form list a learner needs.

The `sebyá` / `-sya` contrast the brief asked for is shown rather than asserted: S05 has
`chúvstvuyu sebyá` with the free pronoun and S07 has `bespokóyus'` with the particle welded on, and
rule 3 carries both. `stálo` gives the family its past with no new tense (rule 4) — `mne býlo
stráshno` for the state, `mne stálo stráshno` for the moment it arrived — and the pair is worth the
row on its own, because `stálo` is neuter forever and a learner will try to make it agree.

**One row exists for a mechanical reason and is worth recording.** `chúvstvuyesh'` (S10) is its own
row rather than a form on S05's `chúvstvuyu`, because a form listed on one row and shown as another
row's display inside the same module is exactly the COLLIDES case `tools/check-shown.ts` fails on:
the fold cannot tell them apart and the second row would be unreachable. The split is honest anyway
— S10 is the `ty` question a person actually asks — and `chúvstvuyete` stays on the `chúvstvuyu` row
for the polite variations.

### L3-M7 "Body and health" — the part is the subject

The delta is not the vocabulary, it is **who the subject is**. `bolít` and `bolyát` are both L2-M8's
and neither is re-opened; what M7 adds is that the verb agrees with the body part and not with the
sufferer, so S02's `zúby` and S08's `rúki` are the module's two plural plates and S01, S03 and S09
its singular ones. Rule 1 names the English interference precisely, because it is not the obvious
one: the error is not word order but the possessive, `moyá golová bolít` — grammatical, and a
sentence no one says. Four of the ten mistake plates are a `moy` or a `ya` pushed into a frame that
has no room for either.

`k` + dative is the seat L2-M4 left empty, and the module makes it a contrast rather than a rule to
memorise: S04 is `idú k vrachú` and S07 is `idú v aptéku`, same verb, same trip, and each sentence's
trap points at the other. `vrachú` is a new row — see the seams below — while `vrach` itself stays
L2-M8's.

Symptoms are the cheap half (rule 3): `u menyá temperatúra` and `u menyá káshel' i násmork` re-use
L1-M4's possession frame with no verb in the sentence at all, so the whole spend is vocabulary. The
one grammatical point hiding there is `yest'`, which M7 deliberately drops (a symptom is reported,
not shown to exist) and M8 deliberately keeps (`u menyá yest' kvitántsiya` — the point is that the
paper exists); S05's trap and S08's trap say so to each other across the two modules.

Duration is rule 4 and it is the module's quietest good news: `bolít uzhé dva dnya` is a plain
present plus one adverb, because Russian has no perfect to build. The rule says so in as many words
— "there is no new tense coming" — since four other courses in this repo spend a module on one.

### L3-M8 "Money and paperwork" — arithmetic with three endings

`docs/56` deferred numbers above a hundred to exactly here, and the module treats the number rule as
**arithmetic rather than vocabulary**: 1 takes the nominative singular, 2–4 the genitive singular,
5 and up the genitive plural, and the rule restarts on the last digit. Every word it needs in order
to state that is already taught — `odín rubl'`, `dva rublyá`, `pyat' rubléy` are all L1-M8's — so
S01 states it with its two variations and spends its row on `dvésti` instead. S02 is the plate that
proves the rule scales: `sto týsyach rubléy` applies it twice in one phrase, `sto` deciding
`týsyach` and the whole number deciding `rubléy`.

Register does what the brief asked (rule 3): the module speaks `vy` throughout, and it opens nothing
for politeness — `zapólnite` is L2-M1's imperative ending on a new verb, `mózhno` is L2-M1's,
`pozháluysta` is where it always was. That is what leaves room for the numbers, and it is why four
of the ten sentences are marked `formal` rather than `neutral`.

The paperwork vocabulary is chosen as the words on the paper, and two of the rows are there for a
distinction rather than for a thing: `kvitántsiya` against `schyot` (S08's mnemonic is the whole
lesson — "schyot asks, kvitántsiya proves") and `pódpis'`, which is feminine behind a consonant
ending and whose mistake plate is `vash pódpis'`, the error every learner makes once.

### L3-M9 "Festivals and everyday culture" — the level's most useful word

`kotóryy` is the module, and the brief was right that its law has two halves that must both be
stated. The file spends four sentences proving it rather than one: S01 is masculine nominative, S06
is feminine **accusative** (`kníga, kotóruyu ya chitál` — gender from the noun behind, case from the
clause ahead), S07 is neuter, where the two forms are identical and the rule is invisible but still
running, and S01's variation is the plural. S06's trap is the sentence the rule exists for: "The
case does NOT come from `kníga`."

The comma is rule 1 and it is stated as M3's law arriving for the third time, not as news — which is
the point the brief made about predictability.

Dates are rule 2, and the module teaches the pair rather than the form: `pérvogo yanvaryá` is the
day something happens on and `pérvoye yanvaryá` is the date as a label, so every ordinal row carries
both and every date sentence has the other one in a variation. Months are lower case in Russian and
the rule says so, because an English habit will fight it. Three months are spent, not twelve:
`yanvár'`, `mart`, `may`, each with the genitive and prepositional shape a date or a `v` needs kept
in its own `forms`, which is what the brief's "every genitive month shape goes in its month's forms"
asks for and what the 25-surface cap allows.

The festival names are indexed **whole** — `Nóvyy god`, `den' rozhdéniya`, `Den' Pobédy` — and rule
4 tells the learner not to take them apart. Longest-span matching means the whole key wins over its
parts, so `nóvyy` keeps pointing at L2-M3's adjective row and `den'` at M7's, which is the right
outcome for a learner tapping either.

### L3-M10 "Your own story" — the exit

Ten accounts of six or seven sentences each, and the honest new spend is ten prefixed-motion rows
(five verbs in two genders), three connectors and two verb shapes whose lemmas are already taught.
Everything else in the sixty-two sentences those accounts are made of is L1 and L2. S10's trap says
exactly that, because it is the module's whole argument: the ladder a learner already has **is** an
account.

Aspect at length is rule 0 and it is tested rather than taught: S02 and S06 are habit from end to
end with one perfective in the middle of S06 (`kupíla`) as the single finished step, S01 and S05 are
finished steps with one imperfective stretch (`rabótal dólgo`) inside them, and every mistake plate
in the module is an aspect swapped rather than a word misspelt. `ránshe` plus an imperfective past
is the whole of English's "used to" (rule 2), `khodíl` and `yézdil` are taken as vocabulary inside
that frame, and the determinate/indeterminate system they belong to is named as L4's business and
left there, as `docs/56` asked.

The prefixes are presented as one verb with four fronts — `u-` away, `vy-` out, `za-` in passing,
`pri-` arrived — and the module's arithmetic is stated out loud in rule 1: four words cost about one
and a half, and a learner who memorises four has paid three times over. Each gender is its own row
(`ushyól`/`ushlá`, `výshel`/`výshla`, `zashyól`/`zashlá`, `prishyól`/`prishlá`,
`priyékhal`/`priyékhala`) with the feminine pointing back at the masculine, and S05 and S07 are the
same accounts as S01 and S03 told by a woman, so the gendered past is drilled by the pairing rather
than by a rule.

Rule 4 closes the level on an absence: English marks past-in-past with "had" and Russian does not,
so the order is carried by the connectors and by aspect alone. The level ends without a single new
tense, which is the claim the whole of L3 has been making.

### Seven seams the briefs had wrong, corrected against the emitted index

Every seam was re-derived against the real cumulative index before each module was written
(`npm run content:shown` against a freshly emitted `public/content/en-ru/index/`), and seven of the
briefs' claims did not survive it. The class of error is the one waves 1 and 2 recorded: **a brief is
written in the spelling and the memory an author reaches for, and the index is neither.**

- **`priyátno` is not fresh — L1-M1 owns it.** The M6 brief lists it with `grústno` and `stráshno`
  among the module's fresh keys. It has been in the course since `óchen' priyátno` in the first
  module of the ladder. M6 therefore opens **no row** for it; it appears once, in pool item C11,
  where it resolves to L1-M1's note, which is the right note for it.
- **`bolyát` and `nogá` are not fresh — L2-M8 owns them, with `bolít`, `golová` and `vrach`.** The
  M7 brief lists `bolyát`, `zub`, `zúby`, `gorló` … `nogá` as one undifferentiated fresh list. Only
  the body parts are new. M7 opens no row for `bolyát`: the plural-agreement fact is rule 0's, where
  it belongs, and `rúki i nógi` (S08) is the plate — with `nógi` riding on L2-M8's row and `rúki` on
  M7's own. The brief was right that `bolít`, `golová` and `vrach` stay where they are.
- **`vrachú` is fresh, and the brief did not say so.** L2-M8 shipped `vrach`, `vrachá` and `vrachóm`
  and no dative at all, so `idú k vrachú` — the brief's own second pattern — rested on a shape no
  rung teaches. It is a new row in M7 pointing back at L2-M8's `vrach`, per `docs/72` §4.
- **Bare `den'` was untaught, so `dnya` needed a row.** L1 indexed `dóbryy den'` and `kázhdyy den'`
  **whole**, exactly as L1-M8 did with `skól'ko stóit` (wave 2 found the same shape there), so the
  bare token had no owner. M7-S03's duration phrase needed it, and the row it opens carries `dnya`,
  `den'` and `dney` together. M9 then indexes `den' rozhdéniya` and `Den' Pobédy` whole on top of it,
  which is safe: longest-span matching gives the two-token keys priority.
- **`sto`, `stóit` and `dén'gi` are not fresh — L1-M8 and L3-M4 own them.** The M8 brief lists `sto`
  with `dvésti` / `trísta` / `týsyacha`, lists `stóit` with `zaplatít'` and `zapólnite`, and says
  "`dén'gi` is fresh". `sto` and `stóit` have been L1-M8's since the money module, and `dén'gi` was
  opened by M4 in wave 2. M8 opens rows only for the genuinely new: `dvésti`, `trísta`, `týsyach`,
  `zaplatít'`, `zapólnite` and the paperwork nouns. The brief's own claim that `rubl'` and `rubléy`
  stay L1-M8's is right, and the module writes the rule around them — which is the correction that
  makes the module possible at all.
- **`mózhno` is L2-M1's, not M4's.** The M8 brief says `mózhno` and `nel'zyá` "stay M4's". Only
  `nel'zyá` is M4's; `mózhno` has been L2-M1's since the politeness module — the identical
  correction wave 2 recorded on the M4 brief, repeated in the M8 brief. No row either way, but the
  review should say which module a learner tapping `mózhno` is actually shown.
- **`prishyól` is not taught — nothing below teaches any past of `pri-`.** The M10 brief says
  "`poshël` and `prishël` stay L1's". The index has `poshyól` (L1-M5) and the future `pridú` /
  `pridyót` / `pridyóte` (L1-M6), and **no past-tense `pri-` form anywhere in the course**. This is
  the wave's most consequential correction, and it is the same class as wave 2's third-person
  datives: written to the brief, three accounts would have rested on a word no rung teaches. M10
  opens `prishyól` and `prishlá` as rows, with the note pointing at L1-M5's `poshyól` for the stem.

Five smaller ones, recorded because they are the same class of error and because they are the
course's own spelling law. The briefs print **`témperatúra`** with two acutes (one word carries one
stress: `temperatúra`), **`kashel'`** and **`tabletka`** with none (`káshel'`, `tablétka`),
**`nasmórk`** and **`podpís'`** with the stress on the wrong syllable (`násmork` and `pódpis'` are
both front-stressed), and the M8 brief's **`schët`** and the M10 brief's **`poshël` / `prishël` /
`ushël` / `zashël`** in ë where this course writes `yó` — `schyot` (already L2-M5's, so no row),
`ushyól`, `zashyól`, `prishyól`, and `výshel`, which is front-stressed and takes no `yó` at all. The
M7 brief's **`apték`** is a genitive plural; the row is `aptéka` / `aptéku` / `aptéke`. And the M9
brief's **`Dén' Pobédy`** puts an acute on a monosyllable, which this course does not do: the row is
`Den' Pobédy`.

Two additions the briefs did not name, both forced by a sentence the brief did ask for. M6 opens
**`o`** (with `ob`), because `bespokóyus' o rabóte` is the brief's own fifth pattern and the
preposition had no owner anywhere in the course. M10 opens **`dólgo`**, **`srázu`** and **`tepér'`**
as the "connectors the accounts need" that its note 5 allows for, plus **`opozdál`** (the perfective
twin of L2-M8's `opázdyvayu`, which is what S09's account turns on) and **`vernúlis'`** (the plural
of L2-M10's `vernúlsya` / `vernúlas'`, which had no plural).

### The ratchet

`tools/shown-surfaces.test.ts` holds at **en-ru 20**, unmoved, with the file's eleven tests green,
and this wave — like waves 1 and 2 — produced **no finding at all**:
`npm run content:shown -- en-ru L3-M6` (and M7, M8, M9, M10) each reports
`clean — every shown surface resolves`, with **no RE-TEACH lines and no COLLIDES lines**. Every one
of the 113 surfaces the wave adds (672 → 785) is rowed, and no row in the five re-opens a key an
earlier module owns. The one collision the wave nearly shipped was caught while writing rather than
by the tool: `chúvstvuyesh'` as a form on M6-S05's row and as M6-S10's display at the same time,
which the fold cannot tell apart. It is one row now (see M6 above).

Each module was also held to its own `newWordCap` of 25, counted the way the emitter counts —
`display` plus every entry in `forms`, folded and de-duplicated. The first pass ran M8 to 31 and M9
to 28, and the fix was to drop paradigm cells that no sentence and no variation shows (`nalóga`,
`sróki`, `kvitántsii`, `byváyut`, five unused plural pasts in M10) rather than to raise the cap: a
form nothing displays is index weight a learner cannot reach. The five modules land at 20, 22, 25,
25 and 21.

The audit no tool runs was scripted again over this wave's five modules, covering `display`,
`forms`, `script` and the inline Russian quoted in the English prose — `note`, `trap`, `sound`,
`usage`, `mnemonic`, `mistake.why`, `changed`, `literal` and the rule texts. Three laws, and this
time the sweep **caught one defect**: a Cyrillic `-iya` written in Cyrillic inside M8-S08's `sound`
string, describing the ending of `kvitántsiya` in the script it was explaining. It is Latin now.
That is precisely the homoglyph class the law exists for, and it is the argument for scripting the
sweep rather than reading for it: nothing else in the file would have shown it, and no build stage
looks at `sound`. The other two laws were clean on the first pass — every acute precomposed and
every string NFC, and no polysyllabic token without its acute, counted as vowel runs with `y`
treated as a glide before or after a plain vowel so that `ya`, `yey` and `moy` are scanned as the
monosyllables they are.

### Open questions for the native pass

35. **The dative family as one frame** (M6, rule 0). The wave's first load-bearing claim. Confirm
    that `mne grústno`, `mne stráshno`, `mne skúchno`, `mne stýdno` and `mne spokóyno` are all
    ordinary everyday sentences rather than a set with one or two literary members, and that
    presenting them as the same shape as `mne nrávitsya` helps rather than flattens.
36. **`chúvstvuyu sebyá` with an adverb** (M6, rule 3; S05, S10). Confirm `sebyá` is obligatory in
    ordinary speech, that dropping it really reads as sharp senses rather than as a slip, and that
    `chúvstvuyu sebyá lúchshe` is what a person says the day after being ill.
37. **`vésel` as a short form** (M6-S09). Confirm the short form is what is said of a mood, that
    `vésel` / `veselá` / `vésely` is the everyday paradigm, and that `a on vésel` beside
    `mne obídno` reads as the quiet contrast the trap claims.
38. **`obídno`** (M6-S09). Confirm the reading is closer to "it stings" than to anger, and that the
    dative frame is how a speaker says it about themselves rather than `ya obízhen`.
39. **`bespokóyus' o` plus the prepositional** (M6-S07). Confirm `o rabóte` and `o tebé` are the
    ordinary complements, and that `bespokóyus'` is neither heavier nor lighter than English
    "worried".
40. **The body part as subject** (M7, rules 0 and 1). The module's loudest claim. Confirm that
    `u menyá bolít golová` is the everyday sentence and `moyá golová bolít` really is the odd,
    report-like one, and that `bolyát` with a plural part is as automatic as the rule says.
41. **`k` for people against `v` for places** (M7, rule 2; S04, S07). Confirm `idú k vrachú` and
    `idú v aptéku` are the natural pair, and that `ko mne` is the form for the first person.
42. **The symptom nouns** (M7-S05, S06). Confirm `u menyá temperatúra` already means a raised one,
    that `násmork` covers the ordinary head cold, and that neither takes `yest'` in speech while
    M8's `u menyá yest' kvitántsiya` does.
43. **Duration in the bare accusative** (M7, rule 4; S03). Confirm `bolít uzhé dva dnya` is how a
    patient says it, and that `uzhé` is doing the work English's perfect does rather than adding
    impatience.
44. **`výpil tablétku`** (M7-S10). Confirm Russians drink a tablet rather than take one, and that
    `vzyal tablétku` really reads as picking it up.
45. **The number rule's restart** (M8, rule 0). The wave's other load-bearing claim. Confirm the
    last-digit restart as stated — 21 to `odín rubl'`, 22 to `dva rublyá` — and that teaching it as
    arithmetic rather than as three vocabulary items is the right order for a beginner.
46. **`sto týsyach rubléy`** (M8-S02). Confirm the double application is right and ordinary, and
    that a rent is said this way rather than in a shortened form.
47. **`pódpis'` as feminine** (M8-S06). Confirm `vásha pódpis'` is what a clerk says, and that
    `vash pódpis'` is the error a foreigner makes rather than a regional variant.
48. **`kvitántsiya` against `schyot`** (M8-S08). Confirm the split is as clean as the mnemonic
    claims, and that `schyot` covers a utility bill as readily as L2-M5's restaurant one.
49. **`kotóryy`'s two halves** (M9, rule 0; S01, S06, S07). The module's hardest item. Confirm the
    gender-from-behind, case-from-ahead statement holds with no exception a learner will meet at
    this level, and that `kníga, kotóruyu ya chitál` is the natural example rather than a
    grammarian's one.
50. **Dates in two genitives** (M9, rule 2; S03, S04, S09). Confirm `pérvogo yanvaryá` for the day
    and `pérvoye yanvaryá` for the label, and that a speaker really does hear the difference — the
    module's mistake plates rest entirely on it.
51. **`na` for a festival, and `byváyet`** (M9, rules 3 and 4; S02, S05). Confirm `na Nóvyy god` and
    `na den' rozhdéniya` are the ordinary forms, and that `v yanvaré byváyet khólodno` is the
    habitual reading rather than a hedge.
52. **The festival names, whole** (M9-S02, S09, S10). Confirm `Nóvyy god`, `den' rozhdéniya` and
    `Den' Pobédy` are best learnt unanalysed, that `yólka` belongs to the New Year rather than to
    Christmas, and that the capitalisation this file uses is the ordinary one.
53. **`ránshe` plus the imperfective** (M10, rule 2; S02, S06). Confirm this is genuinely the whole
    of English's "used to", and that `khodíl` and `yézdil` beside `chásto` and `inogdá` are what a
    speaker reaches for rather than a textbook contrast.
54. **The four prefixes, and the accounts** (M10, rule 1; every sentence). The level's exit. Confirm
    `ushyól`, `výshel`, `zashyól`, `prishyól` and `priyékhal` are used as the module uses them — in
    particular that `zashyól v magazín` is a call made on the way — and, more important than any
    single word, that the ten accounts read like a person talking rather than like ten exercises
    with connectors in front.
