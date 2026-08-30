import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import tseslint from 'typescript-eslint';
import prettier from 'eslint-config-prettier/flat';

export default tseslint.config(
  {
    // design/ is read-only (vendored _ds bundle lives there); content/ is data.
    //
    // `.claude/` holds the harness's scratch state, and `.claude/worktrees/` in particular holds
    // full checkouts left behind by parallel agent runs. Those are entire copies of this repo, so
    // without this entry ESLint lints the source roughly twenty times over — 1,886 of 1,982 files
    // on the run that found this — including stale copies of files that have since been deleted.
    // It was costing about two minutes a run and reporting on code that no longer exists.
    ignores: ['dist', 'design', 'content', 'coverage', '.claude'],
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      prettier,
    ],
    languageOptions: {
      ecmaVersion: 2023,
      globals: globals.browser,
    },
  },
  {
    // tools/ holds the build-time CLIs (content:validate …) and scripts/ the harness's
    // own tests; they run in Node.
    files: ['tools/**/*.ts', 'scripts/**/*.ts', 'vite.config.ts'],
    languageOptions: {
      globals: globals.node,
    },
  },
);
