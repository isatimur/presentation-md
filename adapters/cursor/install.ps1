# install.ps1 — Cursor adapter for presentation-md (Windows)
# Usage:  $env:PMD_CORE_DIR="<path>"; .\install.ps1 [full|lite]
param(
    [string]$Mode = "full"
)

$ErrorActionPreference = "Stop"

if (-not $env:PMD_CORE_DIR) {
    Write-Error "PMD_CORE_DIR must be set to the @presentation-md/core directory"
    exit 1
}

$PmdCoreDir = $env:PMD_CORE_DIR
$TargetDir  = Join-Path $HOME ".cursor\rules"
$TargetFile = Join-Path $TargetDir "presentation-generator.mdc"

Write-Host "presentation-md > cursor adapter"
Write-Host "  mode:   $Mode"
Write-Host "  target: $TargetFile"
Write-Host ""

New-Item -ItemType Directory -Force -Path $TargetDir | Out-Null

# ── read SKILL.md and strip YAML front-matter ─────────────────────────────────
$SkillLines  = Get-Content (Join-Path $PmdCoreDir "SKILL.md")
$InFront     = $false
$Seen        = $false
$BodyLines   = [System.Collections.Generic.List[string]]::new()

foreach ($line in $SkillLines) {
    if ($line -eq "---" -and -not $Seen) { $InFront = $true; $Seen = $true; continue }
    if ($line -eq "---" -and $InFront)   { $InFront = $false; continue }
    if (-not $InFront) { $BodyLines.Add($line) }
}

$SkillBody = $BodyLines -join "`n"

# ── write .mdc rules file ─────────────────────────────────────────────────────
$Mdc = @"
---
description: Generate a complete polished HTML slide deck from rough notes or structured content.
globs: []
alwaysApply: false
---

$SkillBody
"@

Set-Content -Path $TargetFile -Value $Mdc -Encoding UTF8
Write-Host "  OK  presentation-generator.mdc written"

# ── full mode: deck-design-judge quality gate ────────────────────────────────
if ($Mode -eq "full" -and $env:PMD_JUDGE_SKILL_DIR) {
    $ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
    & (Join-Path $ScriptDir "..\_common\install-judge-skill.ps1") `
        -Target (Join-Path $HOME ".cursor\skills\deck-design-judge")
}

# ── full mode: register MCP server ───────────────────────────────────────────
if ($Mode -eq "full") {
    $McpConfig = Join-Path $HOME ".cursor\mcp.json"

    if (Test-Path $McpConfig) {
        $cfg = Get-Content $McpConfig -Raw | ConvertFrom-Json
        if (-not $cfg.mcpServers) {
            $cfg | Add-Member -NotePropertyName "mcpServers" -NotePropertyValue ([PSCustomObject]@{})
        }
        # Migrate legacy 5-tool package name → full @presentation-md/mcp-server (13 tools).
        if ($cfg.mcpServers.PSObject.Properties.Name -contains "presentation-skill-pack") {
            $cfg.mcpServers.PSObject.Properties.Remove("presentation-skill-pack")
        }
        $entry = [PSCustomObject]@{
            command = "npx"
            args    = @("-y", "@presentation-md/mcp-server")
        }
        $cfg.mcpServers | Add-Member -NotePropertyName "presentation-md" `
                                      -NotePropertyValue $entry -Force
        $cfg | ConvertTo-Json -Depth 10 | Set-Content $McpConfig -Encoding UTF8
    } else {
        New-Item -ItemType Directory -Force -Path (Split-Path $McpConfig) | Out-Null
        @{
            mcpServers = @{
                "presentation-md" = @{
                    command = "npx"
                    args    = @("-y", "@presentation-md/mcp-server")
                }
            }
        } | ConvertTo-Json -Depth 10 | Set-Content $McpConfig -Encoding UTF8
    }
    Write-Host "  OK  MCP server registered in ~/.cursor/mcp.json"
}

Write-Host ""
Write-Host "Done. Restart Cursor to pick up the changes."
if ($Mode -eq "lite") {
    Write-Host "  (lite mode — MCP server not registered)"
}
