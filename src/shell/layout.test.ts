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
 * ends of the range: `max(token, env(...))`, so a phone gets its real inset and a desktop
 * browser — where every inset is 0 — still gets the design's padding
 * (design/pwa-checklist.md §2).
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
  it('pads the nav past the home indicator, with the design gap as the floor', () => {
    expect(BOTTOM_NAV).toMatch(
      /padding-bottom:\s*max\(var\(--space-\d\),\s*env\(safe-area-inset-bottom\)\)/,
    );
  });

  it('pads the header past the notch, same shape', () => {
    expect(APP_SHELL).toMatch(
      /padding-top:\s*max\(var\(--space-\d\),\s*env\(safe-area-inset-top\)\)/,
    );
  });

  it('never uses a bare env() — a desktop inset is 0 and the padding would vanish', () => {
    for (const source of [APP_SHELL, BOTTOM_NAV]) {
      const insets = source.match(/env\(safe-area-inset-[a-z]+\)/g) ?? [];
      const guarded = source.match(/max\([^;]*env\(safe-area-inset-[a-z]+\)/g) ?? [];
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
    // The shell's own icons (header chevron, pause button) stay at --icon-ui; the bottom nav is
    // icon-only and gets its own larger size, --icon-nav-bar, so it carries the tab on its own
    // with no label beside it (#246).
    expect(APP_SHELL).toMatch(/width:\s*var\(--icon-ui\)/);
    expect(BOTTOM_NAV).toMatch(/width:\s*var\(--icon-nav-bar\)/);
    expect(BOTTOM_NAV).not.toMatch(/var\(--icon-ui\)/);
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
