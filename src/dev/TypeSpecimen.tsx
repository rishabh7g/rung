/**
 * `/dev/type` — the font specimen (#85). **Development only**, and the one file in `src/` that
 * is allowed to carry a course's script (`src/shellPurity.test.ts`).
 *
 * Bundling a face is not the same as the face rendering. Mukta can be in `dist/`, `--font-devanagari`
 * can name it, and a conjunct can still come out as a box because the weight was never bundled,
 * the subset was wrong, or the token resolved to `system-ui` behind everyone's back. This page is
 * where that is looked at: the ramp's four Devanagari sizes × the three weights the ramp renders
 * (#113 trimmed the rest), the romanization diacritics the PRD singles out for Barlow [D15], and
 * the uppercase kickers with their tracking.
 *
 * Three rules it keeps:
 *
 *   • **It ships nowhere.** `typeRoute.tsx` imports this file dynamically, inside an
 *     `import.meta.env.DEV` branch, so a production build never puts the module in the graph at
 *     all — no chunk, no CSS, no strings, verified by grepping `dist/`. That is why the specimen
 *     text below is safe: it cannot reach a learner's build.
 *   • **Tokens only, like everything else** (docs/design-contract.md rule 1). Every size comes
 *     from the ramp token that owns it — 18px is `--devanagari-min-size`, the body-role floor —
 *     so what is on screen is what the product will render, not a specimen's idea of it.
 *   • **The words are chosen, not sampled.** ळ is Marathi's own letter, क्या/त्या/विद्यार्थी/कृपया/र्क
 *     are the conjunct and reph shapes a Devanagari face gets wrong first, and माझं/आवडतं carry the
 *     candrabindu — the four things that break at 18px if they break at all.
 *
 * It renders below `CourseProvider` like every other route, so it needs the content boot to have
 * finished — a font question and a content question stay separable because this page reads no
 * course content at all: the specimens are its own.
 */
import styles from './TypeSpecimen.module.css';

/**
 * The Devanagari specimen, per #85: Marathi's ळ alone and in words, the conjuncts (क्या, त्या,
 * विद्यार्थी, कृपया), the reph र्क, a long vowel दूध, an anusvara संगीत, the candrabindu माझं/आवडतं,
 * and two everyday words काल/उद्या.
 */
const DEVANAGARI = [
  'ळ',
  'कळ',
  'बाळ',
  'क्या',
  'त्या',
  'विद्यार्थी',
  'कृपया',
  'र्क',
  'दूध',
  'संगीत',
  'माझं',
  'आवडतं',
  'काल',
  'उद्या',
] as const;

/** The ramp's Devanagari sizes, each named by the token it comes from. */
const SIZES = [
  { px: 18, className: styles.s18, token: '--devanagari-min-size (body-role floor)' },
  { px: 22, className: styles.s22, token: '--text-l2-list' },
  { px: 26, className: styles.s26, token: '--text-l2-card' },
  { px: 32, className: styles.s32, token: '--text-l2-hero' },
] as const;

/** The ramp's Mukta weights — 400 (cue), 600 (card/list), 700 (hero). 500 was headroom no token
    ever asked for and #113 trimmed it from the bundle; a row for it here would only show a
    synthesised face. */
const WEIGHTS = [
  { weight: 400, className: styles.w400 },
  { weight: 600, className: styles.w600 },
  { weight: 700, className: styles.w700 },
] as const;

/**
 * The romanization the PRD names [D15]: `ismī`, `ʾanā`, `ḥasan`, and the bare marks. They are
 * Latin Extended-A/Additional plus two modifier letters (ʾ U+02BE, ʿ U+02BF) — the corner of the
 * Latin range a display face is likeliest to have skipped, which is why §10 says verify coverage
 * and fall back to a diacritic-complete face if it fails.
 */
const ROMANIZATION = ['ismī', 'ʾanā', 'ḥasan', 'ī ā ū ʿ ʾ'] as const;

/** Barlow carries the UI, and the romanization sits in its two prose sizes. */
const BODY_STEPS = [
  { className: styles.body, token: '--text-body (15px)' },
  { className: styles.secondary, token: '--text-secondary (13px)' },
] as const;

/** Barlow ships at 400 only — the ramp's four prose roles all ask for it and nothing asks for
    500/600 (#113 trimmed that headroom too). */
const BODY_WEIGHTS = [{ weight: 400, className: styles.w400 }] as const;

/** Barlow Condensed: the kickers, their tracking, and the wordmark's own 700. */
const HEADING_STEPS = [
  { className: styles.kickerLg, token: '--text-kicker (600 11px) + --kicker-tracking' },
  { className: styles.kickerSm, token: '--text-kicker-sm (600 10px) + --kicker-tracking' },
  { className: styles.brand, token: '--text-brand (700 23px)' },
  { className: styles.screenTitle, token: '--text-screen-title (600 24px)' },
] as const;

export default function TypeSpecimen() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>type specimen</h1>
      <p className={styles.lede}>
        Development only (#85). Every size and weight below resolves through a token in
        design/tokens.css — a box here is a font that did not ship, and a shape that changes when
        the weight changes is the browser synthesising one. Findings live in docs/04-font-notes.md.
      </p>

      <section className={styles.section}>
        <h2 className={styles.sectionHead}>Devanagari · Mukta · --font-devanagari</h2>
        {SIZES.map((size) => (
          <div key={size.px} className={styles.block} data-size={size.px}>
            <h3 className={styles.blockHead}>
              {size.px}px — {size.token}
            </h3>
            {WEIGHTS.map((weight) => (
              <div key={weight.weight} className={styles.row}>
                <span className={styles.rowLabel}>{weight.weight}</span>
                <ul
                  className={`${styles.specimen} ${styles.devanagari} ${size.className} ${weight.className}`}
                  lang="mr"
                  data-face="devanagari"
                  data-size={size.px}
                  data-weight={weight.weight}
                >
                  {DEVANAGARI.map((word) => (
                    <li key={word}>{word}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionHead}>Romanization · Barlow · --font-body</h2>
        {BODY_STEPS.map((step) => (
          <div key={step.token} className={styles.block}>
            <h3 className={styles.blockHead}>{step.token}</h3>
            {BODY_WEIGHTS.map((weight) => (
              <div key={weight.weight} className={styles.row}>
                <span className={styles.rowLabel}>{weight.weight}</span>
                <ul
                  className={`${styles.specimen} ${step.className} ${weight.className}`}
                  data-face="body"
                  data-weight={weight.weight}
                >
                  {ROMANIZATION.map((sample) => (
                    <li key={sample}>{sample}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ))}
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionHead}>
          Kickers &amp; headings · Barlow Condensed · --font-heading
        </h2>
        {HEADING_STEPS.map((step) => (
          <div key={step.token} className={styles.block}>
            <h3 className={styles.blockHead}>{step.token}</h3>
            <p className={`${styles.specimen} ${step.className}`} data-face="heading">
              Sentence detail · module 1 — ismī
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
