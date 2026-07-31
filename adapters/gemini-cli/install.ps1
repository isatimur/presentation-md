# install.ps1 — Gemini CLI adapter for presentation-md (Windows)
# Usage:  $env:PMD_CORE_DIR="<path>"; .\install.ps1 [full|lite]
param(
    [string]$Mode = "full"
)

$ErrorActionPreference = "Stop"

if (-not $env:PMD_CORE_DIR) {
    Write-Error "PMD_CORE_DIR must be set to the @presentation-md/core directory"
    exit 1
}

$PmdCoreDir      = $env:PMD_CORE_DIR
$Target          = Join-Path $HOME ".gemini\extensions\presentation-generator"
$GeminiSettings  = Join-Path $HOME ".gemini\settings.json"

Write-Host "presentation-md > gemini-cli adapter"
Write-Host "  mode:   $Mode"
Write-Host "  target: $Target"
Write-Host ""

# ── copy skill file ───────────────────────────────────────────────────────────
New-Item -ItemType Directory -Force -Path $Target | Out-Null

Copy-Item -Path (Join-Path $PmdCoreDir "SKILL.md") `
          -Destination (Join-Path $Target "SKILL.md") -Force
Write-Host "  OK  SKILL.md copied"

# ── write extension.json ──────────────────────────────────────────────────────
$ExtJson = [ordered]@{
    name        = "presentation-generator"
    version     = "0.1.0"
    description = "Generate polished HTML slide decks from notes."
    skills      = @(@{ path = "./SKILL.md" })
}
$ExtJson | ConvertTo-Json -Depth 10 | Set-Content (Join-Path $Target "extension.json") -Encoding UTF8
Write-Host "  OK  extension.json written"

# ── full mode: deck-design-judge quality gate ────────────────────────────────
if ($Mode -eq "full" -and $env:PMD_JUDGE_SKILL_DIR) {
    $ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
    $JudgeTarget = Join-Path $HOME ".gemini\extensions\deck-design-judge"
    & (Join-Path $ScriptDir "..\_common\install-judge-skill.ps1") -Target $JudgeTarget
    $JudgeExt = [ordered]@{
        name        = "deck-design-judge"
        version     = "0.1.0"
        description = "Design quality gate for presentation-md decks (contrast, overflow, rubric)."
        skills      = @(@{ path = "./SKILL.md" })
    }
    $JudgeExt | ConvertTo-Json -Depth 10 | Set-Content (Join-Path $JudgeTarget "extension.json") -Encoding UTF8
    Write-Host "  OK  deck-design-judge extension.json written"
}

# ── full mode: register MCP server ───────────────────────────────────────────
if ($Mode -eq "full") {
    if (Test-Path $GeminiSettings) {
        $cfg = Get-Content $GeminiSettings -Raw | ConvertFrom-Json
        if (-not $cfg.mcpServers) {
            $cfg | Add-Member -NotePropertyName "mcpServers" -NotePropertyValue ([PSCustomObject]@{})
        }
        # Migrate legacy 5-tool package name → full @presentation-md/mcp-server (11 tools).
        if ($cfg.mcpServers.PSObject.Properties.Name -contains "presentation-skill-pack") {
            $cfg.mcpServers.PSObject.Properties.Remove("presentation-skill-pack")
        }
        $entry = [PSCustomObject]@{
            command = "npx"
            args    = @("-y", "@presentation-md/mcp-server")
        }
        $cfg.mcpServers | Add-Member -NotePropertyName "presentation-md" `
                                      -NotePropertyValue $entry -Force
        $cfg | ConvertTo-Json -Depth 10 | Set-Content $GeminiSettings -Encoding UTF8
    } else {
        New-Item -ItemType Directory -Force -Path (Split-Path $GeminiSettings) | Out-Null
        @{
            mcpServers = @{
                "presentation-md" = @{
                    command = "npx"
                    args    = @("-y", "@presentation-md/mcp-server")
                }
            }
        } | ConvertTo-Json -Depth 10 | Set-Content $GeminiSettings -Encoding UTF8
    }
    Write-Host "  OK  MCP server registered in ~/.gemini/settings.json"
}

Write-Host ""
Write-Host "Done. Restart Gemini CLI to pick up the changes."
if ($Mode -eq "lite") {
    Write-Host "  (lite mode — MCP server not registered)"
}
