# Copy bundled presentation-generator scripts (PDF / deploy) into the skill target.
# Requires PMD_CORE_DIR (set by @presentation-md/install).
param(
    [Parameter(Mandatory = $true)]
    [string]$Target
)

$ErrorActionPreference = "Stop"

if (-not $env:PMD_CORE_DIR) {
    throw "PMD_CORE_DIR must be set to the @presentation-md/core directory"
}

$ScriptsSrc = Join-Path $env:PMD_CORE_DIR "scripts"
if (-not (Test-Path $ScriptsSrc)) {
    Write-Host "  WARN  no scripts\ in @presentation-md/core — skipping PDF/deploy helpers"
    return
}

$ScriptsDest = Join-Path $Target "scripts"
New-Item -ItemType Directory -Force -Path $ScriptsDest | Out-Null

# Copy every source helper (*.sh, *.mjs, package.json), not a fixed list:
# export-pdf.mjs imports pdf-security.mjs and deploy.sh runs
# check-local-assets.mjs, so a partial copy breaks PDF export and the deploy guard.
Get-ChildItem -Path $ScriptsSrc -File |
    Where-Object { $_.Extension -in @(".sh", ".mjs") -or $_.Name -eq "package.json" } |
    ForEach-Object {
        Copy-Item -Path $_.FullName -Destination (Join-Path $ScriptsDest $_.Name) -Force
    }

Write-Host "  OK  scripts\ copied (export-pdf + deploy)"
