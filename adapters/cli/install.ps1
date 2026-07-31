# install.ps1 — CLI adapter for presentation-md (Windows)
# Prints render CLI usage and (full mode) installs deck-design-judge scripts locally.
# Usage:  $env:PMD_CORE_DIR="<path>"; .\install.ps1 [full|lite]
param(
    [string]$Mode = "full"
)

$ErrorActionPreference = "Stop"

if (-not $env:PMD_CORE_DIR) {
    Write-Error "PMD_CORE_DIR must be set to the @presentation-md/core directory"
    exit 1
}

Write-Host "presentation-md > cli adapter"
Write-Host "  mode:   $Mode"
Write-Host ""

Write-Host "  Render CLI (no install step required):"
Write-Host "    npx @presentation-md/render deck.json -o deck.html"
Write-Host "    npx @presentation-md/render --list-themes"
Write-Host "    npx @presentation-md/render --validate deck.json"
Write-Host ""

if ($Mode -eq "full" -and $env:PMD_JUDGE_SKILL_DIR) {
    $ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
    $JudgeTarget = if ($env:PMD_CLI_JUDGE_DIR) {
        $env:PMD_CLI_JUDGE_DIR
    } else {
        Join-Path $HOME ".presentation-md\skills\deck-design-judge"
    }
    & (Join-Path $ScriptDir "..\_common\install-judge-skill.ps1") -Target $JudgeTarget
    Write-Host "  Judge scripts:"
    Write-Host "    bash $JudgeTarget\scripts\render_slides.sh deck.html shots\"
    Write-Host "    python $JudgeTarget\scripts\deck_metrics.py deck.html"
    Write-Host "  Or use MCP judge_deck via: npx -y @presentation-md/mcp-server"
}

if ($Mode -eq "lite") {
    Write-Host "  (lite mode — judge skill not installed)"
}

Write-Host ""
Write-Host "Done."
