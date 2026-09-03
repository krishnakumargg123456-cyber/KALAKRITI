$ErrorActionPreference = "Stop"

Write-Host "====================================" -ForegroundColor Cyan
Write-Host " KALAKRITI Pre-Deployment Check" -ForegroundColor Cyan
Write-Host "====================================" -ForegroundColor Cyan

if (-not (Test-Path "package.json")) {
    throw "Frontend package.json not found."
}

Write-Host "`nChecking frontend production build..." -ForegroundColor Yellow

npm run build

if ($LASTEXITCODE -ne 0) {
    throw "Frontend production build failed."
}

Write-Host "`nPre-deployment validation passed." -ForegroundColor Green
