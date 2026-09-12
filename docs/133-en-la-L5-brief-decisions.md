# en-la L5 — the brief decisions (#650)

**Date:** 2026-09-12 · **Course:** en-la — English (L1) → Latin (L2) · **Level:** 5 "Voice — your own
words, at length" · **Status:** briefs written, no content authored. The ten `ModuleBrief`s live in
`tools/course-briefs.ts` under `COURSE_BRIEFS['en-la']`, and the course-wide reasoning is in that
file's header section, "## en-la L5: the decisions, taken against the finished L4 (#650)".

This is the **last** level of the eleventh course, and the briefing of en-la is complete with it.

---

## 0. The index the level was planned against

**624 surfaces through L4-M10, `maxSpan` 1**, folded across all forty emitted files:

```
L1: 189    L2: 141    L3: 149
L4:  17 + 6 + 36 + 7 + 14 + 14 + 20 + 21 + 5 + 5 = 145
                                          total  = 624
```

Confirmed live: `npm run content:prompt -- en-la L5-M1` reports
`PROMPT .prompts/en-la-L5-M1.md ok (624 surfaces through L4-M10)`.

---

## 1. This is the one L5 in the file whose learner already owns the content

No other course can say it. An English speaker arrives at L5 of en-la already knowing `carpe diem`,
`festīnā lentē` and `ālea iacta est` **without knowing a word of Latin**. So M1's job is not to teach
the sayings but to make them **parse**: `carpe` is L2-M5's imperative shape, `diem` is its object, and
forty rungs of ladder let a learner take one of these phrases apart for the first time.

The brief states it as a rule about the module's shape: **the pleasure is recognition and the work is
analysis.** A module that merely lists the sayings has wasted the one advantage this level has.

---

## 2. A saying is written in the course's orthography, and that costs a spelling the learner knows

`docs/123` requires a macron on every long vowel, so M1 writes `ālea iacta est` — and what the learner
has seen on a mug, a film poster and a coat of arms is `alea iacta est`.

Run against the real `src/engine/surface.ts`:

```
normalizeSurface('ālea') -> 'ālea'
normalizeSurface('alea') -> 'alea'
```

**Rule 4 folds case and never a diacritic**, so the two spellings are **two keys for one word**.
Writing both would put two rows in the index for one saying, and a learner tapping one would be shown
a note about the other — the same defect L4-M7's `SPQR` decision avoided by the same reasoning.

**The decision:** the course writes the **macroned form only**, and every such note names the
unmacroned spelling in prose, so the learner can connect what they read here to what they have seen
everywhere else. This is the third time this course has taken that shape of decision, after `ēsse`
(L2-M5, one bar from `esse`) and `SPQR` (L4-M7).

### 2.1 Each saying's source register is named

`carpe diem` is Horace. `festīnā lentē` is Suetonius quoting Augustus. `ālea iacta est` is Caesar as
Suetonius reports him. `in vīnō vēritās` is proverbial and late. **`requiēscat in pāce` is
ecclesiastical and belongs to M4, not M1** — a saying and a liturgical formula are different things and
the course keeps them in different modules. A saying a learner cannot place is a saying they cannot
use, and placing it is half of knowing when.

---

## 3. Humour is Plautine, not Martial

Latin's two surviving comic voices are very far apart: **Plautus** is broad, affectionate and full of
abuse a friend would take; **Martial** is precise and often cruel. This course writes the **Plautine
end** — teasing a friend rather than humiliating a stranger, nothing that needs a footnote, and no
obscenity — and M2 says so in a usage line, because a learner who has read that Latin comedy is filthy
will otherwise expect the module to go somewhere it does not.

The ironic superlative costs nothing at all: L2-M9 taught `-issimus` and said it means "most" and
"very", and `optimē!` of something gone wrong means the opposite — L1-M2's word, used sarcastically
forty rungs later, which is exactly what an L5 should be able to do.

---

## 4. The vocative arrives at M2, as a joke

L2-M7 wanted `Mārce` for a telephone call and could not have it; `docs/127` §4 named the gap and every
level since has repeated it. **M2 is its owner**, because mock address is where a vocative is most
audible — `ō Mārce!` — and a module about teasing can afford a shape a module about phoning could not.

`Mārce` is a **new key and a new row**: `Mārcus` is L1-M1's and a vocative is a different surface, so
it needs its own row with a note back at the first teach. **M4's formal address is its second use**,
and a case whose whole job is tone is honestly taught by showing both ends of it in one level.

---

## 5. "How they say it there" is a tradition, not a place

Latin has **no home vernacular** — which en-sa's L5 had to say of Sanskrit and en-ar's of Arabic. What
it has instead is two axes, and M3 teaches both:

- **Three living pronunciation traditions**: restored classical (`c` as k, `v` as w, `ae` as "eye"),
  ecclesiastical (`c` as ch before e and i, `v` as v, `ae` as "ay"), and the national school
  traditions, of which the English one is the strangest.
- **A register spectrum across a thousand years**: Plautine, Ciceronian, Vulgar.

**The mechanism: `display` stays in this course's tradition and `sound` is where the variants live.**
One sentence, one spelling, and a `sound` line naming what each tradition does with it — so nothing in
the emitted index changes and **no key is spent on a variant**. An author who writes two displays for
two traditions has minted two keys for one sentence.

`docs/123`'s macrons are the course's **orthography** and not a claim about pronunciation, and M3's
note says so explicitly. Vulgar Latin gets its one visible feature written — `dē` plus the ablative
where a classical writer would use a case ending — because that is the change every Romance language
is built on, and a learner who has met French or Spanish will recognise it instantly.

---

## 6. The last two constructions the course owes

- **The ablative absolute → M6.** L4-M2 wanted it for "given that" and L4-M4 for a concession. Two
  words in the ablative doing an English clause's work, with no verb and no conjunction: **the case is
  the connection**. Taught with a participle the course already has and one fixed pair, declining
  nothing new.
- **The indirect question → M7.** L4-M5's `haud sciō an` only looked like one. `quaerō quid agās` takes
  a **subjunctive** where English keeps the indicative, which is the whole of the difference and the
  reason it waited for a level whose learner is fluent in the mood.

After these two, **this course owes nothing**.

---

## 7. Two more homographs, and the same remedy

`ut` as "as" (M1's `ut dīcitur`) and `quod` in `quod sī` (M6) are both readings this course has refused
for forty rungs: `ut`'s key is L3-M4's purpose reading and `quod`'s is L1-M9's "because". Where a
module needs one, **its row names both readings** — which is L4-M6's `cum` remedy, now used for the
third and fourth time.

The brief also states the price plainly: **if a module cannot afford that note, the phrase is not worth
the key.** That is the first time this course has written the refusal condition rather than the
remedy.

---

## 8. M10 changes register in three places at once

Four sentences in one register and four in another — Ciceronian to Plautine is the sharpest pair,
classical to ecclesiastical the other option — with a **hinge sentence that names the turn**: `at`
(M6's objection word, first in its clause) or `sed quid dīcam?` (M7's mood).

The switch shows in **vocabulary, sentence length and word order**; the `sound` lines carry the
pronunciation; **`display` never moves**, which is M3's mechanism unchanged. **Switching silently is
the one thing that does not work**, because a learner reading eight sentences will take an unannounced
change for an inconsistency rather than a choice.

And the cap goes almost entirely unspent. Fifty modules of ladder, and a register that needs a word the
course has not taught is a register being pushed further than the course can support — the same
discipline L2-M10, L3-M10 and L4-M10 each kept at four, eight and six sentences.

---

## 9. What L5 withholds

Nothing structural is left, so the withholdings are all matters of register and taste:

- **Verse of any kind.** M9 retells a Phaedrus fable in prose and names the fabulist; a hexameter in
  `display` would be a register this course has never taught.
- **Anything from Martial that needs a footnote**, and obscenity of any kind (§3).
- **A second `display` for a pronunciation variant** (§5), and any claim that one tradition is correct.
- **Any liturgical formula beyond `requiēscat in pāce`** (M4), and any theological claim the course
  cannot support (M5).
- **`quārē`**, whose key would carry a reading `quia` already covers; **`-tiō` abstracts**, which would
  be a third suffix for one job; **`quōmodo`** as one word, since M8 writes the two-word form.
- **`vōs`**, which L2-M1 banned course-wide. M4's formal occasion is the last place it could be
  smuggled back and its note forbids it.

---

## 10. Open questions this level inherits and adds

Standing: the ninety-four in `docs/123` §11, `docs/124` §6, `docs/125` §5, `docs/126` §6, `docs/127`
§6, `docs/128` §1.7/§2.7/§3.7, `docs/129` §7, `docs/130` §1.7/§2.8/§3.8, `docs/131` §8 and `docs/132`
§1.7/§2.9/§3.9 — all still unanswered, because the gate is a fluent speaker of living Latin and that
reader has not seen the course. Added by these briefs:

1. **Is writing `ālea` rather than `alea` right?** §2 argues the index forces it and the note names the
   familiar spelling. A teacher may say a saying is a quotation and should be spelled as it is
   received, macrons or not — which would mean the course's own orthography does not apply to quoted
   material, and that is a decision with consequences beyond this module.
2. **Is the Plautine end the right choice for humour**, or does teaching teasing without Martial leave
   the learner unable to read the funniest Latin there is?
3. **Should M3 teach three pronunciation traditions at all**, when the course has no audio and every
   `sound` line is prose? It may be the most useful module in the level or the most theoretical.
4. **Is `virtūs` teachable in one module?** M5 states the Roman meaning and the English one side by
   side and chooses neither, which may be the honest answer or an evasion.
5. **Does the ablative absolute belong at M6 or M9?** A structured argument wants it and a retold fable
   wants it more, and M6 has the rest of the argumentative apparatus to carry.
6. **Is a register switch inside eight sentences a real skill or an exercise?** A Roman moved between
   registers by writing to different people, not by turning mid-piece. M10 may be teaching a thing
   nobody does.
