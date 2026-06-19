param(
  [string]$Destination = "$HOME\.codex\skills",
  [string]$Branch = "main",
  [string]$Repository = "WyvernCW/Monich"
)

$ErrorActionPreference = "Stop"

function Get-MonichSource {
  $scriptPath = $PSCommandPath

  if ($scriptPath) {
    $localRoot = Split-Path -Parent $scriptPath
    $localSource = Join-Path $localRoot "installable\monich"
    if (Test-Path -LiteralPath (Join-Path $localSource "SKILL.md")) {
      return $localSource
    }
  }

  $tempRoot = Join-Path ([System.IO.Path]::GetTempPath()) ("monich-install-" + [System.Guid]::NewGuid().ToString("N"))
  $zipPath = Join-Path $tempRoot "monich.zip"
  New-Item -ItemType Directory -Path $tempRoot -Force | Out-Null

  $archiveUrl = "https://github.com/$Repository/archive/refs/heads/$Branch.zip"
  Invoke-WebRequest -Uri $archiveUrl -OutFile $zipPath -UseBasicParsing
  Expand-Archive -LiteralPath $zipPath -DestinationPath $tempRoot -Force

  $source = Get-ChildItem -LiteralPath $tempRoot -Directory |
    Select-Object -First 1 |
    ForEach-Object { Join-Path $_.FullName "installable\monich" }

  if (-not $source -or -not (Test-Path -LiteralPath (Join-Path $source "SKILL.md"))) {
    throw "Downloaded repository did not contain installable\monich\SKILL.md"
  }

  return $source
}

$source = Get-MonichSource
$targetRootItem = New-Item -ItemType Directory -Path $Destination -Force
$targetRoot = Resolve-Path -LiteralPath $targetRootItem.FullName
$target = Join-Path $targetRoot.Path "monich"

if (Test-Path -LiteralPath $target) {
  $resolvedTarget = Resolve-Path -LiteralPath $target
  if (-not ($resolvedTarget.Path.StartsWith($targetRoot.Path, [System.StringComparison]::OrdinalIgnoreCase))) {
    throw "Refusing to remove target outside destination: $resolvedTarget"
  }
  Remove-Item -LiteralPath $resolvedTarget.Path -Recurse -Force
}

Copy-Item -LiteralPath $source -Destination $targetRoot.Path -Recurse -Force

Write-Host "Installed Monich to $target"
Write-Host "Restart Codex/Codex CLI if it was already running."
Write-Host "Invoke with: Use `$monich to build a premium scroll-driven product showcase."
