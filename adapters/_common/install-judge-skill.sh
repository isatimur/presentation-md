#!/usr/bin/env bash
# Copy bundled deck-design-judge skill to the given target directory.
# Requires PMD_JUDGE_SKILL_DIR (set by @presentation-md/install).
set -euo pipefail

: "${PMD_JUDGE_SKILL_DIR:?PMD_JUDGE_SKILL_DIR must be set to the bundled deck-design-judge directory}"

TARGET="${1:?usage: install-judge-skill.sh <target-dir>}"

mkdir -p "$TARGET"
cp -R "$PMD_JUDGE_SKILL_DIR/." "$TARGET/"
echo "  ✓  deck-design-judge copied to $TARGET"
