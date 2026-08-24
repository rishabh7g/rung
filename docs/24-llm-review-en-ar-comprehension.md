# LLM review — en-ar, the comprehension-pool growth pass

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Fable 5), which
does not speak Arabic natively and cannot hear anything. `verified: true` on all ten en-ar modules
still rests on the repo owner's authority, exactly as the five earlier en-ar reviews say; each of
the ten was re-read whole here — rules, word rows, notes, traps, sentences, variations and pools —
and every one already carried `verifiedAt: "2026-08-24"` with this signature from the same-day
third-variation pass (#287, `docs/20-llm-review-en-ar-variations.md`), so this pass re-affirms the
stamp rather than moving it. **No native Arabic speaker has read a word of this course**, and the
open questions at the bottom continue docs/20's numbering, joining the 79 already outstanding
across `docs/07`, `docs/09`, `docs/10`, `docs/16` and `docs/20`.

This is issue **#291**. Going in, every en-ar module held **8** comprehension items; coming out,
every module holds **12** — 40 new items (`C09`–`C12` in each of `L1-M1.json` … `L1-M10.json`),
120 in all. At comprehendCount 2 that moves a retry from three fresh deals to **six** before the
draw recycles (`src/engine/comprehension.ts`: pool size IS retry freshness). **Nothing else
moved**: no sentence, no variation, no word row, no rule, no existing pool item was deleted or
reworded — the diff inside each module is appended pool objects only, and
`public/content/en-ar/index/*.json` rebuilt before and after is **byte-for-byte identical**
(pools are never indexed; `content-build` indexes what is taught, never what is quizzed).

## Method

Every pool token must resolve in the module's own cumulative index — `checkComprehensionPool` in
`tools/content-build.ts` fails the build otherwise — so every new item was authored **from the
module's own cumulative surface set** (27 → 52 → 73 → 104 → 135 → 168 → 195 → 224 → 263 → 283
keys) and swept through the real engine (`matchSurfaces` + `tokenizeSurface`,
`src/engine/surface.ts`) against the emitted index. The greedy-match seams docs/16 recorded were
honoured, not re-litigated:

- **`fī` is not a bare key until M7**, so before M7 it appears only inside the indexed two-token
  phrases (`fī aṣ-ṣabāḥ`, `fī al-layl`, `fī al-masāʾ`, `fī al-bayt`) — never `fī as-sūq` in an
  M5 item;
- **two-token surfaces are used whole** (`kull yawm`, `masāʾ al-khayr`, `al-usbūʿ al-qādim`,
  `fī raʾyī`, `ilā al-liqāʾ`) — their bare halves (`kull`, `baʿd`, `raʾyī`) are not keys;
- **the docs/16 lockouts stay locked**: nothing goes near `marḥaban` or `ṣabāḥ an-nūr`, so `an`
  still belongs to M3-S03's own row and no key moves.

**Freshness is held one notch stricter than the issue's letter.** The acceptance criterion bans
items that equal a **hero sentence**; this pass additionally kept all 40 new items distinct from
all **298 variation lines** and from all **80 existing pool items**, course-wide and
case-insensitively through the shared normaliser. That extra clause did real work: the first
draft had **10 collisions with variation lines** (the #287 pass had already spent the obvious
recombinations — `ismuka Rohān`, `anā saʿīda`, `ayna al-miftāḥ?`, `ʿindī sayyāratān`,
`limādhā anta ghāḍib?` and five more), and all ten were re-authored into strings the learner has
never seen on any screen. Existing pool items keep their historical overlaps with variations
(e.g. M1-C01 `ismuhu Rohān`); this pass touches nothing it did not add.

A codepoint audit proved every character in the new `display`, `script` and `cue` lines already
occurs in en-ar content — no romanization drift, no new glyph for the font subset.

## The 40 items, and what each one deals

Every item carries the romanized `display` (the course's ALA-LC-flavoured scheme,
`content/courses.json`) and an Arabic `script` line, like every surface in the course.

### L1-M1 — Who I am
| id | display | deals |
|---|---|---|
| C09 | ismuhu Rohān wa yuḥibb al-qahwa | third-person name + liking joined with wa, all about someone else |
| C10 | anā saʿīda wa uḥibb al-qahwa | feminine -a predicate ahead of an uḥibb clause |
| C11 | tuḥibbīn al-mūsīqā | the feminine -īn cell (#283's cluster) with the other liked thing |
| C12 | uḥibb al-qahwa wa al-mūsīqā | one verb, two coordinated al- objects |

### L1-M2 — First exchange
| id | display | deals |
|---|---|---|
| C09 | masāʾ al-khayr, kayfa ḥāluki? | the evening twin chained to the to-a-woman question |
| C10 | hal anta mudarris? | hal + masculine profession — S08/S09's nouns turned on the listener |
| C11 | anā mudarris wa uḥibb ash-shāy | statement relief among the questions; M1's wa carries M2 vocabulary |
| C12 | hal tuḥibbīn al-qahwa? | feminine -īn inside a hal question, generic al- kept (the module's own interference trap) |

### L1-M3 — Needs and wants
| id | display | deals |
|---|---|---|
| C09 | urīd al-ʿaṣīr faqaṭ | al- pointing at the particular thing, trimmed with faqaṭ |
| C10 | urīd an ashrab al-ḥalīb | the an-bridge with the one drink the heroes never put after it |
| C11 | as-sayyāra kabīra jiddan | sun-letter as- subject + agreeing feminine adjective + jiddan |
| C12 | hal turīdīn al-ʿaṣīr? | feminine -īn want, definite object |

### L1-M4 — My day
| id | display | deals |
|---|---|---|
| C09 | yashrab al-qahwa fī aṣ-ṣabāḥ | he-form against the hero's I-form, same time phrase |
| C10 | matā tadhhab ilā al-madrasa? | matā over the going verb instead of the drinking one |
| C11 | tadhhabīn ilā al-ʿamal kull yawm | the feminine -īn cell of dhahaba with kull yawm |
| C12 | ashrab al-ḥalīb fī al-layl | milk moved into the night slot |

### L1-M5 — Yesterday
| id | display | deals |
|---|---|---|
| C09 | dhahaba ilā al-maṭʿam ams | third-person past + the restaurant, ams trailing |
| C10 | hal sharibta al-qahwa fī aṣ-ṣabāḥ? | -ta past inside hal, with M4's time phrase |
| C11 | kuntu fī al-bayt maʿa Rohān | kāna sentence + maʿa companion |
| C12 | hal akalti al-fākiha? | the feminine -ti past the pool never dealt |

### L1-M6 — Tomorrow
| id | display | deals |
|---|---|---|
| C09 | sa-nashrab ash-shāy fī al-masāʾ | we-future + M4's evening phrase |
| C10 | sawfa akūn fī al-bayt ghadan | sawfa (not sa-) over akūn — the two future markers stay distinct |
| C11 | hal sa-tadhhabīn ilā al-madrasa ghadan? | the feminine sa-…-īn cell inside a question |
| C12 | sa-yakūn mashghūl al-usbūʿ al-qādim | he-future + the busy adjective + next-week phrase |

### L1-M7 — Where things are
| id | display | deals |
|---|---|---|
| C09 | ayna al-maṭʿam? | ayna over a place noun the module never asks about |
| C10 | baytuhu amām al-madrasa | -hu possession (the pool only had baytī) + amām |
| C11 | al-qahwa ʿalā aṭ-ṭāwila | a drink on the table — ʿalā with a non-book subject |
| C12 | hunāka maṭʿam qarīb min baytī | existence + qarīb min chained onto a possessed noun |

### L1-M8 — Numbers & shopping
| id | display | deals |
|---|---|---|
| C09 | bi-kam al-khubz? | bi-kam aimed at a named noun, not hādhā |
| C10 | hunāka sayyāratān amām al-bayt | the dual inside M7's existence frame — cross-module recombination |
| C11 | hādhā al-kitāb ghālī | demonstrative + noun as subject, price adjective as predicate |
| C12 | ashtarī al-ḥalīb min as-sūq | the buying verb with the one staple the pool never bought |

### L1-M9 — Feelings & opinions
| id | display | deals |
|---|---|---|
| C09 | anā saʿīd li-ʾanna al-jaww jamīl | a HAPPY li-ʾanna — the pool's becauses were all grievances |
| C10 | limādhā anta saʿīd? | limādhā turned on a positive feeling |
| C11 | fī raʾyī, hādhā sahl | the opinion frame over the easy judgement |
| C12 | anā ḥazīn bi-sabab al-ʿamal | bi-sabab + noun with a feeling, not a cancelled plan |

### L1-M10 — Connected talk
| id | display | deals |
|---|---|---|
| C09 | yatakallam al-ʿarabiyya qalīlan | the he-cell of takallama the screens never show |
| C10 | sa-ākul, thumma sa-ashrab al-qahwa | thumma sequencing two first-person futures |
| C11 | hal tadhhabīn maʿī ilā as-sūq? | the invitation frame in the feminine, aimed at the market |
| C12 | sa-adhhab ilā al-bayt. ilā al-liqāʾ! | plan + the S10 farewell, two sentences like the module's heroes |

## Calls this pass had to make

1. **Freshness beyond the letter** (argued in Method): new items collide with nothing shown
   anywhere in the course, though the issue only bans hero equality. Ten first-draft items were
   re-authored for it — and two more in M1 for length, because every new item also respects its
   module's declared `complexity.maxWordsPerSentence`, which no tool enforces on pools but every
   authored pool item honours.
2. **Script conventions mirrored, not improved.** No case tanwīn on predicates
   (`سيكون مشغول` follows hero `سأكون مشغول`); adverbial tanwīn written where the course writes
   it (`جدًا`, `غدًا`, `قليلًا`); `wa` attached (`وأحب`, `وأنا`); past-tense `-ta`/`-ti` left
   undiacritised (`هل شربت`, `هل أكلت`) exactly as pool precedent `هل كنت تعبانة أمس؟` — the cue's
   "(to a man)/(to a woman)" carries the disambiguation; enclitic `-ka`/`-ki` on nominals keeps
   its vowel sign (`اسمكَ`-class) per the pool majority; `ghālī` keeps docs/10's declared
   pause-form spelling.
3. **Definiteness kept doctrinal.** Generic liking keeps `al-` even inside questions
   (`hal tuḥibbīn al-qahwa?` — M1's interference rule); requests stay indefinite where the module
   taught them so; `urīd al-ʿaṣīr faqaṭ` and `hal sharibta al-qahwa …?` point at a particular
   thing on purpose, and their cues say so.
4. **The count is pinned, exactly.** `tools/content-build.test.ts` now asserts every en-ar module
   holds exactly 12 pool items, each with both `display` and `script`, and that no pool item
   equals a hero sentence through the shared normaliser — so the next growth pass moves the pin
   deliberately, and a hero-retelling item cannot land silently.

## Verification

- pool sweep through the real engine, per module against its own cumulative index: **120/120
  items resolve, zero misses** — `npm run content:build` reports **no pool warnings**
- freshness audit: 0 items equal a hero, a variation line, or another pool item (case-insensitive,
  shared normaliser); every module at exactly 12; every item carries both `display` and `script`
- codepoint audit: every character in the new lines already occurs in en-ar content
- `public/content/en-ar/index/*.json` before vs after `npm run content:build`: **byte-identical**
  (0 keys lost, 0 moved, 0 added; `maxSpan` unchanged — pools are never indexed)
- `npm run content:validate` → **CONTENT 40/40 ok**
- `scripts/verify.sh` → `TYPES ok | LINT ok | TEST 1332/1332 ok | CONTENT ok | FONTS ok | BUILD ok | BUDGET ok`
- Payload, measured: `course:en-ar` **114.6 → 115.5 KiB** gzip against 360, `precache:en-ar`
  329.1 → **330.1 KiB** against 590; shell and the other three courses unmoved by this change

## Open questions for a native pass

Numbering continues docs/20's list (which ended at 18); these six join the 79 already outstanding
for en-ar, for 85 in all.

19. **`masāʾ al-khayr, kayfa ḥāluki?`** (M2-C09) — the greeting chained straight into the
    question. In live speech the greeting usually earns its fixed reply before anything else; is
    the chain natural, or does it read as talking over the answer?
20. **`hal sharibta al-qahwa fī aṣ-ṣabāḥ?`** (M5-C10) — definite `al-qahwa` meaning "the coffee
    (you were going to have)". Natural anaphora, or would a native drop the article in a
    did-you-drink question?
21. **`sa-yakūn mashghūl al-usbūʿ al-qādim`** (M6-C12) — the caseless time phrase follows hero
    precedent (`sa-adhhab ilā as-sūq al-usbūʿ al-qādim`), but here it trails a predicate
    adjective; strict MSA wants `mashghūlan al-usbūʿa al-qādima`. Does the double pausal read as
    the course's register or as an error?
22. **`hunāka sayyāratān amām al-bayt`** (M8-C10) — docs/20's [16] asked about
    existence + counted noun + place order; the dual version re-poses it. Would a native front
    `amām al-bayt`?
23. **`anā ḥazīn bi-sabab al-ʿamal`** (M9-C12) — "sad because of the work". Is bare `al-ʿamal`
    enough, or does the sentence want *kathrat al-ʿamal* ("too much work") to sound like a real
    complaint?
24. **`sa-adhhab ilā al-bayt. ilā al-liqāʾ!`** (M10-C12) — the leaver says `ilā al-liqāʾ`, which
    S10's note allows either side to say — but docs/20's [18] records the unresolved seam over
    who says which farewell. The same ruling should settle this item.
