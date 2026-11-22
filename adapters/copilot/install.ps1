# install.ps1 — GitHub Copilot adapter for presentation-md
# Writes to the CURRENT directory (project-scoped instructions).
# Usage:  $env:PMD_CORE_DIR = "<path>"; .\install.ps1 [full|lite]
param([string]$Mode = "full")

$ErrorActionPreference = "Stop"

if (-not $env:PMD_CORE_DIR) {
    throw "PMD_CORE_DIR must be set to the @presentation-md/core directory"
}

$CopilotDir  = ".github"
$CopilotFile = Join-Path $CopilotDir "copilot-instructions.md"
$VsCodeDir   = ".vscode"
$McpFile     = Join-Path $VsCodeDir "mcp.json"

Write-Host "presentation-md > copilot adapter"
Write-Host "  mode:   $Mode"
Write-Host "  target: $(Get-Location)\$CopilotFile"
Write-Host ""

# ── write .github/copilot-instructions.md ────────────────────────────────────
New-Item -ItemType Directory -Force -Path $CopilotDir | Out-Null

$skillContent = Get-Content (Join-Path $env:PMD_CORE_DIR "SKILL.md") -Raw
# Strip YAML front-matter
$skillBody = ($skillContent -split '(?m)^---\r?\n')[2..($skillContent.Split('---').Length)] -join '---'
if ($skillContent -match '(?ms)^---.*?^---\r?\n(.*)') {
    $skillBody = $Matches[1]
} else {
    $skillBody = $skillContent
}

# Own only a sentinel-delimited section, like install.sh, so the team's other
# instructions (and other skill packs) survive a re-run.
$begin = "<!-- BEGIN presentation-md -->"
$end = "<!-- END presentation-md -->"
$section = "$begin`n$($skillBody.Trim())`n$end"

if (-not (Test-Path $CopilotFile)) {
    $content = "$section`n"
} else {
    $content = Get-Content $CopilotFile -Raw
    if ($null -eq $content) { $content = "" }
    $startIdx = $content.IndexOf($begin)
    if ($startIdx -eq -1) {
        $content = $content.TrimEnd() + "`n`n$section`n"
    } else {
        # A missing END marker means the old section runs to the end of the file.
        $endPos = $content.IndexOf($end, $startIdx)
        $endIdx = if ($endPos -eq -1) { $content.Length } else { $endPos + $end.Length }
        $content = $content.Substring(0, $startIdx).TrimEnd() + "`n`n$section`n" + $content.Substring($endIdx).TrimStart()
        if (-not $content.EndsWith("`n")) { $content += "`n" }
    }
}
Set-Content -Path $CopilotFile -Value $content -NoNewline

Write-Host "  OK  $CopilotFile written"

# ── full mode: deck-design-judge quality gate (project-scoped) ───────────────
if ($Mode -eq "full" -and $env:PMD_JUDGE_SKILL_DIR) {
    $ScriptDir = Split-Path -Parent $MyInvocation.MyCommand.Path
    & (Join-Path $ScriptDir "..\_common\install-judge-skill.ps1") -Target ".github\skills\deck-design-judge"
}

# ── full mode: register MCP server in .vscode/mcp.json ───────────────────────
if ($Mode -eq "full") {
    New-Item -ItemType Directory -Force -Path $VsCodeDir | Out-Null

    if (Test-Path $McpFile) {
        $cfg = Get-Content $McpFile -Raw | ConvertFrom-Json
    } else {
        $cfg = [PSCustomObject]@{ servers = [PSCustomObject]@{} }
    }

    $cfg.servers | Add-Member -Force -NotePropertyName "presentation-md" -NotePropertyValue ([PSCustomObject]@{
        type    = "stdio"
        command = "npx"
        args    = @("-y", "@presentation-md/mcp-server")
    })

    $cfg | ConvertTo-Json -Depth 10 | Set-Content $McpFile

    Write-Host "  OK  MCP server registered in $McpFile"
}

Write-Host ""
Write-Host "Done. Open GitHub Copilot Chat in VS Code — the skill is now in context."
if ($Mode -eq "lite") {
    Write-Host "  (lite mode — MCP server not registered)"
}
