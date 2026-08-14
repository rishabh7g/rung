/**
 * The shell's layout rules (#84), read off the CSS itself.
 *
 * They are asserted against the source rather than a computed style because jsdom resolves
 * neither `env()` nor `max()` — a `getComputedStyle` here would confirm nothing and quietly keep
 * confirming it after someone deleted the rule. The place a computed padding means something is
 * a browser, and that check is the ticket's acceptance criterion (360px and 430px, nav clearing
 * the home indicator), run against the built app and pasted into the PR.
 *
 * What a scan CAN pin is that the rules exist and are written the one way that survives both
 * ends of the range — an inset never standing alone, always beside a designed term, so a phone
 * gets its real inset and a desktop browser, where every inset is 0, still gets the design's
 * padding (design/pwa-checklist.md §2). Which term, and which function, differs by edge (#265):
 *
 *   header, top     max(token, env(...))    nothing sits above it, so the notch's strip
 *                                           SUBSTITUTES for the header's own top padding
 *   bottom bar      calc(token + env(...))  the home indicator's strip is an OS-owned band
 *                                           ADDED below a fixed designed bar — max() let a 34px
 *                                           iPhone inset discard the token and gave the bar a
 *                                           different, lopsided height on every platform
 */
import { describe, expect, it } from 'vitest';
import tokenOverrides from '../styles/tokenOverrides.css?raw';

const SHELL_CSS = import.meta.glob<string>('./*.module.css', {
  query: '?raw',
  import: 'default',
  eager: true,
});

/**
 * A stylesheet's declarations, with its comments removed — those quote the very values the
 * rules are checked for ("never 100vh", "48px"), and a guard that read them would pass on the
 * documentation after someone deleted the rule.
 */
function declarations(name: string): string {
  const source = SHELL_CSS[`./${name}`];
  if (source === undefined) throw new Error(`${name} is not beside the component it styles`);
  return source.replace(/\/\*[\s\S]*?\*\//g, '');
}

const APP_SHELL = declarations('AppShell.module.css');
const BOTTOM_NAV = declarations('BottomNav.module.css');

describe('safe areas', () => {
  it('adds the home indicator BELOW the bar — calc, never max, so the token always applies', () => {
    expect(BOTTOM_NAV).toMatch(
      /padding-bottom:\s*calc\(var\(--space-1\)\s*\+\s*env\(safe-area-inset-bottom,\s*0px\)\)/,
    );
    // The whole point of the ticket: max() there took the larger branch and threw the design
    // token away on any device with a real inset.
    expect(BOTTOM_NAV).not.toMatch(/max\([^;]*env\(safe-area-inset-bottom/);
  });

  it('pads the bar symmetrically, so the icons sit centred rather than riding high', () => {
    const bar = BOTTOM_NAV.slice(0, BOTTOM_NAV.indexOf('@media (min-width: 768px)'));
    const shorthand = /\.nav\s*\{[^}]*padding:\s*var\(--space-(\d)\)\s+var\(--space-\d\)/.exec(bar);

    expect(shorthand).not.toBeNull();
    // The same token on both edges: the shorthand's vertical value is the one the calc() adds to.
    expect(BOTTOM_NAV).toContain(
      `padding-bottom: calc(var(--space-${shorthand?.[1]}) + env(safe-area-inset-bottom, 0px))`,
    );
  });

  it('substitutes for the header’s top padding — nothing sits above it to cushion', () => {
    expect(APP_SHELL).toMatch(
      /padding-top:\s*max\(var\(--space-\d\),\s*env\(safe-area-inset-top\)\)/,
    );
  });

  it('never uses a bare env() — a desktop inset is 0 and the padding would vanish', () => {
    for (const source of [APP_SHELL, BOTTOM_NAV]) {
      const insets = source.match(/env\(safe-area-inset-[a-z]+/g) ?? [];
      // Either function is a guard, because either one keeps a designed term beside the inset;
      // an inset standing on its own is what this forbids.
      const guarded = source.match(/(?:max|calc)\([^;]*env\(safe-area-inset-[a-z]+/g) ?? [];
      expect(insets).toHaveLength(guarded.length);
    }
  });
});

describe('the app column', () => {
  it('is 100dvh — a mobile URL bar shrinks the viewport and 100vh does not notice', () => {
    expect(APP_SHELL).toMatch(/height:\s*100dvh/);
    expect(APP_SHELL).not.toMatch(/100vh/);
  });

  it('scrolls per screen: y auto, x hidden, and no chaining out of a session', () => {
    expect(APP_SHELL).toMatch(/overflow-y:\s*auto/);
    expect(APP_SHELL).toMatch(/overflow-x:\s*hidden/);
    expect(APP_SHELL).toMatch(/overscroll-behavior:\s*contain/);
  });
});

describe('touch', () => {
  it('clears the WCAG floor on every control the shell owns', () => {
    expect(APP_SHELL).toMatch(/min-width:\s*var\(--tap-min\)/);
    expect(APP_SHELL).toMatch(/min-height:\s*var\(--tap-min\)/);
    expect(BOTTOM_NAV).toMatch(/min-height:\s*var\(--nav-item-height\)/);
  });

  it('kills the double-tap-zoom delay on both — nav items and icon buttons', () => {
    expect(APP_SHELL).toMatch(/touch-action:\s*manipulation/);
    expect(BOTTOM_NAV).toMatch(/touch-action:\s*manipulation/);
  });

  it('sizes and strokes icons from the icon tokens, not from px props', () => {
    for (const source of [APP_SHELL, BOTTOM_NAV]) {
      expect(source).toMatch(/stroke-width:\s*var\(--icon-stroke\)/);
    }
    // The shell's own icons (header chevron, pause button) stay at --icon-ui; the bottom BAR is
    // icon-only and gets its own larger size, --icon-nav-bar, so it carries the tab on its own
    // with no label beside it (#246). The rail brings --icon-ui back at >=768px (#249) — this
    // checks the bar only, the CSS above its rail media query.
    const bar = BOTTOM_NAV.slice(0, BOTTOM_NAV.indexOf('@media (min-width: 768px)'));

    expect(APP_SHELL).toMatch(/width:\s*var\(--icon-ui\)/);
    expect(bar).toMatch(/width:\s*var\(--icon-nav-bar\)/);
    expect(bar).not.toMatch(/var\(--icon-ui\)/);
  });
});

describe('gutter', () => {
  it('steps at exactly 768 and 1024, both written min-width (#247)', () => {
    const breakpoints = [...tokenOverrides.matchAll(/@media\s*\(([^)]*)\)/g)].map(
      (match) => match[1],
    );

    expect(breakpoints).toEqual(['min-width: 768px', 'min-width: 1024px']);
  });
});

describe('content measure', () => {
  it('caps the content column at --content-max, centred, inside a min-width: 1024px query (#248)', () => {
    expect(APP_SHELL).toMatch(
      /@media\s*\(min-width:\s*1024px\)\s*\{[^}]*max-width:\s*var\(--content-max\)[^}]*margin-inline:\s*auto[^}]*\}/,
    );
  });

  it('writes no max-width media query around 1024 — one direction per value', () => {
    expect(APP_SHELL).not.toMatch(/@media\s*\(max-width:\s*1024px\)/);
  });
});

describe('left rail (#249)', () => {
  it('puts the header full width above a row holding the rail and the scroll area, at >=768px', () => {
    expect(APP_SHELL).toMatch(
      /@media\s*\(min-width:\s*768px\)\s*\{\s*\.body\s*\{[^}]*flex-direction:\s*row-reverse[^}]*\}\s*\}/,
    );
  });

  it('lays the nav out as a column, var(--rail-width) wide, bordered on its right not its top', () => {
    expect(BOTTOM_NAV).toMatch(
      /\.nav\s*\{[^}]*flex-direction:\s*column[^}]*width:\s*var\(--rail-width\)[^}]*border-top:\s*none[^}]*border-right:\s*var\(--border-hairline\)[^}]*\}/,
    );
  });

  it('shows the label again and shrinks the icon back to --icon-ui', () => {
    const railBlock = BOTTOM_NAV.slice(BOTTOM_NAV.indexOf('@media (min-width: 768px)'));

    expect(railBlock).toMatch(/\.label\s*\{\s*display:\s*block;\s*\}/);
    expect(railBlock).toMatch(/\.icon\s*\{[^}]*width:\s*var\(--icon-ui\)[^}]*\}/);
  });

  it('lays each item out as a row, icon beside label, clearing the tap floor', () => {
    expect(BOTTOM_NAV).toMatch(
      /\.item\s*\{[^}]*flex-direction:\s*row[^}]*min-height:\s*var\(--tap-min\)[^}]*\}/,
    );
  });

  it('writes only min-width around 768 — never a max-width around the same value', () => {
    for (const source of [APP_SHELL, BOTTOM_NAV]) {
      expect(source).not.toMatch(/@media\s*\(max-width:\s*768px\)/);
      expect(source).not.toMatch(/@media\s*\(max-width:\s*767px\)/);
    }
  });
});
