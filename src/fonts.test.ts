/**
 * The fonts are bundled, and they are the fonts the tokens ask for (#85, [D15]) — and no more
 * than them (#113).
 *
 * `--font-devanagari: "Mukta", system-ui, sans-serif` is a *request*. If Mukta 700 is not in the
 * bundle the browser does not fail, it substitutes: it synthesises a bold from 400, or drops to
 * `system-ui`, and on a device with no Devanagari installed that is a screen of boxes. Nothing
 * errors, no test goes red, and the first person to find out is the learner — which is why the
 * link between the ramp in `design/tokens.css` and the bundle is checked mechanically here, the
 * same shape as the shell-purity and clock guards.
 *
 * The ramp is the source of the requirement: every `--text-*` shorthand names a weight and a
 * family, so the set of (family, weight) pairs the product renders is derivable, and a new ramp
 * entry — or a weight changed from 600 to 700 — turns this red until the face is bundled. Since
 * #113 the bundle is also held to the ramp in the OTHER direction: the app is offline-first and
 * every shipped face ends up on a device — in the precache if it is a shell face, in the active
 * course's cache if it is a script subset (#211) — so a face nothing renders is dead payload
 * (`tools/payload-budget.ts` meters the total). What a scan cannot do is prove a glyph exists
 * inside a face: that is `/dev/type` in a browser, recorded in docs/04-font-notes.md and
 * docs/05-perf-notes.md.
 *
 * The bundle has three parts since #197: Barlow and Barlow Condensed come from @fontsource `latin`
 * subset imports in `main.tsx`; Mukta from `src/fonts/mukta.css`, Noto Naskh Arabic from
 * `src/fonts/naskh.css` and — since #222 — Source Sans 3 from `src/fonts/source-sans-3.css`, whose
 * woff2 payloads `tools/font-subset.ts` generates per course at build time.
 *
 * #222 also changed what "the ramp names a face" means. `--font-devanagari` is a STACK now
 * (`"Mukta", "Source Sans 3", system-ui`), because Mukta has no glyph for four of the
 * romanization's marks; every named family in a stack is read, not just the head, so a face the
 * product renders in second place is bundled at every weight the ramp asks for.
 *
 * The ramp is not the whole requirement, and #197 is why. The romanized courses' quiet native
 * line keeps a `--text-*` size and swaps only the family (`font-family: var(--font-script-
 * fallback)`), so its face appears in no `--text-*` shorthand at all — an Arabic line that
 * regressed to `system-ui` would render in whatever the phone owned, or in tofu, and every test
 * here would stay green. So the requirement is read off the *stylesheets*: any rule that pairs a
 * `--text-*` shorthand with a `font-family: var(--font-*)` override contributes that (family,
 * weight) pair too, and the family is resolved through `src/styles/tokenOverrides.css` — the one
 * file allowed to change a value in the read-only `design/` package.
 */
import { describe, expect, it } from 'vitest';
import tokensCss from '../design/tokens.css?raw';
import indexHtml from '../index.html?raw';
import mainSource from './main.tsx?raw';
import muktaCss from './fonts/mukta.css?raw';
import naskhCss from './fonts/naskh.css?raw';
import sourceSansCss from './fonts/source-sans-3.css?raw';
import subsetSource from '../tools/font-subset.ts?raw';
import overridesCss from './styles/tokenOverrides.css?raw';
import fontNotes from '../docs/04-font-notes.md?raw';
import barlowCss from '@fontsource/barlow/latin-400.css?raw';
import barlowCondensedCss from '@fontsource/barlow-condensed/latin-600.css?raw';

/* ------------------------------------------------------------ the tokens */

/** Every stylesheet under `src/`, keyed the way a failure should name it — the same glob
    `styleContract.test.ts` scans, because the same files are the source of truth for both. */
const STYLESHEETS: Readonly<Record<string, string>> = Object.fromEntries(
  Object.entries(
    import.meta.glob<string>('./**/*.css', { query: '?raw', import: 'default', eager: true }),
  ).map(([file, source]) => [file.replace('./', 'src/'), source]),
);

/**
 * `--font-heading: "Barlow Condensed", …` → `{ heading: ['Barlow Condensed'], … }`, read from
 * `design/tokens.css` and then from the override sheet, which wins the way it wins in the
 * cascade: `main.tsx` imports it straight after the tokens, so its `:root` rule is later.
 *
 * EVERY named family in a stack, not just the first (#222). `--font-devanagari` is
 * `"Mukta", "Source Sans 3", system-ui, sans-serif`: Mukta draws the letters and the diacritics it
 * has, Source Sans 3 draws the four it does not, and a face the product renders in second place
 * is a face the bundle owes exactly as much as one it renders in first. Reading only the head
 * would let the diacritic face ship at one weight, or not ship at all, with every test green.
 *
 * A stack with no quoted family (`system-ui, sans-serif`) contributes no face — nothing to bundle
 * and nothing to check, which is exactly what `--font-script-fallback` was before #197.
 */
function familiesByRole(): Record<string, string[]> {
  const roles: Record<string, string[]> = {};
  for (const css of [tokensCss, overridesCss]) {
    for (const match of css.matchAll(/--font-([a-z-]+):([^;]+);/g)) {
      const families = [...match[2]!.matchAll(/['"]([^'"]+)['"]/g)].map((quoted) => quoted[1]!);
      if (families.length > 0) roles[match[1]!] = families;
    }
  }
  return roles;
}

/** The plain numeric custom properties, so `var(--font-heading-weight)` resolves to `600`. */
function numericVars(): Record<string, string> {
  return Object.fromEntries(
    [...tokensCss.matchAll(/--([a-z0-9-]+):\s*(\d+);/g)].map((match) => [match[1]!, match[2]!]),
  );
}

/** The `--text-*` shorthands, keyed by token name: `l2-hero` → `700 32px/1.55 var(…)`. */
function rampShorthands(): Record<string, string> {
  return Object.fromEntries(
    [...tokensCss.matchAll(/--(text-[a-z0-9-]+):\s*([^;]+);/g)].map((match) => [
      match[1]!,
      match[2]!,
    ]),
  );
}

/**
 * The ramp the app actually renders: `design/tokens.css`'s shorthands, with any
 * `src/styles/tokenOverrides.css` redefinition winning — the same later-import-wins cascade
 * `main.tsx` sets up (#197, #252). `--text-body`/`-secondary`/`-caption`/`-micro` are redefined
 * there; everything else in the ramp still comes from the read-only package.
 */
function effectiveRampShorthands(): Record<string, string> {
  const effective = { ...rampShorthands() };
  for (const match of overridesCss.matchAll(/--(text-[a-z0-9-]+):\s*([^;]+);/g)) {
    effective[match[1]!] = match[2]!.trim();
  }
  return effective;
}

/** The weight a `--text-*` shorthand renders at, `var(--font-heading-weight)` resolved. */
function weightOf(shorthand: string): string | undefined {
  const head = shorthand.trim().split(/\s+/)[0] ?? '';
  return /^\d+$/.test(head) ? head : numericVars()[head.match(/var\(--([a-z0-9-]+)\)/)?.[1] ?? ''];
}

/**
 * Every (family, weight) the ramp renders, read off the `--text-*` font shorthands:
 * `700 23px/1 var(--font-heading)` → `Barlow Condensed 700`.
 */
function rampFaces(): string[] {
  const families = familiesByRole();
  const faces = new Set<string>();

  for (const value of Object.values(rampShorthands())) {
    const role = value.match(/var\(--font-([a-z-]+)\)/)?.[1];
    const stack = role === undefined ? undefined : families[role];
    if (stack === undefined) continue;

    const weight = weightOf(value);
    if (weight === undefined) continue;

    for (const family of stack) faces.add(`${family} ${weight}`);
  }

  return [...faces].sort();
}

/**
 * The faces the ramp CANNOT name: a rule that takes a `--text-*` shorthand for its size and then
 * swaps the family (`font-family: var(--font-script-fallback)`) renders a pair no token spells out
 * (#197). The five `.script` rules are the whole population today — `styleContract.test.ts` calls
 * that override "the one place that does" — and this reads them out of the stylesheets rather than
 * trusting the count, so a sixth at another size joins the requirement automatically.
 */
function overriddenFaces(): { file: string; family: string; weight: string }[] {
  const families = familiesByRole();
  const shorthands = rampShorthands();
  const found: { file: string; family: string; weight: string }[] = [];

  for (const [file, source] of Object.entries(STYLESHEETS)) {
    for (const [, body] of source.matchAll(/\{([^}]*)\}/g)) {
      const role = body!.match(/font-family:\s*var\(--font-([a-z-]+)\)/)?.[1];
      const size = body!.match(/font:\s*var\(--(text-[a-z0-9-]+)\)/)?.[1];
      if (role === undefined || size === undefined) continue;

      const stack = families[role];
      const weight = weightOf(shorthands[size] ?? '');
      if (stack === undefined || weight === undefined) continue;

      for (const family of stack) found.push({ file, family, weight });
    }
  }
  return found;
}

/** Everything the product renders: the ramp, plus the family-swapped rules the ramp cannot see. */
function requiredFaces(): string[] {
  return [
    ...new Set([...rampFaces(), ...overriddenFaces().map((o) => `${o.family} ${o.weight}`)]),
  ].sort();
}

/* ------------------------------------------------------------ the bundle */

/** `@fontsource/barlow-condensed` → `Barlow Condensed`, the way tokens.css spells it. */
function familyOf(pkg: string): string {
  return pkg
    .split('-')
    .map((word) => word[0]!.toUpperCase() + word.slice(1))
    .join(' ');
}

/** Every `@font-face` family + weight a committed sheet declares: `Mukta 400`, `Noto Naskh
    Arabic 400`. One regex over both sheets — the family is read, never assumed. */
function facesIn(css: string): string[] {
  return [...css.matchAll(/@font-face\s*\{[^}]*\}/g)].flatMap((block) => {
    const family = block[0].match(/font-family:\s*['"]([^'"]+)['"]/)?.[1];
    const weight = block[0].match(/font-weight:\s*(\d{3})/)?.[1];
    return family !== undefined && weight !== undefined ? [`${family} ${weight}`] : [];
  });
}

/**
 * Every face the production graph carries: the `latin` subset imports in `main.tsx`
 * (`@fontsource/barlow/latin-400.css` → `Barlow 400` — the dev-only `latin-ext` dynamic imports
 * do not match and do not add faces), plus the faces the three committed subset sheets declare.
 */
function bundledFaces(): string[] {
  const faces = new Set<string>(
    [...mainSource.matchAll(/@fontsource\/([a-z-]+)\/latin-(\d{3})\.css/g)].map(
      (match) => `${familyOf(match[1]!)} ${match[2]!}`,
    ),
  );
  for (const face of [...facesIn(muktaCss), ...facesIn(naskhCss), ...facesIn(sourceSansCss)]) {
    faces.add(face);
  }
  return [...faces].sort();
}

/* -------------------------------------------------------------- the guard */

describe('the bundle covers what the product renders — and only that (#113, #197)', () => {
  it('bundles every weight of every family the product renders', () => {
    const missing = requiredFaces().filter((face) => !bundledFaces().includes(face));

    expect(
      missing,
      `${missing.join(', ')} — the product renders these and the bundle lacks them.\nA missing weight is not an error: the browser synthesises the face and nobody is told [D15].`,
    ).toEqual([]);
  });

  it('bundles nothing the product does not render', () => {
    const surplus = bundledFaces().filter((face) => !requiredFaces().includes(face));

    expect(
      surplus,
      `${surplus.join(', ')} — bundled, but nothing renders them. Every shipped face ends up on a device (#90, #211), so unused headroom is pure payload; #113 trimmed Mukta 500, Barlow 500/600 and Barlow Condensed 500 on exactly this ground.`,
    ).toEqual([]);
  });

  it('reads a ramp that actually names the three families — the parse, not just its result', () => {
    const faces = rampFaces();

    expect(faces).toContain('Mukta 700');
    expect(faces).toContain('Barlow 400');
    // `--text-brand` is the wordmark, and the one place the heading face is asked for at 700.
    expect(faces).toContain('Barlow Condensed 700');
    // `var(--font-heading-weight)` resolved, rather than being skipped as unparseable.
    expect(faces).toContain('Barlow Condensed 600');
  });

  it('ships script subsets, never a whole family (#113)', () => {
    // `@fontsource/mukta/400.css` bundles devanagari + latin + latin-ext + vietnamese; the
    // subset-file imports (`latin-400.css`) and src/fonts/mukta.css carry only what renders.
    const whole = [...mainSource.matchAll(/@fontsource\/[a-z-]+\/\d{3}\.css/g)].map((m) => m[0]);

    expect(
      whole,
      `${whole.join(', ')} — a whole-family import ships every script subset; import the subset files instead (docs/05-perf-notes.md).`,
    ).toEqual([]);
  });

  it('keeps latin-ext out of the production graph — dev builds only (#113)', () => {
    // The static imports are the production bundle; @fontsource's latin-ext files (the ī ā ū of
    // /dev/type's diacritic rows) may appear only as a dynamic import inside the
    // `import.meta.env.DEV` branch. #222 did not change that, and sharpened the reason: the
    // romanization is drawn by `--font-devanagari`, so its latin-ext comes from Mukta's own cut
    // and Source Sans 3's — both subset per course into `src/fonts/generated/`, neither a whole
    // @fontsource file, and Barlow's latin-ext has no ḥ, ʾ or ʿ to offer either way (§4).
    const statics = [...mainSource.matchAll(/^import '([^']*latin-ext[^']*)';$/gm)].map(
      (m) => m[1],
    );

    expect(statics).toEqual([]);
    expect(mainSource).toContain("void import('@fontsource/barlow/latin-ext-400.css');");
  });
});

describe('the body-text floor — no text role renders below 16px (#252)', () => {
  it('keeps every non-kicker --text-* token at or above the floor', () => {
    // --text-kicker and --text-kicker-sm are uppercase tracked labels, not a body text role —
    // the house UI standard's floor is about prose a learner reads, not a badge, and #252 says
    // so explicitly in src/styles/tokenOverrides.css.
    const KICKERS = new Set(['text-kicker', 'text-kicker-sm']);

    const violations = Object.entries(effectiveRampShorthands())
      .filter(([name]) => !KICKERS.has(name))
      .flatMap(([name, shorthand]) => {
        const size = Number(shorthand.match(/(\d+(?:\.\d+)?)px/)?.[1]);
        return Number.isFinite(size) && size < 16 ? [`--${name}: ${size}px`] : [];
      });

    expect(
      violations,
      `${violations.join(', ')} — below the 16px body-text floor (design/PRD-engineering.md §17 / rrish-learning-base ui-baseline.md §7). Raise it in src/styles/tokenOverrides.css.`,
    ).toEqual([]);
  });
});

describe('the quiet native script line has a bundled face, not a guess (#197)', () => {
  /** The stack `--font-script-fallback` actually resolves to once the override has been applied. */
  const stack = [
    ...[tokensCss, overridesCss].join('\n').matchAll(/--font-script-fallback:([^;]+);/g),
  ]
    .at(-1)?.[1]
    ?.trim();

  it('names a face before it names system-ui — the five .script rules are the only Arabic on screen', () => {
    expect(
      stack,
      'design/tokens.css declares --font-script-fallback; something has to.',
    ).toBeDefined();
    expect(
      stack,
      `--font-script-fallback resolves to "${stack}" — a bare system-ui stack means the Arabic line renders in whatever the device owns, or in tofu where it owns nothing (docs/04-font-notes.md §8). Name the bundled face first.`,
    ).toMatch(/^['"][^'"]+['"]\s*,/);
  });

  it('names a face the bundle actually carries, at the weight the line renders', () => {
    const overrides = overriddenFaces();

    expect(overrides.length, 'no rule swaps the family off a --text-* shorthand any more').toBe(5);
    for (const { file, family, weight } of overrides) {
      expect(
        bundledFaces(),
        `${file} renders ${family} ${weight} and the bundle has no such face.`,
      ).toContain(`${family} ${weight}`);
    }
  });

  it('routes the Arabic block to that face — a range that misses it is the same as no face', () => {
    const range = naskhCss.match(/unicode-range:([^;]+);/)?.[1] ?? '';

    expect(range).toContain('U+0600-06FF');
    // The presentation forms a shaper may reach for, and the joiners that control ligation.
    expect(range).toContain('U+FE70-FEFC');
    expect(range).toContain('U+200C-200E');
  });

  it('keeps the override in src/ and imported after the read-only tokens (docs/design-contract.md)', () => {
    const tokens = mainSource.indexOf("import '../design/tokens.css';");
    const override = mainSource.indexOf("import './styles/tokenOverrides.css';");

    expect(tokens).toBeGreaterThan(-1);
    expect(
      override,
      'the override sheet is not imported — --font-script-fallback falls back to the design value',
    ).toBeGreaterThan(tokens);
    // design/ is wiped on re-copy: the face must never be written INTO the design package. The
    // token there still resolves to the system stack — its comment asks for a Naskh, the override
    // is the answer, and the day design ships one itself this line says the override is redundant.
    expect(tokensCss).not.toMatch(/--font-script-fallback:\s*['"]/);
  });

  it('is written down where a divergence has to be written down', () => {
    const family = familiesByRole()['script-fallback']?.[0];

    expect(family).toBeDefined();
    expect(overridesCss).toContain('04-font-notes');
    // The doc names the face and its licence — a bundled font with neither is the real failure.
    expect(fontNotes).toContain(family!);
    expect(fontNotes).toMatch(/SIL Open Font License|OFL/);
  });
});

/**
 * en-ru's display line has a bundled face, not a guess (#325).
 *
 * This is a harder promise than #222's four diacritics. Those were marks INSIDE a Latin word; this
 * is every letter of every sentence, word, variation, mistake and pool item a `native` Cyrillic
 * course draws. Mukta bundles no Cyrillic at all, so without a claimed range the hero line of the
 * whole course renders in whatever the phone owns — or in tofu where it owns nothing, which is why
 * en-ru's graduation cannot land before this does.
 *
 * The assertions are over the STYLESHEETS rather than over any en-ru content, deliberately: this
 * target lands before the course is authored (the honest-gate curve — Naskh's cut was ~2 KiB until
 * its ladder existed), so a test that walked the content would pass vacuously today and mean
 * nothing tomorrow.
 */
describe('the Cyrillic display line has a bundled face, not a guess (#325)', () => {
  /** Russian letters a first-rung sentence cannot avoid, plus the two the ticket calls out. */
  const RUSSIAN = 'менязовутяЁё';

  function ranges(css: string): [number, number][] {
    return [...css.matchAll(/unicode-range:([^;]+);/g)].flatMap((declaration) =>
      [...declaration[1]!.matchAll(/U\+([0-9A-F]+)(?:-([0-9A-F]+))?/gi)].map(
        (part): [number, number] => [parseInt(part[1]!, 16), parseInt(part[2] ?? part[1]!, 16)],
      ),
    );
  }

  const claims = (css: string, codePoint: number): boolean =>
    ranges(css).some(([from, to]) => codePoint >= from && codePoint <= to);

  it('claims every Cyrillic letter a Russian line carries — none falls through to the system', () => {
    const orphans = [...RUSSIAN].filter((letter) => !claims(sourceSansCss, letter.codePointAt(0)!));

    expect(
      orphans,
      `${orphans.join(' ')} — no bundled face claims these, so en-ru's display line renders in whatever the phone owns, or in tofu (#325).`,
    ).toEqual([]);
  });

  it('is a face Mukta cannot supply, which is why the second family is reached at all', () => {
    // The premise of the whole target: Mukta is named FIRST in --font-devanagari, so if it claimed
    // this range the browser would never ask Source Sans 3 and the cut would be dead weight.
    for (const letter of RUSSIAN) {
      expect(claims(muktaCss, letter.codePointAt(0)!)).toBe(false);
    }
  });

  /**
   * ё is a LETTER, so it is content-decided like every other letter — it must be claimed by the
   * range (above) but must NOT be baked into the baseline, or every build ships a glyph for a
   * course that may never write one.
   */
  it('keeps ё out of the baseline — letters are content-decided', () => {
    expect(subsetSource).toContain("const CYRILLIC_BASELINE = '№'");
    expect(subsetSource).not.toMatch(/CYRILLIC_BASELINE = '[^']*ё/);
  });

  /** The family that actually draws it is named, bundled, and reached by the order already set. */
  it('resolves through --font-devanagari, where the face is already second', () => {
    const stack = [...[tokensCss, overridesCss].join('\n').matchAll(/--font-devanagari:([^;]+);/g)]
      .at(-1)?.[1]
      ?.trim();

    expect(stack).toBeDefined();
    expect(stack).toContain('Source Sans 3');
    // Named, not guessed: system-ui may close the stack, but it may not open it.
    expect(stack).toMatch(/^['"][^'"]+['"]\s*,/);
  });
});

describe("the romanization's diacritics have a bundled face, not a system one (#222)", () => {
  /** The ten marks PRD-engineering [D15] and issue #222 name, plus the capitals en-ar ships. */
  const MARKS = 'āīūḥṣḍṭẓʾʿḤṢḌṬẒ';

  /** Every `unicode-range` in a sheet, flattened to `[from, to]` pairs. `U+1E00-1E9F` → one pair;
      `U+02BE-02BF, U+1E92-1E93` → two; a bare `U+0304` → a pair of itself. */
  function ranges(css: string): [number, number][] {
    return [...css.matchAll(/unicode-range:([^;]+);/g)].flatMap((declaration) =>
      [...declaration[1]!.matchAll(/U\+([0-9A-F]+)(?:-([0-9A-F]+))?/gi)].map(
        (part): [number, number] => [parseInt(part[1]!, 16), parseInt(part[2] ?? part[1]!, 16)],
      ),
    );
  }

  const claims = (css: string, codePoint: number): boolean =>
    ranges(css).some(([from, to]) => codePoint >= from && codePoint <= to);

  it('routes every mark to Mukta or to the face behind it — none is left on system-ui', () => {
    const orphans = [...MARKS].filter(
      (mark) =>
        !claims(muktaCss, mark.codePointAt(0)!) && !claims(sourceSansCss, mark.codePointAt(0)!),
    );

    expect(
      orphans,
      `${orphans.join(' ')} — no bundled face's unicode-range claims these, so they render in whatever the phone owns, beside letters that render in Mukta (docs/04-font-notes.md §4.1).`,
    ).toEqual([]);
  });

  it('gives the second face exactly the gap: the four codepoints Mukta has no glyph for, and Cyrillic', () => {
    // Measured in #222 against the real @fontsource files, not assumed — `tools/font-subset.test.
    // ts` re-measures it with HarfBuzz so this list cannot rot silently. Every weight's block
    // carries the same range per subset, so the distinct set is the whole claim.
    //
    // Two subsets since #325: the romanization gap, and the Cyrillic block that is en-ru's whole
    // display line (Mukta bundles none). № rides with the Cyrillic range because Mukta's latin
    // cut stops at U+206F and nothing else bundled reaches it.
    const distinct = [...new Set(ranges(sourceSansCss).map(([from, to]) => `${from}-${to}`))];

    expect(distinct).toEqual([
      `${0x02be}-${0x02bf}`,
      `${0x1e92}-${0x1e93}`,
      `${0x0400}-${0x04ff}`,
      `${0x2116}-${0x2116}`,
    ]);
    // And it claims NO space, guillemet or em dash: Mukta is first in the family and draws all
    // three, so a range holding one would download this cut for every course in the catalogue.
    for (const shared of ' «»—') expect(claims(sourceSansCss, shared.codePointAt(0)!)).toBe(false);
    // ā ī ū and the dot-below emphatics are Mukta's own, so the common case is ONE face on the
    // line: `ṣabāḥ` is Mukta end to end.
    for (const mark of 'āīūḥṣḍṭ') expect(claims(muktaCss, mark.codePointAt(0)!)).toBe(true);
  });

  it('claims no character that carries no script — the overlap #211 was bitten by', () => {
    // A space, a joiner or a BOM inside a range makes every course in the catalogue "use" the
    // face: `src/pwa/offlineCourse.ts` samples the course's own text to decide what to warm, and
    // those characters are in every course's text. It strips them; the ranges must not need it to.
    for (const neutral of [0x0020, 0x00a0, 0x0009, 0x000a, 0x200c, 0x200d, 0x200e, 0xfeff]) {
      expect(claims(sourceSansCss, neutral), `U+${neutral.toString(16)}`).toBe(false);
    }
    // And nothing below U+0100: the diacritic cuts must never claim ASCII or Latin-1, which is
    // every course's shell English and en-es's whole accented repertoire.
    for (const [from] of ranges(sourceSansCss)) expect(from).toBeGreaterThanOrEqual(0x0100);
  });

  it('bundles the second face at the three weights the L2 ramp renders', () => {
    for (const weight of ['400', '600', '700']) {
      expect(bundledFaces()).toContain(`Source Sans 3 ${weight}`);
    }
  });

  it('names it behind Mukta in --font-devanagari, and keeps system-ui behind both', () => {
    const stack = [...[tokensCss, overridesCss].join('\n').matchAll(/--font-devanagari:([^;]+);/g)]
      .at(-1)?.[1]
      ?.trim();

    expect(stack).toBe("'Mukta', 'Source Sans 3', system-ui, sans-serif");
  });

  it('is written down, with the face and its licence', () => {
    expect(overridesCss).toContain('04-font-notes');
    expect(fontNotes).toContain('Source Sans 3');
    expect(fontNotes).toMatch(/SIL Open Font License|OFL/);
    // §4.1 is where the issue asked for the decision, and a decision with no date is a draft.
    expect(fontNotes).toMatch(/2026-08-13/);
  });
});

describe('what the bundled stylesheets promise', () => {
  const faces = [
    { family: 'Mukta', css: muktaCss },
    { family: 'Noto Naskh Arabic', css: naskhCss },
    { family: 'Source Sans 3', css: sourceSansCss },
    { family: 'Barlow', css: barlowCss },
    { family: 'Barlow Condensed', css: barlowCondensedCss },
  ];

  it('declares the family name the token asks for, exactly', () => {
    const families = Object.values(familiesByRole()).flat();

    for (const { family, css } of faces) {
      expect(families).toContain(family);
      expect(css).toContain(`font-family: '${family}'`);
    }
  });

  it('swaps rather than blocking — text is readable before the face arrives', () => {
    for (const { css } of faces) expect(css).toContain('font-display: swap');
  });

  it('serves woff2', () => {
    for (const { css } of faces) expect(css).toMatch(/\.woff2'?\)\s*format\('woff2'\)/);
  });
});

describe('nothing is fetched at runtime', () => {
  /** The files the app ships — tests are excluded, as in `shellPurity.test.ts`: this file names a
      host in order to look for it, and a guard that failed on itself would be deleted, not fixed. */
  const SHIPPED: Readonly<Record<string, string>> = Object.fromEntries(
    Object.entries(
      import.meta.glob<string>('./**/*.{ts,tsx,css}', {
        query: '?raw',
        import: 'default',
        eager: true,
      }),
    )
      .map(([file, source]) => [file.replace('./', 'src/'), source] as const)
      .filter(([file]) => !/\.test\.tsx?$/.test(file) && !file.startsWith('src/test/')),
  );

  it('names no font host anywhere in the source or the HTML shell', () => {
    const hosts = /fonts\.(googleapis|gstatic|bunny|cdnfonts)\.com|use\.typekit/;
    const offenders = Object.entries({ ...SHIPPED, 'index.html': indexHtml })
      .filter(([, source]) => hosts.test(source))
      .map(([file]) => file);

    expect(
      offenders,
      `${offenders.join(', ')} fetches a font at runtime. Every face is bundled — offline is the product (design/pwa-checklist.md §2).`,
    ).toEqual([]);
  });
});
