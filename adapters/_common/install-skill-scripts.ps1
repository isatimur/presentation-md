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

foreach ($f in @("export-pdf.sh", "export-pdf.mjs", "deploy.sh", "package.json")) {
    $src = Join-Path $ScriptsSrc $f
    if (Test-Path $src) {
        Copy-Item -Path $src -Destination (Join-Path $ScriptsDest $f) -Force
    }
}

Write-Host "  OK  scripts\ copied (export-pdf + deploy)"
