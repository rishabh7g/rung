/**
 * The sentence register enum (#422).
 *
 * Every course's L2-M1 is "Asking politely", and four of the nine L2s introduce a polite address
 * that is a verb paradigm rather than a word. `formal` is the third value that tier lives in, and
 * the enum stays closed around it: the point of this file is that widening it once did not turn it
 * into free text. The enum is spelled in three places — the schema, `Register` in
 * `src/course/types.ts`, and `ModuleSentence` here — and only the schema is enforced, so that is
 * what is pinned, against the real validator on a real module.
 */
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { validateModule } from './validate.ts';

const REPO_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

/** hi-mr L1-M1 — shipped and fully enriched — with `register` on its first sentence replaced. */
function withRegister(register: string): Record<string, unknown> {
  const file = path.join(REPO_ROOT, 'content', 'hi-mr', 'modules', 'L1-M1.json');
  const module = JSON.parse(readFileSync(file, 'utf8')) as Record<string, unknown> & {
    sentences: { register?: string }[];
  };
  const first = module.sentences[0];
  if (first === undefined) throw new Error('hi-mr L1-M1 has no sentences');
  first.register = register;
  return module;
}

describe('the sentence register enum', () => {
  it.each(['neutral', 'informal', 'formal'])('accepts %s', (register) => {
    const result = validateModule(withRegister(register), 'L1-M1.json');
    expect(result.issues).toEqual([]);
    expect(result.ok).toBe(true);
  });

  it.each(['polite', 'Formal', 'formal ', ''])('rejects %s', (register) => {
    const result = validateModule(withRegister(register), 'L1-M1.json');
    expect(result.ok).toBe(false);
    expect(result.issues.map((issue) => issue.path)).toContain('/sentences/0/register');
  });
});
