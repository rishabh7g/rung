/**
 * The en-ru stress law, as a gate (#599).
 *
 * `docs/89` §1 states it unconditionally: **a precomposed acute on every polysyllable and none on
 * a monosyllable**. It is not typography. `content:owner` reports `býlo` → `L1-M5` and `bylo` →
 * `free`, so a missing or misplaced acute mints a key the index has never met, and the word it was
 * meant to teach keeps no row a learner can tap.
 *
 * Two such defects shipped and were found by L4 authors who correctly refused to fix them — a
 * level never edits a file below it — and the sweep that cleared them found eight more of the same
 * class, in L2, L4 and L5. This file is what stops the eleventh: it reads every romanized surface
 * en-ru ships and fails on a polysyllable carrying no acute.
 *
 * What it CANNOT see is a MISPLACED acute. `zanyát` for `zányat` satisfies every rule here and was
 * wrong for thirty modules; catching that needs a stress dictionary, and the native-speaker gate
 * (#64, #110, #111) remains the authority. This gate covers the mechanical half only, and says so.
 */
import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import type { Module } from './validate.ts';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const MODULES = path.join(REPO_ROOT, 'content', 'en-ru', 'modules');

const ACUTE = 'áéíóúý';
/** `y` is not one: it is a glide beside a true vowel and a nucleus only without one. */
const TRUE_VOWEL = 'aeiou' + 'áéíóú';
const VOWEL = 'aeiouy' + ACUTE;

/**
 * Nuclei, not vowel letters. `chay` and `moy` are ONE (the `y` is a glide coda), `vy` and `byl`
 * are one (the `y` is the nucleus, there being no other), `ploshchadi` is three.
 */
function syllables(word: string): number {
  let n = 0;
  for (const group of word.toLowerCase().match(new RegExp(`[${VOWEL}]+`, 'g')) ?? []) {
    const trueVowels = [...group].filter((ch) => TRUE_VOWEL.includes(ch)).length;
    n += trueVowels === 0 ? 1 : trueVowels;
  }
  return n;
}

/**
 * The one exemption, and it is a recorded decision rather than a tolerance. A clitic compound
 * carries ONE stress: `vsyó-taki` is stressed on `vsyó` and `taki` is unstressed, so marking it
 * would teach a stress no speaker produces. That is the same collision between the law and the
 * phonetics that `docs/89` §4 records for `íz-za` and sends to the native gate as question 58;
 * L4-M4 went further and refused to write `vsyó-taki` at all, because the hyphen would donate
 * `taki`, "a key that is not a word". L5-M10 writes it twice, so the half is named here.
 *
 * Both halves of `ya-to`, `chto-to`, `gde-to`, `kto-to` and `zhil-byl` are monosyllables and take
 * no mark at all, which needs no exemption: the law already says none.
 */
const UNSTRESSED_HALVES: ReadonlySet<string> = new Set(['taki']);

interface Finding {
  module: string;
  where: string;
  word: string;
  half: string;
}

/**
 * Every romanized string en-ru SHOWS. `script` is Cyrillic and notes are English prose, so neither
 * is read here — and neither is `mistake.display`, which is **wrong by design and never read**
 * (CLAUDE.md). Including it failed this gate five times over on plates that teach exactly this law:
 * L2-M10's `bylo` for `býlo`, L2-M5's `bystro`, L5-M10's `Seryozno` for the `ё` written `yó`, and
 * L5-M8's `gde-nibud`. A plate that spelled the word correctly would have nothing to plate.
 */
function shownStrings(module: Module): { where: string; text: string }[] {
  const out: { where: string; text: string }[] = [];
  for (const s of module.sentences) {
    out.push({ where: `${s.id} display`, text: s.display });
    for (const v of s.variations ?? []) out.push({ where: `${s.id} variation`, text: v.display });
    for (const w of s.deconstruction.words) {
      out.push({ where: `${s.id} row`, text: w.display });
      for (const form of w.forms ?? []) out.push({ where: `${s.id} forms`, text: form });
    }
  }
  for (const c of module.comprehensionPool) out.push({ where: `${c.id} pool`, text: c.display });
  return out;
}

function audit(): Finding[] {
  const findings: Finding[] = [];
  for (const file of readdirSync(MODULES).filter((f) => f.endsWith('.json'))) {
    const module = JSON.parse(readFileSync(path.join(MODULES, file), 'utf8')) as Module;
    for (const { where, text } of shownStrings(module)) {
      for (const token of text.split(/[\s,.!?;:—()"]+/)) {
        const word = token.replace(/^[-']+|[-']+$/g, '');
        if (word === '') continue;
        // The law applies per HALF of a hyphenated compound, each half being its own index key.
        for (const half of word.split('-')) {
          if (!new RegExp(`[${VOWEL}]`, 'i').test(half)) continue;
          if (UNSTRESSED_HALVES.has(half.toLowerCase())) continue;
          const acutes = [...half].filter((ch) => ACUTE.includes(ch.toLowerCase())).length;
          if (syllables(half) >= 2 && acutes === 0)
            findings.push({ module: module.id, where, word, half });
          if (acutes > 1) findings.push({ module: module.id, where, word, half });
        }
      }
    }
  }
  return findings;
}

describe('the en-ru stress law (#599)', () => {
  it('marks every polysyllable with exactly one acute, across all fifty modules', () => {
    const findings = audit();
    const named = findings.map((f) => `${f.module} ${f.where}: "${f.word}" (half "${f.half}")`);
    expect(named, 'en-ru surfaces breaking the acute law').toEqual([]);
  });

  it('counts nuclei rather than vowel letters, so a glide is not a syllable', () => {
    expect(syllables('chay')).toBe(1);
    expect(syllables('moy')).toBe(1);
    expect(syllables('vy')).toBe(1);
    expect(syllables('byl')).toBe(1);
    expect(syllables('íli')).toBe(2);
    expect(syllables('zányat')).toBe(2);
    expect(syllables('ploshchadi')).toBe(3);
    expect(syllables('poverníte')).toBe(4);
  });

  it('would have caught the two defects that shipped', () => {
    const unaccented = { where: 'probe', text: 'povernite naprávo' };
    const offending = unaccented.text
      .split(' ')
      .filter((w) => syllables(w) >= 2 && ![...w].some((ch) => ACUTE.includes(ch)));
    expect(offending).toEqual(['povernite']);
  });

  it("cannot see a MISPLACED acute, which is the native gate's to judge", () => {
    // zanyát was wrong for thirty modules and satisfies every rule this file checks.
    expect(syllables('zanyát')).toBe(2);
    expect([...'zanyát'].filter((ch) => ACUTE.includes(ch)).length).toBe(1);
  });
});
