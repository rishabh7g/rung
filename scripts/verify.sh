#!/usr/bin/env bash
# scripts/verify.sh — the repo's verification harness (docs/01-plan.md §8).
#
# One line when everything passes, one failure block when it doesn't:
#
#   TYPES ok | LINT ok | TEST 120/120 ok | CONTENT ok | FONTS ok | BUILD ok | BUDGET ok
#
# Steps run in order and the FIRST failure stops the run, so a red run names
# exactly one thing. Every step's stdout+stderr goes to .verify/<step>.log
# (gitignored, and the whole directory is wiped at the start of every run — so a
# missing log is proof that step never ran).
#
#   step     exit  command
#   TYPES     10   npm run typecheck
#   LINT      20   npm run lint, then npx prettier --check .
#   TEST      30   npm run test            (segment carries the vitest count)
#   CONTENT   40   npm run content:build   ("CONTENT skip" when tools/ is absent)
#   FONTS     45   npm run fonts:build     (per-course subsets, #113; skip like CONTENT)
#   BUILD     50   npx vite build          (omitted entirely with --fast)
#   BUDGET    60   npm run budget          (payload report + audits over dist/, #113/#304; omitted with --fast)
#
# usage: scripts/verify.sh [--fast]

set -uo pipefail

readonly USAGE='usage: scripts/verify.sh [--fast]'

repo_root="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)" || exit 2
cd -- "$repo_root" || exit 2

fast=0
for arg in "$@"; do
  case "$arg" in
    --fast) fast=1 ;;
    -h | --help)
      printf '%s\n' "$USAGE"
      exit 0
      ;;
    *)
      printf 'verify: unknown argument: %s\n%s\n' "$arg" "$USAGE" >&2
      exit 2
      ;;
  esac
done

log_dir="$repo_root/.verify"
rm -rf -- "$log_dir"
mkdir -p -- "$log_dir" || exit 2

# The logs are read by tail, grep and humans — never by a terminal.
export NO_COLOR=1 FORCE_COLOR=0

# The one-line summary, built a segment at a time as steps pass.
segments=()

# fail <STEP> <exit-code> <log> — the only thing a red run prints: what broke,
# the tail of its log, and where the rest of it is.
fail() {
  local step=$1 code=$2 log=$3
  printf 'FAIL %s (exit %s)\n\n' "$step" "$code"
  if [ -s "$log" ]; then
    tail -n 20 "$log"
  else
    printf '(no output)\n'
  fi
  printf '\nlog: %s\n' "$log"
  exit "$code"
}

# run <STEP> <exit-code> <log> <command…> — appends, so one step can chain
# several commands (LINT does) into a single log and a single exit code.
run() {
  local step=$1 code=$2 log=$3
  shift 3
  "$@" >>"$log" 2>&1 || fail "$step" "$code" "$log"
}

# Vitest's summary line reads `Tests  120 passed (120)`, with `N failed |` and
# `N skipped |` in front when relevant. Turn it into `120/120`; print nothing if
# the reporter ever changes shape, so the segment degrades to a plain `TEST ok`
# rather than lying about a count.
test_counts() {
  local line passed total
  line=$(grep -E '^[[:space:]]*Tests[[:space:]]' "$1" | tail -n 1)
  passed=$(printf '%s' "$line" | sed -nE 's/.*[^0-9]([0-9]+) passed.*/\1/p')
  total=$(printf '%s' "$line" | sed -nE 's/.*\(([0-9]+)\).*/\1/p')
  if [ -n "$passed" ] && [ -n "$total" ]; then
    printf '%s/%s' "$passed" "$total"
  fi
}

run TYPES 10 "$log_dir/types.log" npm run typecheck
segments+=('TYPES ok')

# Two commands, one gate: eslint owns correctness, prettier owns formatting, and
# either one failing is a lint failure (exit 20).
run LINT 20 "$log_dir/lint.log" npm run lint
run LINT 20 "$log_dir/lint.log" npx prettier --check .
segments+=('LINT ok')

run TEST 30 "$log_dir/test.log" npm run test
counts=$(test_counts "$log_dir/test.log")
segments+=("TEST${counts:+ $counts} ok")

if [ -f "$repo_root/tools/content-build.ts" ]; then
  # content:build chains schema validation, the word index and the strings
  # check. A strict build that legitimately ships nothing (everything held back
  # by the gate) still exits 0, so the harness judges the exit code and never
  # the output.
  run CONTENT 40 "$log_dir/content.log" npm run content:build
  segments+=('CONTENT ok')
else
  segments+=('CONTENT skip')
fi

# The subsets are derived from what CONTENT just emitted, so FONTS always runs
# after it — a build against stale fonts is a build against stale content.
if [ -f "$repo_root/tools/font-subset.ts" ]; then
  run FONTS 45 "$log_dir/fonts.log" npm run fonts:build
  segments+=('FONTS ok')
else
  segments+=('FONTS skip')
fi

if [ "$fast" -eq 0 ]; then
  # vite build directly, not `npm run build`: that would re-run tsc and
  # content:build via prebuild, so a content failure would resurface as
  # FAIL BUILD long after CONTENT had passed.
  run BUILD 50 "$log_dir/build.log" npx vite build
  segments+=('BUILD ok')

  # The payload report (#113; sizes informational since #304 — only the unmetered
  # and precache audits fail it) reads the dist/ BUILD just wrote, so it lives
  # and dies with BUILD: --fast skips both.
  if [ -f "$repo_root/tools/payload-budget.ts" ]; then
    run BUDGET 60 "$log_dir/budget.log" npm run budget
    segments+=('BUDGET ok')
  else
    segments+=('BUDGET skip')
  fi
fi

line=''
for segment in "${segments[@]}"; do
  line="${line:+$line | }$segment"
done
printf '%s\n' "$line"
