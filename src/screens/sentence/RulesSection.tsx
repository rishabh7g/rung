/**
 * 4 · rules — the module's own, resolved from this sentence's indices.
 *
 * `deconstruction.rules` are integer indices into the MODULE's ordered `rules` array (PRD §7),
 * resolved here. An index the module does not have renders nothing at all and the rest of the
 * section still draws — content that got ahead of its rules list is a build failure
 * (`tools/validate.ts` checks the ranges), and the learner's screen is not the place to find out
 * about one. A sentence that resolves to no rules draws no section.
 */
import type { Rule, Sentence } from '../../course/types.ts';
import { TagChip } from '../TagChip.tsx';
import styles from '../SentenceScreen.module.css';

interface RulesSectionProps {
  sentence: Sentence;
  /** The module's ordered `rules` array — the thing the sentence's indices point into. */
  moduleRules: readonly Rule[];
}

export function RulesSection({ sentence, moduleRules }: RulesSectionProps) {
  const rules = sentence.deconstruction.rules
    .map((index) => ({ index, rule: moduleRules[index] }))
    .filter((entry): entry is { index: number; rule: Rule } => entry.rule !== undefined);
  if (rules.length === 0) return null;

  return (
    <section data-section="rules" className={styles.section}>
      <h3 className={styles.sectionLabel}>RULES USED</h3>
      <ul className={styles.rules}>
        {rules.map(({ index, rule }) => (
          <li key={index} className={styles.rule}>
            <TagChip tag={rule.tag} />
            <span className={styles.prose}>{rule.text}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
