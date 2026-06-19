param(
  [string]$Branch = "main",
  [string]$Repository = "WyvernCW/Monich",
  [string]$HomeDir = [Environment]::GetFolderPath("UserProfile"),
  [string]$ProjectPath = ""
)

$ErrorActionPreference = "Stop"

function Get-MonichRepoRoot {
  $scriptPath = $PSCommandPath

  if ($scriptPath) {
    $localRoot = Split-Path -Parent $scriptPath
    if (Test-Path -LiteralPath (Join-Path $localRoot "installable\monich\SKILL.md")) {
      return $localRoot
    }
  }

  $tempRoot = Join-Path ([System.IO.Path]::GetTempPath()) ("monich-install-" + [System.Guid]::NewGuid().ToString("N"))
  $zipPath = Join-Path $tempRoot "monich.zip"
  New-Item -ItemType Directory -Path $tempRoot -Force | Out-Null

  $archiveUrl = "https://github.com/$Repository/archive/refs/heads/$Branch.zip"
  Invoke-WebRequest -Uri $archiveUrl -OutFile $zipPath -UseBasicParsing
  Expand-Archive -LiteralPath $zipPath -DestinationPath $tempRoot -Force

  $repoRoot = Get-ChildItem -LiteralPath $tempRoot -Directory | Select-Object -First 1
  if (-not $repoRoot -or -not (Test-Path -LiteralPath (Join-Path $repoRoot.FullName "installable\monich\SKILL.md"))) {
    throw "Downloaded repository did not contain installable\monich\SKILL.md"
  }

  return $repoRoot.FullName
}

function Reset-CopyDirectory {
  param(
    [string]$Source,
    [string]$Target
  )

  $targetParent = Split-Path -Parent $Target
  $targetParentItem = New-Item -ItemType Directory -Path $targetParent -Force
  $resolvedParent = Resolve-Path -LiteralPath $targetParentItem.FullName

  if (Test-Path -LiteralPath $Target) {
    $resolvedTarget = Resolve-Path -LiteralPath $Target
    if (-not ($resolvedTarget.Path.StartsWith($resolvedParent.Path, [System.StringComparison]::OrdinalIgnoreCase))) {
      throw "Refusing to remove target outside expected parent: $resolvedTarget"
    }
    Remove-Item -LiteralPath $resolvedTarget.Path -Recurse -Force
  }

  Copy-Item -LiteralPath $Source -Destination $resolvedParent.Path -Recurse -Force
}

function Write-TextFile {
  param(
    [string]$Path,
    [string]$Text
  )

  New-Item -ItemType Directory -Path (Split-Path -Parent $Path) -Force | Out-Null
  Set-Content -LiteralPath $Path -Value $Text -NoNewline -Encoding UTF8
}

$homeDir = $HomeDir
$repoRoot = Get-MonichRepoRoot
$skillSource = Join-Path $repoRoot "installable\monich"

$loaderText = @"
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
"@

$cursorRule = @"
---
description: Monich builds premium scroll-driven showcase websites with sticky scenes, parallax, pinned timelines, GLB product reveals, responsive accessibility, and performance-safe animation.
globs:
  - "**/*.jsx"
  - "**/*.tsx"
  - "**/*.css"
  - "**/*.html"
alwaysApply: false
---

$loaderText
"@

$geminiConfig = @"
{
  "name": "monich",
  "version": "1.0.0",
  "description": "Premium scroll-driven showcase website skill for AI coding agents."
}
"@

$installs = @()

Reset-CopyDirectory -Source $skillSource -Target (Join-Path $homeDir ".codex\skills\monich")
$installs += "Codex: ~/.codex/skills/monich"

Reset-CopyDirectory -Source $skillSource -Target (Join-Path $homeDir ".claude\skills\monich")
$installs += "Claude Code: ~/.claude/skills/monich"

Reset-CopyDirectory -Source $skillSource -Target (Join-Path $homeDir ".agents\skills\monich")
$installs += "Generic agents: ~/.agents/skills/monich"

Reset-CopyDirectory -Source $skillSource -Target (Join-Path $homeDir ".monich\monich")
$installs += "Universal copy: ~/.monich/monich"

$geminiTarget = Join-Path $homeDir ".gemini\skills\monich"
Reset-CopyDirectory -Source $skillSource -Target $geminiTarget
Write-TextFile -Path (Join-Path $geminiTarget "gemini-extension.json") -Text $geminiConfig
Write-TextFile -Path (Join-Path $geminiTarget "GEMINI.md") -Text $loaderText
$installs += "Gemini: ~/.gemini/skills/monich"

Write-TextFile -Path (Join-Path $homeDir ".cursor\rules\monich.mdc") -Text $cursorRule
$installs += "Cursor rule: ~/.cursor/rules/monich.mdc"

Write-TextFile -Path (Join-Path $homeDir ".windsurf\rules\monich.md") -Text $loaderText
$installs += "Windsurf rule: ~/.windsurf/rules/monich.md"

Write-TextFile -Path (Join-Path $homeDir ".cline\rules\monich.md") -Text $loaderText
Write-TextFile -Path (Join-Path $homeDir ".clinerules\monich.md") -Text $loaderText
$installs += "Cline rules: ~/.cline/rules/monich.md and ~/.clinerules/monich.md"

Write-TextFile -Path (Join-Path $homeDir ".antigravity\rules\monich.md") -Text $loaderText
$installs += "Antigravity-style rule: ~/.antigravity/rules/monich.md"

if ($ProjectPath) {
  $resolvedProject = Resolve-Path -LiteralPath (New-Item -ItemType Directory -Path $ProjectPath -Force)
  Write-TextFile -Path (Join-Path $resolvedProject.Path ".cursor\rules\monich.mdc") -Text $cursorRule
  Write-TextFile -Path (Join-Path $resolvedProject.Path ".windsurf\rules\monich.md") -Text $loaderText
  Write-TextFile -Path (Join-Path $resolvedProject.Path ".clinerules\monich.md") -Text $loaderText
  Write-TextFile -Path (Join-Path $resolvedProject.Path "MONICH.md") -Text $loaderText
  $installs += "Project rules: $($resolvedProject.Path)"
}

Write-Host "Installed Monich for:"
$installs | ForEach-Object { Write-Host " - $_" }
Write-Host ""
Write-Host "Restart any already-open agent apps/CLIs."
Write-Host "Invoke with: Use `$monich to build a premium scroll-driven product showcase."
