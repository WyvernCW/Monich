#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
DESTINATION="${1:-${CODEX_HOME:-$HOME/.codex}/skills}"
SOURCE="$SCRIPT_DIR/installable/monich"
TARGET="$DESTINATION/monich"

if [[ ! -f "$SOURCE/SKILL.md" ]]; then
  echo "Missing installable skill at $SOURCE" >&2
  exit 1
fi

mkdir -p "$DESTINATION"
rm -rf "$TARGET"
cp -R "$SOURCE" "$TARGET"

echo "Installed monich to $TARGET"
echo "Restart Codex/Codex CLI if it was already running, then invoke with: Use \$monich to build a premium scroll showcase."
