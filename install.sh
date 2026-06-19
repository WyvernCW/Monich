#!/usr/bin/env sh
set -eu

BRANCH="${BRANCH:-main}"
REPOSITORY="${REPOSITORY:-WyvernCW/Monich}"
PROJECT_PATH="${PROJECT_PATH:-}"
HOME_DIR="${HOME}"

script_dir() {
  if [ -n "${0:-}" ] && [ -f "$0" ]; then
    cd "$(dirname "$0")" && pwd
  else
    pwd
  fi
}

get_repo_root() {
  local_dir="$(script_dir)"
  if [ -f "$local_dir/installable/monich/SKILL.md" ]; then
    printf "%s\n" "$local_dir"
    return
  fi

  tmp_dir="$(mktemp -d)"
  archive="$tmp_dir/monich.tar.gz"
  url="https://github.com/$REPOSITORY/archive/refs/heads/$BRANCH.tar.gz"

  if command -v curl >/dev/null 2>&1; then
    curl -fsSL "$url" -o "$archive"
  elif command -v wget >/dev/null 2>&1; then
    wget -qO "$archive" "$url"
  else
    echo "curl or wget is required for remote install" >&2
    exit 1
  fi

  tar -xzf "$archive" -C "$tmp_dir"
  repo_root="$(find "$tmp_dir" -maxdepth 1 -type d -name 'Monich-*' | head -n 1)"

  if [ ! -f "$repo_root/installable/monich/SKILL.md" ]; then
    echo "Downloaded repository did not contain installable/monich/SKILL.md" >&2
    exit 1
  fi

  printf "%s\n" "$repo_root"
}

copy_dir() {
  src="$1"
  target="$2"
  parent="$(dirname "$target")"
  mkdir -p "$parent"
  rm -rf "$target"
  cp -R "$src" "$target"
}

write_file() {
  path="$1"
  mkdir -p "$(dirname "$path")"
  cat > "$path"
}

REPO_ROOT="$(get_repo_root)"
SKILL_SOURCE="$REPO_ROOT/installable/monich"

LOADER_TEXT="$(cat <<'MONICH_LOADER'
# Monich

Monich is a portable AI coding-agent skill for premium scroll-driven websites, product showcases, sticky/parallax sections, pinned timelines, Three.js GLB reveals, Web Audio scroll sound, responsive layout, accessibility fallbacks, and performance-safe animation.

When the user asks for Raycast-like, Apple-like, NVIDIA-like, RTX/GPU, SaaS, AI browser, parallax, sticky scroll, pinned reveal, or premium product showcase work:

1. Read the Monich skill at one of these installed locations:
   - `~/.codex/skills/monich/SKILL.md`
   - `~/.claude/skills/monich/SKILL.md`
   - `~/.agents/skills/monich/SKILL.md`
   - `~/.monich/monich/SKILL.md`
2. Use bundled templates from `assets/templates/`.
3. Generate runnable frontend code, not advice-only output.
4. Do not copy real brand assets, names, screenshots, exact layouts, logos, or claims.
5. Prefer user-provided assets; otherwise use CSS mockups.
6. Verify builds, responsive layout, reduced motion, and missing imports.
MONICH_LOADER
)"

CURSOR_RULE="$(cat <<MONICH_CURSOR
---
description: Monich builds premium scroll-driven showcase websites with sticky scenes, parallax, pinned timelines, GLB product reveals, responsive accessibility, and performance-safe animation.
globs:
  - "**/*.jsx"
  - "**/*.tsx"
  - "**/*.css"
  - "**/*.html"
alwaysApply: false
---

$LOADER_TEXT
MONICH_CURSOR
)"

GEMINI_CONFIG="$(cat <<'MONICH_GEMINI'
{
  "name": "monich",
  "version": "1.0.0",
  "description": "Premium scroll-driven showcase website skill for AI coding agents."
}
MONICH_GEMINI
)"

copy_dir "$SKILL_SOURCE" "$HOME_DIR/.codex/skills/monich"
copy_dir "$SKILL_SOURCE" "$HOME_DIR/.claude/skills/monich"
copy_dir "$SKILL_SOURCE" "$HOME_DIR/.agents/skills/monich"
copy_dir "$SKILL_SOURCE" "$HOME_DIR/.monich/monich"
copy_dir "$SKILL_SOURCE" "$HOME_DIR/.gemini/extensions/monich"

printf "%s\n" "$GEMINI_CONFIG" | write_file "$HOME_DIR/.gemini/extensions/monich/gemini-extension.json"
printf "%s\n" "$LOADER_TEXT" | write_file "$HOME_DIR/.gemini/extensions/monich/GEMINI.md"
printf "%s\n" "$CURSOR_RULE" | write_file "$HOME_DIR/.cursor/rules/monich.mdc"
printf "%s\n" "$LOADER_TEXT" | write_file "$HOME_DIR/.windsurf/rules/monich.md"
printf "%s\n" "$LOADER_TEXT" | write_file "$HOME_DIR/.cline/rules/monich.md"
printf "%s\n" "$LOADER_TEXT" | write_file "$HOME_DIR/.clinerules/monich.md"
printf "%s\n" "$LOADER_TEXT" | write_file "$HOME_DIR/.antigravity/rules/monich.md"

if [ -n "$PROJECT_PATH" ]; then
  mkdir -p "$PROJECT_PATH"
  printf "%s\n" "$CURSOR_RULE" | write_file "$PROJECT_PATH/.cursor/rules/monich.mdc"
  printf "%s\n" "$LOADER_TEXT" | write_file "$PROJECT_PATH/.windsurf/rules/monich.md"
  printf "%s\n" "$LOADER_TEXT" | write_file "$PROJECT_PATH/.clinerules/monich.md"
  printf "%s\n" "$LOADER_TEXT" | write_file "$PROJECT_PATH/MONICH.md"
fi

cat <<EOF
Installed Monich for:
 - Codex: ~/.codex/skills/monich
 - Claude Code: ~/.claude/skills/monich
 - Generic agents: ~/.agents/skills/monich
 - Gemini CLI: ~/.gemini/extensions/monich
 - Cursor rule: ~/.cursor/rules/monich.mdc
 - Windsurf rule: ~/.windsurf/rules/monich.md
 - Cline rules: ~/.cline/rules/monich.md and ~/.clinerules/monich.md
 - Antigravity-style rule: ~/.antigravity/rules/monich.md
 - Universal copy: ~/.monich/monich

Restart any already-open agent apps/CLIs.
Invoke with: Use \$monich to build a premium scroll-driven product showcase.
EOF
