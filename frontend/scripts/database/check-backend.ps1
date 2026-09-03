$ErrorActionPreference = "Stop"

Write-Host "====================================" -ForegroundColor Cyan
Write-Host " KALAKRITI Backend Check" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan

$backend = Join-Path (Split-Path $PSScriptRoot -Parent) "..\..\backend"
$backend = [System.IO.Path]::GetFullPath($backend)

if (-not (Test-Path $backend)) {
    Write-Warning "Backend directory was not found from the frontend project."
    Write-Host "Expected location: C:\KALAKRITI\kalakriti\backend"
    exit 0
}

Set-Location $backend

if (Test-Path ".venv\Scripts\python.exe") {
    & ".venv\Scripts\python.exe" -m compileall app

    if ($LASTEXITCODE -ne 0) {
        throw "Backend compile check failed."
    }
}
else {
    Write-Warning "Backend virtual environment was not found."
}

Write-Host "`nBackend check completed." -ForegroundColor Green
