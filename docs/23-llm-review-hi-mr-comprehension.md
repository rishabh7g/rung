# LLM review — hi-mr, the comprehension-pool growth pass

**This is an LLM review, not a native pass.** The author and reviewer is Claude (Fable 5), which
does not speak Marathi natively and cannot hear anything. `verified: true` on all ten hi-mr modules
still rests on the repo owner's authority, exactly as the earlier hi-mr reviews say; each of the
ten was re-read whole here — rules, complexity envelope, word rows, sentences, existing pools —
before its four new items were authored, and each carries `verifiedAt: "2026-08-24"` with this
pass's signature (the stamp already read 2026-08-24 from #286 the same day, so the re-review adds
no diff line of its own). **No native Marathi speaker has read a word of this course**, and the
open questions at the bottom continue `docs/08-marathi-third-review.md` (1–22),
`docs/15-llm-review-hi-mr-surfaces.md` (23–30) and `docs/19-llm-review-hi-mr-variations.md`
(31–40).

This is issue **#290**. Every hi-mr comprehension pool grew from 8 items to 12 — four appended per
module (`C09`–`C12`, 40 across the course), because pool size IS the retry budget
(`src/engine/comprehension.ts`: a retry excludes everything already used until the pool exhausts;
at 2 items an attempt, 12 items is 6 fresh attempts where 8 was 4). **Nothing else moved**: no
sentence, no variation, no word row, no rule, no existing pool item was deleted or reworded — the
diff inside each module is four appended pool items, exactly 20 lines each.

## Method

Every new item was authored **from the module's own cumulative surface set** (26 → 47 → 67 → 105 →
135 → 151 → 172 → 194 → 212 → 215 keys) and checked through the emitted
`public/content/hi-mr/index/L1-M*.json` before the build ever saw it: every token of all 40
displays resolves in the index of its own module. `checkComprehensionPool` — the build's gate —
then confirmed it: `npm run content:build` reports **zero pool warnings**, before and after.

Three freshness rules were enforced course-wide, not per module:

- **No new item equals any hero sentence of the course** (compared case-insensitively; Devanagari
  has no case, so this is trimmed exact-string equality). hi-mr had no hero-echoing pool items
  before this pass, and still has none — now pinned by a test (below).
- **No new item duplicates any existing pool item** of any module.
- **No two new items are the same sentence.**

Cues follow the course's Hindi conventions already on file: nukta spellings (कॉफ़ी, रोज़, ज़रूर,
ग़ुस्सा, सब्ज़ी, बाग़), दीजिए for द्या, थैला for पिशवी, महँगा/महँगी bending where Marathi महाग
does not, and ergative मैंने/मुझे frames where the Marathi is object-agreeing.

## What the four items test, per module

Each quad was chosen to exercise the module's own lesson on fresh recombinations — agreement made
visible, not bare noun swaps.

### L1-M1 — Who I am

`मला भात आवडतो` · `मला भारत खूप आवडतो` · `मला मराठी भाषा खूप आवडते` · `मला हिंदी संगीत आवडतं` —
the liking frame across all three genders (भात/भारत m → आवडतो, भाषा f → आवडते, संगीत n → आवडतं),
with खूप in both positions the heroes use it. भारत and भाषा step out of their hero frames
(माझा देश भारत आहे / माझी भाषा …) into the dative one.

### L1-M2 — First exchange

`तुझा देश भारत आहे का?` · `तुला कॉफी आवडते का?` · `तू कशी आहेस?` · `मी बरा आहे, धन्यवाद` — the
statement-plus-का rule over M1 material (possession, liking), the feminine कशी the heroes never
ask (they ask कसा and answer बरी), and the masculine thanks-reply completing the बरा/बरी pair the
module teaches as subject agreement.

### L1-M3 — Needs and wants

`मला थोडी साखर हवी` · `मला आता चहा नको` · `तुला कॉफी प्यायची आहे का?` · `मला हिंदी शिकायची आहे` —
थोडी (f) at last on screen (the pool had only थोडं/थोडा), नको with a time word, and the V-आयच-
object agreement flipped to feminine objects (कॉफी प्यायची, हिंदी शिकायची) where the heroes show
masculine and neuter.

### L1-M4 — My day

`मी रोज लवकर उठते` · `तू दुपारी काय करतोस?` · `मी रात्री भात खातो` · `तुम्ही कधी उठता?` — the
habitual endings across the person table: feminine -ते, informal -तोस under a mid-sentence काय,
masculine -तो, and polite -ता in a bare कधी question (the pool's only तुम्ही line was a का
question).

### L1-M5 — Yesterday

`मी काल दूध प्यायलं` · `तू काल लवकर उठलीस का?` · `मी काल दुपारी भात खाल्ला` · `मी काल संगीत ऐकलं
आणि लवकर झोपले` — object agreement completes its gender set (दूध n → प्यायलं), the feminine
तू-past -लीस gets its first question, and the last item runs M5's whole seam in one breath:
object-agreeing ऐकलं beside subject-agreeing feminine झोपले.

### L1-M6 — Tomorrow

`मी उद्या हिंदी शिकणार आहे` · `तू उद्या काय खाशील?` · `मी उद्या दुपारी घरी जाणार आहे` · `तू उद्या
नक्की येशील का?` — the plan form -णार on fresh material, and the promise form's तू shapes खाशील /
येशील (taught, shown only in variations until now) in questions, नक्की riding the promise exactly
as the rules place it.

### L1-M7 — Where things are

`पिशवीत पुस्तक आहे` · `माझा फोन खोलीत आहे` · `तुझी बाटली कुठे आहे?` · `बाग दुकानाजवळ आहे` — the
place-leads order on a fresh pair, -त on खोली, possessive agreement on both genders (माझा फोन,
तुझी बाटली), and -जवळ with its roles flipped against the hero (दुकान घराजवळ → बाग दुकानाजवळ).

### L1-M8 — Numbers & shopping

`ही भाजी कितीला आहे?` · `मला दोन किलो भात द्या` · `मला अर्धं केळं द्या` · `कॉफी शंभर रुपये आहे` —
the pointer completes its price-question set (ही f beside the pool's हे/हा), दोन enters the buying
frame, अर्धं (n) agrees with केळं where the pool had only अर्धा किलो, and the flat price frame
takes a hundred-rupee coffee.

### L1-M9 — Feelings & opinions

`मला राग आला, म्हणून मी घरी गेले` · `तुला कॉफी का आवडते?` · `हे पुस्तक छान आहे, म्हणून मला आवडतं`
· `चहा महाग आहे, म्हणून मला चहा नको` — राग finally drives a म्हणून consequence (it had no pool
line), mid-का over feminine agreement, and two म्हणून items whose first clause is M7/M8 material —
the cross-module recombination this course is for.

### L1-M10 — Connected talk

`तुझं पुस्तक कुठे आहे? माझं पुस्तक पिशवीत आहे.` · `तुला भूक लागली का? हो, मला थोडा भात द्या.` ·
`तुम्ही उद्या येणार का? हो, आम्ही नक्की येऊ.` · `आपण कधी भेटू? आपण उद्या संध्याकाळी भेटू.` — four
two-sentence turns in the module's own format. The third is the course's first **आम्ही** on a pool
item — asked तुम्ही, the answer excludes the asker, which is exactly the आपण/आम्ही lesson — and
the fourth keeps आपण inclusive in both halves.

## Verification

- all 40 displays token-checked against the emitted per-module indexes: **40/40 resolve**, and
  `npm run content:build` reports **no pool warnings** (`checkComprehensionPool` green)
- `public/content/hi-mr/index/*.json` before vs after the rebuild: **byte-identical, 10/10 files**
  (`md5sum -c`) — pools are validated against the index, never indexed, so no pre-existing key
  moved and none was added; `maxSpan` unchanged (1 throughout)
- new pin in `tools/content-build.test.ts`: every hi-mr pool ≥ 12 items and **no pool item echoes
  a hero sentence** — the file's suite is 82/82
- `scripts/verify.sh` → `TYPES ok | LINT ok | TEST 1332/1332 ok | CONTENT ok | FONTS ok | BUILD ok | BUDGET ok`
- `npm run budget` → `course:hi-mr` **344.6 → 345.3 KiB** gzip (precache:hi-mr 559.2 → 559.9) —
  the 40 Devanagari items cost ~0.7 KiB gzip, recombined-from-taught-words text compressing almost
  entirely away; no budget ceiling was touched by this pass

## Open questions for a native pass

These are this pass's own calls. Nothing below blocks shipping; numbering continues from
docs/19 (31–40).

41. **`मी बरा आहे, धन्यवाद`** (M2-C12) — one vowel from the hero `मी बरी आहे, धन्यवाद`. The flip
    IS the lesson (बरा/बरी follows the speaker), but does an item this close to a hero test
    parsing or recognition?
42. **`मला अर्धं केळं द्या`** (M8-C11) — grammatically the point (अर्धं agreeing with केळं), but
    is asking for half a banana a request anyone makes, or should the neuter half find a
    different noun?
43. **`कॉफी शंभर रुपये आहे`** (M8-C12) — café-priced coffee beside the heroes' ten-rupee chai: a
    real 2026 price, or should pool prices stay market-cheap for coherence?
44. **`आपण कधी भेटू? आपण उद्या संध्याकाळी भेटू.`** (M10-C12) — आपण repeated in the answer because
    L1 avoids pro-drop it has not taught. Natural at this rung, or stilted enough to want the
    subject dropped?
45. **`मी काल संगीत ऐकलं आणि लवकर झोपले`** (M5-C12) — object-agreement then subject-agreement
    across one आणि. The exact seam M5 teaches, but is the feminine reading of `झोपले` after a
    neuter `ऐकलं` comfortable without context?
46. **`हे पुस्तक छान आहे, म्हणून मला आवडतं`** (M9-C11) — the liked thing dropped in the second
    clause (`मला आवडतं` = "I like it"). Clean Marathi, or does L1 want the noun repeated?
47. **`तुला भूक लागली का? हो, मला थोडा भात द्या.`** (M10-C10) — a yes answered with a request.
    A natural turn at a table, or does the pivot from question to imperative jar?
48. **`तुम्ही कधी उठता?`** (M4-C12) — the polite when-question with no time anchor. Ordinary
    small talk, or abrupt enough to want सकाळी in it?
