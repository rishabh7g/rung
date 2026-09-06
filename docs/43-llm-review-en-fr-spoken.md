# en-fr L1 — spoken French, not textbook French (LLM editorial pass)

**Date:** 2026-09-05 · **Reviewer:** Claude, LLM review, authorised by the repo owner ·
**Bar:** LLM review plus owner authority — the bar the course already shipped on (`#326`–`#331`).
**No native reviewer has read these edits.** This pass changes what the learner is asked to say,
so it is recorded sentence by sentence; every rewrite reverts by file.

---

## Why

The course's stated goal is speaking. An audit of the 100 hero sentences against how a French
speaker actually says them found the grammar sound and the register decisions right (`vous`
throughout, `je veux` rather than `je voudrais`, intonation questions, written `ne … pas`), but a
handful of lines that are grammatical and never said: **`je vais à la maison`** for going home
(the verb is `rentrer`), **`Je veux trois pommes, s'il vous plaît`** framed as how you order
(a counter request has no verb), a film judged with **`Il est très bien`** (a thing is judged with
`c'est`), a sentence-initial **`Puis`** where speech says `et puis`, and **`Je ne pense pas que
c'est cher`** where French negates the clause, not the thinking. Around those, some content was
merely odd — a plan to make coffee tomorrow, a coffee under the table, a kilo of bread — and the
English cues still wrote `I am` where every speaker says `I'm`.

---

## What changed — 9 heroes

**Going home** (M10-S06, plus pool and variations): `Je vais au marché, et puis je rentre.` A new
`rentre` row (forms `rentre · rentrer · rentré`, tag delta) lives on that hero, the first hero
that carries the verb. Being AT home (`à la maison` after `manger`, `rester`, `travailler`) is
untouched. M7-S09's variation is now `Je rentre à la maison` (it still shows the un-contracted
`à la`, and its `changed` says M10 teaches the verb). The two earlier pool items that moved the
speaker home had no `rentrer` row to resolve against, so they were rewritten rather than moved:
M5 `Je ne suis pas allé à la maison` → `Hier je ne suis pas allé à Paris`; M9 `J'ai froid, donc je
vais à la maison` → `J'ai froid, donc je vais rester à la maison`.

**Ordering** (M8-S05): hero and variation swapped — `Trois pommes, s'il vous plaît` is the hero
(cue "Three apples, please"), `Je veux trois pommes` the variation, with a third variation
`Un café, s'il vous plaît`. Trap, mistake, usage, mnemonic and `allowedPatterns` rewritten to
match. M3-S01's usage no longer calls `Je veux un café` "ordering": it says what you want, and
points at `Un café, s'il vous plaît` for the counter. Pool `Je veux cinq pommes, s'il vous plaît`
→ `Cinq pommes, s'il vous plaît`.

**Verdicts** (M10-S08): `Hier j'ai vu un film. C'est un très bon film.` — `très` stays on the hero
(the pool needs it), and the `bon · bonne` row moves from S09 to S08, where the word is now first
met; S09 keeps `prix` and its trap says so. The nonsense variation "a film … too expensive" is
replaced by `C'est un bon film`; the plainest form is `J'ai vu le film. C'est bien.`; the mistake
plate is `un très bien film` (M2's bien/bon split). M10-S04's variation and pool item say `Il est
très bon` of a coffee, not `très bien`.

**Negation placement** (M9-S07 variation): `Je pense que ce n'est pas cher`, cue "I don't think
it's expensive".

**`et puis`** (M10-S06 and its three variations, pool `Je vais au marché, et puis je vais
travailler.`): the `Puis` row becomes `et puis` with forms `et puis · puis`, so a bare `puis` still
resolves. Rule r3 and `allowedPatterns` now name `et puis`.

**Odd content:** M1-S07 variation `J'aime le livre` → `J'aime les livres français`, pool
`J'aime le livre` → `Marc aime les livres` · M2-S03 variation `Ça va bien, et je suis fatigué` →
`Ça va bien, et vous ?` (`mais` is M10's; `et vous ?` is the exchange's real third move) ·
M3-S03 variation `Je veux de la musique` → `Je veux manger de la soupe` (`de l'eau` is M4's) ·
M6-S05 `Ce soir je vais manger` → `Ce soir je vais manger à la maison` · M6-S09 `Ce soir je vais
dormir` → `Je vais dormir` (see "kept on purpose") · M6-S10 `Demain je vais faire du café` →
`Je vais faire du café` — the on-the-spot decision that is said, with `faire` still on the hero;
pool `Demain je vais faire du thé` → `Je vais faire du thé` · M7-S03 `Le café est sous la table` →
`Le livre est sous la table`, variations over `la pomme` · M8-S04 variation and pool `Combien de
pain ?` → `Combien de café ?` (rule r2 and the row note follow), M8-S06 variation and pool `Un kilo
de pain` → `Un kilo de café` · M10-S02 `… Oui, mais je vais rester ici ce soir.` → `Vous allez
travailler demain ? Oui, mais pas ce soir.` (the turn shape is kept; the mistake plate is now
`mais ne pas ce soir`) · M10-S03 `Je veux du café. Je veux du pain aussi.` → `Je veux du café. Et
du pain aussi.` (rule r4 admits a stand-alone add-on) · M10 pool `Le livre est trop cher. Je ne
vais pas acheter le livre.` → `Je ne vais pas acheter le livre. Il est trop cher.`

**Register (no display change):** M3-S07's `ne` note and sound now say that speech drops `ne` —
`Je veux pas de café` is what you will hear — and that the written line keeps both halves.

**Cues:** every `I am` in a cue is `I'm` (24 cues, M1–M2 and M7); `You are tired` → `You're
tired`; `What is your name?` → `What's your name?`. Where the French demands a feminine and the
subject is `vous`, the cue says so: M2-S05 var, M2-S06 hero and two variations, M2-S07 var
"(to a woman)"; M5-S04 `allée` and M9-S08 `contente` already carried "(a woman speaking)". Habit
phrases read as English says them: "I have bread in the morning", "I don't work in the evenings",
"I eat at home in the evenings" (M4 heroes S03/S08, their variations, M4 and M6 pool cues).

**Kept on purpose:** the "Not a problem" list of the audit, untouched — `Je suis de Paris`,
`Vous vous appelez comment ?`, `Vous mangez à quelle heure ?`, `C'est combien ?`, `Ça coûte
combien ?`, `Pourquoi vous êtes fatigué ?`, `Demain matin je travaille`, `La semaine prochaine je
vais à Paris`, `Hier j'ai fait du café`, `Un kilo de pommes, s'il vous plaît`, `Une bouteille
d'eau, s'il vous plaît`, `C'est trop cher`, `Vous voulez venir avec moi ?`, `J'ai vingt ans`,
`Bonjour, Marc`, `donc`, `C'est dix euros, s'il vous plaît`. **M6-S09** is `Je vais dormir`, not
the audit's `Ce soir je vais voir un film`: `dormir` is needed by the M6 pool (`Vous allez
dormir ?`) and by M10-S06's variation, a word row has to sit on a hero that carries it, and every
word of `Ce soir je vais voir un film` is already taught elsewhere, so that sentence would have
been a hero with no row. `Je vais dormir` is what a French speaker says on the way to bed; the
audit's sentence is its first variation. **M10-S02** takes the turn-shaped option of the two the
audit offered (`Oui, mais pas ce soir`) because M10 is the turns module.

---

## Mechanics the pass had to respect

- The word index is cumulative and first-occurrence-wins: `bon` moved S09 → S08 (M10), `Puis` →
  `et puis` with `puis` kept as a form, `rentre` opened on M10-S06. No surface is taught twice.
- Every comprehension-pool token must resolve: 10 pool items rewritten (M1 C05, M5 C07, M6 C09,
  M8 C04/C05/C10, M9 C11, M10 C03/C06/C11), and more had cue-only changes; the build is the
  proof. en-fr's M10 index: 175 surfaces, `maxSpan` 4.
- `complexity.allowedPatterns`: M8 `num + N + , s'il vous plaît`; M10 `, et puis / . Alors`.
- `tools/course-briefs.ts`, en-fr section only: the M8 and M10 pattern lines follow the content,
  and a dated sentence on each module's register/joiner note records the change and points here.
  The joiner list in the section comment now reads `et · mais · aussi · et puis · alors`.
- `src/course/types.test.ts`: untouched — straight apostrophes, `vous`, `neutral` all still hold.

## Gate

`content:validate` 90/90 · `content:build` (en-fr 10 modules, every pool token resolves) ·
`npm run build` · `tsc -b` · lint · 253 tests.

## What the owner is asked to ratify

- The 9 hero rewrites, their variations, mistakes and notes, and the cue pass:
  `git diff 80be7c1 -- content/en-fr/`.
- The two brief revisions (M8 counter request without a verb; M10 `et puis` and `rentrer`) — a
  future en-fr level should follow this pass.
- The one deliberate deviation from the audit (M6-S09 `Je vais dormir`).
