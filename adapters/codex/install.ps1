# install.ps1 — Codex adapter for presentation-md (Windows)
# Usage:  $env:PMD_CORE_DIR="<path>"; .\install.ps1 [full|lite]
param(
    [string]$Mode = "full"
)

$ErrorActionPreference = "Stop"

if (-not $env:PMD_CORE_DIR) {
    Write-Error "PMD_CORE_DIR must be set to the @presentation-md/core directory"
    exit 1
}

$PmdCoreDir  = $env:PMD_CORE_DIR
$Target      = Join-Path $HOME ".codex\skills\presentation-generator"
$CodexConfig = Join-Path $HOME ".codex\config.json"

Write-Host "presentation-md > codex adapter"
Write-Host "  mode:   $Mode"
Write-Host "  target: $Target"
Write-Host ""

# ── copy skill files ──────────────────────────────────────────────────────────
New-Item -ItemType Directory -Force -Path (Join-Path $Target "references") | Out-Null

Copy-Item -Path (Join-Path $PmdCoreDir "SKILL.md") `
          -Destination (Join-Path $Target "SKILL.md") -Force
Write-Host "  OK  SKILL.md copied"

$RefsSource = Join-Path $PmdCoreDir "references"
if (Test-Path $RefsSource) {
    Copy-Item -Path "$RefsSource\*" `
              -Destination (Join-Path $Target "references") `
              -Recurse -Force
    Write-Host "  OK  references\ copied"
}

# ── full mode: register MCP server ───────────────────────────────────────────
if ($Mode -eq "full") {
    if (Test-Path $CodexConfig) {
        $cfg = Get-Content $CodexConfig -Raw | ConvertFrom-Json
        if (-not $cfg.mcpServers) {
            $cfg | Add-Member -NotePropertyName "mcpServers" -NotePropertyValue ([PSCustomObject]@{})
        }
        $entry = [PSCustomObject]@{
            command = "npx"
            args    = @("-y", "@presentation-md/mcp-server")
        }
        $cfg.mcpServers | # Migrate legacy 5-tool package name → full @presentation-md/mcp-server (11 tools).
        if (.mcpServers -and .mcpServers.PSObject.Properties.Name -contains "presentation-skill-pack") {
            .mcpServers.PSObject.Properties.Remove("presentation-skill-pack")
        }
        if (.servers -and .servers.PSObject.Properties.Name -contains "presentation-skill-pack") {
            .servers.PSObject.Properties.Remove("presentation-skill-pack")
        }
        Add-Member -NotePropertyName "presentation-md" `
                                      -NotePropertyValue $entry -Force
        $cfg | ConvertTo-Json -Depth 10 | Set-Content $CodexConfig -Encoding UTF8
    } else {
        New-Item -ItemType Directory -Force -Path (Split-Path $CodexConfig) | Out-Null
        @{
            mcpServers = @{
                "presentation-md" = @{
                    command = "npx"
                    args    = @("-y", "@presentation-md/mcp-server")
                }
            }
        } | ConvertTo-Json -Depth 10 | Set-Content $CodexConfig -Encoding UTF8
    }
    Write-Host "  OK  MCP server registered in ~/.codex/config.json"
}

Write-Host ""
Write-Host "Done. Restart Codex to pick up the changes."
if ($Mode -eq "lite") {
    Write-Host "  (lite mode — MCP server not registered)"
}
