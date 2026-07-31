# Copy bundled deck-design-judge skill to the given target directory.
# Requires PMD_JUDGE_SKILL_DIR (set by @presentation-md/install).
param(
    [Parameter(Mandatory = $true)]
    [string]$Target
)

$ErrorActionPreference = "Stop"

if (-not $env:PMD_JUDGE_SKILL_DIR) {
    throw "PMD_JUDGE_SKILL_DIR must be set to the bundled deck-design-judge directory"
}

if (-not (Test-Path (Join-Path $env:PMD_JUDGE_SKILL_DIR "SKILL.md"))) {
    throw "PMD_JUDGE_SKILL_DIR does not contain SKILL.md: $($env:PMD_JUDGE_SKILL_DIR)"
}

New-Item -ItemType Directory -Force -Path $Target | Out-Null
Copy-Item -Path (Join-Path $env:PMD_JUDGE_SKILL_DIR "*") `
          -Destination $Target `
          -Recurse -Force
Write-Host "  OK  deck-design-judge copied to $Target"
